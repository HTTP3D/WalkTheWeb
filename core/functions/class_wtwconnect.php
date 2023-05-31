<?php
class wtwconnect {
	/* wtwconnect class for database functions tied to the /connect folder files */
	/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {
		/* set root path for file references */
		$this->rootpath = str_replace('/core/functions','',str_replace('\\','/',dirname(__FILE__)));
		if (!defined('wtw_rootpath')) {
			define("wtw_rootpath", $this->rootpath);
		}
		require_once(wtw_rootpath.'/config/wtw_config.php');
		require_once(wtw_rootpath.'/core/functions/class_wtwdb.php');
		require_once(wtw_rootpath.'/core/functions/class_wtwuser.php');
	}	

	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	/* declare public $wtwconnect variables */
	public $serverinstanceid = '';
	public $serverip = '';
	public $usertoken = '';
	public $globaluserid = '';
	public $rootpath = '';
	public $contentpath = '';
	public $contenturl = '';
	public $protocol = 'http://';
	public $domainname = '';
	public $domainurl = '';
	public $pagename = '';
	public $userid = '';
	public $userip = '';
	public $uri = '';

	public function getClientIP(){
		/* returns the current user IP address - also attempts to include IP if server is behind load balancers */
		$clientip = "";
		try {
			if (array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER)){
				$clientip =  $_SERVER["HTTP_X_FORWARDED_FOR"];  
			}else if (array_key_exists('REMOTE_ADDR', $_SERVER)) { 
				$clientip = $_SERVER["REMOTE_ADDR"]; 
			}else if (array_key_exists('HTTP_CLIENT_IP', $_SERVER)) {
				$clientip = $_SERVER["HTTP_CLIENT_IP"]; 
			} 
		} catch (Exception $e) {}
		return $clientip; 
	}	

	public function initClass() {
		/* checks for https and loads the public variables */
		try {
			set_error_handler (
				function($errno, $errstr, $errfile, $errline) {
					throw new ErrorException($errstr, $errno, 0, $errfile, $errline);     
				}
			);
			register_shutdown_function('shutdownOnErrorConnect');
			global $wtwuser;
			if (defined('wtw_defaultdomain')) {
				$this->domainname = wtw_defaultdomain;
			}
			if ($this->hasValue($_SERVER['HTTP_HOST'])) {
				$this->domainname = strtolower($_SERVER['HTTP_HOST']);
			}
			$this->protocol = "http://";
			if ($this->hasValue($_SERVER['HTTP_X_FORWARDED_PROTO'])) {
				if ($_SERVER['HTTP_X_FORWARDED_PROTO'] == "https") {
					$this->domainurl = "https://".$this->domainname;
					$this->protocol = "https://";
					$_SERVER['HTTPS']='on';
				} else {
					$this->domainurl = "http://".$this->domainname;
				}
			} else if (!isset($_SERVER['HTTPS']) || empty($_SERVER['HTTPS'])){
				$this->domainurl = "http://".$this->domainname;
			} else if ($_SERVER['HTTPS'] == "off") {
				$this->domainurl = "http://".$this->domainname;
			} else {
				$this->domainurl = "https://".$this->domainname;
				$this->protocol = "https://";
				$_SERVER['HTTPS']='on';
			}
			/* server IP is Public IP */
			$zserverip = gethostbyname($this->domainname);
			$this->serverip = $zserverip;

			if ($this->hasValue($_SESSION["wtw_usertoken"])) {
				$this->usertoken = $_SESSION["wtw_usertoken"];
			}
			if ($this->hasValue($_SESSION["wtw_globaluserid"])) {
				$this->globaluserid = $_SESSION["wtw_globaluserid"];
			}
			if ($this->hasValue($_SERVER['PHP_SELF'])) {
				$this->pagename = strtolower(basename($_SERVER['PHP_SELF']));
			} else {
				$this->pagename = "index.php";
			}
			if ($this->hasValue($_SERVER['REQUEST_URI'])) {
				$this->uri = trim($_SERVER['REQUEST_URI']);
				if (isset($_GET["wtwpath"])) {
					$this->uri = $_GET["wtwpath"];
				}
			}
			if (defined('wtw_contentpath')) {
				$this->contentpath = wtw_contentpath;
			} else {
				$this->contentpath = wtw_rootpath."/content";
			}
			if (defined('wtw_contenturl')) {
				$this->contenturl = wtw_contenturl;
			} else {
				$this->contenturl = $this->domainurl."/content";
			}
			$zuserip = "";
			try {
				$zuserip = $this->getClientIP();
			} catch (Exception $e) {
			}
			if ($this->hasValue($zuserip)) {
				$this->userip = $zuserip;
				$wtwuser->userip = $zuserip;
			}
			if ($this->hasValue($_SESSION["wtw_userid"])) {
				$zuserid = $_SESSION["wtw_userid"];
				if ($this->userExists($zuserid)) {
					$this->userid = $zuserid;
					$wtwuser->userid = $zuserid;
				}
			}
			if (defined('wtw_serverinstanceid')) {
				$this->serverinstanceid = wtw_serverinstanceid;
			}
			if (defined('wtw_adminemail') == false) {
				define("wtw_adminemail", '');
			}
			if (defined('wtw_adminname') == false) {
				define("wtw_adminname", '');
			}
			if (defined('wtw_babylonversion') == false) {
				define("wtw_babylonversion", 'v5.x.x');
			}
			if (defined('wtw_physicsengine') == false) {
				define("wtw_physicsengine", '');
			}
			if (defined('wtw_ftpuser') == false) {
				define("wtw_ftpuser", '');
			}
			if (defined('wtw_ftppassword') == false) {
				define("wtw_ftppassword", '');
			}
			if (defined('wtw_ftpbase') == false) {
				define("wtw_ftpbase", '');
			}
			if (defined('wtw_umask') == false) {
				define("wtw_umask", "0");
			}
			umask(octdec(wtw_umask));
			if (defined('wtw_chmod') == false) {
				define("wtw_chmod", "775");
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwconnect.php-initClass=" . $e->getMessage());
		}
	}
	
	/* expose functions to this class from other functions so that the original function is only updated in one place */
	public function serror($zmessage) {
		global $wtwdb;
		$wtwdb->serror($zmessage);
	}
	
	public function query($zsql) {
		global $wtwdb;
		return $wtwdb->query($zsql);
	}

	public function getRandomString($zlength, $zstringtype) {
		global $wtwdb;
		return $wtwdb->getRandomString($zlength, $zstringtype);
	}

	public function tableExists($ztablename) {
		global $wtwdb;
		return $wtwdb->tableExists($ztablename);
	}

	public function keyExists($ztablename, $zfieldid, $zkeyid) {
		global $wtwdb;
		return $wtwdb->keyExists($ztablename, $zfieldid, $zkeyid);
	}
	
	public function verifyFolderExists($zfolder) {
		global $wtwdb;
		return $wtwdb->verifyFolderExists($zfolder);
	}
	
	public function getNewKey($ztablename, $zfieldid, $zdefaultkeyid) {
		global $wtwdb;
		return $wtwdb->getNewKey($ztablename, $zfieldid, $zdefaultkeyid);
	}

	public function startsWith($zhaystack, $zneedle) {
		global $wtwdb;
		return $wtwdb->startsWith($zhaystack, $zneedle);
	}

	public function endsWith($zhaystack, $zneedle) {
		global $wtwdb;
		return $wtwdb->endsWith($zhaystack, $zneedle);
	}
	
	public function getAvatarFilesList($zfiles, $zdir) {
		global $wtwdb;
		return $wtwdb->getAvatarFilesList($zfiles, $zdir);
	}
	
	public function getFilefromURL($zfromurl, $zfilepath, $zfilename) {
		/* save file using any available method fopen or curl */
		global $wtwdb;
		return $wtwdb->getFilefromURL($zfromurl, $zfilepath, $zfilename);
	}

	public function openFilefromURL($zfromurl, $zuseincludepath=false, $zcontext=null) {
		/* open file using any available method fopen or curl */
		global $wtwdb;
		return $wtwdb->openFilefromURL($zfromurl, $zuseincludepath, $zcontext);
	}

	public function getIDByPastID($ztablename, $zfieldid, $zpastfieldid, $zpastid) {
		global $wtwdb;
		return $wtwdb->getIDByPastID($ztablename, $zfieldid, $zpastfieldid, $zpastid);
	}

	public function getUserIDfromPastID($zpastid) {
		global $wtwdb;
		return $wtwdb->getUserIDfromPastID($zpastid);
	}

	public function tableFieldExists($ztable, $zfield) {
		global $wtwdb;
		return $wtwdb->tableFieldExists($ztable, $zfield);
	}

	public function userExists($zuserid) {
		global $wtwdb;
		return $wtwdb->userExists($zuserid);
	}

	public function getSessionUserID() {
		global $wtwdb;
		try {
			$this->userid = $wtwdb->getSessionUserID();
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwconnect.php-getSessionUserID=" . $e->getMessage());
		}
		return $this->userid;
	}
	
	public function isUserInRole($zrole) {
		global $wtwdb;
		return $wtwdb->isUserInRole($zrole);
	}
	
	public function getUserRoles($zuserid = '') {
		/* defaults to current user unless called with admin role access */
		global $wtwdb;
		return $wtwdb->getUserRoles($zuserid);
	}
	
	public function hasPermission($zaccessrequired) {
		/* array of access required will be compared to array of current user roles */
		global $wtwdb;
		return $wtwdb->hasPermission($zaccessrequired);
	}
	
	public function checkUpdateAccess($zcommunityid, $zbuildingid, $zthingid) {
		global $wtwdb;
		return $wtwdb->checkUpdateAccess($zcommunityid, $zbuildingid, $zthingid);
	}

	public function checkAdminAccess($zcommunityid, $zbuildingid, $zthingid) {
		global $wtwdb;
		return $wtwdb->checkAdminAccess($zcommunityid, $zbuildingid, $zthingid);
	}

	public function getSetting($zsettingname, $zdefaultvalue) {
		global $wtwdb;
		return $wtwdb->getSetting($zsettingname, $zdefaultvalue);
	}

	public function saveSetting($zsettingname, $zsettingvalue) {
		global $wtwdb;
		return $wtwdb->saveSetting($zsettingname, $zsettingvalue);
	}

	public function getSettings($zsettingnames) {
		global $wtwdb;
		return $wtwdb->getSettings($zsettingnames);
	}

	public function saveSettings($zsettings) {
		global $wtwdb;
		return $wtwdb->saveSettings($zsettings);
	}

	public function decode64($ztext) {
		global $wtwdb;
		return $wtwdb->decode64($ztext);
	}

	public function getPost($zfield, $zdefault) {
		global $wtwdb;
		return $wtwdb->getPost($zfield, $zdefault);
	}
	
	public function getFiles($zfield, $zdefault) {
		global $wtwdb;
		return $wtwdb->getFiles($zfield, $zdefault);
	}

	public function getVal($zkey, $zdefaultval) {
		global $wtwdb;
		return $wtwdb->getVal($zkey, $zdefaultval);
	}

	public function getNumber($zkey, $zdefaultval) {
		global $wtwdb;
		return $wtwdb->getNumber($zkey, $zdefaultval);
	}

	public function checkValue($zvalue, $zdefaultval = null) {
		global $wtwdb;
		return $wtwdb->checkValue($zvalue, $zdefaultval);
	}

	public function hasValue(&$zvalue) {
		$zresponse = false;
		try {
			if (isset($zvalue) && !empty($zvalue)) {
				$zresponse = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwconnect.php-hasValue=".$e->getMessage());
		}
		return $zresponse;
	}

	public function checkIDFormat($zid) {
		global $wtwdb;
		return $wtwdb->checkIDFormat($zid);
	}

	public function checkNumber($zval, $zdefaultval) {
		global $wtwdb;
		return $wtwdb->checkNumber($zval, $zdefaultval);
	}

	public function getMaximumFileUploadSize() {  
		global $wtwdb;
		return $wtwdb->getMaximumFileUploadSize();
	}  

	public function convertPHPSizeToBytes($zsize) {
		global $wtwdb;
		return $wtwdb->convertPHPSizeToBytes($zsize);
	}
	
	public function checkAlphaNumeric($zid) {
		global $wtwdb;
		return $wtwdb->checkAlphaNumeric($zid);
	}

	public function checkFolderPath($zurl) {
		global $wtwdb;
		return $wtwdb->checkFolderPath($zurl);
	}

	public function checkFileName($zid) {
		global $wtwdb;
		return $wtwdb->checkFileName($zid);
	}

	public function checkFunctionName($zid) {
		global $wtwdb;
		return $wtwdb->checkFunctionName($zid);
	}

	public function checkPublishName($zdomainname, $zwebtype, $zpublishname) {
		global $wtwdb;
		return $wtwdb->checkPublishName($zdomainname, $zwebtype, $zpublishname);
	}

	public function prepCheckDate($zdate) {
		/* returns either 'dateformatted' or NULL - ready to be used in SQL */
		global $wtwdb;
		return $wtwdb->prepCheckDate($zdate);
	}

	public function formatDate($zdate) {
		/* returns mm/dd/yyyy */
		global $wtwdb;
		return $wtwdb->formatDate($zdate);
	}
	
	public function formatMoney($znumber) {
		/* returns $##,###.## */
		global $wtwdb;
		return $wtwdb->formatMoney($znumber);
	}

	public function escapeHTML($ztext) {
		global $wtwdb;
		return $wtwdb->escapeHTML($ztext);
	}

	public function confirmKey($zkey, $zwebtype, $zwebid) {
		global $wtwdb;
		return $wtwdb->confirmKey($zkey, $zwebtype, $zwebid);
	}

	public function getobjectanimations($zuploadobjectid) {
		global $wtwdb;
		return $wtwdb->getobjectanimations($zuploadobjectid);
	}

	public function getwebimages($zthingmoldid, $zbuildingmoldid, $zcommunitymoldid, $zgraphiclevel) {
		global $wtwdb;
		return $wtwdb->getwebimages($zthingmoldid, $zbuildingmoldid, $zcommunitymoldid, $zgraphiclevel);
	}

	public function getmoldpoints($zthingmoldid, $zbuildingmoldid, $zcommunitymoldid, $zpathnumber, $zshape) {
		global $wtwdb;
		return $wtwdb->getmoldpoints($zthingmoldid, $zbuildingmoldid, $zcommunitymoldid, $zpathnumber, $zshape);
	}
	
	public function getWebAliases($zwebtype, $zwebid) {
		global $wtwdb;
		return $wtwdb->getWebAliases($zwebtype, $zwebid);
	}

	public function getRatingText($zrating) {
		global $wtwdb;
		return $wtwdb->getRatingText($zrating);
	}

	public function dirSize($zdirectory) {
		global $wtwdb;
		return $wtwdb->dirSize($zdirectory);
	} 

	public function getFileCount($zdirectory) {
		global $wtwdb;
		return $wtwdb->getFileCount($zdirectory);
	} 

	public function __($zlabel) {
		/* Language translation based on language file */
		global $wtwdb;
		return $wtwdb->__($zlabel);
	}	

	public function addConnectHeader($zavailabledomains) {
		/* sets the domain allowed for cross script - only when allowed */
		global $wtwdb;
		$zheader = "";
		try {
			if ($this->hasValue($_SERVER['HTTP_REFERER'])) {
				if (substr($_SERVER['HTTP_REFERER'], 0, 29) === 'https://3dnet.walktheweb.com/') {
					$zavailabledomains = '3dnet.walktheweb.com';
				}
			}
			$zheader .= header('Access-Control-Allow-Origin: '.$zavailabledomains);
			$zheader .= header('Content-type: application/json');
			$zheader .= header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
			$zheader .= header('Access-Control-Request-Headers: Content-Type');
			$zheader .= header('Set-Cookie: cross-site-cookie=name; SameSite=Lax;');
			//$zheader .= header('Content-type: application/json; charset=iso-8859-1');
			//$zheader .= header('Content-Language: en');
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwconnect.php-addConnectHeader=".$e->getMessage());
		}
		return $zheader;
	}

	public function trackPageView($zcurrentpage) {
		global $wtwdb;
		return $wtwdb->trackPageView($zcurrentpage);
	}
}

	function wtwconnect() {
		return wtwconnect::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwconnect'] = wtwconnect();
	
	if (session_status() == PHP_SESSION_NONE) {
		$zdomainname = strtolower($_SERVER['HTTP_HOST']);
		$zprotocol = "http://";
		if (isset($_SERVER['HTTP_X_FORWARDED_PROTO'])) {
			if ($_SERVER['HTTP_X_FORWARDED_PROTO'] == "https") {
				$zprotocol = "https://";
			}
		} else if (!isset($_SERVER['HTTPS']) || empty($_SERVER['HTTPS'])){
		} else if ($_SERVER['HTTPS'] == "off") {
		} else {
			$zprotocol = "https://";
		}
		if ($zprotocol == "https://"){
			session_set_cookie_params($lifetime = 0, $path = '/', $zdomainname, $secure = true, $httponly = true);
		} else {
			session_set_cookie_params($lifetime = 0, $path = '/', $zdomainname, $secure = false, $httponly = true);
		}
		session_start();
	}
	function shutdownOnErrorConnect() {
		/* error trapping function */
		$error = error_get_last();
		if ($error != null) {
			$errors = array(
				E_PARSE,
				E_COMPILE_ERROR,
				E_RECOVERABLE_ERROR,
				E_ERROR,
				E_USER_ERROR
			);
			if (isset($error['type']) && in_array($error['type'], $errors, true)) {
				$message = addslashes(str_replace("\n","",str_replace("\r","",$error['message'])));
				try {
					$conn = new mysqli(wtw_dbserver, wtw_dbusername, base64_decode(wtw_dbpassword), wtw_dbname);
					if ($conn->connect_error) {
						$error = "console.log('Connection failed: ".str_replace("'","\'",$conn->connect_error)."');";
					} else {
						$sql = "insert into ".wtw_tableprefix."errorlog 
								(message,
								 logdate)
								values
								('".addslashes(str_replace("'","\'",$message))."',
								 '".date('Y-m-d H:i:s')."');";
						$conn->query($sql);
					}
					$conn->close();
				} catch (Exception $e) { }
			}
		}
	}
	global $wtwconnect;
	$wtwconnect->initClass();
?>
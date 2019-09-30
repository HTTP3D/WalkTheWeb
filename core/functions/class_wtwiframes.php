<?php
require_once('../../config/wtw_config.php');
require_once('../functions/class_wtwdb.php');
require_once('../functions/class_wtwuser.php');
class wtwiframes {
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {

	}	

	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	public $serverinstanceid = "";
	public $rootpath = "";
	public $contentpath = "";
	public $contenturl = "";
	public $protocol = "http://";
	public $domainname = "";
	public $domainurl = "";
	public $pagename = "";
	public $userid = "";
	public $userip = "";
	public $uri = "";

	public function getClientIP(){
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
		try {
			set_error_handler (
				function($errno, $errstr, $errfile, $errline) {
					throw new ErrorException($errstr, $errno, 0, $errfile, $errline);     
				}
			);
			register_shutdown_function('shutdownOnErrorIframe');
			global $wtwuser;
			if (defined('wtw_defaultdomain')) {
				$this->domainname = wtw_defaultdomain;
			}
			if (isset($_SERVER['HTTP_HOST']) && !empty($_SERVER['HTTP_HOST'])) {
				$this->domainname = strtolower($_SERVER['HTTP_HOST']);
			}
			$this->protocol = "http://";
			if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && isset($_SERVER['HTTP_X_FORWARDED_PROTO'])) {
				if ($_SERVER['HTTP_X_FORWARDED_PROTO'] == "https") {
					$this->domainurl = "https://".$this->domainname;
					$this->protocol = "https://";
					$_SERVER['HTTPS']='on';
				} else {
					$this->domainurl = "http://".$this->domainname;
				}
			} else if (empty($_SERVER['HTTPS']) || !isset($_SERVER['HTTPS'])){
				$this->domainurl = "http://".$this->domainname;
			} else if ($_SERVER['HTTPS'] == "off") {
				$this->domainurl = "http://".$this->domainname;
			} else {
				$this->domainurl = "https://".$this->domainname;
				$this->protocol = "https://";
				$_SERVER['HTTPS']='on';
			}
			if (isset($_SERVER['PHP_SELF']) && !empty($_SERVER['PHP_SELF'])) {
				$this->pagename = strtolower(basename($_SERVER['PHP_SELF']));
			} else {
				$this->pagename = "index.php";
			}
			if (isset($_SERVER['REQUEST_URI']) && !empty($_SERVER['REQUEST_URI'])) {
				$this->uri = trim(strtolower($_SERVER['REQUEST_URI']));
			}
			$this->rootpath = str_replace('\core\functions','',dirname(__FILE__));
			if (defined('wtw_contentpath')) {
				$this->contentpath = wtw_contentpath;
			} else {
				$this->contentpath = $this->rootpath."\\content";
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
			if (!empty($zuserip) && isset($zuserip)) {
				$this->userip = $zuserip;
				$wtwuser->userip = $zuserip;
			}
			if (!empty($_SESSION["wtw_userid"]) && isset($_SESSION["wtw_userid"])) {
				$zuserid = $_SESSION["wtw_userid"];
				if ($this->userExists($zuserid)) {
					$this->userid = $zuserid;
					$wtwuser->userid = $zuserid;
				}
			}
			if (!empty($_SESSION["wtw_username"]) && isset($_SESSION["wtw_username"])) {
				$this->username = $_SESSION["wtw_username"];
			}
			if (defined('wtw_serverinstanceid')) {
				$this->serverinstanceid = wtw_serverinstanceid;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwiframes.php-initClass=" . $e->getMessage());
		}
	}
	
	public function serror($message) {
		global $wtwdb;
		$wtwdb->serror($message);
	}
	
	public function query($sql) {
		global $wtwdb;
		return $wtwdb->query($sql);		
	}
	
	public function getRandomString($length,$stringtype) {
		global $wtwdb;
		return $wtwdb->getRandomString($length,$stringtype);
	}

	public function tableExists($tablename) {
		global $wtwdb;
		return $wtwdb->tableExists($tablename);
	}

	public function keyExists($tablename, $zfieldid, $zkeyid) {
		global $wtwdb;
		return $wtwdb->keyExists($tablename, $zfieldid, $zkeyid);
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
			$this->serror("core-functions-class_wtwiframes.php-getSessionUserID=" . $e->getMessage());
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

	public function requiresLogin($ziframename) {
		try {
			if (empty($this->userid) || !isset($this->userid)) {
				echo "<script>
						if (parent.dGet('".$ziframename."') != null) {
							parent.dGet('".$ziframename."').src='".$this->domainurl."/core/pages/loading.php';
						} else {
							console.log('\"".$ziframename."\" iframe id not found on parent page (called from iframe page).');
						}
					</script>";
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwiframes.php-requiresLogin=" . $e->getMessage());
		}
	}
	
	public function addUserPermissions($zusersearch, $zcommunityid, $zbuildingid, $zthingid, $zuseraccess) {
		require_once('../functions/class_wtwusers.php');
		global $wtwusers;
		return $wtwusers->addUserPermissions($zusersearch, $zcommunityid, $zbuildingid, $zthingid, $zuseraccess);
	}
	
	public function getSetting($zsettingname) {
		global $wtwdb;
		return $wtwdb->getSetting($zsettingname);
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
	
	public function getVal($key, $defaultval) {
		global $wtwdb;
		return $wtwdb->getVal($key, $defaultval);
	}

	public function getNumber($key, $defaultval) {
		global $wtwdb;
		return $wtwdb->getNumber($key, $defaultval);
	}

	public function checkIDFormat($zid) {
		global $wtwdb;
		return $wtwdb->checkIDFormat($zid);
	}

	public function checkNumber($val, $defaultval) {
		global $wtwdb;
		return $wtwdb->checkNumber($val, $defaultval);
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

	public function escapeHTML($text) {
		global $wtwdb;
		return $wtwdb->escapeHTML($text);
	}

	public function confirmKey($zkey, $zmoldgroup, $zwebid) {
		global $wtwdb;
		return $wtwdb->confirmKey($zkey, $zmoldgroup, $zwebid);
	}

	public function trackPageView($currentpage) {
		global $wtwdb;
		return $wtwdb->trackPageView($currentpage);
	}
}

	function wtwiframes() {
		return wtwiframes::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwiframes'] = wtwiframes();
	
	session_start();
	function shutdownOnErrorIframe() {
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
				$error = "<script type=\"text/javascript\">";
				try {
					$error .= "if (parent.document.getElementById('wtw_error') != null) {";
					$error .= "parent.document.getElementById('wtw_error').innerHTML = '".addslashes(str_replace("Stack trace","<br />Stack trace",$message))."';";
					$error .= "parent.WTW.openFullPageForm('error','Error Found');";
					$error .= "}";
				} catch (Exception $e) { }
				try {
					$conn = new mysqli(wtw_dbserver, wtw_dbusername, wtw_dbpassword, wtw_dbname);
					if ($conn->connect_error) {
						$error .= "console.log('Connection failed: ".str_replace("'","\'",$conn->connect_error)."');";
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
				$error .= "</script>";
				echo $error;
			}
		}
	}
	
	$wtwiframes->initClass();
?>
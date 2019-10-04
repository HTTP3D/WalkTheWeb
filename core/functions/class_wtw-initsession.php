<?php
	if (file_exists("/config/wtw_config.php")) {
		require_once('./config/wtw_config.php');
	}
	require_once('./core/functions/class_wtwuser.php');
class wtw {
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {

	}	
	
	public $version = "3.0.0";
	public $versiondate = "2019-9-30";
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
	public $community = "";
	public $building = "";
	public $thing = "";
	public $communityid = "";
	public $buildingid = "";
	public $thingid = "";
	public $fullpagedivs = array();
	public $pluginscripts = array();
	public $pluginscriptfunctions = array();
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}

	public function serror($message) {
		$returntext = "";
		try {
			$conn = new mysqli(wtw_dbserver, wtw_dbusername, wtw_dbpassword, wtw_dbname);
			if ($conn->connect_error) {
				$returntext = "Connection failed: " . $conn->connect_error;
			} else {
				$sql = "insert into ".wtw_tableprefix."errorlog 
						(message,
						 logdate)
						values
						('".addslashes(str_replace("'","\'",$message))."',
						 '".date('Y-m-d H:i:s')."');";
				try {
					$conn->query($sql);
				} catch (Exception $e) { }
				try {
					if ($this->pagename == "admin.php") {
						$error = "<script type=\"text/javascript\">";
						//$error = "console.log('".addslashes($message)."');";
						//$error .= "document.getElementById('wtw_error').innerHTML = '".addslashes($message)."';";
						//$error .= "WTW.openFullPageForm('error','Error Found');";
						$error .= "</script>";
						echo $error;
					}
				} catch (Exception $e) { }
			}
			$conn->close();
		} catch (Exception $e) {
			$returntext = "core-functions-class_wtw-initsession.php-serror=" . $e->getMessage();
		}
		return $returntext;
	}
	
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

	public function checkHost(){ 
		try {
			global $wtwuser;
			/* load class variables */
			$host= gethostname();
			$serverip = gethostbyname($host);
			if (defined('wtw_defaultdomain')) {
				$this->domainname = strtolower(wtw_defaultdomain);
			}
			if (isset($_SERVER['HTTP_HOST']) && !empty($_SERVER['HTTP_HOST'])) {
				$this->domainname = strtolower($_SERVER['HTTP_HOST']);
			}
			/* load balancer checking the site - set load balancer to check site by ip address. This will avoid a full page load for health check */
			if ($this->domainname == $serverip) { 
				echo $serverip." server is up.";
				exit();
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
				if (!empty($zuserid) && isset($zuserid)) {
					$this->userid = $zuserid;
					$wtwuser->userid = $zuserid;
				}
			}
			if (!empty($_SESSION["wtw_username"]) && isset($_SESSION["wtw_username"])) {
				$wtwuser->username = $_SESSION["wtw_username"];
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
				$wtwuser->contentpath = wtw_contentpath;
			} else {
				$this->contentpath = $this->rootpath."\\content";
				$wtwuser->contentpath = $this->rootpath."\\content";
			}
			if (defined('wtw_contenturl')) {
				$this->contenturl = $this->domainurl.wtw_contenturl;
			} else {
				$this->contenturl = $this->domainurl."/content";
			}
			if ($this->protocol == "https://"){
				session_set_cookie_params($lifetime = 0, $path = '/', $this->domainname, $secure = true, $httponly = true);
			} else {
				session_set_cookie_params($lifetime = 0, $path = '/', $this->domainname, $secure = false, $httponly = true);
			}
			if (defined('wtw_serverinstanceid')) {
				$this->serverinstanceid = wtw_serverinstanceid;
			} else {
				$this->serverinstanceid = $this->getRandomString(16,1);
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-checkHost=" . $e->getMessage());
		}
	}
	
	public function getDomainInfo() {
		try {
			if (!empty($this->uri) && isset($this->uri)) {
				$root =  explode('?', $this->uri);
				$pathdef = explode("/", $root[0]);
				if (trim($pathdef[1]) == "" || trim($pathdef[1]) == "index.php" || trim($pathdef[1]) == "admin.php" || trim($pathdef[1]) == "core" || trim($pathdef[1]) == "connect" || trim($pathdef[1]) == "content" || trim($pathdef[1]) == "config") {
					$this->community = "";
					$this->building = "";
					$this->thing = "";
					if (trim($pathdef[1]) == "connect") {
						require_once('./core/functions/class_wtwpluginloader.php');
						global $wtwpluginloader;
						$wtwpluginloader->loadConnectURL();
					}
				} else if (trim($pathdef[1]) == "community" || trim($pathdef[1]) == "communities") {
					$this->community = trim($pathdef[2]);
					$this->building = "";
					$this->thing = "";
				} else if (trim($pathdef[1]) == "building" || trim($pathdef[1]) == "buildings") {
					$this->community = "";
					$this->building = trim($pathdef[2]);
					$this->thing = "";
				} else if (trim($pathdef[1]) == "thing" || trim($pathdef[1]) == "things") {
					$this->community = "";
					$this->building = "";
					$this->thing = trim($pathdef[2]);
				} else if (isset($pathdef[3]) && !empty($pathdef[3])) {
					$this->community = trim($pathdef[1]);
					$this->building = trim($pathdef[2]);
					$this->thing = trim($pathdef[3]);
				} else if (isset($pathdef[2]) && !empty($pathdef[2])) {
					$this->community = trim($pathdef[1]);
					$this->building = trim($pathdef[2]);
					$this->thing = "";
				} else {
					$this->community = trim($pathdef[1]);
					$this->building = "";
					$this->thing = "";
				}
			} else {
				if (defined("wtw_defaultdomain")) {
					if ($this->domainname == strtolower(wtw_defaultdomain)) {
						if (defined("wtw_defaultcommunity") && defined("wtw_defaultbuilding") && defined("wtw_defaultthing")) {
							$this->community = wtw_defaultcommunity;
							$this->building = wtw_defaultbuilding;
							$this->thing = wtw_defaultthing;
						} else if (defined("wtw_defaultcommunity") && defined("wtw_defaultbuilding")) {
							$this->community = wtw_defaultcommunity;
							$this->building = wtw_defaultbuilding;
							$this->thing = "";
						} else if (defined("wtw_defaultcommunity")) {
							$this->community = wtw_defaultcommunity;
							$this->building = "";
							$this->thing = "";
						} else if (defined("wtw_defaultbuilding")) {
							$this->community = "";
							$this->building = wtw_defaultbuilding;
							$this->thing = "";
						} else if (defined("wtw_defaultthing")) {
							$this->community = "";
							$this->building = "";
							$this->thing = wtw_defaultthing;
						} else {
							$this->community = "";
							$this->building = "";
							$this->thing = "";
						}
					}
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-getDomainInfo=" . $e->getMessage());
		}
	}
	
	public function getVal($key, $defaultval) {
		$value = $defaultval;
		try {
			if(isset($_GET[$key]) && !empty($_GET[$key])) {
				$value = $_GET[$key];
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-getval=".$e->getMessage());
		}
		return $value;
	}
	
	public function getNumber($key, $defaultval) {
		$value = $defaultval;
		try {
			if(isset($_GET[$key]) && !empty($_GET[$key])) {
				if (is_numeric($_GET[$key])) {
					$value = $_GET[$key];
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-getNumber=".$e->getMessage());
		}
		return $value;
	}
	
	public function checkNumber($val, $defaultval) {
		$checkval = $defaultval;
		try {
			if (!empty($val) && isset($val)) {
				if (is_numeric($val)) {
					$checkval = $val;
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-checkNumber=".$e->getMessage());
		}
		return $checkval;
	}

	public function escapeHTML($text) {
		$checktext = "";
		try {
			if (!empty($text) && isset($text)) {
				$checktext = htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
			}
		} catch (Exception $e) {
			$this->$serrorText = "core-functions-class_wtw-initsession.php-serror=" . $e->getMessage();
		}
		return $checktext;
	}	
	
	public function getRandomString($zlength,$zstringtype) {
		$zrandomstring = '';
		try {
			$zcharacters = '';
			switch ($zstringtype) {
				case 2:
					$zcharacters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
					break;
				case 3:
					$zcharacters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#%^&*()_+=-';
					break;
				default:
					$zcharacters = '0123456789abcdefghijklmnopqrstuvwxyz';
					break;
			}
			for ($i = 0; $i < $zlength; $i++) {
				$zrandomstring .= $zcharacters[rand(0, strlen($zcharacters) - 1)];
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-getRandomString=".$e->getMessage());
		}
		return $zrandomstring;
	}
	
	public function checkDatabase() {
		/* validates or creates wtw_config.php, database, and initial admin user */
		try {
			$zsetupstep = 0;
			/* setup up /config/wtw_config.php file if it does not exist */
			if (!defined('wtw_dbserver') || !defined('wtw_dbname') || !defined('wtw_dbusername') || !defined('wtw_dbpassword') || !defined('wtw_tableprefix')) {
				$zsetupstep = 1;
				if ($_SERVER['REQUEST_METHOD']=='POST') {
					if (!file_exists("/config")) {
						mkdir($this->rootpath.'/config', 0777);
					}
					$server = $_POST["wtw_tserver"];
					$database = $_POST["wtw_tdatabase"];
					$dbuser = $_POST["wtw_tdbuser"];
					$dbpassword = $_POST["wtw_tdbpassword"];
					$prefix = $_POST["wtw_tprefix"];
					$contentpath = addslashes($this->rootpath."\\content");
					$contenturl = "/content";
					$zdomainname = "";
					if (isset($_SERVER['HTTP_HOST']) && !empty($_SERVER['HTTP_HOST'])) {
						$zdomainname = strtolower($_SERVER['HTTP_HOST']);
					}
					if (!file_exists("/config/wtw_config.php")) {
						define("wtw_serverinstanceid", $this->serverinstanceid);
						define("wtw_dbserver", $server);
						define("wtw_dbname", $database);
						define("wtw_dbusername", $dbuser);
						define("wtw_dbpassword", $dbpassword);
						define("wtw_tableprefix", $prefix);
						define("wtw_devmode", "1");
						define("wtw_contentpath", $contentpath);
						define("wtw_contenturl", $contenturl);
						define("wtw_defaultdomain", $zdomainname);
						$this->contentpath = $contentpath;
						$this->contenturl = $this->domainurl.$contenturl;
						$cfile = fopen($this->rootpath."/config/wtw_config.php","wb");
						fwrite($cfile,"<?php\r\n");
						fwrite($cfile,"    define(\"wtw_serverinstanceid\", \"".$this->serverinstanceid."\");\r\n");
						fwrite($cfile,"    define(\"wtw_dbserver\", \"".$server."\");\r\n");
						fwrite($cfile,"    define(\"wtw_dbname\", \"".$database."\");\r\n");
						fwrite($cfile,"    define(\"wtw_dbusername\", \"".$dbuser."\");\r\n");
						fwrite($cfile,"    define(\"wtw_dbpassword\", \"".$dbpassword."\");\r\n");
						fwrite($cfile,"    define(\"wtw_tableprefix\", \"".$prefix."\");\r\n\r\n");
						fwrite($cfile,"    define(\"wtw_devmode\", \"1\");\r\n\r\n");
						fwrite($cfile,"    define(\"wtw_contentpath\", \"".$contentpath."\");\r\n");
						fwrite($cfile,"    define(\"wtw_contenturl\", \"".$contenturl."\");\r\n\r\n");
						fwrite($cfile,"    define(\"wtw_defaultdomain\", \"".$zdomainname."\");\r\n\r\n");
						fwrite($cfile,"    # When someone browses your site by just the domain name...\r\n");
						fwrite($cfile,"    # wtw_defaultcommunity, wtw_defaultbuilding, and wtw_defaultthing are used to set the home page for your site.\r\n");
						fwrite($cfile,"    # Each path segment also determines which starting point the avatars will use.\r\n");
						fwrite($cfile,"    #\r\n");
						fwrite($cfile,"    # Examples:\r\n");
						fwrite($cfile,"    #\r\n");
						fwrite($cfile,"    #   define(\"wtw_defaultcommunity\", \"mycommunity\"); \r\n");
						fwrite($cfile,"    #     works like:     https://3d.yourdomain.com/mycommunity\r\n");
						fwrite($cfile,"    #     or              https://3d.yourdomain.com/communities/mycommunity\r\n");
						fwrite($cfile,"    #     sets the starting point as the community starting point\r\n");
						fwrite($cfile,"    #\r\n");
						fwrite($cfile,"    #   define(\"wtw_defaultbuilding\", \"mybuilding\");\r\n");
						fwrite($cfile,"    #     works like:     https://3d.yourdomain.com/buildings/mybuilding   (loads only the building)\r\n");
						fwrite($cfile,"    #     sets the starting point as the building starting point without a community\r\n");
						fwrite($cfile,"    # \r\n");
						fwrite($cfile,"    #   define(\"wtw_defaultthing\", \"mything\");\r\n");
						fwrite($cfile,"    #     works like:     https://3d.yourdomain.com/things/mything   (loads only the thing)\r\n");
						fwrite($cfile,"    #     sets the starting point as the thing starting point without a community or building\r\n");
						fwrite($cfile,"    # \r\n");
						fwrite($cfile,"    #   if wtw_defaultcommunity and wtw_defaultbuilding are set:\r\n");
						fwrite($cfile,"    #     works like:     https://3d.yourdomain.com/mycommunity/mybuilding\r\n");
						fwrite($cfile,"    #     sets the starting point as the building starting point in the community\r\n");
						fwrite($cfile,"    #\r\n");
						fwrite($cfile,"    #   if wtw_defaultcommunity, wtw_defaultbuilding, and wtw_defaultthing are set:\r\n");
						fwrite($cfile,"    #     works like:     https://3d.yourdomain.com/mycommunity/mybuilding/mything\r\n");
						fwrite($cfile,"    #     sets the starting point as the thing starting point in the building in the community\r\n\r\n");
	 	 				fwrite($cfile,"    #define(\"wtw_defaultcommunity\", \"mycommunity\");\r\n");
						fwrite($cfile,"    #define(\"wtw_defaultbuilding\", \"mybuilding\");\r\n");
						fwrite($cfile,"    #define(\"wtw_defaultthing\", \"mything\");\r\n\r\n");
						fwrite($cfile,"?>");
						fclose($cfile);
						$zsetupstep = 0;
						header("Location: ".$this->domainurl."/"); 
						exit();
					} else {
						$zsetupstep = 2;
					}
				} else if (defined('wtw_dbserver') || defined('wtw_dbname') || defined('wtw_dbusername') || defined('wtw_dbpassword') || defined('wtw_tableprefix')) {
					$zsetupstep = 2;
				}
			} else {
				if (!defined('wtw_serverinstanceid')) {
					define("wtw_serverinstanceid", $this->serverinstanceid);
					$lines = file("/config/wtw_config.php");
					$last = sizeof($lines) - 1 ; 
					unset($lines[$last]); 
					$cfile = fopen($this->rootpath."/config/wtw_config.php","wb");
					fwrite($cfile, implode('', $lines));
					fwrite($cfile,"    define(\"wtw_serverinstanceid\", \"".$this->serverinstanceid."\");\r\n");
					fwrite($cfile,"?>");
					fclose($cfile);
				}
			}
			if ($zsetupstep == 0) {
				require_once('./core/functions/class_wtwdb.php');
				require_once('./core/functions/class_wtwusers.php');
				require_once('./core/functions/class_wtwpluginloader.php');
				$conn = new mysqli(wtw_dbserver, wtw_dbusername, wtw_dbpassword, wtw_dbname);
				if ($conn->connect_error) {
					$zsetupstep = 2;
				} else {
					/* setup database if it does not exist */
					$zsetupstep = 3; /* check if tables exist... using prefix ... 3 == not... */
					$sql = "show tables like '".wtw_tableprefix."webimages';";
					$result = $conn->query($sql);
					if (is_object($result)) {
						if ($result->num_rows > 0) {
							$zsetupstep = 0;
						}
					} 
				}
				$conn->close();
				if ($zsetupstep == 3) { /* check for new install... previous Install with different prefix */
					global $wtwdb;
					$zresults = $wtwdb->query("select count(*) as scount 
						from information_schema.tables 
						where table_schema = '".wtw_dbname."';");
					foreach ($zresults as $zrow) {
						if (!empty($zrow['scount']) && isset($zrow['scount'])) {
							if ($zrow['scount'] > 0) {
								$zsetupstep = 4; /* found another install in database */
							}
						}
					}
					$confirm = "";
					if ($zsetupstep == 4 && $_SERVER['REQUEST_METHOD']=='POST') {
						try {
							$confirm = $_POST["wtw_tconfirm"];
						} catch (Exception $e){}
					}
					if ($zsetupstep == 3 || ($confirm == "YES" && $zsetupstep == 4)) {
						require_once('./core/functions/class_wtwtables.php');
						global $wtwtables;
						$wtwtables->newDbInstall();
						$zsetupstep = 0;
						header("Location: ".$this->domainurl."/"); 
						exit();
					}
				} 
			}
			if ($zsetupstep == 0) {
				set_error_handler (
					function($errno, $errstr, $errfile, $errline) {
						throw new ErrorException($errstr, $errno, 0, $errfile, $errline);     
					}
				);
				register_shutdown_function('shutdownOnError');
				global $wtwdb;
				$zsetupstep = 3;
				/* setup admin user if it does not exist */
				$zresults = $wtwdb->query("select * 
					from ".wtw_tableprefix."users 
					limit 1;");
				if (count($zresults) > 0) {
					$zsetupstep = 0;
				}
				if ($zsetupstep == 0) {
					if (!empty($this->userid) && isset($this->userid)) {
						global $wtwuser;
						$zresults = $wtwdb->query("select * 
							from ".wtw_tableprefix."users 
							where userid='".$this->userid."'
								and deleted=0
							limit 1;");
						foreach ($zresults as $zrow) {
							$wtwuser->email = $zrow["email"];
							$wtwuser->userimageurl = $zrow["userimageurl"];
							$wtwuser->uploadpathid = $zrow["uploadpathid"];
						}
					}
				}
			}
			if ($zsetupstep == 3) {
				if ($_SERVER['REQUEST_METHOD']=='POST') {
					try {
						require_once('./core/functions/class_wtwtables.php');
						global $wtwusers;
						global $wtwtables;
						$zsitename = $_POST["wtw_tsitename"];
						$zanalytics = $_POST["wtw_tanalytics"];
						$zadminuser = $_POST["wtw_tadminuser"];
						$zadminpassword = $_POST["wtw_tadminpassword"];
						$zadminpassword2 = $_POST["wtw_tadminpassword2"];
						$zadminemail = $_POST["wtw_tadminemail"];
						
						if (file_exists("/config/wtw_config.php") && !defined('wtw_defaultsitename')) {
							$lines = file("/config/wtw_config.php");
							$last = sizeof($lines) - 1 ; 
							unset($lines[$last]); 
							$cfile = fopen($this->rootpath."/config/wtw_config.php","wb");
							fwrite($cfile, implode('', $lines));
							fwrite($cfile,"    define(\"wtw_defaultsitename\", \"".$zsitename."\");\r\n");
							fwrite($cfile,"    define(\"wtw_googleanalytics\", \"".$zanalytics."\");\r\n");
							fwrite($cfile,"    define(\"wtw_defaultfromemail\", \"".$zadminemail."\");\r\n");
							fwrite($cfile,"?>");
							fclose($cfile);
						}
						$zuserid = $wtwusers->firstAdminUser($zadminuser,$zadminpassword,$zadminemail);
						$wtwtables->loadInitDbData($zuserid);
						$wtwusers->addUserRole($zuserid, 'Admin');
						header("Location: ".$this->domainurl."/"); 
						exit();
					} catch (Exception $e){}
				}
			}
			if ($zsetupstep == 0) {
				global $wtwdb;
				$scount = 0;
				$zresults = $wtwdb->query("select count(*) scount 
					from ".wtw_tableprefix."communities;");
				foreach ($zresults as $zrow) {
					$scount = $zrow["scount"];
				}
				if ($scount == 0) {
					if (empty($_SESSION["wtw_userid"]) || !isset($_SESSION["wtw_userid"])) {
						$zsetupstep = 5;
						if ($_SERVER['REQUEST_METHOD']=='POST') {
							global $wtwusers;
							$zadminuser = base64_encode($_POST["wtw_tadminuser"]);
							$zadminpassword = base64_encode($_POST["wtw_tadminpassword"]);
							$zuser = $wtwusers->loginAttempt($zadminuser,'',$zadminpassword);
							if (!empty($_SESSION["wtw_userid"]) && isset($_SESSION["wtw_userid"])) {
								$zsetupstep = 0;
							}
						}
					}
					if ($zsetupstep == 0) { 
						$zsetupstep = 6;
					}
				}
			}
			if ($zsetupstep == 0) {
				global $wtwdb;
				$scount = 0;
				$zresults = $wtwdb->query("select count(*) scount 
					from ".wtw_tableprefix."buildings;");
				foreach ($zresults as $zrow) {
					$scount = $zrow["scount"];
				}
				if ($scount == 0) {
					if (empty($_SESSION["wtw_userid"]) || !isset($_SESSION["wtw_userid"])) {
						$zsetupstep = 5;
						if ($_SERVER['REQUEST_METHOD']=='POST') {
							global $wtwusers;
							$zadminuser = base64_encode($_POST["wtw_tadminuser"]);
							$zadminpassword = base64_encode($_POST["wtw_tadminpassword"]);
							$zuser = $wtwusers->loginAttempt($zadminuser,'',$zadminpassword);
							if (!empty($_SESSION["wtw_userid"]) && isset($_SESSION["wtw_userid"])) {
								$zsetupstep = 0;
							}
						}
					}
					if ($zsetupstep == 0) {
						$zsetupstep = 7;
					}
				}
			} 
			switch ($zsetupstep) {
				case 1: /* Need to set up Database Login */
					echo "<!DOCTYPE html><html><head><title>WalkTheWeb Setup</title>";
					echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"/core/styles/wtw_install.css\" /></head>";
					echo "<body style='background-color:grey;font-family:arial;'><form id='wtw_form1' action='' method='post'>";
					echo "<div style='width:100%;'><br /><div style='border:1px solid black;background-color:white;width:400px;margin-top:20px;margin-bottom:20px;margin-left:auto;margin-right:auto;'>";
					echo "<img src='/content/system/images/wtwlogo.png' style='margin-left:40px;margin-right:40px;' />";
					echo "<hr /><h3 class=\"wtw-icenter\" style='margin-top:0px;'>Database Setup</h3>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Server:</b></div>";
					echo "<input name='wtw_tserver' type='text' value='127.0.0.1:3306' size='20' maxlength='255' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Database Name:</b></div>";
					echo "<input name='wtw_tdatabase' type='text' value='' size='20' maxlength='255' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Database User:</b></div>";
					echo "<input name='wtw_tdbuser' type='text' value='' size='20' maxlength='255' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Database Password:</b></div>";
					echo "<input name='wtw_tdbpassword' type='password' value='' size='20' maxlength='64' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Table Prefix:</b></div>";
					echo "<input name='wtw_tprefix' type='text' value='wtw_' size='20' maxlength='24' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					echo "<div class=\"wtw-icenter\"><input name='wtw_bsave' type='submit' value='Save' style='font-size:1.4em;width:120px;border-radius:10px;' /></div>";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					echo "</div><br /></div><br /></form></body></html>";
					die;
					break;
				case 2: /* error in connection to database */
					echo "<!DOCTYPE html><html><head><title>WalkTheWeb Setup</title>";
					echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"/core/styles/wtw_install.css\" /></head>";
					echo "<body style='background-color:grey;font-family:arial;'><form id='wtw_form1' action='' method='post'>";
					echo "<div style='width:100%;'><br /><div style='border:1px solid black;background-color:white;width:400px;margin-top:20px;margin-bottom:20px;margin-left:auto;margin-right:auto;'>";
					echo "<img src='/content/system/images/wtwlogo.png' style='margin-left:40px;margin-right:40px;' />";
					echo "<hr /><h3 class=\"wtw-icenter\" style='margin-top:0px;'>Database Connection Error</h3>";
					echo "<div style='margin-left:10px;'><b>Edit your config file:</b><br /><br /><div style='margin-left:10px;'>";
					echo "/config/wtw_config.php<br /><br /><br /></div>";
					echo "<b>Confirm the following lines exist:</b><br /><br /><div style='margin-left:10px;'>";
					echo "define(\"wtw_dbserver\", \"YourServer\");<br />";
					echo "define(\"wtw_dbname\", \"YourDatabase\");<br />";
					echo "define(\"wtw_dbusername\", \"YourDbUser\");<br />";
					echo "define(\"wtw_dbpassword\", \"YourDbPassword\");<br />";
					echo "define(\"wtw_tableprefix\", \"YourTablePrefix\");<br /><br />";
					echo "define(\"wtw_contentpath\", \"YourContentPath\");<br />";
					echo "define(\"wtw_contenturl\", \"YourContentUrl\");<br /><br /><br />";
					echo "</div></div><div class=\"wtw-icenter\"><input name='wtw_bsave' type='submit' value='Retry' style='font-size:1.4em;width:120px;border-radius:10px;' /></div>";
					echo "<br /></div><br /></div><br /></form></body></html>";
					die;
					break;
				case 3: /* new install - empty database */
					echo "<!DOCTYPE html><html><head><title>WalkTheWeb Setup</title>";
					echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"/core/styles/wtw_install.css\" /></head>";
					echo "<body style='background-color:grey;font-family:arial;'><form id='wtw_form1' action='' method='post'><div style='width:100%;'><br /><div style='border:1px solid black;background-color:white;width:400px;margin-top:20px;margin-bottom:20px;margin-left:auto;margin-right:auto;'>";
					echo "<img src='/content/system/images/wtwlogo.png' style='margin-left:40px;margin-right:40px;' />";

					echo "<hr /><h3 class=\"wtw-icenter\" style='margin-top:0px;'>Admin Account</h3>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Admin Username:</b></div>";
					echo "<input name='wtw_tadminuser' type='text' value='' size='20' maxlength='255' autocomplete='username' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Admin Password:</b></div>";
					echo "<input name='wtw_tadminpassword' type='password' value='' size='20' maxlength='24' autocomplete='new-password' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Confirm Password:</b></div>";
					echo "<input name='wtw_tadminpassword2' type='password' value='' size='20' maxlength='24' autocomplete='new-password' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Admin Email:</b></div>";
					echo "<input name='wtw_tadminemail' type='text' value='' size='20' maxlength='255' autocomplete='email' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";

					echo "<hr /><h3 class=\"wtw-icenter\" style='margin-top:0px;'>Site Settings</h3>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Site Name:</b></div>";
					echo "<input name='wtw_tsitename' type='text' value='My 3D Website' size='20' maxlength='255' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Google Analytics (Optional):</b></div>";
					echo "<input name='wtw_tanalytics' type='text' value='' size='20' maxlength='24' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					
					echo "<div class=\"wtw-icenter\"><input name='wtw_bsave' type='submit' value='Save' style='font-size:1.4em;width:120px;border-radius:10px;' /></div>";
					echo "<br /></div><br /></div><br /></form></body></html>";
					die;
					break;
				case 4: /* found another install - confirm add new tables */
					echo "<!DOCTYPE html><html><head><title>WalkTheWeb Setup</title>";
					echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"/core/styles/wtw_install.css\" />";
					echo "<script src=\"/core/scripts/prime/wtw_install.js\"></script></head>";
					echo "<body style='background-color:grey;font-family:arial;'><form id='wtw_form1' action='' method='post'>";
					echo "<div style='width:100%;'><br /><div style='border:1px solid black;background-color:white;width:400px;margin-top:20px;margin-bottom:20px;margin-left:auto;margin-right:auto;'>";
					echo "<img src='/content/system/images/wtwlogo.png' style='margin-left:40px;margin-right:40px;' />";
					echo "<hr /><h3 class=\"wtw-icenter\" style='margin-top:0px;'>Found Another Install</h3>";
					echo "<div style='margin-left:10px;'><b>Edit your config file:</b><br /><br /><div style='margin-left:10px;'>";
					echo "/config/wtw_config.php<br /><br /><br /></div>";
					echo "<b>Confirm the following line:</b><br /><br /><div style='margin-left:10px;'>";
					echo "define(\"wtw_tableprefix\", \"YourTablePrefix\");<br /><br /><br />";
					echo "<b>OR</b><br /><span style='color:red;font-weight:bold;'>CONFIRM you wish to add new tables to this database.</span><br /><br /><br />";
					echo "<input id='wtw_tconfirm' name='wtw_tconfirm' type='hidden' value='' />";
					echo "</div></div><div class=\"wtw-icenter\"><input name='wtw_bconfirmsubmit' type='submit' value='Confirm' style='font-size:1.4em;width:120px;border-radius:10px;' onclick=\"dGet('wtw_tconfirm').value='YES';\" /></div>";
					echo "<br /></div><br /></div><br /></form></body></html>";
					die;
					break;
				case 5: /* user not logged in - Admin login screen */
					echo "<!DOCTYPE html><html><head><title>WalkTheWeb Setup</title>";
					echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"/core/styles/wtw_install.css\" /></head>";
					echo "<body style='background-color:grey;font-family:arial;'><form id='wtw_form1' action='' method='post'>";
					echo "<div style='width:100%;'><br /><div style='border:1px solid black;background-color:white;width:400px;margin-top:20px;margin-bottom:20px;margin-left:auto;margin-right:auto;'>";
					echo "<img src='/content/system/images/wtwlogo.png' style='margin-left:40px;margin-right:40px;' />";

					echo "<hr /><h3 class=\"wtw-icenter\" style='margin-top:0px;'>Admin Login</h3>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Admin Username:</b></div>";
					echo "<input name='wtw_tadminuser' type='text' value='' size='20' maxlength='255' autocomplete='username' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Admin Password:</b></div>";
					echo "<input name='wtw_tadminpassword' type='password' value='' size='20' maxlength='24' autocomplete='current-password' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";

					echo "<div class=\"wtw-icenter\"><input name='wtw_blogin' type='submit' value='Login' style='font-size:1.4em;width:120px;border-radius:10px;' /></div>";
					echo "<br /></div><br /></div><br /></form></body></html>";
					die;					
					break;
				case 6: /* select Your 3D Community */
					echo "<!DOCTYPE html><html><head><title>WalkTheWeb Setup</title>";
					echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"/core/styles/wtw_install.css\" />";
					echo "<script>var wtw_domainname = '".$this->domainname."';</script>";
					echo "<script src=\"/core/scripts/prime/wtw_install.js\"></script>";
					echo "<script src=\"/core/scripts/prime/wtw_downloads.js\"></script>";
					echo "</head><body style='background-color:grey;font-family:arial;'><form id='wtw_form1' action='' method='post'>";
					echo "<div style='width:100%;'><br /><div style='border:1px solid black;background-color:white;width:80%;margin-top:20px;margin-bottom:20px;margin-left:auto;margin-right:auto;text-align:center;'>";
					echo "<img src='/content/system/images/wtwlogo.png' />";
					echo "<input type=\"hidden\" id=\"wtw_serverinstanceid\" value=\"".$this->serverinstanceid."\" />";

					echo "<div id=\"wtw_selectwebform\">";
					echo "<hr /><h3 class=\"wtw-icenter\" style='margin-top:0px;'>Select Your First 3D Community Scene</h3>";
					echo "<b>Search:</b> <input id='wtw_tcommunitysearch' name='wtw_tcommunitysearch' type='text' value='' size='20' maxlength='255' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";

					echo "<div class='wtw-icenter'><input name='wtw_bcommunitysearch' type='button' value='Search' onclick=\"WTW.communitySearch(dGet('wtw_tcommunitysearch').value);\" style='font-size:1.4em;width:120px;border-radius:10px;' /></div>";
					echo "<br /><hr /><div id='wtw_commtempsearchresults' style='margin-left:20px;text-align:left;'></div>";
					echo "</div><div id=\"wtw_installprogress\" class=\"wtw-ihide wtw-iprogresssection\">";
					echo "<hr /><h3 class=\"wtw-icenter\" style='margin-top:0px;'>Installing Your First 3D Community Scene</h3>";
					echo "<div id=\"wtw_progresstext\" class=\"wtw-iprogresstext\">&nbsp;</div>";
					echo "<div class=\"wtw-iprogressdiv\"><div id=\"wtw_progressbar\" class=\"wtw-iprogressbar\"></div></div>";
					echo "</div><div id=\"wtw_iframesdiv\" style=\"display:none;visibility:hidden;\"></div></div><br /></div><br /></form>";
					echo "<script>";
					echo "WTW.communitySearch('');";
					echo "</script></body></html>";
					die;
					break;
				case 7: /* select Your 3D Building */
					echo "<!DOCTYPE html><html><head><title>WalkTheWeb Setup</title>";
					echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"/core/styles/wtw_install.css\" />";
					echo "<script>var wtw_domainname = '".$this->domainname."';</script>";
					echo "<script src=\"/core/scripts/prime/wtw_install.js\"></script>";
					echo "<script src=\"/core/scripts/prime/wtw_downloads.js\"></script>";
					echo "</head><body style='background-color:grey;font-family:arial;'><form id='wtw_form1' action='' method='post'>";
					echo "<div style='width:100%;'><br /><div style='border:1px solid black;background-color:white;width:80%;margin-top:20px;margin-bottom:20px;margin-left:auto;margin-right:auto;text-align:center;'>";
					echo "<img src='/content/system/images/wtwlogo.png' />";
					echo "<input type=\"hidden\" id=\"wtw_serverinstanceid\" value=\"".$this->serverinstanceid."\" />";

					echo "<div id=\"wtw_selectwebform\">";
					echo "<hr /><h3 class=\"wtw-icenter\" style='margin-top:0px;'>Select Your First 3D Building Scene</h3>";
					echo "<b>Search:</b> <input id='wtw_tbuildingsearch' name='wtw_tbuildingsearch' type='text' value='' size='20' maxlength='255' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";

					echo "<div class='wtw-icenter'><input name='wtw_bbuildingsearch' type='button' value='Search' onclick=\"WTW.buildingSearch(dGet('wtw_tbuildingsearch').value);\" style='font-size:1.4em;width:120px;border-radius:10px;' /></div>";
					echo "<br /><hr /><div id='wtw_buildtempsearchresults' style='margin-left:20px;text-align:left;'></div>";
					echo "</div><div id=\"wtw_installprogress\" class=\"wtw-ihide wtw-iprogresssection\">";
					echo "<hr /><h3 class=\"wtw-icenter\" style='margin-top:0px;'>Installing Your First 3D Building Scene</h3>";
					echo "<div id=\"wtw_progresstext\" class=\"wtw-iprogresstext\">&nbsp;</div>";
					echo "<div class=\"wtw-iprogressdiv\"><div id=\"wtw_progressbar\" class=\"wtw-iprogressbar\"></div></div>";
					echo "</div><div id=\"wtw_iframesdiv\" style=\"display:none;visibility:hidden;\"></div></div><br /></div><br /></form>";
					echo "<script>";
					echo "WTW.buildingSearch('');";
					echo "</script></body></html>";
					die;
					break;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-checkDatabase=".$e->getMessage());
		}
	}

	public function checkWeb() {
		/* check if domain name is set to a Community and check if https is available */
		global $wtwdb;
		try {
			if (!empty($this->community)) {
				if ($wtwdb->checkPublishName($this->domainname, "community", $this->community) == false) {
					$this->community = "";
				}
			}
			if (!empty($this->building)) {
				if ($wtwdb->checkPublishName($this->domainname, "building", $this->building) == false) {
					$this->building = "";
				}
			}
			if (!empty($this->thing)) {
				if ($wtwdb->checkPublishName($this->domainname, "thing", $this->thing) == false) {
					$this->thing = "";
				}
			}
			if ($this->pagename == "admin.php" && ($wtwdb->isUserInRole('admin') || $wtwdb->isUserInRole('architect') || $wtwdb->isUserInRole('developer') || $wtwdb->isUserInRole('graphics artist'))) {
				if(isset($_GET["communityid"]) && !empty($_GET["communityid"])) {
					$this->communityid = $wtwdb->checkIDFormat($_GET["communityid"]);
				}
				if(isset($_GET["buildingid"]) && !empty($_GET["buildingid"])) {
					$this->buildingid = $wtwdb->checkIDFormat($_GET["buildingid"]);
				}
				if(isset($_GET["thingid"]) && !empty($_GET["thingid"])) {
					$this->thingid = $wtwdb->checkIDFormat($_GET["thingid"]);
				}
				if (!empty($this->communityid)) {
					$this->buildingid = "";
					$this->thingid = "";
				} else if (!empty($this->buildingid)) {
					$this->thingid = "";
				}
			} else if ($this->pagename == "admin.php") {
				header("Location: ".$this->domainurl."/"); 
				exit();
			} else {
				$sql = "
					select *
					from ".wtw_tableprefix."webaliases
					where domainname='".$this->domainname."'
						and deleted=0";
				if (!empty($this->community)) {
					$sql .= " and (communitypublishname='".$this->community."' or communityid='".$this->community."')";
				} else {
					$sql .= " and communitypublishname=''";
				}
				if (!empty($this->building)) {
					$sql .= " and (buildingpublishname='".$this->building."' or buildingid='".$this->building."')";
				} else {
					$sql .= " and buildingpublishname=''";
				}
				if (!empty($this->thing)) {
					$sql .= " and (thingpublishname='".$this->thing."' or thingid'".$this->thing."')";
				} else {
					$sql .= " and thingpublishname=''";
				}
				$sql .= " order by createdate limit 1;";
				
				$zresults = $wtwdb->query($sql);
				foreach ($zresults as $zrow) {
					if (!empty($zrow["communityid"]) && isset($zrow["communityid"])) {
						$this->communityid = $zrow["communityid"];
					}
					if (!empty($zrow["buildingid"]) && isset($zrow["buildingid"])) {
						$this->buildingid = $zrow["buildingid"];
					}
					if (!empty($zrow["thingid"]) && isset($zrow["thingid"])) {
						$this->thingid = $zrow["thingid"];
					}
					if (!empty($zrow["forcehttps"]) && isset($zrow["forcehttps"])) {
						if ($zrow["forcehttps"] == "1" && $this->protocol == "http://") {
							header("Location: https://".$this->domainname.$this->uri); 
							exit();
						} else if ($zrow["forcehttps"] == "0" && $this->protocol == "https://") {
							header("Location: http://".$this->domainname.$this->uri); 
							exit();
						}
					}
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-checkHost=".$e->getMessage());
		}
	}
	
	public function getAdjustedPosition($zpositionx, $zpositiony, $zpositionz, $zrotationx, $zrotationy, $zrotationz, $zscalingx, $zscalingy, $zscalingz, $z2positionx, $z2positiony, $z2positionz, $z2rotationx, $z2rotationy, $z2rotationz, $z2scalingx, $z2scalingy, $z2scalingz) {
		$adjpos = array();
		try {
			/* adjust avatar position in world (x,y,z) space for being nested under another object - 
				example: avatar position relative to a building in a community */
			/* use z2 variables to calculate te adjustments and apply them to the z variables */
			
			
			// deg2rad(); php function
			
			
			$adjpos = array(
				'positionx' => $zpositionx,
				'positiony' => $zpositiony,
				'positionz' => $zpositionz,
				'rotationx' => $zrotationx,
				'rotationy' => $zrotationy,
				'rotationz' => $zrotationz,
				'scalingx' => $zscalingx,
				'scalingy' => $zscalingy,
				'scalingz' => $zscalingz);
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-checkHost=".$e->getMessage());
		}
		return $adjpos;
	}

	public function userHasArchitect($zrolename) {
		$hasaccess = false;
		try {
			if ($zrolename == 'Admin' || $zrolename == 'Architect' || $zrolename == 'Developer' || $zrolename == 'Graphics Artist') {
				$hasaccess = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-userHasArchitect=".$e->getMessage());
		}
		return $hasaccess;
	}
		

	public function getSceneSetting() {
		/* check if domain name is set to a Community and check if https is available */
		global $wtwdb;
		$initialscene = array();
		try {
			/* select initial avater position based on path publish names */
			$zpositionx = 0;
			$zpositiony = 0;
			$zpositionz = 0;
			$zrotationx = 0;
			$zrotationy = 0;
			$zrotationz = 0;
			$zscalingx = 0;
			$zscalingy = 0;
			$zscalingz = 0;
			$zgroundpositiony = 0;
			$zwaterpositiony = -1;
			$zdomaininfo = array();
			$zcommunityinfo = array();
			$zbuildinginfo = array();
			$zthinginfo = array();
			$zcommunityaccess = array();
			$zbuildingaccess = array();
			$zthingaccess = array();
			if (!empty($this->userid) && isset($this->userid)) {
				/* get user access to this web items */
				if (!empty($this->communityid)) {
					$zresults = $wtwdb->query("
						select r.roleid, r.rolename 
						from ".wtw_tableprefix."userauthorizations a
							inner join ".wtw_tableprefix."usersinroles u
								on a.userid = u.userid
							inner join ".wtw_tableprefix."roles r
								on u.roleid = r.roleid
						where u.userid='".$this->userid."'
							and a.communityid='".$this->communityid."'
							and u.deleted=0
							and r.deleted=0
						order by r.rolename, r.roleid");
					$i = 0;
					foreach ($zresults as $zrow) {
						$zcommunityaccess[$i] = $zrow["rolename"];
						if ($this->pagename == "admin.php" && $this->userHasArchitect($zrow["rolename"]) == false) {
							header("Location: ".$this->domainurl);
							exit();
						}
						$i += 1;
					}
				}
				if (!empty($this->buildingid)) {
					$zresults = $wtwdb->query("
						select r.roleid, r.rolename 
						from ".wtw_tableprefix."userauthorizations a
							inner join ".wtw_tableprefix."usersinroles u
								on a.userid = u.userid
							inner join ".wtw_tableprefix."roles r
								on u.roleid = r.roleid
						where u.userid='".$this->userid."'
							and a.buildingid='".$this->buildingid."'
							and u.deleted=0
							and r.deleted=0
						order by r.rolename, r.roleid");
					$i = 0;
					foreach ($zresults as $zrow) {
						$zbuildingaccess[$i] = $zrow["rolename"];
						if ($this->pagename == "admin.php" && $this->userHasArchitect($zrow["rolename"]) == false) {
							header("Location: ".$this->domainurl);
							exit();
						}
						$i += 1;
					}
				}
				if (!empty($this->thingid)) {
					$zresults = $wtwdb->query("
						select r.roleid, r.rolename 
						from ".wtw_tableprefix."userauthorizations a
							inner join ".wtw_tableprefix."usersinroles u
								on a.userid = u.userid
							inner join ".wtw_tableprefix."roles r
								on u.roleid = r.roleid
						where u.userid='".$this->userid."'
							and a.thingid='".$this->thingid."'
							and u.deleted=0
							and r.deleted=0
						order by r.rolename, r.roleid");
					$i = 0;
					foreach ($zresults as $zrow) {
						$zthingaccess[$i] = $zrow["rolename"];
						if ($this->pagename == "admin.php" && $this->userHasArchitect($zrow["rolename"]) == false) {
							header("Location: ".$this->domainurl);
							exit();
						}
						$i += 1;
					}
				}
			}
			
			if (!empty($this->communityid) && !empty($this->buildingid) && !empty($this->thingid)) {
				$zresults = $wtwdb->query("
					select positionx, positiony, positionz, rotationx, rotationy, rotationz, scalingx, scalingy, scalingz
					from ".wtw_tableprefix."things
					where thingid='".$this->thingid."'
						and deleted=0
					limit 1;");
				foreach ($zresults as $zrow) {
					$zpositionx = $this->checkNumber($zrow["positionx"],0);
					$zpositiony = $this->checkNumber($zrow["positiony"],0);
					$zpositionz = $this->checkNumber($zrow["positionz"],0);
					$zrotationx = $this->checkNumber($zrow["rotationx"],0);
					$zrotationy = $this->checkNumber($zrow["rotationy"],0);
					$zrotationz = $this->checkNumber($zrow["rotationz"],0);
					$zscalingx = $this->checkNumber($zrow["scalingx"],1);
					$zscalingy = $this->checkNumber($zrow["scalingy"],1);
					$zscalingz = $this->checkNumber($zrow["scalingz"],1);
				}
				if (!empty($this->buildingid)) {
					$zresults = $wtwdb->query("
						select positionx, positiony, positionz, rotationx, rotationy, rotationz, scalingx, scalingy, scalingz
						from ".wtw_tableprefix."connectinggrids
						where childwebid='".$this->thingid."'
							and parentwebid='".$this->buildingid."'
							and deleted=0
						limit 1;");
					foreach ($zresults as $zrow) {
						/* where the thing is within a building */
						$z2positionx = $this->checkNumber($zrow["positionx"],0);
						$z2positiony = $this->checkNumber($zrow["positiony"],0);
						$z2positionz = $this->checkNumber($zrow["positionz"],0);
						$z2rotationx = $this->checkNumber($zrow["rotationx"],0);
						$z2rotationy = $this->checkNumber($zrow["rotationy"],0);
						$z2rotationz = $this->checkNumber($zrow["rotationz"],0);
						$z2scalingx = $this->checkNumber($zrow["scalingx"],1);
						$z2scalingy = $this->checkNumber($zrow["scalingy"],1);
						$z2scalingz = $this->checkNumber($zrow["scalingz"],1);
						/* calculate values based on item placement using connecting grid */
						$adjpos = $this->getAdjustedPosition($zpositionx, $zpositiony, $zpositionz, $zrotationx, $zrotationy, $zrotationz, $zscalingx, $zscalingy, $zscalingz, $z2positionx, $z2positiony, $z2positionz, $z2rotationx, $z2rotationy, $z2rotationz, $z2scalingx, $z2scalingy, $z2scalingz);
						$zpositionx = $adjpos["positionx"];
						$zpositiony = $adjpos["positiony"];
						$zpositionz = $adjpos["positionz"];
						$zrotationx = $adjpos["rotationx"];
						$zrotationy = $adjpos["rotationy"];
						$zrotationz = $adjpos["rotationz"];
						$zscalingx = $adjpos["scalingx"];
						$zscalingy = $adjpos["scalingy"];
						$zscalingz = $adjpos["scalingz"];
					}
				}
				if (!empty($this->communityid)) {
					$zresults = $wtwdb->query("
						select positionx, positiony, positionz, rotationx, rotationy, rotationz, scalingx, scalingy, scalingz
						from ".wtw_tableprefix."connectinggrids
						where childwebid='".$this->buildingid."'
							and parentwebid='".$this->communityid."'
							and deleted=0
						limit 1;");
					foreach ($zresults as $zrow) {
						/* where the building is within the community */
						$z2positionx = $this->checkNumber($zrow["positionx"],0);
						$z2positiony = $this->checkNumber($zrow["positiony"],0);
						$z2positionz = $this->checkNumber($zrow["positionz"],0);
						$z2rotationx = $this->checkNumber($zrow["rotationx"],0);
						$z2rotationy = $this->checkNumber($zrow["rotationy"],0);
						$z2rotationz = $this->checkNumber($zrow["rotationz"],0);
						$z2scalingx = $this->checkNumber($zrow["scalingx"],1);
						$z2scalingy = $this->checkNumber($zrow["scalingy"],1);
						$z2scalingz = $this->checkNumber($zrow["scalingz"],1);
						/* calculate values based on item placement using connecting grid */
						$adjpos = $this->getAdjustedPosition($zpositionx, $zpositiony, $zpositionz, $zrotationx, $zrotationy, $zrotationz, $zscalingx, $zscalingy, $zscalingz, $z2positionx, $z2positiony, $z2positionz, $z2rotationx, $z2rotationy, $z2rotationz, $z2scalingx, $z2scalingy, $z2scalingz);
						$zpositionx = $adjpos["positionx"];
						$zpositiony = $adjpos["positiony"];
						$zpositionz = $adjpos["positionz"];
						$zrotationx = $adjpos["rotationx"];
						$zrotationy = $adjpos["rotationy"];
						$zrotationz = $adjpos["rotationz"];
						$zscalingx = $adjpos["scalingx"];
						$zscalingy = $adjpos["scalingy"];
						$zscalingz = $adjpos["scalingz"];
					}
				}
			} else if (!empty($this->communityid) && !empty($this->buildingid)) {
				$zresults = $wtwdb->query("
					select positionx, positiony, positionz, rotationx, rotationy, rotationz, scalingx, scalingy, scalingz
					from ".wtw_tableprefix."buildings
					where buildingid='".$this->buildingid."'
						and deleted=0
					limit 1;");
				foreach ($zresults as $zrow) {
					$zpositionx = $this->checkNumber($zrow["positionx"],0);
					$zpositiony = $this->checkNumber($zrow["positiony"],0);
					$zpositionz = $this->checkNumber($zrow["positionz"],0);
					$zrotationx = $this->checkNumber($zrow["rotationx"],0);
					$zrotationy = $this->checkNumber($zrow["rotationy"],0);
					$zrotationz = $this->checkNumber($zrow["rotationz"],0);
					$zscalingx = $this->checkNumber($zrow["scalingx"],1);
					$zscalingy = $this->checkNumber($zrow["scalingy"],1);
					$zscalingz = $this->checkNumber($zrow["scalingz"],1);
				}
				if (!empty($this->communityid)) {
					$zresults = $wtwdb->query("
						select positionx, positiony, positionz, rotationx, rotationy, rotationz, scalingx, scalingy, scalingz
						from ".wtw_tableprefix."connectinggrids
						where childwebid='".$this->buildingid."'
							and parentwebid='".$this->communityid."'
							and deleted=0
						limit 1;");
					foreach ($zresults as $zrow) {
						/* where the building is within the community */
						$z2positionx = $this->checkNumber($zrow["positionx"],0);
						$z2positiony = $this->checkNumber($zrow["positiony"],0);
						$z2positionz = $this->checkNumber($zrow["positionz"],0);
						$z2rotationx = $this->checkNumber($zrow["rotationx"],0);
						$z2rotationy = $this->checkNumber($zrow["rotationy"],0);
						$z2rotationz = $this->checkNumber($zrow["rotationz"],0);
						$z2scalingx = $this->checkNumber($zrow["scalingx"],1);
						$z2scalingy = $this->checkNumber($zrow["scalingy"],1);
						$z2scalingz = $this->checkNumber($zrow["scalingz"],1);
						/* calculate values based on item placement using connecting grid */
						$adjpos = $this->getAdjustedPosition($zpositionx, $zpositiony, $zpositionz, $zrotationx, $zrotationy, $zrotationz, $zscalingx, $zscalingy, $zscalingz, $z2positionx, $z2positiony, $z2positionz, $z2rotationx, $z2rotationy, $z2rotationz, $z2scalingx, $z2scalingy, $z2scalingz);
						$zpositionx = $adjpos["positionx"];
						$zpositiony = $adjpos["positiony"];
						$zpositionz = $adjpos["positionz"];
						$zrotationx = $adjpos["rotationx"];
						$zrotationy = $adjpos["rotationy"];
						$zrotationz = $adjpos["rotationz"];
						$zscalingx = $adjpos["scalingx"];
						$zscalingy = $adjpos["scalingy"];
						$zscalingz = $adjpos["scalingz"];
					}
				}
			} else if (!empty($this->communityid) && !empty($this->thingid)) {
				$zresults = $wtwdb->query("
					select positionx, positiony, positionz, rotationx, rotationy, rotationz, scalingx, scalingy, scalingz
					from ".wtw_tableprefix."things
					where thingid='".$this->thingid."'
						and deleted=0
					limit 1;");
				foreach ($zresults as $zrow) {
					$zpositionx = $this->checkNumber($zrow["positionx"],0);
					$zpositiony = $this->checkNumber($zrow["positiony"],0);
					$zpositionz = $this->checkNumber($zrow["positionz"],0);
					$zrotationx = $this->checkNumber($zrow["rotationx"],0);
					$zrotationy = $this->checkNumber($zrow["rotationy"],0);
					$zrotationz = $this->checkNumber($zrow["rotationz"],0);
					$zscalingx = $this->checkNumber($zrow["scalingx"],1);
					$zscalingy = $this->checkNumber($zrow["scalingy"],1);
					$zscalingz = $this->checkNumber($zrow["scalingz"],1);
				}
				if (!empty($this->communityid)) {
					$zresults = $wtwdb->query("
						select positionx, positiony, positionz, rotationx, rotationy, rotationz, scalingx, scalingy, scalingz
						from ".wtw_tableprefix."connectinggrids
						where childwebid='".$this->thingid."'
							and parentwebid='".$this->communityid."'
							and deleted=0
						limit 1;");
					foreach ($zresults as $zrow) {
						/* where the building is within the community */
						$z2positionx = $this->checkNumber($zrow["positionx"],0);
						$z2positiony = $this->checkNumber($zrow["positiony"],0);
						$z2positionz = $this->checkNumber($zrow["positionz"],0);
						$z2rotationx = $this->checkNumber($zrow["rotationx"],0);
						$z2rotationy = $this->checkNumber($zrow["rotationy"],0);
						$z2rotationz = $this->checkNumber($zrow["rotationz"],0);
						$z2scalingx = $this->checkNumber($zrow["scalingx"],1);
						$z2scalingy = $this->checkNumber($zrow["scalingy"],1);
						$z2scalingz = $this->checkNumber($zrow["scalingz"],1);
						/* calculate values based on item placement using connecting grid */
						$adjpos = $this->getAdjustedPosition($zpositionx, $zpositiony, $zpositionz, $zrotationx, $zrotationy, $zrotationz, $zscalingx, $zscalingy, $zscalingz, $z2positionx, $z2positiony, $z2positionz, $z2rotationx, $z2rotationy, $z2rotationz, $z2scalingx, $z2scalingy, $z2scalingz);
						$zpositionx = $adjpos["positionx"];
						$zpositiony = $adjpos["positiony"];
						$zpositionz = $adjpos["positionz"];
						$zrotationx = $adjpos["rotationx"];
						$zrotationy = $adjpos["rotationy"];
						$zrotationz = $adjpos["rotationz"];
						$zscalingx = $adjpos["scalingx"];
						$zscalingy = $adjpos["scalingy"];
						$zscalingz = $adjpos["scalingz"];
					}
				}
			} else if (!empty($this->buildingid) && !empty($this->thingid)) {
				$zresults = $wtwdb->query("
					select positionx, positiony, positionz, rotationx, rotationy, rotationz, scalingx, scalingy, scalingz
					from ".wtw_tableprefix."things
					where thingid='".$this->thingid."'
						and deleted=0
					limit 1;");
				foreach ($zresults as $zrow) {
					$zpositionx = $this->checkNumber($zrow["positionx"],0);
					$zpositiony = $this->checkNumber($zrow["positiony"],0);
					$zpositionz = $this->checkNumber($zrow["positionz"],0);
					$zrotationx = $this->checkNumber($zrow["rotationx"],0);
					$zrotationy = $this->checkNumber($zrow["rotationy"],0);
					$zrotationz = $this->checkNumber($zrow["rotationz"],0);
					$zscalingx = $this->checkNumber($zrow["scalingx"],1);
					$zscalingy = $this->checkNumber($zrow["scalingy"],1);
					$zscalingz = $this->checkNumber($zrow["scalingz"],1);
				}
				if (!empty($this->buildingid)) {
					$zresults = $wtwdb->query("
						select positionx, positiony, positionz, rotationx, rotationy, rotationz, scalingx, scalingy, scalingz
						from ".wtw_tableprefix."connectinggrids
						where childwebid='".$this->thingid."'
							and parentwebid='".$this->buildingid."'
							and deleted=0
						limit 1;");
					foreach ($zresults as $zrow) {
						/* where the thing is within a building */
						$z2positionx = $this->checkNumber($zrow["positionx"],0);
						$z2positiony = $this->checkNumber($zrow["positiony"],0);
						$z2positionz = $this->checkNumber($zrow["positionz"],0);
						$z2rotationx = $this->checkNumber($zrow["rotationx"],0);
						$z2rotationy = $this->checkNumber($zrow["rotationy"],0);
						$z2rotationz = $this->checkNumber($zrow["rotationz"],0);
						$z2scalingx = $this->checkNumber($zrow["scalingx"],1);
						$z2scalingy = $this->checkNumber($zrow["scalingy"],1);
						$z2scalingz = $this->checkNumber($zrow["scalingz"],1);
						/* calculate values based on item placement using connecting grid */
						$adjpos = $this->getAdjustedPosition($zpositionx, $zpositiony, $zpositionz, $zrotationx, $zrotationy, $zrotationz, $zscalingx, $zscalingy, $zscalingz, $z2positionx, $z2positiony, $z2positionz, $z2rotationx, $z2rotationy, $z2rotationz, $z2scalingx, $z2scalingy, $z2scalingz);
						$zpositionx = $adjpos["positionx"];
						$zpositiony = $adjpos["positiony"];
						$zpositionz = $adjpos["positionz"];
						$zrotationx = $adjpos["rotationx"];
						$zrotationy = $adjpos["rotationy"];
						$zrotationz = $adjpos["rotationz"];
						$zscalingx = $adjpos["scalingx"];
						$zscalingy = $adjpos["scalingy"];
						$zscalingz = $adjpos["scalingz"];
					}
				}
			} else if (!empty($this->communityid)) {
				$zresults = $wtwdb->query("
					select positionx, positiony, positionz, rotationx, rotationy, rotationz, scalingx, scalingy, scalingz
					from ".wtw_tableprefix."communities
					where communityid='".$this->communityid."'
						and deleted=0
					limit 1;");
				foreach ($zresults as $zrow) {
					$zpositionx = $this->checkNumber($zrow["positionx"],0);
					$zpositiony = $this->checkNumber($zrow["positiony"],0);
					$zpositionz = $this->checkNumber($zrow["positionz"],0);
					$zrotationx = $this->checkNumber($zrow["rotationx"],0);
					$zrotationy = $this->checkNumber($zrow["rotationy"],0);
					$zrotationz = $this->checkNumber($zrow["rotationz"],0);
					$zscalingx = $this->checkNumber($zrow["scalingx"],1);
					$zscalingy = $this->checkNumber($zrow["scalingy"],1);
					$zscalingz = $this->checkNumber($zrow["scalingz"],1);
				}
			} else if (!empty($this->buildingid)) {
				$zresults = $wtwdb->query("
					select positionx, positiony, positionz, rotationx, rotationy, rotationz, scalingx, scalingy, scalingz
					from ".wtw_tableprefix."buildings
					where buildingid='".$this->buildingid."'
						and deleted=0
					limit 1;");
				foreach ($zresults as $zrow) {
					$zpositionx = $this->checkNumber($zrow["positionx"],0);
					$zpositiony = $this->checkNumber($zrow["positiony"],0);
					$zpositionz = $this->checkNumber($zrow["positionz"],0);
					$zrotationx = $this->checkNumber($zrow["rotationx"],0);
					$zrotationy = $this->checkNumber($zrow["rotationy"],0);
					$zrotationz = $this->checkNumber($zrow["rotationz"],0);
					$zscalingx = $this->checkNumber($zrow["scalingx"],1);
					$zscalingy = $this->checkNumber($zrow["scalingy"],1);
					$zscalingz = $this->checkNumber($zrow["scalingz"],1);
				}
			} else if (!empty($this->thingid)) {
				$zresults = $wtwdb->query("
					select positionx, positiony, positionz, rotationx, rotationy, rotationz, scalingx, scalingy, scalingz
					from ".wtw_tableprefix."things
					where thingid='".$this->thingid."'
						and deleted=0
					limit 1;");
				foreach ($zresults as $zrow) {
					$zpositionx = $this->checkNumber($zrow["positionx"],0);
					$zpositiony = $this->checkNumber($zrow["positiony"],0);
					$zpositionz = $this->checkNumber($zrow["positionz"],0);
					$zrotationx = $this->checkNumber($zrow["rotationx"],0);
					$zrotationy = $this->checkNumber($zrow["rotationy"],0);
					$zrotationz = $this->checkNumber($zrow["rotationz"],0);
					$zscalingx = $this->checkNumber($zrow["scalingx"],1);
					$zscalingy = $this->checkNumber($zrow["scalingy"],1);
					$zscalingz = $this->checkNumber($zrow["scalingz"],1);
				}
			}
			$zdomaininfo = array(
				'communityid' => $this->communityid,
				'buildingid' => $this->buildingid,
				'thingid' => $this->thingid,
				'sitename' => '',
				'gravity' => '9.8',
				'userid' => $this->userid,
				'wallcollisions'=> '1',
				'floorcollisions'=> '1',
				'textureid' => '2391f1v9om09am77',
				'texturepath' => '/content/system/stock/dirt-512x512.jpg',
				'skydomeid' => '',
				'skydomepath' => '',
				'skyinclination' => '0',
				'skyluminance' => '1',
				'skyazimuth' => '.25',
				'skyrayleigh' => '.25',
				'skyturbidity' => '10',
				'skymiedirectionalg' => '.8',
				'skymiecoefficient' => '.005');
			if (!empty($this->communityid)) {
				/* get main settings */
				$zresults = $wtwdb->query("
					select *,
						case when textureid = '' then ''
							else
								(select u1.filepath 
									from ".wtw_tableprefix."uploads u2 
										left join ".wtw_tableprefix."uploads u1 
											on u2.websizeid=u1.uploadid 
									where u2.uploadid=textureid limit 1)
							end as texturepath,
						skydomeid,
						case when skydomeid = '' then ''
							else
								(select u1.filepath 
									from ".wtw_tableprefix."uploads u2
										left join ".wtw_tableprefix."uploads u1 
											on u2.websizeid=u1.uploadid 
									where u2.uploadid=skydomeid limit 1)
							end as skydomepath
					from ".wtw_tableprefix."communities
					where communityid='".$this->communityid."'
						and deleted=0
					limit 1;");
				foreach ($zresults as $zrow) {
					//$wtwuser->useraccess = $zrow["useraccess"];
					$zgroundpositiony = $zrow["groundpositiony"];
					$zwaterpositiony = $zrow["waterpositiony"];
					$zdomaininfo['sitename'] = $zrow["communityname"];
					$zdomaininfo['gravity'] = $zrow["gravity"];
					$zdomaininfo['textureid'] = $zrow["textureid"];
					$zdomaininfo['texturepath'] = $zrow["texturepath"];
					$zdomaininfo['skydomeid'] = $zrow["skydomeid"];
					$zdomaininfo['skydomepath'] = $zrow["skydomepath"];
					$zdomaininfo['skyinclination'] = $zrow["skyinclination"];
					$zdomaininfo['skyluminance'] = $zrow["skyluminance"];
					$zdomaininfo['skyazimuth'] = $zrow["skyazimuth"];
					$zdomaininfo['skyrayleigh'] = $zrow["skyrayleigh"];
					$zdomaininfo['skyturbidity'] = $zrow["skyturbidity"];
					$zdomaininfo['skymiedirectionalg'] = $zrow["skymiedirectionalg"];
					$zdomaininfo['skymiecoefficient'] = $zrow["skymiecoefficient"];
					$zcommunityinfo = array(
						'communityid' => $this->communityid,
						'communityname' => $zrow["communityname"],
						'access' => $zcommunityaccess);	
				}
			}
			if (!empty($this->buildingid)) {
				/* get main settings */
				$zresults = $wtwdb->query("
					select *
					from ".wtw_tableprefix."buildings
					where buildingid='".$this->buildingid."'
						and deleted=0
					limit 1;");
				foreach ($zresults as $zrow) {
					if (count($zdomaininfo) == 0) {
						$zdomaininfo['sitename'] = $zrow["buildingname"];
						$zdomaininfo['gravity'] = $zrow["gravity"];
					}
					$zbuildinginfo = array(
						'buildingid' => $zrow["buildingid"],
						'buildingname' => $zrow["buildingname"],
						'access' => $zbuildingaccess);	
				}
			}			
			if (!empty($this->thingid)) {
				/* get main settings */
				$zresults = $wtwdb->query("
					select *
					from ".wtw_tableprefix."things
					where thingid='".$this->thingid."'
						and deleted=0
					limit 1;");
				foreach ($zresults as $zrow) {
					if (count($zdomaininfo) == 0) {
						$zdomaininfo['sitename'] = $zrow["thingname"];
						$zdomaininfo['gravity'] = $zrow["gravity"];
					}
					$zthinginfo = array(
						'thingid' => $zrow["thingid"],
						'thingname' => $zrow["thingname"],
						'access' => $zbuildingaccess);	
				}
			}			
			
			$zposition = array(
				'x' => $zpositionx,
				'y' => $zpositiony,
				'z' => $zpositionz,
				'groundpositiony' => $zgroundpositiony,
				'waterpositiony' => $zwaterpositiony
			);	
			$zscaling = array(
				'x' => $zscalingx,
				'y' => $zscalingy,
				'z' => $zscalingz
			);	
			$zrotation = array(
				'x' => $zrotationx,
				'y' => $zrotationy,
				'z' => $zrotationz
			);	
			$startlocation = array(
				'position' => $zposition,
				'scaling' => $zscaling,
				'rotation' => $zrotation);
			$initialscene['domaininfo'] = $zdomaininfo;
			$initialscene['communityinfo'] = $zcommunityinfo;
			$initialscene['buildinginfo'] = $zbuildinginfo;
			$initialscene['thinginfo'] = $zthinginfo;
			$initialscene['startlocation'] = $startlocation;
			$initialscene['useraccesslist'] = null;
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-getSceneSetting=".$e->getMessage());
		}
		return $initialscene;
	}
	
	public function loadMetaData() {
		global $wtwdb;
		$metadata = "";
		try {
			/* domainverify = used by social media */
			/* fbappid =  used by social media */
			/* also check category and business contact email and setup image alt */
			$previewpath = "";
			$testpreviewpath = "";
			$previewwidth = "512";
			$previewheight = "300";
			$webdescription = "";
			$webtitle = "WalkTheWeb: 3D Internet";
			$zresults = array();
			if (!empty($this->communityid)) {
				$zresults = $wtwdb->query("
					select 
						case when u2.filepath = '' or u2.filepath is null 
							then '".$this->domainurl."/content/communities/".$this->communityid."/snapshots/defaultcommunitysm.png'
							else u2.filepath
							end as previewpath, 
						case when u2.filepath = '' or u2.filepath is null 
							then '\\communities\\".$this->communityid."\\snapshots\\defaultcommunitysm.png'
							else '\\previews\\communities\\".$this->communityid."-snapshot.png'
							end as testpreviewpath, 
						case when u2.filepath = '' or u2.filepath is null 
							then u1.imagewidth
							else u2.imagewidth
							end as previewwidth, 
						case when u2.filepath = '' or u2.filepath is null 
							then u1.imageheight
							else u2.imageheight
							end as previewheight,
						communityname as webname,
						communitydescription as webdescription
					from ".wtw_tableprefix."communities c1 
					inner join ".wtw_tableprefix."uploads u1 
						on c1.snapshotid=u1.uploadid 
					left join ".wtw_tableprefix."uploads u2 
						on u1.originalid=u2.uploadid 
					where c1.communityid=".$this->communityid." limit 1);");
			} else if (!empty($this->buildingid)) {
				$zresults = $wtwdb->query("
					select 
						case when u2.filepath = '' or u2.filepath is null 
							then '".$this->domainurl."/content/buildings/".$this->buildingid."/snapshots/defaultbuildingsm.png'
							else u2.filepath
							end as previewpath, 
						case when u2.filepath = '' or u2.filepath is null 
							then '\\buildings\\".$this->buildingid."\\snapshots\\defaultbuildingsm.png'
							else '\\previews\\buildings\\".$this->buildingid."-snapshot.png'
							end as testpreviewpath, 
						case when u2.filepath = '' or u2.filepath is null 
							then u1.imagewidth
							else u2.imagewidth
							end as previewwidth, 
						case when u2.filepath = '' or u2.filepath is null 
							then u1.imageheight
							else u2.imageheight
							end as previewheight,
						buildingname as webname,
						buildingdescription as webdescription
					from ".wtw_tableprefix."buildings b1 
					inner join ".wtw_tableprefix."uploads u1 
						on b1.snapshotid=u1.uploadid 
					left join ".wtw_tableprefix."uploads u2 
						on u1.originalid=u2.uploadid 
					where b1.buildingid=".$this->buildingid." limit 1);");
			} else if (!empty($this->thingid)) {
				$zresults = $wtwdb->query("
					select 
						case when u2.filepath = '' or u2.filepath is null 
							then '".$this->domainurl."/content/things/".$this->thingid."/snapshots/defaultthingsm.png'
							else u2.filepath
							end as previewpath, 
						case when u2.filepath = '' or u2.filepath is null 
							then '\\things\\".$this->thingid."\\snapshots\\defaultthingsm.png'
							else '\\previews\\things\\".$this->thingid."-snapshot.png'
							end as testpreviewpath, 
						case when u2.filepath = '' or u2.filepath is null 
							then u1.imagewidth
							else u2.imagewidth
							end as previewwidth, 
						case when u2.filepath = '' or u2.filepath is null 
							then u1.imageheight
							else u2.imageheight
							end as previewheight,
							thingname as webname,
							thingdescription as webdescription
					from ".wtw_tableprefix."things t1 
					inner join ".wtw_tableprefix."uploads u1 
						on t1.snapshotid=u1.uploadid 
					left join ".wtw_tableprefix."uploads u2 
						on u1.originalid=u2.uploadid 
					where t1.thingid=".$this->thingid." limit 1);");
			}
			foreach ($zresults as $zrow) {
				$previewpath = $zrow["previewpath"]."?time=".date_timestamp_get(date_create());
				$testpreviewpath = $zrow["testpreviewpath"];
				$previewwidth = $zrow["previewwidth"];
				$previewheight = $zrow["previewheight"];
				$webtitle = $zrow["webname"];
				$webdescription = $zrow["webdescription"];
			}
			if (!file_exists($this->contentpath.$testpreviewpath)) {
				$previewpath = $this->domainurl."/content/system/stock/wtw-3dinternet.jpg";
			}
			if ($this->pagename == 'admin.php') {
				$webtitle = "WalkTheWeb: 3D Internet Admin";
				$webdescription = "WalkTheWeb: Admin Site: Patented 3D Internet Browsing and 3D Website hosting. WalkTheWeb (R), http://3d (TM), https://3d (TM), and HTTP3D (TM).";
			}
			if (empty($webtitle) || !isset($webtitle)) {
				$webtitle = "WalkTheWeb 3D Internet";
			} 
			if (empty($webdescription) || !isset($webdescription)) {
				$webdescription = "WalkTheWeb: Internationally Patented 3D Internet Browsing and 3D Website hosting. WalkTheWeb (R), http://3d (TM), https://3d (TM), and HTTP3D (TM).";
			} 
			$metadata = "<title>".$webtitle."</title>\r\n";
			$metadata .= "<meta http-equiv=\"Cache-Control\" content=\"no-cache, no-store, must-revalidate\" />\r\n";
			$metadata .= "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>\r\n";
			$metadata .= "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1\">\r\n";
			$metadata .= "<meta http-equiv=\"Pragma\" content=\"no-cache\" />\r\n";
			$metadata .= "<meta http-equiv=\"Expires\" content=\"-1\" />\r\n";
			if (!empty($webdescription) && isset($webdescription)) {
				$metadata .= "<meta name=\"description\" content=\"".$webdescription."\" />\r\n";
				$metadata .= "<meta property=\"og:description\" content=\"".$webdescription."\" />\r\n";
			}
			$metadata .= "<meta property=\"og:image\" content=\"".$previewpath."\" />\r\n";
			$metadata .= "<meta property=\"og:image:width\" content=\"".$previewwidth."\"/>\r\n";
			$metadata .= "<meta property=\"og:image:height\" content=\"".$previewheight."\"/>\r\n";
			$metadata .= "<meta property=\"og:image:alt\" content=\"".$previewpath."\" />\r\n";
			$metadata .= "<meta property=\"og:url\" content=\"".$this->protocol.$this->domainname.$this->uri."\" />\r\n";
			$metadata .= "<meta property=\"og:type\" content=\"business.business\" />\r\n";
			$metadata .= "<meta property=\"og:title\" content=\"".$webtitle."\" />\r\n";
			if (defined('domainverify')) {
				$metadata .= "<meta name=\"p:domain_verify\" content=\"".domainverify."\"/>\r\n";
			}
			if (defined('fbappid')) {
				$metadata .= "<meta property=\"fb:app_id\" content=\"".fbappid."\" />\r\n";
			}
			if (defined('contactemail')) {
				$metadata .= "<meta property=\"business:contact_data\" content=\"".contactemail."\" />\r\n";
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadMetaData=".$e->getMessage());
		}
		return $metadata;
	}
	
	public function loadInitJSData() {
		global $wtwplugins;
		$jsdata = "";
		try {	
			$jsdata = "<script type=\"text/javascript\">\r\n";
			if (defined('wtw_devmode')) {
				$jsdata .= "	var wtw_devmode = '".wtw_devmode."';\r\n";
			} else {
				$jsdata .= "	var wtw_devmode = '0';\r\n";
			}
			if (defined('wtw_defaultdomain')) {
				$jsdata .= "	var wtw_defaultdomain = '".wtw_defaultdomain."';\r\n";
			} else {
				$jsdata .= "	var wtw_defaultdomain = '';\r\n";
			}
			if (defined('wtw_defaultsitename')) {
				$jsdata .= "	var wtw_defaultsitename = '".wtw_defaultsitename."';\r\n";
			} else {
				$jsdata .= "	var wtw_defaultsitename = '';\r\n";
			}
			if (defined('wtw_googleanalytics')) {
				$jsdata .= "	var wtw_googleanalytics = '".wtw_googleanalytics."';\r\n";
			} else {
				$jsdata .= "	var wtw_googleanalytics = '';\r\n";
			}
			$jsdata .= "	var wtw_protocol = '".$this->protocol."';\r\n";
			$jsdata .= "	var wtw_domainurl = '".$this->domainurl."';\r\n";
			$jsdata .= "	var wtw_domainname = '".$this->domainname."';\r\n";
			$jsdata .= "	var community = '".$this->community."';\r\n";
			$jsdata .= "	var building = '".$this->building."';\r\n";
			$jsdata .= "	var thinging = '".$this->thing."';\r\n";
			$jsdata .= "	var communityid = '".$this->communityid."';\r\n";
			$jsdata .= "	var buildingid = '".$this->buildingid."';\r\n";
			$jsdata .= "	var thingid = '".$this->thingid."';\r\n";
			$jsdata .= "	var wtw_domain;\r\n";
			$jsdata .= "	var wtw_uploads = [];\r\n";
			$jsdata .= "	var wtw_version = \"".$this->version."\";\r\n";
			$jsdata .= "	var wtw_versiondate = \"".$this->versiondate."\";\r\n";
			$jsdata .= "	var wtw_versiontext = \"HTTP3D Inc. (v".$this->version.") ".date('m-d-Y', strtotime($this->versiondate))."\";\r\n";
			$jsdata .= "	try {\r\n";
			$jsdata .= "		wtw_domain = JSON.stringify(".json_encode($this->getSceneSetting()).");\r\n";
			$jsdata .= "	} catch(ex) {\r\n 			console.log('core-snippets-checkloadurl=' + ex.message);\r\n";
			$jsdata .= "	}\r\n";
            $jsdata .= "	if (window != top) {\r\n";
            $jsdata .= "	    top.location.href = location.href;\r\n";
            $jsdata .= "	}\r\n";
            $jsdata .= "	if (top.frames.length != 0) {\r\n";
            $jsdata .= "	    if (window.location.href.replace) {\r\n";
            $jsdata .= "	    	top.location.replace(self.location.href);\r\n";
            $jsdata .= "		} else {\r\n";
            $jsdata .= "		    top.location.href = self.document.href;\r\n";
			$jsdata .= "		}\r\n";
            $jsdata .= "	}\r\n";
			$jsdata .= "</script>"; 
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_constructor.js?x=".$this->version."\"></script>\r\n";
			$jsdata .= $wtwplugins->getScriptFunctions();
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadInitJSData=".$e->getMessage());
		}
		return $jsdata;
	}

	public function loadJSBrowseData() {
		$jsdata = "";
		try {	
			$zver = $this->version;
			$zver = date("Y-m-d-H-i-s");
			/* materials library: https://github.com/BabylonJS/Babylon.js/tree/master/dist/materialsLibrary/ */
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_common.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_downloads.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_cameras.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/avatars/wtw_loadavatar.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_objectdefinitions.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/multiuser/wtw_chat.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/earcut.js?x=".$zver."\"></script>\r\n";
			/* $jsdata .= "<script src=\"/core/scripts/engine/oimo.js?x=".$zver."\"></script>\r\n"; */
			$jsdata .= "<script src=\"/core/scripts/engine/cannon.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.gui.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.skymaterial.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.watermaterial.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.firematerial.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.mixmaterial.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.lavamaterial.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.triplanarmaterial.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.materials.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.terrainmaterial.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/pep.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/loader.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/meshwriter.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_input.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/actionzones/wtw_basicactionzones.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/actionzones/wtw_addactionzonelist.js?x=".$zver."\"></script>\r\n";			
			$jsdata .= "<script src=\"/core/scripts/coverings/wtw_basiccoverings.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/coverings/wtw_addcoveringlist.js?x=".$zver."\"></script>\r\n";		
			$jsdata .= "<script src=\"/core/scripts/molds/wtw_basicmolds.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/molds/wtw_addmoldlist.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/avatars/wtw_basicavatars.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/avatars/wtw_addavatarlist.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/automations/wtw_basicautomations.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/automations/wtw_addautomationlist.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_core.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_init.js?x=".$zver."\"></script>\r\n";
			global $wtwplugins;
			$jsdata .= $wtwplugins->getPluginScripts('0', $zver);
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadJSBrowseData=".$e->getMessage());
		}
		return $jsdata;
	}

	public function loadCSSBrowseData() {
		$cssdata = "";
		try {	
			$cssdata .= "<link rel=\"stylesheet\" type=\"text/css\" href=\"/core/styles/wtw_core.css\" />\r\n";
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadCSSBrowseData=".$e->getMessage());
		}
		return $cssdata;
	}
	
	public function loadJSAdminData() {
		$jsdata = "";
		try {	
			$zver = $this->version;
			$zver = date("Y-m-d-H-i-s");
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_common.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_downloads.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_cameras.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/avatars/wtw_loadavatar.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_objectdefinitions.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/multiuser/wtw_chat.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/earcut.js?x=".$zver."\"></script>\r\n";
			/* $jsdata .= "<script src=\"/core/scripts/engine/oimo.js?x=".$zver."\"></script>\r\n"; */
			$jsdata .= "<script src=\"/core/scripts/engine/cannon.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.gui.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.skymaterial.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.watermaterial.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.firematerial.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.mixmaterial.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.lavamaterial.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.triplanarmaterial.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.materials.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.terrainmaterial.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/pep.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/loader.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/meshwriter.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_input.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/admin/wtw_admininput.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/actionzones/wtw_basicactionzones.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/actionzones/wtw_addactionzonelist.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/coverings/wtw_basiccoverings.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/coverings/wtw_addcoveringlist.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/molds/wtw_basicmolds.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/molds/wtw_addmoldlist.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/avatars/wtw_basicavatars.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/avatars/wtw_addavatarlist.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/automations/wtw_basicautomations.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/automations/wtw_addautomationlist.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_core.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/admin/wtw_admineditor.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_init.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/admin/wtw_admininit.js?x=".$zver."\"></script>\r\n";
			global $wtwplugins;
			$jsdata .= $wtwplugins->getPluginScripts('1', $zver);
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadJSAdminData=".$e->getMessage());
		}
		return $jsdata;
	}
	
	public function loadCSSAdminData() {
		$cssdata = "";
		try {	
			$cssdata .= "<link rel=\"stylesheet\" type=\"text/css\" href=\"/core/styles/wtw_core.css\" />\r\n";
			$cssdata .= "<link rel=\"stylesheet\" type=\"text/css\" href=\"/core/styles/wtw_admin.css\" />\r\n";
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadCSSAdminData=".$e->getMessage());
		}
		return $cssdata;
	}
	
	public function loadMainElements() {
		$mainelements = "";
		try {
			$mainelements = "<div id=\"wtw_showmeshfps\"></div>\r\n";
			$mainelements .= "<div id=\"wtw_iwalkarrow\" style=\"display:none;visibility:hidden;\"></div>\r\n";
			$mainelements .= "<div id=\"wtw_iwalkarrow2\" style=\"display:none;visibility:hidden;\"></div>\r\n";
			$mainelements .= "<div id=\"wtw_itooltip\"></div>\r\n";
			$mainelements .= "<div id=\"wtw_itouchleft\"></div>\r\n";
			$mainelements .= "<div id=\"wtw_itouchright\"></div>\r\n";
			$mainelements .= "<img id=\"wtw_iwalkcompassarrow\" src=\"".$this->contenturl."/system/images/walkarrow.png\" border=\"0\" style=\"position: absolute; z-index: 0; visibility: hidden; position: absolute; top: 0px; left: 0px; height: 97px; width: 75px;\" />\r\n";
			$mainelements .= "<img id=\"wtw_iwalkcompass\" src=\"".$this->contenturl."/system/images/compassrose.png\" border=\"0\" style=\"position: absolute; z-index: 0; visibility: hidden; position: absolute; top: 0px; left: 0px; height: 97px; width: 75px;\" />\r\n";
			$mainelements .= "<div id=\"wtw_outlineselfcameradiv\" style=\"display:none;visibility:hidden;\"></div>\r\n";
			$mainelements .= "<canvas id=\"wtw_uiCanvas\"></canvas>\r\n";
			$mainelements .= "<canvas id=\"wtw_renderCanvas\" touch-action=\"none\"></canvas>\r\n";
			$mainelements .= "<div id=\"wtw_greyout\"></div>\r\n";
			$mainelements .= "<div id=\"wtw_ibrowsediv\" class=\"wtw-browsediv\">\r\n";
			$mainelements .= "	<div id=\"wtw_browseheader\" class=\"wtw-browseheader\">\r\n";
			$mainelements .= "		<div class=\"wtw-browseclose\" onclick=\"WTW.closeIFrame();\">\r\n";
			$mainelements .= "			<img src=\"/content/system/images/menuclose.png\" alt=\"Close\" title=\"Close\" onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
			$mainelements .= "		</div>\r\n";
			$mainelements .= "		<div id=\"wtw_browsetitle\"></div>\r\n";
			$mainelements .= "	</div>\r\n";
			$mainelements .= "	<iframe id=\"wtw_ibrowseframe\" class=\"wtw-ibrowseframe\" src=\"/core/pages/loading.php\"></iframe>\r\n";
			$mainelements .= "</div>\r\n";
			if ($this->pagename == "admin.php") {
				$mainelements .= "<div id=\"wtw_confirmform\" class=\"wtw-popupform\">\r\n";
				$mainelements .= "	<div id=\"wtw_browseheader\" class=\"wtw-browseheader\" style=\"margin-top:0px;\">\r\n";
				$mainelements .= "		<div class=\"wtw-browseclose\" onclick=\"WTW.closeConfirmation();\">\r\n";
				$mainelements .= "			<img src=\"/content/system/images/menuclose.png\" alt=\"Close\" title=\"Close\" onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
				$mainelements .= "		</div>\r\n";
				$mainelements .= "		<h2 id=\"wtw_confirmformtitle\" style=\"margin:0px 15px 0px 15px;padding-top:10px;padding-bottom:10px\">Confirm</h2>\r\n";
				$mainelements .= "	</div>\r\n";
				$mainelements .= "	<div class=\"wtw-center\">\r\n";
				$mainelements .= "		<div style=\"width:80%;height:170px;display:inline-block;vertical-align:top;text-align:center;margin-left:10%;margin-right:10%;\">\r\n";
				$mainelements .= "			<div>\r\n";
				$mainelements .= "				<h1 id=\"wtw_confirmheading\" style=\"color:black;\">Confirm</h1>\r\n";
				$mainelements .= "				<div id=\"wtw_confirmtext\" style=\"color:red;\"></div>\r\n";
				$mainelements .= "				<br /><br /><br />\r\n";
				$mainelements .= "			<input type=\"button\" id=\"wtw_bconfirm\" value=\"Confirm\" class=\"wtw-redbutton\" onclick=\"WTW.completedConfirmation(dGet('wtw_tconfirmid').value);WTW.blockPassThrough(); return (false);\" style=\"cursor: pointer;font-size:large;\" /> &nbsp;&nbsp;&nbsp;\r\n";
				$mainelements .= "			<input type=\"button\" id=\"wtw_bcancelconfirm\" value=\"Cancel\" class=\"wtw-yellowbutton\" onclick=\"WTW.closeConfirmation();WTW.blockPassThrough(); return (false);\" style=\"cursor: pointer;font-size:large;\" />\r\n";
				$mainelements .= "			</div>\r\n";
				$mainelements .= "		</div>\r\n";
				$mainelements .= "	</div>\r\n";
				$mainelements .= "</div>\r\n";	
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadMainElements=".$e->getMessage());
		}
		return $mainelements;
	}

	public function loadHiddenFields() {
		$hiddenfields = "";
		global $wtwuser;
		try {
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_serverinstanceid\" value=\"".$this->serverinstanceid."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tuserid\" value=\"".$wtwuser->userid."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tuserip\" value=\"".$wtwuser->userip."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tusername\" value=\"".$wtwuser->username."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tuseremail\" value=\"".$wtwuser->email."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tuserimageurl\" value=\"".$wtwuser->userimageurl."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tuseraccess\" value=\"".$wtwuser->useraccess."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tcontentpath\" value=\"".$wtwuser->contentpath."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tuploadpathid\" value=\"".$wtwuser->uploadpathid."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tinstanceid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmyavatarid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tavatarind\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmyavataridanon\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tavataranimationname\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tattachavatarmoldname\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldname\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tdiffusecolorr\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tdiffusecolorg\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tdiffusecolorb\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tspecularcolorr\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tspecularcolorg\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tspecularcolorb\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_temissivecolorr\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_temissivecolorg\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_temissivecolorb\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tinvitationcode\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tfilepath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tfilename\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tfileitem\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tfileitemname\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tfileitemnamepath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tfileitempreviewname\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_helptab\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tconnectinggridind\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tconnectinggridid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tconnectinggridname\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_eulaversion\" value=\"0\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_eulaacceptdate\" />\r\n";
			$hiddenfields .= "<div id=\"wtw_iframesdiv\" class=\"wtw-hiddenform\"></div>\r\n";
			if ($this->pagename == "admin.php") {
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_returnpath\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tcommunityid\" value=\"".$this->communityid."\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tcommunityind\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tcommunitysnapshotid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tbuildingid\" value=\"".$this->buildingid."\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_teditbuildingind\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tbuildingsnapshotid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tthingid\" value=\"".$this->thingid."\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tthingind\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tthingsnapshotid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tnewmold\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldind\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldmoldgroup\" />\r\n";	
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldshape\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmolduploadobjectid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldobjectfolder\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldcoveringold\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldimageind\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldcsgmoldid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtextureid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturepath\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebumpid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebumppath\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldvideoid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldvideopath\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldvideoposterid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldvideoposterpath\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldheightmapid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldheightmappath\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldmixmapid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldmixmappath\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturerid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturerpath\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturegid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturegpath\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebpath\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebumprid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebumprpath\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebumpgid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebumpgpath\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebumpbid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebumpbpath\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldaddimageid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldaddimagepath\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldaddimagehoverid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldaddimagehoverpath\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldaddimageclickid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldaddimageclickpath\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldactionzoneid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldjsfunction\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldjsparameters\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldpath1points\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldpath2points\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldsoundid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldsoundpath\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldsoundname\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldsoundconeinnerangle\" /><!-- degrees -->\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldsoundconeouterangle\" /><!-- degrees -->\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldsoundconeoutergain\" /><!-- 0 to 1 -->\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldproductid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldslug\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldcategoryid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldallowsearch\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldwebstyle\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tconfirmid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_teditconnectinggridind\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_teditconnectinggridid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_teditloadactionzoneid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tparentwebid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tparentwebtype\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tchildwebid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tchildwebtype\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tactionzoneid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tactionzoneind\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tactionzonemovementtype\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tactionzonerotateaxis\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tattachmoldid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_taxisscalingx\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_taxisscalingy\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tactionzonetype\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tactionzoneshape\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tactionzonejsfunction\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tactionzonejsparameters\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_twaterpositiony\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tskydomeid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tskyinclinationbackup\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tskyluminancebackup\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tskyazimuthbackup\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tskyrayleighbackup\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tskyturbiditybackup\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tskymiedirectionalgbackup\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tskymiecoefficientbackup\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_textendedgroundtextureid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_textendedgroundtexturepath\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_teditpointindex\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tobjectsoundid\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tobjectsoundpath\" />\r\n";
				$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tbackupfullpageformtitle\" />\r\n";
				$hiddenfields .= "<img id=\"wtw_tobjectsoundicon\" style=\"visibility:hidden;display:none;\" />\r\n";
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadHiddenFields=".$e->getMessage());
		}
		return $hiddenfields;
	}
	
	public function loadFullPageForm() {
		global $wtwdb;
		$pagedata = "";
		try {
			$pagedata .= "<div id=\"wtw_fullpageform\" class=\"wtw-pageform\" style=\"display:none;\">\r\n";
			$pagedata .= "	<div class=\"wtw-pageheader\">\r\n";
			$pagedata .= "		<img src=\"/content/system/images/menuclose.png\" alt=\"Close\" title=\"Close\" onclick=\"WTW.closeFullPageForm();\" onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" class=\"wtw-pageclose\" />\r\n";
			$pagedata .= "		<img id=\"wtw_arrowicon\" src=\"/content/system/images/menuarrow32.png\" alt=\"\" title=\"\" class=\"wtw-toparrowicon\" />\r\n";
			$pagedata .= "		<div id=\"wtw_fullpageformtitle\"><div class=\"wtw-toparrowtext\">Media Library</div></div><div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "	</div>\r\n";

			$pagedata .= "	<div id=\"wtw_dashboardpage\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			$pagedata .= "		<div id=\"wtw_loadingdashboard\" class=\"wtw-loadingnotice\">Loading...</div>\r\n";
			$pagedata .= "		<div id=\"wtw_dashboard\">\r\n";
			$pagedata .= "			<div id=\"wtw_userwebcount\" class=\"wtw-dashboardboxleft\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\">3D Website Count</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<h3 class=\"wtw-black\">My 3D Websites</h3>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">3D Community Scenes</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mycommcount\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">3D Buildings</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mybuildcount\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">3D Things</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mythingcount\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<h3 class=\"wtw-black\">Access to Other 3D Websites</h3>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">3D Community Scenes</div>\r\n";
			$pagedata .= "					<div id=\"wtw_othercommcount\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">3D Buildings</div>\r\n";
			$pagedata .= "					<div id=\"wtw_otherbuildcount\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">3D Things</div>\r\n";
			$pagedata .= "					<div id=\"wtw_otherthingcount\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div>\r\n";
			$pagedata .= "	</div>\r\n";
			
			$pagedata .= "	<div id=\"wtw_updatespage\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			$pagedata .= "		<div id=\"wtw_loadingupdates\" class=\"wtw-loadingnotice\">Checking for Updates...</div>\r\n";
			$pagedata .= "		<div id=\"wtw_allupdates\">\r\n";
			$pagedata .= "			<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\">Updates</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div id=\"wtw_updatelist\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div id=\"wtw_updatepluginlist\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div>\r\n";
			$pagedata .= "	</div>\r\n";

			$pagedata .= "	<div id=\"wtw_showimportpage\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			$pagedata .= "		<div id=\"wtw_importhorizontalmenu\" class=\"wtw-horizontalmenu\">\r\n";
			$pagedata .= "			<div id=\"wtw_menumedialibrary\" class=\"wtw-menutabtop\" onclick=\"WTW.openFullPageForm('medialibrary','');\">Back</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuwtwcommunities\" class=\"wtw-menutabtopselected\" onclick=\"WTW.openFullPageForm('importpage','communities');\">3D Communities</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuwtwbuildings\" class=\"wtw-menutabtop\" onclick=\"WTW.openFullPageForm('importpage','buildings');\">3D Buildings</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuwtwthings\" class=\"wtw-menutabtop\" onclick=\"WTW.openFullPageForm('importpage','things');\">3D Things</div>\r\n";
			$pagedata .= "			<div id=\"searchcommunitiesdiv\" class=\"wtw-searchbar\">\r\n";
			$pagedata .= "				<b>Search:</b> <input id='wtw_tcommunitysearch' type='text' value='' size='20' maxlength='255' />\r\n";
			$pagedata .= "				<input id='wtw_bcommunitysearch' type='button' value='Go' onclick=\"WTW.communitySearch(dGet('wtw_tcommunitysearch').value);\" style='font-size:1.4em;border-radius:10px;' />\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "			<div id=\"searchbuildingsdiv\" class=\"wtw-searchbar\">\r\n";
			$pagedata .= "				<b>Search:</b> <input id='wtw_tbuildingsearch' type='text' value='' size='20' maxlength='255' />\r\n";
			$pagedata .= "				<input id='wtw_bbuildingsearch' type='button' value='Go' onclick=\"WTW.buildingSearch(dGet('wtw_tbuildingsearch').value);\" style='font-size:1.4em;border-radius:10px;' />\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "			<div id=\"searchthingsdiv\" class=\"wtw-searchbar\">\r\n";
			$pagedata .= "				<b>Search:</b> <input id='wtw_tthingsearch' type='text' value='' size='20' maxlength='255' />\r\n";
			$pagedata .= "				<input id='wtw_bthingsearch' type='button' value='Go' onclick=\"WTW.thingSearch(dGet('wtw_tthingsearch').value);\" style='font-size:1.4em;border-radius:10px;' />\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div><div class=\"wtw-clear\"></div><hr />\r\n";
			$pagedata .= "		<div style='width:100%;margin:0px;text-align:center;'>\r\n";
			$pagedata .= "			<!--img src='/content/system/images/wtwlogo.png' / -->\r\n";
			$pagedata .= "			<div id=\"wtw_selectwebform\">\r\n";
			$pagedata .= "				<div id='wtw_commtempsearchresults' style='margin-left:20px;text-align:left;overflow-y:auto;overflow-x:hidden;'></div>\r\n";
			$pagedata .= "				<div id='wtw_buildtempsearchresults' style='margin-left:20px;text-align:left;overflow-y:auto;overflow-x:hidden;'></div>\r\n";
			$pagedata .= "				<div id='wtw_thingtempsearchresults' style='margin-left:20px;text-align:left;overflow-y:auto;overflow-x:hidden;'></div>\r\n";
			$pagedata .= "				<div id=\"wtw_downloadcomplete\" class=\"wtw-hide\">\r\n";
			$pagedata .= "					<h3 class=\"wtw-black\">Download Complete</h3><br />\r\n";
			$pagedata .= "					<div id=\"wtw_downloadcompletemessage\">You can find your <b>New 3D Community</b> in the <b>Admin Menu</b><br />or select from the following:</div><br />\r\n";
			$pagedata .= "					<input id='wtw_bopenwebdownload' type='button' value='Open Your New 3D Community in the Editor' onclick=\"\" style='font-size:1.4em;border-radius:10px;' /><br /><br />\r\n";
			$pagedata .= "					<input id='wtw_bcontinuewebdownload' type='button' value='Continue Searching for Downloads' onclick=\"\" style='font-size:1.4em;border-radius:10px;' /><br /><br />\r\n";
			$pagedata .= "					<input id='wtw_bclosewebdownload' type='button' value='Close WalkTheWeb Downloads' onclick=\"WTW.closeFullPageForm();\" style='font-size:1.4em;border-radius:10px;' /><br /><br />\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "				<div id=\"wtw_installprogress\" class=\"wtw-hide wtw-iprogresssection\">\r\n";
			$pagedata .= "				<br /><h3 class=\"wtw-center wtw-black\" style='margin-top:0px;'>Installing the 3D Community Scene</h3>\r\n";
			$pagedata .= "				<div id=\"wtw_progresstext\" class=\"wtw-iprogresstext\">&nbsp;</div>\r\n";
			$pagedata .= "				<div class=\"wtw-iprogressdiv\">\r\n";
			$pagedata .= "					<div id=\"wtw_progressbar\" class=\"wtw-iprogressbar\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div><br />\r\n";
			$pagedata .= "	</div>\r\n";

			$pagedata .= "	<div id=\"wtw_selectimagepage\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			$pagedata .= "		<div id=\"wtw_horizontalmenu\" class=\"wtw-horizontalmenu\">\r\n";
			$pagedata .= "			<div id=\"wtw_bstartimageupload\" class=\"wtw-uploadbutton\" onclick=\"WTW.startUploadImage();return (false);\">Upload Image</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menufileselect\" class=\"wtw-menufileselect\" >\r\n";
			$pagedata .= "				<select id=\"wtw_fileselectcategory\" class=\"wtw-fileselectcategory\" onchange=\"WTW.selectFileForm();\">\r\n";
			$pagedata .= "					<option value=\"\"> - All - </option>\r\n";
			$pagedata .= "					<option value=\"image\">Images</option>\r\n";
			$pagedata .= "					<option value=\"video\">Videos</option>\r\n";
			$pagedata .= "					<option value=\"audio\">Sounds</option>\r\n";
			$pagedata .= "					<option value=\"doc\">Documents</option>\r\n";
			$pagedata .= "					<option value=\"object\">3D Objects</option>\r\n";
			$pagedata .= "				</select>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuimagecommunity\" class=\"wtw-menutabtop\" onclick=\"WTW.setImageMenu(1);\">3D Community Images</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuimagemy\" class=\"wtw-menutabtop\" onclick=\"WTW.setImageMenu(2);\">My Images</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuimagestock\" class=\"wtw-menutabtop\" onclick=\"WTW.setImageMenu(3);\">Stock Images</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuuploadedobjects\" class=\"wtw-menutabtop\" onclick=\"WTW.setImageMenu(4);\">3D Objects</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuwtwdownloads\" class=\"wtw-menutabtop\" onclick=\"WTW.openFullPageForm('importpage','communities');;\">WalkTheWeb Downloads</div>\r\n";
			$pagedata .= "			<div id=\"wtw_hiddenimagesoption\" class=\"wtw-hiddenimageoption\">\r\n";
			$pagedata .= "				<input type=\"checkbox\" id=\"wtw_bshowhiddenimages\" onchange=\"WTW.selectFileForm(this);\" class=\"wtw-cursorpointer\" /> <div id=\"wtw_showhiddenimagesdiv\" onclick=\"WTW.selectFileForm(this);\" class=\"wtw-showimageoption\">Show Hidden Images</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div><div class=\"wtw-clear\"></div><hr>\r\n";
			$pagedata .= "		<div id=\"wtw_loadingselectimage\" class=\"wtw-loadingnotice\">Loading...</div>\r\n";
			$pagedata .= "		<div id=\"wtw_selectimageformscroll\" class=\"wtw-normalwrap\">\r\n";
			$pagedata .= "			<div id=\"wtw_menuimagecommunitydiv\" class=\"wtw-subdiv\">\r\n";
			$pagedata .= "				<iframe id=\"wtw_communityimagesframe\" class=\"wtw-imagesframe\" src=\"\" scrolling=\"yes\" ></iframe>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuimagemydiv\" class=\"wtw-subdiv\">\r\n";
			$pagedata .= "				<iframe id=\"wtw_myimagesframe\" class=\"wtw-imagesframe\" src=\"\" scrolling=\"yes\" ></iframe>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuimagestockdiv\" class=\"wtw-subdiv\">\r\n";
			$pagedata .= "				<iframe id=\"wtw_stockimagesframe\" class=\"wtw-imagesframe\" src=\"\" scrolling=\"yes\" ></iframe>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuuploadedobjectsdiv\" class=\"wtw-subdiv\">\r\n";
			$pagedata .= "				<iframe id=\"wtw_uploadedobjectsframe\" class=\"wtw-imagesframe\" src=\"\" scrolling=\"yes\" ></iframe>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div>\r\n";
			$pagedata .= "	</div>\r\n";
			
			$pagedata .= "	<div id=\"wtw_showfilepage\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			$pagedata .= "		<div id=\"wtw_loadingmediapage\" class=\"wtw-loadingnotice\">Loading...</div>\r\n";
			$pagedata .= "		<div id=\"wtw_mediapage\" class=\"wtw-fullpage\">\r\n";
			$pagedata .= "			<div id=\"wtw_fileinfo\" class=\"wtw-dashboardboxleft\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\">File Information</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">File Title</div>\r\n";
			$pagedata .= "					<div id=\"wtw_uploadfiletitle\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">File Name</div>\r\n";
			$pagedata .= "					<div id=\"wtw_uploadfilename\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">File Type</div>\r\n";
			$pagedata .= "					<div id=\"wtw_uploadfiletype\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">Upload Date</div>\r\n";
			$pagedata .= "					<div id=\"wtw_uploadupdatedate\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "			<div id=\"wtw_imagethumbnailinfo\" class=\"wtw-dashboardboxleft\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\">Thumbnail Image</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div class=\"wtw-center\">\r\n";
			$pagedata .= "						<img id='wtw_mediathumbnail' />\r\n";
			$pagedata .= "					</div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">File Size</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mediathumbnailsize\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">Dimensions</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mediathumbnaildimensions\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">File Path</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mediathumbnailpath\" class=\"wtw-dashboardvalueurl\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div><br />\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardvalueurl\"><a id=\"wtw_mediathumbnaildownload\" download>Download Image</a></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "			<div id=\"wtw_imagewebsizeinfo\" class=\"wtw-dashboardboxleft\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\">Websize Image</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div class=\"wtw-center\">\r\n";
			$pagedata .= "						<img id=\"wtw_mediawebsize\" class=\"wtw-fullimage\" />\r\n";
			$pagedata .= "					</div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">File Size</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mediawebsizesize\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">Dimensions</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mediawebsizedimensions\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">File Path</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mediawebsizepath\" class=\"wtw-dashboardvalueurl\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div><br />\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardvalueurl\"><a id=\"wtw_mediawebsizedownload\" download>Download Image</a></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "			<div id=\"wtw_imageoriginalinfo\" class=\"wtw-dashboardboxleft\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\">Original Image</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">File Size</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mediaoriginalsize\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">Dimensions</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mediaoriginaldimensions\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">File Path</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mediaoriginalpath\" class=\"wtw-dashboardvalueurl\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div><br />\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardvalueurl\"><a id=\"wtw_mediaoriginaldownload\" download>Download Image</a></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "			<div id=\"wtw_originalimagediv\" class=\"wtw-dashboardboxleftfull\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\">Original Image</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div class=\"wtw-center\">\r\n";
			$pagedata .= "						<img id=\"wtw_mediaoriginal\" class=\"wtw-imagefitwidth\" />\r\n";
			$pagedata .= "					</div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div>\r\n";
			$pagedata .= "	</div>\r\n";
			
			$pagedata .= "	<div id=\"wtw_userspage\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			$pagedata .= "		<div id=\"wtw_loadingusers\" class=\"wtw-loadingnotice\">Loading...</div>\r\n";
			$pagedata .= "		<div id=\"wtw_allusers\" class=\"wtw-fullpage\">\r\n";
			$pagedata .= "			<div id=\"wtw_alluserswidth\" class=\"wtw-dashboardboxleftfull\">\r\n";
			$pagedata .= "				<div id=\"wtw_alluserstitle\" class=\"wtw-dashboardboxtitle\"><div id='wtw_adduserbutton' class='wtw-greenbuttonright' onclick=\"WTW.addUser();\">Add New</div>All Users</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div id=\"wtw_userlist\"></div>\r\n";
			$pagedata .= "					<div id=\"wtw_userinfo\"></div>\r\n";
			$pagedata .= "					<div id=\"wtw_useradd\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div>\r\n";
			$pagedata .= "	</div>\r\n";

			$pagedata .= "	<div id=\"wtw_pluginspage\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			$pagedata .= "		<div id=\"wtw_loadingplugins\" class=\"wtw-loadingnotice\">Loading...</div>\r\n";
			$pagedata .= "		<div id=\"wtw_allplugins\" class=\"wtw-fullpage\">\r\n";
			$pagedata .= "			<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\">All Plugins</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div id=\"wtw_pluginslist\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div>\r\n";
			$pagedata .= "	</div>\r\n";

			$pagedata .= "	<div id=\"wtw_settingspage\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			$pagedata .= "		<div id=\"wtw_loadingsettings\" class=\"wtw-loadingnotice\">Loading...</div>\r\n";
			$pagedata .= "		<div id=\"wtw_emailserversettings\" class=\"wtw-fullpage\">\r\n";
			$pagedata .= "			<div class=\"wtw-dashboardboxleft\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\">Email Server Settings</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">Email Server (SMTP Host)</div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tsmtphost\" maxlength=\"255\" /></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">SMTP Port</div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tsmtpport\" maxlength=\"7\" /></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">SMTP Login (Optional)</div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tsmtplogin\" maxlength=\"255\" /></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">SMTP Password</div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardvalue\"><input type=\"password\" id=\"wtw_tsmtppassword\" maxlength=\"255\" /></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div id=\"wtw_emailservercomplete\"></div><br />\r\n";
			$pagedata .= "					<div id=\"wtw_loadingemailserver\" class=\"wtw-loadingnotice\" style=\"margin-left:auto;margin-right:auto;color:#000000;\">Loading...</div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-greenmenubutton\" onclick=\"WTW.saveEmailServerSettings();\">Save Settings</div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div>\r\n";

			$pagedata .= "		<div id=\"wtw_webaliassettings\" class=\"wtw-fullpage\">\r\n";
			$pagedata .= "			<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\">Web Alias Settings</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div id='wtw_addwebalias' class='wtw-bluebuttonleft' onclick=\"WTW.openAliasForm();\">Add New</div>\r\n";
			$pagedata .= "					<div id='wtw_addwebaliasdiv' class=\"wtw-dashboardboxleftfull wtw-hide\">\r\n";
			$pagedata .= "						<div class='wtw-bluebuttonright' onclick=\"WTW.saveAliasForm(1);\">Save Web Alias</div>\r\n";
			$pagedata .= "						<div class='wtw-yellowbuttonright' onclick=\"WTW.saveAliasForm(-1);\">Cancel</div>\r\n";
			$pagedata .= "						<div class=\"wtw-dashboardboxtitle\">Add Web Alias</div>\r\n";
			$pagedata .= "						<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "							<div class=\"wtw-dashboardlabel\">Path Type:&nbsp;\r\n";
			$pagedata .= "								<select id=\"wtw_taliaspathtype\" onclick=\"WTW.setAliasForm(this);\" >\r\n";
			$pagedata .= "									<optgroup label=\"Load Community\">\r\n";
			$pagedata .= "										<option value='1'>Domain Name</option>\r\n";
			$pagedata .= "										<option value='2'>Community</option>\r\n";
			$pagedata .= "										<option value='3'>Building in Community</option>\r\n";
			$pagedata .= "										<option value='4'>Thing in Community</option>\r\n";
			$pagedata .= "										<option value='5'>Thing in Building in Community</option>\r\n";
			$pagedata .= "									</optgroup>\r\n";
			$pagedata .= "									<optgroup label=\"Load Building\">\r\n";
			$pagedata .= "										<option value='6'>Building</option>\r\n";
			$pagedata .= "										<option value='7'>Thing in Building</option>\r\n";
			$pagedata .= "									</optgroup>\r\n";
			$pagedata .= "									<optgroup label=\"Load Thing\">\r\n";
			$pagedata .= "										<option value='8'>Thing</option>\r\n";
			$pagedata .= "									</optgroup>\r\n";
			$pagedata .= "								</select></div>\r\n";
			$pagedata .= "							<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "							<table width='100%'>\r\n";
			$pagedata .= "								<tr>\r\n";
			$pagedata .= "									<td>&nbsp;</td>\r\n";
			$pagedata .= "									<td id='wtw_aliaslevel1'>&nbsp;</td>\r\n";
			$pagedata .= "									<td id='wtw_aliaslevel2'>&nbsp;</td>\r\n";
			$pagedata .= "									<td id='wtw_aliaslevel3'>&nbsp;</td>\r\n";
			$pagedata .= "									<td id='wtw_aliaslevel4'>&nbsp;</td>\r\n";
			$pagedata .= "								</tr>\r\n";
			$pagedata .= "								<tr>\r\n";
			$pagedata .= "									<td><select id=\"wtw_aliasforcehttps\"><option>https://</option><option>http://</option></select></td>\r\n";
			$pagedata .= "									<td id='wtw_aliastext1'><input type=\"text\" id=\"wtw_taliasdomainname\" value='3d.' maxlength=\"255\" /></td>\r\n";
			$pagedata .= "									<td id='wtw_aliastext2'>/<input type=\"text\" id=\"wtw_taliascommunitypublishname\" value='' maxlength=\"255\" /></td>\r\n";
			$pagedata .= "									<td id='wtw_aliastext3'>/<input type=\"text\" id=\"wtw_taliasbuildingpublishname\" value='' maxlength=\"255\" /></td>\r\n";
			$pagedata .= "									<td id='wtw_aliastext4'>/<input type=\"text\" id=\"wtw_taliasthingpublishname\" value='' maxlength=\"255\" /></td>\r\n";
			$pagedata .= "								</tr>\r\n";
			$pagedata .= "								<tr>\r\n";
			$pagedata .= "									<td>&nbsp;</td>\r\n";
			$pagedata .= "									<td id='wtw_aliasselect1'><select id=\"wtw_aliasdomaincommunityid\"></select></td>\r\n";
			$pagedata .= "									<td id='wtw_aliasselect2'>&nbsp;<select id=\"wtw_aliascommunityid\"></select></td>\r\n";
			$pagedata .= "									<td id='wtw_aliasselect3'>&nbsp;<select id=\"wtw_aliasbuildingid\"></select></td>\r\n";
			$pagedata .= "									<td id='wtw_aliasselect4'>&nbsp;<select id=\"wtw_aliasthingid\"></select></td>\r\n";
			$pagedata .= "								</tr>\r\n";
			$pagedata .= "							</table>\r\n";
			$pagedata .= "							<input type=\"hidden\" id=\"wtw_twebaliasid\" maxlength=\"16\" />\r\n";
			$pagedata .= "							<div id='wtw_aliascommunity'>\r\n";
			$pagedata .= "							</div>\r\n";
			$pagedata .= "							<div id='wtw_aliasbuilding'>\r\n";
			$pagedata .= "							</div>\r\n";
			$pagedata .= "							<div id='wtw_aliasthing'>\r\n";
			$pagedata .= "							</div>\r\n";
			$pagedata .= " 						</div>\r\n";
			$pagedata .= " 					</div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$pagedata .= "						<div class=\"wtw-dashboardboxtitle\">Web Aliases</div>\r\n";
			$pagedata .= "						<div id=\"wtw_webaliaslist\"></div><br />\r\n";
			$pagedata .= " 					</div>\r\n";
			$pagedata .= "					<div id=\"wtw_webaliascomplete\"></div><br />\r\n";
			$pagedata .= "					<div id=\"wtw_loadingwebalias\" class=\"wtw-loadingnotice\" style=\"margin-left:auto;margin-right:auto;color:#000000;\">Loading...</div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div>\r\n";
			$pagedata .= "	</div>\r\n";

			$pagedata .= "	<div id=\"wtw_errorpage\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			$pagedata .= "		<div id=\"wtw_showerror\" class=\"wtw-fullpage\">\r\n";
			$pagedata .= "			<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\">Error Information</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div id=\"wtw_error\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div>\r\n";
			$pagedata .= "	</div>\r\n";
			
			$pagedata .= "	<div id=\"wtw_fullpageplugins\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			foreach ($this->fullpagedivs as $zfullpageitem) {
				$zid = $zfullpageitem["id"];
				$zaccessrequired = $zfullpageitem["accessrequired"]; /* array of allowed roles */
				$zfullpagedata = $zfullpageitem["fullpagedata"];
				if ($wtwdb->hasPermission($zaccessrequired)) {
					/* check for invalid entries */
					if (empty($zid) | !isset($zid)) {
						$zid = $wtwdb->getRandomString(6,1);
					}
					if (empty($zfullpagedata) || !isset($zfullpagedata)) {
						$zfullpagedata = '';
					}
					if (!empty($zfullpagedata) && isset($zfullpagedata)) {
						$pagedata .= "		<div id=\"".$zid."\" class=\"wtw-fullpage\">\r\n";
						$pagedata .= $zfullpagedata;
						$pagedata .= "		</div>\r\n";
					}
				}
			}			
			$pagedata .= "	</div>\r\n";

			$pagedata .= "	<br />\r\n";
			$pagedata .= "	<br />\r\n";
			$pagedata .= "	<br />\r\n";
			$pagedata .= "</div>\r\n";
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadFullPageForm=".$e->getMessage());
		}
		return $pagedata;
	}
	
	public function addFullPageForm($zid, $zaccessrequired, $zfullpagedata) {
		$zsuccess = false;
		try {	
			$fullpagediv = array(
				'id' => $zid,
				'accessrequired' => $zaccessrequired, 
				'fullpagedata' => $zfullpagedata
			);
			$this->fullpagedivs[count($this->fullpagedivs)] = $fullpagediv;
			
			$zsuccess = true;
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-addFullPageForm=".$e->getMessage());
		}
		return $zsuccess;
	}
}

	function wtw() {
		return wtw::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtw'] = wtw();

	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
	function shutdownOnError() {
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
					$error .= "if (document.getElementById('wtw_error') != null) {";
					$error .= "document.getElementById('wtw_error').innerHTML = '".addslashes(str_replace("Stack trace","<br />Stack trace",$message))."';";
					$error .= "WTW.openFullPageForm('error','Error Found');";
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
	$wtw->checkHost();
	$wtw->getDomainInfo();
	$wtw->checkDatabase();
	global $wtwdb;
	$wtwdb->trackPageView($wtw->domainurl.$wtw->uri);
	$wtw->checkWeb();
?>
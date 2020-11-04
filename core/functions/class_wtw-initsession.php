<?php
class wtw {
	/* main $wtw class for WalkTheWeb Websites */
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
		define("wtw_rootpath", $this->rootpath);
		if (file_exists(wtw_rootpath.'/config/wtw_config.php')) {
			require_once(wtw_rootpath.'/config/wtw_config.php');
		}
		require_once(wtw_rootpath.'/core/functions/class_wtwuser.php');
	}	
	
	/* declare public $wtw variables */
	public $version = "3.4.0";
	public $dbversion = "1.1.8";
	public $versiondate = "2020-10-30";
	public $serverinstanceid = "";
	public $usertoken = "";
	public $rootpath = "";
	public $contentpath = "";
	public $contenturl = "";
	public $protocol = "http://";
	public $domainname = "";
	public $domainurl = "";
	public $websiteurl = "";
	public $serverip = '';
	public $pagename = "";
	public $userid = "";
	public $globaluserid = "";
	public $userip = "";
	public $uri = "";
	public $community = "";
	public $building = "";
	public $thing = "";
	public $communityid = "";
	public $buildingid = "";
	public $thingid = "";
	public $pluginstylesheets = array();
	public $pluginscripts = array();
	public $pluginscriptfunctions = array();
	public $pluginMoldDefs = array();
	public $pluginActionZoneDefs = array();
	public $pluginCoveringDefs = array();
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}

	public function serror($message) {
		/* reports errors and writes them to the database errorlog table */
		$returntext = "";
		try {
			$conn = new mysqli(wtw_dbserver, wtw_dbusername, base64_decode(wtw_dbpassword), wtw_dbname);
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
						/* $error = "console.log('".addslashes($message)."');";
						   $error .= "document.getElementById('wtw_error').innerHTML = '".addslashes($message)."';";
						   $error .= "WTW.openFullPageForm('error','Error Found');"; */
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

	public function checkHost(){ 
		/* checks for https, traps load balancers from having to fully load a page, and loads the public variables */
		try {
			global $wtwuser;
			/* load class variables */
			$host= gethostname();
			/* get server local IP for load balancer check */
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
			/* replace server IP with Public IP */
			$serverip = gethostbyname($this->domainname);
			$this->serverip = $serverip;

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
			if ($this->protocol == "https://"){
				session_set_cookie_params($lifetime = 0, $path = '/', $this->domainname, $secure = true, $httponly = true);
			} else {
				session_set_cookie_params($lifetime = 0, $path = '/', $this->domainname, $secure = false, $httponly = true);
			}
			if (session_status() == PHP_SESSION_NONE) {
				session_start();
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
			if (!empty($_SESSION["wtw_usertoken"]) && isset($_SESSION["wtw_usertoken"])) {
				$this->usertoken = $_SESSION["wtw_usertoken"];
			}
			if (!empty($_SESSION["wtw_globaluserid"]) && isset($_SESSION["wtw_globaluserid"])) {
				$this->globaluserid = $_SESSION["wtw_globaluserid"];
			}
			if (isset($_SERVER['PHP_SELF']) && !empty($_SERVER['PHP_SELF'])) {
				$this->pagename = strtolower(basename($_SERVER['PHP_SELF']));
			} else {
				$this->pagename = "index.php";
			}
			if (isset($_SERVER['REQUEST_URI']) && !empty($_SERVER['REQUEST_URI'])) {
				$this->uri = trim($_SERVER['REQUEST_URI']);
				if (isset($_GET["wtwpath"])) {
					$this->uri = $_GET["wtwpath"];
				}
			}
			if (defined('wtw_contentpath')) {
				$this->contentpath = wtw_contentpath;
				$wtwuser->contentpath = wtw_contentpath;
			} else {
				$this->contentpath = wtw_rootpath."/content";
				$wtwuser->contentpath = wtw_rootpath."/content";
			}
			if (defined('wtw_contenturl')) {
				$this->contenturl = $this->domainurl.wtw_contenturl;
			} else {
				$this->contenturl = $this->domainurl."/content";
			}
			if (defined('wtw_serverinstanceid')) {
				$this->serverinstanceid = wtw_serverinstanceid;
			} else {
				$this->serverinstanceid = $this->getRandomString(16,1);
			}
			if (defined('wtw_adminemail') == false) {
				define("wtw_adminemail", '');
			}
			if (defined('wtw_adminname') == false) {
				define("wtw_adminname", '');
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
				define("wtw_umask", "0027");
			}
			umask(octdec(wtw_umask));
			if (defined('wtw_chmod') == false) {
				define("wtw_chmod", "755");
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-checkHost=" . $e->getMessage());
		}
	}
	
	public function getDomainInfo() {
		/* parse the URL and check for web aliases, connect files, or handler files */
		try {
			if (!empty($this->uri) && isset($this->uri)) {
				$this->websiteurl = $this->uri;
				$root =  explode('?', $this->uri);
				$pathdef = explode("/", $root[0]);
				if (trim($pathdef[1]) == "" || trim($pathdef[1]) == "index.php" || trim($pathdef[1]) == "admin.php" || trim($pathdef[1]) == "core" || trim($pathdef[1]) == "connect" || trim($pathdef[1]) == "content" || trim($pathdef[1]) == "config") {
					$this->community = "";
					$this->building = "";
					$this->thing = "";
					$this->websiteurl = $this->domainurl;
					
					if (trim($pathdef[1]) == "connect") {
						require_once(wtw_rootpath.'/core/functions/class_wtwpluginloader.php');
						global $wtwpluginloader;
						$wtwpluginloader->loadConnectURL();
					} if (trim($pathdef[1]) == "core") {
						if (isset($pathdef[2]) && !empty($pathdef[2])) {
							require_once(wtw_rootpath.'/core/functions/class_wtwpluginloader.php');
							global $wtwpluginloader;
							switch (trim($pathdef[2])) {
								case "handlers":
									$wtwpluginloader->loadHandlersURL();
									break;
							}
						}
					}
				} else if (trim($pathdef[1]) == "community" || trim($pathdef[1]) == "communities") {
					$this->community = trim($pathdef[2]);
					$this->building = "";
					$this->thing = "";
					$this->websiteurl = $this->domainurl."/".$this->community;
				} else if (trim($pathdef[1]) == "building" || trim($pathdef[1]) == "buildings") {
					$this->community = "";
					$this->building = trim($pathdef[2]);
					$this->thing = "";
					$this->websiteurl = $this->domainurl."/buildings/".$this->building;
				} else if (trim($pathdef[1]) == "thing" || trim($pathdef[1]) == "things") {
					$this->community = "";
					$this->building = "";
					$this->thing = trim($pathdef[2]);
					$this->websiteurl = $this->domainurl."/things/".$this->thing;
				} else if (isset($pathdef[3]) && !empty($pathdef[3])) {
					$this->community = trim($pathdef[1]);
					$this->building = trim($pathdef[2]);
					$this->thing = trim($pathdef[3]);
					$this->websiteurl = $this->domainurl."/".$this->community."/".$this->building."/".$this->thing;
				} else if (isset($pathdef[2]) && !empty($pathdef[2])) {
					$this->community = trim($pathdef[1]);
					$this->building = trim($pathdef[2]);
					$this->thing = "";
					$this->websiteurl = $this->domainurl."/".$this->community."/".$this->building;
				} else {
					$this->community = trim($pathdef[1]);
					$this->building = "";
					$this->thing = "";
					$this->websiteurl = $this->domainurl."/".$this->community;
				}
			} else {
				if (defined("wtw_defaultdomain")) {
					if ($this->domainname == strtolower(wtw_defaultdomain)) {
						$this->community = "";
						$this->building = "";
						$this->thing = "";
					}
				}
				$this->websiteurl = $this->domainurl;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-getDomainInfo=" . $e->getMessage());
		}
	}
	
	public function getVal($key, $defaultval) {
		/* get querystring information with a default value if not found */
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
		/* get querystring number information with a default value if not found */
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
		/* number validation function with fallback value */
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
		/* text validation function that handles special characters */
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
		/* creates a random alpha numeric text string ov different lengths and character types */
		/* note that most id values use type 1 */
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
					/* database connectivity values submitted and processed */
					if (!file_exists(wtw_rootpath.'/config')) {
						mkdir(wtw_rootpath.'/config', octdec(wtw_chmod), true);
						chmod(wtw_rootpath.'/config', octdec(wtw_chmod));
					}
					$server = $_POST["wtw_dbserver"];
					$database = $_POST["wtw_dbname"];
					$dbuser = $_POST["wtw_dbusername"];
					$dbpassword = $_POST["wtw_dbpassword"];
					$prefix = $_POST["wtw_tableprefix"];
					$contentpath = wtw_rootpath."/content";
					$contenturl = "/content";
					$zdomainname = "";
					if (isset($_SERVER['HTTP_HOST']) && !empty($_SERVER['HTTP_HOST'])) {
						$zdomainname = strtolower($_SERVER['HTTP_HOST']);
					}
					if (!file_exists(wtw_rootpath.'/config/wtw_config.php')) {
						/* create config text file /config/wtw_config.php if it does not exist */
						/* set global variable values */
						define("wtw_serverinstanceid", $this->serverinstanceid);
						define("wtw_dbserver", $server);
						define("wtw_dbname", $database);
						define("wtw_dbusername", $dbuser);
						define("wtw_dbpassword", base64_encode($dbpassword));
						define("wtw_tableprefix", $prefix);
						define("wtw_devmode", "1");
						define("wtw_contentpath", $contentpath);
						define("wtw_contenturl", $contenturl);
						define("wtw_defaultdomain", $zdomainname);
						$this->contentpath = $contentpath;
						$this->contenturl = $this->domainurl.$contenturl;
						/* write global variable values to text file - will be used on page load after it is found */
						$cfile = fopen(wtw_rootpath.'/config/wtw_config.php','wb');
						fwrite($cfile,"<?php\r\n");
						fwrite($cfile,"    define(\"wtw_serverinstanceid\", \"".$this->serverinstanceid."\");\r\n");
						fwrite($cfile,"    define(\"wtw_dbserver\", \"".$server."\");\r\n");
						fwrite($cfile,"    define(\"wtw_dbname\", \"".$database."\");\r\n");
						fwrite($cfile,"    define(\"wtw_dbusername\", \"".$dbuser."\");\r\n");
						fwrite($cfile,"    define(\"wtw_dbpassword\", \"".base64_encode($dbpassword)."\");\r\n");
						fwrite($cfile,"    define(\"wtw_tableprefix\", \"".$prefix."\");\r\n\r\n");
						fwrite($cfile,"    define(\"wtw_devmode\", \"1\");\r\n\r\n");
						fwrite($cfile,"    define(\"wtw_contentpath\", \"".$contentpath."\");\r\n");
						fwrite($cfile,"    define(\"wtw_contenturl\", \"".$contenturl."\");\r\n\r\n");
						fwrite($cfile,"    define(\"wtw_defaultdomain\", \"".$zdomainname."\");\r\n\r\n");
						fwrite($cfile,"?>");
						fclose($cfile);
						chmod(wtw_rootpath.'/config/wtw_config.php', octdec(wtw_chmod));
						$zsetupstep = 0;
						header("Location: ".$this->domainurl."/"); 
						exit();
					} else {
						$zsetupstep = 2;
					}
				} else if (defined('wtw_dbserver') || defined('wtw_dbname') || defined('wtw_dbusername') || defined('wtw_dbpassword') || defined('wtw_tableprefix')) {
					/* if all values are confirmed, move to next step in setup */
					$zsetupstep = 2;
				}
			} else {
				if (!defined('wtw_serverinstanceid')) {
					/* check for server instance id - create if not found */
					define("wtw_serverinstanceid", $this->serverinstanceid);
					$lines = file(wtw_rootpath.'/config/wtw_config.php');
					$last = sizeof($lines) - 1 ; 
					unset($lines[$last]); 
					$cfile = fopen(wtw_rootpath."/config/wtw_config.php","wb");
					fwrite($cfile, implode('', $lines));
					fwrite($cfile,"    define(\"wtw_serverinstanceid\", \"".$this->serverinstanceid."\");\r\n");
					fwrite($cfile,"?>");
					fclose($cfile);
					chmod(wtw_rootpath.'/config/wtw_config.php', octdec(wtw_chmod));
				}
			}
			/* if using plain text password - convert plain text password to encoded password */
			if (defined('wtw_dbserver') && defined('wtw_dbname') && defined('wtw_dbusername') && defined('wtw_dbpassword')) {
				$zupdatepassword = false;
				/* check if password looks like it is encoded */
				if (base64_decode(wtw_dbpassword, true) !== false) {
					/* try to make a connection with decoded password */
					$conn = new mysqli(wtw_dbserver, wtw_dbusername, base64_decode(wtw_dbpassword), wtw_dbname);
					if ($conn->connect_error) {
						/* connection did not work, try connection without decoding */
						$conn = new mysqli(wtw_dbserver, wtw_dbusername, wtw_dbpassword, wtw_dbname);
						if ($conn->connect_error == false) {
							/* connection worked, now encode password */
							$zupdatepassword = true;
						}
					}
				} else {
					/* connection did not work, try connection without decoding */
					$conn = new mysqli(wtw_dbserver, wtw_dbusername, wtw_dbpassword, wtw_dbname);
					if ($conn->connect_error == false) {
						/* connection worked, now encode password */
						$zupdatepassword = true;
					}
				}
				if ($zupdatepassword == true) {
					/* update password with encoded password */
					$lines = file(wtw_rootpath.'/config/wtw_config.php');
					$cfile = fopen(wtw_rootpath."/config/wtw_config.php","wb");
					foreach ($lines as $line) {
						if (strpos($line, 'wtw_dbpassword') !== false) {
							fwrite($cfile, "    define(\"wtw_dbpassword\", \"".base64_encode(wtw_dbpassword)."\");\r\n");
						} else if (strpos($line, 'wtw_defaultfromemail') !== false) {
							fwrite($cfile, str_replace("wtw_defaultfromemail","wtw_adminemail",$line));
						} else {
							fwrite($cfile, $line);
						}
					}
					fclose($cfile);
					chmod(wtw_rootpath.'/config/wtw_config.php', octdec(wtw_chmod));
					header("Location: ".$this->domainurl."/"); 
					exit();
				}
			}
			if ($zsetupstep == 0) {
				/* database check */
				require_once(wtw_rootpath.'/core/functions/class_wtwdb.php');
				require_once(wtw_rootpath.'/core/functions/class_wtwusers.php');
				require_once(wtw_rootpath.'/core/functions/class_wtwpluginloader.php');
				$conn = new mysqli(wtw_dbserver, wtw_dbusername, base64_decode(wtw_dbpassword), wtw_dbname);
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
						/* run table setup and updates */
						require_once(wtw_rootpath.'/core/functions/class_wtwtables.php');
						global $wtwtables;
						$wtwtables->databaseTableDefinitions();
						$zsetupstep = 0;
						header("Location: ".$this->domainurl."/"); 
						exit();
					}
				} 
			}
			if ($zsetupstep == 0) {
				/* all previous steps are complete - turn on error trapping */
				set_error_handler (
					function($errno, $errstr, $errfile, $errline) {
						throw new ErrorException($errstr, $errno, 0, $errfile, $errline);     
					}
				);
				register_shutdown_function('shutdownOnError');
				global $wtwdb;
				if ($this->pagename == "admin.php") {
					/* check for table updates if the db version is not current */
					$zdbversion = $wtwdb->getSetting("wtw_dbversion");
					if ($zdbversion != $this->dbversion) {
						require_once(wtw_rootpath.'/core/functions/class_wtwtables.php');
						global $wtwtables;
						/* run table updates */
						$wtwtables->databaseTableDefinitions();
						/* run data updates and additions */
						$wtwtables->checkDBVersionData($this->userid);
					}
				}
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
							/* set basic current user information - if it exists */
							$wtwuser->email = $zrow["email"];
							$wtwuser->userimageurl = $zrow["userimageurl"];
							$wtwuser->uploadpathid = $zrow["uploadpathid"];
						}
					}
				}
			}
			if ($zsetupstep == 3) {
				if ($_SERVER['REQUEST_METHOD']=='POST') {
					/* set up admin user from setup form */
					try {
						require_once(wtw_rootpath.'/core/functions/class_wtwtables.php');
						global $wtwusers;
						global $wtwtables;
						$zsitename = $_POST["wtw_tsitename"];
						$zanalytics = $_POST["wtw_googleanalytics"];
						$zadmindisplayname = base64_encode($_POST["wtw_tadmindisplayname"]);
						$zadminpassword = $_POST["wtw_tadminpassword"];
						$zadminpassword2 = $_POST["wtw_tadminpassword2"];
						$zadminemail = $_POST["wtw_tadminemail"];
						
						/* write analytics and default email/sitename to config file */
						if (file_exists(wtw_rootpath.'/config/wtw_config.php') && !defined('wtw_defaultsitename')) {
							$lines = file(wtw_rootpath.'/config/wtw_config.php');
							$last = sizeof($lines) - 1 ; 
							unset($lines[$last]); 
							$cfile = fopen(wtw_rootpath."/config/wtw_config.php","wb");
							fwrite($cfile, implode('', $lines));
							fwrite($cfile,"    define(\"wtw_defaultsitename\", \"".$zsitename."\");\r\n");
							fwrite($cfile,"    define(\"wtw_googleanalytics\", \"".$zanalytics."\");\r\n");
							fwrite($cfile,"    define(\"wtw_adminemail\", \"".$zadminemail."\");\r\n");
							fwrite($cfile,"?>");
							fclose($cfile);
							chmod(wtw_rootpath.'/config/wtw_config.php', octdec(wtw_chmod));
						}
						/* set up initial admin user - from installation process */
						$zuserid = $wtwusers->firstAdminUser($zadmindisplayname,$zadminpassword,$zadminemail);
						/* load initial tables form install */
						$wtwtables->loadInitDbData($zuserid);
						/* set user as admin role */
						$wtwusers->addUserRole($zuserid, 'Admin');
						header("Location: ".$this->domainurl."/"); 
						exit();
					} catch (Exception $e){}
				}
			}
			$zcommunityid = '';
			$zbuildingpositionx = '0';
			$zbuildingpositiony = '0';
			$zbuildingpositionz = '0';
			$zbuildingrotationy = '0';
			if ($zsetupstep == 0) {
				/* check if first 3D Community is created */
				global $wtwdb;
				$scount = 0;
				$zresults = $wtwdb->query("select t1.*, 
						t2.scount 
					from ".wtw_tableprefix."communities t1
						left join (select count(*) as scount  from ".wtw_tableprefix."communities) t2
						on 1=1
					order by t1.createdate desc
					limit 1;");
				foreach ($zresults as $zrow) {
					$scount = $zrow["scount"];
					$zcommunityid = $zrow["communityid"];
					$zbuildingpositionx = $zrow["buildingpositionx"];
					$zbuildingpositiony = $zrow["buildingpositiony"];
					$zbuildingpositionz = $zrow["buildingpositionz"];
					$zbuildingrotationy = $zrow["buildingrotationy"];
					
					$zresultsweb = $wtwdb->query("
						select * from ".wtw_tableprefix."webaliases
						where domainname='".$this->domainname."'
							and deleted=0;");
					if (count($zresultsweb) == 0) {
						$zwebaliasid = $wtwdb->getRandomString(16,1);
						$zforcehttps = 0;
						if ($this->protocol == "https://") {
							$zforcehttps = 1;
						}
						$wtwdb->query("
							insert into ".wtw_tableprefix."webaliases
							   (webaliasid,
								domainname,
								communityid,
								webalias,
								forcehttps,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							   values
							   ('".$zwebaliasid."',
								'".$this->domainname."',
								'".$zcommunityid."',
								'".$this->domainname."',
								".$zforcehttps.",
								now(),
								'".$this->userid."',
								now(),
								'".$this->userid."');");
					}
				}
				if ($scount == 0) {
					if (empty($_SESSION["wtw_userid"]) || !isset($_SESSION["wtw_userid"])) {
						/* if not logged in - log in admin user */
						$zsetupstep = 5;
						if ($_SERVER['REQUEST_METHOD']=='POST') {
							global $wtwusers;
							$zadminemail = base64_encode($_POST["wtw_tadminemail"]);
							$zadminpassword = base64_encode($_POST["wtw_tadminpassword"]);
							$zuser = $wtwusers->loginAttempt($zadminemail,$zadminpassword);
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
				/* check if first 3D Building is created */
				global $wtwdb;
				$scount = 0;
				$zresults = $wtwdb->query("select count(*) scount 
					from ".wtw_tableprefix."buildings
					where downloadparentwebid='';");
				foreach ($zresults as $zrow) {
					$scount = $zrow["scount"];
				}
				if ($scount == 0) {
					if (empty($_SESSION["wtw_userid"]) || !isset($_SESSION["wtw_userid"])) {
						/* if not logged in - log in admin user */
						$zsetupstep = 5;
						if ($_SERVER['REQUEST_METHOD']=='POST') {
							global $wtwusers;
							$zadminemail = base64_encode($_POST["wtw_tadminemail"]);
							$zadminpassword = base64_encode($_POST["wtw_tadminpassword"]);
							$zuser = $wtwusers->loginAttempt($zadminemail,$zadminpassword);
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
			/* setup process steps - display webpages */
			switch ($zsetupstep) {
				case 1: /* Need to set up Database Login */
					echo "<!DOCTYPE html><html><head><title>WalkTheWeb Setup</title>";
					echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"/core/styles/wtw_install.css\" /></head>";
					echo "<body style='background-color:grey;font-family:arial;'><form id='wtw_form1' action='' method='post'>";
					echo "<div style='width:100%;'><br /><div style='border:1px solid black;background-color:white;width:400px;margin-top:20px;margin-bottom:20px;margin-left:auto;margin-right:auto;'>";
					echo "<img src='/content/system/images/wtwlogo.png' style='margin-left:40px;margin-right:40px;' />";
					echo "<hr /><h3 class=\"wtw-icenter\" style='margin-top:0px;'>Database Setup</h3>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Server:</b></div>";
					echo "<input name='wtw_dbserver' type='text' value='127.0.0.1:3306' size='20' maxlength='255' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Database Name:</b></div>";
					echo "<input name='wtw_dbname' type='text' value='' size='20' maxlength='255' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Database User:</b></div>";
					echo "<input name='wtw_dbusername' type='text' value='' size='20' maxlength='255' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Database Password:</b></div>";
					echo "<input name='wtw_dbpassword' type='password' value='' size='20' maxlength='64' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Table Prefix:</b></div>";
					echo "<input name='wtw_tableprefix' type='text' value='wtw_' size='20' maxlength='24' />";
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
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Admin Email:</b></div>";
					echo "<input name='wtw_tadminemail' type='text' value='' size='20' maxlength='255' autocomplete='email' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Admin Password:</b></div>";
					echo "<input name='wtw_tadminpassword' type='password' value='' size='20' maxlength='24' autocomplete='new-password' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Confirm Password:</b></div>";
					echo "<input name='wtw_tadminpassword2' type='password' value='' size='20' maxlength='24' autocomplete='new-password' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Admin Display Name:</b></div>";
					echo "<input name='wtw_tadmindisplayname' type='text' value='' size='20' maxlength='255' autocomplete='nickname' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";

					echo "<hr /><h3 class=\"wtw-icenter\" style='margin-top:0px;'>Site Settings</h3>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Site Name:</b></div>";
					echo "<input name='wtw_tsitename' type='text' value='My 3D Website' size='20' maxlength='255' />";
					echo "<div class='wtw-iclear' style='min-height:20px;'></div>";
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Google Analytics (Optional):</b></div>";
					echo "<input name='wtw_googleanalytics' type='text' value='' size='20' maxlength='24' />";
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
					echo "<div style='float:left;width:170px;margin-left:10px;margin-right:10px;'><b>Admin Email:</b></div>";
					echo "<input name='wtw_tadminemail' type='text' value='' size='20' maxlength='255' autocomplete='email' />";
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
					echo "<div style='width:100%;'><br /><div style='border:1px solid black;background-color:white;width:90%;margin-top:20px;margin-bottom:20px;margin-left:auto;margin-right:auto;text-align:center;'>";
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
					echo "</div></div><br /></div><br /></form>";
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
					echo "<div style='width:100%;'><br /><div style='border:1px solid black;background-color:white;width:90%;margin-top:20px;margin-bottom:20px;margin-left:auto;margin-right:auto;text-align:center;'>";
					echo "<img src='/content/system/images/wtwlogo.png' />";
					echo "<input type=\"hidden\" id=\"wtw_serverinstanceid\" value=\"".$this->serverinstanceid."\" />";
					echo "<input type=\"hidden\" id=\"wtw_tcommunityid\" value=\"".$zcommunityid."\" />";
					echo "<input type=\"hidden\" id=\"wtw_tbuildingpositionx\" value=\"".$zbuildingpositionx."\" />";
					echo "<input type=\"hidden\" id=\"wtw_tbuildingpositiony\" value=\"".$zbuildingpositiony."\" />";
					echo "<input type=\"hidden\" id=\"wtw_tbuildingpositionz\" value=\"".$zbuildingpositionz."\" />";
					echo "<input type=\"hidden\" id=\"wtw_tbuildingrotationy\" value=\"".$zbuildingrotationy."\" />";

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
					echo "</div></div><br /></div><br /></form>";
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
		/* check if domain name is set to a 3D Community, Building or Thing and check if https is available */
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
				/* user has admin access, get item to edit from querystring */
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
				/* Get the web alias for the loaded web if available */
				$this->websiteurl = $this->domainurl;
				$zresults = $wtwdb->query("
					select * from ".wtw_tableprefix."webaliases
					where communityid='".$this->communityid."'
						and buildingid='".$this->buildingid."'
						and thingid='".$this->thingid."'
						and deleted=0
					order by createdate, communitypublishname, buildingpublishname, thingpublishname, webaliasid
					limit 1;");
				foreach ($zresults as $zrow) {
					$zwebsiteurl = "http://";
					if ($zrow["forcehttps"] == '1') {
						$zwebsiteurl = "https://";
					}
					$zwebsiteurl .= $zrow["webalias"];
					if (!empty($zrow["communitypublishname"]) && isset($zrow["communitypublishname"])) {
						$zwebsiteurl .= "/".$zrow["communitypublishname"];
					} else if (!empty($zrow["buildingpublishname"]) && isset($zrow["buildingpublishname"])) {
						$zwebsiteurl .= "/buildings/".$zrow["buildingpublishname"];
					} else if (!empty($zrow["thingpublishname"]) && isset($zrow["thingpublishname"])) {
						$zwebsiteurl .= "/things/".$zrow["thingpublishname"];
					}
					$this->websiteurl = $zwebsiteurl;
				}
			} else if ($this->pagename == "admin.php") {
				/* user does not have admin.php access so redirect to public home page */
				header("Location: ".$this->domainurl."/"); 
				exit();
			} else {
				/* url may be a web alias - check for available 3D Website paths */
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
				example: avatar start position relative to a building in a community */
			/* use z2 variables to calculate the adjustments and apply them to the z variables */
			/* currently this is a place holder for when this functionality is required */
			/* note: will need rad2deg php function to calculate rotations */
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
		/* check if user has the role of architect access */
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
		/* get initial 3D COmmunity Scene settings (sky, water level, ground textures, and avatar start position) */
		global $wtwdb;
		$initialscene = array();
		try {
			/* select initial avatar position based on path publish names (work in progress - includes prep for future use) */
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
				/* get user access to this 3D web item */
				if (!empty($this->communityid)) {
					/* check community level */
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
							/* access denied - redirect to public website */
							header("Location: ".$this->domainurl);
							exit();
						}
						$i += 1;
					}
				}
				if (!empty($this->buildingid)) {
					/* check building level */
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
					/* check thing level */
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
				/* if a community, building, and thing are called as start point reference */
				/* note this means the relative position to a thing, within a building, within a community */
				/* each level of connection grid can be positioned, scaled, and rotated */
				
				/* things table - get thing's self position, rotation, and scaling */
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
					/* connectinggrids table - get thing's position, rotation, and scaling in relation to the building */
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
					/* connectinggrids table - get building's position, rotation, and scaling in relation to the community */
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
				/* if a building in a community is called as start point reference */
				/* buildings table - get building's self position, rotation, and scaling */
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
					/* connectinggrids table - get building's position, rotation, and scaling in relation to the community */
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
				/* if a thing in a community is called as start point reference */
				/* things table - get thing's self position, rotation, and scaling */
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
					/* connectinggrids table - get thing's position, rotation, and scaling in relation to the community */
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
				/* if a thing in a building is called as start point reference (no community ) */
				/* things table - get thing's self position, rotation, and scaling */
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
					/* connectinggrids table - get thing's position, rotation, and scaling in relation to the building */
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
				/* if only a community is called as start point reference */
				/* communities table - get community's self position, rotation, and scaling */
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
				/* if only a building is called as start point reference */
				/* buildings table - get building's self position, rotation, and scaling */
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
				/* if only a thing is called as start point reference */
				/* things table - get thing's self position, rotation, and scaling */
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
				/* get main 3D Community Scene settings */
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
				/* get main 3D Building settings */
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
				/* get main 3D Thing settings */
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
			/* get main 3D Thing settings */
			$zresults = $wtwdb->query("
				select settingvalue
				from ".wtw_tableprefix."settings
				where settingname='enableemailvalidation'
					and deleted=0
				limit 1;");
			if (count($zresults) > 0) {
				foreach ($zresults as $zrow) {
					$initialscene['enableemailvalidation'] = $zrow["settingvalue"];
				}
			} else {
				$initialscene['enableemailvalidation'] = '0';
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-getSceneSetting=".$e->getMessage());
		}
		return $initialscene;
	}
	
	public function loadMetaData() {
		/* sets the meta data for the web page */
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
			/* get meta data values based on 3D Community, Building, or Thing */
			if (!empty($this->communityid)) {
				/* get meta data values based on 3D Community as root level */
				$zresults = $wtwdb->query("
					select 
						case when u2.filepath = '' or u2.filepath is null 
							then '".$this->domainurl."/content/uploads/communities/".$this->communityid."/snapshots/defaultcommunitysm.png'
							else u2.filepath
							end as previewpath, 
						case when u2.filepath = '' or u2.filepath is null 
							then '/uploads/communities/".$this->communityid."/snapshots/defaultcommunitysm.png'
							else ''
							end as testpreviewpath, 
						case when u2.filepath = '' or u2.filepath is null 
							then u1.imagewidth
							else u2.imagewidth
							end as previewwidth, 
						case when u2.filepath = '' or u2.filepath is null 
							then u1.imageheight
							else u2.imageheight
							end as previewheight,
						c1.communityname as webname,
						c1.communitydescription as webdescription
					from ".wtw_tableprefix."communities c1 
					inner join ".wtw_tableprefix."uploads u1 
						on c1.snapshotid=u1.uploadid 
					left join ".wtw_tableprefix."uploads u2 
						on u1.originalid=u2.uploadid 
					where c1.communityid='".$this->communityid."' limit 1;");
			} else if (!empty($this->buildingid)) {
				/* get meta data values based on 3D Building as root level */
				$zresults = $wtwdb->query("
					select 
						case when u2.filepath = '' or u2.filepath is null 
							then '".$this->domainurl."/content/uploads/buildings/".$this->buildingid."/snapshots/defaultbuildingsm.png'
							else u2.filepath
							end as previewpath, 
						case when u2.filepath = '' or u2.filepath is null 
							then '/uploads/buildings/".$this->buildingid."/snapshots/defaultbuildingsm.png'
							else ''
							end as testpreviewpath, 
						case when u2.filepath = '' or u2.filepath is null 
							then u1.imagewidth
							else u2.imagewidth
							end as previewwidth, 
						case when u2.filepath = '' or u2.filepath is null 
							then u1.imageheight
							else u2.imageheight
							end as previewheight,
						b1.buildingname as webname,
						b1.buildingdescription as webdescription
					from ".wtw_tableprefix."buildings b1 
					inner join ".wtw_tableprefix."uploads u1 
						on b1.snapshotid=u1.uploadid 
					left join ".wtw_tableprefix."uploads u2 
						on u1.originalid=u2.uploadid 
					where b1.buildingid='".$this->buildingid."' limit 1;");
			} else if (!empty($this->thingid)) {
				/* get meta data values based on 3D Thing as root level */
				$zresults = $wtwdb->query("
					select 
						case when u2.filepath = '' or u2.filepath is null 
							then '".$this->domainurl."/content/uploads/things/".$this->thingid."/snapshots/defaultthingsm.png'
							else u2.filepath
							end as previewpath, 
						case when u2.filepath = '' or u2.filepath is null 
							then '/uploads/things/".$this->thingid."/snapshots/defaultthingsm.png'
							else ''
							end as testpreviewpath, 
						case when u2.filepath = '' or u2.filepath is null 
							then u1.imagewidth
							else u2.imagewidth
							end as previewwidth, 
						case when u2.filepath = '' or u2.filepath is null 
							then u1.imageheight
							else u2.imageheight
							end as previewheight,
							t1.thingname as webname,
							t1.thingdescription as webdescription
					from ".wtw_tableprefix."things t1 
					inner join ".wtw_tableprefix."uploads u1 
						on t1.snapshotid=u1.uploadid 
					left join ".wtw_tableprefix."uploads u2 
						on u1.originalid=u2.uploadid 
					where t1.thingid='".$this->thingid."' limit 1;");
			}
			foreach ($zresults as $zrow) {
				$previewpath = $zrow["previewpath"]."?time=".date_timestamp_get(date_create());
				$testpreviewpath = $zrow["testpreviewpath"];
				$previewwidth = $zrow["previewwidth"];
				$previewheight = $zrow["previewheight"];
				$webtitle = $zrow["webname"];
				$webdescription = $zrow["webdescription"];
			}

			if (!file_exists($this->contentpath.$testpreviewpath) && !empty($testpreviewpath)) {
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
			/* meta data entries */
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
			/* additional optional meta data - should be defined on the /config/wtw_config.php file */
/*			if (defined('domainverify')) {
				$metadata .= "<meta name=\"p:domain_verify\" content=\"".domainverify."\"/>\r\n";
			}
			if (defined('fbappid')) {
				$metadata .= "<meta property=\"fb:app_id\" content=\"".fbappid."\" />\r\n";
			}
			if (defined('contactemail')) {
				$metadata .= "<meta property=\"business:contact_data\" content=\"".contactemail."\" />\r\n";
			}
*/		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadMetaData=".$e->getMessage());
		}
		return $metadata;
	}
	
	public function loadInitJSData() {
		/* global JavaScript variables passed from the Database using PHP */
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
			$jsdata .= "	var wtw_websiteurl = '".$this->websiteurl."';\r\n";
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
			$jsdata .= "<script src=\"/core/scripts/engine/socket.io.js\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_constructor.js?x=".$this->version."\"></script>\r\n";
			$jsdata .= $wtwplugins->getScriptFunctions();
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadInitJSData=".$e->getMessage());
		}
		return $jsdata;
	}

	public function loadJSBrowseData() {
		/* these scripts are loaded when in the browse mode (for Admin scripts, see /core/functions/class_wtwadmin.php) */
		/* note that admin also loads these same scripts, but adds additional scripts in a particular order */
		$jsdata = "";
		try {	
			$zver = $this->version;
			/* alternative used during development to force reload every time */
			$zver = date("Y-m-d-H-i-s");
			/* additional materials library available: https://github.com/BabylonJS/Babylon.js/tree/master/dist/materialsLibrary/ */
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_common.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_utilities.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_dynamicscripts.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_login.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_uploads.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_analytics.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_downloads.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_cameras.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_hud.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/avatars/wtw_basicavatars.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/avatars/wtw_addavatarlist.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/avatars/wtw_transitionsavatars.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/avatars/wtw_loadavatar.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/avatars/wtw_avatarfunctions.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/hud/wtw_hud.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_objectdefinitions.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/earcut.js?x=".$zver."\"></script>\r\n";
			/* $jsdata .= "<script src=\"/core/scripts/engine/oimo.js?x=".$zver."\"></script>\r\n"; */
			$jsdata .= "<script src=\"/core/scripts/engine/cannon.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylonjs.loaders.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylonjs.postProcess.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.gui.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylonjs.proceduralTextures.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.materials.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/pep.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/loader.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/meshwriter.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_input.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/actionzones/wtw_basicactionzones.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/actionzones/wtw_addactionzonelist.js?x=".$zver."\"></script>\r\n";			
			$jsdata .= "<script src=\"/core/scripts/actionzones/wtw_actionzonefunctions.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/coverings/wtw_basiccoverings.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/coverings/wtw_addcoveringlist.js?x=".$zver."\"></script>\r\n";		
			$jsdata .= "<script src=\"/core/scripts/molds/wtw_basicmolds.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/molds/wtw_addmoldlist.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/molds/wtw_3dblog.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/automations/wtw_basicautomations.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/automations/wtw_addautomationlist.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/vehicles/wtw_vehicles.js?x=".$zver."\"></script>\r\n";
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
		/* loads the CSS stylesheets */
		global $wtwplugins;
		$cssdata = "";
		try {	
			$cssdata .= "<link rel=\"stylesheet\" type=\"text/css\" href=\"/core/styles/wtw_core.css\" />\r\n";
			$cssdata .= $wtwplugins->getPluginStylesheets('0');
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadCSSBrowseData=".$e->getMessage());
		}
		return $cssdata;
	}
	
	public function loadMainElements() {
		/* these are the main page elements such as canvases and graphic helpers */
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
			$mainelements .= "<div id=\"wtw_ibrowsediv\" class=\"wtw-browsediv\" style=\"display:none;\">\r\n";
			$mainelements .= "	<div id=\"wtw_browseheader\" class=\"wtw-browseheader\">\r\n";
			$mainelements .= "		<div id=\"wtw_browseheaderclose\" class=\"wtw-browseclose\" onclick=\"WTW.closeIFrame();\">\r\n";
			$mainelements .= "			<img src=\"/content/system/images/menuclose.png\" alt=\"Close\" title=\"Close\" onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
			$mainelements .= "		</div>\r\n";
			$mainelements .= "		<div id=\"wtw_browsetitle\"></div>\r\n";
			$mainelements .= "	</div>\r\n";
			$mainelements .= "  <div id=\"wtw_ipagediv\" class=\"wtw-ipagediv\"></div>\r\n";
			$mainelements .= "	<iframe id=\"wtw_ibrowseframe\" class=\"wtw-ibrowseframe\" src=\"/core/pages/loading.php\"></iframe>\r\n";
			$mainelements .= "</div>\r\n";
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadMainElements=".$e->getMessage());
		}
		return $mainelements;
	}
	
	public function loadHiddenFields() {
		/* these are used to pass information to and from the animated canvas and the database */
		$hiddenfields = "";
		global $wtwuser;
		try {
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_serverinstanceid\" value=\"".$this->serverinstanceid."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_serverip\" value=\"".$this->serverip."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tusertoken\" value=\"".$this->usertoken."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tglobaluserid\" value=\"".$this->globaluserid."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tuserid\" value=\"".$wtwuser->userid."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tuserip\" value=\"".$wtwuser->userip."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tdisplayname\" value=\"".addslashes($wtwuser->displayname)."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tuseremail\" value=\"".$wtwuser->email."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tuserimageurl\" value=\"".$wtwuser->userimageurl."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tuseraccess\" value=\"".$wtwuser->useraccess."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tcontentpath\" value=\"".$wtwuser->contentpath."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tuploadpathid\" value=\"".$wtwuser->uploadpathid."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tinstanceid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tglobaluseravatarid\" value=\"\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tuseravatarid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tavatarid\" value=\"\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tavataranimationevent\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tattachavatarmoldname\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldname\" />\r\n";
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
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadHiddenFields=".$e->getMessage());
		}
		return $hiddenfields;
	}
	
}

	function wtw() {
		return wtw::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtw'] = wtw();

	function shutdownOnError() {
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
				$error = "<script type=\"text/javascript\">";
				try {
					/* attempt to show error on page when available */
					$error .= "if (document.getElementById('wtw_error') != null) {";
					$error .= "document.getElementById('wtw_error').innerHTML = '".addslashes(str_replace("Stack trace","<br />Stack trace",$message))."';";
					$error .= "WTW.openFullPageForm('error','Error Found');";
					$error .= "}";
				} catch (Exception $e) { }
				try {
					$conn = new mysqli(wtw_dbserver, wtw_dbusername, base64_decode(wtw_dbpassword), wtw_dbname);
					if ($conn->connect_error) {
						$error .= "console.log('Connection failed: ".str_replace("'","\'",$conn->connect_error)."');";
					} else {
						/* write error to errorlog table */
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
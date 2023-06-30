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
	public $version = '3.7.0';
	public $dbversion = '1.2.22';
	public $versiondate = '2023-6-30';
	public $defaultbabylonversion = 'v6.x.x';
	public $oldversion = '';
	public $olddbversion = '';
	public $serverinstanceid = '';
	public $globaluserid = '';
	public $userid = '';
	public $userip = '';
	public $adminemail = '';
	public $usertoken = '';
	public $rootpath = '';
	public $contentpath = '';
	public $contenturl = '';
	public $protocol = "http://";
	public $domainname = '';
	public $domainurl = '';
	public $websiteurl = '';
	public $serverip = '';
	public $pagename = '';
	public $uri = '';
	public $community = '';
	public $building = '';
	public $thing = '';
	public $communityid = '';
	public $buildingid = '';
	public $thingid = '';
	public $avatarid = '';
	public $webaliasid = '';
	public $defaultlanguage = 'English';
	public $pluginstylesheets = array();
	public $pluginscripts = array();
	public $pluginscriptfunctions = array();
	public $pluginMoldDefs = array();
	public $pluginActionZoneDefs = array();
	public $pluginCoveringDefs = array();
	public $translation = array();
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}

	public function serror($message) {
		/* reports errors and writes them to the database errorlog table */
		$zreturntext = "";
		try {
			$zconn = new mysqli(wtw_dbserver, wtw_dbusername, base64_decode(wtw_dbpassword), wtw_dbname);
			if ($zconn->connect_error) {
				$zreturntext = "Connection failed: " . $zconn->connect_error;
			} else {
				$zsql = "insert into ".wtw_tableprefix."errorlog 
						(message,
						 logdate)
						values
						('".addslashes(str_replace("'","\'",$message))."',
						 '".date('Y-m-d H:i:s')."');";
				try {
					$zconn->query($zsql);
				} catch (Exception $e) { }
				try {
					if ($this->pagename == "admin.php") {
						$zerror = "<script type='text/javascript'>";
						/* $zerror = "console.log('".addslashes($message)."');";
						   $zerror .= "document.getElementById('wtw_error').innerHTML = '".addslashes($message)."';";
						   $zerror .= "WTW.openFullPageForm('error','Error Found');"; */
						$zerror .= "</script>";
						echo $zerror;
					}
				} catch (Exception $e) { }
			}
			$zconn->close();
		} catch (Exception $e) {
			$zreturntext = "core-functions-class_wtw-initsession.php-serror=" . $e->getMessage();
		}
		return $zreturntext;
	}
	
	public function getClientIP(){
		/* returns the current user IP address - also attempts to include IP if server is behind load balancers */
		$zclientip = "";
		try {
			if (array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER)){
				$zclientip =  $_SERVER["HTTP_X_FORWARDED_FOR"];  
			}else if (array_key_exists('REMOTE_ADDR', $_SERVER)) { 
				$zclientip = $_SERVER["REMOTE_ADDR"]; 
			}else if (array_key_exists('HTTP_CLIENT_IP', $_SERVER)) {
				$zclientip = $_SERVER["HTTP_CLIENT_IP"]; 
			} 
		} catch (Exception $e) {}
		return $zclientip; 
	}	

	public function checkHost(){ 
		/* checks for https, traps load balancers from having to fully load a page, and loads the public variables */
		try {
			global $wtwuser;
			/* load class variables */
			$zhost= gethostname();
			/* get server local IP for load balancer check */
			$zserverip = gethostbyname($zhost);
			if (defined('wtw_defaultdomain')) {
				$this->domainname = strtolower(wtw_defaultdomain);
			}
			if ($this->hasValue($_SERVER['HTTP_HOST'])) {
				$this->domainname = strtolower($_SERVER['HTTP_HOST']);
			}
			/* load balancer checking the site - set load balancer to check site by ip address. This will avoid a full page load for health check */
			if ($this->domainname == $zserverip) { 
				echo $zserverip." server is up.";
				exit();
			} 
			/* replace server IP with Public IP */
			$zserverip = gethostbyname($this->domainname);
			$this->serverip = $zserverip;

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
			if ($this->hasValue($zuserip)) {
				$this->userip = $zuserip;
				$wtwuser->userip = $zuserip;
			}
			if ($this->hasValue($_SESSION["wtw_userid"])) {
				$zuserid = $_SESSION["wtw_userid"];
				if ($this->hasValue($zuserid)) {
					$this->userid = $zuserid;
					$wtwuser->userid = $zuserid;
				}
			}
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
			if (defined('wtw_babylonversion') == false) {
				define("wtw_babylonversion", $this->defaultbabylonversion);
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
			$this->serror("core-functions-class_wtw-initsession.php-checkHost=" . $e->getMessage());
		}
	}
	
	public function getDomainInfo() {
		/* parse the URL and check for web aliases, connect files, or handler files */
		try {
			if ($this->hasValue($this->uri)) {
				$this->websiteurl = $this->uri;
				$zroot =  explode('?', $this->uri);
				$zpathdef = explode("/", $zroot[0]);
				if (trim($zpathdef[1]) == "" || trim($zpathdef[1]) == "index.php" || trim($zpathdef[1]) == "admin.php" || trim($zpathdef[1]) == "core" || trim($zpathdef[1]) == "connect" || trim($zpathdef[1]) == "content" || trim($zpathdef[1]) == "config") {
					$this->community = "";
					$this->building = "";
					$this->thing = "";
					$this->websiteurl = $this->domainurl;
					
					if (trim($zpathdef[1]) == "connect") {
						require_once(wtw_rootpath.'/core/functions/class_wtwpluginloader.php');
						global $wtwpluginloader;
						$wtwpluginloader->loadConnectURL();
					} if (trim($zpathdef[1]) == "core") {
						if ($this->hasValue($zpathdef[2])) {
							require_once(wtw_rootpath.'/core/functions/class_wtwpluginloader.php');
							global $wtwpluginloader;
							$wtwpluginloader->loadPathURL(trim($zpathdef[2]));
						}
					}
				} else if (trim($zpathdef[1]) == "community" || trim($zpathdef[1]) == "communities") {
					$this->community = trim($zpathdef[2]);
					$this->building = "";
					$this->thing = "";
					$this->websiteurl = $this->domainurl."/".$this->community;
				} else if (trim($zpathdef[1]) == "building" || trim($zpathdef[1]) == "buildings") {
					$this->community = "";
					$this->building = trim($zpathdef[2]);
					$this->thing = "";
					$this->websiteurl = $this->domainurl."/buildings/".$this->building;
				} else if (trim($zpathdef[1]) == "thing" || trim($zpathdef[1]) == "things") {
					$this->community = "";
					$this->building = "";
					$this->thing = trim($zpathdef[2]);
					$this->websiteurl = $this->domainurl."/things/".$this->thing;
				} else if ($this->hasValue($zpathdef[3])) {
					$this->community = trim($zpathdef[1]);
					$this->building = trim($zpathdef[2]);
					$this->thing = trim($zpathdef[3]);
					$this->websiteurl = $this->domainurl."/".$this->community."/".$this->building."/".$this->thing;
				} else if ($this->hasValue($zpathdef[2])) {
					$this->community = trim($zpathdef[1]);
					$this->building = trim($zpathdef[2]);
					$this->thing = "";
					$this->websiteurl = $this->domainurl."/".$this->community."/".$this->building;
				} else {
					$this->community = trim($zpathdef[1]);
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
	
	public function getVal($zkey, $zdefaultval) {
		/* get querystring information with a default value if not found */
		$zvalue = $zdefaultval;
		try {
			if ($this->hasValue($_GET[$zkey])) {
				$zvalue = $_GET[$zkey];
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-getval=".$e->getMessage());
		}
		return $zvalue;
	}
	
	public function getNumber($zkey, $zdefaultval) {
		/* get querystring number information with a default value if not found */
		$zvalue = $zdefaultval;
		try {
			if ($this->hasValue($_GET[$zkey])) {
				if (is_numeric($_GET[$zkey])) {
					$zvalue = $_GET[$zkey];
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-getNumber=".$e->getMessage());
		}
		return $zvalue;
	}
	
	public function checkValue(&$zvalue, $zdefaultval = null) {
		try {
			if (!isset($zvalue) || empty($zvalue)) {
				if (!isset($zdefaultval)) {
					$zvalue = false;
				} else {
					$zvalue = $zdefaultval;
				}
			} else {
				$zvalue = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-checkValue=".$e->getMessage());
		}
		return $zvalue;
	}

	public function hasValue(&$zvalue) {
		$zresponse = false;
		try {
			if (isset($zvalue) && !empty($zvalue)) {
				$zresponse = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-hasValue=".$e->getMessage());
		}
		return $zresponse;
	}

	public function checkNumber($zval, $zdefaultval) {
		/* number validation function with fallback value */
		$zcheckval = $zdefaultval;
		try {
			if (isset($zval)) {
				$zval = str_replace(",","",str_replace(" ","",str_replace("$","", $zval)));
				if (is_numeric($zval)) {
					$zcheckval = $zval;
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-checkNumber=".$e->getMessage());
		}
		return $zcheckval;
	}

	public function escapeHTML($ztext) {
		/* text validation function that handles special characters */
		$zchecktext = "";
		try {
			if ($this->hasValue($ztext)) {
				$zchecktext = htmlspecialchars($ztext, ENT_QUOTES, 'UTF-8');
			}
		} catch (Exception $e) {
			$this->$serrorText = "core-functions-class_wtw-initsession.php-escapeHTML=" . $e->getMessage();
		}
		return $zchecktext;
	}	
	
	public function getRandomString($zlength, $zstringtype) {
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

	public function verifyFolderExists($zfolder) {
		/* verify if folder exists, create if not */
		$zexists = false;
		try {
			if (!file_exists($zfolder)) {
				umask(0);
				mkdir($zfolder, octdec(wtw_chmod), true);
				chmod($zfolder, octdec(wtw_chmod));
				if (defined('wtw_umask')) {
					/* reset umask */
					if (wtw_umask != '0') {
						umask(octdec(wtw_umask));
					}
				}
				$zexists = true;
			} else {
				$zexists = true;
			}
		} catch (Exception $e) {
			$this->$serrorText = "core-functions-class_wtwdb.php-verifyFolderExists=" . $e->getMessage();
		}
		return $zexists;
	}	
	
	public function mergeFiles($zbasefilepath, $zfileadditionspath) {
		/* check line per line in the base file for the line additions and add as needed */
		$zchanged = false;
		try {
			/* load array with file addition lines */
			$zaddlines = array();
			$zbaselines = array();
			$zfileadditions = fopen($zfileadditionspath, "r");
			if ($zfileadditions) {
				$i = 0;
				while (($zaddnewline = fgets($zfileadditions, 4096)) !== false) {
					$zaddlines[$i] = $zaddnewline;
					$i += 1;
				}
				fclose($zfileadditions);
			}
			$zbasefile = fopen($zbasefilepath, "r");
			if ($zbasefile) {
				$i = 0;
				while (($zbaseline = fgets($zbasefile, 4096)) !== false) {
					$zbaselines[$i] = $zbaseline;
					$i += 1;
				}
				fclose($zbasefile);
			}
			/* open each line */
			foreach ($zaddlines as $zaddline) {
				$zaddline = trim($zaddline);
				if (strlen($zaddline) > 0) {
					/* open base file and check line per line */
					$zbasefile = fopen($zbasefilepath, "r");
					$zfound = false;
					if ($zbasefile) {
						while (($zbaseline = fgets($zbasefile, 4096)) !== false) {
							$zbaseline = trim($zbaseline);
							if (strlen($zbaseline) > 0) {
								if ($zaddline == $zbaseline) {
									/* add line found in base file */
									$zfound = true;
								}
							}
						}
						fclose($zbasefile);
					}
					if ($zfound == false) {
						/* line not found */
						/* set zchanged to true to allow a page refresh after the new settings are in place */
						$zchanged = true;
						/* add line not found in base file, add the line */
						if ($zbaselines[$i-1] == '# END WalkTheWeb') {
							$zbaselines[$i-1] = $zaddline;
							$zbaselines[$i] = '# END WalkTheWeb';
						} else {
							$zbaselines[$i] = $zaddline;
						}
						$i += 1;
						
						$zbasefile = fopen($zbasefilepath,'wb');
						foreach ($zbaselines as $zbaseline) {
							$zbaseline = preg_replace("/\r\n|\r|\n/", "", $zbaseline);
							fwrite($zbasefile, $zbaseline."\r\n");
						}
						fclose($zbasefile);
						umask(0);
						chmod($zbasefilepath, octdec(wtw_chmod));
						if (defined('wtw_umask')) {
							/* reset umask */
							if (wtw_umask != '0') {
								umask(octdec(wtw_umask));
							}
						}
					}
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-mergeFiles=".$e->getMessage());
		}
		return $zchanged;
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
					$this->verifyFolderExists(wtw_rootpath.'/config');
					$zserver = $_POST["wtw_dbserver"];
					$zdatabase = $_POST["wtw_dbname"];
					$zdbuser = $_POST["wtw_dbusername"];
					$zdbpassword = $_POST["wtw_dbpassword"];
					$zprefix = $_POST["wtw_tableprefix"];
					$zcontentpath = wtw_rootpath."/content";
					$zcontenturl = "/content";
					$zdomainname = "";
					if ($this->hasValue($_SERVER['HTTP_HOST'])) {
						$zdomainname = strtolower($_SERVER['HTTP_HOST']);
					}
					if (!file_exists(wtw_rootpath.'/config/wtw_config.php')) {
						/* create config text file /config/wtw_config.php if it does not exist */
						/* set global variable values */
						define("wtw_serverinstanceid", $this->serverinstanceid);
						define("wtw_dbserver", $zserver);
						define("wtw_dbname", $zdatabase);
						define("wtw_dbusername", $zdbuser);
						define("wtw_dbpassword", base64_encode($zdbpassword));
						define("wtw_tableprefix", $zprefix);
						define("wtw_devmode", "1");
						define("wtw_contentpath", $zcontentpath);
						define("wtw_contenturl", $zcontenturl);
						define("wtw_defaultdomain", $zdomainname);
						$this->contentpath = $zcontentpath;
						$this->contenturl = $this->domainurl.$zcontenturl;
						/* write global variable values to text file - will be used on page load after it is found */
						$zfile = fopen(wtw_rootpath.'/config/wtw_config.php','wb');
						fwrite($zfile,"<?php\r\n");
						fwrite($zfile,"    define(\"wtw_serverinstanceid\", \"".$this->serverinstanceid."\");\r\n");
						fwrite($zfile,"    define(\"wtw_dbserver\", \"".$zserver."\");\r\n");
						fwrite($zfile,"    define(\"wtw_dbname\", \"".$zdatabase."\");\r\n");
						fwrite($zfile,"    define(\"wtw_dbusername\", \"".$zdbuser."\");\r\n");
						fwrite($zfile,"    define(\"wtw_dbpassword\", \"".base64_encode($zdbpassword)."\");\r\n");
						fwrite($zfile,"    define(\"wtw_tableprefix\", \"".$zprefix."\");\r\n\r\n");
						fwrite($zfile,"    define(\"wtw_devmode\", \"1\");\r\n\r\n");
						fwrite($zfile,"    define(\"wtw_contentpath\", \"".$zcontentpath."\");\r\n");
						fwrite($zfile,"    define(\"wtw_contenturl\", \"".$zcontenturl."\");\r\n\r\n");
						fwrite($zfile,"    define(\"wtw_defaultdomain\", \"".$zdomainname."\");\r\n\r\n");
						fwrite($zfile,"?>");
						fclose($zfile);
						umask(0);
						chmod(wtw_rootpath.'/config/wtw_config.php', octdec(wtw_chmod));
						if (defined('wtw_umask')) {
							/* reset umask */
							if (wtw_umask != '0') {
								umask(octdec(wtw_umask));
							}
						}
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
					$zlines = file(wtw_rootpath.'/config/wtw_config.php');
					$zlast = sizeof($zlines) - 1 ; 
					unset($zlines[$zlast]); 
					$zfile = fopen(wtw_rootpath."/config/wtw_config.php","wb");
					fwrite($zfile, implode('', $zlines));
					fwrite($zfile,"    define(\"wtw_serverinstanceid\", \"".$this->serverinstanceid."\");\r\n");
					fwrite($zfile,"?>");
					fclose($zfile);
					umask(0);
					chmod(wtw_rootpath.'/config/wtw_config.php', octdec(wtw_chmod));
					if (defined('wtw_umask')) {
						/* reset umask */
						if (wtw_umask != '0') {
							umask(octdec(wtw_umask));
						}
					}
				}
			}
			/* create .htaccess file from htaccess file template if it does not exist - IIS and NginX will ignore it */
			if (!file_exists(wtw_rootpath.'/.htaccess')) {
				copy(wtw_rootpath.'/htaccess', wtw_rootpath.'/.htaccess');
				umask(0);
				chmod(wtw_rootpath.'/.htaccess', octdec(wtw_chmod));
				if (defined('wtw_umask')) {
					/* reset umask */
					if (wtw_umask != '0') {
						umask(octdec(wtw_umask));
					}
				}
				/* refresh page with new file in place */
				header("Location: ".$this->domainurl."/"); 
				exit();
			} else {
				if ($this->mergeFiles(wtw_rootpath.'/.htaccess', wtw_rootpath.'/htaccess')) {
					/* if change happened, refresh page */
					header("Location: ".$this->domainurl."/"); 
					exit();
				}
			}
			/* if using plain text password - convert plain text password to encoded password */
			if (defined('wtw_dbserver') && defined('wtw_dbname') && defined('wtw_dbusername') && defined('wtw_dbpassword')) {
				$zupdatepassword = false;
				/* check if password looks like it is encoded */
				if (base64_decode(wtw_dbpassword, true) !== false) {
					/* try to make a connection with decoded password */
					$zconn = new mysqli(wtw_dbserver, wtw_dbusername, base64_decode(wtw_dbpassword), wtw_dbname);
					if ($zconn->connect_error) {
						/* connection did not work, try connection without decoding */
						$zconn = new mysqli(wtw_dbserver, wtw_dbusername, wtw_dbpassword, wtw_dbname);
						if ($zconn->connect_error == false) {
							/* connection worked, now encode password */
							$zupdatepassword = true;
						}
					} 
				} else {
					/* connection did not work, try connection without decoding */
					$zconn = new mysqli(wtw_dbserver, wtw_dbusername, wtw_dbpassword, wtw_dbname);
					if ($zconn->connect_error == false) {
						/* connection worked, now encode password */
						$zupdatepassword = true;
					}
				}
				if ($zupdatepassword == true) {
					/* update password with encoded password */
					$zlines = file(wtw_rootpath.'/config/wtw_config.php');
					$zfile = fopen(wtw_rootpath."/config/wtw_config.php","wb");
					foreach ($zlines as $zline) {
						if (strpos($zline, 'wtw_dbpassword') !== false) {
							fwrite($zfile, "    define(\"wtw_dbpassword\", \"".base64_encode(wtw_dbpassword)."\");\r\n");
						} else if (strpos($zline, 'wtw_defaultfromemail') !== false) {
							fwrite($zfile, str_replace("wtw_defaultfromemail","wtw_adminemail",$zline));
						} else {
							fwrite($zfile, $zline);
						}
					}
					fclose($zfile);
					umask(0);
					chmod(wtw_rootpath.'/config/wtw_config.php', octdec(wtw_chmod));
					if (defined('wtw_umask')) {
						/* reset umask */
						if (wtw_umask != '0') {
							umask(octdec(wtw_umask));
						}
					}
					header("Location: ".$this->domainurl."/"); 
					exit();
				}
			}
			if ($zsetupstep == 0) {
				/* database check */
				require_once(wtw_rootpath.'/core/functions/class_wtwdb.php');
				require_once(wtw_rootpath.'/core/functions/class_wtwusers.php');
				require_once(wtw_rootpath.'/core/functions/class_wtwpluginloader.php');
				$zconn = new mysqli(wtw_dbserver, wtw_dbusername, base64_decode(wtw_dbpassword), wtw_dbname);
				if ($zconn->connect_error) {
					$zsetupstep = 2;
				} else {
					/* setup database if it does not exist */
					$zsetupstep = 3; /* check if tables exist... using prefix ... 3 == not... */
					$zsql = "show tables like '".wtw_tableprefix."webimages';";
					$zresults = $zconn->query($zsql);
					if (is_object($zresults)) {
						if ($zresults->num_rows > 0) {
							$zsetupstep = 0;
						}
					} 
				}
				$zconn->close();
				if ($zsetupstep == 3) { /* check for new install... previous Install with different prefix */
					global $wtwdb;
					$zresults = $wtwdb->query("select count(*) as scount 
						from information_schema.tables 
						where table_schema = '".wtw_dbname."';");
					foreach ($zresults as $zrow) {
						if ($this->hasValue($zrow['scount'])) {
							if ($zrow['scount'] > 0) {
								$zsetupstep = 4; /* found another install in database */
							}
						}
					}
					$zconfirm = "";
					if ($zsetupstep == 4 && $_SERVER['REQUEST_METHOD']=='POST') {
						try {
							$zconfirm = $_POST["wtw_tconfirm"];
						} catch (Exception $e){}
					}
					if ($zsetupstep == 3 || ($zconfirm == "YES" && $zsetupstep == 4)) {
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
					$zversion = $wtwdb->getSetting("wtw_version","3.4.5");
					$this->oldversion = $zversion;
					$zdbversion = $wtwdb->getSetting("wtw_dbversion","1.2.5");
					$this->olddbversion = $zdbversion;
					if ($zdbversion != $this->dbversion) {
						require_once(wtw_rootpath.'/core/functions/class_wtwtables.php');
						global $wtwtables;
						/* run dbversion table updates */
						$wtwtables->databaseTableDefinitions();
						/* run data updates and additions */
						$wtwtables->checkDBVersionData($this->userid);
						$this->olddbversion = $this->dbversion;
					}
					if ($zversion != $this->version) {
						/* add any code required in version update */
						$wtwdb->saveSetting("wtw_version", $this->version);
						$this->oldversion = $this->version;
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
					if ($this->hasValue($this->userid)) {
						global $wtwuser;
						$zresults = $wtwdb->query("select * 
							from ".wtw_tableprefix."users 
							where userid='".$this->userid."'
								and deleted=0
							limit 1;");
						foreach ($zresults as $zrow) {
							/* set basic current user information - if it exists */
							$wtwuser->email = $zrow["email"];
							$wtwuser->displayname = $zrow["displayname"];
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
						$zpreloaded = $_POST["wtw_installmethod"];
						$zadmindisplayname = base64_encode($_POST["wtw_tadmindisplayname"]);
						$zadminpassword = $_POST["wtw_tadminpassword"];
						$zadminpassword2 = $_POST["wtw_tadminpassword2"];
						$zadminemail = $_POST["wtw_tadminemail"];
						
						/* write analytics and default email/sitename to config file */
						if (file_exists(wtw_rootpath.'/config/wtw_config.php') && !defined('wtw_defaultsitename')) {
							$zlines = file(wtw_rootpath.'/config/wtw_config.php');
							$zlast = sizeof($zlines) - 1 ; 
							unset($zlines[$zlast]); 
							$zfile = fopen(wtw_rootpath."/config/wtw_config.php","wb");
							fwrite($zfile, implode('', $zlines));
							fwrite($zfile,"    define(\"wtw_defaultsitename\", \"".$zsitename."\");\r\n");
							fwrite($zfile,"    define(\"wtw_googleanalytics\", \"".$zanalytics."\");\r\n");
							fwrite($zfile,"    define(\"wtw_adminemail\", \"".$zadminemail."\");\r\n");
							fwrite($zfile,"?>");
							fclose($zfile);
							umask(0);
							chmod(wtw_rootpath.'/config/wtw_config.php', octdec(wtw_chmod));
							if (defined('wtw_umask')) {
								/* reset umask */
								if (wtw_umask != '0') {
									umask(octdec(wtw_umask));
								}
							}
						}
						/* set up initial admin user - from installation process */
						$zuserid = $wtwusers->firstAdminUser($zadmindisplayname,$zadminpassword,$zadminemail);
						$zversion = $wtwdb->getSetting("wtw_version","3.4.5");
						$this->oldversion = $zversion;
						/* load initial tables form install */
						$wtwtables->loadInitDbData($zuserid, $zpreloaded);
						if ($zpreloaded == 'default') {
							$wtwtables->loadInitBuildingCommunity($this->domainname, $this->protocol, $zuserid);
						}
						/* set user as admin role */
						$wtwusers->addUserRole($zuserid, 'Admin');
						header("Location: ".$this->domainurl."/"); 
						exit();
					} catch (Exception $e){}
				}
			}
			$zbuildingid = '';
			$zcommunityid = '';
			$zbuildingpositionx = '0';
			$zbuildingpositiony = '0';
			$zbuildingpositionz = '0';
			$zbuildingscalingx = '1';
			$zbuildingscalingy = '1';
			$zbuildingscalingz = '1';
			$zbuildingrotationx = '0';
			$zbuildingrotationy = '0';
			$zbuildingrotationz = '0';
			if ($zsetupstep == 0) {
				/* check if first 3D Building is created */
				global $wtwdb;
				$zcount = 0;
				$zresults = $wtwdb->query("select t1.*, 
						t2.scount 
					from ".wtw_tableprefix."buildings t1
						left join (select count(*) as scount  from ".wtw_tableprefix."buildings) t2
						on 1=1
					where t1.downloadparentwebid=''
					order by t1.createdate
					limit 1;");
				foreach ($zresults as $zrow) {
					$zcount = $zrow["scount"];
					$zbuildingid = $zrow["buildingid"];
				}
				if ($zcount == 0) {
					if (!isset($_SESSION["wtw_userid"]) || empty($_SESSION["wtw_userid"])) {
						/* if not logged in - log in admin user */
						$zsetupstep = 5;
						if ($_SERVER['REQUEST_METHOD']=='POST') {
							global $wtwusers;
							$zadminemail = base64_encode($_POST["wtw_tadminemail"]);
							$zadminpassword = base64_encode($_POST["wtw_tadminpassword"]);
							$zuser = $wtwusers->loginAttempt($zadminemail,$zadminpassword);
							if ($this->hasValue($_SESSION["wtw_userid"])) {
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
				/* check if first 3D Community is created */
				global $wtwdb;
				$scount = 0;
				$zresults = $wtwdb->query("select t1.*, 
						t2.scount 
					from ".wtw_tableprefix."communities t1
						left join (select count(*) as scount  from ".wtw_tableprefix."communities) t2
						on 1=1
					order by t1.createdate
					limit 1;");
				foreach ($zresults as $zrow) {
					$scount = $zrow["scount"];
					$zcommunityid = $zrow["communityid"];
					$zbuildingpositionx = $zrow["buildingpositionx"];
					$zbuildingpositiony = $zrow["buildingpositiony"];
					$zbuildingpositionz = $zrow["buildingpositionz"];
					$zbuildingscalingx = $zrow["buildingscalingx"];
					$zbuildingscalingy = $zrow["buildingscalingy"];
					$zbuildingscalingz = $zrow["buildingscalingz"];
					$zbuildingrotationx = $zrow["buildingrotationx"];
					$zbuildingrotationy = $zrow["buildingrotationy"];
					$zbuildingrotationz = $zrow["buildingrotationz"];
					/* check for connecting grid of first community and first building */
					if ($this->hasValue($zcommunityid) && $this->hasValue($zbuildingid)) {
						$zresultsconnectinggrid = $wtwdb->query("
							select * from ".wtw_tableprefix."connectinggrids
							where parentwebid='".$zcommunityid."'
								and parentwebtype='community'
								and childwebid='".$zbuildingid."'
								and childwebtype='building';");
						if (count($zresultsconnectinggrid) == 0) {
							$zconnectinggridid = $wtwdb->getRandomString(16,1);
							$wtwdb->query("
								insert into ".wtw_tableprefix."connectinggrids
								   (connectinggridid,
									parentwebid,
									parentwebtype,
									childwebid,
									childwebtype,
									positionx,
									positiony,
									positionz,
									scalingx,
									scalingy,
									scalingz,
									rotationx,
									rotationy,
									rotationz,
									createdate,
									createuserid,
									updatedate,
									updateuserid)
								   values
								   ('".$zconnectinggridid."',
									'".$zcommunityid."',
									'community',
									'".$zbuildingid."',
									'building',
									".$zbuildingpositionx.",
									".$zbuildingpositiony.",
									".$zbuildingpositionz.",
									".$zbuildingscalingx.",
									".$zbuildingscalingy.",
									".$zbuildingscalingz.",
									".$zbuildingrotationx.",
									".$zbuildingrotationy.",
									".$zbuildingrotationz.",
									now(),
									'".$this->userid."',
									now(),
									'".$this->userid."');");
						}
					}
					/* add web alias */
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
					if (!isset($_SESSION["wtw_userid"]) || empty($_SESSION["wtw_userid"])) {
						/* if not logged in - log in admin user */
						$zsetupstep = 5;
						if ($_SERVER['REQUEST_METHOD']=='POST') {
							global $wtwusers;
							$zadminemail = base64_encode($_POST["wtw_tadminemail"]);
							$zadminpassword = base64_encode($_POST["wtw_tadminpassword"]);
							$zuser = $wtwusers->loginAttempt($zadminemail,$zadminpassword);
							if ($this->hasValue($_SESSION["wtw_userid"])) {
								$zsetupstep = 0;
							}
						}
					}
					if ($zsetupstep == 0) { 
						$zsetupstep = 7;
					}
				} else {
					/* check for settings optional services offered - once */
					$zoptservices = $wtwdb->getSetting("OptionalServicesOffered", null);
					if (empty($zoptservices)) {
						$zsetupstep = 8;
					}
				}
			} 

			/* load translation files */
			if (defined("wtw_defaultlanguage")) {
				$this->defaultlanguage = wtw_defaultlanguage;
			}
			if (defined("wtw_adminemail")) {
				$this->adminemail = wtw_adminemail;
			}
			$this->loadTranslationArray();

			/* setup process steps - display webpages */
			switch ($zsetupstep) {
				case 1: /* Need to set up Database Login */
					echo "<!DOCTYPE html><html><head><title>WalkTheWeb Setup</title>";
					echo "<link rel='stylesheet' type='text/css' href='/core/styles/wtw_install.css' /></head>";
					echo "<body class='wtw-body'><form id='wtw_form1' action='' method='post'>";
					echo "<div class='wtw-fullwidth'><br /><div class='wtw-narrowpage'>";
					echo "<img src='/content/system/images/wtw-multiverse-logo-1024.png' class='wtw-logoimage' />";
					
					echo "<h2 class='wtw-login'>Database Setup</h2>";
					echo "<div class='wtw-label'><b>Server:</b></div>";
					echo "<input name='wtw_dbserver' type='text' value='127.0.0.1:3306' size='20' maxlength='255' class='wtw-textbox' />";
					echo "<div class='wtw-clearspace'></div>";
					echo "<div class='wtw-label'><b>Database Name:</b></div>";
					echo "<input name='wtw_dbname' type='text' value='' size='20' maxlength='255' class='wtw-textbox' />";
					echo "<div class='wtw-clearspace'></div>";
					echo "<div class='wtw-label'><b>Database User:</b></div>";
					echo "<input name='wtw_dbusername' type='text' value='' size='20' maxlength='255' class='wtw-textbox' />";
					echo "<div class='wtw-clearspace'></div>";
					echo "<div class='wtw-label'><b>Database Password:</b></div>";
					echo "<input name='wtw_dbpassword' type='password' value='' size='20' maxlength='64' class='wtw-textbox' />";
					echo "<div class='wtw-clearspace'></div>";
					echo "<div class='wtw-label'><b>Table Prefix:</b></div>";
					echo "<input name='wtw_tableprefix' type='text' value='wtw_' size='20' maxlength='24' class='wtw-textbox' />";
					echo "<div class='wtw-clearspace'></div>";
					echo "<div class='wtw-icenter'><input name='wtw_bsave' class='wtw-button' type='submit' value='Save and Continue' /></div>";
					echo "<div class='wtw-clearspace'></div>";
					echo "</div><br /></div><br /></form></body></html>";
					die;
					break;
				case 2: /* error in connection to database */
					echo "<!DOCTYPE html><html><head><title>WalkTheWeb Setup</title>";
					echo "<link rel='stylesheet' type='text/css' href='/core/styles/wtw_install.css' /></head>";
					echo "<body class='wtw-body'><form id='wtw_form1' action='' method='post'>";
					echo "<div class='wtw-fullwidth'><br /><div class='wtw-narrowpage'>";
					echo "<img src='/content/system/images/wtw-multiverse-logo-1024.png' class='wtw-logoimage' />";
					
					echo "<h2 class='wtw-login'>Database Connection Error</h2>";
					echo "<div class='wtw-lightblock'><b>Edit your config file:</b><br /><br /><div class='wtw-indent'>";
					echo "/config/wtw_config.php<br /><br /><br /></div>";
					echo "<b>Confirm the following lines exist:</b><br /><br /><div class='wtw-indent'>";
					echo "define(\"wtw_dbserver\", \"YourServer\");<br />";
					echo "define(\"wtw_dbname\", \"YourDatabase\");<br />";
					echo "define(\"wtw_dbusername\", \"YourDbUser\");<br />";
					echo "define(\"wtw_dbpassword\", \"YourDbPassword\");<br />";
					echo "define(\"wtw_tableprefix\", \"YourTablePrefix\");<br /><br />";
					echo "define(\"wtw_contentpath\", \"YourContentPath\");<br />";
					echo "define(\"wtw_contenturl\", \"YourContentUrl\");<br /><br /><br />";
					echo "</div></div><div class='wtw-icenter'><input name='wtw_bsave' type='submit' value='Retry'  class='wtw-button' /></div>";
					echo "<br /></div><br /></div><br /></form></body></html>";
					die;
					break;
				case 3: /* new install - empty database */
					echo "<!DOCTYPE html><html><head><title>WalkTheWeb Setup</title>";
					echo "<link rel='stylesheet' type='text/css' href='/core/styles/wtw_install.css' /></head>";
					echo "<body class='wtw-body'><form id='wtw_form1' action='' method='post'><div class='wtw-fullwidth'><br /><div class='wtw-narrowpage'>";
					echo "<img src='/content/system/images/wtw-multiverse-logo-1024.png' class='wtw-logoimage' />";

					echo "<h2 class='wtw-login'>Admin Account</h2>";
					echo "<div class='wtw-label'><b>Admin Email:</b></div>";
					echo "<input name='wtw_tadminemail' type='text' value='' size='20' maxlength='255' autocomplete='email' class='wtw-textbox' />";
					echo "<div class='wtw-clearspace'></div>";
					echo "<div class='wtw-label'><b>Admin Password:</b></div>";
					echo "<input name='wtw_tadminpassword' type='password' value='' size='20' maxlength='24' autocomplete='new-password' class='wtw-textbox' />";
					echo "<div class='wtw-clearspace'></div>";
					echo "<div class='wtw-label'><b>Confirm Password:</b></div>";
					echo "<input name='wtw_tadminpassword2' type='password' value='' size='20' maxlength='24' autocomplete='new-password' class='wtw-textbox' />";
					echo "<div class='wtw-clearspace'></div>";
					echo "<div class='wtw-label'><b>Admin Display Name:</b></div>";
					echo "<input name='wtw_tadmindisplayname' type='text' value='' size='20' maxlength='255' autocomplete='nickname' class='wtw-textbox' />";
					echo "<div class='wtw-clearspace'></div>";

					echo "<h2 class='wtw-login'>Site Settings</h2>";
					echo "<div class='wtw-label'><b>Site Name:</b></div>";
					echo "<input name='wtw_tsitename' type='text' value='My 3D Website' size='20' maxlength='255' class='wtw-textbox' />";
					echo "<div class='wtw-clearspace'></div>";
					echo "<div class='wtw-label'><b>Google Analytics (Optional):</b></div>";
					echo "<input name='wtw_googleanalytics' type='text' value='' size='20' maxlength='24' class='wtw-textbox' />";
					echo "<div class='wtw-clearspace'></div>";
					echo "<div class='wtw-label'><b>Install Method:</b></div>";
					echo "<div class='wtw-clearspace'></div>";
					echo "<input name='wtw_installmethod' id='wtw_installmethodpreloaded' type='radio' value='default' class='wtw-textbox' checked /> <span class='wtw-whitetext'>Default - Use preloaded 3D Building and 3D Community.</span><br />";
					echo "<div class='wtw-whitetext' style='margin-left:100px;'>(no download required).</div><br /><br />";
					echo "<input name='wtw_installmethod' id='wtw_installmethoddefault' type='radio' value='custom' class='wtw-textbox' /> <span class='wtw-whitetext'>Custom - Select 3D Building and 3D Community to download.</span><br /><br />";
					echo "<div class='wtw-clearspace'></div>";
					echo "<div class='wtw-icenter'><input name='wtw_bsave' type='submit' value='Save and Continue' class='wtw-button' /></div>";
					echo "<br /></div><br /></div><br /></form></body></html>";
					die;
					break;
				case 4: /* found another install - confirm add new tables */
					echo "<!DOCTYPE html><html><head><title>WalkTheWeb Setup</title>";
					echo "<link rel='stylesheet' type='text/css' href='/core/styles/wtw_install.css' />";
					echo "<script src='/core/scripts/prime/wtw_install.js'></script></head>";
					echo "<body class='wtw-body'><form id='wtw_form1' action='' method='post'>";
					echo "<div class='wtw-fullwidth'><br /><div class='wtw-narrowpage'>";
					echo "<img src='/content/system/images/wtw-multiverse-logo-1024.png' class='wtw-logoimage' />";

					echo "<h2 class='wtw-login'>Found Another Install</h2>";
					echo "<div class='wtw-lightblock'><b>Edit your config file:</b><br /><br /><div class='wtw-indent'>";
					echo "/config/wtw_config.php<br /><br /><br /></div>";
					echo "<b>Confirm the following line:</b><br /><br /><div class='wtw-indent'>";
					echo "define(\"wtw_tableprefix\", \"YourTablePrefix\");<br /><br /><br />";
					echo "<b>OR</b><br /><br /><span class='wtw-error'>CONFIRM you wish to add new tables to this database.</span><br /><br /><br />";
					echo "<input id='wtw_tconfirm' name='wtw_tconfirm' type='hidden' value='' />";
					echo "</div></div><div class='wtw-icenter'><input name='wtw_bconfirmsubmit' type='submit' value='Confirm and Continue'  class='wtw-button' onclick=\"dGet('wtw_tconfirm').value='YES';\" /></div>";
					echo "<br /></div><br /></div><br /></form></body></html>";
					die;
					break;
				case 5: /* user not logged in - Admin login screen */
					echo "<!DOCTYPE html><html><head><title>WalkTheWeb Setup</title>";
					echo "<link rel='stylesheet' type='text/css' href='/core/styles/wtw_install.css' /></head>";
					echo "<body class='wtw-body'><form id='wtw_form1' action='' method='post'>";
					echo "<div class='wtw-fullwidth'><br /><div class='wtw-narrowpage'>";
					echo "<img src='/content/system/images/wtw-multiverse-logo-1024.png' class='wtw-logoimage' />";

					echo "<h2 class='wtw-login'>Admin Login</h2>";
					echo "<div class='wtw-label'><b>Admin Email:</b></div>";
					echo "<input name='wtw_tadminemail' type='text' value='' size='20' maxlength='255' autocomplete='email' class='wtw-textbox' />";
					echo "<div class='wtw-clearspace'></div>";
					echo "<div class='wtw-label'><b>Admin Password:</b></div>";
					echo "<input name='wtw_tadminpassword' type='password' value='' size='20' maxlength='24' autocomplete='current-password' class='wtw-textbox' />";
					echo "<div class='wtw-clearspace'></div>";

					echo "<div class='wtw-icenter'><input name='wtw_blogin' type='submit' value='Login'  class='wtw-button' /></div>";
					echo "<br /></div><br /></div><br /></form></body></html>";
					die;					
					break;
				case 6: /* select Your 3D Building */
					echo "<!DOCTYPE html><html><head><title>WalkTheWeb Setup</title>";
					echo "<link rel='stylesheet' type='text/css' href='/core/styles/wtw_install.css' />";
					echo "<script>var wtw_domainname = '".$this->domainname."';";
					echo "function WTW_3DINTERNET() {this.install = true;}";
					echo "var wtw3dinternet = new WTW_3DINTERNET();</script>";
					echo "<script src='/core/scripts/prime/wtw_install.js'></script>";
					echo "<script src='/content/plugins/wtw-3dinternet/scripts/downloads.js'></script>";
					echo "</head><body class='wtw-body'><form id='wtw_form1' action='' method='post'>";
					echo "<div class='wtw-fullwidth'><br /><div class='wtw-widepage'>";
					echo "<img src='/content/system/images/wtw-multiverse-logo-1024.png' class='wtw-logoimage' />";
					echo "<input type='hidden' id='wtw_serverinstanceid' value='".$this->serverinstanceid."' />";
					echo "<input type='hidden' id='wtw_downloadstcols' value='2' />";

					echo "<div id='wtw_selectwebform' class='wtw-searchform'>";
					echo "<h2 class='wtw-login'>Select Your First 3D Building</h2>";
					
					echo "<div class='wtw-searchdiv'>";
					echo "<div class='wtw-colicons'>";
					echo "<img id='wtw_downloadscol1' src='/content/system/images/col1.png' alt='1 Column' title='1 Column' class='wtw-tinyimg' onclick='wtw3dinternet.updateCols(this, 1);' />";
					echo "<img id='wtw_downloadscol2' src='/content/system/images/col2set.png' alt='2 Columns' title='2 Columns' class='wtw-tinyimgselected' onclick='wtw3dinternet.updateCols(this, 2);' />";
					echo "<img id='wtw_downloadscol3' src='/content/system/images/col3.png' alt='3 Columns' title='3 Columns' class='wtw-tinyimg' onclick='wtw3dinternet.updateCols(this, 3);' />";
					echo "<img id='wtw_downloadscol4' src='/content/system/images/col4.png' alt='4 Columns' title='4 Columns' class='wtw-tinyimg' onclick='wtw3dinternet.updateCols(this, 4);' />";
					echo "</div>";
					echo "</div>";
					echo "<div class='wtw-searcharea'>";
					echo "<div><div class='wtw-searchlabel'>Search:</div>";
					echo "<input name='wtw_bbuildingsearch' type='button' value='Search' onclick=\"wtw3dinternet.buildingSearch(dGet('wtw_tbuildingsearch').value);\" class='wtw-searchbutton' />";
					echo "<input id='wtw_tbuildingsearch' name='wtw_tbuildingsearch' type='text' value='' size='20' maxlength='255' class='wtw-textbox' /></div>";
					echo "</div><div class='wtw-clearspace'></div>";
					echo "<div id='wtw_downloadingnotice' class='wtw-hide'></div>";

					echo "<br /><hr /><div id='wtw_buildtempsearchresults' class='wtw-indentmore'></div>";
					echo "</div></div><br /></div><br /></form>";
					echo "<script>";
					echo "wtw3dinternet.buildingSearch('');";
					echo "</script></body></html>";
					die;
					break;
				case 7: /* select Your 3D Community */
					echo "<!DOCTYPE html><html><head><title>WalkTheWeb Setup</title>";
					echo "<link rel='stylesheet' type='text/css' href='/core/styles/wtw_install.css' />";
					echo "<script>var wtw_domainname = '".$this->domainname."';";
					echo "function WTW_3DINTERNET() {this.install = true;}";
					echo "var wtw3dinternet = new WTW_3DINTERNET();</script>";
					echo "<script src='/core/scripts/prime/wtw_install.js'></script>";
					echo "<script src='/content/plugins/wtw-3dinternet/scripts/downloads.js'></script>";
					echo "</head><body class='wtw-body'><form id='wtw_form1' action='' method='post'>";
					echo "<div class='wtw-fullwidth'><br /><div class='wtw-widepage'>";
					echo "<img src='/content/system/images/wtw-multiverse-logo-1024.png' class='wtw-logoimage' />";
					echo "<input type='hidden' id='wtw_serverinstanceid' value='".$this->serverinstanceid."' />";
					echo "<input type='hidden' id='wtw_tbuildingid' value='".$zbuildingid."' />";
					echo "<input type='hidden' id='wtw_tcommunityid' value='".$zcommunityid."' />";
					echo "<input type='hidden' id='wtw_downloadstcols' value='2' />";
					
					echo "<div id='wtw_selectwebform' class='wtw-searchform'>";
					echo "<h2 class='wtw-login'>Select Your First 3D Community Scene</h2>";

					echo "<div class='wtw-searchdiv'>";
					echo "<div class='wtw-colicons'>";
					echo "<img id='wtw_downloadscol1' src='/content/system/images/col1.png' alt='1 Column' title='1 Column' class='wtw-tinyimg' onclick='wtw3dinternet.updateCols(this, 1);' />";
					echo "<img id='wtw_downloadscol2' src='/content/system/images/col2set.png' alt='2 Columns' title='2 Columns' class='wtw-tinyimgselected' onclick='wtw3dinternet.updateCols(this, 2);' />";
					echo "<img id='wtw_downloadscol3' src='/content/system/images/col3.png' alt='3 Columns' title='3 Columns' class='wtw-tinyimg' onclick='wtw3dinternet.updateCols(this, 3);' />";
					echo "<img id='wtw_downloadscol4' src='/content/system/images/col4.png' alt='4 Columns' title='4 Columns' class='wtw-tinyimg' onclick='wtw3dinternet.updateCols(this, 4);' />";
					echo "</div>";
					echo "</div>";
					echo "<div class='wtw-searcharea'>";
					echo "<div><div class='wtw-searchlabel'>Search:</div>";
					echo "<input name='wtw_bcommunitysearch' type='button' value='Search' onclick=\"wtw3dinternet.communitySearch(dGet('wtw_tcommunitysearch').value);\" class='wtw-searchbutton' />";
					echo "<input id='wtw_tcommunitysearch' name='wtw_tcommunitysearch' type='text' value='' size='20' maxlength='255' class='wtw-textbox' /></div>";
					echo "</div><div class='wtw-clearspace'></div>";
					echo "<div id='wtw_downloadingnotice' class='wtw-hide'></div>";
					
					echo "<br /><hr /><div id='wtw_commtempsearchresults' class='wtw-indentmore'></div>";
					echo "</div></div><br /></div><br /></form>";
					echo "<script>";
					echo "wtw3dinternet.communitySearch('');";
					echo "</script></body></html>";
					die;
					break;
				case 8: /* select Optional Paid Services */
					global $wtwdb;
					/* set setting to only show this page once */
					$wtwdb->saveSetting('OptionalServicesOffered','1');
					
					echo "<!DOCTYPE html><html><head><title>WalkTheWeb Setup</title>";
					echo "<link rel='stylesheet' type='text/css' href='/core/styles/wtw_install.css' />";
					echo "<script>var wtw_domainname = '".$this->domainname."';</script>";
					echo "<script src='/core/scripts/prime/wtw_install.js'></script>";
					echo "</head><body class='wtw-body'><form id='wtw_form1' action='' method='post'>";
					echo "<div class='wtw-fullwidth'><br /><div class='wtw-widepage'>";
					echo "<img src='/content/system/images/wtw-multiverse-logo-1024.png' class='wtw-logoimage' />";
					echo "<input type='hidden' id='wtw_serverinstanceid' value='".$this->serverinstanceid."' />";
					echo "<input type='hidden' id='wtw_serverip' value='".$this->serverip."' />";
					echo "<input type='hidden' id='wtw_domainurl' value='".$this->domainurl."' />";
					echo "<input type='hidden' id='wtw_websiteurl' value='".$this->websiteurl."' />";
					echo "<input type='hidden' id='wtw_domainname' value='".$this->domainname."' />";
					echo "<input type='hidden' id='wtw_userid' value='".$this->userid."' />";
					echo "<input type='hidden' id='wtw_useremail' value='".$this->adminemail."' />";
					echo "<input type='hidden' id='wtw_usertoken' value='".$this->usertoken."' />";
					echo "<input type='hidden' id='wtw_tcommunityid' value='".$zcommunityid."' />";
					
					echo "<h2 class='wtw-login'>WalkTheWeb Services Activation</h2>";
					echo "<div id='wtw_selectservicediv' style='display:block;visibility:visible;'>";
					echo "	<h2 class='wtw-categoryheading'>Optional Paid Services</h2>";
					echo "	<div id='wtw_business' onclick='WTW.selectMultiplayerPackage(this);' class='wtw-servicelisting-selected'>";
					echo "		<div class='wtw-servicetitle'>Multiplayer for Small Businesses<div class='wtw-currency'>$20 USD per Month<br /><span class='wtw-smalltext'>*Paid Yearly</span></div></div>";
					echo "		<div class='wtw-clearspace'></div>";
					echo "		<div><hr />";
					echo "		Ideal for 3D Shopping Websites. Show up to <b>50 Simultaneous Multiplayer Users</b> on your WalkTheWeb Server instance (All 3D Websites combined).";
					echo "		</div>";
					echo "	</div>";
					echo "	<div id='wtw_gamer' onclick='WTW.selectMultiplayerPackage(this);' class='wtw-servicelisting'>";
					echo "		<div class='wtw-servicetitle'>Multiplayer for 3D Game Websites<div class='wtw-currency'>$27 USD per Month<br /><span class='wtw-smalltext'>*Paid Yearly</span></div></div>";
					echo "		<div class='wtw-clearspace'></div>";
					echo "		<div><hr />";
					echo "		Ideal for 3D Gaming Websites. Show up to <b>75 Simultaneous Multiplayer Users</b> on your WalkTheWeb Server instance (All 3D Websites combined).";
					echo "		</div>";
					echo "	</div>";
					echo "	<div id='wtw_developer' onclick='WTW.selectMultiplayerPackage(this);' class='wtw-servicelisting'>";
					echo "		<div class='wtw-servicetitle'>Multiplayer for Developers<div class='wtw-currency'>$10 USD per Month<br /><span class='wtw-smalltext'>*Paid Yearly</span></div></div>";
					echo "		<div class='wtw-clearspace'></div>";
					echo "		<div><hr />";
					echo "		Ideal balance of capabilities and savings for Developers. Create, test and even operate development or production 3D Websites with up to <b>20 Simultaneous Multiplayer Users</b> on your WalkTheWeb Server instance (All 3D Websites combined).";
					echo "		</div>";
					echo "	</div>";
					echo "	<h3 class='wtw-categoryheading'>Selected Service</h3>";
					echo "	<div class='wtw-prepcart'>";
					echo "		<div class='wtw-serviceselect' onclick='WTW.openCart();'>View Cart</div>";
					echo "		<div id='wtw_selectedservice' class='wtw-servicetitle'>Multiplayer for Small Businesses</div>";
					echo "		<div id='wtw_selectedprice' class='wtw-currencyinline'>$20</div> <div class='wtw-currencyinline'>USD per Month <span class='wtw-smalltext'>*Paid Yearly</span></div>";
					echo "		<div id='wtw_expandedservice' style='display:none;visibility:hidden;'>";
					echo "			<hr /><div class='wtw-servicetitle'>Expanded Multiplayer</div>";
					echo "			<div class='wtw-currencyinline'>$18</div> <div class='wtw-currencyinline'>USD per Month <span class='wtw-smalltext'>*Paid Yearly</span></div>";
					echo "		</div>";
					echo "	</div>";
					echo "	<div class='wtw-clearspace'></div>";
					echo "	<div class='wtw-logincancel' onclick='window.location.href=window.location.href;'>No Thanks</div>";
					echo "</div>";
					
					echo "</div></div>";

					echo "<div id='wtw_ibrowsediv' class='wtw-browsediv' style='display:none;'>";
					echo "	<div id='wtw_browseheader' class='wtw-browseheader'>";
					echo "		<div id='wtw_browseheaderclose' class='wtw-browseclose' onclick='WTW.closeIFrame();'>";
					echo "			<img src='/content/system/images/menuclose.png' alt='Close' title='Close' onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />";
					echo "		</div>";
					echo "		<div id='wtw_browsetitle'></div>";
					echo "	</div>";
					echo "  <div id='wtw_ipagediv' class='wtw-ipagediv'></div>";
					echo "	<iframe id='wtw_ibrowseframe' class='wtw-ibrowseframe' src='/core/pages/loading.php'></iframe>";
					echo "</div>";

					die;
					break;			}
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
			if ($this->pagename == "admin.php" && ($wtwdb->isUserInRole('admin') || $wtwdb->isUserInRole('host') || $wtwdb->isUserInRole('architect') || $wtwdb->isUserInRole('developer') || $wtwdb->isUserInRole('graphics artist'))) {
				/* user has admin access, get item to edit from querystring */
				if (isset($_GET["avatarid"]) && !empty($_GET["avatarid"])) {
					$this->avatarid = $wtwdb->checkIDFormat($_GET["avatarid"]);
				}
				if (isset($_GET["communityid"]) && !empty($_GET["communityid"])) {
					$this->communityid = $wtwdb->checkIDFormat($_GET["communityid"]);
				}
				if (isset($_GET["buildingid"]) && !empty($_GET["buildingid"])) {
					$this->buildingid = $wtwdb->checkIDFormat($_GET["buildingid"]);
				}
				if (isset($_GET["thingid"]) && !empty($_GET["thingid"])) {
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
					if ($this->hasValue($zrow["communitypublishname"])) {
						$zwebsiteurl .= "/".$zrow["communitypublishname"];
					} else if ($this->hasValue($zrow["buildingpublishname"])) {
						$zwebsiteurl .= "/buildings/".$zrow["buildingpublishname"];
					} else if ($this->hasValue($zrow["thingpublishname"])) {
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
				$zsql = "
					select *
					from ".wtw_tableprefix."webaliases
					where domainname='".$this->domainname."'
						and deleted=0";
				if (!empty($this->community)) {
					$zsql .= " and (communitypublishname='".$this->community."' or communityid='".$this->community."')";
				} else {
					$zsql .= " and communitypublishname=''";
				}
				if (!empty($this->building)) {
					$zsql .= " and (buildingpublishname='".$this->building."' or buildingid='".$this->building."')";
				} else {
					$zsql .= " and buildingpublishname=''";
				}
				if (!empty($this->thing)) {
					$zsql .= " and (thingpublishname='".$this->thing."' or thingid'".$this->thing."')";
				} else {
					$zsql .= " and thingpublishname=''";
				}
				$zsql .= " order by createdate limit 1;";
				
				$zresults = $wtwdb->query($zsql);
				foreach ($zresults as $zrow) {
					if ($this->hasValue($zrow["webaliasid"])) {
						$this->webaliasid = $zrow["webaliasid"];
					}
					if ($this->hasValue($zrow["communityid"])) {
						$this->communityid = $zrow["communityid"];
					}
					if ($this->hasValue($zrow["buildingid"])) {
						$this->buildingid = $zrow["buildingid"];
					}
					if ($this->hasValue($zrow["thingid"])) {
						$this->thingid = $zrow["thingid"];
					}
					if ($this->hasValue($zrow["forcehttps"])) {
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
			$this->serror("core-functions-class_wtw-initsession.php-checkWeb=".$e->getMessage());
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
			$this->serror("core-functions-class_wtw-initsession.php-getAdjustedPosition=".$e->getMessage());
		}
		return $adjpos;
	}

	public function userHasArchitect($zrolename) {
		/* check if user has the role of architect access */
		$zhasaccess = false;
		try {
			if ($zrolename == 'Admin' || $zrolename == 'Architect' || $zrolename == 'Developer' || $zrolename == 'Graphics Artist'  || $zrolename == 'Host') {
				$zhasaccess = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-userHasArchitect=".$e->getMessage());
		}
		return $zhasaccess;
	}
		

	public function getSceneSetting() {
		/* get initial 3D Community Scene settings (sky, water level, ground textures, and avatar start position) */
		global $wtwdb;
		$zinitialscene = array();
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
			$zazresults = array();
			$zspawnzones = array();
			$zspawnindex = 0;
			if ($this->hasValue($this->userid)) {
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
				/* retrieve alternate spawn zones */
				$zazresults = $wtwdb->query("
					select distinct az1.* 
					from ".wtw_tableprefix."actionzones az1 
					where (az1.communityid='".$this->communityid."' 
						and az1.actionzonetype='spawnzone' 
						and az1.deleted=0)

					union
					select distinct az2.* 
					from ".wtw_tableprefix."actionzones az2
						inner join ".wtw_tableprefix."connectinggrids cg2
							on az2.buildingid=cg2.childwebid
							and cg2.childwebtype='building'
							and cg2.parentwebid='".$this->communityid."'
							and cg2.parentwebtype='community'
					where (az2.actionzonetype='spawnzone' 
						and az2.deleted=0
						and cg2.deleted=0)

					union
					select distinct az3.* 
					from ".wtw_tableprefix."actionzones az3
						inner join ".wtw_tableprefix."connectinggrids cg3
							on az3.buildingid=cg3.childwebid
							and cg3.childwebtype='thing'
							and cg3.parentwebid='".$this->communityid."'
							and cg3.parentwebtype='community'
					where (az3.actionzonetype='spawnzone' 
						and az3.deleted=0
						and cg3.deleted=0);			
				");
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
				/* retrieve alternate spawn zones */
				$zazresults = $wtwdb->query("
					select distinct az1.* 
					from ".wtw_tableprefix."actionzones az1 
					where (az1.communityid='".$this->communityid."' 
						and az1.actionzonetype='spawnzone' 
						and az1.deleted=0)

					union
					select distinct az2.* 
					from ".wtw_tableprefix."actionzones az2
						inner join ".wtw_tableprefix."connectinggrids cg2
							on az2.buildingid=cg2.childwebid
							and cg2.childwebtype='building'
							and cg2.parentwebid='".$this->communityid."'
							and cg2.parentwebtype='community'
					where (az2.actionzonetype='spawnzone' 
						and az2.deleted=0
						and cg2.deleted=0)

					union
					select distinct az3.* 
					from ".wtw_tableprefix."actionzones az3
						inner join ".wtw_tableprefix."connectinggrids cg3
							on az3.buildingid=cg3.childwebid
							and cg3.childwebtype='thing'
							and cg3.parentwebid='".$this->communityid."'
							and cg3.parentwebtype='community'
					where (az3.actionzonetype='spawnzone' 
						and az3.deleted=0
						and cg3.deleted=0);			
				");
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
				/* retrieve alternate spawn zones */
				$zazresults = $wtwdb->query("
					select distinct az1.* 
					from ".wtw_tableprefix."actionzones az1 
					where (az1.communityid='".$this->communityid."' 
						and az1.actionzonetype='spawnzone' 
						and az1.deleted=0)

					union
					select distinct az2.* 
					from ".wtw_tableprefix."actionzones az2
						inner join ".wtw_tableprefix."connectinggrids cg2
							on az2.buildingid=cg2.childwebid
							and cg2.childwebtype='building'
							and cg2.parentwebid='".$this->communityid."'
							and cg2.parentwebtype='community'
					where (az2.actionzonetype='spawnzone' 
						and az2.deleted=0
						and cg2.deleted=0)

					union
					select distinct az3.* 
					from ".wtw_tableprefix."actionzones az3
						inner join ".wtw_tableprefix."connectinggrids cg3
							on az3.buildingid=cg3.childwebid
							and cg3.childwebtype='thing'
							and cg3.parentwebid='".$this->communityid."'
							and cg3.parentwebtype='community'
					where (az3.actionzonetype='spawnzone' 
						and az3.deleted=0
						and cg3.deleted=0);			
				");
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
				/* retrieve alternate spawn zones */
				$zazresults = $wtwdb->query("
					select distinct az1.* 
					from ".wtw_tableprefix."actionzones az1 
					where (az1.buildingid='".$this->buildingid."' 
						and az1.actionzonetype='spawnzone' 
						and az1.deleted=0)

					union
					select distinct az2.* 
					from ".wtw_tableprefix."actionzones az2
						inner join ".wtw_tableprefix."connectinggrids cg2
							on az2.thingid=cg2.childwebid
							and cg2.childwebtype='thing'
							and cg2.parentwebid='".$this->buildingid."'
							and cg2.parentwebtype='building'
					where (az2.actionzonetype='spawnzone' 
						and az2.deleted=0
						and cg2.deleted=0);			
				");
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
				/* retrieve alternate spawn zones */
				$zazresults = $wtwdb->query("
					select distinct az1.* 
					from ".wtw_tableprefix."actionzones az1 
					where (az1.communityid='".$this->communityid."' 
						and az1.actionzonetype='spawnzone' 
						and az1.deleted=0)

					union
					select distinct az2.* 
					from ".wtw_tableprefix."actionzones az2
						inner join ".wtw_tableprefix."connectinggrids cg2
							on az2.buildingid=cg2.childwebid
							and cg2.childwebtype='building'
							and cg2.parentwebid='".$this->communityid."'
							and cg2.parentwebtype='community'
					where (az2.actionzonetype='spawnzone' 
						and az2.deleted=0
						and cg2.deleted=0)

					union
					select distinct az3.* 
					from ".wtw_tableprefix."actionzones az3
						inner join ".wtw_tableprefix."connectinggrids cg3
							on az3.buildingid=cg3.childwebid
							and cg3.childwebtype='thing'
							and cg3.parentwebid='".$this->communityid."'
							and cg3.parentwebtype='community'
					where (az3.actionzonetype='spawnzone' 
						and az3.deleted=0
						and cg3.deleted=0);			
				");
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
				/* retrieve alternate spawn zones */
				$zazresults = $wtwdb->query("
					select distinct az1.* 
					from ".wtw_tableprefix."actionzones az1 
					where (az1.buildingid='".$this->buildingid."' 
						and az1.actionzonetype='spawnzone' 
						and az1.deleted=0)

					union
					select distinct az2.* 
					from ".wtw_tableprefix."actionzones az2
						inner join ".wtw_tableprefix."connectinggrids cg2
							on az2.thingid=cg2.childwebid
							and cg2.childwebtype='thing'
							and cg2.parentwebid='".$this->buildingid."'
							and cg2.parentwebtype='building'
					where (az2.actionzonetype='spawnzone' 
						and az2.deleted=0
						and cg2.deleted=0);			
				");
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
				/* retrieve alternate spawn zones */
				$zazresults = $wtwdb->query("
					select distinct az1.* 
					from ".wtw_tableprefix."actionzones az1 
					where (az1.thingid='".$this->thingid."' 
						and az1.actionzonetype='spawnzone' 
						and az1.deleted=0);			
				");
			}
			$zdomaininfo = array(
				'communityid' => $this->communityid,
				'buildingid' => $this->buildingid,
				'thingid' => $this->thingid,
				'sitename' => '',
				'spawnactionzoneid' => '',
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
			
			$zcommunityinfo = array (
				'communityid' => $this->communityid,
				'communityname' => 'WalkTheWeb',
				'waterbumpid' => '',
				'waterbumppath' => '',
				'waterbumpheight' => .6,
				'watersubdivisions' => 2,
				'windforce' => -10,
				'winddirectionx' => 1,
				'winddirectiony' => 0,
				'winddirectionz' => 1,
				'waterwaveheight' => .2,
				'waterwavelength' => .02,
				'watercolorrefraction' => '#23749C',
				'watercolorreflection' => '#52BCF1',
				'watercolorblendfactor' => .2,
				'watercolorblendfactor2' => .2,
				'wateralpha' => .9,
				'access' => '',
				'sceneambientcolor' => '#E5E8E8',
				'sceneclearcolor' => '#000000',
				'sceneuseclonedmeshmap' => true,
				'sceneblockmaterialdirtymechanism' => true,
				'scenefogenabled' => false,
				'scenefogmode' => '',
				'scenefogdensity' => 0.01,
				'scenefogstart' => 20.0,
				'scenefogend' => 60.0,
				'scenefogcolor' => '#c0c0c0',
				'sundirectionalintensity' => 1,
				'sundiffusecolor' => '#ffffff',
				'sunspecularcolor' => '#ffffff',
				'sungroundcolor' => '#000000',
				'sundirectionx' => 999,
				'sundirectiony' => -999,
				'sundirectionz' => 999,
				'backlightintensity' => .5,
				'backlightdirectionx' => -999,
				'backlightdirectiony' => 999,
				'backlightdirectionz' => -999,
				'backlightdiffusecolor' => '#ffffff',
				'backlightspecularcolor' => '#ffffff',
				'skytype' => '',
				'skysize' => 5000,
				'skyboxfolder' => '',
				'skyboxfile' => '',
				'skyboximageleft' => '',
				'skyboximageup' => '',
				'skyboximagefront' => '',
				'skyboximageright' => '',
				'skyboximagedown' => '',
				'skyboximageback' => '',
				'skypositionoffsetx' => 0,
				'skypositionoffsety' => 0,
				'skypositionoffsetz' => 0,
				'skyboxmicrosurface' => 1.0,
				'skyboxpbr' => true,
				'skyboxasenvironmenttexture' => true,
				'skyboxblur' => 0,
				'skyboxdiffusecolor' => '#000000',
				'skyboxspecularcolor' => '#000000',
				'skyboxambientcolor' => '#000000',
				'skyboxemissivecolor' => '#000000'
			);

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
							end as skydomepath,
						case when waterbumpid = '' then ''
							else
								(select u1.filepath 
									from ".wtw_tableprefix."uploads u2
										left join ".wtw_tableprefix."uploads u1 
											on u2.websizeid=u1.uploadid 
									where u2.uploadid=waterbumpid limit 1)
							end as waterbumppath
					from ".wtw_tableprefix."communities
					where communityid='".$this->communityid."'
						and deleted=0
					limit 1;");
				foreach ($zresults as $zrow) {
					//$wtwuser->useraccess = $zrow["useraccess"];
					$zgroundpositiony = $zrow["groundpositiony"];
					$zwaterpositiony = $zrow["waterpositiony"];
					$zdomaininfo['sitename'] = $zrow["communityname"];
					$zdomaininfo['spawnactionzoneid'] = $zrow["spawnactionzoneid"];
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
					$zcommunityinfo['communityname'] = $zrow['communityname'];
					$zcommunityinfo['waterbumpid'] = $zrow['waterbumpid'];
					$zcommunityinfo['waterbumppath'] = $zrow['waterbumppath'];
					$zcommunityinfo['waterbumpheight'] = $zrow['waterbumpheight'];
					$zcommunityinfo['watersubdivisions'] = $zrow['watersubdivisions'];
					$zcommunityinfo['windforce'] = $zrow['windforce'];
					$zcommunityinfo['winddirectionx'] = $zrow['winddirectionx'];
					$zcommunityinfo['winddirectiony'] = $zrow['winddirectiony'];
					$zcommunityinfo['winddirectionz'] = $zrow['winddirectionz'];
					$zcommunityinfo['waterwaveheight'] = $zrow['waterwaveheight'];
					$zcommunityinfo['waterwavelength'] = $zrow['waterwavelength'];
					$zcommunityinfo['watercolorrefraction'] = $zrow['watercolorrefraction'];
					$zcommunityinfo['watercolorreflection'] = $zrow['watercolorreflection'];
					$zcommunityinfo['watercolorblendfactor'] = $zrow['watercolorblendfactor'];
					$zcommunityinfo['watercolorblendfactor2'] = $zrow['watercolorblendfactor2'];
					$zcommunityinfo['wateralpha'] = $zrow['wateralpha'];
					$zcommunityinfo['access'] = $zcommunityaccess;
					$zcommunityinfo['sceneambientcolor'] = $zrow['sceneambientcolor'];
					$zcommunityinfo['sceneclearcolor'] = $zrow['sceneclearcolor'];
					$zcommunityinfo['sceneuseclonedmeshmap'] = $zrow['sceneuseclonedmeshmap'];
					$zcommunityinfo['sceneblockmaterialdirtymechanism'] = $zrow['sceneblockmaterialdirtymechanism'];
					$zcommunityinfo['scenefogenabled'] = $zrow['scenefogenabled'];
					$zcommunityinfo['scenefogmode'] = $zrow['scenefogmode'];
					$zcommunityinfo['scenefogdensity'] = $zrow['scenefogdensity'];
					$zcommunityinfo['scenefogstart'] = $zrow['scenefogstart'];
					$zcommunityinfo['scenefogend'] = $zrow['scenefogend'];
					$zcommunityinfo['scenefogcolor'] = $zrow['scenefogcolor'];
					$zcommunityinfo['sundirectionalintensity'] = $zrow['sundirectionalintensity'];
					$zcommunityinfo['sundiffusecolor'] = $zrow['sundiffusecolor'];
					$zcommunityinfo['sunspecularcolor'] = $zrow['sunspecularcolor'];
					$zcommunityinfo['sungroundcolor'] = $zrow['sungroundcolor'];
					$zcommunityinfo['sundirectionx'] = $zrow['sundirectionx'];
					$zcommunityinfo['sundirectiony'] = $zrow['sundirectiony'];
					$zcommunityinfo['sundirectionz'] = $zrow['sundirectionz'];
					$zcommunityinfo['backlightintensity'] = $zrow['backlightintensity'];
					$zcommunityinfo['backlightdirectionx'] = $zrow['backlightdirectionx'];
					$zcommunityinfo['backlightdirectiony'] = $zrow['backlightdirectiony'];
					$zcommunityinfo['backlightdirectionz'] = $zrow['backlightdirectionz'];
					$zcommunityinfo['backlightdiffusecolor'] = $zrow['backlightdiffusecolor'];
					$zcommunityinfo['backlightspecularcolor'] = $zrow['backlightspecularcolor'];
					$zcommunityinfo['skytype'] = $zrow['skytype'];
					$zcommunityinfo['skysize'] = $zrow['skysize'];
					$zcommunityinfo['skyboxfolder'] = $zrow['skyboxfolder'];
					$zcommunityinfo['skyboxfile'] = $zrow['skyboxfile'];
					$zcommunityinfo['skyboximageleft'] = $zrow['skyboximageleft'];
					$zcommunityinfo['skyboximageup'] = $zrow['skyboximageup'];
					$zcommunityinfo['skyboximagefront'] = $zrow['skyboximagefront'];
					$zcommunityinfo['skyboximageright'] = $zrow['skyboximageright'];
					$zcommunityinfo['skyboximagedown'] = $zrow['skyboximagedown'];
					$zcommunityinfo['skyboximageback'] = $zrow['skyboximageback'];
					$zcommunityinfo['skypositionoffsetx'] = $zrow['skypositionoffsetx'];
					$zcommunityinfo['skypositionoffsety'] = $zrow['skypositionoffsety'];
					$zcommunityinfo['skypositionoffsetz'] = $zrow['skypositionoffsetz'];
					$zcommunityinfo['skyboxmicrosurface'] = $zrow['skyboxmicrosurface'];
					$zcommunityinfo['skyboxpbr'] = $zrow['skyboxpbr'];
					$zcommunityinfo['skyboxasenvironmenttexture'] = $zrow['skyboxasenvironmenttexture'];
					$zcommunityinfo['skyboxblur'] = $zrow['skyboxblur'];
					$zcommunityinfo['skyboxdiffusecolor'] = $zrow['skyboxdiffusecolor'];
					$zcommunityinfo['skyboxspecularcolor'] = $zrow['skyboxspecularcolor'];
					$zcommunityinfo['skyboxambientcolor'] = $zrow['skyboxambientcolor'];
					$zcommunityinfo['skyboxemissivecolor'] = $zrow['skyboxemissivecolor'];
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
						$zdomaininfo['spawnactionzoneid'] = $zrow["spawnactionzoneid"];
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
						$zdomaininfo['spawnactionzoneid'] = $zrow["spawnactionzoneid"];
						$zdomaininfo['gravity'] = $zrow["gravity"];
					}
					$zthinginfo = array(
						'thingid' => $zrow["thingid"],
						'thingname' => $zrow["thingname"],
						'access' => $zbuildingaccess);	
				}
			}			
			
			if (count($zazresults) > 0) {
				foreach ($zazresults as $zazrow) {
					$zspawnzones[$zspawnindex] = array(
						'actionzoneid'=>$zazrow["actionzoneid"],
						'communityid'=>$zazrow["communityid"],
						'buildingid'=>$zazrow["buildingid"],
						'thingid'=>$zazrow["thingid"],
						'loadactionzoneid'=>$zazrow["loadactionzoneid"],
						'actionzonename'=>$zazrow["actionzonename"],
						'actionzoneshape'=>$zazrow["actionzoneshape"],
						'actionzonetype'=>$zazrow["actionzonetype"],
						'positionx'=>$zazrow["positionx"],
						'positiony'=>$zazrow["positiony"],
						'positionz'=>$zazrow["positionz"],
						'scalingx'=>$zazrow["scalingx"],
						'scalingy'=>$zazrow["scalingy"],
						'scalingz'=>$zazrow["scalingz"],
						'rotationx'=>$zazrow["rotationx"],
						'rotationy'=>$zazrow["rotationy"],
						'rotationz'=>$zazrow["rotationz"]
					);
					$zspawnindex += 1;
				}
			}
			$zroles = array();
			if (!empty($this->userid)) {
				/* get user roles */
				$zresults = $wtwdb->query("
					select r1.*
					from ".wtw_tableprefix."roles r1
						inner join ".wtw_tableprefix."usersinroles ur1
						on r1.roleid = ur1.roleid
					where ur1.userid='".$this->userid."'
						and ur1.deleted=0
						and r1.deleted=0
					order by r1.rolename;");
				$i = 0;
				foreach ($zresults as $zrow) {
					$zroles[$i] = array(
						'roleid' => $zrow["roleid"],
						'rolename' => $zrow["rolename"]
					);	
					$i += 1;
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
			$zinitialscene['domaininfo'] = $zdomaininfo;
			$zinitialscene['communityinfo'] = $zcommunityinfo;
			$zinitialscene['buildinginfo'] = $zbuildinginfo;
			$zinitialscene['thinginfo'] = $zthinginfo;
			$zinitialscene['startlocation'] = $startlocation;
			$zinitialscene['spawnzones'] = $zspawnzones;
			$zinitialscene['useraccesslist'] = null;
			$zinitialscene['roles'] = $zroles;
			/* get main 3D Thing settings */
			$zresults = $wtwdb->query("
				select settingvalue
				from ".wtw_tableprefix."settings
				where settingname='enableemailvalidation'
					and deleted=0
				limit 1;");
			if (count($zresults) > 0) {
				foreach ($zresults as $zrow) {
					$zinitialscene['enableemailvalidation'] = $zrow["settingvalue"];
				}
			} else {
				$zinitialscene['enableemailvalidation'] = '0';
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-getSceneSetting=".$e->getMessage());
		}
		return $zinitialscene;
	}
	
	public function loadMetaData() {
		/* sets the meta data for the web page */
		global $wtwdb;
		$zmetadata = "";
		try {
			/* domainverify = used by social media */
			/* fbappid =  used by social media */
			/* also check category and business contact email and setup image alt */
			$zpreviewpath = '';
			$zpreviewwidth = '512';
			$zpreviewheight = '300';
			$zsitename = 'WalkTheWeb: 3D Internet Metaverse';
			$zsitedescription = 'WalkTheWeb: Internationally Patented 3D Internet Browsing and 3D Website hosting. WalkTheWeb (R), http://3d (TM), https://3d (TM), and HTTP3D (TM).';
			$zsiteicon = '/favicon.ico';
			/* get meta data values based on 3D Community, Building, or Thing */
			$zresults = $wtwdb->query("
				select w1.*,
					c1.communityname,
					b1.buildingname,
					t1.thingname,
					c1.snapshotid as communitysnapshotid,
					b1.snapshotid as buildingsnapshotid,
                    t1.snapshotid as thingsnapshotid,
					case when c1.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=c1.snapshotid limit 1)
						end as communitysnapshoturl,
					case when c1.snapshotid is null then '512'
						else (select imagewidth 
							from ".wtw_tableprefix."uploads 
							where uploadid=c1.snapshotid limit 1)
						end as communitysnapshotwidth,
					case when c1.snapshotid is null then '300'
						else (select imageheight 
							from ".wtw_tableprefix."uploads 
							where uploadid=c1.snapshotid limit 1)
						end as communitysnapshotheight,
					case when b1.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=b1.snapshotid limit 1)
						end as buildingsnapshoturl,
					case when b1.snapshotid is null then '512'
						else (select imagewidth 
							from ".wtw_tableprefix."uploads 
							where uploadid=b1.snapshotid limit 1)
						end as buildingsnapshotwidth,
					case when b1.snapshotid is null then '300'
						else (select imageheight 
							from ".wtw_tableprefix."uploads 
							where uploadid=b1.snapshotid limit 1)
						end as buildingsnapshotheight,
					case when t1.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=t1.snapshotid limit 1)
						end as thingsnapshoturl,
					case when t1.snapshotid is null then '512'
						else (select imagewidth 
							from ".wtw_tableprefix."uploads 
							where uploadid=t1.snapshotid limit 1)
						end as thingsnapshotwidth,
					case when t1.snapshotid is null then '300'
						else (select imageheight 
							from ".wtw_tableprefix."uploads 
							where uploadid=t1.snapshotid limit 1)
						end as thingsnapshotheight,
					case when (w1.webaliasid='".$this->webaliasid."' and not webaliasid='') then 1
						else case when (w1.webalias like '".$this->websiteurl."' and not webalias='') then 2
							else 3
							end 
						end as prioritylevel,
					case when w1.siteiconid = '' then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=w1.siteiconid limit 1)
						end as siteiconpath
				from ".wtw_tableprefix."webaliases w1
					left join ".wtw_tableprefix."communities c1
						on w1.communityid=c1.communityid
					left join ".wtw_tableprefix."buildings b1
						on w1.buildingid=b1.buildingid
					left join ".wtw_tableprefix."things t1
						on w1.thingid=t1.thingid
				where w1.deleted=0
					and (w1.webaliasid='".$this->webaliasid."' and not webaliasid='')
                    or (w1.webalias like '".$this->websiteurl."' and not webalias='')
                    or (w1.communityid='".$this->communityid."' and w1.buildingid='".$this->buildingid."' and w1.thingid='".$this->thingid."')
				order by 
					prioritylevel,
					w1.createdate,
					w1.domainname,
					w1.communitypublishname,
					w1.buildingpublishname,
					w1.thingpublishname,
					w1.communityid,
					w1.buildingid,
					w1.thingid,
					w1.webaliasid
				limit 1;
			");

			foreach ($zresults as $zrow) {
				$zsitename = $zrow["sitename"];
				$zsitedescription = $zrow["sitedescription"];
				$zsiteiconpath = $zrow["siteiconpath"];
				$zcommunityid = $zrow["communityid"];
				$zbuildingid = $zrow["buildingid"];
				$zthingid = $zrow["thingid"];
				$zcommunityname = $zrow["communityname"];
				$zbuildingname = $zrow["buildingname"];
				$zthingname = $zrow["thingname"];
				$zcommunitysnapshoturl = $zrow["communitysnapshoturl"]."?time=".date_timestamp_get(date_create());
				$zcommunitysnapshotwidth = $zrow["communitysnapshotwidth"];
				$zcommunitysnapshotheight = $zrow["communitysnapshotheight"];
				$zbuildingsnapshoturl = $zrow["buildingsnapshoturl"]."?time=".date_timestamp_get(date_create());
				$zbuildingsnapshotwidth = $zrow["buildingsnapshotwidth"];
				$zbuildingsnapshotheight = $zrow["buildingsnapshotheight"];
				$zthingsnapshoturl = $zrow["thingsnapshoturl"]."?time=".date_timestamp_get(date_create());
				$zthingsnapshotwidth = $zrow["thingsnapshotwidth"];
				$zthingsnapshotheight = $zrow["thingsnapshotheight"];
				
				if ($this->hasValue($zcommunityid)) {
					$zpreviewpath = $zcommunitysnapshoturl;
					$zpreviewwidth = $zcommunitysnapshotwidth;
					$zpreviewheight = $zcommunitysnapshotheight;
					if (!isset($zsitename) || empty($zsitename)) {
						$zsitename = $zcommunityname;
					}
				} else if ($this->hasValue($zbuildingid)) {
					$zpreviewpath = $zbuildingsnapshoturl;
					$zpreviewwidth = $zbuildingsnapshotwidth;
					$zpreviewheight = $zbuildingsnapshotheight;
					if (!isset($zsitename) || empty($zsitename)) {
						$zsitename = $zbuildingname;
					}
				} else if ($this->hasValue($zthingid)) {
					$zpreviewpath = $zthingsnapshoturl;
					$zpreviewwidth = $zthingsnapshotwidth;
					$zpreviewheight = $zthingsnapshotheight;
					if (!isset($zsitename) || empty($zsitename)) {
						$zsitename = $zthingname;
					}
				}
			}
			if (!isset($zsitename) || empty($zsitename)) {
				$zsitename = "WalkTheWeb 3D Internet Metaverse";
			}
			if (!isset($zsitedescription) || empty($zsitedescription)) {
				$zsitedescription = "WalkTheWeb: Internationally Patented 3D Internet Browsing and 3D Website hosting. WalkTheWeb (R), http://3d (TM), https://3d (TM), and HTTP3D (TM).";
			} 
			if (!isset($zsiteiconpath) || empty($zsiteiconpath)) {
				$zsiteiconpath = "/favicon.ico";
			}
			if (!isset($zpreviewpath) || empty($zpreviewpath)) {
				$zpreviewpath = $this->domainurl."/content/system/stock/wtw-3dinternet.jpg";
			}
			if ($this->pagename == 'admin.php') {
				$zsitename = "WalkTheWeb Admin: ".$zsitename;
				$zsitedescription = "WalkTheWeb Admin: Patented 3D Internet Browsing and 3D Website hosting. WalkTheWeb (R), http://3d (TM), https://3d (TM), and HTTP3D (TM).";
			}

			/* meta data entries */
			$zmetadata = "<title>".$zsitename."</title>\r\n";
			$zmetadata .= "<meta http-equiv='Cache-Control' content='no-cache, no-store, must-revalidate' />\r\n";
			$zmetadata .= "<meta http-equiv='Content-Type' content='text/html; charset=utf-8'/>\r\n";
			$zmetadata .= "<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />\r\n";
			$zmetadata .= "<meta http-equiv='Pragma' content='no-cache' />\r\n";
			$zmetadata .= "<meta http-equiv='Expires' content='-1' />\r\n";
			$zmetadata .= "<meta name='google' content='notranslate'/>\r\n";
			$zmetadata .= "<link id='wtw_favicon' rel='icon' href='".$zsiteiconpath."' />\r\n";
			if ($this->hasValue($zsitedescription)) {
				$zmetadata .= "<meta name='description' content=\"".$zsitedescription."\" />\r\n";
				$zmetadata .= "<meta property='og:description' content=\"".$zsitedescription."\" />\r\n";
			}
			$zmetadata .= "<meta property='og:image' content='".$zpreviewpath."' />\r\n";
			$zmetadata .= "<meta property='og:image:width' content='".$zpreviewwidth."'/>\r\n";
			$zmetadata .= "<meta property='og:image:height' content='".$zpreviewheight."'/>\r\n";
			$zmetadata .= "<meta property='og:image:alt' content=\"".$zsitename."\" />\r\n";
			$zmetadata .= "<meta property='og:url' content='".$this->protocol.$this->domainname.$this->uri."' />\r\n";
			$zmetadata .= "<meta property='og:type' content='business.business' />\r\n";
			$zmetadata .= "<meta property='og:site_name' content=\"".$zsitename."\" />\r\n";
			$zmetadata .= "<meta property='og:see_also' content='https://www.walktheweb.com' />\r\n";
			$zmetadata .= "<meta property='og:title' content=\"".$zsitename."\" />\r\n";

			$zmetadata .= "<meta name='keywords' content=\"WalkTheWeb,3D Internet,Metaverse,Multiverse,open-source,http3d,".$zsitedescription."\" />\r\n";
			$zmetadata .= "<meta property='image' content='".$zpreviewpath."' />\r\n";
			$zmetadata .= "<meta property='image:width' content='".$zpreviewwidth."' />\r\n";
			$zmetadata .= "<meta property='image:height' content='".$zpreviewheight."' />\r\n";
			$zmetadata .= "<meta property='image:alt' content=\"".$zsitename."\" />\r\n";
			$zmetadata .= "<meta property='url' content='".$this->protocol.$this->domainname.$this->uri."' />\r\n";

			$zmetadata .= "<meta name='twitter:card' content='summary'>\r\n";
			$zmetadata .= "<meta name='twitter:url' content='".$this->protocol.$this->domainname.$this->uri."' />\r\n";
			$zmetadata .= "<meta name='twitter:title' content=\"".$zsitename."\" />\r\n";
			$zmetadata .= "<meta name='twitter:description' content=\"".$zsitedescription."\" />\r\n";
			$zmetadata .= "<meta name='twitter:image' content='".$zpreviewpath."' />\r\n";

			/* additional optional meta data - should be defined on the /config/wtw_config.php file */
			if (defined('domainverify')) {
				$zmetadata .= "<meta name='p:domain_verify' content=\"".domainverify."\" />\r\n";
			}
			if (defined('fbappid')) {
				$zmetadata .= "<meta property='fb:app_id' content=\"".fbappid."\" />\r\n";
			}
			if (defined('contactemail')) {
				$zmetadata .= "<meta property='business:contact_data' content=\"".contactemail."\" />\r\n";
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadMetaData=".$e->getMessage());
		}
		return $zmetadata;
	}
	
	public function loadInitJSData() {
		/* global JavaScript variables passed from the Database using PHP */
		global $wtwplugins;
		$zjsdata = "";
		try {	
			$zjsdata = "<script type='text/javascript'>\r\n";
			if (defined('wtw_devmode')) {
				$zjsdata .= "	var wtw_devmode = '".wtw_devmode."';\r\n";
			} else {
				$zjsdata .= "	var wtw_devmode = '0';\r\n";
			}
			if (defined('wtw_defaultdomain')) {
				$zjsdata .= "	var wtw_defaultdomain = '".wtw_defaultdomain."';\r\n";
			} else {
				$zjsdata .= "	var wtw_defaultdomain = '';\r\n";
			}
			if (defined('wtw_defaultsitename')) {
				$zjsdata .= "	var wtw_defaultsitename = '".wtw_defaultsitename."';\r\n";
			} else {
				$zjsdata .= "	var wtw_defaultsitename = '';\r\n";
			}
			if (defined('wtw_googleanalytics')) {
				$zjsdata .= "	var wtw_googleanalytics = '".wtw_googleanalytics."';\r\n";
			} else {
				$zjsdata .= "	var wtw_googleanalytics = '';\r\n";
			}
			$zjsdata .= "	var wtw_protocol = '".$this->protocol."';\r\n";
			$zjsdata .= "	var wtw_domainurl = '".$this->domainurl."';\r\n";
			$zjsdata .= "	var wtw_websiteurl = '".$this->websiteurl."';\r\n";
			$zjsdata .= "	var wtw_domainname = '".$this->domainname."';\r\n";
			$zjsdata .= "	var community = '".$this->community."';\r\n";
			$zjsdata .= "	var building = '".$this->building."';\r\n";
			$zjsdata .= "	var thinging = '".$this->thing."';\r\n";
			$zjsdata .= "	var communityid = '".$this->communityid."';\r\n";
			$zjsdata .= "	var buildingid = '".$this->buildingid."';\r\n";
			$zjsdata .= "	var thingid = '".$this->thingid."';\r\n";
			$zjsdata .= "	var avatarid = '".$this->avatarid."';\r\n";
			$zjsdata .= "	var wtw_domain;\r\n";
			$zjsdata .= "	var wtw_translate = [];;\r\n";
			$zjsdata .= "	var wtw_uploads = [];\r\n";
			$zjsdata .= "	var wtw_version = \"".$this->version."\";\r\n";
			$zjsdata .= "	var wtw_versiondate = \"".$this->versiondate."\";\r\n";
			$zjsdata .= "	var wtw_versiontext = \"WalkTheWeb (v".$this->version.") ".date('m-d-Y', strtotime($this->versiondate))."\\r\\nDatabase (v".$this->dbversion.")\\r\\n© Copyright HTTP3D Inc.\";\r\n";
			$zjsdata .= "	var wtw_defaultlanguage = \"".$this->defaultlanguage."\";\r\n";
			$zjsdata .= "	try {\r\n";
			$zjsdata .= "		wtw_domain = JSON.stringify(".json_encode($this->getSceneSetting()).");\r\n";
			$zjsdata .= "	} catch(ex) {\r\n 			console.log('core-snippets-checkloadurl=' + ex.message);\r\n";
			$zjsdata .= "	}\r\n";
			$zjsdata .= "	try {\r\n";
			$zjsdata .= "		wtw_translate = JSON.stringify(".json_encode($this->translation).");\r\n";
			$zjsdata .= "		wtw_translate = JSON.parse(wtw_translate);\r\n";
			$zjsdata .= "	} catch(ex) {\r\n 			console.log('core-snippets-checkloadurl-translation=' + ex.message);\r\n";
			$zjsdata .= "	}\r\n";
            $zjsdata .= "	if (window != top) {\r\n";
            $zjsdata .= "	    top.location.href = location.href;\r\n";
            $zjsdata .= "	}\r\n";
            $zjsdata .= "	if (top.frames.length != 0) {\r\n";
            $zjsdata .= "	    if (window.location.href.replace) {\r\n";
            $zjsdata .= "	    	top.location.replace(self.location.href);\r\n";
            $zjsdata .= "		} else {\r\n";
            $zjsdata .= "		    top.location.href = self.document.href;\r\n";
			$zjsdata .= "		}\r\n";
            $zjsdata .= "	}\r\n";
			$zjsdata .= "</script>"; 
			$zjsdata .= "<script src='https://3dnet.walktheweb.network/socket.io/socket.io.js'></script>\r\n";
//			$zjsdata .= "<script src='/core/scripts/engine/socket.io/socket.io-stream.js'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_constructor.js?x=".$this->version."'></script>\r\n";
			$zjsdata .= $wtwplugins->getScriptFunctions();
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadInitJSData=".$e->getMessage());
		}
		return $zjsdata;
	}

	public function loadJSBrowseData() {
		/* these scripts are loaded when in the browse mode (for Admin scripts, see /core/functions/class_wtwadmin.php) */
		/* note that admin also loads these same scripts, but adds additional scripts in a particular order */
		$zjsdata = "";
		try {	
			$zver = $this->version;
			$zbabylonversion = $this->defaultbabylonversion;
			if (defined('wtw_babylonversion')) {
				$zbabylonversion = wtw_babylonversion;
			}
			/* alternative used during development to force reload every time */
			$zver = date("Y-m-d-H-i-s");
			/* additional materials library available: https://github.com/BabylonJS/Babylon.js/tree/master/dist/materialsLibrary/ */
			$zjsdata .= "<script src='/core/scripts/prime/wtw_common.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_utilities.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_dynamicscripts.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_login.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_uploads.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_analytics.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_cameras.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/avatars/wtw_basicavatars.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/avatars/wtw_addavatarlist.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/avatars/wtw_transitionsavatars.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/avatars/wtw_loadavatar.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/avatars/wtw_avatarfunctions.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/hud/wtw_hud.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/hud/wtw_hud_fields.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/hud/wtw_hud_cameras.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/hud/wtw_hud_profile.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/hud/wtw_hud_login.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_objectdefinitions.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/ammo.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/recast.js?x=".$zver."'></script>\r\n";
			if (defined('wtw_physicsengine') && $zbabylonversion != 'v5.x.x') {
				switch (wtw_physicsengine) {
					case 'havok':
						$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/HavokPhysics_umd.js?x=".$zver."'></script>\r\n";
						break;
					case 'cannon':
						$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/cannon.js?x=".$zver."'></script>\r\n";
						break;
					case 'oimo':
						$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/oimo.js?x=".$zver."'></script>\r\n"; 
						break;
				}
			} else {
				$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/cannon.js?x=".$zver."'></script>\r\n";
				$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/oimo.js?x=".$zver."'></script>\r\n"; 
			}
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/earcut.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/babylon.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/babylonjs.loaders.min.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/babylonjs.postProcess.min.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/babylon.gui.min.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/babylonjs.proceduralTextures.min.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/babylonjs.materials.min.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/babylon.accessibility.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/pep.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/meshwriter.min.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_input.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/actionzones/wtw_basicactionzones.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/actionzones/wtw_addactionzonelist.js?x=".$zver."'></script>\r\n";			
			$zjsdata .= "<script src='/core/scripts/actionzones/wtw_actionzonefunctions.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/coverings/wtw_basiccoverings.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/coverings/wtw_addcoveringlist.js?x=".$zver."'></script>\r\n";		
			$zjsdata .= "<script src='/core/scripts/molds/wtw_basicmolds.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/molds/wtw_addmoldlist.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/molds/wtw_3dblog.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/molds/wtw_3dforms.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/molds/wtw_3dhtml.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/automations/wtw_basicautomations.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/automations/wtw_addautomationlist.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/vehicles/wtw_vehicles.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_core.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_init.js?x=".$zver."'></script>\r\n";
			global $wtwplugins;
			$zjsdata .= $wtwplugins->getPluginScripts('0', $zver);
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadJSBrowseData=".$e->getMessage());
		}
		return $zjsdata;
	}

	public function loadCSSBrowseData() {
		/* loads the CSS stylesheets */
		global $wtwplugins;
		$zcssdata = "";
		try {	
			$zcssdata .= "<link rel='stylesheet' type='text/css' href='/core/styles/wtw_core.css' />\r\n";
			$zcssdata .= $wtwplugins->getPluginStylesheets('0');
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadCSSBrowseData=".$e->getMessage());
		}
		return $zcssdata;
	}
	
	public function loadMainElements() {
		/* these are the main page elements such as canvases and graphic helpers */
		$zmainelements = "";
		try {
			$zmainelements = "<div id='wtw_showmeshfps' class='wtw-hide'></div>\r\n";
			$zmainelements .= "<div id='wtw_iwalkarrow' class='wtw-hide'></div>\r\n";
			$zmainelements .= "<div id='wtw_iwalkarrow2' class='wtw-hide'></div>\r\n";
			$zmainelements .= "<div id='wtw_itooltip'></div>\r\n";
			$zmainelements .= "<canvas id='wtw_renderCanvas' ></canvas>\r\n";
			$zmainelements .= "<div id='wtw_greyout'></div>\r\n";
			$zmainelements .= "<div id='wtw_ibrowsediv' class='wtw-browsediv' style='display:none;' onclick='WTW.blockPassThrough();'>\r\n";
			$zmainelements .= "	<div id='wtw_browseheader' class='wtw-browseheader'>\r\n";
			$zmainelements .= "		<div id='wtw_browseheaderclose' class='wtw-browseclose' onclick='WTW.closeIFrame();'>\r\n";
			$zmainelements .= "			<img src='/content/system/images/menuclose.png' alt='Close' title='Close' onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
			$zmainelements .= "		</div>\r\n";
			$zmainelements .= "		<div id='wtw_browsetitle'></div>\r\n";
			$zmainelements .= "	</div>\r\n";
			$zmainelements .= "  <div id='wtw_ipagediv' class='wtw-ipagediv' onclick='WTW.blockPassThrough();'></div>\r\n";
			$zmainelements .= "	<iframe id='wtw_ibrowseframe' class='wtw-ibrowseframe' src='/core/pages/loading.php' onclick='WTW.blockPassThrough();'></iframe>\r\n";
			$zmainelements .= "</div>\r\n";
			$zmainelements .= "<div id='wtw_streaming' class='wtw-hide'></div>\r\n";
			$zmainelements .= "<div id='wtw_playerstats' class='wtw-playerstats'></div>\r\n";
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadMainElements=".$e->getMessage());
		}
		return $zmainelements;
	}
	
	public function loadHiddenFields() {
		/* these are used to pass information to and from the animated canvas and the database */
		$zhiddenfields = "";
		global $wtwuser;
		try {
			$zuploadmaxfilesize = ini_get('upload_max_filesize');
			$zpostmaxsize = ini_get('post_max_size');
			$zmemorylimit = ini_get('memory_limit');
			if (strpos(strtolower($zuploadmaxfilesize), 'm') !== false) {
				$zuploadmaxfilesize = str_replace('m','',strtolower($zuploadmaxfilesize));
				$zuploadmaxfilesize .= '000000';
				$zuploadmaxfilesize = $zuploadmaxfilesize * 1.024;
			}
			if (strpos(strtolower($zpostmaxsize), 'm') !== false) {
				$zpostmaxsize = str_replace('m','',strtolower($zpostmaxsize));
				$zpostmaxsize .= '000000';
				$zpostmaxsize = $zpostmaxsize * 1.024;
			}
			if (strpos(strtolower($zmemorylimit), 'm') !== false) {
				$zmemorylimit = str_replace('m','',strtolower($zmemorylimit));
				$zmemorylimit .= '000000';
				$zmemorylimit = $zmemorylimit * 1.024;
			}
			$zhiddenfields .= "<input type='hidden' id='upload_max_filesize' value='".$zuploadmaxfilesize."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='post_max_size' value='".$zpostmaxsize."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='memory_limit' value='".$zmemorylimit."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_serverinstanceid' value='".$this->serverinstanceid."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_serverip' value='".$this->serverip."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tusertoken' value='".$this->usertoken."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tglobaluserid' value='".$this->globaluserid."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tuserid' value='".$wtwuser->userid."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tuserip' value='".$wtwuser->userip."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tdisplayname' value=\"".addslashes($wtwuser->displayname)."\" />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tuseremail' value='".$wtwuser->email."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tuserimageurl' value='".$wtwuser->userimageurl."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tuseraccess' value=\"".$wtwuser->useraccess."\" />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tbabylonversion' value='".wtw_babylonversion."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tphysicsengine' value='".wtw_physicsengine."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_trootpath' value='".wtw_rootpath."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tcontentpath' value='".$wtwuser->contentpath."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tuploadpathid' value='".$wtwuser->uploadpathid."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tinstanceid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tglobaluseravatarid' value='' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tuseravatarid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tavatarid' value='' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tavataranimationevent' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tattachavatarmoldname' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldname' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tinvitationcode' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tfilepath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tfilename' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tfileitem' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tfileitemname' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tfileitemnamepath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tfileitempreviewname' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_helptab' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_ibrowsewidth' value='.9' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_ibrowseheight' value='.9' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tconnectinggridind' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tconnectinggridid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tconnectinggridname' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_eulaversion' value='0' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_eulaacceptdate' />\r\n";
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadHiddenFields=".$e->getMessage());
		}
		return $zhiddenfields;
	}
	
	public function loadTranslationArray() {
		/* Load Language translation files */
		try {
			$i = 0;
			$zdir = wtw_rootpath."/core/languages";
			if (is_dir($zdir)) {
				if ($zdh = opendir($zdir)) {
					while (($zfile = readdir($zdh)) !== false) {
						if ($zfile != '.' && $zfile != '..') {
							$zlanguageurl = $this->domainurl."/core/languages/".$zfile;
							$zlanguagedata = $this->openFilefromURL($zlanguageurl);
							$zlanguagedata = json_decode($zlanguagedata);
							if (isset($zlanguagedata[0]->translate) && isset($zlanguagedata[0]->language)) {
								if (strtolower($zlanguagedata[0]->language) == strtolower($this->defaultlanguage)) {
									$this->translation[$i] = $zlanguagedata[0];
									$i += 1;
								}
							}
						}
					}
					closedir($zdh);
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-loadTranslationArray=".$e->getMessage());
		}
	}	

	public function openFilefromURL($zfromurl, $zuseincludepath=false, $zcontext=null) {
		/* open file using any available method fopen, curl, or ftp (added soon) */
		$zresponse = null;
		try {
			$zfromurl = str_replace(' ', '%20', $zfromurl);
			if (ini_get('allow_url_fopen')) {
				$zresponse = file_get_contents($zfromurl, $zuseincludepath, $zcontext);
			} else if (extension_loaded('curl')) {
				$zresponse = curl_init($zfromurl);
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-openFilefromURL=".$e->getMessage());
		}
		return $zresponse;
	}
	
}

	function wtw() {
		return wtw::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtw'] = wtw();

	function shutdownOnError() {
		/* error trapping function */
		$zerror = error_get_last();
		if ($zerror != null) {
			$zerrors = array(
				E_PARSE,
				E_COMPILE_ERROR,
				E_RECOVERABLE_ERROR,
				E_ERROR,
				E_USER_ERROR
			);
			if (isset($zerror['type']) && in_array($zerror['type'], $zerrors, true)) {
				$zmessage = addslashes(str_replace("\n","",str_replace("\r","",$zerror['message'])));
				$zerror = "<script type='text/javascript'>";
				try {
					/* attempt to show error on page when available */
					$zerror .= "if (document.getElementById('wtw_error') != null) {";
					$zerror .= "document.getElementById('wtw_error').innerHTML = '".addslashes(str_replace("Stack trace","<br />Stack trace",$zmessage))."';";
					$zerror .= "WTW.openFullPageForm('error','Error Found');";
					$zerror .= "}";
				} catch (Exception $e) { }
				try {
					$zconn = new mysqli(wtw_dbserver, wtw_dbusername, base64_decode(wtw_dbpassword), wtw_dbname);
					if ($zconn->connect_error) {
						$zerror .= "console.log('Connection failed: ".str_replace("'","\'",$zconn->connect_error)."');";
					} else {
						/* write error to errorlog table */
						$zsql = "insert into ".wtw_tableprefix."errorlog 
								(message,
								 logdate)
								values
								('".addslashes(str_replace("'","\'",$zmessage))."',
								 '".date('Y-m-d H:i:s')."');";
						$zconn->query($zsql);
					}
					$zconn->close();
				} catch (Exception $e) { }
				$zerror .= "</script>";
				echo $zerror;
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
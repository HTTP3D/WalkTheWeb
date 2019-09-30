<?php
class wtwdb {
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
	
	public $userid = "";
	public $pagename = "";
	
	public function serror($message) {
		try {
			$this->query("
				insert into ".wtw_tableprefix."errorlog 
					(message,
					logdate)
					values
					('".addslashes($message)."',
					'".date('Y-m-d H:i:s')."');");
				try {
					if (isset($_SERVER['PHP_SELF']) && !empty($_SERVER['PHP_SELF'])) {
						$this->pagename = strtolower(basename($_SERVER['PHP_SELF']));
					} else {
						$this->pagename = "index.php";
					}
					if ($this->pagename == "admin.php") {
						$error = "<script type=\"text/javascript\">";
						$error .= "console.log('".addslashes($message)."');";
						$error .= "dGet('wtw_error').innerHTML = '".addslashes($message)."';";
						$error .= "WTW.openFullPageForm('error','Error Found');";
						$error .= "</script>";
						echo $error;
					}
				} catch (Exception $e) { }
		} catch (Exception $e) {
		}
	}
	
	public function query($sql) {
		$data = array();
		$num_rows = 0;
		try {
			if (!empty($sql) && isset($sql)) {
				$conn = new mysqli(wtw_dbserver, wtw_dbusername, wtw_dbpassword, wtw_dbname);
				if ($conn->connect_error) {
					$this->serror("core-functons-class_wtwdb.php-query=".$conn->connect_error);
				} else {
					$zresults = $conn->query($sql);
					if (is_object($zresults)) {
						if ($zresults->num_rows > 0) {
							while($zrow = $zresults->fetch_assoc()) {
								$data[$num_rows] = $zrow;
								$num_rows++;
							}
						}
					}
				}
				$conn->close();
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-query=".$e->getMessage());
		}	
		return $data;		
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
			$this->serror("core-functions-class_wtwdb.php-getRandomString=".$e->getMessage());
		}
		return $zrandomstring;
	}

	public function tableExists($tablename) {
		$exists = false;
		try {
			$zresults = $this->query("show tables like '".$tablename."';");
			if (count($zresults) > 0) {
				$exists = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-tableExists=".$e->getMessage());
		}			
		return $exists;
	}

	public function keyExists($tablename, $zfieldid, $zkeyid) {
		$exists = false;
		try {
			$zresults = $this->query("
				select ".$zfieldid." 
				from ".$tablename." 
				where ".$zfieldid."=".$zkeyid.";");
			if (count($zresults) > 0) {
				$exists = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-keyExists=".$e->getMessage());
		}			
		return $exists;
	}
	
	public function userExists($zuserid) {
		$exists = false;
		try {
			$zresults = $this->query("
				select userid 
				from ".wtw_tableprefix."users 
				where userid='".$zuserid."';");
			if (count($zresults) > 0) {
				$exists = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-userExists=".$e->getMessage());
		}			
		return $exists;
	}
	
	public function getSessionUserID() {
		$zuserid = "";
		try {
			if (!empty($_SESSION["wtw_userid"]) && isset($_SESSION["wtw_userid"])) {
				$this->userid = $_SESSION["wtw_userid"];
				$zuserid = $_SESSION["wtw_userid"];
			} else {
				$this->userid = "";
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getSessionUserID=" . $e->getMessage());
		}
		return $zuserid;
	}
	
	public function isUserInRole($zrole) {
		$zsuccess = false;
		try {
			$this->getSessionUserID();
			$zresults = $this->query("
				select ur1.userinroleid 
				from ".wtw_tableprefix."usersinroles ur1
					inner join ".wtw_tableprefix."roles r1
					on ur1.roleid=r1.roleid
					inner join ".wtw_tableprefix."users u1
					on ur1.userid=u1.userid
				where lower(r1.rolename)=lower('".$zrole."')
					and r1.deleted=0
					and ur1.deleted=0
					and u1.deleted=0;");
			foreach ($zresults as $zrow) {
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-isUserInRole=" . $e->getMessage());
		}
		return $zsuccess;
	}
	
	public function getUserRoles($zuserid = '') {
		$zroles = array();
		try {
			/* defaults to current user unless called with admin role access */
			if ($this->isUserInRole("admin")) {
				if (empty($zuserid) || !isset($zuserid)) {
					$zuserid = $this->getSessionUserID();
				}
			} else {
				$zuserid = $this->getSessionUserID();
			}
			if (!empty($this->getSessionUserID())) {
				$zresults = $this->query("
					select ur1.userinroleid,
						r1.roleid,
						r1.rolename
					from ".wtw_tableprefix."usersinroles ur1
						inner join ".wtw_tableprefix."roles r1
						on ur1.roleid=r1.roleid
						inner join ".wtw_tableprefix."users u1
						on ur1.userid=u1.userid
					where ur1.userid='".$zuserid."'
						and r1.deleted=0
						and ur1.deleted=0
						and u1.deleted=0
					order by r1.rolename, ur1.userinroleid;");
				foreach ($zresults as $zrow) {
					$zroles[] = array(
						'userinroleid' => $zrow["userinroleid"],
						'roleid' => $zrow["roleid"],
						'rolename' => $zrow["rolename"]);
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getUserRoles=" . $e->getMessage());
		}
		return $zroles;
	}

	public function hasPermission($zaccessrequired) {
		/* array of access required will be compared to array of current user roles */
		$zhaspermission = false;
		try {
			$zuserroles = $this->getUserRoles();
			if (empty($zaccessrequired) || !isset($zaccessrequired)) {
				/* null allows all */
				$zhaspermission = true;
			} else if (!empty($zuserroles) && isset($zuserroles)) {
				foreach ($zuserroles as $zrole) {
					foreach ($zaccessrequired as $zaccessrolename) {
						$zrolename = $zrole["rolename"];
						if (strtolower($zrolename) == strtolower($zaccessrolename)) {
							$zhaspermission = true;
						}
					}
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-hasPermission=" . $e->getMessage());
		}
		return $zhaspermission;
	}

	public function checkUpdateAccess($zcommunityid, $zbuildingid, $zthingid) {
		$hasaccess = false;
		try {
			global $wtwuser;
			$zresults = null;
			if (!empty($_SESSION["wtw_userid"]) && isset($_SESSION["wtw_userid"])) {
				$zuserid = $_SESSION["wtw_userid"];
				if ($this->userExists($zuserid)) {
					global $wtwuser;
					$this->userid = $zuserid;
					$wtwuser->userid = $zuserid;
				}
			}
			if (!empty($zcommunityid) && isset($zcommunityid)) {
				$zresults = $this->query("
					select userauthorizationid 
					from ".wtw_tableprefix."userauthorizations 
					where communityid='".$zcommunityid."'
						and userid='".$wtwuser->userid."'
						and (lower(useraccess)='admin'
						or lower(useraccess)='architect'
						or lower(useraccess)='graphics artist'
						or lower(useraccess)='developer')
					limit 1");
			}
			if (!empty($zresults) && isset($zresults)) {
				foreach ($zresults as $zrow) {
					$authorizationid = $zrow["userauthorizationid"];
					if (!empty($authorizationid) && isset($authorizationid)) {
						$hasaccess = true;
					}
				}
			}
			$zresults = null;
			if (!empty($zbuildingid) && isset($zbuildingid)) {
				$zresults = $this->query("
					select userauthorizationid 
					from ".wtw_tableprefix."userauthorizations 
					where buildingid='".$zbuildingid."'
						and userid='".$wtwuser->userid."'
						and (lower(useraccess)='admin'
						or lower(useraccess)='architect'
						or lower(useraccess)='graphics artist'
						or lower(useraccess)='developer')
					limit 1");
			}
			if (!empty($zresults) && isset($zresults)) {
				foreach ($zresults as $zrow) {
					$authorizationid = $zrow["userauthorizationid"];
					if (!empty($authorizationid) && isset($authorizationid)) {
						$hasaccess = true;
					}
				}
			}
			$zresults = null;
			if (!empty($zthingid) && isset($zthingid)) {
				$zresults = $this->query("
					select userauthorizationid 
					from ".wtw_tableprefix."userauthorizations 
					where thingid='".$zthingid."'
						and userid='".$wtwuser->userid."'
						and (lower(useraccess)='admin'
						or lower(useraccess)='architect'
						or lower(useraccess)='graphics artist'
						or lower(useraccess)='developer')
					limit 1");
			}
			if (!empty($zresults) && isset($zresults)) {
				foreach ($zresults as $zrow) {
					$authorizationid = $zrow["userauthorizationid"];
					if (!empty($authorizationid) && isset($authorizationid)) {
						$hasaccess = true;
					}
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwbuildings.php-checkUpdateAccess=".$e->getMessage());
		}
		return $hasaccess;
	}

	public function checkAdminAccess($zcommunityid, $zbuildingid, $zthingid) {
		$hasaccess = false;
		try {
			global $wtwuser;
			$zresults = null;
			if (!empty($_SESSION["wtw_userid"]) && isset($_SESSION["wtw_userid"])) {
				$zuserid = $_SESSION["wtw_userid"];
				if ($this->userExists($zuserid)) {
					global $wtwuser;
					$this->userid = $zuserid;
					$wtwuser->userid = $zuserid;
				}
			}
			if (!empty($zcommunityid) && isset($zcommunityid)) {
				$zresults = $this->query("
					select userauthorizationid 
					from ".wtw_tableprefix."userauthorizations 
					where communityid='".$zcommunityid."'
						and userid='".$wtwuser->userid."'
						and lower(useraccess)='admin'
					limit 1");
			}
			if (!empty($zresults) && isset($zresults)) {
				foreach ($zresults as $zrow) {
					$authorizationid = $zrow["userauthorizationid"];
					if (!empty($authorizationid) && isset($authorizationid)) {
						$hasaccess = true;
					}
				}
			}
			$zresults = null;
			if (!empty($zbuildingid) && isset($zbuildingid)) {
				$zresults = $this->query("
					select userauthorizationid 
					from ".wtw_tableprefix."userauthorizations 
					where buildingid='".$zbuildingid."'
						and userid='".$wtwuser->userid."'
						and lower(useraccess)='admin'
					limit 1");
			}
			if (!empty($zresults) && isset($zresults)) {
				foreach ($zresults as $zrow) {
					$authorizationid = $zrow["userauthorizationid"];
					if (!empty($authorizationid) && isset($authorizationid)) {
						$hasaccess = true;
					}
				}
			}
			$zresults = null;
			if (!empty($zthingid) && isset($zthingid)) {
				$zresults = $this->query("
					select userauthorizationid 
					from ".wtw_tableprefix."userauthorizations 
					where thingid='".$zthingid."'
						and userid='".$wtwuser->userid."'
						and lower(useraccess)='admin'
					limit 1");
			}
			if (!empty($zresults) && isset($zresults)) {
				foreach ($zresults as $zrow) {
					$authorizationid = $zrow["userauthorizationid"];
					if (!empty($authorizationid) && isset($authorizationid)) {
						$hasaccess = true;
					}
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwbuildings.php-checkAdminAccess=".$e->getMessage());
		}
		return $hasaccess;
	}
	
	public function getSetting($zsettingname) {
		$zsettingvalue = "";
		try {
			$zresults = $this->query("
				select * 
				from ".wtw_tableprefix."settings 
				where settingname='".$zsettingname."'
					and deleted=0;");
			foreach ($zresults as $zrow) {
				$zsettingvalue = $zrow["settingvalue"];
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getSetting=".$e->getMessage());
		}			
		return $zsettingvalue;
	}

	public function saveSetting($zsettingname, $zsettingvalue) {
		$zsuccess = true;
		try {
			$zsettingid = 0;
			$zresults = $this->query("
				select * 
				from ".wtw_tableprefix."settings 
				where settingname='".$zsettingname."'
					and deleted=0;");
			foreach ($zresults as $zrow) {
				$zsettingid = $zrow["settingid"];
			}
			if (!empty($zsettingid) && isset($zsettingid)) {
				$this->query("
					update ".wtw_tableprefix."settings 
					set settingvalue='".$zsettingvalue."',
						updatedate=now(),
						updateuserid='".$this->userid."'
					where settingid=".$zsettingid.";");
			} else {
				$this->query("
					insert into ".wtw_tableprefix."settings 
						(settingname,
						 settingvalue,
						 createdate,
						 createuserid,
						 updatedate,
						 updateuserid)
						values
						('".$zsettingname."',
						 '".$zsettingvalue."',
						 now(),
						 '".$this->userid."',
						 now(),
						 '".$this->userid."')
						;");
			}
		} catch (Exception $e) {
			$zsuccess = false;
			$this->serror("core-functions-class_wtwdb.php-saveSetting=".$e->getMessage());
		}			
		return $zsuccess;
	}

	public function getSettings($zsettingnames) {
		$zsettingvalues = array();
		try {
			if (!is_array($zsettingnames) && !is_object($zsettingnames)) {
				if (strpos($zsettingnames, ',')) {
					$zsettingnames = explode(',', $zsettingnames);
					
				} else {
					$zsettingnames[0] = $zsettingnames;
				}
			}
			foreach ($zsettingnames as $zsettingname) {
				$zsettingname = trim($zsettingname);
				if (!empty($zsettingname) && isset($zsettingname)) {
					$zresults = $this->query("
						select * 
						from ".wtw_tableprefix."settings 
						where settingname='".$zsettingname."'
							and deleted=0;");
					if (count($zresults) > 0) {
						foreach ($zresults as $zrow) {
							$zsettingvalues[$zsettingname] = $zrow["settingvalue"];
						}
					} else {
						$zsettingvalues[$zsettingname] = '';
					}
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getSettings=".$e->getMessage());
		}			
		return $zsettingvalues;
	}
	
	public function saveSettings($zsettings) {
		$zsuccess = true;
		try {
			if (!empty($zsettings) && isset($zsettings)) {
				$zsettings = json_decode($zsettings);
				foreach ($zsettings as $zsettingname=>$zsettingvalue) {
					$zsuccess1 = $this->saveSetting($zsettingname, $zsettingvalue);
					if ($zsuccess1 == false) {
						$zsuccess = false;
					}
				}
			} else {
				$zsuccess = false;
			}
		} catch (Exception $e) {
			$zsuccess = false;
			$this->serror("core-functions-class_wtwdb.php-saveSettings=".$e->getMessage());
		}			
		return $zsuccess;
	}
	
	public function getVal($key, $defaultval) {
		$value = $defaultval;
		try {
			if(isset($_GET[$key])) {
				$value = $_GET[$key];
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getval=".$e->getMessage());
		}
		return $value;
	}

	public function getNumber($key, $defaultval) {
		$value = $defaultval;
		try {
			if(isset($_GET[$key])) {
				if (is_numeric($_GET[$key])) {
					$value = $_GET[$key];
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getNumber=".$e->getMessage());
		}
		return $value;
	}
	
	public function checkIDFormat($zid) {
		$validid = "";
		try {
			$zid = addslashes($zid);
			if (preg_match('/[a-zA-Z0-9]/', $zid) == false) {
				$zid = "";
			}
			if (strlen($zid) == 16) {
				$validid = $zid;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkIDFormat=".$e->getMessage());
		}			
		return $validid;
	}

	public function checkNumber($val, $defaultval) {
		$checkval = $defaultval;
		try {
			if (isset($val)) {
				if (is_numeric($val)) {
					$checkval = $val;
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkNumber=".$e->getMessage());
		}
		return $checkval;
	}
	
	public function checkAlphaNumeric($zid) {
		$validid = "";
		try {
			$zid = addslashes($zid);
			if (preg_match('/[a-zA-Z0-9_-]/', $zid)) {
				$validid = $zid;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkAlphaNumeric=".$e->getMessage());
		}			
		return $validid;
	}

	public function checkFolderPath($zurl) {
		$validurl = "";
		try {
			if (preg_match('/[a-zA-Z0-9_.-/:]/', $zurl)) {
				$validurl = $zurl;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkFolderPath=".$e->getMessage());
		}			
		return $validurl;
	}

	public function checkFileName($zid) {
		$validid = "";
		try {
			$zid = addslashes($zid);
			if (preg_match('/[a-zA-Z0-9_.-]/', $zid)) {
				$validid = $zid;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkFileName=".$e->getMessage());
		}			
		return $validid;
	}

	public function checkFunctionName($zid) {
		$validid = "";
		try {
			$zid = addslashes($zid);
			if (preg_match('/[a-zA-Z0-9_.]/', $zid)) {
				$validid = $zid;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkFunctionName=".$e->getMessage());
		}			
		return $validid;
	}

	public function checkPublishName($zdomainname, $zwebtype, $zpublishname) {
		$exists = false;
		try {
			$sql = "
				select webaliasid
				from ".wtw_tableprefix."webaliases
				where domainname='".$zdomainname."'
					and deleted=0 ";
			switch ($zwebtype) {
				case "community":
					$sql .= " and (communitypublishname='".$zpublishname."' or communityid='".$zpublishname."') ";
					break;
				case "building":
					$sql .= " and (buildingpublishname='".$zpublishname."' or buildingid='".$zpublishname."') ";
					break;
				case "thing":
					$sql .= " and (thingpublishname='".$zpublishname."' or thingid='".$zpublishname."') ";
					break;
			}
			$sql .=	"order by createdate limit 1;";
			$zresults = $this->query($sql);
			if (count($zresults) > 0) {
				$exists = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkPublishName=".$e->getMessage());
		}			
		return $exists;
	}

	public function prepCheckDate($zdate) {
		/* returns either 'dateformatted' or NULL - ready to be used in SQL */
		$zdatestring = "";
		try {
			$zdatepart  = explode('/', $zdate);
			if (count($zdatepart) == 3) {
				if (checkdate($zdatepart[0], $zdatepart[1], $zdatepart[2])) {
					$zdatestring = "'".$zdate."'";
				}
			} else {
				$zformat = 'Y-m-d H:i:s';
				$zvaliddate = DateTime::createFromFormat($zformat, $zdate);
				if ($zvaliddate && $zvaliddate->format($zformat) == $zdate) {
					$zdatestring = "'".$zdate."'";
				}
			}
			if (empty($zdatestring)) {
				$zdatestring = "null";
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-prepCheckDate=".$e->getMessage());
		}			
		return $zdatestring;
	}
	
	public function escapeHTML($text) {
		$checktext = "";
		try {
			if (!empty($text) && isset($text)) {
				$checktext = htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-escapeHTML=" . $e->getMessage());
		}
		return $checktext;
	}
	
	public function confirmKey($zkey, $zmoldgroup, $zwebid) {
		global $wtwdb;
		$zsuccess = false;
		try {
			if (!empty($zkey) && isset($zkey)) {
				$zkey = base64_decode($zkey);
				$sharehash = "";
				$zresults = array();
				switch ($zmoldgroup) {
					case "community":
						$zresults = $wtwdb->query("
							select sharehash
							from ".wtw_tableprefix."communities
							where communityid='".$zwebid."';");
						break;
					case "building":
						$zresults = $wtwdb->query("
							select sharehash
							from ".wtw_tableprefix."buildings
							where buildingid='".$zwebid."';");
						break;
					case "thing":
						$zresults = $wtwdb->query("
							select sharehash
							from ".wtw_tableprefix."things
							where thingid='".$zwebid."';");
						break;
				}
				foreach ($zresults as $zrow) {
					$sharehash = $zrow["sharehash"];
				}
				if (!empty($zkey) && isset($zkey) && !empty($sharehash) && isset($sharehash)) {
					if (password_verify($zkey, $sharehash)) {
						$zsuccess = true;
					}
				}
			}
			switch ($zmoldgroup) {
				case "community":
					$zresults = $wtwdb->query("
						update ".wtw_tableprefix."communities
						set sharehash = ''
						where communityid='".$zwebid."';");
					break;
				case "building":
					$zresults = $wtwdb->query("
						update ".wtw_tableprefix."buildings
						set sharehash = ''
						where buildingid='".$zwebid."';");
					break;
				case "thing":
					$zresults = $wtwdb->query("
						update ".wtw_tableprefix."things
						set sharehash = ''
						where thingid='".$zwebid."';");
					break;
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwdb.php-confirmKey=".$e->setKeyHash());
		}
		return $zsuccess;
	}

	public function trackPageView($currentpage) {
		$zsuccess = false;
		try {
			if (defined('wtw_googleanalytics')) {
				$currentpage = $currentpage;
				$curl_handle=curl_init();
				curl_setopt($curl_handle, CURLOPT_URL,'http://www.google-analytics.com/collect/v=1&tid='.wtw_googleanalytics.'&cid=555&t=pageview&dp='.$currentpage);
				curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 2);
				curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($curl_handle, CURLOPT_USERAGENT, 'Geoip tracker');
				$query = curl_exec($curl_handle);
				curl_close($curl_handle);
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-trackPageView=".$e->getMessage());
		}
		return $zsuccess;
	}
}

	function wtwdb() {
		return wtwdb::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwdb'] = wtwdb();
?>
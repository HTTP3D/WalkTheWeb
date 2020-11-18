<?php
class wtwdb {
	/* main $wtwdb class for WalkTheWeb database functions */
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {

	}	

	public function __call ($zmethod, $zarguments)  {
		if (isset($this->$zmethod)) {
			call_user_func_array($this->$zmethod, array_merge(array(&$this), $zarguments));
		}
	}
	
	/* declare public $wtwdb variables */
	public $userid = "";
	public $pagename = "";
	
	public function serror($zmessage) {
		try {
			$this->query("
				insert into ".wtw_tableprefix."errorlog 
					(message,
					logdate)
					values
					('".addslashes($zmessage)."',
					'".date('Y-m-d H:i:s')."');");
				try {
					if (isset($_SERVER['PHP_SELF']) && !empty($_SERVER['PHP_SELF'])) {
						$this->pagename = strtolower(basename($_SERVER['PHP_SELF']));
					} else {
						$this->pagename = "index.php";
					}
					if ($this->pagename == "admin.php") {
						$zerror = "<script type=\"text/javascript\">";
						$zerror .= "console.log('".addslashes($zmessage)."');";
						$zerror .= "dGet('wtw_error').innerHTML = '".addslashes($zmessage)."';";
						$zerror .= "WTW.openFullPageForm('error','Error Found');";
						$zerror .= "</script>";
						echo $zerror;
					}
				} catch (Exception $e) { }
		} catch (Exception $e) {
		}
	}
	
	public function query($zsql) {
		$zdata = array();
		$znum_rows = 0;
		try {
			if (!empty($zsql) && isset($zsql)) {
				$conn = new mysqli(wtw_dbserver, wtw_dbusername, base64_decode(wtw_dbpassword), wtw_dbname);
				if ($conn->connect_error) {
					$this->serror("core-functons-class_wtwdb.php-query=".$conn->connect_error);
				} else {
					$zresults = $conn->query($zsql);
					if (is_object($zresults)) {
						if ($zresults->num_rows > 0) {
							while($zrow = $zresults->fetch_assoc()) {
								$zdata[$znum_rows] = $zrow;
								$znum_rows++;
							}
						}
					}
				}
				$conn->close();
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-query=".$e->getMessage());
		}	
		return $zdata;		
	}
	
	public function deltaCreateTable($zsql) {
		/* accepts a CREATE TABLE mysql statement and compares it to existing table (if it exists) and creates or updates the table schema */
		try {
			$ztable = "";
			$zsql = str_replace("\n","",str_replace("\r","",$zsql));
			while (strpos($zsql,"  ") !== false) {
				$zsql = str_replace("  "," ",$zsql);
			}
			$zsqlsegments = explode("(",$zsql);
			foreach ($zsqlsegments as $zsqlpart) {
				if (strpos(strtolower($zsqlpart),"create table") !== false) {
					$zwords = explode(" ",strtolower(trim($zsqlpart)));
					foreach ($zwords as $zword) {
						if (isset($zword) && !empty($zword) && $zword != "create" && $zword != "table" && empty($ztable)) {
							$ztable = str_replace("`","",$zword);
						}
					}
				}
			}
			$znewfields = array();
			$zprimarykey = "";
			$zuniquekey = "";
			$zuniquekeyname = "";
			$zindexkey = "";
			$zsqlfields = explode(",",strtolower(str_replace("`","",$zsql)));
			$zlastline = "";
			foreach ($zsqlfields as $zline) {
				if (strpos($zline,"create table") !== false && strpos($zline,"(") !== false) {
					$zlineparts = explode("(",$zline);
					$zline = $zlineparts[1]."(".$zlineparts[2];
				}
				if (strpos($zline,"decimal") !== false) {
					$zlastline = $zline;
				} else {
					if (!empty($zlastline)) {
						$zline = $zlastline.",".$zline;
					}
					$zlastline = "";
					$zline = trim(str_replace("  "," ",$zline));
					if (strpos($zline,"primary key") === false && strpos($zline,"unique key") === false) {
						$znewfield = "";
						$znewtype = "";
						$znewnull = "yes";
						$znewprikey = "";
						$znewdefault = "";
						$znewextra = "";
						$zwords = explode(" ",$zline);
						if (!empty($zwords[0]) && isset($zwords[0])) {
							if ($zwords[0] != "key") {
								$znewfield = $zwords[0];
							}
						}
						if (!empty($zwords[1]) && isset($zwords[1])) {
							
							$znewtype = $zwords[1];
						}
						if (strpos($zline,"not null") !== false) {
							$znewnull = "no";
						}
						if (strpos($zline," default ") !== false) {
							$zlineparts = explode(" default ",$zline);
							if (!empty($zlineparts[1]) && isset($zlineparts[1])) {
								if (strpos($zlineparts[1],"'") !== false) {
									$zdefaults = explode("'",$zlineparts[1]);
									if (isset($zdefaults[1])) {
										$znewdefault = $zdefaults[1];
									}
								} else if (strpos($zlineparts[1]," ") !== false) {
									$zdefaults = explode(" ",$zlineparts[1]);
									if (isset($zdefaults[0])) {
										$znewdefault = $zdefaults[0];
									}
								} else {
									$znewdefault = $zlineparts[1];
								}
							}
						}
						if (strpos($zline,"auto_increment") !== false) {
							$znewextra = "auto_increment";
						}
						$znewfields[count($znewfields)] = array(
							'field' => $znewfield,
							'type' => $znewtype,
							'null' => $znewnull,
							'prikey' => $znewprikey,
							'default' => $znewdefault,
							'extra' => $znewextra,
							'found' => '0'
						);
					} else if (strpos($zline,"primary key") !== false) {
						$zprimarykey = str_replace(" ","",str_replace("(","",str_replace(")","",str_replace("primary key","",$zline))));
					} else if (strpos($zline,"unique key") !== false) {
						$zuniquekey = str_replace("unique key","",$zline);
						if (strpos($zuniquekey,")") !== false) {
							$zlineparts = explode(")",$zuniquekey);
							$zuniquekey = trim($zlineparts[0]).")";
						} else {
							$zuniquekey = "";
						}
						if (strpos($zuniquekey,"(") !== false) {
							$zlineparts = explode("(",$zuniquekey);
							$zuniquekeyname = trim($zlineparts[0]);
						} else {
							$zuniquekeyname = trim($zuniquekey);
						}
					}
				}
			}
			if (strpos($zsql,"key ") !== false) {
				$zsqlparts = explode(")",strtolower($zsql));
				foreach ($zsqlparts as $zline) {
					if (strpos($zline,"key ") !== false && strpos($zline,"primary key ") === false && strpos($zline,"unique key ") === false) {
						$zlineparts = explode("key ",$zline);
						$zindexkey = $zlineparts[1].")";
					}
				}
			}
			
			/* check if table already exists */
			if ($this->tableExists($ztable)) {
				$znewprimarysql = "";
				$znewuniquesql = "";
				$znewindexsql = "";
				/* look up existing table schema and check fields, update or insert where necessary */
				$zresults = $this->query("
					describe `".$ztable."`");
				foreach ($zresults as $zrow) {
					$zfield = "";
					$ztype = "";
					$znull = "yes";
					$zprikey = "";
					$zdefault = "";
					$zextra = "";
					foreach ($zrow as $zkey=>$zvalue) { 
						switch (strtolower($zkey)) {
							case "field":
								$zfield = strtolower($zvalue);
								break;
							case "type":
								$ztype = strtolower($zvalue);
								break;
							case "null":
								$znull = strtolower($zvalue);
								break;
							case "key":
								$zprikey = strtolower($zvalue);
								break;
							case "default":
								$zdefault = strtolower($zvalue);
								break;
							case "extra":
								$zextra = strtolower($zvalue);
								break;
						}
					}
					$foundfield = false;
					for ($i=0; $i < count($znewfields); $i++) {
						if ($znewfields[$i]["field"] == $zfield) {
							$zneedsupdate = false;
							$foundfield = true;
							$znewfields[$i]["found"] = '1';
							if ($zfield == $zprimarykey) {
								$znewfields[$i]["prikey"] = "pri";
							}
							if ($znewfields[$i]["type"] != $ztype) {
								$zneedsupdate = true;
							}
							if ($znewfields[$i]["null"] != $znull) {
								$zneedsupdate = true;
							}
							if ($znewfields[$i]["prikey"] != $zprikey) {
								$this->query("alter table ".$ztable." drop primary key;");
								$znewprimarysql = "alter table ".$ztable." add primary key (".$zprimarykey.");";
								if (empty($znewfields[$i]["prikey"]) && !empty($zprikey)) {
									$znewuniquesql = "alter table ".$ztable." add unique ".$zuniquekey.";";
									if (!empty($zindexkey)) {
										$znewindexsql = "alter table ".$ztable." add index ".$zindexkey.";";
									}
								}
								$zneedsupdate = true;
							}
							if ($znewfields[$i]["default"] != $zdefault && $znewfields[$i]["default"] != 'null' && $zdefault != '') {
								$zneedsupdate = true;
							}
							if ($znewfields[$i]["extra"] != $zextra) {
								$zneedsupdate = true;
							}
							if ($zneedsupdate) {
								/* field changed, update field */
								$zsql = "alter table ".$ztable." modify column ".$zfield." ".$znewfields[$i]["type"];
								if ($znewfields[$i]["null"] == "no") {
									$zsql .= " not null";
								}
								if (isset($znewfields[$i]["default"])) {
									if (strpos($znewfields[$i]["default"],"null") !== false) {
										$zsql .= " default null";
									} else {
										$zsql .= " default '".$znewfields[$i]["default"]."'";
									}
								}
								if (!empty($znewfields[$i]["extra"])) {
									$zsql .= " ".$znewfields[$i]["extra"];
								}
								$zsql .= ";";
								$this->query($zsql);
							}
						}
					}
					if ($foundfield == false) {
						/* field no longer in use, consider deleting field... not sure if I want to automate this...*/
					}
				}
				
				for ($i=0; $i < count($znewfields); $i++) {
					if ($znewfields[$i]["found"] == '0') {
						/* insert new field */
						$zsql = "alter table ".$ztable." add column ".$znewfields[$i]["field"]." ".$znewfields[$i]["type"];
						if ($znewfields[$i]["null"] == "no") {
							$zsql .= " not null";
						}
						if (isset($znewfields[$i]["default"])) {
							if (strpos($znewfields[$i]["default"],"null") !== false) {
								$zsql .= " default null";
							} else {
								$zsql .= " default '".$znewfields[$i]["default"]."'";
							}
						}
						if (!empty($znewfields[$i]["extra"])) {
							$zsql .= " ".$znewfields[$i]["extra"];
						}
						$zsql .= ";";
						$this->query($zsql);
					}
				}
				if (!empty($znewprimarysql)) {
					$this->query($znewprimarysql);
				}
				if (!empty($znewuniquesql) || !empty($znewindexsql)) {
					$zresults = $this->query("show index from ".$ztable.";");
					foreach ($zresults as $zrow) {
						$this->query("
							alter table ".$ztable." 
							drop index ".$zrow["Key_name"].";");
					}
					if (!empty($znewuniquesql)) {
						$this->query($znewuniquesql);
					}
					if (!empty($znewindexsql)) {
						$this->query($znewindexsql);
					}
				}
			} else {
				/* execute create statement */
				$this->query($zsql);
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-deltaCreateTable=".$e->getMessage());
		}	
	}
	
	public function getRandomString($zlength, $zstringtype) {
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

	public function tableExists($ztablename) {
		$zexists = false;
		try {
			$zresults = $this->query("show tables like '".$ztablename."';");
			if (count($zresults) > 0) {
				$zexists = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-tableExists=".$e->getMessage());
		}			
		return $zexists;
	}

	public function keyExists($ztablename, $zfieldid, $zkeyid) {
		$zexists = false;
		try {
			$zresults = $this->query("
				select ".$zfieldid." 
				from ".$ztablename." 
				where ".$zfieldid."=".$zkeyid.";");
			if (count($zresults) > 0) {
				$zexists = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-keyExists=".$e->getMessage());
		}			
		return $zexists;
	}
	
	public function getNewKey($ztablename, $zfieldid, $zdefaultkeyid) {
		/* pass the tablename without prefix, id field name, and (optional) if you want a starting test value */
		$zkeyid = '';
		try {
			if (empty($zdefaultkeyid) || !isset($zdefaultkeyid)) {
				$zdefaultkeyid = $this->getRandomString(16,1);
			}
			while (empty($zkeyid)) {
				$zresults = $this->query("
					select ".$zfieldid." 
					from ".wtw_tableprefix.$ztablename." 
					where ".$zfieldid."='".$zdefaultkeyid."';");
				if (count($zresults) == 0) {
					$zkeyid = $zdefaultkeyid;
				} else if ($ztablename == 'users') {
					$zkeyid = $zdefaultkeyid;
				} else {
					$zkeyid = $this->getRandomString(16,1);
					while ($this->keyExists($ztablename, $zfieldid, $zkeyid)) {
						$zkeyid = $this->getRandomString(16,1);
					}
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getNewKey=".$e->getMessage());
		}			
		return $zkeyid;
	}
	
	public function getIDByPastID($ztablename, $zfieldid, $zpastfieldid, $zpastid) {
		$zkeyid = '';
		try {
			if (!empty($zpastid) && isset($zpastid)) {
				$zresults = $this->query("
					select ".$zfieldid." 
					from ".wtw_tableprefix.$ztablename." 
					where ".$zpastfieldid."='".$zpastid."'
					order by updatedate desc
					limit 1;");
				foreach ($zresults as $zrow) {
					$zkeyid = $zrow[$zfieldid];
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getIDByPastID=".$e->getMessage());
		}
		return $zkeyid;
	}
	
	public function getUserIDfromPastID($zpastid) {
		$zkeyid = '';
		try {
			if (!empty($zpastid) && isset($zpastid)) {
				$zresults = $this->query("
					select userid 
					from ".wtw_tableprefix."users 
					where pastuserid='".$zpastid."'
						or (userid='".$zpastid."' and pastuserid='')
					order by updatedate desc
					limit 1;");
				foreach ($zresults as $zrow) {
					$zkeyid = $zrow["userid"];
				}
			}
			if (empty($zkeyid)) {
				$zkeyid = $zpastid;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getUserIDfromPastID=".$e->getMessage());
		}
		return $zkeyid;
	}
	
	public function tableFieldExists($ztable, $zfield) {
		$zexists = false;
		try {
			$zresults = $this->query("
				show columns
				from ".wtw_tableprefix.$ztable." 
				like '".$zfield."';");
			if (count($zresults) > 0) {
				$zexists = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-tableFieldExists=".$e->getMessage());
		}			
		return $zexists;
	}
	
	public function userExists($zuserid) {
		$zexists = false;
		try {
			$zresults = $this->query("
				select userid 
				from ".wtw_tableprefix."users 
				where userid='".$zuserid."';");
			if (count($zresults) > 0) {
				$zexists = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-userExists=".$e->getMessage());
		}			
		return $zexists;
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
		$zhasaccess = false;
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
					$zauthorizationid = $zrow["userauthorizationid"];
					if (!empty($zauthorizationid) && isset($zauthorizationid)) {
						$zhasaccess = true;
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
					$zauthorizationid = $zrow["userauthorizationid"];
					if (!empty($zauthorizationid) && isset($zauthorizationid)) {
						$zhasaccess = true;
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
					$zauthorizationid = $zrow["userauthorizationid"];
					if (!empty($zauthorizationid) && isset($zauthorizationid)) {
						$zhasaccess = true;
					}
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwbuildings.php-checkUpdateAccess=".$e->getMessage());
		}
		return $zhasaccess;
	}

	public function checkAdminAccess($zcommunityid, $zbuildingid, $zthingid) {
		$zhasaccess = false;
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
					$zauthorizationid = $zrow["userauthorizationid"];
					if (!empty($zauthorizationid) && isset($zauthorizationid)) {
						$zhasaccess = true;
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
					$zauthorizationid = $zrow["userauthorizationid"];
					if (!empty($zauthorizationid) && isset($zauthorizationid)) {
						$zhasaccess = true;
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
					$zauthorizationid = $zrow["userauthorizationid"];
					if (!empty($zauthorizationid) && isset($zauthorizationid)) {
						$zhasaccess = true;
					}
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwbuildings.php-checkAdminAccess=".$e->getMessage());
		}
		return $zhasaccess;
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
				where settingname='".$zsettingname."';");
			foreach ($zresults as $zrow) {
				$zsettingid = $zrow["settingid"];
			}
			if (isset($zsettingid) && !empty($zsettingid)) {
				$this->query("
					update ".wtw_tableprefix."settings 
					set settingvalue='".$zsettingvalue."',
						updatedate=now(),
						updateuserid='".$this->userid."',
						deleteddate=null,
						deleteduserid='',
						deleted=0
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
						 '".$this->userid."');");
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
				if (isset($zsettingname)) {
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
	
	public function decode64($ztext) {
		/* attempt to base64_decode the text, if not, return blank */
		try {
			if (!empty($ztext) && isset($ztext)) {
				$ztext = base64_decode($ztext);
			} else {
				$ztext = '';
			}
		} catch (Exception $e) {
			$ztext = '';
		}			
		return $ztext;
	}
	
	public function getPost($zfield, $zdefault) {
		/* get the posed data with a fall back default value */
		$zvalue = $zdefault;
		try {
			if (isset($_POST[$zfield])) {
				$zvalue = $_POST[$zfield];
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getPost=".$e->getMessage());
		}
		return $zvalue;
	}

	public function getFiles($zfield, $zdefault) {
		/* get the posed file data with a fall back default value */
		$zvalue = $zdefault;
		try {
			if (isset($_FILES[$zfield])) {
				$zvalue = $_FILES[$zfield];
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getFiles=".$e->getMessage());
		}
		return $zvalue;
	}

	public function getVal($zkey, $zdefaultval) {
		$zvalue = $zdefaultval;
		try {
			if(isset($_GET[$zkey])) {
				$zvalue = $_GET[$zkey];
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getval=".$e->getMessage());
		}
		return $zvalue;
	}

	public function getNumber($zkey, $zdefaultval) {
		$zvalue = $zdefaultval;
		try {
			if(isset($_GET[$zkey])) {
				if (is_numeric($_GET[$zkey])) {
					$zvalue = $_GET[$zkey];
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getNumber=".$e->getMessage());
		}
		return $zvalue;
	}
	
	public function checkIDFormat($zid) {
		$zvalidid = "";
		try {
			$zid = addslashes($zid);
			if (preg_match('/[a-zA-Z0-9]/', $zid) == false) {
				$zid = "";
			}
			if (strlen($zid) == 16) {
				$zvalidid = $zid;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkIDFormat=".$e->getMessage());
		}			
		return $zvalidid;
	}

	public function checkNumber($zval, $zdefaultval) {
		$zcheckval = $zdefaultval;
		try {
			if (isset($zval)) {
				if (is_numeric($zval)) {
					$zcheckval = $zval;
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkNumber=".$e->getMessage());
		}
		return $zcheckval;
	}
	
	public function checkAlphaNumeric($zid) {
		$zvalidid = "";
		try {
			$zid = addslashes($zid);
			if (preg_match('/[a-zA-Z0-9_-]/', $zid)) {
				$zvalidid = $zid;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkAlphaNumeric=".$e->getMessage());
		}			
		return $zvalidid;
	}

	public function checkDisplayName($zid, $zdefault) {
		$zvalidid = $zdefault;
		try {
			$zid = str_replace(" ","",addslashes($zid));
			if (preg_match('/[a-zA-Z0-9_-]/', $zid)) {
				$zvalidid = $zid;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkDisplayName=".$e->getMessage());
		}			
		return $zvalidid;
	}

	public function checkFolderPath($zurl) {
		$zvalidurl = "";
		try {
			if (preg_match('/[a-zA-Z0-9_.-\/\:]/', $zurl)) {
				$zvalidurl = $zurl;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkFolderPath=".$e->getMessage());
		}			
		return $zvalidurl;
	}

	public function checkFileName($zid) {
		$zvalidid = "";
		try {
			$zid = addslashes($zid);
			if (preg_match('/[a-zA-Z0-9_.-]/', $zid)) {
				$zvalidid = $zid;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkFileName=".$e->getMessage());
		}			
		return $zvalidid;
	}

	public function checkFunctionName($zid) {
		$zvalidid = "";
		try {
			$zid = addslashes($zid);
			if (preg_match('/[a-zA-Z0-9_.]/', $zid)) {
				$zvalidid = $zid;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkFunctionName=".$e->getMessage());
		}			
		return $zvalidid;
	}

	public function checkPublishName($zdomainname, $zwebtype, $zpublishname) {
		$zexists = false;
		try {
			$zsql = "
				select webaliasid
				from ".wtw_tableprefix."webaliases
				where domainname='".$zdomainname."'
					and deleted=0 ";
			switch ($zwebtype) {
				case "community":
					$zsql .= " and (communitypublishname='".$zpublishname."' or communityid='".$zpublishname."') ";
					break;
				case "building":
					$zsql .= " and (buildingpublishname='".$zpublishname."' or buildingid='".$zpublishname."') ";
					break;
				case "thing":
					$zsql .= " and (thingpublishname='".$zpublishname."' or thingid='".$zpublishname."') ";
					break;
			}
			$zsql .=	"order by createdate limit 1;";
			$zresults = $this->query($zsql);
			if (count($zresults) > 0) {
				$zexists = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-checkPublishName=".$e->getMessage());
		}			
		return $zexists;
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
	
	public function escapeHTML($ztext) {
		$zchecktext = "";
		try {
			if (!empty($ztext) && isset($ztext)) {
				$zchecktext = htmlspecialchars($ztext, ENT_QUOTES, 'UTF-8');
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-escapeHTML=" . $e->getMessage());
		}
		return $zchecktext;
	}
	
	public function getHexFromRGB($zred, $zgreen, $zblue) {
		$zhex = "";
		try {
			if (is_numeric($zred)) {
				$zred = $zred * 255;
			} else {
				$zred = 255;
			}
			if (is_numeric($zgreen)) {
				$zgreen = $zgreen * 255;
			} else {
				$zgreen = 255;
			}
			if (is_numeric($zblue)) {
				$zblue = $zblue * 255;
			} else {
				$zblue = 255;
			}
			$zhex =  sprintf("#%02x%02x%02x", $zred, $zgreen, $zblue);
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getHexFromRGB=" . $e->getMessage());
		}
		return $zhex;
	}
	
	public function confirmKey($zkey, $zwebtype, $zwebid) {
		global $wtwdb;
		$zsuccess = false;
		try {
			if (!empty($zkey) && isset($zkey)) {
				$zkey = $this->decode64($zkey);
				$zsharehash = "";
				$zresults = array();
				switch ($zwebtype) {
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
					$zsharehash = $zrow["sharehash"];
				}
				if (!empty($zkey) && isset($zkey) && !empty($zsharehash) && isset($zsharehash)) {
					if (password_verify($zkey, $zsharehash)) {
						$zsuccess = true;
					}
				}
			}
			switch ($zwebtype) {
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

	public function getobjectanimations($zuploadobjectid) {
		$zobjectanimations = array();
		try {
			$zresults = $this->query("
			    select a1.*,
					case when a1.soundid = '' then ''
						else
							(select filepath 
								from ".wtw_tableprefix."uploads 
								where uploadid=a1.soundid limit 1)
						end as soundpath,
					case when a1.moldevent='onload' then '2'
						when a1.moldevent='' then '0'
						else '1'
					end as sorder
				from ".wtw_tableprefix."uploadobjectanimations a1
				where a1.uploadobjectid='".$zuploadobjectid."'
					and a1.deleted=0
				order by sorder, a1.moldevent, a1.animationname, a1.objectanimationid;");
			$i = 0;
			foreach ($zresults as $zrow) {
				$zobjectanimations[$i] = array(
					'objectanimationid'=> $zrow['objectanimationid'],
					'animationname'=> $zrow['animationname'],
					'moldevent'=> $zrow['moldevent'],
					'moldnamepart'=> $zrow['moldnamepart'],
					'startframe'=> $zrow['startframe'],
					'endframe'=> $zrow['endframe'],
					'animationloop'=> $zrow['animationloop'],
					'speedratio'=> $zrow['speedratio'],
					'additionalscript'=> $zrow['additionalscript'],
					'additionalparameters'=> $zrow['additionalparameters'],
					'animationendscript'=> $zrow['animationendscript'],
					'animationendparameters'=> $zrow['animationendparameters'],
					'stopcurrentanimations'=> $zrow['stopcurrentanimations'],
					'soundid'=> $zrow['soundid'],
					'soundpath'=> $zrow['soundpath'],
					'soundmaxdistance'=> $zrow['soundmaxdistance']
				);
				$i += 1;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getobjectanimations=".$e->getMessage());
		}
		return $zobjectanimations;
	}

	public function getwebimages($zthingmoldid, $zbuildingmoldid, $zcommunitymoldid, $zgraphiclevel) {
		$zwebimages = array();
		try {
			if (empty($zgraphiclevel) || !isset($zgraphiclevel)) {
				$zgraphiclevel = -1;
			} elseif (is_numeric($zgraphiclevel) == false) {
				$zgraphiclevel = -1;
			}
			$zwebimages[0] = array(
				'imageid'=> '',
				'imagepath'=> '',
				'imagehoverid'=> '',
				'imagehoverpath'=> '',
				'imageclickid'=> '',
				'imageclickpath'=> '',
				'jsfunction'=> '',
				'jsparameters'=> '',
				'imageloaded'=> '0',
				'hoverloaded'=> '0',
				'clickloaded'=> '0'
			);
			$zresults = $this->query("
				select a1.webimageid,
					a1.pastwebimageid,
					a1.thingmoldid,
					a1.buildingmoldid,
					a1.communitymoldid,
					a1.imageindex,
					a1.graphiclevel,
					a1.jsfunction,
					a1.jsparameters,
					a1.userid,
					a1.alttag,
					a1.createdate,
					a1.createuserid,
					a1.updatedate,
					a1.updateuserid,
					a1.deleteddate,
					a1.deleteduserid,
					a1.deleted,
					case when not a1.thingmoldid='' then
							case when a1.imageid = '' then ''
								else
									case when (t1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageid limit 1)
									end 
								end
						when not a1.buildingmoldid='' then
							case when a1.imageid = '' then ''
								else
									case when (b1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageid limit 1)
									end 
								end
						when not a1.communitymoldid='' then
							case when a1.imageid = '' then ''
								else
									case when (c1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageid limit 1)
									end 
								end
						else ''
					end as imageid,
					case when not a1.thingmoldid='' then
							case when a1.imageid = '' then ''
								else
									case when (t1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imageid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imageid limit 1)
									end 
								end
						when not a1.buildingmoldid='' then
							case when a1.imageid = '' then ''
								else
									case when (b1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imageid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imageid limit 1)
									end 
								end
						when not a1.communitymoldid='' then
							case when a1.imageid = '' then ''
								else
									case when (c1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imageid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imageid limit 1)
									end 
								end
						else ''
					end as imagepath,

					case when not a1.thingmoldid='' then
							case when a1.imagehoverid = '' then ''
								else
									case when (t1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imagehoverid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imagehoverid limit 1)
									end 
								end
						when not a1.buildingmoldid='' then
							case when a1.imagehoverid = '' then ''
								else
									case when (b1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imagehoverid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imagehoverid limit 1)
									end 
								end
						when not a1.communitymoldid='' then
							case when a1.imagehoverid = '' then ''
								else
									case when (c1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imagehoverid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imagehoverid limit 1)
									end 
								end
						else ''
					end as imagehoverid,
					case when not a1.thingmoldid='' then
							case when a1.imagehoverid = '' then ''
								else
									case when (t1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imagehoverid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imagehoverid limit 1)
									end 
								end
						when not a1.buildingmoldid='' then
							case when a1.imagehoverid = '' then ''
								else
									case when (b1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imagehoverid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imagehoverid limit 1)
									end 
								end
						when not a1.communitymoldid='' then
							case when a1.imagehoverid = '' then ''
								else
									case when (c1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imagehoverid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imagehoverid limit 1)
									end 
								end
						else ''
					end as imagehoverpath,

					case when not a1.thingmoldid='' then
							case when a1.imageclickid = '' then ''
								else
									case when (t1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageclickid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageclickid limit 1)
									end 
								end
						when not a1.buildingmoldid='' then
							case when a1.imageclickid = '' then ''
								else
									case when (b1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageclickid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageclickid limit 1)
									end 
								end
						when not a1.communitymoldid='' then
							case when a1.imageclickid = '' then ''
								else
									case when (c1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageclickid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageclickid limit 1)
									end 
								end
						else ''
					end as imageclickid,
					case when not a1.thingmoldid='' then
							case when a1.imageclickid = '' then ''
								else
									case when (t1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imageclickid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imageclickid limit 1)
									end 
								end
						when not a1.buildingmoldid='' then
							case when a1.imageclickid = '' then ''
								else
									case when (b1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imageclickid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imageclickid limit 1)
									end 
								end
						when not a1.communitymoldid='' then
							case when a1.imageclickid = '' then ''
								else
									case when (c1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imageclickid limit 1)
										else (select u1.filepath 
											from ".wtw_tableprefix."uploads u2 
												left join ".wtw_tableprefix."uploads u1 
													on u2.websizeid=u1.uploadid 
											where u2.uploadid=a1.imageclickid limit 1)
									end 
								end
						else ''
					end as imageclickpath
				from ".wtw_tableprefix."webimages a1 
					left join ".wtw_tableprefix."thingmolds t1 
						on a1.thingmoldid=t1.thingmoldid
					left join ".wtw_tableprefix."buildingmolds b1 
						on a1.buildingmoldid=b1.buildingmoldid
					left join ".wtw_tableprefix."communitymolds c1 
						on a1.communitymoldid=c1.communitymoldid
				where a1.thingmoldid='".$zthingmoldid."'
					and a1.buildingmoldid='".$zbuildingmoldid."'
					and a1.communitymoldid='".$zcommunitymoldid."'
					and a1.deleted=0
				order by a1.imageindex, a1.webimageid desc;");
			
			$i = 0;
			foreach ($zresults as $zrow) {
				$zwebimages[$i] = array(
					'imageid'=> $zrow["imageid"],
					'imagepath'=> $zrow["imagepath"],
					'imagehoverid'=> $zrow["imagehoverid"],
					'imagehoverpath'=> $zrow["imagehoverpath"],
					'imageclickid'=> $zrow["imageclickid"],
					'imageclickpath'=> $zrow["imageclickpath"],
					'jsfunction'=> $zrow["jsfunction"],
					'jsparameters'=> $zrow["jsparameters"],
					'imageloaded'=> '0',
					'hoverloaded'=> '0',
					'clickloaded'=> '0'
				);
				$i += 1;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getwebimages=".$e->getMessage());
		}
		return $zwebimages;
	}
	
	public function getmoldpoints($zthingmoldid, $zbuildingmoldid, $zcommunitymoldid, $zpathnumber, $zshape) {
		$zpathpoints = array();
		$zmoldid = "";
		try {
			if ($zshape == 'tube') {
				if(!empty($zcommunitymoldid)) {
					$zmoldid = $zcommunitymoldid;
				} else if(!empty($zbuildingmoldid)) {
					$zmoldid = $zbuildingmoldid;
				} else if(!empty($zthingmoldid)) {
					$zmoldid = $zthingmoldid;
				}
				/* get point data for a given mold (lines, ribbons, lathe, etc...) */
				$zresults = $this->query("
					select * 
					from ".wtw_tableprefix."moldpoints
					where moldid='".$zmoldid."'
						and pathnumber=".$this->checkNumber($pathnumber,1)."
						and deleted=0
					order by sorder,createdate;");

				$i = 0;
				foreach ($zresults as $zrow) {
					$zpathpoints[$i] = array(
						'x'=> $zrow["positionx"],
						'y'=> $zrow["positiony"],
						'z'=> $zrow["positionz"],
						'sorder'=> $zrow["sorder"]
					);
					$i += 1;
				}
				if ($i == 0) {
					$zpathpoints[0] = null;
				}
			} else {
				$zpathpoints[0] = null;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getmoldpoints=".$e->getMessage());
		}
		return $zpathpoints;
	}
	
	public function getWebAliases($zwebtype, $zwebid) {
		$zdomains = array();
		try {
			$ztablename = "";
			switch ($zwebtype) {
				case "community":
					$ztablename = "communities";
					break;
				case "building":
					$ztablename = "buildings";
					break;
				case "thing":
					$ztablename = "things";
					break;
			}
			if (!empty($zwebid) && isset($zwebid) && !empty($ztablename) && isset($ztablename)) {
				$i = 0;
				/* get web alias (domain names) for a community */
				$zresults = $this->query("
					select w1.*,
						t1.analyticsid
					from ".wtw_tableprefix."webaliases w1
						left join ".wtw_tableprefix.$ztablename." t1
							on w1.".$zwebtype."id=t1.".$zwebtype."id
					where w1.".$zwebtype."id='".$zwebid."'
					   and w1.deleted=0
					order by w1.domainname, w1.webaliasid;");
				foreach ($zresults as $zrow) {
					$zdomains[$i]  = array(
						'domainname' => $zrow["domainname"],
						'analyticsid'=> $zrow["analyticsid"]
					); 
					$i += 1;
				}
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwdb.php-getWebAliases=".$e->getMessage());
		}
		return $zdomains;
	}

	public function trackPageView($zcurrentpage) {
		$zsuccess = false;
		try {
			if (defined('wtw_googleanalytics')) {
				$zcurl=curl_init();
				curl_setopt($zcurl, CURLOPT_URL,'http://www.google-analytics.com/collect/v=1&tid='.wtw_googleanalytics.'&cid=555&t=pageview&dp='.$zcurrentpage);
				curl_setopt($zcurl, CURLOPT_CONNECTTIMEOUT, 2);
				curl_setopt($zcurl, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($zcurl, CURLOPT_USERAGENT, 'Geoip tracker');
				$zquery = curl_exec($zcurl);
				curl_close($zcurl);
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
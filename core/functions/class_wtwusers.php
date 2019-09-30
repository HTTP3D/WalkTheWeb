<?php
class wtwusers {
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

	public function firstAdminUser($zusername, $zpassword, $zemail) {
		global $wtwdb;
		$zuserid = "";
		try {
			$zuserid = $wtwdb->getRandomString(16,1);
			$zuploadpathid = $wtwdb->getRandomString(16,1);
			$options = ['cost' => 11];
			$passwordhash = password_hash($zpassword, PASSWORD_DEFAULT, $options);
			$wtwdb->query("
				insert into ".wtw_tableprefix."users 
					(username,
					 userid,
					 uploadpathid, 
					 userpassword,
					 email,
					 displayname,
					 createdate,
					 createuserid,
					 updatedate,
					 updateuserid)
				  values
					('".$zusername."',
					 '".$zuserid."',
					 '".$zuploadpathid."', 
					 '".$passwordhash."',
					 '".$zemail."',
					 '".$zusername."',
					 now(),
					 '".$zuserid."',
					 now(),
					 '".$zuserid."');
			");
			$_SESSION["wtw_username"] = $zusername;
			$_SESSION["wtw_userid"] = $zuserid;
			$_SESSION["wtw_uploadpathid"] = $zuploadpathid;
			if (!empty($zuserid) && isset($zuserid)) {
				if ($wtwdb->userExists($zuserid)) {
					global $wtw;
					global $wtwuser;
					$wtw->userid = $zuserid;
					$wtwuser->userid = $zuserid;
				}
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwusers.php-firstAdminUser=".$e->getMessage());
		}
		return $zuserid;
	}

	public function loginAttempt($zusername, $zemail, $zpassword) {
		global $wtwdb;
		$zuser = array(
			'userid'=>'',
			'username'=>'',
			'email'=>'',
			'uploadpathid'=>'',
			'displayname'=>'',
			'userimageurl'=>'',
			'serror'=>'Invalid Username or Password'
		);
		try {
			if (!empty($zusername) && isset($zusername)) {
				$zusername = base64_decode($zusername);
			}
			if (!empty($zemail) && isset($zemail)) {
				$zemail = base64_decode($zemail);
			}
			if (!empty($zpassword) && isset($zpassword)) {
				$zpassword = base64_decode($zpassword);
			}
			if (!empty($zpassword) && isset($zpassword)) {
				$serror = "Invalid Username or Password";
				$zresults = array();
				if (!empty($zusername) && isset($zusername)) {
					$zresults = $wtwdb->query("
							select * from ".wtw_tableprefix."users 
							where username='".$zusername."'
								and deleted=0 limit 1;");
				} else if (!empty($zemail) && isset($zemail)) {
					$zresults = $wtwdb->query("
							select * from ".wtw_tableprefix."users 
							where email='".$zemail."'
								and deleted=0 limit 1;");
				}
				foreach ($zresults as $zrow) {
					$passwordhash = $zrow["userpassword"];
					global $wtw;
					global $wtwuser;
					if (password_verify($zpassword, $passwordhash)) {
						$zuser = array(
							'userid'=>$zrow["userid"],
							'username'=>$zrow["username"],
							'email'=>$zrow["email"],
							'uploadpathid'=>$zrow["uploadpathid"],
							'displayname'=>addslashes($zrow["displayname"]),
							'userimageurl'=>addslashes($zrow["userimageurl"]),
							'serror'=>''
						);
						$_SESSION["wtw_username"] = $zrow["username"];
						$_SESSION["wtw_userid"] = $zrow["userid"];
						$_SESSION["wtw_uploadpathid"] = $zrow["uploadpathid"];
						if (!empty($zuserid) && isset($zuserid)) {
							if ($wtwdb->userExists($zuserid)) {
								$wtw->userid = $zuserid;
								$wtwuser->userid = $zuserid;
							}
						}
					} else {
						$_SESSION["wtw_username"] = '';
						$_SESSION["wtw_userid"] = '';
						$_SESSION["wtw_uploadpathid"] = '';
						$wtw->userid = $zuserid;
						$wtwuser->userid = $zuserid;
					}
				}
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwusers.php-loginAttempt=".$e->getMessage());
		}
		return json_encode($zuser);
	}

	public function logOut() {
		global $wtwdb;
		global $wtw;
		global $wtwuser;
		try {
			$_SESSION["wtw_username"] = '';
			$_SESSION["wtw_userid"] = '';
			$_SESSION["wtw_uploadpathid"] = '';
			session_unset(); 
			session_destroy();
			$wtw->userid = '';
			$wtwuser->userid = '';
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwusers.php-logOut=".$e->getMessage());
		}
	}
	
	public function getRoleId($zrolename) {
		global $wtwdb;
		$roleid = "";
		try {			
			$zresults = $wtwdb->query("
				select roleid from ".wtw_tableprefix."roles 
				where rolename = '".$zrolename."'
					and deleted=0 order by createdate limit 1;
			");
			foreach ($zresults as $zrow) {
				$roleid = $zrow['roleid'];
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwusers.php-getRoleId=".$e->getMessage());
		}
		return $roleid;
	}
		
	public function userIdIsValid($zuserid) {
		global $wtwdb;
		$zvalid = false;
		try {
			$zresults = $wtwdb->query("
				select userid from ".wtw_tableprefix."users 
				where userid = '".$zuserid."'
					and deleted=0 order by createdate limit 1;
			");
			foreach ($zresults as $zrow) {
				$zuserid = $zrow['userid'];
				$zvalid = true;
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwusers.php-userIdIsValid=".$e->getMessage());
		}
		return $zvalid;
	}

	public function roleIdIsValid($zroleid) {
		global $wtwdb;
		$zvalid = false;
		try {
			$zresults = $wtwdb->query("
				select roleid from ".wtw_tableprefix."roles 
				where roleid = '".$zroleid."'
					and deleted=0 order by createdate limit 1;
			");
			foreach ($zresults as $zrow) {
				$zroleid = $zrow['roleid'];
				$zvalid = true;
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwusers.php-userIdIsValid=".$e->getMessage());
		}
		return $zvalid;
	}

	public function addUserRole($zuserid, $zrolename) {
		global $wtw;
		global $wtwdb;
		$zsuccess = false;
		try {
			if ($this->userIdIsValid($zuserid)) {
				$zroleid = $this->getRoleId($zrolename);
				if (!empty($zroleid) && isset($zroleid)) {
					$zresults = $wtwdb->query("
						select userinroleid, deleted from ".wtw_tableprefix."usersinroles 
						where roleid = '".$zroleid."'
							and userid = '".$zuserid."' order by createdate limit 1;
					");
					$ztimestamp = date('Y/m/d H:i:s');
					$wtw->userid = $_SESSION["wtw_userid"];
					if (count($zresults) > 0) {
						$zuserinroleid = "";
						$zdeleted = 0;
						foreach ($zresults as $zrow) {
							$zuserinroleid = $zrow['userinroleid'];
							$zdeleted = $zrow['deleted'];
						}
						if (!empty($zuserinroleid) && isset($zuserinroleid) && $zdeleted == 1) {
							$wtwdb->query("
								update ".wtw_tableprefix."usersinroles 
								set updatedate='".$ztimestamp."',
									updateuserid='".$wtw->userid."',
									deleted=0,
									deleteddate=null,
									deleteduserid=''
								where userinroleid='".$zuserinroleid."';
							");
							$zsuccess = true;
						}
					} else {
						$zuserinroleid = $wtwdb->getRandomString(16,1);
						$wtwdb->query("
							insert into ".wtw_tableprefix."usersinroles 
								(userinroleid,
								 userid,
								 roleid,
								 createdate,
								 createuserid,
								 updatedate,
								 updateuserid)
							   values
								('".$zuserinroleid."',
								 '".$zuserid."',
								 '".$zroleid."',
								 '".$ztimestamp."',
								 '".$wtw->userid."',
								 '".$ztimestamp."',
								 '".$wtw->userid."');");
						$zsuccess = true;
					}
				}
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwusers.php-addUserRole=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function saveUserRoleID($zuserid, $zroleid) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($this->userIdIsValid($zuserid)) {
				if ($wtwiframes->isUserInRole("admin")) {
					if (!empty($zroleid) && isset($zroleid)) {
						if ($this->roleIdIsValid($zroleid)) {
							$zresults = $wtwiframes->query("
								select userinroleid, deleted from ".wtw_tableprefix."usersinroles 
								where roleid = '".$zroleid."'
									and userid = '".$zuserid."' order by createdate limit 1;
								");
							if (count($zresults) > 0) {
								foreach ($zresults as $zrow) {
									$zuserinroleid = $zrow['userinroleid'];
									$zdeleted = $zrow['deleted'];
								}
								if (!empty($zuserinroleid) && isset($zuserinroleid) && $zdeleted == 1) {
									$wtwiframes->query("
										update ".wtw_tableprefix."usersinroles 
										set updatedate=now(),
											updateuserid='".$wtwiframes->userid."',
											deleted=0,
											deleteddate=null,
											deleteduserid=''
										where userinroleid='".$zuserinroleid."';
									");
									$zsuccess = true;
								}
							} else {
								$zuserinroleid = $wtwiframes->getRandomString(16,1);
								$wtwiframes->query("
									insert into ".wtw_tableprefix."usersinroles 
										(userinroleid,
										 userid,
										 roleid,
										 createdate,
										 createuserid,
										 updatedate,
										 updateuserid)
									   values
										('".$zuserinroleid."',
										 '".$zuserid."',
										 '".$zroleid."',
										 now(),
										 '".$wtwiframes->userid."',
										 now(),
										 '".$wtwiframes->userid."');
								");
								$zsuccess = true;
							}
						}
					}
				}
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwusers.php-saveUserRoleID=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function deleteUserRoleID($zuserid, $zuserinroleid) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->isUserInRole("admin")) {
				if (!empty($zuserinroleid) && isset($zuserinroleid)) {
					$wtwiframes->query("
						update ".wtw_tableprefix."usersinroles 
						set deleted=1,
							deleteddate=now(),
							deleteduserid='".$wtwiframes->userid."'
						where userinroleid='".$zuserinroleid."';
					");
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwusers.php-deleteUserRoleID=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function addUserPermissions($zusersearch, $zcommunityid, $zbuildingid, $zthingid, $zuseraccess) {
		global $wtwiframes;
		$zresponse = "Permission Change Failed";
		try {
			if ($wtwiframes->checkAdminAccess($zcommunityid, $zbuildingid, $zthingid)) {
				$zuserid = "";
				$zresults = $wtwiframes->query("
					select userid 
					from ".wtw_tableprefix."users 
					where userid='".$zusersearch."' 
						and deleted=0 
					order by createdate desc 
					limit 1");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
				if (empty($zuserid) || !isset($zuserid)) {
					$zresults = $wtwiframes->query("
						select userid 
						from ".wtw_tableprefix."users 
						where email='".$zusersearch."' 
							and deleted=0 
						order by createdate desc 
						limit 1");
					foreach ($zresults as $zrow) {
						$zuserid = $zrow["userid"];
					}
				}
				if (empty($zuserid) || !isset($zuserid)) {
					$zresults = $wtwiframes->query("
						select userid 
						from ".wtw_tableprefix."users 
						where username='".$zusersearch."' 
							and deleted=0 
						order by createdate desc 
						limit 1");
					foreach ($zresults as $zrow) {
						$zuserid = $zrow["userid"];
					}
				}
				if (empty($zuserid) || !isset($zuserid)) {
					$zresults = $wtwiframes->query("
						select userid 
						from ".wtw_tableprefix."users 
						where displayname='".$zusersearch."' 
							and deleted=0 
						order by createdate desc 
						limit 1");
					foreach ($zresults as $zrow) {
						$zuserid = $zrow["userid"];
					}
				}
				if (!empty($zuserid) && isset($zuserid)) {
					$zfounduserauthorizationid = "";
					$zresults = $wtwiframes->query("
						select userauthorizationid 
						from ".wtw_tableprefix."userauthorizations 
						where userid='".$zuserid."' 
							and communityid='".$zcommunityid."' 
							and buildingid='".$zbuildingid."' 
							and thingid='".$zthingid."'
						limit 1");
					foreach ($zresults as $zrow) {
						$zfounduserauthorizationid = $zrow["userauthorizationid"];
					}
					if (!empty($zfounduserauthorizationid) && isset($zfounduserauthorizationid)) {
						$wtwiframes->query("
							update ".wtw_tableprefix."userauthorizations
							set useraccess='".$zuseraccess."',
								updatedate=now(),
								updateuserid='".$wtwiframes->userid."',
								deleteddate=null,
								deleteduserid='',
								deleted=0
							where userauthorizationid='".$zfounduserauthorizationid."';");
					} else {
						$zfounduserauthorizationid = $wtwiframes->getRandomString(16,1);
						$wtwiframes->query("
							insert into ".wtw_tableprefix."userauthorizations
								(userauthorizationid,
								 userid,
								 communityid,
								 buildingid,
								 thingid,
								 useraccess,
								 createdate,
								 createuserid,
								 updatedate,
								 updateuserid)
								values
								('".$zfounduserauthorizationid."',
								 '".$zuserid."',
								 '".$zcommunityid."',
								 '".$zbuildingid."',
								 '".$zthingid."',
								 '".$zuseraccess."',
								 now(),
								 '".$wtwiframes->userid."',
								 now(),
								 '".$wtwiframes->userid."');");
					}
					$zresponse = "updated";
				}
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwusers.php-addUserPermissions=".$e->getMessage());
		}
		return $zresponse;
	}	

	function deleteUserPermissions($zuserid, $zcommunityid, $zbuildingid, $zthingid) {
		global $wtwiframes;
		$zresponse = "Permission Change Failed";
		try {
			if ($wtwiframes->checkAdminAccess($zcommunityid, $zbuildingid, $zthingid) && !empty($zuserid) && isset($zuserid)) {
				$zfounduserauthorizationid = "";
				$zresults = $wtwiframes->query("
					select userauthorizationid 
					from ".wtw_tableprefix."userauthorizations 
					where userid='".$zuserid."' 
						and communityid='".$zcommunityid."' 
						and buildingid='".$zbuildingid."' 
						and thingid='".$zthingid."'
					limit 1");
				foreach ($zresults as $zrow) {
					$zfounduserauthorizationid = $zrow["userauthorizationid"];
				}
				$wtwiframes->query("
					update ".wtw_tableprefix."userauthorizations
					set deleted=1,
						deleteduserid='".$wtwiframes->userid."',
						deleteddate=now()
					where userauthorizationid='".$zfounduserauthorizationid."';");
				$zresponse = "user access deleted";
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwusers.php-deleteUserPermissions=".$e->getMessage());
		}
		return $zresponse;
	}
	
	function getUserPermissions($zcommunityid, $zbuildingid, $zthingid) {
		global $wtwiframes;
		$zresponse = "";
		try {
			$zpermissions = array();
			if ($wtwiframes->checkAdminAccess($zcommunityid, $zbuildingid, $zthingid)) {
				$zresults = $wtwiframes->query("
					select u1.*,
						browseauth.browsecount,
						inviteeauth.invitecount,
						neighborauth.neighborcount,
						architectauth.architectcount,
						adminauth.admincount
					from ".wtw_tableprefix."userauthorizations u1
						left join 
						(select count(userauthorizationid) as browsecount 
							from ".wtw_tableprefix."userauthorizations 
							where communityid='".$zcommunityid."' 
								and buildingid='".$zbuildingid."' 
								and thingid='".$zthingid."'
								and deleted=0 
								and useraccess='browse') browseauth
							on 0=0
						left join 
						(select count(userauthorizationid) as architectcount 
							from ".wtw_tableprefix."userauthorizations 
							where communityid='".$zcommunityid."' 
								and buildingid='".$zbuildingid."' 
								and thingid='".$zthingid."'
								and deleted=0 
								and useraccess='architect') architectauth
							on 0=0
						left join 
						(select count(userauthorizationid) as admincount 
							from ".wtw_tableprefix."userauthorizations 
							where communityid='".$zcommunityid."' 
								and buildingid='".$zbuildingid."' 
								and thingid='".$zthingid."'
								and deleted=0 
								and useraccess='admin') adminauth
							on 0=0
					where u1.communityid='".$zcommunityid."'
						and u1.buildingid='".$zbuildingid."'
						and u1.thingid='".$zthingid."'
						and u1.deleted=0;");
				$i = 0;
				foreach ($zresults as $zrow) {
					$counts = array(
						'browses' => $zrow["browsecount"],
						'architects' => $zrow["architectcount"],
						'admins' => $zrow["admincount"]
					);
					$zpermissions[$i] = array(
						'counts'=> $counts,
						'authorizationid'=> $zrow["userauthorizationid"],
						'username'=> $zrow["username"],
						'userid'=> $zrow["userid"],
						'useraccess'=> $zrow["useraccess"]
					);
					$i += 1;
				}
			}
			$zresponse = json_encode($zpermissions);
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwusers.php-getUserPermissions=".$e->getMessage());
		}
		return $zresponse;
	}		
	
	public function isUserNameAvailable($zusername) {
		global $wtwiframes;
		$zsuccess = true;
		$zserror = "";
		try {
			if (empty($zusername) || !isset($zusername)) {
				$zsuccess = false;
			} else {
				$zresults = array();
				if (!empty($wtwiframes->getSessionUserID())) {
					$zresults = $wtwiframes->query("
						select * from ".wtw_tableprefix."users
						where username like '".$zusername."'
							and not userid='".$wtwiframes->userid."'
						limit 1;");
				} else {
					$zresults = $wtwiframes->query("
						select * from ".wtw_tableprefix."users
						where username like '".$zusername."'
						limit 1;");
				}
				foreach ($zresults as $zrow) {
					$zsuccess = false;
				}
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwusers.php-isUserNameAvailable=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function isEmailAvailable($zemail) {
		global $wtwiframes;
		$zsuccess = true;
		$zserror = "";
		try {
			$zresults = array();
			if (!empty($wtwiframes->getSessionUserID())) {
				$zresults = $wtwiframes->query("
					select * from ".wtw_tableprefix."users
					where email like '".$zemail."'
						and not userid='".$wtwiframes->userid."'
					limit 1;");
			} else {
				$zresults = $wtwiframes->query("
					select * from ".wtw_tableprefix."users
					where email like '".$zemail."'
					limit 1;");
			}
			foreach ($zresults as $zrow) {
				$zsuccess = false;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwusers.php-isEmailAvailable=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	
	public function createAccount($zusername, $zemail, $zpassword) {
		global $wtwiframes;
		$zsuccess = false;
		$zserror = "";
		try {
			if (!empty($zusername) && isset($zusername)) {
				$zusername = base64_decode($zusername);
			}
			if (!empty($zemail) && isset($zemail)) {
				$zemail = base64_decode($zemail);
			}
			if (!empty($zpassword) && isset($zpassword)) {
				$zpassword = base64_decode($zpassword);
			}
			if ($this->isUserNameAvailable($zusername)) {
				if ($this->isEmailAvailable($zemail)) {
					$zuserid = $wtwiframes->getRandomString(16,1);
					$zuploadpathid = $wtwiframes->getRandomString(16,1);
					$zoptions = ['cost' => 11];
					$zpasswordhash = password_hash($zpassword, PASSWORD_DEFAULT, $zoptions);
					$ztimestamp = date('Y/m/d H:i:s');
					$wtwiframes->query("
						insert into ".wtw_tableprefix."users 
							(username,
							 userid,
							 uploadpathid, 
							 userpassword,
							 email,
							 displayname,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						  values
							('".$zusername."',
							 '".$zuserid."',
							 '".$zuploadpathid."', 
							 '".$zpasswordhash."',
							 '".$zemail."',
							 '".$zusername."',
							 '".$ztimestamp."',
							 '".$zuserid."',
							 '".$ztimestamp."',
							 '".$zuserid."');
					");
					$_SESSION["wtw_username"] = $zusername;
					$_SESSION["wtw_userid"] = $zuserid;
					$_SESSION["wtw_uploadpathid"] = $zuploadpathid;			
					global $wtw;
					global $wtwuser;
					$wtw->userid = $zuserid;
					$wtwuser->userid = $zuserid;
					$zsuccess = true;
				} else {
					$zserror = "Email is already in use.";
				}
			} else {
				$zserror = "User Name is already in use.";
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwusers.php-createAccount=".$e->getMessage());
		}
		return array( 
			'success' => $zsuccess,
			'serror'  => $zserror);
	}
	
	public function emailExists($zuseremail) {
		global $wtwiframes;
		$zfound = false;
		try {
			$zresults = $wtwiframes->query("
				select userid
				from ".wtw_tableprefix."users
				where email='".$zuseremail."'
				limit 1;");
			foreach ($zresults as $zrow) {
				$zfound = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwusers.php-emailExists=".$e->getMessage());
		}
		return $zfound;
	}

	public function getUserNameByEmail($zuseremail) {
		global $wtwiframes;
		$zusername = "";
		try {
			$zresults = $wtwiframes->query("
				select userid, username
				from ".wtw_tableprefix."users
				where email='".$zuseremail."'
				limit 1;");
			foreach ($zresults as $zrow) {
				$zusername = $zrow["username"];
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwusers.php-getUserNameByEmail=".$e->getMessage());
		}
		return $zusername;
	}

	public function recoverLoginByEmail($zuseremail) {
		global $wtwiframes;
		$zresponse = "";
		try {
			$zusername = $this->getUserNameByEmail($zuseremail);
			if (!empty($zusername) && isset($zusername)) {
				/* send email */
				
				$zresponse = "<span style=\"color:green;\">Login sent to Email Address</span>";
			} else {
				$zresponse = "Email Address Not Found";
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwusers.php-recoverLoginByEmail=".$e->getMessage());
		}
		return $zresponse;
	}
	
	public function saveProfile($zmyavatarid,$zinstanceid,$zusername,$zdisplayname,$zuseremail) {
		global $wtwiframes;
		$zresponse = "";
		try {
			$zsuccess = false;
			if (!empty($wtwiframes->getSessionUserID())) {
				if ($this->isUserNameAvailable($zusername)) {
					$wtwiframes->query("
						update ".wtw_tableprefix."users
						set username='".$zusername."',
							updatedate=now(),
							updateuserid='".$wtwiframes->userid."'
						where userid='".$wtwiframes->userid."'
							and deleted=0;");
					$_SESSION["wtw_username"] = $zusername;
					$zsuccess = true;
				} else {
					$zresponse .= "User Name already in use<br />";
				}
				if ($this->isEmailAvailable($zuseremail)) {
					$wtwiframes->query("
						update ".wtw_tableprefix."users
						set useremail='".$zuseremail."',
							updatedate=now(),
							updateuserid='".$wtwiframes->userid."'
						where userid='".$wtwiframes->userid."'
							and deleted=0;");
					$zsuccess = true;
				} else {
					$zresponse .= "Email already in use<br />";
				}
				if (!empty($zmyavatarid) && isset($zmyavatarid)) {
					$wtwiframes->query("
						update ".wtw_tableprefix."useravatars
						set displayname='".$zdisplayname."',
							updatedate=now(),
							updateuserid='".$wtwiframes->userid."'
						where userid='".$wtwiframes->userid."'
							and useravatarid='".$zmyavatarid."'
							and deleted=0;");
					$zsuccess = true;
				}
				if ($zsuccess && empty($zresponse)) {
					$zresponse .= "<span style=\"color:green;\">Updated Successfully</span><br />";
				}
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwusers.php-saveProfile=".$e->getMessage());
		}
		return $zresponse;
	}
	
	public function saveUser($zuserid, $zusername, $zuseremail) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->isUserInRole("admin")) {
				$wtwiframes->query("
					update ".wtw_tableprefix."users
					set username='".$zusername."',
						email='".$zuseremail."'
					where userid='".$zuserid."'
					limit 1;");
				$zresults = $wtwiframes->query("
					select *
					from ".wtw_tableprefix."users
					where userid='".$zuserid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					if ($zusername == $zrow["username"] && $zuseremail == $zrow["email"]) {
						$zsuccess = true;
					}
				}
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwusers.php-saveUser=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function saveNewUser($zusername, $zpassword, $zemail) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->isUserInRole("admin")) {
				if (!empty($zpassword) && isset($zpassword)) {
					$zpassword = base64_decode($zpassword);
				}
				if ($this->isUserNameAvailable($zusername)) {
					if ($this->isEmailAvailable($zemail)) {
						$zuserid = $wtwiframes->getRandomString(16,1);
						$zuploadpathid = $wtwiframes->getRandomString(16,1);
						$zoptions = ['cost' => 11];
						$zpasswordhash = password_hash($zpassword, PASSWORD_DEFAULT, $zoptions);
						$wtwiframes->query("
							insert into ".wtw_tableprefix."users 
								(username,
								 userid,
								 uploadpathid, 
								 userpassword,
								 email,
								 displayname,
								 createdate,
								 createuserid,
								 updatedate,
								 updateuserid)
							  values
								('".$zusername."',
								 '".$zuserid."',
								 '".$zuploadpathid."', 
								 '".$zpasswordhash."',
								 '".$zemail."',
								 '".$zusername."',
								 now(),
								 '".$wtwiframes->userid."',
								 now(),
								 '".$wtwiframes->userid."');");
						$zsuccess = true;
					}
				}
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwusers.php-saveNewUser=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function deleteUser($zuserid) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->isUserInRole("admin")) {
				$wtwiframes->query("
					update ".wtw_tableprefix."users
					set deleted=1,
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where userid='".$zuserid."'
					limit 1;");
				$zresults = $wtwiframes->query("
					select deleted
					from ".wtw_tableprefix."users
					where userid='".$zuserid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					if ($zrow["deleted"] == 1) {
						$zsuccess = true;
					}
				}
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwusers.php-saveNewUser=".$e->getMessage());
		}
		return $zsuccess;
	}
}

	function wtwusers() {
		return wtwusers::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwusers'] = wtwusers();	
?>
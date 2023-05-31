<?php
class wtwusers {
	/* wtwusers class for WalkTheWeb user database and login functions */
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

	public function firstAdminUser($zdisplayname, $zpassword, $zemail) {
		/* used in install to create the first admin user account - that installed it */
		global $wtwdb;
		$zuserid = "";
		try {
			$zuserid = $wtwdb->getRandomString(16,1);
			$zuploadpathid = $wtwdb->getRandomString(16,1);
			$zdisplayname = $wtwdb->decode64($zdisplayname);
			$options = ['cost' => 11];
			$passwordhash = password_hash($zpassword, PASSWORD_DEFAULT, $options);
			$wtwdb->query("
				insert into ".wtw_tableprefix."users 
					(userid,
					 uploadpathid, 
					 userpassword,
					 email,
					 displayname,
					 createdate,
					 createuserid,
					 updatedate,
					 updateuserid)
				  values
					('".$zuserid."',
					 '".$zuploadpathid."', 
					 '".$passwordhash."',
					 '".$zemail."',
					 '".addslashes($zdisplayname)."',
					 now(),
					 '".$zuserid."',
					 now(),
					 '".$zuserid."');
			");
			$_SESSION["wtw_userid"] = $zuserid;
			$_SESSION["wtw_uploadpathid"] = $zuploadpathid;
			if ($wtwdb->hasValue($zuserid)) {
				if ($wtwdb->userExists($zuserid)) {
					global $wtw;
					global $wtwuser;
					if (isset($wtw)) {
						$wtw->userid = $zuserid;
					}
					if (isset($wtwuser)) {
						$wtwuser->userid = $zuserid;
					}
				}
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwusers.php-firstAdminUser=".$e->getMessage());
		}
		return $zuserid;
	}

	public function loginAttempt($zemail, $zpassword) {
		/* process a local server login attempt */
		global $wtwdb;
		$zuser = array(
			'userid'=>'',
			'email'=>'',
			'uploadpathid'=>'',
			'displayname'=>'',
			'userimageurl'=>'',
			'serror'=>'Invalid Email or Password'
		);
		try {
			$zpassword = $wtwdb->decode64($zpassword);
			if ($wtwdb->hasValue($zpassword)) {
				$zresults = array();
				if ($wtwdb->hasValue($zemail)) {
					$zresults = $wtwdb->query("
							select * from ".wtw_tableprefix."users 
							where email like '".$zemail."'
								and pastuserid=''
								and deleted=0 
							limit 1;");
				}
				foreach ($zresults as $zrow) {
					$passwordhash = $zrow["userpassword"];
					$zuserid = $zrow["userid"];
					global $wtw;
					global $wtwuser;
					if (password_verify($zpassword, $passwordhash)) {
						$zuser = array(
							'userid'=>$zrow["userid"],
							'email'=>$zrow["email"],
							'uploadpathid'=>$zrow["uploadpathid"],
							'displayname'=>addslashes($zrow["displayname"]),
							'userimageurl'=>addslashes($zrow["userimageurl"]),
							'serror'=>''
						);
						$_SESSION["wtw_userid"] = $zrow["userid"];
						$_SESSION["wtw_uploadpathid"] = $zrow["uploadpathid"];
						if ($wtwdb->hasValue($zuserid)) {
							if ($wtwdb->userExists($zuserid)) {
								if (isset($wtw)) {
									$wtw->userid = $zuserid;
								}
								if (isset($wtwuser)) {
									$wtwuser->userid = $zuserid;
								}
							}
						}
					} else {
						$_SESSION["wtw_userid"] = '';
						$_SESSION["wtw_uploadpathid"] = '';
						if (isset($wtw)) {
							$wtw->userid = '';
						}
						if (isset($wtwuser)) {
							$wtwuser->userid = '';
						}
					}
				}
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwusers.php-loginAttempt=".$e->getMessage());
		}
		return $zuser;
	}

	public function globalLogin($zglobaluserid, $zemail, $zusertoken, $zdisplayname) {
		/* update local login and session based on a global login attempt */
		global $wtwdb;
		global $wtw;
		global $wtwuser;
		$zuser = array(
			'globaluserid'=>'',
			'userid'=>'',
			'usertoken'=>'',
			'email'=>'',
			'uploadpathid'=>'',
			'displayname'=>'',
			'userimageurl'=>'',
			'serror'=>'Invalid Global Account'
		);
		try {


			$zresults = array();
			$zuserid = '';
			$zdisplayname = $wtwdb->decode64($zdisplayname);
			if ($wtwdb->hasValue($zemail)) {
				$zresults = $wtwdb->query("
					select * from ".wtw_tableprefix."users 
					where email like '".$zemail."'
					order by createdate
					limit 1;");
			}
			if (count($zresults) > 0) {
				foreach ($zresults as $zrow) {
					if ($zrow["deleted"] == 0) {
						$zuserid = $zrow["userid"];
						$zuser = array(
							'globaluserid'=>$zglobaluserid,
							'userid'=>$zrow["userid"],
							'email'=>$zrow["email"],
							'usertoken'=>$zusertoken,
							'uploadpathid'=>$zrow["uploadpathid"],
							'displayname'=>addslashes($zdisplayname),
							'userimageurl'=>addslashes($zrow["userimageurl"]),
							'serror'=>''
						);
						$_SESSION["wtw_userid"] = $zrow["userid"];
						$_SESSION["wtw_globaluserid"] = $zglobaluserid;
						$_SESSION["wtw_usertoken"] = $zusertoken;
						$_SESSION["wtw_uploadpathid"] = $zrow["uploadpathid"];
						if ($wtwdb->hasValue($zusertoken)) {
							$wtwdb->query("
								update ".wtw_tableprefix."users
								set usertoken='".base64_encode($zusertoken)."',
									displayname='".addslashes($zdisplayname)."'
								where userid='".$zuserid."';");
						}
						if ($wtwdb->hasValue($zuserid)) {
							try {
								$wtw->userid = $zuserid;
								$wtwuser->userid = $zuserid;
							} catch (Exception $e) {}
						}
					} else {
						$_SESSION["wtw_userid"] = '';
						$_SESSION["wtw_globaluserid"] = '';
						$_SESSION["wtw_usertoken"] = '';
						$_SESSION["wtw_uploadpathid"] = '';
						if (isset($wtw)) {
							$wtw->userid = $zuserid;
						}
						if (isset($wtwuser)) {
							$wtwuser->userid = $zuserid;
						}
					}
				}
			} else {
				if ($wtwdb->hasValue($zusertoken)) {
					$zresults = $wtwdb->query("
						select * from ".wtw_tableprefix."users 
						where usertoken='".base64_encode($zusertoken)."'
						order by createdate
						limit 1;");
				} else {
					$zresults = array();
				}
				if (count($zresults) > 0) {
					foreach ($zresults as $zrow) {
						if ($zrow["deleted"] == 0) {
							$zuserid = $zrow["userid"];
							$zuser = array(
								'globaluserid'=>$zglobaluserid,
								'userid'=>$zrow["userid"],
								'email'=>$zrow["email"],
								'usertoken'=>$zusertoken,
								'uploadpathid'=>$zrow["uploadpathid"],
								'displayname'=>addslashes($zdisplayname),
								'userimageurl'=>addslashes($zrow["userimageurl"]),
								'serror'=>''
							);
							$_SESSION["wtw_userid"] = $zrow["userid"];
							$_SESSION["wtw_globaluserid"] = $zglobaluserid;
							$_SESSION["wtw_usertoken"] = $zusertoken;
							$_SESSION["wtw_uploadpathid"] = $zrow["uploadpathid"];
							$wtwdb->query("
								update ".wtw_tableprefix."users
								set usertoken='".base64_encode($zusertoken)."',
									displayname='".addslashes($zdisplayname)."'
								where userid='".$zuserid."';");
							if ($wtwdb->hasValue($zuserid)) {
								try {
									$wtw->userid = $zuserid;
									$wtwuser->userid = $zuserid;
								} catch (Exception $e) {}
							}
						} else {
							$_SESSION["wtw_userid"] = '';
							$_SESSION["wtw_globaluserid"] = '';
							$_SESSION["wtw_usertoken"] = '';
							$_SESSION["wtw_uploadpathid"] = '';
							try {
								$wtw->userid = '';
								$wtwuser->userid = '';
							} catch (Exception $e) {}
						}
					}					
				} else {
					$zuserid = $wtwdb->getRandomString(16,1);
					$zuploadpathid = $wtwdb->getRandomString(16,1);
					$ztimestamp = date('Y/m/d H:i:s');
					$wtwdb->query("
						insert into ".wtw_tableprefix."users 
							(userid,
							 uploadpathid, 
							 userpassword,
							 usertoken,
							 email,
							 displayname,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						  values
							('".$zuserid."',
							 '".$zuploadpathid."', 
							 '',
							 '".base64_encode($zusertoken)."',
							 '".$zemail."',
							 '".addslashes($zdisplayname)."',
							 '".$ztimestamp."',
							 '".$zuserid."',
							 '".$ztimestamp."',
							 '".$zuserid."');
					");
					$zuser = array(
						'globaluserid'=>$zglobaluserid,
						'userid'=>$zuserid,
						'email'=>$zemail,
						'usertoken'=>$zusertoken,
						'uploadpathid'=>$zuploadpathid,
						'displayname'=>addslashes($zdisplayname),
						'userimageurl'=>'',
						'serror'=>''
					);
					$_SESSION["wtw_userid"] = $zuserid;
					$_SESSION["wtw_globaluserid"] = $zglobaluserid;
					$_SESSION["wtw_usertoken"] = $zusertoken;
					$_SESSION["wtw_uploadpathid"] = $zuploadpathid;
					try {
						$wtw->userid = $zuserid;
						$wtwuser->userid = $zuserid;
					} catch (Exception $e) {}
				}

				/* add user to Host Role by default if server host user role setting is enabled */
				$zaddhostrole = false;
				if (defined('wtw_server_host_user_role')) {
					if ($wtwdb->checkNumber(wtw_server_host_user_role,0) == 1) {
						$zaddhostrole = true;
					}
				}
				if ($zaddhostrole) {
					/* only add Host Role if not in Admin */
					if ($wtwdb->isUserInRole("admin") == false) {
						$this->addUserRole($zuserid, 'Host');
					}
				}
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwusers.php-globalLogin=".$e->getMessage());
		}
		return $zuser;
	}
	
	public function isUserLoggedIn() {
		/* log out the local session */
		global $wtwdb;
		global $wtwhandlers;
		$zresponse = array(
			'loggedin'=> false,
			'serror'=>''
		);
		try {
			if (!isset($wtwdb) && isset($wtwhandlers)) {
				$wtwdb = $wtwhandlers;
			}
			if (session_status() == PHP_SESSION_NONE) {
				session_start();
			}
			if (isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
				$zresponse = array(
					'loggedin'=> true,
					'serror'=>''
				);
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwusers.php-isUserLoggedIn=".$e->getMessage());
			$zresponse = array(
				'loggedin'=> false,
				'serror'=>$e->getMessage()
			);
		}
		return $zresponse;
	}
	
	public function logout() {
		/* log out the local session */
		global $wtwdb;
		global $wtwuser;
		try {
			if (session_status() == PHP_SESSION_NONE) {
				session_start();
			}
			$_SESSION["wtw_userid"] = '';
			$_SESSION["wtw_globaluserid"] = '';
			$_SESSION["wtw_usertoken"] = '';
			$_SESSION["wtw_uploadpathid"] = '';
			$_SESSION = array();
			try {
				session_unset(); 
				if (isset($_COOKIE[session_name()])) {
				   setcookie(session_name(), '', time()-42000, '/');
				}
				session_destroy();
			} catch (Exception $e) {}
			try {
				$wtwdb->userid = '';
				$wtwuser->userid = '';
			} catch (Exception $e) {}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwusers.php-logout=".$e->getMessage());
		}
	}
	
	public function getRoleId($zrolename) {
		/* roles are used to access admin.php page and functions for maintaining a 3D Website and Server */
		global $wtwdb;
		$roleid = "";
		try {			
			$zresults = $wtwdb->query("
				select roleid from ".wtw_tableprefix."roles 
				where rolename like '".$zrolename."'
					and deleted=0 
				order by createdate limit 1;
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
		/* validate user id */
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
		/* validate user role */
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
			$wtwdb->serror("core-functions-class_wtwusers.php-roleIdIsValid=".$e->getMessage());
		}
		return $zvalid;
	}

	public function addUserRole($zuserid, $zrolename) {
		/* add a role */
		global $wtw;
		global $wtwdb;
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if (!isset($wtw) && isset($wtwhandlers)) {
				$wtw = $wtwhandlers;
			}
			if ($this->userIdIsValid($zuserid)) {
				$zroleid = $this->getRoleId($zrolename);
				if ($wtwdb->hasValue($zroleid)) {
					$zresults = $wtwdb->query("
						select userinroleid, deleted 
						from ".wtw_tableprefix."usersinroles 
						where roleid = '".$zroleid."'
							and userid = '".$zuserid."' 
						order by createdate limit 1;
					");
					$ztimestamp = date('Y/m/d H:i:s');
					if (count($zresults) > 0) {
						$zuserinroleid = "";
						$zdeleted = 0;
						foreach ($zresults as $zrow) {
							$zuserinroleid = $zrow['userinroleid'];
							$zdeleted = $zrow['deleted'];
						}
						if ($wtwdb->hasValue($zuserinroleid) && $zdeleted == 1) {
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
		/* add a user to a role */ 
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($this->userIdIsValid($zuserid)) {
				if ($wtwhandlers->isUserInRole("admin")) {
					if ($wtwhandlers->hasValue($zroleid)) {
						if ($this->roleIdIsValid($zroleid)) {
							$zresults = $wtwhandlers->query("
								select userinroleid, deleted from ".wtw_tableprefix."usersinroles 
								where roleid = '".$zroleid."'
									and userid = '".$zuserid."' order by createdate limit 1;
								");
							if (count($zresults) > 0) {
								foreach ($zresults as $zrow) {
									$zuserinroleid = $zrow['userinroleid'];
									$zdeleted = $zrow['deleted'];
								}
								if ($wtwhandlers->hasValue($zuserinroleid) && $zdeleted == 1) {
									$wtwhandlers->query("
										update ".wtw_tableprefix."usersinroles 
										set updatedate=now(),
											updateuserid='".$wtwhandlers->userid."',
											deleted=0,
											deleteddate=null,
											deleteduserid=''
										where userinroleid='".$zuserinroleid."';
									");
									$zsuccess = true;
								}
							} else {
								$zuserinroleid = $wtwhandlers->getRandomString(16,1);
								$wtwhandlers->query("
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
										 '".$wtwhandlers->userid."',
										 now(),
										 '".$wtwhandlers->userid."');
								");
								$zsuccess = true;
							}
						}
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwusers.php-saveUserRoleID=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function deleteUserRoleID($zuserid, $zuserinroleid) {
		/* flag a user role as deleted - removes the user from the role */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->isUserInRole("admin")) {
				if ($wtwhandlers->hasValue($zuserinroleid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."usersinroles 
						set deleted=1,
							deleteddate=now(),
							deleteduserid='".$wtwhandlers->userid."'
						where userinroleid='".$zuserinroleid."';
					");
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwusers.php-deleteUserRoleID=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function addUserPermissions($zusersearch, $zcommunityid, $zbuildingid, $zthingid, $zuseraccess) {
		/* add permission to a particular 3D Community, Building, or Thing */
		/* mainly used with Developers, Architects, and Graphic Artists (not in the admin role) for project level permissions */
		global $wtwhandlers;
		$zresponse = "Permission Change Failed";
		try {
			if ($wtwhandlers->checkAdminAccess($zcommunityid, $zbuildingid, $zthingid)) {
				$zuserid = "";
				$zresults = $wtwhandlers->query("
					select userid 
					from ".wtw_tableprefix."users 
					where userid='".$zusersearch."' 
						and deleted=0 
					order by createdate desc 
					limit 1");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
				if (!isset($zuserid) || empty($zuserid)) {
					$zresults = $wtwhandlers->query("
						select userid 
						from ".wtw_tableprefix."users 
						where email like '".$zusersearch."' 
							and deleted=0 
						order by createdate desc 
						limit 1");
					foreach ($zresults as $zrow) {
						$zuserid = $zrow["userid"];
					}
				}
				if (!isset($zuserid) || empty($zuserid)) {
					$zresults = $wtwhandlers->query("
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
				if (!isset($zuserid) || empty($zuserid)) {
					$zresults = $wtwhandlers->query("
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
				if ($wtwhandlers->hasValue($zuserid)) {
					$zfounduserauthorizationid = "";
					$zresults = $wtwhandlers->query("
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
					if ($wtwhandlers->hasValue($zfounduserauthorizationid)) {
						$wtwhandlers->query("
							update ".wtw_tableprefix."userauthorizations
							set useraccess='".$zuseraccess."',
								updatedate=now(),
								updateuserid='".$wtwhandlers->userid."',
								deleteddate=null,
								deleteduserid='',
								deleted=0
							where userauthorizationid='".$zfounduserauthorizationid."';");
					} else {
						$zfounduserauthorizationid = $wtwhandlers->getRandomString(16,1);
						$wtwhandlers->query("
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
								 '".$wtwhandlers->userid."',
								 now(),
								 '".$wtwhandlers->userid."');");
					}
					$zresponse = "updated";
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwusers.php-addUserPermissions=".$e->getMessage());
		}
		return $zresponse;
	}	

	function deleteUserPermissions($zuserid, $zcommunityid, $zbuildingid, $zthingid) {
		/* flag a user permission as deleted - removes access to the admin of a 3D Community, Building, or Thing */
		global $wtwhandlers;
		$zresponse = "Permission Change Failed";
		try {
			if ($wtwhandlers->checkAdminAccess($zcommunityid, $zbuildingid, $zthingid) && isset($zuserid) && !empty($zuserid)) {
				$zfounduserauthorizationid = "";
				$zresults = $wtwhandlers->query("
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
				$wtwhandlers->query("
					update ".wtw_tableprefix."userauthorizations
					set deleted=1,
						deleteduserid='".$wtwhandlers->userid."',
						deleteddate=now()
					where userauthorizationid='".$zfounduserauthorizationid."';");
				$zresponse = "user access deleted";
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwusers.php-deleteUserPermissions=".$e->getMessage());
		}
		return $zresponse;
	}
	
	function getUserPermissions($zcommunityid, $zbuildingid, $zthingid) {
		/* get User Permissions for a 3D Community, Building or Thing */
		global $wtwhandlers;
		$zresponse = "";
		try {
			$zpermissions = array();
			if ($wtwhandlers->checkAdminAccess($zcommunityid, $zbuildingid, $zthingid)) {
				$zresults = $wtwhandlers->query("
					select u1.*,
						u2.displayname,
						browseauth.browsecount,
						inviteeauth.invitecount,
						neighborauth.neighborcount,
						architectauth.architectcount,
						adminauth.admincount
					from ".wtw_tableprefix."userauthorizations u1
						left join ".wtw_tableprefix."users u2
							on u1.userid=u2.userid
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
						'displayname'=> $zrow["displayname"],
						'userid'=> $zrow["userid"],
						'useraccess'=> $zrow["useraccess"]
					);
					$i += 1;
				}
			}
			$zresponse = json_encode($zpermissions);
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwusers.php-getUserPermissions=".$e->getMessage());
		}
		return $zresponse;
	}		
	
	public function isEmailAvailable($zemail) {
		/* validate if an email is not already used on the local server */
		global $wtwhandlers;
		$zsuccess = true;
		$zserror = "";
		try {
			$zresults = array();
			if (!empty($wtwhandlers->getSessionUserID())) {
				$zresults = $wtwhandlers->query("
					select * from ".wtw_tableprefix."users
					where email like '".$zemail."'
						and not userid='".$wtwhandlers->userid."'
					limit 1;");
			} else {
				$zresults = $wtwhandlers->query("
					select * from ".wtw_tableprefix."users
					where email like '".$zemail."'
					limit 1;");
			}
			foreach ($zresults as $zrow) {
				$zsuccess = false;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwusers.php-isEmailAvailable=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	
	public function createAccount($zuseremail, $zpassword, $zdisplayname) {
		/* creates a local user account - does not mean they have access to anything including Admin */
		global $wtwhandlers;
		$zsuccess = false;
		$zserror = '';
		$zuserid = '';
		try {
			$zdisplayname = $wtwhandlers->decode64($zdisplayname);
			$zpassword = $wtwhandlers->decode64($zpassword);
			if (empty($zdisplayname)) {
				$zserror = "Accounts require a Display Name, Email, and Password.";
			}
			if (!isset($zuseremail) || empty($zuseremail)) {
				$zserror = "Accounts require a Display Name, Email, and Password.";
			}
			if (empty($zpassword)) {
				$zserror = "Accounts require a Display Name, Email, and Password.";
			}
			if (empty($zserror)) {
				if ($this->isEmailAvailable($zuseremail)) {
					$zuserid = $wtwhandlers->getRandomString(16,1);
					$zuploadpathid = $wtwhandlers->getRandomString(16,1);
					$zoptions = ['cost' => 11];
					$zpasswordhash = password_hash($zpassword, PASSWORD_DEFAULT, $zoptions);
					$ztimestamp = date('Y/m/d H:i:s');
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."users 
							(userid,
							 uploadpathid, 
							 userpassword,
							 email,
							 displayname,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						  values
							('".$zuserid."',
							 '".$zuploadpathid."', 
							 '".$zpasswordhash."',
							 '".$zuseremail."',
							 '".addslashes($zdisplayname)."',
							 '".$ztimestamp."',
							 '".$zuserid."',
							 '".$ztimestamp."',
							 '".$zuserid."');
					");
					$_SESSION["wtw_userid"] = $zuserid;
					$_SESSION["wtw_uploadpathid"] = $zuploadpathid;			
					global $wtw;
					global $wtwuser;
					if (isset($wtw)) {
						$wtw->userid = $zuserid;
					}
					if (isset($wtwuser)) {
						$wtwuser->userid = $zuserid;
					}
					/* add user to Host Role by default if server host user role setting is enabled */
					$zaddhostrole = false;
					if (defined('wtw_server_host_user_role')) {
						if ($wtwhandlers->checkNumber(wtw_server_host_user_role,0) == 1) {
							$zaddhostrole = true;
						}
					}
					if ($zaddhostrole) {
						/* only add Host Role if not in Admin */
						if ($wtwhandlers->isUserInRole("admin") == false) {
							$this->addUserRole($zuserid, 'Host');
						}
					}
					$zsuccess = true;
				} else {
					$zserror = "Email is already in use.";
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwusers.php-createAccount=".$e->getMessage());
			$zserror = "Could not Create Account";
		}
		return array( 
			'success' => $zsuccess,
			'serror'  => $zserror,
			'userid' => $zuserid,
			'email'  => $zuseremail,
			'displayname'  => addslashes($zdisplayname));
	}
	
	public function emailExists($zuseremail) {
		/* check if email exists in database */
		global $wtwhandlers;
		$zfound = false;
		try {
			$zresults = $wtwhandlers->query("
				select userid
				from ".wtw_tableprefix."users
				where email like '".$zuseremail."'
				limit 1;");
			foreach ($zresults as $zrow) {
				$zfound = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwusers.php-emailExists=".$e->getMessage());
		}
		return $zfound;
	}

	public function getUserIdByEmail($zuseremail) {
		/* use email to find a user name */
		global $wtwhandlers;
		$zuserid = "";
		try {
			$zresults = $wtwhandlers->query("
				select userid
				from ".wtw_tableprefix."users
				where email like '".$zuseremail."'
				limit 1;");
			foreach ($zresults as $zrow) {
				$zuserid = $zrow["userid"];
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwusers.php-getUserIdByEmail=".$e->getMessage());
		}
		return $zuserid;
	}

	public function passwordRecovery($zuseremail) {
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>''
		);
		try {
			$zuserid = $this->getUserIdByEmail($zuseremail);
			if ($wtwhandlers->hasValue($zuserid)) {
				$zrecoverpassword = $wtwhandlers->getRandomString(128,1);
				$wtwhandlers->query("
					update ".wtw_tableprefix."users
					set recoverpassword='".$zrecoverpassword."',
						recoverpassworddate=now()
					where userid like '".$zuserid."';");
				/* send email */
				global $wtwtools;
				$zhtmlmessage = "You have requested to Reset Your Password on your ".$wtwhandlers->domainname." account using this email address.<br /><br />If you did not request to recover your password, ignore this email.<br /><br />Otherwise, to Reset your Password, please click this link:<br /><br /><a href='".$wtwhandlers->domainurl."/core/pages/passwordreset.php?email=".$zuseremail."&confirm=".$zrecoverpassword."'>Reset My Password</a><br /><br /><b>Welcome to WalkTheWeb 3D Internet!</b>";
				$zmessage = "You have requested to Reset Your Password on your ".$wtwhandlers->domainname." account using this email address.\r\n\r\nIf you did not request to recover your password, ignore this email.\r\n\r\nOtherwise, to Reset your Password, please copy and paste this link into your browser:\r\n\r\n".$wtwhandlers->domainurl."/core/pages/passwordreset.php?email=".$zuseremail."&confirm=".$zrecoverpassword."\r\n\r\nWelcome to WalkTheWeb 3D Internet!";
				$zresponse = $wtwtools->sendEmail(array($zuseremail), '', '', $wtwhandlers->domainname.' - Password Recovery', $zhtmlmessage, $zmessage);
			} else {
				$zresponse = array(
					'serror'=>'User Account Not Found or Not Validated'
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwusers.php-passwordRecovery=".$e->getMessage());
		}
		return $zresponse;
	}

	public function checkEmailValidation($zemail, $zuserid) {
		global $wtwhandlers;
		$zresponse = array(
			'valid'=>'0',
			'emailconfirm'=>'',
			'userid'=>'',
			'displayname'=>''
		);
		try {
			if ($wtwhandlers->hasValue($zuserid) && $wtwhandlers->hasValue($zemail)) {
				$zresults = $wtwhandlers->query("
					select *
					from ".wtw_tableprefix."users
					where email like '".$zemail."'
						and userid='".$zuserid."'
						and deleted=0
					order by createdate
					limit 1;");
				foreach ($zresults as $zrow) {
					if ($wtwhandlers->hasValue($zrow["emailconfirmdate"])) {
						$zresponse = array(
							'valid'=>'1',
							'emailconfirm'=>'',
							'userid'=>$zrow["userid"],
							'displayname'=>$zrow["displayname"]
						);
					} else {
						$zemailconfirm = $wtwhandlers->getRandomString(128,1);
						$wtwhandlers->query("
							update ".wtw_tableprefix."users
							set emailconfirm='".$zemailconfirm."'
							where userid like '".$zrow["userid"]."';");
						$zresponse = array(
							'valid'=>'0',
							'emailconfirm'=>$zemailconfirm,
							'userid'=>'',
							'displayname'=>''
						);
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwusers.php-checkEmailValidation=".$e->getMessage());
		}
		return $zresponse;
	}

	public function saveMyProfile($zuserid, $zdisplayname, $zuseremail, $zfirstname, $zlastname, $zgender, $zdob) {
		/* update the local user profile */
		global $wtwhandlers;
		$zresponse = "";
		try {
			if (!empty($wtwhandlers->getSessionUserID())) {
				$zdisplayname = $wtwhandlers->decode64($zdisplayname);
				$zfirstname = $wtwhandlers->decode64($zfirstname);
				$zlastname = $wtwhandlers->decode64($zlastname);
				$zgender = $wtwhandlers->decode64($zgender);
				
				$zfounduserid = '';
				$zresults = $wtwhandlers->query("
					select * from ".wtw_tableprefix."users
					where email='".$zuseremail."'
						and userid='".$zuserid."'
						and deleted=0
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfounduserid = $zrow["userid"];
				}
				
				if ($wtwhandlers->hasValue($zdob)) {
					$zdob = date('Y-m-d', strtotime($zdob));
					$zdob = "'".$zdob."'";
				} else {
					$zdob = "null";
				}
				if ($this->isEmailAvailable($zuseremail) || (!empty($zfounduserid) && $zfounduserid == $zuserid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."users
						set email='".$zuseremail."',
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where userid='".$wtwhandlers->userid."'
							and deleted=0;");
					$zsuccess = true;
				} else {
					$zresponse .= "Email already in use<br />";
				}
				$wtwhandlers->query("
					update ".wtw_tableprefix."users
					set displayname='".addslashes($zdisplayname)."',
						firstname='".addslashes($zfirstname)."',
						lastname='".addslashes($zlastname)."',
						gender='".addslashes($zgender)."',
						dob=".$zdob.",
						updatedate=now(),
						updateuserid='".$wtwhandlers->userid."'
					where userid='".$wtwhandlers->userid."'
						and deleted=0;");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwusers.php-saveMyProfile=".$e->getMessage());
			$zresponse = "<span style=\"color:red;\">Could not update.</span><br />";
		}
		return $zresponse;
	}
	
	public function saveProfile($zuseravatarid, $zinstanceid, $zdisplayname, $zemail) {
		/* update the user profile */
		global $wtwhandlers;
		$zresponse = "";
		try {
			$zsuccess = false;
			if (!empty($wtwhandlers->getSessionUserID())) {
				$zdisplayname = $wtwhandlers->decode64($zdisplayname);
				$zfounduserid = '';
				$zresults = $wtwhandlers->query("
					select * from ".wtw_tableprefix."users
					where email='".$zemail."'
						and userid='".$wtwhandlers->userid."'
						and deleted=0
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfounduserid = $zrow["userid"];
				}
				
				if ($this->isEmailAvailable($zemail) || (!empty($zfounduserid) && $zfounduserid == $zuserid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."users
						set email='".$zemail."',
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where userid='".$wtwhandlers->userid."'
							and deleted=0;");
					$zsuccess = true;
				} else {
					$zresponse .= "Email already in use<br />";
				}
				if ($wtwhandlers->hasValue($zuseravatarid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."useravatars
						set displayname='".addslashes($zdisplayname)."',
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where userid='".$wtwhandlers->userid."'
							and useravatarid='".$zuseravatarid."'
							and deleted=0;");
					$zsuccess = true;
				}
				if ($zsuccess && empty($zresponse)) {
					$zresponse .= "<span style=\"color:green;\">Updated Successfully</span><br />";
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwusers.php-saveProfile=".$e->getMessage());
		}
		return $zresponse;
	}
	
	public function saveDisplayName($zuserid, $zdisplayname) {
		/* update the local user displayname */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=> ''
		);
		try {
			if (!empty($wtwhandlers->getSessionUserID())) {
				$zdisplayname = $wtwhandlers->decode64($zdisplayname);
				
				$zfounduserid = '';
				$zresults = $wtwhandlers->query("
					select * from ".wtw_tableprefix."users
					where userid='".$zuserid."'
						and deleted=0
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfounduserid = $zrow["userid"];
				}
				
				if (!empty($zfounduserid) && $wtwhandlers->userid == $zuserid) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."users
						set displayname='".addslashes($zdisplayname)."',
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where userid='".$wtwhandlers->userid."'
							and deleted=0;");
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwusers.php-saveDisplayName=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage()
			);
		}
		return $zresponse;
	}
	
	public function saveUser($zuserid, $zdisplayname, $zemail) {
		/* save the user and email */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->isUserInRole("admin")) {
				$zdisplayname = $wtwhandlers->decode64($zdisplayname);
				$wtwhandlers->query("
					update ".wtw_tableprefix."users
					set displayname='".addslashes($zdisplayname)."',
						email='".$zemail."'
					where userid='".$zuserid."'
					limit 1;");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwusers.php-saveUser=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function saveNewUser($zdisplayname, $zpassword, $zemail) {
		/* add new user to database - does not add permissions or roles */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->isUserInRole("admin")) {
				$zdisplayname = $wtwhandlers->decode64($zdisplayname);
				$zpassword = $wtwhandlers->decode64($zpassword);
				if ($this->isEmailAvailable($zemail)) {
					$zuserid = $wtwhandlers->getRandomString(16,1);
					$zuploadpathid = $wtwhandlers->getRandomString(16,1);

					$zoptions = ['cost' => 11];
					$zpasswordhash = password_hash($zpassword, PASSWORD_DEFAULT, $zoptions);

					$wtwhandlers->query("
						insert into ".wtw_tableprefix."users 
							(userid,
							 uploadpathid, 
							 userpassword,
							 email,
							 displayname,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						  values
							('".$zuserid."',
							 '".$zuploadpathid."', 
							 '".$zpasswordhash."',
							 '".$zemail."',
							 '".addslashes($zdisplayname)."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwusers.php-saveNewUser=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function deleteUser($zuserid) {
		/* flags a user as deleted - does not delete so that they cannot merely just register the same email again */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->isUserInRole("admin")) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."users
					set deleted=1,
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where userid='".$zuserid."'
					limit 1;");
				$zresults = $wtwhandlers->query("
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
			$wtwhandlers->serror("core-functions-class_wtwusers.php-deleteUser=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function saveRole($zroleid, $zrolename) {
		/* save the role name */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->isUserInRole("admin")) {
				$zrolename = $wtwhandlers->decode64($zrolename);
				$wtwhandlers->query("
					update ".wtw_tableprefix."roles
					set rolename='".addslashes($zrolename)."'
					where roleid='".$zroleid."'
					limit 1;");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwusers.php-saveRole=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function saveNewRole($zrolename) {
		/* add new role to database - does not add permissions to role */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->isUserInRole("admin")) {
				$zrolename = $wtwhandlers->decode64($zrolename);
				$zresults = $wtwhandlers->query("
					select *
					from ".wtw_tableprefix."roles
					where rolename like '".addslashes($zrolename)."'
					limit 1;");
				if (count($zresults) == 0) {
					$zroleid = $wtwhandlers->getRandomString(16,1);
					
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."roles 
							(roleid,
							 rolename,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						  values
							('".$zroleid."',
							 '".addslashes($zrolename)."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwusers.php-saveNewRole=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function deleteRole($zroleid) {
		/* flags a role as deleted - some roles are protected and cannot be delete using this function */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->isUserInRole("admin")) {
				$zrolename = '';
				$zresults = $wtwhandlers->query("
					select *
					from ".wtw_tableprefix."roles
					where roleid='".$zroleid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zrolename = strtolower($zrow["rolename"]);
				}
				if ($zrolename != 'admin' && $zrolename != 'architect' && $zrolename != 'developer' && $zrolename != 'graphics artist' && $zrolename != 'guest' && $zrolename != 'host' && $zrolename != 'subscriber') {
					$wtwhandlers->query("
						update ".wtw_tableprefix."roles
						set deleted=1,
							deleteddate=now(),
							deleteduserid='".$wtwhandlers->userid."'
						where roleid='".$zroleid."'
						limit 1;");
					$zresults = $wtwhandlers->query("
						select deleted
						from ".wtw_tableprefix."roles
						where roleid='".$zroleid."'
						limit 1;");
					foreach ($zresults as $zrow) {
						if ($zrow["deleted"] == 1) {
							$zsuccess = true;
						}
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwusers.php-deleteRole=".$e->getMessage());
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
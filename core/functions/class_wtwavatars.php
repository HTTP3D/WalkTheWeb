<?php
class wtwavatars {
	/* $wtwavatars class for admin database functions for avatars */
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

	public function getAvatar($zuseravatarid,$zinstanceid) {
		/* gets basic avatar information - runtime uses /connect/useravatar.php for local and anonymous; (there is a different global option) */
		global $wtwhandlers;
		$zfounduseravatarid = "";
		try {
			/* check for existing avatar for loggedin user */ 
			$zresults = $wtwhandlers->query("
				select useravatarid 
				from ".wtw_tableprefix."useravatars 
				where useravatarid='".$zuseravatarid."' 
					and userid='".$wtwhandlers->userid."' 
					and not userid=''
				limit 1;");
			foreach ($zresults as $zrow) {
				$zfounduseravatarid = $zrow["useravatarid"];
			}
			if (empty($zfounduseravatarid) || !isset($zfounduseravatarid)) {
				/* check for existing avatar by user instance */ 
				$zresults = $wtwhandlers->query("
					select useravatarid 
					from ".wtw_tableprefix."useravatars 
					where useravatarid='".$zuseravatarid."' 
						and instanceid='".$zinstanceid."' 
						and not instanceid='' 
					order by updatedate desc 
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfounduseravatarid = $zrow["useravatarid"];
				}
			}
			if ((empty($zfounduseravatarid) || !isset($zfounduseravatarid)) && !empty($wtwhandlers->userid) && isset($wtwhandlers->userid)) {
				/* check for existing avatar by loggedin user and instance */ 
				$zresults = $wtwhandlers->query("
					select useravatarid 
					from ".wtw_tableprefix."useravatars 
					where userid='".$wtwhandlers->userid."'
						and not userid='' 
					order by updatedate desc limit 1;");
				foreach ($zresults as $zrow) {
					$zfounduseravatarid = $zrow["useravatarid"];
				}
			}
			if ((empty($zfounduseravatarid) || !isset($zfounduseravatarid)) && !empty($zinstanceid) && isset($zinstanceid)) {
				/* check for existing avatar by loggedin user */ 
				$zresults = $wtwhandlers->query("
					select useravatarid 
					from ".wtw_tableprefix."useravatars 
					where instanceid='".$zinstanceid."'
						and not instanceid='' 
					order by updatedate desc limit 1;");
				foreach ($zresults as $zrow) {
					$zfounduseravatarid = $zrow["useravatarid"];
				}
			}
			if (empty($zfounduseravatarid) || !isset($zfounduseravatarid)) {
				$zfounduseravatarid = "";
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-getAvatar=".$e->getMessage());
		}
		return $zfounduseravatarid;
	}

	public function deleteUserAvatar($zuseravatarid) {
		/* flags the user avatar as deleted so it no longer shows up on the my avatars list */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>''
		);
		try {
			if (isset($zuseravatarid) && !empty($zuseravatarid) && isset($wtwhandlers->userid) && !empty($wtwhandlers->userid)) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."useravatars 
					set deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."',
						deleted=1
					where userid='".$wtwhandlers->userid."'
						and not userid=''
						and useravatarid='".$zuseravatarid."'
					limit 1;");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-deleteUserAvatar=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage()
			);
		}
		return $zresponse;
	}

	public function getUserSession($zinstanceid) {
		/* get local user informaiton based on logged in session */
		global $wtwhandlers;
		$zresponse = "";
		try {
			$zavatar = array();
			if (!empty($wtwhandlers->userid) && isset($wtwhandlers->userid)) {
				$zresults = $wtwhandlers->query("
					select u.*,
						a.useravatarid
					from ".wtw_tableprefix."users u 
						left join (select * 
							from ".wtw_tableprefix."useravatars 
							where userid='".$wtwhandlers->userid."' 
								and (not userid='') 
								and deleted=0 
							order by updatedate desc limit 1) a
						on u.userid=a.userid
					where u.userid='".$wtwhandlers->userid."';");
				foreach ($zresults as $zrow) {
					$zavatar = array(
						'userid'=> $zrow["userid"],
						'useravatarid'=> $zrow["useravatarid"],
						'uploadpathid'=> $zrow["uploadpathid"],
						'displayname'=> $zrow["displayname"],
						'userimageurl'=> $zrow["userimageurl"],
						'email'=> $zrow["email"]
					);
				}
			} else {
				$zresults = $wtwhandlers->query("
					select useravatarid
					from ".wtw_tableprefix."useravatars 
					where instanceid='".$zinstanceid."' 
								and userid=''
								and deleted=0 
							order by updatedate desc limit 1;");
				foreach ($zresults as $zrow) {
					$zavatar = array(
						'userid'=> '',
						'useravatarid'=> $zrow["useravatarid"],
						'uploadpathid'=> '',
						'displayname'=> 'Anonymous',
						'userimageurl'=> '',
						'email'=> ''
					);
				}
			}
			$zresponse = json_encode($zavatar);
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-users.php-getUserSession=".$e->getMessage());
		}
		return $zresponse;
	}
		
	public function quickSaveAvatar($zinstanceid, $zuserip, $zavatarid, $zdisplayname) {
		/* adds new quick pick avatar to user account */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'useravatarid'=> ''
		);
		$zfounduseravatarid = '';
		try {
			if (!empty($wtwhandlers->userid) && isset($wtwhandlers->userid)) {
				/* check for existing avatar with same avatarid and userid */ 
				$zresults = $wtwhandlers->query("
					select * 
					from ".wtw_tableprefix."useravatars 
					where avatarid='".$zavatarid."'
						and userid='".$wtwhandlers->userid."' 
						and deleted=0
					order by updatedate desc
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfounduseravatarid = $zrow["useravatarid"];
				}
				if (empty($zfounduseravatarid) || !isset($zfounduseravatarid)) {
					/* if not found, add avatar to user account in useravatars table */
					$zfoundavatarid = '';
					$zavatargroup = 'default';
					$zavatardescription = '';
					$zobjectfolder = '';
					$zobjectfile = '';
					$zgender = '';
					$zpositionx = 0;
					$zpositiony = 0;
					$zpositionz = 0;
					$zscalingx = 1;
					$zscalingy = 1;
					$zscalingz = 1;
					$zrotationx = 0;
					$zrotationy = 0;
					$zrotationz = 0;
					$zstartframe = 0;
					$zendframe = 0;
					$zdisplayname = $wtwhandlers->decode64($zdisplayname);
					/* get default avatar definition from avatars table */
					$zresults = $wtwhandlers->query("
						select * 
						from ".wtw_tableprefix."avatars 
						where avatarid='".$zavatarid."'
							and deleted=0
						order by updatedate desc
						limit 1;");
					foreach ($zresults as $zrow) {
						$zfoundavatarid = $zrow["avatarid"];
						$zavatargroup = $zrow["avatargroup"];
						$zavatardescription = $zrow["avatardescription"];
						$zobjectfolder = $zrow["objectfolder"];
						$zobjectfile = $zrow["objectfile"];
						$zgender = $zrow["gender"];
						$zpositionx = $zrow["positionx"];
						$zpositiony = $zrow["positiony"];
						$zpositionz = $zrow["positionz"];
						$zscalingx = $zrow["scalingx"];
						$zscalingy = $zrow["scalingy"];
						$zscalingz = $zrow["scalingz"];
						$zrotationx = $zrow["rotationx"];
						$zrotationy = $zrow["rotationy"];
						$zrotationz = $zrow["rotationz"];
						$zstartframe = $zrow["startframe"];
						$zendframe = $zrow["endframe"];
					}
					
					if (isset($zfoundavatarid) && !empty($zfoundavatarid)) {
						/* save new avatar to useravatars, using avatar table data */
						$zfounduseravatarid = $wtwhandlers->getRandomString(16,1);
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."useravatars
								(useravatarid,
								 instanceid,
								 userid,
								 userip,
								 avatarid,
								 avatargroup,
								 objectfolder,
								 objectfile,
								 gender,
								 positionx,
								 positiony,
								 positionz,
								 scalingx,
								 scalingy,
								 scalingz,
								 rotationx,
								 rotationy,
								 rotationz,
								 startframe,
								 endframe,
								 displayname,
								 avatardescription,
								 lastdate,
								 lastip,
								 createdate,
								 createuserid,
								 updatedate,
								 updateuserid)
							values
								('".$zfounduseravatarid."',
								 '".$zinstanceid."',
								 '".$wtwhandlers->userid."',
								 '".$zuserip."',
								 '".$zfoundavatarid."',
								 '".$zavatargroup."',
								 '/content/uploads/useravatars/".$zfounduseravatarid."/',
								 '".$zobjectfile."',
								 '".$zgender."',
								 ".$wtwhandlers->checkNumber($zpositionx,0).",
								 ".$wtwhandlers->checkNumber($zpositiony,0).",
								 ".$wtwhandlers->checkNumber($zpositionz,0).",
								 ".$wtwhandlers->checkNumber($zscalingx,1).",
								 ".$wtwhandlers->checkNumber($zscalingy,1).",
								 ".$wtwhandlers->checkNumber($zscalingz,1).",
								 ".$wtwhandlers->checkNumber($zrotationx,0).",
								 ".$wtwhandlers->checkNumber($zrotationy,0).",
								 ".$wtwhandlers->checkNumber($zrotationz,0).",
								 ".$wtwhandlers->checkNumber($zstartframe,0).",
								 ".$wtwhandlers->checkNumber($zendframe,0).",
								 '".$wtwhandlers->checkDisplayName($zdisplayname, 'Anonymous')."',
								 '".$zavatardescription."',
								 now(),
								 '".$zuserip."',
								 now(),
								 '".$wtwhandlers->userid."',
								 now(),
								 '".$wtwhandlers->userid."');");
								 
						$zresponse = array(
							'serror'=>'',
							'useravatarid'=> $zfounduseravatarid
						);

						/* copy the files from avatars/avatarid to useravatars/useravatarid folder */
						$zsourcefolder = wtw_rootpath.'/content/uploads/avatars/'.$zfoundavatarid;
						$zdestinationfolder = wtw_rootpath.'/content/uploads/useravatars/'.$zfounduseravatarid;
						$wtwhandlers->copyContentSubFolderRecursive($zsourcefolder, $zdestinationfolder);

						/* add default avatar colors for new user avatar */
						$zresults = $wtwhandlers->query("
							select * 
							from ".wtw_tableprefix."avatarcolors 
							where avatarid='".$zavatarid."' 
								and deleted=0;");
						foreach ($zresults as $zrow) {
							$wtwhandlers->query("
								insert into ".wtw_tableprefix."useravatarcolors
								   (avatarpartid,
									userid,
									useravatarid,
									instanceid,
									avatarpart,
									diffusecolor,
									specularcolor,
									emissivecolor,
									ambientcolor,
									createdate,
									createuserid,
									updatedate,
									updateuserid)
								   values
								   ('".$wtwhandlers->getRandomString(16,1)."',
								    '".$wtwhandlers->userid."',
									'".$zfounduseravatarid."',
									'".$zinstanceid."',
									'".$zrow["avatarpart"]."',
									'".$zrow["diffusecolor"]."',
									'".$zrow["specularcolor"]."',
									'".$zrow["emissivecolor"]."',
									'".$zrow["ambientcolor"]."',
									now(),
									'".$wtwhandlers->userid."',
									now(),
									'".$wtwhandlers->userid."');");
						}

						/* add default animations for new user avatar */
						$zresults = $wtwhandlers->query("
							select * 
							from ".wtw_tableprefix."avataranimations 
							where avatarid='".$zavatarid."'
								and deleted=0
							order by loadpriority desc, animationevent, avataranimationid;");
						foreach ($zresults as $zrow) {
							$wtwhandlers->query("
								insert into ".wtw_tableprefix."useravataranimations
								   (useravataranimationid,
									avataranimationid,
									useravatarid,
									loadpriority,
									animationevent,
									animationfriendlyname,
									animationicon,
									objectfolder,
									objectfile,
									startframe,
									endframe,
									animationloop,
									speedratio,
									walkspeed,
									soundid,
									soundmaxdistance,
									createdate,
									createuserid,
									updatedate,
									updateuserid)
								   values
								   ('".$wtwhandlers->getRandomString(16,1)."',
									'".$zrow["avataranimationid"]."',
									'".$zfounduseravatarid."',
									".$wtwhandlers->checkNumber($zrow["loadpriority"],0).",
									'".$zrow["animationevent"]."',
									'".$zrow["animationfriendlyname"]."',
									'".$zrow["animationicon"]."',
									'/content/uploads/useravatars/".$zfounduseravatarid."/animations/',
									'".$zrow["objectfile"]."',
									".$wtwhandlers->checkNumber($zrow["startframe"],1).",
									".$wtwhandlers->checkNumber($zrow["endframe"],1).",
									".$wtwhandlers->checkNumber($zrow["animationloop"],1).",
									".$wtwhandlers->checkNumber($zrow["speedratio"],1).",
									1.00,
									'".$zrow["soundid"]."',
									".$wtwhandlers->checkNumber($zrow["soundmaxdistance"],50).",
									now(),
									'".$wtwhandlers->userid."',
									now(),
									'".$wtwhandlers->userid."');");
						}
					}
				} else {
					$zresponse = array(
						'serror'=>'',
						'useravatarid'=> $zfounduseravatarid
					);
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-quickSaveAvatar=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage(),
				'useravatarid'=> ''
			);
		}
		return $zresponse;
	}
	
	public function setUserAvatarGlobalHash($zuseravatarid) {
		/* adds new quick pick avatar to user account */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'globalhash'=> ''
		);
		try {
			if (!empty($wtwhandlers->userid) && isset($wtwhandlers->userid)) {
				$zglobalhash = $wtwhandlers->getRandomString(16,1);
				$wtwhandlers->query("
				update ".wtw_tableprefix."useravatars 
				set globalhash='".$zglobalhash."',
					updatedate=now(),
					updateuserid='".$wtwhandlers->userid."'
				where useravatarid='".$zuseravatarid."' 
					and deleted=0 
				limit 1;");
				$zresponse = array(
					'serror'=>'',
					'globalhash'=> base64_encode($zglobalhash)
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-setUserAvatarGlobalHash=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage(),
				'globalhash'=> ''
			);
		}
		return $zresponse;
	}

	public function saveAvatarColor($zuseravatarid,$zinstanceid,$zavatarpart,$zemissivecolorr,$zemissivecolorg,$zemissivecolorb) {
		/* save color settings for current user avatar - depreciated with release v3.3.0 and avatar designer plugin */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			$wtwhandlers->getSessionUserID();
			$zavatarpartid = "";
			$zfounduseravatarid = $this->getAvatar($zuseravatarid,$zinstanceid);
			$zresults = $wtwhandlers->query("
				select avatarpartid 
				from ".wtw_tableprefix."useravatarcolors 
				where useravatarid='".$zfounduseravatarid."' 
					and avatarpart='".$zavatarpart."' 
				limit 1;");
			foreach ($zresults as $zrow) {
				$zavatarpartid = $zrow["avatarpartid"];
			}
			if (!empty($zavatarpartid) && isset($zavatarpartid)) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."useravatarcolors
					set avatarpart='".$zavatarpart."',
						emissivecolorr=".$wtwhandlers->checkNumber($zemissivecolorr,1).",
						emissivecolorg=".$wtwhandlers->checkNumber($zemissivecolorg,1).",
						emissivecolorb=".$wtwhandlers->checkNumber($zemissivecolorb,1).",
						updatedate=now(),
						updateuserid='".$wtwhandlers->userid."',
						deleteddate=null,
						deleteduserid='',
						deleted=0
					where avatarpartid='".$zavatarpartid."';");
			} else {
				$zavatarpartid = $wtwhandlers->getRandomString(16,1);
				$wtwhandlers->query("
					insert into ".wtw_tableprefix."useravatarcolors
						(avatarpartid,
						 useravatarid,
						 userid,
						 instanceid,
						 avatarpart,
						 emissivecolorr,
						 emissivecolorg,
						 emissivecolorb,
						 createdate,
						 createuserid,
						 updatedate,
						 updateuserid)
						values
						('".$zavatarpartid."',
						 '".$zuseravatarid."',
						 '".$wtwhandlers->userid."',
						 '".$zinstanceid."',
						 '".$zavatarpart."',
						 ".$wtwhandlers->checkNumber($zemissivecolorr,1).",
						 ".$wtwhandlers->checkNumber($zemissivecolorg,1).",
						 ".$wtwhandlers->checkNumber($zemissivecolorb,1).",
						 now(),
						 '".$wtwhandlers->userid."',
						 now(),
						 '".$wtwhandlers->userid."');");
			}
			$zsuccess = true;
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-saveAvatarColor=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function saveAvatarDisplayName($zuseravatarid,$zinstanceid,$zavatardisplayname) {
		/* save display name for current user avatar - depreciated with release v3.3.0 and avatar designer plugin */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if (!empty($wtwhandlers->getSessionUserID()) && !empty($zuseravatarid) && isset($zuseravatarid) && !empty($zavatardisplayname) && isset($zavatardisplayname)) {
				/* check if someone else is using that displayname */
				$zfounduserid = "";
				$zfounduseravatarid = "";
				$zresults = $wtwhandlers->query("
					select * 
					from ".wtw_tableprefix."useravatars
					where displayname='".$zavatardisplayname."' 
						and deleted=0
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfounduserid = $zrow["userid"];
					$zfounduseravatarid = $zrow["useravatarid"];
				}
				if (empty($zfounduserid) || !isset($zfounduserid) || $wtwhandlers->userid == $zfounduserid) {
					/* either it is available or you have it */
					if (!empty($zfounduseravatarid) && isset($zfounduseravatarid) && $zfounduseravatarid == $zuseravatarid) {
						/*no update needed */
					} else {
						/* swap names with your other avatar */
						$zolddisplayname = "";
						$zolduseravatarid = "";
						/* get old name you are replacing from current avatar */
						$zresults = $wtwhandlers->query("
							select displayname 
							from ".wtw_tableprefix."useravatars
							where useravatarid='".$zuseravatarid."'
								and userid='".$wtwhandlers->userid."'
							limit 1;");
						foreach ($zresults as $zrow) {
							$zolddisplayname = $zrow["displayname"];
						}
						/* get old useravatarid you are taking the name from */
						$zresults = $wtwhandlers->query("
							select useravatarid 
							from ".wtw_tableprefix."useravatars
							where displayname='".$zavatardisplayname."'
								and userid='".$wtwhandlers->userid."'
							limit 1;");
						foreach ($zresults as $zrow) {
							$zolduseravatarid = $zrow["useravatarid"];
						}
						/* set new display name */
						$wtwhandlers->query("
							update ".wtw_tableprefix."useravatars
							set displayname='".$zavatardisplayname."',
								updatedate=now(),
								updateuserid='".$wtwhandlers->userid."',
								deleteddate=null,
								deleteduserid='',
								deleted=0
							where useravatarid='".$zuseravatarid."'
								and userid='".$wtwhandlers->userid."';");
						/* set old displayname on your other avatar */
						$wtwhandlers->query("
							update ".wtw_tableprefix."useravatars
							set displayname='".$zolddisplayname."',
								updatedate=now(),
								updateuserid='".$wtwhandlers->userid."',
								deleteddate=null,
								deleteduserid='',
								deleted=0
							where useravatarid='".$zolduseravatarid."'
								and userid='".$wtwhandlers->userid."';");
					}
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-saveAvatarDisplayName=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function saveAvatarAnimation($zuseravataranimationid,$zuseravatarid,$zinstanceid,$zavataranimationid,$zanimationevent,$zspeedratio) {
		/* save avatar animation settings for current user avatar - depreciated with release v3.3.0 and avatar designer plugin */
		global $wtwhandlers;
		try {
			$wtwhandlers->getSessionUserID();
			$zfounduseravataranimationid = "";
			$zfounduseravatarid = $this->getAvatar($zuseravatarid,$zinstanceid);
			$zresults = $wtwhandlers->query("
					select useravataranimationid 
					from ".wtw_tableprefix."useravataranimations 
					where animationevent='".$zanimationevent."' 
						and (not animationevent='') 
						and useravatarid='".$zfounduseravatarid."' 
						and not useravatarid='' 
					limit 1;");
			foreach ($zresults as $zrow) {
				$zfounduseravataranimationid = $zrow["useravataranimationid"];
			}
			if ($zanimationevent == 'onoption' && !empty($zuseravataranimationid) && isset($zuseravataranimationid)) {
				$zfounduseravataranimationid = $zuseravataranimationid;
			} else if ($zanimationevent == 'onoption') {
				$zfounduseravataranimationid = "";
			}
			if (!empty($zfounduseravataranimationid) && isset($zfounduseravataranimationid)) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."useravataranimations
					set avataranimationid='".$zavataranimationid."',
						 useravatarid='".$zfounduseravatarid."',
						 animationevent='".$zanimationevent."',
						 speedratio=".$wtwhandlers->checkNumber($zspeedratio,1).",
						 updatedate=now(),
						 updateuserid='".$wtwhandlers->userid."',
						 deleteddate=null,
						 deleteduserid='',
						 deleted=0
					where useravataranimationid='".$zfounduseravataranimationid."';");
			} else {
				$zfounduseravataranimationid = $wtwhandlers->getRandomString(16,1);
				$wtwhandlers->query("
					insert into ".wtw_tableprefix."useravataranimations
						(useravataranimationid,
						 avataranimationid,
						 useravatarid,
						 animationevent,
						 speedratio,
						 createdate,
						 createuserid,
						 updatedate,
						 updateuserid)
						values
						('".$zfounduseravataranimationid."',
						 '".$zavataranimationid."',
						 '".$zfounduseravatarid."',
						 '".$zanimationevent."',
						 ".$wtwhandlers->checkNumber($zspeedratio,1).",
						 now(),
						 '".$wtwhandlers->userid."',
						 now(),
						 '".$wtwhandlers->userid."');");
			}
			$zuseravataranimationid = $zfounduseravataranimationid;
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-saveAvatarAnimation=".$e->getMessage());
		}
		return $zuseravataranimationid;
	}
	
	public function getAvatarAnimationsAll($zuseravatarid, $zinstanceid) {
		/* gets all avatar animations for menu - depreciated with release v3.3.0 and avatar designer plugin */
		global $wtwhandlers;
		$zresponse = null;
		$animations = array();
		try {
			$zfounduseravatarid = $this->getAvatar($zuseravatarid,$zinstanceid);
			$zresults = $wtwhandlers->query("
				select a.*,
					u.useravataranimationid,
					u.useravatarid,
					u.speedratio as myspeedratio,
					u.walkspeed as mywalkspeed
				from ".wtw_tableprefix."avataranimations a 
					left join (select * 
						from ".wtw_tableprefix."useravataranimations 
						where useravatarid='".$zfounduseravatarid."' 
							and deleted=0) u
					on a.avataranimationid = u.avataranimationid
				where (a.userid='".$wtwhandlers->userid."' 
					or a.userid='')
					and a.deleted=0
				order by a.loadpriority desc, 
						a.animationevent, 
						a.animationfriendlyname, 
						a.avataranimationid;");
			$i = 0;
			foreach ($zresults as $zrow) {
				$animations[$i] = array(
					'avataranimationid'=> $zrow["avataranimationid"],
					'avatarid'=> $zrow["avatarid"],
					'userid'=> $zrow["userid"],
					'loadpriority'=> $zrow["loadpriority"],
					'animationevent'=> $zrow["animationevent"],
					'animationicon'=> $zrow["animationicon"],
					'animationfriendlyname'=> $zrow["animationfriendlyname"],
					'objectfolder'=> $zrow["objectfolder"],
					'objectfile'=> $zrow["objectfile"],
					'startframe'=> $zrow["startframe"],
					'endframe'=> $zrow["endframe"],
					'animationloop'=> $zrow["animationloop"],
					'speedratio'=> $zrow["speedratio"],
					'soundid'=> $zrow["soundid"],
					'soundpath'=> $zrow["soundpath"],
					'soundmaxdistance'=> $zrow["soundmaxdistance"],
					'useravataranimationid'=> $zrow["useravataranimationid"],
					'useravatarid'=> $zrow["useravatarid"],
					'myspeedratio'=> $zrow["myspeedratio"],
					'mywalkspeed'=> $zrow["mywalkspeed"],
					'totalframes' => '0',
					'totalstartframe' => '0',
					'totalendframe' => '0'
				);
				$i += 1;
			}
			$zresponse = json_encode($animations);
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-getAvatarAnimationsAll=".$e->getMessage());
		}
		return $zresponse;
	}
	
	public function deleteAvatarAnimation($zuseravataranimationid,$zuseravatarid,$zinstanceid,$zavataranimationid) {
		/* flags deleted when current user removes animation - depreciated with release v3.3.0 and avatar designer plugin */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			$zfounduseravatarid = $this->getAvatar($zuseravatarid,$zinstanceid);
			$zfounduseravataranimationid = "";
			$zresults = $wtwhandlers->query("
				select useravataranimationid 
				from ".wtw_tableprefix."useravataranimations 
				where useravataranimationid='".$zuseravataranimationid."' 
					and useravatarid='".$zfounduseravatarid."' 
					and not useravatarid='' 
				limit 1;");
			foreach ($zresults as $zrow) {
				$zfounduseravataranimationid = $zrow["useravataranimationid"];
			}
			if (!empty($zfounduseravataranimationid) && isset($zfounduseravataranimationid)) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."useravataranimations
					set avataranimationid='".$zavataranimationid."',
						 useravatarid='".$zfounduseravatarid."',
						 deleteddate=now(),
						 deleteduserid='".$wtwhandlers->userid."',
						 deleted=1
					where useravataranimationid='".$zfounduseravataranimationid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-deleteAvatarAnimation=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function updateAvatarTransport($zuseravatarid, $zinstanceid, $zavataranimation, $ztransport) {
		/* sets the avatar screen entrance */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			$zfounduseravatarid = $this->getAvatar($zuseravatarid,$zinstanceid);
			$zdirection = "exit";
			if ($ztransport == '1') {
				$zdirection = "enter";
			}
			$wtwhandlers->query("
				update ".wtw_tableprefix."useravatars
				set ".$zdirection."animation=".$zavataranimation.",
					 updatedate=now(),
					 updateuserid='".$wtwhandlers->userid."',
					 deleteddate=null,
					 deleteduserid='',
					 deleted=0
				where useravatarid='".$zfounduseravatarid."';");
			$zsuccess = true;
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-updateAvatarTransport=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function saveAvatarGroup($zavatargroupid, $zavatargroup) {
		/* saves the avatar group - admin function */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>''
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				$zfoundavatargroupid = '';
				$zresults = $wtwhandlers->query("
					select avatargroupid
					from ".wtw_tableprefix."avatargroups
					where avatargroupid='".$zavatargroupid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavatargroupid = $zrow["avatargroupid"];
				}
				if (empty($zfoundavatargroupid) || !isset($zfoundavatargroupid)) {
					if (empty($zavatargroupid) || !isset($zavatargroupid)) {
						$zavatargroupid = $wtwhandlers->getRandomString(16,1);
					}
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avatargroups
						   (avatargroupid,
						    avatargroup,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						  values
						   ('".$zavatargroupid."',
						    '".$zavatargroup."',
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');");
					
				} else {
					$wtwhandlers->query("
						update ".wtw_tableprefix."avatargroups
						set avatargroup='".$zavatargroup."',
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where avatargroupid='".$zavatargroupid."'
						limit 1;
					");
				}
			} else {
				$zresponse = array(
					'serror'=>'Requires Admin Permissions'
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-saveAvatarGroup=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage()
			);
		}
		return $zresponse;
	}
	
	public function deleteAvatarGroup($zavatargroupid) {
		/* deletes the avatar group - admin function */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>''
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."avatargroups
					set deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."',
						deleted=1
					where avatargroupid='".$zavatargroupid."'
					limit 1;
				");
			} else {
				$zresponse = array(
					'serror'=>'Requires Admin Permissions'
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-deleteAvatarGroup=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage()
			);
		}
		return $zresponse;
	}

	public function getAvatarGroups() {
		/* gets the avatar groups - admin function */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'avatargroups'=>array()
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				$zresults = $wtwhandlers->query("
					select avatargroupid,
						avatargroup
					from ".wtw_tableprefix."avatargroups
					where deleted=0
					order by avatargroup, avatargroupid;
				");
				$zresponse = array(
					'serror'=>'',
					'avatargroups'=>$zresults
				);
			} else {
				$zresponse = array(
					'serror'=>'Requires Admin Permissions',
					'avatargroups'=>array()
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-getAvatarGroups=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage(),
				'avatargroups'=>array()
			);
		}
		return $zresponse;
	}

	public function saveAvatarAnimationEvent($zanimationeventid, $zanimationevent, $zloadpriority) {
		/* saves the avatar animation event - admin function */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>''
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				$zfoundanimationeventid = '';
				if (!isset($zloadpriority)) {
					$zloadpriority = 0;
				} else if (!is_numeric($zloadpriority)) {
					$zloadpriority = 0;
				}
				$zresults = $wtwhandlers->query("
					select animationeventid
					from ".wtw_tableprefix."avataranimationevents
					where animationeventid='".$zanimationeventid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundanimationeventid = $zrow["animationeventid"];
				}
				if (empty($zfoundanimationeventid) || !isset($zfoundanimationeventid)) {
					if (empty($zanimationeventid) || !isset($zanimationeventid)) {
						$zanimationeventid = $wtwhandlers->getRandomString(16,1);
					}
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avataranimationevents
						   (animationeventid,
						    animationevent,
							loadpriority,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						  values
						   ('".$zanimationeventid."',
						    '".$zanimationevent."',
							".$zloadpriority.",
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');");
					
				} else {
					$wtwhandlers->query("
						update ".wtw_tableprefix."avataranimationevents
						set animationevent='".$zanimationevent."',
							loadpriority=".$zloadpriority.",
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where animationeventid='".$zanimationeventid."'
						limit 1;
					");
				}
			} else {
				$zresponse = array(
					'serror'=>'Requires Admin Permissions'
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-saveAvatarAnimationEvent=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage()
			);
		}
		return $zresponse;
	}
	
	public function deleteAvatarAnimationEvent($zanimationeventid) {
		/* deletes the avatar animation event - admin function */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>''
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."avataranimationevents
					set deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."',
						deleted=1
					where animationeventid='".$zanimationeventid."'
					limit 1;
				");
			} else {
				$zresponse = array(
					'serror'=>'Requires Admin Permissions'
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-deleteAvatarAnimationEvent=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage()
			);
		}
		return $zresponse;
	}

	public function getAvatarAnimationEvents() {
		/* gets the avatar animation events - admin function */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'animationevents'=>array()
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				$zresults = $wtwhandlers->query("
					select animationeventid,
						animationevent, loadpriority
					from ".wtw_tableprefix."avataranimationevents
					where deleted=0
					order by loadpriority desc, animationevent, animationeventid;
				");
				$zresponse = array(
					'serror'=>'',
					'animationevents'=>$zresults
				);
			} else {
				$zresponse = array(
					'serror'=>'Requires Admin Permissions',
					'animationevents'=>array()
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-getAvatarAnimationEvents=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage(),
				'animationevents'=>array()
			);
		}
		return $zresponse;
	}
	
	public function saveAvatarDefinitionRootAnimation($zavatarid, $zstartframe, $zendframe) {
		/* saves the avatar profile (Not User Avatar, just the starting avatar you can choose) - admin function */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'avatarid'=>$zavatarid
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				$zfoundavatarid = '';
				$zresults = $wtwhandlers->query("
					select avatarid
					from ".wtw_tableprefix."avatars
					where avatarid='".$zavatarid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavatarid = $zrow["avatarid"];
				}
				$wtwhandlers->query("
					update ".wtw_tableprefix."avatars
					set startframe=".$zstartframe.",
						endframe=".$zendframe.",
						updatedate=now(),
						updateuserid='".$wtwhandlers->userid."'
					where avatarid='".$zavatarid."'
					limit 1;
				");
			} else {
				$zresponse = array(
					'serror'=>'Requires Admin Permissions',
					'avatarid'=>$zavatarid
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-saveAvatarDefinitionRootAnimation=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage(),
				'avatarid'=>$zavatarid
			);
		}
		return $zresponse;
	}
	
	public function copyAvatarProfile($zavatarid) {
		/* saves the avatar profile (Not User Avatar, just the starting avatar you can choose) - admin function */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'avatarid'=>''
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				$znewavatarid = $wtwhandlers->getRandomString(16,1);
				$zobjectfolder = "/content/uploads/avatars/".$zavatarid."/";
				$znewobjectfolder = "/content/uploads/avatars/".$znewavatarid."/";
				
				/* need to make new avatar folder and copy the files to it */
				$zsourcefolder = wtw_rootpath.$zobjectfolder;
				$zdestinationfolder = wtw_rootpath.$znewobjectfolder;
				$wtwhandlers->copyContentSubFolderRecursive($zsourcefolder, $zdestinationfolder);
				
				/* copy the avatar from the avatars table */
				$wtwhandlers->query("
					insert into ".wtw_tableprefix."avatars
					   (avatarid,
					    pastavatarid,
						versionid,
						version,
						versionorder,
						versiondesc,
						avatargroup,
						displayname,
						avatardescription,
						objectfolder,
						objectfile,
						gender,
						positionx,
						positiony,
						positionz,
						scalingx,
						scalingy,
						scalingz,
						rotationx,
						rotationy,
						rotationz,
						startframe,
						endframe,
						sortorder,
						templatename,
						description,
						tags,
						snapshotid,
						alttag,
						createdate,
						createuserid,
						updatedate,
						updateuserid)
					 select '".$znewavatarid."' as avatarid,
						'".$zavatarid."' as pastavatarid,
						versionid,
						version,
						versionorder,
						versiondesc,
						avatargroup,
						CONCAT(displayname, ' - copy') as displayname,
						avatardescription,
						'".$znewobjectfolder."',
						objectfile,
						gender,
						positionx,
						positiony,
						positionz,
						scalingx,
						scalingy,
						scalingz,
						rotationx,
						rotationy,
						rotationz,
						startframe,
						endframe,
						sortorder,
						templatename,
						description,
						tags,
						snapshotid,
						alttag,
						now() as createdate,
						'".$wtwhandlers->userid."' as createuserid,
						now() as updatedate,
						'".$wtwhandlers->userid."' as updateuserid
					from ".wtw_tableprefix."avatars
					where avatarid='".$zavatarid."'
						and deleted=0;
				");
				
				/* get the avatar color parts from the avatarcolors table */
				$zresults = $wtwhandlers->query("
					select * 
					from ".wtw_tableprefix."avatarcolors
					where avatarid='".$zavatarid."'
						and deleted=0;");
				foreach ($zresults as $zrow) {
					$znewavatarpartid = $wtwhandlers->getRandomString(16,1);
					/* copy the avatar color parts from the avatarcolors table */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avatarcolors
						   (avatarpartid,
						    pastavatarpartid,
							avatarid,
							avatarpart,
							diffusecolor,
							specularcolor,
							emissivecolor,
							ambientcolor,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						  values
						   ('".$znewavatarpartid."',
						    '".$zrow["avatarpartid"]."',
							'".$znewavatarid."',
							'".$zrow["avatarpart"]."',
							'".$zrow["diffusecolor"]."',
							'".$zrow["specularcolor"]."',
							'".$zrow["emissivecolor"]."',
							'".$zrow["ambientcolor"]."',
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');
					");
				}

				/* get the avatar animations from the avataranimations table */
				$zresults = $wtwhandlers->query("
					select * 
					from ".wtw_tableprefix."avataranimations
					where avatarid='".$zavatarid."'
						and deleted=0;");
				foreach ($zresults as $zrow) {
					$znewavataranimationid = $wtwhandlers->getRandomString(16,1);
					$znewobjectfolder = str_replace($zavatarid, $znewavatarid, $zrow["objectfolder"]);
					/* copy the avatar animations from the avataranimations table */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avataranimations
						   (avataranimationid,
						    pastavataranimationid,
							avatarid,
							loadpriority,
							animationevent,
							animationfriendlyname,
							animationicon,
							objectfolder,
							objectfile,
							startframe,
							endframe,
							animationloop,
							speedratio,
							soundid,
							soundmaxdistance,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						  values
						   ('".$znewavataranimationid."',
						    '".$zrow["avataranimationid"]."',
							'".$znewavatarid."',
							".$zrow["loadpriority"].",
							'".$zrow["animationevent"]."',
							'".$zrow["animationfriendlyname"]."',
							'".$zrow["animationicon"]."',
							'".$znewobjectfolder."',
							'".$zrow["objectfile"]."',
							".$zrow["startframe"].",
							".$zrow["endframe"].",
							".$zrow["animationloop"].",
							".$zrow["speedratio"].",
							'".$zrow["soundid"]."',
							".$zrow["soundmaxdistance"].",
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');
					");
				}

				/* get the content rating */
				$zresults = $wtwhandlers->query("
					select * 
					from ".wtw_tableprefix."contentratings
					where webid='".$zavatarid."'
						and webtype='avatar'
						and deleted=0;");
				foreach ($zresults as $zrow) {
					$znewcontentratingid = $wtwhandlers->getRandomString(16,1);
					/* copy the content rating */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."contentratings
						   (contentratingid,
						    pastcontentrating,
							webid,
							webtype,
							rating,
							ratingvalue,
							contentwarning,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						  values
						   ('".$znewcontentratingid."',
						    '".$zrow["contentratingid"]."',
							'".$znewavatarid."',
							'avatar',
							'".$zrow["rating"]."',
							".$zrow["ratingvalue"].",
							'".$zrow["contentwarning"]."',
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');
					");
				}				
				
				$zresponse = array(
					'serror'=>'',
					'avatarid'=>$znewavatarid
				);
			} else {
				$zresponse = array(
					'serror'=>'Requires Admin Permissions',
					'avatarid'=>''
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-copyAvatarProfile=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage(),
				'avatarid'=>''
			);
		}
		return $zresponse;
	}
	
	public function saveAvatarProfile($zavatarid, $zavatargroup, $zdisplayname, $zobjectfolder, $zobjectfile, $zgender, $zscalingx, $zscalingy, $zscalingz, $zstartframe, $zendframe, $zsortorder) {
		/* saves the avatar profile (Not User Avatar, just the starting avatar you can choose) - admin function */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'avatarid'=>$zavatarid
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				$zfoundavatarid = '';
				$zresults = $wtwhandlers->query("
					select avatarid
					from ".wtw_tableprefix."avatars
					where avatarid='".$zavatarid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavatarid = $zrow["avatarid"];
				}
				if (empty($zfoundavatarid) || !isset($zfoundavatarid)) {
					if (empty($zavatarid) || !isset($zavatarid)) {
						$zavatarid = $wtwhandlers->getRandomString(16,1);
					}
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avatars
						   (avatarid,
						    versionid,
							version,
							versionorder,
							versiondesc,
						    avatargroup,
							displayname,
							objectfolder,
							objectfile,
							gender,
							scalingx,
							scalingy,
							scalingz,
							startframe,
							endframe,
							sortorder,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						  values
						   ('".$zavatarid."',
						    '".$zavatarid."',
							'1.0.0',
							1000000,
							'Initial Version',
						    '".$zavatargroup."',
						    '".$zdisplayname."',
						    '".$zobjectfolder."',
						    '".$zobjectfile."',
						    '".$zgender."',
						    ".$zscalingx.",
						    ".$zscalingy.",
						    ".$zscalingz.",
						    ".$zstartframe.",
						    ".$zendframe.",
						    ".$zsortorder.",
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');");
					$zresponse = array(
						'serror'=>'',
						'avatarid'=>$zavatarid
					);
				} else {
					$wtwhandlers->query("
						update ".wtw_tableprefix."avatars
						set avatargroup='".$zavatargroup."',
							displayname='".$zdisplayname."',
							objectfolder='".$zobjectfolder."',
							objectfile='".$zobjectfile."',
							gender='".$zgender."',
							scalingx=".$zscalingx.",
							scalingy=".$zscalingy.",
							scalingz=".$zscalingz.",
							startframe=".$zstartframe.",
							endframe=".$zendframe.",
							sortorder=".$zsortorder.",
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where avatarid='".$zavatarid."'
						limit 1;
					");
				}
			} else {
				$zresponse = array(
					'serror'=>'Requires Admin Permissions',
					'avatarid'=>$zavatarid
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-saveAvatarProfile=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage(),
				'avatarid'=>$zavatarid
			);
		}
		return $zresponse;
	}
	
	public function deleteAvatarProfile($zavatarid) {
		/* deletes the avatar profile (Not User Avatar, just the starting avatar you can choose) - admin function */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>''
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."avatars
					set deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."',
						deleted=1
					where avatarid='".$zavatarid."'
					limit 1;
				");
			} else {
				$zresponse = array(
					'serror'=>'Requires Admin Permissions'
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-deleteAvatarProfile=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage()
			);
		}
		return $zresponse;
	}

	public function deleteAvatarFile($zfilename, $zobjectfolder) {
		/* deletes the 3D Object file - used to assist with overwrite functions */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=> ''
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				$zfilepath = wtw_rootpath.$zobjectfolder.$zfilename;
				if (file_exists($zfilepath)) {
					unlink($zfilepath);
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-deleteAvatarFile=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function saveNewAvatar($zavatarid, $zavatargroup, $zdisplayname, $zavatardescription, $zgender, $zobjectfolder, $zobjectfile, $zstartframe, $zendframe) {
		/* saves the avatar information (Not User Avatar, just the starting avatar you can choose) - admin function */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'avatarid'=>$zavatarid
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				$zfoundavatarid = '';
				$zresults = $wtwhandlers->query("
					select avatarid
					from ".wtw_tableprefix."avatars
					where avatarid='".$zavatarid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavatarid = $zrow["avatarid"];
				}
				if (empty($zfoundavatarid) || !isset($zfoundavatarid)) {
					if (empty($zavatarid) || !isset($zavatarid)) {
						$zavatarid = $wtwhandlers->getRandomString(16,1);
					}
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avatars
						   (avatarid,
						    versionid,
							version,
							versionorder,
							versiondesc,
						    avatargroup,
							displayname,
							avatardescription,
							gender,
							objectfolder,
							objectfile,
							startframe,
							endframe,
							sortorder,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						  values
						   ('".$zavatarid."',
						    '".$zavatarid."',
							'1.0.0',
							1000000,
							'Initial Version',
						    '".$zavatargroup."',
						    '".$zdisplayname."',
						    '".$zavatardescription."',
						    '".$zgender."',
						    '".$zobjectfolder."',
						    '".$zobjectfile."',
						    ".$zstartframe.",
						    ".$zendframe.",
						    50,
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');");
					$zresponse = array(
						'serror'=>'',
						'avatarid'=>$zavatarid
					);
				} else {
					$wtwhandlers->query("
						update ".wtw_tableprefix."avatars
						set avatargroup='".$zavatargroup."',
							displayname='".$zdisplayname."',
							avatardescription='".$zavatardescription."',
							gender='".$zgender."',
							objectfolder='".$zobjectfolder."',
							objectfile='".$zobjectfile."',
							startframe=".$zstartframe.",
							endframe=".$zendframe.",
							sortorder=50,
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where avatarid='".$zavatarid."'
						limit 1;
					");
				}
			} else {
				$zresponse = array(
					'serror'=>'Requires Admin Permissions',
					'avatarid'=>$zavatarid
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-saveNewAvatar=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage(),
				'avatarid'=>$zavatarid
			);
		}
		return $zresponse;
	}
	
	public function saveAvatarTemplate($zavatarid, $ztemplatename, $zdescription, $ztags, $zversion, $zversiondesc) {
		/* saves the avatar information (Not User Avatar, just the starting avatar you can choose) - admin function */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'avatarid'=>$zavatarid,
			'sharehash'=>''
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				$zfoundavatarid = '';
				if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
					$zuserid = $_SESSION["wtw_userid"];
				}
				if (!empty($ztemplatename) && isset($ztemplatename)) {
					$ztemplatename = base64_decode($ztemplatename);
					
				}
				if (!empty($zdescription) && isset($zdescription)) {
					$zdescription = base64_decode($zdescription);
					
				}
				if (!empty($ztags) && isset($ztags)) {
					$ztags = base64_decode($ztags);
					
				}
				if (!empty($zversiondesc) && isset($zversiondesc)) {
					$zversiondesc = base64_decode($zversiondesc);
					
				}
				$ztemplatename = htmlspecialchars($ztemplatename, ENT_QUOTES, 'UTF-8');
				$zdescription = htmlspecialchars($zdescription, ENT_QUOTES, 'UTF-8');
				$ztags = htmlspecialchars($ztags, ENT_QUOTES, 'UTF-8');
				$zversiondesc = htmlspecialchars($zversiondesc, ENT_QUOTES, 'UTF-8');
				$zsharehash = $wtwhandlers->getRandomString(16,1);
				$zresponse["sharehash"] = $zsharehash;
				$zversion1 = 1;
				$zversion2 = 0;
				$zversion3 = 0;

				if (strpos($zversion, '.') !== false) {
					try {
						list($zversion1, $zversion2, $zversion3) = explode('.', $zversion);
					} catch (Exception $e) {
						$zversion1 = 1;
						$zversion2 = 0;
						$zversion3 = 0;
					}
				}
				$zversionorder = (1000000*$zversion1) + (1000*$zversion2) + $zversion3;

				$zresults = $wtwhandlers->query("
					select avatarid
					from ".wtw_tableprefix."avatars
					where avatarid='".$zavatarid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavatarid = $zrow["avatarid"];
				}
				if (!empty($zfoundavatarid) && isset($zfoundavatarid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."avatars
						set templatename='".$ztemplatename."',
							description='".$zdescription."',
							tags='".$ztags."',
							version='".$zversion."',
							versionorder=".$zversionorder.",
							versiondesc='".$zversiondesc."',
							sharehash='".$zsharehash."',
							shareuserid='".$wtwhandlers->userid."',
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where avatarid='".$zavatarid."'
						limit 1;
					");
				}
			} else {
				$zresponse = array(
					'serror'=>'Requires Admin Permissions',
					'avatarid'=>$zavatarid,
					'sharehash'=>''
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-saveAvatarTemplate=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage(),
				'avatarid'=>$zavatarid,
				'sharehash'=>''
			);
		}
		return $zresponse;
	}
	
	public function shareAvatarTemplate($zavatarid, $zsharehash) {
		/* share thing as a template to the media library */
		global $wtwhandlers;
		$zresponse = array(
			'success'=>'',
			'serror'=>'',
			'userid'=>'',
			'sharehash'=>''
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				$zuserid = "";
				$zfoundavatarid = "";
				if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
					$zuserid = $_SESSION["wtw_userid"];
				}
				$zfromurl = "https://3dnet.walktheweb.com/connect/shareavatar.php?avatarid=".$zavatarid."&userid=".$zuserid."&sharehash=".$zsharehash."&domainurl=".$wtwhandlers->domainurl;

				if(ini_get('allow_url_fopen') ) {
					$zresponse = file_get_contents($zfromurl);
				} else if (extension_loaded('curl')) {
					$zresponse = curl_init($zfromurl);
				}
				$zresponse = json_decode($zresponse, true);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-shareAvatarTemplate=".$e->getMessage());
		}
		return $zresponse;
	}
	
	public function saveAvatarInformation($zavatarid, $zavatargroup, $zdisplayname, $zavatardescription, $zgender) {
		/* saves the avatar information (Not User Avatar, just the starting avatar you can choose) - admin function */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'avatarid'=>$zavatarid
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				$zfoundavatarid = '';
				$zresults = $wtwhandlers->query("
					select avatarid
					from ".wtw_tableprefix."avatars
					where avatarid='".$zavatarid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavatarid = $zrow["avatarid"];
				}
				if (empty($zfoundavatarid) || !isset($zfoundavatarid)) {
					if (empty($zavatarid) || !isset($zavatarid)) {
						$zavatarid = $wtwhandlers->getRandomString(16,1);
					}
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avatars
						   (avatarid,
						    versionid,
							version,
							versionorder,
							versiondesc,
						    avatargroup,
							displayname,
							avatardescription,
							gender,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						  values
						   ('".$zavatarid."',
						    '".$zavatarid."',
							'1.0.0',
							1000000,
							'Initial Version',
						    '".$zavatargroup."',
						    '".$zdisplayname."',
						    '".$zavatardescription."',
						    '".$zgender."',
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');");
					$zresponse = array(
						'serror'=>'',
						'avatarid'=>$zavatarid
					);
				} else {
					$wtwhandlers->query("
						update ".wtw_tableprefix."avatars
						set avatargroup='".$zavatargroup."',
							displayname='".$zdisplayname."',
							avatardescription='".$zavatardescription."',
							gender='".$zgender."',
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where avatarid='".$zavatarid."'
						limit 1;
					");
				}
			} else {
				$zresponse = array(
					'serror'=>'Requires Admin Permissions',
					'avatarid'=>$zavatarid
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-saveAvatarInformation=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage(),
				'avatarid'=>$zavatarid
			);
		}
		return $zresponse;
	}

	public function saveAvatarScaling($zavatarid, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz) {
		/* saves the avatar information (Not User Avatar, just the starting avatar you can choose) - admin function */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'avatarid'=>$zavatarid
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				$zfoundavatarid = '';
				$zresults = $wtwhandlers->query("
					select avatarid
					from ".wtw_tableprefix."avatars
					where avatarid='".$zavatarid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavatarid = $zrow["avatarid"];
				}
				if (!empty($zfoundavatarid) && isset($zfoundavatarid)) {
					if (!is_numeric($zpositionx)) {
						$zpositionx = 0;
					}
					if (!is_numeric($zpositiony)) {
						$zpositiony = 0;
					}
					if (!is_numeric($zpositionz)) {
						$zpositionz = 0;
					}
					if (!is_numeric($zscalingx)) {
						$zscalingx = 1;
					}
					if (!is_numeric($zscalingy)) {
						$zscalingy = 1;
					}
					if (!is_numeric($zscalingz)) {
						$zscalingz = 1;
					}
					if (!is_numeric($zrotationx)) {
						$zrotationx = 0;
					}
					if (!is_numeric($zrotationy)) {
						$zrotationy = 0;
					}
					if (!is_numeric($zrotationz)) {
						$zrotationz = 0;
					}
					$wtwhandlers->query("
						update ".wtw_tableprefix."avatars
						set positionx=".$zpositionx.",
							positiony=".$zpositiony.",
							positionz=".$zpositionz.",
							scalingx=".$zscalingx.",
							scalingy=".$zscalingy.",
							scalingz=".$zscalingz.",
							rotationx=".$zrotationx.",
							rotationy=".$zrotationy.",
							rotationz=".$zrotationz.",
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where avatarid='".$zavatarid."'
						limit 1;
					");
				} else {
					$zresponse = array(
						'serror'=>'Avatar not found',
						'avatarid'=>$zavatarid
					);
				}
			} else {
				$zresponse = array(
					'serror'=>'Requires Admin Permissions',
					'avatarid'=>$zavatarid
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-saveAvatarScaling=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage(),
				'avatarid'=>$zavatarid
			);
		}
		return $zresponse;
	}
	
	public function saveAvatarDefinitionColor($zavatarid, $zavatarpartid, $zavatarpart, $zdiffusecolor, $zspecularcolor, $zemissivecolor, $zambientcolor) {
		/* saves the avatar Color (Not User Avatar, just the starting avatar you can choose) - admin function */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'avatarpartid'=>$zavatarpartid
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				if (empty($zdiffusecolor) || !isset($zdiffusecolor)) {
					$zdiffusecolor = '#FFFFFF';
				}
				if (empty($zspecularcolor) || !isset($zspecularcolor)) {
					$zspecularcolor = '#000000';
				}
				if (empty($zemissivecolor) || !isset($zemissivecolor)) {
					$zemissivecolor = '#000000';
				}
				if (empty($zambientcolor) || !isset($zambientcolor)) {
					$zambientcolor = '#FFFFFF';
				}
				$zfoundavatarpartid = '';
				$zresults = $wtwhandlers->query("
					select avatarpartid
					from ".wtw_tableprefix."avatarcolors
					where avatarid='".$zavatarid."'
						and avatarpartid='".$zavatarpartid."'
						and avatarpart='".$zavatarpart."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavatarpartid = $zrow["avatarpartid"];
				}
				if (!empty($zfoundavatarpartid) && isset($zfoundavatarpartid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."avatarcolors
						set diffusecolor='".$zdiffusecolor."',
							specularcolor='".$zspecularcolor."',
							emissivecolor='".$zemissivecolor."',
							ambientcolor='".$zambientcolor."',
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where avatarid='".$zavatarid."'
							and avatarpartid='".$zavatarpartid."'
							and avatarpart='".$zavatarpart."'
						limit 1;
					");
				} else {
					if (empty($zavatarpartid) || !isset($zavatarpartid)) {
						$zavatarpartid = $wtwhandlers->getRandomString(16,1);
					}
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avatarcolors
						   (avatarpartid,
						    avatarid,
							avatarpart,
							diffusecolor,
							specularcolor,
							emissivecolor,
							ambientcolor,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						  values
						   ('".$zavatarpartid."',
						    '".$zavatarid."',
							'".$zavatarpart."',
							'".$zdiffusecolor."',
							'".$zspecularcolor."',
							'".$zemissivecolor."',
							'".$zambientcolor."',
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');");
					$zresponse = array(
						'serror'=>'',
						'avatarpartid'=>$zavatarpartid
					);
				}
			} else {
				$zresponse = array(
					'serror'=>'Requires Admin Permissions',
					'avatarpartid'=>$zavatarpartid
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-saveAvatarDefinitionColor=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage(),
				'avatarpartid'=>$zavatarpartid
			);
		}
		return $zresponse;
	}	

	public function saveAvatarDefinitionAnimation($zavatarid, $zavataranimationid, $zloadpriority, $zanimationevent, $zanimationfriendlyname, $zanimationicon, $zobjectfolder, $zobjectfile, $zstartframe, $zendframe, $zspeedratio) {
		/* saves the avatar animation (Not User Avatar, just the starting avatar you can choose) - admin function */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'avataranimationid'=>$zavataranimationid
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				if (empty($zloadpriority) || !isset($zloadpriority)) {
					$zloadpriority = '0';
				}
				if (!is_numeric($zloadpriority)) {
					$zloadpriority = '0';
				}
				if (empty($zstartframe) || !isset($zstartframe)) {
					$zstartframe = '1';
				}
				if (!is_numeric($zstartframe)) {
					$zstartframe = '1';
				}
				if (empty($zendframe) || !isset($zendframe)) {
					$zendframe = '1';
				}
				if (!is_numeric($zendframe)) {
					$zendframe = '1';
				}
				if (empty($zspeedratio) || !isset($zspeedratio)) {
					$zspeedratio = '1';
				}
				if (!is_numeric($zspeedratio)) {
					$zspeedratio = '1';
				}
				$zfoundavataranimationid = '';
				$zresults = $wtwhandlers->query("
					select avataranimationid
					from ".wtw_tableprefix."avataranimations
					where avatarid='".$zavatarid."'
						and avataranimationid='".$zavataranimationid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavataranimationid = $zrow["avataranimationid"];
				}
				if (!empty($zfoundavataranimationid) && isset($zfoundavataranimationid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."avataranimations
						set loadpriority=".$zloadpriority.",
							animationevent='".$zanimationevent."',
							animationfriendlyname='".$zanimationfriendlyname."',
							animationicon='".$zanimationicon."',
							objectfolder='".$zobjectfolder."',
							objectfile='".$zobjectfile."',
							startframe=".$zstartframe.",
							endframe=".$zendframe.",
							speedratio=".$zspeedratio.",
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where avatarid='".$zavatarid."'
							and avataranimationid='".$zavataranimationid."'
						limit 1;
					");
				} else {
					if (empty($zavataranimationid) || !isset($zavataranimationid)) {
						$zavataranimationid = $wtwhandlers->getRandomString(16,1);
					}
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avataranimations
						   (avataranimationid,
						    avatarid,
							loadpriority,
							animationevent,
							animationfriendlyname,
							animationicon,
							objectfolder,
							objectfile,
							startframe,
							endframe,
							animationloop,
							speedratio,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						  values
						   ('".$zavataranimationid."',
						    '".$zavatarid."',
							".$zloadpriority.",
							'".$zanimationevent."',
							'".$zanimationfriendlyname."',
							'".$zanimationicon."',
							'".$zobjectfolder."',
							'".$zobjectfile."',
							".$zstartframe.",
							".$zendframe.",
							1,
							".$zspeedratio.",
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');");
					$zresponse = array(
						'serror'=>'',
						'avataranimationid'=>$zavataranimationid
					);
				}
			} else {
				$zresponse = array(
					'serror'=>'Requires Admin Permissions',
					'avataranimationid'=>$zavataranimationid
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-saveAvatarDefinitionAnimation=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage(),
				'avataranimationid'=>$zavataranimationid
			);
		}
		return $zresponse;
	}
	
	public function deleteAvatarDefinitionAnimation($zavatarid, $zavataranimationid) {
		/* delete the avatar animation (Not User Avatar, just the starting avatar you can choose) - admin function */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>''
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				$zfoundavataranimationid = '';
				$zresults = $wtwhandlers->query("
					select avataranimationid
					from ".wtw_tableprefix."avataranimations
					where avatarid='".$zavatarid."'
						and avataranimationid='".$zavataranimationid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavataranimationid = $zrow["avataranimationid"];
				}
				if (!empty($zfoundavataranimationid) && isset($zfoundavataranimationid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."avataranimations
						set deleteddate=now(),
							deleteduserid='".$wtwhandlers->userid."',
							deleted=1
						where avatarid='".$zavatarid."'
							and avataranimationid='".$zavataranimationid."'
						limit 1;
					");
				}
			} else {
				$zresponse = array(
					'serror'=>'Requires Admin Permissions'
				);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-deleteAvatarDefinitionAnimation=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage()
			);
		}
		return $zresponse;
	}

	public function uploadAvatarFile($zuploadfile, $zobjectfolder, $zavatarid) {
		/* upload file process */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=> '',
			'objectfolder'=> $zobjectfolder,
			'objectfile'=> ''
		);
		try {
			$wtwhandlers->checkContentFolders('', '', '', '');
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				$zfilepath = wtw_rootpath.$zobjectfolder;
				if (!file_exists($zfilepath)) {
					mkdir($zfilepath, octdec(wtw_chmod), true);
					chmod($zfilepath, octdec(wtw_chmod));
				}
				if ($wtwhandlers->endsWith($zfilepath, "/") == false) {
					$zfilepath .= "/";
				}
				$zisvalid = 1;
				$zpastfilename = basename($zuploadfile["name"]);
				$zfileextension = pathinfo($zfilepath.$zpastfilename,PATHINFO_EXTENSION);
				$zfilesize = $zuploadfile["size"];
				$zfiletype = $zuploadfile["type"];
				$zfilename = $wtwhandlers->getRandomString(16,1).".".$zfileextension;
				$ztargetfile = $zfilepath.$zpastfilename;
				if ($zfilesize > 128000000) {
					$zresponse = array(
						'serror'=> "Your file is too large.",
						'objectfolder'=> '',
						'objectfile'=> ''
					);
					$zisvalid = 0;
				}
				if(strtolower($zfileextension) != "babylon" && strtolower($zfileextension) != "gltf" && strtolower($zfileextension) != "glb" && strtolower($zfileextension) != "obj") {
					$zresponse = array(
						'serror'=> "Only babylon, gltf, glb, and obj files are allowed at this time.",
						'objectfolder'=> '',
						'objectfile'=> ''
					);
					$zisvalid = 0;
				}
				if ($zisvalid == 0) {
					$zresponse = array(
						'serror'=> "There was an error uploading your files.",
						'objectfolder'=> '',
						'objectfile'=> ''
					);
				} else {
					if (move_uploaded_file($zuploadfile["tmp_name"], $ztargetfile)) {
						chmod($ztargetfile, octdec(wtw_chmod));
						$zresponse = array(
							'serror'=> '',
							'objectfolder'=> $zobjectfolder,
							'objectfile'=> $zpastfilename
						);
					} else {
						$zresponse = array(
							'serror'=> "There was an error uploading your files.",
							'objectfolder'=> '',
							'objectfile'=> ''
						);
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-uploadAvatarFile=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage(),
				'objectfolder'=> '',
				'objectfile'=> ''
			);
		}
		return $zresponse;
	}

	public function uploadAvatarFiles($zuploadfiles, $zobjectfolder, $zavatarid) {
		/* upload 3D Object supplimentary files - overwrites any existing files for easy updates - remember users may need to clear cache to see changes immediately */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=> '',
			'objectfolder'=> $zobjectfolder,
			'objectfile'=> ''
		);
		try {
			$wtwhandlers->checkContentFolders('', '', '', $zavatarid);
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
				$zfilepath = wtw_rootpath.$zobjectfolder;
				if (!file_exists($zfilepath)) {
					mkdir($zfilepath, octdec(wtw_chmod), true);
					chmod($zfilepath, octdec(wtw_chmod));
				}
				if ($wtwhandlers->endsWith($zfilepath, "/") == false) {
					$zfilepath .= "/";
				}
				for ($i = 0; $i < count($zuploadfiles["name"]);$i++) {
					$zisvalid = 1;
					$zpastfilename = basename($zuploadfiles["name"][$i]);
					$zfileextension = pathinfo($zfilepath.$zpastfilename,PATHINFO_EXTENSION);
					$zfilesize = $zuploadfiles["size"][$i];
					$zfiletype = $zuploadfiles["type"][$i];
					$ztargetfile = $zfilepath.$zpastfilename;
					if ($zfilesize > 128000000) {
						$zresponse = array(
							'serror'=> "Your file is too large.",
							'objectfolder'=> '',
							'objectfile'=> ''
						);
						$zisvalid = 0;
					}
					if(strtolower($zfileextension) != "babylon" && strtolower($zfileextension) != "manifest" && strtolower($zfileextension) != "txt" && strtolower($zfileextension) != "jpg" && strtolower($zfileextension) != "png" && strtolower($zfileextension) != "jpeg" && strtolower($zfileextension) != "gif" && strtolower($zfileextension) != "wav" && strtolower($zfileextension) != "mp3" && strtolower($zfileextension) != "mp4" && strtolower($zfileextension) != "webm" && strtolower($zfileextension) != "ogv" && strtolower($zfileextension) != "bin" && strtolower($zfileextension) != "gltf" && strtolower($zfileextension) != "bgltf" && strtolower($zfileextension) != "glb" && strtolower($zfileextension) != "blend" && strtolower($zfileextension) != "blend1" && strtolower($zfileextension) != "obj" && strtolower($zfileextension) != "fbx" && strtolower($zfileextension) != "log") {
						$zresponse = array(
							'serror'=> "Only babylon, gltf, glb, obj, blend, manifest, txt, and image files are allowed at this time.",
							'objectfolder'=> '',
							'objectfile'=> ''
						);
						$zisvalid = 0;
					}
					if ($zisvalid == 1) {
						if (move_uploaded_file($zuploadfiles["tmp_name"][$i], $ztargetfile)) {
							chmod($ztargetfile, octdec(wtw_chmod));
							$zresponse = array(
								'serror'=> $zobjectfolder,
								'objectfolder'=> $zuploadfiles["tmp_name"][$i],
								'objectfile'=> ''
							);
						} else {
							$zresponse = array(
								'serror'=> "There was an error uploading your files.",
								'objectfolder'=> '',
								'objectfile'=> ''
							);
						}
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-uploadAvatarFiles=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage(),
				'objectfolder'=> '',
				'objectfile'=> ''
			);
		}
		return $zresponse;
	}

	public function downloadWeb($zwebid, $znewwebid, $zwebtype, $zusertoken) {
		/* this process downloads 3D Web and dependent objects from https://3dnet.walktheweb.com (WalkTheWeb repository)*/
		/* this is the response after you select a 3D Avatar to download in the search */
		/* $zwebid is the item selected (3D Avatar) */
		/* $znewwebid is a proposed new value for the web id (optional) */
		/* $zwebtype is 'avatar' */ 
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror'=> '',
			'webid'=> $znewwebid,
			'webtype'=> $zwebtype
		);
		try {
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zdomainurl = "";
			$znewfolder = '';
			$zurl = '';
			
			/* allow usertoken authentication */
			if ((empty($zuserid) || !isset($zuserid)) && !empty($zusertoken) && isset($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			/* only add download if the userid exists */
			if (!empty($zuserid) && isset($zuserid)) {
				$znewwebid = $wtwhandlers->getNewKey('avatars', $zwebtype.'id', $znewwebid);
				
				/* fetch the 3D Web data structure for the repository (all of the associated records) */
				$zurl = "https://3dnet.walktheweb.com/connect/sharedownload.php?webid=".$zwebid."&webtype=".$zwebtype."&userid=".$zuserid."&serverinstanceid=".$wtwhandlers->serverinstanceid."&domainurl=".$wtwhandlers->domainurl;

				if (!empty($zurl)) {
					$zrequest = file_get_contents($zurl);
				}
				if (!empty($zrequest) && isset($zrequest)) {
					$zrequest = json_decode($zrequest);
				}
				
				/* determine the new local path for uploaded files associated with this download */
				$znewfolder = $wtwhandlers->contentpath.'/uploads/avatars/'.$znewwebid;
				$znewurl = $wtwhandlers->contenturl.'/uploads/avatars/'.$znewwebid;
				if (!file_exists($znewfolder)) {
					mkdir($znewfolder, octdec(wtw_chmod), true);
					chmod($znewfolder, octdec(wtw_chmod));
				}
				
				/* process all users associated to this download (for your reference) */
				foreach ($zrequest->users as $zuser) {
					/* check if the userid is already in use */
					$znewuserid = $wtwhandlers->getNewKey('users', 'userid', $zuser->userid);
					$znewuploadpathid = $wtwhandlers->getNewKey('users', "uploadpathid", $zuser->uploadpathid);
					$zuserpassword = $wtwhandlers->getRandomString(16,1);
					$zresults = $wtwhandlers->query("
						select userid
						from ".wtw_tableprefix."users 
						where userid='".$znewuserid."'
						limit 1;
						");
					if (count($zresults) == 0) {
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."users 
							   (userid,
								pastuserid,
								displayname,
								email,
								uploadpathid,
								userpassword,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewuserid."',
								'".$zuser->userid."',
								'".addslashes($zuser->displayname)."',
								'".$zuser->email."',
								'".$znewuploadpathid."',
								'".$zuserpassword."',
								now(),
								'".$znewuserid."',
								now(),
								'".$znewuserid."');");
					}
				}
				
				/* write main avatar record */
				$zobjectfolder = "/content/uploads/avatars/".$znewwebid."/";

				$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->createuserid);
				$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->updateuserid);
				
				$wtwhandlers->query("
					insert into ".wtw_tableprefix."avatars 
					   (avatarid,
						pastavatarid,
						versionid,
						version,
						versionorder,
						versiondesc,
						avatargroup,
						displayname,
						avatardescription,
						objectfolder,
						objectfile,
						gender,
						positionx,
						positiony,
						positionz,
						scalingx,
						scalingy,
						scalingz,
						rotationx,
						rotationy,
						rotationz,
						startframe,
						endframe,
						sortorder,
						templatename,
						description,
						tags,
						snapshotid,
						shareuserid,
						sharetemplatedate,
						alttag,
						createdate,
						createuserid,
						updatedate,
						updateuserid)
					values
					   ('".$znewwebid."',
						'".$zrequest->avatarid."',
						'".$zrequest->versionid."',
						'".$zrequest->version."',
						".$wtwhandlers->checkNumber($zrequest->versionorder,1000000).",
						'".addslashes($zrequest->versiondesc)."',
						'".addslashes($zrequest->avatargroup)."',
						'".addslashes($zrequest->displayname)."',
						'".addslashes($zrequest->avatardescription)."',
						'".$zobjectfolder."',
						'".$zrequest->objectfile."',
						'".addslashes($zrequest->gender)."',
						".$wtwhandlers->checkNumber($zrequest->positionx,0).",
						".$wtwhandlers->checkNumber($zrequest->positiony,0).",
						".$wtwhandlers->checkNumber($zrequest->positionz,0).",
						".$wtwhandlers->checkNumber($zrequest->scalingx,1).",
						".$wtwhandlers->checkNumber($zrequest->scalingy,1).",
						".$wtwhandlers->checkNumber($zrequest->scalingz,1).",
						".$wtwhandlers->checkNumber($zrequest->rotationx,0).",
						".$wtwhandlers->checkNumber($zrequest->rotationy,0).",
						".$wtwhandlers->checkNumber($zrequest->rotationz,0).",
						".$wtwhandlers->checkNumber($zrequest->startframe,1).",
						".$wtwhandlers->checkNumber($zrequest->endframe,1).",
						25,
						'".addslashes($zrequest->templatename)."',
						'".addslashes($zrequest->description)."',
						'".addslashes($zrequest->tags)."',
						'".$zrequest->snapshotid."',
						'".$zrequest->shareuserid."',
						now(),
						'".addslashes($zrequest->alttag)."',
						'".$zrequest->createdate."',
						'".$znewcreateuserid."',
						'".$zrequest->updatedate."',
						'".$znewupdateuserid."');");
				
				/* process all files */
				foreach ($zrequest->files as $zfile) {
					if (strpos($zfile->file,'/') !== false) {
						list($zfolder, $zfilename) = explode('/', $zfile->file);
						if (!file_exists(wtw_rootpath.$zobjectfolder.$zfolder)) {
							mkdir(wtw_rootpath.$zobjectfolder.$zfolder, octdec(wtw_chmod), true);
							chmod(wtw_rootpath.$zobjectfolder.$zfolder, octdec(wtw_chmod));
						}
						$wtwhandlers->getFilefromURL('https://3dnet.walktheweb.com/content/uploads/avatars/'.$zwebid.'/'.$zfolder.'/'.$zfilename, wtw_rootpath.$zobjectfolder.$zfolder.'/', $zfilename);
					} else {
						$wtwhandlers->getFilefromURL('https://3dnet.walktheweb.com/content/uploads/avatars/'.$zwebid.'/'.$zfile->file, wtw_rootpath.$zobjectfolder, $zfile->file);
					}
				}
				
				/* check if avatar group exists */
				$zresults = $wtwhandlers->query("
					select *  
					from ".wtw_tableprefix."avatargroups 
					where avatargroup='".$zrequest->avatargroup."';");
				if (count($zresults) == 0) {
					$zavatargroupid = $wtwhandlers->getNewKey('avatargroups', 'avatargroupid', $wtwhandlers->getRandomString(16,1));

					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avatargroups
						   (avatargroupid,
							avatargroup,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						  values
						   ('".$zavatargroupid."',
							'".addslashes($zrequest->avatargroup)."',
							now(),
							'".$znewcreateuserid."',
							now(),
							'".$znewupdateuserid."');");
				}


				/* process all avatar avatarparts */
				foreach ($zrequest->avatarparts as $zpart) {
				
					/* check if the avatarpartid is already in use */
					$zavatarpartid = $wtwhandlers->getNewKey('avatarcolors', 'avatarpartid', $zpart->avatarpartid);

					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zpart->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zpart->updateuserid);

					$zresults = $wtwhandlers->query("
						insert into ".wtw_tableprefix."avatarcolors 
						   (avatarpartid,
							pastavatarpartid,
							avatarid,
							avatarpart,
							diffusecolor,
							specularcolor,
							emissivecolor,
							ambientcolor,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$zavatarpartid."',
							'".$zpart->avatarpartid."',
							'".$znewwebid."',
							'".addslashes($zpart->avatarpart)."',
							'".$zpart->diffusecolor."',
							'".$zpart->specularcolor."',
							'".$zpart->emissivecolor."',
							'".$zpart->ambientcolor."',
							'".$zpart->createdate."',
							'".$znewcreateuserid."',
							'".$zpart->updatedate."',
							'".$znewupdateuserid."');");		
				}

				/* process all avatar animations */
				foreach ($zrequest->avataranimationdefs as $zanimation) {
				
					/* check if the avataranimationid is already in use */
					$zavataranimationid = $wtwhandlers->getNewKey('avataranimations', 'avataranimationid', $zanimation->avataranimationid);
					
					$znewuserid = $wtwhandlers->getUserIDfromPastID($zanimation->userid);
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zanimation->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zanimation->updateuserid);

					$zresults = $wtwhandlers->query("
						insert into ".wtw_tableprefix."avataranimations 
						   (avataranimationid,
							pastavataranimationid,
							avatarid,
							userid,
							loadpriority,
							animationevent,
							animationfriendlyname,
							animationicon,
							objectfolder,
							objectfile,
							startframe,
							endframe,
							animationloop,
							speedratio,
							soundid,
							soundmaxdistance,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$zavataranimationid."',
							'".$zanimation->avataranimationid."',
							'".$znewwebid."',
							'".$znewuserid."',
							".$wtwhandlers->checkNumber($zanimation->loadpriority,25).",
							'".$zanimation->animationevent."',
							'".addslashes($zanimation->animationfriendlyname)."',
							'".$zanimation->animationicon."',
							'".$zobjectfolder."animations/"."',
							'".$zanimation->objectfile."',
							".$wtwhandlers->checkNumber($zanimation->startframe,1).",
							".$wtwhandlers->checkNumber($zanimation->endframe,1).",
							".$wtwhandlers->checkNumber($zanimation->animationloop,1).",
							".$wtwhandlers->checkNumber($zanimation->speedratio,1).",
							'".$zanimation->soundid."',
							".$wtwhandlers->checkNumber($zanimation->soundmaxdistance,100).",
							'".$zanimation->createdate."',
							'".$znewcreateuserid."',
							'".$zanimation->updatedate."',
							'".$znewupdateuserid."');");		
				}


				/* process all content ratings */
				if (isset($zrequest->contentratings)) {
					foreach ($zrequest->contentratings as $zcontentrating) {
					
						/* check if the contentratingid is already in use */
						$zcontentratingid = $wtwhandlers->getNewKey('contentratings', 'contentratingid', $zcontentrating->contentratingid);
						
						$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zcontentrating->createuserid);
						$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zcontentrating->updateuserid);

						$zresults = $wtwhandlers->query("
							insert into ".wtw_tableprefix."contentratings 
							   (contentratingid,
								pastcontentratingid,
								webid,
								webtype,
								rating,
								ratingvalue,
								contentwarning,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$zcontentratingid."',
								'".$zcontentrating->contentratingid."',
								'".$zcontentrating->webid."',
								'".$zcontentrating->webtype."',
								'".$zcontentrating->rating."',
								".$zcontentrating->ratingvalue.",
								'".addslashes($zcontentrating->contentwarning)."',
								'".$zcontentrating->createdate."',
								'".$znewcreateuserid."',
								'".$zcontentrating->updatedate."',
								'".$znewupdateuserid."');");		
					}
				}

				$zresponse = array(
					'serror'=> '',
					'webid'=> $znewwebid,
					'webtype'=> $zwebtype
				);
			}			
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-downloadWeb=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage(),
				'webid'=> $znewwebid,
				'webtype'=> $zwebtype
			);
		}
		return $zresponse;
	}

	public function downloadUpdateWeb($zwebid, $zupdatewebid, $zwebtype, $zusertoken) {
		/* this process downloads 3D Web and dependent objects from https://3dnet.walktheweb.com (WalkTheWeb repository)*/
		/* this is the response after you select a 3D Avatar to download in the search */
		/* $zwebid is the item selected (3D Avatar) */
		/* $zupdatewebid is the downloaded web id (new version) */
		/* $zwebtype is 'avatar' */ 
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror'=> '',
			'webid'=> $zwebid,
			'webtype'=> $zwebtype
		);
		try {

			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zdomainurl = "";
			$znewfolder = '';
			$zurl = '';
			
			/* allow usertoken authentication */
			if ((empty($zuserid) || !isset($zuserid)) && !empty($zusertoken) && isset($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			/* only add download if the userid exists */
			if (!empty($zuserid) && isset($zuserid)) {
				//$zupdatewebid = $wtwhandlers->getNewKey('avatars', $zwebtype.'id', $zupdatewebid);
				
				/* fetch the 3D Web data structure for the repository (all of the associated records) */
				$zurl = "https://3dnet.walktheweb.com/connect/sharedownload.php?webid=".$zupdatewebid."&webtype=".$zwebtype."&userid=".$zuserid."&serverinstanceid=".$wtwhandlers->serverinstanceid."&domainurl=".$wtwhandlers->domainurl;

				if (!empty($zurl)) {
					$zrequest = file_get_contents($zurl);
				}
				if (!empty($zrequest) && isset($zrequest)) {
					$zrequest = json_decode($zrequest);
				}
				
				/* determine the new local path for uploaded files associated with this download */
				$znewfolder = $wtwhandlers->contentpath.'/uploads/avatars/'.$zwebid;
				$znewurl = $wtwhandlers->contenturl.'/uploads/avatars/'.$zwebid;
				if (!file_exists($znewfolder)) {
					mkdir($znewfolder, octdec(wtw_chmod), true);
					chmod($znewfolder, octdec(wtw_chmod));
				}
				
				/* process all users associated to this download (for your reference) */
				foreach ($zrequest->users as $zuser) {
					/* check if the userid is already in use */
					$znewuserid = $wtwhandlers->getNewKey('users', 'userid', $zuser->userid);
					$znewuploadpathid = $wtwhandlers->getNewKey('users', "uploadpathid", $zuser->uploadpathid);
					$zuserpassword = $wtwhandlers->getRandomString(16,1);
					$zresults = $wtwhandlers->query("
						select userid
						from ".wtw_tableprefix."users 
						where userid='".$znewuserid."'
						limit 1;
						");
					if (count($zresults) == 0) {
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."users 
							   (userid,
								pastuserid,
								displayname,
								email,
								uploadpathid,
								userpassword,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewuserid."',
								'".$zuser->userid."',
								'".addslashes($zuser->displayname)."',
								'".$zuser->email."',
								'".$znewuploadpathid."',
								'".$zuserpassword."',
								now(),
								'".$znewuserid."',
								now(),
								'".$znewuserid."');");
					}
				}
				
				/* write main avatar record */
				$zobjectfolder = "/content/uploads/avatars/".$zwebid."/";

				$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->createuserid);
				$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->updateuserid);
				
				$zfoundavatarid = '';
				$zresults = $wtwhandlers->query("
					select avatarid
					from ".wtw_tableprefix."avatars 
					where avatarid='".$zwebid."'
					limit 1;
					");
				foreach ($zresults as $zrow) {
					$zfoundavatarid = $zrow["avatarid"];
				}
				
				if (isset($zfoundavatarid) && !empty($zfoundavatarid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."avatars 
						set version='".$zrequest->version."',
							versionorder=".$wtwhandlers->checkNumber($zrequest->versionorder,1000000).",
							versiondesc='".addslashes($zrequest->versiondesc)."',
							avatargroup='".addslashes($zrequest->avatargroup)."',
							displayname='".addslashes($zrequest->displayname)."',
							avatardescription='".addslashes($zrequest->avatardescription)."',
							objectfolder='".$zobjectfolder."',
							objectfile='".$zrequest->objectfile."',
							gender='".addslashes($zrequest->gender)."',
							positionx=".$wtwhandlers->checkNumber($zrequest->positionx,0).",
							positiony=".$wtwhandlers->checkNumber($zrequest->positiony,0).",
							positionz=".$wtwhandlers->checkNumber($zrequest->positionz,0).",
							scalingx=".$wtwhandlers->checkNumber($zrequest->scalingx,1).",
							scalingy=".$wtwhandlers->checkNumber($zrequest->scalingy,1).",
							scalingz=".$wtwhandlers->checkNumber($zrequest->scalingz,1).",
							rotationx=".$wtwhandlers->checkNumber($zrequest->rotationx,0).",
							rotationy=".$wtwhandlers->checkNumber($zrequest->rotationy,0).",
							rotationz=".$wtwhandlers->checkNumber($zrequest->rotationz,0).",
							startframe=".$wtwhandlers->checkNumber($zrequest->startframe,1).",
							endframe=".$wtwhandlers->checkNumber($zrequest->endframe,1).",
							sortorder=25,
							templatename='".addslashes($zrequest->templatename)."',
							description='".addslashes($zrequest->description)."',
							tags='".addslashes($zrequest->tags)."',
							snapshotid='".$zrequest->snapshotid."',
							alttag='".addslashes($zrequest->alttag)."',
							updatedate='".$zrequest->updatedate."',
							updateuserid='".$znewupdateuserid."'
						where avatarid='".$zwebid."'
						limit 1;");
				} else {
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avatars 
						   (avatarid,
							pastavatarid,
							versionid,
							version,
							versionorder,
							versiondesc,
							avatargroup,
							displayname,
							avatardescription,
							objectfolder,
							objectfile,
							gender,
							positionx,
							positiony,
							positionz,
							scalingx,
							scalingy,
							scalingz,
							rotationx,
							rotationy,
							rotationz,
							startframe,
							endframe,
							sortorder,
							templatename,
							description,
							tags,
							snapshotid,
							shareuserid,
							sharetemplatedate,
							alttag,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$zwebid."',
							'".$zrequest->avatarid."',
							'".$zrequest->versionid."',
							'".$zrequest->version."',
							".$wtwhandlers->checkNumber($zrequest->versionorder,1000000).",
							'".addslashes($zrequest->versiondesc)."',
							'".addslashes($zrequest->avatargroup)."',
							'".addslashes($zrequest->displayname)."',
							'".addslashes($zrequest->avatardescription)."',
							'".$zobjectfolder."',
							'".$zrequest->objectfile."',
							'".addslashes($zrequest->gender)."',
							".$wtwhandlers->checkNumber($zrequest->positionx,0).",
							".$wtwhandlers->checkNumber($zrequest->positiony,0).",
							".$wtwhandlers->checkNumber($zrequest->positionz,0).",
							".$wtwhandlers->checkNumber($zrequest->scalingx,1).",
							".$wtwhandlers->checkNumber($zrequest->scalingy,1).",
							".$wtwhandlers->checkNumber($zrequest->scalingz,1).",
							".$wtwhandlers->checkNumber($zrequest->rotationx,0).",
							".$wtwhandlers->checkNumber($zrequest->rotationy,0).",
							".$wtwhandlers->checkNumber($zrequest->rotationz,0).",
							".$wtwhandlers->checkNumber($zrequest->startframe,1).",
							".$wtwhandlers->checkNumber($zrequest->endframe,1).",
							25,
							'".addslashes($zrequest->templatename)."',
							'".addslashes($zrequest->description)."',
							'".addslashes($zrequest->tags)."',
							'".$zrequest->snapshotid."',
							'".$zrequest->shareuserid."',
							now(),
							'".addslashes($zrequest->alttag)."',
							'".$zrequest->createdate."',
							'".$znewcreateuserid."',
							'".$zrequest->updatedate."',
							'".$znewupdateuserid."');");
				}

				
				/* process all files */
				foreach ($zrequest->files as $zfile) {
					if (strpos($zfile->file,'/') !== false) {
						list($zfolder, $zfilename) = explode('/', $zfile->file);
						if (!file_exists(wtw_rootpath.$zobjectfolder.$zfolder)) {
							mkdir(wtw_rootpath.$zobjectfolder.$zfolder, octdec(wtw_chmod), true);
							chmod(wtw_rootpath.$zobjectfolder.$zfolder, octdec(wtw_chmod));
						}
						$wtwhandlers->getFilefromURL('https://3dnet.walktheweb.com/content/uploads/avatars/'.$zupdatewebid.'/'.$zfolder.'/'.$zfilename, wtw_rootpath.$zobjectfolder.$zfolder.'/', $zfilename);
					} else {
						$wtwhandlers->getFilefromURL('https://3dnet.walktheweb.com/content/uploads/avatars/'.$zupdatewebid.'/'.$zfile->file, wtw_rootpath.$zobjectfolder, $zfile->file);
					}
				}
				
				/* check if avatar group exists */
				$zresults = $wtwhandlers->query("
					select *  
					from ".wtw_tableprefix."avatargroups 
					where avatargroup='".$zrequest->avatargroup."';");
				if (count($zresults) == 0) {
					$zavatargroupid = $wtwhandlers->getNewKey('avatargroups', 'avatargroupid', $wtwhandlers->getRandomString(16,1));

					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avatargroups
						   (avatargroupid,
							avatargroup,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						  values
						   ('".$zavatargroupid."',
							'".addslashes($zrequest->avatargroup)."',
							now(),
							'".$znewcreateuserid."',
							now(),
							'".$znewupdateuserid."');");
				}


				/* process all avatar avatarparts */
				foreach ($zrequest->avatarparts as $zpart) {
				
					/* check if the avatarpartid is already in use */
					$zavatarpartid = $zpart->avatarpartid;
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zpart->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zpart->updateuserid);
					
					$zfoundavatarpartid = '';
					$zresults = $wtwhandlers->query("
						select avatarpartid
						from ".wtw_tableprefix."avatarcolors 
						where avatarid='".$zwebid."'
							and avatarpart='".addslashes($zpart->avatarpart)."'
						limit 1;
						");
					foreach ($zresults as $zrow) {
						$zfoundavatarpartid = $zrow["avatarpartid"];
					}

					if (isset($zfoundavatarpartid) && !empty($zfoundavatarpartid)) {
						/* update the colors if found */
						$wtwhandlers->query("
							update ".wtw_tableprefix."avatarcolors 
							set diffusecolor='".$zpart->diffusecolor."',
								specularcolor='".$zpart->specularcolor."',
								emissivecolor='".$zpart->emissivecolor."',
								ambientcolor='".$zpart->ambientcolor."',
								updatedate='".$zpart->updatedate."',
								updateuserid='".$znewupdateuserid."'
							where avatarpartid='".$zfoundavatarpartid."'
							limit 1;");
					} else {
						/* add any missing parts and set default color */
						$zavatarpartid = $wtwhandlers->getNewKey('avatarcolors', 'avatarpartid', $zpart->avatarpartid);
						$zresults = $wtwhandlers->query("
							insert into ".wtw_tableprefix."avatarcolors 
							   (avatarpartid,
								pastavatarpartid,
								avatarid,
								avatarpart,
								diffusecolor,
								specularcolor,
								emissivecolor,
								ambientcolor,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$zavatarpartid."',
								'".$zpart->avatarpartid."',
								'".$zwebid."',
								'".addslashes($zpart->avatarpart)."',
								'".$zpart->diffusecolor."',
								'".$zpart->specularcolor."',
								'".$zpart->emissivecolor."',
								'".$zpart->ambientcolor."',
								'".$zpart->createdate."',
								'".$znewcreateuserid."',
								'".$zpart->updatedate."',
								'".$znewupdateuserid."');");		
					}
				}

				/* process all avatar animations */
				foreach ($zrequest->avataranimationdefs as $zanimation) {
				
					/* check if the avataranimationid is already in use */
					$zavataranimationid = $wtwhandlers->getNewKey('avataranimations', 'avataranimationid', $zanimation->avataranimationid);
					
					$znewuserid = $wtwhandlers->getUserIDfromPastID($zanimation->userid);
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zanimation->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zanimation->updateuserid);

					$zfoundavataranimationid = '';
					$zresults = $wtwhandlers->query("
						select avataranimationid
						from ".wtw_tableprefix."avataranimations 
						where avatarid='".$zwebid."'
							and animationevent='".$zanimation->animationevent."'
							and animationfriendlyname='".addslashes($zanimation->animationfriendlyname)."'
							and objectfile='".$zanimation->objectfile."'
						limit 1;
						");
					foreach ($zresults as $zrow) {
						$zfoundavataranimationid = $zrow["avataranimationid"];
					}

					if (isset($zfoundavataranimationid) && !empty($zfoundavataranimationid)) {
						$wtwhandlers->query("
							update ".wtw_tableprefix."avataranimations 
							set userid='".$znewuserid."',
								loadpriority=".$wtwhandlers->checkNumber($zanimation->loadpriority,25).",
								animationicon='".$zanimation->animationicon."',
								objectfolder='".$zobjectfolder."animations/"."',
								objectfile='".$zanimation->objectfile."',
								startframe=".$wtwhandlers->checkNumber($zanimation->startframe,1).",
								endframe=".$wtwhandlers->checkNumber($zanimation->endframe,1).",
								animationloop=".$wtwhandlers->checkNumber($zanimation->animationloop,1).",
								speedratio=".$wtwhandlers->checkNumber($zanimation->speedratio,1).",
								soundid='".$zanimation->soundid."',
								soundmaxdistance=".$wtwhandlers->checkNumber($zanimation->soundmaxdistance,100).",
								updatedate='".$zanimation->updatedate."',
								updateuserid='".$znewupdateuserid."'
							where avataranimationid='".$zfoundavataranimationid."'
							limit 1;");
					} else {
						$zresults = $wtwhandlers->query("
							insert into ".wtw_tableprefix."avataranimations 
							   (avataranimationid,
								pastavataranimationid,
								avatarid,
								userid,
								loadpriority,
								animationevent,
								animationfriendlyname,
								animationicon,
								objectfolder,
								objectfile,
								startframe,
								endframe,
								animationloop,
								speedratio,
								soundid,
								soundmaxdistance,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$zavataranimationid."',
								'".$zanimation->avataranimationid."',
								'".$zwebid."',
								'".$znewuserid."',
								".$wtwhandlers->checkNumber($zanimation->loadpriority,25).",
								'".$zanimation->animationevent."',
								'".addslashes($zanimation->animationfriendlyname)."',
								'".$zanimation->animationicon."',
								'".$zobjectfolder."animations/"."',
								'".$zanimation->objectfile."',
								".$wtwhandlers->checkNumber($zanimation->startframe,1).",
								".$wtwhandlers->checkNumber($zanimation->endframe,1).",
								".$wtwhandlers->checkNumber($zanimation->animationloop,1).",
								".$wtwhandlers->checkNumber($zanimation->speedratio,1).",
								'".$zanimation->soundid."',
								".$wtwhandlers->checkNumber($zanimation->soundmaxdistance,100).",
								'".$zanimation->createdate."',
								'".$znewcreateuserid."',
								'".$zanimation->updatedate."',
								'".$znewupdateuserid."');");		
					}
				}


				/* process all content ratings */
				if (isset($zrequest->contentratings)) {
					foreach ($zrequest->contentratings as $zcontentrating) {
					
						/* check if the contentratingid is already in use */
						
						$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zcontentrating->createuserid);
						$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zcontentrating->updateuserid);

						$zfoundcontentratingid = '';
						$zresults = $wtwhandlers->query("
							select contentratingid
							from ".wtw_tableprefix."contentratings 
							where webid='".$zwebid."'
								and webtype='".$zcontentrating->webtype."'
							limit 1;
							");
						foreach ($zresults as $zrow) {
							$zfoundcontentratingid = $zrow["contentratingid"];
						}
						
						if (isset($zfoundcontentratingid) && !empty($zfoundcontentratingid)) {
							$wtwhandlers->query("
								update ".wtw_tableprefix."contentratings 
								set rating='".$zcontentrating->rating."',
									ratingvalue=".$wtwhandlers->checkNumber($zcontentrating->ratingvalue,0).",
									contentwarning='".addslashes($zcontentrating->contentwarning)."',
									updatedate='".$zcontentrating->updatedate."',
									updateuserid='".$znewupdateuserid."'
								where contentratingid='".$zfoundcontentratingid."'
								limit 1;");		
						} else {
							$zcontentratingid = $wtwhandlers->getNewKey('contentratings', 'contentratingid', $zcontentrating->contentratingid);
							$zresults = $wtwhandlers->query("
								insert into ".wtw_tableprefix."contentratings 
								   (contentratingid,
									pastcontentratingid,
									webid,
									webtype,
									rating,
									ratingvalue,
									contentwarning,
									createdate,
									createuserid,
									updatedate,
									updateuserid)
								values
								   ('".$zcontentratingid."',
									'".$zcontentrating->contentratingid."',
									'".$zwebid."',
									'".$zcontentrating->webtype."',
									'".$zcontentrating->rating."',
									".$wtwhandlers->checkNumber($zcontentrating->ratingvalue,0).",
									'".addslashes($zcontentrating->contentwarning)."',
									'".$zcontentrating->createdate."',
									'".$znewcreateuserid."',
									'".$zcontentrating->updatedate."',
									'".$znewupdateuserid."');");		
						}
					}
				}

				$zresponse = array(
					'serror'=> '',
					'webid'=> $zwebid,
					'webtype'=> $zwebtype
				);
			}			
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-downloadUpdateWeb=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage(),
				'webid'=> $zwebid,
				'webtype'=> $zwebtype
			);
		}
		return $zresponse;
	}
	
	public function downloadUpdateUserAvatar($zuseravatarid, $zinstanceid, $zwebid, $zupdatewebid, $zwebtype, $zusertoken) {
		/* this process downloads 3D Web and dependent objects from https://3dnet.walktheweb.com (WalkTheWeb repository)*/
		/* this is the response after you select a 3D Avatar to download in the search */
		/* $zwebid is the item selected (3D Avatar) */
		/* $zupdatewebid is the downloaded web id (new version) */
		/* $zwebtype is 'avatar' */ 
		global $wtwhandlers;
		global $wtwconnect;
		$zresponse = array(
			'serror'=> '',
			'useravatarid'=> $zuseravatarid,
			'webid'=> $zwebid,
			'webtype'=> $zwebtype
		);
		try {

			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}
			$zuserid = $wtwhandlers->userid;
			$zdomainurl = "";
			$znewfolder = '';
			$zurl = '';
			
			/* allow usertoken authentication */
			if ((empty($zuserid) || !isset($zuserid)) && !empty($zusertoken) && isset($zusertoken)) {
				$zresults = $wtwhandlers->query("
					select userid
					from ".wtw_tableprefix."users 
					where CONVERT(from_base64(usertoken) USING utf8)='".$zusertoken."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zuserid = $zrow["userid"];
				}
			}
			/* only add download if the userid exists */
			if (!empty($zuserid) && isset($zuserid)) {
				//$zupdatewebid = $wtwhandlers->getNewKey('avatars', $zwebtype.'id', $zupdatewebid);
				
				/* fetch the 3D Web data structure for the repository (all of the associated records) */
				$zurl = "https://3dnet.walktheweb.com/connect/sharedownload.php?webid=".$zupdatewebid."&webtype=".$zwebtype."&userid=".$zuserid."&serverinstanceid=".$wtwhandlers->serverinstanceid."&domainurl=".$wtwhandlers->domainurl;

				if (!empty($zurl)) {
					$zrequest = file_get_contents($zurl);
				}
				if (!empty($zrequest) && isset($zrequest)) {
					$zrequest = json_decode($zrequest);
				}
				
				/* determine the new local path for uploaded files associated with this download */
				$znewfolder = $wtwhandlers->contentpath.'/uploads/useravatars/'.$zuseravatarid;
				$znewurl = $wtwhandlers->contenturl.'/uploads/useravatars/'.$zuseravatarid;
				if (!file_exists($znewfolder)) {
					mkdir($znewfolder, octdec(wtw_chmod), true);
					chmod($znewfolder, octdec(wtw_chmod));
				}
				
				/* process all users associated to this download (for your reference) */
				foreach ($zrequest->users as $zuser) {
					/* check if the userid is already in use */
					$znewuserid = $wtwhandlers->getNewKey('users', 'userid', $zuser->userid);
					$znewuploadpathid = $wtwhandlers->getNewKey('users', "uploadpathid", $zuser->uploadpathid);
					$zuserpassword = $wtwhandlers->getRandomString(16,1);
					$zresults = $wtwhandlers->query("
						select userid
						from ".wtw_tableprefix."users 
						where userid='".$znewuserid."'
						limit 1;
						");
					if (count($zresults) == 0) {
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."users 
							   (userid,
								pastuserid,
								displayname,
								email,
								uploadpathid,
								userpassword,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewuserid."',
								'".$zuser->userid."',
								'".addslashes($zuser->displayname)."',
								'".$zuser->email."',
								'".$znewuploadpathid."',
								'".$zuserpassword."',
								now(),
								'".$znewuserid."',
								now(),
								'".$znewuserid."');");
					}
				}
				
				/* write main avatar record */
				$zobjectfolder = "/content/uploads/useravatars/".$zuseravatarid."/";

				$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->createuserid);
				$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->updateuserid);
				
				$zfounduseravatarid = '';
				$zresults = $wtwhandlers->query("
					select useravatarid
					from ".wtw_tableprefix."useravatars 
					where useravatarid='".$zuseravatarid."'
					limit 1;
					");
				foreach ($zresults as $zrow) {
					$zfounduseravatarid = $zrow["useravatarid"];
				}
				
				if (isset($zfounduseravatarid) && !empty($zfounduseravatarid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."useravatars 
						set version='".$zrequest->version."',
							versionorder=".$wtwhandlers->checkNumber($zrequest->versionorder,1000000).",
							versiondesc='".addslashes($zrequest->versiondesc)."',
							avatargroup='".addslashes($zrequest->avatargroup)."',
							avatardescription='".addslashes($zrequest->avatardescription)."',
							objectfolder='".$zobjectfolder."',
							objectfile='".$zrequest->objectfile."',
							gender='".addslashes($zrequest->gender)."',
							positionx=".$wtwhandlers->checkNumber($zrequest->positionx,0).",
							positiony=".$wtwhandlers->checkNumber($zrequest->positiony,0).",
							positionz=".$wtwhandlers->checkNumber($zrequest->positionz,0).",
							scalingx=".$wtwhandlers->checkNumber($zrequest->scalingx,1).",
							scalingy=".$wtwhandlers->checkNumber($zrequest->scalingy,1).",
							scalingz=".$wtwhandlers->checkNumber($zrequest->scalingz,1).",
							rotationx=".$wtwhandlers->checkNumber($zrequest->rotationx,0).",
							rotationy=".$wtwhandlers->checkNumber($zrequest->rotationy,0).",
							rotationz=".$wtwhandlers->checkNumber($zrequest->rotationz,0).",
							startframe=".$wtwhandlers->checkNumber($zrequest->startframe,1).",
							endframe=".$wtwhandlers->checkNumber($zrequest->endframe,1).",
							updatedate='".$zrequest->updatedate."',
							updateuserid='".$znewupdateuserid."'
						where useravatarid='".$zuseravatarid."'
						limit 1;");
				}
				
				/* process all files */
				foreach ($zrequest->files as $zfile) {
					if (strpos($zfile->file,'/') !== false) {
						list($zfolder, $zfilename) = explode('/', $zfile->file);
						if (!file_exists(wtw_rootpath.$zobjectfolder.$zfolder)) {
							mkdir(wtw_rootpath.$zobjectfolder.$zfolder, octdec(wtw_chmod), true);
							chmod(wtw_rootpath.$zobjectfolder.$zfolder, octdec(wtw_chmod));
						}
						$wtwhandlers->getFilefromURL('https://3dnet.walktheweb.com/content/uploads/avatars/'.$zupdatewebid.'/'.$zfolder.'/'.$zfilename, wtw_rootpath.$zobjectfolder.$zfolder.'/', $zfilename);
					} else {
						$wtwhandlers->getFilefromURL('https://3dnet.walktheweb.com/content/uploads/avatars/'.$zupdatewebid.'/'.$zfile->file, wtw_rootpath.$zobjectfolder, $zfile->file);
					}
				}
				
				/* check if avatar group exists */
				$zresults = $wtwhandlers->query("
					select *  
					from ".wtw_tableprefix."avatargroups 
					where avatargroup='".$zrequest->avatargroup."';");
				if (count($zresults) == 0) {
					$zavatargroupid = $wtwhandlers->getNewKey('avatargroups', 'avatargroupid', $wtwhandlers->getRandomString(16,1));

					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avatargroups
						   (avatargroupid,
							avatargroup,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						  values
						   ('".$zavatargroupid."',
							'".addslashes($zrequest->avatargroup)."',
							now(),
							'".$znewcreateuserid."',
							now(),
							'".$znewupdateuserid."');");
				}


				/* process all avatar avatarparts */
				foreach ($zrequest->avatarparts as $zpart) {
				
					/* check if the avatarpartid is already in use */
					$zavatarpartid = $zpart->avatarpartid;
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zpart->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zpart->updateuserid);
					
					$zfoundavatarpartid = '';
					$zresults = $wtwhandlers->query("
						select avatarpartid
						from ".wtw_tableprefix."useravatarcolors 
						where useravatarid='".$zuseravatarid."'
							and avatarpart='".addslashes($zpart->avatarpart)."'
						limit 1;
						");
					foreach ($zresults as $zrow) {
						$zfoundavatarpartid = $zrow["avatarpartid"];
					}

					if (isset($zfoundavatarpartid) && !empty($zfoundavatarpartid)) {
						/* update the colors if found */
						$wtwhandlers->query("
							update ".wtw_tableprefix."useravatarcolors 
							set diffusecolor='".$zpart->diffusecolor."',
								specularcolor='".$zpart->specularcolor."',
								emissivecolor='".$zpart->emissivecolor."',
								ambientcolor='".$zpart->ambientcolor."',
								updatedate='".$zpart->updatedate."',
								updateuserid='".$znewupdateuserid."'
							where avatarpartid='".$zfoundavatarpartid."'
							limit 1;");
					} else {
						/* add any missing parts and set default color */
						$zavatarpartid = $wtwhandlers->getNewKey('useravatarcolors', 'avatarpartid', $zpart->avatarpartid);
						$zresults = $wtwhandlers->query("
							insert into ".wtw_tableprefix."useravatarcolors 
							   (avatarpartid,
								pastavatarpartid,
								userid,
								useravatarid,
								instanceid,
								avatarpart,
								diffusecolor,
								specularcolor,
								emissivecolor,
								ambientcolor,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$zavatarpartid."',
								'".$zpart->avatarpartid."',
								'".$zuserid."',
								'".$zuseravatarid."',
								'".$zinstanceid."',
								'".addslashes($zpart->avatarpart)."',
								'".$zpart->diffusecolor."',
								'".$zpart->specularcolor."',
								'".$zpart->emissivecolor."',
								'".$zpart->ambientcolor."',
								'".$zpart->createdate."',
								'".$znewcreateuserid."',
								'".$zpart->updatedate."',
								'".$znewupdateuserid."');");		
					}
				}

				/* process all avatar animations */
				foreach ($zrequest->avataranimationdefs as $zanimation) {
				
					/* check if the useravataranimationid is already in use */
					$zuseravataranimationid = $wtwhandlers->getNewKey('useravataranimations', 'useravataranimationid', $zanimation->avataranimationid);
					
					$znewuserid = $wtwhandlers->getUserIDfromPastID($zanimation->userid);
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zanimation->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zanimation->updateuserid);

					$zfounduseravataranimationid = '';
					$zresults = $wtwhandlers->query("
						select useravataranimationid
						from ".wtw_tableprefix."useravataranimations 
						where useravatarid='".$zuseravatarid."'
							and animationevent='".$zanimation->animationevent."'
							and animationfriendlyname='".addslashes($zanimation->animationfriendlyname)."'
							and objectfile='".$zanimation->objectfile."'
						limit 1;
						");
					foreach ($zresults as $zrow) {
						$zfounduseravataranimationid = $zrow["useravataranimationid"];
					}

					if (isset($zfounduseravataranimationid) && !empty($zfounduseravataranimationid)) {
						$wtwhandlers->query("
							update ".wtw_tableprefix."useravataranimations 
							set avataranimationid='".$zanimation->avataranimationid."',
								loadpriority=".$wtwhandlers->checkNumber($zanimation->loadpriority,25).",
								animationicon='".$zanimation->animationicon."',
								objectfolder='".$zobjectfolder."animations/"."',
								objectfile='".$zanimation->objectfile."',
								startframe=".$wtwhandlers->checkNumber($zanimation->startframe,1).",
								endframe=".$wtwhandlers->checkNumber($zanimation->endframe,1).",
								animationloop=".$wtwhandlers->checkNumber($zanimation->animationloop,1).",
								speedratio=".$wtwhandlers->checkNumber($zanimation->speedratio,1).",
								soundid='".$zanimation->soundid."',
								soundmaxdistance=".$wtwhandlers->checkNumber($zanimation->soundmaxdistance,100).",
								updatedate='".$zanimation->updatedate."',
								updateuserid='".$znewupdateuserid."'
							where useravataranimationid='".$zfounduseravataranimationid."'
							limit 1;");
					} else {
						$zresults = $wtwhandlers->query("
							insert into ".wtw_tableprefix."useravataranimations 
							   (useravataranimationid,
								avataranimationid,
								useravatarid,
								loadpriority,
								animationevent,
								animationfriendlyname,
								animationicon,
								objectfolder,
								objectfile,
								startframe,
								endframe,
								animationloop,
								speedratio,
								soundid,
								soundmaxdistance,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$zuseravataranimationid."',
								'".$zanimation->avataranimationid."',
								'".$zuseravatarid."',
								".$wtwhandlers->checkNumber($zanimation->loadpriority,25).",
								'".$zanimation->animationevent."',
								'".addslashes($zanimation->animationfriendlyname)."',
								'".$zanimation->animationicon."',
								'".$zobjectfolder."animations/"."',
								'".$zanimation->objectfile."',
								".$wtwhandlers->checkNumber($zanimation->startframe,1).",
								".$wtwhandlers->checkNumber($zanimation->endframe,1).",
								".$wtwhandlers->checkNumber($zanimation->animationloop,1).",
								".$wtwhandlers->checkNumber($zanimation->speedratio,1).",
								'".$zanimation->soundid."',
								".$wtwhandlers->checkNumber($zanimation->soundmaxdistance,100).",
								'".$zanimation->createdate."',
								'".$znewcreateuserid."',
								'".$zanimation->updatedate."',
								'".$znewupdateuserid."');");		
					}
				}

				$zresponse = array(
					'serror'=> '',
					'useravatarid'=> $zuseravatarid,
					'webid'=> $zwebid,
					'webtype'=> $zwebtype
				);
			}			
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-downloadUpdateUserAvatar=".$e->getMessage());
			$zresponse = array(
				'serror'=> $e->getMessage(),
				'useravatarid'=> $zuseravatarid,
				'webid'=> $zwebid,
				'webtype'=> $zwebtype
			);
		}
		return $zresponse;
	}
}

	function wtwavatars() {
		return wtwavatars::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwavatars'] = wtwavatars();
?>
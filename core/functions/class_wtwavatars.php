<?php
class wtwavatars {
	/* wtwavatars class for admin database functions for avatars */
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
			if (!isset($zfounduseravatarid) || empty($zfounduseravatarid)) {
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
			if ((!isset($zfounduseravatarid) || empty($zfounduseravatarid)) && isset($wtwhandlers->userid) && !empty($wtwhandlers->userid)) {
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
			if ((!isset($zfounduseravatarid) || empty($zfounduseravatarid)) && isset($zinstanceid) && !empty($zinstanceid)) {
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
			if (!isset($zfounduseravatarid) || empty($zfounduseravatarid)) {
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
			if ($wtwhandlers->hasValue($zuseravatarid) && $wtwhandlers->hasValue($wtwhandlers->userid)) {
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
			if ($wtwhandlers->hasValue($wtwhandlers->userid)) {
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
			if ($wtwhandlers->hasValue($wtwhandlers->userid)) {
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
				if (!isset($zfounduseravatarid) || empty($zfounduseravatarid)) {
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
					
					if ($wtwhandlers->hasValue($zfoundavatarid)) {
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
			if ($wtwhandlers->hasValue($wtwhandlers->userid)) {
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
			if ($wtwhandlers->hasValue($zavatarpartid)) {
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
			if (!empty($wtwhandlers->getSessionUserID()) && isset($zuseravatarid) && !empty($zuseravatarid) && isset($zavatardisplayname) && !empty($zavatardisplayname)) {
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
				if (!isset($zfounduserid) || empty($zfounduserid) || $wtwhandlers->userid == $zfounduserid) {
					/* either it is available or you have it */
					if ($wtwhandlers->hasValue($zfounduseravatarid) && $zfounduseravatarid == $zuseravatarid) {
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
			if ($zanimationevent == 'onoption' && isset($zuseravataranimationid) && !empty($zuseravataranimationid)) {
				$zfounduseravataranimationid = $zuseravataranimationid;
			} else if ($zanimationevent == 'onoption') {
				$zfounduseravataranimationid = "";
			}
			if ($wtwhandlers->hasValue($zfounduseravataranimationid)) {
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
			if ($wtwhandlers->hasValue($zfounduseravataranimationid)) {
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
				$zhostuserid = '';
				if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
					$zhostuserid = $wtwhandlers->userid;
				}
				$zfoundavatargroupid = '';
				$zresults = $wtwhandlers->query("
					select avatargroupid
					from ".wtw_tableprefix."avatargroups
					where avatargroupid='".$zavatargroupid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavatargroupid = $zrow["avatargroupid"];
				}
				if (!isset($zfoundavatargroupid) || empty($zfoundavatargroupid)) {
					if (!isset($zavatargroupid) || empty($zavatargroupid)) {
						$zavatargroupid = $wtwhandlers->getRandomString(16,1);
					}
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avatargroups
						   (avatargroupid,
						    avatargroup,
							hostuserid,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						  values
						   ('".$zavatargroupid."',
						    '".$zavatargroup."',
							'".$zhostuserid."',
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
							and (hostuserid='".$zhostuserid."'
								or hostuserid='')
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
				$zhostuserid = '';
				if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
					$zhostuserid = $wtwhandlers->userid;
				}
				$wtwhandlers->query("
					update ".wtw_tableprefix."avatargroups
					set deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."',
						deleted=1
					where avatargroupid='".$zavatargroupid."'
						and (hostuserid='".$zhostuserid."'
							or createuserid='".$wtwhandlers->userid."')
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
				$zhostuserid = '';
				if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
					$zhostuserid = $wtwhandlers->userid;
				}
				$zresults = $wtwhandlers->query("
					select avatargroupid,
						avatargroup,
						hostuserid
					from ".wtw_tableprefix."avatargroups
					where deleted=0
						and (hostuserid='".$zhostuserid."'
							or hostuserid='')
					order by hostuserid desc, avatargroup, avatargroupid;
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
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
				if (!isset($zfoundanimationeventid) || empty($zfoundanimationeventid)) {
					if (!isset($zanimationeventid) || empty($zanimationeventid)) {
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
				$zhostuserid = '';
				if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
					$zhostuserid = $wtwhandlers->userid;
				}
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
						and (hostuserid='".$zhostuserid."'
							or createuserid='".$wtwhandlers->userid."')
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
				$zhostuserid = '';
				if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
					$zhostuserid = $wtwhandlers->userid;
				}
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
					    hostuserid,
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
						'".$zhostuserid."' as hostuserid,
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
				$zhostuserid = '';
				if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
					$zhostuserid = $wtwhandlers->userid;
				}
				$zfoundavatarid = '';
				$zresults = $wtwhandlers->query("
					select avatarid
					from ".wtw_tableprefix."avatars
					where avatarid='".$zavatarid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavatarid = $zrow["avatarid"];
				}
				if (!isset($zfoundavatarid) || empty($zfoundavatarid)) {
					if (!isset($zavatarid) || empty($zavatarid)) {
						$zavatarid = $wtwhandlers->getRandomString(16,1);
					}
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avatars
						   (avatarid,
						    hostuserid,
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
						    '".$zhostuserid."',
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
							and (hostuserid='".$zhostuserid."'
								or createuserid='".$wtwhandlers->userid."')
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
				$zhostuserid = '';
				if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
					$zhostuserid = $wtwhandlers->userid;
				}
				$wtwhandlers->query("
					update ".wtw_tableprefix."avatars
					set deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."',
						deleted=1
					where avatarid='".$zavatarid."'
						and (hostuserid='".$zhostuserid."'
							or createuserid='".$wtwhandlers->userid."')
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
				$zhostuserid = '';
				if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
					$zhostuserid = $wtwhandlers->userid;
				}
				$zfoundavatarid = '';
				$zresults = $wtwhandlers->query("
					select avatarid
					from ".wtw_tableprefix."avatars
					where avatarid='".$zavatarid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavatarid = $zrow["avatarid"];
				}
				if (!isset($zfoundavatarid) || empty($zfoundavatarid)) {
					if (!isset($zavatarid) || empty($zavatarid)) {
						$zavatarid = $wtwhandlers->getRandomString(16,1);
					}
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avatars
						   (avatarid,
						    hostuserid,
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
						    '".$zhostuserid."',
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
							and (hostuserid='".$zhostuserid."'
								or createuserid='".$wtwhandlers->userid."')
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
	
	public function saveAvatarInformation($zavatarid, $zavatargroup, $zdisplayname, $zavatardescription, $zgender) {
		/* saves the avatar information (Not User Avatar, just the starting avatar you can choose) - admin function */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'avatarid'=>$zavatarid
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
				$zfoundavatarid = '';
				$zhostuserid = '';
				if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
					$zhostuserid = $wtwhandlers->userid;
				}
				$zresults = $wtwhandlers->query("
					select avatarid
					from ".wtw_tableprefix."avatars
					where avatarid='".$zavatarid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavatarid = $zrow["avatarid"];
				}
				if (!isset($zfoundavatarid) || empty($zfoundavatarid)) {
					if (!isset($zavatarid) || empty($zavatarid)) {
						$zavatarid = $wtwhandlers->getRandomString(16,1);
					}
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avatars
						   (avatarid,
						    hostuserid,
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
						    '".$zhostuserid."',
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
							and (hostuserid='".$zhostuserid."'
								or createuserid='".$wtwhandlers->userid."')
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

	public function saveAvatarsInGroup($zavatarid, $zavatargroupid, $zavatarsingroupid, $zchecked) {
		/* saves the avatar groups based on avatar information form */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'avatarsingroupid'=>$zavatarsingroupid
		);
		try {
			$zfoundavatarsingroupid = '';
			if (isset($zavatarsingroupid) && !empty($zavatarsingroupid)) {
				$zresults = $wtwhandlers->query("
					select avatarsingroupid
					from ".wtw_tableprefix."avatarsingroups
					where avatarsingroupid='".$zavatarsingroupid."'
						and avatarid='".$zavatarid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavatarsingroupid = $zrow["avatarsingroupid"];
				}
			}
			if (isset($zfoundavatarsingroupid) && !empty($zfoundavatarsingroupid)) {
				if ($zchecked == '1') {
					$wtwhandlers->query("
						update ".wtw_tableprefix."avatarsingroups
						set updatedate=now(),
							updateuserid='".$wtwhandlers->userid."',
							deleteddate=null,
							deleteduserid='',
							deleted=0
						where avatarsingroupid='".$zfoundavatarsingroupid."';
					");
				} else {
					$wtwhandlers->query("
						update ".wtw_tableprefix."avatarsingroups
						set updatedate=now(),
							updateuserid='".$wtwhandlers->userid."',
							deleteddate=now(),
							deleteduserid='".$wtwhandlers->userid."',
							deleted=1
						where avatarsingroupid='".$zfoundavatarsingroupid."';
					");
				}
			} else {
				if ($zchecked == '1') {
					/* add new record */
					$zavatarsingroupid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avatarsingroups
						   (avatarsingroupid,
						    avatarid,
							avatargroupid,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$zavatarsingroupid."',
						    '".$zavatarid."',
							'".$zavatargroupid."',
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');
					");
					$zresponse = array(
						'serror'=>'',
						'avatarsingroupid'=>$zavatarsingroupid
					);
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-saveAvatarsInGroup=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage(),
				'avatarsingroupid'=>$zavatarsingroupid
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
				$zfoundavatarid = '';
				$zhostuserid = '';
				if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
					$zhostuserid = $wtwhandlers->userid;
				}
				$zresults = $wtwhandlers->query("
					select avatarid
					from ".wtw_tableprefix."avatars
					where avatarid='".$zavatarid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavatarid = $zrow["avatarid"];
				}
				if ($wtwhandlers->hasValue($zfoundavatarid)) {
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
							and (hostuserid='".$zhostuserid."'
								or createuserid='".$wtwhandlers->userid."')
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
				if (!isset($zdiffusecolor) || empty($zdiffusecolor)) {
					$zdiffusecolor = '#FFFFFF';
				}
				if (!isset($zspecularcolor) || empty($zspecularcolor)) {
					$zspecularcolor = '#000000';
				}
				if (!isset($zemissivecolor) || empty($zemissivecolor)) {
					$zemissivecolor = '#000000';
				}
				if (!isset($zambientcolor) || empty($zambientcolor)) {
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
				if ($wtwhandlers->hasValue($zfoundavatarpartid)) {
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
					if (!isset($zavatarpartid) || empty($zavatarpartid)) {
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
				if (!isset($zloadpriority) || empty($zloadpriority)) {
					$zloadpriority = '0';
				}
				if (!is_numeric($zloadpriority)) {
					$zloadpriority = '0';
				}
				if (!isset($zstartframe) || empty($zstartframe)) {
					$zstartframe = '1';
				}
				if (!is_numeric($zstartframe)) {
					$zstartframe = '1';
				}
				if (!isset($zendframe) || empty($zendframe)) {
					$zendframe = '1';
				}
				if (!is_numeric($zendframe)) {
					$zendframe = '1';
				}
				if (!isset($zspeedratio) || empty($zspeedratio)) {
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
				if ($wtwhandlers->hasValue($zfoundavataranimationid)) {
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
					if (!isset($zavataranimationid) || empty($zavataranimationid)) {
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
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
				if ($wtwhandlers->hasValue($zfoundavataranimationid)) {
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
				$zmaxfilesize = $wtwhandlers->getMaximumFileUploadSize();
				$zfilepath = wtw_rootpath.$zobjectfolder;
				$wtwhandlers->verifyFolderExists($zfilepath);
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
				if ($zfilesize > $zmaxfilesize) {
					$zresponse = array(
						'serror'=> "Your file is too large.",
						'objectfolder'=> '',
						'objectfile'=> ''
					);
					$zisvalid = 0;
				}
				if (strtolower($zfileextension) != "babylon" && strtolower($zfileextension) != "gltf" && strtolower($zfileextension) != "glb" && strtolower($zfileextension) != "obj") {
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
						umask(0);
						chmod($ztargetfile, octdec(wtw_chmod));
						if (defined('wtw_umask')) {
							/* reset umask */
							if (wtw_umask != '0') {
								umask(octdec(wtw_umask));
							}
						}
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
				$zmaxfilesize = $wtwhandlers->getMaximumFileUploadSize();
				$zfilepath = wtw_rootpath.$zobjectfolder;
				$wtwhandlers->verifyFolderExists($zfilepath);
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
					if ($zfilesize > $zmaxfilesize) {
						$zresponse = array(
							'serror'=> "Your file is too large.",
							'objectfolder'=> '',
							'objectfile'=> ''
						);
						$zisvalid = 0;
					}
					if (strtolower($zfileextension) != "babylon" && strtolower($zfileextension) != "manifest" && strtolower($zfileextension) != "txt" && strtolower($zfileextension) != "jpg" && strtolower($zfileextension) != "png" && strtolower($zfileextension) != "jpeg" && strtolower($zfileextension) != "gif" && strtolower($zfileextension) != "wav" && strtolower($zfileextension) != "mp3" && strtolower($zfileextension) != "mp4" && strtolower($zfileextension) != "webm" && strtolower($zfileextension) != "ogv" && strtolower($zfileextension) != "bin" && strtolower($zfileextension) != "gltf" && strtolower($zfileextension) != "bgltf" && strtolower($zfileextension) != "glb" && strtolower($zfileextension) != "blend" && strtolower($zfileextension) != "blend1" && strtolower($zfileextension) != "obj" && strtolower($zfileextension) != "fbx" && strtolower($zfileextension) != "log") {
						$zresponse = array(
							'serror'=> "Only babylon, gltf, glb, obj, blend, manifest, txt, and image files are allowed at this time.",
							'objectfolder'=> '',
							'objectfile'=> ''
						);
						$zisvalid = 0;
					}
					if ($zisvalid == 1) {
						if (move_uploaded_file($zuploadfiles["tmp_name"][$i], $ztargetfile)) {
							umask(0);
							chmod($ztargetfile, octdec(wtw_chmod));
							if (defined('wtw_umask')) {
								/* reset umask */
								if (wtw_umask != '0') {
									umask(octdec(wtw_umask));
								}
							}
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

	
	
}

	function wtwavatars() {
		return wtwavatars::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwavatars'] = wtwavatars();
?>
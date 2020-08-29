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
		/* gets basic avatar information - runtime uses /connect/useravatar.php for local and /connect/avatar.php for anonymous; (also has global option) */
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
						'username'=> $zrow["username"],
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
						'username'=> 'Anonymous',
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
		$zfounduseravatarid = '';
		try {
			if (!empty($wtwhandlers->userid) && isset($wtwhandlers->userid)) {
				/* check for existing avatar with same avatarid and userid */ 
				$zresults = $wtwhandlers->query("
					select * 
					from ".wtw_tableprefix."useravatars 
					where avatarid='".$zavatarid."'
						and userid='".$wtwhandlers->userid."' 
					order by updatedate desc
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfounduseravatarid = $zrow["useravatarid"];
				}
				if (empty($zfounduseravatarid) || !isset($zfounduseravatarid)) {
					/* if not found, add avatar to user account in useravatars table */
					$zfoundavatarid = '';
					$zavatargroup = 'default';
					$zobjectfolder = '';
					$zobjectfile = '';
					$zgender = 'male';
					$zscalingx = .04;
					$zscalingy = .04;
					$zscalingz = .04;
					$zdisplayname = base64_decode($zdisplayname);
					/* get default avatar definition from avatars table */
					$zresults = $wtwhandlers->query("
						select * 
						from ".wtw_tableprefix."avatars 
						where avatarid='".$zavatarid."'
						order by updatedate desc
						limit 1;");
					foreach ($zresults as $zrow) {
						$zfoundavatarid = $zrow["avatarid"];
						$zavatargroup = $zrow["avatargroup"];
						$zobjectfolder = $zrow["avatarfolder"];
						$zobjectfile = $zrow["avatarfile"];
						$zgender = $zrow["gender"];
						$zscalingx = $zrow["scalingx"];
						$zscalingy = $zrow["scalingy"];
						$zscalingz = $zrow["scalingz"];
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
								 scalingx,
								 scalingy,
								 scalingz,
								 displayname,
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
								 '".$zobjectfolder."',
								 '".$zobjectfile."',
								 '".$zgender."',
								 ".$wtwhandlers->checkNumber($zscalingx,.04).",
								 ".$wtwhandlers->checkNumber($zscalingy,.04).",
								 ".$wtwhandlers->checkNumber($zscalingz,.04).",
								 '".$wtwhandlers->checkDisplayName($zdisplayname, 'Anonymous')."',
								 now(),
								 '".$wtwhandlers->userid."',
								 now(),
								 '".$wtwhandlers->userid."');");

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
							where setdefault=1 and deleted=0
							order by loadpriority desc
							limit 15;");
						foreach ($zresults as $zrow) {
							$wtwhandlers->query("
								insert into ".wtw_tableprefix."useravataranimations
								   (useravataranimationid,
									avataranimationid,
									useravatarid,
									avataranimationevent,
									speedratio,
									walkspeed,
									createdate,
									createuserid,
									updatedate,
									updateuserid)
								   values
								   ('".$wtwhandlers->getRandomString(16,1)."',
									'".$zrow["avataranimationid"]."',
									'".$zfounduseravatarid."',
									'".$zrow["animationevent"]."',
									".$zrow["speedratio"].",
									1.00,
									now(),
									'".$wtwhandlers->userid."',
									now(),
									'".$wtwhandlers->userid."');");
						}
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-quickSaveAvatar=".$e->getMessage());
		}
		return $zfounduseravatarid;
	}

	public function checkAnonymousAvatar($zinstanceid,$zuserip,$zavatarind) {
		return true;
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
	
	public function saveAvatarAnimation($zuseravataranimationid,$zuseravatarid,$zinstanceid,$zavataranimationid,$zavataranimationevent,$zspeedratio) {
		/* save avatar animation settings for current user avatar - depreciated with release v3.3.0 and avatar designer plugin */
		global $wtwhandlers;
		try {
			$wtwhandlers->getSessionUserID();
			$zfounduseravataranimationid = "";
			$zfounduseravatarid = $this->getAvatar($zuseravatarid,$zinstanceid);
			$zresults = $wtwhandlers->query("
					select useravataranimationid 
					from ".wtw_tableprefix."useravataranimations 
					where avataranimationevent='".$zavataranimationevent."' 
						and (not avataranimationevent='') 
						and useravatarid='".$zfounduseravatarid."' 
						and not useravatarid='' 
					limit 1;");
			foreach ($zresults as $zrow) {
				$zfounduseravataranimationid = $zrow["useravataranimationid"];
			}
			if ($zavataranimationevent == 'onoption' && !empty($zuseravataranimationid) && isset($zuseravataranimationid)) {
				$zfounduseravataranimationid = $zuseravataranimationid;
			} else if ($zavataranimationevent == 'onoption') {
				$zfounduseravataranimationid = "";
			}
			if (!empty($zfounduseravataranimationid) && isset($zfounduseravataranimationid)) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."useravataranimations
					set avataranimationid='".$zavataranimationid."',
						 useravatarid='".$zfounduseravatarid."',
						 avataranimationevent='".$zavataranimationevent."',
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
						 avataranimationevent,
						 speedratio,
						 createdate,
						 createuserid,
						 updatedate,
						 updateuserid)
						values
						('".$zfounduseravataranimationid."',
						 '".$zavataranimationid."',
						 '".$zfounduseravatarid."',
						 '".$zavataranimationevent."',
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
}

	function wtwavatars() {
		return wtwavatars::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwavatars'] = wtwavatars();
?>
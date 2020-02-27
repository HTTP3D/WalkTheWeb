<?php
class wtwavatars {
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
		global $wtwhandlers;
		$zfounduseravatarid = "";
		try {
			$zfoundavatarind = "";
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
		global $wtwhandlers;
		$zresponse = "";
		try {
			$zavatar = array();
			if (!empty($wtwhandlers->userid) && isset($wtwhandlers->userid)) {
				$zresults = $wtwhandlers->query("
					select u.*,
						a.useravatarid,
						a.avatarind
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
						'myavatarid'=> $zrow["useravatarid"],
						'avatarind'=> $zrow["avatarind"],
						'uploadpathid'=> $zrow["uploadpathid"],
						'displayname'=> $zrow["displayname"],
						'userimageurl'=> $zrow["userimageurl"],
						'email'=> $zrow["email"]
					);
				}
			} else {
				$zresults = $wtwhandlers->query("
					select useravatarid,
						avatarind
					from ".wtw_tableprefix."useravatars 
					where instanceid='".$zinstanceid."' 
								and userid=''
								and deleted=0 
							order by updatedate desc limit 1;");
				foreach ($zresults as $zrow) {
					$zavatar = array(
						'userid'=> '',
						'username'=> 'Anonymous',
						'myavatarid'=> $zrow["useravatarid"],
						'avatarind'=> $zrow["avatarind"],
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
		
	public function saveAvatar($zuseravatarid,$zinstanceid,$zuserip,$zavatarind,$zobjectfolder,$zobjectfile,$zscalingx,$zscalingy,$zscalingz) {
		global $wtwhandlers;
		$zfounduseravatarid = "";
		try {
			$wtwhandlers->getSessionUserID();
			$zfounduseravatarid = $this->getAvatar($zuseravatarid,$zinstanceid);
			$zfoundavatarind = "";
			
			if (!empty($wtwhandlers->userid) && isset($wtwhandlers->userid)) {
				/* get existing avatar index (which avatar choice) */ 
				$zresults = $wtwhandlers->query("
					select avatarind 
					from ".wtw_tableprefix."useravatars 
					where useravatarid='".$zfounduseravatarid."' 
						and userid='".$wtwhandlers->userid."' 
					order by updatedate desc
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavatarind = $zrow["avatarind"];
					$zinstanceid = $zrow["instanceid"];
				}
			}
			if ((empty($zfoundavatarind) || !isset($zfoundavatarind)) && !empty($zinstanceid) && isset($zinstanceid)) {
				/* get existing avatar index (which avatar choice) */ 
				$zresults = $wtwhandlers->query("
					select avatarind 
					from ".wtw_tableprefix."useravatars 
					where useravatarid='".$zfounduseravatarid."' 
						and userid='' 
						and instanceid='".$zinstanceid."'
					order by updatedate desc
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavatarind = $zrow["avatarind"];
				}
			}
			if (!empty($zfounduseravatarid) && isset($zfounduseravatarid) && $zfoundavatarind != $zavatarind) { 
				/* changed your avatar choice, this removes old color settings (back to default) */
				$wtwhandlers->query("
					update ".wtw_tableprefix."useravatarcolors
					set deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."',
						deleted=1
					where useravatarid='".$zfounduseravatarid."';");
			}
			if (!empty($zfounduseravatarid) && isset($zfounduseravatarid)) {
				/* save new settings for existing found avatar */
				$wtwhandlers->query("
					update ".wtw_tableprefix."useravatars
					set avatarind=".$wtwhandlers->checkNumber($zavatarind,1).",
						instanceid='".$zinstanceid."',
						userip='".$zuserip."',
						objectfolder='".$zobjectfolder."',
						objectfile='".$zobjectfile."',
						scalingx=".$wtwhandlers->checkNumber($zscalingx,1).",
						scalingy=".$wtwhandlers->checkNumber($zscalingy,1).",
						scalingz=".$wtwhandlers->checkNumber($zscalingz,1).",
						updatedate=now(),
						updateuserid='".$wtwhandlers->userid."',
						deleteddate=null,
						deleteduserid='',
						deleted=0
					where useravatarid='".$zfounduseravatarid."';");
			} else {
				/* save new avatar */
				$zfounduseravatarid = $wtwhandlers->getRandomString(16,1);
				$wtwhandlers->query("
					insert into ".wtw_tableprefix."useravatars
						(useravatarid,
						 instanceid,
						 userid,
						 userip,
						 avatarind,
						 objectfolder,
						 objectfile,
						 scalingx,
						 scalingy,
						 scalingz,
						 createdate,
						 createuserid,
						 updatedate,
						 updateuserid)
					values
						('".$zfounduseravatarid."',
						 '".$zinstanceid."',
						 '".$wtwhandlers->userid."',
						 '".$zuserip."',
						 ".$wtwhandlers->checkNumber($zavatarind,1).",
						 '".$zobjectfolder."',
						 '".$zobjectfile."',
						 ".$wtwhandlers->checkNumber($zscalingx,1).",
						 ".$wtwhandlers->checkNumber($zscalingy,1).",
						 ".$wtwhandlers->checkNumber($zscalingz,1).",
						 now(),
						 '".$wtwhandlers->userid."',
						 now(),
						 '".$wtwhandlers->userid."');");
				if (!empty($wtwhandlers->userid) && isset($wtwhandlers->userid)) {
					$this->checkAnonymousAvatar($zinstanceid,$zuserip,$zavatarind);
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-saveAvatar=".$e->getMessage());
		}
		return $zfounduseravatarid;
	}

	public function checkAnonymousAvatar($zinstanceid,$zuserip,$zavatarind) {
		global $wtwhandlers;
		$zsuccess = false;
		try {
			$zfounduseravatarid = "";
			/* get existing avatar index (which avatar choice) */ 
			$zresults = $wtwhandlers->query("
				select useravatarid 
				from ".wtw_tableprefix."useravatars 
				where userid='' 
					and instanceid='".$zinstanceid."' 
				limit 1;");
			foreach ($zresults as $zrow) {
				$zfounduseravatarid = $zrow["useravatarid"];
			}
			if (empty($zfounduseravatarid) || !isset($zfounduseravatarid)) {
				$zanonavatarind = 2;
				$zscaling = '.07';
				$zobjectfolder = "/content/system/avatars/male/";
				$zobjectfile = "maleidle.babylon";
				switch ($zavatarind) {
					case 1:
						$zanonavatarind = 1;
						$zobjectfolder = "/content/system/avatars/female/";
						$zobjectfile = "femaleidle.babylon";
						break;
					case 7:
						$zanonavatarind = 1;
						$zobjectfolder = "/content/system/avatars/female/";
						$zobjectfile = "femaleidle.babylon";
						break;
					case 8:
						$zanonavatarind = 1;
						$zobjectfolder = "/content/system/avatars/female/";
						$zobjectfile = "femaleidle.babylon";
						break;
					case 9:
						$zanonavatarind = 1;
						$zobjectfolder = "/content/system/avatars/female/";
						$zobjectfile = "femaleidle.babylon";
						break;
					case 10:
						$zanonavatarind = 1;
						$zobjectfolder = "/content/system/avatars/female/";
						$zobjectfile = "femaleidle.babylon";
						break;
				}
				/* save new avatar */
				$zfounduseravatarid = $wtwhandlers->getRandomString(16,1);
				$wtwhandlers->query("
					insert into ".wtw_tableprefix."useravatars
						(useravatarid,
						 instanceid,
						 userid,
						 userip,
						 avatarind,
						 objectfolder,
						 objectfile,
						 scalingx,
						 scalingy,
						 scalingz,
						 createdate,
						 createuserid,
						 updatedate,
						 updateuserid)
					values
						('".$zfounduseravatarid."',
						 '".$zinstanceid."',
						 '',
						 '".$zuserip."',
						 ".$zanonavatarind.",
						 '".$zobjectfolder."',
						 '".$zobjectfile."',
						 ".$zscaling.",
						 ".$zscaling.",
						 ".$zscaling.",
						 now(),
						 '".$wtwhandlers->userid."',
						 now(),
						 '".$wtwhandlers->userid."');");
			}
			$zsuccess = true;
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwavatars.php-checkAnonymousAvatar=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function saveAvatarColor($zuseravatarid,$zinstanceid,$zavatarpart,$zemissivecolorr,$zemissivecolorg,$zemissivecolorb) {
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
	
	public function saveAvatarAnimation($zuseravataranimationid,$zuseravatarid,$zinstanceid,$zavataranimationid,$zavataranimationname,$zspeedratio) {
		global $wtwhandlers;
		try {
			$wtwhandlers->getSessionUserID();
			$zfounduseravataranimationid = "";
			$zfounduseravatarid = $this->getAvatar($zuseravatarid,$zinstanceid);
			$zresults = $wtwhandlers->query("
					select useravataranimationid 
					from ".wtw_tableprefix."useravataranimations 
					where avataranimationname='".$zavataranimationname."' 
						and (not avataranimationname='') 
						and useravatarid='".$zfounduseravatarid."' 
						and not useravatarid='' 
					limit 1;");
			foreach ($zresults as $zrow) {
				$zfounduseravataranimationid = $zrow["useravataranimationid"];
			}
			if ($zavataranimationname == 'onoption' && !empty($zuseravataranimationid) && isset($zuseravataranimationid)) {
				$zfounduseravataranimationid = $zuseravataranimationid;
			} else if ($zavataranimationname == 'onoption') {
				$zfounduseravataranimationid = "";
			}
			if (!empty($zfounduseravataranimationid) && isset($zfounduseravataranimationid)) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."useravataranimations
					set avataranimationid='".$zavataranimationid."',
						 useravatarid='".$zfounduseravatarid."',
						 avataranimationname='".$zavataranimationname."',
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
						 avataranimationname,
						 speedratio,
						 createdate,
						 createuserid,
						 updatedate,
						 updateuserid)
						values
						('".$zfounduseravataranimationid."',
						 '".$zavataranimationid."',
						 '".$zfounduseravatarid."',
						 '".$zavataranimationname."',
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
					and (('".$wtwhandlers->userid."'='' and requireslogin=0)
						or not '".$wtwhandlers->userid."'='')
					and a.deleted=0
				order by a.loadpriority desc, 
						a.animationname, 
						a.animationfriendlyname, 
						a.avataranimationid;");
			$i = 0;
			foreach ($zresults as $zrow) {
				$animations[$i] = array(
					'avataranimationid'=> $zrow["avataranimationid"],
					'requireslogin'=> $zrow["requireslogin"],
					'userid'=> $zrow["userid"],
					'loadpriority'=> $zrow["loadpriority"],
					'animationname'=> $zrow["animationname"],
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
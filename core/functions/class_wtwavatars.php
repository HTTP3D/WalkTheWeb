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
		global $wtwiframes;
		$zfounduseravatarid = "";
		try {
			$zfoundavatarind = "";
			/* check for existing avatar for loggedin user */ 
			$zresults = $wtwiframes->query("
				select useravatarid 
				from ".wtw_tableprefix."useravatars 
				where useravatarid='".$zuseravatarid."' 
					and userid='".$wtwiframes->userid."' 
					and not userid=''
				limit 1;");
			foreach ($zresults as $zrow) {
				$zfounduseravatarid = $zrow["useravatarid"];
			}
			if (empty($zfounduseravatarid) || !isset($zfounduseravatarid)) {
				/* check for existing avatar by user instance */ 
				$zresults = $wtwiframes->query("
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
			if (empty($zfounduseravatarid) || !isset($zfounduseravatarid)) {
				/* check for existing avatar by loggedin user and instance */ 
				$zresults = $wtwiframes->query("
					select useravatarid 
					from ".wtw_tableprefix."useravatars 
					where instanceid='".$zinstanceid."' 
						and userid='".$wtwiframes->userid."'
						and not instanceid='' 
					order by updatedate desc limit 1;");
				foreach ($zresults as $zrow) {
					$zfounduseravatarid = $zrow["useravatarid"];
				}
			}
			if ((empty($zfounduseravatarid) || !isset($zfounduseravatarid)) && !empty($wtwiframes->userid) && isset($wtwiframes->userid)) {
				/* check for existing avatar by loggedin user */ 
				$zresults = $wtwiframes->query("
					select useravatarid 
					from ".wtw_tableprefix."useravatars 
					where userid='".$wtwiframes->userid."'
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
			$wtwiframes->serror("core-functions-class_wtwavatars.php-getAvatar=".$e->getMessage());
		}
		return $zfounduseravatarid;
	}

	public function getAvatarSession($zuserid, $zinstanceid, $zusername, $zuseremail, $zuserimageurl, $zdisplayname) {
		global $wtwiframes;
		$zresponse = null;
		$zavatar = array();
		$zavatarparts = array();
		try {
			$zuseravatarid = $this->getAvatar("",$zinstanceid);
			if (!empty($zuseravatarid) && isset($zuseravatarid)) {
				$i = 0;
				$zavataranimationdefs = array();
				$zinstanceid = "";
				$zavatarind = 1;
				$zscalingx = '.07';
				$zscalingy = '.07';
				$zscalingz = '.07';
				$zobjectfolder = "/content/system/avatars/female/";
				$zobjectfile = "femaleidle.babylon";
				$zdisplayname = "Anonymous";
				$zprivacy = 0;
				$zresults = $wtwiframes->query("
					select a.*,
						c.avatarpartid,
						c.avatarpart,
						c.emissivecolorr,
						c.emissivecolorg,
						c.emissivecolorb
					from ".wtw_tableprefix."useravatars a 
						left join ".wtw_tableprefix."useravatarcolors c
							on a.useravatarid = c.useravatarid
					where a.useravatarid='".$zuseravatarid."'
						and (c.deleted is null or c.deleted=0)
					order by c.avatarpart, c.updatedate desc;");
				foreach ($zresults as $zrow) {
					$zavatarind = $zrow["avatarind"];
					$zscalingx = $wtwiframes->checkNumber($zrow["scalingx"],1);
					$zscalingy = $wtwiframes->checkNumber($zrow["scalingy"],1);
					$zscalingz = $wtwiframes->checkNumber($zrow["scalingz"],1);
					$zobjectfolder = $zrow["objectfolder"];
					$zobjectfile = $zrow["objectfile"];
					$zdisplayname = $wtwiframes->escapeHTML($zrow["displayname"]);
					$zprivacy = $wtwiframes->checkNumber($zrow["privacy"],0);
					$zavatarparts[$i] = array(
						'avatarpartid'=> $zrow["avatarpartid"],
						'avatarpart'=> $zrow["avatarpart"],
						'emissivecolorr'=> $wtwiframes->checkNumber($zrow["emissivecolorr"],1),
						'emissivecolorg'=> $wtwiframes->checkNumber($zrow["emissivecolorg"],1),
						'emissivecolorb'=> $wtwiframes->checkNumber($zrow["emissivecolorb"],1)
					);
					$i += 1;
				}
				$i = 0;
				$zresults = $wtwiframes->query("
					select u.*,
						a.loadpriority,
						a.animationfriendlyname,
						a.animationicon,
						a.objectfolder,
						a.objectfile,
						a.startframe,
						a.endframe,
						a.animationloop,
						a.speedratio as defaultspeedratio,
						a.soundid,
						a.soundpath,
						a.soundmaxdistance
					from ".wtw_tableprefix."useravataranimations u 
						inner join ".wtw_tableprefix."avataranimations a
							on u.avataranimationid=a.avataranimationid
					where u.useravatarid='".$zuseravatarid."'
						and u.deleted=0
					order by a.loadpriority desc, u.avataranimationname, u.avataranimationid, u.useravataranimationid;");
				foreach ($zresults as $zrow) {
					$zavataranimationdefs[$i] = array(
						'animationind'=> $i,
						'useravataranimationid'=> $zrow["useravataranimationid"],
						'avataranimationid'=> $zrow["avataranimationid"],
						'animationname'=> $zrow["avataranimationname"],
						'animationfriendlyname'=> $zrow["animationfriendlyname"],
						'loadpriority'=> $wtwiframes->checkNumber($zrow["loadpriority"],100),
						'animationicon'=> $zrow["animationicon"],
						'defaultspeedratio'=> $wtwiframes->checkNumber($zrow["defaultspeedratio"],1),
						'speedratio'=> $wtwiframes->checkNumber($zrow["speedratio"],1),
						'objectfolder'=> $zrow["objectfolder"],
						'objectfile'=> $zrow["objectfile"],
						'startframe'=> $wtwiframes->checkNumber($zrow["startframe"],0),
						'endframe'=> $wtwiframes->checkNumber($zrow["endframe"],0),
						'animationloop'=> $zrow["animationloop"],
						'walkspeed'=> $zrow["walkspeed"]
					);
					$i += 1;
				}
				$zavatar = array(
					'userid'=> $zuserid,
					'useravatarid'=> $zuseravatarid,
					'instanceid'=> $zinstanceid,
					'avatarind'=> $zavatarind,
					'scalingx'=> $zscalingx,
					'scalingy'=> $zscalingy,
					'scalingz'=> $zscalingz,
					'objectfolder'=> $zobjectfolder,
					'objectfile'=> $zobjectfile,
					'displayname'=> $zdisplayname,
					'privacy'=> $zprivacy,
					'avatarparts'=> $zavatarparts,
					'avataranimationdefs'=> $zavataranimationdefs
				);
			}
			$zresponse = json_encode($zavatar);
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-users.php-getAvatarSession=".$e->getMessage());
		}
		return $zresponse;
	}

	public function getUserSession($zinstanceid) {
		global $wtwiframes;
		$zresponse = "";
		try {
			$zavatar = array();
			$zresults = $wtwiframes->query("
				select u.*,
					a.useravatarid,
					a.avatarind
				from ".wtw_tableprefix."users u 
					left join (select * 
						from ".wtw_tableprefix."useravatars 
						where userid='".$wtwiframes->userid."' 
							and instanceid='".$zinstanceid."' 
							and (not userid='') 
							and deleted=0 
						order by updatedate desc limit 1) a
					on u.userid=a.userid
				where u.userid='".$wtwiframes->userid."';");
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
			$zresponse = json_encode($zavatar);
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-users.php-getUserSession=".$e->getMessage());
		}
		return $zresponse;
	}
		
	public function saveAvatar($zuseravatarid,$zinstanceid,$zuserip,$zavatarind,$zobjectfolder,$zobjectfile,$zscalingx,$zscalingy,$zscalingz) {
		global $wtwiframes;
		$zfounduseravatarid = "";
		try {
			$wtwiframes->getSessionUserID();
			$zfounduseravatarid = $this->getAvatar($zuseravatarid,$zinstanceid);
			$zfoundavatarind = "";
			/* get existing avatar index (which avatar choice) */ 
			$zresults = $wtwiframes->query("
				select avatarind 
				from ".wtw_tableprefix."useravatars 
				where useravatarid='".$zuseravatarid."' 
					and userid='".$wtwiframes->userid."' 
					and instanceid='".$zinstanceid."' 
				limit 1;");
			foreach ($zresults as $zrow) {
				$zfoundavatarind = $zrow["avatarind"];
			}
			if (!empty($zfounduseravatarid) && isset($zfounduseravatarid) && $zfoundavatarind != $zavatarind) { 
				/* changed your avatar choice, this removes old color settings (back to default) */
				$wtwiframes->query("
					update ".wtw_tableprefix."useravatarcolors
					set deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."',
						deleted=1
					where useravatarid='".$zfounduseravatarid."';");
			}
			if (!empty($zfounduseravatarid) && isset($zfounduseravatarid)) {
				/* save new settings for existing found avatar */
				$wtwiframes->query("
					update ".wtw_tableprefix."useravatars
					set avatarind=".$wtwiframes->checkNumber($zavatarind,1).",
						instanceid='".$zinstanceid."',
						userip='".$zuserip."',
						objectfolder='".$zobjectfolder."',
						objectfile='".$zobjectfile."',
						scalingx=".$wtwiframes->checkNumber($zscalingx,1).",
						scalingy=".$wtwiframes->checkNumber($zscalingy,1).",
						scalingz=".$wtwiframes->checkNumber($zscalingz,1).",
						updatedate=now(),
						updateuserid='".$wtwiframes->userid."',
						deleteddate=null,
						deleteduserid='',
						deleted=0
					where useravatarid='".$zfounduseravatarid."'
						and userid='".$wtwiframes->userid."';");
			} else {
				/* save new avatar */
				$zfounduseravatarid = $wtwiframes->getRandomString(16,1);
				$wtwiframes->query("
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
						 '".$wtwiframes->userid."',
						 '".$zuserip."',
						 ".$wtwiframes->checkNumber($zavatarind,1).",
						 '".$zobjectfolder."',
						 '".$zobjectfile."',
						 ".$wtwiframes->checkNumber($zscalingx,1).",
						 ".$wtwiframes->checkNumber($zscalingy,1).",
						 ".$wtwiframes->checkNumber($zscalingz,1).",
						 now(),
						 '".$wtwiframes->userid."',
						 now(),
						 '".$wtwiframes->userid."');");
				if (!empty($wtwiframes->userid) && isset($wtwiframes->userid)) {
					$this->checkAnonymousAvatar($zinstanceid,$zuserip,$zavatarind);
				}
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwavatars.php-saveAvatar=".$e->getMessage());
		}
		return $zfounduseravatarid;
	}

	public function checkAnonymousAvatar($zinstanceid,$zuserip,$zavatarind) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			$zfounduseravatarid = "";
			/* get existing avatar index (which avatar choice) */ 
			$zresults = $wtwiframes->query("
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
				$zfounduseravatarid = $wtwiframes->getRandomString(16,1);
				$wtwiframes->query("
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
						 '".$wtwiframes->userid."',
						 now(),
						 '".$wtwiframes->userid."');");
			}
			$zsuccess = true;
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwavatars.php-checkAnonymousAvatar=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function saveAvatarColor($zuseravatarid,$zinstanceid,$zavatarpart,$zemissivecolorr,$zemissivecolorg,$zemissivecolorb) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			$wtwiframes->getSessionUserID();
			$zavatarpartid = "";
			$zresults = $wtwiframes->query("
				select avatarpartid 
				from ".wtw_tableprefix."useravatarcolors 
				where useravatarid='".$zuseravatarid."' 
					and userid='".$wtwiframes->userid."' 
					and instanceid='".$zinstanceid."' 
					and avatarpart='".$zavatarpart."' 
				limit 1;");
			foreach ($zresults as $zrow) {
				$zavatarpartid = $zrow["avatarpartid"];
			}
			if (!empty($zavatarpartid) && isset($zavatarpartid)) {
				$wtwiframes->query("
					update ".wtw_tableprefix."useravatarcolors
					set avatarpart='".$zavatarpart."',
						emissivecolorr=".$wtwiframes->checkNumber($zemissivecolorr,1).",
						emissivecolorg=".$wtwiframes->checkNumber($zemissivecolorg,1).",
						emissivecolorb=".$wtwiframes->checkNumber($zemissivecolorb,1).",
						updatedate=now(),
						updateuserid='".$wtwiframes->userid."',
						deleteddate=null,
						deleteduserid='',
						deleted=0
					where avatarpartid='".$zavatarpartid."'
						and userid='".$wtwiframes->userid."'
						and instanceid='".$zinstanceid."';");
			} else {
				$zavatarpartid = $wtwiframes->getRandomString(16,1);
				$wtwiframes->query("
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
						 '".$wtwiframes->userid."',
						 '".$zinstanceid."',
						 '".$zavatarpart."',
						 ".$wtwiframes->checkNumber($zemissivecolorr,1).",
						 ".$wtwiframes->checkNumber($zemissivecolorg,1).",
						 ".$wtwiframes->checkNumber($zemissivecolorb,1).",
						 now(),
						 '".$wtwiframes->userid."',
						 now(),
						 '".$wtwiframes->userid."');");
			}
			$zsuccess = true;
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwavatars.php-saveAvatarColor=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function saveAvatarDisplayName($zuseravatarid,$zinstanceid,$zavatardisplayname) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if (!empty($wtwiframes->getSessionUserID()) && !empty($zuseravatarid) && isset($zuseravatarid) && !empty($zavatardisplayname) && isset($zavatardisplayname)) {
				/* check if someone else is using that displayname */
				$zfounduserid = "";
				$zfounduseravatarid = "";
				$zresults = $wtwiframes->query("
					select * 
					from ".wtw_tableprefix."useravatars
					where displayname='".$zavatardisplayname."' 
						and deleted=0
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfounduserid = $zrow["userid"];
					$zfounduseravatarid = $zrow["useravatarid"];
				}
				if (empty($zfounduserid) || !isset($zfounduserid) || $wtwiframes->userid == $zfounduserid) {
					/* either it is available or you have it */
					if (!empty($zfounduseravatarid) && isset($zfounduseravatarid) && $zfounduseravatarid == $zuseravatarid) {
						/*no update needed */
					} else {
						/* swap names with your other avatar */
						$zolddisplayname = "";
						$zolduseravatarid = "";
						/* get old name you are replacing from current avatar */
						$zresults = $wtwiframes->query("
							select displayname 
							from ".wtw_tableprefix."useravatars
							where useravatarid='".$zuseravatarid."'
								and userid='".$wtwiframes->userid."'
							limit 1;");
						foreach ($zresults as $zrow) {
							$zolddisplayname = $zrow["displayname"];
						}
						/* get old useravatarid you are taking the name from */
						$zresults = $wtwiframes->query("
							select useravatarid 
							from ".wtw_tableprefix."useravatars
							where displayname='".$zavatardisplayname."'
								and userid='".$wtwiframes->userid."'
							limit 1;");
						foreach ($zresults as $zrow) {
							$zolduseravatarid = $zrow["useravatarid"];
						}
						/* set new display name */
						$wtwiframes->query("
							update ".wtw_tableprefix."useravatars
							set displayname='".$zavatardisplayname."',
								updatedate=now(),
								updateuserid='".$wtwiframes->userid."',
								deleteddate=null,
								deleteduserid='',
								deleted=0
							where useravatarid='".$zuseravatarid."'
								and userid='".$wtwiframes->userid."';");
						/* set old displayname on your other avatar */
						$wtwiframes->query("
							update ".wtw_tableprefix."useravatars
							set displayname='".$zolddisplayname."',
								updatedate=now(),
								updateuserid='".$wtwiframes->userid."',
								deleteddate=null,
								deleteduserid='',
								deleted=0
							where useravatarid='".$zolduseravatarid."'
								and userid='".$wtwiframes->userid."';");
					}
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwavatars.php-saveAvatarDisplayName=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function saveAvatarAnimation($zuseravataranimationid,$zuseravatarid,$zavataranimationid,$zavataranimationname,$zspeedratio) {
		global $wtwiframes;
		try {
			$wtwiframes->getSessionUserID();
			$zfounduseravataranimationid = "";
			$zresults = $wtwiframes->query("
					select useravataranimationid 
					from ".wtw_tableprefix."useravataranimations 
					where avataranimationname='".$zavataranimationname."' 
						and (not avataranimationname='') 
						and useravatarid='".$zuseravatarid."' 
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
				$wtwiframes->query("
					update ".wtw_tableprefix."useravataranimations
					set avataranimationid='".$zavataranimationid."',
						 useravatarid='".$zuseravatarid."',
						 avataranimationname='".$zavataranimationname."',
						 speedratio=".$wtwiframes->checkNumber($zspeedratio,1).",
						 updatedate=now(),
						 updateuserid='".$wtwiframes->userid."',
						 deleteddate=null,
						 deleteduserid='',
						 deleted=0
					where useravataranimationid='".$zfounduseravataranimationid."';");
			} else {
				$zfounduseravataranimationid = $wtwiframes->getRandomString(16,1);
				$wtwiframes->query("
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
						 '".$zuseravatarid."',
						 '".$zavataranimationname."',
						 ".$wtwiframes->checkNumber($zspeedratio,1).",
						 now(),
						 '".$wtwiframes->userid."',
						 now(),
						 '".$wtwiframes->userid."');");
			}
			$zuseravataranimationid = $zfounduseravataranimationid;
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwavatars.php-saveAvatarAnimation=".$e->getMessage());
		}
		return $zuseravataranimationid;
	}
	
	public function getAvatarAnimationsAll($zuseravatarid) {
		global $wtwiframes;
		$zresponse = null;
		$animations = array();
		try {
			$zresults = $wtwiframes->query("
				select a.*,
					u.useravataranimationid,
					u.useravatarid,
					u.speedratio as myspeedratio,
					u.walkspeed as mywalkspeed
				from ".wtw_tableprefix."avataranimations a 
					left join (select * 
						from ".wtw_tableprefix."useravataranimations 
						where useravatarid='".$zuseravatarid."' 
							and deleted=0) u
					on a.avataranimationid = u.avataranimationid
				where (a.userid='".$wtwiframes->userid."' 
					or a.userid='')
					and (('".$wtwiframes->userid."'='' and requireslogin=0)
						or not '".$wtwiframes->userid."'='')
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
					'mywalkspeed'=> $zrow["mywalkspeed"]
				);
				$i += 1;
			}
			$zresponse = json_encode($animations);
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwavatars.php-getAvatarAnimationsAll=".$e->getMessage());
		}
		return $zresponse;
	}
	
	public function deleteAvatarAnimation($zuseravataranimationid,$zuseravatarid,$zavataranimationid) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			$zfounduseravataranimationid = "";
			$zresults = $wtwiframes->query("
				select useravataranimationid 
				from ".wtw_tableprefix."useravataranimations 
				where useravataranimationid='".$zuseravataranimationid."' 
					and useravatarid='".$zuseravatarid."' 
					and not useravatarid='' 
				limit 1;");
			foreach ($zresults as $zrow) {
				$zfounduseravataranimationid = $zrow["useravataranimationid"];
			}
			if (!empty($zfounduseravataranimationid) && isset($zfounduseravataranimationid)) {
				$wtwiframes->query("
					update ".wtw_tableprefix."useravataranimations
					set avataranimationid='".$zavataranimationid."',
						 useravatarid='".$zuseravatarid."',
						 deleteddate=now(),
						 deleteduserid='".$wtwiframes->userid."',
						 deleted=1
					where useravataranimationid='".$zfounduseravataranimationid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwavatars.php-deleteAvatarAnimation=".$e->getMessage());
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
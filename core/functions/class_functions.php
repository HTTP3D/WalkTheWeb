<?php
class wtwavatars_functions {
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {
		global $wtwplugins;
		try {
			$this->initClass();
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_functions.php-construct=".$e->getMessage());
		}
	}	
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	public function initClass() {
		global $wtwplugins;
		try {
			
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_functions.php-initClass=".$e->getMessage());
		}
	}
	
	public function saveAvatar($zuseravatarid, $zavatarid, $zdisplayname, $zobjectfolder, $zobjectfile, $zgender, $zscalingx, $zscalingy, $zscalingz) {
		global $wtwplugins;
		$zuseravatarid = '';
		try {
			$zfounduseravatarid = '';
			if (!empty($zuseravatarid) && isset($zuseravatarid)) {
				$wtwplugins->query("
					select * 
					from ".wtw_tableprefix."useravatars
					where useravatarid='".$zuseravatarid."'
						and userid='".$wtwplugins->userid."';");
				foreach ($zresults as $zrow) {
					$zfounduseravatarid = $zrow["useravatarid"];
				}
			}

$wtwplugins->serror("zuseravatarid=".$zuseravatarid);
$wtwplugins->serror("zavatarid=".$zavatarid);
$wtwplugins->serror("zdisplayname=".$zdisplayname);
$wtwplugins->serror("zobjectfolder=".$zobjectfolder);
$wtwplugins->serror("zobjectfile=".$zobjectfile);
$wtwplugins->serror("zgender=".$zgender);
$wtwplugins->serror("zscalingx=".$zscalingx);
$wtwplugins->serror("zscalingy=".$zscalingy);
$wtwplugins->serror("zscalingz=".$zscalingz);
$wtwplugins->serror("userid=".$wtwplugins->userid);
$wtwplugins->serror("userip=".$wtwplugins->userip);

			if (empty($zfounduseravatarid) && !isset($zfounduseravatarid)) {
				if (empty($zuseravatarid) && !isset($zuseravatarid)) {
					$zuseravatarid = $wtwplugins->getRandomString(16,1);
				}
$wtwplugins->serror("zuseravatarid=".$zuseravatarid);
				$wtwplugins->query("
					insert into ".wtw_tableprefix."useravatars
					   (useravatarid,
					    userid,
					    avatarid,
					    displayname,
						objectfolder,
						objectfile,
						gender,
						scalingx,
						scalingy,
						scalingz,
						lastdate,
						lastip,
						createdate,
						createuserid,
						updatedate,
						updateuserid)
					values
					   ('".$zuseravatarid."',
					    '".$wtwplugins->userid."',
					    '".$zavatarid."',
					    '".$zdisplayname."',
						'".$zobjectfolder."',
						'".$zobjectfile."',
						'".$zgender."',
						".$zscalingx.",
						".$zscalingy.",
						".$zscalingz.",
						now(),
						'".$wtwplugins->userip."',
						now(),
						'".$wtwplugins->userid."',
						now(),
						'".$wtwplugins->userid."');");
			} else {
				$wtwplugins->query("
					update ".wtw_tableprefix."useravatars
					set avatarid='".$zavatarid."',
					    displayname='".$zdisplayname."',
						objectfolder='".$zobjectfolder."',
						objectfile='".$zobjectfile."',
						gender='".$zgender."',
						scalingx=".$wtwplugins->getNumber($zscalingx,.07).",
						scalingy=".$wtwplugins->getNumber($zscalingy,.07).",
						scalingz=".$wtwplugins->getNumber($zscalingz,.07).",
						lastdate=now(),
						lastip='".$wtwplugins->userip."',
						updatedate=now(),
						updateuserid='".$wtwplugins->userid."'					
					where useravatarid='".$zfounduseravatarid."';");
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_functions.php-saveAvatar=".$e->getMessage());
		}
		return $zuseravatarid;
	}

	public function saveAvatarColor($zuseravatarid, $zinstanceid, $zavatarpart, $zemissivecolorr, $zemissivecolorg, $zemissivecolorb) {
		global $wtwplugins;
		$zsuccess = false;
		try {
			$zfoundavatarpartid = '';
			if (!empty($zavatarpart) && isset($zavatarpart)) {
				$wtwplugins->query("
					select * 
					from ".wtw_tableprefix."useravatarcolors
					where avatarpart='".$zavatarpart."'
						and useravatarid='".$zuseravatarid."'
						and userid='".$wtwplugins->userid."';");
				foreach ($zresults as $zrow) {
					$zfoundavatarpartid = $zrow["avatarpartid"];
				}
				if (empty($zfoundavatarpartid) && !isset($zfoundavatarpartid)) {
					$zfoundavatarpartid = $wtwplugins->getRandomString(16,1);
					$wtwplugins->query("
						insert into ".wtw_tableprefix."useravatarcolors
						   (avatarpartid,
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
						   ('".$zfoundavatarpartid."',
							'".$wtwplugins->userid."',
							'".$zinstanceid."',
							'".$zavatarpart."',
							".$wtwplugins->getNumber($zemissivecolorr,1).",
							".$wtwplugins->getNumber($zemissivecolorg,1).",
							".$wtwplugins->getNumber($zemissivecolorb,1).",
							now(),
							'".$wtwplugins->userid."',
							now(),
							'".$wtwplugins->userid."');");
				} else {
					$wtwplugins->query("
						update ".wtw_tableprefix."useravatarcolors
						set 
							instanceid='".$zinstanceid."',
							emissivecolorr=".$wtwplugins->getNumber($zemissivecolorr,1).",
							emissivecolorg=".$wtwplugins->getNumber($zemissivecolorg,1).",
							emissivecolorb=".$wtwplugins->getNumber($zemissivecolorb,1).",
							updatedate=now(),
							updateuserid='".$wtwplugins->userid."'					
						where avatarpartid='".$zfoundavatarpartid."';");
				}
			}
			$zsuccess = true;
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_functions.php-saveAvatarColor=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function saveAvatarAnimation($zuseravatarid, $zinstanceid, $zavataranimationid, $zavataranimationevent) {
		global $wtwplugins;
		$zsuccess = false;
		try {
			$zfounduseravataranimationid = '';
			if (!empty($zavataranimationevent) && isset($zavataranimationevent)) {
				$wtwplugins->query("
					select * 
					from ".wtw_tableprefix."useravataranimations
					where avataranimationevent='".$zavataranimationevent."'
						and useravatarid='".$zuseravatarid."';");
				foreach ($zresults as $zrow) {
					$zfounduseravataranimationid = $zrow["useravataranimationid"];
				}
				if (empty($zfounduseravataranimationid) && !isset($zfounduseravataranimationid)) {
					$zfounduseravataranimationid = $wtwplugins->getRandomString(16,1);
					$wtwplugins->query("
						insert into ".wtw_tableprefix."useravataranimations
						   (useravataranimationid,
							avataranimationid,
							useravatarid,
							avataranimationevent,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$zfounduseravataranimationid."',
							'".$zavataranimationid."',
							'".$zuseravatarid."',
							'".$zavataranimationevent."',
							now(),
							'".$wtwplugins->userid."',
							now(),
							'".$wtwplugins->userid."');");
				} else {
					$wtwplugins->query("
						update ".wtw_tableprefix."useravataranimations
						set 
							avataranimationid='".$zavataranimationid."',
							updatedate=now(),
							updateuserid='".$wtwplugins->userid."'					
						where useravataranimationid='".$zfounduseravataranimationid."';");
				}
			}
			$zsuccess = true;
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_functions.php-saveAvatarAnimation=".$e->getMessage());
		}
		return $zsuccess;
	}

}

	function wtwavatars_functions() {
		return wtwavatars_functions::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwavatars_functions'] = wtwavatars_functions();

?>
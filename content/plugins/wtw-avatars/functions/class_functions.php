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
	
	public function saveAvatar($zuseravatarid, $zinstanceid, $zavatarid, $zdisplayname, $zavatardescription, $zobjectfolder, $zobjectfile, $zgender, $zscalingx, $zscalingy, $zscalingz) {
		global $wtwplugins;
		try {
			$zfounduseravatarid = '';
			if ($wtwplugins->hasValue($zuseravatarid)) {
				$zresults = $wtwplugins->query("
					select * 
					from ".wtw_tableprefix."useravatars
					where useravatarid='".$zuseravatarid."'
						and userid='".$wtwplugins->userid."';");
				foreach ($zresults as $zrow) {
					$zfounduseravatarid = $zrow["useravatarid"];
				}
			}
			if (!isset($zfounduseravatarid) || empty($zfounduseravatarid)) {
				$zuseravatarid = $wtwplugins->getRandomString(16,1);
				$wtwplugins->query("
					insert into ".wtw_tableprefix."useravatars
					   (useravatarid,
					    instanceid,
					    userid,
					    userip,
					    avatarid,
					    displayname,
						avatardescription,
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
					    '".$zinstanceid."',
					    '".$wtwplugins->userid."',
					    '".$wtwplugins->userip."',
					    '".$zavatarid."',
					    '".$zdisplayname."',
					    '".$zavatardescription."',
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
						instanceid='".$zinstanceid."',
					    displayname='".$zdisplayname."',
					    avatardescription='".$zavatardescription."',
						objectfolder='".$zobjectfolder."',
						objectfile='".$zobjectfile."',
						gender='".$zgender."',
						scalingx=".$wtwplugins->checkNumber($zscalingx,.07).",
						scalingy=".$wtwplugins->checkNumber($zscalingy,.07).",
						scalingz=".$wtwplugins->checkNumber($zscalingz,.07).",
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

	public function saveAvatarColor($zuseravatarid, $zinstanceid, $zavatarpart, $zdiffusecolor, $zspecularcolor, $zemissivecolor, $zambientcolor) {
		global $wtwplugins;
		$zfoundavatarpartid = '';
		try {
			if ($wtwplugins->hasValue($zuseravatarid) && $wtwplugins->hasValue($zavatarpart)) {
				$zresults = $wtwplugins->query("
					select * 
					from ".wtw_tableprefix."useravatarcolors
					where avatarpart='".$zavatarpart."'
						and useravatarid='".$zuseravatarid."'
						and userid='".$wtwplugins->userid."';");
				foreach ($zresults as $zrow) {
					$zfoundavatarpartid = $zrow["avatarpartid"];
				}
				if (!isset($zfoundavatarpartid) || empty($zfoundavatarpartid)) {
					$zfoundavatarpartid = $wtwplugins->getRandomString(16,1);
					$wtwplugins->query("
						insert into ".wtw_tableprefix."useravatarcolors
						   (avatarpartid,
							useravatarid,
							userid,
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
						   ('".$zfoundavatarpartid."',
							'".$zuseravatarid."',
							'".$wtwplugins->userid."',
							'".$zinstanceid."',
							'".$zavatarpart."',
							'".$zdiffusecolor."',
							'".$zspecularcolor."',
							'".$zemissivecolor."',
							'".$zambientcolor."',
							now(),
							'".$wtwplugins->userid."',
							now(),
							'".$wtwplugins->userid."');");
				} else {
					$wtwplugins->query("
						update ".wtw_tableprefix."useravatarcolors
						set 
							instanceid='".$zinstanceid."',
							diffusecolor='".$zdiffusecolor."',
							specularcolor='".$zspecularcolor."',
							emissivecolor='".$zemissivecolor."',
							ambientcolor='".$zambientcolor."',
							updatedate=now(),
							updateuserid='".$wtwplugins->userid."'					
						where avatarpartid='".$zfoundavatarpartid."';");
				}
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_functions.php-saveAvatarColor=".$e->getMessage());
		}
		return $zfoundavatarpartid;
	}

	public function saveAvatarAnimation($zuseravatarid, $zinstanceid, $zavataranimationid, $zanimationevent) {
		global $wtwplugins;
		$zfounduseravataranimationid = '';
		try {
			if ($wtwplugins->hasValue($zanimationevent)) {
				$zresults = $wtwplugins->query("
					select * 
					from ".wtw_tableprefix."useravataranimations
					where animationevent='".$zanimationevent."'
						and useravatarid='".$zuseravatarid."';");
				foreach ($zresults as $zrow) {
					$zfounduseravataranimationid = $zrow["useravataranimationid"];
				}
				if (!isset($zfounduseravataranimationid) || empty($zfounduseravataranimationid)) {
					$zfounduseravataranimationid = $wtwplugins->getRandomString(16,1);
					$wtwplugins->query("
						insert into ".wtw_tableprefix."useravataranimations
						   (useravataranimationid,
							avataranimationid,
							useravatarid,
							animationevent,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$zfounduseravataranimationid."',
							'".$zavataranimationid."',
							'".$zuseravatarid."',
							'".$zanimationevent."',
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
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_functions.php-saveAvatarAnimation=".$e->getMessage());
		}
		return $zfounduseravataranimationid;
	}

}

	function wtwavatars_functions() {
		return wtwavatars_functions::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwavatars_functions'] = wtwavatars_functions();

?>
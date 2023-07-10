<?php
class wtw_3dinternet_templates {
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
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_templates.php-construct=".$e->getMessage());
		}
	}	
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	public function defineConstants() {
		global $wtwplugins;
		try {
			if (!defined('WTW_3DINTERNET_FILE')) {
				$this->define('WTW_3DINTERNET_PREFIX', wtw_tableprefix."3dinternet_");
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_templates.php-defineConstants=".$e->getMessage());
		}
	}

	public function initClass() {
		global $wtwplugins;
		try {
			
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_templates.php-initClass=".$e->getMessage());
		}
	}
	
	public function saveCommunityTemplate($zcommunityid, $ztemplatename, $zdescription, $ztags, $zversion, $zversiondesc) {
		/* save community as a template to the media library */
		global $wtwhandlers;
		$zresponse = array(
			'success'=>'',
			'serror'=>'',
			'userid'=>'',
			'sharehash'=>''
		);
		try {
			if ($wtwhandlers->checkAdminAccess($zcommunityid, "", "")) {
				$zuserid = "";
				$zfoundcommunityid = "";
				if ($wtwhandlers->hasValue($_SESSION["wtw_userid"])) {
					$zuserid = $_SESSION["wtw_userid"];
				}
				$ztemplatename = $wtwhandlers->escapeHTML($ztemplatename);
				$zdescription = $wtwhandlers->escapeHTML($zdescription);
				$ztags = $wtwhandlers->escapeHTML($ztags);
				$zversiondesc = $wtwhandlers->escapeHTML($zversiondesc);
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
					select communityid 
					from ".wtw_tableprefix."communities 
					where communityid='".$zcommunityid."' limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundcommunityid = $zrow["communityid"];
				}
				if ($wtwhandlers->hasValue($zfoundcommunityid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."communities
						set templatename='".$ztemplatename."',
						    tags='".$ztags."',
							description='".$zdescription."',
							sharehash='".$zsharehash."',
							shareuserid='".$zuserid."',
							version='".$zversion."',
							versionorder=".$zversionorder.",
							versiondesc='".$zversiondesc."',
							updatedate=now(),
							updateuserid='".$zuserid."'
						where communityid='".$zcommunityid."'
						limit 1;");
				}
				/* allow child items to be downloaded with 3D Community (3D Buildings and 3D Things) */
				$zresults = $wtwhandlers->query("
					select * 
					from ".wtw_tableprefix."connectinggrids 
					where parentwebid='".$zcommunityid."'
						and deleted=0;");
				foreach ($zresults as $zrow) {
					$zwebtypes = "";
					switch ($zrow["childwebtype"]) {
						case "community":
							$zwebtypes = "communities";
							break;
						case "building":
							$zwebtypes = "buildings";
							break;
						case "thing":
							$zwebtypes = "things";
							break;
					}
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtypes."
						set sharehash='".$zsharehash."',
							shareuserid='".$zuserid."',
							sharetemplatedate=now(),
							updatedate=now(),
							updateuserid='".$zuserid."'
						where ".$zrow["childwebtype"]."id='".$zrow["childwebid"]."'
						limit 1;");
					
					/* allow child items to be downloaded with (3D Things in 3D Buildings) */
					$zresults2 = $wtwhandlers->query("
						select * 
						from ".wtw_tableprefix."connectinggrids 
						where parentwebid='".$zrow["childwebid"]."'
							and deleted=0;");
					foreach ($zresults2 as $zrow2) {
						$zwebtypes2 = "";
						switch ($zrow2["childwebtype"]) {
							case "community":
								$zwebtypes2 = "communities";
								break;
							case "building":
								$zwebtypes2 = "buildings";
								break;
							case "thing":
								$zwebtypes2 = "things";
								break;
						}
						$wtwhandlers->query("
							update ".wtw_tableprefix.$zwebtypes2."
							set sharehash='".$zsharehash."',
								shareuserid='".$zuserid."',
								sharetemplatedate=now(),
								updatedate=now(),
								updateuserid='".$zuserid."'
							where ".$zrow2["childwebtype"]."id='".$zrow2["childwebid"]."'
							limit 1;");
					}
				}
			} 
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_templates.php-saveCommunityTemplate=".$e->getMessage());
		}
		return $zresponse;
	}		

	public function shareCommunityTemplate($zcommunityid, $zsharehash) {
		/* share community as a template to the media library */
		global $wtwhandlers;
		$zresponse = array(
			'success'=>'',
			'serror'=>'',
			'userid'=>'',
			'sharehash'=>''
		);
		try {
			if ($wtwhandlers->checkAdminAccess($zcommunityid, "", "")) {
				$zuserid = "";
				$zfoundcommunityid = "";
				if ($wtwhandlers->hasValue($_SESSION["wtw_userid"])) {
					$zuserid = $_SESSION["wtw_userid"];
				}
				$zfromurl = "https://3dnet.walktheweb.com/connect/share.php?communityid=".$zcommunityid."&userid=".$zuserid."&sharehash=".$zsharehash."&domainurl=".$wtwhandlers->domainurl;

				$zresponse = $wtwhandlers->openFilefromURL($zfromurl);
				$zresponse = json_decode($zresponse, true);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_templates.php-shareCommunityTemplate=".$e->getMessage());
		}
		return $zresponse;
	}

	public function saveBuildingTemplate($zbuildingid, $ztemplatename, $zdescription, $ztags, $zversion, $zversiondesc) {
		/* save building as a template to the media library */
		global $wtwhandlers;
		$zresponse = array(
			'success'=>'',
			'serror'=>'',
			'userid'=>'',
			'sharehash'=>''
		);
		try {
			if ($wtwhandlers->checkAdminAccess("", $zbuildingid, "")) {
				$zuserid = "";
				$zfoundbuildingid = "";
				if ($wtwhandlers->hasValue($_SESSION["wtw_userid"])) {
					$zuserid = $_SESSION["wtw_userid"];
				}
				$ztemplatename = $wtwhandlers->escapeHTML($ztemplatename);
				$zdescription = $wtwhandlers->escapeHTML($zdescription);
				$ztags = $wtwhandlers->escapeHTML($ztags);
				$zversiondesc = $wtwhandlers->escapeHTML($zversiondesc);
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
					select buildingid 
					from ".wtw_tableprefix."buildings 
					where buildingid='".$zbuildingid."' limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundbuildingid = $zrow["buildingid"];
				}
				if ($wtwhandlers->hasValue($zfoundbuildingid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."buildings
						set templatename='".$ztemplatename."',
						    tags='".$ztags."',
							description='".$zdescription."',
							sharehash='".$zsharehash."',
							version='".$zversion."',
							versionorder=".$zversionorder.",
							versiondesc='".$zversiondesc."',
							shareuserid='".$zuserid."',
							sharetemplatedate=now(),
							updatedate=now(),
							updateuserid='".$zuserid."'
						where buildingid='".$zbuildingid."'
						limit 1;");
				}
				
				/* allow child items to be downloaded with 3D Building */
				$zresults = $wtwhandlers->query("
					select * 
					from ".wtw_tableprefix."connectinggrids 
					where parentwebid='".$zbuildingid."'
						and deleted=0;");
				foreach ($zresults as $zrow) {
					$zwebtypes = "";
					switch ($zrow["childwebtype"]) {
						case "community":
							$zwebtypes = "communities";
							break;
						case "building":
							$zwebtypes = "buildings";
							break;
						case "thing":
							$zwebtypes = "things";
							break;
					}
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtypes."
						set sharehash='".$zsharehash."',
							shareuserid='".$zuserid."',
							sharetemplatedate=now(),
							updatedate=now(),
							updateuserid='".$zuserid."'
						where ".$zrow["childwebtype"]."id='".$zrow["childwebid"]."'
						limit 1;");
				}
			} 
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_templates.php-saveBuildingTemplate=".$e->getMessage());
		}
		return $zresponse;
	}	

	public function shareBuildingTemplate($zbuildingid, $zsharehash) {
		/* share building as a template to the media library */
		global $wtwhandlers;
		$zresponse = array(
			'success'=>'',
			'serror'=>'',
			'userid'=>'',
			'sharehash'=>''
		);
		try {
			if ($wtwhandlers->checkAdminAccess("", $zbuildingid, "")) {
				$zuserid = "";
				$zfoundbuildingid = "";
				if ($wtwhandlers->hasValue($_SESSION["wtw_userid"])) {
					$zuserid = $_SESSION["wtw_userid"];
				}
				$zfromurl = "https://3dnet.walktheweb.com/connect/share.php?buildingid=".$zbuildingid."&userid=".$zuserid."&sharehash=".$zsharehash."&domainurl=".$wtwhandlers->domainurl;
				$zresponse = $wtwhandlers->openFilefromURL($zfromurl);
				$zresponse = json_decode($zresponse, true);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_templates.php-shareBuildingTemplate=".$e->getMessage());
		}
		return $zresponse;
	}	

	public function saveThingTemplate($zthingid, $ztemplatename, $zdescription, $ztags, $zversion, $zversiondesc) {
		/* save thing as a template to the media library */
		global $wtwhandlers;
		$zresponse = array(
			'success'=>'',
			'serror'=>'',
			'userid'=>'',
			'sharehash'=>''
		);
		try {
			if ($wtwhandlers->checkAdminAccess("", "", $zthingid)) {
				$zuserid = "";
				$zfoundthingid = "";
				if ($wtwhandlers->hasValue($_SESSION["wtw_userid"])) {
					$zuserid = $_SESSION["wtw_userid"];
				}
				$ztemplatename = $wtwhandlers->escapeHTML($ztemplatename);
				$zdescription = $wtwhandlers->escapeHTML($zdescription);
				$ztags = $wtwhandlers->escapeHTML($ztags);
				$zversiondesc = $wtwhandlers->escapeHTML($zversiondesc);
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
					select thingid 
					from ".wtw_tableprefix."things 
					where thingid='".$zthingid."' limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundthingid = $zrow["thingid"];
				}
				if ($wtwhandlers->hasValue($zfoundthingid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."things
						set templatename='".$ztemplatename."',
						    tags='".$ztags."',
							description='".$zdescription."',
							sharehash='".$zsharehash."',
							shareuserid='".$zuserid."',
							version='".$zversion."',
							versionorder=".$zversionorder.",
							versiondesc='".$zversiondesc."',
							updatedate=now(),
							updateuserid='".$zuserid."'
						where thingid='".$zthingid."'
						limit 1;");
				}
			} 
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_templates.php-saveThingTemplate=".$e->getMessage());
		}
		return $zresponse;
	}	

	public function shareThingTemplate($zthingid, $zsharehash) {
		/* share thing as a template to the media library */
		global $wtwhandlers;
		$zresponse = array(
			'success'=>'',
			'serror'=>'',
			'userid'=>'',
			'sharehash'=>''
		);
		try {
			if ($wtwhandlers->checkAdminAccess("", "", $zthingid)) {
				$zuserid = "";
				$zfoundthingid = "";
				if ($wtwhandlers->hasValue($_SESSION["wtw_userid"])) {
					$zuserid = $_SESSION["wtw_userid"];
				}
				$zfromurl = "https://3dnet.walktheweb.com/connect/share.php?thingid=".$zthingid."&userid=".$zuserid."&sharehash=".$zsharehash."&domainurl=".$wtwhandlers->domainurl;

				$zresponse = $wtwhandlers->openFilefromURL($zfromurl);
				$zresponse = json_decode($zresponse, true);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_templates.php-shareThingTemplate=".$e->getMessage());
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
				$zfoundavatarid = '';
				$zhostuserid = '';
				if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
					$zhostuserid = $wtwhandlers->userid;
				}
				if ($wtwhandlers->hasValue($_SESSION["wtw_userid"])) {
					$zuserid = $_SESSION["wtw_userid"];
				}
					
				$ztemplatename = $wtwhandlers->escapeHTML($ztemplatename);
				$zdescription = $wtwhandlers->escapeHTML($zdescription);
				$ztags = $wtwhandlers->escapeHTML($ztags);
				$zversiondesc = $wtwhandlers->escapeHTML($zversiondesc);
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
				if ($wtwhandlers->hasValue($zfoundavatarid)) {
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
							and (hostuserid='".$zhostuserid."'
								or createuserid='".$wtwhandlers->userid."')
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
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_templates.php-saveAvatarTemplate=".$e->getMessage());
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
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
				$zuserid = "";
				$zfoundavatarid = "";
				if ($wtwhandlers->hasValue($_SESSION["wtw_userid"])) {
					$zuserid = $_SESSION["wtw_userid"];
				}
				$zfromurl = "https://3dnet.walktheweb.com/connect/shareavatar.php?avatarid=".$zavatarid."&userid=".$zuserid."&sharehash=".$zsharehash."&domainurl=".$wtwhandlers->domainurl;

				$zresponse = $wtwhandlers->openFilefromURL($zfromurl);
				$zresponse = json_decode($zresponse, true);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("plugins:wtw-3dinternet:functions-class_templates.php-shareAvatarTemplate=".$e->getMessage());
		}
		return $zresponse;
	}
	
}

	function wtw_3dinternet_templates() {
		return wtw_3dinternet_templates::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtw_3dinternet_templates'] = wtw_3dinternet_templates();

?>
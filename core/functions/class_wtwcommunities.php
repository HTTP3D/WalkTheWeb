<?php
class wtwcommunities {
	/* wtwcommunities class for admin database functions for 3d communities */
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
	
	public function communityExist($zcommunityid) {
		/* check if a community id exists in the database */
		global $wtwhandlers;
		$found = false;
		try {
			$zresults = array();
			$zresults = $wtwhandlers->query("
				select communityid 
				from ".wtw_tableprefix."communities 
				where communityid='".$zcommunityid."' limit 1");
			foreach ($zresults as $zrow) {
				$found = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-communityExist=".$e->getMessage());
		}
		return $found;
	}

	public function saveCommunity($zcommunityid, $zpastcommunityid, $zversionid, $zversion, $zversiondesc, $zcommunityname, $zcommunitydescription, $zanalyticsid, $zgroundpositiony, $zwaterpositiony, $zwaterbumpid, $zwaterbumpheight, $zwatersubdivisions, $zwindforce, $zwinddirectionx, $zwinddirectiony, $zwinddirectionz, $zwaterwaveheight, $zwaterwavelength, $zwatercolorrefraction, $zwatercolorreflection, $zwatercolorblendfactor, $zwatercolorblendfactor2, $zwateralpha, $zalttag) {
		/* save community settings to the database */
		global $wtwhandlers;
		$copycommunityid = "";
		try {
			set_time_limit(0);
			if (!isset($zpastcommunityid) || empty($zpastcommunityid) || $wtwhandlers->checkUpdateAccess($zpastcommunityid, "", "") == false) {
				/* denies copy function if you do not have access to community to copy */
				$zpastcommunityid = "";
			}
			$zresults = array();
			if (empty($zcommunityid)) {
				/* create new communityid */
				$zcommunityid = $wtwhandlers->getRandomString(16,1);
				$zhostuserid = '';
				if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
					$zhostuserid = $wtwhandlers->userid;
				}
				if (!isset($zpastcommunityid) || empty($zpastcommunityid)) {
					/* create new community (without access to copy community or if not copying existing community, this creates new community) */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."communities
							(communityid,
							 pastcommunityid,
							 versionid,
							 version,
							 versionorder,
							 versiondesc,
							 communityname,
							 communitydescription,
							 analyticsid,
							 hostuserid,
							 userid,
							 groundpositiony,
							 waterpositiony,
							 alttag,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zcommunityid."',
							 '".$zpastcommunityid."',
							 '".$zcommunityid."',
							 '1.0.0',
							 1000000,
							 'Initial Version',
							 '".$wtwhandlers->escapeHTML($zcommunityname)."',
							 '".$wtwhandlers->escapeHTML($zcommunitydescription)."',
							 '".$zanalyticsid."',
							 '".$zhostuserid."',
							 '".$wtwhandlers->userid."',
							 ".$wtwhandlers->checkNumber($zgroundpositiony,0).",
							 ".$wtwhandlers->checkNumber($zwaterpositiony,-1).",
							 '".$wtwhandlers->escapeHTML($zalttag)."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				} else {
					/* with access to copy building, this gets all values */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."communities
							(communityid,
							 pastcommunityid,
							 versionid,
							 version,
							 versionorder,
							 versiondesc,
							 communityname,
							 communitydescription,
							 analyticsid,
							 hostuserid,
							 userid,
							 positionx,
							 positiony,
							 positionz,
							 scalingx,
							 scalingy,
							 scalingz,
							 rotationx,
							 rotationy,
							 rotationz,
							 gravity,
							 groundpositiony,
							 waterpositiony,
							 waterbumpheight,
							 watersubdivisions,
							 windforce,
							 winddirectionx,
							 winddirectiony,
							 winddirectionz,
							 waterwaveheight,
							 waterwavelength,
							 watercolorrefraction,
							 watercolorreflection,
							 watercolorblendfactor,
							 watercolorblendfactor2,
							 wateralpha,
							 textureid,
							 waterbumpid,
							 skydomeid,
							 sceneambientcolor,
							 sceneclearcolor,
							 sceneuseclonedmeshmap,
							 sceneblockmaterialdirtymechanism,
							 scenefogenabled,
							 scenefogmode,
							 scenefogdensity,
							 scenefogstart,
							 scenefogend,
							 scenefogcolor,
							 sundirectionalintensity,
							 sundiffusecolor,
							 sunspecularcolor,
							 sungroundcolor,
							 sundirectionx,
							 sundirectiony,
							 sundirectionz,
							 backlightintensity,
							 backlightdirectionx,
							 backlightdirectiony,
							 backlightdirectionz,
							 backlightdiffusecolor,
							 backlightspecularcolor,
							 skytype,
							 skysize,
							 skyboxfolder,
							 skyboxfile,
							 skyboximageleft,
							 skyboximageup,
							 skyboximagefront,
							 skyboximageright,
							 skyboximagedown,
							 skyboximageback,
							 skypositionoffsetx,
							 skypositionoffsety,
							 skypositionoffsetz,
							 skyboxmicrosurface,
							 skyboxpbr,
							 skyboxasenvironmenttexture,
							 skyboxblur,
							 skyboxdiffusecolor,
							 skyboxspecularcolor,
							 skyboxambientcolor,
							 skyboxemissivecolor,
							 skyinclination,
							 skyluminance,
							 skyazimuth,
							 skyrayleigh,
							 skyturbidity,
							 skymiedirectionalg,
							 skymiecoefficient,
							 templatename,
							 description,
							 tags,
							 snapshotid,
							 shareuserid,
							 sharetemplatedate,
							 alttag,
							 buildingpositionx,
							 buildingpositiony,
							 buildingpositionz,
							 buildingscalingx,
							 buildingscalingy,
							 buildingscalingz,
							 buildingrotationx,
							 buildingrotationy,
							 buildingrotationz,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						select '".$zcommunityid."' as communityid,
							 '".$zpastcommunityid."' as pastcommunityid,
							 versionid,
							 version,
							 versionorder,
							 versiondesc,
							 '".$wtwhandlers->escapeHTML($zcommunityname)."' as communityname,
							 '".$wtwhandlers->escapeHTML($zcommunitydescription)."' as communitydescription,
							 analyticsid,
							 '".$zhostuserid."' as hostuserid,
							 '".$wtwhandlers->userid."' as userid,
							 positionx,
							 positiony,
							 positionz,
							 scalingx,
							 scalingy,
							 scalingz,
							 rotationx,
							 rotationy,
							 rotationz,
							 gravity,
							 groundpositiony,
							 waterpositiony,
							 waterbumpheight,
							 watersubdivisions,
							 windforce,
							 winddirectionx,
							 winddirectiony,
							 winddirectionz,
							 waterwaveheight,
							 waterwavelength,
							 watercolorrefraction,
							 watercolorreflection,
							 watercolorblendfactor,
							 watercolorblendfactor2,
							 wateralpha,
							 textureid,
							 waterbumpid,
							 skydomeid,
							 sceneambientcolor,
							 sceneclearcolor,
							 sceneuseclonedmeshmap,
							 sceneblockmaterialdirtymechanism,
							 scenefogenabled,
							 scenefogmode,
							 scenefogdensity,
							 scenefogstart,
							 scenefogend,
							 scenefogcolor,
							 sundirectionalintensity,
							 sundiffusecolor,
							 sunspecularcolor,
							 sungroundcolor,
							 sundirectionx,
							 sundirectiony,
							 sundirectionz,
							 backlightintensity,
							 backlightdirectionx,
							 backlightdirectiony,
							 backlightdirectionz,
							 backlightdiffusecolor,
							 backlightspecularcolor,
							 skytype,
							 skysize,
							 skyboxfolder,
							 skyboxfile,
							 skyboximageleft,
							 skyboximageup,
							 skyboximagefront,
							 skyboximageright,
							 skyboximagedown,
							 skyboximageback,
							 skypositionoffsetx,
							 skypositionoffsety,
							 skypositionoffsetz,
							 skyboxmicrosurface,
							 skyboxpbr,
							 skyboxasenvironmenttexture,
							 skyboxblur,
							 skyboxdiffusecolor,
							 skyboxspecularcolor,
							 skyboxambientcolor,
							 skyboxemissivecolor,
							 skyinclination,
							 skyluminance,
							 skyazimuth,
							 skyrayleigh,
							 skyturbidity,
							 skymiedirectionalg,
							 skymiecoefficient,
							 templatename,
							 description,
							 tags,
							 snapshotid,
							 shareuserid,
							 sharetemplatedate,
							 alttag,
							 buildingpositionx,
							 buildingpositiony,
							 buildingpositionz,
							 buildingscalingx,
							 buildingscalingy,
							 buildingscalingz,
							 buildingrotationx,
							 buildingrotationy,
							 buildingrotationz,
							 now() as createdate,
							 '".$wtwhandlers->userid."' as createuserid,
							 now() as updatedate,
							 '".$wtwhandlers->userid."' as updateuserid
						from ".wtw_tableprefix."communities
						where communityid='".$zpastcommunityid."';");
				}
				/* give user Admin access to their new community */ 
				$zuserauthorizationid = $wtwhandlers->getRandomString(16,1);
				$wtwhandlers->query("
					insert into ".wtw_tableprefix."userauthorizations
						(userauthorizationid,
						 userid,
						 communityid,
						 useraccess,
						 createdate,
						 createuserid,
						 updatedate,
						 updateuserid)
					values
						('".$zuserauthorizationid."',
						 '".$wtwhandlers->userid."',
						 '".$zcommunityid."',
						 'admin',
						 now(),
						 '".$wtwhandlers->userid."',
						 now(),
						 '".$wtwhandlers->userid."');");
			} else if ($wtwhandlers->checkUpdateAccess($zcommunityid, "", "")) {
				/* only updates if you have access */
				if (!isset($zwatercolorrefraction) || empty($zwatercolorrefraction)) {
					$zwatercolorrefraction = '#23749C';
				}
				if (!isset($zwatercolorreflection) || empty($zwatercolorreflection)) {
					$zwatercolorreflection = '#52BCF1';
				}
				$wtwhandlers->query("
					update ".wtw_tableprefix."communities
					set 
						version='".$wtwhandlers->escapeHTML($zversion)."',
						versiondesc='".$wtwhandlers->escapeHTML($zversiondesc)."',
						communityname='".$wtwhandlers->escapeHTML($zcommunityname)."',
						communitydescription='".$wtwhandlers->escapeHTML($zcommunitydescription)."',
						analyticsid='".$zanalyticsid."',
						groundpositiony=".$wtwhandlers->checkNumber($zgroundpositiony,0).",
						waterpositiony=".$wtwhandlers->checkNumber($zwaterpositiony,-1).",
						waterbumpid='".$zwaterbumpid."', 
						waterbumpheight=".$wtwhandlers->checkNumber($zwaterbumpheight,0.6).", 
						watersubdivisions=".$wtwhandlers->checkNumber($zwatersubdivisions,2).", 
						windforce=".$wtwhandlers->checkNumber($zwindforce,-10).", 
						winddirectionx=".$wtwhandlers->checkNumber($zwinddirectionx,1).", 
						winddirectiony=".$wtwhandlers->checkNumber($zwinddirectiony,0).", 
						winddirectionz=".$wtwhandlers->checkNumber($zwinddirectionz,1).", 
						waterwaveheight=".$wtwhandlers->checkNumber($zwaterwaveheight,0.2).", 
						waterwavelength=".$wtwhandlers->checkNumber($zwaterwavelength,0.02).", 
						watercolorrefraction='".$zwatercolorrefraction."', 
						watercolorreflection='".$zwatercolorreflection."', 
						watercolorblendfactor=".$wtwhandlers->checkNumber($zwatercolorblendfactor,0.2).", 
						watercolorblendfactor2=".$wtwhandlers->checkNumber($zwatercolorblendfactor2,0.2).", 
						wateralpha=".$wtwhandlers->checkNumber($zwateralpha,0.9).",
						alttag='".$wtwhandlers->escapeHTML($zalttag)."',
						updatedate=now(),
						updateuserid='".$wtwhandlers->userid."'
					where communityid='".$zcommunityid."';");
				$copycommunityid = $zcommunityid;
			}				
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-saveCommunity=".$e->getMessage());
		}
		if ($wtwhandlers->hasValue($zpastcommunityid) && $wtwhandlers->hasValue($zcommunityid)) {
			if ($this->copyCommunity($zcommunityid, $zpastcommunityid)) {
				$copycommunityid = $zcommunityid;
			}
		}
		if (!isset($copycommunityid) || empty($copycommunityid)) {
			$copycommunityid = $zcommunityid;
		}
		return $copycommunityid;
	}

	public function saveCommunityStartPosition($zcommunityid, $zstartpositionx, $zstartpositiony, $zstartpositionz, $zstartscalingx, $zstartscalingy, $zstartscalingz, $zstartrotationx, $zstartrotationy, $zstartrotationz) {
		/* this sets the avatar start position in a 3D Community scene */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->checkUpdateAccess($zcommunityid, "", "")) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."communities
					set positionx=".$wtwhandlers->checkNumber($zstartpositionx,0).",
						positiony=".$wtwhandlers->checkNumber($zstartpositiony,0).",
						positionz=".$wtwhandlers->checkNumber($zstartpositionz,0).",
						scalingx=".$wtwhandlers->checkNumber($zstartscalingx,1).",
						scalingy=".$wtwhandlers->checkNumber($zstartscalingy,1).",
						scalingz=".$wtwhandlers->checkNumber($zstartscalingz,1).",
						rotationx=".$wtwhandlers->checkNumber($zstartrotationx,0).",
						rotationy=".$wtwhandlers->checkNumber($zstartrotationy,0).",
						rotationz=".$wtwhandlers->checkNumber($zstartrotationz,0).",
						updatedate=now(),
						updateuserid='".$wtwhandlers->userid."'
					where communityid='".$zcommunityid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-saveCommunityStartPosition=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function saveDefaultSpawnZone($zcommunityid, $zbuildingid, $zthingid, $zspawnactionzoneid) {
		/* this saves the default spawn zone for a 3D Community, 3D Building, or 3D Thing */
		global $wtwhandlers;
		$zresponse = array(
			'serror' => ''
		);
		try {
			if ($wtwhandlers->checkUpdateAccess($zcommunityid, "", "")) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."communities
					set spawnactionzoneid='".$zspawnactionzoneid."',
						updatedate=now(),
						updateuserid='".$wtwhandlers->userid."'
					where communityid='".$zcommunityid."';");
			}
			if ($wtwhandlers->checkUpdateAccess("", $zbuildingid, "")) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."buildings
					set spawnactionzoneid='".$zspawnactionzoneid."',
						updatedate=now(),
						updateuserid='".$wtwhandlers->userid."'
					where buildingid='".$zbuildingid."';");
			}
			if ($wtwhandlers->checkUpdateAccess("", "", $zthingid)) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."things
					set spawnactionzoneid='".$zspawnactionzoneid."',
						updatedate=now(),
						updateuserid='".$wtwhandlers->userid."'
					where thingid='".$zthingid."';");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-saveDefaultSpawnZone=".$e->getMessage());
			$zresponse = array(
				'serror' => $e->getMessage()
			);
		}
		return $zresponse;
	}

	public function saveFirstBuilding($zcommunityid, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz) {
		/* this sets the avatar start position in a 3D Community scene */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->checkUpdateAccess($zcommunityid, "", "")) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."communities
					set buildingpositionx=".$wtwhandlers->checkNumber($zpositionx,0).",
						buildingpositiony=".$wtwhandlers->checkNumber($zpositiony,0).",
						buildingpositionz=".$wtwhandlers->checkNumber($zpositionz,0).",
						buildingscalingx=".$wtwhandlers->checkNumber($zscalingx,1).",
						buildingscalingy=".$wtwhandlers->checkNumber($zscalingy,1).",
						buildingscalingz=".$wtwhandlers->checkNumber($zscalingz,1).",
						buildingrotationx=".$wtwhandlers->checkNumber($zrotationx,0).",
						buildingrotationy=".$wtwhandlers->checkNumber($zrotationy,0).",
						buildingrotationz=".$wtwhandlers->checkNumber($zrotationz,0).",
						updatedate=now(),
						updateuserid='".$wtwhandlers->userid."'
					where communityid='".$zcommunityid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-saveFirstBuilding=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function saveCommunityGravity($zcommunityid, $zgravity) {
		/* this sets the gravity applied to a particular 3D Community scene */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->checkUpdateAccess($zcommunityid, "", "")) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."communities
					set gravity=".$zgravity.",
						updatedate=now(),
						updateuserid='".$wtwhandlers->userid."'
					where communityid='".$zcommunityid."';");
			}
			$zsuccess = true;
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-saveCommunityGravity=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function deleteCommunity($zcommunityid) {
		/* flags a community as deleted */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->checkAdminAccess($zcommunityid, "", "")) {
				$zdeleteindex = 2;
				$zresults = $wtwhandlers->query("
					select max(deleted) as maxdeleted 
					from ".wtw_tableprefix."communitymolds 
					where communityid='".$zcommunityid."' limit 1;");
				foreach ($zresults as $zrow) {
					$zdeleteindex = $wtwhandlers->getNumber($zrow["maxdeleted"],2);
				}
				$zdeleteindex += 1;
				$wtwhandlers->query("
					update ".wtw_tableprefix."webimages w1 
						inner join ".wtw_tableprefix."communitymolds cm1
							on w1.communitymoldid = cm1.communitymoldid
					set w1.deleted=".$zdeleteindex.",
						w1.deleteddate=now(),
						w1.deleteduserid='".$wtwhandlers->userid."'
					where cm1.communityid='".$zcommunityid."'
						and not cm1.communityid=''
						and not w1.communitymoldid=''
						and w1.deleted=0;");
				$wtwhandlers->query("
					update ".wtw_tableprefix."communitiesbuildings
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where communityid='".$zcommunityid."'
						and not communityid='';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."communitymolds
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where communityid='".$zcommunityid."';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where communityid='".$zcommunityid."'
						and not communityid='';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."automations
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where communityid='".$zcommunityid."'
						and deleted=0
						and not communityid='';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."automations t1 
						inner join ".wtw_tableprefix."automationsteps t2
							on t1.automationid=t2.automationid 
					set t2.deleted=".$zdeleteindex.",
						t2.deleteddate=now(),
						t2.deleteduserid='".$wtwhandlers->userid."'
					where t1.communityid='".$zcommunityid."'
						and t2.deleted=0
						and not t1.communityid='';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."communities
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where communityid='".$zcommunityid."'
						and not communityid='';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."webaliases
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where communityid='".$zcommunityid."'
						and not communityid='';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."userauthorizations
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where communityid='".$zcommunityid."'
						and not communityid='';");
				$zsuccess = true;
			}

		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-deleteCommunity=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function saveCommunityGround($zcommunityid, $ztextureid) {
		/* updates the extended ground texture settings */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->checkUpdateAccess($zcommunityid, "", "")) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."communities
					set textureid='".$ztextureid."'
					where communityid='".$zcommunityid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-saveCommunityGround=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function saveCommunityScene($zcommunityid, $zsceneambientcolor, $zsceneclearcolor, $zsceneuseclonedmeshmap, $zsceneblockmaterialdirtymechanism, $zscenefogenabled, $zscenefogmode, $zscenefogdensity, $zscenefogstart, $zscenefogend, $zscenefogcolor, $zsundirectionalintensity, $zsundiffusecolor, $zsunspecularcolor, $zsungroundcolor, $zsundirectionx, $zsundirectiony, $zsundirectionz, $zbacklightintensity, $zbacklightdirectionx, $zbacklightdirectiony, $zbacklightdirectionz, $zbacklightdiffusecolor, $zbacklightspecularcolor) {
		/* save 3D Community Scene, Fog, and Lighting settings */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->checkUpdateAccess($zcommunityid, "", "")) {
				if ($zsceneuseclonedmeshmap == true || $zsceneuseclonedmeshmap == 1 || $zsceneuseclonedmeshmap == '1') {
					$zsceneuseclonedmeshmap = 1;
				} else {
					$zsceneuseclonedmeshmap = 0;
				}
				if ($zsceneblockmaterialdirtymechanism == true || $zsceneblockmaterialdirtymechanism == 1 || $zsceneblockmaterialdirtymechanism == '1') {
					$zsceneblockmaterialdirtymechanism = 1;
				} else {
					$zsceneblockmaterialdirtymechanism = 0;
				}
				if ($zscenefogenabled == true || $zscenefogenabled == 1 || $zscenefogenabled == '1') {
					$zscenefogenabled = 1;
				} else {
					$zscenefogenabled = 0;
				}
				$wtwhandlers->query("
					update ".wtw_tableprefix."communities
					set sceneambientcolor='".$zsceneambientcolor."',
						sceneclearcolor='".$zsceneclearcolor."',
						sceneuseclonedmeshmap=".$wtwhandlers->checkNumber($zsceneuseclonedmeshmap,1).",
						sceneblockmaterialdirtymechanism=".$wtwhandlers->checkNumber($zsceneblockmaterialdirtymechanism,1).",
						scenefogenabled=".$wtwhandlers->checkNumber($zscenefogenabled,0).",
						scenefogmode='".$zscenefogmode."',
						scenefogdensity=".$wtwhandlers->checkNumber($zscenefogdensity,.01).",
						scenefogstart=".$wtwhandlers->checkNumber($zscenefogstart,20).",
						scenefogend=".$wtwhandlers->checkNumber($zscenefogend,60).",
						scenefogcolor='".$zscenefogcolor."',
						sundirectionalintensity=".$wtwhandlers->checkNumber($zsundirectionalintensity,1).",
						sundiffusecolor='".$zsundiffusecolor."',
						sunspecularcolor='".$zsunspecularcolor."',
						sungroundcolor='".$zsungroundcolor."',
						sundirectionx=".$wtwhandlers->checkNumber($zsundirectionx,999).",
						sundirectiony=".$wtwhandlers->checkNumber($zsundirectiony,-999).",
						sundirectionz=".$wtwhandlers->checkNumber($zsundirectionz,999).",
						backlightintensity=".$wtwhandlers->checkNumber($zbacklightintensity,.5).",
						backlightdirectionx=".$wtwhandlers->checkNumber($zbacklightdirectionx,-999).",
						backlightdirectiony=".$wtwhandlers->checkNumber($zbacklightdirectiony,999).",
						backlightdirectionz=".$wtwhandlers->checkNumber($zbacklightdirectionz,-999).",
						backlightdiffusecolor='".$zbacklightdiffusecolor."',
						backlightspecularcolor='".$zbacklightspecularcolor."',
						updatedate=now(),
						updateuserid='".$wtwhandlers->userid."'
					where communityid='".$zcommunityid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-saveCommunityScene=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function saveCommunitySky($zcommunityid, $zskydomeid, $zskytype, $zskysize, $zskyboxfolder, $zskyboxfile, $zskyboximageleft, $zskyboximageup, $zskyboximagefront, $zskyboximageright, $zskyboximagedown, $zskyboximageback, $zskypositionoffsetx, $zskypositionoffsety, $zskypositionoffsetz, $zskyboxmicrosurface, $zskyboxpbr, $zskyboxasenvironmenttexture, $zskyboxblur, $zskyboxdiffusecolor, $zskyboxspecularcolor, $zskyboxambientcolor, $zskyboxemissivecolor, $zskyinclination, $zskyluminance, $zskyazimuth, $zskyrayleigh, $zskyturbidity, $zskymiedirectionalg, $zskymiecoefficient) {
		/* save 3D Community sky settings */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->checkUpdateAccess($zcommunityid, "", "")) {
				if ($zskyboxpbr == true || $zskyboxpbr || $zskyboxpbr == '1') {
					$zskyboxpbr = 1;
				} else {
					$zskyboxpbr = 0;
				}
				if ($zskyboxasenvironmenttexture == true || $zskyboxasenvironmenttexture == 1 || $zskyboxasenvironmenttexture == '1') {
					$zskyboxasenvironmenttexture = 1;
				} else {
					$zskyboxasenvironmenttexture = 0;
				}
				$wtwhandlers->query("
					update ".wtw_tableprefix."communities
					set skydomeid='".$zskydomeid."',
						skytype='".$zskytype."',
						skysize=".$wtwhandlers->checkNumber($zskysize,5000).",
						skyboxfolder='".$zskyboxfolder."',
						skyboxfile='".$zskyboxfile."',
						skyboximageleft='".$zskyboximageleft."',
						skyboximageup='".$zskyboximageup."',
						skyboximagefront='".$zskyboximagefront."',
						skyboximageright='".$zskyboximageright."',
						skyboximagedown='".$zskyboximagedown."',
						skyboximageback='".$zskyboximageback."',
						skypositionoffsetx=".$wtwhandlers->checkNumber($zskypositionoffsetx,0).",
						skypositionoffsety=".$wtwhandlers->checkNumber($zskypositionoffsety,0).",
						skypositionoffsetz=".$wtwhandlers->checkNumber($zskypositionoffsetz,0).",
						skyboxmicrosurface=".$wtwhandlers->checkNumber($zskyboxmicrosurface,0).",
						skyboxpbr=".$wtwhandlers->checkNumber($zskyboxpbr,0).",
						skyboxasenvironmenttexture=".$wtwhandlers->checkNumber($zskyboxasenvironmenttexture,0).",
						skyboxblur=".$wtwhandlers->checkNumber($zskyboxblur,0).",
						skyboxdiffusecolor='".$zskyboxdiffusecolor."',
						skyboxspecularcolor='".$zskyboxspecularcolor."',
						skyboxambientcolor='".$zskyboxambientcolor."',
						skyboxemissivecolor='".$zskyboxemissivecolor."',
						skyinclination=".$wtwhandlers->checkNumber($zskyinclination,0).",
						skyluminance=".$wtwhandlers->checkNumber($zskyluminance,1).",
						skyazimuth=".$wtwhandlers->checkNumber($zskyazimuth,.25).",
						skyrayleigh=".$wtwhandlers->checkNumber($zskyrayleigh,2).",
						skyturbidity=".$wtwhandlers->checkNumber($zskyturbidity,10).",
						skymiedirectionalg=".$wtwhandlers->checkNumber($zskymiedirectionalg,.8).",
						skymiecoefficient=".$wtwhandlers->checkNumber($zskymiecoefficient,.008).",
						updatedate=now(),
						updateuserid='".$wtwhandlers->userid."'
					where communityid='".$zcommunityid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-saveCommunitySky=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function copyCommunity($zcommunityid, $zfromcommunityid) {
		/* creates a copy of a 3D Community - everything except the communities and userauthorizations tables */
		/* for full Community copy use: saveCommunity('NewCommunityID', 'CommunityIDToCopy', '', '', '', 'New Community Name', 'New Community Description'); - where NewComunityID can be '' blank to get a new CommunityID assigned and returned from function */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			set_time_limit(0);
			if ($wtwhandlers->checkUpdateAccess($zcommunityid, "", "") && $wtwhandlers->checkUpdateAccess($zfromcommunityid, "", "")) {
				$zresults = $wtwhandlers->query("
					select t2.actionzoneid as pastactionzoneid,
						 '".$zcommunityid."' as communityid,
						 t2.buildingid,
						 t2.thingid,
						 t2.attachmoldid,
						 t2.loadactionzoneid,
						 t2.parentactionzoneid,
						 t2.actionzonename,
						 t2.actionzonetype,
						 t2.actionzoneshape,
						 t2.movementtype,
						 t2.movementdistance,
						 t2.positionx,
						 t2.positiony,
						 t2.positionz,
						 t2.scalingx,
						 t2.scalingy,
						 t2.scalingz,
						 t2.rotationx,
						 t2.rotationy,
						 t2.rotationz,
						 t2.axispositionx,
						 t2.axispositiony,
						 t2.axispositionz,
						 t2.axisrotationx,
						 t2.axisrotationy,
						 t2.axisrotationz,
						 t2.rotateaxis,
						 t2.rotatedegrees,
						 t2.rotatedirection,
						 t2.rotatespeed,
						 t2.value1,
						 t2.value2,
						 t2.defaulteditform,
						 t2.jsfunction,
						 t2.jsparameters
					from ".wtw_tableprefix."actionzones t2
					where t2.communityid='".$zfromcommunityid."'
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zactionzoneid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."actionzones
							(actionzoneid,
							 pastactionzoneid,
							 communityid,
							 buildingid,
							 thingid,
							 attachmoldid,
							 loadactionzoneid,
							 parentactionzoneid,
							 actionzonename,
							 actionzonetype,
							 actionzoneshape,
							 movementtype,
							 movementdistance,
							 positionx,
							 positiony,
							 positionz,
							 scalingx,
							 scalingy,
							 scalingz,
							 rotationx,
							 rotationy,
							 rotationz,
							 axispositionx,
							 axispositiony,
							 axispositionz,
							 axisrotationx,
							 axisrotationy,
							 axisrotationz,
							 rotateaxis,
							 rotatedegrees,
							 rotatedirection,
							 rotatespeed,
							 value1,
							 value2,
							 defaulteditform,
							 jsfunction,
							 jsparameters,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zactionzoneid."',
							 '".$zrow["pastactionzoneid"]."',
							 '".$zrow["communityid"]."',
							 '".$zrow["buildingid"]."',
							 '".$zrow["thingid"]."',
							 '".$zrow["attachmoldid"]."',
							 '".$zrow["loadactionzoneid"]."',
							 '".$zrow["parentactionzoneid"]."',
							 '".$zrow["actionzonename"]."',
							 '".$zrow["actionzonetype"]."',
							 '".$zrow["actionzoneshape"]."',
							 '".$zrow["movementtype"]."',
							 ".$wtwhandlers->checkNumber($zrow["movementdistance"],0).",
							 ".$wtwhandlers->checkNumber($zrow["positionx"],0).",
							 ".$wtwhandlers->checkNumber($zrow["positiony"],0).",
							 ".$wtwhandlers->checkNumber($zrow["positionz"],0).",
							 ".$wtwhandlers->checkNumber($zrow["scalingx"],1).",
							 ".$wtwhandlers->checkNumber($zrow["scalingy"],1).",
							 ".$wtwhandlers->checkNumber($zrow["scalingz"],1).",
							 ".$wtwhandlers->checkNumber($zrow["rotationx"],0).",
							 ".$wtwhandlers->checkNumber($zrow["rotationy"],0).",
							 ".$wtwhandlers->checkNumber($zrow["rotationz"],0).",
							 ".$wtwhandlers->checkNumber($zrow["axispositionx"],0).",
							 ".$wtwhandlers->checkNumber($zrow["axispositiony"],0).",
							 ".$wtwhandlers->checkNumber($zrow["axispositionz"],0).",
							 ".$wtwhandlers->checkNumber($zrow["axisrotationx"],0).",
							 ".$wtwhandlers->checkNumber($zrow["axisrotationy"],0).",
							 ".$wtwhandlers->checkNumber($zrow["axisrotationz"],0).",
							 '".$zrow["rotateaxis"]."',
							 ".$wtwhandlers->checkNumber($zrow["rotatedegrees"],90).",
							 ".$wtwhandlers->checkNumber($zrow["rotatedirection"],1).",
							 ".$wtwhandlers->checkNumber($zrow["rotatespeed"],1).",
							 ".$wtwhandlers->checkNumber($zrow["value1"],0).",
							 ".$wtwhandlers->checkNumber($zrow["value2"],0).",
							 ".$wtwhandlers->checkNumber($zrow["defaulteditform"],0).",
							 '".$zrow["jsfunction"]."',
							 '".$zrow["jsparameters"]."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
				/* update connecting grids */
				$zresults = $wtwhandlers->query("
					select t2.connectinggridid as pastconnectinggridid,
						 t2.parentwebid,
						 t2.parentwebtype,
						 '".$zcommunityid."' as childwebid,
						 t2.childwebtype,
						 t2.positionx,
						 t2.positiony,
						 t2.positionz,
						 t2.scalingx,
						 t2.scalingy,
						 t2.scalingz,
						 t2.rotationx,
						 t2.rotationy,
						 t2.rotationz,
						 t3.actionzoneid as loadactionzoneid,
						 t4.actionzoneid as unloadactionzoneid,
						 t5.actionzoneid as attachactionzoneid,
						 t6.actionzoneid as altloadactionzoneid,
						 t2.alttag
					from ".wtw_tableprefix."connectinggrids t2
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' and (not communityid='')) t3
						on t3.pastactionzoneid = t2.loadactionzoneid
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' and (not communityid='')) t4
						on t4.pastactionzoneid=t2.unloadactionzoneid
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' and (not communityid='')) t5
						on t5.pastactionzoneid=t2.attachactionzoneid
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' and (not communityid='')) t6
						on t6.pastactionzoneid=t2.altloadactionzoneid
					where t2.childwebid='".$zfromcommunityid."'
						and parentwebid=''
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zconnectinggridid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."connectinggrids
							(connectinggridid,
							 pastconnectinggridid,
							 parentwebid,
							 parentwebtype,
							 childwebid,
							 childwebtype,
							 positionx,
							 positiony,
							 positionz,
							 scalingx,
							 scalingy,
							 scalingz,
							 rotationx,
							 rotationy,
							 rotationz,
							 loadactionzoneid,
							 unloadactionzoneid,
							 attachactionzoneid,
							 altloadactionzoneid,
							 alttag,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zconnectinggridid."',
							 '".$zrow["pastconnectinggridid"]."',
							 '".$zrow["parentwebid"]."',
							 '".$zrow["parentwebtype"]."',
							 '".$zrow["childwebid"]."',
							 '".$zrow["childwebtype"]."',
							 ".$wtwhandlers->checkNumber($zrow["positionx"],0).",
							 ".$wtwhandlers->checkNumber($zrow["positiony"],0).",
							 ".$wtwhandlers->checkNumber($zrow["positionz"],0).",
							 ".$wtwhandlers->checkNumber($zrow["scalingx"],1).",
							 ".$wtwhandlers->checkNumber($zrow["scalingy"],1).",
							 ".$wtwhandlers->checkNumber($zrow["scalingz"],1).",
							 ".$wtwhandlers->checkNumber($zrow["rotationx"],0).",
							 ".$wtwhandlers->checkNumber($zrow["rotationy"],0).",
							 ".$wtwhandlers->checkNumber($zrow["rotationz"],0).",
							 '".$zrow["loadactionzoneid"]."',
							 '".$zrow["unloadactionzoneid"]."',
							 '".$zrow["attachactionzoneid"]."',
							 '".$zrow["altloadactionzoneid"]."',
							 '".$zrow["alttag"]."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
				/* update child connecting grids (3D Things or 3D Buildings placed in 3D Communities) */
				$zresults = $wtwhandlers->query("
					select t2.connectinggridid as pastconnectinggridid,
						 '".$zcommunityid."' as parentwebid,
						 t2.parentwebtype,
						 t2.childwebid,
						 t2.childwebtype,
						 t2.positionx,
						 t2.positiony,
						 t2.positionz,
						 t2.scalingx,
						 t2.scalingy,
						 t2.scalingz,
						 t2.rotationx,
						 t2.rotationy,
						 t2.rotationz,
						 t3.actionzoneid as loadactionzoneid,
						 t4.actionzoneid as unloadactionzoneid,
						 t5.actionzoneid as attachactionzoneid,
						 t6.actionzoneid as altloadactionzoneid,
						 t2.alttag
					from ".wtw_tableprefix."connectinggrids t2
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' and (not communityid='')) t3
						on t3.pastactionzoneid=t2.loadactionzoneid
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' and (not communityid='')) t4
						on t4.pastactionzoneid=t2.unloadactionzoneid
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' and (not communityid='')) t5
						on t5.pastactionzoneid=t2.attachactionzoneid
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' and (not communityid='')) t6
						on t6.pastactionzoneid=t2.altloadactionzoneid
					where t2.parentwebid='".$zfromcommunityid."'
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zconnectinggridid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."connectinggrids
							(connectinggridid,
							 pastconnectinggridid,
							 parentwebid,
							 parentwebtype,
							 childwebid,
							 childwebtype,
							 positionx,
							 positiony,
							 positionz,
							 scalingx,
							 scalingy,
							 scalingz,
							 rotationx,
							 rotationy,
							 rotationz,
							 loadactionzoneid,
							 unloadactionzoneid,
							 attachactionzoneid,
							 altloadactionzoneid,
							 alttag,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zconnectinggridid."',
							 '".$zrow["pastconnectinggridid"]."',
							 '".$zrow["parentwebid"]."',
							 '".$zrow["parentwebtype"]."',
							 '".$zrow["childwebid"]."',
							 '".$zrow["childwebtype"]."',
							 ".$wtwhandlers->checkNumber($zrow["positionx"],0).",
							 ".$wtwhandlers->checkNumber($zrow["positiony"],0).",
							 ".$wtwhandlers->checkNumber($zrow["positionz"],0).",
							 ".$wtwhandlers->checkNumber($zrow["scalingx"],1).",
							 ".$wtwhandlers->checkNumber($zrow["scalingy"],1).",
							 ".$wtwhandlers->checkNumber($zrow["scalingz"],1).",
							 ".$wtwhandlers->checkNumber($zrow["rotationx"],0).",
							 ".$wtwhandlers->checkNumber($zrow["rotationy"],0).",
							 ".$wtwhandlers->checkNumber($zrow["rotationz"],0).",
							 '".$zrow["loadactionzoneid"]."',
							 '".$zrow["unloadactionzoneid"]."',
							 '".$zrow["attachactionzoneid"]."',
							 '".$zrow["altloadactionzoneid"]."',
							 '".$zrow["alttag"]."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
				
				/* copy contentratings */
				$zresults = $wtwhandlers->query("
					select t2.contentratingid as pastcontentratingid,
						 '".$zcommunityid."' as webid,
						 t2.webtype,
						 t2.rating,
						 t2.ratingvalue,
						 t2.contentwarning
					from ".wtw_tableprefix."contentratings t2
					where t2.webid='".$zfromcommunityid."'
						and webtype='community'
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zcontentratingid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
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
							 '".$zrow["pastcontentratingid"]."',
							 '".$zrow["webid"]."',
							 '".$zrow["webtype"]."',
							 '".$zrow["rating"]."',
							 ".$zrow["ratingvalue"].",
							 '".$zrow["contentwarning"]."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}

				/* copy plugins required */
				$zresults = $wtwhandlers->query("
					select t2.pluginsrequiredid as pastpluginsrequiredid,
						 '".$zcommunityid."' as webid,
						 'community' as webtype,
						 t2.pluginname,
						 t2.optional
					from ".wtw_tableprefix."pluginsrequired t2
					where t2.webid='".$zfromcommunityid."'
						and t2.deleted=0;");

				foreach ($zresults as $zrow) {
					$zpluginsrequiredid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."pluginsrequired
							(pluginsrequiredid,
							 pastpluginsrequiredid,
							 webid,
							 webtype,
							 pluginname,
							 optional,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zpluginsrequiredid."',
							 '".$zrow["pastpluginsrequiredid"]."',
							 '".$zrow["webid"]."',
							 '".$zrow["webtype"]."',
							 '".$zrow["pluginname"]."',
							 '".$zrow["optional"]."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
				
				/* update automations */
				$zresults = $wtwhandlers->query("
					select t2.automationid as pastautomationid,
						 t2.automationname,
						 '".$zcommunityid."' as communityid,
						 t2.buildingid,
						 t2.thingid,
						 t2.loadactionzoneid,
						 t2.jsfunction,
						 t2.jsparameters
					from ".wtw_tableprefix."automations t2
					where t2.communityid='".$zfromcommunityid."'
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zautomationid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."automations
							(automationid,
							 pastautomationid,
							 automationname,
							 communityid,
							 buildingid,
							 thingid,
							 loadactionzoneid,
							 jsfunction,
							 jsparameters,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zautomationid."',
							 '".$zrow["pastautomationid"]."',
							 '".$zrow["automationname"]."',
							 '".$zrow["communityid"]."',
							 '".$zrow["buildingid"]."',
							 '".$zrow["thingid"]."',
							 '".$zrow["loadactionzoneid"]."',
							 '".$zrow["jsfunction"]."',
							 '".$zrow["jsparameters"]."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}	
				$zresults = $wtwhandlers->query("
					select t2.automationstepid as pastautomationstepid,
						 t3.automationid as automationid,
						 t2.step,
						 t2.automationtype,
						 t4.actionzoneid as actionzoneid,
						 t2.actionzonestatus,
						 t2.conditionoperator,
						 t2.conditionstatus,
						 t2.conditionvalue,
						 t2.jsfunction,
						 t2.jsparameters
					from (select * from ".wtw_tableprefix."automations 
							where communityid='".$zfromcommunityid."' 
								and deleted=0) t1
						inner join ".wtw_tableprefix."automationsteps t2
							on t1.automationid=t2.automationid
						left join (select automationid, pastautomationid 
								from ".wtw_tableprefix."automations) t3
							on t3.pastautomationid = t2.automationid
						left join (select actionzoneid, pastactionzoneid 
								from ".wtw_tableprefix."actionzones) t4
							on t4.pastactionzoneid = t2.actionzoneid
					where t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zautomationstepid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."automationsteps
							(automationstepid,
							 pastautomationstepid,
							 automationid,
							 step,
							 automationtype,
							 actionzoneid,
							 actionzonestatus,
							 conditionoperator,
							 conditionstatus,
							 conditionvalue,
							 jsfunction,
							 jsparameters,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zautomationstepid."',
							 '".$zrow["pastautomationstepid"]."',
							 '".$zrow["automationid"]."',
							 ".$wtwhandlers->checkNumber($zrow["step"],1).",
							 '".$zrow["automationtype"]."',
							 '".$zrow["actionzoneid"]."',
							 ".$wtwhandlers->checkNumber($zrow["actionzonestatus"],0).",
							 '".$zrow["conditionoperator"]."',
							 '".$zrow["conditionstatus"]."',
							 '".$zrow["conditionvalue"]."',
							 '".$zrow["jsfunction"]."',
							 '".$zrow["jsparameters"]."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}	
				$zresults = $wtwhandlers->query("
					select t3.communitymoldid as pastcommunitymoldid,
						 '".$zcommunityid."' as communityid,
						 t3.loadactionzoneid,
						 t3.unloadactionzoneid,
						 t3.shape,
						 t3.covering,
						 t3.positionx,
						 t3.positiony,
						 t3.positionz,
						 t3.scalingx,
						 t3.scalingy,
						 t3.scalingz,
						 t3.rotationx,
						 t3.rotationy,
						 t3.rotationz,
						 t3.special1,
						 t3.special2,
						 t3.uoffset,
						 t3.voffset,
						 t3.uscale,
						 t3.vscale,
						 t3.uploadobjectid,
						 t3.graphiclevel,
						 t3.textureid,
						 t3.texturebumpid,
						 t3.texturehoverid,
						 t3.videoid,
						 t3.videoposterid,
						 t3.diffusecolor,
						 t3.specularcolor,
						 t3.emissivecolor,
						 t3.ambientcolor,
						 t3.heightmapid,
						 t3.mixmapid,
						 t3.texturerid,
						 t3.texturegid,
						 t3.texturebid,
						 t3.texturebumprid,
						 t3.texturebumpgid,
						 t3.texturebumpbid,
						 t3.soundid,
						 t3.soundname,
						 t3.soundattenuation,
						 t3.soundloop,
						 t3.soundmaxdistance,
						 t3.soundrollofffactor,
						 t3.soundrefdistance,
						 t3.soundconeinnerangle,
						 t3.soundconeouterangle,
						 t3.soundconeoutergain,
						 t3.webtext,
						 t3.webstyle,
						 t3.opacity,
						 t3.sideorientation,
						 t3.billboard,
						 t3.waterreflection,
						 t3.receiveshadows,
						 t3.subdivisions,
						 t3.minheight,
						 t3.maxheight,
						 t3.checkcollisions,
						 t3.ispickable,
						 t3.actionzoneid,
						 t3.csgmoldid,
						 t3.csgaction,
						 t3.alttag,
						 t3.jsfunction,
						 t3.jsparameters
					from ".wtw_tableprefix."communitymolds t3
					where t3.communityid='".$zfromcommunityid."'
						and t3.deleted=0;");
				foreach ($zresults as $zrow) {
					$zcommunitymoldid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."communitymolds
						   (communitymoldid,
							pastcommunitymoldid,
							communityid,
							loadactionzoneid,
							unloadactionzoneid,
							shape,
							covering,
							positionx,
							positiony,
							positionz,
							scalingx,
							scalingy,
							scalingz,
							rotationx,
							rotationy,
							rotationz,
							special1,
							special2,
							uoffset,
							voffset,
							uscale,
							vscale,
							uploadobjectid,
							graphiclevel,
							textureid,
							texturebumpid,
							texturehoverid,
							videoid,
							videoposterid,
							diffusecolor,
							specularcolor,
							emissivecolor,
							ambientcolor,
							heightmapid,
							mixmapid,
							texturerid,
							texturegid,
							texturebid,
							texturebumprid,
							texturebumpgid,
							texturebumpbid,
							soundid,
							soundname,
							soundattenuation,
							soundloop,
							soundmaxdistance,
							soundrollofffactor,
							soundrefdistance,
							soundconeinnerangle,
							soundconeouterangle,
							soundconeoutergain,
							webtext,
							webstyle,
							opacity,
							sideorientation,
							billboard,
							waterreflection,
							receiveshadows,
							subdivisions,
							minheight,
							maxheight,
							checkcollisions,
							ispickable,        
							actionzoneid,
							csgmoldid,
							csgaction,
							alttag,
							jsfunction,
							jsparameters,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
							('".$zcommunitymoldid."',
							'".$zrow["pastcommunitymoldid"]."',
							'".$zrow["communityid"]."',
							'".$zrow["loadactionzoneid"]."',
							'".$zrow["unloadactionzoneid"]."',
							'".$zrow["shape"]."',
							'".$zrow["covering"]."',
							".$wtwhandlers->checkNumber($zrow["positionx"],0).",
							".$wtwhandlers->checkNumber($zrow["positiony"],0).",
							".$wtwhandlers->checkNumber($zrow["positionz"],0).",
							".$wtwhandlers->checkNumber($zrow["scalingx"],1).",
							".$wtwhandlers->checkNumber($zrow["scalingy"],1).",
							".$wtwhandlers->checkNumber($zrow["scalingz"],1).",
							".$wtwhandlers->checkNumber($zrow["rotationx"],0).",
							".$wtwhandlers->checkNumber($zrow["rotationy"],0).",
							".$wtwhandlers->checkNumber($zrow["rotationz"],0).",
							".$wtwhandlers->checkNumber($zrow["special1"],0).",
							".$wtwhandlers->checkNumber($zrow["special2"],0).",
							".$wtwhandlers->checkNumber($zrow["uoffset"],0).",
							".$wtwhandlers->checkNumber($zrow["voffset"],0).",
							".$wtwhandlers->checkNumber($zrow["uscale"],0).",
							".$wtwhandlers->checkNumber($zrow["vscale"],0).",
							'".$zrow["uploadobjectid"]."',
							".$wtwhandlers->checkNumber($zrow["graphiclevel"],0).",
							'".$zrow["textureid"]."',
							'".$zrow["texturebumpid"]."',
							'".$zrow["texturehoverid"]."',
							'".$zrow["videoid"]."',
							'".$zrow["videoposterid"]."',
							'".$zrow["diffusecolor"]."',
							'".$zrow["specularcolor"]."',
							'".$zrow["emissivecolor"]."',
							'".$zrow["ambientcolor"]."',
							'".$zrow["heightmapid"]."',
							'".$zrow["mixmapid"]."',
							'".$zrow["texturerid"]."',
							'".$zrow["texturegid"]."',
							'".$zrow["texturebid"]."',
							'".$zrow["texturebumprid"]."',
							'".$zrow["texturebumpgid"]."',
							'".$zrow["texturebumpbid"]."',
							'".$zrow["soundid"]."',
							'".$zrow["soundname"]."',
							'".$zrow["soundattenuation"]."',
							".$wtwhandlers->checkNumber($zrow["soundloop"],1).",
							".$wtwhandlers->checkNumber($zrow["soundmaxdistance"],100).",
							".$wtwhandlers->checkNumber($zrow["soundrollofffactor"],1).",
							".$wtwhandlers->checkNumber($zrow["soundrefdistance"],1).",
							".$wtwhandlers->checkNumber($zrow["soundconeinnerangle"],90).",
							".$wtwhandlers->checkNumber($zrow["soundconeouterangle"],180).",
							".$wtwhandlers->checkNumber($zrow["soundconeoutergain"],1).",
							'".$zrow["webtext"]."',
							'".$zrow["webstyle"]."',
							".$wtwhandlers->checkNumber($zrow["opacity"],100).",
							'".$zrow["sideorientation"]."',
							".$wtwhandlers->checkNumber($zrow["billboard"],0).",
							".$wtwhandlers->checkNumber($zrow["waterreflection"],0).",
							".$wtwhandlers->checkNumber($zrow["receiveshadows"],0).",
							".$wtwhandlers->checkNumber($zrow["subdivisions"],12).",
							".$wtwhandlers->checkNumber($zrow["minheight"],0).",
							".$wtwhandlers->checkNumber($zrow["maxheight"],30).",
							".$wtwhandlers->checkNumber($zrow["checkcollisions"],1).",
							".$wtwhandlers->checkNumber($zrow["ispickable"],1).",
							'".$zrow["actionzoneid"]."',
							'".$zrow["csgmoldid"]."',
							'".$zrow["csgaction"]."',
							'".$zrow["alttag"]."',
							'".$zrow["jsfunction"]."',
							'".$zrow["jsparameters"]."',
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');");
				}
				$zresults = $wtwhandlers->query("
					select t4.webimageid as pastwebimageid,
						 '' as thingmoldid,
						 '' as buildingmoldid,
						 t6.communitymoldid as communitymoldid,
						 t4.imageindex,
						 t4.imageid,
						 t4.imagehoverid,
						 t4.imageclickid,
						 t4.graphiclevel,
						 t4.jsfunction,
						 t4.jsparameters,
						 t4.userid,
						 t4.alttag
					from ".wtw_tableprefix."webimages t4 
						inner join ".wtw_tableprefix."communitymolds t5
							on t4.communitymoldid = t5.communitymoldid
						left join (select communitymoldid, pastcommunitymoldid 
							from ".wtw_tableprefix."communitymolds 
							where communityid='".$zcommunityid."' 
								and (not communityid='')) t6
						on t6.pastcommunitymoldid = t4.communitymoldid
					where t5.communityid='".$zfromcommunityid."'
							and not t4.communitymoldid=''
							and t5.deleted=0
							and t4.deleted=0;");
				foreach ($zresults as $zrow) {
					$zwebimageid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."webimages
							(webimageid,
							 pastwebimageid,
							 thingmoldid,
							 buildingmoldid,
							 communitymoldid,
							 imageindex,
							 imageid,
							 imagehoverid,
							 imageclickid,
							 graphiclevel,
							 jsfunction,
							 jsparameters,
							 userid,
							 alttag,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zwebimageid."',
							 '".$zrow["pastwebimageid"]."',
							 '".$zrow["thingmoldid"]."',
							 '".$zrow["buildingmoldid"]."',
							 '".$zrow["communitymoldid"]."',
							 ".$wtwhandlers->checkNumber($zrow["imageindex"],0).",
							 '".$zrow["imageid"]."',
							 '".$zrow["imagehoverid"]."',
							 '".$zrow["imageclickid"]."',
							 ".$wtwhandlers->checkNumber($zrow["graphiclevel"],0).",
							 '".$zrow["jsfunction"]."',
							 '".$zrow["jsparameters"]."',
							 userid,
							 '".$zrow["alttag"]."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}	
				$zresults = $wtwhandlers->query("
					select t6.communitymoldid as moldid,
						 t4.pathnumber,
						 t4.sorder,
						 t4.positionx,
						 t4.positiony,
						 t4.positionz
					from ".wtw_tableprefix."moldpoints t4 
						inner join ".wtw_tableprefix."communitymolds t5
							on t4.moldid = t5.communitymoldid
						left join (select communitymoldid, pastcommunitymoldid 
							from ".wtw_tableprefix."communitymolds 
							where communityid='".$zcommunityid."' 
								and (not communityid='')) t6
						on t6.pastcommunitymoldid = t4.moldid
					where t5.communityid='".$zfromcommunityid."'
						and (not t4.moldid='')
						and t5.deleted=0
						and t4.deleted=0;");
				foreach ($zresults as $zrow) {
					$zmoldpointid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."moldpoints
							(moldpointid,
							 moldid,
							 pathnumber,
							 sorder,
							 positionx,
							 positiony,
							 positionz,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zmoldpointid."',
							 '".$zrow["moldid"]."',
							 ".$zrow["pathnumber"].",
							 ".$zrow["sorder"].",
							 ".$zrow["positionx"].",
							 ".$zrow["positiony"].",
							 ".$zrow["positionz"].",
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}	
				$wtwhandlers->query("
					update ".wtw_tableprefix."communitymolds
					set actionzoneid=''
					where actionzoneid is null 
						and communityid='".$zcommunityid."';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."communitymolds
					set csgmoldid=''
					where csgmoldid is null 
						and communityid='".$zcommunityid."';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones
					set attachmoldid=''
					where attachmoldid is null 
						and communityid='".$zcommunityid."' and (not communityid='');");
				$wtwhandlers->query("
					update ".wtw_tableprefix."communitymolds t1 
					left join (select * from ".wtw_tableprefix."communitymolds 
							where communityid='".$zcommunityid."') t2
						on t1.csgmoldid = t2.pastcommunitymoldid
					set t1.csgmoldid = t2.communitymoldid
					where t1.communityid='".$zcommunityid."'
						and (not t1.csgmoldid='')
						and (not t2.communitymoldid is null);");
				$wtwhandlers->query("
					update ".wtw_tableprefix."communitymolds t1 
					left join (select * from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' 
								and (not communityid='')) t2
						on t1.actionzoneid = t2.pastactionzoneid
					set t1.actionzoneid = t2.actionzoneid
					where t1.communityid='".$zcommunityid."'
						and (not t1.actionzoneid='')
						and (not t2.actionzoneid is null);");
				$wtwhandlers->query("
					update ".wtw_tableprefix."communitymolds t1 
					left join (select * from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' 
								and (not communityid='')) t2
						on t1.loadactionzoneid = t2.pastactionzoneid
					set t1.loadactionzoneid = t2.actionzoneid
					where t1.communityid='".$zcommunityid."'
						and (not t1.loadactionzoneid='')
						and (not t2.actionzoneid is null);");
				$wtwhandlers->query("
					update ".wtw_tableprefix."communitymolds t1 
					left join (select * from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' 
								and (not communityid='')) t2
						on t1.unloadactionzoneid = t2.pastactionzoneid
					set t1.unloadactionzoneid = t2.actionzoneid
					where t1.communityid='".$zcommunityid."'
						and (not t1.unloadactionzoneid='')
						and (not t2.actionzoneid is null);");
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones t1
					left join (select * from ".wtw_tableprefix."communitymolds 
							where communityid='".$zcommunityid."') t2
						on t1.attachmoldid=t2.pastcommunitymoldid
					set t1.attachmoldid=t2.communitymoldid
					where t1.communityid='".$zcommunityid."'
						and (not t1.attachmoldid='')
						and (not t2.communitymoldid is null);");
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones t1
					left join (select * from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' and (not communityid='')) t2
						on t1.parentactionzoneid=t2.pastactionzoneid
					set t1.parentactionzoneid=t2.actionzoneid
					where t1.communityid='".$zcommunityid."'
						and (not t1.parentactionzoneid='')
						and (not t2.actionzoneid is null);");
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones t1
					left join (select * from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' and (not communityid='')) t2
						on t1.loadactionzoneid=t2.pastactionzoneid
					set t1.loadactionzoneid=t2.actionzoneid
					where t1.communityid='".$zcommunityid."'
						and (not t1.loadactionzoneid='')
						and (not t2.actionzoneid is null);");
				$wtwhandlers->query("
					update ".wtw_tableprefix."automations t1
					left join (select * from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' and deleted=0) t2
						on t1.loadactionzoneid=t2.pastactionzoneid
					set t1.loadactionzoneid=t2.actionzoneid
					where t1.communityid='".$zcommunityid."'
						and (not t1.loadactionzoneid='');");
			}
			$zsuccess = true;
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-copyCommunity=".$e->getMessage());
		}
		return $zsuccess;
	}
	
}

	function wtwcommunities() {
		return wtwcommunities::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwcommunities'] = wtwcommunities();	
?>
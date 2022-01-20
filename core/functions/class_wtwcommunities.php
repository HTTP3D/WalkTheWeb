<?php
class wtwcommunities {
	/* $wtwcommunities class for admin database functions for 3d communities */
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

	public function saveCommunity($zcommunityid, $zpastcommunityid, $zcommunityname, $zcommunitydescription, $zanalyticsid, $zgroundpositiony, $zwaterpositiony, $zalttag) {
		/* save community settings to the database */
		global $wtwhandlers;
		$copycommunityid = "";
		try {
			if (empty($zpastcommunityid) || !isset($zpastcommunityid) || $wtwhandlers->checkUpdateAccess($zpastcommunityid, "", "") == false) {
				/* denies copy function if you do not have access to community to copy */
				$zpastcommunityid = "";
			}
			$zresults = array();
			if (empty($zcommunityid)) {
				/* create new communityid */
				$zcommunityid = $wtwhandlers->getRandomString(16,1);
				if (empty($zpastcommunityid) || !isset($zpastcommunityid)) {
					/* create new community (without access to copy community or if not copying existing community, this creates new community) */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."communities
							(communityid,
							 pastcommunityid,
							 communityname,
							 communitydescription,
							 analyticsid,
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
							 '".$wtwhandlers->escapeHTML($zcommunityname)."',
							 '".$wtwhandlers->escapeHTML($zcommunitydescription)."',
							 '".$zanalyticsid."',
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
							 communityname,
							 communitydescription,
							 analyticsid,
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
							 textureid,
							 skydomeid,
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
							 '".$wtwhandlers->escapeHTML($zcommunityname)."' as communityname,
							 '".$wtwhandlers->escapeHTML($zcommunitydescription)."' as communitydescription,
							 analyticsid,
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
							 textureid,
							 skydomeid,
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
				$wtwhandlers->query("
					update ".wtw_tableprefix."communities
					set 
						communityname='".$wtwhandlers->escapeHTML($zcommunityname)."',
						communitydescription='".$wtwhandlers->escapeHTML($zcommunitydescription)."',
						analyticsid='".$zanalyticsid."',
						groundpositiony=".$wtwhandlers->checkNumber($zgroundpositiony,0).",
						waterpositiony=".$wtwhandlers->checkNumber($zwaterpositiony,-1).",
						alttag='".$wtwhandlers->escapeHTML($zalttag)."',
						updatedate=now(),
						updateuserid='".$wtwhandlers->userid."'
					where communityid='".$zcommunityid."';");
				$copycommunityid = $zcommunityid;
			}				
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-saveCommunity=".$e->getMessage());
		}
		if (!empty($zpastcommunityid) && isset($zpastcommunityid) && !empty($zcommunityid) && isset($zcommunityid)) {
			if ($this->copyCommunity($zcommunityid, $zpastcommunityid)) {
				$copycommunityid = $zcommunityid;
			}
		}
		if (empty($copycommunityid) || !isset($copycommunityid)) {
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
	
	public function saveCommunitySky($zcommunityid, $zskydomeid, $zskyinclination, $zskyluminance, $zskyazimuth, $zskyrayleigh, $zskyturbidity, $zskymiedirectionalg, $zskymiecoefficient) {
		/* save 3D Community Scene sky settings */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->checkUpdateAccess($zcommunityid, "", "")) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."communities
					set skydomeid='".$zskydomeid."',
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
		/* creates a copy of a 3D Community */
		global $wtwhandlers;
		$zsuccess = false;
		try {
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
						 t2.webid,
						 t2.webtype,
						 '".$zcommunityid."' as webid,
						 t2.rating,
						 t2.ratingvalue,
						 t2.contentwarning
					from ".wtw_tableprefix."contentratings t2
					where t2.webid='".$zfromcommunityid."'
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zcontentratingid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."automations
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
	
	public function downloadWeb($zwebid, $znewwebid, $zwebtype, $zusertoken, $zdownloadparentwebid, $zdownloadparentwebtype, $zcommunityid, $zbuildingpositionx = 0, $zbuildingpositiony = 0, $zbuildingpositionz = 0, $zbuildingscalingx = 1, $zbuildingscalingy = 1, $zbuildingscalingz = 1, $zbuildingrotationx = 0, $zbuildingrotationy = 0, $zbuildingrotationz = 0) {
		/* this process downloads 3D Web and dependent objects from https://3dnet.walktheweb.com (WalkTheWeb repository)*/
		/* this is the response after you select a 3D Item to download in the search */
		/* $zwebid is the item selected (3D Community, 3D Bulding, or 3D Thing) */
		/* $znewwebid is a proposed new value for the web id (optional) */
		/* $zwebtype is 'community', 'building', or 'thing' */ // uploads
		global $wtwhandlers;
		global $wtwconnect;
		try {
			if (isset($wtwhandlers) == false && isset($wtwconnect)) {
				$wtwhandlers = $wtwconnect;
			}

			if (empty($zdownloadparentwebid) || !isset($zdownloadparentwebid)) {
				$zdownloadparentwebid = '';
			}
			if (empty($zdownloadparentwebtype) || !isset($zdownloadparentwebtype)) {
				$zdownloadparentwebtype = '';
			}
			if (empty($zcommunityid) || !isset($zcommunityid)) {
				$zcommunityid = '';
			}
			if (empty($zbuildingpositionx) || !isset($zbuildingpositionx)) {
				$zbuildingpositionx = 0;
			}
			if (empty($zbuildingpositiony) || !isset($zbuildingpositiony)) {
				$zbuildingpositiony = 0;
			}
			if (empty($zbuildingpositionz) || !isset($zbuildingpositionz)) {
				$zbuildingpositionz = 0;
			}
			if (empty($zbuildingscalingx) || !isset($zbuildingscalingx)) {
				$zbuildingscalingx = 1;
			}
			if (empty($zbuildingscalingy) || !isset($zbuildingscalingy)) {
				$zbuildingscalingy = 1;
			}
			if (empty($zbuildingscalingz) || !isset($zbuildingscalingz)) {
				$zbuildingscalingz = 1;
			}
			if (empty($zbuildingrotationx) || !isset($zbuildingrotationx)) {
				$zbuildingrotationx = 0;
			}
			if (empty($zbuildingrotationy) || !isset($zbuildingrotationy)) {
				$zbuildingrotationy = 0;
			}
			if (empty($zbuildingrotationz) || !isset($zbuildingrotationz)) {
				$zbuildingrotationz = 0;
			}
			
			$zwebtypes = "";
			$znewcommunityid = "";
			$znewbuildingid = "";
			$znewthingid = "";
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
				
				/* $zwebtypes is the plural version of webtype (used in table names) */
				switch($zwebtype) {
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
				$znewwebid = $wtwhandlers->getNewKey($zwebtypes, $zwebtype."id", $znewwebid);
				switch($zwebtype) {
					case "community":
						$znewcommunityid = $znewwebid;
						break;
					case "building":
						$znewbuildingid = $znewwebid;
						break;
					case "thing":
						$znewthingid = $znewwebid;
						break;
				}
				
				/* fetch the 3D Web data structure for the repository (all of the associated records) */
				$zurl = "https://3dnet.walktheweb.com/connect/sharedownload.php?webid=".$zwebid."&webtype=".$zwebtype."&userid=".$zuserid."&serverinstanceid=".$wtwhandlers->serverinstanceid."&domainurl=".$wtwhandlers->domainurl;

				if (!empty($zurl)) {
					$zrequest = file_get_contents($zurl);
				}
				if (!empty($zrequest) && isset($zrequest)) {
					$zrequest = json_decode($zrequest);
				}
				
				/* determine the new local path for uploaded files associated with this download */
				$znewfolder = $wtwhandlers->contentpath.'/uploads/'.$zwebtypes.'/'.$znewwebid;
				$znewurl = $wtwhandlers->contenturl.'/uploads/'.$zwebtypes.'/'.$znewwebid;
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


				/* process all uploads related to this download */
				foreach ($zrequest->uploads as $zupload) {
					/* assign a new uploadid if it is already in use */
					$znewuploadid = $wtwhandlers->getNewKey('uploads', "uploadid", $zupload->uploadid);

					$zneworiginalid = '';
					$znewwebsizeid = '';
					$znewthumbnailid = '';
					$znewfileurl = '';
					
					/* each image has 3 associated records for original, websize, and thumbnail */
					if ($zupload->uploadid == $zupload->originalid) {
						$zneworiginalid = $znewuploadid;
					} else if ($zupload->uploadid == $zupload->websizeid) {
						$znewwebsizeid = $znewuploadid;
					} else if ($zupload->uploadid == $zupload->thumbnailid) {
						$znewthumbnailid = $znewuploadid;
					}
					
					/* each image gets its own new ID if the initial one is already in use */
					if (empty($zneworiginalid)) {
						$zneworiginalid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zupload->originalid);
					}
					if (empty($znewwebsizeid)) {
						$znewwebsizeid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zupload->websizeid);
					}
					if (empty($znewthumbnailid)) {
						$znewthumbnailid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zupload->thumbnailid);
					}
					
					$znewuploadsfolder = $znewfolder.'/uploads';
					$znewuploadsurl = $znewurl.'/uploads';
					if (!file_exists($znewuploadsfolder)) {
						mkdir($znewuploadsfolder, octdec(wtw_chmod), true);
						chmod($znewuploadsfolder, octdec(wtw_chmod));
					}
					if (!empty($zupload->filepath)) {
						try {
							/* check file types for valid downloads */
							$zfileext = strtolower(pathinfo($zupload->filepath, PATHINFO_EXTENSION));
							if ($zfileext == 'babylon' || $zfileext == 'manifest' || $zfileext == 'blend' || $zfileext == 'obj' || $zfileext == 'glb' || $zfileext == 'glbt' || $zfileext == 'fbx' || $zfileext == 'dae' || $zfileext == 'stl' || $zfileext == 'jpg' || $zfileext == 'jpeg' || $zfileext == 'bmp' || $zfileext == 'tif' || $zfileext == 'tiff' || $zfileext == 'png' || $zfileext == 'gif' || $zfileext == 'webp' || $zfileext == 'wav' || $zfileext == 'mp3' || $zfileext == 'mp4' || $zfileext == 'wma' || $zfileext == 'aac' || $zfileext == 'flac' || $zfileext == 'webm' || $zfileext == 'ogg' || $zfileext == 'mpg' || $zfileext == 'avi' || $zfileext == 'mov' || $zfileext == 'wmv' || $zfileext == 'flv' || $zfileext == 'swf' || $zfileext == 'mtl' || $zfileext == '3ds' || $zfileext == 'c4d' || $zfileext == 'txt' || $zfileext == 'log' || $zfileext == 'pdf') {
								/* download each file */
								file_put_contents($znewuploadsfolder.'/'.$zupload->filename, fopen($zupload->filepath, 'r'));
								chmod($znewuploadsfolder.'/'.$zupload->filename, octdec(wtw_chmod));
								$znewfileurl = $znewuploadsurl.'/'.$zupload->filename;
							}
						} catch (Exception $e) {
							$wtwhandlers->serror("core-functions-class_wtwcommunities.php-downloadWeb-getfile=".$e->getMessage());
						}	
					}
					
					/* get new foreign keys */
					/* lookup foreign key values to new assigned values using "past" field prefix */
					$znewuserid = $wtwhandlers->getUserIDfromPastID($zupload->userid);
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zupload->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zupload->updateuserid);
					
					$zhidedate = "null";
					$zhide = "0";
					$zcheckeddate = "null";
					if (isset($zupload->hidedate)) {
						$zhidedate = "'".$zupload->hidedate."'";
					}
					if ($zupload->hide == 1) {
						$zhide = "1";
					}
					/* insert new record into uploads table */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."uploads 
						   (uploadid,
							pastuploadid,
							originalid,
							websizeid,
							thumbnailid,
							userid,
							filetitle,
							filename,
							fileextension,
							filesize,
							filetype,
							filepath,
							filedata,
							imagewidth,
							imageheight,
							stock,
							hidedate,
							hideuserid,
							hide,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$znewuploadid."',
							'".$zupload->uploadid."',
							'".$zneworiginalid."',
							'".$znewwebsizeid."',
							'".$znewthumbnailid."',
							'".$znewuserid."',
							'".$zupload->filetitle."',
							'".$zupload->filename."',
							'".$zupload->fileextension."',
							".$zupload->filesize.",
							'".$zupload->filetype."',
							'".$znewfileurl."',
							'".$zupload->filedata."',
							".$zupload->imagewidth.",
							".$zupload->imageheight.",
							0,
							".$zhidedate.",
							'".$zupload->hideuserid."',
							".$zhide.",
							'".$zupload->createdate."',
							'".$znewcreateuserid."',
							now(),
							'".$znewupdateuserid."');");
					
					/* update foreign keys as needed */
					if (!empty($zneworiginalid)) {
						$wtwhandlers->query("
							update ".wtw_tableprefix."uploads 
							set originalid='".$zneworiginalid."'
							where (pastuploadid='".$zupload->originalid."'
									or (websizeid='".$znewwebsizeid."' and not '".$znewwebsizeid."'='')
									or (thumbnailid='".$znewthumbnailid."' and not '".$znewthumbnailid."'=''))
								and originalid = '';");
					}
					if (!empty($znewwebsizeid)) {
						$wtwhandlers->query("
							update ".wtw_tableprefix."uploads 
							set websizeid='".$znewwebsizeid."'
							where (pastuploadid = '".$zupload->websizeid."'
									or (originalid='".$zneworiginalid."' and not '".$zneworiginalid."'='')
									or (thumbnailid='".$znewthumbnailid."' and not '".$znewthumbnailid."'=''))
								and websizeid = '';");
					}
					if (!empty($znewthumbnailid)) {
						$wtwhandlers->query("
							update ".wtw_tableprefix."uploads 
							set thumbnailid='".$znewthumbnailid."'
							where (pastuploadid='".$zupload->thumbnailid."'
									or (originalid='".$zneworiginalid."' and not '".$zneworiginalid."'='')
									or (websizeid='".$zneworiginalid."' and not '".$zneworiginalid."'=''))
								and thumbnailid = '';");
					}
				}

		
				/* write main web record */
				/* get new foreign keys */
				$znewsnapshotid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zrequest->snapshotid);
				$znewuserid = $wtwhandlers->getUserIDfromPastID($zrequest->userid);
				$znewshareuserid = $wtwhandlers->getUserIDfromPastID($zrequest->shareuserid);
				$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->createuserid);
				$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zrequest->updateuserid);
				
				switch($zwebtype) {
					case "community":
						/* get new foreign keys */
						$znewtextureid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zrequest->textureid);
						$znewskydomeid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zrequest->skydomeid);
						
						/* insert new record into communities table */
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."communities 
							   (communityid,
								pastcommunityid,
								downloadparentwebid,
								downloadparentwebtype,
								communityname,
								communitydescription,
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
								textureid,
								skydomeid,
								skyinclination,
								skyluminance,
								skyazimuth,
								skyrayleigh,
								skyturbidity,
								skymiedirectionalg,
								skymiecoefficient,
								templatename,
								tags,
								description,
								snapshotid,
								shareuserid,
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
							values
							   ('".$znewcommunityid."',
								'".$zrequest->communityid."',
								'".$zdownloadparentwebid."',
								'".$zdownloadparentwebtype."',
								'".$zrequest->communityname."',
								'".$zrequest->communitydescription."',
								'".$zuserid."',
								".$zrequest->positionx.",
								".$zrequest->positiony.",
								".$zrequest->positionz.",
								".$zrequest->scalingx.",
								".$zrequest->scalingy.",
								".$zrequest->scalingz.",
								".$zrequest->rotationx.",
								".$zrequest->rotationy.",
								".$zrequest->rotationz.",
								".$zrequest->gravity.",
								".$zrequest->groundpositiony.",
								".$zrequest->waterpositiony.",
								'".$znewtextureid."',
								'".$znewskydomeid."',
								".$zrequest->skyinclination.",
								".$zrequest->skyluminance.",
								".$zrequest->skyazimuth.",
								".$zrequest->skyrayleigh.",
								".$zrequest->skyturbidity.",
								".$zrequest->skymiedirectionalg.",
								".$zrequest->skymiecoefficient.",
								'".$zrequest->templatename."',
								'".$zrequest->tags."',
								'".$zrequest->description."',
								'".$znewsnapshotid."',
								'".$znewshareuserid."',
								'".$zrequest->alttag."',
								".$zrequest->buildingpositionx.",
								".$zrequest->buildingpositiony.",
								".$zrequest->buildingpositionz.",
								".$zrequest->buildingscalingx.",
								".$zrequest->buildingscalingy.",
								".$zrequest->buildingscalingz.",
								".$zrequest->buildingrotationx.",
								".$zrequest->buildingrotationy.",
								".$zrequest->buildingrotationz.",
								now(),
								'".$zuserid."',
								now(),
								'".$zuserid."');");
								
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
								 '".$zuserid."',
								 '".$znewcommunityid."',
								 'admin',
								 now(),
								 '".$zuserid."',
								 now(),
								 '".$zuserid."');");
						break;
					case "building":
						/* insert new record into buildings table */
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."buildings 
							   (buildingid,
								pastbuildingid,
								downloadparentwebid,
								downloadparentwebtype,
								buildingname,
								buildingdescription,
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
								templatename,
								tags,
								description,
								snapshotid,
								shareuserid,
								alttag,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewbuildingid."',
								'".$zrequest->buildingid."',
								'".$zdownloadparentwebid."',
								'".$zdownloadparentwebtype."',
								'".$zrequest->buildingname."',
								'".$zrequest->buildingdescription."',
								'".$zuserid."',
								".$zrequest->positionx.",
								".$zrequest->positiony.",
								".$zrequest->positionz.",
								".$zrequest->scalingx.",
								".$zrequest->scalingy.",
								".$zrequest->scalingz.",
								".$zrequest->rotationx.",
								".$zrequest->rotationy.",
								".$zrequest->rotationz.",
								".$zrequest->gravity.",
								'".$zrequest->templatename."',
								'".$zrequest->tags."',
								'".$zrequest->description."',
								'".$znewsnapshotid."',
								'".$znewshareuserid."',
								'".$zrequest->alttag."',
								now(),
								'".$zuserid."',
								now(),
								'".$zuserid."');");
						$zuserauthorizationid = $wtwhandlers->getRandomString(16,1);
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."userauthorizations
								(userauthorizationid,
								 userid,
								 buildingid,
								 useraccess,
								 createdate,
								 createuserid,
								 updatedate,
								 updateuserid)
							values
								('".$zuserauthorizationid."',
								 '".$zuserid."',
								 '".$znewbuildingid."',
								 'admin',
								 now(),
								 '".$zuserid."',
								 now(),
								 '".$zuserid."');");
						break;
					case "thing":
						/* insert new record into things table */
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."things 
							   (thingid,
								pastthingid,
								downloadparentwebid,
								downloadparentwebtype,
								thingname,
								thingdescription,
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
								templatename,
								tags,
								description,
								snapshotid,
								shareuserid,
								alttag,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewthingid."',
								'".$zrequest->thingid."',
								'".$zdownloadparentwebid."',
								'".$zdownloadparentwebtype."',
								'".$zrequest->thingname."',
								'".$zrequest->thingdescription."',
								'".$zuserid."',
								".$zrequest->positionx.",
								".$zrequest->positiony.",
								".$zrequest->positionz.",
								".$zrequest->scalingx.",
								".$zrequest->scalingy.",
								".$zrequest->scalingz.",
								".$zrequest->rotationx.",
								".$zrequest->rotationy.",
								".$zrequest->rotationz.",
								".$zrequest->gravity.",
								'".$zrequest->templatename."',
								'".$zrequest->tags."',
								'".$zrequest->description."',
								'".$znewsnapshotid."',
								'".$znewshareuserid."',
								'".$zrequest->alttag."',
								now(),
								'".$zuserid."',
								now(),
								'".$zuserid."');");
						$zuserauthorizationid = $wtwhandlers->getRandomString(16,1);
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."userauthorizations
								(userauthorizationid,
								 userid,
								 thingid,
								 useraccess,
								 createdate,
								 createuserid,
								 updatedate,
								 updateuserid)
							values
								('".$zuserauthorizationid."',
								 '".$zuserid."',
								 '".$znewthingid."',
								 'admin',
								 now(),
								 '".$zuserid."',
								 now(),
								 '".$zuserid."');");
						break;
				}	
				

				/* process all avatar animations */
				foreach ($zrequest->avataranimations as $zavataranimation) {
				
					/* check if the avataranimationid is already in use */
					$znewavataranimationid = $wtwhandlers->getNewKey('avataranimations', "avataranimationid", $zavataranimation->avataranimationid);
					
					$znewanimationicon = '';
					
					$znewobjectfolder = $znewfolder.'/avataranimations';
					if (!file_exists($znewobjectfolder)) {
						mkdir($znewobjectfolder, octdec(wtw_chmod), true);
						chmod($znewobjectfolder, octdec(wtw_chmod));
					}
					if (!empty($zavataranimation->objectfolder) && !empty($zavataranimation->objectfile)) {
						$znewobjectfolder = $znewfolder.'/avataranimations/'.str_replace(".obj","",str_replace(".gltf","",str_replace(".glb","",str_replace(".babylon","",$zavataranimation->objectfile))));
						if (!file_exists($znewobjectfolder)) {
							mkdir($znewobjectfolder, octdec(wtw_chmod), true);
							chmod($znewobjectfolder, octdec(wtw_chmod));
						}
						$zfileext = strtolower(pathinfo($znewobjectfolder."/".$zavataranimation->objectfile, PATHINFO_EXTENSION));
						if ($zfileext == 'babylon') {
							try {
								file_put_contents($znewobjectfolder."/".$zavataranimation->objectfile, fopen($zavataranimation->objectfolder.$zavataranimation->objectfile, 'r'));
								chmod($znewobjectfolder."/".$zavataranimation->objectfile, octdec(wtw_chmod));
							} catch (Exception $e) {
								$wtwhandlers->serror("core-functions-class_wtwcommunities.php-downloadWeb-getfile-babylon=".$e->getMessage());
							}	
							try {
								file_put_contents($znewobjectfolder."/".$zavataranimation->objectfile.".manifest", fopen($zavataranimation->objectfolder.$zavataranimation->objectfile.".manifest", 'r'));
								chmod($znewobjectfolder."/".$zavataranimation->objectfile.".manifest", octdec(wtw_chmod));
							} catch (Exception $e) {
								$wtwhandlers->serror("core-functions-class_wtwcommunities.php-downloadWeb-getfile-manifest=".$e->getMessage());
							}	
							
							if (!empty($zavataranimation->animationicon)) {
								try {
									$ziconfilename = basename($zavataranimation->animationicon);  
									$znewanimationicon = $znewobjectfolder."/".$ziconfilename;
									file_put_contents($znewanimationicon, fopen($zavataranimation->animationicon, 'r'));
									chmod($znewanimationicon, octdec(wtw_chmod));
								} catch (Exception $e) {
									$wtwhandlers->serror("core-functions-class_wtwcommunities.php-downloadWeb-getfile-icon=".$e->getMessage());
								}	
							}
						}
					}
					
					/* get new foreign keys */
					$znewsoundid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zavataranimation->soundid);
					
					$znewuserid = $wtwhandlers->getUserIDfromPastID($zavataranimation->userid);
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zavataranimation->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zavataranimation->updateuserid);
					
					/* insert new record into avataranimations table */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."avataranimations 
						   (avataranimationid,
							pastavataranimationid,
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
						   ('".$znewavataranimationid."',
							'".$zavataranimation->avataranimationid."',
							'".$znewuserid."',
							".$zavataranimation->loadpriority.",
							'".$zavataranimation->animationevent."',
							'".$zavataranimation->animationfriendlyname."',
							'".$znewanimationicon."',
							'".$znewobjectfolder."',
							'".$zavataranimation->objectfile."',
							".$zavataranimation->startframe.",
							".$zavataranimation->endframe.",
							".$zavataranimation->animationloop.",
							".$zavataranimation->speedratio.",
							'".$znewsoundid."',
							'".$zavataranimation->soundmaxdistance."',
							'".$zavataranimation->createdate."',
							'".$znewcreateuserid."',
							now(),
							'".$znewupdateuserid."');");
				}			
				

				/* process all action zones */
				foreach ($zrequest->actionzones as $zactionzone) {
					/* check if the actionzoneid is already in use */
					$znewactionzoneid = $wtwhandlers->getNewKey('actionzones', "actionzoneid", $zactionzone->actionzoneid);
					
					/* get new foreign keys */
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zactionzone->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zactionzone->updateuserid);
					
					/* insert new record into actionzones table */
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
						   ('".$znewactionzoneid."',
							'".$zactionzone->actionzoneid."',
							'".$znewcommunityid."',
							'".$znewbuildingid."',
							'".$znewthingid."',
							'".$zactionzone->attachmoldid."',
							'".$zactionzone->loadactionzoneid."',
							'".$zactionzone->parentactionzoneid."',
							'".$zactionzone->actionzonename."',
							'".$zactionzone->actionzonetype."',
							'".$zactionzone->actionzoneshape."',
							'".$zactionzone->movementtype."',
							".$zactionzone->movementdistance.",				
							".$zactionzone->positionx.",
							".$zactionzone->positiony.",
							".$zactionzone->positionz.",
							".$zactionzone->scalingx.",
							".$zactionzone->scalingy.",
							".$zactionzone->scalingz.",
							".$zactionzone->rotationx.",
							".$zactionzone->rotationy.",
							".$zactionzone->rotationz.",
							".$zactionzone->axispositionx.",
							".$zactionzone->axispositiony.",
							".$zactionzone->axispositionz.",
							".$zactionzone->axisrotationx.",
							".$zactionzone->axisrotationy.",
							".$zactionzone->axisrotationz.",
							'".$zactionzone->rotateaxis."',
							".$zactionzone->rotatedegrees.",
							".$zactionzone->rotatedirection.",
							".$zactionzone->rotatespeed.",
							".$zactionzone->value1.",
							".$zactionzone->value2.",
							".$zactionzone->defaulteditform.",
							'".$zactionzone->jsfunction."',
							'".$zactionzone->jsparameters."',
							'".$zactionzone->createdate."',
							'".$znewcreateuserid."',
							now(),
							'".$znewupdateuserid."');");
						
					foreach ($zactionzone->animations as $zazanimation) {
						/* check if the actionzoneanimationid is already in use */
						$znewactionzoneanimationid = $wtwhandlers->getNewKey('actionzoneanimations', "actionzoneanimationid", $zazanimation->actionzoneanimationid);
						
						/* get new foreign keys */
						$znewavataranimationid = $wtwhandlers->getIDByPastID('avataranimations', 'avataranimationid', 'pastavataranimationid', $zazanimation->avataranimationid);
						
						$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zazanimation->createuserid);
						$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zazanimation->updateuserid);
						
						/* insert new record into actionzoneanimations table */
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."actionzoneanimations 
							   (actionzoneanimationid,
								pastactionzoneanimationid,
								actionzoneid,
								communityid,
								buildingid,
								thingid,
								avataranimationid,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewactionzoneanimationid."',
								'".$zazanimation->actionzoneanimationid."',
								'".$znewactionzoneid."',
								'".$znewcommunityid."',
								'".$znewbuildingid."',
								'".$znewthingid."',
								'".$znewavataranimationid."',
								'".$zazanimation->createdate."',
								'".$znewcreateuserid."',
								now(),
								'".$znewupdateuserid."');");	
						
					}
				}

				/* process action zone foreign action zones */
				$zresults = $wtwhandlers->query("
					select *  from ".wtw_tableprefix."actionzones 
					where communityid='".$znewcommunityid."'
						and buildingid='".$znewbuildingid."'
						and thingid='".$znewthingid."';");
				foreach ($zresults as $zrow) {
					/* get new foreign keys */
					$znewloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zrow["loadactionzoneid"]);
					$znewparentactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zrow["parentactionzoneid"]);

					$wtwhandlers->query("
						update ".wtw_tableprefix."actionzones
						set loadactionzoneid='".$znewloadactionzoneid."',
							parentactionzoneid='".$znewparentactionzoneid."'
						where actionzoneid='".$zrow["actionzoneid"]."'
						limit 1;");
				}


				/* process all scripts */
				foreach ($zrequest->scripts as $zscript) {
				
					/* check if the scriptid is already in use */
					$znewscriptid = $wtwhandlers->getNewKey('scripts', "scriptid", $zscript->scriptid);
					
					$znewscriptfolder = $znewfolder.'/scripts';
					if (!file_exists($znewscriptfolder)) {
						mkdir($znewscriptfolder, octdec(wtw_chmod), true);
						chmod($znewscriptfolder, octdec(wtw_chmod));
					}
					if (!empty($zscript->scriptpath)) {
						$zfileext = strtolower(pathinfo($znewscriptfolder."/".$zscript->scriptfilename, PATHINFO_EXTENSION));
						if ($zfileext == 'js') {
							try {
								file_put_contents($znewscriptfolder."/".$zscript->scriptfilename, fopen($zscript->scriptpath, 'r'));
								chmod($znewscriptfolder."/".$zscript->scriptfilename, octdec(wtw_chmod));
							} catch (Exception $e) {
								$wtwhandlers->serror("core-functions-class_wtwcommunities.php-downloadWeb-getfile-js=".$e->getMessage());
							}	
						}
					}
					
					/* get new foreign keys */
					$znewactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zscript->actionzoneid);
					
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zscript->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zscript->updateuserid);
					
					/* insert new record into scripts table */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."scripts 
						   (scriptid,
							pastscriptid,
							actionzoneid,
							webtype,
							scriptname,
							scriptpath,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$znewscriptid."',
							'".$zscript->scriptid."',
							'".$znewactionzoneid."',
							'".$zscript->webtype."',
							'".$zscript->scriptname."',
							'".$znewscriptfolder."/".$zscript->scriptfilename."',
							'".$zscript->createdate."',
							'".$znewcreateuserid."',
							now(),
							'".$znewupdateuserid."');");		
				}


				/* process parent connecting grids */
				foreach ($zrequest->connectinggrids as $zconnectinggrid) {
					/* check if the connectinggridid is already in use */
					$znewconnectinggridid = $wtwhandlers->getNewKey('connectinggrids', "connectinggridid", $zconnectinggrid->connectinggridid);
					
					/* get new foreign keys */
					$znewloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->loadactionzoneid);
					$znewaltloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->altloadactionzoneid);
					$znewunloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->unloadactionzoneid);
					$znewattachactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->attachactionzoneid);
					
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zconnectinggrid->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zconnectinggrid->updateuserid);
					
					/* insert new record into connectinggrids table */
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
							altloadactionzoneid,
							unloadactionzoneid,
							attachactionzoneid,
							alttag,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$znewconnectinggridid."',
							'".$zconnectinggrid->connectinggridid."',
							'',
							'".$zconnectinggrid->parentwebtype."',
							'".$znewwebid."',
							'".$zconnectinggrid->childwebtype."',
							".$zconnectinggrid->positionx.",
							".$zconnectinggrid->positiony.",
							".$zconnectinggrid->positionz.",
							".$zconnectinggrid->scalingx.",
							".$zconnectinggrid->scalingy.",
							".$zconnectinggrid->scalingz.",
							".$zconnectinggrid->rotationx.",
							".$zconnectinggrid->rotationy.",
							".$zconnectinggrid->rotationz.",
							'".$znewloadactionzoneid."',
							'".$znewaltloadactionzoneid."',
							'".$znewunloadactionzoneid."',
							'".$znewattachactionzoneid."',
							'".$zconnectinggrid->alttag."',
							'".$zconnectinggrid->createdate."',
							'".$znewcreateuserid."',
							now(),
							'".$znewupdateuserid."');");
				}
				

				/* process content ratings */
				foreach ($zrequest->contentratings as $zcontentrating) {
					/* check if the contentratingid is already in use */
					$znewcontentratingid = $wtwhandlers->getNewKey('contentratings', "contentratingid", $zcontentrating->contentratingid);
					
					/* get new foreign keys */
					$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zcontentrating->createuserid);
					$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zcontentrating->updateuserid);
					
					/* insert new record into connectinggrids table */
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
						   ('".$znewcontentratingid."',
							'".$zcontentrating->contentratingid."',
							'".$znewwebid."',
							'".$zcontentrating->webtype."',
							'".$zcontentrating->rating."',
							".$zcontentrating->ratingvalue.",
							'".$zcontentrating->contentwarning."',
							'".$zcontentrating->createdate."',
							'".$znewcreateuserid."',
							now(),
							'".$znewupdateuserid."');");
				}
				

				/* process uploaded objects */
				foreach ($zrequest->uploadobjects as $zuploadobject) {
					$znewuploadobjectid = $wtwhandlers->getNewKey('uploadobjects', "uploadobjectid", $zuploadobject->uploadobjectid);

					if (!empty($zuploadobject->uploadobjectid) && isset($zuploadobject->uploadobjectid)) {
						
						$znewobjectfolder = $znewfolder.'/objects';
						if (!file_exists($znewobjectfolder)) {
							mkdir($znewobjectfolder, octdec(wtw_chmod), true);
							chmod($znewobjectfolder, octdec(wtw_chmod));
						}
						$znewobjectfolder = $znewfolder.'/objects/'.str_replace(".obj","",str_replace(".gltf","",str_replace(".glb","",str_replace(".babylon","",$zuploadobject->objectfile))));
						if (!file_exists($znewobjectfolder)) {
							mkdir($znewobjectfolder, octdec(wtw_chmod), true);
							chmod($znewobjectfolder, octdec(wtw_chmod));
						}
						$znewobjecturl = $znewurl.'/objects/'.str_replace(".obj","",str_replace(".gltf","",str_replace(".glb","",str_replace(".babylon","",$zuploadobject->objectfile))))."/";
						
						/* get new foreign keys */
						$znewuserid = $wtwhandlers->getUserIDfromPastID($zuploadobject->userid);
						$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zuploadobject->createuserid);
						$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zuploadobject->updateuserid);
						
						/* insert new record into uploadobjects table */
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."uploadobjects 
							   (uploadobjectid,
								pastuploadobjectid,
								userid,
								objectfolder,
								objectfile,
								stock,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewuploadobjectid."',
								'".$zuploadobject->uploadobjectid."',
								'".$zuserid."',
								'".$znewobjecturl."',
								'".$zuploadobject->objectfile."',
								".$zuploadobject->stock.",
								'".$zuploadobject->createdate."',
								'".$znewcreateuserid."',
								now(),
								'".$znewupdateuserid."');");
						
						foreach($zuploadobject->objectfiles as $zfile) {
							try {
								$zfileext = strtolower(pathinfo($zfile->filepath, PATHINFO_EXTENSION));
								if ($zfileext == 'babylon' || $zfileext == 'manifest' || $zfileext == 'blend' || $zfileext == 'obj' || $zfileext == 'glb' || $zfileext == 'glbt' || $zfileext == 'fbx' || $zfileext == 'dae' || $zfileext == 'stl' || $zfileext == 'jpg' || $zfileext == 'jpeg' || $zfileext == 'bmp' || $zfileext == 'tif' || $zfileext == 'tiff' || $zfileext == 'png' || $zfileext == 'gif' || $zfileext == 'webp' || $zfileext == 'wav' || $zfileext == 'mp3' || $zfileext == 'mp4' || $zfileext == 'wma' || $zfileext == 'aac' || $zfileext == 'flac' || $zfileext == 'webm' || $zfileext == 'ogg' || $zfileext == 'mpg' || $zfileext == 'avi' || $zfileext == 'mov' || $zfileext == 'wmv' || $zfileext == 'flv' || $zfileext == 'swf' || $zfileext == 'mtl' || $zfileext == '3ds' || $zfileext == 'c4d' || $zfileext == 'txt' || $zfileext == 'log' || $zfileext == 'pdf') {
									file_put_contents($znewobjectfolder.'/'.$zfile->filename, fopen($zfile->filepath, 'r'));
									chmod($znewobjectfolder.'/'.$zfile->filename, octdec(wtw_chmod));
								}
							} catch (Exception $e) {
								$wtwhandlers->serror("core-functions-class_wtwcommunities.php-downloadWeb-getfiles=".$e->getMessage());
							}	
						}
						
						
						/* process upload object animations */
						foreach ($zuploadobject->uploadobjectanimations as $zuploadobjectanimation) {
						
							/* check if the upload object animation id (objectanimationid) is already in use */
							$znewobjectanimationid = $wtwhandlers->getNewKey('uploadobjectanimations', "objectanimationid", $zuploadobjectanimation->objectanimationid);
							
							/* get new foreign keys */
							$znewsoundid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zuploadobjectanimation->soundid);
							
							$znewuserid = $wtwhandlers->getUserIDfromPastID($zuploadobjectanimation->userid);
							$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zuploadobjectanimation->createuserid);
							$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zuploadobjectanimation->updateuserid);
							
							/* insert new record into uploadobjectanimations table */
							$wtwhandlers->query("
								insert into ".wtw_tableprefix."uploadobjectanimations 
								   (objectanimationid,
									pastobjectanimationid,
									uploadobjectid,
									userid,
									animationname,
									moldnamepart,
									moldevent,
									startframe,
									endframe,
									animationloop,
									speedratio,
									animationendscript,
									animationendparameters,
									stopcurrentanimations,
									additionalscript,
									additionalparameters,
									soundid,
									soundmaxdistance,
									createdate,
									createuserid,
									updatedate,
									updateuserid)
								values
								   ('".$znewobjectanimationid."',
									'".$zuploadobjectanimation->objectanimationid."',
									'".$znewuploadobjectid."',
									'".$znewuserid."',
									'".$zuploadobjectanimation->animationname."',
									'".$zuploadobjectanimation->moldnamepart."',
									'".$zuploadobjectanimation->moldevent."',
									".$zuploadobjectanimation->startframe.",
									".$zuploadobjectanimation->endframe.",
									".$zuploadobjectanimation->animationloop.",
									".$zuploadobjectanimation->speedratio.",
									'".$zuploadobjectanimation->animationendscript."',
									'".$zuploadobjectanimation->animationendparameters."',
									".$zuploadobjectanimation->stopcurrentanimations.",
									'".$zuploadobjectanimation->additionalscript."',
									'".$zuploadobjectanimation->additionalparameters."',
									'".$znewsoundid."',
									".$zuploadobjectanimation->soundmaxdistance.",
									'".$zuploadobjectanimation->createdate."',
									'".$znewcreateuserid."',
									now(),
									'".$znewupdateuserid."');");
						}
					}
				}			


				/* process all molds */
				foreach ($zrequest->molds as $zmold) {
					/* check if the moldid is already in use */
					$znewmoldid = '';
					$zsql = '';
					$zsqlvalues = '';
					switch($zwebtype) {
						case "community":
							$znewmoldid = $wtwhandlers->getNewKey($zwebtype.'molds', $zwebtype.'moldid', $zmold->communitymoldid);
							/* insert new record into communitymolds table */
							$zsql = "insert into ".wtw_tableprefix."communitymolds
							   (communitymoldid,
								pastcommunitymoldid,
								communityid,";
							$zsqlvalues = "('".$znewmoldid."',
								'".$zmold->communitymoldid."',
								'".$znewcommunityid."',";
							break;
						case "building":
							$znewmoldid = $wtwhandlers->getNewKey($zwebtype.'molds', $zwebtype.'moldid', $zmold->buildingmoldid);
							/* insert new record into buildingmolds table */
							$zsql = "insert into ".wtw_tableprefix."buildingmolds
							   (buildingmoldid,
								pastbuildingmoldid,
								buildingid,";
							$zsqlvalues = "('".$znewmoldid."',
								'".$zmold->buildingmoldid."',
								'".$znewbuildingid."',";
							break;
						case "thing":
							$znewmoldid = $wtwhandlers->getNewKey($zwebtype.'molds', $zwebtype.'moldid', $zmold->thingmoldid);
							/* insert new record into thingmolds table */
							$zsql = "insert into ".wtw_tableprefix."thingmolds
							   (thingmoldid,
								pastthingmoldid,
								thingid,";
							$zsqlvalues = "('".$znewmoldid."',
								'".$zmold->pastthingmoldid."',
								'".$znewthingid."',";
							break;
					}

					if (!empty($zsql)) {
						$znewtextureid = '';
						$znewtexturebumpid = '';
						$znewtexturehoverid = '';
						$znewvideoid = '';
						$znewvideoposterid = '';
						$znewheightmapid = '';
						$znewmixmapid = '';
						$znewtexturerid = '';
						$znewtexturegid = '';
						$znewtexturebid = '';
						$znewtexturebumprid = '';
						$znewtexturebumpgid = '';
						$znewtexturebumpbid = '';
						$znewsoundid = '';
						$znewtextureid = '';
						
						/* get new foreign keys */
						$znewtextureid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->textureid);
						$znewtexturebumpid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturebumpid);
						$znewtexturehoverid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturehoverid);
						$znewvideoid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->videoid);
						$znewvideoposterid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->videoposterid);
						$znewheightmapid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->heightmapid);
						$znewmixmapid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->mixmapid);
						$znewtexturerid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturerid);
						$znewtexturegid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturegid);
						$znewtexturebid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturebid);
						$znewtexturebumprid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturebumprid);
						$znewtexturebumpgid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturebumpgid);
						$znewtexturebumpbid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->texturebumpbid);
						$znewsoundid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zmold->soundid);

						$znewloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zmold->loadactionzoneid);
						$znewunloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zmold->unloadactionzoneid);
						$znewactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zmold->actionzoneid);
						
						$znewuploadobjectid = $wtwhandlers->getIDByPastID('uploadobjects', 'uploadobjectid', 'pastuploadobjectid', $zmold->uploadobjectid);
						
						$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zmold->createuserid);
						$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zmold->updateuserid);
						
						/* remainder fo the common fields for communitymolds, buildingmolds, and thingmolds */
						$zsql .= "
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
							values ";
						
						$zsqlvalues .= "
							'".$znewloadactionzoneid."',
							'".$znewunloadactionzoneid."',
							'".$zmold->shape."',
							'".$zmold->covering."',
							".$zmold->positionx.",
							".$zmold->positiony.",
							".$zmold->positionz.",
							".$zmold->scalingx.",
							".$zmold->scalingy.",
							".$zmold->scalingz.",
							".$zmold->rotationx.",
							".$zmold->rotationy.",
							".$zmold->rotationz.",
							".$zmold->special1.",
							".$zmold->special2.",
							".$zmold->uoffset.",
							".$zmold->voffset.",
							".$zmold->uscale.",
							".$zmold->vscale.",
							'".$znewuploadobjectid."',
							".$zmold->graphiclevel.",
							'".$znewtextureid."',
							'".$znewtexturebumpid."',
							'".$znewtexturehoverid."',
							'".$znewvideoid."',
							'".$znewvideoposterid."',
							'".$zmold->diffusecolor."',
							'".$zmold->specularcolor."',
							'".$zmold->emissivecolor."',
							'".$zmold->ambientcolor."',
							'".$znewheightmapid."',
							'".$znewmixmapid."',
							'".$znewtexturerid."',
							'".$znewtexturegid."',
							'".$znewtexturebid."',
							'".$znewtexturebumprid."',
							'".$znewtexturebumpgid."',
							'".$znewtexturebumpbid."',
							'".$znewsoundid."',
							'".$zmold->soundname."',
							'".$zmold->soundattenuation."',
							".$zmold->soundloop.",
							".$zmold->soundmaxdistance.",
							".$zmold->soundrollofffactor.",
							".$zmold->soundrefdistance.",
							".$zmold->soundconeinnerangle.",
							".$zmold->soundconeouterangle.",
							".$zmold->soundconeoutergain.",
							'".$zmold->webtext."',
							'".$zmold->webstyle."',
							".$zmold->opacity.",
							'".$zmold->sideorientation."',
							".$zmold->billboard.",
							".$zmold->waterreflection.",
							".$zmold->receiveshadows.",
							".$zmold->subdivisions.",
							".$zmold->minheight.",
							".$zmold->maxheight.",
							".$zmold->checkcollisions.",
							".$zmold->ispickable.",
							'".$znewactionzoneid."',
							'".$zmold->csgmoldid."',
							'".$zmold->csgaction."',
							'".$zmold->alttag."',
							'".$zmold->jsfunction."',
							'".$zmold->jsparameters."',
							'".$zmold->createdate."',
							'".$znewcreateuserid."',
							now(),
							'".$znewupdateuserid."');";

						$wtwhandlers->query($zsql.$zsqlvalues);
						
						
						/*  get mold points */
						foreach ($zmold->moldpoints as $zmoldpoint) {
							$znewmoldpointid = $wtwhandlers->getNewKey('moldpoints', 'moldpointid', $zmoldpoint->moldpointid);
							
							/* get new foreign keys */
							$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zmoldpoint->createuserid);
							$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zmoldpoint->updateuserid);
							
							/* insert new record into moldpoints table */
							$wtwhandlers->query("
								insert into ".wtw_tableprefix."moldpoints 
								   (moldpointid,
									pastmoldpointid,
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
								   ('".$znewmoldpointid."',
									'".$zmoldpoint->moldpointid."',
									'".$znewmoldid."',
									".$zmoldpoint->pathnumber.",
									".$zmoldpoint->sorder.",
									".$zmoldpoint->positionx.",
									".$zmoldpoint->positiony.",
									".$zmoldpoint->positionz.",
									'".$zmoldpoint->createdate."',
									'".$znewcreateuserid."',
									now(),
									'".$znewupdateuserid."');");
						}
						
						
						/* process csg molds */
						$zresults = $wtwhandlers->query("
							select *  from ".wtw_tableprefix.$zwebtype."molds 
							where ".$zwebtype."moldid='".$znewmoldid."'
								and not csgmoldid='';");
						foreach ($zresults as $zrow) {
							/* get new foreign keys */
							$znewcsgmoldid = $wtwhandlers->getIDByPastID($zwebtype.'molds', $zwebtype.'moldid', 'past'.$zwebtype.'moldid', $zrow["csgmoldid"]);
							
							$wtwhandlers->query("
								update ".wtw_tableprefix.$zwebtype."molds
								set csgmoldid='".$znewcsgmoldid."'
								where ".$zwebtype."moldid='".$zrow[$zwebtype."moldid"]."'
									and not csgmoldid=''
								limit 1;");
						}


						/* process action zone attach molds */
						$zresults = $wtwhandlers->query("
							select *  from ".wtw_tableprefix."actionzones 
							where ".$zwebtype."id='".$znewwebid."'
								and not attachmoldid='';");
						foreach ($zresults as $zrow) {
							/* get new foreign keys */
							$znewattachmoldid = $wtwhandlers->getIDByPastID($zwebtype.'molds', $zwebtype.'moldid', 'past'.$zwebtype.'moldid', $zrow["attachmoldid"]);
							
							$wtwhandlers->query("
								update ".wtw_tableprefix."actionzones
								set attachmoldid='".$znewattachmoldid."'
								where actionzoneid='".$zrow["actionzoneid"]."'
									and not attachmoldid=''
								limit 1;");
						}


						/* get webimages */
						foreach ($zmold->webimages as $zwebimage) {
							$znewwebimageid = $wtwhandlers->getNewKey('webimages', 'webimageid', $zwebimage->webimageid);

							$znewcommunitymoldid = '';
							$znewbuildingmoldid = '';
							$znewthingmoldid = '';
							switch ($zwebtype) {
								case 'community':
									$znewcommunitymoldid = $znewmoldid;
									break;
								case 'building':
									$znewbuildingmoldid = $znewmoldid;
									break;
								case 'thing':
									$znewthingmoldid = $znewmoldid;
									break;
							}
							/* get new foreign keys */
							$znewimageid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zwebimage->imageid);
							$znewimagehoverid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zwebimage->imagehoverid);
							$znewimageclickid = $wtwhandlers->getIDByPastID('uploads', 'uploadid', 'pastuploadid', $zwebimage->imageclickid);
							
							$znewuserid = $wtwhandlers->getUserIDfromPastID($zwebimage->userid);
							$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zwebimage->createuserid);
							$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zwebimage->updateuserid);
							
							/* insert new record into webimages table */
							$wtwhandlers->query("
								insert into ".wtw_tableprefix."webimages 
								   (webimageid,
									pastwebimageid,
									communitymoldid,
									buildingmoldid,
									thingmoldid,
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
								   ('".$znewwebimageid."',
									'".$zwebimage->webimageid."',
									'".$znewcommunitymoldid."',
									'".$znewbuildingmoldid."',
									'".$znewthingmoldid."',
									".$zwebimage->imageindex.",
									'".$znewimageid."',
									'".$znewimagehoverid."',
									'".$znewimageclickid."',
									".$zwebimage->graphiclevel.",
									'".$zwebimage->jsfunction."',
									'".$zwebimage->jsparameters."',
									'".$znewuserid."',
									'".$zwebimage->alttag."',
									'".$zwebimage->createdate."',
									'".$znewcreateuserid."',
									now(),
									'".$znewupdateuserid."');");	
						}			
					}
				}


				/* if part of the new install process, add the first building to the first community */
				if ($zwebtype == 'building' && !empty($zcommunityid) && isset($zcommunityid)) {
					$znewconnectinggridid = $wtwhandlers->getNewKey('connectinggrids', 'connectinggridid', '');
					$zloadactionzoneid = '';
					if (is_numeric($zbuildingpositionx) == false) {
						$zbuildingpositionx = 0;
					}
					if (is_numeric($zbuildingpositiony) == false) {
						$zbuildingpositiony = 0;
					}
					if (is_numeric($zbuildingpositionz) == false) {
						$zbuildingpositionz = 0;
					}
					if (is_numeric($zbuildingscalingx) == false) {
						$zbuildingscalingx = 1;
					}
					if (is_numeric($zbuildingscalingy) == false) {
						$zbuildingscalingy = 1;
					}
					if (is_numeric($zbuildingscalingz) == false) {
						$zbuildingscalingz = 1;
					}
					if (is_numeric($zbuildingrotationx) == false) {
						$zbuildingrotationx = 0;
					}
					if (is_numeric($zbuildingrotationy) == false) {
						$zbuildingrotationy = 0;
					}
					if (is_numeric($zbuildingrotationz) == false) {
						$zbuildingrotationz = 0;
					}
					
					/* get the extreme loadzone for the new building */
					$zresultsaz = $wtwhandlers->query("
						select * 
						from ".wtw_tableprefix."actionzones 
						where buildingid='".$znewwebid."'
							and actionzonename='Extreme Load Zone'
							and deleted=0
						limit 1;");
					foreach ($zresultsaz as $zrowaz) {
						$zloadactionzoneid = $zrowaz["actionzoneid"];
					}
					
					/* add connecting grid to place the building into the community during first time installs */
					if (!empty($zloadactionzoneid) && isset($zloadactionzoneid)) {
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
								altloadactionzoneid,
								unloadactionzoneid,
								attachactionzoneid,
								alttag,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$znewconnectinggridid."',
								'',
								'".$zcommunityid."',
								'community',
								'".$znewwebid."',
								'building',
								".$zbuildingpositionx.",
								".$zbuildingpositiony.",
								".$zbuildingpositionz.",
								".$zbuildingscalingx.",
								".$zbuildingscalingy.",
								".$zbuildingscalingz.",
								".$zbuildingrotationx.",
								".$zbuildingrotationy.",
								".$zbuildingrotationz.",
								'".$zloadactionzoneid."',
								'',
								'',
								'',
								'',
								now(),
								'".$zuserid."',
								now(),
								'".$zuserid."');");
					}
				}

				/* process child connecting grids */
				if ($zwebtype != 'thing') {
					$zdiffwebid = '';
					foreach ($zrequest->childconnectinggrids as $zconnectinggrid) {
					
						/* check if the connectinggridid is already in use */
						$znewconnectinggridid = $wtwhandlers->getNewKey('connectinggrids', 'connectinggridid', $zconnectinggrid->connectinggridid);

						if (($zwebtype == 'community' && ($zconnectinggrid->childwebtype == 'building' || $zconnectinggrid->childwebtype == 'thing')) || ($zwebtype == 'building' && $zconnectinggrid->childwebtype == 'thing')) {
							$zfetchweb = false;
							
							/* look out for duplicates, while making sure we get each 3D webs */
							$znewchildwebid = '';
							$znewchildwebtypes = '';
							switch ($zconnectinggrid->childwebtype) {
								case "community":
									$znewchildwebtypes = 'communities';
									break;
								case "building":
									$znewchildwebtypes = 'buildings';
									break;
								case "thing":
									$znewchildwebtypes = 'things';
									break;
							}
							$znewchildwebid = $wtwhandlers->getNewKey($znewchildwebtypes, $zconnectinggrid->childwebtype.'id', $zconnectinggrid->childwebid);
							
							if ($zdiffwebid != $zconnectinggrid->childwebid) {
								$zfetchweb = true;
								$zdiffwebid = $zconnectinggrid->childwebid;
							} else {
								$zresults = $wtwhandlers->query("
									select *  from ".wtw_tableprefix.$znewchildwebtypes." 
									where past".$zconnectinggrid->childwebtype."id='".$zconnectinggrid->childwebid."'
									order by createdate desc
									limit 1;");
								foreach ($zresults as $zrow) {
									$znewchildwebid = $zrow[$zconnectinggrid->childwebtype."id"];
								}
							}
							
							/* get new foreign keys */
							$znewloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->loadactionzoneid);
							$znewaltloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->altloadactionzoneid);
							$znewunloadactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->unloadactionzoneid);
							$znewattachactionzoneid = $wtwhandlers->getIDByPastID('actionzones', 'actionzoneid', 'pastactionzoneid', $zconnectinggrid->attachactionzoneid);
							
							$znewcreateuserid = $wtwhandlers->getUserIDfromPastID($zconnectinggrid->createuserid);
							$znewupdateuserid = $wtwhandlers->getUserIDfromPastID($zconnectinggrid->updateuserid);
							
							/* insert new record into connectinggrids table (additional 3D Webs in the current 3D Web) */
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
									altloadactionzoneid,
									unloadactionzoneid,
									attachactionzoneid,
									alttag,
									createdate,
									createuserid,
									updatedate,
									updateuserid)
								values
								   ('".$znewconnectinggridid."',
									'".$zconnectinggrid->connectinggridid."',
									'".$znewwebid."',
									'".$zconnectinggrid->parentwebtype."',
									'".$znewchildwebid."',
									'".$zconnectinggrid->childwebtype."',
									".$zconnectinggrid->positionx.",
									".$zconnectinggrid->positiony.",
									".$zconnectinggrid->positionz.",
									".$zconnectinggrid->scalingx.",
									".$zconnectinggrid->scalingy.",
									".$zconnectinggrid->scalingz.",
									".$zconnectinggrid->rotationx.",
									".$zconnectinggrid->rotationy.",
									".$zconnectinggrid->rotationz.",
									'".$znewloadactionzoneid."',
									'".$znewaltloadactionzoneid."',
									'".$znewunloadactionzoneid."',
									'".$znewattachactionzoneid."',
									'".$zconnectinggrid->alttag."',
									'".$zconnectinggrid->createdate."',
									'".$znewcreateuserid."',
									now(),
									'".$znewupdateuserid."');");
							if ($zfetchweb) {
								/* assign newchildwebid, but also need to pass the webid... */
								$this->downloadWeb($zconnectinggrid->childwebid, $znewchildwebid, $zconnectinggrid->childwebtype, $zusertoken, $znewwebid, $zconnectinggrid->parentwebtype, '', 0, 0, 0, 0);
							}
						}
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-downloadWeb=".$e->getMessage());
		}
		return $znewwebid;
	}
		
	public function importCommunity($zcommunityid, $zpastcommunityid, $zcommunityname, $zcommunityanalyticsid, $zstartpositionx, $zstartpositiony, $zstartpositionz, $zstartscalingx, $zstartscalingy, $zstartscalingz, $zstartrotationx, $zstartrotationy, $zstartrotationz, $zgravity, $ztextureid, $zskydomeid, $zskyinclination, $zskyluminance, $zskyazimuth, $zskyrayleigh, $zskyturbidity, $zskymiedirectionalg, $zskymiecoefficient, $zgroundpositiony, $zwaterpositiony, $zalttag) {
		/* imports community settings from the media library wen you download a community */
		global $wtwhandlers;
		try {
			/* ini_set('max_execution_time', 300); */
			if (!empty($wtwhandlers->getSessionUserID())) {
				if ($wtwhandlers->keyExists(wtw_tableprefix.'communities', 'communityid', $zcommunityid) == false) {
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."communities
							(communityid, 
							 pastcommunityid, 
							 communityname, 
							 analyticsid, 
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
							 textureid, 
							 skydomeid, 
							 skyinclination, 
							 skyluminance, 
							 skyazimuth, 
							 skyrayleigh, 
							 skyturbidity, 
							 skymiedirectionalg, 
							 skymiecoefficient, 
							 groundpositiony, 
							 waterpositiony, 
							 alttag,
							 userid,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zcommunityid."', 
							 '".$zpastcommunityid."', 
							 '".$zcommunityname."', 
							 '".$zcommunityanalyticsid."', 
							 ".$zstartpositionx.", 
							 ".$zstartpositiony.", 
							 ".$zstartpositionz.", 
							 ".$zstartscalingx.", 
							 ".$zstartscalingy.", 
							 ".$zstartscalingz.", 
							 ".$zstartrotationx.", 
							 ".$zstartrotationy.", 
							 ".$zstartrotationz.", 
							 ".$zgravity.", 
							 '".$ztextureid."', 
							 '".$zskydomeid."', 
							 ".$zskyinclination.", 
							 ".$zskyluminance.", 
							 ".$zskyazimuth.", 
							 ".$zskyrayleigh.", 
							 ".$zskyturbidity.", 
							 ".$zskymiedirectionalg.", 
							 ".$zskymiecoefficient.", 
							 ".$zgroundpositiony.", 
							 ".$zwaterpositiony.", 
							 '".$zalttag."',
							 '".$zuserid."',
							 now(),
							 '".$zuserid."',
							 now(),
							 '".$zuserid."');");
					$zuserauthorizationid = $wtwhandlers->getRandomString(16,1);
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
							('".$zuserauthorizationid."',
							 '".$wtwhandlers->userid."',
							 '".$zcommunityid."',
							 '',
							 '',
							 'admin',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
					$zwebaliasid = $wtwhandlers->getRandomString(16,1);
					$forcehttps = "0";
					if ($wtwhandlers->protocol == "https://") {
						$forcehttps = "1";
					}
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."webaliases
							(webaliasid,
							 domainname,
							 communityid,
							 webalias,
							 forcehttps,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zwebaliasid."',
							 '".$wtwhandlers->domainname."',
							 '".$zcommunityid."',
							 '".$wtwhandlers->domainname."',
							 ".$forcehttps.",
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-importCommunity=".$e->getMessage());
		}
		return $zcommunityid;
	}

	public function saveCommunityTemplate($zcommunityid, $ztemplatename, $zdescription, $ztags) {
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
				if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
					$zuserid = $_SESSION["wtw_userid"];
				}
				$ztemplatename = htmlspecialchars($ztemplatename, ENT_QUOTES, 'UTF-8');
				$zdescription = htmlspecialchars($zdescription, ENT_QUOTES, 'UTF-8');
				$ztags = htmlspecialchars($ztags, ENT_QUOTES, 'UTF-8');
				$zsharehash = $wtwhandlers->getRandomString(16,1);
				$zresponse["sharehash"] = $zsharehash;
				
				$zresults = $wtwhandlers->query("
					select communityid 
					from ".wtw_tableprefix."communities 
					where communityid='".$zcommunityid."' limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundcommunityid = $zrow["communityid"];
				}
				if (!empty($zfoundcommunityid) && isset($zfoundcommunityid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."communities
						set templatename='".$ztemplatename."',
						    tags='".$ztags."',
							description='".$zdescription."',
							sharehash='".$zsharehash."',
							shareuserid='".$zuserid."',
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
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-saveCommunityTemplate=".$e->getMessage());
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
				if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
					$zuserid = $_SESSION["wtw_userid"];
				}
				$zfromurl = "https://3dnet.walktheweb.com/connect/share.php?communityid=".$zcommunityid."&userid=".$zuserid."&sharehash=".$zsharehash."&domainurl=".$wtwhandlers->domainurl;

				if(ini_get('allow_url_fopen') ) {
					$zresponse = file_get_contents($zfromurl);
				} else if (extension_loaded('curl')) {
					$zresponse = curl_init($zfromurl);
				}
				$zresponse = json_decode($zresponse, true);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-shareCommunityTemplate=".$e->getMessage());
		}
		return $zresponse;
	}		
}

	function wtwcommunities() {
		return wtwcommunities::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwcommunities'] = wtwcommunities();	
?>
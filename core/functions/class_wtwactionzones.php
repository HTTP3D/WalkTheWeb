<?php
class wtwactionzones {
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
	
	public function checkActionZone($checkactionzoneid) {
		$zactionzoneid = "";
		global $wtwhandlers;
		try {
			if (!empty($checkactionzoneid) && isset($checkactionzoneid)) {
				$zresults = $wtwhandlers->query("
					select actionzoneid 
					from ".wtw_tableprefix."actionzones 
					where actionzoneid='".$checkactionzoneid."' limit 1;");
				foreach ($zresults as $zrow) {
					$zactionzoneid = $zrow["actionzoneid"];
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwactionzones.php-checkActionZone=".$e->getMessage());
		}
		return $zactionzoneid;
	}
	
	public function saveActionZone($zactionzoneid, $zcommunityid, $zbuildingid, $zthingid, $zactionzonename, $zactionzonetype, $zactionzoneshape, $zattachmoldid, $zmovementtype, $zrotatespeed, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zaxispositionx, $zaxispositiony, $zaxispositionz, $zaxisrotationx, $zaxisrotationy, $zaxisrotationz, $zrotateaxis, $zrotatedegrees, $zrotatedirection, $zmovementdistance, $zloadactionzoneid, $zjsfunction, $zjsparameters) {
		$zsuccess = false;
		global $wtwhandlers;
		try {
			if ($wtwhandlers->checkUpdateAccess($zcommunityid, $zbuildingid, $zthingid)) {
				$foundactionzoneid = $this->checkActionZone($zactionzoneid);
				if (!empty($foundactionzoneid) && isset($foundactionzoneid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."actionzones
						set thingid='".$zthingid."',
							buildingid='".$zbuildingid."',
							communityid='".$zcommunityid."',
							actionzonename='".$wtwhandlers->escapeHTML($zactionzonename)."',
							actionzonetype='".$zactionzonetype."',
							actionzoneshape='".$zactionzoneshape."',
							attachmoldid='".$zattachmoldid."',
							movementtype='".$zmovementtype."',
							positionx=".$wtwhandlers->checkNumber($zpositionx,0).",
							positiony=".$wtwhandlers->checkNumber($zpositiony,0).",
							positionz=".$wtwhandlers->checkNumber($zpositionz,0).",
							scalingx=".$wtwhandlers->checkNumber($zscalingx,1).",
							scalingy=".$wtwhandlers->checkNumber($zscalingy,1).",
							scalingz=".$wtwhandlers->checkNumber($zscalingz,1).",
							rotationx=".$wtwhandlers->checkNumber($zrotationx,0).",
							rotationy=".$wtwhandlers->checkNumber($zrotationy,0).",
							rotationz=".$wtwhandlers->checkNumber($zrotationz,0).",
							axispositionx=".$wtwhandlers->checkNumber($zaxispositionx,0).",
							axispositiony=".$wtwhandlers->checkNumber($zaxispositiony,0).",
							axispositionz=".$wtwhandlers->checkNumber($zaxispositionz,0).",
							axisrotationx=".$wtwhandlers->checkNumber($zaxisrotationx,0).",
							axisrotationy=".$wtwhandlers->checkNumber($zaxisrotationy,0).",
							axisrotationz=".$wtwhandlers->checkNumber($zaxisrotationz,0).",
							rotateaxis='".$zrotateaxis."',
							rotatedegrees=".$wtwhandlers->checkNumber($zrotatedegrees,90).",
							rotatedirection=".$wtwhandlers->checkNumber($zrotatedirection,1).",
							rotatespeed=".$wtwhandlers->checkNumber($zrotatespeed,1).",
							movementdistance=".$wtwhandlers->checkNumber($zmovementdistance,20).",
							loadactionzoneid='".$zloadactionzoneid."',
							jsfunction='".$zjsfunction."',
							jsparameters='".$zjsparameters."',
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where
							actionzoneid='".$zactionzoneid."';");
					$zsuccess = true;
				} else {
					if (empty($zactionzoneid) || !isset($zactionzoneid)) {
						$zactionzoneid = $wtwhandlers->getRandomString(16,1);
					}
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."actionzones
						   (actionzoneid,
							thingid,
							buildingid,
							communityid,
							actionzonename,
							actionzonetype,
							actionzoneshape,
							attachmoldid,
							movementtype,
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
							movementdistance,
							loadactionzoneid,
							jsfunction,
							jsparameters,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						   VALUES
						   ('".$zactionzoneid."',
							'".$zthingid."',
							'".$zbuildingid."',
							'".$zcommunityid."',
							'".$zactionzonename."',
							'".$zactionzonetype."',
							'".$zactionzoneshape."',
							'".$zattachmoldid."',
							'".$zmovementtype."',
							".$wtwhandlers->checkNumber($zpositionx,0).",
							".$wtwhandlers->checkNumber($zpositiony,0).",
							".$wtwhandlers->checkNumber($zpositionz,0).",
							".$wtwhandlers->checkNumber($zscalingx,1).",
							".$wtwhandlers->checkNumber($zscalingy,1).",
							".$wtwhandlers->checkNumber($zscalingz,1).",
							".$wtwhandlers->checkNumber($zrotationx,0).",
							".$wtwhandlers->checkNumber($zrotationy,0).",
							".$wtwhandlers->checkNumber($zrotationz,0).",
							".$wtwhandlers->checkNumber($zaxispositionx,0).",
							".$wtwhandlers->checkNumber($zaxispositiony,0).",
							".$wtwhandlers->checkNumber($zaxispositionz,0).",
							".$wtwhandlers->checkNumber($zaxisrotationx,0).",
							".$wtwhandlers->checkNumber($zaxisrotationy,0).",
							".$wtwhandlers->checkNumber($zaxisrotationz,0).",
							'".$zrotateaxis."',
							".$wtwhandlers->checkNumber($zrotatedegrees,90).",
							".$wtwhandlers->checkNumber($zrotatedirection,1).",
							".$wtwhandlers->checkNumber($zrotatespeed,1).",
							".$wtwhandlers->checkNumber($zmovementdistance,20).",
							'".$zloadactionzoneid."',
							'".$zjsfunction."',
							'".$zjsparameters."',
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');");
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwactionzones.php-saveActionZone=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function deleteActionZone($zactionzoneid, $zcommunityid, $zbuildingid, $zthingid) {
		$zsuccess = false;
		global $wtwhandlers;
		try {
			if ($wtwhandlers->checkUpdateAccess($zcommunityid, $zbuildingid, $zthingid)) {
				$newactionzoneid = "";
				$zactionzonetype = "";
				$zresults = $wtwhandlers->query("
					select * from ".wtw_tableprefix."actionzones
					where actionzoneid='".$zactionzoneid."'
						or (actionzonetype='loadzone'
							and communityid='".$zcommunityid."'
							and (not communityid='')
							and deleted=0)
						or (actionzonetype='loadzone'
							and buildingid='".$zbuildingid."'
							and (not buildingid='')
							and deleted=0)
						or (actionzonetype='loadzone'
							and thingid='".$zthingid."'
							and (not thingid='')
							and deleted=0
							and actionzonetype='loadzone')");
				foreach ($zresults as $zrow) {
					if ($zrow['actionzoneid'] == $zactionzoneid) {
						$zactionzonetype = $zrow['actionzonetype'];
					} else if ($zrow['actionzonetype'] == 'loadzone') {
						if ($zrow['actionzonename'] == "Normal - Load when near") {
							$newactionzoneid = $zrow['actionzoneid'];
						} else if ($zrow['actionzonename'] == "High - Load when far" && $newactionzoneid == "") {
							$newactionzoneid = $zrow['actionzoneid'];
						} else if ($zrow['actionzonename'] == "Extreme Load Zone" && $newactionzoneid == "") {
							$newactionzoneid = $zrow['actionzoneid'];
						} else if ($newactionzoneid == "") {
							$newactionzoneid = $zrow['actionzoneid'];
						}
					}
				}
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones
					set deleted=1,
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where
						actionzoneid='".$zactionzoneid."'
						and thingid='".$zthingid."'
						and buildingid='".$zbuildingid."'
						and communityid='".$zcommunityid."';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones
					set parentactionzoneid='',
						updatedate=now(),
						updateuserid='".$wtwhandlers->userid."'
					where
						parentactionzoneid='".$zactionzoneid."'
						and thingid='".$zthingid."'
						and buildingid='".$zbuildingid."'
						and communityid='".$zcommunityid."';");
				
				if (!empty($newactionzoneid) && isset($newactionzoneid)) {
					if (!empty($zcommunityid) && isset($zcommunityid)) {
						$wtwhandlers->query("
							update ".wtw_tableprefix."communitymolds
							set loadactionzoneid='".$newactionzoneid."',
								updatedate=now(),
								updateuserid='".$wtwhandlers->userid."'
							where
								loadactionzoneid='".$zactionzoneid."'
								and communityid='".$zcommunityid."' 
								and deleted=0;");
					} else if (!empty($zbuildingid) && isset($zbuildingid)) {
						$wtwhandlers->query("
							update ".wtw_tableprefix."buildingmolds
							set loadactionzoneid='".$newactionzoneid."',
								updatedate=now(),
								updateuserid='".$wtwhandlers->userid."'
							where
								loadactionzoneid='".$zactionzoneid."'
								and buildingid='".$zbuildingid."' 
								and deleted=0;");
					} else if (!empty($zthingid) && isset($zthingid)) {
						$wtwhandlers->query("
							update ".wtw_tableprefix."thingmolds
							set loadactionzoneid='".$newactionzoneid."',
								updatedate=now(),
								updateuserid='".$wtwhandlers->userid."'
							where
								loadactionzoneid='".$zactionzoneid."'
								and thingid='".$zthingid."' 
								and deleted=0;");
					}
				}
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwactionzones.php-deleteActionZone=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function importActionZones($zcommunityid, $zbuildingid, $zthingid, $zactionzonesbulk) {
		$zsuccess = false;
		global $wtwhandlers;
		try {
			/* ini_set('max_execution_time', 300); */
			if (!empty($wtwhandlers->getSessionUserID())) {
				if (!empty($zactionzonesbulk)) {
					$zactionzonesbulk = base64_decode($zactionzonesbulk);
					$zactionzones = json_decode($zactionzonesbulk);
					$zrecordeach = 50 / count($zactionzones);
					$i = 50;
					foreach ($zactionzones as $zrow) {
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
								 actionzonename, 
								 actionzonetype, 
								 actionzoneshape, 
								 movementtype, 
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
								 movementdistance, 
								 parentactionzoneid, 
								 jsfunction, 
								 jsparameters,
								 createdate,
								 createuserid,
								 updatedate,
								 updateuserid)
							values
								('".$zactionzoneid."', 
								 '".$zrow->actionzoneid."', 
								 '".$zcommunityid."', 
								 '".$zbuildingid."', 
								 '".$zthingid."', 
								 '".$zrow->attachmoldid."', 
								 '".$zrow->loadactionzoneid."', 
								 '".$wtwhandlers->escapeHTML($zrow->actionzonename)."', 
								 '".$zrow->actionzonetype."', 
								 '".$zrow->actionzoneshape."', 
								 '".$zrow->movementtype."', 
								 ".$wtwhandlers->checkNumber($zrow->positionx,0).", 
								 ".$wtwhandlers->checkNumber($zrow->positiony,0).", 
								 ".$wtwhandlers->checkNumber($zrow->positionz,0).", 
								 ".$wtwhandlers->checkNumber($zrow->scalingx,1).", 
								 ".$wtwhandlers->checkNumber($zrow->scalingy,1).", 
								 ".$wtwhandlers->checkNumber($zrow->scalingz,1).", 
								 ".$wtwhandlers->checkNumber($zrow->rotationx,0).", 
								 ".$wtwhandlers->checkNumber($zrow->rotationy,0).", 
								 ".$wtwhandlers->checkNumber($zrow->rotationz,0).", 
								 ".$wtwhandlers->checkNumber($zrow->axispositionx,0).", 
								 ".$wtwhandlers->checkNumber($zrow->axispositiony,0).", 
								 ".$wtwhandlers->checkNumber($zrow->axispositionz,0).", 
								 ".$wtwhandlers->checkNumber($zrow->axisrotationx,0).", 
								 ".$wtwhandlers->checkNumber($zrow->axisrotationy,0).", 
								 ".$wtwhandlers->checkNumber($zrow->axisrotationz,0).", 
								 '".$zrow->rotateaxis."', 
								 ".$wtwhandlers->checkNumber($zrow->rotatedegrees,90).", 
								 ".$wtwhandlers->checkNumber($zrow->rotatedirection,1).", 
								 ".$wtwhandlers->checkNumber($zrow->rotatespeed,1).", 
								 ".$wtwhandlers->checkNumber($zrow->movementdistance,20).", 
								 '".$zrow->parentactionzoneid."', 
								 '".$zrow->jsfunction."', 
								 '".$zrow->jsparameters."',
								 now(),
								 '".$wtwhandlers->userid."',
								 now(),
								 '".$wtwhandlers->userid."');");
						$i += $zrecordeach;
					}
					$zmoldgroup = "thing";
					$zwebid = $zthingid;
					if (!empty($zcommunityid)) {
						$zmoldgroup = "community";
						$zwebid = $zcommunityid;
					} else if (!empty($zbuildingid)) {
						$zmoldgroup = "building";
						$zwebid = $zbuildingid;
					}
					/* clean up data */
					$wtwhandlers->query("
						update ".wtw_tableprefix."actionzones
						set attachmoldid=''
						where attachmoldid is null 
							and ".$zmoldgroup."id='".$zwebid."';");
					/* update foreign keys to new actionzoneids */
					$wtwhandlers->query("
						update ".wtw_tableprefix."actionzones t1
							inner join (select * 
								from ".wtw_tableprefix."actionzones 
								where ".$zmoldgroup."id='".$zwebid."' 
									and (not ".$zmoldgroup."id='') and deleted=0) t2
							on t1.parentactionzoneid=t2.pastactionzoneid
						set t1.parentactionzoneid=t2.actionzoneid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.parentactionzoneid='')
							and (not t2.actionzoneid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix."actionzones t1
							inner join (select * 
								from ".wtw_tableprefix."actionzones 
								where ".$zmoldgroup."id='".$zwebid."' 
									and (not ".$zmoldgroup."id='') and deleted=0) t2
							on t1.loadactionzoneid=t2.pastactionzoneid
						set t1.loadactionzoneid=t2.actionzoneid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.loadactionzoneid='')
							and (not t2.actionzoneid is null);");
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwactionzones.php-importActionZones=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function updateActionZoneOnCommunityMold($zcommunitymoldid, $zcommunityid, $zactionzoneid) {
		$zsuccess = false;
		global $wtwhandlers;
		try {
			if ($wtwhandlers->checkUpdateAccess($zcommunityid, "", "")) {
				/* update actionzoneid on community mold */
				$wtwhandlers->query("
					update ".wtw_tableprefix."communitymolds
						set actionzoneid='".$zactionzoneid."',
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where communitymoldid='".$zcommunitymoldid."'
							and communityid='".$zcommunityid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwactionzones.php-updateActionZoneOnCommunityMold=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function updateActionZoneCommunityMolds($zcommunitymolds, $zcommunityid, $zactionzoneid) {
		$zsuccess = false;
		global $wtwhandlers;
		try {
			if ($wtwhandlers->checkUpdateAccess($zcommunityid, "", "")) {
				/* $zcommunitymolds is a list of moldids */
				$zmoldids = explode(',', $zcommunitymolds);
				foreach($zmoldids as $zmoldid){
					if (strlen($zmoldid) > 0) {
						if (is_numeric($zmoldid)) {
							$this->updateActionZoneOnCommunityMold($zmoldid, $zcommunityid, $zactionzoneid);
						}
					}
				}
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwactionzones.php-updateActionZoneCommunityMolds=".$e->getMessage());
		}
		return $zsuccess;	
	}
	
	public function updateActionZoneOnBuildingMold($zbuildingmoldid, $zbuildingid, $zactionzoneid) {
		$zsuccess = false;
		global $wtwhandlers;
		try {
			if ($wtwhandlers->checkUpdateAccess("", $zbuildingid, "")) {
				/* update actionzoneid on building mold */
				$wtwhandlers->query("
					update ".wtw_tableprefix."buildingmolds
						set actionzoneid='".$zactionzoneid."',
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where buildingmoldid='".$zbuildingmoldid."'
							and buildingid='".$zbuildingid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwactionzones.php-updateActionZoneOnBuildingMold=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function updateActionZoneBuildingMolds($zbuildingmolds, $zbuildingid, $zactionzoneid) {
		$zsuccess = false;
		global $wtwhandlers;
		try {
			if ($wtwhandlers->checkUpdateAccess("", $zbuildingid, "")) {
				/* $zbuildingmolds is a list of moldids */
				$zmoldids = explode(',', $zbuildingmolds);
				foreach($zmoldids as $zmoldid){
					if (strlen($zmoldid) > 0) {
						if (is_numeric($zmoldid)) {
							$this->updateActionZoneOnBuildingMold($zmoldid, $zbuildingid, $zactionzoneid);
						}
					}
				}
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwactionzones.php-updateActionZoneBuildingMolds=".$e->getMessage());
		}
		return $zsuccess;	
	}
	
	public function updateActionZoneOnThingMold($zthingmoldid, $zthingid, $zactionzoneid) {
		$zsuccess = false;
		global $wtwhandlers;
		try {
			if ($wtwhandlers->checkUpdateAccess("", "", $zthingid)) {
				/* update actionzoneid on thing mold */
				$wtwhandlers->query("
					update ".wtw_tableprefix."thingmolds
						set actionzoneid='".$zactionzoneid."',
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where thingmoldid='".$zthingmoldid."'
							and thingid='".$zthingid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwactionzones.php-updateActionZoneOnThingMold=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function updateActionZoneThingMolds($zthingmolds, $zthingid, $zactionzoneid) {
		$zsuccess = false;
		global $wtwhandlers;
		try {
			if ($wtwhandlers->checkUpdateAccess("", "", $zthingid)) {
				/* $zthingmolds is a list of moldids */
				$zmoldids = explode(',', $zthingmolds); 
				foreach($zmoldids as $zmoldid){
					if (strlen($zmoldid) > 0) {
						if (is_numeric($zmoldid)) {
							$this->updateActionZoneOnThingMold($zmoldid, $zthingid, $zactionzoneid);
						}
					}
				}			
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwactionzones.php-updateActionZoneThingMolds=".$e->getMessage());
		}
		return $zsuccess;	
	}
	
	public function updateActionZoneAvatarAnimation($zactionzoneid, $zavataranimationid, $zcommunityid, $zbuildingid, $zthingid) {
		$zsuccess = false;
		global $wtwhandlers;
		try {
			if ($wtwhandlers->checkUpdateAccess($zcommunityid, $zbuildingid, $zthingid)) {
				$zactionzoneanimationid = "";
				$zresults = $wtwhandlers->query("
					select actionzoneanimationid 
					from ".wtw_tableprefix."actionzoneanimations
					where actionzoneid='".$zactionzoneid."'
						and avataranimationid='".$zavataranimationid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zactionzoneanimationid = $zrow["actionzoneanimationid"];
				}
				
				if (empty($zactionzoneanimationid) || !isset($zactionzoneanimationid)) {
					$zactionzoneanimationid = $wtwhandlers->getRandomString(16,1);
					/* insert avatar animation for action zone */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."actionzoneanimations
							(actionzoneanimationid,
							 actionzoneid,
							 avataranimationid,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
							value
							('".$zactionzoneanimationid."',
							 '".$zactionzoneid."',
							 '".$zavataranimationid."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				} else {
					$wtwhandlers->query("
						update ".wtw_tableprefix."actionzoneanimations
						set deleteddate=null,
							deleteduserid='',
							deleted=0
						where actionzoneanimationid='".$zactionzoneanimationid."'
						limit 1;");
				}
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwactionzones.php-updateActionZoneAvatarAnimation=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function deleteActionZoneAvatarAnimation($zactionzoneid, $zactionzoneanimationid, $zcommunityid, $zbuildingid, $zthingid) {
		$zsuccess = false;
		global $wtwhandlers;
		try {
			if ($wtwhandlers->checkUpdateAccess($zcommunityid, $zbuildingid, $zthingid)) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzoneanimations
					set deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."',
						deleted=1
					where actionzoneanimationid='".$zactionzoneanimationid."'
						and actionzoneid='".$zactionzoneid."'
					limit 1;");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwactionzones.php-deleteActionZoneAvatarAnimation=".$e->getMessage());
		}
		return $zsuccess;
	}
	
}

	function wtwactionzones() {
		return wtwactionzones::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwactionzones'] = wtwactionzones();
?>	
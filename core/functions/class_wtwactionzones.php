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
		global $wtwiframes;
		try {
			if (!empty($checkactionzoneid) && isset($checkactionzoneid)) {
				$zresults = $wtwiframes->query("
					select actionzoneid 
					from ".wtw_tableprefix."actionzones 
					where actionzoneid='".$checkactionzoneid."' limit 1;");
				foreach ($zresults as $zrow) {
					$zactionzoneid = $zrow["actionzoneid"];
				}
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwactionzones.php-checkActionZone=".$e->getMessage());
		}
		return $zactionzoneid;
	}
	
	public function saveActionZone($zactionzoneid, $zcommunityid, $zbuildingid, $zthingid, $zactionzonename, $zactionzonetype, $zactionzoneshape, $zattachmoldid, $zmovementtype, $zrotatespeed, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zaxispositionx, $zaxispositiony, $zaxispositionz, $zaxisrotationx, $zaxisrotationy, $zaxisrotationz, $zrotateaxis, $zrotatedegrees, $zrotatedirection, $zmovementdistance, $zloadactionzoneid, $zjsfunction, $zjsparameters) {
		$zsuccess = false;
		global $wtwiframes;
		try {
			if ($wtwiframes->checkUpdateAccess($zcommunityid, $zbuildingid, $zthingid)) {
				$foundactionzoneid = $this->checkActionZone($zactionzoneid);
				if (!empty($foundactionzoneid) && isset($foundactionzoneid)) {
					$wtwiframes->query("
						update ".wtw_tableprefix."actionzones
						set thingid='".$zthingid."',
							buildingid='".$zbuildingid."',
							communityid='".$zcommunityid."',
							actionzonename='".$wtwiframes->escapeHTML($zactionzonename)."',
							actionzonetype='".$zactionzonetype."',
							actionzoneshape='".$zactionzoneshape."',
							attachmoldid='".$zattachmoldid."',
							movementtype='".$zmovementtype."',
							positionx=".$wtwiframes->checkNumber($zpositionx,0).",
							positiony=".$wtwiframes->checkNumber($zpositiony,0).",
							positionz=".$wtwiframes->checkNumber($zpositionz,0).",
							scalingx=".$wtwiframes->checkNumber($zscalingx,1).",
							scalingy=".$wtwiframes->checkNumber($zscalingy,1).",
							scalingz=".$wtwiframes->checkNumber($zscalingz,1).",
							rotationx=".$wtwiframes->checkNumber($zrotationx,0).",
							rotationy=".$wtwiframes->checkNumber($zrotationy,0).",
							rotationz=".$wtwiframes->checkNumber($zrotationz,0).",
							axispositionx=".$wtwiframes->checkNumber($zaxispositionx,0).",
							axispositiony=".$wtwiframes->checkNumber($zaxispositiony,0).",
							axispositionz=".$wtwiframes->checkNumber($zaxispositionz,0).",
							axisrotationx=".$wtwiframes->checkNumber($zaxisrotationx,0).",
							axisrotationy=".$wtwiframes->checkNumber($zaxisrotationy,0).",
							axisrotationz=".$wtwiframes->checkNumber($zaxisrotationz,0).",
							rotateaxis='".$zrotateaxis."',
							rotatedegrees=".$wtwiframes->checkNumber($zrotatedegrees,90).",
							rotatedirection=".$wtwiframes->checkNumber($zrotatedirection,1).",
							rotatespeed=".$wtwiframes->checkNumber($zrotatespeed,1).",
							movementdistance=".$wtwiframes->checkNumber($zmovementdistance,20).",
							loadactionzoneid='".$zloadactionzoneid."',
							jsfunction='".$zjsfunction."',
							jsparameters='".$zjsparameters."',
							updatedate=now(),
							updateuserid='".$wtwiframes->userid."'
						where
							actionzoneid='".$zactionzoneid."';");
					$zsuccess = true;
				} else {
					$zactionzoneid = $wtwiframes->getRandomString(16,1);
					$wtwiframes->query("
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
							".$wtwiframes->checkNumber($zpositionx,0).",
							".$wtwiframes->checkNumber($zpositiony,0).",
							".$wtwiframes->checkNumber($zpositionz,0).",
							".$wtwiframes->checkNumber($zscalingx,1).",
							".$wtwiframes->checkNumber($zscalingy,1).",
							".$wtwiframes->checkNumber($zscalingz,1).",
							".$wtwiframes->checkNumber($zrotationx,0).",
							".$wtwiframes->checkNumber($zrotationy,0).",
							".$wtwiframes->checkNumber($zrotationz,0).",
							".$wtwiframes->checkNumber($zaxispositionx,0).",
							".$wtwiframes->checkNumber($zaxispositiony,0).",
							".$wtwiframes->checkNumber($zaxispositionz,0).",
							".$wtwiframes->checkNumber($zaxisrotationx,0).",
							".$wtwiframes->checkNumber($zaxisrotationy,0).",
							".$wtwiframes->checkNumber($zaxisrotationz,0).",
							'".$zrotateaxis."',
							".$wtwiframes->checkNumber($zrotatedegrees,90).",
							".$wtwiframes->checkNumber($zrotatedirection,1).",
							".$wtwiframes->checkNumber($zrotatespeed,1).",
							".$wtwiframes->checkNumber($zmovementdistance,20).",
							'".$zloadactionzoneid."',
							'".$zjsfunction."',
							'".$zjsparameters."',
							now(),
							'".$wtwiframes->userid."',
							now(),
							'".$wtwiframes->userid."');");
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwactionzones.php-saveActionZone=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function deleteActionZone($zactionzoneid, $zcommunityid, $zbuildingid, $zthingid) {
		$zsuccess = false;
		global $wtwiframes;
		try {
			if ($wtwiframes->checkUpdateAccess($zcommunityid, $zbuildingid, $zthingid)) {
				$newactionzoneid = "";
				$zactionzonetype = "";
				$zresults = $wtwiframes->query("
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
				$wtwiframes->query("
					update ".wtw_tableprefix."actionzones
					set deleted=1,
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where
						actionzoneid='".$zactionzoneid."'
						and thingid='".$zthingid."'
						and buildingid='".$zbuildingid."'
						and communityid='".$zcommunityid."';");
				$wtwiframes->query("
					update ".wtw_tableprefix."actionzones
					set parentactionzoneid='',
						updatedate=now(),
						updateuserid='".$wtwiframes->userid."'
					where
						parentactionzoneid='".$zactionzoneid."'
						and thingid='".$zthingid."'
						and buildingid='".$zbuildingid."'
						and communityid='".$zcommunityid."';");
				
				if (!empty($newactionzoneid) && isset($newactionzoneid)) {
					if (!empty($zcommunityid) && isset($zcommunityid)) {
						$wtwiframes->query("
							update ".wtw_tableprefix."communitymolds
							set loadactionzoneid='".$newactionzoneid."',
								updatedate=now(),
								updateuserid='".$wtwiframes->userid."'
							where
								loadactionzoneid='".$zactionzoneid."'
								and communityid='".$zcommunityid."' 
								and deleted=0;");
					} else if (!empty($zbuildingid) && isset($zbuildingid)) {
						$wtwiframes->query("
							update ".wtw_tableprefix."buildingmolds
							set loadactionzoneid='".$newactionzoneid."',
								updatedate=now(),
								updateuserid='".$wtwiframes->userid."'
							where
								loadactionzoneid='".$zactionzoneid."'
								and buildingid='".$zbuildingid."' 
								and deleted=0;");
					} else if (!empty($zthingid) && isset($zthingid)) {
						$wtwiframes->query("
							update ".wtw_tableprefix."thingmolds
							set loadactionzoneid='".$newactionzoneid."',
								updatedate=now(),
								updateuserid='".$wtwiframes->userid."'
							where
								loadactionzoneid='".$zactionzoneid."'
								and thingid='".$zthingid."' 
								and deleted=0;");
					}
				}
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwactionzones.php-deleteActionZone=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function importActionZones($zcommunityid, $zbuildingid, $zthingid, $zactionzonesbulk) {
		$zsuccess = false;
		global $wtwiframes;
		try {
			/* ini_set('max_execution_time', 300); */
			if (!empty($wtwiframes->getSessionUserID())) {
				if (!empty($zactionzonesbulk)) {
					$zactionzonesbulk = base64_decode($zactionzonesbulk);
					$zactionzones = json_decode($zactionzonesbulk);
					$zrecordeach = 50 / count($zactionzones);
					$i = 50;
					foreach ($zactionzones as $zrow) {
						$zactionzoneid = $wtwiframes->getRandomString(16,1);
						$wtwiframes->query("
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
								 '".$wtwiframes->escapeHTML($zrow->actionzonename)."', 
								 '".$zrow->actionzonetype."', 
								 '".$zrow->actionzoneshape."', 
								 '".$zrow->movementtype."', 
								 ".$wtwiframes->checkNumber($zrow->positionx,0).", 
								 ".$wtwiframes->checkNumber($zrow->positiony,0).", 
								 ".$wtwiframes->checkNumber($zrow->positionz,0).", 
								 ".$wtwiframes->checkNumber($zrow->scalingx,1).", 
								 ".$wtwiframes->checkNumber($zrow->scalingy,1).", 
								 ".$wtwiframes->checkNumber($zrow->scalingz,1).", 
								 ".$wtwiframes->checkNumber($zrow->rotationx,0).", 
								 ".$wtwiframes->checkNumber($zrow->rotationy,0).", 
								 ".$wtwiframes->checkNumber($zrow->rotationz,0).", 
								 ".$wtwiframes->checkNumber($zrow->axispositionx,0).", 
								 ".$wtwiframes->checkNumber($zrow->axispositiony,0).", 
								 ".$wtwiframes->checkNumber($zrow->axispositionz,0).", 
								 ".$wtwiframes->checkNumber($zrow->axisrotationx,0).", 
								 ".$wtwiframes->checkNumber($zrow->axisrotationy,0).", 
								 ".$wtwiframes->checkNumber($zrow->axisrotationz,0).", 
								 '".$zrow->rotateaxis."', 
								 ".$wtwiframes->checkNumber($zrow->rotatedegrees,90).", 
								 ".$wtwiframes->checkNumber($zrow->rotatedirection,1).", 
								 ".$wtwiframes->checkNumber($zrow->rotatespeed,1).", 
								 ".$wtwiframes->checkNumber($zrow->movementdistance,20).", 
								 '".$zrow->parentactionzoneid."', 
								 '".$zrow->jsfunction."', 
								 '".$zrow->jsparameters."',
								 now(),
								 '".$wtwiframes->userid."',
								 now(),
								 '".$wtwiframes->userid."');");
						$i += $zrecordeach;
						echo "<script>parent.WTW.updateProgressBar(".$i.",100);</script>";
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
					$wtwiframes->query("
						update ".wtw_tableprefix."actionzones
						set attachmoldid=''
						where attachmoldid is null 
							and ".$zmoldgroup."id='".$zwebid."';");
					/* update foreign keys to new actionzoneids */
					$wtwiframes->query("
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
					$wtwiframes->query("
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
			$wtwiframes->serror("core-functions-class_wtwactionzones.php-importActionZones=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function updateActionZoneOnCommunityMold($zcommunitymoldid, $zcommunityid, $zactionzoneid) {
		$zsuccess = false;
		global $wtwiframes;
		try {
			if ($wtwiframes->checkUpdateAccess($zcommunityid, "", "")) {
				/* update actionzoneid on community mold */
				$wtwiframes->query("
					update ".wtw_tableprefix."communitymolds
						set actionzoneid='".$zactionzoneid."',
							updatedate=now(),
							updateuserid='".$wtwiframes->userid."'
						where communitymoldid='".$zcommunitymoldid."'
							and communityid='".$zcommunityid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwactionzones.php-updateActionZoneOnCommunityMold=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function updateActionZoneCommunityMolds($zcommunitymolds, $zcommunityid, $zactionzoneid) {
		$zsuccess = false;
		global $wtwiframes;
		try {
			if ($wtwiframes->checkUpdateAccess($zcommunityid, "", "")) {
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
			$wtwiframes->serror("core-functions-class_wtwactionzones.php-updateActionZoneCommunityMolds=".$e->getMessage());
		}
		return $zsuccess;	
	}
	
	public function updateActionZoneOnBuildingMold($zbuildingmoldid, $zbuildingid, $zactionzoneid) {
		$zsuccess = false;
		global $wtwiframes;
		try {
			if ($wtwiframes->checkUpdateAccess("", $zbuildingid, "")) {
				/* update actionzoneid on building mold */
				$wtwiframes->query("
					update ".wtw_tableprefix."buildingmolds
						set actionzoneid='".$zactionzoneid."',
							updatedate=now(),
							updateuserid='".$wtwiframes->userid."'
						where buildingmoldid='".$zbuildingmoldid."'
							and buildingid='".$zbuildingid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwactionzones.php-updateActionZoneOnBuildingMold=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function updateActionZoneBuildingMolds($zbuildingmolds, $zbuildingid, $zactionzoneid) {
		$zsuccess = false;
		global $wtwiframes;
		try {
			if ($wtwiframes->checkUpdateAccess("", $zbuildingid, "")) {
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
			$wtwiframes->serror("core-functions-class_wtwactionzones.php-updateActionZoneBuildingMolds=".$e->getMessage());
		}
		return $zsuccess;	
	}
	
	public function updateActionZoneOnThingMold($zthingmoldid, $zthingid, $zactionzoneid) {
		$zsuccess = false;
		global $wtwiframes;
		try {
			if ($wtwiframes->checkUpdateAccess("", "", $zthingid)) {
				/* update actionzoneid on thing mold */
				$wtwiframes->query("
					update ".wtw_tableprefix."thingmolds
						set actionzoneid='".$zactionzoneid."',
							updatedate=now(),
							updateuserid='".$wtwiframes->userid."'
						where thingmoldid='".$zthingmoldid."'
							and thingid='".$zthingid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwactionzones.php-updateActionZoneOnThingMold=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function updateActionZoneThingMolds($zthingmolds, $zthingid, $zactionzoneid) {
		$zsuccess = false;
		global $wtwiframes;
		try {
			if ($wtwiframes->checkUpdateAccess("", "", $zthingid)) {
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
			$wtwiframes->serror("core-functions-class_wtwactionzones.php-updateActionZoneThingMolds=".$e->getMessage());
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
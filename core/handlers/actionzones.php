<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwactionzones.php');
	global $wtwactionzones;
	$zresults = file_get_contents('php://input');
	$zdata = json_decode($zresults, TRUE);

	$zfunction = null;
	$zactionzoneid = '';
	$zcommunityid = '';
	$zbuildingid = '';
	$zthingid = '';
	$zactionzonename = '';
	$zactionzonetype = '';
	$zactionzoneshape = '';
	$zattachmoldid = '';
	$zmovementtype = '';
	$zrotatespeed = '1';
	$zpositionx = '0';
	$zpositiony = '0';
	$zpositionz = '0';
	$zscalingx = '1';
	$zscalingy = '1';
	$zscalingz = '1';
	$zrotationx = '0';
	$zrotationy = '0';
	$zrotationz = '0';
	$zaxispositionx = '0';
	$zaxispositiony = '0';
	$zaxispositionz = '0';
	$zaxisscalingx = '1';
	$zaxisscalingy = '1';
	$zaxisscalingz = '1';
	$zaxisrotationx = '0';
	$zaxisrotationy = '0';
	$zaxisrotationz = '0';
	$zrotateaxis = 'y';
	$zrotatedegrees = '90';
	$zrotatedirection = '1';
	$zloadactionzoneid = '';
	$zjsfunction = '';
	$zjsparameters = '';
	$zmoldswithactionzones = '';
	$zavataranimationid = '';
	$zactionzonesbulk = '';
	
	if (!empty($zdata) && isset($zdata)) {
		if (isset($zdata["function"])) {
			$zfunction = strtolower($zdata["function"]);
		}
		if (isset($zdata["actionzoneid"])) {
			$zactionzoneid = $zdata["actionzoneid"];
		}
		if (isset($zdata["communityid"])) {
			$zcommunityid = $zdata["communityid"];
		}
		if (isset($zdata["buildingid"])) {
			$zbuildingid = $zdata["buildingid"];
		}
		if (isset($zdata["thingid"])) {
			$zthingid = $zdata["thingid"];
		}
		if (isset($zdata["actionzonename"])) {
			$zactionzonename = $zdata["actionzonename"];
		}
		if (isset($zdata["actionzonetype"])) {
			$zactionzonetype = $zdata["actionzonetype"];
		}
		if (isset($zdata["actionzoneshape"])) {
			$zactionzoneshape = $zdata["actionzoneshape"];
		}
		if (isset($zdata["attachmoldid"])) {
			$zattachmoldid = $zdata["attachmoldid"];
		}
		if (isset($zdata["movementtype"])) {
			$zmovementtype = $zdata["movementtype"];
		}
		if (isset($zdata["rotatespeed"])) {
			$zrotatespeed = $zdata["rotatespeed"];
		}
		if (isset($zdata["positionx"])) {
			$zpositionx = $zdata["positionx"];
		}
		if (isset($zdata["positiony"])) {
			$zpositiony = $zdata["positiony"];
		}
		if (isset($zdata["positionz"])) {
			$zpositionz = $zdata["positionz"];
		}
		if (isset($zdata["scalingx"])) {
			$zscalingx = $zdata["scalingx"];
		}
		if (isset($zdata["scalingy"])) {
			$zscalingy = $zdata["scalingy"];
		}
		if (isset($zdata["scalingz"])) {
			$zscalingz = $zdata["scalingz"];
		}
		if (isset($zdata["rotationx"])) {
			$zrotationx = $zdata["rotationx"];
		}
		if (isset($zdata["rotationy"])) {
			$zrotationy = $zdata["rotationy"];
		}
		if (isset($zdata["rotationz"])) {
			$zrotationz = $zdata["rotationz"];
		}
		if (isset($zdata["axispositionx"])) {
			$zaxispositionx = $zdata["axispositionx"];
		}
		if (isset($zdata["axispositiony"])) {
			$zaxispositiony = $zdata["axispositiony"];
		}
		if (isset($zdata["axispositionz"])) {
			$zaxispositionz = $zdata["axispositionz"];
		}
		if (isset($zdata["axisscalingx"])) {
			$zaxisscalingx = $zdata["axisscalingx"];
		}
		if (isset($zdata["axisscalingy"])) {
			$zaxisscalingy = $zdata["axisscalingy"];
		}
		if (isset($zdata["axisscalingz"])) {
			$zaxisscalingz = $zdata["axisscalingz"];
		}
		if (isset($zdata["axisrotationx"])) {
			$zaxisrotationx = $zdata["axisrotationx"];
		}
		if (isset($zdata["axisrotationy"])) {
			$zaxisrotationy = $zdata["axisrotationy"];
		}
		if (isset($zdata["axisrotationz"])) {
			$zaxisrotationz = $zdata["axisrotationz"];
		}
		if (isset($zdata["rotateaxis"])) {
			$zrotateaxis = $zdata["rotateaxis"];
		}
		if (isset($zdata["rotatedegrees"])) {
			$zrotatedegrees = $zdata["rotatedegrees"];
		}
		if (isset($zdata["rotatedirection"])) {
			$zrotatedirection = $zdata["rotatedirection"];
		}
		if (isset($zdata["loadactionzoneid"])) {
			$zloadactionzoneid = $zdata["loadactionzoneid"];
		}
		if (isset($zdata["jsfunction"])) {
			$zjsfunction = $zdata["jsfunction"];
		}
		if (isset($zdata["jsparameters"])) {
			$zjsparameters = $zdata["jsparameters"];
		}
		if (isset($zdata["moldswithactionzones"])) {
			$zmoldswithactionzones = $zdata["moldswithactionzones"];
		}
		if (isset($zdata["avataranimationid"])) {
			$zavataranimationid = $zdata["avataranimationid"];
		}
		if (isset($zdata["actionzonesbulk"])) {
			$zactionzonesbulk = $zdata["actionzonesbulk"];
		}
	}

	$zresponse = array();
	switch ($zfunction) {
		case "saveactionzone":
			if ($wtwactionzones->saveActionZone($zactionzoneid, $zcommunityid, $zbuildingid, $zthingid, $zactionzonename, $zactionzonetype, $zactionzoneshape, $zattachmoldid, $zmovementtype, $zrotatespeed, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zaxispositionx, $zaxispositiony, $zaxispositionz, $zaxisrotationx, $zaxisrotationy, $zaxisrotationz, $zrotateaxis, $zrotatedegrees, $zrotatedirection, $zaxisscalingz, $zloadactionzoneid, $zjsfunction, $zjsparameters) == false) {
				$zresponse = array(
					'serror'=> 'Could not save Action Zone'
				);
			}
			break;
		case "deleteactionzone":
			if ($wtwactionzones->deleteActionZone($zactionzoneid, $zcommunityid, $zbuildingid, $zthingid) == false) {
				$zresponse = array(
					'serror'=> 'Could not delete Action Zone'
				);
			}
			break;
		case "removeactionzone":
			if (!empty($zcommunityid)) {
				if ($wtwactionzones->updateActionZoneCommunityMolds($zmoldswithactionzones, $zcommunityid, $zactionzoneid) == false) {
					$zresponse = array(
						'serror'=> 'Could not update Community Mold'
					);
				}
			} else if (!empty($zbuildingid)) {
				if ($wtwactionzones->updateActionZoneBuildingMolds($zmoldswithactionzones, $zbuildingid, $zactionzoneid) == false) {
					$zresponse = array(
						'serror'=> 'Could not update Building Mold'
					);
				}
			} else if (!empty($zthingid)) {
				if ($wtwactionzones->updateActionZoneThingMolds($zmoldswithactionzones, $zthingid, $zactionzoneid) == false) {
					$zresponse = array(
						'serror'=> 'Could not update Thing Mold'
					);
				}
			}
			break;
		case "saveavataranimation":
			$wtwactionzones->updateActionZoneAvatarAnimation($zactionzoneid, $zavataranimationid, $zcommunityid, $zbuildingid, $zthingid);
			break;
		case "deleteavataranimation":
			$wtwactionzones->deleteActionZoneAvatarAnimation($zactionzoneid, $zavataranimationid, $zcommunityid, $zbuildingid, $zthingid);
			break;
		case "importactionzone":
			$wtwactionzones->importActionZones($zcommunityid, $zbuildingid, $zthingid, $zactionzonesbulk);
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-actionzones.php=".$e->getMessage());
}
?>
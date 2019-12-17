<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwbuildings.php');
	global $wtwbuildings;
	$zresults = file_get_contents('php://input');
	$zdata = json_decode($zresults, TRUE);

	$zfunction = null;
	$zbuildingid = '';
	$zpastbuildingid = '';
	$zbuildingname = '';
	$zdescription = '';
	$ztags = '';
	$zanalyticsid = '';
	$zalttag = '';
	$zpositionx = 0;
	$zpositiony = 0;
	$zpositionz = 0;
	$zscalingx = 1;
	$zscalingy = 1;
	$zscalingz = 1;
	$zrotationx = 0;
	$zrotationy = 0;
	$zrotationz = 0;
	$zgravity = 9.8;

	if (!empty($zdata) && isset($zdata)) {
		if (isset($zdata["function"])) {
			$zfunction = strtolower($zdata["function"]);
		}
		if (isset($zdata["buildingid"])) {
			$zbuildingid = $zdata["buildingid"];
		}
		if (isset($zdata["pastbuildingid"])) {
			$zpastbuildingid = $zdata["pastbuildingid"];
		}
		if (isset($zdata["buildingname"])) {
			$zbuildingname = $zdata["buildingname"];
		}
		if (isset($zdata["description"])) {
			$zdescription = $zdata["description"];
		}
		if (isset($zdata["tags"])) {
			$ztags = $zdata["tags"];
		}
		if (isset($zdata["analyticsid"])) {
			$zanalyticsid = $zdata["analyticsid"];
		}
		if (isset($zdata["alttag"])) {
			$zalttag = $zdata["alttag"];
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
		if (isset($zdata["gravity"])) {
			$zgravity = $zdata["gravity"];
		}
	}

	$zresponse = array();
	switch ($zfunction) {
		case "savebuilding":
			$zbuildingid = $wtwbuildings->saveBuilding($zbuildingid, $zpastbuildingid, $zbuildingname, $zanalyticsid, $zalttag, 0);
			break;
		case "deletebuilding":
			$wtwbuildings->deleteBuilding($zbuildingid);
			break;
		case "savestartposition":
			$wtwbuildings->saveBuildingStartPosition($zbuildingid, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz);
			break;
		case "savegravity":
			$wtwbuildings->saveBuildingGravity($zbuildingid, $zgravity);
			break;
		case "sharebuildingtemplate":
			$wtwbuildings->shareBuildingTemplate($zbuildingid, $zbuildname, $zdescription, $ztags);
			break;
		case "savetempbuilding":
			$zbuildingid = $wtwbuildings->saveTemplateBuilding($zpastbuildingid);
			break;
		case "importbuilding":
			$zbuildingid = $wtwbuildings->importBuilding($zbuildingid, $zpastbuildingid, $zbuildingname, $zanalyticsid, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zgravity, $zalttag);
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-buildings.php=".$e->getMessage());
}
?>
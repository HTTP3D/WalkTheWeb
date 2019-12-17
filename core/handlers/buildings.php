<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwbuildings.php');
	global $wtwbuildings;
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);

	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zbuildingid = $wtwhandlers->getPost('buildingid','');
	$zpastbuildingid = $wtwhandlers->getPost('pastbuildingid','');
	$zbuildingname = $wtwhandlers->getPost('buildingname','');
	$zdescription = $wtwhandlers->getPost('description','');
	$ztags = $wtwhandlers->getPost('tags','');
	$zanalyticsid = $wtwhandlers->getPost('analyticsid','');
	$zalttag = $wtwhandlers->getPost('alttag','');
	$zpositionx = $wtwhandlers->getPost('positionx','0');
	$zpositiony = $wtwhandlers->getPost('positiony','0');
	$zpositionz = $wtwhandlers->getPost('positionz','0');
	$zscalingx = $wtwhandlers->getPost('scalingx','1');
	$zscalingy = $wtwhandlers->getPost('scalingy','1');
	$zscalingz = $wtwhandlers->getPost('scalingz','1');
	$zrotationx = $wtwhandlers->getPost('rotationx','0');
	$zrotationy = $wtwhandlers->getPost('rotationy','0');
	$zrotationz = $wtwhandlers->getPost('rotationz','0');
	$zgravity = $wtwhandlers->getPost('gravity','9.8');

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
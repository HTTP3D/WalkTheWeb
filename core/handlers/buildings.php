<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for building functions */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwbuildings.php');
	global $wtwbuildings;
	$zrequest = $wtwhandlers->openFilefromURL('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	
	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zbuildingid = $wtwhandlers->getPost('buildingid','');
	$zversionid = $wtwhandlers->getPost('versionid','');
	$zversion = $wtwhandlers->getPost('version','');
	$zversiondesc = $wtwhandlers->decode64($wtwhandlers->getPost('versiondesc',''));
	$zpastbuildingid = $wtwhandlers->getPost('pastbuildingid','');
	$zbuildingname = $wtwhandlers->decode64($wtwhandlers->getPost('buildingname',''));
	$zbuildingdescription = $wtwhandlers->decode64($wtwhandlers->getPost('buildingdescription',''));
	$zanalyticsid = $wtwhandlers->getPost('analyticsid','');
	$zalttag = $wtwhandlers->decode64($wtwhandlers->getPost('alttag',''));
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

	/* select the function called */
	$zresponse = array();
	switch ($zfunction) {
		case "savebuilding":
			$zbuildingid = $wtwbuildings->saveBuilding($zbuildingid, $zpastbuildingid, $zversionid, $zversion, $zversiondesc, $zbuildingname, $zbuildingdescription, $zanalyticsid, $zalttag);
			$zresponse = array(
				'buildingid'=> $zbuildingid
			);
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
	}

	/* set headers to keep data local to server */
	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	/* return the response from the function */
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-buildings.php=".$e->getMessage());
}
?>
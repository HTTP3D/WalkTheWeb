<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwthings.php');
	global $wtwthings;
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);

	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zthingid = $wtwhandlers->getPost('thingid','');
	$zpastthingid = $wtwhandlers->getPost('pastthingid','');
	$zthingname = $wtwhandlers->getPost('thingname','');
	$zanalyticsid = $wtwhandlers->getPost('analyticsid','');
	$zalttag = $wtwhandlers->getPost('alttag','');
	$zpositionx = $wtwhandlers->getPost('positionx','0');
	$zpositiony = $wtwhandlers->getPost('positiony','0');;
	$zpositionz = $wtwhandlers->getPost('positionz','0');;
	$zscalingx = $wtwhandlers->getPost('scalingx','1');;
	$zscalingy = $wtwhandlers->getPost('scalingy','1');;
	$zscalingz = $wtwhandlers->getPost('scalingz','1');
	$zrotationx = $wtwhandlers->getPost('rotationx','0');;
	$zrotationy = $wtwhandlers->getPost('rotationy','0');;
	$zrotationz = $wtwhandlers->getPost('rotationz','0');;
	$zgravity = $wtwhandlers->getPost('gravity','9.8');
	$zdescription = $wtwhandlers->getPost('description','');
	$ztags = $wtwhandlers->getPost('tags','');
	
	$zresponse = array();
	switch ($zfunction) {
		case "savething":
			$zthingid = $wtwthings->saveThing($zthingid, $zpastthingid, $zthingname, $zanalyticsid, $zalttag);
			$zresponse = array(
				'thingid'=> $zthingid
			);
			break;
		case "deletething":
			$wtwthings->deleteThing($zthingid);
			break;
		case "savestartposition":
			$wtwthings->saveThingStartPosition($zthingid, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz);
			break;
		case "savegravity":
			//$wtwthings->saveThingGravity($zthingid, $zgravity);
			break;
		case "addmusthave":
			$zthings = $wtwthings->addMustHave();
			$zresponse = array(
				'things'=> $zthings
			);
			break;
		case "importthing":
			$zthingid = $wtwthings->importThing($zthingid, $zpastthingid, $zthingname, $zanalyticsid, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zgravity, $zalttag);
			break;
		case "sharethingtemplate":
			$wtwthings->shareThingTemplate($zthingid, $zthingname, $zdescription, $ztags);
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-things.php=".$e->getMessage());
}
?>
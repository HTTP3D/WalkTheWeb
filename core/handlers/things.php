<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for thing functions */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwthings.php');
	global $wtwthings;
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	
	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zthingid = $wtwhandlers->getPost('thingid','');
	$zpastthingid = $wtwhandlers->getPost('pastthingid','');
	$zthingname = base64_decode($wtwhandlers->getPost('thingname',''));
	$zanalyticsid = $wtwhandlers->getPost('analyticsid','');
	$zalttag = base64_decode($wtwhandlers->getPost('alttag',''));
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
	$zdescription = base64_decode($wtwhandlers->getPost('description',''));
	$ztags = base64_decode($wtwhandlers->getPost('tags',''));
	$zsharehash = $wtwhandlers->getPost('sharehash','');
	
	/* select the function called */
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
		case "importthing":
			$zthingid = $wtwthings->importThing($zthingid, $zpastthingid, $zthingname, $zanalyticsid, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zgravity, $zalttag);
			$zresponse = array(
				'thingid'=> $zthingid
			);
			break;
		case "savethingtemplate":
			$zresponse = $wtwthings->saveThingTemplate($zthingid, $zthingname, $zdescription, $ztags);
			break;
		case "sharethingtemplate":
			$zresponse = $wtwthings->shareThingTemplate($zthingid, $zsharehash);
			break;
	}

	/* set headers to keep data local to server */
	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	/* return the response from the function */
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-things.php=".$e->getMessage());
}
?>
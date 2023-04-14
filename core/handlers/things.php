<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for thing functions */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwthings.php');
	global $wtwthings;
	$zrequest = $wtwhandlers->openFilefromURL('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	
	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zthingid = $wtwhandlers->getPost('thingid','');
	$zpastthingid = $wtwhandlers->getPost('pastthingid','');
	$zversionid = $wtwhandlers->getPost('versionid','');
	$zversion = $wtwhandlers->getPost('version','');
	$zversiondesc = $wtwhandlers->decode64($wtwhandlers->getPost('versiondesc',''));
	$zthingname = $wtwhandlers->decode64($wtwhandlers->getPost('thingname',''));
	$zthingdescription = $wtwhandlers->decode64($wtwhandlers->getPost('thingdescription',''));
	$zanalyticsid = $wtwhandlers->getPost('analyticsid','');
	$zalttag = $wtwhandlers->decode64($wtwhandlers->getPost('alttag',''));
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
	
	/* select the function called */
	$zresponse = array();
	switch ($zfunction) {
		case "savething":
			$zthingid = $wtwthings->saveThing($zthingid, $zpastthingid, $zversionid, $zversion, $zversiondesc, $zthingname, $zthingdescription, $zanalyticsid, $zalttag);
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
	}

	/* set headers to keep data local to server */
	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	/* return the response from the function */
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-things.php=".$e->getMessage());
}
?>
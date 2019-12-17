<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwthings.php');
	global $wtwthings;
	$zresults = file_get_contents('php://input');
	$zdata = json_decode($zresults, TRUE);

	$zfunction = null;
	$zthingid = '';
	$zpastthingid = '';
	$zthingname = '';
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
	$zgravity = '9.8';
	$zdescription = '';
	$ztags = '';
	
	if (!empty($zdata) && isset($zdata)) {
		if (isset($zdata["function"])) {
			$zfunction = strtolower($zdata["function"]);
		}
		if (isset($zdata["thingid"])) {
			$zthingid = $zdata["thingid"];
		}
		if (isset($zdata["pastthingid"])) {
			$zpastthingid = $zdata["pastthingid"];
		}
		if (isset($zdata["thingname"])) {
			$zthingname = $zdata["thingname"];
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
		if (isset($zdata["description"])) {
			$zdescription = $zdata["description"];
		}
		if (isset($zdata["tags"])) {
			$ztags = $zdata["tags"];
		}
	}

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
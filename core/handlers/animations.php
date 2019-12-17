<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwanimations.php');
	global $wtwanimations;
	$zresults = file_get_contents('php://input');
	$zdata = json_decode($zresults, TRUE);

	$zfunction = null;
	$zuploadobjectid = '';
	$zobjectanimationid = '';
	$zanimationname = '';
	$zmoldevent = '';
	$zmoldnamepart = '';
	$zstartframe = '0';
	$zendframe = '0';
	$zanimationloop = '1';
	$zspeedratio = '1';
	$zanimationendscript = '';
	$zanimationendparameters = '';
	$zstopcurrentanimations = '';
	$zobjectsoundid = '';
	$zobjectmaxdistance = '100';
	
	if (!empty($zdata) && isset($zdata)) {
		if (isset($zdata["function"])) {
			$zfunction = strtolower($zdata["function"]);
		}
		if (isset($zdata["uploadobjectid"])) {
			$zuploadobjectid = $zdata["uploadobjectid"];
		}
		if (isset($zdata["objectanimationid"])) {
			$zobjectanimationid = $zdata["objectanimationid"];
		}
		if (isset($zdata["animationname"])) {
			$zanimationname = $zdata["animationname"];
		}
		if (isset($zdata["moldevent"])) {
			$zmoldevent = $zdata["moldevent"];
		}
		if (isset($zdata["moldnamepart"])) {
			$zmoldnamepart = $zdata["moldnamepart"];
		}
		if (isset($zdata["startframe"])) {
			$zstartframe = $zdata["startframe"];
		}
		if (isset($zdata["endframe"])) {
			$zendframe = $zdata["endframe"];
		}
		if (isset($zdata["animationloop"])) {
			$zanimationloop = $zdata["animationloop"];
		}
		if (isset($zdata["speedratio"])) {
			$zspeedratio = $zdata["speedratio"];
		}
		if (isset($zdata["animationendscript"])) {
			$zanimationendscript = $zdata["animationendscript"];
		}
		if (isset($zdata["animationendparameters"])) {
			$zanimationendparameters = $zdata["animationendparameters"];
		}
		if (isset($zdata["stopcurrentanimations"])) {
			$zstopcurrentanimations = $zdata["stopcurrentanimations"];
		}
		if (isset($zdata["objectsoundid"])) {
			$zobjectsoundid = $zdata["objectsoundid"];
		}
		if (isset($zdata["objectmaxdistance"])) {
			$zobjectmaxdistance = $zdata["objectmaxdistance"];
		}
	}

	$zresponse = array();
	switch ($zfunction) {
		case "getuploadedfileanimationsdetails":
			$zresponse = $wtwanimations->getUploadedFileAnimationsDetails($zuploadobjectid);
			break;
		case "getobjectanimation":
			$zresponse = $wtwanimations->getObjectAnimation($zobjectanimationid);
			break;
		case "saveobjectanimation":
			$wtwanimations->saveObjectAnimation($zobjectanimationid, $zuploadobjectid, $zanimationname, $zmoldevent, $zmoldnamepart, $zstartframe, $zendframe, $zanimationloop, $zspeedratio, $zanimationendscript, $zanimationendparameters, $zstopcurrentanimations, $zobjectsoundid, $zobjectmaxdistance);
			break;
		case "deleteobjectanimation":
			$wtwanimations->deleteObjectAnimation($zobjectanimationid);
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-animations.php=".$e->getMessage());
}
?>
<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for animation functions */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwanimations.php');
	global $wtwanimations;
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	
	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zuploadobjectid = $wtwhandlers->getPost('uploadobjectid','');
	$zobjectanimationid = $wtwhandlers->getPost('objectanimationid','');
	$zanimationname = $wtwhandlers->getPost('animationname','');
	$zmoldevent = $wtwhandlers->getPost('moldevent','');
	$zmoldnamepart = $wtwhandlers->getPost('moldnamepart','');
	$zstartframe = $wtwhandlers->getPost('startframe','0');
	$zendframe = $wtwhandlers->getPost('endframe','0');
	$zanimationloop = $wtwhandlers->getPost('animationloop','1');
	$zspeedratio = $wtwhandlers->getPost('speedratio','1');
	$zanimationendscript = $wtwhandlers->getPost('animationendscript','');
	$zanimationendparameters = $wtwhandlers->getPost('animationendparameters','');
	$zstopcurrentanimations = $wtwhandlers->getPost('stopcurrentanimations','');
	$zobjectsoundid = $wtwhandlers->getPost('objectsoundid','');
	$zobjectmaxdistance = $wtwhandlers->getPost('objectmaxdistance','100');
	
	/* select the function called */
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

	/* set headers to keep data local to server */
	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	/* return the response from the function */
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-animations.php=".$e->getMessage());
}
?>
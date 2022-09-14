<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for connecting grid functions */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwconnectinggrids.php');
	global $wtwconnectinggrids;
	$zrequest = $wtwhandlers->openFilefromURL('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	
	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zconnectinggridid = $wtwhandlers->getPost('connectinggridid','');
	$zparentserverfranchiseid = $wtwhandlers->getPost('parentserverfranchiseid','');
	$zparentwebid = $wtwhandlers->getPost('parentwebid','');
	$zparentwebtype = $wtwhandlers->getPost('parentwebtype','');
	$zchildserverfranchiseid = $wtwhandlers->getPost('childserverfranchiseid','');
	$zchildwebid = $wtwhandlers->getPost('childwebid','');
	$zchildwebtype = $wtwhandlers->getPost('childwebtype','');
	$zloadactionzoneid = $wtwhandlers->getPost('loadactionzoneid','');
	$zaltloadactionzoneid = $wtwhandlers->getPost('altloadactionzoneid','');
	$zpositionx = $wtwhandlers->getPost('positionx','0');
	$zpositiony = $wtwhandlers->getPost('positiony','0');
	$zpositionz = $wtwhandlers->getPost('positionz','0');
	$zscalingx = $wtwhandlers->getPost('scalingx','1');
	$zscalingy = $wtwhandlers->getPost('scalingy','1');
	$zscalingz = $wtwhandlers->getPost('scalingz','1');
	$zrotationx = $wtwhandlers->getPost('rotationx','0');
	$zrotationy = $wtwhandlers->getPost('rotationy','0');
	$zrotationz = $wtwhandlers->getPost('rotationz','0');
	$zalttag = $wtwhandlers->getPost('alttag','');
	$zwebtype = $wtwhandlers->getPost('webtype','');
	$zwebid = $wtwhandlers->getPost('webid','');
	$zconnectinggridsbulk = $wtwhandlers->getPost('connectinggridsbulk','');
	
	/* select the function called */
	$zresponse = array();
	switch ($zfunction) {
		case "saveconnectinggrid":
			$zconnectinggridid = $wtwconnectinggrids->saveConnectingGrid($zconnectinggridid, $zparentserverfranchiseid, $zparentwebid, $zparentwebtype, $zchildserverfranchiseid, $zchildwebid, $zchildwebtype, $zloadactionzoneid, $zaltloadactionzoneid, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zalttag);
			break;
		case "deleteconnectinggrid":
			$wtwconnectinggrids->deleteConnectingGrid($zconnectinggridid);
			break;
		case "updatechildconnectinggrids":
			$wtwconnectinggrids->updateChildConnectingGrid($zwebtype, $zwebid);
			break;
		case "importconnectinggrids":
			$wtwconnectinggrids->importConnectingGrids('child', $zwebtype, $zwebid, $zconnectinggridsbulk);
			break;
		case "importparentconnectinggrids":
			$wtwconnectinggrids->importConnectingGrids('parent', $zwebtype, $zwebid, $zconnectinggridsbulk);
			break;
	}

	/* set headers to keep data local to server */
	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	/* return the response from the function */
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-connectinggrids.php=".$e->getMessage());
}
?>
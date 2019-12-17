<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwconnectinggrids.php');
	global $wtwconnectinggrids;
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);

	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zconnectinggridid = $wtwhandlers->getPost('connectinggridid','');
	$zparentwebid = $wtwhandlers->getPost('parentwebid','');
	$zparentwebtype = $wtwhandlers->getPost('parentwebtype','');
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
	$zmoldgroup = $wtwhandlers->getPost('moldgroup','');
	$zwebid = $wtwhandlers->getPost('webid','');
	$zconnectinggridsbulk = $wtwhandlers->getPost('connectinggridsbulk','');
	
	$zresponse = array();
	switch ($zfunction) {
		case "saveconnectinggrid":
			$zconnectinggridid = $wtwconnectinggrids->saveConnectingGrid($zconnectinggridid, $zparentwebid, $zparentwebtype, $zchildwebid, $zchildwebtype, $zloadactionzoneid, $zaltloadactionzoneid, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zalttag);
			break;
		case "deleteconnectinggrid":
			$wtwconnectinggrids->deleteConnectingGrid($zconnectinggridid);
			break;
		case "updatechildconnectinggrids":
			$wtwconnectinggrids->updateChildConnectingGrid($zmoldgroup, $zwebid);
			break;
		case "importconnectinggrids":
			$wtwconnectinggrids->importConnectingGrids('child', $zmoldgroup, $zwebid, $zconnectinggridsbulk);
			break;
		case "importparentconnectinggrids":
			$wtwconnectinggrids->importConnectingGrids('parent', $zmoldgroup, $zwebid, $zconnectinggridsbulk);
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-connectinggrids.php=".$e->getMessage());
}
?>
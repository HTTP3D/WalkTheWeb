<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwconnectinggrids.php');
	global $wtwconnectinggrids;
	$zresults = file_get_contents('php://input');
	$zdata = json_decode($zresults, TRUE);

	$zfunction = null;
	$zconnectinggridid = '';
	$zparentwebid = '';
	$zparentwebtype = '';
	$zchildwebid = '';
	$zchildwebtype = '';
	$zloadactionzoneid = '';
	$zaltloadactionzoneid = '';
	$zpositionx = 0;
	$zpositiony = 0;
	$zpositionz = 0;
	$zscalingx = 1;
	$zscalingy = 1;
	$zscalingz = 1;
	$zrotationx = 0;
	$zrotationy = 0;
	$zrotationz = 0;
	$zalttag = '';
	$zmoldgroup = '';
	$zwebid = '';
	$zconnectinggridsbulk = '';
	
	if (!empty($zdata) && isset($zdata)) {
		if (isset($zdata["function"])) {
			$zfunction = strtolower($zdata["function"]);
		}
		if (isset($zdata["connectinggridid"])) {
			$zconnectinggridid = $zdata["connectinggridid"];
		}
		if (isset($zdata["parentwebid"])) {
			$zparentwebid = $zdata["parentwebid"];
		}
		if (isset($zdata["parentwebtype"])) {
			$zparentwebtype = $zdata["parentwebtype"];
		}
		if (isset($zdata["childwebid"])) {
			$zchildwebid = $zdata["childwebid"];
		}
		if (isset($zdata["childwebtype"])) {
			$zchildwebtype = $zdata["childwebtype"];
		}
		if (isset($zdata["loadactionzoneid"])) {
			$zloadactionzoneid = $zdata["loadactionzoneid"];
		}
		if (isset($zdata["altloadactionzoneid"])) {
			$zaltloadactionzoneid = $zdata["altloadactionzoneid"];
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
		if (isset($zdata["alttag"])) {
			$zalttag = $zdata["alttag"];
		}
		if (isset($zdata["moldgroup"])) {
			$zmoldgroup = $zdata["moldgroup"];
		}
		if (isset($zdata["webid"])) {
			$zwebid = $zdata["webid"];
		}
		if (isset($zdata["connectinggridsbulk"])) {
			$zconnectinggridsbulk = $zdata["connectinggridsbulk"];
		}
	}

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
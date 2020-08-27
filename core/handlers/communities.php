<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for community functions */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwcommunities.php');
	global $wtwcommunities;
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);

	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zcommunityid = $wtwhandlers->getPost('communityid','');
	$zpastcommunityid = $wtwhandlers->getPost('pastcommunityid','');
	$zwebid = $wtwhandlers->getPost('webid','');
	$zwebtype = $wtwhandlers->getPost('webtype','');
	$zcommunityname = base64_decode($wtwhandlers->getPost('communityname',''));
	$zdescription = base64_decode($wtwhandlers->getPost('description',''));
	$ztags = base64_decode($wtwhandlers->getPost('tags',''));
	$zanalyticsid = $wtwhandlers->getPost('analyticsid','');
	$zgroundpositiony = $wtwhandlers->getPost('groundpositiony','');
	$zwaterpositiony = $wtwhandlers->getPost('waterpositiony','');
	$zalttag = base64_decode($wtwhandlers->getPost('alttag',''));
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
	$ztextureid = $wtwhandlers->getPost('textureid','');
	$zskydomeid = $wtwhandlers->getPost('skydomeid','');
	$zskyinclination = $wtwhandlers->getPost('skyinclination','');
	$zskyluminance = $wtwhandlers->getPost('skyluminance','');
	$zskyazimuth = $wtwhandlers->getPost('skyazimuth','');
	$zskyrayleigh = $wtwhandlers->getPost('skyrayleigh','');
	$zskyturbidity = $wtwhandlers->getPost('skyturbidity','');
	$zskymiedirectionalg = $wtwhandlers->getPost('skymiedirectionalg','');
	$zskymiecoefficient = $wtwhandlers->getPost('skymiecoefficient','');
	$zgroundtextureid = $wtwhandlers->getPost('groundtextureid','');
	$zbuildingpositionx = $wtwhandlers->getPost('buildingpositionx','0');
	$zbuildingpositiony = $wtwhandlers->getPost('buildingpositiony','0');
	$zbuildingpositionz = $wtwhandlers->getPost('buildingpositionz','0');
	$zbuildingrotationy = $wtwhandlers->getPost('buildingrotationy','0');
	$zsharehash = $wtwhandlers->getPost('sharehash','');
	
	/* select the function called */
	$zresponse = array();
	switch ($zfunction) {
		case "savecommunity":
			$zcommunityid = $wtwcommunities->saveCommunity($zcommunityid, $zpastcommunityid, $zcommunityname, $zanalyticsid, $zgroundpositiony, $zwaterpositiony, $zalttag);
			$zresponse = array(
				'communityid'=> $zcommunityid
			);
			break;
		case "deletecommunity":
			$wtwcommunities->deleteCommunity($zcommunityid);
			break;
		case "savestartposition":
			$wtwcommunities->saveCommunityStartPosition($zcommunityid, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz);
			break;
		case "savegravity":
			$wtwcommunities->saveCommunityGravity($zcommunityid, $zgravity);
			break;
		case "saveskydome":
			$wtwcommunities->saveCommunitySky($zcommunityid, $zskydomeid, $zskyinclination, $zskyluminance, $zskyazimuth, $zskyrayleigh, $zskyturbidity, $zskymiedirectionalg, $zskymiecoefficient);
			break;
		case "saveextendedground":
			$wtwcommunities->saveCommunityGround($zcommunityid, $zgroundtextureid);
			break;
		case "savecommunitytemplate":
			$zresponse = $wtwcommunities->saveCommunityTemplate($zcommunityid, $zcommunityname, $zdescription, $ztags);
			break;
		case "sharecommunitytemplate":
			$zresponse = $wtwcommunities->shareCommunityTemplate($zcommunityid, $zsharehash);
			break;
		case "downloadweb":
			$znewwebid = $wtwcommunities->downloadWeb($zwebid, $zwebid, $zwebtype, '', '', $zcommunityid, $zbuildingpositionx, $zbuildingpositiony, $zbuildingpositionz, $zbuildingrotationy);
			$zresponse = array(
				'webid'=> $znewwebid,
				'webtype'=> $zwebtype
			);
			break;
		case "importcommunity":
			$zcommunityid = $wtwcommunities->importCommunity($zcommunityid, $zpastcommunityid, $zcommunityname, $zanalyticsid, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zgravity, $ztextureid, $zskydomeid, $zskyinclination, $zskyluminance, $zskyazimuth, $zskyrayleigh, $zskyturbidity, $zskymiedirectionalg, $zskymiecoefficient, $zgroundpositiony, $zwaterpositiony, $zalttag);
			$zresponse = array(
				'communityid'=> $zcommunityid
			);
			break;
	}

	/* set headers to keep data local to server */
	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	/* return the response from the function */
	echo json_encode($zresponse);
	
} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-communities.php=".$e->getMessage());
}
?>
<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwcommunities.php');
	global $wtwcommunities;
	$zresults = file_get_contents('php://input');
	$zdata = json_decode($zresults, TRUE);

	$zfunction = null;
	$zcommunityid = '';
	$zpastcommunityid = '';
	$zcommunityname = '';
	$zdescription = '';
	$ztags = '';
	$zanalyticsid = '';
	$zgroundpositiony = '';
	$zwaterpositiony = '';
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
	$zgravity = 9.8;
	$ztextureid = '';
	$zskydomeid = '';
	$zskyinclination = '';
	$zskyluminance = '';
	$zskyazimuth = '';
	$zskyrayleigh = '';
	$zskyturbidity = '';
	$zskymiedirectionalg = '';
	$zskymiecoefficient = '';
	$zgroundtextureid = '';
	
	if (!empty($zdata) && isset($zdata)) {
		if (isset($zdata["function"])) {
			$zfunction = strtolower($zdata["function"]);
		}
		if (isset($zdata["communityid"])) {
			$zcommunityid = $zdata["communityid"];
		}
		if (isset($zdata["pastcommunityid"])) {
			$zpastcommunityid = $zdata["pastcommunityid"];
		}
		if (isset($zdata["communityname"])) {
			$zcommunityname = $zdata["communityname"];
		}
		if (isset($zdata["description"])) {
			$zdescription = $zdata["description"];
		}
		if (isset($zdata["tags"])) {
			$ztags = $zdata["tags"];
		}
		if (isset($zdata["analyticsid"])) {
			$zanalyticsid = $zdata["analyticsid"];
		}
		if (isset($zdata["groundpositiony"])) {
			$zgroundpositiony = $zdata["groundpositiony"];
		}
		if (isset($zdata["waterpositiony"])) {
			$zwaterpositiony = $zdata["waterpositiony"];
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
		if (isset($zdata["textureid"])) {
			$ztextureid = $zdata["textureid"];
		}
		if (isset($zdata["skydomeid"])) {
			$zskydomeid = $zdata["skydomeid"];
		}
		if (isset($zdata["skyinclination"])) {
			$zskyinclination = $zdata["skyinclination"];
		}
		if (isset($zdata["skyluminance"])) {
			$zskyluminance = $zdata["skyluminance"];
		}
		if (isset($zdata["skyazimuth"])) {
			$zskyazimuth = $zdata["skyazimuth"];
		}
		if (isset($zdata["skyrayleigh"])) {
			$zskyrayleigh = $zdata["skyrayleigh"];
		}
		if (isset($zdata["skyturbidity"])) {
			$zskyturbidity = $zdata["skyturbidity"];
		}
		if (isset($zdata["skymiedirectionalg"])) {
			$zskymiedirectionalg = $zdata["skymiedirectionalg"];
		}
		if (isset($zdata["skymiecoefficient"])) {
			$zskymiecoefficient = $zdata["skymiecoefficient"];
		}
		if (isset($zdata["groundtextureid"])) {
			$zgroundtextureid = $zdata["groundtextureid"];
		}
	}

	$zresponse = array();
	switch ($zfunction) {
		case "savecommunity":
			$zcommunityid = $wtwcommunities->saveCommunity($zcommunityid, $zpastcommunityid, $zcommunityname, $zanalyticsid, $zgroundpositiony, $zwaterpositiony, $zalttag, 0);
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
		case "sharecommunitytemplate":
			$wtwcommunities->shareCommunityTemplate($zcommunityid, $zcommunityname, $zdescription, $ztags);
			break;
		case "importcommunity":
			$zcommunityid = $wtwcommunities->importCommunity($zcommunityid, $zpastcommunityid, $zcommunityname, $zanalyticsid, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zgravity, $ztextureid, $zskydomeid, $zskyinclination, $zskyluminance, $zskyazimuth, $zskyrayleigh, $zskyturbidity, $zskymiedirectionalg, $zskymiecoefficient, $zgroundpositiony, $zwaterpositiony, $zalttag);
			$zresponse = array(
				'serror'=> $zcommunityid
			);
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);
	
} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-communities.php=".$e->getMessage());
}
?>
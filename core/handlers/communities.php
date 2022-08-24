<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for community functions */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwcommunities.php');
	global $wtwcommunities;
	$zrequest = $wtwhandlers->openFilefromURL('php://input');
	$zrequest = json_decode($zrequest, TRUE);

	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zcommunityid = $wtwhandlers->getPost('communityid','');
	$zpastcommunityid = $wtwhandlers->getPost('pastcommunityid','');
	$zbuildingid = $wtwhandlers->getPost('buildingid','');
	$zthingid = $wtwhandlers->getPost('thingid','');
	$zversionid = $wtwhandlers->getPost('versionid','');
	$zversion = $wtwhandlers->getPost('version','');
	$zversiondesc = $wtwhandlers->decode64($wtwhandlers->getPost('versiondesc',''));
	$zdownloadid = $wtwhandlers->getPost('downloadid','');
	$zwebid = $wtwhandlers->getPost('webid','');
	$zupdatewebid = $wtwhandlers->getPost('updatewebid','');
	$zwebtype = $wtwhandlers->getPost('webtype','');
	$zprocess = $wtwhandlers->getPost('process','');
	$zcommunityname = $wtwhandlers->decode64($wtwhandlers->getPost('communityname',''));
	$zcommunitydescription = $wtwhandlers->decode64($wtwhandlers->getPost('communitydescription',''));
	$zdescription = $wtwhandlers->decode64($wtwhandlers->getPost('description',''));
	$ztags = $wtwhandlers->decode64($wtwhandlers->getPost('tags',''));
	$zanalyticsid = $wtwhandlers->getPost('analyticsid','');
	$zspawnactionzoneid = $wtwhandlers->getPost('spawnactionzoneid','');
	$zgroundpositiony = $wtwhandlers->getPost('groundpositiony','');
	$zwaterpositiony = $wtwhandlers->getPost('waterpositiony','');
	$zwaterbumpid = $wtwhandlers->getPost('waterbumpid','');
	$zwaterbumpheight = $wtwhandlers->getPost('waterbumpheight','.6');
	$zwatersubdivisions = $wtwhandlers->getPost('watersubdivisions','2');
	$zwindforce = $wtwhandlers->getPost('waterwindforce','-10');
	$zwinddirectionx = $wtwhandlers->getPost('waterwinddirectionx','1');
	$zwinddirectiony = $wtwhandlers->getPost('waterwinddirectiony','1');
	$zwinddirectionz = $wtwhandlers->getPost('waterwinddirectionz','0');
	$zwaterwaveheight = $wtwhandlers->getPost('waterwaveheight','.2');
	$zwaterwavelength = $wtwhandlers->getPost('waterwavelength','.02');
	$zwatercolorrefraction = $wtwhandlers->getPost('watercolorrefraction','#23749C');
	$zwatercolorreflection = $wtwhandlers->getPost('watercolorreflection','#52BCF1');
	$zwatercolorblendfactor = $wtwhandlers->getPost('watercolorblendfactor','.2');
	$zwatercolorblendfactor2 = $wtwhandlers->getPost('watercolorblendfactor2','.2');
	$zwateralpha = $wtwhandlers->getPost('wateralpha','.9');
	$zalttag = $wtwhandlers->decode64($wtwhandlers->getPost('alttag',''));
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
	$zbuildingscalingx = $wtwhandlers->getPost('buildingscalingx','1');
	$zbuildingscalingy = $wtwhandlers->getPost('buildingscalingy','1');
	$zbuildingscalingz = $wtwhandlers->getPost('buildingscalingz','1');
	$zbuildingrotationx = $wtwhandlers->getPost('buildingrotationx','0');
	$zbuildingrotationy = $wtwhandlers->getPost('buildingrotationy','0');
	$zbuildingrotationz = $wtwhandlers->getPost('buildingrotationz','0');
	$zsharehash = $wtwhandlers->getPost('sharehash','');
	
	/* select the function called */
	$zresponse = array();
	switch ($zfunction) {
		case "savecommunity":
			$zcommunityid = $wtwcommunities->saveCommunity($zcommunityid, $zpastcommunityid, $zversionid, $zversion, $zversiondesc, $zcommunityname, $zcommunitydescription, $zanalyticsid, $zgroundpositiony, $zwaterpositiony, $zwaterbumpid, $zwaterbumpheight, $zwatersubdivisions, $zwindforce, $zwinddirectionx, $zwinddirectiony, $zwinddirectionz, $zwaterwaveheight, $zwaterwavelength, $zwatercolorrefraction, $zwatercolorreflection, $zwatercolorblendfactor, $zwatercolorblendfactor2, $zwateralpha, $zalttag);
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
		case "savedefaultspawnzone":
			$zresponse = $wtwcommunities->saveDefaultSpawnZone($zcommunityid, $zbuildingid, $zthingid, $zspawnactionzoneid); 
			break;
		case "updatefirstbuilding":
			$wtwcommunities->saveFirstBuilding($zcommunityid, $zbuildingpositionx, $zbuildingpositiony, $zbuildingpositionz, $zbuildingscalingx, $zbuildingscalingy, $zbuildingscalingz, $zbuildingrotationx, $zbuildingrotationy, $zbuildingrotationz);
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
			$zresponse = $wtwcommunities->saveCommunityTemplate($zcommunityid, $zcommunityname, $zdescription, $ztags, $zversion, $zversiondesc);
			break;
		case "sharecommunitytemplate":
			$zresponse = $wtwcommunities->shareCommunityTemplate($zcommunityid, $zsharehash);
			break;
		case "downloadweb":
			$znewwebid = $wtwcommunities->downloadWeb($zwebid, $zwebid, $zwebtype, '', '', '', $zcommunityid, $zbuildingpositionx, $zbuildingpositiony, $zbuildingpositionz, $zbuildingscalingx, $zbuildingscalingy, $zbuildingscalingz, $zbuildingrotationx, $zbuildingrotationy, $zbuildingrotationz);
			$zresponse = array(
				'webid'=> $znewwebid,
				'webtype'=> $zwebtype
			);
			break;
		case "downloadupdateweb":
			$zresponse = $wtwcommunities->downloadUpdateWeb($zwebid, $zupdatewebid, $zwebtype, '');
			break;
		case "importcommunity":
			$zcommunityid = $wtwcommunities->importCommunity($zcommunityid, $zpastcommunityid, $zversionid, $zversion, $zversiondesc, $zcommunityname, $zanalyticsid, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zgravity, $ztextureid, $zskydomeid, $zskyinclination, $zskyluminance, $zskyazimuth, $zskyrayleigh, $zskyturbidity, $zskymiedirectionalg, $zskymiecoefficient, $zgroundpositiony, $zwaterpositiony, $zalttag);
			$zresponse = array(
				'communityid'=> $zcommunityid
			);
			break;
		case "updatedownloadqueue":
			$zresponse = $wtwcommunities->updateDownloadsQueue($zdownloadid, $zwebid, $zwebtype, $zprocess);
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
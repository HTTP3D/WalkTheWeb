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
	$zcommunityname = $wtwhandlers->decode64($wtwhandlers->getPost('communityname',''));
	$zcommunitydescription = $wtwhandlers->decode64($wtwhandlers->getPost('communitydescription',''));
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
	$zsceneambientcolor = $wtwhandlers->getPost('sceneambientcolor','#E5E8E8');
	$zsceneclearcolor = $wtwhandlers->getPost('sceneclearcolor','#000000');
	$zsceneuseclonedmeshmap = $wtwhandlers->getPost('sceneuseclonedmeshmap','1');
	$zsceneblockmaterialdirtymechanism = $wtwhandlers->getPost('sceneblockmaterialdirtymechanism','1');
	$zscenefogenabled = $wtwhandlers->getPost('scenefogenabled','0');
	$zscenefogmode = $wtwhandlers->getPost('scenefogmode','');
	$zscenefogdensity = $wtwhandlers->getPost('scenefogdensity','.01');
	$zscenefogstart = $wtwhandlers->getPost('scenefogstart','20');
	$zscenefogend = $wtwhandlers->getPost('scenefogend','60');
	$zscenefogcolor = $wtwhandlers->getPost('scenefogcolor','#c0c0c0');
	$zsundirectionalintensity = $wtwhandlers->getPost('sundirectionalintensity','1');
	$zsundiffusecolor = $wtwhandlers->getPost('sundiffusecolor','#ffffff');
	$zsunspecularcolor = $wtwhandlers->getPost('sunspecularcolor','#ffffff');
	$zsungroundcolor = $wtwhandlers->getPost('sungroundcolor','#000000');
	$zsundirectionx = $wtwhandlers->getPost('sundirectionx','999');
	$zsundirectiony = $wtwhandlers->getPost('sundirectiony','-999');
	$zsundirectionz = $wtwhandlers->getPost('sundirectionz','999');
	$zbacklightintensity = $wtwhandlers->getPost('backlightintensity','.5');
	$zbacklightdirectionx = $wtwhandlers->getPost('backlightdirectionx','-999');
	$zbacklightdirectiony = $wtwhandlers->getPost('backlightdirectiony','999');
	$zbacklightdirectionz = $wtwhandlers->getPost('backlightdirectionz','-999');
	$zbacklightdiffusecolor = $wtwhandlers->getPost('backlightdiffusecolor','#ffffff');
	$zbacklightspecularcolor = $wtwhandlers->getPost('backlightspecularcolor','#ffffff');
	$zskytype = $wtwhandlers->getPost('skytype','');
	$zskysize = $wtwhandlers->getPost('skysize','5000');
	$zskyboxfolder = $wtwhandlers->getPost('skyboxfolder','');
	$zskyboxfile = $wtwhandlers->getPost('skyboxfile','');
	$zskyboximageleft = $wtwhandlers->getPost('skyboximageleft','');
	$zskyboximageup = $wtwhandlers->getPost('skyboximageup','');
	$zskyboximagefront = $wtwhandlers->getPost('skyboximagefront','');
	$zskyboximageright = $wtwhandlers->getPost('skyboximageright','');
	$zskyboximagedown = $wtwhandlers->getPost('skyboximagedown','');
	$zskyboximageback = $wtwhandlers->getPost('skyboximageback','');
	$zskypositionoffsetx = $wtwhandlers->getPost('skypositionoffsetx','0');
	$zskypositionoffsety = $wtwhandlers->getPost('skypositionoffsety','0');
	$zskypositionoffsetz = $wtwhandlers->getPost('skypositionoffsetz','0');
	$zskyboxmicrosurface = $wtwhandlers->getPost('skyboxmicrosurface','0');
	$zskyboxpbr = $wtwhandlers->getPost('skyboxpbr','0');
	$zskyboxasenvironmenttexture = $wtwhandlers->getPost('skyboxasenvironmenttexture','0');
	$zskyboxblur = $wtwhandlers->getPost('skyboxblur','0');
	$zskyboxdiffusecolor = $wtwhandlers->getPost('skyboxdiffusecolor','#000000');
	$zskyboxspecularcolor = $wtwhandlers->getPost('skyboxspecularcolor','#000000');
	$zskyboxambientcolor = $wtwhandlers->getPost('skyboxambientcolor','#000000');
	$zskyboxemissivecolor = $wtwhandlers->getPost('skyboxemissivecolor','#000000');
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
		case "savecommunitygravity":
			$wtwcommunities->saveCommunityGravity($zcommunityid, $zgravity);
			break;
		case "savecommunityscene":
			$wtwcommunities->saveCommunityScene($zcommunityid, $zsceneambientcolor, $zsceneclearcolor, $zsceneuseclonedmeshmap, $zsceneblockmaterialdirtymechanism, $zscenefogenabled, $zscenefogmode, $zscenefogdensity, $zscenefogstart, $zscenefogend, $zscenefogcolor, $zsundirectionalintensity, $zsundiffusecolor, $zsunspecularcolor, $zsungroundcolor, $zsundirectionx, $zsundirectiony, $zsundirectionz, $zbacklightintensity, $zbacklightdirectionx, $zbacklightdirectiony, $zbacklightdirectionz, $zbacklightdiffusecolor, $zbacklightspecularcolor);
			break;
		case "savecommunitysky":
			$wtwcommunities->saveCommunitySky($zcommunityid, $zskydomeid, $zskytype, $zskysize, $zskyboxfolder, $zskyboxfile, $zskyboximageleft, $zskyboximageup, $zskyboximagefront, $zskyboximageright, $zskyboximagedown, $zskyboximageback, $zskypositionoffsetx, $zskypositionoffsety, $zskypositionoffsetz, $zskyboxmicrosurface, $zskyboxpbr, $zskyboxasenvironmenttexture, $zskyboxblur, $zskyboxdiffusecolor, $zskyboxspecularcolor, $zskyboxambientcolor, $zskyboxemissivecolor, $zskyinclination, $zskyluminance, $zskyazimuth, $zskyrayleigh, $zskyturbidity, $zskymiedirectionalg, $zskymiecoefficient);
			break;
		case "saveextendedground":
			$wtwcommunities->saveCommunityGround($zcommunityid, $zgroundtextureid);
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
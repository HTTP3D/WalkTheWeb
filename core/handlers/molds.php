<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for mold functions (Community, Building, and Thing) */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwmoldscommon.php');
	global $wtwmoldscommon;
	$zrequest = $wtwhandlers->openFilefromURL('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	
	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zmoldid = $wtwhandlers->getPost('moldid','');
	$zcommunityid = $wtwhandlers->getPost('communityid','');
	$zbuildingid = $wtwhandlers->getPost('buildingid','');
	$zthingid = $wtwhandlers->getPost('thingid','');
	$zloadactionzoneid = $wtwhandlers->getPost('loadactionzoneid','');
	$zunloadactionzoneid = $wtwhandlers->getPost('unloadactionzoneid','');
	$zshape = $wtwhandlers->getPost('shape','');
	$zcovering = $wtwhandlers->getPost('covering','');
	$zpositionx = $wtwhandlers->getPost('positionx','0');
	$zpositiony = $wtwhandlers->getPost('positiony','0');
	$zpositionz = $wtwhandlers->getPost('positionz','0');
	$zscalingx = $wtwhandlers->getPost('scalingx','1');
	$zscalingy = $wtwhandlers->getPost('scalingy','1');
	$zscalingz = $wtwhandlers->getPost('scalingz','1');
	$zrotationx = $wtwhandlers->getPost('rotationx','0');
	$zrotationy = $wtwhandlers->getPost('rotationy','0');
	$zrotationz = $wtwhandlers->getPost('rotationz','0');
	$zspecial1 = $wtwhandlers->getPost('special1','0');
	$zspecial2 = $wtwhandlers->getPost('special2','0');
	$zuoffset = $wtwhandlers->getPost('uoffset','0');
	$zvoffset = $wtwhandlers->getPost('voffset','0');
	$zuscale = $wtwhandlers->getPost('uscale','0');
	$zvscale = $wtwhandlers->getPost('vscale','0');
	$zuploadobjectid = $wtwhandlers->getPost('uploadobjectid','');
	$zreceiveshadows = $wtwhandlers->getPost('receiveshadows','0');
	$zgraphiclevel = $wtwhandlers->getPost('graphiclevel','0');
	$zvideoid = $wtwhandlers->getPost('videoid','');
	$zvideoposterid = $wtwhandlers->getPost('videoposterid','');
	$ztextureid = $wtwhandlers->getPost('textureid','');
	$ztexturebumpid = $wtwhandlers->getPost('texturebumpid','');
	$zheightmapid = $wtwhandlers->getPost('heightmapid','');
	$zmixmapid = $wtwhandlers->getPost('mixmapid','');
	$ztexturerid = $wtwhandlers->getPost('texturerid','');
	$ztexturegid = $wtwhandlers->getPost('texturegid','');
	$ztexturebid = $wtwhandlers->getPost('texturebid','');
	$ztexturebumprid = $wtwhandlers->getPost('texturebumprid','');
	$ztexturebumpgid = $wtwhandlers->getPost('texturebumpgid','');
	$ztexturebumpbid = $wtwhandlers->getPost('texturebumpbid','');
	$zopacity = $wtwhandlers->getPost('opacity','100');
	$zwaterreflection = $wtwhandlers->getPost('waterreflection','0');
	$zsubdivisions = $wtwhandlers->getPost('subdivisions','2');
	$zminheight = $wtwhandlers->getPost('minheight','0');
	$zmaxheight = $wtwhandlers->getPost('maxheight','30');
	$zcheckcollisions = $wtwhandlers->getPost('checkcollisions','1');
	$zispickable = $wtwhandlers->getPost('ispickable','1');
	$zactionzoneid = $wtwhandlers->getPost('actionzoneid','');
	$zcsgmoldid = $wtwhandlers->getPost('csgmoldid','');
	$zcsgaction = $wtwhandlers->getPost('csgaction','');
	$zalttag = $wtwhandlers->getPost('alttag','');
	$zwebtext = $wtwhandlers->getPost('webtext','');
	$zwebstyle = $wtwhandlers->getPost('webstyle','');
	$zpath1points = $wtwhandlers->getPost('path1points','');
	$zpath2points = $wtwhandlers->getPost('path2points','');
	$zdiffusecolor = $wtwhandlers->getPost('diffusecolor','#ffffff');
	$zspecularcolor = $wtwhandlers->getPost('specularcolor','#bcbcbc');
	$zemissivecolor = $wtwhandlers->getPost('emissivecolor','#686868');
	$zambientcolor = $wtwhandlers->getPost('ambientcolor','#575757');
	$zsoundid = $wtwhandlers->getPost('soundid','');
	$zsoundname = $wtwhandlers->getPost('soundname','');
	$zsoundattenuation = $wtwhandlers->getPost('soundattenuation','');
	$zsoundloop = $wtwhandlers->getPost('soundloop','1');
	$zsoundmaxdistance = $wtwhandlers->getPost('soundmaxdistance','100');
	$zsoundrollofffactor = $wtwhandlers->getPost('soundrollofffactor','1');
	$zsoundrefdistance = $wtwhandlers->getPost('soundrefdistance','1');
	$zsoundconeinnerangle = $wtwhandlers->getPost('soundconeinnerangle','90');
	$zsoundconeouterangle = $wtwhandlers->getPost('soundconeouterangle','180');
	$zsoundconeoutergain = $wtwhandlers->getPost('soundconeoutergain','.5');
	$zimageind = $wtwhandlers->getPost('imageind','');
	$zimageid = $wtwhandlers->getPost('imageid','');
	$zimagehoverid = $wtwhandlers->getPost('imagehoverid','');
	$zimageclickid = $wtwhandlers->getPost('imageclickid','');
	$zjsfunction = $wtwhandlers->getPost('jsfunction','');
	$zjsparameters = $wtwhandlers->getPost('jsparameters','');
	$zdeleted = $wtwhandlers->getPost('deleted','0');
	$zwebtype = $wtwhandlers->getPost('webtype','');
	$zwebid = $wtwhandlers->getPost('webid','');
	$zcopywebid = $wtwhandlers->getPost('copywebid','');
	$zmoldsbulk = $wtwhandlers->getPost('moldsbulk','');
	
	/* select the function called */
	$zresponse = array();
	switch ($zfunction) {
		case "savemold":
			if (!empty($zcommunityid)) {
				require_once(wtw_rootpath.'/core/functions/class_wtwcommunitymolds.php');
				global $wtwcommunitymolds;
				$zmoldid = $wtwcommunitymolds->saveCommunityMold($zmoldid, $zcommunityid, $zloadactionzoneid, $zunloadactionzoneid, $zshape, $zcovering, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zspecial1, $zspecial2, $zuoffset, $zvoffset, $zuscale, $zvscale, $zuploadobjectid, $zreceiveshadows, $zgraphiclevel, $zvideoid, $zvideoposterid, $ztextureid, $ztexturebumpid, $zheightmapid, $zmixmapid, $ztexturerid, $ztexturegid, $ztexturebid, $ztexturebumprid, $ztexturebumpgid, $ztexturebumpbid, $zopacity, $zwaterreflection, $zsubdivisions, $zminheight, $zmaxheight, $zcheckcollisions, $zispickable, $zactionzoneid, $zcsgmoldid, $zcsgaction, $zalttag, $zwebtext, $zwebstyle, $zpath1points, $zpath2points, $zdiffusecolor, $zspecularcolor, $zemissivecolor, $zambientcolor, $zsoundid, $zsoundname, $zsoundattenuation, $zsoundloop, $zsoundmaxdistance, $zsoundrollofffactor, $zsoundrefdistance, $zsoundconeinnerangle, $zsoundconeouterangle, $zsoundconeoutergain);
				if ($zimageind != "-1") {
					$wtwmoldscommon->saveWebImage('', '', $zmoldid, $zimageind, $zimageid, $zimagehoverid, $zimageclickid, $zjsfunction, $zjsparameters);
				}
			} else if (!empty($zbuildingid)) {
				require_once(wtw_rootpath.'/core/functions/class_wtwbuildingmolds.php');
				global $wtwbuildingmolds;
				$zmoldid = $wtwbuildingmolds->saveBuildingMold($zmoldid, $zbuildingid, $zloadactionzoneid, $zunloadactionzoneid, $zshape, $zcovering, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zspecial1, $zspecial2, $zuoffset, $zvoffset, $zuscale, $zvscale, $zuploadobjectid, $zsubdivisions, $zreceiveshadows, $zgraphiclevel, $zcheckcollisions, $zispickable, $zvideoid, $zvideoposterid, $ztextureid, $ztexturebumpid, $zheightmapid, $zmixmapid, $ztexturerid, $ztexturegid, $ztexturebid, $ztexturebumprid, $ztexturebumpgid, $ztexturebumpbid, $zopacity, $zwaterreflection, $zactionzoneid, $zcsgmoldid, $zcsgaction, $zalttag, $zwebtext, $zwebstyle, $zpath1points, $zpath2points, $zdiffusecolor, $zspecularcolor, $zemissivecolor, $zambientcolor, $zsoundid, $zsoundname, $zsoundattenuation, $zsoundloop, $zsoundmaxdistance, $zsoundrollofffactor, $zsoundrefdistance, $zsoundconeinnerangle, $zsoundconeouterangle, $zsoundconeoutergain);
				if ($zimageind != "-1") {
					$wtwmoldscommon->saveWebImage('', $zmoldid, '', $zimageind, $zimageid, $zimagehoverid, $zimageclickid, $zjsfunction, $zjsparameters);
				}
			} else if (!empty($zthingid)) {
				require_once(wtw_rootpath.'/core/functions/class_wtwthingmolds.php');
				global $wtwthingmolds;
				$zmoldid = $wtwthingmolds->saveThingMold($zmoldid, $zthingid, $zloadactionzoneid, $zunloadactionzoneid, $zshape, $zcovering, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zspecial1, $zspecial2, $zuoffset, $zvoffset, $zuscale, $zvscale, $zuploadobjectid, $zsubdivisions, $zreceiveshadows, $zgraphiclevel, $zcheckcollisions, $zispickable, $zvideoid, $zvideoposterid, $ztextureid, $ztexturebumpid, $zheightmapid, $zmixmapid, $ztexturerid, $ztexturegid, $ztexturebid, $ztexturebumprid, $ztexturebumpgid, $ztexturebumpbid, $zopacity, $zwaterreflection, $zactionzoneid, $zcsgmoldid, $zcsgaction, $zalttag, $zwebtext, $zwebstyle, $zpath1points, $zpath2points, $zdiffusecolor, $zspecularcolor, $zemissivecolor, $zambientcolor, $zsoundid, $zsoundname, $zsoundattenuation, $zsoundloop, $zsoundmaxdistance, $zsoundrollofffactor, $zsoundrefdistance, $zsoundconeinnerangle, $zsoundconeouterangle, $zsoundconeoutergain);
				if ($zimageind != "-1") {
					$wtwmoldscommon->saveWebImage($zmoldid, '', '', $zimageind, $zimageid, $zimagehoverid, $zimageclickid, $zjsfunction, $zjsparameters);
				}
			}
			break;
		case "savemoldactionzone":
			if (!empty($zcommunityid)) {
				require_once(wtw_rootpath.'/core/functions/class_wtwcommunitymolds.php');
				global $wtwcommunitymolds;
				$zmoldid = $wtwcommunitymolds->saveCommunityMoldActionZone($zmoldid, $zcommunityid, $zactionzoneid);
			} else if (!empty($zbuildingid)) {
				require_once(wtw_rootpath.'/core/functions/class_wtwbuildingmolds.php');
				global $wtwbuildingmolds;
				$zmoldid = $wtwbuildingmolds->saveBuildingMoldActionZone($zmoldid, $zbuildingid, $zactionzoneid);
			} else if (!empty($zthingid)) {
				require_once(wtw_rootpath.'/core/functions/class_wtwthingmolds.php');
				global $wtwthingmolds;
				$zmoldid = $wtwthingmolds->saveThingMoldActionZone($zmoldid, $zthingid, $zactionzoneid);
			}
			break;
		case "deletemold":
			if (!empty($zcommunityid)) {
				require_once(wtw_rootpath.'/core/functions/class_wtwcommunitymolds.php');
				global $wtwcommunitymolds;
				$wtwcommunitymolds->deleteCommunityMold($zmoldid, $zcommunityid, $zdeleted);
			} else if (!empty($zbuildingid)) {
				require_once(wtw_rootpath.'/core/functions/class_wtwbuildingmolds.php');
				global $wtwbuildingmolds;
				$wtwbuildingmolds->deleteBuildingMold($zmoldid, $zbuildingid, $zdeleted);
			} else if (!empty($zthingid)) {
				require_once(wtw_rootpath.'/core/functions/class_wtwthingmolds.php');
				global $wtwthingmolds;
				$wtwthingmolds->deleteThingMold($zmoldid, $zthingid, $zdeleted);
			}
			break;
		case "importmolds":
			$wtwmoldscommon->importMolds($zwebtype, $zwebid, $zcopywebid, $zmoldsbulk);
			break;
		case "importmoldpoints":
			$wtwmoldscommon->importMoldPoints($zwebtype, $zwebid, $zcopywebid, $zmoldsbulk);
			break;
	}

	/* set headers to keep data local to server */
	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	/* return the response from the function */
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-molds.php=".$e->getMessage());
}
?>
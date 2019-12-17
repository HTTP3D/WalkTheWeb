<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwmoldscommon.php');
	global $wtwmoldscommon;
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);

	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zmoldid = $wtwhandlers->getPost('moldid','');
	$zcommunityid = $wtwhandlers->getPost('communityid','');
	$zbuildingid = $wtwhandlers->getPost('buildingid','');
	$zthingid = $wtwhandlers->getPost('thingid','');
	$zloadactionzoneid = $wtwhandlers->getPost('loadactionzoneid','');
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
	$zdiffusecolorr = $wtwhandlers->getPost('diffusecolorr','1');
	$zdiffusecolorg = $wtwhandlers->getPost('diffusecolorg','1');
	$zdiffusecolorb = $wtwhandlers->getPost('diffusecolorb','1');
	$zspecularcolorr = $wtwhandlers->getPost('specularcolorr','1');
	$zspecularcolorg = $wtwhandlers->getPost('specularcolorg','1');
	$zspecularcolorb = $wtwhandlers->getPost('specularcolorb','');
	$zemissivecolorr = $wtwhandlers->getPost('emissivecolorr','1');
	$zemissivecolorg = $wtwhandlers->getPost('emissivecolorg','1');
	$zemissivecolorb = $wtwhandlers->getPost('emissivecolorb','');
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
	$zmoldgroup = $wtwhandlers->getPost('moldgroup','');
	$zwebid = $wtwhandlers->getPost('webid','');
	$zcopywebid = $wtwhandlers->getPost('copywebid','');
	$zmoldsbulk = $wtwhandlers->getPost('moldsbulk','');
	
	$zresponse = array();
	switch ($zfunction) {
		case "savemold":
			if (!empty($zcommunityid)) {
				require_once(wtw_rootpath.'/core/functions/class_wtwcommunitymolds.php');
				global $wtwcommunitymolds;
				$zmoldid = $wtwcommunitymolds->saveCommunityMold($zmoldid, $zcommunityid, $zloadactionzoneid, $zshape, $zcovering, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zspecial1, $zspecial2, $zuoffset, $zvoffset, $zuscale, $zvscale, $zuploadobjectid, $zreceiveshadows, $zgraphiclevel, $zvideoid, $zvideoposterid, $ztextureid, $ztexturebumpid, $zheightmapid, $zmixmapid, $ztexturerid, $ztexturegid, $ztexturebid, $ztexturebumprid, $ztexturebumpgid, $ztexturebumpbid, $zopacity, $zwaterreflection, $zsubdivisions, $zminheight, $zmaxheight, $zcheckcollisions, $zispickable, $zactionzoneid, $zcsgmoldid, $zcsgaction, $zalttag, $zwebtext, $zwebstyle, $zpath1points, $zpath2points, $zdiffusecolorr, $zdiffusecolorg, $zdiffusecolorb, $zspecularcolorr, $zspecularcolorg, $zspecularcolorb, $zemissivecolorr, $zemissivecolorg, $zemissivecolorb, $zsoundid, $zsoundname, $zsoundattenuation, $zsoundloop, $zsoundmaxdistance, $zsoundrollofffactor, $zsoundrefdistance, $zsoundconeinnerangle, $zsoundconeouterangle, $zsoundconeoutergain);
				if ($zimageind != "-1") {
					$wtwmoldscommon->saveWebImage('', '', $zmoldid, $zimageind, $zimageid, $zimagehoverid, $zimageclickid, $zjsfunction, $zjsparameters);
				}
			} else if (!empty($zbuildingid)) {
				require_once(wtw_rootpath.'/core/functions/class_wtwbuildingmolds.php');
				global $wtwbuildingmolds;
				$zmoldid = $wtwbuildingmolds->saveBuildingMold($zmoldid, $zbuildingid, $zloadactionzoneid, $zshape, $zcovering, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zspecial1, $zspecial2, $zuoffset, $zvoffset, $zuscale, $zvscale, $zuploadobjectid, $zsubdivisions, $zreceiveshadows, $zgraphiclevel, $zvideoid, $zvideoposterid, $ztextureid, $ztexturebumpid, $zheightmapid, $zmixmapid, $ztexturerid, $ztexturegid, $ztexturebid, $ztexturebumprid, $ztexturebumpgid, $ztexturebumpbid, $zopacity, $zwaterreflection, $zactionzoneid, $zcsgmoldid, $zcsgaction, $zalttag, $zwebtext, $zwebstyle, $zpath1points, $zpath2points, $zdiffusecolorr, $zdiffusecolorg, $zdiffusecolorb, $zspecularcolorr, $zspecularcolorg, $zspecularcolorb, $zemissivecolorr, $zemissivecolorg, $zemissivecolorb, $zsoundid, $zsoundname, $zsoundattenuation, $zsoundloop, $zsoundmaxdistance, $zsoundrollofffactor, $zsoundrefdistance, $zsoundconeinnerangle, $zsoundconeouterangle, $zsoundconeoutergain);
				if ($zimageind != "-1") {
					$wtwmoldscommon->saveWebImage('', $zmoldid, '', $zimageind, $zimageid, $zimagehoverid, $zimageclickid, $zjsfunction, $zjsparameters);
				}
			} else if (!empty($zthingid)) {
				require_once(wtw_rootpath.'/core/functions/class_wtwthingmolds.php');
				global $wtwthingmolds;
				$zmoldid = $wtwthingmolds->saveThingMold($zmoldid, $zthingid, $zloadactionzoneid, $zshape, $zcovering, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zspecial1, $zspecial2, $zuoffset, $zvoffset, $zuscale, $zvscale, $zuploadobjectid, $zsubdivisions, $zreceiveshadows, $zgraphiclevel, $zvideoid, $zvideoposterid, $ztextureid, $ztexturebumpid, $zheightmapid, $zmixmapid, $ztexturerid, $ztexturegid, $ztexturebid, $ztexturebumprid, $ztexturebumpgid, $ztexturebumpbid, $zopacity, $zwaterreflection, $zactionzoneid, $zcsgmoldid, $zcsgaction, $zalttag, $zwebtext, $zwebstyle, $zpath1points, $zpath2points, $zdiffusecolorr, $zdiffusecolorg, $zdiffusecolorb, $zspecularcolorr, $zspecularcolorg, $zspecularcolorb, $zemissivecolorr, $zemissivecolorg, $zemissivecolorb, $zsoundid, $zsoundname, $zsoundattenuation, $zsoundloop, $zsoundmaxdistance, $zsoundrollofffactor, $zsoundrefdistance, $zsoundconeinnerangle, $zsoundconeouterangle, $zsoundconeoutergain);
				if ($zimageind != "-1") {
					$wtwmoldscommon->saveWebImage($zmoldid, '', '', $zimageind, $zimageid, $zimagehoverid, $zimageclickid, $zjsfunction, $zjsparameters);
				}
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
			$wtwmoldscommon->importMolds($zmoldgroup, $zwebid, $zcopywebid, $zmoldsbulk);
			break;
		case "importmoldpoints":
			$wtwmoldscommon->importMoldPoints($zmoldgroup, $zwebid, $zcopywebid, $zmoldsbulk);
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-molds.php=".$e->getMessage());
}
?>
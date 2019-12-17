<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwmoldscommon.php');
	global $wtwmoldscommon;
	$zresults = file_get_contents('php://input');
	$zdata = json_decode($zresults, TRUE);

	$zfunction = null;
	$zmoldid = '';
	$zcommunityid = '';
	$zbuildingid = '';
	$zthingid = '';
	$zloadactionzoneid = '';
	$zshape = '';
	$zcovering = '';
	$zpositionx = '0';
	$zpositiony = '0';
	$zpositionz = '0';
	$zscalingx = '1';
	$zscalingy = '1';
	$zscalingz = '1';
	$zrotationx = '0';
	$zrotationy = '0';
	$zrotationz = '0';
	$zspecial1 = '0';
	$zspecial2 = '0';
	$zuoffset = '0';
	$zvoffset = '0';
	$zuscale = '0';
	$zvscale = '0';
	$zuploadobjectid = '';
	$zreceiveshadows = '0';
	$zgraphiclevel = '0';
	$zvideoid = '';
	$zvideoposterid = '';
	$ztextureid = '';
	$ztexturebumpid = '';
	$zheightmapid = '';
	$zmixmapid = '';
	$ztexturerid = '';
	$ztexturegid = '';
	$ztexturebid = '';
	$ztexturebumprid = '';
	$ztexturebumpgid = '';
	$ztexturebumpbid = '';
	$zopacity = '100';
	$zwaterreflection = '0';
	$zsubdivisions = '2';
	$zminheight = '0';
	$zmaxheight = '30';
	$zcheckcollisions = '1';
	$zispickable = '1';
	$zactionzoneid = '';
	$zcsgmoldid = '';
	$zcsgaction = '';
	$zalttag = '';
	$zwebtext = '';
	$zwebstyle = '';
	$zpath1points = '';
	$zpath2points = '';
	$zdiffusecolorr = '1';
	$zdiffusecolorg = '1';
	$zdiffusecolorb = '1';
	$zspecularcolorr = '1';
	$zspecularcolorg = '1';
	$zspecularcolorb = '1';
	$zemissivecolorr = '1';
	$zemissivecolorg = '1';
	$zemissivecolorb = '1';
	$zsoundid = '';
	$zsoundname = '';
	$zsoundattenuation = '';
	$zsoundloop = '1';
	$zsoundmaxdistance = '100';
	$zsoundrollofffactor = '1';
	$zsoundrefdistance = '1';
	$zsoundconeinnerangle = '90';
	$zsoundconeouterangle = '180';
	$zsoundconeoutergain = '.5';
	$zimageind = '';
	$zimageid = '';
	$zimagehoverid = '';
	$zimageclickid = '';
	$zjsfunction = '';
	$zjsparameters = '';
	$zdeleted = '0';
	$zmoldgroup = '';
	$zwebid = '';
	$zcopywebid = '';
	$zmoldsbulk = '';
	
	if (!empty($zdata) && isset($zdata)) {
		if (isset($zdata["function"])) {
			$zfunction = strtolower($zdata["function"]);
		}
		if (isset($zdata["moldid"])) {
			$zmoldid = $zdata["moldid"];
		}
		if (isset($zdata["communityid"])) {
			$zcommunityid = $zdata["communityid"];
		}
		if (isset($zdata["buildingid"])) {
			$zbuildingid = $zdata["buildingid"];
		}
		if (isset($zdata["thingid"])) {
			$zthingid = $zdata["thingid"];
		}
		if (isset($zdata["loadactionzoneid"])) {
			$zloadactionzoneid = $zdata["loadactionzoneid"];
		}
		if (isset($zdata["shape"])) {
			$zshape = $zdata["shape"];
		}
		if (isset($zdata["covering"])) {
			$zcovering = $zdata["covering"];
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
		if (isset($zdata["special1"])) {
			$zspecial1 = $zdata["special1"];
		}
		if (isset($zdata["special2"])) {
			$zspecial2 = $zdata["special2"];
		}
		if (isset($zdata["uoffset"])) {
			$zuoffset = $zdata["uoffset"];
		}
		if (isset($zdata["voffset"])) {
			$zvoffset = $zdata["voffset"];
		}
		if (isset($zdata["uscale"])) {
			$zuscale = $zdata["uscale"];
		}
		if (isset($zdata["vscale"])) {
			$zvscale = $zdata["vscale"];
		}
		if (isset($zdata["uploadobjectid"])) {
			$zuploadobjectid = $zdata["uploadobjectid"];
		}
		if (isset($zdata["receiveshadows"])) {
			$zreceiveshadows = $zdata["receiveshadows"];
		}
		if (isset($zdata["graphiclevel"])) {
			$zgraphiclevel = $zdata["graphiclevel"];
		}
		if (isset($zdata["videoid"])) {
			$zvideoid = $zdata["videoid"];
		}
		if (isset($zdata["videoposterid"])) {
			$zvideoposterid = $zdata["videoposterid"];
		}
		if (isset($zdata["textureid"])) {
			$ztextureid = $zdata["textureid"];
		}
		if (isset($zdata["texturebumpid"])) {
			$ztexturebumpid = $zdata["texturebumpid"];
		}
		if (isset($zdata["heightmapid"])) {
			$zheightmapid = $zdata["heightmapid"];
		}
		if (isset($zdata["mixmapid"])) {
			$zmixmapid = $zdata["mixmapid"];
		}
		if (isset($zdata["texturerid"])) {
			$ztexturerid = $zdata["texturerid"];
		}
		if (isset($zdata["texturegid"])) {
			$ztexturegid = $zdata["texturegid"];
		}
		if (isset($zdata["texturebid"])) {
			$ztexturebid = $zdata["texturebid"];
		}
		if (isset($zdata["texturebumprid"])) {
			$ztexturebumprid = $zdata["texturebumprid"];
		}
		if (isset($zdata["texturebumpgid"])) {
			$ztexturebumpgid = $zdata["texturebumpgid"];
		}
		if (isset($zdata["texturebumpbid"])) {
			$ztexturebumpbid = $zdata["texturebumpbid"];
		}
		if (isset($zdata["opacity"])) {
			$zopacity = $zdata["opacity"];
		}
		if (isset($zdata["waterreflection"])) {
			$zwaterreflection = $zdata["waterreflection"];
		}
		if (isset($zdata["subdivisions"])) {
			$zsubdivisions = $zdata["subdivisions"];
		}
		if (isset($zdata["minheight"])) {
			$zminheight = $zdata["minheight"];
		}
		if (isset($zdata["maxheight"])) {
			$zmaxheight = $zdata["maxheight"];
		}
		if (isset($zdata["checkcollisions"])) {
			$zcheckcollisions = $zdata["checkcollisions"];
		}
		if (isset($zdata["ispickable"])) {
			$zispickable = $zdata["ispickable"];
		}
		if (isset($zdata["actionzoneid"])) {
			$zactionzoneid = $zdata["actionzoneid"];
		}
		if (isset($zdata["csgmoldid"])) {
			$zcsgmoldid = $zdata["csgmoldid"];
		}
		if (isset($zdata["csgaction"])) {
			$zcsgaction = $zdata["csgaction"];
		}
		if (isset($zdata["alttag"])) {
			$zalttag = $zdata["alttag"];
		}
		if (isset($zdata["webtext"])) {
			$zwebtext = $zdata["webtext"];
		}
		if (isset($zdata["webstyle"])) {
			$zwebstyle = $zdata["webstyle"];
		}
		if (isset($zdata["path1points"])) {
			$zpath1points = $zdata["path1points"];
		}
		if (isset($zdata["path2points"])) {
			$zpath2points = $zdata["path2points"];
		}
		if (isset($zdata["diffusecolorr"])) {
			$zdiffusecolorr = $zdata["diffusecolorr"];
		}
		if (isset($zdata["diffusecolorg"])) {
			$zdiffusecolorg = $zdata["diffusecolorg"];
		}
		if (isset($zdata["diffusecolorb"])) {
			$zdiffusecolorb = $zdata["diffusecolorb"];
		}
		if (isset($zdata["specularcolorr"])) {
			$zspecularcolorr = $zdata["specularcolorr"];
		}
		if (isset($zdata["specularcolorg"])) {
			$zspecularcolorg = $zdata["specularcolorg"];
		}
		if (isset($zdata["specularcolorb"])) {
			$zspecularcolorb = $zdata["specularcolorb"];
		}
		if (isset($zdata["emissivecolorr"])) {
			$zemissivecolorr = $zdata["emissivecolorr"];
		}
		if (isset($zdata["emissivecolorg"])) {
			$zemissivecolorg = $zdata["emissivecolorg"];
		}
		if (isset($zdata["emissivecolorb"])) {
			$zemissivecolorb = $zdata["emissivecolorb"];
		}
		if (isset($zdata["soundid"])) {
			$zsoundid = $zdata["soundid"];
		}
		if (isset($zdata["soundname"])) {
			$zsoundname = $zdata["soundname"];
		}
		if (isset($zdata["soundattenuation"])) {
			$zsoundattenuation = $zdata["soundattenuation"];
		}
		if (isset($zdata["soundloop"])) {
			$zsoundloop = $zdata["soundloop"];
		}
		if (isset($zdata["soundmaxdistance"])) {
			$zsoundmaxdistance = $zdata["soundmaxdistance"];
		}
		if (isset($zdata["soundrollofffactor"])) {
			$zsoundrollofffactor = $zdata["soundrollofffactor"];
		}
		if (isset($zdata["soundrefdistance"])) {
			$zsoundrefdistance = $zdata["soundrefdistance"];
		}
		if (isset($zdata["soundconeinnerangle"])) {
			$zsoundconeinnerangle = $zdata["soundconeinnerangle"];
		}
		if (isset($zdata["soundconeouterangle"])) {
			$zsoundconeouterangle = $zdata["soundconeouterangle"];
		}
		if (isset($zdata["soundconeoutergain"])) {
			$zsoundconeoutergain = $zdata["soundconeoutergain"];
		}
		if (isset($zdata["imageind"])) {
			$zimageind = $zdata["imageind"];
		}
		if (isset($zdata["imageid"])) {
			$zimageid = $zdata["imageid"];
		}
		if (isset($zdata["imagehoverid"])) {
			$zimagehoverid = $zdata["imagehoverid"];
		}
		if (isset($zdata["imageclickid"])) {
			$zimageclickid = $zdata["imageclickid"];
		}
		if (isset($zdata["jsfunction"])) {
			$zjsfunction = $zdata["jsfunction"];
		}
		if (isset($zdata["jsparameters"])) {
			$zjsparameters = $zdata["jsparameters"];
		}
		if (isset($zdata["deleted"])) {
			$zdeleted = $zdata["deleted"];
		}
		if (isset($zdata["moldgroup"])) {
			$zmoldgroup = $zdata["moldgroup"];
		}
		if (isset($zdata["webid"])) {
			$zwebid = $zdata["webid"];
		}
		if (isset($zdata["copywebid"])) {
			$zcopywebid = $zdata["copywebid"];
		}
		if (isset($zdata["moldsbulk"])) {
			$zmoldsbulk = $zdata["moldsbulk"];
		}
	}

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
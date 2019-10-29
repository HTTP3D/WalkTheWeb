<?php
require_once('../functions/class_wtwiframes.php');
global $wtwiframes;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwiframes->trackPageView($wtwiframes->domainurl."/core/iframes/molds.php");
	
	$zbval = "";
	$ziframename = "";
	$zmoldid = "";
	$moldind = "-1";
	$zpastmoldid = "";
	$zmoldgroup = "";
	$zwebid = "";
	$zcopywebid = "";
	$moldgroup = "building";
	if ($_SERVER['REQUEST_METHOD']=='POST') {
		require_once('../functions/class_wtwmoldscommon.php');
		global $wtwmoldscommon;
		$zbval = $_POST["wtw_bval"];
		$zpastmoldid = $_POST["wtw_tpastmoldid"];
		$ziframename = $_POST["wtw_iframename"];
		$zmoldid = $_POST["wtw_tmoldid"];
		$moldind = $_POST["wtw_tmoldind"];
		$zmoldgroup = $_POST["wtw_tmoldgroup"];
		$zwebid = $_POST["wtw_twebid"];
		$zcopywebid = $_POST["wtw_tcopywebid"];
		$moldgroup = $_POST["wtw_tmoldmoldgroup"];
		$moldwaterreflection = "0";
		if (isset($_POST['wtw_tmoldwaterreflection'])) {
			$moldwaterreflection = "1";
		}
		switch ($zbval) {
			case "wtw_bimportmolds":
				$wtwmoldscommon->importMolds($_POST["wtw_tmoldgroup"], $_POST["wtw_twebid"], $_POST["wtw_tcopywebid"], $_POST["wtw_tmoldsbulk"]);
				break;
			case "wtw_bimportmoldpoints":
				$wtwmoldscommon->importMoldPoints($_POST["wtw_tmoldgroup"], $_POST["wtw_twebid"], $_POST["wtw_tcopywebid"], $_POST["wtw_tmoldsbulk"]);
				break;
			case "wtw_bsavemold":
			case "wtw_bsavenewmold":
				if ($_POST["wtw_tcommunityid"] != "") {
					require_once('../functions/class_wtwcommunitymolds.php');
					global $wtwcommunitymolds;
					$zmoldid = $wtwcommunitymolds->saveCommunityMold($_POST["wtw_tmoldid"], $_POST["wtw_tcommunityid"], $_POST['wtw_tmoldloadactionzoneid'], $_POST['wtw_tmoldshape'], $_POST['wtw_tmoldcovering'], $_POST["wtw_tmoldpositionx"], $_POST["wtw_tmoldpositiony"], $_POST["wtw_tmoldpositionz"], $_POST["wtw_tmoldscalingx"], $_POST["wtw_tmoldscalingy"], $_POST["wtw_tmoldscalingz"], $_POST["wtw_tmoldrotationx"], $_POST["wtw_tmoldrotationy"], $_POST["wtw_tmoldrotationz"], $_POST["wtw_tmoldspecial1"], $_POST["wtw_tmoldspecial2"], $_POST["wtw_tmolduoffset"], $_POST["wtw_tmoldvoffset"], $_POST["wtw_tmolduscale"], $_POST["wtw_tmoldvscale"], $_POST["wtw_tmolduploadobjectid"], $_POST["wtw_tmoldreceiveshadows"], $_POST["wtw_tmoldgraphiclevel"], $_POST["wtw_tmoldvideoid"], $_POST["wtw_tmoldvideoposterid"], $_POST["wtw_tmoldtextureid"], $_POST["wtw_tmoldtexturebumpid"], $_POST["wtw_tmoldheightmapid"], $_POST["wtw_tmoldmixmapid"], $_POST["wtw_tmoldtexturerid"], $_POST["wtw_tmoldtexturegid"], $_POST["wtw_tmoldtexturebid"], $_POST["wtw_tmoldtexturebumprid"], $_POST["wtw_tmoldtexturebumpgid"], $_POST["wtw_tmoldtexturebumpbid"], $_POST["wtw_tmoldopacity"], $moldwaterreflection, $_POST["wtw_tmoldsubdivisions"], $_POST["wtw_tmoldminheight"], $_POST["wtw_tmoldmaxheight"], $_POST["wtw_tmoldcheckcollisions"], $_POST["wtw_tmoldispickable"], $_POST["wtw_tmoldactionzoneid"], $_POST["wtw_tmoldcsgmoldid"], $_POST["wtw_tmoldcsgaction"], $_POST["wtw_tmoldalttag"], $_POST["wtw_tmoldwebtext"], $_POST["wtw_tmoldwebstyle"], $_POST["wtw_tmoldpath1points"], $_POST["wtw_tmoldpath2points"], $_POST["wtw_tdiffusecolorr"], $_POST["wtw_tdiffusecolorg"], $_POST["wtw_tdiffusecolorb"], $_POST["wtw_tspecularcolorr"], $_POST["wtw_tspecularcolorg"], $_POST["wtw_tspecularcolorb"], $_POST["wtw_temissivecolorr"], $_POST["wtw_temissivecolorg"], $_POST["wtw_temissivecolorb"], $_POST["wtw_tmoldsoundid"], $_POST["wtw_tmoldsoundname"], $_POST["wtw_tmoldsoundattenuation"], $_POST["wtw_tmoldsoundloop"], $_POST["wtw_tmoldsoundmaxdistance"], $_POST["wtw_tmoldsoundrollofffactor"], $_POST["wtw_tmoldsoundrefdistance"], $_POST["wtw_tmoldsoundconeinnerangle"], $_POST["wtw_tmoldsoundconeouterangle"], $_POST["wtw_tmoldsoundconeoutergain"]);
					if ($_POST["wtw_tmoldimageind"] != "-1") {
						$wtwmoldscommon->saveWebImage('', '', $zmoldid, $_POST["wtw_tmoldimageind"], $_POST["wtw_tmoldaddimageid"], $_POST["wtw_tmoldaddimagehoverid"], $_POST["wtw_tmoldaddimageclickid"], $_POST["wtw_tmoldjsfunction"], $_POST["wtw_tmoldjsparameters"]);
					}
				} else if ($_POST["wtw_tbuildingid"] != "") {
					require_once('../functions/class_wtwbuildingmolds.php');
					global $wtwbuildingmolds;
					$zmoldid = $wtwbuildingmolds->saveBuildingMold($_POST["wtw_tmoldid"], $_POST["wtw_tbuildingid"], $_POST['wtw_tmoldloadactionzoneid'], $_POST['wtw_tmoldshape'], $_POST['wtw_tmoldcovering'], $_POST["wtw_tmoldpositionx"], $_POST["wtw_tmoldpositiony"], $_POST["wtw_tmoldpositionz"], $_POST["wtw_tmoldscalingx"], $_POST["wtw_tmoldscalingy"], $_POST["wtw_tmoldscalingz"], $_POST["wtw_tmoldrotationx"], $_POST["wtw_tmoldrotationy"], $_POST["wtw_tmoldrotationz"], $_POST["wtw_tmoldspecial1"], $_POST["wtw_tmoldspecial2"], $_POST["wtw_tmolduoffset"], $_POST["wtw_tmoldvoffset"], $_POST["wtw_tmolduscale"], $_POST["wtw_tmoldvscale"], $_POST["wtw_tmolduploadobjectid"], $_POST["wtw_tmoldsubdivisions"], $_POST["wtw_tmoldreceiveshadows"], $_POST["wtw_tmoldgraphiclevel"], $_POST["wtw_tmoldvideoid"], $_POST["wtw_tmoldvideoposterid"], $_POST["wtw_tmoldtextureid"], $_POST["wtw_tmoldtexturebumpid"], $_POST["wtw_tmoldheightmapid"], $_POST["wtw_tmoldmixmapid"], $_POST["wtw_tmoldtexturerid"], $_POST["wtw_tmoldtexturegid"], $_POST["wtw_tmoldtexturebid"], $_POST["wtw_tmoldtexturebumprid"], $_POST["wtw_tmoldtexturebumpgid"], $_POST["wtw_tmoldtexturebumpbid"], $_POST["wtw_tmoldopacity"], $moldwaterreflection, $_POST["wtw_tmoldactionzoneid"], $_POST["wtw_tmoldcsgmoldid"], $_POST["wtw_tmoldcsgaction"], $_POST["wtw_tmoldalttag"], $_POST["wtw_tmoldwebtext"], $_POST["wtw_tmoldwebstyle"], $_POST["wtw_tmoldpath1points"], $_POST["wtw_tmoldpath2points"], $_POST["wtw_tdiffusecolorr"], $_POST["wtw_tdiffusecolorg"], $_POST["wtw_tdiffusecolorb"], $_POST["wtw_tspecularcolorr"], $_POST["wtw_tspecularcolorg"], $_POST["wtw_tspecularcolorb"], $_POST["wtw_temissivecolorr"], $_POST["wtw_temissivecolorg"], $_POST["wtw_temissivecolorb"], $_POST["wtw_tmoldsoundid"], $_POST["wtw_tmoldsoundname"], $_POST["wtw_tmoldsoundattenuation"], $_POST["wtw_tmoldsoundloop"], $_POST["wtw_tmoldsoundmaxdistance"], $_POST["wtw_tmoldsoundrollofffactor"], $_POST["wtw_tmoldsoundrefdistance"], $_POST["wtw_tmoldsoundconeinnerangle"], $_POST["wtw_tmoldsoundconeouterangle"], $_POST["wtw_tmoldsoundconeoutergain"]);
					if ($_POST["wtw_tmoldimageind"] != "-1") {
						$wtwmoldscommon->saveWebImage('', $zmoldid, '', $_POST["wtw_tmoldimageind"], $_POST["wtw_tmoldaddimageid"], $_POST["wtw_tmoldaddimagehoverid"], $_POST["wtw_tmoldaddimageclickid"], $_POST["wtw_tmoldjsfunction"], $_POST["wtw_tmoldjsparameters"]);
					}
				} else if ($_POST["wtw_tthingid"] != "") {
					require_once('../functions/class_wtwthingmolds.php');
					global $wtwthingmolds;
					$zmoldid = $wtwthingmolds->saveThingMold($_POST["wtw_tmoldid"], $_POST["wtw_tthingid"], $_POST['wtw_tmoldloadactionzoneid'], $_POST['wtw_tmoldshape'], $_POST['wtw_tmoldcovering'], $_POST["wtw_tmoldpositionx"], $_POST["wtw_tmoldpositiony"], $_POST["wtw_tmoldpositionz"], $_POST["wtw_tmoldscalingx"], $_POST["wtw_tmoldscalingy"], $_POST["wtw_tmoldscalingz"], $_POST["wtw_tmoldrotationx"], $_POST["wtw_tmoldrotationy"], $_POST["wtw_tmoldrotationz"], $_POST["wtw_tmoldspecial1"], $_POST["wtw_tmoldspecial2"], $_POST["wtw_tmolduoffset"], $_POST["wtw_tmoldvoffset"], $_POST["wtw_tmolduscale"], $_POST["wtw_tmoldvscale"], $_POST["wtw_tmolduploadobjectid"], $_POST["wtw_tmoldsubdivisions"], $_POST["wtw_tmoldreceiveshadows"], $_POST["wtw_tmoldgraphiclevel"], $_POST["wtw_tmoldvideoid"], $_POST["wtw_tmoldvideoposterid"], $_POST["wtw_tmoldtextureid"], $_POST["wtw_tmoldtexturebumpid"], $_POST["wtw_tmoldheightmapid"], $_POST["wtw_tmoldmixmapid"], $_POST["wtw_tmoldtexturerid"], $_POST["wtw_tmoldtexturegid"], $_POST["wtw_tmoldtexturebid"], $_POST["wtw_tmoldtexturebumprid"], $_POST["wtw_tmoldtexturebumpgid"], $_POST["wtw_tmoldtexturebumpbid"], $_POST["wtw_tmoldopacity"], $moldwaterreflection, $_POST["wtw_tmoldactionzoneid"], $_POST["wtw_tmoldcsgmoldid"], $_POST["wtw_tmoldcsgaction"], $_POST["wtw_tmoldalttag"], $_POST["wtw_tmoldwebtext"], $_POST["wtw_tmoldwebstyle"], $_POST["wtw_tmoldpath1points"], $_POST["wtw_tmoldpath2points"], $_POST["wtw_tdiffusecolorr"], $_POST["wtw_tdiffusecolorg"], $_POST["wtw_tdiffusecolorb"], $_POST["wtw_tspecularcolorr"], $_POST["wtw_tspecularcolorg"], $_POST["wtw_tspecularcolorb"], $_POST["wtw_temissivecolorr"], $_POST["wtw_temissivecolorg"], $_POST["wtw_temissivecolorb"], $_POST["wtw_tmoldsoundid"], $_POST["wtw_tmoldsoundname"], $_POST["wtw_tmoldsoundattenuation"], $_POST["wtw_tmoldsoundloop"], $_POST["wtw_tmoldsoundmaxdistance"], $_POST["wtw_tmoldsoundrollofffactor"], $_POST["wtw_tmoldsoundrefdistance"], $_POST["wtw_tmoldsoundconeinnerangle"], $_POST["wtw_tmoldsoundconeouterangle"], $_POST["wtw_tmoldsoundconeoutergain"]);
					if ($_POST["wtw_tmoldimageind"] != "-1") {
						$wtwmoldscommon->saveWebImage($zmoldid, '', '', $_POST["wtw_tmoldimageind"], $_POST["wtw_tmoldaddimageid"], $_POST["wtw_tmoldaddimagehoverid"], $_POST["wtw_tmoldaddimageclickid"], $_POST["wtw_tmoldjsfunction"], $_POST["wtw_tmoldjsparameters"]);
					}
				}
				break;
			case "wtw_bdeletemold":
				if ($_POST["wtw_tcommunityid"] != "") {
					require_once('../functions/class_wtwcommunitymolds.php');
					global $wtwcommunitymolds;
					$wtwcommunitymolds->deleteCommunityMold($_POST["wtw_tmoldid"], $_POST["wtw_tcommunityid"], $_POST["wtw_tmolddeleted"]);
				} else if ($_POST["wtw_tbuildingid"] != "") {
					require_once('../functions/class_wtwbuildingmolds.php');
					global $wtwbuildingmolds;
					$wtwbuildingmolds->deleteBuildingMold($_POST["wtw_tmoldid"], $_POST["wtw_tbuildingid"], $_POST["wtw_tmolddeleted"]);
				} else if ($_POST["wtw_tthingid"] != "") {
					require_once('../functions/class_wtwthingmolds.php');
					global $wtwthingmolds;
					$wtwthingmolds->deleteThingMold($_POST["wtw_tmoldid"], $_POST["wtw_tthingid"], $_POST["wtw_tmolddeleted"]);
				}
				break;
		}
	}
} catch (Exception $e) {
	$wtwiframes->serror("core-iframes-molds.php=".$e->getMessage());
} ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Walk the Web - Save Mold</title>
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <script src="/core/scripts/prime/wtw_common_iframe.js"></script>
</head>
<body>
	<form id="wtw_form1" action="molds.php" method="post">
		<input type='hidden' id='wtw_iframename' name='wtw_iframename' value="<?php echo $ziframename; ?>" maxlength="64" />
		<input type='hidden' id='wtw_bval' name='wtw_bval' value="<?php echo $zbval ?>" maxlength="64" />
		<input type="hidden" id="wtw_tcommunityid" name="wtw_tcommunityid" maxlength="16" />
		<input type="hidden" id="wtw_tbuildingid" name="wtw_tbuildingid" maxlength="16" />
		<input type="hidden" id="wtw_tthingid" name="wtw_tthingid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldid" name="wtw_tmoldid" value="<?php echo $zmoldid; ?>" maxlength="16" />
		<input type="hidden" id="wtw_tpastmoldid" name="wtw_tpastmoldid" value="<?php echo $zpastmoldid; ?>" maxlength="16" />
		<input type="hidden" id="wtw_tmoldgroup" name="wtw_tmoldgroup" value="<?php echo $zmoldgroup ?>" maxlength="16" />
		<input type="hidden" id="wtw_twebid" name="wtw_twebid" value="<?php echo $zwebid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tcopywebid" name="wtw_tcopywebid" value="<?php echo $zcopywebid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tmoldmoldgroup" name="wtw_tmoldmoldgroup" value="<?php echo $moldgroup; ?>" maxlength="64" />
		<input type="hidden" id="wtw_tmoldshape" name="wtw_tmoldshape" maxlength="255" />
		<input type="hidden" id="wtw_tmoldcovering" name="wtw_tmoldcovering" maxlength="255" />
		<input type="hidden" id="wtw_tmoldind" name="wtw_tmoldind" value="<?php echo $moldind; ?>" maxlength="12" />
		<input type="hidden" id="wtw_tmoldcsgmoldid" name="wtw_tmoldcsgmoldid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldcsgaction" name="wtw_tmoldcsgaction" maxlength="64" />
		<input type="hidden" id="wtw_tmolduploadobjectid" name="wtw_tmolduploadobjectid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldobjectfolder" name="wtw_tmoldobjectfolder" maxlength="255" />
		<input type="hidden" id="wtw_tmoldobjectfile" name="wtw_tmoldobjectfile" maxlength="255" />
		<input type="hidden" id="wtw_tmoldreceiveshadows" name="wtw_tmoldreceiveshadows" maxlength="12" />
		<input type="hidden" id="wtw_tmoldgraphiclevel" name="wtw_tmoldgraphiclevel" maxlength="12" />
		<input type="hidden" id="wtw_tmoldvideoid" name="wtw_tmoldvideoid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldvideoposterid" name="wtw_tmoldvideoposterid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldtextureid" name="wtw_tmoldtextureid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldtexturebumpid" name="wtw_tmoldtexturebumpid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldtexturehoverid" name="wtw_tmoldtexturehoverid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldheightmapid" name="wtw_tmoldheightmapid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldmixmapid" name="wtw_tmoldmixmapid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldtexturerid" name="wtw_tmoldtexturerid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldtexturegid" name="wtw_tmoldtexturegid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldtexturebid" name="wtw_tmoldtexturebid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldtexturebumprid" name="wtw_tmoldtexturebumprid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldtexturebumpgid" name="wtw_tmoldtexturebumpgid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldtexturebumpbid" name="wtw_tmoldtexturebumpbid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldsoundid" name="wtw_tmoldsoundid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldsoundname" name="wtw_tmoldsoundname" maxlength="255" />
		<input type="hidden" id="wtw_tmoldsoundattenuation" name="wtw_tmoldsoundattenuation" maxlength="12" />
		<input type="hidden" id="wtw_tmoldsoundloop" name="wtw_tmoldsoundloop" maxlength="12" />
		<input type="hidden" id="wtw_tmoldsoundmaxdistance" name="wtw_tmoldsoundmaxdistance" maxlength="12" />
		<input type="hidden" id="wtw_tmoldsoundrollofffactor" name="wtw_tmoldsoundrollofffactor" maxlength="12" />
		<input type="hidden" id="wtw_tmoldsoundrefdistance" name="wtw_tmoldsoundrefdistance" maxlength="12" />
		<input type="hidden" id="wtw_tmoldsoundconeinnerangle" name="wtw_tmoldsoundconeinnerangle" maxlength="12" />
		<input type="hidden" id="wtw_tmoldsoundconeouterangle" name="wtw_tmoldsoundconeouterangle" maxlength="12" />
		<input type="hidden" id="wtw_tmoldsoundconeoutergain" name="wtw_tmoldsoundconeoutergain" maxlength="12" />
		<input type="hidden" id="wtw_tmoldactionzoneid" name="wtw_tmoldactionzoneid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldloadactionzoneid" name="wtw_tmoldloadactionzoneid" maxlength="16" />
		<input type="hidden" id="wtw_tmolddeleted" name="wtw_tmolddeleted" maxlength="16" />
		<input type="hidden" id="wtw_tmoldpositionx" name="wtw_tmoldpositionx" maxlength="12" />
		<input type="hidden" id="wtw_tmoldpositiony" name="wtw_tmoldpositiony" maxlength="12" />
		<input type="hidden" id="wtw_tmoldpositionz" name="wtw_tmoldpositionz" maxlength="12" />
		<input type="hidden" id="wtw_tmoldscalingx" name="wtw_tmoldscalingx" maxlength="12" />
		<input type="hidden" id="wtw_tmoldscalingy" name="wtw_tmoldscalingy" maxlength="12" />
		<input type="hidden" id="wtw_tmoldscalingz" name="wtw_tmoldscalingz" maxlength="12" />
		<input type="hidden" id="wtw_tmoldrotationx" name="wtw_tmoldrotationx" maxlength="12" />
		<input type="hidden" id="wtw_tmoldrotationy" name="wtw_tmoldrotationy" maxlength="12" />
		<input type="hidden" id="wtw_tmoldrotationz" name="wtw_tmoldrotationz" maxlength="12" />
		<input type="hidden" id="wtw_tmoldspecial1" name="wtw_tmoldspecial1" maxlength="12" />
		<input type="hidden" id="wtw_tmoldspecial2" name="wtw_tmoldspecial2" maxlength="12" />
		<input type="hidden" id="wtw_tmolduoffset" name="wtw_tmolduoffset" maxlength="12" />
		<input type="hidden" id="wtw_tmoldvoffset" name="wtw_tmoldvoffset" maxlength="12" />
		<input type="hidden" id="wtw_tmolduscale" name="wtw_tmolduscale" maxlength="12" />
		<input type="hidden" id="wtw_tmoldvscale" name="wtw_tmoldvscale" maxlength="12" />
		<input type="hidden" id="wtw_tmoldbillboard" name="wtw_tmoldbillboard" maxlength="8" />
		<input type="hidden" id="wtw_tmoldopacity" name="wtw_tmoldopacity" maxlength="8" />
		<input type="hidden" id="wtw_tmoldsideorientation" name="wtw_tmoldsideorientation" maxlength="10" />
		<input type="hidden" id="wtw_tmoldsubdivisions" name="wtw_tmoldsubdivisions" maxlength="12" />
		<input type="hidden" id="wtw_tmoldminheight" name="wtw_tmoldminheight" maxlength="16" />
		<input type="hidden" id="wtw_tmoldmaxheight" name="wtw_tmoldmaxheight" maxlength="16" />
		<input type="hidden" id="wtw_tmoldcheckcollisions" name="wtw_tmoldcheckcollisions" maxlength="8" />
		<input type="hidden" id="wtw_tmoldispickable" name="wtw_tmoldispickable" maxlength="8" />
		<input type="hidden" id="wtw_tmoldwaterreflection" name="wtw_tmoldwaterreflection" maxlength="8" />
		<input type="hidden" id="wtw_tmoldimageind" name="wtw_tmoldimageind" maxlength="16" />
		<input type="hidden" id="wtw_tmoldaddimagepath" name="wtw_tmoldaddimagepath" maxlength="255" />
		<input type="hidden" id="wtw_tmoldaddimageid" name="wtw_tmoldaddimageid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldaddimagehoverpath" name="wtw_tmoldaddimagehoverpath" maxlength="255" />
		<input type="hidden" id="wtw_tmoldaddimagehoverid" name="wtw_tmoldaddimagehoverid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldaddimageclickid" name="wtw_tmoldaddimageclickid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldalttag" name="wtw_tmoldalttag" maxlength="255" />
		<input type="hidden" id="wtw_tmoldwebtext" name="wtw_tmoldwebtext" />
		<input type="hidden" id="wtw_tmoldwebstyle" name="wtw_tmoldwebstyle" maxlength="1024" />
		<input type="hidden" id="wtw_tmoldpath1points" name="wtw_tmoldpath1points" />
		<input type="hidden" id="wtw_tmoldpath2points" name="wtw_tmoldpath2points" />
		<input type="hidden" id="wtw_tdiffusecolorr" name="wtw_tdiffusecolorr" maxlength="21" />
		<input type="hidden" id="wtw_tdiffusecolorg" name="wtw_tdiffusecolorg" maxlength="21" />
		<input type="hidden" id="wtw_tdiffusecolorb" name="wtw_tdiffusecolorb" maxlength="21" />
		<input type="hidden" id="wtw_tspecularcolorr" name="wtw_tspecularcolorr" maxlength="21" />
		<input type="hidden" id="wtw_tspecularcolorg" name="wtw_tspecularcolorg" maxlength="21" />
		<input type="hidden" id="wtw_tspecularcolorb" name="wtw_tspecularcolorb" maxlength="21" />
		<input type="hidden" id="wtw_temissivecolorr" name="wtw_temissivecolorr" maxlength="21" />
		<input type="hidden" id="wtw_temissivecolorg" name="wtw_temissivecolorg" maxlength="21" />
		<input type="hidden" id="wtw_temissivecolorb" name="wtw_temissivecolorb" maxlength="21" />
		<input type="hidden" id="wtw_tmoldjsfunction" name="wtw_tmoldjsfunction" maxlength="255" />
		<input type="hidden" id="wtw_tmoldjsparameters" name="wtw_tmoldjsparameters" maxlength="255" />
		<input type="hidden" id="wtw_tmoldsbulk" name="wtw_tmoldsbulk" />
		<input type="submit" id="wtw_bimportmolds" name="wtw_bimportmolds" value="Import Mold" onclick="WTW.buttonClick('wtw_bimportmolds');" />
		<input type="submit" id="wtw_bimportmoldpoints" name="wtw_bimportmoldpoints" value="Import Mold Points" onclick="WTW.buttonClick('wtw_bimportmoldpoints');" />
		<input type="submit" id="wtw_bsavemold" name="wtw_bsavemold" value="Save Mold" onclick="WTW.buttonClick('wtw_bsavemold');" />
		<input type="submit" id="wtw_bsavenewmold" name="wtw_bsavenewmold" value="Save New Mold" onclick="WTW.buttonClick('wtw_bsavenewmold');" />
		<input type="submit" id="wtw_bdeletemold" name="wtw_bdeletemold" value="Delete Mold" onclick="WTW.buttonClick('wtw_bdeletemold');" />
	</div>
	</form>
	<script type="text/javascript">
		function initupdatemoldid() {
			try {
				switch (dGet('wtw_bval').value) {
					case "wtw_bsavenewmold":
						parent.WTW.updateMoldID(dGet('wtw_tmoldid').value, dGet('wtw_tmoldind').value, dGet('wtw_tmoldmoldgroup').value);
						break;
					case "wtw_bimportmolds":
						parent.WTW.completedMoldsImport(dGet('wtw_tmoldgroup').value, dGet('wtw_twebid').value, dGet('wtw_tcopywebid').value);
						break;
					case "wtw_bimportmoldpoints":
						parent.WTW.completedMoldPointsImport(dGet('wtw_tmoldgroup').value, dGet('wtw_twebid').value, dGet('wtw_tcopywebid').value);
						break;
				}
			} catch (ex) {
				WTW.log("iformeditmold-initupdatemoldid=" + ex.message);
			}
		}
<?php	if ($_SERVER['REQUEST_METHOD']=='POST') { ?>
		window.onload = function () {
			try {
				initupdatemoldid();
				parent.WTW.removeIFrame(dGet('wtw_iframename').value);
			} catch (ex) {
				WTW.log("iformeditmold-onload=" + ex.message);
			}
		}	
<?php 	} ?>
	</script>
</body>
</html>	
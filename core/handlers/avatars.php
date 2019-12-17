<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwavatars.php');
	global $wtwavatars;
	$zresults = file_get_contents('php://input');
	$zdata = json_decode($zresults, TRUE);

	$zfunction = null;
	$zavatarid = '';
	$zavatarind = '';
	$zinstanceid = '';
	$zuserip = '';
	$zobjectfolder = '';
	$zobjectfile = '';
	$zscalingx = '';
	$zscalingy = '';
	$zscalingz = '';
	$zavatarpart = '';
	$zemissivecolorr = '';
	$zemissivecolorg = '';
	$zemissivecolorb = '';
	$zavatardisplayname = '';
	$zuseravataranimationid = '';
	$zavataranimationid = '';
	$zavataranimationname = '';
	$zspeedratio = '1';
	$ztransport = '1';
	
	if (!empty($zdata) && isset($zdata)) {
		if (isset($zdata["function"])) {
			$zfunction = strtolower($zdata["function"]);
		}
		if (isset($zdata["avatarid"])) {
			$zavatarid = $zdata["avatarid"];
		}
		if (isset($zdata["avatarind"])) {
			$zavatarind = $zdata["avatarind"];
		}
		if (isset($zdata["instanceid"])) {
			$zinstanceid = $zdata["instanceid"];
		}
		if (isset($zdata["userip"])) {
			$zuserip = $zdata["userip"];
		}
		if (isset($zdata["objectfolder"])) {
			$zobjectfolder = $zdata["objectfolder"];
		}
		if (isset($zdata["objectfile"])) {
			$zobjectfile = $zdata["objectfile"];
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
		if (isset($zdata["avatarpart"])) {
			$zavatarpart = $zdata["avatarpart"];
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
		if (isset($zdata["avatardisplayname"])) {
			$zavatardisplayname = $zdata["avatardisplayname"];
		}
		if (isset($zdata["useravataranimationid"])) {
			$zuseravataranimationid = $zdata["useravataranimationid"];
		}
		if (isset($zdata["avataranimationid"])) {
			$zavataranimationid = $zdata["avataranimationid"];
		}
		if (isset($zdata["avataranimationname"])) {
			$zavataranimationname = $zdata["avataranimationname"];
		}
		if (isset($zdata["speedratio"])) {
			$zspeedratio = $zdata["speedratio"];
		}
		if (isset($zdata["transport"])) {
			$ztransport = $zdata["transport"];
		}
	}

	$zresponse = array();
	switch ($zfunction) {
		case "saveavatar":
			$zavatarid = $wtwavatars->saveAvatar($zavatarid, $zinstanceid, $zuserip, $zavatarind, $zobjectfolder, $zobjectfile, $zscalingx, $zscalingy, $zscalingz);
			$zresponse = array(
				'avatarid'=> $zavatarid
			);
			break;
		case "saveavatarcolor":
			$wtwavatars->saveAvatarColor($zavatarid, $zinstanceid, $zavatarpart, $zemissivecolorr, $zemissivecolorg, $zemissivecolorb);
			break;
		case "saveavatardisplayname":
			$wtwavatars->saveAvatarDisplayName($zavatarid, $zinstanceid, $zavatardisplayname);
			break;
		case "saveavataranimation":
			$zuseravataranimationid = $wtwavatars->saveAvatarAnimation($zuseravataranimationid, $zavatarid, $zavataranimationid, $zavataranimationname, $zspeedratio);
			$zresponse = array(
				'useravataranimationid'=> $zuseravataranimationid
			);
			break;
		case "deleteavataranimation":
			$wtwavatars->deleteAvatarAnimation($zuseravataranimationid, $zavatarid, $zavataranimationid);
			break;
		case "savetransportanimation":
			$wtwavatars->updateAvatarTransport($zavatarid, $zavataranimation, $ztransport);
			break;
		case "getavataranimationsall":
			$zavataranimations = $wtwavatars->getAvatarAnimationsAll($zavatarid);
			$zresponse = array(
				'avataranimations'=> $zavataranimations
			);
			break;
		case "getsession":
			$zuser = $wtwavatars->getUserSession($zinstanceid);
			$zresponse = array(
				'user'=> $zuser
			);
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-avatars.php=".$e->getMessage());
}
?>
<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwavatars.php');
	global $wtwavatars;
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);

	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zavatarid = $wtwhandlers->getPost('avatarid','');
	$zavatarind = $wtwhandlers->getPost('avatarind','');
	$zinstanceid = $wtwhandlers->getPost('instanceid','');
	$zuserip = $wtwhandlers->getPost('userip','');
	$zobjectfolder = $wtwhandlers->getPost('objectfolder','');
	$zobjectfile = $wtwhandlers->getPost('objectfile','');
	$zscalingx = $wtwhandlers->getPost('scalingx','');
	$zscalingy = $wtwhandlers->getPost('scalingy','');
	$zscalingz = $wtwhandlers->getPost('scalingz','');
	$zavatarpart = $wtwhandlers->getPost('avatarpart','');
	$zemissivecolorr = $wtwhandlers->getPost('emissivecolorr','');
	$zemissivecolorg = $wtwhandlers->getPost('emissivecolorg','');
	$zemissivecolorb = $wtwhandlers->getPost('emissivecolorb','');
	$zavatardisplayname = $wtwhandlers->getPost('avatardisplayname','');
	$zuseravataranimationid = $wtwhandlers->getPost('useravataranimationid','');
	$zavataranimationid = $wtwhandlers->getPost('avataranimationid','');
	$zavataranimationname = $wtwhandlers->getPost('avataranimationname','');
	$zspeedratio = $wtwhandlers->getPost('speedratio','1');
	$ztransport = $wtwhandlers->getPost('transport','1');
	
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
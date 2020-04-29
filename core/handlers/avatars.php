<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for avatar functions */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwavatars.php');
	global $wtwavatars;
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	
	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zuseravatarid = $wtwhandlers->getPost('useravatarid','');
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
	$zavataranimationevent = $wtwhandlers->getPost('avataranimationevent','');
	$zspeedratio = $wtwhandlers->getPost('speedratio','1');
	$ztransport = $wtwhandlers->getPost('transport','1');
	
	/* select the function called */
	$zresponse = array();
	switch ($zfunction) {
		case "saveavatar":
			$zuseravatarid = $wtwavatars->saveAvatar($zuseravatarid, $zinstanceid, $zuserip, $zavatarind, $zobjectfolder, $zobjectfile, $zscalingx, $zscalingy, $zscalingz);
			$zresponse = array(
				'useravatarid'=> $zuseravatarid
			);
			break;
		case "saveavatarcolor":
			$wtwavatars->saveAvatarColor($zuseravatarid, $zinstanceid, $zavatarpart, $zemissivecolorr, $zemissivecolorg, $zemissivecolorb);
			break;
		case "saveavatardisplayname":
			$wtwavatars->saveAvatarDisplayName($zuseravatarid, $zinstanceid, $zavatardisplayname);
			break;
		case "saveavataranimation":
			$zuseravataranimationid = $wtwavatars->saveAvatarAnimation($zuseravataranimationid, $zuseravatarid, $zinstanceid, $zavataranimationid, $zavataranimationevent, $zspeedratio);
			$zresponse = array(
				'useravataranimationid'=> $zuseravataranimationid
			);
			break;
		case "deleteavataranimation":
			$wtwavatars->deleteAvatarAnimation($zuseravataranimationid, $zuseravatarid, $zinstanceid, $zavataranimationid);
			break;
		case "savetransportanimation":
			$wtwavatars->updateAvatarTransport($zuseravatarid, $zinstanceid, $zavataranimationid, $ztransport);
			break;
		case "getavataranimationsall":
			$zavataranimations = $wtwavatars->getAvatarAnimationsAll($zuseravatarid, $zinstanceid);
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

	/* set headers to keep data local to server */
	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	/* return the response from the function */
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-avatars.php=".$e->getMessage());
}
?>
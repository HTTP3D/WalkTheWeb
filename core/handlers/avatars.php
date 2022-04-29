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
	$zavatarid = $wtwhandlers->getPost('avatarid','');
	$zwebid = $wtwhandlers->getPost('webid','');
	$zupdatewebid = $wtwhandlers->getPost('updatewebid','');
	$zwebtype = $wtwhandlers->getPost('webtype','');
	$zinstanceid = $wtwhandlers->getPost('instanceid','');
	$zuserip = $wtwhandlers->getPost('userip','');
	$zobjectfolder = $wtwhandlers->getPost('objectfolder','');
	$zobjectfile = $wtwhandlers->getPost('objectfile','');
	$zanimationicon = $wtwhandlers->getPost('animationicon','');
	$zdisplayname = $wtwhandlers->getPost('displayname','');
	$zavatardescription = $wtwhandlers->getPost('avatardescription','');
	$zgender = $wtwhandlers->getPost('gender','');
	$ztemplatename = $wtwhandlers->getPost('templatename','');
	$zdescription = $wtwhandlers->getPost('description','');
	$ztags = $wtwhandlers->getPost('tags','');
	$zversionid = $wtwhandlers->getPost('versionid','');
	$zversion = $wtwhandlers->getPost('version','');
	$zversiondesc = $wtwhandlers->getPost('versiondesc','');
	$zsharehash = $wtwhandlers->getPost('sharehash','');
	$zpositionx = $wtwhandlers->getPost('positionx','0');
	$zpositiony = $wtwhandlers->getPost('positiony','0');
	$zpositionz = $wtwhandlers->getPost('positionz','0');
	$zscalingx = $wtwhandlers->getPost('scalingx','1');
	$zscalingy = $wtwhandlers->getPost('scalingy','1');
	$zscalingz = $wtwhandlers->getPost('scalingz','1');
	$zrotationx = $wtwhandlers->getPost('rotationx','0');
	$zrotationy = $wtwhandlers->getPost('rotationy','0');
	$zrotationz = $wtwhandlers->getPost('rotationz','0');
	$zstartframe = $wtwhandlers->getPost('startframe','0');
	$zendframe = $wtwhandlers->getPost('endframe','0');
	$zsortorder = $wtwhandlers->getPost('sortorder','0');

	$zavatarpartid = $wtwhandlers->getPost('avatarpartid','');
	$zavatarpart = $wtwhandlers->getPost('avatarpart','');
	$zemissivecolorr = $wtwhandlers->getPost('emissivecolorr','');
	$zemissivecolorg = $wtwhandlers->getPost('emissivecolorg','');
	$zemissivecolorb = $wtwhandlers->getPost('emissivecolorb','');

	$zdiffusecolor = $wtwhandlers->getPost('diffusecolor','');
	$zspecularcolor = $wtwhandlers->getPost('specularcolor','');
	$zemissivecolor = $wtwhandlers->getPost('emissivecolor','');
	$zambientcolor = $wtwhandlers->getPost('ambientcolor','');
	$zavatardisplayname = $wtwhandlers->getPost('avatardisplayname','');
	$zuseravataranimationid = $wtwhandlers->getPost('useravataranimationid','');
	$zavataranimationid = $wtwhandlers->getPost('avataranimationid','');
	$zanimationevent = $wtwhandlers->getPost('animationevent','');
	$zanimationfriendlyname = $wtwhandlers->getPost('animationfriendlyname','');
	$zloadpriority = $wtwhandlers->getPost('loadpriority','0');
	$zspeedratio = $wtwhandlers->getPost('speedratio','1');
	$ztransport = $wtwhandlers->getPost('transport','1');
	$zavatargroupid = $wtwhandlers->getPost('avatargroupid','');
	$zavatargroup = $wtwhandlers->getPost('avatargroup','');
	$zanimationeventid = $wtwhandlers->getPost('animationeventid','');
	$zanimationevent = $wtwhandlers->getPost('animationevent','');

	$zfilename = $wtwhandlers->getPost('filename','');
	$zuploadfile = $wtwhandlers->getFiles('wtw_uploadfile',null);
	$zuploadfiles = $wtwhandlers->getFiles('wtw_uploadfiles',null);
	
	/* select the function called */
	$zresponse = array();
	switch ($zfunction) {
		case "quicksaveavatar":
			$zresponse = $wtwavatars->quicksaveAvatar($zinstanceid, $zuserip, $zavatarid, $zdisplayname);
			break;
		case "saveavatarcolor":
			$wtwavatars->saveAvatarColor($zuseravatarid, $zinstanceid, $zavatarpart, $zemissivecolorr, $zemissivecolorg, $zemissivecolorb);
			break;
		case "saveavatardisplayname":
			$wtwavatars->saveAvatarDisplayName($zuseravatarid, $zinstanceid, $zavatardisplayname);
			break;
		case "saveavataranimation":
			$zuseravataranimationid = $wtwavatars->saveAvatarAnimation($zuseravataranimationid, $zuseravatarid, $zinstanceid, $zavataranimationid, $zanimationevent, $zspeedratio);
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
		case "saveavatargroup":
			$zresponse = $wtwavatars->saveAvatarGroup($zavatargroupid, $zavatargroup);
			break;
		case "deleteavatargroup":
			$zresponse = $wtwavatars->deleteAvatarGroup($zavatargroupid);
			break;
		case "getavatargroups":
			$zresponse = $wtwavatars->getAvatarGroups();
			break;
		case "saveavataranimationevent":
			$zresponse = $wtwavatars->saveAvatarAnimationEvent($zanimationeventid, $zanimationevent, $zloadpriority);
			break;
		case "deleteavataranimationevent":
			$zresponse = $wtwavatars->deleteAvatarAnimationEvent($zanimationeventid);
			break;
		case "getavataranimationevents":
			$zresponse = $wtwavatars->getAvatarAnimationEvents();
			break;
		case "copyavatarprofile":
			$zresponse = $wtwavatars->copyAvatarProfile($zavatarid);
			break;
		case "saveavatarprofile":
			$zresponse = $wtwavatars->saveAvatarProfile($zavatarid, $zavatargroup, $zdisplayname, $zobjectfolder, $zobjectfile, $zgender, $zscalingx, $zscalingy, $zscalingz, $zstartframe, $zendframe, $zsortorder);
			break;
		case "deleteavatarprofile":
			$zresponse = $wtwavatars->deleteAvatarProfile($zavatarid);
			break;
		case "savenewavatar":
			$zresponse = $wtwavatars->saveNewAvatar($zavatarid, $zavatargroup, $zdisplayname, $zavatardescription, $zgender, $zobjectfolder, $zobjectfile, $zstartframe, $zendframe);
			break;
		case "saveavatarinformation":
			$zresponse = $wtwavatars->saveAvatarInformation($zavatarid, $zavatargroup, $zdisplayname, $zavatardescription, $zgender);
			break;
		case "saveavatarscaling":
			$zresponse = $wtwavatars->saveAvatarScaling($zavatarid, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz);
			break;
		case "saveavatardefinitioncolor":
			$zresponse = $wtwavatars->saveAvatarDefinitionColor($zavatarid, $zavatarpartid, $zavatarpart, $zdiffusecolor, $zspecularcolor, $zemissivecolor, $zambientcolor);
			break;
		case "saveavatardefinitionrootanimation":
			$zresponse = $wtwavatars->saveAvatarDefinitionRootAnimation($zavatarid, $zstartframe, $zendframe);
			break;
		case "saveavatardefinitionanimation":
			$zresponse = $wtwavatars->saveAvatarDefinitionAnimation($zavatarid, $zavataranimationid, $zloadpriority, $zanimationevent, $zanimationfriendlyname, $zanimationicon, $zobjectfolder, $zobjectfile, $zstartframe, $zendframe, $zspeedratio);
			break;
		case "deleteavatardefinitionanimation":
			$zresponse = $wtwavatars->deleteAvatarDefinitionAnimation($zavatarid, $zavataranimationid);
			break;
		case "uploadavatarfile":
			$zresponse = $wtwavatars->uploadAvatarFile($zuploadfile, $zobjectfolder, $zavatarid);
			break;
		case "uploadavatarfiles":
			$zresponse = $wtwavatars->uploadAvatarFiles($zuploadfiles, $zobjectfolder, $zavatarid);
			break;
		case "deleteavatarfile":
			$zresponse = $wtwavatars->deleteAvatarFile($zfilename, $zobjectfolder);
			break;
		case "saveavatartemplate":
			$zresponse = $wtwavatars->saveAvatarTemplate($zavatarid, $ztemplatename, $zdescription, $ztags, $zversion, $zversiondesc);
			break;
		case "shareavatartemplate":
			$zresponse = $wtwavatars->shareAvatarTemplate($zavatarid, $zsharehash);
			break;
		case "setuseravatarglobalhash":
			$zresponse = $wtwavatars->setUserAvatarGlobalHash($zuseravatarid);
			break;
		case "deleteuseravatar":
			$zresponse = $wtwavatars->deleteUserAvatar($zuseravatarid);
			break;
		case "downloadweb":
			$zresponse = $wtwavatars->downloadWeb($zwebid, $zwebid, $zwebtype, '');
			break;
		case "downloadupdateweb":
			$zresponse = $wtwavatars->downloadUpdateWeb($zwebid, $zupdatewebid, $zwebtype, '');
			break;
		case "downloadupdateuseravatar":
			$zresponse = $wtwavatars->downloadUpdateUserAvatar($zuseravatarid, $zinstanceid, $zwebid, $zupdatewebid, $zwebtype, '');
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
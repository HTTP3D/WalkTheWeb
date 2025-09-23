<?php
global $wtwhandlers;
try {
	/* include the class for the functions to save, edit, or delete the records in the database */
	require_once(WTW_READYPLAYERME_PATH . '/functions/class_functions.php');
	global $wtwreadyplayerme_functions;
	/* get sent data */
	$zrequest = $wtwhandlers->openFilefromURL('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	/* get the requested function name for the awitch case below */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	
	/* get form Posted Values - your passed data */
	$zobjectfolder = $wtwhandlers->getPost('objectfolder','');
	$zobjectfile = $wtwhandlers->getPost('objectfile','');
	$zanimationicon = $wtwhandlers->getPost('animationicon','');
	$zavataranimationid = $wtwhandlers->getPost('avataranimationid','');
	$zanimationevent = $wtwhandlers->getPost('animationevent','');
	$zanimationfriendlyname = $wtwhandlers->getPost('animationfriendlyname','');
	$zstartframe = $wtwhandlers->getPost('startframe','0');
	$zendframe = $wtwhandlers->getPost('endframe','0');
	$zloadpriority = $wtwhandlers->getPost('loadpriority','0');
	$zspeedratio = $wtwhandlers->getPost('speedratio','1');
	$zanimationeventid = $wtwhandlers->getPost('animationeventid','');
	$zwtwaccount = $wtwhandlers->getPost('wtwaccount','1');
	$ztoken = $wtwhandlers->getPost('token','');
	$zavatarid = $wtwhandlers->getPost('avatarid','');

	$zfilename = $wtwhandlers->getPost('filename','');
	$zuploadfile = $wtwhandlers->getFiles('wtw_uploadfile',null);
	$zuploadfiles = $wtwhandlers->getFiles('wtw_uploadfiles',null);

	/* set response array of values - customize as needed */
	$zresponse = array(
		'serror'=> ''
	);
	switch ($zfunction) {
		case "getavataranimations":
			$zresponse = $wtwreadyplayerme_functions->getAvatarAnimations();
			break;
		case "saveavatardefinitionanimation":
			$zresponse = $wtwreadyplayerme_functions->saveAvatarDefinitionAnimation($zavataranimationid, $zloadpriority, $zanimationevent, $zanimationfriendlyname, $zanimationicon, $zobjectfolder, $zobjectfile, $zstartframe, $zendframe, $zspeedratio);
			break;
		case "deleteavatardefinitionanimation":
			$zresponse = $wtwreadyplayerme_functions->deleteAvatarDefinitionAnimation($zavataranimationid);
			break;
		case "saveavataranimation":
			$zavataranimationid = $wtwreadyplayerme_functions->saveAvatarAnimation($zavataranimationid, $zanimationevent, $zspeedratio);
			$zresponse = array(
				'avataranimationid'=> $zavataranimationid
			);
			break;
		case "deleteavataranimation":
			$wtwreadyplayerme_functions->deleteAvatarAnimation($zavataranimationid);
			break;
		case "uploadavatarfile":
			$zresponse = $wtwreadyplayerme_functions->uploadAvatarFile($zuploadfile, $zobjectfolder);
			break;
		case "uploadavatarfiles":
			$zresponse = $wtwreadyplayerme_functions->uploadAvatarFiles($zuploadfiles, $zobjectfolder);
			break;
		case "deleteavatarfile":
			$zresponse = $wtwreadyplayerme_functions->deleteAvatarFile($zfilename, $zobjectfolder);
			break;
		case "getanonymoususerid":
			$zresponse = $wtwreadyplayerme_functions->getAnonymousUserId($zwtwaccount);
			break;
		case "getavatartemplates":
			$zresponse = $wtwreadyplayerme_functions->getAvatarTemplates($zwtwaccount, $ztoken);
			break;
		case "createdraftavatar":
			$zresponse = $wtwreadyplayerme_functions->createDraftAvatar($zwtwaccount, $ztoken, $zavatarid);
			break;
		case "getdraftavatar":
			$zresponse = $wtwreadyplayerme_functions->getDraftAvatar($zwtwaccount, $ztoken, $zavatarid);
			break;
		case "getlistbasemodels":
			$zresponse = $wtwreadyplayerme_functions->getListBaseModels();
			break;
		case "loadchoiceavatarsarray":
			$zresponse = $wtwreadyplayerme_functions->loadChoiceAvatarsArray($zwtwaccount, $ztoken);
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-wtw-readyplayerme-wtw-readyplayerme-avatars.php=".$e->getMessage());
}
?>
<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for download functions */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwdownloads.php');
	global $wtwdownloads;
	$zrequest = $wtwhandlers->openFilefromURL('php://input');
	$zrequest = json_decode($zrequest, TRUE);

	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zcommunityid = $wtwhandlers->getPost('communityid','');
	$znewcommunityid = $wtwhandlers->getPost('newcommunityid','');
	$znewbuildingid = $wtwhandlers->getPost('newbuildingid','');
	$znewthingid = $wtwhandlers->getPost('newthingid','');
	$zwebid = $wtwhandlers->getPost('webid','');
	$znewwebid = $wtwhandlers->getPost('newwebid','');
	$zupdatewebid = $wtwhandlers->getPost('updatewebid','');
	$zparentwebid = $wtwhandlers->getPost('parentwebid','');
	$zavatarid = $wtwhandlers->getPost('avatarid','');
	$zinstanceid = $wtwhandlers->getPost('instanceid','');
	$zuseravatarid = $wtwhandlers->getPost('useravatarid','');
	$znewcreateuserid = $wtwhandlers->getPost('newcreateuserid','');
	$znewupdateuserid = $wtwhandlers->getPost('newupdateuserid','');
	$zwebtype = $wtwhandlers->getPost('webtype','');
	$zparentwebtype = $wtwhandlers->getPost('parentwebtype','');
	$zdownloadid = $wtwhandlers->getPost('downloadid','');
	$zavatargroup = $wtwhandlers->getPost('avatargroup','');
	$zobjectfolder = $wtwhandlers->getPost('objectfolder','');
	$zusertoken = $wtwhandlers->getPost('usertoken','');
	$zbuildingpositionx = $wtwhandlers->getPost('buildingpositionx','0');
	$zbuildingpositiony = $wtwhandlers->getPost('buildingpositiony','0');
	$zbuildingpositionz = $wtwhandlers->getPost('buildingpositionz','0');
	$zbuildingscalingx = $wtwhandlers->getPost('buildingscalingx','1');
	$zbuildingscalingy = $wtwhandlers->getPost('buildingscalingy','1');
	$zbuildingscalingz = $wtwhandlers->getPost('buildingscalingz','1');
	$zbuildingrotationx = $wtwhandlers->getPost('buildingrotationx','0');
	$zbuildingrotationy = $wtwhandlers->getPost('buildingrotationy','0');
	$zbuildingrotationz = $wtwhandlers->getPost('buildingrotationz','0');
	$zprocess = $wtwhandlers->getPost('process','');
	$znewfolder = $wtwhandlers->getPost('newfolder','');
	$znewurl = $wtwhandlers->getPost('newurl','');
	$zdataarray = $wtwhandlers->getPost('dataarray','');
	
	/* select the function called */
	$zresponse = array();
	switch ($zfunction) {
		case "downloadweb":
			$zresponse = $wtwdownloads->downloadWeb($zwebid, $zwebid, $zwebtype, '', '', '', $zcommunityid, $zbuildingpositionx, $zbuildingpositiony, $zbuildingpositionz, $zbuildingscalingx, $zbuildingscalingy, $zbuildingscalingz, $zbuildingrotationx, $zbuildingrotationy, $zbuildingrotationz);
			break;
		case "downloadwebprogress":
			$zresponse = $wtwdownloads->downloadWebProgress($zwebid, $znewwebid, $zwebtype, $zusertoken, $zparentwebid, $zparentwebtype, $zcommunityid, $zbuildingpositionx, $zbuildingpositiony, $zbuildingpositionz, $zbuildingscalingx, $zbuildingscalingy, $zbuildingscalingz, $zbuildingrotationx, $zbuildingrotationy, $zbuildingrotationz);
			break;
		case "downloadupdateweb":
			$zresponse = $wtwdownloads->downloadUpdateWeb($zwebid, $zupdatewebid, $zwebtype, $zusertoken);
			break;
		case "updatedownloadsqueue":
			$zresponse = $wtwdownloads->updateDownloadsQueue($zdownloadid, $zwebid, $zwebtype, $zprocess);
			break;
		case "downloadusers":
			$zresponse = $wtwdownloads->downloadUsers($zdataarray, $zusertoken);
			break;
		case "downloaduploads":
			$zresponse = $wtwdownloads->downloadUploads($zdataarray, $znewfolder, $znewurl, $zusertoken);
			break;
		case "downloadmainweb":
			$zresponse = $wtwdownloads->downloadMainWeb($zdataarray, $zwebtype, $znewwebid, $zparentwebtype, $zparentwebid, $zusertoken);
			break;
		case "downloadactionzoneavataranimations":
			$zresponse = $wtwdownloads->downloadActionZonesAvatarAnimations($zdataarray, $znewfolder, $zusertoken);
			break;
		case "downloadactionzones":
			$zresponse = $wtwdownloads->downloadActionZones($zdataarray, $znewcommunityid, $znewbuildingid, $znewthingid, $zusertoken);
			break;
		case "downloadscripts":
			$zresponse = $wtwdownloads->downloadScripts($zdataarray, $znewfolder, $zusertoken);
			break;
		case "downloadconnectinggrids":
			$zresponse = $wtwdownloads->downloadConnectingGrids($zdataarray, $znewwebid, $zusertoken);
			break;
		case "downloadcontentratings":
			$zresponse = $wtwdownloads->downloadContentRatings($zdataarray, $znewwebid, $zusertoken);
			break;
		case "downloadpluginsrequired":
			$zresponse = $wtwdownloads->downloadPluginsRequired($zdataarray, $znewwebid, $zusertoken);
			break;
		case "downloaduploadobjects":
			$zresponse = $wtwdownloads->downloadUploadObjects($zdataarray, $znewfolder, $znewurl, $zusertoken);
			break;
		case "downloadmolds":
			$zresponse = $wtwdownloads->downloadMolds($zdataarray, $zwebtype, $znewwebid, $zusertoken);
			break;
		case "downloadaddfirstbuilding":
			$zresponse = $wtwdownloads->downloadAddFirstBuilding($znewwebid, $zwebtype, $zcommunityid, $zbuildingpositionx, $zbuildingpositiony, $zbuildingpositionz, $zbuildingscalingx, $zbuildingscalingy, $zbuildingscalingz, $zbuildingrotationx, $zbuildingrotationy, $zbuildingrotationz, $zusertoken);
			break;
		case "downloadchildconnectinggrids":
			$zresponse = $wtwdownloads->downloadChildConnectingGrids($zdataarray, $znewwebid, $zwebtype, $zusertoken, true);
			break;
		case "downloadavatar":
			$zresponse = $wtwdownloads->downloadAvatar($zwebid, $znewwebid, $zusertoken);
			break;
		case "downloadavatarprogress":
			$zresponse = $wtwdownloads->downloadAvatarProgress($zwebid, $znewwebid, $zusertoken);
			break;
		case "downloadupdateavatar":
			$zresponse = $wtwdownloads->downloadUpdateAvatar($zwebid, $zupdatewebid, $zwebtype, $zusertoken);
			break;
		case "downloadupdateuseravatar":
			$zresponse = $wtwdownloads->downloadUpdateUserAvatar($zuseravatarid, $zinstanceid, $zwebid, $zupdatewebid, $zwebtype, $zusertoken);
			break;
		case "downloadmainavatar":
			$zresponse = $wtwdownloads->downloadMainAvatar($zdataarray, $znewwebid, $zobjectfolder, $zusertoken);
			break;
		case "downloadavatarfiles":
			$zresponse = $wtwdownloads->downloadAvatarFiles($zdataarray, $zwebid, $zobjectfolder, $zusertoken);
			break;
		case "downloadavatargroup":
			$zresponse = $wtwdownloads->downloadAvatarGroup($zavatargroup, $znewcreateuserid, $znewupdateuserid, $zusertoken);
			break;
		case "downloadavatarparts":
			$zresponse = $wtwdownloads->downloadAvatarParts($zdataarray, $znewwebid, $zusertoken);
			break;
		case "downloadavataranimations":
			$zresponse = $wtwdownloads->downloadAvatarAnimations($zdataarray, $znewwebid, $zobjectfolder, $zusertoken);
			break;
	}

	/* set headers to keep data local to server */
	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	/* return the response from the function */
	echo json_encode($zresponse);
	
} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-downloads.php=".$e->getMessage());
}
?>
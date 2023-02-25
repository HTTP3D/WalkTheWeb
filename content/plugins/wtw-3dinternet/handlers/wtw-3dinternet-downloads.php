<?php
global $wtwhandlers;
try {
	/* include the class for the functions to save, edit, or delete the records in the database */
	require_once(WTW_3DINTERNET_PATH . '/functions/class_downloads.php');
	global $wtw_3dinternet_downloads;
	/* get sent data */
	$zrequest = $wtwhandlers->openFilefromURL('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	/* get the requested function name for the awitch case below */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	
	/* get form Posted Values - your passed data */
	/* $wtwhandlers->getPost(fieldname, defaultvalue); */
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

	/* set response array of values - customize response as needed */
	$zresponse = array(
		'serror'=> ''
	);
	switch ($zfunction) {
		case "downloadweb":
			$zresponse = $wtw_3dinternet_downloads->downloadWeb($zwebid, $zwebid, $zwebtype, '', '', '', $zcommunityid, $zbuildingpositionx, $zbuildingpositiony, $zbuildingpositionz, $zbuildingscalingx, $zbuildingscalingy, $zbuildingscalingz, $zbuildingrotationx, $zbuildingrotationy, $zbuildingrotationz);
			break;
		case "downloadwebprogress":
			$zresponse = $wtw_3dinternet_downloads->downloadWebProgress($zwebid, $znewwebid, $zwebtype, $zusertoken, $zparentwebid, $zparentwebtype, $zcommunityid, $zbuildingpositionx, $zbuildingpositiony, $zbuildingpositionz, $zbuildingscalingx, $zbuildingscalingy, $zbuildingscalingz, $zbuildingrotationx, $zbuildingrotationy, $zbuildingrotationz);
			break;
		case "downloadupdateweb":
			$zresponse = $wtw_3dinternet_downloads->downloadUpdateWeb($zwebid, $zupdatewebid, $zwebtype, $zusertoken);
			break;
		case "updatedownloadsqueue":
			$zresponse = $wtw_3dinternet_downloads->updateDownloadsQueue($zdownloadid, $zwebid, $zwebtype, $zprocess);
			break;
		case "downloadusers":
			$zresponse = $wtw_3dinternet_downloads->downloadUsers($zdataarray, $zusertoken);
			break;
		case "downloaduploads":
			$zresponse = $wtw_3dinternet_downloads->downloadUploads($zdataarray, $znewfolder, $znewurl, $zusertoken);
			break;
		case "downloadmainweb":
			$zresponse = $wtw_3dinternet_downloads->downloadMainWeb($zdataarray, $zwebtype, $znewwebid, $zparentwebtype, $zparentwebid, $zusertoken);
			break;
		case "downloadactionzonesavataranimations":
			$zresponse = $wtw_3dinternet_downloads->downloadActionZonesAvatarAnimations($zdataarray, $znewfolder, $zusertoken);
			break;
		case "downloadactionzones":
			$zresponse = $wtw_3dinternet_downloads->downloadActionZones($zdataarray, $znewcommunityid, $znewbuildingid, $znewthingid, $zusertoken);
			break;
		case "downloadscripts":
			$zresponse = $wtw_3dinternet_downloads->downloadScripts($zdataarray, $znewfolder, $zusertoken);
			break;
		case "downloadconnectinggrids":
			$zresponse = $wtw_3dinternet_downloads->downloadConnectingGrids($zdataarray, $znewwebid, $zusertoken);
			break;
		case "downloadcontentratings":
			$zresponse = $wtw_3dinternet_downloads->downloadContentRatings($zdataarray, $znewwebid, $zusertoken);
			break;
		case "downloadpluginsrequired":
			$zresponse = $wtw_3dinternet_downloads->downloadPluginsRequired($zdataarray, $znewwebid, $zusertoken);
			break;
		case "downloaduploadobjects":
			$zresponse = $wtw_3dinternet_downloads->downloadUploadObjects($zdataarray, $znewfolder, $znewurl, $zusertoken);
			break;
		case "downloadmolds":
			$zresponse = $wtw_3dinternet_downloads->downloadMolds($zdataarray, $zwebtype, $znewwebid, $zusertoken);
			break;
		case "downloadaddfirstbuilding":
			$zresponse = $wtw_3dinternet_downloads->downloadAddFirstBuilding($znewwebid, $zwebtype, $zcommunityid, $zbuildingpositionx, $zbuildingpositiony, $zbuildingpositionz, $zbuildingscalingx, $zbuildingscalingy, $zbuildingscalingz, $zbuildingrotationx, $zbuildingrotationy, $zbuildingrotationz, $zusertoken);
			break;
		case "downloadchildconnectinggrids":
			$zresponse = $wtw_3dinternet_downloads->downloadChildConnectingGrids($zdataarray, $znewwebid, $zwebtype, $zusertoken, true);
			break;
		case "downloadavatar":
			$zresponse = $wtw_3dinternet_downloads->downloadAvatar($zwebid, $znewwebid, $zusertoken);
			break;
		case "downloadavatarprogress":
			$zresponse = $wtw_3dinternet_downloads->downloadAvatarProgress($zwebid, $znewwebid, $zusertoken);
			break;
		case "downloadupdateavatar":
			$zresponse = $wtw_3dinternet_downloads->downloadUpdateAvatar($zwebid, $zupdatewebid, $zwebtype, $zusertoken);
			break;
		case "downloadupdateuseravatar":
			$zresponse = $wtw_3dinternet_downloads->downloadUpdateUserAvatar($zuseravatarid, $zinstanceid, $zwebid, $zupdatewebid, $zwebtype, $zusertoken);
			break;
		case "downloadmainavatar":
			$zresponse = $wtw_3dinternet_downloads->downloadMainAvatar($zdataarray, $znewwebid, $zobjectfolder, $zusertoken);
			break;
		case "downloadavatarfiles":
			$zresponse = $wtw_3dinternet_downloads->downloadAvatarFiles($zdataarray, $zwebid, $zobjectfolder, $zusertoken);
			break;
		case "downloadavatargroup":
			$zresponse = $wtw_3dinternet_downloads->downloadAvatarGroup($zavatargroup, $znewcreateuserid, $znewupdateuserid, $zusertoken);
			break;
		case "downloadavatarparts":
			$zresponse = $wtw_3dinternet_downloads->downloadAvatarParts($zdataarray, $znewwebid, $zusertoken);
			break;
		case "downloadavataranimations":
			$zresponse = $wtw_3dinternet_downloads->downloadAvatarAnimations($zdataarray, $znewwebid, $zobjectfolder, $zusertoken);
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-wtw-3dinternet-downloads.php=".$e->getMessage());
}
?>
<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for uploads (database driven) functions */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwuploads.php');
	global $wtwuploads;
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);

	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zcommunityid = $wtwhandlers->getPost('communityid','');
	$zbuildingid = $wtwhandlers->getPost('buildingid','');
	$zthingid = $wtwhandlers->getPost('thingid','');
	$zavatarid = $wtwhandlers->getPost('avatarid','');
	$zsettings = $wtwhandlers->getPost('settings','');
	$zvalue = $wtwhandlers->getPost('value','');
	$zwebaliasid = $wtwhandlers->getPost('webaliasid','');
	$zforcehttps = $wtwhandlers->getPost('forcehttps','');
	$zdomainname = $wtwhandlers->getPost('domainname','');
	$zcommunitypublishname = $wtwhandlers->getPost('communitypublishname','');
	$zbuildingpublishname = $wtwhandlers->getPost('buildingpublishname','');
	$zthingpublishname = $wtwhandlers->getPost('thingpublishname','');
	$zfilepath = $wtwhandlers->getPost('filepath','');
	$zfilename = $wtwhandlers->getPost('filename','');
	$zfiledata = $wtwhandlers->getPost('filedata','');
	$zkey = $wtwhandlers->getPost('key','');
	$zwebtype = $wtwhandlers->getPost('webtype','');
	$zwebid = $wtwhandlers->getPost('webid','');
	$zcopywebid = $wtwhandlers->getPost('copywebid','');
	$zuploadsbulk = $wtwhandlers->getPost('uploadsbulk','');
	$zwebimagesbulk = $wtwhandlers->getPost('webimagesbulk','');
	$zitem = $wtwhandlers->getPost('item','');
	$zcategory = $wtwhandlers->getPost('category','');
	$zhide = $wtwhandlers->getPost('hide','');
	$zuploadid = $wtwhandlers->getPost('uploadid','');
	
	/* select the function called */
	$zresponse = array();
	switch ($zfunction) {
		case "getsettings":	
			$zsettingsvalues = json_encode($wtwuploads->getSettings($zsettings));
			$zresponse = array(
				'settings'=> $zsettingsvalues
			);
			break;
		case "savesettings":	
			$zsuccess = $wtwuploads->saveSettings($zsettings);
			$zresponse = array(
				'success'=> $zsuccess
			);
			break;
		case "savesetting":
			$zsuccess = $wtwuploads->saveSetting($zsettings, $zvalue);
			$zresponse = array(
				'success'=> $zsuccess
			);
			break;
		case "savewebalias":
			$zsuccess = $wtwuploads->saveWebAlias($zwebaliasid, $zforcehttps, $zdomainname, $zcommunitypublishname, $zbuildingpublishname, $zthingpublishname, $zcommunityid, $zbuildingid, $zthingid);
			$zresponse = array(
				'success'=> $zsuccess
			);
			break;
		case "deletewebalias":
			$wtwuploads->deleteWebAlias($zwebaliasid);
			break;
		case "getmyimages":
			$zresponse = $wtwuploads->getMyImages($zcategory, $zhide);
			break;
		case "getstockimages":
			$zresponse = $wtwuploads->getStockImages($zitem);
			break;
		case "getcommunityimages":
			$zresponse = $wtwuploads->getCommunityImages($zcommunityid, $zbuildingid, $zthingid);
			break;
		case "saveimage":
			$zresults = $wtwuploads->saveImageFilePng(addslashes($zfilepath), $zfilename, $zfiledata, $zcommunityid, $zbuildingid, $zthingid, $zavatarid);
			$zresponse = array(
				'snapshotid'=> $zresults['snapshotid'],
				'snapshotpath'=> $zresults['snapshotpath'],
				'snapshotdata'=> $zresults['snapshotdata']
			);
			break;
		case "togglehidemyimage":
			$wtwuploads->toggleHideMyImage($zuploadid, $zhide);
			break;
		case "setkeyhash":
			$zkeyhash = $wtwuploads->setKeyHash($zkey, $zwebtype, $zwebid);
			$zresponse = array(
				'keyhash'=> $zkeyhash
			);
			break;
		case "importuploads":
			$wtwuploads->importUploads($zwebtype, $zwebid, $zcopywebid, $zuploadsbulk);
			break;
		case "importwebimages":
			$wtwuploads->importWebImages($zwebtype, $zwebid, $zcopywebid, $zwebimagesbulk);
			break;
	}

	/* set headers to keep data local to server */
	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	/* return the response from the function */
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-uploads.php=".$e->getMessage());
}
?>
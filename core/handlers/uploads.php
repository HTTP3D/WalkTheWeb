<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwuploads.php');
	global $wtwuploads;
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);

	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zcommunityid = $wtwhandlers->getPost('communityid','');
	$zbuildingid = $wtwhandlers->getPost('buildingid','');
	$zthingid = $wtwhandlers->getPost('thingid','');
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
	$zmoldgroup = $wtwhandlers->getPost('moldgroup','');
	$zwebid = $wtwhandlers->getPost('webid','');
	$zcopywebid = $wtwhandlers->getPost('copywebid','');
	$zuploadsbulk = $wtwhandlers->getPost('uploadsbulk','');
	$zwebimagesbulk = $wtwhandlers->getPost('webimagesbulk','');
	$zitem = $wtwhandlers->getPost('item','');
	$zcategory = $wtwhandlers->getPost('category','');
	$zhide = $wtwhandlers->getPost('hide','');
	$zuploadid = $wtwhandlers->getPost('uploadid','');
	
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
			$zsuccess = $wtwuploads->saveSetting($zsetting, $zvalue);
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
			$resp = $wtwuploads->saveImageFilePng(addslashes($zfilepath), $zfilename, $zfiledata, $zcommunityid, $zbuildingid, $zthingid);
			$zresponse = array(
				'snapshotid'=> $resp['snapshotid'],
				'snapshotpath'=> $resp['snapshotpath'],
				'snapshotdata'=> $resp['snapshotdata']
			);
			break;
		case "togglehidemyimage":
			$wtwuploads->toggleHideMyImage($zuploadid, $zhide);
			break;
		case "setkeyhash":
			$zkeyhash = $wtwuploads->setKeyHash($zkey, $zmoldgroup, $zwebid);
			$zresponse = array(
				'keyhash'=> $zkeyhash
			);
			break;
		case "importuploads":
			$wtwuploads->importUploads($zmoldgroup, $zwebid, $zcopywebid, $zuploadsbulk);
			break;
		case "importwebimages":
			$wtwuploads->importWebImages($zmoldgroup, $zwebid, $zcopywebid, $zwebimagesbulk);
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-uploads.php=".$e->getMessage());
}
?>
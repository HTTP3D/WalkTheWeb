<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwuploads.php');
	global $wtwuploads;
	$zresults = file_get_contents('php://input');
	$zdata = json_decode($zresults, TRUE);

	$zfunction = null;
	$zcommunityid = '';
	$zbuildingid = '';
	$zthingid = '';
	$zsettings = '';
	$zvalue = '';
	$zwebaliasid = '';
	$zforcehttps = '';
	$zdomainname = '';
	$zcommunitypublishname = '';
	$zbuildingpublishname = '';
	$zthingpublishname = '';
	$zfilepath = '';
	$zfilename = '';
	$zfiledata = '';
	$zkey = '';
	$zmoldgroup = '';
	$zwebid = '';
	$zcopywebid = '';
	$zuploadsbulk = '';
	$zwebimagesbulk = '';
	$zitem = '';
	$zcategory = '';
	$zhide = '';
	$zuploadid = '';
	
	if (!empty($zdata) && isset($zdata)) {
		if (isset($zdata["function"])) {
			$zfunction = strtolower($zdata["function"]);
		}
		if (isset($zdata["communityid"])) {
			$zcommunityid = $zdata["communityid"];
		}
		if (isset($zdata["buildingid"])) {
			$zbuildingid = $zdata["buildingid"];
		}
		if (isset($zdata["thingid"])) {
			$zthingid = $zdata["thingid"];
		}
		if (isset($zdata["settings"])) {
			$zsettings = $zdata["settings"];
		}
		if (isset($zdata["value"])) {
			$zvalue = $zdata["value"];
		}
		if (isset($zdata["webaliasid"])) {
			$zwebaliasid = $zdata["webaliasid"];
		}
		if (isset($zdata["forcehttps"])) {
			$zforcehttps = $zdata["forcehttps"];
		}
		if (isset($zdata["domainname"])) {
			$zdomainname = $zdata["domainname"];
		}
		if (isset($zdata["communitypublishname"])) {
			$zcommunitypublishname = $zdata["communitypublishname"];
		}
		if (isset($zdata["buildingpublishname"])) {
			$zbuildingpublishname = $zdata["buildingpublishname"];
		}
		if (isset($zdata["thingpublishname"])) {
			$zthingpublishname = $zdata["thingpublishname"];
		}
		if (isset($zdata["filepath"])) {
			$zfilepath = $zdata["filepath"];
		}
		if (isset($zdata["filename"])) {
			$zfilename = $zdata["filename"];
		}
		if (isset($zdata["filedata"])) {
			$zfiledata = $zdata["filedata"];
		}
		if (isset($zdata["key"])) {
			$zkey = $zdata["key"];
		}
		if (isset($zdata["moldgroup"])) {
			$zmoldgroup = $zdata["moldgroup"];
		}
		if (isset($zdata["webid"])) {
			$zwebid = $zdata["webid"];
		}
		if (isset($zdata["copywebid"])) {
			$zcopywebid = $zdata["copywebid"];
		}
		if (isset($zdata["item"])) {
			$zitem = $zdata["item"];
		}
		if (isset($zdata["category"])) {
			$zcategory = $zdata["category"];
		}
		if (isset($zdata["hide"])) {
			$zhide = $zdata["hide"];
		}
		if (isset($zdata["uploadid"])) {
			$zuploadid = $zdata["uploadid"];
		}
		if (isset($zdata["uploadsbulk"])) {
			$zuploadsbulk = $zdata["uploadsbulk"];
		}
		if (isset($zdata["webimagesbulk"])) {
			$zwebimagesbulk = $zdata["webimagesbulk"];
		}
	}

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
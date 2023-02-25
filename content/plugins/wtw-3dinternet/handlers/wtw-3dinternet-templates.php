<?php
global $wtwhandlers;
try {
	/* include the class for the functions to save, edit, or delete the records in the database */
	require_once(WTW_3DINTERNET_PATH . '/functions/class_templates.php');
	global $wtw_3dinternet_templates;
	/* get sent data */
	$zrequest = $wtwhandlers->openFilefromURL('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	/* get the requested function name for the awitch case below */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	
	/* get form Posted Values - your passed data */
	/* $wtwhandlers->getPost(fieldname, defaultvalue); */
	$zcommunityid = $wtwhandlers->getPost('communityid','');
	$zcommunityname = $wtwhandlers->decode64($wtwhandlers->getPost('communityname',''));
	$zbuildingid = $wtwhandlers->getPost('buildingid','');
	$zbuildingname = $wtwhandlers->decode64($wtwhandlers->getPost('buildingname',''));
	$zthingid = $wtwhandlers->getPost('thingid','');
	$zthingname = $wtwhandlers->decode64($wtwhandlers->getPost('thingname',''));
	$zavatarid = $wtwhandlers->getPost('avatarid','');
	$ztemplatename = $wtwhandlers->decode64($wtwhandlers->getPost('templatename',''));
	$zversionid = $wtwhandlers->getPost('versionid','');
	$zversion = $wtwhandlers->getPost('version','');
	$zversiondesc = $wtwhandlers->decode64($wtwhandlers->getPost('versiondesc',''));
	$zdescription = $wtwhandlers->decode64($wtwhandlers->getPost('description',''));
	$ztags = $wtwhandlers->decode64($wtwhandlers->getPost('tags',''));
	$zsharehash = $wtwhandlers->getPost('sharehash','');

	/* set response array of values - customize response as needed */
	$zresponse = array(
		'serror'=> ''
	);
	switch ($zfunction) {
		case "savecommunitytemplate":
			$zresponse = $wtw_3dinternet_templates->saveCommunityTemplate($zcommunityid, $zcommunityname, $zdescription, $ztags, $zversion, $zversiondesc);
			break;
		case "sharecommunitytemplate":
			$zresponse = $wtw_3dinternet_templates->shareCommunityTemplate($zcommunityid, $zsharehash);
			break;
		case "savebuildingtemplate":
			$zresponse = $wtw_3dinternet_templates->saveBuildingTemplate($zbuildingid, $zbuildingname, $zdescription, $ztags, $zversion, $zversiondesc);
			break;
		case "sharebuildingtemplate":
			$zresponse = $wtw_3dinternet_templates->shareBuildingTemplate($zbuildingid, $zsharehash);
			break;
		case "savethingtemplate":
			$zresponse = $wtw_3dinternet_templates->saveThingTemplate($zthingid, $zthingname, $zdescription, $ztags, $zversion, $zversiondesc);
			break;
		case "sharethingtemplate":
			$zresponse = $wtw_3dinternet_templates->shareThingTemplate($zthingid, $zsharehash);
			break;
		case "saveavatartemplate":
			$zresponse = $wtw_3dinternet_templates->saveAvatarTemplate($zavatarid, $ztemplatename, $zdescription, $ztags, $zversion, $zversiondesc);
			break;
		case "shareavatartemplate":
			$zresponse = $wtw_3dinternet_templates->shareAvatarTemplate($zavatarid, $zsharehash);
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-wtw-3dinternet-templates.php=".$e->getMessage());
}
?>
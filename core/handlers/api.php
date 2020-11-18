<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for api related functions */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwapi.php');
	global $wtwapi;
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	
	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zapikeyid = $wtwhandlers->getPost('apikeyid','');
	$zappid = $wtwhandlers->getPost('appid','');
	$zappname = $wtwhandlers->getPost('appname','');
	$zappurl = $wtwhandlers->getPost('appurl','');
	$zapproved = $wtwhandlers->getPost('approved','');
	$zdeleted = $wtwhandlers->getPost('deleted','0');
	$zwtwkey = $wtwhandlers->getPost('wtwkey','');
	$zwtwsecret = $wtwhandlers->getPost('wtwsecret','');

	/* select the function called */
	$zresponse = array();
	switch ($zfunction) {
		case "getapikeys":
			$zresponse = $wtwapi->getAPIKeys($zdeleted);
			break;
		case "getapikey":
			$zresponse = $wtwapi->getAPIKey($zapikeyid);
			break;
		case "approveapikey":
			$zresponse = $wtwapi->approveAPIKey($zapikeyid, $zapproved);
			break;
		case "saveapikey":
			$zresponse = $wtwapi->saveAPIKey($zapikeyid, $zappid, $zappname, $zappurl, $zwtwkey, $zwtwsecret);
			break;
		case "deleteapikey":
			$zresponse = $wtwapi->deleteAPIKey($zapikeyid);
			break;
	}

	/* set headers to keep data local to server */
	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	/* return the response from the function */
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-api.php=".$e->getMessage());
}
?>
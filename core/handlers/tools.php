<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for tools functions */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwtools.php');
	global $wtwtools;
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	
	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zsendto = $wtwhandlers->getPost('sendto','');
	$zcopyto = $wtwhandlers->getPost('copyto','');
	$zbccto = $wtwhandlers->getPost('bccto','');
	$zsubject = $wtwhandlers->getPost('subject','');
	$zhtmlmessage = $wtwhandlers->getPost('htmlmessage','');
	$zmessage = $wtwhandlers->getPost('message','');
	
	/* convert any comma seperated email lists into arrays */
	if (!empty($zsendto) && isset($zsendto)) {
		if (strpos($zsendto,",") === false) {
			$zsendto = array($zsendto);
		} else {
			$zsendto = explode(',',$zsendto);
		}
	}
	if (!empty($zcopyto) && isset($zcopyto)) {
		if (strpos($zcopyto,",") === false) {
			$zcopyto = array($zcopyto);
		} else {
			$zcopyto = explode(',',$zcopyto);
		}
	}
	if (!empty($zbccto) && isset($zbccto)) {
		if (strpos($zbccto,",") === false) {
			$zbccto = array($zbccto);
		} else {
			$zbccto = explode(',',$zbccto);
		}
	}

	/* select the function called */
	$zresponse = array();
	switch ($zfunction) {
		case "sendadminemail":
			$zresponse = $wtwtools->sendAdminEmail($zsendto, $zsubject, $zmessage);
			break;
		case "sendemail":
			$zresponse = $wtwtools->sendEmail($zsendto, $zcopyto, $zbccto, $zsubject, $zhtmlmessage, $zmessage);
			break;
	}

	/* set headers to keep data local to server */
	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	/* return the response from the function */
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-tools.php=".$e->getMessage());
}
?>
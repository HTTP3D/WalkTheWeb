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
	$zsubject = $wtwhandlers->getPost('subject','');
	$zmessage = $wtwhandlers->getPost('message','');
	
	/* select the function called */
	$zresponse = array();
	switch ($zfunction) {
		case "sendadminemail":
			$zresponse = $wtwtools->sendAdminEmail($zsendto, $zsubject, $zmessage);
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
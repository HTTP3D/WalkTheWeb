<?php
global $wtwhandlers;
try {
	/* include the class for the functions to save, edit, or delete the records in the database */
	require_once(WTW_3DINTERNET_PATH . '/functions/class_functions.php');
	global $wtw_3dinternet_functions;
	/* get sent data */
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	/* get the requested function name for the awitch case below */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	
	/* get form Posted Values - your passed data */
	/* $wtwhandlers->getPost(fieldname, defaultvalue); */
	$zblockedinstanceid = $wtwhandlers->getPost('blockedinstanceid','');
	$zinstanceid = $wtwhandlers->getPost('instanceid','');
	$zuserid = $wtwhandlers->getPost('userid','');
	$zbaninstanceid = $wtwhandlers->getPost('baninstanceid','');
	$zbanuserid = $wtwhandlers->getPost('banuserid','');
	$zbanuserip = $wtwhandlers->getPost('banuserip','');
	$zbanuseravatarid = $wtwhandlers->getPost('banuseravatarid','');
	$zbanglobalavatarid = $wtwhandlers->getPost('banglobalavatarid','');
	$zblockchat = $wtwhandlers->getPost('blockchat','');
	$zbanuser = $wtwhandlers->getPost('banuser','');

	/* set response array of values - customize response as needed */
	$zresponse = array(
		'serror'=> ''
	);
	switch ($zfunction) {
		case "saveban":
			$zresponse = $wtw_3dinternet_functions->saveBan($zblockedinstanceid, $zinstanceid, $zuserid, $zbaninstanceid, $zbanuserid, $zbanuserip, $zbanuseravatarid, $zbanglobalavatarid, $zblockchat, $zbanuser);
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-wtw-3dinternet-saveban.php=".$e->getMessage());
}
?>
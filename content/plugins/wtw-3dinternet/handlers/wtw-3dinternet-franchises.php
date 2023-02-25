<?php
global $wtwhandlers;
try {
	/* include the class for the functions to save, edit, or delete the records in the database */
	require_once(WTW_3DINTERNET_PATH . '/functions/class_franchises.php');
	global $wtw_3dinternet_franchises;
	/* get sent data */
	$zrequest = $wtwhandlers->openFilefromURL('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	/* get the requested function name for the awitch case below */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	
	/* get form Posted Values - your passed data */
	/* $wtwhandlers->getPost(fieldname, defaultvalue); */
	$zfranchiseid = $wtwhandlers->getPost('franchiseid','');
	$zwebaliasid = $wtwhandlers->getPost('webaliasid','');

	/* set response array of values - customize response as needed */
	$zresponse = array(
		'serror'=> ''
	);
	switch ($zfunction) {
		case "updatefranchiseid":
			$zresponse = $wtw_3dinternet_franchises->updateFranchiseID($zfranchiseid, $zwebaliasid);
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-wtw-3dinternet-franchises.php=".$e->getMessage());
}
?>
<?php
global $wtwhandlers;
try {
	/* include the class for the functions to save, edit, or delete the records in the database */
	require_once(WTW_COINS_PATH . '/functions/class_functions.php');
	global $wtwcoins_functions;
	/* get sent data */
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	/* get the requested function name for the awitch case below */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	
	$zactionzoneid = $wtwhandlers->getPost('actionzoneid','');
	$zwebid = $wtwhandlers->getPost('webid','');
	$zuserid = $wtwhandlers->getPost('userid','');
	$zglobaluserid = $wtwhandlers->getPost('globaluserid','');
	$zusertoken = $wtwhandlers->getPost('usertoken','');
	$zvalue1 = $wtwhandlers->getPost('value1','1');

	/* set response array of values - customize as needed */
	$zresponse = array(
		'serror'=> ''
	);
	switch ($zfunction) {
		case "collectcoin":
			/* Save coin collected to the database */
			$zresponse = $wtwcoins_functions->collectCoin($zwebid, $zactionzoneid, $zvalue1, $zuserid, $zglobaluserid, $zusertoken);
			break;
		case "getcointotals":
			/* Sample function, you can return records from the database as an array */
			$zresponse = $wtwcoins_functions->getCoinTotals($zuserid);
			break;
		case "checkcoin":
			$zresponse = $wtwcoins_functions->checkCoin($zwebid, $zactionzoneid, $zuserid);
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-wtw-coins-wtw-coins-collected.php=".$e->getMessage());
}
?>
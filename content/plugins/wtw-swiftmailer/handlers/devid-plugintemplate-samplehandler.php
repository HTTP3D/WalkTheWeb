<?php
global $wtwhandlers;
try {
	/* include the class for the functions to save, edit, or delete the records in the database */
	require_once(WTW_SwiftMailer_PATH . '/functions/class_functions.php');
	global $wtwswiftmailer_functions;
	/* get sent data */
	$zrequest = $wtwhandlers->openFilefromURL('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	/* get the requested function name for the awitch case below */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	
	/* get form Posted Values - your passed data */
	/* $wtwhandlers->getPost(fieldname, defaultvalue); */
	$zfieldid = $wtwhandlers->getPost('fieldid','');
	$zfieldname = $wtwhandlers->getPost('fieldname','');

	/* set response array of values - customize as needed */
	$zresponse = array(
		'serror'=> ''
	);
	switch ($zfunction) {
		case "savesampledata":
			/* Sample function, you can save records in the database and respond with error message if there is an error */
			if ($wtwswiftmailer_functions->saveSample($zfieldid, $zfieldname) == false) {
				$zresponse = array(
					'serror'=> 'Could not save Sample Data'
				);
			}
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-wtw-swiftmailer-samplehandler.php=".$e->getMessage());
}
?>
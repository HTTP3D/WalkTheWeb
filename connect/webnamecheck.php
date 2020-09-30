<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides web aliases information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/webnamecheck.php");
	
	$zwebname = $wtwconnect->getVal('webname','');

	if (!empty($zwebname) && isset($zwebname)) {
		$zwebname = strtolower(base64_decode($zwebname));
	}
	
	$zresponse = array(
		'serror'=>'',
		'available'=>'0',
		'webname'=>$zwebname
	);
	
	if (!empty($zwebname) && isset($zwebname)) {
		
		/* reserved words can not be any part of the webname - you can add your own reserved words */
		$zreserved = array('wtw','walktheweb','http3d','https3d');

		$zwebtest = str_replace("_","",str_replace(".","",str_replace("-","",$zwebname)));

		$zfound = '0';
		foreach ($zreserved as $zword) {
			if (strpos($zwebtest, $zword) !== false) {
				 $zfound = '1';
			}
		}

		if ($zfound == '1') {
			$zresponse = array(
				'serror'=>'Webname Contains Reserved Word',
				'available'=>'0',
				'webname'=>$zwebname
			);
		} else {
			/* check if web alias is already in use */
			$zresults = $wtwconnect->query("
				select w1.*
				from ".wtw_tableprefix."webaliases w1
				where w1.deleted=0
					and (w1.communitypublishname='".$zwebname."'
						or w1.buildingpublishname='".$zwebname."');");
			if (count($zresults) > 0) {
				$zresponse = array(
					'serror'=>'Webname Already in Use',
					'available'=>'0',
					'webname'=>$zwebname
				);
			} else {
				$zresponse = array(
					'serror'=>'',
					'available'=>'1',
					'webname'=>$zwebname
				);
			}
		}
	}
	echo $wtwconnect->addConnectHeader('*');
	
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-webnamecheck.php=".$e->getMessage());
}
?>

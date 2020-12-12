<?php
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/wtw-swiftmailer-sample.php");
	
	/* get values from querystring or session */
	$zfieldname = $wtwconnect->getVal('fieldname','');
	$zprotectedname = $wtwconnect->decode64($wtwconnect->getVal('protectedname',''));
	
	/* select useravatarid data */
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$zresponse = array();
	if (!empty($zprotectedname) && isset($zprotectedname)) {
		$zresults = $wtwconnect->query("
			select *
			from ".WTW_SwiftMailer_PREFIX."tablename  
			where fieldname='".$zfieldname."'
				and protectedname='".$zprotectedname."'
				and deleted=0
			limit 1;");
		$i = 0;
		foreach ($zresults as $zrow) {
			$zresponse[$i] = array(
				'fieldid'=> $zrow["fieldid"], 
				'fieldname'=> $zrow["fieldname"], 
				'protectedname'=> $zrow["protectedname"], 
				'fieldurl'=> $zrow["fieldurl"]
			);
			$i += 1;
		}
	} 
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("plugins:wtw-swiftmailer:connect-wtw-swiftmailer-sample.php=".$e->getMessage());
}
?>

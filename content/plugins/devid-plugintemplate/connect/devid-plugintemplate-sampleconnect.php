<?php
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/devid-plugintemplate-sample.php");
	
	/* get values from querystring or session */
	$zfieldname = $wtwconnect->getVal('fieldname','');
	$zprotectedname = base64_decode($wtwconnect->getVal('protectedname',''));
	
	/* select useravatarid data */
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$zresponse = array();
	if ($wtwconnect->hasValue($zprotectedname)) {
		$zresults = $wtwconnect->query("
			select *
			from ".DEVID_PLUGINTEMPLATE_PREFIX."tablename  
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
	$wtwconnect->serror("plugins:devid-plugintemplate:connect-devid-plugintemplate-sample.php=".$e->getMessage());
}
?>

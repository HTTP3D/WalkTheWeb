<?php
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/wtw-shopping-getstore.php");
	
	/* get values from querystring or session */
	$zstoreid = $wtwconnect->decode64($wtwconnect->getVal('storeid',''));
	
	/* select useravatarid data */
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$zstore = array();
	if (!empty($zstoreid) && isset($zstoreid)) {
		$zresults = $wtwconnect->query("
			select *
			from ".WTWSHOPPING_PREFIX."stores  
			where storeid='".$zstoreid."'
				and deleted=0
			limit 1;");
		$i = 0;
		foreach ($zresults as $zrow) {
			$zstore[$i] = array(
				'storeid'=> $zrow["storeid"], 
				'storename'=> $zrow["storename"], 
				'storeiframes'=> $zrow["storeiframes"],
				'storeurl'=> $zrow["storeurl"],
				'storecarturl'=> $zrow["storecarturl"],
				'storeproducturl'=> $zrow["storeproducturl"],
				'woocommerceapiurl'=> $zrow["woocommerceapiurl"],
				'woocommercekey'=> $zrow["woocommercekey"],
				'woocommercesecret'=> $zrow["woocommercesecret"]
			);
			$i += 1;
		}
	}
	echo json_encode($zstore);	
} catch (Exception $e) {
	$wtwconnect->serror("plugins:wtw-shopping:connect-wtw-shopping-getstore.php=".$e->getMessage());
}
?>

<?php
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/wtw-shopping-getstores.php");
	$zuserid = $wtwconnect->userid;
	
	/* select useravatarid data */
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);
	$zstores = array();
	$zresults = array();
	if ($wtwconnect->hasPermission(array("admin"))) {
		$zresults = $wtwconnect->query("
			select *
			from ".WTWSHOPPING_PREFIX."stores  
			where deleted=0;");
	} else if ($wtwconnect->hasPermission(array("host"))) {
		$zresults = $wtwconnect->query("
			select *
			from ".WTWSHOPPING_PREFIX."stores  
			where deleted=0
				and ((hostuserid='".$zuserid."' and not hostuserid='')
				or (createuserid='".$zuserid."' and not createuserid=''));");
	}
	$i = 0;
	foreach ($zresults as $zrow) {
		$zstores[$i] = array(
			'storeid'=> $zrow["storeid"], 
			'hostuserid'=> $zrow["hostuserid"], 
			'storename'=> $zrow["storename"], 
			'storeiframes'=> $zrow["storeiframes"],
			'storeurl'=> $zrow["storeurl"],
			'storecarturl'=> $zrow["storecarturl"],
			'storeproducturl'=> $zrow["storeproducturl"],
			'wtwkey'=> $zrow["wtwkey"],
			'wtwsecret'=> $zrow["wtwsecret"],
			'woocommerceapiurl'=> $zrow["woocommerceapiurl"],
			'woocommercekey'=> $zrow["woocommercekey"],
			'woocommercesecret'=> $zrow["woocommercesecret"],
			'woocommercekeynew'=> $zrow["woocommercekeynew"],
			'woocommercesecretnew'=> $zrow["woocommercesecretnew"]
		);
		$i += 1;
	}

	echo json_encode($zstores);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-wtw-shopping-getstores.php=".$e->getMessage());
}
?>

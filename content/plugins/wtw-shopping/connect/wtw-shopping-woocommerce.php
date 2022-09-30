<?php
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/wtw-shopping-woocommerce.php");
	
	/* get values from querystring or session */
	$zwoostoreurl = $wtwconnect->getVal('woostoreurl','');
	$zwookey = $wtwconnect->getVal('wookey','');
	$zwoosecret = $wtwconnect->getVal('woosecret','');
	
	/* select useravatarid data */
	echo $wtwconnect->addConnectHeader($zwoostoreurl);
	
	$zkeyfound = "0";
	$i = 0;
	$z3dhost = array();
	$zstoreid = '';
	if ($wtwconnect->hasValue($zwoostoreurl)) {
		$zwoostoreurl = strtolower($zwoostoreurl);
		$zresults = $wtwconnect->query("
			select *
			from ".WTWSHOPPING_PREFIX."stores  
			where lower(storeurl)='".$zwoostoreurl."'
			limit 1;");
		foreach ($zresults as $zrow) {
			$zstoreid = $zrow["storeid"];
			if ($zrow["woocommercekey"] == $zwookey) {
				$zkeyfound = "1";
			}
		}
		if (count($zresults) == 0) {
			$zstoreid = $wtwconnect->getRandomString(16,1);
			$wtwconnect->query("
				insert into ".WTWSHOPPING_PREFIX."stores 
					(storeid,
					 storeurl,
					 woocommercekey,
					 woocommercesecret,
					 createdate,
					 updatedate)
					values
					('".$zstoreid."',
					 '".$zwoostoreurl."',
					 '".$zwookey."',
					 '".$zwoosecret."',
					 now(),
					 now());");
			$zkeyfound = '1';
		}
		if ($zkeyfound == '0') {
			$wtwconnect->query("
				update ".WTWSHOPPING_PREFIX."stores 
				set woocommercekeynew='".$zwookey."',
					woocommercesecretnew='".$zwoosecret."',
					deleteddate=null,
					deleteduserid='',
					deleted=0
				where storeid='".$zstoreid."';");
		}
	}
	$z3dhost[$i] = array(
		'woostoreurl'=> $zwoostoreurl, 
		'keyfound'=> $zkeyfound 
	);
	echo json_encode($z3dhost);	
} catch (Exception $e) {
	$wtwconnect->serror("plugins:wtw-shopping:connect-wtw-shopping-woocommerce.php=".$e->getMessage());
}
?>

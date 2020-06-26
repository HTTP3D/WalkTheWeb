<?php
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/wtw-shopping-getconnectstore.php");
	
	/* get values from querystring or session */
	$zcommunityid = $wtwconnect->getVal('communityid','');
	$zbuildingid = $wtwconnect->getVal('buildingid','');
	$zthingid = $wtwconnect->getVal('thingid','');
	
	/* select useravatarid data */
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$zconnectstore = array();
	$zresults = $wtwconnect->query("
		select s1.*,
			c1.connectid,
			c1.communityid,
			c1.buildingid,
			c1.thingid
		from ".WTWSHOPPING_PREFIX."connectstores c1
			inner join ".WTWSHOPPING_PREFIX."stores s1
			on c1.storeid=s1.storeid
		where c1.communityid='".$zcommunityid."'
			and c1.buildingid='".$zbuildingid."'
			and c1.thingid='".$zthingid."'
			and c1.deleted=0
			and s1.deleted=0
		order by createdate desc
		limit 1;");
	$i = 0;
	foreach ($zresults as $zrow) {
		$zconnectstore[$i] = array(
			'connectid'=> $zrow["connectid"], 
			'storeid'=> $zrow["storeid"],
			'communityid'=> $zrow["communityid"],
			'buildingid'=> $zrow["buildingid"],
			'thingid'=> $zrow["thingid"],
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
	echo json_encode($zconnectstore);	
} catch (Exception $e) {
	$wtwconnect->serror("plugins:wtw-shopping:connect-wtw-shopping-getconnectstore.php=".$e->getMessage());
}
?>

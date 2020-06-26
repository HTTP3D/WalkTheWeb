<?php
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/wtw-shopping-getmold.php");
	
	/* get values from querystring or session */
	$zmoldid = $wtwconnect->getVal('moldid','');

	/* select useravatarid data */
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$zstoremold = array();
	if (!empty($zmoldid) && isset($zmoldid)) {
		$zresults = $wtwconnect->query("
			select *
			from ".WTWSHOPPING_PREFIX."molds  
			where moldid='".$zmoldid."'
				and deleted=0
			limit 1;");
		$i = 0;
		foreach ($zresults as $zrow) {
			$zstoremold[$i] = array(
				'shoppingmoldid'=> $zrow["shoppingmoldid"], 
				'communityid'=> $zrow["communityid"], 
				'buildingid'=> $zrow["buildingid"],
				'thingid'=> $zrow["thingid"],
				'moldid'=> $zrow["moldidid"],
				'slug'=> $zrow["slug"],
				'productid'=> $zrow["productid"],
				'productname'=> $zrow["productname"],
				'categoryid'=> $zrow["categoryid"],
				'allowsearch'=> $zrow["allowsearch"]
			);
			$i += 1;
		}
	}
	echo json_encode($zstoremold);	
} catch (Exception $e) {
	$wtwconnect->serror("plugins:wtw-shopping:connect-wtw-shopping-getmold.php=".$e->getMessage());
}
?>

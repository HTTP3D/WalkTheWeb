<?php
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/wtw-shopping-getmolds.php");
	
	/* get values from querystring or session */
	$zcommunityid = $wtwconnect->getVal('communityid','');
	$zbuildingid = $wtwconnect->getVal('buildingid','');
	$zthingid = $wtwconnect->getVal('thingid','');

	/* select useravatarid data */
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$zstoremold = array();
	if ((!empty($zcommunityid) && isset($zcommunityid)) || (!empty($zbuildingid) && isset($zbuildingid)) || (!empty($zthingid) && isset($zthingid))) {
		$zresults = $wtwconnect->query("
			select *
			from ".WTWSHOPPING_PREFIX."molds  
			where communityid='".$zcommunityid."'
				and buildingid='".$zbuildingid."'
				and thingid='".$zthingid."'
				and deleted=0;");
		$i = 0;
		foreach ($zresults as $zrow) {
			$zstoremold[$i] = array(
				'shoppingmoldid'=> $zrow["shoppingmoldid"], 
				'moldid'=> $zrow["moldid"], 
				'communityid'=> $zrow["communityid"], 
				'buildingid'=> $zrow["buildingid"],
				'thingid'=> $zrow["thingid"],
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
	$wtwconnect->serror("plugins:wtw-shopping:connect-wtw-shopping-getmolds.php=".$e->getMessage());
}
?>

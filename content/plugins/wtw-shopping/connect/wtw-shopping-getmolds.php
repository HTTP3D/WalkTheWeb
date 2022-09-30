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
	if ((isset($zcommunityid) && !empty($zcommunityid)) || (isset($zbuildingid) && !empty($zbuildingid)) || (isset($zthingid) && !empty($zthingid))) {
		/* make sure every shopping related mold has a cooresponding shopping mold record */
		$zwebtype = '';
		$zwebid = '';
		if (!empty($zcommunityid)) {
			$zwebtype = 'community';
			$zwebid = $zcommunityid;
		} else if (!empty($zbuildingid)) {
			$zwebtype = 'building';
			$zwebid = $zbuildingid;
		} else if (!empty($zthingid)) {
			$zwebtype = 'thing';
			$zwebid = $zthingid;
		}
		$zresults = $wtwconnect->query("
			select m1.".$zwebtype."moldid as moldid,
				m1.".$zwebtype."id as webid,
				sm1.shoppingmoldid
			from (select * from ".wtw_tableprefix.$zwebtype."molds where shape like '%store%' and ".$zwebtype."id='".$zwebid."') m1
				left join (select * from ".WTWSHOPPING_PREFIX."molds where ".$zwebtype."id='".$zwebid."') sm1
				on m1.".$zwebtype."moldid=sm1.moldid
			where m1.deleted=0;");
		foreach ($zresults as $zrow) {
			if (!isset($zrow["shoppingmoldid"]) || empty($zrow["shoppingmoldid"])) {
				$znewshoppingmoldid = $wtwconnect->getRandomString(16,1);
				$wtwconnect->query("
					insert into ".WTWSHOPPING_PREFIX."molds 
					   (shoppingmoldid,
					    moldid, 
						communityid, 
						buildingid,
						thingid,
						allowsearch,
						createdate,
						createuserid,
						updatedate,
						updateuserid)
					values
					   ('".$znewshoppingmoldid."',
					    '".$zrow["moldid"]."',
						'".$zcommunityid."',
						'".$zbuildingid."',
						'".$zthingid."',
						1,
						now(),
						'".$wtwconnect->userid."',
						now(),
						'".$wtwconnect->userid."');");
			}
		}
		
		/* get shopping molds */
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

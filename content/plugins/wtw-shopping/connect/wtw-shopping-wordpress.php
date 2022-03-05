<?php
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/wtw-shopping-wordpress.php");
	
	/* get values from querystring or session */
	$zfunction = $wtwconnect->getVal('function','');
	$zwoostoreurl = $wtwconnect->decode64($wtwconnect->getVal('woostoreurl',''));
	$zwookey = $wtwconnect->decode64($wtwconnect->getVal('wookey',''));
	$zwoosecret = $wtwconnect->decode64($wtwconnect->getVal('woosecret',''));
	$zwpinstanceid = $wtwconnect->decode64($wtwconnect->getVal('wpinstanceid',''));
	$zwebsiteurl = $wtwconnect->decode64($wtwconnect->getVal('websiteurl',''));
	$zbuildingid = $wtwconnect->decode64($wtwconnect->getVal('buildingid',''));
	$zcommunityid = $wtwconnect->decode64($wtwconnect->getVal('communityid',''));
	$zusertoken = $wtwconnect->decode64($wtwconnect->getVal('usertoken',''));
	$zwtwusertoken = $wtwconnect->decode64($wtwconnect->getVal('wtwusertoken',''));
	$zwtwemail = $wtwconnect->decode64($wtwconnect->getVal('wtwemail',''));
	$zuserid = $wtwconnect->decode64($wtwconnect->getVal('userid',''));
	$zhosturl = $wtwconnect->decode64($wtwconnect->getVal('hosturl',''));
	$zwtwurl = $wtwconnect->decode64($wtwconnect->getVal('wtwurl',''));
	$zwebname = $wtwconnect->decode64($wtwconnect->getVal('webname',''));
	$zwtwstorename = $wtwconnect->decode64($wtwconnect->getVal('wtwstorename',''));
	$zstorecarturl = $wtwconnect->decode64($wtwconnect->getVal('storecarturl',''));
	$zstoreproducturl = $wtwconnect->decode64($wtwconnect->getVal('storeproducturl',''));
	$zstoreapiurl = $wtwconnect->decode64($wtwconnect->getVal('storeapiurl',''));
	$ziframes = $wtwconnect->decode64($wtwconnect->getVal('iframes',''));

	
	/* select useravatarid data */
	echo $wtwconnect->addConnectHeader($zwoostoreurl);
	
	$zkeyfound = "0";
	$i = 0;
	$z3dhost = array();
	$zstoreid = '';
	if (!empty($zwoostoreurl) && isset($zwoostoreurl)) {
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
	$wtwconnect->serror("plugins:wtw-shopping:connect-wtw-shopping-wordpress.php=".$e->getMessage());
}
?>

<?php
global $wtwconnect;
try {
	//define('WTWMULTIPLAYER_PREFIX', 'wtw_multiplayer_');
	
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/wtw-multiplayer-clearavatar.php");
	
	/* get values from querystring or session */
	$zinstanceid = base64_decode($wtwconnect->getVal('i',''));
	$zuserid = base64_decode($wtwconnect->getVal('d',''));
	$zcommunityid = base64_decode($wtwconnect->getVal('c',''));
	$zbuildingid = base64_decode($wtwconnect->getVal('b',''));
	
	$zfounduseravatarid = "";
	$zanonuseravatarid = "";
	$zuseruseravatarid = "";
	
	/* select useravatarid data */
	$zresults = $wtwconnect->query("
		select useravatarid 
		from ".WTWMULTIPLAYER_PREFIX."useravatars 
		where instanceid='".$zinstanceid."' 
			and userid='' 
			and deleted=0 
		order by updatedate desc limit 1;");
	foreach ($zresults as $zrow) {
		$zanonuseravatarid = $zrow["useravatarid"];
	}
	$zresults = $wtwconnect->query("
		select useravatarid 
		from ".WTWMULTIPLAYER_PREFIX."useravatars 
		where instanceid='".$zinstanceid."' 
			and userid='".$zuserid."' 
			and (not userid='') 
			and deleted=0 
		order by updatedate desc limit 1;");
	foreach ($zresults as $zrow) {
		$zuseruseravatarid = $zrow["useravatarid"];
	}
	if (!empty($zuserid) && isset($zuserid)) {
		if (!empty($zuseruseravatarid) && isset($zuseruseravatarid)) {
			$zfounduseravatarid = $zuseruseravatarid;
		} else {
			$zfounduseravatarid = $zanonuseravatarid;
		}
	} else {
		$zfounduseravatarid = $zanonuseravatarid;
	}

	if (!empty($zfounduseravatarid) && isset($zfounduseravatarid)) {
		$wtwconnect->query("
			update ".WTWMULTIPLAYER_PREFIX."useravatars
			set  deleteddate=now(),
				 deleteduserid='".$wtwconnect->userid."',
				 deleted=1
			where useravatarid='".$zfounduseravatarid."';");
		$wtwconnect->query("
			delete from ".WTWMULTIPLAYER_PREFIX."tracking
			where useravatarid='".$zfounduseravatarid."'
				and ((communityid='".$zcommunityid."' and not communityid='')
				 or (buildingid='".$zbuildingid."' and not buildingid=''));");
	}

	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$zresponse = array('cleared'=>date("Y-m-d H:i:s"));
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-wtw-multiplayer-clearavatar.php=".$e->getMessage());
}
?>

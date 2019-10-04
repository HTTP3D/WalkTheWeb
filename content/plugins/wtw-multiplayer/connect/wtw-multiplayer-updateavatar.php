<?php
global $wtwconnect;
try {
	//define('WTWMULTIPLAYER_PREFIX', 'wtw_multiplayer_');
	
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/updateavatar.php");
	
	/* get values from querystring or session */
	$zinstanceid = base64_decode($wtwconnect->getVal('i',''));
	$zuseravatarid = base64_decode($wtwconnect->getVal('u',''));
	$zuserid = base64_decode($wtwconnect->getVal('d',''));
	$zobjectfolder = base64_decode($wtwconnect->getVal('o',''));
	$zobjectfile = base64_decode($wtwconnect->getVal('f',''));
	$zdomain = base64_decode($wtwconnect->getVal('m',''));
	$zsecure = base64_decode($wtwconnect->getVal('s',''));
	$zscalingx = base64_decode($wtwconnect->getVal('x',''));
	$zscalingy = base64_decode($wtwconnect->getVal('y',''));
	$zscalingz = base64_decode($wtwconnect->getVal('z',''));
	$zdisplayname = base64_decode($wtwconnect->getVal('n',''));
	$zprivacy = base64_decode($wtwconnect->getVal('p',''));
	$zip = base64_decode($wtwconnect->getVal('a',''));
	
	$zfoundinstanceid = "";
	
	/* select instance data */
	$zresults = $wtwconnect->query("
		select instanceid
		from ".WTWMULTIPLAYER_PREFIX."useravatars
		where instanceid='".$zinstanceid."';");
	foreach ($zresults as $zrow) {
		$zfoundinstanceid = $zrow["instanceid"];
	}
	if (!empty($zfoundinstanceid) && isset($zfoundinstanceid)) {
		$wtwconnect->query("
			update ".WTWMULTIPLAYER_PREFIX."useravatars
			set useravatarid='".$zuseravatarid."',
				 userid='".$zuserid."',
				 userip='".$zip."',
				 objectfolder='".$zobjectfolder."',
				 objectfile='".$zobjectfile."',
				 domain='".$wtwconnect->domainname."',
				 secureprotocol='".$zsecure."',
				 scalingx=".$zscalingx.",
				 scalingy=".$zscalingy.",
				 scalingz=".$zscalingz.",
				 displayname='".$zdisplayname."',
				 privacy=".$zprivacy.",
				 lastip='".$zip."',
				 lastdate=now(),
				 updatedate=now(),
				 updateuserid='".$wtwconnect->userid."',
				 deleteddate=null,
				 deleteduserid='',
				 deleted=0
			where instanceid='".$zinstanceid."';
		");
		
	} else {
		$zinstanceid = $wtwconnect->getRandomString(16,1);
		$wtwconnect->query("
			insert into ".WTWMULTIPLAYER_PREFIX."useravatars
				(instanceid,
				 useravatarid,
				 userid,
				 userip,
				 objectfolder,
				 objectfile,
				 domain,
				 secureprotocol,
				 scalingx,
				 scalingy,
				 scalingz,
				 displayname,
				 privacy,
				 lastip,
				 lastdate,
				 createdate,
				 createuserid,
				 updatedate,
				 updateuserid)
				values
				('".$zinstanceid."',
				 '".$zuseravatarid."',
				 '".$zuserid."',
				 '".$zip."',
				 '".$zobjectfolder."',
				 '".$zobjectfile."',
				 '".$wtwconnect->domainname."',
				 '".$zsecure."',
				 ".$zscalingx.",
				 ".$zscalingy.",
				 ".$zscalingz.",
				 '".$zdisplayname."',
				 ".$zprivacy.",
				 '".$zip."',
				 now(),
				 now(),
				 '".$wtwconnect->userid."',
				 now(),
				 '".$wtwconnect->userid."');		
		");
	}

	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$zresponse = array('updated'=>date("Y-m-d H:i:s"));
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-updateavatar.php=".$e->getMessage());
}
?>

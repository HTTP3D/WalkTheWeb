<?php
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/wtw-multiplayer-tracking.php");
	
	/* get values from querystring or session */
	$zinstanceid = base64_decode($wtwconnect->getVal('i',''));
	$zuseravatarid = base64_decode($wtwconnect->getVal('u',''));
	$zuserid = base64_decode($wtwconnect->getVal('d',''));
	$zcommunityid = base64_decode($wtwconnect->getVal('c',''));
	$zbuildingid = base64_decode($wtwconnect->getVal('b',''));
	$zpositionx = base64_decode($wtwconnect->getVal('x',''));
	$zpositiony = base64_decode($wtwconnect->getVal('y',''));
	$zpositionz = base64_decode($wtwconnect->getVal('z',''));
	$zrotationx = base64_decode($wtwconnect->getVal('r',''));
	$zrotationy = base64_decode($wtwconnect->getVal('o',''));
	$zrotationz = base64_decode($wtwconnect->getVal('t',''));
	$zwalkspeed = base64_decode($wtwconnect->getVal('w',''));
	$zactiveanimations = base64_decode($wtwconnect->getVal('a',''));
	$zmultiusers = base64_decode($wtwconnect->getVal('m',''));
	$zchatid = base64_decode($wtwconnect->getVal('ci',''));
	$zchattext = $wtwconnect->getVal('ct','');
	
	$ztrackid = "";
	$zresults = $wtwconnect->query("
		select trackid from ".WTWMULTIPLAYER_PREFIX."tracking 
		where instanceid='".$zinstanceid."' 
			and useravatarid='".$zuseravatarid."'
		limit 1;");
	foreach ($zresults as $zrow) {
		$ztrackid = $zrow["trackid"];
	}

	if (!empty($ztrackid) && isset($ztrackid)) {
		$wtwconnect->query("
			update ".WTWMULTIPLAYER_PREFIX."tracking
			set communityid='".$zcommunityid."',
			 buildingid='".$zbuildingid."',
			 userid='".$zuserid."',
			 instanceid='".$zinstanceid."',
			 useravatarid='".$zuseravatarid."',
			 positionx=".$zpositionx.",
			 positiony=".$zpositiony.",
			 positionz=".$zpositionz.",
			 rotationx=".$zrotationx.",
			 rotationy=".$zrotationy.",
			 rotationz=".$zrotationz.",
			 walkspeed=".$zwalkspeed.",
			 activeanimations='".$zactiveanimations."',
			 movetime=NOW()
			where trackid='".$ztrackid."';
		");
		
	} else {
		$ztrackid = $wtwconnect->getRandomString(16,1);
		$wtwconnect->query("
			insert into ".WTWMULTIPLAYER_PREFIX."tracking
				(trackid,
				 instanceid,
				 communityid,
				 buildingid,
				 userid,
				 useravatarid,
				 positionx,
				 positiony,
				 positionz,
				 rotationx,
				 rotationy,
				 rotationz,
				 walkspeed,
				 activeanimations,
				 movetime)
			values
				('".$ztrackid."',
				 '".$zinstanceid."',
				 '".$zcommunityid."',
				 '".$zbuildingid."',
				 '".$zuserid."',
				 '".$zuseravatarid."',
				 ".$zpositionx.",
				 ".$zpositiony.",
				 ".$zpositionz.",
				 ".$zrotationx.",
				 ".$zrotationy.",
				 ".$zrotationz.",
				 ".$zwalkspeed.",
				 '".$zactiveanimations."',
				 NOW());		
		");
	}
	$zfoundchatindexid = -1;
	$zfoundchatid = "";
	$zfoundchattext = "";
	$zresults = $wtwconnect->query("
		select chatindexid, chatid, chattext
		from ".WTWMULTIPLAYER_PREFIX."chats 
		where instanceid='".$zinstanceid."' 
			and ((communityid='".$zcommunityid."' 
				and not communityid='') 
			or (buildingid='".$zbuildingid."' 
				and not buildingid='')) 
		order by createdate desc 
		limit 1;");
	foreach ($zresults as $zrow) {
		$zfoundchatindexid = $zrow["chatindexid"];
		$zfoundchatid = $zrow["chatid"];
		$zfoundchattext = $zrow["chattext"];
	}
	if ($zfoundchatindexid > 0) {
		$wtwconnect->query("
			delete from ".WTWMULTIPLAYER_PREFIX."chats 
			where chatindexid=".$zfoundchatindexid."
			limit 1;");
	}
	$zinstances = explode("_", $zchatid);
	foreach ($zinstances as $zinstance) {
		if (!empty($zinstance) && isset($zinstance)) {
			if ($zinstance != $zinstanceid) {
				$wtwconnect->query("
					insert into ".WTWMULTIPLAYER_PREFIX."chats 
						(chatid,
						 instanceid,
						 communityid,
						 buildingid,
						 chattext,
						 createdate,
						 createuserid)
					values
						('".$zchatid."',
						 '".$zinstance."',
						 '".$zcommunityid."',
						 '".$zbuildingid."',
						 '".$zchattext."',
						 now(),
						 '".$wtwconnect->userid."');");
			}
		}
	}

	$wtwconnect->query("
		delete from ".WTWMULTIPLAYER_PREFIX."tracking
		where movetime < NOW() - Interval 1 Minute;");
		
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);
	
	$i = 0;
	$avatardef = array();
	$zresults = $wtwconnect->query("
		select t.trackid, 
			t.instanceid, 
			t.communityid, 
			t.buildingid, 
			t.userid, 
			t.useravatarid, 
			t.positionx, 
			t.positiony, 
			t.positionz, 
			t.rotationx, 
			t.rotationy, 
			t.rotationz, 
			t.walkspeed, 
			t.movetime, 
			t.activeanimations, 
			SQRT(POW((".$zpositionx."-positionx),2)+POW((".$zpositiony."-positiony),2)+POW((".$zpositionz."-positionz),2)) as dist
		from ".WTWMULTIPLAYER_PREFIX."tracking t 
		where (t.communityid= '".$zcommunityid."' 
				and not t.communityid='') 
			or (t.buildingid= '".$zbuildingid."' 
				and not t.buildingid='')
			and (not t.instanceid = '".$zinstanceid."')
		order by dist 
		limit ".$zmultiusers.";");
	foreach ($zresults as $zrow) {
		$position = array(
			'x'=> $zrow["positionx"], 
			'y'=> $zrow["positiony"], 
			'z'=> $zrow["positionz"]
		);
		$rotation = array(
			'x'=> $zrow["rotationx"], 
			'y'=> $zrow["rotationy"], 
			'z'=> $zrow["rotationz"]
		);
		$object = array(
			'walkspeed'=> $zrow["walkspeed"]
		);
		$chat = array(
			'chatid'=> $zfoundchatid, 
			'chattext'=> $zfoundchattext 
		);
		$avatardef[$i] = array(
			'trackid'=> $zrow["trackid"],
			'instanceid'=> $zrow["instanceid"],
			'userid'=> $zrow["userid"], 
			'useravatarid'=> $zrow["useravatarid"], 
			'avatarind'=> '', 
			'position'=> $position,
			'rotation'=> $rotation,
			'object'=> $object,
			'chat'=> $chat,
			'movetime'=> $zrow["movetime"],
			'activeanimations'=> $zrow["activeanimations"],						   
			'dist'=> $zrow["dist"],						   
			'updated'=> '0',
			'loaded'=> '0');
		$i += 1;
	}
	echo json_encode($avatardef);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-wtw-multiplayer-tracking.php=".$e->getMessage());
}
?>

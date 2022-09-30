<?php
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/wtw-3dinternet-updateavatar.php");
	
	/* get values from querystring or session */
	$zinstanceid = $wtwconnect->decode64($wtwconnect->getVal('i',''));
	$zuseravatarid = $wtwconnect->decode64($wtwconnect->getVal('u',''));
	$zglobaluseravatarid = $wtwconnect->decode64($wtwconnect->getVal('g',''));
	$zavatarid = $wtwconnect->decode64($wtwconnect->getVal('ad',''));
	$zuserid = $wtwconnect->decode64($wtwconnect->getVal('d',''));
	$zobjectfolder = $wtwconnect->decode64($wtwconnect->getVal('o',''));
	$zobjectfile = $wtwconnect->decode64($wtwconnect->getVal('f',''));
	$zdomain = $wtwconnect->decode64($wtwconnect->getVal('m',''));
	$zsecure = $wtwconnect->decode64($wtwconnect->getVal('s',''));
	$zpositionx = $wtwconnect->decode64($wtwconnect->getVal('px','0'));
	$zpositiony = $wtwconnect->decode64($wtwconnect->getVal('py','0'));
	$zpositionz = $wtwconnect->decode64($wtwconnect->getVal('pz','0'));
	$zscalingx = $wtwconnect->decode64($wtwconnect->getVal('x','1'));
	$zscalingy = $wtwconnect->decode64($wtwconnect->getVal('y','1'));
	$zscalingz = $wtwconnect->decode64($wtwconnect->getVal('z','1'));
	$zrotationx = $wtwconnect->decode64($wtwconnect->getVal('rx','0'));
	$zrotationy = $wtwconnect->decode64($wtwconnect->getVal('ry','0'));
	$zrotationz = $wtwconnect->decode64($wtwconnect->getVal('rz','0'));
	$zdisplayname = $wtwconnect->decode64($wtwconnect->getVal('n',''));
	$zprivacy = $wtwconnect->decode64($wtwconnect->getVal('p',''));
	$zenteranimation = $wtwconnect->decode64($wtwconnect->getVal('en','1'));
	$zenteranimationparameter = $wtwconnect->decode64($wtwconnect->getVal('enp',''));
	$zexitanimation = $wtwconnect->decode64($wtwconnect->getVal('ex','1'));
	$zexitanimationparameter = $wtwconnect->decode64($wtwconnect->getVal('exp',''));
	$zwalkspeed = $wtwconnect->decode64($wtwconnect->getVal('w','1'));
	$zwalkanimationspeed = $wtwconnect->decode64($wtwconnect->getVal('v','1'));
	$zturnspeed = $wtwconnect->decode64($wtwconnect->getVal('t','1'));
	$zturnanimationspeed = $wtwconnect->decode64($wtwconnect->getVal('r','1'));
	$zuserip = $wtwconnect->decode64($wtwconnect->getVal('a',''));
	$zserverinstanceid = $wtwconnect->decode64($wtwconnect->getVal('si',''));
	$zusertoken = $wtwconnect->getVal('at','');
	$zrefresh = $wtwconnect->getVal('refresh','');

	if (is_numeric($zenteranimation) == false) {
		$zenteranimation = '1';
	}
	if (is_numeric($zexitanimation) == false) {
		$zexitanimation = '1';
	}
	if (is_numeric($zprivacy) == false) {
		$zprivacy = '0';
	}
	if (is_numeric($zpositionx) == false) {
		$zpositionx = '0';
	}
	if (is_numeric($zpositiony) == false) {
		$zpositiony = '0';
	}
	if (is_numeric($zpositionz) == false) {
		$zpositionz = '0';
	}
	if (is_numeric($zscalingx) == false) {
		$zscalingx = '1';
	}
	if (is_numeric($zscalingy) == false) {
		$zscalingy = '1';
	}
	if (is_numeric($zscalingz) == false) {
		$zscalingz = '1';
	}
	if (is_numeric($zrotationx) == false) {
		$zrotationx = '0';
	}
	if (is_numeric($zrotationy) == false) {
		$zrotationy = '0';
	}
	if (is_numeric($zrotationz) == false) {
		$zrotationz = '0';
	}

	$zfounduseravatarid = "";
	$zanonuseravatarid = "";
	$zuseruseravatarid = "";

	if (!isset($zuseravatarid) || empty($zuseravatarid)) {
		$zuseravatarid = $wtwconnect->getRandomString(16,1);
	}

	if (!isset($zanonuseravatarid) || empty($zanonuseravatarid)) {
		/* select anonymous useravatarid data by instance */
		$zresults = $wtwconnect->query("
			select useravatarid 
			from ".WTW_3DINTERNET_PREFIX."useravatars 
			where instanceid='".$zinstanceid."' 
				and userid='' 
			order by updatedate desc limit 1;");
		foreach ($zresults as $zrow) {
			$zanonuseravatarid = $zrow["useravatarid"];
		}
	}
	if (!isset($zuseruseravatarid) || empty($zuseruseravatarid)) {
		/* select useravatarid data by userid */
		$zresults = $wtwconnect->query("
			select useravatarid 
			from ".WTW_3DINTERNET_PREFIX."useravatars 
			where useravatarid='".$zuseravatarid."' 
				and userid='".$zuserid."' 
				and (not userid='') 
			order by updatedate desc limit 1;");
		foreach ($zresults as $zrow) {
			$zuseruseravatarid = $zrow["useravatarid"];
		}
	}
	if ($wtwconnect->hasValue($zuserid)) {
		if ($wtwconnect->hasValue($zuseruseravatarid)) {
			$zfounduseravatarid = $zuseruseravatarid;
		} else {
			$zfounduseravatarid = $zanonuseravatarid;
		}
	} else {
		$zfounduseravatarid = $zanonuseravatarid;
	}

	if ($wtwconnect->hasValue($zfounduseravatarid)) {
		/* update temp tables for active avatar */
		$wtwconnect->query("
			update ".WTW_3DINTERNET_PREFIX."useravatars
			set  userid='".$zuserid."',
				 userip='".$zuserip."',
				 globaluseravatarid='".$zglobaluseravatarid."',
				 avatarid='".$zavatarid."',
				 objectfolder='".$zobjectfolder."',
				 objectfile='".$zobjectfile."',
				 domain='".$wtwconnect->domainname."',
				 secureprotocol='".$zsecure."',
				 positionx=".$zpositionx.",
				 positiony=".$zpositiony.",
				 positionz=".$zpositionz.",
				 scalingx=".$zscalingx.",
				 scalingy=".$zscalingy.",
				 scalingz=".$zscalingz.",
				 rotationx=".$zrotationx.",
				 rotationy=".$zrotationy.",
				 rotationz=".$zrotationz.",
				 displayname='".$zdisplayname."',
				 privacy=".$zprivacy.",
				 enteranimation=".$zenteranimation.",
				 enteranimationparameter='".$zenteranimationparameter."',
				 exitanimation=".$zexitanimation.",
				 exitanimationparameter='".$zexitanimationparameter."',
				 walkspeed=".$zwalkspeed.",
				 walkanimationspeed=".$zwalkanimationspeed.",
				 turnspeed=".$zturnspeed.",
				 turnanimationspeed=".$zturnanimationspeed.",
				 lastip='".$zuserip."',
				 lastdate=now(),
				 updatedate=now(),
				 updateuserid='".$wtwconnect->userid."',
				 deleteddate=null,
				 deleteduserid='',
				 deleted=0
			where useravatarid='".$zfounduseravatarid."';
		");
		$zuseravatarid = $zfounduseravatarid;
	} else {
		/* insert active avatar into temp tables */
		$wtwconnect->query("
			insert into ".WTW_3DINTERNET_PREFIX."useravatars
				(instanceid,
				 useravatarid,
				 globaluseravatarid,
				 userid,
				 userip,
				 avatarid,
				 objectfolder,
				 objectfile,
				 domain,
				 secureprotocol,
				 positionx,
				 positiony,
				 positionz,
				 scalingx,
				 scalingy,
				 scalingz,
				 rotationx,
				 rotationy,
				 rotationz,
				 displayname,
				 privacy,
				 enteranimation,
				 enteranimationparameter,
				 exitanimation,
				 exitanimationparameter,
				 walkspeed,
				 walkanimationspeed,
				 turnspeed,
				 turnanimationspeed,
				 lastip,
				 lastdate,
				 createdate,
				 createuserid,
				 updatedate,
				 updateuserid)
				values
				('".$zinstanceid."',
				 '".$zuseravatarid."',
				 '".$zglobaluseravatarid."',
				 '".$zuserid."',
				 '".$zuserip."',
				 '".$zavatarid."',
				 '".$zobjectfolder."',
				 '".$zobjectfile."',
				 '".$wtwconnect->domainname."',
				 '".$zsecure."',
				 ".$zpositionx.",
				 ".$zpositiony.",
				 ".$zpositionz.",
				 ".$zscalingx.",
				 ".$zscalingy.",
				 ".$zscalingz.",
				 ".$zrotationx.",
				 ".$zrotationy.",
				 ".$zrotationz.",
				 '".$zdisplayname."',
				 ".$zprivacy.",
				 ".$zenteranimation.",
				 '".$zenteranimationparameter."',
				 ".$zexitanimation.",
				 '".$zexitanimationparameter."',
				 ".$zwalkspeed.",
				 ".$zwalkanimationspeed.",
				 ".$zturnspeed.",
				 ".$zturnanimationspeed.",
				 '".$zuserip."',
				 now(),
				 now(),
				 '".$wtwconnect->userid."',
				 now(),
				 '".$wtwconnect->userid."');		
		");
	}
	$zavatardata = array();
	$zavatarparts = array();
	$zanimationdefs = array();
	/* get latest user avatar settings */
	if (ini_get('allow_url_fopen') ) {
		if (!isset($zglobaluseravatarid) || empty($zglobaluseravatarid)) {
			/* get local avatar */
			$avatarurl = $wtwconnect->domainurl."/connect/useravatar.php?useravatarid=".base64_encode($zuseravatarid)."&instanceid=".base64_encode($zinstanceid)."&userid=".base64_encode($zuserid)."&userip=".base64_encode($zuserip);
			$zavatardata = $wtwconnect->openFilefromURL($avatarurl);
		} else {
			/* get global avatar */
			$avatarurl = "https://3dnet.walktheweb.com/connect/globalavatar.php?usertoken=".$zusertoken."&globaluseravatarid=".base64_encode($zglobaluseravatarid)."&serverinstanceid=".base64_encode($zserverinstanceid);
			$zavatardata = $wtwconnect->openFilefromURL($avatarurl);
		}
	}
	$zavatardata = json_decode($zavatardata);
	if (isset($zavatardata->avatar->avatarparts)) {
		/* get array of parts (meshes) for colors */
		$zavatarparts = $zavatardata->avatar->avatarparts;
		/* get array of animations */
		$zanimationdefs = $zavatardata->avatar->avataranimationdefs;
		/* cycle through the animations to update each animation in multiplyer table */
		foreach($zanimationdefs as $zanimationdef) {
			$zfounduseravataranimationid = "";
			$zuseravataranimationid = $zanimationdef->useravataranimationid;
			if ($wtwconnect->hasValue($zuseravataranimationid)) {
				$zloadpriority = "";
				$zanimationfriendlyname = "";
				$zanimationicon = "";
				$zobjectfolder = "";
				$zobjectfile = "";
				$zstartframe = "";
				$zendframe = "";
				$zanimationloop = "";
				$zsoundid = "";
				$zsoundpath = "";
				$zsoundmaxdistance = "";
				/* check if user avatar animation exists in multiplayer table */
				$zresults = $wtwconnect->query("
					select useravataranimationid 
					from ".WTW_3DINTERNET_PREFIX."useravataranimations 
					where useravatarid='".$zuseravatarid."' 
						and useravataranimationid='".$zuseravataranimationid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfounduseravataranimationid = $zrow["useravataranimationid"];
				}
				/* get avatar animation details */
				$zresults = $wtwconnect->query("
					select * 
					from ".wtw_tableprefix."avataranimations 
					where avataranimationid='".$zanimationdef->avataranimationid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zloadpriority = $zrow["loadpriority"];
					$zanimationfriendlyname = $zrow["animationfriendlyname"];
					$zanimationicon = $zrow["animationicon"];
					$zobjectfolder = $zrow["objectfolder"];
					$zobjectfile = $zrow["objectfile"];
					$zstartframe = $zrow["startframe"];
					$zendframe = $zrow["endframe"];
					$zanimationloop = $zrow["animationloop"];
					$zsoundid = $zrow["soundid"];
					$zsoundpath = $zrow["soundpath"];
					$zsoundmaxdistance = $zrow["soundmaxdistance"];
				}				
				
				if ($wtwconnect->hasValue($zfounduseravataranimationid)) {
					/* if user animation was found, update it */
					$wtwconnect->query("
						update ".WTW_3DINTERNET_PREFIX."useravataranimations 
						set avataranimationid = '".$zanimationdef->avataranimationid."',
							globaluseravatarid = '".$zglobaluseravatarid."',
							useravatarid='".$zuseravatarid."',
							animationevent='".$zanimationdef->animationevent."',
							speedratio=".$zanimationdef->speedratio.",
							walkspeed=".$zanimationdef->walkspeed.",
							loadpriority=".$zloadpriority.",
							animationfriendlyname='".$zanimationfriendlyname."',
							animationicon='".$zanimationicon."',
							objectfolder='".$zobjectfolder."',
							objectfile='".$zobjectfile."',
							startframe=".$zstartframe.",
							endframe=".$zendframe.",
							animationloop=".$zanimationloop.",
							soundid='".$zsoundid."',
							soundpath='".$zsoundpath."',
							soundmaxdistance='".$zsoundmaxdistance."',
							updatedate=now(),
							updateuserid='',
							deleteddate=null,
							deleteduserid='',
							deleted=0
						where instanceid='".$zinstanceid."' 
						and useravatarid='".$zuseravatarid."' 
						and useravataranimationid='".$zuseravataranimationid."'
					");
				} else {
					/* if user animation was not found, add it */
					$wtwconnect->query("
						insert into ".WTW_3DINTERNET_PREFIX."useravataranimations 
						   (useravataranimationid,
							useravatarid,
							globaluseravatarid,
							instanceid,
						    avataranimationid,
							animationevent,
							speedratio,
							walkspeed,
							loadpriority,
							animationfriendlyname,
							animationicon,
							objectfolder,
							objectfile,
							startframe,
							endframe,
							animationloop,
							soundid,
							soundpath,
							soundmaxdistance,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values	
						   ('".$zuseravataranimationid."',
						    '".$zuseravatarid."',
							'".$zglobaluseravatarid."',
							'".$zinstanceid."',
							'".$zanimationdef->avataranimationid."',
							'".$zanimationdef->animationevent."',
							".$zanimationdef->speedratio.",
							".$zanimationdef->walkspeed.",
							".$zloadpriority.",
							'".$zanimationfriendlyname."',
							'".$zanimationicon."',
							'".$zobjectfolder."',
							'".$zobjectfile."',
							".$zstartframe.",
							".$zendframe.",
							".$zanimationloop.",
							'".$zsoundid."',
							'".$zsoundpath."',
							'".$zsoundmaxdistance."',
							now(),
							'".$wtwconnect->userid."',
							now(),
							'".$wtwconnect->userid."');");
				} 
			}
		}
		/* cycle through the parts to update avatar colors in multiplayer table */
		foreach($zavatarparts as $zavatarpart) {
			$zfoundavatarpartid = "";
			$zavatarpartid = $zavatarpart->avatarpartid;
			if ($wtwconnect->hasValue($zavatarpartid)) {
				/* check of part exists in multiplayer table */
				$zresults = $wtwconnect->query("
					select avatarpartid 
					from ".WTW_3DINTERNET_PREFIX."useravatarcolors 
					where useravatarid='".$zuseravatarid."' 
						and userid='".$wtwconnect->userid."' 
						and avatarpartid='".$zavatarpartid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundavatarpartid = $zrow["avatarpartid"];
				}
				if ($wtwconnect->hasValue($zfoundavatarpartid)) {
					/* if part found, update the colors */
					$wtwconnect->query("
						update ".WTW_3DINTERNET_PREFIX."useravatarcolors 
						set avatarpart = '".$zavatarpart->avatarpart."',
							diffusecolor='".$zavatarpart->diffusecolor."',
							specularcolor='".$zavatarpart->specularcolor."',
							emissivecolor='".$zavatarpart->emissivecolor."',
							ambientcolor='".$zavatarpart->ambientcolor."',
							globaluseravatarid='".$zglobaluseravatarid."',
							updatedate=now(),
							updateuserid='',
							deleteddate=null,
							deleteduserid='',
							deleted=0
						where useravatarid='".$zuseravatarid."' 
						and userid='".$wtwconnect->userid."' 
						and avatarpartid='".$zavatarpartid."'
					");
				} else {
					/* if part is not found, add the colors */
					$wtwconnect->query("
						insert into ".WTW_3DINTERNET_PREFIX."useravatarcolors 
						   (avatarpartid,
						    userid,
							useravatarid,
							globaluseravatarid,
							instanceid,
							avatarpart,
							diffusecolor,
							specularcolor,
							emissivecolor,
							ambientcolor,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values	
						   ('".$zavatarpartid."',
						    '".$wtwconnect->userid."',
							'".$zuseravatarid."',
							'".$zglobaluseravatarid."',
							'".$zinstanceid."',
							'".$zavatarpart->avatarpart."',
							'".$zavatarpart->diffusecolor."',
							'".$zavatarpart->specularcolor."',
							'".$zavatarpart->emissivecolor."',
							'".$zavatarpart->ambientcolor."',
							now(),
							'".$wtwconnect->userid."',
							now(),
							'".$wtwconnect->userid."');");
				}
			}
		}
	}

	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$zresponse = array(
		'refresh'=> $zrefresh
	);

	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-wtw-3dinternet-updateavatar.php=".$e->getMessage());
}
?>

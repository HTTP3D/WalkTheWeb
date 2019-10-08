<?php
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/wtw-multiplayer-getavatar.php");
	
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
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$zavatardef = array();
	$zavatar = array();
	$zavatarparts = array();
	$zuseravatarid = "";
	$zavatarind = 0;
	$zobject = array();
	$zdisplayname = "Anonymous";
	$zprivacy = 0;
	$ztrackid = "";
	$zposition = array();
	$zscaling = array();
	$zrotation = array();
	$zmovetime = null;
	$zgraphics = array(
		'waterreflection'=>'1',
		'receiveshadows'=>'0'
	);
	$zavataranimationdefs = array();
	if (!empty($zfounduseravatarid) && isset($zfounduseravatarid)) {
		$zresults = $wtwconnect->query("
			select a.*,
				t.trackid,
				t.movetime,
				t.positionx,
				t.positiony,
				t.positionz,
				t.rotationx,
				t.rotationy,
				t.rotationz,
				t.walkspeed,
				case when '".$zuserid."' = '' then 'Anonymous'
					when not a.userid='".$zuserid."' then 'Anonymous' 
					else
						a.userid
				end as currentdisplayname
			from (".WTWMULTIPLAYER_PREFIX."useravatars a inner join ".WTWMULTIPLAYER_PREFIX."tracking t
					on a.instanceid=t.instanceid
					and a.userid=t.userid)  
			where a.useravatarid='".$zfounduseravatarid."'
				and a.deleted=0
				and ((t.communityid='".$zcommunityid."' and not t.communityid='')
					or (t.buildingid='".$zbuildingid."' and not t.buildingid=''));");

	
		$i = 0;
		foreach ($zresults as $zrow) {
			$zpersoninstanceid = $zrow["instanceid"];
			$zuseravatarid = $zrow["useravatarid"];
			$zavatarind = $zrow["avatarind"];
			$zdisplayname = $zrow["displayname"];
			$zprivacy = $zrow["privacy"];
			$ztrackid = $zrow["trackid"];
			$zmovetime = $zrow["movetime"];
			$zposition = array(
				'x'=> $zrow["positionx"], 
				'y'=> $zrow["positiony"], 
				'z'=> $zrow["positionz"]
			);
			$zscaling = array(
				'x'=> $zrow["scalingx"], 
				'y'=> $zrow["scalingy"], 
				'z'=> $zrow["scalingz"]
			);
			$zrotation = array(
				'x'=> $zrow["rotationx"], 
				'y'=> $zrow["rotationy"], 
				'z'=> $zrow["rotationz"]
			);
			$zobject = array(
				'uploadobjectid'=>'',
				'folder'=> $zrow["objectfolder"],
				'file'=> $zrow["objectfile"],
				'walkspeed'=>$zrow["walkspeed"],
				'objectanimations'=>null
			);
			
			$zresults2 = $wtwconnect->query("
				select c.*
				from ".WTWMULTIPLAYER_PREFIX."useravatarcolors c 
				where c.useravatarid='".$zfounduseravatarid."'
					and c.deleted=0
				order by c.avatarpart, c.avatarpartid;");
			$j = 0;
			foreach ($zresults2 as $zrow2) {
				$zavatarparts[$j] = array(
					'avatarpartid'=> $zrow2["avatarpartid"],
					'avatarpart'=> $zrow2["avatarpart"],
					'emissivecolorr'=> $zrow2["emissivecolorr"],
					'emissivecolorg'=> $zrow2["emissivecolorg"],
					'emissivecolorb'=> $zrow2["emissivecolorb"]
				); 
				$j += 1;
			}
			
			$zresults2 = $wtwconnect->query("
				select u.*
				from ".WTWMULTIPLAYER_PREFIX."useravataranimations u 
				where u.useravatarid='".$zfounduseravatarid."'
					and u.deleted=0
				order by u.loadpriority desc, u.avataranimationname, u.avataranimationid, u.useravataranimationid;");
			$j = 0;
			foreach ($zresults2 as $zrow2) {
				$zavataranimationdefs[$j] = array(
					'animationind'=> $j,
					'useravataranimationid'=> $zrow2["useravataranimationid"],
					'avataranimationid'=> $zrow2["avataranimationid"],
					'animationname'=> $zrow2["avataranimationname"],
					'animationfriendlyname'=> $zrow2["animationfriendlyname"],
					'loadpriority'=> $zrow2["loadpriority"],
					'animationicon'=> $zrow2["animationicon"],
					'speedratio'=> $zrow2["speedratio"],
					'defaultspeedratio'=> $zrow2["speedratio"],
					'objectfolder'=> $zrow2["objectfolder"],
					'objectfile'=> $zrow2["objectfile"],
					'startframe'=> $zrow2["startframe"],
					'endframe'=> $zrow2["endframe"],
					'animationloop'=> $zrow2["animationloop"],
					'walkspeed'=> $zrow2["walkspeed"]
				);
				$j += 1;
			}

			$zavatardef = array(
				'name'=> "person-".$zpersoninstanceid, 
				'useravatarid'=> $zuseravatarid, 
				'avatarind'=> $zavatarind,
				'position'=> $zposition,
				'scaling'=> $zscaling,
				'rotation'=> $zrotation,
				'object'=> $zobject,
				'trackid'=> $ztrackid, 
				'instanceid'=> $zpersoninstanceid,
				'userid'=> $zuserid, 
				'displayname'=> $zdisplayname, 
				'opacity'=>'1',
				'graphics'=> $zgraphics,
				'checkcollisions'=>'0',
				'ispickable'=>'1',
				'parentname'=>'',
				'movetime'=> $zmovetime,
				'moveevents'=> '',
				'privacy'=> $zprivacy,
				'avatarparts'=> $zavatarparts,
				'avataranimationdefs'=> $zavataranimationdefs,
				'animations'=> array(),
				'updated'=> '0',
				'loaded'=> '0');
			$i += 1;	
		}
	}
	echo json_encode($zavatardef);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-wtw-multiplayer-getavatar.php=".$e->getMessage());
}
?>

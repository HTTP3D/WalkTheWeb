<?php
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/wtw-3dinternet-getavatar.php");
	
	/* get values from querystring or session */
	$zuseravatarid = $wtwconnect->decode64($wtwconnect->getVal('a',''));
	$zinstanceid = $wtwconnect->decode64($wtwconnect->getVal('i',''));
	$zuserid = $wtwconnect->decode64($wtwconnect->getVal('d',''));
	$zcommunityid = $wtwconnect->decode64($wtwconnect->getVal('c',''));
	$zbuildingid = $wtwconnect->decode64($wtwconnect->getVal('b',''));
	
	$zfounduseravatarid = "";
	$zanonuseravatarid = "";
	$zuseruseravatarid = "";
	
	/* select anonymous useravatarid data by instance */
	$zresults = $wtwconnect->query("
		select useravatarid 
		from ".WTW_3DINTERNET_PREFIX."useravatars 
		where instanceid='".$zinstanceid."' 
			and userid='' 
			and deleted=0 
		order by updatedate desc limit 1;");
	foreach ($zresults as $zrow) {
		$zanonuseravatarid = $zrow["useravatarid"];
	}
	
	/* select useravatarid data by userid */
	$zresults = $wtwconnect->query("
		select useravatarid 
		from ".WTW_3DINTERNET_PREFIX."useravatars 
		where useravatarid='".$zuseravatarid."' 
			and userid='".$zuserid."' 
			and (not userid='') 
			and deleted=0 
		order by updatedate desc limit 1;");
	foreach ($zresults as $zrow) {
		$zuseruseravatarid = $zrow["useravatarid"];
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
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);
	
	/* format response data */
	$zavatardef = array();
	$zavatar = array();
	$zavatarparts = array();
	$zuseravatarid = "";
	$zanonymous = '0';
	$zavatarid = '';
	$zobjects = array();
	$zdisplayname = "Anonymous";
	$zprivacy = 0;
	$zenteranimation = "1";
	$zenteranimationparameter = "";
	$zexitanimation = "1";
	$zexitanimationparameter = "";
	$zposition = array();
	$zscaling = array();
	$zrotation = array();
	$zgraphics = array(
		'waterreflection'=>'1',
		'receiveshadows'=>'0'
	);
	$zavataranimationdefs = array();
	if ($wtwconnect->hasValue($zfounduseravatarid)) {
		/* retrieve avatar by useravatarid */
		$zresults = $wtwconnect->query("
			select a.*,
				case when '".$zuserid."' = '' then 'Anonymous'
					when not a.userid='".$zuserid."' then 'Anonymous' 
					else
						a.userid
				end as currentdisplayname
			from ".WTW_3DINTERNET_PREFIX."useravatars a
			where a.useravatarid='".$zfounduseravatarid."'
				and a.deleted=0;");

	
		$i = 0;
		foreach ($zresults as $zrow) {
			if ($zrow["userid"] == '') {
				$zanonymous = '1';
			}
			$zpersoninstanceid = $zrow["instanceid"];
			$zuseravatarid = $zrow["useravatarid"];
			$zavatarid = $zrow["avatarid"];
			$zdisplayname = $zrow["displayname"];
			$zprivacy = $zrow["privacy"];
			$zenteranimation = $zrow["enteranimation"];
			$zenteranimationparameter = $zrow["enteranimationparameter"];
			$zexitanimation = $zrow["exitanimation"];
			$zexitanimationparameter = $zrow["exitanimationparameter"];
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
			$zobjects = array(
				'uploadobjectid'=>'',
				'folder'=> $zrow["objectfolder"],
				'file'=> $zrow["objectfile"],
				'walkspeed'=>$zrow["walkspeed"],
				'walkanimationspeed'=>$zrow["walkanimationspeed"],
				'turnspeed'=>$zrow["turnspeed"],
				'turnanimationspeed'=>$zrow["turnanimationspeed"],
				'objectanimations'=>null
			);
			
			/* retrieve avatar colors by useravatarid */
			$zresults2 = $wtwconnect->query("
				select c.*
				from ".WTW_3DINTERNET_PREFIX."useravatarcolors c 
				where c.useravatarid='".$zfounduseravatarid."'
					and c.deleted=0
				order by c.avatarpart, c.avatarpartid;");
			$j = 0;
			foreach ($zresults2 as $zrow2) {
				$zavatarparts[$j] = array(
					'avatarpartid'=> $zrow2["avatarpartid"],
					'avatarpart'=> $zrow2["avatarpart"],
					'diffusecolor'=> $zrow2["diffusecolor"],
					'specularcolor'=> $zrow2["specularcolor"],
					'emissivecolor'=> $zrow2["emissivecolor"],
					'ambientcolor'=> $zrow2["ambientcolor"]
				); 
				$j += 1;
			}
			
			/* retrieve avatar animations by useravatarid */
			$zresults2 = $wtwconnect->query("
				select *
				from ".WTW_3DINTERNET_PREFIX."useravataranimations
				where useravatarid='".$zfounduseravatarid."'
					and deleted=0
				order by loadpriority desc, animationevent, avataranimationid, useravataranimationid;");
			$j = 0;
			foreach ($zresults2 as $zrow2) {
				$zavataranimationdefs[$j] = array(
					'animationind'=> $j,
					'useravataranimationid'=> $zrow2["useravataranimationid"],
					'avataranimationid'=> $zrow2["avataranimationid"],
					'animationevent'=> $zrow2["animationevent"],
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
			
			/* format return data set */
			$zavatardef = array(
				'name'=> "person-".$zpersoninstanceid, 
				'useravatarid'=> $zuseravatarid, 
				'avatarid'=> $zavatarid,
				'position'=> $zposition,
				'scaling'=> $zscaling,
				'rotation'=> $zrotation,
				'objects'=> $zobjects,
				'instanceid'=> $zpersoninstanceid,
				'userid'=> $zuserid, 
				'anonymous'=>$zanonymous,
				'displayname'=> $zdisplayname, 
				'opacity'=>'1',
				'graphics'=> $zgraphics,
				'checkcollisions'=>'1',
				'ispickable'=>'1',
				'parentname'=>'',
				'moveevents'=> '',
				'privacy'=> $zprivacy,
				'enteranimation'=> $zenteranimation,
				'enteranimationparameter'=> $zenteranimationparameter,
				'exitanimation'=> $zexitanimation,
				'exitanimationparameter'=> $zexitanimationparameter,
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
	$wtwconnect->serror("connect-wtw-3dinternet-getavatar.php=".$e->getMessage());
}
?>

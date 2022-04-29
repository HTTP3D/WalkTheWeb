<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides local user's avatar information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/useravatar.php");

	/* get values from querystring or session */
	$zinstanceid = $wtwconnect->decode64($wtwconnect->getVal('instanceid',''));
	$zuserid = $wtwconnect->decode64($wtwconnect->getVal('userid',''));
	$zuserip = $wtwconnect->decode64($wtwconnect->getVal('userip',''));
	$zuseravatarid = $wtwconnect->decode64($wtwconnect->getVal('useravatarid',''));
	$zavatarid = $wtwconnect->decode64($wtwconnect->getVal('avatarid',''));
	$zglobalhash = $wtwconnect->getVal('globalhash','');
	
	$zfounduseravatarid = '';
	$zfoundavatarid = '';
	
	if (!empty($zuseravatarid) && isset($zuseravatarid)) {
		/* check for user avatar */
		$zresults = $wtwconnect->query("
			select useravatarid, avatarid 
			from ".wtw_tableprefix."useravatars 
			where useravatarid='".$zuseravatarid."' 
				and deleted=0
			limit 1;");
		foreach ($zresults as $zrow) {
			$zfounduseravatarid = $zrow["useravatarid"];
			$zfoundavatarid = $zrow["avatarid"];
		}
	}

	if ((empty($zfounduseravatarid) || !isset($zfounduseravatarid)) && !empty($zuserid) && isset($zuserid)) {
		/* check for user avatar for logged in user (latest used) */
		$zresults = $wtwconnect->query("
			select useravatarid, avatarid
			from ".wtw_tableprefix."useravatars 
			where userid='".$zuserid."' 
				and deleted=0 
			order by updatedate desc 
			limit 1;");
		foreach ($zresults as $zrow) {
			$zfounduseravatarid = $zrow["useravatarid"];
			$zfoundavatarid = $zrow["avatarid"];
		}
	}

	if ((empty($zfounduseravatarid) || !isset($zfounduseravatarid)) && !empty($zinstanceid) && isset($zinstanceid)) {
		/* check for user avatar for by instance (latest used) */
		$zresults = $wtwconnect->query("
			select useravatarid, avatarid
			from ".wtw_tableprefix."useravatars 
			where instanceid='".$zinstanceid."' 
				and deleted=0 
			order by updatedate desc 
			limit 1;");
		foreach ($zresults as $zrow) {
			$zfounduseravatarid = $zrow["useravatarid"];
			$zfoundavatarid = $zrow["avatarid"];
		}
	}

	if ((empty($zfounduseravatarid) || !isset($zfounduseravatarid)) && !empty($zavatarid) && isset($zavatarid)) {
		/* check for avatar selected */
		$zresults = $wtwconnect->query("
			select avatarid
			from ".wtw_tableprefix."avatars 
			where avatarid='".$zavatarid."' 
				and deleted=0 
			limit 1;");
		foreach ($zresults as $zrow) {
			$zfoundavatarid = $zrow["avatarid"];
		}
	}

	$i = 0;
	$zavatar = array();
	$zavatarparts = array();
	$zfiles = array();
	$zusers = array();
	$zresponse = null;
	$zavataranimationdefs = array();
	$zcontentratings = array();
	$zblockedby = array();
	$zbannedby = array();
	$zpositionx = '0.00';
	$zpositiony = '0.00';
	$zpositionz = '0.00';
	$zscalingx = '1.0000';
	$zscalingy = '1.0000';
	$zscalingz = '1.0000';
	$zrotationx = '0.00';
	$zrotationy = '0.00';
	$zrotationz = '0.00';
	$zobjectfolder = "";
	$zobjectfile = "";
	$zstartframe = '1';
	$zendframe = '1';
	$zgender = 'female';
	$zdisplayname = 'Anonymous';
	$zavatardescription = '';
	$zavatargroup = 'Custom';
	$zanonymous = '0';
	$zprivacy = 0;
	$zversionid = '';
	$zversion = '1.0.0';
	$zversionorder = 1000000;
	$zversiondesc = 'Initial Version';
	
	$zwalkspeed = '1';
	$zwalkanimationspeed = '1';
	$zturnspeed = '1';
	$zturnanimationspeed = '1';
	
	$zenteranimation = "1";
	$zexitanimation = "1";
	$zenteranimationparameter = "";
	$zexitanimationparameter = "";

	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	if (isset($zfounduseravatarid) && !empty($zfounduseravatarid)) {
		/* get user avatar */
		$zresults = $wtwconnect->query("
			select * 
			from ".wtw_tableprefix."useravatars 
			where useravatarid='".$zfounduseravatarid."' 
				and deleted=0
			limit 1;");
		foreach ($zresults as $zrow) {
			if ($zrow["userid"] == '') {
				$zanonymous = '1';
			}
			$zuseravatarid = $zrow["useravatarid"];
			$zinstanceid = $zrow["instanceid"];
			$zavatarid = $zrow["avatarid"];
			$zfoundavatarid = $zrow["avatarid"];
			$zuserid = $zrow["userid"];
			$zversionid = $zrow["versionid"];
			$zversion = $zrow["version"];
			$zversionorder = $zrow["versionorder"];
			$zversiondesc = $zrow["versiondesc"];
			$zobjectfolder = $zrow["objectfolder"];
			$zobjectfile = $zrow["objectfile"];
			$zstartframe = $zrow["startframe"];
			$zendframe = $zrow["endframe"];
			$zwalkspeed = $zrow["walkspeed"];
			$zwalkanimationspeed = $zrow["walkanimationspeed"];
			$zturnspeed = $zrow["turnspeed"];
			$zturnanimationspeed = $zrow["turnanimationspeed"];
			$zdisplayname = $zrow["displayname"];
			$zavatardescription = $zrow["avatardescription"];
			$zgender = $zrow["gender"];
			$zavatargroup = $zrow["avatargroup"];
			$zprivacy = $zrow["privacy"];
			$zenteranimation = $zrow["enteranimation"];
			$zexitanimation = $zrow["exitanimation"];
			$zenteranimationparameter = $zrow["enteranimationparameter"];
			$zexitanimationparameter = $zrow["exitanimationparameter"];
			$zpositionx = $zrow["positionx"];
			$zpositiony = $zrow["positiony"];
			$zpositionz = $zrow["positionz"];
			$zscalingx = $zrow["scalingx"];
			$zscalingy = $zrow["scalingy"];
			$zscalingz = $zrow["scalingz"];
			$zrotationx = $zrow["rotationx"];
			$zrotationy = $zrow["rotationy"];
			$zrotationz = $zrow["rotationz"];
			$zobjectfolder = $zrow["objectfolder"];
			$zobjectfile = $zrow["objectfile"];
			$zstartframe = $zrow["startframe"];
			$zendframe = $zrow["endframe"];
			$zwalkspeed = $zrow["walkspeed"];
			$zwalkanimationspeed = $zrow["walkanimationspeed"];
			$zturnspeed = $zrow["turnspeed"];
			$zturnanimationspeed = $zrow["turnanimationspeed"];
		}

		/* get avatar and color settings */
		$i = 0;
		$zresults = $wtwconnect->query("
			select avatarpartid,
				avatarpart,
				diffusecolor,
				specularcolor,
				emissivecolor,
				ambientcolor
			from ".wtw_tableprefix."useravatarcolors 
			where useravatarid='".$zfounduseravatarid."'
				and deleted=0
			order by avatarpart, updatedate desc, avatarpartid;");
		foreach ($zresults as $zrow) {
			$zavatarparts[$i] = array(
				'globalpartid'=>'',
				'avatarpartid'=> $zrow["avatarpartid"],
				'avatarpart'=> $zrow["avatarpart"],
				'diffusecolor'=> $zrow["diffusecolor"],
				'emissivecolor'=> $zrow["emissivecolor"],
				'specularcolor'=> $zrow["specularcolor"],
				'ambientcolor'=> $zrow["ambientcolor"]
			);
			$i += 1;
		}
		
		/* get the user avatar animations (the wait idle is stored in the user avatars table) */
		$zavataranimationdefs[0] = array(
			'animationind'=> 0,
			'useravataranimationid'=> '',
			'avataranimationid'=> '',
			'animationevent'=> 'onwait',
			'animationfriendlyname'=> 'Wait',
			'loadpriority'=> 100,
			'animationicon'=> '',
			'defaultspeedratio'=> 1.00,
			'speedratio'=> 1.00,
			'objectfolder'=> $zobjectfolder,
			'objectfile'=> $zobjectfile,
			'startframe'=> $zstartframe,
			'endframe'=> $zendframe,
			'animationloop'=> 1,
			'soundid'=> '',
			'soundmaxdistance'=> 100,
			'walkspeed'=> '1',
			'totalframes' => '0',
			'totalstartframe' => '0',
			'totalendframe' => '0'
		);
		/* get the user avatar animations (the rest are stored in the useravataranimations table) */
		$i = 1;
		$zresults = $wtwconnect->query("
			select *	
			from ".wtw_tableprefix."useravataranimations
			where useravatarid='".$zfounduseravatarid."'
				and deleted=0
			order by loadpriority desc, animationevent, avataranimationid, useravataranimationid;");
		foreach ($zresults as $zrow) {
			$zavataranimationdefs[$i] = array(
				'animationind'=> $i,
				'useravataranimationid'=> $zrow["useravataranimationid"],
				'avataranimationid'=> $zrow["avataranimationid"],
				'animationevent'=> $zrow["animationevent"],
				'animationfriendlyname'=> addslashes($zrow["animationfriendlyname"]),
				'loadpriority'=> $zrow["loadpriority"],
				'animationicon'=> $zrow["animationicon"],
				'defaultspeedratio'=> $zrow["speedratio"],
				'speedratio'=> $zrow["speedratio"],
				'objectfolder'=> $zrow["objectfolder"],
				'objectfile'=> $zrow["objectfile"],
				'startframe'=> $zrow["startframe"],
				'endframe'=> $zrow["endframe"],
				'animationloop'=> $zrow["animationloop"],
				'walkspeed'=> $zrow["walkspeed"],
				'soundid'=> $zrow["soundid"],
				'soundmaxdistance'=> $zrow["soundmaxdistance"],
				'totalframes' => '0',
				'totalstartframe' => '0',
				'totalendframe' => '0'
			);
			$i += 1;
		}

	} else {
		if (!isset($zfoundavatarid) || empty($zfoundavatarid)) {
			/* get the first anonymous avatar available (latest updated) */
			$zresults = $wtwconnect->query("
				select avatarid
				from ".wtw_tableprefix."avatars 
				where avatargroup='Anonymous' 
					and deleted=0 
				order by updatedate desc
				limit 1;");
			foreach ($zresults as $zrow) {
				$zfoundavatarid = $zrow["avatarid"];
			}
		}
		
		/* get avatar by avatarid */
		$zresults = $wtwconnect->query("
			select * 
			from ".wtw_tableprefix."avatars 
			where avatarid='".$zfoundavatarid."'
				and deleted=0 
			limit 1;");
		foreach ($zresults as $zrow) {
			$zuseravatarid = '';
			$zanonymous = '1';
			$zversionid = $zrow["versionid"];
			$zversion = $zrow["version"];
			$zversionorder = $zrow["versionorder"];
			$zversiondesc = $zrow["versiondesc"];
			$zpositionx = $zrow["positionx"];
			$zpositiony = $zrow["positiony"];
			$zpositionz = $zrow["positionz"];
			$zscalingx = $zrow["scalingx"];
			$zscalingy = $zrow["scalingy"];
			$zscalingz = $zrow["scalingz"];
			$zrotationx = $zrow["rotationx"];
			$zrotationy = $zrow["rotationy"];
			$zrotationz = $zrow["rotationz"];
			$zobjectfolder = $zrow["objectfolder"];
			$zobjectfile = $zrow["objectfile"];
			$zstartframe = $zrow["startframe"];
			$zendframe = $zrow["endframe"];
			$zdisplayname = 'Anonymous';
			$zavatardescription = $zrow["avatardescription"];
			$zavatargroup = $zrow["avatargroup"];
			$zgender = $zrow["gender"];
			$zprivacy = '0';
			$zenteranimation = '0';
			$zexitanimation = '0';
			$zenteranimationparameter = '';
			$zexitanimationparameter = '';
		}
		
		/* get avatar and color settings */
		$i = 0;
		$zresults = $wtwconnect->query("
			select avatarpartid,
				avatarpart,
				diffusecolor,
				specularcolor,
				emissivecolor,
				ambientcolor
			from ".wtw_tableprefix."avatarcolors 
			where avatarid='".$zfoundavatarid."'
				and deleted=0
			order by avatarpart, updatedate desc, avatarpartid;");
		foreach ($zresults as $zrow) {
			$zavatarparts[$i] = array(
				'globalpartid'=>'',
				'avatarpartid'=> $zrow["avatarpartid"],
				'avatarpart'=> $zrow["avatarpart"],
				'diffusecolor'=> $zrow["diffusecolor"],
				'emissivecolor'=> $zrow["emissivecolor"],
				'specularcolor'=> $zrow["specularcolor"],
				'ambientcolor'=> $zrow["ambientcolor"]
			);
			$i += 1;
		}
		
		/* get the avatar animations (the wait idle is stored in the avatars table) */
		$zavataranimationdefs[0] = array(
			'animationind'=> 0,
			'useravataranimationid'=> '',
			'avataranimationid'=> '',
			'animationevent'=> 'onwait',
			'animationfriendlyname'=> 'Wait',
			'loadpriority'=> 100,
			'animationicon'=> '',
			'defaultspeedratio'=> 1.00,
			'speedratio'=> 1.00,
			'objectfolder'=> $zobjectfolder,
			'objectfile'=> $zobjectfile,
			'startframe'=> $zstartframe,
			'endframe'=> $zendframe,
			'animationloop'=> 1,
			'soundid'=> '',
			'soundmaxdistance'=> 100,
			'walkspeed'=> '1',
			'totalframes' => '0',
			'totalstartframe' => '0',
			'totalendframe' => '0'
		);
		$i = 1;
		/* get the avatar animations (the rest are stored in the avataranimations table) */
		$zresults = $wtwconnect->query("
			select * 
			from ".wtw_tableprefix."avataranimations 
			where avatarid='".$zfoundavatarid."'
				and deleted=0
			order by loadpriority desc, avataranimationid;");
		foreach ($zresults as $zrow) {
			$zavataranimationdefs[$i] = array(
				'animationind'=> $i,
				'useravataranimationid'=> '',
				'avataranimationid'=> $zrow["avataranimationid"],
				'animationevent'=> $zrow["animationevent"],
				'animationfriendlyname'=> addslashes($zrow["animationfriendlyname"]),
				'loadpriority'=> $zrow["loadpriority"],
				'animationicon'=> $zrow["animationicon"],
				'defaultspeedratio'=> $zrow["speedratio"],
				'speedratio'=> $zrow["speedratio"],
				'objectfolder'=> $zrow["objectfolder"],
				'objectfile'=> $zrow["objectfile"],
				'startframe'=> $zrow["startframe"],
				'endframe'=> $zrow["endframe"],
				'animationloop'=> $zrow["animationloop"],
				'soundid'=> $zrow["soundid"],
				'soundmaxdistance'=> $zrow["soundmaxdistance"],
				'walkspeed'=> '1',
				'totalframes' => '0',
				'totalstartframe' => '0',
				'totalendframe' => '0'
			);
			$i += 1;
		}

	}

	$i = 0;
	$zresults = $wtwconnect->query("
		select * 
		from ".wtw_tableprefix."contentratings
		where (webid='".$zfounduseravatarid."' and not webid='' and webtype='useravatar')
			or (webid='".$zfoundavatarid."' and not webid='' and webtype='avatar')
		order by webtype desc, updatedate desc
		limit 1;");
	foreach ($zresults as $zrow) {
		$zcontentratings[$i] = array(
			'contentratingid'=> $zrow["contentratingid"],
			'webidid'=> $zrow["webid"],
			'webtype'=> $zrow["webtype"],
			'rating'=> $zrow["rating"],
			'ratingvalue'=> $zrow["ratingvalue"],
			'contentwarning'=> addslashes($zrow["contentwarning"]),
			'createdate'=> $zrow["createdate"],
			'createuserid'=> $zrow["createuserid"],
			'updatedate'=> $zrow["updatedate"],
			'updateuserid'=> $zrow["updateuserid"]
		);
		$i += 1;
	}
	
	if (isset($zglobalhash) && !empty($zglobalhash)) {
		/* check to see if the files and users should be included in the result set */
		$zresults = $wtwconnect->query("
			select * 
			from ".wtw_tableprefix."useravatars 
			where globalhash='".$zglobalhash."'
				and deleted=0
			limit 1;");
		foreach ($zresults as $zrow) {
			/* add files */
			$zfiles = $wtwconnect->getAvatarFilesList($zfiles, wtw_rootpath.$zrow["objectfolder"]);
			
			/* add user */
			$i = 0;
			$zresults2 = $wtwconnect->query("
				select * 
				from ".wtw_tableprefix."users 
				where userid='".$zuserid."'
					and deleted=0
				limit 1;");
			foreach ($zresults2 as $zrow2) {
				$zusers[$i] = array(
					'userid'=> $zrow2["userid"],
					'displayname'=> addslashes($zrow2["displayname"]),
					'email'=> $zrow2["email"],
					'uploadpathid'=> $zrow2["uploadpathid"]
				);
				$i += 1;
			}
		}
	}
	
	if (!empty($zinstanceid) && isset($zinstanceid)) {
		/* get any blocked or banned records if they exist */
		$zfoundbantable = false;
		$zresults = $wtwconnect->query("show tables like '".wtw_tableprefix."3dinternet_blockedinstances';");
		if (is_object($zresults)) {
			if ($zresults->num_rows > 0) {
				$zfoundbantable = true;
			}
		} 
		if ($zfoundbantable) {
			$i = 0;
			$j = 0;

			$zresults = $wtwconnect->query("
				select *
				from ".wtw_tableprefix."3dinternet_blockedinstances
				where (baninstanceid='".$zinstanceid."'
						or instanceid='".$zinstanceid."')
					and deleted=0;
			");
			foreach ($zresults as $zrow) {
				if ($zrow->blockchat == 1) {
					$zblockedby[$i] = array(
						'instanceid' => $zrow->instanceid,
						'baninstanceid' => $zrow->baninstanceid
					);
				}
				if ($zrow->banuser == 1) {
					$zbannedby[$i] = array(
						'instanceid' => $zrow->instanceid,
						'baninstanceid' => $zrow->baninstanceid
					);
				}
			}
		}
	}
	
	/* combine avatar settings and animations for json return dataset */
	$zavatar = array(
		'name'=> '',
		'userid'=> $zuserid,
		'userip'=> '',
		'anonymous'=>$zanonymous,
		'globaluseravatarid'=> '',
		'useravatarid'=> $zfounduseravatarid,
		'instanceid'=> $zinstanceid,
		'avatarid'=> $zfoundavatarid,
		'versionid'=> $zversionid,
		'version'=> $zversion,
		'versionorder'=> $zversionorder,
		'versiondesc'=> addslashes($zversiondesc),
		'displayname'=> addslashes($zdisplayname),
		'avatardescription'=> addslashes($zavatardescription),
		'gender'=> addslashes($zgender),
		'avatargroup'=> addslashes($zavatargroup),
		'privacy'=> $zprivacy,
		'scalingx'=> $zscalingx,
		'scalingy'=> $zscalingy,
		'scalingz'=> $zscalingz,
		'objectfolder'=> $zobjectfolder,
		'objectfile'=> $zobjectfile,
		'startframe'=> $zstartframe,
		'endframe'=> $zendframe,
		'position'=> array(
			'x'=> $zpositionx,
			'y'=> $zpositiony,
			'z'=> $zpositionz
		),
		'scaling'=> array(
			'x'=> $zscalingx,
			'y'=> $zscalingy,
			'z'=> $zscalingz
		),
		'rotation'=> array(
			'x'=> $zrotationx,
			'y'=> $zrotationy,
			'z'=> $zrotationz
		),
		'objects'=> array(
			'folder'=> $zobjectfolder,
			'file'=> $zobjectfile,
			'startframe'=> $zstartframe,
			'endframe'=> $zendframe
		),
		'start'=> array(
			'position'=> array(
				'x'=> 0,
				'y'=> 0,
				'z'=> 0
			),
			'rotation'=> array(
				'x'=> 0,
				'y'=> 0,
				'z'=> 0
			)
		),
		'avatarparts'=> $zavatarparts,
		'avataranimationdefs'=> $zavataranimationdefs,
		'animations'=> array(),
		'files'=> $zfiles,
		'users'=> $zusers,
		'contentratings'=> $zcontentratings,
		'enteranimation'=> $zenteranimation,
		'enteranimationparameter'=> $zenteranimationparameter,
		'exitanimation'=> $zexitanimation,
		'exitanimationparameter'=> $zexitanimationparameter,
		'walkspeed'=> $zwalkspeed,
		'walkanimationspeed'=> $zwalkanimationspeed,
		'turnspeed'=> $zturnspeed,
		'turnanimationspeed'=> $zturnanimationspeed,
		'checkcollisions'=> '1',
		'ispickable'=> '0',
		'moveevents'=> '',
		'parentname'=> '',
		'updated'=> '0',
		'loaded'=> '0',
		'blockedby'=> $zblockedby,
		'bannedby'=> $zbannedby
	);
	$zresponse['avatar'] = $zavatar;
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-useravatar.php=".$e->getMessage());
}
?>

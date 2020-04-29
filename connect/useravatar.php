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
	$zinstanceid = base64_decode($wtwconnect->getVal('i',''));
	$zuserid = base64_decode($wtwconnect->getVal('d',''));
	$zuserip = base64_decode($wtwconnect->getVal('p',''));
	$zuseravatarid = base64_decode($wtwconnect->getVal('a',''));
	$zavatarid = base64_decode($wtwconnect->getVal('id',''));
	
	if (!empty($zuseravatarid) && isset($zuseravatarid) && !empty($zuserid) && isset($zuserid)) {
		/* check for avatar for logged in user (latest used) */
		$zresults = $wtwconnect->query("
			select useravatarid 
			from ".wtw_tableprefix."useravatars 
			where userid='".$zuserid."' 
				and useravatarid='".$zuseravatarid."' 
				and deleted=0 
			order by updatedate desc 
			limit 1;");
		foreach ($zresults as $zrow) {
			$zuseravatarid = $zrow["useravatarid"];
		}
	}
	if ((empty($zuseravatarid) || !isset($zuseravatarid)) && !empty($zuserid) && isset($zuserid)) {
		/* check for avatar for logged in user (latest used) */
		$zresults = $wtwconnect->query("
			select useravatarid 
			from ".wtw_tableprefix."useravatars 
			where userid='".$zuserid."' 
				and deleted=0 
			order by updatedate desc 
			limit 1;");
		foreach ($zresults as $zrow) {
			$zuseravatarid = $zrow["useravatarid"];
		}
	}

	$i = 0;
	$zavatar = array();
	$zavatarparts = array();
	$zresponse = null;
	$zavataranimationdefs = array();
	$zavatarind = -1;
	$zscalingx = '.07';
	$zscalingy = '.07';
	$zscalingz = '.07';
	$zobjectfolder = "";
	$zobjectfile = "";
	$zgender = "female";
	$zdisplayname = "Anonymous";
	$zanonymous = '0';
	$zprivacy = 0;
	$zenteranimation = "1";
	$zexitanimation = "1";
	$zenteranimationparameter = "";
	$zexitanimationparameter = "";

	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	if (!empty($zavatarid) && isset($zavatarid) && (empty($zuseravatarid) || !isset($zuseravatarid)) && (empty($zuserid) || !isset($zuserid))) {
		$zuseravatarid = '';
		/* get avatar by avatarid */
		$zresults = $wtwconnect->query("
			select * 
			from ".wtw_tableprefix."avatars 
			where avatargroup='Anonymous'
				and avatarid='".$zavatarid."'
				and deleted=0 
			limit 1;");
		foreach ($zresults as $zrow) {
			$zscalingx = $zrow["scalingx"];
			$zscalingy = $zrow["scalingy"];
			$zscalingz = $zrow["scalingz"];
			$zobjectfolder = $zrow["avatarfolder"];
			$zobjectfile = $zrow["avatarfile"];
			$zgender = $zrow["gender"];
		}
		$zanonymous = '1';
	} else if ((empty($zuseravatarid) || !isset($zuseravatarid)) && (empty($zuserid) || !isset($zuserid)) && !empty($zinstanceid) && isset($zinstanceid)) {
		/* check for anonymous avatar with same instanceid - not logged in user (latest used) */
		$zresults = $wtwconnect->query("
			select useravatarid 
			from ".wtw_tableprefix."useravatars 
			where instanceid='".$zinstanceid."' 
				and userid='' 
				and deleted=0 
			order by updatedate desc 
			limit 1;");
		foreach ($zresults as $zrow) {
			$zuseravatarid = $zrow["useravatarid"];
		}
	}

	if (!empty($zuseravatarid) && isset($zuseravatarid)) {
		/* get avatar and color settings */
		$zresults = $wtwconnect->query("
			select a.*,
				c.avatarpartid,
				c.avatarpart,
				c.emissivecolorr,
				c.emissivecolorg,
				c.emissivecolorb
			from ".wtw_tableprefix."useravatars a 
				left join (select * from ".wtw_tableprefix."useravatarcolors 
						where deleted=0) c
					on a.useravatarid = c.useravatarid
			where a.useravatarid='".$zuseravatarid."'
				and (c.deleted is null or c.deleted=0)
			order by c.avatarpart, c.updatedate desc;");
		foreach ($zresults as $zrow) {
			if ($zrow["userid"] == '') {
				$zanonymous = '1';
			}
			$zuseravatarid = $zrow["useravatarid"];
			$zinstanceid = $zrow["instanceid"];
			$zavatarid = $zrow["avatarid"];
			$zavatarind = $zrow["avatarind"];
			$zscalingx = $zrow["scalingx"];
			$zscalingy = $zrow["scalingy"];
			$zscalingz = $zrow["scalingz"];
			$zobjectfolder = $zrow["objectfolder"];
			$zobjectfile = $zrow["objectfile"];
			$zdisplayname = $zrow["displayname"];
			$zprivacy = $zrow["privacy"];
			$zenteranimation = $zrow["enteranimation"];
			$zexitanimation = $zrow["exitanimation"];
			$zenteranimationparameter = $zrow["enteranimationparameter"];
			$zexitanimationparameter = $zrow["exitanimationparameter"];
			$zavatarparts[$i] = array(
				'serverpartid'=>'',
				'avatarpartid'=> $zrow["avatarpartid"],
				'avatarpart'=> $zrow["avatarpart"],
				'emissivecolorr'=> $zrow["emissivecolorr"],
				'emissivecolorg'=> $zrow["emissivecolorg"],
				'emissivecolorb'=> $zrow["emissivecolorb"],
				'hex'=>''
			);
			$i += 1;
		}
	}
	if (!empty($zuseravatarid) && isset($zuseravatarid)) {
		$i = 0;
		/* get avatar animations */
		$zresults = $wtwconnect->query("
			select u.*,
				a.loadpriority,
				a.animationfriendlyname,
				a.animationicon,
				a.objectfolder,
				a.objectfile,
				a.startframe,
				a.endframe,
				a.animationloop,
				a.speedratio as defaultspeedratio,
				a.soundid,
				a.soundpath,
				a.soundmaxdistance
			from ".wtw_tableprefix."useravataranimations u 
				inner join ".wtw_tableprefix."avataranimations a
					on u.avataranimationid=a.avataranimationid
			where u.useravatarid='".$zuseravatarid."'
				and u.deleted=0
			order by a.loadpriority desc, u.avataranimationevent, u.avataranimationid, u.useravataranimationid;");
		foreach ($zresults as $zrow) {
			$zavataranimationdefs[$i] = array(
				'animationind'=> $i,
				'useravataranimationid'=> $zrow["useravataranimationid"],
				'avataranimationid'=> $zrow["avataranimationid"],
				'animationevent'=> $zrow["avataranimationevent"],
				'animationfriendlyname'=> $zrow["animationfriendlyname"],
				'loadpriority'=> $zrow["loadpriority"],
				'animationicon'=> $zrow["animationicon"],
				'defaultspeedratio'=> $zrow["defaultspeedratio"],
				'speedratio'=> $zrow["speedratio"],
				'objectfolder'=> $zrow["objectfolder"],
				'objectfile'=> $zrow["objectfile"],
				'startframe'=> $zrow["startframe"],
				'endframe'=> $zrow["endframe"],
				'animationloop'=> $zrow["animationloop"],
				'walkspeed'=> $zrow["walkspeed"],
				'soundid'=> $zrow["soundid"],
				'soundpath'=> $zrow["soundpath"],
				'soundmaxdistance'=> $zrow["soundmaxdistance"],
				'totalframes' => '0',
				'totalstartframe' => '0',
				'totalendframe' => '0'
			);
			$i += 1;
		}
	} else {
		$i = 0;
		/* get avatar by avatarid */
		$zresults = $wtwconnect->query("
			select * 
			from ".wtw_tableprefix."avataranimations 
			where setdefault=1
				and deleted=0
			order by loadpriority desc, avaatranimationid;");
		foreach ($zresults as $zrow) {
			$zavataranimationdefs[$i] = array(
				'animationind'=> $i,
				'useravataranimationid'=> '',
				'avataranimationid'=> $zrow["avataranimationid"],
				'animationevent'=> $zrow["animationevent"],
				'animationfriendlyname'=> $zrow["animationfriendlyname"],
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
				'soundpath'=> $zrow["soundpath"],
				'soundmaxdistance'=> $zrow["soundmaxdistance"],
				'walkspeed'=> '1',
				'totalframes' => '0',
				'totalstartframe' => '0',
				'totalendframe' => '0'
			);
			$i += 1;
		}
	}
	/* combine avatar settings and animations for json return dataset */
	$zavatar = array(
		'name'=> '',
		'userid'=> $zuserid,
		'anonymous'=>$zanonymous,
		'globalavatarid'=> '',
		'useravatarid'=> $zuseravatarid,
		'instanceid'=> $zinstanceid,
		'avatarid'=> $zavatarid,
		'avatarind'=> $zavatarind,
		'displayname'=> $zdisplayname,
		'privacy'=> $zprivacy,
		'scalingx'=> $zscalingx,
		'scalingy'=> $zscalingy,
		'scalingz'=> $zscalingz,
		'objectfolder'=> $zobjectfolder,
		'objectfile'=> $zobjectfile,
		'position'=> array(
			'x'=> 0,
			'y'=> 0,
			'z'=> 0
		),
		'scaling'=> array(
			'x'=> $zscalingx,
			'y'=> $zscalingy,
			'z'=> $zscalingz
		),
		'rotation'=> array(
			'x'=> 0,
			'y'=> 0,
			'z'=> 0
		),
		'object'=> array(
			'folder'=> $zobjectfolder,
			'file'=> $zobjectfile
		),
		'avatarparts'=> $zavatarparts,
		'avataranimationdefs'=> $zavataranimationdefs,
		'animations'=> array(),
		'enteranimation'=> $zenteranimation,
		'enteranimationparameter'=> $zenteranimationparameter,
		'exitanimation'=> $zexitanimation,
		'exitanimationparameter'=> $zexitanimationparameter,
		'walkspeed'=> '1',
		'walkanimationspeed'=> '1',
		'turnspeed'=> '1',
		'turnanimationspeed'=> '1',
		'checkcollisions'=> '1',
		'ispickable'=> '0',
		'moveevents'=> '',
		'parentname'=> '',
		'updated'=> '0',
		'loaded'=> '0'
	);
	$zresponse['avatar'] = $zavatar;
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-avatar.php=".$e->getMessage());
}
?>

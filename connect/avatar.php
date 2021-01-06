<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides basic avatar information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/avatar.php");

	/* get values from querystring or session */
	$zavatarid = $wtwconnect->getVal('avatarid','');

	$zavatarparts = array();
	$zavataranimations = array();

	/* pull avatar by id */

	/* pull avatar colors by id */
	$zresults = $wtwconnect->query("
		select * 
		from ".wtw_tableprefix."avatarcolors 
		where deleted=0 
			and avatarid='".$zavatarid."'
		order by avatarpart, avatarpartid;");
	$i = 0;
	foreach ($zresults as $zrow) {
		$zavatarparts[$i] = array(
			'avatarpartid'=> $zrow["avatarpartid"],
			'avatarpart'=> $zrow["avatarpart"],
			'diffusecolor'=> $zrow["diffusecolor"],
			'specularcolor'=> $zrow["specularcolor"],
			'emissivecolor'=> $zrow["emissivecolor"],
			'ambientcolor'=> $zrow["ambientcolor"]
		);
		$i += 1;
	}

	/* pull avatar animations by id */
	$zresults = $wtwconnect->query("
		select * 
		from ".wtw_tableprefix."avataranimations
		where (setdefault=1
				and deleted=0)
			or (avatarid='".$zavatarid."' 
				and setdefault=0
				and deleted=0)
		order by loadpriority desc, animationevent, setdefault, avataranimationid;");
	$i = 0;
	foreach ($zresults as $zrow) {
		$zavataranimations[$i] = array(
			'avataranimationid'=> $zrow["avataranimationid"],
			'avatarid'=> $zrow["avatarid"],
			'loadpriority'=> $zrow["loadpriority"],
			'animationevent'=> $zrow["animationevent"],
			'animationfriendlyname'=> $zrow["animationfriendlyname"],
			'setdefault'=> $zrow["setdefault"],
			'animationicon'=> $zrow["animationicon"],
			'objectfolder'=> $zrow["objectfolder"],
			'objectfile'=> $zrow["objectfile"],
			'startframe'=> $zrow["startframe"],
			'endframe'=> $zrow["endframe"],
			'animationloop'=> $zrow["animationloop"],
			'speedratio'=> $zrow["speedratio"],
			'soundid'=> $zrow["soundid"],
			'soundpath'=> $zrow["soundpath"],
			'soundmaxdistance'=> $zrow["soundmaxdistance"]
		);
		$i += 1;
	}

	/* pull main avatar profile by id */
	$zresults = $wtwconnect->query("
		select * 
		from ".wtw_tableprefix."avatars 
		where deleted=0 
			and avatarid='".$zavatarid."'
		order by avatargroup, sortorder, displayname;");
	$zavatar = array();

	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	foreach ($zresults as $zrow) {
		$zavatar = array(
			'avatarid'=> $zrow["avatarid"],
			'avatargroup'=> $zrow["avatargroup"],
			'displayname'=> $zrow["displayname"],
			'gender'=> $zrow["gender"],
			'object'=> array(
				'folder'=> $zrow["avatarfolder"],
				'file'=> $zrow["avatarfile"],
				'startframe'=> $zrow["startframe"],
				'endframe'=> $zrow["endframe"]
			),
			'scaling'=> array(
				'x'=> $zrow["scalingx"],
				'y'=> $zrow["scalingy"],
				'z'=> $zrow["scalingz"]
			),
			'thumbnails'=> array(
				'imagefull'=> $zrow["imagefull"],
				'imageface'=> $zrow["imageface"]
			),
			'sortorder'=> $zrow["sortorder"],
			'avatarparts'=> $zavatarparts,
			'avataranimations'=> $zavataranimations
		);
	}
	$zresponse['avatar'] = $zavatar;
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-avatar.php=".$e->getMessage());
}
?>

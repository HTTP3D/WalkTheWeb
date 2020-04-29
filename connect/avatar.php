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
	
	/* pull avatar by id */
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
				'file'=> $zrow["avatarfile"]
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
			'sortorder'=> $zrow["sortorder"]
		);
	}
	$zresponse['avatar'] = $zavatar;
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-avatar.php=".$e->getMessage());
}
?>

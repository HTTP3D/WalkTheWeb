<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides basic avatar animations information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/avataranimations.php");

	$i = 0;
	$zavataranimations = array();

	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$i = 0;
	/* get avatar animations */
	$zresults = $wtwconnect->query("
		select a.*
		from ".wtw_tableprefix."avataranimations a
		where a.deleted=0
		order by a.loadpriority desc, a.animationevent, a.animationfriendlyname, a.avataranimationid;");
	foreach ($zresults as $zrow) {
		$zavataranimations[$i] = array(
			'animationind'=> $i,
			'avataranimationid'=> $zrow["avataranimationid"],
			'animationevent'=> $zrow["animationevent"],
			'animationfriendlyname'=> $zrow["animationfriendlyname"],
			'loadpriority'=> $zrow["loadpriority"],
			'animationicon'=> $zrow["animationicon"],
			'speedratio'=> $zrow["speedratio"],
			'objectfolder'=> $zrow["objectfolder"],
			'objectfile'=> $zrow["objectfile"],
			'startframe'=> $zrow["startframe"],
			'endframe'=> $zrow["endframe"],
			'soundid'=> $zrow["soundid"],
			'soundpath'=> $zrow["soundpath"],
			'soundmaxdistance'=> $zrow["soundmaxdistance"],
			'setdefault'=> $zrow["setdefault"]
		);
		$i += 1;
	}

	$zresponse['avataranimations'] = $zavataranimations;
	echo json_encode($zresponse);
} catch (Exception $e) {
	$wtwconnect->serror("connect-avataranimations.php=".$e->getMessage());
}
?>

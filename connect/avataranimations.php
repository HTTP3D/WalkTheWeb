<?php
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
		order by a.animationfriendlyname, a.avataranimationid;");
	foreach ($zresults as $zrow) {
		$zavataranimations[$i] = array(
			'animationind'=> $i,
			'avataranimationid'=> $zrow["avataranimationid"],
			'animationname'=> $zrow["animationname"],
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
			'soundmaxdistance'=> $zrow["soundmaxdistance"]
		);
		$i += 1;
	}

	$zresponse['avataranimations'] = $zavataranimations;
	echo json_encode($zresponse);
} catch (Exception $e) {
	$wtwconnect->serror("connect-avataranimations.php=".$e->getMessage());
}
?>

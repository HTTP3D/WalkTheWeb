<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides a list of 3D Community Names information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/communitynames.php");

	/* select communities for user */
	$zresults = $wtwconnect->query("
		select c1.*
		from ".wtw_tableprefix."communities c1
		where c1.deleted=0
		order by c1.communityname, 
			c1.communityid;");
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$i = 0;
	$zcommunities = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zcommunities[$i] = array(
			'communityid' => $zrow["communityid"],
			'communityname' => $wtwconnect->escapeHTML($zrow["communityname"]),
			'communitydescription' => $wtwconnect->escapeHTML($zrow["communitydescription"])
		);
		$i += 1;
	}
	echo json_encode($zcommunities);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-communitynames.php=".$e->getMessage());
}
?>

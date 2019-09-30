<?php
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
			'communityname' => htmlspecialchars($zrow["communityname"], ENT_QUOTES, 'UTF-8')
		);
		$i += 1;
	}
	echo json_encode($zcommunities);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-communitynames.php=".$e->getMessage());
}
?>

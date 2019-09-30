<?php
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/buildingnames.php");
	
	/* get values from querystring or session */
	$zuserid = $wtwconnect->userid;

	/* select buildings by userid */
	$zresults = $wtwconnect->query("
		select b1.*
		from ".wtw_tableprefix."buildings b1
		where b1.deleted=0
		order by b1.buildingname, b1.buildingid;");
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$i = 0;
	$zbuildings = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zbuildings[$i] = array(
			'buildingid' => $zrow["buildingid"],
			'buildingname' => htmlspecialchars($zrow["buildingname"], ENT_QUOTES, 'UTF-8')
		);
		$i += 1;
	}
	echo json_encode($zbuildings);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-buildingnames=".$e->getMessage());
}
?>

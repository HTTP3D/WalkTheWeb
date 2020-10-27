<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides a list of 3D Building names information */
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
			'buildingname' => htmlspecialchars($zrow["buildingname"], ENT_QUOTES, 'UTF-8'),
			'buildingdescription' => htmlspecialchars($zrow["buildingdescription"], ENT_QUOTES, 'UTF-8')
		);
		$i += 1;
	}
	echo json_encode($zbuildings);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-buildingnames=".$e->getMessage());
}
?>

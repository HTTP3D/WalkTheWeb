<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides a list of 3D Thing Names information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/thingnames.php");
	
	/* get values from querystring or session */
	$zuserid = $wtwconnect->userid;
	
	/* select building molds that have been deleted */
	$zresults = $wtwconnect->query("
		select t1.*
		from ".wtw_tableprefix."things t1 
		 where t1.deleted=0
		order by t1.thingname,t1.thingid;");
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$i = 0;
	$zthings = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zthings[$i] = array(
			'thingid' => $zrow["thingid"],
			'thingname' => htmlspecialchars($zrow["thingname"], ENT_QUOTES, 'UTF-8'),
			'thingdescription' => htmlspecialchars($zrow["thingdescription"], ENT_QUOTES, 'UTF-8')
		);
		$i += 1;
	}
	echo json_encode($zthings);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-thingnames.php=".$e->getMessage());
}
?>

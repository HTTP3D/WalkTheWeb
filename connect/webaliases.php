<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides multiple web aliases information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/webaliases.php");
	
	/* get web aliases for a user */
	$zresults = $wtwconnect->query("
		select w1.*
		from ".wtw_tableprefix."webaliases w1
		where w1.deleted=0
		order by 
			w1.domainname,
			w1.communitypublishname,
			w1.buildingpublishname,
			w1.thingpublishname,
			w1.communityid,
			w1.buildingid,
			w1.thingid,
			w1.webaliasid;");
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);
	
	$i = 0;
	$zresponse = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$webalias = array(
			'webaliasid' => $zrow["webaliasid"],
			'domainname' => $zrow["domainname"],
			'webalias' => $zrow["webalias"],
			'communityid' => $zrow["communityid"],
			'communitypublishname' => $zrow["communitypublishname"],
			'buildingid' => $zrow["buildingid"],
			'buildingpublishname' => $zrow["buildingpublishname"],
			'thingid' => $zrow["thingid"],
			'thingpublishname' => $zrow["thingpublishname"],
			'forcehttps' => $zrow["forcehttps"],
			'createdate' => $zrow["createdate"],
			'createuserid' => $zrow["createuserid"],
			'updatedate' => $zrow["updatedate"],
			'updateuseride' => $zrow["updateuserid"]);
		$zresponse[$i] = $webalias;
		$i += 1;
	}
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-webaliases.php=".$e->getMessage());
}
?>

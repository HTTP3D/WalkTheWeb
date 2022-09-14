<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides web aliases information for franchises */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/franchises.php");
	$zhostuserid = '';
	if ($wtwconnect->isUserInRole("Host") && $wtwconnect->isUserInRole("Admin") == false) {
		$zhostuserid = $wtwconnect->userid;
	}
	
	$zresults = array();
	
	/* get web aliases for a user */
	$zresults = $wtwconnect->query("
		select w1.*,
			c1.communityname,
			b1.buildingname,
			t1.thingname
		from ".wtw_tableprefix."webaliases w1
			left join ".wtw_tableprefix."communities c1
				on w1.communityid=c1.communityid
			left join ".wtw_tableprefix."buildings b1
				on w1.buildingid=b1.buildingid
			left join ".wtw_tableprefix."things t1
				on w1.thingid=t1.thingid
		where w1.deleted=0
			and w1.franchise=1
		order by 
			w1.hostuserid desc,
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
			'serverfranchiseid' => '',
			'webaliasid' => $zrow["webaliasid"],
			'domainname' => $zrow["domainname"],
			'webalias' => $zrow["webalias"],
			'communityid' => $zrow["communityid"],
			'communitypublishname' => $zrow["communitypublishname"],
			'communityname' => $zrow["communityname"],
			'buildingid' => $zrow["buildingid"],
			'buildingpublishname' => $zrow["buildingpublishname"],
			'buildingname' => $zrow["buildingname"],
			'thingid' => $zrow["thingid"],
			'thingpublishname' => $zrow["thingpublishname"],
			'thingname' => $zrow["thingname"],
			'forcehttps' => $zrow["forcehttps"],
			'franchise' => $zrow["franchise"],
			'franchiseid' => $zrow["franchiseid"],
			'createdate' => $zrow["createdate"],
			'createuserid' => $zrow["createuserid"],
			'updatedate' => $zrow["updatedate"],
			'updateuserid' => $zrow["updateuserid"]);
		$zresponse[$i] = $webalias;
		$i += 1;
	}
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-franchises.php=".$e->getMessage());
}
?>

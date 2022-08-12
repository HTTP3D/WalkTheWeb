<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides multiple web domains information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/webdomains.php");
	$zhostuserid = '';
	if ($wtwconnect->isUserInRole("Host") && $wtwconnect->isUserInRole("Admin") == false) {
		$zhostuserid = $wtwconnect->userid;
	}
	
	$zresults = array();
	
	/* get web domains for a user */
	if ($wtwconnect->isUserInRole("Admin")) {
		$zresults = $wtwconnect->query("
			select w1.*
			from ".wtw_tableprefix."webdomains w1
			where w1.deleted=0
			order by 
				w1.hostuserid desc,
				w1.domainname,
				w1.webdomainid;");
	} else if ($wtwconnect->isUserInRole("Host")) {
		$zresults = $wtwconnect->query("
			select w1.*
			from ".wtw_tableprefix."webdomains w1
			where w1.deleted=0
				and (hostuserid='".$zhostuserid."'
				or (hostuserid='' and allowhosting=1))
			order by 
				w1.hostuserid,
				w1.domainname,
				w1.webdomainid;");
	}
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);
	
	$i = 0;
	$zresponse = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zwebdomain = array(
			'webdomainid' => $zrow["webdomainid"],
			'hostuserid' => $zrow["hostuserid"],
			'domainname' => $zrow["domainname"],
			'forcehttps' => $zrow["forcehttps"],
			'allowhosting' => $zrow["allowhosting"],
			'startdate' => $zrow["startdate"],
			'expiredate' => $zrow["expiredate"],
			'hostprice' => $zrow["hostprice"],
			'hostdays' => $zrow["hostdays"],
			'createdate' => $zrow["createdate"],
			'createuserid' => $zrow["createuserid"],
			'updatedate' => $zrow["updatedate"],
			'updateuserid' => $zrow["updateuserid"]);
		$zresponse[$i] = $zwebdomain;
		$i += 1;
	}
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-webdomains.php=".$e->getMessage());
}
?>

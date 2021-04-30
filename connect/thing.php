<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides 3D Thing information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/thing.php");
	
	/* get values from querystring or session */
	$zthingid = $wtwconnect->getVal('thingid','');

	/* get thing */
	$zresults = $wtwconnect->query("
	select *
	from ".wtw_tableprefix."things
    where thingid='".$zthingid."'
       and deleted=0;");
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$i = 0;
	$zresponse = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zauthorizedusers = array('userid'=> $zrow["userid"]);
		$zthinginfo = array(
			'thingid' => $zrow["thingid"],
			'versionid' => $zrow["versionid"],
			'version' => $zrow["version"],
			'versiondesc' => htmlspecialchars($zrow["versiondesc"], ENT_QUOTES, 'UTF-8'),
			'thingname' => htmlspecialchars($zrow["thingname"], ENT_QUOTES, 'UTF-8'),
			'thingdescription' => htmlspecialchars($zrow["thingdescription"], ENT_QUOTES, 'UTF-8'),
			'createdate' => $zrow["createdate"],
			'analyticsid'=> $zrow["analyticsid"],
			'snapshotid' => $zrow["snapshotid"]
		);
		$zshare = array(
			'templatename' => htmlspecialchars($zrow["templatename"], ENT_QUOTES, 'UTF-8'),
			'description' => htmlspecialchars($zrow["description"], ENT_QUOTES, 'UTF-8'),
			'tags' => htmlspecialchars($zrow["tags"], ENT_QUOTES, 'UTF-8')
		);
		$zalttag = array(
			'name' => $zrow["alttag"]
		);
		$zresponse[$i] = array(
			'thinginfo'=> $zthinginfo,
			'share'=> $zshare,
			'alttag'=> $zalttag,
			'authorizedusers'=> $zauthorizedusers
		);
		$i += 1;
	}
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-thing.php=".$e->getMessage());
}
?>

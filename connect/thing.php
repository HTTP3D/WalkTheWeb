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
	select *,
		case when snapshotid = '' then ''
			else
				(select u1.filepath 
					from ".wtw_tableprefix."uploads u1 
					where u1.uploadid=snapshotid limit 1)
			end as snapshotpath
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
			'versionorder' => $zrow["versionorder"],
			'versiondesc' => $wtwconnect->escapeHTML($zrow["versiondesc"]),
			'thingname' => $wtwconnect->escapeHTML($zrow["thingname"]),
			'thingdescription' => $wtwconnect->escapeHTML($zrow["thingdescription"]),
			'analyticsid'=> $zrow["analyticsid"],
			'snapshotid' => $zrow["snapshotid"],
			'snapshotpath' => $zrow["snapshotpath"],
			'createdate' => $zrow["createdate"],
			'createuserid' => $zrow["createuserid"],
			'updatedate' => $zrow["updatedate"],
			'updateuserid' => $zrow["updateuserid"]
		);
		$zshare = array(
			'templatename' => $wtwconnect->escapeHTML($zrow["templatename"]),
			'description' => $wtwconnect->escapeHTML($zrow["description"]),
			'tags' => $wtwconnect->escapeHTML($zrow["tags"])
		);
		$zalttag = array(
			'name' => $zrow["alttag"]
		);
		$zresponse[$i] = array(
			'thinginfo'=> $zthinginfo,
			'serverfranchiseid' => '',
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

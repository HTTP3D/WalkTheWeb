<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides 3D Building information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/building.php");
	
	/* get values from querystring or session */
	$zbuildingid = $wtwconnect->getVal('buildingid','');

	/* select building data */
	$zresults = $wtwconnect->query("
		select *,
			case when snapshotid = '' then ''
				else
					(select u1.filepath 
						from ".wtw_tableprefix."uploads u1 
						where u1.uploadid=snapshotid limit 1)
				end as snapshotpath
		from ".wtw_tableprefix."buildings
		where buildingid='".$zbuildingid."'
		   and deleted=0;");
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$i = 0;
	$zresponse = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zauthorizedusers = array('userid'=> $zrow["userid"]);
		$zbuildinginfo = array(
			'buildingid' => $zrow["buildingid"],
			'versionid' => $zrow["versionid"],
			'version' => $zrow["version"],
			'versionorder' => $zrow["versionorder"],
			'versiondesc' => $wtwconnect->escapeHTML($zrow["versiondesc"]),
			'buildingname' => $wtwconnect->escapeHTML($zrow["buildingname"]),
			'buildingdescription' => $wtwconnect->escapeHTML($zrow["buildingdescription"]),
			'snapshotid' => $zrow["snapshotid"],
			'snapshotpath' => $zrow["snapshotpath"],
			'analyticsid'=> $zrow["analyticsid"],
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
			'buildinginfo'=> $zbuildinginfo,
			'serverfranchiseid' => '',
			'share'=> $zshare,
			'alttag'=> $zalttag,
			'authorizedusers'=> $zauthorizedusers,
			'gravity'=> $zrow["gravity"]
		);
		$i += 1;
	}
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-building.php=".$e->getMessage());
}
?>

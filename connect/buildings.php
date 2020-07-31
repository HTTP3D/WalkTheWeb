<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides 3D Building information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/buildings.php");
	
	/* get values from querystring or session */
	$zuserid = $wtwconnect->userid;

	/* select buildings by userid */
	$zresults = $wtwconnect->query("
		select b1.*,
			u1.filepath,
			u1.filetype,
			u1.filedata
		from (select * 
				from ".wtw_tableprefix."userauthorizations 
				where userid='".$zuserid."' 
					and not buildingid='' 
					and deleted=0 
					and (useraccess='admin' 
						or useraccess='architect')) ua1
			inner join (select * 
					from ".wtw_tableprefix."buildings
					where deleted=0) b1
				on b1.buildingid = ua1.buildingid
			left join ".wtw_tableprefix."uploads u1
				on b1.snapshotid=u1.uploadid
		order by b1.buildingname, b1.buildingid;");
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$i = 0;
	$zresponse = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zauthorizedusers = array('userid'=> $zrow["userid"]);
		$snapshotdata = null;
		if (!empty($zrow["filedata"]) && isset($zrow["filedata"])) {
			$snapshotdata = "data:".$zrow["filetype"].";base64,".addslashes(base64_encode($zrow["filedata"]));
		}
		$zbuildinginfo = array(
			'buildingid' => $zrow["buildingid"],
			'buildingname' => htmlspecialchars($zrow["buildingname"], ENT_QUOTES, 'UTF-8'),
			'createdate' => $zrow["createdate"],
			'snapshotid' => $zrow["snapshotid"],
			'snapshotpath' => $zrow["filepath"],
			'analyticsid'=> $zrow["analyticsid"],
			'snapshotdata'=> $snapshotdata
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
			'buildinginfo'=> $zbuildinginfo,
			'share'=> $zshare,
			'alttag'=> $zalttag,
			'authorizedusers'=> $zauthorizedusers,
			'gravity'=> $zrow["gravity"]
		);
		$i += 1;
	}
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-buildings=".$e->getMessage());
}
?>

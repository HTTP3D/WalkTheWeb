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
	$zfilter = $wtwconnect->getVal('filter','mine');

	/* check user for global roles with access */
	$hasaccess = false;
	if ($zfilter == 'all') {
		$zroles = $wtwconnect->getUserRoles($zuserid);
		foreach ($zroles as $zrole) {
			if (strtolower($zrole['rolename']) == 'admin' || strtolower($zrole['rolename']) == 'architect' || strtolower($zrole['rolename']) == 'developer' || strtolower($zrole['rolename']) == 'graphics artist') {
				$hasaccess = true;
			}
		}
	}
	/* select buildings by userid */
	$zresults = array();
	if ($hasaccess) {
		/* user gas global access role that allows access */
		$zresults = $wtwconnect->query("
			select distinct b1.*,
				u1.filepath,
				u1.filetype,
				u1.filedata
			from (select * 
						from ".wtw_tableprefix."buildings
						where deleted=0) b1
				left join ".wtw_tableprefix."uploads u1
					on b1.snapshotid=u1.uploadid
			order by b1.buildingname, b1.buildingid;");
	} else {
		/* user will only receive data that they have granular permissions to view */
		$zresults = $wtwconnect->query("
			select distinct b1.*,
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
	}
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$i = 0;
	$zresponse = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zauthorizedusers = array('userid'=> $zrow["userid"]);
		$snapshotdata = null;
		if ((!isset($zrow["filepath"]) || empty($zrow["filepath"])) && isset($zrow["filedata"]) && !empty($zrow["filedata"])) {
			$snapshotdata = "data:".$zrow["filetype"].";base64,".addslashes(base64_encode($zrow["filedata"]));
		}
		$zbuildinginfo = array(
			'buildingid' => $zrow["buildingid"],
			'versionid' => $zrow["versionid"],
			'version' => $zrow["version"],
			'versionorder' => $zrow["versionorder"],
			'versiondesc' => $wtwconnect->escapeHTML($zrow["versiondesc"]),
			'buildingname' => $wtwconnect->escapeHTML($zrow["buildingname"]),
			'buildingdescription' => $wtwconnect->escapeHTML($zrow["buildingdescription"]),
			'snapshotid' => $zrow["snapshotid"],
			'snapshotpath' => $zrow["filepath"],
			'analyticsid'=> $zrow["analyticsid"],
			'createdate' => $zrow["createdate"],
			'createuserid' => $zrow["createuserid"],
			'updatedate' => $zrow["updatedate"],
			'updateuserid' => $zrow["updateuserid"],
			'snapshotdata'=> $snapshotdata
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
	$wtwconnect->serror("connect-buildings=".$e->getMessage());
}
?>

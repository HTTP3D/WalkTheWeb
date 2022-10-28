<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides 3D Thing information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/things.php");
	
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
	/* select things by userid */
	$zresults = array();
	if ($hasaccess) {
		/* select things based on global access */
		$zresults = $wtwconnect->query("
			select distinct t1.*,
				u1.filetype,
				u1.filepath,
				u1.filedata
			from ".wtw_tableprefix."things t1 
				left join ".wtw_tableprefix."uploads u1
					on t1.snapshotid=u1.uploadid
			 where t1.deleted=0
			order by t1.thingname,t1.thingid;");
	} else {
		/* select things based on granular user permissions */
		$zresults = $wtwconnect->query("
			select distinct t1.*,
				u1.filetype,
				u1.filepath,
				u1.filedata
			from ".wtw_tableprefix."things t1 
				inner join ".wtw_tableprefix."userauthorizations ua1
					on t1.thingid=ua1.thingid
				left join ".wtw_tableprefix."uploads u1
					on t1.snapshotid=u1.uploadid
			 where ua1.userid='".$zuserid."'
				and not ua1.thingid=''
				and t1.deleted=0
				and ua1.deleted=0
				and (ua1.useraccess='admin'
					or ua1.useraccess='architect')
			order by t1.thingname,t1.thingid;");
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
		$zthinginfo = array(
			'thingid' => $zrow["thingid"],
			'versionid' => $zrow["versionid"],
			'version' => $zrow["version"],
			'versionorder' => $zrow["versionorder"],
			'versiondesc' => $wtwconnect->escapeHTML($zrow["versiondesc"]),
			'thingname' => $wtwconnect->escapeHTML($zrow["thingname"]),
			'thingdescription' => $wtwconnect->escapeHTML($zrow["thingdescription"]),
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
			'name' => $wtwconnect->escapeHTML($zrow["alttag"])
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
	$wtwconnect->serror("connect-things.php=".$e->getMessage());
}
?>

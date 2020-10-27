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
	
	/* select building molds that have been deleted */
	$zresults = $wtwconnect->query("
		select t1.*,
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
		$zthinginfo = array(
			'thingid' => $zrow["thingid"],
			'thingname' => htmlspecialchars($zrow["thingname"], ENT_QUOTES, 'UTF-8'),
			'thingdescription' => htmlspecialchars($zrow["thingdescription"], ENT_QUOTES, 'UTF-8'),
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
			'name' => htmlspecialchars($zrow["alttag"], ENT_QUOTES, 'UTF-8')
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
	$wtwconnect->serror("connect-things.php=".$e->getMessage());
}
?>

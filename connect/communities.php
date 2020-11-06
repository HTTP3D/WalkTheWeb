<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides multiple 3D Communities information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/communities.php");

	/* select communities for user */
	$zresults = $wtwconnect->query("
		select ua1.useraccess,
			c1.communityid,
			c1.communityname,
			c1.communitydescription,
			c1.snapshotid,
			c1.analyticsid,
			c1.gravity,
			c1.templatename,
			c1.description,
			c1.tags,
			c1.textureid,
			u2.filepath as texturepath,
			c1.skydomeid,
			c1.groundpositiony,
			c1.waterpositiony,
			c1.alttag,
			c1.buildingpositionx,
			c1.buildingpositiony,
			c1.buildingpositionz,
			c1.buildingscalingx,
			c1.buildingscalingy,
			c1.buildingscalingz,
			c1.buildingrotationx,
			c1.buildingrotationy,
			c1.buildingrotationz,
			c1.createdate,
			c1.createuserid,
			c1.updatedate,
			c1.updateuserid,
			u1.filepath,
			u1.filetype,
			max(u1.filedata) as filedata
		from ".wtw_tableprefix."userauthorizations ua1
			inner join ".wtw_tableprefix."communities c1
				on ua1.communityid = c1.communityid
			left join ".wtw_tableprefix."uploads u1
				on c1.snapshotid=u1.uploadid
			left join ".wtw_tableprefix."uploads u2
				on c1.textureid=u2.uploadid
		where ua1.userid='".$wtwconnect->userid."'
		   and ua1.deleted=0
		   and c1.deleted=0
		   and (ua1.useraccess='admin'
		   or ua1.useraccess='architect')
		group by 
			ua1.useraccess,
			c1.communityid,
			c1.communityname,
			c1.communitydescription,
			c1.snapshotid,
			c1.analyticsid,
			c1.gravity,
			c1.templatename,
			c1.description,
			c1.tags,
			c1.textureid,
			u2.filepath,
			c1.skydomeid,
			c1.groundpositiony,
			c1.waterpositiony,
			c1.alttag,
			c1.buildingpositionx,
			c1.buildingpositiony,
			c1.buildingpositionz,
			c1.buildingscalingx,
			c1.buildingscalingy,
			c1.buildingscalingz,
			c1.buildingrotationx,
			c1.buildingrotationy,
			c1.buildingrotationz,
			c1.createdate,
			c1.createuserid,
			c1.updatedate,
			c1.updateuserid,
			u1.filepath,
			u1.filetype
		order by c1.communityname, 
			c1.communityid;");
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$i = 0;
	$zresponse = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zauthorizedusers = array(
			'userid'=> $wtwconnect->userid
		);
		$snapshotdata = null;
		if (!empty($zrow["filedata"]) && isset($zrow["filedata"])) {
			$snapshotdata = "data:".$zrow["filetype"].";base64,".addslashes(base64_encode($zrow["filedata"]));
		}
		$zcommunityinfo = array(
			'communityid' => $zrow["communityid"],
			'communityname' => htmlspecialchars($zrow["communityname"], ENT_QUOTES, 'UTF-8'),
			'communitydescription' => htmlspecialchars($zrow["communitydescription"], ENT_QUOTES, 'UTF-8'),
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
		$zgraphics = array(
			'texture'=> array (
				'id'=> $zrow["textureid"],
				'path'=> $zrow["texturepath"],
				'backupid'=>'',
				'backuppath'=>''
			),
			'sky'=> array (
				'id'=> $zrow["skydomeid"],
				'backupid'=>''						
			)
		);
		$zalttag = array(
			'name' => $zrow["alttag"]
		);
		$zfirstbuilding = array(
			'position' => array(
				'x'=> $zrow["buildingpositionx"], 
				'y'=> $zrow["buildingpositiony"], 
				'z'=> $zrow["buildingpositionz"]
			),
			'scaling' => array(
				'x'=> $zrow["buildingscalingx"], 
				'y'=> $zrow["buildingscalingy"], 
				'z'=> $zrow["buildingscalingz"]
			),
			'rotation' => array(
				'x'=> $zrow["buildingrotationx"], 
				'y'=> $zrow["buildingrotationy"], 
				'z'=> $zrow["buildingrotationz"]
			)
		);
		$zresponse[$i] = array(
			'communityinfo' => $zcommunityinfo,
			'share'=> $zshare,
			'graphics' => $zgraphics,
			'authorizedusers'=> $zauthorizedusers,
			'alttag'=> $zalttag,
			'firstbuilding'=> $zfirstbuilding,
			'gravity'=> $zrow["gravity"],
			'groundpositiony'=> $zrow["groundpositiony"],
			'waterpositiony'=> $zrow["waterpositiony"]
		);
		$i += 1;
	}
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-communities.php=".$e->getMessage());
}
?>

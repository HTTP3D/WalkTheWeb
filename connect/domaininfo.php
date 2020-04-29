<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides start position and scene data information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/domaininfo.php");
	
	/* get values from querystring or session */
	$zdomainname = $wtwconnect->getVal('domainname','');
	$zbuildingid = $wtwconnect->getVal('buildingid','');
	$zbuilding = $wtwconnect->getVal('building','');
	$zcommunityid = $wtwconnect->getVal('communityid','');
	$zcommunity = $wtwconnect->getVal('community','');
	$zuserid = $wtwconnect->userid;
	$zconnectinggridid = "";
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);
	
	if ((empty($zcommunityid) || !isset($zcommunityid)) && (!empty($zcommunity) && isset($zcommunity))) {
		/* select communityid for community by url segment (pubname) */
		$zresults = $wtwconnect->query("
			select communityid 
				from ".wtw_tableprefix."webaliases 
				where communitypublishname='".$zcommunity."' 
					and deleted=0 
				order by communityid desc 
				limit 1;");
		foreach ($zresults as $zrow) {
			$zcommunityid = $zrow["communityid"];
		}
	}
	if ((empty($zbuildingid) || !isset($zbuildingid)) && (!empty($zbuilding) && isset($zbuilding))) {
		/* select buildingid for community by url segment (pubname) */
		$zresults = $wtwconnect->query("
			select buildingid 
				from ".wtw_tableprefix."webaliases 
				where buildingpublishname = '".$zbuilding."' 
					and deleted=0 
				order by buildingid desc 
				limit 1;");
		foreach ($zresults as $zrow) {
			$zbuildingid = $zrow["buildingid"];
		}
	}
	if ((!empty($zcommunityid) && isset($zcommunityid)) && (!empty($zbuildingid) && isset($zbuildingid))) {
		/* select connectinggridid */
		$zresults = $wtwconnect->query("
			select connectinggridid 
				from ".wtw_tableprefix."connectinggrids 
				where parentwebid='".$zcommunityid."' 
					and childwebid='".$zbuildingid."' 
					and deleted=0 
				limit 1;");
		foreach ($zresults as $zrow) {
			$zconnectinggridid = $zrow["connectinggridid"];
		}
		if (empty($zconnectinggridid) || !isset($zconnectinggridid)) {
			$zbuildingid = "";
		}
	}
	if (empty($zcommunityid) || !isset($zcommunityid)) {
		$zcommunityid = "";
	}
	if (empty($zbuildingid) || !isset($zbuildingid)) {
		$zbuildingid = "";
	}
	$zresults = array();
	if (!empty($zcommunityid) && isset($zcommunityid) && !empty($zbuildingid) && isset($zbuildingid)) {
		/* get domain info and connecting grids by communityid and buildingid */
		$zresults = $wtwconnect->query("
			select  communities.communityid,
				case when (select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where communityid=communities.communityid 
								and deleted=0 and not communityid='') is null then ''
					else
						(select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where communityid=communities.communityid 
								and deleted=0 and not communityid='')
					end as communityaccess,
				buildings.buildingid,
				case when (select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where buildingid=buildings.buildingid 
								and deleted=0 and not buildingid='') is null then ''
					else
						(select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where buildingid=buildings.buildingid 
								and deleted=0 and not buildingid='')
					end as buildingaccess,
				buildings.positionx as positionx,
				buildings.positiony as positiony,
				buildings.positionz as positionz,
				buildings.scalingx as scalingx,
				buildings.scalingy as scalingy,
				buildings.scalingz as scalingz,
				buildings.rotationx as rotationx,
				buildings.rotationy as rotationy,
				buildings.rotationz as rotationz,
				connectinggrids.positionx as bcpositionx,
				connectinggrids.positiony as bcpositiony,
				connectinggrids.positionz as bcpositionz,
				connectinggrids.scalingx as bcscalingx,
				connectinggrids.scalingy as bcscalingy,
				connectinggrids.scalingz as bcscalingz,
				connectinggrids.rotationx as bcrotationx,
				connectinggrids.rotationy as bcrotationy,
				connectinggrids.rotationz as bcrotationz,
				communities.userid,
				communities.gravity,
				'1' as wallcollisions,
				'1' as floorcollisions,
				communities.communityname as sitename,
				buildings.buildingname,
				communities.communityname,
				communities.groundpositiony,
				communities.waterpositiony,
				communities.textureid,
				case when communities.textureid = '' then ''
					else
						(select u1.filepath 
							from ".wtw_tableprefix."uploads u2 
								left join ".wtw_tableprefix."uploads u1 
									on u2.websizeid=u1.uploadid 
							where u2.uploadid=communities.textureid limit 1)
					end as texturepath,
				communities.skydomeid,
				case when communities.skydomeid = '' then ''
					else
						(select u1.filepath 
							from ".wtw_tableprefix."uploads u2
								left join ".wtw_tableprefix."uploads u1 
									on u2.websizeid=u1.uploadid 
							where u2.uploadid=communities.skydomeid limit 1)
					end as skydomepath,
				communities.skyinclination,
				communities.skyluminance,
				communities.skyazimuth,
				communities.skyrayleigh,
				communities.skyturbidity,
				communities.skymiedirectionalg,
				communities.skymiecoefficient,
				'' as thingauthorizationid,
				bc.userauthorizationid,
				cc.userauthorizationid as communityauthorizationid,
				cc.useraccess,
				cc.invitationcode,
				ct.notificationcount
			from (select * from ".wtw_tableprefix."communities 
						where deleted=0 and communityid = '".$zcommunityid."') communities
				left join (select * from ".wtw_tableprefix."connectinggrids 
						where deleted=0 and childwebid = '".$zbuildingid."' 
							and parentwebid = '".$zcommunityid."') connectinggrids
					on communities.communityid = connectinggrids.parentwebid
				left join (select * from ".wtw_tableprefix."buildings 
						where buildings.deleted=0 
							and buildings.buildingid = '".$zbuildingid."') buildings 
					on buildings.buildingid = connectinggrids.childwebid
				left join (select userauthorizationid, buildingid 
						from ".wtw_tableprefix."userauthorizations 
						where userid='".$zuserid."' and deleted=0) bc
					on buildings.buildingid=bc.buildingid
				left join (select userauthorizationid, useraccess, invitationcode, communityid 
						from ".wtw_tableprefix."userauthorizations 
						where userid='".$zuserid."' 
							and not userid='' and deleted=0) cc
					on communities.communityid=cc.communityid
				left join (select count(userauthorizationid) as notificationcount 
						from ".wtw_tableprefix."userauthorizations 
						where invitationuserid='".$zuserid."' 
							and not userid='' and communityid='".$zcommunityid."' 
							and not communityid='' and reversenotified=1 
							and deleted=0) ct
				on 0=0;");
	} else if (!empty($zcommunityid) && isset($zcommunityid)) {
		/* get domain info and connecting grids by communityid */
		$zresults = $wtwconnect->query("
			select communities.communityid,
				case when (select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where communityid=communities.communityid 
								and deleted=0 and not communityid='') is null then ''
					else
						(select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where communityid=communities.communityid 
								and deleted=0 and not communityid='')
					end as communityaccess,
				'' as buildingid,
				'' as buildingaccess,
				communities.positionx as positionx,
				communities.positiony as positiony,
				communities.positionz as positionz,
				communities.scalingx as scalingx,
				communities.scalingy as scalingy,
				communities.scalingz as scalingz,
				communities.rotationx as rotationx,
				communities.rotationy as rotationy,
				communities.rotationz as rotationz,
				0 as bcpositionx,
				0 as bcpositiony,
				0 as bcpositionz,
				1 as bcscalingx,
				1 as bcscalingy,
				1 as bcscalingz,
				0 as bcrotationx,
				0 as bcrotationy,
				0 as bcrotationz,
				communities.userid,
				communities.gravity,
				'1' as wallcollisions,
				'1' as floorcollisions,
				communities.communityname as sitename,
				'' as buildingname,
				communities.communityname,
				communities.groundpositiony,
				communities.waterpositiony,
				communities.textureid,
				case when communities.textureid = '' then ''
					else
						(select u1.filepath 
							from ".wtw_tableprefix."uploads u2 
								left join ".wtw_tableprefix."uploads u1 
									on u2.websizeid=u1.uploadid 
							where u2.uploadid=communities.textureid limit 1)
					end as texturepath,
				communities.skydomeid,
				case when communities.skydomeid = '' then ''
					else
						(select u1.filepath 
							from ".wtw_tableprefix."uploads u2
								left join ".wtw_tableprefix."uploads u1 
									on u2.websizeid=u1.uploadid 
							where u2.uploadid=communities.skydomeid limit 1)
					end as skydomepath,
				communities.skyinclination,
				communities.skyluminance,
				communities.skyazimuth,
				communities.skyrayleigh,
				communities.skyturbidity,
				communities.skymiedirectionalg,
				communities.skymiecoefficient,
				'' as thingauthorizationid,
				'' as userauthorizationid,
				cc.userauthorizationid as communityauthorizationid,
				cc.useraccess,
				cc.invitationcode,
				ct.notificationcount
			from (select * from ".wtw_tableprefix."communities 
						where deleted=0 and communityid='".$zcommunityid."') communities
				left join (select userauthorizationid, useraccess, invitationcode, communityid 
						from ".wtw_tableprefix."userauthorizations 
						where userid='".$zuserid."' 
							and not userid='' and deleted=0) cc
					on communities.communityid=cc.communityid
				left join (select count(userauthorizationid) as notificationcount 
						from ".wtw_tableprefix."userauthorizations 
						where invitationuserid='".$zuserid."' 
							and not userid='' and communityid='".$zcommunityid."' 
							and not communityid='' and reversenotified=1 and deleted=0) ct
				on 0=0;	");	
	} else if (!empty($zbuildingid) && isset($zbuildingid)) {
		/* select domain info and connecting grids by buildingid */
		$zresults = $wtwconnect->query("
			select '' as communityid,
				'' as communityaccess,
				buildings.buildingid,
				case when (select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where buildingid=buildings.buildingid 
								and deleted=0 and not buildingid='') is null then ''
					else
						(select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where buildingid=buildings.buildingid 
								and deleted=0 and not buildingid='')
					end as buildingaccess,
				buildings.positionx as positionx,
				buildings.positiony as positiony,
				buildings.positionz as positionz,
				buildings.scalingx as scalingx,
				buildings.scalingy as scalingy,
				buildings.scalingz as scalingz,
				buildings.rotationx as rotationx,
				buildings.rotationy as rotationy,
				buildings.rotationz as rotationz,
				0 as bcpositionx,
				0 as bcpositiony,
				0 as bcpositionz,
				1 as bcscalingx,
				1 as bcscalingy,
				1 as bcscalingz,
				0 as bcrotationx,
				0 as bcrotationy,
				0 as bcrotationz,
				buildings.userid,
				buildings.gravity,
				buildings.wallcollisions,
				buildings.floorcollisions,
				buildings.buildingname as sitename,
				buildings.buildingname,
				'default' as communityname,
				0 as groundpositiony,
				-1 as waterpositiony,
				'2391f1v9om09am77' as textureid,
				'/content/system/stock/dirt-512x512.jpg' as texturepath,
				'' as skydomeid,
				'' as skydomepath,
				0 as skyinclination,
				1 as skyluminance,
				.25 as skyazimuth,
				2 as skyrayleigh,
				10 as skyturbidity,
				.8 as skymiedirectionalg,
				.005 as skymiecoefficient,
				'' as thingauthorizationid,
				bc.userauthorizationid,        
				'' as communityauthorizationid,
				bc.useraccess,
				bc.invitationcode,
				ct.notificationcount
			from (select * from ".wtw_tableprefix."buildings 
						where buildings.deleted=0 
							and buildings.buildingid='".$zbuildingid."') buildings 
				left join (select userauthorizationid, useraccess, invitationcode, buildingid 
						from ".wtw_tableprefix."userauthorizations 
						where userid='".$zuserid."' 
							and not userid='' and deleted=0) bc
					on buildings.buildingid=bc.buildingid
				left join (select count(userauthorizationid) as notificationcount 
						from ".wtw_tableprefix."userauthorizations 
						where invitationuserid='".$zuserid."' 
							and not userid='' and buildingid='".$zbuildingid."' 
							and not buildingid='' and reversenotified=1 and deleted=0) ct
					on 0=0;");
	}

	$zresponse = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zcommunityid = $zrow["communityid"];
		$zbuildingid = $zrow["buildingid"];
		$zdomaininfo = array(
			'buildingid' => $zrow["buildingid"],
			'communityid' => $zrow["communityid"],
			'sitename' => $zrow["sitename"],
			'gravity' => $zrow["gravity"],
			'userid' => $zrow["userid"],
			'wallcollisions'=> $zrow["wallcollisions"],
			'floorcollisions'=> $zrow["floorcollisions"]);
		$zbuildinginfo = array(
			'buildingid' => $zrow["buildingid"],
			'buildingname' => $zrow["buildingname"],
			'access' => $zrow["buildingaccess"]
		);	
		$zcommunityinfo = array(
			'communityid' => $zrow["communityid"],
			'communityname' => $zrow["communityname"],
			'access' => $zrow["communityaccess"],
			'textureid' => $zrow["textureid"],
			'texturepath' => $zrow["texturepath"],
			'skydomeid' => $zrow["skydomeid"],
			'skydomepath' => $zrow["skydomepath"],
			'skyinclination' => $zrow["skyinclination"],
			'skyluminance' => $zrow["skyluminance"],
			'skyazimuth' => $zrow["skyazimuth"],
			'skyrayleigh' => $zrow["skyrayleigh"],
			'skyturbidity' => $zrow["skyturbidity"],
			'skymiedirectionalg' => $zrow["skymiedirectionalg"],
			'skymiecoefficient' => $zrow["skymiecoefficient"]
		);	
		$zposition = array(
			'x' => $zrow["positionx"],
			'y' => $zrow["positiony"],
			'z' => $zrow["positionz"],
			'groundpositiony' => $zrow["groundpositiony"],
			'waterpositiony' => $zrow["waterpositiony"]
		);	
		$zscaling = array(
			'x' => $zrow["scalingx"],
			'y' => $zrow["scalingy"],
			'z' => $zrow["scalingz"]
		);	
		$zrotation = array(
			'x' => $zrow["rotationx"],
			'y' => $zrow["rotationy"],
			'z' => $zrow["rotationz"]
		);	
		$startlocation = array(
			'position' => $zposition,
			'scaling' => $zscaling,
			'rotation' => $zrotation);
		$zresponse['domaininfo'] = $zdomaininfo;
		$zresponse['buildinginfo'] = $zbuildinginfo;
		$zresponse['communityinfo'] = $zcommunityinfo;
		$zresponse['startlocation'] = $startlocation;
		$zresponse['useraccesslist'] = null; /* getaccesslist("", $zbuildingid, $zcommunityid); */
	}
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-domaininfo.php=".$e->getMessage());
}
?>

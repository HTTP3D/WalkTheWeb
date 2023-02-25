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
	$zcommunityid = $wtwconnect->getVal('communityid','');
	$zcommunity = $wtwconnect->getVal('community','');
	$zbuildingid = $wtwconnect->getVal('buildingid','');
	$zbuilding = $wtwconnect->getVal('building','');
	$zthingid = $wtwconnect->getVal('thingid','');
	$zthing = $wtwconnect->getVal('thing','');
	$zuserid = $wtwconnect->userid;
	$zconnectinggridid = "";

	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);
	
	if ((!isset($zcommunityid) || empty($zcommunityid)) && isset($zcommunity) && !empty($zcommunity)) {
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
	if ((!isset($zbuildingid) || empty($zbuildingid)) && isset($zbuilding) && !empty($zbuilding)) {
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
	if ($wtwconnect->hasValue($zcommunityid) && $wtwconnect->hasValue($zbuildingid)) {
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
		if (!isset($zconnectinggridid) || empty($zconnectinggridid)) {
			$zbuildingid = "";
		}
	}
	if (!isset($zcommunityid) || empty($zcommunityid)) {
		$zcommunityid = "";
	}
	if (!isset($zbuildingid) || empty($zbuildingid)) {
		$zbuildingid = "";
	}
	$zresults = array();
	if ($wtwconnect->hasValue($zcommunityid) && $wtwconnect->hasValue($zbuildingid)) {
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
				'' as thingid,
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
				communities.spawnactionzoneid,
				communities.gravity,
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
				communities.waterbumpheight,
				communities.watersubdivisions,
				communities.windforce,
				communities.winddirectionx,
				communities.winddirectiony,
				communities.winddirectionz,
				communities.waterwaveheight,
				communities.waterwavelength,
				communities.watercolorrefraction,
				communities.watercolorreflection,
				communities.watercolorblendfactor,
				communities.watercolorblendfactor2,
				communities.wateralpha,
				'' as thingauthorizationid
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
				;");
	} else if ($wtwconnect->hasValue($zcommunityid)) {
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
				'' as thingid,
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
				communities.spawnactionzoneid,
				communities.gravity,
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
				communities.waterbumpheight,
				communities.watersubdivisions,
				communities.windforce,
				communities.winddirectionx,
				communities.winddirectiony,
				communities.winddirectionz,
				communities.waterwaveheight,
				communities.waterwavelength,
				communities.watercolorrefraction,
				communities.watercolorreflection,
				communities.watercolorblendfactor,
				communities.watercolorblendfactor2,
				communities.wateralpha,
				'' as thingauthorizationid,
				'' as userauthorizationid
			from (select * from ".wtw_tableprefix."communities 
						where deleted=0 and communityid='".$zcommunityid."') communities;	
		");	
	} else if ($wtwconnect->hasValue($zbuildingid)) {
		/* select domain info and connecting grids by buildingid */
		$zresults = $wtwconnect->query("
			select '' as communityid,
				'' as communityaccess,
				buildings.buildingid,
				'' as thingid,
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
				buildings.spawnactionzoneid,
				buildings.gravity,
				buildings.buildingname as sitename,
				buildings.buildingname,
				'default' as communityname,
				0 as groundpositiony,
				-50 as waterpositiony,
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
				'0.60' as waterbumpheight,
				'2.00' as watersubdivisions,
				'-10.00' as windforce,
				'1.00' as winddirectionx,
				'0.00' as winddirectiony,
				'1.00' as winddirectionz,
				'0.20' as waterwaveheight,
				'0.02' as waterwavelength,
				'#23749c' as watercolorrefraction,
				'#52bcf1' as watercolorreflection,
				'0.20' as watercolorblendfactor,
				'0.20' as watercolorblendfactor2,
				'0.90' as wateralpha,
				'' as thingauthorizationid
			from (select * from ".wtw_tableprefix."buildings 
						where buildings.deleted=0 
							and buildings.buildingid='".$zbuildingid."') buildings 
		;");
	} else if ($wtwconnect->hasValue($zthingid)) {
		/* select domain info and connecting grids by thingid */
		$zresults = $wtwconnect->query("
			select '' as communityid,
				'' as communityaccess,
				'' as buildingid,
				things.thingid,
				case when (select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where thingid=things.thingid 
								and deleted=0 and not thingid='') is null then ''
					else
						(select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where thingid=things.thingid 
								and deleted=0 and not thingid='')
					end as thingaccess,
				things.positionx as positionx,
				things.positiony as positiony,
				things.positionz as positionz,
				things.scalingx as scalingx,
				things.scalingy as scalingy,
				things.scalingz as scalingz,
				things.rotationx as rotationx,
				things.rotationy as rotationy,
				things.rotationz as rotationz,
				0 as bcpositionx,
				0 as bcpositiony,
				0 as bcpositionz,
				1 as bcscalingx,
				1 as bcscalingy,
				1 as bcscalingz,
				0 as bcrotationx,
				0 as bcrotationy,
				0 as bcrotationz,
				things.userid,
				things.spawnactionzoneid,
				things.gravity,
				things.thingname as sitename,
				'' as buildingname,
				'default' as communityname,
				0 as groundpositiony,
				-50 as waterpositiony,
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
				'0.60' as waterbumpheight,
				'2.00' as watersubdivisions,
				'-10.00' as windforce,
				'1.00' as winddirectionx,
				'0.00' as winddirectiony,
				'1.00' as winddirectionz,
				'0.20' as waterwaveheight,
				'0.02' as waterwavelength,
				'#23749c' as watercolorrefraction,
				'#52bcf1' as watercolorreflection,
				'0.20' as watercolorblendfactor,
				'0.20' as watercolorblendfactor2,
				'0.90' as wateralpha,
				'' as thingauthorizationid
			from (select * from ".wtw_tableprefix."things 
						where things.deleted=0 
							and things.thingid='".$zthingid."') things 
		;");
	}

	$zazresults = array();
	$zspawnzones = array();
	if (!empty($zcommunityid)) {
		$zazresults = $wtwdb->query("
			select distinct az1.* 
			from ".wtw_tableprefix."actionzones az1 
			where (az1.communityid='".$zcommunityid."' 
				and az1.actionzonetype='spawnzone' 
				and az1.deleted=0)

			union
			select distinct az2.* 
			from ".wtw_tableprefix."actionzones az2
				inner join ".wtw_tableprefix."connectinggrids cg2
					on az2.buildingid=cg2.childwebid
					and cg2.childwebtype='building'
					and cg2.parentwebid='".$zcommunityid."'
					and cg2.parentwebtype='community'
			where (az2.actionzonetype='spawnzone' 
				and az2.deleted=0
				and cg2.deleted=0)

			union
			select distinct az3.* 
			from ".wtw_tableprefix."actionzones az3
				inner join ".wtw_tableprefix."connectinggrids cg3
					on az3.buildingid=cg3.childwebid
					and cg3.childwebtype='thing'
					and cg3.parentwebid='".$zcommunityid."'
					and cg3.parentwebtype='community'
			where (az3.actionzonetype='spawnzone' 
				and az3.deleted=0
				and cg3.deleted=0);			
		");		
	} else if (!empty($zbuildingid)) {
		$zazresults = $wtwdb->query("
			select distinct az1.* 
			from ".wtw_tableprefix."actionzones az1 
			where (az1.buildingid='".$zbuildingid."' 
				and az1.actionzonetype='spawnzone' 
				and az1.deleted=0)

			union
			select distinct az2.* 
			from ".wtw_tableprefix."actionzones az2
				inner join ".wtw_tableprefix."connectinggrids cg2
					on az2.thingid=cg2.childwebid
					and cg2.childwebtype='thing'
					and cg2.parentwebid='".$zbuildingid."'
					and cg2.parentwebtype='building'
			where (az2.actionzonetype='spawnzone' 
				and az2.deleted=0
				and cg2.deleted=0);			
		");
	} else if (!empty($zthingid)) {
		$zazresults = $wtwdb->query("
			select distinct az1.* 
			from ".wtw_tableprefix."actionzones az1 
			where (az1.thingid='".$zthingid."' 
				and az1.actionzonetype='spawnzone' 
				and az1.deleted=0);			
		");
	}
	if (count($zazresults) > 0) {
		$zspawnindex = 0;
		foreach ($zazresults as $zazrow) {
			$zspawnzones[$zspawnindex] = array(
				'actionzoneid'=>$zazrow["actionzoneid"],
				'communityid'=>$zazrow["communityid"],
				'buildingid'=>$zazrow["buildingid"],
				'thingid'=>$zazrow["thingid"],
				'loadactionzoneid'=>$zazrow["loadactionzoneid"],
				'actionzonename'=>$zazrow["actionzonename"],
				'actionzoneshape'=>$zazrow["actionzoneshape"],
				'actionzonetype'=>$zazrow["actionzonetype"],
				'positionx'=>$zazrow["positionx"],
				'positiony'=>$zazrow["positiony"],
				'positionz'=>$zazrow["positionz"],
				'scalingx'=>$zazrow["scalingx"],
				'scalingy'=>$zazrow["scalingy"],
				'scalingz'=>$zazrow["scalingz"],
				'rotationx'=>$zazrow["rotationx"],
				'rotationy'=>$zazrow["rotationy"],
				'rotationz'=>$zazrow["rotationz"]
			);
			$zspawnindex += 1;
		}
	}

	$zresponse = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zcommunityid = $zrow["communityid"];
		$zbuildingid = $zrow["buildingid"];
		$zthingid = $zrow["thingid"];
		$zdomaininfo = array(
			'communityid' => $zrow["communityid"],
			'buildingid' => $zrow["buildingid"],
			'thingid' => $zrow["thingid"],
			'sitename' => $zrow["sitename"],
			'spawnactionzoneid' => $zrow["spawnactionzoneid"],
			'gravity' => $zrow["gravity"],
			'userid' => $zrow["userid"]);
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
			'skymiecoefficient' => $zrow["skymiecoefficient"],
			'waterbumpheight' => $zrow["waterbumpheight"],
			'watersubdivisions' => $zrow["watersubdivisions"],
			'windforce' => $zrow["windforce"],
			'winddirectionx' => $zrow["winddirectionx"],
			'winddirectiony' => $zrow["winddirectiony"],
			'winddirectionz' => $zrow["winddirectionz"],
			'waterwaveheight' => $zrow["waterwaveheight"],
			'waterwavelength' => $zrow["waterwavelength"],
			'watercolorrefraction' => $zrow["watercolorrefraction"],
			'watercolorreflection' => $zrow["watercolorreflection"],
			'watercolorblendfactor' => $zrow["watercolorblendfactor"],
			'watercolorblendfactor2' => $zrow["watercolorblendfactor2"],
			'wateralpha' => $zrow["wateralpha"]
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
		$zstartlocation = array(
			'position' => $zposition,
			'scaling' => $zscaling,
			'rotation' => $zrotation);
	}
	$zresponse['domaininfo'] = $zdomaininfo;
	$zresponse['buildinginfo'] = $zbuildinginfo;
	$zresponse['communityinfo'] = $zcommunityinfo;
	$zresponse['startlocation'] = $zstartlocation;
	$zresponse['spawnzones'] = $zspawnzones;
	$zresponse['serverfranchiseid'] = '';
	$zresponse['useraccesslist'] = null; /* getaccesslist("", $zbuildingid, $zcommunityid); */
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-domaininfo.php=".$e->getMessage());
}
?>

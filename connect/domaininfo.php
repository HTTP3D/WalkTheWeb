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
			select  c1.communityid,
				case when (select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where communityid=c1.communityid 
								and deleted=0 and not communityid='') is null then ''
					else
						(select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where communityid=c1.communityid 
								and deleted=0 and not communityid='')
					end as communityaccess,
				b1.buildingid,
				'' as thingid,
				case when (select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where buildingid=b1.buildingid 
								and deleted=0 and not buildingid='') is null then ''
					else
						(select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where buildingid=b1.buildingid 
								and deleted=0 and not buildingid='')
					end as buildingaccess,
				b1.positionx as positionx,
				b1.positiony as positiony,
				b1.positionz as positionz,
				b1.scalingx as scalingx,
				b1.scalingy as scalingy,
				b1.scalingz as scalingz,
				b1.rotationx as rotationx,
				b1.rotationy as rotationy,
				b1.rotationz as rotationz,
				connectinggrids.positionx as bcpositionx,
				connectinggrids.positiony as bcpositiony,
				connectinggrids.positionz as bcpositionz,
				connectinggrids.scalingx as bcscalingx,
				connectinggrids.scalingy as bcscalingy,
				connectinggrids.scalingz as bcscalingz,
				connectinggrids.rotationx as bcrotationx,
				connectinggrids.rotationy as bcrotationy,
				connectinggrids.rotationz as bcrotationz,
				c1.userid,
				c1.spawnactionzoneid,
				c1.gravity,
				c1.communityname as sitename,
				b1.buildingname,
				c1.communityname,
				c1.groundpositiony,
				c1.waterpositiony,
				c1.textureid,
				case when c1.textureid = '' then ''
					else
						(select u1.filepath 
							from ".wtw_tableprefix."uploads u2 
								left join ".wtw_tableprefix."uploads u1 
									on u2.websizeid=u1.uploadid 
							where u2.uploadid=c1.textureid limit 1)
					end as texturepath,
				c1.skydomeid,
				case when c1.skydomeid = '' then ''
					else
						(select u1.filepath 
							from ".wtw_tableprefix."uploads u2
								left join ".wtw_tableprefix."uploads u1 
									on u2.websizeid=u1.uploadid 
							where u2.uploadid=c1.skydomeid limit 1)
					end as skydomepath,
				c1.waterbumpheight,
				c1.watersubdivisions,
				c1.windforce,
				c1.winddirectionx,
				c1.winddirectiony,
				c1.winddirectionz,
				c1.waterwaveheight,
				c1.waterwavelength,
				c1.watercolorrefraction,
				c1.watercolorreflection,
				c1.watercolorblendfactor,
				c1.watercolorblendfactor2,
				c1.wateralpha,
				c1.sceneambientcolor,
				c1.sceneclearcolor,
				c1.sceneuseclonedmeshmap,
				c1.sceneblockmaterialdirtymechanism,
				c1.scenefogenabled,
				c1.scenefogmode,
				c1.scenefogdensity,
				c1.scenefogstart,
				c1.scenefogend,
				c1.scenefogcolor,
				c1.sundirectionalintensity,
				c1.sundiffusecolor,
				c1.sunspecularcolor,
				c1.sungroundcolor,
				c1.sundirectionx,
				c1.sundirectiony,
				c1.sundirectionz,
				c1.backlightintensity,
				c1.backlightdirectionx,
				c1.backlightdirectiony,
				c1.backlightdirectionz,
				c1.backlightdiffusecolor,
				c1.backlightspecularcolor,
				c1.skytype,
				c1.skysize,
				c1.skyboxfolder,
				c1.skyboxfile,
				c1.skyboximageleft,
				c1.skyboximageup,
				c1.skyboximagefront,
				c1.skyboximageright,
				c1.skyboximagedown,
				c1.skyboximageback,
				c1.skypositionoffsetx,
				c1.skypositionoffsety,
				c1.skypositionoffsetz,
				c1.skyboxmicrosurface,
				c1.skyboxpbr,
				c1.skyboxasenvironmenttexture,
				c1.skyboxblur,
				c1.skyboxdiffusecolor,
				c1.skyboxspecularcolor,
				c1.skyboxambientcolor,
				c1.skyboxemissivecolor,
				c1.skyinclination,
				c1.skyluminance,
				c1.skyazimuth,
				c1.skyrayleigh,
				c1.skyturbidity,
				c1.skymiedirectionalg,
				c1.skymiecoefficient,
				'' as thingauthorizationid
			from (select * from ".wtw_tableprefix."communities 
						where deleted=0 and communityid = '".$zcommunityid."') c1
				left join (select * from ".wtw_tableprefix."connectinggrids 
						where deleted=0 and childwebid = '".$zbuildingid."' 
							and parentwebid = '".$zcommunityid."') connectinggrids
					on c1.communityid = connectinggrids.parentwebid
				left join (select * from ".wtw_tableprefix."buildings 
						where deleted=0 
							and buildingid = '".$zbuildingid."') b1 
					on b1.buildingid = connectinggrids.childwebid
				;");
	} else if ($wtwconnect->hasValue($zcommunityid)) {
		/* get domain info and connecting grids by communityid */
		$zresults = $wtwconnect->query("
			select c1.communityid,
				case when (select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where communityid=c1.communityid 
								and deleted=0 and not communityid='') is null then ''
					else
						(select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where communityid=c1.communityid 
								and deleted=0 and not communityid='')
					end as communityaccess,
				'' as buildingid,
				'' as thingid,
				'' as buildingaccess,
				c1.positionx as positionx,
				c1.positiony as positiony,
				c1.positionz as positionz,
				c1.scalingx as scalingx,
				c1.scalingy as scalingy,
				c1.scalingz as scalingz,
				c1.rotationx as rotationx,
				c1.rotationy as rotationy,
				c1.rotationz as rotationz,
				0 as bcpositionx,
				0 as bcpositiony,
				0 as bcpositionz,
				1 as bcscalingx,
				1 as bcscalingy,
				1 as bcscalingz,
				0 as bcrotationx,
				0 as bcrotationy,
				0 as bcrotationz,
				c1.userid,
				c1.spawnactionzoneid,
				c1.gravity,
				c1.communityname as sitename,
				'' as buildingname,
				c1.communityname,
				c1.groundpositiony,
				c1.waterpositiony,
				c1.textureid,
				case when c1.textureid = '' then ''
					else
						(select u1.filepath 
							from ".wtw_tableprefix."uploads u2 
								left join ".wtw_tableprefix."uploads u1 
									on u2.websizeid=u1.uploadid 
							where u2.uploadid=c1.textureid limit 1)
					end as texturepath,
				c1.skydomeid,
				case when c1.skydomeid = '' then ''
					else
						(select u1.filepath 
							from ".wtw_tableprefix."uploads u2
								left join ".wtw_tableprefix."uploads u1 
									on u2.websizeid=u1.uploadid 
							where u2.uploadid=c1.skydomeid limit 1)
					end as skydomepath,
				c1.waterbumpheight,
				c1.watersubdivisions,
				c1.windforce,
				c1.winddirectionx,
				c1.winddirectiony,
				c1.winddirectionz,
				c1.waterwaveheight,
				c1.waterwavelength,
				c1.watercolorrefraction,
				c1.watercolorreflection,
				c1.watercolorblendfactor,
				c1.watercolorblendfactor2,
				c1.wateralpha,
				c1.sceneambientcolor,
				c1.sceneclearcolor,
				c1.sceneuseclonedmeshmap,
				c1.sceneblockmaterialdirtymechanism,
				c1.scenefogenabled,
				c1.scenefogmode,
				c1.scenefogdensity,
				c1.scenefogstart,
				c1.scenefogend,
				c1.scenefogcolor,
				c1.sundirectionalintensity,
				c1.sundiffusecolor,
				c1.sunspecularcolor,
				c1.sungroundcolor,
				c1.sundirectionx,
				c1.sundirectiony,
				c1.sundirectionz,
				c1.backlightintensity,
				c1.backlightdirectionx,
				c1.backlightdirectiony,
				c1.backlightdirectionz,
				c1.backlightdiffusecolor,
				c1.backlightspecularcolor,
				c1.skytype,
				c1.skysize,
				c1.skyboxfolder,
				c1.skyboxfile,
				c1.skyboximageleft,
				c1.skyboximageup,
				c1.skyboximagefront,
				c1.skyboximageright,
				c1.skyboximagedown,
				c1.skyboximageback,
				c1.skypositionoffsetx,
				c1.skypositionoffsety,
				c1.skypositionoffsetz,
				c1.skyboxmicrosurface,
				c1.skyboxpbr,
				c1.skyboxasenvironmenttexture,
				c1.skyboxblur,
				c1.skyboxdiffusecolor,
				c1.skyboxspecularcolor,
				c1.skyboxambientcolor,
				c1.skyboxemissivecolor,
				c1.skyinclination,
				c1.skyluminance,
				c1.skyazimuth,
				c1.skyrayleigh,
				c1.skyturbidity,
				c1.skymiedirectionalg,
				c1.skymiecoefficient,
				'' as thingauthorizationid,
				'' as userauthorizationid
			from (select * from ".wtw_tableprefix."communities 
						where deleted=0 and communityid='".$zcommunityid."') c1;	
		");	
	} else if ($wtwconnect->hasValue($zbuildingid)) {
		/* select domain info and connecting grids by buildingid */
		$zresults = $wtwconnect->query("
			select '' as communityid,
				'' as communityaccess,
				b1.buildingid,
				'' as thingid,
				case when (select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where buildingid=b1.buildingid 
								and deleted=0 and not buildingid='') is null then ''
					else
						(select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where buildingid=b1.buildingid 
								and deleted=0 and not buildingid='')
					end as buildingaccess,
				b1.positionx as positionx,
				b1.positiony as positiony,
				b1.positionz as positionz,
				b1.scalingx as scalingx,
				b1.scalingy as scalingy,
				b1.scalingz as scalingz,
				b1.rotationx as rotationx,
				b1.rotationy as rotationy,
				b1.rotationz as rotationz,
				0 as bcpositionx,
				0 as bcpositiony,
				0 as bcpositionz,
				1 as bcscalingx,
				1 as bcscalingy,
				1 as bcscalingz,
				0 as bcrotationx,
				0 as bcrotationy,
				0 as bcrotationz,
				b1.userid,
				b1.spawnactionzoneid,
				b1.gravity,
				b1.buildingname as sitename,
				b1.buildingname,
				'default' as communityname,
				0 as groundpositiony,
				-50 as waterpositiony,
				'2391f1v9om09am77' as textureid,
				'/content/system/stock/dirt-512x512.jpg' as texturepath,
				'' as skydomeid,
				'' as skydomepath,
				.60 as waterbumpheight,
				2.00 as watersubdivisions,
				-10.00 as windforce,
				1.00 as winddirectionx,
				0.00 as winddirectiony,
				1.00 as winddirectionz,
				.20 as waterwaveheight,
				.02 as waterwavelength,
				'#23749c' as watercolorrefraction,
				'#52bcf1' as watercolorreflection,
				.20 as watercolorblendfactor,
				.20 as watercolorblendfactor2,
				.90 as wateralpha,
				'#E5E8E8' as sceneambientcolor,
				'#000000' as sceneclearcolor,
				1 as sceneuseclonedmeshmap,
				1 as sceneblockmaterialdirtymechanism,
				0 as scenefogenabled,
				'' as scenefogmode,
				0.01 as scenefogdensity,
				20 as scenefogstart,
				60 as scenefogend,
				'#c0c0c0' as scenefogcolor,
				1 as sundirectionalintensity,
				'#ffffff' as sundiffusecolor,
				'#ffffff' as sunspecularcolor,
				'#000000' as sungroundcolor,
				999 as sundirectionx,
				-999 as sundirectiony,
				999 as sundirectionz,
				0.5 as backlightintensity,
				-999 as backlightdirectionx,
				999 as backlightdirectiony,
				-999 as backlightdirectionz,
				'#ffffff' as backlightdiffusecolor,
				'#ffffff' as backlightspecularcolor,
				'' as skytype,
				5000.00 as skysize,
				'' as skyboxfolder,
				'' as skyboxfile,
				'' as skyboximageleft,
				'' as skyboximageup,
				'' as skyboximagefront,
				'' as skyboximageright,
				'' as skyboximagedown,
				'' as skyboximageback,
				0 as skypositionoffsetx,
				0 as skypositionoffsety,
				0 as skypositionoffsetz,
				0 as skyboxmicrosurface,
				0 as skyboxpbr,
				0 as skyboxasenvironmenttexture,
				0 as skyboxblur,
				'#000000' as skyboxdiffusecolor,
				'#000000' as skyboxspecularcolor,
				'#000000' as skyboxambientcolor,
				'#000000' as skyboxemissivecolor,
				0 as skyinclination,
				1 as skyluminance,
				.25 as skyazimuth,
				2 as skyrayleigh,
				10 as skyturbidity,
				.8 as skymiedirectionalg,
				.005 as skymiecoefficient,
				'' as thingauthorizationid
			from (select * from ".wtw_tableprefix."buildings 
						where deleted=0 
							and buildingid='".$zbuildingid."') b1 
		;");
	} else if ($wtwconnect->hasValue($zthingid)) {
		/* select domain info and connecting grids by thingid */
		$zresults = $wtwconnect->query("
			select '' as communityid,
				'' as communityaccess,
				'' as buildingid,
				t1.thingid,
				case when (select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where thingid=t1.thingid 
								and deleted=0 and not thingid='') is null then ''
					else
						(select GROUP_CONCAT(userid) as useraccess 
							from ".wtw_tableprefix."userauthorizations 
							where thingid=t1.thingid 
								and deleted=0 and not thingid='')
					end as thingaccess,
				t1.positionx as positionx,
				t1.positiony as positiony,
				t1.positionz as positionz,
				t1.scalingx as scalingx,
				t1.scalingy as scalingy,
				t1.scalingz as scalingz,
				t1.rotationx as rotationx,
				t1.rotationy as rotationy,
				t1.rotationz as rotationz,
				0 as bcpositionx,
				0 as bcpositiony,
				0 as bcpositionz,
				1 as bcscalingx,
				1 as bcscalingy,
				1 as bcscalingz,
				0 as bcrotationx,
				0 as bcrotationy,
				0 as bcrotationz,
				t1.userid,
				t1.spawnactionzoneid,
				t1.gravity,
				t1.thingname as sitename,
				'' as buildingname,
				'default' as communityname,
				0 as groundpositiony,
				-50 as waterpositiony,
				'2391f1v9om09am77' as textureid,
				'/content/system/stock/dirt-512x512.jpg' as texturepath,
				'' as skydomeid,
				'' as skydomepath,
				.60 as waterbumpheight,
				2.00 as watersubdivisions,
				-10.00 as windforce,
				1.00 as winddirectionx,
				0.00 as winddirectiony,
				1.00 as winddirectionz,
				.20 as waterwaveheight,
				.02 as waterwavelength,
				'#23749c' as watercolorrefraction,
				'#52bcf1' as watercolorreflection,
				.20 as watercolorblendfactor,
				.20 as watercolorblendfactor2,
				.90 as wateralpha,
				'#E5E8E8' as sceneambientcolor,
				'#000000' as sceneclearcolor,
				1 as sceneuseclonedmeshmap,
				1 as sceneblockmaterialdirtymechanism,
				0 as scenefogenabled,
				'' as scenefogmode,
				0.01 as scenefogdensity,
				20 as scenefogstart,
				60 as scenefogend,
				'#c0c0c0' as scenefogcolor,
				1 as sundirectionalintensity,
				'#ffffff' as sundiffusecolor,
				'#ffffff' as sunspecularcolor,
				'#000000' as sungroundcolor,
				999 as sundirectionx,
				-999 as sundirectiony,
				999 as sundirectionz,
				0.5 as backlightintensity,
				-999 as backlightdirectionx,
				999 as backlightdirectiony,
				-999 as backlightdirectionz,
				'#ffffff' as backlightdiffusecolor,
				'#ffffff' as backlightspecularcolor,
				'' as skytype,
				5000.00 as skysize,
				'' as skyboxfolder,
				'' as skyboxfile,
				'' as skyboximageleft,
				'' as skyboximageup,
				'' as skyboximagefront,
				'' as skyboximageright,
				'' as skyboximagedown,
				'' as skyboximageback,
				0 as skypositionoffsetx,
				0 as skypositionoffsety,
				0 as skypositionoffsetz,
				0 as skyboxmicrosurface,
				0 as skyboxpbr,
				0 as skyboxasenvironmenttexture,
				0 as skyboxblur,
				'#000000' as skyboxdiffusecolor,
				'#000000' as skyboxspecularcolor,
				'#000000' as skyboxambientcolor,
				'#000000' as skyboxemissivecolor,
				0 as skyinclination,
				1 as skyluminance,
				.25 as skyazimuth,
				2 as skyrayleigh,
				10 as skyturbidity,
				.8 as skymiedirectionalg,
				.005 as skymiecoefficient,
				'' as thingauthorizationid
			from (select * from ".wtw_tableprefix."things 
						where deleted=0 
							and thingid='".$zthingid."') t1 
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
			'wateralpha' => $zrow["wateralpha"],
			'sceneambientcolor' => $zrow["sceneambientcolor"],
			'sceneclearcolor' => $zrow["sceneclearcolor"],
			'sceneuseclonedmeshmap' => $zrow["sceneuseclonedmeshmap"],
			'sceneblockmaterialdirtymechanism' => $zrow["sceneblockmaterialdirtymechanism"],
			'sundirectionalintensity' => $zrow["sundirectionalintensity"],
			'sundiffusecolor' => $zrow["sundiffusecolor"],
			'sunspecularcolor' => $zrow["sunspecularcolor"],
			'sungroundcolor' => $zrow["sungroundcolor"],
			'sundirectionx' => $zrow["sundirectionx"],
			'sundirectiony' => $zrow["sundirectiony"],
			'sundirectionz' => $zrow["sundirectionz"],
			'backlightintensity' => $zrow["backlightintensity"],
			'backlightdirectionx' => $zrow["backlightdirectionx"],
			'backlightdirectiony' => $zrow["backlightdirectiony"],
			'backlightdirectionz' => $zrow["backlightdirectionz"],
			'backlightdiffusecolor' => $zrow["backlightdiffusecolor"],
			'backlightspecularcolor' => $zrow["backlightspecularcolor"],
			'scenefogenabled' => $zrow["scenefogenabled"],
			'scenefogmode' => $zrow["scenefogmode"],
			'scenefogdensity' => $zrow["scenefogdensity"],
			'scenefogstart' => $zrow["scenefogstart"],
			'scenefogend' => $zrow["scenefogend"],
			'scenefogcolor' => $zrow["scenefogcolor"],
			'skytype' => $zrow["skytype"],
			'skysize' => $zrow["skysize"],
			'skyboxfolder' => $zrow["skyboxfolder"],
			'skyboxfile' => $zrow["skyboxfile"],
			'skyboximageleft' => $zrow["skyboximageleft"],
			'skyboximageup' => $zrow["skyboximageup"],
			'skyboximagefront' => $zrow["skyboximagefront"],
			'skyboximageright' => $zrow["skyboximageright"],
			'skyboximagedown' => $zrow["skyboximagedown"],
			'skyboximageback' => $zrow["skyboximageback"],
			'skypositionoffsetx' => $zrow["skypositionoffsetx"],
			'skypositionoffsety' => $zrow["skypositionoffsety"],
			'skypositionoffsetz' => $zrow["skypositionoffsetz"],
			'skyboxmicrosurface' => $zrow["skyboxmicrosurface"],
			'skyboxpbr' => $zrow["skyboxpbr"],
			'skyboxasenvironmenttexture' => $zrow["skyboxasenvironmenttexture"],
			'skyboxblur' => $zrow["skyboxblur"],
			'skyboxdiffusecolor' => $zrow["skyboxdiffusecolor"],
			'skyboxspecularcolor' => $zrow["skyboxspecularcolor"],
			'skyboxambientcolor' => $zrow["skyboxambientcolor"],
			'skyboxemissivecolor' => $zrow["skyboxemissivecolor"],
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

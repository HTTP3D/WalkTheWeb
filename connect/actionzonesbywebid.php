<?php
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/actionzonesbywebid.php");

	/* get values from querystring or session */
	$zcommunityid = $wtwconnect->getVal('communityid','');
	$zbuildingid = $wtwconnect->getVal('buildingid','');
	$zthingid = $wtwconnect->getVal('thingid','');
	$zparentname = $wtwconnect->getVal('parentname','');
	$zconnectinggridid = $wtwconnect->getVal('connectinggridid','');
	$zconnectinggridind = $wtwconnect->getVal('connectinggridind','-1');

	/* select action zones related to community, building, AND thing (included nested items like things in a building where the things inherit the building load zones) */
	$zresults = $wtwconnect->query("
			select distinct 
				a1.actionzoneid,
				a1.pastactionzoneid,
				a1.communityid,
				a1.buildingid,
				a1.thingid,
				'' as buildinganalyticsid,
				c.analyticsid as communityanalyticsid,
				a1.attachmoldid,
				'' as altconnectinggridid,
				a1.loadactionzoneid,
				a1.actionzonename,
				a1.actionzonetype,
				a1.actionzoneshape,
				a1.movementtype,
				a1.positionx,
				a1.positiony,
				a1.positionz,
				a1.scalingx,
				a1.scalingy,
				a1.scalingz,
				a1.rotationx,
				a1.rotationy,
				a1.rotationz,
				a1.axispositionx,
				a1.axispositiony,
				a1.axispositionz,
				a1.axisrotationx,
				a1.axisrotationy,
				a1.axisrotationz,
				a1.rotateaxis,
				a1.rotatedegrees,
				a1.rotatedirection,
				a1.rotatespeed,
				a1.movementdistance,
				a1.parentactionzoneid,
				a1.jsfunction,
				a1.jsparameters,
				a1.createdate,
				a1.createuserid,
				a1.updatedate,
				a1.updateuserid,
				a1.deleteddate,
				a1.deleteduserid,
				a1.deleted
			from ".wtw_tableprefix."actionzones a1 
				inner join (select * 
						from ".wtw_tableprefix."actionzones 
						where communityid='".$zcommunityid."' 
							and (not communityid='') 
							and deleted=0) a2
					on a1.loadactionzoneid = a2.actionzoneid
					or a1.actionzoneid = a2.actionzoneid
				left join ".wtw_tableprefix."communities c 
					on a1.communityid=c.communityid
			where a1.deleted=0
			
			union all
			
				select distinct 
					a1.actionzoneid,
					a1.pastactionzoneid,
					a1.communityid,
					a1.buildingid,
					a1.thingid,
					b.analyticsid as buildinganalyticsid,
					'' as communityanalyticsid,
					a1.attachmoldid,
					'' as altconnectinggridid,
					a1.loadactionzoneid,
					a1.actionzonename,
					a1.actionzonetype,
					a1.actionzoneshape,
					a1.movementtype,
					a1.positionx,
					a1.positiony,
					a1.positionz,
					a1.scalingx,
					a1.scalingy,
					a1.scalingz,
					a1.rotationx,
					a1.rotationy,
					a1.rotationz,
					a1.axispositionx,
					a1.axispositiony,
					a1.axispositionz,
					a1.axisrotationx,
					a1.axisrotationy,
					a1.axisrotationz,
					a1.rotateaxis,
					a1.rotatedegrees,
					a1.rotatedirection,
					a1.rotatespeed,
					a1.movementdistance,
					a1.parentactionzoneid,
					a1.jsfunction,
					a1.jsparameters,
					a1.createdate,
					a1.createuserid,
					a1.updatedate,
					a1.updateuserid,
					a1.deleteddate,
					a1.deleteduserid,
					a1.deleted
			from ".wtw_tableprefix."actionzones a1 
				inner join (select * 
						from ".wtw_tableprefix."actionzones 
						where buildingid='".$zbuildingid."' 
							and (not buildingid='') 
							and deleted=0) a2
					on a1.loadactionzoneid = a2.actionzoneid
					or a1.actionzoneid = a2.actionzoneid
				left join ".wtw_tableprefix."buildings b 
					on a1.buildingid=b.buildingid
			where a1.deleted=0
				
			union all

				select distinct 
					a1.actionzoneid,
					a1.pastactionzoneid,
					a1.communityid,
					a1.buildingid,
					a1.thingid,
					'' as buildinganalyticsid,
					'' as communityanalyticsid,
					a1.attachmoldid,
					'' as altconnectinggridid,
					a1.loadactionzoneid,
					a1.actionzonename,
					a1.actionzonetype,
					a1.actionzoneshape,
					a1.movementtype,
					a1.positionx,
					a1.positiony,
					a1.positionz,
					a1.scalingx,
					a1.scalingy,
					a1.scalingz,
					a1.rotationx,
					a1.rotationy,
					a1.rotationz,
					a1.axispositionx,
					a1.axispositiony,
					a1.axispositionz,
					a1.axisrotationx,
					a1.axisrotationy,
					a1.axisrotationz,
					a1.rotateaxis,
					a1.rotatedegrees,
					a1.rotatedirection,
					a1.rotatespeed,
					a1.movementdistance,
					a1.parentactionzoneid,
					a1.jsfunction,
					a1.jsparameters,
					a1.createdate,
					a1.createuserid,
					a1.updatedate,
					a1.updateuserid,
					a1.deleteddate,
					a1.deleteduserid,
					a1.deleted
			from ".wtw_tableprefix."actionzones a1 
				inner join (select * 
						from ".wtw_tableprefix."actionzones 
						where thingid='".$zthingid."' 
							and (not thingid='') 
							and deleted=0) a2
				on a1.loadactionzoneid = a2.actionzoneid
				or a1.actionzoneid = a2.actionzoneid
			where a1.deleted=0
			
			union all 
			
				select distinct 
					a1.actionzoneid,
					a1.pastactionzoneid,
					a1.communityid,
					a1.buildingid,
					a1.thingid,
					'' as buildinganalyticsid,
					'' as communityanalyticsid,
					a1.attachmoldid,
					connectinggrids.connectinggridid as altconnectinggridid,
					connectinggrids.altloadactionzoneid as loadactionzoneid,
					a1.actionzonename,
					a1.actionzonetype,
					a1.actionzoneshape,
					a1.movementtype,
					a1.positionx,
					a1.positiony,
					a1.positionz,
					a1.scalingx,
					a1.scalingy,
					a1.scalingz,
					a1.rotationx,
					a1.rotationy,
					a1.rotationz,
					a1.axispositionx,
					a1.axispositiony,
					a1.axispositionz,
					a1.axisrotationx,
					a1.axisrotationy,
					a1.axisrotationz,
					a1.rotateaxis,
					a1.rotatedegrees,
					a1.rotatedirection,
					a1.rotatespeed,
					a1.movementdistance,
					a1.parentactionzoneid,
					a1.jsfunction,
					a1.jsparameters,
					a1.createdate,
					a1.createuserid,
					a1.updatedate,
					a1.updateuserid,
					a1.deleteddate,
					a1.deleteduserid,
					a1.deleted
			from (select * from ".wtw_tableprefix."connectinggrids 
						where parentwebid='".$zbuildingid."' 
							and (not parentwebid='') 
							and parentwebtype='building' 
							and childwebtype='thing' 
							and (not altloadactionzoneid='') 
							and deleted=0) connectinggrids
				inner join (select * 
						from ".wtw_tableprefix."actionzones 
						where (not actionzonetype='loadzone') 
						and deleted=0) a1
					on connectinggrids.childwebid = a1.thingid
				inner join (select * 
						from ".wtw_tableprefix."actionzones 
						where (not thingid='') 
							and deleted=0) a2
					on a1.loadactionzoneid = a2.actionzoneid
				and childwebid=a2.thingid
			where a1.deleted=0

			union all 
			
				select distinct 
					a1.actionzoneid,
					a1.pastactionzoneid,
					a1.communityid,
					a1.buildingid,
					a1.thingid,
					'' as buildinganalyticsid,
					'' as communityanalyticsid,
					a1.attachmoldid,
					connectinggrids.connectinggridid as altconnectinggridid,
					connectinggrids.altloadactionzoneid as loadactionzoneid,
					a1.actionzonename,
					a1.actionzonetype,
					a1.actionzoneshape,
					a1.movementtype,
					a1.positionx,
					a1.positiony,
					a1.positionz,
					a1.scalingx,
					a1.scalingy,
					a1.scalingz,
					a1.rotationx,
					a1.rotationy,
					a1.rotationz,
					a1.axispositionx,
					a1.axispositiony,
					a1.axispositionz,
					a1.axisrotationx,
					a1.axisrotationy,
					a1.axisrotationz,
					a1.rotateaxis,
					a1.rotatedegrees,
					a1.rotatedirection,
					a1.rotatespeed,
					a1.movementdistance,
					a1.parentactionzoneid,
					a1.jsfunction,
					a1.jsparameters,
					a1.createdate,
					a1.createuserid,
					a1.updatedate,
					a1.updateuserid,
					a1.deleteddate,
					a1.deleteduserid,
					a1.deleted
			from (select * 
					from ".wtw_tableprefix."connectinggrids 
					where parentwebid='".$zcommunityid."' 
						and (not parentwebid='') 
						and parentwebtype='community' 
						and childwebtype='thing' 
						and (not altloadactionzoneid='') 
						and deleted=0) connectinggrids
				inner join (select * 
						from ".wtw_tableprefix."actionzones 
						where (not actionzonetype='loadzone') and deleted=0) a1
					on connectinggrids.childwebid = a1.thingid
				inner join (select * 
						from ".wtw_tableprefix."actionzones 
						where (not thingid='') and deleted=0) a2
					on a1.loadactionzoneid = a2.actionzoneid
					and childwebid=a2.thingid
			where a1.deleted=0

			union all 
			
			select distinct 
					a1.actionzoneid,
					a1.pastactionzoneid,
					a1.communityid,
					a1.buildingid,
					a1.thingid,
					'' as buildinganalyticsid,
					'' as communityanalyticsid,
					a1.attachmoldid,
					connectinggrids.connectinggridid as altconnectinggridid,
					connectinggrids.altloadactionzoneid as loadactionzoneid,
					a1.actionzonename,
					a1.actionzonetype,
					a1.actionzoneshape,
					a1.movementtype,
					a1.positionx,
					a1.positiony,
					a1.positionz,
					a1.scalingx,
					a1.scalingy,
					a1.scalingz,
					a1.rotationx,
					a1.rotationy,
					a1.rotationz,
					a1.axispositionx,
					a1.axispositiony,
					a1.axispositionz,
					a1.axisrotationx,
					a1.axisrotationy,
					a1.axisrotationz,
					a1.rotateaxis,
					a1.rotatedegrees,
					a1.rotatedirection,
					a1.rotatespeed,
					a1.movementdistance,
					a1.parentactionzoneid,
					a1.jsfunction,
					a1.jsparameters,
					a1.createdate,
					a1.createuserid,
					a1.updatedate,
					a1.updateuserid,
					a1.deleteddate,
					a1.deleteduserid,
					a1.deleted
			from (select * 
					from ".wtw_tableprefix."connectinggrids 
					where parentwebid='".$zcommunityid."' 
						and (not parentwebid='') 
						and parentwebtype='community' 
						and childwebtype='building' 
						and (not altloadactionzoneid='') 
						and deleted=0) connectinggrids
				inner join (select * 
						from ".wtw_tableprefix."actionzones 
						where (not actionzonetype='loadzone') 
							and deleted=0) a1
					on connectinggrids.childwebid = a1.thingid
				inner join (select * 
						from ".wtw_tableprefix."actionzones 
						where (not thingid='') 
							and deleted=0) a2
					on a1.loadactionzoneid = a2.actionzoneid
					and childwebid=a2.thingid
			where a1.deleted=0
			
			order by 
				loadactionzoneid,actionzoneid; 
		");
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);	

	$i = 0;
	$zresponse = array();
	$zactionzones = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zactionzoneid = $zrow["actionzoneid"];
		$zactionzonetype = $zrow["actionzonetype"];
		$zavataranimations = array();
		if ($zactionzonetype == "loadanimations") {
			$j = 0;
			$zresults2 = $wtwconnect->query("
				select az.*,
					aa.requireslogin,
					aa.loadpriority,
					aa.animationname,
					aa.animationfriendlyname,
					aa.animationicon,
					aa.objectfolder,
					aa.objectfile,
					aa.startframe,
					aa.endframe,
					aa.animationloop,
					aa.speedratio,
					aa.soundid,
					aa.soundpath,
					aa.soundmaxdistance
				from ".wtw_tableprefix."actionzoneanimations az
					inner join ".wtw_tableprefix."avataranimations aa
						on az.avataranimationid=aa.avataranimationid
				where az.actionzoneid='".$zactionzoneid."'
					and az.deleted=0;");
			foreach ($zresults2 as $zrow2) {
				$zavataranimations[$j] = array(
					'actionzoneanimationid'=> $zrow2["actionzoneanimationid"],
					'avataranimationid'=> $zrow2["avataranimationid"],
					'requireslogin'=> $zrow2["requireslogin"],
					'loadpriority'=> $zrow2["loadpriority"],
					'animationname'=> $zrow2["animationname"],
					'animationfriendlyname'=> $zrow2["animationfriendlyname"],
					'animationicon'=> $zrow2["animationicon"],
					'objectfolder'=> $zrow2["objectfolder"],
					'objectfile'=> $zrow2["objectfile"],
					'startframe'=> $zrow2["startframe"],
					'endframe'=> $zrow2["endframe"],
					'animationloop'=> $zrow2["animationloop"],
					'speedratio'=> $zrow2["speedratio"],
					'soundid'=> $zrow2["soundid"],
					'soundpath'=> $zrow2["soundpath"],
					'soundmaxdistance'=> $zrow2["soundmaxdistance"]
				);
				$j += 1;
			}
		}
		
		$zscripts = array();
		$k = 0;
		/* get scripts related to community, building, or thing by action zone (loadzone) */
		$zresults3 = $wtwconnect->query("
			select *
			from ".wtw_tableprefix."scripts
			where deleted=0
				and actionzoneid='".$zactionzoneid."';");
		foreach ($zresults3 as $zrow3) {
			$zscripts[$k] = array(
				'scriptid'=> $zrow3["scriptid"],
				'scriptname'=> $zrow3["scriptname"],
				'scriptpath'=> $zrow3["scriptpath"],
				'loaded'=>'0'
			);
			$k += 1;
		}
		
		$zcommunityinfo = array(
			'communityid'=> $zrow["communityid"],
			'communityind'=> '',
			'analyticsid'=> $zrow["communityanalyticsid"]
		);
		$zbuildinginfo = array(
			'buildingid'=> $zrow["buildingid"],
			'buildingind'=> '',
			'analyticsid'=> $zrow["buildinganalyticsid"]
		);
		$zthinginfo = array(
			'thingid'=> $zrow["thingid"],
			'thingind'=> '',
			'analyticsid'=> ''
		);
		$zposition = array(
			'x'=> $zrow["positionx"], 
			'y'=> $zrow["positiony"], 
			'z'=> $zrow["positionz"]
		);
		$zscaling = array(
			'x'=> $zrow["scalingx"], 
			'y'=> $zrow["scalingy"], 
			'z'=> $zrow["scalingz"]
		);
		$zrotation = array(
			'x'=> $zrow["rotationx"], 
			'y'=> $zrow["rotationy"], 
			'z'=> $zrow["rotationz"]
		);
		$zaxis = array(
			'position'=> array(
				'x'=> $zrow["axispositionx"], 
				'y'=> $zrow["axispositiony"], 
				'z'=> $zrow["axispositionz"]),
			'rotation'=> array(
				'x'=> $zrow["axisrotationx"], 
				'y'=> $zrow["axisrotationy"], 
				'z'=> $zrow["axisrotationz"]),
			'rotateaxis'=> $zrow["rotateaxis"],
			'rotatedegrees'=> $zrow["rotatedegrees"],
			'rotatedirection'=> $zrow["rotatedirection"]
		);
		$zactionzones[$i] = array(
			'communityinfo'=> $zcommunityinfo,
			'buildinginfo'=> $zbuildinginfo,
			'thinginfo'=> $zthinginfo,
			'actionzoneid'=> $zrow["actionzoneid"], 
			'actionzoneind'=> '-1',
			'actionzonename'=> $zrow["actionzonename"], 
			'actionzonetype'=> $zrow["actionzonetype"],
			'actionzoneshape'=> $zrow["actionzoneshape"],
			'attachmoldid'=> $zrow["attachmoldid"],
			'parentactionzoneid'=> $zrow["parentactionzoneid"],
			'movementtype'=> $zrow["movementtype"],
			'rotatespeed'=> $zrow["rotatespeed"],
			'movementdistance'=> $zrow["movementdistance"],
			'position'=> $zposition,
			'scaling'=> $zscaling,
			'rotation'=> $zrotation,
			'axis'=> $zaxis,
			'loadactionzoneid'=> $zrow["loadactionzoneid"],
			'inloadactionzone'=> '0',
			'altconnectinggridid'=> $zrow["altconnectinggridid"],
			'altconnectinggridind'=> '-1',
			'connectinggridid'=> $zconnectinggridid,
			'connectinggridind'=> $zconnectinggridind,
			'avataranimations'=> $zavataranimations,
			'jsfunction'=> $zrow["jsfunction"], 
			'jsparameters'=> $zrow["jsparameters"],
			'scripts'=> $zscripts,
			'shown'=>'0',
			'status'=>'0',
			'parentname'=>$zparentname,
			'moldname'=>'');
		$i += 1;
	}
	$zresponse['actionzones'] = $zactionzones;
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-actionzonesbywebid.php=".$e->getMessage());
}
?>

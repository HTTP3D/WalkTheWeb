<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides action zone information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/actionzone.php");
	
	/* get values from querystring or session */
	$zactionzoneid = $wtwconnect->getVal('actionzoneid','');
	$zconnectinggridid = $wtwconnect->getVal('connectinggridid',''); /* identifies the map location */
	$zconnectinggridind = $wtwconnect->getVal('connectinggridind','-1'); /* allows for multiple instances of same object (example: 4 of the same chairs in a building or 2 of the same building in a community) */
	$zparentname = $wtwconnect->getVal('parentname',''); /* keeps things nested under buildings or communities and buildings nested under communities */
	
	$zresponse = array();
	$zactionzones = array();
	$zscripts = array();
	$i = 0;
	/* get scripts related to community, building, or thing by action zone (loadzone) */
	$zresults = $wtwconnect->query("
		select *
		from ".wtw_tableprefix."scripts
		where deleted=0
			and actionzoneid='".$zactionzoneid."';");
	foreach ($zresults as $zrow) {
		$zscripts[$i] = array(
			'scriptid'=> $zrow["scriptid"],
			'scriptname'=> $zrow["scriptname"],
			'scriptpath'=> $zrow["scriptpath"],
			'loaded'=>'0'
		);
		$i += 1;
	}

	/* select a single action zones related to community, building, or thing by action zone (loadzone) */
	$zresults = $wtwconnect->query("
		select a1.*,
			c1.analyticsid as communityanalyticsid,
			c1.communityname,
			c1.snapshotid as communitysnapshotid,
			case when c1.snapshotid is null then ''
				else (select filepath 
					from ".wtw_tableprefix."uploads 
					where uploadid=c1.snapshotid limit 1)
				end as communitysnapshoturl,
			b1.analyticsid as buildinganalyticsid,
			b1.buildingname,
			b1.snapshotid as buildingsnapshotid,
			case when b1.snapshotid is null then ''
				else (select filepath 
					from ".wtw_tableprefix."uploads 
					where uploadid=b1.snapshotid limit 1)
				end as buildingsnapshoturl,
			t1.analyticsid as thinganalyticsid,
			t1.thingname,
			t1.snapshotid as thingsnapshotid,
			case when t1.snapshotid is null then ''
				else (select filepath 
					from ".wtw_tableprefix."uploads 
					where uploadid=t1.snapshotid limit 1)
				end as thingsnapshoturl
		from ".wtw_tableprefix."actionzones a1
			left join ".wtw_tableprefix."communities c1
				on a1.communityid=c1.communityid
			left join ".wtw_tableprefix."buildings b1
				on a1.buildingid=b1.buildingid
			left join ".wtw_tableprefix."things t1
				on a1.thingid=t1.thingid
		where 
			a1.deleted=0
			and (c1.deleted is null
				or c1.deleted=0)
			and (b1.deleted is null
				or b1.deleted=0)
			and (t1.deleted is null
				or t1.deleted=0)
			and a1.actionzoneid='".$zactionzoneid."';");
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$i = 0;
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zactionzoneid = $zrow["actionzoneid"];
		$zactionzonetype = $zrow["actionzonetype"];
		$zavataranimations = array();
		if ($zactionzonetype == "loadanimations") {
			$j = 0;
			$zresults2 = $wtwconnect->query("
				select az.*,
					aa.avatarid,
					aa.loadpriority,
					aa.animationevent,
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
					'avatarid'=> $zrow2["avatarid"],
					'loadpriority'=> $zrow2["loadpriority"],
					'animationevent'=> $zrow2["animationevent"],
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
		
		$zcommunityinfo = array(
			'communityid'=> $zrow["communityid"],
			'communityind'=> '',
			'communityname'=> $wtwconnect->escapeHTML($zrow["communityname"]),
			'snapshotid' => $zrow["communitysnapshotid"],
			'snapshoturl' => $zrow["communitysnapshoturl"],
			'analyticsid'=> $zrow["communityanalyticsid"]
		);
		$zbuildinginfo = array(
			'buildingid'=> $zrow["buildingid"],
			'buildingind'=> '',
			'buildingname'=> $wtwconnect->escapeHTML($zrow["buildingname"]),
			'snapshotid' => $zrow["buildingsnapshotid"],
			'snapshoturl' => $zrow["buildingsnapshoturl"],
			'analyticsid'=> $zrow["buildinganalyticsid"]
		);
		$zthinginfo = array(
			'thingid'=> $zrow["thingid"],
			'thingind'=> '',
			'thingname'=> $wtwconnect->escapeHTML($zrow["thingname"]),
			'snapshotid' => $zrow["thingsnapshotid"],
			'snapshoturl' => $zrow["thingsnapshoturl"],
			'analyticsid'=> $zrow["thinganalyticsid"]
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
		$zalttag = array(
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
			'serverfranchiseid' => '',
			'actionzoneid'=> $zrow["actionzoneid"], 
			'actionzoneind'=> '-1',
			'actionzonename'=> $zrow["actionzonename"], 
			'actionzonetype'=> $zrow["actionzonetype"],
			'actionzoneshape'=> $zrow["actionzoneshape"],
			'attachmoldid'=> $zrow["attachmoldid"],
			'parentactionzoneid'=> $zrow["parentactionzoneid"],
			'teleportwebid'=> $zrow["teleportwebid"],
			'teleportwebtype'=> $zrow["teleportwebtype"],
			'spawnactionzoneid'=> $zrow["spawnactionzoneid"],
			'movementtype'=> $zrow["movementtype"],
			'rotatespeed'=> $zrow["rotatespeed"],
			'value1'=> $zrow["value1"],
			'value2'=> $zrow["value2"],
			'defaulteditform'=> $zrow["defaulteditform"],
			'movementdistance'=> $zrow["movementdistance"],
			'position'=> $zposition,
			'scaling'=> $zscaling,
			'rotation'=> $zrotation,
			'axis'=> $zaxis,
			'loadactionzoneid'=> $zrow["loadactionzoneid"],
			'inloadactionzone'=> '0',
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
	$wtwconnect->serror("connect-actionzone.php=".$e->getMessage());
}
?>

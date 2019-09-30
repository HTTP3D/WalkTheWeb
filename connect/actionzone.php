<?php
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
	
	/* select a single action zones related to community, building, or thing by action zone (loadzone) */
	$zresults = $wtwconnect->query("
		select *
		from ".wtw_tableprefix."actionzones
		where deleted=0
			and actionzoneid='".$zactionzoneid."';");
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$i = 0;
	$zresponse = array();
	$zactionzones = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zcommunityinfo = array(
			'communityid'=> $zrow["communityid"],
			'communityind'=> '',
			'analyticsid'=> ''
		);
		$zbuildinginfo = array(
			'buildingid'=> $zrow["buildingid"],
			'buildingind'=> '',
			'analyticsid'=> ''
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
			'connectinggridid'=> $zconnectinggridid,
			'connectinggridind'=> $zconnectinggridind,
			'jsfunction'=> $zrow["jsfunction"], 
			'jsparameters'=> $zrow["jsparameters"],
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

<?php
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/building.php");
	
	/* get values from querystring or session */
	$zbuildingid = $wtwconnect->getVal('buildingid','');

	/* select building data */
	$zresults = $wtwconnect->query("
		select *
		from ".wtw_tableprefix."buildings
		where buildingid='".$zbuildingid."'
		   and deleted=0;");
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$i = 0;
	$zresponse = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zauthorizedusers = array('userid'=> $zrow["userid"]);
		$zbuildinginfo = array(
			'buildingid' => $zrow["buildingid"],
			'buildingname' => htmlspecialchars($zrow["buildingname"], ENT_QUOTES, 'UTF-8'),
			'createdate' => $zrow["createdate"],
			'storeiframes'=> '',
			'storeurl'=> '',
			'wpplugin'=> '',
			'storecarturl'=> '',
			'storeproducturl'=> '',
			'storewoocommerceapiurl'=> '',
			'woocommercekey'=> '',
			'woocommercesecret'=> '',
			'snapshotid' => $zrow["snapshotid"],
			'analyticsid'=> $zrow["analyticsid"]
		);
		$zshare = array(
			'templatename' => htmlspecialchars($zrow["templatename"], ENT_QUOTES, 'UTF-8'),
			'description' => htmlspecialchars($zrow["description"], ENT_QUOTES, 'UTF-8'),
			'tags' => htmlspecialchars($zrow["tags"], ENT_QUOTES, 'UTF-8')
		);
		$zalttag = array(
			'name' => $zrow["alttag"]
		);
		$zresponse[$i] = array(
			'buildinginfo'=> $zbuildinginfo,
			'share'=> $zshare,
			'alttag'=> $zalttag,
			'authorizedusers'=> $zauthorizedusers,
			'gravity'=> $zrow["gravity"],
			'wallcollisions'=> $zrow["wallcollisions"],
			'floorcollisions'=> $zrow["floorcollisions"]
		);
		$i += 1;
	}
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-building.php=".$e->getMessage());
}
?>

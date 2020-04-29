<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides added javascripts information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/scripts.php");
	
	/* get values from querystring or session */
	$zactionzoneid = $wtwconnect->getVal('actionzoneid','');
	
	$zscripts = array();
	if ($wtwconnect->hasPermission(array("admin"))) {
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
				'scriptpath'=> $zrow["scriptpath"]
			);
			$i += 1;
		}
	}
	echo json_encode($zscripts);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-scripts.php=".$e->getMessage());
}
?>

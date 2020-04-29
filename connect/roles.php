<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides list of roles */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/roles.php");
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);
	
	$i = 0;
	$zroles = array();
	
	if ($wtwconnect->hasPermission(array("admin"))) {
		/* get user roles information */
		$zresults = $wtwconnect->query("
			select * 
			from ".wtw_tableprefix."roles
			where deleted=0
			order by rolename, roleid;");
		
		/* format json return dataset */
		foreach ($zresults as $zrow) {
			$zroles[$i] = array(
				'roleid' => $zrow["roleid"],
				'rolename' => $zrow["rolename"]
				);
			$i += 1;
		}
	}
	echo json_encode($zroles);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-roles.php=".$e->getMessage());
}
?>

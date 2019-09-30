<?php
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/users.php");
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);
	
	$i = 0;
	$zusers = array();
	
	if ($wtwconnect->hasPermission(array("admin"))) {
		/* get users information */
		$zresults = $wtwconnect->query("
			select * 
			from ".wtw_tableprefix."users
			where deleted=0
			order by username, email, userid;");
		
		/* format json return dataset */
		foreach ($zresults as $zrow) {
			$zusers[$i] = array(
				'userid' => $zrow["userid"],
				'username' => $zrow["username"],
				'uploadpathid' => $zrow["uploadpathid"],
				'userimageurl' => $zrow["userimageurl"],
				'email' => $zrow["email"],
				'createdate' => $zrow["createdate"],
				'createuserid' => $zrow["createuserid"],
				'updatedate' => $zrow["updatedate"],
				'updateuserid' => $zrow["updateuserid"],
				'deleteddate' => $zrow["deleteddate"],
				'deleteduserid' => $zrow["deleteduserid"],
				'deleted' => $zrow["deleted"],
				'roles' => $wtwconnect->getUserRoles($zrow["userid"])
				);
			$i += 1;
		}
	}
	echo json_encode($zusers);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-users.php=".$e->getMessage());
}
?>

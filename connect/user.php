<?php
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/user.php");
	
	$zuserid = $wtwconnect->getVal('userid','');

	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);
	
	$zuser = array();
	
	if ($wtwconnect->isUserInRole("admin")) {
		/* get users information */
		$zresults = $wtwconnect->query("
			select * 
			from ".wtw_tableprefix."users
			where deleted=0
				and userid='".$zuserid."'
			limit 1;");
		
		/* format json return dataset */
		foreach ($zresults as $zrow) {
			$zuser = array(
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
		}
	}
	echo json_encode($zuser);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-user.php=".$e->getMessage());
}
?>

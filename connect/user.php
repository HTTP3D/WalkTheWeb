<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides basic user information */
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
			$usertokenexists = 'false';
			if ($wtwconnect->hasValue($zrow["usertoken"])) {
				$usertokenexists = 'true';
			}
			$zuser = array(
				'userid' => $zrow["userid"],
				'uploadpathid' => $zrow["uploadpathid"],
				'userimageurl' => $zrow["userimageurl"],
				'email' => $zrow["email"],
				'displayname' => $zrow["displayname"],
				'firstname' => $zrow["firstname"],
				'lastname' => $zrow["lastname"],
				'gender' => $zrow["gender"],
				'dob' => $zrow["dob"],
				'usertoken' => $usertokenexists,
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

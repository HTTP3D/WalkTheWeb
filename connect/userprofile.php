<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides basic user information for the logged in user (by userid session variable) */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/userprofile.php");
	
	$zuserid = $wtwconnect->userid;
	$zuseravatarid = $wtwconnect->getVal('useravatarid','');

	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);
	
	$zuser = array();

	/* get users information */
	$zresults = $wtwconnect->query("
		select u1.*,
			ua1.displayname as avatardisplayname,
			ua1.gender as avatargender
		from ".wtw_tableprefix."users u1 
			left join (select * 
				from ".wtw_tableprefix."useravatars 
				where useravatarid='".$zuseravatarid."' 
					and deleted=0) ua1
			on u1.userid=ua1.userid
		where u1.deleted=0
			and u1.userid='".$zuserid."'
		limit 1;");
	
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zdob = '';
		$zdisplayname = $zrow["displayname"];
		$zgender = $zrow["gender"];
		if (isset($zrow["dob"]) && !empty($zrow["dob"])) {
			$zdob = strtotime($zrow["dob"]);
			$zdob = date("m/d/Y", $zdob);
		}
		if (isset($zrow["avatardisplayname"]) && !empty($zrow["avatardisplayname"])) {
			$zdisplayname = $zrow["avatardisplayname"];
		}
		if ((!isset($zgender) || empty($zgender)) && isset($zrow["avatargender"]) && !empty($zrow["avatargender"])) {
			$zgender = $zrow["avatargender"];
		}
		$zuser = array(
			'userid' => $zrow["userid"],
			'username' => $zrow["username"],
			'uploadpathid' => $zrow["uploadpathid"],
			'userimageurl' => $zrow["userimageurl"],
			'email' => $zrow["email"],
			'displayname' => $zdisplayname,
			'firstname' => $zrow["firstname"],
			'lastname' => $zrow["lastname"],
			'gender' => $zgender,
			'dob' => $zdob,
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
	echo json_encode($zuser);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-userprofile.php=".$e->getMessage());
}
?>

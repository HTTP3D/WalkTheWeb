<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwusers.php');
	global $wtwusers;
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);

	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zuserid = $wtwhandlers->getPost('userid','');
	$zusername = $wtwhandlers->getPost('username','');
	$zuseremail = $wtwhandlers->getPost('useremail','');
	$zpassword = $wtwhandlers->getPost('password','');
	$zavatarid = $wtwhandlers->getPost('avatarid','');
	$zinstanceid = $wtwhandlers->getPost('instanceid','');
	$zdisplayname = $wtwhandlers->getPost('displayname','');
	$zroleid = $wtwhandlers->getPost('roleid','');
	$zuserinroleid = $wtwhandlers->getPost('userinroleid','');
	$zcommunityid = $wtwhandlers->getPost('communityid','');
	$zbuildingid = $wtwhandlers->getPost('buildingid','');
	$zthingid = $wtwhandlers->getPost('thingid','');
	$zusersearch = $wtwhandlers->getPost('usersearch','');
	$zuseraccess = $wtwhandlers->getPost('useraccess','');
	
	$zresponse = array();
	switch ($zfunction) {
		case "saveuser":
			$wtwusers->saveUser($zuserid, $zusername, $zuseremail);
			break;
		case "savenewuser":	
			$wtwusers->saveNewUser($zusername, $zpassword, $zuseremail);
			break;
		case "deleteuser":
			$wtwusers->deleteUser($zuserid);
			break;
		case "login":
			$zresponse = $wtwusers->loginAttempt($zusername, $zuseremail, $zpassword);
			break;
		case "register":
			$zserror = '';
			$zresults = $wtwusers->createAccount($zusername, $zuseremail, $zpassword);
			if ($zresults->serror != "") {
				$zserror = $zresults->serror;
			} else if ($zresults->success == false) {
				$zserror = "Could not Create Account";
			}
			$zresponse = array(
				'serror'=> $zserror
			);
			break;
		case "recoverloginbyemail":
			$zloginresponse = $wtwusers->recoverLoginByEmail($zuseremail);
			$zresponse = array(
				'loginresponse'=> $zloginresponse
			);
			break;
		case "logout":
			$wtwusers->logOut();
			break;
		case "saveprofile":
			$zserror = $wtwusers->saveProfile($zavatarid, $zinstanceid, $zusername, $zdisplayname, $zuseremail);
			$zresponse = array(
				'serror'=> $zserror
			);
			break;
		case "saveuserrole":
			$wtwusers->saveUserRoleID($zuserid, $zroleid);
			break;
		case "deleteuserrole":
			$wtwusers->deleteUserRoleID($zuserid, $zuserinroleid);
			break;
		case "savepermissions":
			$zpermissions = $wtwusers->addUserPermissions($zusersearch, $zcommunityid, $zbuildingid, $zthingid, $zuseraccess);
			break;
		case "deletepermissions":
			$zpermissions = $wtwusers->deleteUserPermissions($zusersearch, $zcommunityid, $zbuildingid, $zthingid);
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-users.php=".$e->getMessage());
}
?>
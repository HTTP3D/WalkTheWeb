<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwusers.php');
	global $wtwusers;
	$zresults = file_get_contents('php://input');
	$zdata = json_decode($zresults, TRUE);

	$zfunction = null;
	$zuserid = '';
	$zusername = '';
	$zuseremail = '';
	$zpassword = '';
	$zavatarid = '';
	$zinstanceid = '';
	$zdisplayname = '';
	$zroleid = '';
	$zuserinroleid = '';
	$zcommunityid = '';
	$zbuildingid = '';
	$zthingid = '';
	$zusersearch = '';
	$zuseraccess = '';
	
	if (!empty($zdata) && isset($zdata)) {
		if (isset($zdata["function"])) {
			$zfunction = strtolower($zdata["function"]);
		}
		if (isset($zdata["userid"])) {
			$zuserid = $zdata["userid"];
		}
		if (isset($zdata["username"])) {
			$zusername = $zdata["username"];
		}
		if (isset($zdata["useremail"])) {
			$zuseremail = $zdata["useremail"];
		}
		if (isset($zdata["password"])) {
			$zpassword = $zdata["password"];
		}
		if (isset($zdata["avatarid"])) {
			$zavatarid = $zdata["avatarid"];
		}
		if (isset($zdata["instanceid"])) {
			$zinstanceid = $zdata["instanceid"];
		}
		if (isset($zdata["displayname"])) {
			$zdisplayname = $zdata["displayname"];
		}
		if (isset($zdata["roleid"])) {
			$zroleid = $zdata["roleid"];
		}
		if (isset($zdata["userinroleid"])) {
			$zuserinroleid = $zdata["userinroleid"];
		}
		if (isset($zdata["communityid"])) {
			$zcommunityid = $zdata["communityid"];
		}
		if (isset($zdata["buildingid"])) {
			$zbuildingid = $zdata["buildingid"];
		}
		if (isset($zdata["thingid"])) {
			$zthingid = $zdata["thingid"];
		}
		if (isset($zdata["usersearch"])) {
			$zusersearch = $zdata["usersearch"];
		}
		if (isset($zdata["useraccess"])) {
			$zuseraccess = $zdata["useraccess"];
		}
	}

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
			$zloginresponse = $wtwusers->loginAttempt($zusername, $zuseremail, $zpassword);
			$zresponse = array(
				'loginresponse'=> $zloginresponse
			);
			break;
		case "register":
			$zserror = '';
			$zresults = $wtwusers->createAccount($zusername, $zuseremail, $zpassword);
			if ($result->serror != "") {
				$zserror = $result->serror;
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
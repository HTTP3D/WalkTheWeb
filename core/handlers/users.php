<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for user functions */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwusers.php');
	global $wtwusers;
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);

	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zglobaluserid = $wtwhandlers->getPost('globaluserid','');
	$zuserid = $wtwhandlers->getPost('userid','');
	$zusername = $wtwhandlers->getPost('username','');
	$zuseremail = $wtwhandlers->getPost('useremail','');
	$zpassword = $wtwhandlers->getPost('password','');
	$zaccesstoken = $wtwhandlers->getPost('accesstoken','');
	$zuseravatarid = $wtwhandlers->getPost('useravatarid','');
	$zinstanceid = $wtwhandlers->getPost('instanceid','');
	$zdisplayname = $wtwhandlers->getPost('displayname','');
	$zfirstname = $wtwhandlers->getPost('firstname','');
	$zlastname = $wtwhandlers->getPost('lastname','');
	$zgender = $wtwhandlers->getPost('gender','');
	$zdob = $wtwhandlers->getPost('dob','');
	$zroleid = $wtwhandlers->getPost('roleid','');
	$zuserinroleid = $wtwhandlers->getPost('userinroleid','');
	$zcommunityid = $wtwhandlers->getPost('communityid','');
	$zbuildingid = $wtwhandlers->getPost('buildingid','');
	$zthingid = $wtwhandlers->getPost('thingid','');
	$zusersearch = $wtwhandlers->getPost('usersearch','');
	$zuseraccess = $wtwhandlers->getPost('useraccess','');
	
	/* select the function called */
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
		case "globallogin":
			$zresponse = $wtwusers->globalLogin($zusername, $zglobaluserid, $zuseremail, $zaccesstoken);
			break;
		case "register":
			$zserror = '';
			$zresults = $wtwusers->createAccount($zusername, $zuseremail, $zpassword);
			if (isset($zresults->serror)) {
				$zserror = $zresults->serror;
			}
			if (!empty($zserror)) {
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
			$wtwusers->logout();
			break;
		case "savemyprofile":
			$zserror = $wtwusers->saveMyProfile($zuserid, $zdisplayname, $zuseremail, $zfirstname, $zlastname, $zgender, $zdob);
			$zresponse = array(
				'serror'=> $zserror
			);
			break;
		case "saveprofile":
			$zserror = $wtwusers->saveProfile($zuseravatarid, $zinstanceid, $zusername, $zdisplayname, $zuseremail);
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

	/* set headers to keep data local to server */
	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	/* return the response from the function */
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-users.php=".$e->getMessage());
}
?>
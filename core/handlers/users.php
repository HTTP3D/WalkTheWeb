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
	$zuseremail = $wtwhandlers->getPost('useremail','');
	$zpassword = $wtwhandlers->getPost('password','');
	$zusertoken = $wtwhandlers->getPost('usertoken','');
	$zrolename = $wtwhandlers->getPost('rolename','');
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
			$wtwusers->saveUser($zuserid, $zdisplayname, $zuseremail);
			break;
		case "savenewuser":	
			$wtwusers->saveNewUser($zdisplayname, $zpassword, $zuseremail);
			break;
		case "deleteuser":
			$wtwusers->deleteUser($zuserid);
			break;
		case "login":
			$zresponse = $wtwusers->loginAttempt($zuseremail, $zpassword);
			break;
		case "globallogin":
			$zresponse = $wtwusers->globalLogin($zglobaluserid, $zuseremail, $zusertoken, $zdisplayname);
			break;
		case "register":
			$zresponse = $wtwusers->createAccount($zuseremail, $zpassword, $zdisplayname);
			break;
		case "checkemailvalidation":
			$zresponse = $wtwusers->checkEmailValidation($zuseremail, $zuserid);
			break;
		case "passwordrecovery":
			require_once(wtw_rootpath.'/core/functions/class_wtwtools.php');
			$zresponse = $wtwusers->passwordRecovery($zuseremail);
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
			$zserror = $wtwusers->saveProfile($zuseravatarid, $zinstanceid, $zdisplayname, $zuseremail);
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
		case "savenewrole":	
			$wtwusers->saveNewRole($zrolename);
			break;
		case "saverole":
			$wtwusers->saveRole($zroleid, $zrolename);
			break;
		case "deleterole":
			$wtwusers->deleteRole($zroleid);
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
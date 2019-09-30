<?php 
require_once('../functions/class_wtwiframes.php');
global $wtwiframes;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwiframes->trackPageView($wtwiframes->domainurl."/core/iframes/users.php");
	
	$zbval = "";
	$ziframename = "";
	$zthingid = "";
	$zbuildingid = "";
	$zcommunityid = "";
	$zpermissions = "";
	$zavatar = "";
	$zuserid = "";
	$zinviteeresponse = "";
	$zloginresponse = "";
	$zserror = "";
	if ($_SERVER['REQUEST_METHOD']=='POST') {
		require_once('../functions/class_wtwusers.php');
		global $wtwusers;
		$zbval = $_POST["wtw_bval"];
		$ziframename = $_POST["wtw_iframename"];
		$zthingid = $_POST["wtw_tthingid"];
		$zbuildingid = $_POST["wtw_tbuildingid"];
		$zcommunityid = $_POST["wtw_tcommunityid"];
		$zuserid = $_POST["wtw_tuserid"];
		switch ($zbval) { 
			case "wtw_blogin":
				$zloginresponse = $wtwusers->loginAttempt($_POST["wtw_tusername"], $_POST["wtw_tuseremail"], $_POST["wtw_tpassword"]);
				break;
			case "wtw_bregister":
				$zresults = $wtwusers->createAccount($_POST["wtw_tusername"], $_POST["wtw_tuseremail"], $_POST["wtw_tpassword"]);
				if ($result->serror != "") {
					$zserror = $result->serror;
				} else if ($zresults->success == false) {
					$zserror = "Could not Create Account";
				}
				break;
			case "wtw_bsaveprofile":
				$zserror = $wtwusers->saveProfile($_POST["wtw_tmyavatarid"], $_POST["wtw_tinstanceid"], $_POST["wtw_tusername"], $_POST["wtw_tdisplayname"], $_POST["wtw_tuseremail"]);
				break;
			case "wtw_bsaveuser":
				$wtwusers->saveUser($_POST["wtw_tuserid"], $_POST["wtw_tusername"], $_POST["wtw_tuseremail"]);
				break;
			case "wtw_bsavenewuser":
				$wtwusers->saveNewUser($_POST["wtw_tusername"], $_POST["wtw_tpassword"], $_POST["wtw_tuseremail"]);
				break;
			case "wtw_bdeleteuser":
				$wtwusers->deleteUser($_POST["wtw_tuserid"]);
				break;
			case "wtw_bsaveuserrole":
				$wtwusers->saveUserRoleID($_POST["wtw_tuserid"], $_POST["wtw_troleid"]);
				break;
			case "wtw_bdeleteuserrole":
				$wtwusers->deleteUserRoleID($_POST["wtw_tuserid"], $_POST["wtw_tuserinroleid"]);
				break;
			case "wtw_brecoverloginbyemail":
				$zloginresponse = $wtwusers->recoverLoginByEmail($_POST["wtw_tuseremail"]);
				break;
			case "wtw_bsavepermissions":
				if ($_POST["wtw_tthingid"] != "") {
					$zpermissions = $wtwusers->addUserPermissions($_POST["wtw_tadduserdevaccess"], '', '', $_POST["wtw_tthingid"], $_POST["wtw_tuseraccess"]);
				} else if ($_POST["wtw_tbuildingid"] != "") {
					$zpermissions = $wtwusers->addUserPermissions($_POST["wtw_tadduserdevaccess"], '', $_POST["wtw_tbuildingid"], '', $_POST["wtw_tuseraccess"]);
				} else {
					$zpermissions = $wtwusers->addUserPermissions($_POST["wtw_tadduserdevaccess"], $_POST["wtw_tcommunityid"], '', '', $_POST["wtw_tuseraccess"]);
				}
				break;
			case "wtw_bdeletepermissions":
				$zpermissions = $wtwusers->deleteUserPermissions($_POST["wtw_tadduserdevaccess"], $_POST["wtw_tcommunityid"], $_POST["wtw_tbuildingid"], $_POST["wtw_tthingid"]);
				break;
			case "wtw_bgetpermissions":
				$zpermissions = $wtwusers->getUserPermissions($_POST["wtw_tcommunityid"], $_POST["wtw_tbuildingid"], $_POST["wtw_tthingid"]);
				break;
			case "wtw_bgetuseraccesslist":
				//$zpermissions = json_encode(getaccesslist($_POST["wtw_tthingid"], $_POST["wtw_tbuildingid"], $_POST["wtw_tcommunityid"]));
				break;
			case "wtw_bendsession":
				$wtwusers->logOut();
				break;
		}
	}
} catch (Exception $e) {
	$wtwiframes->serror("core-iframes-users.php=".$e->getMessage());
} ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Walk the Web - Save User Permissions</title>
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <script src="/core/scripts/prime/wtw_common_iframe.js"></script>
</head>
<body>
	<form id="wtw_form1" action="users.php" method="post">
		<input type='hidden' id='wtw_iframename' name='wtw_iframename' value="<?php echo $ziframename; ?>" maxlength="64" />
		<input type='hidden' id='wtw_bval' name='wtw_bval' value="<?php echo $zbval; ?>" maxlength="64" />
		<input type="hidden" id="wtw_tcommunityid" name="wtw_tcommunityid" value="<?php echo $zcommunityid; ?>" maxlength="16" /><br />
		<input type="hidden" id="wtw_tbuildingid" name="wtw_tbuildingid" value="<?php echo $zbuildingid; ?>" maxlength="16" /><br />
		<input type="hidden" id="wtw_tthingid" name="wtw_tthingid" value="<?php echo $zthingid; ?>" maxlength="16" /><br />
		<input type="hidden" id="wtw_tauthorizationid" name="wtw_tauthorizationid" maxlength="16" /><br />
		<input type="hidden" id="wtw_tuserid" name="wtw_tuserid" maxlength="64" value="<?php echo $zuserid; ?>" /><br />
		<input type="hidden" id="wtw_tmyavatarid" name="wtw_tmyavatarid" maxlength="16" /><br />
		<input type="hidden" id="wtw_tinstanceid" name="wtw_tinstanceid" maxlength="24" /><br />
		<input type="hidden" id="wtw_tusername" name="wtw_tusername" maxlength="255" /><br />
		<input type="hidden" id="wtw_tpassword" name="wtw_tpassword" maxlength="255" /><br />
		<input type="hidden" id="wtw_tuseremail" name="wtw_tuseremail" maxlength="255" /><br />
		<input type="hidden" id="wtw_tuserimageurl" name="wtw_tuserimageurl" maxlength="255" /><br />
		<input type="hidden" id="wtw_tdisplayname" name="wtw_tdisplayname" maxlength="255" /><br />
		<input type="hidden" id="wtw_tuserinroleid" name="wtw_tuserinroleid" maxlength="16" /><br />
		<input type="hidden" id="wtw_troleid" name="wtw_troleid" maxlength="16" /><br />
		<input type="hidden" id="wtw_tadduserdevaccess" name="wtw_tadduserdevaccess" maxlength="255" /><br />
		<input type="hidden" id="wtw_tuseraccess" name="wtw_tuseraccess" maxlength="64" /><br />
		<input type="hidden" id="wtw_tinviteename" name="wtw_tinviteename" maxlength="255" /><br />
		<input type="hidden" id="wtw_tinviteeusername" name="wtw_tinviteeusername" maxlength="64" /><br />
		<input type="hidden" id="wtw_tinviteeemail" name="wtw_tinviteeemail" maxlength="255" /><br />
		<input type="hidden" id="wtw_tinvitationcode" name="wtw_tinvitationcode" maxlength="24" /><br />
		<input type="hidden" id="wtw_tinvitationbuildingid" name="wtw_tinvitationbuildingid" maxlength="16" /><br />
		<input type="hidden" id="wtw_tinviteresponse" name="wtw_tinviteresponse" /><br />
		<input type="hidden" id="wtw_tinviteeresponse" name="wtw_tinviteeresponse" value='<?php echo $zinviteeresponse; ?>' /><br />
		<input type="hidden" id="wtw_tloginresponse" name="wtw_tloginresponse" value='<?php echo $zloginresponse; ?>' /><br />
		<input type="hidden" id="wtw_tpermissions" name="wtw_tpermissions" value='<?php echo $zpermissions; ?>' /><br />
		<input type="hidden" id="wtw_tserror" name="wtw_tserror" value='<?php echo $zserror; ?>' /><br />
		<input type="hidden" id="wtw_tavatar" name="wtw_tavatar" value='<?php echo $zavatar; ?>' /><br />
		<input type="submit" id="wtw_bsaveprofile" name="wtw_bsaveprofile" value="Save Profile" onclick="WTW.buttonClick('wtw_bsaveprofile');" /><br />
		<input type="submit" id="wtw_bsaveuser" name="wtw_bsaveuser" value="Save User" onclick="WTW.buttonClick('wtw_bsaveuser');" /><br />
		<input type="submit" id="wtw_bsavenewuser" name="wtw_bsavenewuser" value="Add New User" onclick="WTW.buttonClick('wtw_bsavenewuser');" /><br />
		<input type="submit" id="wtw_bdeleteuser" name="wtw_bdeleteuser" value="Delete User" onclick="WTW.buttonClick('wtw_bdeleteuser');" /><br />
		<input type="submit" id="wtw_bendsession" name="wtw_bendsession" value="End Session" onclick="WTW.buttonClick('wtw_bendsession');" /><br />
		<input type="submit" id="wtw_blogin" name="wtw_blogin" value="Login" onclick="WTW.buttonClick('wtw_blogin');" /><br />
		<input type="submit" id="wtw_bregister" name="wtw_bregister" value="Register" onclick="WTW.buttonClick('wtw_bregister');" /><br />
		<input type="submit" id="wtw_brecoverloginbyemail" name="wtw_brecoverloginbyemail" value="Login" onclick="WTW.buttonClick('wtw_brecoverloginbyemail');" /><br />
		<input type="submit" id="wtw_bsavepermissions" name="wtw_bsavepermissions" value="Save Permissions" onclick="WTW.buttonClick('wtw_bsavepermissions');" /><br />
		<input type="submit" id="wtw_bdeletepermissions" name="wtw_bdeletepermissions" value="Delete Permissions" onclick="WTW.buttonClick('wtw_bdeletepermissions');" /><br />
		<input type="submit" id="wtw_bgetpermissions" name="wtw_bgetpermissions" value="Get Permissions" onclick="WTW.buttonClick('wtw_bgetpermissions');" /><br />
		<input type="submit" id="wtw_bgetuseraccesslist" name="wtw_bgetuseraccesslist" value="Get User Access List" onclick="WTW.buttonClick('wtw_bgetuseraccesslist');" /><br />
		<input type="submit" id="wtw_bsaveuserrole" name="wtw_bsaveuserrole" value="Save User Role" onclick="WTW.buttonClick('wtw_bsaveuserrole');" /><br />
		<input type="submit" id="wtw_bdeleteuserrole" name="wtw_bdeleteuserrole" value="Delete User Role" onclick="WTW.buttonClick('wtw_bdeleteuserrole');" /><br />
	</div>
	</form>
	<script type="text/javascript">
		function initUpdateUsers() {
			try {
				switch (dGet('wtw_bval').value) {
					case "wtw_blogin":
						parent.WTW.loginAttemptResponse(JSON.parse(dGet('wtw_tloginresponse').value));
						break;
					case "wtw_bregister":
						parent.WTW.createAccountComplete();
						break;
					case "wtw_bsaveprofile":
						parent.WTW.saveProfileComplete(dGet('wtw_tserror').value);
						break;
					case "wtw_bdeleteuser":
					case "wtw_bsavenewuser":
					case "wtw_bsaveuser":
						parent.WTW.openAllUsers();
						break;
					case "wtw_bdeleteuserrole":
					case "wtw_bsaveuserrole":
						parent.WTW.getUser(dGet('wtw_tuserid').value);
						break;
					case "wtw_brecoverloginbyemail":
						parent.WTW.recoverLoginComplete(dGet('wtw_tloginresponse').value);
						break;
					case "wtw_bdeletepermissions":
					case "wtw_bsavepermissions":
						parent.WTW.openPermissionsForm();
						break;
					case "wtw_bgetuseraccesslist":
						if (dGet('wtw_tpermissions').value.length > 0) {
							parent.WTW.updateUserAccessList(dGet('wtw_tpermissions').value, dGet('wtw_tinviteeresponse').value);
						} else {
							parent.WTW.openPermissionsForm();
						}
					case "wtw_bendsession":
						break;
				}
			} catch (ex) {
				WTW.log("iformeditusers-initUpdateUsers=" + ex.message);
			}
		}
<?php	if ($_SERVER['REQUEST_METHOD']=='POST') { ?>
		window.onload = function () {
			try {
				initUpdateUsers();
				parent.WTW.removeIFrame(dGet('wtw_iframename').value);
			} catch (ex) {
				WTW.log("iformeditusers-onload=" + ex.message);
			}
		}	
<?php 	} ?>
	</script>
</body>
</html>	
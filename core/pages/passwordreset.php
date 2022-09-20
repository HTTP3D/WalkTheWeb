<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;

	$zemail = $wtwhandlers->getVal('email', '');
	$zconfirm = $wtwhandlers->getVal('confirm', '');
	$zresponse = '0';
	$serror = '';
	
	if (!empty($zemail) && isset($zemail) && !empty($zconfirm) && isset($zconfirm)) {
		/* get user by email */
		$zresults = $wtwhandlers->query("
			select * from ".wtw_tableprefix."users
			where email like '".$zemail."'
				and recoverpassword='".$zconfirm."'
				and deleted=0
				and recoverpassworddate > now() - interval 1 day
			order by createdate
			limit 1;");
		foreach ($zresults as $zrow) {
			$zresponse = '1';
			if ($_SERVER['REQUEST_METHOD'] == 'POST') {
				$zpassword = $_POST["wtw_tnewpassword"];
				$zpassword2 = $_POST["wtw_tnewpassword2"];
				if ($zpassword == $zpassword2 && strlen($zpassword) > 7) {
					$zoptions = ['cost' => 11];
					$zpasswordhash = password_hash($zpassword, PASSWORD_DEFAULT, $zoptions);
					$wtwhandlers->query("
						update ".wtw_tableprefix."users
						set userpassword='".$zpasswordhash."',
							updatedate=now(),
							updateuserid='".$zrow["userid"]."'
						where userid='".$zrow["userid"]."'
						limit 1;
					");
				} else {
					/* try again */
					$zresponse = '2'; 
					$serror = 'Password must be strong and at least 8 characters.';
				}
			}
		}
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title><?php echo $wtwhandlers->domainname; ?> - Password Reset</title>
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
	<link rel="stylesheet" type="text/css" href="/core/styles/wtw_core.css" />
	<script>
		function WTWJS() {}
		var WTW = new WTWJS();
		var wtw_devmode = 1;
	</script>
	<script src="/core/scripts/prime/wtw_utilities.js"></script>
	<script src="/core/scripts/prime/wtw_login.js"></script>
</head>
<body style="background-color:#4d4d4d;">
<div id="wtw_div" style="text-align:center;">
	<h2 class="wtw-login"><?php echo $wtwhandlers->domainname; ?> - Password Reset</h2>
	<div style="max-width:700px;margin-left:auto;margin-right:auto;">
		<form id="form1" method="POST" action="passwordreset.php?email=<?php echo $zemail; ?>&confirm=<?php echo $zconfirm; ?>">
			<h2 class="wtw-categoryheading">
<?php 	if ($zresponse != '0') {
			if ($_SERVER['REQUEST_METHOD'] != 'POST' || $zresponse == '2') { ?>
				Enter a New Password
				<div style="clear:both;"></div>
				<div class="wtw-loginlabelwidth">&nbsp;</div>
				<div id="wtw_passwordstrengthdiv"><input type="text" id="wtw_tpasswordstrength" class="wtw-textbox" style="visibility:hidden;padding:5px;border-radius:10px;" autocomplete="" /></div><div style="clear:both;"></div>

				<div class="wtw-loginlabel">Password</div><div><input type="password" id="wtw_tnewpassword" name="wtw_tnewpassword" autocomplete="new-password" class="wtw-textbox" maxlength="256" onkeyup="WTW.checkPassword(this,'wtw_tpasswordstrength');WTW.checkPasswordConfirm('wtw_tnewpassword', 'wtw_tnewpassword2', 'wtw_registererrortext');" onfocus="WTW.registerPasswordFocus();" onblur="WTW.registerPasswordBlur();" /></div><div style="clear:both;"></div>
				<div class="wtw-loginlabel">Confirm Password</div><div><input type="password" id="wtw_tnewpassword2" name="wtw_tnewpassword2" autocomplete="new-password" class="wtw-textbox" maxlength="256" onkeyup="WTW.checkPasswordConfirm('wtw_tnewpassword', 'wtw_tnewpassword2', 'wtw_registererrortext');" /></div><div style="clear:both;"></div>

				<div id="wtw_registererrortext" class="wtw-errortext">
<?php 			if ($zresponse == '2') { 
					echo $serror;
				} ?>		
				&nbsp;</div><br />
			
				<div class="wtw-loginbutton" onclick="WTW.resetPassword();"><img src="/content/system/images/wtwlogo.png" alt="HTTP3D Inc." title="HTTP3D Inc." class="wtw-image40"/><div style="margin-top:10px;">Save New Password</div></div>
<?php 		} else { ?>		
				Your password has been reset.<br /><br />You can now return to the 3D Website to login.<br /><br />Welcome to WalkTheWeb 3D Internet!<br /><br />
				<div style="clear:both;"></div>
<?php 		} ?>
			
<?php	} else { ?>
			<div style="color:#FDFFCE">Your password could not be reset.<br /><br />The link in your email is only good for a short time.<br /><br />Please try to reset your login again on the 3D Website.<br /><br /></div>
<?php 	} ?>
			<img src="/content/system/images/HTTP3DLogo-sticker.jpg" style="width:200px;height:auto;" />
			<br /><br /></h2>
			<div class="wtw-servicelisting-invoice">
				<div style="clear:both;"></div>
				<div class="wtw-notice">
					Notice: WalkTheWeb 3D Internet is an experimental new technology. WalkTheWeb relies on numerous technologies including some that are still evolving. While we strive for perfection, some things are out of our control and may result in times when services are unavailable. We will adapt to changes as quickly as possible to provide the best service possible. Know that these services are the same services that make our own 3D Websites work. Your success is our success!
				</div>
			</div>
			<div style="clear:both;"></div>
			<input type="submit" id="wtw_submit" value="submit" style="visibility:hidden;display:none;" />
			<input type="hidden" id="useremail" value="<?php echo $zemail; ?>" />
		</form>
	</div>
	<div style="clear:both;"></div>
</div>
</body>
</html>
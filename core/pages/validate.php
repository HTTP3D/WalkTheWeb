<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;

	$zemail = $wtwhandlers->getVal('email', '');
	$zconfirm = $wtwhandlers->getVal('confirm', '');
	$zresponse = '0';
	
	if (!empty($zemail) && isset($zemail) && !empty($zconfirm) && isset($zconfirm)) {
		/* get user by email */
		$zresults = $wtwhandlers->query("
			select * 
			from ".wtw_tableprefix."users
			where email like '".$zemail."'
				and deleted=0
			order by createdate
			limit 1;");
		foreach ($zresults as $zrow) {
			if ($zrow["emailconfirm"] == $zconfirm && (empty($zrow["emailconfirmdate"]) || !isset($zrow["emailconfirmdate"]))) {
				/* confirming email */
				$wtwhandlers->query("
					update ".wtw_tableprefix."users
					set emailconfirmdate=now()
					where email like '".$zemail."'
						and emailconfirm='".$zconfirm."'
						and emailconfirmdate is null
						and deleted=0;");
				$zresponse = '1';
			} else if (!empty($zrow["emailconfirmdate"]) && isset($zrow["emailconfirmdate"])) {
				/* already confirmed */
				$zresponse = '2';
			}
		}
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title><?php echo $wtwhandlers->domainname; ?> - Validate Email</title>
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
</head>
<body style="background-color:#4d4d4d;">
<div id="wtw_div" style="text-align:center;">
	<h2 class="wtw-login"><?php echo $wtwhandlers->domainname; ?> - Validate Email</h2>
	<div style="max-width:700px;margin-left:auto;margin-right:auto;">
<?php if ($zresponse == '1') { ?>
		<h2 class="wtw-categoryheading">Your email has been validated.<br /><br />Thank you for confirming.<br /><br />You can now return to the 3D Website.<br /><br />Welcome to WalkTheWeb 3D Internet!<br /><br />
		<img src="/content/system/images/HTTP3DLogo-sticker.jpg" style="width:200px;height:auto;" />
		<br /><br /></h2>
<?php } else if ($zresponse == '2') { ?>
		<h2 class="wtw-categoryheading">Your email has already been validated.<br /><br />You can now return to the 3D Website.<br /><br />Welcome to WalkTheWeb 3D Internet!<br /><br />
		<img src="/content/system/images/HTTP3DLogo-sticker.jpg" style="width:200px;height:auto;" />
		<br /><br /></h2>
<?php } else { ?>
		<h2 class="wtw-categoryheading" style="color:#FDFFCE">Your email could not be validated.<br /><br />Please check for a more recent email confirmation<br />or try your login again on the 3D Website to resend it.<br /><br />
		<img src="/content/system/images/HTTP3DLogo-sticker.jpg" style="width:200px;height:auto;" />
		<br /><br /></h2>
<?php } ?>
		<div class="wtw-servicelisting-invoice">
			<div style="clear:both;"></div>
			<div class="wtw-notice">
				Notice: WalkTheWeb 3D Internet is an experimental new technology. WalkTheWeb relies on numerous technologies including some that are still evolving. While we strive for perfection, some things are out of our control and may result in times when services are unavailable. We will adapt to changes as quickly as possible to provide the best service possible. Know that these services are the same services that make our own 3D Websites work. Your success is our success!
			</div>
		</div>
		<div style="clear:both;"></div>
	</div>
	<div style="clear:both;"></div>
</div>

<input type="hidden" id="useremail" value="<?php echo $zemail; ?>" />
</body>
</html>
<?php
require_once('../functions/class_wtwiframes.php');
global $wtwiframes;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwiframes->trackPageView($wtwiframes->domainurl."/core/iframes/avatars.php");

	$zbval = "";
	$ziframename = "";
	$zuser = null;
	$zavatarid = "";
	$zavatar = "";
	$zavataranimations = "";
	$zuseravataranimationid = "";
	$zuseravataranimationidfield = "";
	if ($_SERVER['REQUEST_METHOD']=='POST') {
		require_once('../functions/class_wtwavatars.php');
		global $wtwavatars;
		$zbval = $_POST["wtw_bval"];
		$ziframename = $_POST["wtw_iframename"];
		$zuseravataranimationidfield = $_POST["wtw_tuseravataranimationidfield"];
		$zavatarid = $_POST["wtw_tmyavatarid"];
		switch ($zbval) {
			case "wtw_bsaveavatar":
				$zavatarid = $wtwavatars->saveAvatar($_POST["wtw_tmyavatarid"],$_POST["wtw_tinstanceid"],$_POST["wtw_tuserip"],$_POST["wtw_tavatarind"],$_POST["wtw_tobjectfolder"],$_POST["wtw_tobjectfile"],$_POST["wtw_tscalingx"],$_POST["wtw_tscalingy"],$_POST["wtw_tscalingz"]);
				break;
			case "wtw_bsaveavatarcolor":
				$wtwavatars->saveAvatarColor($_POST["wtw_tmyavatarid"],$_POST["wtw_tinstanceid"],$_POST["wtw_tavatarpart"],$_POST["wtw_temissivecolorr"],$_POST["wtw_temissivecolorg"],$_POST["wtw_temissivecolorb"]);
				break;
			case "wtw_bsaveavatardisplayname":
				$wtwavatars->saveAvatarDisplayName($_POST["wtw_tmyavatarid"],$_POST["wtw_tinstanceid"],$_POST["wtw_tavatardisplayname"]);
				break;
			case "wtw_bsaveavataranimation":
				$zuseravataranimationid = $wtwavatars->saveAvatarAnimation($_POST["wtw_tuseravataranimationid"],$_POST["wtw_tmyavatarid"],$_POST["wtw_tavataranimationid"],$_POST["wtw_tavataranimationname"],$_POST["wtw_tspeedratio"]);
				break;
			case "wtw_bgetavataranimationsall":
				$zavataranimations = $wtwavatars->getAvatarAnimationsAll($_POST["wtw_tmyavatarid"]);
				break;
			case "wtw_bdeleteavataranimation":
				$wtwavatars->deleteAvatarAnimation($_POST["wtw_tuseravataranimationid"],$_POST["wtw_tmyavatarid"],$_POST["wtw_tavataranimationid"]);
				break;
			case "wtw_bsetsession":
				$zavatar = $wtwavatars->getAvatarSession($_POST["wtw_tuserid"], $_POST["wtw_tinstanceid"], $_POST["wtw_tusername"], $_POST["wtw_tuseremail"], $_POST["wtw_tuserimageurl"], $_POST["wtw_tdisplayname"]);
				break;
			case "wtw_bgetsession":
				$zuser = $wtwavatars->getUserSession($_POST["wtw_tinstanceid"]);
				break;
		}
	}
} catch (Exception $e) {
	$wtwiframes->serror("core-iframes-avatars.php=".$e->getMessage());
} ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Walk the Web - Save Avatar</title>
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <script src="/core/scripts/prime/wtw_common_iframe.js"></script>
</head>
<body>
	<form id="wtw_form1" action="avatars.php" method="post">
		<input type='hidden' id='wtw_iframename' name='wtw_iframename' value="<?php echo $ziframename; ?>" maxlength="64" />
		<input type='hidden' id='wtw_bval' name='wtw_bval' value="<?php echo $zbval; ?>" maxlength="64" />
		<input type="hidden" id="wtw_tmyavatarid" name="wtw_tmyavatarid" maxlength="16" value="<?php echo $zavatarid; ?>" /><br />
		<input type="hidden" id="wtw_tinstanceid" name="wtw_tinstanceid" maxlength="24" /><br />
		<input type="hidden" id="wtw_tuser" name="wtw_tuser" value='<?php echo $zuser; ?>' /><br />
		<input type="hidden" id="wtw_tuserid" name="wtw_tuserid" maxlength="64" /><br />
		<input type="hidden" id="wtw_tuserip" name="wtw_tuserip" maxlength="64" /><br />
		<input type="hidden" id="wtw_tusername" name="wtw_tusername" maxlength="255" /><br />
		<input type="hidden" id="wtw_tuseremail" name="wtw_tuseremail" maxlength="255" /><br />
		<input type="hidden" id="wtw_tuserimageurl" name="wtw_tuserimageurl" maxlength="255" /><br />
		<input type="hidden" id="wtw_tdisplayname" name="wtw_tdisplayname" maxlength="255" /><br />
		<input type="hidden" id="wtw_tuseravataranimationid" name="wtw_tuseravataranimationid" value="<?php echo $zuseravataranimationid; ?>" maxlength="45" /><br />
		<input type="hidden" id="wtw_tuseravataranimationidfield" name="wtw_tuseravataranimationidfield" value="<?php echo $zuseravataranimationidfield; ?>" maxlength="255" /><br />
		<input type="hidden" id="wtw_tavataranimationid" name="wtw_tavataranimationid" maxlength="45" /><br />
		<input type="hidden" id="wtw_tavataranimationname" name="wtw_tavataranimationname" maxlength="255" /><br />
		<input type="hidden" id="wtw_tavatardisplayname" name="wtw_tavatardisplayname" maxlength="255" /><br />
		<input type="hidden" id="wtw_tavatarind" name="wtw_tavatarind" maxlength="12" /><br />
		<input type="hidden" id="wtw_tscalingx" name="wtw_tscalingx" maxlength="16" /><br />
		<input type="hidden" id="wtw_tscalingy" name="wtw_tscalingy" maxlength="16" /><br />
		<input type="hidden" id="wtw_tscalingz" name="wtw_tscalingz" maxlength="16" /><br />
		<input type="hidden" id="wtw_tobjectfolder" name="wtw_tobjectfolder" maxlength="255" /><br />
		<input type="hidden" id="wtw_tobjectfile" name="wtw_tobjectfile" maxlength="255" /><br />
		<input type="hidden" id="wtw_tavatar" name="wtw_tavatar" value='<?php echo $zavatar; ?>' /><br />
		<input type="hidden" id="wtw_tavatarpart" name="wtw_tavatarpart" maxlength="255" /><br />
		<input type="hidden" id="wtw_temissivecolorr" name="wtw_temissivecolorr" maxlength="255" /><br />
		<input type="hidden" id="wtw_temissivecolorg" name="wtw_temissivecolorg" maxlength="255" /><br />
		<input type="hidden" id="wtw_temissivecolorb" name="wtw_temissivecolorb" maxlength="255" /><br />
		<input type="hidden" id="wtw_tspeedratio" name="wtw_tspeedratio" maxlength="16" /><br />
		<input type="hidden" id="wtw_tavataranimations" name="wtw_tavataranimations" value='<?php echo $zavataranimations; ?>' /><br />
		<input type="submit" id="wtw_bgetsession" name="wtw_bgetsession" value="Get Session" onclick="WTW.buttonClick('wtw_bgetsession');" /><br />
		<input type="submit" id="wtw_bsetsession" name="wtw_bsetsession" value="Set Session" onclick="WTW.buttonClick('wtw_bsetsession');" /><br />
		<input type="submit" id="wtw_bgetavataranimationsall" name="wtw_bgetavataranimationsall" value="Get All Avatar Animations" onclick="WTW.buttonClick('wtw_bgetavataranimationsall');" /><br />
		<input type="submit" id="wtw_bsaveavatar" name="wtw_bsaveavatar" value="Save Avatar" onclick="WTW.buttonClick('wtw_bsaveavatar');" /><br />
		<input type="submit" id="wtw_bsaveavatarcolor" name="wtw_bsaveavatarcolor" value="Save Avatar Color" onclick="WTW.buttonClick('wtw_bsaveavatarcolor');" /><br />
		<input type="submit" id="wtw_bsaveavataranimation" name="wtw_bsaveavataranimation" value="Save Avatar Animation" onclick="WTW.buttonClick('wtw_bsaveavataranimation');" /><br />
		<input type="submit" id="wtw_bsaveavatardisplayname" name="wtw_bsaveavatardisplayname" value="Save Avatar Displayname" onclick="WTW.buttonClick('wtw_bsaveavatardisplayname');" /><br />
		<input type="submit" id="wtw_bdeleteavataranimation" name="wtw_bdeleteavataranimation" value="Delete Avatar Animation" onclick="WTW.buttonClick('wtw_bdeleteavataranimation');" /><br />
	</div>
	</form>
	<script type="text/javascript">
		function initavatarid() {
			try {
				switch (dGet('wtw_bval').value) {
					case "wtw_bsaveavatar":
						parent.WTW.setAvatarID(dGet('wtw_tmyavatarid').value);
						break;
					case "wtw_bgetavataranimationsall":
						parent.WTW.loadAvatarAnimationsAll(JSON.parse(dGet('wtw_tavataranimations').value));
						break;
					case "wtw_bsaveavataranimation":
						parent.WTW.reloadMyAvatar(dGet('wtw_tuseravataranimationid').value, dGet('wtw_tuseravataranimationidfield').value);
						break;
					case "wtw_bsetsession":
						break;
					case "wtw_bgetsession":
						parent.WTW.loadUserSession(JSON.parse(dGet('wtw_tuser').value));
						break;
				}
			} catch (ex) {
				WTW.log("iformeditavatar-initavatarid=" + ex.message);
			}
		}
<?php	if ($_SERVER['REQUEST_METHOD']=='POST') { ?>
		window.onload = function () {
			try {
				initavatarid();
				parent.WTW.removeIFrame(dGet('wtw_iframename').value);
			} catch (ex) {
				WTW.log("iformeditavatar-onload=" + ex.message);
			}
		}	
<?php 	} ?>
	</script>
</body>
</html>	
<?php
require_once('../functions/class_wtwiframes.php');
global $wtwiframes;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwiframes->trackPageView($wtwiframes->domainurl."/core/iframes/things.php");
	$zbval = "";
	$ziframename = "";
	$editthingid = "";
	$editthingind = "-1";
	$foundthingid = "";
	$newthing = "0";
	$zpastthingid = "";
	$zmoldgroup = "";
	$zwebid = "";
	$zcopywebid = "";
	$zthings = "";
	if ($_SERVER['REQUEST_METHOD']=='POST') {
		require_once('../functions/class_wtwthings.php');
		global $wtwthings;
		$zbval = $_POST["wtw_bval"];
		$ziframename = $_POST["wtw_iframename"];
		$editthingid = $_POST["wtw_tthingid"];
		$editthingind = $_POST["wtw_tthingind"];
		$zpastthingid = $_POST["wtw_tpastthingid"];
		$zmoldgroup = $_POST["wtw_tmoldgroup"];
		$zwebid = $_POST["wtw_twebid"];
		$zcopywebid = $_POST["wtw_tcopywebid"];
		switch ($zbval) { 
			case "wtw_bimportthing":
				$zthingid = $wtwthings->importThing($_POST["wtw_tthingid"], $_POST["wtw_tpastthingid"], $_POST["wtw_tthingname"], $_POST["wtw_tthinganalyticsid"], $_POST["wtw_tstartpositionx"], $_POST["wtw_tstartpositiony"], $_POST["wtw_tstartpositionz"], $_POST["wtw_tstartscalingx"], $_POST["wtw_tstartscalingy"], $_POST["wtw_tstartscalingz"], $_POST["wtw_tstartrotationx"], $_POST["wtw_tstartrotationy"], $_POST["wtw_tstartrotationz"], $_POST["wtw_tgravity"], $_POST["wtw_talttag"]);
				break;
			case "wtw_bsavetempthing":
				$editthingid = $wtwthings->saveTemplateThing($_POST["wtw_tpastthingid"]);
				break;
			case "wtw_bsavething":
			case "wtw_bsavenewthing": 
			case "wtw_bsavethingcopy":
				$editthingid = $wtwthings->saveThing($_POST["wtw_tthingid"], $_POST["wtw_tpastthingid"], $_POST["wtw_tthingname"], $_POST["wtw_tthinganalyticsid"], $_POST["wtw_talttag"]);
				break;
			case "wtw_bclearthing":
				$wtwthings->clearThing($_POST["wtw_tthingid"]);
				break;
			case "wtw_bdeletething":
				$wtwthings->deleteThing($_POST["wtw_tthingid"]);
				break;
			case "wtw_bsharethingtemplate":
				$wtwthings->shareThingTemplate($_POST["wtw_tthingid"], $_POST["wtw_tsharethingtempname"], $_POST["wtw_tsharethingdescription"], $_POST["wtw_tsharethingtags"]);
				break;
			case "wtw_baddmusthave":
				$zthings = $wtwthings->addMustHave();
				break;
			case "wtw_bsavestartposition":
				$wtwthings->saveThingStartPosition($_POST["wtw_tthingid"], $_POST["wtw_tstartpositionx"], $_POST["wtw_tstartpositiony"], $_POST["wtw_tstartpositionz"], $_POST["wtw_tstartscalingx"], $_POST["wtw_tstartscalingy"], $_POST["wtw_tstartscalingz"], $_POST["wtw_tstartrotationx"], $_POST["wtw_tstartrotationy"], $_POST["wtw_tstartrotationz"]);
				break;
			case "wtw_bsavegravity":
				//$wtwthings->saveThingGravity($_POST["wtw_tthingid"], $_POST["wtw_tgravity"]);
				break;
		}
	}
} catch (Exception $e) {
	$wtwiframes->serror("core-iframes-things.php=".$e->getMessage());
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Walk the Web - Save Thing</title>
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <script src="/core/scripts/prime/wtw_common_iframe.js"></script>
</head>
<body>
	<form id="wtw_form1" action="things.php" method="post">
		<input type='hidden' id='wtw_iframename' name='wtw_iframename' value="<?php echo $ziframename; ?>" maxlength="64" />
		<input type='hidden' id='wtw_bval' name='wtw_bval' value="<?php echo $zbval; ?>" maxlength="64" />
		<input type="hidden" id="wtw_tthingid" name="wtw_tthingid" value="<?php echo $editthingid; ?>" maxlength="16" /><br />
		<input type="hidden" id="wtw_tthingind" name="wtw_tthingind" value="<?php echo $editthingind; ?>" maxlength="16" /><br />
		<input type="hidden" id="wtw_tpastthingid" name="wtw_tpastthingid" value="<?php echo $zpastthingid; ?>" maxlength="16" /><br />
		<input type="hidden" id="wtw_tmoldgroup" name="wtw_tmoldgroup" value="<?php echo $zmoldgroup ?>" maxlength="16" />
		<input type="hidden" id="wtw_twebid" name="wtw_twebid" value="<?php echo $zwebid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tcopywebid" name="wtw_tcopywebid" value="<?php echo $zcopywebid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tthingname" name="wtw_tthingname" maxlength="255" /><br />
		<input type="hidden" id="wtw_tthinganalyticsid" name="wtw_tthinganalyticsid" maxlength="255" /><br />
		<input type="hidden" id="wtw_tthings" name="wtw_tthings" value="<?php echo $zthings; ?>" /><br />
		<input type="hidden" id="wtw_tsharethingtempname" name="wtw_tsharethingtempname" maxlength="255" /><br />
		<input type="hidden" id="wtw_tsharethingdescription" name="wtw_tsharethingdescription" /><br />
		<input type="hidden" id="wtw_tsharethingtags" name="wtw_tsharethingtags" maxlength="255" /><br />
		<input type="hidden" id="wtw_tfoundthingid" name="wtw_tfoundthingid" value="<?php echo $foundthingid; ?>" maxlength="16" /><br />
		<input type="hidden" id="wtw_tstartpositionx" name="wtw_tstartpositionx" maxlength="12" /><br />
		<input type="hidden" id="wtw_tstartpositiony" name="wtw_tstartpositiony" maxlength="12" /><br />
		<input type="hidden" id="wtw_tstartpositionz" name="wtw_tstartpositionz" maxlength="12" /><br />
		<input type="hidden" id="wtw_tstartscalingx" name="wtw_tstartscalingx" maxlength="12" /><br />
		<input type="hidden" id="wtw_tstartscalingy" name="wtw_tstartscalingy" maxlength="12" /><br />
		<input type="hidden" id="wtw_tstartscalingz" name="wtw_tstartscalingz" maxlength="12" /><br />
		<input type="hidden" id="wtw_tstartrotationx" name="wtw_tstartrotationx" maxlength="12" /><br />
		<input type="hidden" id="wtw_tstartrotationy" name="wtw_tstartrotationy" maxlength="12" /><br />
		<input type="hidden" id="wtw_tstartrotationz" name="wtw_tstartrotationz" maxlength="12" /><br />
		<input type="hidden" id="wtw_tgravity" name="wtw_tgravity" maxlength="8" /><br />
		<input type="hidden" id="wtw_talttag" name="wtw_talttag" maxlength="255" /><br />
		<input type="submit" id="wtw_bimportthing" name="wtw_bimportthing" value="Import Thing" onclick="WTW.buttonClick('wtw_bimportthing');" /><br />
		<input type="submit" id="wtw_bsavething" name="wtw_bsavething" value="Save Thing" onclick="WTW.buttonClick('wtw_bsavething');" /><br />
		<input type="submit" id="wtw_bsavenewthing" name="wtw_bsavenewthing" value="Save New Thing" onclick="WTW.buttonClick('wtw_bsavenewthing');" /><br />
		<input type="submit" id="wtw_bsavethingcopy" name="wtw_bsavethingcopy" value="Save Thing Copy" onclick="WTW.buttonClick('wtw_bsavethingcopy');" /><br />
		<input type="submit" id="wtw_bsavetempthing" name="wtw_bsavetempthing" value="Save Template Thing" onclick="WTW.buttonClick('wtw_bsavetempthing');" /><br />
		<input type="submit" id="wtw_bclearthing" name="wtw_bclearthing" value="Clear thing" onclick="WTW.buttonClick('wtw_bclearthing');" /><br />
		<input type="submit" id="wtw_bdeletething" name="wtw_bdeletething" value="Delete thing" onclick="WTW.buttonClick('wtw_bdeletething');" /><br />
		<input type="submit" id="wtw_bsharethingtemplate" name="wtw_bsharethingtemplate" value="Share thing Template" onclick="WTW.buttonClick('wtw_bsharethingtemplate');" /><br />
		<input type="submit" id="wtw_bsavegravity" name="wtw_bsavegravity" value="Save Gravity" onclick="WTW.buttonClick('wtw_bsavegravity');" /><br />
		<input type="submit" id="wtw_bsavestartposition" name="wtw_bsavestartposition" value="Save Start Position" onclick="WTW.buttonClick('wtw_bsavestartposition');" /><br />
		<input type="submit" id="wtw_baddmusthave" name="wtw_baddmusthave" value="Add Must Have Things" onclick="WTW.buttonClick('wtw_baddmusthave');" /><br />
	</div>		
	</form>
	<script type="text/javascript">
		function initUpdatethingid() {
			try {
				switch (dGet('wtw_bval').value) { 
					case "wtw_bimportthing":
						parent.WTW.completedThingImport(dGet('wtw_tmoldgroup').value, dGet('wtw_twebid').value, dGet('wtw_tcopywebid').value);
						break;
					case "wtw_bsavenewthing":
						parent.WTW.openNewWeb(dGet('wtw_tthingid').value,"","");
						break;
					case "wtw_bsavethingcopy":
						parent.WTW.copyThingComplete(dGet('wtw_tthingid').value);
						break;
					case "wtw_bsavetempthing":
						parent.WTW.thingSearchShowThing(dGet('wtw_tthingid').value);
						break;
					case "wtw_baddmusthave":
						parent.WTW.setUserThings(JSON.parse(dGet('wtw_tthings').value), 1);
						break;
					case "wtw_bdeletething":
						parent.WTW.redirectParent('/admin.php');
						break;
				}
			} catch (ex) {
				WTW.log("core-iframes-things.php-initUpdatethingid=" + ex.message);
			}
		}
<?php	if ($_SERVER['REQUEST_METHOD']=='POST') { ?>
		window.onload = function () {
			try {
				initUpdatethingid();
				parent.WTW.removeIFrame(dGet('wtw_iframename').value);
			} catch (ex) {
				WTW.log("core-iframes-things.php-onload=" + ex.message);
			}
		}	
<?php 	} ?>
	</script>
</body>
</html>	
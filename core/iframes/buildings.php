<?php
require_once('../functions/class_wtwiframes.php');
global $wtwiframes;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwiframes->trackPageView($wtwiframes->domainurl."/core/iframes/buildings.php");
	
	$zbval = "";
	$ziframename = "";
	$zbuildingid = "";
	$zfoundbuildingid = "";
	$zpastbuildingid = "";
	$zmoldgroup = "";
	$zwebid = "";
	$zcopywebid = "";
	if ($_SERVER['REQUEST_METHOD']=='POST') {
		require_once('../functions/class_wtwbuildings.php');
		global $wtwbuildings;
		$zbval = $_POST["wtw_bval"];
		$ziframename = $_POST["wtw_iframename"];
		$zbuildingid = $_POST["wtw_tbuildingid"];
		$zpastbuildingid = $_POST["wtw_tpastbuildingid"];
		$zmoldgroup = $_POST["wtw_tmoldgroup"];
		$zwebid = $_POST["wtw_twebid"];
		$zcopywebid = $_POST["wtw_tcopywebid"];
		switch ($zbval) {
			case "wtw_bimportbuilding":
				$zbuildingid = $wtwbuildings->importBuilding($_POST["wtw_tbuildingid"], $_POST["wtw_tpastbuildingid"], $_POST["wtw_tbuildingname"], $_POST["wtw_tbuildinganalyticsid"], $_POST["wtw_tstartpositionx"], $_POST["wtw_tstartpositiony"], $_POST["wtw_tstartpositionz"], $_POST["wtw_tstartscalingx"], $_POST["wtw_tstartscalingy"], $_POST["wtw_tstartscalingz"], $_POST["wtw_tstartrotationx"], $_POST["wtw_tstartrotationy"], $_POST["wtw_tstartrotationz"], $_POST["wtw_tgravity"], $_POST["wtw_talttag"]);
				break;
			case "wtw_bsavetempbuilding":
				$zbuildingid = $wtwbuildings->saveTemplateBuilding($_POST["wtw_tpastbuildingid"]);
				break;
			case "wtw_bsavebuilding":
			case "wtw_bsavenewbuilding":
			case "wtw_bsavebuildingcopy":
				$zbuildingid = $wtwbuildings->saveBuilding($_POST["wtw_tbuildingid"], $_POST["wtw_tpastbuildingid"], $_POST["wtw_tbuildingname"], $_POST["wtw_tbuildinganalyticsid"], $_POST["wtw_tstoreiframes"], $_POST["wtw_tstoreurl"], $_POST["wtw_twpplugin"], $_POST["wtw_tstorecarturl"], $_POST["wtw_tstoreproducturl"], $_POST["wtw_tstorewoocommerceapiurl"], $_POST["wtw_tstorewoocommercekey"], $_POST["wtw_tstorewoocommercesecret"], $_POST["wtw_talttag"], 0);
				break;
			case "wtw_bclearbuilding":
				$wtwbuildings->clearBuilding($_POST["wtw_tbuildingid"]);
				break;
			case "wtw_bdeletebuilding":
				$wtwbuildings->deleteBuilding($_POST["wtw_tbuildingid"]);
				break;
			case "wtw_bsharebuildingtemplate":
				$wtwbuildings->shareBuildingTemplate($_POST["wtw_tbuildingid"], $_POST["wtw_tsharebuildtempname"], $_POST["wtw_tsharebuilddescription"], $_POST["wtw_tsharebuildtags"]);
				break;
			case "wtw_bsavestartposition":
				$wtwbuildings->saveBuildingStartPosition($_POST["wtw_tbuildingid"], $_POST["wtw_tstartpositionx"], $_POST["wtw_tstartpositiony"], $_POST["wtw_tstartpositionz"], $_POST["wtw_tstartscalingx"], $_POST["wtw_tstartscalingy"], $_POST["wtw_tstartscalingz"], $_POST["wtw_tstartrotationx"], $_POST["wtw_tstartrotationy"], $_POST["wtw_tstartrotationz"]);
				break;
			case "wtw_bsavegravity":
				$wtwbuildings->saveBuildingGravity($_POST["wtw_tbuildingid"], $_POST["wtw_tgravity"]);
				break;
		}
	}
} catch (Exception $e) {
	$wtwiframes->serror("core-iframes-buildings.php=".$e->getMessage());
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Walk the Web - Save Building</title>
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <script src="/core/scripts/prime/wtw_common_iframe.js"></script>
</head>
<body>
	<form id="wtw_form1" action="buildings.php" method="post">
		<input type='hidden' id='wtw_iframename' name='wtw_iframename' value="<?php echo $ziframename; ?>" maxlength="64" />
		<input type='hidden' id='wtw_bval' name='wtw_bval' value="<?php echo $zbval ?>" maxlength="64" />
		<input type="hidden" id="wtw_tbuildingid" name="wtw_tbuildingid" value="<?php echo $zbuildingid; ?>" maxlength="16" /><br />
		<input type="hidden" id="wtw_tpastbuildingid" name="wtw_tpastbuildingid" value="<?php echo $zpastbuildingid; ?>" maxlength="16" /><br />
		<input type="hidden" id="wtw_tmoldgroup" name="wtw_tmoldgroup" value="<?php echo $zmoldgroup ?>" maxlength="16" />
		<input type="hidden" id="wtw_twebid" name="wtw_twebid" value="<?php echo $zwebid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tcopywebid" name="wtw_tcopywebid" value="<?php echo $zcopywebid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tbuildingname" name="wtw_tbuildingname" maxlength="255" /><br />
		<input type="hidden" id="wtw_tbuildinganalyticsid" name="wtw_tbuildinganalyticsid" maxlength="255" /><br />
		<input type="hidden" id="wtw_tstoreiframes" name="wtw_tstoreiframes" maxlength="1" /><br />
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
		<input type="hidden" id="wtw_tsharebuildtempname" name="wtw_tsharebuildtempname" maxlength="255" /><br />
		<input type="hidden" id="wtw_tsharebuilddescription" name="wtw_tsharebuilddescription" /><br />
		<input type="hidden" id="wtw_tsharebuildtags" name="wtw_tsharebuildtags" /><br />
		<input type="hidden" id="wtw_teditfoundbuildingid" name="wtw_teditfoundbuildingid" value="<?php echo $zfoundbuildingid; ?>" maxlength="16" /><br />
		<input type="hidden" id="wtw_tstoreurl" name="wtw_tstoreurl" maxlength="255" /><br />
		<input type="hidden" id="wtw_twpplugin" name="wtw_twpplugin" maxlength="255" /><br />
		<input type="hidden" id="wtw_tstorecarturl" name="wtw_tstorecarturl" maxlength="255" /><br />
		<input type="hidden" id="wtw_tstoreproducturl" name="wtw_tstoreproducturl" maxlength="255" /><br />
		<input type="hidden" id="wtw_tstorewoocommerceapiurl" name="wtw_tstorewoocommerceapiurl" maxlength="255" /><br />
		<input type="hidden" id="wtw_tstorewoocommercekey" name="wtw_tstorewoocommercekey" maxlength="255" /><br />
		<input type="hidden" id="wtw_tstorewoocommercesecret" name="wtw_tstorewoocommercesecret" maxlength="255" /><br />
		<input type="submit" id="wtw_bimportbuilding" name="wtw_bimportbuilding" value="Import Building" onclick="WTW.buttonClick('wtw_bimportbuilding');" /><br />
		<input type="submit" id="wtw_bsavebuilding" name="wtw_bsavebuilding" value="Save Building" onclick="WTW.buttonClick('wtw_bsavebuilding');" /><br />
		<input type="submit" id="wtw_bsavenewbuilding" name="wtw_bsavenewbuilding" value="Save New Building" onclick="WTW.buttonClick('wtw_bsavenewbuilding');" /><br />
		<input type="submit" id="wtw_bsavebuildingcopy" name="wtw_bsavebuildingcopy" value="Save Building Copy" onclick="WTW.buttonClick('wtw_bsavebuildingcopy');" /><br />
		<input type="submit" id="wtw_bsavetempbuilding" name="wtw_bsavetempbuilding" value="Save Template Building" onclick="WTW.buttonClick('wtw_bsavetempbuilding');" /><br />
		<input type="submit" id="wtw_bclearbuilding" name="wtw_bclearbuilding" value="Clear Building" onclick="WTW.buttonClick('wtw_bclearbuilding');" /><br />
		<input type="submit" id="wtw_bdeletebuilding" name="wtw_bdeletebuilding" value="Delete Building" onclick="WTW.buttonClick('wtw_bdeletebuilding');" /><br />
		<input type="submit" id="wtw_bsharebuildingtemplate" name="wtw_bsharebuildingtemplate" value="Share Building Template" onclick="WTW.buttonClick('wtw_bsharebuildingtemplate');" /><br />
		<input type="submit" id="wtw_bsavegravity" name="wtw_bsavegravity" value="Save Gravity" onclick="WTW.buttonClick('wtw_bsavegravity');" /><br />
		<input type="submit" id="wtw_bsavestartposition" name="wtw_bsavestartposition" value="Save Start Position" onclick="WTW.buttonClick('wtw_bsavestartposition');" /><br />
	</div>
	</form>
	<script type="text/javascript">
		function initUpdateBuildingid() {
			try {
				switch (dGet('wtw_bval').value) {
					case "wtw_bimportbuilding":
						parent.WTW.completedBuildingImport(dGet('wtw_tmoldgroup').value, dGet('wtw_twebid').value, dGet('wtw_tcopywebid').value);
						break;
					case "wtw_bsavenewbuilding":
						parent.WTW.openNewWeb("",dGet('wtw_tbuildingid').value,"");
						break;
					case "wtw_bsavebuildingcopy":
						parent.WTW.copyBuildingComplete(dGet('wtw_tbuildingid').value);
						break;
					case "wtw_bsavetempbuilding":
						parent.WTW.buildingSearchShowBuilding(dGet('wtw_tbuildingid').value);
						break;
					case "wtw_bdeletebuilding":
						parent.WTW.redirectParent('/admin.php');
						break;
				}
			} catch (ex) {
				WTW.log("core-iframes-buildings.php-initUpdateBuildingid=" + ex.message);
			}
		}
<?php	if ($_SERVER['REQUEST_METHOD']=='POST') { ?>
		window.onload = function () {
			try {
				initUpdateBuildingid();
				parent.WTW.removeIFrame(dGet('wtw_iframename').value);
			} catch (ex) {
				WTW.log("core-iframes-buildings.php-onload=" + ex.message);
			}
		}	
<?php 	} ?>
	</script>
</body>
</html>	
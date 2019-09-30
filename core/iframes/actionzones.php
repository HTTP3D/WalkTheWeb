<?php
require_once('../functions/class_wtwiframes.php');
global $wtwiframes;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwiframes->trackPageView($wtwiframes->domainurl."/core/iframes/actionzones.php");
	
	$zbval = "";
	$ziframename = "";
	$zmoldid = "";
	$zmoldgroup = "";
	$zwebid = "";
	$zcopywebid = "";
	$zcommunityid = "";
	$zbuildingid = "";
	$zthingid = "";
	$zactionzoneid = "";
	$zpastactionzoneid = "";
	$zactionzoneind = "";
	$zserror = "";
	if ($_SERVER['REQUEST_METHOD']=='POST') {
		require_once('../functions/class_wtwactionzones.php');
		global $wtwactionzones;
		$zbval = $_POST["wtw_bval"];
		$ziframename = $_POST["wtw_iframename"];
		$zmoldid = $_POST["wtw_tmoldid"];
		$zmoldgroup = $_POST["wtw_tmoldgroup"];
		$zwebid = $_POST["wtw_twebid"];
		$zcopywebid = $_POST["wtw_tcopywebid"];
		$zcommunityid = $_POST["wtw_tcommunityid"];
		$zbuildingid = $_POST["wtw_tbuildingid"];
		$zthingid = $_POST["wtw_tthingid"];
		$zactionzoneind = $_POST["wtw_tactionzoneind"];
		$zpastactionzoneid = $_POST["wtw_tpastactionzoneid"];
		$zactionzoneid = $_POST["wtw_tactionzoneid"];
		switch ($zbval) {
			case "wtw_bimportactionzone":
				$wtwactionzones->importActionZones($_POST["wtw_tcommunityid"], $_POST["wtw_tbuildingid"], $_POST["wtw_tthingid"], $_POST["wtw_tactionzonesbulk"]);
				break;
			case "wtw_bsavemoldactionzone":
				if ($_POST["wtw_tcommunityid"] != "") {
					if ($wtwactionzones->updateActionZoneOnCommunityMold($_POST["wtw_tmoldid"], $_POST["wtw_tcommunityid"], $_POST["wtw_tmoldactionzoneid"]) == false) {
						$zserror = "Could not update - check the Error Log.";
					}
				} else if ($_POST["wtw_tbuildingid"] != "") {
					if ($wtwactionzones->updateActionZoneOnBuildingMold($_POST["wtw_tmoldid"], $_POST["wtw_tbuildingid"], $_POST["wtw_tmoldactionzoneid"]) == false) {
						$zserror = "Could not update - check the Error Log.";
					}
				} else if ($_POST["wtw_tthingid"] != "") {
					if ($wtwactionzones->updateActionZoneOnThingMold($_POST["wtw_tmoldid"], $_POST["wtw_tthingid"], $_POST["wtw_tmoldactionzoneid"]) == false) {
						$zserror = "Could not update - check the Error Log.";
					}
				}
				break;
			case "wtw_bremoveactionzone":
				if ($_POST["wtw_tcommunityid"] != "") {
					if ($wtwactionzones->updateActionZoneCommunityMolds($_POST["wtw_tmoldswithactionzones"], $_POST["wtw_tcommunityid"], $_POST["wtw_tmoldactionzoneid"]) == false) {
						$zserror = "Could not update - check the Error Log.";
					}
				} else if ($_POST["wtw_tbuildingid"] != "") {
					if ($wtwactionzones->updateActionZoneBuildingMolds($_POST["wtw_tmoldswithactionzones"], $_POST["wtw_tbuildingid"], $_POST["wtw_tmoldactionzoneid"]) == false) {
						$zserror = "Could not update - check the Error Log.";
					}
				} else if ($_POST["wtw_tthingid"] != "") {
					if ($wtwactionzones->updateActionZoneThingMolds($_POST["wtw_tmoldswithactionzones"], $_POST["wtw_tthingid"], $_POST["wtw_tmoldactionzoneid"]) == false) {
						$zserror = "Could not update - check the Error Log.";
					}
				}
				break;
			case "wtw_bsaveactionzone":
				if ($wtwactionzones->saveActionZone($_POST["wtw_tactionzoneid"], $_POST["wtw_tcommunityid"], $_POST["wtw_tbuildingid"], $_POST["wtw_tthingid"], $_POST["wtw_tactionzonename"], $_POST["wtw_tactionzonetype"], $_POST["wtw_tactionzoneshape"], $_POST["wtw_tattachmoldid"], $_POST["wtw_tactionzonemovementtype"],$_POST["wtw_tactionzonerotatespeed"], $_POST["wtw_tactionzoneposx"], $_POST["wtw_tactionzoneposy"], $_POST["wtw_tactionzoneposz"], $_POST["wtw_tactionzonescalingx"], $_POST["wtw_tactionzonescalingy"], $_POST["wtw_tactionzonescalingz"], $_POST["wtw_tactionzonerotx"], $_POST["wtw_tactionzoneroty"], $_POST["wtw_tactionzonerotz"], $_POST["wtw_taxispositionx"], $_POST["wtw_taxispositiony"], $_POST["wtw_taxispositionz"], $_POST["wtw_taxisrotationx"], $_POST["wtw_taxisrotationy"], $_POST["wtw_taxisrotationz"], $_POST["wtw_tactionzonerotateaxis"], $_POST["wtw_tactionzonerotatedegrees"], $_POST["wtw_tactionzonerotatedirection"], $_POST["wtw_taxisscalingz"], $_POST["wtw_tazloadactionzoneid"], $_POST["wtw_tactionzonejsfunction"], $_POST["wtw_tactionzonejsparameters"]) == false) {
					$zserror = "Could not save - check the Error Log.";
				}
				break;
			case "wtw_bdeleteactionzone":
				if ($wtwactionzones->deleteActionZone($_POST["wtw_tactionzoneid"], $_POST["wtw_tcommunityid"], $_POST["wtw_tbuildingid"], $_POST["wtw_tthingid"]) == false) {
					$zserror = "Could not delete - check the Error Log.";
				}
				break;
		}
	}
} catch (Exception $e) {
	$wtwiframes->serror("core-iframes-actionzones.php=".$e->getMessage());
} ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Walk the Web - Actionzone Updates</title>
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <script src="/core/scripts/prime/wtw_common_iframe.js"></script>
</head>
<body>
	<form id="wtw_form1" action="actionzones.php" method="post">
		<input type='hidden' id='wtw_iframename' name='wtw_iframename' value="<?php echo $ziframename; ?>" maxlength="64" />
		<input type='hidden' id='wtw_bval' name='wtw_bval' value="<?php echo $zbval ?>" maxlength="64" />
		<input type='hidden' id='wtw_serror' name='wtw_serror' value="<?php echo $zserror ?>" />
		<input type="hidden" id="wtw_tactionzoneid" name="wtw_tactionzoneid" value="<?php echo $zactionzoneid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tactionzoneind" name="wtw_tactionzoneind" value="<?php echo $zactionzoneind ?>" maxlength="12" />
		<input type="hidden" id="wtw_tpastactionzoneid" name="wtw_tpastactionzoneid" value="<?php echo $zpastactionzoneid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tparentactionzoneid" name="wtw_tparentactionzoneid" maxlength="16" />
		<input type="hidden" id="wtw_tactionzonename" name="wtw_tactionzonename" maxlength="255" />
		<input type="hidden" id="wtw_tcommunityid" name="wtw_tcommunityid" value="<?php echo $zcommunityid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tbuildingid" name="wtw_tbuildingid" value="<?php echo $zbuildingid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tthingid" name="wtw_tthingid" value="<?php echo $zthingid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tmoldid" name="wtw_tmoldid" value="<?php echo $zmoldid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tmoldgroup" name="wtw_tmoldgroup" value="<?php echo $zmoldgroup ?>" maxlength="16" />
		<input type="hidden" id="wtw_twebid" name="wtw_twebid" value="<?php echo $zwebid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tcopywebid" name="wtw_tcopywebid" value="<?php echo $zcopywebid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tmoldactionzoneid" name="wtw_tmoldactionzoneid" maxlength="16" />
		<input type="hidden" id="wtw_tazloadactionzoneid" name="wtw_tazloadactionzoneid" maxlength="16" />
		<input type="hidden" id="wtw_tmoldswithactionzones" name="wtw_tmoldswithactionzones" />
		<input type="hidden" id="wtw_taxispositionx" name="wtw_taxispositionx" maxlength="12" />
		<input type="hidden" id="wtw_taxispositiony" name="wtw_taxispositiony" maxlength="12" />
		<input type="hidden" id="wtw_taxispositionz" name="wtw_taxispositionz" maxlength="12" />
		<input type="hidden" id="wtw_taxisscalingx" name="wtw_taxisscalingx" maxlength="12" />
		<input type="hidden" id="wtw_taxisscalingy" name="wtw_taxisscalingy" maxlength="12" />
		<input type="hidden" id="wtw_taxisscalingz" name="wtw_taxisscalingz" maxlength="12" />		
		<input type="hidden" id="wtw_taxisrotationx" name="wtw_taxisrotationx" maxlength="12" />
		<input type="hidden" id="wtw_taxisrotationy" name="wtw_taxisrotationy" maxlength="12" />
		<input type="hidden" id="wtw_taxisrotationz" name="wtw_taxisrotationz" maxlength="12" />
		<input type="hidden" id="wtw_tactionzonetype" name="wtw_tactionzonetype" maxlength="255" />		
		<input type="hidden" id="wtw_tactionzoneshape" name="wtw_tactionzoneshape" maxlength="255" />
		<input type="hidden" id="wtw_tattachmoldid" name="wtw_tattachmoldid" maxlength="16" />
		<input type="hidden" id="wtw_tactionzonemovementtype" name="wtw_tactionzonemovementtype" maxlength="255" />		
		<input type="hidden" id="wtw_tactionzonerotatespeed" name="wtw_tactionzonerotatespeed" maxlength="12" />
		<input type="hidden" id="wtw_tactionzonemovementdistance" name="wtw_tactionzonemovementdistance" maxlength="12" />
		<input type="hidden" id="wtw_tactionzoneposx" name="wtw_tactionzoneposx" maxlength="12" />
		<input type="hidden" id="wtw_tactionzoneposy" name="wtw_tactionzoneposy" maxlength="12" />
		<input type="hidden" id="wtw_tactionzoneposz" name="wtw_tactionzoneposz" maxlength="12" />
		<input type="hidden" id="wtw_tactionzonescalingx" name="wtw_tactionzonescalingx" maxlength="12" />
		<input type="hidden" id="wtw_tactionzonescalingy" name="wtw_tactionzonescalingy" maxlength="12" />
		<input type="hidden" id="wtw_tactionzonescalingz" name="wtw_tactionzonescalingz" maxlength="12" />		
		<input type="hidden" id="wtw_tactionzonerotx" name="wtw_tactionzonerotx" maxlength="12" />
		<input type="hidden" id="wtw_tactionzoneroty" name="wtw_tactionzoneroty" maxlength="12" />
		<input type="hidden" id="wtw_tactionzonerotz" name="wtw_tactionzonerotz" maxlength="12" />
		<input type="hidden" id="wtw_tactionzonerotateaxis" name="wtw_tactionzonerotateaxis" maxlength="12" />
		<input type="hidden" id="wtw_tactionzonerotatedirection" name="wtw_tactionzonerotatedirection" maxlength="8" />
		<input type="hidden" id="wtw_tactionzonerotatedegrees" name="wtw_tactionzonerotatedegrees" maxlength="12" />
		<input type="hidden" id="wtw_tactionzonejsfunction" name="wtw_tactionzonejsfunction" maxlength="255" />
		<input type="hidden" id="wtw_tactionzonejsparameters" name="wtw_tactionzonejsparameters" maxlength="255" />
		<input type="hidden" id="wtw_tactionzonesbulk" name="wtw_tactionzonesbulk" />
		<input type="submit" id="wtw_bimportactionzone" name="wtw_bimportactionzone" value="Import Action Zone" onclick="WTW.buttonClick('wtw_bimportactionzone');" /> &nbsp;
		<input type="submit" id="wtw_bsaveactionzone" name="wtw_bsaveactionzone" value="Save Action Zone" onclick="WTW.buttonClick('wtw_bsaveactionzone');" /> &nbsp;
		<input type="submit" id="wtw_bdeleteactionzone" name="wtw_bdeleteactionzone" value="Delete Action Zone" onclick="WTW.buttonClick('wtw_bdeleteactionzone');" /> &nbsp;
		<input type="submit" id="wtw_bremoveactionzone" name="wtw_bremoveactionzone" value="Remove actionzone from Walls" onclick="WTW.buttonClick('wtw_bremoveactionzone');" /><br />
		<input type="submit" id="wtw_bsavemoldactionzone" name="wtw_bsavemoldactionzone" value="Save Wall actionzone" onclick="WTW.buttonClick('wtw_bsavemoldactionzone');" /><br />
	</div>
	</form>
	<script type="text/javascript">
		function initupdateactionzoneid() {
			try {
				switch (dGet('wtw_bval').value) { 
					case "wtw_bimportactionzone":
						parent.WTW.completedActionZonesImport(dGet('wtw_tmoldgroup').value, dGet('wtw_twebid').value, dGet('wtw_tcopywebid').value);
						break;
				}
			} catch (ex) {
				WTW.log("core-iframes-actionzones.php-initupdateactionzoneid=" + ex.message);
			}
		}
<?php	if ($_SERVER['REQUEST_METHOD']=='POST') { ?>
		window.onload = function () {
			try {
				initupdateactionzoneid();
				parent.WTW.removeIFrame(dGet('wtw_iframename').value);
			} catch (ex) {
				WTW.log("core-iframes-actionzones.php-onload=" + ex.message);
			}
		}	
<?php 	} ?>
	</script>
</body>
</html>	
<?php
require_once('../functions/class_wtwiframes.php');
global $wtwiframes;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwiframes->trackPageView($wtwiframes->domainurl."/core/iframes/connectinggrids.php");

	$zbval = "";
	$ziframename = "";
	$zconnectinggridid = "";
	$zconnectinggridind = "-1";
	$zpastconnectinggridid = "";
	$zmoldgroup = "";
	$zwebid = "";
	$zcopywebid = "";
	$zthingid = "";
	$zbuildingid = "";
	$zcommunityid = "";
	if ($_SERVER['REQUEST_METHOD']=='POST') {
		require_once('../functions/class_wtwconnectinggrids.php');
		global $wtwconnectinggrids;
		$zbval = $_POST["wtw_bval"];
		$ziframename = $_POST["wtw_iframename"];
		$zconnectinggridid = $_POST["wtw_teditconnectinggridid"];
		$zconnectinggridind = $_POST["wtw_teditconnectinggridind"];
		$zpastconnectinggridid = $_POST["wtw_tpastconnectinggridid"];
		$zmoldgroup = $_POST["wtw_tmoldgroup"];
		$zwebid = $_POST["wtw_twebid"];
		$zcopywebid = $_POST["wtw_tcopywebid"];
		$zthingid = $_POST["wtw_tthingid"];
		$zbuildingid = $_POST["wtw_tbuildingid"];
		$zcommunityid = $_POST["wtw_tcommunityid"];
		switch ($zbval) { 
			case "wtw_bimportparentconnectinggrids":
				$wtwconnectinggrids->importConnectingGrids('parent', $_POST["wtw_tmoldgroup"], $_POST["wtw_twebid"], $_POST["wtw_tconnectinggridsbulk"]);
				break;
			case "wtw_bimportconnectinggrids":
				$wtwconnectinggrids->importConnectingGrids('child', $_POST["wtw_tmoldgroup"], $_POST["wtw_twebid"], $_POST["wtw_tconnectinggridsbulk"]);
				break;
			case "wtw_bupdatechildconnectinggrids":
				$wtwconnectinggrids->updateChildConnectingGrid($_POST["wtw_tmoldgroup"], $_POST["wtw_twebid"]);
				break;
			case "wtw_bsaveconnectinggrid":
				$zconnectinggridid = $wtwconnectinggrids->saveConnectingGrid($_POST["wtw_teditconnectinggridid"], $_POST["wtw_tparentwebid"], $_POST["wtw_tparentwebtype"], $_POST["wtw_tchildwebid"], $_POST["wtw_tchildwebtype"], $_POST["wtw_tloadactionzoneid"], $_POST["wtw_taltloadactionzoneid"], $_POST["wtw_tconngridpositionx"], $_POST["wtw_tconngridpositiony"], $_POST["wtw_tconngridpositionz"], $_POST["wtw_tconngridscalingx"], $_POST["wtw_tconngridscalingy"], $_POST["wtw_tconngridscalingz"], $_POST["wtw_tconngridrotationx"], $_POST["wtw_tconngridrotationy"], $_POST["wtw_tconngridrotationz"], $_POST["wtw_tconngridalttag"]);
				break;
			case "wtw_bdeleteconnectinggrid":
				$wtwconnectinggrids->deleteConnectingGrid($_POST["wtw_teditconnectinggridid"]);
				$zconnectinggridid = "";
				break;
		}
	}
} catch (Exception $e) {
	$wtwiframes->serror("core-iframes-connectinggrids.php=".$e->getMessage());
} ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Walk the Web - Save Community Building</title>
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <script src="/core/scripts/prime/wtw_common_iframe.js"></script>
</head>
<body>
	<form id="wtw_form1" action="connectinggrids.php" method="post">
		<input type='hidden' id='wtw_iframename' name='wtw_iframename' value="<?php echo $ziframename; ?>" maxlength="64" />
		<input type='hidden' id='wtw_bval' name='wtw_bval' value="<?php echo $zbval ?>" maxlength="64" />
		<input type="hidden" id="wtw_teditconnectinggridid" name="wtw_teditconnectinggridid" value="<?php echo $zconnectinggridid ?>" maxlength="16" />
		<input type="hidden" id="wtw_teditconnectinggridind" name="wtw_teditconnectinggridind" value="<?php echo $zconnectinggridind ?>" maxlength="12" />
		<input type="hidden" id="wtw_tpastconnectinggridid" name="wtw_tpastconnectinggridid" value="<?php echo $zpastconnectinggridid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tcommunityid" name="wtw_tcommunityid" value="<?php echo $zcommunityid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tbuildingid" name="wtw_tbuildingid" value="<?php echo $zbuildingid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tthingid" name="wtw_tthingid" value="<?php echo $zthingid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tparentwebid" name="wtw_tparentwebid" maxlength="16" />
		<input type="hidden" id="wtw_tparentwebtype" name="wtw_tparentwebtype" maxlength="45" />
		<input type="hidden" id="wtw_tchildwebid" name="wtw_tchildwebid" maxlength="16" />
		<input type="hidden" id="wtw_tchildwebtype" name="wtw_tchildwebtype" maxlength="45" />
		<input type="hidden" id="wtw_tmoldgroup" name="wtw_tmoldgroup" value="<?php echo $zmoldgroup ?>" maxlength="16" />
		<input type="hidden" id="wtw_twebid" name="wtw_twebid" value="<?php echo $zwebid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tcopywebid" name="wtw_tcopywebid" value="<?php echo $zcopywebid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tloadactionzoneid" name="wtw_tloadactionzoneid" maxlength="16" />
		<input type="hidden" id="wtw_tunloadactionzoneid" name="wtw_tunloadactionzoneid" maxlength="16" />
		<input type="hidden" id="wtw_taltloadactionzoneid" name="wtw_taltloadactionzoneid" maxlength="16" />
		<input type="hidden" id="wtw_tattachactionzoneid" name="wtw_tattachactionzoneid" maxlength="16" />
		<input type="hidden" id="wtw_tconngridpositionx" name="wtw_tconngridpositionx" maxlength="12" />
		<input type="hidden" id="wtw_tconngridpositiony" name="wtw_tconngridpositiony" maxlength="12" />
		<input type="hidden" id="wtw_tconngridpositionz" name="wtw_tconngridpositionz" maxlength="12" />
		<input type="hidden" id="wtw_tconngridscalingx" name="wtw_tconngridscalingx" maxlength="12" />
		<input type="hidden" id="wtw_tconngridscalingy" name="wtw_tconngridscalingy" maxlength="12" />
		<input type="hidden" id="wtw_tconngridscalingz" name="wtw_tconngridscalingz" maxlength="12" />
		<input type="hidden" id="wtw_tconngridrotationx" name="wtw_tconngridrotationx" maxlength="12" />
		<input type="hidden" id="wtw_tconngridrotationy" name="wtw_tconngridrotationy" maxlength="12" />
		<input type="hidden" id="wtw_tconngridrotationz" name="wtw_tconngridrotationz" maxlength="12" />
		<input type="hidden" id="wtw_tconngridalttag" name="wtw_tconngridalttag" maxlength="255" />
		<input type="hidden" id="wtw_tconnectinggridsbulk" name="wtw_tconnectinggridsbulk" />
		<input type="submit" id="wtw_bimportparentconnectinggrids" name="wtw_bimportparentconnectinggrids" value="Import Parent Connecting Grid" onclick="WTW.buttonClick('wtw_bimportparentconnectinggrids');" /><br />
		<input type="submit" id="wtw_bimportconnectinggrids" name="wtw_bimportconnectinggrids" value="Import Connecting Grid" onclick="WTW.buttonClick('wtw_bimportconnectinggrids');" /><br />
		<input type="submit" id="wtw_bupdatechildconnectinggrids" name="wtw_bupdatechildconnectinggrids" value="Import Connecting Grid" onclick="WTW.buttonClick('wtw_bupdatechildconnectinggrids');" /><br />
		<input type="submit" id="wtw_bsaveconnectinggrid" name="wtw_bsaveconnectinggrid" value="Save Connecting Grid" onclick="WTW.buttonClick('wtw_bsaveconnectinggrid');" /><br />
		<input type="submit" id="wtw_bsavenewcommunitybuilding" name="wtw_bsavenewcommunitybuilding" value="Save New Community Building" onclick="WTW.buttonClick('wtw_bsavenewcommunitybuilding');" /><br />
		<input type="submit" id="wtw_bdeleteconnectinggrid" name="wtw_bdeleteconnectinggrid" value="Delete Connecting Grid" onclick="WTW.buttonClick('wtw_bdeleteconnectinggrid');" />
	</div>		
	</form>
	<script type="text/javascript">
		function initupdateconnectinggridid() {
			try {
				switch (dGet('wtw_bval').value) {
					case "wtw_bimportparentconnectinggrids":
						parent.WTW.completedParentConnectingGridsImport(dGet('wtw_tmoldgroup').value, dGet('wtw_twebid').value, dGet('wtw_tcopywebid').value);
						break;
					case "wtw_bimportconnectinggrids":
						parent.WTW.completedConnectingGridsImport(dGet('wtw_tmoldgroup').value, dGet('wtw_twebid').value, dGet('wtw_tcopywebid').value);
						break;
					case "wtw_bupdatechildconnectinggrids":
						parent.WTW.completedConnectingGridsImport(dGet('wtw_tmoldgroup').value, dGet('wtw_twebid').value, dGet('wtw_tcopywebid').value);
						break;
				}
			} catch (ex) {
				WTW.log("core-iframes-connectinggrids.php-initupdateconnectinggridid=" + ex.message);
			}
		}
<?php	if ($_SERVER['REQUEST_METHOD']=='POST') { ?>
		window.onload = function () {
			try {
				initupdateconnectinggridid();
				parent.WTW.removeIFrame(dGet('wtw_iframename').value);
			} catch (ex) {
				WTW.log("core-iframes-connectinggrids.php-onload=" + ex.message);
			}
		}	
<?php 	} ?>
	</script>
</body>
</html>	
<?php
require_once('../functions/class_wtwiframes.php');
global $wtwiframes;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwiframes->trackPageView($wtwiframes->domainurl."/core/iframes/communities.php");
	
	$zbval = "";
	$ziframename = "";
	$zcommunityid = "";
	$zcommunityind = "-1";
	$zfoundcommunityid = "";
	$zpastcommunityid = "";
	$zmoldgroup = "";
	$zwebid = "";
	$zcopywebid = "";
	$zwebaliases = "";
	if ($_SERVER['REQUEST_METHOD']=='POST') {
		require_once('../functions/class_wtwcommunities.php');
		global $wtwcommunities;
		$zbval = $_POST["wtw_bval"];
		$ziframename = $_POST["wtw_iframename"];
		$zcommunityid = $_POST["wtw_tcommunityid"];
		$zcommunityind = $_POST["wtw_tcommunityind"];
		$zpastcommunityid = $_POST["wtw_tpastcommunityid"];
		$zmoldgroup = $_POST["wtw_tmoldgroup"];
		$zwebid = $_POST["wtw_twebid"];
		$zcopywebid = $_POST["wtw_tcopywebid"];
		switch ($zbval) {
			case "wtw_bimportcommunity":
				$zcommunityid = $wtwcommunities->importCommunity($_POST["wtw_tcommunityid"], $_POST["wtw_tpastcommunityid"], $_POST["wtw_tcommunityname"], $_POST["wtw_tcommunityanalyticsid"], $_POST["wtw_tstartpositionx"], $_POST["wtw_tstartpositiony"], $_POST["wtw_tstartpositionz"], $_POST["wtw_tstartscalingx"], $_POST["wtw_tstartscalingy"], $_POST["wtw_tstartscalingz"], $_POST["wtw_tstartrotationx"], $_POST["wtw_tstartrotationy"], $_POST["wtw_tstartrotationz"], $_POST["wtw_tgravity"], $_POST["wtw_ttextureid"], $_POST["wtw_tskydomeid"], $_POST["wtw_tskyinclination"], $_POST["wtw_tskyluminance"], $_POST["wtw_tskyazimuth"], $_POST["wtw_tskyrayleigh"], $_POST["wtw_tskyturbidity"], $_POST["wtw_tskymiedirectionalg"], $_POST["wtw_tskymiecoefficient"], $_POST["wtw_tgroundpositiony"], $_POST["wtw_twaterpositiony"], $_POST["wtw_talttag"]);
				break;
			case "wtw_bsavetempcommunity":
				
				break;
			case "wtw_bsavecommunity":
			case "wtw_bsavenewcommunity":
			case "wtw_bsavecommunitycopy":
				$zcommunityid = $wtwcommunities->saveCommunity($_POST["wtw_tcommunityid"], $_POST["wtw_tpastcommunityid"], $_POST["wtw_tcommunityname"], $_POST["wtw_tcommunityanalyticsid"], $_POST["wtw_tgroundpositiony"], $_POST["wtw_twaterpositiony"], $_POST["wtw_talttag"], 0);
				break;
			case "wtw_bdeletecommunity":
				$wtwcommunities->deleteCommunity($_POST["wtw_tcommunityid"]);
				break;
			case "wtw_bsaveextendedgroundtexture":
				$wtwcommunities->saveCommunityGround($_POST["wtw_tcommunityid"], $_POST["wtw_textendedgroundtextureid"]);
				break;
			case "wtw_bsaveskydometexture":
				$wtwcommunities->saveCommunitySky($_POST["wtw_tcommunityid"], $_POST["wtw_tskydomeid"], $_POST["wtw_tskyinclination"], $_POST["wtw_tskyluminance"], $_POST["wtw_tskyazimuth"], $_POST["wtw_tskyrayleigh"], $_POST["wtw_tskyturbidity"], $_POST["wtw_tskymiedirectionalg"], $_POST["wtw_tskymiecoefficient"]);
				break;
			case "wtw_bsharecommunitytemplate":
				$wtwcommunities->shareCommunityTemplate($_POST["wtw_tcommunityid"], $_POST["wtw_tsharecommtempname"], $_POST["wtw_tsharecommdescription"], $_POST["wtw_tsharecommtags"]);
				break;
			case "wtw_bsavestartposition":
				$wtwcommunities->saveCommunityStartPosition($_POST["wtw_tcommunityid"], $_POST["wtw_tstartpositionx"], $_POST["wtw_tstartpositiony"], $_POST["wtw_tstartpositionz"], $_POST["wtw_tstartscalingx"], $_POST["wtw_tstartscalingy"], $_POST["wtw_tstartscalingz"], $_POST["wtw_tstartrotationx"], $_POST["wtw_tstartrotationy"], $_POST["wtw_tstartrotationz"]);
				break;
			case "wtw_bsavegravity":
				$wtwcommunities->saveCommunityGravity($_POST["wtw_tcommunityid"], $_POST["wtw_tgravity"]);
				break;
		}
	}
} catch (Exception $e) {
	$wtwiframes->serror("core-iframes-communities.php=".$e->getMessage());
} ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Walk the Web - Save Community</title>
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <script src="/core/scripts/prime/wtw_common_iframe.js"></script>
</head>
<body>
	<form id="wtw_form1" action="communities.php" method="post">
		<input type='hidden' id='wtw_iframename' name='wtw_iframename' value="<?php echo $ziframename; ?>" maxlength="64" />
		<input type='hidden' id='wtw_bval' name='wtw_bval' value="<?php echo $zbval ?>" maxlength="64" />
		<input type="hidden" id="wtw_tcommunityid" name="wtw_tcommunityid" value="<?php echo $zcommunityid ?>" maxlength="16" /><br />
		<input type="hidden" id="wtw_tcommunityind" name="wtw_tcommunityind" value="<?php echo $zcommunityind ?>" maxlength="12" /><br />
		<input type="hidden" id="wtw_tpastcommunityid" name="wtw_tpastcommunityid" value="<?php echo $zpastcommunityid ?>" maxlength="16" /><br />
		<input type="hidden" id="wtw_tmoldgroup" name="wtw_tmoldgroup" value="<?php echo $zmoldgroup ?>" maxlength="16" />
		<input type="hidden" id="wtw_twebid" name="wtw_twebid" value="<?php echo $zwebid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tcopywebid" name="wtw_tcopywebid" value="<?php echo $zcopywebid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tcommunityname" name="wtw_tcommunityname" maxlength="255" /><br />
		<input type="hidden" id="wtw_tcommunityanalyticsid" name="wtw_tcommunityanalyticsid" maxlength="255" /><br />
		<input type="hidden" id="wtw_tbuildingname" name="wtw_tbuildingname" maxlength="255" /><br />
		<input type="hidden" id="wtw_ttempbuildingid" name="wtw_ttempbuildingid" maxlength="16" /><br />
		<input type="hidden" id="wtw_tsharecommtempname" name="wtw_tsharecommtempname" maxlength="255" /><br />
		<input type="hidden" id="wtw_tsharecommdescription" name="wtw_tsharecommdescription" /><br />
		<input type="hidden" id="wtw_tsharecommtags" name="wtw_tsharecommtags" /><br />
		<input type="hidden" id="wtw_teditfoundcommunityid" name="wtw_teditfoundcommunityid" value="<?php echo $zfoundcommunityid ?>" maxlength="16" /><br />
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
		<input type="hidden" id="wtw_tgroundpositiony" name="wtw_tgroundpositiony" maxlength="12" /><br />
		<input type="hidden" id="wtw_twaterpositiony" name="wtw_twaterpositiony" maxlength="12" /><br />
		<input type="hidden" id="wtw_textendedgroundtextureid" name="wtw_textendedgroundtextureid" maxlength="16" /><br />
		<input type="hidden" id="wtw_ttextureid" name="wtw_ttextureid" maxlength="16" /><br />
		<input type="hidden" id="wtw_tskydomeid" name="wtw_tskydomeid" maxlength="16" /><br />
		<input type="hidden" id="wtw_tskyinclination" name="wtw_tskyinclination" maxlength="16" /><br />
		<input type="hidden" id="wtw_tskyluminance" name="wtw_tskyluminance" maxlength="16" /><br />
		<input type="hidden" id="wtw_tskyazimuth" name="wtw_tskyazimuth" maxlength="16" /><br />
		<input type="hidden" id="wtw_tskyrayleigh" name="wtw_tskyrayleigh" maxlength="16" /><br />
		<input type="hidden" id="wtw_tskyturbidity" name="wtw_tskyturbidity" maxlength="16" /><br />
		<input type="hidden" id="wtw_tskymiedirectionalg" name="wtw_tskymiedirectionalg" maxlength="16" /><br />
		<input type="hidden" id="wtw_tskymiecoefficient" name="wtw_tskymiecoefficient" maxlength="16" /><br />
		<input type="hidden" id="wtw_tlistwebaliases" name="wtw_tlistwebaliases" value="<?php echo $zwebaliases ?>" /><br />
		<input type="hidden" id="wtw_talttag" name="wtw_talttag" maxlength="255" /><br />
		<input type="submit" id="wtw_bimportcommunity" name="wtw_bimportcommunity" value="Import Community" onclick="WTW.buttonClick('wtw_bimportcommunity');" /><br />
		<input type="submit" id="wtw_bsavecommunity" name="wtw_bsavecommunity" value="Save Community" onclick="WTW.buttonClick('wtw_bsavecommunity');" /><br />
		<input type="submit" id="wtw_bsavecommunitycopy" name="wtw_bsavecommunitycopy" value="Save Community" onclick="WTW.buttonClick('wtw_bsavecommunitycopy');" /><br />
		<input type="submit" id="wtw_bsavenewcommunity" name="wtw_bsavenewcommunity" value="Save New Community" onclick="WTW.buttonClick('wtw_bsavenewcommunity');" /><br />
		<input type="submit" id="wtw_bsavetempcommunity" name="wtw_bsavetempcommunity" value="Save Template Community" onclick="WTW.buttonClick('wtw_bsavetempcommunity');" /><br />
		<input type="submit" id="wtw_bsaveextendedgroundtexture" name="wtw_bsaveextendedgroundtexture" value="Save Ground" onclick="WTW.buttonClick('wtw_bsaveextendedgroundtexture');" /><br />
		<input type="submit" id="wtw_bsaveskydometexture" name="wtw_bsaveskydometexture" value="Save Sky" onclick="WTW.buttonClick('wtw_bsaveskydometexture');" /><br />
		<input type="submit" id="wtw_bdeletecommunity" name="wtw_bdeletecommunity" value="Delete Community" onclick="WTW.buttonClick('wtw_bdeletecommunity');" />
		<input type="submit" id="wtw_bsharecommunitytemplate" name="wtw_bsharecommunitytemplate" value="Share Community Template" onclick="WTW.buttonClick('wtw_bsharecommunitytemplate');" /><br />
		<input type="submit" id="wtw_bsavegravity" name="wtw_bsavegravity" value="Save Gravity" onclick="WTW.buttonClick('wtw_bsavegravity');" /><br />
		<input type="submit" id="wtw_bsavestartposition" name="wtw_bsavestartposition" value="Save Start Position" onclick="WTW.buttonClick('wtw_bsavestartposition');" /><br />
	</div>		
	</form>
	<script type="text/javascript">
		function initUpdateCommunityid() {
			try {
				switch (dGet('wtw_bval').value) {
					case "wtw_bimportcommunity":
						parent.WTW.completedCommunityImport(dGet('wtw_tmoldgroup').value, dGet('wtw_twebid').value, dGet('wtw_tcopywebid').value);
						break;
					case "wtw_bsavenewcommunity":
						parent.WTW.openNewWeb("","",dGet('wtw_tcommunityid').value);
						break;
					case "wtw_bsavecommunitycopy":
						parent.WTW.copyCommunityComplete(dGet('wtw_tcommunityid').value);
						break;
					case "wtw_bsavetempcommunity":
						parent.WTW.communitySearchShowCommunity(dGet('wtw_tcommunityid').value);
						break;
					case "wtw_bdeletecommunity":
						parent.WTW.redirectParent('/admin.php');
						break;
				}
			} catch (ex) {
				WTW.log("core-iframes-communities.php-initUpdateCommunityid=" + ex.message);
			}
		}
<?php	if ($_SERVER['REQUEST_METHOD']=='POST') { ?>
		window.onload = function () {
			try {
				initUpdateCommunityid();
				parent.WTW.removeIFrame(dGet('wtw_iframename').value);
			} catch (ex) {
				WTW.log("core-iframes-communities.php-onload=" + ex.message);
			}
		}	
<?php 	} ?>
	</script>
</body>
</html>	
<?php
require_once('../functions/class_wtwiframes.php');
global $wtwiframes;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwiframes->trackPageView($wtwiframes->domainurl."/core/iframes/uploads.php");
	
	$zbval = "";
	$ziframename = "";
	$zcommunityid = "";
	$zbuildingid = "";
	$zthingid = "";
	$zmoldgroup = "";
	$zwebid = "";
	$zcopywebid = "";
	$zsnapshotid = "";
	$zsnapshotpath = "";
	$zsnapshotdata = "";
	$zkey = "";
	$zsuccess = "";
	$zsetting = "";
	$zvalue = "";
	$zsettings = "";
	$zjsfunction = "";
	$zjsparameters = "";
	if ($_SERVER['REQUEST_METHOD']=='POST') {
		require_once('../functions/class_wtwuploads.php');
		global $wtwuploads;
		$zbval = $_POST["wtw_bval"];
		$ziframename = $_POST["wtw_iframename"];
		$zcommunityid = $_POST["wtw_tcommunityid"];
		$zbuildingid = $_POST["wtw_tbuildingid"];
		$zthingid = $_POST["wtw_tthingid"];
		$zmoldgroup = $_POST["wtw_tmoldgroup"];
		$zwebid = $_POST["wtw_twebid"];
		$zcopywebid = $_POST["wtw_tcopywebid"];
		$zkey = $_POST["wtw_tkey"];
		$zsetting = $_POST["wtw_tsetting"];
		$zvalue = $_POST["wtw_tvalue"];
		$zsettings = $_POST["wtw_tsettings"];
		$zjsfunction = $_POST["wtw_tjsfunction"];
		$zjsparameters = $_POST["wtw_tjsparameters"];
		switch ($zbval) {
			case "wtw_bsetKeyHash":
				$zkey = $wtwuploads->setKeyHash($_POST["wtw_tkey"], $_POST["wtw_tmoldgroup"], $_POST["wtw_twebid"]);
				break;
			case "wtw_bimportwebimages":
				$wtwuploads->importWebImages($_POST["wtw_tmoldgroup"], $_POST["wtw_twebid"], $_POST["wtw_tcopywebid"], $_POST["wtw_twebimagesbulk"]);
				break;
			case "wtw_bimportuploads":
				$wtwuploads->importUploads($_POST["wtw_tmoldgroup"], $_POST["wtw_twebid"], $_POST["wtw_tcopywebid"], $_POST["wtw_tuploadsbulk"]);
				break;
			case "wtw_bcopyfile":
				$wtwuploads->copyFile($_POST["wtw_tfile1"],$_POST["wtw_tfilepath1"],$_POST["wtw_tfile2"],$_POST["wtw_tfilepath2"],$_POST["wtw_tcommunityid"],$_POST["wtw_tbuildingid"],$_POST["wtw_tthingid"]);
				break;
			case "wtw_bdeletefile":
				$wtwuploads->deleteFile($_POST["wtw_tfile1"],$_POST["wtw_tfilepath1"],$_POST["wtw_tcommunityid"],$_POST["wtw_tbuildingid"]);
				break;
			case "wtw_bsaveimagefilepng":
				$resp = $wtwuploads->saveImageFilePng(addslashes($_POST["wtw_tfilepath1"]), $_POST["wtw_tfile1"], $_POST["wtw_tfiledata1"],$_POST["wtw_tthingid"],$_POST["wtw_tbuildingid"],$_POST["wtw_tcommunityid"]);
				$zsnapshotid = $resp['snapshotid'];
				$zsnapshotpath = $resp['snapshotpath'];
				$zsnapshotdata = $resp['snapshotdata'];
				break;
			case "wtw_bgetsettings":
				$zsettings = json_encode($wtwuploads->getSettings($zsettings));
				break;
			case "wtw_bsavesettings":
				$zsuccess = $wtwuploads->saveSettings($zsettings);
				break;
			case "wtw_bsavesetting":
				$zsuccess = $wtwuploads->saveSetting($zsetting, $zvalue);
				break;
			case "wtw_bsavewebalias":
				$zsuccess = $wtwuploads->saveWebAlias($_POST["wtw_twebaliasid"],$_POST["wtw_tforcehttps"],$_POST["wtw_tdomainname"], $_POST["wtw_tcommunitypublishname"],$_POST["wtw_tbuildingpublishname"], $_POST["wtw_tthingpublishname"],$_POST["wtw_tcommunityid"], $_POST["wtw_tbuildingid"],$_POST["wtw_tthingid"]);
				break;
		}
	}
} catch (Exception $e) {
	$wtwiframes->serror("core-iframes-uploads.php=".$e->getMessage());
}?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Walk the Web - Save Files</title>
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <script src="/core/scripts/prime/wtw_common_iframe.js"></script>
</head>
<body>
	<form id="wtw_form1" action="uploads.php" method="post">
		<input type='hidden' id='wtw_iframename' name='wtw_iframename' value="<?php echo $ziframename; ?>" maxlength="64" />
		<input type='hidden' id='wtw_bval' name='wtw_bval' value="<?php echo $zbval ?>" maxlength="64" />
		<input type="hidden" id="wtw_tcommunityid" name="wtw_tcommunityid" value="<?php echo $zcommunityid; ?>" maxlength="16" /><br />
		<input type="hidden" id="wtw_tbuildingid" name="wtw_tbuildingid" value="<?php echo $zbuildingid; ?>" maxlength="16" /><br />
		<input type="hidden" id="wtw_tthingid" name="wtw_tthingid" value="<?php echo $zthingid; ?>" maxlength="16" /><br />
		<input type="hidden" id="wtw_tmoldgroup" name="wtw_tmoldgroup" value="<?php echo $zmoldgroup; ?>" maxlength="16" />
		<input type="hidden" id="wtw_twebid" name="wtw_twebid" value="<?php echo $zwebid; ?>" maxlength="16" />
		<input type="hidden" id="wtw_tcopywebid" name="wtw_tcopywebid" value="<?php echo $zcopywebid; ?>" maxlength="16" />
		<input type="hidden" id="wtw_tsnapshotid" name="wtw_tsnapshotid" value="<?php echo $zsnapshotid; ?>" maxlength="16" /><br />
		<input type="hidden" id="wtw_tsnapshotpath" name="wtw_tsnapshotpath" value="<?php echo $zsnapshotpath; ?>" maxlength="16" /><br />
		<input type="hidden" id="wtw_tsnapshotdata" name="wtw_tsnapshotdata" value="<?php echo $zsnapshotdata; ?>" /><br />
		<input type="hidden" id="wtw_tfile1" name="wtw_tfile1" maxlength="255" /><br />
		<input type="hidden" id="wtw_tfile2" name="wtw_tfile2" maxlength="255" /><br />
		<input type="hidden" id="wtw_tfilepath1" name="wtw_tfilepath1" maxlength="255" /><br />
		<input type="hidden" id="wtw_tfilepath2" name="wtw_tfilepath2" maxlength="255" /><br />
		<input type="hidden" id="wtw_tfiledata1" name="wtw_tfiledata1" /><br />
		<input type="hidden" id="wtw_twebimagesbulk" name="wtw_twebimagesbulk" />
		<input type="hidden" id="wtw_tkey" name="wtw_tkey" value="<?php echo $zkey; ?>" />
		<input type="hidden" id="wtw_tuploadsbulk" name="wtw_tuploadsbulk" />
		<input type="hidden" id="wtw_tsetting" name="wtw_tsetting" value='<?php echo $zsetting; ?>' maxlength="255" />
		<input type="hidden" id="wtw_tvalue" name="wtw_tvalue" maxlength="255" />
		<input type="hidden" id="wtw_tsettings" name="wtw_tsettings" value='<?php echo $zsettings; ?>' />
		<input type="hidden" id="wtw_tjsfunction" name="wtw_tjsfunction" value='<?php echo $zjsfunction; ?>' />
		<input type="hidden" id="wtw_tjsparameters" name="wtw_tjsparameters" value='<?php echo $zjsparameters; ?>' />
		<input type="hidden" id="wtw_twebaliasid" name="wtw_twebaliasid" maxlength="16" /><br />
		<input type="hidden" id="wtw_tdomainname" name="wtw_tdomainname" maxlength="255" /><br />
		<input type="hidden" id="wtw_tcommunitypublishname" name="wtw_tcommunitypublishname" maxlength="255" /><br />
		<input type="hidden" id="wtw_tbuildingpublishname" name="wtw_tbuildingpublishname" maxlength="255" /><br />
		<input type="hidden" id="wtw_tthingpublishname" name="wtw_tthingpublishname" maxlength="255" /><br />
		<input type="hidden" id="wtw_tforcehttps" name="wtw_tforcehttps" maxlength="1" /><br />
		<input type="hidden" id="wtw_tsuccess" name="wtw_tsuccess" maxlength="255" value="<?php echo $zsuccess; ?>" /><br />
		<input type="submit" id="wtw_bgetsettings" name="wtw_bgetsettings" value="Get Settings" onclick="WTW.buttonClick('wtw_bgetsettings');" /> &nbsp;
		<input type="submit" id="wtw_bsavesetting" name="wtw_bsavesetting" value="Save Setting" onclick="WTW.buttonClick('wtw_bsavesetting');" /> &nbsp;
		<input type="submit" id="wtw_bsavesettings" name="wtw_bsavesettings" value="Save Settings" onclick="WTW.buttonClick('wtw_bsavesettings');" /> &nbsp;
		<input type="submit" id="wtw_bsetKeyHash" name="wtw_bsetKeyHash" value="Import Web Images" onclick="WTW.buttonClick('wtw_bsetKeyHash');" /> &nbsp;
		<input type="submit" id="wtw_bimportwebimages" name="wtw_bimportwebimages" value="Import Web Images" onclick="WTW.buttonClick('wtw_bimportwebimages');" /> &nbsp;
		<input type="submit" id="wtw_bimportuploads" name="wtw_bimportuploads" value="Import Uploads" onclick="WTW.buttonClick('wtw_bimportuploads');" /> &nbsp;
		<input type="submit" id="wtw_bcopyfile" name="wtw_bcopyfile" value="Copy File" onclick="WTW.buttonClick('wtw_bcopyfile');" /><br />
		<input type="submit" id="wtw_bdeletefile" name="wtw_bdeletefile" value="Delete File" onclick="WTW.buttonClick('wtw_bdeletefile');" />
		<input type="submit" id="wtw_bsaveimagefilepng" name="wtw_bsaveimagefilepng" value="Save Image File (PNG)" onclick="WTW.buttonClick('wtw_bsaveimagefilepng');" />
		<input type="submit" id="wtw_bsavewebalias" name="wtw_bsavewebalias" value="Save Web Alias" onclick="WTW.buttonClick('wtw_bsavewebalias');" />
	</div>
	</form>
	<script type="text/javascript">
		function initfilecommands() {
			try {
				switch (dGet('wtw_bval').value) { 
					case "wtw_bsetKeyHash":
						switch (dGet('wtw_tmoldgroup').value) {
							case "community":
								parent.WTW.shareCommunitySecurity(dGet('wtw_tkey').value);
								break;
							case "building":
								//parent.WTW.shareBuildingSecurity(dGet('wtw_tkey').value);
								break;
							case "thing":
								//parent.WTW.shareThingSecurity(dGet('wtw_tkey').value);
								break;
						}
						break;
					case "wtw_bimportwebimages":
						parent.WTW.completedWebImagesImport(dGet('wtw_tmoldgroup').value, dGet('wtw_twebid').value, dGet('wtw_tcopywebid').value);
						break;
					case "wtw_bimportuploads":
						parent.WTW.completedUploadsImport(dGet('wtw_tmoldgroup').value, dGet('wtw_twebid').value, dGet('wtw_tcopywebid').value);
						break;
					case "wtw_bsaveimagefilepng":
						parent.WTW.updateSnapshot3D(dGet('wtw_tthingid').value, dGet('wtw_tbuildingid').value, dGet('wtw_tcommunityid').value, dGet('wtw_tsnapshotid').value, dGet('wtw_tsnapshotpath').value, dGet('wtw_tsnapshotdata').value);
						break;
					case "wtw_bgetsettings":
						parent.WTW.returnSettings(dGet('wtw_tsettings').value, dGet('wtw_tjsfunction').value, dGet('wtw_tjsparameters').value);
						break;
					case "wtw_bsavesettings":
						parent.WTW.returnSettings(dGet('wtw_tsuccess').value, dGet('wtw_tjsfunction').value, dGet('wtw_tjsparameters').value);
						break;
					case "wtw_bsavesetting":
						parent.WTW.returnSettings(dGet('wtw_tsuccess').value, dGet('wtw_tjsfunction').value, dGet('wtw_tjsparameters').value);
						break;
					case "wtw_bsavewebalias":
						parent.WTW.openWebAliasSettings();
						break;
				}
			} catch (ex) {
				WTW.log("core-iframes-uploads.php-initfilecommands=" + ex.message);
			}
		}
<?php	if ($_SERVER['REQUEST_METHOD']=='POST') { ?>
		window.onload = function () {
			try {
				initfilecommands();
				parent.WTW.removeIFrame(dGet('wtw_iframename').value);
			} catch (ex) {
				WTW.log("core-iframes-uploads.php-onload=" + ex.message);
			}
		}	
<?php 	} ?>
	</script>
</body>
</html>	
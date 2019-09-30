<?php
require_once('../functions/class_wtwiframes.php');
global $wtwiframes;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwiframes->trackPageView($wtwiframes->domainurl."/core/iframes/pluginloader.php");
	
	$zbval = "";
	$ziframename = "";
	$zmoldgroup = "";
	$zwebid = "";
	$zcopywebid = "";
	$zplugins = "";
	$zpluginname = "";
	$zversion = "";
	$zupdatedate = "";
	$zupdateurl = "";
	$zsuccess = "";
	$zactive = "";
	$zshow = "";
	if ($_SERVER['REQUEST_METHOD']=='POST') {
		require_once('../functions/class_wtwpluginloader.php');
		global $wtwpluginloader;
		$zbval = $_POST["wtw_bval"];
		$ziframename = $_POST["wtw_iframename"];
		$zmoldgroup = $_POST["wtw_tmoldgroup"];
		$zwebid = $_POST["wtw_twebid"];
		$zcopywebid = $_POST["wtw_tcopywebid"];
		$zpluginname = $_POST["wtw_tpluginname"];
		$zversion = $_POST["wtw_tversion"];
		$zupdatedate = $_POST["wtw_tupdatedate"];
		$zupdateurl = $_POST["wtw_tupdateurl"];
		$zactive = $_POST["wtw_tactive"];
		$zshow = $_POST["wtw_tshow"];
		switch ($zbval) {
			case "wtw_bgetallplugins":
				$zplugins = $wtwpluginloader->getAllPlugins($wtwiframes->contentpath,0);
				break;
			case "wtw_bactivateplugin":
				$wtwpluginloader->setPluginActive($wtwiframes->contentpath, $_POST["wtw_tpluginname"], $_POST["wtw_tactive"]);
				break;
			case "wtw_bgetplugininfo":
				$zplugins = $wtwpluginloader->getAllPlugins($wtwiframes->contentpath,0);
				break;
			case "wtw_bgetupdate":
				$zsuccess = $wtwpluginloader->updateWalkTheWeb($zpluginname, $zversion, $zupdateurl);
				break;
			case "wtw_bgetpluginupdate":
				$zsuccess = $wtwpluginloader->updateWalkTheWeb($zpluginname, $zversion, $zupdateurl);
				break;
		}
	}
} catch (Exception $e) {
	$wtwiframes->serror("core-iframes-pluginloader.php=".$e->getMessage());
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Walk the Web - Save Plugins</title>
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <script src="/core/scripts/prime/wtw_common_iframe.js"></script>
</head>
<body>
	<form id="wtw_form1" action="pluginloader.php" method="post">
		<input type='hidden' id='wtw_iframename' name='wtw_iframename' value="<?php echo $ziframename; ?>" maxlength="64" />
		<input type='hidden' id='wtw_bval' name='wtw_bval' value="<?php echo $zbval ?>" maxlength="64" />
		<input type="hidden" id="wtw_tmoldgroup" name="wtw_tmoldgroup" value="<?php echo $zmoldgroup ?>" maxlength="16" />
		<input type="hidden" id="wtw_twebid" name="wtw_twebid" value="<?php echo $zwebid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tcopywebid" name="wtw_tcopywebid" value="<?php echo $zcopywebid ?>" maxlength="16" />
		<input type="hidden" id="wtw_tpluginname" name="wtw_tpluginname" maxlength="255" value="<?php echo $zpluginname ?>" />
		<input type="hidden" id="wtw_tversion" name="wtw_tversion" maxlength="255" value="<?php echo $zversion; ?>" /><br />
		<input type="hidden" id="wtw_tupdatedate" name="wtw_tupdatedate" maxlength="255" value="<?php echo $zupdatedate; ?>" /><br />
		<input type="hidden" id="wtw_tupdateurl" name="wtw_tupdateurl" maxlength="255" value="<?php echo $zupdateurl; ?>" /><br />
		<input type="hidden" id="wtw_tsuccess" name="wtw_tsuccess" maxlength="255" value="<?php echo $zsuccess; ?>" /><br />
		<input type="hidden" id="wtw_tactive" name="wtw_tactive" maxlength="1" value="<?php echo $zactive ?>" />
		<input type="hidden" id="wtw_tshow" name="wtw_tshow" maxlength="1" value="<?php echo $zshow ?>" />
		<input type="hidden" id="wtw_tplugins" name="wtw_tplugins" value='<?php echo $zplugins ?>' />
		<input type="submit" id="wtw_bgetallplugins" name="wtw_bgetallplugins" value="Get All Plugins" onclick="WTW.buttonClick('wtw_bgetallplugins');" /><br />
		<input type="submit" id="wtw_bactivateplugin" name="wtw_bactivateplugin" value="Activate Plugin" onclick="WTW.buttonClick('wtw_bactivateplugin');" /><br />
		<input type="submit" id="wtw_bgetplugininfo" name="wtw_bgetplugininfo" value="Get Plugin List with Versions" onclick="WTW.buttonClick('wtw_bgetplugininfo');" /><br />
		<input type="submit" id="wtw_bgetupdate" name="wtw_bgetupdate" value="Update App or Plugin" onclick="WTW.buttonClick('wtw_bgetupdate');" /> &nbsp;
		<input type="submit" id="wtw_bgetpluginupdate" name="wtw_bgetpluginupdate" value="Update Plugin" onclick="WTW.buttonClick('wtw_bgetpluginupdate');" /> &nbsp;
	</div>
	</form>
	<script type="text/javascript">
		function initUpdatePluginLoader() {
			try {
				switch (dGet('wtw_bval').value) {
					case "wtw_bgetallplugins":
						parent.WTW.openAllPluginsComplete(dGet('wtw_tplugins').value, dGet('wtw_tpluginname').value, dGet('wtw_tactive').value);
						break;
					case "wtw_bactivateplugin":
						parent.WTW.openAllPlugins(dGet('wtw_tpluginname').value, dGet('wtw_tactive').value);
						break;
					case "wtw_bgetplugininfo":
						parent.WTW.getPluginInfoComplete(dGet('wtw_tplugins').value, dGet('wtw_tshow').value);
						break;
					case "wtw_bgetupdate":
						parent.WTW.updateWalkTheWebComplete(dGet('wtw_tpluginname').value, dGet('wtw_tversion').value, dGet('wtw_tupdatedate').value, dGet('wtw_tupdateurl').value, dGet('wtw_tsuccess').value);
						break;
					case "wtw_bgetpluginupdate":
						parent.WTW.updatePluginComplete(dGet('wtw_tpluginname').value, dGet('wtw_tversion').value, dGet('wtw_tupdatedate').value, dGet('wtw_tupdateurl').value, dGet('wtw_tsuccess').value, dGet('wtw_tshow').value);
						break;
				}
			} catch (ex) {
				WTW.log("core-iframes-pluginloader.php-initUpdatePluginLoader=" + ex.message);
			}
		}
<?php	if ($_SERVER['REQUEST_METHOD']=='POST') { ?>
		window.onload = function () {
			try {
				initUpdatePluginLoader();
				parent.WTW.removeIFrame(dGet('wtw_iframename').value);
			} catch (ex) {
				WTW.log("core-iframes-pluginloader.php-onload=" + ex.message);
			}
		}	
<?php 	} ?>
	</script>
</body>
</html>	
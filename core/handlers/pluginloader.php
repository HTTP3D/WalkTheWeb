<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwpluginloader.php');
	global $wtwpluginloader;
	$zresults = file_get_contents('php://input');
	$zdata = json_decode($zresults, TRUE);

	$zfunction = null;
	$zpluginname = '';
	$zactive = '';
	$zversion = '';
	$zupdateurl = '';
	
	if (!empty($zdata) && isset($zdata)) {
		if (isset($zdata["function"])) {
			$zfunction = strtolower($zdata["function"]);
		}
		if (isset($zdata["pluginname"])) {
			$zpluginname = $zdata["pluginname"];
		}
		if (isset($zdata["active"])) {
			$zactive = $zdata["active"];
		}
		if (isset($zdata["version"])) {
			$zversion = $zdata["version"];
		}
		if (isset($zdata["updateurl"])) {
			$zupdateurl = $zdata["updateurl"];
		}
	}

	$zresponse = array();
	switch ($zfunction) {
		case "getallplugins":
			$zplugins = $wtwpluginloader->getAllPlugins($wtwhandlers->contentpath, 0);
			$zresponse = array(
				'plugins'=> $zplugins
			);
			break;
		case "getplugininfo":
			$zplugins = $wtwpluginloader->getAllPlugins($wtwhandlers->contentpath,0);
			$zresponse = array(
				'plugins'=> $zplugins
			);
			break;
		case "activateplugin":
			$wtwpluginloader->setPluginActive($zpluginname, $zactive);
			break;
		case "getupdate":
			$zsuccess = $wtwpluginloader->updateWalkTheWeb($zpluginname, $zversion, $zupdateurl);
			$zresponse = array(
				'success'=> $zsuccess
			);
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-pluginloader.php=".$e->getMessage());
}
?>
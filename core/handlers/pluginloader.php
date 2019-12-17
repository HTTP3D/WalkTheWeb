<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwpluginloader.php');
	global $wtwpluginloader;
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);

	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zpluginname = $wtwhandlers->getPost('pluginname','');
	$zactive = $wtwhandlers->getPost('active','');
	$zversion = $wtwhandlers->getPost('version','');
	$zupdateurl = $wtwhandlers->getPost('updateurl','');

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
<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for plugin loader related functions */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwpluginloader.php');
	global $wtwpluginloader;
	$zrequest = $wtwhandlers->openFilefromURL('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	
	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zpluginname = $wtwhandlers->getPost('pluginname','');
	$zactive = $wtwhandlers->getPost('active','');
	$zrequired = $wtwhandlers->getPost('required','1');
	$zoptional = $wtwhandlers->getPost('optional','0');
	$zversion = $wtwhandlers->getPost('version','');
	$zupdateurl = $wtwhandlers->getPost('updateurl','');
	$zwebid = $wtwhandlers->getPost('webid','');
	$zwebtype = $wtwhandlers->getPost('webtype','');

	/* select the function called */
	$zresponse = array();
	switch ($zfunction) {
		case "getallplugins":
			$zplugins = $wtwpluginloader->getAllPlugins($wtwhandlers->contentpath, 0);
			$zresponse = array(
				'plugins'=> $zplugins
			);
			break;
		case "getplugininfo":
			$zplugins = $wtwpluginloader->getAllPlugins($wtwhandlers->contentpath, 0);
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
		case "savepluginsrequired":
			$zresponse = $wtwpluginloader->savePluginsRequired($zwebid, $zwebtype, $zpluginname, $zrequired, $zoptional);
			break;
	}

	/* set headers to keep data local to server */
	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	/* return the response from the function */
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-pluginloader.php=".$e->getMessage());
}
?>
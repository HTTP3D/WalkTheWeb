<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for Heads Up Display (HUD) functions */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwhud.php');
	global $wtwhud;
	$zrequest = $wtwhandlers->openFilefromURL('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	
	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zmenuset = $wtwhandlers->getPost('menuset','mainmenu');
	$zmenuitemid = $wtwhandlers->getPost('menuitemid','');

/*
	$zuseravatarid = $wtwhandlers->getPost('useravatarid','');
	$zavatarid = $wtwhandlers->getPost('avatarid','');
	$zwebid = $wtwhandlers->getPost('webid','');
	$zwebtype = $wtwhandlers->getPost('webtype','');
	$zinstanceid = $wtwhandlers->getPost('instanceid','');
	$zuserip = $wtwhandlers->getPost('userip','');

	$zfilename = $wtwhandlers->getPost('filename','');
	$zuploadfile = $wtwhandlers->getFiles('wtw_uploadfile',null);
	$zuploadfiles = $wtwhandlers->getFiles('wtw_uploadfiles',null);
*/	
	/* select the function called */
	$zresponse = array();
	switch ($zfunction) {
		case "gethudmenu":
			$zresponse = $wtwhud->getHudMenu($zmenuset);
			break;
		case "gethudmenuitem":
			$zresponse = $wtwhud->getHudMenuItem($zmenuitemid);
			break;
	}

	/* set headers to keep data local to server */
	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	/* return the response from the function */
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-hud.php=".$e->getMessage());
}
?>
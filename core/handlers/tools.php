<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for tools functions */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwtools.php');
	global $wtwtools;
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	
	if (!defined('wtw_defaultlanguage')) {
		define('wtw_defaultlanguage','English');
	}
	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zwebid = $wtwhandlers->getPost('webid','');
	$zwebtype = $wtwhandlers->getPost('webtype','');
	$zparentalcontrols = $wtwhandlers->getPost('parentalcontrols','0');
	$zrating = $wtwhandlers->getPost('rating','');
	$zratingvalue = $wtwhandlers->getPost('ratingvalue','');
	$zcontentwarning = $wtwhandlers->getPost('contentwarning','');
	$zsendto = $wtwhandlers->getPost('sendto','');
	$zcopyto = $wtwhandlers->getPost('copyto','');
	$zbccto = $wtwhandlers->getPost('bccto','');
	$zsubject = $wtwhandlers->getPost('subject','');
	$zhtmlmessage = $wtwhandlers->getPost('htmlmessage','');
	$zmessage = $wtwhandlers->getPost('message','');
	$zdbserver = $wtwhandlers->getPost('dbserver',wtw_dbserver);
	$zdbname = $wtwhandlers->getPost('dbname',wtw_dbname);
	$zdbusername = $wtwhandlers->getPost('dbusername',wtw_dbusername);
	$zdbpassword = $wtwhandlers->getPost('dbpassword',wtw_dbpassword);
	$zdefaultlanguage = $wtwhandlers->getPost('defaultlanguage',wtw_defaultlanguage);
	$zcontentpath = $wtwhandlers->getPost('contentpath',wtw_contentpath);
	$zdefaultdomain = $wtwhandlers->getPost('defaultdomain',wtw_defaultdomain);
	$zdefaultsitename = $wtwhandlers->getPost('defaultsitename',wtw_defaultsitename);
	$zgoogleanalytics = $wtwhandlers->getPost('googleanalytics',wtw_googleanalytics);
	$zadminemail = $wtwhandlers->getPost('adminemail',wtw_adminemail);
	$zadminname = $wtwhandlers->getPost('adminname',wtw_adminname);
	$zumask = $wtwhandlers->getPost('umask',wtw_umask);
	$zchmod = $wtwhandlers->getPost('chmod',wtw_chmod);
	$zftpuser = $wtwhandlers->getPost('ftpuser',wtw_ftpuser);
	$zftppassword = $wtwhandlers->getPost('ftppassword',wtw_ftppassword);
	$zftpbase = $wtwhandlers->getPost('ftpbase',wtw_ftpbase);
	$zlabel = $wtwhandlers->getPost('label','');

	/* convert any comma seperated email lists into arrays */
	if (!empty($zsendto) && isset($zsendto)) {
		if (strpos($zsendto,",") === false) {
			$zsendto = array($zsendto);
		} else {
			$zsendto = explode(',',$zsendto);
		}
	}
	if (!empty($zcopyto) && isset($zcopyto)) {
		if (strpos($zcopyto,",") === false) {
			$zcopyto = array($zcopyto);
		} else {
			$zcopyto = explode(',',$zcopyto);
		}
	}
	if (!empty($zbccto) && isset($zbccto)) {
		if (strpos($zbccto,",") === false) {
			$zbccto = array($zbccto);
		} else {
			$zbccto = explode(',',$zbccto);
		}
	}

	/* select the function called */
	$zresponse = array();
	switch ($zfunction) {
		case "savecontentrating":
			$zresponse = $wtwtools->saveContentRating($zwebid, $zwebtype, $zrating, $zratingvalue, $zcontentwarning, $zparentalcontrols);
			break;
		case "getserversettings":
			$zresponse = $wtwtools->getServerSettings();
			break;
		case "saveserversettings":
			$zresponse = $wtwtools->saveServerSettings($zdbserver, $zdbname, $zdbusername, $zdbpassword, $zdefaultlanguage, $zcontentpath, $zdefaultdomain, $zdefaultsitename, $zgoogleanalytics, $zadminemail, $zadminname, $zumask, $zchmod, $zftpuser, $zftppassword, $zftpbase);
			break;
		case "getlanguages":
			$zresponse = $wtwtools->getLanguages();
			break;
		case "sendadminemail":
			$zresponse = $wtwtools->sendAdminEmail($zsendto, $zsubject, $zmessage);
			break;
		case "sendemail":
			$zresponse = $wtwtools->sendEmail($zsendto, $zcopyto, $zbccto, $zsubject, $zhtmlmessage, $zmessage);
			break;
		case "translate":
			$zresponse = $wtwtools->__($zlabel);
			break;
	}

	/* set headers to keep data local to server */
	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	/* return the response from the function */
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-tools.php=".$e->getMessage());
}
?>
<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for tools functions */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwtools.php');
	global $wtwtools;
	$zrequest = $wtwhandlers->openFilefromURL('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	
	if (!defined('wtw_defaultlanguage')) {
		define('wtw_defaultlanguage','English');
	}
	/* set default values */
	$zdefaultdbserver = '';
	$zdefaultdbname = '';
	$zdefaultdbusername = '';
	$zdefaultdbpassword = '';
	$zdefaultdefaultlanguage = '';
	$zdefaultcontentpath = '';
	$zdefaultdefaultdomain = '';
	$zdefaultdefaultsitename = '';
	$zdefaultgoogleanalytics = '';
	$zdefaultadminemail = '';
	$zdefaultadminname = '';
	$zdefaultumask = '';
	$zdefaultchmod = '';
	$zdefaultbabylonversion = '';
	$zdefaultphysicsengine = '';
	$zdefaultftphost = '';
	$zdefaultftpuser = '';
	$zdefaultftppassword = '';
	$zdefaultftpbase = '';
	if (defined('wtw_dbserver')) {
		$zdefaultdbserver = wtw_dbserver;
	}
	if (defined('wtw_dbname')) {
		$zdefaultdbname = wtw_dbname;
	}
	if (defined('wtw_dbusername')) {
		$zdefaultdbusername = wtw_dbusername;
	}
	if (defined('wtw_dbpassword')) {
		$zdefaultdbpassword = wtw_dbpassword;
	}
	if (defined('wtw_defaultlanguage')) {
		$zdefaultdefaultlanguage = wtw_defaultlanguage;
	}
	if (defined('wtw_contentpath')) {
		$zdefaultcontentpath = wtw_contentpath;
	}
	if (defined('wtw_defaultdomain')) {
		$zdefaultdefaultdomain = wtw_defaultdomain;
	}
	if (defined('wtw_defaultsitename')) {
		$zdefaultdefaultsitename = wtw_defaultsitename;
	}
	if (defined('wtw_googleanalytics')) {
		$zdefaultgoogleanalytics = wtw_googleanalytics;
	}
	if (defined('wtw_adminemail')) {
		$zdefaultadminemail = wtw_adminemail;
	}
	if (defined('wtw_adminname')) {
		$zdefaultadminname = wtw_adminname;
	}
	if (defined('wtw_umask')) {
		$zdefaultumask = wtw_umask;
	}
	if (defined('wtw_chmod')) {
		$zdefaultchmod = wtw_chmod;
	}
	if (defined('wtw_babylonversion')) {
		$zdefaultbabylonversion = wtw_babylonversion;
	}
	if (defined('wtw_physicsengine')) {
		$zdefaultphysicsengine = wtw_physicsengine;
	}
	if (defined('wtw_ftphost')) {
		$zdefaultftphost = wtw_ftphost;
	}
	if (defined('wtw_ftpuser')) {
		$zdefaultftpuser = wtw_ftpuser;
	}
	if (defined('wtw_ftppassword')) {
		$zdefaultftppassword = wtw_ftppassword;
	}
	if (defined('wtw_ftpbase')) {
		$zdefaultftpbase = wtw_ftpbase;
	}

	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zwebid = $wtwhandlers->getPost('webid','');
	$zcommunityid = $wtwhandlers->getPost('communityid','');
	$zbuildingid = $wtwhandlers->getPost('buildingid','');
	$zthingid = $wtwhandlers->getPost('thingid','');
	$zglobaluserid = $wtwhandlers->getPost('globaluserid','');
	$zuserid = $wtwhandlers->getPost('userid','');
	$zuserip = $wtwhandlers->getPost('userip','');
	$zusertoken = $wtwhandlers->getPost('usertoken','');
	$zinstanceid = $wtwhandlers->getPost('instanceid','');
	$zglobaluseravatarid = $wtwhandlers->getPost('globaluseravatarid','');
	$zuseravatarid = $wtwhandlers->getPost('useravatarid','');
	$zuploadpathid = $wtwhandlers->getPost('uploadpathid','');
	$zwebtype = $wtwhandlers->getPost('webtype','');
	$zfeedbackid = $wtwhandlers->getPost('feedbackid','');
	$zstatus = $wtwhandlers->getPost('status','');
	$zfilter = $wtwhandlers->getPost('filter','');
	$zfeedbacktype = $wtwhandlers->getPost('feedbacktype','');
	$zfeedbackname = $wtwhandlers->getPost('feedbackname','');
	$zdisplayname = $wtwhandlers->getPost('displayname','');
	$zfeedbackemail = $wtwhandlers->getPost('feedbackemail','');
	$zuseremail = $wtwhandlers->getPost('useremail','');
	$zerrorid = $wtwhandlers->getPost('errorid','');
	$zparentalcontrols = $wtwhandlers->getPost('parentalcontrols','0');
	$zrating = $wtwhandlers->getPost('rating','');
	$zratingvalue = $wtwhandlers->getPost('ratingvalue','');
	$zcontentwarning = $wtwhandlers->getPost('contentwarning','');
	$zsendto = $wtwhandlers->getPost('sendto','');
	$zcopyto = $wtwhandlers->getPost('copyto','');
	$zbccto = $wtwhandlers->getPost('bccto','');
	$zsubject = $wtwhandlers->getPost('subject','');
	$zcategory = $wtwhandlers->getPost('category','');
	$zhtmlmessage = $wtwhandlers->getPost('htmlmessage','');
	$zmessage = $wtwhandlers->getPost('message','');
	$zdbserver = $wtwhandlers->getPost('dbserver',$zdefaultdbserver);
	$zdbname = $wtwhandlers->getPost('dbname',$zdefaultdbname);
	$zdbusername = $wtwhandlers->getPost('dbusername',$zdefaultdbusername);
	$zdbpassword = $wtwhandlers->getPost('dbpassword',$zdefaultdbpassword);
	$zdefaultlanguage = $wtwhandlers->getPost('defaultlanguage',$zdefaultdefaultlanguage);
	$zurl = $wtwhandlers->getPost('url','');
	$zdomainurl = $wtwhandlers->getPost('domainurl','');
	$zsnapshoturl = $wtwhandlers->getPost('snapshoturl','');
	$zwtwversion = $wtwhandlers->getPost('wtwversion','');
	$zcontentpath = $wtwhandlers->getPost('contentpath',$zdefaultcontentpath);
	$zdefaultdomain = $wtwhandlers->getPost('defaultdomain',$zdefaultdefaultdomain);
	$zdefaultsitename = $wtwhandlers->getPost('defaultsitename',$zdefaultdefaultsitename);
	$zgoogleanalytics = $wtwhandlers->getPost('googleanalytics',$zdefaultgoogleanalytics);
	$zadminemail = $wtwhandlers->getPost('adminemail',$zdefaultadminemail);
	$zadminname = $wtwhandlers->getPost('adminname',$zdefaultadminname);
	$zumask = $wtwhandlers->getPost('umask',$zdefaultumask);
	$zchmod = $wtwhandlers->getPost('chmod',$zdefaultchmod);
	$zbabylonversion = $wtwhandlers->getPost('babylonversion',$zdefaultbabylonversion);
	$zphysicsengine = $wtwhandlers->getPost('physicsengine',$zdefaultphysicsengine);
	$zftphost = $wtwhandlers->getPost('ftphost',$zdefaultftphost);
	$zftpuser = $wtwhandlers->getPost('ftpuser',$zdefaultftpuser);
	$zftppassword = $wtwhandlers->getPost('ftppassword',$zdefaultftppassword);
	$zftpbase = $wtwhandlers->getPost('ftpbase',$zdefaultftpbase);
	$zlabel = $wtwhandlers->getPost('label','');

	/* convert any comma seperated email lists into arrays */
	if ($wtwhandlers->hasValue($zsendto)) {
		if (strpos($zsendto,",") === false) {
			$zsendto = array($zsendto);
		} else {
			$zsendto = explode(',',$zsendto);
		}
	}
	if ($wtwhandlers->hasValue($zcopyto)) {
		if (strpos($zcopyto,",") === false) {
			$zcopyto = array($zcopyto);
		} else {
			$zcopyto = explode(',',$zcopyto);
		}
	}
	if ($wtwhandlers->hasValue($zbccto)) {
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
			$zresponse = $wtwtools->saveServerSettings($zdbserver, $zdbname, $zdbusername, $zdbpassword, $zdefaultlanguage, $zcontentpath, $zdefaultdomain, $zdefaultsitename, $zgoogleanalytics, $zadminemail, $zadminname, $zumask, $zchmod, $zbabylonversion, $zphysicsengine, $zftphost, $zftpuser, $zftppassword, $zftpbase);
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
		case "savefeedback":
			$zresponse = $wtwtools->saveFeedback($zurl, $zdomainurl, $zwtwversion, $zcommunityid, $zbuildingid, $zthingid, $zfeedbacktype, $zcategory, $zsubject, $zmessage, $zsnapshoturl, $zfeedbackname, $zdisplayname, $zfeedbackemail, $zuseremail, $zuserid, $zuserip, $zinstanceid, $zglobaluserid, $zusertoken, $zuploadpathid, $zglobaluseravatarid, $zuseravatarid);
			break;
		case "getfeedback":
			$zresponse = $wtwtools->getFeedback($zfilter);
			break;
		case "updatefeedbackstatus":
			$zresponse = $wtwtools->updateFeedbackStatus($zfeedbackid, $zstatus);
			break;
		case "geterrorlog":
			$zresponse = $wtwtools->getErrorLog($zfilter);
			break;
		case "updateerrorlogstatus":
			$zresponse = $wtwtools->updateErrorLogStatus($zerrorid, $zstatus);
			break;
		case "deletearchivederrorlog":
			$zresponse = $wtwtools->deleteArchivedErrorLog();
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
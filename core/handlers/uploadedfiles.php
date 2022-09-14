<?php
/* handlers recieve the form submittals from the javascript and route the data to the correct class functions for processing to and from the database */
/* this handler is for uploaded files functions */
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwuploads.php');
	global $wtwuploads;
	$zrequest = $wtwhandlers->openFilefromURL('php://input');
	$zrequest = json_decode($zrequest, TRUE);

	/* read in values */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	$zuploadobjectid = $wtwhandlers->getPost('uploadobjectid','');
	$zgroupid = $wtwhandlers->getPost('groupid','');
	$zobjectanimationid = $wtwhandlers->getPost('objectanimationid','');
	$zobjectfolder = $wtwhandlers->getPost('objectfolder','');
	$zobjectfilepart = $wtwhandlers->getPost('objectfilepart','');
	$zfilename = $wtwhandlers->getPost('filename','');
	$zitem = $wtwhandlers->getPost('item','');
	$zwebtype = $wtwhandlers->getPost('webtype','buildings');
	$zwebid = $wtwhandlers->getPost('webid','');
	$zscriptid = $wtwhandlers->getPost('scriptid','');
	$zscriptpath = $wtwhandlers->getPost('scriptpath','');
	$zactionzoneid = $wtwhandlers->getPost('actionzoneid','');
	$zuploadfile = $wtwhandlers->getFiles('wtw_uploadfile',null);
	$zuploadfiles = $wtwhandlers->getFiles('wtw_uploadfiles',null);

	/* select the function called */
	$zresponse = array();
	switch ($zfunction) {
		case "getuploadedfiles":
			$zresponse = $wtwuploads->getUploadedFiles();
			break;
		case "getuploadedfilenamedetails":
			$zresponse = $wtwuploads->getUploadedFileNameDetails($zuploadobjectid);
			break;
		case "getuploadedfilefilesdetails":
			$zresponse = $wtwuploads->getUploadedFileFilesDetails($zobjectfolder);
			break;
		case "uploadfile":
			$wtwuploads->uploadFile($zuploadfile);
			break;
		case "uploadfiles":
			$serror = $wtwuploads->uploadFiles($zuploadfiles, $zitem);
			$zresponse = array(
				'serror'=> $serror
			);
			break;
		case "uploadobjectfiles":
			$serror = $wtwuploads->uploadObjectFiles($zuploadfiles, $zobjectfilepart);
			$zresponse = array(
				'serror'=> $serror
			);
			break;
		case "deleteobjectfile":
			$wtwuploads->deleteObjectFile($zfilename, $zobjectfilepart);
			break;
		case "uploadjavascriptfiles":
			$serror = $wtwuploads->uploadJavaScriptFiles($zuploadfiles, $zwebtype, $zwebid, $zactionzoneid);
			$zresponse = array(
				'serror'=> $serror
			);
			break;
		case "deletejavascriptfile":	
			$serror = $wtwuploads->deleteJavaScriptFile($zwebtype, $zwebid, $zactionzoneid, $zscriptid, $zscriptpath);
			$zresponse = array(
				'serror'=> $serror
			);
			break;
		case "saveobjectgroup":
			$zresponse = $wtwuploads->saveObjectGroup($zuploadobjectid, $zgroupid);
			break;
	}

	/* set headers to keep data local to server */
	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	/* return the response from the function */
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-uploadedfiles.php=".$e->getMessage());
}
?>
<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	require_once(wtw_rootpath.'/core/functions/class_wtwuploads.php');
	global $wtwuploads;
	$zresults = file_get_contents('php://input');
	$zdata = json_decode($zresults, TRUE);

	$zfunction = null;
	$zuploadfile = null;
	$zuploadfiles = null;
	$zuploadobjectid = '';
	$zobjectanimationid = '';
	$zobjectfolder = '';
	$zobjectfilepart = '';
	$zfilename = '';
	$zitem = '';
	
	if (!empty($zdata) && isset($zdata)) {
		if (isset($zdata["function"])) {
			$zfunction = strtolower($zdata["function"]);
		}
		if (isset($zdata["uploadobjectid"])) {
			$zuploadobjectid = $zdata["uploadobjectid"];
		}
		if (isset($zdata["objectanimationid"])) {
			$zobjectanimationid = $zdata["objectanimationid"];
		}
		if (isset($zdata["objectfolder"])) {
			$zobjectfolder = $zdata["objectfolder"];
		}
		if (isset($zdata["objectfilepart"])) {
			$zobjectfilepart = $zdata["objectfilepart"];
		}
		if (isset($zdata["filename"])) {
			$zfilename = $zdata["filename"];
		}
	}
	if (!isset($zfunction)) {
		$zfunction = $_POST["function"];
		if (isset($_POST["objectfilepart"])) {
			$zobjectfilepart = $_POST["objectfilepart"];
		}
		if (isset($_POST["item"])) {
			$zitem = $_POST["item"];
		}
		if (isset($_FILES["wtw_uploadfile"])) {
			$zuploadfile = $_FILES["wtw_uploadfile"];
		}
		if (isset($_FILES["wtw_uploadfiles"])) {
			$zuploadfiles = $_FILES["wtw_uploadfiles"];
		}
	}

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
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-uploadedfiles.php=".$e->getMessage());
}
?>
<?php
require_once('../functions/class_wtwiframes.php');
global $wtwiframes;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwiframes->trackPageView($wtwiframes->domainurl."/core/iframes/uploadedfiles.php");
	$returnpage = '/core/iframes/uploadedfiles.php';

	
	$zitem = $wtwiframes->getVal("item","");	
	$zfileurl = $wtwiframes->contenturl;
	$zfilepath = $wtwiframes->contentpath."\\users";
	if ($_SERVER['REQUEST_METHOD']=='POST') {
		if (!file_exists($zfilepath)) {
			mkdir($zfilepath, 0777);
		}
		if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
			$zfilepath = $wtwiframes->contentpath."\\uploads\\users\\".$_SESSION['wtw_uploadpathid'];
			if (!file_exists($zfilepath)) {
				mkdir($zfilepath, 0777);
			}
			$zfilepath = $wtwiframes->contentpath."\\uploads\\users\\".$_SESSION['wtw_uploadpathid']."\\media";
			if (!file_exists($zfilepath)) {
				mkdir($zfilepath, 0777);
			}
			$zfileurl = $wtwiframes->contenturl."/uploads/users/".$_SESSION['wtw_uploadpathid']."/media/";
		}
		$zisvalid = 1;
		$zpastfilename = basename(strtolower($_FILES["wtw_fileToUpload"]["name"]));
		$zuploadfile = $zfilepath."\\". $zpastfilename;
		$zfileextension = pathinfo($zuploadfile,PATHINFO_EXTENSION);
		$zfilesize = $_FILES["wtw_fileToUpload"]["size"];
		$zfiletype = $_FILES["wtw_fileToUpload"]["type"];
		$zfilename = $wtwiframes->getRandomString(16,1).".".$zfileextension;
		$ztargetfile = $zfilepath."\\".$zfilename;
		if (file_exists($ztargetfile)) {
			echo "File already exists.";
			$zisvalid = 0;
		}
		if ($zfilesize > 128000000) {
			echo "Your file is too large.";
			$zisvalid = 0;
		}
		if(strtolower($zfileextension) != "babylon" && strtolower($zfileextension) != "gltf" && strtolower($zfileextension) != "glb") {
			echo "Only babylon, gltf, and glb files are allowed at this time.";
			$zisvalid = 0;
		}
		if ($zisvalid == 0) {
			echo "Your file was not uploaded.";
		} else {
			if (move_uploaded_file($_FILES["wtw_fileToUpload"]["tmp_name"], $ztargetfile)) {
				require_once('../functions/class_wtwuploads.php');
				global $wtwuploads;
				$wtwuploads->uploadObjectFileToDb($ztargetfile, $zpastfilename, $zfileextension, $zfiletype);
			} else {
				echo "There was an error uploading your file.";
			}
		}
	}
	
} catch (Exception $e) {
	$wtwiframes->serror("core-iframes-uploadedfiles.php=".$e->getMessage());
} ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Walk the Web - Select Uploaded Objects</title>
	<link rel="stylesheet" type="text/css" href="/core/styles/wtw_admin.css" />
	<link rel="stylesheet" type="text/css" href="/core/styles/wtw_core.css" />
    <script src="/core/scripts/prime/wtw_common_iframe.js"></script>
	<style type="text/css">
		body, html { 
			background-color: white;
		}
	</style>
</head>
<body style="overflow-y:scroll;">
	<form id="wtw_form1" name="wtw_form1" action="uploadedfiles.php?item=<?php echo $zitem ?>" method="post" enctype="multipart/form-data">
		<input type="button" id="wtw_buploadcommunityimage" name="wtw_buploadcommunityimage" value="Upload Image or Video" onclick="dGet('wtw_fileToUpload').click(); return (false);" style="cursor: pointer;display:none;visibility:hidden;" />
		<div style="display:none;visibility:hidden;">
			<input type="file" name="wtw_fileToUpload" id="wtw_fileToUpload" onchange="window.parent.dGet('wtw_bstartimageupload').innerHTML = 'Uploading...';window.parent.dGet('wtw_bstartimageupload').onclick='';dGet('wtw_submit').click();">
			<input type="hidden" id="wtw_titem" name="wtw_titem" value="<?php echo $zitem; ?>" />
			<input type="submit" value="Upload Image" name="wtw_submit" id="wtw_submit">
		</div>
		<div id="wtw_selectimageformscroll4" class="formsnocroll" style="white-space:normal;">
<?php
	if (!empty($wtwiframes->userid) && isset($wtwiframes->userid)) {
		$zresults = $wtwiframes->query("
			select *
			from ".wtw_tableprefix."uploadobjects
			where userid='".$wtwiframes->userid."'
				or stock=1
			order by createdate desc, objectfile, objectfolder, uploadobjectid;");
		foreach ($zresults as $zrow) {
			$zcreatedate = $zrow["createdate"];
			$zcreatedate = date('m/d/Y', strtotime($zcreatedate));
			$zlinktext = "Edit";
			if ($zrow["stock"] == 1) {
				$zlinktext = "View";
			}
			if ($zitem == "3dobject") {
				$zlinktext = "Select";
				echo ("<div class='wtw-objectcontainer'><div class='wtw-objectfile' onclick=\"window.parent.WTW.setSelectObject('".$zrow["uploadobjectid"]."','".$zrow["objectfolder"]."','".$zrow["objectfile"]."');\">".$zrow["objectfile"]."</div><div class='wtw-objectfolder'>".$zrow["objectfolder"]."<br /><br /><span style='color:gray;'>Uploaded on </span>".$zcreatedate."<br /><br /><div class='wtw-rightbutton' onclick=\"window.parent.WTW.setSelectObject('".$zrow["uploadobjectid"]."','".$zrow["objectfolder"]."','".$zrow["objectfile"]."');\">".$zlinktext."</div><div class='wtw-rightbutton' onclick=\"window.parent.WTW.openObjectPageForm('".$zrow["uploadobjectid"]."','".$zrow["objectfile"]."');\">Edit</div><div class='wtw-clear'></div></div></div>");
			} else {
				echo ("<div class='wtw-objectcontainer'><div class='wtw-objectfile' onclick=\"window.parent.WTW.openObjectPageForm('".$zrow["uploadobjectid"]."','".$zrow["objectfile"]."');\">".$zrow["objectfile"]."</div><div class='wtw-objectfolder'>".$zrow["objectfolder"]."<br /><br /><span style='color:gray;'>Uploaded on </span>".$zcreatedate."<br /><br /><div class='wtw-rightbutton' onclick=\"window.parent.WTW.openObjectPageForm('".$zrow["uploadobjectid"]."','".$zrow["objectfile"]."');\">".$zlinktext."</div><div class='wtw-clear'></div></div></div>");
			}
		}
	}
?>		</div>
	</form>
</body>
<script type="text/javascript">
	window.onload = function() {
<?php	if ($_SERVER['REQUEST_METHOD']=='POST') { ?>
			WTW.resetUploadButton();
<?php	} ?>
	}
</script>
</html>	
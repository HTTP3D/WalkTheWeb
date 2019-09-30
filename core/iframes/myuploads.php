<?php
require_once('../functions/class_wtwiframes.php');
global $wtwiframes;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwiframes->trackPageView($wtwiframes->domainurl."/core/iframes/myuploads.php");

	$zitem = $wtwiframes->getVal("item","");
	$zcategory = $wtwiframes->getVal("category","");
	$zhide = $wtwiframes->getVal("hide","0");

	if ($_SERVER['REQUEST_METHOD']=='POST') {
		require_once('../functions/class_wtwuploads.php');
		global $wtwuploads;
		$zfileurl = $wtwiframes->contenturl;
		$zfilepath = $wtwiframes->contentpath."\\users";
		if (!file_exists($zfilepath)) {
			mkdir($zfilepath, 0777);
		}
		if(isset($wtwiframes->userid) && !empty($wtwiframes->userid)) {
			$zfilepath = $wtwiframes->contentpath."\\users\\".$wtwiframes->userid;
			if (!file_exists($zfilepath)) {
				mkdir($zfilepath, 0777);
			}
			$zfilepath = $wtwiframes->contentpath."\\users\\".$wtwiframes->userid."\\media";
			if (!file_exists($zfilepath)) {
				mkdir($zfilepath, 0777);
			}
			$zfileurl = $wtwiframes->contenturl."/users/".$wtwiframes->userid."/media/";
		}
		$wtw_hideimageid = "";
		if(isset($_POST["wtw_hideimageid"]) && !empty($_POST["wtw_hideimageid"])) {
			$wtw_hideimageid = $_POST["wtw_hideimageid"];
		}
		if ($wtw_hideimageid != "") {
			$wtwuploads->setUploadVisibility($wtw_hideimageid,1);
		} else {
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
			if((!strpos($_POST["wtw_titem"], 'sound') > -1) && (!strpos($_POST["wtw_titem"], 'audio') > -1) && strtolower($zfileextension) != "jpg" && strtolower($zfileextension) != "png" && strtolower($zfileextension) != "jpeg" && strtolower($zfileextension) != "gif" && strtolower($zfileextension) != "mp4" && strtolower($zfileextension) != "webm" && strtolower($zfileextension) != "ogv") {
				echo "Only JPG, JPEG, PNG, GIF, MP4, OGV, and WEBM files are allowed.";
				$zisvalid = 0;
			} elseif((strpos($_POST["wtw_titem"], 'sound') > -1) && strtolower($zfileextension) != "wav" && strtolower($zfileextension) != "mp3" && strtolower($zfileextension) != "wma" && strtolower($zfileextension) != "m4a") {
				echo "Only WAV, MP3, M4A, and WMA files are allowed.";
				$zisvalid = 0;
			}
			if ($zisvalid == 0) {
				echo "Your file was not uploaded.";
			} else {
				if (move_uploaded_file($_FILES["wtw_fileToUpload"]["tmp_name"], $ztargetfile)) {
					$wtwuploads->uploadFileToDb($ztargetfile, '', $zpastfilename, $zfileextension, $zfiletype, '1');
				} else {
					echo "There was an error uploading your file.";
				}
			}
		}
	}
} catch (Exception $e) {
	$wtwiframes->serror("core-iframes-myuploads.php=".$e->getMessage());
} ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Walk the Web - Select My Images</title>
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
	<form id="wtw_form1" name="wtw_form1" action="myuploads.php?item=<?php echo $zitem; ?>&category=<?php echo $zcategory; ?>&hide=<?php echo $zhide; ?>" method="post" enctype="multipart/form-data">
		<input type="button" id="wtw_buploadcommunityimage" name="wtw_buploadcommunityimage" value="Upload Image or Video" onclick="dGet('wtw_hideimageid').value='';dGet('wtw_fileToUpload').click(); return (false);" style="cursor: pointer;display:none;visibility:hidden;" />
		<div style="display:none;visibility:hidden;">
			<input type="file" name="wtw_fileToUpload" id="wtw_fileToUpload" onchange="window.parent.dGet('wtw_bstartimageupload').innerHTML = 'Uploading...';window.parent.dGet('wtw_bstartimageupload').onclick='';dGet('wtw_submit').click();">
			<input type="hidden" name="wtw_hideimageid" id="wtw_hideimageid" value="" />
			<input type="submit" value="Upload Image" name="wtw_submit" id="wtw_submit">
		</div>
<?php
	if (!empty($wtwiframes->userid) && isset($wtwiframes->userid)) {
		$zresults = $wtwiframes->query("
			select u1.*,
				case when u1.websizeid='' then ''
					else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=u1.websizeid limit 1)
				end as websizepath,
				case when u1.originalid='' then ''
					else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=u1.originalid limit 1)
				end as originalpath
			from ".wtw_tableprefix."uploads u1
			where u1.deleted=0
				and u1.userid='".$wtwiframes->userid."'
				and u1.hide=".$zhide."
				and case when '".$zcategory."' = 'image' then 
						(u1.thumbnailid = u1.uploadid and u1.filetype like '%image%')
					when '".$zcategory."' = 'video' then
						(u1.filetype like '%video%')
					when '".$zcategory."' = 'audio' then
						(u1.filetype like '%audio%')
					when '".$zcategory."' = 'doc' then
						(u1.filetype like '%pdf%' 
							or u1.filetype like '%doc%' 
							or u1.filetype like '%log%' 
							or u1.filetype like '%txt%' 
							or u1.filetype like '%rtf%')
					else
						(u1.thumbnailid = u1.uploadid
						and u1.filetype like '%image%')
						or (u1.filetype like '%video%')
						or (u1.filetype like '%audio%')
					end
			order by u1.updatedate desc, u1.createdate desc, u1.filename, u1.uploadid;");
		foreach ($zresults as $zrow) {
			$icononclick = "";
			if(isset($zitem) && !empty($zitem)) {
				if ($zitem == 'blogimage') {
					$icononclick = "onclick=\"parent.WTW.setSelectImageID('".$zrow["originalid"]."','".$zrow["websizeid"]."','".$zrow["websizepath"]."','".$zrow["thumbnailid"]."','".$zrow["fileextension"]."',".$zrow["imagewidth"].",".$zrow["imageheight"].",".$zrow["filesize"].",'".$zrow["filetitle"]."','".$zrow["filename"]."');\"";
				} else {
					$icononclick = "onclick=\"parent.WTW.setSelectFileID(this,'".$zrow["uploadid"]."','".$zrow["originalid"]."','".$zrow["websizeid"]."','".$zrow["fileextension"]."',".$zrow["filesize"].",'".$zrow["filetitle"]."','".$zrow["filename"]."','".$zrow["originalpath"]."');\"";
				}
			} else {
				$icononclick = "onclick=\"parent.WTW.openFullPageForm('mediapage','".$zcategory."','".$zrow["uploadid"]."');\"";
			}
			$zfilehint = $zrow["filetitle"];
			if (strlen($zfilehint) > 13) {
				$zfilehint = substr($zfilehint, 0, 10)."...";
			}
			if (strpos($zrow["filetype"],'image') !== false && !empty($zrow["filepath"]) && isset($zrow["filepath"])) {
				echo("<div class='wtw-sampleheightmapdiv' onmouseover=\"dGet('wtw_div".$zrow["uploadid"]."').style.visibility='visible';\" onmouseout=\"dGet('wtw_div".$zrow["uploadid"]."').style.visibility='hidden';\"><img id='wtw_file".$zrow["websizeid"]."' class='wtw-sampleheightmap' ".$icononclick." src=\"".$zrow["filepath"]."\" style=\"cursor:pointer;margin-left:5px;margin-right:5px;margin-top:5px;margin-bottom:0px;display:inline-block;\" title=\"".$zrow["filetitle"]."\" alt=\"".$zrow["filetitle"]."\" /><div class='wtw-smallfilename'>".$zfilehint."</div><div id='wtw_div".$zrow["uploadid"]."' style='visibility:hidden;'><div style='text-align:center;font-size:.6em;padding:0px;margin-top:0px;margin-bottom:0px;cursor:pointer;display:inline-block;' onclick=\"this.innerHTML='Saving...';this.style.color='red';dGet('wtw_file".$zrow["websizeid"]."').style.borderColor='red';dGet('wtw_hideimageid').value='".$zrow["thumbnailid"]."';dGet('wtw_submit').click();\"><img src='/content/system/images/iconhide.png' alt='Hide' title='Hide' class='wtw-smallicon' /></div><img src='/content/system/images/iconinfo.png' alt='Information' title='Information' class='wtw-smallicon' onclick=\"parent.WTW.openFullPageForm('mediapage','".$zcategory."','".$zrow["uploadid"]."');\"\ /></div></div>");
			} else if (strpos($zrow["filetype"],'image') !== false) {
				echo("<div class='wtw-sampleheightmapdiv' onmouseover=\"dGet('wtw_div".$zrow["uploadid"]."').style.visibility='visible';\" onmouseout=\"dGet('wtw_div".$zrow["uploadid"]."').style.visibility='hidden';\"><img id='wtw_file".$zrow["websizeid"]."' class='wtw-sampleheightmap' ".$icononclick." src=\"data:".$zrow["filetype"].";base64,".base64_encode($zrow["filedata"])."\" style=\"cursor:pointer;margin-left:5px;margin-right:5px;margin-top:5px;margin-bottom:0px;display:inline-block;\" title=\"".$zrow["filetitle"]."\" alt=\"".$zrow["filetitle"]."\" /><div class='wtw-smallfilename'>".$zfilehint."</div><div id='wtw_div".$zrow["uploadid"]."' style='visibility:hidden;'><div style='text-align:center;font-size:.6em;padding:0px;margin-top:0px;margin-bottom:0px;cursor:pointer;display:inline-block;' onclick=\"this.innerHTML='Saving...';this.style.color='red';dGet('wtw_file".$zrow["websizeid"]."').style.borderColor='red';dGet('wtw_hideimageid').value='".$zrow["thumbnailid"]."';dGet('wtw_submit').click();\"><img src='/content/system/images/iconhide.png' alt='Hide' title='Hide' class='wtw-smallicon' /></div><img src='/content/system/images/iconinfo.png' alt='Information' title='Information' class='wtw-smallicon' onclick=\"parent.WTW.openFullPageForm('mediapage','".$zcategory."','".$zrow["uploadid"]."');\"\ /></div></div>");
			} else if (strpos($zrow["filetype"],'audio') !== false) {
				echo("<div class='wtw-sampleheightmapdiv' onmouseover=\"dGet('wtw_div".$zrow["uploadid"]."').style.visibility='visible';\" onmouseout=\"dGet('wtw_div".$zrow["uploadid"]."').style.visibility='hidden';\"><img id='wtw_sound".$zrow["uploadid"]."' class='wtw-sampleheightmap' ".$icononclick." src=\"/content/system/images/iconaudio.png\" style=\"cursor:pointer;margin-left:5px;margin-right:5px;margin-top:5px;margin-bottom:0px;display:inline-block;\" title=\"".$zrow["filetitle"]."\" alt=\"".$zrow["filetitle"]."\" /><div class='wtw-smallfilename'>".$zfilehint."</div><div id='wtw_div".$zrow["uploadid"]."' style='visibility:hidden;'><div style='text-align:center;font-size:.6em;padding:0px;margin-top:0px;margin-bottom:0px;cursor:pointer;display:inline-block;' onclick=\"this.innerHTML='Saving...';this.style.color='red';dGet('wtw_file".$zrow["uploadid"]."').style.borderColor='red';dGet('wtw_hideimageid').value='".$zrow["uploadid"]."';dGet('wtw_submit').click();\"><img src='/content/system/images/iconhide.png' alt='Hide' title='Hide' class='wtw-smallicon' /></div><img src='/content/system/images/iconinfo.png' alt='Information' title='Information' class='wtw-smallicon' onclick=\"parent.WTW.openFullPageForm('mediapage','".$zcategory."','".$zrow["uploadid"]."');\" /></div></div>");
			} else if (strpos($zrow["filetype"],'video') !== false) {
				echo("<div class='wtw-sampleheightmapdiv' onmouseover=\"dGet('wtw_div".$zrow["uploadid"]."').style.visibility='visible';\" onmouseout=\"dGet('wtw_div".$zrow["uploadid"]."').style.visibility='hidden';\"><img id='wtw_video".$zrow["uploadid"]."' class='wtw-sampleheightmap' ".$icononclick." src=\"/content/system/images/iconvideo.png\" style=\"cursor:pointer;margin-left:5px;margin-right:5px;margin-top:5px;margin-bottom:0px;display:inline-block;\" title=\"".$zrow["filetitle"]."\" alt=\"".$zrow["filetitle"]."\" /><div class='wtw-smallfilename'>".$zfilehint."</div><div id='wtw_div".$zrow["uploadid"]."' style='visibility:hidden;'><div style='text-align:center;font-size:.6em;padding:0px;margin-top:0px;margin-bottom:0px;cursor:pointer;display:inline-block;' onclick=\"this.innerHTML='Saving...';this.style.color='red';dGet('wtw_file".$zrow["uploadid"]."').style.borderColor='red';dGet('wtw_hideimageid').value='".$zrow["uploadid"]."';dGet('wtw_submit').click();\"><img src='/content/system/images/iconhide.png' alt='Hide' title='Hide' class='wtw-smallicon' /></div><img src='/content/system/images/iconinfo.png' alt='Information' title='Information' class='wtw-smallicon' onclick=\"parent.WTW.openFullPageForm('mediapage','".$zcategory."','".$zrow["uploadid"]."');\" /></div></div>");
			} else {
				echo("<div class='wtw-sampleheightmapdiv' onmouseover=\"dGet('wtw_div".$zrow["uploadid"]."').style.visibility='visible';\" onmouseout=\"dGet('wtw_div".$zrow["uploadid"]."').style.visibility='hidden';\"><img id='wtw_doc".$zrow["uploadid"]."' class='wtw-sampleheightmap' ".$icononclick." src=\"/content/system/images/icondoc.png\" style=\"cursor:pointer;margin-left:5px;margin-right:5px;margin-top:5px;margin-bottom:0px;display:inline-block;\" title=\"".$zrow["filetitle"]."\" alt=\"".$zrow["filetitle"]."\" /><div class='wtw-smallfilename'>".$zfilehint."</div><div id='wtw_div".$zrow["uploadid"]."' style='visibility:hidden;'><div style='text-align:center;font-size:.6em;padding:0px;margin-top:0px;margin-bottom:0px;cursor:pointer;display:inline-block;' onclick=\"this.innerHTML='Saving...';this.style.color='red';dGet('wtw_file".$zrow["uploadid"]."').style.borderColor='red';dGet('wtw_hideimageid').value='".$zrow["uploadid"]."';dGet('wtw_submit').click();\"><img src='/content/system/images/iconhide.png' alt='Hide' title='Hide' class='wtw-smallicon' /></div><img src='/content/system/images/iconinfo.png' alt='Information' title='Information' class='wtw-smallicon' onclick=\"parent.WTW.openFullPageForm('mediapage','".$zcategory."','".$zrow["uploadid"]."');\" /></div></div>");
			}
		}
		if (count($zresults) == 0) {
			switch ($zcategory) {
				case 'image':
					echo "<div class='wtw-warningmessage'><h1 class='wtw-red'>No Uploaded Images Found</h1>Use the <strong>Stock Images</strong> button above or<br /><br />the <strong>Upload</strong> button on the top right to <strong>Add an Image</strong>.<br /><br /></div>";
					break;
				case 'video':
					echo "<div class='wtw-warningmessage'><h1 class='wtw-red'>No Uploaded Videos Found</h1>Use the <strong>Upload</strong> button on the top right to <strong>Add a Video File</strong>.<br /><br /></div>";
					break;
				case 'audio':
					echo "<div class='wtw-warningmessage'><h1 class='wtw-red'>No Uploaded Sound Files Found</h1>Use the <strong>Upload</strong> button on the top right to <strong>Add an Audio File</strong>.<br /><br /></div>";
					break;
				case 'doc':
					echo "<div class='wtw-warningmessage'><h1 class='wtw-red'>No Uploaded Document Files Found</h1>Use the <strong>Upload</strong> button on the top right to <strong>Add a Document File</strong>.<br /><br /></div>";
					break;
				case 'object':
					echo "<div class='wtw-warningmessage'><h1 class='wtw-red'>No 3D Object Files Found</h1>Use the <strong>Upload</strong> button on the top right to <strong>Add a 3D Object File</strong>.<br /><br /></div>";
					break;
				default:
					echo "<div class='wtw-warningmessage'><h1 class='wtw-red'>No Files Found</h1>Use the <strong>Upload</strong> button on the top right to <strong>Add a File</strong>.<br /><br /></div>";
					break;
			}
		}

	}
?>
		<input type="hidden" id="wtw_titem" name="wtw_titem" value="<?php echo $zitem; ?>" />
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
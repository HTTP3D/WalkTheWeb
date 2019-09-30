<?php
require_once('../functions/class_wtwiframes.php');
global $wtwiframes;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwiframes->trackPageView($wtwiframes->domainurl."/core/iframes/imagesstock.php");

	$zitem = $wtwiframes->getVal("item","");
} catch (Exception $e) {
	$wtwiframes->serror("core-iframes-imagesstock.php=".$e->getMessage());
} ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Walk the Web - Select Stock Images</title>
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
	<div id="wtw_selectimageformscroll3" class="formsnocroll" style="white-space:normal;">
<?php
	if (strpos($zitem, 'sound')) {
		$zresults = $wtwiframes->query("
			select * 
			from ".wtw_tableprefix."uploads
			where deleted=0
				and stock='1'
				and uploads.filetype like '%audio%'
			order by updatedate desc, createdate desc, filename, uploadid;");
		foreach ($zresults as $zrow) {
			$zfilehint = $zrow["filetitle"];
			if (strlen($zfilehint) > 13) {
				$zfilehint = substr($zfilehint, 0, 10)."...";
			}
			echo("<div class='wtw-sampleheightmapdiv'><img id='wtw_image".$zrow["uploadid"]."' class='wtw-sampleheightmap' onclick=\"parent.WTW.setSelectFileID(this,'".$zrow["uploadid"]."','".$zrow["originalid"]."','".$zrow["websizeid"]."','".$zrow["fileextension"]."',".$zrow["filesize"].",'".$zrow["filetitle"]."','".$zrow["filename"]."','".$zrow["originalpath"]."');\" src=\"/content/system/images/3dsound.png\" style=\"cursor:pointer;margin:5px;display:inline-block;\" title=\"".$zrow["filetitle"]."\" alt=\"".$zrow["filetitle"]."\" /><div class='wtw-smallfilename'>".$zfilehint."</div></div>");
		}
	} else {
		$zresults = $wtwiframes->query("
			select u1.*,
				u2.filepath as websizepath,
				u3.filepath as originalpath
			from ".wtw_tableprefix."uploads u1
				left join ".wtw_tableprefix."uploads u2
					on u1.websizeid=u2.uploadid
				left join ".wtw_tableprefix."uploads u3
					on u1.originalid=u3.uploadid
			where u1.deleted=0
				and u1.stock='1'
				and u1.thumbnailid = u1.uploadid
				and u1.filetype like '%image%'
			order by u1.updatedate desc, u1.createdate desc, u1.filename, u1.uploadid;");
		foreach ($zresults as $zrow) {
			$zfilehint = $zrow["filetitle"];
			if (strlen($zfilehint) > 13) {
				$zfilehint = substr($zfilehint, 0, 10)."...";
			}
			if (!empty($zrow["filepath"]) && isset($zrow["filepath"])) {
				echo("<div class='wtw-sampleheightmapdiv'><img id='wtw_image".$zrow["websizeid"]."' class='wtw-sampleheightmap' onclick=\"parent.WTW.setSelectFileID(this,'".$zrow["uploadid"]."','".$zrow["originalid"]."','".$zrow["websizeid"]."','".$zrow["fileextension"]."',".$zrow["filesize"].",'".$zrow["filetitle"]."','".$zrow["filename"]."','".$zrow["originalpath"]."');\" src=\"".$zrow["filepath"]."\" style=\"cursor:pointer;margin:5px;display:inline-block;\" title=\"".$zrow["filetitle"]."\" alt=\"".$zrow["filetitle"]."\" /><div class='wtw-smallfilename'>".$zfilehint."</div></div>");
			} else {
				echo("<div class='wtw-sampleheightmapdiv'><img id='wtw_image".$zrow["websizeid"]."' class='wtw-sampleheightmap' onclick=\"parent.WTW.setSelectFileID(this,'".$zrow["uploadid"]."','".$zrow["originalid"]."','".$zrow["websizeid"]."','".$zrow["fileextension"]."',".$zrow["filesize"].",'".$zrow["filetitle"]."','".$zrow["filename"]."','".$zrow["originalpath"]."');\" src=\"data:".$zrow["filetype"].";base64,".base64_encode($zrow["filedata"])."\" style=\"cursor:pointer;margin:5px;display:inline-block;\" title=\"".$zrow["filetitle"]."\" alt=\"".$zrow["filetitle"]."\" /><div class='wtw-smallfilename'>".$zfilehint."</div></div>");
			}
		}
	}
?>	</div>
</body>
</html>	
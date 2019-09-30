<?php
require_once('../functions/class_wtwiframes.php');
global $wtwiframes;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwiframes->trackPageView($wtwiframes->domainurl."/core/iframes/imagesinuse.php");

	$zcommunityid = $wtwiframes->getVal("communityid","");
	$zbuildingid = $wtwiframes->getVal("buildingid","");
	$zthingid = $wtwiframes->getVal("thingid","");
	
} catch (Exception $e) {
	$wtwiframes->serror("core-iframes-imagesinuse.php=".$e->getMessage());
} ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Walk the Web - Select Community Images</title>
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
	<div id="wtw_selectimageformscroll1" class="formnoscroll" style="white-space:normal;">
<?php
	if ($wtwiframes->checkUpdateAccess($zcommunityid, $zbuildingid, $zthingid)) {
		$zresults = "";
		$zmoldgroup = "";
		$ztable = "";
		$zwebid = "";
		if (!empty($zcommunityid) && isset($zcommunityid)) {
			$zmoldgroup = "community";
			$ztable = "communities";
			$zwebid = $zcommunityid;
		} else if (!empty($zbuildingid) && isset($zbuildingid)) {
			$zmoldgroup = "building";
			$ztable = "buildings";
			$zwebid = $zbuildingid;
		} else if (!empty($zthingid) && isset($zthingid)) {
			$zmoldgroup = "thing";
			$ztable = "things";
			$zwebid = $zthingid;
		}
		$zresults = $wtwiframes->query("
			select uploads.uploadid,
				uploads.originalid,
				uploads.websizeid,
				uploads.thumbnailid,
				uploads.userid,
				uploads.filetitle,
				uploads.filename,
				uploads.fileextension,
				uploads.filesize,
				uploads.filetype,
				uploads.filepath,
				u2.filepath as websizepath,
				u3.filepath as originalpath,
				max(uploads.filedata) as filedata,
				uploads.imagewidth,
				uploads.imageheight,
				uploads.stock,
				uploads.createdate,
				uploads.updatedate,
				uploads.updateuserid
			from ".wtw_tableprefix."uploads uploads
					inner join (select u1.thumbnailid  
						from ".wtw_tableprefix."uploads u1 
							inner join (select t1.textureid, t1.texturehoverid, t1.heightmapid, w1.imageid, w1.imagehoverid 
								from ".wtw_tableprefix.$zmoldgroup."molds t1
								left join ".wtw_tableprefix."webimages w1 
									on t1.".$zmoldgroup."moldid=w1.".$zmoldgroup."moldid 
								where t1.".$zmoldgroup."id='".$zwebid."' 
									and (not t1.textureid='' 
									or not t1.texturehoverid='' 
									or not t1.heightmapid=''
									or not w1.imageid='' 
									or not w1.imagehoverid='')) t2
								on u1.thumbnailid = t2.textureid
								or u1.thumbnailid = t2.texturehoverid
								or u1.thumbnailid = t2.heightmapid
								or u1.thumbnailid = t2.imageid
								or u1.thumbnailid = t2.imagehoverid
								or u1.websizeid = t2.textureid
								or u1.websizeid = t2.texturehoverid
								or u1.websizeid = t2.heightmapid
								or u1.websizeid = t2.imageid
								or u1.websizeid = t2.imagehoverid
								or u1.originalid = t2.textureid
								or u1.originalid = t2.texturehoverid
								or u1.originalid = t2.heightmapid
								or u1.originalid = t2.imageid
								or u1.originalid = t2.imagehoverid
						where u1.deleted=0
							and u1.filetype like '%image%'
							and (not u1.thumbnailid='')
						group by u1.thumbnailid) thumbnails
					on uploads.thumbnailid=thumbnails.thumbnailid
				left join ".wtw_tableprefix."uploads u2
					on uploads.websizeid=u2.uploadid
				left join ".wtw_tableprefix."uploads u3
					on uploads.originalid=u3.uploadid
			where
				uploads.uploadid=uploads.thumbnailid
			group by uploads.uploadid,
				uploads.originalid,
				uploads.websizeid,
				uploads.thumbnailid,
				uploads.userid,
				uploads.filetitle,
				uploads.filename,
				uploads.fileextension,
				uploads.filesize,
				uploads.filetype,
				uploads.filepath,
				u2.filepath,
				u3.filepath,
				uploads.imagewidth,
				uploads.imageheight,
				uploads.stock,
				uploads.createdate,
				uploads.updatedate,
				uploads.updateuserid;");
		foreach ($zresults as $zrow) {
			$zfilehint = $zrow["filetitle"];
			if (strlen($zfilehint) > 13) {
				$zfilehint = substr($zfilehint, 0, 10)."...";
			}
			if (!empty($zrow["filepath"]) && isset($zrow["filepath"])) {
				echo("<div class='wtw-sampleheightmapdiv'><img id='wtw_image".$zrow["websizeid"]."' class='wtw-sampleheightmap' onclick=\"parent.WTW.setSelectImageID('".$zrow["originalid"]."','".$zrow["websizeid"]."','".$zrow["websizepath"]."','".$zrow["thumbnailid"]."','".$zrow["fileextension"]."',".$zrow["imagewidth"].",".$zrow["imageheight"].",".$zrow["filesize"].",'".$zrow["filetitle"]."','".$zrow["filename"]."');\" src=\"".$zrow["filepath"]."\" style=\"cursor:pointer;margin:5px;display:inline-block;\" title=\"".$zrow["filetitle"]."\" alt=\"".$zrow["filetitle"]."\" /><div class='wtw-smallfilename'>".$zfilehint."</div></div>");
			} else {
				echo("<div class='wtw-sampleheightmapdiv'><img id='wtw_image".$zrow["websizeid"]."' class='wtw-sampleheightmap' onclick=\"parent.WTW.setSelectImageID('".$zrow["originalid"]."','".$zrow["websizeid"]."','".$zrow["websizepath"]."','".$zrow["thumbnailid"]."','".$zrow["fileextension"]."',".$zrow["imagewidth"].",".$zrow["imageheight"].",".$zrow["filesize"].",'".$zrow["filetitle"]."','".$zrow["filename"]."');\" src=\"data:".$zrow["filetype"].";base64,".base64_encode($zrow["filedata"])."\" style=\"cursor:pointer;margin:5px;display:inline-block;\" title=\"".$zrow["filetitle"]."\" alt=\"".$zrow["filetitle"]."\" /><div class='wtw-smallfilename'>".$zfilehint."</div></div>");
			}
		}
	}
?>	</div>
</body>
</html>	
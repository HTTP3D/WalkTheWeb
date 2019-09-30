<?php
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/uploadmedia.php");
	
	/* get values from querystring or session */
	$zuploadid = $wtwconnect->getVal('uploadid','');

	/* select upload file data, return more info */
	$zresults = $wtwconnect->query("
		select u1.*,
			u2.uploadid as originalid2,
			u2.filepath as originalpath,
			u2.filedata as originaldata,
			u2.filesize as originalsize,
			u2.imagewidth as originalwidth,
			u2.imageheight as originalheight,
			u3.uploadid as websizeid2,
			u3.filepath as websizepath,
			u3.filedata as websizedata,
			u3.filesize as websizesize,
			u3.imagewidth as websizewidth,
			u3.imageheight as websizeheight
		from ".wtw_tableprefix."uploads u1 
			left join ".wtw_tableprefix."uploads u2
				on u1.originalid=u2.uploadid
			left join ".wtw_tableprefix."uploads u3
				on u1.websizeid=u3.uploadid
		where u1.uploadid='".$zuploadid."'
		and u1.deleted=0;");
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$i = 0;
	$zresponse = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$websize = array(
			'id'=> '',
			'path' => '',
			'size' => '',
			'width' => '',
			'height' => '',
			'data'=> ''
		);
		$original = array(
			'id'=> '',
			'path' => '',
			'size' => '',
			'width' => '',
			'height' => '',
			'data'=> ''
		);
		$zuploadinfo = array(
			'title' => $zrow["filetitle"],
			'name' => $zrow["filename"],
			'extension' => $zrow["fileextension"],
			'type' => $zrow["filetype"],
			'createdate' => $zrow["createdate"],
			'createuserid' => $zrow["createuserid"],
			'updatedate' => $zrow["updatedate"],
			'updateuserid' => $zrow["updateuserid"],
			'deleteddate' => $zrow["deleteddate"],
			'deleteduserid' => $zrow["deleteduserid"],
			'hide' => $zrow["hide"],
			'hideuserid' => $zrow["hideuserid"],
			'hidedate' => $zrow["hidedate"],
			'stock' => $zrow["stock"]
		);
		$thumbnail = array(
			'id'=> $zrow["thumbnailid"],
			'path' => $zrow["filepath"],
			'size' => $zrow["filesize"],
			'width' => $zrow["imagewidth"],
			'height' => $zrow["imageheight"],
			'data'=> "data:".$zrow["filetype"].";base64,".addslashes(base64_encode($zrow["filedata"])),
			'dataaudio'=> addslashes(base64_encode($zrow["filedata"]))
		);
		if (!empty($zrow["websizeid2"])) {
			$websize = array(
				'id'=> $zrow["websizeid"],
				'path' => $zrow["websizepath"],
				'size' => $zrow["websizesize"],
				'width' => $zrow["websizewidth"],
				'height' => $zrow["websizeheight"],
				'data'=> "data:".$zrow["filetype"].";base64,".addslashes(base64_encode($zrow["websizedata"]))
			);
		}
		if (!empty($zrow["originalid2"])) {
			$original = array(
				'id'=> $zrow["originalid"],
				'path' => $zrow["originalpath"],
				'size' => $zrow["originalsize"],
				'width' => $zrow["originalwidth"],
				'height' => $zrow["originalheight"],
				'data'=> "data:".$zrow["filetype"].";base64,".addslashes(base64_encode($zrow["originaldata"]))
			);
		}
		$zresponse[$i] = array(
			'uploadinfo'=> $zuploadinfo,
			'id'=> $zrow["uploadid"],
			'uploadid'=> $zrow["uploadid"],
			'thumbnail'=> $thumbnail,
			'websize'=> $websize,
			'original'=> $original,
			'userid'=> $zrow["userid"]
		);
		$i += 1;
	}
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-uploadmedia.php=".$e->getMessage());
}
?>

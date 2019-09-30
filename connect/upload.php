<?php
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/upload.php");
	
	/* get values from querystring or session */
	$zuploadid = $wtwconnect->getVal('uploadid','');
	$setid = $wtwconnect->getVal('setid','');

	/* select upload file data */
	$zresults = $wtwconnect->query("
		select * 
		from ".wtw_tableprefix."uploads
		where uploadid='".$zuploadid."'
		and deleted=0;");
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$i = 0;
	$zresponse = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zuploadinfo = array(
			'title' => $zrow["filetitle"],
			'name' => $zrow["filename"],
			'extension' => $zrow["fileextension"],
			'type' => $zrow["filetype"],
			'size' => $zrow["filesize"],
			'width' => $zrow["imagewidth"],
			'height' => $zrow["imageheight"]
		);
		$zresponse[$i] = array(
			'uploadinfo'=> $zuploadinfo,
			'id'=> $zrow["uploadid"],
			'uploadid'=> $zrow["uploadid"],
			'originalid'=> $zrow["originalid"],
			'websizeid'=> $zrow["websizeid"],
			'thumbnailid'=> $zrow["thumbnailid"],
			'filepath'=> $zrow["filepath"],
			'data'=> "data:".$zrow["filetype"].";base64,".addslashes(base64_encode($zrow["filedata"])),
			'dataaudio'=> addslashes(base64_encode($zrow["filedata"])),
			'userid'=> $zrow["userid"],
			'queue'=> '1',
			'setid'=> $setid
		);
		$i += 1;
	}
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-upload.php=".$e->getMessage());
}
?>

<?php
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/sound.php");
	
	/* get values from querystring or session */
	$zsoundid = $wtwconnect->getVal('soundid','');

	/* select building molds that have been deleted */
	$zresults = $wtwconnect->query("
		select * from ".wtw_tableprefix."uploads
		where uploadid='".$zsoundid."'
		and deleted=0 limit 1;");

	header('Access-Control-Allow-Origin: *');
	foreach ($zresults as $zrow) {
		header('Content-Transfer-Encoding: binary');
		header('Accept-Ranges: bytes');
		header('Cache-Control: no-cache');
		header("Content-Length: ".$zrow["filesize"]);
		header("Content-type: ".$zrow["filetype"]);
		//header("Content-Disposition: attachment; filename=".$zrow["filename"]);
		echo $zrow["filedata"];
	}
} catch (Exception $e) {
	$wtwconnect->serror("connect-sound.php=".$e->getMessage());
}
?>

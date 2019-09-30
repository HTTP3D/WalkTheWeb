<?php
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/communityrecoveritems.php");
	
	/* get values from querystring or session */
	$zcommunityid = $wtwconnect->getVal('communityid','');

	/* select community molds that have been deleted */
	$zresults = $wtwconnect->query("
		select shape as item,
			communitymoldid as itemid,
			'communitymolds' as itemtype
		from ".wtw_tableprefix."communitymolds
		where communityid='".$zcommunityid."'
		   and deleted=1
		   and not deleteddate is null
		order by deleteddate desc, 
			communitymoldid desc;");
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$i = 0;
	$zresponse = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zresponse[$i] = array(
			'itemid'=> $zrow["itemid"], 
			'item'=> $zrow["item"],
			'itemtype'=> $zrow["itemtype"],
			'parentname'=>'');
		$i += 1;
	}
	echo json_encode($zresponse);
} catch (Exception $e) {
	$wtwconnect->serror("connect-communityrecoveritems.php=".$e->getMessage());
}
?>

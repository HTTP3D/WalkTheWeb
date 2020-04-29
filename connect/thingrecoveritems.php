<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides thing mold information list to recover a deleted item */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/thingrecoveritems.php");
	
	/* get values from querystring or session */
	$zthingid = $wtwconnect->getVal('thingid','');

	/* get thing molds that have been deleted */
	$zresults = $wtwconnect->query("
		select shape as item,
			thingmoldid as itemid,
			'thingmolds' as itemtype
		from ".wtw_tableprefix."thingmolds
		where thingid='".$zthingid."'
		   and deleted=1
		   and not deleteddate is null
		order by deleteddate desc, 
			thingmoldid desc;");
	
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
	$wtwconnect->serror("connect-thingrecoveritems.php=".$e->getMessage());
}
?>

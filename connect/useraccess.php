<?php
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/useraccess.php");
	
	/* get values from querystring or session */
	$zcommunityid = $wtwconnect->getVal('communityid','');
	$zbuildingid = $wtwconnect->getVal('buildingid','');
	$zthingid = $wtwconnect->getVal('thingid','');
	$zuserid = $wtwconnect->userid;
	$hasaccess = "";
    
	/* get is user has access to community, building, or thing */
	$zresults = $wtwconnect->query("
		select '1' as hasaccess 
		from ".wtw_tableprefix."userauthorizations 
		where userid='".$zuserid."' 
			and communityid='".$zcommunityid."' 
			and buildingid='".$zbuildingid."' 
			and thingid='".$zthingid."' 
			and deleted=0 
			and not useraccess='browse'
        limit 1");
	foreach ($zresults as $zrow) {
		$hasaccess = $zrow["hasaccess"];
	}
	$zresults = array();
	if (!empty($hasaccess) && isset($hasaccess)) {
		$zresults = $wtwconnect->query("
			select ua1.userauthorizationid,
				u1.username,
				u1.email,
				u1.displayname,
				ua1.userid,
				ua1.useraccess
			from ".wtw_tableprefix."userauthorizations ua1
				left join ".wtw_tableprefix."users u1
					on ua1.userid=u1.userid
			where ua1.buildingid='".$zbuildingid."'
				and ua1.communityid='".$zcommunityid."'
				and ua1.thingid='".$zthingid."'
				and ua1.deleted=0
				and (u1.deleted=0 or u1.deleted is null)
			order by u1.username,ua1.userid,ua1.userauthorizationid;");
	} else {
		$zresults = $wtwconnect->query("
			select userauthorizationid,
				'' as username,
				'' as email,
				'' as displayname,
				userid,
				useraccess
			from ".wtw_tableprefix."userauthorizations
			where buildingid='".$zbuildingid."'
				and communityid='".$zcommunityid."'
				and thingid='".$zthingid."'
				and deleted=0
			order by username,userid,userauthorizationid;");
	}

	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);
	
	$i = 0;
	$zresponse = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$suser = array(
			'userauthorizationid' => $zrow["userauthorizationid"],
			'username' => $zrow["username"],
			'email' => $zrow["email"],
			'displayname' => $zrow["displayname"],
			'userid' => $zrow["userid"],
			'useraccess' => $zrow["useraccess"]);
		$zresponse[$i] = $suser;
		$i += 1;
	}
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-useraccess.php=".$e->getMessage());
}
?>

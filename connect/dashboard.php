<?php
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/dashboard.php");
	
	/* get values from querystring or session */

	$mycommunitycount = 0;
	$mybuildingcount = 0;
	$mythingcount = 0;
	$othercommunitycount = 0;
	$otherbuildingcount = 0;
	$otherthingcount = 0;
    $zresponse = array();
	
	if ($wtwconnect->isUserInRole('admin')) {
		/* select user is owner community count */
		$zresults = $wtwconnect->query("
			select count(*) as communitycount 
				from ".wtw_tableprefix."communities 
				where userid='".$wtwconnect->userid."' 
					and deleted=0;");
		foreach ($zresults as $zrow) {
			$mycommunitycount = $zrow["communitycount"];
		}
		/* select user is owner building count */
		$zresults = $wtwconnect->query("
			select count(*) as buildingcount 
				from ".wtw_tableprefix."buildings 
				where userid='".$wtwconnect->userid."' 
					and deleted=0;");
		foreach ($zresults as $zrow) {
			$mybuildingcount = $zrow["buildingcount"];
		}
		/* select user is owner thing count */
		$zresults = $wtwconnect->query("
			select count(*) as thingcount 
				from ".wtw_tableprefix."things 
				where userid='".$wtwconnect->userid."' 
					and deleted=0;");
		foreach ($zresults as $zrow) {
			$mythingcount = $zrow["thingcount"];
		}
		/* select user has access community count */
		$zresults = $wtwconnect->query("
			select count(*) as communitycount 
				from ".wtw_tableprefix."communities c 
					inner join ".wtw_tableprefix."userauthorizations u 
						on c.communityid= u.communityid 
				where (not c.userid='".$wtwconnect->userid."') 
					and u.userid='".$wtwconnect->userid."' 
					and (not c.communityid='') 
					and c.deleted=0 
					and u.deleted=0;");
		foreach ($zresults as $zrow) {
			$othercommunitycount = $zrow["communitycount"];
		}
		/* select user has access building count */
		$zresults = $wtwconnect->query("
			select count(*) as buildingcount 
				from ".wtw_tableprefix."buildings b 
					inner join ".wtw_tableprefix."userauthorizations u 
						on b.buildingid= u.buildingid 
				where (not b.userid='".$wtwconnect->userid."') 
					and u.userid='".$wtwconnect->userid."' 
					and (not b.buildingid='') 
					and b.deleted=0 
					and u.deleted=0;");
		foreach ($zresults as $zrow) {
			$otherbuildingcount = $zrow["buildingcount"];
		}
		/* select user has access thing count */
		$zresults = $wtwconnect->query("
			select count(*) as thingcount 
				from ".wtw_tableprefix."things t 
					inner join ".wtw_tableprefix."userauthorizations u 
						on t.thingid= u.thingid 
				where (not t.userid='".$wtwconnect->userid."') 
					and u.userid='".$wtwconnect->userid."' 
					and (not t.thingid='') 
					and t.deleted=0 
					and u.deleted=0;");
		foreach ($zresults as $zrow) {
			$otherthingcount = $zrow["thingcount"];
		}
		
		echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

		$zresponse[0] = array(
			'mycommunitycount'=> $mycommunitycount,
			'mybuildingcount'=> $mybuildingcount,
			'mythingcount'=> $mythingcount,
			'othercommunitycount'=> $othercommunitycount,
			'otherbuildingcount'=> $otherbuildingcount,
			'otherthingcount'=> $otherthingcount
		);
	}
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-dashboard.php=".$e->getMessage());
}
?>

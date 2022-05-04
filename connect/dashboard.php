<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides basic Admin Dashboard information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;

try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/dashboard.php");
	
	/* get values from querystring or session */

	$zwebsitesize = 0;
    $zdownloads = array();
    $zresponse = array();
	
	if ($wtwconnect->isUserInRole('admin')) {
		
		$zwebsitesize = $wtwconnect->dirSize($wtwconnect->rootpath);
		
		/* check download queue for any pending */
		$i = 0;
		$zresults = $wtwconnect->query("
			select * 
				from ".wtw_tableprefix."downloads 
				where deleted=0 
				order by createdate desc, downloadid desc;");
		foreach ($zresults as $zrow) {
			$zdownloads[$i] = array(
				"downloadid" => $zrow["downloadid"],
				"webid" => $zrow["webid"],
				"webtype" => $zrow["webtype"],
				"userip" => $zrow["userip"],
				"fromurl" => $zrow["fromurl"],
				"createdate" => $zrow["createdate"]
			);
			$i += 1;
		}
		
		/* get server totals */
		$i = 0;
		$zresults = $wtwconnect->query("
			select '3D Communities' as item, c1.scount, c2.mycount 
				from (select count(communityid) as scount from ".wtw_tableprefix."communities where deleted=0) c1 
					left join (select count(communityid) as mycount 
						from ".wtw_tableprefix."communities 
						where createuserid='".$wtwconnect->userid."' and deleted=0) c2 on 1=1
				union
			select '3D Buildings' as item, b1.scount, b2.mycount 
				from (select count(buildingid) as scount from ".wtw_tableprefix."buildings where deleted=0) b1
					left join (select count(buildingid) as mycount 
						from ".wtw_tableprefix."buildings 
						where createuserid='".$wtwconnect->userid."' and deleted=0) b2 on 1=1
				union
			select '3D Things' as item, t1.scount, t2.mycount 
				from (select count(thingid) as scount from ".wtw_tableprefix."things where deleted=0) t1
					left join (select count(thingid) as mycount 
						from ".wtw_tableprefix."things 
						where createuserid='".$wtwconnect->userid."' and deleted=0) t2 on 1=1
				union
			select '3D Avatars' as item, a1.scount, a2.mycount 
				from (select count(avatarid) as scount from ".wtw_tableprefix."avatars where deleted=0) a1
					left join (select count(avatarid) as mycount 
						from ".wtw_tableprefix."avatars 
						where createuserid='".$wtwconnect->userid."' and deleted=0) a2 on 1=1
				union
			select '3D Models' as item, m1.scount, m2.mycount 
				from (select count(uploadobjectid) as scount from ".wtw_tableprefix."uploadobjects where deleted=0) m1
					left join (select count(uploadobjectid) as mycount 
						from ".wtw_tableprefix."uploadobjects 
						where createuserid='".$wtwconnect->userid."' and deleted=0) m2 on 1=1
				union
			select '3D Plugins' as item, p1.scount, p2.mycount 
				from (select count(pluginname) as scount from ".wtw_tableprefix."plugins where deleted=0) p1
					left join (select count(pluginname) as mycount 
						from ".wtw_tableprefix."plugins 
						where createuserid='".$wtwconnect->userid."' and deleted=0) p2 on 1=1
				union
			select 'Uploads' as item, u1.scount, u2.mycount 
				from (select count(uploadid) as scount from ".wtw_tableprefix."uploads where deleted=0) u1
					left join (select count(uploadid) as mycount 
						from ".wtw_tableprefix."uploads 
						where createuserid='".$wtwconnect->userid."' and deleted=0) u2 on 1=1
				union
			select 'Users 3D Avatars' as item, ua1.scount, ua2.mycount 
				from (select count(useravatarid) as scount from ".wtw_tableprefix."useravatars where deleted=0) ua1
					left join (select count(useravatarid) as mycount 
						from ".wtw_tableprefix."useravatars 
						where createuserid='".$wtwconnect->userid."' and deleted=0) ua2 on 1=1
				union
			select 'Users with Roles' as item, count(u2.userid) as scount, '' as mycount 
				from ".wtw_tableprefix."users u2 
					inner join (select userid 
						from ".wtw_tableprefix."usersinroles 
						where deleted=0 group by userid) ur2 on u2.userid=ur2.userid where u2.deleted=0
				union
			select 'Total User Accounts' as item, count(tu1.userid) as scount, '' as mycount 
				from ".wtw_tableprefix."users tu1 where tu1.deleted=0;			
		");		

		foreach ($zresults as $zrow) {
			if (empty($i)) {
				$zresponse[$i] = array(
					'item'=> $zrow["item"],
					'mycount'=> $zrow["mycount"],
					'scount'=> $zrow["scount"],
					'downloads'=> $zdownloads
				);
			} else {
				$zresponse[$i] = array(
					'item'=> $zrow["item"],
					'mycount'=> $zrow["mycount"],
					'scount'=> $zrow["scount"],
					'downloads'=> null
				);
			}
			$i += 1;
		}		
		$zresponse[$i] = array(
			'item'=> 'Website Size',
			'mycount'=> '',
			'scount'=> $zwebsitesize,
			'downloads'=> null
		);
		$i += 1;
	}
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-dashboard.php=".$e->getMessage());
}
?>

<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides web aliases information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/webalias.php");
	
	$zwebaliasid = $wtwconnect->getVal('webaliasid','');
	$zhostuserid = '';
	if ($wtwconnect->isUserInRole("Host") && $wtwconnect->isUserInRole("Admin") == false) {
		$zhostuserid = $wtwconnect->userid;
	}
	
	$zresponse = array();
	if (!empty($zwebaliasid) && isset($zwebaliasid) && ($wtwconnect->isUserInRole("Admin") || $wtwconnect->isUserInRole("Host"))) {
		/* get web aliases for a user */
		$zresults = array();
		if ($wtwconnect->isUserInRole("Admin")) {
			$zresults = $wtwconnect->query("
				select w1.*,
					c1.communityname,
					b1.buildingname,
					t1.thingname,
					c1.snapshotid as communitysnapshotid,
					b1.snapshotid as buildingsnapshotid,
                    t1.snapshotid as thingsnapshotid,
					case when c1.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=c1.snapshotid limit 1)
						end as communitysnapshoturl,
					case when b1.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=b1.snapshotid limit 1)
						end as buildingsnapshoturl,
					case when t1.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=t1.snapshotid limit 1)
						end as thingsnapshoturl
				from ".wtw_tableprefix."webaliases w1
					left join ".wtw_tableprefix."communities c1
						on w1.communityid=c1.communityid
					left join ".wtw_tableprefix."buildings b1
						on w1.buildingid=b1.buildingid
					left join ".wtw_tableprefix."things t1
						on w1.thingid=t1.thingid
				where w1.deleted=0
					and w1.webaliasid='".$zwebaliasid."'
				order by 
					w1.hostuserid,
					w1.domainname,
					w1.communitypublishname,
					w1.buildingpublishname,
					w1.thingpublishname,
					w1.communityid,
					w1.buildingid,
					w1.thingid,
					w1.webaliasid;");
		} else {
			$zresults = $wtwconnect->query("
				select w1.*,
					c1.communityname,
					b1.buildingname,
					t1.thingname,
					c1.snapshotid as communitysnapshotid,
					b1.snapshotid as buildingsnapshotid,
                    t1.snapshotid as thingsnapshotid,
					case when c1.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=c1.snapshotid limit 1)
						end as communitysnapshoturl,
					case when b1.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=b1.snapshotid limit 1)
						end as buildingsnapshoturl,
					case when t1.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=t1.snapshotid limit 1)
						end as thingsnapshoturl
				from ".wtw_tableprefix."webaliases w1
					left join ".wtw_tableprefix."communities c1
						on w1.communityid=c1.communityid
					left join ".wtw_tableprefix."buildings b1
						on w1.buildingid=b1.buildingid
					left join ".wtw_tableprefix."things t1
						on w1.thingid=t1.thingid
				where w1.deleted=0
					and w1.webaliasid='".$zwebaliasid."'
					and w1.hostuserid='".$zhostuserid."'
					and not w1.hostuserid=''
				order by 
					w1.hostuserid,
					w1.domainname,
					w1.communitypublishname,
					w1.buildingpublishname,
					w1.thingpublishname,
					w1.communityid,
					w1.buildingid,
					w1.thingid,
					w1.webaliasid;");
		}
		echo $wtwconnect->addConnectHeader($wtwconnect->domainname);
		
		$i = 0;
		/* format json return dataset */
		foreach ($zresults as $zrow) {
			$webalias = array(
				'webaliasid' => $zrow["webaliasid"],
				'domainname' => $zrow["domainname"],
				'webalias' => $zrow["webalias"],
				'sitename' => $zrow["sitename"],
				'sitedescription' => $zrow["sitedescription"],
				'siteicon' => $zrow["siteicon"],
				'communityid' => $zrow["communityid"],
				'communitypublishname' => $zrow["communitypublishname"],
				'communityname' => $zrow["communityname"],
				'buildingid' => $zrow["buildingid"],
				'buildingpublishname' => $zrow["buildingpublishname"],
				'buildingname' => $zrow["buildingname"],
				'thingid' => $zrow["thingid"],
				'thingpublishname' => $zrow["thingpublishname"],
				'thingname' => $zrow["thingname"],
				'forcehttps' => $zrow["forcehttps"],
				'franchise' => $zrow["franchise"],
				'franchiseid' => $zrow["franchiseid"],
				'communitysnapshotid' => $zrow["communitysnapshotid"],
				'buildingsnapshotid' => $zrow["buildingsnapshotid"],
				'thingsnapshotid' => $zrow["thingsnapshotid"],
				'communitysnapshoturl' => $zrow["communitysnapshoturl"],
				'buildingsnapshoturl' => $zrow["buildingsnapshoturl"],
				'thingsnapshoturl' => $zrow["thingsnapshoturl"],
				'createdate' => $zrow["createdate"],
				'createuserid' => $zrow["createuserid"],
				'updatedate' => $zrow["updatedate"],
				'updateuseride' => $zrow["updateuserid"]);
			$zresponse[$i] = $webalias;
			$i += 1;
		}
	}
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-webalias.php=".$e->getMessage());
}
?>

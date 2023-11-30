<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides connecting grid information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	//zresponse
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/connectinggrids.php");
	
	/* get values from querystring or session */
	$zparentwebid = $wtwconnect->getVal('parentwebid','');
	$zparentname = $wtwconnect->getVal('parentname','');
	$zuserid = $wtwconnect->userid;
	$zstartpositionx = $wtwconnect->getNumber('startpositionx',0);
	$zstartpositiony = $wtwconnect->getNumber('startpositiony',0);
	$zstartpositionz = $wtwconnect->getNumber('startpositionz',0);
	$zconnectinggridid = "";
	$zsubconnectinggridid = "";
	$zwebtype = "";
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	if ($wtwconnect->hasValue($zparentwebid)) {
		/* select connectinggridid for main childid for item */
		$zresults = $wtwconnect->query("
			select connectinggridid 
				from ".wtw_tableprefix."connectinggrids 
				where childwebid='".$zparentwebid."' and parentwebid='' and deleted=0 limit 1;");
		foreach ($zresults as $zrow) {
			$zconnectinggridid = $zrow["connectinggridid"];
		}
		if (!isset($zconnectinggridid) || empty($zconnectinggridid)) {
			/* select connectinggridid for item */
			$zresults = $wtwconnect->query("
				select connectinggridid 
					from ".wtw_tableprefix."connectinggrids 
					where parentwebid='".$zparentwebid."' and deleted=0 limit 1;");
			foreach ($zresults as $zrow) {
				$zconnectinggridid = $zrow["connectinggridid"];
			}
			/* select webtype for for item */
			$zresults = $wtwconnect->query("
				select parentwebtype 
					from ".wtw_tableprefix."connectinggrids 
					where connectinggridid='".$zconnectinggridid."' limit 1;");
			foreach ($zresults as $zrow) {
				$zwebtype = $zrow["childwebtype"];
			}
		} else {
			/* select webtype for main childid for item */
			$zresults = $wtwconnect->query("
				select childwebtype 
					from ".wtw_tableprefix."connectinggrids 
					where connectinggridid='".$zconnectinggridid."' limit 1;");
			foreach ($zresults as $zrow) {
				$zwebtype = $zrow["childwebtype"];
			}
		}
		
		$zresults = array();
		if ($zwebtype = 'community')  {
			/* get connectinggrids for community */
			$zresults = $wtwconnect->query("
				select connectinggrids.connectinggridid,
					connectinggrids.parentserverfranchiseid,
					connectinggrids.parentwebid,
					connectinggrids.parentwebtype,
					connectinggrids.childserverfranchiseid,
					connectinggrids.childwebid,
					connectinggrids.childwebtype,
					connectinggrids.loadactionzoneid,
					connectinggrids.altloadactionzoneid,
					connectinggrids.unloadactionzoneid,
					connectinggrids.attachactionzoneid,
					connectinggrids.alttag,
					connectinggrids.positionx,
					connectinggrids.positiony,
					connectinggrids.positionz,
					connectinggrids.scalingx,
					connectinggrids.scalingy,
					connectinggrids.scalingz,
					connectinggrids.rotationx,
					connectinggrids.rotationy,
					connectinggrids.rotationz,
					round(sqrt(pow(connectinggrids.positionx-".$zstartpositionx.",2) + pow(connectinggrids.positiony-".$zstartpositiony.",2) + pow(connectinggrids.positionz-".$zstartpositionz.",2))) as distance,
					IF(connectinggrids.parentwebid IS NULL or connectinggrids.parentwebid = '', '1', '0') as isparent,
					parentcommunities.communityid as parentcommunityid,
					parentcommunities.communityname as parentcommunityname,
					parentcommunities.snapshotid as parentcommunitysnapshotid,
					case when parentcommunities.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=parentcommunities.snapshotid limit 1)
						end as parentcommunitysnapshoturl,
					parentcommunities.analyticsid as parentcommunityanalyticsid,
					case when (select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where communityid=parentcommunities.communityid 
									and deleted=0 and not communityid='') is null then ''
						else
							(select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where communityid=parentcommunities.communityid 
									and deleted=0 and not communityid='')
						end as parentcommunityaccess,
					parentbuildings.buildingid as parentbuildingid,
					parentbuildings.buildingname as parentbuildingname,
					parentbuildings.snapshotid as parentbuildingsnapshotid,
					case when parentbuildings.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=parentbuildings.snapshotid limit 1)
						end as parentbuildingsnapshoturl,
					parentbuildings.analyticsid as parentbuildinganalyticsid,
					case when (select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where buildingid=parentbuildings.buildingid 
									and deleted=0 and not buildingid='') is null then ''
						else
							(select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where buildingid=parentbuildings.buildingid 
									and deleted=0 and not buildingid='')
						end as parentbuildingaccess,
					parentthings.thingid as parentthingid,
					parentthings.thingname as parentthingname,
					parentthings.snapshotid as parentthingsnapshotid,
					case when parentthings.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=parentthings.snapshotid limit 1)
						end as parentthingsnapshoturl,
					parentthings.analyticsid as parentthinganalyticsid,
					case when (select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where thingid=parentthings.thingid 
									and deleted=0 and not thingid='') is null then ''
						else
							(select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where thingid=parentthings.thingid 
									and deleted=0 and not thingid='')
						end as parentthingaccess,
					communities.communityid,
					communities.communityname,
					communities.snapshotid as communitysnapshotid,
					case when communities.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=communities.snapshotid limit 1)
						end as communitysnapshoturl,
					communities.analyticsid as communityanalyticsid,
					case when (select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where communityid=communities.communityid 
									and deleted=0 and not communityid='') is null then ''
						else
							(select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where communityid=communities.communityid 
									and deleted=0 and not communityid='')
						end as communityaccess,
					buildings.buildingid,
					buildings.buildingname,
					buildings.snapshotid as buildingsnapshotid,
					case when buildings.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=buildings.snapshotid limit 1)
						end as buildingsnapshoturl,
					buildings.analyticsid as buildinganalyticsid,
					case when (select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where buildingid=buildings.buildingid 
									and deleted=0 and not buildingid='') is null then ''
						else
							(select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where buildingid=buildings.buildingid 
									and deleted=0 and not buildingid='')
						end as buildingaccess,
					things.thingid,
					things.thingname,
					things.snapshotid as thingsnapshotid,
					case when things.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=things.snapshotid limit 1)
						end as thingsnapshoturl,
					things.analyticsid as thinganalyticsid,
					case when (select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where thingid=things.thingid 
									and deleted=0 and not thingid='') is null then ''
						else
							(select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where thingid=things.thingid 
									and deleted=0 and not thingid='')
						end as thingaccess,
					childconnectinggrids.connectinggridid as subconnectinggridid,
					childconnectinggrids.parentserverfranchiseid as subparentserverfranchiseid,
					childconnectinggrids.parentwebid as subparentwebid,
					childconnectinggrids.parentwebtype as subparentwebtype,
					childconnectinggrids.childserverfranchiseid as subchildserverfranchiseid,
					childconnectinggrids.childwebid as subchildwebid,
					childconnectinggrids.childwebtype as subchildwebtype,
					childconnectinggrids.loadactionzoneid as subloadactionzoneid,
					childconnectinggrids.altloadactionzoneid as subaltloadactionzoneid,
					childconnectinggrids.unloadactionzoneid as subunloadactionzoneid,
					childconnectinggrids.attachactionzoneid as subattachactionzoneid,
					childconnectinggrids.alttag as subalttag,
					childconnectinggrids.positionx as subpositionx,
					childconnectinggrids.positiony as subpositiony,
					childconnectinggrids.positionz as subpositionz,
					childconnectinggrids.scalingx as subscalingx,
					childconnectinggrids.scalingy as subscalingy,
					childconnectinggrids.scalingz as subscalingz,
					childconnectinggrids.rotationx as subrotationx,
					childconnectinggrids.rotationy as subrotationy,
					childconnectinggrids.rotationz as subrotationz,
					round(sqrt(pow(childconnectinggrids.positionx,2) + pow(childconnectinggrids.positiony,2) + pow(childconnectinggrids.positionz,2))) as subdistance,
					IF(childconnectinggrids.connectinggridid IS NULL or childconnectinggrids.connectinggridid = '', '0', '1') as issubchild,
					subchildthings.thingid as subchildthingid,
					subchildthings.thingname as subchildthingname,
					subchildthings.snapshotid as subchildthingsnapshotid,
					case when subchildthings.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=subchildthings.snapshotid limit 1)
						end as subchildthingsnapshoturl,
					subchildthings.analyticsid as subchildthinganalyticsid,
					case when (select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where thingid=subchildthings.thingid 
									and deleted=0 and not thingid='') is null then ''
						else
							(select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where thingid=subchildthings.thingid 
									and deleted=0 and not thingid='')
						end as subchildthingaccess
				from 
					(select * from ".wtw_tableprefix."connectinggrids 
						where (parentwebid='".$zparentwebid."' 
						or (childwebid='".$zparentwebid."' and parentwebid=''))  
						and deleted=0) connectinggrids 
					
					left join (select * from ".wtw_tableprefix."communities 
							where communityid='".$zparentwebid."' 
								and deleted=0) parentcommunities
						on ((parentcommunities.communityid = connectinggrids.parentwebid
						and connectinggrids.parentwebtype='community')
						or (parentcommunities.communityid = connectinggrids.childwebid 
						and connectinggrids.parentwebid=''
						and connectinggrids.childwebtype='community'))
					
					left join (select * from ".wtw_tableprefix."buildings 
							where buildingid='".$zparentwebid."' 
								and deleted=0) parentbuildings
						on ((connectinggrids.parentwebid = parentbuildings.buildingid
						and connectinggrids.parentwebtype='building')
						or (parentbuildings.buildingid = connectinggrids.childwebid 
						and connectinggrids.parentwebid=''
						and connectinggrids.childwebtype='building'))

					left join (select * from ".wtw_tableprefix."things 
							where thingid='".$zparentwebid."' and deleted=0) parentthings
						on ((connectinggrids.parentwebid = parentthings.thingid
						and connectinggrids.parentwebtype='thing')
						or (parentbuildings.buildingid = connectinggrids.childwebid 
						and connectinggrids.parentwebid=''
						and connectinggrids.childwebtype='thing'))

					left join (select * from ".wtw_tableprefix."communities 
							where deleted=0) communities
						on connectinggrids.childwebid = communities.communityid
						and connectinggrids.childwebtype='community'

					left join (select * from ".wtw_tableprefix."buildings 
							where deleted=0) buildings
						on connectinggrids.childwebid = buildings.buildingid
						and connectinggrids.childwebtype='building'

					left join (select * from ".wtw_tableprefix."things 
							where deleted=0) things
						on connectinggrids.childwebid = things.thingid
						and connectinggrids.childwebtype='thing'
				
					left join (select * from ".wtw_tableprefix."connectinggrids 
							where childwebtype='thing' and deleted=0) childconnectinggrids
						on connectinggrids.childwebid = childconnectinggrids.parentwebid
						and connectinggrids.childwebtype='building'

					left join (select * from ".wtw_tableprefix."things 
							where deleted=0) subchildthings
						on childconnectinggrids.childwebid = subchildthings.thingid
						and childconnectinggrids.childwebtype='thing'
				
				order by isparent desc,
					issubchild,
					distance,
					subdistance,
					connectinggrids.connectinggridid,
					connectinggrids.childwebid,
					connectinggrids.positionx,
					connectinggrids.positiony,
					connectinggrids.positionz;");
		} else {
			/* select connectinggrids for building or thing */
			$zresults = $wtwconnect->query("
				select connectinggrids.connectinggridid,
					connectinggrids.parentserverfranchiseid,
					connectinggrids.parentwebid,
					connectinggrids.parentwebtype,
					connectinggrids.childserverfranchiseid,
					connectinggrids.childwebid,
					connectinggrids.childwebtype,
					connectinggrids.loadactionzoneid,
					connectinggrids.altloadactionzoneid,
					connectinggrids.unloadactionzoneid,
					connectinggrids.attachactionzoneid,
					connectinggrids.alttag,
					connectinggrids.positionx,
					connectinggrids.positiony,
					connectinggrids.positionz,
					connectinggrids.scalingx,
					connectinggrids.scalingy,
					connectinggrids.scalingz,
					connectinggrids.rotationx,
					connectinggrids.rotationy,
					connectinggrids.rotationz,
					round(sqrt(pow(connectinggrids.positionx-".$zstartpositionx.",2) + pow(connectinggrids.positiony-".$zstartpositiony.",2) + pow(connectinggrids.positionz-".$zstartpositionz.",2))) as distance,
					IF(connectinggrids.parentwebid IS NULL or connectinggrids.parentwebid = '', '1', '0') as isparent,
					'' as parentcommunityid,
					'' as parentcommunityname,
					'' as parentcommunitysnapshotid,
					'' as parentcommunitysnapshoturl,
					'' as parentcommunityanalyticsid,
					'' as parentcommunityaccess,
					parentbuildings.buildingid as parentbuildingid,
					parentbuildings.buildingname as parentbuildingname,
					parentbuildings.snapshotid as parentbuildingsnapshotid,
					case when parentbuildings.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=parentbuildings.snapshotid limit 1)
						end as parentbuildingsnapshoturl,
					parentbuildings.analyticsid as parentbuildinganalyticsid,
					case when (select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where buildingid=parentbuildings.buildingid 
									and deleted=0 and not buildingid='') is null then ''
						else
							(select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where buildingid=parentbuildings.buildingid 
									and deleted=0 and not buildingid='')
						end as parentbuildingaccess,
					parentthings.thingid as parentthingid,
					parentthings.thingname as parentthingname,
					parentthings.snapshotid as parentthingsnapshotid,
					case when parentthings.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=parentthings.snapshotid limit 1)
						end as parentthingsnapshoturl,
					parentthings.analyticsid as parentthinganalyticsid,
					case when (select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where thingid=parentthings.thingid 
									and deleted=0 and not thingid='') is null then ''
						else
							(select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where thingid=parentthings.thingid 
									and deleted=0 and not thingid='')
						end as parentthingaccess,
					'' as communityid,
					'WalkTheWeb' as communityname,
					'' as communitysnapshotid,
					'' as communitysnapshoturl,
					'' as communityanalyticsid,
					'' as communityaccess,
					buildings.buildingid,
					buildings.buildingname,
					buildings.snapshotid as buildingsnapshotid,
					case when buildings.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=buildings.snapshotid limit 1)
						end as buildingsnapshoturl,
					buildings.analyticsid as buildinganalyticsid,
					case when (select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where buildingid=buildings.buildingid 
									and deleted=0 and not buildingid='') is null then ''
						else
							(select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where buildingid=buildings.buildingid 
									and deleted=0 and not buildingid='')
						end as buildingaccess,
					things.thingid,
					things.thingname,
					things.snapshotid as thingsnapshotid,
					case when things.snapshotid is null then ''
						else (select filepath 
							from ".wtw_tableprefix."uploads 
							where uploadid=things.snapshotid limit 1)
						end as thingsnapshoturl,
					things.analyticsid as thinganalyticsid,
					case when (select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where thingid=things.thingid 
									and deleted=0 and not thingid='') is null then ''
						else
							(select GROUP_CONCAT(userid) as useraccess 
								from ".wtw_tableprefix."userauthorizations 
								where thingid=things.thingid 
									and deleted=0 and not thingid='')
						end as thingaccess,
					null as subconnectinggridid,
					'' as subparentserverfranchiseid,
					'' as subparentwebid,
					'' as subparentwebtype,
					'' as subchildserverfranchiseid,
					'' as subchildwebid,
					'' as subchildwebtype,
					'' as subloadactionzoneid,
					'' as subaltloadactionzoneid,
					'' as subunloadactionzoneid,
					'' as subattachactionzoneid,
					'' as subalttag,
					'0' as subpositionx,
					'0' as subpositiony,
					'0' as subpositionz,
					'1' as subscalingx,
					'1' as subscalingy,
					'1' as subscalingz,
					'0' as subrotationx,
					'0' as subrotationy,
					'0' as subrotationz,
					'0' as subdistance,
					'0' as issubchild,
					'' as subchildthingid,
					'' as subchildthingname,
					'' as subchildthingsnapshotid,
					'' as subchildthingsnapshoturl,
					'' as subchildthinganalyticsid,
					'' as subchildthingaccess
				from 
					(select * from ".wtw_tableprefix."connectinggrids 
						where (parentwebid='".$zparentwebid."' 
							or (childwebid='".$zparentwebid."' 
								and parentwebid=''))  
							and deleted=0) connectinggrids 
					
					left join (select * 
							from ".wtw_tableprefix."buildings 
							where buildingid='".$zparentwebid."' 
								and deleted=0) parentbuildings
						on ((connectinggrids.parentwebid = parentbuildings.buildingid
						and connectinggrids.parentwebtype='building')
						or (parentbuildings.buildingid = connectinggrids.childwebid 
						and connectinggrids.parentwebid=''
						and connectinggrids.childwebtype='building'))

					left join (select * 
							from ".wtw_tableprefix."things 
							where thingid='".$zparentwebid."' 
								and deleted=0 and deleted>0) parentthings
						on ((connectinggrids.parentwebid = parentthings.thingid
						and connectinggrids.parentwebtype='thing')
						or (parentbuildings.buildingid = connectinggrids.childwebid 
						and connectinggrids.parentwebid=''
						and connectinggrids.childwebtype='thing'))

					left join (select * from ".wtw_tableprefix."buildings 
							where deleted=0) buildings
						on connectinggrids.childwebid = buildings.buildingid
						and connectinggrids.childwebtype='building'

					left join (select * from ".wtw_tableprefix."things 
							where deleted=0) things
						on connectinggrids.childwebid = things.thingid
						and connectinggrids.childwebtype='thing'
				
					left join (select * from ".wtw_tableprefix."connectinggrids 
							where childwebtype='thing' 
								and deleted=0 and deleted>0) childconnectinggrids
						on connectinggrids.childwebid = childconnectinggrids.parentwebid
						and connectinggrids.childwebtype='building'

					left join (select * from ".wtw_tableprefix."things 
							where deleted=0 and deleted>0) subchildthings
						on childconnectinggrids.childwebid = subchildthings.thingid
						and childconnectinggrids.childwebtype='thing'
				
				order by isparent desc,
					issubchild,
					distance,
					subdistance,
					connectinggrids.connectinggridid,
					connectinggrids.childwebid,
					connectinggrids.positionx,
					connectinggrids.positiony,
					connectinggrids.positionz;");
		}

		$i = 0;
		$zconnectinggridid = "";
		$zsubconnectinggridid = "";
		$zresponse = array();
		$zwebitems = array();
		/* format json return dataset */
		foreach ($zresults as $zrow) {
			if ($zconnectinggridid != $zrow["connectinggridid"] && $wtwconnect->hasValue($zrow["connectinggridid"])) {
				if ($wtwconnect->hasValue($zrow["parentcommunityid"])) {
					$zcommunityinfo = array(
						'communityid'=> $zrow["parentcommunityid"],
						'communityname'=> $wtwconnect->escapeHTML($zrow["parentcommunityname"]),
						'snapshotid' => $zrow["parentcommunitysnapshotid"],
						'snapshoturl' => $zrow["parentcommunitysnapshoturl"],
						'analyticsid'=> $zrow["parentcommunityanalyticsid"],
						'access'=> $zrow["parentcommunityaccess"]
					);
				} elseif ($wtwconnect->hasValue($zrow["communityid"])) {
					$zcommunityinfo = array(
						'communityid'=> $zrow["communityid"],
						'communityname'=> $wtwconnect->escapeHTML($zrow["communityname"]),
						'snapshotid' => $zrow["communitysnapshotid"],
						'snapshoturl' => $zrow["communitysnapshoturl"],
						'analyticsid'=> $zrow["communityanalyticsid"],
						'access'=> $zrow["communityaccess"]
					);
				} else {
					$zcommunityinfo = array(
						'communityid'=> '',
						'communityname'=> 'WalkTheWeb',
						'snapshotid' => '',
						'snapshoturl' => '',
						'analyticsid'=> '',
						'access'=> ''
					);
				}
				if ($wtwconnect->hasValue($zrow["parentbuildingid"])) {
					$zbuildinginfo = array(
						'buildingid'=> $zrow["parentbuildingid"], 
						'buildingname'=> $zrow["parentbuildingname"],
						'snapshotid' => $zrow["parentbuildingsnapshotid"],
						'snapshoturl' => $zrow["parentbuildingsnapshoturl"],
						'analyticsid'=> $zrow["parentbuildinganalyticsid"],
						'access'=> $zrow["parentbuildingaccess"]
					);
				} elseif ($wtwconnect->hasValue($zrow["buildingid"])) {
					$zbuildinginfo = array(
						'buildingid'=> $zrow["buildingid"], 
						'buildingname'=> $zrow["buildingname"],
						'snapshotid' => $zrow["buildingsnapshotid"],
						'snapshoturl' => $zrow["buildingsnapshoturl"],
						'analyticsid'=> $zrow["buildinganalyticsid"],
						'access'=> $zrow["buildingaccess"]
					);
				} else {
					$zbuildinginfo = array(
						'buildingid'=> '', 
						'buildingname'=> '',
						'snapshotid' => '',
						'snapshoturl' => '',
						'analyticsid'=> '',
						'access'=> ''
					);
				}
				if ($wtwconnect->hasValue($zrow["parentthingid"])) {
					$zthinginfo = array(
						'thingid'=> $zrow["parentthingid"], 
						'thingname'=> $zrow["parentthingname"],
						'snapshotid' => $zrow["parentthingsnapshotid"],
						'snapshoturl' => $zrow["parentthingsnapshoturl"],
						'analyticsid'=> $zrow["parentthinganalyticsid"],
						'access'=> $zrow["parentthingaccess"]
					);
				} elseif ($wtwconnect->hasValue($zrow["thingid"])) {
					$zthinginfo = array(
						'thingid'=> $zrow["thingid"], 
						'thingname'=> $zrow["thingname"],
						'snapshotid' => $zrow["thingsnapshotid"],
						'snapshoturl' => $zrow["thingsnapshoturl"],
						'analyticsid'=> $zrow["thinganalyticsid"],
						'access'=> $zrow["thingaccess"]
					);
				} else {
					$zthinginfo = array(
						'thingid'=> '', 
						'thingname'=> '',
						'snapshotid' => '',
						'snapshoturl' => '',
						'analyticsid'=> '',
						'access'=> ''
					);
				}
				$zposition = array(
					'x'=> $zrow["positionx"], 
					'y'=> $zrow["positiony"], 
					'z'=> $zrow["positionz"]
				);
				$zscaling = array(
					'x'=> $zrow["scalingx"], 
					'y'=> $zrow["scalingy"], 
					'z'=> $zrow["scalingz"]
				);
				$zrotation = array(
					'x'=> $zrow["rotationx"], 
					'y'=> $zrow["rotationy"], 
					'z'=> $zrow["rotationz"]
				);
				$zalttag = array(
					'name'=> $zrow['alttag']
				);
				$zwebitems[$i] = array(
					'serverfranchiseid' => '',
					'connectinggridid'=> $zrow["connectinggridid"], 
					'connectinggridind'=> '-1',
					'parentconnectinggridid'=> '', 
					'parentconnectinggridind'=> '-1',
					'loadlevel'=> '1',
					'parentserverfranchiseid'=> $zrow["parentserverfranchiseid"], 
					'parentwebid'=> $zrow["parentwebid"], 
					'parentwebtype'=> $zrow["parentwebtype"], 
					'childserverfranchiseid'=> $zrow["childserverfranchiseid"], 
					'childwebid'=> $zrow["childwebid"], 
					'childwebtype'=> $zrow["childwebtype"], 
					'loadactionzoneid'=> $zrow["loadactionzoneid"], 
					'loadactionzoneind'=> '-1', 
					'altloadactionzoneid'=> $zrow["altloadactionzoneid"], 
					'altloadactionzoneind'=> '-1', 
					'unloadactionzoneid'=> $zrow["unloadactionzoneid"], 
					'unloadactionzoneind'=> '-1', 
					'attachactionzoneid'=> $zrow["attachactionzoneid"], 
					'attachactionzoneind'=> '-1', 
					'communityinfo'=> $zcommunityinfo,
					'buildinginfo'=> $zbuildinginfo,
					'thinginfo'=> $zthinginfo,
					'position'=> $zposition,
					'scaling'=> $zscaling,
					'rotation'=> $zrotation,
					'alttag'=> $zalttag,
					'shape'=>'box',
					'ispickable'=>'0',
					'checkcollisions'=>'0',
					'moldname'=>'',
					'parentname'=>$zparentname,
					'shown'=>'0',
					'status'=> '0');
				$i += 1;
			}
			if ($zrow["parentwebtype"] == 'community' && $zsubconnectinggridid != $zrow["subconnectinggridid"] && isset($zrow["subconnectinggridid"]) && !empty($zrow["subconnectinggridid"])) {
				if ($wtwconnect->hasValue($zrow["parentcommunityid"])) {
					$zcommunityinfo = array(
						'communityid'=> $zrow["parentcommunityid"],
						'communityname'=> $wtwconnect->escapeHTML($zrow["parentcommunityname"]),
						'snapshotid' => $zrow["parentcommunitysnapshotid"],
						'snapshoturl' => $zrow["parentcommunitysnapshoturl"],
						'analyticsid'=> $zrow["parentcommunityanalyticsid"],
						'access'=> $zrow["parentcommunityaccess"]
					);
				} elseif ($wtwconnect->hasValue($zrow["communityid"])) {
					$zcommunityinfo = array(
						'communityid'=> $zrow["communityid"],
						'communityname'=> $wtwconnect->escapeHTML($zrow["communityname"]),
						'snapshotid' => $zrow["communitysnapshotid"],
						'snapshoturl' => $zrow["communitysnapshoturl"],
						'analyticsid'=> $zrow["communityanalyticsid"],
						'access'=> $zrow["communityaccess"]
					);
				} else {
					$zcommunityinfo = array(
						'communityid'=> '',
						'communityname'=> 'WalkTheWeb',
						'snapshotid' => '',
						'snapshoturl' => '',
						'analyticsid'=> '',
						'access'=> ''
					);
				}
				if ($wtwconnect->hasValue($zrow["parentbuildingid"])) {
					$zbuildinginfo = array(
						'buildingid'=> $zrow["parentbuildingid"], 
						'buildingname'=> $zrow["parentbuildingname"],
						'snapshotid' => $zrow["parentbuildingsnapshotid"],
						'snapshoturl' => $zrow["parentbuildingsnapshoturl"],
						'analyticsid'=> $zrow["parentbuildinganalyticsid"],
						'access'=> $zrow["parentbuildingaccess"]
					);
				} elseif ($wtwconnect->hasValue($zrow["buildingid"])) {
					$zbuildinginfo = array(
						'buildingid'=> $zrow["buildingid"], 
						'buildingname'=> $zrow["buildingname"],
						'snapshotid' => $zrow["buildingsnapshotid"],
						'snapshoturl' => $zrow["buildingsnapshoturl"],
						'analyticsid'=> $zrow["buildinganalyticsid"],
						'access'=> $zrow["buildingaccess"]
					);
				} else {
					$zbuildinginfo = array(
						'buildingid'=> '', 
						'buildingname'=> '',
						'snapshotid' => '',
						'snapshoturl' => '',
						'analyticsid'=> '',
						'access'=> ''
					);
				}
				if ($wtwconnect->hasValue($zrow["subchildthingid"])) {
					$zthinginfo = array(
						'thingid'=> $zrow["subchildthingid"], 
						'thingname'=> $zrow["subchildthingname"],
						'snapshotid' => $zrow["subchildthingsnapshotid"],
						'snapshoturl' => $zrow["subchildthingsnapshoturl"],
						'analyticsid'=> $zrow["subchildthinganalyticsid"],
						'access'=> $zrow["subchildthingaccess"]
					);
				} elseif ($wtwconnect->hasValue($zrow["parentthingid"])) {
					$zthinginfo = array(
						'thingid'=> $zrow["parentthingid"], 
						'thingname'=> $zrow["parentthingname"],
						'snapshotid' => $zrow["parentthingsnapshotid"],
						'snapshoturl' => $zrow["parentthingsnapshoturl"],
						'analyticsid'=> $zrow["parentthinganalyticsid"],
						'access'=> $zrow["parentthingaccess"]
					);
				} elseif ($wtwconnect->hasValue($zrow["thingid"])) {
					$zthinginfo = array(
						'thingid'=> $zrow["thingid"], 
						'thingname'=> $zrow["thingname"],
						'snapshotid' => $zrow["thingsnapshotid"],
						'snapshoturl' => $zrow["thingsnapshoturl"],
						'analyticsid'=> $zrow["thinganalyticsid"],
						'access'=> $zrow["thingaccess"]
					);
				} else {
					$zthinginfo = array(
						'thingid'=> '', 
						'thingname'=> '',
						'snapshotid' => '',
						'snapshoturl' => '',
						'analyticsid'=> '',
						'access'=> ''
					);
				}
				$zalttag = array(
					'name'=> $zrow['subalttag']
				);
				$zposition = array(
					'x'=> $zrow["subpositionx"], 
					'y'=> $zrow["subpositiony"], 
					'z'=> $zrow["subpositionz"]
				);
				$zscaling = array(
					'x'=> $zrow["subscalingx"], 
					'y'=> $zrow["subscalingy"], 
					'z'=> $zrow["subscalingz"]
				);
				$zrotation = array(
					'x'=> $zrow["subrotationx"], 
					'y'=> $zrow["subrotationy"], 
					'z'=> $zrow["subrotationz"]
				);
				$zwebitems[$i] = array(
					'serverfranchiseid' => '',
					'connectinggridid'=> $zrow["subconnectinggridid"], 
					'connectinggridind'=> '-1',
					'parentconnectinggridid'=> $zrow["connectinggridid"], 
					'parentconnectinggridind'=> '-1',
					'loadlevel'=> '2',
					'parentserverfranchiseid'=> $zrow["subparentserverfranchiseid"], 
					'parentwebid'=> $zrow["subparentwebid"], 
					'parentwebtype'=> $zrow["subparentwebtype"], 
					'childserverfranchiseid'=> $zrow["subchildserverfranchiseid"], 
					'childwebid'=> $zrow["subchildwebid"], 
					'childwebtype'=> $zrow["subchildwebtype"], 
					'loadactionzoneid'=> $zrow["subloadactionzoneid"], 
					'loadactionzoneind'=> '-1', 
					'altloadactionzoneid'=> $zrow["subaltloadactionzoneid"], 
					'altloadactionzoneind'=> '-1', 
					'unloadactionzoneid'=> $zrow["subunloadactionzoneid"], 
					'unloadactionzoneind'=> '-1', 
					'attachactionzoneid'=> $zrow["subattachactionzoneid"], 
					'attachactionzoneind'=> '-1', 
					'communityinfo'=> $zcommunityinfo,
					'buildinginfo'=> $zbuildinginfo,
					'thinginfo'=> $zthinginfo,
					'position'=> $zposition,
					'scaling'=> $zscaling,
					'rotation'=> $zrotation,
					'alttag'=> $zalttag,
					'shape'=>'box',
					'ispickable'=>'0',
					'checkcollisions'=>'0',
					'moldname'=>'',
					'parentname'=>'',
					'shown'=>'0',
					'status'=> '0');
				$i += 1;
				$zsubconnectinggridid = $zrow["subconnectinggridid"];
			}
			$zconnectinggridid = $zrow["connectinggridid"];
		}
		$zresponse['webitems'] = $zwebitems;
	}
	echo json_encode($zresponse);
} catch (Exception $e) {
	$wtwconnect->serror("connect-connectinggrids.php=".$e->getMessage());
}
?>

<?php
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
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

	if (isset($zparentwebid) && !empty($zparentwebid)) {
		/* select connectinggridid for main childid for item */
		$zresults = $wtwconnect->query("
			select connectinggridid 
				from ".wtw_tableprefix."connectinggrids 
				where childwebid='".$zparentwebid."' and parentwebid='' and deleted=0 limit 1;");
		foreach ($zresults as $zrow) {
			$zconnectinggridid = $zrow["connectinggridid"];
		}
		if (empty($zconnectinggridid) || !isset($zconnectinggridid)) {
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
					connectinggrids.parentwebid,
					connectinggrids.parentwebtype,
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
					childconnectinggrids.parentwebid as subparentwebid,
					childconnectinggrids.parentwebtype as subparentwebtype,
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
					connectinggrids.parentwebid,
					connectinggrids.parentwebtype,
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
					'' as parentcommunityanalyticsid,
					'' as parentcommunityaccess,
					parentbuildings.buildingid as parentbuildingid,
					parentbuildings.buildingname as parentbuildingname,
					parentbuildings.snapshotid as parentbuildingsnapshotid,
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
					'Walk the Web' as communityname,
					'' as communitysnapshotid,
					'' as communityanalyticsid,
					'' as communityaccess,
					buildings.buildingid,
					buildings.buildingname,
					buildings.snapshotid as buildingsnapshotid,
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
					'' as subparentwebid,
					'' as subparentwebtype,
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
								and deleted=0 and deleted=1) parentthings
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
								and deleted=0 and deleted=1) childconnectinggrids
						on connectinggrids.childwebid = childconnectinggrids.parentwebid
						and connectinggrids.childwebtype='building'

					left join (select * from ".wtw_tableprefix."things 
							where deleted=0 and deleted=1) subchildthings
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
			if ($zconnectinggridid != $zrow["connectinggridid"] && isset($zrow["connectinggridid"]) && !empty($zrow["connectinggridid"])) {
				if(isset($zrow["parentcommunityid"]) && !empty($zrow["parentcommunityid"])) {
					$zcommunityinfo = array(
						'communityid'=> $zrow["parentcommunityid"],
						'communityname'=> htmlspecialchars($zrow["parentcommunityname"], ENT_QUOTES, 'UTF-8'),
						'snapshotid' => $zrow["parentcommunitysnapshotid"],
						'analyticsid'=> $zrow["parentcommunityanalyticsid"],
						'access'=> $zrow["parentcommunityaccess"]
					);
				} elseif (isset($zrow["communityid"]) && !empty($zrow["communityid"])) {
					$zcommunityinfo = array(
						'communityid'=> $zrow["communityid"],
						'communityname'=> htmlspecialchars($zrow["communityname"], ENT_QUOTES, 'UTF-8'),
						'snapshotid' => $zrow["communitysnapshotid"],
						'analyticsid'=> $zrow["communityanalyticsid"],
						'access'=> $zrow["communityaccess"]
					);
				} else {
					$zcommunityinfo = array(
						'communityid'=> '',
						'communityname'=> 'Walk the Web',
						'snapshotid' => '',
						'analyticsid'=> '',
						'access'=> ''
					);
				}
				if(isset($zrow["parentbuildingid"]) && !empty($zrow["parentbuildingid"])) {
					$zbuildinginfo = array(
						'buildingid'=> $zrow["parentbuildingid"], 
						'buildingname'=> $zrow["parentbuildingname"],
						'snapshotid' => $zrow["parentbuildingsnapshotid"],
						'analyticsid'=> $zrow["parentbuildinganalyticsid"],
						'access'=> $zrow["parentbuildingaccess"]
					);
				} elseif (isset($zrow["buildingid"]) && !empty($zrow["buildingid"])) {
					$zbuildinginfo = array(
						'buildingid'=> $zrow["buildingid"], 
						'buildingname'=> $zrow["buildingname"],
						'snapshotid' => $zrow["buildingsnapshotid"],
						'analyticsid'=> $zrow["buildinganalyticsid"],
						'access'=> $zrow["buildingaccess"]
					);
				} else {
					$zbuildinginfo = array(
						'buildingid'=> '', 
						'buildingname'=> '',
						'snapshotid' => '',
						'analyticsid'=> '',
						'access'=> ''
					);
				}
				if(isset($zrow["parentthingid"]) && !empty($zrow["parentthingid"])) {
					$zthinginfo = array(
						'thingid'=> $zrow["parentthingid"], 
						'thingname'=> $zrow["parentthingname"],
						'snapshotid' => $zrow["parentthingsnapshotid"],
						'analyticsid'=> $zrow["parentthinganalyticsid"],
						'access'=> $zrow["parentthingaccess"]
					);
				} elseif (isset($zrow["thingid"]) && !empty($zrow["thingid"])) {
					$zthinginfo = array(
						'thingid'=> $zrow["thingid"], 
						'thingname'=> $zrow["thingname"],
						'snapshotid' => $zrow["thingsnapshotid"],
						'analyticsid'=> $zrow["thinganalyticsid"],
						'access'=> $zrow["thingaccess"]
					);
				} else {
					$zthinginfo = array(
						'thingid'=> '', 
						'thingname'=> '',
						'snapshotid' => '',
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
					'connectinggridid'=> $zrow["connectinggridid"], 
					'connectinggridind'=> '-1',
					'parentconnectinggridid'=> '', 
					'parentconnectinggridind'=> '-1',
					'loadlevel'=> '1',
					'parentwebid'=> $zrow["parentwebid"], 
					'parentwebtype'=> $zrow["parentwebtype"], 
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
			} else if (($zconnectinggridid != $zrow["connectinggridid"] || $zsubconnectinggridid != $zrow["subconnectinggridid"]) && isset($zrow["subconnectinggridid"]) && !empty($zrow["subconnectinggridid"])) {
				if(isset($zrow["parentcommunityid"]) && !empty($zrow["parentcommunityid"])) {
					$zcommunityinfo = array(
						'communityid'=> $zrow["parentcommunityid"],
						'communityname'=> htmlspecialchars($zrow["parentcommunityname"], ENT_QUOTES, 'UTF-8'),
						'snapshotid' => $zrow["parentcommunitysnapshotid"],
						'analyticsid'=> $zrow["parentcommunityanalyticsid"],
						'access'=> $zrow["parentcommunityaccess"]
					);
				} elseif (isset($zrow["communityid"]) && !empty($zrow["communityid"])) {
					$zcommunityinfo = array(
						'communityid'=> $zrow["communityid"],
						'communityname'=> htmlspecialchars($zrow["communityname"], ENT_QUOTES, 'UTF-8'),
						'snapshotid' => $zrow["communitysnapshotid"],
						'analyticsid'=> $zrow["communityanalyticsid"],
						'access'=> $zrow["communityaccess"]
					);
				} else {
					$zcommunityinfo = array(
						'communityid'=> '',
						'communityname'=> 'Walk the Web',
						'snapshotid' => '',
						'analyticsid'=> '',
						'access'=> ''
					);
				}
				if (isset($zrow["parentbuildingid"]) && !empty($zrow["parentbuildingid"])) {
					$zbuildinginfo = array(
						'buildingid'=> $zrow["parentbuildingid"], 
						'buildingname'=> $zrow["parentbuildingname"],
						'snapshotid' => $zrow["parentbuildingsnapshotid"],
						'analyticsid'=> $zrow["parentbuildinganalyticsid"],
						'access'=> $zrow["parentbuildingaccess"]
					);
				} elseif (isset($zrow["buildingid"]) && !empty($zrow["buildingid"])) {
					$zbuildinginfo = array(
						'buildingid'=> $zrow["buildingid"], 
						'buildingname'=> $zrow["buildingname"],
						'snapshotid' => $zrow["buildingsnapshotid"],
						'analyticsid'=> $zrow["buildinganalyticsid"],
						'access'=> $zrow["buildingaccess"]
					);
				} else {
					$zbuildinginfo = array(
						'buildingid'=> '', 
						'buildingname'=> '',
						'snapshotid' => '',
						'analyticsid'=> '',
						'access'=> ''
					);
				}
				if(isset($zrow["subchildthingid"]) && !empty($zrow["subchildthingid"])) {
					$zthinginfo = array(
						'thingid'=> $zrow["subchildthingid"], 
						'thingname'=> $zrow["subchildthingname"],
						'snapshotid' => $zrow["subchildthingsnapshotid"],
						'analyticsid'=> $zrow["subchildthinganalyticsid"],
						'access'=> $zrow["subchildthingaccess"]
					);
				} elseif (isset($zrow["parentthingid"]) && !empty($zrow["parentthingid"])) {
					$zthinginfo = array(
						'thingid'=> $zrow["parentthingid"], 
						'thingname'=> $zrow["parentthingname"],
						'snapshotid' => $zrow["parentthingsnapshotid"],
						'analyticsid'=> $zrow["parentthinganalyticsid"],
						'access'=> $zrow["parentthingaccess"]
					);
				} elseif (isset($zrow["thingid"]) && !empty($zrow["thingid"])) {
					$zthinginfo = array(
						'thingid'=> $zrow["thingid"], 
						'thingname'=> $zrow["thingname"],
						'snapshotid' => $zrow["thingsnapshotid"],
						'analyticsid'=> $zrow["thinganalyticsid"],
						'access'=> $zrow["thingaccess"]
					);
				} else {
					$zthinginfo = array(
						'thingid'=> '', 
						'thingname'=> '',
						'snapshotid' => '',
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
					'connectinggridid'=> $zrow["subconnectinggridid"], 
					'connectinggridind'=> '-1',
					'parentconnectinggridid'=> $zrow["connectinggridid"], 
					'parentconnectinggridind'=> '-1',
					'loadlevel'=> '2',
					'parentwebid'=> $zrow["subparentwebid"], 
					'parentwebtype'=> $zrow["subparentwebtype"], 
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

<?php
class wtwbuildings {
	/* $wtwbuildings class for admin database functions for 3d buildings */
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {

	}	

	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	public function buildingExist($zbuildingid) {
		/* validate if a building id is found in the database */
		global $wtwhandlers;
		$found = false;
		try {
			$zresults = array();
			$zresults = $wtwhandlers->query("
				select buildingid 
				from ".wtw_tableprefix."buildings 
				where buildingid='".$zbuildingid."' limit 1");
			foreach ($zresults as $zrow) {
				$found = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwbuildings.php-buildingExist=".$e->getMessage());
		}
		return $found;
	}

	public function saveBuilding($zbuildingid, $zpastbuildingid, $zbuildingname, $zanalyticsid, $zalttag) {
		/* save building settings */
		global $wtwhandlers;
		$zcopybuildingid = "";
		try {
			if (empty($zpastbuildingid) || !isset($zpastbuildingid) || $wtwhandlers->checkUpdateAccess("", $zpastbuildingid, "") == false) {
				/* denies copy function if you do not have access to building to copy */
				$zpastbuildingid = "";
			}
			$zresults = array();
			if ($zbuildingid == "") {
				/* create new buildingid */
				$zbuildingid = $wtwhandlers->getRandomString(16,1);
				
				if (empty($zpastbuildingid) || !isset($zpastbuildingid)) {
					/* create new building (without access to copy building or if not copying existing building, this creates new building) */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."buildings
							(buildingid,
							 pastbuildingid,
							 buildingname,
							 analyticsid,
							 userid,
							 alttag,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zbuildingid."',
							 '',
							 '".$wtwhandlers->escapeHTML($zbuildingname)."',
							 '".$zanalyticsid."',
							 '".$wtwhandlers->userid."',
							 '".$wtwhandlers->escapeHTML($zalttag)."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				} else {
					/* with access to copy building, this gets all values */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."buildings
							(buildingid,
							 pastbuildingid,
							 buildingname,
							 analyticsid,
							 userid,
							 positionx,
							 positiony,
							 positionz,
							 scalingx,
							 scalingy,
							 scalingz,
							 rotationx,
							 rotationy,
							 rotationz,
							 gravity,
							 wallcollisions,
							 floorcollisions,
							 alttag,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						select '".$zbuildingid."' as buildingid,
							 '".$zpastbuildingid."' as pastbuildingid,
							 '".$wtwhandlers->escapeHTML($zbuildingname)."' as buildingname,
							 '' as analyticsid,
							 '".$wtwhandlers->userid."' as userid,
							 positionx,
							 positiony,
							 positionz,
							 scalingx,
							 scalingy,
							 scalingz,
							 rotationx,
							 rotationy,
							 rotationz,
							 gravity,
							 wallcollisions,
							 floorcollisions,
							 alttag,
							 now() as createdate,
							 '".$wtwhandlers->userid."' as createuserid,
							 now() as updatedate,
							 '".$wtwhandlers->userid."' as updateuserid
						from ".wtw_tableprefix."buildings
						where buildingid='".$zpastbuildingid."';");
				}
				/* give user Admin access to their new building */ 
				$wtwhandlers->query("
					insert into ".wtw_tableprefix."userauthorizations
						(userauthorizationid,
						 userid,
						 buildingid,
						 useraccess,
						 createdate,
						 createuserid,
						 updatedate,
						 updateuserid)
					values
						(getid16(),
						 '".$wtwhandlers->userid."',
						 '".$zbuildingid."',
						 'admin',
						 now(),
						 '".$wtwhandlers->userid."',
						 now(),
						 '".$wtwhandlers->userid."');");
			} else if ($wtwhandlers->checkUpdateAccess("", $zbuildingid, "")) {
				/* only updates if you have access */
				 $wtwhandlers->query("
					update ".wtw_tableprefix."buildings
					set  buildingname='".$wtwhandlers->escapeHTML($zbuildingname)."',
						 analyticsid='".$zanalyticsid."',
						 alttag='".$wtwhandlers->escapeHTML($zalttag)."',
						 updatedate=now(),
						 updateuserid='".$wtwhandlers->userid."'
					where buildingid='".$zbuildingid."';"); 
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwbuildings.php-saveBuilding=".$e->getMessage());
		}
		/* if you created a new building the return value is used to redirect and open the new building */
		if (!empty($zpastbuildingid) && isset($zpastbuildingid) && !empty($zbuildingid) && isset($zbuildingid)) {
			$zcopybuildingid = $this->copyBuilding($zbuildingid, $zpastbuildingid);
		}
		/* if the new building errored or was not available (missing or permissions) this reloads your current building */
		if (empty($zcopybuildingid) || !isset($zcopybuildingid)) {
			$zcopybuildingid = $zbuildingid;
		}
		return $zcopybuildingid;
	}
	
	public function deleteBuilding($zbuildingid) {
		/* flag the building as deleted */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->checkAdminAccess("", $zbuildingid, "")) {
				$zdeleteindex = 2;
				$zresults = $wtwhandlers->query("
					select max(deleted) as maxdeleted 
					from ".wtw_tableprefix."buildingmolds 
					where buildingid='".$zbuildingid."' limit 1;");
				foreach ($zresults as $zrow) {
					$zdeleteindex = $wtwhandlers->getNumber($zrow["maxdeleted"],2);
				}
				$zdeleteindex += 1;
				$this->clearBuilding($zbuildingid);
				$wtwhandlers->query("
					update ".wtw_tableprefix."webaliases
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where buildingid='".$zbuildingid."'
						and deleted=0
						and not buildingid='';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."buildings
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where buildingid='".$zbuildingid."'
						and deleted=0
						and not buildingid='';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."userauthorizations
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where buildingid='".$zbuildingid."'
						and deleted=0
						and not buildingid='';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwbuildings.php-deleteBuilding=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function copyBuilding($zbuildingid, $zcopybuildingid) { 
		/* used to create a new building from media library templates or building to copy */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			/* new building has to already exist */
			/* does user have access to copy building and new building */
			if ($wtwhandlers->checkUpdateAccess("", $zbuildingid, "") && $wtwhandlers->checkUpdateAccess("", $zcopybuildingid, "")) {
				/* update actionzones */
				$zresults = $wtwhandlers->query("
					select 
						 t2.actionzoneid as pastactionzoneid,
						 t2.communityid,
						 '".$zbuildingid."' as buildingid,
						 t2.thingid,
						 t2.attachmoldid,
						 t2.loadactionzoneid,
						 t2.actionzonename,
						 t2.actionzonetype,
						 t2.actionzoneshape,
						 t2.movementtype,
						 t2.positionx,
						 t2.positiony,
						 t2.positionz,
						 t2.scalingx,
						 t2.scalingy,
						 t2.scalingz,
						 t2.rotationx,
						 t2.rotationy,
						 t2.rotationz,
						 t2.axispositionx,
						 t2.axispositiony,
						 t2.axispositionz,
						 t2.axisrotationx,
						 t2.axisrotationy,
						 t2.axisrotationz,
						 t2.rotateaxis,
						 t2.rotatedegrees,
						 t2.rotatedirection,
						 t2.rotatespeed,
						 t2.movementdistance,
						 t2.parentactionzoneid,
						 t2.jsfunction,
						 t2.jsparameters,
						 now() as createdate,
						 '".$wtwhandlers->userid."' as createuserid,
						 now() as updatedate,
						 '".$wtwhandlers->userid."' as updateuserid
					from ".wtw_tableprefix."actionzones t2
					where t2.buildingid='".$zcopybuildingid."'
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zactionzoneid = $wtwhandlers->getRandomString(16,1);
					$zpastactionzoneid = $zrow["pastactionzoneid"];
					$zcommunityid = $zrow["communityid"];
					$zthingid = $zrow["thingid"];
					$zattachmoldid = $zrow["attachmoldid"];
					$zloadactionzoneid = $zrow["loadactionzoneid"];
					$zactionzonename = $zrow["actionzonename"];
					$zactionzonetype = $zrow["actionzonetype"];
					$zactionzoneshape = $zrow["actionzoneshape"];
					$zmovementtype = $zrow["movementtype"];
					$zpositionx = $zrow["positionx"];
					$zpositiony = $zrow["positiony"];
					$zpositionz = $zrow["positionz"];
					$zscalingx = $zrow["scalingx"];
					$zscalingy = $zrow["scalingy"];
					$zscalingz = $zrow["scalingz"];
					$zrotationx = $zrow["rotationx"];
					$zrotationy = $zrow["rotationy"];
					$zrotationz = $zrow["rotationz"];
					$zaxispositionx = $zrow["axispositionx"];
					$zaxispositiony = $zrow["axispositiony"];
					$zaxispositionz = $zrow["axispositionz"];
					$zaxisrotationx = $zrow["axisrotationx"];
					$zaxisrotationy = $zrow["axisrotationy"];
					$zaxisrotationz = $zrow["axisrotationz"];
					$zrotateaxis = $zrow["rotateaxis"];
					$zrotatedegrees = $zrow["rotatedegrees"];
					$zrotatedirection = $zrow["rotatedirection"];
					$zrotatespeed = $zrow["rotatespeed"];
					$zmovementdistance = $zrow["movementdistance"];
					$zparentactionzoneid = $zrow["parentactionzoneid"];
					$zjsfunction = $zrow["jsfunction"];
					$zjsparameters = $zrow["jsparameters"];
					
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."actionzones
							(actionzoneid,
							 pastactionzoneid,
							 communityid,
							 buildingid,
							 thingid,
							 attachmoldid,
							 loadactionzoneid,
							 actionzonename,
							 actionzonetype,
							 actionzoneshape,
							 movementtype,
							 positionx,
							 positiony,
							 positionz,
							 scalingx,
							 scalingy,
							 scalingz,
							 rotationx,
							 rotationy,
							 rotationz,
							 axispositionx,
							 axispositiony,
							 axispositionz,
							 axisrotationx,
							 axisrotationy,
							 axisrotationz,
							 rotateaxis,
							 rotatedegrees,
							 rotatedirection,
							 rotatespeed,
							 movementdistance,
							 parentactionzoneid,
							 jsfunction,
							 jsparameters,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
						   ('".$zactionzoneid."',
							'".$zpastactionzoneid."',
							'".$zcommunityid."',
							'".$zbuildingid."',
							'".$zthingid."',
							'".$zattachmoldid."',
							'".$zloadactionzoneid."',
							'".$wtwhandlers->escapeHTML($zactionzonename)."',
							'".$zactionzonetype."',
							'".$zactionzoneshape."',
							'".$zmovementtype."',
							".$wtwhandlers->checkNumber($zpositionx,0).",
							".$wtwhandlers->checkNumber($zpositiony,0).",
							".$wtwhandlers->checkNumber($zpositionz,0).",
							".$wtwhandlers->checkNumber($zscalingx,1).",
							".$wtwhandlers->checkNumber($zscalingy,1).",
							".$wtwhandlers->checkNumber($zscalingz,1).",
							".$wtwhandlers->checkNumber($zrotationx,0).",
							".$wtwhandlers->checkNumber($zrotationy,0).",
							".$wtwhandlers->checkNumber($zrotationz,0).",
							".$wtwhandlers->checkNumber($zaxispositionx,0).",
							".$wtwhandlers->checkNumber($zaxispositiony,0).",
							".$wtwhandlers->checkNumber($zaxispositionz,0).",
							".$wtwhandlers->checkNumber($zaxisrotationx,0).",
							".$wtwhandlers->checkNumber($zaxisrotationy,0).",
							".$wtwhandlers->checkNumber($zaxisrotationz,0).",
							'".$zrotateaxis."',
							".$wtwhandlers->checkNumber($zrotatedegrees,90).",
							".$wtwhandlers->checkNumber($zrotatedirection,1).",
							".$wtwhandlers->checkNumber($zrotatespeed,0).",
							".$wtwhandlers->checkNumber($zmovementdistance,20).",
							'".$zparentactionzoneid."',
							'".$zjsfunction."',
							'".$zjsparameters."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}

				/* update children connecting grids */
				$zresults = $wtwhandlers->query("
					select 
						 t2.connectinggridid as pastconnectinggridid,
						 t2.parentwebid,
						 t2.parentwebtype,
						 '".$zbuildingid."' as childwebid,
						 t2.childwebtype,
						 t2.positionx,
						 t2.positiony,
						 t2.positionz,
						 t2.scalingx,
						 t2.scalingy,
						 t2.scalingz,
						 t2.rotationx,
						 t2.rotationy,
						 t2.rotationz,
						 t2.loadactionzoneid,
						 t2.unloadactionzoneid,
						 t2.attachactionzoneid,
						 t2.alttag,
						 now() as createdate,
						 '".$wtwhandlers->userid."' as createuserid,
						 now() as updatedate,
						 '".$wtwhandlers->userid."' as updateuserid
					from ".wtw_tableprefix."connectinggrids t2
					where t2.childwebid='".$zcopybuildingid."'
						and t2.parentwebid=''
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zconnectinggridid = $wtwhandlers->getRandomString(16,1);
					$zpastconnectinggridid = $zrow["pastconnectinggridid"];
					$zparentwebid = $zrow["pastconnectinggridid"];
					$zparentwebtype = $zrow["pastconnectinggridid"];
					$zchildwebid = $zbuildingid;
					$zchildwebtype = $zrow["pastconnectinggridid"];
					$zpositionx = $zrow["pastconnectinggridid"];
					$zpositiony = $zrow["pastconnectinggridid"];
					$zpositionz = $zrow["pastconnectinggridid"];
					$zscalingx = $zrow["pastconnectinggridid"];
					$zscalingy = $zrow["pastconnectinggridid"];
					$zscalingz = $zrow["pastconnectinggridid"];
					$zrotationx = $zrow["pastconnectinggridid"];
					$zrotationy = $zrow["pastconnectinggridid"];
					$zrotationz = $zrow["pastconnectinggridid"];
					$zloadactionzoneid = $zrow["pastconnectinggridid"];
					$zunloadactionzoneid = $zrow["pastconnectinggridid"];
					$zattachactionzoneid = $zrow["pastconnectinggridid"];
					$zalttag = $zrow["pastconnectinggridid"];
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."connectinggrids
							(connectinggridid,
							 pastconnectinggridid,
							 parentwebid,
							 parentwebtype,
							 childwebid,
							 childwebtype,
							 positionx,
							 positiony,
							 positionz,
							 scalingx,
							 scalingy,
							 scalingz,
							 rotationx,
							 rotationy,
							 rotationz,
							 loadactionzoneid,
							 unloadactionzoneid,
							 attachactionzoneid,
							 alttag,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zconnectinggridid."',
							 '".$zpastconnectinggridid."',
							 '".$zparentwebid."',
							 '".$zparentwebtype."',
							 '".$zchildwebid."',
							 '".$zchildwebtype."',
							 ".$wtwhandlers->checkNumber($zpositionx,0).",
							 ".$wtwhandlers->checkNumber($zpositiony,0).",
							 ".$wtwhandlers->checkNumber($zpositionz,0).",
							 ".$wtwhandlers->checkNumber($zscalingx,1).",
							 ".$wtwhandlers->checkNumber($zscalingy,1).",
							 ".$wtwhandlers->checkNumber($zscalingz,1).",
							 ".$wtwhandlers->checkNumber($zrotationx,0).",
							 ".$wtwhandlers->checkNumber($zrotationy,0).",
							 ".$wtwhandlers->checkNumber($zrotationz,0).",
							 '".$zloadactionzoneid."',
							 '".$zunloadactionzoneid."',
							 '".$zattachactionzoneid."',
							 '".$wtwhandlers->escapeHTML($zalttag)."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
				/* update parent connecting grids */
				$zresults = $wtwhandlers->query("
					select 
						 t2.connectinggridid as pastconnectinggridid,
						 '".$zbuildingid."' as parentwebid,
						 t2.parentwebtype,
						 t2.childwebid,
						 t2.childwebtype,
						 t2.positionx,
						 t2.positiony,
						 t2.positionz,
						 t2.scalingx,
						 t2.scalingy,
						 t2.scalingz,
						 t2.rotationx,
						 t2.rotationy,
						 t2.rotationz,
						 t2.loadactionzoneid,
						 t2.unloadactionzoneid,
						 t2.attachactionzoneid,
						 t2.alttag,
						 now() as createdate,
						 '".$wtwhandlers->userid."' as createuserid,
						 now() as updatedate,
						 '".$wtwhandlers->userid."' as updateuserid
					from ".wtw_tableprefix."connectinggrids t2
					where t2.parentwebid='".$zcopybuildingid."'
						and t2.deleted=0;						
						");
				foreach ($zresults as $zrow) {
					$zconnectinggridid = $wtwhandlers->getRandomString(16,1);
					$zpastconnectinggridid = $zrow["pastconnectinggridid"];
					$zparentwebid = $zbuildingid;
					$zparentwebtype = $zrow["pastconnectinggridid"];
					$zchildwebid = $zrow["childwebid"];
					$zchildwebtype = $zrow["pastconnectinggridid"];
					$zpositionx = $zrow["pastconnectinggridid"];
					$zpositiony = $zrow["pastconnectinggridid"];
					$zpositionz = $zrow["pastconnectinggridid"];
					$zscalingx = $zrow["pastconnectinggridid"];
					$zscalingy = $zrow["pastconnectinggridid"];
					$zscalingz = $zrow["pastconnectinggridid"];
					$zrotationx = $zrow["pastconnectinggridid"];
					$zrotationy = $zrow["pastconnectinggridid"];
					$zrotationz = $zrow["pastconnectinggridid"];
					$zloadactionzoneid = $zrow["pastconnectinggridid"];
					$zunloadactionzoneid = $zrow["pastconnectinggridid"];
					$zattachactionzoneid = $zrow["pastconnectinggridid"];
					$zalttag = $zrow["pastconnectinggridid"];
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."connectinggrids
							(connectinggridid,
							 pastconnectinggridid,
							 parentwebid,
							 parentwebtype,
							 childwebid,
							 childwebtype,
							 positionx,
							 positiony,
							 positionz,
							 scalingx,
							 scalingy,
							 scalingz,
							 rotationx,
							 rotationy,
							 rotationz,
							 loadactionzoneid,
							 unloadactionzoneid,
							 attachactionzoneid,
							 alttag,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zconnectinggridid."',
							 '".$zpastconnectinggridid."',
							 '".$zparentwebid."',
							 '".$zparentwebtype."',
							 '".$zchildwebid."',
							 '".$zchildwebtype."',
							 ".$wtwhandlers->checkNumber($zpositionx,0).",
							 ".$wtwhandlers->checkNumber($zpositiony,0).",
							 ".$wtwhandlers->checkNumber($zpositionz,0).",
							 ".$wtwhandlers->checkNumber($zscalingx,1).",
							 ".$wtwhandlers->checkNumber($zscalingy,1).",
							 ".$wtwhandlers->checkNumber($zscalingz,1).",
							 ".$wtwhandlers->checkNumber($zrotationx,0).",
							 ".$wtwhandlers->checkNumber($zrotationy,0).",
							 ".$wtwhandlers->checkNumber($zrotationz,0).",
							 '".$zloadactionzoneid."',
							 '".$zunloadactionzoneid."',
							 '".$zattachactionzoneid."',
							 '".$wtwhandlers->escapeHTML($zalttag)."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}				
				/* update automations */
				$zresults = $wtwhandlers->query("
					select
						 t2.automationid as pastautomationid,
						 t2.automationname,
						 t2.communityid,
						 '".$zbuildingid."' as buildingid,
						 t2.thingid,
						 t2.loadactionzoneid,
						 t2.jsfunction,
						 t2.jsparameters,
						 now() as createdate,
						 '".$wtwhandlers->userid."' as createuserid,
						 now() as updatedate,
						 '".$wtwhandlers->userid."' as updateuserid
					from ".wtw_tableprefix."automations t2
					where t2.buildingid='".$zcopybuildingid."'
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zautomationid = $wtwhandlers->getRandomString(16,1);
					$zpastautomationid = $zrow["pastautomationid"];
					$zautomationname = $zrow["automationname"];
					$zcommunityid = $zrow["communityid"];
					$zbuildingid = $zrow["buildingid"];
					$zthingid = $zrow["thingid"];
					$zloadactionzoneid = $zrow["loadactionzoneid"];
					$zjsfunction = $zrow["jsfunction"];
					$zjsparameters = $zrow["jsparameters"];
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."automations
							(automationid,
							 pastautomationid,
							 automationname,
							 communityid,
							 buildingid,
							 thingid,
							 loadactionzoneid,
							 jsfunction,
							 jsparameters,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zautomationid."',
							 '".$zpastautomationid."',
							 '".$wtwhandlers->escapeHTML($zautomationname)."',
							 '".$zcommunityid."',
							 '".$zbuildingid."',
							 '".$zthingid."',
							 '".$zloadactionzoneid."',
							 '".$zjsfunction."',
							 '".$zjsparameters."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
				/* update automation steps */
				$zresults = $wtwhandlers->query("
					select 
						 t2.automationstepid as pastautomationstepid,
						 t3.automationid as automationid,
						 t2.step,
						 t2.automationtype,
						 t4.actionzoneid as actionzoneid,
						 t2.actionzonestatus,
						 t2.conditionoperator,
						 t2.conditionstatus,
						 t2.conditionvalue,
						 t2.jsfunction,
						 t2.jsparameters,
						 now() as createdate,
						 '".$wtwhandlers->userid."' as createuserid,
						 now() as updatedate,
						 '".$wtwhandlers->userid."' as updateuserid
					from (select * from ".wtw_tableprefix."automations 
								where buildingid='".$zcopybuildingid."' and deleted=0) t1
							inner join ".wtw_tableprefix."automationsteps t2
								on t1.automationid=t2.automationid
							left join (select automationid, pastautomationid 
									from ".wtw_tableprefix."automations) t3
								on t3.pastautomationid=t2.automationid
							left join (select actionzoneid, pastactionzoneid 
									from ".wtw_tableprefix."actionzones) t4
								on t4.pastactionzoneid=t2.actionzoneid
					where t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."automationsteps
							(automationstepid,
							 pastautomationstepid,
							 automationid,
							 step,
							 automationtype,
							 actionzoneid,
							 actionzonestatus,
							 conditionoperator,
							 conditionstatus,
							 conditionvalue,
							 jsfunction,
							 jsparameters,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)					
						value
							('".$zautomationstepid."',
							 '".$zpastautomationstepid."',
							 '".$zautomationid."',
							 ".$wtwhandlers->checkNumber($zstep,1).",
							 '".$zautomationtype."',
							 '".$zactionzoneid."',
							 '".$zactionzonestatus."',
							 '".$zconditionoperator."',
							 '".$zconditionstatus."',
							 ".$wtwhandlers->checkNumber($zconditionvalue,0).",
							 '".$zjsfunction."',
							 '".$zjsparameters."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
				/* update building molds */
				$zresults = $wtwhandlers->query("
					select 
						 t3.buildingmoldid as pastbuildingmoldid,
						 '".$zbuildingid."' as buildingid,
						 t3.loadactionzoneid,
						 t3.shape,
						 t3.covering,
						 t3.positionx,
						 t3.positiony,
						 t3.positionz,
						 t3.scalingx,
						 t3.scalingy,
						 t3.scalingz,
						 t3.rotationx,
						 t3.rotationy,
						 t3.rotationz,
						 t3.special1,
						 t3.special2,
						 t3.uoffset,
						 t3.voffset,
						 t3.uscale,
						 t3.vscale,
						 t3.uploadobjectid,
						 t3.receiveshadows,
						 t3.graphiclevel,
						 t3.textureid,
						 t3.texturebumpid,
						 t3.texturehover,
						 t3.texturehoverid,
						 t3.videoid,
						 t3.videoposterid,
						 t3.heightmapid,
						 t3.mixmapid,
						 t3.texturerid,
						 t3.texturegid,
						 t3.texturebid,
						 t3.texturebumprid,
						 t3.texturebumpgid,
						 t3.texturebumpbid,
						 t3.soundid,
						 t3.soundname,
						 t3.soundattenuation,
						 t3.soundloop,
						 t3.soundmaxdistance,
						 t3.soundrollofffactor,
						 t3.soundrefdistance,
						 t3.soundconeinnerangle,
						 t3.soundconeouterangle,
						 t3.soundconeoutergain,
						 t3.webtext,
						 t3.webstyle,
						 t3.opacity,
						 t3.sideorientation,
						 t3.billboard,
						 t3.waterreflection,
						 t3.subdivisions,
						 t3.minheight,
						 t3.maxheight,
						 t3.checkcollisions,
						 t3.ispickable,
						 t3.actionzoneid,
						 t3.csgmoldid,
						 t3.csgaction,
						 t3.alttag,
						 t3.jsfunction,
						 t3.jsparameters,
						 t3.diffusecolorr,
						 t3.diffusecolorg,
						 t3.diffusecolorb,
						 t3.specularcolorr,
						 t3.specularcolorg,
						 t3.specularcolorb,
						 t3.emissivecolorr,
						 t3.emissivecolorg,
						 t3.emissivecolorb,
						 now() as createdate,
						 '".$wtwhandlers->userid."' as createuserid,
						 now() as updatedate,
						 '".$wtwhandlers->userid."' as updateuserid
						from ".wtw_tableprefix."buildingmolds t3
						where t3.buildingid='".$zcopybuildingid."'
						and t3.deleted=0;");
				foreach ($zresults as $zrow) {
					$zbuildingmoldid = $wtwhandlers->getRandomString(16,1);
					$zpastbuildingmoldid = $zrow["pastbuildingmoldid"];
					$zloadactionzoneid = $zrow["loadactionzoneid"];
					$zshape = $zrow["pastbuildingmoldid"];
					$zcovering = $zrow["covering"];
					$zpositionx = $zrow["positionx"];
					$zpositiony = $zrow["positiony"];
					$zpositionz = $zrow["positionz"];
					$zscalingx = $zrow["scalingx"];
					$zscalingy = $zrow["scalingy"];
					$zscalingz = $zrow["scalingz"];
					$zrotationx = $zrow["rotationx"];
					$zrotationy = $zrow["rotationy"];
					$zrotationz = $zrow["rotationz"];
					$zspecial1 = $zrow["special1"];
					$zspecial2 = $zrow["special2"];
					$zuoffset = $zrow["uoffset"];
					$zvoffset = $zrow["voffset"];
					$zuscale = $zrow["uscale"];
					$zvscale = $zrow["vscale"];
					$zuploadobjectid = $zrow["uploadobjectid"];
					$zreceiveshadows = $zrow["receiveshadows"];
					$zgraphiclevel = $zrow["graphiclevel"];
					$ztextureid = $zrow["textureid"];
					$ztexturebumpid = $zrow["texturebumpid"];
					$ztexturehover = $zrow["texturehover"];
					$ztexturehoverid = $zrow["texturehoverid"];
					$zvideoid = $zrow["videoid"];
					$zvideoposterid = $zrow["videoposterid"];
					$zheightmapid = $zrow["heightmapid"];
					$zmixmapid = $zrow["mixmapid"];
					$ztexturerid = $zrow["texturerid"];
					$ztexturegid = $zrow["texturegid"];
					$ztexturebid = $zrow["texturebid"];
					$ztexturebumprid = $zrow["texturebumprid"];
					$ztexturebumpgid = $zrow["texturebumpgid"];
					$ztexturebumpbid = $zrow["texturebumpbid"];
					$zsoundid = $zrow["soundid"];
					$zsoundname = $zrow["soundname"];
					$zsoundattenuation = $zrow["soundattenuation"];
					$zsoundloop = $zrow["soundloop"];
					$zsoundmaxdistance = $zrow["soundmaxdistance"];
					$zsoundrollofffactor = $zrow["soundrollofffactor"];
					$zsoundrefdistance = $zrow["soundrefdistance"];
					$zsoundconeinnerangle = $zrow["soundconeinnerangle"];
					$zsoundconeouterangle = $zrow["soundconeouterangle"];
					$zsoundconeoutergain = $zrow["soundconeoutergain"];
					$zwebtext = $zrow["webtext"];
					$zwebstyle = $zrow["webstyle"];
					$zopacity = $zrow["opacity"];
					$zsideorientation = $zrow["sideorientation"];
					$zbillboard = $zrow["billboard"];
					$zwaterreflection = $zrow["waterreflection"];
					$zsubdivisions = $zrow["subdivisions"];
					$zminheight = $zrow["minheight"];
					$zmaxheight = $zrow["maxheight"];
					$zcheckcollisions = $zrow["checkcollisions"];
					$zispickable = $zrow["ispickable"];
					$zactionzoneid = $zrow["actionzoneid"];
					$zcsgmoldid = $zrow["csgmoldid"];
					$zcsgaction = $zrow["csgaction"];
					$zalttag = $zrow["alttag"];
					$zjsfunction = $zrow["jsfunction"];
					$zjsparameters = $zrow["jsparameters"];
					$zdiffusecolorr = $zrow["diffusecolorr"];
					$zdiffusecolorg = $zrow["diffusecolorg"];
					$zdiffusecolorb = $zrow["diffusecolorb"];
					$zspecularcolorr = $zrow["specularcolorr"];
					$zspecularcolorg = $zrow["specularcolorg"];
					$zspecularcolorb = $zrow["specularcolorb"];
					$zemissivecolorr = $zrow["emissivecolorr"];
					$zemissivecolorg = $zrow["emissivecolorg"];
					$zemissivecolorb = $zrow["emissivecolorb"];

					$wtwhandlers->query("
						INSERT INTO ".wtw_tableprefix."buildingmolds
							(buildingmoldid,
							pastbuildingmoldid,
							buildingid,
							loadactionzoneid,
							shape,
							covering,
							positionx,
							positiony,
							positionz,
							scalingx,
							scalingy,
							scalingz,
							rotationx,
							rotationy,
							rotationz,
							special1,
							special2,
							uoffset,
							voffset,
							uscale,
							vscale,
							uploadobjectid,
							receiveshadows,
							graphiclevel,
							textureid,
							texturebumpid,
							texturehover,
							texturehoverid,
							videoid,
							videoposterid,
							heightmapid,
							mixmapid,
							texturerid,
							texturegid,
							texturebid,
							texturebumprid,
							texturebumpgid,
							texturebumpbid,
							soundid,
							soundname,
							soundattenuation,
							soundloop,
							soundmaxdistance,
							soundrollofffactor,
							soundrefdistance,
							soundconeinnerangle,
							soundconeouterangle,
							soundconeoutergain,
							webtext,
							webstyle,
							opacity,
							sideorientation,
							billboard,
							waterreflection,
							subdivisions,
							minheight,
							maxheight,
							checkcollisions,
							ispickable,
							actionzoneid,
							csgmoldid,
							csgaction,
							alttag,
							jsfunction,
							jsparameters,
							diffusecolorr,
							diffusecolorg,
							diffusecolorb,
							specularcolorr,
							specularcolorg,
							specularcolorb,
							emissivecolorr,
							emissivecolorg,
							emissivecolorb,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
							('".$zbuildingmoldid."',
							'".$zpastbuildingmoldid."',
							'".$zbuildingid."',
							'".$zloadactionzoneid."',
							'".$zshape."',
							'".$zcovering."',
							".$wtwhandlers->checkNumber($zpositionx,0).",
							".$wtwhandlers->checkNumber($zpositiony,0).",
							".$wtwhandlers->checkNumber($zpositionz,0).",
							".$wtwhandlers->checkNumber($zscalingx,1).",
							".$wtwhandlers->checkNumber($zscalingy,1).",
							".$wtwhandlers->checkNumber($zscalingz,1).",
							".$wtwhandlers->checkNumber($zrotationx,0).",
							".$wtwhandlers->checkNumber($zrotationy,0).",
							".$wtwhandlers->checkNumber($zrotationz,0).",
							".$wtwhandlers->checkNumber($zspecial1,0).",
							".$wtwhandlers->checkNumber($zspecial2,0).",
							".$wtwhandlers->checkNumber($zuoffset,0).",
							".$wtwhandlers->checkNumber($zvoffset,0).",
							".$wtwhandlers->checkNumber($zuscale,0).",
							".$wtwhandlers->checkNumber($zvscale,0).",
							'".$zuploadobjectid."',
							'".$zreceiveshadows."',
							".$wtwhandlers->checkNumber($zgraphiclevel,0).",
							'".$ztextureid."',
							'".$ztexturebumpid."',
							'".$ztexturehover."',
							'".$ztexturehoverid."',
							'".$zvideoid."',
							'".$zvideoposterid."',
							'".$zheightmapid."',
							'".$zmixmapid."',
							'".$ztexturerid."',
							'".$ztexturegid."',
							'".$ztexturebid."',
							'".$ztexturebumprid."',
							'".$ztexturebumpgid."',
							'".$ztexturebumpbid."',
							'".$zsoundid."',
							'".$wtwhandlers->escapeHTML($zsoundname)."',
							'".$zsoundattenuation."',
							".$wtwhandlers->checkNumber($zsoundloop,1).",
							".$wtwhandlers->checkNumber($zsoundmaxdistance,100).",
							".$wtwhandlers->checkNumber($zsoundrollofffactor,1).",
							".$wtwhandlers->checkNumber($zsoundrefdistance,1).",
							".$wtwhandlers->checkNumber($zsoundconeinnerangle,90).",
							".$wtwhandlers->checkNumber($zsoundconeouterangle,180).",
							".$wtwhandlers->checkNumber($zsoundconeoutergain,.5).",
							'".$wtwhandlers->escapeHTML($zwebtext)."',
							'".$wtwhandlers->escapeHTML($zwebstyle)."',
							".$wtwhandlers->checkNumber($zopacity,100).",
							'".$zsideorientation."',
							".$wtwhandlers->checkNumber($zbillboard,0).",
							".$wtwhandlers->checkNumber($zwaterreflection,0).",
							".$wtwhandlers->checkNumber($zsubdivisions,12).",
							".$wtwhandlers->checkNumber($zminheight,0).",
							".$wtwhandlers->checkNumber($zmaxheight,30).",
							".$wtwhandlers->checkNumber($zcheckcollisions,1).",
							".$wtwhandlers->checkNumber($zispickable,1).",
							'".$zactionzoneid."',
							'".$zcsgmoldid."',
							'".$zcsgaction."',
							'".$wtwhandlers->escapeHTML($zalttag)."',
							'".$zjsfunction."',
							'".$zjsparameters."',
							".$wtwhandlers->checkNumber($zdiffusecolorr,1).",
							".$wtwhandlers->checkNumber($zdiffusecolorg,1).",
							".$wtwhandlers->checkNumber($zdiffusecolorb,1).",
							".$wtwhandlers->checkNumber($zspecularcolorr,1).",
							".$wtwhandlers->checkNumber($zspecularcolorg,1).",
							".$wtwhandlers->checkNumber($zspecularcolorb,1).",
							".$wtwhandlers->checkNumber($zemissivecolorr,1).",
							".$wtwhandlers->checkNumber($zemissivecolorg,1).",
							".$wtwhandlers->checkNumber($zemissivecolorb,1).",
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');");
				}
				/* update web images */
				$zresults = $wtwhandlers->query("
					select 
						 t4.webimageid as pastwebimageid,
						 '' as thingmoldid,
						 t6.buildingmoldid as buildingmoldid,
						 '' as communitymoldid,
						 t4.imageindex,
						 t4.imageid,
						 t4.imagehoverid,
						 t4.imageclickid,
						 t4.jsfunction,
						 t4.jsparameters,
						 t4.userid,
						 t4.alttag,
						 now() as createdate,
						 '".$wtwhandlers->userid."' as createuserid,
						 now() as updatedate,
						 '".$wtwhandlers->userid."' as updateuserid
					from ".wtw_tableprefix."webimages t4 
						inner join ".wtw_tableprefix."buildingmolds t5
							on t4.buildingmoldid=t5.buildingmoldid
						left join (select buildingmoldid, pastbuildingmoldid 
								from ".wtw_tableprefix."buildingmolds 
								where buildingid='".$zbuildingid."' and (not buildingid='')) t6
							on t6.pastbuildingmoldid=t4.buildingmoldid
					where t5.buildingid='".$zcopybuildingid."'
							and not t4.buildingmoldid=''
							and t5.deleted=0
							and t4.deleted=0;");
				foreach ($zresults as $zrow) {
					$zwebimageid = $wtwhandlers->getRandomString(16,1); 
					$zpastwebimageid = $zrow["pastwebimageid"];
					$zthingmoldid = $zrow["thingmoldid"];
					$zbuildingmoldid = $zrow["buildingmoldid"];
					$zcommunitymoldid = $zrow["communitymoldid"];
					$zimageindex = $zrow["imageindex"];
					$zimageid = $zrow["imageid"];
					$zimagehoverid = $zrow["imagehoverid"];
					$zimageclickid = $zrow["imageclickid"];
					$zjsfunction = $zrow["jsfunction"];
					$zjsparameters = $zrow["jsparameters"];
					$zalttag = $zrow["alttag"];
					
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."webimages
							(webimageid,
							 pastwebimageid,
							 thingmoldid,
							 buildingmoldid,
							 communitymoldid,
							 imageindex,
							 imageid,
							 imagehoverid,
							 imageclickid,
							 jsfunction,
							 jsparameters,
							 userid,
							 alttag,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zwebimageid."',
							 '".$zpastwebimageid."',
							 '".$zthingmoldid."',
							 '".$zbuildingmoldid."',
							 '".$zcommunitymoldid."',
							 ".$wtwhandlers->checkNumber($zimageindex,0).",
							 '".$zimageid."',
							 '".$zimagehoverid."',
							 '".$zimageclickid."',
							 '".$zjsfunction."',
							 '".$zjsparameters."',
							 '".$wtwhandlers->userid."',
							 '".$zalttag."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
				/* update mold points */
				$zresults = $wtwhandlers->query("
					select 
						 t6.buildingmoldid as moldid,
						 t4.pathnumber,
						 t4.sorder,
						 t4.positionx,
						 t4.positiony,
						 t4.positionz,
						 now() as createdate,
						 '".$wtwhandlers->userid."' as createuserid,
						 now() as updatedate,
						 '".$wtwhandlers->userid."' as updateuserid
					from ".wtw_tableprefix."moldpoints t4 
						inner join ".wtw_tableprefix."buildingmolds t5
							on t4.moldid = t5.buildingmoldid
						left join (select buildingmoldid, pastbuildingmoldid 
								from ".wtw_tableprefix."buildingmolds 
								where buildingid='".$zbuildingid."' and (not buildingid='')) t6
							on t6.pastbuildingmoldid=t4.moldid
					where t5.buildingid='".$zcopybuildingid."'
						and (not t4.moldid='')
						and t5.deleted=0
						and t4.deleted=0;");
				foreach ($zresults as $zrow) {
					$zmoldpointid = $wtwhandlers->getRandomString(16,1); 
					$zmoldid = $zrow["moldid"];
					$zpathnumber = $zrow["pathnumber"];
					$zsorder = $zrow["sorder"];
					$zpositionx = $zrow["positionx"];
					$zpositiony = $zrow["positiony"];
					$zpositionz = $zrow["positionz"];
					
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."moldpoints
							(moldpointid,
							 moldid,
							 pathnumber,
							 sorder,
							 positionx,
							 positiony,
							 positionz,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zmoldpointid."',
							 '".$zmoldid."',
							 ".$wtwhandlers->checkNumber($zpathnumber,1).",
							 ".$wtwhandlers->checkNumber($zsorder,0).",
							 ".$wtwhandlers->checkNumber($zpositionx,0).",
							 ".$wtwhandlers->checkNumber($zpositiony,0).",
							 ".$wtwhandlers->checkNumber($zpositionz,0).",
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
				$wtwhandlers->query("
					update ".wtw_tableprefix."buildingmolds
					set actionzoneid=''
					where actionzoneid is null 
						and buildingid='".$zbuildingid,"';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."buildingmolds
					set csgmoldid=''
					where csgmoldid is null 
						and buildingid='".$zbuildingid,"';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones
					set attachmoldid=''
					where attachmoldid is null 
						and buildingid='".$zbuildingid,"' and (not buildingid='');");
				$wtwhandlers->query("
					update ".wtw_tableprefix."buildingmolds t1 
						left join (select * from ".wtw_tableprefix."buildingmolds where buildingid='".$zbuildingid,"' and deleted=0) t2
						on t1.csgmoldid = t2.pastbuildingmoldid
					set t1.csgmoldid = t2.buildingmoldid
					where t1.buildingid='".$zbuildingid,"'
						and (not t1.csgmoldid='')
						and (not t2.buildingmoldid is null);");
				$wtwhandlers->query("
					update ".wtw_tableprefix."buildingmolds t1 
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid,"' and deleted=0) t2
						on t1.actionzoneid = t2.pastactionzoneid
					set t1.actionzoneid = t2.actionzoneid
					where t1.buildingid='".$zbuildingid,"'
						and (not t1.actionzoneid='')
						and (not t2.actionzoneid is null);");
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones t1
						left join (select * from ".wtw_tableprefix."buildingmolds where buildingid='".$zbuildingid,"' and (not buildingid='') and deleted=0) t2
						on t1.attachmoldid=t2.pastbuildingmoldid
					set t1.attachmoldid=t2.buildingmoldid
					where t1.buildingid='".$zbuildingid,"'
						and (not t1.attachmoldid='')
						and (not t2.buildingmoldid is null);");
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones t1
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid,"' and (not buildingid='') and deleted=0) t2
						on t1.parentactionzoneid=t2.pastactionzoneid
					set t1.parentactionzoneid=t2.actionzoneid
					where t1.buildingid='".$zbuildingid,"'
						and (not t1.parentactionzoneid='')
						and (not t2.actionzoneid is null);");
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones t1
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid,"' and (not buildingid='') and deleted=0) t2
						on t1.loadactionzoneid=t2.pastactionzoneid
					set t1.loadactionzoneid=t2.actionzoneid
					where t1.buildingid='".$zbuildingid,"'
						and (not t1.loadactionzoneid='')
						and (not t2.actionzoneid is null);");
				$wtwhandlers->query("
					update ".wtw_tableprefix."automations t1
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid,"' and (not buildingid='') and deleted=0) t2
						on t1.loadactionzoneid=t2.pastactionzoneid
					set t1.loadactionzoneid=t2.actionzoneid
					where t1.buildingid='".$zbuildingid,"'
						and (not t1.loadactionzoneid='');");
				$wtwhandlers->query("
					update ".wtw_tableprefix."buildingmolds t1
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid,"' and (not buildingid='') and deleted=0) t2
						on t1.loadactionzoneid=t2.pastactionzoneid
					set t1.loadactionzoneid=t2.actionzoneid
					where t1.buildingid='".$zbuildingid,"'
						and (not t1.loadactionzoneid='');");
				$wtwhandlers->query("
					update ".wtw_tableprefix."connectinggrids t1
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid,"' and (not buildingid='') and deleted=0) t2
						on t1.loadactionzoneid=t2.pastactionzoneid
					set t1.loadactionzoneid=t2.actionzoneid
					where t1.childwebid='".$zbuildingid,"'
						and t1.parentwebid=''
						and (not t1.loadactionzoneid='');");
				$wtwhandlers->query("
					update ".wtw_tableprefix."connectinggrids t1
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid,"' and (not buildingid='') and deleted=0) t2
						on t1.unloadactionzoneid=t2.pastactionzoneid
					set t1.unloadactionzoneid=t2.actionzoneid
					where t1.childwebid='".$zbuildingid,"'
						and t1.parentwebid=''
						and (not t1.unloadactionzoneid='');");
				$wtwhandlers->query("
					update ".wtw_tableprefix."connectinggrids t1
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid,"' and (not buildingid='') and deleted=0) t2
						on t1.attachactionzoneid=t2.pastactionzoneid
					set t1.attachactionzoneid=t2.actionzoneid
					where t1.parentwebid='".$zbuildingid,"'
						and (not t1.attachactionzoneid='');");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwbuildings.php-copyBuilding=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function clearBuilding($zbuildingid) {
		/* sets the deleted flag on all objects of a 3d building */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->checkUpdateAccess("", $zbuildingid, "")) {
				$zdeleteindex = 2;
				$zresults = $wtwhandlers->query("
					select max(deleted) as maxdeleted 
					from ".wtw_tableprefix."buildingmolds 
					where buildingid='".$zbuildingid."' limit 1;");
				foreach ($zresults as $zrow) {
					$zdeleteindex = $wtwhandlers->getNumber($zrow["maxdeleted"],2);
				}
				$zdeleteindex += 1;
				$wtwhandlers->query("
					update ".wtw_tableprefix."webimages w1 
						inner join ".wtw_tableprefix."buildingmolds bm1
							on w1.buildingmoldid = bm1.buildingmoldid
					set w1.deleted=".$zdeleteindex.",
						w1.deleteddate=now(),
						w1.deleteduserid='".$wtwhandlers->userid."'
					where bm1.buildingid='".$zbuildingid,"'
						and not bm1.buildingid=''
						and not w1.buildingmoldid=''
						and w1.deleted=0;");
				$wtwhandlers->query("
					update ".wtw_tableprefix."buildingmolds
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where buildingid='".$zbuildingid,"'
						and deleted=0;");
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where buildingid='".$zbuildingid,"'
						and deleted=0
						and not actionzonetype='loadzone';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."automations
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where buildingid='".$zbuildingid,"'
						and deleted=0;");
				$wtwhandlers->query("
					update ".wtw_tableprefix."webaliases
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where buildingid='".$zbuildingid,"'
						and deleted=0;");
				/* get 'high' distance load zone for initial slab of cement */
				$loadactionzoneid = "";
				$zresults = $wtwhandlers->query("
					select actionzoneid 
					from ".wtw_tableprefix."actionzones 
					where buildingid='".$zbuildingid,"' 
						and actionzonename like 'high%' 
						and actionzonetype='loadzone'
						and (not actionzonename like '%custom%') limit 1;");
				foreach ($zresults as $zrow) {
					$loadactionzoneid = $zrow["actionzoneid"];
				}
				if (!empty($loadactionzoneid) && isset($loadactionzoneid)) {
					/* add initial building slab of cement */
					$zbuildingmoldid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."buildingmolds
						   (buildingmoldid,
							buildingid,
							loadactionzoneid,
							shape,
							covering,
							positionx,
							positiony,
							positionz,
							scalingx,
							scalingy,
							scalingz,
							rotationx,
							rotationy,
							rotationz,
							special1,
							special2,
							uoffset,
							voffset,
							uscale,
							vscale,
							subdivisions,
							textureid,
							texturehoverid,
							heightmapid,
							opacity,
							waterreflection,
							actionzoneid,
							csgmoldid,
							csgaction,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$zbuildingmoldid."',
							'".$zbuildingid,"',
							'".$loadactionzoneid."',
							'floor',
							'texture',
							'0',
							'0',
							'0',
							'100',
							'1',
							'100',
							'0',
							'0',
							'0',
							'0',
							'0',
							'0',
							'0',
							'0',
							'0',
							'12',
							'4to027vq39087bxr',
							'',
							'',
							'100',
							'0',
							'',
							'',
							'0',
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');");
				}
				
				/* set the user starting position back to default new building setting */
				$wtwhandlers->query("
					update ".wtw_tableprefix."buildings
					set positionx=-80.00,
						positiony=9.00,
						positionz=40.00,
						scalingx=1,
						scalingy=1,
						scalingz=1,
						rotationx=-5,
						rotationy=100,
						rotationz=0,
						gravity=1
					where buildingid='".$zbuildingid,"';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwbuildings.php-clearBuilding=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function importBuilding($zbuildingid, $zpastbuildingid, $zbuildingname, $zbuildinganalyticsid, $zstartpositionx, $zstartpositiony, $zstartpositionz, $zstartscalingx, $zstartscalingy, $zstartscalingz, $zstartrotationx, $zstartrotationy, $zstartrotationz, $zgravity, $zalttag) {
		/* import building from 3dnet.walktheweb.com in the media library */
		global $wtwhandlers;
		try {
			/* ini_set('max_execution_time', 300); */
			if (!empty($wtwhandlers->getSessionUserID())) {
				if ($wtwhandlers->keyExists(wtw_tableprefix.'buildings', 'buildingid', $zbuildingid) == false) {
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."buildings
							(buildingid, 
							 pastbuildingid, 
							 buildingname, 
							 analyticsid, 
							 positionx, 
							 positiony, 
							 positionz, 
							 scalingx, 
							 scalingy, 
							 scalingz, 
							 rotationx, 
							 rotationy, 
							 rotationz, 
							 gravity, 
							 alttag,
							 userid,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zbuildingid."', 
							 '".$zpastbuildingid."', 
							 '".$zbuildingname."', 
							 '".$zbuildinganalyticsid."', 
							 ".$zstartpositionx.", 
							 ".$zstartpositiony.", 
							 ".$zstartpositionz.", 
							 ".$zstartscalingx.", 
							 ".$zstartscalingy.", 
							 ".$zstartscalingz.", 
							 ".$zstartrotationx.", 
							 ".$zstartrotationy.", 
							 ".$zstartrotationz.", 
							 ".$zgravity.", 
							 '".$zalttag."',
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
					$zuserauthorizationid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."userauthorizations
							(userauthorizationid,
							 userid,
							 communityid,
							 buildingid,
							 thingid,
							 useraccess,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zuserauthorizationid."',
							 '".$wtwhandlers->userid."',
							 '',
							 '".$zbuildingid."',
							 '',
							 'admin',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwbuildings.php-importBuilding=".$e->getMessage());
		}
		return $zbuildingid;
	}	

	public function saveBuildingStartPosition($zbuildingid, $zstartpositionx, $zstartpositiony, $zstartpositionz, $zstartscalingx, $zstartscalingy, $zstartscalingz, $zstartrotationx, $zstartrotationy, $zstartrotationz) {
		/* update avatar start position in relation to a building */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->checkUpdateAccess("", $zbuildingid, "")) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."buildings
					set positionx=".$wtwhandlers->checkNumber($zstartpositionx,0).",
						positiony=".$wtwhandlers->checkNumber($zstartpositiony,0).",
						positionz=".$wtwhandlers->checkNumber($zstartpositionz,0).",
						scalingx=".$wtwhandlers->checkNumber($zstartscalingx,1).",
						scalingy=".$wtwhandlers->checkNumber($zstartscalingy,1).",
						scalingz=".$wtwhandlers->checkNumber($zstartscalingz,1).",
						rotationx=".$wtwhandlers->checkNumber($zstartrotationx,0).",
						rotationy=".$wtwhandlers->checkNumber($zstartrotationy,0).",
						rotationz=".$wtwhandlers->checkNumber($zstartrotationz,0).",
						updatedate=now(),
						updateuserid='".$wtwhandlers->userid."'
					where buildingid='".$zbuildingid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwbuildings.php-saveBuildingStartPosition=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function saveBuildingGravity($zbuildingid, $zgravity) {
		/* update building gravity setting */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->checkUpdateAccess("", $zbuildingid, "")) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."communities
					set gravity=".$zgravity.",
						updatedate=now(),
						updateuserid='".$wtwhandlers->userid."'
					where buildingid='".$zbuildingid."';");
			}
			$zsuccess = true;
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwbuildings.php-saveBuildingGravity=".$e->getMessage());
		}
		return $zsuccess;
	}
			
	public function saveTemplateBuilding($zpastbuildingid) {
		/* save template building settings for when it is shared */
		global $wtwhandlers;
		$newbuildingid = "";
		try {
			$conn = new mysqli(wtw_dbserver, wtw_dbusername, wtw_dbpassword, wtw_dbname);
			if ($conn->connect_error) {
				serror("core-functions-class_wtwbuildings.php-saveTemplateBuilding=".$conn->connect_error);
			} else {
				$zuserid = "";
				if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
					$zuserid = $_SESSION["wtw_userid"];
				}
				$sql = "CALL copytemplatetobuilding('".$zpastbuildingid."','".$zuserid."');";
				$result = $conn->query($sql);
				if (is_object($result)) {
					if ($result->num_rows > 0) {
						while($zrow = $result->fetch_assoc()) {
							$newbuildingid = $zrow["buildingid"];
						}
					} else {
						serror("core-functions-class_wtwbuildings.php-saveTemplateBuilding=Building could not be created");
					}		
				}
			}
			$conn->close();
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwbuildings.php-saveTemplateBuilding=".$e->getMessage());
		}
		return $newbuildingid;
	}	

	public function shareBuildingTemplate($zbuildingid, $ztemplatename, $zdescription, $ztags) {
		/* share building as a template to the media library (not currently available) */
		global $wtwhandlers;
		try {
			$conn = new mysqli(wtw_dbserver, wtw_dbusername, wtw_dbpassword, wtw_dbname);
			if ($conn->connect_error) {
				serror("core-functions-class_wtwbuildings.php-shareBuildingTemplate=".$conn->connect_error);
			} else {
				$zuserid = "";
				if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
					$zuserid = $_SESSION["wtw_userid"];
				}
				$ztemplatename = htmlspecialchars($ztemplatename, ENT_QUOTES, 'UTF-8');
				$zdescription = htmlspecialchars($zdescription, ENT_QUOTES, 'UTF-8');
				$ztags = htmlspecialchars($ztags, ENT_QUOTES, 'UTF-8');
				$sql = "CALL sharebuildingtemplate('".$zbuildingid."','".$ztemplatename."','".$zdescription."','".$ztags."','".$zuserid."');";
				$result = $conn->query($sql);
			}
			$conn->close();
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwbuildings.php-shareBuildingTemplate=".$e->getMessage());
		}
	}	
}

	function wtwbuildings() {
		return wtwbuildings::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwbuildings'] = wtwbuildings();
?>
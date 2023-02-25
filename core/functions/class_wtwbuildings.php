<?php
class wtwbuildings {
	/* wtwbuildings class for admin database functions for 3d buildings */
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

	public function saveBuilding($zbuildingid, $zpastbuildingid, $zversionid, $zversion, $zversiondesc, $zbuildingname, $zbuildingdescription, $zanalyticsid, $zalttag) {
		/* save building settings */
		global $wtwhandlers;
		$zcopybuildingid = "";
		try {
			if (!isset($zpastbuildingid) || empty($zpastbuildingid) || $wtwhandlers->checkUpdateAccess("", $zpastbuildingid, "") == false) {
				/* denies copy function if you do not have access to building to copy */
				$zpastbuildingid = "";
			}
			$zresults = array();
			if (empty($zbuildingid)) {
				/* create new buildingid */
				$zbuildingid = $wtwhandlers->getRandomString(16,1);
				$zhostuserid = '';
				if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
					$zhostuserid = $wtwhandlers->userid;
				}
				
				if (!isset($zpastbuildingid) || empty($zpastbuildingid)) {
					/* create new building (without access to copy building or if not copying existing building, this creates new building) */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."buildings
							(buildingid,
							 pastbuildingid,
							 versionid,
							 version,
							 versionorder,
							 versiondesc,
							 buildingname,
							 buildingdescription,
							 analyticsid,
							 hostuserid,
							 userid,
							 alttag,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zbuildingid."',
							 '',
							 '".$zbuildingid."',
							 '1.0.0',
							 1000000,
							 'Initial Version',
							 '".$wtwhandlers->escapeHTML($zbuildingname)."',
							 '".$wtwhandlers->escapeHTML($zbuildingdescription)."',
							 '".$zanalyticsid."',
							 '".$zhostuserid."',
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
							 versionid,
							 version,
							 versionorder,
							 versiondesc,
							 buildingname,
							 buildingdescription,
							 analyticsid,
							 hostuserid,
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
							 templatename,
							 description,
							 tags,
							 snapshotid,
							 shareuserid,
							 sharetemplatedate,
							 alttag,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						select '".$zbuildingid."' as buildingid,
							 '".$zpastbuildingid."' as pastbuildingid,
							 versionid,
							 version,
							 versionorder,
							 versiondesc,
							 '".$wtwhandlers->escapeHTML($zbuildingname)."' as buildingname,
							 '".$wtwhandlers->escapeHTML($zbuildingdescription)."' as buildingdescription,
							 analyticsid,
							 '".$zhostuserid."' as hostuserid,
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
							 templatename,
							 description,
							 tags,
							 snapshotid,
							 shareuserid,
							 sharetemplatedate,
							 alttag,
							 now() as createdate,
							 '".$wtwhandlers->userid."' as createuserid,
							 now() as updatedate,
							 '".$wtwhandlers->userid."' as updateuserid
						from ".wtw_tableprefix."buildings
						where buildingid='".$zpastbuildingid."';");
				}
				/* give user Admin access to their new building */ 
				$zuserauthorizationid = $wtwhandlers->getRandomString(16,1);
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
						('".$zuserauthorizationid."',
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
					set version='".$wtwhandlers->escapeHTML($zversion)."',
						versiondesc='".$wtwhandlers->escapeHTML($zversiondesc)."',
						buildingname='".$wtwhandlers->escapeHTML($zbuildingname)."',
						buildingdescription='".$wtwhandlers->escapeHTML($zbuildingdescription)."',
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
		if ($wtwhandlers->hasValue($zpastbuildingid) && $wtwhandlers->hasValue($zbuildingid)) {
			if ($this->copyBuilding($zbuildingid, $zpastbuildingid)) {
				$zcopybuildingid = $zbuildingid;
			}
		}
		/* if the new building errored or was not available (missing or permissions) this reloads your current building */
		if (!isset($zcopybuildingid) || empty($zcopybuildingid)) {
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

	public function copyBuilding($zbuildingid, $zfrombuildingid) { 
		/* used to create a new building from media library templates or building to copy */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			/* new building has to already exist */
			/* does user have access to copy building and new building */
			set_time_limit(0);
			if ($wtwhandlers->checkUpdateAccess("", $zbuildingid, "") && $wtwhandlers->checkUpdateAccess("", $zfrombuildingid, "")) {
				/* update actionzones */
				$zresults = $wtwhandlers->query("
					select 
						 t2.actionzoneid as pastactionzoneid,
						 t2.communityid,
						 '".$zbuildingid."' as buildingid,
						 t2.thingid,
						 t2.attachmoldid,
						 t2.loadactionzoneid,
						 t2.parentactionzoneid,
						 t2.actionzonename,
						 t2.actionzonetype,
						 t2.actionzoneshape,
						 t2.movementtype,
						 t2.movementdistance,
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
						 t2.value1,
						 t2.value2,
						 t2.defaulteditform,
						 t2.jsfunction,
						 t2.jsparameters,
						 now() as createdate,
						 '".$wtwhandlers->userid."' as createuserid,
						 now() as updatedate,
						 '".$wtwhandlers->userid."' as updateuserid
					from ".wtw_tableprefix."actionzones t2
					where t2.buildingid='".$zfrombuildingid."'
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zactionzoneid = $wtwhandlers->getRandomString(16,1);
					$zpastactionzoneid = $zrow["pastactionzoneid"];
					$zcommunityid = $zrow["communityid"];
					$zthingid = $zrow["thingid"];
					$zattachmoldid = $zrow["attachmoldid"];
					$zloadactionzoneid = $zrow["loadactionzoneid"];
					$zparentactionzoneid = $zrow["parentactionzoneid"];
					$zactionzonename = $zrow["actionzonename"];
					$zactionzonetype = $zrow["actionzonetype"];
					$zactionzoneshape = $zrow["actionzoneshape"];
					$zmovementtype = $zrow["movementtype"];
					$zmovementdistance = $zrow["movementdistance"];
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
					$zvalue1 = $zrow["value1"];
					$zvalue2 = $zrow["value2"];
					$zdefaulteditform = $zrow["defaulteditform"];
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
							 parentactionzoneid,
							 actionzonename,
							 actionzonetype,
							 actionzoneshape,
							 movementtype,
							 movementdistance,
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
							 value1,
							 value2,
							 defaulteditform,
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
							'".$zparentactionzoneid."',
							'".$wtwhandlers->escapeHTML($zactionzonename)."',
							'".$zactionzonetype."',
							'".$zactionzoneshape."',
							'".$zmovementtype."',
							".$wtwhandlers->checkNumber($zmovementdistance,20).",
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
							".$wtwhandlers->checkNumber($zvalue1,0).",
							".$wtwhandlers->checkNumber($zvalue2,0).",
							".$wtwhandlers->checkNumber($zdefaulteditform,0).",
							'".$zjsfunction."',
							'".$zjsparameters."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
				/* update action zone animations (animations that are loaded to your avatar when you walk into an action zone) */
				$zresults = $wtwhandlers->query("
					select t2.actionzoneanimationid as pastactionzoneanimationid,
						 t2.avataranimationid,
						 t3.actionzoneid
					from ".wtw_tableprefix."actionzoneanimations t2
					inner join (select actionzoneid, pastactionzoneid
							from ".wtw_tableprefix."actionzones 
							where buildingid='".$zbuildingid."' and (not buildingid='')) t3
						on t3.pastactionzoneid = t2.actionzoneid
					where t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zactionzoneanimationid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."actionzoneanimations
							(actionzoneanimationid,
							 pastactionzoneanimationid,
							 actionzoneid,
							 avataranimationid,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zactionzoneanimationid."',
							 '".$zrow["pastactionzoneanimationid"]."',
							 '".$zrow["actionzoneid"]."',
							 '".$zrow["avataranimationid"]."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
				/* update action zone scripts (scripts that are loaded when you walk into an action zone) */
				$zresults = $wtwhandlers->query("
					select t2.scriptid as pastscriptid,
						 t3.actionzoneid,
						 t2.webtype,
						 '".$zbuildingid."' as webid,
						 t2.scriptname,
						 t2.scriptpath
					from ".wtw_tableprefix."scripts t2
					inner join (select actionzoneid, pastactionzoneid
							from ".wtw_tableprefix."actionzones 
							where buildingid='".$zbuildingid."' and (not buildingid='')) t3
						on t3.pastactionzoneid = t2.actionzoneid
					where t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zscriptid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."scripts
							(scriptid,
							 pastscriptid,
							 actionzoneid,
							 webtype,
							 webid,
							 scriptname,
							 scriptpath,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zscriptid."',
							 '".$zrow["pastscriptid"]."',
							 '".$zrow["actionzoneid"]."',
							 '".$zrow["webtype"]."',
							 '".$zrow["webid"]."',
							 '".$zrow["scriptname"]."',
							 '".$zrow["scriptpath"]."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
				/* update connecting grids */
				$zresults = $wtwhandlers->query("
					select t2.connectinggridid as pastconnectinggridid,
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
						 t3.actionzoneid as loadactionzoneid,
						 t4.actionzoneid as unloadactionzoneid,
						 t5.actionzoneid as attachactionzoneid,
						 t6.actionzoneid as altloadactionzoneid,
						 t2.alttag
					from ".wtw_tableprefix."connectinggrids t2
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where buildingid='".$zbuildingid."' and (not buildingid='')) t3
						on t3.pastactionzoneid = t2.loadactionzoneid
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where buildingid='".$zbuildingid."' and (not buildingid='')) t4
						on t4.pastactionzoneid=t2.unloadactionzoneid
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where buildingid='".$zbuildingid."' and (not buildingid='')) t5
						on t5.pastactionzoneid=t2.attachactionzoneid
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where buildingid='".$zbuildingid."' and (not buildingid='')) t6
						on t6.pastactionzoneid=t2.altloadactionzoneid
					where t2.childwebid='".$zfrombuildingid."'
						and parentwebid=''
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zconnectinggridid = $wtwhandlers->getRandomString(16,1);
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
							 altloadactionzoneid,
							 alttag,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zconnectinggridid."',
							 '".$zrow["pastconnectinggridid"]."',
							 '".$zrow["parentwebid"]."',
							 '".$zrow["parentwebtype"]."',
							 '".$zrow["childwebid"]."',
							 '".$zrow["childwebtype"]."',
							 ".$wtwhandlers->checkNumber($zrow["positionx"],0).",
							 ".$wtwhandlers->checkNumber($zrow["positiony"],0).",
							 ".$wtwhandlers->checkNumber($zrow["positionz"],0).",
							 ".$wtwhandlers->checkNumber($zrow["scalingx"],1).",
							 ".$wtwhandlers->checkNumber($zrow["scalingy"],1).",
							 ".$wtwhandlers->checkNumber($zrow["scalingz"],1).",
							 ".$wtwhandlers->checkNumber($zrow["rotationx"],0).",
							 ".$wtwhandlers->checkNumber($zrow["rotationy"],0).",
							 ".$wtwhandlers->checkNumber($zrow["rotationz"],0).",
							 '".$zrow["loadactionzoneid"]."',
							 '".$zrow["unloadactionzoneid"]."',
							 '".$zrow["attachactionzoneid"]."',
							 '".$zrow["altloadactionzoneid"]."',
							 '".$zrow["alttag"]."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
				/* update child connecting grids (3D Things placed in 3D Buildings) */
				$zresults = $wtwhandlers->query("
					select t2.connectinggridid as pastconnectinggridid,
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
						 t3.actionzoneid as loadactionzoneid,
						 t4.actionzoneid as unloadactionzoneid,
						 t5.actionzoneid as attachactionzoneid,
						 t6.actionzoneid as altloadactionzoneid,
						 t2.alttag
					from ".wtw_tableprefix."connectinggrids t2
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where buildingid='".$zbuildingid."' and (not buildingid='')) t3
						on t3.pastactionzoneid=t2.loadactionzoneid
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where buildingid='".$zbuildingid."' and (not buildingid='')) t4
						on t4.pastactionzoneid=t2.unloadactionzoneid
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where buildingid='".$zbuildingid."' and (not buildingid='')) t5
						on t5.pastactionzoneid=t2.attachactionzoneid
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where buildingid='".$zbuildingid."' and (not buildingid='')) t6
						on t6.pastactionzoneid=t2.altloadactionzoneid
					where t2.parentwebid='".$zfrombuildingid."'
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zconnectinggridid = $wtwhandlers->getRandomString(16,1);
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
							 altloadactionzoneid,
							 alttag,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zconnectinggridid."',
							 '".$zrow["pastconnectinggridid"]."',
							 '".$zrow["parentwebid"]."',
							 '".$zrow["parentwebtype"]."',
							 '".$zrow["childwebid"]."',
							 '".$zrow["childwebtype"]."',
							 ".$wtwhandlers->checkNumber($zrow["positionx"],0).",
							 ".$wtwhandlers->checkNumber($zrow["positiony"],0).",
							 ".$wtwhandlers->checkNumber($zrow["positionz"],0).",
							 ".$wtwhandlers->checkNumber($zrow["scalingx"],1).",
							 ".$wtwhandlers->checkNumber($zrow["scalingy"],1).",
							 ".$wtwhandlers->checkNumber($zrow["scalingz"],1).",
							 ".$wtwhandlers->checkNumber($zrow["rotationx"],0).",
							 ".$wtwhandlers->checkNumber($zrow["rotationy"],0).",
							 ".$wtwhandlers->checkNumber($zrow["rotationz"],0).",
							 '".$zrow["loadactionzoneid"]."',
							 '".$zrow["unloadactionzoneid"]."',
							 '".$zrow["attachactionzoneid"]."',
							 '".$zrow["altloadactionzoneid"]."',
							 '".$zrow["alttag"]."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}

				/* copy contentratings */
				$zresults = $wtwhandlers->query("
					select t2.contentratingid as pastcontentratingid,
						 '".$zbuildingid."' as webid,
						 t2.webtype,
						 t2.rating,
						 t2.ratingvalue,
						 t2.contentwarning
					from ".wtw_tableprefix."contentratings t2
					where t2.webid='".$zfrombuildingid."'
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zcontentratingid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."contentratings
							(contentratingid,
							 pastcontentratingid,
							 webid,
							 webtype,
							 rating,
							 ratingvalue,
							 contentwarning,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zcontentratingid."',
							 '".$zrow["pastcontentratingid"]."',
							 '".$zrow["webid"]."',
							 '".$zrow["webtype"]."',
							 '".$zrow["rating"]."',
							 ".$zrow["ratingvalue"].",
							 '".$zrow["contentwarning"]."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
				
				/* copy pluginsrequired */
				$zresults = $wtwhandlers->query("
					select t2.pluginsrequiredid as pastpluginsrequiredid,
						 '".$zbuildingid."' as webid,
						 'building' as webtype,
						 t2.pluginname,
						 t2.optional
					from ".wtw_tableprefix."pluginsrequired t2
					where t2.webid='".$zfrombuildingid."'
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zpluginsrequiredid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."pluginsrequired
							(pluginsrequiredid,
							 pastpluginsrequiredid,
							 webid,
							 webtype,
							 pluginname,
							 optional,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zpluginsrequiredid."',
							 '".$zrow["pastpluginsrequiredid"]."',
							 '".$zrow["webid"]."',
							 '".$zrow["webtype"]."',
							 '".$zrow["pluginname"]."',
							 ".$zrow["optional"].",
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
					where t2.buildingid='".$zfrombuildingid."'
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
								where buildingid='".$zfrombuildingid."' and deleted=0) t1
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
						t3.unloadactionzoneid,
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
						t3.graphiclevel,
						t3.textureid,
						t3.texturebumpid,
						t3.texturehoverid,
						t3.videoid,
						t3.videoposterid,
						t3.diffusecolor,
						t3.specularcolor,
						t3.emissivecolor,
						t3.ambientcolor,
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
						t3.receiveshadows,
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
						now() as createdate,
						'".$wtwhandlers->userid."' as createuserid,
						now() as updatedate,
						'".$wtwhandlers->userid."' as updateuserid
					from ".wtw_tableprefix."buildingmolds t3
					where t3.buildingid='".$zfrombuildingid."'
						and t3.deleted=0;");
				foreach ($zresults as $zrow) {
					$zbuildingmoldid = $wtwhandlers->getRandomString(16,1);
					$zpastbuildingmoldid = $zrow["pastbuildingmoldid"];
					$zloadactionzoneid = $zrow["loadactionzoneid"];
					$zunloadactionzoneid = $zrow["unloadactionzoneid"];
					$zshape = $zrow["shape"];
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
					$zgraphiclevel = $zrow["graphiclevel"];
					$ztextureid = $zrow["textureid"];
					$ztexturebumpid = $zrow["texturebumpid"];
					$ztexturehoverid = $zrow["texturehoverid"];
					$zvideoid = $zrow["videoid"];
					$zvideoposterid = $zrow["videoposterid"];
					$zdiffusecolor = $zrow["diffusecolor"];
					$zspecularcolor = $zrow["specularcolor"];
					$zemissivecolor = $zrow["emissivecolor"];
					$zambientcolor = $zrow["ambientcolor"];
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
					$zreceiveshadows = $zrow["receiveshadows"];
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

					$wtwhandlers->query("
						INSERT INTO ".wtw_tableprefix."buildingmolds
							(buildingmoldid,
							pastbuildingmoldid,
							buildingid,
							loadactionzoneid,
							unloadactionzoneid,
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
							graphiclevel,
							textureid,
							texturebumpid,
							texturehoverid,
							videoid,
							videoposterid,
							diffusecolor,
							specularcolor,
							emissivecolor,
							ambientcolor,
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
							receiveshadows,
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
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
							('".$zbuildingmoldid."',
							'".$zpastbuildingmoldid."',
							'".$zbuildingid."',
							'".$zloadactionzoneid."',
							'".$zunloadactionzoneid."',
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
							".$wtwhandlers->checkNumber($zgraphiclevel,0).",
							'".$ztextureid."',
							'".$ztexturebumpid."',
							'".$ztexturehoverid."',
							'".$zvideoid."',
							'".$zvideoposterid."',
							'".$zdiffusecolor."',
							'".$zspecularcolor."',
							'".$zemissivecolor."',
							'".$zambientcolor."',
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
							".$wtwhandlers->checkNumber($zreceiveshadows,0).",
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
						 t4.graphicslevel,
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
					where t5.buildingid='".$zfrombuildingid."'
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
					$zgraphicslevel = $zrow["graphicslevel"];
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
							 graphicslevel,
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
							 ".$wtwhandlers->checkNumber($zgraphicslevel,0).",
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
					where t5.buildingid='".$zfrombuildingid."'
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
						and buildingid='".$zbuildingid."';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."buildingmolds
					set csgmoldid=''
					where csgmoldid is null 
						and buildingid='".$zbuildingid."';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones
					set attachmoldid=''
					where attachmoldid is null 
						and buildingid='".$zbuildingid."' and (not buildingid='');");
				$wtwhandlers->query("
					update ".wtw_tableprefix."buildingmolds t1 
						left join (select * from ".wtw_tableprefix."buildingmolds where buildingid='".$zbuildingid."' and deleted=0) t2
						on t1.csgmoldid = t2.pastbuildingmoldid
					set t1.csgmoldid = t2.buildingmoldid
					where t1.buildingid='".$zbuildingid."'
						and (not t1.csgmoldid='')
						and (not t2.buildingmoldid is null);");
				$wtwhandlers->query("
					update ".wtw_tableprefix."buildingmolds t1 
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid."' and deleted=0) t2
						on t1.actionzoneid = t2.pastactionzoneid
					set t1.actionzoneid = t2.actionzoneid
					where t1.buildingid='".$zbuildingid."'
						and (not t1.actionzoneid='')
						and (not t2.actionzoneid is null);");
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones t1
						left join (select * from ".wtw_tableprefix."buildingmolds where buildingid='".$zbuildingid."' and (not buildingid='') and deleted=0) t2
						on t1.attachmoldid=t2.pastbuildingmoldid
					set t1.attachmoldid=t2.buildingmoldid
					where t1.buildingid='".$zbuildingid."'
						and (not t1.attachmoldid='')
						and (not t2.buildingmoldid is null);");
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones t1
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid."' and (not buildingid='') and deleted=0) t2
						on t1.parentactionzoneid=t2.pastactionzoneid
					set t1.parentactionzoneid=t2.actionzoneid
					where t1.buildingid='".$zbuildingid."'
						and (not t1.parentactionzoneid='')
						and (not t2.actionzoneid is null);");
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones t1
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid."' and (not buildingid='') and deleted=0) t2
						on t1.loadactionzoneid=t2.pastactionzoneid
					set t1.loadactionzoneid=t2.actionzoneid
					where t1.buildingid='".$zbuildingid."'
						and (not t1.loadactionzoneid='')
						and (not t2.actionzoneid is null);");
				$wtwhandlers->query("
					update ".wtw_tableprefix."automations t1
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid."' and (not buildingid='') and deleted=0) t2
						on t1.loadactionzoneid=t2.pastactionzoneid
					set t1.loadactionzoneid=t2.actionzoneid
					where t1.buildingid='".$zbuildingid."'
						and (not t1.loadactionzoneid='');");
				$wtwhandlers->query("
					update ".wtw_tableprefix."buildingmolds t1
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid."' and (not buildingid='') and deleted=0) t2
						on t1.loadactionzoneid=t2.pastactionzoneid
					set t1.loadactionzoneid=t2.actionzoneid
					where t1.buildingid='".$zbuildingid."'
						and (not t1.loadactionzoneid='');");
				$wtwhandlers->query("
					update ".wtw_tableprefix."buildingmolds t1
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid."' and (not buildingid='') and deleted=0) t2
						on t1.unloadactionzoneid=t2.pastactionzoneid
					set t1.unloadactionzoneid=t2.actionzoneid
					where t1.buildingid='".$zbuildingid."'
						and (not t1.unloadactionzoneid='');");
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
				$zloadactionzoneid = "";
				$zresults = $wtwhandlers->query("
					select actionzoneid 
					from ".wtw_tableprefix."actionzones 
					where buildingid='".$zbuildingid,"' 
						and actionzonename like 'high%' 
						and actionzonetype='loadzone'
						and (not actionzonename like '%custom%') limit 1;");
				foreach ($zresults as $zrow) {
					$zloadactionzoneid = $zrow["actionzoneid"];
				}
				if ($wtwhandlers->hasValue($zloadactionzoneid)) {
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
							'".$zloadactionzoneid."',
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

}

	function wtwbuildings() {
		return wtwbuildings::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwbuildings'] = wtwbuildings();
?>
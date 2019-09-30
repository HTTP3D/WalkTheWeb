<?php
class wtwbuildings {
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
		global $wtwiframes;
		$found = false;
		try {
			$zresults = array();
			$zresults = $wtwiframes->query("
				select buildingid 
				from ".wtw_tableprefix."buildings 
				where buildingid='".$zbuildingid."' limit 1");
			foreach ($zresults as $zrow) {
				$found = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwbuildings.php-buildingExist=".$e->getMessage());
		}
		return $found;
	}

	public function saveBuilding($zbuildingid, $zpastbuildingid, $zbuildingname, $zanalyticsid, $zstoreiframes, $zstoreurl, $zwpplugin, $zstorecarturl, $zstoreproducturl, $zstorewoocommerceapiurl, $zstorewoocommercekey, $zstorewoocommercesecret, $zalttag) {
		global $wtwiframes;
		$zcopybuildingid = "";
		try {
			if (empty($zpastbuildingid) || !isset($zpastbuildingid) || $wtwiframes->checkUpdateAccess("", $zpastbuildingid, "") == false) {
				/* denies copy function if you do not have access to building to copy */
				$zpastbuildingid = "";
			}
			$zresults = array();
			if ($zbuildingid == "") {
				/* create new buildingid */
				$zbuildingid = $wtwiframes->getRandomString(16,1);
				
				if (empty($zpastbuildingid) || !isset($zpastbuildingid)) {
					/* create new building (without access to copy building or if not copying existing building, this creates new building) */
					$wtwiframes->query("
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
							 '".$wtwiframes->escapeHTML($zbuildingname)."',
							 '".$zanalyticsid."',
							 '".$wtwiframes->userid."',
							 '".$wtwiframes->escapeHTML($zalttag)."',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				} else {
					/* with access to copy building, this gets all values */
					$wtwiframes->query("
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
							 '".$wtwiframes->escapeHTML($zbuildingname)."' as buildingname,
							 '' as analyticsid,
							 '".$wtwiframes->userid."' as userid,
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
							 '".$wtwiframes->userid."' as createuserid,
							 now() as updatedate,
							 '".$wtwiframes->userid."' as updateuserid
						from ".wtw_tableprefix."buildings
						where buildingid='".$zpastbuildingid."';");
				}
				/* give user Admin access to their new building */ 
				$wtwiframes->query("
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
						 '".$wtwiframes->userid."',
						 '".$zbuildingid."',
						 'admin',
						 now(),
						 '".$wtwiframes->userid."',
						 now(),
						 '".$wtwiframes->userid."');");
			} else if ($wtwiframes->checkUpdateAccess("", $zbuildingid, "")) {
				/* only updates if you have access */
				 $wtwiframes->query("
					update ".wtw_tableprefix."buildings
					set  buildingname='".$wtwiframes->escapeHTML($zbuildingname)."',
						 analyticsid='".$zanalyticsid."',
						 alttag='".$wtwiframes->escapeHTML($zalttag)."',
						 updatedate=now(),
						 updateuserid='".$wtwiframes->userid."'
					where buildingid='".$zbuildingid."';"); 
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwbuildings.php-saveBuilding=".$e->getMessage());
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
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->checkAdminAccess("", $zbuildingid, "")) {
				$zdeleteindex = 2;
				$zresults = $wtwiframes->query("
					select max(deleted) as maxdeleted 
					from ".wtw_tableprefix."buildingmolds 
					where buildingid='".$zbuildingid."' limit 1;");
				foreach ($zresults as $zrow) {
					$zdeleteindex = $wtwiframes->getNumber($zrow["maxdeleted"],2);
				}
				$zdeleteindex += 1;
				$this->clearBuilding($zbuildingid);
				$wtwiframes->query("
					update ".wtw_tableprefix."webaliases
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where buildingid='".$zbuildingid."'
						and deleted=0
						and not buildingid='';");
				$wtwiframes->query("
					update ".wtw_tableprefix."buildings
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where buildingid='".$zbuildingid."'
						and deleted=0
						and not buildingid='';");
				$wtwiframes->query("
					update ".wtw_tableprefix."userauthorizations
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where buildingid='".$zbuildingid."'
						and deleted=0
						and not buildingid='';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwbuildings.php-deleteBuilding=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function copyBuilding($zbuildingid, $zcopybuildingid) { /* new building , building to copy */
		global $wtwiframes;
		$zsuccess = false;
		try {
			/* new building has to already exist */
			/* does user have access to copy building and new building */
			if ($wtwiframes->checkUpdateAccess("", $zbuildingid, "") && $wtwiframes->checkUpdateAccess("", $zcopybuildingid, "")) {
				/* read in values of copy building */
				/* woocommerce specific... will be moved to a plugin ...
				$zstore = 0;
				$zstoreiframes = 0;
				$zstoreurl = "";
				$zwpplugin = "";
				$zstorecarturl = "";
				$zstoreproducturl = "";
				$zstorewoocommerceapiurl = "";
				$zstorewoocommercekey = "";
				$zstorewoocommercesecret = "";
				$zresults = $wtwiframes->query("
					select * 
					from ".wtw_tableprefix."buildings 
					where buildingid='".$zcopybuildingid."' 
					limit 1;");
				foreach ($zresults as $zrow) {
					$zstore = $zrow["store"];
					$zstoreiframes = $zrow["storeiframes"];
					$zstoreurl = $zrow["storeurl"];
					$zwpplugin = $zrow["wpplugin"];
					$zstorecarturl = $zrow["storecarturl"];
					$zstoreproducturl = $zrow["storeproducturl"];
					$zstorewoocommerceapiurl = $zrow["storewoocommerceapiurl"];
					$zstorewoocommercekey = $zrow["storewoocommercekey"];
					$zstorewoocommercesecret = $zrow["storewoocommercesecret"];
				} */
				/* update values of building */
				/* $wtwiframes->query("
					update ".wtw_tableprefix."buildings 
					set store=".$wtwiframes->checkNumber($zstore,0).",
						storeiframes=".$wtwiframes->checkNumber($zstoreiframes,0).",
						storeurl='".$zstoreurl."',
						wpplugin='".$zwpplugin."',
						storecarturl='".$zstorecarturl."',
						storeproducturl='".$zstoreproducturl."',
						storewoocommerceapiurl='".$zstorewoocommerceapiurl."',
						storewoocommercekey='".$zstorewoocommercekey."',
						storewoocommercesecret='".$zstorewoocommercesecret."'
					where buildingid='".$zbuildingid."';"); */
				/* update actionzones */
				$zresults = $wtwiframes->query("
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
						 '".$wtwiframes->userid."' as createuserid,
						 now() as updatedate,
						 '".$wtwiframes->userid."' as updateuserid
					from ".wtw_tableprefix."actionzones t2
					where t2.buildingid='".$zcopybuildingid."'
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zactionzoneid = $wtwiframes->getRandomString(16,1);
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
					
					$wtwiframes->query("
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
							'".$wtwiframes->escapeHTML($zactionzonename)."',
							'".$zactionzonetype."',
							'".$zactionzoneshape."',
							'".$zmovementtype."',
							".$wtwiframes->checkNumber($zpositionx,0).",
							".$wtwiframes->checkNumber($zpositiony,0).",
							".$wtwiframes->checkNumber($zpositionz,0).",
							".$wtwiframes->checkNumber($zscalingx,1).",
							".$wtwiframes->checkNumber($zscalingy,1).",
							".$wtwiframes->checkNumber($zscalingz,1).",
							".$wtwiframes->checkNumber($zrotationx,0).",
							".$wtwiframes->checkNumber($zrotationy,0).",
							".$wtwiframes->checkNumber($zrotationz,0).",
							".$wtwiframes->checkNumber($zaxispositionx,0).",
							".$wtwiframes->checkNumber($zaxispositiony,0).",
							".$wtwiframes->checkNumber($zaxispositionz,0).",
							".$wtwiframes->checkNumber($zaxisrotationx,0).",
							".$wtwiframes->checkNumber($zaxisrotationy,0).",
							".$wtwiframes->checkNumber($zaxisrotationz,0).",
							'".$zrotateaxis."',
							".$wtwiframes->checkNumber($zrotatedegrees,90).",
							".$wtwiframes->checkNumber($zrotatedirection,1).",
							".$wtwiframes->checkNumber($zrotatespeed,0).",
							".$wtwiframes->checkNumber($zmovementdistance,20).",
							'".$zparentactionzoneid."',
							'".$zjsfunction."',
							'".$zjsparameters."',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}

				/* update children connecting grids */
				$zresults = $wtwiframes->query("
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
						 '".$wtwiframes->userid."' as createuserid,
						 now() as updatedate,
						 '".$wtwiframes->userid."' as updateuserid
					from ".wtw_tableprefix."connectinggrids t2
					where t2.childwebid='".$zcopybuildingid."'
						and t2.parentwebid=''
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zconnectinggridid = $wtwiframes->getRandomString(16,1);
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
					$wtwiframes->query("
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
							 ".$wtwiframes->checkNumber($zpositionx,0).",
							 ".$wtwiframes->checkNumber($zpositiony,0).",
							 ".$wtwiframes->checkNumber($zpositionz,0).",
							 ".$wtwiframes->checkNumber($zscalingx,1).",
							 ".$wtwiframes->checkNumber($zscalingy,1).",
							 ".$wtwiframes->checkNumber($zscalingz,1).",
							 ".$wtwiframes->checkNumber($zrotationx,0).",
							 ".$wtwiframes->checkNumber($zrotationy,0).",
							 ".$wtwiframes->checkNumber($zrotationz,0).",
							 '".$zloadactionzoneid."',
							 '".$zunloadactionzoneid."',
							 '".$zattachactionzoneid."',
							 '".$wtwiframes->escapeHTML($zalttag)."',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}
				/* update parent connecting grids */
				$zresults = $wtwiframes->query("
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
						 '".$wtwiframes->userid."' as createuserid,
						 now() as updatedate,
						 '".$wtwiframes->userid."' as updateuserid
					from ".wtw_tableprefix."connectinggrids t2
					where t2.parentwebid='".$zcopybuildingid."'
						and t2.deleted=0;						
						");
				foreach ($zresults as $zrow) {
					$zconnectinggridid = $wtwiframes->getRandomString(16,1);
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
					$wtwiframes->query("
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
							 ".$wtwiframes->checkNumber($zpositionx,0).",
							 ".$wtwiframes->checkNumber($zpositiony,0).",
							 ".$wtwiframes->checkNumber($zpositionz,0).",
							 ".$wtwiframes->checkNumber($zscalingx,1).",
							 ".$wtwiframes->checkNumber($zscalingy,1).",
							 ".$wtwiframes->checkNumber($zscalingz,1).",
							 ".$wtwiframes->checkNumber($zrotationx,0).",
							 ".$wtwiframes->checkNumber($zrotationy,0).",
							 ".$wtwiframes->checkNumber($zrotationz,0).",
							 '".$zloadactionzoneid."',
							 '".$zunloadactionzoneid."',
							 '".$zattachactionzoneid."',
							 '".$wtwiframes->escapeHTML($zalttag)."',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}				
				/* update automations */
				$zresults = $wtwiframes->query("
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
						 '".$wtwiframes->userid."' as createuserid,
						 now() as updatedate,
						 '".$wtwiframes->userid."' as updateuserid
					from ".wtw_tableprefix."automations t2
					where t2.buildingid='".$zcopybuildingid."'
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zautomationid = $wtwiframes->getRandomString(16,1);
					$zpastautomationid = $zrow["pastautomationid"];
					$zautomationname = $zrow["automationname"];
					$zcommunityid = $zrow["communityid"];
					$zbuildingid = $zrow["buildingid"];
					$zthingid = $zrow["thingid"];
					$zloadactionzoneid = $zrow["loadactionzoneid"];
					$zjsfunction = $zrow["jsfunction"];
					$zjsparameters = $zrow["jsparameters"];
					$wtwiframes->query("
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
							 '".$wtwiframes->escapeHTML($zautomationname)."',
							 '".$zcommunityid."',
							 '".$zbuildingid."',
							 '".$zthingid."',
							 '".$zloadactionzoneid."',
							 '".$zjsfunction."',
							 '".$zjsparameters."',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}
				/* update automation steps */
				$zresults = $wtwiframes->query("
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
						 '".$wtwiframes->userid."' as createuserid,
						 now() as updatedate,
						 '".$wtwiframes->userid."' as updateuserid
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
					$wtwiframes->query("
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
							 ".$wtwiframes->checkNumber($zstep,1).",
							 '".$zautomationtype."',
							 '".$zactionzoneid."',
							 '".$zactionzonestatus."',
							 '".$zconditionoperator."',
							 '".$zconditionstatus."',
							 ".$wtwiframes->checkNumber($zconditionvalue,0).",
							 '".$zjsfunction."',
							 '".$zjsparameters."',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}
				/* update building molds */
				$zresults = $wtwiframes->query("
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
						 t3.productid,
						 t3.slug,
						 t3.categoryid,
						 t3.allowsearch,
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
						 '".$wtwiframes->userid."' as createuserid,
						 now() as updatedate,
						 '".$wtwiframes->userid."' as updateuserid
						from ".wtw_tableprefix."buildingmolds t3
						where t3.buildingid='".$zcopybuildingid."'
						and t3.deleted=0;");
				foreach ($zresults as $zrow) {
					$zbuildingmoldid = $wtwiframes->getRandomString(16,1);
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
					$zproductid = $zrow["productid"];
					$zslug = $zrow["slug"];
					$zcategoryid = $zrow["categoryid"];
					$zallowsearch = $zrow["allowsearch"];
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

					$wtwiframes->query("
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
							productid,
							slug,
							categoryid,
							allowsearch,
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
							".$wtwiframes->checkNumber($zpositionx,0).",
							".$wtwiframes->checkNumber($zpositiony,0).",
							".$wtwiframes->checkNumber($zpositionz,0).",
							".$wtwiframes->checkNumber($zscalingx,1).",
							".$wtwiframes->checkNumber($zscalingy,1).",
							".$wtwiframes->checkNumber($zscalingz,1).",
							".$wtwiframes->checkNumber($zrotationx,0).",
							".$wtwiframes->checkNumber($zrotationy,0).",
							".$wtwiframes->checkNumber($zrotationz,0).",
							".$wtwiframes->checkNumber($zspecial1,0).",
							".$wtwiframes->checkNumber($zspecial2,0).",
							".$wtwiframes->checkNumber($zuoffset,0).",
							".$wtwiframes->checkNumber($zvoffset,0).",
							".$wtwiframes->checkNumber($zuscale,0).",
							".$wtwiframes->checkNumber($zvscale,0).",
							'".$zuploadobjectid."',
							'".$zreceiveshadows."',
							".$wtwiframes->checkNumber($zgraphiclevel,0).",
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
							'".$wtwiframes->escapeHTML($zsoundname)."',
							'".$zsoundattenuation."',
							".$wtwiframes->checkNumber($zsoundloop,1).",
							".$wtwiframes->checkNumber($zsoundmaxdistance,100).",
							".$wtwiframes->checkNumber($zsoundrollofffactor,1).",
							".$wtwiframes->checkNumber($zsoundrefdistance,1).",
							".$wtwiframes->checkNumber($zsoundconeinnerangle,90).",
							".$wtwiframes->checkNumber($zsoundconeouterangle,180).",
							".$wtwiframes->checkNumber($zsoundconeoutergain,.5).",
							'".$wtwiframes->escapeHTML($zwebtext)."',
							'".$wtwiframes->escapeHTML($zwebstyle)."',
							".$wtwiframes->checkNumber($zopacity,100).",
							'".$zsideorientation."',
							".$wtwiframes->checkNumber($zbillboard,0).",
							".$wtwiframes->checkNumber($zwaterreflection,0).",
							".$wtwiframes->checkNumber($zsubdivisions,12).",
							".$wtwiframes->checkNumber($zminheight,0).",
							".$wtwiframes->checkNumber($zmaxheight,30).",
							".$wtwiframes->checkNumber($zcheckcollisions,1).",
							".$wtwiframes->checkNumber($zispickable,1).",
							'".$zactionzoneid."',
							'".$zcsgmoldid."',
							'".$zcsgaction."',
							'".$wtwiframes->escapeHTML($zalttag)."',
							'".$zproductid."',
							'".$wtwiframes->escapeHTML($zslug)."',
							'".$zcategoryid."',
							".$wtwiframes->checkNumber($zallowsearch,1).",
							'".$zjsfunction."',
							'".$zjsparameters."',
							".$wtwiframes->checkNumber($zdiffusecolorr,1).",
							".$wtwiframes->checkNumber($zdiffusecolorg,1).",
							".$wtwiframes->checkNumber($zdiffusecolorb,1).",
							".$wtwiframes->checkNumber($zspecularcolorr,1).",
							".$wtwiframes->checkNumber($zspecularcolorg,1).",
							".$wtwiframes->checkNumber($zspecularcolorb,1).",
							".$wtwiframes->checkNumber($zemissivecolorr,1).",
							".$wtwiframes->checkNumber($zemissivecolorg,1).",
							".$wtwiframes->checkNumber($zemissivecolorb,1).",
							now(),
							'".$wtwiframes->userid."',
							now(),
							'".$wtwiframes->userid."');");
				}
				/* update web images */
				$zresults = $wtwiframes->query("
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
						 '".$wtwiframes->userid."' as createuserid,
						 now() as updatedate,
						 '".$wtwiframes->userid."' as updateuserid
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
					$zwebimageid = $wtwiframes->getRandomString(16,1); 
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
					
					$wtwiframes->query("
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
							 ".$wtwiframes->checkNumber($zimageindex,0).",
							 '".$zimageid."',
							 '".$zimagehoverid."',
							 '".$zimageclickid."',
							 '".$zjsfunction."',
							 '".$zjsparameters."',
							 '".$wtwiframes->userid."',
							 '".$zalttag."',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}
				/* update mold points */
				$zresults = $wtwiframes->query("
					select 
						 t6.buildingmoldid as moldid,
						 t4.pathnumber,
						 t4.sorder,
						 t4.positionx,
						 t4.positiony,
						 t4.positionz,
						 now() as createdate,
						 '".$wtwiframes->userid."' as createuserid,
						 now() as updatedate,
						 '".$wtwiframes->userid."' as updateuserid
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
					$zmoldpointid = $wtwiframes->getRandomString(16,1); 
					$zmoldid = $zrow["moldid"];
					$zpathnumber = $zrow["pathnumber"];
					$zsorder = $zrow["sorder"];
					$zpositionx = $zrow["positionx"];
					$zpositiony = $zrow["positiony"];
					$zpositionz = $zrow["positionz"];
					
					$wtwiframes->query("
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
							 ".$wtwiframes->checkNumber($zpathnumber,1).",
							 ".$wtwiframes->checkNumber($zsorder,0).",
							 ".$wtwiframes->checkNumber($zpositionx,0).",
							 ".$wtwiframes->checkNumber($zpositiony,0).",
							 ".$wtwiframes->checkNumber($zpositionz,0).",
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}
				$wtwiframes->query("
					update ".wtw_tableprefix."buildingmolds
					set actionzoneid=''
					where actionzoneid is null 
						and buildingid='".$zbuildingid,"';");
				$wtwiframes->query("
					update ".wtw_tableprefix."buildingmolds
					set csgmoldid=''
					where csgmoldid is null 
						and buildingid='".$zbuildingid,"';");
				$wtwiframes->query("
					update ".wtw_tableprefix."actionzones
					set attachmoldid=''
					where attachmoldid is null 
						and buildingid='".$zbuildingid,"' and (not buildingid='');");
				$wtwiframes->query("
					update ".wtw_tableprefix."buildingmolds t1 
						left join (select * from ".wtw_tableprefix."buildingmolds where buildingid='".$zbuildingid,"' and deleted=0) t2
						on t1.csgmoldid = t2.pastbuildingmoldid
					set t1.csgmoldid = t2.buildingmoldid
					where t1.buildingid='".$zbuildingid,"'
						and (not t1.csgmoldid='')
						and (not t2.buildingmoldid is null);");
				$wtwiframes->query("
					update ".wtw_tableprefix."buildingmolds t1 
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid,"' and deleted=0) t2
						on t1.actionzoneid = t2.pastactionzoneid
					set t1.actionzoneid = t2.actionzoneid
					where t1.buildingid='".$zbuildingid,"'
						and (not t1.actionzoneid='')
						and (not t2.actionzoneid is null);");
				$wtwiframes->query("
					update ".wtw_tableprefix."actionzones t1
						left join (select * from ".wtw_tableprefix."buildingmolds where buildingid='".$zbuildingid,"' and (not buildingid='') and deleted=0) t2
						on t1.attachmoldid=t2.pastbuildingmoldid
					set t1.attachmoldid=t2.buildingmoldid
					where t1.buildingid='".$zbuildingid,"'
						and (not t1.attachmoldid='')
						and (not t2.buildingmoldid is null);");
				$wtwiframes->query("
					update ".wtw_tableprefix."actionzones t1
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid,"' and (not buildingid='') and deleted=0) t2
						on t1.parentactionzoneid=t2.pastactionzoneid
					set t1.parentactionzoneid=t2.actionzoneid
					where t1.buildingid='".$zbuildingid,"'
						and (not t1.parentactionzoneid='')
						and (not t2.actionzoneid is null);");
				$wtwiframes->query("
					update ".wtw_tableprefix."actionzones t1
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid,"' and (not buildingid='') and deleted=0) t2
						on t1.loadactionzoneid=t2.pastactionzoneid
					set t1.loadactionzoneid=t2.actionzoneid
					where t1.buildingid='".$zbuildingid,"'
						and (not t1.loadactionzoneid='')
						and (not t2.actionzoneid is null);");
				$wtwiframes->query("
					update ".wtw_tableprefix."automations t1
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid,"' and (not buildingid='') and deleted=0) t2
						on t1.loadactionzoneid=t2.pastactionzoneid
					set t1.loadactionzoneid=t2.actionzoneid
					where t1.buildingid='".$zbuildingid,"'
						and (not t1.loadactionzoneid='');");
				$wtwiframes->query("
					update ".wtw_tableprefix."buildingmolds t1
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid,"' and (not buildingid='') and deleted=0) t2
						on t1.loadactionzoneid=t2.pastactionzoneid
					set t1.loadactionzoneid=t2.actionzoneid
					where t1.buildingid='".$zbuildingid,"'
						and (not t1.loadactionzoneid='');");
				$wtwiframes->query("
					update ".wtw_tableprefix."connectinggrids t1
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid,"' and (not buildingid='') and deleted=0) t2
						on t1.loadactionzoneid=t2.pastactionzoneid
					set t1.loadactionzoneid=t2.actionzoneid
					where t1.childwebid='".$zbuildingid,"'
						and t1.parentwebid=''
						and (not t1.loadactionzoneid='');");
				$wtwiframes->query("
					update ".wtw_tableprefix."connectinggrids t1
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid,"' and (not buildingid='') and deleted=0) t2
						on t1.unloadactionzoneid=t2.pastactionzoneid
					set t1.unloadactionzoneid=t2.actionzoneid
					where t1.childwebid='".$zbuildingid,"'
						and t1.parentwebid=''
						and (not t1.unloadactionzoneid='');");
				$wtwiframes->query("
					update ".wtw_tableprefix."connectinggrids t1
						left join (select * from ".wtw_tableprefix."actionzones where buildingid='".$zbuildingid,"' and (not buildingid='') and deleted=0) t2
						on t1.attachactionzoneid=t2.pastactionzoneid
					set t1.attachactionzoneid=t2.actionzoneid
					where t1.parentwebid='".$zbuildingid,"'
						and (not t1.attachactionzoneid='');");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwbuildings.php-copyBuilding=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function clearBuilding($zbuildingid) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->checkUpdateAccess("", $zbuildingid, "")) {
				$zdeleteindex = 2;
				$zresults = $wtwiframes->query("
					select max(deleted) as maxdeleted 
					from ".wtw_tableprefix."buildingmolds 
					where buildingid='".$zbuildingid."' limit 1;");
				foreach ($zresults as $zrow) {
					$zdeleteindex = $wtwiframes->getNumber($zrow["maxdeleted"],2);
				}
				$zdeleteindex += 1;
				$wtwiframes->query("
					update ".wtw_tableprefix."webimages w1 
						inner join ".wtw_tableprefix."buildingmolds bm1
							on w1.buildingmoldid = bm1.buildingmoldid
					set w1.deleted=".$zdeleteindex.",
						w1.deleteddate=now(),
						w1.deleteduserid='".$wtwiframes->userid."'
					where bm1.buildingid='".$zbuildingid,"'
						and not bm1.buildingid=''
						and not w1.buildingmoldid=''
						and w1.deleted=0;");
				$wtwiframes->query("
					update ".wtw_tableprefix."buildingmolds
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where buildingid='".$zbuildingid,"'
						and deleted=0;");
				$wtwiframes->query("
					update ".wtw_tableprefix."actionzones
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where buildingid='".$zbuildingid,"'
						and deleted=0
						and not actionzonetype='loadzone';");
				$wtwiframes->query("
					update ".wtw_tableprefix."automations
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where buildingid='".$zbuildingid,"'
						and deleted=0;");
				$wtwiframes->query("
					update ".wtw_tableprefix."webaliases
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where buildingid='".$zbuildingid,"'
						and deleted=0;");
				/* get 'high' distance load zone for initial slab of cement */
				$loadactionzoneid = "";
				$zresults = $wtwiframes->query("
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
					$zbuildingmoldid = $wtwiframes->getRandomString(16,1);
					$wtwiframes->query("
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
							'".$wtwiframes->userid."',
							now(),
							'".$wtwiframes->userid."');");
				}
				
				/* set the user starting position back to default new building setting */
				$wtwiframes->query("
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
						gravity=1,
						wallcollisions=1,
						floorcollisions=1
					where buildingid='".$zbuildingid,"';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwbuildings.php-clearBuilding=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function importBuilding($zbuildingid, $zpastbuildingid, $zbuildingname, $zbuildinganalyticsid, $zstartpositionx, $zstartpositiony, $zstartpositionz, $zstartscalingx, $zstartscalingy, $zstartscalingz, $zstartrotationx, $zstartrotationy, $zstartrotationz, $zgravity, $zalttag) {
		global $wtwiframes;
		try {
			/* ini_set('max_execution_time', 300); */
			if (!empty($wtwiframes->getSessionUserID())) {
				echo "<script>parent.WTW.updateProgressBar(75,100);</script>";
				if ($wtwiframes->keyExists(wtw_tableprefix.'buildings', 'buildingid', $zbuildingid) == false) {
					$wtwiframes->query("
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
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
					$zuserauthorizationid = $wtwiframes->getRandomString(16,1);
					$wtwiframes->query("
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
							 '".$wtwiframes->userid."',
							 '',
							 '".$zbuildingid."',
							 '',
							 'admin',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}
			}
			echo "<script>parent.WTW.updateProgressBar(95,100);</script>";
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwbuildings.php-importBuilding=".$e->getMessage());
		}
		return $zbuildingid;
	}	

	public function saveBuildingStartPosition($zbuildingid, $zstartpositionx, $zstartpositiony, $zstartpositionz, $zstartscalingx, $zstartscalingy, $zstartscalingz, $zstartrotationx, $zstartrotationy, $zstartrotationz) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->checkUpdateAccess("", $zbuildingid, "")) {
				$wtwiframes->query("
					update ".wtw_tableprefix."buildings
					set positionx=".$wtwiframes->checkNumber($zstartpositionx,0).",
						positiony=".$wtwiframes->checkNumber($zstartpositiony,0).",
						positionz=".$wtwiframes->checkNumber($zstartpositionz,0).",
						scalingx=".$wtwiframes->checkNumber($zstartscalingx,1).",
						scalingy=".$wtwiframes->checkNumber($zstartscalingy,1).",
						scalingz=".$wtwiframes->checkNumber($zstartscalingz,1).",
						rotationx=".$wtwiframes->checkNumber($zstartrotationx,0).",
						rotationy=".$wtwiframes->checkNumber($zstartrotationy,0).",
						rotationz=".$wtwiframes->checkNumber($zstartrotationz,0).",
						updatedate=now(),
						updateuserid='".$wtwiframes->userid."'
					where buildingid='".$zbuildingid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwbuildings.php-saveBuildingStartPosition=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function saveBuildingGravity($zbuildingid, $zgravity) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->checkUpdateAccess("", $zbuildingid, "")) {
				$wtwiframes->query("
					update ".wtw_tableprefix."communities
					set gravity=".$zgravity.",
						updatedate=now(),
						updateuserid='".$wtwiframes->userid."'
					where buildingid='".$zbuildingid."';");
			}
			$zsuccess = true;
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwbuildings.php-saveBuildingGravity=".$e->getMessage());
		}
		return $zsuccess;
	}
			
	public function saveTemplateBuilding($zpastbuildingid) {
		global $wtwiframes;
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
			$wtwiframes->serror("core-functions-class_wtwbuildings.php-saveTemplateBuilding=".$e->getMessage());
		}
		return $newbuildingid;
	}	

	public function shareBuildingTemplate($zbuildingid, $ztemplatename, $zdescription, $ztags) {
		global $wtwiframes;
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
			$wtwiframes->serror("core-functions-class_wtwbuildings.php-shareBuildingTemplate=".$e->getMessage());
		}
	}	
}

	function wtwbuildings() {
		return wtwbuildings::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwbuildings'] = wtwbuildings();
?>
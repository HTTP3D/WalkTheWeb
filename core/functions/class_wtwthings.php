<?php
class wtwthings {
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
	
	public function thingExist($zthingid) {
		global $wtwiframes;
		$found = false;
		try {
			$zresults = array();
			$zresults = $wtwiframes->query("
				select thingid 
				from ".wtw_tableprefix."things 
				where thingid='".$zthingid."' limit 1");
			foreach ($zresults as $zrow) {
				$found = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwthings.php-thingExist=".$e->getMessage());
		}
		return $found;
	}

	public function saveThing($zthingid, $zpastthingid, $zthingname, $zanalyticsid, $zalttag) {
		global $wtwiframes;
		$copythingid = "";
		$newthingid = "";
		try {
			if (!empty($zpastthingid) && isset($zpastthingid) && $wtwiframes->checkUpdateAccess("", "", $zpastthingid) == false) {
				/* denies copy function if you do not have access to thing to copy */
				$zpastthingid = "";
			}
			$zresults = array();
			if ($zthingid == "") {
				/* create new thingid */
				$zthingid = $wtwiframes->getRandomString(16,1);
				
				if (empty($zpastthingid) || !isset($zpastthingid)) {
					/* create new thing (without access to copy thing or if not copying existing thing, this creates new thing) */
					$wtwiframes->query("
						insert into ".wtw_tableprefix."things
							(thingid,
							 pastthingid,
							 thingname,
							 analyticsid,
							 userid,
							 alttag,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zthingid."',
							 '',
							 '".$wtwiframes->escapeHTML($zthingname)."',
							 '".$zanalyticsid."',
							 '".$wtwiframes->userid."',
							 '".$wtwiframes->escapeHTML($zalttag)."',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				} else {
					/* with access to copy thing, this gets all values */
					$wtwiframes->query("
						insert into ".wtw_tableprefix."things
							(thingid,
							 pastthingid,
							 thingname,
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
						select '".$zthingid."' as thingid,
							 '".$zpastthingid."' as pastthingid,
							 '".$wtwiframes->escapeHTML($zthingname)."' as thingname,
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
						from ".wtw_tableprefix."things
						where thingid='".$zpastthingid."';");
				}
				/* give user Admin access to their new thing */ 
				$wtwiframes->query("
					insert into ".wtw_tableprefix."userauthorizations
						(userauthorizationid,
						 userid,
						 thingid,
						 useraccess,
						 createdate,
						 createuserid,
						 updatedate,
						 updateuserid)
					values
						(getid16(),
						 '".$wtwiframes->userid."',
						 '".$zthingid."',
						 'admin',
						 now(),
						 '".$wtwiframes->userid."',
						 now(),
						 '".$wtwiframes->userid."');");
			} else if ($wtwiframes->checkUpdateAccess("", "", $zthingid)) {
				/* only updates if you have access */
				$wtwiframes->query("
					update ".wtw_tableprefix."things
					set  thingname='".$wtwiframes->escapeHTML($zthingname)."',
						 analyticsid='".$zanalyticsid."',
						 alttag='".$wtwiframes->escapeHTML($zalttag)."',
						 updatedate=now(),
						 updateuserid='".$wtwiframes->userid."'
					where thingid='".$zthingid."';");
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwthings.php-saveThing=".$e->getMessage());
		}
		if ($zpastthingid != "" && $zthingid != "") {
			$copythingid = $this->copyThing($zthingid, $zpastthingid);
		}
		if ($copythingid == "") {
			$copythingid = $zthingid;
		}
		return $copythingid;
	}

	public function saveThingStartPosition($zthingid, $zstartpositionx, $zstartpositiony, $zstartpositionz, $zstartscalingx, $zstartscalingy, $zstartscalingz, $zstartrotationx, $zstartrotationy, $zstartrotationz) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->checkUpdateAccess("", "", $zthingid)) {
				$wtwiframes->query("
					update ".wtw_tableprefix."things
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
					where thingid='".$zthingid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwthings.php-saveThingStartPosition=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function clearThing($zthingid) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->checkAdminAccess("", "", $zthingid)) {
				$zdeleteindex = 2;
				$zresults = $wtwiframes->query("
					select max(deleted) as maxdeleted 
					from ".wtw_tableprefix."thingmolds 
					where thingid='".$zthingid."' limit 1;");
				foreach ($zresults as $zrow) {
					$zdeleteindex = $wtwiframes->getNumber($zrow["maxdeleted"],2);
				}
				$zdeleteindex += 1;
				$wtwiframes->query("
					update ".wtw_tableprefix."webimages w1 
						inner join ".wtw_tableprefix."thingmolds tm1
							on w1.thingmoldid = tm1.thingmoldid
					set w1.deleted=".$zdeleteindex.",
						w1.deleteddate=now(),
						w1.deleteduserid='".$wtwiframes->userid."'
					where tm1.thingid='".$zthingid."'
						and not tm1.thingid=''
						and not w1.thingmoldid=''
						and w1.deleted=0;");
				$wtwiframes->query("
					update ".wtw_tableprefix."thingmolds
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where thingid='".$zthingid."'
						and deleted=0;");
				$wtwiframes->query("
					update ".wtw_tableprefix."actionzones
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where thingid='".$zthingid."'
						and deleted=0
						and not actionzonetype='loadzone';");
				$wtwiframes->query("
					update ".wtw_tableprefix."automations
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where thingid='".$zthingid."'
						and deleted=0;");
				$wtwiframes->query("
					update ".wtw_tableprefix."things
					set updatedate=now(),
						updateuserid='".$wtwiframes->userid."'
					where thingid='".$zthingid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwthings.php-clearThing=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function deleteThing($zthingid) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->checkAdminAccess("", "", $zthingid)) {
				$zdeleteindex = 2;
				$zresults = $wtwiframes->query("
					select max(deleted) as maxdeleted 
					from ".wtw_tableprefix."thingmolds 
					where thingid='".$zthingid."' limit 1;");
				foreach ($zresults as $zrow) {
					$zdeleteindex = $wtwiframes->getNumber($zrow["maxdeleted"],2);
				}
				$zdeleteindex += 1;				
				$this->clearThing($zthingid);
				$wtwiframes->query("
					update ".wtw_tableprefix."things
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where thingid='".$zthingid."'
						and deleted=0
						and not thingid='';");
				$wtwiframes->query("
					update ".wtw_tableprefix."userauthorizations
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where thingid='".$zthingid."'
						and deleted=0
						and not thingid='';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwthings.php-deleteThing=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function copyThing($zthingid, $zcopythingid) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			/* new thing has to already exist */
			/* does user have access to copy thing and new thing */
			if ($wtwiframes->checkUpdateAccess("", "", $zthingid) && $wtwiframes->checkUpdateAccess("", "", $zcopythingid)) {
				$zresults = $wtwiframes->query("
					select t2.actionzoneid as pastactionzoneid,
						 t2.communityid,
						 t2.buildingid,
						 '".$tzhingid."' as thingid,
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
						 t2.jsparameters
					from ".wtw_tableprefix."actionzones t2
					where t2.thingid='".$zfromthingid."'
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zactionzoneid = $wtwiframes->getRandomString(16,1);
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
							 '".$zrow["pastactionzoneid"]."',
							 '".$zrow["communityid"]."',
							 '".$zrow["buildingid"]."',
							 '".$zrow["thingid"]."',
							 '".$zrow["attachmoldid"]."',
							 '".$zrow["loadactionzoneid"]."',
							 '".$zrow["actionzonename"]."',
							 '".$zrow["actionzonetype"]."',
							 '".$zrow["actionzoneshape"]."',
							 '".$zrow["movementtype"]."',
							 ".$wtwiframes->checkNumber($zrow["positionx"],0).",
							 ".$wtwiframes->checkNumber($zrow["positiony"],0).",
							 ".$wtwiframes->checkNumber($zrow["positionz"],0).",
							 ".$wtwiframes->checkNumber($zrow["scalingx"],1).",
							 ".$wtwiframes->checkNumber($zrow["scalingy"],1).",
							 ".$wtwiframes->checkNumber($zrow["scalingz"],1).",
							 ".$wtwiframes->checkNumber($zrow["rotationx"],0).",
							 ".$wtwiframes->checkNumber($zrow["rotationy"],0).",
							 ".$wtwiframes->checkNumber($zrow["rotationz"],0).",
							 ".$wtwiframes->checkNumber($zrow["axispositionx"],0).",
							 ".$wtwiframes->checkNumber($zrow["axispositiony"],0).",
							 ".$wtwiframes->checkNumber($zrow["axispositionz"],0).",
							 ".$wtwiframes->checkNumber($zrow["axisrotationx"],0).",
							 ".$wtwiframes->checkNumber($zrow["axisrotationy"],0).",
							 ".$wtwiframes->checkNumber($zrow["axisrotationz"],0).",
							 '".$zrow["rotateaxis"]."',
							 ".$wtwiframes->checkNumber($zrow["rotatedegrees"],90).",
							 ".$wtwiframes->checkNumber($zrow["rotatedirection"],1).",
							 ".$wtwiframes->checkNumber($zrow["rotatespeed"],1).",
							 ".$wtwiframes->checkNumber($zrow["movementdistance"],0).",
							 '".$zrow["parentactionzoneid"]."',
							 '".$zrow["jsfunction"]."',
							 '".$zrow["jsparameters"]."',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}
				$zresults = $wtwiframes->query("
					select t2.connectinggridid as pastconnectinggridid,
						 t2.parentwebid,
						 t2.parentwebtype,
						 '".$zthingid."' as childwebid,
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
						 t2.alttag
					from ".wtw_tableprefix."connectinggrids t2
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where thingid='".$zthingid."' and (not thingid='')) t3
						on t3.pastactionzoneid = t2.loadactionzoneid
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where thingid='".$zthingid."' and (not thingid='')) t4
						on t4.pastactionzoneid=t2.unloadactionzoneid
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where thingid='".$zthingid."' and (not thingid='')) t5
						on t5.pastactionzoneid=t2.attachactionzoneid
					where t2.childwebid='".$zfromthingid."'
						and parentwebid=''
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zconnectinggridid = $wtwiframes->getRandomString(16,1);
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
							 '".$zrow["pastconnectinggridid"]."',
							 '".$zrow["parentwebid"]."',
							 '".$zrow["parentwebtype"]."',
							 '".$zrow["childwebid"]."',
							 '".$zrow["childwebtype"]."',
							 ".$wtwiframes->checkNumber($zrow["positionx"],0).",
							 ".$wtwiframes->checkNumber($zrow["positiony"],0).",
							 ".$wtwiframes->checkNumber($zrow["positionz"],0).",
							 ".$wtwiframes->checkNumber($zrow["scalingx"],1).",
							 ".$wtwiframes->checkNumber($zrow["scalingy"],1).",
							 ".$wtwiframes->checkNumber($zrow["scalingz"],1).",
							 ".$wtwiframes->checkNumber($zrow["rotationx"],0).",
							 ".$wtwiframes->checkNumber($zrow["rotationy"],0).",
							 ".$wtwiframes->checkNumber($zrow["rotationz"],0).",
							 '".$zrow["loadactionzoneid"]."',
							 '".$zrow["unloadactionzoneid"]."',
							 '".$zrow["attachactionzoneid"]."',
							 '".$zrow["alttag"]."',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}
				$zresults = $wtwiframes->query("
					select t2.connectinggridid as pastconnectinggridid,
						 '".$zthingid."' as parentwebid,
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
						 t2.alttag
					from ".wtw_tableprefix."connectinggrids t2
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where thingid='".$zthingid."' and (not thingid='')) t3
						on t3.pastactionzoneid=t2.loadactionzoneid
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where thingid='".$zthingid."' and (not thingid='')) t4
						on t4.pastactionzoneid=t2.unloadactionzoneid
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where thingid='".$zthingid."' and (not thingid='')) t5
						on t5.pastactionzoneid=t2.attachactionzoneid
					where t2.parentwebid='".$zfromthingid."'
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zconnectinggridid = $wtwiframes->getRandomString(16,1);
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
							 '".$zrow["pastconnectinggridid"]."',
							 '".$zrow["parentwebid"]."',
							 '".$zrow["parentwebtype"]."',
							 '".$zrow["childwebid"]."',
							 '".$zrow["childwebtype"]."',
							 ".$wtwiframes->checkNumber($zrow["positionx"],0).",
							 ".$wtwiframes->checkNumber($zrow["positiony"],0).",
							 ".$wtwiframes->checkNumber($zrow["positionz"],0).",
							 ".$wtwiframes->checkNumber($zrow["scalingx"],1).",
							 ".$wtwiframes->checkNumber($zrow["scalingy"],1).",
							 ".$wtwiframes->checkNumber($zrow["scalingz"],1).",
							 ".$wtwiframes->checkNumber($zrow["rotationx"],0).",
							 ".$wtwiframes->checkNumber($zrow["rotationy"],0).",
							 ".$wtwiframes->checkNumber($zrow["rotationz"],0).",
							 '".$zrow["loadactionzoneid"]."',
							 '".$zrow["unloadactionzoneid"]."',
							 '".$zrow["attachactionzoneid"]."',
							 '".$zrow["alttag"]."',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}
				$zresults = $wtwiframes->query("
					select t2.automationid as pastautomationid,
						 t2.automationname,
						 t2.communityid,
						 t2.buildingid,
						 '".$zthingid."' as thingid,
						 t3.actionzoneid as loadactionzoneid,
						 t2.jsfunction,
						 t2.jsparameters
					from ".wtw_tableprefix."automations t2
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where thingid='".$zthingid."' and (not thingid='')) t3
						on t3.pastactionzoneid=t2.loadactionzoneid
					where t2.thingid='".$zfromthingid."'
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zautomationid = $wtwiframes->getRandomString(16,1);
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
							 '".$zrow["pastautomationid"]."',
							 '".$zrow["automationname"]."',
							 '".$zrow["communityid"]."',
							 '".$zrow["buildingid"]."',
							 '".$zrow["thingid"]."',
							 '".$zrow["loadactionzoneid"]."',
							 '".$zrow["jsfunction"]."',
							 '".$zrow["jsparameters"]."',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}
				$zresults = $wtwiframes->query("
					select t2.automationstepid as pastautomationstepid,
						 t3.automationid as automationid,
						 t2.step,
						 t2.automationtype,
						 t4.actionzoneid as actionzoneid,
						 t2.actionzonestatus,
						 t2.conditionoperator,
						 t2.conditionstatus,
						 t2.conditionvalue,
						 t2.jsfunction,
						 t2.jsparameters
					from (select * from ".wtw_tableprefix."automations 
							where thingid='".$zfromthingid."' and deleted=0) t1
					inner join ".wtw_tableprefix."automationsteps t2
						on t1.automationid=t2.automationid
					left join (select automationid, pastautomationid 
							from ".wtw_tableprefix."automations 
							where thingid='".$zthingid."' and (not thingid='')) t3
						on t3.pastautomationid=t2.automationid
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where thingid='".$zthingid."' and (not thingid='')) t4
						on t4.pastactionzoneid=t2.actionzoneid
					where t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zautomationstepid = $wtwiframes->getRandomString(16,1);
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
						values
							('".$zautomationstepid."',
							 '".$zrow["pastautomationstepid"]."',
							 '".$zrow["automationid"]."',
							 ".$wtwiframes->checkNumber($zrow["step"],1).",
							 '".$zrow["automationtype"]."',
							 '".$zrow["actionzoneid"]."',
							 ".$wtwiframes->checkNumber($zrow["actionzonestatus"],0).",
							 '".$zrow["conditionoperator"]."',
							 '".$zrow["conditionstatus"]."',
							 '".$zrow["conditionvalue"]."',
							 '".$zrow["jsfunction"]."',
							 '".$zrow["jsparameters"]."',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}
				$zresults = $wtwiframes->query("
					select t3.thingmoldid as pastthingmoldid,
						t4.actionzoneid as loadactionzoneid,
						'".$zthingid."' as thingid,
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
						t5.actionzoneid as actionzoneid,
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
						t3.emissivecolorb
					from ".wtw_tableprefix."thingmolds t3
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where thingid='".$zthingid."' and (not thingid='')) t4
						on t4.pastactionzoneid=t3.loadactionzoneid
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where thingid='".$zthingid."' and (not thingid='')) t5
						on t5.pastactionzoneid=t3.actionzoneid
					where t3.thingid='".$zfromthingid."'
						and t3.deleted=0;");
				foreach ($zresults as $zrow) {
					$zthingmoldid = $wtwiframes->getRandomString(16,1);
					$wtwiframes->query("
						insert into ".wtw_tableprefix."thingmolds
						   (thingmoldid,
							pastthingmoldid,
							loadactionzoneid,
							thingid,
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
						   ('".$zthingmoldid."',
							'".$zrow["pastthingmoldid"]."',
							'".$zrow["loadactionzoneid"]."',
							'".$zrow["thingid"]."',
							'".$zrow["shape"]."',
							'".$zrow["covering"]."',
							".$wtwiframes->checkNumber($zrow["positionx"],0).",
							".$wtwiframes->checkNumber($zrow["positiony"],0).",
							".$wtwiframes->checkNumber($zrow["positionz"],0).",
							".$wtwiframes->checkNumber($zrow["scalingx"],1).",
							".$wtwiframes->checkNumber($zrow["scalingy"],1).",
							".$wtwiframes->checkNumber($zrow["scalingz"],1).",
							".$wtwiframes->checkNumber($zrow["rotationx"],0).",
							".$wtwiframes->checkNumber($zrow["rotationy"],0).",
							".$wtwiframes->checkNumber($zrow["rotationz"],0).",
							".$wtwiframes->checkNumber($zrow["special1"],0).",
							".$wtwiframes->checkNumber($zrow["special2"],0).",
							".$wtwiframes->checkNumber($zrow["uoffset"],0).",
							".$wtwiframes->checkNumber($zrow["voffset"],0).",
							".$wtwiframes->checkNumber($zrow["uscale"],0).",
							".$wtwiframes->checkNumber($zrow["vscale"],0).",
							'".$zrow["uploadobjectid"]."',
							".$wtwiframes->checkNumber($zrow["receiveshadows"],0).",
							".$wtwiframes->checkNumber($zrow["graphiclevel"],0).",
							'".$zrow["textureid"]."',
							'".$zrow["texturebumpid"]."',
							'".$zrow["texturehoverid"]."',
							'".$zrow["videoid"]."',
							'".$zrow["videoposterid"]."',
							'".$zrow["heightmapid"]."',
							'".$zrow["mixmapid"]."',
							'".$zrow["texturerid"]."',
							'".$zrow["texturegid"]."',
							'".$zrow["texturebid"]."',
							'".$zrow["texturebumprid"]."',
							'".$zrow["texturebumpgid"]."',
							'".$zrow["texturebumpbid"]."',
							'".$zrow["soundid"]."',
							'".$zrow["soundname"]."',
							'".$zrow["soundattenuation"]."',
							".$wtwiframes->checkNumber($zrow["soundloop"],1).",
							".$wtwiframes->checkNumber($zrow["soundmaxdistance"],100).",
							".$wtwiframes->checkNumber($zrow["soundrollofffactor"],1).",
							".$wtwiframes->checkNumber($zrow["soundrefdistance"],1).",
							".$wtwiframes->checkNumber($zrow["soundconeinnerangle"],90).",
							".$wtwiframes->checkNumber($zrow["soundconeouterangle"],180).",
							".$wtwiframes->checkNumber($zrow["soundconeoutergain"],1).",
							'".$zrow["webtext"]."',
							'".$zrow["webstyle"]."',
							".$wtwiframes->checkNumber($zrow["opacity"],100).",
							'".$zrow["sideorientation"]."',
							".$wtwiframes->checkNumber($zrow["billboard"],0).",
							".$wtwiframes->checkNumber($zrow["waterreflection"],0).",
							".$wtwiframes->checkNumber($zrow["subdivisions"],12).",
							".$wtwiframes->checkNumber($zrow["minheight"],0).",
							".$wtwiframes->checkNumber($zrow["maxheight"],30).",
							".$wtwiframes->checkNumber($zrow["checkcollisions"],1).",
							".$wtwiframes->checkNumber($zrow["ispickable"],1).",
							'".$zrow["actionzoneid"]."',
							'".$zrow["csgmoldid"]."',
							'".$zrow["csgaction"]."',
							'".$zrow["alttag"]."',
							'".$zrow["productid"]."',
							'".$zrow["slug"]."',
							'".$zrow["categoryid"]."',
							'".$zrow["allowsearch"]."',
							'".$zrow["jsfunction"]."',
							'".$zrow["jsparameters"]."',
							".$wtwiframes->checkNumber($zrow["diffusecolorr"],1).",
							".$wtwiframes->checkNumber($zrow["diffusecolorg"],1).",
							".$wtwiframes->checkNumber($zrow["diffusecolorb"],1).",
							".$wtwiframes->checkNumber($zrow["specularcolorr"],1).",
							".$wtwiframes->checkNumber($zrow["specularcolorg"],1).",
							".$wtwiframes->checkNumber($zrow["specularcolorb"],1).",
							".$wtwiframes->checkNumber($zrow["emissivecolorr"],1).",
							".$wtwiframes->checkNumber($zrow["emissivecolorg"],1).",
							".$wtwiframes->checkNumber($zrow["emissivecolorb"],1).",
							now(),
							'".$wtwiframes->userid."',
							now(),
							'".$wtwiframes->userid."');");
				}
				$zresults = $wtwiframes->query("
					select t4.webimageid as pastwebimageid,
						 t6.thingmoldid as thingmoldid,
						 '' as buildingmoldid,
						 '' as communitymoldid,
						 t4.imageindex,
						 t4.imageid,
						 t4.imagehoverid,
						 t4.imageclickid,
						 t4.jsfunction,
						 t4.jsparameters,
						 t4.userid,
						 t4.alttag
					from ".wtw_tableprefix."webimages t4 
					inner join ".wtw_tableprefix."thingmolds t5
						on t4.thingmoldid = t5.thingmoldid
					left join (select thingmoldid, pastthingmoldid 
							from ".wtw_tableprefix."thingmolds 
							where thingid='".$zthingid."' and (not thingid='')) t6
						on t6.pastthingmoldid=t4.thingmoldid
					where t5.thingid='".$zfromthingid."'
						and (not t4.thingmoldid='')
						and t5.deleted=0
						and t4.deleted=0;");
				foreach ($zresults as $zrow) {
					$zwebimageid = $wtwiframes->getRandomString(16,1);
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
							 '".$zrow["pastwebimageid"]."',
							 '".$zrow["thingmoldid"]."',
							 '".$zrow["buildingmoldid"]."',
							 '".$zrow["communitymoldid"]."',
							 ".$wtwiframes->checkNumber($zrow["imageindex"],1).",
							 '".$zrow["imageid"]."',
							 '".$zrow["imagehoverid"]."',
							 '".$zrow["imageclickid"]."',
							 '".$zrow["jsfunction"]."',
							 '".$zrow["jsparameters"]."',
							 '".$wtwiframes->userid."',
							 '".$zrow["alttag"]."',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}
				$zresults = $wtwiframes->query("
					select t6.thingmoldid as thingmoldid,
						 t4.pathnumber,
						 t4.sorder,
						 t4.positionx,
						 t4.positiony,
						 t4.positionz
					from ".wtw_tableprefix."moldpoints t4 
					inner join ".wtw_tableprefix."thingmolds t5
						on t4.moldid = t5.thingmoldid
					left join (select thingmoldid, pastthingmoldid 
							from ".wtw_tableprefix."thingmolds 
							where thingid='".$zthingid."' and (not thingid='')) t6
						on t6.pastthingmoldid=t4.moldid
					where t5.thingid='".$zfromthingid."'
						and (not t4.moldid='')
						and t5.deleted=0
						and t4.deleted=0;");
				foreach ($zresults as $zrow) {
					$zmoldpointid = $wtwiframes->getRandomString(16,1);
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
							 '".$zrow["moldid"]."',
							 ".$wtwiframes->checkNumber($zrow["pathnumber"],1).",
							 ".$wtwiframes->checkNumber($zrow["sorder"],0).",
							 ".$wtwiframes->checkNumber($zrow["positionx"],0).",
							 ".$wtwiframes->checkNumber($zrow["positiony"],0).",
							 ".$wtwiframes->checkNumber($zrow["positionz"],0).",
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}
				$wtwiframes->query("
					update ".wtw_tableprefix."thingmolds
					set actionzoneid=''
					where actionzoneid is null 
						and thingid='".$zthingid."';");
				$wtwiframes->query("
					update ".wtw_tableprefix."thingmolds
					set loadactionzoneid=''
					where loadactionzoneid is null 
						and thingid='".$zthingid."';");
				$wtwiframes->query("
					update ".wtw_tableprefix."thingmolds
					set csgmoldid=''
					where csgmoldid is null 
						and thingid='".$zthingid."';");
				$wtwiframes->query("
					update ".wtw_tableprefix."actionzones
					set attachmoldid=''
					where attachmoldid is null 
						and thingid='".$zthingid."';");
				$wtwiframes->query("
					update ".wtw_tableprefix."thingmolds t1 
						inner join (select * 
							from ".wtw_tableprefix."thingmolds 
							where thingid='".$zthingid."' 
								and deleted=0) t2
						on t1.csgmoldid = t2.pastthingmoldid
					set t1.csgmoldid = t2.thingmoldid
					where not t1.csgmoldid=''
						and t1.thingid='".$zthingid."'
						and (not t2.thingmoldid is null);");
				$wtwiframes->query("
					update ".wtw_tableprefix."actionzones t1
						inner join (select * 
							from ".wtw_tableprefix."thingmolds 
							where thingid='".$zthingid."' 
								and deleted=0) t2
						on t1.attachmoldid=t2.pastthingmoldid
					set t1.attachmoldid=t2.thingmoldid
					where t1.thingid='".$zthingid."'
						and not t1.attachmoldid='';");
				$wtwiframes->query("
					update ".wtw_tableprefix."actionzones t1
						inner join (select * 
							from ".wtw_tableprefix."actionzones 
							where thingid='".$zthingid."' 
								and deleted=0 
								and (not thingid='')) t2
						on t1.parentactionzoneid=t2.pastactionzoneid
					set t1.parentactionzoneid=t2.actionzoneid
					where t1.thingid='".$zthingid."'
						and not t1.parentactionzoneid='';");
				$wtwiframes->query("
					update ".wtw_tableprefix."actionzones t1
						inner join (select * 
							from ".wtw_tableprefix."actionzones 
							where thingid='".$zthingid."' 
								and deleted=0 
								and (not thingid='')) t2
						on t1.loadactionzoneid=t2.pastactionzoneid
					set t1.loadactionzoneid=t2.actionzoneid
					where t1.thingid='".$zthingid."'
						and not t1.loadactionzoneid='';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwthings.php-copyThing=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function importThing($zthingid, $zpastthingid, $zthingname, $zthinganalyticsid, $zstartpositionx, $zstartpositiony, $zstartpositionz, $zstartscalingx, $zstartscalingy, $zstartscalingz, $zstartrotationx, $zstartrotationy, $zstartrotationz, $zgravity, $zalttag) {
		global $wtwiframes;
		try {
			/* ini_set('max_execution_time', 300); */
			if (!empty($wtwiframes->getSessionUserID())) {
				echo "<script>parent.WTW.updateProgressBar(75,100);</script>";
				if ($wtwiframes->keyExists(wtw_tableprefix.'things', 'thingid', $zthingid) == false) {
					$wtwiframes->query("
						insert into ".wtw_tableprefix."things
							(thingid, 
							 pastthingid, 
							 thingname, 
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
							('".$zthingid."', 
							 '".$zpastthingid."', 
							 '".$zthingname."', 
							 '".$zthinganalyticsid."', 
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
							 '',
							 '".$zthingid."',
							 'admin',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}
			}
			echo "<script>parent.WTW.updateProgressBar(95,100);</script>";
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwthings.php-importThing=".$e->getMessage());
		}
		return $zthingid;
	}		
	
	public function addMustHave() {
		global $wtwiframes;
		$returntext = array();
		try {
			$conn = new mysqli(wtw_dbserver, wtw_dbusername, wtw_dbpassword, wtw_dbname);
			if ($conn->connect_error) {
				serror("core-functions-things.php-addMustHave=".$conn->connect_error);
			} else {
				$zuserid = "";
				if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
					$zuserid = $_SESSION["wtw_userid"];
				}
				$sql = "CALL insertthingsmusthave('".$zuserid."');";
				try {
					$i = 0;
					$result = $conn->query($sql);
					if (is_object($result)) {
						if ($result->num_rows > 0) {
							while($zrow = $result->fetch_assoc()) {
								$zauthorizedusers = array('userid'=> $zrow["userid"]);
								$zthinginfo = array(
									'thingid' => $zrow["thingid"],
									'thingname' => htmlspecialchars($zrow["thingname"], ENT_QUOTES, 'UTF-8'),
									'createdate' => $zrow["createdate"]
								);
								$zshare = array(
									'templatename' => htmlspecialchars($zrow["templatename"], ENT_QUOTES, 'UTF-8'),
									'description' => htmlspecialchars($zrow["description"], ENT_QUOTES, 'UTF-8'),
									'tags' => htmlspecialchars($zrow["tags"], ENT_QUOTES, 'UTF-8')
								);
								$returntext[$i] = array(
									'thinginfo'=> $zthinginfo,
									'share'=> $zshare,
									'authorizedusers'=> $zauthorizedusers
								);
								$i += 1;
							}
						} else {
							serror("core-functions-class_wtwthings.php-addMustHave=Must Have Things could not be Added");
						}
					}
				} catch (Exception $e) {
					
				}
			}
			$conn->close();
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwthings.php-addMustHave=".$e->getMessage());
		}
		return htmlspecialchars(json_encode($returntext), ENT_QUOTES, 'UTF-8');
	}

	public function shareThingTemplate($zthingid, $ztemplatename, $zdescription, $ztags) {
		global $wtwiframes;
		try {
			$conn = new mysqli(wtw_dbserver, wtw_dbusername, wtw_dbpassword, wtw_dbname);
			if ($conn->connect_error) {
				serror("core-functions-things.php-shareThingTemplate=".$conn->connect_error);
			} else {
				$zuserid = "";
				if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
					$zuserid = $_SESSION["wtw_userid"];
				}
				$ztemplatename = htmlspecialchars($ztemplatename, ENT_QUOTES, 'UTF-8');
				$zdescription = htmlspecialchars($zdescription, ENT_QUOTES, 'UTF-8');
				$ztags = htmlspecialchars($ztags, ENT_QUOTES, 'UTF-8');
				$sql = "CALL sharethingtemplate('".$zthingid."','".$ztemplatename."','".$zdescription."','".$ztags."','".$zuserid."');";
				$result = $conn->query($sql);
			}
			$conn->close();
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwthings.php-shareThingTemplate=".$e->getMessage());
		}
	}	

	public function saveTemplateThing($zpastthingid) {
		global $wtwiframes;
		$newthingid = "";
		try {
			$conn = new mysqli(wtw_dbserver, wtw_dbusername, wtw_dbpassword, wtw_dbname);
			if ($conn->connect_error) {
				serror("core-functions-things.php-saveTemplateThing=".$conn->connect_error);
			} else {
				$zuserid = "";
				if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
					$zuserid = $_SESSION["wtw_userid"];
				}
				$sql = "CALL copytemplatetothing('".$zpastthingid."','".$zuserid."');";
				$result = $conn->query($sql);
				if (is_object($result)) {
					if ($result->num_rows > 0) {
						while($zrow = $result->fetch_assoc()) {
							$newthingid = $zrow["thingid"];
						}
					} else {
						serror("core-functions-things.php-saveTemplateThing=thing could not be created");
					}		
				}
			}
			$conn->close();
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwthings.php-saveTemplateThing=".$e->getMessage());
		}
		return $newthingid;
	}
}

	function wtwthings() {
		return wtwthings::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwthings'] = wtwthings();
?>
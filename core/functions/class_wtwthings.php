<?php
class wtwthings {
	/* wtwthings class for admin database functions for 3d things */
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
		/* validate if a thing id is found in the database */
		global $wtwhandlers;
		$found = false;
		try {
			$zresults = array();
			$zresults = $wtwhandlers->query("
				select thingid 
				from ".wtw_tableprefix."things 
				where thingid='".$zthingid."' limit 1");
			foreach ($zresults as $zrow) {
				$found = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwthings.php-thingExist=".$e->getMessage());
		}
		return $found;
	}

	public function saveThing($zthingid, $zpastthingid, $zversionid, $zversion, $zversiondesc, $zthingname, $zthingdescription, $zanalyticsid, $zalttag) {
		/* save thing settings */
		global $wtwhandlers;
		$copythingid = "";
		try {
			set_time_limit(0);
			if ($wtwhandlers->hasValue($zpastthingid) && $wtwhandlers->checkUpdateAccess("", "", $zpastthingid) == false) {
				/* denies copy function if you do not have access to thing to copy */
				$zpastthingid = "";
			}
			$zresults = array();
			if (empty($zthingid)) {
				/* create new thingid */
				$zthingid = $wtwhandlers->getRandomString(16,1);
				$zhostuserid = '';
				if ($wtwhandlers->isUserInRole("Host") && $wtwhandlers->isUserInRole("Admin") == false) {
					$zhostuserid = $wtwhandlers->userid;
				}
				
				if (!isset($zpastthingid) || empty($zpastthingid)) {
					/* create new thing (without access to copy thing or if not copying existing thing, this creates new thing) */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."things
							(thingid,
							 pastthingid,
							 versionid,
							 version,
							 versionorder,
							 versiondesc,
							 thingname,
							 thingdescription,
							 analyticsid,
							 hostuserid,
							 userid,
							 alttag,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zthingid."',
							 '',
							 '".$zthingid."',
							 '1.0.0',
							 1000000,
							 'Initial Version',
							 '".$wtwhandlers->escapeHTML($zthingname)."',
							 '".$wtwhandlers->escapeHTML($zthingdescription)."',
							 '".$zanalyticsid."',
							 '".$zhostuserid."',
							 '".$wtwhandlers->userid."',
							 '".$wtwhandlers->escapeHTML($zalttag)."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				} else {
					/* with access to copy thing, this gets all values */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."things
							(thingid,
							 pastthingid,
							 versionid,
							 version,
							 versionorder,
							 versiondesc,
							 thingname,
							 thingdescription,
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
						select '".$zthingid."' as thingid,
							 '".$zpastthingid."' as pastthingid,
							 versionid,
							 version,
							 versionorder,
							 versiondesc,
							 '".$wtwhandlers->escapeHTML($zthingname)."' as thingname,
							 '".$wtwhandlers->escapeHTML($zthingdescription)."' as thingdescription,
							 analyticsid,
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
						from ".wtw_tableprefix."things
						where thingid='".$zpastthingid."';");
				}
				/* give user Admin access to their new thing */ 
				$zuserauthorizationid = $wtwhandlers->getRandomString(16,1);
				$wtwhandlers->query("
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
						('".$zuserauthorizationid."',
						 '".$wtwhandlers->userid."',
						 '".$zthingid."',
						 'admin',
						 now(),
						 '".$wtwhandlers->userid."',
						 now(),
						 '".$wtwhandlers->userid."');");
			} else if ($wtwhandlers->checkUpdateAccess("", "", $zthingid)) {
				/* only updates if you have access */
				$wtwhandlers->query("
					update ".wtw_tableprefix."things
					set version='".$wtwhandlers->escapeHTML($zversion)."',
						versiondesc='".$wtwhandlers->escapeHTML($zversiondesc)."',
						thingname='".$wtwhandlers->escapeHTML($zthingname)."',
						thingdescription='".$wtwhandlers->escapeHTML($zthingdescription)."',
						analyticsid='".$zanalyticsid."',
						alttag='".$wtwhandlers->escapeHTML($zalttag)."',
						updatedate=now(),
						updateuserid='".$wtwhandlers->userid."'
					where thingid='".$zthingid."';");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwthings.php-saveThing=".$e->getMessage());
		}
		if (!empty($zpastthingid) && !empty($zthingid)) {
			if ($this->copyThing($zthingid, $zpastthingid)) {
				$copythingid = $zthingid;
			}
		}
		if (empty($copythingid)) {
			$copythingid = $zthingid;
		}
		return $copythingid;
	}

	public function saveThingStartPosition($zthingid, $zstartpositionx, $zstartpositiony, $zstartpositionz, $zstartscalingx, $zstartscalingy, $zstartscalingz, $zstartrotationx, $zstartrotationy, $zstartrotationz) {
		/* update avatar start position in relation to a thing */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->checkUpdateAccess("", "", $zthingid)) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."things
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
					where thingid='".$zthingid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwthings.php-saveThingStartPosition=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function clearThing($zthingid) {
		/* flags all molds as deleted for a given 3D Thing */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->checkAdminAccess("", "", $zthingid)) {
				$zdeleteindex = 2;
				$zresults = $wtwhandlers->query("
					select max(deleted) as maxdeleted 
					from ".wtw_tableprefix."thingmolds 
					where thingid='".$zthingid."' limit 1;");
				foreach ($zresults as $zrow) {
					$zdeleteindex = $wtwhandlers->getNumber($zrow["maxdeleted"],2);
				}
				$zdeleteindex += 1;
				$wtwhandlers->query("
					update ".wtw_tableprefix."webimages w1 
						inner join ".wtw_tableprefix."thingmolds tm1
							on w1.thingmoldid = tm1.thingmoldid
					set w1.deleted=".$zdeleteindex.",
						w1.deleteddate=now(),
						w1.deleteduserid='".$wtwhandlers->userid."'
					where tm1.thingid='".$zthingid."'
						and not tm1.thingid=''
						and not w1.thingmoldid=''
						and w1.deleted=0;");
				$wtwhandlers->query("
					update ".wtw_tableprefix."thingmolds
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where thingid='".$zthingid."'
						and deleted=0;");
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where thingid='".$zthingid."'
						and deleted=0
						and not actionzonetype='loadzone';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."automations
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where thingid='".$zthingid."'
						and deleted=0;");
				$wtwhandlers->query("
					update ".wtw_tableprefix."things
					set updatedate=now(),
						updateuserid='".$wtwhandlers->userid."'
					where thingid='".$zthingid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwthings.php-clearThing=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function deleteThing($zthingid) {
		/* flag a 3D Thing as deleted */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->checkAdminAccess("", "", $zthingid)) {
				$zdeleteindex = 2;
				$zresults = $wtwhandlers->query("
					select max(deleted) as maxdeleted 
					from ".wtw_tableprefix."thingmolds 
					where thingid='".$zthingid."' limit 1;");
				foreach ($zresults as $zrow) {
					$zdeleteindex = $wtwhandlers->getNumber($zrow["maxdeleted"],2);
				}
				$zdeleteindex += 1;				
				$this->clearThing($zthingid);
				$wtwhandlers->query("
					update ".wtw_tableprefix."things
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where thingid='".$zthingid."'
						and deleted=0
						and not thingid='';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."userauthorizations
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where thingid='".$zthingid."'
						and deleted=0
						and not thingid='';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwthings.php-deleteThing=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function copyThing($zthingid, $zfromthingid) {
		/* create a copy of a 3D Thing as a new 3D Thing */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			set_time_limit(0);
			/* new thing has to already exist */
			/* does user have access to copy thing and new thing */
			if ($wtwhandlers->checkUpdateAccess("", "", $zthingid) && $wtwhandlers->checkUpdateAccess("", "", $zfromthingid)) {
				$zresults = $wtwhandlers->query("
					select t2.actionzoneid as pastactionzoneid,
						 t2.communityid,
						 t2.buildingid,
						 '".$zthingid."' as thingid,
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
						 t2.jsparameters
					from ".wtw_tableprefix."actionzones t2
					where t2.thingid='".$zfromthingid."'
						and t2.deleted=0;");
				foreach ($zresults as $zrow) {
					$zactionzoneid = $wtwhandlers->getRandomString(16,1);
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
							 '".$zrow["pastactionzoneid"]."',
							 '".$zrow["communityid"]."',
							 '".$zrow["buildingid"]."',
							 '".$zrow["thingid"]."',
							 '".$zrow["attachmoldid"]."',
							 '".$zrow["loadactionzoneid"]."',
							 '".$zrow["parentactionzoneid"]."',
							 '".$zrow["actionzonename"]."',
							 '".$zrow["actionzonetype"]."',
							 '".$zrow["actionzoneshape"]."',
							 '".$zrow["movementtype"]."',
							 ".$wtwhandlers->checkNumber($zrow["movementdistance"],0).",
							 ".$wtwhandlers->checkNumber($zrow["positionx"],0).",
							 ".$wtwhandlers->checkNumber($zrow["positiony"],0).",
							 ".$wtwhandlers->checkNumber($zrow["positionz"],0).",
							 ".$wtwhandlers->checkNumber($zrow["scalingx"],1).",
							 ".$wtwhandlers->checkNumber($zrow["scalingy"],1).",
							 ".$wtwhandlers->checkNumber($zrow["scalingz"],1).",
							 ".$wtwhandlers->checkNumber($zrow["rotationx"],0).",
							 ".$wtwhandlers->checkNumber($zrow["rotationy"],0).",
							 ".$wtwhandlers->checkNumber($zrow["rotationz"],0).",
							 ".$wtwhandlers->checkNumber($zrow["axispositionx"],0).",
							 ".$wtwhandlers->checkNumber($zrow["axispositiony"],0).",
							 ".$wtwhandlers->checkNumber($zrow["axispositionz"],0).",
							 ".$wtwhandlers->checkNumber($zrow["axisrotationx"],0).",
							 ".$wtwhandlers->checkNumber($zrow["axisrotationy"],0).",
							 ".$wtwhandlers->checkNumber($zrow["axisrotationz"],0).",
							 '".$zrow["rotateaxis"]."',
							 ".$wtwhandlers->checkNumber($zrow["rotatedegrees"],90).",
							 ".$wtwhandlers->checkNumber($zrow["rotatedirection"],1).",
							 ".$wtwhandlers->checkNumber($zrow["rotatespeed"],1).",
							 ".$wtwhandlers->checkNumber($zrow["value1"],0).",
							 ".$wtwhandlers->checkNumber($zrow["value2"],0).",
							 ".$wtwhandlers->checkNumber($zrow["defaulteditform"],0).",
							 '".$zrow["jsfunction"]."',
							 '".$zrow["jsparameters"]."',
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
							where thingid='".$zthingid."' and (not thingid='')) t3
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
						 '".$zthingid."' as webid,
						 t2.scriptname,
						 t2.scriptpath
					from ".wtw_tableprefix."scripts t2
					inner join (select actionzoneid, pastactionzoneid
							from ".wtw_tableprefix."actionzones 
							where thingid='".$zthingid."' and (not thingid='')) t3
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
						 t6.actionzoneid as altloadactionzoneid,
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
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where thingid='".$zthingid."' and (not thingid='')) t6
						on t6.pastactionzoneid=t2.altloadactionzoneid
					where t2.childwebid='".$zfromthingid."'
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
				/* update child connecting grids (3D Things placed in 3D Things) */
				$zresults = $wtwhandlers->query("
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
						 t6.actionzoneid as altloadactionzoneid,
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
					left join (select actionzoneid, pastactionzoneid 
							from ".wtw_tableprefix."actionzones 
							where thingid='".$zthingid."' and (not thingid='')) t6
						on t6.pastactionzoneid=t2.altloadactionzoneid
					where t2.parentwebid='".$zfromthingid."'
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
						 '".$zthingid."' as webid,
						 t2.webtype,
						 t2.rating,
						 t2.ratingvalue,
						 t2.contentwarning
					from ".wtw_tableprefix."contentratings t2
					where t2.webid='".$zfromthingid."'
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
						 '".$zthingid."' as webid,
						 'thing' as webtype,
						 t2.pluginname,
						 t2.optional
					from ".wtw_tableprefix."pluginsrequired t2
					where t2.webid='".$zfromthingid."'
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
				
				/* copy automations */
				$zresults = $wtwhandlers->query("
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
					$zautomationid = $wtwhandlers->getRandomString(16,1);
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
							 '".$zrow["pastautomationid"]."',
							 '".$zrow["automationname"]."',
							 '".$zrow["communityid"]."',
							 '".$zrow["buildingid"]."',
							 '".$zrow["thingid"]."',
							 '".$zrow["loadactionzoneid"]."',
							 '".$zrow["jsfunction"]."',
							 '".$zrow["jsparameters"]."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
				$zresults = $wtwhandlers->query("
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
					$zautomationstepid = $wtwhandlers->getRandomString(16,1);
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
						values
							('".$zautomationstepid."',
							 '".$zrow["pastautomationstepid"]."',
							 '".$zrow["automationid"]."',
							 ".$wtwhandlers->checkNumber($zrow["step"],1).",
							 '".$zrow["automationtype"]."',
							 '".$zrow["actionzoneid"]."',
							 ".$wtwhandlers->checkNumber($zrow["actionzonestatus"],0).",
							 '".$zrow["conditionoperator"]."',
							 '".$zrow["conditionstatus"]."',
							 '".$zrow["conditionvalue"]."',
							 '".$zrow["jsfunction"]."',
							 '".$zrow["jsparameters"]."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
				$zresults = $wtwhandlers->query("
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
						t5.actionzoneid as actionzoneid,
						t3.csgmoldid,
						t3.csgaction,
						t3.alttag,
						t3.jsfunction,
						t3.jsparameters
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
					$zthingmoldid = $wtwhandlers->getRandomString(16,1);
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."thingmolds
						   (thingmoldid,
							pastthingmoldid,
							loadactionzoneid,
							unloadactionzoneid,
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
						   ('".$zthingmoldid."',
							'".$zrow["pastthingmoldid"]."',
							'".$zrow["loadactionzoneid"]."',
							'".$zrow["unloadactionzoneid"]."',
							'".$zrow["thingid"]."',
							'".$zrow["shape"]."',
							'".$zrow["covering"]."',
							".$wtwhandlers->checkNumber($zrow["positionx"],0).",
							".$wtwhandlers->checkNumber($zrow["positiony"],0).",
							".$wtwhandlers->checkNumber($zrow["positionz"],0).",
							".$wtwhandlers->checkNumber($zrow["scalingx"],1).",
							".$wtwhandlers->checkNumber($zrow["scalingy"],1).",
							".$wtwhandlers->checkNumber($zrow["scalingz"],1).",
							".$wtwhandlers->checkNumber($zrow["rotationx"],0).",
							".$wtwhandlers->checkNumber($zrow["rotationy"],0).",
							".$wtwhandlers->checkNumber($zrow["rotationz"],0).",
							".$wtwhandlers->checkNumber($zrow["special1"],0).",
							".$wtwhandlers->checkNumber($zrow["special2"],0).",
							".$wtwhandlers->checkNumber($zrow["uoffset"],0).",
							".$wtwhandlers->checkNumber($zrow["voffset"],0).",
							".$wtwhandlers->checkNumber($zrow["uscale"],0).",
							".$wtwhandlers->checkNumber($zrow["vscale"],0).",
							'".$zrow["uploadobjectid"]."',
							".$wtwhandlers->checkNumber($zrow["graphiclevel"],0).",
							'".$zrow["textureid"]."',
							'".$zrow["texturebumpid"]."',
							'".$zrow["texturehoverid"]."',
							'".$zrow["videoid"]."',
							'".$zrow["videoposterid"]."',
							'".$zdiffusecolor."',
							'".$zspecularcolor."',
							'".$zemissivecolor."',
							'".$zambientcolor."',
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
							".$wtwhandlers->checkNumber($zrow["soundloop"],1).",
							".$wtwhandlers->checkNumber($zrow["soundmaxdistance"],100).",
							".$wtwhandlers->checkNumber($zrow["soundrollofffactor"],1).",
							".$wtwhandlers->checkNumber($zrow["soundrefdistance"],1).",
							".$wtwhandlers->checkNumber($zrow["soundconeinnerangle"],90).",
							".$wtwhandlers->checkNumber($zrow["soundconeouterangle"],180).",
							".$wtwhandlers->checkNumber($zrow["soundconeoutergain"],1).",
							'".$zrow["webtext"]."',
							'".$zrow["webstyle"]."',
							".$wtwhandlers->checkNumber($zrow["opacity"],100).",
							'".$zrow["sideorientation"]."',
							".$wtwhandlers->checkNumber($zrow["billboard"],0).",
							".$wtwhandlers->checkNumber($zrow["waterreflection"],0).",
							".$wtwhandlers->checkNumber($zrow["receiveshadows"],0).",
							".$wtwhandlers->checkNumber($zrow["subdivisions"],12).",
							".$wtwhandlers->checkNumber($zrow["minheight"],0).",
							".$wtwhandlers->checkNumber($zrow["maxheight"],30).",
							".$wtwhandlers->checkNumber($zrow["checkcollisions"],1).",
							".$wtwhandlers->checkNumber($zrow["ispickable"],1).",
							'".$zrow["actionzoneid"]."',
							'".$zrow["csgmoldid"]."',
							'".$zrow["csgaction"]."',
							'".$zrow["alttag"]."',
							'".$zrow["jsfunction"]."',
							'".$zrow["jsparameters"]."',
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');");
				}
				$zresults = $wtwhandlers->query("
					select t4.webimageid as pastwebimageid,
						 t6.thingmoldid as thingmoldid,
						 '' as buildingmoldid,
						 '' as communitymoldid,
						 t4.imageindex,
						 t4.imageid,
						 t4.imagehoverid,
						 t4.imageclickid,
						 t4.graphiclevel,
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
					$zwebimageid = $wtwhandlers->getRandomString(16,1);
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
							 graphiclevel,
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
							 ".$wtwhandlers->checkNumber($zrow["imageindex"],1).",
							 '".$zrow["imageid"]."',
							 '".$zrow["imagehoverid"]."',
							 '".$zrow["imageclickid"]."',
							 ".$wtwhandlers->checkNumber($zrow["graphiclevel"],0).",
							 '".$zrow["jsfunction"]."',
							 '".$zrow["jsparameters"]."',
							 '".$wtwhandlers->userid."',
							 '".$zrow["alttag"]."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
				$zresults = $wtwhandlers->query("
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
					$zmoldpointid = $wtwhandlers->getRandomString(16,1);
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
							 '".$zrow["moldid"]."',
							 ".$wtwhandlers->checkNumber($zrow["pathnumber"],1).",
							 ".$wtwhandlers->checkNumber($zrow["sorder"],0).",
							 ".$wtwhandlers->checkNumber($zrow["positionx"],0).",
							 ".$wtwhandlers->checkNumber($zrow["positiony"],0).",
							 ".$wtwhandlers->checkNumber($zrow["positionz"],0).",
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
				$wtwhandlers->query("
					update ".wtw_tableprefix."thingmolds
					set actionzoneid=''
					where actionzoneid is null 
						and thingid='".$zthingid."';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."thingmolds
					set loadactionzoneid=''
					where loadactionzoneid is null 
						and thingid='".$zthingid."';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."thingmolds
					set csgmoldid=''
					where csgmoldid is null 
						and thingid='".$zthingid."';");
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones
					set attachmoldid=''
					where attachmoldid is null 
						and thingid='".$zthingid."';");
				$wtwhandlers->query("
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
				$wtwhandlers->query("
					update ".wtw_tableprefix."actionzones t1
						inner join (select * 
							from ".wtw_tableprefix."thingmolds 
							where thingid='".$zthingid."' 
								and deleted=0) t2
						on t1.attachmoldid=t2.pastthingmoldid
					set t1.attachmoldid=t2.thingmoldid
					where t1.thingid='".$zthingid."'
						and not t1.attachmoldid='';");
				$wtwhandlers->query("
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
				$wtwhandlers->query("
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
			$wtwhandlers->serror("core-functions-class_wtwthings.php-copyThing=".$e->getMessage());
		}
		return $zsuccess;
	}
	
}

	function wtwthings() {
		return wtwthings::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwthings'] = wtwthings();
?>
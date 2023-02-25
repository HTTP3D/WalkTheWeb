<?php
class wtwconnectinggrids {
	/* wtwconnectinggrids class for admin database functions for connecting grids */
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

	public function saveConnectingGrid($zconnectinggridid, $zparentserverfranchiseid, $zparentwebid, $zparentwebtype, $zchildserverfranchiseid, $zchildwebid, $zchildwebtype, $zloadactionzoneid, $zaltloadactionzoneid, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zalttag) {
		global $wtwhandlers;
		try {
			$access = false;
			switch ($zparentwebtype) {
				case "community":
					$access = $wtwhandlers->checkAdminAccess($zparentwebid, "", "");
					break;
				case "building":
					$access = $wtwhandlers->checkAdminAccess("", $zparentwebid, "");
					break;
				case "thing":
					$access = $wtwhandlers->checkAdminAccess("", "", $zparentwebid);
					break;
			}
			if ($access) {
				$zfoundconnectinggridid = "";
				$zresults = $wtwhandlers->query("
					select connectinggridid 
					from ".wtw_tableprefix."connectinggrids 
					where connectinggridid='".$zconnectinggridid."';");
				foreach ($zresults as $zrow) {
					$zfoundconnectinggridid = $zrow["connectinggridid"];
				}
				if ($wtwhandlers->hasValue($zfoundconnectinggridid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."connectinggrids
						set positionx=".$wtwhandlers->checkNumber($zpositionx,0).",
							positiony=".$wtwhandlers->checkNumber($zpositiony,0).",
							positionz=".$wtwhandlers->checkNumber($zpositionz,0).",
							scalingx=".$wtwhandlers->checkNumber($zscalingx,1).",
							scalingy=".$wtwhandlers->checkNumber($zscalingy,1).",
							scalingz=".$wtwhandlers->checkNumber($zscalingz,1).",
							rotationx=".$wtwhandlers->checkNumber($zrotationx,0).",
							rotationy=".$wtwhandlers->checkNumber($zrotationy,0).",
							rotationz=".$wtwhandlers->checkNumber($zrotationz,0).",
							altloadactionzoneid='".$zaltloadactionzoneid."',
							alttag='".$wtwhandlers->escapeHTML($zalttag)."',
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where connectinggridid='".$zfoundconnectinggridid."';");
				} else if ($wtwhandlers->hasValue($zchildwebtype)) {
					$zconnectinggridid = $wtwhandlers->checkIDFormat($zconnectinggridid);
					if (!isset($zconnectinggridid) || empty($zconnectinggridid)) {
						$zconnectinggridid = $wtwhandlers->getRandomString(16,1);
					}
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."connectinggrids
							(connectinggridid,
							 parentserverfranchiseid,
							 parentwebid,
							 parentwebtype,
							 childserverfranchiseid,
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
							 altloadactionzoneid,
							 alttag,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zconnectinggridid."',
							 '".$zparentserverfranchiseid."',
							 '".$zparentwebid."',
							 '".$zparentwebtype."',
							 '".$zchildserverfranchiseid."',
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
							 '".$zaltloadactionzoneid."',
							 '".$wtwhandlers->escapeHTML($zalttag)."',
							 now(),
							 '".$wtwhandlers->userid."',
							 now(),
							 '".$wtwhandlers->userid."');");
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-saveConnectingGrid=".$e->getMessage());
		}
		return $zconnectinggridid;
	}
	
	public function deleteConnectingGrid($zconnectinggridid) {
		global $wtwhandlers;
		$zsuccess = false;
		try {
			$zparentwebid = "";
			$zparentwebtype = "";
			$zresults = $wtwhandlers->query("
				select parentwebid, parentwebtype 
				from ".wtw_tableprefix."connectinggrids 
				where connectinggridid='".$zconnectinggridid."';");
			foreach ($zresults as $zrow) {
				$zparentwebid = $zrow["parentwebid"];
				$zparentwebtype = $zrow["parentwebtype"];
			}
			$access = false;
			switch ($zparentwebtype) {
				case "community":
					$access = $wtwhandlers->checkAdminAccess($zparentwebid, "", "");
					break;
				case "building":
					$access = $wtwhandlers->checkAdminAccess("", $zparentwebid, "");
					break;
				case "thing":
					$access = $wtwhandlers->checkAdminAccess("", "", $zparentwebid);
					break;
			}
			if ($access) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."connectinggrids
					set deleted=1,
						deleteddate=now(),
						deleteduserid='".$wtwhandlers->userid."'
					where connectinggridid='".$zconnectinggridid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-deleteConnectingGrid=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function importConnectingGrids($ztype, $zwebtype, $zwebid, $zconnectinggridsbulk) {
		global $wtwhandlers;
		$zsuccess = false;
		try {
			/* ini_set('max_execution_time', 300); */
			if (!empty($wtwhandlers->getSessionUserID())) {
				$zconnectinggridsbulk = $wtwhandlers->decode64($zconnectinggridsbulk);
				if (!empty($zconnectinggridsbulk)) {
					$zconnectinggrids = json_decode($zconnectinggridsbulk);
					$zrecordeach = 50 / count($zconnectinggrids);
					$i = 50;
					foreach ($zconnectinggrids as $zrow) {
						$zconnectinggridid = $wtwhandlers->getRandomString(16,1);
						if ($ztype == 'parent') {
							$wtwhandlers->query("
								insert into ".wtw_tableprefix."connectinggrids
									(connectinggridid, 
									 pastconnectinggridid, 
									 parentserverfranchiseid, 
									 parentwebid, 
									 parentwebtype, 
									 childserverfranchiseid, 
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
									 altloadactionzoneid, 
									 unloadactionzoneid, 
									 attachactionzoneid, 
									 alttag, 
									 createdate,
									 createuserid,
									 updatedate,
									 updateuserid)
								values
									('".$zconnectinggridid."', 
									 '".$zrow->connectinggridid."', 
									 '".$zrow->parentserverfranchiseid."', 
									 '".$zrow->parentwebid."', 
									 '".$zrow->parentwebtype."', 
									 '".$zrow->childserverfranchiseid."', 
									 '".$zwebid."', 
									 '".$zrow->childwebtype."', 
									 ".$wtwhandlers->checkNumber($zrow->positionx,0).", 
									 ".$wtwhandlers->checkNumber($zrow->positiony,0).", 
									 ".$wtwhandlers->checkNumber($zrow->positionz,0).", 
									 ".$wtwhandlers->checkNumber($zrow->scalingx,1).", 
									 ".$wtwhandlers->checkNumber($zrow->scalingy,1).", 
									 ".$wtwhandlers->checkNumber($zrow->scalingz,1).", 
									 ".$wtwhandlers->checkNumber($zrow->rotationx,0).", 
									 ".$wtwhandlers->checkNumber($zrow->rotationy,0).", 
									 ".$wtwhandlers->checkNumber($zrow->rotationz,0).", 
									 '".$zrow->loadactionzoneid."', 
									 '".$zrow->altloadactionzoneid."', 
									 '".$zrow->unloadactionzoneid."', 
									 '".$zrow->attachactionzoneid."', 
									 '".$zrow->alttag."', 
									 now(),
									 '".$wtwhandlers->userid."',
									 now(),
									 '".$wtwhandlers->userid."');");
						} else if ($ztype == 'child' && $zwebtype == "community") {
							$wtwhandlers->query("
								insert into ".wtw_tableprefix."connectinggrids
									(connectinggridid, 
									 pastconnectinggridid, 
									 parentserverfranchiseid, 
									 parentwebid, 
									 parentwebtype, 
									 childserverfranchiseid, 
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
									 altloadactionzoneid, 
									 unloadactionzoneid, 
									 attachactionzoneid, 
									 alttag, 
									 createdate,
									 createuserid,
									 updatedate,
									 updateuserid)
								values
									('".$zconnectinggridid."', 
									 '".$zrow->connectinggridid."', 
									 '".$zrow->parentserverfranchiseid."', 
									 '".$zwebid."', 
									 '".$zrow->parentwebtype."', 
									 '',
									 '',
									 '".$zrow->childwebtype."', 
									 ".$wtwhandlers->checkNumber($zrow->positionx,0).", 
									 ".$wtwhandlers->checkNumber($zrow->positiony,0).", 
									 ".$wtwhandlers->checkNumber($zrow->positionz,0).", 
									 ".$wtwhandlers->checkNumber($zrow->scalingx,1).", 
									 ".$wtwhandlers->checkNumber($zrow->scalingy,1).", 
									 ".$wtwhandlers->checkNumber($zrow->scalingz,1).", 
									 ".$wtwhandlers->checkNumber($zrow->rotationx,0).", 
									 ".$wtwhandlers->checkNumber($zrow->rotationy,0).", 
									 ".$wtwhandlers->checkNumber($zrow->rotationz,0).", 
									 '".$zrow->loadactionzoneid."', 
									 '".$zrow->altloadactionzoneid."', 
									 '".$zrow->unloadactionzoneid."', 
									 '".$zrow->attachactionzoneid."', 
									 '".$zrow->alttag."', 
									 now(),
									 '".$wtwhandlers->userid."',
									 now(),
									 '".$wtwhandlers->userid."');");
						} else if ($ztype == 'child' && $zwebtype == "building") {
						}
						$i += $zrecordeach;
					}
					/* update foreign keys to new actionzoneids */
					if ($ztype == 'parent') {
						$wtwhandlers->query("
							update ".wtw_tableprefix."connectinggrids t1
								inner join (select * 
									from ".wtw_tableprefix."actionzones 
									where ".$zwebtype."id='".$zwebid."'
										and (not ".$zwebtype."id='') and deleted=0) t2
								on t1.loadactionzoneid=t2.pastactionzoneid
							set t1.loadactionzoneid=t2.actionzoneid
							where t1.childwebid='".$zwebid."'
								and t1.parentwebid=''
								and (not t1.loadactionzoneid='');");
						$wtwhandlers->query("
							update ".wtw_tableprefix."connectinggrids t1
								inner join (select * 
									from ".wtw_tableprefix."actionzones 
									where ".$zwebtype."id='".$zwebid."'
										and (not ".$zwebtype."id='') and deleted=0) t2
								on t1.unloadactionzoneid=t2.pastactionzoneid
							set t1.unloadactionzoneid=t2.actionzoneid
							where t1.childwebid='".$zwebid."'
								and t1.parentwebid=''
								and (not t1.unloadactionzoneid='');"); 
						$wtwhandlers->query("
							update ".wtw_tableprefix."connectinggrids t1
								inner join (select * 
									from ".wtw_tableprefix."actionzones 
									where ".$zwebtype."id='".$zwebid."'
										and (not ".$zwebtype."id='') and deleted=0) t2
								on t1.attachactionzoneid=t2.pastactionzoneid
							set t1.attachactionzoneid=t2.actionzoneid
							where t1.parentwebid='".$zwebid."'
								and (not t1.attachactionzoneid='');");
					} else {
						$wtwhandlers->query("
							update ".wtw_tableprefix."connectinggrids t1
								inner join (select * 
									from ".wtw_tableprefix."actionzones 
									where ".$zwebtype."id='".$zwebid."'
										and (not ".$zwebtype."id='') and deleted=0) t2
								on t1.loadactionzoneid=t2.pastactionzoneid
							set t1.loadactionzoneid=t2.actionzoneid
							where t1.parentwebid='".$zwebid."'
								and t1.childwebid=''
								and (not t1.loadactionzoneid='');");
						$wtwhandlers->query("
							update ".wtw_tableprefix."connectinggrids t1
								inner join (select * 
									from ".wtw_tableprefix."actionzones 
									where ".$zwebtype."id='".$zwebid."'
										and (not ".$zwebtype."id='') and deleted=0) t2
								on t1.unloadactionzoneid=t2.pastactionzoneid
							set t1.unloadactionzoneid=t2.actionzoneid
							where t1.parentwebid='".$zwebid."'
								and t1.childwebid=''
								and (not t1.unloadactionzoneid='');"); 
						$wtwhandlers->query("
							update ".wtw_tableprefix."connectinggrids t1
								inner join (select * 
									from ".wtw_tableprefix."actionzones 
									where ".$zwebtype."id='".$zwebid."'
										and (not ".$zwebtype."id='') and deleted=0) t2
								on t1.attachactionzoneid=t2.pastactionzoneid
							set t1.attachactionzoneid=t2.actionzoneid
							where t1.parentwebid='".$zwebid."'
								and (not t1.attachactionzoneid='');");
					}
					$zsuccess = true;
				}				
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-importConnectingGrids=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function updateChildConnectingGrid($zwebtype, $zwebid) {
		global $wtwhandlers;
		$zsuccess = false;
		try {
			/* ini_set('max_execution_time', 300); */
			if (!empty($wtwhandlers->getSessionUserID())) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."connectinggrids
					set childwebid='".$zwebid."'
					where childwebid=''
						and childwebtype='building'
					limit 1;");
				$wtwhandlers->query("
					update wtw_connectinggrids t1
						inner join (select * 
							from wtw_connectinggrids
							where childwebid='".$zwebid."'
								and parentwebid=''
								and deleted=0) t2
						on t1.childwebid=t2.childwebid
					set t1.loadactionzoneid=t2.loadactionzoneid
					where t1.childwebid='".$zwebid."'
						and (not t1.parentwebtype='')
						and t1.deleted=0
						and not t2.loadactionzoneid='';");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunities.php-updateChildConnectingGrid=".$e->getMessage());
		}
		return $zsuccess;
	}
}

	function wtwconnectinggrids() {
		return wtwconnectinggrids::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwconnectinggrids'] = wtwconnectinggrids();
?>
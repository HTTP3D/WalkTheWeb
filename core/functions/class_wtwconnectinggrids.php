<?php
class wtwconnectinggrids {
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

	public function saveConnectingGrid($zconnectinggridid, $zparentwebid, $zparentwebtype, $zchildwebid, $zchildwebtype, $zloadactionzoneid, $zaltloadactionzoneid, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zalttag) {
		global $wtwiframes;
		try {
			$access = false;
			switch ($zparentwebtype) {
				case "community":
					$access = $wtwiframes->checkAdminAccess($zparentwebid, "", "");
					break;
				case "building":
					$access = $wtwiframes->checkAdminAccess("", $zparentwebid, "");
					break;
				case "thing":
					$access = $wtwiframes->checkAdminAccess("", "", $zparentwebid);
					break;
			}
			if ($access) {
				$zfoundconnectinggridid = "";
				$zresults = $wtwiframes->query("
					select connectinggridid 
					from ".wtw_tableprefix."connectinggrids 
					where connectinggridid='".$zconnectinggridid."';");
				foreach ($zresults as $zrow) {
					$zfoundconnectinggridid = $zrow["connectinggridid"];
				}
				if (!empty($zfoundconnectinggridid) && isset($zfoundconnectinggridid)) {
					$wtwiframes->query("
						update ".wtw_tableprefix."connectinggrids
						set positionx=".$wtwiframes->checkNumber($zpositionx,0).",
							positiony=".$wtwiframes->checkNumber($zpositiony,0).",
							positionz=".$wtwiframes->checkNumber($zpositionz,0).",
							scalingx=".$wtwiframes->checkNumber($zscalingx,1).",
							scalingy=".$wtwiframes->checkNumber($zscalingy,1).",
							scalingz=".$wtwiframes->checkNumber($zscalingz,1).",
							rotationx=".$wtwiframes->checkNumber($zrotationx,0).",
							rotationy=".$wtwiframes->checkNumber($zrotationy,0).",
							rotationz=".$wtwiframes->checkNumber($zrotationz,0).",
							altloadactionzoneid='".$zaltloadactionzoneid."',
							alttag='".$wtwiframes->escapeHTML($zalttag)."',
							updatedate=now(),
							updateuserid='".$wtwiframes->userid."'
						where connectinggridid='".$zfoundconnectinggridid."';");
				} else if (!empty($zchildwebtype) && isset($zchildwebtype)) {
					$zconnectinggridid = $wtwiframes->checkIDFormat($zconnectinggridid);
					if (empty($zconnectinggridid) || !isset($zconnectinggridid)) {
						$zconnectinggridid = $wtwiframes->getRandomString(16,1);
					}
					$wtwiframes->query("
						insert into ".wtw_tableprefix."connectinggrids
							(connectinggridid,
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
							 altloadactionzoneid,
							 alttag,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zconnectinggridid."',
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
							 '".$zaltloadactionzoneid."',
							 '".$wtwiframes->escapeHTML($zalttag)."',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}
				/* NEED TO CHECK CONNECTING GRID ACTION ZONE (LOAD ZONE) checkconnectinggridactionzone */
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwcommunities.php-saveConnectingGrid=".$e->getMessage());
		}
		return $zconnectinggridid;
	}
	
	public function deleteConnectingGrid($zconnectinggridid) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			$zparentwebid = "";
			$zparentwebtype = "";
			$zresults = $wtwiframes->query("
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
					$access = $wtwiframes->checkAdminAccess($zparentwebid, "", "");
					break;
				case "building":
					$access = $wtwiframes->checkAdminAccess("", $zparentwebid, "");
					break;
				case "thing":
					$access = $wtwiframes->checkAdminAccess("", "", $zparentwebid);
					break;
			}
			if ($access) {
				$wtwiframes->query("
					update ".wtw_tableprefix."connectinggrids
					set deleted=1,
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where connectinggridid='".$zconnectinggridid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwcommunities.php-deleteConnectingGrid=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function importConnectingGrids($ztype, $zmoldgroup, $zwebid, $zconnectinggridsbulk) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			/* ini_set('max_execution_time', 300); */
			if (!empty($wtwiframes->getSessionUserID())) {
				if (!empty($zconnectinggridsbulk)) {
					$zconnectinggridsbulk = base64_decode($zconnectinggridsbulk);
					$zconnectinggrids = json_decode($zconnectinggridsbulk);
					$zrecordeach = 50 / count($zconnectinggrids);
					$i = 50;
					foreach ($zconnectinggrids as $zrow) {
						$zconnectinggridid = $wtwiframes->getRandomString(16,1);
						if ($ztype == 'parent') {
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
									 '".$zrow->parentwebid."', 
									 '".$zrow->parentwebtype."', 
									 '".$zwebid."', 
									 '".$zrow->childwebtype."', 
									 ".$wtwiframes->checkNumber($zrow->positionx,0).", 
									 ".$wtwiframes->checkNumber($zrow->positiony,0).", 
									 ".$wtwiframes->checkNumber($zrow->positionz,0).", 
									 ".$wtwiframes->checkNumber($zrow->scalingx,1).", 
									 ".$wtwiframes->checkNumber($zrow->scalingy,1).", 
									 ".$wtwiframes->checkNumber($zrow->scalingz,1).", 
									 ".$wtwiframes->checkNumber($zrow->rotationx,0).", 
									 ".$wtwiframes->checkNumber($zrow->rotationy,0).", 
									 ".$wtwiframes->checkNumber($zrow->rotationz,0).", 
									 '".$zrow->loadactionzoneid."', 
									 '".$zrow->altloadactionzoneid."', 
									 '".$zrow->unloadactionzoneid."', 
									 '".$zrow->attachactionzoneid."', 
									 '".$zrow->alttag."', 
									 now(),
									 '".$wtwiframes->userid."',
									 now(),
									 '".$wtwiframes->userid."');");
						} else if ($ztype == 'child' && $zmoldgroup == "community") {
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
									 '".$zwebid."', 
									 '".$zrow->parentwebtype."', 
									 '',
									 '".$zrow->childwebtype."', 
									 ".$wtwiframes->checkNumber($zrow->positionx,0).", 
									 ".$wtwiframes->checkNumber($zrow->positiony,0).", 
									 ".$wtwiframes->checkNumber($zrow->positionz,0).", 
									 ".$wtwiframes->checkNumber($zrow->scalingx,1).", 
									 ".$wtwiframes->checkNumber($zrow->scalingy,1).", 
									 ".$wtwiframes->checkNumber($zrow->scalingz,1).", 
									 ".$wtwiframes->checkNumber($zrow->rotationx,0).", 
									 ".$wtwiframes->checkNumber($zrow->rotationy,0).", 
									 ".$wtwiframes->checkNumber($zrow->rotationz,0).", 
									 '".$zrow->loadactionzoneid."', 
									 '".$zrow->altloadactionzoneid."', 
									 '".$zrow->unloadactionzoneid."', 
									 '".$zrow->attachactionzoneid."', 
									 '".$zrow->alttag."', 
									 now(),
									 '".$wtwiframes->userid."',
									 now(),
									 '".$wtwiframes->userid."');");
						} else if ($ztype == 'child' && $zmoldgroup == "building") {
						}
						$i += $zrecordeach;
						echo "<script>parent.WTW.updateProgressBar(".$i.",100);</script>";
					}
					/* update foreign keys to new actionzoneids */
					if ($ztype == 'parent') {
						$wtwiframes->query("
							update ".wtw_tableprefix."connectinggrids t1
								inner join (select * 
									from ".wtw_tableprefix."actionzones 
									where ".$zmoldgroup."id='".$zwebid."'
										and (not ".$zmoldgroup."id='') and deleted=0) t2
								on t1.loadactionzoneid=t2.pastactionzoneid
							set t1.loadactionzoneid=t2.actionzoneid
							where t1.childwebid='".$zwebid."'
								and t1.parentwebid=''
								and (not t1.loadactionzoneid='');");
						$wtwiframes->query("
							update ".wtw_tableprefix."connectinggrids t1
								inner join (select * 
									from ".wtw_tableprefix."actionzones 
									where ".$zmoldgroup."id='".$zwebid."'
										and (not ".$zmoldgroup."id='') and deleted=0) t2
								on t1.unloadactionzoneid=t2.pastactionzoneid
							set t1.unloadactionzoneid=t2.actionzoneid
							where t1.childwebid='".$zwebid."'
								and t1.parentwebid=''
								and (not t1.unloadactionzoneid='');"); 
						$wtwiframes->query("
							update ".wtw_tableprefix."connectinggrids t1
								inner join (select * 
									from ".wtw_tableprefix."actionzones 
									where ".$zmoldgroup."id='".$zwebid."'
										and (not ".$zmoldgroup."id='') and deleted=0) t2
								on t1.attachactionzoneid=t2.pastactionzoneid
							set t1.attachactionzoneid=t2.actionzoneid
							where t1.parentwebid='".$zwebid."'
								and (not t1.attachactionzoneid='');");
					} else {
						$wtwiframes->query("
							update ".wtw_tableprefix."connectinggrids t1
								inner join (select * 
									from ".wtw_tableprefix."actionzones 
									where ".$zmoldgroup."id='".$zwebid."'
										and (not ".$zmoldgroup."id='') and deleted=0) t2
								on t1.loadactionzoneid=t2.pastactionzoneid
							set t1.loadactionzoneid=t2.actionzoneid
							where t1.parentwebid='".$zwebid."'
								and t1.childwebid=''
								and (not t1.loadactionzoneid='');");
						$wtwiframes->query("
							update ".wtw_tableprefix."connectinggrids t1
								inner join (select * 
									from ".wtw_tableprefix."actionzones 
									where ".$zmoldgroup."id='".$zwebid."'
										and (not ".$zmoldgroup."id='') and deleted=0) t2
								on t1.unloadactionzoneid=t2.pastactionzoneid
							set t1.unloadactionzoneid=t2.actionzoneid
							where t1.parentwebid='".$zwebid."'
								and t1.childwebid=''
								and (not t1.unloadactionzoneid='');"); 
						$wtwiframes->query("
							update ".wtw_tableprefix."connectinggrids t1
								inner join (select * 
									from ".wtw_tableprefix."actionzones 
									where ".$zmoldgroup."id='".$zwebid."'
										and (not ".$zmoldgroup."id='') and deleted=0) t2
								on t1.attachactionzoneid=t2.pastactionzoneid
							set t1.attachactionzoneid=t2.actionzoneid
							where t1.parentwebid='".$zwebid."'
								and (not t1.attachactionzoneid='');");
					}
					$zsuccess = true;
				}				
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwcommunities.php-importConnectingGrids=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function updateChildConnectingGrid($zmoldgroup, $zwebid) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			/* ini_set('max_execution_time', 300); */
			if (!empty($wtwiframes->getSessionUserID())) {
				$wtwiframes->query("
					update ".wtw_tableprefix."connectinggrids
					set childwebid='".$zwebid."'
					where childwebid=''
						and childwebtype='building'
					limit 1;");
				$wtwiframes->query("
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
			$wtwiframes->serror("core-functions-class_wtwcommunities.php-updateChildConnectingGrid=".$e->getMessage());
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
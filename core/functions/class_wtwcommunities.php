<?php
class wtwcommunities {
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
	
	public function communityExist($zcommunityid) {
		global $wtwiframes;
		$found = false;
		try {
			$zresults = array();
			$zresults = $wtwiframes->query("
				select communityid 
				from ".wtw_tableprefix."communities 
				where communityid='".$zcommunityid."' limit 1");
			foreach ($zresults as $zrow) {
				$found = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwcommunities.php-communityExist=".$e->getMessage());
		}
		return $found;
	}

	public function saveCommunity($zcommunityid, $zpastcommunityid, $zcommunityname, $zanalyticsid, $zgroundpositiony, $zwaterpositiony, $zalttag) {
		$copycommunityid = "";
		$newcommunityid = "";
		try {
			if (empty($zpastcommunityid) || !isset($zpastcommunityid) || $wtwiframes->checkUpdateAccess($zpastcommunityid, "", "") == false) {
				/* denies copy function if you do not have access to community to copy */
				$zpastcommunityid = "";
			}
			$zresults = array();
			if ($zcommunityid == "") {
				/* create new communityid */
				$zcommunityid = $wtwiframes->getRandomString(16,1);
				if (empty($zpastcommunityid) || !isset($zpastcommunityid)) {
					/* create new community (without access to copy community or if not copying existing community, this creates new community) */
					$wtwiframes->query("
						insert into ".wtw_tableprefix."communities
							(communityid,
							 pastcommunityid,
							 communityname,
							 analyticsid,
							 userid,
							 groundpositiony,
							 waterpositiony,
							 alttag,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zcommunityid."',
							 '".$zpastcommunityid."',
							 '".$wtwiframes->escapeHTML($zcommunityname)."',
							 '".$zanalyticsid."',
							 '".$wtwiframes->userid."',
							 ".$wtwiframes->checkNumber($zgroundpositiony,0).",
							 ".$wtwiframes->checkNumber($zwaterpositiony,-1).",
							 '".$wtwiframes->escapeHTML($zalttag)."',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				} else {
					/* with access to copy building, this gets all values */
					$wtwiframes->query("
						insert into ".wtw_tableprefix."communities
							(communityid,
							 pastcommunityid,
							 communityname,
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
							 groundpositiony,
							 waterpositiony,
							 gravity,
							 textureid,
							 skydomeid,
							 alttag,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						select '".$zcommunityid."' as communityid,
							 '".$zpastcommunityid."' as pastcommunityid,
							 '".$wtwiframes->escapeHTML($zcommunityname)."' as communityname,
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
							 groundpositiony,
							 waterpositiony,
							 gravity,
							 textureid,
							 skydomeid,
							 alttag,
							 now() as createdate,
							 '".$wtwiframes->userid."' as createuserid,
							 now() as updatedate,
							 '".$wtwiframes->userid."' as updateuserid
						from ".wtw_tableprefix."communities
						where communityid='".$zpastcommunityid."';");
				}
				/* give user Admin access to their new community */ 
				$zuserauthorizationid = $wtwiframes->getRandomString(16,1);
				$wtwiframes->query("
					insert into ".wtw_tableprefix."userauthorizations
						(userauthorizationid,
						 userid,
						 communityid,
						 useraccess,
						 createdate,
						 createuserid,
						 updatedate,
						 updateuserid)
					values
						('".$zuserauthorizationid."',
						 '".$wtwiframes->userid."',
						 '".$zcommunityid."',
						 'admin',
						 now(),
						 '".$wtwiframes->userid."',
						 now(),
						 '".$wtwiframes->userid."');");
			} else if ($wtwiframes->checkUpdateAccess($zcommunityid, "", "")) {
				/* only updates if you have access */
				$wtwiframes->query("
					update ".wtw_tableprefix."communities
					set 
						communityname='".$wtwiframes->escapeHTML($zcommunityname)."',
						analyticsid='".$zanalyticsid."',
						groundpositiony=".$wtwiframes->checkNumber($zgroundpositiony,0).",
						waterpositiony=".$wtwiframes->checkNumber($zwaterpositiony,-1).",
						alttag='".$wtwiframes->escapeHTML($zalttag)."',
						updatedate=now(),
						updateuserid='".$wtwiframes->userid."'
					where communityid='".$zcommunityid."';");
			}				
		} catch (Exception $e) {
			serror("core-functions-class_wtwcommunities.php-saveCommunity=".$e->getMessage());
		}
		if (!empty($zpastcommunityid) && isset($zpastcommunityid) && !empty($newcommunityid) && isset($newcommunityid)) {
			$copycommunityid = $this->copyCommunity($newcommunityid, $zpastcommunityid);
		}
		if (empty($copycommunityid) || !isset($copycommunityid)) {
			$copycommunityid = $newcommunityid;
		}
		return $copycommunityid;
	}

	public function saveCommunityStartPosition($zcommunityid, $zstartpositionx, $zstartpositiony, $zstartpositionz, $zstartscalingx, $zstartscalingy, $zstartscalingz, $zstartrotationx, $zstartrotationy, $zstartrotationz) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->checkUpdateAccess($zcommunityid, "", "")) {
				$wtwiframes->query("
					update ".wtw_tableprefix."communities
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
					where communityid='".$zcommunityid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwcommunities.php-saveCommunityStartPosition=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function saveCommunityGravity($zcommunityid, $zgravity) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->checkUpdateAccess($zcommunityid, "", "")) {
				$wtwiframes->query("
					update ".wtw_tableprefix."communities
					set gravity=".$zgravity.",
						updatedate=now(),
						updateuserid='".$wtwiframes->userid."'
					where communityid='".$zcommunityid."';");
			}
			$zsuccess = true;
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwcommunities.php-saveCommunityGravity=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function deleteCommunity($zcommunityid) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->checkAdminAccess($zcommunityid, "", "")) {
				$zdeleteindex = 2;
				$zresults = $wtwiframes->query("
					select max(deleted) as maxdeleted 
					from ".wtw_tableprefix."communitymolds 
					where communityid='".$zcommunityid."' limit 1;");
				foreach ($zresults as $zrow) {
					$zdeleteindex = $wtwiframes->getNumber($zrow["maxdeleted"],2);
				}
				$zdeleteindex += 1;
				$wtwiframes->query("
					update ".wtw_tableprefix."webimages w1 
						inner join ".wtw_tableprefix."communitymolds cm1
							on w1.communitymoldid = cm1.communitymoldid
					set w1.deleted=".$zdeleteindex.",
						w1.deleteddate=now(),
						w1.deleteduserid='".$wtwiframes->userid."'
					where cm1.communityid='".$zcommunityid."'
						and not cm1.communityid=''
						and not w1.communitymoldid=''
						and w1.deleted=0;");
				$wtwiframes->query("
					update ".wtw_tableprefix."communitiesbuildings
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where communityid='".$zcommunityid."'
						and not communityid='';");
				$wtwiframes->query("
					update ".wtw_tableprefix."communitymolds
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where communityid='".$zcommunityid."';");
				$wtwiframes->query("
					update ".wtw_tableprefix."actionzones
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where communityid='".$zcommunityid."'
						and not communityid='';");
				$wtwiframes->query("
					update ".wtw_tableprefix."automations
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where communityid='".$zcommunityid."'
						and deleted=0
						and not communityid='';");
				$wtwiframes->query("
					update ".wtw_tableprefix."automations t1 
						inner join ".wtw_tableprefix."automationsteps t2
							on t1.automationid=t2.automationid 
					set t2.deleted=".$zdeleteindex.",
						t2.deleteddate=now(),
						t2.deleteduserid='".$wtwiframes->userid."'
					where t1.communityid='".$zcommunityid."'
						and t2.deleted=0
						and not t1.communityid='';");
				$wtwiframes->query("
					update ".wtw_tableprefix."communities
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where communityid='".$zcommunityid."'
						and not communityid='';");
				$wtwiframes->query("
					update ".wtw_tableprefix."webaliases
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where communityid='".$zcommunityid."'
						and not communityid='';");
				$wtwiframes->query("
					update ".wtw_tableprefix."userauthorizations
					set deleted=".$zdeleteindex.",
						deleteddate=now(),
						deleteduserid='".$wtwiframes->userid."'
					where communityid='".$zcommunityid."'
						and not communityid='';");
				$zsuccess = true;
			}

		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwcommunities.php-deleteCommunity=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function saveCommunityGround($zcommunityid, $ztextureid) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->checkUpdateAccess($zcommunityid, "", "")) {
				$wtwiframes->query("
					update ".wtw_tableprefix."communities
					set textureid='".$ztextureid."'
					where communityid='".$zcommunityid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwcommunities.php-saveCommunityGround=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function saveCommunitySky($zcommunityid, $zskydomeid, $zskyinclination, $zskyluminance, $zskyazimuth, $zskyrayleigh, $zskyturbidity, $zskymiedirectionalg, $zskymiecoefficient) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->checkUpdateAccess($zcommunityid, "", "")) {
				$wtwiframes->query("
					update ".wtw_tableprefix."communities
					set skydomeid='".$zskydomeid."',
						skyinclination=".$wtwiframes->checkNumber($zskyinclination,0).",
						skyluminance=".$wtwiframes->checkNumber($zskyluminance,1).",
						skyazimuth=".$wtwiframes->checkNumber($zskyazimuth,.25).",
						skyrayleigh=".$wtwiframes->checkNumber($zskyrayleigh,2).",
						skyturbidity=".$wtwiframes->checkNumber($zskyturbidity,10).",
						skymiedirectionalg=".$wtwiframes->checkNumber($zskymiedirectionalg,.8).",
						skymiecoefficient=".$wtwiframes->checkNumber($zskymiecoefficient,.008).",
						updatedate=now(),
						updateuserid='".$wtwiframes->userid."'
					where communityid='".$zcommunityid."';");
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwcommunities.php-saveCommunitySky=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function copyCommunity($zcommunityid, $zcopycommunityid) {
		global $wtwiframes;
		try {
			if ($wtwiframes->checkUpdateAccess($zcommunityid, "", "") && $wtwiframes->checkUpdateAccess($zcopycommunityid, "", "")) {
				$zskyinclination = 0;
				$zskyluminance = 0;
				$zskyazimuth = 0;
				$zskyrayleigh = 0;
				$zskyturbidity = 0;
				$zskymiedirectionalg = 0;
				$zskymiecoefficient = 0;
				$zresults = $wtwiframes->query("
					select * 
					from ".wtw_tableprefix."communities 
					where communityid='".$zfromcommunityid."' 
					limit 1;");
				foreach ($zresults as $zrow) {
					$zskyinclination = $zrow["skyinclination"];
					$zskyluminance = $zrow["skyluminance"];
					$zskyazimuth = $zrow["skyazimuth"];
					$zskyrayleigh = $zrow["skyrayleigh"];
					$zskyturbidity = $zrow["skyturbidity"];
					$zskymiedirectionalg = $zrow["skymiedirectionalg"];
					$zskymiecoefficient = $zrow["skymiecoefficient"];
				}
				$wtwiframes->query("
					update ".wtw_tableprefix."communities 
					set skyinclination=".$zskyinclination.",
						skyluminance=".$zskyluminance.",
						skyazimuth=".$zskyazimuth.",
						skyrayleigh=".$zskyrayleigh.",
						skyturbidity=".$zskyturbidity.",
						skymiedirectionalg=".$zskymiedirectionalg.",
						skymiecoefficient=".$zskymiecoefficient."
					where communityid='".$zcommunityid."';");
				$zresults = $wtwiframes->query("
					select t2.actionzoneid as pastactionzoneid,
						 '".$zcommunityid."' as communityid,
						 t2.buildingid,
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
						 t2.jsparameters
					from ".wtw_tableprefix."actionzones t2
					where t2.communityid='".$zfromcommunityid."'
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
						 '".$zcommunityid."' as childwebid,
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
						 t2.alttag
					from ".wtw_tableprefix."connectinggrids t2
					where t2.childwebid='".$zfromcommunityid."'
						and t2.parentwebid=''
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
						 '".$zcommunityid,"' as parentwebid,
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
						 t2.alttag
					from ".wtw_tableprefix."connectinggrids t2
					where t2.parentwebid='".$zfromcommunityid."'
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
						 '".$zcommunityid."' as communityid,
						 t2.buildingid,
						 t2.thingid,
						 t2.loadactionzoneid,
						 t2.jsfunction,
						 t2.jsparameters
					from ".wtw_tableprefix."automations t2
					where t2.communityid='".$zfromcommunityid."'
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
							where communityid='".$zfromcommunityid."' 
								and deleted=0) t1
						inner join ".wtw_tableprefix."automationsteps t2
							on t1.automationid=t2.automationid
						left join (select automationid, pastautomationid 
								from ".wtw_tableprefix."automations) t3
							on t3.pastautomationid = t2.automationid
						left join (select actionzoneid, pastactionzoneid 
								from ".wtw_tableprefix."actionzones) t4
							on t4.pastactionzoneid = t2.actionzoneid
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
					select t3.communitymoldid as pastcommunitymoldid,
						 '".$zcommunityid."' as communityid,
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
						 t3.emissivecolorb
					from ".wtw_tableprefix."communitymolds t3
					where t3.communityid='".$zfromcommunityid."'
						and t3.deleted=0;");
				foreach ($zresults as $zrow) {
					$zcommunitymoldid = $wtwiframes->getRandomString(16,1);
					$wtwiframes->query("
						insert into ".wtw_tableprefix."communitymolds
						   (communitymoldid,
							pastcommunitymoldid,
							communityid,
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
							('".$zcommunitymoldid."',
							'".$zrow["pastcommunitymoldid"]."',
							'".$zrow["communityid"]."',
							'".$zrow["loadactionzoneid"]."',
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
						 '' as thingmoldid,
						 '' as buildingmoldid,
						 t6.communitymoldid as communitymoldid,
						 t4.imageindex,
						 t4.imageid,
						 t4.imagehoverid,
						 t4.imageclickid,
						 t4.jsfunction,
						 t4.jsparameters,
						 t4.userid,
						 t4.alttag
					from ".wtw_tableprefix."webimages t4 
						inner join ".wtw_tableprefix."communitymolds t5
							on t4.communitymoldid = t5.communitymoldid
						left join (select communitymoldid, pastcommunitymoldid 
							from ".wtw_tableprefix."communitymolds 
							where communityid='".$zcommunityid."' 
								and (not communityid='')) t6
						on t6.pastcommunitymoldid = t4.communitymoldid
					where t5.communityid='".$zfromcommunityid."'
							and not t4.communitymoldid=''
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
							 ".$wtwiframes->checkNumber($zrow["imageindex"],0).",
							 '".$zrow["imageid"]."',
							 '".$zrow["imagehoverid"]."',
							 '".$zrow["imageclickid"]."',
							 '".$zrow["jsfunction"]."',
							 '".$zrow["jsparameters"]."',
							 userid,
							 '".$zrow["alttag"]."',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}	
				$zresults = $wtwiframes->query("
					select t6.communitymoldid as moldid,
						 t4.pathnumber,
						 t4.sorder,
						 t4.positionx,
						 t4.positiony,
						 t4.positionz
					from ".wtw_tableprefix."moldpoints t4 
						inner join ".wtw_tableprefix."communitymolds t5
							on t4.moldid = t5.communitymoldid
						left join (select communitymoldid, pastcommunitymoldid 
							from ".wtw_tableprefix."communitymolds 
							where communityid='".$zcommunityid."' 
								and (not communityid='')) t6
						on t6.pastcommunitymoldid = t4.moldid
					where t5.communityid='".$zfromcommunityid."'
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
							 ".$zrow["pathnumber"].",
							 ".$zrow["sorder"].",
							 ".$zrow["positionx"].",
							 ".$zrow["positiony"].",
							 ".$zrow["positionz"].",
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}	
				$wtwiframes->query("
					update ".wtw_tableprefix."communitymolds
					set actionzoneid=''
					where actionzoneid is null 
						and communityid='".$zcommunityid."';");
				$wtwiframes->query("
					update ".wtw_tableprefix."communitymolds
					set csgmoldid=''
					where csgmoldid is null 
						and communityid='".$zcommunityid."';");
				$wtwiframes->query("
					update ".wtw_tableprefix."actionzones
					set attachmoldid=''
					where attachmoldid is null 
						and communityid='".$zcommunityid."' and (not communityid='');");
				$wtwiframes->query("
					update ".wtw_tableprefix."communitymolds t1 
					left join (select * from ".wtw_tableprefix."communitymolds 
							where communityid='".$zcommunityid."') t2
						on t1.csgmoldid = t2.pastcommunitymoldid
					set t1.csgmoldid = t2.communitymoldid
					where t1.communityid='".$zcommunityid."'
						and (not t1.csgmoldid='')
						and (not t2.communitymoldid is null);");
				$wtwiframes->query("
					update ".wtw_tableprefix."communitymolds t1 
					left join (select * from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' 
								and (not communityid='')) t2
						on t1.actionzoneid = t2.pastactionzoneid
					set t1.actionzoneid = t2.actionzoneid
					where t1.communityid='".$zcommunityid."'
						and (not t1.actionzoneid='')
						and (not t2.actionzoneid is null);");
				$wtwiframes->query("
					update ".wtw_tableprefix."communitymolds t1 
					left join (select * from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' 
								and (not communityid='')) t2
						on t1.loadactionzoneid = t2.pastactionzoneid
					set t1.loadactionzoneid = t2.actionzoneid
					where t1.communityid='".$zcommunityid."'
						and (not t1.loadactionzoneid='')
						and (not t2.actionzoneid is null);");
				$wtwiframes->query("
					update ".wtw_tableprefix."actionzones t1
					left join (select * from ".wtw_tableprefix."communitymolds 
							where communityid='".$zcommunityid."') t2
						on t1.attachmoldid=t2.pastcommunitymoldid
					set t1.attachmoldid=t2.communitymoldid
					where t1.communityid='".$zcommunityid."'
						and (not t1.attachmoldid='')
						and (not t2.communitymoldid is null);");
				$wtwiframes->query("
					update ".wtw_tableprefix."actionzones t1
					left join (select * from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' and (not communityid='')) t2
						on t1.parentactionzoneid=t2.pastactionzoneid
					set t1.parentactionzoneid=t2.actionzoneid
					where t1.communityid='".$zcommunityid."'
						and (not t1.parentactionzoneid='')
						and (not t2.actionzoneid is null);");
				$wtwiframes->query("
					update ".wtw_tableprefix."actionzones t1
					left join (select * from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' and (not communityid='')) t2
						on t1.loadactionzoneid=t2.pastactionzoneid
					set t1.loadactionzoneid=t2.actionzoneid
					where t1.communityid='".$zcommunityid."'
						and (not t1.loadactionzoneid='')
						and (not t2.actionzoneid is null);");
				$wtwiframes->query("
					update ".wtw_tableprefix."automations t1
					left join (select * from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' and deleted=0) t2
						on t1.loadactionzoneid=t2.pastactionzoneid
					set t1.loadactionzoneid=t2.actionzoneid
					where t1.communityid='".$zcommunityid."'
						and (not t1.loadactionzoneid='');");
				$wtwiframes->query("
					update ".wtw_tableprefix."connectinggrids t1
					left join (select * from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' 
								and deleted=0 
								and (not communityid='')) t2
						on t1.loadactionzoneid=t2.pastactionzoneid
					set t1.loadactionzoneid=t2.actionzoneid
					where t1.childwebid='".$zcommunityid."'
						and t1.parentwebid=''
						and (not t1.loadactionzoneid='');");
				$wtwiframes->query("
					update ".wtw_tableprefix."connectinggrids t1
					left join (select * from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' 
								and deleted=0 
								and (not communityid='')) t2
						on t1.unloadactionzoneid=t2.pastactionzoneid
					set t1.unloadactionzoneid=t2.actionzoneid
					where t1.childwebid='".$zcommunityid."'
						and t1.parentwebid=''
						and (not t1.unloadactionzoneid=''); ");
				$wtwiframes->query("
					update ".wtw_tableprefix."connectinggrids t1
					left join (select * from ".wtw_tableprefix."actionzones 
							where communityid='".$zcommunityid."' 
								and deleted=0 
								and (not communityid='')) t2
						on t1.attachactionzoneid=t2.pastactionzoneid
					set t1.attachactionzoneid=t2.actionzoneid
					where t1.parentwebid='".$zcommunityid."'
						and (not t1.attachactionzoneid='');");
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwcommunities.php-copyCommunity=".$e->getMessage());
		}
		return $zcommunityid;
	}
	
	public function importCommunity($zcommunityid, $zpastcommunityid, $zcommunityname, $zcommunityanalyticsid, $zstartpositionx, $zstartpositiony, $zstartpositionz, $zstartscalingx, $zstartscalingy, $zstartscalingz, $zstartrotationx, $zstartrotationy, $zstartrotationz, $zgravity, $ztextureid, $zskydomeid, $zskyinclination, $zskyluminance, $zskyazimuth, $zskyrayleigh, $zskyturbidity, $zskymiedirectionalg, $zskymiecoefficient, $zgroundpositiony, $zwaterpositiony, $zalttag) {
		global $wtwiframes;
		try {
			/* ini_set('max_execution_time', 300); */
			if (!empty($wtwiframes->getSessionUserID())) {
				echo "<script>parent.WTW.updateProgressBar(75,100);</script>";
				if ($wtwiframes->keyExists(wtw_tableprefix.'communities', 'communityid', $zcommunityid) == false) {
					$wtwiframes->query("
						insert into ".wtw_tableprefix."communities
							(communityid, 
							 pastcommunityid, 
							 communityname, 
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
							 textureid, 
							 skydomeid, 
							 skyinclination, 
							 skyluminance, 
							 skyazimuth, 
							 skyrayleigh, 
							 skyturbidity, 
							 skymiedirectionalg, 
							 skymiecoefficient, 
							 groundpositiony, 
							 waterpositiony, 
							 alttag,
							 userid,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zcommunityid."', 
							 '".$zpastcommunityid."', 
							 '".$zcommunityname."', 
							 '".$zcommunityanalyticsid."', 
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
							 '".$ztextureid."', 
							 '".$zskydomeid."', 
							 ".$zskyinclination.", 
							 ".$zskyluminance.", 
							 ".$zskyazimuth.", 
							 ".$zskyrayleigh.", 
							 ".$zskyturbidity.", 
							 ".$zskymiedirectionalg.", 
							 ".$zskymiecoefficient.", 
							 ".$zgroundpositiony.", 
							 ".$zwaterpositiony.", 
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
							 '".$zcommunityid."',
							 '',
							 '',
							 'admin',
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
					$zwebaliasid = $wtwiframes->getRandomString(16,1);
					$forcehttps = "0";
					if ($wtwiframes->protocol == "https://") {
						$forcehttps = "1";
					}
					$wtwiframes->query("
						insert into ".wtw_tableprefix."webaliases
							(webaliasid,
							 domainname,
							 communityid,
							 webalias,
							 forcehttps,
							 createdate,
							 createuserid,
							 updatedate,
							 updateuserid)
						values
							('".$zwebaliasid."',
							 '".$wtwiframes->domainname."',
							 '".$zcommunityid."',
							 '".$wtwiframes->domainname."',
							 ".$forcehttps.",
							 now(),
							 '".$wtwiframes->userid."',
							 now(),
							 '".$wtwiframes->userid."');");
				}
			}
			echo "<script>parent.WTW.updateProgressBar(95,100);</script>";
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwcommunities.php-importCommunity=".$e->getMessage());
		}
		return $zcommunityid;
	}

	public function shareCommunityTemplate($zcommunityid, $ztemplatename, $zdescription, $ztags) {
		global $wtwiframes;
		try {
			$conn = new mysqli(wtw_dbserver, wtw_dbusername, wtw_dbpassword, wtw_dbname);
			if ($conn->connect_error) {
				serror("core-functions-class_wtwcommunities.php-shareCommunityTemplate=".$conn->connect_error);
			} else {
				$zuserid = "";
				if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
					$zuserid = $_SESSION["wtw_userid"];
				}
				$ztemplatename = htmlspecialchars($ztemplatename, ENT_QUOTES, 'UTF-8');
				$zdescription = htmlspecialchars($zdescription, ENT_QUOTES, 'UTF-8');
				$ztags = htmlspecialchars($ztags, ENT_QUOTES, 'UTF-8');
				$sql = "CALL sharecommunitytemplate('".$zcommunityid."','".$ztemplatename."','".$zdescription."','".$ztags."','".$zuserid."');";
				$result = $conn->query($sql);
			}
			$conn->close();
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwcommunities.php-shareCommunityTemplate=".$e->getMessage());
		}
	}		
}

	function wtwcommunities() {
		return wtwcommunities::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwcommunities'] = wtwcommunities();	
?>
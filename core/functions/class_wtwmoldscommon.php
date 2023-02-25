<?php 
class wtwmoldscommon {
	/* wtwmoldscommon class for admin database functions for 3d community, building, and thing molds */
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
	
	public function savePathPoints($zcommunityid, $zbuildingid, $zthingid, $zmoldid, $zpathnumber, $zpathpoints) {
		/* certain molds like pipes have point values to follow, this function saves a series of points to the database */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($zmoldid != "") {
				$access = false;
				if ($wtwhandlers->hasValue($zcommunityid)) {
					$access = $wtwhandlers->checkAdminAccess($zcommunityid, "", "");
				} else if ($wtwhandlers->hasValue($zbuildingid)) {
					$access = $wtwhandlers->checkAdminAccess("", $zbuildingid, "");
				} else if ($wtwhandlers->hasValue($zthingid)) {
					$access = $wtwhandlers->checkAdminAccess("", "", $zthingid);
				}
				if ($access) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."moldpoints
						set deleteddate=now(),
							deleteduserid='".$wtwhandlers->userid."',
							deleted=1
						where moldid='".$zmoldid."'
							and pathnumber=".$zpathnumber.";");
					
				}				
				$pathpoints = (array) json_decode($zpathpoints,true);
				foreach($pathpoints as $key=>$value) {
					$zmoldpointid = "";
					$zresults = $wtwhandlers->query("
						select moldpointid 
						from ".wtw_tableprefix."moldpoints 
						where moldid='".$zmoldid."' 
							and pathnumber=".$wtwhandlers->checkNumber($zpathnumber,1)." 
							and sorder=".$wtwhandlers->checkNumber($value["sorder"],0)." 
						order by createdate 
						limit 1");
					foreach ($zresults as $zrow) {
						$zmoldpointid = $zrow["moldpointid"];
					}
					if ($wtwhandlers->hasValue($zmoldpointid)) {
						$wtwhandlers->query("
							update ".wtw_tableprefix."moldpoints
							set positionx=".$wtwhandlers->checkNumber($value["x"],0).",
								positiony=".$wtwhandlers->checkNumber($value["y"],0).",
								positionz=".$wtwhandlers->checkNumber($value["z"],0).",
								updatedate=now(),
								updateuserid='".$wtwhandlers->userid."',
								deleteddate=null,
								deleteduserid='',
								deleted=0
							where moldpointid='".$zmoldpointid."'
								and moldid='".$zmoldid."'
								and pathnumber=".$wtwhandlers->checkNumber($zpathnumber,1).";");
					} else {
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
								 ".$wtwhandlers->checkNumber($value["sorder"],0).",
								 ".$wtwhandlers->checkNumber($value["x"],0).",
								 ".$wtwhandlers->checkNumber($value["y"],0).",
								 ".$wtwhandlers->checkNumber($value["z"],0).",
								 now(),
								 '".$wtwhandlers->userid."',
								 now(),
								 '".$wtwhandlers->userid."');");
					}
					$zsuccess = true;
				}	
			}
		} catch (Exception $e) {
			serror("core-functions-class_wtwmoldscommon.php-savePathPoints=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	function saveWebImage($zthingmoldid, $zbuildingmoldid, $zcommunitymoldid, $zimageindex, $zimageid, $zimagehoverid, $zimageclickid, $zjsfunction, $zjsparameters) {
		/* web images are used by image related molds, they provide default image, hover image, and image when clicked */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			$zwebimageid = "";
			$zresults = $wtwhandlers->query("
				select webimageid 
				from ".wtw_tableprefix."webimages 
				where thingmoldid='".$zthingmoldid."' 
					and buildingmoldid='".$zbuildingmoldid."' 
					and communitymoldid='".$zcommunitymoldid."' 
					and imageindex=".$wtwhandlers->checkNumber($zimageindex,0)." 
				order by createdate desc, webimageid desc 
				limit 1;");
			foreach ($zresults as $zrow) {
				$zwebimageid = $zrow["webimageid"];
			}
			if ($wtwhandlers->hasValue($zwebimageid)) {
				$wtwhandlers->query("
					update ".wtw_tableprefix."webimages
					set imageindex=".$wtwhandlers->checkNumber($zimageindex,0).",
						imageid='".$zimageid."',
						imagehoverid='".$zimagehoverid."',
						imageclickid='".$zimageclickid."',
						jsfunction='".$zjsfunction."',
						jsparameters='".$zjsparameters."',
						updatedate=now(),
						updateuserid='".$wtwhandlers->userid."',
						deleteddate=null,
						deleteduserid='',
						deleted=0
					where webimageid='".$zwebimageid."';");
			} else {
				$zwebimageid = $wtwhandlers->getRandomString(16,1);
				$wtwhandlers->query("
					insert into ".wtw_tableprefix."webimages
						(webimageid,
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
						 createdate,
						 createuserid,
						 updatedate,
						 updateuserid)
						values
						('".$zwebimageid."',
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
						 now(),
						 '".$wtwhandlers->userid."',
						 now(),
						 '".$wtwhandlers->userid."');
					");
			}
			$zsuccess = true;
		} catch (Exception $e) {
			serror("core-functions-class_wtwmoldscommon.php-saveWebImage=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function importMolds($zwebtype, $zwebid, $zcopywebid, $zmoldsbulk) {
		/* imports the molds to community, building, and thing when downloaded by the media library */
		$zsuccess = false;
		global $wtwhandlers;
		try {
			/* ini_set('max_execution_time', 300); */
			if (!empty($wtwhandlers->getSessionUserID())) {
				$zmoldsbulk = $wtwhandlers->decode64($zmoldsbulk);
				if (!empty($zmoldsbulk)) {
					$zmolds = json_decode($zmoldsbulk);
					$zrecordeach = 90 / count($zmolds);
					$i = 10;
					foreach ($zmolds as $zrow) {
						$pastmoldid = "";
						switch ($zwebtype) {
							case "community":
								$pastmoldid = $zrow->communitymoldid;
								break;
							case "building":
								$pastmoldid = $zrow->buildingmoldid;
								break;
							case "thing":
								$pastmoldid = $zrow->thingmoldid;
								break;
						}
						$zmoldid = $wtwhandlers->getRandomString(16,1);
						$wtwhandlers->query("
							insert into ".wtw_tableprefix.$zwebtype."molds
								(".$zwebtype."moldid,
								 past".$zwebtype."moldid,
								 ".$zwebtype."id, 
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
								 graphiclevel, 
								 textureid, 
								 texturebumpid, 
								 texturehoverid, 
								 videoid, 
								 videoposterid, 
								 sideorientation, 
								 heightmapid, 
								 mixmapid, 
								 texturerid, 
								 texturegid, 
								 texturebid, 
								 texturebumprid, 
								 texturebumpgid, 
								 texturebumpbid, 
								 minheight, 
								 maxheight, 
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
								 diffusecolor,
								 specularcolor,
								 emissivecolor,
								 ambientcolor,
								 webtext, 
								 webstyle, 
								 opacity, 
								 billboard, 
								 waterreflection, 
								 receiveshadows, 
								 subdivisions, 
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
								('".$zmoldid."', 
								 '".$pastmoldid."', 
								 '".$zwebid."', 
								 '".$zrow->loadactionzoneid."', 
								 '".$zrow->shape."', 
								 '".$zrow->covering."', 
								 ".$wtwhandlers->checkNumber($zrow->positionx,0).", 
								 ".$wtwhandlers->checkNumber($zrow->positiony,0).", 
								 ".$wtwhandlers->checkNumber($zrow->positionz,0).", 
								 ".$wtwhandlers->checkNumber($zrow->scalingx,1).", 
								 ".$wtwhandlers->checkNumber($zrow->scalingy,1).", 
								 ".$wtwhandlers->checkNumber($zrow->scalingz,1).", 
								 ".$wtwhandlers->checkNumber($zrow->rotationx,0).", 
								 ".$wtwhandlers->checkNumber($zrow->rotationy,0).", 
								 ".$wtwhandlers->checkNumber($zrow->rotationz,0).", 
								 ".$wtwhandlers->checkNumber($zrow->special1,0).", 
								 ".$wtwhandlers->checkNumber($zrow->special2,0).", 
								 ".$wtwhandlers->checkNumber($zrow->uoffset,0).", 
								 ".$wtwhandlers->checkNumber($zrow->voffset,0).", 
								 ".$wtwhandlers->checkNumber($zrow->uscale,0).", 
								 ".$wtwhandlers->checkNumber($zrow->vscale,0).", 
								 '".$zrow->uploadobjectid."', 
								 ".$wtwhandlers->checkNumber($zrow->graphiclevel,0).", 
								 '".$zrow->textureid."', 
								 '".$zrow->texturebumpid."', 
								 '".$zrow->texturehoverid."', 
								 '".$zrow->videoid."', 
								 '".$zrow->videoposterid."', 
								 '".$zrow->sideorientation."', 
								 '".$zrow->heightmapid."', 
								 '".$zrow->mixmapid."', 
								 '".$zrow->texturerid."', 
								 '".$zrow->texturegid."', 
								 '".$zrow->texturebid."', 
								 '".$zrow->texturebumprid."', 
								 '".$zrow->texturebumpgid."', 
								 '".$zrow->texturebumpbid."', 
								 ".$wtwhandlers->checkNumber($zrow->minheight,0).", 
								 ".$wtwhandlers->checkNumber($zrow->maxheight,30).", 
								 '".$zrow->soundid."', 
								 '".$zrow->soundname."', 
								 '".$zrow->soundattenuation."', 
								 ".$wtwhandlers->checkNumber($zrow->soundloop,1).", 
								 ".$wtwhandlers->checkNumber($zrow->soundmaxdistance,100).", 
								 ".$wtwhandlers->checkNumber($zrow->soundrollofffactor,1).", 
								 ".$wtwhandlers->checkNumber($zrow->soundrefdistance,1).", 
								 ".$wtwhandlers->checkNumber($zrow->soundconeinnerangle,90).", 
								 ".$wtwhandlers->checkNumber($zrow->soundconeouterangle,180).", 
								 ".$wtwhandlers->checkNumber($zrow->soundconeoutergain,1).", 
								 '".$zrow->diffusecolor."',
								 '".$zrow->specularcolor."',
								 '".$zrow->emissivecolor."',
								 '".$zrow->ambientcolor."',
								 '".$zrow->webtext."', 
								 '".$zrow->webstyle."', 
								 ".$wtwhandlers->checkNumber($zrow->opacity,100).", 
								 ".$wtwhandlers->checkNumber($zrow->billboard,0).", 
								 ".$wtwhandlers->checkNumber($zrow->waterreflection,0).", 
								 ".$wtwhandlers->checkNumber($zrow->receiveshadows,0).", 
								 ".$wtwhandlers->checkNumber($zrow->subdivisions,12).", 
								 ".$wtwhandlers->checkNumber($zrow->checkcollisions,1).", 
								 ".$wtwhandlers->checkNumber($zrow->ispickable,1).", 
								 '".$zrow->actionzoneid."', 
								 '".$zrow->csgmoldid."', 
								 '".$zrow->csgaction."', 
								 '".$zrow->alttag."', 
								 '".$zrow->jsfunction."', 
								 '".$zrow->jsparameters."',
								 now(),
								 '".$wtwhandlers->userid."',
								 now(),
								 '".$wtwhandlers->userid."');");
						$i += $zrecordeach;
					}
					/* clean up data */
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."molds
						set actionzoneid=''
						where actionzoneid is null 
							and ".$zwebtype."id='".$zwebid."';");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."molds
						set csgmoldid=''
						where csgmoldid is null 
							and ".$zwebtype."id='".$zwebid."';");
					/* update foreign keys to new moldids */
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."molds t1 
							inner join (select * 
								from ".wtw_tableprefix.$zwebtype."molds 
								where ".$zwebtype."id='".$zwebid."') t2
							on t1.csgmoldid = t2.past".$zwebtype."moldid
						set t1.csgmoldid = t2.".$zwebtype."moldid
						where not t1.csgmoldid=''
							and t1.".$zwebtype."id='".$zwebid."'
							and (not t2.".$zwebtype."moldid is null);");
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."molds t1 
							inner join (select * 
								from ".wtw_tableprefix."actionzones 
								where ".$zwebtype."id='".$zwebid."'
									and (not ".$zwebtype."id='')) t2
							on t1.actionzoneid = t2.pastactionzoneid
						set t1.actionzoneid = t2.actionzoneid
						where not t1.actionzoneid=''
							and t1.".$zwebtype."id='".$zwebid."'
							and not t2.actionzoneid is null;"); 
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."molds t1 
							inner join (select * 
								from ".wtw_tableprefix."actionzones 
								where ".$zwebtype."id='".$zwebid."'
									and (not ".$zwebtype."id='')) t2
							on t1.loadactionzoneid = t2.pastactionzoneid
						set t1.loadactionzoneid = t2.actionzoneid
						where not t1.loadactionzoneid=''
							and t1.".$zwebtype."id='".$zwebid."'
							and not t2.actionzoneid is null;"); 
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."molds t1 
							inner join (select * 
								from ".wtw_tableprefix."actionzones 
								where ".$zwebtype."id='".$zwebid."'
									and (not ".$zwebtype."id='')) t2
							on t1.unloadactionzoneid = t2.pastactionzoneid
						set t1.unloadactionzoneid = t2.actionzoneid
						where not t1.unloadactionzoneid=''
							and t1.".$zwebtype."id='".$zwebid."'
							and not t2.actionzoneid is null;"); 
					$wtwhandlers->query("
						update ".wtw_tableprefix."actionzones t1
							inner join (select * 
								from ".wtw_tableprefix.$zwebtype."molds 
								where ".$zwebtype."id='".$zwebid."' and deleted=0) t2
							on t1.attachmoldid=t2.past".$zwebtype."moldid
						set t1.attachmoldid=t2.".$zwebtype."moldid
						where t1.".$zwebtype."id='".$zwebid."'
							and (not t1.attachmoldid='')
							and (not t2.".$zwebtype."moldid is null);"); 
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwmoldscommon.php-importMolds=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function importMoldPoints($zwebtype, $zwebid, $zcopywebid, $zmoldpointsbulk) {
		/* downloads mold points for molds that are downloaded by the media library */
		$zsuccess = false;
		global $wtwhandlers;
		try {
			if (!empty($wtwhandlers->getSessionUserID())) {
				if (!empty($zmoldpointsbulk)) {
					$zcommunityid = "";
					$zbuildingid = "";
					$zthingid = "";
					switch ($zwebtype) {
						case "community":
							$zcommunityid = $zwebid;
							break;
						case "building":
							$zbuildingid = $zwebid;
							break;
						case "thing":
							$zthingid = $zwebid;
							break;
					}
					$zmoldpointsbulk = $wtwhandlers->decode64($zmoldpointsbulk);
					$zmoldpoints = json_decode($zmoldpointsbulk);
					$zrecordeach = 50 / count($zmoldpoints);
					$i = 50;
					foreach ($zmoldpoints as $zrow) {
						$zmoldpointid = $wtwhandlers->getRandomString(16,1);
						if (!empty($sql) && !empty($wtwhandlers->userid)) {
							$wtwhandlers->query("
								insert into ".wtw_tableprefix."moldpoints
									(moldpointid,
									 pastmoldpointid,
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
									 '".$zrow->moldpointid."', 
									 '".$zrow->moldid."', 
									 ".$wtwhandlers->checkNumber($zrow->pathnumber,1).", 
									 ".$wtwhandlers->checkNumber($zrow->sorder,0).", 
									 ".$wtwhandlers->checkNumber($zrow->positionx,0).", 
									 ".$wtwhandlers->checkNumber($zrow->positiony,0).", 
									 ".$wtwhandlers->checkNumber($zrow->positionz,0).", 
									 now(),
									 '".$wtwhandlers->userid."',
									 now(),
									 '".$wtwhandlers->userid."');");
							$i += $zrecordeach;
						}
					}
					/* update foreign keys to new moldpointids */
					$wtwhandlers->query("
						update ".wtw_tableprefix.$zwebtype."moldpoints t1 
							inner join (select * 
								from ".wtw_tableprefix.$zwebtype."molds 
								where ".$zwebtype."id='".$zwebid."') t2
							on t1.moldid = t2.past".$zwebtype."moldid
						set t1.moldid = t2.".$zwebtype."moldid
						where not t1.moldid=''
							and t1.".$zwebtype."id='".$zwebid."'
							and (not t2.".$zwebtype."moldid is null);");
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwmoldscommon.php-importMoldPoints=".$e->getMessage());
		}
		return $zsuccess;
	}
}

	function wtwmoldscommon() {
		return wtwmoldscommon::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwmoldscommon'] = wtwmoldscommon();



?>
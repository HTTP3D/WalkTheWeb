<?php 
class wtwmoldscommon {
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
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($zmoldid != "") {
				$access = false;
				if (!empty($zcommunityid) && isset($zcommunityid)) {
					$access = $wtwiframes->checkAdminAccess($zcommunityid, "", "");
				} else if (!empty($zbuildingid) && isset($zbuildingid)) {
					$access = $wtwiframes->checkAdminAccess("", $zbuildingid, "");
				} else if (!empty($zthingid) && isset($zthingid)) {
					$access = $wtwiframes->checkAdminAccess("", "", $zthingid);
				}
				if ($access) {
					$wtwiframes->query("
						update ".wtw_tableprefix."moldpoints
						set deleteddate=now(),
							deleteduserid='".$wtwiframes->userid."',
							deleted=1
						where moldid='".$zmoldid."'
							and pathnumber=".$zpathnumber.";");
					
				}				
				$pathpoints = (array) json_decode($zpathpoints,true);
				foreach($pathpoints as $key=>$value) {
					$zmoldpointid = "";
					$zresults = $wtwiframes->query("
						select moldpointid 
						from ".wtw_tableprefix."moldpoints 
						where moldid='".$zmoldid."' 
							and pathnumber=".$wtwiframes->checkNumber($zpathnumber,1)." 
							and sorder=".$wtwiframes->checkNumber($value["sorder"],0)." 
						order by createdate 
						limit 1");
					foreach ($zresults as $zrow) {
						$zmoldpointid = $zrow["moldpointid"];
					}
					if (!empty($zmoldpointid) && isset($zmoldpointid)) {
						$wtwiframes->query("
							update ".wtw_tableprefix."moldpoints
							set positionx=".$wtwiframes->checkNumber($value["x"],0).",
								positiony=".$wtwiframes->checkNumber($value["y"],0).",
								positionz=".$wtwiframes->checkNumber($value["z"],0).",
								updatedate=now(),
								updateuserid='".$wtwiframes->userid."',
								deleteddate=null,
								deleteduserid='',
								deleted=0
							where moldpointid='".$zmoldpointid."'
								and moldid='".$zmoldid."'
								and pathnumber=".$wtwiframes->checkNumber($zpathnumber,1).";");
					} else {
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
								 ".$wtwiframes->checkNumber($value["sorder"],0).",
								 ".$wtwiframes->checkNumber($value["x"],0).",
								 ".$wtwiframes->checkNumber($value["y"],0).",
								 ".$wtwiframes->checkNumber($value["z"],0).",
								 now(),
								 '".$wtwiframes->userid."',
								 now(),
								 '".$wtwiframes->userid."');");
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
		global $wtwiframes;
		$zsuccess = false;
		try {
			$zwebimageid = "";
			$zresults = $wtwiframes->query("
				select webimageid 
				from ".wtw_tableprefix."webimages 
				where thingmoldid='".$zthingmoldid."' 
					and buildingmoldid='".$zbuildingmoldid."' 
					and communitymoldid='".$zcommunitymoldid."' 
					and imageindex=".$wtwiframes->checkNumber($zimageindex,0)." 
				order by createdate desc, webimageid desc 
				limit 1;");
			foreach ($zresults as $zrow) {
				$zwebimageid = $zrow["webimageid"];
			}
			if (!empty($zwebimageid) && isset($zwebimageid)) {
				$wtwiframes->query("
					update ".wtw_tableprefix."webimages
					set imageindex=".$wtwiframes->checkNumber($zimageindex,0).",
						imageid='".$zimageid."',
						imagehoverid='".$zimagehoverid."',
						imageclickid='".$zimageclickid."',
						jsfunction='".$zjsfunction."',
						jsparameters='".$zjsparameters."',
						updatedate=now(),
						updateuserid='".$wtwiframes->userid."',
						deleteddate=null,
						deleteduserid='',
						deleted=0
					where webimageid='".$zwebimageid."';");
			} else {
				$zwebimageid = $wtwiframes->getRandomString(16,1);
				$wtwiframes->query("
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
						 ".$wtwiframes->checkNumber($zimageindex,0).",
						 '".$zimageid."',
						 '".$zimagehoverid."',
						 '".$zimageclickid."',
						 '".$zjsfunction."',
						 '".$zjsparameters."',
						 '".$wtwiframes->userid."',
						 now(),
						 '".$wtwiframes->userid."',
						 now(),
						 '".$wtwiframes->userid."');
					");
			}
			$zsuccess = true;
		} catch (Exception $e) {
			serror("core-functions-class_wtwmoldscommon.php-saveWebImage=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function importMolds($zmoldgroup, $zwebid, $zcopywebid, $zmoldsbulk) {
		$zsuccess = false;
		global $wtwiframes;
		try {
			/* ini_set('max_execution_time', 300); */
			if (!empty($wtwiframes->getSessionUserID())) {
				if (!empty($zmoldsbulk)) {
					$zmoldsbulk = base64_decode($zmoldsbulk);
					$zmolds = json_decode($zmoldsbulk);
					$zrecordeach = 90 / count($zmolds);
					$i = 10;
					foreach ($zmolds as $zrow) {
						$pastmoldid = "";
						switch ($zmoldgroup) {
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
						$zmoldid = $wtwiframes->getRandomString(16,1);
						$wtwiframes->query("
							insert into ".wtw_tableprefix.$zmoldgroup."molds
								(".$zmoldgroup."moldid,
								 past".$zmoldgroup."moldid,
								 ".$zmoldgroup."id, 
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
								 objectfolder, 
								 objectfile, 
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
								 diffusecolorr, 
								 diffusecolorg, 
								 diffusecolorb, 
								 specularcolorr, 
								 specularcolorg, 
								 specularcolorb, 
								 emissivecolorr, 
								 emissivecolorg, 
								 emissivecolorb, 
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
								 ".$wtwiframes->checkNumber($zrow->positionx,0).", 
								 ".$wtwiframes->checkNumber($zrow->positiony,0).", 
								 ".$wtwiframes->checkNumber($zrow->positionz,0).", 
								 ".$wtwiframes->checkNumber($zrow->scalingx,1).", 
								 ".$wtwiframes->checkNumber($zrow->scalingy,1).", 
								 ".$wtwiframes->checkNumber($zrow->scalingz,1).", 
								 ".$wtwiframes->checkNumber($zrow->rotationx,0).", 
								 ".$wtwiframes->checkNumber($zrow->rotationy,0).", 
								 ".$wtwiframes->checkNumber($zrow->rotationz,0).", 
								 ".$wtwiframes->checkNumber($zrow->special1,0).", 
								 ".$wtwiframes->checkNumber($zrow->special2,0).", 
								 ".$wtwiframes->checkNumber($zrow->uoffset,0).", 
								 ".$wtwiframes->checkNumber($zrow->voffset,0).", 
								 ".$wtwiframes->checkNumber($zrow->uscale,0).", 
								 ".$wtwiframes->checkNumber($zrow->vscale,0).", 
								 '".$zrow->uploadobjectid."', 
								 '".$zrow->objectfolder."', 
								 '".$zrow->objectfile."', 
								 ".$wtwiframes->checkNumber($zrow->graphiclevel,0).", 
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
								 ".$wtwiframes->checkNumber($zrow->minheight,0).", 
								 ".$wtwiframes->checkNumber($zrow->maxheight,30).", 
								 '".$zrow->soundid."', 
								 '".$zrow->soundname."', 
								 '".$zrow->soundattenuation."', 
								 ".$wtwiframes->checkNumber($zrow->soundloop,1).", 
								 ".$wtwiframes->checkNumber($zrow->soundmaxdistance,100).", 
								 ".$wtwiframes->checkNumber($zrow->soundrollofffactor,1).", 
								 ".$wtwiframes->checkNumber($zrow->soundrefdistance,1).", 
								 ".$wtwiframes->checkNumber($zrow->soundconeinnerangle,90).", 
								 ".$wtwiframes->checkNumber($zrow->soundconeouterangle,180).", 
								 ".$wtwiframes->checkNumber($zrow->soundconeoutergain,1).", 
								 ".$wtwiframes->checkNumber($zrow->diffusecolorr,1).", 
								 ".$wtwiframes->checkNumber($zrow->diffusecolorg,1).", 
								 ".$wtwiframes->checkNumber($zrow->diffusecolorb,1).", 
								 ".$wtwiframes->checkNumber($zrow->specularcolorr,1).", 
								 ".$wtwiframes->checkNumber($zrow->specularcolorg,1).", 
								 ".$wtwiframes->checkNumber($zrow->specularcolorb,1).", 
								 ".$wtwiframes->checkNumber($zrow->emissivecolorr,1).", 
								 ".$wtwiframes->checkNumber($zrow->emissivecolorg,1).", 
								 ".$wtwiframes->checkNumber($zrow->emissivecolorb,1).", 
								 '".$zrow->webtext."', 
								 '".$zrow->webstyle."', 
								 ".$wtwiframes->checkNumber($zrow->opacity,100).", 
								 ".$wtwiframes->checkNumber($zrow->billboard,0).", 
								 ".$wtwiframes->checkNumber($zrow->waterreflection,0).", 
								 ".$wtwiframes->checkNumber($zrow->receiveshadows,0).", 
								 ".$wtwiframes->checkNumber($zrow->subdivisions,12).", 
								 ".$wtwiframes->checkNumber($zrow->checkcollisions,1).", 
								 ".$wtwiframes->checkNumber($zrow->ispickable,1).", 
								 '".$zrow->actionzoneid."', 
								 '".$zrow->csgmoldid."', 
								 '".$zrow->csgaction."', 
								 '".$zrow->alttag."', 
								 '".$zrow->jsfunction."', 
								 '".$zrow->jsparameters."',
								 now(),
								 '".$wtwiframes->userid."',
								 now(),
								 '".$wtwiframes->userid."');");
						$i += $zrecordeach;
						echo "<script>parent.WTW.updateProgressBar(".$i.",100);</script>";
					}
					/* clean up data */
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."molds
						set actionzoneid=''
						where actionzoneid is null 
							and ".$zmoldgroup."id='".$zwebid."';");
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."molds
						set csgmoldid=''
						where csgmoldid is null 
							and ".$zmoldgroup."id='".$zwebid."';");
					/* update foreign keys to new moldids */
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1 
							inner join (select * 
								from ".wtw_tableprefix.$zmoldgroup."molds 
								where ".$zmoldgroup."id='".$zwebid."') t2
							on t1.csgmoldid = t2.past".$zmoldgroup."moldid
						set t1.csgmoldid = t2.".$zmoldgroup."moldid
						where not t1.csgmoldid=''
							and t1.".$zmoldgroup."id='".$zwebid."'
							and (not t2.".$zmoldgroup."moldid is null);");
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1 
							inner join (select * 
								from ".wtw_tableprefix."actionzones 
								where ".$zmoldgroup."id='".$zwebid."'
									and (not ".$zmoldgroup."id='')) t2
							on t1.actionzoneid = t2.pastactionzoneid
						set t1.actionzoneid = t2.actionzoneid
						where not t1.actionzoneid=''
							and t1.".$zmoldgroup."id='".$zwebid."'
							and not t2.actionzoneid is null;"); 
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."molds t1 
							inner join (select * 
								from ".wtw_tableprefix."actionzones 
								where ".$zmoldgroup."id='".$zwebid."'
									and (not ".$zmoldgroup."id='')) t2
							on t1.loadactionzoneid = t2.pastactionzoneid
						set t1.loadactionzoneid = t2.actionzoneid
						where not t1.loadactionzoneid=''
							and t1.".$zmoldgroup."id='".$zwebid."'
							and not t2.actionzoneid is null;"); 
					$wtwiframes->query("
						update ".wtw_tableprefix."actionzones t1
							inner join (select * 
								from ".wtw_tableprefix.$zmoldgroup."molds 
								where ".$zmoldgroup."id='".$zwebid."' and deleted=0) t2
							on t1.attachmoldid=t2.past".$zmoldgroup."moldid
						set t1.attachmoldid=t2.".$zmoldgroup."moldid
						where t1.".$zmoldgroup."id='".$zwebid."'
							and (not t1.attachmoldid='')
							and (not t2.".$zmoldgroup."moldid is null);"); 
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwmoldscommon.php-importMolds=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function importMoldPoints($zmoldgroup, $zwebid, $zcopywebid, $zmoldpointsbulk) {
		$zsuccess = false;
		global $wtwiframes;
		try {
			if (!empty($wtwiframes->getSessionUserID())) {
				if (!empty($zmoldpointsbulk)) {
					$zcommunityid = "";
					$zbuildingid = "";
					$zthingid = "";
					switch ($zmoldgroup) {
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
					$zmoldpointsbulk = base64_decode($zmoldpointsbulk);
					$zmoldpoints = json_decode($zmoldpointsbulk);
					$zrecordeach = 50 / count($zmoldpoints);
					$i = 50;
					foreach ($zmoldpoints as $zrow) {
						$zmoldpointid = $wtwiframes->getRandomString(16,1);
						if (!empty($sql) && !empty($wtwiframes->userid)) {
							$wtwiframes->query("
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
									 ".$wtwiframes->checkNumber($zrow->pathnumber,1).", 
									 ".$wtwiframes->checkNumber($zrow->sorder,0).", 
									 ".$wtwiframes->checkNumber($zrow->positionx,0).", 
									 ".$wtwiframes->checkNumber($zrow->positiony,0).", 
									 ".$wtwiframes->checkNumber($zrow->positionz,0).", 
									 now(),
									 '".$wtwiframes->userid."',
									 now(),
									 '".$wtwiframes->userid."');");
							$i += $zrecordeach;
							echo "<script>parent.WTW.updateProgressBar(".$i.",100);</script>";
						}
					}
					/* update foreign keys to new moldpointids */
					$wtwiframes->query("
						update ".wtw_tableprefix.$zmoldgroup."moldpoints t1 
							inner join (select * 
								from ".wtw_tableprefix.$zmoldgroup."molds 
								where ".$zmoldgroup."id='".$zwebid."') t2
							on t1.moldid = t2.past".$zmoldgroup."moldid
						set t1.moldid = t2.".$zmoldgroup."moldid
						where not t1.moldid=''
							and t1.".$zmoldgroup."id='".$zwebid."'
							and (not t2.".$zmoldgroup."moldid is null);");
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwmoldscommon.php-importMoldPoints=".$e->getMessage());
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
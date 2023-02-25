<?php
class wtwbuildingmolds {
	/* wtwbuildingmolds class for admin database functions for 3d building molds */
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

	function saveBuildingMold($zbuildingmoldid, $zbuildingid, $zloadactionzoneid, $zunloadactionzoneid, $zshape, $zcovering, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zspecial1, $zspecial2, $zuoffset, $zvoffset, $zuscale, $zvscale, $zuploadobjectid, $zsubdivisions, $zreceiveshadows, $zgraphiclevel, $zcheckcollisions, $zispickable, $zvideoid, $zvideoposterid, $ztextureid, $ztexturebumpid, $zheightmapid, $zmixmapid, $ztexturerid, $ztexturegid, $ztexturebid, $ztexturebumprid, $ztexturebumpgid, $ztexturebumpbid, $zopacity, $zwaterreflection, $zactionzoneid, $zcsgmoldid, $zcsgaction, $zalttag, $zwebtext, $zwebstyle, $zmoldpath1points, $zmoldpath2points, $zdiffusecolor, $zspecularcolor, $zemissivecolor, $zambientcolor, $zsoundid, $zsoundname, $zsoundattenuation, $zsoundloop, $zsoundmaxdistance, $zsoundrollofffactor, $zsoundrefdistance, $zsoundconeinnerangle, $zsoundconeouterangle, $zsoundconeoutergain) {
		/* save building mold settings */
		global $wtwhandlers;
		try {
			if ($wtwhandlers->checkUpdateAccess("", $zbuildingid, "")) {
				$zfoundbuildingmoldid = "";
				$zresults = $wtwhandlers->query("
					select buildingmoldid 
					from ".wtw_tableprefix."buildingmolds 
					where buildingmoldid='".$zbuildingmoldid."'
						and not buildingmoldid=''
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundbuildingmoldid = $zrow["buildingmoldid"];
				}
				if ($wtwhandlers->hasValue($zfoundbuildingmoldid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."buildingmolds
						set loadactionzoneid='".$zloadactionzoneid."',
							unloadactionzoneid='".$zunloadactionzoneid."',
							shape='".$zshape."',
							covering='".$zcovering."',
							positionx=".$wtwhandlers->checkNumber($zpositionx,0).",
							positiony=".$wtwhandlers->checkNumber($zpositiony,0).",
							positionz=".$wtwhandlers->checkNumber($zpositionz,0).",
							scalingx=".$wtwhandlers->checkNumber($zscalingx,1).",
							scalingy=".$wtwhandlers->checkNumber($zscalingy,1).",
							scalingz=".$wtwhandlers->checkNumber($zscalingz,1).",
							rotationx=".$wtwhandlers->checkNumber($zrotationx,0).",
							rotationy=".$wtwhandlers->checkNumber($zrotationy,0).",
							rotationz=".$wtwhandlers->checkNumber($zrotationz,0).",
							special1=".$wtwhandlers->checkNumber($zspecial1,0).",
							special2=".$wtwhandlers->checkNumber($zspecial2,0).",
							uoffset=".$wtwhandlers->checkNumber($zuoffset,0).",
							voffset=".$wtwhandlers->checkNumber($zvoffset,0).",
							uscale=".$wtwhandlers->checkNumber($zuscale,0).",
							vscale=".$wtwhandlers->checkNumber($zvscale,0).",
							uploadobjectid='".$zuploadobjectid."',
							subdivisions=".$wtwhandlers->checkNumber($zsubdivisions,12).",
							receiveshadows=".$wtwhandlers->checkNumber($zreceiveshadows,0).",
							graphiclevel=".$wtwhandlers->checkNumber($zgraphiclevel,0).",
							checkcollisions=".$wtwhandlers->checkNumber($zcheckcollisions,1).",
							ispickable=".$wtwhandlers->checkNumber($zispickable,1).",
							videoid='".$zvideoid."',
							videoposterid='".$zvideoposterid."',
							textureid='".$ztextureid."',
							texturebumpid='".$ztexturebumpid."',
							opacity=".$wtwhandlers->checkNumber($zopacity,100).",
							waterreflection=".$wtwhandlers->checkNumber($zwaterreflection,0).",
							actionzoneid='".$zactionzoneid."',
							csgmoldid='".$zcsgmoldid."',
							csgaction='".$zcsgaction."',
							alttag='".$zalttag."',
							webtext='".$zwebtext."',
							webstyle='".$zwebstyle."',
							diffusecolor='".$zdiffusecolor."',
							specularcolor='".$zspecularcolor."',
							emissivecolor='".$zemissivecolor."',
							ambientcolor='".$zambientcolor."',
							soundid='".$zsoundid."',
							soundname='".$zsoundname."',
							soundattenuation='".$zsoundattenuation."',
							soundloop=".$wtwhandlers->checkNumber($zsoundloop,1).",
							soundmaxdistance=".$wtwhandlers->checkNumber($zsoundmaxdistance,100).",
							soundrollofffactor=".$wtwhandlers->checkNumber($zsoundrollofffactor,1).",
							soundrefdistance=".$wtwhandlers->checkNumber($zsoundrefdistance,1).",
							soundconeinnerangle=".$wtwhandlers->checkNumber($zsoundconeinnerangle,90).",
							soundconeouterangle=".$wtwhandlers->checkNumber($zsoundconeouterangle,180).",
							soundconeoutergain=".$wtwhandlers->checkNumber($zsoundconeoutergain,1).",
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where buildingmoldid='".$zbuildingmoldid."'
							and buildingid='".$zbuildingid."';");
				} else {
					if (!isset($zbuildingmoldid) || empty($zbuildingmoldid)) {
						$zbuildingmoldid = $wtwhandlers->getRandomString(16,1);
					}
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."buildingmolds
						   (buildingmoldid,
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
							subdivisions,
							receiveshadows,
							graphiclevel,
							checkcollisions,
							ispickable,
							videoid,
							videoposterid,
							textureid,
							texturebumpid,
							heightmapid,
							mixmapid,
							texturerid,
							texturegid,
							texturebid,
							texturebumprid,
							texturebumpgid,
							texturebumpbid,
							opacity,
							waterreflection,
							actionzoneid,
							csgmoldid,
							csgaction,
							alttag,
							webtext,
							webstyle,
							diffusecolor,
							specularcolor,
							emissivecolor,
							ambientcolor,
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
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$zbuildingmoldid."',
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
							".$wtwhandlers->checkNumber($zsubdivisions,12).",
							".$wtwhandlers->checkNumber($zreceiveshadows,0).",
							".$wtwhandlers->checkNumber($zgraphiclevel,0).",
							".$wtwhandlers->checkNumber($zcheckcollisions,1).",
							".$wtwhandlers->checkNumber($zispickable,1).",
							'".$zvideoid."',
							'".$zvideoposterid."',
							'".$ztextureid."',
							'".$ztexturebumpid."',
							'".$zheightmapid."',
							'".$zmixmapid."',
							'".$ztexturerid."',
							'".$ztexturegid."',
							'".$ztexturebid."',
							'".$ztexturebumprid."',
							'".$ztexturebumpgid."',
							'".$ztexturebumpbid."',
							".$wtwhandlers->checkNumber($zopacity,100).",
							".$wtwhandlers->checkNumber($zwaterreflection,0).",
							'".$zactionzoneid."',
							'".$zcsgmoldid."',
							'".$zcsgaction."',
							'".$zalttag."',
							'".$zwebtext."',
							'".$zwebstyle."',
							'".$zdiffusecolor."',
							'".$zspecularcolor."',
							'".$zemissivecolor."',
							'".$zambientcolor."',
							'".$zsoundid."',
							'".$zsoundname."',
							'".$zsoundattenuation."',
							".$wtwhandlers->checkNumber($zsoundloop,1).",
							".$wtwhandlers->checkNumber($zsoundmaxdistance,100).",
							".$wtwhandlers->checkNumber($zsoundrollofffactor,1).",
							".$wtwhandlers->checkNumber($zsoundrefdistance,1).",
							".$wtwhandlers->checkNumber($zsoundconeinnerangle,90).",
							".$wtwhandlers->checkNumber($zsoundconeouterangle,180).",
							".$wtwhandlers->checkNumber($zsoundconeoutergain,1).",
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');");
				}
			}
			
			/* CHECK BUILDING ACTION ZONE */

			global $wtwmoldscommon;
			if ($zshape == "tube" || $zshape == "line" || $zshape == "ribbon") {
				$wtwmoldscommon->savePathPoints('', $zbuildingid, '', $zbuildingmoldid, 1, $zmoldpath1points);
			}
			if ($zshape == "ribbon") {
				$wtwmoldscommon->savePathPoints('', $zbuildingid, '', $zbuildingmoldid, 2, $zmoldpath2points);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwbuildingmolds.php-saveBuildingMold=".$e->getMessage());
		}
		return $zbuildingmoldid;
	}

	function deleteBuildingMold($zbuildingmoldid, $zbuildingid, $zdeleted) {
		/* flag building mold as deleted */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->checkUpdateAccess("", $zbuildingid, "")) {
				if ($zdeleted == "0" || $zdeleted == 0) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."buildingmolds
						set deleted=0,
							deleteddate=null,
							deleteduserid=''
						where
							buildingmoldid='".$zbuildingmoldid."'
							and buildingid='".$zbuildingid."';");
					$zsuccess = true;
				} else if ($wtwhandlers->hasValue($zdeleted) && is_numeric($zdeleted)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."buildingmolds
						set deleted=".$zdeleted.",
							deleteddate=now(),
							deleteduserid='".$wtwhandlers->userid."'
						where
							buildingmoldid='".$zbuildingmoldid."'
							and buildingid='".$zbuildingid."';");
					$wtwhandlers->query("
						update ".wtw_tableprefix."webimages
						set deleted=".$zdeleted.",
							deleteddate=now(),
							deleteduserid='".$wtwhandlers->userid."'
						where buildingmoldid='".$zbuildingmoldid."'
							and not buildingmold='';");
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwbuildingmolds.php-deleteBuildingMold=".$e->getMessage());
		}
		return $zsuccess;
	}

	function saveBuildingMoldActionZone($zbuildingmoldid, $zbuildingid, $zactionzoneid) {
		/* update a building mold to be part of an action zone - often animated */
		/* this is not Load Zone, Mold is part of another ActionZone like Door Swinging */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->checkUpdateAccess("", $zbuildingid, "")) {
				$zfoundbuildingmoldid = "";
				$zresults = $wtwhandlers->query("
					select buildingmoldid 
					from ".wtw_tableprefix."buildingmolds 
					where buildingmoldid='".$zbuildingmoldid."'
						and not buildingmoldid=''
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundbuildingmoldid = $zrow["buildingmoldid"];
				}
				if ($wtwhandlers->hasValue($zfoundbuildingmoldid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."buildingmolds
						set actionzoneid='".$zactionzoneid."',
							updatedate=now(),
							updateuserid='".$wtwhandlers->userid."'
						where buildingmoldid='".$zbuildingmoldid."'
							and buildingid='".$zbuildingid."';");
					$zsuccess = true;
				}
			}			
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwbuildingmolds.php-saveBuildingMoldActionZone=".$e->getMessage());
		}
		return $zsuccess;
	}

}

	function wtwbuildingmolds() {
		return wtwbuildingmolds::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwbuildingmolds'] = wtwbuildingmolds();
?>
<?php
class wtwbuildingmolds {
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

	function saveBuildingMold($zbuildingmoldid, $zbuildingid, $zloadactionzoneid, $zshape, $zcovering, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zspecial1, $zspecial2, $zuoffset, $zvoffset, $zuscale, $zvscale, $zuploadobjectid, $zsubdivisions, $zreceiveshadows, $zgraphiclevel, $zvideoid, $zvideoposterid, $ztextureid, $ztexturebumpid, $zheightmapid, $zmixmapid, $ztexturerid, $ztexturegid, $ztexturebid, $ztexturebumprid, $ztexturebumpgid, $ztexturebumpbid, $zopacity, $zwaterreflection, $zactionzoneid, $zcsgmoldid, $zcsgaction, $zalttag, $zwebtext, $zwebstyle, $zmoldpath1points, $zmoldpath2points, $zdiffusecolorr, $zdiffusecolorg, $zdiffusecolorb, $zspecularcolorr, $zspecularcolorg, $zspecularcolorb, $zemissivecolorr, $zemissivecolorg, $zemissivecolorb, $zsoundid, $zsoundname, $zsoundattenuation, $zsoundloop, $zsoundmaxdistance, $zsoundrollofffactor, $zsoundrefdistance, $zsoundconeinnerangle, $zsoundconeouterangle, $zsoundconeoutergain, $zproductid, $zslug, $zcategoryid, $zallowsearch) {
		global $wtwiframes;
		try {
			if ($wtwiframes->checkUpdateAccess("", $zbuildingid, "")) {
				$zfoundbuildingmoldid = "";
				$zresults = $wtwiframes->query("
					select buildingmoldid 
					from ".wtw_tableprefix."buildingmolds 
					where buildingmoldid='".$zbuildingmoldid."'
						and not buildingmoldid=''
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundbuildingmoldid = $zrow["buildingmoldid"];
				}
				if (!empty($zfoundbuildingmoldid) && isset($zfoundbuildingmoldid)) {
					$wtwiframes->query("
						update ".wtw_tableprefix."buildingmolds
						set loadactionzoneid='".$zloadactionzoneid."',
							shape='".$zshape."',
							covering='".$zcovering."',
							positionx=".$wtwiframes->checkNumber($zpositionx,0).",
							positiony=".$wtwiframes->checkNumber($zpositiony,0).",
							positionz=".$wtwiframes->checkNumber($zpositionz,0).",
							scalingx=".$wtwiframes->checkNumber($zscalingx,1).",
							scalingy=".$wtwiframes->checkNumber($zscalingy,1).",
							scalingz=".$wtwiframes->checkNumber($zscalingz,1).",
							rotationx=".$wtwiframes->checkNumber($zrotationx,0).",
							rotationy=".$wtwiframes->checkNumber($zrotationy,0).",
							rotationz=".$wtwiframes->checkNumber($zrotationz,0).",
							special1=".$wtwiframes->checkNumber($zspecial1,0).",
							special2=".$wtwiframes->checkNumber($zspecial2,0).",
							uoffset=".$wtwiframes->checkNumber($zuoffset,0).",
							voffset=".$wtwiframes->checkNumber($zvoffset,0).",
							uscale=".$wtwiframes->checkNumber($zuscale,0).",
							vscale=".$wtwiframes->checkNumber($zvscale,0).",
							uploadobjectid='".$zuploadobjectid."',
							subdivisions=".$wtwiframes->checkNumber($zsubdivisions,12).",
							receiveshadows=".$wtwiframes->checkNumber($zreceiveshadows,0).",
							graphiclevel=".$wtwiframes->checkNumber($zgraphiclevel,0).",
							videoid='".$zvideoid."',
							videoposterid='".$zvideoposterid."',
							textureid='".$ztextureid."',
							texturebumpid='".$ztexturebumpid."',
							opacity=".$wtwiframes->checkNumber($zopacity,100).",
							waterreflection=".$wtwiframes->checkNumber($zwaterreflection,0).",
							actionzoneid='".$zactionzoneid."',
							csgmoldid='".$zcsgmoldid."',
							csgaction='".$zcsgaction."',
							alttag='".$zalttag."',
							webtext='".$zwebtext."',
							webstyle='".$zwebstyle."',
							diffusecolorr=".$wtwiframes->checkNumber($zdiffusecolorr,1).",
							diffusecolorg=".$wtwiframes->checkNumber($zdiffusecolorg,1).",
							diffusecolorb=".$wtwiframes->checkNumber($zdiffusecolorb,1).",
							specularcolorr=".$wtwiframes->checkNumber($zspecularcolorr,1).",
							specularcolorg=".$wtwiframes->checkNumber($zspecularcolorg,1).",
							specularcolorb=".$wtwiframes->checkNumber($zspecularcolorb,1).",
							emissivecolorr=".$wtwiframes->checkNumber($zemissivecolorr,1).",
							emissivecolorg=".$wtwiframes->checkNumber($zemissivecolorg,1).",
							emissivecolorb=".$wtwiframes->checkNumber($zemissivecolorb,1).",
							soundid='".$zsoundid."',
							soundname='".$zsoundname."',
							soundattenuation='".$zsoundattenuation."',
							soundloop=".$wtwiframes->checkNumber($zsoundloop,1).",
							soundmaxdistance=".$wtwiframes->checkNumber($zsoundmaxdistance,100).",
							soundrollofffactor=".$wtwiframes->checkNumber($zsoundrollofffactor,1).",
							soundrefdistance=".$wtwiframes->checkNumber($zsoundrefdistance,1).",
							soundconeinnerangle=".$wtwiframes->checkNumber($zsoundconeinnerangle,90).",
							soundconeouterangle=".$wtwiframes->checkNumber($zsoundconeouterangle,180).",
							soundconeoutergain=".$wtwiframes->checkNumber($zsoundconeoutergain,1).",
							productid='".$zproductid."',
							slug='".$zslug."',
							categoryid='".$zcategoryid."',
							allowsearch=".$wtwiframes->checkNumber($zallowsearch,1).",
							updatedate=now(),
							updateuserid='".$wtwiframes->userid."'
						where buildingmoldid='".$zbuildingmoldid."'
							and buildingid='".$zbuildingid."';");
				} else {
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
							uploadobjectid,
							subdivisions,
							receiveshadows,
							graphiclevel,
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
							diffusecolorr,
							diffusecolorg,
							diffusecolorb,
							specularcolorr,
							specularcolorg,
							specularcolorb,
							emissivecolorr,
							emissivecolorg,
							emissivecolorb,
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
							productid,
							slug,
							categoryid,
							allowsearch,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$zbuildingmoldid."',
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
							".$wtwiframes->checkNumber($zsubdivisions,12).",
							".$wtwiframes->checkNumber($zreceiveshadows,0).",
							".$wtwiframes->checkNumber($zgraphiclevel,0).",
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
							".$wtwiframes->checkNumber($zopacity,100).",
							".$wtwiframes->checkNumber($zwaterreflection,0).",
							'".$zactionzoneid."',
							'".$zcsgmoldid."',
							'".$zcsgaction."',
							'".$zalttag."',
							'".$zwebtext."',
							'".$zwebstyle."',
							".$wtwiframes->checkNumber($zdiffusecolorr,1).",
							".$wtwiframes->checkNumber($zdiffusecolorg,1).",
							".$wtwiframes->checkNumber($zdiffusecolorb,1).",
							".$wtwiframes->checkNumber($zspecularcolorr,1).",
							".$wtwiframes->checkNumber($zspecularcolorg,1).",
							".$wtwiframes->checkNumber($zspecularcolorb,1).",
							".$wtwiframes->checkNumber($zemissivecolorr,1).",
							".$wtwiframes->checkNumber($zemissivecolorg,1).",
							".$wtwiframes->checkNumber($zemissivecolorb,1).",
							'".$zsoundid."',
							'".$zsoundname."',
							'".$zsoundattenuation."',
							".$wtwiframes->checkNumber($zsoundloop,1).",
							".$wtwiframes->checkNumber($zsoundmaxdistance,100).",
							".$wtwiframes->checkNumber($zsoundrollofffactor,1).",
							".$wtwiframes->checkNumber($zsoundrefdistance,1).",
							".$wtwiframes->checkNumber($zsoundconeinnerangle,90).",
							".$wtwiframes->checkNumber($zsoundconeouterangle,180).",
							".$wtwiframes->checkNumber($zsoundconeoutergain,1).",
							'".$zproductid."',
							'".$zslug."',
							'".$zcategoryid."',
							".$wtwiframes->checkNumber($zallowsearch,1).",
							now(),
							'".$wtwiframes->userid."',
							now(),
							'".$wtwiframes->userid."');");
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
			serror("core-functions-class_wtwbuildingmolds.php-saveBuildingMold=".$e->getMessage());
		}
		return $zbuildingmoldid;
	}

	function deleteBuildingMold($zbuildingmoldid, $zbuildingid, $zdeleted) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->checkUpdateAccess("", $zbuildingid, "")) {
				if ($zdeleted == "0" || $zdeleted == 0) {
					$wtwiframes->query("
						update ".wtw_tableprefix."buildingmolds
						set deleted=0,
							deleteddate=null,
							deleteduserid=''
						where
							buildingmoldid='".$zbuildingmoldid."'
							and buildingid='".$zbuildingid."';");
					$zsuccess = true;
				} else if (!empty($zdeleted) && isset($zdeleted) && is_numeric($zdeleted)) {
					$wtwiframes->query("
						update ".wtw_tableprefix."buildingmolds
						set deleted=".$zdeleted.",
							deleteddate=now(),
							deleteduserid='".$wtwiframes->userid."'
						where
							buildingmoldid='".$zbuildingmoldid."'
							and buildingid='".$zbuildingid."';");
					$wtwiframes->query("
						update ".wtw_tableprefix."webimages
						set deleted=".$zdeleted.",
							deleteddate=now(),
							deleteduserid='".$wtwiframes->userid."'
						where buildingmoldid='".$zbuildingmoldid."'
							and not buildingmold='';");
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			serror("core-functions-class_wtwbuildingmolds.php-deleteBuildingMold=".$e->getMessage());
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
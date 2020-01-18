<?php
class wtwcommunitymolds {
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
	function saveCommunityMold($zcommunitymoldid, $zcommunityid, $zloadactionzoneid, $zshape, $zcovering, $zpositionx, $zpositiony, $zpositionz, $zscalingx, $zscalingy, $zscalingz, $zrotationx, $zrotationy, $zrotationz, $zspecial1, $zspecial2, $zuoffset, $zvoffset, $zuscale, $zvscale, $zuploadobjectid, $zreceiveshadows, $zgraphiclevel, $zvideoid, $zvideoposterid, $ztextureid, $ztexturebumpid, $zheightmapid, $zmixmapid, $ztexturerid, $ztexturegid, $ztexturebid, $ztexturebumprid, $ztexturebumpgid, $ztexturebumpbid, $zopacity, $zwaterreflection, $zsubdivisions, $zminheight, $zmaxheight, $zcheckcollisions, $zispickable, $zactionzoneid, $zcsgmoldid, $zcsgaction, $zalttag, $zwebtext, $zwebstyle, $zmoldpath1points, $zmoldpath2points, $zdiffusecolorr, $zdiffusecolorg, $zdiffusecolorb, $zspecularcolorr, $zspecularcolorg, $zspecularcolorb, $zemissivecolorr, $zemissivecolorg, $zemissivecolorb, $zsoundid, $zsoundname, $zsoundattenuation, $zsoundloop, $zsoundmaxdistance, $zsoundrollofffactor, $zsoundrefdistance, $zsoundconeinnerangle, $zsoundconeouterangle, $zsoundconeoutergain) {
		global $wtwhandlers;
		try {
			if ($wtwhandlers->checkUpdateAccess($zcommunityid, "", "")) {
				$zfoundcommunitymoldid = "";
				$zresults = $wtwhandlers->query("
					select communitymoldid 
					from ".wtw_tableprefix."communitymolds 
					where communitymoldid='".$zcommunitymoldid."'
						and not communitymoldid=''
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundcommunitymoldid = $zrow["communitymoldid"];
				}
				if (!empty($zfoundcommunitymoldid) && isset($zfoundcommunitymoldid)) {
					$wtwhandlers->query("
						update ".wtw_tableprefix."communitymolds
						set loadactionzoneid='".$zloadactionzoneid."',
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
							diffusecolorr=".$wtwhandlers->checkNumber($zdiffusecolorr,1).",
							diffusecolorg=".$wtwhandlers->checkNumber($zdiffusecolorg,1).",
							diffusecolorb=".$wtwhandlers->checkNumber($zdiffusecolorb,1).",
							specularcolorr=".$wtwhandlers->checkNumber($zspecularcolorr,1).",
							specularcolorg=".$wtwhandlers->checkNumber($zspecularcolorg,1).",
							specularcolorb=".$wtwhandlers->checkNumber($zspecularcolorb,1).",
							emissivecolorr=".$wtwhandlers->checkNumber($zemissivecolorr,1).",
							emissivecolorg=".$wtwhandlers->checkNumber($zemissivecolorg,1).",
							emissivecolorb=".$wtwhandlers->checkNumber($zemissivecolorb,1).",
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
						where communitymoldid='".$zcommunitymoldid."'
							and communityid='".$zcommunityid."';");
				} else {
					if (empty($zcommunitymoldid) || !isset($zcommunitymoldid)) {
						$zcommunitymoldid = $wtwhandlers->getRandomString(16,1);
					}
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."communitymolds
						   (communitymoldid,
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
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						values
						   ('".$zcommunitymoldid."',
							'".$zcommunityid."',
							'".$zloadactionzoneid."',
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
							".$wtwhandlers->checkNumber($zdiffusecolorr,1).",
							".$wtwhandlers->checkNumber($zdiffusecolorg,1).",
							".$wtwhandlers->checkNumber($zdiffusecolorb,1).",
							".$wtwhandlers->checkNumber($zspecularcolorr,1).",
							".$wtwhandlers->checkNumber($zspecularcolorg,1).",
							".$wtwhandlers->checkNumber($zspecularcolorb,1).",
							".$wtwhandlers->checkNumber($zemissivecolorr,1).",
							".$wtwhandlers->checkNumber($zemissivecolorg,1).",
							".$wtwhandlers->checkNumber($zemissivecolorb,1).",
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
			
			/* CHECK COMMUNITY ACTION ZONE */
			
			global $wtwmoldscommon;
			if ($zshape == "tube" || $zshape == "line" || $zshape == "ribbon") {
				$wtwmoldscommon->savePathPoints($zcommunityid, '', '', $zcommunitymoldid, 1, $zmoldpath1points);
			}
			if ($zshape == "ribbon") {
				$wtwmoldscommon->savePathPoints($zcommunityid, '', '', $zcommunitymoldid, 2, $zmoldpath2points);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunitymolds.php-saveCommunityMold=".$e->getMessage());
		}
		return $zcommunitymoldid;
	}

	function deleteCommunityMold($zcommunitymoldid, $zcommunityid, $zdeleted) {
		global $wtwhandlers;
		$zsuccess = false;
		try {
			if ($wtwhandlers->checkUpdateAccess($zcommunityid, "", "")) {
				if (isset($zdeleted)) {
					if ($zdeleted == "0" || $zdeleted == 0) {
						$wtwhandlers->query("
							update ".wtw_tableprefix."communitymolds
							set deleted=0,
								deleteddate=null,
								deleteduserid=''
							where
								communitymoldid='".$zcommunitymoldid."'
								and communityid='".$zcommunityid."';");
						$zsuccess = true;
					} else if (!empty($zdeleted) && is_numeric($zdeleted)) {
						$wtwhandlers->query("
							update ".wtw_tableprefix."communitymolds
							set deleted=".$zdeleted.",
								deleteddate=now(),
								deleteduserid='".$wtwhandlers->userid."'
							where
								communitymoldid='".$zcommunitymoldid."'
								and communityid='".$zcommunityid."';");
						$wtwhandlers->query("
							update ".wtw_tableprefix."webimages
							set deleted=".$zdeleted.",
								deleteddate=now(),
								deleteduserid='".$wtwhandlers->userid."'
							where communitymoldid='".$zcommunitymoldid."'
								and not communitymold='';");
						$zsuccess = true;
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwcommunitymolds.php-deleteCommunityMold=".$e->getMessage());
		}
		return $zsuccess;
	}
}

	function wtwcommunitymolds() {
		return wtwcommunitymolds::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwcommunitymolds'] = wtwcommunitymolds();
?>
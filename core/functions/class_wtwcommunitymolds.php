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
		global $wtwiframes;
		try {
			if ($wtwiframes->checkUpdateAccess($zcommunityid, "", "")) {
				$zfoundcommunitymoldid = "";
				$zresults = $wtwiframes->query("
					select communitymoldid 
					from ".wtw_tableprefix."communitymolds 
					where communitymoldid='".$zcommunitymoldid."'
						and not communitymoldid=''
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundcommunitymoldid = $zrow["communitymoldid"];
				}
				if (!empty($zfoundcommunitymoldid) && isset($zfoundcommunitymoldid)) {
					$wtwiframes->query("
						update ".wtw_tableprefix."communitymolds
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
							updatedate=now(),
							updateuserid='".$wtwiframes->userid."'
						where communitymoldid='".$zcommunitymoldid."'
							and communityid='".$zcommunityid."';");
				} else {
					$zcommunitymoldid = $wtwiframes->getRandomString(16,1);
					$wtwiframes->query("
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
							now(),
							'".$wtwiframes->userid."',
							now(),
							'".$wtwiframes->userid."');");
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
			$wtwiframes->serror("core-functions-class_wtwcommunitymolds.php-saveCommunityMold=".$e->getMessage());
		}
		return $zcommunitymoldid;
	}

	function deleteCommunityMold($zcommunitymoldid, $zcommunityid, $zdeleted) {
		global $wtwiframes;
		$zsuccess = false;
		try {
			if ($wtwiframes->checkUpdateAccess($zcommunityid, "", "")) {
				if (isset($zdeleted)) {
					if ($zdeleted == "0" || $zdeleted == 0) {
						$wtwiframes->query("
							update ".wtw_tableprefix."communitymolds
							set deleted=0,
								deleteddate=null,
								deleteduserid=''
							where
								communitymoldid='".$zcommunitymoldid."'
								and communityid='".$zcommunityid."';");
						$zsuccess = true;
					} else if (!empty($zdeleted) && is_numeric($zdeleted)) {
						$wtwiframes->query("
							update ".wtw_tableprefix."communitymolds
							set deleted=".$zdeleted.",
								deleteddate=now(),
								deleteduserid='".$wtwiframes->userid."'
							where
								communitymoldid='".$zcommunitymoldid."'
								and communityid='".$zcommunityid."';");
						$wtwiframes->query("
							update ".wtw_tableprefix."webimages
							set deleted=".$zdeleted.",
								deleteddate=now(),
								deleteduserid='".$wtwiframes->userid."'
							where communitymoldid='".$zcommunitymoldid."'
								and not communitymold='';");
						$zsuccess = true;
					}
				}
			}
		} catch (Exception $e) {
			$wtwiframes->serror("core-functions-class_wtwcommunitymolds.php-deleteCommunityMold=".$e->getMessage());
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
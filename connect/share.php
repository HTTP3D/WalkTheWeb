<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides shared 3D Community, 3D Building, and 3D Thing information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;

$zuploads = array();
$zupload = 0;
$zuploadobjects = array();
$zuploadobject = 0;
$zscripts = array();
$zscript = 0;
$zavataranimations = array();
$zavataranimation = 0;
$zusers = array();
$zuser = 0;

function addUploadID($zuploadid, $zrecursive) {
	global $wtwconnect;
	try {
		global $zuploads;
		global $zupload;
		if (!empty($zuploadid) && isset($zuploadid)) {
			$zfound = false;
			foreach ($zuploads as $zrowup) {
				if ($zrowup["uploadid"] == $zuploadid) {
					$zfound = true;
				}
			}
			if (!$zfound) {
				/* select upload file data */
				$zresults = $wtwconnect->query("
					select * 
					from ".wtw_tableprefix."uploads
					where uploadid='".$zuploadid."'
					and deleted=0;");
				foreach ($zresults as $zrow) {
					$zfilepath = $zrow["filepath"];
					if (!empty($zfilepath) && isset($zfilepath)) {
						if (substr($zfilepath, 0, 4) != "http") {
							$zfilepath = $wtwconnect->domainurl.$zfilepath;
						}
					}
					$zuploads[$zupload] = array (
						'uploadid'=>$zrow["uploadid"],
						'pastuploadid'=>$zrow["pastuploadid"],
						'originalid'=>$zrow["originalid"],
						'websizeid'=>$zrow["websizeid"],
						'thumbnailid'=>$zrow["thumbnailid"],
						'userid'=>$zrow["userid"],
						'filetitle'=>htmlspecialchars($zrow["filetitle"], ENT_QUOTES, 'UTF-8'),
						'filename'=>$zrow["filename"],
						'fileextension'=>$zrow["fileextension"],
						'filesize'=>$zrow["filesize"],
						'filetype'=>$zrow["filetype"],
						'filepath'=>$zfilepath,
						'filedata'=>$zrow["filedata"],
						'imagewidth'=>$zrow["imagewidth"],
						'imageheight'=>$zrow["imageheight"],
						'stock'=>$zrow["stock"],
						'hidedate'=>$zrow["hidedate"],
						'hideuserid'=>$zrow["hideuserid"],
						'hide'=>$zrow["hide"],
						'checkeddate'=>$zrow["checkeddate"],
						'checkeduserid'=>$zrow["checkeduserid"],
						'checked'=>$zrow["checked"],
						'createdate'=>$zrow["createdate"],
						'createuserid'=>$zrow["createuserid"],
						'updatedate'=>$zrow["updatedate"],
						'updateuserid'=>$zrow["updateuserid"]
					);
					$zupload += 1;
					if ($zrecursive) {
						if ($zrow["originalid"] != $zuploadid) {
							addUploadID($zrow["originalid"], false);
						}
						if ($zrow["websizeid"] != $zuploadid) {
							addUploadID($zrow["websizeid"], false);
						}
						if ($zrow["thumbnailid"] != $zuploadid) {
							addUploadID($zrow["thumbnailid"], false);
						}
					}
					addUserID($zrow["userid"]);
					addUserID($zrow["createuserid"]);
					addUserID($zrow["updateuserid"]);
				}
			}
		}
	} catch (Exception $e) {
		$wtwconnect->serror("connect-share.php-addUploadID=".$e->getMessage());
	}
}

function addUploadObjectID($zuploadobjectid) {
	global $wtwconnect;
	try {
		global $zuploadobjects;
		global $zuploadobject;
		if (!empty($zuploadobjectid) && isset($zuploadobjectid)) {
			$zfound = false;
			foreach ($zuploadobjects as $zrowuo) {
				if ($zrowuo["uploadobjectid"] == $zuploadobjectid) {
					$zfound = true;
				}
			}
			if (!$zfound) {
				/* select object upload data */
				$zresults = $wtwconnect->query("
					select * from ".wtw_tableprefix."uploadobjects
					where uploadobjectid='".$zuploadobjectid."'
						and deleted=0
					limit 1;");
				foreach ($zresults as $zrow) {
					/* get list of uploaded objects in folder */
					$zobjectfiles = array();
					if (!empty($zrow["objectfolder"]) && isset($zrow["objectfolder"])) {
						$zfiles = 0;
						$zdir = str_replace('/content',$wtwconnect->contentpath,$zrow["objectfolder"]);
						$zdir = rtrim($zdir, "/");
						if (is_dir($zdir)) {
							if ($zdh = opendir($zdir)) {
								while (($zfile = readdir($zdh)) !== false) {
									if ($zfile != '.' && $zfile != '..') {
										$zobjectfiles[$zfiles] = array(
											'filename'=>$zfile,
											'filepath'=>$wtwconnect->domainurl.$zrow["objectfolder"].$zfile
											);
										$zfiles += 1;
									}
								}
								closedir($zdh);
							}
						}
					}
					
					/* get uploaded objects animations */
					$zresultsuoanim = $wtwconnect->query("
						select *
						from ".wtw_tableprefix."uploadobjectanimations
						where uploadobjectid='".$zrow["uploadobjectid"]."'
							and deleted=0;");
					$zuoanim = 0;
					$zuploadobjectanimations = array();
					foreach ($zresultsuoanim as $zrowuoanim) {
						$zuploadobjectanimations[$zuoanim] = array(
							'objectanimationid'=>$zrowuoanim["objectanimationid"],
							'uploadobjectid'=>$zrowuoanim["uploadobjectid"],
							'userid'=>$zrowuoanim["userid"],
							'animationname'=>htmlspecialchars($zrowuoanim["animationname"], ENT_QUOTES, 'UTF-8'),
							'moldnamepart'=>htmlspecialchars($zrowuoanim["moldnamepart"], ENT_QUOTES, 'UTF-8'),
							'moldevent'=>$zrowuoanim["moldevent"],
							'startframe'=>$zrowuoanim["startframe"],
							'endframe'=>$zrowuoanim["endframe"],
							'animationloop'=>$zrowuoanim["animationloop"],
							'speedratio'=>$zrowuoanim["speedratio"],
							'animationendscript'=>$zrowuoanim["animationendscript"],
							'animationendparameters'=>$zrowuoanim["animationendparameters"],
							'stopcurrentanimations'=>$zrowuoanim["stopcurrentanimations"],
							'additionalscript'=>$zrowuoanim["additionalscript"],
							'additionalparameters'=>$zrowuoanim["additionalparameters"],
							'soundid'=>$zrowuoanim["soundid"],
							'soundmaxdistance'=>$zrowuoanim["soundmaxdistance"],
							'createdate'=>$zrowuoanim["createdate"],
							'createuserid'=>$zrowuoanim["createuserid"],
							'updatedate'=>$zrowuoanim["updatedate"],
							'updateuserid'=>$zrowuoanim["updateuserid"]
						);
						$zuoanim += 1;
						addUploadID($zrowuoanim["soundid"], false);
						addUserID($zrowuoanim["userid"]);
						addUserID($zrowuoanim["createuserid"]);
						addUserID($zrowuoanim["updateuserid"]);
					}			
					
					/* set upload objects array */
					$zuploadobjects[$zuploadobject] = array (
						'uploadobjectid'=>$zrow["uploadobjectid"],
						'userid'=>$zrow["userid"],
						'objectfolder'=>$wtwconnect->domainurl.$zrow["objectfolder"],
						'objectfile'=>$zrow["objectfile"],
						'stock'=>$zrow["stock"],
						'createdate'=>$zrow["createdate"],
						'createuserid'=>$zrow["createuserid"],
						'updatedate'=>$zrow["updatedate"],
						'updateuserid'=>$zrow["updateuserid"],
						'objectfiles'=>$zobjectfiles,
						'uploadobjectanimations'=>$zuploadobjectanimations
					);
					$zuploadobject += 1;
					addUserID($zrow["userid"]);
					addUserID($zrow["createuserid"]);
					addUserID($zrow["updateuserid"]);
				}
			}
		}
	} catch (Exception $e) {
		$wtwconnect->serror("connect-share.php-addUploadObjectID=".$e->getMessage());
	}
}

function addScriptID($zscriptid, $zscripturl) {
	global $wtwconnect;
	try {
		global $zscripts;
		global $zscript;
		if (!empty($zscriptid) && isset($zscriptid)) {
			$zfound = false;
			foreach ($zscripts as $zrowscript) {
				if ($zrowscript["scriptid"] == $zscriptid) {
					$zfound = true;
				}
			}
			if (!$zfound) {
				/* select script */
				$zresults = $wtwconnect->query("
					select * 
					from ".wtw_tableprefix."scripts
					where scriptid='".$zscriptid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zscripts[$zscript] = array (
						'scriptid'=>$zrow["scriptid"],
						'pastscriptid'=>$zrow["pastscriptid"],
						'actionzoneid'=>$zrow["actionzoneid"],
						'webtype'=>$zrow["webtype"],
						'webid'=>$zrow["webid"],
						'scriptname'=>$zrow["scriptname"],
						'scriptfilename'=>$zrow["scriptpath"],
						'scriptpath'=>$zscripturl.$zrow["scriptpath"],
						'createdate'=>$zrow["createdate"],
						'createuserid'=>$zrow["createuserid"],
						'updatedate'=>$zrow["updatedate"],
						'updateuserid'=>$zrow["updateuserid"]
					);
					$zscript += 1;
					addUserID($zrow["createuserid"]);
					addUserID($zrow["updateuserid"]);
				}
			}
		}
	} catch (Exception $e) {
		$wtwconnect->serror("connect-share.php-addScriptID=".$e->getMessage());
	}
}

function addAvatarAnimationID($zavataranimationid) {
	global $wtwconnect;
	try {
		global $zavataranimations;
		global $zavataranimation;
		if (!empty($zavataranimationid) && isset($zavataranimationid)) {
			$zfound = false;
			foreach ($zavataranimations as $zrowanim) {
				if ($zrowanim["avataranimationid"] == $zavataranimationid) {
					$zfound = true;
				}
			}
			if (!$zfound) {
				/* select avatar animations */
				$zresults = $wtwconnect->query("
					select * 
					from ".wtw_tableprefix."avataranimations
					where avataranimationid='".$zavataranimationid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zanimationicon = '';
					if (!empty($zrow["animationicon"])) {
						$zanimationicon = $wtwconnect->domainurl.$zrow["animationicon"];
					}
					
					$zavataranimations[$zavataranimation] = array (
						'avataranimationid'=>$zrow["avataranimationid"],
						'pastavataranimationid'=>$zrow["pastavataranimationid"],
						'avatarid'=>$zrow["avatarid"],
						'userid'=>$zrow["userid"],
						'loadpriority'=>$zrow["loadpriority"],
						'animationevent'=>$zrow["animationevent"],
						'animationfriendlyname'=>$zrow["animationfriendlyname"],
						'setdefault'=>$zrow["setdefault"],
						'animationicon'=>$zanimationicon,
						'objectfolder'=>$wtwconnect->domainurl.$zrow["objectfolder"],
						'objectfile'=>$zrow["objectfile"],
						'startframe'=>$zrow["startframe"],
						'endframe'=>$zrow["endframe"],
						'animationloop'=>$zrow["animationloop"],
						'speedratio'=>$zrow["speedratio"],
						'soundid'=>$zrow["soundid"],
						'soundmaxdistance'=>$zrow["soundmaxdistance"],
						'createdate'=>$zrow["createdate"],
						'createuserid'=>$zrow["createuserid"],
						'updatedate'=>$zrow["updatedate"],
						'updateuserid'=>$zrow["updateuserid"]
					);
					$zavataranimation += 1;
					addUploadID($zrow["soundid"], false);
					addUserID($zrow["userid"]);
					addUserID($zrow["createuserid"]);
					addUserID($zrow["updateuserid"]);
				}
			}
		}
	} catch (Exception $e) {
		$wtwconnect->serror("connect-share.php-addAvatarAnimationID=".$e->getMessage());
	}
}

function addUserID($zuserid) {
	global $wtwconnect;
	try {
		global $zusers;
		global $zuser;
		if (!empty($zuserid) && isset($zuserid)) {
			$zfound = false;
			foreach ($zusers as $zrowup) {
				if ($zrowup["userid"] == $zuserid) {
					$zfound = true;
				}
			}
			if (!$zfound) {
				/* select user */
				$zresults = $wtwconnect->query("
					select * 
					from ".wtw_tableprefix."users
					where userid='".$zuserid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zusers[$zuser] = array (
						'userid'=>$zrow["userid"],
						'username'=>htmlspecialchars($zrow["username"], ENT_QUOTES, 'UTF-8'),
						'displayname'=>htmlspecialchars($zrow["displayname"], ENT_QUOTES, 'UTF-8'),
						'email'=>$zrow["email"],
						'uploadpathid'=>$zrow["uploadpathid"]
					);
					$zuser += 1;
				}
			}
		}
	} catch (Exception $e) {
		$wtwconnect->serror("connect-share.php-addUserID=".$e->getMessage());
	}
}

try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/share.php");
	
	/* get values from querystring or session */
	$zwebid = $wtwconnect->getVal('webid','');
	$zwebtype = $wtwconnect->getVal('webtype','');
	$zuserid = $wtwconnect->getVal('userid','');
	$zsharehash = $wtwconnect->getVal('sharehash','');

	$zwebtypes = '';
	switch ($zwebtype) {
		case "community":
			$zwebtypes = 'communities';
			break;
		case "building":
			$zwebtypes = 'buildings';
			break;
		case "thing":
			$zwebtypes = 'things';
			break;
	}

	$zresponse = array();

	addUserID($zuserid);
	
//	echo $wtwconnect->addConnectHeader('*');
	header('Access-Control-Allow-Origin: *');
	header('Content-type: application/json');
	
	if (!empty($zwebtypes)) {
		/* get 3D Web */
		$zresults = $wtwconnect->query("
			select *
			from ".wtw_tableprefix.$zwebtypes."
			where ".$zwebtype."id='".$zwebid."'
				and shareuserid='".$zuserid."'
				and sharehash='".$zsharehash."'
				and deleted=0
			limit 1;");
		
		/* format json return dataset */
		foreach ($zresults as $zrow) {
			/* get parent connecting grids */
			$zresultscg = $wtwconnect->query("
				select *
				from ".wtw_tableprefix."connectinggrids
				where childwebid='".$zwebid."'
					and parentwebid=''
					and deleted=0;");
			$zcg = 0;
			$zconnectinggrids = array();
			foreach ($zresultscg as $zrowcg) {
				$zconnectinggrids[$zcg] = array(
					'connectinggridid'=>$zrowcg["connectinggridid"],
					'pastconnectinggridid'=>$zrowcg["pastconnectinggridid"],
					'parentwebid'=>$zrowcg["parentwebid"],
					'parentwebtype'=>$zrowcg["parentwebtype"],
					'childwebid'=>$zrowcg["childwebid"],
					'childwebtype'=>$zrowcg["childwebtype"],
					'positionx'=>$zrowcg["positionx"],
					'positiony'=>$zrowcg["positiony"],
					'positionz'=>$zrowcg["positionz"],
					'scalingx'=>$zrowcg["scalingx"],
					'scalingy'=>$zrowcg["scalingy"],
					'scalingz'=>$zrowcg["scalingz"],
					'rotationx'=>$zrowcg["rotationx"],
					'rotationy'=>$zrowcg["rotationy"],
					'rotationz'=>$zrowcg["rotationz"],
					'loadactionzoneid'=>$zrowcg["loadactionzoneid"],
					'altloadactionzoneid'=>$zrowcg["altloadactionzoneid"],
					'unloadactionzoneid'=>$zrowcg["unloadactionzoneid"],
					'attachactionzoneid'=>$zrowcg["attachactionzoneid"],
					'alttag'=>htmlspecialchars($zrowcg["alttag"], ENT_QUOTES, 'UTF-8'),
					'createdate'=>$zrowcg["createdate"],
					'createuserid'=>$zrowcg["createuserid"],
					'updatedate'=>$zrowcg["updatedate"],
					'updateuserid'=>$zrowcg["updateuserid"]
				);
				$zcg += 1;
				addUserID($zrowcg["createuserid"]);
				addUserID($zrowcg["updateuserid"]);
			}

			/* get child connecting grids */
			$zresultscg = $wtwconnect->query("
				select *
				from ".wtw_tableprefix."connectinggrids
				where parentwebid='".$zwebid."'
					and deleted=0;");
			$zcg = 0;
			$zchildconnectinggrids = array();
			foreach ($zresultscg as $zrowcg) {
				$zchildconnectinggrids[$zcg] = array(
					'connectinggridid'=>$zrowcg["connectinggridid"],
					'pastconnectinggridid'=>$zrowcg["pastconnectinggridid"],
					'parentwebid'=>$zrowcg["parentwebid"],
					'parentwebtype'=>$zrowcg["parentwebtype"],
					'childwebid'=>$zrowcg["childwebid"],
					'childwebtype'=>$zrowcg["childwebtype"],
					'positionx'=>$zrowcg["positionx"],
					'positiony'=>$zrowcg["positiony"],
					'positionz'=>$zrowcg["positionz"],
					'scalingx'=>$zrowcg["scalingx"],
					'scalingy'=>$zrowcg["scalingy"],
					'scalingz'=>$zrowcg["scalingz"],
					'rotationx'=>$zrowcg["rotationx"],
					'rotationy'=>$zrowcg["rotationy"],
					'rotationz'=>$zrowcg["rotationz"],
					'loadactionzoneid'=>$zrowcg["loadactionzoneid"],
					'altloadactionzoneid'=>$zrowcg["altloadactionzoneid"],
					'unloadactionzoneid'=>$zrowcg["unloadactionzoneid"],
					'attachactionzoneid'=>$zrowcg["attachactionzoneid"],
					'alttag'=>htmlspecialchars($zrowcg["alttag"], ENT_QUOTES, 'UTF-8'),
					'createdate'=>$zrowcg["createdate"],
					'createuserid'=>$zrowcg["createuserid"],
					'updatedate'=>$zrowcg["updatedate"],
					'updateuserid'=>$zrowcg["updateuserid"]
				);
				$zcg += 1;
				addUserID($zrowcg["createuserid"]);
				addUserID($zrowcg["updateuserid"]);
			}

			/* get action zones */
			$zresultsaz = $wtwconnect->query("
				select *
				from ".wtw_tableprefix."actionzones
				where ".$zwebtype."id='".$zwebid."'
					and deleted=0;");
			$zaz = 0;
			$zactionzones = array();
			foreach ($zresultsaz as $zrowaz) {

				/* get action zone animations */
				$zresultsazanim = $wtwconnect->query("
					select *
					from ".wtw_tableprefix."actionzoneanimations
					where actionzoneid='".$zrowaz["actionzoneid"]."'
						and deleted=0;");
				$zazanim = 0;
				$zazanimations = array();
				foreach ($zresultsazanim as $zrowsazanim) {
					$zazanimations[$zazanim] = array(
						'actionzoneanimationid'=>$zrowsazanim["actionzoneanimationid"],
						'actionzoneid'=>$zrowsazanim["actionzoneid"],
						'avataranimationid'=>$zrowsazanim["avataranimationid"],
						'createdate'=>$zrowsazanim["createdate"],
						'createuserid'=>$zrowsazanim["createuserid"],
						'updatedate'=>$zrowsazanim["updatedate"],
						'updateuserid'=>$zrowsazanim["updateuserid"]
					);
					$zazanim += 1;
					addAvatarAnimationID($zrowsazanim["avataranimationid"]);				
					addUserID($zrowsazanim["createuserid"]);
					addUserID($zrowsazanim["updateuserid"]);
				}
				
				/* get scripts */			
				$zresultsscripts = $wtwconnect->query("
					select *
					from ".wtw_tableprefix."scripts
					where webid='".$zwebid."'
						and actionzoneid='".$zrowaz["actionzoneid"]."'
						and deleted=0;");
				foreach ($zresultsscripts as $zrowscripts) {
					addScriptID($zrowscripts["scriptid"], $wtwconnect->domainurl."/content/uploads/".$zwebtypes."/".$zwebid."/");
				}
				
				/* add action zone to action zones array */
				$zactionzones[$zaz] = array(
					'actionzoneid'=>$zrowaz["actionzoneid"],
					'pastactionzoneid'=>$zrowaz["pastactionzoneid"],
					'communityid'=>$zrowaz["communityid"],
					'buildingid'=>$zrowaz["buildingid"],
					'thingid'=>$zrowaz["thingid"],
					'attachmoldid'=>$zrowaz["attachmoldid"],
					'loadactionzoneid'=>$zrowaz["loadactionzoneid"],
					'parentactionzoneid'=>$zrowaz["parentactionzoneid"],
					'actionzonename'=>htmlspecialchars($zrowaz["actionzonename"], ENT_QUOTES, 'UTF-8'),
					'actionzonetype'=>$zrowaz["actionzonetype"],
					'actionzoneshape'=>$zrowaz["actionzoneshape"],
					'movementtype'=>$zrowaz["movementtype"],
					'movementdistance'=>$zrowaz["movementdistance"],
					'positionx'=>$zrowaz["positionx"],
					'positiony'=>$zrowaz["positiony"],
					'positionz'=>$zrowaz["positionz"],
					'scalingx'=>$zrowaz["scalingx"],
					'scalingy'=>$zrowaz["scalingy"],
					'scalingz'=>$zrowaz["scalingz"],
					'rotationx'=>$zrowaz["rotationx"],
					'rotationy'=>$zrowaz["rotationy"],
					'rotationz'=>$zrowaz["rotationz"],
					'axispositionx'=>$zrowaz["axispositionx"],
					'axispositiony'=>$zrowaz["axispositiony"],
					'axispositionz'=>$zrowaz["axispositionz"],
					'axisrotationx'=>$zrowaz["axisrotationx"],
					'axisrotationy'=>$zrowaz["axisrotationy"],
					'axisrotationz'=>$zrowaz["axisrotationz"],
					'rotateaxis'=>$zrowaz["rotateaxis"],
					'rotatedegrees'=>$zrowaz["rotatedegrees"],
					'rotatedirection'=>$zrowaz["rotatedirection"],
					'rotatespeed'=>$zrowaz["rotatespeed"],
					'jsfunction'=>$zrowaz["jsfunction"],
					'jsparameters'=>$zrowaz["jsparameters"],
					'animations'=>$zazanimations,
					'createdate'=>$zrowaz["createdate"],
					'createuserid'=>$zrowaz["createuserid"],
					'updatedate'=>$zrowaz["updatedate"],
					'updateuserid'=>$zrowaz["updateuserid"]
				);
				$zaz += 1;
				addUserID($zrowaz["createuserid"]);
				addUserID($zrowaz["updateuserid"]);
			}

			/* get molds */
			$zresultsmolds = $wtwconnect->query("
				select *
				from ".wtw_tableprefix.$zwebtype."molds
				where ".$zwebtype."id='".$zwebid."'
					and deleted=0;");
			$zmold = 0;
			$zmolds = array();
			foreach ($zresultsmolds as $zrowmolds) {
				
				/* get mold points */
				$zresultsmp = $wtwconnect->query("
					select *
					from ".wtw_tableprefix."moldpoints
					where moldid='".$zrowmolds[$zwebtype."moldid"]."'
						and deleted=0;");
				$zmp = 0;
				$zmoldpoints = array();
				foreach ($zresultsmp as $zrowmp) {
					$zmoldpoints[$zmp] = array(
						'moldpointid'=>$zrowmp["moldpointid"],
						'pastmoldpointid'=>$zrowmp["pastmoldpointid"],
						'moldid'=>$zrowmp["moldid"],
						'pathnumber'=>$zrowmp["pathnumber"],
						'sorder'=>$zrowmp["sorder"],
						'positionx'=>$zrowmp["positionx"],
						'positiony'=>$zrowmp["positiony"],
						'positionz'=>$zrowmp["positionz"],
						'createdate'=>$zrowmp["createdate"],
						'createuserid'=>$zrowmp["createuserid"],
						'updatedate'=>$zrowmp["updatedate"],
						'updateuserid'=>$zrowmp["updateuserid"]
					);
					$zmp += 1;
					addUserID($zrowmp["createuserid"]);
					addUserID($zrowmp["updateuserid"]);
				}			

				/* get webimages */
				$zresultswi = $wtwconnect->query("
					select *
					from ".wtw_tableprefix."webimages
					where ".$zwebtype."moldid='".$zrowmolds[$zwebtype."moldid"]."'
						and deleted=0;");
				$zwi = 0;
				$zwebimages = array();
				foreach ($zresultswi as $zrowwi) {
					$zwebimages[$zwi] = array(
						'webimageid'=>$zrowwi["webimageid"],
						'pastwebimageid'=>$zrowwi["pastwebimageid"],
						'communitymoldid'=>$zrowwi["communitymoldid"],
						'buildingmoldid'=>$zrowwi["buildingmoldid"],
						'thingmoldid'=>$zrowwi["thingmoldid"],
						'imageindex'=>$zrowwi["imageindex"],
						'imageid'=>$zrowwi["imageid"],
						'imagehoverid'=>$zrowwi["imagehoverid"],
						'imageclickid'=>$zrowwi["imageclickid"],
						'graphiclevel'=>$zrowwi["graphiclevel"],
						'jsfunction'=>$zrowwi["jsfunction"],
						'jsparameters'=>$zrowwi["jsparameters"],
						'userid'=>$zrowwi["userid"],
						'alttag'=>htmlspecialchars($zrowwi["alttag"], ENT_QUOTES, 'UTF-8'),
						'createdate'=>$zrowwi["createdate"],
						'createuserid'=>$zrowwi["createuserid"],
						'updatedate'=>$zrowwi["updatedate"],
						'updateuserid'=>$zrowwi["updateuserid"]
					);
					$zwi += 1;
					addUploadID($zrowwi["imageid"], true);
					addUploadID($zrowwi["imagehoverid"], true);
					addUploadID($zrowwi["imageclickid"], true);
					addUserID($zrowwi["userid"]);
					addUserID($zrowwi["createuserid"]);
					addUserID($zrowwi["updateuserid"]);
				}			
				
				/* add molds to array */
				$zmolds[$zmold] = array(
					$zwebtype.'moldid'=>$zrowmolds[$zwebtype."moldid"],
					'past'.$zwebtype.'moldid'=>$zrowmolds["past".$zwebtype."moldid"],
					$zwebtype.'id'=>$zrowmolds[$zwebtype."id"],
					'loadactionzoneid'=>$zrowmolds["loadactionzoneid"],
					'shape'=>$zrowmolds["shape"],
					'covering'=>$zrowmolds["covering"],
					'positionx'=>$zrowmolds["positionx"],
					'positiony'=>$zrowmolds["positiony"],
					'positionz'=>$zrowmolds["positionz"],
					'scalingx'=>$zrowmolds["scalingx"],
					'scalingy'=>$zrowmolds["scalingy"],
					'scalingz'=>$zrowmolds["scalingz"],
					'rotationx'=>$zrowmolds["rotationx"],
					'rotationy'=>$zrowmolds["rotationy"],
					'rotationz'=>$zrowmolds["rotationz"],
					'special1'=>$zrowmolds["special1"],
					'special2'=>$zrowmolds["special2"],
					'uoffset'=>$zrowmolds["uoffset"],
					'voffset'=>$zrowmolds["voffset"],
					'uscale'=>$zrowmolds["uscale"],
					'vscale'=>$zrowmolds["vscale"],
					'uploadobjectid'=>$zrowmolds["uploadobjectid"],
					'graphiclevel'=>$zrowmolds["graphiclevel"],
					'textureid'=>$zrowmolds["textureid"],
					'texturebumpid'=>$zrowmolds["texturebumpid"],
					'texturehoverid'=>$zrowmolds["texturehoverid"],
					'videoid'=>$zrowmolds["videoid"],
					'videoposterid'=>$zrowmolds["videoposterid"],
					'diffusecolor'=> $zrowmolds["diffusecolor"],
					'emissivecolor'=> $zrowmolds["emissivecolor"],
					'specularcolor'=> $zrowmolds["specularcolor"],
					'ambientcolor'=> $zrowmolds["ambientcolor"],
					'heightmapid'=>$zrowmolds["heightmapid"],
					'mixmapid'=>$zrowmolds["mixmapid"],
					'texturerid'=>$zrowmolds["texturerid"],
					'texturegid'=>$zrowmolds["texturegid"],
					'texturebid'=>$zrowmolds["texturebid"],
					'texturebumprid'=>$zrowmolds["texturebumprid"],
					'texturebumpgid'=>$zrowmolds["texturebumpgid"],
					'texturebumpbid'=>$zrowmolds["texturebumpbid"],
					'soundid'=>$zrowmolds["soundid"],
					'soundname'=>$zrowmolds["soundname"],
					'soundloop'=>$zrowmolds["soundloop"],
					'soundmaxdistance'=>$zrowmolds["soundmaxdistance"],
					'soundrollofffactor'=>$zrowmolds["soundrollofffactor"],
					'soundrefdistance'=>$zrowmolds["soundrefdistance"],
					'soundconeinnerangle'=>$zrowmolds["soundconeinnerangle"],
					'soundconeouterangle'=>$zrowmolds["soundconeouterangle"],
					'soundconeoutergain'=>$zrowmolds["soundconeoutergain"],
					'webtext'=>htmlspecialchars($zrowmolds["webtext"], ENT_QUOTES, 'UTF-8'),
					'webstyle'=>htmlspecialchars($zrowmolds["webstyle"], ENT_QUOTES, 'UTF-8'),
					'opacity'=>$zrowmolds["opacity"],
					'sideorientation'=>$zrowmolds["sideorientation"],
					'billboard'=>$zrowmolds["billboard"],
					'waterreflection'=>$zrowmolds["waterreflection"],
					'receiveshadows'=>$zrowmolds["receiveshadows"],
					'subdivisions'=>$zrowmolds["subdivisions"],
					'minheight'=>$zrowmolds["minheight"],
					'maxheight'=>$zrowmolds["maxheight"],
					'checkcollisions'=>$zrowmolds["checkcollisions"],
					'ispickable'=>$zrowmolds["ispickable"],
					'actionzoneid'=>$zrowmolds["actionzoneid"],
					'csgmoldid'=>$zrowmolds["csgmoldid"],
					'csgaction'=>$zrowmolds["csgaction"],
					'alttag'=>htmlspecialchars($zrowmolds["alttag"], ENT_QUOTES, 'UTF-8'),
					'productid'=>$zrowmolds["productid"],
					'slug'=>$zrowmolds["slug"],
					'categoryid'=>$zrowmolds["categoryid"],
					'allowsearch'=>$zrowmolds["allowsearch"],
					'jsfunction'=>$zrowmolds["jsfunction"],
					'jsparameters'=>$zrowmolds["jsparameters"],
					'createdate'=>$zrowmolds["createdate"],
					'createuserid'=>$zrowmolds["createuserid"],
					'updatedate'=>$zrowmolds["updatedate"],
					'updateuserid'=>$zrowmolds["updateuserid"],
					'moldpoints'=>$zmoldpoints,
					'webimages'=>$zwebimages
				);
				$zmold += 1;
				addUploadObjectID($zrowmolds["uploadobjectid"]);
				addUploadID($zrowmolds["textureid"], true);
				addUploadID($zrowmolds["texturebumpid"], true);
				addUploadID($zrowmolds["texturehoverid"], true);
				addUploadID($zrowmolds["videoid"], false);
				addUploadID($zrowmolds["videoposterid"], true);
				addUploadID($zrowmolds["heightmapid"], true);
				addUploadID($zrowmolds["mixmapid"], true);
				addUploadID($zrowmolds["texturerid"], true);
				addUploadID($zrowmolds["texturegid"], true);
				addUploadID($zrowmolds["texturebid"], true);
				addUploadID($zrowmolds["texturebumprid"], true);
				addUploadID($zrowmolds["texturebumpgid"], true);
				addUploadID($zrowmolds["texturebumpbid"], true);
				addUploadID($zrowmolds["soundid"], false);
				addUserID($zrowmolds["createuserid"]);
				addUserID($zrowmolds["updateuserid"]);
			}

			/* json structured response */
			addUploadID($zrow["snapshotid"], true);
			addUserID($zrow["userid"]);
			addUserID($zrow["shareuserid"]);
			addUserID($zrow["createuserid"]);
			addUserID($zrow["updateuserid"]);

			$ztextureid = '';
			$zskydomeid = '';
			$zskyinclination = '';
			$zskyluminance = '';
			$zskyazimuth = '';
			$zskyrayleigh = '';
			$zskyturbidity = '';
			$zskymiedirectionalg = '';
			$zskymiecoefficient = '';
			$zgroundpositiony = '';
			$zwaterpositiony = '';
			
			if ($zwebtype == 'community') {
				/* these fields only apply to 3D Community Scenes */
				$ztextureid = $zrow["textureid"];
				$zskydomeid = $zrow["skydomeid"];
				$zskyinclination = $zrow["skyinclination"];
				$zskyluminance = $zrow["skyluminance"];
				$zskyazimuth = $zrow["skyazimuth"];
				$zskyrayleigh = $zrow["skyrayleigh"];
				$zskyturbidity = $zrow["skyturbidity"];
				$zskymiedirectionalg = $zrow["skymiedirectionalg"];
				$zskymiecoefficient = $zrow["skymiecoefficient"];
				$zgroundpositiony = $zrow["groundpositiony"];
				$zwaterpositiony = $zrow["waterpositiony"];

				addUploadID($ztextureid, true);
				addUploadID($zskydomeid, true);
			}

			$zresponse = array(
				'serverinstanceid'=>wtw_serverinstanceid,
				'domainurl'=>$wtwconnect->domainurl,
				$zwebtype.'id' => $zrow[$zwebtype."id"],
				'past'.$zwebtype.'id' => $zrow["past".$zwebtype."id"],
				$zwebtype.'name' => htmlspecialchars($zrow[$zwebtype."name"], ENT_QUOTES, 'UTF-8'),
				'userid' => $zrow["userid"],
				'positionx' => $zrow["positionx"],
				'positiony' => $zrow["positiony"],
				'positionz' => $zrow["positionz"],
				'scalingx' => $zrow["scalingx"],
				'scalingy' => $zrow["scalingy"],
				'scalingz' => $zrow["scalingz"],
				'rotationx' => $zrow["rotationx"],
				'rotationy' => $zrow["rotationy"],
				'rotationz' => $zrow["rotationz"],
				'textureid' => $ztextureid,
				'skydomeid' => $zskydomeid,
				'skyinclination' => $zskyinclination,
				'skyluminance' => $zskyluminance,
				'skyazimuth' => $zskyazimuth,
				'skyrayleigh' => $zskyrayleigh,
				'skyturbidity' => $zskyturbidity,
				'skymiedirectionalg' => $zskymiedirectionalg,
				'skymiecoefficient' => $zskymiecoefficient,
				'gravity' => $zrow["gravity"],
				'groundpositiony' => $zgroundpositiony,
				'waterpositiony' => $zwaterpositiony,
				'templatename' => htmlspecialchars($zrow["templatename"], ENT_QUOTES, 'UTF-8'),
				'tags' => htmlspecialchars($zrow["tags"], ENT_QUOTES, 'UTF-8'),
				'description' => htmlspecialchars($zrow["description"], ENT_QUOTES, 'UTF-8'),
				'snapshotid' => $zrow["snapshotid"],
				'shareuserid' => $zrow["shareuserid"],
				'alttag' => htmlspecialchars($zrow["alttag"], ENT_QUOTES, 'UTF-8'),
				'createdate' => $zrow["createdate"],
				'createuserid' => $zrow["createuserid"],
				'updatedate' => $zrow["updatedate"],
				'updateuserid' => $zrow["updateuserid"],
				'connectinggrids'=>$zconnectinggrids,
				'childconnectinggrids'=>$zchildconnectinggrids,
				'actionzones'=>$zactionzones,
				'molds'=>$zmolds,
				'uploadobjects'=>$zuploadobjects,
				'uploads'=>$zuploads,
				'scripts'=>$zscripts,
				'avataranimations'=>$zavataranimations,
				'users'=>$zusers
			);
		}
	}
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-share.php=".$e->getMessage());
}
?>

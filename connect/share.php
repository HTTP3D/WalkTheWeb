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
		if ($wtwconnect->hasValue($zuploadid)) {
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
					if ($wtwconnect->hasValue($zfilepath)) {
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
						'filetitle'=>$wtwconnect->escapeHTML($zrow["filetitle"]),
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
		if ($wtwconnect->hasValue($zuploadobjectid)) {
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
					if ($wtwconnect->hasValue($zrow["objectfolder"])) {
						$zfiles = 0;
						$zdir = str_replace('/content/',$wtwconnect->contentpath.'/',$zrow["objectfolder"]);
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
							'animationname'=>$wtwconnect->escapeHTML($zrowuoanim["animationname"]),
							'moldnamepart'=>$wtwconnect->escapeHTML($zrowuoanim["moldnamepart"]),
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
		if ($wtwconnect->hasValue($zscriptid)) {
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
		if ($wtwconnect->hasValue($zavataranimationid)) {
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
		if ($wtwconnect->hasValue($zuserid)) {
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
						'displayname'=>$wtwconnect->escapeHTML($zrow["displayname"]),
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
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);
	
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
					and childwebtype='".$zwebtype."'
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
					'alttag'=>$wtwconnect->escapeHTML($zrowcg["alttag"]),
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
					and parentwebtype='".$zwebtype."'
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
					'alttag'=>$wtwconnect->escapeHTML($zrowcg["alttag"]),
					'createdate'=>$zrowcg["createdate"],
					'createuserid'=>$zrowcg["createuserid"],
					'updatedate'=>$zrowcg["updatedate"],
					'updateuserid'=>$zrowcg["updateuserid"]
				);
				$zcg += 1;
				addUserID($zrowcg["createuserid"]);
				addUserID($zrowcg["updateuserid"]);
			}

			/* get content ratings */
			$zresultscr = $wtwconnect->query("
				select *
				from ".wtw_tableprefix."contentratings
				where webid='".$zwebid."'
					and webtype='".$zwebtype."'
					and deleted=0;");
			$zcr = 0;
			$zcontentratings = array();
			foreach ($zresultscr as $zrowcr) {
				$zcontentratings[$zcr] = array(
					'contentratingid'=>$zrowcr["contentratingid"],
					'pastcontentratingid'=>$zrowcr["pastcontentratingid"],
					'webid'=>$zrowcr["webid"],
					'webtype'=>$zrowcr["webtype"],
					'rating'=>$zrowcr["rating"],
					'ratingvalue'=>$zrowcr["ratingvalue"],
					'contentwarning'=>$zrowcr["contentwarning"],
					'createdate'=>$zrowcr["createdate"],
					'createuserid'=>$zrowcr["createuserid"],
					'updatedate'=>$zrowcr["updatedate"],
					'updateuserid'=>$zrowcr["updateuserid"]
				);
				$zcr += 1;
				addUserID($zrowcr["createuserid"]);
				addUserID($zrowcr["updateuserid"]);
			}

			/* get plugins required */
			$zresultplugins = $wtwconnect->query("
				select *
				from ".wtw_tableprefix."pluginsrequired
				where webid='".$zwebid."'
					and webtype='".$zwebtype."'
					and deleted=0;");
			$zp = 0;
			$zpluginsrequired = array();
			foreach ($zresultplugins as $zrowp) {
				$zpluginsrequired[$zp] = array(
					'pluginsrequiredid'=>$zrowp["pluginsrequiredid"],
					'pastpluginsrequiredid'=>$zrowp["pastpluginsrequiredid"],
					'webid'=>$zrowp["webid"],
					'webtype'=>$zrowp["webtype"],
					'pluginname'=>$zrowp["pluginname"],
					'optional'=>$zrowp["optional"],
					'createdate'=>$zrowp["createdate"],
					'createuserid'=>$zrowp["createuserid"],
					'updatedate'=>$zrowp["updatedate"],
					'updateuserid'=>$zrowp["updateuserid"]
				);
				$zp += 1;
				addUserID($zrowp["createuserid"]);
				addUserID($zrowp["updateuserid"]);
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
					'actionzonename'=>$wtwconnect->escapeHTML($zrowaz["actionzonename"]),
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
					'value1'=>$zrowaz["value1"],
					'value2'=>$zrowaz["value2"],
					'defaulteditform'=>$zrowaz["defaulteditform"],
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
						'alttag'=>$wtwconnect->escapeHTML($zrowwi["alttag"]),
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
					'unloadactionzoneid'=>$zrowmolds["unloadactionzoneid"],
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
					'webtext'=>$wtwconnect->escapeHTML($zrowmolds["webtext"]),
					'webstyle'=>$wtwconnect->escapeHTML($zrowmolds["webstyle"]),
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
					'alttag'=>$wtwconnect->escapeHTML($zrowmolds["alttag"]),
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
			$zgroundpositiony = '';
			$zwaterpositiony = '';
			$zwaterbumpheight = .6;
			$zwatersubdivisions = 2;
			$zwindforce = -10;
			$zwinddirectionx = 1;
			$zwinddirectiony = 0;
			$zwinddirectionz = 1;
			$zwaterwaveheight = .2;
			$zwaterwavelength = .02;
			$zwatercolorrefraction = '#23749C';
			$zwatercolorreflection = '#52BCF1';
			$zwatercolorblendfactor = .2;
			$zwatercolorblendfactor2 = .2;
			$zwateralpha = .9;
			$zwaterbumpid = '';
			$zsceneambientcolor = '#E5E8E8';
			$zsceneclearcolor = '#000000';
			$zsceneuseclonedmeshmap = 1;
			$zsceneblockmaterialdirtymechanism = 1;
			$zscenefogenabled = 0;
			$zscenefogmode = '';
			$zscenefogdensity = .01;
			$zscenefogstart = 20;
			$zscenefogend = 60;
			$zscenefogcolor = '#c0c0c0';
			$zsundirectionalintensity = 1;
			$zsundiffusecolor = '#ffffff';
			$zsunspecularcolor = '#ffffff';
			$zsungroundcolor = '#000000';
			$zsundirectionx = 999;
			$zsundirectiony = -999;
			$zsundirectionz = 999;
			$zbacklightintensity = 0.5;
			$zbacklightdirectionx = -999;
			$zbacklightdirectiony = 999;
			$zbacklightdirectionz = -999;
			$zbacklightdiffusecolor = '#ffffff';
			$zbacklightspecularcolor = '#ffffff';
			$zskytype = '';
			$zskysize = 5000;
			$zskyboxfolder = '';
			$zskyboxfile = '';
			$zskyboximageleft = '';
			$zskyboximageup = '';
			$zskyboximagefront = '';
			$zskyboximageright = '';
			$zskyboximagedown = '';
			$zskyboximageback = '';
			$zskypositionoffsetx = 0;
			$zskypositionoffsety = 0;
			$zskypositionoffsetz = 0;
			$zskyboxmicrosurface = 0;
			$zskyboxpbr = 0;
			$zskyboxasenvironmenttexture = 0;
			$zskyboxblur = 0;
			$zskyboxdiffusecolor = '#000000';
			$zskyboxspecularcolor = '#000000';
			$zskyboxambientcolor = '#000000';
			$zskyboxemissivecolor = '#000000';
			$zskyinclination = 0;
			$zskyluminance = 1;
			$zskyazimuth = 0.25;
			$zskyrayleigh = 2;
			$zskyturbidity = 10;
			$zskymiedirectionalg = .8;
			$zskymiecoefficient = .008;
			$zbuildingpositionx = 0;
			$zbuildingpositiony = 0;
			$zbuildingpositionz = 0;
			$zbuildingscalingx = 1;
			$zbuildingscalingy = 1;
			$zbuildingscalingz = 1;
			$zbuildingrotationx = 0;
			$zbuildingrotationy = 0;
			$zbuildingrotationz = 0;
			
			if ($zwebtype == 'community') {
				/* these fields only apply to 3D Community Scenes */
				$ztextureid = $zrow["textureid"];
				$zskydomeid = $zrow["skydomeid"];
				$zgroundpositiony = $zrow["groundpositiony"];
				$zwaterpositiony = $zrow["waterpositiony"];
				if (isset($zrow["waterbumpheight"])) {
					$zwaterbumpheight = $zrow["waterbumpheight"];
				}
				if (isset($zrow["watersubdivisions"])) {
					$zwatersubdivisions = $zrow["watersubdivisions"];
				}
				if (isset($zrow["windforce"])) {
					$zwindforce = $zrow["windforce"];
				}
				if (isset($zrow["winddirectionx"])) {
					$zwinddirectionx = $zrow["winddirectionx"];
				}
				if (isset($zrow["winddirectiony"])) {
					$zwinddirectiony = $zrow["winddirectiony"];
				}
				if (isset($zrow["winddirectionz"])) {
					$zwinddirectionz = $zrow["winddirectionz"];
				}
				if (isset($zrow["waterwaveheight"])) {
					$zwaterwaveheight = $zrow["waterwaveheight"];
				}
				if (isset($zrow["waterwavelength"])) {
					$zwaterwavelength = $zrow["waterwavelength"];
				}
				$zwatercolorrefraction = $zrow["watercolorrefraction"];
				$zwatercolorreflection = $zrow["watercolorreflection"];
				if (isset($zrow["watercolorblendfactor"])) {
					$zwatercolorblendfactor = $zrow["watercolorblendfactor"];
				}
				if (isset($zrow["watercolorblendfactor2"])) {
					$zwatercolorblendfactor2 = $zrow["watercolorblendfactor2"];
				}
				if (isset($zrow["wateralpha"])) {
					$zwateralpha = $zrow["wateralpha"];
				}
				$zwaterbumpid = $zrow["waterbumpid"];

				$zsceneambientcolor => $zrow["sceneambientcolor"];
				$zsceneclearcolor => $zrow["sceneclearcolor"];
				if (isset($zrow["sceneuseclonedmeshmap"])) {
					$zsceneuseclonedmeshmap => $zrow["sceneuseclonedmeshmap"];
				}
				if (isset($zrow["sceneblockmaterialdirtymechanism"])) {
					$zsceneblockmaterialdirtymechanism => $zrow["sceneblockmaterialdirtymechanism"];
				}
				if (isset($zrow["sundirectionalintensity"])) {
					$zsundirectionalintensity => $zrow["sundirectionalintensity"];
				}
				$zsundiffusecolor => $zrow["sundiffusecolor"];
				$zsunspecularcolor => $zrow["sunspecularcolor"];
				$zsungroundcolor => $zrow["sungroundcolor"];
				if (isset($zrow["sundirectionx"])) {
					$zsundirectionx => $zrow["sundirectionx"];
				}
				if (isset($zrow["sundirectiony"])) {
					$zsundirectiony => $zrow["sundirectiony"];
				}
				if (isset($zrow["sundirectionz"])) {
					$zsundirectionz => $zrow["sundirectionz"];
				}
				if (isset($zrow["backlightintensity"])) {
					$zbacklightintensity => $zrow["backlightintensity"];
				}
				if (isset($zrow["backlightdirectionx"])) {
					$zbacklightdirectionx => $zrow["backlightdirectionx"];
				}
				if (isset($zrow["backlightdirectiony"])) {
					$zbacklightdirectiony => $zrow["backlightdirectiony"];
				}
				if (isset($zrow["backlightdirectionz"])) {
					$zbacklightdirectionz => $zrow["backlightdirectionz"];
				}
				$zbacklightdiffusecolor => $zrow["backlightdiffusecolor"];
				$zbacklightspecularcolor => $zrow["backlightspecularcolor"];
				$zscenefogenabled => $zrow["scenefogenabled"];
				$zscenefogmode => $zrow["scenefogmode"];
				$zscenefogdensity => $zrow["scenefogdensity"];
				$zscenefogstart => $zrow["scenefogstart"];
				$zscenefogend => $zrow["scenefogend"];
				$zscenefogcolor => $zrow["scenefogcolor"];
				$zskytype => $zrow["skytype"];
				if (isset($zrow["skysize"])) {
					$zskysize => $zrow["skysize"];
				}
				$zskyboxfolder => $zrow["skyboxfolder"];
				$zskyboxfile => $zrow["skyboxfile"];
				$zskyboximageleft => $zrow["skyboximageleft"];
				$zskyboximageup => $zrow["skyboximageup"];
				$zskyboximagefront => $zrow["skyboximagefront"];
				$zskyboximageright => $zrow["skyboximageright"];
				$zskyboximagedown => $zrow["skyboximagedown"];
				$zskyboximageback => $zrow["skyboximageback"];
				if (isset($zrow["skypositionoffsetx"])) {
					$zskypositionoffsetx => $zrow["skypositionoffsetx"];
				}
				if (isset($zrow["skypositionoffsety"])) {
					$zskypositionoffsety => $zrow["skypositionoffsety"];
				}
				if (isset($zrow["skypositionoffsetz"])) {
					$zskypositionoffsetz => $zrow["skypositionoffsetz"];
				}
				if (isset($zrow["skyboxmicrosurface"])) {
					$zskyboxmicrosurface => $zrow["skyboxmicrosurface"];
				}
				if (isset($zrow["skyboxpbr"])) {
					$zskyboxpbr => $zrow["skyboxpbr"];
				}
				if (isset($zrow["skyboxasenvironmenttexture"])) {
					$zskyboxasenvironmenttexture => $zrow["skyboxasenvironmenttexture"];
				}
				if (isset($zrow["skyboxblur"])) {
					$zskyboxblur => $zrow["skyboxblur"];
				}
				$zskyboxdiffusecolor => $zrow["skyboxdiffusecolor"];
				$zskyboxspecularcolor => $zrow["skyboxspecularcolor"];
				$zskyboxambientcolor => $zrow["skyboxambientcolor"];
				$zskyboxemissivecolor => $zrow["skyboxemissivecolor"];
				if (isset($zrow["skyinclination"])) {
					$zskyinclination = $zrow["skyinclination"];
				}
				if (isset($zrow["skyluminance"])) {
					$zskyluminance = $zrow["skyluminance"];
				}
				if (isset($zrow["skyazimuth"])) {
					$zskyazimuth = $zrow["skyazimuth"];
				}
				if (isset($zrow["skyrayleigh"])) {
					$zskyrayleigh = $zrow["skyrayleigh"];
				}
				if (isset($zrow["skyturbidity"])) {
					$zskyturbidity = $zrow["skyturbidity"];
				}
				if (isset($zrow["skymiedirectionalg"])) {
					$zskymiedirectionalg = $zrow["skymiedirectionalg"];
				}
				if (isset($zrow["skymiecoefficient"])) {
					$zskymiecoefficient = $zrow["skymiecoefficient"];
				}
				if (isset($zrow["buildingpositionx"])) {
					$zbuildingpositionx = $zrow["buildingpositionx"];
				}
				if (isset($zrow["buildingpositiony"])) {
					$zbuildingpositiony = $zrow["buildingpositiony"];
				}
				if (isset($zrow["buildingpositionz"])) {
					$zbuildingpositionz = $zrow["buildingpositionz"];
				}
				if (isset($zrow["buildingscalingx"])) {
					$zbuildingscalingx = $zrow["buildingscalingx"];
				}
				if (isset($zrow["buildingscalingy"])) {
					$zbuildingscalingy = $zrow["buildingscalingy"];
				}
				if (isset($zrow["buildingscalingz"])) {
					$zbuildingscalingz = $zrow["buildingscalingz"];
				}
				if (isset($zrow["buildingrotationx"])) {
					$zbuildingrotationx = $zrow["buildingrotationx"];
				}
				if (isset($zrow["buildingrotationy"])) {
					$zbuildingrotationy = $zrow["buildingrotationy"];
				}
				if (isset($zrow["buildingrotationz"])) {
					$zbuildingrotationz = $zrow["buildingrotationz"];
				}

				addUploadID($ztextureid, true);
				addUploadID($zskydomeid, true);
			}

			$zresponse = array(
				'serverinstanceid'=>wtw_serverinstanceid,
				'domainurl'=>$wtwconnect->domainurl,
				$zwebtype.'id' => $zrow[$zwebtype."id"],
				'past'.$zwebtype.'id' => $zrow["past".$zwebtype."id"],
				$zwebtype.'name' => $wtwconnect->escapeHTML($zrow[$zwebtype."name"]),
				$zwebtype.'description' => $wtwconnect->escapeHTML($zrow[$zwebtype."description"]),
				'versionid' => $zrow["versionid"],
				'version' => $zrow["version"],
				'versionorder' => $zrow["versionorder"],
				'versiondesc' => $wtwconnect->escapeHTML($zrow["versiondesc"]),
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
				'gravity' => $zrow["gravity"],
				'groundpositiony' => $zgroundpositiony,
				'waterpositiony' => $zwaterpositiony,
				'waterbumpheight' => $zwaterbumpheight,
				'watersubdivisions' => $zwatersubdivisions,
				'windforce' => $zwindforce,
				'winddirectionx' => $zwinddirectionx,
				'winddirectiony' => $zwinddirectiony,
				'winddirectionz' => $zwinddirectionz,
				'waterwaveheight' => $zwaterwaveheight,
				'waterwavelength' => $zwaterwavelength,
				'watercolorrefraction' => $zwatercolorrefraction,
				'watercolorreflection' => $zwatercolorreflection,
				'watercolorblendfactor' => $zwatercolorblendfactor,
				'watercolorblendfactor2' => $zwatercolorblendfactor2,
				'wateralpha' => $zwateralpha,
				'waterbumpid' => $zwaterbumpid,
				'sceneambientcolor' => $zsceneambientcolor,
				'sceneclearcolor' => $zsceneclearcolor,
				'sceneuseclonedmeshmap' => $zsceneuseclonedmeshmap,
				'sceneblockmaterialdirtymechanism' => $zsceneblockmaterialdirtymechanism,
				'sundirectionalintensity' => $zsundirectionalintensity,
				'sundiffusecolor' => $zsundiffusecolor,
				'sunspecularcolor' => $zsunspecularcolor,
				'sungroundcolor' => $zsungroundcolor,
				'sundirectionx' => $zsundirectionx,
				'sundirectiony' => $zsundirectiony,
				'sundirectionz' => $zsundirectionz,
				'backlightintensity' => $zbacklightintensity,
				'backlightdirectionx' => $zbacklightdirectionx,
				'backlightdirectiony' => $zbacklightdirectiony,
				'backlightdirectionz' => $zbacklightdirectionz,
				'backlightdiffusecolor' => $zbacklightdiffusecolor,
				'backlightspecularcolor' => $zbacklightspecularcolor,
				'scenefogenabled' => $zscenefogenabled,
				'scenefogmode' => $zscenefogmode,
				'scenefogdensity' => $zscenefogdensity,
				'scenefogstart' => $zscenefogstart,
				'scenefogend' => $zscenefogend,
				'scenefogcolor' => $zscenefogcolor,
				'skytype' => $zskytype,
				'skysize' => $zskysize,
				'skyboxfolder' => $zskyboxfolder,
				'skyboxfile' => $zskyboxfile,
				'skyboximageleft' => $zskyboximageleft,
				'skyboximageup' => $zskyboximageup,
				'skyboximagefront'=> $zskyboximagefront,
				'skyboximageright' => $zskyboximageright,
				'skyboximagedown' => $zskyboximagedown,
				'skyboximageback' => $zskyboximageback,
				'skypositionoffsetx' => $zskypositionoffsetx,
				'skypositionoffsety' => $zskypositionoffsety,
				'skypositionoffsetz' => $zskypositionoffsetz,
				'skyboxmicrosurface' => $zskyboxmicrosurface,
				'skyboxpbr' => $zskyboxpbr,
				'skyboxasenvironmenttexture' => $zskyboxasenvironmenttexture,
				'skyboxblur' => $zskyboxblur,
				'skyboxdiffusecolor' => $zskyboxdiffusecolor,
				'skyboxspecularcolor' => $zskyboxspecularcolor,
				'skyboxambientcolor' => $zskyboxambientcolor,
				'skyboxemissivecolor' => $zskyboxemissivecolor,
				'skyinclination' => $zskyinclination,
				'skyluminance' => $zskyluminance,
				'skyazimuth' => $zskyazimuth,
				'skyrayleigh' => $zskyrayleigh,
				'skyturbidity' => $zskyturbidity,
				'skymiedirectionalg' => $zskymiedirectionalg,
				'skymiecoefficient' => $zskymiecoefficient,
				'templatename' => $wtwconnect->escapeHTML($zrow["templatename"]),
				'tags' => $wtwconnect->escapeHTML($zrow["tags"]),
				'description' => $wtwconnect->escapeHTML($zrow["description"]),
				'snapshotid' => $zrow["snapshotid"],
				'shareuserid' => $zrow["shareuserid"],
				'alttag' => $wtwconnect->escapeHTML($zrow["alttag"]),
				'buildingpositionx' => $zbuildingpositionx,
				'buildingpositiony' => $zbuildingpositiony,
				'buildingpositionz' => $zbuildingpositionz,
				'buildingscalingx' => $zbuildingscalingx,
				'buildingscalingy' => $zbuildingscalingy,
				'buildingscalingz' => $zbuildingscalingz,
				'buildingrotationx' => $zbuildingrotationx,
				'buildingrotationy' => $zbuildingrotationy,
				'buildingrotationz' => $zbuildingrotationz,
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
				'contentratings'=>$zcontentratings,
				'pluginsrequired'=>$zpluginsrequired,
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

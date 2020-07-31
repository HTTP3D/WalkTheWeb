<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides shared 3D Thing information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;

$zuploads = array();
$zupload = 0;
$zusers = array();
$zuser = 0;

function addUploadID($zuploadid, $zrecursive) {
	global $wtwconnect;
	try {
		global $zuploads;
		global $zupload;
		if (!empty($zuploadid) && isset($zuploadid)) {
			$found = false;
			foreach ($zuploads as $zrowup) {
				if ($zrowup["uploadid"] == $zuploadid) {
					$found = true;
				}
			}
			if (!$found) {
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
		$wtwconnect->serror("connect-thingshare.php-addUploadID=".$e->getMessage());
	}
}

function addUserID($zuserid) {
	global $wtwconnect;
	try {
		global $zusers;
		global $zuser;
		if (!empty($zuserid) && isset($zuserid)) {
			$found = false;
			foreach ($zusers as $zrowup) {
				if ($zrowup["userid"] == $zuserid) {
					$found = true;
				}
			}
			if (!$found) {
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
		$wtwconnect->serror("connect-thingshare.php-addUserID=".$e->getMessage());
	}
}

try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/thingshare.php");
	
	/* get values from querystring or session */
	$zthingid = $wtwconnect->getVal('thingid','');
	$zuserid = $wtwconnect->getVal('userid','');
	$zsharehash = $wtwconnect->getVal('sharehash','');
	
	addUserID($zuserid);
	
	/* get thing */
	$zresults = $wtwconnect->query("
		select *
		from ".wtw_tableprefix."things
		where thingid='".$zthingid."'
			and shareuserid='".$zuserid."'
			and sharehash='".$zsharehash."'
			and deleted=0
		limit 1;");
	
//	echo $wtwconnect->addConnectHeader('*');
	header('Access-Control-Allow-Origin: *');
	header('Content-type: application/json');

	$zresponse = array();

	/* format json return dataset */
	foreach ($zresults as $zrow) {
		/* get connecting grids */
		$zresultscg = $wtwconnect->query("
			select *
			from ".wtw_tableprefix."connectinggrids
			where childwebid='".$zthingid."'
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

		/* get action zones */
		$zresultsaz = $wtwconnect->query("
			select *
			from ".wtw_tableprefix."actionzones
			where thingid='".$zthingid."'
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
				addUserID($zrowsazanim["createuserid"]);
				addUserID($zrowsazanim["updateuserid"]);
			}

			/* get scripts */
			$zresultsscripts = $wtwconnect->query("
				select *
				from ".wtw_tableprefix."scripts
				where webid='".$zthingid."'
					and actionzoneid='".$zrowaz["actionzoneid"]."'
					and deleted=0;");
			$zscript = 0;
			$zscripts = array();
			foreach ($zresultsscripts as $zrowscripts) {
				$zscripts[$zscript] = array(
					'scriptid'=>$zrowscripts["scriptid"],
					'actionzoneid'=>$zrowscripts["actionzoneid"],
					'moldgroup'=>$zrowscripts["moldgroup"],
					'webid'=>$zrowscripts["webid"],
					'scriptname'=>$zrowscripts["scriptname"],
					'scriptfilename'=>$zrowscripts["scriptpath"],
					'scriptpath'=>$wtwconnect->domainurl."/content/uploads/things/".$zthingid."/".$zrowscripts["scriptpath"],
					'createdate'=>$zrowscripts["createdate"],
					'createuserid'=>$zrowscripts["createuserid"],
					'updatedate'=>$zrowscripts["updatedate"],
					'updateuserid'=>$zrowscripts["updateuserid"]
				);
				$zscript += 1;
				addUserID($zrowscripts["createuserid"]);
				addUserID($zrowscripts["updateuserid"]);
			}
			
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
				'scripts'=>$zscripts,
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
			select tm.*,
				uo.userid as uploadobjuserid,
				uo.stock as uploadobjstock,
				uo.objectfolder as uploadobjfolder,
				uo.objectfile as uploadobjfile,
				uo.createdate as uploadobjcreatedate,
				uo.createuserid as uploadobjcreateuserid,
				uo.updatedate as uploadobjupdatedate,
				uo.updateuserid as uploadobjupdateuserid
			from ".wtw_tableprefix."thingmolds tm
				left join ".wtw_tableprefix."uploadobjects uo
				on tm.uploadobjectid=uo.uploadobjectid
			where tm.thingid='".$zthingid."'
				and tm.deleted=0
				and (uo.deleted is null or uo.deleted=0);");
		$zmold = 0;
		$zmolds = array();
		foreach ($zresultsmolds as $zrowmolds) {
			
			/* get mold points */
			$zresultsmp = $wtwconnect->query("
				select *
				from ".wtw_tableprefix."moldpoints
				where moldid='".$zrowmolds["thingmoldid"]."'
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
				from ".wtw_tableprefix."moldpoints
				where thingmoldid='".$zrowmolds["thingmoldid"]."'
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

			/* get list of uploaded objects in folder */
			$zobjectfiles = array();
			if (!empty($zrowmolds["uploadobjfolder"]) && isset($zrowmolds["uploadobjfolder"])) {
				$zfiles = 0;
				$dir = str_replace('/content',$wtwconnect->contentpath,$zrowmolds["uploadobjfolder"]);
				$dir = rtrim($dir, "/");
				if (is_dir($dir)) {
					if ($dh = opendir($dir)) {
						while (($zfile = readdir($dh)) !== false) {
							if ($zfile != '.' && $zfile != '..') {
								$zobjectfiles[$zfiles] = array(
									'filename'=>$zfile,
									'filepath'=>$wtwconnect->domainurl.$zrowmolds["uploadobjfolder"].$zfile
									);
								$zfiles += 1;
							}
						}
						closedir($dh);
					}
				}
			}
			
			/* get uploaded objects animations */
			$zresultsuoanim = $wtwconnect->query("
				select *
				from ".wtw_tableprefix."moldpoints
				where moldid='".$zrowmolds["thingmoldid"]."'
					and deleted=0;");
			$zuoanim = 0;
			$zuploadedobjectanimations = array();
			foreach ($zresultsuoanim as $zrowuoanim) {
				$zuploadedobjectanimations[$zuoanim] = array(
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
				addUserID($zrowuoanim["userid"]);
				addUserID($zrowuoanim["createuserid"]);
				addUserID($zrowuoanim["updateuserid"]);
			}			

			$zmolds[$zmold] = array(
				'thingmoldid'=>$zrowmolds["thingmoldid"],
				'pastthingmoldid'=>$zrowmolds["pastthingmoldid"],
				'thingid'=>$zrowmolds["thingid"],
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
				'objectfolder'=>$zrowmolds["uploadobjfolder"],
				'objectfile'=>$zrowmolds["uploadobjfile"],
				'objectfiles'=>$zobjectfiles,
				'uploadedobjectanimations'=>$zuploadedobjectanimations,
				'graphiclevel'=>$zrowmolds["graphiclevel"],
				'textureid'=>$zrowmolds["textureid"],
				'texturebumpid'=>$zrowmolds["texturebumpid"],
				'texturehoverid'=>$zrowmolds["texturehoverid"],
				'videoid'=>$zrowmolds["videoid"],
				'videoposterid'=>$zrowmolds["videoposterid"],
				'diffusecolorr'=>$zrowmolds["diffusecolorr"],
				'diffusecolorg'=>$zrowmolds["diffusecolorg"],
				'diffusecolorb'=>$zrowmolds["diffusecolorb"],
				'specularcolorr'=>$zrowmolds["specularcolorr"],
				'specularcolorg'=>$zrowmolds["specularcolorg"],
				'specularcolorb'=>$zrowmolds["specularcolorb"],
				'emissivecolorr'=>$zrowmolds["emissivecolorr"],
				'emissivecolorg'=>$zrowmolds["emissivecolorg"],
				'emissivecolorb'=>$zrowmolds["emissivecolorb"],
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
				'uploadobjuserid'=>$zrowmolds["uploadobjuserid"],
				'uploadobjstock'=>$zrowmolds["uploadobjstock"],
				'uploadobjcreatedate'=>$zrowmolds["uploadobjcreatedate"],
				'uploadobjcreateuserid'=>$zrowmolds["uploadobjcreateuserid"],
				'uploadobjupdatedate'=>$zrowmolds["uploadobjupdatedate"],
				'uploadobjupdateuserid'=>$zrowmolds["uploadobjupdateuserid"],
				'createdate'=>$zrowmolds["createdate"],
				'createuserid'=>$zrowmolds["createuserid"],
				'updatedate'=>$zrowmolds["updatedate"],
				'updateuserid'=>$zrowmolds["updateuserid"],
				'moldpoints'=>$zmoldpoints,
				'webimages'=>$zwebimages
			);
			$zmold += 1;
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
			addUserID($zrowmolds["uploadobjcreateuserid"]);
			addUserID($zrowmolds["uploadobjupdateuserid"]);
			addUserID($zrowmolds["createuserid"]);
			addUserID($zrowmolds["updateuserid"]);
		}

		/* json structured response */
		addUploadID($zrow["snapshotid"], true);
		addUserID($zrow["userid"]);
		addUserID($zrow["shareuserid"]);
		addUserID($zrow["createuserid"]);
		addUserID($zrow["updateuserid"]);
		
		$zresponse = array(
			'serverinstanceid'=>wtw_serverinstanceid,
			'domainurl'=>$wtwconnect->domainurl,
			'thingid' => $zrow["thingid"],
			'pastthingid' => $zrow["pastthingid"],
			'thingname' => htmlspecialchars($zrow["thingname"], ENT_QUOTES, 'UTF-8'),
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
			'gravity' => $zrow["gravity"],
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
			'actionzones'=>$zactionzones,
			'molds'=>$zmolds,
			'uploads'=>$zuploads,
			'users'=>$zusers
		);
	}
	echo json_encode($zresponse);
} catch (Exception $e) {
	$wtwconnect->serror("connect-thingshare.php=".$e->getMessage());
}
?>

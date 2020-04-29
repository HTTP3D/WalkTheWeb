<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides Shared 3D Community information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/communityshare.php");
	
	/* get values from querystring or session */
	$zcommunityid = $wtwconnect->getVal('communityid','');
	$zkey = $wtwconnect->getVal('key','');
	
	if ($wtwconnect->confirmKey($zkey, 'community', $zcommunityid)) {
		$zresponse = array();
		$zcommunity = array();
		$zconnectinggrids = array();
		$zactionzones = array();
		$zcommunitymolds = array();
		$zmoldpoints = array();
		$zuploads = array();
		$zuploadobjects = array();
		$zuploadobjectanimations = array();
		$zwebimages = array();

		/* select community */
		$zresults = $wtwconnect->query("
			select *
			from ".wtw_tableprefix."communities
			where communityid='".$zcommunityid."'
			   and deleted=0
			limit 1;");
		$i = 0;
		/* create community array */
		foreach ($zresults as $zrow) {
			$zcommunity[$i]  = array(
				'communityid' => $zrow["communityid"],
				'communityname' => htmlspecialchars($zrow["communityname"], ENT_QUOTES, 'UTF-8'),
				'userid' => $zrow["userid"],
				'shareuserid' => $zrow["shareuserid"],
				'snapshotid' => $zrow["snapshotid"],
				'templatename' => htmlspecialchars($zrow["templatename"], ENT_QUOTES, 'UTF-8'),
				'description' => htmlspecialchars($zrow["description"], ENT_QUOTES, 'UTF-8'),
				'tags' => htmlspecialchars($zrow["tags"], ENT_QUOTES, 'UTF-8'),
				'positionx' => $zrow["positionx"],
				'positiony' => $zrow["positiony"],
				'positionz' => $zrow["positionz"],
				'scalingx' => $zrow["scalingx"],
				'scalingy' => $zrow["scalingy"],
				'scalingz' => $zrow["scalingz"],
				'rotationx' => $zrow["rotationx"],
				'rotationy' => $zrow["rotationy"],
				'rotationz' => $zrow["rotationz"],
				'textureid'=> $zrow["textureid"],
				'skydomeid'=> $zrow["skydomeid"],
				'skyinclination' => $zrow["skyinclination"],
				'skyluminance' => $zrow["skyluminance"],
				'skyazimuth' => $zrow["skyazimuth"],
				'skyrayleigh' => $zrow["skyrayleigh"],
				'skyturbidity' => $zrow["skyturbidity"],
				'skymiedirectionalg' => $zrow["skymiedirectionalg"],
				'skymiecoefficient' => $zrow["skymiecoefficient"],
				'groundpositiony'=> $zrow["groundpositiony"],
				'waterpositiony'=> $zrow["waterpositiony"],
				'gravity'=> $zrow["gravity"],
				'alttag'=> $zrow["alttag"]
			); 
			$i += 1;
		}

		/* select connectinggrids for the community */
		$zresults = $wtwconnect->query("
				select connectinggridid,
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
					altloadactionzoneid,
					unloadactionzoneid,
					attachactionzoneid,
					alttag,
					createdate,
					createuserid,
					updatedate,
					updateuserid
				from ".wtw_tableprefix."connectinggrids
				where childwebid='s3ba3nb6jen2ammy'
				   and deleted=0
				   and parentwebid=''
			union
				select connectinggridid,
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
					altloadactionzoneid,
					unloadactionzoneid,
					attachactionzoneid,
					alttag,
					createdate,
					createuserid,
					updatedate,
					updateuserid
				from (select * 
					from ".wtw_tableprefix."connectinggrids 
					where childwebtype='building' 
						and parentwebid='s3ba3nb6jen2ammy' 
						and deleted=0 
					order by createdate 
					limit 1) cg;");
		$i = 0;
		/* create connectinggrids array */
		foreach ($zresults as $zrow) {
			$zconnectinggrids[$i]  = array(
				'connectinggridid' => $zrow["connectinggridid"],
				'parentwebid'=> $zrow["parentwebid"],
				'parentwebtype'=> $zrow["parentwebtype"],
				'childwebid' => $zrow["childwebid"],
				'childwebtype' => $zrow["childwebtype"],
				'positionx' => $zrow["positionx"],
				'positiony' => $zrow["positiony"],
				'positionz' => $zrow["positionz"],
				'scalingx' => $zrow["scalingx"],
				'scalingy' => $zrow["scalingy"],
				'scalingz' => $zrow["scalingz"],
				'rotationx' => $zrow["rotationx"],
				'rotationy' => $zrow["rotationy"],
				'rotationz' => $zrow["rotationz"],
				'loadactionzoneid'=> $zrow["loadactionzoneid"],
				'altloadactionzoneid'=> $zrow["altloadactionzoneid"],
				'unloadactionzoneid' => $zrow["unloadactionzoneid"],
				'attachactionzoneid' => $zrow["attachactionzoneid"],
				'alttag'=> htmlspecialchars($zrow["alttag"], ENT_QUOTES, 'UTF-8'),
				'createdate' => $zrow["createdate"],
				'createuserid' => $zrow["createuserid"],
				'updatedate' => $zrow["updatedate"],
				'updateuserid' => $zrow["updateuserid"]
			); 
			$i += 1;
		}

		/* select actionzones for the community */
		$zresults = $wtwconnect->query("
			select *
			from ".wtw_tableprefix."actionzones
			where communityid='".$zcommunityid."'
			   and deleted=0;");
		$i = 0;
		/* create actionzones array */
		foreach ($zresults as $zrow) {
			$zactionzones[$i]  = array(
				'actionzoneid' => $zrow["actionzoneid"],
				'communityid' => $zrow["communityid"],
				'buildingid' => $zrow["buildingid"],
				'thingid' => $zrow["thingid"],
				'loadactionzoneid' => $zrow["loadactionzoneid"],
				'actionzonename' => htmlspecialchars($zrow["actionzonename"], ENT_QUOTES, 'UTF-8'),
				'actionzonetype' => $zrow["actionzonetype"],
				'actionzoneshape' => $zrow["actionzoneshape"],
				'movementtype' => $zrow["movementtype"],
				'positionx' => $zrow["positionx"],
				'positiony' => $zrow["positiony"],
				'positionz' => $zrow["positionz"],
				'scalingx' => $zrow["scalingx"],
				'scalingy' => $zrow["scalingy"],
				'scalingz' => $zrow["scalingz"],
				'rotationx' => $zrow["rotationx"],
				'rotationy' => $zrow["rotationy"],
				'rotationz' => $zrow["rotationz"],
				'axispositionx' => $zrow["axispositionx"],
				'axispositiony' => $zrow["axispositiony"],
				'axispositionz' => $zrow["axispositionz"],
				'axisrotationx' => $zrow["axisrotationx"],
				'axisrotationy' => $zrow["axisrotationy"],
				'axisrotationz' => $zrow["axisrotationz"],
				'rotateaxis' => $zrow["rotateaxis"],
				'rotatedegrees' => $zrow["rotatedegrees"],
				'rotatedirection' => $zrow["rotatedirection"],
				'rotatespeed' => $zrow["rotatespeed"],
				'movementdistance' => $zrow["movementdistance"],
				'parentactionzoneid' => $zrow["parentactionzoneid"],
				'jsfunction' => $zrow["jsfunction"],
				'jsparameters' => $zrow["jsparameters"],
				'createdate' => $zrow["createdate"],
				'createuserid' => $zrow["createuserid"],
				'updatedate' => $zrow["updatedate"],
				'updateuserid' => $zrow["updateuserid"]
			); 
			$i += 1;
		}

		/* select community molds for the community */
		$zresults = $wtwconnect->query("
			select *
			from ".wtw_tableprefix."communitymolds
			where communityid='".$zcommunityid."'
			   and deleted=0;");
		$i = 0;
		/* create communitymolds array */
		foreach ($zresults as $zrow) {
			$zcommunitymolds[$i]  = array(
				'communitymoldid' => $zrow["communitymoldid"],
				'communityid' => $zrow["communityid"],
				'loadactionzoneid' => $zrow["loadactionzoneid"],
				'shape' => $zrow["shape"],
				'covering' => $zrow["covering"],
				'positionx' => $zrow["positionx"],
				'positiony' => $zrow["positiony"],
				'positionz' => $zrow["positionz"],
				'scalingx' => $zrow["scalingx"],
				'scalingy' => $zrow["scalingy"],
				'scalingz' => $zrow["scalingz"],
				'rotationx' => $zrow["rotationx"],
				'rotationy' => $zrow["rotationy"],
				'rotationz' => $zrow["rotationz"],
				'special1' => $zrow["special1"],
				'special2' => $zrow["special2"],
				'uoffset' => $zrow["uoffset"],
				'voffset' => $zrow["voffset"],
				'uscale' => $zrow["uscale"],
				'vscale' => $zrow["vscale"],
				'uploadobjectid' => $zrow["uploadobjectid"],
				'objectfolder' => $zrow["objectfolder"],
				'objectfile' => $zrow["objectfile"],
				'graphiclevel' => $zrow["graphiclevel"],
				'textureid' => $zrow["textureid"],
				'texturebumpid' => $zrow["texturebumpid"],
				'texturehoverid' => $zrow["texturehoverid"],
				'videoid' => $zrow["videoid"],
				'videoposterid' => $zrow["videoposterid"],
				'diffusecolorr' => $zrow["diffusecolorr"],
				'diffusecolorg' => $zrow["diffusecolorg"],
				'diffusecolorb' => $zrow["diffusecolorb"],
				'specularcolorr' => $zrow["specularcolorr"],
				'specularcolorg' => $zrow["specularcolorg"],
				'specularcolorb' => $zrow["specularcolorb"],
				'emissivecolorr' => $zrow["emissivecolorr"],
				'emissivecolorg' => $zrow["emissivecolorg"],
				'emissivecolorb' => $zrow["emissivecolorb"],
				'heightmapid' => $zrow["heightmapid"],
				'mixmapid' => $zrow["mixmapid"],
				'texturerid' => $zrow["texturerid"],
				'texturegid' => $zrow["texturegid"],
				'texturebid' => $zrow["texturebid"],
				'texturebumprid' => $zrow["texturebumprid"],
				'texturebumpgid' => $zrow["texturebumpgid"],
				'texturebumpbid' => $zrow["texturebumpbid"],
				'soundid' => $zrow["soundid"],
				'soundname' => $zrow["soundname"],
				'soundattenuation' => $zrow["soundattenuation"],
				'soundloop' => $zrow["soundloop"],
				'soundmaxdistance' => $zrow["soundmaxdistance"],
				'soundrollofffactor' => $zrow["soundrollofffactor"],
				'soundrefdistance' => $zrow["soundrefdistance"],
				'soundconeinnerangle' => $zrow["soundconeinnerangle"],
				'soundconeouterangle' => $zrow["soundconeouterangle"],
				'soundconeoutergain' => $zrow["soundconeoutergain"],
				'webtext' => htmlspecialchars($zrow["webtext"], ENT_QUOTES, 'UTF-8'),
				'webstyle' => htmlspecialchars($zrow["webstyle"], ENT_QUOTES, 'UTF-8'),
				'opacity' => $zrow["opacity"],
				'sideorientation' => $zrow["sideorientation"],
				'billboard' => $zrow["billboard"],
				'waterreflection' => $zrow["waterreflection"],
				'receiveshadows' => $zrow["receiveshadows"],
				'subdivisions' => $zrow["subdivisions"],
				'minheight' => $zrow["minheight"],
				'maxheight' => $zrow["maxheight"],
				'checkcollisions' => $zrow["checkcollisions"],
				'ispickable' => $zrow["ispickable"],
				'actionzoneid' => $zrow["actionzoneid"],
				'csgmoldid' => $zrow["csgmoldid"],
				'csgaction' => $zrow["csgaction"],
				'alttag' => htmlspecialchars($zrow["alttag"], ENT_QUOTES, 'UTF-8'),
				'jsfunction' => $zrow["jsfunction"],
				'jsparameters' => $zrow["jsparameters"],
				'createdate' => $zrow["createdate"],
				'createuserid' => $zrow["createuserid"],
				'updatedate' => $zrow["updatedate"],
				'updateuserid' => $zrow["updateuserid"]
			); 
			$i += 1;
		}

		/* select mold points for the community */
		$zresults = $wtwconnect->query("
			select m.moldpointid,
				m.moldid,
				m.pathnumber,
				m.sorder,
				m.positionx,
				m.positiony,
				m.positionz
			from ".wtw_tableprefix."moldpoints m
				inner join ".wtw_tableprefix."communitymolds cm
					on m.moldid=cm.communitymoldid
			where cm.communityid='".$zcommunityid."'
				and cm.deleted=0
				and m.deleted=0
				and not cm.communityid='';");
		$i = 0;
		/* create moldpoints array */
		foreach ($zresults as $zrow) {
			$zmoldpoints[$i]  = array(
				'moldpointid'=> $zrow["moldpointid"], 
				'moldid'=> $zrow["moldid"],
				'pathnumber'=> $zrow["pathnumber"],
				'sorder'=> $zrow["sorder"],
				'positionx'=> $zrow["positionx"],
				'positiony'=> $zrow["positiony"],
				'positionz'=> $zrow["positionz"],
				'createdate' => $zrow["createdate"],
				'createuserid' => $zrow["createuserid"],
				'updatedate' => $zrow["updatedate"],
				'updateuserid' => $zrow["updateuserid"]
			); 
			$i += 1;
		}

		/* select uploads for the community */
		$zresults = $wtwconnect->query("
			select u1.uploadid,
				u1.pastuploadid,
				u1.originalid,
				u1.websizeid,
				u1.thumbnailid,
				u1.filetitle,
				u1.filename,
				u1.fileextension,
				u1.filesize,
				u1.filetype,
				u1.filepath,
				max(u1.filedata) as filedata,
				u1.imagewidth,
				u1.imageheight,
				u1.stock,
				u1.userid
			from ".wtw_tableprefix."uploads u1
				inner join (select *
						from ".wtw_tableprefix."communitymolds 
						where communityid='".$zcommunityid."'
							and deleted=0) cm1
					on (u1.websizeid = cm1.textureid
						or u1.originalid = cm1.textureid
						or u1.websizeid = cm1.texturebumpid
						or u1.originalid = cm1.texturebumpid
						or u1.websizeid = cm1.texturehoverid
						or u1.originalid = cm1.texturehoverid
						or u1.originalid = cm1.videoid
						or u1.websizeid = cm1.videoposterid
						or u1.originalid = cm1.videoposterid
						or u1.websizeid = cm1.heightmapid
						or u1.originalid = cm1.heightmapid
						or u1.websizeid = cm1.mixmapid
						or u1.originalid = cm1.mixmapid
						or u1.websizeid = cm1.texturerid
						or u1.originalid = cm1.texturerid
						or u1.websizeid = cm1.texturegid
						or u1.originalid = cm1.texturegid
						or u1.websizeid = cm1.texturebid
						or u1.originalid = cm1.texturebid
						or u1.websizeid = cm1.texturebumprid
						or u1.originalid = cm1.texturebumprid
						or u1.websizeid = cm1.texturebumpgid
						or u1.originalid = cm1.texturebumpgid
						or u1.websizeid = cm1.texturebumpbid
						or u1.originalid = cm1.texturebumpbid
						or u1.originalid = cm1.soundid)
						and not u1.uploadid = u1.cellsizeid
				left join (select * 
						from ".wtw_tableprefix."webimages 
						where deleted=0 
							and not communitymoldid='') w
					on (cm1.communitymoldid = w.communitymoldid
							and u1.websizeid = w.imageid)
						or (cm1.communitymoldid = w.communitymoldid
							and u1.originalid = w.imageid)
						or (cm1.communitymoldid = w.communitymoldid
							and u1.websizeid = w.imagehoverid)
						or (cm1.communitymoldid = w.communitymoldid
							and u1.originalid = w.imagehoverid)
						or (cm1.communitymoldid = w.communitymoldid
							and u1.websizeid = w.imageclickid)
						or (cm1.communitymoldid = w.communitymoldid
							and u1.originalid = w.imageclickid)
			group by u1.uploadid,
				u1.pastuploadid,
				u1.originalid,
				u1.websizeid,
				u1.thumbnailid,
				u1.filetitle,
				u1.filename,
				u1.fileextension,
				u1.filesize,
				u1.filetype,
				u1.filepath,
				u1.imagewidth,
				u1.imageheight,
				u1.stock,
				u1.userid;");
		$i = 0;
		/* create uploads array */
		foreach ($zresults as $zrow) {
			$zuploads[$i]  = array(
				'uploadid'=> $zrow["uploadid"],
				'originalid'=> $zrow["originalid"],
				'websizeid'=> $zrow["websizeid"],
				'cellsizeid'=> $zrow["cellsizeid"],
				'thumbnailid'=> $zrow["thumbnailid"],
				'userid'=> $zrow["userid"],
				'filetitle' => $zrow["filetitle"],
				'filename' => $zrow["filename"],
				'fileextension' => $zrow["fileextension"],
				'filetype' => $zrow["filetype"],
				'filesize' => $zrow["filesize"],
				'filepath'=> $zrow["filepath"],
				'data'=> "data:".$zrow["filetype"].";base64,".addslashes(base64_encode($zrow["filedata"])),
				'imagewidth' => $zrow["imagewidth"],
				'imageheight' => $zrow["imageheight"],
				'createdate' => $zrow["createdate"],
				'createuserid' => $zrow["createuserid"],
				'updatedate' => $zrow["updatedate"],
				'updateuserid' => $zrow["updateuserid"]
			); 
			$i += 1;
		}

		/* select upload objects for the community */
		$zresults = $wtwconnect->query("
			select uo1.uploadobjectid,
				uo1.userid,
				uo1.objectfolder,
				uo1.objectfile,
				uo1.createdate,
				uo1.createuserid,
				uo1.updatedate,
				uo1.updateuserid
			from ".wtw_tableprefix."uploadobjects uo1
				inner join ".wtw_tableprefix."communitymolds cm
					on uo1.uploadobjectid=cm.uploadobjectid
			where cm.communityid='".$zcommunityid."'
				and cm.deleted=0
				and uo1.deleted=0
				and not cm.communityid='';");
		$i = 0;
		/* create uploadobjects array */
		foreach ($zresults as $zrow) {
			$zuploadobjects[$i]  = array(
				'uploadobjectid'=> $zrow["uploadobjectid"], 
				'userid'=> $zrow["userid"],
				'objectfolder'=> $zrow["objectfolder"],
				'objectfile'=> $zrow["objectfile"],
				'createdate' => $zrow["createdate"],
				'createuserid' => $zrow["createuserid"],
				'updatedate' => $zrow["updatedate"],
				'updateuserid' => $zrow["updateuserid"]
			); 
			$i += 1;
		}
		
		/* select upload object animations for the community */
		$zresults = $wtwconnect->query("
			select uo1.objectanimationid,
				uo1.uploadobjectid,
				uo1.userid,
				uo1.animationname,
				uo1.moldnamepart,
				uo1.moldevent,
				uo1.startframe,
				uo1.endframe,
				uo1.animationloop,
				uo1.speedratio,
				uo1.animationendscript,
				uo1.animationendparameters,
				uo1.additionalscript,
				uo1.additionalparameters,
				uo1.soundid,
				uo1.soundmaxdistance,
				uo1.createdate,
				uo1.createuserid,
				uo1.updatedate,
				uo1.updateuserid
			from ".wtw_tableprefix."uploadobjectanimations uo1
				inner join ".wtw_tableprefix."communitymolds cm
					on uo1.uploadobjectid=cm.uploadobjectid
			where cm.communityid='".$zcommunityid."'
				and cm.deleted=0
				and uo1.deleted=0
				and not cm.communityid='';");
		$i = 0;
		/* create uploadobjectanimations array */
		foreach ($zresults as $zrow) {
			$zuploadobjectanimations[$i]  = array(
				'objectanimationid'=> $zrow["objectanimationid"], 
				'uploadobjectid'=> $zrow["uploadobjectid"], 
				'userid'=> $zrow["userid"],
				'animationname' => htmlspecialchars($zrow["animationname"], ENT_QUOTES, 'UTF-8'),
				'moldnamepart'=> $zrow["moldnamepart"],
				'moldevent'=> $zrow["moldevent"],
				'startframe'=> $zrow["startframe"], 
				'endframe'=> $zrow["endframe"], 
				'animationloop'=> $zrow["animationloop"], 
				'speedratio'=> $zrow["speedratio"], 
				'animationendscript'=> $zrow["animationendscript"], 
				'animationendparameters'=> $zrow["animationendparameters"], 
				'additionalscript'=> $zrow["additionalscript"], 
				'additionalparameters'=> $zrow["additionalparameters"], 
				'soundid'=> $zrow["soundid"], 
				'soundmaxdistance'=> $zrow["soundmaxdistance"], 
				'createdate' => $zrow["createdate"],
				'createuserid' => $zrow["createuserid"],
				'updatedate' => $zrow["updatedate"],
				'updateuserid' => $zrow["updateuserid"]
			); 
			$i += 1;
		}

		/* select web images for the community */
		$zresults = $wtwconnect->query("
			select wi1.webimageid,
				wi1.communitymoldid,
				wi1.userid,
				wi1.imageindex,
				wi1.imageid,
				wi1.imagehoverid,
				wi1.imageclickid,
				wi1.graphiclevel,
				wi1.jsfunction,
				wi1.jsparameters,
				wi1.alttag,
				wi1.createdate,
				wi1.createuserid,
				wi1.updatedate,
				wi1.updateuserid
			from ".wtw_tableprefix."webimages wi1
				inner join ".wtw_tableprefix."communitymolds cm
					on wi1.communitymoldid=cm.communitymoldid
			where cm.communityid='".$zcommunityid."'
				and cm.deleted=0
				and wi1.deleted=0
				and not cm.communityid='';");
		$i = 0;
		/* create webimages array */
		foreach ($zresults as $zrow) {
			$zwebimages[$i]  = array(
				'webimageid'=> $zrow["webimageid"], 
				'communitymoldid'=> $zrow["communitymoldid"], 
				'buildingmoldid'=> '', 
				'thingmoldid'=> '', 
				'userid'=> $zrow["userid"],
				'imageindex'=> $zrow["imageindex"],
				'imageid'=> $zrow["imageid"],
				'imagehoverid'=> $zrow["imagehoverid"], 
				'imageclickid'=> $zrow["imageclickid"], 
				'graphiclevel'=> $zrow["graphiclevel"], 
				'jsfunction'=> $zrow["jsfunction"], 
				'jsparameters'=> $zrow["jsparameters"], 
				'alttag' => htmlspecialchars($zrow["alttag"], ENT_QUOTES, 'UTF-8'),
				'createdate' => $zrow["createdate"],
				'createuserid' => $zrow["createuserid"],
				'updatedate' => $zrow["updatedate"],
				'updateuserid' => $zrow["updateuserid"]
			); 
			$i += 1;
		}
		/* header to only allow downloads from 3dnet.walktheweb.com */
		
		echo $wtwconnect->addConnectHeader('3dnet.walktheweb.com');
		
		/* assemble JSON response */
		$zresponse['community'] = $zcommunity;
		$zresponse['connectinggrids'] = $zconnectinggrids;
		$zresponse['actionzones'] = $zactionzones;
		$zresponse['communitymolds'] = $zcommunitymolds;
		$zresponse['moldpoints'] = $zmoldpoints;
		$zresponse['uploads'] = $zuploads;
		$zresponse['uploadobjects'] = $zuploadobjects;
		$zresponse['uploadobjectanimations'] = $zuploadobjectanimations;
		$zresponse['webimages'] = $zwebimages;
		$zresponse['serror'] = array('errortext'=>'');
	} else {
		$zresponse = array('errortext'=>'You do not have permission to download this file');
	}
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-communityshare.php=".$e->getMessage());
}
?>


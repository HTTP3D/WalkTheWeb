<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides multiple 3D Communities information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/communities.php");

	/* get values from querystring or session */
	$zuserid = $wtwconnect->userid;
	$zfilter = $wtwconnect->getVal('filter','mine');

	/* check user for global roles with access */
	$hasaccess = false;
	if ($zfilter == 'all') {
		$zroles = $wtwconnect->getUserRoles($zuserid);
		foreach ($zroles as $zrole) {
			if (strtolower($zrole['rolename']) == 'admin' || strtolower($zrole['rolename']) == 'architect' || strtolower($zrole['rolename']) == 'developer' || strtolower($zrole['rolename']) == 'graphics artist') {
				$hasaccess = true;
			}
		}
	}
	/* select communities by userid */
	$zresults = array();
	if ($hasaccess) {
		/* select communities based on global role */
		$zresults = $wtwconnect->query("
			select '".$wtwconnect->userid."' as useraccess,
				c1.communityid,
				c1.versionid,
				c1.version,
				c1.versionorder,
				c1.versiondesc,
				c1.communityname,
				c1.communitydescription,
				c1.snapshotid,
				c1.analyticsid,
				c1.gravity,
				c1.templatename,
				c1.description,
				c1.tags,
				c1.textureid,
				u2.filepath as texturepath,
				c1.skydomeid,
				c1.waterbumpid,
				u3.filepath as waterbumppath,
				c1.groundpositiony,
				c1.waterpositiony,
				c1.waterbumpheight,
				c1.watersubdivisions,
				c1.windforce,
				c1.winddirectionx,
				c1.winddirectiony,
				c1.winddirectionz,
				c1.waterwaveheight,
				c1.waterwavelength,
				c1.watercolorrefraction,
				c1.watercolorreflection,
				c1.watercolorblendfactor,
				c1.watercolorblendfactor2,
				c1.wateralpha,
				c1.sceneambientcolor,
				c1.sceneclearcolor,
				c1.sceneuseclonedmeshmap,
				c1.sceneblockmaterialdirtymechanism,
				c1.scenefogenabled,
				c1.scenefogmode,
				c1.scenefogdensity,
				c1.scenefogstart,
				c1.scenefogend,
				c1.scenefogcolor,
				c1.sundirectionalintensity,
				c1.sundiffusecolor,
				c1.sunspecularcolor,
				c1.sungroundcolor,
				c1.sundirectionx,
				c1.sundirectiony,
				c1.sundirectionz,
				c1.backlightintensity,
				c1.backlightdirectionx,
				c1.backlightdirectiony,
				c1.backlightdirectionz,
				c1.backlightdiffusecolor,
				c1.backlightspecularcolor,
				c1.skytype,
				c1.skysize,
				c1.skyboxfolder,
				c1.skyboxfile,
				c1.skyboximageleft,
				c1.skyboximageup,
				c1.skyboximagefront,
				c1.skyboximageright,
				c1.skyboximagedown,
				c1.skyboximageback,
				c1.skypositionoffsetx,
				c1.skypositionoffsety,
				c1.skypositionoffsetz,
				c1.skyboxmicrosurface,
				c1.skyboxpbr,
				c1.skyboxasenvironmenttexture,
				c1.skyboxblur,
				c1.skyboxdiffusecolor,
				c1.skyboxspecularcolor,
				c1.skyboxambientcolor,
				c1.skyboxemissivecolor,
				c1.skyinclination,
				c1.skyluminance,
				c1.skyazimuth,
				c1.skyrayleigh,
				c1.skyturbidity,
				c1.skymiedirectionalg,
				c1.skymiecoefficient,
				c1.alttag,
				c1.buildingpositionx,
				c1.buildingpositiony,
				c1.buildingpositionz,
				c1.buildingscalingx,
				c1.buildingscalingy,
				c1.buildingscalingz,
				c1.buildingrotationx,
				c1.buildingrotationy,
				c1.buildingrotationz,
				c1.createdate,
				c1.createuserid,
				c1.updatedate,
				c1.updateuserid,
				u1.filepath,
				u1.filetype,
				max(u1.filedata) as filedata
			from ".wtw_tableprefix."communities c1
				left join ".wtw_tableprefix."uploads u1
					on c1.snapshotid=u1.uploadid
				left join ".wtw_tableprefix."uploads u2
					on c1.textureid=u2.uploadid
				left join ".wtw_tableprefix."uploads u3
					on c1.waterbumpid=u3.uploadid
			where 
			   c1.deleted=0
			group by 
				useraccess,
				c1.communityid,
				c1.versionid,
				c1.version,
				c1.versionorder,
				c1.versiondesc,
				c1.communityname,
				c1.communitydescription,
				c1.snapshotid,
				c1.analyticsid,
				c1.gravity,
				c1.templatename,
				c1.description,
				c1.tags,
				c1.textureid,
				u2.filepath,
				c1.skydomeid,
				c1.waterbumpid,
				u3.filepath,
				c1.groundpositiony,
				c1.waterpositiony,
				c1.waterbumpheight,
				c1.watersubdivisions,
				c1.windforce,
				c1.winddirectionx,
				c1.winddirectiony,
				c1.winddirectionz,
				c1.waterwaveheight,
				c1.waterwavelength,
				c1.watercolorrefraction,
				c1.watercolorreflection,
				c1.watercolorblendfactor,
				c1.watercolorblendfactor2,
				c1.wateralpha,
				c1.sceneambientcolor,
				c1.sceneclearcolor,
				c1.sceneuseclonedmeshmap,
				c1.sceneblockmaterialdirtymechanism,
				c1.scenefogenabled,
				c1.scenefogmode,
				c1.scenefogdensity,
				c1.scenefogstart,
				c1.scenefogend,
				c1.scenefogcolor,
				c1.sundirectionalintensity,
				c1.sundiffusecolor,
				c1.sunspecularcolor,
				c1.sungroundcolor,
				c1.sundirectionx,
				c1.sundirectiony,
				c1.sundirectionz,
				c1.backlightintensity,
				c1.backlightdirectionx,
				c1.backlightdirectiony,
				c1.backlightdirectionz,
				c1.backlightdiffusecolor,
				c1.backlightspecularcolor,
				c1.skytype,
				c1.skysize,
				c1.skyboxfolder,
				c1.skyboxfile,
				c1.skyboximageleft,
				c1.skyboximageup,
				c1.skyboximagefront,
				c1.skyboximageright,
				c1.skyboximagedown,
				c1.skyboximageback,
				c1.skypositionoffsetx,
				c1.skypositionoffsety,
				c1.skypositionoffsetz,
				c1.skyboxmicrosurface,
				c1.skyboxpbr,
				c1.skyboxasenvironmenttexture,
				c1.skyboxblur,
				c1.skyboxdiffusecolor,
				c1.skyboxspecularcolor,
				c1.skyboxambientcolor,
				c1.skyboxemissivecolor,
				c1.skyinclination,
				c1.skyluminance,
				c1.skyazimuth,
				c1.skyrayleigh,
				c1.skyturbidity,
				c1.skymiedirectionalg,
				c1.skymiecoefficient,
				c1.alttag,
				c1.buildingpositionx,
				c1.buildingpositiony,
				c1.buildingpositionz,
				c1.buildingscalingx,
				c1.buildingscalingy,
				c1.buildingscalingz,
				c1.buildingrotationx,
				c1.buildingrotationy,
				c1.buildingrotationz,
				c1.createdate,
				c1.createuserid,
				c1.updatedate,
				c1.updateuserid,
				u1.filepath,
				u1.filetype
			order by c1.communityname, 
				c1.communityid;");
	} else {
		/* select communities for user with granular permissions */
		$zresults = $wtwconnect->query("
			select ua1.useraccess,
				c1.communityid,
				c1.versionid,
				c1.version,
				c1.versionorder,
				c1.versiondesc,
				c1.communityname,
				c1.communitydescription,
				c1.snapshotid,
				c1.analyticsid,
				c1.gravity,
				c1.templatename,
				c1.description,
				c1.tags,
				c1.textureid,
				u2.filepath as texturepath,
				c1.skydomeid,
				c1.waterbumpid,
				u3.filepath as waterbumppath,
				c1.groundpositiony,
				c1.waterpositiony,
				c1.waterbumpheight,
				c1.watersubdivisions,
				c1.windforce,
				c1.winddirectionx,
				c1.winddirectiony,
				c1.winddirectionz,
				c1.waterwaveheight,
				c1.waterwavelength,
				c1.watercolorrefraction,
				c1.watercolorreflection,
				c1.watercolorblendfactor,
				c1.watercolorblendfactor2,
				c1.wateralpha,
				c1.sceneambientcolor,
				c1.sceneclearcolor,
				c1.sceneuseclonedmeshmap,
				c1.sceneblockmaterialdirtymechanism,
				c1.scenefogenabled,
				c1.scenefogmode,
				c1.scenefogdensity,
				c1.scenefogstart,
				c1.scenefogend,
				c1.scenefogcolor,
				c1.sundirectionalintensity,
				c1.sundiffusecolor,
				c1.sunspecularcolor,
				c1.sungroundcolor,
				c1.sundirectionx,
				c1.sundirectiony,
				c1.sundirectionz,
				c1.backlightintensity,
				c1.backlightdirectionx,
				c1.backlightdirectiony,
				c1.backlightdirectionz,
				c1.backlightdiffusecolor,
				c1.backlightspecularcolor,
				c1.skytype,
				c1.skysize,
				c1.skyboxfolder,
				c1.skyboxfile,
				c1.skyboximageleft,
				c1.skyboximageup,
				c1.skyboximagefront,
				c1.skyboximageright,
				c1.skyboximagedown,
				c1.skyboximageback,
				c1.skypositionoffsetx,
				c1.skypositionoffsety,
				c1.skypositionoffsetz,
				c1.skyboxmicrosurface,
				c1.skyboxpbr,
				c1.skyboxasenvironmenttexture,
				c1.skyboxblur,
				c1.skyboxdiffusecolor,
				c1.skyboxspecularcolor,
				c1.skyboxambientcolor,
				c1.skyboxemissivecolor,
				c1.skyinclination,
				c1.skyluminance,
				c1.skyazimuth,
				c1.skyrayleigh,
				c1.skyturbidity,
				c1.skymiedirectionalg,
				c1.skymiecoefficient,
				c1.alttag,
				c1.buildingpositionx,
				c1.buildingpositiony,
				c1.buildingpositionz,
				c1.buildingscalingx,
				c1.buildingscalingy,
				c1.buildingscalingz,
				c1.buildingrotationx,
				c1.buildingrotationy,
				c1.buildingrotationz,
				c1.createdate,
				c1.createuserid,
				c1.updatedate,
				c1.updateuserid,
				u1.filepath,
				u1.filetype,
				max(u1.filedata) as filedata
			from ".wtw_tableprefix."userauthorizations ua1
				inner join ".wtw_tableprefix."communities c1
					on ua1.communityid = c1.communityid
				left join ".wtw_tableprefix."uploads u1
					on c1.snapshotid=u1.uploadid
				left join ".wtw_tableprefix."uploads u2
					on c1.textureid=u2.uploadid
				left join ".wtw_tableprefix."uploads u3
					on c1.waterbumpid=u3.uploadid
			where ua1.userid='".$wtwconnect->userid."'
					and ua1.deleted=0
					and (ua1.useraccess='admin'
					or ua1.useraccess='architect')
			   and c1.deleted=0
			group by 
				ua1.useraccess,
				c1.communityid,
				c1.versionid,
				c1.version,
				c1.versionorder,
				c1.versiondesc,
				c1.communityname,
				c1.communitydescription,
				c1.snapshotid,
				c1.analyticsid,
				c1.gravity,
				c1.templatename,
				c1.description,
				c1.tags,
				c1.textureid,
				u2.filepath,
				c1.skydomeid,
				c1.waterbumpid,
				u3.filepath,
				c1.groundpositiony,
				c1.waterpositiony,
				c1.waterbumpheight,
				c1.watersubdivisions,
				c1.windforce,
				c1.winddirectionx,
				c1.winddirectiony,
				c1.winddirectionz,
				c1.waterwaveheight,
				c1.waterwavelength,
				c1.watercolorrefraction,
				c1.watercolorreflection,
				c1.watercolorblendfactor,
				c1.watercolorblendfactor2,
				c1.wateralpha,
				c1.sceneambientcolor,
				c1.sceneclearcolor,
				c1.sceneuseclonedmeshmap,
				c1.sceneblockmaterialdirtymechanism,
				c1.scenefogenabled,
				c1.scenefogmode,
				c1.scenefogdensity,
				c1.scenefogstart,
				c1.scenefogend,
				c1.scenefogcolor,
				c1.sundirectionalintensity,
				c1.sundiffusecolor,
				c1.sunspecularcolor,
				c1.sungroundcolor,
				c1.sundirectionx,
				c1.sundirectiony,
				c1.sundirectionz,
				c1.backlightintensity,
				c1.backlightdirectionx,
				c1.backlightdirectiony,
				c1.backlightdirectionz,
				c1.backlightdiffusecolor,
				c1.backlightspecularcolor,
				c1.skytype,
				c1.skysize,
				c1.skyboxfolder,
				c1.skyboxfile,
				c1.skyboximageleft,
				c1.skyboximageup,
				c1.skyboximagefront,
				c1.skyboximageright,
				c1.skyboximagedown,
				c1.skyboximageback,
				c1.skypositionoffsetx,
				c1.skypositionoffsety,
				c1.skypositionoffsetz,
				c1.skyboxmicrosurface,
				c1.skyboxpbr,
				c1.skyboxasenvironmenttexture,
				c1.skyboxblur,
				c1.skyboxdiffusecolor,
				c1.skyboxspecularcolor,
				c1.skyboxambientcolor,
				c1.skyboxemissivecolor,
				c1.skyinclination,
				c1.skyluminance,
				c1.skyazimuth,
				c1.skyrayleigh,
				c1.skyturbidity,
				c1.skymiedirectionalg,
				c1.skymiecoefficient,
				c1.alttag,
				c1.buildingpositionx,
				c1.buildingpositiony,
				c1.buildingpositionz,
				c1.buildingscalingx,
				c1.buildingscalingy,
				c1.buildingscalingz,
				c1.buildingrotationx,
				c1.buildingrotationy,
				c1.buildingrotationz,
				c1.createdate,
				c1.createuserid,
				c1.updatedate,
				c1.updateuserid,
				u1.filepath,
				u1.filetype
			order by c1.communityname, 
				c1.communityid;");
	}

	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$i = 0;
	$zresponse = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zauthorizedusers = array(
			'userid'=> $wtwconnect->userid
		);
		$snapshotdata = null;
		if ((!isset($zrow["filepath"]) || empty($zrow["filepath"])) && isset($zrow["filedata"]) && !empty($zrow["filedata"])) {
			$snapshotdata = "data:".$zrow["filetype"].";base64,".addslashes(base64_encode($zrow["filedata"]));
		}
		$zcommunityinfo = array(
			'communityid' => $zrow["communityid"],
			'versionid' => $zrow["versionid"],
			'version' => $zrow["version"],
			'versionorder' => $zrow["versionorder"],
			'versiondesc' => $wtwconnect->escapeHTML($zrow["versiondesc"]),
			'communityname' => $wtwconnect->escapeHTML($zrow["communityname"]),
			'communitydescription' => $wtwconnect->escapeHTML($zrow["communitydescription"]),
			'snapshotid' => $zrow["snapshotid"],
			'snapshotpath' => $zrow["filepath"],
			'analyticsid'=> $zrow["analyticsid"],
			'createdate' => $zrow["createdate"],
			'createuserid' => $zrow["createuserid"],
			'updatedate' => $zrow["updatedate"],
			'updateuserid' => $zrow["updateuserid"],
			'snapshotdata'=> $snapshotdata
		);
		$zshare = array(
			'templatename' => $wtwconnect->escapeHTML($zrow["templatename"]),
			'description' => $wtwconnect->escapeHTML($zrow["description"]),
			'tags' => $wtwconnect->escapeHTML($zrow["tags"])
		);
		$zgraphics = array(
			'texture'=> array (
				'id'=> $zrow["textureid"],
				'path'=> $zrow["texturepath"],
				'backupid'=>'',
				'backuppath'=>''
			),
			'sky'=> array (
				'id'=> $zrow["skydomeid"],
				'backupid'=>''						
			)
		);
		$zground = array(
			'position'=> array (
				'y'=> $zrow["groundpositiony"]
			)
		);
		$zwater = array(
			'bump'=> array (
				'id'=> $zrow["waterbumpid"],
				'path'=> $zrow["waterbumppath"],
				'height'=> $zrow["waterbumpheight"],
				'backupid'=>'',
				'backuppath'=>''
			),
			'position'=> array (
				'y'=> $zrow["waterpositiony"]
			),
			'subdivisions'=> $zrow["watersubdivisions"],
			'waveheight'=> $zrow["waterwaveheight"],
			'wavelength'=> $zrow["waterwavelength"],
			'colorrefraction'=> $zrow["watercolorrefraction"],
			'colorreflection'=> $zrow["watercolorreflection"],
			'colorblendfactor'=> $zrow["watercolorblendfactor"],
			'colorblendfactor2'=> $zrow["watercolorblendfactor2"],
			'alpha'=> $zrow["wateralpha"]
		);
		$zwind = array(
			'direction'=> array (
				'x'=> $zrow["winddirectionx"],
				'y'=> $zrow["winddirectiony"],
				'z'=> $zrow["winddirectionz"]
			),
			'force'=> $zrow["windforce"]
		);

		$zscene = array(
			'sceneambientcolor' => $zrow["sceneambientcolor"],
			'sceneclearcolor' => $zrow["sceneclearcolor"],
			'sceneuseclonedmeshmap' => $zrow["sceneuseclonedmeshmap"],
			'sceneblockmaterialdirtymechanism' => $zrow["sceneblockmaterialdirtymechanism"]
		);
		$zlight = array(
			'sundirectionalintensity' => $zrow["sundirectionalintensity"],
			'sundiffusecolor' => $zrow["sundiffusecolor"],
			'sunspecularcolor' => $zrow["sunspecularcolor"],
			'sungroundcolor' => $zrow["sungroundcolor"],
			'sundirectionx' => $zrow["sundirectionx"],
			'sundirectiony' => $zrow["sundirectiony"],
			'sundirectionz' => $zrow["sundirectionz"],
			'backlightintensity' => $zrow["backlightintensity"],
			'backlightdirectionx' => $zrow["backlightdirectionx"],
			'backlightdirectiony' => $zrow["backlightdirectiony"],
			'backlightdirectionz' => $zrow["backlightdirectionz"],
			'backlightdiffusecolor' => $zrow["backlightdiffusecolor"],
			'backlightspecularcolor' => $zrow["backlightspecularcolor"]
		);
		$zfog = array(
			'scenefogenabled' => $zrow["scenefogenabled"],
			'scenefogmode' => $zrow["scenefogmode"],
			'scenefogdensity' => $zrow["scenefogdensity"],
			'scenefogstart' => $zrow["scenefogstart"],
			'scenefogend' => $zrow["scenefogend"],
			'scenefogcolor' => $zrow["scenefogcolor"]
		);
		$zsky = array(
			'skytype' => $zrow["skytype"],
			'skysize' => $zrow["skysize"],
			'skyboxfolder' => $zrow["skyboxfolder"],
			'skyboxfile' => $zrow["skyboxfile"],
			'skyboximageleft' => $zrow["skyboximageleft"],
			'skyboximageup' => $zrow["skyboximageup"],
			'skyboximagefront'=> $zrow["skyboximagefront"],
			'skyboximageright' => $zrow["skyboximageright"],
			'skyboximagedown' => $zrow["skyboximagedown"],
			'skyboximageback' => $zrow["skyboximageback"],
			'skypositionoffsetx' => $zrow["skypositionoffsetx"],
			'skypositionoffsety' => $zrow["skypositionoffsety"],
			'skypositionoffsetz' => $zrow["skypositionoffsetz"],
			'skyboxmicrosurface' => $zrow["skyboxmicrosurface"],
			'skyboxpbr' => $zrow["skyboxpbr"],
			'skyboxasenvironmenttexture' => $zrow["skyboxasenvironmenttexture"],
			'skyboxblur' => $zrow["skyboxblur"],
			'skyboxdiffusecolor' => $zrow["skyboxdiffusecolor"],
			'skyboxspecularcolor' => $zrow["skyboxspecularcolor"],
			'skyboxambientcolor' => $zrow["skyboxambientcolor"],
			'skyboxemissivecolor' => $zrow["skyboxemissivecolor"],
			'skyinclination' => $zrow["skyinclination"],
			'skyluminance' => $zrow["skyluminance"],
			'skyazimuth' => $zrow["skyazimuth"],
			'skyrayleigh' => $zrow["skyrayleigh"],
			'skyturbidity' => $zrow["skyturbidity"],
			'skymiedirectionalg' => $zrow["skymiedirectionalg"],
			'skymiecoefficient' => $zrow["skymiecoefficient"]
		);

		$zalttag = array(
			'name' => $zrow["alttag"]
		);
		$zfirstbuilding = array(
			'position' => array(
				'x'=> $zrow["buildingpositionx"], 
				'y'=> $zrow["buildingpositiony"], 
				'z'=> $zrow["buildingpositionz"]
			),
			'scaling' => array(
				'x'=> $zrow["buildingscalingx"], 
				'y'=> $zrow["buildingscalingy"], 
				'z'=> $zrow["buildingscalingz"]
			),
			'rotation' => array(
				'x'=> $zrow["buildingrotationx"], 
				'y'=> $zrow["buildingrotationy"], 
				'z'=> $zrow["buildingrotationz"]
			)
		);
		$zresponse[$i] = array(
			'communityinfo' => $zcommunityinfo,
			'serverfranchiseid' => '',
			'share'=> $zshare,
			'graphics' => $zgraphics,
			'ground' => $zground,
			'water' => $zwater,
			'wind' => $zwind,
			'scene' => $zscene,
			'light' => $zlight,
			'fog' => $zfog,
			'sky' => $zsky,
			'authorizedusers'=> $zauthorizedusers,
			'alttag'=> $zalttag,
			'firstbuilding'=> $zfirstbuilding,
			'gravity'=> $zrow["gravity"]
		);
		$i += 1;
	}
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-communities.php=".$e->getMessage());
}
?>

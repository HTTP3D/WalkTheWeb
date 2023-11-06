<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides 3D Community information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/community.php");
	
	/* get values from querystring or session */
	$zcommunityid = $wtwconnect->getVal('communityid','');

	/* select community data */
	$zresults = $wtwconnect->query("
		select c1.*,
			az1.actionzoneid as extremeloadzoneid,
			case when c1.textureid = '' then ''
				else
					(select u1.filepath 
						from ".wtw_tableprefix."uploads u2 
							left join ".wtw_tableprefix."uploads u1 
								on u2.websizeid=u1.uploadid 
						where u2.uploadid=c1.textureid limit 1)
				end as texturepath,
			case when c1.textureid = '' then ''
				else
					(select u1.filepath 
						from ".wtw_tableprefix."uploads u2 
							left join ".wtw_tableprefix."uploads u1 
								on u2.uploadid=u1.uploadid 
						where u2.uploadid=c1.textureid limit 1)
				end as texturepath2,
			case when c1.skydomeid = '' then ''
				else
					(select u1.filepath 
						from ".wtw_tableprefix."uploads u2 
							left join ".wtw_tableprefix."uploads u1 
								on u2.websizeid=u1.uploadid 
						where u2.uploadid=c1.skydomeid limit 1)
				end as skydomepath,
			case when c1.skydomeid = '' then ''
				else
					(select u1.filepath 
						from ".wtw_tableprefix."uploads u2 
							left join ".wtw_tableprefix."uploads u1 
								on u2.uploadid=u1.uploadid 
						where u2.uploadid=c1.skydomeid limit 1)
				end as skydomepath2,
			case when c1.waterbumpid = '' then ''
				else
					(select u1.filepath 
						from ".wtw_tableprefix."uploads u2 
							left join ".wtw_tableprefix."uploads u1 
								on u2.websizeid=u1.uploadid 
						where u2.uploadid=c1.waterbumpid limit 1)
				end as waterbumppath,
			case when c1.waterbumpid = '' then ''
				else
					(select u1.filepath 
						from ".wtw_tableprefix."uploads u2 
							left join ".wtw_tableprefix."uploads u1 
								on u2.uploadid=u1.uploadid 
						where u2.uploadid=c1.waterbumpid limit 1)
				end as waterbumppath2,
			case when c1.snapshotid = '' then ''
				else
					(select u1.filepath 
						from ".wtw_tableprefix."uploads u1 
						where u1.uploadid=c1.snapshotid limit 1)
				end as snapshotpath,
			case when (select GROUP_CONCAT(userid) as useraccess 
						from ".wtw_tableprefix."userauthorizations 
						where communityid='".$zcommunityid."' 
							and deleted=0 
							and not communityid='') is null then ''
				else
					(select GROUP_CONCAT(userid) as useraccess 
						from ".wtw_tableprefix."userauthorizations 
						where communityid='".$zcommunityid."' 
							and deleted=0 
							and not communityid='')
				end as communityaccess
		from ".wtw_tableprefix."communities c1 
			left join ".wtw_tableprefix."uploads u3
				on c1.textureid=u3.uploadid
			left join (select communityid, actionzoneid 
				from ".wtw_tableprefix."actionzones 
				where actionzonename like 'extreme%' 
					and not actionzonename like '%custom%' 
					and not communityid='') az1 
				on c1.communityid=az1.communityid
		where c1.communityid='".$zcommunityid."'
		   and c1.deleted=0;");

	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$i = 0;
	$zresponse = array();
	$communities = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zauthorizedusers = array(
			'userid'=> $zrow["userid"]
		);
		$zcommunityinfo = array(
			'communityid' => $zrow["communityid"],
			'versionid' => $zrow["versionid"],
			'version' => $zrow["version"],
			'versionorder' => $zrow["versionorder"],
			'versiondesc' => $wtwconnect->escapeHTML($zrow["versiondesc"]),
			'communityname' => $wtwconnect->escapeHTML($zrow["communityname"]),
			'communitydescription' => $wtwconnect->escapeHTML($zrow["communitydescription"]),
			'snapshotid' => $zrow["snapshotid"],
			'snapshotpath' => $zrow["snapshotpath"],
			'analyticsid'=> $zrow["analyticsid"],
			'extremeloadzoneid' => $zrow["extremeloadzoneid"],
			'createdate' => $zrow["createdate"],
			'createuserid' => $zrow["createuserid"],
			'updatedate' => $zrow["updatedate"],
			'updateuserid' => $zrow["updateuserid"],
			'access'=> $zrow["communityaccess"]
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
				'path2'=> $zrow["texturepath2"],
				'backupid'=>'',
				'backuppath'=>''
			),
			'sky'=> array (
				'id'=> $zrow["skydomeid"],
				'path'=> $zrow["skydomepath"],
				'path2'=> $zrow["skydomepath2"],
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
				'path2'=> $zrow["waterbumppath2"],
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
		$communities[$i] = array(
			'communityinfo' => $zcommunityinfo,
			'serverfranchiseid' => '',
			'share'=> $zshare,
			'firstbuilding'=> $zfirstbuilding,
			'graphics' => $zgraphics,
			'ground' => $zground,
			'water' => $zwater,
			'wind' => $zwind,
			'scene' => $zscene,
			'light' => $zlight,
			'fog' => $zfog,
			'sky' => $zsky,
			'authorizedusers'=> $zauthorizedusers,
			'gravity'=> $zrow["gravity"]
		);
		$i += 1;
	}
	$zresponse['communities'] = $communities;
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-community.php=".$e->getMessage());
}
?>
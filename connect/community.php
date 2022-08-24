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
			case when c1.textureid = '' then ''
				else
					(select u1.filepath 
						from ".wtw_tableprefix."uploads u2 
							left join ".wtw_tableprefix."uploads u1 
								on u2.websizeid=u1.uploadid 
						where u2.uploadid=c1.textureid limit 1)
				end as texturepath,
			case when c1.skydomeid = '' then ''
				else
					(select u1.filepath 
						from ".wtw_tableprefix."uploads u2 
							left join ".wtw_tableprefix."uploads u1 
								on u2.websizeid=u1.uploadid 
						where u2.uploadid=c1.skydomeid limit 1)
				end as skydomepath,
			case when c1.waterbumpid = '' then ''
				else
					(select u1.filepath 
						from ".wtw_tableprefix."uploads u2 
							left join ".wtw_tableprefix."uploads u1 
								on u2.websizeid=u1.uploadid 
						where u2.uploadid=c1.waterbumpid limit 1)
				end as waterbumppath,
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
			'versiondesc' => htmlspecialchars($zrow["versiondesc"], ENT_QUOTES, 'UTF-8'),
			'communityname' => htmlspecialchars($zrow["communityname"], ENT_QUOTES, 'UTF-8'),
			'communitydescription' => htmlspecialchars($zrow["communitydescription"], ENT_QUOTES, 'UTF-8'),
			'updatedate' => $zrow["updatedate"],
			'updateuserid' => $zrow["updateuserid"],
			'createdate' => $zrow["createdate"],
			'createuserid' => $zrow["createuserid"],
			'snapshotid' => $zrow["snapshotid"],
			'snapshotpath' => $zrow["snapshotpath"],
			'analyticsid'=> $zrow["analyticsid"],
			'access'=> $zrow["communityaccess"]
		);
		$zshare = array(
			'templatename' => htmlspecialchars($zrow["templatename"], ENT_QUOTES, 'UTF-8'),
			'description' => htmlspecialchars($zrow["description"], ENT_QUOTES, 'UTF-8'),
			'tags' => htmlspecialchars($zrow["tags"], ENT_QUOTES, 'UTF-8')
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
				'path'=> $zrow["skydomepath"],
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
			'share'=> $zshare,
			'firstbuilding'=> $zfirstbuilding,
			'graphics' => $zgraphics,
			'ground' => $zground,
			'water' => $zwater,
			'wind' => $zwind,
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
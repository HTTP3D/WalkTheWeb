<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides basic avatar information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/avatar.php");

	/* get values from querystring or session */
	$zavatarid = $wtwconnect->getVal('avatarid','');

	$zavatarparts = array();
	$zavataranimationdefs = array();

	/* pull avatar by id */

	/* pull avatar colors by id */
	$zresults = $wtwconnect->query("
		select * 
		from ".wtw_tableprefix."avatarcolors 
		where deleted=0 
			and avatarid='".$zavatarid."'
		order by avatarpart, avatarpartid;");
	$i = 0;
	foreach ($zresults as $zrow) {
		$zavatarparts[$i] = array(
			'avatarpartid'=> $zrow["avatarpartid"],
			'avatarpart'=> $zrow["avatarpart"],
			'diffusecolor'=> $zrow["diffusecolor"],
			'specularcolor'=> $zrow["specularcolor"],
			'emissivecolor'=> $zrow["emissivecolor"],
			'ambientcolor'=> $zrow["ambientcolor"]
		);
		$i += 1;
	}

	/* pull avatar animations by id */
	$zresults = $wtwconnect->query("
		select * 
		from ".wtw_tableprefix."avataranimations
		where avatarid='".$zavatarid."' 
				and deleted=0
		order by loadpriority desc, animationfriendlyname, animationevent, avataranimationid;");
	$i = 0;
	$zevent = '';
	foreach ($zresults as $zrow) {
		/* avoid duplicate animations for the same event, except for optional ones */
		if ($zrow["animationevent"] != $zevent || $zrow["animationevent"] == 'onoption') {
			$zanimationloop = true;
			if ($zrow["animationloop"] != '1') {
				$zanimationloop = false;
			}
			$zavataranimationdefs[$i] = array(
				'animationind'=> -1,
				'useravataranimationid'=> '',
				'avataranimationid'=> $zrow["avataranimationid"],
				'avatarid'=> $zrow["avatarid"],
				'loadpriority'=> (int)$zrow["loadpriority"],
				'animationevent'=> $zrow["animationevent"],
				'animationfriendlyname'=> $zrow["animationfriendlyname"],
				'animationicon'=> $zrow["animationicon"],
				'objectfolder'=> $zrow["objectfolder"],
				'objectfile'=> $zrow["objectfile"],
				'startframe'=> $zrow["startframe"],
				'endframe'=> $zrow["endframe"],
				'animationloop'=> $zanimationloop,
				'defaultspeedratio'=> $zrow["speedratio"],
				'speedratio'=> $zrow["speedratio"],
				'startweight'=> '0',
				'onanimationend'=> null,
				'walkspeed'=> '1',
				'totalframes'=> '0',
				'totalstartframe'=> '0',
				'totalendframe'=> '0',
				'soundid'=> $zrow["soundid"],
				'soundpath'=> $zrow["soundpath"],
				'soundmaxdistance'=> $zrow["soundmaxdistance"]
			);
			$i += 1;
			$zevent = $zrow["animationevent"];
		}
	}

	/* pull main avatar profile by id */
	$zresults = $wtwconnect->query("
		select a1.*,
			u1.uploadid,
			u1.filepath as snapshotpath
		from ".wtw_tableprefix."avatars a1
			left join ".wtw_tableprefix."uploads u1
				on a1.snapshotid=u1.uploadid
		where a1.deleted=0 
			and a1.avatarid='".$zavatarid."'
		order by a1.avatargroup, a1.sortorder, a1.displayname;");
	$zavatar = array();

	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	function arraysort($a, $b) {
		if ($a["loadpriority"] == $b["loadpriority"]) {
			return ($a["animationfriendlyname"] > $b["animationfriendlyname"]) ? 1 : -1;
		}
		return ($a["loadpriority"] < $b["loadpriority"]) ? 1 : -1;
	}

	foreach ($zresults as $zrow) {

		/* load the onwait animation if it is part of the main avatar file */
		$zavataranimationdefs[$i] = array(
			'animationind'=> -1,
			'useravataranimationid'=> '',
			'avataranimationid'=> '',
			'avatarid'=> $zrow["avatarid"],
			'loadpriority'=> 100,
			'animationevent'=> 'onwait',
			'animationfriendlyname'=> 'Default',
			'animationicon'=> '',
			'objectfolder'=> $zrow["objectfolder"],
			'objectfile'=> $zrow["objectfile"],
			'startframe'=> $zrow["startframe"],
			'endframe'=> $zrow["endframe"],
			'animationloop'=> true,
			'defaultspeedratio'=> 1,
			'speedratio'=> 1,
			'startweight'=> '0',
			'onanimationend'=> null,
			'walkspeed'=> '1',
			'totalframes'=> '0',
			'totalstartframe'=> '0',
			'totalendframe'=> '0',
			'soundid'=> '',
			'soundpath'=> '',
			'soundmaxdistance'=> 100
		);
		
		usort($zavataranimationdefs, "arraysort");
		
		$zsnapshot = '';
		$zsnapshotthumbnail = '';
		
		if (file_exists(wtw_rootpath.'/content/uploads/avatars/'.$zrow["avatarid"].'/snapshots/defaultavatar.png')) {
			$zsnapshot = '/content/uploads/avatars/'.$zrow["avatarid"].'/snapshots/defaultavatar.png';
		} else {
			$zsnapshot = '/content/system/images/profilebig.png';
		}
		if (file_exists(wtw_rootpath.'/content/uploads/avatars/'.$zrow["avatarid"].'/snapshots/defaultavatarsm.png')) {
			$zsnapshotthumbnail = '/content/uploads/avatars/'.$zrow["avatarid"].'/snapshots/defaultavatarsm.png';
		} else {
			$zsnapshotthumbnail = '/content/system/images/menuprofilebig.png';
		}
		
		/* Load the avatar information for response */
		$zavatar = array(
			'avatarid'=> $zrow["avatarid"],
			'versionid'=> $zrow["versionid"],
			'version'=> $zrow["version"],
			'versionorder'=> $zrow["versionorder"],
			'versiondesc'=> htmlspecialchars($zrow["versiondesc"], ENT_QUOTES, 'UTF-8'),
			'avatargroup'=> $zrow["avatargroup"],
			'displayname'=> htmlspecialchars($zrow["displayname"], ENT_QUOTES, 'UTF-8'),
			'avatardescription'=> htmlspecialchars($zrow["avatardescription"], ENT_QUOTES, 'UTF-8'),
			'gender'=> $zrow["gender"],
			'objects'=> array(
				'folder'=> $zrow["objectfolder"],
				'file'=> $zrow["objectfile"],
				'startframe'=> $zrow["startframe"],
				'endframe'=> $zrow["endframe"]
			),
			'position'=> array(
				'x'=> $zrow["positionx"],
				'y'=> $zrow["positiony"],
				'z'=> $zrow["positionz"]
			),
			'scaling'=> array(
				'x'=> $zrow["scalingx"],
				'y'=> $zrow["scalingy"],
				'z'=> $zrow["scalingz"]
			),
			'rotation'=> array(
				'x'=> $zrow["rotationx"],
				'y'=> $zrow["rotationy"],
				'z'=> $zrow["rotationz"]
			),
			'snapshots'=> array(
				'full'=> $zsnapshot,
				'thumbnail'=> $zsnapshotthumbnail
			),
			'start'=> array(
				'position'=> array(
					'x'=> 0,
					'y'=> 0,
					'z'=> 0
				),
				'rotation'=> array(
					'x'=> 0,
					'y'=> 0,
					'z'=> 0
				)
			),
			'share'=> array(
				'templatename' => htmlspecialchars($zrow["templatename"], ENT_QUOTES, 'UTF-8'),
				'description' => htmlspecialchars($zrow["description"], ENT_QUOTES, 'UTF-8'),
				'tags' => htmlspecialchars($zrow["tags"], ENT_QUOTES, 'UTF-8')
			),
			'sortorder'=> $zrow["sortorder"],
			'alttag'=> $zrow["alttag"],
			'avatarparts'=> $zavatarparts,
			'avataranimationdefs'=> $zavataranimationdefs,
			'createuserid'=> $zrow["createuserid"],
			'createdate'=> $zrow["createdate"],
			'updateuserid'=> $zrow["updateuserid"],
			'updatedate'=> $zrow["updatedate"]
		);
	}
	$zresponse['avatar'] = $zavatar;
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-avatar.php=".$e->getMessage());
}
?>

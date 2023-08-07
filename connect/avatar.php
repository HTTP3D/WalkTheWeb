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
	$zhostuserid = '';
	if ($wtwconnect->isUserInRole("Host") && $wtwconnect->isUserInRole("Admin") == false) {
		$zhostuserid = $wtwconnect->userid;
	}

	$zavatarparts = array();
	$zavataranimationdefs = array();
	$zavatargroups = array();
	$zavatargroupsall = array();

	/* pull avatar by id */

	/* pull avatar colors by id */
	$zresults = $wtwconnect->query("
		select * 
		from ".wtw_tableprefix."avatarcolors 
		where deleted=0 
			and avatarid='".$zavatarid."'
		order by avatarpart, avatarpartid;");
	$zpartind = 0;
	foreach ($zresults as $zrow) {
		$zavatarparts[$zpartind] = array(
			'avatarpartid'=> $zrow["avatarpartid"],
			'avatarpart'=> $zrow["avatarpart"],
			'diffusecolor'=> $zrow["diffusecolor"],
			'specularcolor'=> $zrow["specularcolor"],
			'emissivecolor'=> $zrow["emissivecolor"],
			'ambientcolor'=> $zrow["ambientcolor"]
		);
		$zpartind += 1;
	}

	/* pull avatar animations by id */
	$zresults = $wtwconnect->query("
		select a1.* 
			from ".wtw_tableprefix."avataranimations a1
			inner join (
				select animationevent, max(updatedate) as updatedate, max(avataranimationid) as avataranimationid 
				from ".wtw_tableprefix."avataranimations 
				where avatarid='".$zavatarid."'
					and deleted=0
					and not animationevent='onoption'
				group by animationevent) a2
			on a1.avataranimationid = a2.avataranimationid
			where a1.avatarid='".$zavatarid."' 
				and a1.deleted=0
		union
		select a3.* 
			from ".wtw_tableprefix."avataranimations a3
			inner join (
				select animationfriendlyname, max(updatedate) as updatedate, max(avataranimationid) as avataranimationid 
				from ".wtw_tableprefix."avataranimations 
				where avatarid='".$zavatarid."'
					and deleted=0
					and animationevent='onoption'
				group by animationfriendlyname) a4
			on a3.avataranimationid = a4.avataranimationid
			where a3.avatarid='".$zavatarid."' 
				and a3.deleted=0
		order by loadpriority desc, animationevent, animationfriendlyname, avataranimationid;");
	$zanimationind = 0;
	$zevent = '';
	foreach ($zresults as $zrow) {
		/* avoid duplicate animations for the same event, except for optional ones */
		if ($zrow["animationevent"] != $zevent || $zrow["animationevent"] == 'onoption') {
			$zanimationloop = true;
			if ($zrow["animationloop"] != '1') {
				$zanimationloop = false;
			}
			$zavataranimationdefs[$zanimationind] = array(
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
			$zanimationind += 1;
			$zevent = $zrow["animationevent"];
		}
	}

	/* pull avatar groups by id */
	$zresults = $wtwconnect->query("
		select g1.*,
			ag1.avatarsingroupid
		from ".wtw_tableprefix."avatargroups g1 
			left join (select * from ".wtw_tableprefix."avatarsingroups where avatarid='".$zavatarid."' and deleted=0) ag1
			on ag1.avatargroupid=g1.avatargroupid
		order by g1.avatargroup, ag1.avatarsingroupid;");
	$i = 0;
	$j = 0;
	foreach ($zresults as $zrow) {
		$zavatarsingroupid = '';
		if (isset($zrow["avatarsingroupid"]) && !empty($zrow["avatarsingroupid"])) {
			$zavatarsingroupid = $zrow["avatarsingroupid"];
		}
		$zavatargroupsall[$j] = array(
			'avatarsingroupid'=> $zavatarsingroupid,
			'avatargroupid'=> $zrow["avatargroupid"],
			'avatargroup'=> $zrow["avatargroup"]
		);
		$j += 1;
		if (!empty($zavatarsingroupid)) {
			$zavatargroups[$i] = array(
				'avatarsingroupid'=> $zrow["avatarsingroupid"],
				'avatargroupid'=> $zrow["avatargroupid"],
				'avatargroup'=> $zrow["avatargroup"]
			);
			$i += 1;
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
			and (hostuserid='".$zhostuserid."' or hostuserid='')
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
		$zavataranimationdefs[$zanimationind] = array(
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
			'hostuserid'=> $zrow["hostuserid"],
			'versionid'=> $zrow["versionid"],
			'version'=> $zrow["version"],
			'versionorder'=> $zrow["versionorder"],
			'versiondesc'=> $wtwconnect->escapeHTML($zrow["versiondesc"]),
			'avatargroup'=> $zrow["avatargroup"],
			'avatargroups'=> $zavatargroups,
			'avatargroupsall'=> $zavatargroupsall,
			'displayname'=> $wtwconnect->escapeHTML($zrow["displayname"]),
			'avatardescription'=> $wtwconnect->escapeHTML($zrow["avatardescription"]),
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
				'templatename' => $wtwconnect->escapeHTML($zrow["templatename"]),
				'description' => $wtwconnect->escapeHTML($zrow["description"]),
				'tags' => $wtwconnect->escapeHTML($zrow["tags"])
			),
			'sounds'=> array(
				'voice' => null
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

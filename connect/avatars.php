<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides multiple avatars information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/avatars.php");

	/* get values from querystring or session */
	$zgroups = $wtwconnect->getVal('groups','');
	
	$zresults = array();
	$zwebtype = 'avatars';
	if (!empty($zgroups) && isset($zgroups)) {
		if ($zgroups == 'my') {
			/* pull a group of MY available avatars */
			$zresults = $wtwconnect->query("
				select distinct *,
					'' as templatename, 
					'' as description, 
					'' as tags, 
					0 as sortorder, 
					'' as defaultdisplayname 
				from ".wtw_tableprefix."useravatars
				where userid='".$wtwconnect->userid."'
					and (not userid='')
					and deleted=0
				order by avatargroup, displayname, avatarid, useravatarid;");
			$zwebtype = 'useravatars';
		} else {
			/* pull a group of available avatars */
			$zwhere = "a1.deleted=0  and (";
			if (strpos($zgroups, ',') !== false) {
				$zgrouplist = explode(",", $zgroups);
				$i = 0;
				foreach ($zgrouplist as $zgroup) {
					if ($i == 0) {
						$zwhere .= "a1.avatargroup='".$zgroup."' ";
					} else {
						$zwhere .= "or a1.avatargroup='".$zgroup."' ";
					}
					$i += 1;
				}
				$zwhere .= ")";
			} else {
				$zwhere .= "a1.avatargroup='".$zgroups."') ";
			}
			$zresults = $wtwconnect->query("
				select distinct a1.*,
					'' as useravatarid,
					u1.displayname as defaultdisplayname
				from ".wtw_tableprefix."avatars a1
				left join (select displayname from ".wtw_tableprefix."users where userid='".$wtwconnect->userid."') u1
				on 1=1
				where ".$zwhere." 
				order by a1.avatargroup, a1.displayname;");
		}
	} else {
		$zresults = $wtwconnect->query("
			select distinct a1.*,
				'' as useravatarid,
				u1.displayname as defaultdisplayname
			from ".wtw_tableprefix."avatars a1
				left join (select displayname from ".wtw_tableprefix."users where userid='".$wtwconnect->userid."') u1
				on 1=1
			where a1.deleted=0 
			order by a1.avatargroup, a1.displayname;");
	}
	$i = 0;
	$zavatars = array();

	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	foreach ($zresults as $zrow) {
		$webid = $zrow["avatarid"];
		if ($zwebtype == 'useravatars') {
			$webid = $zrow["useravatarid"];
		}
		$zsnapshot = '';
		$zsnapshotthumbnail = '';
		
		if (file_exists(wtw_rootpath.'/content/uploads/'.$zwebtype.'/'.$webid.'/snapshots/defaultavatar.png')) {
			$zsnapshot = '/content/uploads/'.$zwebtype.'/'.$webid.'/snapshots/defaultavatar.png';
		} else {
			$zsnapshot = '/content/system/images/profilebig.png';
		}
		if (file_exists(wtw_rootpath.'/content/uploads/'.$zwebtype.'/'.$webid.'/snapshots/defaultavatarsm.png')) {
			$zsnapshotthumbnail = '/content/uploads/'.$zwebtype.'/'.$webid.'/snapshots/defaultavatarsm.png';
		} else {
			$zsnapshotthumbnail = '/content/system/images/menuprofilebig.png';
		}
		
		$zavatars[$i] = array(
			'useravatarid'=> $zrow["useravatarid"],
			'avatarid'=> $zrow["avatarid"],
			'versionid'=> $zrow["versionid"],
			'version'=> $zrow["version"],
			'versionorder'=> $zrow["versionorder"],
			'versiondesc'=> htmlspecialchars($zrow["versiondesc"], ENT_QUOTES, 'UTF-8'),
			'avatargroup'=> $zrow["avatargroup"],
			'displayname'=> htmlspecialchars($zrow["displayname"], ENT_QUOTES, 'UTF-8'),
			'defaultdisplayname'=> $zrow["defaultdisplayname"],
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
			'share'=> array(
				'templatename' => htmlspecialchars($zrow["templatename"], ENT_QUOTES, 'UTF-8'),
				'description' => htmlspecialchars($zrow["description"], ENT_QUOTES, 'UTF-8'),
				'tags' => htmlspecialchars($zrow["tags"], ENT_QUOTES, 'UTF-8')
			),
			'sounds'=> array(
				'voice' => null
			),
			'sortorder'=> $zrow["sortorder"]
		);
		$i += 1;
	}
	$zresponse['avatars'] = $zavatars;
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-avatars.php=".$e->getMessage());
}
?>

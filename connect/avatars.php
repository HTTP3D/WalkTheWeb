<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides multiple avatars information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$zuserid = $wtwconnect->userid;
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/avatars.php");

	/* get values from querystring or session */
	$zgroups = $wtwconnect->getVal('groups','');
	$zfilter = $wtwconnect->getVal('filter','mine');
	
	$zhostuserid = '';
	if ($wtwconnect->isUserInRole("Host") && $wtwconnect->isUserInRole("Admin") == false) {
		$zhostuserid = $wtwconnect->userid;
	}
	$hasaccess = false;
	if ($zfilter == 'all') {
		$zroles = $wtwconnect->getUserRoles($zuserid);
		foreach ($zroles as $zrole) {
			if (strtolower($zrole['rolename']) == 'admin' || strtolower($zrole['rolename']) == 'architect' || strtolower($zrole['rolename']) == 'developer' || strtolower($zrole['rolename']) == 'graphics artist') {
				$hasaccess = true;
			}
		}
	}

	$zresults = array();
	$zwebtype = 'avatars';
	if ($wtwconnect->hasValue($zgroups)) {
		if ($zgroups == 'my') {
			/* pull a group of MY available avatars */
			$zresults = $wtwconnect->query("
				select distinct *,
					'' as hostuserid,
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
			$zwhere = "a1.deleted=0 and (a1.hostuserid='".$zhostuserid."' or a1.hostuserid='') and (";
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
				order by a1.hostuserid desc, a1.avatargroup, a1.displayname;");
		}
	} else {
		if ($hasaccess) {
			$zresults = $wtwconnect->query("
				select distinct a1.*,
					'' as useravatarid,
					u1.displayname as defaultdisplayname
				from ".wtw_tableprefix."avatars a1
					left join (select displayname from ".wtw_tableprefix."users where userid='".$wtwconnect->userid."') u1
					on 1=1
				where a1.deleted=0
				order by a1.hostuserid desc, a1.avatargroup, a1.displayname;");
		} else {
			$zresults = $wtwconnect->query("
				select distinct a1.*,
					'' as useravatarid,
					u1.displayname as defaultdisplayname
				from ".wtw_tableprefix."avatars a1
					left join (select displayname from ".wtw_tableprefix."users where userid='".$wtwconnect->userid."') u1
					on 1=1
				where a1.deleted=0 and (a1.hostuserid='".$zhostuserid."' or a1.hostuserid='')
				order by a1.hostuserid desc, a1.avatargroup, a1.displayname;");
		}
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
			'hostuserid'=> $zrow["hostuserid"],
			'versionid'=> $zrow["versionid"],
			'version'=> $zrow["version"],
			'versionorder'=> $zrow["versionorder"],
			'versiondesc'=> $wtwconnect->escapeHTML($zrow["versiondesc"]),
			'avatargroup'=> $zrow["avatargroup"],
			'displayname'=> $wtwconnect->escapeHTML($zrow["displayname"]),
			'defaultdisplayname'=> $zrow["defaultdisplayname"],
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
			'share'=> array(
				'templatename' => $wtwconnect->escapeHTML($zrow["templatename"]),
				'description' => $wtwconnect->escapeHTML($zrow["description"]),
				'tags' => $wtwconnect->escapeHTML($zrow["tags"])
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

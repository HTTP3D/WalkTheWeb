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
	
	if (!empty($zgroups) && isset($zgroups)) {
		if ($zgroups == 'my') {
			/* pull a group of MY available avatars */
			$zresults = $wtwconnect->query("
				SELECT ua1.useravatarid, ua1.avatarid, ua1.gender, ua1.displayname, 
					ua1.objectfolder as avatarfolder, ua1.objectfile as avatarfile,  
					ua1.scalingx, ua1.scalingy, ua1.scalingz, ua1.startframe, ua1.endframe,
					a1.avatargroup, a1.imagefull, a1.imageface, a1.sortorder, '' as defaultdisplayname 
				FROM ".wtw_tableprefix."useravatars ua1 left join ".wtw_tableprefix."avatars a1
				on ua1.avatarid = a1.avatarid
				where ua1.userid='".$wtwconnect->userid."'
					and not ua1.userid=''
				order by ua1.displayname, ua1.avatarid, ua1.useravatarid;");
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
				select a1.*,
					'' as useravatarid,
					u1.displayname as defaultdisplayname
				from ".wtw_tableprefix."avatars a1
				left join (select displayname from ".wtw_tableprefix."users where userid='".$wtwconnect->userid."') u1
				on 1=1
				where ".$zwhere." 
				order by a1.avatargroup, a1.sortorder, a1.displayname;");
		}
	} else {
		$zresults = $wtwconnect->query("
			select a1.*,
				'' as useravatarid,
				u1.displayname as defaultdisplayname
			from ".wtw_tableprefix."avatars a1
				left join (select displayname from ".wtw_tableprefix."users where userid='".$wtwconnect->userid."') u1
				on 1=1
			where a1.deleted=0 
			order by a1.avatargroup, a1.sortorder, a1.displayname;");
	}
	$i = 0;
	$zavatars = array();

	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	foreach ($zresults as $zrow) {
		$zavatars[$i] = array(
			'useravatarid'=> $zrow["useravatarid"],
			'avatarid'=> $zrow["avatarid"],
			'avatargroup'=> $zrow["avatargroup"],
			'displayname'=> $zrow["displayname"],
			'defaultdisplayname'=> $zrow["defaultdisplayname"],
			'gender'=> $zrow["gender"],
			'object'=> array(
				'folder'=> $zrow["avatarfolder"],
				'file'=> $zrow["avatarfile"],
				'startframe'=> $zrow["startframe"],
				'endframe'=> $zrow["endframe"]
			),
			'scaling'=> array(
				'x'=> $zrow["scalingx"],
				'y'=> $zrow["scalingy"],
				'z'=> $zrow["scalingz"]
			),
			'thumbnails'=> array(
				'imagefull'=> $zrow["imagefull"],
				'imageface'=> $zrow["imageface"]
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

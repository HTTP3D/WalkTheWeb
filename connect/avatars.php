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
					ua1.scalingx, ua1.scalingy, ua1.scalingz, 
					a1.avatargroup, a1.imagefull, a1.imageface, a1.sortorder  
				FROM ".wtw_tableprefix."useravatars ua1 left join ".wtw_tableprefix."avatars a1
				on ua1.avatarid = a1.avatarid
				where ua1.userid='".$wtwconnect->userid."'
					and not ua1.userid=''
				order by ua1.displayname, ua1.avatarid, ua1.useravatarid;");
		} else {
			/* pull a group of available avatars */
			$zwhere = "deleted=0  and (";
			if (strpos($zgroups, ',') !== false) {
				$zgrouplist = explode(",", $zgroups);
				$i = 0;
				foreach ($zgrouplist as $zgroup) {
					if ($i == 0) {
						$zwhere .= "avatargroup='".$zgroup."' ";
					} else {
						$zwhere .= "or avatargroup='".$zgroup."' ";
					}
					$i += 1;
				}
				$zwhere .= ")";
			} else {
				$zwhere .= "avatargroup='".$zgroups."') ";
			}
			$zresults = $wtwconnect->query("
				select *,
					'' as useravatarid
				from ".wtw_tableprefix."avatars 
				where ".$zwhere." 
				order by avatargroup, sortorder, displayname;");
		}
	} else {
		$zresults = $wtwconnect->query("
			select *,
				'' as useravatarid
			from ".wtw_tableprefix."avatars 
			where deleted=0 
			order by avatargroup, sortorder, displayname;");
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
			'gender'=> $zrow["gender"],
			'object'=> array(
				'folder'=> $zrow["avatarfolder"],
				'file'=> $zrow["avatarfile"]
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

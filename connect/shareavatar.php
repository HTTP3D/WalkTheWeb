<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides shared 3D Avatar information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;

$zuploads = array();
$zupload = 0;
$zavatarparts = array();
$zavataranimationdefs = array();


$zuploadobjects = array();
$zuploadobject = 0;
$zscripts = array();
$zscript = 0;
$zavataranimations = array();
$zavataranimation = 0;
$zusers = array();
$zuser = 0;

function addUploadID($zuploadid, $zrecursive) {
	global $wtwconnect;
	try {
		global $zuploads;
		global $zupload;
		if ($wtwconnect->hasValue($zuploadid)) {
			$zfound = false;
			foreach ($zuploads as $zrowup) {
				if ($zrowup["uploadid"] == $zuploadid) {
					$zfound = true;
				}
			}
			if (!$zfound) {
				/* select upload file data */
				$zresults = $wtwconnect->query("
					select * 
					from ".wtw_tableprefix."uploads
					where uploadid='".$zuploadid."'
					and deleted=0;");
				foreach ($zresults as $zrow) {
					$zfilepath = $zrow["filepath"];
					if ($wtwconnect->hasValue($zfilepath)) {
						if (substr($zfilepath, 0, 4) != "http") {
							$zfilepath = $wtwconnect->domainurl.$zfilepath;
						}
					}
					$zuploads[$zupload] = array (
						'uploadid'=>$zrow["uploadid"],
						'pastuploadid'=>$zrow["pastuploadid"],
						'originalid'=>$zrow["originalid"],
						'websizeid'=>$zrow["websizeid"],
						'thumbnailid'=>$zrow["thumbnailid"],
						'userid'=>$zrow["userid"],
						'filetitle'=>$wtwconnect->escapeHTML($zrow["filetitle"]),
						'filename'=>$zrow["filename"],
						'fileextension'=>$zrow["fileextension"],
						'filesize'=>$zrow["filesize"],
						'filetype'=>$zrow["filetype"],
						'filepath'=>$zfilepath,
						'filedata'=>$zrow["filedata"],
						'imagewidth'=>$zrow["imagewidth"],
						'imageheight'=>$zrow["imageheight"],
						'stock'=>$zrow["stock"],
						'hidedate'=>$zrow["hidedate"],
						'hideuserid'=>$zrow["hideuserid"],
						'hide'=>$zrow["hide"],
						'checkeddate'=>$zrow["checkeddate"],
						'checkeduserid'=>$zrow["checkeduserid"],
						'checked'=>$zrow["checked"],
						'createdate'=>$zrow["createdate"],
						'createuserid'=>$zrow["createuserid"],
						'updatedate'=>$zrow["updatedate"],
						'updateuserid'=>$zrow["updateuserid"]
					);
					$zupload += 1;
					addUserID($zrow["userid"]);
					addUserID($zrow["createuserid"]);
					addUserID($zrow["updateuserid"]);
				}
			}
		}
	} catch (Exception $e) {
		$wtwconnect->serror("connect-shareavatar.php-addUploadID=".$e->getMessage());
	}
}

function addAvatarAnimationID($zavataranimationid) {
	global $wtwconnect;
	try {
		global $zavataranimations;
		global $zavataranimation;
		if ($wtwconnect->hasValue($zavataranimationid)) {
			$zfound = false;
			foreach ($zavataranimations as $zrowanim) {
				if ($zrowanim["avataranimationid"] == $zavataranimationid) {
					$zfound = true;
				}
			}
			if (!$zfound) {
				/* select avatar animations */
				$zresults = $wtwconnect->query("
					select * 
					from ".wtw_tableprefix."avataranimations
					where avataranimationid='".$zavataranimationid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zanimationicon = '';
					if (!empty($zrow["animationicon"])) {
						$zanimationicon = $wtwconnect->domainurl.$zrow["animationicon"];
					}
					
					$zavataranimations[$zavataranimation] = array (
						'avataranimationid'=>$zrow["avataranimationid"],
						'pastavataranimationid'=>$zrow["pastavataranimationid"],
						'avatarid'=>$zrow["avatarid"],
						'userid'=>$zrow["userid"],
						'loadpriority'=>$zrow["loadpriority"],
						'animationevent'=>$zrow["animationevent"],
						'animationfriendlyname'=>$zrow["animationfriendlyname"],
						'animationicon'=>$zanimationicon,
						'objectfolder'=>$wtwconnect->domainurl.$zrow["objectfolder"],
						'objectfile'=>$zrow["objectfile"],
						'startframe'=>$zrow["startframe"],
						'endframe'=>$zrow["endframe"],
						'animationloop'=>$zrow["animationloop"],
						'speedratio'=>$zrow["speedratio"],
						'soundid'=>$zrow["soundid"],
						'soundmaxdistance'=>$zrow["soundmaxdistance"],
						'createdate'=>$zrow["createdate"],
						'createuserid'=>$zrow["createuserid"],
						'updatedate'=>$zrow["updatedate"],
						'updateuserid'=>$zrow["updateuserid"]
					);
					$zavataranimation += 1;
					addUploadID($zrow["soundid"], false);
					addUserID($zrow["userid"]);
					addUserID($zrow["createuserid"]);
					addUserID($zrow["updateuserid"]);
				}
			}
		}
	} catch (Exception $e) {
		$wtwconnect->serror("connect-shareavatar.php-addAvatarAnimationID=".$e->getMessage());
	}
}

function addUserID($zuserid) {
	global $wtwconnect;
	try {
		global $zusers;
		global $zuser;
		if ($wtwconnect->hasValue($zuserid)) {
			$zfound = false;
			foreach ($zusers as $zrowup) {
				if ($zrowup["userid"] == $zuserid) {
					$zfound = true;
				}
			}
			if (!$zfound) {
				/* select user */
				$zresults = $wtwconnect->query("
					select * 
					from ".wtw_tableprefix."users
					where userid='".$zuserid."'
					limit 1;");
				foreach ($zresults as $zrow) {
					$zusers[$zuser] = array (
						'userid'=>$zrow["userid"],
						'displayname'=>$wtwconnect->escapeHTML($zrow["displayname"]),
						'email'=>$zrow["email"],
						'uploadpathid'=>$zrow["uploadpathid"]
					);
					$zuser += 1;
				}
			}
		}
	} catch (Exception $e) {
		$wtwconnect->serror("connect-shareavatar.php-addUserID=".$e->getMessage());
	}
}

try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/shareavatar.php");
	
	/* get values from querystring or session */
	$zavatarid = $wtwconnect->getVal('avatarid','');
	$zuserid = $wtwconnect->getVal('userid','');
	$zsharehash = $wtwconnect->getVal('sharehash','');

	$zresponse = array();

	addUserID($zuserid);
	
//	echo $wtwconnect->addConnectHeader('*');
	header('Access-Control-Allow-Origin: *');
	header('Content-type: application/json');
	
	/* get 3D Avatar */
	$zresults = $wtwconnect->query("
		select *
		from ".wtw_tableprefix."avatars
		where avatarid='".$zavatarid."'
			and shareuserid='".$zuserid."'
			and sharehash='".$zsharehash."'
			and deleted=0
		limit 1;");

	/* format json return dataset */
	foreach ($zresults as $zrow) {
		/* get avatar parts from avatar colors table */
		$zresultsap = $wtwconnect->query("
			select *
			from ".wtw_tableprefix."avatarcolors
			where avatarid='".$zavatarid."'
				and deleted=0;");
		$zpart = 0;
		$zavatarparts = array();
		foreach ($zresultsap as $zrowap) {
			$zavatarparts[$zpart] = array(
				'avatarpartid'=>$zrowap["avatarpartid"],
				'pastavatarpartid'=>$zrowap["pastavatarpartid"],
				'avatarpart'=>$zrowap["avatarpart"],
				'diffusecolor'=>$zrowap["diffusecolor"],
				'specularcolor'=>$zrowap["specularcolor"],
				'emissivecolor'=>$zrowap["emissivecolor"],
				'ambientcolor'=>$zrowap["ambientcolor"],
				'createdate'=>$zrowap["createdate"],
				'createuserid'=>$zrowap["createuserid"],
				'updatedate'=>$zrowap["updatedate"],
				'updateuserid'=>$zrowap["updateuserid"]
			);
			$zpart += 1;
			addUserID($zrowap["createuserid"]);
			addUserID($zrowap["updateuserid"]);
		}

		/* get avatar animations */
		$zresultsa = $wtwconnect->query("
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
		$zanim = 0;
		foreach ($zresultsa as $zrowa) {
			$zavataranimationdefs[$zanim] = array(
				'avataranimationid'=>$zrowa["avataranimationid"],
				'pastavataranimationid'=>$zrowa["pastavataranimationid"],
				'loadpriority'=>$zrowa["loadpriority"],
				'animationevent'=>$zrowa["animationevent"],
				'animationfriendlyname'=>$zrowa["animationfriendlyname"],
				'animationicon'=>$zrowa["animationicon"],
				'objectfolder'=>$zrowa["objectfolder"],
				'objectfile'=>$zrowa["objectfile"],
				'startframe'=>$zrowa["startframe"],
				'endframe'=>$zrowa["endframe"],
				'animationloop'=>$zrowa["animationloop"],
				'speedratio'=>$zrowa["speedratio"],
				'soundid'=>$zrowa["soundid"],
				'soundmaxdistance'=>$zrowa["soundmaxdistance"],
				'createdate'=>$zrowa["createdate"],
				'createuserid'=>$zrowa["createuserid"],
				'updatedate'=>$zrowa["updatedate"],
				'updateuserid'=>$zrowa["updateuserid"]
			);
			$zanim += 1;
			addUserID($zrowa["createuserid"]);
			addUserID($zrowa["updateuserid"]);
		}

		/* get content ratings */
		$zresultscr = $wtwconnect->query("
			select *
			from ".wtw_tableprefix."contentratings
			where webid='".$zavatarid."'
				and webtype='avatar'
				and deleted=0;");
		$zcr = 0;
		$zcontentratings = array();
		foreach ($zresultscr as $zrowcr) {
			$zcontentratings[$zcr] = array(
				'contentratingid'=>$zrowcr["contentratingid"],
				'pastcontentratingid'=>$zrowcr["pastcontentratingid"],
				'webid'=>$zrowcr["webid"],
				'webtype'=>$zrowcr["webtype"],
				'rating'=>$zrowcr["rating"],
				'ratingvalue'=>$zrowcr["ratingvalue"],
				'contentwarning'=>$zrowcr["contentwarning"],
				'createdate'=>$zrowcr["createdate"],
				'createuserid'=>$zrowcr["createuserid"],
				'updatedate'=>$zrowcr["updatedate"],
				'updateuserid'=>$zrowcr["updateuserid"]
			);
			$zcr += 1;
			addUserID($zrowcr["createuserid"]);
			addUserID($zrowcr["updateuserid"]);
		}

		/* json structured response */
		addUploadID($zrow["snapshotid"], true);
		addUserID($zrow["shareuserid"]);
		addUserID($zrow["createuserid"]);
		addUserID($zrow["updateuserid"]);
		
		$zfiles = array();
		
		$i = 0;
	
		$zfiles = $wtwconnect->getAvatarFilesList($zfiles, wtw_rootpath.$zrow["objectfolder"]);
		
		
		$zresponse = array(
			'serverinstanceid'=>wtw_serverinstanceid,
			'domainurl'=>$wtwconnect->domainurl,
			'avatarid' => $zrow["avatarid"],
			'pastavatarid' => $zrow["pastavatarid"],
			'versionid'=> $zrow["versionid"],
			'version'=> $zrow["version"],
			'versionorder'=> $zrow["versionorder"],
			'versiondesc'=> $wtwconnect->escapeHTML($zrow["versiondesc"]),
			'avatargroup' => $zrow["avatargroup"],
			'avatargroups' => array(),
			'displayname' => $wtwconnect->escapeHTML($zrow["displayname"]),
			'avatardescription' => $wtwconnect->escapeHTML($zrow["avatardescription"]),
			'objectfolder' => $zrow["objectfolder"],
			'objectfile' => $zrow["objectfile"],
			'gender' => $zrow["gender"],
			'positionx' => $zrow["positionx"],
			'positiony' => $zrow["positiony"],
			'positionz' => $zrow["positionz"],
			'scalingx' => $zrow["scalingx"],
			'scalingy' => $zrow["scalingy"],
			'scalingz' => $zrow["scalingz"],
			'rotationx' => $zrow["rotationx"],
			'rotationy' => $zrow["rotationy"],
			'rotationz' => $zrow["rotationz"],
			'startframe' => $zrow["startframe"],
			'endframe' => $zrow["endframe"],
			'templatename' => $wtwconnect->escapeHTML($zrow["templatename"]),
			'description' => $wtwconnect->escapeHTML($zrow["description"]),
			'tags' => $wtwconnect->escapeHTML($zrow["tags"]),
			'snapshotid' => $zrow["snapshotid"],
			'shareuserid' => $zrow["shareuserid"],
			'alttag' => $wtwconnect->escapeHTML($zrow["alttag"]),
			'createdate' => $zrow["createdate"],
			'createuserid' => $zrow["createuserid"],
			'updatedate' => $zrow["updatedate"],
			'updateuserid' => $zrow["updateuserid"],
			'avatarparts'=> $zavatarparts,
			'avataranimationdefs'=> $zavataranimationdefs,
			'uploads'=> $zuploads,
			'files' => $zfiles,
			'contentratings'=>$zcontentratings,
			'users'=>$zusers
		);
	}
	
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-shareavatar.php=".$e->getMessage());
}
?>

<?php
global $wtwhandlers;
try {
	/* include the class for the functions to save, edit, or delete the records in the database */
	require_once(WTW_AVATARS_PATH . '/functions/class_functions.php');
	global $wtwavatars_functions;
	/* get sent data */
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	/* get the requested function name for the awitch case below */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	
	/* get form Posted Values - your passed data */
	/* $wtwhandlers->getPost(fieldname, defaultvalue); */
	$zindex = $wtwhandlers->getPost('index','');
	$zuseravatarid = $wtwhandlers->getPost('useravatarid','');
	$zavatarid = $wtwhandlers->getPost('avatarid','');
	$zuserid = $wtwhandlers->getPost('userid','');
	$zuserip = $wtwhandlers->getPost('userip','');
	$zinstanceid = $wtwhandlers->getPost('instanceid','');
	$zobjectfolder = $wtwhandlers->getPost('objectfolder','');
	$zobjectfile = $wtwhandlers->getPost('objectfile','');
	$zgender = $wtwhandlers->getPost('gender','');
	$zscalingx = $wtwhandlers->getPost('scalingx','.07');
	$zscalingy = $wtwhandlers->getPost('scalingy','.07');
	$zscalingz = $wtwhandlers->getPost('scalingz','.07');
	$zdisplayname = $wtwhandlers->getPost('displayname','');
	$zavatarpart = $wtwhandlers->getPost('avatarpart','');
	$zemissivecolorr = $wtwhandlers->getPost('emissivecolorr','1');
	$zemissivecolorg = $wtwhandlers->getPost('emissivecolorg','1');
	$zemissivecolorb = $wtwhandlers->getPost('emissivecolorb','1');
	$zavataranimationid = $wtwhandlers->getPost('avataranimationid','');
	$zavataranimationevent = $wtwhandlers->getPost('avataranimationevent','');

	/* set response array of values - customize response as needed */
	$zresponse = array(
		'serror'=> ''
	);
	switch ($zfunction) {
		case "saveavatar":
			$zuseravatarid = $wtwavatars_functions->saveAvatar($zuseravatarid, $zinstanceid, $zavatarid, $zdisplayname, $zobjectfolder, $zobjectfile, $zgender, $zscalingx, $zscalingy, $zscalingz);
			$zresponse = array(
				'useravatarid'=> $zuseravatarid,
				'objectfolder'=> $zobjectfolder,
				'objectfile'=> $zobjectfile,
				'gender'=> $zgender,
				'scalingx'=> $zscalingx,
				'scalingy'=> $zscalingy,
				'scalingz'=> $zscalingz,
				'serror'=> ''
			);
			break;
		case "saveavatarcolor":
			$zavatarpartid = $wtwavatars_functions->saveAvatarColor($zuseravatarid, $zinstanceid, $zavatarpart, $zemissivecolorr, $zemissivecolorg, $zemissivecolorb);
			$zresponse = array(
				'avatarpartid'=> $zavatarpartid,
				'avatarpart'=> $zavatarpart,
				'emissivecolorr'=> $zemissivecolorr,
				'emissivecolorg'=> $zemissivecolorg,
				'emissivecolorb'=> $zemissivecolorb,
				'index'=> $zindex,
				'serror'=> ''
			);
			break;
		case "saveavataranimation":
			$zuseravataranimationid = $wtwavatars_functions->saveAvatarAnimation($zuseravatarid, $zinstanceid, $zavataranimationid, $zavataranimationevent);
			
			$zanimationevent = '';
			$zanimationfriendlyname = '';
			$zloadpriority = 0;
			$zanimationicon = '';
			$zdefaultspeedratio = 1;
			$zspeedratio = 1;
			$zobjectfolder = '';
			$zobjectfile = '';
			$zstartframe = 0;
			$zendframe = 0;
			$zanimationloop = 1;
			$zwalkspeed = 1;
			$zresults = $wtwhandlers->query("
				select u.*,
					a.loadpriority,
					a.animationfriendlyname,
					a.animationicon,
					a.objectfolder,
					a.objectfile,
					a.startframe,
					a.endframe,
					a.animationloop,
					a.speedratio as defaultspeedratio,
					a.soundid,
					a.soundpath,
					a.soundmaxdistance
				from ".wtw_tableprefix."useravataranimations u 
					inner join ".wtw_tableprefix."avataranimations a
						on u.avataranimationid=a.avataranimationid
				where u.useravatarid='".$zuseravatarid."'
					and u.avataranimationid='".$zavataranimationid."'
					and u.deleted=0
				limit 1;");
			foreach ($zresults as $zrow) {
				$zavataranimationevent = $zrow["avataranimationevent"];
				$zanimationfriendlyname = $zrow["animationfriendlyname"];
				$zloadpriority = $zrow["loadpriority"];
				$zanimationicon = $zrow["animationicon"];
				$zdefaultspeedratio = $zrow["defaultspeedratio"];
				$zspeedratio = $zrow["speedratio"];
				$zobjectfolder = $zrow["objectfolder"];
				$zobjectfile = $zrow["objectfile"];
				$zstartframe = $zrow["startframe"];
				$zendframe = $zrow["endframe"];
				$zanimationloop = $zrow["animationloop"];
				$zwalkspeed = $zrow["walkspeed"];
			}
			$zresponse = array(
				'useravataranimationid'=> $zuseravataranimationid,
				'avataranimationid'=> $zavataranimationid,
				'avataranimationevent'=> $zavataranimationevent,
				'animationfriendlyname'=> $zanimationfriendlyname,
				'loadpriority'=> $zloadpriority,
				'animationicon'=> $zanimationicon,
				'speedratio'=> $zspeedratio,
				'objectfolder'=> $zobjectfolder,
				'objectfile'=> $zobjectfile,
				'startframe'=> $zstartframe,
				'endframe'=> $zendframe,
				'animationloop'=> $zanimationloop,
				'walkspeed'=> $zwalkspeed,
				'index'=> $zindex,
				'serror'=> ''
			);
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-wtwavatars-saveavatar.php=".$e->getMessage());
}
?>
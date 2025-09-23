<?php
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/wtw-readyplayerme-avataranimations.php");
	
	/* select avatar animations data */
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$zresponse = array();

	$zresults = $wtwconnect->query("
		select a1.* 
			from ".WTW_READYPLAYERME_PREFIX."avataranimations a1
			inner join (
				select animationevent, max(updatedate) as updatedate, max(avataranimationid) as avataranimationid 
				from ".WTW_READYPLAYERME_PREFIX."avataranimations 
				where deleted=0
					and not animationevent='onoption'
				group by animationevent) a2
			on a1.avataranimationid = a2.avataranimationid
			where a1.deleted=0
		union
		select a3.* 
			from ".WTW_READYPLAYERME_PREFIX."avataranimations a3
			inner join (
				select animationfriendlyname, max(updatedate) as updatedate, max(avataranimationid) as avataranimationid 
				from ".WTW_READYPLAYERME_PREFIX."avataranimations 
				where deleted=0
					and animationevent='onoption'
				group by animationfriendlyname) a4
			on a3.avataranimationid = a4.avataranimationid
			where a3.deleted=0
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
			$zresponse[$zanimationind] = array(
				'animationind'=> -1,
				'useravataranimationid'=> '',
				'avataranimationid'=> $zrow["avataranimationid"],
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

	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("plugins:wtw-readyplayerme:connect-wtw-readyplayerme-avataranimations.php=".$e->getMessage());
}
?>

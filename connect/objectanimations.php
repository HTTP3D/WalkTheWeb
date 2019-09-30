<?php
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/objectanimations.php");
	
	/* get values from querystring or session */
	$zuploadobjectid = $wtwconnect->getVal('uploadobjectid','');

	/* select object animation definitions */
	$zresults = $wtwconnect->query("
		select a1.*,
			case when a1.soundid = '' then ''
				else
					(select filepath 
						from ".wtw_tableprefix."uploads 
						where uploadid=a1.soundid limit 1)
				end as soundpath,
			case when a1.moldevent='onload' then '2'
				when a1.moldevent='' then '0'
				else '1'
			end as sorder
		from ".wtw_tableprefix."uploadobjectanimations a1
		where a1.uploadobjectid='".$zuploadobjectid."'
			and a1.deleted=0
		order by sorder, a1.moldevent, a1.animationname, a1.objectanimationid;");
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);

	$i = 0;
	$zresponse = array();
	$zobjectanimations = array();
	/* format json return dataset */
	foreach ($zresults as $zrow) {
		$zobjectanimations[$i] = array(
			'objectanimationid'=> $zrow['objectanimationid'],
			'animationname'=> $zrow['animationname'],
			'moldevent'=> $zrow['moldevent'],
			'moldnamepart'=> $zrow['moldnamepart'],
			'startframe'=> $zrow['startframe'],
			'endframe'=> $zrow['endframe'],
			'animationloop'=> $zrow['animationloop'],
			'speedratio'=> $zrow['speedratio'],
			'additionalscript'=> $zrow['additionalscript'],
			'additionalparameters'=> $zrow['additionalparameters'],
			'animationendscript'=> $zrow['animationendscript'],
			'animationendparameters'=> $zrow['animationendparameters'],
			'stopcurrentanimations'=> $zrow['stopcurrentanimations'],
			'soundid'=> $zrow['soundid'],
			'soundpath'=> $zrow['soundpath'],
			'soundmaxdistance'=> $zrow['soundmaxdistance']
		);
		$i += 1;
	}
	$zresponse['objectanimations'] = $zobjectanimations;
	echo json_encode($zresponse);
} catch (Exception $e) {
	$wtwconnect->serror("connect-objectanimations.php=".$e->getMessage());
}
?>

<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides 3D Community information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;

try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/rating.php");
	
	/* get values from querystring or session */
	$zwebid = $wtwconnect->getVal('webid','');
	$zextended = $wtwconnect->getVal('extended','1');
	
	$zrating = 'Not Rated';
	$zratingvalue = 0;
	$zratingtext = 'This 3D Website has not been rated. Take caution.';
	$zcontentwarning = '';
	$zunratedcontent = '0';
	$zcontentrating = '';
	
	/* select base web content rating */
	$zresults = $wtwconnect->query("
		select cr1.*,
			c1.communityname,
			b1.buildingname,
			t1.thingname
		from ".wtw_tableprefix."contentratings cr1
			left join ".wtw_tableprefix."communities c1
				on c1.communityid=cr1.webid
			left join ".wtw_tableprefix."buildings b1
				on b1.buildingid=cr1.webid
			left join ".wtw_tableprefix."things t1
				on t1.thingid=cr1.webid
		where cr1.webid='".$zwebid."'
		order by cr1.createdate desc
		limit 1;");
	if (count($zresults) == 0) {
		$zunratedcontent = '1';
		$zcontentrating .= '<b>The main 3D Website is not Rated</b><br /><br />';
	} else {
		foreach ($zresults as $zrow) {
			$zsitename = '';
			if (isset($zrow["communityname"]) && !empty($zrow["communityname"])) {
				$zsitename = $zrow["communityname"];
			} else if (isset($zrow["buildingname"]) && !empty($zrow["buildingname"])) {
				$zsitename = $zrow["buildingname"];
			} else if (isset($zrow["thingname"]) && !empty($zrow["thingname"])) {
				$zsitename = $zrow["thingname"];
			}
			$zrating = $zrow["rating"];
			$zratingtext = $wtwconnect->getRatingText($zrating);
			if (is_numeric($zrow["ratingvalue"])) {
				$zratingvalue = (int)$zrow["ratingvalue"];
			}
			$zcontentrating .= "<b><span style='color:#FEFFCE'>".$zsitename."</span> 3D Website is Rated <span style='color:#FEFFCE'>".$zrating."</span></b>. ".$zratingtext."<br />";

			if (!empty($zrow["contentwarning"]) && isset($zrow["contentwarning"])) {
				if ($zextended == '0') {
					$zcontentwarning = $zrow["contentwarning"];
				} else {
					$zcontentwarning .= $zrow["contentwarning"] . "<br /><br />";
				}
				$zcontentrating .= $zrow["contentwarning"] . "<br /><br />";
			} else {
				$zcontentrating .= "<br />";
			}
		}
	}
	
	if ($zextended == '1') {
		/* look for content ratings on child items */
		$zresults = $wtwconnect->query("
			select cg1.*,
				cr1.rating,
				cr1.ratingvalue,
				cr1.contentwarning,
				c1.communityname,
				b1.buildingname,
				t1.thingname
			from 
				(select parentwebid, parentwebtype, childwebid, childwebtype 
					from ".wtw_tableprefix."connectinggrids
					where deleted=0
					group by parentwebid, parentwebtype, childwebid, childwebtype) cg1
				left join ".wtw_tableprefix."contentratings cr1
					on cg1.childwebid = cr1.webid
				left join ".wtw_tableprefix."communities c1
					on c1.communityid=cr1.webid
				left join ".wtw_tableprefix."buildings b1
					on b1.buildingid=cr1.webid
				left join ".wtw_tableprefix."things t1
					on t1.thingid=cr1.webid
			where cg1.parentwebid='".$zwebid."';");
		foreach ($zresults as $zrow) {
			if (isset($zrow["ratingvalue"])) {
				$zsitename = '';
				if (isset($zrow["communityname"]) && !empty($zrow["communityname"])) {
					$zsitename = $zrow["communityname"];
				} else if (isset($zrow["buildingname"]) && !empty($zrow["buildingname"])) {
					$zsitename = $zrow["buildingname"];
				} else if (isset($zrow["thingname"]) && !empty($zrow["thingname"])) {
					$zsitename = $zrow["thingname"];
				}
				/* if rating is higher than base rating, update the base rating */
				if (is_numeric($zrow["ratingvalue"])) {
					if ((int)$zrow["ratingvalue"] > $zratingvalue) {
						$zrating = $zrow["rating"];
						$zratingvalue = (int)$zrow["ratingvalue"];
					}
					$zratingtext = $wtwconnect->getRatingText($zrow["rating"]);
					$zcontentrating .= "<b><span style='color:#FEFFCE'>".$zsitename."</span> 3D Website is Rated <span style='color:#FEFFCE'>".$zrow["rating"]."</span></b>. ".$zratingtext."<br />";
				} else {
					$zcontentrating .= "<b><span style='color:#FEFFCE'>".$zsitename."</span> 3D Website is Unrated</b><br />";
				}
				/* append any content warnings */
				if (!empty($zrow["contentwarning"]) && isset($zrow["contentwarning"])) {
					$zcontentwarning .= $zrow["contentwarning"] . "<br /><br />";
					$zcontentrating .= $zrow["contentwarning"] . "<br /><br />";
				} else {
					$zcontentrating .= "<br />";
				}
			} else {
				$zunratedcontent = '1';
			}
			/* check for one more level deep - buildings with things in it */
			if ($zrow["childwebtype"] == 'building') {
				$zresults2 = $wtwconnect->query("
					select cg1.*,
						cr1.rating,
						cr1.ratingvalue,
						cr1.contentwarning,
						c1.communityname,
						b1.buildingname,
						t1.thingname
					from 
						(select parentwebid, parentwebtype, childwebid, childwebtype 
							from ".wtw_tableprefix."connectinggrids
							where deleted=0
							group by parentwebid, parentwebtype, childwebid, childwebtype) cg1
						left join ".wtw_tableprefix."contentratings cr1
							on cg1.childwebid = cr1.webid
						left join ".wtw_tableprefix."communities c1
							on c1.communityid=cr1.webid
						left join ".wtw_tableprefix."buildings b1
							on b1.buildingid=cr1.webid
						left join ".wtw_tableprefix."things t1
							on t1.thingid=cr1.webid
					where cg1.parentwebid='".$zrow["childwebid"]."';");
				foreach ($zresults2 as $zrow2) {
					if (isset($zrow2["ratingvalue"])) {
						$zsitename = '';
						if (isset($zrow2["communityname"]) && !empty($zrow2["communityname"])) {
							$zsitename = $zrow2["communityname"];
						} else if (isset($zrow2["buildingname"]) && !empty($zrow2["buildingname"])) {
							$zsitename = $zrow2["buildingname"];
						} else if (isset($zrow2["thingname"]) && !empty($zrow2["thingname"])) {
							$zsitename = $zrow2["thingname"];
						}
						/* if rating is higher than base rating, update the base rating */
						if (is_numeric($zrow2["ratingvalue"])) {
							if ((int)$zrow2["ratingvalue"] > $zratingvalue) {
								$zrating = $zrow2["rating"];
								$zratingvalue = (int)$zrow2["ratingvalue"];
							}
							$zratingtext = $wtwconnect->getRatingText($zrow["rating"]);
							$zcontentrating .= "<b><span style='color:#FEFFCE'>".$zsitename."</span> 3D Website is Rated <span style='color:#FEFFCE'>".$zrow["rating"]."</span></b>. ".$zratingtext."<br />";
						} else {
							$zcontentrating .= "<b><span style='color:#FEFFCE'>".$zsitename."</span> 3D Website is Unrated</b><br />";
						}
						/* append any content warnings */
						if (!empty($zrow2["contentwarning"]) && isset($zrow2["contentwarning"])) {
							$zcontentwarning .= $zrow2["contentwarning"] . "<br /><br />";
							$zcontentrating .= $zrow2["contentwarning"] . "<br /><br />";
						} else {
							$zcontentrating .= "<br />";
						}
					} else {
						$zunratedcontent = '1';
					}
				}
			}
		}
		if ($zunratedcontent == '1') {
			$zcontentrating .= "<hr /><b><span style='color:#FFCECE'>*This 3D Website also contains Unrated Content. Take caution.</span></b><br /><br />";
		}
	}
	
	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);
	
	$zratingtext = $wtwconnect->getRatingText($zrating);
	
	/* format the JSON response */
	$zresponse = array(
		'rating' => $zrating,
		'ratingvalue' => $zratingvalue,
		'ratingtext' => $zratingtext,
		'contentrating' => base64_encode($zcontentrating),
		'contentwarning' => base64_encode($zcontentwarning),
		'unratedcontent' => $zunratedcontent
	);
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-rating.php=".$e->getMessage());
}
?>
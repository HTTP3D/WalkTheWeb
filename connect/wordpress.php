<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides web aliases information */
require_once('../core/functions/class_wtwconnect.php');
require_once('../content/plugins/wtw-3dinternet/functions/class_downloads.php');
global $wtwconnect;
global $wtw_3dinternet_downloads;

try {
	echo $wtwconnect->addConnectHeader('*');

	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/wordpress.php");
	
	$zfunction = $wtwconnect->getPost('function','');
	$zwpinstanceid = $wtwconnect->getPost('wpinstanceid','');
	$zwebsiteurl = $wtwconnect->getPost('websiteurl','');
	$zbuildingid = $wtwconnect->getPost('buildingid','');
	$zcommunityid = $wtwconnect->getPost('communityid','');
	$zwebid = $wtwconnect->getPost('webid','');
	$zwebtype = $wtwconnect->getPost('webtype','');
	$zusertoken = $wtwconnect->getPost('usertoken','');
	$zwtwusertoken = $wtwconnect->getPost('wtwusertoken','');
	$zwtwemail = $wtwconnect->getPost('wtwemail','');
	$zwtwuserid = $wtwconnect->getPost('userid','');
	$zhosturl = $wtwconnect->getPost('hosturl','');
	$zwtwurl = $wtwconnect->getPost('wtwurl','');
	$zwebname = $wtwconnect->getPost('webname','');
	$zwtwstorename = $wtwconnect->getPost('wtwstorename','');
	$zwtwkey = $wtwconnect->getPost('wtwkey','');
	$zwtwsecret = $wtwconnect->getPost('wtwsecret','');
	$zwookey = $wtwconnect->getPost('wookey','');
	$zwoosecret = $wtwconnect->getPost('woosecret','');
	$zstoreurl = $wtwconnect->getPost('storeurl','');
	$zstorecarturl = $wtwconnect->getPost('storecarturl','');
	$zstoreproducturl = $wtwconnect->getPost('storeproducturl','');
	$zstoreapiurl = $wtwconnect->getPost('storeapiurl','');
	$ziframes = $wtwconnect->getPost('iframes','');

	$zauthenticationok = false;
	$zwebnameok = false;
	$zuserid = $wtwconnect->userid;
	$znewcommunityid = '';
	$znewbuildingid = '';
	$zdomainname = '';
	$zforcehttps = '1';
	$serror = '';
	
	$zwpinstanceid = $wtwconnect->decode64($zwpinstanceid);
	$zwebsiteurl = $wtwconnect->decode64($zwebsiteurl);
	$zbuildingid = $wtwconnect->decode64($zbuildingid);
	$zcommunityid = $wtwconnect->decode64($zcommunityid);
	$zwtwemail = strtolower($wtwconnect->decode64($zwtwemail));
	$zwtwuserid = $wtwconnect->decode64($zwtwuserid);
	$zhosturl = $wtwconnect->decode64($zhosturl);
	$zwtwurl = $wtwconnect->decode64($zwtwurl);
	$zwebname = strtolower($wtwconnect->decode64($zwebname));
	$zwtwstorename = $wtwconnect->decode64($zwtwstorename);
	$zwtwsecret = $wtwconnect->decode64($zwtwsecret);
	$zwookey = $wtwconnect->decode64($zwookey);
	$zwoosecret = $wtwconnect->decode64($zwoosecret);
	$zstoreurl = $wtwconnect->decode64($zstoreurl);
	$zstorecarturl = $wtwconnect->decode64($zstorecarturl);
	$zstoreproducturl = $wtwconnect->decode64($zstoreproducturl);
	$zstoreapiurl = $wtwconnect->decode64($zstoreapiurl);
	$ziframes = $wtwconnect->decode64($ziframes);
	$zhostuserid = '';
$wtwconnect->serror("zwpinstanceid=".$zwpinstanceid);
$wtwconnect->serror("zwebsiteurl=".$zwebsiteurl);
$wtwconnect->serror("zbuildingid=".$zbuildingid);
$wtwconnect->serror("zcommunityid=".$zcommunityid);
$wtwconnect->serror("zwtwemail=".$zwtwemail);
$wtwconnect->serror("zwtwuserid=".$zwtwuserid);
$wtwconnect->serror("zhosturl=".$zhosturl);
$wtwconnect->serror("zwtwurl=".$zwtwurl);
$wtwconnect->serror("zwebname=".$zwebname);
$wtwconnect->serror("zwtwstorename=".$zwtwstorename);
$wtwconnect->serror("zwtwsecret=".$zwtwsecret);
$wtwconnect->serror("zwookey=".$zwookey);
$wtwconnect->serror("zwoosecret=".$zwoosecret);
$wtwconnect->serror("zstoreurl=".$zstoreurl);
$wtwconnect->serror("zstorecarturl=".$zstorecarturl);
$wtwconnect->serror("zstoreproducturl=".$zstoreproducturl);
$wtwconnect->serror("zstoreapiurl=".$zstoreapiurl);
$wtwconnect->serror("ziframes=".$ziframes);
	try {
		$zparse = parse_url($zhosturl);
		$zdomainname = $zparse['host'];
		if (strpos(strtolower($zhosturl), 'http://') !== false) {
			$zforcehttps = '0';
		}
	} catch (Exception $e) {
		
	}
$wtwconnect->serror("zforcehttps=".$zforcehttps);
	$zresponse = array();

	switch ($zfunction) {
		case "downloadqueue":
			$zresponse = $wtw_3dinternet_downloads->addDownloadQueue($zwebid, $zwebtype);
			break;
		case "syncwebsites":
			$zapikeyid = '';
			$zresults = $wtwconnect->query("
				select * 
				from ".wtw_tableprefix."apikeys
				where appurl='".$zstoreurl."'
					and wtwkey='".$zwtwkey."'
					and wtwsecret='".$zwtwsecret."'
					and deleted=0
					and approved=1;");
			foreach ($zresults as $zrow) {
				$zapikeyid = $zrow->apikeyid;
			}
			if ($wtwconnect->hasValue($zapikeyid)) {
				$i = 0;
				/* key-secret combo has access */
				
			}
			break;
		case "createcommunityandbuilding":
			$zresponse = array(
				'serror'=>'',
				'buildingid'=>'',
				'communityid'=>''
			);
$wtwconnect->serror("zwtwusertoken=".$zwtwusertoken);

			if ($wtwconnect->hasValue($zwtwusertoken)) {
$wtwconnect->serror("HAS zwtwusertoken");
				/* check is the user with the access token has admin or host access */
				$zresults = $wtwconnect->query("
					select u1.*,
						r1.rolename
					from ".wtw_tableprefix."users u1
						inner join ".wtw_tableprefix."usersinroles ur1
							on u1.userid=ur1.userid
						inner join ".wtw_tableprefix."roles r1
							on ur1.roleid=r1.roleid
					where CONVERT(from_base64(u1.usertoken) USING utf8)='".$zwtwusertoken."'
						and u1.deleted=0
						and (r1.rolename like 'admin'
							or r1.rolename like 'host')
						and ur1.deleted=0
						and r1.deleted=0
					order by r1.rolename
					limit 1;");
				foreach ($zresults as $zrow) {
					$zauthenticationok = true;
					$zuserid = $zrow["userid"];
					$zpastuserid = $zrow["pastuserid"];
					/* user found by access token, update the pastuserid (wtwuserid) to the user account as a reference */
					if ($wtwconnect->hasValue($zuserid) && (!isset($zpastuserid) || empty($zpastuserid))) {
						$zresults = $wtwconnect->query("
							update ".wtw_tableprefix."users
							set pastuserid='".$zwtwuserid."',
								updatedate=now(),
								updateuserid='".$zuserid."'
							where userid='".$zuserid."';");
					}
				}
				if ($zauthenticationok == false) {
					$serror = 'User does not have permission on WalkTheWeb Server';
				}
			} else if ($wtwconnect->hasValue($zusertoken)) {
$wtwconnect->serror("HAS zusertoken");
				/* check is the user with the access token has admin or host access */
				$zresults = $wtwconnect->query("
					select u1.*,
						r1.rolename
					from ".wtw_tableprefix."users u1
						inner join ".wtw_tableprefix."usersinroles ur1
							on u1.userid=ur1.userid
						inner join ".wtw_tableprefix."roles r1
							on ur1.roleid=r1.roleid
					where CONVERT(from_base64(u1.wordpresstoken) USING utf8)='".$zusertoken."'
						and u1.deleted=0
						and (r1.rolename like 'admin'
							or r1.rolename like 'host')
						and ur1.deleted=0
						and r1.deleted=0
					order by r1.rolename
					limit 1;");
				foreach ($zresults as $zrow) {
					$zauthenticationok = true;
					$zuserid = $zrow["userid"];
					$zwtwusertoken = $zusertoken;
				}
				if ($zauthenticationok == false) {
					$serror = 'User does not have permission on WalkTheWeb Server';
				}
			}
			if ($wtwconnect->hasValue($zuserid)) {
				$zauthenticationok = true;
			}
$wtwconnect->serror("zauthenticationok=".$zauthenticationok);

			if ($zauthenticationok && isset($zwebname) && !empty($zwebname)) {
$wtwconnect->serror("HAS auth and webname");
				/* reserved words can not be any part of the webname - you can add your own reserved words */
				$zreserved = array('wtw','walktheweb','http3d','https3d');

				/* check if web alias is using a reserved word (not allowed) */
				$zwebtest = str_replace("_","",str_replace(".","",str_replace("-","",$zwebname)));

				$zfound = '0';
				foreach ($zreserved as $zword) {
					if (strpos($zwebtest, $zword) !== false) {
						 $zfound = '1';
					}
				}
				if ($zfound == '0') {
					/* check if web alias is already in use */
					$zresults = $wtwconnect->query("
						select w1.*
						from ".wtw_tableprefix."webaliases w1
						where w1.deleted=0
							and (w1.communitypublishname='".$zwebname."'
								or w1.buildingpublishname='".$zwebname."');");
					if (count($zresults) == 0) {
						/* not found - is available */
						$zwebnameok = true;
					}
				}
				if ($zwebnameok == false) {
					$serror = 'Web Name is already in use.';
				}
			}
$wtwconnect->serror("zwebnameok=".$zwebnameok);

			if ($zauthenticationok && $zwebnameok) {
$wtwconnect->serror("HAS auth and webnameOK");
				if ($wtwconnect->isUserInRole("Host")) {
					$zhostuserid = $zuserid;
				}
				/* download community */
				$zresults = $wtw_3dinternet_downloads->downloadWeb($zcommunityid, $zcommunityid, 'community', $zwtwusertoken, '', '', '', 0, 0, 0, 1, 1, 1, 0, 0, 0);
				
				$znewcommunityid = $zresults["newwebid"];

				if (!isset($znewcommunityid) || empty($znewcommunityid)) {
					$serror = '3D Community Scene could not be created.';
				} else {
					$wtwconnect->query("
						update ".wtw_tableprefix."communities
							set communityname='".addslashes($zwtwstorename)." 3D Community'
							where communityid='".$znewcommunityid."'
							limit 1;
					");
				}
				
				/* get building start position and rotation */
				$zbuildingpositionx = 0;
				$zbuildingpositiony = 0;
				$zbuildingpositionz = 0;
				$zbuildingscalingx = 1;
				$zbuildingscalingy = 1;
				$zbuildingscalingz = 1;
				$zbuildingrotationx = 0;
				$zbuildingrotationy = 0;
				$zbuildingrotationz = 0;
				$zresults = $wtwconnect->query("
					select c1.*
					from ".wtw_tableprefix."communities c1
					where c1.deleted=0
						and c1.communityid='".$znewcommunityid."';");
				foreach ($zresults as $zrow) {
					$zbuildingpositionx = $zrow["buildingpositionx"];
					$zbuildingpositiony = $zrow["buildingpositiony"];
					$zbuildingpositionz = $zrow["buildingpositionz"];
					$zbuildingscalingx = $zrow["buildingscalingx"];
					$zbuildingscalingy = $zrow["buildingscalingy"];
					$zbuildingscalingz = $zrow["buildingscalingz"];
					$zbuildingrotationx = $zrow["buildingrotationx"];
					$zbuildingrotationy = $zrow["buildingrotationy"];
					$zbuildingrotationz = $zrow["buildingrotationz"];
				}
$wtwconnect->serror("DOWNLOAD BUILDING");
				/* download building */
				$zresults = $wtw_3dinternet_downloads->downloadWeb($zbuildingid, $zbuildingid, 'building', $zwtwusertoken, $znewcommunityid, 'community', $znewcommunityid, $zbuildingpositionx, $zbuildingpositiony, $zbuildingpositionz, $zbuildingscalingx, $zbuildingscalingy, $zbuildingscalingz, $zbuildingrotationx, $zbuildingrotationy, $zbuildingrotationz);
				
				$znewbuildingid = $zresults["newwebid"];
				
				if (!isset($znewbuildingid) || empty($znewbuildingid)) {
					$serror = '3D Shopping Building could not be created.';
				} else {
					$wtwconnect->query("
						update ".wtw_tableprefix."buildings
							set buildingname='".addslashes($zwtwstorename)."'
							where buildingid='".$znewbuildingid."'
							limit 1;
					");
				}
$wtwconnect->serror("ADD WEB ALIAS");
				/* add webalias for new community to map the web url to the new 3D Website */
				$zwebaliasid = $wtwconnect->getRandomString(16,1);
				$wtwconnect->query("
					insert into ".wtw_tableprefix."webaliases
					   (webaliasid,
					    hostuserid,
						forcehttps,
						domainname,
						webalias,
						communityid,
						communitypublishname,
						buildingid,
						buildingpublishname,
						thingid,
						thingpublishname,
						createdate,
						createuserid,
						updatedate,
						updateuserid)
					values
					   ('".$zwebaliasid."',
					    '".$zhostuserid."',
						".$zforcehttps.",
						'".$zdomainname."',
						'".$zdomainname."',
						'".$znewcommunityid."',
						'".$zwebname."',
						'',
						'',
						'',
						'',
						now(),
						'".$zuserid."',
						now(),
						'".$zuserid."');");
$wtwconnect->serror("ADD WEB ALIAS FOR BUILDING");
				/* add webalias for new 3D Building so it can be opened directly */ 
				$zwebaliasid = $wtwconnect->getRandomString(16,1);
				$wtwconnect->query("
					insert into ".wtw_tableprefix."webaliases
					   (webaliasid,
					    hostuserid,
						forcehttps,
						domainname,
						webalias,
						communityid,
						communitypublishname,
						buildingid,
						buildingpublishname,
						thingid,
						thingpublishname,
						createdate,
						createuserid,
						updatedate,
						updateuserid)
					values
					   ('".$zwebaliasid."',
					    '".$zhostuserid."',
						".$zforcehttps.",
						'".$zdomainname."',
						'".$zdomainname."',
						'',
						'',
						'".$znewbuildingid."',
						'".$zwebname."',
						'',
						'',
						now(),
						'".$zuserid."',
						now(),
						'".$zuserid."');");
				
				/* if store key and secret exist - check if plugin is installed */
				if ($wtwconnect->hasValue($zstoreurl) && $wtwconnect->hasValue($zwookey) && $wtwconnect->hasValue($zwoosecret)) {
$wtwconnect->serror("HAS storeurl and wookey and woosecret");

					/* check if store tables exist (3D Shopping Plugin exists) */
					$zstoretables = 0;
					$zresults = $wtwconnect->query("
						select count(*) as scount
						from information_schema.tables 
						where table_schema = '".wtw_dbname."'
							and (table_name = '".wtw_tableprefix."shopping_stores'
								or table_name = '".wtw_tableprefix."shopping_connectstores');");
					foreach ($zresults as $zrow) {
						$zstoretables = $zrow["scount"];
					}
					/* if store tables exist - add permission entries */
					if ($zstoretables > 1) {
$wtwconnect->serror("HAS STORE TABLES");
						$zstoreid = $wtwconnect->getRandomString(16,1);
						$wtwconnect->query("
							insert into ".wtw_tableprefix."shopping_stores
								(storeid,
								 storename,
								 storeiframes,
								 storeurl,
								 storecarturl,
								 storeproducturl,
								 woocommerceapiurl,
								 woocommercekey, 
								 woocommercesecret,
								 approveddate,
								 approveduserid,
								 createdate,
								 createuserid,
								 updatedate,
								 updateuserid)
							values
								('".$zstoreid."',
								 '".base64_encode($zwtwstorename)."',
								 ".$ziframes.",
								 '".$zstoreurl."',
								 '".$zstorecarturl."',
								 '".$zstoreproducturl."',
								 '".$zstoreapiurl."',
								 '".base64_encode($zwookey)."', 
								 '".base64_encode($zwoosecret)."',
								 now(),
								 '".$zuserid."',
								 now(),
								 '".$zuserid."',
								 now(),
								 '".$zuserid."');");
$wtwconnect->serror("CONNECT STORE");
						/* connect store settings to 3D Store Building */
						$zconnectid = $wtwconnect->getRandomString(16,1);
						$wtwconnect->query("
							insert into ".wtw_tableprefix."shopping_connectstores
								(connectid,
								 storeid,
								 communityid,
								 buildingid,
								 thingid,
								 createdate,
								 createuserid,
								 updatedate,
								 updateuserid)
								values
								('".$zconnectid."',
								 '".$zstoreid."',
								 '',
								 '".$znewbuildingid."',
								 '',
								 now(),
								 '".$zuserid."',
								 now(),
								 '".$zuserid."');");
					} else {
						$serror = '3D Shopping Plugin is not installed.';
					}
				}
				
				/* set the return values */
				$zresponse = array(
					'serror'=>$serror,
					'buildingid'=>$znewcommunityid,
					'communityid'=>$znewbuildingid
				);
			} else {
				$zresponse = array(
					'serror'=>$serror,
					'buildingid'=>'',
					'communityid'=>''
				);
			}
			break;
	}
$wtwconnect->serror("DONE");
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-wordpress.php=".$e->getMessage());
}
?>
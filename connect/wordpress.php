<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides web aliases information */
if (session_status() == PHP_SESSION_NONE) {
	session_start();
}
require_once('../core/functions/class_wtwconnect.php');
require_once('../core/functions/class_wtwcommunities.php');
global $wtwconnect;
global $wtwcommunities;

try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/wordpress.php");
	
	$zfunction = $wtwconnect->getPost('function','');
	$zwpinstanceid = $wtwconnect->getPost('wpinstanceid','');
	$zwebsiteurl = $wtwconnect->getPost('websiteurl','');
	$zbuildingid = $wtwconnect->getPost('buildingid','');
	$zcommunityid = $wtwconnect->getPost('communityid','');
	$zusertoken = $wtwconnect->getPost('usertoken','');
	$zwtwusertoken = $wtwconnect->getPost('wtwusertoken','');
	$zwtwemail = $wtwconnect->getPost('wtwemail','');
	$zwtwuserid = $wtwconnect->getPost('userid','');
	$zhosturl = $wtwconnect->getPost('hosturl','');
	$zwtwurl = $wtwconnect->getPost('wtwurl','');
	$zwebname = $wtwconnect->getPost('webname','');
	$zwtwstorename = $wtwconnect->getPost('wtwstorename','');
	$zwookey = $wtwconnect->getPost('wookey','');
	$zwoosecret = $wtwconnect->getPost('woosecret','');
	$zstoreurl = $wtwconnect->getPost('storeurl','');
	$zstorecarturl = $wtwconnect->getPost('storecarturl','');
	$zstoreproducturl = $wtwconnect->getPost('storeproducturl','');
	$zstoreapiurl = $wtwconnect->getPost('storeapiurl','');
	$ziframes = $wtwconnect->getPost('iframes','');
	
	$zauthenticationok = false;
	$zwebnameok = false;
	$zuserid = '';
	$znewcommunityid = '';
	$znewbuildingid = '';
	$zdomainname = '';
	$zforcehttps = '1';
	$serror = '';
	$_SESSION["wtw_userid"] = '';
	$_SESSION["wtw_usertoken"] = '';
	$_SESSION["wtw_uploadpathid"] = '';
	
	if (!empty($zwpinstanceid) && isset($zwpinstanceid)) {
		$zwpinstanceid = base64_decode($zwpinstanceid);
	}
	if (!empty($zwebsiteurl) && isset($zwebsiteurl)) {
		$zwebsiteurl = base64_decode($zwebsiteurl);
	}
	if (!empty($zbuildingid) && isset($zbuildingid)) {
		$zbuildingid = base64_decode($zbuildingid);
	}
	if (!empty($zcommunityid) && isset($zcommunityid)) {
		$zcommunityid = base64_decode($zcommunityid);
	}
	if (!empty($zusertoken) && isset($zusertoken)) {
		$zusertoken = base64_decode($zusertoken);
	}
	if (!empty($zwtwusertoken) && isset($zwtwusertoken)) {
		$zwtwusertoken = base64_decode($zwtwusertoken);
	}
	if (!empty($zwtwemail) && isset($zwtwemail)) {
		$zwtwemail = strtolower(base64_decode($zwtwemail));
	}
	if (!empty($zwtwuserid) && isset($zwtwuserid)) {
		$zwtwuserid = base64_decode($zwtwuserid);
	}
	if (!empty($zhosturl) && isset($zhosturl)) {
		$zhosturl = base64_decode($zhosturl);
	}
	if (!empty($zwtwurl) && isset($zwtwurl)) {
		$zwtwurl = base64_decode($zwtwurl);
	}
	if (!empty($zwebname) && isset($zwebname)) {
		$zwebname = strtolower(base64_decode($zwebname));
	}
	if (!empty($zwtwstorename) && isset($zwtwstorename)) {
		$zwtwstorename = base64_decode($zwtwstorename);
	}
	if (!empty($zwookey) && isset($zwookey)) {
		$zwookey = base64_decode($zwookey);
	}
	if (!empty($zwoosecret) && isset($zwoosecret)) {
		$zwoosecret = base64_decode($zwoosecret);
	}
	if (!empty($zstoreurl) && isset($zstoreurl)) {
		$zstoreurl = base64_decode($zstoreurl);
	}
	if (!empty($zstorecarturl) && isset($zstorecarturl)) {
		$zstorecarturl = base64_decode($zstorecarturl);
	}
	if (!empty($zstoreproducturl) && isset($zstoreproducturl)) {
		$zstoreproducturl = base64_decode($zstoreproducturl);
	}
	if (!empty($zstoreapiurl) && isset($zstoreapiurl)) {
		$zstoreapiurl = base64_decode($zstoreapiurl);
	}
	if (!empty($ziframes) && isset($ziframes)) {
		$ziframes = base64_decode($ziframes);
	}
	
	$zparse = parse_url($zhosturl);
	$zdomainname = $zparse['host'];
	if (strpos(strtolower($zhosturl), 'http://') !== false) {
		$zforcehttps = '0';
	}

	$zresponse = array(
		'serror'=>'',
		'buildingid'=>'',
		'communityid'=>''
	);

	if (!empty($zwtwusertoken) && isset($zwtwusertoken)) {
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
			$zuploadpathid = $zrow["uploadpathid"];
			$_SESSION["wtw_userid"] = $zuserid;
			$_SESSION["wtw_usertoken"] = $zwtwusertoken;
			$_SESSION["wtw_uploadpathid"] = $zuploadpathid;
			/* user found by access token, update the pastuserid (wtwuserid) to the user account as a reference */
			if (!empty($zuserid) && isset($zuserid) && (empty($zpastuserid) || !isset($zpastuserid))) {
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
	}
	
	if ($zauthenticationok && !empty($zwebname) && isset($zwebname)) {
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
	
	if ($zauthenticationok && $zwebnameok) {
		/* download community */
		$znewcommunityid = $wtwcommunities->downloadWeb($zcommunityid, $zcommunityid, 'community', '', '', '', 0, 0, 0, 0);
		
		if (empty($znewcommunityid) || !isset($znewcommunityid)) {
			$serror = '3D Community Scene could not be created.';
		}
		
		/* get building start position and rotation */
		$zresults = $wtwconnect->query("
			select c1.*
			from ".wtw_tableprefix."communities c1
			where c1.deleted=0
				and c1.communityid='".$znewcommunityid."';");
		foreach ($zresults as $zrow) {
			$zbuildingpositionx = $zrow["buildingpositionx"];
			$zbuildingpositiony = $zrow["buildingpositiony"];
			$zbuildingpositionz = $zrow["buildingpositionz"];
			$zbuildingrotationy = $zrow["buildingrotationy"];
		}
		
		/* download building */
		$znewbuildingid = $wtwcommunities->downloadWeb($zbuildingid, $zbuildingid, 'building', $znewcommunityid, 'community', $znewcommunityid, $zbuildingpositionx, $zbuildingpositiony, $zbuildingpositionz, $zbuildingrotationy);
		
		if (empty($znewbuildingid) || !isset($znewbuildingid)) {
			$serror = '3D Shopping Building could not be created.';
		}
		
		/* add webalias for new community to map the web url to the new 3D Website */
		$zwebaliasid = $wtwconnect->getRandomString(16,1);
		$wtwconnect->query("
			insert into ".wtw_tableprefix."webaliases
			   (webaliasid,
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
		
		/* add webalias for new 3D Building so it can be opened directly */ 
		$zwebaliasid = $wtwconnect->getRandomString(16,1);
		$wtwconnect->query("
			insert into ".wtw_tableprefix."webaliases
			   (webaliasid,
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
		/* store tables exist - add permission entries */
		if ($zstoretables > 1) {
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
	
	echo $wtwconnect->addConnectHeader('*');
	
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-wordpress.php=".$e->getMessage());
}
?>

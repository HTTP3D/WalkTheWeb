<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides basic user information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/userauthenticate.php");

	$zuseremail = $wtwconnect->decode64($wtwconnect->getPost('useremail',''));
	$zuserpassword = $wtwconnect->decode64($wtwconnect->getPost('password',''));
	$zwpinstanceid = $wtwconnect->decode64($wtwconnect->getPost('wpinstanceid',''));
	$zwebsiteurl = $wtwconnect->decode64($wtwconnect->getPost('websiteurl',''));
	$zserverip = $wtwconnect->decode64($wtwconnect->getPost('serverip',''));
	$zwordpresstoken = '';
	$zfound = false;

	echo $wtwconnect->addConnectHeader('*');
	
	$zresponse = array(
		'userid' => '',
		'wordpresstoken' => '',
		'serror' => 'Invalid Login.'
	);
	
	/* get users information */
	$zresults = $wtwconnect->query("
		select u1.* 
		from ".wtw_tableprefix."users u1
			inner join ".wtw_tableprefix."usersinroles uir1
			on u1.userid=uir1.userid
			inner join ".wtw_tableprefix."roles r1
			on uir1.roleid=r1.roleid
		where r1.rolename='Admin'
			and r1.deleted=0
			and u1.deleted=0
			and u1.email='".$zuseremail."';");
	
	/* check for account and verify password */
	foreach ($zresults as $zrow) {
		$zuserid = $zrow["userid"];
		$zpasswordhash = $zrow["userpassword"];
		if ($zfound == false && password_verify($zuserpassword, $zpasswordhash)) {
			$zfound = true;
			/* user is local on server and is valid login */
			$zwordpresstoken = $zrow["wordpresstoken"];
			if (!isset($zwordpresstoken) || empty($zwordpresstoken)) {
				$zwordpresstoken = base64_encode($wtwconnect->getRandomString(128,1));
				$wtwconnect->query("
					update ".wtw_tableprefix."users
					set wordpresstoken='".$zwordpresstoken."'
					where deleted=0
						and userid='".$zuserid."';");
			}
			/* format json return dataset */
			$zresponse = array(
				'userid' => $zuserid,
				'wordpresstoken' => $zwordpresstoken,
				'serror' => ''
			);
		} else if ($zfound == false) {
			/* user is global and requires global validation */
			$zpostdata = stream_context_create(array('http' =>
				array(
					'method'  => 'POST',
					'header'  => 'Content-Type: application/x-www-form-urlencoded',
					'content' => http_build_query(
						array(
							'useremail' => base64_encode($zuseremail),
							'password' => base64_encode($zuserpassword),
							'wpinstanceid' => base64_encode($zwpinstanceid),
							'websiteurl' => base64_encode($zwebsiteurl),
							'serverip' => base64_encode($zserverip),
							'function' => 'login'
						)
					)
				)
			));
				
			$zresults = $wtwconnect->openFilefromURL('https://3dnet.walktheweb.com/connect/authenticate.php', false, $zpostdata);			
			if ($wtwconnect->hasValue($zresults)) {
				$zresults = json_decode($zresults);
			}

			if ($wtwconnect->hasValue($zresults->usertoken)) {
				/* authenticated */
				$zfound = true;
				$zwordpresstoken = $zrow["wordpresstoken"];
				if (!isset($zwordpresstoken) || empty($zwordpresstoken)) {
					$zwordpresstoken = base64_encode($wtwconnect->getRandomString(128,1));
					$wtwconnect->query("
						update ".wtw_tableprefix."users
						set wordpresstoken='".$zwordpresstoken."',
							usertoken='".base64_encode($zresults->usertoken)."',
							updatedate=now(),
							updateuserid='".$zuserid."'
						where deleted=0
							and userid='".$zuserid."';");
				} else {
					$wtwconnect->query("
						update ".wtw_tableprefix."users
						set usertoken='".base64_encode($zresults->usertoken)."',
							updatedate=now(),
							updateuserid='".$zuserid."'
						where deleted=0
							and userid='".$zuserid."';");
				}
				$zresponse = array(
					'userid' => $zuserid,
					'wordpresstoken' => $zwordpresstoken,
					'serror' => ''
				);
			} else {
				/* did not authenticate, return error */
				$zresponse = $zresults;
			}
		}
	}
	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-userauthenticate.php=".$e->getMessage());
}
?>

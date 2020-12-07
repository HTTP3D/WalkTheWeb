<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides web aliases information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;

try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/apikeys.php");
	
	$zfunction = $wtwconnect->getPost('function','');
	$zappid = $wtwconnect->getPost('appid','');
	$zappname = $wtwconnect->getPost('appname','');
	$zhosturl = $wtwconnect->getPost('hosturl','');
	$zwtwkey = $wtwconnect->getPost('wtwkey','');
	$zwtwsecret = $wtwconnect->getPost('wtwsecret','');
	$zapikeyid = $wtwconnect->getPost('apikeyid','');
	$zapproved = $wtwconnect->getPost('approved','');

	$zappid = $wtwconnect->decode64($zappid);
	$zappname = $wtwconnect->decode64($zappname);
	$zhosturl = $wtwconnect->decode64($zhosturl);
	$zwtwkey = $wtwconnect->decode64($zwtwkey);
	$zwtwsecret = $wtwconnect->decode64($zwtwsecret);
	$zapikeyid = $wtwconnect->decode64($zapikeyid);
	
	$zreferer = $_SERVER['HTTP_REFERER'];
	
	if(substr($zhosturl, -1) == '/') {
		$zhosturl = substr($zhosturl, 0, -1);
	}
	if(substr($zreferer, -1) == '/') {
		$zreferer = substr($zreferer, 0, -1);
	}

	$serror = '';
	
	$zresponse = array(
		'serror'=>'',
		'hostid'=>'',
		'wtwkey'=>''
	);
	switch ($zfunction) {
		case "checkhost":
			echo $wtwconnect->addConnectHeader('*');
			$zapikeyid = '';
			$zappid = '';
			$zwtwsecrethash = '';
			$zdeleted = '';
			$zapproved = '';
			$zkey = "...".substr($zwtwkey, -7);
			
			$zresults = $wtwconnect->query("
				select * 
				from ".wtw_tableprefix."apikeys
				where wtwkey='".base64_encode($zwtwkey)."'
				limit 1;");
			foreach ($zresults as $zrow) {
				$zapikeyid = $zrow["apikeyid"];
				$zappid = $zrow["appid"];
				$zwtwsecrethash = $zrow["wtwsecret"];
				$zdeleted = $zrow["deleted"];
				$zapproved = $zrow["approved"];
			}
			if (empty($zwtwsecrethash) || !isset($zwtwsecrethash)) {
				/* key not found */
				$zresponse = array(
					'serror'=>'Invalid Key',
					'hostid'=>'',
					'wtwkey'=>$zkey
				);
			} else {
				if (password_verify($zwtwsecret, $zwtwsecrethash)) {
					/* secret is correct */
					$zerror = 'Valid Key';
					if ($zdeleted != 0) {
						$zerror = 'Invalid Key';
						$zapikeyid = '';
					} else if ($zapproved != 1) {
						$zerror = 'Waiting on Approval';
						$zapikeyid = '';
					}
					$zresponse = array(
						'serror'=>$zerror,
						'hostid'=>$zapikeyid,
						'wtwkey'=>$zkey
					);
				} else {
					/* could not validate secret */
					$zresponse = array(
						'serror'=>'Invalid Key',
						'hostid'=>'',
						'wtwkey'=>$zkey
					);
				}
			}
			break;
		case "hostrequest":
			echo $wtwconnect->addConnectHeader('*');
			if (!empty($zreferer) && isset($zreferer) && !empty($zappid) && isset($zappid)) {
				$zdomainname = '';
				$zforcehttps = '1';
				$zparse = parse_url($zhosturl);
				$zdomainname = $zparse['host'];
				if (strpos(strtolower($zhosturl), 'http://') !== false) {
					$zforcehttps = '0';
				}
				
				$zfoundappid = '';
				$zapikeyid = '';
				$zdeleted = '0';
				$zapproved = '0';
				$zresults = $wtwconnect->query("
					select * 
					from ".wtw_tableprefix."apikeys
					where appurl='".$zreferer."'
					order by createdate
					limit 1;");
				foreach ($zresults as $zrow) {
					$zfoundappid = $zrow["appid"];
					$zapikeyid = $zrow["apikeyid"];
					$zdeleted = $zrow["deleted"];
					$zapproved = $zrow["approved"];
				}
				
				if (empty($zapikeyid)) {
					$zapikeyid = $wtwconnect->getRandomString(16,1);
					$zwtwkey = base64_encode($zwtwkey);
					
					$options = ['cost' => 11];
					$zwtwsecrethash = password_hash($zwtwsecret, PASSWORD_DEFAULT, $options);

					$wtwconnect->query("
						insert into ".wtw_tableprefix."apikeys
						   (apikeyid,
							appid,
							appname,
							appurl,
							wtwkey,
							wtwsecret,
							createdate,
							updatedate)
						   values
						   ('".$zapikeyid."',
							'".$zappid."',
							'".$zappname."',
							'".$zreferer."',
							'".$zwtwkey."',
							'".$zwtwsecrethash."',
							now(),
							now());");
					$zresponse = array(
						'serror'=>'',
						'hostid'=>$zapikeyid
					);
				} else {
					if ($zdeleted == '1') {
						$zresponse = array(
							'serror'=>'Access has been denied.',
							'hostid'=>''
						);
					} else if ($zfoundappid != $zappid) {
						$zresponse = array(
							'serror'=>'App ID could not be verified.',
							'hostid'=>''
						);
					} else if ($zapproved != '1') {
						$zresponse = array(
							'serror'=>'Access has not been approved yet.',
							'hostid'=>''
						);
					}
				}
			}
			break;
	}

	echo json_encode($zresponse);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-apikeys.php=".$e->getMessage());
}
?>

<?php
class wtwtools {
	/* $wtwtools class for admin database functions for tools */
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {

	}	

	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}

	public function saveContentRating($zwebid, $zwebtype, $zrating, $zratingvalue, $zcontentwarning, $zparentalcontrols) {
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>''
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist","host"))) {
				if (!empty($zwebid) && isset($zwebid) && is_numeric($zratingvalue) && !empty($zrating) && isset($zrating)) {
					if (!empty($zcontentwarning) && isset($zcontentwarning)) {
						$zcontentwarning = addslashes(base64_decode($zcontentwarning));
					}
					$zcontentratingid = '';
					$zresults = $wtwhandlers->query("
						select contentratingid
						from ".wtw_tableprefix."contentratings
						where webid='".$zwebid."'
						limit 1;");
					foreach ($zresults as $zrow) {
						$zcontentratingid = $zrow["contentratingid"];
					}
					if ((empty($zcontentratingid) || !isset($zcontentratingid)) && $zparentalcontrols == '1') {
						/* create a new rating record in the table */
						$zcontentratingid = $wtwhandlers->getRandomString(16,1);
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."contentratings
							   (contentratingid,
								webid,
								webtype,
								rating,
								ratingvalue,
								contentwarning,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							  values
							   ('".$zcontentratingid."',
								'".$zwebid."',
								'".$zwebtype."',
								'".$zrating."',
								".$zratingvalue.",
								'".$zcontentwarning."',
								now(),
								'".$wtwhandlers->userid."',
								now(),
								'".$wtwhandlers->userid."');");
					} else if ($zparentalcontrols == '0') {
						/* parental controls are turned off */
						$wtwhandlers->query("
							update ".wtw_tableprefix."contentratings
							set deleteddate=now(),
								deleteduserid='".$wtwhandlers->userid."',
								deleted=1
							where contentratingid='".$zcontentratingid."'
								and webid='".$zwebid."'
							limit 1;");
					} else {
						/* parental controls are on - update table */
						$wtwhandlers->query("
							update ".wtw_tableprefix."contentratings
							set rating='".$zrating."',
								ratingvalue=".$zratingvalue.",
								contentwarning='".$zcontentwarning."',
								updateuserid='".$wtwhandlers->userid."',
								deleteddate=null,
								deleteduserid='',
								deleted=0
							where contentratingid='".$zcontentratingid."'
								and webid='".$zwebid."'
							limit 1;");
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwtools.php-saveContentRating=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage()
			);
		}
		return $zresponse;
	}
			
	public function getServerSettings() {
		global $wtwhandlers;
		$zresponse = array(
			'serverinstanceid'=>'',
			'dbserver'=>'',
			'dbname'=>'',
			'dbusername'=>'',
			'dbpassword'=>'',
			'tableprefix'=>'',
			'defaultlanguage'=>'English',
			'contentpath'=>'',
			'contenturl'=>'',
			'defaultdomain'=>'',
			'defaultsitename'=>'',
			'googleanalytics'=>'',
			'adminemail'=>'',
			'adminname'=>'',
			'ftphost'=>'',
			'ftpuser'=>'',
			'ftppassword'=>'',
			'ftpbase'=>'',
			'umask'=>'0027',
			'chmod'=>'755'
		);
		try {
			/* confirm still logged in */
			$wtwhandlers->getSessionUserID();
			if ($wtwhandlers->hasPermission(array("admin"))) {
				if (defined('wtw_serverinstanceid')) {
					$zresponse["serverinstanceid"] = wtw_serverinstanceid;
				}
				if (defined('wtw_dbserver')) {
					$zresponse["dbserver"] = wtw_dbserver;
				}
				if (defined('wtw_dbname')) {
					$zresponse["dbname"] = wtw_dbname;
				}
				if (defined('wtw_dbusername')) {
					$zresponse["dbusername"] = wtw_dbusername;
				}
				if (defined('wtw_dbpassword')) {
					$zresponse["dbpassword"] = wtw_dbpassword;
				}
				if (defined('wtw_tableprefix')) {
					$zresponse["tableprefix"] = wtw_tableprefix;
				}
				if (defined('wtw_defaultlanguage')) {
					$zresponse["defaultlanguage"] = wtw_defaultlanguage;
				}
				if (defined('wtw_contentpath')) {
					$zresponse["contentpath"] = wtw_contentpath;
				}
				if (defined('wtw_contenturl')) {
					$zresponse["contenturl"] = wtw_contenturl;
				}
				if (defined('wtw_defaultdomain')) {
					$zresponse["defaultdomain"] = wtw_defaultdomain;
				}
				if (defined('wtw_defaultsitename')) {
					$zresponse["defaultsitename"] = wtw_defaultsitename;
				}
				if (defined('wtw_googleanalytics')) {
					$zresponse["googleanalytics"] = wtw_googleanalytics;
				}
				if (defined('wtw_adminemail')) {
					$zresponse["adminemail"] = wtw_adminemail;
				}
				if (defined('wtw_adminname')) {
					$zresponse["adminname"] = wtw_adminname;
				}
				if (defined('wtw_ftphost')) {
					$zresponse["ftphost"] = wtw_ftphost;
				}
				if (defined('wtw_ftpuser')) {
					$zresponse["ftpuser"] = wtw_ftpuser;
				}
				if (defined('wtw_ftppassword')) {
					$zresponse["ftppassword"] = wtw_ftppassword;
				}
				if (defined('wtw_ftpbase')) {
					$zresponse["ftpbase"] = wtw_ftpbase;
				}
				if (defined('wtw_umask')) {
					$zresponse["umask"] = wtw_umask;
				}
				if (defined('wtw_chmod')) {
					$zresponse["chmod"] = wtw_chmod;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwtools.php-getServerSettings=".$e->getMessage());
		}
		return $zresponse;
	}

	public function saveServerSettings($zdbserver, $zdbname, $zdbusername, $zdbpassword, $zdefaultlanguage, $zcontentpath, $zdefaultdomain, $zdefaultsitename, $zgoogleanalytics, $zadminemail, $zadminname, $zumask, $zchmod, $zftphost, $zftpuser, $zftppassword, $zftpbase) {
		global $wtwhandlers;
		$zresponse = array('serror'=>'');
		try {
			$wtwhandlers->getSessionUserID();
			if ($wtwhandlers->hasPermission(array("admin"))) {
				$this->updateConfigSetting('wtw_dbserver', $zdbserver);
				$this->updateConfigSetting('wtw_dbname', $zdbname);
				$this->updateConfigSetting('wtw_dbusername', $zdbusername);
				$this->updateConfigSetting('wtw_dbpassword', $zdbpassword);
				$this->updateConfigSetting('wtw_defaultlanguage', $zdefaultlanguage);
				$this->updateConfigSetting('wtw_contentpath', $zcontentpath);
				$this->updateConfigSetting('wtw_defaultdomain', $zdefaultdomain);
				$this->updateConfigSetting('wtw_defaultsitename', $zdefaultsitename);
				$this->updateConfigSetting('wtw_googleanalytics', $zgoogleanalytics);
				$this->updateConfigSetting('wtw_adminemail', $zadminemail);
				$this->updateConfigSetting('wtw_adminname', $zadminname);
				$this->updateConfigSetting('wtw_umask', $zumask);
				$this->updateConfigSetting('wtw_chmod', $zchmod);
				$this->updateConfigSetting('wtw_ftphost', $zftphost);
				$this->updateConfigSetting('wtw_ftpuser', $zftpuser);
				$this->updateConfigSetting('wtw_ftppassword', $zftppassword);
				$this->updateConfigSetting('wtw_ftpbase', $zftpbase);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwtools.php-saveServerSettings=".$e->getMessage());
			$zresponse = array('serror'=>'Error savingfiles: '.$e->getMessage());
		}
		return $zresponse;
	}
	
	public function getHostingServerSettings() {
		global $wtwhandlers;
		$zresponse = array(
			'serverhosting'=>'0',
			'serverhostprice'=>'0',
			'serversslprice'=>'0',
			'serverhostdays'=>'365',
			'serverdnsarecord'=>'',
			'serverdnscname'=>'',
			'serverhostuserrole'=>'0'
		);
		try {
			/* confirm still logged in */
			/* set default value */
			$zresponse["serverdnsarecord"] = $wtwhandlers->serverip;
			if (defined('wtw_defaultdomain')) {
				$zresponse["serverdnscname"] = wtw_defaultdomain;
			}
			/* try to load saved values if they exist */
			if (defined('wtw_server_hosting')) {
				$zresponse["serverhosting"] = $wtwhandlers->checkNumber(wtw_server_hosting,0);
			}
			if (defined('wtw_server_hostprice')) {
				$zresponse["serverhostprice"] = $wtwhandlers->checkNumber(wtw_server_hostprice,0);
			}
			if (defined('wtw_server_sslprice')) {
				$zresponse["serversslprice"] = $wtwhandlers->checkNumber(wtw_server_sslprice,0);
			}
			if (defined('wtw_server_hostdays')) {
				$zresponse["serverhostdays"] = $wtwhandlers->checkNumber(wtw_server_hostdays,0);
			}
			if (defined('wtw_server_dns_arecord')) {
				$zresponse["serverdnsarecord"] = wtw_server_dns_arecord;
			}
			if (defined('wtw_server_dns_cname')) {
				$zresponse["serverdnscname"] = wtw_server_dns_cname;
			}
			if (defined('wtw_server_host_user_role')) {
				$zresponse["serverhostuserrole"] = $wtwhandlers->checkNumber(wtw_server_host_user_role,0);
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwtools.php-getHostingServerSettings=".$e->getMessage());
		}
		return $zresponse;
	}
	
	public function saveHostingServerSettings($zserverhosting, $zserverhostprice, $zserversslprice, $zserverhostdays, $zserverdnsarecord, $zserverdnscname, $zserverhostuserrole) {
		global $wtwhandlers;
		$zresponse = array('serror'=>'');
		try {
			/* confirm still logged in */
			$wtwhandlers->getSessionUserID();
			if ($wtwhandlers->hasPermission(array("admin"))) {
				$this->updateConfigSetting('wtw_server_hosting', $wtwhandlers->checkNumber($zserverhosting,0));
				$this->updateConfigSetting('wtw_server_hostprice', $wtwhandlers->checkNumber($zserverhostprice,0));
				$this->updateConfigSetting('wtw_server_sslprice', $wtwhandlers->checkNumber($zserversslprice,0));
				$this->updateConfigSetting('wtw_server_hostdays', $wtwhandlers->checkNumber($zserverhostdays,365));
				$this->updateConfigSetting('wtw_server_dns_arecord', $zserverdnsarecord);
				$this->updateConfigSetting('wtw_server_dns_cname', $zserverdnscname);
				$this->updateConfigSetting('wtw_server_host_user_role', $wtwhandlers->checkNumber($zserverhostuserrole,0));
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwtools.php-saveHostingServerSettings=".$e->getMessage());
			$zresponse = array('serror'=>'Error saving hosting settings: '.$e->getMessage());
		}
		return $zresponse;
	}

	public function getLanguages() {
		global $wtwhandlers;
		$zresponse = array();
		try {
			/* check languages folder for language files */
			$i = 0;
			$zfilepath = wtw_rootpath."/core/languages";
			if (file_exists($zfilepath)) {
				$zfiles = new DirectoryIterator($zfilepath);
				foreach ($zfiles as $zfileinfo) {
					if (!$zfileinfo->isDir() && !$zfileinfo->isDot()) {
						$zfilename = $zfileinfo->getFilename();
						$zurl = $wtwhandlers->domainurl."/core/languages/".$zfilename;
						$zrequest = $wtwhandlers->openFilefromURL($zurl);
						if (!empty($zrequest) && isset($zrequest)) {
							$zrequest = json_decode($zrequest);
						}
					if (isset($zrequest[0]->language) && !empty($zrequest[0]->language) && isset($zrequest[0]->abbreviation) && !empty($zrequest[0]->abbreviation)) {
							$zresponse[$i] = array(
								'language'=>$zrequest[0]->language,
								'abbreviation'=>$zrequest[0]->abbreviation
							);
						}
					}
				}
			} else {
				mkdir($zfilepath, octdec(wtw_chmod), true);
				chmod($zfilepath, octdec(wtw_chmod));
			}
			/* sort the results by language, then abbreviation */
/*			function arraysort($a, $b) {
				if ($a["language"] == $b["language"]) {
					return ($a["abbreviation"] > $b["abbreviation"]) ? 1 : -1;
				}
				return ($a["language"] > $b["language"]) ? 1 : -1;
			}
			usort($zresponse, "arraysort");
*/			
			
			
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwtools.php-getLanguages=".$e->getMessage());
		}
		return $zresponse;
	}
	
	public function updateConfigSetting($zsetting, $zvalue) {
		global $wtwhandlers;
		$zresponse = array('serror'=>'');
		try {
			$wtwhandlers->getSessionUserID();
			if ($wtwhandlers->hasPermission(array("admin"))) {
				$zfound = false;
				$lines = file(wtw_rootpath.'/config/wtw_config.php');
				$cfile = fopen(wtw_rootpath."/config/wtw_config.php","wb");
				foreach ($lines as $line) {
					if (strpos($line, "define(\"".$zsetting."\",") !== false) {
						fwrite($cfile, "    define(\"".$zsetting."\", \"".$zvalue."\");\r\n");
						$zfound = true;
					} else {
						if ($zfound == false && strpos($line, '?') !== false && strpos($line, '>') !== false) {
							fwrite($cfile, "    define(\"".$zsetting."\", \"".$zvalue."\");\r\n");
							fwrite($cfile, $line);
						} else {
							fwrite($cfile, $line);
						}
					}
				}
				fclose($cfile);
				chmod(wtw_rootpath.'/config/wtw_config.php', octdec(wtw_chmod));
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwtools.php-updateConfigSetting=".$e->getMessage());
		}
	}



	
	public function sendAdminEmail($zsendto, $zsubject, $zmessage) {
		/* send Admin email */
		/* $zsendto, $zcopyto, and $zbccto accept array of email addresses */
		/* it can be a mix of email addresses and/or email address with Name using => */
		/* example: 
			$zsendto = array(
				'email1@domain1.com', 
				'email2@domain2.com', 
				'email3@domain3.com'=>'Email 3 Name', 
				'email4@domain4.com'); 
		*/
		global $wtwhandlers;
		$zresponse = array('serror'=>'');
		try {
			$zresults = $wtwhandlers->getSettings("smtphost, smtpport, smtpusername, smtppassword, smtpencryption, fromemail, fromemailname");

			require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/functions/swiftmailer_includes.php');

			$zfromemail = '';
			$zfromemailname = '';
			if (!empty($zresults["fromemail"]) && isset($zresults["fromemail"])) {
				$zfromemail = $zresults["fromemail"];
			}
			if (!empty($zresults["fromemailname"]) && isset($zresults["fromemailname"])) {
				$zfromemailname = $zresults["fromemailname"];
			}
			if (empty($zfromemailname) && !empty($zfromemail)) {
				$zfromemailname = $zfromemail;
			}
			if (!empty($zresults["smtphost"]) && !empty($zresults["smtpport"])) {
				if (!empty($zfromemail)) {
					if (empty($zresults["smtpencryption"]) || !isset($zresults["smtpencryption"])) {
						$ztransport = (new Swift_SmtpTransport($zresults["smtphost"], $zresults["smtpport"]))
						  ->setUsername($zresults["smtpusername"])
						  ->setPassword($wtwhandlers->decode64($zresults["smtppassword"]));
					} else {
						$ztransport = (new Swift_SmtpTransport($zresults["smtphost"], $zresults["smtpport"], $zresults["smtpencryption"]))
						  ->setUsername($zresults["smtpusername"])
						  ->setPassword($wtwhandlers->decode64($zresults["smtppassword"]));
					}
					
					$zmailer = new Swift_Mailer($ztransport);
					
					$message = new Swift_Message();
					
					$zemail = (new Swift_Message($zsubject))
					  ->setFrom(array($zfromemail => $zfromemailname))
					  ->setTo($zsendto)
					  ->setBody($zmessage);
					
					$result = $zmailer->send($zemail);
				} else {
					$zresponse = array('serror' => 'From email is not set.');
				}
			} else {
				$zresponse = array('serror' => 'Email Server or Port is not set.');
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwtools.php-sendAdminEmail=".$e->getMessage());
			$zresponse = array('serror' => $e->getMessage());
		}
		return $zresponse;
	}

	public function sendEmail($zsendto, $zcopyto, $zbccto, $zsubject, $zhtmlmessage, $zmessage) {
		/* send email */
		/* $zsendto, $zcopyto, and $zbccto accept array of email addresses */
		/* it can be a mix of email addresses and/or email address with Name using => */
		/* example: 
			$zsendto = array(
				'email1@domain1.com', 
				'email2@domain2.com', 
				'email3@domain3.com'=>'Email 3 Name', 
				'email4@domain4.com'); 
		*/
		global $wtwhandlers;
		$zresponse = array('serror'=>'');
		try {
			$zresults = $wtwhandlers->getSettings("smtphost, smtpport, smtpusername, smtppassword, smtpencryption, fromemail, fromemailname");

			require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/functions/swiftmailer_includes.php');

			$zfromemail = '';
			$zfromemailname = '';
			if (!empty($zresults["fromemail"]) && isset($zresults["fromemail"])) {
				$zfromemail = $zresults["fromemail"];
			}
			if (!empty($zresults["fromemailname"]) && isset($zresults["fromemailname"])) {
				$zfromemailname = $zresults["fromemailname"];
			}
			if (empty($zfromemailname) && !empty($zfromemail)) {
				$zfromemailname = $zfromemail;
			}
			if (!empty($zresults["smtphost"]) && !empty($zresults["smtpport"])) {
				if (!empty($zfromemail)) {
					if (empty($zresults["smtpencryption"]) || !isset($zresults["smtpencryption"])) {
						$ztransport = (new Swift_SmtpTransport($zresults["smtphost"], $zresults["smtpport"]))
						  ->setUsername($zresults["smtpusername"])
						  ->setPassword($wtwhandlers->decode64($zresults["smtppassword"]));
					} else {
						$ztransport = (new Swift_SmtpTransport($zresults["smtphost"], $zresults["smtpport"], $zresults["smtpencryption"]))
						  ->setUsername($zresults["smtpusername"])
						  ->setPassword($wtwhandlers->decode64($zresults["smtppassword"]));
					}
					
					$zmailer = new Swift_Mailer($ztransport);
					
					$zemail = new Swift_Message($zsubject);
					$zemail->setFrom(array($zfromemail => $zfromemailname));
					$zemail->setTo($zsendto);
					$zemail->setBody($zhtmlmessage, 'text/html');
					if (!empty($zcopyto) && isset($zcopyto)) {
						$zemail->setCc($zcopyto);
					}
					if (!empty($zbccto) && isset($zbccto)) {
						$zemail->setBcc($zbccto);
					}
					if (!empty($zmessage) && isset($zmessage)) {
						$zemail->addPart($zmessage, 'text/plain');
					}
					
					$result = $zmailer->send($zemail);
				} else {
					$zresponse = array('serror' => 'From email is not set.');
				}
			} else {
				$zresponse = array('serror' => 'Email Server or Port is not set.');
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwtools.php-sendEmail=".$e->getMessage());
			$zresponse = array('serror' => $e->getMessage());
		}
		return $zresponse;
	}

	public function saveFeedback($zurl, $zdomainurl, $zwtwversion, $zcommunityid, $zbuildingid, $zthingid, $zfeedbacktype, $zcategory, $zsubject, $zmessage, $zsnapshoturl, $zfeedbackname, $zdisplayname, $zfeedbackemail, $zuseremail, $zuserid, $zuserip, $zinstanceid, $zglobaluserid, $zusertoken, $zuploadpathid, $zglobaluseravatarid, $zuseravatarid) {
		global $wtwhandlers;
		$zresponse = array(
			'feedbackid'=>'', 
			'serror'=>''
		);
		try {
			if (!empty($zurl) && isset($zurl)) {
				$zurl = addslashes(base64_decode($zurl));
			}
			if (!empty($zdomainurl) && isset($zdomainurl)) {
				$zdomainurl = addslashes(base64_decode($zdomainurl));
			}
			if (!empty($zwtwversion) && isset($zwtwversion)) {
				$zwtwversion = addslashes(base64_decode($zwtwversion));
			}
			if (!empty($zfeedbacktype) && isset($zfeedbacktype)) {
				$zfeedbacktype = addslashes(base64_decode($zfeedbacktype));
			}
			if (!empty($zcategory) && isset($zcategory)) {
				$zcategory = addslashes(base64_decode($zcategory));
			}
			if (!empty($zsubject) && isset($zsubject)) {
				$zsubject = addslashes(base64_decode($zsubject));
			}
			if (!empty($zmessage) && isset($zmessage)) {
				$zmessage = addslashes(base64_decode($zmessage));
			}
			if (!empty($zsnapshoturl) && isset($zsnapshoturl)) {
				$zsnapshoturl = addslashes(base64_decode($zsnapshoturl));
			}
			if (!empty($zfeedbackname) && isset($zfeedbackname)) {
				$zfeedbackname = addslashes(base64_decode($zfeedbackname));
			}
			if (!empty($zdisplayname) && isset($zdisplayname)) {
				$zdisplayname = addslashes(base64_decode($zdisplayname));
			}
			if (!empty($zfeedbackemail) && isset($zfeedbackemail)) {
				$zfeedbackemail = addslashes(base64_decode($zfeedbackemail));
			}
			if (!empty($zuseremail) && isset($zuseremail)) {
				$zuseremail = addslashes(base64_decode($zuseremail));
			}

			/* create a new rating record in the table */
			$zfeedbackid = $wtwhandlers->getRandomString(16,1);
			$wtwhandlers->query("
				insert into ".wtw_tableprefix."feedback
				   (feedbackid,
					url,
					domainurl,
					wtwversion,
					communityid,
					buildingid,
					thingid,
					feedbacktype,
					category,
					subject,
					message,
					snapshoturl,
					feedbackname,
					displayname,
					feedbackemail,
					useremail,
					userid,
					userip,
					instanceid,
					globaluserid,
					usertoken,
					uploadpathid,
					globaluseravatarid,
					useravatarid,
					feedbackdate,
					createdate,
					createuserid,
					updatedate,
					updateuserid)
				  values
				   ('".$zfeedbackid."',
					'".$zurl."',
					'".$zdomainurl."',
					'".$zwtwversion."',
					'".$zcommunityid."',
					'".$zbuildingid."',
					'".$zthingid."',
					'".$zfeedbacktype."',
					'".$zcategory."',
					'".$zsubject."',
					'".$zmessage."',
					'".$zsnapshoturl."',
					'".$zfeedbackname."',
					'".$zdisplayname."',
					'".$zfeedbackemail."',
					'".$zuseremail."',
					'".$zuserid."',
					'".$zuserip."',
					'".$zinstanceid."',
					'".$zglobaluserid."',
					'".$zusertoken."',
					'".$zuploadpathid."',
					'".$zglobaluseravatarid."',
					'".$zuseravatarid."',
					now(),
					now(),
					'".$wtwhandlers->userid."',
					now(),
					'".$wtwhandlers->userid."');");

			$zresponse = array(
				'feedbackid'=>$zfeedbackid, 
				'serror'=>''
			);
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwtools.php-saveFeedback=".$e->getMessage());
			$zresponse = array('feedbackid'=>'', 'serror' => $e->getMessage());
		}
		return $zresponse;
	}

	public function getFeedback($zfilter) {
		/* get feedback using filter */
		global $wtwhandlers;
		$zresults = array();
		try {
			$zresults = $wtwhandlers->query("
				select * from ".wtw_tableprefix."feedback
					order by feedbackdate desc,feedbackid desc;");

		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwtools.php-getFeedback=".$e->getMessage());
			$zresults = array('serror' => $e->getMessage());
		}
		return $zresults;
	}

	public function updateFeedbackStatus($zfeedbackid, $zstatus) {
		/* set feedback status */
		global $wtwhandlers;
		$zresults = array();
		try {
			switch ($zstatus) {
				case "Open":
					$wtwhandlers->query("
						update ".wtw_tableprefix."feedback
						set viewdate=now()
						where feedbackid='".$zfeedbackid."';");
					break;
				case "Close":
					$wtwhandlers->query("
						update ".wtw_tableprefix."feedback
						set archivedate=now()
						where feedbackid='".$zfeedbackid."'
							and archivedate is null;");
					break;
				case "Reopen":
					$wtwhandlers->query("
						update ".wtw_tableprefix."feedback
						set archivedate=null
						where feedbackid='".$zfeedbackid."';");
					break;
			}

		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwtools.php-getFeedback=".$e->getMessage());
			$zresults = array('serror' => $e->getMessage());
		}
		return $zresults;
	}
	
	public function getErrorLog($zfilter) {
		/* get Error Log using filter */
		global $wtwhandlers;
		$zresults = array();
		try {
			switch ($zfilter) {
				case "All Errors":
					$zresults = $wtwhandlers->query("
						select * from ".wtw_tableprefix."errorlog
							order by logdate desc, errorid desc;");
					break;
				case "Most Recent Errors":
					$zresults = $wtwhandlers->query("
						select * from ".wtw_tableprefix."errorlog
							where archivedate is null
							order by logdate desc, errorid desc
							limit 25;");
					break;
				default: /* "Active Errors" */
					$zresults = $wtwhandlers->query("
						select * from ".wtw_tableprefix."errorlog
							where archivedate is null
							order by logdate desc, errorid desc;");
					break;
			}

		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwtools.php-getErrorLog=".$e->getMessage());
			$zresults = array('serror' => $e->getMessage());
		}
		return $zresults;
	}

	public function updateErrorLogStatus($zerrorid, $zstatus) {
		/* set errorlog status */
		global $wtwhandlers;
		$zresults = array(
			'serror'=> ''
		);
		try {
			if ($wtwhandlers->isUserInRole("admin")) {
				switch ($zstatus) {
					case "Archive":
						$wtwhandlers->query("
							update ".wtw_tableprefix."errorlog
							set archivedate=now()
							where errorid='".$zerrorid."'
								and archivedate is null;");
						break;
					case "Restore":
						$wtwhandlers->query("
							update ".wtw_tableprefix."errorlog
							set archivedate=null
							where errorid='".$zerrorid."';");
						break;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwtools.php-updateErrorLogStatus=".$e->getMessage());
			$zresults = array('serror' => $e->getMessage());
		}
		return $zresults;
	}

	public function deleteArchivedErrorLog() {
		/* delete archived errorlog records */
		global $wtwhandlers;
		$zresults = array(
			'serror'=> ''
		);
		try {
			if ($wtwhandlers->isUserInRole("admin")) {
				$wtwhandlers->query("
					delete from ".wtw_tableprefix."errorlog
					where not archivedate is null;");
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwtools.php-deleteArchivedErrorLog=".$e->getMessage());
			$zresults = array('serror' => $e->getMessage());
		}
		return $zresults;
	}
	
	public function __($zlabel) {
		/* Language translation based on language file */
		global $wtwhandlers;
		return $wtwhandlers->__($zlabel);
	}	
}

	function wtwtools() {
		return wtwtools::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwtools'] = wtwtools();
?>
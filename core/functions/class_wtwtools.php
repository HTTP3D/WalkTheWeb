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

	public function saveContentRating($zwebid, $zrating, $zratingvalue, $zcontentwarning, $zparentalcontrols) {
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>''
		);
		try {
			if ($wtwhandlers->hasPermission(array("admin","developer","architect","graphics artist"))) {
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

	public function saveServerSettings($zdbserver, $zdbname, $zdbusername, $zdbpassword, $zcontentpath, $zdefaultdomain, $zdefaultsitename, $zgoogleanalytics, $zadminemail, $zadminname, $zumask, $zchmod, $zftpuser, $zftppassword, $zftpbase) {
		global $wtwhandlers;
		$zresponse = array('serror'=>'');
		try {
			$wtwhandlers->getSessionUserID();
			if ($wtwhandlers->hasPermission(array("admin"))) {
				$this->updateConfigSetting('wtw_dbserver', $zdbserver);
				$this->updateConfigSetting('wtw_dbname', $zdbname);
				$this->updateConfigSetting('wtw_dbusername', $zdbusername);
				$this->updateConfigSetting('wtw_dbpassword', $zdbpassword);
				$this->updateConfigSetting('wtw_contentpath', $zcontentpath);
				$this->updateConfigSetting('wtw_defaultdomain', $zdefaultdomain);
				$this->updateConfigSetting('wtw_defaultsitename', $zdefaultsitename);
				$this->updateConfigSetting('wtw_googleanalytics', $zgoogleanalytics);
				$this->updateConfigSetting('wtw_adminemail', $zadminemail);
				$this->updateConfigSetting('wtw_adminname', $zadminname);
				$this->updateConfigSetting('wtw_umask', $zumask);
				$this->updateConfigSetting('wtw_chmod', $zchmod);
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
					if (strpos($line, $zsetting) !== false) {
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


}

	function wtwtools() {
		return wtwtools::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwtools'] = wtwtools();
?>
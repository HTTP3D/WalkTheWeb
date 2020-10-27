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
	
	public function sendAdminEmail($zsendto, $zsubject, $zmessage) {
		/* send Admin email */
		/* $zsendto is a single email string */
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
						  ->setPassword(base64_decode($zresults["smtppassword"]));
					} else {
						$ztransport = (new Swift_SmtpTransport($zresults["smtphost"], $zresults["smtpport"], $zresults["smtpencryption"]))
						  ->setUsername($zresults["smtpusername"])
						  ->setPassword(base64_decode($zresults["smtppassword"]));
					}
					
					$zmailer = new Swift_Mailer($ztransport);
					
					$message = new Swift_Message();
					
					$zemail = (new Swift_Message($zsubject))
					  ->setFrom(array($zfromemail => $zfromemailname))
					  ->setTo(array($zsendto))
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
						  ->setPassword(base64_decode($zresults["smtppassword"]));
					} else {
						$ztransport = (new Swift_SmtpTransport($zresults["smtphost"], $zresults["smtpport"], $zresults["smtpencryption"]))
						  ->setUsername($zresults["smtpusername"])
						  ->setPassword(base64_decode($zresults["smtppassword"]));
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
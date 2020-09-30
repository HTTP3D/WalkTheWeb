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
		global $wtwhandlers;
		$zresponse = array();
		try {
			$zresults = $wtwhandlers->getSettings("smtphost, smtpport, smtpusername, smtppassword");

			require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/egulias/email-validator/src/Exception/InvalidEmail.php');

			require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/egulias/email-validator/src/Validation/EmailValidation.php');
			
			require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/egulias/email-validator/src/Warning/Warning.php');
			
			require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/doctrine/lexer/lib/Doctrine/Common/Lexer/AbstractLexer.php');
			
			require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/egulias/email-validator/src/EmailLexer.php');
			
			require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/egulias/email-validator/src/EmailValidator.php');
			
			require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/swiftmailer/lib/classes/Swift/Mime/EncodingObserver.php');

			require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/swiftmailer/lib/classes/Swift/Mime/CharsetObserver.php');

			require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/swiftmailer/lib/classes/Swift/Mime/SimpleMimeEntity.php');

			require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/swiftmailer/lib/classes/Swift/Mime/MimePart.php');

			require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/swiftmailer/lib/classes/Swift/Mime/SimpleMessage.php');

			require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/swiftmailer/lib/classes/Swift/Message.php');

			require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/swiftmailer/lib/swift_required.php');


			$ztransport = (new Swift_SmtpTransport($zresults["smtphost"], $zresults["smtpport"]))
			  ->setUsername($zresults["smtpusername"])
			  ->setPassword($zresults["smtppassword"]);


			$zmailer = new Swift_Mailer($ztransport);
			
/*			$message = new Swift_Message();

			
			$zemail = (new Swift_Message('Test Subject'))
			  ->setFrom(array('walktheweb@walktheweb.com' => 'WalkTheWeb'))
			  ->setTo(array('adishno@gmail.com' => 'Aaron Dishno'))
			  ->setBody('This is a test message');
			
			$result = $zmailer->send($zemail);
	*/		
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwtools.php-sendAdminEmail=".$e->getMessage());
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
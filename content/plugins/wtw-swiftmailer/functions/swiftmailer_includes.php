<?php
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

	require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/egulias/email-validator/src/Warning/LocalTooLong.php');

	require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/egulias/email-validator/src/Parser/Parser.php');

	require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/egulias/email-validator/src/Parser/LocalPart.php');

	require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/egulias/email-validator/src/Parser/DomainPart.php');

	require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/egulias/email-validator/src/EmailParser.php');

	require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/egulias/email-validator/src/Validation/RFCValidation.php');

	require_once($wtwhandlers->contentpath.'/plugins/wtw-swiftmailer/vendor/swiftmailer/lib/swift_required.php');
?>
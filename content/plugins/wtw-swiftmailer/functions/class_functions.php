<?php
class wtwswiftmailer_functions {
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {
		global $wtwplugins;
		try {
			$this->initClass();
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-swiftmailer:functions-class_functions.php-construct=".$e->getMessage());
		}
	}	
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	public function initClass() {
		global $wtwplugins;
		try {
			
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-swiftmailer:functions-class_functions.php-initClass=".$e->getMessage());
		}
	}
	
	public function saveSample($zfieldid, $zfieldname) {
		global $wtwplugins;
		$zsuccess = false;
		try {
			$wtwplugins->query("
				update ".WTW_SwiftMailer_PREFIX."tablename
				set fieldname='".$zfieldname."'
				where fieldid='".$zfieldid."';");
			$zsuccess = true;
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-swiftmailer:functions-class_functions.php-saveSample=".$e->getMessage());
		}
		return $zsuccess;
	}

}

	function wtwswiftmailer_functions() {
		return wtwswiftmailer_functions::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwswiftmailer_functions'] = wtwswiftmailer_functions();

?>
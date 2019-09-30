<?php
class wtwuser {
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {

	}	
	
	public $userid = "";
	public $username = "";
	public $userip = "";
	public $email = "";
	public $userimageurl = "";
	public $uploadpathid = "";
	public $contentpath = "";
	public $useraccess = "";

	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
}

	function wtwuser() {
		return wtwuser::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwuser'] = wtwuser();
?>
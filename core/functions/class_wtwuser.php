<?php
class wtwuser {
	/* wtwuser class for quick information about the current WalkTheWeb user */
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {

	}	
	
	/* declare public $wtwuser variables */
	public $userid = "";
	public $userip = "";
	public $email = "";
	public $displayname = "";
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
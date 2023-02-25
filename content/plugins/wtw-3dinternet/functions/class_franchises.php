<?php
class wtw_3dinternet_franchises {
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
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_franchises.php-construct=".$e->getMessage());
		}
	}	
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	public function defineConstants() {
		global $wtwplugins;
		try {
			if (!defined('WTW_3DINTERNET_FILE')) {
				$this->define('WTW_3DINTERNET_PREFIX', wtw_tableprefix."3dinternet_");
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_franchises.php-defineConstants=".$e->getMessage());
		}
	}

	public function initClass() {
		global $wtwplugins;
		try {
			
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_franchises.php-initClass=".$e->getMessage());
		}
	}
	
	public function updateFranchiseID($zfranchiseid, $zwebaliasid) {
		global $wtwplugins;
		$zresponse = array(
			'serror'=>''
		);
		try {
			if ($wtwplugins->hasValue($zfranchiseid) && $wtwplugins->hasValue($zwebaliasid)) {
				$wtwplugins->query("
				update ".wtw_tableprefix."webaliases
				set franchiseid='".$zfranchiseid."'
				where webaliasid='".$zwebaliasid."'
				limit 1;");
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_franchises.php-updateFranchiseID=".$e->getMessage());
			$zresponse = array(
				'serror'=>addslashes($e->getMessage())
			);
		}
		return $zresponse;
	}

	
}

	function wtw_3dinternet_franchises() {
		return wtw_3dinternet_franchises::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtw_3dinternet_franchises'] = wtw_3dinternet_franchises();

?>
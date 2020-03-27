<?php
class devidplugintemplate_functions {
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
			$wtwplugins->serror("plugins:devid-plugintemplate:functions-class_functions.php-construct=".$e->getMessage());
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
			$wtwplugins->serror("plugins:devid-plugintemplate:functions-class_functions.php-initClass=".$e->getMessage());
		}
	}
	
	public function saveSample($zfieldid, $zfieldname) {
		global $wtwplugins;
		$zsuccess = false;
		try {
			$wtwplugins->query("
				update ".DEVID_PLUGINTEMPLATE_PREFIX."tablename
				set fieldname='".$zfieldname."'
				where fieldid='".$zfieldid."';");
			$zsuccess = true;
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:devid-plugintemplate:functions-class_functions.php-saveSample=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function getSample($zfieldid) {
		global $wtwplugins;
		$zresponse = array();
		try {
			$zresponse = $wtwplugins->query("
				select * 
				from ".DEVID_PLUGINTEMPLATE_PREFIX."tablename
				where fieldid='".$zfieldid."';");
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:devid-plugintemplate:functions-class_functions.php-getSample=".$e->getMessage());
		}
		return $zresponse;
	}
}

	function devidplugintemplate_functions() {
		return devidplugintemplate_functions::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['devidplugintemplate_functions'] = devidplugintemplate_functions();

?>
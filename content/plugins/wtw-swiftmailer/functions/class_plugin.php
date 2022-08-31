<?php
class wtwswiftmailer {
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
			$this->defineConstants();
			$this->initClass();
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-swiftmailer:functions-class_plugin.php-construct=".$e->getMessage());
		}
	}	
	
	public $version = "1.0.1";
	public $dbversion = "1.0.0";
	public $versiondate = "2022-8-31";
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	private function define($name, $value) {
		global $wtwplugins;
		try {
			if (!defined($name)) {
				define($name, $value);
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-swiftmailer:functions-class_plugin.php-define=".$e->getMessage());
		}
	}

	public function defineConstants() {
		global $wtwplugins;
		try {
			$this->define('WTW_SwiftMailer_PLUGIN', basename(strtolower(WTW_SwiftMailer_FILE),".php"));
			$this->define('WTW_SwiftMailer_PATH', dirname(WTW_SwiftMailer_FILE));
			$this->define('WTW_SwiftMailer_URL', $wtwplugins->contenturl.'/plugins/' . WTW_SwiftMailer_PLUGIN);
			$this->define('WTW_SwiftMailer_PREFIX', str_replace("wtw_wtw-","wtw_",wtw_tableprefix . WTW_SwiftMailer_PLUGIN)."_");
			$this->define('WTW_SwiftMailer_VERSION', $this->version);
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-swiftmailer:functions-class_plugin.php-defineConstants=".$e->getMessage());
		}
	}

	public function initClass() {
		global $wtwplugins;
		try {
			$this->initAdminOnlyHooks();
			$this->initHooks();
			$this->checkTablesForUpdates();
			//require_once(WTW_SwiftMailer_PATH.'/vendor/swiftmailer/lib/swift_required.php');
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-swiftmailer:functions-class_plugin.php-initClass=".$e->getMessage());
		}
	}
	
	public function initAdminOnlyHooks() {
		global $wtwplugins;
		try {
			/* Admin only hooks */
			if ($wtwplugins->pagename == "admin.php") {
				/* add admin menu items */
				/* wtwplugins class -> addAdminMenuItem function (menu item id, menu text, level 1 sort, level 1 id, level 2 sort, level 2 id, level 1 icon, allowed roles array - null for all, onclick JavaScript function) */
				
				/* admin full page settings forms */
				/* wtwplugins class -> addFullPageForm function (form id, allowed roles array - null for all, form html string) */
				
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-swiftmailer:functions-class_plugin.php-initAdminOnlyHooks=".$e->getMessage());
		}
	}	
	
	public function initHooks() {
		global $wtwplugins;
		try {
			/* Browse and Admin hooks  (admin inherrits all browse functions) */

			/* javascripts */
			/* wtwplugins class -> addScript function (script id, '1' for admin only, script browse url) */
			$wtwplugins->addScript('wtw-swiftmailer-script', null, WTW_SwiftMailer_URL . "/scripts/class_main.js");
			
			/* hook plugin script functions into existing wtw functions */
			/* $wtwplugins->addScriptFunction('hookname', 'function(parameters);'); */
			
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-swiftmailer:functions-class_plugin.php.php-initHooks=".$e->getMessage());
		}
	}	
	
	public function checkTablesForUpdates() {
		/* Table definitions for plugin - used for new installs and updates */
		global $wtwplugins;
		try {
			/* to implement a table change or addition make the changes below */
			/* then update the $this->dbversion variable at the top of this file */
			/* deltaCreateTable will add, alter, or remove fields or add the table if it doesnt exist */
			/* check core/functions/class_wtwdb.php deltaCreateTable function for full support */
			if ($wtwplugins->pagename == "admin.php") {
				$dbversion = $wtwplugins->getSetting(WTW_SwiftMailer_PREFIX."dbversion","1.0.0");
				if ($dbversion != $this->dbversion) {
/*					$wtwplugins->deltaCreateTable("
						CREATE TABLE `".WTW_SwiftMailer_PREFIX."tablename` (
						  `fieldid` varchar(16) NOT NULL,
						  `fieldname` varchar(255) DEFAULT '',
						  `protectedname` varchar(255) DEFAULT '',
						  `fieldurl` varchar(255) DEFAULT '',
						  `createdate` datetime DEFAULT NULL,
						  `createuserid` varchar(16) DEFAULT '',
						  `updatedate` datetime DEFAULT NULL,
						  `updateuserid` varchar(16) DEFAULT '',
						  `deleteddate` datetime DEFAULT NULL,
						  `deleteduserid` varchar(16) DEFAULT '',
						  `deleted` int(11) DEFAULT '0',
						  PRIMARY KEY (`fieldid`),
						  UNIQUE KEY `".WTW_SwiftMailer_PREFIX."fieldid_UNIQUE` (`fieldid`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;
					"); */

					$wtwplugins->saveSetting(WTW_SwiftMailer_PREFIX."dbversion", $this->dbversion);
				}
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-swiftmailer:functions-class_plugin.php-checkTablesForUpdates=".$e->getMessage());
		}
	}

}

	function wtwswiftmailer() {
		return wtwswiftmailer::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwswiftmailer'] = wtwswiftmailer();

?>
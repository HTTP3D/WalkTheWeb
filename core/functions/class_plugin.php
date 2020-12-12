<?php
class wtwavatars {
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
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-construct=".$e->getMessage());
		}
	}	
	
	public $version = "1.0.0";

	public $dbversion = "1.0.0";
	
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
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-define=".$e->getMessage());
		}
	}

	public function defineConstants() {
		global $wtwplugins;
		try {
			$this->define('WTW_AVATARS_PLUGIN', basename(strtolower(WTW_AVATARS_FILE),".php"));
			$this->define('WTW_AVATARS_PATH', dirname(WTW_AVATARS_FILE));
			$this->define('WTW_AVATARS_URL', $wtwplugins->contenturl.'/plugins/' . WTW_AVATARS_PLUGIN);
			$this->define('WTW_AVATARS_PREFIX', str_replace("wtw_wtw-","wtw_",wtw_tableprefix . WTW_AVATARS_PLUGIN)."_");
			$this->define('WTW_AVATARS_VERSION', $this->version);
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-defineConstants=".$e->getMessage());
		}
	}

	public function initClass() {
		global $wtwplugins;
		try {
			$this->initAdminOnlyHooks();
			$this->initHooks();
			$this->checkTablesForUpdates();
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-initClass=".$e->getMessage());
		}
	}
	
	public function initAdminOnlyHooks() {
		global $wtwplugins;
		try {
			/* Admin only hooks */
			if ($wtwplugins->pagename == "admin.php") {
				/* add admin menu items */
				/* wtwplugins class -> addAdminMenuItem function (menu item id, menu text, level 1 sort, level 1 id, level 2 sort, level 2 id, level 1 icon, allowed roles array - null for all, onclick JavaScript function) */
				/* $wtwplugins->addAdminMenuItem('wtw_adminpaintball', '3D Stores', 95, 'wtw_paintball', 0, '', wtwavatars_URL.'/assets/images/menustore.png', array('admin','developer','architect'), null); */
				/* $wtwplugins->addAdminMenuItem('wtw_adminliststores', 'List Stores', 95, 'wtw_paintball', 1, 'wtw_liststores', '', array('admin','developer','architect'), "WTW.openFullPageForm('fullpage','List Stores','wtw_liststorespage');wtwavatars.getStores();"); */
				
				/* admin full page settings forms */
				/* wtwplugins class -> addFullPageForm function (form id, allowed roles array - null for all, form html string) */
				/* $wtwplugins->addFullPageForm('wtw_liststorespage', array('admin','developer','architect'), $this->listStoresPage()); */
				
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-initAdminOnlyHooks=".$e->getMessage());
		}
	}	
	
	public function initHooks() {
		global $wtwplugins;
		try {
			/* Browse and Admin hooks  (admin inherrits all browse functions) */

			/* javascripts */
			/* wtwplugins class -> addScript function (script id, '1' for admin only, script browse url) */
			$wtwplugins->addScript('wtw-avatars-script', null, WTW_AVATARS_URL . "/scripts/class_main.js");
			/* $wtwplugins->addScript('wtw-avatars-creatorscript', null, WTW_AVATARS_URL . "/scripts/wtwavatars_designer.js"); */
			/* $wtwplugins->addScript('wtw-avatars-moldsscript', null, WTW_AVATARS_URL . "/scripts/custom_molds.js"); */
			/* $wtwplugins->addScript('wtw-avatars-actionzonesscript', null, WTW_AVATARS_URL . "/scripts/custom_actionzones.js"); */
			/* $wtwplugins->addScript('wtw-avatars-coveringsscript', null, WTW_AVATARS_URL . "/scripts/custom_coverings.js"); */
			
			/* hook plugin script functions into existing wtw functions */
			/* $wtwplugins->addScriptFunction('hookname', 'function(parameters);'); */
			/* examples: */
			/* $wtwplugins->addScriptFunction("onclick", "wtwavatars.onClick(pickedname);"); */
			/* $wtwplugins->addScriptFunction("setnewactionzonedefaults", "wtwavatars.setNewActionZoneDefaults(actionzonetype);"); */
			/* $wtwplugins->addScriptFunction("setactionzoneformfields", "wtwavatars.setNewActionZoneFormFields(actionzonetype);"); */
			/* $wtwplugins->addScriptFunction("checkactionzone", "wtwavatars.checkActionZone(zactionzonename, zactionzoneind, zmeinzone, zothersinzone);"); */
			/* $wtwplugins->addScriptFunction("setavatarmovement", "wtwavatars.setAvatarMovement(zavatar, zkey, zweight);"); */
			/* $wtwplugins->addScriptFunction("checkhovers", "wtwavatars.checkHovers(moldname, shape);"); */
			/* $wtwplugins->addScriptFunction("resethovers", "wtwavatars.resetHovers(moldname, shape);"); */
			/* $wtwplugins->addScriptFunction("disposeclean", "wtwavatars.disposeClean(moldname);"); */
			
			
			/* Custom Molds (meshes) */
			/* The following create the list of new molds added by this plugin and assign the script to create the mold */
			/* $wtwplugins->addMoldDef("My Custom Mold - NAME FOR THE LIST", "webmold or mold - LIST", "wtwavatars.functionname(passed, values);"); */
			/* $wtwplugins->addMoldDef("My Custom Mold", "webmold", "wtwavatars.addMoldMyCustomMold(moldname, molddef, lenx, leny, lenz);"); */
			/* Set the custom mold defaults and show-hide form fields as needed */
			/* $wtwplugins->addScriptFunction("setnewmolddefaults", "wtwavatars.setNewMoldDefaults(shape, positionX, positionY, positionZ, rotationY);"); */
			/* $wtwplugins->addScriptFunction("setmoldformfields", "wtwavatars.setMoldFormFields(shape);"); */

			/* Custom action zones */
			/* The following create the list of new action zones added by this plugin and assign the script to create the action zone */
			/* $wtwplugins->addActionZoneDef("My Custom Zone", "wtwavatars.addActionZoneMyCustomZone(actionzonename, actionzoneind, actionzonedef);", "0"); */
			/* Set the custom action zone defaults and show-hide form fields as needed */
			/* $wtwplugins->addScriptFunction("setnewactionzonedefaults", "wtwavatars.setNewActionZoneDefaults(actionzonetype);"); */
			/* $wtwplugins->addScriptFunction("setactionzoneformfields", "wtwavatars.setActionZoneFormFields(actionzonetype);"); */
			
			/* Custom coverings (materials) */
			/* The following create the list of new coverings added by this plugin and assign the script to create the covering */
			/* $wtwplugins->addCoveringDef("My Custom Covering", "wtwavatars.addCoveringMyCustomCovering(moldname, molddef, lenx, leny, lenz, special1, special2);"); */
			/* Set the custom covering defaults and show-hide mold form fields as needed */
			/* $wtwplugins->addScriptFunction("setcoveringformfields", "wtwavatars.setCoveringFormFields(coveringname);"); */
			
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php.php-initHooks=".$e->getMessage());
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
				$dbversion = $wtwplugins->getSetting(WTW_AVATARS_PREFIX."dbversion");
				if ($dbversion != $this->dbversion) {
/*					$wtwplugins->deltaCreateTable("
						CREATE TABLE `".WTW_AVATARS_PREFIX."tablename` (
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
						  UNIQUE KEY `".WTW_AVATARS_PREFIX."fieldid_UNIQUE` (`fieldid`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;
					"); */

					$wtwplugins->saveSetting(WTW_AVATARS_PREFIX."dbversion", $this->dbversion);
				}
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-checkTablesForUpdates=".$e->getMessage());
		}
	}

}

	function wtwavatars() {
		return wtwavatars::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwavatars'] = wtwavatars();

?>
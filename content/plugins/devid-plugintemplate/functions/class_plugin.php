<?php
class devidplugintemplate {
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
			$wtwplugins->serror("plugins:devid-plugintemplate:functions-class_plugin.php-construct=".$e->getMessage());
		}
	}	
	
	public $version = "1.0.0";
	public $dbversion = "1.0.0";
	public $versiondate = "2020-8-31";
	
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
			$wtwplugins->serror("plugins:devid-plugintemplate:functions-class_plugin.php-define=".$e->getMessage());
		}
	}

	public function defineConstants() {
		global $wtwplugins;
		try {
			$this->define('DEVID_PLUGINTEMPLATE_PLUGIN', basename(strtolower(DEVID_PLUGINTEMPLATE_FILE),".php"));
			$this->define('DEVID_PLUGINTEMPLATE_PATH', dirname(DEVID_PLUGINTEMPLATE_FILE));
			$this->define('DEVID_PLUGINTEMPLATE_URL', $wtwplugins->contenturl.'/plugins/' . DEVID_PLUGINTEMPLATE_PLUGIN);
			$this->define('DEVID_PLUGINTEMPLATE_PREFIX', str_replace("wtw_wtw-","wtw_",wtw_tableprefix . DEVID_PLUGINTEMPLATE_PLUGIN)."_");
			$this->define('DEVID_PLUGINTEMPLATE_VERSION', $this->version);
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:devid-plugintemplate:functions-class_plugin.php-defineConstants=".$e->getMessage());
		}
	}

	public function initClass() {
		global $wtwplugins;
		try {
			$this->initAdminOnlyHooks();
			$this->initHooks();
			$this->checkTablesForUpdates();
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:devid-plugintemplate:functions-class_plugin.php-initClass=".$e->getMessage());
		}
	}
	
	public function initAdminOnlyHooks() {
		global $wtwplugins;
		try {
			/* Admin only hooks */
			if ($wtwplugins->pagename == "admin.php") {
				/* add admin menu items */
				/* wtwplugins class -> addAdminMenuItem function (menu item id, menu text, level 1 sort, level 1 id, level 2 sort, level 2 id, level 1 icon, allowed roles array - null for all, onclick JavaScript function) */
				/* $wtwplugins->addAdminMenuItem('wtw_adminmenuitem', 'Main Menu Item', 95, 'wtw_adminmenuitem', 0, '', devidplugintemplate_URL.'/assets/images/menustore.png', array('admin','developer','architect','host'), null); */
				/* $wtwplugins->addAdminMenuItem('wtw_adminmymenuoption', 'My Menu Option', 95, 'wtw_adminmenuitem', 1, 'wtw_adminmymenuoption', '', array('admin','developer','architect','host'), "console.log('execute menu option');"); */
				
				/* admin full page settings forms */
				/* wtwplugins class -> addFullPageForm function (form id, allowed roles array - null for all, form html string) */
				/* $wtwplugins->addFullPageForm('wtw_mypage', array('admin','developer','architect','host'), $this->myPage()); */
				
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:devid-plugintemplate:functions-class_plugin.php-initAdminOnlyHooks=".$e->getMessage());
		}
	}	
	
	public function initHooks() {
		global $wtwplugins;
		try {
			/* Browse and Admin hooks  (admin inherrits all browse functions) */

			/* javascripts */
			/* wtwplugins class -> addScript function (script id, '1' for admin only, script browse url) */
			$wtwplugins->addScript('devid-plugintemplate-script', null, DEVID_PLUGINTEMPLATE_URL . "/scripts/class_main.js");
			$wtwplugins->addScript('devid-plugintemplate-moldsscript', null, DEVID_PLUGINTEMPLATE_URL . "/scripts/custom_molds.js");
			$wtwplugins->addScript('devid-plugintemplate-actionzonesscript', null, DEVID_PLUGINTEMPLATE_URL . "/scripts/custom_actionzones.js");
			$wtwplugins->addScript('devid-plugintemplate-coveringsscript', null, DEVID_PLUGINTEMPLATE_URL . "/scripts/custom_coverings.js");
			
			/* hook plugin script functions into existing wtw functions */
			/* $wtwplugins->addScriptFunction('hookname', 'function(parameters);'); */
			/* examples: */
			/* $wtwplugins->addScriptFunction("onclick", "devidplugintemplate.onClick(zpickedname);"); */
			/* $wtwplugins->addScriptFunction("setnewactionzonedefaults", "devidplugintemplate.setNewActionZoneDefaults(zactionzonetype);"); */
			/* $wtwplugins->addScriptFunction("setactionzoneformfields", "devidplugintemplate.setNewActionZoneFormFields(zactionzonetype);"); */
			/* $wtwplugins->addScriptFunction("checkactionperzone", "devidplugintemplate.checkActionZone(zactionzonename, zactionzoneind, zmeinzone, zothersinzone);"); */
			/* $wtwplugins->addScriptFunction("setavatarmovement", "devidplugintemplate.setAvatarMovement(zavatar, zkey, zweight);"); */
			/* $wtwplugins->addScriptFunction("checkhovers", "devidplugintemplate.checkHovers(zmoldname, zshape);"); */
			/* $wtwplugins->addScriptFunction("resethovers", "devidplugintemplate.resetHovers(zmoldname, zshape);"); */
			/* $wtwplugins->addScriptFunction("disposeclean", "devidplugintemplate.disposeClean(zmoldname);"); */
			
			
			/* Custom Molds (meshes) */
			/* The following create the list of new molds added by this plugin and assign the script to create the mold */
			/* $wtwplugins->addMoldDef("My Custom Mold - NAME FOR THE LIST", "webmold or mold - LIST", "devidplugintemplate.functionname(passed, values);"); */
			$wtwplugins->addMoldDef("My Custom Mold", "webmold", "devidplugintemplate.addMoldMyCustomMold(zmoldname, zmolddef, zlenx, zleny, zlenz);");
			/* Set the custom mold defaults and show-hide form fields as needed */
			$wtwplugins->addScriptFunction("setnewmolddefaults", "devidplugintemplate.setNewMoldDefaults(zshape, zpositionx, zpositiony, zpositionz, zrotationy);");
			$wtwplugins->addScriptFunction("setmoldformfields", "devidplugintemplate.setMoldFormFields(zshape);");

			/* Custom action zones */
			/* The following create the list of new action zones added by this plugin and assign the script to create the action zone */
			$wtwplugins->addActionZoneDef("My Custom Zone", "devidplugintemplate.addActionZoneMyCustomZone(zactionzonename, zactionzoneind, zactionzonedef);", "0");
			/* Set the custom action zone defaults and show-hide form fields as needed */
			$wtwplugins->addScriptFunction("setnewactionzonedefaults", "devidplugintemplate.setNewActionZoneDefaults(zactionzonetype);");
			$wtwplugins->addScriptFunction("setactionzoneformfields", "devidplugintemplate.setActionZoneFormFields(zactionzonetype);");
			
			/* Custom coverings (materials) */
			/* The following create the list of new coverings added by this plugin and assign the script to create the covering */
//			$wtwplugins->addCoveringDef("My Custom Covering", "devidplugintemplate.addCoveringMyCustomCovering(zmoldname, zmolddef, zlenx, zleny, zlenz, zspecial1, zspecial2);");
			/* Set the custom covering defaults and show-hide mold form fields as needed */
			$wtwplugins->addScriptFunction("setcoveringformfields", "devidplugintemplate.setCoveringFormFields(zcoveringname);");
			
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:devid-plugintemplate:functions-class_plugin.php.php-initHooks=".$e->getMessage());
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
				$dbversion = $wtwplugins->getSetting(DEVID_PLUGINTEMPLATE_PREFIX."dbversion","1.0.0");
				if ($dbversion != $this->dbversion) {
/*					$wtwplugins->deltaCreateTable("
						CREATE TABLE `".DEVID_PLUGINTEMPLATE_PREFIX."tablename` (
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
						  UNIQUE KEY `".DEVID_PLUGINTEMPLATE_PREFIX."fieldid_UNIQUE` (`fieldid`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;
					"); */

					$wtwplugins->saveSetting(DEVID_PLUGINTEMPLATE_PREFIX."dbversion", $this->dbversion);
				}
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:devid-plugintemplate:functions-class_plugin.php-checkTablesForUpdates=".$e->getMessage());
		}
	}

}

	function devidplugintemplate() {
		return devidplugintemplate::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['devidplugintemplate'] = devidplugintemplate();

?>
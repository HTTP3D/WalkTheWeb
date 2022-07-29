<?php
class wtwcoins {
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
			$wtwplugins->serror("plugins:wtw-coins:functions-class_plugin.php-construct=".$e->getMessage());
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
			$wtwplugins->serror("plugins:wtw-coins:functions-class_plugin.php-define=".$e->getMessage());
		}
	}

	public function defineConstants() {
		global $wtwplugins;
		try {
			$this->define('WTW_COINS_PLUGIN', basename(strtolower(WTW_COINS_FILE),".php"));
			$this->define('WTW_COINS_PATH', dirname(WTW_COINS_FILE));
			$this->define('WTW_COINS_URL', $wtwplugins->contenturl.'/plugins/' . WTW_COINS_PLUGIN);
			$this->define('WTW_COINS_PREFIX', str_replace("wtw_wtw-","wtw_",wtw_tableprefix . WTW_COINS_PLUGIN)."_");
			$this->define('WTW_COINS_VERSION', $this->version);
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-coins:functions-class_plugin.php-defineConstants=".$e->getMessage());
		}
	}

	public function initClass() {
		global $wtwplugins;
		try {
			$this->initAdminOnlyHooks();
			$this->initHooks();
			$this->checkTablesForUpdates();
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-coins:functions-class_plugin.php-initClass=".$e->getMessage());
		}
	}
	
	public function initAdminOnlyHooks() {
		global $wtwplugins;
		try {
			/* Admin only hooks */
			if ($wtwplugins->pagename == "admin.php") {
				$zupdateroles = array("admin","developer","architect","graphics artist");
				$zdeveloperroles = array("admin","developer");

				/* add admin menu items */
				/* wtwplugins class -> addAdminMenuItem function (menu item id, menu text, level 1 sort, level 1 id, level 2 sort, level 2 id, level 1 icon, allowed roles array - null for all, onclick JavaScript function) */


				/* add admin div section form */
				$wtwplugins->addAdminMenuForm('wtwcoins_editcoindiv', 'Coin Settings', $this->editCoinForm(), array('admin','developer','architect'));
				
				/* admin full page settings forms */
				/* wtwplugins class -> addFullPageForm function (form id, allowed roles array - null for all, form html string) */

				$wtwplugins->addAdminSubMenuItem('editcommunity', 'wtwcoins_adminCommunityMoldObjects', 'Add WTW Coin Objects', 120, array('admin','developer','architect'), "wtwcoins.openAdminCoinObjects();");
				
				$wtwplugins->addAdminSubMenuItem('editbuilding', 'wtwcoins_adminBuildingMoldObjects', 'Add WTW Coin Objects', 120, array('admin','developer','architect'), "wtwcoins.openAdminCoinObjects();");
				
				$wtwplugins->addAdminSubMenuItem('editthing', 'wtwcoins_adminThingMoldObjects', 'Add WTW Coin Objects', 120, array('admin','developer','architect'), "wtwcoins.openAdminCoinObjects();");
				
				$wtwplugins->addAdminMenuForm('wtwcoins_adminMoldObjectsDiv', 'Add WTW Coin Objects', $this->coinObjectsForm('community'), array('admin','developer','architect'));

			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-coins:functions-class_plugin.php-initAdminOnlyHooks=".$e->getMessage());
		}
	}	

	public function initHooks() {
		global $wtwplugins;
		try {
			/* Browse and Admin hooks  (admin inherrits all browse functions) */
			/* wtwplugins class -> addStylesheet function (stylesheet id, '1' for admin only, stylesheet url) */
			$wtwplugins->addStylesheet('wtw-coins-style-css', null, WTW_COINS_URL . "/styles/style.css");

			/* javascripts */
			/* wtwplugins class -> addScript function (script id, '1' for admin only, script browse url) */
			$wtwplugins->addScript('wtw-coins-script', null, WTW_COINS_URL . "/scripts/class_main.js");
			$wtwplugins->addScript('wtw-coins-moldsscript', null, WTW_COINS_URL . "/scripts/custom_molds.js");
			$wtwplugins->addScript('wtw-coins-actionzonesscript', null, WTW_COINS_URL . "/scripts/custom_actionzones.js");
			$wtwplugins->addScript('wtw-coins-coveringsscript', null, WTW_COINS_URL . "/scripts/custom_coverings.js");
			
			/* hook plugin script functions into existing wtw functions */
			/* $wtwplugins->addScriptFunction('hookname', 'function(parameters);'); */
			/* examples: */
			/* $wtwplugins->addScriptFunction("onclick", "wtwcoins.onClick(pickedname);"); */
			/* $wtwplugins->addScriptFunction("checkactionperzone", "wtwcoins.checkActionZone(zactionzonename, zactionzoneind, zmeinzone, zothersinzone);"); */
			/* $wtwplugins->addScriptFunction("checkhovers", "wtwcoins.checkHovers(zmoldname, zshape);"); */
			/* $wtwplugins->addScriptFunction("resethovers", "wtwcoins.resetHovers(zmoldname, zshape);"); */
			
			$wtwplugins->addScriptFunction("disposeclean", "wtwcoins.disposeClean(zmoldname);");
			
			
			/* Custom Molds (meshes) */
			/* The following create the list of new molds added by this plugin and assign the script to create the mold */
			/* $wtwplugins->addMoldDef("My Custom Mold - NAME FOR THE LIST", "webmold or mold - LIST", "wtwcoins.functionname(passed, values);"); */
			//$wtwplugins->addMoldDef("My Custom Mold", "webmold", "wtwcoins.addMoldMyCustomMold(zmoldname, zmolddef, zlenx, zleny, zlenz);");

			/* Set the custom mold defaults and show-hide form fields as needed */
			$wtwplugins->addScriptFunction("setnewmolddefaults", "wtwcoins.setNewMoldDefaults(zshape, zpositionx, zpositiony, zpositionz, zrotationy);");
			$wtwplugins->addScriptFunction("setmoldformfields", "wtwcoins.setMoldFormFields(zshape);");

			/* Custom action zones */
			/* The following create the list of new action zones added by this plugin and assign the script to create the action zone */
			$wtwplugins->addActionZoneDef("WTW Coin", "wtwcoins.addActionZoneCoin(zactionzonename, zactionzoneind, zactionzonedef);", "1");
			/* Set the custom action zone defaults and show-hide form fields as needed */
			//$wtwplugins->addScriptFunction("setnewactionzonedefaults", "wtwcoins.setNewActionZoneDefaults(zactionzonetype);");
			//$wtwplugins->addScriptFunction("setactionzoneformfields", "wtwcoins.setActionZoneFormFields(zactionzonetype);");
			
			$wtwplugins->addScriptFunction("mouseclickrightadmin", "wtwcoins.mouseClickRightAdmin(e, zpickedname);");
			$wtwplugins->addScriptFunction("checkactionperzone", "wtwcoins.checkActionZone(zactionzonename, zactionzoneind, zmeinzone, zothersinzone);");
			$wtwplugins->addScriptFunction("loadusersettings", "wtwcoins.loadUserSettings();"); 
			
			
			/* Custom coverings (materials) */
			/* The following create the list of new coverings added by this plugin and assign the script to create the covering */
			//$wtwplugins->addCoveringDef("My Custom Covering", "wtwcoins.addCoveringMyCustomCovering(zmoldname, zmolddef, zlenx, zleny, zlenz, zspecial1, zspecial2);");
			/* Set the custom covering defaults and show-hide mold form fields as needed */
			//$wtwplugins->addScriptFunction("setcoveringformfields", "wtwcoins.setCoveringFormFields(zcoveringname);");

			$wtwplugins->addSettingsMenuItem("wtw_wtwcoinsettings", "WTW Coin Settings", 60, "wtw_wtwcoinsettings", "/content/plugins/wtw-coins/assets/images/menuwtwcoin.png", null, "WTW.showSettingsMenu('wtw_wtwcoinsettingsform');");

			/* browse menu (bottom) settings Menu Forms */
			/* wtwplugins class-> addMenuForm function (form id, title text, form html string, allow roles array - null for all, cssclass) */
			$wtwplugins->addMenuForm("wtw_wtwcoinsettingsform", "WTW Coin Settings", $this->wtwCoinSettingsForm(), null, 'wtw-slideupmenuright');
			
			$wtwplugins->addMoldDef("WTW Coin Platform", "custom", "wtwcoins.addMoldPlatform('platform.babylon', zmoldname, zmolddef, zlenx, zleny, zlenz);");
			
			$wtwplugins->addMoldDef("WTW Coin Ramp Platform", "custom", "wtwcoins.addMoldPlatform('platformramp.babylon', zmoldname, zmolddef, zlenx, zleny, zlenz);");
			
			$wtwplugins->addMoldDef("WTW Coin Ramp Large Platform", "custom", "wtwcoins.addMoldPlatform('platform2ramp.babylon', zmoldname, zmolddef, zlenx, zleny, zlenz);");
			
			$wtwplugins->addMoldDef("WTW Coin Base", "custom", "wtwcoins.addMoldPlatform('platformbase.babylon', zmoldname, zmolddef, zlenx, zleny, zlenz);");
			
			$wtwplugins->addMoldDef("WTW Coin Base Double", "custom", "wtwcoins.addMoldPlatform('platformbase-double.babylon', zmoldname, zmolddef, zlenx, zleny, zlenz);");
			
			$wtwplugins->addMoldDef("WTW Coin Base Tripple", "custom", "wtwcoins.addMoldPlatform('platformbase-tripple.babylon', zmoldname, zmolddef, zlenx, zleny, zlenz);");
			
			$wtwplugins->addMoldDef("WTW Coin Base Quad", "custom", "wtwcoins.addMoldPlatform('platformbase-quad.babylon', zmoldname, zmolddef, zlenx, zleny, zlenz);");
			
			$wtwplugins->addMoldDef("WTW Coin Lift", "custom", "wtwcoins.addMoldPlatformLift('platformlift.babylon', zmoldname, zmolddef, zlenx, zleny, zlenz);");
			
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-coins:functions-class_plugin.php-initHooks=".$e->getMessage());
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
				$zdbversion = $wtwplugins->getSetting(WTW_COINS_PREFIX."dbversion");
				if ($zdbversion != $this->dbversion || empty($zdbversion) || !isset($zdbversion)) {
					$wtwplugins->deltaCreateTable("
						CREATE TABLE `".WTW_COINS_PREFIX."collected` (
						  `wtwcoinid` varchar(16) NOT NULL,
						  `userid` varchar(16) NOT NULL,
						  `webid` varchar(16) NOT NULL,
						  `actionzoneid` varchar(16) NOT NULL,
						  `createdate` datetime DEFAULT NULL,
						  `createuserid` varchar(16) DEFAULT '',
						  `updatedate` datetime DEFAULT NULL,
						  `updateuserid` varchar(16) DEFAULT '',
						  `deleteddate` datetime DEFAULT NULL,
						  `deleteduserid` varchar(16) DEFAULT '',
						  `deleted` int DEFAULT '0',
						  PRIMARY KEY (`wtwcoinid`),
						  UNIQUE KEY `".WTW_COINS_PREFIX."wtwcoinid_UNIQUE` (`wtwcoinid`),
						  KEY `".WTW_COINS_PREFIX."idx_usercoins` (`userid`,`webid`,`actionzoneid`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;
					");

					$wtwplugins->deltaCreateTable("
						CREATE TABLE `".WTW_COINS_PREFIX."totals` (
						  `cointotalid` varchar(16) NOT NULL,
						  `userid` varchar(16) NOT NULL,
						  `totalcoins` bigint NOT NULL DEFAULT '0',
						  `createdate` datetime DEFAULT NULL,
						  `createuserid` varchar(16) DEFAULT '',
						  `updatedate` datetime DEFAULT NULL,
						  `updateuserid` varchar(16) DEFAULT '',
						  `deleteddate` datetime DEFAULT NULL,
						  `deleteduserid` varchar(16) DEFAULT '',
						  `deleted` int DEFAULT '0',
						  PRIMARY KEY (`cointotalid`),
						  UNIQUE KEY `".WTW_COINS_PREFIX."cointotalid_UNIQUE` (`cointotalid`),
						  KEY `".WTW_COINS_PREFIX."idx_coins_totals` (`userid`,`totalcoins`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;
					");

					$wtwplugins->saveSetting(WTW_COINS_PREFIX."dbversion", $this->dbversion);
				}
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-coins:functions-class_plugin.php-checkTablesForUpdates=".$e->getMessage());
		}
	}

	public function coinObjectsForm() {
		/* admin store settings form */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<div id=\"wtwcoins_moldsbuttonlist\"></div><br />\r\n";
			$zformdata .= "<div id=\"wtwcoins_cancelcoinobject\" class=\"wtw-yellowbutton\" onclick=\"wtwcoins.closeAdminCoinObjects();\">Cancel</div><br /><br />\r\n\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-coins:functions-class_plugin.php-coinObjectsForm=".$e->getMessage());
		}
		return $zformdata;
	}
	
	public function wtwCoinSettingsForm() {
		/* form for wtw Coin settings on browse menu */
		$zformdata = "";
		try {
			$zformdata .= "<div id=\"wtw_coinsnote\" class=\"wtw-menunote\">WTW Coins are available to collect in some 3D Scenes. They can be used for in-game purchases and upgrades.<br /><br />";
			$zformdata .= "	Ghost WTW Coins: After you collect a coin, if you visit it again or refresh the browser, you have the option to see the WTW Coins placement as Ghost WTW Coins. Ghost WTW Coins have no value if collected but can help you show others a 3D Scene.</div><br />";
			
			$zformdata .= "<div class=\"wtw-onecol\" style=\"white-space:nowrap;text-align:center;\">Ghost WTW Coins</div><br />\r\n";
			$zformdata .= "<label class=\"wtw-switch\" style=\"white-space:nowrap;margin-left:50px;\"><input id=\"wtwcoins_showghostcoins\" type=\"checkbox\" onclick=\"wtwcoins.toggleWTWGhostCoins();\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtwcoins_showghostcoinstext\" class=\"wtw-disabledlabel\">Hidden</div><br /><br />\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-coins:functions-class_plugin.php-wtwCoinSettingsForm=".$e->getMessage());
		}
		return $zformdata;
	}
	
	public function editCoinForm() {
		/* admin coin settings form */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<h4>WTW Coin Position</h4>\r\n";
			$zformdata .= "<div class=\"wtw-onecol\" style=\"white-space:nowrap;\">Position Z (left,-right)<br /> \r\n";
			$zformdata .= "	<input type=\"text\" id=\"wtwcoins_tactionzonecoinz\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);wtwcoins.setNewCoin();\" />\r\n";
			$zformdata .= "	<input type=\"button\" id=\"wtwcoins_beditcoinzp4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"wtwcoins.changeNumberValue('wtwcoins_tactionzonecoinz', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />\r\n";
			$zformdata .= "	<input type=\"button\" id=\"wtwcoins_beditcoinzp3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"wtwcoins.changeNumberValue('wtwcoins_tactionzonecoinz', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />\r\n";
			$zformdata .= "	<input type=\"button\" id=\"wtwcoins_beditcoinzp2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"wtwcoins.changeNumberValue('wtwcoins_tactionzonecoinz', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />\r\n";
			$zformdata .= "	<input type=\"button\" id=\"wtwcoins_beditcoinzp1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"wtwcoins.changeNumberValue('wtwcoins_tactionzonecoinz', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r\n";
			$zformdata .= "</div><br />\r\n";
			$zformdata .= "<div class=\"wtw-onecol\">Position X (front,-back)<br />\r\n";
			$zformdata .= "	<input type=\"text\" id=\"wtwcoins_tactionzonecoinx\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);wtwcoins.setNewCoin();\" />\r\n";
			$zformdata .= "	<input type=\"button\" id=\"wtwcoins_beditcoinxp4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"wtwcoins.changeNumberValue('wtwcoins_tactionzonecoinx', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />\r\n";
			$zformdata .= "	<input type=\"button\" id=\"wtwcoins_beditcoinxp3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"wtwcoins.changeNumberValue('wtwcoins_tactionzonecoinx', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />\r\n";
			$zformdata .= "	<input type=\"button\" id=\"wtwcoins_beditcoinxp2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"wtwcoins.changeNumberValue('wtwcoins_tactionzonecoinx', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />\r\n";
			$zformdata .= "	<input type=\"button\" id=\"wtwcoins_beditcoinxp1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"wtwcoins.changeNumberValue('wtwcoins_tactionzonecoinx', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />\r\n";
			$zformdata .= "</div><br />\r\n";
			$zformdata .= "<div class=\"wtw-onecol\">Position Y (up,-down)<br />\r\n";
			$zformdata .= "	<input type=\"text\" id=\"wtwcoins_tactionzonecoiny\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);wtwcoins.setNewCoin();\" />\r\n";
			$zformdata .= "	<input type=\"button\" id=\"wtwcoins_beditcoinyp4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"wtwcoins.changeNumberValue('wtwcoins_tactionzonecoiny', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />\r\n";
			$zformdata .= "	<input type=\"button\" id=\"wtwcoins_beditcoinyp3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"wtwcoins.changeNumberValue('wtwcoins_tactionzonecoiny', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />\r\n";
			$zformdata .= "	<input type=\"button\" id=\"wtwcoins_beditcoinyp2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"wtwcoins.changeNumberValue('wtwcoins_tactionzonecoiny', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />\r\n";
			$zformdata .= "	<input type=\"button\" id=\"wtwcoins_beditcoinyp1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"wtwcoins.changeNumberValue('wtwcoins_tactionzonecoiny', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />\r\n";
			$zformdata .= "</div><br /><br />\r\n";
			
			$zformdata .= "<label class=\"wtw-switch\"><input id=\"wtwcoins_rotationdirection\" type=\"checkbox\" onclick=\"wtwcoins.changeRotateDirection();\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtwcoins_rotatedirtext\" class=\"wtw-enablelabel\">Reverse Direction</div>\r\n";
			
			$zformdata .= "<hr class=\"wtw-menuhr\" />\r\n";
			$zformdata .= "<h2 style=\"margin-bottom:3px;\">Coin Value</h2>\r\n";
			$zformdata .= "<select id=\"wtwcoins_tvalue1\" onchange=\"wtwcoins.setNewCoin();\"></select><br />\r\n";
			$zformdata .= "<hr class=\"wtw-menuhr\" />\r\n";
			$zformdata .= "<h2 style=\"margin-bottom:3px;\">Coin Visibility Distance<br />(Load Zone)</h2>\r\n";
			$zformdata .= "<select id=\"wtwcoins_tloadactionzoneid\"></select><br /><br />\r\n";

			$zformdata .= "<div id=\"wtwcoins_savecoin\" class=\"wtw-greenbutton\" onclick=\"wtwcoins.submitCoinForm(1);\">Save Coin</div>\r\n";
			
			$zformdata .= "<div id=\"wtwcoins_bdelcoin\" class=\"wtw-redbutton\" onclick=\"wtwcoins.submitCoinForm(0);\"><u>D</u>elete Coin</div>\r\n";
			$zformdata .= "<div id=\"wtwcoins_bcancelcoin\" class=\"wtw-yellowbutton\" onclick=\"wtwcoins.submitCoinForm(-1);\">Cancel</div>\r\n";
			$zformdata .= "<br /><br />\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-shopping:functions-class_plugin.php-editCoinForm=".$e->getMessage());
		}
		return $zformdata;
	}
	
}

	function wtwcoins() {
		return wtwcoins::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwcoins'] = wtwcoins();

?>
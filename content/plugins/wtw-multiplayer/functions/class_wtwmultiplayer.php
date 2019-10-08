<?php
class wtwmultiplayer {
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
			$wtwplugins->serror("plugins-class_wtwmultiplayer.php-construct=".$e->getMessage());
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
			$wtwplugins->serror("plugins-class_wtwmultiplayer.php-define=".$e->getMessage());
		}
	}

	public function defineConstants() {
		global $wtwplugins;
		try {
			$this->define('WTWMULTIPLAYER_PLUGIN', basename(strtolower(WTWMULTIPLAYER_FILE),".php"));
			$this->define('WTWMULTIPLAYER_PATH', dirname(WTWMULTIPLAYER_FILE));
			$this->define('WTWMULTIPLAYER_URL', $wtwplugins->contenturl.'/plugins/'.WTWMULTIPLAYER_PLUGIN);
			$this->define('WTWMULTIPLAYER_PREFIX', str_replace("wtw_wtw-","wtw_",wtw_tableprefix.WTWMULTIPLAYER_PLUGIN)."_");
			$this->define('WTWMULTIPLAYER_VERSION', $this->version);
		} catch (Exception $e) {
			$wtwplugins->serror("plugins-class_wtwmultiplayer.php-defineConstants=".$e->getMessage());
		}
	}

	public function initClass() {
		global $wtwplugins;
		try {
			$this->initAdminOnlyHooks();
			$this->initHooks();
			$this->checkTablesForUpdates();
		} catch (Exception $e) {
			$wtwplugins->serror("plugins-class_wtwmultiplayer.php-initClass=".$e->getMessage());
		}
	}
	
	public function initAdminOnlyHooks() {
		global $wtwplugins;
		try {
			/* Admin only hooks */
			if ($wtwplugins->pagename == "admin.php") {
				/* admin menu items */
				/* wtwplugins class -> addAdminMenuItem function (menu item id, menu text, level 1 sort, level 1 id, level 2 sort, level 2 id, level 1 icon, allowed roles array - null for all, onclick JavaScript function) */
				$wtwplugins->addAdminMenuItem('wtw_adminmultiplayer', 'Multi Player', 91, 'wtw_multiplayer', 0, '', '/content/system/images/menumultiplayer.png', array('admin','developer'), null);
				$wtwplugins->addAdminMenuItem('wtw_adminmultiplayersettings', 'Settings', 91, 'wtw_multiplayer', 1, 'wtw_multiplayersettings', '', array('admin','developer'), "WTW.openFullPageForm('fullpage','Multiplayer Settings','wtw_multiplayersettingspage');");
				
				/* admin full page settings forms */
				/* wtwplugins class -> addFullPageForm function (form id, allowed roles array - null for all, form html string) */
				$wtwplugins->addFullPageForm('wtw_multiplayersettingspage', array('admin','developer'), $this->adminMultiplayerSettingsForm());
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins-class_wtwmultiplayer.php-initAdminOnlyHooks=".$e->getMessage());
		}
	}	
	
	public function initHooks() {
		global $wtwplugins;
		try {
			/* Browse and Admin hooks  (admin inherrits all browse functions) */

			/* browse menu (bottom) settings Menu Items */
			/* wtwplugins class -> addSettingsMenuItem function (menu item id, menu text, sort order, level 1 id, level 1 icon, allowed roles array - null for all, onclick JavaScript function) */
			$wtwplugins->addSettingsMenuItem("wtw_menumultiplayer", "Multiplayer Settings", 50, "wtw_menumultiplayer", "/content/system/images/menumultiplayer.png", null, "WTW.showSettingsMenu('wtw_multiplayerform');");
			
			/* browse menu (bottom) settings Menu Forms */
			/* wtwplugins class-> addMenuForm function (form id, title text, form html string, allow roles array - null for all) */
			$wtwplugins->addMenuForm("wtw_multiplayerform", "Multiplayer Settings", $this->multiplayerSettingsForm(), null);
			
			/* javascripts */
			/* wtwplugins class -> addScript function (script id, '1' for admin only, script browse url) */
			$wtwplugins->addScript('wtw_multiplayerscript', null, WTWMULTIPLAYER_URL."/scripts/multiplayer.js");
			
			/* setting javascript functions to events */
			/* wtwplugins class -> addScriptFunction function (event, javascript function) - choose from events: */

			$wtwplugins->addScriptFunction("renderloopafterinit", "WTWMultiplayer.renderLoopAfterInit();");
			/* $wtwplugins->addScriptFunction("renderloop", "console.log('renderloop');"); */

			$wtwplugins->addScriptFunction("loadusersettings", "WTWMultiplayer.loadUserSettings();");
			
			$wtwplugins->addScriptFunction("myavataranimationsloaded", "WTWMultiplayer.activateMultiplayer();");
			$wtwplugins->addScriptFunction("setupmodeclosed", "WTWMultiplayer.activateMultiplayer();");
			$wtwplugins->addScriptFunction("savedavatarretrieved", "WTWMultiplayer.activateMultiplayer();");

			$wtwplugins->addScriptFunction("checkactionzonetrigger", "WTWMultiplayer.multiPersonInActionZone(zactionzone);");
			/* $wtwplugins->addScriptFunction("checkactionzone", "yourfunction();"); // variables available: zactionzone, zmeinzone, zothersinzone */

			$wtwplugins->addScriptFunction("avatarbeforecreate", "WTWMultiplayer.showAvatarIDs(avatarname, avatardef);");

		} catch (Exception $e) {
			$wtwplugins->serror("plugins-class_wtwmultiplayer.php-initHooks=".$e->getMessage());
		}
	}	
	
	public function adminMultiplayerSettingsForm() {
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$zformdata .= "	<div class=\"wtw-dashboardboxtitle\">Multiplayer Settings</div>\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardbox\">\r\n";
			
			$zformdata .= "WTWMULTIPLAYER_PATH=".WTWMULTIPLAYER_PATH."<br />";
			$zformdata .= "WTWMULTIPLAYER_PLUGIN=".WTWMULTIPLAYER_PLUGIN."<br />";
			$zformdata .= "WTWMULTIPLAYER_VERSION=".WTWMULTIPLAYER_VERSION."<br />";
			$zformdata .= "WTWMULTIPLAYER_URL=".WTWMULTIPLAYER_URL."<br />";
			$zformdata .= "WTWMULTIPLAYER_PREFIX=".WTWMULTIPLAYER_PREFIX."<br />";

			$zformdata .= "		</div>\r\n";
			$zformdata .= "	</div>\r\n";
			$zformdata .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins-class_wtwmultiplayer.php-adminMultiplayerSettingsForm=".$e->getMessage());
		}
		return $zformdata;
	}
		
	public function multiplayerSettingsForm() {
		$zformdata = "";
		try {
			$zformdata .= "<div id=\"wtw_multiplayernote\" class=\"wtw-menunote\" style=\"display:none;visibility:hidden;\">Multi-Player will allow you to see other users' avatars Walk around in the 3D Community you are viewing.<br /><br />";
			$zformdata .= "	Works best if you have a fast Internet connection and quality graphics processor.<br /><br />";
			$zformdata .= "	If the animation gets too slow, lower the number of Avatars (closest show first) or turn this off.</div>";
			$zformdata .= "<ul class=\"wtw-menuli\">";
			$zformdata .= "	<li class=\"wtw-menuliholder\">";
			$zformdata .= "		<img src=\"/content/system/images/menuq.png\" alt=\"Show Help\" title=\"Show Help\" class='wtw-menuq' onclick=\"WTW.toggle('wtw_multiplayernote');\" />";
			$zformdata .= "		<img src=\"/content/system/images/menumaxavatars.png\" alt=\"Number of Avatars\" title=\"Number of Avatars\" class='wtw-menulefticon' />Max Number of Avatars</li>";
			$zformdata .= "	<li class=\"wtw-submenuli\">";
			$zformdata .= "		<input type=\"button\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarcount', -1); return (false);\" onmouseup=\"WTW.changeStop();if (WTW.isNumeric(dGet('wtw_tavatarcount').value)) {WTW.multiPerson=Number(dGet('wtw_tavatarcount').value);WTW.setCookie('multiperson',WTW.multiPerson,30);}\" style=\"cursor: pointer;\" />";
			$zformdata .= "		<input type=\"text\" id=\"wtw_tavatarcount\" maxlength=\"16\" class=\"wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);if (WTW.isNumeric(dGet('wtw_tavatarcount').value)) {WTW.multiPerson=Number(dGet('wtw_tavatarcount').value);WTW.setCookie('multiperson',WTW.multiPerson,30);}\" style=\"text-align:center;background-color:#111111;color:#ffffff;\" />";
			$zformdata .= "		<input type=\"button\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarcount', 1); return (false);\" onmouseup=\"WTW.changeStop();if (WTW.isNumeric(dGet('wtw_tavatarcount').value)) {WTW.multiPerson=Number(dGet('wtw_tavatarcount').value);WTW.setCookie('multiperson',WTW.multiPerson,30);}\" style=\"cursor: pointer;\" />";
			$zformdata .= "	</li>";
			$zformdata .= "</ul>";
			$zformdata .= "<ul class=\"wtw-menuli\">";
			$zformdata .= "	<li class=\"wtw-menuli\" onclick=\"WTWMultiplayer.toggleAvatarIDs();\"><img id=\"wtw_submenuavatarids\" src=\"/content/system/images/menuavataridson.png\" alt=\"Turn Avatar IDs Off\" title=\"Turn Avatar IDs Off\" class='wtw-menulefticon' /><span id=\"wtw_submenuavataridstext\">Avatar IDs are On</span></li>";
			$zformdata .= "	<li class=\"wtw-menuli\" onclick=\"WTWMultiplayer.toggleMultiPlayer();\"><img id=\"wtw_submenumultiplayer\" src=\"/content/system/images/menumultiplayer.png\" alt=\"Turn Multi-Player Off\" title=\"Turn Multi-Player Off\" class='wtw-menulefticon' /><span id=\"wtw_submenumultiplayertext\">Multi-Player is On</span></li>";
			$zformdata .= "</ul>";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins-class_wtwmultiplayer.php-multiplayerSettingsForm=".$e->getMessage());
		}
		return $zformdata;
	}
	
	public function checkTablesForUpdates() {
		global $wtwplugins;
		try {
			if ($wtwplugins->pagename == "admin.php") {
				$dbversion = $wtwplugins->getSetting("dbversion");
				if ($dbversion != $this->dbversion) {
					$wtwplugins->deltaCreateTable("
						CREATE TABLE `".WTWMULTIPLAYER_PREFIX."useravatars` (
						  `useravatarid` varchar(45) NOT NULL,
						  `userid` varchar(16) DEFAULT '',
						  `userip` varchar(64) DEFAULT '',
						  `instanceid` varchar(45) DEFAULT '',
						  `avatarind` int(11) DEFAULT '1',
						  `objectfolder` varchar(256) DEFAULT '',
						  `objectfile` varchar(256) DEFAULT '',
						  `domain` varchar(256) DEFAULT '3d.walktheweb.com',
						  `secureprotocol` int(11) DEFAULT '1',
						  `scalingx` decimal(18,2) DEFAULT '1.00',
						  `scalingy` decimal(18,2) DEFAULT '1.00',
						  `scalingz` decimal(18,2) DEFAULT '1.00',
						  `displayname` varchar(45) DEFAULT '',
						  `privacy` int(11) DEFAULT '0',
						  `lastdate` datetime DEFAULT NULL,
						  `lastip` varchar(45) DEFAULT '',
						  `createdate` datetime DEFAULT NULL,
						  `createuserid` varchar(16) DEFAULT '',
						  `updatedate` datetime DEFAULT NULL,
						  `updateuserid` varchar(16) DEFAULT '',
						  `deleteddate` datetime DEFAULT NULL,
						  `deleteduserid` varchar(16) DEFAULT '',
						  `deleted` int(11) DEFAULT '0',
						  PRIMARY KEY (`useravatarid`),
						  UNIQUE KEY `".WTWMULTIPLAYER_PREFIX."useravatarid_UNIQUE` (`useravatarid`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;
					");
					$wtwplugins->deltaCreateTable("
						CREATE TABLE `".WTWMULTIPLAYER_PREFIX."useravatarcolors` (
						  `avatarpartid` varchar(40) NOT NULL,
						  `userid` varchar(16) DEFAULT '',
						  `useravatarid` varchar(16) DEFAULT '',
						  `instanceid` varchar(24) DEFAULT '',
						  `avatarpart` varchar(256) DEFAULT NULL,
						  `emissivecolorr` decimal(20,18) DEFAULT '1.000000000000000000',
						  `emissivecolorg` decimal(20,18) DEFAULT '1.000000000000000000',
						  `emissivecolorb` decimal(20,18) DEFAULT '1.000000000000000000',
						  `createdate` datetime DEFAULT NULL,
						  `createuserid` varchar(16) DEFAULT '',
						  `updatedate` datetime DEFAULT NULL,
						  `updateuserid` varchar(16) DEFAULT '',
						  `deleteddate` datetime DEFAULT NULL,
						  `deleteduserid` varchar(16) DEFAULT '',
						  `deleted` int(11) DEFAULT '0',
						  PRIMARY KEY (`avatarpartid`),
						  UNIQUE KEY `".WTWMULTIPLAYER_PREFIX."useravatarcolorid_UNIQUE` (`avatarpartid`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;
					");
					$wtwplugins->deltaCreateTable("
						CREATE TABLE `".WTWMULTIPLAYER_PREFIX."useravataranimations` (
						  `useravataranimationid` varchar(40) NOT NULL,
						  `avataranimationid` varchar(16) DEFAULT NULL,
						  `useravatarid` varchar(16) DEFAULT NULL,
						  `instanceid` varchar(24) DEFAULT '',
						  `avataranimationname` varchar(45) DEFAULT '',
						  `speedratio` decimal(18,2) DEFAULT '1.00',
						  `walkspeed` decimal(18,2) DEFAULT '1.00',
						  `loadpriority` int(11) DEFAULT '0',
						  `animationfriendlyname` varchar(255) DEFAULT '',
						  `animationicon` varchar(255) DEFAULT '',
						  `objectfolder` varchar(255) DEFAULT '',
						  `objectfile` varchar(255) DEFAULT '',
						  `startframe` int(11) DEFAULT '0',
						  `endframe` int(11) DEFAULT '0',
						  `animationloop` int(11) DEFAULT '1',
						  `soundid` varchar(16) DEFAULT '',
						  `soundpath` varchar(255) DEFAULT '',
						  `soundmaxdistance` decimal(18,2) DEFAULT '100.00',
						  `createdate` datetime DEFAULT NULL,
						  `createuserid` varchar(16) DEFAULT '',
						  `updatedate` datetime DEFAULT NULL,
						  `updateuserid` varchar(16) DEFAULT '',
						  `deleteddate` datetime DEFAULT NULL,
						  `deleteduserid` varchar(16) DEFAULT '',
						  `deleted` int(11) DEFAULT '0',
						  PRIMARY KEY (`useravataranimationid`),
						  UNIQUE KEY `".WTWMULTIPLAYER_PREFIX."useravataranimationid_UNIQUE` (`useravataranimationid`),
						  KEY `".WTWMULTIPLAYER_PREFIX."idx_useravataranimations` (`avataranimationid`,`useravatarid`,`avataranimationname`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;
					");
					$wtwplugins->deltaCreateTable("
						CREATE TABLE `".WTWMULTIPLAYER_PREFIX."tracking` (
						  `trackid` varchar(16) NOT NULL,
						  `instanceid` varchar(45) DEFAULT '',
						  `communityid` varchar(16) DEFAULT '',
						  `buildingid` varchar(16) DEFAULT '',
						  `userid` varchar(16) DEFAULT '',
						  `useravatarid` varchar(45) DEFAULT '',
						  `positionx` decimal(18,2) DEFAULT '0.00',
						  `positiony` decimal(18,2) DEFAULT '0.00',
						  `positionz` decimal(18,2) DEFAULT '0.00',
						  `rotationx` decimal(18,2) DEFAULT '0.00',
						  `rotationy` decimal(18,2) DEFAULT '0.00',
						  `rotationz` decimal(18,2) DEFAULT '0.00',
						  `walkspeed` decimal(18,2) DEFAULT '1.00',
						  `runspeed` decimal(18,2) DEFAULT '2.00',
						  `activeanimations` varchar(512) DEFAULT '',
						  `movetime` datetime DEFAULT NULL,
						  PRIMARY KEY (`trackid`),
						  UNIQUE KEY `".WTWMULTIPLAYER_PREFIX."trackid_UNIQUE` (`trackid`),
						  KEY `".WTWMULTIPLAYER_PREFIX."tracking_webid` (`communityid`,`buildingid`,`instanceid`,`userid`,`trackid`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;
					");
					$wtwplugins->deltaCreateTable("
						CREATE TABLE `".WTWMULTIPLAYER_PREFIX."chats` (
						  `chatindexid` bigint(22) NOT NULL AUTO_INCREMENT,
						  `chatid` varchar(1024) DEFAULT '',
						  `instanceid` varchar(45) DEFAULT '',
						  `communityid` varchar(16) DEFAULT '',
						  `buildingid` varchar(16) DEFAULT '',
						  `chattext` mediumtext,
						  `createdate` datetime DEFAULT NULL,
						  `createuserid` varchar(16) DEFAULT '',
						  PRIMARY KEY (`chatindexid`),
						  UNIQUE KEY `".WTWMULTIPLAYER_PREFIX."chatindexid_UNIQUE` (`chatindexid`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;
					");
					$wtwplugins->saveSetting("dbversion", $this->dbversion);
				}
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins-class_wtwmultiplayer.php-checkTablesForUpdates=".$e->getMessage());
		}
	}
}

	function wtwmultiplayer() {
		return wtwmultiplayer::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwmultiplayer'] = wtwmultiplayer();

?>
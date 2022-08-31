<?php
/* All code is Copyright 2013-2021 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

class wtw3dinternet {
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
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_plugin.php-construct=".$e->getMessage());
		}
	}	
	
	public $version = "1.1.3";
	public $dbversion = "1.0.8";
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
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_plugin.php-define=".$e->getMessage());
		}
	}

	public function defineConstants() {
		global $wtwplugins;
		try {
			$this->define('WTW_3DINTERNET_PLUGIN', basename(strtolower(WTW_3DINTERNET_FILE),".php"));
			$this->define('WTW_3DINTERNET_PATH', dirname(WTW_3DINTERNET_FILE));
			$this->define('WTW_3DINTERNET_URL', $wtwplugins->contenturl.'/plugins/' . WTW_3DINTERNET_PLUGIN);
			$this->define('WTW_3DINTERNET_PREFIX', str_replace("wtw_wtw-","wtw_",wtw_tableprefix . WTW_3DINTERNET_PLUGIN)."_");
			$this->define('WTW_3DINTERNET_VERSION', $this->version);
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_plugin.php-defineConstants=".$e->getMessage());
		}
	}

	public function initClass() {
		global $wtwplugins;
		try {
			$this->initAdminOnlyHooks();
			$this->initHooks();
			$this->checkTablesForUpdates();
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_plugin.php-initClass=".$e->getMessage());
		}
	}
	
	public function initAdminOnlyHooks() {
		global $wtwplugins;
		try {
			/* Admin only hooks */
			if ($wtwplugins->pagename == "admin.php") {
				/* add admin menu items */
				/* wtwplugins class -> addAdminMenuItem function (menu item id, menu text, level 1 sort, level 1 id, level 2 sort, level 2 id, level 1 icon, allowed roles array - null for all, onclick JavaScript function) */
				
				$wtwplugins->addAdminMenuItem('wtw_3dinternetmenu', $wtwplugins->__('3D Internet'), -1, 'wtw_3dinternetmenu', 0, '', '/content/plugins/wtw-3dinternet/assets/images/menuworld.png', array('admin','developer'), null);
				$wtwplugins->addAdminMenuItem('wtw_3dinternetsettings', $wtwplugins->__('Control Panel'), -1, 'wtw_3dinternetmenu', 1, 'wtw_3dinternetsettings', '', array('admin','developer'), "WTW.openFullPageForm('fullpage','".$wtwplugins->__('3D Internet')."','wtw_3dinternetsettingspage');wtw3dinternet.serviceCheck('multiplayer');");

				/* admin full page settings forms */
				/* wtwplugins class -> addFullPageForm function (form id, allowed roles array - null for all, form html string) */
				$wtwplugins->addFullPageForm('wtw_3dinternetsettingspage', array('admin','developer'), $this->admin3dInternetSettingsForm());
				
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_plugin.php-initAdminOnlyHooks=".$e->getMessage());
		}
	}	
	
	public function initHooks() {
		global $wtwplugins;
		try {
			/* Browse and Admin hooks  (admin inherrits all browse functions) */
			/* css stylesheets */
			/* wtwplugins class -> addStylesheet function (stylesheet id, '1' for admin only, stylesheet url) */
			$wtwplugins->addStylesheet('wtw-3dinternet-style-css', null, WTW_3DINTERNET_URL . "/styles/style.css");

			/* javascripts */
			/* wtwplugins class -> addScript function (script id, '1' for admin only, script browse url) */
			$wtwplugins->addScript('wtw-3dinternet-recordrtc', null, "/core/scripts/engine/recordrtc.js");
			$wtwplugins->addScript('wtw-3dinternet-script', null, WTW_3DINTERNET_URL . "/scripts/class_main.js");
			$wtwplugins->addScript('wtw-3dinternet-voicechat', null, WTW_3DINTERNET_URL . "/scripts/voicechat.js");
			$wtwplugins->addScript('wtw-3dinternet-chat', null, WTW_3DINTERNET_URL . "/scripts/chat.js");
			$wtwplugins->addScript('wtw-3dinternet-move', null, WTW_3DINTERNET_URL . "/scripts/move.js");
			$wtwplugins->addScript('wtw-3dinternet-admin', null, WTW_3DINTERNET_URL . "/scripts/admin.js");
			
			/* browse menu (bottom) settings Menu Items */
			/* wtwplugins class -> addSettingsMenuItem function (menu item id, menu text, sort order, level 1 id, level 1 icon, allowed roles array - null for all, onclick JavaScript function) */
			$wtwplugins->addSettingsMenuItem("wtw_3dinternetmultiplayer", "Multiplayer Settings", 50, "wtw_3dinternetmultiplayer", "/content/system/images/menumultiplayer.png", null, "WTW.showSettingsMenu('wtw_3dinternetmuliplayerform');");

			/* browse menu (bottom) settings Menu Forms */
			/* wtwplugins class-> addMenuForm function (form id, title text, form html string, allow roles array - null for all, cssclass) */
			$wtwplugins->addMenuForm("wtw_3dinternetmuliplayerform", "Multiplayer Settings", $this->_3dInternetSettingsForm(), null, 'wtw-slideupmenuright');
			$wtwplugins->addMenuForm("wtw_menuchat", "Connect", $this->_3dInternetChatForm(), null, 'wtw-slideupmenuleft');


			/* hook plugin script functions into existing wtw functions */
			/* $wtwplugins->addScriptFunction('hookname', 'function(parameters);'); */

			$wtwplugins->addScriptFunction("openlocallogin", "wtw3dinternet.openLocalLogin(zitem, zwidth, zheight);");
			
			$wtwplugins->addScriptFunction("myavataranimationsloaded", "wtw3dinternet.activateMultiplayer();");
			$wtwplugins->addScriptFunction("getmyavatarlist", "wtw3dinternet.getMyAvatarList(zloaddefault, zeditmode);");
			
			$wtwplugins->addScriptFunction("savedavatarretrieved", "wtw3dinternet.savedAvatarRetrieved(zavatarname, zsendrefresh);");

			$wtwplugins->addScriptFunction("avatarbeforecreate", "wtw3dinternet.showAvatarIDs(zavatarname);");
			$wtwplugins->addScriptFunction("checkactionperzonetrigger", "wtw3dinternet.multiPersonInActionZone(zactionzone);");
			$wtwplugins->addScriptFunction("checkactionzone", "wtw3dinternet.checkActionZone();");

			$wtwplugins->addScriptFunction("enteractionzone", "wtw3dinternet.enterLoadZone(zmoldname, zmolddef);");

			$wtwplugins->addScriptFunction("exitactionzone", "wtw3dinternet.exitLoadZone(zmoldname, zmolddef);");

			$wtwplugins->addScriptFunction("unloadallzones", "wtw3dinternet.unloadAllZones();");

			$wtwplugins->addScriptFunction("loadusersettingsafterengine", "wtw3dinternet.loadUserSettingsAfterEngine();"); 

			$wtwplugins->addScriptFunction("resetactivitytimer", "wtw3dinternet.resetActivityTimer();");
			$wtwplugins->addScriptFunction("loadloginsettings", "wtw3dinternet.loadLoginSettings(zloaddefault);");

			$wtwplugins->addScriptFunction("moveavatar", "wtw3dinternet.moveAvatar(zavatar, zmoveevents);");
			$wtwplugins->addScriptFunction("onmyavatarselect", "wtw3dinternet.onMyAvatarSelect(zglobaluseravatarid, zuseravatarid, zavatarid);");
			
			$wtwplugins->addScriptFunction("closemenus", "wtw3dinternet.closeMenus(zmenuid);");
			$wtwplugins->addScriptFunction("beforeunload", "wtw3dinternet.beforeUnloadVoiceChat();");
			$wtwplugins->addScriptFunction("beforeunload", "wtw3dinternet.beforeUnloadChat();");
			$wtwplugins->addScriptFunction("beforeunload", "wtw3dinternet.beforeUnloadMove();");
			
			$wtwplugins->addScriptFunction("onclick", "wtw3dinternet.onClick(zpickedname);");
			$wtwplugins->addScriptFunction("onmicvolumechange", "wtw3dinternet.onMicVolumeChange(zvolume);");
			$wtwplugins->addScriptFunction("togglemicmute", "wtw3dinternet.toggleMicMute();");
			$wtwplugins->addScriptFunction("checkhovers", "wtw3dinternet.checkHovers(zmoldname, zshape);");
			$wtwplugins->addScriptFunction("resethovers", "wtw3dinternet.resetHovers(zmoldname, zshape);");
			$wtwplugins->addScriptFunction("keyup", "wtw3dinternet.keyUp(zevent);");

			$wtwplugins->addScriptFunction("avatarloadcomplete", "wtw3dinternet.avatarLoadComplete(zavatarname);");

		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_plugin.php.php-initHooks=".$e->getMessage());
		}
	}	

	public function _3dInternetChatForm() {
		/* form container for chats */
		$zformdata = "";
		try {
			$zformdata .= "	<div id=\"wtw_menuchatmaxdiv\">\r\n";
			$zformdata .= "	<div id=\"wtw_menuchatscroll\" class=\"wtw-mainmenuscroll\">\r\n";
			$zformdata .= "		<div id=\"wtw_startconnect\"></div>\r\n";
			$zformdata .= "		<div id=\"wtw_chatsendrequests\"></div>\r\n";
			$zformdata .= "		<div id=\"wtw_voicechatsendrequests\"></div>\r\n";
			$zformdata .= "	</div>\r\n";
			$zformdata .= "	</div>\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins-3dinternet.php-_3dInternetChatForm=".$e->getMessage());
		}
		return $zformdata;
	}

	public function admin3dInternetSettingsForm() {
		/* admin settings form for 3D Internet */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$zformdata .= "	<div class=\"wtw-dashboardboxtitle\">Control Panel - Server-wide Settings</div>\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardbox\">\r\n";
			
			/* login settings - optional WalkTheWeb global login and Local server Login */
			$zformdata .= "			<div class=\"wtw-controlpaneldiv\">\r\n";
			$zformdata .= "				<div class=\"wtw-controlpaneltitlediv\">Login / Avatar Settings</div>\r\n";
			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtw3dinternet_enableglobal\" type=\"checkbox\" onclick=\"wtw3dinternet.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtw3dinternet_enableglobaltext\" class=\"wtw-disabledlabel\">Global Login/Avatars Disabled</div> <br />These are stored on the WalkTheWeb Hub and work on all WalkTheWeb 3D Websites.<br /><br />\r\n";
			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtw3dinternet_enablelocal\" type=\"checkbox\" onclick=\"wtw3dinternet.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtw3dinternet_enablelocaltext\" class=\"wtw-disabledlabel\">Local Login/Avatars Disabled</div> <br />These are stored locally and only work on this server.<br /><br />\r\n";
			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtw3dinternet_enableanonymous\" type=\"checkbox\" onclick=\"wtw3dinternet.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtw3dinternet_enableanonymoustext\" class=\"wtw-disabledlabel\">Anonymous (Guest) Avatars Disabled</div> <br />These are visitors without a login.<br />\r\n";
			$zformdata .= "			</div>\r\n";

			/* multiplayer setings conects to the multiplayer/chat hub server */
			$zformdata .= "			<div class=\"wtw-controlpaneldiv\">\r\n";
			$zformdata .= "				<div class=\"wtw-controlpaneltitlediv\">Multiplayer Settings</div>\r\n";

			$zformdata .= "				<div id=\"wtw3dinternet_multiplayertext\" class=\"wtw-disabledlabel\" style=\"float:right;\"></div>";

			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtw3dinternet_enablemultiplayer\" type=\"checkbox\" onclick=\"wtw3dinternet.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtw3dinternet_enablemultiplayertext\" class=\"wtw-disabledlabel\">Multiplayer Disabled</div><div style=\"clear:both;\"></div><br />\r\n";

			$zformdata .= "				<div id=\"wtw3dinternet_chattext\" class=\"wtw-disabledlabel\" style=\"float:right;\"></div>";

			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtw3dinternet_enablechat\" type=\"checkbox\" onclick=\"wtw3dinternet.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtw3dinternet_enablechattext\" class=\"wtw-disabledlabel\">Multiplayer Chat Disabled</div><div style=\"clear:both;\"></div><br />\r\n";

			$zformdata .= "				<div id=\"wtw3dinternet_voicechattext\" class=\"wtw-disabledlabel\" style=\"float:right;display:none;\"></div>";

			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtw3dinternet_enablevoicechat\" type=\"checkbox\" onclick=\"wtw3dinternet.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtw3dinternet_enablevoicechattext\" class=\"wtw-disabledlabel\">Multiplayer Voice Chat Disabled</div><div style=\"clear:both;\"></div>\r\n";
			$zformdata .= "			</div>\r\n";
			
			/* for future use */
			$zformdata .= "			<div class=\"wtw-controlpaneldiv\" style=\"display:none;visibility:hidden;\">\r\n";
			$zformdata .= "				<div class=\"wtw-controlpaneltitlediv\">Franchising Settings</div>\r\n";
			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtw3dinternet_enablefranchisebuildings\" type=\"checkbox\" onclick=\"wtw3dinternet.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtw3dinternet_enablefranchisebuildingstext\" class=\"wtw-disabledlabel\">3D Buildings Franchising Disabled</div><br />\r\n";
			$zformdata .= "			</div>\r\n";

			$zformdata .= "			<br /><br /><div onclick=\"WTW.toggle('wtw_videopreview');\" class=\"wtw-logincancel\" style=\"display:none;visibility:hidden;\">TEST VIDEO</div>\r\n";

			$zformdata .= "		</div>\r\n";
			$zformdata .= "	</div>\r\n";
			$zformdata .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins-3dinternet.php-admin3dInternetSettingsForm=".$e->getMessage());
		}
		return $zformdata;
	}
		
	public function _3dInternetSettingsForm() {
		/* form for multiplayer settings on browse menu */
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
			$zformdata .= "		<input type=\"button\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarcount', -1);\" onmouseup=\"WTW.changeStop();if (WTW.isNumeric(dGet('wtw_tavatarcount').value)) {WTW.multiPerson=Number(dGet('wtw_tavatarcount').value);WTW.setCookie('multiperson',WTW.multiPerson,30);}\" style=\"cursor: pointer;\" />";
			$zformdata .= "		<input type=\"text\" id=\"wtw_tavatarcount\" maxlength=\"16\" class=\"wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);if (WTW.isNumeric(dGet('wtw_tavatarcount').value)) {WTW.multiPerson=Number(dGet('wtw_tavatarcount').value);WTW.setCookie('multiperson',WTW.multiPerson,30);}\" style=\"text-align:center;background-color:#111111;color:#ffffff;\" />";
			$zformdata .= "		<input type=\"button\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarcount', 1);\" onmouseup=\"WTW.changeStop();if (WTW.isNumeric(dGet('wtw_tavatarcount').value)) {WTW.multiPerson=Number(dGet('wtw_tavatarcount').value);WTW.setCookie('multiperson',WTW.multiPerson,30);}\" style=\"cursor: pointer;\" />";
			$zformdata .= "	</li>";
			$zformdata .= "</ul>";
			$zformdata .= "<ul class=\"wtw-menuli\">";
			$zformdata .= "	<li class=\"wtw-menuli\" onclick=\"wtw3dinternet.toggleAvatarIDs();\"><img id=\"wtw_submenuavatarids\" src=\"/content/system/images/menuavataridson.png\" alt=\"Turn Avatar IDs Off\" title=\"Turn Avatar IDs Off\" class='wtw-menulefticon' /><span id=\"wtw_submenuavataridstext\">Avatar IDs are On</span></li>";
			$zformdata .= "	<li class=\"wtw-menuli\" onclick=\"wtw3dinternet.toggleMultiPlayer();\"><img id=\"wtw_submenumultiplayer\" src=\"/content/system/images/menumultiplayer.png\" alt=\"Turn Multi-Player Off\" title=\"Turn Multi-Player Off\" class='wtw-menulefticon' /><span id=\"wtw_submenumultiplayertext\">Multi-Player is On</span></li>";
			$zformdata .= "</ul>";
			$zformdata .= "<div id=\"participantsMessage\"></div>";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins-3dinternet.php-_3dInternetSettingsForm=".$e->getMessage());
		}
		return $zformdata;
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
				$dbversion = $wtwplugins->getSetting(WTW_3DINTERNET_PREFIX."dbversion","1.0.0");
				if ($dbversion != $this->dbversion) {
					$wtwplugins->deltaCreateTable("
						CREATE TABLE `".WTW_3DINTERNET_PREFIX."useravatars` (
						  `useravatarid` varchar(16) NOT NULL,
						  `globaluseravatarid` varchar(32) DEFAULT '',
						  `userid` varchar(16) DEFAULT '',
						  `userip` varchar(15) DEFAULT '',
						  `instanceid` varchar(24) DEFAULT '',
						  `avatarid` varchar(16) DEFAULT '',
						  `versionid` varchar(16) DEFAULT '',
						  `version` varchar(10) DEFAULT '1.0.0',
						  `versionorder` int DEFAULT '1000000',
						  `versiondesc` varchar(255) DEFAULT '',
						  `avatargroup` varchar(64) DEFAULT 'Default',
						  `objectfolder` varchar(256) DEFAULT '',
						  `objectfile` varchar(256) DEFAULT '',
						  `domain` varchar(256) DEFAULT '3d.walktheweb.com',
						  `secureprotocol` int(11) DEFAULT '1',
						  `positionx` decimal(18,2) DEFAULT '0.00',
						  `positiony` decimal(18,2) DEFAULT '0.00',
						  `positionz` decimal(18,2) DEFAULT '0.00',
						  `scalingx` decimal(18,4) DEFAULT '1.0000',
						  `scalingy` decimal(18,4) DEFAULT '1.0000',
						  `scalingz` decimal(18,4) DEFAULT '1.0000',
						  `rotationx` decimal(18,2) DEFAULT '0.00',
						  `rotationy` decimal(18,2) DEFAULT '0.00',
						  `rotationz` decimal(18,2) DEFAULT '0.00',
						  `startframe` int(11) DEFAULT '0',
						  `endframe` int(11) DEFAULT '0',
						  `displayname` varchar(45) DEFAULT '',
						  `avatardescription` varchar(255) DEFAULT '',
						  `privacy` int(11) DEFAULT '0',
						  `enteranimation` int(11) DEFAULT '0',
						  `exitanimation` int(11) DEFAULT '0',
						  `enteranimationparameter` varchar(255) DEFAULT '',
						  `exitanimationparameter` varchar(255) DEFAULT '',
						  `walkspeed` decimal(18,2) DEFAULT '1.00',
						  `walkanimationspeed` decimal(18,2) DEFAULT '1.00',
						  `turnspeed` decimal(18,2) DEFAULT '1.00',
						  `turnanimationspeed` decimal(18,2) DEFAULT '1.00',
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
						  UNIQUE KEY `".WTW_3DINTERNET_PREFIX."useravatarid_UNIQUE` (`useravatarid`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;
					");
					$wtwplugins->deltaCreateTable("
						CREATE TABLE `".WTW_3DINTERNET_PREFIX."useravatarcolors` (
						  `avatarpartid` varchar(40) NOT NULL,
						  `globalpartid` varchar(32) DEFAULT '',
						  `globaluseravatarid` varchar(32) DEFAULT '',
						  `useravatarid` varchar(16) DEFAULT '',
						  `userid` varchar(16) DEFAULT '',
						  `instanceid` varchar(24) DEFAULT '',
						  `avatarpart` varchar(256) DEFAULT '',
						  `diffusecolor` varchar(7) DEFAULT '#ffffff',
						  `specularcolor` varchar(7) DEFAULT '#000000',
						  `emissivecolor` varchar(7) DEFAULT '#000000',
						  `ambientcolor` varchar(7) DEFAULT '#ffffff',
						  `createdate` datetime DEFAULT NULL,
						  `createuserid` varchar(16) DEFAULT '',
						  `updatedate` datetime DEFAULT NULL,
						  `updateuserid` varchar(16) DEFAULT '',
						  `deleteddate` datetime DEFAULT NULL,
						  `deleteduserid` varchar(16) DEFAULT '',
						  `deleted` int(11) DEFAULT '0',
						  PRIMARY KEY (`avatarpartid`),
						  UNIQUE KEY `".WTW_3DINTERNET_PREFIX."useravatarcolorid_UNIQUE` (`avatarpartid`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;
					");
					$wtwplugins->deltaCreateTable("
						CREATE TABLE `".WTW_3DINTERNET_PREFIX."useravataranimations` (
						  `globalanimationid` varchar(32) DEFAULT '',
						  `useravataranimationid` varchar(16) NOT NULL,
						  `avataranimationid` varchar(16) DEFAULT NULL,
						  `globaluseravatarid` varchar(32) DEFAULT '',
						  `useravatarid` varchar(16) DEFAULT NULL,
						  `avatarid` varchar(16) DEFAULT '',
						  `instanceid` varchar(24) DEFAULT '',
						  `animationevent` varchar(45) DEFAULT '',
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
						  UNIQUE KEY `".WTW_3DINTERNET_PREFIX."useravataranimationid_UNIQUE` (`useravataranimationid`),
						  KEY `".WTW_3DINTERNET_PREFIX."idx_useravataranimations` (`avataranimationid`,`useravatarid`,`animationevent`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;
					");
					$wtwplugins->deltaCreateTable("
						CREATE TABLE `".WTW_3DINTERNET_PREFIX."blockedinstances` (
						  `blockedinstanceid` varchar(16) NOT NULL,
						  `instanceid` varchar(24) DEFAULT '',
						  `userid` varchar(16) DEFAULT '',
						  `baninstanceid` varchar(24) DEFAULT '',
						  `banuserid` varchar(16) DEFAULT '',
						  `banuserip` varchar(15) DEFAULT '',
						  `banuseravatarid` varchar(16) DEFAULT '',
						  `banglobalavatarid` varchar(32) DEFAULT '',
						  `blockchat` int DEFAULT '0',
						  `banuser` int DEFAULT '0',
						  `createdate` datetime DEFAULT NULL,
						  `createuserid` varchar(16) DEFAULT '',
						  `updatedate` datetime DEFAULT NULL,
						  `updateuserid` varchar(16) DEFAULT '',
						  `deleteddate` datetime DEFAULT NULL,
						  `deleteduserid` varchar(16) DEFAULT '',
						  `deleted` int DEFAULT '0',
						  PRIMARY KEY (`blockedinstanceid`),
						  UNIQUE KEY `".WTW_3DINTERNET_PREFIX."blockedinstanceid_UNIQUE` (`blockedinstanceid`),
						  KEY `".WTW_3DINTERNET_PREFIX."idx_blockedinstances` 
						  (`blockedinstanceid`,`instanceid`,`userid`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;
					");
					
					/* updated 3.4.5 - set initial values for new fields */
					$wtwplugins->query("
						update ".WTW_3DINTERNET_PREFIX."useravatars
						set versionid=avatarid,
							version='1.0.0',
							versionorder=1000000,
							versiondesc='Initial Version'
							updatedate=now(),
							updateuserid='".$wtwplugins->userid."'
						where versionid='';
					");
					
					$wtwplugins->saveSetting(WTW_3DINTERNET_PREFIX."dbversion", $this->dbversion);
				}
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_plugin.php-checkTablesForUpdates=".$e->getMessage());
		}
	}

}

	function wtw3dinternet() {
		return wtw3dinternet::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtw3dinternet'] = wtw3dinternet();

?>
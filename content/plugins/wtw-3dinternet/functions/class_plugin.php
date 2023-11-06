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
	
	public $version = "1.2.1";
	public $dbversion = "1.0.8";
	public $versiondate = "2023-9-5";
	
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
				
				$wtwplugins->addAdminMenuItem('wtw_adminmenuupdates', $wtwplugins->__('Updates'), -100, 'wtw_dashboard', 2, 'wtw_updates', '', array('admin','developer'), "WTW.openFullPageForm('updates','Check for Updates','');");
				$wtwplugins->addAdminMenuItem('wtw_adminmediawtwdownloads', $wtwplugins->__('WalkTheWeb Downloads'), -95, 'wtw_medialibrary', 3, 'wtw_viewwtwdownloads', '', array('admin','developer','architect','host'), "WTW.openFullPageForm('importpage','".$wtwplugins->__('communities')."');");
				$wtwplugins->addAdminMenuItem('wtw_admin3dinternetmenu', $wtwplugins->__('3D Internet'), -70, 'wtw_3dinternetmenu', 0, '', '/content/plugins/wtw-3dinternet/assets/images/menuworld.png', array('admin','developer'), "WTW.adminMenuItemSelected(this);WTW.toggleAdminSubMenu(this);");
				
				$wtwplugins->addAdminMenuItem('wtw_admin3dinternetavatars', $wtwplugins->__('WalkTheWeb Logins and Avatars'), -70, 'wtw_3dinternetmenu', 1, 'wtw_3dinternetsettings', '', array('admin','developer'), "WTW.openFullPageForm('fullpage','".$wtwplugins->__('3D Internet')."','wtw_3dinternetloginspage');");
				$wtwplugins->addAdminMenuItem('wtw_admin3dinternetmultiplayer', $wtwplugins->__('Multiplayer and Chat'), -70, 'wtw_3dinternetmenu', 2, 'wtw_3dinternetsettings', '', array('admin','developer'), "WTW.openFullPageForm('fullpage','".$wtwplugins->__('3D Internet')."','wtw_3dinternetmultiplayerpage');wtw3dinternet.serviceCheck('multiplayer');");
				$wtwplugins->addAdminMenuItem('wtw_admin3dinternettemplates', $wtwplugins->__('Templates and Sharing'), -70, 'wtw_3dinternetmenu', 3, 'wtw_3dinternetsettings', '', array('admin','developer'), "WTW.openFullPageForm('fullpage','".$wtwplugins->__('3D Internet')."','wtw_3dinternettemplatespage');");
				$wtwplugins->addAdminMenuItem('wtw_admin3dinternetfranchising', $wtwplugins->__('Franchising to the Internet'), -70, 'wtw_3dinternetmenu', 4, 'wtw_3dinternetsettings', '', array('admin','developer'), "WTW.openFullPageForm('fullpage','".$wtwplugins->__('3D Internet')."','wtw_3dinternetfranchisingpage');");
				$wtwplugins->addAdminMenuItem('wtw_adminaddplugins', $wtwplugins->__('Add 3D Plugin'), 50, 'wtw_plugins', 4, 'wtw_allplugins', '', array('admin','developer'), "WTW.openFullPageForm('importpage','plugins');");

				/* admin full page settings forms */
				/* wtwplugins class -> addFullPageForm function (form id, allowed roles array - null for all, form html string) */
				$wtwplugins->addFullPageForm('wtw_showimportpage', array('admin','developer','architect','host'), $this->admin3dInternetWTWDownloadsForm());

				$wtwplugins->addFullPageForm('wtw_3dinternetloginspage', array('admin','developer'), $this->admin3dInternetLoginsForm());
				$wtwplugins->addFullPageForm('wtw_3dinternetmultiplayerpage', array('admin','developer'), $this->admin3dInternetMultiplayerForm());
				$wtwplugins->addFullPageForm('wtw_3dinternettemplatespage', array('admin','developer'), $this->admin3dInternetTemplatesForm());
				$wtwplugins->addFullPageForm('wtw_3dinternetfranchisingpage', array('admin','developer'), $this->admin3dInternetFranchisingForm());

				/* add div section to add 3D Building to a 3D Community Menu form */
				$wtwplugins->addAdminMenuDiv('add3dbuilding', 'wtw_addbuildingfromserverdiv', $this->addWebFromServerDiv('building'), array('admin','developer','architect','host'));

				/* add div section to add 3D Thing to a 3D Community Menu form */
				$wtwplugins->addAdminMenuDiv('add3dthing', 'wtw_addthingfromserverdiv', $this->addWebFromServerDiv('thing'), array('admin','developer','architect','host'));
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

			$wtwplugins->addScript('wtw-3dinternet-script', null, WTW_3DINTERNET_URL . "/scripts/class_main.js");
			$wtwplugins->addScript('wtw-3dinternet-downloads', null, WTW_3DINTERNET_URL . "/scripts/downloads.js");
			$wtwplugins->addScript('wtw-3dinternet-bans', null, WTW_3DINTERNET_URL . "/scripts/bans.js");
			$wtwplugins->addScript('wtw-3dinternet-versions', null, WTW_3DINTERNET_URL . "/scripts/versions.js");
			$wtwplugins->addScript('wtw-3dinternet-franchises', null, WTW_3DINTERNET_URL . "/scripts/franchises.js");
			$wtwplugins->addScript('wtw-3dinternet-templates', null, WTW_3DINTERNET_URL . "/scripts/templates.js");

			$wtwplugins->addScript('wtw-3dinternet-admin', null, WTW_3DINTERNET_URL . "/scripts/admin.js");
			$wtwplugins->addScript('wtw-3dinternet-move', null, WTW_3DINTERNET_URL . "/scripts/move.js");
			$wtwplugins->addScript('wtw-3dinternet-chat', null, WTW_3DINTERNET_URL . "/scripts/chat.js");
			$wtwplugins->addScript('wtw-3dinternet-recordrtc', null, "/core/scripts/engine/socket.io/recordrtc.min.js");
			$wtwplugins->addScript('wtw-3dinternet-voicechat', null, WTW_3DINTERNET_URL . "/scripts/voicechat.js");
			
			/* browse menu (bottom) settings Menu Items */
			/* wtwplugins class -> addSettingsMenuItem function (menu item id, menu text, sort order, level 1 id, level 1 icon, allowed roles array - null for all, onclick JavaScript function) */
			$wtwplugins->addSettingsMenuItem("wtw_3dinternetmultiplayer", "Multiplayer Settings", 50, "wtw_3dinternetmultiplayer", "/content/system/images/menumultiplayer.png", null, "WTW.showSettingsMenu('wtw_3dinternetmuliplayerform');");

			/* browse menu (bottom) settings Menu Forms */
			/* wtwplugins class-> addMenuForm function (form id, title text, form html string, allow roles array - null for all, cssclass) */
			$wtwplugins->addMenuForm("wtw_3dinternetmuliplayerform", "Multiplayer Settings", $this->_3dInternetSettingsForm(), null, 'wtw-slideupmenuright');
			$wtwplugins->addMenuForm("wtw_menuchat", "Connect", $this->_3dInternetChatForm(), null, 'wtw-slideupmenuleft');

			/* hook plugin script functions into existing wtw functions */
			/* $wtwplugins->addScriptFunction('hookname', 'function(parameters);'); */

			$wtwplugins->addScriptFunction("openfullpageform", "wtw3dinternet.openFullPageForm(zpageid, zsetcategory, zitem, zitemname, zitemnamepath, zpreviewname);");
			$wtwplugins->addScriptFunction("openfullpageformmedialibrary", "wtw3dinternet.openFullPageFormMediaLibrary(zpageid, zsetcategory, zitem, zitemname, zitemnamepath, zpreviewname);");
			$wtwplugins->addScriptFunction("opendashboardform", "wtw3dinternet.openDashboardForm(zshow);");
			$wtwplugins->addScriptFunction("opendashboardformdownloads", "wtw3dinternet.openDashboardFormDownloads(zdownloads, zshow);");
			$wtwplugins->addScriptFunction("checkforupdates", "wtw3dinternet.checkForUpdates(zshow, zfilter);");
			$wtwplugins->addScriptFunction("getplugininfocomplete", "wtw3dinternet.getPluginInfoComplete(zmyplugins, zplugins, zshow, zfilter);");
			$wtwplugins->addScriptFunction("updatebadges", "wtw3dinternet.updateBadges(ztotalupdates, ztotaldashboardupdates);");
			$wtwplugins->addScriptFunction("openconfirmation", "wtw3dinternet.openConfirmation(zoption);");
			$wtwplugins->addScriptFunction("completedconfirmation", "wtw3dinternet.completedConfirmation(zoption);");
			$wtwplugins->addScriptFunction("adminloadafterscreen", "wtw3dinternet.adminLoadAfterScreen(zhmenu);");
			$wtwplugins->addScriptFunction("adminmenuitemselected", "wtw3dinternet.adminMenuItemSelected(zobj);");
			$wtwplugins->addScriptFunction("toggleadminsubmenu", "wtw3dinternet.toggleAdminSubMenu(zobj);");
			$wtwplugins->addScriptFunction("closemenus", "wtw3dinternet.closeMenus(zmenuid);");
			$wtwplugins->addScriptFunction("beforeunload", "wtw3dinternet.beforeUnloadAdmin();");
			$wtwplugins->addScriptFunction("beforeunload", "wtw3dinternet.beforeUnloadMove();");
			$wtwplugins->addScriptFunction("beforeunload", "wtw3dinternet.beforeUnloadChat();");
			$wtwplugins->addScriptFunction("beforeunload", "wtw3dinternet.beforeUnloadVoiceChat();");
			
			$wtwplugins->addScriptFunction("onmessage", "wtw3dinternet.onMessage(zevent);");
			$wtwplugins->addScriptFunction("inputclick", "wtw3dinternet.inputClick(zpickedname);");
			$wtwplugins->addScriptFunction("hudloginclick", "wtw3dinternet.hudLoginClick(zmoldname);");
			$wtwplugins->addScriptFunction("openlocallogin", "wtw3dinternet.openLocalLogin(zitem, zwidth, zheight);");
			$wtwplugins->addScriptFunction("hudloginlogin", "wtw3dinternet.hudLoginLogin(zlocal, zemail, zpassword, zremembercheck);");
			$wtwplugins->addScriptFunction("hudlogincreate", "wtw3dinternet.hudLoginCreate(zlocal, zemail, zpassword, zpassword2);");
			$wtwplugins->addScriptFunction("hudloginloadavatarsarray", "wtw3dinternet.hudLoginLoadAvatarsArray(zfilter, zdefaultdisplayname);");

			$wtwplugins->addScriptFunction("onmicrophonegrantedonmessage", "wtw3dinternet.onMicrophoneGrantedOnMessage(zevent, zrecordbuffer);");
			$wtwplugins->addScriptFunction("onmicvolumechange", "wtw3dinternet.onMicVolumeChange(zvolume);");
			$wtwplugins->addScriptFunction("togglemicmute", "wtw3dinternet.toggleMicMute();");
			$wtwplugins->addScriptFunction("checkhovers", "wtw3dinternet.checkHovers(zmoldname, zshape);");
			$wtwplugins->addScriptFunction("resethovers", "wtw3dinternet.resetHovers(zmoldname, zshape);");
			$wtwplugins->addScriptFunction("keyup", "wtw3dinternet.keyUp(zevent);");

			$wtwplugins->addScriptFunction("addconnectinggrid", "wtw3dinternet.addConnectingGrid(zconnectinggridsurl, zchildwebtype, zchildwebid, zchildwebname, zfranchiseid, zserverfranchiseid, zwebalias, zparentname);");
			$wtwplugins->addScriptFunction("addconnectinggridactionzones", "wtw3dinternet.addConnectingGridActionZones(zactionzonesurl, zchildwebtype, zchildwebid, zchildwebname, zfranchiseid, zserverfranchiseid, zwebalias, zparentname, zconnectinggridid, zconnectinggridind);");

			$wtwplugins->addScriptFunction("checkactionperzonetrigger", "wtw3dinternet.multiPersonInActionZone(zactionzone);");
			$wtwplugins->addScriptFunction("checkactionzone", "wtw3dinternet.checkActionZone();");
			$wtwplugins->addScriptFunction("enteractionzone", "wtw3dinternet.enterLoadZone(zmoldname, zmolddef);");
			$wtwplugins->addScriptFunction("getactionzonesbywebid", "wtw3dinternet.getActionZonesByWebID(zactionzonesurl, zserver, zcommunityid, zbuildingid, zthingid, zparentname, zconnectinggridid, zconnectinggridind);");

			$wtwplugins->addScriptFunction("exitactionzone", "wtw3dinternet.exitLoadZone(zmoldname, zmolddef);");
			$wtwplugins->addScriptFunction("unloadallzones", "wtw3dinternet.unloadAllZones(zoldwebid, zoldwebtype);");

			$wtwplugins->addScriptFunction("loadusersettingsafterengine", "wtw3dinternet.loadUserSettingsAfterEngine();"); 

			$wtwplugins->addScriptFunction("resetactivitytimer", "wtw3dinternet.resetActivityTimer();");
			$wtwplugins->addScriptFunction("loadloginsettings", "wtw3dinternet.loadLoginSettings(zloaddefault);");

			$wtwplugins->addScriptFunction("onmyavatarselect", "wtw3dinternet.onMyAvatarSelect(zglobaluseravatarid, zuseravatarid, zavatarid);");
			$wtwplugins->addScriptFunction("getsavedavatar", "wtw3dinternet.getSavedAvatar(zglobaluseravatarid, zinstanceid, zavatarname, zsendrefresh);");
			$wtwplugins->addScriptFunction("savedavatarretrieved", "wtw3dinternet.savedAvatarRetrieved(zavatarname, zsendrefresh);");
			$wtwplugins->addScriptFunction("myavataranimationsloaded", "wtw3dinternet.activateMultiplayer();");
			$wtwplugins->addScriptFunction("avatarbeforecreate", "wtw3dinternet.showAvatarIDs(zavatarname);");
			$wtwplugins->addScriptFunction("showlistversioncheck", "wtw3dinternet.showListVersionCheck(zwebtype, zversioncheck);");
			$wtwplugins->addScriptFunction("downloaduseravatarversionresponse", "wtw3dinternet.downloadUserAvatarVersionResponse(zobj, zglobaluseravatarid, zuseravatarid, zupdateuseravatarid, zwebid, zupdatewebid, zversionid, zversion, zoldversion, zwebtype);");
			$wtwplugins->addScriptFunction("downloaduseravatarversion", "wtw3dinternet.downloadUserAvatarVersion(zobj, zglobaluseravatarid, zuseravatarid, zupdateuseravatarid, zwebid, zupdatewebid, zversionid, zversion, zoldversion, zwebtype);");
			$wtwplugins->addScriptFunction("avatarloadcomplete", "wtw3dinternet.avatarLoadComplete(zavatarname);");
			$wtwplugins->addScriptFunction("moveavatar", "wtw3dinternet.moveAvatar(zavatar, zmoveevents);");
			$wtwplugins->addScriptFunction("deleteuseravatar", "wtw3dinternet.deleteUserAvatar(zglobaluseravatarid, zuseravatarid, zwidth, zheight);");
			
			$wtwplugins->addScriptFunction("getmoldsbywebid", "wtw3dinternet.getMoldsByWebID(zmoldsurl, zserver, zcommunityid, zbuildingid, zthingid, zactionzoneid, zactionzoneind, zconnectinggridid, zconnectinggridind, zgraphiclevel);");

			$wtwplugins->addScriptFunction("feedbacksubmit", "wtw3dinternet.feedbackSubmit(zrequest);");
			$wtwplugins->addScriptFunction("savealiasform", "wtw3dinternet.saveAliasForm(zoption, zhostuserid, zwebaliasid, zdomainname, zforcehttps, zwebalias, zaliascommunityid, zaliasbuildingid, zaliasthingid, zcommunitypublishname, zbuildingpublishname, zthingpublishname, zfoundfranchiseid, zfranchise, zsiteiconpath, zsitepreview);");

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

	public function admin3dInternetLoginsForm() {
		/* admin settings form for 3D Internet */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardboxtitle\">3D Internet - WalkTheWeb Logins and Avatars</div>\r\n";
			$zformdata .= "		<div class='wtw-roundedbox'><b>3D Internet</b> provides WalkTheWeb Global Logins and Avatars use to any WalkTheWeb site with these settings enabled. Use this panel to turn on or off features at a server level.<br /></div>\r\n";
			$zformdata .= "		<div class='wtw-clear'></div>\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardbox\">\r\n";
			
			/* login settings - optional WalkTheWeb global login and Local server Login */
			$zformdata .= "			<div class=\"wtw-controlpaneldiv\">\r\n";
			$zformdata .= "				<div class=\"wtw-controlpaneltitlediv\">Login / Avatar Settings</div>\r\n";
			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtw3dinternet_enableglobal\" type=\"checkbox\" onclick=\"wtw3dinternet.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtw3dinternet_enableglobaltext\" class=\"wtw-disabledlabel\">Global Login/Avatars Disabled</div> <br />These are stored on the WalkTheWeb Hub and work on all WalkTheWeb 3D Websites.<br /><br />\r\n";
			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtw3dinternet_enablelocal\" type=\"checkbox\" onclick=\"wtw3dinternet.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtw3dinternet_enablelocaltext\" class=\"wtw-disabledlabel\">Local Login/Avatars Disabled</div> <br />These are stored locally and only work on this server.<br /><br />\r\n";
			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtw3dinternet_enableanonymous\" type=\"checkbox\" onclick=\"wtw3dinternet.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtw3dinternet_enableanonymoustext\" class=\"wtw-disabledlabel\">Anonymous (Guest) Avatars Disabled</div> <br />These are visitors without a login.<br />\r\n";
			$zformdata .= "			</div>\r\n";

			$zformdata .= "		</div>\r\n";
			$zformdata .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins-3dinternet.php-admin3dInternetLoginsForm=".$e->getMessage());
		}
		return $zformdata;
	}

	public function admin3dInternetMultiplayerForm() {
		/* admin settings form for 3D Internet */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardboxtitle\">3D Internet - Multiplayer and Chat</div>\r\n";
			$zformdata .= "		<div class='wtw-roundedbox'><b>3D Internet</b> provides real-time multiplayer and chat services. Use this panel to turn on or off features at a server level.<br /></div>\r\n";
			$zformdata .= "		<div class='wtw-clear'></div>\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardbox\">\r\n";
			
			/* multiplayer setings conects to the multiplayer/chat hub server */
			$zformdata .= "			<div class=\"wtw-controlpaneldiv\">\r\n";
			$zformdata .= "				<div class=\"wtw-controlpaneltitlediv\">WalkTheWeb Broadcasts</div>\r\n";

			$zformdata .= "				<div id=\"wtw3dinternet_broadcaststext\" class=\"wtw-disabledlabel\" style=\"float:right;\"></div>";

			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtw3dinternet_enablebroadcasts\" type=\"checkbox\" onclick=\"wtw3dinternet.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtw3dinternet_enablebroadcaststext\" class=\"wtw-disabledlabel\">Broadcasts Disabled</div><div style=\"clear:both;\"></div><br />\r\n";
			$zformdata .= "				<div class=\"wtw-controlpaneltitlediv\">Multiplayer Settings</div>\r\n";

			$zformdata .= "				<div id=\"wtw3dinternet_multiplayertext\" class=\"wtw-disabledlabel\" style=\"float:right;\"></div>";

			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtw3dinternet_enablemultiplayer\" type=\"checkbox\" onclick=\"wtw3dinternet.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtw3dinternet_enablemultiplayertext\" class=\"wtw-disabledlabel\">Multiplayer Disabled</div><div style=\"clear:both;\"></div><br />\r\n";

			$zformdata .= "				<div id=\"wtw3dinternet_chattext\" class=\"wtw-disabledlabel\" style=\"float:right;\"></div>";

			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtw3dinternet_enablechat\" type=\"checkbox\" onclick=\"wtw3dinternet.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtw3dinternet_enablechattext\" class=\"wtw-disabledlabel\">Multiplayer Chat Disabled</div><div style=\"clear:both;\"></div><br />\r\n";

			$zformdata .= "				<div id=\"wtw3dinternet_voicechattext\" class=\"wtw-disabledlabel\" style=\"float:right;display:none;\"></div>";

			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtw3dinternet_enablevoicechat\" type=\"checkbox\" onclick=\"wtw3dinternet.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtw3dinternet_enablevoicechattext\" class=\"wtw-disabledlabel\">Multiplayer Voice Chat Disabled</div><div style=\"clear:both;\"></div>\r\n";
			$zformdata .= "			</div>\r\n";
			

			$zformdata .= "			<br /><br /><div onclick=\"WTW.toggle('wtw_videopreview');\" class=\"wtw-logincancel\" style=\"display:none;visibility:hidden;\">TEST VIDEO</div>\r\n";

			$zformdata .= "		</div>\r\n";

			/* added for testing video preview and streaming to 3D Scenes */
			$zformdata .= "<div id='wtw_videopreview' class='wtw-videopreview'>";
			$zformdata .= "	<div><video id='wtw_camerapreview' class='wtw-camerapreview'></video></div><br />";
			$zformdata .= "	<button id='wtw_startrecording' disabled onclick='wtw3dinternet.startRecording();' class='wtw-videobuttons'>Start Video</button> &nbsp;&nbsp;&nbsp; ";
			$zformdata .= "	<button id='wtw_stoprecording' disabled onclick='wtw3dinternet.stopRecording();' class='wtw-videobuttons'>Stop Video</button>";
			$zformdata .= "</div>";

			$zformdata .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins-3dinternet.php-admin3dInternetMultiplayerForm=".$e->getMessage());
		}
		return $zformdata;
	}

	public function admin3dInternetTemplatesForm() {
		/* admin settings form for 3D Internet */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardboxtitle\">3D Internet - Downloads and Sharing</div>\r\n";
			$zformdata .= "		<div class='wtw-roundedbox'><b>WalkTheWeb Downloads</b> provide the ability to download 3D Webs (3D Community Scenes, 3D Buildings, 3D Things, 3D Avatars) and 3D Plugins. <b>Sharing</b> allows you to upload your 3D Webs as a template for others to download copies from the WalkTheWeb Hub (https://3dnet.walktheweb.com). This does not affect your own local copy of the 3D Web. Use this panel to turn on or off features at a server level.<br /></div>\r\n";
			$zformdata .= "		<div class='wtw-clear'></div>\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardbox\">\r\n";
			
			/* Templates settings - optional WalkTheWeb Downloads and Sharing */
			$zformdata .= "			<div class=\"wtw-controlpaneldiv\">\r\n";
			
			$zformdata .= "				<div class=\"wtw-controlpaneltitlediv\">WalkTheWeb Downloads Settings</div>\r\n";
			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtw3dinternet_enabledownloads\" type=\"checkbox\" onclick=\"wtw3dinternet.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtw3dinternet_enabledownloadstext\" class=\"wtw-disabledlabel\">WalkTheWeb Downloads Disabled</div> <br />The options to download 3D Communities, 3D Buildings, 3D Things, and 3D Avatars.<br /><br />\r\n";
			
			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtw3dinternet_enableplugins\" type=\"checkbox\" onclick=\"wtw3dinternet.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtw3dinternet_enablepluginstext\" class=\"wtw-disabledlabel\">Download 3D Plugins Disabled</div> <br />The options to download and add additional 3D Plugins.<br /><br /><br />\r\n";

			$zformdata .= "				<div class=\"wtw-controlpaneltitlediv\">Sharing Templates Settings</div>\r\n";
			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtw3dinternet_enablesharing\" type=\"checkbox\" onclick=\"wtw3dinternet.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtw3dinternet_enablesharingtext\" class=\"wtw-disabledlabel\">Sharing 3D Webs Disabled</div> <br />The options to share template copies of your 3D Communities, 3D Buildings, 3D Things, and 3D Avatars.<br /><br />\r\n";
			
			$zformdata .= "			</div>\r\n";

			$zformdata .= "		</div>\r\n";
			$zformdata .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins-3dinternet.php-admin3dInternetTemplatesForm=".$e->getMessage());
		}
		return $zformdata;
	}

	public function admin3dInternetFranchisingForm() {
		/* admin settings form for 3D Internet */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardboxtitle\">3D Internet - Franchising to the Internet</div>\r\n";
			$zformdata .= "		<div class='wtw-roundedbox'><b>Franchising</b> provides the ability to allow others to add your selection of 3D Buildings and 3D Things to their scenes, while still being hosted and maintained on your server. You can select which 3D Buildings and 3D Things to franchise under <b>3D Websites -&gt; 3D Web Aliases</b>. Note that this is different from sharing templates where they get a copy of your 3D Building or 3D Thing and can modify it. Use this panel to turn on or off features at a server level.<br /></div>\r\n";
			$zformdata .= "		<div class='wtw-clear'></div>\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardbox\">\r\n";
			
			/* franchising settings - optional ability to add 3D Webs from other servers */
			$zformdata .= "			<div class=\"wtw-controlpaneldiv\">\r\n";
			$zformdata .= "				<div class=\"wtw-controlpaneltitlediv\">Franchising Settings</div>\r\n";

			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtw3dinternet_enablefranchising\" type=\"checkbox\" onclick=\"wtw3dinternet.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtw3dinternet_enablefranchisingtext\" class=\"wtw-disabledlabel\">Franchising your 3D Webs Disabled</div><br />The options to franchise your selection of 3D Buildings and 3D Things to other servers on the Internet.<br /><br />\r\n";
			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtw3dinternet_enablefranchiseadditions\" type=\"checkbox\" onclick=\"wtw3dinternet.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtw3dinternet_enablefranchiseadditionstext\" class=\"wtw-disabledlabel\">Franchise Additions Disabled</div><br />The option to add franchised 3D Buildings and 3D Things from the Internet to your 3D Communities and 3D Things from the Internet to your 3D Buildings.\r\n";

			$zformdata .= "			</div>\r\n";

			$zformdata .= "		</div>\r\n";
			$zformdata .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins-3dinternet.php-admin3dInternetFranchisingForm=".$e->getMessage());
		}
		return $zformdata;
	}

	public function admin3dInternetWTWDownloadsForm() {
		/* admin settings form for 3D Internet */
		global $wtwplugins;
		$zformdata = "";
		try {
			/* media library - 3d downloads */
			$zformdata .= "		<div id='wtw_importhorizontalmenu' class='wtw-horizontalmenu'>\r\n";
			$zformdata .= "			<div id='wtw_menumedialibrary' class='wtw-menutabtop' onclick=\"WTW.openFullPageForm('medialibrary','');WTW.setImageMenu(4);\">Back</div>\r\n";
			$zformdata .= "			<div id='wtw_menuwtwcommunities' class='wtw-menutabtopselected' onclick=\"WTW.openFullPageForm('importpage','communities');\">3D Communities</div>\r\n";
			$zformdata .= "			<div id='wtw_menuwtwbuildings' class='wtw-menutabtop' onclick=\"WTW.openFullPageForm('importpage','buildings');\">3D Buildings</div>\r\n";
			$zformdata .= "			<div id='wtw_menuwtwthings' class='wtw-menutabtop' onclick=\"WTW.openFullPageForm('importpage','things');\">3D Things</div>\r\n";
			$zformdata .= "			<div id='wtw_menuwtwavatars' class='wtw-menutabtop' onclick=\"WTW.openFullPageForm('importpage','avatars');\">3D Avatars</div>\r\n";
			$zformdata .= "			<div id='wtw_menuwtwplugins' class='wtw-menutabtop' onclick=\"WTW.openFullPageForm('importpage','plugins');\">3D Plugins</div>\r\n";
			$zformdata .= "			<div id='searchcommunitiesdiv' class='wtw-searchbar'>\r\n";
			$zformdata .= "				<b>Search:</b> <input id='wtw_tcommunitysearch' type='text' value='' size='15' maxlength='255' class='wtw-gotext' />\r\n";
			$zformdata .= "				<input id='wtw_bcommunitysearch' type='button' value='Go' onclick=\"wtw3dinternet.communitySearch(dGet('wtw_tcommunitysearch').value);\" class='wtw-gobutton' />\r\n";
			$zformdata .= "			</div>\r\n";
			$zformdata .= "			<div id='searchbuildingsdiv' class='wtw-searchbar'>\r\n";
			$zformdata .= "				<b>Search:</b> <input id='wtw_tbuildingsearch' type='text' value='' size='15' maxlength='255' class='wtw-gotext' />\r\n";
			$zformdata .= "				<input id='wtw_bbuildingsearch' type='button' value='Go' onclick=\"wtw3dinternet.buildingSearch(dGet('wtw_tbuildingsearch').value);\" class='wtw-gobutton' />\r\n";
			$zformdata .= "			</div>\r\n";
			$zformdata .= "			<div id='searchthingsdiv' class='wtw-searchbar'>\r\n";
			$zformdata .= "				<b>Search:</b> <input id='wtw_tthingsearch' type='text' value='' size='15' maxlength='255' class='wtw-gotext' />\r\n";
			$zformdata .= "				<input id='wtw_bthingsearch' type='button' value='Go' onclick=\"wtw3dinternet.thingSearch(dGet('wtw_tthingsearch').value);\" class='wtw-gobutton' />\r\n";
			$zformdata .= "			</div>\r\n";
			$zformdata .= "			<div id='searchavatarsdiv' class='wtw-searchbar'>\r\n";
			$zformdata .= "				<b>Search:</b> <input id='wtw_tavatarsearch' type='text' value='' size='15' maxlength='255' class='wtw-gotext' />\r\n";
			$zformdata .= "				<input id='wtw_bavatarsearch' type='button' value='Go' onclick=\"wtw3dinternet.avatarSearch(dGet('wtw_tavatarsearch').value);\" class='wtw-gobutton' />\r\n";
			$zformdata .= "			</div>\r\n";
			$zformdata .= "			<div id='searchpluginsdiv' class='wtw-searchbar'>\r\n";
			$zformdata .= "				<b>Search:</b> <input id='wtw_tpluginsearch' type='text' value='' size='15' maxlength='255' class='wtw-gotext' />\r\n";
			$zformdata .= "				<input id='wtw_bpluginsearch' type='button' value='Go' onclick=\"wtw3dinternet.pluginSearch(dGet('wtw_tpluginsearch').value);\" class='wtw-gobutton' />\r\n";
			$zformdata .= "			</div>\r\n";
			$zformdata .= "			<div class='wtw-searchdiv'>\r\n";
			$zformdata .= "				<div class='wtw-colicons'>\r\n";
			$zformdata .= "					<img id='wtw_downloadscol1' src='/content/system/images/col1.png' alt='1 Column' title='1 Column' class='wtw-tinyimg' onclick='wtw3dinternet.updateCols(this, 1);' />\r\n";
			$zformdata .= "					<img id='wtw_downloadscol2' src='/content/system/images/col2set.png' alt='2 Columns' title='2 Columns' class='wtw-tinyimgselected' onclick='wtw3dinternet.updateCols(this, 2);' />\r\n";
			$zformdata .= "					<img id='wtw_downloadscol3' src='/content/system/images/col3.png' alt='3 Columns' title='3 Columns' class='wtw-tinyimg' onclick='wtw3dinternet.updateCols(this, 3);' />\r\n";
			$zformdata .= "					<img id='wtw_downloadscol4' src='/content/system/images/col4.png' alt='4 Columns' title='4 Columns' class='wtw-tinyimg' onclick='wtw3dinternet.updateCols(this, 4);' />\r\n";
			$zformdata .= "				</div>\r\n";
			$zformdata .= "			</div>\r\n";
			$zformdata .= "		</div><div class='wtw-clear'></div><hr />\r\n";
			$zformdata .= "		<div style='width:100%;margin:0px;text-align:center;'>\r\n";
			$zformdata .= "			<!--img src='/content/system/images/wtwlogo.png' / -->\r\n";
			$zformdata .= "			<div id='wtw_selectwebform'>\r\n";

			$zformdata .= "				<div id='wtw_downloadingnotice' class='wtw-hide'></div>\r\n";

			$zformdata .= "				<div id='wtw_commtempsearchresults' style='margin-left:20px;text-align:left;overflow-y:auto;overflow-x:hidden;'></div>\r\n";
			$zformdata .= "				<div id='wtw_buildtempsearchresults' style='margin-left:20px;text-align:left;overflow-y:auto;overflow-x:hidden;'></div>\r\n";
			$zformdata .= "				<div id='wtw_thingtempsearchresults' style='margin-left:20px;text-align:left;overflow-y:auto;overflow-x:hidden;'></div>\r\n";
			$zformdata .= "				<div id='wtw_avatartempsearchresults' style='margin-left:20px;text-align:left;overflow-y:auto;overflow-x:hidden;'></div>\r\n";
			$zformdata .= "				<div id='wtw_plugintempsearchresults' style='margin-left:20px;text-align:left;overflow-y:auto;overflow-x:hidden;'></div>\r\n";
			$zformdata .= "				<div id='wtw_downloadcomplete' class='wtw-hide'>\r\n";
			$zformdata .= "					<h3 class='wtw-black'>Download Complete</h3><br />\r\n";
			$zformdata .= "					<div id='wtw_downloadcompletemessage'>You can find your <b>New 3D Community</b> in the <b>Admin Menu</b><br />or select from the following:</div><br />\r\n";
			$zformdata .= "					<input id='wtw_bopenwebdownload' type='button' value='Open Your New 3D Community in the Editor' onclick='' style='font-size:1.4em;border-radius:10px;cursor:pointer;' /><br /><br />\r\n";
			$zformdata .= "					<input id='wtw_bcontinuewebdownload' type='button' value='Continue Searching for Downloads' onclick='' style='font-size:1.4em;border-radius:10px;cursor:pointer;' /><br /><br />\r\n";
			$zformdata .= "					<input id='wtw_bclosewebdownload' type='button' value='Close WalkTheWeb Downloads' onclick='WTW.closeFullPageForm();' style='font-size:1.4em;border-radius:10px;cursor:pointer;' /><br /><br />\r\n";
			$zformdata .= "				</div>\r\n";
			$zformdata .= "			</div>\r\n";
			$zformdata .= "		</div><br />\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins-3dinternet.php-admin3dInternetWTWDownloadsForm=".$e->getMessage());
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

	public function addWebFromServerDiv($zwebtype) {
		/* div at the top of the Add 3D Web (webtype) menu selection */
		$zmenu = "";
		try {
			$zmenu .= "					<div class='wtw-localbuttonleftpad'></div><div id='wtw_".$zwebtype."buttonlocal' class='wtw-localbuttonselected wtw-leftradius' onclick=\"wtw3dinternet.showFranchise(this, '".$zwebtype."');\">Local</div><div class='wtw-localbuttonmiddlepad'> or </div><div id='wtw_".$zwebtype."buttoninternet' class='wtw-localbutton wtw-rightradius' onclick=\"wtw3dinternet.showFranchise(this, '".$zwebtype."');\">3D Internet</div><div class='wtw-localbuttonrightpad'></div>\r\n";
			$zmenu .= "					<div class='wtw-clear'></div>\r\n";
			$zmenu .= "					<div id='wtw_".$zwebtype."internetdiv' class='wtw-hide'>\r\n";
			$zmenu .= "						<h4 class='wtw-marginbottom'>Domain Name</h4>\r\n";
			$zmenu .= "						<div class='wtw-example'>(Example: 3d.walktheweb.com)</div><br />\r\n";
			$zmenu .= "						<input type='text' id='wtw_franchise".$zwebtype."search' maxlength='255' style='width:260px;' onclick=\"WTW.checkKey(this, 'webname', 1, 0);\" onkeyup=\"WTW.checkKey(this, 'webname', 1, 0);\" onblur=\"WTW.checkKey(this, 'webname', 1, 1);\" /><br /><br />\r\n";
			$zmenu .= "						<div id='wtw_bsearch".$zwebtype."franchises' class='wtw-greenbuttonbig' onclick=\"wtw3dinternet.getFranchiseList('".$zwebtype."');\">Search Franchises</div><br /><br />\r\n";
			$zmenu .= "					</div>\r\n";
			$zmenu .= "					<div class='wtw-clear'></div>\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins-3dinternet.php-addWebFromServerDiv=".$e->getMessage());
		}
		return $zmenu;
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
						) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
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
						) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
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
						) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
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
						) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
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
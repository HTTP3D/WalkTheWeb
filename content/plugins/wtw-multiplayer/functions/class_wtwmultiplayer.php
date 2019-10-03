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
			$this->initHooks();
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
			$this->define('WTWMULTIPLAYER_PATH', dirname(WTWMULTIPLAYER_FILE).'/');
			$this->define('WTWMULTIPLAYER_URL', $wtwplugins->contenturl.'/'.WTWMULTIPLAYER_PLUGIN);
			$this->define('WTWMULTIPLAYER_PREFIX', str_replace("wtw_wtw-","wtw_",wtw_tableprefix.WTWMULTIPLAYER_PLUGIN)."_");
			$this->define('WTWMULTIPLAYER_VERSION', $this->version);
		} catch (Exception $e) {
			$wtwplugins->serror("plugins-class_wtwmultiplayer.php-defineConstants=".$e->getMessage());
		}
	}

	public function initClass() {
		global $wtwplugins;
		try {
			echo "<script>console.log('LOADED MULTIPLAYER');</script>";

			
		} catch (Exception $e) {
			$wtwplugins->serror("plugins-class_wtwmultiplayer.php-initClass=".$e->getMessage());
		}
	}
	
	public function initHooks() {
		global $wtwplugins;
		
		if ($wtwplugins->pagename == "admin.php") {
			/* admin menu items */
			/* plugin class -> addAdminMenuItem function (menu item id, menu text, level 1 sort, level 1 id, level 2 sort, level 2 id, level 1 icon, allowed roles array, onclick JavaScript function) */
			$wtwplugins->addAdminMenuItem('wtw_adminmultiplayer', 'Multi Player', 91, 'wtw_multiplayer', 0, '', '/content/system/images/menumultiplayer.png', array('admin','developer'), null);
			$wtwplugins->addAdminMenuItem('wtw_adminmultiplayersettings', 'Settings', 91, 'wtw_multiplayer', 1, 'wtw_multiplayersettings', '', array('admin','developer'), "WTW.openFullPageForm('fullpage','Multiplayer Settings','wtw_multiplayersettingspage');");
			
			/* admin full page forms */
			/* plugin class -> addFullPageForm function (form id, allowed roles array, form html data) */
			$wtwplugins->addFullPageForm('wtw_multiplayersettingspage', array('admin','developer'), $this->adminMultiplayerSettingsForm());
		}
		/* browse menu (bottom) settings menu items */
		$wtwplugins->addSettingsMenuItem("wtw_menumultiplayer", "Multiplayer Settings", 50, "wtw_menumultiplayer", "/content/system/images/menumultiplayer.png", null, "WTW.showSettingsMenu('wtw_multiplayerform');");
		
		$wtwplugins->addMenuForm("wtw_multiplayerform", "Multiplayer Settings", $this->multiplayerSettingsForm(), null);
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
			$zformdata .= "	<li class=\"wtw-menuli\" onclick=\"WTW.toggleAvatarIDs();\"><img id=\"wtw_submenuavatarids\" src=\"/content/system/images/menuavataridson.png\" alt=\"Turn Avatar IDs Off\" title=\"Turn Avatar IDs Off\" class='wtw-menulefticon' /><span id=\"wtw_submenuavataridstext\">Avatar IDs are On</span></li>";
			$zformdata .= "	<li class=\"wtw-menuli\" onclick=\"WTW.toggleMultiPlayer();\"><img id=\"wtw_submenumultiplayer\" src=\"/content/system/images/menumultiplayer.png\" alt=\"Turn Multi-Player Off\" title=\"Turn Multi-Player Off\" class='wtw-menulefticon' /><span id=\"wtw_submenumultiplayertext\">Multi-Player is On</span></li>";
			$zformdata .= "</ul>";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins-class_wtwmultiplayer.php-multiplayerSettingsForm=".$e->getMessage());
		}
		return $zformdata;
	}
	
}

	function wtwmultiplayer() {
		return wtwmultiplayer::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwmultiplayer'] = wtwmultiplayer();

?>
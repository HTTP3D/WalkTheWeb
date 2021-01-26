<?php
class wtwadminmenu {
	/* $wtwadminmenu class for the menu functions for WalkTheWeb Websites when browsed from admin.php */
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {

	}	
	
	/* declare public $wtwadminmenu variables */
	public $adminmenu = array();
	public $adminsubmenu = array();
	public $admindivs = array();
	public $adminforms = array();
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	public function preloadAdminMenu() {
		/* admin menu is dynamically created and sorted before display */
		/* this allows plugins to add menu items tied to functions - then sorted and shown in proper order */
		global $wtwdb;
		global $wtw;
		$zsuccess = false;
		try {
			if (empty($wtwdb->getSessionUserID())) {
				header("Location: ".$wtw->domainurl."/"); 
				exit();
			} else {
				/* accessrequired - array of role names or null for all allowed */
				$updateroles = array("admin","developer","architect","graphics artist");
				$developerroles = array("admin","developer");
				$adminroles = array("admin");
				
				/* add admin menu item function: */
				/*	$zid = <div> id
					$ztitle = display name
					$zmenusort = int for sort order of menu (level 1)
					$zmenu = top level menu item
					$zsubmenusort = int for sort order of submenu (level 2)
					$zsubmenu = second level menu item (or '')
					$ziconurl = browse path to icon image (only applies to level 1 'menu')
					$zaccessrequired = array of roles that are granted access - null for all allowed
					$zjsfunction = javascript function to call for onclick event examples: WTW.show('divname');   or  myFunctionName('testthis');  or  MY.functionName();MY.secondFunction();
				*/
				$this->addAdminMenuItem('wtw_admindashboard', 'Dashboard', -100, 'wtw_dashboard', 0, '', '/content/system/images/menudashboard.png', null, "WTW.toggleAdminMenuDashboard();");
				$this->addAdminMenuItem('wtw_adminmenudashboard', 'Admin Home', -100, 'wtw_dashboard', 1, 'wtw_adminhome', '', null, "WTW.adminMenuItemSelected(this);");
				$this->addAdminMenuItem('wtw_adminmenuupdates', 'Updates', -100, 'wtw_dashboard', 2, 'wtw_updates', '', $developerroles, "WTW.openFullPageForm('updates','Check for Updates','');");
				
				$this->addAdminMenuItem('wtw_adminmedia', 'Media Library', -95, 'wtw_medialibrary', 0, '', '/content/system/images/menumedia.png', $updateroles, "WTW.toggleAdminMenuMediaLibrary();");
				$this->addAdminMenuItem('wtw_adminmediafiles', 'Files', -95, 'wtw_medialibrary', 1, 'wtw_viewfiles', '', $updateroles, "WTW.openFullPageForm('medialibrary','');WTW.setImageMenu(2);");
				$this->addAdminMenuItem('wtw_adminmediaobjects', '3D Models', -95, 'wtw_medialibrary', 2, 'wtw_viewobjects', '', $updateroles, "WTW.openFullPageForm('medialibrary','');WTW.setImageMenu(4);");
				$this->addAdminMenuItem('wtw_adminmediawtwdownloads', 'WalkTheWeb Downloads', -95, 'wtw_medialibrary', 3, 'wtw_viewwtwdownloads', '', $updateroles, "WTW.openFullPageForm('importpage','communities');");

				$this->addAdminMenuItem('wtw_admincommunities', '3D Communities', -90, 'wtw_communities', 0, '', '/content/system/images/menucommunities.png', $updateroles, "WTW.toggleAdminMenuLevel('communities');");
				$this->addAdminMenuItem('wtw_adminselectcommunity', 'Select 3D Community', -90, 'wtw_communities', 1, 'wtw_selectcommunity', '', $updateroles, "WTW.adminMenuItemSelected(this);");
				$this->addAdminMenuItem('wtw_adminaddcommunity', 'Add New 3D Community', -90, 'wtw_communities', 2, 'wtw_addcommunity', '', $updateroles, "WTW.adminMenuItemSelected(this);");
				$this->addAdminMenuItem('wtw_adminsettingscommunity', 'Options and Settings', -90, 'wtw_communities', 3, 'wtw_communitysettings', '', $updateroles, "WTW.adminMenuItemSelected(this);");
				$this->addAdminMenuItem('wtw_admineditcommunity', 'Edit 3D Community', -90, 'wtw_communities', 4, 'wtw_editcommunity', '', $updateroles, "WTW.adminMenuItemSelected(this);");
				
				$this->addAdminMenuItem('wtw_adminbuildings', '3D Buildings', -85, 'wtw_buildings', 0, '', '/content/system/images/menubuildings.png', $updateroles, "WTW.toggleAdminMenuLevel('buildings');");
				$this->addAdminMenuItem('wtw_adminselectbuilding', 'Select 3D Building', -85, 'wtw_buildings', 1, 'wtw_selectbuilding', '', $updateroles, "WTW.adminMenuItemSelected(this);");
				$this->addAdminMenuItem('wtw_adminaddbuilding', 'Add New 3D Building', -85, 'wtw_buildings', 2, 'wtw_addbuilding', '', $updateroles, "WTW.adminMenuItemSelected(this);");
				$this->addAdminMenuItem('wtw_adminsettingsbuilding', 'Options and Settings', -85, 'wtw_buildings', 3, 'wtw_buildingsettings', '', $updateroles, "WTW.adminMenuItemSelected(this);");
				$this->addAdminMenuItem('wtw_admineditbuilding', 'Edit 3D Building', -85, 'wtw_buildings', 4, 'wtw_editbuilding', '', $updateroles, "WTW.adminMenuItemSelected(this);");

				$this->addAdminMenuItem('wtw_adminthings', '3D Things', -80, 'wtw_things', 0, '', '/content/system/images/menuthings.png', $updateroles, "WTW.toggleAdminMenuLevel('things');");
				$this->addAdminMenuItem('wtw_adminselectthing', 'Select 3D Thing', -80, 'wtw_things', 1, 'wtw_selectthing', '', $updateroles, "WTW.adminMenuItemSelected(this);");
				$this->addAdminMenuItem('wtw_adminaddthing', 'Add New 3D Thing', -80, 'wtw_things', 2, 'wtw_addthing', '', $updateroles, "WTW.adminMenuItemSelected(this);");
				$this->addAdminMenuItem('wtw_adminsettingsthing', 'Options and Settings', -80, 'wtw_things', 3, 'wtw_thingsettings', '', $updateroles, "WTW.adminMenuItemSelected(this);");
				$this->addAdminMenuItem('wtw_admineditthing', 'Edit 3D Thing', -80, 'wtw_things', 4, 'wtw_editthing', '', $updateroles, "WTW.adminMenuItemSelected(this);");

				$this->addAdminMenuItem('wtw_adminplugins', '3D Plugins', 50, 'wtw_plugins', 0, '', '/content/system/images/menuplugin.png', $developerroles, "WTW.toggleAdminMenuLevel('plugins');");
				$this->addAdminMenuItem('wtw_adminallplugins', 'All Plugins', 50, 'wtw_plugins', 1, 'wtw_allplugins', '', $developerroles, "WTW.adminMenuItemSelected(this);");

				$this->addAdminMenuItem('wtw_adminusers', 'Users', 90, 'wtw_users', 0, '', '/content/system/images/menuprofile.png', $adminroles, "WTW.toggleAdminMenuLevel('users');");
				$this->addAdminMenuItem('wtw_adminuserlist', 'All Users', 90, 'wtw_users', 1, 'wtw_userlist', '', $adminroles, "WTW.adminMenuItemSelected(this);");

				$this->addAdminMenuItem('wtw_adminsettings', 'Settings', 100, 'wtw_settings', 0, '', '/content/system/images/menusettings.png', $developerroles, "WTW.toggleAdminMenuLevel('settings');");
				$this->addAdminMenuItem('wtw_adminserversettings', 'Server Settings', 100, 'wtw_settings', 1, 'wtw_serversettings', '', $adminroles, "WTW.adminMenuItemSelected(this);");
				$this->addAdminMenuItem('wtw_adminwebalias', 'Web Aliases', 100, 'wtw_settings', 2, 'wtw_webalias', '', $developerroles, "WTW.adminMenuItemSelected(this);");
				$this->addAdminMenuItem('wtw_adminemailserver', 'Email Server', 100, 'wtw_settings', 3, 'wtw_emailserver', '', $adminroles, "WTW.adminMenuItemSelected(this);");
				$this->addAdminMenuItem('wtw_adminapikeys', 'API Keys Access', 100, 'wtw_settings', 4, 'wtw_apikeys', '', $adminroles, "WTW.adminMenuItemSelected(this);");

				$this->addAdminMenuItem('wtw_admindevtools', 'Developer Tools', 998, 'wtw_devtools', 0, '', '/content/system/images/menutools.png', $developerroles, "WTW.toggleAdminMenuLevel('tools');");
				$this->addAdminMenuItem('wtw_adminavatarcamera', 'Avatar Camera ON', 998, 'wtw_devtools', 1, 'wtw_avatarcamera', '', $developerroles, "WTW.adminMenuItemSelected(this);");
				$this->addAdminMenuItem('wtw_adminfocus', 'Focus ON', 998, 'wtw_devtools', 2, 'wtw_focus', '', $developerroles, "WTW.adminMenuItemSelected(this);");
				$this->addAdminMenuItem('wtw_adminmerged', 'Merged Molds ON', 998, 'wtw_devtools', 3, 'wtw_merged', '', $developerroles, "WTW.adminMenuItemSelected(this);");
				$this->addAdminMenuItem('wtw_adminzones', 'Action Zones ON', 998, 'wtw_devtools', 4, 'wtw_zones', '', $developerroles, "WTW.adminMenuItemSelected(this);");
				$this->addAdminMenuItem('wtw_adminlines', 'Alignment Lines ON', 998, 'wtw_devtools', 5, 'wtw_lines', '', $developerroles, "WTW.adminMenuItemSelected(this);");
				$this->addAdminMenuItem('wtw_adminaxislabels', 'Axis Labels OFF', 998, 'wtw_devtools', 6, 'wtw_axislabels', '', $developerroles, "WTW.adminMenuItemSelected(this);");
				$this->addAdminMenuItem('wtw_adminloadedobjects', 'List Loaded Objects', 998, 'wtw_devtools', 10, 'wtw_loadedobjects', '', $developerroles, "WTW.adminMenuItemSelected(this);");

				if (!empty($wtw->communityid) || !empty($wtw->buildingid) || !empty($wtw->thingid) || !empty($wtw->avatarid)) {
					$this->addAdminMenuItem('wtw_admincloseproject', 'Close 3D Project', 999, 'wtw_admincloseproject', 0, '', '/content/system/images/menuclosedoor.png', $updateroles, "WTW.adminMenuItemSelected(this);");
				}
				$this->addAdminMenuItem('wtw_adminexit', 'Exit Admin', 1000, 'wtw_adminexit', 0, '', '/content/system/images/menuexit.png', null, "WTW.adminMenuItemSelected(this);");

			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwadminmenu.php-addAdminMenuItem=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function preloadAdminSubMenu() {
		/* submenus are called as toggle on/off under main menu items */
		global $wtwdb;
		global $wtw;
		$zsuccess = false;
		try {
			/* accessrequired - array of role names or null for all allowed */
			$zupdateroles = array("admin","developer","architect","graphics artist");
			$zdeveloperroles = array("admin","developer");
			
			/* add admin sub menu item function: */
			/*	$zmenu = name for group of menu items
				$zid = <div> id
				$ztitle = display name
				$zsubmenusort = int for sort order of submenu
				$zaccessrequired = array of roles that are granted access - null for all allowed
				$zjsfunction = javascript function to call for onclick event examples: WTW.show('divname');   or  myFunctionName('testthis');  or  MY.functionName();MY.secondFunction();
			*/

			$this->addAdminSubMenuItem('buildingoptions', 'wtw_adminbuildinginfo', '<div class="wtw-altkey">ctrl+i</div>3D Building <u>I</u>nformation', 5, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('buildingoptions', 'wtw_adminbuildingrequirements', '<div class="wtw-altkey">ctrl+r</div><u>R</u>atings and Requirements', 6, $zupdateroles, "WTW.openFullPageForm('fullpage','Ratings and Requirements', 'wtw_requirementspage');WTW.openRequirements();");
			$this->addAdminSubMenuItem('buildingoptions', 'wtw_adminbuildingstart', '<div class="wtw-altkey">ctrl+s</div>Set <u>S</u>tarting Position', 10, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('buildingoptions', 'wtw_adminbuildingaccess', '<div class="wtw-altkey">ctrl+p</div><u>P</u>ermissions', 15, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('buildingoptions', 'wtw_adminbuildingsnapshot', '<div class="wtw-altkey">ctrl+a</div>3D Building Sn<u>a</u>pshot', 20, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('buildingoptions', '', '<hr class="wtw-menuhr" />', 50, $zupdateroles, "");
			$this->addAdminSubMenuItem('buildingoptions', 'wtw_adminbuildingcopy', '<div class="wtw-altkey">ctrl+c</div><u>C</u>opy 3D Building', 55, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			 $this->addAdminSubMenuItem('buildingoptions', 'wtw_adminbuildingshare', '<div class="wtw-altkey">ctrl+h</div>S<u>h</u>are 3D Building', 60, $zupdateroles, "WTW.adminMenuItemSelected(this);"); 
			$this->addAdminSubMenuItem('buildingoptions', 'wtw_adminbuildingdelete', '<div class="wtw-altkey">ctrl+del</div>Delete 3D Building', 100, $zupdateroles, "WTW.adminMenuItemSelected(this);");

			$this->addAdminSubMenuItem('editbuilding', 'wtw_adminbuildingaddblock', '<div class="wtw-altkey">ctrl+b</div>Add 3D Building <u>B</u>lock', 10, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('editbuilding', 'wtw_adminbuildingaddweb', '<div class="wtw-altkey">ctrl+o</div>Add 3D Web <u>O</u>bject', 20, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('editbuilding', 'wtw_adminbuildingaddthing', '<div class="wtw-altkey">ctrl+h</div>Add 3D T<u>h</u>ing', 30, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('editbuilding', 'wtw_adminbuildingactionzones', '<div class="wtw-altkey">ctrl+a</div>Add or Edit <u>A</u>ctions', 40, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('editbuilding', '', '<hr class="wtw-menuhr" />', 999, $zupdateroles, "");
			$this->addAdminSubMenuItem('editbuilding', 'wtw_adminbuildingrecover', '<div class="wtw-altkey">ctrl+r</div><u>R</u>ecover Deleted Items', 1000, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			
			$this->addAdminSubMenuItem('editmold', 'wtw_createduplicatemold', '<div class="wtw-altkey">ctrl+p</div>Create a Duplicate Item', 50, $zupdateroles, "WTW.adminMenuItemSelected(this);");

			$this->addAdminSubMenuItem('communityoptions', 'wtw_admincommunityinfo', '<div class="wtw-altkey">ctrl+i</div>3D Community <u>I</u>nformation', 5, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('communityoptions', 'wtw_admincommunityrequirements', '<div class="wtw-altkey">ctrl+r</div><u>R</u>atings and Requirements', 6, $zupdateroles, "WTW.openFullPageForm('fullpage','Ratings and Requirements', 'wtw_requirementspage');WTW.openRequirements();");
			$this->addAdminSubMenuItem('communityoptions', 'wtw_admincommunitystart', '<div class="wtw-altkey">ctrl+s</div>Set <u>S</u>tarting Position', 10, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('communityoptions', 'wtw_admincommunityfirstbuilding', '<div class="wtw-altkey">ctrl+f</div>Set <u>F</u>irst 3D Building', 15, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('communityoptions', 'wtw_admincommunitygravity', '<div class="wtw-altkey">ctrl+g</div>3D Community <u>G</u>ravity', 20, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('communityoptions', 'wtw_admincommunityaccess', '<div class="wtw-altkey">ctrl+p</div><u>P</u>ermissions', 25, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('communityoptions', 'wtw_admincommunitysnapshot', '<div class="wtw-altkey">ctrl+a</div>3D Community Sn<u>a</u>pshot', 30, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('communityoptions', '', '<hr class="wtw-menuhr" />', 50, $zupdateroles, "");
			$this->addAdminSubMenuItem('communityoptions', 'wtw_admincommunitycopy', '<div class="wtw-altkey">ctrl+c</div><u>C</u>opy 3D Community', 55, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('communityoptions', 'wtw_admincommunityshare', '<div class="wtw-altkey">ctrl+h</div>S<u>h</u>are 3D Community', 60, $zupdateroles, "WTW.adminMenuItemSelected(this);"); 
			$this->addAdminSubMenuItem('communityoptions', 'wtw_admincommunitydelete', '<div class="wtw-altkey">ctrl+del</div>Delete 3D Community', 100, $zupdateroles, "WTW.adminMenuItemSelected(this);");

			$this->addAdminSubMenuItem('editcommunity', 'wtw_admincommunityaddblock', '<div class="wtw-altkey">ctrl+b</div>Add 3D Building <u>B</u>lock', 10, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('editcommunity', 'wtw_admincommunityaddweb', '<div class="wtw-altkey">ctrl+o</div>Add 3D Web <u>O</u>bject', 20, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('editcommunity', 'wtw_admincommunityaddbuilding', '<div class="wtw-altkey">ctrl+u</div>Add 3D B<b>u</b>ilding', 30, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('editcommunity', 'wtw_admincommunityaddthing', '<div class="wtw-altkey">ctrl+h</div>Add 3D T<u>h</u>ing', 30, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('editcommunity', 'wtw_admincommunityactionzones', '<div class="wtw-altkey">ctrl+a</div>Add or Edit <u>A</u>ctions', 40, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('editcommunity', '', '<hr class="wtw-menuhr" />', 60, $zupdateroles, "");
			$this->addAdminSubMenuItem('editcommunity', 'wtw_admincommunitylandscape', '<div class="wtw-altkey">ctrl+l</div>Edit <u>L</u>andscape and Scene', 65, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('editcommunity', '', '<hr class="wtw-menuhr" />', 100, $zupdateroles, "");
			$this->addAdminSubMenuItem('editcommunity', 'wtw_admincommunityrecover', '<div class="wtw-altkey">ctrl+r</div><u>R</u>ecover Deleted Items', 1000, $zupdateroles, "WTW.adminMenuItemSelected(this);");

			$this->addAdminSubMenuItem('editlandscape', 'wtw_adminlandscapesky', 'Sky', 10, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('editlandscape', 'wtw_adminlandscapeground', 'Extended Ground', 20, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('editlandscape', 'wtw_adminlandscapewater', 'Water Depth', 30, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('editlandscape', 'wtw_adminlandscapegravity', 'Gravity', 40, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('editlandscape', 'wtw_adminlandscapeterrain', 'Add Ground Terrain', 50, $zupdateroles, "WTW.adminMenuItemSelected(this);");

			$this->addAdminSubMenuItem('thingoptions', 'wtw_adminthinginfo', '<div class="wtw-altkey">ctrl+i</div>3D Thing <u>I</u>nformation', 5, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('thingoptions', 'wtw_adminthingrequirements', '<div class="wtw-altkey">ctrl+r</div><u>R</u>atings and Requirements', 6, $zupdateroles, "WTW.openFullPageForm('fullpage','Ratings and Requirements', 'wtw_requirementspage');WTW.openRequirements();");
			$this->addAdminSubMenuItem('thingoptions', 'wtw_adminthingstart', '<div class="wtw-altkey">ctrl+s</div>Set <u>S</u>tarting Position', 10, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('thingoptions', 'wtw_adminthingaccess', '<div class="wtw-altkey">ctrl+p</div><u>P</u>ermissions', 15, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('thingoptions', 'wtw_adminthingsnapshot', '<div class="wtw-altkey">ctrl+a</div>3D Thing Sn<u>a</u>pshot', 20, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('thingoptions', '', '<hr class="wtw-menuhr" />', 50, $zupdateroles, "");
			$this->addAdminSubMenuItem('thingoptions', 'wtw_adminthingcopy', '<div class="wtw-altkey">ctrl+c</div><u>C</u>opy 3D Thing', 55, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('thingoptions', 'wtw_adminthingshare', '<div class="wtw-altkey">ctrl+h</div>S<u>h</u>are 3D Thing', 60, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('thingoptions', 'wtw_adminthingdelete', '<div class="wtw-altkey">ctrl+del</div>Delete 3D Thing', 100, $zupdateroles, "WTW.adminMenuItemSelected(this);");

			$this->addAdminSubMenuItem('editthing', 'wtw_adminthingaddblock', '<div class="wtw-altkey">ctrl+b</div>Add 3D Building <u>B</u>lock', 10, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('editthing', 'wtw_adminthingaddweb', '<div class="wtw-altkey">ctrl+o</div>Add 3D Web <u>O</u>bject', 20, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('editthing', 'wtw_adminthingactions', '<div class="wtw-altkey">ctrl+a</div>Add or Edit <u>A</u>ctions', 40, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('editthing', '', '<hr class="wtw-menuhr" />', 100, $zupdateroles, "");
			$this->addAdminSubMenuItem('editthing', 'wtw_adminthingrecover', '<div class="wtw-altkey">ctrl+r</div><u>R</u>ecover Deleted Items', 1000, $zupdateroles, "WTW.adminMenuItemSelected(this);");

			$this->addAdminSubMenuItem('devlistobjects', 'wtw_listmeshes', 'List Current Meshes', 10, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('devlistobjects', 'wtw_listcgs', 'List Connecting Grids', 20, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('devlistobjects', 'wtw_listazs', 'List Action Zones', 30, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('devlistobjects', 'wtw_listcommmolds', 'List Community Molds', 40, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('devlistobjects', 'wtw_listbuildmolds', 'List Building Molds', 50, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('devlistobjects', 'wtw_listthingmolds', 'List Thing Molds', 60, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('devlistobjects', 'wtw_listautomations', 'List Automations', 70, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('devlistobjects', 'wtw_listloadeduploads', 'List Loaded Uploads', 80, $zupdateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminSubMenuItem('devlistobjects', 'wtw_listmyavatarlocation', 'My Avatar Location', 90, $zupdateroles, "WTW.adminMenuItemSelected(this);");

		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwadminmenu.php-preloadAdminSubMenu=".$e->getMessage());
		}
		return $zsuccess;
	}

	public function addAdminMenuItem($zid, $ztitle, $zmenusort, $zmenu, $zsubmenusort, $zsubmenu, $ziconurl, $zaccessrequired, $zjsfunction) {
		/* add admin menu item function: */
		/*	$zid = <div> id
			$ztitle = display name
			$zmenusort = int for sort order of menu (level 1)
			$zmenu = top level menu item
			$zsubmenusort = int for sort order of submenu (level 2)
			$zsubmenu = second level menu item (or '')
			$ziconurl = browse path to icon image (only applies to level 1 'menu')
			$zaccessrequired = array of roles that are granted access - null for all allowed
			$zjsfunction = javascript function to call for onclick event examples: WTW.show('divname');   or  myFunctionName('testthis');  or  MY.functionName();MY.secondFunction();
		*/
		global $wtwdb;
		$zsuccess = false;
		try {
			/* check if loaded to avoid duplicate ids */
			$zfound = false;
			foreach ($this->adminmenu as $zadminmenuitems) {
				if (isset($zadminmenuitems["id"]) && !empty($zadminmenuitems["id"])) {
					if ($zadminmenuitems["id"] == $zid) {
						$zfound = true;
					}
				}
			}
			if ($zfound == false) {
				/* add menu item to the array */
				$zmenuitem = array(
					'menu' => $zmenu, 
					'id' => $zid,
					'title' => $ztitle,
					'menusort' => $zmenusort, 
					'submenusort' => $zsubmenusort, 
					'submenu' => $zsubmenu, 
					'iconurl' => $ziconurl, 
					'accessrequired' => $zaccessrequired, 
					'jsfunction' => $zjsfunction
				);
				$this->adminmenu[count($this->adminmenu)] = $zmenuitem;
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwadminmenu.php-addAdminMenuItem=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function getAdminMenu() {
		/* get admin menu array, sort, and return html text for display on admin.php page */
		global $wtw;
		global $wtwdb;
		$zadminmenu = "";
		try {
			$adminmenuarray = $this->adminmenu;
			/* make sure submenu items have matching menu sort index */
			array_multisort(array_column($adminmenuarray, 'menu'),  SORT_ASC,
                array_column($adminmenuarray, 'submenusort'), SORT_ASC,
                $adminmenuarray);
			$ztempmenu = "";
			$ztempmenusort = "";
			foreach ($adminmenuarray as $zmenuitem) {
				if ($ztempmenu != $zmenuitem["menu"]) {
					$ztempmenusort = $zmenuitem["menusort"];
				} else {
					$zmenuitem["menusort"] = $ztempmenusort;
				}
			} 
			/* sort menu and submenus */
			array_multisort(array_column($adminmenuarray, 'menusort'),  SORT_ASC,
                array_column($adminmenuarray, 'submenusort'), SORT_ASC,
                $adminmenuarray);
			/* display menu */
			$ztempmenu = "";
			$ztempid = "";
			/* read each value, validate data, and create html menu items */
			foreach ($adminmenuarray as $zmenuitem) {
				$zid = $zmenuitem["id"];
				$ztitle = $zmenuitem["title"];
				$zmenusort = $zmenuitem["menusort"];
				$zmenu = $zmenuitem["menu"];
				$zsubmenusort = $zmenuitem["submenusort"];
				$zsubmenu = $zmenuitem["submenu"];
				$ziconurl = $zmenuitem["iconurl"];
				$zaccessrequired = $zmenuitem["accessrequired"]; /* array of allowed roles */
				$zjsfunction = $zmenuitem["jsfunction"];
				if ($wtwdb->hasPermission($zaccessrequired)) {
					/* check for invalid entries */
					if (empty($zid) | !isset($zid)) {
						$zid = $wtwdb->getRandomString(5,1);
					}
					if (empty($ztitle) | !isset($ztitle)) {
						$ztitle = 'Menu Item';
					}
					if (empty($ziconurl) | !isset($ziconurl)) {
						$ziconurl = "/content/system/images/menuarrow.png";
					}
					if (empty($zjsfunction) || !isset($zjsfunction)) {
						$zjsfunction = '';
					}
					if ($ztempmenu != $zmenu) {
						if (!empty($ztempmenu)) {
							$zadminmenu .= "</div>";
						}
						$ztempid = $zid;
						$zadminmenu .= "<div id=\"".$zid."\" class=\"wtw-adminmenu\" onclick=\"WTW.adminOpenSubmenu(this);".$zjsfunction."\">";
						$zadminmenu .= "<img src=\"".$ziconurl."\" alt=\"".$ztitle."\" title=\"".$ztitle."\" class='wtw-menulefticon' />";
						$zadminmenu .= "<div id=\"".$zid."badge\" class=\"wtw-badge\"></div>".$ztitle."</div>";
						/* prep for submenu items */
						$zadminmenu .= "<div id=\"".$zid."div\" class=\"wtw-adminmenudiv\" style=\"display:none;\">";
					}
					if (!empty($zsubmenu) && isset($zsubmenu)) {
						$zadminmenu .= "<div id=\"".$zid."\" class=\"wtw-adminsubmenu\" onclick=\"".$zjsfunction."\"><div id=\"".$zid."badge\" class=\"wtw-badge\"></div>".$ztitle."</div>";
					}
					$ztempmenu = $zmenu;
				}
			}
			if (count($this->adminmenu) > 0) {
				$zadminmenu .= "</div>";
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwadminmenu.php-getAdminMenu=".$e->getMessage());
		}
		return $zadminmenu;
	}

	public function addAdminSubMenuItem($zmenu, $zid, $ztitle, $zsubmenusort, $zaccessrequired, $zjsfunction) {
		/* add admin sub menu item function: */
		/*	$zmenu = name for group of menu items
			$zid = <div> id
			$ztitle = display name
			$zsubmenusort = int for sort order of submenu
			$zaccessrequired = array of roles that are granted access - null for all allowed
			$zjsfunction = javascript function to call for onclick event examples: WTW.show('divname');   or  myFunctionName('testthis');  or  MY.functionName();MY.secondFunction();
		*/
		global $wtwdb;
		$zsuccess = false;
		try {
			/* check if loaded to avoid duplicate ids */
			$zfound = false;
			foreach ($this->adminsubmenu as $zadminsubmenuitems) {
				if (isset($zadminsubmenuitems["id"]) && !empty($zadminsubmenuitems["id"])) {
					if ($zadminsubmenuitems["id"] == $zid) {
						$zfound = true;
					}
				}
			}
			if ($zfound == false) {
				/* add submenu item to the array */
				$zsubmenuitem = array(
					'menu' => $zmenu, 
					'id' => $zid,
					'title' => $ztitle,
					'submenusort' => $zsubmenusort, 
					'accessrequired' => $zaccessrequired, 
					'jsfunction' => $zjsfunction
				);
				$this->adminsubmenu[count($this->adminsubmenu)] = $zsubmenuitem;
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwadminmenu.php-addAdminSubMenuItem=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function getAdminSubMenu($zselectmenu) {
		/* get admin menu array, sort, and return html text for display on admin.php page */
		global $wtw;
		global $wtwdb;
		$zadminsubmenu = "";
		try {
			$adminmenuarray = $this->adminsubmenu;
			/* make sure submenu items have matching menu sort index */
			array_multisort(array_column($adminmenuarray, 'menu'),  SORT_ASC,
                array_column($adminmenuarray, 'submenusort'), SORT_ASC,
                $adminmenuarray);
			/* read each value, validate data, and create html menu items */
			foreach ($adminmenuarray as $zmenuitem) {
				$zmenu = $zmenuitem["menu"];
				$zid = $zmenuitem["id"];
				$ztitle = $zmenuitem["title"];
				$zsubmenusort = $zmenuitem["submenusort"];
				$zaccessrequired = $zmenuitem["accessrequired"]; /* array of allowed roles */
				$zjsfunction = $zmenuitem["jsfunction"];
				if ($wtwdb->hasPermission($zaccessrequired) && $zmenu == $zselectmenu) {
					/* check for invalid entries */
					if (empty($zid) | !isset($zid)) {
						$zid = $wtwdb->getRandomString(5,1);
					}
					if (empty($ztitle) | !isset($ztitle)) {
						$ztitle = 'Menu Item';
					}
					if (empty($zjsfunction) || !isset($zjsfunction)) {
						$zjsfunction = '';
					}
					$zadminsubmenu .= "<div id=\"".$zid."\" class=\"wtw-menulevel0\" onclick=\"WTW.adminOpenSubmenuForm(this);".$zjsfunction."\">".$ztitle."</div>";
				}
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwadminmenu.php-getAdminSubMenu=".$e->getMessage());
		}
		return $zadminsubmenu;
	}

	public function addAdminMenuForm($zformid, $ztitle, $zformdata, $zaccessrequired) {
		/* some menu items display a complete form */
		/* this allows forms to be added dynamically from plugins */
		global $wtwdb;
		$zsuccess = false;
		try {
			/* check for duplicate ids */
			$zfound = false;
			foreach ($this->adminforms as $zadminform) {
				if (isset($zadminform["formid"]) && !empty($zadminform["formid"])) {
					if ($zadminform["formid"] == $zformid) {
						$zfound = true;
					}
				}
			}
			if ($zfound == false) {
				/* add form to array of forms */
				$zform = array(
					'formid' => $zformid,
					'title' => $ztitle,
					'formdata' => $zformdata,
					'accessrequired' => $zaccessrequired
				);
				$this->adminforms[count($this->adminforms)] = $zform;
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-addAdminMenuForm=".$e->getMessage());
		}
		return $zsuccess;
	}	
	
	public function getAdminMenuForms() {
		/* retrieve the admin menu forms to be displayed in html on the admin.php page */
		/* forms start with display:none and visibility:hidden until called */
		global $wtwdb;
		$zmenuforms = "";
		try {
			foreach ($this->adminforms as $zform) {
				$zformid = $zform["formid"];
				$ztitle = $zform["title"];
				$zaccessrequired = $zform["accessrequired"]; /* array of allowed roles */
				$zformdata = $zform["formdata"];
				if ($wtwdb->hasPermission($zaccessrequired) || empty($zaccessrequired) || !isset($zaccessrequired)) {
					/* check for invalid entries */
					if (empty($zformid) | !isset($zformid)) {
						$zformid = $wtwdb->getRandomString(6,1);
					}
					if (empty($zformdata) || !isset($zformdata)) {
						$zformdata = '';
					}
					/* this wraps your form data with a title and close form links */
					if (!empty($zformdata) && isset($zformdata)) {
						$zmenuforms .= "<div id=\"".$zformid."\" class=\"wtw-adminmenuform\" style=\"display:none;visibility:hidden;\">";
						$zmenuforms .= "	<div id=\"wtw_bback".$zformid."\" alt=\"Back\" title=\"Back\" class=\"wtw-backbutton\" onclick=\"WTW.adminMenuItemSelected(this);\">&lt;&lt;</div>";
						$zmenuforms .= "	<div class=\"wtw-menuheader\">".$ztitle."</div><br />";
						$zmenuforms .= $zformdata;
						$zmenuforms .= "</div>";
					}
				}
			}			
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getAdminMenuForms=".$e->getMessage());
		}
		return $zmenuforms;
	}	

	public function addAdminMenuDiv($zformlocation, $zdivid, $zdivdata, $zaccessrequired) {
		/* this allows a div to be added to an admin menu item */
		global $wtwdb;
		$zsuccess = false;
		try {
			/* check for duplicate ids */
			$zfound = false;
			foreach ($this->admindivs as $zadminform) {
				if (isset($zadminform["divid"]) && !empty($zadminform["divid"])) {
					if ($zadminform["divid"] == $zdivid) {
						$zfound = true;
					}
				}
			}
			if ($zfound == false) {
				/* add admin div area to the array of admin divs */
				$zdiv = array(
					'formlocation' => $zformlocation,
					'divid' => $zdivid,
					'divdata' => $zdivdata,
					'accessrequired' => $zaccessrequired
				);
				
				$this->admindivs[count($this->admindivs)] = $zdiv;
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-addAdminMenuDiv=".$e->getMessage());
		}
		return $zsuccess;
	}	

	public function getAdminMenuDivs($zformlocation) {
		/* get html for the admin menu divs by form location (where in the menu it will reside) */
		global $wtwdb;
		$zmenudivs = "";
		try {
			foreach ($this->admindivs as $zdiv) {
				$zdivformlocation = $zdiv["formlocation"];
				if ($zdivformlocation == $zformlocation) {
					$zdivid = $zdiv["divid"];
					$zaccessrequired = $zdiv["accessrequired"]; /* array of allowed roles */
					$zdivdata = $zdiv["divdata"];
					if ($wtwdb->hasPermission($zaccessrequired) || empty($zaccessrequired) || !isset($zaccessrequired)) {
						/* check for invalid entries */
						if (empty($zdivid) | !isset($zdivid)) {
							$zdivid = $wtwdb->getRandomString(6,1);
						}
						if (empty($zdivdata) || !isset($zdivdata)) {
							$zdivdata = '';
						}
						if (!empty($zdivdata) && isset($zdivdata)) {
							$zmenudivs .= $zdivdata;
						}
					}
				}
			}			
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getAdminMenuDivs=".$e->getMessage());
		}
		return $zmenudivs;
	}	

}

	function wtwadminmenu() {
		return wtwadminmenu::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwadminmenu'] = wtwadminmenu();	

?>
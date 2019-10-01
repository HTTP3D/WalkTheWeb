<?php
class wtwadminmenu {
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {

	}	
	
	public $adminmenu = array();
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	public function preloadAdminMenu() {
		global $wtwdb;
		global $wtw;
		$zsuccess = false;
		try {
			/* accessrequired - array of role names or null for all allowed */
			$updateroles = array("admin","developer","architect","graphics artist");
			$developerroles = array("admin","developer");
			$adminroles = array("admin");
			$this->addAdminMenuItem('wtw_admindashboard', 'Dashboard', -100, 'wtw_dashboard', 0, '', '/content/system/images/menudashboard.png', null, "WTW.toggleAdminMenuDashboard();");
			$this->addAdminMenuItem('wtw_adminmenudashboard', 'Admin Home', -100, 'wtw_dashboard', 1, 'wtw_adminhome', '', null, "WTW.adminMenuItemSelected(this);");
			$this->addAdminMenuItem('wtw_adminmenuupdates', 'Updates', -100, 'wtw_dashboard', 2, 'wtw_updates', '', $developerroles, "WTW.openFullPageForm('updates','Check for Updates','');");
			
			$this->addAdminMenuItem('wtw_adminmedia', 'Media Library', -95, 'wtw_medialibrary', 0, '', '/content/system/images/menumedia.png', $updateroles, "WTW.toggleAdminMenuMediaLibrary();");

			$this->addAdminMenuItem('wtw_admincommunities', 'My 3D Communities', -90, 'wtw_communities', 0, '', '/content/system/images/menucommunities.png', $updateroles, "WTW.toggleAdminMenuLevel('communities');");
			$this->addAdminMenuItem('wtw_adminselectcommunity', 'Select 3D Community', -90, 'wtw_communities', 1, 'wtw_selectcommunity', '', $updateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminMenuItem('wtw_adminaddcommunity', 'Add New 3D Community', -90, 'wtw_communities', 2, 'wtw_addcommunity', '', $updateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminMenuItem('wtw_adminsettingscommunity', 'Options and Settings', -90, 'wtw_communities', 3, 'wtw_communitysettings', '', $updateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminMenuItem('wtw_admineditcommunity', 'Edit 3D Community', -90, 'wtw_communities', 4, 'wtw_editcommunity', '', $updateroles, "WTW.adminMenuItemSelected(this);");
			
			$this->addAdminMenuItem('wtw_adminbuildings', 'My 3D Buildings', -85, 'wtw_buildings', 0, '', '/content/system/images/menubuildings.png', $updateroles, "WTW.toggleAdminMenuLevel('buildings');");
			$this->addAdminMenuItem('wtw_adminselectbuilding', 'Select 3D Building', -85, 'wtw_buildings', 1, 'wtw_selectbuilding', '', $updateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminMenuItem('wtw_adminaddbuilding', 'Add New 3D Building', -85, 'wtw_buildings', 2, 'wtw_addbuilding', '', $updateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminMenuItem('wtw_adminsettingsbuilding', 'Options and Settings', -85, 'wtw_buildings', 3, 'wtw_buildingsettings', '', $updateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminMenuItem('wtw_admineditbuilding', 'Edit 3D Building', -85, 'wtw_buildings', 4, 'wtw_editbuilding', '', $updateroles, "WTW.adminMenuItemSelected(this);");

			$this->addAdminMenuItem('wtw_adminthings', 'My 3D Things', -80, 'wtw_things', 0, '', '/content/system/images/menuthings.png', $updateroles, "WTW.toggleAdminMenuLevel('things');");
			$this->addAdminMenuItem('wtw_adminselectthing', 'Select 3D Thing', -80, 'wtw_things', 1, 'wtw_selectthing', '', $updateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminMenuItem('wtw_adminaddthing', 'Add New 3D Thing', -80, 'wtw_things', 2, 'wtw_addthing', '', $updateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminMenuItem('wtw_adminsettingsthing', 'Options and Settings', -80, 'wtw_things', 3, 'wtw_thingsettings', '', $updateroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminMenuItem('wtw_admineditthing', 'Edit 3D Thing', -80, 'wtw_things', 4, 'wtw_editthing', '', $updateroles, "WTW.adminMenuItemSelected(this);");

			$this->addAdminMenuItem('wtw_adminusers', 'Users', 50, 'wtw_users', 0, '', '/content/system/images/menuprofile.png', $adminroles, "WTW.toggleAdminMenuLevel('users');");
			$this->addAdminMenuItem('wtw_adminuserlist', 'All Users<!--1-->', 50, 'wtw_users', 1, 'wtw_userlist', '', $adminroles, "WTW.adminMenuItemSelected(this);");

			$this->addAdminMenuItem('wtw_adminplugins', 'Plugins', 90, 'wtw_plugins', 0, '', '/content/system/images/menuplugin.png', $developerroles, "WTW.toggleAdminMenuLevel('plugins');");
			$this->addAdminMenuItem('wtw_adminallplugins', 'All Plugins', 90, 'wtw_plugins', 1, 'wtw_allplugins', '', $developerroles, "WTW.adminMenuItemSelected(this);");

			$this->addAdminMenuItem('wtw_adminsettings', 'Settings', 100, 'wtw_settings', 0, '', '/content/system/images/menusettings.png', $developerroles, "WTW.toggleAdminMenuLevel('settings');");
			$this->addAdminMenuItem('wtw_adminwebalias', 'Web Aliases', 100, 'wtw_settings', 1, 'wtw_webalias', '', $developerroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminMenuItem('wtw_adminemailserver', 'Email Server', 100, 'wtw_settings', 2, 'wtw_emailserver', '', $adminroles, "WTW.adminMenuItemSelected(this);");

			$this->addAdminMenuItem('wtw_admindevtools', 'Developer Tools', 998, 'wtw_devtools', 0, '', '/content/system/images/menutools.png', $developerroles, "WTW.toggleAdminMenuLevel('tools');");
			$this->addAdminMenuItem('wtw_admingravity', 'Gravity ON', 998, 'wtw_devtools', 1, 'wtw_gravity', '', $developerroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminMenuItem('wtw_adminfocus', 'Focus ON', 998, 'wtw_devtools', 2, 'wtw_focus', '', $developerroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminMenuItem('wtw_adminwall', 'Wall Collisions ON', 998, 'wtw_devtools', 3, 'wtw_wall', '', $developerroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminMenuItem('wtw_adminavatarcamera', 'Avatar Camera ON', 998, 'wtw_devtools', 4, 'wtw_avatarcamera', '', $developerroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminMenuItem('wtw_adminmerged', 'Merged Molds ON', 998, 'wtw_devtools', 5, 'wtw_merged', '', $developerroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminMenuItem('wtw_adminzones', 'Action Zones ON', 998, 'wtw_devtools', 6, 'wtw_zones', '', $developerroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminMenuItem('wtw_adminlines', 'Alignment Lines ON', 998, 'wtw_devtools', 7, 'wtw_lines', '', $developerroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminMenuItem('wtw_adminaxislabels', 'Axis Labels OFF', 998, 'wtw_devtools', 8, 'wtw_axislabels', '', $developerroles, "WTW.adminMenuItemSelected(this);");
			$this->addAdminMenuItem('wtw_adminloadedobjects', 'List Loaded Objects', 998, 'wtw_devtools', 10, 'wtw_loadedobjects', '', $developerroles, "WTW.adminMenuItemSelected(this);");

			if (!empty($wtw->communityid) || !empty($wtw->buildingid) || !empty($wtw->thingid)) {
				$this->addAdminMenuItem('wtw_admincloseproject', 'Close 3D Project', 999, 'wtw_admincloseproject', 0, '', '/content/system/images/menuclosedoor.png', $updateroles, "WTW.adminMenuItemSelected(this)");
			}
			$this->addAdminMenuItem('wtw_adminexit', 'Exit Admin', 1000, 'wtw_adminexit', 0, '', '/content/system/images/menuexit.png', null, "WTW.adminMenuItemSelected(this)");
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwadminmenu.php-addAdminMenuItem=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function addAdminMenuItem($zid, $ztitle, $zmenusort, $zmenu, $zsubmenusort, $zsubmenu, $ziconurl, $zaccessrequired, $zjsfunction) {
		global $wtw;
		global $wtwdb;
		$zsuccess = false;
		try {
			/*	$zid = <div> id
				$ztitle = display name
				$zmenusort = int for sort order of menu (level 1)
				$zmenu = top level menu item
				$zsubmenusort = int for sort order of submenu (level 2)
				$zsubmenu = second level menu item (or '')
				$ziconurl = browse path to icon image (only applies to level 'menu')
				$zaccessrequired = array of roles that are granted access - null for all allowed
				$zjsfunction = javascript function to call for onclick event examples: WTW.show();   or  myFunctionName('testthis');  or  MY.functionName();MY.secondFunction();
			*/
			$zmenuitem = array(
				'id' => $zid,
				'title' => $ztitle,
				'menusort' => $zmenusort, 
				'menu' => $zmenu, 
				'submenusort' => $zsubmenusort, 
				'submenu' => $zsubmenu, 
				'iconurl' => $ziconurl, 
				'accessrequired' => $zaccessrequired, 
				'jsfunction' => $zjsfunction
			);
			$this->adminmenu[count($this->adminmenu)] = $zmenuitem;
			
			$zsuccess = true;
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwadminmenu.php-addAdminMenuItem=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function getAdminMenu() {
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
			if (empty($wtwdb->getSessionUserID())) {
				header("Location: ".$wtw->domainurl."/"); 
				exit();
			} else {
				//$zadminmenu .= "TEST=".count($userroles)."<br />"; 
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
			}
			if (count($this->adminmenu) > 0) {
				$zadminmenu .= "</div>";
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwadminmenu.php-getAdminMenu=".$e->getMessage());
		}
		return $zadminmenu;
	}
}

	function wtwadminmenu() {
		return wtwadminmenu::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwadminmenu'] = wtwadminmenu();	

?>
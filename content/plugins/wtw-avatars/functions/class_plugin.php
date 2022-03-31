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
	
	public $version = "1.0.1";

	public $dbversion = "1.0.1";

	public $versiondate = "2020-8-29";
	
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

				$zupdateroles = array("admin","developer","architect","graphics artist");
				$zdeveloperroles = array("admin","developer");

				/* add admin menu items */
				/* wtwplugins class -> addAdminMenuItem function (menu item id, menu text, level 1 sort, level 1 id, level 2 sort, level 2 id, level 1 icon, allowed roles array - null for all, onclick JavaScript function) */
				
				$wtwplugins->addAdminMenuItem('wtw_avatarsmenu', $wtwplugins->__('3D Avatars'), -75, 'wtw_avatarsmenu', 0, '', '/content/system/images/menuavatars.png', $zdeveloperroles, null);
				$wtwplugins->addAdminMenuItem('wtw_selectavatar', $wtwplugins->__('Select 3D Avatar'), -75, 'wtw_avatarsmenu', 1, 'wtw_selectavatar', '', $zdeveloperroles, "WTW.adminMenuItemSelected(this);");
				$wtwplugins->addAdminMenuItem('wtw_addnewavatar', $wtwplugins->__('Add New 3D Avatar'), -75, 'wtw_avatarsmenu', 2, 'wtw_addnewavatar', '', $zdeveloperroles, "WTW.adminMenuItemSelected(this);");
				$wtwplugins->addAdminMenuItem('wtw_createavatar', $wtwplugins->__('Create 3D Avatar'), -75, 'wtw_avatarsmenu', 3, 'wtw_createavatar', '', $zdeveloperroles, "WTW.adminMenuItemSelected(this);");
				$wtwplugins->addAdminMenuItem('wtw_adminsettingsavatar', $wtwplugins->__('Options and Settings'), -75, 'wtw_avatarsmenu', 5, 'wtw_adminsettingsavatar', '', $zdeveloperroles, "WTW.adminMenuItemSelected(this);");
				$wtwplugins->addAdminMenuItem('wtw_admineditavatar', $wtwplugins->__('Edit 3D Avatar'), -75, 'wtw_avatarsmenu', 6, 'wtw_admineditavatar', '', $zdeveloperroles, "WTW.adminMenuItemSelected(this);");

				$wtwplugins->addAdminSubMenuItem('settingsavatar', 'wtw_adminavatarratings', '<div class="wtw-altkey">ctrl+r</div>'.$wtwplugins->__('Ratings and Requirements'), 5, $zupdateroles, "WTW.openFullPageForm('fullpage','Ratings and Requirements', 'wtw_requirementspage');WTW.openRequirements();");
				$wtwplugins->addAdminSubMenuItem('settingsavatar', 'wtw_adminavatarsnapshot', '<div class="wtw-altkey">ctrl+a</div>'.$wtwplugins->__('3D Avatar Snapshot'), 10, $zupdateroles, "WTW.adminMenuItemSelected(this);");

				$wtwplugins->addAdminSubMenuItem('settingsavatar', '', '<hr class="wtw-menuhr" />', 12, $zupdateroles, "");

				$wtwplugins->addAdminSubMenuItem('settingsavatar', 'wtw_adminavatarcopy', $wtwplugins->__('Copy 3D Avatar'), 15, $zupdateroles, "WTW.adminMenuItemSelected(this);");
				$wtwplugins->addAdminSubMenuItem('settingsavatar', 'wtw_adminavatarshare', $wtwplugins->__('Share 3D Avatar'), 20, $zupdateroles, "WTW.adminMenuItemSelected(this);");
				$wtwplugins->addAdminSubMenuItem('settingsavatar', 'wtw_adminavatardelete', $wtwplugins->__('Delete 3D Avatar'), 25, $zupdateroles, "WTW.adminMenuItemSelected(this);");

				$wtwplugins->addAdminSubMenuItem('settingsavatar', '', '<hr class="wtw-menuhr" />', 50, $zupdateroles, "");

				$wtwplugins->addAdminSubMenuItem('settingsavatar', 'wtw_adminavatargroups', $wtwplugins->__('Avatar Groups'), 55, $zupdateroles, "WTW.openFullPageForm('fullpage','".$wtwplugins->__('Avatar Groups')."','wtw_avatargroupspage');");
				$wtwplugins->addAdminSubMenuItem('settingsavatar', 'wtw_adminavataranimationevents', $wtwplugins->__('Avatar Animation Events'), 60, $zupdateroles, "WTW.openFullPageForm('fullpage','".$wtwplugins->__('Avatar Animation Events')."','wtw_avataranimationeventspage');");
				$wtwplugins->addAdminSubMenuItem('settingsavatar', 'wtw_adminavatarlist', $wtwplugins->__('3D Avatars List'), 65, $zupdateroles, "WTW.openFullPageForm('fullpage','".$wtwplugins->__('3D Avatars List')."','wtw_avatarlistpage');");
				$wtwplugins->addAdminSubMenuItem('settingsavatar', 'wtw_adminavatarprofiles', $wtwplugins->__('3D Avatar Profiles'), 70, $zupdateroles, "WTW.openFullPageForm('fullpage','".$wtwplugins->__('Add or Edit Avatar')."','wtw_avatarprofilepage');wtwavatars.loadAvatarEditDDL('wtw_selecteditavatar');");


				$wtwplugins->addAdminSubMenuItem('editavatar', 'wtw_adminavatarinformation', $wtwplugins->__('3D Avatar Information'), 1, $zupdateroles, "WTW.adminMenuItemSelected(this);");
				$wtwplugins->addAdminSubMenuItem('editavatar', 'wtw_adminavatarfiles', $wtwplugins->__('3D Avatar Files'), 5, $zupdateroles, "WTW.adminMenuItemSelected(this);");
				$wtwplugins->addAdminSubMenuItem('editavatar', 'wtw_adminavatarscaling', $wtwplugins->__('3D Avatar Scaling'), 10, $zupdateroles, "WTW.adminMenuItemSelected(this);");
				$wtwplugins->addAdminSubMenuItem('editavatar', 'wtw_adminavatarcolors', $wtwplugins->__('3D Avatar Colors'), 15, $zupdateroles, "WTW.adminMenuItemSelected(this);");
				$wtwplugins->addAdminSubMenuItem('editavatar', 'wtw_adminavataranimations', $wtwplugins->__('3D Avatar Animations'), 20, $zupdateroles, "WTW.adminMenuItemSelected(this);");


				/* admin full page settings forms */
				/* wtwplugins class -> addFullPageForm function (form id, allowed roles array - null for all, form html string) */
				
//				$wtwplugins->addFullPageForm('wtw_avatarlistpage', $zdeveloperroles, $this->adminAvatarListForm());
//				$wtwplugins->addFullPageForm('wtw_avatarprofilepage', $zdeveloperroles, $this->adminAvatarProfileForm());
				$wtwplugins->addFullPageForm('wtw_avatargroupspage', $zdeveloperroles, $this->adminAvatarGroupsForm());
				$wtwplugins->addFullPageForm('wtw_avataranimationeventspage', $zdeveloperroles, $this->adminAvatarAnimationEventsForm());

				$wtwplugins->addAdminMenuForm('wtw_adminSelectAvatarDiv', $wtwplugins->__('Select 3D Avatar'), $this->selectAvatarForm(), $zdeveloperroles);
				$wtwplugins->addAdminMenuForm('wtw_adminAddNewAvatarDiv', $wtwplugins->__('Add New 3D Avatar'), $this->addNewAvatarForm(), $zdeveloperroles);
				$wtwplugins->addAdminMenuForm('wtw_adminSettingsAvatarDiv', $wtwplugins->__('Options and Settings'), $this->settingsAvatarForm(), $zdeveloperroles);
				$wtwplugins->addAdminMenuForm('wtw_adminShareAvatarDiv', $wtwplugins->__('Share 3D Avatar'), $this->shareAvatarForm(), $zdeveloperroles);
				$wtwplugins->addAdminMenuForm('wtw_adminEditAvatarDiv', $wtwplugins->__('Edit 3D Avatar'), $this->editAvatarForm(), $zdeveloperroles);
				$wtwplugins->addAdminMenuForm('wtw_adminEditAvatarInformationDiv', $wtwplugins->__('3D Avatar Information'), $this->editAvatarInformationForm(), $zdeveloperroles);
				$wtwplugins->addAdminMenuForm('wtw_adminEditAvatarFilesDiv', $wtwplugins->__('3D Avatar Files'), $this->editAvatarFilesForm(), $zdeveloperroles);
				$wtwplugins->addAdminMenuForm('wtw_adminEditAvatarScalingDiv', $wtwplugins->__('3D Avatar Scaling'), $this->editAvatarScalingForm(), $zdeveloperroles);
				$wtwplugins->addAdminMenuForm('wtw_adminEditAvatarColorsDiv', $wtwplugins->__('3D Avatar Colors'), $this->editAvatarColorsForm(), $zdeveloperroles);
				$wtwplugins->addAdminMenuForm('wtw_adminEditAvatarAnimationsDiv', $wtwplugins->__('3D Avatar Animations'), $this->editAvatarAnimationsForm(), $zdeveloperroles);

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
			
			/* hook plugin script functions into existing wtw functions */
			/* $wtwplugins->addScriptFunction('hookname', 'function(parameters);'); */
			/* examples: */
			/* $wtwplugins->addScriptFunction("onclick", "wtwavatars.onClick(zpickedname);"); */
			/* $wtwplugins->addScriptFunction("setnewactionzonedefaults", "wtwavatars.setNewActionZoneDefaults(zactionzonetype);"); */
			/* $wtwplugins->addScriptFunction("setactionzoneformfields", "wtwavatars.setNewActionZoneFormFields(zactionzonetype);"); */
			/* $wtwplugins->addScriptFunction("checkactionperzone", "wtwavatars.checkActionZone(zactionzonename, zactionzoneind, zmeinzone, zothersinzone);"); */
			/* $wtwplugins->addScriptFunction("setavatarmovement", "wtwavatars.setAvatarMovement(zavatar, zevent, zweight);"); */
			/* $wtwplugins->addScriptFunction("checkhovers", "wtwavatars.checkHovers(zmoldname, zshape);"); */
			/* $wtwplugins->addScriptFunction("resethovers", "wtwavatars.resetHovers(zmoldname, zshape);"); */
			/* $wtwplugins->addScriptFunction("disposeclean", "wtwavatars.disposeClean(zmoldname);"); */
			
			
			/* Custom Molds (meshes) */
			/* The following create the list of new molds added by this plugin and assign the script to create the mold */
			/* $wtwplugins->addMoldDef("My Custom Mold - NAME FOR THE LIST", "webmold or mold - LIST", "wtwavatars.functionname(passed, values);"); */
			/* $wtwplugins->addMoldDef("My Custom Mold", "webmold", "wtwavatars.addMoldMyCustomMold(zmoldname, zmolddef, zlenx, zleny, zlenz);"); */
			/* Set the custom mold defaults and show-hide form fields as needed */
			/* $wtwplugins->addScriptFunction("setnewmolddefaults", "wtwavatars.setNewMoldDefaults(zshape, zpositionx, zpositiony, zpositionz, zrotationy);"); */
			/* $wtwplugins->addScriptFunction("setmoldformfields", "wtwavatars.setMoldFormFields(zshape);"); */

			/* Custom action zones */
			/* The following create the list of new action zones added by this plugin and assign the script to create the action zone */
			/* $wtwplugins->addActionZoneDef("My Custom Zone", "wtwavatars.addActionZoneMyCustomZone(zactionzonename, zactionzoneind, zactionzonedef);", "0"); */
			/* Set the custom action zone defaults and show-hide form fields as needed */
			/* $wtwplugins->addScriptFunction("setnewactionzonedefaults", "wtwavatars.setNewActionZoneDefaults(zactionzonetype);"); */
			/* $wtwplugins->addScriptFunction("setactionzoneformfields", "wtwavatars.setActionZoneFormFields(zactionzonetype);"); */
			
			/* Custom coverings (materials) */
			/* The following create the list of new coverings added by this plugin and assign the script to create the covering */
			/* $wtwplugins->addCoveringDef("My Custom Covering", "wtwavatars.addCoveringMyCustomCovering(zmoldname, zmolddef, zlenx, zleny, zlenz, zspecial1, zspecial2);"); */
			/* Set the custom covering defaults and show-hide mold form fields as needed */
			/* $wtwplugins->addScriptFunction("setcoveringformfields", "wtwavatars.setCoveringFormFields(zcoveringname);"); */
			
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
			//if ($wtwplugins->pagename == "admin.php") {
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
			//}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-checkTablesForUpdates=".$e->getMessage());
		}
	}

	public function selectAvatarForm() {
		/* select avatar list form */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<div id=\"wtw_loadingavatarid\" class=\"wtw-loadingnotice\" style=\"margin-left:auto;margin-right:auto;color:#000000;\">".$wtwplugins->__('Loading')."</div>\r\n";
			$zformdata .= "<div id=\"wtw_listavatars\"></div><br />\r\n";
			$zformdata .= "<div class=\"wtw-yellowbutton\" onclick=\"WTW.closeSelectAvatar();\">".$wtwplugins->__('Cancel')."</div><br /><br />\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-selectAvatarForm=".$e->getMessage());
		}
		return $zformdata;
	}	
	
	public function settingsAvatarForm() {
		/* avatar options and settings form */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= $wtwplugins->getAdminSubMenu('settingsavatar');
			$zformdata .= "<div class=\"wtw-yellowbutton\" onclick=\"WTW.adminMenuItemSelected(dGet('wtw_bbackwtw_adminSettingsAvatarDiv'));\">".$wtwplugins->__('Cancel')."</div><br /><br />\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-settingsAvatarForm=".$e->getMessage());
		}
		return $zformdata;
	}	

	public function addNewAvatarForm() {
		/* add new 3D Avatar form */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<input type=\"file\" id=\"wtw_avatarfileupload\" name=\"wtw_avatarfileupload\" class=\"wtw-hide\" onchange=\"WTW.uploadAvatarFile();\" />\r\n";

			$zformdata .= "<div id=\"wtw_newavatardiv\">\r\n";
			$zformdata .= "<h2>3D Avatar Name</h2>\r\n";
			$zformdata .= "<div class=\"wtw-mainmenuvalue\">Users change the Name when selected.</div>\r\n";
			$zformdata .= "<input type=\"text\" id=\"wtw_tnewavatarname\" maxlength=\"255\" onclick=\"WTW.checkKey(this, 'displayname', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'displayname', 0, 0);\" onblur=\"WTW.checkKey(this, 'displayname', 0, 1);\" /><br /><br />\r\n";
			$zformdata .= "<h2>Avatar Group</h2>\r\n";
			$zformdata .= "<div class=\"wtw-mainmenuvalue\">Groups can be assigned to a 3D Community<br />(Example: Zombie Group for Zombie Scenes).</div>\r\n";
			$zformdata .= "<select id=\"wtw_tnewavatargroup\"></select>\r\n";
			$zformdata .= "<h2>Avatar Description</h2>\r\n";
			$zformdata .= "<input type=\"text\" id=\"wtw_tnewavatardescription\" maxlength=\"255\" onclick=\"WTW.checkKey(this, 'displayname', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'displayname', 0, 0);\" onblur=\"WTW.checkKey(this, 'displayname', 0, 1);\" /><br /><br />\r\n";
			$zformdata .= "<h2>Gender</h2>\r\n";
			$zformdata .= "<div class=\"wtw-mainmenuvalue\">Optional, may help users search for Avatars.</div>\r\n";
			$zformdata .= "<input type=\"text\" id=\"wtw_tnewavatargender\" maxlength=\"255\" onclick=\"WTW.checkKey(this, 'displayname', 1, 0);\" onkeyup=\"WTW.checkKey(this, 'displayname', 1, 0);\" onblur=\"WTW.checkKey(this, 'displayname', 1, 1);\" /><br /><br />\r\n";

			$zformdata .= "<div id=\"wtw_newavataruploadbutton\">\r\n";
			$zformdata .= "<h2>Main 3D Avatar File</h2>\r\n";
			$zformdata .= "<div class=\"wtw-mainmenuvalue\">Upload the Main 3D Avatar File<br />(.babylon, .obj, .gtlf, or .glb supported).</div>\r\n";
			$zformdata .= "<div id=\"wtw_taddnewavatarerror\" class=\"wtw-error\"></div>\r\n";
			$zformdata .= "<br /><div id=\"wtw_adminnewavatarupload\" class=\"wtw-greenbutton\" onclick=\"dGet('wtw_avatarfileupload').click();\" style=\"font-size:1.4em;\">Upload Main Avatar File</div>\r\n";
			$zformdata .= "</div>\r\n";

			$zformdata .= "<div id=\"wtw_newavataruploadfolder\" style=\"display:none;visibility:hidden;\">\r\n";
			$zformdata .= "<h2>3D Avatar Folder</h2>\r\n";
			$zformdata .= "<div id=\"wtw_newavatarfilesfolder\" class=\"wtw-mainmenuvalue\"></div>";
			$zformdata .= "<h2>3D Avatar Main File</h2>\r\n";
			$zformdata .= "<div id=\"wtw_newavatarfilesfile\" class=\"wtw-mainmenuvalue\"></div>";
			$zformdata .= "<h2>Wait Animation (Idle)</h2>\r\n";
			$zformdata .= "<div class=\"wtw-mainmenuvalue\">If idle is included in main file.</div>\r\n";
			$zformdata .= "<div><input type=\"text\" id=\"wtw_tnewavatarstartframe\" maxlength=\"255\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);\" style=\"float:right;margin-right:20px;\" />Start Frame</div>\r\n";
			$zformdata .= "<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "<div><input type=\"text\" id=\"wtw_tnewavatarendframe\" maxlength=\"255\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);\" style=\"float:right;margin-right:20px;\" />End Frame</div>\r\n";
			$zformdata .= "<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "<br /><div id=\"wtw_adminnewavatarsave\" class=\"wtw-greenbutton\" onclick=\"WTW.loadNewAvatarFilesForm();\" style=\"font-size:1.4em;\">Save and Continue</div>\r\n";
			$zformdata .= "</div>\r\n";
			$zformdata .= "</div>\r\n";

			$zformdata .= "<div id=\"wtw_newavatarfilelist\" style=\"display:none;visibility:hidden;\">\r\n";
			$zformdata .= "<h2>File List</h2>\r\n";
			$zformdata .= "<div id=\"wtw_newavatarfileslist\"></div><br /><br />\r\n";
			$zformdata .= "<div class=\"wtw-mainmenuvalue\">After Files are uploaded, click Load Avatar to continue.</div>\r\n";
			$zformdata .= "<br /><div id=\"wtw_adminnewavatarreload\" class=\"wtw-greenbutton\" onclick=\"WTW.loadNewAvatar();\" style=\"font-size:1.4em;\">Load Avatar</div>\r\n";
			$zformdata .= "</div>\r\n";

			$zformdata .= "<div class=\"wtw-yellowbutton\" onclick=\"WTW.adminMenuItemSelected(dGet('wtw_bbackwtw_adminAddNewAvatarDiv'));\">Cancel</div><br /><br />\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-addNewAvatarForm=".$e->getMessage());
		}
		return $zformdata;
	}	
	
	public function editAvatarForm() {
		/* edit avatar list form */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= $wtwplugins->getAdminSubMenu('editavatar');
			$zformdata .= "<div class=\"wtw-yellowbutton\" onclick=\"WTW.adminMenuItemSelected(dGet('wtw_bbackwtw_adminEditAvatarDiv'));\">Cancel</div><br /><br />\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-editAvatarForm=".$e->getMessage());
		}
		return $zformdata;
	}	

	public function shareAvatarForm() {
		/* Share 3D Avatar form */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<div class=\"wtw-menuheader\">Share My<br />3D Avatar<br />as Template</div><br />\r\n";
			$zformdata .= "<a href=\"https://www.walktheweb.com/wiki/share-3d-objects/\" title=\"Help\" alt=\"Help\" class=\"wtw-helplink\" target=\"_blank\">?</a>\r\n";
			$zformdata .= "<div id=\"wtw_loadingshareavatarform\" class=\"wtw-loadingnotice\" style=\"margin-left:auto;margin-right:auto;color:#000000;\">Loading...</div>\r\n";
			$zformdata .= "<div id=\"wtw_shareavatardiv\" class=\"wtw-hide\">\r\n";
			$zformdata .= "	<h2>Template Name</h2>\r\n";
			$zformdata .= "	<input type=\"text\" id=\"wtw_tshareavatartempname\" maxlength=\"255\" onclick=\"WTW.checkKey(this, 'displayname', 0, 0);WTW.blockPassThrough();\" onkeyup=\"WTW.checkKey(this, 'displayname', 0, 0);\" onblur=\"WTW.checkKey(this, 'displayname', 0, 1);\" />\r\n";
			$zformdata .= "	<br /><br />\r\n";
			$zformdata .= "	<h2>Description</h2>\r\n";
			$zformdata .= "	<textarea id=\"wtw_tshareavatardescription\" rows=\"4\" onclick=\"WTW.checkKey(this, 'safetext', 0, 0);WTW.blockPassThrough();\" onkeyup=\"WTW.checkKey(this, 'safetext', 0, 0);\" onblur=\"WTW.checkKey(this, 'safetext', 0, 1);\"></textarea>\r\n";
			$zformdata .= "	<br /><br />\r\n";
			$zformdata .= "	<h2>Search Category Tags</h2>\r\n";
			$zformdata .= "	<input type=\"text\" id=\"wtw_tshareavatartags\" maxlength=\"255\" onclick=\"WTW.checkKey(this, 'displayname', 0, 0);WTW.blockPassThrough();\" onkeyup=\"WTW.checkKey(this, 'displayname', 0, 0);\" onblur=\"WTW.checkKey(this, 'displayname', 0, 1);\" /><br />\r\n";
			$zformdata .= "	<div style=\"font-weight:normal;font-size:.8em;color:#c0c0c0;\">Example: Avatar, Leather Armor, Boots, etc.</div>\r\n";
			$zformdata .= "	<br /><br />\r\n";
			$zformdata .= "	<div id=\"wtw_bsnapshotavatar\" class='wtw-menulevel2' onclick=\"WTW.snapshot3D(dGet('wtw_trootpath').value + dGet('wtw_tavatarfolder').value + 'snapshots/', 'defaultavatar.png');\" style=\"cursor: pointer;\">Set Default Snapshot</div><br />\r\n";
			$zformdata .= "	<img id=\"wtw_defaultavatarsnapshot\" class=\"wtw-snapshot\" />\r\n";
			$zformdata .= "	<br /> \r\n";

			$zformdata .= "	<h2>Initial Share or Update</h2>\r\n";
			$zformdata .= "	<div style=\"text-align:left;margin-left:40px;color:#ffffff;cursor:pointer;\" onclick=\"dGet('wtw_tshareoriginal').click();\">\r\n";
			$zformdata .= "	<input type=\"radio\" id=\"wtw_tshareoriginal\" name=\"wtw_tsharetype\" value=\"initial\" onchange=\"WTW.changeAvatarVersion();\" /> Initial Share<br />\r\n";
			$zformdata .= "	</div>\r\n";
			$zformdata .= "	<div style=\"font-weight:normal;font-size:.8em;color:#c0c0c0;\">You created the 3D Avatar and want to Share it.</div>\r\n";
			$zformdata .= "	<br /> \r\n";
			$zformdata .= "	<div style=\"text-align:left;margin-left:40px;color:#ffffff;cursor:pointer;\" onclick=\"dGet('wtw_tshareupdate').click();\">\r\n";
			$zformdata .= "	<input type=\"radio\" id=\"wtw_tshareupdate\" name=\"wtw_tsharetype\" value=\"update\" /> Update Share<br />\r\n";
			$zformdata .= "	</div>\r\n";
			$zformdata .= "	<div style=\"font-weight:normal;font-size:.8em;color:#c0c0c0;text-align:left;\">Optional: Only Available if this 3D Avatar was already Shared and you are the original creator.<br /><br />\r\n";
			$zformdata .= "<div style=\"color:white;font-weight:bold;text-align:center;\">Version: <input type=\"text\" id=\"wtw_tshareversion\" maxlength=\"255\" value=\"1.0.0\" /></div><br />\r\n";
			$zformdata .= "	Version Numbers are 3 numbers each separated by a period.<br /><br /><div style=\"margin-left:20px;\">
			* First number is incremented for major changes or complete rebuilds.<br />
			* Second number is incremented for minor changes or additions.<br />
			* Third number is incremented for adjustments, texture changes, or bug fixes.</div><br />
			When the first or second number changes, the numbers to the right reset to 0. </div><br /><br />\r\n";
			$zformdata .= "<div style=\"color:white;font-weight:bold;text-align:center;\">Version Description: <input type=\"text\" id=\"wtw_tshareversiondesc\" maxlength=\"255\" value=\"\" /></div><br />\r\n";
			$zformdata .= "	<div id=\"wtw_shareavatarresponse\" style=\"font-size:1.5em;color:green;\"></div><br />\r\n";
			$zformdata .= "</div>\r\n";
			$zformdata .= "<br />\r\n";
			$zformdata .= "<div id=\"wtw_bshareavatartemplate\" class=\"wtw-greenbutton\" onclick=\"WTW.adminMenuItemSelected(this);\" style=\"font-size:1.4em;\">Share 3D Avatar as Template</div>\r\n";
			$zformdata .= "<div id=\"wtw_cancelshareavatar\" class=\"wtw-yellowbutton\" onclick=\"WTW.adminMenuItemSelected(this);\">Cancel</div>\r\n";
			$zformdata .= "<br /><br />\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-shareAvatarForm=".$e->getMessage());
		}
		return $zformdata;
	}

	public function editAvatarInformationForm() {
		/* edit avatar information form */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<h2>3D Avatar Name</h2>\r\n";
			$zformdata .= "<div class=\"wtw-mainmenuvalue\">Users change the Name when selected.</div>\r\n";
			$zformdata .= "<input type=\"text\" id=\"wtw_tinfoavatarname\" maxlength=\"255\" onclick=\"WTW.checkKey(this, 'displayname', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'displayname', 0, 0);\" onblur=\"WTW.checkKey(this, 'displayname', 0, 1);\" /><br /><br />\r\n";
			$zformdata .= "<h2>Version</h2>\r\n";
			$zformdata .= "<input type=\"text\" id=\"wtw_tinfoavatarversion\" maxlength=\"255\" /><br /><br />\r\n";
			$zformdata .= "<h2>Avatar Group</h2>\r\n";
			$zformdata .= "<div class=\"wtw-mainmenuvalue\">Groups can be assigned to a 3D Community<br />(Example: Zombie Group for Zombie Scenes).</div>\r\n";
			$zformdata .= "<select id=\"wtw_tinfoavatargroup\"></select>\r\n";
			$zformdata .= "<h2>Gender</h2>\r\n";
			$zformdata .= "<div class=\"wtw-mainmenuvalue\">Optional, may help users search for Avatars.</div>\r\n";
			$zformdata .= "<input type=\"text\" id=\"wtw_tinfoavatargender\" maxlength=\"255\" onclick=\"WTW.checkKey(this, 'displayname', 1, 0);\" onkeyup=\"WTW.checkKey(this, 'displayname', 1, 0);\" onblur=\"WTW.checkKey(this, 'displayname', 1, 1);\" /><br /><br />\r\n";
			$zformdata .= "<h2>Avatar Description</h2>\r\n";
			$zformdata .= "<input type=\"text\" id=\"wtw_tinfoavatardescription\" maxlength=\"255\" onclick=\"WTW.checkKey(this, 'displayname', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'displayname', 0, 0);\" onblur=\"WTW.checkKey(this, 'displayname', 0, 1);\" /><br /><br />\r\n";
			$zformdata .= "<div id=\"wtw_tinfoavatarerror\" class=\"wtw-error\"></div>\r\n";
			$zformdata .= "<br /><div id=\"wtw_adminavatarsave\" class=\"wtw-greenbutton\" onclick=\"WTW.saveEditAvatar();\" style=\"font-size:1.4em;\">Save Avatar Information</div>\r\n";
			$zformdata .= "<div class=\"wtw-yellowbutton\" onclick=\"WTW.adminMenuItemSelected(dGet('wtw_bbackwtw_adminEditAvatarInformationDiv'));\">Cancel</div><br /><br />\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-editAvatarInformationForm=".$e->getMessage());
		}
		return $zformdata;
	}	

	public function editAvatarFilesForm() {
		/* edit avatar files form */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<h2>3D Avatar Folder</h2>\r\n";
			$zformdata .= "<div id=\"wtw_avatarfilesfolder\" class=\"wtw-mainmenuvalue\"></div>";
			$zformdata .= "<h2>3D Avatar Main File</h2>\r\n";
			$zformdata .= "<div id=\"wtw_avatarfilesfile\" class=\"wtw-mainmenuvalue\"></div>";
			$zformdata .= "<input type=\"file\" id=\"wtw_avatarfilesupload\" name=\"wtw_avatarfilesupload[]\" class=\"wtw-hide\" multiple=\"true\" onchange=\"WTW.uploadAvatarFiles();\" />";
			$zformdata .= "<h2>File List</h2>\r\n";
			$zformdata .= "<div id=\"wtw_avatarfileslist\"></div>\r\n";
			$zformdata .= "<div class=\"wtw-yellowbutton\" onclick=\"WTW.adminMenuItemSelected(dGet('wtw_bbackwtw_adminEditAvatarFilesDiv'));\">Cancel</div><br /><br />\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-editAvatarFilesForm=".$e->getMessage());
		}
		return $zformdata;
	}	
	
	public function editAvatarScalingForm() {
		/* edit avatar scaling form */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<h2 style=\"margin-bottom:3px;\">Avatar Size</h2>";
			$zformdata .= "<div class=\"wtw-onecol\">Scaling Z (left,-right)<br />";
			$zformdata .= "	<input type=\"text\" id=\"wtw_tavatarscalingz\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);WTW.setNewAvatar();\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarzl4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingz', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarzl3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingz', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarzl2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingz', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarzl1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingz', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" /><br />";

			$zformdata .= "<div style=\"text-align:center;\">";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarzl8\" class=\"wtw-smallprint\" value=\"-.001\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingz', -.001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarzl7\" class=\"wtw-smallprint\" value=\"-.0001\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingz', -.0001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarzl6\" class=\"wtw-smallprint\" value=\"+.0001\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingz', .0001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarzl5\" class=\"wtw-smallprint\" value=\"+.001\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingz', .001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" /></div>";

			$zformdata .= "</div><br />";

			$zformdata .= "<div class=\"wtw-onecol\">Scaling X (front,-back)<br />";
			$zformdata .= "	<input type=\"text\" id=\"wtw_tavatarscalingx\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);WTW.setNewAvatar();\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarxl4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingx', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarxl3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingx', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarxl2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingx', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarxl1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingx', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" /><br />";

			$zformdata .= "<div style=\"text-align:center;\">";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarxl8\" class=\"wtw-smallprint\" value=\"-.001\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingx', -.001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarxl7\" class=\"wtw-smallprint\" value=\"-.0001\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingx', -.0001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarxl6\" class=\"wtw-smallprint\" value=\"+.0001\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingx', .0001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarxl5\" class=\"wtw-smallprint\" value=\"+.001\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingx', .001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" /></div>";

			$zformdata .= "</div><br />";
			$zformdata .= "<div class=\"wtw-onecol\">Scaling Y (up,-down)<br />";
			$zformdata .= "	<input type=\"text\" id=\"wtw_tavatarscalingy\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);WTW.setNewAvatar();\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavataryl4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingy', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavataryl3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingy', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavataryl2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingy', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavataryl1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingy', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" /><br />";

			$zformdata .= "<div style=\"text-align:center;\">";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavataryl8\" class=\"wtw-smallprint\" value=\"-.001\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingy', -.001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavataryl7\" class=\"wtw-smallprint\" value=\"-.0001\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingy', -.0001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavataryl6\" class=\"wtw-smallprint\" value=\"+.0001\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingy', .0001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavataryl5\" class=\"wtw-smallprint\" value=\"+.001\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarscalingy', .001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" /></div>";

			$zformdata .= "</div><hr class=\"wtw-menuhr\" />";
			
			$zformdata .= "<h2 style=\"margin-bottom:3px;\">Avatar Rotation</h2>";
			$zformdata .= "<div class=\"wtw-onecol\">Rotate Z (left,-right Axis)<br />";
			$zformdata .= "	<input type=\"text\" id=\"wtw_tavatarrotationz\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);WTW.setNewAvatar();\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarzr4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarrotationz', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarzr3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarrotationz', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarzr2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarrotationz', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarzr1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarrotationz', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "</div><br />";
			$zformdata .= "<div class=\"wtw-onecol\">Rotate X (front,-back Axis)<br />";
			$zformdata .= "	<input type=\"text\" id=\"wtw_tavatarrotationx\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);WTW.setNewAvatar();\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarxr4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarrotationx', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarxr3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarrotationx', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarxr2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarrotationx', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarxr1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarrotationx', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "</div><br />";
			$zformdata .= "<div class=\"wtw-onecol\">Rotate Y (up,-down Axis)<br />";
			$zformdata .= "	<input type=\"text\" id=\"wtw_tavatarrotationy\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);WTW.setNewAvatar();\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavataryr4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarrotationy', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavataryr3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarrotationy', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavataryr2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarrotationy', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavataryr1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarrotationy', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "</div><hr class=\"wtw-menuhr\" />";
			
			$zformdata .= "<h2 style=\"margin-bottom:3px;\">Avatar Position</h2>";
			$zformdata .= "<div class=\"wtw-onecol\" style=\"white-space:nowrap;\">Position Z (left,-right)<br /> ";
			$zformdata .= "	<input type=\"text\" id=\"wtw_tavatarpositionz\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);WTW.setNewAvatar();\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarzp4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarpositionz', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarzp3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarpositionz', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarzp2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarpositionz', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarzp1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarpositionz', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			$zformdata .= "</div><br />";
			$zformdata .= "<div class=\"wtw-onecol\">Position X (front,-back)<br />";
			$zformdata .= "	<input type=\"text\" id=\"wtw_tavatarpositionx\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);WTW.setNewAvatar();\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarxp4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarpositionx', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarxp3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarpositionx', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarxp2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarpositionx', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavatarxp1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarpositionx', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "</div><br />";
			$zformdata .= "<div class=\"wtw-onecol\">Position Y (up,-down)<br />";
			$zformdata .= "	<input type=\"text\" id=\"wtw_tavatarpositiony\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);WTW.setNewAvatar();\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavataryp4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarpositiony', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavataryp3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarpositiony', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavataryp2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarpositiony', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtw_beditavataryp1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"WTW.changeNumberValue('wtw_tavatarpositiony', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "</div><hr class=\"wtw-menuhr\" />";
			
			$zformdata .= "<div id=\"wtw_tscalingavatarerror\" class=\"wtw-error\"></div>\r\n";
			$zformdata .= "<br /><div id=\"wtw_adminavatarsavescaling\" class=\"wtw-greenbutton\" onclick=\"WTW.saveAvatarScaling();\" style=\"font-size:1.4em;\">Save Avatar Scaling</div>\r\n";
			
			
			$zformdata .= "<div class=\"wtw-yellowbutton\" onclick=\"WTW.adminMenuItemSelected(dGet('wtw_bbackwtw_adminEditAvatarScalingDiv'));\">Cancel</div><br /><br />\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-editAvatarScalingForm=".$e->getMessage());
		}
		return $zformdata;
	}	
	
	public function editAvatarColorsForm() {
		/* edit avatar colors form */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<h2>Avatar Parts</h2>\r\n";
			$zformdata .= "<div id=\"wtw_tcoloravatarerror\" class=\"wtw-error\"></div>\r\n";
			$zformdata .= "<div id=\"wtw_avatarpartslist\"></div>\r\n";
			$zformdata .= "<div class=\"wtw-yellowbutton\" onclick=\"WTW.adminMenuItemSelected(dGet('wtw_bbackwtw_adminEditAvatarColorsDiv'));\">Cancel</div><br /><br />\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-editAvatarColorsForm=".$e->getMessage());
		}
		return $zformdata;
	}	
	
	public function editAvatarAnimationsForm() {
		/* edit avatar animations form */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<h2>Avatar Animations</h2>\r\n";
			$zformdata .= "<input type=\"file\" id=\"wtw_avatarfilesupload2\" name=\"wtw_avatarfilesupload2[]\" class=\"wtw-hide\" multiple=\"true\" onchange=\"WTW.uploadQuickAvatarFiles();\" />";
			$zformdata .= "<div id=\"wtw_tanimationsavatarerror\" class=\"wtw-error\"></div>\r\n";
			$zformdata .= "<div id=\"wtw_avataranimationslist\"></div>\r\n";
			$zformdata .= "<div id=\"wtw_cancelavataranimationsform\" class=\"wtw-yellowbutton\" onclick=\"WTW.adminMenuItemSelected(dGet('wtw_bbackwtw_adminEditAvatarAnimationsDiv'));\">Cancel</div><br /><br />\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-editAvatarAnimationsForm=".$e->getMessage());
		}
		return $zformdata;
	}	
	
/*	public function adminAvatarListForm() {
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "	<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardboxtitle\">Avatar List</div>\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardbox\">\r\n";
			
			$zavatargroup = '';
			$i = 0;
			$zresults = $wtwplugins->query("
				select a1.*,
					ag1.avatargroupid,
					ag1.avatargroup as baseavatargroup
				from ".wtw_tableprefix."avatargroups ag1
					left join (select * from ".wtw_tableprefix."avatars where deleted=0) a1
					on ag1.avatargroup=a1.avatargroup
				where ag1.deleted=0
				order by ag1.avatargroup, a1.sortorder, a1.displayname;");
			
			foreach ($zresults as $zrow) {
				if ($zavatargroup != $zrow["baseavatargroup"]) {
					if ($i > 0) {
						$zformdata .= "			</div>\r\n";
					}
					$zformdata .= "			<div class=\"wtw-controlpaneldiv\">\r\n";
					$zformdata .= "				<div class=\"wtw-controlpaneltitlediv\" style=\"font-size:1.4em;\"><div id='wtw_addavatarprofile-".$zrow["avatargroupid"]."' class='wtw-greenbuttonright' onclick=\"WTW.openFullPageForm('fullpage','Avatar Profile','wtw_avatarprofilepage');wtwavatars.loadAvatarEditDDL('wtw_selecteditavatar','');wtwavatars.addNewAvatar('".$zrow["baseavatargroup"]."');\">Add New</div>".$zrow["baseavatargroup"]."</div>\r\n";
					$zavatargroup = $zrow["baseavatargroup"];
				}
				if (!empty($zrow["avatarid"]) && isset($zrow["avatarid"])) {
					$zformdata .= "		<div class=\"wtw-clear\"></div>\r\n";
					if (file_exists(wtw_rootpath."/content/uploads/avatars/".$zrow["avatarid"]."/snapshots/defaultavatarsm.png")) {
						$zformdata .= "<img src=\"/content/uploads/avatars/".$zrow["avatarid"]."/snapshots/defaultavatarsm.png\" title=\"".$zrow["displayname"]."\" alt=\"".$zrow["displayname"]."\" class=\"wtw-imagesavatar\" style=\"float:left;margin-right:10px;\" />\r\n";
					}
					$zformdata .= "		<div style=\"margin-left:10px;margin-right:10px;\">\r\n";
					$zformdata .= "			<div class=\"wtw-bluebuttonright\" onclick=\"WTW.openFullPageForm('fullpage','Avatar Profile','wtw_avatarprofilepage');wtwavatars.loadAvatarEditDDL('wtw_selecteditavatar','".$zrow["avatarid"]."');\">Edit</div>\r\n";
					
					$zformdata .= "			<h3 class=\"wtw-black\">".$zrow["displayname"]."</h3><br />\r\n";
					$zformdata .= "			<div class=\"wtw-black\">Folder: ".$zrow["objectfolder"]."</div><br /><br />\r\n";
					$zformdata .= "			<div class=\"wtw-black\">File: ".$zrow["objectfile"]."</div><br /><br />\r\n";
					$zformdata .= "		</div><div class=\"wtw-clear\"></div>\r\n";
				}
				$i += 1;
			}
			if ($i > 0) {
				$zformdata .= "			</div>\r\n";
			}
			$zformdata .= "		</div>\r\n";
			$zformdata .= "	</div>\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-adminAvatarListForm=".$e->getMessage());
		}
		return $zformdata;
	}
*/
	public function adminAvatarProfileForm() {
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "	<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardboxtitle\"><div id='wtw_addavatarprofile' class='wtw-greenbuttonright' onclick=\"wtwavatars.addNewAvatar();\">Add New</div>Avatar Profile</div>\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardbox\">\r\n";
			$zformdata .= "			<div id='wtw_addavatarprofilediv' class=\"wtw-dashboardboxleftfull\">\r\n";
			$zformdata .= "				<div id=\"wtw_addavatarprofiletitle\" class=\"wtw-dashboardboxtitle\">Edit Avatar</div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardbox\">\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardlabel\">Select Avatar to Edit</div>\r\n";
			$zformdata .= "					<select id=\"wtw_selecteditavatar\" onchange=\"wtwavatars.loadEditAvatar();\"></select>\r\n";
			$zformdata .= "					<div class=\"wtw-clear\"></div>\r\n";
			/* avatar details div */
			$zformdata .= "			<div id=\"wtw_avatardetails\" class=\"wtw-hide\">\r\n";
				/* avatar settings section */
			$zformdata .= "				<div class=\"wtw-controlpaneldiv\">\r\n";
			$zformdata .= "					<div class=\"wtw-controlpaneltitlediv\" style=\"font-size:1.4em;\">Avatar Settings</div>\r\n";
			$zformdata .= "					<input type=\"hidden\" id=\"wtw_tavatarprofileavatarid\" />\r\n";
			$zformdata .= "					<input type=\"hidden\" id=\"wtw_tavatarprofilesortorder\" />\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardlabel\">Avatar Group</div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardvalue\"><select id=\"wtw_tavatarprofileavatargroup\" onchange=\"\"></select></div><br />\r\n";
			$zformdata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardlabel\">Avatar Display Name</div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tavatarprofiledisplayname\" maxlength=\"255\" /></div><br />\r\n";
			$zformdata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardlabel\">Gender (female, male, other, n/a, etc...)</div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tavatarprofilegender\" maxlength=\"25\" /></div><br />\r\n";
			$zformdata .= "					<div class=\"wtw-clear\"></div>\r\n";
				/* avatar scaling */
			$zformdata .= "					<div class=\"wtw-dashboardlabel\" style=\"font-size:1.2em;font-weight:bold;\">Avatar Scaling (Size)</div>\r\n";
			$zformdata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardlabel\">Scaling Z (left,-right)</div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tavatarprofilescalingz\" maxlength=\"25\" /></div><br />\r\n";
			$zformdata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardlabel\">Scaling X (front,-back)</div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tavatarprofilescalingx\" maxlength=\"25\" /></div><br />\r\n";
			$zformdata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardlabel\">Scaling Y (up,-down)</div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tavatarprofilescalingy\" maxlength=\"25\" /></div><br />\r\n";
			$zformdata .= "					<div class=\"wtw-clear\"></div>\r\n";
				/* avatar files */
			$zformdata .= "					<div class=\"wtw-dashboardlabel\" style=\"font-size:1.2em;font-weight:bold;\">Avatar Folder and Files</div>\r\n";
			$zformdata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardlabel\">Avatar Folder</div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tavatarprofilefolder\" maxlength=\"255\" style=\"width:360px;\" /></div><br />\r\n";
			$zformdata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardlabel\">Avatar File</div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tavatarprofilefile\" maxlength=\"255\" style=\"width:360px;\" /></div><br />\r\n";
			$zformdata .= "					<div class=\"wtw-clear\"></div>\r\n";
				/* avatar idle animation */
			$zformdata .= "					<div class=\"wtw-dashboardlabel\" style=\"font-size:1.2em;font-weight:bold;\">Initial Avatar Idle Animation (if included in main file)</div>\r\n";
			$zformdata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardlabel\">Start Frame</div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tavatarprofilestartframe\" maxlength=\"25\" /></div><br />\r\n";
			$zformdata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardlabel\">End Frame</div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tavatarprofileendframe\" maxlength=\"25\" /></div><br />\r\n";
			$zformdata .= "					<div class=\"wtw-clear\"></div>\r\n";
				/* save and delete buttons */
			$zformdata .= " 				<div id=\"wtw_avatarprofileerror\" class=\"wtw-error\"></div>\r\n";
			$zformdata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "					<div id=\"wtw_bavatarprofiledelete\" class='wtw-redbuttonleft' onclick=\"wtwavatars.saveAvatarProfileForm(0);\">Delete Avatar Profile</div>\r\n";
			$zformdata .= "					<div id=\"wtw_bavatarprofilesave\" class='wtw-greenbuttonright' onclick=\"wtwavatars.saveAvatarProfileForm(1);\">Save Avatar Profile</div>\r\n";
			$zformdata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "				</div>\r\n";
			
			/* avatar colors section */
			$zformdata .= "				<div class=\"wtw-controlpaneldiv\">\r\n";
			$zformdata .= "					<div class=\"wtw-controlpaneltitlediv\" style=\"font-size:1.4em;\">Avatar Colors</div>\r\n";
			$zformdata .= " 				<div id=\"wtw_avatarprofilecolorlist\"></div>\r\n";
			$zformdata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "				</div>\r\n";

			/* avatar animations section */
			$zformdata .= "				<div class=\"wtw-controlpaneldiv\">\r\n";
			$zformdata .= "					<div class=\"wtw-controlpaneltitlediv\" style=\"font-size:1.4em;\">Avatar Animations</div>\r\n";
			$zformdata .= " 				<div id=\"wtw_avatarprofileanimationlist\"></div>\r\n";
			$zformdata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "				</div>\r\n";


			$zformdata .= "					</div>\r\n";
			$zformdata .= "				</div>\r\n";
			$zformdata .= "			</div>\r\n";
			$zformdata .= "		</div>\r\n";
			$zformdata .= "	</div>\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-adminAvatarProfileForm=".$e->getMessage());
		}
		return $zformdata;
	}
	
	public function adminAvatarGroupsForm() {
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "	<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardboxtitle\"><div id='wtw_addavatargroup' class='wtw-greenbuttonright' onclick=\"wtwavatars.openAvatarGroupForm();\">Add New</div>Avatar Groups</div>\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardbox\">\r\n";
			$zformdata .= "			<div id='wtw_addavatargroupdiv' class=\"wtw-dashboardboxleftfull wtw-hide\">\r\n";
			$zformdata .= "				<div id=\"wtw_addavatargrouptitle\" class=\"wtw-dashboardboxtitle\">Add Avatar Group</div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardbox\">\r\n";

			$zformdata .= "						<div class=\"wtw-dashboardlabel\">Avatar Group Name</div>\r\n";
			$zformdata .= "						<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tavatargroup\" maxlength=\"255\" style=\"width:360px;\" /></div><br />\r\n";
			$zformdata .= "						<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= " 					<div id=\"wtw_avatargrouperror\" class=\"wtw-error\"></div>\r\n";
			$zformdata .= "						<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "						<div id=\"wtw_bavatargroupdelete\" class='wtw-redbuttonleft wtw-hide' onclick=\"wtwavatars.saveAvatarGroupForm(0);\">Delete Avatar Group</div>\r\n";
			$zformdata .= "						<div id=\"wtw_bavatargroupsave\" class='wtw-greenbuttonright' onclick=\"wtwavatars.saveAvatarGroupForm(1);\">Save Avatar Group</div>\r\n";
			$zformdata .= "						<div class='wtw-yellowbuttonright' onclick=\"wtwavatars.saveAvatarGroupForm(-1);\">Cancel</div>\r\n";
			$zformdata .= "					</div>\r\n";
			$zformdata .= "				</div><br /><br />\r\n";
			$zformdata .= "				<div id=\"wtw_avatargroupslist\">\r\n";
			
			$zavatargroup = '';
			$zresults = $wtwplugins->query("
				select * 
				from ".wtw_tableprefix."avatargroups
				where deleted=0
				order by avatargroup, avatargroupid;");
			foreach ($zresults as $zrow) {
				$zformdata .= "<div class=\"wtw-biglistleft\">".$zrow["avatargroup"]."</div><div class=\"wtw-bluebuttonright\" onclick=\"wtwavatars.openAvatarGroupForm('".$zrow["avatargroupid"]."','".$zrow["avatargroup"]."');\">Edit</div><div class=\"wtw-clear\"></div><hr />";
			}
			$zformdata .= "			</div>\r\n";
			$zformdata .= "		</div>\r\n";
			$zformdata .= "	</div>\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-adminAvatarGroupsForm=".$e->getMessage());
		}
		return $zformdata;
	}
		
	public function adminAvatarAnimationEventsForm() {
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "	<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardboxtitle\"><div id='wtw_addavataranimationevent' class='wtw-greenbuttonright' onclick=\"wtwavatars.openAvatarAnimationEventForm();\">Add New</div>Avatar Animation Events</div>\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardbox\">\r\n";
			$zformdata .= "			<div id='wtw_addavataranimationeventdiv' class=\"wtw-dashboardboxleftfull wtw-hide\">\r\n";
			$zformdata .= "				<div id=\"wtw_addavataranimationeventtitle\" class=\"wtw-dashboardboxtitle\">Add Avatar Animation Event</div>\r\n";
			$zformdata .= "					<div class=\"wtw-dashboardbox\">\r\n";

			$zformdata .= "						<div class=\"wtw-dashboardlabel\">Avatar Animation Event</div>\r\n";
			$zformdata .= "						<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tavataranimationeventtext\" maxlength=\"255\" style=\"width:360px;\" /></div><br />\r\n";
			$zformdata .= "						<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "						<div class=\"wtw-dashboardlabel\">Load Priority (Highest Number Loads First)</div>\r\n";
			$zformdata .= "						<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tavatarloadpriority\" maxlength=\"255\" style=\"width:360px;\" /></div><br />\r\n";
			$zformdata .= "						<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= " 					<div id=\"wtw_avataranimationeventerror\" class=\"wtw-error\"></div>\r\n";
			$zformdata .= "						<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "						<div id=\"wtw_bavataranimationeventdelete\" class='wtw-redbuttonleft wtw-hide' onclick=\"wtwavatars.saveAvatarAnimationEventForm(0);\">Delete Avatar Animation Event</div>\r\n";
			$zformdata .= "						<div id=\"wtw_bavataranimationeventsave\" class='wtw-greenbuttonright' onclick=\"wtwavatars.saveAvatarAnimationEventForm(1);\">Save Avatar Animation Event</div>\r\n";
			$zformdata .= "						<div class='wtw-yellowbuttonright' onclick=\"wtwavatars.saveAvatarAnimationEventForm(-1);\">Cancel</div>\r\n";
			$zformdata .= "					</div>\r\n";
			$zformdata .= "				</div><br /><br />\r\n";
			$zformdata .= "				<div id=\"wtw_avataranimationeventslist\">\r\n";
			
			$zavatargroup = '';
			$zresults = $wtwplugins->query("
				select * 
				from ".wtw_tableprefix."avataranimationevents
				where deleted=0
				order by loadpriority desc, animationevent, animationeventid;");
			foreach ($zresults as $zrow) {
				$zformdata .= "<div class=\"wtw-biglistleft\">".$zrow["animationevent"]."</div><div class=\"wtw-bluebuttonright\" onclick=\"wtwavatars.openAvatarAnimationEventForm('".$zrow["animationeventid"]."','".$zrow["animationevent"]."','".$zrow["loadpriority"]."');\">Edit</div><div style=\"float:right;margin-right:30px;\">Priority: ".$zrow["loadpriority"]."</div><div class=\"wtw-clear\"></div><hr />";
			}
			$zformdata .= "			</div>\r\n";
			$zformdata .= "		</div>\r\n";
			$zformdata .= "	</div>\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-avatars:functions-class_plugin.php-adminAvatarAnimationEventsForm=".$e->getMessage());
		}
		return $zformdata;
	}
}

	function wtwavatars() {
		return wtwavatars::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwavatars'] = wtwavatars();

?>
<?php
class wtwshopping {
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
			$wtwplugins->serror("plugins:wtw-shopping:functions-class_wtwshopping.php-construct=".$e->getMessage());
		}
	}	
	
	public $version = "1.0.2";
	public $dbversion = "1.0.4";
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
			$wtwplugins->serror("plugins:wtw-shopping:functions-class_wtwshopping.php-define=".$e->getMessage());
		}
	}

	public function defineConstants() {
		global $wtwplugins;
		try {
			$this->define('WTWSHOPPING_PLUGIN', basename(strtolower(WTWSHOPPING_FILE),".php"));
			$this->define('WTWSHOPPING_PATH', dirname(WTWSHOPPING_FILE));
			$this->define('WTWSHOPPING_URL', $wtwplugins->contenturl.'/plugins/'.WTWSHOPPING_PLUGIN);
			$this->define('WTWSHOPPING_PREFIX', str_replace("wtw_wtw-","wtw_",wtw_tableprefix.WTWSHOPPING_PLUGIN)."_");
			$this->define('WTWSHOPPING_VERSION', $this->version);
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-shopping:functions-class_wtwshopping.php-defineConstants=".$e->getMessage());
		}
	}

	public function initClass() {
		global $wtwplugins;
		try {
			$this->initAdminOnlyHooks();
			$this->initHooks();
			$this->checkTablesForUpdates();
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-shopping:functions-class_wtwshopping.php-initClass=".$e->getMessage());
		}
	}
	
	public function initAdminOnlyHooks() {
		global $wtwplugins;
		try {
			/* Admin only hooks */
			if ($wtwplugins->pagename == "admin.php") {
				/* admin menu items */
				/* wtwplugins class -> addAdminMenuItem function (menu item id, menu text, level 1 sort, level 1 id, level 2 sort, level 2 id, level 1 icon, allowed roles array - null for all, onclick JavaScript function) */
				$wtwplugins->addAdminMenuItem('wtw_adminshopping', $wtwplugins->__('3D Stores'), 25, 'wtw_shopping', 0, '', WTWSHOPPING_URL.'/assets/images/menustore.png', array('admin','developer','architect','host'), "WTW.adminMenuItemSelected(this);WTW.toggleAdminSubMenu(this);");
				$wtwplugins->addAdminMenuItem('wtw_adminliststores', $wtwplugins->__('All 3D Stores'), 25, 'wtw_shopping', 1, 'wtw_liststores', '', array('admin','developer','architect','host'), "WTW.openFullPageForm('fullpage','".$wtwplugins->__('All 3D Stores')."','wtw_liststorespage');WTWShopping.getStores();");
				$wtwplugins->addAdminMenuItem('wtw_adminaddstore', $wtwplugins->__('Add Store'), 25, 'wtw_shopping', 2, 'wtw_addstore', '', array('admin','developer','architect','host'), "WTWShopping.openAddStoreForm();");

				/* admin full page settings forms */
				/* wtwplugins class -> addFullPageForm function (form id, allowed roles array - null for all, form html string) */
				$wtwplugins->addFullPageForm('wtw_liststorespage', array('admin','developer','architect','host'), $this->listStoresPage());
				$wtwplugins->addFullPageForm('wtw_addstoresettingspage', array('admin','developer','architect','host'), $this->addStoreSettingsPage());

				$wtwplugins->addAdminSubMenuItem('editcommunity', 'wtw_shopping_adminCommunityShoppingObjects', $wtwplugins->__('Add 3D Store Object'), 110, array('admin','developer','architect','host'), "WTWShopping.openAdminStoreObjects();");
				
				$wtwplugins->addAdminSubMenuItem('editbuilding', 'wtw_shopping_adminBuildingShoppingObjects', $wtwplugins->__('Add 3D Store Object'), 110, array('admin','developer','architect','host'), "WTWShopping.openAdminStoreObjects();");
				
				$wtwplugins->addAdminSubMenuItem('editthing', 'wtw_shopping_adminThingShoppingObjects', $wtwplugins->__('Add 3D Store Object'), 110, array('admin','developer','architect','host'), "WTWShopping.openAdminStoreObjects();");
				
				$wtwplugins->addAdminSubMenuItem('communityoptions', 'wtwshopping_admincommunitystores', $wtwplugins->__('3D Store Settings'), 27, array('admin','developer','architect','host'), "WTWShopping.getStoresDropdown('community');");
				$wtwplugins->addAdminSubMenuItem('buildingoptions', 'wtwshopping_adminbuildingstores', $wtwplugins->__('3D Store Settings'), 27, array('admin','developer','architect','host'), "WTWShopping.getStoresDropdown('building');");
				$wtwplugins->addAdminSubMenuItem('thingoptions', 'wtwshopping_adminthingstores', $wtwplugins->__('3D Store Settings'), 27, array('admin','developer','architect','host'), "WTWShopping.getStoresDropdown('thing');");
				
				$wtwplugins->addAdminMenuForm('wtwshopping_adminMoldObjectsDiv', $wtwplugins->__('Add 3D Store Object'), $this->storeObjectsForm(), array('admin','developer','architect','host'));

				$wtwplugins->addAdminMenuForm('wtwshopping_admincommunitystoresdiv', $wtwplugins->__('3D Store Settings'), $this->storeSettingsForm('community'), array('admin','developer','architect','host'));
				$wtwplugins->addAdminMenuForm('wtwshopping_adminbuildingstoresdiv', $wtwplugins->__('3D Store Settings'), $this->storeSettingsForm('building'), array('admin','developer','architect','host'));
				$wtwplugins->addAdminMenuForm('wtwshopping_adminthingstoresdiv', $wtwplugins->__('3D Store Settings'), $this->storeSettingsForm('thing'), array('admin','developer','architect','host'));
				
				/* add div section to edit mold form */
				$wtwplugins->addAdminMenuDiv('editmold', 'wtw_productdiv', $this->editMoldPage(), array('admin','developer','architect','host'));
				
				/* hook plugin admin script functions into existing wtw functions */
				$wtwplugins->addScriptFunction("setnewmold", "WTWShopping.setNewMold(zmoldname, zmolds, zmoldind, zrebuildmold);");
				$wtwplugins->addScriptFunction("resetmoldcolor", "WTWShopping.resetMoldColor(zmoldname, zcolorgroup, zemissivecolor, zdiffusecolor, zspecularcolor, zambientcolor);");
				$wtwplugins->addScriptFunction("openaddnewmold", "WTWShopping.openAddNewMold(zwebtype, zshape, zmoldname);");
				$wtwplugins->addScriptFunction("setnewmolddefaults", "WTWShopping.setNewMoldDefaults(zshape);");
				$wtwplugins->addScriptFunction("setmoldformfields", "WTWShopping.setMoldFormFields(zshape);");
				$wtwplugins->addScriptFunction("openmoldform", "WTWShopping.openMoldForm(zmoldname, zmoldind, zshape, zwebtype);");
				$wtwplugins->addScriptFunction("loadmoldform", "WTWShopping.loadMoldForm(zwebtype, zshape, zmoldname);");
				$wtwplugins->addScriptFunction("submitmoldform", "WTWShopping.submitMoldForm(zselect);");
				$wtwplugins->addScriptFunction("cleareditmold", "WTWShopping.clearEditMold();");
				$wtwplugins->addScriptFunction("toggleadminsubmenu", "WTWShopping.toggleAdminSubMenu(zobj);");
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-shopping:functions-class_wtwshopping.php-initAdminOnlyHooks=".$e->getMessage());
		}
	}	
	
	public function initHooks() {
		global $wtwplugins;
		try {
			/* Browse and Admin hooks  (admin inherrits all browse functions) */

			/* javascripts */
			/* wtwplugins class -> addScript function (script id, '1' for admin only, script browse url) */
			$wtwplugins->addScript('wtw_shoppingscript', null, WTWSHOPPING_URL."/scripts/wtwshopping.js");
			$wtwplugins->addScript('wtw_shoppingadminscript', null, WTWSHOPPING_URL."/scripts/wtwshoppingadmin.js");
			$wtwplugins->addScript('wtw_shoppingmoldsscript', null, WTWSHOPPING_URL."/scripts/wtwshoppingmolds.js");
			
			/* hook plugin script functions into existing wtw functions */
			$wtwplugins->addScriptFunction("onclick", "WTWShopping.onClick(zpickedname);");
			$wtwplugins->addScriptFunction("checkhovers", "WTWShopping.checkHovers(zmoldname, zshape);");
			$wtwplugins->addScriptFunction("resethovers", "WTWShopping.resetHovers(zmoldname, zshape);");
			$wtwplugins->addScriptFunction("openmoldcolorselector", "WTWShopping.openMoldColorSelector(zmold, zmoldname, zshape, zcolorgroup);");
			$wtwplugins->addScriptFunction("keydownselectedmold", "WTWShopping.keyDownSelectedMold(zevent);");
			$wtwplugins->addScriptFunction("clearselectedmold", "WTWShopping.clearSelectedMold();");

			$wtwplugins->addScriptFunction("moldqueueadd", "WTWShopping.moldQueueAdd(zmoldname, zmold);");

			$wtwplugins->addScriptFunction("loadconnectinggrids", "WTWShopping.loadConnectingGrids(zconnectinggridind, zcommunityid, zbuildingid, zthingid);");
			$wtwplugins->addScriptFunction("disposeclean", "WTWShopping.disposeClean(zmoldname);");
			
			/* The following create the list of new molds added by this plugin and assign the script to create the mold */
			$wtwplugins->addMoldDef("Store Product", "custom", "WTWShopping.addMoldStoreProduct(zmoldname, zmolddef, zlenx, zleny, zlenz);");

			$wtwplugins->addMoldDef("Store Add to Cart", "custom", "WTWShopping.addMoldStoreButton(zmoldname, zmolddef, zlenx, zleny, zlenz);");
			$wtwplugins->addMoldDef("Store Buy Now", "custom", "WTWShopping.addMoldStoreButton(zmoldname, zmolddef, zlenx, zleny, zlenz);");
			$wtwplugins->addMoldDef("Store Checkout", "custom", "WTWShopping.addMoldStoreButton(zmoldname, zmolddef, zlenx, zleny, zlenz);");
			$wtwplugins->addMoldDef("Store Read More", "custom", "WTWShopping.addMoldStoreButton(zmoldname, zmolddef, zlenx, zleny, zlenz);");
			$wtwplugins->addMoldDef("Store View Cart", "custom", "WTWShopping.addMoldStoreButton(zmoldname, zmolddef, zlenx, zleny, zlenz);");

			$wtwplugins->addMoldDef("Store Sign", "custom", "WTWShopping.addMoldStoreSign(zmoldname, zmolddef, zlenx, zleny, zlenz);");
			$wtwplugins->addMoldDef("Store 3D Sign", "custom", "WTWShopping.addMoldStore3DSign(zmoldname, zmolddef, zlenx, zleny, zlenz);");
			$wtwplugins->addMoldDef("Store Categories", "custom", "WTWShopping.addMoldStoreCategories(zmoldname, zmolddef, zlenx, zleny, zlenz);");
			$wtwplugins->addMoldDef("Product Search", "custom", "WTWShopping.addMoldProductSearch(zmoldname, zmolddef, zlenx, zleny, zlenz);");
			
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-shopping:functions-class_wtwshopping.php-initHooks=".$e->getMessage());
		}
	}	
	
	public function addStoreSettingsPage() {
		/* Admin add store settings page */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<div class=\"wtw-dashboardboxleft\">\r\n";
			$zformdata .= "		<div id=\"wtw_shopping_addstoretitle\" class=\"wtw-dashboardboxtitle\">Add Store</div>\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardbox\"><input type=\"hidden\" id=\"wtw_tstoreid\" maxlength=\"16\" />\r\n";
			$zformdata .= "			<div class='wtw-roundedbox'><b>3D Stores</b> are a way to connect your <b>WordPress WooCommerce</b> shopping cart and products into 3D Communities, 3D Buildings, and 3D Things.<br /></div>\r\n";
			$zformdata .= "			<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "			<div class=\"wtw-dashboardlabel\">Store Name</div>\r\n";
			$zformdata .= "			<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tstorename\" maxlength=\"255\" /></div>\r\n";
			$zformdata .= "			<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "			<div class=\"wtw-dashboardlabel\">Allow IFrames</div>\r\n";
			$zformdata .= "			<div class=\"wtw-dashboardvalue\"><input type=\"checkbox\" id=\"wtw_tstoreiframes\" value=\"1\" /></div>\r\n";
			$zformdata .= "			<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "			<div class=\"wtw-dashboardlabel\">Store URL</div>\r\n";
			$zformdata .= "			<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tstoreurl\" maxlength=\"255\" onkeyup=\"WTWShopping.prefillStoreForm();\" /></div>\r\n";
			$zformdata .= "			<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "			<div class=\"wtw-dashboardlabel\">Store Cart URL</div>\r\n";
			$zformdata .= "			<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tstorecarturl\" maxlength=\"255\" /></div>\r\n";
			$zformdata .= "			<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "			<div class=\"wtw-dashboardlabel\">Store Product URL</div>\r\n";
			$zformdata .= "			<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tstoreproducturl\" maxlength=\"255\" /></div>\r\n";
			$zformdata .= "			<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "			<div class=\"wtw-dashboardlabel\">WooCommerce API URL</div>\r\n";
			$zformdata .= "			<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tstorewooapiurl\" maxlength=\"255\" /></div>\r\n";
			$zformdata .= "			<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "			<div class=\"wtw-dashboardlabel\">WooCommerce Key</div>\r\n";
			$zformdata .= "			<div class=\"wtw-dashboardvalue\"><input type=\"password\" id=\"wtw_tstorewookey\" maxlength=\"255\" /></div>\r\n";
			$zformdata .= "			<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "			<div class=\"wtw-dashboardlabel\">WooCommerce Secret</div>\r\n";
			$zformdata .= "			<div class=\"wtw-dashboardvalue\"><input type=\"password\" id=\"wtw_tstorewoosecret\" maxlength=\"255\" /></div>\r\n";
			$zformdata .= "			<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "			<div class=\"wtw-dashboardlabel\">&nbsp;</div>\r\n";
			$zformdata .= "			<div class=\"wtw-dashboardvalue\"><div id=\"wtw_bdeletestore\" class=\"wtw-redbuttonleft wtw-hide\" onclick=\"WTWShopping.deleteStore();\">Delete Store</div>\r\n";
			$zformdata .= "				<div id=\"wtw_baddstore\" class=\"wtw-greenbuttonright\" onclick=\"WTWShopping.addStore();\">Add Store</div>\r\n";
			$zformdata .= "				<div id=\"wtw_cancelsavestore\" class=\"wtw-yellowbuttonright\" onclick=\"WTWShopping.cancelSaveStore(true);\">Cancel</div></div>\r\n";
			$zformdata .= "			<div class=\"wtw-clear\"></div>\r\n";
			$zformdata .= "		</div>\r\n";
			$zformdata .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-shopping:functions-class_wtwshopping.php-addStoreSettingsPage=".$e->getMessage());
		}
		return $zformdata;
	}

	public function listStoresPage() {
		/* admin list stores page */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardboxtitle\"><div id=\"wtw_addstorebutton\" class=\"wtw-greenbuttonright\" onclick=\"WTWShopping.openAddStoreForm();\">Add New</div>All 3D Stores</div>\r\n";
			$zformdata .= "			<div class='wtw-roundedbox'><b>3D Stores</b> are a way to connect your <b>WordPress WooCommerce</b> shopping cart and products into 3D Communities, 3D Buildings, and 3D Things. Allow or Deny permissions on this page allow your WordPress instance to view WalkTheWeb settings (using the WalkTheWeb Plugin).<br /><br />After a <b>3D Store</b> is added, open a 3D Community, 3D Building, or 3D Thing and select <b>Options and Settings -&gt; 3D Store Settings</b> to connect it to a particular 3D Store and Products.<br /></div>\r\n";
			$zformdata .= "			<div class='wtw-clear'></div>\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardbox\">\r\n";
			$zformdata .= "			<div id=\"wtw_shopping_liststores\"></div>\r\n";
			$zformdata .= "		</div>\r\n";
			$zformdata .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-shopping:functions-class_wtwshopping.php-listStoresPage=".$e->getMessage());
		}
		return $zformdata;
	}
	
	public function storeObjectsForm() {
		/* admin store settings form */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<div id=\"wtw_shopping_moldsbuttonlist\"></div><br />\r\n";
			$zformdata .= "<div id=\"wtw_shopping_cancelstoreobject\" class=\"wtw-yellowbutton\" onclick=\"WTWShopping.closeAdminStoreObjects();\">Cancel</div><br /><br />\r\n\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-shopping:functions-class_wtwshopping.php-storeObjectsForm=".$e->getMessage());
		}
		return $zformdata;
	}
	
	public function storeSettingsForm($zwebtype) {
		/* admin store settings form */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<h2 style=\"margin-bottom:3px;\">Connect 3D Store</h2><br /><div class=\"wtw-indent\">\r\n";
			$zformdata .= "<select id=\"wtwshopping_".$zwebtype."connectstore\" class='wtw-pointer'></select></div><br /><br />\r\n";
			$zformdata .= "<div id=\"wtwshopping_".$zwebtype."saveconnectstore\" class=\"wtw-greenbutton\" onclick=\"WTWShopping.saveConnectStore('".$zwebtype."');\">Save</div>\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-shopping:functions-class_wtwshopping.php-storeSettingsForm=".$e->getMessage());
		}
		return $zformdata;
	}
	
	public function checkTablesForUpdates() {
		/* Table definitions for plugin - used for new installs and updates */
		global $wtwplugins;
		try {
			//if ($wtwplugins->pagename == "admin.php") {
				$dbversion = $wtwplugins->getSetting(WTWSHOPPING_PREFIX."dbversion","1.0.0");
				if ($dbversion != $this->dbversion) {
					$wtwplugins->deltaCreateTable("
						CREATE TABLE `".WTWSHOPPING_PREFIX."stores` (
						  `storeid` varchar(16) NOT NULL,
						  `hostuserid` varchar(16) DEFAULT '',
						  `wpinstanceid` varchar(32) DEFAULT '',
						  `storename` varchar(255) DEFAULT '',
						  `storeiframes` int(11) DEFAULT '0',
						  `storeurl` varchar(255) DEFAULT '',
						  `wtwkey` varchar(255) DEFAULT '',
						  `wtwsecret` varchar(255) DEFAULT '',
						  `storecarturl` varchar(255) DEFAULT '',
						  `storeproducturl` varchar(255) DEFAULT '',
						  `wookeyid` bigint(20) DEFAULT NULL,
						  `woocommerceapiurl` varchar(255) DEFAULT '',
						  `woocommercekey` varchar(255) DEFAULT '',
						  `woocommercesecret` varchar(255) DEFAULT '',
						  `woocommercekeynew` varchar(255) DEFAULT '',
						  `woocommercesecretnew` varchar(255) DEFAULT '',
						  `approveddate` datetime DEFAULT NULL,
						  `approveduserid` varchar(16) DEFAULT '',
						  `createdate` datetime DEFAULT NULL,
						  `createuserid` varchar(16) DEFAULT '',
						  `updatedate` datetime DEFAULT NULL,
						  `updateuserid` varchar(16) DEFAULT '',
						  `deleteddate` datetime DEFAULT NULL,
						  `deleteduserid` varchar(16) DEFAULT '',
						  `deleted` int(11) DEFAULT '0',
						  PRIMARY KEY (`storeid`),
						  UNIQUE KEY `".WTWSHOPPING_PREFIX."storeid_UNIQUE` (`storeid`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;
					");
					$wtwplugins->deltaCreateTable("
						CREATE TABLE `".WTWSHOPPING_PREFIX."connectstores` (
						  `connectid` varchar(16) NOT NULL,
						  `storeid` varchar(16) NOT NULL,
						  `communityid` varchar(16) DEFAULT '',
						  `buildingid` varchar(16) DEFAULT '',
						  `thingid` varchar(16) DEFAULT '',
						  `hostuserid` varchar(16) DEFAULT '',
						  `createdate` datetime DEFAULT NULL,
						  `createuserid` varchar(16) DEFAULT '',
						  `updatedate` datetime DEFAULT NULL,
						  `updateuserid` varchar(16) DEFAULT '',
						  `deleteddate` datetime DEFAULT NULL,
						  `deleteduserid` varchar(16) DEFAULT '',
						  `deleted` int(11) DEFAULT '0',
						  PRIMARY KEY (`connectid`),
						  UNIQUE KEY `".WTWSHOPPING_PREFIX."connectid_UNIQUE` (`connectid`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;
					");
					$wtwplugins->deltaCreateTable("
						CREATE TABLE `".WTWSHOPPING_PREFIX."molds` (
						  `shoppingmoldid` varchar(16) NOT NULL,
						  `moldid` varchar(16) NOT NULL,
						  `communityid` varchar(16) DEFAULT '',
						  `buildingid` varchar(16) DEFAULT '',
						  `thingid` varchar(16) DEFAULT '',
						  `slug` varchar(255) DEFAULT '',
						  `productid` varchar(64) DEFAULT '',
						  `productname` varchar(256) DEFAULT '',
						  `categoryid` varchar(64) DEFAULT '',
						  `allowsearch` int(11) DEFAULT '1',
						  `createdate` datetime DEFAULT NULL,
						  `createuserid` varchar(16) DEFAULT '',
						  `updatedate` datetime DEFAULT NULL,
						  `updateuserid` varchar(16) DEFAULT '',
						  `deleteddate` datetime DEFAULT NULL,
						  `deleteduserid` varchar(16) DEFAULT '',
						  `deleted` int(11) DEFAULT '0',
						  PRIMARY KEY (`shoppingmoldid`),
						  UNIQUE KEY `".WTWSHOPPING_PREFIX."shoppingmoldid_UNIQUE` (`shoppingmoldid`),
						  KEY `idx_".WTWSHOPPING_PREFIX."molds` (`communityid`,`buildingid`,`thingid`,`allowsearch`,`moldid`,`shoppingmoldid`)
						) ENGINE=InnoDB DEFAULT CHARSET=utf8;
					");
					$wtwplugins->saveSetting(WTWSHOPPING_PREFIX."dbversion", $this->dbversion);
				}
			//}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-shopping:functions-class_wtwshopping.php-checkTablesForUpdates=".$e->getMessage());
		}
	}

	public function editMoldPage() {
		/* admin edit mold div gets added edit mold form */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<div id=\"wtw_productdiv\">\r\n";
			$zformdata .= " 	<input type=\"hidden\" id=\"wtw_tmoldproductid\" />\r\n";
			$zformdata .= " 	<input type=\"hidden\" id=\"wtw_tmoldcategoryid\" />\r\n";
			$zformdata .= " 	<input type=\"hidden\" id=\"wtw_tmoldallowsearch\" />\r\n";
			$zformdata .= " 	<input type=\"hidden\" id=\"wtw_tmoldslug\" />\r\n";
			$zformdata .= "		<h2 style=\"margin-bottom:3px;\">Display Type</h2>\r\n";
			$zformdata .= "		<select id=\"wtw_tmoldspecial1set\" onchange=\"dGet('wtw_tmoldspecial1').value=dGet('wtw_tmoldspecial1set').options[dGet('wtw_tmoldspecial1set').selectedIndex].value;WTW.setNewMold(1);\" class='wtw-pointer'>\r\n";
			$zformdata .= "			<option value=\"0\">Rounded Box Display (2 Sides)</option>\r\n";
			$zformdata .= "			<option value=\"1\">Rounded Box Display (1 Side)</option>\r\n";
			$zformdata .= "			<option value=\"2\">Rounded Box No Image</option>\r\n";
			$zformdata .= "		</select>\r\n";
			$zformdata .= "		<h2 style=\"margin-bottom:3px;\">Product Selection</h2>\r\n";
			$zformdata .= "		<h4>Product Category</h4>\r\n";
			$zformdata .= "		<select id=\"wtw_tcategoryid\" onchange=\"WTWShopping.setCategory(this.options[this.selectedIndex].value, dGet('wtw_tmoldname').value);\" class='wtw-pointer'>\r\n";
			$zformdata .= "		</select>\r\n";
			$zformdata .= "		<h4>Product</h4>\r\n";
			$zformdata .= "		<select id=\"wtw_tproductid\" onchange=\"WTWShopping.setProduct(this.options[this.selectedIndex].value, dGet('wtw_tmoldname').value);\" class='wtw-pointer'>\r\n";
			$zformdata .= "		</select><br /><br />\r\n";
			$zformdata .= "		<input type=\"checkbox\" id=\"wtw_tallowsearch\" class=\"wtw-smallprint\" value=\"1\" onchange=\"WTWShopping.setAllowSearch();\" /> Allow Search to Override<br />this Product Display<br /><br />\r\n";
			$zformdata .= "		<hr class=\"wtw-menuhr\" />\r\n";
			$zformdata .= "	</div>\r\n";
			$zformdata .= "	<div id=\"wtw_productthingdiv\">\r\n";
			$zformdata .= "		<h4 style=\"margin-bottom:3px;\">Product Selection</h4>\r\n";
			$zformdata .= "		<div style=\"color:#c0c0c0;\">Connect the Store in Options and Settings to select a product.</div>\r\n";
			$zformdata .= "		<hr class=\"wtw-menuhr\" />\r\n";
			$zformdata .= "</div>\r\n";

			$zformdata .= "	<div id=\"wtw_productsearchdiv\">\r\n";
			$zformdata .= "		<h2 style=\"margin-bottom:3px;\">Product Search Type</h2>\r\n";
			$zformdata .= "		<select id=\"wtw_tmoldspecial1set2\" onchange=\"dGet('wtw_tmoldspecial1').value=dGet('wtw_tmoldspecial1set2').options[dGet('wtw_tmoldspecial1set2').selectedIndex].value;WTW.setNewMold(1);\" class='wtw-pointer'>\r\n";
			$zformdata .= "			<option value=\"0\">Search Tablet</option>\r\n";
			$zformdata .= "			<option value=\"1\">Search Tablet with Sign</option>\r\n";
			$zformdata .= "			<option value=\"2\">Search Kiosk</option>\r\n";
			$zformdata .= "			<option value=\"3\">Search Kiosk with Sign</option>\r\n";
			$zformdata .= "		</select>\r\n";
			$zformdata .= "</div>\r\n";

		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-shopping:functions-class_wtwshopping.php-editMoldPage=".$e->getMessage());
		}
		return $zformdata;
	}
}

	function wtwshopping() {
		return wtwshopping::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwshopping'] = wtwshopping();

?>
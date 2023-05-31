<?php
class wtwplugins {
	/* wtwplugins class for WalkTheWeb plugins to have easy access to common used functions for reading, scrubbing data, and database interaction */
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {

	}	
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	/* declare public $wtwplugins variables */
	public $serverinstanceid = '';
	public $serverip = '';
	public $rootpath = '';
	public $contentpath = '';
	public $contenturl = '';
	public $protocol = 'http://';
	public $domainname = '';
	public $domainurl = '';
	public $pagename = '';
	public $userid = '';
	public $userip = '';
	public $uri = '';
	public $community = '';
	public $building = '';
	public $thing = '';
	public $communityid = '';
	public $buildingid = '';
	public $thingid = '';
	public $avatarid = "";

	public function initClass() {
		/* set the global variables */
		global $wtw;
		if ($wtw != null) {
			$this->serverinstanceid = $wtw->serverinstanceid;
			$this->serverip = $wtw->serverip;
			$this->rootpath = wtw_rootpath;
			$this->contentpath = $wtw->contentpath;
			$this->contenturl = $wtw->contenturl;
			$this->protocol = $wtw->protocol;
			$this->domainname = $wtw->domainname;
			$this->domainurl = $wtw->domainurl;
			$this->pagename = $wtw->pagename;
			$this->userid = $wtw->userid;
			$this->userip = $wtw->userip;
			$this->uri = $wtw->uri;
			$this->community = $wtw->community;
			$this->building = $wtw->building;
			$this->thing = $wtw->thing;
			$this->communityid = $wtw->communityid;
			$this->buildingid = $wtw->buildingid;
			$this->thingid = $wtw->thingid;
			$this->avatarid = $wtw->avatarid;
		}
	}
	
	/* expose functions to this class from other functions so that the original function is only updated in one place */
	public function addAdminMenuItem($zid, $ztitle, $zmenusort, $zmenu, $zsubmenusort, $zsubmenu, $ziconurl, $zaccessrequired, $zjsfunction) {
		global $wtwadminmenu;
		if (isset($wtwadminmenu)) {
			return $wtwadminmenu->addAdminMenuItem($zid, $ztitle, $zmenusort, $zmenu, $zsubmenusort, $zsubmenu, $ziconurl, $zaccessrequired, $zjsfunction);
		} else {
			return false;
		}
	}

	public function getAdminSubMenu($zselectmenu) {
		global $wtwadminmenu;
		if (isset($wtwadminmenu)) {
			return $wtwadminmenu->getAdminSubMenu($zselectmenu);
		} else {
			return false;
		}
	}
	
	public function addFullPageForm($zid, $zaccessrequired, $zfullpagedata) {
		global $wtwadmin;
		if (isset($wtwadmin)) {
			return $wtwadmin->addFullPageForm($zid, $zaccessrequired, $zfullpagedata);
		} else {
			return false;
		}
	}
	
	public function addSettingsMenuItem($zid, $ztitle, $zmenusort, $zmenu, $ziconurl, $zaccessrequired, $zjsfunction) {
		global $wtwmenus;
		if (isset($wtwmenus)) {
			return $wtwmenus->addSettingsMenuItem($zid, $ztitle, $zmenusort, $zmenu, $ziconurl, $zaccessrequired, $zjsfunction);
		} else {
			return false;
		}
	}
	
	public function addMenuForm($zformid, $ztitle, $zformdata, $zaccessrequired, $zcssclass) {
		global $wtwmenus;
		if (isset($wtwmenus)) {
			return $wtwmenus->addMenuForm($zformid, $ztitle, $zformdata, $zaccessrequired, $zcssclass);
		} else {
			return false;
		}
	}

	public function addAdminSubMenuItem($zmenu, $zid, $ztitle, $zsubmenusort, $zaccessrequired, $zjsfunction) {
		global $wtwadminmenu;
		if (isset($wtwadminmenu)) {
			return $wtwadminmenu->addAdminSubMenuItem($zmenu, $zid, $ztitle, $zsubmenusort, $zaccessrequired, $zjsfunction);
		} else {
			return false;
		}
	}

	public function addAdminMenuForm($zformid, $ztitle, $zformdata, $zaccessrequired) {
		global $wtwadminmenu;
		if (isset($wtwadminmenu)) {
			return $wtwadminmenu->addAdminMenuForm($zformid, $ztitle, $zformdata, $zaccessrequired);
		} else {
			return false;
		}
	}

	public function addAdminMenuDiv($zformlocation, $zdivid, $zdivdata, $zaccessrequired) {
		global $wtwadminmenu;
		if (isset($wtwadminmenu)) {
			return $wtwadminmenu->addAdminMenuDiv($zformlocation, $zdivid, $zdivdata, $zaccessrequired);
		} else {
			return false;
		}
	}
	public function serror($message) {
		global $wtw;
		return $wtw->serror($message);
	}
	
	public function query($zsql) {
		global $wtwdb;
		return $wtwdb->query($zsql);
	}
	
	public function deltaCreateTable($zsql) {
		global $wtwdb;
		return $wtwdb->deltaCreateTable($zsql);
	}

	public function getRandomString($zlength,$zstringtype) {
		global $wtwdb;
		return $wtwdb->getRandomString($zlength,$zstringtype);
	}

	public function getSetting($zsettingname, $zdefaultvalue) {
		global $wtwdb;
		return $wtwdb->getSetting($zsettingname, $zdefaultvalue);
	}

	public function saveSetting($zsettingname, $zsettingvalue) {
		global $wtwdb;
		return $wtwdb->saveSetting($zsettingname, $zsettingvalue);
	}

	public function getSettings($zsettingnames) {
		global $wtwdb;
		return $wtwdb->getSettings($zsettingnames);
	}

	public function saveSettings($zsettings) {
		global $wtwdb;
		return $wtwdb->saveSettings($zsettings);
	}
	
	public function getVal($key, $defaultval) {
		global $wtwdb;
		return $wtwdb->getVal($key, $defaultval);
	}

	public function getNumber($key, $defaultval) {
		global $wtwdb;
		return $wtwdb->getNumber($key, $defaultval);
	}

	public function checkValue($zvalue, $zdefaultval = null) {
		global $wtwdb;
		return $wtwdb->checkValue($zvalue, $zdefaultval);
	}

	public function hasValue(&$zvalue) {
		$zresponse = false;
		try {
			if (isset($zvalue) && !empty($zvalue)) {
				$zresponse = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwplugins.php-hasValue=".$e->getMessage());
		}
		return $zresponse;
	}

	public function checkIDFormat($zid) {
		global $wtwdb;
		return $wtwdb->checkIDFormat($zid);
	}

	public function checkNumber($val, $defaultval) {
		global $wtwdb;
		return $wtwdb->checkNumber($val, $defaultval);
	}

	public function getMaximumFileUploadSize() {  
		global $wtwdb;
		return $wtwdb->getMaximumFileUploadSize();
	}  

	public function convertPHPSizeToBytes($zsize) {
		global $wtwdb;
		return $wtwdb->convertPHPSizeToBytes($zsize);
	}
	
	public function checkAlphaNumeric($zid) {
		global $wtwdb;
		return $wtwdb->checkAlphaNumeric($zid);
	}

	public function checkFolderPath($zurl) {
		global $wtwdb;
		return $wtwdb->checkFolderPath($zurl);
	}

	public function checkFileName($zid) {
		global $wtwdb;
		return $wtwdb->checkFileName($zid);
	}

	public function checkFunctionName($zid) {
		global $wtwdb;
		return $wtwdb->checkFunctionName($zid);
	}

	public function checkPublishName($zdomainname, $zwebtype, $zpublishname) {
		global $wtwdb;
		return $wtwdb->checkPublishName($zdomainname, $zwebtype, $zpublishname);
	}

	public function prepCheckDate($zdate) {
		/* returns either 'dateformatted' or NULL - ready to be used in SQL */
		global $wtwdb;
		return $wtwdb->prepCheckDate($zdate);
	}

	public function formatDate($zdate) {
		/* returns mm/dd/yyyy */
		global $wtwdb;
		return $wtwdb->formatDate($zdate);
	}
	
	public function formatMoney($znumber) {
		/* returns $##,###.## */
		global $wtwdb;
		return $wtwdb->formatMoney($znumber);
	}
	
	public function escapeHTML($text) {
		global $wtwdb;
		return $wtwdb->escapeHTML($text);
	}

	public function getNewKey($ztablename, $zfieldid, $zdefaultkeyid) {
		global $wtwdb;
		return $wtwdb->getNewKey($ztablename, $zfieldid, $zdefaultkeyid);
	}

	public function getIDByPastID($ztablename, $zfieldid, $zpastfieldid, $zpastid) {
		global $wtwdb;
		return $wtwdb->getIDByPastID($ztablename, $zfieldid, $zpastfieldid, $zpastid);
	}

	public function getUserIDfromPastID($zpastid) {
		global $wtwdb;
		return $wtwdb->getUserIDfromPastID($zpastid);
	}

	public function tableFieldExists($ztable, $zfield) {
		global $wtwdb;
		return $wtwdb->tableFieldExists($ztable, $zfield);
	}

	public function userExists($zuserid) {
		global $wtwdb;
		return $wtwdb->userExists($zuserid);
	}

	public function verifyFolderExists($zfolder) {
		global $wtwdb;
		return $wtwdb->verifyFolderExists($zfolder);
	}
	
	public function getSessionUserID() {
		global $wtwdb;
		try {
			$this->userid = $wtwdb->getSessionUserID();
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwconnect.php-getSessionUserID=" . $e->getMessage());
		}
		return $this->userid;
	}
	
	public function isUserInRole($zrole) {
		global $wtwdb;
		return $wtwdb->isUserInRole($zrole);
	}
	
	public function getUserRoles($zuserid = '') {
		/* defaults to current user unless called with admin role access */
		global $wtwdb;
		return $wtwdb->getUserRoles($zuserid);
	}
	
	public function hasPermission($zaccessrequired) {
		/* array of access required will be compared to array of current user roles */
		global $wtwdb;
		return $wtwdb->hasPermission($zaccessrequired);
	}
	
	public function checkUpdateAccess($zcommunityid, $zbuildingid, $zthingid) {
		global $wtwdb;
		return $wtwdb->checkUpdateAccess($zcommunityid, $zbuildingid, $zthingid);
	}

	public function checkAdminAccess($zcommunityid, $zbuildingid, $zthingid) {
		global $wtwdb;
		return $wtwdb->checkAdminAccess($zcommunityid, $zbuildingid, $zthingid);
	}

	public function getFilefromURL($zfromurl, $zfilepath, $zfilename) {
		/* save file using any available method fopen or curl */
		global $wtwdb;
		return $wtwdb->getFilefromURL($zfromurl, $zfilepath, $zfilename);
	}

	public function openFilefromURL($zfromurl, $zuseincludepath=false, $zcontext=null) {
		/* open file using any available method fopen or curl */
		global $wtwdb;
		return $wtwdb->openFilefromURL($zfromurl, $zuseincludepath, $zcontext);
	}

	public function dirSize($zdirectory) {
		global $wtwdb;
		return $wtwdb->dirSize($zdirectory);
	} 

	public function getFileCount($zdirectory) {
		global $wtwdb;
		return $wtwdb->getFileCount($zdirectory);
	} 

	public function endsWith($zhaystack, $zneedle) {
		global $wtwdb;
		return $wtwdb->endsWith($zhaystack, $zneedle);
	}

	public function __($zlabel) {
		/* Language translation based on language file */
		global $wtwdb;
		return $wtwdb->__($zlabel);
	}	

	public function addStylesheet($zstylesheetid, $zadminonly, $zstylesheeturl) {
		/* function to add a stylsheet to the page load */
		global $wtw;
		$zsuccess = false;
		try {
			$zfound = false;
			foreach ($wtw->pluginstylesheets as $zstylesheet) {
				if ($this->hasValue($zstylesheet["stylesheetid"])) {
					if ($zstylesheet["stylesheetid"] == $zstylesheetid) {
						$zfound = true;
					}
				}
			}
			if ($zfound == false) {
				$zstylesheet = array(
					'stylesheetid' => $zstylesheetid,
					'adminonly' => $zadminonly,
					'stylesheeturl' => $zstylesheeturl
				);
				$wtw->pluginstylesheets[count($wtw->pluginstylesheets)] = $zstylesheet;
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwplugins.php-addStylesheet=" . $e->getMessage());
		}
		return $zsuccess;
	}
	
	public function getPluginStylesheets($zadmin) {
		/* retrieve stylesheets html for page load */
		global $wtw;
		$zstylesheettext = "";
		try {
			if ($this->hasValue($zadmin)) {
				if ($zadmin != '1' && $zadmin != 1) {
					$zadmin = '0';
				} else {
					$zadmin = '1';
				}
			} else {
				$zadmin = '0';
			}
			foreach ($wtw->pluginstylesheets as $zstylesheet) {
				$zstylesheetid = $zstylesheet["stylesheetid"];
				$zadminonly = $zstylesheet["adminonly"];
				$zstylesheeturl = $zstylesheet["stylesheeturl"];
				if ($this->hasValue($zadminonly)) {
					if ($zadminonly != '1' && $zadminonly != 1) {
						$zadminonly = '0';
					} else {
						$zadminonly = '1';
					}
				} else {
					$zadminonly = '0';
				}
				if ($zadminonly == $zadmin || $zadminonly == '0') {
					$zstylesheettext .= "<link rel=\"stylesheet\" type=\"text/css\" id=\"".$zstylesheetid."\" href=\"".$zstylesheeturl."\"></style>\r\n";
				}
			}			
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwplugins.php-getPluginStylesheets=".$e->getMessage());
		}
		return $zstylesheettext;
	}	

	public function addScript($zscriptid, $zadminonly, $zscripturl) {
		/* function to add a javascript to the page load */
		global $wtw;
		$zsuccess = false;
		try {
			$zfound = false;
			foreach ($wtw->pluginscripts as $zscript) {
				if ($this->hasValue($zscript["scriptid"])) {
					if ($zscript["scriptid"] == $zscriptid) {
						$zfound = true;
					}
				}
			}
			if ($zfound == false) {
				$zscript = array(
					'scriptid' => $zscriptid,
					'adminonly' => $zadminonly,
					'scripturl' => $zscripturl
				);
				$wtw->pluginscripts[count($wtw->pluginscripts)] = $zscript;
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwplugins.php-addScript=" . $e->getMessage());
		}
		return $zsuccess;
	}
	
	public function getPluginScripts($zadmin, $zver) {
		/* retrieve javascript html for page load */
		global $wtw;
		$zscripttext = "";
		try {
			if ($this->hasValue($zadmin)) {
				if ($zadmin != '1' && $zadmin != 1) {
					$zadmin = '0';
				} else {
					$zadmin = '1';
				}
			} else {
				$zadmin = '0';
			}
			foreach ($wtw->pluginscripts as $zscript) {
				$zscriptid = $zscript["scriptid"];
				$zadminonly = $zscript["adminonly"];
				$zscripturl = $zscript["scripturl"];
				if ($this->hasValue($zadminonly)) {
					if ($zadminonly != '1' && $zadminonly != 1) {
						$zadminonly = '0';
					} else {
						$zadminonly = '1';
					}
				} else {
					$zadminonly = '0';
				}
				if ($zadminonly == $zadmin || $zadminonly == '0') {
					$zscripttext .= "<script id=\"".$zscriptid."\" src=\"".$zscripturl."?x=".$zver."\"></script>\r\n";
				}
			}			
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwplugins.php-getPluginScripts=".$e->getMessage());
		}
		return $zscripttext;
	}	

	public function addScriptFunction($zevent, $zfunctionname) {
		/* function to add a javascript function to a hook (core function event) */
		global $wtw;
		$zsuccess = false;
		try {
			$zfound = false;
			foreach ($wtw->pluginscriptfunctions as $zscriptfunctions) {
				if ($this->hasValue($zscriptfunctions["event"]) && $this->hasValue($zscriptfunctions["functionname"])) {
					if ($zscriptfunctions["event"] == $zevent && $zscriptfunctions["functionname"] == $zfunctionname) {
						$zfound = true;
					}
				}
			}
			if ($zfound == false) {
				$zscriptfunction = array(
					'event' => $zevent,
					'functionname' => $zfunctionname
				);
				$wtw->pluginscriptfunctions[count($wtw->pluginscriptfunctions)] = $zscriptfunction;
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwplugins.php-addScriptFunction=" . $e->getMessage());
		}
		return $zsuccess;
	}
	
	public function getScriptFunctions() {
		/* retrieve javascript functions for page load - they use the array of entries to build the HTML added to the page loaded */
		global $wtw;
		$jsdata = "";
		try {
			$jsdata .= "<script type=\"text/javascript\">\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsLoadUserSettingsAfterEngine = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('loadusersettingsafterengine');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsLoadUserSettingsAfterEngine=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsRenderloop = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('renderloop');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsRenderloop=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";
			
			$jsdata .= "	WTWJS.prototype.pluginsRenderloopAfterInit = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('renderloopafterinit');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsRenderloopAfterInit=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsAdminLoadAfterScreen = function(zhmenu) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('adminloadafterscreen');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsAdminLoadAfterScreen=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsAdminMenuItemSelected = function(zobj) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('adminmenuitemselected');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsAdminMenuItemSelected=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsOpenFullPageForm = function(zpageid, zsetcategory, zitem, zitemname, zitemnamepath, zpreviewname) {\r\n";
			$jsdata .= "		var zshow = false;\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->returnScriptFunction('openfullpageform', 'zshow');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsOpenFullPageForm=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zshow;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsOpenFullPageFormMediaLibrary = function(zpageid, zsetcategory, zitem, zitemname, zitemnamepath, zpreviewname) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('openfullpageformmedialibrary');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsOpenFullPageFormMediaLibrary=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsOpenDashboardForm = function(zshow) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('opendashboardform');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsOpenDashboardForm=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsOpenDashboardFormDownloads = function(zdownloads, zshow) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('opendashboardformdownloads');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsOpenDashboardFormDownloads=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsCloseMenus = function(zmenuid) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('closemenus');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsCloseMenus=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsCheckForUpdates = function(zshow, zfilter) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('checkforupdates');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsCheckForUpdates=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsGetPluginInfoComplete = function(zmyplugins, zplugins, zshow, zfilter) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('getplugininfocomplete');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsGetPluginInfoComplete=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsUpdateBadges = function(ztotalupdates, ztotaldashboardupdates) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('updatebadges');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsUpdateBadges=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsOpenConfirmation = function(zoption) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('openconfirmation');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsOpenConfirmation=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsCompletedConfirmation = function(zoption) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('completedconfirmation');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsCompletedConfirmation=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsResetActivityTimer = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('resetactivitytimer');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsResetActivityTimer=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";
			
			$jsdata .= "	WTWJS.prototype.pluginsLoadLoginSettings = function(zloaddefault) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->returnScriptFunction('loadloginsettings', 'zloaddefault');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsLoadLoginSettings=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zloaddefault;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsLoadUserSettings = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('loadusersettings');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsLoadUserSettings=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsOpenLocalLogin = function(zitem, zwidth, zheight) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('openlocallogin');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsOpenLocalLogin=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsHudLoginLogin = function(zlocal, zemail, zpassword, zremembercheck) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('hudloginlogin');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsHudLoginLogin=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsHudLoginCreate = function(zlocal, zemail, zpassword, zpassword2) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('hudlogincreate');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsHudLoginCreate=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsHudLoginLoadAvatarsArray = function(zfilter, zdefaultdisplayname) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('hudloginloadavatarsarray');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsHudLoginLoadAvatarsArray=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsOnMessage = function(zevent) {\r\n";
			$jsdata .= "		var zsafe = false;\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->returnScriptFunction('onmessage', 'zsafe');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsOnMessage=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zsafe;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsShowListVersionCheck = function(zwebtype, zversioncheck) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('showlistversioncheck');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsShowListVersionCheck=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsMyAnimationsLoaded = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('myavataranimationsloaded');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsMyAnimationsLoaded=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsGetSavedAvatar = function(zglobaluseravatarid, zinstanceid, zavatarname, zsendrefresh) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('getsavedavatar');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsGetSavedAvatar=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSavedAvatarRetrieved = function(zavatarname, zsendrefresh) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('savedavatarretrieved');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsSavedAvatarRetrieved=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsDownloadUserAvatarVersion = function(zobj, zglobaluseravatarid, zuseravatarid, zupdateuseravatarid, zwebid, zupdatewebid, zversionid, zversion, zoldversion, zwebtype) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('downloaduseravatarversion');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsDownloadUserAvatarVersion=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsDownloadUserAvatarVersionResponse = function(zobj, zglobaluseravatarid, zuseravatarid, zupdateuseravatarid, zwebid, zupdatewebid, zversionid, zversion, zoldversion, zwebtype) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('downloaduseravatarversionresponse');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsDownloadUserAvatarVersionResponse=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsAvatarBeforeCreate = function(zavatarname, zavatardef) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnScriptFunction('avatarbeforecreate', 'zavatardef');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsAvatarBeforeCreate=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zavatardef;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsMoveAvatar = function(zavatar, zmoveevents) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('moveavatar');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsMoveAvatar=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsEnterAvatar = function(zavatarname) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('enteravatar');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsEnterAvatar=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsAvatarLoadComplete = function(zavatarname) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('avatarloadcomplete');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsAvatarLoadComplete=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSetAvatarMovement = function(zavatar, zevent, zweight) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnScriptFunction('setavatarmovement', 'zweight');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsSetAvatarMovement=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zweight;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsDeleteUserAvatar = function(zglobaluseravatarid, zuseravatarid, zwidth, zheight) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('deleteuseravatar');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsDeleteUserAvatar=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsCheckActionPerZoneTrigger = function(zactionzone) {\r\n";
			$jsdata .= "		var zothersinzone = false;\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnScriptFunction('checkactionperzonetrigger','zothersinzone');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsCheckActionPerZoneTrigger=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zothersinzone;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsCheckActionPerZone = function(zactionzonename, zactionzoneind, zmeinzone, zothersinzone) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('checkactionperzone');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsCheckActionPerZone=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsCheckActionZone = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('checkactionzone');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsCheckActionZone=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsAddActionZone = function(zmoldname, zmolddef) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('addactionzone');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsAddActionZone=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsEnterActionZone = function(zmoldname, zmolddef) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('enteractionzone');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsEnterActionZone=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsExitActionZone = function(zmoldname, zmolddef) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('exitactionzone');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsExitActionZone=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsUnloadAllZones = function(zoldwebid, zoldwebtype) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('unloadallzones');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsUnloadAllZones=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsInputClick = function(zpickedname) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnScriptFunction('inputclick','zpickedname');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsInputClick=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zpickedname;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsHudLoginClick = function(zmoldname) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('hudloginclick');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsHudLoginClick=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsOnMicrophoneGrantedOnMessage = function(zevent, zrecordbuffer) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('onmicrophonegrantedonmessage');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsOnMicrophoneGrantedOnMessage=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsOnMicVolumeChange = function(zvolume) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('onmicvolumechange');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsOnMicVolumeChange=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsToggleMicMute = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('togglemicmute');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsToggleMicMute=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsToggleSoundMute = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('togglesoundmute');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsToggleSoundMute=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsToggleAdminSubMenu = function(zobj) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('toggleadminsubmenu');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsToggleAdminSubMenu=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsKeyDown = function(zevent) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('keydown');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsKeyDown=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsKeyUp = function(zevent) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('keyup');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsKeyUp=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsKeyDownSelectedMold = function(zevent) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('keydownselectedmold');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsKeyDownSelectedMold=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsClearSelectedMold = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('clearselectedmold');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsClearSelectedMold=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsMouseClickRightAdmin = function(e, zpickedname) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('mouseclickrightadmin');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsMouseClickRightAdmin=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsDisposeClean = function(zmoldname) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('disposeclean');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsDisposeClean=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsAddConnectingGrid = function(zconnectinggridsurl, zchildwebtype, zchildwebid, zchildwebname, zfranchiseid, zserverfranchiseid, zwebalias, zparentname) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnScriptFunction('addconnectinggrid','zconnectinggridsurl');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsAddConnectingGrid=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zconnectinggridsurl;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsActionZones = function(zactionzonelist) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnActionZoneDefsList();
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsActionZones=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zactionzonelist;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsAddConnectingGridActionZones = function(zactionzonesurl, zchildwebtype, zchildwebid, zchildwebname, zfranchiseid, zserverfranchiseid, zwebalias, zparentname, zconnectinggridid, zconnectinggridind) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnScriptFunction('addconnectinggridactionzones','zactionzonesurl');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsAddConnectingGridActionZones=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zactionzonesurl;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsGetActionZonesByWebID = function(zactionzonesurl, zserver, zcommunityid, zbuildingid, zthingid, zparentname, zconnectinggridid, zconnectinggridind) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnScriptFunction('getactionzonesbywebid','zactionzonesurl');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsGetActionZonesByWebID=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zactionzonesurl;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsAddActionZones = function(zactionzonetype, zactionzonename, zactionzoneind, zactionzonedef) {\r\n";
			$jsdata .= "		var zactionzone = null;\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnActionZoneDefsFunctions();
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsAddActionZones=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zactionzone;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSetNewActionZoneDefaults = function(zactionzonetype) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('setnewactionzonedefaults');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsSetNewActionZoneDefaults=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSetActionZoneFormFields = function(zactionzonetype) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('setactionzoneformfields');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsSetActionZoneFormFields=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsMolds = function(zmoldlist) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnMoldDefsList('mold');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsMolds=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zmoldlist;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsWebMolds = function(zmoldlist) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnMoldDefsList('webmold');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsWebMolds=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zmoldlist;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsAddMolds = function(zshape, zmoldname, zmolddef, zlenx, zleny, zlenz) {\r\n";
			$jsdata .= "		var zmold = null;\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnMoldDefsFunctions();
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsAddMolds=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zmold;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsOpenAddNewMold = function(zwebtype, zshape, zmoldname) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('openaddnewmold');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsOpenAddNewMold=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsGetMoldsByWebID = function(zmoldsurl, zserver, zcommunityid, zbuildingid, zthingid, zactionzoneid, zactionzoneind, zconnectinggridid, zconnectinggridind, zgraphiclevel) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnScriptFunction('getmoldsbywebid','zmoldsurl');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsGetMoldsByWebID=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zmoldsurl;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsLoadMoldForm = function(zwebtype, zshape, zmoldname) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('loadmoldform');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsLoadMoldForm=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSetNewMoldDefaults = function(zshape, zpositionx, zpositiony, zpositionz, zrotationy) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('setnewmolddefaults');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsSetNewMoldDefaults=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSetMoldFormFields = function(zshape) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('setmoldformfields');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsSetMoldFormFields=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsOpenMoldForm = function(zmoldname, zmoldind, zshape, zwebtype) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('openmoldform');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsOpenMoldForm=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsLoadConnectingGrids = function(zconnectinggridind, zcommunityid, zbuildingid, zthingid) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('loadconnectinggrids');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsLoadConnectingGrids=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSubmitMoldForm = function(zselect) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('submitmoldform');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsSubmitMoldForm=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsClearEditMold = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('cleareditmold');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsClearEditMold=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsCoverings = function(zcoveringlist) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnCoveringDefsList();
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsCoverings=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zcoveringlist;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsAddCoverings = function(zcoveringname, zmoldname, zmolddef, zlenx, zleny, zlenz, zspecial1, zspecial2) {\r\n";
			$jsdata .= "		var zcovering = null;\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnCoveringDefsFunctions();
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsAddCoverings=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zcovering;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSetCoveringFormFields = function(zcoveringname) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('setcoveringformfields');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsSetCoveringFormFields=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsCheckHovers = function(zmoldname, zshape) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('checkhovers');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsCheckHovers=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsResetHovers = function(zmoldname, zshape) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('resethovers');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsResetHovers=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsOpenMoldColorSelector = function(zmold, zmoldname, zshape, zcolorgroup) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnScriptFunction('openmoldcolorselector', 'zmold');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsOpenMoldColorSelector=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zmold;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSetMoldColor = function(zmoldname, zcolorgroup, zemissivecolor, zdiffusecolor, zspecularcolor, zambientcolor) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('resetmoldcolor');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsSetMoldColor=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSetNewMold = function(zmoldname, zmolds, zmoldind, zrebuildmold) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnScriptFunction('setnewmold', 'zrebuildmold');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsSetNewMold=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zrebuildmold;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsProcessMoldQueueAdd = function(zmoldname, zmold) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('moldqueueadd');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsProcessMoldQueueAdd=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsOnMyAvatarSelect = function(zglobaluseravatarid, zuseravatarid, zavatarid) {\r\n";
			$jsdata .= "		var zloading = false;\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnScriptFunction('onmyavatarselect', 'zloading');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsOnMyAvatarSelect=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zloading;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsBeforeUnload = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('beforeunload');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsBeforeUnload=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";
			
			$jsdata .= "	WTWJS.prototype.pluginsOpenDomainForm = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('opendomainform');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsOpenDomainForm=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSaveDomainForm = function(w, zinvoiceid, zdomainname, zinvoicedescription, zinvoicetotal) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('savedomainform');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsSaveDomainForm=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";
			
			$jsdata .= "	WTWJS.prototype.pluginsFeedbackSubmit = function(zrequest) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('feedbacksubmit');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsFeedbackSubmit=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSaveAliasForm = function(zoption, zhostuserid, zwebaliasid, zdomainname, zforcehttps, zwebalias, zaliascommunityid, zaliasbuildingid, zaliasthingid, zcommunitypublishname, zbuildingpublishname, zthingpublishname, zfoundfranchiseid, zfranchise, zsiteiconpath, zsitepreview) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('savealiasform');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('core-functions-class_wtwplugins.php-pluginsSaveAliasForm=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "</script>"; 
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwplugins.php-getScriptFunctions=".$e->getMessage());
		}
		return $jsdata;
	}	

	public function getScriptFunction($zgetevent) {
		/* get script function from php array to add to hook (core function events) */
		/* get event matches the name of the event with the added event in the array */
		/* it most often matches the core function name but all lower case */
		global $wtw;
		$zscripttext = "";
		try {
			foreach ($wtw->pluginscriptfunctions as $zscriptfunctions) {
				$zevent = trim($zscriptfunctions["event"]);
				$zfunctionname = trim($zscriptfunctions["functionname"]);
				if ($this->hasValue($zfunctionname)) {
					if (strpos($zfunctionname,";") === false) {
						$zfunctionname .= ";";
					}
					if (strtolower($zevent) == strtolower($zgetevent) && strlen($zfunctionname) > 4) {
						$zscripttext .= $zfunctionname."\r\n";
					}
				}
			}			
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwplugins.php-getScriptFunction=".$e->getMessage());
		}
		return $zscripttext;
	}	

	public function returnScriptFunction($zgetevent, $zjsvariable) {
		/* zgetevent tells us which javascript function, zjsvariable is the js variable to assign (may or may not include var before it)*/
		global $wtw;
		$zscripttext = "";
		try {
			foreach ($wtw->pluginscriptfunctions as $zscriptfunctions) {
				$zevent = trim($zscriptfunctions["event"]);
				$zfunctionname = trim($zscriptfunctions["functionname"]);
				if ($this->hasValue($zfunctionname)) {
					if (strpos($zfunctionname,";") === false) {
						$zfunctionname .= ";";
					}
					if (strtolower($zevent) == strtolower($zgetevent) && strlen($zfunctionname) > 4) {
						$zscripttext .= $zjsvariable." = ".$zfunctionname."\r\n";
					}
				}
			}			
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwplugins.php-returnScriptFunction=".$e->getMessage());
		}
		return $zscripttext;
	}	

	public function addMoldDef($zmoldtitle, $zlist, $zjsfunction) {
		/* plugins can dynamically add a mold type and provide the js code function that will create the mold at runtime */
		global $wtw;
		$zsuccess = false;
		try {
			$zfound = false;
			foreach ($wtw->pluginMoldDefs as $zmold) {
				if ($this->hasValue($zmold["scriptid"])) {
					if ($zmold["scriptid"] == $zmoldtitle) {
						$zfound = true;
					}
				}
			}
			if ($zfound == false) {
				$zmold = array(
					'moldtitle' => $zmoldtitle,
					'list' => $zlist,
					'jsfunction' => $zjsfunction
				);
				$wtw->pluginMoldDefs[count($wtw->pluginMoldDefs)] = $zmold;
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwplugins.php-addMoldDef=" . $e->getMessage());
		}
		return $zsuccess;
	}

	public function returnMoldDefsList($zgetlist) {
		/* this is a simple list of molds that can be added to a 3D Community, Building, or Thing */
		global $wtw;
		$zscripttext = "";
		try {
			foreach ($wtw->pluginMoldDefs as $zmolddef) {
				$zlist = trim($zmolddef["list"]);
				$zmoldtitle = trim($zmolddef["moldtitle"]);
				$zjsfunction = trim($zmolddef["jsfunction"]);
				if ($this->hasValue($zjsfunction)) {
					if (strpos($zjsfunction,";") === false) {
						$zjsfunction .= ";";
					}
					if (strtolower($zlist) == strtolower($zgetlist) && strlen($zmoldtitle) > 1) {
						$zscripttext .= "zmoldlist[zmoldlist.length] = \"".$zmoldtitle."\";\r\n";
					}
				}
			}			
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwplugins.php-returnMoldDefs=".$e->getMessage());
		}
		return $zscripttext;
	}	

	public function returnMoldDefsFunctions() {
		/* this function returns the js functions that create the custom molds */
		global $wtw;
		$zscripttext = "switch (zshape) {\r\n";
		try {
			foreach ($wtw->pluginMoldDefs as $zmolddef) {
				$zlist = trim($zmolddef["list"]);
				$zmoldtitle = str_replace(" ","",trim($zmolddef["moldtitle"]));
				$zjsfunction = trim($zmolddef["jsfunction"]);
				if ($this->hasValue($zjsfunction)) {
					if (strpos($zjsfunction,";") === false) {
						$zjsfunction .= ";";
					}
					if (strlen($zmoldtitle) > 1 && strlen($zjsfunction) > 1) {
						$zscripttext .= "case \"".strtolower($zmoldtitle)."\":\r\n";
						$zscripttext .= "zmold = ".$zjsfunction."\r\n";
						$zscripttext .= "break;\r\n";
					}
				}
			}			
			$zscripttext .= "default:\r\n";
			$zscripttext .= "zmold = WTW.addMoldBox(zmoldname, zlenx, zleny, zlenz);\r\n";
			$zscripttext .= "break;\r\n";
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwplugins.php-returnMoldDefs=".$e->getMessage());
		}
		$zscripttext .= "}\r\n";
		return $zscripttext;
	}	

	public function addActionZoneDef($zactionzonetitle, $zjsfunction, $zdefaulteditform = '0') {
		/* plugins can create custom action zone types and add them to the admin options to use */
		global $wtw;
		$zsuccess = false;
		try {
			$zfound = false;
			foreach ($wtw->pluginActionZoneDefs as $zactionzone) {
				if ($this->hasValue($zactionzone["scriptid"])) {
					if ($zactionzone["scriptid"] == $zactionzonetitle) {
						$zfound = true;
					}
				}
			}
			if ($zfound == false) {
				$zactionzone = array(
					'actionzonetitle' => $zactionzonetitle,
					'jsfunction' => $zjsfunction,
					'defaulteditform' => $zdefaulteditform
				);
				$wtw->pluginActionZoneDefs[count($wtw->pluginActionZoneDefs)] = $zactionzone;
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwplugins.php-addActionZoneDef=" . $e->getMessage());
		}
		return $zsuccess;
	}

	public function returnActionZoneDefsList() {
		/* returns a simple list of custom action zones added - shown in the action zones list to add to a 3D Community, Building, or Thing */
		global $wtw;
		$zscripttext = "";
		try {
			foreach ($wtw->pluginActionZoneDefs as $zactionzonedef) {
				$zactionzonetitle = trim($zactionzonedef["actionzonetitle"]);
				$zjsfunction = trim($zactionzonedef["jsfunction"]);
				$zdefaulteditform = trim($zactionzonedef["defaulteditform"]);
				if ($this->hasValue($zjsfunction)) {
					if (strpos($zjsfunction,";") === false) {
						$zjsfunction .= ";";
					}
					if (strlen($zactionzonetitle) > 1) {
						$zscripttext .= "zactionzonelist[zactionzonelist.length] = {'name':'".$zactionzonetitle."','helpurl':'', 'defaulteditform':'".$zdefaulteditform."'};\r\n";
					}
				}
			}			
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwplugins.php-returnActionZoneDefsList=".$e->getMessage());
		}
		return $zscripttext;
	}	

	public function returnActionZoneDefsFunctions() {
		/* retrieves the js functions that will create the custom action zone */
		global $wtw;
		$zscripttext = "switch (zactionzonetype) {\r\n";
		try {
			foreach ($wtw->pluginActionZoneDefs as $zactionzonedef) {
				$zactionzonetitle = str_replace(" ","",trim($zactionzonedef["actionzonetitle"]));
				$zjsfunction = trim($zactionzonedef["jsfunction"]);
				if ($this->hasValue($zjsfunction)) {
					if (strpos($zjsfunction,";") === false) {
						$zjsfunction .= ";";
					}
					if (strlen($zactionzonetitle) > 1 && strlen($zjsfunction) > 1) {
						$zscripttext .= "case \"".strtolower($zactionzonetitle)."\":\r\n";
						$zscripttext .= "zactionzone = ".$zjsfunction."\r\n";
						$zscripttext .= "break;\r\n";
					}
				}
			}			
			$zscripttext .= "default:\r\n";
			$zscripttext .= "zactionzone = WTW.addActionzoneLoadzone(zactionzonename, zactionzoneind, zactionzonedef);\r\n";
			$zscripttext .= "break;\r\n";
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwplugins.php-returnActionZoneDefsFunctions=".$e->getMessage());
		}
		$zscripttext .= "}\r\n";
		return $zscripttext;
	}	
	
	public function addCoveringDef($zcoveringtitle, $zjsfunction) {
		/* allows plugins to create custom coverings (materials) to be added to the admin tools and used in admin mode */
		global $wtw;
		$zsuccess = false;
		try {
			$zfound = false;
			foreach ($wtw->pluginCoveringDefs as $zcovering) {
				if ($this->hasValue($zcovering["scriptid"])) {
					if ($zcovering["scriptid"] == $zcoveringtitle) {
						$zfound = true;
					}
				}
			}
			if ($zfound == false) {
				$zcovering = array(
					'coveringtitle' => $zcoveringtitle,
					'jsfunction' => $zjsfunction
				);
				$wtw->pluginCoveringDefs[count($wtw->pluginCoveringDefs)] = $zcovering;
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwplugins.php-addCoveringDef=" . $e->getMessage());
		}
		return $zsuccess;
	}

	public function returnCoveringDefsList() {
		/* provides a simple list of custom coverings (materials) for the admin forms (like edit mold) */
		global $wtw;
		$zscripttext = "";
		try {
			foreach ($wtw->pluginCoveringDefs as $zcoveringdef) {
				$zcoveringtitle = trim($zcoveringdef["coveringtitle"]);
				$zjsfunction = trim($zcoveringdef["jsfunction"]);
				if ($this->hasValue($zjsfunction)) {
					if (strpos($zjsfunction,";") === false) {
						$zjsfunction .= ";";
					}
					if (strlen($zcoveringtitle) > 1) {
//						$zscripttext .= "zcoveringlist[zcoveringlist.length] = {'name':'".$zcoveringtitle."','helpurl':''};\r\n";
						$zscripttext .= "zcoveringlist[zcoveringlist.length] = '".$zcoveringtitle."';\r\n";
					}
				}
			}			
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwplugins.php-returnCoveringDefsList=".$e->getMessage());
		}
		return $zscripttext;
	}	

	public function returnCoveringDefsFunctions() {
		/* retrieves the js functions for adding and using the custom covering (material) at runtime */
		global $wtw;
		$zscripttext = "switch (zcoveringname) {\r\n";
		try {
			foreach ($wtw->pluginCoveringDefs as $zcoveringdef) {
				$zcoveringtitle = str_replace(" ","",trim($zcoveringdef["coveringtitle"]));
				$zjsfunction = trim($zcoveringdef["jsfunction"]);
				if ($this->hasValue($zjsfunction)) {
					if (strpos($zjsfunction,";") === false) {
						$zjsfunction .= ";";
					}
					if (strlen($zcoveringtitle) > 1 && strlen($zjsfunction) > 1) {
						$zscripttext .= "case \"".strtolower($zcoveringtitle)."\":\r\n";
						$zscripttext .= "zcovering = ".$zjsfunction."\r\n";
						$zscripttext .= "break;\r\n";
					}
				}
			}			
			$zscripttext .= "default:\r\n";
			$zscripttext .= "zcovering = WTW.addCoveringColor(zmoldname, zmolddef);\r\n";
			$zscripttext .= "break;\r\n";
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwplugins.php-returnCoveringDefsFunctions=".$e->getMessage());
		}
		$zscripttext .= "}\r\n";
		return $zscripttext;
	}	
}

	function wtwplugins() {
		return wtwplugins::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwplugins'] = wtwplugins();	
	
	global $wtwplugins;
	
	$wtwplugins->initClass();
?>
<?php
class wtwplugins {
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
	
	public $serverinstanceid = "";
	public $rootpath = "";
	public $contentpath = "";
	public $contenturl = "";
	public $protocol = "http://";
	public $domainname = "";
	public $domainurl = "";
	public $pagename = "";
	public $userid = "";
	public $uri = "";
	public $community = "";
	public $building = "";
	public $thing = "";
	public $communityid = "";
	public $buildingid = "";
	public $thingid = "";

	public function initClass() {
		global $wtw;
		if ($wtw != null) {
			$this->serverinstanceid = $wtw->serverinstanceid;
			$this->rootpath = wtw_rootpath;
			$this->contentpath = $wtw->contentpath;
			$this->contenturl = $wtw->contenturl;
			$this->protocol = $wtw->protocol;
			$this->domainname = $wtw->domainname;
			$this->domainurl = $wtw->domainurl;
			$this->pagename = $wtw->pagename;
			$this->userid = $wtw->userid;
			$this->uri = $wtw->uri;
			$this->community = $wtw->community;
			$this->building = $wtw->building;
			$this->thing = $wtw->thing;
			$this->communityid = $wtw->communityid;
			$this->buildingid = $wtw->buildingid;
			$this->thingid = $wtw->thingid;
		}
	}
	
	public function addAdminMenuItem($zid, $ztitle, $zmenusort, $zmenu, $zsubmenusort, $zsubmenu, $ziconurl, $zaccessrequired, $zjsfunction) {
		global $wtwadminmenu;
		if (isset($wtwadminmenu)) {
			return $wtwadminmenu->addAdminMenuItem($zid, $ztitle, $zmenusort, $zmenu, $zsubmenusort, $zsubmenu, $ziconurl, $zaccessrequired, $zjsfunction);
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
	
	public function addMenuForm($zformid, $ztitle, $zformdata, $zaccessrequired) {
		global $wtwmenus;
		if (isset($wtwmenus)) {
			return $wtwmenus->addMenuForm($zformid, $ztitle, $zformdata, $zaccessrequired);
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

	public function getSetting($zsettingname) {
		global $wtwdb;
		return $wtwdb->getSetting($zsettingname);
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
	
	public function isUserInRole($zrole) {
		global $wtwdb;
		return $wtwdb->isUserInRole($zrole);
	}
	
	public function addScript($zscriptid, $zadminonly, $zscripturl) {
		global $wtw;
		$zsuccess = false;
		try {
			$zfound = false;
			foreach ($wtw->pluginscripts as $zscript) {
				if (isset($zscript["scriptid"]) && !empty($zscript["scriptid"])) {
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
		global $wtw;
		$zscripttext = "";
		try {
			if (!empty($zadmin) && isset($zadmin)) {
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
				if (!empty($zadminonly) && isset($zadminonly)) {
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
			$this->serror("core-functions-class_wtwmenus.php-getPluginScripts=".$e->getMessage());
		}
		return $zscripttext;
	}	

	public function addScriptFunction($zevent, $zfunctionname) {
		global $wtw;
		$zsuccess = false;
		try {
			$zfound = false;
			foreach ($wtw->pluginscriptfunctions as $zscriptfunctions) {
				if (isset($zscriptfunctions["event"]) && !empty($zscriptfunctions["event"]) && isset($zscriptfunctions["functionname"]) && !empty($zscriptfunctions["functionname"])) {
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
		global $wtw;
		$jsdata = "";
		try {
			$jsdata .= "<script type=\"text/javascript\">\r\n";
			$jsdata .= "	WTWJS.prototype.pluginsRenderloop = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('renderloop');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsRenderloop=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";
			
			$jsdata .= "	WTWJS.prototype.pluginsRenderloopAfterInit = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('renderloopafterinit');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsRenderloopAfterInit=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";
			
			$jsdata .= "	WTWJS.prototype.pluginsLoadUserSettings = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('loadusersettings');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsLoadUserSettings=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsMyAnimationsLoaded = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('myavataranimationsloaded');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsMyAnimationsLoaded=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSetupModeClosed = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('setupmodeclosed');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsSetupModeClosed=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSavedAvatarRetrieved = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('savedavatarretrieved');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsSavedAvatarRetrieved=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsCheckActionZoneTrigger = function(zactionzone) {\r\n";
			$jsdata .= "		var othersinzone = false;\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnScriptFunction('checkactionzonetrigger','othersinzone');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsCheckActionZoneTrigger=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return othersinzone;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsCheckActionZone = function(zactionzonename, zactionzoneind, zmeinzone, zothersinzone) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= $this->getScriptFunction('checkactionzone');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsCheckActionZone=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsAvatarBeforeCreate = function(avatarname, avatardef) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnScriptFunction('avatarbeforecreate', 'avatardef');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsAvatarBeforeCreate=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return avatardef;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsOnClick = function(pickedname) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('onclick');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsOnClick=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";


			$jsdata .= "	WTWJS.prototype.pluginsSetAvatarMovement = function(zavatar, zmoveevents, zkey, zweight) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('setavatarmovement');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsSetAvatarMovement=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return zweight;\r\n";
			$jsdata .= "	}\r\n";



			$jsdata .= "	WTWJS.prototype.pluginsDisposeClean = function(moldname) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('disposeclean');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsDisposeClean=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsActionZones = function(actionzonelist) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnActionZoneDefsList();
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsActionZones=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return actionzonelist;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsAddActionZones = function(actionzonetype, actionzonename, actionzoneind, actionzonedef) {\r\n";
			$jsdata .= "		var actionzone = null;\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnActionZoneDefsFunctions();
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsAddActionZones=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return actionzone;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSetNewActionZoneDefaults = function(actionzonetype) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('setnewactionzonedefaults');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsSetNewActionZoneDefaults=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSetActionZoneFormFields = function(actionzonetype) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('setactionzoneformfields');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsSetActionZoneFormFields=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsMolds = function(moldlist) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnMoldDefsList('mold');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsMolds=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return moldlist;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsWebMolds = function(moldlist) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnMoldDefsList('webmold');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsWebMolds=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return moldlist;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsAddMolds = function(shape, moldname, molddef, lenx, leny, lenz) {\r\n";
			$jsdata .= "		var mold = null;\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnMoldDefsFunctions();
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsAddMolds=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return mold;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsOpenAddNewMold = function(moldgroup, shape, moldname) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('openaddnewmold');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsOpenAddNewMold=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsLoadMoldForm = function(moldgroup, shape, moldname) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('loadmoldform');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsLoadMoldForm=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSetNewMoldDefaults = function(shape, positionX, positionY, positionZ, rotationY) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('setnewmolddefaults');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsSetNewMoldDefaults=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSetMoldFormFields = function(shape) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('setmoldformfields');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsSetMoldFormFields=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsOpenMoldForm = function(moldname, molds, moldind, shape) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('openmoldform');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsOpenMoldForm=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsLoadConnectingGrids = function(zconnectinggridind, zcommunityid, zbuildingid, zthingid) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('loadconnectinggrids');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsLoadConnectingGrids=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSubmitMoldForm = function(w) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('submitmoldform');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsSubmitMoldForm=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsClearEditMold = function() {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('cleareditmold');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsClearEditMold=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsCoverings = function(coveringlist) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnCoveringDefsList('covering');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsCoverings=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return coveringlist;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsAddCoverings = function(moldname, molddef, lenx, leny, lenz, special1, special2) {\r\n";
			$jsdata .= "		var covering = null;\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnCoveringDefsFunctions();
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsAddCoverings=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return covering;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSetCoveringFormFields = function(coveringname) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('setcoveringformfields');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsSetCoveringFormFields=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsCheckHovers = function(moldname, shape) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('checkhovers');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsCheckHovers=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsResetHovers = function(moldname, shape) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('resethovers');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsResetHovers=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsOpenColorSelector = function(moldname, shape, colortype) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('opencolorselector');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsOpenColorSelector=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsSetNewMold = function(moldname, molds, moldind, rebuildmold) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->returnScriptFunction('setnewmold', 'rebuildmold');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsSetNewMold=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "		return rebuildmold;\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "	WTWJS.prototype.pluginsProcessMoldQueueAdd = function(moldname, mold) {\r\n";
			$jsdata .= "		try {\r\n";
			$jsdata .= 	$this->getScriptFunction('moldqueueadd');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsProcessMoldQueueAdd=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "</script>"; 
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwmenus.php-getScriptFunctions=".$e->getMessage());
		}
		return $jsdata;
	}	

	public function getScriptFunction($zgetevent) {
		global $wtw;
		$zscripttext = "";
		try {
			foreach ($wtw->pluginscriptfunctions as $zscriptfunctions) {
				$zevent = trim($zscriptfunctions["event"]);
				$zfunctionname = trim($zscriptfunctions["functionname"]);
				if (!empty($zfunctionname) && isset($zfunctionname)) {
					if (strpos($zfunctionname,";") === false) {
						$zfunctionname .= ";";
					}
					if (strtolower($zevent) == strtolower($zgetevent) && strlen($zfunctionname) > 4) {
						$zscripttext .= $zfunctionname."\r\n";
					}
				}
			}			
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwmenus.php-getScriptFunction=".$e->getMessage());
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
				if (!empty($zfunctionname) && isset($zfunctionname)) {
					if (strpos($zfunctionname,";") === false) {
						$zfunctionname .= ";";
					}
					if (strtolower($zevent) == strtolower($zgetevent) && strlen($zfunctionname) > 4) {
						$zscripttext .= $zjsvariable." = ".$zfunctionname."\r\n";
					}
				}
			}			
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwmenus.php-returnScriptFunction=".$e->getMessage());
		}
		return $zscripttext;
	}	

	public function addMoldDef($zmoldtitle, $zlist, $zjsfunction) {
		global $wtw;
		$zsuccess = false;
		try {
			$zfound = false;
			foreach ($wtw->pluginMoldDefs as $zmold) {
				if (isset($zmold["scriptid"]) && !empty($zmold["scriptid"])) {
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
		global $wtw;
		$zscripttext = "";
		try {
			foreach ($wtw->pluginMoldDefs as $zmolddef) {
				$zlist = trim($zmolddef["list"]);
				$zmoldtitle = trim($zmolddef["moldtitle"]);
				$zjsfunction = trim($zmolddef["jsfunction"]);
				if (!empty($zjsfunction) && isset($zjsfunction)) {
					if (strpos($zjsfunction,";") === false) {
						$zjsfunction .= ";";
					}
					if (strtolower($zlist) == strtolower($zgetlist) && strlen($zmoldtitle) > 1) {
						$zscripttext .= "moldlist[moldlist.length] = \"".$zmoldtitle."\";\r\n";
					}
				}
			}			
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwmenus.php-returnMoldDefs=".$e->getMessage());
		}
		return $zscripttext;
	}	

	public function returnMoldDefsFunctions() {
		global $wtw;
		$zscripttext = "switch (shape) {\r\n";
		try {
			foreach ($wtw->pluginMoldDefs as $zmolddef) {
				$zlist = trim($zmolddef["list"]);
				$zmoldtitle = str_replace(" ","",trim($zmolddef["moldtitle"]));
				$zjsfunction = trim($zmolddef["jsfunction"]);
				if (!empty($zjsfunction) && isset($zjsfunction)) {
					if (strpos($zjsfunction,";") === false) {
						$zjsfunction .= ";";
					}
					if (strlen($zmoldtitle) > 1 && strlen($zjsfunction) > 1) {
						$zscripttext .= "case \"".strtolower($zmoldtitle)."\":\r\n";
						$zscripttext .= "mold = ".$zjsfunction."\r\n";
						$zscripttext .= "break;\r\n";
					}
				}
			}			
			$zscripttext .= "default:\r\n";
			$zscripttext .= "mold = WTW.addMoldBox(moldname, lenx, leny, lenz);\r\n";
			$zscripttext .= "break;\r\n";
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwmenus.php-returnMoldDefs=".$e->getMessage());
		}
		$zscripttext .= "}\r\n";
		return $zscripttext;
	}	

	public function addActionZoneDef($zactionzonetitle, $zjsfunction) {
		global $wtw;
		$zsuccess = false;
		try {
			$zfound = false;
			foreach ($wtw->pluginActionZoneDefs as $zactionzone) {
				if (isset($zactionzone["scriptid"]) && !empty($zactionzone["scriptid"])) {
					if ($zactionzone["scriptid"] == $zactionzonetitle) {
						$zfound = true;
					}
				}
			}
			if ($zfound == false) {
				$zactionzone = array(
					'actionzonetitle' => $zactionzonetitle,
					'jsfunction' => $zjsfunction
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
		global $wtw;
		$zscripttext = "";
		try {
			foreach ($wtw->pluginActionZoneDefs as $zactionzonedef) {
				$zactionzonetitle = trim($zactionzonedef["actionzonetitle"]);
				$zjsfunction = trim($zactionzonedef["jsfunction"]);
				if (!empty($zjsfunction) && isset($zjsfunction)) {
					if (strpos($zjsfunction,";") === false) {
						$zjsfunction .= ";";
					}
					if (strlen($zactionzonetitle) > 1) {
						$zscripttext .= "actionzonelist[actionzonelist.length] = {'name':'".$zactionzonetitle."','helpurl':''};\r\n";
					}
				}
			}			
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwmenus.php-returnActionZoneDefsList=".$e->getMessage());
		}
		return $zscripttext;
	}	

	public function returnActionZoneDefsFunctions() {
		global $wtw;
		$zscripttext = "switch (actionzonetype) {\r\n";
		try {
			foreach ($wtw->pluginActionZoneDefs as $zactionzonedef) {
				$zactionzonetitle = str_replace(" ","",trim($zactionzonedef["actionzonetitle"]));
				$zjsfunction = trim($zactionzonedef["jsfunction"]);
				if (!empty($zjsfunction) && isset($zjsfunction)) {
					if (strpos($zjsfunction,";") === false) {
						$zjsfunction .= ";";
					}
					if (strlen($zactionzonetitle) > 1 && strlen($zjsfunction) > 1) {
						$zscripttext .= "case \"".strtolower($zactionzonetitle)."\":\r\n";
						$zscripttext .= "actionzone = ".$zjsfunction."\r\n";
						$zscripttext .= "break;\r\n";
					}
				}
			}			
			$zscripttext .= "default:\r\n";
			$zscripttext .= "actionzone = WTW.addActionzoneLoadzone(actionzonename, actionzoneind, actionzonedef);\r\n";
			$zscripttext .= "break;\r\n";
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwmenus.php-returnActionZoneDefs=".$e->getMessage());
		}
		$zscripttext .= "}\r\n";
		return $zscripttext;
	}	
	
	public function addCoveringDef($zcoveringtitle, $zjsfunction) {
		global $wtw;
		$zsuccess = false;
		try {
			$zfound = false;
			foreach ($wtw->pluginCoveringDefs as $zcovering) {
				if (isset($zcovering["scriptid"]) && !empty($zcovering["scriptid"])) {
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
		global $wtw;
		$zscripttext = "";
		try {
			foreach ($wtw->pluginCoveringDefs as $zcoveringdef) {
				$zcoveringtitle = trim($zcoveringdef["coveringtitle"]);
				$zjsfunction = trim($zactionzonedef["jsfunction"]);
				if (!empty($zjsfunction) && isset($zjsfunction)) {
					if (strpos($zjsfunction,";") === false) {
						$zjsfunction .= ";";
					}
					if (strlen($zcoveringtitle) > 1) {
						$zscripttext .= "coveringlist[coveringlist.length] = {'name':'".$zcoveringtitle."','helpurl':''};\r\n";
					}
				}
			}			
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwmenus.php-returnCoveringDefsList=".$e->getMessage());
		}
		return $zscripttext;
	}	

	public function returnCoveringDefsFunctions() {
		global $wtw;
		$zscripttext = "switch (coveringname) {\r\n";
		try {
			foreach ($wtw->pluginCoveringDefs as $zcoveringdef) {
				$zcoveringtitle = str_replace(" ","",trim($zcoveringdef["coveringtitle"]));
				$zjsfunction = trim($zcoveringdef["jsfunction"]);
				if (!empty($zjsfunction) && isset($zjsfunction)) {
					if (strpos($zjsfunction,";") === false) {
						$zjsfunction .= ";";
					}
					if (strlen($zcoveringtitle) > 1 && strlen($zjsfunction) > 1) {
						$zscripttext .= "case \"".strtolower($zcoveringtitle)."\":\r\n";
						$zscripttext .= "covering = ".$zjsfunction."\r\n";
						$zscripttext .= "break;\r\n";
					}
				}
			}			
			$zscripttext .= "default:\r\n";
			$zscripttext .= "covering = WTW.addCoveringColor(moldname, molddef);\r\n";
			$zscripttext .= "break;\r\n";
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwmenus.php-returnCoveringDefsFunctions=".$e->getMessage());
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
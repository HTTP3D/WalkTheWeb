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
			$this->rootpath = $wtw->rootpath;
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
			$wtwdb->serror("core-functions-class_wtwmenus.php-getPluginScripts=".$e->getMessage());
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

			$jsdata .= "	WTWJS.prototype.pluginsCheckActionZone = function(zactionzone, zmeinzone, zothersinzone) {\r\n";
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
			$jsdata .= 	$this->getScriptFunction('onclick', 'pickedname');
			$jsdata .= "		} catch (ex) {\r\n";
			$jsdata .= "			WTW.log('class_wtw-pluginsOnClick=' + ex.message);\r\n";
			$jsdata .= "		}\r\n";
			$jsdata .= "	}\r\n";

			$jsdata .= "</script>"; 
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getScriptFunctions=".$e->getMessage());
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
			$wtwdb->serror("core-functions-class_wtwmenus.php-getScriptFunction=".$e->getMessage());
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
			$wtwdb->serror("core-functions-class_wtwmenus.php-returnScriptFunction=".$e->getMessage());
		}
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
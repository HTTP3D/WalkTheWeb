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
		return $wtwadminmenu->addAdminMenuItem($zid, $ztitle, $zmenusort, $zmenu, $zsubmenusort, $zsubmenu, $ziconurl, $zaccessrequired, $zjsfunction);
	}
	
	public function addFullPageForm($zid, $zaccessrequired, $zfullpagedata) {
		global $wtw;
		return $wtw->addFullPageForm($zid, $zaccessrequired, $zfullpagedata);
	}
	
	public function addSettingsMenuItem($zid, $ztitle, $zmenusort, $zmenu, $ziconurl, $zaccessrequired, $zjsfunction) {
		global $wtwmenus;
		return $wtwmenus->addSettingsMenuItem($zid, $ztitle, $zmenusort, $zmenu, $ziconurl, $zaccessrequired, $zjsfunction);
	}
	
	public function addMenuForm($zformid, $ztitle, $zformdata, $zaccessrequired) {
		global $wtwmenus;
		return $wtwmenus->addMenuForm($zformid, $ztitle, $zformdata, $zaccessrequired);
	}

	public function serror($message) {
		global $wtw;
		return $wtw->serror($message);
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
				if ($zadminonly == $zadmin) {
					$zscripttext .= "<script id=\"".$zscriptid."\" src=\"".$zscripturl."?x=".$zver."\"></script>\r\n";
				}
			}			
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getMenuForms=".$e->getMessage());
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
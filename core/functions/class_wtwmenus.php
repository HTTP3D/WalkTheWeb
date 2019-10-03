<?php
class wtwmenus {
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {

	}	
	
	public $settingsmenu = array();
	public $settingsforms = array();
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	public function getMainMenu() {
		global $wtw;
		global $wtwdb;
		$mainmenu = "";
		try {
			$zuserid = "";
			if(isset($_SESSION["wtw_userid"]) && !empty($_SESSION["wtw_userid"])) {
				$zuserid = $_SESSION["wtw_userid"];
			}
			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."menuitems where menuset='main' and menulevel=1 order by menuorder;");
			
			if (count($zresults) > 0) {
				foreach($zresults as $zrow) {
					$menutext = $zrow["menutext"];
					$menuitemname = $zrow["menuitemname"];
					$menuaction = $zrow["menuaction"];
					$menuproperty = $zrow["menuproperty"];
					$menusecurity = $zrow["menusecurity"];
					$onclick = "";
					$onmouseover = "";
					$onmouseout = "";
					$style = "";
					$menualign = "left";
					if ($zrow["menualignment"] == 'right') {
						$menualign = "right";
					} elseif ($zrow["menualignment"] == 'center') {
						$menualign = "center";
					}
					if ((empty($zuserid) && $menusecurity == 2) || ($menuitemname == "wtw_modecommunity" || $menuitemname == "wtw_modebuilding")) {
						$style = "display:none;visibility:hidden;";
					}
					if ($wtw->pagename == "admin.php" && $menusecurity == 3) {
						$style = "display:inline-block;visibility:visible;";
					} else if ($menusecurity == 3) {
						$style = "display:none;visibility:hidden;";
					}
					if (!empty($menuitemname)) {
						$menuitemname = " id='".$menuitemname."'";
						if ($menuitemname == 'wtw_menuarrowicon') {
							$style .= "cursor:default;";
						}
					}
					switch ($menuaction) {
						case "show-hide":
							$style .= "cursor:pointer;";
							$onclick = "onclick=\"WTW.closeMenus();WTW.showSettingsMenu('".$menuproperty."');\" ";
							//$onmouseover = "onmouseover=\"WTW.closeMenus();WTW.showSettingsMenu('".$menuproperty."');\" ";;
							//$onmouseout = "onmouseout=\"WTW.closeMenus();WTW.hide('".$menuproperty."');\" ";;
							break;
						case "open-tab":
							$style .= "cursor:pointer;";
							$onclick = "onclick=\"WTW.openWebpage('".$menuproperty."','_blank');\"";
							break;
						case "navigate":
							$style .= "cursor:pointer;";
							$onclick = "onclick=\"window.location.href='".$menuproperty."';\"";
							break;
						case "image":
							$onclick = "\"\"";
							break;
						default:
							$style .= "cursor:pointer;";
							$onclick = "onclick=\"WTW.setFunction('".$menuaction."','".$menuproperty."');\" ";
							break;
					}
					$style = "style=\"".$style."\"";
					if ($zrow["menuicon"] != '') {
						$mainmenu .= "<img ".$menuitemname." src='".$zrow["menuicon"]."' alt='".$menutext."' title='".$menutext."' class='wtw-menu".$menualign."icon' ".$onclick.$onmouseover.$onmouseout." ".$style." />";
					} else {
						$mainmenu .= "<div ".$menuitemname." class='wtw-menu".$menualign."text' ".$onclick.$onmouseover.$onmouseout." ".$style." >".$menutext."</div>";
					}
				}
			}			
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getMainMenu=".$e->getMessage());
		}
		return $mainmenu;
	}
	
	public function addSettingsMenuItem($zid, $ztitle, $zmenusort, $zmenu, $ziconurl, $zaccessrequired, $zjsfunction) {
		global $wtwdb;
		$zsuccess = false;
		try {
			/*	$zid = <div> id
				$ztitle = display name
				$zmenusort = int for sort order of menu (level 1)
				$zmenu = top level menu item
				$ziconurl = browse path to icon image (only applies to level 'menu')
				$zaccessrequired = array of roles that are granted access - null for all allowed
				$zjsfunction = javascript function to call for onclick event examples: WTW.show();   or  myFunctionName('testthis');  or  MY.functionName();MY.secondFunction();
			*/
			$zfound = false;
			foreach ($this->settingsmenu as $zsettingsmenu) {
				if (isset($zsettingsmenu["id"]) && !empty($zsettingsmenu["id"])) {
					if ($zsettingsmenu["id"] == $zid) {
						$zfound = true;
					}
				}
			}
			if ($zfound == false) {
				$zmenuitem = array(
					'id' => $zid,
					'title' => $ztitle,
					'menusort' => $zmenusort, 
					'menu' => $zmenu, 
					'iconurl' => $ziconurl, 
					'accessrequired' => $zaccessrequired, 
					'jsfunction' => $zjsfunction
				);
				$this->settingsmenu[count($this->settingsmenu)] = $zmenuitem;
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-addSettingsMenuItem=".$e->getMessage());
		}
		return $zsuccess;
	}	

	public function getSettingsMenu() {
		global $wtw;
		global $wtwdb;
		$zsettingsmenu = "";
		try {
			$settingsmenuarray = $this->settingsmenu;
			/* sort menus */
			array_multisort(array_column($settingsmenuarray, 'menusort'),  SORT_ASC,
                array_column($settingsmenuarray, 'menu'), SORT_ASC,
                $settingsmenuarray);
			/* display menu */
			$ztempmenu = "";
			$ztempid = "";
			foreach ($settingsmenuarray as $zmenuitem) {
				$zid = $zmenuitem["id"];
				$ztitle = $zmenuitem["title"];
				$zmenusort = $zmenuitem["menusort"];
				$zmenu = $zmenuitem["menu"];
				$ziconurl = $zmenuitem["iconurl"];
				$zaccessrequired = $zmenuitem["accessrequired"]; /* array of allowed roles */
				$zjsfunction = $zmenuitem["jsfunction"];
				if ($wtwdb->hasPermission($zaccessrequired) || empty($zaccessrequired) || !isset($zaccessrequired)) {
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
						$zsettingsmenu .= "<li id=\"".$zid."\" class=\"wtw-menuli\" onclick=\"WTW.hide('wtw_menusettings');".$zjsfunction."\"><img id=\"".$zid."image\" src=\"".$ziconurl."\" alt=\"".$ztitle."\" title=\"".$ztitle."\" class='wtw-menulefticon' />".$ztitle."</li>";
					}
				}
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getSettingsMenu=".$e->getMessage());
		}
		return $zsettingsmenu;
	}	

	public function addMenuForm($zformid, $ztitle, $zformdata, $zaccessrequired) {
		global $wtwdb;
		$zsuccess = false;
		try {
			$zfound = false;
			foreach ($this->settingsforms as $zsettingsform) {
				if (isset($zsettingsform["formid"]) && !empty($zsettingsform["formid"])) {
					if ($zsettingsform["formid"] == $zformid) {
						$zfound = true;
					}
				}
			}
			if ($zfound == false) {
				$zform = array(
					'formid' => $zformid,
					'title' => $ztitle,
					'formdata' => $zformdata,
					'accessrequired' => $zaccessrequired
				);
				
				$this->settingsforms[count($this->settingsforms)] = $zform;
				$zsuccess = true;
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-addMenuForm=".$e->getMessage());
		}
		return $zsuccess;
	}	
	
	public function getMenuForms() {
		global $wtwdb;
		$zmenuforms = "";
		try {
			foreach ($this->settingsforms as $zform) {
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
					if (!empty($zformdata) && isset($zformdata)) {
						$zmenuforms = "";
						$zmenuforms .= "<div id=\"".$zformid."\" class=\"wtw-slideupmenuright\" style=\"display:none;visibility:hidden;\">";
						$zmenuforms .= "	<img class=\"wtw-closeright\" onclick=\"WTW.closeMenus();\" src=\"/content/system/images/menuclose.png\" alt=\"Close\" title=\"Close\" onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />";
						$zmenuforms .= "	<div class=\"wtw-menuheading\">".$ztitle."</div>";
						$zmenuforms .= "	<div id=\"".$zformid."scroll\" class=\"wtw-mainmenuscroll\">";
						$zmenuforms .= $zformdata;
						$zmenuforms .= "	</div>";
						$zmenuforms .= "</div>";
					}
				}
			}			
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getMenuForms=".$e->getMessage());
		}
		return $zmenuforms;
	}	
	
}

	function wtwmenus() {
		return wtwmenus::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwmenus'] = wtwmenus();	

?>
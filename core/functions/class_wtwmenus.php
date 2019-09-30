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
							$onclick = "onclick=\"WTW.closeMenus();WTW.showMenuWithScroll('".$menuproperty."');\" ";
							//$onmouseover = "onmouseover=\"WTW.closeMenus();WTW.showMenuWithScroll('".$menuproperty."');\" ";;
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
}

	function wtwmenus() {
		return wtwmenus::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwmenus'] = wtwmenus();	

?>
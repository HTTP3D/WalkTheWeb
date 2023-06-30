<?php
class wtwmenus {
	/* wtwmenus class for main WalkTheWeb browsing menu functions */
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {

	}	
	
	/* declare public $wtwmenus variables */
	public $settingsmenu = array();
	public $settingsforms = array();
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}

	public function __($zlabel) {
		/* Language translation based on language file */
		global $wtwdb;
		return $wtwdb->__($zlabel);
	}	

	public function getMainMenu() {
		/* gets the dynamically created browsing menu (bottom of the screen) */
		global $wtw;
		global $wtwdb;
		$zbrowsemenu = "";
		$zmobilemenu = "";
		$zmobilemenucenter = "";
		$zmobilemenuright = "";
		try {
			$zuserid = "";
			if ($wtwdb->hasValue($_SESSION["wtw_userid"])) {
				$zuserid = $_SESSION["wtw_userid"];
			}
			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."menuitems where menuset='main' and menulevel=1 order by menuorder;");
			
			if (count($zresults) > 0) {
				foreach($zresults as $zrow) {
					$zmenutext = $zrow["menutext"];
					$zmenuitemname = $zrow["menuitemname"];
					$zmenuitemnamemobile = $zrow["menuitemname"].'mobile';
					$zmenuaction = $zrow["menuaction"];
					$zmenuproperty = $zrow["menuproperty"];
					$zmenusecurity = $zrow["menusecurity"];
					$zonclick = "";
					$zonmouseover = "";
					$zonmouseout = "";
					$zstyle = "cursor:pointer;";
					$zmenualign = "left";
					if ($zrow["menualignment"] == 'right') {
						$zmenualign = "right";
					} elseif ($zrow["menualignment"] == 'center') {
						$zmenualign = "center";
					}
					if (empty($zmenuitemname)) {
						$zmenuitemname = 'wtw_'.$wtwdb->getRandomString(16,1);
						$zmenuitemnamemobile = $zmenuitemname.'mobile';
					}
					if ($zmenuitemname == "wtw_modecommunity" || $zmenuitemname == "wtw_modebuilding") {
//						$zstyle = "display:none;visibility:hidden;";
					}
					if ($wtw->pagename == "admin.php" && $zmenusecurity == 3) {
//						$zstyle = "display:inline-block;visibility:visible;";
					} else if ($zmenusecurity == 3) {
//						$zstyle = "display:none;visibility:hidden;";
					}
					if (!empty($zmenuitemname)) {
						if ($zmenuitemname == 'wtw_menuarrowicon') {
							$zstyle .= "cursor:default;";
						}
						$zmenuitemname = " id='".$zmenuitemname."'";
					}
					switch ($zmenuaction) {
						case "show-hide":
							$zonclick = "onclick=\"WTW.closeMenus();WTW.showSettingsMenu('".$zmenuproperty."');\" ";
							break;
						case "open-tab":
							$zonclick = "onclick=\"WTW.openWebpage('".$zmenuproperty."','_blank');\"";
							break;
						case "navigate":
							$zonclick = "onclick=\"window.location.href='".$zmenuproperty."';\"";
							break;
						case "image":
							$zonclick = "\"\"";
							break;
						case "":
							$zstyle = "cursor:default;";
							break;
						default:
							$zonclick = "onclick=\"WTW.setFunctionAndExecute('".$zmenuaction."','".$zmenuproperty."');\" ";
							break;
					}
					$zstyle = "style=\"".$zstyle."\"";
					if ($zrow["menuicon"] != '') {
						if ($zrow["menuitemname"] == 'wtw_rating') {
							$zbrowsemenu .= "<div id='wtw_rating' class='wtw-menurighttext' ".$zonclick." ".$zstyle.">".$this->__($zmenutext)."</div>";
						} else {
							$zbrowsemenu .= "<img ".$zmenuitemname." src='".$zrow["menuicon"]."' alt='".$this->__($zmenutext)."' title='".$this->__($zmenutext)."' class='wtw-menu".$zmenualign."icon' ".$zonclick.$zonmouseover.$zonmouseout." ".$zstyle." />";
						}
						if ($zmenuitemnamemobile == 'wtw_menuarrowiconmobile') {
							/* skip on mobile */
						} else {
							switch ($zmenualign) {
								case 'center':
									/* mobile center items will be added after all of the left and right align */
									$zmobilemenucenter .= "<img id='".$zmenuitemnamemobile."' src='".$zrow["menuicon"]."' alt='".$this->__($zmenutext)."' title='".$this->__($zmenutext)."' class='wtw-menumobileicon' ".$zonclick.$zonmouseover.$zonmouseout." ".$zstyle." /><div id='".$zmenuitemnamemobile."text' class='wtw-menumobiletext' ".$zonclick." ".$zstyle.">".$this->__($zmenutext)."</div><div class='wtw-clear'></div>";
									break;
								case 'right':
									/* mobile uses reverse order for right align items */
									$zmobilemenuright = "<img id='".$zmenuitemnamemobile."' src='".$zrow["menuicon"]."' alt='".$this->__($zmenutext)."' title='".$this->__($zmenutext)."' class='wtw-menumobileicon' ".$zonclick.$zonmouseover.$zonmouseout." ".$zstyle." /><div id='".$zmenuitemnamemobile."text' class='wtw-menumobiletext' ".$zonclick." ".$zstyle.">".$this->__($zmenutext)."</div><div class='wtw-clear'></div>".$zmobilemenuright;
									break;
								default:
									/* mobile has left align items first */
									$zmobilemenu .= "<img id='".$zmenuitemnamemobile."' src='".$zrow["menuicon"]."' alt='".$this->__($zmenutext)."' title='".$this->__($zmenutext)."' class='wtw-menumobileicon' ".$zonclick.$zonmouseover.$zonmouseout." ".$zstyle." /><div id='".$zmenuitemnamemobile."text' class='wtw-menumobiletext' ".$zonclick." ".$zstyle.">".$this->__($zmenutext)."</div>";
									if ($zmenuitemnamemobile != 'wtw_modecommunitymobile' && $zmenuitemnamemobile != 'wtw_modebuildingmobile') {
										$zmobilemenu .= "<div class='wtw-clear'></div>";
									}
									break;
							}
						}
					} else {
						$zbrowsemenu .= "<div ".$zmenuitemname." class='wtw-menu".$zmenualign."text' ".$zonclick.$zonmouseover.$zonmouseout." ".$zstyle." >".$this->__($zmenutext)."</div>";

						switch ($zmenualign) {
							case 'center':
								/* mobile center items will be added after all of the left and right align */
								$zmobilemenucenter .= "<div id='".$zmenuitemnamemobile."' class='wtw-menumobiletext' ".$zonclick.$zonmouseover.$zonmouseout." ".$zstyle." >".$this->__($zmenutext)."</div><div class='wtw-clear'></div>";
								break;
							case 'right':
								/* mobile uses reverse order for right align items */
								$zmobilemenuright = "<div id='".$zmenuitemnamemobile."' class='wtw-menumobiletext' ".$zonclick.$zonmouseover.$zonmouseout." ".$zstyle." >".$this->__($zmenutext)."</div><div class='wtw-clear'></div>".$zmobilemenuright;
								break;
							default:
								/* mobile has left align items first */
								$zmobilemenu .= "<div id='".$zmenuitemnamemobile."' class='wtw-menumobiletext' ".$zonclick.$zonmouseover.$zonmouseout." ".$zstyle." >".$this->__($zmenutext)."</div><div class='wtw-clear'></div>";
								break;
						}
					}
				}
			}			
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getMainMenu=".$e->getMessage());
		}
		/* create mobile menu display */
		$zmainmenu = "<div id='wtw_wtwmessage' class='wtw-wtwmessage'></div><div id='wtw_menubase' class='wtw-menubase'><div id='wtw_menucollapsed' class='wtw-menucollapsed' onclick=\"WTW.toggleBrowseMenu();WTW.hudLoginShowEnter();\"><img id='wtw_menucollapseimg' src='/content/system/images/menumobile32.png' title='Browse Menu' alt='Toggle Menu' onmouseover=\"dGet('wtw_menucollapsed').style.backgroundColor='yellow';\" onmouseout=\"dGet('wtw_menucollapsed').style.backgroundColor='#ffffff';\" /></div><div id='wtw_menuexpandedmobile' class='wtw-menuexpandedmobile'><img onclick='WTW.toggleBrowseMenu(0);' class='wtw-closeright' src='/content/system/images/menuclose.png' alt='Close' title='Close' onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\"><div class='wtw-menuheading'>Browse Menu</div><div id='wtw_mobilemenuscroll' class='wtw-mobilemenuscroll'>".$zmobilemenu.$zmobilemenuright.$zmobilemenucenter."</div></div><div id='wtw_menuexpanded' class='wtw-menuexpanded'><div class='wtw-indentright'>&nbsp;</div>".$zbrowsemenu."</div></div>";
		return $zmainmenu;
	}
	
	public function addSettingsMenuItem($zid, $ztitle, $zmenusort, $zmenu, $ziconurl, $zaccessrequired, $zjsfunction) {
		/* add menu options to the settings section of the browse menu */
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
				if ($wtwdb->hasValue($zsettingsmenu["id"])) {
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
		global $wtwdb;
		$zmenu = "";
		try {
			$zmenu .= "<div id='wtw_menusettings' class='wtw-slideupmenuright wtw-hide'>\r\n";
			$zmenu .= "	<img onclick='WTW.closeMenus();' class='wtw-closeright' src='/content/system/images/menuclose.png' alt='Close' title='Close' onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
			$zmenu .= "	<div class='wtw-menuheading'>".$this->__('Settings Menu')."</div>\r\n";
			$zmenu .= "	<div id='wtw_menusettingsscroll' class='wtw-mainmenuscroll'>\r\n";
			$zmenu .= "		<ul class='wtw-menuli'>\r\n";
			$zmenu .= "			<li class='wtw-menuli' onclick='WTW.openCameraMenu();'><img src='/content/system/images/menucamera.png' alt='Select Camera' title='Select Camera' class='wtw-menulefticon' />".$this->__("Select Camera (3D, VR)")."</li>\r\n";
			$zmenu .= "			<li class='wtw-menuliholder'><img src='/content/system/images/menuwalk.png' alt='Camera Distance' title='Camera Distance' class='wtw-menulefticon' />".$this->__('Camera Distance')."</li>\r\n";
			$zmenu .= "			<li class='wtw-submenuli'>\r\n";
			$zmenu .= "				<input id='wtw_tcameradistance' type='range' min='-100' max='100' value='-25' step='1' class='wtw-menuslider' oninput='WTW.changeCameraDistance();' onchange='WTW.changeCameraDistance();this.blur();'/>\r\n";
			$zmenu .= "			</li>\r\n";
			$zmenu .= "			<li><img src='/content/system/images/menuview.png' alt='Show and Hide Items' title='Show and Hide Items' class='wtw-menulefticon' />".$this->__('View')."</li>\r\n";
			$zmenu .= "			<li class='wtw-menuliholder'><ul class='wtw-submenuli'>\r\n";
			$zmenu .= "					<li class='wtw-menuli' onclick='WTW.toggleFPS();'><img id='wtw_fpsicon' src='/content/system/images/menuoff.png' alt=\"".$this->__('Show Mold Count')."\" title=\"".$this->__('Show Mold Count')."\" class='wtw-menulefticon' /><div id='wtw_fpsvisibility'>".$this->__('Counts and FPS are Hidden')."</div></li>\r\n";
			$zmenu .= "					<li class='wtw-menuli' onclick='WTW.toggleArrows();'><img id='wtw_arrowsicon' src='/content/system/images/menuoff.png' alt=\"".$this->__('Show Arrows')."\" title=\"".$this->__('Show Arrows')."\" class='wtw-menulefticon' /><div id='wtw_arrowsvisibility'>".$this->__('Arrows are Hidden')."</div></li>\r\n";
			$zmenu .= "				</ul></li>\r\n";
			$zmenu .= "			<li class='wtw-menuli' onclick=\"WTW.hide('wtw_menusettings');WTW.showSettingsMenu('wtw_menumovementspeed');\"><img src='/content/system/images/menumovement.png' alt='Movement Speed' title='Movement Speed' class='wtw-menulefticon' />".$this->__("Movement Speed")."</li>\r\n";
			$zmenu .= "			<li class='wtw-menuli' onclick=\"WTW.hide('wtw_menusettings');WTW.showSettingsMenu('wtw_menugraphicsquality');\"><img src='/content/system/images/menugraphics.png' alt='Graphics Quality' title='Graphics Quality' class='wtw-menulefticon' />".$this->__('Graphics Quality')."</li>\r\n";
			$zmenu .= "			<li class='wtw-menuli' onclick=\"WTW.hide('wtw_menusettings');WTW.showSettingsMenu('wtw_menushadowquality');\"><img src='/content/system/images/menushadows.png' alt='Shadow Quality' title='Shadow Quality' class='wtw-menulefticon' />".$this->__("Shadow Quality")."</li>\r\n";
			$zmenu .= "			<li class='wtw-menuli' onclick=\"WTW.hide('wtw_menusettings');WTW.showSettingsMenu('wtw_menutestmic');\"><img src='/content/system/images/menushadows.png' alt='Test Microphone' title='Test Microphone' class='wtw-menulefticon' />".$this->__('Test Microphone')."</li>\r\n";
			$zmenu .= "			<li class='wtw-menuli' onclick='WTW.toggleSoundMute();'><img id='wtw_submenumute' src='/content/system/images/menumuteon.png' alt=\"".$this->__('Turn Sound On')."\" title=\"".$this->__('Turn Sound On')."\" class='wtw-menulefticon' /><span id='wtw_submenumutetext'>".$this->__('Sound is Off')."</span></li>\r\n";
			$zmenu .= $this->getAdditionalSettingsMenu();
			$zmenu .= "		</ul>\r\n";
			$zmenu .= "	</div>\r\n";
			$zmenu .= "</div>\r\n";

		
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getSettingsMenu=".$e->getMessage());
		}
		return $zmenu;
	}
	
	public function getAdditionalSettingsMenu() {
		/* retrieve the dynamically created settings menu */
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
				if ($wtwdb->hasPermission($zaccessrequired) || !isset($zaccessrequired) || empty($zaccessrequired)) {
					/* check for invalid entries */
					if (!isset($zid) || empty($zid)) {
						$zid = $wtwdb->getRandomString(5,1);
					}
					if (!isset($ztitle) || empty($ztitle)) {
						$ztitle = 'Menu Item';
					}
					if (!isset($ziconurl) || empty($ziconurl)) {
						$ziconurl = "/content/system/images/menuarrow.png";
					}
					if (!isset($zjsfunction) || empty($zjsfunction)) {
						$zjsfunction = '';
					}
					if ($ztempmenu != $zmenu) {
						$zsettingsmenu .= "<li id='".$zid."' class='wtw-menuli' onclick=\"WTW.hide('wtw_menusettings');".$zjsfunction."\"><img id='".$zid."image' src='".$ziconurl."' alt='".$this->__($ztitle)."' title='".$this->__($ztitle)."' class='wtw-menulefticon' />".$this->__($ztitle)."</li>";
					}
				}
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getAdditionalSettingsMenu=".$e->getMessage());
		}
		return $zsettingsmenu;
	}	

	public function addMenuForm($zformid, $ztitle, $zformdata, $zaccessrequired, $zcssclass) {
		/* add a form data to the browse menu - often used from plugins */
		global $wtwdb;
		$zsuccess = false;
		try {
			$zfound = false;
			if (!isset($zcssclass) || empty($zcssclass)) {
				$zcssclass = 'wtw-slideupmenuright';
			}
			foreach ($this->settingsforms as $zsettingsform) {
				if ($wtwdb->hasValue($zsettingsform["formid"])) {
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
					'accessrequired' => $zaccessrequired,
					'cssclass' => $zcssclass
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
		/* retrieve the form data to be added to the browse menu - often items are added by plugins */
		global $wtwdb;
		$zmenuforms = "";
		try {
			foreach ($this->settingsforms as $zform) {
				$zformid = $zform["formid"];
				$ztitle = $zform["title"];
				$zaccessrequired = $zform["accessrequired"]; /* array of allowed roles */
				$zformdata = $zform["formdata"];
				if ($wtwdb->hasPermission($zaccessrequired) || !isset($zaccessrequired) || empty($zaccessrequired)) {
					/* check for invalid entries */
					$zcssclass = $zform["cssclass"];
					if (!isset($zformid) || empty($zformid)) {
						$zformid = $wtwdb->getRandomString(6,1);
					}
					if (!isset($zformdata) || empty($zformdata)) {
						$zformdata = '';
					}
					if (!isset($zcssclass) || empty($zcssclass)) {
						$zcssclass = 'wtw-slideupmenuright';
					}
					if ($wtwdb->hasValue($zformdata)) {
						$zmenuforms .= "<div id='".$zformid."' class='".$zcssclass." wtw-hide'>";
						$zmenuforms .= "	<img class='wtw-closeright' onclick=\"WTW.closeMenus('".$zformid."');\" src='/content/system/images/menuclose.png' alt='".$this->__("Close")."' title='".$this->__("Close")."' onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />";
						$zmenuforms .= "	<img id='".$zformid."min' class='wtw-closeright wtw-hide' onclick=\"WTW.resizeMenu('".$zformid."', 'min');\" src='/content/system/images/menuminimize.png' alt='".$this->__("Minimize")." ".$this->__($ztitle)."' title='".$this->__("Minimize")." ".$this->__($ztitle)."' onmouseover=\"this.src='/content/system/images/menuminimizehover.png';\" onmouseout=\"this.src='/content/system/images/menuminimize.png';\" />\r\n";
						$zmenuforms .= "	<img id='".$zformid."max' class='wtw-closeright wtw-hide' onclick=\"WTW.resizeMenu('".$zformid."', 'max');\" src='/content/system/images/menumaximize.png' alt='".$this->__("Maximize")." ".$this->__($ztitle)."' title='".$this->__("Maximize")." ".$this->__($ztitle)."' onmouseover=\"this.src='/content/system/images/menumaximizehover.png';\" onmouseout=\"this.src='/content/system/images/menumaximize.png';\" />\r\n";
						$zmenuforms .= "	<div class='wtw-menuheading'>".$this->__($ztitle)."</div>";
						$zmenuforms .= "	<div id='".$zformid."scroll' class='wtw-mainmenuscroll'>";
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
	
	public function getBrowseMenu($zmenuid, $zmenuset) {
		global $wtwdb;
		$zmenu = "";
		try {
			$zmenu .= "<div id='".$zmenuid."' class='wtw-slideupmenuright wtw-hide'>\r\n";
			$zmenu .= "		<img onclick='WTW.closeMenus();' class='wtw-closeright' src='/content/system/images/menuclose.png' alt='Close' title='Close' onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
			$zmenu .= "		<div class='wtw-menuheading'>".$zmenuset."</div>\r\n";
			$zmenu .= "		<div id='wtw_menuhelpscroll' class='wtw-mainmenuscroll'>\r\n";
			$zmenu .= "			<ul class='wtw-menuli'>\r\n";
			
			$zresults = $wtwdb->query("
				select * 
				from ".wtw_tableprefix."menuitems 
				where menuset='Help Menu'
					and deleted=0
				order by menuorder, menuitemid;
			");
			foreach ($zresults as $zrow) {
				$zmenu .= "<li class='wtw-menuli' onclick=\"".$zrow["menuaction"]."\"><img src='".$zrow["menuicon"]."' alt=\"".$zrow["menutext"]."\" title=\"".$zrow["menutext"]."\" class='wtw-menulefticon' />".$zrow["menutext"]."</li>\r\n";
			}
			$zmenu .= "			</ul>\r\n";
			$zmenu .= "		</div>\r\n";
			$zmenu .= "</div>\r\n";	
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getBrowseMenu=".$e->getMessage());
		}
		return $zmenu;
	}
	
	public function getProfileMenu() {
		global $wtwdb;
		$zmenu = "";
		try {
			$zmenu .= "<div id='wtw_menuprofile' class='wtw-slideupmenuright wtw-hide'>\r\n";
			$zmenu .= "	<div id='wtw_menuprofilescroll' class='wtw-mainmenuscroll'>\r\n";
			$zmenu .= "		<div id='wtw_menuloggedin' class='wtw-hide'>\r\n";
			$zmenu .= "			<img onclick='WTW.closeMenus();' class='wtw-closeright' src='/content/system/images/menuclose.png' alt='Close' title='Close' onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
			$zmenu .= "			<div class='wtw-menuheading'>".$this->__('My Profile')."</div>\r\n";
			$zmenu .= "			<ul class='wtw-menuli'>\r\n";
			$zmenu .= "				<li class='wtw-menuliholder wtw-center'><img id='wtw_profileimagelg' src='/content/system/images/menuprofilebig.png' alt='Profile' title='Profile' class='wtw-image100' /></li>\r\n";
			$zmenu .= "				<li class='wtw-submenuli'>".$this->__('Avatar Display Name')."</li>\r\n";
			$zmenu .= "				<li class='wtw-submenuli'><div id='wtw_menudisplayname' class='wtw-indentbold wtw-pointer' onclick='WTW.editProfile();'></div>\r\n";
			$zmenu .= "					<input type='text' id='wtw_teditdisplayname' class='wtw-hide' /></li>\r\n";
			$zmenu .= "				<li class='wtw-submenuli'>".$this->__('User Information')."</li>\r\n";
			$zmenu .= "				<li class='wtw-submenuli'><div id='wtw_menuemail' class='wtw-indentbold wtw-pointer' onclick='WTW.editProfile();'>".$this->__('Email')."</div>\r\n";
			$zmenu .= "					<input type='text' id='wtw_teditemail' autocomplete='email' class='wtw-hide' /></li>\r\n";
			$zmenu .= "				<li class='wtw-menuliholder'><div id='wtw_profileerrortext' class='wtw-errorindent'></div></li>\r\n";
			$zmenu .= "				<li id='wtw_menusaveprofile' class='wtw-menuli wtw-hide' onclick='WTW.saveProfile();'><img src='/content/system/images/menulogin.png' alt='Save Profile' title='Save Profile' class='wtw-menulefticon' /><div class='wtw-yellow'>".$this->__('Save Profile')."</div></li>\r\n";
			$zmenu .= "				<li id='wtw_menucancelsaveprofile' class='wtw-menuli wtw-hide' onclick='WTW.cancelEditProfile();'><img src='/content/system/images/menulogin.png' alt='Cancel' title='Cancel' class='wtw-menulefticon' />".$this->__('Cancel')."</li>\r\n";
			$zmenu .= "				<li class='wtw-submenuli'><hr /></li>\r\n";
			$zmenu .= "				<li class='wtw-menuli' class='wtw-clear' onclick='WTW.editProfile();'><img src='/content/system/images/menueditprofile.png' alt='Edit My Profile' title='Edit My Profile' class='wtw-menulefticon' />".$this->__('Edit My Profile')."</li>\r\n";
			$zmenu .= "				<li class='wtw-menuli' onclick='WTW.closeMenus();WTW.openAvatarDesigner();'><img src='/content/system/images/menueditavatar.png' alt='Edit My Avatar' title='Edit My Avatar' class='wtw-menulefticon' />".$this->__('Edit My Avatar')."</li>\r\n";
			$zmenu .= "				<li class='wtw-menuli' onclick=\"WTW.closeMenus();WTW.openLoginHUD('Select My Avatar');\"><img src='/content/system/images/menueditavatar.png' alt='Select My Avatar' title='Select My Avatar' class='wtw-menulefticon' />".$this->__('Select My Avatar')."</li>\r\n";
			$zmenu .= "				<li class='wtw-menuli' onclick=\"WTW.closeMenus();WTW.openWebpage('https://www.walktheweb.com/my-3d-stats/','_blank');\"><img src='/content/system/images/menustats.png' alt='My 3D Stats' title='My 3D Stats' class='wtw-menulefticon' />".$this->__('My 3D Stats')."</li>\r\n";
			$zmenu .= "				<li class='wtw-menuli' onclick=\"WTW.closeMenus();WTW.openWebpage('https://www.walktheweb.com/account/password/','_blank');\"><img src='/content/system/images/menupassword.png' alt='Change Password' title='Change Password' class='wtw-menulefticon' />".$this->__('Change Password')."</li>\r\n";
			$zmenu .= "				<li class='wtw-menuli' onclick='WTW.openLoginMenu();WTW.closeMenus();'><img src='/content/system/images/menulogin.png' alt='Login Menu' title='Login Menu' class='wtw-menulefticon' /><div class='wtw-yellow'>".$this->__('Login Menu')."</div></li>\r\n";
			$zmenu .= "				<li class='wtw-menuli' onclick='WTW.closeMenus();WTW.logout();'><img src='/content/system/images/menulogout.png' alt='Log Out' title='Log Out' class='wtw-menulefticon' /><div>".$this->__('Log Out')."</div></li>\r\n";
			$zmenu .= "			</ul>\r\n";
			$zmenu .= "		</div>\r\n";
			$zmenu .= "		<div id='wtw_menulogin'>\r\n";
			$zmenu .= "			<form>\r\n";
			$zmenu .= "				<img onclick='WTW.closeMenus();' class='wtw-closeright' src='/content/system/images/menuclose.png' alt='Close' title='Close' onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
			$zmenu .= "				<div class='wtw-menuheading'>".$this->__('Login')."</div>\r\n";
			$zmenu .= "				<ul class='wtw-menuli'>\r\n";
			$zmenu .= "					<li class='wtw-menuli' onclick='WTW.openLoginMenu();WTW.closeMenus();'><img src='/content/system/images/menulogin.png' alt=\"".$this->__('Login Menu')."\" title=\"".$this->__('Login Menu')."\" class='wtw-menulefticon' /><div class='wtw-yellow'>".$this->__('Login')."</div></li>\r\n";
			$zmenu .= "					<li class='wtw-menuli' onclick=\"WTW.openLocalLogin('Recover Login', .4, .5);WTW.closeMenus();\"><img src='/content/system/images/menupassword.png' alt=\"".$this->__('Recover Login')."\" title=\"".$this->__('Recover Login')."\" class='wtw-menulefticon' /><div>".$this->__('Forgot My Login')."</div></li>\r\n";
			$zmenu .= "					<li class='wtw-menuli' onclick=\"WTW.openLocalLogin('Create Login', .4, .7);WTW.closeMenus();\"><img src='/content/system/images/menuregister.png' alt=\"".$this->__('Create My Account')."\" title=\"".$this->__('Create My Account')."\" class='wtw-menulefticon' /><div class='wtw-yellow'>".$this->__('Create My Account')."</div></li>\r\n";
			$zmenu .= "				</ul>\r\n";
			$zmenu .= "			</form>\r\n";
			$zmenu .= "		</div>\r\n";
			$zmenu .= "	</div>\r\n";
			$zmenu .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getProfileMenu=".$e->getMessage());
		}
		return $zmenu;
	}
	
	public function getContentRatingMenu() {
		global $wtwdb;
		$zmenu = "";
		try {
			$zmenu .= "<div id='wtw_menucontentrating' class='wtw-slideupmenuright wtw-hide'>\r\n";
			$zmenu .= "	<img class='wtw-closeright' onclick='WTW.closeMenus();' src='/content/system/images/menuclose.png' alt=\"".$this->__('Close')."\" title=\"".$this->__('Close')."\" onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
			$zmenu .= "	<div class='wtw-menuheading'>".$this->__('Content Rating')."</div>\r\n";
			$zmenu .= "	<div id='wtw_menucontentratingscroll' class='wtw-mainmenuscrollmin'>\r\n";
			$zmenu .= "		<div id='wtw_contentrating' class='wtw-menunote'></div>\r\n";
			$zmenu .= "	</div>\r\n";
			$zmenu .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getContentRatingMenu=".$e->getMessage());
		}
		return $zmenu;
	}

	public function getAvatarMenu() {
		global $wtwdb;
		$zmenu = "";
		try {
			$zmenu .= "<div id='wtw_menuavatar' class='wtw-slideupmenuright wtw-hide'>\r\n";
			$zmenu .= "	<img class='wtw-closeright' onclick='WTW.closeAvatarSettings();' src='/content/system/images/menuclose.png' alt=\"".$this->__('Close')."\" title=\"".$this->__('Close')."\" onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
			$zmenu .= "	<div class='wtw-menuheading'>".$this->__('Avatar Settings')."</div>\r\n";
			$zmenu .= "	<div id='wtw_menuavatarscroll' class='wtw-mainmenuscroll'>\r\n";
			$zmenu .= "		<div id='wtw_avatarmenudiv'>\r\n";
			$zmenu .= "			<ul class='wtw-menuli'>\r\n";
			$zmenu .= "				<li class='wtw-menuli' onclick='WTW.switchAvatarMenu(1);'><img src='/content/system/images/menuavataridson.png' alt=\"".$this->__('Avatar Display Name')."\" title=\"".$this->__('Avatar Display Name')."\" class='wtw-menulefticon' /><div>".$this->__('Avatar Display Name')."</div></li>\r\n";
			$zmenu .= "				<li id='wtw_menuavatardisplaynamediv' class='wtw-submenublockli wtw-hide'><div class='wtw-menusubtext'>".$this->__('Avatar Display Name:')."<br />\r\n";
			$zmenu .= "					<input id='wtw_tavatardisplayname' type='text' maxlength='255' onclick=\"WTW.checkKey(this, 'displayname', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'displayname', 0, 0);\" onblur=\"WTW.checkKey(this, 'displayname', 0, 1);WTW.saveAvatarDisplayName();\" /></div><br />\r\n";
			$zmenu .= "					<div id='wtw_displaybannote' class='wtw-menusmalltext'>".$this->__('Be respectful of others when choosing a name.')." \r\n";
			$zmenu .= 						$this->__('Reported offenders may be banned permanently.');
			$zmenu .= 						$this->__('Note that all names used are recorded with your account.')."<br />\r\n";
			$zmenu .= "					</div>\r\n";
			$zmenu .= "				</li>\r\n";
			$zmenu .= "				<li class='wtw-menuli' onclick='WTW.switchAvatarMenu(3);'><img src='/content/system/images/menuanimations.png' alt=\"".$this->__('Avatar Animations')."\" title=\"".$this->__('Avatar Animations')."\" class='wtw-menulefticon' /><div>".$this->__('Avatar Animations')."</div></li>\r\n";
			$zmenu .= "				<li id='wtw_menuavataranimationsdiv' class='wtw-submenublockli wtw-hide'>\r\n";
			$zmenu .= "					<div class='wtw-inversebox'>".$this->__('For Mouse or Keyboard Controls')."<br />".$this->__("Mouse must be over 3D Scene to move.")."</div>\r\n";
			$zmenu .= "					<div class='wtw-menusubtext'>".$this->__('Select Animation to Edit:')."</div>\r\n";
			$zmenu .= "					<ul class='wtw-nopadding'>\r\n";
			$zmenu .= "						<li id='wtw_animation-onenter' class='wtw-avatarli' onclick='WTW.editEnterAnimation();'><div class='wtw-inlineindent'>".$this->__('Enter 3D Scene')."</div></li>\r\n";
			$zmenu .= "						<li id='wtw_animationdiv-enter' class='wtw-avatarli wtw-hide'><div class='wtw-inlineindent2'>\r\n";
			$zmenu .= "						<select id='wtw_tselectavataranimation-enter' class='wtw-pointer' onchange='WTW.saveAvatarEnterAnimation();'>\r\n";
			$zmenu .= "							<option value='1'>".$this->__('Fast Pop')."</option>\r\n";
			$zmenu .= "							<option value='2'>".$this->__('Fade In')."</option>\r\n";
			$zmenu .= "							<option value='3'>".$this->__('Smokey Arrival')."</option>\r\n";
			$zmenu .= "							<option value='4'>".$this->__('Transport Rings')."</option>\r\n";
			$zmenu .= "							<option value='5'>".$this->__('Transport')."</option>\r\n";
			$zmenu .= "							<option value='6'>".$this->__('Atomic Enhancement')."</option>\r\n";
			$zmenu .= "							<option value='7'>".$this->__('Quick Grow')."</option>\r\n";
			$zmenu .= "							<option value='8'>".$this->__('Lightning Rise')."</option>\r\n";
			$zmenu .= "							<option value='9'>".$this->__('Smokey Evolution')."</option>\r\n";
			$zmenu .= "							<option value='10'>".$this->__('Radioactive Spawn')."</option>\r\n";
			$zmenu .= "							<option value='11'>".$this->__('Beam Force')."</option>\r\n";
			$zmenu .= "						</select></div></li>\r\n";
			$zmenu .= "					</ul>\r\n";
			$zmenu .= "					<div id='wtw_editavataranimations'></div>\r\n";
			$zmenu .= "					<a id='wtw_viewanimations'></a>\r\n";
			$zmenu .= "				</li>\r\n";
			$zmenu .= "				<li class='wtw-menuli' onclick='WTW.switchAvatarMenu(4);'><img src='/content/system/images/menueditavatar.png' alt=\"".$this->__('Change My Avatar')."\" title=\"".$this->__('Change My Avatar')."\" class='wtw-menulefticon' /><div>".$this->__('Change My Avatar')."</div></li>\r\n";
			$zmenu .= "				<li id='wtw_menuavatarchangediv' class='wtw-submenublockli wtw-hide'><div class='wtw-menusubtext'>".$this->__('Select My Avatar')."</div></li>\r\n";
			$zmenu .= "			</ul>\r\n";
			$zmenu .= "			<div class='wtw-greenmenubutton' onclick='WTW.closeAvatarSettings();'>".$this->__('Close Avatar Settings')."</div>\r\n";
			$zmenu .= "		</div>\r\n";
			$zmenu .= "	</div>\r\n";
			$zmenu .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getAvatarMenu=".$e->getMessage());
		}
		return $zmenu;
	}

	public function getOptionalAnimations() {
		global $wtwdb;
		$zmenu = "";
		try {
			$zmenu .= "<div id='wtw_menuoptionalanimations' class='wtw-slideupanimations wtw-hide'>\r\n";
			$zmenu .= "		<img class='wtw-closeright' onclick=\"WTW.hide('wtw_menuoptionalanimations');\" src='/content/system/images/menuclose.png' alt=\"".$this->__('Close Animations')."\" title=\"".$this->__('Close Animations')."\" onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
			$zmenu .= "		<div class='wtw-menuheading wtw-leftalign'>".$this->__('Press and Hold to Play')."<div id='wtw_avataranimationmode' class='wtw-avataranimationmode'>".$this->__('Mode:')."<div id='wtw_animationmodenormal' class='wtw-animationmodeselected' onclick=\"WTW.avatarAnimationMode('');\">".$this->__('Normal')."</div><div id='wtw_animationmodefight' class='wtw-animationmode wtw-hide' onclick=\"WTW.avatarAnimationMode('fight');\">".$this->__('Fight')."</div></div></div>\r\n";
			$zmenu .= "		<div class='wtw-horizontalscroll' id='wtw_listoptionalanimations'></div>\r\n";
			$zmenu .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getOptionalAnimations=".$e->getMessage());
		}
		return $zmenu;
	}

	public function getControlsMenu() {
		global $wtwdb;
		$zmenu = "";
		try {
			$zmenu .= "<div id='wtw_menucontrols' class='wtw-slideupmenuright wtw-hide'>\r\n";
			$zmenu .= "	<img onclick='WTW.closeMenus();' class='wtw-closeright' src='/content/system/images/menuclose.png' alt='Close' title='Close' onmouseover='this.src='/content/system/images/menuclosehover.png';' onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
			$zmenu .= "	<div class='wtw-menuheading'>".$this->__('Movement Controls')."</div>\r\n";
			$zmenu .= "	<div id='wtw_menucontrolsscroll' class='wtw-mainmenuscroll'>\r\n";
			$zmenu .= "		<ul class='wtw-menuli'>\r\n";
			$zmenu .= "			<li id='wtw_helpglassesdiv' class='wtw-submenublockli'>\r\n";
			$zmenu .= "				<a href='https://www.walktheweb.com/shop/walktheweb-3d-glasses/' target='_blank'><img src='/content/system/images/3DGlassesFor5.png' alt='3D Glasses for $5' title='3D Glasses for $5' class='wtw-image95p' /></a /></li>\r\n";
			$zmenu .= "			<li class='wtw-menuli' onclick=\"WTW.hide('wtw_helpkeyboarddiv');WTW.hide('wtw_helptouchdiv');WTW.hide('wtw_helpcameradiv');WTW.toggle('wtw_helpmousediv');WTW.showSettingsMenu('wtw_menucontrols');\"><img src='/content/system/images/menumouse.png' alt=\"".$this->__("Mouse Controls")."\" title=\"".$this->__('Movement Controls')."\" class='wtw-menulefticon' />".$this->__("Mouse Controls")."</li>\r\n";
			$zmenu .= "			<li id='wtw_helpmousediv' class='wtw-submenublockli wtw-hide'>\r\n";
			$zmenu .= "				<div class='wtw-smallcentered'>".$this->__('Mouse must be over 3D Scene to move.')."</div>\r\n";
			$zmenu .= "				<img src='/content/system/images/helpmouse.png' alt=\"".$this->__('Mouse Walk Controls')."\" title=\"".$this->__('Mouse Walk Controls')."\" class='wtw-image95p' /><br />\r\n";
			$zmenu .= "				<img src='/content/system/images/helpmousemove.png' alt=\"".$this->__('Mouse Pan Controls')."\" title=\"".$this->__('Mouse Pan Controls')."\" class='wtw-image95p' /></li>\r\n";
			$zmenu .= "			<li class='wtw-menuli' onclick=\"WTW.hide('wtw_helpmousediv');WTW.hide('wtw_helptouchdiv');WTW.hide('wtw_helpcameradiv');WTW.toggle('wtw_helpkeyboarddiv');WTW.showSettingsMenu('wtw_menucontrols');\"><img src='/content/system/images/menukeys.png' alt=\"".$this->__('Keyboard Controls')."\" title=\"".$this->__('Keyboard Controls')."\" class='wtw-menulefticon' />".$this->__('Keyboard Controls')."</li>\r\n";
			$zmenu .= "			<li id='wtw_helpkeyboarddiv' class='wtw-submenublockli wtw-hide'>\r\n";
			$zmenu .= "				<div class='wtw-smallcentered'>".$this->__('Mouse must be over 3D Scene to move.')."</div>\r\n";
			$zmenu .= "				<img src='/content/system/images/helpkeyboard.png' alt=\"".$this->__('Keyboard Controls')."\" title=\"".$this->__('Keyboard Controls')."\" class='wtw-image95p' /></li>\r\n";
			$zmenu .= "			<li class='wtw-menuli' onclick=\"WTW.hide('wtw_helpmousediv');WTW.hide('wtw_helpkeyboarddiv');WTW.hide('wtw_helpcameradiv');WTW.toggle('wtw_helptouchdiv');WTW.showSettingsMenu('wtw_menucontrols');\"><img src='/content/system/images/menuipad.png' alt=\"".$this->__('Touch Controls')."\" title=\"".$this->__('Touch Controls')."\" class='wtw-menulefticon' />".$this->__('Touch Controls')."</li>\r\n";
			$zmenu .= "			<li id='wtw_helptouchdiv' class='wtw-submenublockli wtw-hide'><img src='/content/system/images/helptouch3.png' alt=\"".$this->__('Touch Controls')."\" title=\"".$this->__('Touch Controls')."\" class='wtw-image95p' /></li>\r\n";
			$zmenu .= "			<li class='wtw-menuli' onclick=\"WTW.hide('wtw_helpmousediv');WTW.hide('wtw_helpkeyboarddiv');WTW.hide('wtw_helptouchdiv');WTW.toggle('wtw_helpcameradiv');WTW.showSettingsMenu('wtw_menucontrols');\"><img src='/content/system/images/menucamera.png' alt=\"".$this->__('Camera Views')."\" title=\"".$this->__('Camera Views')."\" class='wtw-menulefticon' />".$this->__('Camera Views (Enable 3D!)')."</span></li>\r\n";
			$zmenu .= "			<li id='wtw_helpcameradiv' class='wtw-submenublockli wtw-hide'>\r\n";
			$zmenu .= "				<img src='/content/system/images/helpcameras.png' alt=\"".$this->__('Camera Position and Views')."\" title=\"".$this->__('Camera Position and Views')."\" class='wtw-image95p' /></li>\r\n";
			$zmenu .= "			<li class='wtw-menuli' onclick='WTW.openLoginMenu();'>\r\n";
			$zmenu .= "				<img src='/content/system/images/menulogin.png' alt='Login' title='Login' class='wtw-menulefticon' /><div class='wtw-yellow'>".$this->__('Login')."</div></li>\r\n";
			$zmenu .= "		</ul>\r\n";
			$zmenu .= "		<div class='wtw-center'><input type='checkbox' id='wtw_tshowhelponstart' onchange='WTW.toggleHelpOnStart();' /> ".$this->__('Show this Menu on Start')."</div><br />\r\n";
			$zmenu .= "	</div>\r\n";
			$zmenu .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getControlsMenu=".$e->getMessage());
		}
		return $zmenu;
	}

	public function getMovementMenu() {
		global $wtwdb;
		$zmenu = "";
		try {
			$zmenu .= "<div id='wtw_menumovementspeed' class='wtw-slideupmenuright wtw-hide'>\r\n";
			$zmenu .= "	<img class='wtw-closeright' onclick='WTW.closeMenus();' src='/content/system/images/menuclose.png' alt=\"".$this->__('Close')."\" title=\"".$this->__('Close')."\" onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
			$zmenu .= "	<div class='wtw-menuheading'>".$this->__('Movement Speed')."</div>\r\n";
			$zmenu .= "	<div id='wtw_menumovementspeedscroll' class='wtw-mainmenuscroll'>\r\n";
			$zmenu .= "		<ul class='wtw-menuli'>\r\n";
			$zmenu .= "			<li class='wtw-menuliholder'><img src='/content/system/images/menuwalk.png' alt=\"".$this->__('Walk Animation Speed')."\" title=\"".$this->__('Walk Animation Speed')."\" class='wtw-menulefticon' />".$this->__('Walk Animation Speed')."</li>\r\n";
			$zmenu .= "			<li class='wtw-submenuli'>\r\n";
			$zmenu .= "				<input id='wtw_twalkanimationspeed' type='range' min='.1' max='2.9' value='1.5' step='.01' class='wtw-menuslider' onchange='WTW.changeWalkAnimationSpeed();this.blur();'/></li>\r\n";
			$zmenu .= "		</ul>\r\n";
			$zmenu .= "		<ul class='wtw-menuli'>\r\n";
			$zmenu .= "			<li class='wtw-menuliholder'><img src='/content/system/images/menuwalk.png' alt=\"".$this->__('Walk Distance Traveled')."\" title=\"".$this->__('Walk Distance Traveled')."\" class='wtw-menulefticon' />".$this->__('Walk Distance Traveled')."</li>\r\n";
			$zmenu .= "			<li class='wtw-submenuli'>\r\n";
			$zmenu .= "				<input id='wtw_twalkspeed' type='range' min='.1' max='2.9' value='1.5' step='.01' class='wtw-menuslider' onchange='WTW.changeWalkSpeed();this.blur();'/></li>\r\n";
			$zmenu .= "		</ul>\r\n";
			$zmenu .= "		<ul class='wtw-menuli'>\r\n";
			$zmenu .= "			<li class='wtw-menuliholder'><img src='/content/system/images/menuwalk.png' alt=\"".$this->__('Turn Animation Speed')."\" title=\"".$this->__('Turn Animation Speed')."\" class='wtw-menulefticon' />".$this->__('Turn Animation Speed')."</li>\r\n";
			$zmenu .= "			<li class='wtw-submenuli'>\r\n";
			$zmenu .= "				<input id='wtw_tturnanimationspeed' type='range' min='.1' max='1.9' value='1' step='.01' class='wtw-menuslider' onchange='WTW.changeTurnAnimationSpeed();this.blur();'/></li>\r\n";
			$zmenu .= "		</ul>\r\n";
			$zmenu .= "		<ul class='wtw-menuli'>\r\n";
			$zmenu .= "			<li class='wtw-menuliholder'><img src='/content/system/images/menuwalk.png' alt=\"".$this->__('Turn Rotation Distance')."\" title=\"".$this->__('Turn Rotation Distance')."\" class='wtw-menulefticon' />".$this->__('Turn Rotation Distance')."</li>\r\n";
			$zmenu .= "			<li class='wtw-submenuli'>\r\n";
			$zmenu .= "				<input id='wtw_tturnspeed' type='range' min='.1' max='1.9' value='1' step='.01' class='wtw-menuslider' onchange='WTW.changeTurnSpeed();this.blur();'/></li>\r\n";
			$zmenu .= "		</ul>\r\n";
			$zmenu .= "	</div>\r\n";
			$zmenu .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getMovementMenu=".$e->getMessage());
		}
		return $zmenu;
	}

	public function getGraphicsMenu() {
		global $wtwdb;
		$zmenu = "";
		try {
			$zmenu .= "<div id='wtw_menugraphicsquality' class='wtw-slideupmenuright wtw-hide'>\r\n";
			$zmenu .= "	<img class='wtw-closeright' onclick='WTW.closeMenus();' src='/content/system/images/menuclose.png' alt='Close' title='Close' onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
			$zmenu .= "	<div class='wtw-menuheading'>".$this->__('Graphics Quality')."</div>\r\n";
			$zmenu .= "	<div id='wtw_menugraphicsqualityscroll' class='wtw-mainmenuscroll'>\r\n";
			$zmenu .= "		<div id='wtw_graphicsqualitynote' class='wtw-menunote wtw-hide'>".$this->__('Lower Quality Graphics provides faster animation.')."<br /><br />\r\n";
			$zmenu .= 			$this->__('Higher Quality Graphics provides the best image and texture quality; especially when you move close to an object.')."<br /><br />\r\n";
			$zmenu .= 			$this->__('This setting allows you to select the best balance between animation speed and Graphic Quality.')."</div>\r\n";
			$zmenu .= "		<ul class='wtw-menuli'>\r\n";
			$zmenu .= "			<li class='wtw-menuliholder'>\r\n";
			$zmenu .= "				<img src='/content/system/images/menuq.png' alt=\"".$this->__('Show Help')."\" title=\"".$this->__('Show Help')."\" class='wtw-menuq' onclick=\"WTW.toggle('wtw_graphicsqualitynote');\" />\r\n";
			$zmenu .= "				<img src='/content/system/images/menugraphics.png' alt=\"".$this->__('Graphics Quality')."\" title=\"".$this->__('Graphics Quality')."\" class='wtw-menulefticon' />".$this->__('Graphics Quality')."</li>\r\n";
			$zmenu .= "			<li class='wtw-submenuli'>\r\n";
			$zmenu .= "				<input type='button' value='Lower' class='wtw-showinline wtw-pointer' onclick='WTW.changeGraphic(-1);' />\r\n";
			$zmenu .= "				<input id='wtw_tgraphicsetting' type='range' min='0' max='2' defaultValue='0' step='1' class='wtw-pointer' onchange='WTW.changeGraphic(this.value);'/>\r\n";
			$zmenu .= "				<input type='button' value='Higher' class='wtw-showinline wtw-pointer' onclick='WTW.changeGraphic(1);' /></li>\r\n";
			$zmenu .= "			<li id='wtw_graphichelptitle' class='wtw-submenuli wtw-menunoteset'>".$this->__('Graphics (Optimum Balance)')."</li>\r\n";
			$zmenu .= "			<li id='wtw_graphichelpadmin' class='wtw-submenuli wtw-menunoteset wtw-hide wtw-smallred'>".$this->__("Admin Mode Overrides to Optimum")."</li>\r\n";
			$zmenu .= "		</ul>\r\n";
			$zmenu .= "	</div>\r\n";
			$zmenu .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getGraphicsMenu=".$e->getMessage());
		}
		return $zmenu;
	}

	public function getShadowsMenu() {
		global $wtwdb;
		$zmenu = "";
		try {
			$zmenu .= "<div id='wtw_menushadowquality' class='wtw-slideupmenuright wtw-hide'>\r\n";
			$zmenu .= "	<img class='wtw-closeright' onclick='WTW.closeMenus();' src='/content/system/images/menuclose.png' alt=\"".$this->__('Close')."\" title=\"".$this->__('Close')."\" onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
			$zmenu .= "	<div class='wtw-menuheading'>".$this->__('Shadow Quality')."</div>\r\n";
			$zmenu .= "	<div id='wtw_menushadowqualityscroll' class='wtw-mainmenuscroll'>\r\n";
			$zmenu .= "		<div id='wtw_shadowqualitynote' class='wtw-menunote wtw-hide'>".$this->__('Lower Quality or turning shadows off provides faster animation.')."<br /><br />\r\n";
			$zmenu .= 			$this->__('Higher Quality Shadows provides the best shadow resolution.')."<br /><br />\r\n";
			$zmenu .= 			$this->__('This setting allows you to select the best balance between animation speed and Shadow Quality.')."</div>\r\n";
			$zmenu .= "		<ul class='wtw-menuli'>\r\n";
			$zmenu .= "			<li class='wtw-menuliholder'>\r\n";
			$zmenu .= "				<img src='/content/system/images/menuq.png' alt=\"".$this->__('Show Help')."\" title=\"".$this->__('Show Help')."\" class='wtw-menuq' onclick=\"WTW.toggle('wtw_shadowqualitynote');\" />\r\n";
			$zmenu .= "				<img src='/content/system/images/menushadows.png' alt=\"".$this->__('Shadow Quality')."\" title=\"".$this->__('Shadow Quality')."\" class='wtw-menulefticon' />".$this->__('Shadow Quality')."</li>\r\n";
			$zmenu .= "			<li class='wtw-submenuli'>\r\n";
			$zmenu .= "				<input type='button' value='Lower' class='wtw-showinline wtw-pointer' onclick='WTW.changeShadow(-1);' />\r\n";
			$zmenu .= "				<input id='wtw_tshadowsetting' type='range' min='0' max='3' defaultValue='0' step='1' class='wtw-pointer' onchange='WTW.changeShadow(this.value);'/>\r\n";
			$zmenu .= "				<input type='button' value='Higher' class='wtw-showinline wtw-pointer' onclick='WTW.changeShadow(1);' /></li>\r\n";
			$zmenu .= "			<li id='wtw_shadowhelptitle' class='wtw-submenuli wtw-menunoteset'>".$this->__('Shadows (Some - Low Resolution)')."</li>\r\n";
			$zmenu .= "		</ul>\r\n";
			$zmenu .= "	</div>\r\n";
			$zmenu .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getShadowsMenu=".$e->getMessage());
		}
		return $zmenu;
	}

	public function getMicMenu() {
		global $wtwdb;
		$zmenu = "";
		try {
			$zmenu .= "<div id='wtw_menutestmic' class='wtw-slideupmenuright wtw-hide'>\r\n";
			$zmenu .= "	<img class='wtw-closeright' onclick='WTW.closeMenus();' src='/content/system/images/menuclose.png' alt=\"".$this->__('Close')."\" title=\"".$this->__('Close')."\" onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
			$zmenu .= "	<div class='wtw-menuheading'>".$this->__('Test Microphone')."</div>\r\n";
			$zmenu .= "	<div id='wtw_menutestmicscroll' class='wtw-mainmenuscroll'>\r\n";
			$zmenu .= "		<div id='wtw_testmicnote' class='wtw-menunote wtw-hide'>".$this->__('this is a volume check fo the Microphone.')."</div>\r\n";
			$zmenu .= "			<ul class='wtw-menuli'>\r\n";
			$zmenu .= "				<li class='wtw-menuliholder'>\r\n";
			$zmenu .= "					<img src='/content/system/images/menuq.png' alt=\"".$this->__('Show Help')."\" title=\"".$this->__('Show Help')."\" class='wtw-menuq' onclick=\"WTW.toggle('wtw_testmicnote');\" />\r\n";
			$zmenu .= "					<img src='/content/system/images/menumicon.png' alt=\"".$this->__('Test Microphone')."\" title=\"".$this->__('Test Microphone')."\" class='wtw-menulefticon' />".$this->__('Test Microphone')."</li>\r\n";
			$zmenu .= "				<li class='wtw-submenuli'>\r\n";
			$zmenu .= "					<div class='wtw-container'>\r\n";
			$zmenu .= "						<span><!--Microphone--><br /><br /><br /></span>\r\n";
			$zmenu .= "						<div class='wtw-volumen-wrapper'>\r\n";
			$zmenu .= "							<div class='wtw-led'></div>\r\n";
			$zmenu .= "							<div class='wtw-led'></div>\r\n";
			$zmenu .= "							<div class='wtw-led'></div>\r\n";
			$zmenu .= "							<div class='wtw-led'></div>\r\n";
			$zmenu .= "							<div class='wtw-led'></div>\r\n";
			$zmenu .= "							<div class='wtw-led'></div>\r\n";
			$zmenu .= "							<div class='wtw-led'></div>\r\n";
			$zmenu .= "							<div class='wtw-led'></div>\r\n";
			$zmenu .= "							<div class='wtw-led'></div>\r\n";
			$zmenu .= "							<div class='wtw-led'></div>\r\n";
			$zmenu .= "						</div><br />\r\n";
			$zmenu .= "						<div class='wtw-control-audio-wrapper'>\r\n";
			$zmenu .= "							<div id='wtw_audio' class='wtw-audio-control'>&#127908;</div>\r\n";
			$zmenu .= "						</div>\r\n";
			$zmenu .= "					</div>\r\n";
			$zmenu .= "				</li>\r\n";
			$zmenu .= "			</ul>\r\n";
			$zmenu .= "		</div>\r\n";
			$zmenu .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getMicMenu=".$e->getMessage());
		}
		return $zmenu;
	}

	public function getFeedbackMenu() {
		global $wtwdb;
		$zmenu = "";
		try {
			$zmenu .= "<div id='wtw_menufeedback' class='wtw-slideupmenuright wtw-hide'>\r\n";
			$zmenu .= "	<img class='wtw-closeright' onclick='WTW.closeMenus();' src='/content/system/images/menuclose.png' alt='Close' title='Close' onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
			$zmenu .= "	<div class='wtw-menuheading'>".$this->__('Feedback or Issue')."</div>\r\n";
			$zmenu .= "	<div id='wtw_menufeedbackscroll' class='wtw-mainmenuscroll'>\r\n";
			$zmenu .= "		<div id='wtw_feedbacknote' class='wtw-menunote'>".$this->__('Feedback or Reporting issues lead to a more refined enjoyable 3D Internet Experience.')."<br /><br />\r\n";
			$zmenu .= 			$this->__('Please be as detailed as possible to help lead us to a complete solution.')."<br /><br />\r\n";
			$zmenu .= 			$this->__('Thank you for your help!')."</div>\r\n";
			$zmenu .= "		<ul id='wtw_feedbackthankyou' class='wtw-menuli wtw-hide'>\r\n";
			$zmenu .= "			<li class='wtw-submenublockli'>\r\n";
			$zmenu .= "				<div class='wtw-menusubtext'>\r\n";
			$zmenu .= 					$this->__('Thank You')."<br />\r\n";
			$zmenu .= "					<div class='wtw-menunote'>Thank you for providing feedback!</div>\r\n";
			$zmenu .= "				</div>\r\n";
			$zmenu .= "			</li>\r\n";
			$zmenu .= "		</ul>\r\n";
			$zmenu .= "		<ul id='wtw_feedbackform' class='wtw-menuli'>\r\n";
			$zmenu .= "			<li class='wtw-submenublockli'>\r\n";
			$zmenu .= "				<div class='wtw-menusubtext'>\r\n";
			$zmenu .= 					$this->__('Type of Feedback:')."<br />\r\n";
			$zmenu .= "					<select id='wtw_feedbacktype' class='wtw-pointer'>\r\n";
			$zmenu .= "						<option value='Feedback'>Feedback (constructive please)</option>\r\n";
			$zmenu .= "						<option value='Suggestion'>Helpful Suggestion</option>\r\n";
			$zmenu .= "						<option value='Request'>Feature Request or Enhancement</option>\r\n";
			$zmenu .= "						<option value='Help'>Coding Help or Question</option>\r\n";
			$zmenu .= "						<option value='Issue'>Report an Issue or Bug</option>\r\n";
			$zmenu .= "					</select><br />\r\n";
			$zmenu .= 					$this->__('Category:')."<br />\r\n";
			$zmenu .= "					<select id='wtw_feedbackcategory' class='wtw-pointer'>\r\n";
			$zmenu .= "						<option value='general'>General</option>\r\n";
			$zmenu .= "						<option value='avatars'>3D Avatars</option>\r\n";
			$zmenu .= "						<option value='community'>3D Community Scenes</option>\r\n";
			$zmenu .= "						<option value='building'>3D Buildings</option>\r\n";
			$zmenu .= "						<option value='store'>3D Building Stores</option>\r\n";
			$zmenu .= "						<option value='thing'>3D Things</option>\r\n";
			$zmenu .= "						<option value='model'>3D Models</option>\r\n";
			$zmenu .= "						<option value='graphics'>Graphics or Textures</option>\r\n";
			$zmenu .= "						<option value='animation'>Animation</option>\r\n";
			$zmenu .= "						<option value='sound'>Sound</option>\r\n";
			$zmenu .= "						<option value='multiplayer'>Multiplayer</option>\r\n";
			$zmenu .= "						<option value='chat'>Chat</option>\r\n";
			$zmenu .= "						<option value='plugins'>3D Plugins</option>\r\n";
			$zmenu .= "						<option value='other'>Other</option>\r\n";
			$zmenu .= "					</select><br />\r\n";
			$zmenu .= 					$this->__('Subject:')."<br />\r\n";
			$zmenu .= "						<input type='text' id='wtw_feedbacksubject' maxlength='255' onclick=\"WTW.checkKey(this, 'displayname', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'displayname', 0, 0);\" onblur=\"WTW.checkKey(this, 'displayname', 0, 1);\" /><br />\r\n";
			$zmenu .= 					$this->__('Message:')."<br />\r\n";
			$zmenu .= "					<textarea id='wtw_feedbackmessage' rows='8' cols='30'></textarea><br />\r\n";
			$zmenu .= "				</div>\r\n";
			$zmenu .= "			</li>\r\n";
			$zmenu .= "			<li class='wtw-submenublockli'>\r\n";
			$zmenu .= "				<div class='wtw-menusubtext'>\r\n";
			$zmenu .= 					$this->__('Snapshot:')."<br />\r\n";
			$zmenu .= "					<div class='wtw-menunote'>Position the view to show the subject of your feedback, then click <b>Take Snapshot</b>. If needed, you can retake the snapshot until you get the desired results.</div>\r\n";
			$zmenu .= "					<img id='wtw_feedbacksnapshot' class='wtw-snapshot90p wtw-hide' /><br />\r\n";
			$zmenu .= "					<div id='wtw_feedbacksnapshotbutton' class='wtw-feedbackbutton' onclick='WTW.feedbackSnapshot();'>Take Snapshot</div>\r\n";
			$zmenu .= "				</div>\r\n";
			$zmenu .= "			</li>\r\n";
			$zmenu .= "			<li class='wtw-submenublockli'>\r\n";
			$zmenu .= "				<div class='wtw-menusubtext'>\r\n";
			$zmenu .= 					$this->__('Contact Information:')."<br />\r\n";
			$zmenu .= "					<div class='wtw-menunote'>Optional, if you would like a response.</div>\r\n";
			$zmenu .= 					$this->__('Name:')."<br />\r\n";
			$zmenu .= "						<input type='text' id='wtw_feedbackname' maxlength='255' onclick=\"WTW.checkKey(this, 'displayname', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'displayname', 0, 0);\" onblur=\"WTW.checkKey(this, 'displayname', 0, 1);\" /><br />\r\n";
			$zmenu .= 					$this->__('Email:')."<br />\r\n";
			$zmenu .= "						<input type='text' id='wtw_feedbackemail' maxlength='255' onclick=\"WTW.checkKey(this, 'email', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'email', 0, 0);\" onblur=\"WTW.checkKey(this, 'email', 0, 1);\" /><br />\r\n";
			$zmenu .= "				</div>\r\n";
			$zmenu .= "			</li>\r\n";
			$zmenu .= "			<li class='wtw-submenublockli' onclick='WTW.feedbackSubmit();'>\r\n";
			$zmenu .= "				<div class='wtw-menusubtext'>\r\n";
			$zmenu .= "					<div id='wtw_feedbacksubmitbutton' class='wtw-feedbackbutton'>Submit Feedback</div>\r\n";
			$zmenu .= "				</div>\r\n";
			$zmenu .= "			</li>\r\n";
			$zmenu .= "		</ul>\r\n";
			$zmenu .= "	</div>\r\n";
			$zmenu .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getFeedbackMenu=".$e->getMessage());
		}
		return $zmenu;
	}
	
	public function getCookiesMenu() {
		global $wtwdb;
		$zmenu = "";
		try {
			$zmenu .= "<div id='wtw_menucookies' class='wtw-slideupmenuright wtw-hide'>\r\n";
			$zmenu .= "	<img class='wtw-closeright' onclick='WTW.closeMenus();' src='/content/system/images/menuclose.png' alt=\"".$this->__('Close')."\" title=\"".$this->__('Close')."\" onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
			$zmenu .= "	<div class='wtw-menuheading'>".$this->__('Allow Cookies')."</div>\r\n";
			$zmenu .= "	<div id='wtw_menucookiesscroll' class='wtw-mainmenuscrollmin'>\r\n";
			$zmenu .= "		<div id='wtw_cookies' class='wtw-menunote'>Cookies can be used to store your user settings and preferences including selected avatar, avatar speed, and login. Without cookies you will need to set these settings each time you visit this site.<br /><br />Please select:<br />\r\n";
			$zmenu .= "			<ul class='wtw-menuli'>\r\n";
			$zmenu .= "				<li class='wtw-submenublockli' onclick='WTW.saveAllowCookies(true);'>\r\n";
			$zmenu .= "					<div class='wtw-menusubtext'>\r\n";
			$zmenu .= "						<div class='wtw-feedbackbutton'>Allow Cookies</div>\r\n";
			$zmenu .= "					</div>\r\n";
			$zmenu .= "				</li>\r\n";
			$zmenu .= "				<li class='wtw-submenublockli' onclick='WTW.saveAllowCookies(false);'>\r\n";
			$zmenu .= "					<div class='wtw-menusubtext'>\r\n";
			$zmenu .= "						<div class='wtw-feedbackbutton'>Deny Cookies</div>\r\n";
			$zmenu .= "					</div>\r\n";
			$zmenu .= "				</li>\r\n";
			$zmenu .= "			</ul>\r\n";
			$zmenu .= "		</div>\r\n";
			$zmenu .= "	</div>\r\n";
			$zmenu .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwmenus.php-getCookiesMenu=".$e->getMessage());
		}
		return $zmenu;
	}
}

	function wtwmenus() {
		return wtwmenus::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwmenus'] = wtwmenus();	

?>
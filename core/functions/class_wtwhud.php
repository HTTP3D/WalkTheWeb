<?php
class wtwhud {
	/* wtwhud class for admin database functions for avatars */
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

	public function getHudMenu($zmenuset) {
		/* gets the dynamically created menus for HUD */
		global $wtwhandlers;
		$zmenu = array();
		try {
			$zuserid = "";
			if ($wtwhandlers->hasValue($_SESSION["wtw_userid"])) {
				$zuserid = $_SESSION["wtw_userid"];
			}
			$zresults = $wtwhandlers->query("
				select * 
				from ".wtw_tableprefix."menuitems 
				where menuset='".$zmenuset."' 
					and deleted=0 
				order by menuorder, menutext, menuitemid;");
			$i = 0;
			foreach($zresults as $zrow) {
				$zmenu[$i] = array (
					'menuitemid' => $zrow["menuitemid"],
					'menuitemname' => $zrow["menuitemname"],
					'menutext' => $zrow["menutext"],
					'menuset' => $zrow["menuset"],
					'menualignment' => $zrow["menualignment"],
					'menuorder' => $zrow["menuorder"],
					'menulevel' => $zrow["menulevel"],
					'menuicon' => $zrow["menuicon"],
					'menuaction' => $zrow["menuaction"],
					'menuproperty' => $zrow["menuproperty"],
					'menusecurity' => $zrow["menusecurity"]
				);
				$i += 1;
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwhud.php-getHudMenu=".$e->getMessage());
		}
		return $zmenu;
	}

	public function getHudMenuItem($zmenuitemid) {
		/* gets the dynamically created menus for HUD */
		global $wtwhandlers;
		$zmenu = array();
		try {
			if (isset($zmenuitemid)) {
				if (is_numeric($zmenuitemid)) {
					$zuserid = "";
					if ($wtwhandlers->hasValue($_SESSION["wtw_userid"])) {
						$zuserid = $_SESSION["wtw_userid"];
					}
					$zresults = $wtwhandlers->query("
						select * 
						from ".wtw_tableprefix."menuitems 
						where menuitemid=".$zmenuitemid."
							and deleted=0 
						limit 1;");
					$i = 0;
					foreach($zresults as $zrow) {
						$zmenu[$i] = array (
							'menuitemid' => $zrow["menuitemid"],
							'menuitemname' => $zrow["menuitemname"],
							'menutext' => $zrow["menutext"],
							'menuset' => $zrow["menuset"],
							'menualignment' => $zrow["menualignment"],
							'menuorder' => $zrow["menuorder"],
							'menulevel' => $zrow["menulevel"],
							'menuicon' => $zrow["menuicon"],
							'menuaction' => $zrow["menuaction"],
							'menuproperty' => $zrow["menuproperty"],
							'menusecurity' => $zrow["menusecurity"]
						);
						$i += 1;
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwhud.php-getHudMenuItem=".$e->getMessage());
		}
		return $zmenu;
	}


}

	function wtwhud() {
		return wtwhud::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwhud'] = wtwhud();
?>
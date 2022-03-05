<?php
class wtw_3dinternet_functions {
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
			$this->initClass();
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_functions.php-construct=".$e->getMessage());
		}
	}	
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	public function defineConstants() {
		global $wtwplugins;
		try {
			if (!defined('WTW_3DINTERNET_FILE')) {
				$this->define('WTW_3DINTERNET_PREFIX', wtw_tableprefix."3dinternet_");
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_plugin.php-defineConstants=".$e->getMessage());
		}
	}

	public function initClass() {
		global $wtwplugins;
		try {
			
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_functions.php-initClass=".$e->getMessage());
		}
	}
	
	public function saveBan($zblockedinstanceid, $zinstanceid, $zuserid, $zbaninstanceid, $zbanuserid, $zbanuserip, $zbanuseravatarid, $zbanglobalavatarid, $zblockchat, $zbanuser) {
		global $wtwplugins;
		$zresponse = array(
			'serror'=>''
		);
		try {
			if (isset($zinstanceid) && !empty($zinstanceid) && isset($zbaninstanceid) && !empty($zbaninstanceid)) {
				$zpastblockchat = 0;
				$zpastbanuser = 0;
				if (!isset($zblockchat) || empty($zblockchat)) {
					$zblockchat = '0';
				} else {
					$zblockchat = '1';
				}
				if (!isset($zbanuser) || empty($zbanuser)) {
					$zbanuser = '0';
				} else {
					$zbanuser = '1';
				}
				if (empty($zblockedinstanceid)) {
					/* check for logged in users first */
					$zresults = $wtwplugins->query("
						select * 
						from ".WTW_3DINTERNET_PREFIX."blockedinstances
						where instanceid='".$zinstanceid."'
							and userid='".$wtwplugins->userid."'
							and baninstanceid='".$zbaninstanceid."'
							and banuserid='".$zbanuserid."'
							and deleted=0
						order by createdate desc, blockedinstanceid desc
						limit 1;");
					foreach ($zresults as $zrow) {
						$zblockedinstanceid = $zrow["blockedinstanceid"];
						$zpastblockchat = $zrow["blockchat"];
						$zpastbanuser = $zrow["banuser"];
					}
					if (!isset($zblockedinstanceid) || empty($zblockedinstanceid)) {
						/* check for any user instance if no logged in user found */
						$zresults = $wtwplugins->query("
							select * 
							from ".WTW_3DINTERNET_PREFIX."blockedinstances
							where instanceid='".$zinstanceid."'
								and baninstanceid='".$zbaninstanceid."'
							order by createdate desc, blockedinstanceid desc
							limit 1;");
						foreach ($zresults as $zrow) {
							$zblockedinstanceid = $zrow["blockedinstanceid"];
							$zpastblockchat = $zrow["blockchat"];
							$zpastbanuser = $zrow["banuser"];
						}
					}
					if (!isset($zblockedinstanceid) || empty($zblockedinstanceid)) {
						/* insert new ban record */
						$zblockedinstanceid = $wtwplugins->getRandomString(16,1);
						$wtwplugins->query("
							insert into ".WTW_3DINTERNET_PREFIX."blockedinstances
							   (blockedinstanceid,
							    instanceid,
								userid,
								baninstanceid,
								banuserid,
								banuserip,
								banuseravatarid,
								banglobalavatarid,
								blockchat,
								banuser,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							  values
							   ('".$zblockedinstanceid."',
							    '".$zinstanceid."',
								'".$zuserid."',
								'".$zbaninstanceid."',
								'".$zbanuserid."',
								'".$zbanuserip."',
								'".$zbanuseravatarid."',
								'".$zbanglobalavatarid."',
								".$zblockchat.",
								".$zbanuser.",
								now(),
								'".$wtwplugins->userid."',
								now(),
								'".$wtwplugins->userid."');
						");
					} else {
						/* update existing found ban record */
						if (empty($zblockchat) && empty($zbanuser)) {
							$wtwplugins->query("
								update ".WTW_3DINTERNET_PREFIX."blockedinstances
								set blockchat=".$zblockchat.",
									banuser=".$zbanuser.",
									updatedate=now(),
									updateuserid='".$wtwplugins->userid."',
									deleteddate=now(),
									deleteduserid='".$wtwplugins->userid."',
									deleted=1
								where blockedinstanceid='".$zblockedinstanceid."'
								limit 1;
							");
						} else {
							$wtwplugins->query("
								update ".WTW_3DINTERNET_PREFIX."blockedinstances
								set blockchat=".$zblockchat.",
									banuser=".$zbanuser.",
									updatedate=now(),
									updateuserid='".$wtwplugins->userid."',
									deleteddate=null,
									deleteduserid='',
									deleted=0
								where blockedinstanceid='".$zblockedinstanceid."'
								limit 1;
							");
						}
					}
				}
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-3dinternet:functions-class_functions.php-saveBan=".$e->getMessage());
			$zresponse = array(
				'serror'=>addslashes($e->getMessage())
			);
		}
		return $zresponse;
	}
	
}

	function wtw_3dinternet_functions() {
		return wtw_3dinternet_functions::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtw_3dinternet_functions'] = wtw_3dinternet_functions();

?>
<?php
class wtwapi {
	/* wtwapi class for admin database functions for api related functionality */
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

	public function getAPIKeys($zdeleted) {
		/* returns an array of apikeys and any error message */
		/* $zdeleted = 0 will return Active API Keys */
		/* $zdeleted = 1 will return deleted API Keys */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'apikeys'=>array()
		);
		try {
			if (!isset($zdeleted)) {
				$zdeleted = 0;
			} else if ($zdeleted != 1) {
				$zdeleted = 0;
			}
			/* confirm still logged in */
			$wtwhandlers->getSessionUserID();
			/* confirm user has admin permission */
			if ($wtwhandlers->hasPermission(array("admin"))) {
				/* get the array of API Keys */
				$zresponse['apikeys'] = $this->getAPIKeysArray($zdeleted);
			} else {
				/* reply with permissions error */
				$zresponse['serror'] = 'Must have Admin access to read an API Key.';
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwapi.php-getAPIKeys=".$e->getMessage());
			$zresponse['serror'] = addslashes($e->getMessage());
		}
		return $zresponse;
	}

	public function getAPIKeysArray($zdeleted) {
		/* returns an array of apikeys */
		/* $zdeleted = 0 will return Active API Keys */
		/* $zdeleted = 1 will return deleted API Keys */
		global $wtwhandlers;
		$zapikeys = array();
		try {
			if (!isset($zdeleted)) {
				$zdeleted = 0;
			} else if ($zdeleted != 1) {
				$zdeleted = 0;
			}
			/* confirm still logged in */
			$wtwhandlers->getSessionUserID();
			/* confirm user has admin permission */
			if ($wtwhandlers->hasPermission(array("admin"))) {
				$i = 0;
				/* get the API Key records from the database */
				$zresults = $wtwhandlers->query("
					select * 
					from ".wtw_tableprefix."apikeys
					where deleted=".$zdeleted."
					order by appname,createdate desc, apikeyid;");
				foreach ($zresults as $zrow) {
					/* only display the last 7 characters of the WTW Key */
					$zkey = $zrow["wtwkey"];
					$zkey = $wtwhandlers->decode64($zkey);
					if ($wtwhandlers->hasValue($zkey)) {
						$zkey = "...".substr($zkey, -7);
					}
					/* format the JSON data response */
					$zapikeys[$i] = array(
						'apikeyid'=> $zrow["apikeyid"],
						'appid'=> $zrow["appid"],
						'appname'=> $zrow["appname"],
						'appurl'=> $zrow["appurl"],
						'wtwkey'=> $zkey,
						'approved'=> $zrow["approved"],
						'approveddate'=> $zrow["approveddate"],
						'approveduserid'=> $zrow["approveduserid"],
						'createdate'=> $zrow["createdate"],
						'createuserid'=> $zrow["createuserid"],
						'updatedate'=> $zrow["updatedate"],
						'updateuserid'=> $zrow["updateuserid"],
						'deleteddate'=> $zrow["deleteddate"],
						'deleteduserid'=> $zrow["deleteduserid"],
						'deleted'=> $zrow["deleted"]
					);
					$i += 1;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwapi.php-getAPIKeysArray=".$e->getMessage());
		}
		return $zapikeys;
	}
	
	public function getAPIKey($zapikeyid) {
		/* returns an array of the select apikey and any error message */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'apikeys'=>array()
		);
		try {
			/* confirm still logged in */
			$wtwhandlers->getSessionUserID();
			/* confirm user has admin permission */
			if ($wtwhandlers->hasPermission(array("admin"))) {
				$zapikeyid = $wtwhandlers->decode64($zapikeyid);
				if ($wtwhandlers->hasValue($zapikeyid)) {
					$zapikeys = array();
					$i = 0;
					/* get the API Key record from the database */
					$zresults = $wtwhandlers->query("
						select * 
						from ".wtw_tableprefix."apikeys
						where apikeyid='".$zapikeyid."'
						limit 1;");
					foreach ($zresults as $zrow) {
						/* only display the last 7 characters of the WTW Key */
						$zkey = $zrow["wtwkey"];
						$zkey = $wtwhandlers->decode64($zkey);
						if ($wtwhandlers->hasValue($zkey)) {
							$zkey = "...".substr($zkey, -7);
						}
						/* format the JSON data response */
						$zapikeys[$i] = array(
							'apikeyid'=> $zrow["apikeyid"],
							'appid'=> $zrow["appid"],
							'appname'=> $zrow["appname"],
							'appurl'=> $zrow["appurl"],
							'wtwkey'=> $zkey,
							'approved'=> $zrow["approved"],
							'approveddate'=> $zrow["approveddate"],
							'approveduserid'=> $zrow["approveduserid"],
							'createdate'=> $zrow["createdate"],
							'createuserid'=> $zrow["createuserid"],
							'updatedate'=> $zrow["updatedate"],
							'updateuserid'=> $zrow["updateuserid"],
							'deleteddate'=> $zrow["deleteddate"],
							'deleteduserid'=> $zrow["deleteduserid"],
							'deleted'=> $zrow["deleted"]
						);
						$i += 1;
					}
					/* get the array of API Keys */
					$zresponse['apikeys'] = $zapikeys;
				}
			} else {
				/* reply with permissions error */
				$zresponse['serror'] = 'Must have Admin access to read an API Key.';
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwapi.php-getAPIKey=".$e->getMessage());
			$zresponse['serror'] = addslashes($e->getMessage());
		}
		return $zresponse;
	}

	public function saveAPIKey($zapikeyid, $zappid, $zappname, $zappurl, $zwtwkey, $zwtwsecret) {
		/* saves an API Key (new or update) and returns an array of apikeys and any error message */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'apikeys'=> array()
		);
		try {
			/* confirm still logged in */
			$wtwhandlers->getSessionUserID();
			/* confirm user has admin permission */
			if ($wtwhandlers->hasPermission(array("admin"))) {
				/* decode values */
				$zapikeyid = $wtwhandlers->decode64($zapikeyid);
				$zappid = $wtwhandlers->decode64($zappid);
				$zappname = $wtwhandlers->decode64($zappname);
				$zappurl = $wtwhandlers->decode64($zappurl);
				$zwtwkey = $wtwhandlers->decode64($zwtwkey);
				$zwtwsecret = $wtwhandlers->decode64($zwtwsecret);

				/* Only save the WTW Secret as a hash password code */
				$options = ['cost' => 11];
				$zwtwsecrethash = password_hash($zwtwsecret, PASSWORD_DEFAULT, $options);
				
				if (!isset($zapikeyid) || empty($zapikeyid)) {
					$zapikeyid = $wtwhandlers->getRandomString(16,1);
					$zwtwkey = base64_encode($zwtwkey);

					/* Insert New API Key */
					$wtwhandlers->query("
						insert into ".wtw_tableprefix."apikeys
						   (apikeyid,
							appid,
							appname,
							appurl,
							wtwkey,
							wtwsecret,
							approved,
							approveddate,
							approveduserid,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						   values
						   ('".$zapikeyid."',
							'".$zappid."',
							'".$zappname."',
							'".$zappurl."',
							'".$zwtwkey."',
							'".$zwtwsecrethash."',
							1,
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."',
							now(),
							'".$wtwhandlers->userid."');");
				} else {
					/* update existing API Key description fields */
					/* if it was deleted, this will restore it */
					$zsql = "update ".wtw_tableprefix."apikeys
							set appid='".$zappid."',
								appname='".$zappname."',
								appurl='".$zappurl."',";
					/* allow it to reassigh a new API Key */
					if (strpos($zwtwkey,"ck_") !== false) {
						$zwtwkey = base64_encode($zwtwkey);
						$zsql .= "	wtwkey='".$zwtwkey."',
									wtwsecret='".$zwtwsecrethash."',";
					}
					$zsql .= "  approveddate=now(),
								approveduserid='".$wtwhandlers->userid."',
								approved=1,
								updatedate=now(),
								updateuserid='".$wtwhandlers->userid."',
								deleteddate=null,
								deleteduserid='',
								deleted=0
							where apikeyid='".$zapikeyid."';";	
					$wtwhandlers->query($zsql);
				}
				
				/* get the array of API Keys */
				$zresponse['apikeys'] = $this->getAPIKeysArray(0);
			} else {
				/* reply with permissions error */
				$zresponse['serror'] = 'Must have Admin access to save an API Key.';
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwapi.php-saveAPIKey=".$e->getMessage());
			$zresponse['serror'] = addslashes($e->getMessage());
		}
		return $zresponse;
	}

	public function approveAPIKey($zapikeyid, $zapproved) {
		/* approves or denies the API Key and returns an array of apikeys and any error message */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'apikeys'=>array()
		);
		try {
			/* confirm still logged in */
			$wtwhandlers->getSessionUserID();
			/* confirm user has admin permission */
			if ($wtwhandlers->hasPermission(array("admin"))) {
				$zapikeyid = $wtwhandlers->decode64($zapikeyid);
				
				if ($wtwhandlers->hasValue($zapikeyid)) {
					if ($zapproved != '1') {
						$zapproved = '0';
					}
					/* update the API Key and set approved */
					$zsql = "update ".wtw_tableprefix."apikeys
						set approved=".$zapproved.",
							approveddate=now(),
							approveduserid='".$wtwhandlers->userid."',
							createuserid='".$wtwhandlers->userid."',
							updateuserid='".$wtwhandlers->userid."',
							updatedate=now()";
					if ($zapproved == '0') {
						$zsql .= ",deleted=1,
							deleteddate=now(),
							deleteduserid='".$wtwhandlers->userid."'";
					}
					$zsql .= "where apikeyid='".$zapikeyid."'
						limit 1;";

					$wtwhandlers->query($zsql);
					
					/* get the array of API Keys */
					$zresponse['apikeys'] = $this->getAPIKeysArray(0);
				}
			} else {
				/* reply with permissions error */
				$zresponse['serror'] = 'Must have Admin access to delete an API Key.';
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwapi.php-approveAPIKey=".$e->getMessage());
			$zresponse['serror'] = addslashes($e->getMessage());
		}
		return $zresponse;
	}

	public function deleteAPIKey($zapikeyid) {
		/* flags an API Key as deleted and returns an array of apikeys and any error message */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>'',
			'apikeys'=>array()
		);
		try {
			/* confirm still logged in */
			$wtwhandlers->getSessionUserID();
			/* confirm user has admin permission */
			if ($wtwhandlers->hasPermission(array("admin"))) {
				$zapikeyid = $wtwhandlers->decode64($zapikeyid);
				
				if ($wtwhandlers->hasValue($zapikeyid)) {
					/* update the API Key and set deleted and approved to 0 (NOT Approved) */
					$wtwhandlers->query("
						update ".wtw_tableprefix."apikeys
							set approved=0,
								approveddate=now(),
								approveduserid='".$wtwhandlers->userid."',
								deleteddate=now(),
								deleteduserid='".$wtwhandlers->userid."',
								deleted=1
							where apikeyid='".$zapikeyid."';");					
					
					/* get the array of API Keys */
					$zresponse['apikeys'] = $this->getAPIKeysArray(0);
				}
			} else {
				/* reply with permissions error */
				$zresponse['serror'] = 'Must have Admin access to delete an API Key.';
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwapi.php-deleteAPIKey=".$e->getMessage());
			$zresponse['serror'] = addslashes($e->getMessage());
		}
		return $zresponse;
	}

}

	function wtwapi() {
		return wtwapi::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwapi'] = wtwapi();
?>
<?php
class wtwcoins_functions {
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
			$wtwplugins->serror("plugins:wtw-coins:functions-class_functions.php-construct=".$e->getMessage());
		}
	}	
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	public function initClass() {
		global $wtwplugins;
		try {
			
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-coins:functions-class_functions.php-initClass=".$e->getMessage());
		}
	}
	
	public function collectCoin($zwebid, $zactionzoneid, $zvalue1, $zuserid, $zglobaluserid, $zusertoken) {
		global $wtwplugins;
		$zresponse = array(
			'serror' => ''
		);
		try {
			/* make sure userid is not blank */
			if (!empty($zuserid) && isset($zuserid)) {
				/* make sure the userid passed is the same as the logged in session userid */
				if ($wtwplugins->userid == $zuserid) {
					$zvalidpoints = false;
					$zfoundcoin = false;
					$zfoundactionzoneid = false;

					$zresults = $wtwplugins->query("
						select a1.value1,
								a1.actionzoneid,
                                c1.wtwcoinid
						from ".wtw_tableprefix."actionzones a1
							left join ".WTW_COINS_PREFIX."collected c1
							on c1.actionzoneid=a1.actionzoneid
						where a1.actionzoneid='".$zactionzoneid."'
							and (c1.userid='".$zuserid."'
								or c1.userid is null)
							and (c1.webid='".$zwebid."'
								or c1.webid is null)
						limit 1;");
					/* validate the points against the action zone in the database */
					foreach ($zresults as $zrow) {
						if ((int)$zrow["value1"] == (int)$zvalue1) {
							$zvalidpoints = true;
						}
						if (isset($zrow["wtwcoinid"]) && !empty($zrow["wtwcoinid"])) {
							$zfoundcoin = true;
						}
						$zfoundactionzoneid = true;
					}
					/* point value matches the database */
					if ($zfoundactionzoneid && $zvalidpoints && $zfoundcoin == false) {
						$zwtwcoinid = $wtwplugins->getRandomString(16,1);

						$wtwplugins->query("
							insert into ".WTW_COINS_PREFIX."collected
							   (wtwcoinid,
							    webid,
							    actionzoneid,
								userid,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							   values
							   ('".$zwtwcoinid."',
							    '".$zwebid."',
							    '".$zactionzoneid."',
								'".$wtwplugins->userid."',
								now(),
								'".$wtwplugins->userid."',
								now(),
								'".$wtwplugins->userid."');");
						$this->addCoins($zvalue1, $zuserid);
						
						$this->collectCoinGlobal($zwebid, $zactionzoneid, $zvalue1, $zuserid, $zglobaluserid, $zusertoken);
					} else if ($zfoundactionzoneid == false || $zvalidpoints == false) {
						$zresponse = array(
							'serror' => 'Coin Not valid'
						);
					} else if ($zfoundcoin) {
						$zresponse = array(
							'serror' => 'Coin Already Collected'
						);
					}
				} else {
					$zresponse = array(
						'serror' => 'Userid Not valid'
					);
				}
			} else {
				$zresponse = array(
					'serror' => 'Userid Not valid'
				);
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-coins:functions-class_functions.php-collectCoin=".$e->getMessage());
		}
		return $zresponse;
	}
	
	private function collectCoinGlobal($zwebid, $zactionzoneid, $zvalue1, $zuserid, $zglobaluserid, $zusertoken) {
		/* send coin collected to global server */
		global $wtwplugins;
		$zresponse = array(
			'serror' => ''
		);
		try {
			/* only send coin collected to global server if you are logged in and have a valid token */
			/* it will validate the currently logged in account on the WalkTheWeb servers */
			if (!empty($zglobaluserid) && isset($zglobaluserid) && !empty($zusertoken) && isset($zusertoken)) {
				$zpostdata = http_build_query(array(
					'serverinstanceid' => $wtwplugins->serverinstanceid,
					'serverip' => $wtwplugins->serverip,
					'domainname' => $wtwplugins->domainname,
					'domainurl' => $wtwplugins->domainurl,
					'webid' => $zwebid,
					'actionzoneid' => $zactionzoneid,
					'userid' => $zuserid,
					'globaluserid' => base64_encode($zglobaluserid),
					'value1' => $zvalue1,
					'usertoken' => $zusertoken,
					'function' => 'collectcoin'
				));
				$zopts = array('http' => array(
						'method'  => 'POST',
						'header'  => 'Content-Type: application/x-www-form-urlencoded',
						'content' => $zpostdata
				));
				$zrequest  = stream_context_create($zopts);
				$zresponse = $wtwplugins->openFilefromURL('https://3dnet.walktheweb.com/connect/wtwcoins.php', false, $zrequest);
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-coins:functions-class_functions.php-collectCoinGlobal=".$e->getMessage());
		}
		return $zresponse;
	}
		
	public function addCoins($zvalue1, $zuserid) {
		global $wtwplugins;
		$zresponse = array(
			'serror' => ''
		);
		try {
			/* make sure userid is not blank */
			if (!empty($zuserid) && isset($zuserid)) {
				/* make sure the userid passed is the same as the logged in session userid */
				if ($wtwplugins->userid == $zuserid) {
					$zcointotalid = '';
					$ztotalcoins = 0;
					if (is_numeric($zvalue1) == false) {
						$zvalue1 = 0;
					}
					/* look up last total for user */
					$zresults = $wtwplugins->query("
						select cointotalid,
							totalcoins
						from ".WTW_COINS_PREFIX."totals
						where userid='".$zuserid."'
						limit 1;");
					/* validate the points against the action zone in the database */
					foreach ($zresults as $zrow) {
						$zcointotalid = $zrow["cointotalid"];
						$ztotalcoins = (int)$zrow["totalcoins"];
					}
					/* point value matches the database */
					if (empty($zcointotalid) || !isset($zcointotalid)) {
						$zcointotalid = $wtwplugins->getRandomString(16,1);
						$ztotalcoins = $zvalue1;
						
						$wtwplugins->query("
							insert into ".WTW_COINS_PREFIX."totals
							   (cointotalid,
								userid,
							    totalcoins,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							   values
							   ('".$zcointotalid."',
								'".$wtwplugins->userid."',
							    ".$ztotalcoins.",
								now(),
								'".$wtwplugins->userid."',
								now(),
								'".$wtwplugins->userid."');");
					} else {
						$ztotalcoins += $zvalue1;
						$wtwplugins->query("
							update ".WTW_COINS_PREFIX."totals
							set totalcoins=".$ztotalcoins.",
								updatedate=now(),
								updateuserid='".$wtwplugins->userid."'
							where cointotalid='".$zcointotalid."'
								and userid='".$wtwplugins->userid."'
							limit 1;");
					}
				} else {
					$zresponse = array(
						'serror' => 'Userid Not valid'
					);
				}
			} else {
				$zresponse = array(
					'serror' => 'Userid Not valid'
				);
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-coins:functions-class_functions.php-addCoins=".$e->getMessage());
		}
		return $zresponse;
	}
	
	public function getCoinTotals($zuserid) {
		global $wtwplugins;
		$zresponse = array(
			'totalcoins' => 0
		);
		try {
			/* make sure userid is not blank */
			if (!empty($zuserid) && isset($zuserid)) {
				/* make sure the userid passed is the same as the logged in session userid */
				if ($wtwplugins->userid == $zuserid) {
					$zresults = $wtwplugins->query("
						select totalcoins
						from ".WTW_COINS_PREFIX."totals
						where userid='".$wtwplugins->userid."'
							and deleted=0
						limit 1;");
					foreach ($zresults as $zrow) {
						$zresponse = array(
							'totalcoins' => $zrow["totalcoins"]
						);
					}
				}
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-coins:functions-class_functions.php-getCoinTotals=".$e->getMessage());
		}
		return $zresponse;
	}
	
	public function checkCoin($zwebid, $zactionzoneid, $zuserid) {
		global $wtwplugins;
		$zresponse = array(
			'wtwcoinid' => ''
		);
		try {
			/* make sure userid is not blank */
			if (!empty($zuserid) && isset($zuserid)) {
				/* make sure the userid passed is the same as the logged in session userid */
				if ($wtwplugins->userid == $zuserid) {
					$zresults = $wtwplugins->query("
						select wtwcoinid
						from ".WTW_COINS_PREFIX."collected
						where userid='".$wtwplugins->userid."'
							and webid='".$zwebid."'
							and actionzoneid='".$zactionzoneid."'
						limit 1;");
					foreach ($zresults as $zrow) {
						$zresponse = array(
							'wtwcoinid' => $zrow["wtwcoinid"]
						);
					}
				}
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-coins:functions-class_functions.php-checkCoin=".$e->getMessage());
		}
		return $zresponse;
	}	
	
}

	function wtwcoins_functions() {
		return wtwcoins_functions::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwcoins_functions'] = wtwcoins_functions();

?>
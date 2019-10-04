<?php
require_once('../../config/wtw_config.php');
require_once('../core/functions/class_wtwdb.php');
require_once('../core/functions/class_wtwuser.php');
class wtwconnect {
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
	public $userip = "";
	public $uri = "";

	public function getClientIP(){
		$clientip = "";
		try {
			if (array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER)){
				$clientip =  $_SERVER["HTTP_X_FORWARDED_FOR"];  
			}else if (array_key_exists('REMOTE_ADDR', $_SERVER)) { 
				$clientip = $_SERVER["REMOTE_ADDR"]; 
			}else if (array_key_exists('HTTP_CLIENT_IP', $_SERVER)) {
				$clientip = $_SERVER["HTTP_CLIENT_IP"]; 
			} 
		} catch (Exception $e) {}
		return $clientip; 
	}	

	public function initClass() {
		try {
			set_error_handler (
				function($errno, $errstr, $errfile, $errline) {
					throw new ErrorException($errstr, $errno, 0, $errfile, $errline);     
				}
			);
			register_shutdown_function('shutdownOnErrorConnect');
			global $wtwuser;
			if (defined('wtw_defaultdomain')) {
				$this->domainname = wtw_defaultdomain;
			}
			if (isset($_SERVER['HTTP_HOST']) && !empty($_SERVER['HTTP_HOST'])) {
				$this->domainname = strtolower($_SERVER['HTTP_HOST']);
			}
			$this->protocol = "http://";
			if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && isset($_SERVER['HTTP_X_FORWARDED_PROTO'])) {
				if ($_SERVER['HTTP_X_FORWARDED_PROTO'] == "https") {
					$this->domainurl = "https://".$this->domainname;
					$this->protocol = "https://";
					$_SERVER['HTTPS']='on';
				} else {
					$this->domainurl = "http://".$this->domainname;
				}
			} else if (empty($_SERVER['HTTPS']) || !isset($_SERVER['HTTPS'])){
				$this->domainurl = "http://".$this->domainname;
			} else if ($_SERVER['HTTPS'] == "off") {
				$this->domainurl = "http://".$this->domainname;
			} else {
				$this->domainurl = "https://".$this->domainname;
				$this->protocol = "https://";
				$_SERVER['HTTPS']='on';
			}
			if (isset($_SERVER['PHP_SELF']) && !empty($_SERVER['PHP_SELF'])) {
				$this->pagename = strtolower(basename($_SERVER['PHP_SELF']));
			} else {
				$this->pagename = "index.php";
			}
			if (isset($_SERVER['REQUEST_URI']) && !empty($_SERVER['REQUEST_URI'])) {
				$this->uri = trim(strtolower($_SERVER['REQUEST_URI']));
			}
			$this->rootpath = str_replace('\core\functions','',dirname(__FILE__));
			if (defined('wtw_contentpath')) {
				$this->contentpath = wtw_contentpath;
			} else {
				$this->contentpath = $this->rootpath."\\content";
			}
			if (defined('wtw_contenturl')) {
				$this->contenturl = wtw_contenturl;
			} else {
				$this->contenturl = $this->domainurl."/content";
			}
			$zuserip = "";
			try {
				$zuserip = $this->getClientIP();
			} catch (Exception $e) {
			}
			if (!empty($zuserip) && isset($zuserip)) {
				$this->userip = $zuserip;
				$wtwuser->userip = $zuserip;
			}
			if (!empty($_SESSION["wtw_userid"]) && isset($_SESSION["wtw_userid"])) {
				$zuserid = $_SESSION["wtw_userid"];
				if ($this->userExists($zuserid)) {
					$this->userid = $zuserid;
					$wtwuser->userid = $zuserid;
				}
			}
			if (defined('wtw_serverinstanceid')) {
				$this->serverinstanceid = wtw_serverinstanceid;
			}
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwconnect.php-initClass=" . $e->getMessage());
		}
	}
	
	public function serror($message) {
		global $wtwdb;
		$wtwdb->serror($message);
	}
	
	public function query($sql) {
		global $wtwdb;
		return $wtwdb->query($sql);
	}

	public function getRandomString($length,$stringtype) {
		global $wtwdb;
		return $wtwdb->getRandomString($length,$stringtype);
	}

	public function tableExists($tablename) {
		global $wtwdb;
		return $wtwdb->tableExists($tablename);
	}

	public function keyExists($tablename, $zfieldid, $zkeyid) {
		global $wtwdb;
		return $wtwdb->keyExists($tablename, $zfieldid, $zkeyid);
	}

	public function userExists($zuserid) {
		global $wtwdb;
		return $wtwdb->userExists($zuserid);
	}

	public function getSessionUserID() {
		global $wtwdb;
		try {
			$this->userid = $wtwdb->getSessionUserID();
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtwconnect.php-getSessionUserID=" . $e->getMessage());
		}
		return $this->userid;
	}
	
	public function isUserInRole($zrole) {
		global $wtwdb;
		return $wtwdb->isUserInRole($zrole);
	}
	
	public function getUserRoles($zuserid = '') {
		/* defaults to current user unless called with admin role access */
		global $wtwdb;
		return $wtwdb->getUserRoles($zuserid);
	}
	
	public function hasPermission($zaccessrequired) {
		/* array of access required will be compared to array of current user roles */
		global $wtwdb;
		return $wtwdb->hasPermission($zaccessrequired);
	}
	
	public function checkUpdateAccess($zcommunityid, $zbuildingid, $zthingid) {
		global $wtwdb;
		return $wtwdb->checkUpdateAccess($zcommunityid, $zbuildingid, $zthingid);
	}

	public function checkAdminAccess($zcommunityid, $zbuildingid, $zthingid) {
		global $wtwdb;
		return $wtwdb->checkAdminAccess($zcommunityid, $zbuildingid, $zthingid);
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

	public function getVal($key, $defaultval) {
		global $wtwdb;
		return $wtwdb->getVal($key, $defaultval);
	}

	public function getNumber($key, $defaultval) {
		global $wtwdb;
		return $wtwdb->getNumber($key, $defaultval);
	}

	public function checkIDFormat($zid) {
		global $wtwdb;
		return $wtwdb->checkIDFormat($zid);
	}

	public function checkNumber($val, $defaultval) {
		global $wtwdb;
		return $wtwdb->checkNumber($val, $defaultval);
	}

	public function checkAlphaNumeric($zid) {
		global $wtwdb;
		return $wtwdb->checkAlphaNumeric($zid);
	}

	public function checkFolderPath($zurl) {
		global $wtwdb;
		return $wtwdb->checkFolderPath($zurl);
	}

	public function checkFileName($zid) {
		global $wtwdb;
		return $wtwdb->checkFileName($zid);
	}

	public function checkFunctionName($zid) {
		global $wtwdb;
		return $wtwdb->checkFunctionName($zid);
	}

	public function checkPublishName($zdomainname, $zwebtype, $zpublishname) {
		global $wtwdb;
		return $wtwdb->checkPublishName($zdomainname, $zwebtype, $zpublishname);
	}

	public function prepCheckDate($zdate) {
		/* returns either 'dateformatted' or NULL - ready to be used in SQL */
		global $wtwdb;
		return $wtwdb->prepCheckDate($zdate);
	}

	public function escapeHTML($text) {
		global $wtwdb;
		return $wtwdb->escapeHTML($text);
	}

	public function confirmKey($zkey, $zmoldgroup, $zwebid) {
		global $wtwdb;
		return $wtwdb->confirmKey($zkey, $zmoldgroup, $zwebid);
	}

	public function getWebAliases($zmoldgroup, $zwebid) {
		global $wtwdb;
		$zdomains = array();
		try {
			$ztablename = "";
			switch ($zmoldgroup) {
				case "community":
					$ztablename = "communities";
					break;
				case "building":
					$ztablename = "buildings";
					break;
				case "thing":
					$ztablename = "things";
					break;
			}
			if (!empty($zwebid) && isset($zwebid) && !empty($ztablename) && isset($ztablename)) {
				$i = 0;
				/* get web alias (domain names) for a community */
				$zresults = $wtwdb->query("
					select w1.*,
						t1.analyticsid
					from ".wtw_tableprefix."webaliases w1
						left join ".wtw_tableprefix.$ztablename." t1
							on w1.".$zmoldgroup."id=t1.".$zmoldgroup."id
					where w1.".$zmoldgroup."id='".$zwebid."'
					   and w1.deleted=0
					order by w1.domainname, w1.webaliasid;");
				foreach ($zresults as $zrow) {
					$zdomains[$i]  = array(
						'domainname' => $zrow["domainname"],
						'analyticsid'=> $zrow["analyticsid"]
					); 
					$i += 1;
				}
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwconnect.php-getWebAliases=".$e->getMessage());
		}
		return $zdomains;
	}

	public function getobjectanimations($zuploadobjectid) {
		global $wtwdb;
		$zobjectanimations = array();
		try {
			$zresults = $wtwdb->query("
			    select a1.*,
					case when a1.soundid = '' then ''
						else
							(select filepath 
								from ".wtw_tableprefix."uploads 
								where uploadid=a1.soundid limit 1)
						end as soundpath,
					case when a1.moldevent='onload' then '2'
						when a1.moldevent='' then '0'
						else '1'
					end as sorder
				from ".wtw_tableprefix."uploadobjectanimations a1
				where a1.uploadobjectid='".$zuploadobjectid."'
					and a1.deleted=0
				order by sorder, a1.moldevent, a1.animationname, a1.objectanimationid;");
			$i = 0;
			foreach ($zresults as $zrow) {
				$zobjectanimations[$i] = array(
					'objectanimationid'=> $zrow['objectanimationid'],
					'animationname'=> $zrow['animationname'],
					'moldevent'=> $zrow['moldevent'],
					'moldnamepart'=> $zrow['moldnamepart'],
					'startframe'=> $zrow['startframe'],
					'endframe'=> $zrow['endframe'],
					'animationloop'=> $zrow['animationloop'],
					'speedratio'=> $zrow['speedratio'],
					'additionalscript'=> $zrow['additionalscript'],
					'additionalparameters'=> $zrow['additionalparameters'],
					'animationendscript'=> $zrow['animationendscript'],
					'animationendparameters'=> $zrow['animationendparameters'],
					'stopcurrentanimations'=> $zrow['stopcurrentanimations'],
					'soundid'=> $zrow['soundid'],
					'soundpath'=> $zrow['soundpath'],
					'soundmaxdistance'=> $zrow['soundmaxdistance']
				);
				$i += 1;
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwconnect.php-getobjectanimations=".$e->getMessage());
		}
		return $zobjectanimations;
	}

	public function getwebimages($zthingmoldid, $zbuildingmoldid, $zcommunitymoldid, $zgraphiclevel) {
		global $wtwdb;
		$webimages = array();
		try {
			if (empty($zgraphiclevel) || !isset($zgraphiclevel)) {
				$zgraphiclevel = -1;
			} elseif (is_numeric($zgraphiclevel) == false) {
				$zgraphiclevel = -1;
			}
			$webimages[0] = array(
				'imageid'=> '',
				'imagepath'=> '',
				'imagehoverid'=> '',
				'imagehoverpath'=> '',
				'imageclickid'=> '',
				'imageclickpath'=> '',
				'jsfunction'=> '',
				'jsparameters'=> '',
				'imageloaded'=> '0',
				'hoverloaded'=> '0',
				'clickloaded'=> '0'
			);
			$zresults = $wtwdb->query("
				select a1.webimageid,
					a1.pastwebimageid,
					a1.thingmoldid,
					a1.buildingmoldid,
					a1.communitymoldid,
					a1.imageindex,
					a1.graphiclevel,
					a1.jsfunction,
					a1.jsparameters,
					a1.userid,
					a1.alttag,
					a1.createdate,
					a1.createuserid,
					a1.updatedate,
					a1.updateuserid,
					a1.deleteddate,
					a1.deleteduserid,
					a1.deleted,
					case when not a1.thingmoldid='' then
							case when a1.imageid = '' then ''
								else
									case when (t1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageid limit 1)
									end 
								end
						when not a1.buildingmoldid='' then
							case when a1.imageid = '' then ''
								else
									case when (b1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageid limit 1)
									end 
								end
						when not a1.communitymoldid='' then
							case when a1.imageid = '' then ''
								else
									case when (c1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageid limit 1)
									end 
								end
						else ''
					end as imageid,
					case when not a1.thingmoldid='' then
							case when a1.imageid = '' then ''
								else
									case when (t1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imageid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imageid limit 1)
									end 
								end
						when not a1.buildingmoldid='' then
							case when a1.imageid = '' then ''
								else
									case when (b1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imageid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imageid limit 1)
									end 
								end
						when not a1.communitymoldid='' then
							case when a1.imageid = '' then ''
								else
									case when (c1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imageid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imageid limit 1)
									end 
								end
						else ''
					end as imagepath,

					case when not a1.thingmoldid='' then
							case when a1.imagehoverid = '' then ''
								else
									case when (t1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imagehoverid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imagehoverid limit 1)
									end 
								end
						when not a1.buildingmoldid='' then
							case when a1.imagehoverid = '' then ''
								else
									case when (b1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imagehoverid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imagehoverid limit 1)
									end 
								end
						when not a1.communitymoldid='' then
							case when a1.imagehoverid = '' then ''
								else
									case when (c1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imagehoverid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imagehoverid limit 1)
									end 
								end
						else ''
					end as imagehoverid,
					case when not a1.thingmoldid='' then
							case when a1.imagehoverid = '' then ''
								else
									case when (t1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imagehoverid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imagehoverid limit 1)
									end 
								end
						when not a1.buildingmoldid='' then
							case when a1.imagehoverid = '' then ''
								else
									case when (b1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imagehoverid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imagehoverid limit 1)
									end 
								end
						when not a1.communitymoldid='' then
							case when a1.imagehoverid = '' then ''
								else
									case when (c1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imagehoverid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imagehoverid limit 1)
									end 
								end
						else ''
					end as imagehoverpath,

					case when not a1.thingmoldid='' then
							case when a1.imageclickid = '' then ''
								else
									case when (t1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageclickid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageclickid limit 1)
									end 
								end
						when not a1.buildingmoldid='' then
							case when a1.imageclickid = '' then ''
								else
									case when (b1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageclickid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageclickid limit 1)
									end 
								end
						when not a1.communitymoldid='' then
							case when a1.imageclickid = '' then ''
								else
									case when (c1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select originalid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageclickid limit 1)
										else (select websizeid 
												from ".wtw_tableprefix."uploads 
												where uploadid=a1.imageclickid limit 1)
									end 
								end
						else ''
					end as imageclickid,
					case when not a1.thingmoldid='' then
							case when a1.imageclickid = '' then ''
								else
									case when (t1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imageclickid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imageclickid limit 1)
									end 
								end
						when not a1.buildingmoldid='' then
							case when a1.imageclickid = '' then ''
								else
									case when (b1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imageclickid limit 1)
										else (select u1.filepath 
												from ".wtw_tableprefix."uploads u2 
													left join ".wtw_tableprefix."uploads u1 
														on u2.websizeid=u1.uploadid 
												where u2.uploadid=a1.imageclickid limit 1)
									end 
								end
						when not a1.communitymoldid='' then
							case when a1.imageclickid = '' then ''
								else
									case when (c1.graphiclevel = '1' and not '".$zgraphiclevel."' = '0') or '".$zgraphiclevel."' = '1' then 
											(select u1.filepath 
												from ".wtw_tableprefix."uploads u2
													left join ".wtw_tableprefix."uploads u1 
														on u2.originalid=u1.uploadid 
												where u2.uploadid=a1.imageclickid limit 1)
										else (select u1.filepath 
											from ".wtw_tableprefix."uploads u2 
												left join ".wtw_tableprefix."uploads u1 
													on u2.websizeid=u1.uploadid 
											where u2.uploadid=a1.imageclickid limit 1)
									end 
								end
						else ''
					end as imageclickpath
				from ".wtw_tableprefix."webimages a1 
					left join ".wtw_tableprefix."thingmolds t1 
						on a1.thingmoldid=t1.thingmoldid
					left join ".wtw_tableprefix."buildingmolds b1 
						on a1.buildingmoldid=b1.buildingmoldid
					left join ".wtw_tableprefix."communitymolds c1 
						on a1.communitymoldid=c1.communitymoldid
				where a1.thingmoldid='".$zthingmoldid."'
					and a1.buildingmoldid='".$zbuildingmoldid."'
					and a1.communitymoldid='".$zcommunitymoldid."'
					and a1.deleted=0
				order by a1.imageindex, a1.webimageid desc;");
			
			$i = 0;
			foreach ($zresults as $zrow) {
				$webimages[$i] = array(
					'imageid'=> $zrow["imageid"],
					'imagepath'=> $zrow["imagepath"],
					'imagehoverid'=> $zrow["imagehoverid"],
					'imagehoverpath'=> $zrow["imagehoverpath"],
					'imageclickid'=> $zrow["imageclickid"],
					'imageclickpath'=> $zrow["imageclickpath"],
					'jsfunction'=> $zrow["jsfunction"],
					'jsparameters'=> $zrow["jsparameters"],
					'imageloaded'=> '0',
					'hoverloaded'=> '0',
					'clickloaded'=> '0'
				);
				$i += 1;
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwconnect.php-getwebimages=".$e->getMessage());
		}
		return $webimages;
	}

	public function getmoldpoints($zthingmoldid, $zbuildingmoldid, $zcommunitymoldid, $zpathnumber, $zshape) {
		global $wtwdb;
		$pathpoints = array();
		$zmoldid = "";
		try {
			if ($zshape == 'tube') {
				if(!empty($zcommunitymoldid)) {
					$zmoldid = $zcommunitymoldid;
				} else if(!empty($zbuildingmoldid)) {
					$zmoldid = $zbuildingmoldid;
				} else if(!empty($zthingmoldid)) {
					$zmoldid = $zthingmoldid;
				}
				/* get point data for a given mold (lines, ribbons, lathe, etc...) */
				$zresults = $wtwdb->query("
					select * 
					from ".wtw_tableprefix."moldpoints
					where moldid='".$zmoldid."'
						and pathnumber=".$this->checkNumber($pathnumber,1)."
						and deleted=0
					order by sorder,createdate;");

				$i = 0;
				foreach ($zresults as $zrow) {
					$pathpoints[$i] = array(
						'x'=> $zrow["positionx"],
						'y'=> $zrow["positiony"],
						'z'=> $zrow["positionz"],
						'sorder'=> $zrow["sorder"]
					);
					$i += 1;
				}
				if ($i == 0) {
					$pathpoints[0] = null;
				}
			} else {
				$pathpoints[0] = null;
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwconnect.php-getmoldpoints=".$e->getMessage());
		}
		return $pathpoints;
	}
	
	public function addConnectHeader($zavailabledomains) {
		$zheader = "";
		try {
			$zheader .= header('Access-Control-Allow-Origin: '.$zavailabledomains);
			$zheader .= header('Content-type: application/json');
			$zheader .= header('Access-Control-Allow-Methods: GET');
			$zheader .= header('Access-Control-Request-Headers: Content-Type');
			//$zheader .= header('Content-type: application/json; charset=iso-8859-1');
			//$zheader .= header('Content-Language: en');
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwconnect.php-addConnectHeader=".$e->getMessage());
		}
		return $zheader;
	}

	public function trackPageView($currentpage) {
		global $wtwdb;
		return $wtwdb->trackPageView($currentpage);
	}
}

	function wtwconnect() {
		return wtwconnect::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwconnect'] = wtwconnect();
	
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
	function shutdownOnErrorConnect() {
		$error = error_get_last();
		if ($error != null) {
			$errors = array(
				E_PARSE,
				E_COMPILE_ERROR,
				E_RECOVERABLE_ERROR,
				E_ERROR,
				E_USER_ERROR
			);
			if (isset($error['type']) && in_array($error['type'], $errors, true)) {
				$message = addslashes(str_replace("\n","",str_replace("\r","",$error['message'])));
				try {
					$conn = new mysqli(wtw_dbserver, wtw_dbusername, wtw_dbpassword, wtw_dbname);
					if ($conn->connect_error) {
						$error = "console.log('Connection failed: ".str_replace("'","\'",$conn->connect_error)."');";
					} else {
						$sql = "insert into ".wtw_tableprefix."errorlog 
								(message,
								 logdate)
								values
								('".addslashes(str_replace("'","\'",$message))."',
								 '".date('Y-m-d H:i:s')."');";
						$conn->query($sql);
					}
					$conn->close();
				} catch (Exception $e) { }
			}
		}
	}
	global $wtwconnect;
	$wtwconnect->initClass();
?>
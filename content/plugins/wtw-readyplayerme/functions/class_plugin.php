<?php
class wtwreadyplayerme {
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
			$this->defineConstants();
			$this->initClass();
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_plugin.php-construct=".$e->getMessage());
		}
	}	
	
	public $version = "1.0.0";
	public $dbversion = "1.0.2";
	public $versiondate = "2025-04-28";
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	private function define($name, $value) {
		global $wtwplugins;
		try {
			if (!defined($name)) {
				define($name, $value);
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_plugin.php-define=".$e->getMessage());
		}
	}

	public function defineConstants() {
		global $wtwplugins;
		try {
			$this->define('WTW_READYPLAYERME_PLUGIN', basename(strtolower(WTW_READYPLAYERME_FILE),".php"));
			$this->define('WTW_READYPLAYERME_PATH', dirname(WTW_READYPLAYERME_FILE));
			$this->define('WTW_READYPLAYERME_URL', $wtwplugins->contenturl.'/plugins/' . WTW_READYPLAYERME_PLUGIN);
			$this->define('WTW_READYPLAYERME_PREFIX', str_replace("wtw_wtw-","wtw_",wtw_tableprefix . WTW_READYPLAYERME_PLUGIN)."_");
			$this->define('WTW_READYPLAYERME_VERSION', $this->version);
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_plugin.php-defineConstants=".$e->getMessage());
		}
	}

	public function initClass() {
		global $wtwplugins;
		try {
			$this->initAdminOnlyHooks();
			$this->initHooks();
			$this->checkTablesForUpdates();
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_plugin.php-initClass=".$e->getMessage());
		}
	}
	
	public function initAdminOnlyHooks() {
		global $wtwplugins;
		try {
			/* Admin only hooks */
			if ($wtwplugins->pagename == "admin.php") {
				$zupdateroles = array("admin","developer","architect","graphics artist","host");
				$zdeveloperroles = array("admin","developer");

				/* add admin menu items */
				/* wtwplugins class -> addAdminMenuItem function (menu item id, menu text, level 1 sort, level 1 id, level 2 sort, level 2 id, level 1 icon, allowed roles array - null for all, onclick JavaScript function, color) */

				$wtwplugins->addAdminMenuItem('wtw_adminavatarreadyplayerme', $wtwplugins->__('ReadyPlayerMe Avatars'), -75, 'wtw_adminavatars', 20, 'wtw_adminavatarreadyplayerme', '', $zupdateroles, "WTW.adminMenuItemSelected(this);", 'red');

				$wtwplugins->addAdminSubMenuItem('readyplayerme', 'wtw_adminrpmsettings', 'General Settings', 1, $zupdateroles, "WTW.adminMenuItemSelected(this);");
				$wtwplugins->addAdminSubMenuItem('readyplayerme', 'wtw_adminrpmscaling', 'Avatar Scaling', 5, $zupdateroles, "WTW.adminMenuItemSelected(this);");
				$wtwplugins->addAdminSubMenuItem('readyplayerme', 'wtw_adminrpmanimations', 'Avatar Animations', 10, $zupdateroles, "WTW.adminMenuItemSelected(this);");

				$wtwplugins->addAdminMenuForm('wtw_adminavatarreadyplayermediv', $wtwplugins->__('ReadyPlayerMe Avatars'), $this->getReadyPlayerMeForm(), $zupdateroles);

				/* admin full page settings forms */
				/* wtwplugins class -> addFullPageForm function (form id, allowed roles array - null for all, form html string) */
				$wtwplugins->addFullPageForm('wtw_readyplayermepage', $zupdateroles, $this->adminReadyPlayerMeForm());
				$wtwplugins->addFullPageForm('wtw_readyplayermesettingspage', $zupdateroles, $this->adminReadyPlayerMeSettingsForm());

			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_plugin.php-initAdminOnlyHooks=".$e->getMessage());
		}
	}	
	
	public function initHooks() {
		global $wtwplugins;
		try {
			/* Browse and Admin hooks  (admin inherrits all browse functions) */
			
			/* wtwplugins class -> addStylesheet function (stylesheet id, '1' for admin only, stylesheet url) */
			$wtwplugins->addStylesheet('wtw-readyplayerme-style-css', null, WTW_READYPLAYERME_URL . "/styles/style.css");

			/* javascripts */
			/* wtwplugins class -> addScript function (script id, '1' for admin only, script browse url) */
			$wtwplugins->addScript('wtw-readyplayerme-script', null, WTW_READYPLAYERME_URL . "/scripts/class_main.js");
			
			/* hook plugin script functions into existing wtw functions */
			/* $wtwplugins->addScriptFunction('hookname', 'function(parameters);'); */
			
			$wtwplugins->addScriptFunction("loadusersettings", "wtwreadyplayerme.loadUserSettings();"); 
			
			$wtwplugins->addScriptFunction("loadloginsettings", "wtwreadyplayerme.loadLoginSettings(zloaddefault);");	
			
			$wtwplugins->addScriptFunction("initializeavatar", "wtwreadyplayerme.initializeAvatar(zloaddefault);");

			$wtwplugins->addScriptFunction("hudloginloadchoiceavatarsarray", "wtwreadyplayerme.hudLoginLoadChoiceAvatarsArray(zfilter, zdefaultdisplayname);");

			$wtwplugins->addScriptFunction("onmyavatarselect", "wtwreadyplayerme.onMyAvatarSelect(zglobaluseravatarid, zuseravatarid, zavatarid, zloaddefault);");

			$wtwplugins->addScriptFunction("getsavedavatar", "wtwreadyplayerme.getSavedAvatar(zglobaluseravatarid, zinstanceid, zavatarname, zsendrefresh, zloaddefault);");

			$wtwplugins->addScriptFunction("adminmenuitemselected", "wtwreadyplayerme.adminMenuItemSelected(zobj);");

			$wtwplugins->addScriptFunction("openfullpageform", "wtwreadyplayerme.openFullPageForm(zpageid, zsetcategory, zitem, zitemname, zitemnamepath, zpreviewname);");

			
			/* examples: */
			/* $wtwplugins->addScriptFunction("inputclick", "wtwreadyplayerme.inputClick(zpickedname);"); */
			/* $wtwplugins->addScriptFunction("setnewactionzonedefaults", "wtwreadyplayerme.setNewActionZoneDefaults(zactionzonetype);"); */
			/* $wtwplugins->addScriptFunction("setactionzoneformfields", "wtwreadyplayerme.setNewActionZoneFormFields(zactionzonetype);"); */
			/* $wtwplugins->addScriptFunction("disposeclean", "wtwreadyplayerme.disposeClean(zmoldname);"); */
			
			
			/* Custom Molds (meshes) */
			/* The following create the list of new molds added by this plugin and assign the script to create the mold */
			/* $wtwplugins->addMoldDef("My Custom Mold - NAME FOR THE LIST", "webmold or mold - LIST", "wtwreadyplayerme.functionname(passed, values);"); */
//			$wtwplugins->addMoldDef("My Custom Mold", "webmold", "wtwreadyplayerme.addMoldMyCustomMold(zmoldname, zmolddef, zlenx, zleny, zlenz);");
			/* Set the custom mold defaults and show-hide form fields as needed */
//			$wtwplugins->addScriptFunction("setnewmolddefaults", "wtwreadyplayerme.setNewMoldDefaults(zshape, zpositionx, zpositiony, zpositionz, zrotationy);");
//			$wtwplugins->addScriptFunction("setmoldformfields", "wtwreadyplayerme.setMoldFormFields(zshape);");

			/* Custom action zones */
			/* The following create the list of new action zones added by this plugin and assign the script to create the action zone */
//			$wtwplugins->addActionZoneDef("My Custom Zone", "wtwreadyplayerme.addActionZoneMyCustomZone(zactionzonename, zactionzoneind, zactionzonedef);", "0");
			/* Set the custom action zone defaults and show-hide form fields as needed */
//			$wtwplugins->addScriptFunction("setnewactionzonedefaults", "wtwreadyplayerme.setNewActionZoneDefaults(zactionzonetype);");
//			$wtwplugins->addScriptFunction("setactionzoneformfields", "wtwreadyplayerme.setActionZoneFormFields(zactionzonetype);");
			
			/* Custom coverings (materials) */
			/* The following create the list of new coverings added by this plugin and assign the script to create the covering */
//			$wtwplugins->addCoveringDef("My Custom Covering", "wtwreadyplayerme.addCoveringMyCustomCovering(zmoldname, zmolddef, zlenx, zleny, zlenz, zspecial1, zspecial2);");
			/* Set the custom covering defaults and show-hide mold form fields as needed */
//			$wtwplugins->addScriptFunction("setcoveringformfields", "wtwreadyplayerme.setCoveringFormFields(zcoveringname);");
			
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_plugin.php.php-initHooks=".$e->getMessage());
		}
	}	
	
	public function checkTablesForUpdates() {
		/* Table definitions for plugin - used for new installs and updates */
		global $wtwplugins;
		try {
			/* to implement a table change or addition make the changes below */
			/* then update the $this->dbversion variable at the top of this file */
			/* deltaCreateTable will add, alter, or remove fields or add the table if it doesnt exist */
			/* check core/functions/class_wtwdb.php deltaCreateTable function for full support */
			$dbversion = $wtwplugins->getSetting(WTW_READYPLAYERME_PREFIX."dbversion","1.0.0");
			if ($dbversion != $this->dbversion) {
				$wtwplugins->deltaCreateTable("
					CREATE TABLE `".WTW_READYPLAYERME_PREFIX."avataranimations` (
					  `avataranimationid` varchar(16) NOT NULL,
					  `loadpriority` int DEFAULT '0',
					  `animationevent` varchar(45) DEFAULT '',
					  `animationfriendlyname` varchar(255) DEFAULT '',
					  `animationicon` varchar(255) DEFAULT '',
					  `objectfolder` varchar(255) DEFAULT '',
					  `objectfile` varchar(255) DEFAULT '',
					  `startframe` int DEFAULT '0',
					  `endframe` int DEFAULT '0',
					  `animationloop` int DEFAULT '1',
					  `speedratio` decimal(18,2) DEFAULT '1.00',
					  `soundid` varchar(16) DEFAULT '',
					  `soundpath` varchar(255) DEFAULT '',
					  `soundmaxdistance` decimal(18,2) DEFAULT '100.00',
					  `createdate` datetime DEFAULT NULL,
					  `createuserid` varchar(16) DEFAULT '',
					  `updatedate` datetime DEFAULT NULL,
					  `updateuserid` varchar(16) DEFAULT '',
					  `deleteddate` datetime DEFAULT NULL,
					  `deleteduserid` varchar(16) DEFAULT '',
					  `deleted` int DEFAULT '0',
					  PRIMARY KEY (`avataranimationid`),
					  UNIQUE KEY `".WTW_READYPLAYERME_PREFIX."avataranimationid_UNIQUE` (`avataranimationid`)
					) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;				
				");

				$wtwplugins->deltaCreateTable("
					CREATE TABLE `".WTW_READYPLAYERME_PREFIX."usertokens` (
					  `ipaddress` varchar(24) NOT NULL,
					  `token` varchar(256) DEFAULT '',
					  `userid` varchar(64) DEFAULT '',
					  `createdate` datetime DEFAULT NULL,
					  `lastdate` datetime DEFAULT NULL,
					  PRIMARY KEY (`ipaddress`),
					  UNIQUE KEY `".WTW_READYPLAYERME_PREFIX."ipaddress_UNIQUE` (`ipaddress`)
					) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;				
				");
				
				if ($dbversion == "1.0.0") {
					/* initial install - load animations to the table */
					$this->loadAnimationsIntoTable();
				}
				
				$wtwplugins->saveSetting(WTW_READYPLAYERME_PREFIX."dbversion", $this->dbversion);
			}
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_plugin.php-checkTablesForUpdates=".$e->getMessage());
		}
	}

	public function loadAnimationsIntoTable() {
		global $wtwplugins;
		try {
			$ztimestamp = date('Y/m/d H:i:s');
			$zuserid = $wtwplugins->userid;
			$wtwplugins->query("INSERT INTO ".WTW_READYPLAYERME_PREFIX."avataranimations 
				(avataranimationid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('8qz4ohoyrmxic5ho',100,'onwait','Wait','','/content/plugins/wtw-readyplayerme/assets/','wait.babylon',1,202,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('9bu8mgen3h6gq95z',50,'onwalk','Walk','','/content/plugins/wtw-readyplayerme/assets/','walk.babylon',1,32,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('hguup0xngdf35fri',49,'onwalkbackwards','Walk Backwards','','/content/plugins/wtw-readyplayerme/assets/','walkbackwards.babylon',1,38,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('avhsi8k52waqtvz9',48,'onturnleft','Turn Left','','/content/plugins/wtw-readyplayerme/assets/','turnleft.babylon',1,51,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('bs1u56hvvq24en1a',48,'onturnright','Turn Right','','/content/plugins/wtw-readyplayerme/assets/','turnright.babylon',1,51,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('03g1ssnvc7y61mz3',47,'onstrafeleft','Strafe Left','','/content/plugins/wtw-readyplayerme/assets/','strafeleft.babylon',1,32,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('amaiouat8orpacvb',47,'onstraferight','Strafe Right','','/content/plugins/wtw-readyplayerme/assets/','straferight.babylon',1,32,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ibzzzyvfmqv56eid',40,'onrun','Run','','/content/plugins/wtw-readyplayerme/assets/','run.babylon',1,20,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('absye5i30phdg2zo',39,'onrunbackwards','Run Backwards','','/content/plugins/wtw-readyplayerme/assets/','runbackwards.babylon',1,20,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('jlfa768mhkc280cq',38,'onrunturnleft','Run Turn Left','','/content/plugins/wtw-readyplayerme/assets/','turnleft.babylon',1,51,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('kptx63zm62qieev4',38,'onrunturnright','Run Turn Right','','/content/plugins/wtw-readyplayerme/assets/','turnright.babylon',1,51,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('bg9y2fxfa75334em',37,'onrunstrafeleft','Run Strafe Left','','/content/plugins/wtw-readyplayerme/assets/','runstrafeleft.babylon',1,21,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('0phc97bxom4rdmz2',37,'onrunstraferight','Run Strafe Right','','/content/plugins/wtw-readyplayerme/assets/','runstraferight.babylon',1,21,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('c8cimhpean88elwe',35,'onwait-sit','Wait - Sit','','/content/plugins/wtw-readyplayerme/assets/','wait-sit.babylon',1,36,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('69lowvplqjwi2npi',34,'onjump','Jump','','/content/plugins/wtw-readyplayerme/assets/','jump.babylon',1,31,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('4xxo3lsdvwgfgbdo',33,'onjumpwalk','Walk - Jump','','/content/plugins/wtw-readyplayerme/assets/','walk-jump.babylon',1,58,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('osabe0oggfm87llh',32,'onjumprun','Run - Jump','','/content/plugins/wtw-readyplayerme/assets/','walk-jump.babylon',1,58,1,1.50,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('9cjzw8oox1ckqqcx',31,'onjumpwalkbackwards','Walk Backwards - Jump','','/content/plugins/wtw-readyplayerme/assets/','walkbackwards-jump.babylon',1,29,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('dfyr8iqb9auqth71',30,'onjumprunbackwards','Run Backwards - Jump','','/content/plugins/wtw-readyplayerme/assets/','walkbackwards-jump.babylon',1,29,1,1.50,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('tkhwhxo3nr7awp3t',10,'onwait-swim','Wait - Swim','','/content/plugins/wtw-readyplayerme/assets/','wait-swim.babylon',1,91,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('xv4mcxi0g8y5u60x',9,'onwalk-swim','Walk - Swim','','/content/plugins/wtw-readyplayerme/assets/','walk-swim.babylon',1,137,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('4patz2fbqef0oc3d',8,'onrun-swim','Run - Swim','','/content/plugins/wtw-readyplayerme/assets/','walk-swim.babylon',1,137,1,1.50,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('dmrilk9asno5diw6',7,'onwalkbackwards-swim','Walk Backwards Swim','','/content/plugins/wtw-readyplayerme/assets/','wait-swim.babylon',1,91,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('fgkxp3hlk8d850dd',6,'onrunbackwards-swim','Run Backwards Swim','','/content/plugins/wtw-readyplayerme/assets/','wait-swim.babylon',1,91,1,1.50,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('o0812jhi5sq9rfqv',2,'onsleep','Wait - Sleep','','/content/plugins/wtw-readyplayerme/assets/','wait-sleep.babylon',1,207,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('t6ulex0lajy06fjk',1,'ondie','Die','','/content/plugins/wtw-readyplayerme/assets/','die.babylon',1,139,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('u7hdt1fuelg3yg1u',1,'onwait-fight','Fight - Wait','','/content/plugins/wtw-readyplayerme/assets/','fight-wait.babylon',1,90,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('8bsvscwg2kehq74n',0,'onoption','Option - Agony','','/content/plugins/wtw-readyplayerme/assets/','option-agony.babylon',1,112,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('6thtbygsmolqusa6',0,'onoption','Option - Agree','','/content/plugins/wtw-readyplayerme/assets/','option-agree.babylon',1,142,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('2j81rsg12f6g14us',0,'onoption','Option - Angry','','/content/plugins/wtw-readyplayerme/assets/','option-angry.babylon',1,67,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('5ed4h2bhru56kc4g',0,'onoption','Option - Angry Point','','/content/plugins/wtw-readyplayerme/assets/','option-angrypoint.babylon',1,74,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('d3p86fvn0o793uo1',0,'onoption','Option - Arm Gesture','','/content/plugins/wtw-readyplayerme/assets/','option-armgesture.babylon',1,103,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('vb4tm7n1w396tmev',0,'onoption','Option - Backflip','','/content/plugins/wtw-readyplayerme/assets/','option-backflip.babylon',1,66,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('z281yldvxpn2i8ge',0,'onoption','Option - Bashful','','/content/plugins/wtw-readyplayerme/assets/','option-bashful.babylon',1,331,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('6vokevrg2450jyou',0,'onoption','Option - Bow','','/content/plugins/wtw-readyplayerme/assets/','option-bow.babylon',1,83,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('84wghue4zq3w3xlc',0,'onoption','Option - Charge','','/content/plugins/wtw-readyplayerme/assets/','option-charge.babylon',1,172,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('6o9df93pi2f660oi',0,'onoption','Option - Cocky','','/content/plugins/wtw-readyplayerme/assets/','option-cocky.babylon',1,88,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('6s4ee62919vzzhh5',0,'onoption','Option - Count','','/content/plugins/wtw-readyplayerme/assets/','option-count.babylon',1,200,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('tptccj8h3lrunpni',0,'onoption','Option - Count Out','','/content/plugins/wtw-readyplayerme/assets/','option-countout.babylon',1,419,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('3vn3ka86j5qjsrub',0,'onoption','Option - Crazy','','/content/plugins/wtw-readyplayerme/assets/','option-crazy.babylon',1,151,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('px2c0tmudf1b95lc',0,'onoption','Option - Cry','','/content/plugins/wtw-readyplayerme/assets/','option-cry.babylon',1,189,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('wf2uz0xqc97n89bd',0,'onoption','Option - Dance - Hip Hop','','/content/plugins/wtw-readyplayerme/assets/','option-dance.babylon',1,480,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('48xhxz22h58ude26',0,'onoption','Option - Defeat','','/content/plugins/wtw-readyplayerme/assets/','option-defeat.babylon',1,220,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('1nb595r8o28cnmo1',0,'onoption','Option - Disagree','','/content/plugins/wtw-readyplayerme/assets/','option-disagree.babylon',1,55,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('8jsfl3qh8z2oa35g',0,'onoption','Option - Dismiss','','/content/plugins/wtw-readyplayerme/assets/','option-dismiss.babylon',1,99,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('n1qx6ed828rytbe1',0,'onoption','Option - Excited','','/content/plugins/wtw-readyplayerme/assets/','option-excited.babylon',1,198,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('pcwgr6ku3rm0dloa',0,'onoption','Option - Fist Pump','','/content/plugins/wtw-readyplayerme/assets/','option-fistpump.babylon',1,115,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('s80hq6dgrcchw8b3',0,'onoption','Option - Hands Forward','','/content/plugins/wtw-readyplayerme/assets/','option-handsforward.babylon',1,94,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ef08u57zsiwkvy8e',0,'onoption','Option - Happy','','/content/plugins/wtw-readyplayerme/assets/','option-happy.babylon',1,89,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('2eb5951oscc34myq',0,'onoption','Option - Insult','','/content/plugins/wtw-readyplayerme/assets/','option-insult.babylon',1,81,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('34xwg3hic3dj56zm',0,'onoption','Option - Kneel','','/content/plugins/wtw-readyplayerme/assets/','option-kneel.babylon',1,141,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('8c6im7dwlmp489r9',0,'onoption','Option - Lay on Ground','','/content/plugins/wtw-readyplayerme/assets/','option-layonground.babylon',1,131,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('bd44vvyaa0oek2zv',0,'onoption','Option - Look','','/content/plugins/wtw-readyplayerme/assets/','option-look.babylon',1,144,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('133aenqdfj6me0hm',0,'onoption','Option - Look Away','','/content/plugins/wtw-readyplayerme/assets/','option-lookaway.babylon',1,71,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('qr52oj0dmb2yjcm1',0,'onoption','Option - Look Back','','/content/plugins/wtw-readyplayerme/assets/','option-lookback.babylon',1,122,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('y5rc20z4nrh19k2e',0,'onoption','Option - Loser','','/content/plugins/wtw-readyplayerme/assets/','option-loser.babylon',1,99,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('tknt9oa636d1pzk8',0,'onoption','Option - No','','/content/plugins/wtw-readyplayerme/assets/','option-no.babylon',1,55,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('liriloxsiv96oq89',0,'onoption','Option - Over Here','','/content/plugins/wtw-readyplayerme/assets/','option-overhere.babylon',1,96,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('etqxrh5y4eqw5g5b',0,'onoption','Option - Pain','','/content/plugins/wtw-readyplayerme/assets/','option-pain.babylon',1,54,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('m5c23iielnyeh03t',0,'onoption','Option - Point','','/content/plugins/wtw-readyplayerme/assets/','option-point.babylon',1,84,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('8530n958fu16p9x9',0,'onoption','Option - Point Two Hands','','/content/plugins/wtw-readyplayerme/assets/','option-point2hands.babylon',1,60,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('i81yyltziy29jcgm',0,'onoption','Option - Pray','','/content/plugins/wtw-readyplayerme/assets/','option-pray.babylon',1,59,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',1),
				('hf7ioeqb44f6t918',0,'onoption','Option - Raise Hand','','/content/plugins/wtw-readyplayerme/assets/','option-raisehand.babylon',1,123,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('itndxof0z5dy7b8u',0,'onoption','Option - React','','/content/plugins/wtw-readyplayerme/assets/','option-react.babylon',1,111,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('k9lmblkvnt1umbpm',0,'onoption','Option - Reject','','/content/plugins/wtw-readyplayerme/assets/','option-reject.babylon',1,145,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('egq39bn1d42u1xb3',0,'onoption','Option - Salute','','/content/plugins/wtw-readyplayerme/assets/','option-salute.babylon',1,86,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('pik7y8adzsujx5dd',0,'onoption','Option - Shake','','/content/plugins/wtw-readyplayerme/assets/','option-shake.babylon',1,53,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ryz8ld9bybq2u5vo',0,'onoption','Option - Shake Fist','','/content/plugins/wtw-readyplayerme/assets/','option-shakefist.babylon',1,74,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('jfo7lkyzlsizx9my',0,'onoption','Option - Shake It Off','','/content/plugins/wtw-readyplayerme/assets/','option-shakeitoff.babylon',1,176,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('np7wh3kr9dp9udvi',0,'onoption','Option - Shift Weight','','/content/plugins/wtw-readyplayerme/assets/','option-shiftweight.babylon',1,284,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('sc54v66p8ny2ebpr',0,'onoption','Option - Sit on Ground','','/content/plugins/wtw-readyplayerme/assets/','option-sitonground.babylon',1,327,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('vgkrthmyqi3nd9wj',0,'onoption','Option - Stretch Arms','','/content/plugins/wtw-readyplayerme/assets/','option-stretcharms.babylon',1,267,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('00rcbmt3s9bkhmun',0,'onoption','Option - Stretch Neck','','/content/plugins/wtw-readyplayerme/assets/','option-stretchneck.babylon',1,97,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('4mkr5uba5vwpoo9y',0,'onoption','Option - Strong','','/content/plugins/wtw-readyplayerme/assets/','option-strong.babylon',1,58,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('dusg238tm14jshme',0,'onoption','Option - Surprised','','/content/plugins/wtw-readyplayerme/assets/','option-surprised.babylon',1,121,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ipe0zzc71xma23pe',0,'onoption','Option - Talk','','/content/plugins/wtw-readyplayerme/assets/','option-talk.babylon',1,119,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('q4o05eugvg0a2411',0,'onoption','Option - Taunt','','/content/plugins/wtw-readyplayerme/assets/','option-taunt.babylon',1,86,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('0bjm8yi0i29tforb',0,'onoption','Option - Tell Secret','','/content/plugins/wtw-readyplayerme/assets/','option-tellsecret.babylon',1,328,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('yoq8r8xj3yjjaxnq',0,'onoption','Option - Thank','','/content/plugins/wtw-readyplayerme/assets/','option-thank.babylon',1,91,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('3h0jj83u3t1zx0wf',0,'onoption','Option - Thumbs Up','','/content/plugins/wtw-readyplayerme/assets/','option-thumbsup.babylon',1,126,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('lf9odd6xo7an5te1',0,'onoption','Option - Touch Screen','','/content/plugins/wtw-readyplayerme/assets/','option-touchscreen.babylon',1,995,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('d7rvo8ccumi4tndn',0,'onoption','Option - Victory','','/content/plugins/wtw-readyplayerme/assets/','option-victory.babylon',1,136,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('0wedh0rtt49sjjvd',0,'onoption','Option - Wave','','/content/plugins/wtw-readyplayerme/assets/','option-wave.babylon',1,143,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('6zw6c2urdjgt6qrf',0,'onoption','Option - Wave Quick','','/content/plugins/wtw-readyplayerme/assets/','option-wavequick.babylon',1,17,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('bfedrfnlk0x2vr66',0,'onoption','Option - Whatever','','/content/plugins/wtw-readyplayerme/assets/','option-whatever.babylon',1,43,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('h74uncae5d5gt6j8',0,'onoption','Option - Yawn','','/content/plugins/wtw-readyplayerme/assets/','option-yawn.babylon',1,251,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('9exgsy9qe8fdkn4t',0,'onoption','Option - Yell','','/content/plugins/wtw-readyplayerme/assets/','option-yell.babylon',1,236,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('w6azon74dsl7aoga',0,'onoption','Option - Yes','','/content/plugins/wtw-readyplayerme/assets/','option-yes.babylon',1,79,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('cgo8tfepjtuvtiac',0,'onoption','Fight - Bash','','/content/plugins/wtw-readyplayerme/assets/','fight-bash.babylon',1,121,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('4ofk7ciuo8xpiojw',0,'onoption','Fight - Block','','/content/plugins/wtw-readyplayerme/assets/','fight-block.babylon',1,87,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ieuz231ycnoyoj4e',0,'onoption','Fight - Block Left','','/content/plugins/wtw-readyplayerme/assets/','fight-blockleft.babylon',1,46,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('kxnshytrbzlq8c3b',0,'onoption','Fight - Block Right','','/content/plugins/wtw-readyplayerme/assets/','fight-blockright.babylon',1,44,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('um78pis1y60x3pwc',0,'onoption','Fight - Cast Spell','','/content/plugins/wtw-readyplayerme/assets/','fight-castspell.babylon',1,232,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('tq3at3rd51nlzt94',0,'onoption','Fight - Cast Spell Two Hands','','/content/plugins/wtw-readyplayerme/assets/','fight-castspell2hands.babylon',1,104,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('fwyivpyj0830yxrr',0,'onoption','Fight - Cast Wide Spell','','/content/plugins/wtw-readyplayerme/assets/','fight-castwidespell.babylon',1,107,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('rdhn4t79jce9xguu',0,'onoption','Fight - Cross Punch','','/content/plugins/wtw-readyplayerme/assets/','fight-crosspunch.babylon',1,61,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('5i0waoy16m5le378',0,'onoption','Fight - Duck','','/content/plugins/wtw-readyplayerme/assets/','fight-duck.babylon',1,47,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('8x9ryo1t56ny8zxr',0,'onoption','Fight - Elbow Combo','','/content/plugins/wtw-readyplayerme/assets/','fight-elbowcombo.babylon',1,99,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('xdxdw983liif9g2n',0,'onoption','Fight - Elbow to Uppercut','','/content/plugins/wtw-readyplayerme/assets/','fight-elbowtouppercut.babylon',1,74,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('kxsul1dbz38vzbw2',0,'onoption','Fight - Fireball','','/content/plugins/wtw-readyplayerme/assets/','fight-fireball.babylon',1,102,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('7u6mv61o7ht9q24p',0,'onoption','Fight - Inside Crescent Kick','','/content/plugins/wtw-readyplayerme/assets/','fight-insidecrescent.babylon',1,81,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ml2kxekn1huod1yj',0,'onoption','Fight - Headbutt','','/content/plugins/wtw-readyplayerme/assets/','fight-headbutt.babylon',1,68,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('r7g8iglfw1jfjewr',0,'onoption','Fight - Hook Left','','/content/plugins/wtw-readyplayerme/assets/','fight-hookleft.babylon',1,68,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('d5g8aelfw1jfjeuj',0,'onoption','Fight - Hook Right','','/content/plugins/wtw-readyplayerme/assets/','fight-hookright.babylon',1,66,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('830u5u5fejv8mcl6',0,'onoption','Fight - Jab Left','','/content/plugins/wtw-readyplayerme/assets/','fight-jab.babylon',1,33,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('750u5u5zejn8mcl5',0,'onoption','Fight - Jab Right','','/content/plugins/wtw-readyplayerme/assets/','fight-jabcross.babylon',1,60,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('wb71w0v9wuzq6vj8',0,'onoption','Fight - Kick Chapa','','/content/plugins/wtw-readyplayerme/assets/','fight-kickchapa.babylon',1,42,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('qjjycsm32dfu31rx',0,'onoption','Fight - Kick Left','','/content/plugins/wtw-readyplayerme/assets/','fight-kickleft.babylon',1,66,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('7ho2102g9my8ww7w',0,'onoption','Fight - Kick Right','','/content/plugins/wtw-readyplayerme/assets/','fight-kickright.babylon',1,65,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('u1p6ph0nhoirhd5k',0,'onoption','Fight - Knee Jab','','/content/plugins/wtw-readyplayerme/assets/','fight-kneejab.babylon',1,71,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('wfvzf81p5hb9lhxn',0,'onoption','Fight - Knee to Uppercut','','/content/plugins/wtw-readyplayerme/assets/','fight-kneetouppercut.babylon',1,171,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('km127fhm1jysiaxu',0,'onoption','Fight - Magic Heal','','/content/plugins/wtw-readyplayerme/assets/','fight-magicheal.babylon',1,81,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ixwfwmk3jf0o9mik',0,'onoption','Fight - Magic Spell','','/content/plugins/wtw-readyplayerme/assets/','fight-magicspell.babylon',1,129,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('5zc6hp5gc2e2o1d9',0,'onoption','Fight - Punch Combo','','/content/plugins/wtw-readyplayerme/assets/','fight-punchcombo.babylon',1,90,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('djtvvtq1ndq2cmnc',0,'onoption','Fight - Punch Combo Fast','','/content/plugins/wtw-readyplayerme/assets/','fight-punchcombofast.babylon',1,67,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('fjtsq03gtq2pwbxt',0,'onoption','Fight - Punch Right','','/content/plugins/wtw-readyplayerme/assets/','fight-punchright.babylon',1,31,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('mwa973fei8h1jpx3',0,'onoption','Fight - Quad Punch','','/content/plugins/wtw-readyplayerme/assets/','fight-quadpunch.babylon',1,66,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('62ydmziael39qhvl',0,'onoption','Fight - Roundhouse Kick','','/content/plugins/wtw-readyplayerme/assets/','fight-roundhousekick.babylon',1,76,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('4l2hfo4hj28f348m',0,'onoption','Fight - Taunt','','/content/plugins/wtw-readyplayerme/assets/','fight-taunt.babylon',1,86,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('jlvqlrkhek0ii9ig',-100,'onwait-riffle','Wait - Riffle','','/content/plugins/wtw-readyplayerme/assets/','wait-riffle.babylon',1,86,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('d64rfgk8qg0ejpta',-101,'onwalk-riffle','Walk - Riffle','','/content/plugins/wtw-readyplayerme/assets/','walk-riffle.babylon',1,40,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('7djizpuqgum9x56v',-102,'onwalkbackwards-riffle','Walk Backwards - Riffle','','/content/plugins/wtw-readyplayerme/assets/','walkbackwards-riffle.babylon',1,39,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('1kxxr7u6nw0oqq5h',-103,'onturnleft-riffle','Turn Left - Riffle','','/content/plugins/wtw-readyplayerme/assets/','turnleft-riffle.babylon',1,60,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('9ydrm5d9xoabmdm6',-103,'onturnright-riffle','Turn Right - Riffle','','/content/plugins/wtw-readyplayerme/assets/','turnright-riffle.babylon',1,57,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('jw2j7a2ow13z10w1',-104,'onstrafeleft-riffle','Walk Strafe Left - Riffle','','/content/plugins/wtw-readyplayerme/assets/','strafeleft-riffle.babylon',1,32,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('zhz1x2fsn93loxpb',-104,'onstraferight-riffle','Walk Strafe Right - Riffle','','/content/plugins/wtw-readyplayerme/assets/','straferight-riffle.babylon',1,44,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('43hvs958xcsjmlth',-105,'onrun-riffle','Run - Riffle','','/content/plugins/wtw-readyplayerme/assets/','run-riffle.babylon',1,21,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('tugl8y7xrcpigc0h',-106,'onrunbackwards-riffle','Run Backwards - Riffle','','/content/plugins/wtw-readyplayerme/assets/','runbackwards-riffle.babylon',1,19,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('i4a7f2njqaab0r6u',-107,'onrunturnleft-riffle','Run Turn Left - Riffle','','/content/plugins/wtw-readyplayerme/assets/','turnleft-riffle.babylon',1,60,1,2.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('rtysb697putw8gdo',-107,'onrunturnright-riffle','Run Turn Right - Riffle','','/content/plugins/wtw-readyplayerme/assets/','turnright-riffle.babylon',1,57,1,2.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('3v9v8nmcm0eql3wd',-108,'onrunstrafeleft-riffle','Run Strafe Left - Riffle','','/content/plugins/wtw-readyplayerme/assets/','runstrafeleft-riffle.babylon',1,17,1,1.50,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('nzs8eo5ojqtm0mai',-108,'onrunstraferight-riffle','Run Strafe Right - Riffle','','/content/plugins/wtw-readyplayerme/assets/','runstraferight-riffle.babylon',1,21,1,1.50,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('w65ci4c79x6lsw9h',-109,'ondie-riffle','Die - Riffle','','/content/plugins/wtw-readyplayerme/assets/','die-riffle.babylon',1,112,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('zxlijzte56vmgygl',0,'onoption','Fight - Punch Left','','/content/plugins/wtw-readyplayerme/assets/','fight-punchleft.babylon',1,32,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0); ");
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_plugin.php-loadAnimationsIntoTable=".$e->getMessage());
		}
	}

	public function getReadyPlayerMeForm() {
		/* Show ReadyPlayerMe Admin Menu */
		global $wtwplugins;
		$zformdata = "";
		try {
			/* ReadyPlayerMe menu */
			$zformdata .= "<div id=\"wtw_loadingreadyplayerme\" class=\"wtw-loadingnoticecentered\">".$wtwplugins->__('Loading')."</div>\r\n";
			$zformdata .= "<div id=\"wtw_readyplayermemenudiv\" class=\"wtw-hide\">";
			$zformdata .= "		<div id='wtw_bbackreadyplayerme' alt='Back' title='Back' class='wtw-backbutton' onclick='WTW.adminMenuItemSelected(this);'>&lt;&lt;</div>\r\n";
			$zformdata .="		<div class=\"wtw-menulevel0text\">These default settings are applied to Avatars imported from ReadyPlayerMe.</div>\r\n";
			$zformdata .= $wtwplugins->getAdminSubMenu('readyplayerme')."\r\n";
			
			$zformdata .= "<div id=\"wtw_cancelreadyplayerme\" class=\"wtw-yellowbutton\" onclick=\"WTW.adminMenuItemSelected(this);\">".$wtwplugins->__('Cancel')."</div><br /><br />\r\n";
			$zformdata .= "</div>\r\n";

			/* default avatar scaling */
			$zformdata .= "<div id=\"wtw_readyplayermescalingdiv\" class=\"wtw-hide\">";
			$zformdata .= "<h2 style=\"margin-bottom:3px;\">Avatar Size</h2>";
			$zformdata .= "<div class=\"wtw-onecol\">Scaling Z (left,-right)<br />";
			$zformdata .= "	<input type=\"text\" id=\"wtwrpm_tavatarscalingz\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);wtwreadyplayerme.setNewAvatar();\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarzl4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingz', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarzl3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingz', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarzl2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingz', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarzl1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingz', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" /><br />";

			$zformdata .= "<div style=\"text-align:center;\">";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarzl8\" class=\"wtw-smallprint\" value=\"-.001\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingz', -.001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarzl7\" class=\"wtw-smallprint\" value=\"-.0001\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingz', -.0001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarzl6\" class=\"wtw-smallprint\" value=\"+.0001\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingz', .0001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarzl5\" class=\"wtw-smallprint\" value=\"+.001\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingz', .001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" /></div>";

			$zformdata .= "</div><br />";

			$zformdata .= "<div class=\"wtw-onecol\">Scaling X (front,-back)<br />";
			$zformdata .= "	<input type=\"text\" id=\"wtwrpm_tavatarscalingx\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);wtwreadyplayerme.setNewAvatar();\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarxl4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingx', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarxl3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingx', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarxl2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingx', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarxl1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingx', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" /><br />";

			$zformdata .= "<div style=\"text-align:center;\">";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarxl8\" class=\"wtw-smallprint\" value=\"-.001\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingx', -.001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarxl7\" class=\"wtw-smallprint\" value=\"-.0001\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingx', -.0001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarxl6\" class=\"wtw-smallprint\" value=\"+.0001\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingx', .0001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarxl5\" class=\"wtw-smallprint\" value=\"+.001\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingx', .001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" /></div>";

			$zformdata .= "</div><br />";
			$zformdata .= "<div class=\"wtw-onecol\">Scaling Y (up,-down)<br />";
			$zformdata .= "	<input type=\"text\" id=\"wtwrpm_tavatarscalingy\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);wtwreadyplayerme.setNewAvatar();\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavataryl4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingy', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavataryl3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingy', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavataryl2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingy', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavataryl1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingy', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" /><br />";

			$zformdata .= "<div style=\"text-align:center;\">";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavataryl8\" class=\"wtw-smallprint\" value=\"-.001\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingy', -.001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavataryl7\" class=\"wtw-smallprint\" value=\"-.0001\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingy', -.0001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavataryl6\" class=\"wtw-smallprint\" value=\"+.0001\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingy', .0001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavataryl5\" class=\"wtw-smallprint\" value=\"+.001\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarscalingy', .001);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" /></div>";

			$zformdata .= "</div><hr class=\"wtw-menuhr\" />";
			
			$zformdata .= "<h2 style=\"margin-bottom:3px;\">Avatar Rotation</h2>";
			$zformdata .= "<div class=\"wtw-onecol\">Rotate Z (left,-right Axis)<br />";
			$zformdata .= "	<input type=\"text\" id=\"wtwrpm_tavatarrotationz\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);wtwreadyplayerme.setNewAvatar();\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarzr4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarrotationz', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarzr3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarrotationz', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarzr2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarrotationz', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarzr1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarrotationz', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "</div><br />";
			$zformdata .= "<div class=\"wtw-onecol\">Rotate X (front,-back Axis)<br />";
			$zformdata .= "	<input type=\"text\" id=\"wtwrpm_tavatarrotationx\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);wtwreadyplayerme.setNewAvatar();\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarxr4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarrotationx', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarxr3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarrotationx', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarxr2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarrotationx', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarxr1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarrotationx', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "</div><br />";
			$zformdata .= "<div class=\"wtw-onecol\">Rotate Y (up,-down Axis)<br />";
			$zformdata .= "	<input type=\"text\" id=\"wtwrpm_tavatarrotationy\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);wtwreadyplayerme.setNewAvatar();\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavataryr4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarrotationy', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavataryr3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarrotationy', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavataryr2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarrotationy', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavataryr1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarrotationy', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "</div><hr class=\"wtw-menuhr\" />";
			
			$zformdata .= "<h2 style=\"margin-bottom:3px;\">Avatar Position</h2>";
			$zformdata .= "<div class=\"wtw-onecol\" style=\"white-space:nowrap;\">Position Z (left,-right)<br /> ";
			$zformdata .= "	<input type=\"text\" id=\"wtwrpm_tavatarpositionz\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);wtwreadyplayerme.setNewAvatar();\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarzp4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarpositionz', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarzp3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarpositionz', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarzp2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarpositionz', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarzp1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarpositionz', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			$zformdata .= "</div><br />";
			$zformdata .= "<div class=\"wtw-onecol\">Position X (front,-back)<br />";
			$zformdata .= "	<input type=\"text\" id=\"wtwrpm_tavatarpositionx\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);wtwreadyplayerme.setNewAvatar();\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarxp4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarpositionx', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarxp3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarpositionx', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarxp2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarpositionx', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavatarxp1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarpositionx', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "</div><br />";
			$zformdata .= "<div class=\"wtw-onecol\">Position Y (up,-down)<br />";
			$zformdata .= "	<input type=\"text\" id=\"wtwrpm_tavatarpositiony\" maxlength=\"16\" class=\"wtw-secondcolcontent wtw-smallprintinput\" onclick=\"WTW.checkKey(this, 'number', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'number', 0, 0);\" onblur=\"WTW.checkKey(this, 'number', 0, 1);wtwreadyplayerme.setNewAvatar();\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavataryp4\" class=\"wtw-smallprint\" value=\"-1\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarpositiony', -1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavataryp3\" class=\"wtw-smallprint\" value=\"-.01\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarpositiony', -.01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavataryp2\" class=\"wtw-smallprint\" value=\"+.01\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarpositiony', .01);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "	<input type=\"button\" id=\"wtwrpm_beditavataryp1\" class=\"wtw-smallprint\" value=\"+1\" onmousedown=\"wtwreadyplayerme.changeNumberValue('wtwrpm_tavatarpositiony', 1);\" onmouseup=\"WTW.changeStop();\" style=\"cursor: pointer;\" />";
			$zformdata .= "</div><hr class=\"wtw-menuhr\" />";
			
			$zformdata .= "<div id=\"wtwrpm_tscalingavatarerror\" class=\"wtw-error\"></div>\r\n";
			$zformdata .= "<br /><div id=\"wtwrpm_adminavatarsavescaling\" class=\"wtw-greenbuttonbig\" onclick=\"wtwreadyplayerme.saveAvatarScaling();\">Save Avatar Scaling</div>\r\n";
			
			$zformdata .= "<div class=\"wtw-yellowbutton\" onclick=\"WTW.adminMenuItemSelected(dGet('wtw_adminavatarreadyplayerme'));\">Cancel</div><br /><br />\r\n";
			$zformdata .= "</div>";

			/* default avatar animations */
			$zformdata .= "<div id=\"wtw_readyplayermeanimationsdiv\" class=\"wtw-hide\">";
			$zformdata .= "<h2>Avatar Animations</h2>\r\n";
			$zformdata .= "<input type=\"file\" id=\"wtwrpm_avatarfilesupload2\" name=\"wtw_avatarfilesupload2[]\" class=\"wtw-hide\" multiple=\"true\" onchange=\"WTW.uploadQuickAvatarFiles();\" />";
			$zformdata .= "<div id=\"wtwrpm_tanimationsavatarerror\" class=\"wtw-error\"></div>\r\n";
			$zformdata .= "<div id=\"wtwrpm_avataranimationslist\"></div>\r\n";
			$zformdata .= "<div id=\"wtwrpm_cancelavataranimationsform\" class=\"wtw-yellowbutton\" onclick=\"WTW.adminMenuItemSelected(dGet('wtw_adminavatarreadyplayerme'));\">Cancel</div><br /><br />\r\n";

			$zformdata .= "<input type='hidden' id='wtwrpm_tavataranimationid' />\r\n";
			$zformdata .= "<input type='hidden' id='wtwrpm_tavataranimationeventid' />\r\n";


			$zformdata .= "</div>";

		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_plugin.php-getReadyPlayerMeForm=".$e->getMessage());
		}
		return $zformdata;
	}	
	

	public function adminReadyPlayerMeForm() {
		/* admin menu listing for Sub Menu */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "	<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardboxtitle\">ReadyPlayerMe Avatars</div>\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardbox\">\r\n";
			$zformdata .= "			<div class='wtw-roundedbox'><b>ReadyPlayerMe provides the use of custom avatars into your 3D Scenes.<br /></div>\r\n";
			$zformdata .= "			<div class='wtw-clear'></div>\r\n";
			$zformdata .= "						<div id=\"wtw_brpmanimations\" class='wtw-greenbuttonright' onclick=\"wtwreadyplayerme.openAnimations(1);\">Default Animations</div>\r\n";

			$zformdata .= "		</div>\r\n";
			$zformdata .= "	</div>\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins:wtw-readyplayerme:functions-class_plugin.php-adminReadyPlayerMeForm=".$e->getMessage());
		}
		return $zformdata;
	}	

	public function adminReadyPlayerMeSettingsForm() {
		/* admin settings form for ReadyPlayerMe */
		global $wtwplugins;
		$zformdata = "";
		try {
			$zformdata .= "<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardboxtitle\">ReadyPlayerMe General Settings</div>\r\n";
			$zformdata .= "		<div class='wtw-roundedbox'><b>ReadyPlayerMe</b> provides customizable avatars to your WalkTheWeb 3D Scenes.<br /></div>\r\n";
			$zformdata .= "		<div class='wtw-clear'></div>\r\n";
			$zformdata .= "		<div class=\"wtw-dashboardbox\">\r\n";
			
			/* RPM General settings */
			$zformdata .= "			<div class=\"wtw-controlpaneldiv\">\r\n";
			$zformdata .= "				<div class=\"wtw-controlpaneltitlediv\">ReadyPlayerMe Avatars</div>\r\n";
			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtwreadyplayerme_enableavatars\" type=\"checkbox\" onclick=\"wtwreadyplayerme.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtwreadyplayerme_enableavatarstext\" class=\"wtw-disabledlabel\">ReadyPlayerMe Avatars Disabled</div> <br /><br />\r\n";
			$zformdata .= "				<label class=\"wtw-switch\"><input id=\"wtwreadyplayerme_enableanonymous\" type=\"checkbox\" onclick=\"wtwreadyplayerme.changeSwitch(this);\"><span class=\"wtw-slider wtw-round\"></span></label><div id=\"wtwreadyplayerme_enableanonymoustext\" class=\"wtw-disabledlabel\">Anonymous ReadyPlayerMe Avatars Disabled</div> <br /><br />\r\n";
			$zformdata .= "				<label class='wtw-switch'><input id='wtwreadyplayerme_usewtwaccount' type='checkbox' onclick='wtwreadyplayerme.changeSwitch(this);'><span class='wtw-slider wtw-round'></span></label><div id='wtwreadyplayerme_usewtwaccounttext' class='wtw-disabledlabel'>Default ReadyPlayerMe Account Enabled</div><div style='clear:both;'></div>If you would like to use your own ReadyPlayerMe account and custom assets, disable the default account to enter your own settings.<br /><br />\r\n";			

			$zformdata .= "				<div class='wtw-clear'></div>\r\n";
			$zformdata .= "				<input type='hidden' id='wtwreadyplayerme_token' />\r\n";
			$zformdata .= "				<input type='hidden' id='wtwreadyplayerme_avatarid' />\r\n";
			$zformdata .= "				<div id='wtwreadyplayerme_accountdiv' class='wtw-roundedbox wtw-hide' style='padding:20px;max-width:500px;margin-right:auto;margin-left:auto;'>\r\n";
			$zformdata .= "					<div class='wtw-dashboardlabel' style='font-size:1.2em;'>Subdomain</div>\r\n";
			$zformdata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtwreadyplayerme_subdomain' maxlength='255' style='font-size:1.2em;width:300px;' onblur='wtwreadyplayerme.changeSwitch(this);' /></div>\r\n";
			$zformdata .= "					<div class='wtw-clear'></div>\r\n";
			$zformdata .= "					<div class='wtw-dashboardlabel' style='font-size:1.2em;'>Application ID</div>\r\n";
			$zformdata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtwreadyplayerme_applicationid' maxlength='255' style='font-size:1.2em;width:300px;' onblur='wtwreadyplayerme.changeSwitch(this);' /></div>\r\n";
			$zformdata .= "					<div class='wtw-clear'></div>\r\n";
			$zformdata .= "					<div class='wtw-dashboardlabel' style='font-size:1.2em;'>Organization ID</div>\r\n";
			$zformdata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtwreadyplayerme_organizationid' maxlength='255' style='font-size:1.2em;width:300px;' onblur='wtwreadyplayerme.changeSwitch(this);' /></div>\r\n";
			$zformdata .= "					<div class='wtw-clear'></div>\r\n";
			$zformdata .= "				</div>\r\n";

			$zformdata .= "			</div>\r\n";
			$zformdata .= "		</div>\r\n";
			$zformdata .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwplugins->serror("plugins-3dinternet.php-adminReadyPlayerMeSettingsForm=".$e->getMessage());
		}
		return $zformdata;
	}

}

	function wtwreadyplayerme() {
		return wtwreadyplayerme::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwreadyplayerme'] = wtwreadyplayerme();

?>
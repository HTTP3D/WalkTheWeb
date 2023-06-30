<?php 
class wtwtables {
	/* wtwtables class for defining and updating the core WalkTheWeb Tables, data upgrades, and initializing data */
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

	public function databaseTableDefinitions() {
		/* table definitions used for new installs, adding or modifying fields, and updating existing installs of WalkTheWeb core */
		global $wtw;
		global $wtwdb;
		try {
			set_time_limit(0);
			/* Table Updates - Renamed Fields - Apply before rechecking tables - Ignores on new installs or if not found */
			/* updated 3.4.3 - renamed avatar related fields */
			$wtwdb->renameFieldIfExists(wtw_tableprefix.'avatars', 'avatarfolder', 'objectfolder');
			$wtwdb->renameFieldIfExists(wtw_tableprefix.'avatars', 'avatarfile', 'objectfile');
			$wtwdb->renameFieldIfExists(wtw_tableprefix.'useravataranimations', 'avataranimationevent', 'animationevent');
			
			/* create or update table definitions */
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."actionzoneanimations` (
				  `actionzoneanimationid` varchar(16) NOT NULL,
				  `pastactionzoneanimationid` varchar(16) DEFAULT '',
				  `actionzoneid` varchar(16) NOT NULL,
				  `avataranimationid` varchar(16) NOT NULL,
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`actionzoneanimationid`),
				  UNIQUE KEY `".wtw_tableprefix."actionzoneanimationid_UNIQUE` (`actionzoneanimationid`),
				  KEY `".wtw_tableprefix."idx_actionzoneanimations` (`actionzoneid`,`avataranimationid`,`actionzoneanimationid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."actionzones` (
				  `actionzoneid` varchar(16) NOT NULL,
				  `pastactionzoneid` varchar(16) DEFAULT '',
				  `communityid` varchar(16) DEFAULT '',
				  `buildingid` varchar(16) DEFAULT '',
				  `thingid` varchar(16) DEFAULT '',
				  `attachmoldid` varchar(16) DEFAULT '',
				  `loadactionzoneid` varchar(16) DEFAULT '',
				  `parentactionzoneid` varchar(16) DEFAULT '',
				  `teleportwebid` varchar(16) DEFAULT '',
				  `teleportwebtype` varchar(16) DEFAULT '',
				  `spawnactionzoneid` varchar(16) DEFAULT '',
				  `actionzonename` varchar(255) DEFAULT '',
				  `actionzonetype` varchar(45) DEFAULT '',
				  `actionzoneshape` varchar(45) DEFAULT 'cylinder',
				  `movementtype` varchar(45) DEFAULT '',
				  `movementdistance` decimal(18,2) DEFAULT '0.00',
				  `positionx` decimal(18,2) DEFAULT '0.00',
				  `positiony` decimal(18,2) DEFAULT '0.00',
				  `positionz` decimal(18,2) DEFAULT '0.00',
				  `scalingx` decimal(18,2) DEFAULT '1.00',
				  `scalingy` decimal(18,2) DEFAULT '1.00',
				  `scalingz` decimal(18,2) DEFAULT '1.00',
				  `rotationx` decimal(18,2) DEFAULT '0.00',
				  `rotationy` decimal(18,2) DEFAULT '0.00',
				  `rotationz` decimal(18,2) DEFAULT '0.00',
				  `axispositionx` decimal(18,2) DEFAULT '0.00',
				  `axispositiony` decimal(18,2) DEFAULT '0.00',
				  `axispositionz` decimal(18,2) DEFAULT '0.00',
				  `axisrotationx` decimal(18,2) DEFAULT '0.00',
				  `axisrotationy` decimal(18,2) DEFAULT '0.00',
				  `axisrotationz` decimal(18,2) DEFAULT '0.00',
				  `rotateaxis` varchar(1) DEFAULT 'y',
				  `rotatedegrees` decimal(18,2) DEFAULT '90.00',
				  `rotatedirection` int DEFAULT '1',
				  `rotatespeed` decimal(18,2) DEFAULT '1.00',
				  `value1` decimal(18,2) DEFAULT '0.00',
				  `value2` decimal(18,2) DEFAULT '0.00',
				  `defaulteditform` int DEFAULT '0',
				  `jsfunction` varchar(255) DEFAULT '',
				  `jsparameters` varchar(255) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`actionzoneid`),
				  UNIQUE KEY `".wtw_tableprefix."actionzoneid_UNIQUE` (`actionzoneid`),
				  KEY `".wtw_tableprefix."actionzones_webid` (`communityid`,`buildingid`,`thingid`,`loadactionzoneid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;				
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."apikeys` (
				  `apikeyid` varchar(16) NOT NULL,
				  `appid` varchar(32) DEFAULT '',
				  `appname` varchar(255) DEFAULT '',
				  `appurl` varchar(255) DEFAULT '',
				  `wtwkey` varchar(255) DEFAULT '',
				  `wtwsecret` varchar(255) DEFAULT '',
				  `approved` int DEFAULT '0',
				  `approveddate` datetime DEFAULT NULL,
				  `approveduserid` varchar(16) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`apikeyid`),
				  UNIQUE KEY `".wtw_tableprefix."apikeyid_UNIQUE` (`apikeyid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."avataranimationevents` (
				  `animationeventid` varchar(16) NOT NULL,
				  `animationevent` varchar(45) NOT NULL,
				  `loadpriority` int DEFAULT '0',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`animationeventid`),
				  UNIQUE KEY `".wtw_tableprefix."animationeventid_UNIQUE` (`animationeventid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."avataranimations` (
				  `avataranimationid` varchar(16) NOT NULL,
				  `pastavataranimationid` varchar(16) DEFAULT '',
				  `avatarid` varchar(16) DEFAULT '',
				  `userid` varchar(16) DEFAULT '',
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
				  UNIQUE KEY `".wtw_tableprefix."avataranimationid_UNIQUE` (`avataranimationid`),
				  KEY `".wtw_tableprefix."idx_avataranimations` (`userid`,`loadpriority`,`soundid`,`animationevent`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;				
			");
			$wtwdb->deltaCreateTable("			
				CREATE TABLE `".wtw_tableprefix."avatarcolors` (
				  `avatarpartid` varchar(16) NOT NULL,
				  `pastavatarpartid` varchar(16) DEFAULT '',
				  `avatarid` varchar(16) NOT NULL,
				  `avatarpart` varchar(255) DEFAULT '',
				  `diffusecolor` varchar(7) DEFAULT '',
				  `specularcolor` varchar(7) DEFAULT '',
				  `emissivecolor` varchar(7) DEFAULT '',
				  `ambientcolor` varchar(7) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`avatarpartid`),
				  UNIQUE KEY `".wtw_tableprefix."avatarcolorid_unique` (`avatarpartid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."avatargroups` (
				  `avatargroupid` varchar(16) NOT NULL,
				  `avatargroup` varchar(255) NOT NULL,
				  `hostuserid` varchar(16) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`avatargroupid`),
				  UNIQUE KEY `".wtw_tableprefix."avatargroupid_UNIQUE` (`avatargroupid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("			
				CREATE TABLE `".wtw_tableprefix."avatars` (
				  `avatarid` varchar(16) NOT NULL,
				  `pastavatarid` varchar(16) DEFAULT '',
				  `hostuserid` varchar(16) DEFAULT '',
				  `versionid` varchar(16) DEFAULT '',
				  `version` varchar(12) DEFAULT '1.0.0',
				  `versionorder` int DEFAULT '1000000',
				  `versiondesc` varchar(255) DEFAULT 'Initial Version',
				  `avatargroup` varchar(64) DEFAULT 'Default',
				  `displayname` varchar(255) DEFAULT '',
				  `avatardescription` varchar(255) DEFAULT '',
				  `objectfolder` varchar(255) DEFAULT '',
				  `objectfile` varchar(255) DEFAULT '',
				  `gender` varchar(25) DEFAULT 'female',
				  `positionx` decimal(18,2) DEFAULT '0.00',
				  `positiony` decimal(18,2) DEFAULT '0.00',
				  `positionz` decimal(18,2) DEFAULT '0.00',
				  `scalingx` decimal(18,4) DEFAULT '1.0000',
				  `scalingy` decimal(18,4) DEFAULT '1.0000',
				  `scalingz` decimal(18,4) DEFAULT '1.0000',
				  `rotationx` decimal(18,2) DEFAULT '0.00',
				  `rotationy` decimal(18,2) DEFAULT '0.00',
				  `rotationz` decimal(18,2) DEFAULT '0.00',
				  `startframe` int DEFAULT '0',
				  `endframe` int DEFAULT '0',
				  `sortorder` int DEFAULT '5',
				  `templatename` varchar(255) DEFAULT '',
				  `description` mediumtext,
				  `tags` varchar(255) DEFAULT '',
				  `snapshotid` varchar(16) DEFAULT '9ojnm6zhejix2ls6',
				  `shareuserid` varchar(16) DEFAULT '',
				  `sharehash` varchar(255) DEFAULT '',
				  `sharetemplatedate` datetime DEFAULT NULL,
				  `alttag` varchar(255) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`avatarid`),
				  UNIQUE KEY `".wtw_tableprefix."avatarid_UNIQUE` (`avatarid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;			
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."avatarsingroups` (
				  `avatarsingroupid` varchar(16) NOT NULL,
				  `avatarid` varchar(16) DEFAULT '',
				  `avatargroupid` varchar(16) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`avatarsingroupid`),
				  UNIQUE KEY `".wtw_tableprefix."avatarsingroupid_UNIQUE` (`avatarsingroupid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."buildingmolds` (
				  `buildingmoldid` varchar(16) NOT NULL,
				  `pastbuildingmoldid` varchar(16) DEFAULT '',
				  `buildingid` varchar(16) DEFAULT '',
				  `loadactionzoneid` varchar(16) DEFAULT '',
				  `unloadactionzoneid` varchar(16) DEFAULT '',
				  `shape` varchar(45) DEFAULT 'box',
				  `covering` varchar(255) DEFAULT 'texture',
				  `positionx` decimal(18,2) DEFAULT '0.00',
				  `positiony` decimal(18,2) DEFAULT '0.00',
				  `positionz` decimal(18,2) DEFAULT '0.00',
				  `scalingx` decimal(18,2) DEFAULT '1.00',
				  `scalingy` decimal(18,2) DEFAULT '1.00',
				  `scalingz` decimal(18,2) DEFAULT '1.00',
				  `rotationx` decimal(18,2) DEFAULT '0.00',
				  `rotationy` decimal(18,2) DEFAULT '0.00',
				  `rotationz` decimal(18,2) DEFAULT '0.00',
				  `special1` decimal(18,2) DEFAULT '0.00',
				  `special2` decimal(18,2) DEFAULT '0.00',
				  `uoffset` decimal(18,2) DEFAULT '0.00',
				  `voffset` decimal(18,2) DEFAULT '0.00',
				  `uscale` decimal(18,2) DEFAULT '0.00',
				  `vscale` decimal(18,2) DEFAULT '0.00',
				  `uploadobjectid` varchar(16) DEFAULT '',
				  `graphiclevel` int DEFAULT '0',
				  `textureid` varchar(16) DEFAULT '',
				  `texturebumpid` varchar(16) DEFAULT '',
				  `texturehoverid` varchar(16) DEFAULT '',
				  `videoid` varchar(16) DEFAULT '',
				  `videoposterid` varchar(16) DEFAULT '',
				  `diffusecolor` varchar(7) DEFAULT '',
				  `specularcolor` varchar(7) DEFAULT '',
				  `emissivecolor` varchar(7) DEFAULT '',
				  `ambientcolor` varchar(7) DEFAULT '',
				  `heightmapid` varchar(16) DEFAULT '',
				  `mixmapid` varchar(16) DEFAULT '',
				  `texturerid` varchar(16) DEFAULT '',
				  `texturegid` varchar(16) DEFAULT '',
				  `texturebid` varchar(16) DEFAULT '',
				  `texturebumprid` varchar(16) DEFAULT '',
				  `texturebumpgid` varchar(16) DEFAULT '',
				  `texturebumpbid` varchar(16) DEFAULT '',
				  `soundid` varchar(16) DEFAULT '',
				  `soundname` varchar(255) DEFAULT '',
				  `soundattenuation` varchar(12) DEFAULT 'none',
				  `soundloop` int DEFAULT '1',
				  `soundmaxdistance` decimal(18,2) DEFAULT '100.00',
				  `soundrollofffactor` decimal(18,2) DEFAULT '1.00',
				  `soundrefdistance` decimal(18,2) DEFAULT '1.00',
				  `soundconeinnerangle` decimal(18,2) DEFAULT '90.00',
				  `soundconeouterangle` decimal(18,2) DEFAULT '180.00',
				  `soundconeoutergain` decimal(18,2) DEFAULT '0.50',
				  `webtext` mediumtext,
				  `webstyle` mediumtext,
				  `opacity` decimal(18,2) DEFAULT '100.00',
				  `sideorientation` varchar(10) DEFAULT 'default',
				  `billboard` int DEFAULT '0',
				  `waterreflection` int DEFAULT '0',
				  `receiveshadows` int DEFAULT '0',
				  `subdivisions` int DEFAULT '2',
				  `minheight` int DEFAULT '0',
				  `maxheight` int DEFAULT '30',
				  `checkcollisions` int DEFAULT '1',
				  `ispickable` int DEFAULT '1',
				  `actionzoneid` varchar(16) DEFAULT '',
				  `csgmoldid` varchar(16) DEFAULT '',
				  `csgaction` varchar(45) DEFAULT '',
				  `alttag` varchar(255) DEFAULT '',
				  `jsfunction` varchar(255) DEFAULT '',
				  `jsparameters` varchar(255) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`buildingmoldid`),
				  UNIQUE KEY `".wtw_tableprefix."buildingmoldid_UNIQUE` (`buildingmoldid`),
				  KEY `".wtw_tableprefix."buildingmolds_webid` (`buildingid`,`loadactionzoneid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."buildings` (
				  `buildingid` varchar(16) NOT NULL,
				  `pastbuildingid` varchar(16) DEFAULT '',
				  `hostuserid` varchar(16) DEFAULT '',
				  `versionid` varchar(16) DEFAULT '',
				  `version` varchar(12) DEFAULT '1.0.0',
				  `versionorder` int DEFAULT '1000000',
				  `versiondesc` varchar(255) DEFAULT 'Initial Version',
				  `downloadparentwebid` varchar(16) DEFAULT '',
				  `downloadparentwebtype` varchar(16) DEFAULT '',
				  `analyticsid` varchar(16) DEFAULT '',
				  `buildingname` varchar(255) DEFAULT '',
				  `buildingdescription` varchar(255) DEFAULT '',
				  `userid` varchar(16) DEFAULT '',
				  `positionx` decimal(18,2) DEFAULT '-80.00',
				  `positiony` decimal(18,2) DEFAULT '9.00',
				  `positionz` decimal(18,2) DEFAULT '40.00',
				  `scalingx` decimal(18,2) DEFAULT '1.00',
				  `scalingy` decimal(18,2) DEFAULT '1.00',
				  `scalingz` decimal(18,2) DEFAULT '1.00',
				  `rotationx` decimal(18,2) DEFAULT '-5.00',
				  `rotationy` decimal(18,2) DEFAULT '100.00',
				  `rotationz` decimal(18,2) DEFAULT '0.00',
				  `spawnactionzoneid` varchar(16) DEFAULT '',
				  `gravity` decimal(18,2) DEFAULT '9.80',
				  `templatename` varchar(255) DEFAULT '',
				  `description` mediumtext,
				  `tags` varchar(255) DEFAULT '',
				  `snapshotid` varchar(16) DEFAULT '9ojnm6zhejix2ls6',
				  `shareuserid` varchar(16) DEFAULT '',
				  `sharehash` varchar(255) DEFAULT '',
				  `sharetemplatedate` datetime DEFAULT NULL,
				  `alttag` varchar(255) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`buildingid`),
				  UNIQUE KEY `".wtw_tableprefix."buildingid_UNIQUE` (`buildingid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."communities` (
				  `communityid` varchar(16) NOT NULL,
				  `pastcommunityid` varchar(16) DEFAULT '',
				  `hostuserid` varchar(16) DEFAULT '',
				  `versionid` varchar(16) DEFAULT '',
				  `version` varchar(12) DEFAULT '1.0.0',
				  `versionorder` int DEFAULT '1000000',
				  `versiondesc` varchar(255) DEFAULT 'Initial Version',
				  `downloadparentwebid` varchar(16) DEFAULT '',
				  `downloadparentwebtype` varchar(16) DEFAULT '',
				  `analyticsid` varchar(16) DEFAULT '',
				  `communityname` varchar(255) NOT NULL DEFAULT '',
				  `communitydescription` varchar(255) NOT NULL DEFAULT '',
				  `userid` varchar(16) DEFAULT '',
				  `positionx` decimal(18,2) DEFAULT '0.00',
				  `positiony` decimal(18,2) DEFAULT '9.50',
				  `positionz` decimal(18,2) DEFAULT '-20.00',
				  `scalingx` decimal(18,2) DEFAULT '1.00',
				  `scalingy` decimal(18,2) DEFAULT '1.00',
				  `scalingz` decimal(18,2) DEFAULT '1.00',
				  `rotationx` decimal(18,2) DEFAULT '0.00',
				  `rotationy` decimal(18,2) DEFAULT '0.00',
				  `rotationz` decimal(18,2) DEFAULT '0.00',
				  `spawnactionzoneid` varchar(16) DEFAULT '',
				  `gravity` decimal(18,2) DEFAULT '9.80',
				  `groundpositiony` decimal(18,2) DEFAULT '0.00',
				  `waterpositiony` decimal(18,2) DEFAULT '-1.00',
				  `textureid` varchar(16) DEFAULT '61pcl0adyqrn016u',
				  `skydomeid` varchar(16) DEFAULT 'hlgliuml61pg4a1b',
				  `waterbumpid` varchar(16) DEFAULT '',
				  `sceneambientcolor` varchar(7) DEFAULT '#ffffff',
				  `sceneclearcolor` varchar(7) DEFAULT '#000000',
				  `sceneuseclonedmeshmap` int DEFAULT '1',
				  `sceneblockmaterialdirtymechanism` int DEFAULT '1',
				  `scenefogenabled` int DEFAULT '0',
				  `scenefogmode` varchar(25) DEFAULT '',
				  `scenefogdensity` decimal(18,2) DEFAULT '0.01',
				  `scenefogstart` decimal(18,2) DEFAULT '20',
				  `scenefogend` decimal(18,2) DEFAULT '60',
				  `scenefogcolor` varchar(7) DEFAULT '#c0c0c0',
				  `sundirectionalintensity` decimal(18,2) DEFAULT '1',
				  `sundiffusecolor` varchar(7) DEFAULT '#ffffff',
				  `sunspecularcolor` varchar(7) DEFAULT '#ffffff',
				  `sungroundcolor` varchar(7) DEFAULT '#000000',
				  `sundirectionx` decimal(18,2) DEFAULT '999',
				  `sundirectiony` decimal(18,2) DEFAULT '-999',
				  `sundirectionz` decimal(18,2) DEFAULT '999',
				  `backlightintensity` decimal(18,2) DEFAULT '0.5',
				  `backlightdirectionx` decimal(18,2) DEFAULT '-999',
				  `backlightdirectiony` decimal(18,2) DEFAULT '999',
				  `backlightdirectionz` decimal(18,2) DEFAULT '-999',
				  `backlightdiffusecolor` varchar(7) DEFAULT '#ffffff',
				  `backlightspecularcolor` varchar(7) DEFAULT '#ffffff',
				  `skytype` varchar(45) DEFAULT '',
				  `skysize` decimal(18,2) DEFAULT '5000.00',
				  `skyboxfolder` varchar(255) DEFAULT '',
				  `skyboxfile` varchar(255) DEFAULT '',
				  `skyboximageleft` varchar(255) DEFAULT '',
				  `skyboximageup` varchar(255) DEFAULT '',
				  `skyboximagefront` varchar(255) DEFAULT '',
				  `skyboximageright` varchar(255) DEFAULT '',
				  `skyboximagedown` varchar(255) DEFAULT '',
				  `skyboximageback` varchar(255) DEFAULT '',
				  `skypositionoffsetx` decimal(18,2) DEFAULT '0',
				  `skypositionoffsety` decimal(18,2) DEFAULT '0',
				  `skypositionoffsetz` decimal(18,2) DEFAULT '0',
				  `skyboxmicrosurface` decimal(18,2) DEFAULT '1',
				  `skyboxpbr` int DEFAULT '0',
				  `skyboxasenvironmenttexture` int DEFAULT '0',
				  `skyboxblur` decimal(18,2) DEFAULT '0',
				  `skyboxdiffusecolor` varchar(7) DEFAULT '#000000',
				  `skyboxspecularcolor` varchar(7) DEFAULT '#000000',
				  `skyboxambientcolor` varchar(7) DEFAULT '#000000',
				  `skyboxemissivecolor` varchar(7) DEFAULT '#000000',
				  `skyinclination` decimal(18,2) DEFAULT '0.00',
				  `skyluminance` decimal(18,2) DEFAULT '1.00',
				  `skyazimuth` decimal(18,2) DEFAULT '0.25',
				  `skyrayleigh` decimal(18,2) DEFAULT '2.00',
				  `skyturbidity` decimal(18,2) DEFAULT '10.00',
				  `skymiedirectionalg` decimal(18,2) DEFAULT '0.80',
				  `skymiecoefficient` decimal(18,3) DEFAULT '0.008',
				  `waterbumpheight` decimal(18,2) DEFAULT '0.6',
				  `watersubdivisions` decimal(18,2) DEFAULT '2',
				  `windforce` decimal(18,2) DEFAULT '-10',
				  `winddirectionx` decimal(18,2) DEFAULT '1',
				  `winddirectiony` decimal(18,2) DEFAULT '0',
				  `winddirectionz` decimal(18,2) DEFAULT '1',
				  `waterwaveheight` decimal(18,2) DEFAULT '0.2',
				  `waterwavelength` decimal(18,2) DEFAULT '0.02',
				  `watercolorrefraction` varchar(7) DEFAULT '#23749c',
				  `watercolorreflection` varchar(7) DEFAULT '#52bcf1',
				  `watercolorblendfactor` decimal(18,2) DEFAULT '0.2',
				  `watercolorblendfactor2` decimal(18,2) DEFAULT '0.2',
				  `wateralpha` decimal(18,2) DEFAULT '0.9',
				  `templatename` varchar(255) DEFAULT '',
				  `description` mediumtext,
				  `tags` varchar(255) DEFAULT '',
				  `snapshotid` varchar(16) DEFAULT '9ojnm6zhejix2ls6',
				  `shareuserid` varchar(16) DEFAULT '',
				  `sharehash` varchar(255) DEFAULT '',
				  `sharetemplatedate` datetime DEFAULT NULL,
				  `alttag` varchar(255) DEFAULT '',
				  `buildingpositionx` decimal(18,2) DEFAULT '0.00',
				  `buildingpositiony` decimal(18,2) DEFAULT '0.00',
				  `buildingpositionz` decimal(18,2) DEFAULT '0.00',
				  `buildingscalingx` decimal(18,2) DEFAULT '1.00',
				  `buildingscalingy` decimal(18,2) DEFAULT '1.00',
				  `buildingscalingz` decimal(18,2) DEFAULT '1.00',
				  `buildingrotationx` decimal(18,2) DEFAULT '0.00',
				  `buildingrotationy` decimal(18,2) DEFAULT '0.00',
				  `buildingrotationz` decimal(18,2) DEFAULT '0.00',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`communityid`),
				  UNIQUE KEY `".wtw_tableprefix."communityid_UNIQUE` (`communityid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."communitymolds` (
				  `communitymoldid` varchar(16) NOT NULL,
				  `pastcommunitymoldid` varchar(16) DEFAULT '',
				  `communityid` varchar(16) DEFAULT '',
				  `loadactionzoneid` varchar(16) DEFAULT '',
				  `unloadactionzoneid` varchar(16) DEFAULT '',
				  `shape` varchar(45) DEFAULT 'box',
				  `covering` varchar(255) DEFAULT 'texture',
				  `positionx` decimal(18,2) DEFAULT '0.00',
				  `positiony` decimal(18,2) DEFAULT '0.00',
				  `positionz` decimal(18,2) DEFAULT '0.00',
				  `scalingx` decimal(18,2) DEFAULT '1.00',
				  `scalingy` decimal(18,2) DEFAULT '1.00',
				  `scalingz` decimal(18,2) DEFAULT '1.00',
				  `rotationx` decimal(18,2) DEFAULT '0.00',
				  `rotationy` decimal(18,2) DEFAULT '0.00',
				  `rotationz` decimal(18,2) DEFAULT '0.00',
				  `special1` decimal(18,2) DEFAULT '0.00',
				  `special2` decimal(18,2) DEFAULT '0.00',
				  `uoffset` decimal(18,2) DEFAULT '0.00',
				  `voffset` decimal(18,2) DEFAULT '0.00',
				  `uscale` decimal(18,2) DEFAULT '0.00',
				  `vscale` decimal(18,2) DEFAULT '0.00',
				  `uploadobjectid` varchar(16) DEFAULT '',
				  `graphiclevel` int DEFAULT '0',
				  `textureid` varchar(16) DEFAULT '',
				  `texturebumpid` varchar(16) DEFAULT '',
				  `texturehoverid` varchar(16) DEFAULT '',
				  `videoid` varchar(16) DEFAULT '',
				  `videoposterid` varchar(16) DEFAULT '',
				  `diffusecolor` varchar(7) DEFAULT '',
				  `specularcolor` varchar(7) DEFAULT '',
				  `emissivecolor` varchar(7) DEFAULT '',
				  `ambientcolor` varchar(7) DEFAULT '',
				  `heightmapid` varchar(16) DEFAULT '',
				  `mixmapid` varchar(16) DEFAULT '',
				  `texturerid` varchar(16) DEFAULT '',
				  `texturegid` varchar(16) DEFAULT '',
				  `texturebid` varchar(16) DEFAULT '',
				  `texturebumprid` varchar(16) DEFAULT '',
				  `texturebumpgid` varchar(16) DEFAULT '',
				  `texturebumpbid` varchar(16) DEFAULT '',
				  `soundid` varchar(16) DEFAULT '',
				  `soundname` varchar(255) DEFAULT '',
				  `soundattenuation` varchar(12) DEFAULT 'none',
				  `soundloop` int DEFAULT '1',
				  `soundmaxdistance` decimal(18,2) DEFAULT '100.00',
				  `soundrollofffactor` decimal(18,2) DEFAULT '1.00',
				  `soundrefdistance` decimal(18,2) DEFAULT '1.00',
				  `soundconeinnerangle` decimal(18,2) DEFAULT '90.00',
				  `soundconeouterangle` decimal(18,2) DEFAULT '180.00',
				  `soundconeoutergain` decimal(18,2) DEFAULT '0.50',
				  `webtext` mediumtext,
				  `webstyle` mediumtext,
				  `opacity` decimal(18,2) DEFAULT '100.00',
				  `sideorientation` varchar(10) DEFAULT 'default',
				  `billboard` int DEFAULT '0',
				  `waterreflection` int DEFAULT '0',
				  `receiveshadows` int DEFAULT '0',
				  `subdivisions` int DEFAULT '2',
				  `minheight` int DEFAULT '0',
				  `maxheight` int DEFAULT '30',
				  `checkcollisions` int DEFAULT '1',
				  `ispickable` int DEFAULT '1',
				  `actionzoneid` varchar(16) DEFAULT '',
				  `csgmoldid` varchar(16) DEFAULT '',
				  `csgaction` varchar(45) DEFAULT '',
				  `alttag` varchar(255) DEFAULT '',
				  `jsfunction` varchar(255) DEFAULT '',
				  `jsparameters` varchar(255) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`communitymoldid`),
				  UNIQUE KEY `".wtw_tableprefix."communitymoldid_UNIQUE` (`communitymoldid`),
				  KEY `".wtw_tableprefix."communitymolds_webid` (`communityid`,`loadactionzoneid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."connectinggrids` (
				  `connectinggridid` varchar(16) NOT NULL,
				  `pastconnectinggridid` varchar(16) DEFAULT '',
				  `parentserverfranchiseid` varchar(32) DEFAULT '',
				  `parentwebid` varchar(16) DEFAULT '',
				  `parentwebtype` varchar(16) DEFAULT '',
				  `childserverfranchiseid` varchar(32) DEFAULT '',
				  `childwebid` varchar(16) DEFAULT '',
				  `childwebtype` varchar(16) DEFAULT '',
				  `positionx` decimal(18,2) DEFAULT '0.00',
				  `positiony` decimal(18,2) DEFAULT '0.00',
				  `positionz` decimal(18,2) DEFAULT '0.00',
				  `scalingx` decimal(18,2) DEFAULT '1.00',
				  `scalingy` decimal(18,2) DEFAULT '1.00',
				  `scalingz` decimal(18,2) DEFAULT '1.00',
				  `rotationx` decimal(18,2) DEFAULT '0.00',
				  `rotationy` decimal(18,2) DEFAULT '0.00',
				  `rotationz` decimal(18,2) DEFAULT '0.00',
				  `loadactionzoneid` varchar(16) DEFAULT '',
				  `altloadactionzoneid` varchar(16) DEFAULT '',
				  `unloadactionzoneid` varchar(16) DEFAULT '',
				  `attachactionzoneid` varchar(16) DEFAULT '',
				  `alttag` varchar(255) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`connectinggridid`),
				  UNIQUE KEY `".wtw_tableprefix."connectinggridid_UNIQUE` (`connectinggridid`),
				  KEY `".wtw_tableprefix."connectinggrids_webid` (`parentwebid`,`childwebid`,`loadactionzoneid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."contentratings` (
				  `contentratingid` varchar(16) NOT NULL,
				  `pastcontentratingid` varchar(16) DEFAULT '',
				  `webid` varchar(16) DEFAULT NULL,
				  `webtype` varchar(45) DEFAULT '',
				  `rating` varchar(10) DEFAULT NULL,
				  `ratingvalue` int DEFAULT NULL,
				  `contentwarning` varchar(1024) DEFAULT NULL,
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`contentratingid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("			
				CREATE TABLE `".wtw_tableprefix."downloads` (
				  `downloadid` varchar(16) NOT NULL,
				  `webid` varchar(16) DEFAULT NULL,
				  `webtype` varchar(16) DEFAULT NULL,
				  `userip` varchar(45) DEFAULT NULL,
				  `fromurl` varchar(255) DEFAULT NULL,
				  `downloaddate` datetime DEFAULT NULL,
				  `downloaduserid` varchar(16) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`downloadid`),
				  UNIQUE KEY `".wtw_tableprefix."downloadid_UNIQUE` (`downloadid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;			
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."errorlog` (
				  `errorid` int NOT NULL AUTO_INCREMENT,
				  `logdate` datetime DEFAULT NULL,
				  `message` varchar(2048) DEFAULT '',
				  `intvalue` int DEFAULT NULL,
				  `decimalvalue` decimal(18,2) DEFAULT NULL,
				  `archivedate` datetime DEFAULT NULL,
				  PRIMARY KEY (`errorid`),
				  UNIQUE KEY `".wtw_tableprefix."errorid_UNIQUE` (`errorid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;				
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."feedback` (
				  `feedbackid` VARCHAR(32) NOT NULL,
				  `url` VARCHAR(255) NULL DEFAULT '',
				  `domainurl` VARCHAR(255) NULL DEFAULT '',
				  `wtwversion` VARCHAR(45) NULL DEFAULT '',
				  `communityid` VARCHAR(16) NULL DEFAULT '',
				  `buildingid` VARCHAR(16) NULL DEFAULT '',
				  `thingid` VARCHAR(16) NULL DEFAULT '',
				  `feedbacktype` VARCHAR(45) NULL DEFAULT '',
				  `category` VARCHAR(45) NULL DEFAULT '',
				  `subject` VARCHAR(255) NULL DEFAULT '',
				  `message` VARCHAR(2048) NULL DEFAULT '',
				  `snapshoturl` VARCHAR(255) NULL DEFAULT '',
				  `feedbackname` VARCHAR(255) NULL DEFAULT '',
				  `displayname` VARCHAR(255) NULL DEFAULT '',
				  `feedbackemail` VARCHAR(255) NULL DEFAULT '',
				  `useremail` VARCHAR(255) NULL DEFAULT '',
				  `userid` VARCHAR(16) NULL DEFAULT '',
				  `userip` VARCHAR(45) NULL DEFAULT '',
				  `instanceid` VARCHAR(25) NULL DEFAULT '',
				  `globaluserid` VARCHAR(16) NULL DEFAULT '',
				  `usertoken` VARCHAR(1024) NULL DEFAULT '',
				  `uploadpathid` VARCHAR(16) NULL DEFAULT '',
				  `globaluseravatarid` VARCHAR(32) NULL DEFAULT '',
				  `useravatarid` VARCHAR(16) NULL DEFAULT '',
				  `viewdate` DATETIME DEFAULT NULL,
				  `feedbackdate` DATETIME DEFAULT NULL,
				  `archivedate` DATETIME DEFAULT NULL,
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`feedbackid`),
				  UNIQUE KEY `".wtw_tableprefix."feedbackid_UNIQUE` (`feedbackid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."invoices` (
				  `invoiceid` varchar(16) NOT NULL,
				  `hostuserid` varchar(16) DEFAULT '',
				  `domainname` varchar(255) DEFAULT '',
				  `userid` varchar(16) DEFAULT '',
				  `userip` varchar(45) DEFAULT '',
				  `email` varchar(255) DEFAULT '',
				  `invoicedate` datetime DEFAULT NULL,
				  `invoicedescription` varchar(255) DEFAULT '',
				  `invoicetotal` decimal(18,2) DEFAULT '0',
				  `paiddate` datetime DEFAULT NULL,
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int(11) DEFAULT '0',
				  PRIMARY KEY (`invoiceid`),
				  UNIQUE KEY `".wtw_tableprefix."invoiceid_UNIQUE` (`invoiceid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			"); 
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."invoicedetails` (
				  `invoicedetailid` varchar(16) NOT NULL,
				  `invoiceid` varchar(16) NOT NULL,
				  `sortorder` int DEFAULT '0',
				  `quantity` int DEFAULT '1',
				  `description` varchar(255) DEFAULT '',
				  `price` decimal(18,2) DEFAULT '0',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int(11) DEFAULT '0',
				  PRIMARY KEY (`invoicedetailid`),
				  UNIQUE KEY `".wtw_tableprefix."invoicedetailid_UNIQUE` (`invoicedetailid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			"); 
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."menuitems` (
				  `menuitemid` int NOT NULL AUTO_INCREMENT,
				  `menuitemname` varchar(255) DEFAULT '',
				  `menutext` varchar(255) DEFAULT 'Menu Item',
				  `menuset` varchar(45) DEFAULT 'main',
				  `menualignment` varchar(45) DEFAULT 'left',
				  `menuorder` int DEFAULT '10',
				  `menulevel` int DEFAULT '1',
				  `menuiconid` varchar(16) DEFAULT '',
				  `menuicon` varchar(255) DEFAULT '',
				  `menuaction` varchar(255) DEFAULT '',
				  `menuproperty` varchar(255) DEFAULT '',
				  `menusecurity` int DEFAULT '1',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`menuitemid`),
				  UNIQUE KEY `".wtw_tableprefix."menuitems_UNIQUE` (`menuitemid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."moldpoints` (
				  `moldpointid` varchar(16) NOT NULL,
				  `pastmoldpointid` varchar(16) DEFAULT '',
				  `moldid` varchar(16) DEFAULT '',
				  `pathnumber` int DEFAULT '1',
				  `sorder` int DEFAULT '0',
				  `positionx` decimal(18,2) DEFAULT '0.00',
				  `positiony` decimal(18,2) DEFAULT '0.00',
				  `positionz` decimal(18,2) DEFAULT '0.00',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`moldpointid`),
				  UNIQUE KEY `".wtw_tableprefix."moldpointid_UNIQUE` (`moldpointid`),
				  KEY `".wtw_tableprefix."moldpoints_webid` (`moldid`,`pathnumber`,`sorder`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."optionalupgrades` (
				  `optionalid` varchar(16) NOT NULL,
				  `title` varchar(255) DEFAULT NULL,
				  `instructions` varchar(255) DEFAULT '',
				  `description` varchar(255) DEFAULT '',
				  `serverwide` int DEFAULT '0',
				  `hostwide` int DEFAULT '0',
				  `domainwide` int DEFAULT '0',
				  `subscription` int DEFAULT '0',
				  `startprice` decimal(18,2) DEFAULT '0.00',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`optionalid`),
				  UNIQUE KEY `".wtw_tableprefix."optionalid_UNIQUE` (`optionalid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."optionalupgradesapplied` (
				  `appliedid` varchar(16) NOT NULL,
				  `optionalid` varchar(16) DEFAULT NULL,
				  `hostuserid` varchar(16) DEFAULT '',
				  `activedate` datetime DEFAULT NULL,
				  `expiredate` datetime DEFAULT NULL,
				  `price` decimal(18,2) DEFAULT '0.00',
				  `domainname` varchar(255) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`appliedid`),
				  UNIQUE KEY `".wtw_tableprefix."appliedid_UNIQUE` (`appliedid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."plugins` (
				  `pluginname` varchar(255) NOT NULL,
				  `active` int DEFAULT '0',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`pluginname`),
				  UNIQUE KEY `".wtw_tableprefix."pluginname_UNIQUE` (`pluginname`),
				  KEY `".wtw_tableprefix."idx_wtw_pluginnames` (`pluginname`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."pluginsrequired` (
				  `pluginsrequiredid` varchar(16) NOT NULL DEFAULT '',
				  `pastpluginsrequiredid` varchar(16) DEFAULT '',
				  `webid` varchar(16) DEFAULT '',
				  `webtype` varchar(16) DEFAULT '',
				  `pluginname` varchar(255) DEFAULT '',
				  `optional` int DEFAULT '0',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`pluginsrequiredid`),
				  UNIQUE KEY `".wtw_tableprefix."pluginsrequiredid_UNIQUE` (`pluginsrequiredid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."roles` (
				  `roleid` varchar(16) NOT NULL,
				  `rolename` varchar(45) NOT NULL,
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`roleid`),
				  UNIQUE KEY `".wtw_tableprefix."roleid_UNIQUE` (`roleid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("			
				CREATE TABLE `".wtw_tableprefix."scripts` (
				  `scriptid` varchar(16) NOT NULL,
				  `pastscriptid` varchar(16) DEFAULT '',
				  `actionzoneid` varchar(16) DEFAULT '',
				  `webtype` varchar(15) DEFAULT '',
				  `webid` varchar(16) DEFAULT '',
				  `scriptname` varchar(255) DEFAULT '',
				  `scriptpath` varchar(255) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`scriptid`),
				  UNIQUE KEY `".wtw_tableprefix."scriptid_UNIQUE` (`scriptid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;			
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."settings` (
				  `settingid` bigint(22) NOT NULL AUTO_INCREMENT,
				  `settingname` varchar(255) NOT NULL,
				  `settingvalue` varchar(255) NOT NULL,
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`settingid`),
				  UNIQUE KEY `".wtw_tableprefix."settingid_UNIQUE` (`settingid`),
				  KEY `".wtw_tableprefix."idx_settings_settingname` (`settingname`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."thingmolds` (
				  `thingmoldid` varchar(16) NOT NULL,
				  `pastthingmoldid` varchar(16) DEFAULT '',
				  `thingid` varchar(16) DEFAULT '',
				  `loadactionzoneid` varchar(16) DEFAULT '',
				  `unloadactionzoneid` varchar(16) DEFAULT '',
				  `shape` varchar(45) DEFAULT 'box',
				  `covering` varchar(255) DEFAULT 'texture',
				  `positionx` decimal(18,2) DEFAULT '0.00',
				  `positiony` decimal(18,2) DEFAULT '0.00',
				  `positionz` decimal(18,2) DEFAULT '0.00',
				  `scalingx` decimal(18,2) DEFAULT '1.00',
				  `scalingy` decimal(18,2) DEFAULT '1.00',
				  `scalingz` decimal(18,2) DEFAULT '1.00',
				  `rotationx` decimal(18,2) DEFAULT '0.00',
				  `rotationy` decimal(18,2) DEFAULT '0.00',
				  `rotationz` decimal(18,2) DEFAULT '0.00',
				  `special1` decimal(18,2) DEFAULT '0.00',
				  `special2` decimal(18,2) DEFAULT '0.00',
				  `uoffset` decimal(18,2) DEFAULT '0.00',
				  `voffset` decimal(18,2) DEFAULT '0.00',
				  `uscale` decimal(18,2) DEFAULT '0.00',
				  `vscale` decimal(18,2) DEFAULT '0.00',
				  `uploadobjectid` varchar(16) DEFAULT '',
				  `graphiclevel` int DEFAULT '0',
				  `textureid` varchar(16) DEFAULT '',
				  `texturebumpid` varchar(16) DEFAULT '',
				  `texturehoverid` varchar(16) DEFAULT '',
				  `videoid` varchar(16) DEFAULT '',
				  `videoposterid` varchar(16) DEFAULT '',
				  `diffusecolor` varchar(7) DEFAULT '',
				  `specularcolor` varchar(7) DEFAULT '',
				  `emissivecolor` varchar(7) DEFAULT '',
				  `ambientcolor` varchar(7) DEFAULT '',
				  `heightmapid` varchar(16) DEFAULT '',
				  `mixmapid` varchar(16) DEFAULT '',
				  `texturerid` varchar(16) DEFAULT '',
				  `texturegid` varchar(16) DEFAULT '',
				  `texturebid` varchar(16) DEFAULT '',
				  `texturebumprid` varchar(16) DEFAULT '',
				  `texturebumpgid` varchar(16) DEFAULT '',
				  `texturebumpbid` varchar(16) DEFAULT '',
				  `soundid` varchar(16) DEFAULT '',
				  `soundname` varchar(255) DEFAULT '',
				  `soundattenuation` varchar(12) DEFAULT 'none',
				  `soundloop` int DEFAULT '1',
				  `soundmaxdistance` decimal(18,2) DEFAULT '100.00',
				  `soundrollofffactor` decimal(18,2) DEFAULT '1.00',
				  `soundrefdistance` decimal(18,2) DEFAULT '1.00',
				  `soundconeinnerangle` decimal(18,2) DEFAULT '90.00',
				  `soundconeouterangle` decimal(18,2) DEFAULT '180.00',
				  `soundconeoutergain` decimal(18,2) DEFAULT '0.50',
				  `webtext` mediumtext,
				  `webstyle` mediumtext,
				  `opacity` decimal(18,2) DEFAULT '100.00',
				  `sideorientation` varchar(10) DEFAULT 'default',
				  `billboard` int DEFAULT '0',
				  `waterreflection` int DEFAULT '0',
				  `receiveshadows` int DEFAULT '0',
				  `subdivisions` int DEFAULT '2',
				  `minheight` int DEFAULT '0',
				  `maxheight` int DEFAULT '30',
				  `checkcollisions` int DEFAULT '1',
				  `ispickable` int DEFAULT '1',
				  `actionzoneid` varchar(16) DEFAULT '',
				  `csgmoldid` varchar(16) DEFAULT '',
				  `csgaction` varchar(45) DEFAULT '',
				  `alttag` varchar(255) DEFAULT '',
				  `jsfunction` varchar(255) DEFAULT '',
				  `jsparameters` varchar(255) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`thingmoldid`),
				  UNIQUE KEY `".wtw_tableprefix."thingmoldid_UNIQUE` (`thingmoldid`),
				  KEY `".wtw_tableprefix."thingmolds_webid` (`thingid`,`loadactionzoneid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."things` (
				  `thingid` varchar(16) NOT NULL,
				  `pastthingid` varchar(16) DEFAULT '',
				  `hostuserid` varchar(16) DEFAULT '',
				  `versionid` varchar(16) DEFAULT '',
				  `version` varchar(12) DEFAULT '1.0.0',
				  `versionorder` int DEFAULT '1000000',
				  `versiondesc` varchar(255) DEFAULT 'Initial Version',
				  `downloadparentwebid` varchar(16) DEFAULT '',
				  `downloadparentwebtype` varchar(16) DEFAULT '',
				  `analyticsid` varchar(16) DEFAULT '',
				  `thingname` varchar(255) DEFAULT '',
				  `thingdescription` varchar(255) DEFAULT '',
				  `userid` varchar(16) DEFAULT '',
				  `positionx` decimal(18,2) DEFAULT '-80.00',
				  `positiony` decimal(18,2) DEFAULT '9.00',
				  `positionz` decimal(18,2) DEFAULT '40.00',
				  `scalingx` decimal(18,2) DEFAULT '1.00',
				  `scalingy` decimal(18,2) DEFAULT '1.00',
				  `scalingz` decimal(18,2) DEFAULT '1.00',
				  `rotationx` decimal(18,2) DEFAULT '-5.00',
				  `rotationy` decimal(18,2) DEFAULT '100.00',
				  `rotationz` decimal(18,2) DEFAULT '0.00',
				  `spawnactionzoneid` varchar(16) DEFAULT '',
				  `gravity` decimal(18,2) DEFAULT '9.80',
				  `templatename` varchar(255) DEFAULT '',
				  `description` mediumtext,
				  `tags` varchar(255) DEFAULT '',
				  `snapshotid` varchar(16) DEFAULT '9ojnm6zhejix2ls6',
				  `shareuserid` varchar(16) DEFAULT '',
				  `sharehash` varchar(255) DEFAULT '',
				  `sharetemplatedate` datetime DEFAULT NULL,
				  `alttag` varchar(255) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`thingid`),
				  UNIQUE KEY `".wtw_tableprefix."thingid_UNIQUE` (`thingid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."uploadobjectanimations` (
				  `objectanimationid` varchar(16) NOT NULL,
				  `pastobjectanimationid` varchar(16) DEFAULT '',
				  `uploadobjectid` varchar(16) DEFAULT '',
				  `userid` varchar(16) DEFAULT '',
				  `animationname` varchar(255) DEFAULT '',
				  `moldnamepart` varchar(255) DEFAULT '',
				  `moldevent` varchar(255) DEFAULT '',
				  `startframe` int DEFAULT '0',
				  `endframe` int DEFAULT '0',
				  `animationloop` int DEFAULT '1',
				  `speedratio` decimal(18,2) DEFAULT '1.00',
				  `animationendscript` varchar(255) DEFAULT '',
				  `animationendparameters` varchar(255) DEFAULT '',
				  `stopcurrentanimations` int DEFAULT '1',
				  `additionalscript` varchar(255) DEFAULT '',
				  `additionalparameters` varchar(255) DEFAULT '',
				  `soundid` varchar(16) DEFAULT '',
				  `soundmaxdistance` decimal(18,2) DEFAULT '100.00',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`objectanimationid`),
				  UNIQUE KEY `".wtw_tableprefix."objectanimationid_UNIQUE` (`objectanimationid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."uploadobjects` (
				  `uploadobjectid` varchar(16) NOT NULL,
				  `pastuploadobjectid` varchar(16) DEFAULT '',
				  `hostuserid` varchar(16) DEFAULT '',
				  `versionid` varchar(16) DEFAULT '',
				  `version` varchar(10) DEFAULT '1.0.0',
				  `versionorder` int DEFAULT '1000000',
				  `versiondesc` varchar(255) DEFAULT 'Initial Version',
				  `groupid` varchar(16) DEFAULT '',
				  `userid` varchar(16) DEFAULT '',
				  `objectfolder` varchar(255) DEFAULT '',
				  `objectfile` varchar(255) DEFAULT '',
				  `stock` int DEFAULT '0',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`uploadobjectid`),
				  UNIQUE KEY `".wtw_tableprefix."uploadobjectid_UNIQUE` (`uploadobjectid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."uploads` (
				  `uploadid` varchar(16) NOT NULL,
				  `pastuploadid` varchar(16) DEFAULT '',
				  `originalid` varchar(16) DEFAULT '',
				  `websizeid` varchar(16) DEFAULT '',
				  `thumbnailid` varchar(16) DEFAULT '',
				  `userid` varchar(16) DEFAULT '',
				  `filetitle` varchar(255) DEFAULT '',
				  `filename` varchar(255) DEFAULT '',
				  `fileextension` varchar(16) DEFAULT '',
				  `filesize` decimal(18,2) DEFAULT '0.00',
				  `filetype` varchar(64) DEFAULT '',
				  `filepath` varchar(255) DEFAULT '',
				  `filedata` mediumblob,
				  `imagewidth` decimal(18,2) DEFAULT '100.00',
				  `imageheight` decimal(18,2) DEFAULT '100.00',
				  `stock` int DEFAULT '0',
				  `hidedate` datetime DEFAULT NULL,
				  `hideuserid` varchar(16) DEFAULT '',
				  `hide` int DEFAULT '0',
				  `checkeddate` datetime DEFAULT NULL,
				  `checkeduserid` varchar(16) DEFAULT '',
				  `checked` int DEFAULT '0',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`uploadid`),
				  UNIQUE KEY `".wtw_tableprefix."uploadid_UNIQUE` (`uploadid`),
				  KEY `".wtw_tableprefix."idx_uploads_quickselect` (`uploadid`,`originalid`,`websizeid`,`thumbnailid`,`userid`,`filetype`,`stock`,`hide`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."userauthorizations` (
				  `userauthorizationid` varchar(16) NOT NULL,
				  `userid` varchar(16) DEFAULT '',
				  `communityid` varchar(16) DEFAULT '',
				  `buildingid` varchar(16) DEFAULT '',
				  `thingid` varchar(16) DEFAULT '',
				  `useraccess` varchar(255) DEFAULT 'browse',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`userauthorizationid`),
				  UNIQUE KEY `".wtw_tableprefix."userauthorizationid_UNIQUE` (`userauthorizationid`),
				  KEY `".wtw_tableprefix."userauthorizations_webid` (`userid`,`communityid`,`buildingid`,`thingid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."useravataranimations` (
				  `useravataranimationid` varchar(16) NOT NULL,
				  `avataranimationid` varchar(16) DEFAULT '',
				  `useravatarid` varchar(16) DEFAULT '',
				  `speedratio` decimal(18,2) DEFAULT '1.00',
				  `walkspeed` decimal(18,2) DEFAULT '1.00',
				  `loadpriority` int DEFAULT '0',
				  `animationevent` varchar(45) DEFAULT '',
				  `animationfriendlyname` varchar(255) DEFAULT '',
				  `animationicon` varchar(255) DEFAULT '',
				  `objectfolder` varchar(255) DEFAULT '',
				  `objectfile` varchar(255) DEFAULT '',
				  `startframe` int DEFAULT '0',
				  `endframe` int DEFAULT '0',
				  `animationloop` int DEFAULT '1',
				  `soundid` varchar(16) DEFAULT '',
				  `soundmaxdistance` decimal(18,2) DEFAULT '100.00',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`useravataranimationid`),
				  UNIQUE KEY `".wtw_tableprefix."useravataranimationid_UNIQUE` (`useravataranimationid`),
				  KEY `".wtw_tableprefix."idx_useravataranimations` (`avataranimationid`,`useravatarid`,`animationevent`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."useravatarcolors` (
				  `avatarpartid` varchar(40) NOT NULL,
				  `userid` varchar(16) DEFAULT '',
				  `useravatarid` varchar(16) DEFAULT '',
				  `instanceid` varchar(24) DEFAULT '',
				  `avatarpart` varchar(255) DEFAULT '',
				  `diffusecolor` varchar(7) DEFAULT '',
				  `specularcolor` varchar(7) DEFAULT '',
				  `emissivecolor` varchar(7) DEFAULT '',
				  `ambientcolor` varchar(7) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`avatarpartid`),
				  UNIQUE KEY `".wtw_tableprefix."useravatarcolorid_UNIQUE` (`avatarpartid`),
				  KEY `".wtw_tableprefix."idx_useravatarcolors` (`userid`,`useravatarid`,`instanceid`,`avatarpart`(255))
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."useravatars` (
				  `useravatarid` varchar(16) NOT NULL,
				  `userid` varchar(16) DEFAULT '',
				  `userip` varchar(64) DEFAULT '',
				  `instanceid` varchar(24) DEFAULT '',
				  `avatarid` varchar(16) DEFAULT '',
				  `versionid` varchar(16) DEFAULT '',
				  `version` varchar(10) DEFAULT '1.0.0',
				  `versionorder` int DEFAULT '1000000',
				  `versiondesc` varchar(255) DEFAULT 'Initial Version',
				  `avatargroup` varchar(64) DEFAULT 'Default',
				  `objectfolder` varchar(255) DEFAULT '',
				  `objectfile` varchar(255) DEFAULT '',
				  `gender` varchar(25) DEFAULT 'female',
				  `positionx` decimal(18,2) DEFAULT '0.00',
				  `positiony` decimal(18,2) DEFAULT '0.00',
				  `positionz` decimal(18,2) DEFAULT '0.00',
				  `scalingx` decimal(18,4) DEFAULT '1.0000',
				  `scalingy` decimal(18,4) DEFAULT '1.0000',
				  `scalingz` decimal(18,4) DEFAULT '1.0000',
				  `rotationx` decimal(18,2) DEFAULT '0.00',
				  `rotationy` decimal(18,2) DEFAULT '0.00',
				  `rotationz` decimal(18,2) DEFAULT '0.00',
				  `startframe` int DEFAULT '0',
				  `endframe` int DEFAULT '0',
				  `displayname` varchar(45) DEFAULT '',
				  `avatardescription` varchar(255) DEFAULT '',
				  `privacy` int DEFAULT '0',
				  `lastdate` datetime DEFAULT NULL,
				  `lastip` varchar(45) DEFAULT '',
				  `enteranimation` int DEFAULT '0',
				  `exitanimation` int DEFAULT '0',
				  `enteranimationparameter` varchar(255) DEFAULT '',
				  `exitanimationparameter` varchar(255) DEFAULT '',
				  `globalhash` varchar(255) DEFAULT '',
				  `walkspeed` decimal(18,2) DEFAULT '1.00',
				  `walkanimationspeed` decimal(18,2) DEFAULT '1.00',
				  `turnspeed` decimal(18,2) DEFAULT '1.00',
				  `turnanimationspeed` decimal(18,2) DEFAULT '1.00',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`useravatarid`),
				  UNIQUE KEY `".wtw_tableprefix."useravatarid_UNIQUE` (`useravatarid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."users` (
				  `userid` varchar(16) NOT NULL,
				  `pastuserid` varchar(16) DEFAULT '',
				  `uploadpathid` varchar(16) DEFAULT '',
				  `userpassword` varchar(255) NOT NULL,
				  `recoverpassword` varchar(255) DEFAULT '',
				  `recoverpassworddate` datetime DEFAULT NULL,
				  `usertoken` varchar(2048) DEFAULT '',
				  `wordpresstoken` varchar(2048) DEFAULT '',
				  `email` varchar(255) DEFAULT '',
				  `emailconfirm` varchar(255) DEFAULT '',
				  `emailconfirmdate` datetime DEFAULT NULL,
				  `displayname` varchar(255) DEFAULT '',
				  `firstname` varchar(255) DEFAULT '',
				  `lastname` varchar(255) DEFAULT '',
				  `gender` varchar(45) DEFAULT '',
				  `dob` datetime DEFAULT NULL,
				  `userimageurl` varchar(255) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`userid`),
				  UNIQUE KEY `".wtw_tableprefix."userid_UNIQUE` (`userid`),
				  KEY `".wtw_tableprefix."users_webid` (`userid`,`email`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."usersinroles` (
				  `userinroleid` varchar(16) NOT NULL,
				  `userid` varchar(16) NOT NULL,
				  `roleid` varchar(16) NOT NULL,
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`userinroleid`),
				  UNIQUE KEY `".wtw_tableprefix."userinroleid_UNIQUE` (`userinroleid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."webaliases` (
				  `webaliasid` varchar(16) NOT NULL,
				  `hostuserid` varchar(16) DEFAULT '',
				  `domainname` varchar(255) DEFAULT '',
				  `communityid` varchar(16) DEFAULT '',
				  `communitypublishname` varchar(255) DEFAULT '',
				  `buildingid` varchar(16) DEFAULT '',
				  `buildingpublishname` varchar(255) DEFAULT '',
				  `thingid` varchar(16) DEFAULT '',
				  `thingpublishname` varchar(255) DEFAULT '',
				  `webalias` varchar(255) DEFAULT NULL,
				  `forcehttps` int DEFAULT '0',
				  `franchise` int DEFAULT '0',
				  `franchiseid` varchar(32) DEFAULT '',
				  `sitename` varchar(255) DEFAULT '',
				  `sitedescription` varchar(255) DEFAULT '',
				  `siteiconid` varchar(16) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`webaliasid`),
				  UNIQUE KEY `".wtw_tableprefix."webaliasid_UNIQUE` (`webaliasid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."webdomains` (
				  `webdomainid` varchar(16) NOT NULL,
				  `hostuserid` varchar(16) DEFAULT '',
				  `domainname` varchar(255) DEFAULT '',
				  `forcehttps` int DEFAULT '0',
				  `startdate` datetime DEFAULT NULL,
				  `expiredate` datetime DEFAULT NULL,
				  `allowhosting` int DEFAULT '0',
				  `hostprice` decimal(18,2) DEFAULT '0',
				  `sslprice` decimal(18,2) DEFAULT '0',
				  `hostdays` int DEFAULT '365',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` INT DEFAULT '0',
				  PRIMARY KEY (`webdomainid`),
				  UNIQUE INDEX `".wtw_tableprefix."webdomainid_UNIQUE` (`webdomainid`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."webimages` (
				  `webimageid` varchar(16) NOT NULL,
				  `pastwebimageid` varchar(16) DEFAULT '',
				  `communitymoldid` varchar(16) DEFAULT '',
				  `buildingmoldid` varchar(16) DEFAULT '',
				  `thingmoldid` varchar(16) DEFAULT '',
				  `imageindex` int DEFAULT '0',
				  `imageid` varchar(16) DEFAULT '',
				  `imagehoverid` varchar(16) DEFAULT '',
				  `imageclickid` varchar(16) DEFAULT '',
				  `graphiclevel` int DEFAULT '0',
				  `jsfunction` varchar(255) DEFAULT '',
				  `jsparameters` varchar(255) DEFAULT '',
				  `userid` varchar(16) DEFAULT '',
				  `alttag` varchar(255) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`webimageid`),
				  UNIQUE KEY `".wtw_tableprefix."webimageid_UNIQUE` (`webimageid`),
				  KEY `".wtw_tableprefix."webimages_webid` (`communitymoldid`,`buildingmoldid`,`thingmoldid`,`imageindex`)
				) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
			");
		} catch (Exception $e) {
			$wtw->serror("core-functions-tabledefs.php-databaseTableDefinitions=".$e->getMessage());
		}
	}

	public function loadInitBuildingCommunity($zdomainname, $zprotocol, $zuserid) {
		/* this process is only run if select preloaded option for Install Method */
		/* this process loads a default 3D Building and 3D Community */
		global $wtw;
		global $wtwdb;
		try {
			/* use the same time stamp for all changes within a set */
			$ztimestamp = date('Y/m/d H:i:s');
			$zuploadpathid = '';
			$zforcehttps = '0';
			if (isset($_SESSION["wtw_uploadpathid"])) {
				$zuploadpathid = $_SESSION["wtw_uploadpathid"];
			} else {
				$zuploadpathid =  $wtwdb->getRandomString(16,1);
			}
			if ($zprotocol == "https://"){
				$zforcehttps = '1';
			}
			
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."actionzones 
				(actionzoneid, pastactionzoneid, communityid, buildingid, thingid, attachmoldid, loadactionzoneid, parentactionzoneid, teleportwebid, teleportwebtype, spawnactionzoneid, actionzonename, actionzonetype, actionzoneshape, movementtype, movementdistance, positionx, positiony, positionz, scalingx, scalingy, scalingz, rotationx, rotationy, rotationz, axispositionx, axispositiony, axispositionz, axisrotationx, axisrotationy, axisrotationz, rotateaxis, rotatedegrees, rotatedirection, rotatespeed, value1, value2, defaulteditform, jsfunction, jsparameters, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('0lv850wh35of8l6s','0lv850wh35of8l6s','','zhl7krw65kf9a7re','','','pmre2vfir2klo3r6','','','','','High - Load when far','loadzone','box','',0.00,0.00,0.00,0.00,700.00,1038.00,700.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('5rc4n33l71hb6vkl','5rc4n33l71hb6vkl','','','3jvfphhnmallime2','','pbbkbrhw6ik0vh1y','','','','','Normal - Load when near','loadzone','box','',20.00,0.00,0.00,0.00,400.00,500.00,400.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('6rwqobiu7i3p9jq1','6rwqobiu7i3p9jq1','','91hwdnqro994biox','','','gun8p6hf102p9am1','','','','','Right Swinging Door','swingingdoor','box','swing',0.20,-43.00,10.00,-12.34,40.00,20.00,40.00,0.00,0.00,0.00,-34.00,10.00,-8.34,0.00,0.00,0.00,'y',110.00,1,10.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('79t0x9ru8g3trjxp','79t0x9ru8g3trjxp','','','xwkkn71odqwhloop','','v8gw907wzzm0jynh','','','','','Normal - Load when near','loadzone','box','',20.00,0.00,0.00,0.00,250.00,200.00,250.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('8nx95ohnqkjgun1b','8nx95ohnqkjgun1b','','','r787yu0jysq20r3b','','rdf4nr3zesdo456m','','','','','Normal - Load when near','loadzone','box','',20.00,0.00,0.00,0.00,400.00,500.00,400.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('9226pkk1sf2g4nmr','9226pkk1sf2g4nmr','','','r787yu0jysq20r3b','','','','','','','Extreme Load Zone','loadzone','box','',20.00,0.00,0.00,0.00,600.00,795.00,600.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('b6ih2w8faa2ahvec','b6ih2w8faa2ahvec','','91hwdnqro994biox','','','hdfasvo4neno6h0e','','','','','Normal - Load when near','loadzone','box','',0.00,0.00,0.00,0.00,120.00,100.00,120.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('bf8gq2qskkbix263','bf8gq2qskkbix263','','91hwdnqro994biox','','','gun8p6hf102p9am1','','','','','Left Swinging Door','swingingdoor','box','swing',0.20,11.68,10.00,45.00,40.00,20.00,40.00,0.00,0.00,0.00,15.45,10.00,34.14,0.00,0.00,0.00,'y',110.00,1,10.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('c1l4m3f5gs8dwon3','c1l4m3f5gs8dwon3','','','xwkkn71odqwhloop','','','','','','','Extreme Load Zone','loadzone','box','',20.00,0.00,0.00,0.00,600.00,795.00,600.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ejc40vr0h6wjeq6o','ejc40vr0h6wjeq6o','','zhl7krw65kf9a7re','','','0lv850wh35of8l6s','','','','','Normal - Load when near','loadzone','box','',0.00,0.00,0.00,0.00,300.00,438.00,300.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ge3vex5hcgzpn91t','ge3vex5hcgzpn91t','jumyggpw22bbf0k4','','','','','','','','','Extreme Load Zone','loadzone','box','',20.00,0.00,0.00,0.00,5000.00,1000.00,5000.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('gun8p6hf102p9am1','gun8p6hf102p9am1','','91hwdnqro994biox','','','','','','','','Extreme Load Zone','loadzone','box','',20.00,0.00,0.00,0.00,800.00,400.00,800.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('hdfasvo4neno6h0e','hdfasvo4neno6h0e','','91hwdnqro994biox','','','gun8p6hf102p9am1','','','','','High - Load when far','loadzone','box','',0.00,0.00,0.00,0.00,200.00,100.00,200.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('hnxrwo9480pnmbp5','hnxrwo9480pnmbp5','','','3jvfphhnmallime2','','','','','','','Extreme Load Zone','loadzone','box','',20.00,0.00,0.00,0.00,600.00,795.00,600.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('lbk6ibtx2dbdci47','lbk6ibtx2dbdci47','','','3jvfphhnmallime2','','hnxrwo9480pnmbp5','','','','','High - Load when far','loadzone','box','',20.00,0.00,0.00,0.00,500.00,790.00,500.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('pbbkbrhw6ik0vh1y','pbbkbrhw6ik0vh1y','','','3jvfphhnmallime2','','ywtk5zeqhdb9p34m','','','','','High - Load when far','loadzone','box','',20.00,0.00,0.00,0.00,500.00,790.00,500.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('pmre2vfir2klo3r6','pmre2vfir2klo3r6','','zhl7krw65kf9a7re','','','','','','','','Extreme Load Zone','loadzone','box','',20.00,0.00,0.00,0.00,1100.00,1001.00,1100.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('rdf4nr3zesdo456m','rdf4nr3zesdo456m','','','r787yu0jysq20r3b','','9226pkk1sf2g4nmr','','','','','High - Load when far','loadzone','box','',20.00,0.00,0.00,0.00,500.00,790.00,500.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('u9rxq6s6c84wxtw1','u9rxq6s6c84wxtw1','jumyggpw22bbf0k4','','','','urcestcju0uf1w7l','','','','','Normal - Load when near','loadzone','box','',0.00,0.00,0.00,0.00,1000.00,642.00,1000.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('urcestcju0uf1w7l','urcestcju0uf1w7l','jumyggpw22bbf0k4','','','','ge3vex5hcgzpn91t','','','','','High - Load when far','loadzone','box','',0.00,0.00,0.00,0.00,10000.00,6042.00,10000.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('uxmr3lj0byldxobo','uxmr3lj0byldxobo','','','3jvfphhnmallime2','','lbk6ibtx2dbdci47','','','','','Normal - Load when near','loadzone','box','',20.00,0.00,0.00,0.00,400.00,500.00,400.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('v8gw907wzzm0jynh','v8gw907wzzm0jynh','','','xwkkn71odqwhloop','','c1l4m3f5gs8dwon3','','','','','High - Load when far','loadzone','box','',20.00,0.00,0.00,0.00,500.00,790.00,500.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ywtk5zeqhdb9p34m','ywtk5zeqhdb9p34m','','','3jvfphhnmallime2','','','','','','','Extreme Load Zone','loadzone','box','',20.00,0.00,0.00,0.00,600.00,795.00,600.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'y',90.00,1,1.00,0.00,0.00,0,'','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");

			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."buildingmolds 
				(buildingmoldid, pastbuildingmoldid, buildingid, loadactionzoneid, unloadactionzoneid, shape, covering, positionx, positiony, positionz, scalingx, scalingy, scalingz, rotationx, rotationy, rotationz, special1, special2, uoffset, voffset, uscale, vscale, uploadobjectid, graphiclevel, textureid, texturebumpid, texturehoverid, videoid, videoposterid, diffusecolor, specularcolor, emissivecolor, ambientcolor, heightmapid, mixmapid, texturerid, texturegid, texturebid, texturebumprid, texturebumpgid, texturebumpbid, soundid, soundname, soundattenuation, soundloop, soundmaxdistance, soundrollofffactor, soundrefdistance, soundconeinnerangle, soundconeouterangle, soundconeoutergain, webtext, webstyle, opacity, sideorientation, billboard, waterreflection, receiveshadows, subdivisions, minheight, maxheight, checkcollisions, ispickable, actionzoneid, csgmoldid, csgaction, alttag, jsfunction, jsparameters, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('0hl9osw5j0v3g0py','0hl9osw5j0v3g0py','91hwdnqro994biox','gun8p6hf102p9am1','','babylonfile','none',0.00,0.00,0.00,1.00,1.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'j6jsofdhr7t9f2ke',0,'guuhs7swpx6fzbiz','','','','','#fffefe','#fffefe','#979797','#fffefe','','','','','','','','','','','',1,100.00,1.00,1.00,90.00,180.00,0.50,'','',100.00,'default',0,0,0,12,0,30,1,1,'','','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('2izew5nws9ojpvmm','2izew5nws9ojpvmm','91hwdnqro994biox','b6ih2w8faa2ahvec','','babylonfile','none',20.00,0.00,-12.00,0.10,0.10,0.10,0.00,105.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'t2lprnpg70ce3uyc',0,'50u0daxrnyi59h1h','','','','','#ffffff','#686868','#000000','#575757','','','','','','','','','','','',1,100.00,1.00,1.00,90.00,180.00,0.50,'','',100.00,'default',0,0,0,12,0,30,1,1,'','','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('56vcd8epx6bbgemm','56vcd8epx6bbgemm','91hwdnqro994biox','gun8p6hf102p9am1','','storesign','color',12.00,25.75,34.45,1.00,7.00,22.00,0.00,90.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'',0,'','','','','','#ffffff','#686868','#000000','#575757','','','','','','','','','','','linear',1,100.00,1.00,1.00,90.00,180.00,0.50,'My 3D Building','',100.00,'default',0,0,0,12,0,30,1,1,'','','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('7renwf2v1bt4jwsc','7renwf2v1bt4jwsc','91hwdnqro994biox','b6ih2w8faa2ahvec','','babylonfile','none',13.00,0.00,-19.00,1.00,1.00,1.00,0.00,-74.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'b7c0e2ooob6r30ln',0,'eo4ep7ukywak6s9r','','','','','#ffffff','#686868','#000000','#575757','','','','','','','','','','','',1,100.00,1.00,1.00,90.00,180.00,0.50,'','',100.00,'default',0,0,0,12,0,30,1,1,'','','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('b5gtnjb3ib5us8fv','b5gtnjb3ib5us8fv','91hwdnqro994biox','hdfasvo4neno6h0e','','babylonfile','none',0.00,0.00,0.00,1.00,1.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'i4dc4lr73025t45g',0,'eo4ep7ukywak6s9r','','','','','#fffefe','#fffefe','#979797','#fffefe','','','','','','','','','','','',1,100.00,1.00,1.00,90.00,180.00,0.50,'','',100.00,'default',0,0,0,12,0,30,1,1,'','','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('cb8z19injgumh7lu','cb8z19injgumh7lu','91hwdnqro994biox','b6ih2w8faa2ahvec','','babylonfile','none',15.00,8.00,-12.00,2.00,2.00,2.00,0.00,-170.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'mdk123xftw5vgdzy',0,'eo4ep7ukywak6s9r','','','','','#ffffff','#686868','#000000','#575757','','','','','','','','','','','',1,100.00,1.00,1.00,90.00,180.00,0.50,'','',100.00,'default',0,0,0,12,0,30,1,1,'','','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('fzjyphsbziva1meo','fzjyphsbziva1meo','91hwdnqro994biox','gun8p6hf102p9am1','','babylonfile','none',0.00,0.00,0.00,1.00,1.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'x6ebbdm0wx0lqvfr',0,'eo4ep7ukywak6s9r','','','','','#fffefe','#fffefe','#979797','#fffefe','','','','','','','','','','','',1,100.00,1.00,1.00,90.00,180.00,0.50,'','',100.00,'default',0,0,0,12,0,30,1,1,'6rwqobiu7i3p9jq1','','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('hw0avxivnpl91l3w','hw0avxivnpl91l3w','91hwdnqro994biox','gun8p6hf102p9am1','','babylonfile','none',23.95,0.00,-0.04,1.00,1.00,1.00,0.00,90.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'x6ebbdm0wx0lqvfr',0,'guuhs7swpx6fzbiz','','','','','#fffefe','#fffefe','#979797','#fffefe','','','','','','','','','','','',1,100.00,1.00,1.00,90.00,180.00,0.50,'','',100.00,'default',0,0,0,12,0,30,1,1,'bf8gq2qskkbix263','','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('nrvvbvcjcvzs8v30','nrvvbvcjcvzs8v30','zhl7krw65kf9a7re','0lv850wh35of8l6s','','babylonfile','none',0.00,0.00,0.00,1.00,1.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'8izr7so2swx3zg40',0,'6vfswddsqtarxqpn','','','','','#fffefe','#fffefe','#979797','#fffefe','','','','','','','','','','','',1,100.00,1.00,1.00,90.00,180.00,0.50,'','',100.00,'default',0,0,0,12,0,30,1,1,'','','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");

			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."buildings 
				(buildingid, pastbuildingid, hostuserid, versionid, version, versionorder, versiondesc, downloadparentwebid, downloadparentwebtype, analyticsid, buildingname, buildingdescription, userid, positionx, positiony, positionz, scalingx, scalingy, scalingz, rotationx, rotationy, rotationz, spawnactionzoneid, gravity, templatename, description, tags, snapshotid, shareuserid, sharehash, sharetemplatedate, alttag, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('91hwdnqro994biox','91hwdnqro994biox','','xoq6m7wq8mhx87co','1.0.0',1000000,'Initial Version','','','','Coffee Corner Shop','Small Corner Shop with a Coffee Shop Feel. 2 Entrances, Display Cases, park bench, and animated Cashier Clerk.','24u2nnr0wxpohhfa',-54.85,0.07,89.87,1.00,1.00,1.00,4.47,55.87,0.00,'',1.00,'Coffee Corner Shop','Small Corner Shop with glass counters, park bench, 2 display windows, and animated Cashier Clerk.','3D Building, coffee shop store, stucco, brown 3d building, cover, awnings, glass tables, counters, 2 doors, small 3D Building','940tq0xhhzpltfk5','','',NULL,'Coffee Shop','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('zhl7krw65kf9a7re','zhl7krw65kf9a7re','','w91tabdryndrg760','1.0.0',1000000,'Initial Version','jumyggpw22bbf0k4','community','','Small Docks','Small Wooden Docks for small boats. Includes working steps and decorative ladders.','24u2nnr0wxpohhfa',-90.74,0.08,86.93,1.00,1.00,1.00,9.16,39.99,0.00,'',1.00,'Small Wooden Docks','Small Wooden Docks for small boats. Includes working steps and decorative ladders.','small wooden docks, pier, boat docks, water, lake, ocean, river, canal, steps, stairs, ladders, pylons, posts','v9gqw63215seqyul','','',NULL,'Docks','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");

			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."communities 
				(communityid, pastcommunityid, hostuserid, versionid, version, versionorder, versiondesc, downloadparentwebid, downloadparentwebtype, analyticsid, communityname, communitydescription, userid, positionx, positiony, positionz, scalingx, scalingy, scalingz, rotationx, rotationy, rotationz, spawnactionzoneid, gravity, groundpositiony, waterpositiony, textureid, skydomeid, waterbumpid, skyinclination, skyluminance, skyazimuth, skyrayleigh, skyturbidity, skymiedirectionalg, skymiecoefficient, waterbumpheight, watersubdivisions, windforce, winddirectionx, winddirectiony, winddirectionz, waterwaveheight, waterwavelength, watercolorrefraction, watercolorreflection, watercolorblendfactor, watercolorblendfactor2, wateralpha, templatename, description, tags, snapshotid, shareuserid, sharehash, sharetemplatedate, alttag, buildingpositionx, buildingpositiony, buildingpositionz, buildingscalingx, buildingscalingy, buildingscalingz, buildingrotationx, buildingrotationy, buildingrotationz, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('jumyggpw22bbf0k4','jumyggpw22bbf0k4','','jumyggpw22bbf0k4','1.0.0',1000000,'Initial Version','','','','Canal City Block','Section of a City block with a canal splitting down the middle. There are two roads with bridges on the ends of the canal and a boat dock','24u2nnr0wxpohhfa',-64.97,5.07,225.88,1.00,1.00,1.00,2.90,264.94,0.00,'',9.80,-2.00,0.00,'nquorqetmg2p205x','','',0.00,1.00,0.25,2.00,10.00,0.80,0.008,0.60,2.00,-10.00,1.00,0.00,1.00,0.20,0.02,'#23749c','#52bcf1',0.20,0.20,0.90,'Canal City Block','Section of a City block with a canal splitting down the middle. There are two roads with bridges on the ends of the canal and a boat dock','canal street, bridges, city section, european style, cobblestone, city, island, boat dock, 3D Stores Ready','up1YzeojaElWStXH','','',NULL,'',-55.00,5.00,350.00,1.00,1.00,1.00,0.00,180.00,0.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");

			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."communitymolds 
				(communitymoldid, pastcommunitymoldid, communityid, loadactionzoneid, unloadactionzoneid, shape, covering, positionx, positiony, positionz, scalingx, scalingy, scalingz, rotationx, rotationy, rotationz, special1, special2, uoffset, voffset, uscale, vscale, uploadobjectid, graphiclevel, textureid, texturebumpid, texturehoverid, videoid, videoposterid, diffusecolor, specularcolor, emissivecolor, ambientcolor, heightmapid, mixmapid, texturerid, texturegid, texturebid, texturebumprid, texturebumpgid, texturebumpbid, soundid, soundname, soundattenuation, soundloop, soundmaxdistance, soundrollofffactor, soundrefdistance, soundconeinnerangle, soundconeouterangle, soundconeoutergain, webtext, webstyle, opacity, sideorientation, billboard, waterreflection, receiveshadows, subdivisions, minheight, maxheight, checkcollisions, ispickable, actionzoneid, csgmoldid, csgaction, alttag, jsfunction, jsparameters, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('97ap8l2xqcajga07','97ap8l2xqcajga07','jumyggpw22bbf0k4','ge3vex5hcgzpn91t','','babylonfile','none',0.00,-2.00,290.00,1.00,1.00,1.00,0.00,180.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'af6chi1exopymdaq',0,'u2lbxvd2h6lk7k60','','','','','#fffefe','#fffefe','#979797','#fffefe','','','','','','','','','','','',1,100.00,1.00,1.00,90.00,180.00,0.50,'','',100.00,'default',0,0,0,12,0,30,1,1,'','','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('silotvobnb398xvg','silotvobnb398xvg','jumyggpw22bbf0k4','ge3vex5hcgzpn91t','','babylonfile','none',0.00,-2.00,0.00,1.00,1.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'af6chi1exopymdaq',0,'u2lbxvd2h6lk7k60','','','','','#fffefe','#fffefe','#979797','#fffefe','','','','','','','','','','','',1,100.00,1.00,1.00,90.00,180.00,0.50,'','',100.00,'default',0,0,0,12,0,30,1,1,'','','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");

			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."connectinggrids 
				(connectinggridid, pastconnectinggridid, parentserverfranchiseid, parentwebid, parentwebtype, childserverfranchiseid, childwebid, childwebtype, positionx, positiony, positionz, scalingx, scalingy, scalingz, rotationx, rotationy, rotationz, loadactionzoneid, altloadactionzoneid, unloadactionzoneid, attachactionzoneid, alttag, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('oor60tpjo3gvtse4','oor60tpjo3gvtse4','','','','','jumyggpw22bbf0k4','community',0.00,0.00,0.00,1.00,1.00,1.00,0.00,0.00,0.00,'ge3vex5hcgzpn91t','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('pos4a26s1n7agk5y','pos4a26s1n7agk5y','','jumyggpw22bbf0k4','community','','zhl7krw65kf9a7re','building',19.00,-12.55,462.56,1.00,1.00,1.00,0.00,0.00,0.00,'','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('qs1xdj15c57x5dhj','','','jumyggpw22bbf0k4','community','','91hwdnqro994biox','building',-55.00,5.00,350.00,1.00,1.00,1.00,0.00,180.00,0.00,'pmre2vfir2klo3r6','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('3mnnghzwi2h7qbkn','3mnnghzwi2h7qbkn','','jumyggpw22bbf0k4','community','','3jvfphhnmallime2','thing',-99.00,-10.00,173.00,1.00,1.00,1.00,2.00,-90.00,1.00,'','u9rxq6s6c84wxtw1','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('8jx2q1id5kjghr8t','8jx2q1id5kjghr8t','','jumyggpw22bbf0k4','community','','3jvfphhnmallime2','thing',-41.00,-10.00,175.00,1.00,1.00,1.00,-2.00,0.00,2.00,'','u9rxq6s6c84wxtw1','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ce83atg1ftunhp0u','ce83atg1ftunhp0u','','jumyggpw22bbf0k4','community','','3jvfphhnmallime2','thing',140.00,-10.00,115.00,1.00,1.00,1.00,-1.00,0.00,1.00,'','u9rxq6s6c84wxtw1','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('dwudr1ojd0o8jcq6','dwudr1ojd0o8jcq6','','jumyggpw22bbf0k4','community','','3jvfphhnmallime2','thing',81.00,-10.00,175.00,1.00,1.00,1.00,-4.00,0.00,-2.00,'','u9rxq6s6c84wxtw1','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('gwdwbningrllym72','gwdwbningrllym72','','jumyggpw22bbf0k4','community','','3jvfphhnmallime2','thing',21.00,-10.00,175.00,1.00,1.00,1.00,3.00,0.00,3.00,'','u9rxq6s6c84wxtw1','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('h3rp61gkbcl3lxsf','h3rp61gkbcl3lxsf','','jumyggpw22bbf0k4','community','','3jvfphhnmallime2','thing',-40.00,-10.00,116.00,1.00,1.00,1.00,4.00,0.00,-2.00,'','u9rxq6s6c84wxtw1','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('jkdxqjvzwdy7tjcz','jkdxqjvzwdy7tjcz','','jumyggpw22bbf0k4','community','','3jvfphhnmallime2','thing',20.00,-10.00,115.00,1.00,1.00,1.00,-2.00,0.00,2.00,'','u9rxq6s6c84wxtw1','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('kyn2qyu0ytw1sobb','kyn2qyu0ytw1sobb','','jumyggpw22bbf0k4','community','','3jvfphhnmallime2','thing',80.00,-10.00,114.00,1.00,1.00,1.00,4.00,0.00,2.00,'','u9rxq6s6c84wxtw1','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('n8j8comy90a22kca','n8j8comy90a22kca','','jumyggpw22bbf0k4','community','','3jvfphhnmallime2','thing',139.00,-10.00,176.00,1.00,1.00,1.00,-3.00,0.00,4.00,'','u9rxq6s6c84wxtw1','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('yjys8cb33tbu9ovh','yjys8cb33tbu9ovh','','jumyggpw22bbf0k4','community','','3jvfphhnmallime2','thing',-100.00,-10.00,114.00,1.00,1.00,1.00,-3.00,0.00,-1.00,'','u9rxq6s6c84wxtw1','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('0ozhvfi4ssp658jk','0ozhvfi4ssp658jk','','','','','zhl7krw65kf9a7re','building',0.00,0.00,0.00,1.00,1.00,1.00,0.00,0.00,0.00,'pmre2vfir2klo3r6','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('j0zdsmtynm5p9qoo','j0zdsmtynm5p9qoo','','','','','91hwdnqro994biox','building',0.00,0.00,0.00,1.00,1.00,1.00,0.00,0.00,0.00,'gun8p6hf102p9am1','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('lw2fwrxbvaebc4vk','lw2fwrxbvaebc4vk','','91hwdnqro994biox','building','','r787yu0jysq20r3b','thing',-13.00,0.00,13.00,1.00,1.00,1.00,0.00,180.00,0.00,'','hdfasvo4neno6h0e','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('upwj6kfded31p6lm','upwj6kfded31p6lm','','91hwdnqro994biox','building','','xwkkn71odqwhloop','thing',-18.00,0.00,43.00,1.08,1.08,1.08,0.00,90.00,0.00,'','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('2pbe4gabfyo44qt1','2pbe4gabfyo44qt1','','','','','3jvfphhnmallime2','thing',0.00,0.00,0.00,1.00,1.00,1.00,0.00,0.00,0.00,'ywtk5zeqhdb9p34m','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('k0wxyj6p6y44xg98','k0wxyj6p6y44xg98','','','','','xwkkn71odqwhloop','thing',0.00,0.00,0.00,1.00,1.00,1.00,0.00,0.00,0.00,'c1l4m3f5gs8dwon3','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('t24srztit7ubrxba','t24srztit7ubrxba','','','','','r787yu0jysq20r3b','thing',0.00,0.00,0.00,1.00,1.00,1.00,0.00,0.00,0.00,'9226pkk1sf2g4nmr','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");

			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."contentratings 
				(contentratingid, pastcontentratingid, webid, webtype, rating, ratingvalue, contentwarning, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('7j0ohsudy9v6c5r2','7j0ohsudy9v6c5r2','3jvfphhnmallime2','thing','Web-All',0,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('n1mtoxlbj47owdfx','n1mtoxlbj47owdfx','91hwdnqro994biox','building','Web-All',0,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");

			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."thingmolds 
				(thingmoldid, pastthingmoldid, thingid, loadactionzoneid, unloadactionzoneid, shape, covering, positionx, positiony, positionz, scalingx, scalingy, scalingz, rotationx, rotationy, rotationz, special1, special2, uoffset, voffset, uscale, vscale, uploadobjectid, graphiclevel, textureid, texturebumpid, texturehoverid, videoid, videoposterid, diffusecolor, specularcolor, emissivecolor, ambientcolor, heightmapid, mixmapid, texturerid, texturegid, texturebid, texturebumprid, texturebumpgid, texturebumpbid, soundid, soundname, soundattenuation, soundloop, soundmaxdistance, soundrollofffactor, soundrefdistance, soundconeinnerangle, soundconeouterangle, soundconeoutergain, webtext, webstyle, opacity, sideorientation, billboard, waterreflection, receiveshadows, subdivisions, minheight, maxheight, checkcollisions, ispickable, actionzoneid, csgmoldid, csgaction, alttag, jsfunction, jsparameters, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('1hokjl2g4wbmw12b','auwve8brwvjgfuf3','3jvfphhnmallime2','uxmr3lj0byldxobo','','babylonfile','none',0.00,0.00,0.00,1.00,1.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'qq42z6587t3k6kqg',0,'091fla3lpro7hw75','','','','','#000000','#ffffff','#000000','#000000','','','','','','','','','','','linear',1,100.00,1.00,1.00,90.00,180.00,0.50,'','',100.00,'default',0,0,0,12,0,30,1,1,'','','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('nc6muucie2olbkcq','8982452tw7aw6r3i','xwkkn71odqwhloop','79t0x9ru8g3trjxp','','babylonfile','none',0.00,0.00,0.00,1.50,1.50,1.50,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'6oovpxjqhysq5pza',0,'1uull9zfs1inccux','','','','','#fffefe','#fffefe','#979797','#fffefe','','','','','','','','','','','',1,100.00,1.00,1.00,90.00,180.00,0.50,'','',100.00,'default',0,0,0,12,0,30,1,1,'','','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('sx631b9uopsawrvd','78bwm00nietk3dpj','r787yu0jysq20r3b','8nx95ohnqkjgun1b','','babylonfile','none',0.00,0.00,0.00,1.00,1.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'8e1pxm3vi7jicfvc',0,'0uobxnd7u02vv6f8','','','','','#ffffff','#686868','#000000','#575757','','','','','','','','','','','',1,100.00,1.00,1.00,90.00,180.00,0.50,'','',100.00,'default',0,0,0,12,0,30,1,1,'','','','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");

			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."things 
				(thingid, pastthingid, hostuserid, versionid, version, versionorder, versiondesc, downloadparentwebid, downloadparentwebtype, analyticsid, thingname, thingdescription, userid, positionx, positiony, positionz, scalingx, scalingy, scalingz, rotationx, rotationy, rotationz, spawnactionzoneid, gravity, templatename, description, tags, snapshotid, shareuserid, sharehash, sharetemplatedate, alttag, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('3jvfphhnmallime2','3jvfphhnmallime2','','3jvfphhnmallime2','1.0.1',1000001,'Corrected Default Colors','jumyggpw22bbf0k4','community','','Dock Post','','24u2nnr0wxpohhfa',-26.68,0.07,5.82,1.00,1.00,1.00,5.23,4.52,0.00,'',9.80,'Dock Post','Wooden Dock Post great for tying off boats','canal, wooden dock post, pylon, pier, water markers, racing marker','5rnf8we0t2b1go0v','','',NULL,'Dock Post','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('r787yu0jysq20r3b','r787yu0jysq20r3b','','lnp90v22pgcjy17j','1.0.0',1000000,'Initial Version','91hwdnqro994biox','building','','Display Case - 90 Degrees - Half Height','','24u2nnr0wxpohhfa',-6.35,0.07,20.36,1.00,1.00,1.00,5.00,41.04,0.00,'',9.80,'Display Case - 90 Degrees - Half Height','Small L Shape - Half Height glass display case with tinted glass and wood floorboards. Great for holding Product Displays on top','glass display case, 90 Degrees, L Shape, corner, product displays, 3d store furniture, 3d shopping, store, half height, Glass Table, glass box','4d2o4xrtg4pu5wd9','','',NULL,'Display Case','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('xwkkn71odqwhloop','xwkkn71odqwhloop','','zs052d8zwvjnb9a2','1.0.0',1000000,'Initial Version','91hwdnqro994biox','building','','Wooden Park Bench with Trash Can','','24u2nnr0wxpohhfa',-31.37,0.07,15.00,1.00,1.00,1.00,8.24,16.32,0.00,'',9.80,'Wooden Park Bench','Wooden Park bench with matching trash receptacle.','wooden park bench, trash can, trash receptacle, waste bin, canister, basket, couch, seat, chair, rod iron, metal','bewwctawh3udvpn6','','',NULL,'Park Bench','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");

			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."uploadobjectanimations 
				(objectanimationid, pastobjectanimationid, uploadobjectid, userid, animationname, moldnamepart, moldevent, startframe, endframe, animationloop, speedratio, animationendscript, animationendparameters, stopcurrentanimations, additionalscript, additionalparameters, soundid, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('kxk6xu67799g3lle','kxk6xu67799g3lle','t2lprnpg70ce3uyc','43if4a1fgk86x465','cashierlouiseonload','','onload',1,219,1,1.00,'','',0,'','','',1.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");

			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."uploadobjects 
				(uploadobjectid, pastuploadobjectid, hostuserid, versionid, version, versionorder, versiondesc, groupid, userid, objectfolder, objectfile, stock, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('6oovpxjqhysq5pza','6oovpxjqhysq5pza','','6oovpxjqhysq5pza','1.0.0',1000000,'Initial Version','6oovpxjqhysq5pza','24u2nnr0wxpohhfa','/content/uploads/things/xwkkn71odqwhloop/objects/parkbench/','parkbench.babylon',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('6qmcalmscjv2gdgd','6qmcalmscjv2gdgd','','6qmcalmscjv2gdgd','1.0.0',1000000,'Initial Version','6qmcalmscjv2gdgd','24u2nnr0wxpohhfa','/content/uploads/things/3jvfphhnmallime2/objects/dockpost/','dockpost.babylon',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('8e1pxm3vi7jicfvc','8e1pxm3vi7jicfvc','','8e1pxm3vi7jicfvc','1.0.0',1000000,'Initial Version','8e1pxm3vi7jicfvc','24u2nnr0wxpohhfa','/content/uploads/things/r787yu0jysq20r3b/objects/displaycase-90degrees-small-halfheight/','displaycase-90degrees-small-halfheight.babylon',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('8izr7so2swx3zg40','8izr7so2swx3zg40','','8izr7so2swx3zg40','1.0.0',1000000,'Initial Version','8izr7so2swx3zg40','24u2nnr0wxpohhfa','/content/uploads/buildings/zhl7krw65kf9a7re/objects/docks/','docks.babylon',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('af6chi1exopymdaq','af6chi1exopymdaq','','af6chi1exopymdaq','1.0.0',1000000,'Initial Version','af6chi1exopymdaq','24u2nnr0wxpohhfa','/content/uploads/communities/jumyggpw22bbf0k4/objects/city-oldcanalside/','city-oldcanalside.babylon',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('b7c0e2ooob6r30ln','b7c0e2ooob6r30ln','','b7c0e2ooob6r30ln','1.0.0',1000000,'Initial Version','b7c0e2ooob6r30ln','24u2nnr0wxpohhfa','/content/uploads/buildings/91hwdnqro994biox/objects/displaycase-double/','displaycase-double.babylon',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('i4dc4lr73025t45g','i4dc4lr73025t45g','','i4dc4lr73025t45g','1.0.0',1000000,'Initial Version','j6jsofdhr7t9f2ke','24u2nnr0wxpohhfa','/content/uploads/buildings/91hwdnqro994biox/objects/coffeecorner-inside/','coffeecorner-inside.babylon',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('j6jsofdhr7t9f2ke','j6jsofdhr7t9f2ke','','j6jsofdhr7t9f2ke','1.0.0',1000000,'Initial Version','j6jsofdhr7t9f2ke','24u2nnr0wxpohhfa','/content/uploads/buildings/91hwdnqro994biox/objects/coffeecorner/','coffeecorner.babylon',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('mdk123xftw5vgdzy','mdk123xftw5vgdzy','','mdk123xftw5vgdzy','1.0.0',1000000,'Initial Version','mdk123xftw5vgdzy','24u2nnr0wxpohhfa','/content/uploads/buildings/91hwdnqro994biox/objects/cashregister/','cashregister.babylon',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('qq42z6587t3k6kqg','qq42z6587t3k6kqg','','6qmcalmscjv2gdgd','1.0.0',1000000,'Initial Version','qq42z6587t3k6kqg','24u2nnr0wxpohhfa','/content/uploads/things/3jvfphhnmallime2/objects/dockpost/','dockpost.babylon',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('t2lprnpg70ce3uyc','t2lprnpg70ce3uyc','','t2lprnpg70ce3uyc','1.0.0',1000000,'Initial Version','t2lprnpg70ce3uyc','24u2nnr0wxpohhfa','/content/uploads/buildings/91hwdnqro994biox/objects/cashier-louise/','cashier-louise.babylon',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('x6ebbdm0wx0lqvfr','x6ebbdm0wx0lqvfr','','x6ebbdm0wx0lqvfr','1.0.0',1000000,'Initial Version','j6jsofdhr7t9f2ke','24u2nnr0wxpohhfa','/content/uploads/buildings/91hwdnqro994biox/objects/coffeecornerdoor/','coffeecornerdoor.babylon',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");

			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."uploads 
				(uploadid, pastuploadid, originalid, websizeid, thumbnailid, userid, filetitle, filename, fileextension, filesize, filetype, filepath, filedata, imagewidth, imageheight, stock, hidedate, hideuserid, hide, checkeddate, checkeduserid, checked, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('4d2o4xrtg4pu5wd9','4d2o4xrtg4pu5wd9','p0fmnfbw8skg6jwp','4d2o4xrtg4pu5wd9','','43if4a1fgk86x465','defaultthingsm.png','defaultthingsm.png','png',48390.00,'image/png','/content/uploads/things/r787yu0jysq20r3b/uploads/defaultthingsm.png','',300.00,151.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('p0fmnfbw8skg6jwp','p0fmnfbw8skg6jwp','p0fmnfbw8skg6jwp','4d2o4xrtg4pu5wd9','','43if4a1fgk86x465','lnp90v22pgcjy17j-snapshot.png','lnp90v22pgcjy17j-snapshot.png','png',134388.00,'image/png','/content/uploads/things/r787yu0jysq20r3b/uploads/lnp90v22pgcjy17j-snapshot.png','',512.00,258.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('4y51qoe0smitf53k','4y51qoe0smitf53k','4y51qoe0smitf53k','bewwctawh3udvpn6','','43if4a1fgk86x465','zs052d8zwvjnb9a2-snapshot.png','zs052d8zwvjnb9a2-snapshot.png','png',233317.00,'image/png','/content/uploads/things/xwkkn71odqwhloop/uploads/zs052d8zwvjnb9a2-snapshot.png','',512.00,324.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('bewwctawh3udvpn6','bewwctawh3udvpn6','4y51qoe0smitf53k','bewwctawh3udvpn6','','43if4a1fgk86x465','defaultthingsm.png','defaultthingsm.png','png',81561.00,'image/png','/content/uploads/things/xwkkn71odqwhloop/uploads/defaultthingsm.png','',300.00,190.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('70ybn841hc4q7kzw','70ybn841hc4q7kzw','70ybn841hc4q7kzw','ppivya7b56pxauc3','','43if4a1fgk86x465','3jvfphhnmallime2-snapshot.png','3jvfphhnmallime2-snapshot.png','png',157505.00,'image/png','/content/uploads/things/3jvfphhnmallime2/uploads/3jvfphhnmallime2-snapshot.png','',512.00,329.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('1ddl423cquksolia','70ybn841hc4q7kzw','1ddl423cquksolia','5rnf8we0t2b1go0v','','43if4a1fgk86x465','3jvfphhnmallime2-snapshot.png','3jvfphhnmallime2-snapshot.png','png',157505.00,'image/png','/content/uploads/things/3jvfphhnmallime2/uploads/3jvfphhnmallime2-snapshot.png','',512.00,329.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('5rnf8we0t2b1go0v','ppivya7b56pxauc3','70ybn841hc4q7kzw','5rnf8we0t2b1go0v','','43if4a1fgk86x465','defaultthingsm.png','defaultthingsm.png','png',53631.00,'image/png','/content/uploads/things/3jvfphhnmallime2/uploads/defaultthingsm.png','',300.00,192.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ppivya7b56pxauc3','ppivya7b56pxauc3','70ybn841hc4q7kzw','ppivya7b56pxauc3','','43if4a1fgk86x465','defaultthingsm.png','defaultthingsm.png','png',53631.00,'image/png','/content/uploads/things/3jvfphhnmallime2/uploads/defaultthingsm.png','',300.00,192.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('s9sc77hvmju588qx','s9sc77hvmju588qx','s9sc77hvmju588qx','940tq0xhhzpltfk5','','43if4a1fgk86x465','91hwdnqro994biox-snapshot.png','91hwdnqro994biox-snapshot.png','png',187383.00,'image/png','/content/uploads/buildings/91hwdnqro994biox/uploads/91hwdnqro994biox-snapshot.png','',512.00,317.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('940tq0xhhzpltfk5','940tq0xhhzpltfk5','s9sc77hvmju588qx','940tq0xhhzpltfk5','','43if4a1fgk86x465','defaultbuildingsm.png','defaultbuildingsm.png','png',67714.00,'image/png','/content/uploads/buildings/91hwdnqro994biox/uploads/defaultbuildingsm.png','',300.00,185.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('l8qDK7zQZJQfFG6G','l8qDK7zQZJQfFG6G','l8qDK7zQZJQfFG6G','up1YzeojaElWStXH','','43if4a1fgk86x465','jumyggpw22bbf0k4-snapshot.png','jumyggpw22bbf0k4-snapshot.png','png',201188.00,'image/png','/content/uploads/communities/jumyggpw22bbf0k4/uploads/jumyggpw22bbf0k4-snapshot.png','',512.00,324.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('up1YzeojaElWStXH','up1YzeojaElWStXH','l8qDK7zQZJQfFG6G','up1YzeojaElWStXH','','43if4a1fgk86x465','defaultcommunitysm.png','defaultcommunitysm.png','png',69842.00,'image/png','/content/uploads/communities/jumyggpw22bbf0k4/uploads/defaultcommunitysm.png','',300.00,190.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('v9gqw63215seqyul','v9gqw63215seqyul','wesy8paxv25ntote','v9gqw63215seqyul','','43if4a1fgk86x465','defaultbuildingsm.png','defaultbuildingsm.png','png',83680.00,'image/png','/content/uploads/buildings/zhl7krw65kf9a7re/uploads/defaultbuildingsm.png','',300.00,190.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('wesy8paxv25ntote','wesy8paxv25ntote','wesy8paxv25ntote','v9gqw63215seqyul','','43if4a1fgk86x465','w91tabdryndrg760-snapshot.png','w91tabdryndrg760-snapshot.png','png',252937.00,'image/png','/content/uploads/buildings/zhl7krw65kf9a7re/uploads/w91tabdryndrg760-snapshot.png','',512.00,324.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ysd9dlzlwoxl0ilj','lcwhq6p26ot45dfz','ysd9dlzlwoxl0ilj','nquorqetmg2p205x','e24wfj1y0rn7gafw','43if4a1fgk86x465','ground.jpg','ground.jpg','jpg',78990.00,'image/jpeg','/content/uploads/communities/jumyggpw22bbf0k4/uploads/ground.jpg','',512.00,512.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('nquorqetmg2p205x','61pcl0adyqrn016u','ysd9dlzlwoxl0ilj','nquorqetmg2p205x','e24wfj1y0rn7gafw','43if4a1fgk86x465','ground.jpg','ground.jpg','jpg',78990.00,'image/jpeg','/content/uploads/communities/jumyggpw22bbf0k4/uploads/ground.jpg','',512.00,512.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('e24wfj1y0rn7gafw','5ejhsgzlxvnm5usf','ysd9dlzlwoxl0ilj','nquorqetmg2p205x','e24wfj1y0rn7gafw','43if4a1fgk86x465','ground.jpg','ground.jpg','jpg',8101.00,'image/jpeg','/content/uploads/communities/jumyggpw22bbf0k4/uploads/ground.jpg','',80.00,80.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('rpd7z90fvvalnw7l','ij7fi8qv7dbgb6zc','rpd7z90fvvalnw7l','091fla3lpro7hw75','2jcbdq9r6w7us1x2','43if4a1fgk86x465','stucco.jpg','stucco.jpg','jpg',48246.00,'image/jpeg','/content/uploads/things/3jvfphhnmallime2/uploads/stucco.jpg','',512.00,512.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('2jcbdq9r6w7us1x2','5owk4v2paam9hlk0','rpd7z90fvvalnw7l','091fla3lpro7hw75','2jcbdq9r6w7us1x2','43if4a1fgk86x465','stucco.jpg','stucco.jpg','jpg',4214.00,'image/jpeg','/content/uploads/things/3jvfphhnmallime2/uploads/stucco.jpg','',80.00,80.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('091fla3lpro7hw75','xvle6r7q4cdwas48','rpd7z90fvvalnw7l','091fla3lpro7hw75','2jcbdq9r6w7us1x2','43if4a1fgk86x465','stucco.jpg','stucco.jpg','jpg',48246.00,'image/jpeg','/content/uploads/things/3jvfphhnmallime2/uploads/stucco.jpg','',512.00,512.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('0uobxnd7u02vv6f8','0uobxnd7u02vv6f8','0uobxnd7u02vv6f8','hi3htm5ex1zmxyog','p7mjavazw3n4yyj4','43if4a1fgk86x465','stucco.jpg','stucco.jpg','jpg',48246.00,'image/jpeg','/content/uploads/things/r787yu0jysq20r3b/uploads/stucco.jpg','',512.00,512.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('hi3htm5ex1zmxyog','hi3htm5ex1zmxyog','0uobxnd7u02vv6f8','hi3htm5ex1zmxyog','p7mjavazw3n4yyj4','43if4a1fgk86x465','stucco.jpg','stucco.jpg','jpg',48246.00,'image/jpeg','/content/uploads/things/r787yu0jysq20r3b/uploads/stucco.jpg','',512.00,512.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('p7mjavazw3n4yyj4','p7mjavazw3n4yyj4','0uobxnd7u02vv6f8','hi3htm5ex1zmxyog','p7mjavazw3n4yyj4','43if4a1fgk86x465','stucco.jpg','stucco.jpg','jpg',4214.00,'image/jpeg','/content/uploads/things/r787yu0jysq20r3b/uploads/stucco.jpg','',80.00,80.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('1uull9zfs1inccux','1uull9zfs1inccux','1uull9zfs1inccux','r14rimvtzlq7uilw','t41sr0ysxi7btva3','43if4a1fgk86x465','stucco.jpg','stucco.jpg','jpg',48246.00,'image/jpeg','/content/uploads/things/xwkkn71odqwhloop/uploads/stucco.jpg','',512.00,512.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('r14rimvtzlq7uilw','r14rimvtzlq7uilw','1uull9zfs1inccux','r14rimvtzlq7uilw','t41sr0ysxi7btva3','43if4a1fgk86x465','stucco.jpg','stucco.jpg','jpg',48246.00,'image/jpeg','/content/uploads/things/xwkkn71odqwhloop/uploads/stucco.jpg','',512.00,512.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('t41sr0ysxi7btva3','t41sr0ysxi7btva3','1uull9zfs1inccux','r14rimvtzlq7uilw','t41sr0ysxi7btva3','43if4a1fgk86x465','stucco.jpg','stucco.jpg','jpg',4214.00,'image/jpeg','/content/uploads/things/xwkkn71odqwhloop/uploads/stucco.jpg','',80.00,80.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('eo4ep7ukywak6s9r','eo4ep7ukywak6s9r','eo4ep7ukywak6s9r','50u0daxrnyi59h1h','r95v23h3fjrz66v5','43if4a1fgk86x465','stucco.jpg','stucco.jpg','jpg',48246.00,'image/jpeg','/content/uploads/buildings/91hwdnqro994biox/uploads/stucco.jpg','',512.00,512.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('50u0daxrnyi59h1h','50u0daxrnyi59h1h','eo4ep7ukywak6s9r','50u0daxrnyi59h1h','r95v23h3fjrz66v5','43if4a1fgk86x465','stucco.jpg','stucco.jpg','jpg',48246.00,'image/jpeg','/content/uploads/buildings/91hwdnqro994biox/uploads/stucco.jpg','',512.00,512.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('r95v23h3fjrz66v5','r95v23h3fjrz66v5','eo4ep7ukywak6s9r','50u0daxrnyi59h1h','r95v23h3fjrz66v5','43if4a1fgk86x465','stucco.jpg','stucco.jpg','jpg',4214.00,'image/jpeg','/content/uploads/buildings/91hwdnqro994biox/uploads/stucco.jpg','',80.00,80.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('rg0z6axdls0x0ne2','rg0z6axdls0x0ne2','rg0z6axdls0x0ne2','edk1okhqg1r12l15','ysabc69272zrtjr9','43if4a1fgk86x465','stucco.jpg','stucco.jpg','jpg',48246.00,'image/jpeg','/content/uploads/things/3jvfphhnmallime2/uploads/stucco.jpg','',512.00,512.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('edk1okhqg1r12l15','edk1okhqg1r12l15','rg0z6axdls0x0ne2','edk1okhqg1r12l15','ysabc69272zrtjr9','43if4a1fgk86x465','stucco.jpg','stucco.jpg','jpg',48246.00,'image/jpeg','/content/uploads/things/3jvfphhnmallime2/uploads/stucco.jpg','',512.00,512.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ysabc69272zrtjr9','ysabc69272zrtjr9','rg0z6axdls0x0ne2','edk1okhqg1r12l15','ysabc69272zrtjr9','43if4a1fgk86x465','stucco.jpg','stucco.jpg','jpg',4214.00,'image/jpeg','/content/uploads/things/3jvfphhnmallime2/uploads/stucco.jpg','',80.00,80.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('qzs3x6ix5xslj0ir','qzs3x6ix5xslj0ir','qzs3x6ix5xslj0ir','6vfswddsqtarxqpn','ysh7wezon64hjjbh','43if4a1fgk86x465','stucco2.jpg','stucco2-2.jpg','jpg',4800.00,'image/jpeg','/content/uploads/buildings/zhl7krw65kf9a7re/uploads/stucco2-2.jpg','',225.00,225.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('6vfswddsqtarxqpn','6vfswddsqtarxqpn','qzs3x6ix5xslj0ir','6vfswddsqtarxqpn','ysh7wezon64hjjbh','43if4a1fgk86x465','stucco2.jpg','stucco2-1.jpg','jpg',28600.00,'image/jpeg','/content/uploads/buildings/zhl7krw65kf9a7re/uploads/stucco2-1.jpg','',512.00,512.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ysh7wezon64hjjbh','ysh7wezon64hjjbh','qzs3x6ix5xslj0ir','6vfswddsqtarxqpn','ysh7wezon64hjjbh','43if4a1fgk86x465','stucco2.jpg','stucco2.jpg','jpg',1152.00,'image/jpeg','/content/uploads/buildings/zhl7krw65kf9a7re/uploads/stucco2.jpg','',80.00,80.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('rzh8sewwx2a3fnhd','rzh8sewwx2a3fnhd','rzh8sewwx2a3fnhd','u2lbxvd2h6lk7k60','vbe733pnimah7lal','43if4a1fgk86x465','stucco2.jpg','stucco2-2.jpg','jpg',4800.00,'image/jpeg','/content/uploads/communities/jumyggpw22bbf0k4/uploads/stucco2-2.jpg','',225.00,225.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('u2lbxvd2h6lk7k60','u2lbxvd2h6lk7k60','rzh8sewwx2a3fnhd','u2lbxvd2h6lk7k60','vbe733pnimah7lal','43if4a1fgk86x465','stucco2.jpg','stucco2-1.jpg','jpg',28600.00,'image/jpeg','/content/uploads/communities/jumyggpw22bbf0k4/uploads/stucco2-1.jpg','',512.00,512.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('vbe733pnimah7lal','vbe733pnimah7lal','rzh8sewwx2a3fnhd','u2lbxvd2h6lk7k60','vbe733pnimah7lal','43if4a1fgk86x465','stucco2.jpg','stucco2.jpg','jpg',1152.00,'image/jpeg','/content/uploads/communities/jumyggpw22bbf0k4/uploads/stucco2.jpg','',80.00,80.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('zqdn1qnmjyfrw65k','zqdn1qnmjyfrw65k','zqdn1qnmjyfrw65k','guuhs7swpx6fzbiz','qmb9310gpwl3nqi9','43if4a1fgk86x465','stucco2.jpg','stucco2-2.jpg','jpg',4800.00,'image/jpeg','/content/uploads/buildings/91hwdnqro994biox/uploads/stucco2-2.jpg','',225.00,225.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('guuhs7swpx6fzbiz','guuhs7swpx6fzbiz','zqdn1qnmjyfrw65k','guuhs7swpx6fzbiz','qmb9310gpwl3nqi9','43if4a1fgk86x465','stucco2.jpg','stucco2-1.jpg','jpg',28600.00,'image/jpeg','/content/uploads/buildings/91hwdnqro994biox/uploads/stucco2-1.jpg','',512.00,512.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('qmb9310gpwl3nqi9','qmb9310gpwl3nqi9','zqdn1qnmjyfrw65k','guuhs7swpx6fzbiz','qmb9310gpwl3nqi9','43if4a1fgk86x465','stucco2.jpg','stucco2.jpg','jpg',1152.00,'image/jpeg','/content/uploads/buildings/91hwdnqro994biox/uploads/stucco2.jpg','',80.00,80.00,0,NULL,'',0,NULL,'',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");

			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."userauthorizations 
				(userauthorizationid, userid, communityid, buildingid, thingid, useraccess, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('ls36j534b99l5zhh','".$zuserid."','jumyggpw22bbf0k4','','','admin','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('yy1z5de0z2tyd49u','".$zuserid."','','91hwdnqro994biox','','admin','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('0josvzahljy3o2ch','".$zuserid."','','zhl7krw65kf9a7re','','admin','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('eifkj0g7q10ypqg5','".$zuserid."','','','3jvfphhnmallime2','admin','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ot1wb421v7bwo1ka','".$zuserid."','','','r787yu0jysq20r3b','admin','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('30ej6mbpdm1h1plv','".$zuserid."','','','xwkkn71odqwhloop','admin','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");

			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."webaliases 
				(webaliasid, hostuserid, domainname, communityid, communitypublishname, buildingid, buildingpublishname, thingid, thingpublishname, webalias, forcehttps, franchise, franchiseid, sitename, sitedescription, siteiconid, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('j1ycx2igkkknurv6','','".$zdomainname."','jumyggpw22bbf0k4','','','','','','".$zdomainname."',".$zforcehttps.",0,'','','','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");

			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."webdomains 
				(webdomainid, hostuserid, domainname, forcehttps, startdate, expiredate, allowhosting, hostprice, sslprice, hostdays, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('vxmfru6v92ub0k7w','','".$zdomainname."',".$zforcehttps.",'".$ztimestamp."',NULL,0,0.00,0.00,365,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");

			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."webimages 
				(webimageid, pastwebimageid, communitymoldid, buildingmoldid, thingmoldid, imageindex, imageid, imagehoverid, imageclickid, graphiclevel, jsfunction, jsparameters, userid, alttag, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('6qrr148z3ji7r6k6','6qrr148z3ji7r6k6','','','sx631b9uopsawrvd',0,'','','',0,'','','43if4a1fgk86x465','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('7imcbpnt0efugf9i','7imcbpnt0efugf9i','','','nc6muucie2olbkcq',0,'','','',0,'','','43if4a1fgk86x465','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('80fwvxhirrq3svoo','80fwvxhirrq3svoo','','','1hokjl2g4wbmw12b',0,'','','',0,'','','43if4a1fgk86x465','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('9d9415krsyaefr35','9d9415krsyaefr35','','','auwve8brwvjgfuf3',0,'','','',0,'','','43if4a1fgk86x465','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('glr3s9jydmkql55p','glr3s9jydmkql55p','','nrvvbvcjcvzs8v30','',0,'','','',0,'','','43if4a1fgk86x465','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('o3j6lh6g5jm6n1wq','o3j6lh6g5jm6n1wq','silotvobnb398xvg','','',0,'','','',0,'','','43if4a1fgk86x465','','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");
		} catch (Exception $e) {
			$wtw->serror("core-functions-tabledefs.php-loadInitBuildingCommunity=".$e->getMessage());
		}
	}

	public function loadInitDbData($zuserid, $zpreloaded) {
		/* this process is only run for new database setups, populate new tables, or if certain tables are empty */
		global $wtw;
		global $wtwdb;
		try {
			set_time_limit(0);
			/* use the same time stamp for all changes within a set */
			$ztimestamp = date('Y/m/d H:i:s');
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."avatargroups 
				(avatargroupid, avatargroup, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('cphaz1acsziosye6','Anonymous','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ot45ejgp5oxl6420','Default','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");
			
			/* updated 3.7.0 - add new avatars */
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."avatars 
				(avatarid, pastavatarid, hostuserid, versionid, version, versionorder, versiondesc, avatargroup, displayname, avatardescription, objectfolder, objectfile, gender, positionx, positiony, positionz, scalingx, scalingy, scalingz, rotationx, rotationy, rotationz, startframe, endframe, sortorder, templatename, description, tags, snapshotid, shareuserid, sharehash, sharetemplatedate, alttag, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('aajvq38y06vulgh0','','','aajvq38y06vulgh0','1.0.1',1000001,'Updated to 131 Animations!','Default','Pearl','Blonde Haired Female Child with long sleeved shirt and shorts','/content/uploads/avatars/aajvq38y06vulgh0/','pearlidle.babylon','female',0.00,0.00,0.00,0.0900,0.0900,0.0900,0.00,-90.00,0.00,1,325,3,'Pearl','Blonde Haired Female Child with long sleeved shirt and shorts.','Avatar, Default, Female, Child','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('h1ro3h59xs5eknl0','','','h1ro3h59xs5eknl0','1.0.1',1000001,'Updated to 131 Animations!','Default','Shae','Black Haired Female with black jacket, long pants, and boots','/content/uploads/avatars/h1ro3h59xs5eknl0/','shaeidle.babylon','female',0.00,0.00,0.00,0.0400,0.0400,0.0400,0.00,-90.00,0.00,1,303,3,'Shae','Black Haired Female with black jacket, long pants, and boots','Avatar, Default, Female','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('3b9bt5c70igtmqux','','','3b9bt5c70igtmqux','1.0.1',1000001,'Updated to 131 Animations!','Anonymous','Anonymous Male','Anonymous Male Android','/content/uploads/avatars/3b9bt5c70igtmqux/','maleidle.babylon','male',0.00,0.00,0.00,0.0800,0.0800,0.0800,0.00,-90.00,0.00,1,213,2,'Anonymous Male','Anonymous Male avatar with a default blue color and robotic android look. ','Avatar, Anonymous, android, robot','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('odtx7arzof5eigp4','','','odtx7arzof5eigp4','1.0.1',1000001,'Updated to 131 Animations!','Default','Regina','Black Haired Female with tank top, long pants, and hat','/content/uploads/avatars/odtx7arzof5eigp4/','reginaidle.babylon','female',0.00,0.00,0.00,0.0400,0.0400,0.0400,0.00,-90.00,0.00,1,241,3,'Regina','Black Haired Female with tank top, long pants, and hat','Avatar, Default, Female','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('p7y3p6ti6d85yf7q','','','p7y3p6ti6d85yf7q','1.0.1',1000001,'Updated to 131 Animations!','Anonymous','Anonymous Female','Anonymous Female Android','/content/uploads/avatars/p7y3p6ti6d85yf7q/','femaleidle.babylon','female',0.00,0.00,0.00,0.0800,0.0800,0.0800,0.00,-90.00,0.00,1,100,1,'Anonymous Female','Anonymous Female Android','Avatar, Anonymous, android, robot','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('v1ij2rkmdypo97c2','','','v1ij2rkmdypo97c2','1.0.1',1000001,'Updated to 131 Animations!','Default','Stefani','Brown Haired Female with tank top and shorts','/content/uploads/avatars/v1ij2rkmdypo97c2/','stefaniidle.babylon','female',0.00,0.00,0.00,0.0400,0.0400,0.0400,0.00,-90.00,0.00,1,363,3,'Stefani','Brown Haired Female with tank top and shorts','Avatar, Default, Female','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('641svy8bwjx2kme7','','','641svy8bwjx2kme7','1.0.1',1000001,'Updated to 131 Animations!','Default','Remy','Blonde Haired Male with short sleeve shirt and shorts','/content/uploads/avatars/641svy8bwjx2kme7/','remyidle.babylon','male',0.00,0.00,0.00,0.0400,0.0400,0.0400,0.00,-90.00,0.00,1,196,4,'Remy','Blonde Haired Male with short sleeve shirt and shorts','Avatar, Default, Male','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('9e94useo7x2ief0s','','','9e94useo7x2ief0s','1.0.1',1000001,'Updated to 131 Animations!','Default','Liam','Black Haired Male with long sleeve shirt and pants','/content/uploads/avatars/9e94useo7x2ief0s/','liamidle.babylon','male',0.00,0.00,0.00,0.0400,0.0400,0.0400,0.00,-90.00,0.00,1,200,4,'Liam','Black Haired Male with long sleeve shirt and pants','Avatar, Default, Male','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('dihtmpm1ae3b9d3a','','','dihtmpm1ae3b9d3a','1.1.1',1001001,'Updated to 131 Animations!','Default','Malcolm','Black Haired Male with half sleeve shirt, long pants, and hat','/content/uploads/avatars/dihtmpm1ae3b9d3a/','malcolmidle.babylon','male',0.00,0.00,0.00,0.0400,0.0400,0.0400,0.00,-90.00,0.00,1,195,4,'Malcolm','Black Haired Male with half sleeve shirt, long pants, and hat','Avatar, Default, Male','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('r8tgsns20ruwx0bg','','','r8tgsns20ruwx0bg','1.0.1',1000001,'Updated to 131 Animations!','Default','Jasper','Orange Haired Male Child','/content/uploads/avatars/r8tgsns20ruwx0bg/','jasperidle.babylon','male',0.00,0.00,0.00,0.0900,0.0900,0.0900,0.00,-90.00,0.00,1,71,4,'Jasper','Orange Haired Male Child with short sleeved shirt and shorts.','Avatar, Default, Male, Child','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");
			
			/* updated 3.4.3 - add new avatar colors (parts) with the same avatarids */
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."avatarcolors 
				(avatarpartid, pastavatarpartid, avatarid, avatarpart, diffusecolor, specularcolor, emissivecolor, ambientcolor, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('f411l0wtsjd938b3', '', 'aajvq38y06vulgh0', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('skhk514cfn6z6528', '', 'aajvq38y06vulgh0', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('twvty9thzku85bzy', '', 'aajvq38y06vulgh0', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('t1fn2kip0t3ek6k3', '', 'aajvq38y06vulgh0', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('789zg2mbpirdaefz', '', 'aajvq38y06vulgh0', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('fkdfdshjsgnhiv91', '', 'aajvq38y06vulgh0', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('39ue6qhus79oyuq2', '', 'aajvq38y06vulgh0', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ybdjum9lceqriu3l', '', 'h1ro3h59xs5eknl0', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('99dfpy7ffwywgykb', '', 'h1ro3h59xs5eknl0', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('s0kgfni1ksp7wypv', '', 'h1ro3h59xs5eknl0', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('tud2y63eh8f07lgr', '', 'h1ro3h59xs5eknl0', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('sxykax0jn240aymt', '', 'h1ro3h59xs5eknl0', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('mwmy1ls9ro0b2k85', '', 'h1ro3h59xs5eknl0', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('5k2b3nv5ih945e6d', '', 'h1ro3h59xs5eknl0', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('mfycst1inbeobx05', '', 'odtx7arzof5eigp4', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('320ez8wnt7pi538i', '', 'odtx7arzof5eigp4', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('j3gkj9t025ax9rhs', '', 'odtx7arzof5eigp4', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('2nr5nlf62qtfkkxq', '', 'odtx7arzof5eigp4', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('rl029y75fj1coxyp', '', 'odtx7arzof5eigp4', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('mkgy5jhejme7firt', '', 'odtx7arzof5eigp4', 'Hats', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('o2br140ugumjh29q', '', 'odtx7arzof5eigp4', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ofxbs3a4i0w76pjb', '', 'odtx7arzof5eigp4', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('vxmtb8vpvjvf3zma', '', 'p7y3p6ti6d85yf7q', 'Beta_Joints', '#4C2121', '#000000', '#000000', '#4C2121', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('n89yro60qtgyy93v', '', 'p7y3p6ti6d85yf7q', 'Beta_Surface', '#EB5F5F', '#000000', '#000000', '#EB5F5F', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('dfnl46bdj5o8r0gq', '', 'v1ij2rkmdypo97c2', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('o28c083kl7r39w8c', '', 'v1ij2rkmdypo97c2', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('41e6r3eftk9bmzq9', '', 'v1ij2rkmdypo97c2', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('16t9ay39xyu7x6u4', '', 'v1ij2rkmdypo97c2', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('go4qcewxqkzep92r', '', 'v1ij2rkmdypo97c2', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('alrjnt7sat4cvx1c', '', 'v1ij2rkmdypo97c2', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('cxsfyd6lqjfatjsb', '', 'v1ij2rkmdypo97c2', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('n7ggpnsdmvafn27q', '', '3b9bt5c70igtmqux', 'Alpha_Joints', '#47547F', '#000000', '#000000', '#47547F', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('whq222ptqbcwhbpe', '', '3b9bt5c70igtmqux', 'Alpha_Surface', '#31A6FD', '#000000', '#000000', '#31A6FD', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('pt96upqdo1ru1yny', '', '641svy8bwjx2kme7', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('2x1u3pmt6xwp12gk', '', '641svy8bwjx2kme7', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('wjd8qs4v98d5y4cx', '', '641svy8bwjx2kme7', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('g4h2vp1mtk6ofy2t', '', '641svy8bwjx2kme7', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('bfd5zs7qydryrh3t', '', '641svy8bwjx2kme7', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('9xm4fbcy6y9jb13m', '', '641svy8bwjx2kme7', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('2ze2ozdpolqedzz4', '', '641svy8bwjx2kme7', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('gmr5gbvgibrwm60r', '', '9e94useo7x2ief0s', 'Body', '#FFFFFF', '#000000', '#000000', '#ffffff', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('jv39gf5r987oihmu', '', '9e94useo7x2ief0s', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('2ciipvngwn3wzreg', '', '9e94useo7x2ief0s', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('w62hm4xe4r3d7d2b', '', '9e94useo7x2ief0s', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('5a26y5b3f6z72yuu', '', '9e94useo7x2ief0s', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('vbpzojwthsuzmx2i', '', '9e94useo7x2ief0s', 'Tops', '#ffffff', '#000000', '#000000', '#ffffff', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('riko7jfagi42kvoq', '', 'dihtmpm1ae3b9d3a', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('lxmqh7ux9z5ha1q1', '', 'dihtmpm1ae3b9d3a', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('8zrvrc0yv3njmyhh', '', 'dihtmpm1ae3b9d3a', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('o477h8qsjou40mv3', '', 'dihtmpm1ae3b9d3a', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('p80ygek28v4htplx', '', 'dihtmpm1ae3b9d3a', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('dujy29stjr1d3fxx', '', 'dihtmpm1ae3b9d3a', 'Hats', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('0z6w4naqcxya572c', '', 'dihtmpm1ae3b9d3a', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('r8jk0vdiqt477w3q', '', 'dihtmpm1ae3b9d3a', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('i26nosqecbdflfbt', '', 'r8tgsns20ruwx0bg', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('rvz45hxmna26uhtg', '', 'r8tgsns20ruwx0bg', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('vga26dqzrdmu05q6', '', 'r8tgsns20ruwx0bg', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('lq9c84ora5mqzei5', '', 'r8tgsns20ruwx0bg', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('2mbft9rzjxflby1w', '', 'r8tgsns20ruwx0bg', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('xnjwcxxfcsva4kcc', '', 'r8tgsns20ruwx0bg', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('d1rtqn7rmyhcenky', '', 'r8tgsns20ruwx0bg', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
			");
			
			/* updated 3.7.0 - add new avatar animations with the same avatarids */
			$zavatars = array(
				array('ind'=>'01', 'avatarid'=>'aajvq38y06vulgh0', 'gender'=>'female'),
				array('ind'=>'02', 'avatarid'=>'h1ro3h59xs5eknl0', 'gender'=>'female'),
				array('ind'=>'03', 'avatarid'=>'odtx7arzof5eigp4', 'gender'=>'female'),
				array('ind'=>'04', 'avatarid'=>'p7y3p6ti6d85yf7q', 'gender'=>'female'),
				array('ind'=>'05', 'avatarid'=>'v1ij2rkmdypo97c2', 'gender'=>'female'),
				array('ind'=>'06', 'avatarid'=>'3b9bt5c70igtmqux', 'gender'=>'male'),
				array('ind'=>'07', 'avatarid'=>'641svy8bwjx2kme7', 'gender'=>'male'),
				array('ind'=>'08', 'avatarid'=>'9e94useo7x2ief0s', 'gender'=>'male'),
				array('ind'=>'09', 'avatarid'=>'dihtmpm1ae3b9d3a', 'gender'=>'male'),
				array('ind'=>'10', 'avatarid'=>'r8tgsns20ruwx0bg', 'gender'=>'male')
			);
			
			umask(0);
			foreach ($zavatars as $zavatar) {
				$zavatarid = $zavatar["avatarid"];
				$zavatarind = $zavatar["ind"];
				$zavatargender = $zavatar["gender"];
				$zavataranimationspath = $wtwdb->contentpath.'/uploads/avatars/'.$zavatarid.'/animations/';
				switch ($zavatarid) {
					case 'aajvq38y06vulgh0':
						$wtwdb->query("
							INSERT INTO ".wtw_tableprefix."avataranimations 
							(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
							VALUES
							('".$zavatarind."o4kgmoik9nf8ws', '', 'aajvq38y06vulgh0', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/aajvq38y06vulgh0/', 'pearlidle.babylon', '1', '325', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
							('".$zavatarind."dup8ie7d1rfhqk', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Dance - Twist', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-dance.babylon', '1', '227', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
						");
						break;
					case 'h1ro3h59xs5eknl0':
						$wtwdb->query("
							INSERT INTO ".wtw_tableprefix."avataranimations 
							(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
							VALUES
							('".$zavatarind."5nt31zrtvvq4cd', '', 'h1ro3h59xs5eknl0', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/', 'shaeidle.babylon', '1', '303', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
							('".$zavatarind."i4zorwvhpsw2py', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Dance - Salsa', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-dance.babylon', '1', '288', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
						");
						break;
					case 'odtx7arzof5eigp4':
						$wtwdb->query("
							INSERT INTO ".wtw_tableprefix."avataranimations 
							(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
							VALUES
							('".$zavatarind."o3h47opkqwat7m', '', 'odtx7arzof5eigp4', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/odtx7arzof5eigp4/', 'reginaidle.babylon', '1', '241', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
							('".$zavatarind."zd6710kd1l7emj', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Dance - Wave Hip Hop', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-dance.babylon', '1', '405', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
						");
						break;
					case 'p7y3p6ti6d85yf7q':
						$wtwdb->query("
							INSERT INTO ".wtw_tableprefix."avataranimations 
							(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
							VALUES
							('".$zavatarind."ohb6x5ze1112a9', '', 'p7y3p6ti6d85yf7q', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/', 'femaleidle.babylon', '1', '100', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
							('".$zavatarind."3oz4dv3yvnu8qt', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Dance - Hip Hop', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-dance.babylon', '1', '153', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
						");
						break;
					case 'v1ij2rkmdypo97c2':
						$wtwdb->query("
							INSERT INTO ".wtw_tableprefix."avataranimations 
							(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
							VALUES
							('".$zavatarind."n3i9s7ophcae5h', '', 'v1ij2rkmdypo97c2', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/', 'stefaniidle.babylon', '1', '363', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
							('".$zavatarind."o5gyo65yutc5rr', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Dance - Swing', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-dance.babylon', '1', '503', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
						");
						break;
					case '3b9bt5c70igtmqux':
						$wtwdb->query("
							INSERT INTO ".wtw_tableprefix."avataranimations 
							(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
							VALUES
							('".$zavatarind."r9087b004i9ptv', '', '3b9bt5c70igtmqux', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/3b9bt5c70igtmqux/', 'maleidle.babylon', '1', '213', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
							('".$zavatarind."yy0o3qcfafzi1p', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Dance - Hip Hop', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-dance.babylon', '1', '369', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
						");
						break;
					case '641svy8bwjx2kme7':
						$wtwdb->query("
							INSERT INTO ".wtw_tableprefix."avataranimations 
							(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
							VALUES
							('".$zavatarind."wc004i6dcn4rdn', '', '641svy8bwjx2kme7', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/641svy8bwjx2kme7/', 'remyidle.babylon', '1', '196', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
							('".$zavatarind."7uboixxjjqa4vr', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Dance - House', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-dance.babylon', '1', '629', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
						");
						break;
					case '9e94useo7x2ief0s':
						$wtwdb->query("
							INSERT INTO ".wtw_tableprefix."avataranimations 
							(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
							VALUES
							('".$zavatarind."78k4zhhzhemwlc', '', '9e94useo7x2ief0s', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/9e94useo7x2ief0s/', 'liamidle.babylon', '1', '200', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
							('".$zavatarind."pzgd35v26kebba', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Dance - Tut Hip Hop', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-dance.babylon', '1', '407', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
						");
						break;
					case 'dihtmpm1ae3b9d3a':
						$wtwdb->query("
							INSERT INTO ".wtw_tableprefix."avataranimations 
							(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
							VALUES
							('".$zavatarind."45dg48tccn60jn', '', 'dihtmpm1ae3b9d3a', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/', 'malcolmidle.babylon', '1', '195', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
							('".$zavatarind."wf2uz0xqc97n89', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Dance - Hip Hop', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-dance.babylon', '1', '331', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
						");
						break;
					case 'r8tgsns20ruwx0bg':
						$wtwdb->query("
							INSERT INTO ".wtw_tableprefix."avataranimations 
							(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
							VALUES
							('".$zavatarind."gfso15ljwulgi6', '', 'r8tgsns20ruwx0bg', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/', 'jasperidle.babylon', '1', '71', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
							('".$zavatarind."s21wirqtwvkm3m', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Dance - Breakdance', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-dance.babylon', '1', '111', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
						");
						break;
				}
				if ($zavatargender == 'female') {
					$wtwdb->query("
						INSERT INTO ".wtw_tableprefix."avataranimations 
						(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
						VALUES
						('".$zavatarind."zszl1drqbf6npk', '', '".$zavatarid."', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/".$zavatarid."/animations/', 'femalewalk.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('".$zavatarind."julhnrux63xd15', '', '".$zavatarid."', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/".$zavatarid."/animations/', 'femalewalkback.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('".$zavatarind."03h6cacvd7x086', '', '".$zavatarid."', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/".$zavatarid."/animations/', 'femalewalkback.babylon', '1', '24', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
					");
					if ($zavatarid != 'p7y3p6ti6d85yf7q') {
						try {
							foreach (glob($wtwdb->contentpath."/uploads/avatars/p7y3p6ti6d85yf7q/animations/femalewalk*") as $zanimationfile) {
								$zfilename = basename($zanimationfile);
								copy($zanimationfile, $zavataranimationspath.$zfilename);
								chmod($zavataranimationspath.$zfilename, octdec(wtw_chmod));
							}
						} catch (Exception $e) {
							$wtwdb->serror("core-functions-tabledefs.php-loadInitDbData-copy female=".$e->getMessage());
						}
					}
				} else {
					$wtwdb->query("
						INSERT INTO ".wtw_tableprefix."avataranimations 
						(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
						VALUES
						('".$zavatarind."ivtj8k2n2erlpt', '', '".$zavatarid."', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/".$zavatarid."/animations/', 'malewalk.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('".$zavatarind."w4x8gkffxcyrxe', '', '".$zavatarid."', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/".$zavatarid."/animations/', 'malewalkback.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('".$zavatarind."s35fo3h6fjfh8o', '', '".$zavatarid."', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/".$zavatarid."/animations/', 'malewalkback.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
					");
					if ($zavatarid != '3b9bt5c70igtmqux') {
						try {
							foreach (glob($wtwdb->contentpath."/uploads/avatars/3b9bt5c70igtmqux/animations/malewalk*") as $zanimationfile) {
								$zfilename = basename($zanimationfile);
								copy($zanimationfile, $zavataranimationspath.$zfilename);
								chmod($zavataranimationspath.$zfilename, octdec(wtw_chmod));
							}
						} catch (Exception $e) {
							$wtwdb->serror("core-functions-tabledefs.php-loadInitDbData-copy male=".$e->getMessage());
						}
					}
				}
				if ($zavatarid != '3b9bt5c70igtmqux') {
					try {
						foreach (glob($wtwdb->contentpath."/uploads/avatars/3b9bt5c70igtmqux/animations/*") as $zanimationfile) {
							if (strpos($zanimationfile, 'malewalk') === false && strpos($zanimationfile, 'option-dance') === false) {
								$zfilename = basename($zanimationfile);
								if ($zfilename != '.' && $zfilename != '..') {
									copy($zanimationfile, $zavataranimationspath.$zfilename);
									chmod($zavataranimationspath.$zfilename, octdec(wtw_chmod));
								}
							}
						}
					} catch (Exception $e) {
						$wtwdb->serror("core-functions-tabledefs.php-loadInitDbData-copy avatar animations=".$e->getMessage());
					}
				}

				$wtwdb->query("
					INSERT INTO ".wtw_tableprefix."avataranimations 
					(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
					VALUES
					('".$zavatarind."xtdev68nipxl5x','','".$zavatarid."','',48,'onturnleft','Turn Left','','/content/uploads/avatars/".$zavatarid."/animations/','maleturnleft.babylon',1,29,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."5b72o99k0bm6zg','','".$zavatarid."','',48,'onturnright','Turn Right','','/content/uploads/avatars/".$zavatarid."/animations/','maleturnright.babylon',1,29,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."x3o2chccn74zjp','','".$zavatarid."','',47,'onstrafeleft','Strafe Left','','/content/uploads/avatars/".$zavatarid."/animations/','malestrafeleft.babylon',1,26,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."g4a06vseo3i9ta','','".$zavatarid."','',47,'onstraferight','Strafe Right','','/content/uploads/avatars/".$zavatarid."/animations/','malestraferight.babylon',1,26,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."ii2qjfjecm06wy','','".$zavatarid."','',40,'onrun','Run','','/content/uploads/avatars/".$zavatarid."/animations/','malerun.babylon',1,16,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."mf8wtehb2dqkmd','','".$zavatarid."','',38,'onrunturnleft','Run Turn Left','','/content/uploads/avatars/".$zavatarid."/animations/','maleturnleft.babylon',1,29,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."yf92jhsjd5nvd8','','".$zavatarid."','',38,'onrunturnright','Run Turn Right','','/content/uploads/avatars/".$zavatarid."/animations/','maleturnright.babylon',1,29,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."s9yxs6k7fg2wd4','','".$zavatarid."','',37,'onrunstrafeleft','Run Strafe Left','','/content/uploads/avatars/".$zavatarid."/animations/','malestrafeleft.babylon',1,26,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."7y4rh3zog9wpt0','','".$zavatarid."','',37,'onrunstraferight','Run Strafe Right','','/content/uploads/avatars/".$zavatarid."/animations/','malestraferight.babylon',1,26,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."ua8jbcmsbxi5w0','','".$zavatarid."','',35,'onwait-sit','Wait - Sit','','/content/uploads/avatars/".$zavatarid."/animations/','wait-sit.babylon',1,155,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."uatc8bv9tqoi6n','','".$zavatarid."','',34,'onjump','Jump','','/content/uploads/avatars/".$zavatarid."/animations/','jump.babylon',1,46,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."vw5d9f2os7sx2x','','".$zavatarid."','',33,'onjumpwalk','Walk - Jump','','/content/uploads/avatars/".$zavatarid."/animations/','walk-jump.babylon',1,25,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."vi76lr5kg7qr96','','".$zavatarid."','',32,'onjumprun','Run - Jump','','/content/uploads/avatars/".$zavatarid."/animations/','walk-jump.babylon',1,25,1,1.50,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."fsjumsb816paf2','','".$zavatarid."','',31,'onjumpwalkbackwards','Walk Backwards - Jump','','/content/uploads/avatars/".$zavatarid."/animations/','walkbackwards-jump.babylon',1,23,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."408rwa70fagu49','','".$zavatarid."','',30,'onjumprunbackwards','Run Backwards - Jump','','/content/uploads/avatars/".$zavatarid."/animations/','walkbackwards-jump.babylon',1,23,1,1.50,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."sve58ukwpvdzyj','','".$zavatarid."','',10,'onwait-swim','Wait - Swim','','/content/uploads/avatars/".$zavatarid."/animations/','wait-swim.babylon',1,73,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."txm33odfqel7zi','','".$zavatarid."','',9,'onwalk-swim','Walk - Swim','','/content/uploads/avatars/".$zavatarid."/animations/','walk-swim.babylon',1,109,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."uz8cualgsaq93i','','".$zavatarid."','',8,'onrun-swim','Run - Swim','','/content/uploads/avatars/".$zavatarid."/animations/','walk-swim.babylon',1,109,1,1.50,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."xds0u4345q5za7','','".$zavatarid."','',7,'onwalkbackwards-swim','Walk Backwards Swim','','/content/uploads/avatars/".$zavatarid."/animations/','wait-swim.babylon',1,73,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."v245qnblckppa1','','".$zavatarid."','',6,'onrunbackwards-swim','Run Backwards Swim','','/content/uploads/avatars/".$zavatarid."/animations/','wait-swim.babylon',1,73,1,1.50,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."ksv82wdi9x6ph2','','".$zavatarid."','',2,'onsleep','Wait - Sleep','','/content/uploads/avatars/".$zavatarid."/animations/','wait-sleep.babylon',1,166,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."b1t97pcy0u1j4c','','".$zavatarid."','',1,'ondie','Die','','/content/uploads/avatars/".$zavatarid."/animations/','die.babylon',1,56,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."z5wmrgv1d6k8uj','','".$zavatarid."','',0,'onoption','Fight - Bash','','/content/uploads/avatars/".$zavatarid."/animations/','fight-bash.babylon',1,52,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."gq1ddwzkngphah','','".$zavatarid."','',0,'onoption','Fight - Block','','/content/uploads/avatars/".$zavatarid."/animations/','fight-block.babylon',1,69,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."7b3effac3zq3mk','','".$zavatarid."','',0,'onoption','Fight - Block Left','','/content/uploads/avatars/".$zavatarid."/animations/','fight-blockleft.babylon',1,29,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."d7lum9v55k9q71','','".$zavatarid."','',0,'onoption','Fight - Block Right','','/content/uploads/avatars/".$zavatarid."/animations/','fight-blockright.babylon',1,29,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."w4kvwmocaedekv','','".$zavatarid."','',0,'onoption','Fight - Cast Spell','','/content/uploads/avatars/".$zavatarid."/animations/','fight-castspell.babylon',1,185,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."tja4b3potjqhry','','".$zavatarid."','',0,'onoption','Fight - Cast Spell Two Hands','','/content/uploads/avatars/".$zavatarid."/animations/','fight-castspell2hands.babylon',1,83,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."d0ru13vesshxzw','','".$zavatarid."','',0,'onoption','Fight - Cast Wide Spell','','/content/uploads/avatars/".$zavatarid."/animations/','die-riffle.babylon',1,86,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."4ud0bh07t5w3ln','','".$zavatarid."','',0,'onoption','Fight - Cross Punch','','/content/uploads/avatars/".$zavatarid."/animations/','fight-crosspunch.babylon',1,49,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."t2676k4ndymk1l','','".$zavatarid."','',0,'onoption','Fight - Duck','','/content/uploads/avatars/".$zavatarid."/animations/','fight-duck.babylon',1,103,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."h1rbwwh1rw6bie','','".$zavatarid."','',0,'onoption','Fight - Elbow Combo','','/content/uploads/avatars/".$zavatarid."/animations/','fight-elbowcombo.babylon',1,79,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."ytgorbg82alxcf','','".$zavatarid."','',0,'onoption','Fight - Elbow to Uppercut','','/content/uploads/avatars/".$zavatarid."/animations/','fight-elbowtouppercut.babylon',1,59,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."zoidfwb975q3ma','','".$zavatarid."','',0,'onoption','Fight - Fireball','','/content/uploads/avatars/".$zavatarid."/animations/','fight-fireball.babylon',1,82,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."nq11w8fucz3vzy','','".$zavatarid."','',0,'onoption','Fight - Headbutt','','/content/uploads/avatars/".$zavatarid."/animations/','fight-headbutt.babylon',1,51,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."0moerzdda3ge34','','".$zavatarid."','',0,'onoption','Fight - Inside Crescent Kick','','/content/uploads/avatars/".$zavatarid."/animations/','fight-insidecrescent.babylon',1,65,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."55evueef7dn5va','','".$zavatarid."','',0,'onoption','Fight - Jab Right','','/content/uploads/avatars/".$zavatarid."/animations/','fight-punchright.babylon',1,52,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."s6ltngki1k2m2k','','".$zavatarid."','',0,'onoption','Fight - Kick Chapa','','/content/uploads/avatars/".$zavatarid."/animations/','fight-kickchapa.babylon',1,33,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."negbyfxf9suqr5','','".$zavatarid."','',0,'onoption','Fight - Kick Left','','/content/uploads/avatars/".$zavatarid."/animations/','fight-kickleft.babylon',1,53,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."r1txq7hqh9i9fu','','".$zavatarid."','',0,'onoption','Fight - Kick Right','','/content/uploads/avatars/".$zavatarid."/animations/','fight-kickright.babylon',1,54,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."gwjzrf6uazad4x','','".$zavatarid."','',0,'onoption','Fight - Knee Jab','','/content/uploads/avatars/".$zavatarid."/animations/','fight-kneejab.babylon',1,145,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."cuci77j60und1k','','".$zavatarid."','',0,'onoption','Fight - Knee to Uppercut','','/content/uploads/avatars/".$zavatarid."/animations/','fight-kneetouppercut.babylon',1,137,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."ingzytpvu31djl','','".$zavatarid."','',0,'onoption','Fight - Magic Heal','','/content/uploads/avatars/".$zavatarid."/animations/','fight-magicheal.babylon',1,65,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."vjzkbsilpxdzur','','".$zavatarid."','',0,'onoption','Fight - Magic Spell','','/content/uploads/avatars/".$zavatarid."/animations/','fight-magicspell.babylon',1,103,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."oh2yjob5zn5qty','','".$zavatarid."','',0,'onoption','Fight - Punch Combo','','/content/uploads/avatars/".$zavatarid."/animations/','fight-punchcombo.babylon',1,78,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."35nbytvwv7g60a','','".$zavatarid."','',0,'onoption','Fight - Punch Combo Fast','','/content/uploads/avatars/".$zavatarid."/animations/','fight-punchcombo.babylon',1,78,1,1.40,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."en4ld0zvdn9tax','','".$zavatarid."','',0,'onoption','Fight - Punch Left','','/content/uploads/avatars/".$zavatarid."/animations/','fight-punchleft.babylon',1,31,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."lm0oui2mg2op2g','','".$zavatarid."','',0,'onoption','Fight - Punch Right','','/content/uploads/avatars/".$zavatarid."/animations/','fight-punchright.babylon',1,51,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."32pppr89kevnbj','','".$zavatarid."','',0,'onoption','Fight - Quad Punch','','/content/uploads/avatars/".$zavatarid."/animations/','fight-quadpunch.babylon',1,53,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."qiwo4sgzlyaxq7','','".$zavatarid."','',0,'onoption','Fight - Right Hook','','/content/uploads/avatars/".$zavatarid."/animations/','fight-righthook.babylon',1,53,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."l4924y0tg0lm94','','".$zavatarid."','',0,'onoption','Fight - Roundhouse Kick','','/content/uploads/avatars/".$zavatarid."/animations/','fight-roundhousekick.babylon',1,61,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."y7mp191t6xp3qa','','".$zavatarid."','',0,'onoption','Fight - Taunt','','/content/uploads/avatars/".$zavatarid."/animations/','fight-taunt.babylon',1,69,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."coi6t03hnq2ebx','','".$zavatarid."','',0,'onoption','Fight - Wait','','/content/uploads/avatars/".$zavatarid."/animations/','fight-wait.babylon',1,80,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."afaxdhscvleh2b','','".$zavatarid."','',0,'onoption','Option - Agony','','/content/uploads/avatars/".$zavatarid."/animations/','option-agony.babylon',1,90,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."8q96piaohfn1f8','','".$zavatarid."','',0,'onoption','Option - Agree','','/content/uploads/avatars/".$zavatarid."/animations/','option-agree.babylon',1,47,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."467omoxzv30i3g','','".$zavatarid."','',0,'onoption','Option - Angry','','/content/uploads/avatars/".$zavatarid."/animations/','option-angry.babylon',1,79,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."etz2hx19zcn8u0','','".$zavatarid."','',0,'onoption','Option - Angry Point','','/content/uploads/avatars/".$zavatarid."/animations/','option-angrypoint.babylon',1,59,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."cy6l07s8ss1nta','','".$zavatarid."','',0,'onoption','Option - Arm Gesture','','/content/uploads/avatars/".$zavatarid."/animations/','option-armgesture.babylon',1,83,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."4zhgo15rqecpvv','','".$zavatarid."','',0,'onoption','Option - Backflip','','/content/uploads/avatars/".$zavatarid."/animations/','option-backflip.babylon',1,53,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."88dhpviyxrapyp','','".$zavatarid."','',0,'onoption','Option - Bashful','','/content/uploads/avatars/".$zavatarid."/animations/','option-bashful.babylon',1,265,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."qsd32hogy3jvzi','','".$zavatarid."','',0,'onoption','Option - Bow','','/content/uploads/avatars/".$zavatarid."/animations/','option-bow.babylon',1,67,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."amv8njmmwefnls','','".$zavatarid."','',0,'onoption','Option - Charge','','/content/uploads/avatars/".$zavatarid."/animations/','option-charge.babylon',1,138,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."elwm32oyh1a8cd','','".$zavatarid."','',0,'onoption','Option - Cocky','','/content/uploads/avatars/".$zavatarid."/animations/','option-cocky.babylon',1,71,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."logzl7t3qbhf4d','','".$zavatarid."','',0,'onoption','Option - Count','','/content/uploads/avatars/".$zavatarid."/animations/','option-count.babylon',1,160,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."8jrehjq6gh5axd','','".$zavatarid."','',0,'onoption','Option - Count Out','','/content/uploads/avatars/".$zavatarid."/animations/','option-countout.babylon',1,335,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."cz7q3hm4kw1iok','','".$zavatarid."','',0,'onoption','Option - Crazy','','/content/uploads/avatars/".$zavatarid."/animations/','option-crazy.babylon',1,121,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."e4j4b2cdgw76fv','','".$zavatarid."','',0,'onoption','Option - Cry','','/content/uploads/avatars/".$zavatarid."/animations/','option-cry.babylon',1,151,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."76cn3wttv4hq78','','".$zavatarid."','',0,'onoption','Option - Defeat','','/content/uploads/avatars/".$zavatarid."/animations/','option-defeat.babylon',1,176,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."qbjvak08ph2eik','','".$zavatarid."','',0,'onoption','Option - Disagree','','/content/uploads/avatars/".$zavatarid."/animations/','option-disagree.babylon',1,79,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."eadja58pvuljes','','".$zavatarid."','',0,'onoption','Option - Dismiss','','/content/uploads/avatars/".$zavatarid."/animations/','option-dismiss.babylon',1,54,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."uj84z08bvyln9i','','".$zavatarid."','',0,'onoption','Option - Excited','','/content/uploads/avatars/".$zavatarid."/animations/','option-excited.babylon',1,158,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."aq4m6mxtun9uki','','".$zavatarid."','',0,'onoption','Option - Fist Pump','','/content/uploads/avatars/".$zavatarid."/animations/','option-fistpump.babylon',1,92,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."53wc0y32gxvao9','','".$zavatarid."','',0,'onoption','Option - Hands Forward','','/content/uploads/avatars/".$zavatarid."/animations/','option-handsforward.babylon',1,75,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."qyc8ioqmt13kly','','".$zavatarid."','',0,'onoption','Option - Happy','','/content/uploads/avatars/".$zavatarid."/animations/','option-happy.babylon',1,241,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."96tpzau3gzal5k','','".$zavatarid."','',0,'onoption','Option - Insult','','/content/uploads/avatars/".$zavatarid."/animations/','option-insult.babylon',1,65,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."ubb2qmz78rdiqp','','".$zavatarid."','',0,'onoption','Option - Kneel','','/content/uploads/avatars/".$zavatarid."/animations/','option-kneel.babylon',1,113,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."v2fqpv9tetgs79','','".$zavatarid."','',0,'onoption','Option - Lay on Ground','','/content/uploads/avatars/".$zavatarid."/animations/','option-layonground.babylon',1,247,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."1kn12n1yx1kxbo','','".$zavatarid."','',0,'onoption','Option - Look','','/content/uploads/avatars/".$zavatarid."/animations/','option-look.babylon',1,117,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."pascnr8cp3oo0p','','".$zavatarid."','',0,'onoption','Option - Look Away','','/content/uploads/avatars/".$zavatarid."/animations/','option-lookaway.babylon',1,57,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."59721rdxty14lh','','".$zavatarid."','',0,'onoption','Option - Look Back','','/content/uploads/avatars/".$zavatarid."/animations/','option-lookback.babylon',1,98,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."34l1f87kn9nvdu','','".$zavatarid."','',0,'onoption','Option - Loser','','/content/uploads/avatars/".$zavatarid."/animations/','option-loser.babylon',1,79,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."2fuyttrieg6138','','".$zavatarid."','',0,'onoption','Option - No','','/content/uploads/avatars/".$zavatarid."/animations/','option-no.babylon',1,121,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."swnrselfin37bv','','".$zavatarid."','',0,'onoption','Option - Over Here','','/content/uploads/avatars/".$zavatarid."/animations/','option-overhere.babylon',1,77,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."bsx2fk2fgug6ip','','".$zavatarid."','',0,'onoption','Option - Pain','','/content/uploads/avatars/".$zavatarid."/animations/','option-pain.babylon',1,43,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."vtok6hf5c3yl83','','".$zavatarid."','',0,'onoption','Option - Point','','/content/uploads/avatars/".$zavatarid."/animations/','option-point.babylon',1,67,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."3honab7cjwl9yf','','".$zavatarid."','',0,'onoption','Option - Point Two Hands','','/content/uploads/avatars/".$zavatarid."/animations/','option-point2hands.babylon',1,48,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."9759sxd879nsf8','','".$zavatarid."','',0,'onoption','Option - Raise Hand','','/content/uploads/avatars/".$zavatarid."/animations/','option-raisehand.babylon',1,98,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."4zbbm5bac5s7ft','','".$zavatarid."','',0,'onoption','Option - React','','/content/uploads/avatars/".$zavatarid."/animations/','option-react.babylon',1,89,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."gvm31jivs59og0','','".$zavatarid."','',0,'onoption','Option - Reject','','/content/uploads/avatars/".$zavatarid."/animations/','option-reject.babylon',1,116,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."ezj81t8bdu1wcn','','".$zavatarid."','',0,'onoption','Option - Salute','','/content/uploads/avatars/".$zavatarid."/animations/','option-salute.babylon',1,69,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."bsbwj1k06lr73e','','".$zavatarid."','',0,'onoption','Option - Shake','','/content/uploads/avatars/".$zavatarid."/animations/','option-shake.babylon',1,43,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."9a0dsscvvf4bnh','','".$zavatarid."','',0,'onoption','Option - Shake Fist','','/content/uploads/avatars/".$zavatarid."/animations/','option-shakefist.babylon',1,59,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."klvlmvh9fwp47l','','".$zavatarid."','',0,'onoption','Option - Shake It Off','','/content/uploads/avatars/".$zavatarid."/animations/','option-shakeitoff.babylon',1,141,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."hh7vm1xttjzwvo','','".$zavatarid."','',0,'onoption','Option - Shift Weight','','/content/uploads/avatars/".$zavatarid."/animations/','option-shiftweight.babylon',1,48,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."8b5cg2v0jg86kl','','".$zavatarid."','',0,'onoption','Option - Sit on Ground','','/content/uploads/avatars/".$zavatarid."/animations/','option-sitonground.babylon',1,262,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."4x8dmwx4m9slb1','','".$zavatarid."','',0,'onoption','Option - Stretch Arms','','/content/uploads/avatars/".$zavatarid."/animations/','option-stretcharms.babylon',1,214,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."sgydh65dse2cxg','','".$zavatarid."','',0,'onoption','Option - Stretch Neck','','/content/uploads/avatars/".$zavatarid."/animations/','option-stretchneck.babylon',1,77,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."igi02svv7dh5m5','','".$zavatarid."','',0,'onoption','Option - Strong','','/content/uploads/avatars/".$zavatarid."/animations/','option-strong.babylon',1,47,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."mg059393pdki0u','','".$zavatarid."','',0,'onoption','Option - Surprised','','/content/uploads/avatars/".$zavatarid."/animations/','option-surprised.babylon',1,97,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."1hupig38faabzt','','".$zavatarid."','',0,'onoption','Option - Talk','','/content/uploads/avatars/".$zavatarid."/animations/','option-talk.babylon',1,247,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."kekcezgpwuxi78','','".$zavatarid."','',0,'onoption','Option - Taunt','','/content/uploads/avatars/".$zavatarid."/animations/','option-taunt.babylon',1,48,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."ass6y9724a8ge6','','".$zavatarid."','',0,'onoption','Option - Tell Secret','','/content/uploads/avatars/".$zavatarid."/animations/','option-tellsecret.babylon',1,263,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."2f3hoyugj5zel2','','".$zavatarid."','',0,'onoption','Option - Thank','','/content/uploads/avatars/".$zavatarid."/animations/','option-thank.babylon',1,73,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."x1lblg047s8nd6','','".$zavatarid."','',0,'onoption','Option - Thumbs Up','','/content/uploads/avatars/".$zavatarid."/animations/','option-thumbsup.babylon',1,101,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."mcd3d56lz52kra','','".$zavatarid."','',0,'onoption','Option - Touch Screen','','/content/uploads/avatars/".$zavatarid."/animations/','option-touchscreen.babylon',1,796,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."uullzdlqiiw4f4','','".$zavatarid."','',0,'onoption','Option - Victory','','/content/uploads/avatars/".$zavatarid."/animations/','option-victory.babylon',1,109,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."7nbv5yo389ltrg','','".$zavatarid."','',0,'onoption','Option - Wave','','/content/uploads/avatars/".$zavatarid."/animations/','option-wave.babylon',1,14,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."hc4n8iiaj7t46p','','".$zavatarid."','',0,'onoption','Option - Wave Quick','','/content/uploads/avatars/".$zavatarid."/animations/','option-wavequick.babylon',1,36,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."whwxnv4fwdovn3','','".$zavatarid."','',0,'onoption','Option - Whatever','','/content/uploads/avatars/".$zavatarid."/animations/','option-whatever.babylon',1,35,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."fd99jix7a6haoy','','".$zavatarid."','',0,'onoption','Option - Yawn','','/content/uploads/avatars/".$zavatarid."/animations/','option-yawn.babylon',1,201,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."zevs8s6lhvxrc8','','".$zavatarid."','',0,'onoption','Option - Yell','','/content/uploads/avatars/".$zavatarid."/animations/','option-yell.babylon',1,104,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."hne2senffsv8gb','','".$zavatarid."','',0,'onoption','Option - Yes','','/content/uploads/avatars/".$zavatarid."/animations/','option-yes.babylon',1,63,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."208y813d5mlexo','','".$zavatarid."','',-1,'onwait-fight','','','/content/uploads/avatars/".$zavatarid."/animations/','fight-wait.babylon',1,80,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."qk7c73bigh4ex8','','".$zavatarid."','',-100,'onwait-riffle','Wait - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','wait-riffle.babylon',1,207,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."6vwypoplqunx1u','','".$zavatarid."','',-101,'onwalk-riffle','Walk - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','walk-riffle.babylon',1,25,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."py46sau5a5isd9','','".$zavatarid."','',-102,'onwalkbackwards-riffle','Walk Backwards - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','walkbackwards-riffle.babylon',1,25,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."y9kvul52rightf','','".$zavatarid."','',-103,'onturnleft-riffle','Turn Left - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','turnleft-riffle.babylon',1,25,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."j47ucrkkde3056','','".$zavatarid."','',-103,'onturnright-riffle','Turn Right - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','turnright-riffle.babylon',1,25,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."vbyt0d25s9xbco','','".$zavatarid."','',-104,'onstrafeleft-riffle','Walk Strafe Left - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','walkstrafeleft-riffle.babylon',1,25,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."t2woxk2jj8emfi','','".$zavatarid."','',-104,'onstraferight-riffle','Walk Strafe Right - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','walkstraferight-riffle.babylon',1,25,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."l7a081wl5nod2h','','".$zavatarid."','',-105,'onrun-riffle','Run - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','run-riffle.babylon',1,17,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."7j6a7juf1y8ry2','','".$zavatarid."','',-106,'onrunbackwards-riffle','Run Backwards - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','runbackwards-riffle.babylon',1,13,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."78vsxedgga0rgc','','".$zavatarid."','',-107,'onrunturnleft-riffle','Run Turn Left - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','turnleft-riffle.babylon',1,25,1,2.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."ljialzxbm9r4h6','','".$zavatarid."','',-107,'onrunturnright-riffle','Run Turn Right - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','turnright-riffle.babylon',1,25,1,2.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."uidmjmzahn43de','','".$zavatarid."','',-108,'onrunstrafeleft-riffle','Run Strafe Left - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','runstrafeleft-riffle.babylon',1,13,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."vt1v6tiex4j7kt','','".$zavatarid."','',-108,'onrunstraferight-riffle','Run Strafe Right - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','runstraferight-riffle.babylon',1,13,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('".$zavatarind."4wwkbvnfwx02rl','','".$zavatarid."','',-109,'ondie-riffle','Die - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','die-riffle.babylon',1,72,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
				");
			}
			if (defined('wtw_umask')) {
				/* reset umask */
				if (wtw_umask != '0') {
					umask(octdec(wtw_umask));
				}
			}
			
			/* update 3.4.3 - add avatar events */
			$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimationevents 
				(animationeventid, animationevent, loadpriority, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('0ktb74w8ecij4zjt','onjump',34,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('2fyimof7q0vc3ess','onrun-riffle',-105,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('2sqbe11394tq8y09','onrunturnright-riffle',-107,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('8d3en4mrzm75335h','onsleep',2,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('8eaajtfrh47mgh2t','onrunstraferight-riffle',-108,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('9nf9z4qa755c878m','onrunturnright',38,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('bajq38y2g1v8ivth','onwalk',50,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('cxmamaiq27unm8aq','onrunstraferight',37,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('gen17y72ssi59wpu','onrunturnleft-riffle',-107,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('gslmcvc16tj8k2qd','onjumpwalk',33,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ha04nt6dexd4ftre','onrun',40,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('hll8arxe90blz5rf','onturnright-riffle',-103,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('hzii4zm4si8l8how','ondie-riffle',-109,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('i59xr1zqo99isdjm','onrunbackwards-riffle',-106,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('iwz5vunog9xvj3v2','onwait-swim',10,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('jqzt1tw4x79qtw4v','onstraferight',47,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('junpkpu43224fqfy','onjumprunbackwards',30,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('nub02cks7pxjupxh','onoption',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('o99ira75448vosuw','onrunbackwards',39,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('oezpkr4a2h5eklbq','onwait-riffle',-100,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('oly081kpu2rn02bc','onturnright',48,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('p9al5x62v52zpjlf','onrunbackwards-swim',6,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('q5lip3bagi30qmwo','onwait-sit',35,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('qjflqsslk4w3uwy4','onjumprun',32,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('qxfcifo3fv4yd28y','onstrafeleft-riffle',-104,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('rlqtycsx9jx09cva','onwalk-swim',9,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('rtrfttowiunsyhh0','onturnleft',48,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('si6ef0qn03i9t8qx','onjumpwalkbackwards',31,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('sresp7vr9xwoqn05','onrunstrafeleft',37,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('srfsp6q3cf36mm63','onwalk-riffle',-101,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('twz9cyrwaohhw4w2','onrun-swim',8,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('tzinndwd5ns1u1rl','onstraferight-riffle',-104,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('vze0vd5p14gxaojp','onturnleft-riffle',-103,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('w0cnbjuj6axt7mjt','ondie',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('w1jj1n6wx099hmqt','onrunstrafeleft-riffle',-108,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('xe6ovc180f1wd6ul','onwalkbackwards-riffle',-102,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('xprqbdxhq5mk1jiy','onwalkbackwards-swim',7,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('y756fjgq7vq4cbl2','onstrafeleft',47,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ym6zgcbjq127umis','onwait',100,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('z869qu3w7ecjnodv','onrunturnleft',38,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('zhgtra63v3v1m04m','onwalkbackwards',49,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");
				
			/* add table driven menu options */
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."menuitems 
				(menuitemid, menuitemname, menutext, menuset, menualignment, menuorder, menulevel, menuiconid, menuicon, menuaction, menuproperty, menusecurity, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				(1,'wtw_profileimagesm','Profile','main','right',-970,1,'','/content/system/images/menuprofile32.png','show-hide','wtw_menuprofile',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(2,'','Settings','main','right',-990,1,'','/content/system/images/menusettings32.png','show-hide','wtw_menusettings',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(3,'','WalkTheWeb','main','left',-1000,1,'','/content/system/images/menuwtwlogo32.png','open-tab','https://www.walktheweb.com',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(4,'wtw_showcommunityname','[Community]','main','left',-980,1,'','','','',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(5,'wtw_showbuildingname','[Building]','main','left',-970,1,'','','','',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(6,'wtw_menumic','Mic On','main','right',-980,1,'','/content/system/images/menumicoff32.png','WTW.toggleMicMute','',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(7,'wtw_menumute','Mute On','main','right',-990,1,'','/content/system/images/menumuteon32.png','WTW.toggleSoundMute','',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(8,'wtw_mainmenudisplayname','[Login]','main','right',-969,1,'','','show-hide','wtw_menuprofile',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(9,'','Help','main','right',-1000,1,'','/content/system/images/menuhelp32.png','show-hide','wtw_menuhelp',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(10,'wtw_mainadminmode','Admin Home','main','left',-990,1,'','/content/system/images/menutools32.png','navigate','/admin.php',2,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(11,'wtw_modebuilding','[EditBuilding]','main','left',-975,1,'','/content/system/images/menuedit32.png','navigate','/admin.php',2,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(12,'wtw_modecommunity','[EditCommunity]','main','left',-985,1,'','/content/system/images/menuedit32.png','navigate','/admin.php',2,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(13,'wtw_menuarrowicon','','main','left',-978,1,'','/content/system/images/menuarrow32.png','image','',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(14,'wtw_menuoptionanimations','Animations','main','center',-800,1,'','/content/system/images/menugestures32.png','WTW.toggleMenuAnimations','',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(15,'wtw_menuhomeicon','Home','main','left',-995,1,'','/content/system/images/menuhome32.png','navigate','/',3,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(16,'wtw_rating','[Not Rated]','main','right',-1001,1,'','','show-hide','wtw_menucontentrating',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0),
				(17,'','Player Stats','mainmenu','left',1,1,'','','WTW.hudOpenMenuItem','1',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0),
				(18,'','Settings','mainmenu','',50,1,'','','WTW.hudOpenMenuItem','50',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0),
				(19,'','<- Main Menu','settings','',1,1,'','','WTW.hudOpenMenuItem','51',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0),
				(20,'','Cameras','settings','left',10,1,'','','WTW.hudOpenMenuItem','60',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0),
				(21,'','Profile','settings','left',100,1,'','','WTW.hudOpenMenuItem','100',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0);
			");

			/* add plugins */
			$wtwdb->query("INSERT INTO ".wtw_tableprefix."plugins 
				(pluginname, active, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('wtw-avatars',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0), 
				('wtw-shopping',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);"); 
			
			if ($zpreloaded == 'custom') {
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."plugins 
					(pluginname, active, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
					VALUES 
					('wtw-3dinternet',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0); ");
			}
			
			/* add roles */
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."roles 
					(roleid, rolename, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
					('".$wtwdb->getRandomString(16,1)."','Admin','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'','0'),
					('".$wtwdb->getRandomString(16,1)."','Architect','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'','0'),
					('".$wtwdb->getRandomString(16,1)."','Graphics Artist','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'','0'),
					('".$wtwdb->getRandomString(16,1)."','Developer','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'','0'),
					('".$wtwdb->getRandomString(16,1)."','Subscriber','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'','0'),
					('".$wtwdb->getRandomString(16,1)."','Host','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'','0'),
					('".$wtwdb->getRandomString(16,1)."','Guest','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'','0');
			");
			
			/* add initial sample upload objects - 3D Models */
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."uploadobjects 
				(uploadobjectid, pastuploadobjectid, versionid, version, versionorder, versiondesc, groupid, userid, objectfolder, objectfile, stock, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('2lom1fyjsdf1wgkf','','2lom1fyjsdf1wgkf','1.0.0',1000000,'Initial Version','2lom1fyjsdf1wgkf','".$zuserid."','/content/system/babylon/doorblinds/','doorblinds.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('3tur7r9z6y63w9k0','','3tur7r9z6y63w9k0','1.0.0',1000000,'Initial Version','3tur7r9z6y63w9k0','".$zuserid."','/content/system/babylon/basket/','basket.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('c180du548ugrh59t','','c180du548ugrh59t','1.0.0',1000000,'Initial Version','c180du548ugrh59t','".$zuserid."','/content/system/babylon/keyboard/','keyboard.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('hvvtgsnvfh5az2fy','','hvvtgsnvfh5az2fy','1.0.0',1000000,'Initial Version','hvvtgsnvfh5az2fy','".$zuserid."','/content/system/babylon/desk/','desk.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('n2bhejhur8vpwc3d','','n2bhejhur8vpwc3d','1.0.0',1000000,'Initial Version','n2bhejhur8vpwc3d','".$zuserid."','/content/system/babylon/computer/','computer.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('p6q4guuq6nqqfxd5','','p6q4guuq6nqqfxd5','1.0.0',1000000,'Initial Version','p6q4guuq6nqqfxd5','".$zuserid."','/content/system/babylon/windowblinds/','windowblinds.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('v2n5p6owiwvnpkor','','v2n5p6owiwvnpkor','1.0.0',1000000,'Initial Version','v2n5p6owiwvnpkor','".$zuserid."','/content/system/babylon/palmtree-highdef/','palmtree-highdef.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");
			
			/* add upload objects - 3D Models - animations */
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."uploadobjectanimations 
				(objectanimationid, pastobjectanimationid, uploadobjectid, userid, animationname, moldnamepart, moldevent, startframe, endframe, animationloop, speedratio, animationendscript, animationendparameters, stopcurrentanimations, additionalscript, additionalparameters, soundid, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('0cjuaabwdwz90spj','','p6q4guuq6nqqfxd5','".$zuserid."','slat3OnMouseOver','slat3','onmouseover',450,480,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('2zead5wu8sbzgkq3','','p6q4guuq6nqqfxd5','".$zuserid."','slat9OnMouseOver','slat9','onmouseover',690,720,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('4no57yxjndidv3aq','','p6q4guuq6nqqfxd5','".$zuserid."','slat17OnMouseOver','slat17','onmouseover',290,320,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('65k2nmryvcx0sf4p','','p6q4guuq6nqqfxd5','".$zuserid."','slat13OnMouseOver','slat13','onmouseover',130,160,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('952inj6asg76tiy4','','p6q4guuq6nqqfxd5','".$zuserid."','slat11OnMouseOver','slat11','onmouseover',50,80,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('9c5avx7xf1eyc1c3','','p6q4guuq6nqqfxd5','".$zuserid."','slat5OnMouseOver','slat5','onmouseover',530,560,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('9fmc7esy200tbxd9','','p6q4guuq6nqqfxd5','".$zuserid."','slat14OnMouseOver','slat14','onmouseover',170,200,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('bbbexbcna236a2ca','','p6q4guuq6nqqfxd5','".$zuserid."','slat7OnMouseOver','slat7','onmouseover',610,640,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('dsplz0t50f5v1yew','','p6q4guuq6nqqfxd5','".$zuserid."','slat4OnMouseOver','slat4','onmouseover',490,520,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('eysmik3p604fk4o4','','p6q4guuq6nqqfxd5','".$zuserid."','slat6OnMouseOver','slat6','onmouseover',570,600,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('hdeumpt2jt5t5k1y','','p6q4guuq6nqqfxd5','".$zuserid."','slat12OnMouseOver','slat12','onmouseover',90,120,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('noh8go2co0yumkgj','','p6q4guuq6nqqfxd5','".$zuserid."','slat16OnMouseOver','slat16','onmouseover',250,280,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('qnira3z4zvkwje49','','p6q4guuq6nqqfxd5','".$zuserid."','slat15OnMouseOver','slat15','onmouseover',210,240,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('qwii74u4ug4vnhow','','p6q4guuq6nqqfxd5','".$zuserid."','slat8OnMouseOver','slat8','onmouseover',650,680,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('raei23rlabtyg6uk','','p6q4guuq6nqqfxd5','".$zuserid."','slat2OnMouseOver','slat2','onmouseover',410,440,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('rxger5j0j6ji6sx0','','p6q4guuq6nqqfxd5','".$zuserid."','slat1OnMouseOver','slat1','onmouseover',370,400,0,0.30,'','',0,'','','30u45c88d82kopf2',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('tbo1bueo6srfoemt','','p6q4guuq6nqqfxd5','".$zuserid."','slat10OnMouseOver','slat10','onmouseover',10,40,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('zsrtyzazi0f43igs','','p6q4guuq6nqqfxd5','".$zuserid."','slat18OnMouseOver','slat18','onmouseover',330,360,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('2rq8ayfifk7se3rs','','2lom1fyjsdf1wgkf','".$zuserid."','slat10OnMouseOver','slat10','onmouseover',40,70,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('453ct32o59ent3kd','','2lom1fyjsdf1wgkf','".$zuserid."','slat16OnMouseOver','slat16','onmouseover',280,310,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('6q4y27svfuojw2od','','2lom1fyjsdf1wgkf','".$zuserid."','slat15OnMouseOver','slat15','onmouseover',240,270,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('8lcjug4uqa7a5335','','2lom1fyjsdf1wgkf','".$zuserid."','slat2OnMouseOver','slat2','onmouseover',600,630,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('90niwt33xp4p1h3t','','2lom1fyjsdf1wgkf','".$zuserid."','slat11OnMouseOver','slat11','onmouseover',80,110,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('at8z34rld20bu6wa','','2lom1fyjsdf1wgkf','".$zuserid."','slat9OnMouseOver','slat9','onmouseover',880,910,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('b3ght3qjh36g2yyl','','2lom1fyjsdf1wgkf','".$zuserid."','slat6OnMouseOver','slat6','onmouseover',760,790,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('bhwrqhz6jvdjemnq','','2lom1fyjsdf1wgkf','".$zuserid."','handleOnMouseOver','handle','onmouseover',0,30,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('evunllkdhjghdswm','','2lom1fyjsdf1wgkf','".$zuserid."','slat1OnMouseOver','slat1','onmouseover',440,470,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('gtb4ye7wl9rxgo7w','','2lom1fyjsdf1wgkf','".$zuserid."','slat20OnMouseOver','slat20','onmouseover',480,510,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('irbuw9lju2wifmt3','','2lom1fyjsdf1wgkf','".$zuserid."','slat13OnMouseOver','slat13','onmouseover',160,190,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('jbw1r0b5njgu8fks','','2lom1fyjsdf1wgkf','".$zuserid."','slat21OnMouseOver','slat21','onmouseover',520,550,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('l1cinbqdrof2v9yz','','2lom1fyjsdf1wgkf','".$zuserid."','slat7OnMouseOver','slat7','onmouseover',800,830,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('m53cg4spxw03im7q','','2lom1fyjsdf1wgkf','".$zuserid."','slat14OnMouseOver','slat14','onmouseover',200,230,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('p6xoid3ferxbdezp','','2lom1fyjsdf1wgkf','".$zuserid."','slat3OnMouseOver','slat3','onmouseover',640,670,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('pbdhe6s148slb8w7','','2lom1fyjsdf1wgkf','".$zuserid."','slat8OnMouseOver','slat8','onmouseover',840,870,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('pjw5mzt7sn4bvsq1','','2lom1fyjsdf1wgkf','".$zuserid."','slat19OnMouseOver','slat19','onmouseover',400,430,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('rnwo30lyrd717rvi','','2lom1fyjsdf1wgkf','".$zuserid."','slat22OnMouseOver','slat22','onmouseover',560,590,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('sux9t5vb9oyc0rrj','','2lom1fyjsdf1wgkf','".$zuserid."','slat12OnMouseOver','slat12','onmouseover',120,150,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('tz9bhhn50561pwss','','2lom1fyjsdf1wgkf','".$zuserid."','slat17OnMouseOver','slat17','onmouseover',320,350,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('vd7kbiddlo297ic2','','2lom1fyjsdf1wgkf','".$zuserid."','slat4OnMouseOver','slat4','onmouseover',680,710,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('wke5exzamnzxieur','','2lom1fyjsdf1wgkf','".$zuserid."','slat18OnMouseOver','slat18','onmouseover',360,390,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('x9r9xgynslquhe19','','2lom1fyjsdf1wgkf','".$zuserid."','slat5OnMouseOver','slat5','onmouseover',720,750,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('371p9ofcfyofqj6x','','hvvtgsnvfh5az2fy','".$zuserid."','centerTopDrawerOnClick','centerTopDrawer','onclicktoggle',1,6,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('63xuisvsosy6hujg','','hvvtgsnvfh5az2fy','".$zuserid."','leftDrawer1OnLoad','leftDrawer1','onload',20,21,0,1.00,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('71gqjimqa3yem06c','','hvvtgsnvfh5az2fy','".$zuserid."','leftDrawer1OnClick','leftDrawer1','onclicktoggle',21,26,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('by7alv1uy6svg83g','','hvvtgsnvfh5az2fy','".$zuserid."','leftDrawer2OnClick','leftDrawer2','onclicktoggle',41,46,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('e3nneuyv2rsrfqxt','','hvvtgsnvfh5az2fy','".$zuserid."','rightTopDrawerOnClick','rightTopDrawer','onclicktoggle',161,166,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('hs16rwdg7ve3re9i','','hvvtgsnvfh5az2fy','".$zuserid."','rightDrawer2OnClick','rightDrawer2','onclicktoggle',121,126,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('i97xessn519b9v1p','','hvvtgsnvfh5az2fy','".$zuserid."','leftTopDrawerOnLoad','leftTopDrawer','onload',80,81,0,1.00,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('lotc3dgycaah3371','','hvvtgsnvfh5az2fy','".$zuserid."','rightDrawer2OnLoad','rightDrawer2','onload',120,121,0,1.00,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ma7t7jsgpmil9tuy','','hvvtgsnvfh5az2fy','".$zuserid."','leftTopDrawerOnClick','leftTopDrawer','onclicktoggle',81,86,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('mmjmfmq2mr0vz2xy','','hvvtgsnvfh5az2fy','".$zuserid."','leftDrawer3OnClick','leftDrawer3','onclicktoggle',61,66,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('m48141rwimzw40k9','','hvvtgsnvfh5az2fy','".$zuserid."','rightDrawer1OnClick','rightDrawer1','onclicktoggle',101,106,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('sklf01c67yn5hzdn','','hvvtgsnvfh5az2fy','".$zuserid."','rightDrawer3OnLoad','rightDrawer3','onload',140,141,0,1.00,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('t3g8tq80qwprxpdp','','hvvtgsnvfh5az2fy','".$zuserid."','rightTopDrawerOnLoad','rightTopDrawer','onload',160,161,0,1.00,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ujb6j55rvamcj07l','','hvvtgsnvfh5az2fy','".$zuserid."','leftDrawer2OnLoad','leftDrawer2','onload',40,41,0,1.00,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('v3l6mekb8h5o6zil','','hvvtgsnvfh5az2fy','".$zuserid."','centerTopDrawerOnLoad','centerTopDrawer','onload',0,1,0,1.00,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('wmornakw82qfbetc','','hvvtgsnvfh5az2fy','".$zuserid."','leftDrawer3OnLoad','leftDrawer3','onload',60,61,0,1.00,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('z9gn21bnd9ah5hsu','','hvvtgsnvfh5az2fy','".$zuserid."','rightDrawer1OnLoad','rightDrawer1','onload',100,101,0,1.00,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('zjglb6x3cewgfa9f','','hvvtgsnvfh5az2fy','".$zuserid."','rightDrawer3OnClick','rightDrawer3','onclicktoggle',141,146,0,0.30,'','',0,'','','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('du8vuzwqk7sx3hm2','','v2n5p6owiwvnpkor','".$zuserid."','Tree1onload','','onload',1,250,1,1.00,'','',0,'','','',1.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");
			
			/* add initial uploads images tables */
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."uploads 
				(uploadid, pastuploadid, originalid, websizeid, thumbnailid, userid, filetitle, filename, fileextension, filesize, filetype, filepath, filedata, imagewidth, imageheight, stock, hidedate, hideuserid, hide, checkeddate, checkeduserid, checked, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('30u45c88d82kopf2','','30u45c88d82kopf2','','','".$zuserid."','blinds.wav','blinds.wav','wav',1051976.00,'audio/wav','/content/system/stock/blinds.wav',NULL,NULL,NULL,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('7as2zqqg1tzgcewd','','7as2zqqg1tzgcewd','mcszktgribyufjfh','4o3eo98fernxnij9','".$zuserid."','asphalt.jpg','asphalt.jpg','jpg',58602.00,'image/jpeg','/content/system/stock/asphalt-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('mcszktgribyufjfh','','7as2zqqg1tzgcewd','mcszktgribyufjfh','4o3eo98fernxnij9','".$zuserid."','asphalt.jpg','asphalt.jpg','jpg',58602.00,'image/jpeg','/content/system/stock/asphalt-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('4o3eo98fernxnij9','','7as2zqqg1tzgcewd','mcszktgribyufjfh','4o3eo98fernxnij9','".$zuserid."','asphalt.jpg','asphalt.jpg','jpg',10010.00,'image/jpeg','/content/system/stock/asphalt.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('fnzyt8nn9d4fttov','','fnzyt8nn9d4fttov','rygeo70hb4q94uun','at7mfcha2h5b70f3','".$zuserid."','black.jpg','black.jpg','jpg',7797.00,'image/jpeg','/content/system/stock/black-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('rygeo70hb4q94uun','','fnzyt8nn9d4fttov','rygeo70hb4q94uun','at7mfcha2h5b70f3','".$zuserid."','black.jpg','black.jpg','jpg',7797.00,'image/jpeg','/content/system/stock/black-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('at7mfcha2h5b70f3','','fnzyt8nn9d4fttov','rygeo70hb4q94uun','at7mfcha2h5b70f3','".$zuserid."','black.jpg','black.jpg','jpg',804.00,'image/jpeg','/content/system/stock/black.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('7wvpv9qu1m2h7laq','','7wvpv9qu1m2h7laq','ljx0bjsa5tll8bxo','vvpzrv2pae3bbkwv','".$zuserid."','blue.jpg','blue.jpg','jpg',8693.00,'image/jpeg','/content/system/stock/blue-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ljx0bjsa5tll8bxo','','7wvpv9qu1m2h7laq','ljx0bjsa5tll8bxo','vvpzrv2pae3bbkwv','".$zuserid."','blue.jpg','blue.jpg','jpg',8693.00,'image/jpeg','/content/system/stock/blue-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('vvpzrv2pae3bbkwv','','7wvpv9qu1m2h7laq','ljx0bjsa5tll8bxo','vvpzrv2pae3bbkwv','".$zuserid."','blue.jpg','blue.jpg','jpg',876.00,'image/jpeg','/content/system/stock/blue.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0)
				('8tc73uw1eym5ze12','','8tc73uw1eym5ze12','f24dkmilhnt6efxe','fuy768nkvpxjtkc2','".$zuserid."','weatheredwood.jpg','weatheredwood.jpg','jpg',73892.00,'image/jpeg','/content/system/stock/weatheredwood-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('f24dkmilhnt6efxe','','8tc73uw1eym5ze12','f24dkmilhnt6efxe','fuy768nkvpxjtkc2','".$zuserid."','weatheredwood.jpg','weatheredwood.jpg','jpg',73892.00,'image/jpeg','/content/system/stock/weatheredwood-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('fuy768nkvpxjtkc2','','8tc73uw1eym5ze12','f24dkmilhnt6efxe','fuy768nkvpxjtkc2','".$zuserid."','weatheredwood.jpg','weatheredwood.jpg','jpg',5611.00,'image/jpeg','/content/system/stock/weatheredwood.jpg',null,80.00,59.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('0vat8qzqqh7larv5','','0vat8qzqqh7larv5','cpls7nncqo5p4i45','0zyqv3ye5mk2kopg','".$zuserid."','bluegray.jpg','bluegray.jpg','jpg',7798.00,'image/jpeg','/content/system/stock/bluegray-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('cpls7nncqo5p4i45','','0vat8qzqqh7larv5','cpls7nncqo5p4i45','0zyqv3ye5mk2kopg','".$zuserid."','bluegray.jpg','bluegray.jpg','jpg',7798.00,'image/jpeg','/content/system/stock/bluegray-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('0zyqv3ye5mk2kopg','','0vat8qzqqh7larv5','cpls7nncqo5p4i45','0zyqv3ye5mk2kopg','".$zuserid."','bluegray.jpg','bluegray.jpg','jpg',876.00,'image/jpeg','/content/system/stock/bluegray.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('eetvvq1391h8pu59','','eetvvq1391h8pu59','50odro5q5kfftuq6','cbkwuhx4uuou7gq9','".$zuserid."','babyblue.jpg','babyblue.jpg','jpg',7826.00,'image/jpeg','/content/system/stock/babyblue-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('50odro5q5kfftuq6','','eetvvq1391h8pu59','50odro5q5kfftuq6','cbkwuhx4uuou7gq9','".$zuserid."','babyblue.jpg','babyblue.jpg','jpg',7826.00,'image/jpeg','/content/system/stock/babyblue-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('cbkwuhx4uuou7gq9','','eetvvq1391h8pu59','50odro5q5kfftuq6','cbkwuhx4uuou7gq9','".$zuserid."','babyblue.jpg','babyblue.jpg','jpg',804.00,'image/jpeg','/content/system/stock/babyblue.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('y63w8hrcexithzga','','y63w8hrcexithzga','5nu8mhj7eg2xhnru','9qv5349xuejj1luf','".$zuserid."','brick.jpg','brick.jpg','jpg',41966.00,'image/jpeg','/content/system/stock/brick-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('5nu8mhj7eg2xhnru','','y63w8hrcexithzga','5nu8mhj7eg2xhnru','9qv5349xuejj1luf','".$zuserid."','brick.jpg','brick.jpg','jpg',41966.00,'image/jpeg','/content/system/stock/brick-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('9qv5349xuejj1luf','','y63w8hrcexithzga','5nu8mhj7eg2xhnru','9qv5349xuejj1luf','".$zuserid."','brick.jpg','brick.jpg','jpg',6079.00,'image/jpeg','/content/system/stock/brick.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('z1cjq226nsxbqrlp','','z1cjq226nsxbqrlp','nbpii0kqzqqev69q','xmcvc3gzimnctzjr','".$zuserid."','brickvertical.jpg','brickvertical.jpg','jpg',74803.00,'image/jpeg','/content/system/stock/brickvertical-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('nbpii0kqzqqev69q','','z1cjq226nsxbqrlp','nbpii0kqzqqev69q','xmcvc3gzimnctzjr','".$zuserid."','brickvertical.jpg','brickvertical.jpg','jpg',74803.00,'image/jpeg','/content/system/stock/brickvertical-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('xmcvc3gzimnctzjr','','z1cjq226nsxbqrlp','nbpii0kqzqqev69q','xmcvc3gzimnctzjr','".$zuserid."','brickvertical.jpg','brickvertical.jpg','jpg',6035.00,'image/jpeg','/content/system/stock/brickvertical.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('v57k9l51qlqv6b2d','','v57k9l51qlqv6b2d','5i3yipxjz7546gto','o99k1g4a4sh2wcys','".$zuserid."','brown.jpg','brown.jpg','jpg',11460.00,'image/jpeg','/content/system/stock/brown-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('5i3yipxjz7546gto','','v57k9l51qlqv6b2d','5i3yipxjz7546gto','o99k1g4a4sh2wcys','".$zuserid."','brown.jpg','brown.jpg','jpg',11460.00,'image/jpeg','/content/system/stock/brown-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('o99k1g4a4sh2wcys','','v57k9l51qlqv6b2d','5i3yipxjz7546gto','o99k1g4a4sh2wcys','".$zuserid."','brown.jpg','brown.jpg','jpg',883.00,'image/jpeg','/content/system/stock/brown.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('0bjui3w8gkishzhg','','0bjui3w8gkishzhg','t8pt1oaf91ev41sw','sp5ns1rrg1tzhi2s','".$zuserid."','ceiling.jpg','ceiling.jpg','jpg',38311.00,'image/jpeg','/content/system/stock/ceiling-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('t8pt1oaf91ev41sw','','0bjui3w8gkishzhg','t8pt1oaf91ev41sw','sp5ns1rrg1tzhi2s','".$zuserid."','ceiling.jpg','ceiling.jpg','jpg',38311.00,'image/jpeg','/content/system/stock/ceiling-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('sp5ns1rrg1tzhi2s','','0bjui3w8gkishzhg','t8pt1oaf91ev41sw','sp5ns1rrg1tzhi2s','".$zuserid."','ceiling.jpg','ceiling.jpg','jpg',1355.00,'image/jpeg','/content/system/stock/ceiling.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('jar0rtsi435eknkx','','jar0rtsi435eknkx','4to027vq39087bxr','bt59wpsvz9d4gzik','".$zuserid."','cement.jpg','cement.jpg','jpg',41195.00,'image/jpeg','/content/system/stock/cement-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('4to027vq39087bxr','','jar0rtsi435eknkx','4to027vq39087bxr','bt59wpsvz9d4gzik','".$zuserid."','cement.jpg','cement.jpg','jpg',41195.00,'image/jpeg','/content/system/stock/cement-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('bt59wpsvz9d4gzik','','jar0rtsi435eknkx','4to027vq39087bxr','bt59wpsvz9d4gzik','".$zuserid."','cement.jpg','cement.jpg','jpg',1014.00,'image/jpeg','/content/system/stock/cement.jpg',null,80.00,54.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('d7wukbt7k9ivr6lg','','d7wukbt7k9ivr6lg','70f5gsmrw7c2chgr','oga4repcn73trgyd','".$zuserid."','construction.jpg','construction.jpg','jpg',7971.00,'image/jpeg','/content/system/stock/construction-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('70f5gsmrw7c2chgr','','d7wukbt7k9ivr6lg','70f5gsmrw7c2chgr','oga4repcn73trgyd','".$zuserid."','construction.jpg','construction.jpg','jpg',7971.00,'image/jpeg','/content/system/stock/construction-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('oga4repcn73trgyd','','d7wukbt7k9ivr6lg','70f5gsmrw7c2chgr','oga4repcn73trgyd','".$zuserid."','construction.jpg','construction.jpg','jpg',805.00,'image/jpeg','/content/system/stock/construction.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('b88edlxr4caf8xy0','','b88edlxr4caf8xy0','kecjmjtfo5q7sels','xxwnjq26pxl50lyz','".$zuserid."','darkbrown.jpg','darkbrown.jpg','jpg',7796.00,'image/jpeg','/content/system/stock/darkbrown-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('kecjmjtfo5q7sels','','b88edlxr4caf8xy0','kecjmjtfo5q7sels','xxwnjq26pxl50lyz','".$zuserid."','darkbrown.jpg','darkbrown.jpg','jpg',7796.00,'image/jpeg','/content/system/stock/darkbrown-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."uploads 
				(uploadid, pastuploadid, originalid, websizeid, thumbnailid, userid, filetitle, filename, fileextension, filesize, filetype, filepath, filedata, imagewidth, imageheight, stock, hidedate, hideuserid, hide, checkeddate, checkeduserid, checked, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('xxwnjq26pxl50lyz','','b88edlxr4caf8xy0','kecjmjtfo5q7sels','xxwnjq26pxl50lyz','".$zuserid."','darkbrown.jpg','darkbrown.jpg','jpg',803.00,'image/jpeg','/content/system/stock/darkbrown.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('tgvx2iflpqifkl9k','','tgvx2iflpqifkl9k','ejj3tuq6nszhh0kr','wlcu9qxe6sdg8r4c','".$zuserid."','darkgray.jpg','darkgray.jpg','jpg',7794.00,'image/jpeg','/content/system/stock/darkgray-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ejj3tuq6nszhh0kr','','tgvx2iflpqifkl9k','ejj3tuq6nszhh0kr','wlcu9qxe6sdg8r4c','".$zuserid."','darkgray.jpg','darkgray.jpg','jpg',7794.00,'image/jpeg','/content/system/stock/darkgray-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('wlcu9qxe6sdg8r4c','','tgvx2iflpqifkl9k','ejj3tuq6nszhh0kr','wlcu9qxe6sdg8r4c','".$zuserid."','darkgray.jpg','darkgray.jpg','jpg',801.00,'image/jpeg','/content/system/stock/darkgray.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('sa1dro3h2xgi7flm','','sa1dro3h2xgi7flm','2391f1v9om09am77','4mt7k7byt7lc00zu','".$zuserid."','dirt.jpg','dirt.jpg','jpg',76660.00,'image/jpeg','/content/system/stock/dirt-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('2391f1v9om09am77','','sa1dro3h2xgi7flm','2391f1v9om09am77','4mt7k7byt7lc00zu','".$zuserid."','dirt.jpg','dirt.jpg','jpg',76660.00,'image/jpeg','/content/system/stock/dirt-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('4mt7k7byt7lc00zu','','sa1dro3h2xgi7flm','2391f1v9om09am77','4mt7k7byt7lc00zu','".$zuserid."','dirt.jpg','dirt.jpg','jpg',9292.00,'image/jpeg','/content/system/stock/dirt.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('wpu2stq6pzs1u1rl','','wpu2stq6pzs1u1rl','0m3nxqtx79ngemwm','53znbpha2estq6pz','".$zuserid."','granite.jpg','granite.jpg','jpg',95007.00,'image/jpeg','/content/system/stock/granite-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('0m3nxqtx79ngemwm','','wpu2stq6pzs1u1rl','0m3nxqtx79ngemwm','53znbpha2estq6pz','".$zuserid."','granite.jpg','granite.jpg','jpg',95007.00,'image/jpeg','/content/system/stock/granite-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('53znbpha2estq6pz','','wpu2stq6pzs1u1rl','0m3nxqtx79ngemwm','53znbpha2estq6pz','".$zuserid."','granite.jpg','granite.jpg','jpg',15994.00,'image/jpeg','/content/system/stock/granite.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('p2a757iyaiowgkhq','','p2a757iyaiowgkhq','g1sx9ir91h7mhke8','p6ti3xfdigqdm04n','".$zuserid."','footpath.jpg','footpath.jpg','jpg',51147.00,'image/jpeg','/content/system/stock/footpath-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('g1sx9ir91h7mhke8','','p2a757iyaiowgkhq','g1sx9ir91h7mhke8','p6ti3xfdigqdm04n','".$zuserid."','footpath.jpg','footpath.jpg','jpg',51147.00,'image/jpeg','/content/system/stock/footpath-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('p6ti3xfdigqdm04n','','p2a757iyaiowgkhq','g1sx9ir91h7mhke8','p6ti3xfdigqdm04n','".$zuserid."','footpath.jpg','footpath.jpg','jpg',2816.00,'image/jpeg','/content/system/stock/footpath.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('uizf5i3yip0yryhl','','uizf5i3yip0yryhl','ze24dltb2g2zndxj','34eknl0bjsa4qa9e','".$zuserid."','gold.jpg','gold.jpg','jpg',7828.00,'image/jpeg','/content/system/stock/gold-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ze24dltb2g2zndxj','','uizf5i3yip0yryhl','ze24dltb2g2zndxj','34eknl0bjsa4qa9e','".$zuserid."','gold.jpg','gold.jpg','jpg',7828.00,'image/jpeg','/content/system/stock/gold-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('34eknl0bjsa4qa9e','','uizf5i3yip0yryhl','ze24dltb2g2zndxj','34eknl0bjsa4qa9e','".$zuserid."','gold.jpg','gold.jpg','jpg',805.00,'image/jpeg','/content/system/stock/gold.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('6b3ib2bdzu6flnjq','','6b3ib2bdzu6flnjq','dcn5si6c6uq3cf5g','e4eo5p3bcrtsjc03','".$zuserid."','grass.jpg','grass.jpg','jpg',96495.00,'image/jpeg','/content/system/stock/grass-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('dcn5si6c6uq3cf5g','','6b3ib2bdzu6flnjq','dcn5si6c6uq3cf5g','e4eo5p3bcrtsjc03','".$zuserid."','grass.jpg','grass.jpg','jpg',96495.00,'image/jpeg','/content/system/stock/grass-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('e4eo5p3bcrtsjc03','','6b3ib2bdzu6flnjq','dcn5si6c6uq3cf5g','e4eo5p3bcrtsjc03','".$zuserid."','grass.jpg','grass.jpg','jpg',11949.00,'image/jpeg','/content/system/stock/grass.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('2fxe5lk0blz4o2bb','','2fxe5lk0blz4o2bb','jwtguup10013chei','ngb72qh6hvy3ms5c','".$zuserid."','green.jpg','green.jpg','jpg',7829.00,'image/jpeg','/content/system/stock/green-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('jwtguup10013chei','','2fxe5lk0blz4o2bb','jwtguup10013chei','ngb72qh6hvy3ms5c','".$zuserid."','green.jpg','green.jpg','jpg',7829.00,'image/jpeg','/content/system/stock/green-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ngb72qh6hvy3ms5c','','2fxe5lk0blz4o2bb','jwtguup10013chei','ngb72qh6hvy3ms5c','".$zuserid."','green.jpg','green.jpg','jpg',804.00,'image/jpeg','/content/system/stock/green.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('lcwhq6p26ot45dfz','','lcwhq6p26ot45dfz','61pcl0adyqrn016u','5ejhsgzlxvnm5usf','".$zuserid."','ground.jpg','ground.jpg','jpg',78990.00,'image/jpeg','/content/system/stock/ground-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('61pcl0adyqrn016u','','lcwhq6p26ot45dfz','61pcl0adyqrn016u','5ejhsgzlxvnm5usf','".$zuserid."','ground.jpg','ground.jpg','jpg',78990.00,'image/jpeg','/content/system/stock/ground-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('5ejhsgzlxvnm5usf','','lcwhq6p26ot45dfz','61pcl0adyqrn016u','5ejhsgzlxvnm5usf','".$zuserid."','ground.jpg','ground.jpg','jpg',8101.00,'image/jpeg','/content/system/stock/ground.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('6ddro2ckr5fo2chf','','6ddro2ckr5fo2chf','61peu1m199irbahi','5lhozuaxqv8gozxp','".$zuserid."','haxis.png','haxis.png','png',1919.00,'image/png','/content/system/stock/haxis-512x512.png',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('61peu1m199irbahi','','6ddro2ckr5fo2chf','61peu1m199irbahi','5lhozuaxqv8gozxp','".$zuserid."','haxis.png','haxis.png','png',1919.00,'image/png','/content/system/stock/haxis-512x512.png',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('5lhozuaxqv8gozxp','','6ddro2ckr5fo2chf','61peu1m199irbahi','5lhozuaxqv8gozxp','".$zuserid."','haxis.png','haxis.png','png',202.00,'image/png','/content/system/stock/haxis.png',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('dxmbplwoocpg5df3','','dxmbplwoocpg5df3','bf8ukbvgmqsp7z74','rb89jzbm4qepbimm','".$zuserid."','heightmap.jpg','heightmap.jpg','jpg',70036.00,'image/jpeg','/content/system/stock/heightmap-1500x1500.jpg',NULL,1500.00,1500.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('bf8ukbvgmqsp7z74','','dxmbplwoocpg5df3','bf8ukbvgmqsp7z74','rb89jzbm4qepbimm','".$zuserid."','heightmap.jpg','heightmap.jpg','jpg',13279.00,'image/jpeg','/content/system/stock/heightmap-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('rb89jzbm4qepbimm','','dxmbplwoocpg5df3','bf8ukbvgmqsp7z74','rb89jzbm4qepbimm','".$zuserid."','heightmap.jpg','heightmap.jpg','jpg',1750.00,'image/jpeg','/content/system/stock/heightmap.jpg',NULL,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('wwq1yppbimir7tgv','','wwq1yppbimir7tgv','t1qlqxd6pzubzzzy','cadzu9r0rrlppdql','".$zuserid."','lightgray.jpg','lightgray.jpg','jpg',7794.00,'image/jpeg','/content/system/stock/lightgray-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('t1qlqxd6pzubzzzy','','wwq1yppbimir7tgv','t1qlqxd6pzubzzzy','cadzu9r0rrlppdql','".$zuserid."','lightgray.jpg','lightgray.jpg','jpg',7794.00,'image/jpeg','/content/system/stock/lightgray-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('cadzu9r0rrlppdql','','wwq1yppbimir7tgv','t1qlqxd6pzubzzzy','cadzu9r0rrlppdql','".$zuserid."','lightgray.jpg','lightgray.jpg','jpg',801.00,'image/jpeg','/content/system/stock/lightgray.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('eqg5b5rfsp4h449z','','eqg5b5rfsp4h449z','kgkisfrlojot1odr','8uhx630pg7pu57lc','".$zuserid."','lightyellow.jpg','lightyellow.jpg','jpg',7937.00,'image/jpeg','/content/system/stock/lightyellow-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('kgkisfrlojot1odr','','eqg5b5rfsp4h449z','kgkisfrlojot1odr','8uhx630pg7pu57lc','".$zuserid."','lightyellow.jpg','lightyellow.jpg','jpg',7937.00,'image/jpeg','/content/system/stock/lightyellow-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('8uhx630pg7pu57lc','','eqg5b5rfsp4h449z','kgkisfrlojot1odr','8uhx630pg7pu57lc','".$zuserid."','lightyellow.jpg','lightyellow.jpg','jpg',803.00,'image/jpeg','/content/system/stock/lightyellow.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('nrw8hq6ovd7z9bua','','nrw8hq6ovd7z9bua','b1a9jtkat5dcn9cx','9k0cph9wqyjvr4fp','".$zuserid."','lime.jpg','lime.jpg','jpg',7819.00,'image/jpeg','/content/system/stock/lime-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('b1a9jtkat5dcn9cx','','nrw8hq6ovd7z9bua','b1a9jtkat5dcn9cx','9k0cph9wqyjvr4fp','".$zuserid."','lime.jpg','lime.jpg','jpg',7819.00,'image/jpeg','/content/system/stock/lime-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('9k0cph9wqyjvr4fp','','nrw8hq6ovd7z9bua','b1a9jtkat5dcn9cx','9k0cph9wqyjvr4fp','".$zuserid."','lime.jpg','lime.jpg','jpg',804.00,'image/jpeg','/content/system/stock/lime.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."uploads 
				(uploadid, pastuploadid, originalid, websizeid, thumbnailid, userid, filetitle, filename, fileextension, filesize, filetype, filepath, filedata, imagewidth, imageheight, stock, hidedate, hideuserid, hide, checkeddate, checkeduserid, checked, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('qyl4uuq24epdn72n','','qyl4uuq24epdn72n','435hzhemvj1myxpu','320u6dadyndzqsp7','".$zuserid."','maroon.jpg','maroon.jpg','jpg',7796.00,'image/jpeg','/content/system/stock/maroon-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('435hzhemvj1myxpu','','qyl4uuq24epdn72n','435hzhemvj1myxpu','320u6dadyndzqsp7','".$zuserid."','maroon.jpg','maroon.jpg','jpg',7796.00,'image/jpeg','/content/system/stock/maroon-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('320u6dadyndzqsp7','','qyl4uuq24epdn72n','435hzhemvj1myxpu','320u6dadyndzqsp7','".$zuserid."','maroon.jpg','maroon.jpg','jpg',803.00,'image/jpeg','/content/system/stock/maroon.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('oae5i6axt9xs7lfc','','oae5i6axt9xs7lfc','ssi9pqkmgfsoyt6g','rbbm6zcvaub2dm2e','".$zuserid."','mediumgray.jpg','mediumgray.jpg','jpg',7794.00,'image/jpeg','/content/system/stock/mediumgray-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ssi9pqkmgfsoyt6g','','oae5i6axt9xs7lfc','ssi9pqkmgfsoyt6g','rbbm6zcvaub2dm2e','".$zuserid."','mediumgray.jpg','mediumgray.jpg','jpg',7794.00,'image/jpeg','/content/system/stock/mediumgray-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('rbbm6zcvaub2dm2e','','oae5i6axt9xs7lfc','ssi9pqkmgfsoyt6g','rbbm6zcvaub2dm2e','".$zuserid."','mediumgray.jpg','mediumgray.jpg','jpg',801.00,'image/jpeg','/content/system/stock/mediumgray.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('jsa2ib07x3nxol0a','','jsa2ib07x3nxol0a','fmt7k7eetvwulfa8','whtj9om3lrxfa8aq','".$zuserid."','metal.jpg','metal.jpg','jpg',13485.00,'image/jpeg','/content/system/stock/metal-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('fmt7k7eetvwulfa8','','jsa2ib07x3nxol0a','fmt7k7eetvwulfa8','whtj9om3lrxfa8aq','".$zuserid."','metal.jpg','metal.jpg','jpg',13485.00,'image/jpeg','/content/system/stock/metal-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('whtj9om3lrxfa8aq','','jsa2ib07x3nxol0a','fmt7k7eetvwulfa8','whtj9om3lrxfa8aq','".$zuserid."','metal.jpg','metal.jpg','jpg',899.00,'image/jpeg','/content/system/stock/metal.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('rfso28z9d3bdu42y','','rfso28z9d3bdu42y','p3a7548r37pzqpev','fcg9ws5gsjd7x2ko','".$zuserid."','rock.jpg','rock.jpg','jpg',69999.00,'image/jpeg','/content/system/stock/rock-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('p3a7548r37pzqpev','','rfso28z9d3bdu42y','p3a7548r37pzqpev','fcg9ws5gsjd7x2ko','".$zuserid."','rock.jpg','rock.jpg','jpg',69999.00,'image/jpeg','/content/system/stock/rock-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('fcg9ws5gsjd7x2ko','','rfso28z9d3bdu42y','p3a7548r37pzqpev','fcg9ws5gsjd7x2ko','".$zuserid."','rock.jpg','rock.jpg','jpg',10913.00,'image/jpeg','/content/system/stock/rock.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('euze10zvfjdadxho','','euze10zvfjdadxho','crri9taz06tmm9fd','4nwhtjc15ozveess','".$zuserid."','water.jpg','water.jpg','jpg',90473.00,'image/jpeg','/content/system/stock/water-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('crri9taz06tmm9fd','','euze10zvfjdadxho','crri9taz06tmm9fd','4nwhtjc15ozveess','".$zuserid."','water.jpg','water.jpg','jpg',90473.00,'image/jpeg','/content/system/stock/water-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('4nwhtjc15ozveess','','euze10zvfjdadxho','crri9taz06tmm9fd','4nwhtjc15ozveess','".$zuserid."','water.jpg','water.jpg','jpg',14169.00,'image/jpeg','/content/system/stock/water.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('yt9ueg49vopigrgx','','yt9ueg49vopigrgx','igslndzqsp6r8wte','uc6tmokq1wgjb17w','".$zuserid."','orange.jpg','orange.jpg','jpg',7796.00,'image/jpeg','/content/system/stock/orange-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('igslndzqsp6r8wte','','yt9ueg49vopigrgx','igslndzqsp6r8wte','uc6tmokq1wgjb17w','".$zuserid."','orange.jpg','orange.jpg','jpg',7796.00,'image/jpeg','/content/system/stock/orange-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('uc6tmokq1wgjb17w','','yt9ueg49vopigrgx','igslndzqsp6r8wte','uc6tmokq1wgjb17w','".$zuserid."','orange.jpg','orange.jpg','jpg',804.00,'image/jpeg','/content/system/stock/orange.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('srgygdiflqtx641s','','srgygdiflqtx641s','r38ukbt46kbt6eg2','jxy3jfjdbd0vebga','".$zuserid."','redbox.jpg','redbox.jpg','jpg',29323.00,'image/jpeg','/content/system/stock/redbox-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('r38ukbt46kbt6eg2','','srgygdiflqtx641s','r38ukbt46kbt6eg2','jxy3jfjdbd0vebga','".$zuserid."','redbox.jpg','redbox.jpg','jpg',29323.00,'image/jpeg','/content/system/stock/redbox-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('jxy3jfjdbd0vebga','','srgygdiflqtx641s','r38ukbt46kbt6eg2','jxy3jfjdbd0vebga','".$zuserid."','redbox.jpg','redbox.jpg','jpg',2049.00,'image/jpeg','/content/system/stock/redbox.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('sx658qxip13cdwea','','sx658qxip13cdwea','dpcn5tovc4ns2wat','w0cof34ekmhkc16t','".$zuserid."','pink.jpg','pink.jpg','jpg',7821.00,'image/jpeg','/content/system/stock/pink-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('dpcn5tovc4ns2wat','','sx658qxip13cdwea','dpcn5tovc4ns2wat','w0cof34ekmhkc16t','".$zuserid."','pink.jpg','pink.jpg','jpg',7821.00,'image/jpeg','/content/system/stock/pink-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('w0cof34ekmhkc16t','','sx658qxip13cdwea','dpcn5tovc4ns2wat','w0cof34ekmhkc16t','".$zuserid."','pink.jpg','pink.jpg','jpg',803.00,'image/jpeg','/content/system/stock/pink.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('7fjedpfzl2kmfa62','','7fjedpfzl2kmfa62','o0ys321zvfjeesre','5eifkmbszktfp963','".$zuserid."','purple.jpg','purple.jpg','jpg',7796.00,'image/jpeg','/content/system/stock/purple-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('o0ys321zvfjeesre','','7fjedpfzl2kmfa62','o0ys321zvfjeesre','5eifkmbszktfp963','".$zuserid."','purple.jpg','purple.jpg','jpg',7796.00,'image/jpeg','/content/system/stock/purple-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('5eifkmbszktfp963','','7fjedpfzl2kmfa62','o0ys321zvfjeesre','5eifkmbszktfp963','".$zuserid."','purple.jpg','purple.jpg','jpg',803.00,'image/jpeg','/content/system/stock/purple.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('vq37temwmgen03gz','','vq37temwmgen03gz','syf7uj7fi8nimkz6','sjbxon868lcuaub5','".$zuserid."','red.jpg','red.jpg','jpg',7858.00,'image/jpeg','/content/system/stock/red-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('syf7uj7fi8nimkz6','','vq37temwmgen03gz','syf7uj7fi8nimkz6','sjbxon868lcuaub5','".$zuserid."','red.jpg','red.jpg','jpg',7858.00,'image/jpeg','/content/system/stock/red-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('sjbxon868lcuaub5','','vq37temwmgen03gz','syf7uj7fi8nimkz6','sjbxon868lcuaub5','".$zuserid."','red.jpg','red.jpg','jpg',804.00,'image/jpeg','/content/system/stock/red.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ne24cf5fo5q8y1bf','','ne24cf5fo5q8y1bf','si7fh8nl2haxs4b7','hdev7d80f5dg6hvw','".$zuserid."','sandart.jpg','sandart.jpg','jpg',85013.00,'image/jpeg','/content/system/stock/sandart-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('si7fh8nl2haxs4b7','','ne24cf5fo5q8y1bf','si7fh8nl2haxs4b7','hdev7d80f5dg6hvw','".$zuserid."','sandart.jpg','sandart.jpg','jpg',85013.00,'image/jpeg','/content/system/stock/sandart-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('hdev7d80f5dg6hvw','','ne24cf5fo5q8y1bf','si7fh8nl2haxs4b7','hdev7d80f5dg6hvw','".$zuserid."','sandart.jpg','sandart.jpg','jpg',2129.00,'image/jpeg','/content/system/stock/sandart.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('lqwbwk5zilgj9qwc','','lqwbwk5zilgj9qwc','099l50n4p5mojmhl','u0hdg35fqfw9k0dv','".$zuserid."','rubber.jpg','rubber.jpg','jpg',50229.00,'image/jpeg','/content/system/stock/rubber-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('099l50n4p5mojmhl','','lqwbwk5zilgj9qwc','099l50n4p5mojmhl','u0hdg35fqfw9k0dv','".$zuserid."','rubber.jpg','rubber.jpg','jpg',50229.00,'image/jpeg','/content/system/stock/rubber-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('u0hdg35fqfw9k0dv','','lqwbwk5zilgj9qwc','099l50n4p5mojmhl','u0hdg35fqfw9k0dv','".$zuserid."','rubber.jpg','rubber.jpg','jpg',1947.00,'image/jpeg','/content/system/stock/rubber.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('yvhuq7r6osw7avfj','','yvhuq7r6osw7avfj','3lmd128y1esutml3','cexgi45c867hvti4','".$zuserid."','sand.jpg','sand.jpg','jpg',44476.00,'image/jpeg','/content/system/stock/sand-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('3lmd128y1esutml3','','yvhuq7r6osw7avfj','3lmd128y1esutml3','cexgi45c867hvti4','".$zuserid."','sand.jpg','sand.jpg','jpg',44476.00,'image/jpeg','/content/system/stock/sand-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('cexgi45c867hvti4','','yvhuq7r6osw7avfj','3lmd128y1esutml3','cexgi45c867hvti4','".$zuserid."','sand.jpg','sand.jpg','jpg',1164.00,'image/jpeg','/content/system/stock/sand.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('zruzdwebdxglk2ko','','zruzdwebdxglk2ko','i0kr5hx669uflnkt','gp6q4h0kvld4h30t','".$zuserid."','canvas.jpg','canvas.jpg','jpg',50766.00,'image/jpeg','/content/system/stock/canvas-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."uploads 
				(uploadid, pastuploadid, originalid, websizeid, thumbnailid, userid, filetitle, filename, fileextension, filesize, filetype, filepath, filedata, imagewidth, imageheight, stock, hidedate, hideuserid, hide, checkeddate, checkeduserid, checked, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('i0kr5hx669uflnkt','','zruzdwebdxglk2ko','i0kr5hx669uflnkt','gp6q4h0kvld4h30t','".$zuserid."','canvas.jpg','canvas.jpg','jpg',50766.00,'image/jpeg','/content/system/stock/canvas-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('gp6q4h0kvld4h30t','','zruzdwebdxglk2ko','i0kr5hx669uflnkt','gp6q4h0kvld4h30t','".$zuserid."','canvas.jpg','canvas.jpg','jpg',1805.00,'image/jpeg','/content/system/stock/canvas.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('4kgmnhfqdo98fg1s','','4kgmnhfqdo98fg1s','6vwws9z2ernxrzl4','27tenzzzxr0pjk9l','".$zuserid."','cork.jpg','cork.jpg','jpg',49487.00,'image/jpeg','/content/system/stock/cork-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('6vwws9z2ernxrzl4','','4kgmnhfqdo98fg1s','6vwws9z2ernxrzl4','27tenzzzxr0pjk9l','".$zuserid."','cork.jpg','cork.jpg','jpg',49487.00,'image/jpeg','/content/system/stock/cork-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('27tenzzzxr0pjk9l','','4kgmnhfqdo98fg1s','6vwws9z2ernxrzl4','27tenzzzxr0pjk9l','".$zuserid."','cork.jpg','cork.jpg','jpg',1516.00,'image/jpeg','/content/system/stock/cork.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('xvle6r7q4cdwas48','','xvle6r7q4cdwas48','ij7fi8qv7dbgb6zc','5owk4v2paam9hlk0','".$zuserid."','stucco.jpg','stucco.jpg','jpg',48246.00,'image/jpeg','/content/system/stock/stucco-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ij7fi8qv7dbgb6zc','','xvle6r7q4cdwas48','ij7fi8qv7dbgb6zc','5owk4v2paam9hlk0','".$zuserid."','stucco.jpg','stucco.jpg','jpg',48246.00,'image/jpeg','/content/system/stock/stucco-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('5owk4v2paam9hlk0','','xvle6r7q4cdwas48','ij7fi8qv7dbgb6zc','5owk4v2paam9hlk0','".$zuserid."','stucco.jpg','stucco.jpg','jpg',4214.00,'image/jpeg','/content/system/stock/stucco.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('j8j1jk6awlbu8oob','','j8j1jk6awlbu8oob','7orpcjosyct5b1bf','hrdlwpu3xbt46j69','".$zuserid."','vaxis.png','vaxis.png','png',1931.00,'image/png','/content/system/stock/vaxis-512x512.png',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('7orpcjosyct5b1bf','','j8j1jk6awlbu8oob','7orpcjosyct5b1bf','hrdlwpu3xbt46j69','".$zuserid."','vaxis.png','vaxis.png','png',1931.00,'image/png','/content/system/stock/vaxis-512x512.png',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('hrdlwpu3xbt46j69','','j8j1jk6awlbu8oob','7orpcjosyct5b1bf','hrdlwpu3xbt46j69','".$zuserid."','vaxis.png','vaxis.png','png',211.00,'image/png','/content/system/stock/vaxis.png',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('0n72qh8nkwq2392j','','0n72qh8nkwq2392j','n5tkhoxk4w2qdqib','1acvat7nlz840lz2','".$zuserid."','white.jpg','white.jpg','jpg',7886.00,'image/jpeg','/content/system/stock/white-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('n5tkhoxk4w2qdqib','','0n72qh8nkwq2392j','n5tkhoxk4w2qdqib','1acvat7nlz840lz2','".$zuserid."','white.jpg','white.jpg','jpg',7886.00,'image/jpeg','/content/system/stock/white-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('1acvat7nlz840lz2','','0n72qh8nkwq2392j','n5tkhoxk4w2qdqib','1acvat7nlz840lz2','".$zuserid."','white.jpg','white.jpg','jpg',806.00,'image/jpeg','/content/system/stock/white.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('q10xngdeyl4vwy07','','q10xngdeyl4vwy07','h336lea89olz2do8','yxs6lcxokr6lhll3','".$zuserid."','yellow.jpg','yellow.jpg','jpg',7802.00,'image/jpeg','/content/system/stock/yellow-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('h336lea89olz2do8','','q10xngdeyl4vwy07','h336lea89olz2do8','yxs6lcxokr6lhll3','".$zuserid."','yellow.jpg','yellow.jpg','jpg',7802.00,'image/jpeg','/content/system/stock/yellow-512x512.jpg',NULL,512.00,512.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('yxs6lcxokr6lhll3','','q10xngdeyl4vwy07','h336lea89olz2do8','yxs6lcxokr6lhll3','".$zuserid."','yellow.jpg','yellow.jpg','jpg',804.00,'image/jpeg','/content/system/stock/yellow.jpg',null,80.00,80.00,1,NULL,'',0,'".$ztimestamp."','".$zuserid."',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");
			$this->checkDBVersionData($zuserid);
		} catch (Exception $e) {
			global $wtw;
			$wtw->serror("core-functions-tabledefs.php-loadInitDbData=".$e->getMessage());
		}
	}
	
	public function checkDBVersionData($zuserid) {
		/* this process will check database for correct or new values for this version and future versions */
		global $wtw;
		try {
			global $wtwdb;
			set_time_limit(0);
			$ztimestamp = date('Y/m/d H:i:s');
			$zversion = $wtw->version;
			$zdbversion = $wtw->dbversion;
			$zoldversion = $wtw->oldversion;
			$zolddbversion = $wtw->olddbversion;
			$zoldversion1 = 0;
			$zoldversion2 = 0;
			$zoldversion3 = 0;
			list($zoldversion1, $zoldversion2, $zoldversion3) = explode('.', $zoldversion);
		
			if (($zoldversion1 == 3 && $zoldversion2 < 5) || $zoldversion1 < 3) {
				/* updated v3.3.0 - allow more scaling decimal places for avatars */
				$zresults = $wtwdb->query("select COLUMN_TYPE as columntype from INFORMATION_SCHEMA.COLUMNS where table_name='".wtw_tableprefix."useravatars' AND COLUMN_NAME = 'scalingx';");
				foreach ($zresults as $zrow) {
					if ($zrow["columntype"] != "decimal(18,4)") {
						$wtwdb->query("ALTER TABLE `".wtw_tableprefix."useravatars` 
							CHANGE COLUMN `scalingx` `scalingx` DECIMAL(18,4) NULL DEFAULT '1.0000' ;");
						$wtwdb->query("ALTER TABLE `".wtw_tableprefix."useravatars` 
							CHANGE COLUMN `scalingy` `scalingy` DECIMAL(18,4) NULL DEFAULT '1.0000' ;");
						$wtwdb->query("ALTER TABLE `".wtw_tableprefix."useravatars` 
							CHANGE COLUMN `scalingz` `scalingz` DECIMAL(18,4) NULL DEFAULT '1.0000' ;");
					}
				}
				
				/* updated 3.4.3 - look for system based avatars */
				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avatars where objectfolder like '%/content/system/avatars/%' and deleted=0;");
				/* updated 3.4.3 - also check for empty table (means new install or needs to be repopulated) */
				/* to force this not to execute, keep at least 2 original avatars - but you can flag them as deleted=1 in the table */
				$zresults2 = $wtwdb->query("select avatarid from ".wtw_tableprefix."avatars where avatarid='3b9bt5c70igtmqux' or avatarid='641svy8bwjx2kme7' or avatarid='9e94useo7x2ief0s' or avatarid='aajvq38y06vulgh0' or avatarid='dihtmpm1ae3b9d3a' or avatarid='h1ro3h59xs5eknl0' or avatarid='odtx7arzof5eigp4' or avatarid='p7y3p6ti6d85yf7q' or avatarid='r8tgsns20ruwx0bg' or avatarid='v1ij2rkmdypo97c2';");
				
				if (count($zresults) > 0 || count($zresults2) < 3) {
					/* updated 3.4.3 - remove old system based avatars */
					$wtwdb->query("delete from ".wtw_tableprefix."avatars where avatarid='3b9bt5c70igtmqux' or avatarid='641svy8bwjx2kme7' or avatarid='9e94useo7x2ief0s' or avatarid='aajvq38y06vulgh0' or avatarid='dihtmpm1ae3b9d3a' or avatarid='h1ro3h59xs5eknl0' or avatarid='odtx7arzof5eigp4' or avatarid='p7y3p6ti6d85yf7q' or avatarid='r8tgsns20ruwx0bg' or avatarid='v1ij2rkmdypo97c2';");
					$wtwdb->query("delete from ".wtw_tableprefix."avatarcolors where avatarid='3b9bt5c70igtmqux' or avatarid='641svy8bwjx2kme7' or avatarid='9e94useo7x2ief0s' or avatarid='aajvq38y06vulgh0' or avatarid='dihtmpm1ae3b9d3a' or avatarid='h1ro3h59xs5eknl0' or avatarid='odtx7arzof5eigp4' or avatarid='p7y3p6ti6d85yf7q' or avatarid='r8tgsns20ruwx0bg' or avatarid='v1ij2rkmdypo97c2';");

					/* updated 3.7.0 - add new avatars */
					$wtwdb->query("
						INSERT INTO ".wtw_tableprefix."avatars 
						(avatarid, pastavatarid, hostuserid, versionid, version, versionorder, versiondesc, avatargroup, displayname, avatardescription, objectfolder, objectfile, gender, positionx, positiony, positionz, scalingx, scalingy, scalingz, rotationx, rotationy, rotationz, startframe, endframe, sortorder, templatename, description, tags, snapshotid, shareuserid, sharehash, sharetemplatedate, alttag, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
						VALUES 
						('aajvq38y06vulgh0','','','aajvq38y06vulgh0','1.0.1',1000001,'Updated to 131 Animations!','Default','Pearl','Blonde Haired Female Child with long sleeved shirt and shorts','/content/uploads/avatars/aajvq38y06vulgh0/','pearlidle.babylon','female',0.00,0.00,0.00,0.0900,0.0900,0.0900,0.00,-90.00,0.00,1,325,3,'Pearl','Blonde Haired Female Child with long sleeved shirt and shorts.','Avatar, Default, Female, Child','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
						('h1ro3h59xs5eknl0','','','h1ro3h59xs5eknl0','1.0.1',1000001,'Updated to 131 Animations!','Default','Shae','Black Haired Female with black jacket, long pants, and boots','/content/uploads/avatars/h1ro3h59xs5eknl0/','shaeidle.babylon','female',0.00,0.00,0.00,0.0400,0.0400,0.0400,0.00,-90.00,0.00,1,303,3,'Shae','Black Haired Female with black jacket, long pants, and boots','Avatar, Default, Female','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
						('3b9bt5c70igtmqux','','','3b9bt5c70igtmqux','1.0.1',1000001,'Updated to 131 Animations!','Anonymous','Anonymous Male','Anonymous Male Android','/content/uploads/avatars/3b9bt5c70igtmqux/','maleidle.babylon','male',0.00,0.00,0.00,0.0800,0.0800,0.0800,0.00,-90.00,0.00,1,213,2,'Anonymous Male','Anonymous Male avatar with a default blue color and robotic android look. ','Avatar, Anonymous, android, robot','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
						('odtx7arzof5eigp4','','','odtx7arzof5eigp4','1.0.1',1000001,'Updated to 131 Animations!','Default','Regina','Black Haired Female with tank top, long pants, and hat','/content/uploads/avatars/odtx7arzof5eigp4/','reginaidle.babylon','female',0.00,0.00,0.00,0.0400,0.0400,0.0400,0.00,-90.00,0.00,1,241,3,'Regina','Black Haired Female with tank top, long pants, and hat','Avatar, Default, Female','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
						('p7y3p6ti6d85yf7q','','','p7y3p6ti6d85yf7q','1.0.1',1000001,'Updated to 131 Animations!','Anonymous','Anonymous Female','Anonymous Female Android','/content/uploads/avatars/p7y3p6ti6d85yf7q/','femaleidle.babylon','female',0.00,0.00,0.00,0.0800,0.0800,0.0800,0.00,-90.00,0.00,1,100,1,'Anonymous Female','Anonymous Female Android','Avatar, Anonymous, android, robot','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
						('v1ij2rkmdypo97c2','','','v1ij2rkmdypo97c2','1.0.1',1000001,'Updated to 131 Animations!','Default','Stefani','Brown Haired Female with tank top and shorts','/content/uploads/avatars/v1ij2rkmdypo97c2/','stefaniidle.babylon','female',0.00,0.00,0.00,0.0400,0.0400,0.0400,0.00,-90.00,0.00,1,363,3,'Stefani','Brown Haired Female with tank top and shorts','Avatar, Default, Female','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
						('641svy8bwjx2kme7','','','641svy8bwjx2kme7','1.0.1',1000001,'Updated to 131 Animations!','Default','Remy','Blonde Haired Male with short sleeve shirt and shorts','/content/uploads/avatars/641svy8bwjx2kme7/','remyidle.babylon','male',0.00,0.00,0.00,0.0400,0.0400,0.0400,0.00,-90.00,0.00,1,196,4,'Remy','Blonde Haired Male with short sleeve shirt and shorts','Avatar, Default, Male','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
						('9e94useo7x2ief0s','','','9e94useo7x2ief0s','1.0.1',1000001,'Updated to 131 Animations!','Default','Liam','Black Haired Male with long sleeve shirt and pants','/content/uploads/avatars/9e94useo7x2ief0s/','liamidle.babylon','male',0.00,0.00,0.00,0.0400,0.0400,0.0400,0.00,-90.00,0.00,1,200,4,'Liam','Black Haired Male with long sleeve shirt and pants','Avatar, Default, Male','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
						('dihtmpm1ae3b9d3a','','','dihtmpm1ae3b9d3a','1.1.1',1001001,'Removed a Faulty Animation, 131 Animations Active.','Default','Malcolm','Black Haired Male with half sleeve shirt, long pants, and hat','/content/uploads/avatars/dihtmpm1ae3b9d3a/','malcolmidle.babylon','male',0.00,0.00,0.00,0.0400,0.0400,0.0400,0.00,-90.00,0.00,1,195,25,'Malcolm','Black Haired Male with half sleeve shirt, long pants, and hat','Avatar, Default, Male','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
						('r8tgsns20ruwx0bg','','','r8tgsns20ruwx0bg','1.0.1',1000001,'Updated to 131 Animations!','Default','Jasper','Orange Haired Male Child','/content/uploads/avatars/r8tgsns20ruwx0bg/','jasperidle.babylon','male',0.00,0.00,0.00,0.0900,0.0900,0.0900,0.00,-90.00,0.00,1,71,4,'Jasper','Orange Haired Male Child with short sleeved shirt and shorts.','Avatar, Default, Male, Child','','','',NULL,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
					");
					
					/* updated 3.4.3 - add new avatar colors (parts) with the same avatarids */
					$wtwdb->query("
						INSERT INTO ".wtw_tableprefix."avatarcolors 
						(avatarpartid, pastavatarpartid, avatarid, avatarpart, diffusecolor, specularcolor, emissivecolor, ambientcolor, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
						VALUES 
						('f411l0wtsjd938b3', '', 'aajvq38y06vulgh0', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('skhk514cfn6z6528', '', 'aajvq38y06vulgh0', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('twvty9thzku85bzy', '', 'aajvq38y06vulgh0', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('t1fn2kip0t3ek6k3', '', 'aajvq38y06vulgh0', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('789zg2mbpirdaefz', '', 'aajvq38y06vulgh0', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('fkdfdshjsgnhiv91', '', 'aajvq38y06vulgh0', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('39ue6qhus79oyuq2', '', 'aajvq38y06vulgh0', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('ybdjum9lceqriu3l', '', 'h1ro3h59xs5eknl0', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('99dfpy7ffwywgykb', '', 'h1ro3h59xs5eknl0', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('s0kgfni1ksp7wypv', '', 'h1ro3h59xs5eknl0', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('tud2y63eh8f07lgr', '', 'h1ro3h59xs5eknl0', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('sxykax0jn240aymt', '', 'h1ro3h59xs5eknl0', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('mwmy1ls9ro0b2k85', '', 'h1ro3h59xs5eknl0', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('5k2b3nv5ih945e6d', '', 'h1ro3h59xs5eknl0', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('mfycst1inbeobx05', '', 'odtx7arzof5eigp4', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('320ez8wnt7pi538i', '', 'odtx7arzof5eigp4', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('j3gkj9t025ax9rhs', '', 'odtx7arzof5eigp4', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('2nr5nlf62qtfkkxq', '', 'odtx7arzof5eigp4', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('rl029y75fj1coxyp', '', 'odtx7arzof5eigp4', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('mkgy5jhejme7firt', '', 'odtx7arzof5eigp4', 'Hats', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('o2br140ugumjh29q', '', 'odtx7arzof5eigp4', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('ofxbs3a4i0w76pjb', '', 'odtx7arzof5eigp4', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('vxmtb8vpvjvf3zma', '', 'p7y3p6ti6d85yf7q', 'Beta_Joints', '#4C2121', '#000000', '#000000', '#4C2121', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('n89yro60qtgyy93v', '', 'p7y3p6ti6d85yf7q', 'Beta_Surface', '#EB5F5F', '#000000', '#000000', '#EB5F5F', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('dfnl46bdj5o8r0gq', '', 'v1ij2rkmdypo97c2', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('o28c083kl7r39w8c', '', 'v1ij2rkmdypo97c2', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('41e6r3eftk9bmzq9', '', 'v1ij2rkmdypo97c2', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('16t9ay39xyu7x6u4', '', 'v1ij2rkmdypo97c2', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('go4qcewxqkzep92r', '', 'v1ij2rkmdypo97c2', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('alrjnt7sat4cvx1c', '', 'v1ij2rkmdypo97c2', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('cxsfyd6lqjfatjsb', '', 'v1ij2rkmdypo97c2', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('n7ggpnsdmvafn27q', '', '3b9bt5c70igtmqux', 'Alpha_Joints', '#47547F', '#000000', '#000000', '#47547F', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('whq222ptqbcwhbpe', '', '3b9bt5c70igtmqux', 'Alpha_Surface', '#31A6FD', '#000000', '#000000', '#31A6FD', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('pt96upqdo1ru1yny', '', '641svy8bwjx2kme7', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('2x1u3pmt6xwp12gk', '', '641svy8bwjx2kme7', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('wjd8qs4v98d5y4cx', '', '641svy8bwjx2kme7', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('g4h2vp1mtk6ofy2t', '', '641svy8bwjx2kme7', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('bfd5zs7qydryrh3t', '', '641svy8bwjx2kme7', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('9xm4fbcy6y9jb13m', '', '641svy8bwjx2kme7', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('2ze2ozdpolqedzz4', '', '641svy8bwjx2kme7', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('gmr5gbvgibrwm60r', '', '9e94useo7x2ief0s', 'Body', '#FFFFFF', '#000000', '#000000', '#ffffff', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('jv39gf5r987oihmu', '', '9e94useo7x2ief0s', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('2ciipvngwn3wzreg', '', '9e94useo7x2ief0s', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('w62hm4xe4r3d7d2b', '', '9e94useo7x2ief0s', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('5a26y5b3f6z72yuu', '', '9e94useo7x2ief0s', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('vbpzojwthsuzmx2i', '', '9e94useo7x2ief0s', 'Tops', '#ffffff', '#000000', '#000000', '#ffffff', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('riko7jfagi42kvoq', '', 'dihtmpm1ae3b9d3a', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('lxmqh7ux9z5ha1q1', '', 'dihtmpm1ae3b9d3a', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('8zrvrc0yv3njmyhh', '', 'dihtmpm1ae3b9d3a', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('o477h8qsjou40mv3', '', 'dihtmpm1ae3b9d3a', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('p80ygek28v4htplx', '', 'dihtmpm1ae3b9d3a', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('dujy29stjr1d3fxx', '', 'dihtmpm1ae3b9d3a', 'Hats', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('0z6w4naqcxya572c', '', 'dihtmpm1ae3b9d3a', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('r8jk0vdiqt477w3q', '', 'dihtmpm1ae3b9d3a', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('i26nosqecbdflfbt', '', 'r8tgsns20ruwx0bg', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('rvz45hxmna26uhtg', '', 'r8tgsns20ruwx0bg', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('vga26dqzrdmu05q6', '', 'r8tgsns20ruwx0bg', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('lq9c84ora5mqzei5', '', 'r8tgsns20ruwx0bg', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('2mbft9rzjxflby1w', '', 'r8tgsns20ruwx0bg', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('xnjwcxxfcsva4kcc', '', 'r8tgsns20ruwx0bg', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
						('d1rtqn7rmyhcenky', '', 'r8tgsns20ruwx0bg', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
					");
					
					/* updated 3.7.0 - add new avatar animations with the same avatarids */
					$zavatars = array(
						array('ind'=>'01', 'avatarid'=>'aajvq38y06vulgh0', 'gender'=>'female'),
						array('ind'=>'02', 'avatarid'=>'h1ro3h59xs5eknl0', 'gender'=>'female'),
						array('ind'=>'03', 'avatarid'=>'odtx7arzof5eigp4', 'gender'=>'female'),
						array('ind'=>'04', 'avatarid'=>'p7y3p6ti6d85yf7q', 'gender'=>'female'),
						array('ind'=>'05', 'avatarid'=>'v1ij2rkmdypo97c2', 'gender'=>'female'),
						array('ind'=>'06', 'avatarid'=>'3b9bt5c70igtmqux', 'gender'=>'male'),
						array('ind'=>'07', 'avatarid'=>'641svy8bwjx2kme7', 'gender'=>'male'),
						array('ind'=>'08', 'avatarid'=>'9e94useo7x2ief0s', 'gender'=>'male'),
						array('ind'=>'09', 'avatarid'=>'dihtmpm1ae3b9d3a', 'gender'=>'male'),
						array('ind'=>'10', 'avatarid'=>'r8tgsns20ruwx0bg', 'gender'=>'male')
					);
					
					foreach ($zavatars as $zavatar) {
						$zavatarid = $zavatar["avatarid"];
						$zavatarind = $zavatar["ind"];
						$zavatargender = $zavatar["gender"];
						switch ($zavatarid) {
							case 'aajvq38y06vulgh0':
								$wtwdb->query("
									INSERT INTO ".wtw_tableprefix."avataranimations 
									(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
									VALUES
									('".$zavatarind."o4kgmoik9nf8ws', '', 'aajvq38y06vulgh0', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/aajvq38y06vulgh0/', 'pearlidle.babylon', '1', '325', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
									('".$zavatarind."dup8ie7d1rfhqk', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Dance - Twist', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-dance.babylon', '1', '227', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
								");
								break;
							case 'h1ro3h59xs5eknl0':
								$wtwdb->query("
									INSERT INTO ".wtw_tableprefix."avataranimations 
									(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
									VALUES
									('".$zavatarind."5nt31zrtvvq4cd', '', 'h1ro3h59xs5eknl0', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/', 'shaeidle.babylon', '1', '303', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
									('".$zavatarind."i4zorwvhpsw2py', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Dance - Salsa', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-dance.babylon', '1', '288', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
								");
								break;
							case 'odtx7arzof5eigp4':
								$wtwdb->query("
									INSERT INTO ".wtw_tableprefix."avataranimations 
									(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
									VALUES
									('".$zavatarind."o3h47opkqwat7m', '', 'odtx7arzof5eigp4', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/odtx7arzof5eigp4/', 'reginaidle.babylon', '1', '241', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
									('".$zavatarind."zd6710kd1l7emj', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Dance - Wave Hip Hop', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-dance.babylon', '1', '405', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
								");
								break;
							case 'p7y3p6ti6d85yf7q':
								$wtwdb->query("
									INSERT INTO ".wtw_tableprefix."avataranimations 
									(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
									VALUES
									('".$zavatarind."ohb6x5ze1112a9', '', 'p7y3p6ti6d85yf7q', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/', 'femaleidle.babylon', '1', '100', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
									('".$zavatarind."3oz4dv3yvnu8qt', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Dance - Hip Hop', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-dance.babylon', '1', '153', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
								");
								break;
							case 'v1ij2rkmdypo97c2':
								$wtwdb->query("
									INSERT INTO ".wtw_tableprefix."avataranimations 
									(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
									VALUES
									('".$zavatarind."n3i9s7ophcae5h', '', 'v1ij2rkmdypo97c2', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/', 'stefaniidle.babylon', '1', '363', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
									('".$zavatarind."o5gyo65yutc5rr', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Dance - Swing', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-dance.babylon', '1', '503', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
								");
								break;
							case '3b9bt5c70igtmqux':
								$wtwdb->query("
									INSERT INTO ".wtw_tableprefix."avataranimations 
									(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
									VALUES
									('".$zavatarind."r9087b004i9ptv', '', '3b9bt5c70igtmqux', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/3b9bt5c70igtmqux/', 'maleidle.babylon', '1', '213', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
									('".$zavatarind."yy0o3qcfafzi1p', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Dance - Hip Hop', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-dance.babylon', '1', '369', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
								");
								break;
							case '641svy8bwjx2kme7':
								$wtwdb->query("
									INSERT INTO ".wtw_tableprefix."avataranimations 
									(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
									VALUES
									('".$zavatarind."wc004i6dcn4rdn', '', '641svy8bwjx2kme7', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/641svy8bwjx2kme7/', 'remyidle.babylon', '1', '196', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
									('".$zavatarind."7uboixxjjqa4vr', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Dance - House', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-dance.babylon', '1', '629', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
								");
								break;
							case '9e94useo7x2ief0s':
								$wtwdb->query("
									INSERT INTO ".wtw_tableprefix."avataranimations 
									(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
									VALUES
									('".$zavatarind."78k4zhhzhemwlc', '', '9e94useo7x2ief0s', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/9e94useo7x2ief0s/', 'liamidle.babylon', '1', '200', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
									('".$zavatarind."pzgd35v26kebba', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Dance - Tut Hip Hop', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-dance.babylon', '1', '407', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
								");
								break;
							case 'dihtmpm1ae3b9d3a':
								$wtwdb->query("
									INSERT INTO ".wtw_tableprefix."avataranimations 
									(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
									VALUES
									('".$zavatarind."45dg48tccn60jn', '', 'dihtmpm1ae3b9d3a', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/', 'malcolmidle.babylon', '1', '195', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
									('".$zavatarind."wf2uz0xqc97n89', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Dance - Hip Hop', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-dance.babylon', '1', '331', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
								");
								break;
							case 'r8tgsns20ruwx0bg':
								$wtwdb->query("
									INSERT INTO ".wtw_tableprefix."avataranimations 
									(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
									VALUES
									('".$zavatarind."gfso15ljwulgi6', '', 'r8tgsns20ruwx0bg', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/', 'jasperidle.babylon', '1', '71', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
									('".$zavatarind."s21wirqtwvkm3m', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Dance - Breakdance', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-dance.babylon', '1', '111', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
								");
								break;
						}
						if ($zavatargender == 'female') {
							$wtwdb->query("
								INSERT INTO ".wtw_tableprefix."avataranimations 
								(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
								VALUES
								('".$zavatarind."zszl1drqbf6npk', '', '".$zavatarid."', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/".$zavatarid."/animations/', 'femalewalk.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
								('".$zavatarind."julhnrux63xd15', '', '".$zavatarid."', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/".$zavatarid."/animations/', 'femalewalkback.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
								('".$zavatarind."03h6cacvd7x086', '', '".$zavatarid."', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/".$zavatarid."/animations/', 'femalewalkback.babylon', '1', '24', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
							");
						} else {
							$wtwdb->query("
								INSERT INTO ".wtw_tableprefix."avataranimations 
								(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
								VALUES
								('".$zavatarind."ivtj8k2n2erlpt', '', '".$zavatarid."', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/".$zavatarid."/animations/', 'malewalk.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
								('".$zavatarind."w4x8gkffxcyrxe', '', '".$zavatarid."', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/".$zavatarid."/animations/', 'malewalkback.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
								('".$zavatarind."s35fo3h6fjfh8o', '', '".$zavatarid."', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/".$zavatarid."/animations/', 'malewalkback.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
							");
						}
						
						
						$wtwdb->query("
							INSERT INTO ".wtw_tableprefix."avataranimations 
							(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
							VALUES
							('".$zavatarind."xtdev68nipxl5x','','".$zavatarid."','',48,'onturnleft','Turn Left','','/content/uploads/avatars/".$zavatarid."/animations/','maleturnleft.babylon',1,29,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."5b72o99k0bm6zg','','".$zavatarid."','',48,'onturnright','Turn Right','','/content/uploads/avatars/".$zavatarid."/animations/','maleturnright.babylon',1,29,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."x3o2chccn74zjp','','".$zavatarid."','',47,'onstrafeleft','Strafe Left','','/content/uploads/avatars/".$zavatarid."/animations/','malestrafeleft.babylon',1,26,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."g4a06vseo3i9ta','','".$zavatarid."','',47,'onstraferight','Strafe Right','','/content/uploads/avatars/".$zavatarid."/animations/','malestraferight.babylon',1,26,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."ii2qjfjecm06wy','','".$zavatarid."','',40,'onrun','Run','','/content/uploads/avatars/".$zavatarid."/animations/','malerun.babylon',1,16,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."mf8wtehb2dqkmd','','".$zavatarid."','',38,'onrunturnleft','Run Turn Left','','/content/uploads/avatars/".$zavatarid."/animations/','maleturnleft.babylon',1,29,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."yf92jhsjd5nvd8','','".$zavatarid."','',38,'onrunturnright','Run Turn Right','','/content/uploads/avatars/".$zavatarid."/animations/','maleturnright.babylon',1,29,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."s9yxs6k7fg2wd4','','".$zavatarid."','',37,'onrunstrafeleft','Run Strafe Left','','/content/uploads/avatars/".$zavatarid."/animations/','malestrafeleft.babylon',1,26,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."7y4rh3zog9wpt0','','".$zavatarid."','',37,'onrunstraferight','Run Strafe Right','','/content/uploads/avatars/".$zavatarid."/animations/','malestraferight.babylon',1,26,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."ua8jbcmsbxi5w0','','".$zavatarid."','',35,'onwait-sit','Wait - Sit','','/content/uploads/avatars/".$zavatarid."/animations/','wait-sit.babylon',1,155,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."uatc8bv9tqoi6n','','".$zavatarid."','',34,'onjump','Jump','','/content/uploads/avatars/".$zavatarid."/animations/','jump.babylon',1,46,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."vw5d9f2os7sx2x','','".$zavatarid."','',33,'onjumpwalk','Walk - Jump','','/content/uploads/avatars/".$zavatarid."/animations/','walk-jump.babylon',1,25,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."vi76lr5kg7qr96','','".$zavatarid."','',32,'onjumprun','Run - Jump','','/content/uploads/avatars/".$zavatarid."/animations/','walk-jump.babylon',1,25,1,1.50,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."fsjumsb816paf2','','".$zavatarid."','',31,'onjumpwalkbackwards','Walk Backwards - Jump','','/content/uploads/avatars/".$zavatarid."/animations/','walkbackwards-jump.babylon',1,23,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."408rwa70fagu49','','".$zavatarid."','',30,'onjumprunbackwards','Run Backwards - Jump','','/content/uploads/avatars/".$zavatarid."/animations/','walkbackwards-jump.babylon',1,23,1,1.50,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."sve58ukwpvdzyj','','".$zavatarid."','',10,'onwait-swim','Wait - Swim','','/content/uploads/avatars/".$zavatarid."/animations/','wait-swim.babylon',1,73,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."txm33odfqel7zi','','".$zavatarid."','',9,'onwalk-swim','Walk - Swim','','/content/uploads/avatars/".$zavatarid."/animations/','walk-swim.babylon',1,109,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."uz8cualgsaq93i','','".$zavatarid."','',8,'onrun-swim','Run - Swim','','/content/uploads/avatars/".$zavatarid."/animations/','walk-swim.babylon',1,109,1,1.50,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."xds0u4345q5za7','','".$zavatarid."','',7,'onwalkbackwards-swim','Walk Backwards Swim','','/content/uploads/avatars/".$zavatarid."/animations/','wait-swim.babylon',1,73,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."v245qnblckppa1','','".$zavatarid."','',6,'onrunbackwards-swim','Run Backwards Swim','','/content/uploads/avatars/".$zavatarid."/animations/','wait-swim.babylon',1,73,1,1.50,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."ksv82wdi9x6ph2','','".$zavatarid."','',2,'onsleep','Wait - Sleep','','/content/uploads/avatars/".$zavatarid."/animations/','wait-sleep.babylon',1,166,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."b1t97pcy0u1j4c','','".$zavatarid."','',1,'ondie','Die','','/content/uploads/avatars/".$zavatarid."/animations/','die.babylon',1,56,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."z5wmrgv1d6k8uj','','".$zavatarid."','',0,'onoption','Fight - Bash','','/content/uploads/avatars/".$zavatarid."/animations/','fight-bash.babylon',1,52,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."gq1ddwzkngphah','','".$zavatarid."','',0,'onoption','Fight - Block','','/content/uploads/avatars/".$zavatarid."/animations/','fight-block.babylon',1,69,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."7b3effac3zq3mk','','".$zavatarid."','',0,'onoption','Fight - Block Left','','/content/uploads/avatars/".$zavatarid."/animations/','fight-blockleft.babylon',1,29,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."d7lum9v55k9q71','','".$zavatarid."','',0,'onoption','Fight - Block Right','','/content/uploads/avatars/".$zavatarid."/animations/','fight-blockright.babylon',1,29,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."w4kvwmocaedekv','','".$zavatarid."','',0,'onoption','Fight - Cast Spell','','/content/uploads/avatars/".$zavatarid."/animations/','fight-castspell.babylon',1,185,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."tja4b3potjqhry','','".$zavatarid."','',0,'onoption','Fight - Cast Spell Two Hands','','/content/uploads/avatars/".$zavatarid."/animations/','fight-castspell2hands.babylon',1,83,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."d0ru13vesshxzw','','".$zavatarid."','',0,'onoption','Fight - Cast Wide Spell','','/content/uploads/avatars/".$zavatarid."/animations/','die-riffle.babylon',1,86,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."4ud0bh07t5w3ln','','".$zavatarid."','',0,'onoption','Fight - Cross Punch','','/content/uploads/avatars/".$zavatarid."/animations/','fight-crosspunch.babylon',1,49,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."t2676k4ndymk1l','','".$zavatarid."','',0,'onoption','Fight - Duck','','/content/uploads/avatars/".$zavatarid."/animations/','fight-duck.babylon',1,103,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."h1rbwwh1rw6bie','','".$zavatarid."','',0,'onoption','Fight - Elbow Combo','','/content/uploads/avatars/".$zavatarid."/animations/','fight-elbowcombo.babylon',1,79,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."ytgorbg82alxcf','','".$zavatarid."','',0,'onoption','Fight - Elbow to Uppercut','','/content/uploads/avatars/".$zavatarid."/animations/','fight-elbowtouppercut.babylon',1,59,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."zoidfwb975q3ma','','".$zavatarid."','',0,'onoption','Fight - Fireball','','/content/uploads/avatars/".$zavatarid."/animations/','fight-fireball.babylon',1,82,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."nq11w8fucz3vzy','','".$zavatarid."','',0,'onoption','Fight - Headbutt','','/content/uploads/avatars/".$zavatarid."/animations/','fight-headbutt.babylon',1,51,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."0moerzdda3ge34','','".$zavatarid."','',0,'onoption','Fight - Inside Crescent Kick','','/content/uploads/avatars/".$zavatarid."/animations/','fight-insidecrescent.babylon',1,65,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."55evueef7dn5va','','".$zavatarid."','',0,'onoption','Fight - Jab Right','','/content/uploads/avatars/".$zavatarid."/animations/','fight-punchright.babylon',1,52,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."s6ltngki1k2m2k','','".$zavatarid."','',0,'onoption','Fight - Kick Chapa','','/content/uploads/avatars/".$zavatarid."/animations/','fight-kickchapa.babylon',1,33,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."negbyfxf9suqr5','','".$zavatarid."','',0,'onoption','Fight - Kick Left','','/content/uploads/avatars/".$zavatarid."/animations/','fight-kickleft.babylon',1,53,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."r1txq7hqh9i9fu','','".$zavatarid."','',0,'onoption','Fight - Kick Right','','/content/uploads/avatars/".$zavatarid."/animations/','fight-kickright.babylon',1,54,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."gwjzrf6uazad4x','','".$zavatarid."','',0,'onoption','Fight - Knee Jab','','/content/uploads/avatars/".$zavatarid."/animations/','fight-kneejab.babylon',1,145,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."cuci77j60und1k','','".$zavatarid."','',0,'onoption','Fight - Knee to Uppercut','','/content/uploads/avatars/".$zavatarid."/animations/','fight-kneetouppercut.babylon',1,137,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."ingzytpvu31djl','','".$zavatarid."','',0,'onoption','Fight - Magic Heal','','/content/uploads/avatars/".$zavatarid."/animations/','fight-magicheal.babylon',1,65,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."vjzkbsilpxdzur','','".$zavatarid."','',0,'onoption','Fight - Magic Spell','','/content/uploads/avatars/".$zavatarid."/animations/','fight-magicspell.babylon',1,103,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."oh2yjob5zn5qty','','".$zavatarid."','',0,'onoption','Fight - Punch Combo','','/content/uploads/avatars/".$zavatarid."/animations/','fight-punchcombo.babylon',1,78,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."35nbytvwv7g60a','','".$zavatarid."','',0,'onoption','Fight - Punch Combo Fast','','/content/uploads/avatars/".$zavatarid."/animations/','fight-punchcombo.babylon',1,78,1,1.40,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."en4ld0zvdn9tax','','".$zavatarid."','',0,'onoption','Fight - Punch Left','','/content/uploads/avatars/".$zavatarid."/animations/','fight-punchleft.babylon',1,31,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."lm0oui2mg2op2g','','".$zavatarid."','',0,'onoption','Fight - Punch Right','','/content/uploads/avatars/".$zavatarid."/animations/','fight-punchright.babylon',1,51,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."32pppr89kevnbj','','".$zavatarid."','',0,'onoption','Fight - Quad Punch','','/content/uploads/avatars/".$zavatarid."/animations/','fight-quadpunch.babylon',1,53,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."qiwo4sgzlyaxq7','','".$zavatarid."','',0,'onoption','Fight - Right Hook','','/content/uploads/avatars/".$zavatarid."/animations/','fight-righthook.babylon',1,53,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."l4924y0tg0lm94','','".$zavatarid."','',0,'onoption','Fight - Roundhouse Kick','','/content/uploads/avatars/".$zavatarid."/animations/','fight-roundhousekick.babylon',1,61,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."y7mp191t6xp3qa','','".$zavatarid."','',0,'onoption','Fight - Taunt','','/content/uploads/avatars/".$zavatarid."/animations/','fight-taunt.babylon',1,69,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."coi6t03hnq2ebx','','".$zavatarid."','',0,'onoption','Fight - Wait','','/content/uploads/avatars/".$zavatarid."/animations/','fight-wait.babylon',1,80,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."afaxdhscvleh2b','','".$zavatarid."','',0,'onoption','Option - Agony','','/content/uploads/avatars/".$zavatarid."/animations/','option-agony.babylon',1,90,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."8q96piaohfn1f8','','".$zavatarid."','',0,'onoption','Option - Agree','','/content/uploads/avatars/".$zavatarid."/animations/','option-agree.babylon',1,47,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."467omoxzv30i3g','','".$zavatarid."','',0,'onoption','Option - Angry','','/content/uploads/avatars/".$zavatarid."/animations/','option-angry.babylon',1,79,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."etz2hx19zcn8u0','','".$zavatarid."','',0,'onoption','Option - Angry Point','','/content/uploads/avatars/".$zavatarid."/animations/','option-angrypoint.babylon',1,59,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."cy6l07s8ss1nta','','".$zavatarid."','',0,'onoption','Option - Arm Gesture','','/content/uploads/avatars/".$zavatarid."/animations/','option-armgesture.babylon',1,83,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."4zhgo15rqecpvv','','".$zavatarid."','',0,'onoption','Option - Backflip','','/content/uploads/avatars/".$zavatarid."/animations/','option-backflip.babylon',1,53,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."88dhpviyxrapyp','','".$zavatarid."','',0,'onoption','Option - Bashful','','/content/uploads/avatars/".$zavatarid."/animations/','option-bashful.babylon',1,265,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."qsd32hogy3jvzi','','".$zavatarid."','',0,'onoption','Option - Bow','','/content/uploads/avatars/".$zavatarid."/animations/','option-bow.babylon',1,67,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."amv8njmmwefnls','','".$zavatarid."','',0,'onoption','Option - Charge','','/content/uploads/avatars/".$zavatarid."/animations/','option-charge.babylon',1,138,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."elwm32oyh1a8cd','','".$zavatarid."','',0,'onoption','Option - Cocky','','/content/uploads/avatars/".$zavatarid."/animations/','option-cocky.babylon',1,71,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."logzl7t3qbhf4d','','".$zavatarid."','',0,'onoption','Option - Count','','/content/uploads/avatars/".$zavatarid."/animations/','option-count.babylon',1,160,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."8jrehjq6gh5axd','','".$zavatarid."','',0,'onoption','Option - Count Out','','/content/uploads/avatars/".$zavatarid."/animations/','option-countout.babylon',1,335,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."cz7q3hm4kw1iok','','".$zavatarid."','',0,'onoption','Option - Crazy','','/content/uploads/avatars/".$zavatarid."/animations/','option-crazy.babylon',1,121,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."e4j4b2cdgw76fv','','".$zavatarid."','',0,'onoption','Option - Cry','','/content/uploads/avatars/".$zavatarid."/animations/','option-cry.babylon',1,151,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."76cn3wttv4hq78','','".$zavatarid."','',0,'onoption','Option - Defeat','','/content/uploads/avatars/".$zavatarid."/animations/','option-defeat.babylon',1,176,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."qbjvak08ph2eik','','".$zavatarid."','',0,'onoption','Option - Disagree','','/content/uploads/avatars/".$zavatarid."/animations/','option-disagree.babylon',1,79,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."eadja58pvuljes','','".$zavatarid."','',0,'onoption','Option - Dismiss','','/content/uploads/avatars/".$zavatarid."/animations/','option-dismiss.babylon',1,54,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."uj84z08bvyln9i','','".$zavatarid."','',0,'onoption','Option - Excited','','/content/uploads/avatars/".$zavatarid."/animations/','option-excited.babylon',1,158,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."aq4m6mxtun9uki','','".$zavatarid."','',0,'onoption','Option - Fist Pump','','/content/uploads/avatars/".$zavatarid."/animations/','option-fistpump.babylon',1,92,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."53wc0y32gxvao9','','".$zavatarid."','',0,'onoption','Option - Hands Forward','','/content/uploads/avatars/".$zavatarid."/animations/','option-handsforward.babylon',1,75,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."qyc8ioqmt13kly','','".$zavatarid."','',0,'onoption','Option - Happy','','/content/uploads/avatars/".$zavatarid."/animations/','option-happy.babylon',1,241,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."96tpzau3gzal5k','','".$zavatarid."','',0,'onoption','Option - Insult','','/content/uploads/avatars/".$zavatarid."/animations/','option-insult.babylon',1,65,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."ubb2qmz78rdiqp','','".$zavatarid."','',0,'onoption','Option - Kneel','','/content/uploads/avatars/".$zavatarid."/animations/','option-kneel.babylon',1,113,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."v2fqpv9tetgs79','','".$zavatarid."','',0,'onoption','Option - Lay on Ground','','/content/uploads/avatars/".$zavatarid."/animations/','option-layonground.babylon',1,247,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."1kn12n1yx1kxbo','','".$zavatarid."','',0,'onoption','Option - Look','','/content/uploads/avatars/".$zavatarid."/animations/','option-look.babylon',1,117,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."pascnr8cp3oo0p','','".$zavatarid."','',0,'onoption','Option - Look Away','','/content/uploads/avatars/".$zavatarid."/animations/','option-lookaway.babylon',1,57,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."59721rdxty14lh','','".$zavatarid."','',0,'onoption','Option - Look Back','','/content/uploads/avatars/".$zavatarid."/animations/','option-lookback.babylon',1,98,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."34l1f87kn9nvdu','','".$zavatarid."','',0,'onoption','Option - Loser','','/content/uploads/avatars/".$zavatarid."/animations/','option-loser.babylon',1,79,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."2fuyttrieg6138','','".$zavatarid."','',0,'onoption','Option - No','','/content/uploads/avatars/".$zavatarid."/animations/','option-no.babylon',1,121,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."swnrselfin37bv','','".$zavatarid."','',0,'onoption','Option - Over Here','','/content/uploads/avatars/".$zavatarid."/animations/','option-overhere.babylon',1,77,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."bsx2fk2fgug6ip','','".$zavatarid."','',0,'onoption','Option - Pain','','/content/uploads/avatars/".$zavatarid."/animations/','option-pain.babylon',1,43,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."vtok6hf5c3yl83','','".$zavatarid."','',0,'onoption','Option - Point','','/content/uploads/avatars/".$zavatarid."/animations/','option-point.babylon',1,67,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."3honab7cjwl9yf','','".$zavatarid."','',0,'onoption','Option - Point Two Hands','','/content/uploads/avatars/".$zavatarid."/animations/','option-point2hands.babylon',1,48,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."9759sxd879nsf8','','".$zavatarid."','',0,'onoption','Option - Raise Hand','','/content/uploads/avatars/".$zavatarid."/animations/','option-raisehand.babylon',1,98,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."4zbbm5bac5s7ft','','".$zavatarid."','',0,'onoption','Option - React','','/content/uploads/avatars/".$zavatarid."/animations/','option-react.babylon',1,89,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."gvm31jivs59og0','','".$zavatarid."','',0,'onoption','Option - Reject','','/content/uploads/avatars/".$zavatarid."/animations/','option-reject.babylon',1,116,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."ezj81t8bdu1wcn','','".$zavatarid."','',0,'onoption','Option - Salute','','/content/uploads/avatars/".$zavatarid."/animations/','option-salute.babylon',1,69,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."bsbwj1k06lr73e','','".$zavatarid."','',0,'onoption','Option - Shake','','/content/uploads/avatars/".$zavatarid."/animations/','option-shake.babylon',1,43,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."9a0dsscvvf4bnh','','".$zavatarid."','',0,'onoption','Option - Shake Fist','','/content/uploads/avatars/".$zavatarid."/animations/','option-shakefist.babylon',1,59,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."klvlmvh9fwp47l','','".$zavatarid."','',0,'onoption','Option - Shake It Off','','/content/uploads/avatars/".$zavatarid."/animations/','option-shakeitoff.babylon',1,141,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."hh7vm1xttjzwvo','','".$zavatarid."','',0,'onoption','Option - Shift Weight','','/content/uploads/avatars/".$zavatarid."/animations/','option-shiftweight.babylon',1,48,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."8b5cg2v0jg86kl','','".$zavatarid."','',0,'onoption','Option - Sit on Ground','','/content/uploads/avatars/".$zavatarid."/animations/','option-sitonground.babylon',1,262,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."4x8dmwx4m9slb1','','".$zavatarid."','',0,'onoption','Option - Stretch Arms','','/content/uploads/avatars/".$zavatarid."/animations/','option-stretcharms.babylon',1,214,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."sgydh65dse2cxg','','".$zavatarid."','',0,'onoption','Option - Stretch Neck','','/content/uploads/avatars/".$zavatarid."/animations/','option-stretchneck.babylon',1,77,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."igi02svv7dh5m5','','".$zavatarid."','',0,'onoption','Option - Strong','','/content/uploads/avatars/".$zavatarid."/animations/','option-strong.babylon',1,47,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."mg059393pdki0u','','".$zavatarid."','',0,'onoption','Option - Surprised','','/content/uploads/avatars/".$zavatarid."/animations/','option-surprised.babylon',1,97,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."1hupig38faabzt','','".$zavatarid."','',0,'onoption','Option - Talk','','/content/uploads/avatars/".$zavatarid."/animations/','option-talk.babylon',1,247,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."kekcezgpwuxi78','','".$zavatarid."','',0,'onoption','Option - Taunt','','/content/uploads/avatars/".$zavatarid."/animations/','option-taunt.babylon',1,48,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."ass6y9724a8ge6','','".$zavatarid."','',0,'onoption','Option - Tell Secret','','/content/uploads/avatars/".$zavatarid."/animations/','option-tellsecret.babylon',1,263,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."2f3hoyugj5zel2','','".$zavatarid."','',0,'onoption','Option - Thank','','/content/uploads/avatars/".$zavatarid."/animations/','option-thank.babylon',1,73,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."x1lblg047s8nd6','','".$zavatarid."','',0,'onoption','Option - Thumbs Up','','/content/uploads/avatars/".$zavatarid."/animations/','option-thumbsup.babylon',1,101,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."mcd3d56lz52kra','','".$zavatarid."','',0,'onoption','Option - Touch Screen','','/content/uploads/avatars/".$zavatarid."/animations/','option-touchscreen.babylon',1,796,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."uullzdlqiiw4f4','','".$zavatarid."','',0,'onoption','Option - Victory','','/content/uploads/avatars/".$zavatarid."/animations/','option-victory.babylon',1,109,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."7nbv5yo389ltrg','','".$zavatarid."','',0,'onoption','Option - Wave','','/content/uploads/avatars/".$zavatarid."/animations/','option-wave.babylon',1,14,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."hc4n8iiaj7t46p','','".$zavatarid."','',0,'onoption','Option - Wave Quick','','/content/uploads/avatars/".$zavatarid."/animations/','option-wavequick.babylon',1,36,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."whwxnv4fwdovn3','','".$zavatarid."','',0,'onoption','Option - Whatever','','/content/uploads/avatars/".$zavatarid."/animations/','option-whatever.babylon',1,35,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."fd99jix7a6haoy','','".$zavatarid."','',0,'onoption','Option - Yawn','','/content/uploads/avatars/".$zavatarid."/animations/','option-yawn.babylon',1,201,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."zevs8s6lhvxrc8','','".$zavatarid."','',0,'onoption','Option - Yell','','/content/uploads/avatars/".$zavatarid."/animations/','option-yell.babylon',1,104,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."hne2senffsv8gb','','".$zavatarid."','',0,'onoption','Option - Yes','','/content/uploads/avatars/".$zavatarid."/animations/','option-yes.babylon',1,63,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."208y813d5mlexo','','".$zavatarid."','',-1,'onwait-fight','','','/content/uploads/avatars/".$zavatarid."/animations/','fight-wait.babylon',1,80,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."qk7c73bigh4ex8','','".$zavatarid."','',-100,'onwait-riffle','Wait - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','wait-riffle.babylon',1,207,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."6vwypoplqunx1u','','".$zavatarid."','',-101,'onwalk-riffle','Walk - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','walk-riffle.babylon',1,25,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."py46sau5a5isd9','','".$zavatarid."','',-102,'onwalkbackwards-riffle','Walk Backwards - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','walkbackwards-riffle.babylon',1,25,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."y9kvul52rightf','','".$zavatarid."','',-103,'onturnleft-riffle','Turn Left - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','turnleft-riffle.babylon',1,25,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."j47ucrkkde3056','','".$zavatarid."','',-103,'onturnright-riffle','Turn Right - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','turnright-riffle.babylon',1,25,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."vbyt0d25s9xbco','','".$zavatarid."','',-104,'onstrafeleft-riffle','Walk Strafe Left - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','walkstrafeleft-riffle.babylon',1,25,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."t2woxk2jj8emfi','','".$zavatarid."','',-104,'onstraferight-riffle','Walk Strafe Right - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','walkstraferight-riffle.babylon',1,25,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."l7a081wl5nod2h','','".$zavatarid."','',-105,'onrun-riffle','Run - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','run-riffle.babylon',1,17,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."7j6a7juf1y8ry2','','".$zavatarid."','',-106,'onrunbackwards-riffle','Run Backwards - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','runbackwards-riffle.babylon',1,13,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."78vsxedgga0rgc','','".$zavatarid."','',-107,'onrunturnleft-riffle','Run Turn Left - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','turnleft-riffle.babylon',1,25,1,2.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."ljialzxbm9r4h6','','".$zavatarid."','',-107,'onrunturnright-riffle','Run Turn Right - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','turnright-riffle.babylon',1,25,1,2.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."uidmjmzahn43de','','".$zavatarid."','',-108,'onrunstrafeleft-riffle','Run Strafe Left - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','runstrafeleft-riffle.babylon',1,13,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."vt1v6tiex4j7kt','','".$zavatarid."','',-108,'onrunstraferight-riffle','Run Strafe Right - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','runstraferight-riffle.babylon',1,13,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
							('".$zavatarind."4wwkbvnfwx02rl','','".$zavatarid."','',-109,'ondie-riffle','Die - Riffle','','/content/uploads/avatars/".$zavatarid."/animations/','die-riffle.babylon',1,72,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
						");
					}
				}
				
				/* updated v3.3.0 - avatar designer was moved to a plugin - these plugins need to be enabled on first run */
				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."plugins where pluginname='wtw-avatars';");
				if (count($zresults) == 0) { 
					$wtwdb->query("INSERT INTO ".wtw_tableprefix."plugins 
					(pluginname, active, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
					VALUES 
					('wtw-avatars',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);"); 
				}
				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."plugins where pluginname='wtw-shopping';");
				if (count($zresults) == 0) { 
					$wtwdb->query("INSERT INTO ".wtw_tableprefix."plugins 
					(pluginname, active, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
					VALUES 
					('wtw-shopping',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);"); 
				}
				
				/* updated 3.3.4 - added avatar groups as categories for avatars */
				$zresults = $wtwdb->query("
					select * 
					from ".wtw_tableprefix."avatargroups;");
				if (count($zresults) == 0) {
					$wtwdb->query("
						INSERT INTO ".wtw_tableprefix."avatargroups 
						(avatargroupid, avatargroup, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
						VALUES 
						('cphaz1acsziosye6','Anonymous','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
						('ot45ejgp5oxl6420','Default','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
					");
				}

				/* updated 3.3.4 - add hex versions of colors (phasing out rgb values in the database) */
				$this->updateColorsHex($zuserid);
				
				/* updated 3.3.5 - added Host role for sites that are hosted on the server */
				$zresults = $wtwdb->query("
					select * 
					from ".wtw_tableprefix."roles
					where rolename like 'host';");
				if (count($zresults) == 0) {
					$wtwdb->query("
						INSERT INTO ".wtw_tableprefix."roles 
						(roleid, rolename, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
						VALUES 
							('".$wtwdb->getRandomString(16,1)."','Host','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'','0');
					");
				}

				/* updated 3.4.1 - removed username from users - replaced by userid and displayname */
				$zresults = $wtwdb->query("
					show columns from ".wtw_tableprefix."users like 'username';");
				if (count($zresults) > 0) {
					$wtwdb->query("
						alter table ".wtw_tableprefix."users 
						drop column username;");
				}

				/* updated 3.4.3 - added Content Rating to the Browse Menu */
				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."menuitems where menuitemname='wtw_rating';");
				if (count($zresults) == 0) {
					$wtwdb->query("INSERT INTO ".wtw_tableprefix."menuitems 
						(menuitemid, menuitemname, menutext, menuset, menualignment, menuorder, menulevel, menuiconid, menuicon, menuaction, menuproperty, menusecurity, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted) VALUES 
							(null, 'wtw_rating', '[Not Rated]', 'main', 'right', -1001, 1, '', '/content/system/images/menurating32.png', 'show-hide', 'wtw_menucontentrating', 1, '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', null, '', 0);
					");
				}

				/* updated 3.4.4 - added items to the HUD Menu */
				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."menuitems where menutext='Player Stats' and menuset='mainmenu';");
				if (count($zresults) == 0) {
					$wtwdb->query("INSERT INTO ".wtw_tableprefix."menuitems 
						(menuitemid, menuitemname, menutext, menuset, menualignment, menuorder, menulevel, menuiconid, menuicon, menuaction, menuproperty, menusecurity, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted) VALUES 
							(null,'','Player Stats','mainmenu','left',1,1,'','','WTW.hudOpenMenuItem','1',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0);
					");
				}
				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."menuitems where menutext='Settings' and menuset='mainmenu';");
				if (count($zresults) == 0) {
					$wtwdb->query("INSERT INTO ".wtw_tableprefix."menuitems 
						(menuitemid, menuitemname, menutext, menuset, menualignment, menuorder, menulevel, menuiconid, menuicon, menuaction, menuproperty, menusecurity, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted) VALUES 
							(null,'','Settings','mainmenu','',50,1,'','','WTW.hudOpenMenuItem','50',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0);
					");
				}
				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."menuitems where menutext='<- Main Menu' and menuset='settings';");
				if (count($zresults) == 0) {
					$wtwdb->query("INSERT INTO ".wtw_tableprefix."menuitems 
						(menuitemid, menuitemname, menutext, menuset, menualignment, menuorder, menulevel, menuiconid, menuicon, menuaction, menuproperty, menusecurity, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted) VALUES 
							(null,'','<- Main Menu','settings','',1,1,'','','WTW.hudOpenMenuItem','51',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0);
					");
				}
				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."menuitems where menutext='Cameras' and menuset='settings';");
				if (count($zresults) == 0) {
					$wtwdb->query("INSERT INTO ".wtw_tableprefix."menuitems 
						(menuitemid, menuitemname, menutext, menuset, menualignment, menuorder, menulevel, menuiconid, menuicon, menuaction, menuproperty, menusecurity, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted) VALUES 
							(null,'','Cameras','settings','left',10,1,'','','WTW.hudOpenMenuItem','60',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0);
					");
				}
				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."menuitems where menutext='Profile' and menuset='settings';");
				if (count($zresults) == 0) {
					$wtwdb->query("INSERT INTO ".wtw_tableprefix."menuitems 
						(menuitemid, menuitemname, menutext, menuset, menualignment, menuorder, menulevel, menuiconid, menuicon, menuaction, menuproperty, menusecurity, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted) VALUES 
							(null,'','Profile','settings','left',100,1,'','','WTW.hudOpenMenuItem','100',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0);
					");
				}
				
				/* updated v3.4.3 populate initial avatar animation events to new table */
				$zcount = 0;
				$zresults = $wtwdb->query("select count(*) as scount from ".wtw_tableprefix."avataranimationevents;");
				foreach ($zresults as $zrow) {
					$zcount = $zrow["scount"];
				}
				if ($zcount < 10) {
					/* count of 10 gives some flexibility to remove some of the initial values, yet catches new or incomplete installs */
					$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimationevents 
					(animationeventid, animationevent, loadpriority, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
					VALUES 
					('0ktb74w8ecij4zjt','onjump',34,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('2fyimof7q0vc3ess','onrun-riffle',-105,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('2sqbe11394tq8y09','onrunturnright-riffle',-107,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('8d3en4mrzm75335h','onsleep',2,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('8eaajtfrh47mgh2t','onrunstraferight-riffle',-108,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('9nf9z4qa755c878m','onrunturnright',38,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('bajq38y2g1v8ivth','onwalk',50,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('cxmamaiq27unm8aq','onrunstraferight',37,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('gen17y72ssi59wpu','onrunturnleft-riffle',-107,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('gslmcvc16tj8k2qd','onjumpwalk',33,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('ha04nt6dexd4ftre','onrun',40,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('hll8arxe90blz5rf','onturnright-riffle',-103,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('hzii4zm4si8l8how','ondie-riffle',-109,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('i59xr1zqo99isdjm','onrunbackwards-riffle',-106,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('iwz5vunog9xvj3v2','onwait-swim',10,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('jqzt1tw4x79qtw4v','onstraferight',47,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('junpkpu43224fqfy','onjumprunbackwards',30,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('nub02cks7pxjupxh','onoption',0,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('o99ira75448vosuw','onrunbackwards',39,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('oezpkr4a2h5eklbq','onwait-riffle',-100,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('oly081kpu2rn02bc','onturnright',48,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('p9al5x62v52zpjlf','onrunbackwards-swim',6,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('q5lip3bagi30qmwo','onwait-sit',35,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('qjflqsslk4w3uwy4','onjumprun',32,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('qxfcifo3fv4yd28y','onstrafeleft-riffle',-104,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('rlqtycsx9jx09cva','onwalk-swim',9,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('rtrfttowiunsyhh0','onturnleft',48,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('si6ef0qn03i9t8qx','onjumpwalkbackwards',31,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('sresp7vr9xwoqn05','onrunstrafeleft',37,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('srfsp6q3cf36mm63','onwalk-riffle',-101,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('twz9cyrwaohhw4w2','onrun-swim',8,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('tzinndwd5ns1u1rl','onstraferight-riffle',-104,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('vze0vd5p14gxaojp','onturnleft-riffle',-103,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('w0cnbjuj6axt7mjt','ondie',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('w1jj1n6wx099hmqt','onrunstrafeleft-riffle',-108,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('xe6ovc180f1wd6ul','onwalkbackwards-riffle',-102,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('xprqbdxhq5mk1jiy','onwalkbackwards-swim',7,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('y756fjgq7vq4cbl2','onstrafeleft',47,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('ym6zgcbjq127umis','onwait',100,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('z869qu3w7ecjnodv','onrunturnleft',38,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					('zhgtra63v3v1m04m','onwalkbackwards',49,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
				}
				
				/* Update 3.4.3 - populate the additional fields in the useravataranimations table where needed */
				$zresults = $wtwdb->query("
					select ua1.*,
						a1.loadpriority as defloadpriority,
						a1.animationevent as defanimationevent,
						a1.animationfriendlyname as defanimationfriendlyname,
						a1.animationicon as defanimationicon,
						a1.objectfolder as defobjectfolder,
						a1.objectfile as defobjectfile,
						a1.startframe as defstartframe,
						a1.endframe as defendframe,
						a1.animationloop as defanimationloop,
						a1.speedratio as defspeedratio,
						a1.soundid as defsoundid,
						a1.soundmaxdistance as defsoundmaxdistance
					from ".wtw_tableprefix."useravataranimations ua1
						left join ".wtw_tableprefix."avataranimations a1
						on ua1.avataranimationid = a1.avataranimationid
					where ua1.deleted=0
						and ua1.endframe=0
						and ua1.objectfile=''
					order by ua1.useravatarid, ua1.useravataranimationid;");
				foreach ($zresults as $zrow) {
					$zloadpriority = 0;
					$zzstartframe = 0;
					$zendframe = 0;
					$zanimationloop = 1;
					$zspeedratio = 1;
					$zsoundmaxdistance = 100;
					if ($wtwdb->hasValue($zrow["defloadpriority"])) {
						$zloadpriority = $zrow["defloadpriority"];
					}
					if ($wtwdb->hasValue($zrow["defstartframe"])) {
						$zstartframe = $zrow["defstartframe"];
					}
					if ($wtwdb->hasValue($zrow["defendframe"])) {
						$zendframe = $zrow["defendframe"];
					}
					if ($wtwdb->hasValue($zrow["defanimationloop"])) {
						$zanimationloop = $zrow["defanimationloop"];
					}
					if ($wtwdb->hasValue($zrow["defspeedratio"])) {
						$zspeedratio = $zrow["defspeedratio"];
					}
					if ($wtwdb->hasValue($zrow["defsoundmaxdistance"])) {
						$zsoundmaxdistance = $zrow["defsoundmaxdistance"];
					}
					$wtwdb->query("
						update ".wtw_tableprefix."useravataranimations
						set loadpriority=".$zloadpriority.",
							animationevent='".$zrow["defanimationevent"]."',
							animationfriendlyname='".$zrow["defanimationfriendlyname"]."',
							animationicon='".$zrow["defanimationicon"]."',
							objectfolder='".$zrow["defobjectfolder"]."',
							objectfile='".$zrow["defobjectfile"]."',
							startframe=".$zstartframe.",
							endframe=".$zendframe.",
							animationloop=".$zanimationloop.",
							speedratio=".$zspeedratio.",
							soundid='".$zrow["defsoundid"]."',
							soundmaxdistance=".$zsoundmaxdistance."
						where useravataranimationid='".$zrow["useravataranimationid"]."'
						limit 1;");
				}

				/* update 3.4.3 - add the missing animations for each avatarid in useravatars */
				$zresults = $wtwdb->query("
					select aa1.*,
						ua1.useravatarid,
						uaa1.useravataranimationid
					from ".wtw_tableprefix."avataranimations aa1
						inner join ".wtw_tableprefix."avatars a1
						on aa1.avatarid = a1.avatarid
						left join ".wtw_tableprefix."useravatars ua1
						on ua1.avatarid = a1.avatarid
						left join ".wtw_tableprefix."useravataranimations uaa1
						on ua1.useravatarid = uaa1.useravatarid
						and uaa1.avataranimationid = aa1.avataranimationid
					where aa1.deleted=0
						and ua1.useravatarid is not null
						and uaa1.useravataranimationid is null
					order by avatarid, useravatarid, loadpriority desc, avataranimationid;
				");
				foreach ($zresults as $zrow) {
					$zuseravataranimationid = $wtwdb->getRandomString(16,1);
					$zloadpriority = 0;
					$zzstartframe = 0;
					$zendframe = 0;
					$zanimationloop = 1;
					$zspeedratio = 1;
					$zsoundmaxdistance = 100;
					if ($wtwdb->hasValue($zrow["loadpriority"])) {
						$zloadpriority = $zrow["loadpriority"];
					}
					if ($wtwdb->hasValue($zrow["startframe"])) {
						$zstartframe = $zrow["startframe"];
					}
					if ($wtwdb->hasValue($zrow["endframe"])) {
						$zendframe = $zrow["endframe"];
					}
					if ($wtwdb->hasValue($zrow["animationloop"])) {
						$zanimationloop = $zrow["animationloop"];
					}
					if ($wtwdb->hasValue($zrow["speedratio"])) {
						$zspeedratio = $zrow["speedratio"];
					}
					if ($wtwdb->hasValue($zrow["soundmaxdistance"])) {
						$zsoundmaxdistance = $zrow["soundmaxdistance"];
					}
					$wtwdb->query("
						insert into ".wtw_tableprefix."useravataranimations
						   (useravataranimationid,
							avataranimationid,
							useravatarid,
							loadpriority,
							animationevent,
							animationfriendlyname,
							animationicon,
							objectfolder,
							objectfile,
							startframe,
							endframe,
							animationloop,
							speedratio,
							walkspeed,
							soundid,
							soundmaxdistance,
							createdate,
							createuserid,
							updatedate,
							updateuserid)
						  values
						   ('".$zuseravataranimationid."',
							'".$zrow["avataranimationid"]."',
							'".$zrow["useravatarid"]."',
							".$zloadpriority.",
							'".$zrow["animationevent"]."',
							'".$zrow["animationfriendlyname"]."',
							'".$zrow["animationicon"]."',
							'".$zrow["objectfolder"]."',
							'".$zrow["objectfile"]."',
							".$zstartframe.",
							".$zendframe.",
							".$zanimationloop.",
							".$zspeedratio.",
							1,
							'".$zrow["soundid"]."',
							".$zsoundmaxdistance.",
							'".$ztimestamp."',
							'".$zuserid."',
							'".$ztimestamp."',
							'".$zuserid."');
					");
				}
				
				/* Updated 3.4.3 - user avatars now have their own folders on the server for all of the related files */
				$wtwdb->checkContentFolders('', '', '', '');
				$zresults = $wtwdb->query("
					select ua1.*,
						a1.rotationx as defrotationx,
						a1.rotationy as defrotationy,
						a1.rotationz as defrotationz,
						a1.startframe as defstartframe,
						a1.endframe as defendframe
					from ".wtw_tableprefix."useravatars ua1
						left join ".wtw_tableprefix."avatars a1
						on ua1.avatarid=a1.avatarid
					where ua1.objectfolder like '%/avatars/%'
					order by ua1.useravatarid;");
				foreach ($zresults as $zrow) {
					$zsourcefolder = wtw_rootpath.$zrow["objectfolder"];
					$zdestinationfolder = $wtwdb->contentpath."/uploads/useravatars/".$zrow["useravatarid"];

					if (strpos($zsourcefolder,$zrow["avatarid"]) === false) {
						if (file_exists($wtwdb->contentpath."/uploads/avatars/".$zrow["avatarid"])) {
							$zsourcefolder = $wtwdb->contentpath."/uploads/avatars/".$zrow["avatarid"];
						}
					}
					$zsourcefolder = rtrim($zsourcefolder, "/");

					if (!file_exists($zdestinationfolder)) {
						/* if folder does not exit, create it and copy the files into it */
						/* this is a safe guard, so existing folders will not be overwritten (usually means is it already complete) */
						$wtwdb->verifyFolderExists($zdestinationfolder);
						$wtwdb->copyContentSubFolderRecursive($zsourcefolder, $zdestinationfolder);
					}
					
					$wtwdb->query("
						update ".wtw_tableprefix."useravatars
						set objectfolder='/content/uploads/useravatars/".$zrow["useravatarid"]."/',
							rotationx=".$zrow["defrotationx"].",
							rotationy=".$zrow["defrotationy"].",
							rotationz=".$zrow["defrotationz"].",
							startframe=".$zrow["defstartframe"].",
							endframe=".$zrow["defendframe"].",
							updatedate='".$ztimestamp."',
							updateuserid='".$zuserid."'
						where useravatarid='".$zrow["useravatarid"]."'
						limit 1;");
					
					/* update the related avatar animations */
					$wtwdb->query("
						update ".wtw_tableprefix."useravataranimations
						set objectfolder='/content/uploads/useravatars/".$zrow["useravatarid"]."/animations/',
							updatedate='".$ztimestamp."',
							updateuserid='".$zuserid."'
						where useravatarid='".$zrow["useravatarid"]."';");
				}
				
				/* updated 3.4.5 and 3.4.6 and 3.4.13 - added version id, version, versionorder, and version description fields - populate version id and version where blank */
				$wtwdb->query("
					update ".wtw_tableprefix."avatars
					set versionid=avatarid,
						version='1.0.0',
						versionorder=1000000,
						versiondesc='Initial Version',
						updatedate='".$ztimestamp."',
						updateuserid='".$zuserid."'
					where versionid='';
				");
				$wtwdb->query("
					update ".wtw_tableprefix."communities
					set versionid=communityid,
						version='1.0.0',
						versionorder=1000000,
						versiondesc='Initial Version',
						updatedate='".$ztimestamp."',
						updateuserid='".$zuserid."'
					where versionid='';
				");
				$wtwdb->query("
					update ".wtw_tableprefix."buildings
					set versionid=buildingid,
						version='1.0.0',
						versionorder=1000000,
						versiondesc='Initial Version',
						updatedate='".$ztimestamp."',
						updateuserid='".$zuserid."'
					where versionid='';
				");
				$wtwdb->query("
					update ".wtw_tableprefix."things
					set versionid=thingid,
						version='1.0.0',
						versionorder=1000000,
						versiondesc='Initial Version',
						updatedate='".$ztimestamp."',
						updateuserid='".$zuserid."'
					where versionid='';
				");
				$wtwdb->query("
					update ".wtw_tableprefix."useravatars
					set versionid=avatarid,
						version='1.0.0',
						versionorder=1000000,
						versiondesc='Initial Version'
						updatedate='".$ztimestamp."',
						updateuserid='".$zuserid."'
					where versionid='';
				");
				$wtwdb->query("
					update ".wtw_tableprefix."uploadobjects
					set versionid=uploadobjectid,
						versiondesc='Initial Version'
					where versiondesc=''
						and not uploadobjectid='';
				");
				
				/* updated 3.4.14 - added mic support - mic icon added to main menu */
				$zresults = $wtwdb->query("
					select menuitemid 
					from ".wtw_tableprefix."menuitems 
					where menuitemname='wtw_menumic'
						and deleted=0;
				");
				if (empty(count($zresults))) {
					$wtwdb->query("
						INSERT INTO ".wtw_tableprefix."menuitems 
						(menuitemname, menutext, menuset, menualignment, menuorder, menulevel, menuiconid, menuicon, menuaction, menuproperty, menusecurity, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
						VALUES 
						('wtw_menumic','Mic On','main','right',-980,1,'','/content/system/images/menumicoff32.png','WTW.toggleMicMute','',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
					");			
				}
			} 
			if (($zoldversion1 == 3 && $zoldversion2 < 6) || $zoldversion1 < 3) {
				/* updated 3.5.2 - added Menu Items */
				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."menuitems where menutext='WalkTheWeb Help' and menuset='Help Menu';");
				if (count($zresults) == 0) {
					$wtwdb->query("INSERT INTO ".wtw_tableprefix."menuitems 
						(menuitemname, menutext, menuset, menualignment, menuorder, menulevel, menuiconid, menuicon, menuaction, menuproperty, menusecurity, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted) VALUES 
						('','WalkTheWeb Help','Help Menu','left',10,1,'','/content/system/images/menuwtwhelp.png','WTW.closeMenus();WTW.openWebpage(\'https://www.walktheweb.com/wiki/\',\'_blank\');','',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
						('','Movement Controls','Help Menu','left',20,1,'','/content/system/images/menumovement.png','WTW.closeMenus();WTW.showSettingsMenu(\'wtw_menucontrols\');','',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
						('','Common Questions','Help Menu','left',30,1,'','/content/system/images/menuquestions.png','WTW.closeMenus();WTW.openWebpage(\'https://www.walktheweb.com/knowledgebase_category/3d-browsing/\',\'_blank\');','',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
						('','Tutorials','Help Menu','left',40,1,'','/content/system/images/menututorials.png','WTW.closeMenus();WTW.openWebpage(\'https://www.walktheweb.com/knowledgebase_category/tutorials/\',\'_blank\');','',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
						('','Admin Help','Help Menu','left',50,1,'','/content/system/images/menutools.png','WTW.closeMenus();WTW.openWebpage(\'https://www.walktheweb.com/knowledgebase_category/tutorials/\',\'_blank\');','',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
						('','End User License Agreement','Help Menu','left',60,1,'','/content/system/images/menueula.png','WTW.closeMenus();WTW.openWebpage(\'https://www.walktheweb.com/useragreement/\',\'_blank\');','',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
						('','WalkTheWeb Refund Policy','Help Menu','left',70,1,'','/content/system/images/menurefund.png','WTW.closeMenus();WTW.openWebpage(\'https://www.walktheweb.com/refund-policy/\',\'_blank\');','',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
						('','Feedback or Issue','Help Menu','left',80,1,'','/content/system/images/menugraphics.png','WTW.closeMenus();WTW.hide(\'wtw_menusettings\');WTW.showSettingsMenu(\'wtw_menufeedback\');','',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
						('','Contact WalkTheWeb','Help Menu','left',500,1,'','/content/system/images/menuinfo.png','WTW.closeMenus();WTW.openWebpage(\'https://www.walktheweb.com/contact-us/\',\'_blank\');','',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
					");
				}
				/* updated 3.5.2 - corrected web alias */
				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."webaliases where domainname=webalias;");
				foreach ($zresults as $zrow) {
					$zwebalias = 'http://';
					if ($zrow["forcehttps"] == '1') {
						$zwebalias = 'https://';
					}
					$zwebalias .= $zrow["domainname"];
					if ((!isset($zrow["communityid"]) || empty($zrow["communityid"])) && $wtwdb->hasValue($zrow["buildingid"])) {
						$zwebalias .= '/buildings/'.$zrow["buildingpublishname"];
						if ($wtwdb->hasValue($zrow["thingid"])) {
							$zwebalias .= '/'.$zrow["thingpublishname"];
						}
					} else if ((!isset($zrow["communityid"]) || empty($zrow["communityid"])) && (!isset($zrow["buildingid"]) || empty($zrow["buildingid"])) && $wtwdb->hasValue($zrow["thingid"])) {
						$zwebalias .= '/things/'.$zrow["thingpublishname"];
					} else if ($wtwdb->hasValue($zrow["communityid"]) && $wtwdb->hasValue($zrow["communitypublishname"])) {
						$zwebalias .= '/'.$zrow["communitypublishname"];
						if ($wtwdb->hasValue($zrow["buildingid"]) && $wtwdb->hasValue($zrow["buildingpublishname"])) {
							$zwebalias .= '/'.$zrow["buildingpublishname"];
						}
						if ($wtwdb->hasValue($zrow["thingid"]) && $wtwdb->hasValue($zrow["thingpublishname"])) {
							$zwebalias .= '/'.$zrow["thingpublishname"];
						}
					}
					$wtwdb->query("update ".wtw_tableprefix."webaliases 
						set webalias='".$zwebalias."'
						where webaliasid='".$zrow["webaliasid"]."'
						limit 1;");
				}
				/* updated 3.5.2 - remove forms and menus folders and files (moved to adminmenu and menu classes) */
				if (file_exists($wtw->rootpath.'/core/forms/actionzone.php')) {
					unlink($wtw->rootpath.'/core/forms/actionzone.php');
				}
				if (file_exists($wtw->rootpath.'/core/forms/building.php')) {
					unlink($wtw->rootpath.'/core/forms/building.php');
				}
				if (file_exists($wtw->rootpath.'/core/forms/buildingshare.php')) {
					unlink($wtw->rootpath.'/core/forms/buildingshare.php');
				}
				if (file_exists($wtw->rootpath.'/core/forms/community.php')) {
					unlink($wtw->rootpath.'/core/forms/community.php');
				}
				if (file_exists($wtw->rootpath.'/core/forms/communityshare.php')) {
					unlink($wtw->rootpath.'/core/forms/communityshare.php');
				}
				if (file_exists($wtw->rootpath.'/core/forms/connectinggrids.php')) {
					unlink($wtw->rootpath.'/core/forms/connectinggrids.php');
				}
				if (file_exists($wtw->rootpath.'/core/forms/firstbuilding.php')) {
					unlink($wtw->rootpath.'/core/forms/firstbuilding.php');
				}
				if (file_exists($wtw->rootpath.'/core/forms/groundsettings.php')) {
					unlink($wtw->rootpath.'/core/forms/groundsettings.php');
				}
				if (file_exists($wtw->rootpath.'/core/forms/mold.php')) {
					unlink($wtw->rootpath.'/core/forms/mold.php');
				}
				if (file_exists($wtw->rootpath.'/core/forms/skydome.php')) {
					unlink($wtw->rootpath.'/core/forms/skydome.php');
				}
				if (file_exists($wtw->rootpath.'/core/forms/thing.php')) {
					unlink($wtw->rootpath.'/core/forms/thing.php');
				}
				if (file_exists($wtw->rootpath.'/core/forms/thingshare.php')) {
					unlink($wtw->rootpath.'/core/forms/thingshare.php');
				}
				if (file_exists($wtw->rootpath.'/core/forms/updatesnapshot.php')) {
					unlink($wtw->rootpath.'/core/forms/updatesnapshot.php');
				}
				if (file_exists($wtw->rootpath.'/core/forms/useraccess.php')) {
					unlink($wtw->rootpath.'/core/forms/useraccess.php');
				}
				if (file_exists($wtw->rootpath.'/core/forms/userdevaccess.php')) {
					unlink($wtw->rootpath.'/core/forms/userdevaccess.php');
				}
				if (file_exists($wtw->rootpath.'/core/forms/waterdepth.php')) {
					unlink($wtw->rootpath.'/core/forms/waterdepth.php');
				}
				if (file_exists($wtw->rootpath.'/core/menus/adminmenu.php')) {
					unlink($wtw->rootpath.'/core/menus/adminmenu.php');
				}
				if (file_exists($wtw->rootpath.'/core/menus/menu.php')) {
					unlink($wtw->rootpath.'/core/menus/menu.php');
				}
				/* file was moved to /core/scripts/hud/ folder */
				if (file_exists($wtw->rootpath.'/core/scripts/prime/wtw_hud.js')) {
					unlink($wtw->rootpath.'/core/scripts/prime/wtw_hud.js');
				}
				/* only remove forms and menus folders if they are empty */
				$zfilecount = count(glob($wtw->rootpath.'/core/forms/*'));
				if ($zfilecount == 0 && is_dir($wtw->rootpath.'/core/forms')) {
					rmdir($wtw->rootpath.'/core/forms');
				}
				$zfilecount = count(glob($wtw->rootpath.'/core/menus/*'));
				if ($zfilecount == 0 && is_dir($wtw->rootpath.'/core/menus')) {
					rmdir($wtw->rootpath.'/core/menus');
				}
				
				/* updated 3.5.3 - setting up to group upload objects for future 3D Model Downloads */
				$wtwdb->query("
					update ".wtw_tableprefix."uploadobjects
					set groupid=uploadobjectid
					where groupid='';
				");
				
				/* updated 3.5.5 - added optional upgrades */
				$zresults = $wtwdb->query("
					select optionalid 
					from ".wtw_tableprefix."optionalupgrades 
					where optionalid='0dhcad25ljunojk7';
				");
				if (empty(count($zresults))) {
					$wtwdb->query("
						INSERT INTO ".wtw_tableprefix."optionalupgrades 
						(optionalid, title, instructions, description, serverwide, hostwide, domainwide, subscription, startprice, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
						VALUES 
						('0dhcad25ljunojk7','3D Internet Services','Admin Menu -&gt; 3D Plugins -&gt;Activate 3D Internet.','Turn on 3D Internet Services to enable Global WalkTheWeb Accounts and find multiplayer options.',1,0,0,0,0.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
					");			
				}
				$zresults = $wtwdb->query("
					select optionalid 
					from ".wtw_tableprefix."optionalupgrades 
					where optionalid='1l2ieg46j55caf7q';
				");
				if (empty(count($zresults))) {
					$wtwdb->query("
						INSERT INTO ".wtw_tableprefix."optionalupgrades 
						(optionalid, title, instructions, description, serverwide, hostwide, domainwide, subscription, startprice, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
						VALUES 
						('1l2ieg46j55caf7q','Multiplayer Services','Admin Menu -&gt; 3D Internet -&gt; Turn on Multiplayer Services.','Turn on Multiplayer Services to show all 3D Avatars (with chat options) visiting your 3D Websites.',1,0,0,1,120.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
					");			
				}
				$zresults = $wtwdb->query("
					select optionalid 
					from ".wtw_tableprefix."optionalupgrades 
					where optionalid='2gabogb4p4i6c9al';
				");
				if (empty(count($zresults))) {
					$wtwdb->query("
						INSERT INTO ".wtw_tableprefix."optionalupgrades 
						(optionalid, title, instructions, description, serverwide, hostwide, domainwide, subscription, startprice, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
						VALUES 
						('2gabogb4p4i6c9al','Custom Domain Name','Admin Menu -&gt; 3D Websites -&gt; Web Domains -&gt; Add New.','Add your Custom Domain Name to your 3D Website. (example: http://3d.YourDomain.com).',0,0,1,1,99.99,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
					");			
				}
				$zresults = $wtwdb->query("
					select optionalid 
					from ".wtw_tableprefix."optionalupgrades 
					where optionalid='3tsgycu7j2rjhtll';
				");
				if (empty(count($zresults))) {
					$wtwdb->query("
						INSERT INTO ".wtw_tableprefix."optionalupgrades 
						(optionalid, title, instructions, description, serverwide, hostwide, domainwide, subscription, startprice, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
						VALUES 
						('3tsgycu7j2rjhtll','SSL for Custom Domain Name','Admin Menu -&gt; 3D Websites -&gt; Web Domains -&gt; Edit.','Add SSL Cert (https) to your Custom Domain Name for your 3D Website. (example: https://3d.YourDomain.com).',0,0,1,1,89.99,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
					");			
				}
				/* updated 3.5.5 - versionid correction for New Object from Scratch */
				$wtwdb->query("
					update ".wtw_tableprefix."communities
					set versionid=communityid,
						updatedate=now(),
						updateuserid='".$zuserid."'
					where versionid='z4kxj6jtryefnf7y'
						and not communityid='z4kxj6jtryefnf7y';
				");
				$wtwdb->query("
					update ".wtw_tableprefix."buildings
					set versionid=buildingid,
						updatedate=now(),
						updateuserid='".$zuserid."'
					where versionid='a6w1oihuemflxj7u'
						and not buildingid='a6w1oihuemflxj7u';
				");
				$wtwdb->query("
					update ".wtw_tableprefix."things
					set versionid=thingid,
						updatedate=now(),
						updateuserid='".$zuserid."'
					where versionid='v6b5lsgd9zze503v'
						and not thingid='v6b5lsgd9zze503v';
				");
			}
			if (($zoldversion1 == 3 && $zoldversion2 < 7) || $zoldversion1 < 4) {
				/* updated 3.6.0 - changed login global variables (settings) */
				$zresults = $wtwdb->query("
					select * 
					from ".wtw_tableprefix."settings 
					where settingname='WTW_globalLogins'
						or settingname='WTW_localLogins'
						or settingname='WTW_anonymousLogins';
				");
				if (empty(count($zresults))) {
					$wtwdb->query("
						update ".wtw_tableprefix."settings
						set settingname='WTW_globalLogins',
							updatedate=now(),
							updateuserid='".$zuserid."'
						where settingname='wtw3dinternet_enableGlobal';
					");
					$wtwdb->query("
						update ".wtw_tableprefix."settings
						set settingname='WTW_localLogins',
							updatedate=now(),
							updateuserid='".$zuserid."'
						where settingname='wtw3dinternet_enableLocal';
					");
					$wtwdb->query("
						update ".wtw_tableprefix."settings
						set settingname='WTW_anonymousLogins',
							updatedate=now(),
							updateuserid='".$zuserid."'
						where settingname='wtw3dinternet_enableAnonymous';
					");
				}
				/* remove old settings if they exist */
				$wtwdb->query("
					delete from ".wtw_tableprefix."settings 
					where settingname='wtw3dinternet_enableGlobal'
						or settingname='wtw3dinternet_enableLocal'
						or settingname='wtw3dinternet_enableAnonymous';
				");
				/* updated 3.6.2 - changed avatar group to one to many using avatarsingroups table */
				/* get all avatars where the avatar group is not blank or deleted */
				$zresults = $wtwdb->query("
					select * 
					from ".wtw_tableprefix."avatars 
					where (not avatargroup='')
						and deleted=0;
				");
				foreach ($zresults as $zrow) {
					/* look up avatar group id */
					$zresults2 = $wtwdb->query("
						select avatargroupid 
						from ".wtw_tableprefix."avatargroups 
						where LOWER(avatargroup)='".strtolower($zrow["avatargroup"])."'
						order by createdate desc, deleted
						limit 1;
					");
					foreach ($zresults2 as $zrow2) {
						/* check for a record of avatar in group to avoid duplicates */
						$zresults3 = $wtwdb->query("
							select avatarsingroupid 
							from ".wtw_tableprefix."avatarsingroups 
							where avatarid='".$zrow["avatarid"]."'
								and avatargroupid='".$zrow2["avatargroupid"]."'
							limit 1;
						");
						if (count($zresults3) == 0) {
							/* only add avatars in groups if it does not exist */
							$zavatarsingroupid = $wtwdb->getRandomString(16,1);
							$wtwdb->query("
								insert into ".wtw_tableprefix."avatarsingroups 
								   (avatarsingroupid, avatarid, avatargroupid, createdate, createuserid, updatedate, updateuserid)
								values 
								   ('".$zavatarsingroupid."','".$zrow["avatarid"]."','".$zrow2["avatargroupid"]."','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."');
							");
						}
						/* clear old avatar group field in avatars table */
/*						$wtwdb->query("
							update ".wtw_tableprefix."avatars
							set avatargroup='',
								updatedate='".$ztimestamp."',
								updateuserid='".$zuserid."'
							where avatarid='".$zrow["avatarid"]."';
						");
*/					}
				}

				/* updated 3.6.3 - added icon to Content Rating on the Browse Menu */
				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."menuitems where menuitemname='wtw_rating';");
				if (count($zresults) == 0) {
					$wtwdb->query("INSERT INTO ".wtw_tableprefix."menuitems 
						(menuitemid, menuitemname, menutext, menuset, menualignment, menuorder, menulevel, menuiconid, menuicon, menuaction, menuproperty, menusecurity, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted) VALUES 
							(null, 'wtw_rating', '[Not Rated]', 'main', 'right', -1001, 1, '', '/content/system/images/menurating32.png', 'show-hide', 'wtw_menucontentrating', 1, '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', null, '', 0);
					");
				} else {
					/* updated 3.6.3 - added ratings icon */
					$wtwdb->query("UPDATE ".wtw_tableprefix."menuitems 
						set menuicon='/content/system/images/menurating32.png',
							updatedate='".$ztimestamp."',
							updateuserid='".$zuserid."'
						where menuitemname='wtw_rating'
							and menuicon='';
					");
				}
			}

			$wtwdb->saveSetting("wtw_dbversion", $wtw->dbversion);
		} catch (Exception $e) {
			$wtw->serror("core-functions-tabledefs.php-checkDBVersionData=".$e->getMessage());
		}
	}
	
	public function updateColorsHex($zuserid) {
		/* this process will check database for correct or new values for this version and future versions */
		global $wtw;
		try {
			global $wtwdb;
			$ztimestamp = date('Y/m/d H:i:s');
			
			$zhasdiffusecolorr = $wtwdb->tableFieldExists('communitymolds', 'diffusecolorr');
			$zhasdiffusecolorg = $wtwdb->tableFieldExists('communitymolds', 'diffusecolorg');
			$zhasdiffusecolorb = $wtwdb->tableFieldExists('communitymolds', 'diffusecolorb');
			$zhasspecularcolorr = $wtwdb->tableFieldExists('communitymolds', 'specularcolorr');
			$zhasspecularcolorg = $wtwdb->tableFieldExists('communitymolds', 'specularcolorg');
			$zhasspecularcolorb = $wtwdb->tableFieldExists('communitymolds', 'specularcolorb');
			$zhasemissivecolorr = $wtwdb->tableFieldExists('communitymolds', 'emissivecolorr');
			$zhasemissivecolorg = $wtwdb->tableFieldExists('communitymolds', 'emissivecolorg');
			$zhasemissivecolorb = $wtwdb->tableFieldExists('communitymolds', 'emissivecolorb');
			
			if ($zhasdiffusecolorr && $zhasdiffusecolorg && $zhasdiffusecolorb && $zhasspecularcolorr && $zhasspecularcolorg && $zhasspecularcolorb && $zhasemissivecolorr && $zhasemissivecolorg && $zhasemissivecolorb) {
				$zresults = $wtwdb->query("
					select * from ".wtw_tableprefix."communitymolds
					where diffusecolor='';");
				foreach ($zresults as $zrow) {
					$zdiffusecolor = $wtwdb->getHexFromRGB($zrow["diffusecolorr"], $zrow["diffusecolorg"], $zrow["diffusecolorb"]);
					$zspecularcolor = $wtwdb->getHexFromRGB($zrow["specularcolorr"], $zrow["specularcolorg"], $zrow["specularcolorb"]);
					$zemissivecolor = $wtwdb->getHexFromRGB($zrow["emissivecolorr"], $zrow["emissivecolorg"], $zrow["emissivecolorb"]);
					$zambientcolor = $zdiffusecolor;
					$wtwdb->query("
						update ".wtw_tableprefix."communitymolds
						set diffusecolor='".$zdiffusecolor."',
							specularcolor='".$zspecularcolor."',
							emissivecolor='".$zemissivecolor."',
							ambientcolor='".$zambientcolor."'
						where communitymoldid='".$zrow["communitymoldid"]."';");
				}
			}

			$zhasdiffusecolorr = $wtwdb->tableFieldExists('buildingmolds', 'diffusecolorr');
			$zhasdiffusecolorg = $wtwdb->tableFieldExists('buildingmolds', 'diffusecolorg');
			$zhasdiffusecolorb = $wtwdb->tableFieldExists('buildingmolds', 'diffusecolorb');
			$zhasspecularcolorr = $wtwdb->tableFieldExists('buildingmolds', 'specularcolorr');
			$zhasspecularcolorg = $wtwdb->tableFieldExists('buildingmolds', 'specularcolorg');
			$zhasspecularcolorb = $wtwdb->tableFieldExists('buildingmolds', 'specularcolorb');
			$zhasemissivecolorr = $wtwdb->tableFieldExists('buildingmolds', 'emissivecolorr');
			$zhasemissivecolorg = $wtwdb->tableFieldExists('buildingmolds', 'emissivecolorg');
			$zhasemissivecolorb = $wtwdb->tableFieldExists('buildingmolds', 'emissivecolorb');
			
			if ($zhasdiffusecolorr && $zhasdiffusecolorg && $zhasdiffusecolorb && $zhasspecularcolorr && $zhasspecularcolorg && $zhasspecularcolorb && $zhasemissivecolorr && $zhasemissivecolorg && $zhasemissivecolorb) {
				$zresults = $wtwdb->query("
					select * from ".wtw_tableprefix."buildingmolds
					where diffusecolor='';");
				foreach ($zresults as $zrow) {
					$zdiffusecolor = $wtwdb->getHexFromRGB($zrow["diffusecolorr"], $zrow["diffusecolorg"], $zrow["diffusecolorb"]);
					$zspecularcolor = $wtwdb->getHexFromRGB($zrow["specularcolorr"], $zrow["specularcolorg"], $zrow["specularcolorb"]);
					$zemissivecolor = $wtwdb->getHexFromRGB($zrow["emissivecolorr"], $zrow["emissivecolorg"], $zrow["emissivecolorb"]);
					$zambientcolor = $zdiffusecolor;
					$wtwdb->query("
						update ".wtw_tableprefix."buildingmolds
						set diffusecolor='".$zdiffusecolor."',
							specularcolor='".$zspecularcolor."',
							emissivecolor='".$zemissivecolor."',
							ambientcolor='".$zambientcolor."'
						where buildingmoldid='".$zrow["buildingmoldid"]."';");
				}
			}
			
			$zhasdiffusecolorr = $wtwdb->tableFieldExists('thingmolds', 'diffusecolorr');
			$zhasdiffusecolorg = $wtwdb->tableFieldExists('thingmolds', 'diffusecolorg');
			$zhasdiffusecolorb = $wtwdb->tableFieldExists('thingmolds', 'diffusecolorb');
			$zhasspecularcolorr = $wtwdb->tableFieldExists('thingmolds', 'specularcolorr');
			$zhasspecularcolorg = $wtwdb->tableFieldExists('thingmolds', 'specularcolorg');
			$zhasspecularcolorb = $wtwdb->tableFieldExists('thingmolds', 'specularcolorb');
			$zhasemissivecolorr = $wtwdb->tableFieldExists('thingmolds', 'emissivecolorr');
			$zhasemissivecolorg = $wtwdb->tableFieldExists('thingmolds', 'emissivecolorg');
			$zhasemissivecolorb = $wtwdb->tableFieldExists('thingmolds', 'emissivecolorb');
			
			if ($zhasdiffusecolorr && $zhasdiffusecolorg && $zhasdiffusecolorb && $zhasspecularcolorr && $zhasspecularcolorg && $zhasspecularcolorb && $zhasemissivecolorr && $zhasemissivecolorg && $zhasemissivecolorb) {
				$zresults = $wtwdb->query("
					select * from ".wtw_tableprefix."thingmolds
					where diffusecolor='';");
				foreach ($zresults as $zrow) {
					$zdiffusecolor = $wtwdb->getHexFromRGB($zrow["diffusecolorr"], $zrow["diffusecolorg"], $zrow["diffusecolorb"]);
					$zspecularcolor = $wtwdb->getHexFromRGB($zrow["specularcolorr"], $zrow["specularcolorg"], $zrow["specularcolorb"]);
					$zemissivecolor = $wtwdb->getHexFromRGB($zrow["emissivecolorr"], $zrow["emissivecolorg"], $zrow["emissivecolorb"]);
					$zambientcolor = $zdiffusecolor;
					$wtwdb->query("
						update ".wtw_tableprefix."thingmolds
						set diffusecolor='".$zdiffusecolor."',
							specularcolor='".$zspecularcolor."',
							emissivecolor='".$zemissivecolor."',
							ambientcolor='".$zambientcolor."'
						where thingmoldid='".$zrow["thingmoldid"]."';");
				}
			}
			
			$zhasdiffusecolorr = $wtwdb->tableFieldExists('useravatarcolors', 'diffusecolorr');
			$zhasdiffusecolorg = $wtwdb->tableFieldExists('useravatarcolors', 'diffusecolorg');
			$zhasdiffusecolorb = $wtwdb->tableFieldExists('useravatarcolors', 'diffusecolorb');
			$zhasemissivecolorr = $wtwdb->tableFieldExists('useravatarcolors', 'emissivecolorr');
			$zhasemissivecolorg = $wtwdb->tableFieldExists('useravatarcolors', 'emissivecolorg');
			$zhasemissivecolorb = $wtwdb->tableFieldExists('useravatarcolors', 'emissivecolorb');
			
			if ($zhasdiffusecolorr && $zhasdiffusecolorg && $zhasdiffusecolorb && $zhasemissivecolorr && $zhasemissivecolorg && $zhasemissivecolorb) {
				$zresults = $wtwdb->query("
					select * from ".wtw_tableprefix."useravatarcolors
					where diffusecolor='';");
				foreach ($zresults as $zrow) {
					$zdiffusecolor = $wtwdb->getHexFromRGB($zrow["diffusecolorr"], $zrow["diffusecolorg"], $zrow["diffusecolorb"]);
					$zemissivecolor = $wtwdb->getHexFromRGB($zrow["emissivecolorr"], $zrow["emissivecolorg"], $zrow["emissivecolorb"]);
					$zspecularcolor = $zemissivecolor;
					$zambientcolor = $zdiffusecolor;
					$wtwdb->query("
						update ".wtw_tableprefix."useravatarcolors
						set diffusecolor='".$zdiffusecolor."',
							specularcolor='".$zspecularcolor."',
							emissivecolor='".$zemissivecolor."',
							ambientcolor='".$zambientcolor."'
						where avatarpartid='".$zrow["avatarpartid"]."';");
				}
			}
		} catch (Exception $e) {
			$wtw->serror("core-functions-tabledefs.php-updateColorsHex=".$e->getMessage());
		}
	}
}

	function wtwtables() {
		return wtwtables::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwtables'] = wtwtables();
?>
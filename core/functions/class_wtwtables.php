<?php 
class wtwtables {
	/* $wtwtables class for defining and updating the core WalkTheWeb Tables, data upgrades, and initializing data */
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;				
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;				
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."avatargroups` (
				  `avatargroupid` varchar(16) NOT NULL,
				  `avatargroup` varchar(255) NOT NULL,
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`avatargroupid`),
				  UNIQUE KEY `".wtw_tableprefix."avatargroupid_UNIQUE` (`avatargroupid`)
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
			");
			$wtwdb->deltaCreateTable("			
				CREATE TABLE `".wtw_tableprefix."avatars` (
				  `avatarid` varchar(16) NOT NULL,
				  `pastavatarid` varchar(16) DEFAULT '',
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;			
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."buildingmolds` (
				  `buildingmoldid` varchar(16) NOT NULL,
				  `pastbuildingmoldid` varchar(16) DEFAULT '',
				  `buildingid` varchar(16) DEFAULT '',
				  `loadactionzoneid` varchar(16) DEFAULT '',
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."buildings` (
				  `buildingid` varchar(16) NOT NULL,
				  `pastbuildingid` varchar(16) DEFAULT '',
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."communities` (
				  `communityid` varchar(16) NOT NULL,
				  `pastcommunityid` varchar(16) DEFAULT '',
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
				  `gravity` decimal(18,2) DEFAULT '9.80',
				  `groundpositiony` decimal(18,2) DEFAULT '0.00',
				  `waterpositiony` decimal(18,2) DEFAULT '-1.00',
				  `textureid` varchar(16) DEFAULT '61pcl0adyqrn016u',
				  `skydomeid` varchar(16) DEFAULT 'hlgliuml61pg4a1b',
				  `skyinclination` decimal(18,2) DEFAULT '0.00',
				  `skyluminance` decimal(18,2) DEFAULT '1.00',
				  `skyazimuth` decimal(18,2) DEFAULT '0.25',
				  `skyrayleigh` decimal(18,2) DEFAULT '2.00',
				  `skyturbidity` decimal(18,2) DEFAULT '10.00',
				  `skymiedirectionalg` decimal(18,2) DEFAULT '0.80',
				  `skymiecoefficient` decimal(18,3) DEFAULT '0.008',
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."communitymolds` (
				  `communitymoldid` varchar(16) NOT NULL,
				  `pastcommunitymoldid` varchar(16) DEFAULT '',
				  `communityid` varchar(16) DEFAULT '',
				  `loadactionzoneid` varchar(16) DEFAULT '',
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."connectinggrids` (
				  `connectinggridid` varchar(16) NOT NULL,
				  `pastconnectinggridid` varchar(16) DEFAULT '',
				  `parentwebid` varchar(16) DEFAULT '',
				  `parentwebtype` varchar(16) DEFAULT '',
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."errorlog` (
				  `errorid` int NOT NULL AUTO_INCREMENT,
				  `logdate` datetime DEFAULT NULL,
				  `message` varchar(2048) DEFAULT '',
				  `intvalue` int DEFAULT NULL,
				  `decimalvalue` decimal(18,2) DEFAULT NULL,
				  PRIMARY KEY (`errorid`),
				  UNIQUE KEY `".wtw_tableprefix."errorid_UNIQUE` (`errorid`)
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;				
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
				  `menuaction` varchar(45) DEFAULT '',
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
			");
			$wtwdb->deltaCreateTable("			
				CREATE TABLE `".wtw_tableprefix."scripts` (
				  `scriptid` varchar(16) NOT NULL,
				  `pastscriptid` varchar(16) DEFAULT '',
				  `actionzoneid` varchar(16) DEFAULT '',
				  `webtype` varchar(15) DEFAULT '',
				  `webid` varchar(16) DEFAULT '',
				  `scriptname` varchar(256) DEFAULT '',
				  `scriptpath` varchar(256) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`scriptid`),
				  UNIQUE KEY `".wtw_tableprefix."scriptid_UNIQUE` (`scriptid`)
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;			
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."thingmolds` (
				  `thingmoldid` varchar(16) NOT NULL,
				  `pastthingmoldid` varchar(16) DEFAULT '',
				  `thingid` varchar(16) DEFAULT '',
				  `loadactionzoneid` varchar(16) DEFAULT '',
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."things` (
				  `thingid` varchar(16) NOT NULL,
				  `pastthingid` varchar(16) DEFAULT '',
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."uploadobjects` (
				  `uploadobjectid` varchar(16) NOT NULL,
				  `pastuploadobjectid` varchar(16) DEFAULT '',
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."useravatars` (
				  `useravatarid` varchar(16) NOT NULL,
				  `userid` varchar(16) DEFAULT '',
				  `userip` varchar(64) DEFAULT '',
				  `instanceid` varchar(24) DEFAULT '',
				  `avatarid` varchar(16) DEFAULT '',
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."webaliases` (
				  `webaliasid` varchar(16) NOT NULL,
				  `domainname` varchar(255) DEFAULT '',
				  `communityid` varchar(16) DEFAULT '',
				  `communitypublishname` varchar(255) DEFAULT '',
				  `buildingid` varchar(16) DEFAULT '',
				  `buildingpublishname` varchar(255) DEFAULT '',
				  `thingid` varchar(16) DEFAULT '',
				  `thingpublishname` varchar(255) DEFAULT '',
				  `webalias` varchar(255) DEFAULT NULL,
				  `forcehttps` int DEFAULT '0',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int DEFAULT '0',
				  PRIMARY KEY (`webaliasid`),
				  UNIQUE KEY `".wtw_tableprefix."webaliasid_UNIQUE` (`webaliasid`)
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
			");
		} catch (Exception $e) {
			$wtw->serror("core-functions-tabledefs.php-databaseTableDefinitions=".$e->getMessage());
		}
	}

	public function loadInitDbData($zuserid) {
		/* this process is only run for new database setups, populate new tables, or if certain tables are empty */
		global $wtw;
		global $wtwdb;
		try {
			/* use the same time stamp for all changes within a set */
			$ztimestamp = date('Y/m/d H:i:s');
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."avatargroups 
				(avatargroupid, avatargroup, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('cphaz1acsziosye6','Anonymous','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ot45ejgp5oxl6420','Default','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");
			
			/* updated 3.4.3 - add new avatars */
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."avatars 
				(avatarid, pastavatarid, avatargroup, displayname, avatardescription, objectfolder, objectfile, gender, positionx, positiony, positionz, scalingx, scalingy, scalingz, rotationx, rotationy, rotationz, startframe, endframe, sortorder, templatename, description, tags, snapshotid, shareuserid, sharehash, sharetemplatedate, alttag, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('3b9bt5c70igtmqux','','Anonymous','Anonymous Male','Anonymous Male Android','/content/uploads/avatars/3b9bt5c70igtmqux/','maleidle.babylon','male',0.0,0.0,0.0,0.08,0.08,0.08,0.0,-90.0,0.0,1,213,2,'Anonymous Male','Anonymous Male avatar with a default blue color and robotic android look. ','Avatar, Anonymous, android, robot','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."','','',0),
				('641svy8bwjx2kme7','','Default','Remy','Blonde Haired Male with short sleeve shirt and shorts','/content/uploads/avatars/641svy8bwjx2kme7/','remyidle.babylon','male',0.0,0.0,0.0,0.04,0.04,0.04,0.0,-90.0,0.0,1,196,4,'Remy','Blonde Haired Male with short sleeve shirt and shorts','Avatar, Default, Male','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."','','',0),
				('9e94useo7x2ief0s','','Default','Liam','Black Haired Male with long sleeve shirt and pants','/content/uploads/avatars/9e94useo7x2ief0s/','liamidle.babylon','male',0.0,0.0,0.0,0.04,0.04,0.04,0.0,-90.0,0.0,1,200,4,'Liam','Black Haired Male with long sleeve shirt and pants','Avatar, Default, Male','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."','','',0),
				('aajvq38y06vulgh0','','Default','Pearl','Blonde Haired Female Child with long sleeved shirt and shorts','/content/uploads/avatars/aajvq38y06vulgh0/','pearlidle.babylon','female',0.0,0.0,0.0,0.09,0.09,0.09,0.0,-90.0,0.0,1,325,3,'Pearl','Blonde Haired Female Child with long sleeved shirt and shorts.','Avatar, Default, Female, Child','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."','','',0),
				('dihtmpm1ae3b9d3a','','Default','Malcolm','Black Haired Male with half sleeve shirt, long pants, and hat','/content/uploads/avatars/dihtmpm1ae3b9d3a/','malcolmidle.babylon','male',0.0,0.0,0.0,0.04,0.04,0.04,0.0,-90.0,0.0,1,195,4,'Malcolm','Black Haired Male with half sleeve shirt, long pants, and hat','Avatar, Default, Male','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."','','',0),
				('h1ro3h59xs5eknl0','','Default','Shae','Black Haired Female with black jacket, long pants, and boots','/content/uploads/avatars/h1ro3h59xs5eknl0/','shaeidle.babylon','female',0.0,0.0,0.0,0.04,0.04,0.04,0.0,-90.0,0.0,1,303,3,'Shae','Black Haired Female with black jacket, long pants, and boots','Avatar, Default, Female','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."','','',0),
				('odtx7arzof5eigp4','','Default','Regina','Black Haired Female with tank top, long pants, and hat','/content/uploads/avatars/odtx7arzof5eigp4/','reginaidle.babylon','female',0.0,0.0,0.0,0.04,0.04,0.04,0.0,-90.0,0.0,1,241,3,'Regina','Black Haired Female with tank top, long pants, and hat','Avatar, Default, Female','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."','','',0),
				('p7y3p6ti6d85yf7q','','Anonymous','Anonymous Female','Anonymous Female Android','/content/uploads/avatars/p7y3p6ti6d85yf7q/','femaleidle.babylon','female',0.0,0.0,0.0,0.08,0.08,0.08,0.0,-90.0,0.0,1,100,1,'Anonymous Female','Anonymous Female avatar with a default red color and robotic android look. ','Avatar, Anonymous, android, robot','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."','','',0),
				('r8tgsns20ruwx0bg','','Default','Jasper','Orange Haired Male Child','/content/uploads/avatars/r8tgsns20ruwx0bg/','jasperidle.babylon','male',0.0,0.0,0.0,0.09,0.09,0.09,0.0,-90.0,0.0,1,71,4,'Jasper','Orange Haired Male Child with short sleeved shirt and shorts.','Avatar, Default, Male, Child','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."','','',0),
				('v1ij2rkmdypo97c2','','Default','Stefani','Brown Haired Female with tank top and shorts','/content/uploads/avatars/v1ij2rkmdypo97c2/','stefaniidle.babylon','female',0.0,0.0,0.0,0.04,0.04,0.04,0.0,-90.0,0.0,1,363,3,'Stefani','Brown Haired Female with tank top and shorts','Avatar, Default, Female','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."','','',0);
			");
			
			/* updated 3.4.3 - add new avatar colors (parts) with the same avatarids */
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."avatarcolors 
				(avatarpartid, pastavatarpartid, avatarid, avatarpart, diffusecolor, specularcolor, emissivecolor, ambientcolor, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
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
				('f411l0wtsjd938b3', '', 'aajvq38y06vulgh0', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('skhk514cfn6z6528', '', 'aajvq38y06vulgh0', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('twvty9thzku85bzy', '', 'aajvq38y06vulgh0', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('t1fn2kip0t3ek6k3', '', 'aajvq38y06vulgh0', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('789zg2mbpirdaefz', '', 'aajvq38y06vulgh0', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('fkdfdshjsgnhiv91', '', 'aajvq38y06vulgh0', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('39ue6qhus79oyuq2', '', 'aajvq38y06vulgh0', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('riko7jfagi42kvoq', '', 'dihtmpm1ae3b9d3a', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('lxmqh7ux9z5ha1q1', '', 'dihtmpm1ae3b9d3a', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('8zrvrc0yv3njmyhh', '', 'dihtmpm1ae3b9d3a', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('o477h8qsjou40mv3', '', 'dihtmpm1ae3b9d3a', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('p80ygek28v4htplx', '', 'dihtmpm1ae3b9d3a', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('dujy29stjr1d3fxx', '', 'dihtmpm1ae3b9d3a', 'Hats', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('0z6w4naqcxya572c', '', 'dihtmpm1ae3b9d3a', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('r8jk0vdiqt477w3q', '', 'dihtmpm1ae3b9d3a', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
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
				('i26nosqecbdflfbt', '', 'r8tgsns20ruwx0bg', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('rvz45hxmna26uhtg', '', 'r8tgsns20ruwx0bg', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('vga26dqzrdmu05q6', '', 'r8tgsns20ruwx0bg', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('lq9c84ora5mqzei5', '', 'r8tgsns20ruwx0bg', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('2mbft9rzjxflby1w', '', 'r8tgsns20ruwx0bg', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('xnjwcxxfcsva4kcc', '', 'r8tgsns20ruwx0bg', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('d1rtqn7rmyhcenky', '', 'r8tgsns20ruwx0bg', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('dfnl46bdj5o8r0gq', '', 'v1ij2rkmdypo97c2', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('o28c083kl7r39w8c', '', 'v1ij2rkmdypo97c2', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('41e6r3eftk9bmzq9', '', 'v1ij2rkmdypo97c2', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('16t9ay39xyu7x6u4', '', 'v1ij2rkmdypo97c2', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('go4qcewxqkzep92r', '', 'v1ij2rkmdypo97c2', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('alrjnt7sat4cvx1c', '', 'v1ij2rkmdypo97c2', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('cxsfyd6lqjfatjsb', '', 'v1ij2rkmdypo97c2', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
			");
			
			/* updated 3.4.3 - add new avatar animations with the same avatarids */
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."avataranimations 
				(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES
				('r9087b004i9ptv0e', '', '3b9bt5c70igtmqux', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/3b9bt5c70igtmqux/', 'maleidle.babylon', '1', '213', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
				('ivtj8k2n2erlptw4', '', '3b9bt5c70igtmqux', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'malewalk.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('w4x8gkffxcyrxe8x', '', '3b9bt5c70igtmqux', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'malewalkback.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('xtdev68nipxl5x64', '', '3b9bt5c70igtmqux', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('5b72o99k0bm6zga2', '', '3b9bt5c70igtmqux', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('x3o2chccn74zjpyo', '', '3b9bt5c70igtmqux', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('g4a06vseo3i9ta07', '', '3b9bt5c70igtmqux', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ii2qjfjecm06wy3m', '', '3b9bt5c70igtmqux', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('s35fo3h6fjfh8oqk', '', '3b9bt5c70igtmqux', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'malewalkback.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('mf8wtehb2dqkmdzr', '', '3b9bt5c70igtmqux', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('yf92jhsjd5nvd82o', '', '3b9bt5c70igtmqux', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('s9yxs6k7fg2wd4i8', '', '3b9bt5c70igtmqux', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'malestrafeleft.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('7y4rh3zog9wpt0lw', '', '3b9bt5c70igtmqux', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'malestraferight.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ua8jbcmsbxi5w0di', '', '3b9bt5c70igtmqux', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('uatc8bv9tqoi6n3t', '', '3b9bt5c70igtmqux', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('vw5d9f2os7sx2xh1', '', '3b9bt5c70igtmqux', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('vi76lr5kg7qr96ld', '', '3b9bt5c70igtmqux', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('fsjumsb816paf2hi', '', '3b9bt5c70igtmqux', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('408rwa70fagu49rk', '', '3b9bt5c70igtmqux', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('sve58ukwpvdzyjiq', '', '3b9bt5c70igtmqux', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('txm33odfqel7ziv1', '', '3b9bt5c70igtmqux', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('uz8cualgsaq93ip9', '', '3b9bt5c70igtmqux', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('xds0u4345q5za745', '', '3b9bt5c70igtmqux', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('v245qnblckppa1xr', '', '3b9bt5c70igtmqux', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ksv82wdi9x6ph2id', '', '3b9bt5c70igtmqux', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('b1t97pcy0u1j4cln', '', '3b9bt5c70igtmqux', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('467omoxzv30i3g0l', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('7nbv5yo389ltrgt8', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('8q96piaohfn1f895', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('amv8njmmwefnlsod', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('qbjvak08ph2eik8r', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('qsd32hogy3jvzit0', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('uullzdlqiiw4f44r', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('vtok6hf5c3yl83aw', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('yy0o3qcfafzi1pkw', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Dance - Hip Hop', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-dance.babylon', '1', '369', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('qk7c73bigh4ex8bv', '', '3b9bt5c70igtmqux', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'wait-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('6vwypoplqunx1u87', '', '3b9bt5c70igtmqux', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('py46sau5a5isd9iv', '', '3b9bt5c70igtmqux', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('y9kvul52rightfpi', '', '3b9bt5c70igtmqux', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('j47ucrkkde3056oh', '', '3b9bt5c70igtmqux', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('vbyt0d25s9xbco6m', '', '3b9bt5c70igtmqux', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('t2woxk2jj8emfipz', '', '3b9bt5c70igtmqux', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('l7a081wl5nod2h7q', '', '3b9bt5c70igtmqux', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('7j6a7juf1y8ry2pp', '', '3b9bt5c70igtmqux', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('78vsxedgga0rgcjf', '', '3b9bt5c70igtmqux', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ljialzxbm9r4h6wi', '', '3b9bt5c70igtmqux', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('uidmjmzahn43de9o', '', '3b9bt5c70igtmqux', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('vt1v6tiex4j7kt2n', '', '3b9bt5c70igtmqux', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('4wwkbvnfwx02rlov', '', '3b9bt5c70igtmqux', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
			");
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."avataranimations 
				(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES
				('wc004i6dcn4rdn2g', '', '641svy8bwjx2kme7', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/641svy8bwjx2kme7/', 'remyidle.babylon', '1', '196', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
				('j2pbhi434a1bjr5j', '', '641svy8bwjx2kme7', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'malewalk.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('6ayvgo17uou7hqbb', '', '641svy8bwjx2kme7', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'malewalkback.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('nahml62rp6r92kni', '', '641svy8bwjx2kme7', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('5p4eo7y6zf4fp7zb', '', '641svy8bwjx2kme7', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('2ux4w2pae125lhnu', '', '641svy8bwjx2kme7', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('nahlhmne10vfh46i', '', '641svy8bwjx2kme7', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('8nm2g5b5urb89k2n', '', '641svy8bwjx2kme7', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('06sgxambog9xwona', '', '641svy8bwjx2kme7', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'malewalkback.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('fa87echhw1hb6wy3', '', '641svy8bwjx2kme7', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('lom1binog7ml3p6r', '', '641svy8bwjx2kme7', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('qrmt7k8hozu9r339', '', '641svy8bwjx2kme7', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'malestrafeleft.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('cg8teiefyjvnnain', '', '641svy8bwjx2kme7', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'malestraferight.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ln0wsp7i6wskle45', '', '641svy8bwjx2kme7', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('wcqhmez4oemqlpa0', '', '641svy8bwjx2kme7', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('mf3qfn7k1rhivpoj', '', '641svy8bwjx2kme7', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ztmw5gadj8e0a9le', '', '641svy8bwjx2kme7', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('i1omq3fh9y663dal', '', '641svy8bwjx2kme7', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('dco0oo5vhag3u6ru', '', '641svy8bwjx2kme7', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('0dodwwtzh2a90qjv', '', '641svy8bwjx2kme7', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('w2oo9s7tmos50cpe', '', '641svy8bwjx2kme7', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('rrwyr0k8vuhga4yh', '', '641svy8bwjx2kme7', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('36629z8l4kv0z33h', '', '641svy8bwjx2kme7', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('d00tl4hm346jx1gx', '', '641svy8bwjx2kme7', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('cartyyh7nhg6gvkd', '', '641svy8bwjx2kme7', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('imygjervp7arfmxd', '', '641svy8bwjx2kme7', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('1wa0njcm4b6m6g2d', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('1yzdxuoqb7ocw3jp', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('7uboixxjjqa4vr1n', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Dance - House', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-dance.babylon', '1', '629', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('by3wmbypvdsgtusi', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('e824pycoz761iklm', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ed1zfxlflb171rsk', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('gj889xqe4a04ik92', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('j18ab8inwc2ehjgt', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('t85abm4aq4w4u0vd', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('fkzuwjag9qsx41ex', '', '641svy8bwjx2kme7', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'wait-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('9rq8z2y5flyvt3qw', '', '641svy8bwjx2kme7', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('72o6qwefzra0xfp1', '', '641svy8bwjx2kme7', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('yt3resfjcqe5y3hd', '', '641svy8bwjx2kme7', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('6epvhqknuoqj5nc8', '', '641svy8bwjx2kme7', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('szziotxuaz3m4200', '', '641svy8bwjx2kme7', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('jifaif9v5mq7itwo', '', '641svy8bwjx2kme7', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('a7yh1oy7ifejskrx', '', '641svy8bwjx2kme7', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('rvydbqdeohekiq5f', '', '641svy8bwjx2kme7', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('n7aaq6k61bnldcbo', '', '641svy8bwjx2kme7', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('q3or9g2i08vglvaq', '', '641svy8bwjx2kme7', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('5wgq1mrvbbl1n1zj', '', '641svy8bwjx2kme7', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('drnzrp308feoj5uf', '', '641svy8bwjx2kme7', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('dyk3ssmmvzgyo9tp', '', '641svy8bwjx2kme7', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
			");
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."avataranimations 
				(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES
				('78k4zhhzhemwlcvc', '', '9e94useo7x2ief0s', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/9e94useo7x2ief0s/', 'liamidle.babylon', '1', '200', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
				('1f0sw67go14gzinp', '', '9e94useo7x2ief0s', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'malewalk.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('mxs7mhke962sslm9', '', '9e94useo7x2ief0s', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'malewalkback.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('hoxk2ls6hx8d4jc4', '', '9e94useo7x2ief0s', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('jc2977eg0najr6ml', '', '9e94useo7x2ief0s', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('jk52v40qmvgrgyd3', '', '9e94useo7x2ief0s', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('4tp4fuvuot1piddq', '', '9e94useo7x2ief0s', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('93o2chdf0qpae4dg', '', '9e94useo7x2ief0s', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('9wqyjxyyzzzzywk4', '', '9e94useo7x2ief0s', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'malewalkback.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('xcvd979mdzuawona', '', '9e94useo7x2ief0s', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('f92ifmrwbs320wfe', '', '9e94useo7x2ief0s', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('4a4qchc99ir93p7z', '', '9e94useo7x2ief0s', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'malestrafeleft.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('xbvc5q6pzs0ocqls', '', '9e94useo7x2ief0s', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'malestraferight.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('8kyirkjoryz0fzhh', '', '9e94useo7x2ief0s', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('7hnpe4qqylw8xcm6', '', '9e94useo7x2ief0s', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('m86bevu06r1adwxm', '', '9e94useo7x2ief0s', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('u8d72seao9oedmet', '', '9e94useo7x2ief0s', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('c56d734x5rc57q54', '', '9e94useo7x2ief0s', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('l5ewogh7v7iezezi', '', '9e94useo7x2ief0s', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('zc711n622cac3htj', '', '9e94useo7x2ief0s', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ay7pxyy9k7878wd8', '', '9e94useo7x2ief0s', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('rh0m1ad2kpellfqi', '', '9e94useo7x2ief0s', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('93rj9cnjy8qr9c7m', '', '9e94useo7x2ief0s', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('xf5ifwwsmcwzv2li', '', '9e94useo7x2ief0s', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('5xhkmce28k5oq7m5', '', '9e94useo7x2ief0s', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ckl55gt049w9fpyf', '', '9e94useo7x2ief0s', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('1vm9v1k34pbfwbll', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('adqu1cei4d0d0k78', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('cy4209o28eqtazqa', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('d5r87qfdyw38ndpk', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('iyos220ycbwb1y2x', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('jwz76o3zrpp3rwnb', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('pzgd35v26kebba95', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Dance - Tut Hip Hop', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-dance.babylon', '1', '407', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('tpze2dcthqk0mh7c', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('x3111863jusg1432', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('yrivwpyrrllee00p', '', '9e94useo7x2ief0s', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'wait-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('sfoq9i7hl06anz3j', '', '9e94useo7x2ief0s', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('hca3waqenp9x3q0l', '', '9e94useo7x2ief0s', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('snarjgh66smd5pn2', '', '9e94useo7x2ief0s', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('c0p7gz5yp3wynbu9', '', '9e94useo7x2ief0s', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('f0mlz9ira9fwmmkg', '', '9e94useo7x2ief0s', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('q62uwg4uuv1u6up9', '', '9e94useo7x2ief0s', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('bb4y1spmmf0gec6e', '', '9e94useo7x2ief0s', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('rzlw4cl2lnawc7qj', '', '9e94useo7x2ief0s', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('7lvw65a24wyyktop', '', '9e94useo7x2ief0s', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('lvo7cu0jlxd0uhg1', '', '9e94useo7x2ief0s', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('fsga2olxqzqpq4k0', '', '9e94useo7x2ief0s', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('p9r17okbyhwsz1tc', '', '9e94useo7x2ief0s', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('zxgpqxxkmczbds2b', '', '9e94useo7x2ief0s', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
			");
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."avataranimations 
				(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES
				('o4kgmoik9nf8ws7p', '', 'aajvq38y06vulgh0', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/aajvq38y06vulgh0/', 'pearlidle.babylon', '1', '325', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
				('zszl1drqbf6npkqy', '', 'aajvq38y06vulgh0', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'femalewalk.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('julhnrux63xd15lh', '', 'aajvq38y06vulgh0', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'femalewalkback.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('nu8mfa5x4ttkd6rb', '', 'aajvq38y06vulgh0', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('cphcae5j8iwz6x3q', '', 'aajvq38y06vulgh0', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('mjr6mjwtgsmqtw2k', '', 'aajvq38y06vulgh0', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('dmz1aal5x78l8ecj', '', 'aajvq38y06vulgh0', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('mgfri8pro5rcg9yz', '', 'aajvq38y06vulgh0', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('03h6cacvd7x0866c', '', 'aajvq38y06vulgh0', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'femalewalkback.babylon', '1', '24', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('97aub3g0pigsi8k5', '', 'aajvq38y06vulgh0', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('4210xk1lr0u43239', '', 'aajvq38y06vulgh0', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('1ssnvd9642xggyhg', '', 'aajvq38y06vulgh0', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'malestrafeleft.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('0866dcn71lta1act', '', 'aajvq38y06vulgh0', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'malestraferight.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('k5des0ykwohk88nq', '', 'aajvq38y06vulgh0', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('kmjiykvchhgnw6il', '', 'aajvq38y06vulgh0', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('mddkwevwo6fogquj', '', 'aajvq38y06vulgh0', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('8q2mrtu13qdlifaz', '', 'aajvq38y06vulgh0', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('3mt1lhi7733x9put', '', 'aajvq38y06vulgh0', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('638hk03hql2669ar', '', 'aajvq38y06vulgh0', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('of755emihbw5va6z', '', 'aajvq38y06vulgh0', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('grwn54r169nju8s1', '', 'aajvq38y06vulgh0', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('oovp44dbq5s9tg4u', '', 'aajvq38y06vulgh0', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('gb4pfnxnwxmgxwoc', '', 'aajvq38y06vulgh0', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('wqtfzwvhrteojvv7', '', 'aajvq38y06vulgh0', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('762zl27k7oaxmsp3', '', 'aajvq38y06vulgh0', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('x8nuxvc379v1rhys', '', 'aajvq38y06vulgh0', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('6ndu5ptknh5urnuc', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('cegzfzlg2r35vjru', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('dup8ie7d1rfhqk32', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Dance - Twist', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-dance.babylon', '1', '227', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ke2j6di3g32g2lxw', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('lsjwznr6e4r7s2mw', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ode6t12zoe1h5oam', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('r78te36a3b495zva', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('t1c0fa44nhxdi8o4', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('zbn3zi351k08bf75', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('q54x4jkywoy07412', '', 'aajvq38y06vulgh0', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'wait-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('xbulvavjspcts189', '', 'aajvq38y06vulgh0', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('vqb0re96tq60xb2q', '', 'aajvq38y06vulgh0', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('69tbievkzjoe0hic', '', 'aajvq38y06vulgh0', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('iajou0alohn2fd2a', '', 'aajvq38y06vulgh0', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('3mda2s6zpcs48qv7', '', 'aajvq38y06vulgh0', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('o31jjw1uhp32cdof', '', 'aajvq38y06vulgh0', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('o5vogr5gj2j2ipb8', '', 'aajvq38y06vulgh0', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('zd88qcrv6wpg86op', '', 'aajvq38y06vulgh0', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('h04o182ehcncco2b', '', 'aajvq38y06vulgh0', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('5s7235czpwv9t0ih', '', 'aajvq38y06vulgh0', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('q30o6y9voni72lkx', '', 'aajvq38y06vulgh0', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('uc8mlkf0mt5j6bt0', '', 'aajvq38y06vulgh0', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('7aj39fzrosccrzl8', '', 'aajvq38y06vulgh0', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
			");
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."avataranimations 
				(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES
				('45dg48tccn60jnna', '', 'dihtmpm1ae3b9d3a', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/', 'malcolmidle.babylon', '1', '195', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
				('9bu8mgen3h6gq95z', '', 'dihtmpm1ae3b9d3a', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'malewalk.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('hguup0xngdf35fri', '', 'dihtmpm1ae3b9d3a', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'malewalkback.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('avhsi8k52waqtvz9', '', 'dihtmpm1ae3b9d3a', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('bs1u56hvvq24en1a', '', 'dihtmpm1ae3b9d3a', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('03g1ssnvc7y61mz3', '', 'dihtmpm1ae3b9d3a', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('amaiouat8orpacvb', '', 'dihtmpm1ae3b9d3a', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ibzzzyvfmqv56eid', '', 'dihtmpm1ae3b9d3a', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('absye5i30phdg2zo', '', 'dihtmpm1ae3b9d3a', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'malewalkback.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('jlfa768mhkc280cq', '', 'dihtmpm1ae3b9d3a', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('kptx63zm62qieev4', '', 'dihtmpm1ae3b9d3a', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('bg9y2fxfa75334em', '', 'dihtmpm1ae3b9d3a', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'malestrafeleft.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('0phc97bxom4rdmz2', '', 'dihtmpm1ae3b9d3a', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'malestraferight.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('c8cimhpean88elwe', '', 'dihtmpm1ae3b9d3a', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('69lowvplqjwi2npi', '', 'dihtmpm1ae3b9d3a', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('4xxo3lsdvwgfgbdo', '', 'dihtmpm1ae3b9d3a', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('osabe0oggfm87llh', '', 'dihtmpm1ae3b9d3a', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('9cjzw8oox1ckqqcx', '', 'dihtmpm1ae3b9d3a', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('dfyr8iqb9auqth71', '', 'dihtmpm1ae3b9d3a', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('tkhwhxo3nr7awp3t', '', 'dihtmpm1ae3b9d3a', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('xv4mcxi0g8y5u60x', '', 'dihtmpm1ae3b9d3a', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('4patz2fbqef0oc3d', '', 'dihtmpm1ae3b9d3a', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('dmrilk9asno5diw6', '', 'dihtmpm1ae3b9d3a', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('fgkxp3hlk8d850dd', '', 'dihtmpm1ae3b9d3a', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('o0812jhi5sq9rfqv', '', 'dihtmpm1ae3b9d3a', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('t6ulex0lajy06fjk', '', 'dihtmpm1ae3b9d3a', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('0wedh0rtt49sjjvd', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('1nb595r8o28cnmo1', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('2j81rsg12f6g14us', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('6thtbygsmolqusa6', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('6vokevrg2450jyou', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('84wghue4zq3w3xlc', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('d7rvo8ccumi4tndn', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('m5c23iielnyeh03t', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('wf2uz0xqc97n89bd', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Dance - Hip Hop', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-dance.babylon', '1', '331', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('jlvqlrkhek0ii9ig', '', 'dihtmpm1ae3b9d3a', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'wait-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('d64rfgk8qg0ejpta', '', 'dihtmpm1ae3b9d3a', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('7djizpuqgum9x56v', '', 'dihtmpm1ae3b9d3a', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('1kxxr7u6nw0oqq5h', '', 'dihtmpm1ae3b9d3a', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('9ydrm5d9xoabmdm6', '', 'dihtmpm1ae3b9d3a', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('jw2j7a2ow13z10w1', '', 'dihtmpm1ae3b9d3a', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('zhz1x2fsn93loxpb', '', 'dihtmpm1ae3b9d3a', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('43hvs958xcsjmlth', '', 'dihtmpm1ae3b9d3a', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('tugl8y7xrcpigc0h', '', 'dihtmpm1ae3b9d3a', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('i4a7f2njqaab0r6u', '', 'dihtmpm1ae3b9d3a', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('rtysb697putw8gdo', '', 'dihtmpm1ae3b9d3a', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('3v9v8nmcm0eql3wd', '', 'dihtmpm1ae3b9d3a', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('nzs8eo5ojqtm0mai', '', 'dihtmpm1ae3b9d3a', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('w65ci4c79x6lsw9h', '', 'dihtmpm1ae3b9d3a', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
			");
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."avataranimations 
				(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES
				('5nt31zrtvvq4cdu3', '', 'h1ro3h59xs5eknl0', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/', 'shaeidle.babylon', '1', '303', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
				('uuoxl8at7k8fh46j', '', 'h1ro3h59xs5eknl0', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'femalewalk.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('56fkk79qtw1kon74', '', 'h1ro3h59xs5eknl0', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'femalewalkback.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('1svy73w7d7y5w2o4', '', 'h1ro3h59xs5eknl0', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('mrv4ygdhddqieh6i', '', 'h1ro3h59xs5eknl0', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('q8z71lwpt1o9aohf', '', 'h1ro3h59xs5eknl0', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('y8d6tgtqa5zg9y05', '', 'h1ro3h59xs5eknl0', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('pa9iq5lip3a4tozu', '', 'h1ro3h59xs5eknl0', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('azywmf92ib4mrw9l', '', 'h1ro3h59xs5eknl0', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'femalewalkback.babylon', '1', '24', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('8d3fuy62sq950jr3', '', 'h1ro3h59xs5eknl0', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('6npn198d6q4fsnvf', '', 'h1ro3h59xs5eknl0', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('82kom4si7gq8z867', '', 'h1ro3h59xs5eknl0', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'malestrafeleft.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('jgnvglmanbqn2esp', '', 'h1ro3h59xs5eknl0', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'malestraferight.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('tnjyg7uxi9hpjkql', '', 'h1ro3h59xs5eknl0', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('lko6yaxtavuok0iy', '', 'h1ro3h59xs5eknl0', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('vfw2bglw3tq3y9my', '', 'h1ro3h59xs5eknl0', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('b70p9844wibss7ta', '', 'h1ro3h59xs5eknl0', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('9v5ht1sa0wnx15oj', '', 'h1ro3h59xs5eknl0', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('7fedoauhvt74nnys', '', 'h1ro3h59xs5eknl0', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('6qhippd0ue944l0l', '', 'h1ro3h59xs5eknl0', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('reimbnyx6rimbcja', '', 'h1ro3h59xs5eknl0', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('gdyuyl9xymk8n7rq', '', 'h1ro3h59xs5eknl0', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('8i9e7ivl3ck0u7lv', '', 'h1ro3h59xs5eknl0', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('0jfkla29rby90uyd', '', 'h1ro3h59xs5eknl0', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('t1v1hxmve7fg9v4e', '', 'h1ro3h59xs5eknl0', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('mxrx6xgsgqh01smr', '', 'h1ro3h59xs5eknl0', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('7so4eesf6b2wobm2', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('9284klrcme8hi58l', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('cc8hd2bt27obn2ce', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('i4zorwvhpsw2pyq2', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Dance - Salsa', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-dance.babylon', '1', '288', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('l9sx0mx7au6j1fr1', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('m8qndis4egvi75f0', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('q9c36gx30cx4nu5v', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('vtfc8mu9ut1c4rsm', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('zo6i4is601zomglm', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('jmtjtuzni0gikwo0', '', 'h1ro3h59xs5eknl0', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'wait-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('7dqyih6z2yce4ja3', '', 'h1ro3h59xs5eknl0', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('l68d0ij618pgcppl', '', 'h1ro3h59xs5eknl0', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('e8oil40b02z7goe6', '', 'h1ro3h59xs5eknl0', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('tbwc0e2l7oi2aplg', '', 'h1ro3h59xs5eknl0', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('c1lq56xntjamxone', '', 'h1ro3h59xs5eknl0', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ainjewhyb4ggbhdq', '', 'h1ro3h59xs5eknl0', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('yfwnsp459n31e089', '', 'h1ro3h59xs5eknl0', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('4qa50a5ftxthrhca', '', 'h1ro3h59xs5eknl0', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('5m7sdkudphgmuia1', '', 'h1ro3h59xs5eknl0', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('kjg5rgzeuq1xqtit', '', 'h1ro3h59xs5eknl0', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('chl85isrn5t1hvgd', '', 'h1ro3h59xs5eknl0', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('jazt5f7z1eps0a1e', '', 'h1ro3h59xs5eknl0', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('j2g035cumv2xjmjg', '', 'h1ro3h59xs5eknl0', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
			");
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."avataranimations 
				(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES
				('o3h47opkqwat7mge', '', 'odtx7arzof5eigp4', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/odtx7arzof5eigp4/', 'reginaidle.babylon', '1', '241', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
				('j0hccn866c6vsen2', '', 'odtx7arzof5eigp4', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'femalewalk.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('dm19ak0dstrdjnjt', '', 'odtx7arzof5eigp4', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'femalewalkback.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('myz1976axt8r5els', '', 'odtx7arzof5eigp4', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('5fo2bdxisdkqwd4h', '', 'odtx7arzof5eigp4', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('hyam9fdjld15jc3d', '', 'odtx7arzof5eigp4', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ngekmgen3i9r339y', '', 'odtx7arzof5eigp4', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('3yioweepev69qwbx', '', 'odtx7arzof5eigp4', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('2h8qym61oacxmbof', '', 'odtx7arzof5eigp4', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('36pwechejj1kpu3x', '', 'odtx7arzof5eigp4', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'femalewalkback.babylon', '1', '24', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('fa88j0g8sa07y753', '', 'odtx7arzof5eigp4', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('1webe10wjx0bilfc', '', 'odtx7arzof5eigp4', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('6y8bxnij7d978l8e', '', 'odtx7arzof5eigp4', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'malestrafeleft.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('jk9l8byuazzyudcn', '', 'odtx7arzof5eigp4', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'malestraferight.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('l8sqjtjkr0zanc5l', '', 'odtx7arzof5eigp4', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('15m4hdra4mbtuqhx', '', 'odtx7arzof5eigp4', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('p9cbpxnj9msun68v', '', 'odtx7arzof5eigp4', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('tomwv04oqal2g7xw', '', 'odtx7arzof5eigp4', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('uwqpivcg98sjawbp', '', 'odtx7arzof5eigp4', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('s9sxp5gmtckpveln', '', 'odtx7arzof5eigp4', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('9p6hoee13cubno45', '', 'odtx7arzof5eigp4', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('fl76gp9moby40ou8', '', 'odtx7arzof5eigp4', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('maysjiskb4p494fj', '', 'odtx7arzof5eigp4', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('kcv7ny7zd81rrqkk', '', 'odtx7arzof5eigp4', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ylarf0nypf2n7enw', '', 'odtx7arzof5eigp4', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('gnqd80kcijsnufn6', '', 'odtx7arzof5eigp4', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('56j843jw0qwjuceq', '', 'odtx7arzof5eigp4', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('3s7qgw2go007ask5', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('jivvhnl72rb0nuzh', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('lmbo7arygrsarcbe', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('nchqvge3hatd7c8c', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('o0et7jy2ph3uwo8j', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('qdacv9ve0vx9ng5o', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ynd3of2gruujmemi', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('zd6710kd1l7emjgw', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Dance - Wave Hip Hop', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-dance.babylon', '1', '405', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('zepcfdzfvtukxjcf', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('tpu31zpezp62zs6x', '', 'odtx7arzof5eigp4', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walk-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('2z7v8tgblyqba9dg', '', 'odtx7arzof5eigp4', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('bv032couamwdlj5q', '', 'odtx7arzof5eigp4', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('7lsnip18qe4uclug', '', 'odtx7arzof5eigp4', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('d7mto61bd3bha686', '', 'odtx7arzof5eigp4', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('3ppfhxv1wpkgp4w7', '', 'odtx7arzof5eigp4', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('6b5zh19eweam0jji', '', 'odtx7arzof5eigp4', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('n4hi012nom1bvu5u', '', 'odtx7arzof5eigp4', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('gsunr2gofzjlk3ff', '', 'odtx7arzof5eigp4', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('bbt7etf0byhepqjv', '', 'odtx7arzof5eigp4', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('k7kf4q2585d8ay4z', '', 'odtx7arzof5eigp4', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('yjrrgud0rmo6owt1', '', 'odtx7arzof5eigp4', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('3pbl1gcla4h3cszw', '', 'odtx7arzof5eigp4', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('f71735yliy4b0ucq', '', 'odtx7arzof5eigp4', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
			");
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."avataranimations 
				(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES
				('ohb6x5ze1112a9e6', '', 'p7y3p6ti6d85yf7q', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/', 'femaleidle.babylon', '1', '100', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
				('bdxircdsw641we93', '', 'p7y3p6ti6d85yf7q', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'femalewalk.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('qdo9cu9r0svzbnai', '', 'p7y3p6ti6d85yf7q', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'femalewalkback.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('pxk1g6i1m3jdabpm', '', 'p7y3p6ti6d85yf7q', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('z1abrv0hfo3h2v54', '', 'p7y3p6ti6d85yf7q', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('9pu3xcwiwz5utj7e', '', 'p7y3p6ti6d85yf7q', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('6i1n6vvsccpf21zu', '', 'p7y3p6ti6d85yf7q', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('fyhj8jzbncsw2pbe', '', 'p7y3p6ti6d85yf7q', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('5j6dabpn2erp5nua', '', 'p7y3p6ti6d85yf7q', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'femalewalkback.babylon', '1', '24', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ytb1bga3nwmcxjy3', '', 'p7y3p6ti6d85yf7q', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('o2bct3zn9czveclx', '', 'p7y3p6ti6d85yf7q', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('vaudbhi1qhaxs6i0', '', 'p7y3p6ti6d85yf7q', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ta1do9brv3uy7430', '', 'p7y3p6ti6d85yf7q', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'malestraferight.babylon', '1', '26', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('cfz2rb7aqxzmbbcl', '', 'p7y3p6ti6d85yf7q', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('3ybdeoz0e31smyb0', '', 'p7y3p6ti6d85yf7q', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('2us07qcgphx3ot91', '', 'p7y3p6ti6d85yf7q', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('k10a88qrfvr2tt3t', '', 'p7y3p6ti6d85yf7q', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('d4gigjax9co44ia9', '', 'p7y3p6ti6d85yf7q', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('d1xjyz5wssky5osd', '', 'p7y3p6ti6d85yf7q', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('xgg8yq0svsbluv70', '', 'p7y3p6ti6d85yf7q', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('xqqc6atchhmhwgot', '', 'p7y3p6ti6d85yf7q', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('hnp40zuucqjf1f9s', '', 'p7y3p6ti6d85yf7q', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('w874p74qvqsum1be', '', 'p7y3p6ti6d85yf7q', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('a6oiyyu8e9rv41jr', '', 'p7y3p6ti6d85yf7q', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('5hotdyklzoloil9v', '', 'p7y3p6ti6d85yf7q', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('1sn6myzx5d2t2tqc', '', 'p7y3p6ti6d85yf7q', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('02p16d4ax3tm94w6', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('3oz4dv3yvnu8qtqs', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Dance - Hip Hop', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-dance.babylon', '1', '153', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('6gnq88flx6r5uycj', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('8blx9vbi2pyd0k7h', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('8x6trj323756yjz8', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('8zl9djjpxanyjj23', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('eds4owitgiidj16x', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('jyuulxxz73kfx41d', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('wfmt9jig20tgq8z6', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('flbfgprxaaz69igj', '', 'p7y3p6ti6d85yf7q', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'wait-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('hs8wmyu8zcsd645k', '', 'p7y3p6ti6d85yf7q', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('cupvarkt8tckk9wp', '', 'p7y3p6ti6d85yf7q', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('y6yq94wzb6qsuak6', '', 'p7y3p6ti6d85yf7q', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('c2sbs1qbsy0305x7', '', 'p7y3p6ti6d85yf7q', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('k9f0y774vgx76mmg', '', 'p7y3p6ti6d85yf7q', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ghlqnk9hfrzjd7hw', '', 'p7y3p6ti6d85yf7q', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ijbva30w99hte18l', '', 'p7y3p6ti6d85yf7q', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('le44ea7hgtiwlk3w', '', 'p7y3p6ti6d85yf7q', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ldghqfg61ywkvrc7', '', 'p7y3p6ti6d85yf7q', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('xjthi5n63iusoeu6', '', 'p7y3p6ti6d85yf7q', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('phq2wuj7vomkrwoj', '', 'p7y3p6ti6d85yf7q', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ml4reymctienjk2d', '', 'p7y3p6ti6d85yf7q', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('oh204m5xzxe4gqya', '', 'p7y3p6ti6d85yf7q', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
			");
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."avataranimations 
				(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES
				('gfso15ljwulgi6c9', '', 'r8tgsns20ruwx0bg', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/', 'jasperidle.babylon', '1', '71', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
				('vj0hc99jwvpwd8z7', '', 'r8tgsns20ruwx0bg', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'malewalk.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('558r36misbbl2klb', '', 'r8tgsns20ruwx0bg', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'malewalkback.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('qpbjpxk1f36kas32', '', 'r8tgsns20ruwx0bg', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('0whnwjy4tq8wvmgf', '', 'r8tgsns20ruwx0bg', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('gh2u3xd12a74zl2h', '', 'r8tgsns20ruwx0bg', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('rkj1ihx50jou446l', '', 'r8tgsns20ruwx0bg', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('aywnkwtb5si57mjt', '', 'r8tgsns20ruwx0bg', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('en019757k7d82o3i', '', 'r8tgsns20ruwx0bg', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'malewalkback.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('9t9tcbilhnqsp6q6', '', 'r8tgsns20ruwx0bg', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('q13a4utlgkebg9z6', '', 'r8tgsns20ruwx0bg', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('s47q36nne0u7hvvp', '', 'r8tgsns20ruwx0bg', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'malestrafeleft.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('vvpwglj0cof38tel', '', 'r8tgsns20ruwx0bg', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'malestraferight.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('amyscydvj0ydzyjx', '', 'r8tgsns20ruwx0bg', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('mat1koyf0negd3lz', '', 'r8tgsns20ruwx0bg', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('q9qtohcswldr3oi2', '', 'r8tgsns20ruwx0bg', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('gim1r7dukguvn0m9', '', 'r8tgsns20ruwx0bg', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('3yzc45wytwyin046', '', 'r8tgsns20ruwx0bg', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('4fm8sdbpw8p9dv7o', '', 'r8tgsns20ruwx0bg', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('iruyxr8b0p4ho7u2', '', 'r8tgsns20ruwx0bg', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('jtugpo8us59xia4z', '', 'r8tgsns20ruwx0bg', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('8g68ig75c4dna4w2', '', 'r8tgsns20ruwx0bg', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('9txbwsyjncgf1sqs', '', 'r8tgsns20ruwx0bg', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('zxia7912xm04wp62', '', 'r8tgsns20ruwx0bg', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('lpyn9jbh4e78gvsb', '', 'r8tgsns20ruwx0bg', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('0tu1yqk2irhu1zkh', '', 'r8tgsns20ruwx0bg', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('3q7i3a0sstslcvav', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('dtiyszzeq6ijfhrr', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('elv38tu0lnryylgw', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ffnph8yej8kgs1u5', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('h0cljhty5yfa9ns2', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('h61nn6jeoshjk8em', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('iqwp1l9wtdl8hh5z', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('l8gz6z0pr7yedfdo', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('s21wirqtwvkm3mlp', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Dance - Breakdance', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-dance.babylon', '1', '111', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('b0foao03pb19x7e1', '', 'r8tgsns20ruwx0bg', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'wait-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('maju79dhvfa99r8l', '', 'r8tgsns20ruwx0bg', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('l8ygjgj9jjclw67q', '', 'r8tgsns20ruwx0bg', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('exw5uayi09nciswn', '', 'r8tgsns20ruwx0bg', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('f5w7pr718c31i8m3', '', 'r8tgsns20ruwx0bg', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('jmqw97x4cn3jifo2', '', 'r8tgsns20ruwx0bg', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('29jgv98x8zchhdz3', '', 'r8tgsns20ruwx0bg', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('az3u6yzq253ckadk', '', 'r8tgsns20ruwx0bg', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('5fm9slbuc8trv7dx', '', 'r8tgsns20ruwx0bg', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('fx0v1jewghks28mt', '', 'r8tgsns20ruwx0bg', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('d4c4ksd6db4pm6ei', '', 'r8tgsns20ruwx0bg', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('55yed4zpq3y3t4cu', '', 'r8tgsns20ruwx0bg', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('1e02zs5piisme1yx', '', 'r8tgsns20ruwx0bg', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('o3qv2ebsrpnc6asj', '', 'r8tgsns20ruwx0bg', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
			");
			$wtwdb->query("
				INSERT INTO ".wtw_tableprefix."avataranimations 
				(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES
				('n3i9s7ophcae5h1r', '', 'v1ij2rkmdypo97c2', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/', 'stefaniidle.babylon', '1', '363', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
				('kugqdo853zl0bili', '', 'v1ij2rkmdypo97c2', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'femalewalk.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('sen2dpcn5w0blz4o', '', 'v1ij2rkmdypo97c2', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'femalewalkback.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('17vpyohemuc9anbo', '', 'v1ij2rkmdypo97c2', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('g8sa2h7ld3emyvht', '', 'v1ij2rkmdypo97c2', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('qpbf6mkz74zlyz3k', '', 'v1ij2rkmdypo97c2', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ns1tzf8ulfdigqab', '', 'v1ij2rkmdypo97c2', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('iupyohfn02a8d6r8', '', 'v1ij2rkmdypo97c2', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('vpyk0dt1n6x5x8c1', '', 'v1ij2rkmdypo97c2', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'femalewalkback.babylon', '1', '24', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('6sdhb3lnilfdkr38', '', 'v1ij2rkmdypo97c2', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('tfmvj0g8tddtw5ye', '', 'v1ij2rkmdypo97c2', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('41warxbvfh6grfw6', '', 'v1ij2rkmdypo97c2', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'malestrafeleft.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('25i6ayvk4zly1bii', '', 'v1ij2rkmdypo97c2', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'malestraferight.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('kjg59nnkjjagphzg', '', 'v1ij2rkmdypo97c2', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('y0ww1a1bzotaeij6', '', 'v1ij2rkmdypo97c2', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('iyw28zh9ddfybq7b', '', 'v1ij2rkmdypo97c2', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('0esp3539dmnwgueb', '', 'v1ij2rkmdypo97c2', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('8urc5k5wfrb2rq82', '', 'v1ij2rkmdypo97c2', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('wvbgyl82o2asluu1', '', 'v1ij2rkmdypo97c2', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('2xhv7zgs9zq1j3ec', '', 'v1ij2rkmdypo97c2', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('n3qvyyhzkxeiehpl', '', 'v1ij2rkmdypo97c2', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('iftvhhsgbfklwlw0', '', 'v1ij2rkmdypo97c2', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('db5mdheetohk154s', '', 'v1ij2rkmdypo97c2', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('j7210d1diub8edki', '', 'v1ij2rkmdypo97c2', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('9dhdlbcoijc21ks7', '', 'v1ij2rkmdypo97c2', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ugc9jrkzn34xfb2n', '', 'v1ij2rkmdypo97c2', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('06bkntz10htbjnof', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('2w6u3f9ae990kb25', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('31nrl2gmtgkq9pu5', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('76xphisu8xi7tezx', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ar2w03f499kif3zi', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('e76nl8wy3evbldky', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('gs7tv5nnisrz3rjv', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('o5gyo65yutc5rrdt', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Dance - Swing', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-dance.babylon', '1', '503', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('ys5e1ffpbz7dp9m3', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('o0wxc9c0r609ppup', '', 'v1ij2rkmdypo97c2', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'wait-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('2rn9h2vmh10gzp48', '', 'v1ij2rkmdypo97c2', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('rkcakcnazgxhse9t', '', 'v1ij2rkmdypo97c2', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('2vuym4yaa9kpjmuz', '', 'v1ij2rkmdypo97c2', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('07s116f0131pm3qc', '', 'v1ij2rkmdypo97c2', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('aa60m1y5v1857nha', '', 'v1ij2rkmdypo97c2', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('fnbe3tqem605lgxc', '', 'v1ij2rkmdypo97c2', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('w03u62a3c0eg4rpy', '', 'v1ij2rkmdypo97c2', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('kvu639mnotatyvz9', '', 'v1ij2rkmdypo97c2', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('6crtqzl35vrbkqwo', '', 'v1ij2rkmdypo97c2', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('9dnmlhw90se34zec', '', 'v1ij2rkmdypo97c2', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('9ddyo8rhp132tyxx', '', 'v1ij2rkmdypo97c2', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('pcv32nrwp7kbtrad', '', 'v1ij2rkmdypo97c2', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
				('cw18ezyud0jz51mu', '', 'v1ij2rkmdypo97c2', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
			");
			
			/* update 3.4.3 - removed the code to add additional animations and gestures into avataranimations - obsolete since the avatars can now support different bone structures */
			
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
				(6,'wtw_menumute','Mute On','main','right',-990,1,'','/content/system/images/menumuteon32.png','WTW.toggleSoundMute','',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(7,'wtw_mainmenudisplayname','[Login]','main','right',-969,1,'','','show-hide','wtw_menuprofile',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(8,'','Help','main','right',-1000,1,'','/content/system/images/menuhelp32.png','show-hide','wtw_menuhelp',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(9,'wtw_mainadminmode','Admin Home','main','left',-990,1,'','/content/system/images/menutools32.png','navigate','/admin.php',2,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(10,'wtw_modebuilding','[EditBuilding]','main','left',-975,1,'','/content/system/images/menuedit32.png','navigate','/admin.php',2,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(11,'wtw_modecommunity','[EditCommunity]','main','left',-985,1,'','/content/system/images/menuedit32.png','navigate','/admin.php',2,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(12,'wtw_menuarrowicon','','main','left',-978,1,'','/content/system/images/menuarrow32.png','image','',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(13,'wtw_menuoptionanimations','Animations','main','center',-800,1,'','/content/system/images/menugestures32.png','WTW.toggleMenuAnimations','',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				(14,'wtw_menuhomeicon','Home','main','left',-995,1,'','/content/system/images/menuhome32.png','navigate','/',3,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				(15,'wtw_rating','[Not Rated]','main','right',-1001,1,'','','show-hide','wtw_menucontentrating',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0),
				
				(16,'','Player Stats','mainmenu','left',1,1,'','','WTW.hudOpenMenuItem','1',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0),
				
				(17,'','Settings','mainmenu','',50,1,'','','WTW.hudOpenMenuItem','50',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0),
				
				(18,'','<- Main Menu','settings','',1,1,'','','WTW.hudOpenMenuItem','51',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0),

				(19,'','Cameras','settings','left',10,1,'','','WTW.hudOpenMenuItem','60',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0),

				(20,'','Profile','settings','left',100,1,'','','WTW.hudOpenMenuItem','100',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0);
			");
			
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
				(uploadobjectid, pastuploadobjectid, userid, objectfolder, objectfile, stock, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
				VALUES 
				('2lom1fyjsdf1wgkf','','".$zuserid."','/content/system/babylon/doorblinds/','doorblinds.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('3tur7r9z6y63w9k0','','".$zuserid."','/content/system/babylon/basket/','basket.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('c180du548ugrh59t','','".$zuserid."','/content/system/babylon/keyboard/','keyboard.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('hvvtgsnvfh5az2fy','','".$zuserid."','/content/system/babylon/desk/','desk.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('n2bhejhur8vpwc3d','','".$zuserid."','/content/system/babylon/computer/','computer.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('p6q4guuq6nqqfxd5','','".$zuserid."','/content/system/babylon/windowblinds/','windowblinds.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('v2n5p6owiwvnpkor','','".$zuserid."','/content/system/babylon/palmtree-highdef/','palmtree-highdef.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
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
			$wtwdb->saveSetting("wtw_dbversion", $wtw->dbversion);
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
			$ztimestamp = date('Y/m/d H:i:s');

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

				/* updated 3.4.3 - add new avatars with the same avatarids */
				$wtwdb->query("
					INSERT INTO ".wtw_tableprefix."avatars 
					(avatarid, pastavatarid, avatargroup, displayname, avatardescription, objectfolder, objectfile, gender, positionx, positiony, positionz, scalingx, scalingy, scalingz, rotationx, rotationy, rotationz, startframe, endframe, sortorder, templatename, description, tags, snapshotid, shareuserid, sharehash, sharetemplatedate, alttag, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
					VALUES 
					('3b9bt5c70igtmqux','','Anonymous','Anonymous Male','Anonymous Male Android','/content/uploads/avatars/3b9bt5c70igtmqux/','maleidle.babylon','male',0.0,0.0,0.0,0.08,0.08,0.08,0.0,-90.0,0.0,1,213,2,'Anonymous Male','Anonymous Male avatar with a default blue color and robotic android look. ','Avatar, Anonymous, android, robot','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0),
					('641svy8bwjx2kme7','','Default','Remy','Blonde Haired Male with short sleeve shirt and shorts','/content/uploads/avatars/641svy8bwjx2kme7/','remyidle.babylon','male',0.0,0.0,0.0,0.04,0.04,0.04,0.0,-90.0,0.0,1,196,4,'Remy','Blonde Haired Male with short sleeve shirt and shorts','Avatar, Default, Male','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0),
					('9e94useo7x2ief0s','','Default','Liam','Black Haired Male with long sleeve shirt and pants','/content/uploads/avatars/9e94useo7x2ief0s/','liamidle.babylon','male',0.0,0.0,0.0,0.04,0.04,0.04,0.0,-90.0,0.0,1,200,4,'Liam','Black Haired Male with long sleeve shirt and pants','Avatar, Default, Male','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0),
					('aajvq38y06vulgh0','','Default','Pearl','Blonde Haired Female Child with long sleeved shirt and shorts','/content/uploads/avatars/aajvq38y06vulgh0/','pearlidle.babylon','female',0.0,0.0,0.0,0.09,0.09,0.09,0.0,-90.0,0.0,1,325,3,'Pearl','Blonde Haired Female Child with long sleeved shirt and shorts.','Avatar, Default, Female, Child','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0),
					('dihtmpm1ae3b9d3a','','Default','Malcolm','Black Haired Male with half sleeve shirt, long pants, and hat','/content/uploads/avatars/dihtmpm1ae3b9d3a/','malcolmidle.babylon','male',0.0,0.0,0.0,0.04,0.04,0.04,0.0,-90.0,0.0,1,195,4,'Malcolm','Black Haired Male with half sleeve shirt, long pants, and hat','Avatar, Default, Male','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0),
					('h1ro3h59xs5eknl0','','Default','Shae','Black Haired Female with black jacket, long pants, and boots','/content/uploads/avatars/h1ro3h59xs5eknl0/','shaeidle.babylon','female',0.0,0.0,0.0,0.04,0.04,0.04,0.0,-90.0,0.0,1,303,3,'Shae','Black Haired Female with black jacket, long pants, and boots','Avatar, Default, Female','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0),
					('odtx7arzof5eigp4','','Default','Regina','Black Haired Female with tank top, long pants, and hat','/content/uploads/avatars/odtx7arzof5eigp4/','reginaidle.babylon','female',0.0,0.0,0.0,0.04,0.04,0.04,0.0,-90.0,0.0,1,241,3,'Regina','Black Haired Female with tank top, long pants, and hat','Avatar, Default, Female','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0),
					('p7y3p6ti6d85yf7q','','Anonymous','Anonymous Female','Anonymous Female Android','/content/uploads/avatars/p7y3p6ti6d85yf7q/','femaleidle.babylon','female',0.0,0.0,0.0,0.08,0.08,0.08,0.0,-90.0,0.0,1,100,1,'Anonymous Female','Anonymous Female avatar with a default red color and robotic android look. ','Avatar, Anonymous, android, robot','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0),
					('r8tgsns20ruwx0bg','','Default','Jasper','Orange Haired Male Child','/content/uploads/avatars/r8tgsns20ruwx0bg/','jasperidle.babylon','male',0.0,0.0,0.0,0.09,0.09,0.09,0.0,-90.0,0.0,1,71,4,'Jasper','Orange Haired Male Child with short sleeved shirt and shorts.','Avatar, Default, Male, Child','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0),
					('v1ij2rkmdypo97c2','','Default','Stefani','Brown Haired Female with tank top and shorts','/content/uploads/avatars/v1ij2rkmdypo97c2/','stefaniidle.babylon','female',0.0,0.0,0.0,0.04,0.04,0.04,0.0,-90.0,0.0,1,363,3,'Stefani','Brown Haired Female with tank top and shorts','Avatar, Default, Female','','','',null,'','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',null,'',0);
				");

				/* updated 3.4.3 - add new avatar colors (parts) with the same avatarids */
				$wtwdb->query("
					INSERT INTO ".wtw_tableprefix."avatarcolors 
					(avatarpartid, pastavatarpartid, avatarid, avatarpart, diffusecolor, specularcolor, emissivecolor, ambientcolor, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
					VALUES 
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
					('f411l0wtsjd938b3', '', 'aajvq38y06vulgh0', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('skhk514cfn6z6528', '', 'aajvq38y06vulgh0', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('twvty9thzku85bzy', '', 'aajvq38y06vulgh0', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('t1fn2kip0t3ek6k3', '', 'aajvq38y06vulgh0', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('789zg2mbpirdaefz', '', 'aajvq38y06vulgh0', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('fkdfdshjsgnhiv91', '', 'aajvq38y06vulgh0', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('39ue6qhus79oyuq2', '', 'aajvq38y06vulgh0', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('riko7jfagi42kvoq', '', 'dihtmpm1ae3b9d3a', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('lxmqh7ux9z5ha1q1', '', 'dihtmpm1ae3b9d3a', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('8zrvrc0yv3njmyhh', '', 'dihtmpm1ae3b9d3a', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('o477h8qsjou40mv3', '', 'dihtmpm1ae3b9d3a', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('p80ygek28v4htplx', '', 'dihtmpm1ae3b9d3a', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('dujy29stjr1d3fxx', '', 'dihtmpm1ae3b9d3a', 'Hats', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('0z6w4naqcxya572c', '', 'dihtmpm1ae3b9d3a', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('r8jk0vdiqt477w3q', '', 'dihtmpm1ae3b9d3a', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
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
					('i26nosqecbdflfbt', '', 'r8tgsns20ruwx0bg', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('rvz45hxmna26uhtg', '', 'r8tgsns20ruwx0bg', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('vga26dqzrdmu05q6', '', 'r8tgsns20ruwx0bg', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('lq9c84ora5mqzei5', '', 'r8tgsns20ruwx0bg', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('2mbft9rzjxflby1w', '', 'r8tgsns20ruwx0bg', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('xnjwcxxfcsva4kcc', '', 'r8tgsns20ruwx0bg', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('d1rtqn7rmyhcenky', '', 'r8tgsns20ruwx0bg', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('dfnl46bdj5o8r0gq', '', 'v1ij2rkmdypo97c2', 'Body', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('o28c083kl7r39w8c', '', 'v1ij2rkmdypo97c2', 'Bottoms', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('41e6r3eftk9bmzq9', '', 'v1ij2rkmdypo97c2', 'Eyelashes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('16t9ay39xyu7x6u4', '', 'v1ij2rkmdypo97c2', 'Eyes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('go4qcewxqkzep92r', '', 'v1ij2rkmdypo97c2', 'Hair', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('alrjnt7sat4cvx1c', '', 'v1ij2rkmdypo97c2', 'Shoes', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('cxsfyd6lqjfatjsb', '', 'v1ij2rkmdypo97c2', 'Tops', '#FFFFFF', '#000000', '#000000', '#FFFFFF', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
				");
				
				/* updated 3.4.3 - add new avatar animations with the same avatarids */
				$wtwdb->query("
					INSERT INTO ".wtw_tableprefix."avataranimations 
					(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
					VALUES
					('r9087b004i9ptv0e', '', '3b9bt5c70igtmqux', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/3b9bt5c70igtmqux/', 'maleidle.babylon', '1', '213', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
					('ivtj8k2n2erlptw4', '', '3b9bt5c70igtmqux', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'malewalk.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('w4x8gkffxcyrxe8x', '', '3b9bt5c70igtmqux', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'malewalkback.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('xtdev68nipxl5x64', '', '3b9bt5c70igtmqux', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('5b72o99k0bm6zga2', '', '3b9bt5c70igtmqux', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('x3o2chccn74zjpyo', '', '3b9bt5c70igtmqux', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('g4a06vseo3i9ta07', '', '3b9bt5c70igtmqux', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ii2qjfjecm06wy3m', '', '3b9bt5c70igtmqux', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('s35fo3h6fjfh8oqk', '', '3b9bt5c70igtmqux', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'malewalkback.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('mf8wtehb2dqkmdzr', '', '3b9bt5c70igtmqux', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('yf92jhsjd5nvd82o', '', '3b9bt5c70igtmqux', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('s9yxs6k7fg2wd4i8', '', '3b9bt5c70igtmqux', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'malestrafeleft.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('7y4rh3zog9wpt0lw', '', '3b9bt5c70igtmqux', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'malestraferight.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ua8jbcmsbxi5w0di', '', '3b9bt5c70igtmqux', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('uatc8bv9tqoi6n3t', '', '3b9bt5c70igtmqux', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('vw5d9f2os7sx2xh1', '', '3b9bt5c70igtmqux', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('vi76lr5kg7qr96ld', '', '3b9bt5c70igtmqux', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('fsjumsb816paf2hi', '', '3b9bt5c70igtmqux', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('408rwa70fagu49rk', '', '3b9bt5c70igtmqux', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('sve58ukwpvdzyjiq', '', '3b9bt5c70igtmqux', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('txm33odfqel7ziv1', '', '3b9bt5c70igtmqux', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('uz8cualgsaq93ip9', '', '3b9bt5c70igtmqux', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('xds0u4345q5za745', '', '3b9bt5c70igtmqux', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('v245qnblckppa1xr', '', '3b9bt5c70igtmqux', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ksv82wdi9x6ph2id', '', '3b9bt5c70igtmqux', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('b1t97pcy0u1j4cln', '', '3b9bt5c70igtmqux', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('467omoxzv30i3g0l', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('7nbv5yo389ltrgt8', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('8q96piaohfn1f895', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('amv8njmmwefnlsod', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('qbjvak08ph2eik8r', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('qsd32hogy3jvzit0', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('uullzdlqiiw4f44r', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('vtok6hf5c3yl83aw', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('yy0o3qcfafzi1pkw', '', '3b9bt5c70igtmqux', '', '0', 'onoption', 'Option - Dance - Hip Hop', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'option-dance.babylon', '1', '369', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('qk7c73bigh4ex8bv', '', '3b9bt5c70igtmqux', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'wait-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('6vwypoplqunx1u87', '', '3b9bt5c70igtmqux', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('py46sau5a5isd9iv', '', '3b9bt5c70igtmqux', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('y9kvul52rightfpi', '', '3b9bt5c70igtmqux', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('j47ucrkkde3056oh', '', '3b9bt5c70igtmqux', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('vbyt0d25s9xbco6m', '', '3b9bt5c70igtmqux', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('t2woxk2jj8emfipz', '', '3b9bt5c70igtmqux', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('l7a081wl5nod2h7q', '', '3b9bt5c70igtmqux', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('7j6a7juf1y8ry2pp', '', '3b9bt5c70igtmqux', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('78vsxedgga0rgcjf', '', '3b9bt5c70igtmqux', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ljialzxbm9r4h6wi', '', '3b9bt5c70igtmqux', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('uidmjmzahn43de9o', '', '3b9bt5c70igtmqux', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('vt1v6tiex4j7kt2n', '', '3b9bt5c70igtmqux', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('4wwkbvnfwx02rlov', '', '3b9bt5c70igtmqux', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/3b9bt5c70igtmqux/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
				");
				$wtwdb->query("
					INSERT INTO ".wtw_tableprefix."avataranimations 
					(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
					VALUES
					('wc004i6dcn4rdn2g', '', '641svy8bwjx2kme7', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/641svy8bwjx2kme7/', 'remyidle.babylon', '1', '196', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
					('j2pbhi434a1bjr5j', '', '641svy8bwjx2kme7', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'malewalk.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('6ayvgo17uou7hqbb', '', '641svy8bwjx2kme7', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'malewalkback.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('nahml62rp6r92kni', '', '641svy8bwjx2kme7', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('5p4eo7y6zf4fp7zb', '', '641svy8bwjx2kme7', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('2ux4w2pae125lhnu', '', '641svy8bwjx2kme7', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('nahlhmne10vfh46i', '', '641svy8bwjx2kme7', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('8nm2g5b5urb89k2n', '', '641svy8bwjx2kme7', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('06sgxambog9xwona', '', '641svy8bwjx2kme7', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'malewalkback.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('fa87echhw1hb6wy3', '', '641svy8bwjx2kme7', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('lom1binog7ml3p6r', '', '641svy8bwjx2kme7', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('qrmt7k8hozu9r339', '', '641svy8bwjx2kme7', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'malestrafeleft.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('cg8teiefyjvnnain', '', '641svy8bwjx2kme7', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'malestraferight.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ln0wsp7i6wskle45', '', '641svy8bwjx2kme7', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('wcqhmez4oemqlpa0', '', '641svy8bwjx2kme7', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('mf3qfn7k1rhivpoj', '', '641svy8bwjx2kme7', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ztmw5gadj8e0a9le', '', '641svy8bwjx2kme7', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('i1omq3fh9y663dal', '', '641svy8bwjx2kme7', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('dco0oo5vhag3u6ru', '', '641svy8bwjx2kme7', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('0dodwwtzh2a90qjv', '', '641svy8bwjx2kme7', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('w2oo9s7tmos50cpe', '', '641svy8bwjx2kme7', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('rrwyr0k8vuhga4yh', '', '641svy8bwjx2kme7', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('36629z8l4kv0z33h', '', '641svy8bwjx2kme7', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('d00tl4hm346jx1gx', '', '641svy8bwjx2kme7', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('cartyyh7nhg6gvkd', '', '641svy8bwjx2kme7', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('imygjervp7arfmxd', '', '641svy8bwjx2kme7', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('1wa0njcm4b6m6g2d', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('1yzdxuoqb7ocw3jp', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('7uboixxjjqa4vr1n', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Dance - House', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-dance.babylon', '1', '629', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('by3wmbypvdsgtusi', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('e824pycoz761iklm', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ed1zfxlflb171rsk', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('gj889xqe4a04ik92', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('j18ab8inwc2ehjgt', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('t85abm4aq4w4u0vd', '', '641svy8bwjx2kme7', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('fkzuwjag9qsx41ex', '', '641svy8bwjx2kme7', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'wait-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('9rq8z2y5flyvt3qw', '', '641svy8bwjx2kme7', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('72o6qwefzra0xfp1', '', '641svy8bwjx2kme7', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('yt3resfjcqe5y3hd', '', '641svy8bwjx2kme7', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('6epvhqknuoqj5nc8', '', '641svy8bwjx2kme7', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('szziotxuaz3m4200', '', '641svy8bwjx2kme7', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('jifaif9v5mq7itwo', '', '641svy8bwjx2kme7', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('a7yh1oy7ifejskrx', '', '641svy8bwjx2kme7', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('rvydbqdeohekiq5f', '', '641svy8bwjx2kme7', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('n7aaq6k61bnldcbo', '', '641svy8bwjx2kme7', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('q3or9g2i08vglvaq', '', '641svy8bwjx2kme7', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('5wgq1mrvbbl1n1zj', '', '641svy8bwjx2kme7', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('drnzrp308feoj5uf', '', '641svy8bwjx2kme7', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('dyk3ssmmvzgyo9tp', '', '641svy8bwjx2kme7', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/641svy8bwjx2kme7/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
				");
				$wtwdb->query("
					INSERT INTO ".wtw_tableprefix."avataranimations 
					(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
					VALUES
					('78k4zhhzhemwlcvc', '', '9e94useo7x2ief0s', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/9e94useo7x2ief0s/', 'liamidle.babylon', '1', '200', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
					('1f0sw67go14gzinp', '', '9e94useo7x2ief0s', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'malewalk.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('mxs7mhke962sslm9', '', '9e94useo7x2ief0s', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'malewalkback.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('hoxk2ls6hx8d4jc4', '', '9e94useo7x2ief0s', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('jc2977eg0najr6ml', '', '9e94useo7x2ief0s', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('jk52v40qmvgrgyd3', '', '9e94useo7x2ief0s', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('4tp4fuvuot1piddq', '', '9e94useo7x2ief0s', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('93o2chdf0qpae4dg', '', '9e94useo7x2ief0s', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('9wqyjxyyzzzzywk4', '', '9e94useo7x2ief0s', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'malewalkback.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('xcvd979mdzuawona', '', '9e94useo7x2ief0s', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('f92ifmrwbs320wfe', '', '9e94useo7x2ief0s', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('4a4qchc99ir93p7z', '', '9e94useo7x2ief0s', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'malestrafeleft.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('xbvc5q6pzs0ocqls', '', '9e94useo7x2ief0s', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'malestraferight.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('8kyirkjoryz0fzhh', '', '9e94useo7x2ief0s', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('7hnpe4qqylw8xcm6', '', '9e94useo7x2ief0s', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('m86bevu06r1adwxm', '', '9e94useo7x2ief0s', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('u8d72seao9oedmet', '', '9e94useo7x2ief0s', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('c56d734x5rc57q54', '', '9e94useo7x2ief0s', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('l5ewogh7v7iezezi', '', '9e94useo7x2ief0s', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('zc711n622cac3htj', '', '9e94useo7x2ief0s', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ay7pxyy9k7878wd8', '', '9e94useo7x2ief0s', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('rh0m1ad2kpellfqi', '', '9e94useo7x2ief0s', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('93rj9cnjy8qr9c7m', '', '9e94useo7x2ief0s', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('xf5ifwwsmcwzv2li', '', '9e94useo7x2ief0s', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('5xhkmce28k5oq7m5', '', '9e94useo7x2ief0s', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ckl55gt049w9fpyf', '', '9e94useo7x2ief0s', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('1vm9v1k34pbfwbll', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('adqu1cei4d0d0k78', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('cy4209o28eqtazqa', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('d5r87qfdyw38ndpk', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('iyos220ycbwb1y2x', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('jwz76o3zrpp3rwnb', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('pzgd35v26kebba95', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Dance - Tut Hip Hop', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-dance.babylon', '1', '407', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('tpze2dcthqk0mh7c', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('x3111863jusg1432', '', '9e94useo7x2ief0s', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('yrivwpyrrllee00p', '', '9e94useo7x2ief0s', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'wait-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('sfoq9i7hl06anz3j', '', '9e94useo7x2ief0s', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('hca3waqenp9x3q0l', '', '9e94useo7x2ief0s', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('snarjgh66smd5pn2', '', '9e94useo7x2ief0s', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('c0p7gz5yp3wynbu9', '', '9e94useo7x2ief0s', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('f0mlz9ira9fwmmkg', '', '9e94useo7x2ief0s', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('q62uwg4uuv1u6up9', '', '9e94useo7x2ief0s', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('bb4y1spmmf0gec6e', '', '9e94useo7x2ief0s', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('rzlw4cl2lnawc7qj', '', '9e94useo7x2ief0s', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('7lvw65a24wyyktop', '', '9e94useo7x2ief0s', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('lvo7cu0jlxd0uhg1', '', '9e94useo7x2ief0s', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('fsga2olxqzqpq4k0', '', '9e94useo7x2ief0s', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('p9r17okbyhwsz1tc', '', '9e94useo7x2ief0s', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('zxgpqxxkmczbds2b', '', '9e94useo7x2ief0s', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/9e94useo7x2ief0s/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
				");
				$wtwdb->query("
					INSERT INTO ".wtw_tableprefix."avataranimations 
					(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
					VALUES
					('o4kgmoik9nf8ws7p', '', 'aajvq38y06vulgh0', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/aajvq38y06vulgh0/', 'pearlidle.babylon', '1', '325', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
					('zszl1drqbf6npkqy', '', 'aajvq38y06vulgh0', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'femalewalk.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('julhnrux63xd15lh', '', 'aajvq38y06vulgh0', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'femalewalkback.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('nu8mfa5x4ttkd6rb', '', 'aajvq38y06vulgh0', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('cphcae5j8iwz6x3q', '', 'aajvq38y06vulgh0', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('mjr6mjwtgsmqtw2k', '', 'aajvq38y06vulgh0', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('dmz1aal5x78l8ecj', '', 'aajvq38y06vulgh0', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('mgfri8pro5rcg9yz', '', 'aajvq38y06vulgh0', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('03h6cacvd7x0866c', '', 'aajvq38y06vulgh0', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'femalewalkback.babylon', '1', '24', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('97aub3g0pigsi8k5', '', 'aajvq38y06vulgh0', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('4210xk1lr0u43239', '', 'aajvq38y06vulgh0', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('1ssnvd9642xggyhg', '', 'aajvq38y06vulgh0', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'malestrafeleft.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('0866dcn71lta1act', '', 'aajvq38y06vulgh0', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'malestraferight.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('k5des0ykwohk88nq', '', 'aajvq38y06vulgh0', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('kmjiykvchhgnw6il', '', 'aajvq38y06vulgh0', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('mddkwevwo6fogquj', '', 'aajvq38y06vulgh0', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('8q2mrtu13qdlifaz', '', 'aajvq38y06vulgh0', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('3mt1lhi7733x9put', '', 'aajvq38y06vulgh0', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('638hk03hql2669ar', '', 'aajvq38y06vulgh0', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('of755emihbw5va6z', '', 'aajvq38y06vulgh0', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('grwn54r169nju8s1', '', 'aajvq38y06vulgh0', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('oovp44dbq5s9tg4u', '', 'aajvq38y06vulgh0', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('gb4pfnxnwxmgxwoc', '', 'aajvq38y06vulgh0', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('wqtfzwvhrteojvv7', '', 'aajvq38y06vulgh0', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('762zl27k7oaxmsp3', '', 'aajvq38y06vulgh0', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('x8nuxvc379v1rhys', '', 'aajvq38y06vulgh0', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('6ndu5ptknh5urnuc', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('cegzfzlg2r35vjru', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('dup8ie7d1rfhqk32', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Dance - Twist', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-dance.babylon', '1', '227', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ke2j6di3g32g2lxw', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('lsjwznr6e4r7s2mw', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ode6t12zoe1h5oam', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('r78te36a3b495zva', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('t1c0fa44nhxdi8o4', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('zbn3zi351k08bf75', '', 'aajvq38y06vulgh0', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('q54x4jkywoy07412', '', 'aajvq38y06vulgh0', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'wait-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('xbulvavjspcts189', '', 'aajvq38y06vulgh0', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('vqb0re96tq60xb2q', '', 'aajvq38y06vulgh0', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('69tbievkzjoe0hic', '', 'aajvq38y06vulgh0', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('iajou0alohn2fd2a', '', 'aajvq38y06vulgh0', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('3mda2s6zpcs48qv7', '', 'aajvq38y06vulgh0', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('o31jjw1uhp32cdof', '', 'aajvq38y06vulgh0', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('o5vogr5gj2j2ipb8', '', 'aajvq38y06vulgh0', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('zd88qcrv6wpg86op', '', 'aajvq38y06vulgh0', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('h04o182ehcncco2b', '', 'aajvq38y06vulgh0', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('5s7235czpwv9t0ih', '', 'aajvq38y06vulgh0', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('q30o6y9voni72lkx', '', 'aajvq38y06vulgh0', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('uc8mlkf0mt5j6bt0', '', 'aajvq38y06vulgh0', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('7aj39fzrosccrzl8', '', 'aajvq38y06vulgh0', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/aajvq38y06vulgh0/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
				");
				$wtwdb->query("
					INSERT INTO ".wtw_tableprefix."avataranimations 
					(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
					VALUES
					('45dg48tccn60jnna', '', 'dihtmpm1ae3b9d3a', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/', 'malcolmidle.babylon', '1', '195', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
					('9bu8mgen3h6gq95z', '', 'dihtmpm1ae3b9d3a', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'malewalk.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('hguup0xngdf35fri', '', 'dihtmpm1ae3b9d3a', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'malewalkback.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('avhsi8k52waqtvz9', '', 'dihtmpm1ae3b9d3a', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('bs1u56hvvq24en1a', '', 'dihtmpm1ae3b9d3a', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('03g1ssnvc7y61mz3', '', 'dihtmpm1ae3b9d3a', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('amaiouat8orpacvb', '', 'dihtmpm1ae3b9d3a', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ibzzzyvfmqv56eid', '', 'dihtmpm1ae3b9d3a', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('absye5i30phdg2zo', '', 'dihtmpm1ae3b9d3a', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'malewalkback.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('jlfa768mhkc280cq', '', 'dihtmpm1ae3b9d3a', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('kptx63zm62qieev4', '', 'dihtmpm1ae3b9d3a', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('bg9y2fxfa75334em', '', 'dihtmpm1ae3b9d3a', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'malestrafeleft.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('0phc97bxom4rdmz2', '', 'dihtmpm1ae3b9d3a', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'malestraferight.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('c8cimhpean88elwe', '', 'dihtmpm1ae3b9d3a', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('69lowvplqjwi2npi', '', 'dihtmpm1ae3b9d3a', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('4xxo3lsdvwgfgbdo', '', 'dihtmpm1ae3b9d3a', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('osabe0oggfm87llh', '', 'dihtmpm1ae3b9d3a', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('9cjzw8oox1ckqqcx', '', 'dihtmpm1ae3b9d3a', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('dfyr8iqb9auqth71', '', 'dihtmpm1ae3b9d3a', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('tkhwhxo3nr7awp3t', '', 'dihtmpm1ae3b9d3a', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('xv4mcxi0g8y5u60x', '', 'dihtmpm1ae3b9d3a', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('4patz2fbqef0oc3d', '', 'dihtmpm1ae3b9d3a', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('dmrilk9asno5diw6', '', 'dihtmpm1ae3b9d3a', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('fgkxp3hlk8d850dd', '', 'dihtmpm1ae3b9d3a', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('o0812jhi5sq9rfqv', '', 'dihtmpm1ae3b9d3a', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('t6ulex0lajy06fjk', '', 'dihtmpm1ae3b9d3a', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('0wedh0rtt49sjjvd', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('1nb595r8o28cnmo1', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('2j81rsg12f6g14us', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('6thtbygsmolqusa6', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('6vokevrg2450jyou', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('84wghue4zq3w3xlc', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('d7rvo8ccumi4tndn', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('m5c23iielnyeh03t', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('wf2uz0xqc97n89bd', '', 'dihtmpm1ae3b9d3a', '', '0', 'onoption', 'Option - Dance - Hip Hop', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'option-dance.babylon', '1', '331', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('jlvqlrkhek0ii9ig', '', 'dihtmpm1ae3b9d3a', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'wait-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('d64rfgk8qg0ejpta', '', 'dihtmpm1ae3b9d3a', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('7djizpuqgum9x56v', '', 'dihtmpm1ae3b9d3a', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('1kxxr7u6nw0oqq5h', '', 'dihtmpm1ae3b9d3a', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('9ydrm5d9xoabmdm6', '', 'dihtmpm1ae3b9d3a', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('jw2j7a2ow13z10w1', '', 'dihtmpm1ae3b9d3a', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('zhz1x2fsn93loxpb', '', 'dihtmpm1ae3b9d3a', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('43hvs958xcsjmlth', '', 'dihtmpm1ae3b9d3a', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('tugl8y7xrcpigc0h', '', 'dihtmpm1ae3b9d3a', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('i4a7f2njqaab0r6u', '', 'dihtmpm1ae3b9d3a', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('rtysb697putw8gdo', '', 'dihtmpm1ae3b9d3a', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('3v9v8nmcm0eql3wd', '', 'dihtmpm1ae3b9d3a', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('nzs8eo5ojqtm0mai', '', 'dihtmpm1ae3b9d3a', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('w65ci4c79x6lsw9h', '', 'dihtmpm1ae3b9d3a', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/dihtmpm1ae3b9d3a/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
				");
				$wtwdb->query("
					INSERT INTO ".wtw_tableprefix."avataranimations 
					(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
					VALUES
					('5nt31zrtvvq4cdu3', '', 'h1ro3h59xs5eknl0', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/', 'shaeidle.babylon', '1', '303', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
					('uuoxl8at7k8fh46j', '', 'h1ro3h59xs5eknl0', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'femalewalk.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('56fkk79qtw1kon74', '', 'h1ro3h59xs5eknl0', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'femalewalkback.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('1svy73w7d7y5w2o4', '', 'h1ro3h59xs5eknl0', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('mrv4ygdhddqieh6i', '', 'h1ro3h59xs5eknl0', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('q8z71lwpt1o9aohf', '', 'h1ro3h59xs5eknl0', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('y8d6tgtqa5zg9y05', '', 'h1ro3h59xs5eknl0', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('pa9iq5lip3a4tozu', '', 'h1ro3h59xs5eknl0', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('azywmf92ib4mrw9l', '', 'h1ro3h59xs5eknl0', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'femalewalkback.babylon', '1', '24', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('8d3fuy62sq950jr3', '', 'h1ro3h59xs5eknl0', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('6npn198d6q4fsnvf', '', 'h1ro3h59xs5eknl0', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('82kom4si7gq8z867', '', 'h1ro3h59xs5eknl0', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'malestrafeleft.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('jgnvglmanbqn2esp', '', 'h1ro3h59xs5eknl0', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'malestraferight.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('tnjyg7uxi9hpjkql', '', 'h1ro3h59xs5eknl0', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('lko6yaxtavuok0iy', '', 'h1ro3h59xs5eknl0', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('vfw2bglw3tq3y9my', '', 'h1ro3h59xs5eknl0', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('b70p9844wibss7ta', '', 'h1ro3h59xs5eknl0', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('9v5ht1sa0wnx15oj', '', 'h1ro3h59xs5eknl0', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('7fedoauhvt74nnys', '', 'h1ro3h59xs5eknl0', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('6qhippd0ue944l0l', '', 'h1ro3h59xs5eknl0', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('reimbnyx6rimbcja', '', 'h1ro3h59xs5eknl0', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('gdyuyl9xymk8n7rq', '', 'h1ro3h59xs5eknl0', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('8i9e7ivl3ck0u7lv', '', 'h1ro3h59xs5eknl0', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('0jfkla29rby90uyd', '', 'h1ro3h59xs5eknl0', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('t1v1hxmve7fg9v4e', '', 'h1ro3h59xs5eknl0', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('mxrx6xgsgqh01smr', '', 'h1ro3h59xs5eknl0', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('7so4eesf6b2wobm2', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('9284klrcme8hi58l', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('cc8hd2bt27obn2ce', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('i4zorwvhpsw2pyq2', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Dance - Salsa', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-dance.babylon', '1', '288', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('l9sx0mx7au6j1fr1', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('m8qndis4egvi75f0', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('q9c36gx30cx4nu5v', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('vtfc8mu9ut1c4rsm', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('zo6i4is601zomglm', '', 'h1ro3h59xs5eknl0', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('jmtjtuzni0gikwo0', '', 'h1ro3h59xs5eknl0', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'wait-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('7dqyih6z2yce4ja3', '', 'h1ro3h59xs5eknl0', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('l68d0ij618pgcppl', '', 'h1ro3h59xs5eknl0', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('e8oil40b02z7goe6', '', 'h1ro3h59xs5eknl0', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('tbwc0e2l7oi2aplg', '', 'h1ro3h59xs5eknl0', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('c1lq56xntjamxone', '', 'h1ro3h59xs5eknl0', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ainjewhyb4ggbhdq', '', 'h1ro3h59xs5eknl0', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('yfwnsp459n31e089', '', 'h1ro3h59xs5eknl0', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('4qa50a5ftxthrhca', '', 'h1ro3h59xs5eknl0', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('5m7sdkudphgmuia1', '', 'h1ro3h59xs5eknl0', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('kjg5rgzeuq1xqtit', '', 'h1ro3h59xs5eknl0', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('chl85isrn5t1hvgd', '', 'h1ro3h59xs5eknl0', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('jazt5f7z1eps0a1e', '', 'h1ro3h59xs5eknl0', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('j2g035cumv2xjmjg', '', 'h1ro3h59xs5eknl0', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/h1ro3h59xs5eknl0/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
				");
				$wtwdb->query("
					INSERT INTO ".wtw_tableprefix."avataranimations 
					(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
					VALUES
					('o3h47opkqwat7mge', '', 'odtx7arzof5eigp4', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/odtx7arzof5eigp4/', 'reginaidle.babylon', '1', '241', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
					('j0hccn866c6vsen2', '', 'odtx7arzof5eigp4', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'femalewalk.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('dm19ak0dstrdjnjt', '', 'odtx7arzof5eigp4', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'femalewalkback.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('myz1976axt8r5els', '', 'odtx7arzof5eigp4', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('5fo2bdxisdkqwd4h', '', 'odtx7arzof5eigp4', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('hyam9fdjld15jc3d', '', 'odtx7arzof5eigp4', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ngekmgen3i9r339y', '', 'odtx7arzof5eigp4', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('3yioweepev69qwbx', '', 'odtx7arzof5eigp4', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('2h8qym61oacxmbof', '', 'odtx7arzof5eigp4', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('36pwechejj1kpu3x', '', 'odtx7arzof5eigp4', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'femalewalkback.babylon', '1', '24', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('fa88j0g8sa07y753', '', 'odtx7arzof5eigp4', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('1webe10wjx0bilfc', '', 'odtx7arzof5eigp4', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('6y8bxnij7d978l8e', '', 'odtx7arzof5eigp4', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'malestrafeleft.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('jk9l8byuazzyudcn', '', 'odtx7arzof5eigp4', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'malestraferight.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('l8sqjtjkr0zanc5l', '', 'odtx7arzof5eigp4', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('15m4hdra4mbtuqhx', '', 'odtx7arzof5eigp4', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('p9cbpxnj9msun68v', '', 'odtx7arzof5eigp4', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('tomwv04oqal2g7xw', '', 'odtx7arzof5eigp4', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('uwqpivcg98sjawbp', '', 'odtx7arzof5eigp4', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('s9sxp5gmtckpveln', '', 'odtx7arzof5eigp4', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('9p6hoee13cubno45', '', 'odtx7arzof5eigp4', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('fl76gp9moby40ou8', '', 'odtx7arzof5eigp4', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('maysjiskb4p494fj', '', 'odtx7arzof5eigp4', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('kcv7ny7zd81rrqkk', '', 'odtx7arzof5eigp4', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ylarf0nypf2n7enw', '', 'odtx7arzof5eigp4', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('gnqd80kcijsnufn6', '', 'odtx7arzof5eigp4', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('56j843jw0qwjuceq', '', 'odtx7arzof5eigp4', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('3s7qgw2go007ask5', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('jivvhnl72rb0nuzh', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('lmbo7arygrsarcbe', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('nchqvge3hatd7c8c', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('o0et7jy2ph3uwo8j', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('qdacv9ve0vx9ng5o', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ynd3of2gruujmemi', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('zd6710kd1l7emjgw', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Dance - Wave Hip Hop', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-dance.babylon', '1', '405', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('zepcfdzfvtukxjcf', '', 'odtx7arzof5eigp4', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('tpu31zpezp62zs6x', '', 'odtx7arzof5eigp4', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walk-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('2z7v8tgblyqba9dg', '', 'odtx7arzof5eigp4', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('bv032couamwdlj5q', '', 'odtx7arzof5eigp4', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('7lsnip18qe4uclug', '', 'odtx7arzof5eigp4', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('d7mto61bd3bha686', '', 'odtx7arzof5eigp4', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('3ppfhxv1wpkgp4w7', '', 'odtx7arzof5eigp4', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('6b5zh19eweam0jji', '', 'odtx7arzof5eigp4', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('n4hi012nom1bvu5u', '', 'odtx7arzof5eigp4', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('gsunr2gofzjlk3ff', '', 'odtx7arzof5eigp4', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('bbt7etf0byhepqjv', '', 'odtx7arzof5eigp4', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('k7kf4q2585d8ay4z', '', 'odtx7arzof5eigp4', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('yjrrgud0rmo6owt1', '', 'odtx7arzof5eigp4', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('3pbl1gcla4h3cszw', '', 'odtx7arzof5eigp4', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('f71735yliy4b0ucq', '', 'odtx7arzof5eigp4', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/odtx7arzof5eigp4/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
				");
				$wtwdb->query("
					INSERT INTO ".wtw_tableprefix."avataranimations 
					(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
					VALUES
					('ohb6x5ze1112a9e6', '', 'p7y3p6ti6d85yf7q', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/', 'femaleidle.babylon', '1', '100', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
					('bdxircdsw641we93', '', 'p7y3p6ti6d85yf7q', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'femalewalk.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('qdo9cu9r0svzbnai', '', 'p7y3p6ti6d85yf7q', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'femalewalkback.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('pxk1g6i1m3jdabpm', '', 'p7y3p6ti6d85yf7q', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('z1abrv0hfo3h2v54', '', 'p7y3p6ti6d85yf7q', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('9pu3xcwiwz5utj7e', '', 'p7y3p6ti6d85yf7q', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('6i1n6vvsccpf21zu', '', 'p7y3p6ti6d85yf7q', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('fyhj8jzbncsw2pbe', '', 'p7y3p6ti6d85yf7q', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('5j6dabpn2erp5nua', '', 'p7y3p6ti6d85yf7q', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'femalewalkback.babylon', '1', '24', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ytb1bga3nwmcxjy3', '', 'p7y3p6ti6d85yf7q', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('o2bct3zn9czveclx', '', 'p7y3p6ti6d85yf7q', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('vaudbhi1qhaxs6i0', '', 'p7y3p6ti6d85yf7q', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ta1do9brv3uy7430', '', 'p7y3p6ti6d85yf7q', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'malestraferight.babylon', '1', '26', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('cfz2rb7aqxzmbbcl', '', 'p7y3p6ti6d85yf7q', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('3ybdeoz0e31smyb0', '', 'p7y3p6ti6d85yf7q', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('2us07qcgphx3ot91', '', 'p7y3p6ti6d85yf7q', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('k10a88qrfvr2tt3t', '', 'p7y3p6ti6d85yf7q', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('d4gigjax9co44ia9', '', 'p7y3p6ti6d85yf7q', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('d1xjyz5wssky5osd', '', 'p7y3p6ti6d85yf7q', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('xgg8yq0svsbluv70', '', 'p7y3p6ti6d85yf7q', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('xqqc6atchhmhwgot', '', 'p7y3p6ti6d85yf7q', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('hnp40zuucqjf1f9s', '', 'p7y3p6ti6d85yf7q', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('w874p74qvqsum1be', '', 'p7y3p6ti6d85yf7q', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('a6oiyyu8e9rv41jr', '', 'p7y3p6ti6d85yf7q', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('5hotdyklzoloil9v', '', 'p7y3p6ti6d85yf7q', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('1sn6myzx5d2t2tqc', '', 'p7y3p6ti6d85yf7q', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('02p16d4ax3tm94w6', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('3oz4dv3yvnu8qtqs', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Dance - Hip Hop', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-dance.babylon', '1', '153', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('6gnq88flx6r5uycj', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('8blx9vbi2pyd0k7h', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('8x6trj323756yjz8', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('8zl9djjpxanyjj23', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('eds4owitgiidj16x', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('jyuulxxz73kfx41d', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('wfmt9jig20tgq8z6', '', 'p7y3p6ti6d85yf7q', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('flbfgprxaaz69igj', '', 'p7y3p6ti6d85yf7q', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'wait-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('hs8wmyu8zcsd645k', '', 'p7y3p6ti6d85yf7q', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('cupvarkt8tckk9wp', '', 'p7y3p6ti6d85yf7q', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('y6yq94wzb6qsuak6', '', 'p7y3p6ti6d85yf7q', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('c2sbs1qbsy0305x7', '', 'p7y3p6ti6d85yf7q', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('k9f0y774vgx76mmg', '', 'p7y3p6ti6d85yf7q', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ghlqnk9hfrzjd7hw', '', 'p7y3p6ti6d85yf7q', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ijbva30w99hte18l', '', 'p7y3p6ti6d85yf7q', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('le44ea7hgtiwlk3w', '', 'p7y3p6ti6d85yf7q', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ldghqfg61ywkvrc7', '', 'p7y3p6ti6d85yf7q', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('xjthi5n63iusoeu6', '', 'p7y3p6ti6d85yf7q', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('phq2wuj7vomkrwoj', '', 'p7y3p6ti6d85yf7q', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ml4reymctienjk2d', '', 'p7y3p6ti6d85yf7q', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('oh204m5xzxe4gqya', '', 'p7y3p6ti6d85yf7q', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/p7y3p6ti6d85yf7q/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
				");
				$wtwdb->query("
					INSERT INTO ".wtw_tableprefix."avataranimations 
					(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
					VALUES
					('gfso15ljwulgi6c9', '', 'r8tgsns20ruwx0bg', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/', 'jasperidle.babylon', '1', '71', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
					('vj0hc99jwvpwd8z7', '', 'r8tgsns20ruwx0bg', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'malewalk.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('558r36misbbl2klb', '', 'r8tgsns20ruwx0bg', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'malewalkback.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('qpbjpxk1f36kas32', '', 'r8tgsns20ruwx0bg', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('0whnwjy4tq8wvmgf', '', 'r8tgsns20ruwx0bg', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('gh2u3xd12a74zl2h', '', 'r8tgsns20ruwx0bg', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('rkj1ihx50jou446l', '', 'r8tgsns20ruwx0bg', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('aywnkwtb5si57mjt', '', 'r8tgsns20ruwx0bg', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('en019757k7d82o3i', '', 'r8tgsns20ruwx0bg', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'malewalkback.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('9t9tcbilhnqsp6q6', '', 'r8tgsns20ruwx0bg', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('q13a4utlgkebg9z6', '', 'r8tgsns20ruwx0bg', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('s47q36nne0u7hvvp', '', 'r8tgsns20ruwx0bg', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'malestrafeleft.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('vvpwglj0cof38tel', '', 'r8tgsns20ruwx0bg', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'malestraferight.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('amyscydvj0ydzyjx', '', 'r8tgsns20ruwx0bg', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('mat1koyf0negd3lz', '', 'r8tgsns20ruwx0bg', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('q9qtohcswldr3oi2', '', 'r8tgsns20ruwx0bg', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('gim1r7dukguvn0m9', '', 'r8tgsns20ruwx0bg', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('3yzc45wytwyin046', '', 'r8tgsns20ruwx0bg', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('4fm8sdbpw8p9dv7o', '', 'r8tgsns20ruwx0bg', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('iruyxr8b0p4ho7u2', '', 'r8tgsns20ruwx0bg', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('jtugpo8us59xia4z', '', 'r8tgsns20ruwx0bg', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('8g68ig75c4dna4w2', '', 'r8tgsns20ruwx0bg', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('9txbwsyjncgf1sqs', '', 'r8tgsns20ruwx0bg', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('zxia7912xm04wp62', '', 'r8tgsns20ruwx0bg', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('lpyn9jbh4e78gvsb', '', 'r8tgsns20ruwx0bg', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('0tu1yqk2irhu1zkh', '', 'r8tgsns20ruwx0bg', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('3q7i3a0sstslcvav', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('dtiyszzeq6ijfhrr', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('elv38tu0lnryylgw', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ffnph8yej8kgs1u5', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('h0cljhty5yfa9ns2', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('h61nn6jeoshjk8em', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('iqwp1l9wtdl8hh5z', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('l8gz6z0pr7yedfdo', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('s21wirqtwvkm3mlp', '', 'r8tgsns20ruwx0bg', '', '0', 'onoption', 'Option - Dance - Breakdance', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'option-dance.babylon', '1', '111', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('b0foao03pb19x7e1', '', 'r8tgsns20ruwx0bg', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'wait-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('maju79dhvfa99r8l', '', 'r8tgsns20ruwx0bg', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('l8ygjgj9jjclw67q', '', 'r8tgsns20ruwx0bg', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('exw5uayi09nciswn', '', 'r8tgsns20ruwx0bg', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('f5w7pr718c31i8m3', '', 'r8tgsns20ruwx0bg', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('jmqw97x4cn3jifo2', '', 'r8tgsns20ruwx0bg', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('29jgv98x8zchhdz3', '', 'r8tgsns20ruwx0bg', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('az3u6yzq253ckadk', '', 'r8tgsns20ruwx0bg', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('5fm9slbuc8trv7dx', '', 'r8tgsns20ruwx0bg', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('fx0v1jewghks28mt', '', 'r8tgsns20ruwx0bg', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('d4c4ksd6db4pm6ei', '', 'r8tgsns20ruwx0bg', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('55yed4zpq3y3t4cu', '', 'r8tgsns20ruwx0bg', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('1e02zs5piisme1yx', '', 'r8tgsns20ruwx0bg', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('o3qv2ebsrpnc6asj', '', 'r8tgsns20ruwx0bg', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/r8tgsns20ruwx0bg/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
				");
				$wtwdb->query("
					INSERT INTO ".wtw_tableprefix."avataranimations 
					(avataranimationid, pastavataranimationid, avatarid, userid, loadpriority, animationevent, animationfriendlyname, animationicon, objectfolder, objectfile, startframe, endframe, animationloop, speedratio, soundid, soundpath, soundmaxdistance, createdate, createuserid, updatedate, updateuserid, deleteddate, deleteduserid, deleted)
					VALUES
					('n3i9s7ophcae5h1r', '', 'v1ij2rkmdypo97c2', '', '100', 'onwait', 'Wait', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/', 'stefaniidle.babylon', '1', '363', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '2'),
					('kugqdo853zl0bili', '', 'v1ij2rkmdypo97c2', '', '50', 'onwalk', 'Walk', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'femalewalk.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('sen2dpcn5w0blz4o', '', 'v1ij2rkmdypo97c2', '', '49', 'onwalkbackwards', 'Walk Backwards', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'femalewalkback.babylon', '1', '24', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('17vpyohemuc9anbo', '', 'v1ij2rkmdypo97c2', '', '48', 'onturnleft', 'Turn Left', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'maleturnleft.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('g8sa2h7ld3emyvht', '', 'v1ij2rkmdypo97c2', '', '48', 'onturnright', 'Turn Right', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'maleturnright.babylon', '1', '29', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('qpbf6mkz74zlyz3k', '', 'v1ij2rkmdypo97c2', '', '47', 'onstrafeleft', 'Strafe Left', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'malestrafeleft.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ns1tzf8ulfdigqab', '', 'v1ij2rkmdypo97c2', '', '47', 'onstraferight', 'Strafe Right', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'malestraferight.babylon', '1', '26', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('iupyohfn02a8d6r8', '', 'v1ij2rkmdypo97c2', '', '40', 'onrun', 'Run', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'malerun.babylon', '1', '16', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('vpyk0dt1n6x5x8c1', '', 'v1ij2rkmdypo97c2', '', '39', 'onrunbackwards', 'Run Backwards', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'femalewalkback.babylon', '1', '24', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('6sdhb3lnilfdkr38', '', 'v1ij2rkmdypo97c2', '', '38', 'onrunturnleft', 'Run Turn Left', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'maleturnleft.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('tfmvj0g8tddtw5ye', '', 'v1ij2rkmdypo97c2', '', '38', 'onrunturnright', 'Run Turn Right', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'maleturnright.babylon', '1', '29', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('41warxbvfh6grfw6', '', 'v1ij2rkmdypo97c2', '', '37', 'onrunstrafeleft', 'Run Strafe Left', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'malestrafeleft.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('25i6ayvk4zly1bii', '', 'v1ij2rkmdypo97c2', '', '37', 'onrunstraferight', 'Run Strafe Right', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'malestraferight.babylon', '1', '26', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('kjg59nnkjjagphzg', '', 'v1ij2rkmdypo97c2', '', '35', 'onwait-sit', 'Wait - Sit', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'wait-sit.babylon', '1', '155', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('y0ww1a1bzotaeij6', '', 'v1ij2rkmdypo97c2', '', '34', 'onjump', 'Jump', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'jump.babylon', '1', '46', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('iyw28zh9ddfybq7b', '', 'v1ij2rkmdypo97c2', '', '33', 'onjumpwalk', 'Walk - Jump', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walk-jump.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('0esp3539dmnwgueb', '', 'v1ij2rkmdypo97c2', '', '32', 'onjumprun', 'Run - Jump', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walk-jump.babylon', '1', '25', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('8urc5k5wfrb2rq82', '', 'v1ij2rkmdypo97c2', '', '31', 'onjumpwalkbackwards', 'Walk Backwards - Jump', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('wvbgyl82o2asluu1', '', 'v1ij2rkmdypo97c2', '', '30', 'onjumprunbackwards', 'Run Backwards - Jump', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walkbackwards-jump.babylon', '1', '23', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('2xhv7zgs9zq1j3ec', '', 'v1ij2rkmdypo97c2', '', '10', 'onwait-swim', 'Wait - Swim', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('n3qvyyhzkxeiehpl', '', 'v1ij2rkmdypo97c2', '', '9', 'onwalk-swim', 'Walk - Swim', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walk-swim.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('iftvhhsgbfklwlw0', '', 'v1ij2rkmdypo97c2', '', '8', 'onrun-swim', 'Run - Swim', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walk-swim.babylon', '1', '109', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('db5mdheetohk154s', '', 'v1ij2rkmdypo97c2', '', '7', 'onwalkbackwards-swim', 'Walk Backwards Swim', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'wait-swim.babylon', '1', '73', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('j7210d1diub8edki', '', 'v1ij2rkmdypo97c2', '', '6', 'onrunbackwards-swim', 'Run Backwards Swim', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'wait-swim.babylon', '1', '73', '1', '1.50', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('9dhdlbcoijc21ks7', '', 'v1ij2rkmdypo97c2', '', '2', 'onsleep', 'Wait - Sleep', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'wait-sleep.babylon', '1', '166', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ugc9jrkzn34xfb2n', '', 'v1ij2rkmdypo97c2', '', '1', 'ondie', 'Die', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'die.babylon', '1', '56', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('06bkntz10htbjnof', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Agree', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-agree.babylon', '1', '47', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('2w6u3f9ae990kb25', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Angry', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-angry.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('31nrl2gmtgkq9pu5', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Wave', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-wave.babylon', '1', '14', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('76xphisu8xi7tezx', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Disagree', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-disagree.babylon', '1', '79', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ar2w03f499kif3zi', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Point', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-point.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('e76nl8wy3evbldky', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Charge', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-charge.babylon', '1', '138', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('gs7tv5nnisrz3rjv', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Victory', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-victory.babylon', '1', '109', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('o5gyo65yutc5rrdt', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Dance - Swing', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-dance.babylon', '1', '503', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('ys5e1ffpbz7dp9m3', '', 'v1ij2rkmdypo97c2', '', '0', 'onoption', 'Option - Bow', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'option-bow.babylon', '1', '67', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('o0wxc9c0r609ppup', '', 'v1ij2rkmdypo97c2', '', '-100', 'onwait-riffle', 'Wait - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'wait-riffle.babylon', '1', '207', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('2rn9h2vmh10gzp48', '', 'v1ij2rkmdypo97c2', '', '-101', 'onwalk-riffle', 'Walk - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walk-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('rkcakcnazgxhse9t', '', 'v1ij2rkmdypo97c2', '', '-102', 'onwalkbackwards-riffle', 'Walk Backwards - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walkbackwards-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('2vuym4yaa9kpjmuz', '', 'v1ij2rkmdypo97c2', '', '-103', 'onturnleft-riffle', 'Turn Left - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('07s116f0131pm3qc', '', 'v1ij2rkmdypo97c2', '', '-103', 'onturnright-riffle', 'Turn Right - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'turnright-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('aa60m1y5v1857nha', '', 'v1ij2rkmdypo97c2', '', '-104', 'onstrafeleft-riffle', 'Walk Strafe Left - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walkstrafeleft-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('fnbe3tqem605lgxc', '', 'v1ij2rkmdypo97c2', '', '-104', 'onstraferight-riffle', 'Walk Strafe Right - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'walkstraferight-riffle.babylon', '1', '25', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('w03u62a3c0eg4rpy', '', 'v1ij2rkmdypo97c2', '', '-105', 'onrun-riffle', 'Run - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'run-riffle.babylon', '1', '17', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('kvu639mnotatyvz9', '', 'v1ij2rkmdypo97c2', '', '-106', 'onrunbackwards-riffle', 'Run Backwards - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'runbackwards-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('6crtqzl35vrbkqwo', '', 'v1ij2rkmdypo97c2', '', '-107', 'onrunturnleft-riffle', 'Run Turn Left - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'turnleft-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('9dnmlhw90se34zec', '', 'v1ij2rkmdypo97c2', '', '-107', 'onrunturnright-riffle', 'Run Turn Right - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'turnright-riffle.babylon', '1', '25', '1', '2.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('9ddyo8rhp132tyxx', '', 'v1ij2rkmdypo97c2', '', '-108', 'onrunstrafeleft-riffle', 'Run Strafe Left - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'runstrafeleft-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('pcv32nrwp7kbtrad', '', 'v1ij2rkmdypo97c2', '', '-108', 'onrunstraferight-riffle', 'Run Strafe Right - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'runstraferight-riffle.babylon', '1', '13', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0'),
					('cw18ezyud0jz51mu', '', 'v1ij2rkmdypo97c2', '', '-109', 'ondie-riffle', 'Die - Riffle', '', '/content/uploads/avatars/v1ij2rkmdypo97c2/animations/', 'die-riffle.babylon', '1', '72', '1', '1.00', '', '', '100.00', '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', NULL, '', '0');
				");
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
						(null, 'wtw_rating', '[Not Rated]', 'main', 'right', -1001, 1, '', '', 'show-hide', 'wtw_menucontentrating', 1, '".$ztimestamp."', '".$zuserid."', '".$ztimestamp."', '".$zuserid."', null, '', 0);
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
				if (isset($zrow["defloadpriority"]) && !empty($zrow["defloadpriority"])) {
					$zloadpriority = $zrow["defloadpriority"];
				}
				if (isset($zrow["defstartframe"]) && !empty($zrow["defstartframe"])) {
					$zstartframe = $zrow["defstartframe"];
				}
				if (isset($zrow["defendframe"]) && !empty($zrow["defendframe"])) {
					$zendframe = $zrow["defendframe"];
				}
				if (isset($zrow["defanimationloop"]) && !empty($zrow["defanimationloop"])) {
					$zanimationloop = $zrow["defanimationloop"];
				}
				if (isset($zrow["defspeedratio"]) && !empty($zrow["defspeedratio"])) {
					$zspeedratio = $zrow["defspeedratio"];
				}
				if (isset($zrow["defsoundmaxdistance"]) && !empty($zrow["defsoundmaxdistance"])) {
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
				if (isset($zrow["loadpriority"]) && !empty($zrow["loadpriority"])) {
					$zloadpriority = $zrow["loadpriority"];
				}
				if (isset($zrow["startframe"]) && !empty($zrow["startframe"])) {
					$zstartframe = $zrow["startframe"];
				}
				if (isset($zrow["endframe"]) && !empty($zrow["endframe"])) {
					$zendframe = $zrow["endframe"];
				}
				if (isset($zrow["animationloop"]) && !empty($zrow["animationloop"])) {
					$zanimationloop = $zrow["animationloop"];
				}
				if (isset($zrow["defspeedratio"]) && !empty($zrow["speedratio"])) {
					$zspeedratio = $zrow["speedratio"];
				}
				if (isset($zrow["soundmaxdistance"]) && !empty($zrow["soundmaxdistance"])) {
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
					mkdir($zdestinationfolder, octdec(wtw_chmod), true);
					chmod($zdestinationfolder, octdec(wtw_chmod));
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
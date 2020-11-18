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
		/* table definitions used for new installs and updating existing installs of WalkTheWeb core */
		global $wtw;
		global $wtwdb;
		try {
			/* ini_set('max_execution_time', 300); */
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
				  `deleted` int(11) DEFAULT '0',
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
				  `rotatedirection` int(11) DEFAULT '1',
				  `rotatespeed` decimal(18,2) DEFAULT '1.00',
				  `jsfunction` varchar(255) DEFAULT '',
				  `jsparameters` varchar(255) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int(11) DEFAULT '0',
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
				CREATE TABLE `".wtw_tableprefix."avataranimations` (
				  `avataranimationid` varchar(16) NOT NULL,
				  `pastavataranimationid` varchar(16) DEFAULT '',
				  `avatarid` varchar(16) DEFAULT '',
				  `userid` varchar(16) DEFAULT '',
				  `loadpriority` int(11) DEFAULT '0',
				  `animationevent` varchar(45) DEFAULT '',
				  `animationfriendlyname` varchar(255) DEFAULT '',
				  `setdefault` int(11) DEFAULT '0',
				  `animationicon` varchar(255) DEFAULT '',
				  `objectfolder` varchar(255) DEFAULT '',
				  `objectfile` varchar(255) DEFAULT '',
				  `startframe` int(11) DEFAULT '0',
				  `endframe` int(11) DEFAULT '0',
				  `animationloop` int(11) DEFAULT '1',
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
				  `deleted` int(11) DEFAULT '0',
				  PRIMARY KEY (`avataranimationid`),
				  UNIQUE KEY `".wtw_tableprefix."avataranimationid_UNIQUE` (`avataranimationid`),
				  KEY `".wtw_tableprefix."idx_avataranimations` (`userid`,`loadpriority`,`soundid`,`animationevent`)
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;				
			");
			$wtwdb->deltaCreateTable("			
				CREATE TABLE `".wtw_tableprefix."avatarcolors` (
				  `avatarpartid` varchar(40) NOT NULL,
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
				  `avatargroup` varchar(64) DEFAULT 'Default',
				  `displayname` varchar(255) DEFAULT '',
				  `avatarfolder` varchar(255) DEFAULT '',
				  `avatarfile` varchar(255) DEFAULT '',
				  `gender` varchar(25) DEFAULT 'female',
				  `scalingx` decimal(18,4) DEFAULT '0.0800',
				  `scalingy` decimal(18,4) DEFAULT '0.0800',
				  `scalingz` decimal(18,4) DEFAULT '0.0800',
				  `startframe` int(11) DEFAULT '0',
				  `endframe` int(11) DEFAULT '0',
				  `imagefull` varchar(255) DEFAULT '',
				  `imageface` varchar(255) DEFAULT '',
				  `sortorder` int DEFAULT '5',
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
				  `graphiclevel` int(11) DEFAULT '0',
				  `textureid` varchar(16) DEFAULT '',
				  `texturebumpid` varchar(16) DEFAULT '',
				  `texturehoverid` varchar(16) DEFAULT '',
				  `videoid` varchar(16) DEFAULT '',
				  `videoposterid` varchar(16) DEFAULT '',
				  `diffusecolorr` decimal(20,18) DEFAULT '1.000000000000000000',
				  `diffusecolorg` decimal(20,18) DEFAULT '1.000000000000000000',
				  `diffusecolorb` decimal(20,18) DEFAULT '1.000000000000000000',
				  `specularcolorr` decimal(20,18) DEFAULT '1.000000000000000000',
				  `specularcolorg` decimal(20,18) DEFAULT '1.000000000000000000',
				  `specularcolorb` decimal(20,18) DEFAULT '1.000000000000000000',
				  `emissivecolorr` decimal(20,18) DEFAULT '1.000000000000000000',
				  `emissivecolorg` decimal(20,18) DEFAULT '1.000000000000000000',
				  `emissivecolorb` decimal(20,18) DEFAULT '1.000000000000000000',
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
				  `soundloop` int(11) DEFAULT '1',
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
				  `billboard` int(11) DEFAULT '0',
				  `waterreflection` int(11) DEFAULT '0',
				  `receiveshadows` int(11) DEFAULT '0',
				  `subdivisions` int(11) DEFAULT '2',
				  `minheight` int(11) DEFAULT '0',
				  `maxheight` int(11) DEFAULT '30',
				  `checkcollisions` int(11) DEFAULT '1',
				  `ispickable` int(11) DEFAULT '1',
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
				  `deleted` int(11) DEFAULT '0',
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
				  `deleted` int(11) DEFAULT '0',
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
				  `deleted` int(11) DEFAULT '0',
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
				  `graphiclevel` int(11) DEFAULT '0',
				  `textureid` varchar(16) DEFAULT '',
				  `texturebumpid` varchar(16) DEFAULT '',
				  `texturehoverid` varchar(16) DEFAULT '',
				  `videoid` varchar(16) DEFAULT '',
				  `videoposterid` varchar(16) DEFAULT '',
				  `diffusecolorr` decimal(20,18) DEFAULT '1.000000000000000000',
				  `diffusecolorg` decimal(20,18) DEFAULT '1.000000000000000000',
				  `diffusecolorb` decimal(20,18) DEFAULT '1.000000000000000000',
				  `specularcolorr` decimal(20,18) DEFAULT '1.000000000000000000',
				  `specularcolorg` decimal(20,18) DEFAULT '1.000000000000000000',
				  `specularcolorb` decimal(20,18) DEFAULT '1.000000000000000000',
				  `emissivecolorr` decimal(20,18) DEFAULT '1.000000000000000000',
				  `emissivecolorg` decimal(20,18) DEFAULT '1.000000000000000000',
				  `emissivecolorb` decimal(20,18) DEFAULT '1.000000000000000000',
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
				  `soundloop` int(11) DEFAULT '1',
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
				  `billboard` int(11) DEFAULT '0',
				  `waterreflection` int(11) DEFAULT '0',
				  `receiveshadows` int(11) DEFAULT '0',
				  `subdivisions` int(11) DEFAULT '2',
				  `minheight` int(11) DEFAULT '0',
				  `maxheight` int(11) DEFAULT '30',
				  `checkcollisions` int(11) DEFAULT '1',
				  `ispickable` int(11) DEFAULT '1',
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
				  `deleted` int(11) DEFAULT '0',
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
				  `deleted` int(11) DEFAULT '0',
				  PRIMARY KEY (`connectinggridid`),
				  UNIQUE KEY `".wtw_tableprefix."connectinggridid_UNIQUE` (`connectinggridid`),
				  KEY `".wtw_tableprefix."connectinggrids_webid` (`parentwebid`,`childwebid`,`loadactionzoneid`)
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."errorlog` (
				  `errorid` int(11) NOT NULL AUTO_INCREMENT,
				  `logdate` datetime DEFAULT NULL,
				  `message` varchar(2048) DEFAULT '',
				  `intvalue` int(11) DEFAULT NULL,
				  `decimalvalue` decimal(18,2) DEFAULT NULL,
				  PRIMARY KEY (`errorid`),
				  UNIQUE KEY `".wtw_tableprefix."errorid_UNIQUE` (`errorid`)
				) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8;				
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."menuitems` (
				  `menuitemid` int(11) NOT NULL AUTO_INCREMENT,
				  `menuitemname` varchar(255) DEFAULT '',
				  `menutext` varchar(255) DEFAULT 'Menu Item',
				  `menuset` varchar(45) DEFAULT 'main',
				  `menualignment` varchar(45) DEFAULT 'left',
				  `menuorder` int(11) DEFAULT '10',
				  `menulevel` int(11) DEFAULT '1',
				  `menuiconid` varchar(16) DEFAULT '',
				  `menuicon` varchar(255) DEFAULT '',
				  `menuaction` varchar(45) DEFAULT '',
				  `menuproperty` varchar(255) DEFAULT '',
				  `menusecurity` int(11) DEFAULT '1',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int(11) DEFAULT '0',
				  PRIMARY KEY (`menuitemid`),
				  UNIQUE KEY `".wtw_tableprefix."menuitems_UNIQUE` (`menuitemid`)
				) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."moldpoints` (
				  `moldpointid` varchar(16) NOT NULL,
				  `pastmoldpointid` varchar(16) DEFAULT '',
				  `moldid` varchar(16) DEFAULT '',
				  `pathnumber` int(11) DEFAULT '1',
				  `sorder` int(11) DEFAULT '0',
				  `positionx` decimal(18,2) DEFAULT '0.00',
				  `positiony` decimal(18,2) DEFAULT '0.00',
				  `positionz` decimal(18,2) DEFAULT '0.00',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int(11) DEFAULT '0',
				  PRIMARY KEY (`moldpointid`),
				  UNIQUE KEY `".wtw_tableprefix."moldpointid_UNIQUE` (`moldpointid`),
				  KEY `".wtw_tableprefix."moldpoints_webid` (`moldid`,`pathnumber`,`sorder`)
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
			");
			$wtwdb->deltaCreateTable("
				CREATE TABLE `".wtw_tableprefix."plugins` (
				  `pluginname` varchar(255) NOT NULL,
				  `active` int(11) DEFAULT '0',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int(11) DEFAULT '0',
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
				  `deleted` int(11) DEFAULT '0',
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
				  `deleted` int(11) DEFAULT '0',
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
				  `graphiclevel` int(11) DEFAULT '0',
				  `textureid` varchar(16) DEFAULT '',
				  `texturebumpid` varchar(16) DEFAULT '',
				  `texturehoverid` varchar(16) DEFAULT '',
				  `videoid` varchar(16) DEFAULT '',
				  `videoposterid` varchar(16) DEFAULT '',
				  `diffusecolorr` decimal(20,18) DEFAULT '1.000000000000000000',
				  `diffusecolorg` decimal(20,18) DEFAULT '1.000000000000000000',
				  `diffusecolorb` decimal(20,18) DEFAULT '1.000000000000000000',
				  `specularcolorr` decimal(20,18) DEFAULT '1.000000000000000000',
				  `specularcolorg` decimal(20,18) DEFAULT '1.000000000000000000',
				  `specularcolorb` decimal(20,18) DEFAULT '1.000000000000000000',
				  `emissivecolorr` decimal(20,18) DEFAULT '1.000000000000000000',
				  `emissivecolorg` decimal(20,18) DEFAULT '1.000000000000000000',
				  `emissivecolorb` decimal(20,18) DEFAULT '1.000000000000000000',
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
				  `soundloop` int(11) DEFAULT '1',
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
				  `billboard` int(11) DEFAULT '0',
				  `waterreflection` int(11) DEFAULT '0',
				  `receiveshadows` int(11) DEFAULT '0',
				  `subdivisions` int(11) DEFAULT '2',
				  `minheight` int(11) DEFAULT '0',
				  `maxheight` int(11) DEFAULT '30',
				  `checkcollisions` int(11) DEFAULT '1',
				  `ispickable` int(11) DEFAULT '1',
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
				  `deleted` int(11) DEFAULT '0',
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
				  `deleted` int(11) DEFAULT '0',
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
				  `startframe` int(11) DEFAULT '0',
				  `endframe` int(11) DEFAULT '0',
				  `animationloop` int(11) DEFAULT '1',
				  `speedratio` decimal(18,2) DEFAULT '1.00',
				  `animationendscript` varchar(255) DEFAULT '',
				  `animationendparameters` varchar(255) DEFAULT '',
				  `stopcurrentanimations` int(11) DEFAULT '1',
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
				  `deleted` int(11) DEFAULT '0',
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
				  `stock` int(11) DEFAULT '0',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int(11) DEFAULT '0',
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
				  `stock` int(11) DEFAULT '0',
				  `hidedate` datetime DEFAULT NULL,
				  `hideuserid` varchar(16) DEFAULT '',
				  `hide` int(11) DEFAULT '0',
				  `checkeddate` datetime DEFAULT NULL,
				  `checkeduserid` varchar(16) DEFAULT '',
				  `checked` int(11) DEFAULT '0',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int(11) DEFAULT '0',
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
				  `deleted` int(11) DEFAULT '0',
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
				  `avataranimationevent` varchar(45) DEFAULT '',
				  `speedratio` decimal(18,2) DEFAULT '1.00',
				  `walkspeed` decimal(18,2) DEFAULT '1.00',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int(11) DEFAULT '0',
				  PRIMARY KEY (`useravataranimationid`),
				  UNIQUE KEY `".wtw_tableprefix."useravataranimationid_UNIQUE` (`useravataranimationid`),
				  KEY `".wtw_tableprefix."idx_useravataranimations` (`avataranimationid`,`useravatarid`,`avataranimationevent`)
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
				  `deleted` int(11) DEFAULT '0',
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
				  `scalingx` decimal(18,4) DEFAULT '1.00',
				  `scalingy` decimal(18,4) DEFAULT '1.00',
				  `scalingz` decimal(18,4) DEFAULT '1.00',
				  `startframe` int(11) DEFAULT '0',
				  `endframe` int(11) DEFAULT '0',
				  `displayname` varchar(45) DEFAULT '',
				  `privacy` int(11) DEFAULT '0',
				  `lastdate` datetime DEFAULT NULL,
				  `lastip` varchar(45) DEFAULT '',
				  `enteranimation` int(11) DEFAULT '0',
				  `exitanimation` int(11) DEFAULT '0',
				  `enteranimationparameter` varchar(255) DEFAULT '',
				  `exitanimationparameter` varchar(255) DEFAULT '',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int(11) DEFAULT '0',
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
				  `deleted` int(11) DEFAULT '0',
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
				  `deleted` int(11) DEFAULT '0',
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
				  `forcehttps` int(11) DEFAULT '0',
				  `createdate` datetime DEFAULT NULL,
				  `createuserid` varchar(16) DEFAULT '',
				  `updatedate` datetime DEFAULT NULL,
				  `updateuserid` varchar(16) DEFAULT '',
				  `deleteddate` datetime DEFAULT NULL,
				  `deleteduserid` varchar(16) DEFAULT '',
				  `deleted` int(11) DEFAULT '0',
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
				  `imageindex` int(11) DEFAULT '0',
				  `imageid` varchar(16) DEFAULT '',
				  `imagehoverid` varchar(16) DEFAULT '',
				  `imageclickid` varchar(16) DEFAULT '',
				  `graphiclevel` int(11) DEFAULT '0',
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
				  `deleted` int(11) DEFAULT '0',
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
		/* this process is only run for new database setups - or if certain tables are deleted or empty */
		global $wtw;
		try {
			/* ini_set('max_execution_time', 300); */
			global $wtwdb;
			$ztimestamp = date('Y/m/d H:i:s');
			$wtwdb->query("
				INSERT INTO `".wtw_tableprefix."avatargroups` VALUES 
				('cphaz1acsziosye6','Anonymous','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('ot45ejgp5oxl6420','Default','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");
			$wtwdb->query("
				INSERT INTO `".wtw_tableprefix."avatars` VALUES 
				('3b9bt5c70igtmqux','Anonymous','Anonymous Male','/content/system/avatars/male/','maleidle.babylon','male',0.0800,0.0800,0.0800,1,213,'malefull.png','maleface.png',2,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('641svy8bwjx2kme7','Default','Remy','/content/system/avatars/remy/','remyidle.babylon','male',0.0400,0.0400,0.0400,1,196,'remyfull.png','remyface.png',4,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('9e94useo7x2ief0s','Default','Liam','/content/system/avatars/liam/','liamidle.babylon','male',0.0400,0.0400,0.0400,1,200,'liamfull.png','liamface.png',4,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('aajvq38y06vulgh0','Default','Pearl','/content/system/avatars/pearl/','pearlidle.babylon','female',0.0700,0.0700,0.0700,1,325,'pearlfull.png','pearlface.png',3,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('dihtmpm1ae3b9d3a','Default','Malcolm','/content/system/avatars/malcolm/','malcolmidle.babylon','male',0.0400,0.0400,0.0400,1,195,'malcolmfull.png','malcolmface.png',4,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('h1ro3h59xs5eknl0','Default','Shae','/content/system/avatars/shae/','shaeidle.babylon','female',0.0400,0.0400,0.0400,1,303,'shaefull.png','shaeface.png',3,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('odtx7arzof5eigp4','Default','Regina','/content/system/avatars/regina/','reginaidle.babylon','female',0.0400,0.0400,0.0400,1,241,'reginafull.png','reginaface.png',3,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('p7y3p6ti6d85yf7q','Anonymous','Anonymous Female','/content/system/avatars/female/','femaleidle.babylon','female',0.0800,0.0800,0.0800,1,100,'femalefull.png','femaleface.png',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('r8tgsns20ruwx0bg','Default','Jasper','/content/system/avatars/jasper/','jasperidle.babylon','male',0.0700,0.0700,0.0700,1,71,'jasperfull.png','jasperface.png',4,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('v1ij2rkmdypo97c2','Default','Stefani','/content/system/avatars/stefani/','stefaniidle.babylon','female',0.0400,0.0400,0.0400,1,363,'stefanifull.png','stefaniface.png',3,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");

			$wtwdb->query("
				INSERT INTO `".wtw_tableprefix."avatarcolors` VALUES 
				('n7ggpnsdmvafn27q','3b9bt5c70igtmqux','Alpha_Joints','#47547F','#000000','#000000','#47547F','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('whq222ptqbcwhbpe','3b9bt5c70igtmqux','Alpha_Surface','#31A6FD','#000000','#000000','#31A6FD','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('2x1u3pmt6xwp12gk','641svy8bwjx2kme7','Bottoms','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('2ze2ozdpolqedzz4','641svy8bwjx2kme7','Tops','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('9xm4fbcy6y9jb13m','641svy8bwjx2kme7','Shoes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('bfd5zs7qydryrh3t','641svy8bwjx2kme7','Hair','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('g4h2vp1mtk6ofy2t','641svy8bwjx2kme7','Eyes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('pt96upqdo1ru1yny','641svy8bwjx2kme7','Body','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('wjd8qs4v98d5y4cx','641svy8bwjx2kme7','Eyelashes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('2ciipvngwn3wzreg','9e94useo7x2ief0s','Eyelashes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('5a26y5b3f6z72yuu','9e94useo7x2ief0s','Shoes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('gmr5gbvgibrwm60r','9e94useo7x2ief0s','Body','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('jv39gf5r987oihmu','9e94useo7x2ief0s','Bottoms','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('vbpzojwthsuzmx2i','9e94useo7x2ief0s','Tops','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('w62hm4xe4r3d7d2b','9e94useo7x2ief0s','Eyes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('39ue6qhus79oyuq2','aajvq38y06vulgh0','Tops','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('789zg2mbpirdaefz','aajvq38y06vulgh0','Hair','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('fkdfdshjsgnhiv91','aajvq38y06vulgh0','Shoes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('skhk514cfn6z6528','aajvq38y06vulgh0','Bottoms','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('t1fn2kip0t3ek6k3','aajvq38y06vulgh0','Eyes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('twvty9thzku85bzy','aajvq38y06vulgh0','Eyelashes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('f411l0wtsjd938b3','aajvq38y06vulgh0','Body','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('0z6w4naqcxya572c','dihtmpm1ae3b9d3a','Shoes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('8zrvrc0yv3njmyhh','dihtmpm1ae3b9d3a','Eyelashes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('dujy29stjr1d3fxx','dihtmpm1ae3b9d3a','Hats','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('o477h8qsjou40mv3','dihtmpm1ae3b9d3a','Eyes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('p80ygek28v4htplx','dihtmpm1ae3b9d3a','Hair','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('r8jk0vdiqt477w3q','dihtmpm1ae3b9d3a','Tops','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('riko7jfagi42kvoq','dihtmpm1ae3b9d3a','Body','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('lxmqh7ux9z5ha1q1','dihtmpm1ae3b9d3a','Bottoms','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('5k2b3nv5ih945e6d','h1ro3h59xs5eknl0','Tops','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('99dfpy7ffwywgykb','h1ro3h59xs5eknl0','Bottoms','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('mwmy1ls9ro0b2k85','h1ro3h59xs5eknl0','Shoes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('s0kgfni1ksp7wypv','h1ro3h59xs5eknl0','Eyelashes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('sxykax0jn240aymt','h1ro3h59xs5eknl0','Hair','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('tud2y63eh8f07lgr','h1ro3h59xs5eknl0','Eyes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('ybdjum9lceqriu3l','h1ro3h59xs5eknl0','Body','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('2nr5nlf62qtfkkxq','odtx7arzof5eigp4','Eyes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('320ez8wnt7pi538i','odtx7arzof5eigp4','Bottoms','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('j3gkj9t025ax9rhs','odtx7arzof5eigp4','Eyelashes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('mfycst1inbeobx05','odtx7arzof5eigp4','Body','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('mkgy5jhejme7firt','odtx7arzof5eigp4','Hats','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('o2br140ugumjh29q','odtx7arzof5eigp4','Shoes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('ofxbs3a4i0w76pjb','odtx7arzof5eigp4','Tops','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('rl029y75fj1coxyp','odtx7arzof5eigp4','Hair','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('vxmtb8vpvjvf3zma','p7y3p6ti6d85yf7q','Beta_Joints','#4C2121','#000000','#000000','#4C2121','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('n89yro60qtgyy93v','p7y3p6ti6d85yf7q','Beta_Surface','#EB5F5F','#000000','#000000','#EB5F5F','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('2mbft9rzjxflby1w','r8tgsns20ruwx0bg','Hair','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('vga26dqzrdmu05q6','r8tgsns20ruwx0bg','Eyelashes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('xnjwcxxfcsva4kcc','r8tgsns20ruwx0bg','Shoes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('d1rtqn7rmyhcenky','r8tgsns20ruwx0bg','Tops','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('i26nosqecbdflfbt','r8tgsns20ruwx0bg','Body','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('lq9c84ora5mqzei5','r8tgsns20ruwx0bg','Eyes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('rvz45hxmna26uhtg','r8tgsns20ruwx0bg','Bottoms','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('16t9ay39xyu7x6u4','v1ij2rkmdypo97c2','Eyes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('41e6r3eftk9bmzq9','v1ij2rkmdypo97c2','Eyelashes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('alrjnt7sat4cvx1c','v1ij2rkmdypo97c2','Shoes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('cxsfyd6lqjfatjsb','v1ij2rkmdypo97c2','Tops','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('dfnl46bdj5o8r0gq','v1ij2rkmdypo97c2','Body','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('go4qcewxqkzep92r','v1ij2rkmdypo97c2','Hair','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

				('o28c083kl7r39w8c','v1ij2rkmdypo97c2','Bottoms','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");

			$wtwdb->query("
				INSERT INTO `".wtw_tableprefix."avataranimations` VALUES 
				
				('0gaz1cjnohb72qh8','','','',4,'onoption','Leaning Look Gesture','0','','/content/system/animations/gestures/','leaninglookgesture.babylon',1,193,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('0ikarv3xbs0n7544','','','',49,'onwalkbackwards','Default Male','1','','/content/system/avatars/male/','malewalkback.babylon',1,29,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('0m07zbocsuwwuj6b','','','',48,'onturnright','Happy Turn Right','0','','/content/system/animations/movement/','happyturnright.babylon',1,36,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('0sv3rkk659wmilhl','','','',48,'onturnright','Cat Walk Right','0','','/content/system/animations/movement/','catwalkright.babylon',1,29,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('0wfg0nafbajsdg6h','','','',40,'onrun','Running Scared','0','','/content/system/animations/movement/','runningscared.babylon',1,27,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('100zwiuq5i2v40oc','','','',4,'onoption','You Are Out','0','/content/system/icons/animyouareout.png','/content/system/animations/gestures/','youareout.babylon',1,87,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('1be5j7fkk51ph9wp','','','',50,'onwalk','Strut Walk','0','','/content/system/animations/movement/','strutwalk.babylon',1,35,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('1ls8ugqbf7q0vawn','','','',4,'onoption','Pointing Up Gesture','0','','/content/system/animations/gestures/','pointingupgesture.babylon',1,45,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('1n6x2mwmgdjld27t','','','',3,'onoption','Slide Hip Hop','0','','/content/system/animations/movement/','slidehiphop.babylon',1,416,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('1ssmqrmtayyxt7mi','','','',4,'onoption','Counting Gesture','0','/content/system/icons/animcounting.png','/content/system/animations/gestures/','countinggesture.babylon',1,160,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('1wfesp5owhoxl9gj','','','',50,'onwalk','Default Female','0','','/content/system/avatars/female/','femalewalk.babylon',1,25,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('226p0vd951objpwd','','','',4,'onoption','Relieved Sigh Gesture','0','','/content/system/animations/gestures/','relievedsighgesture.babylon',1,73,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','2019-06-08 12:56:53','".$zuserid."',NULL,'',0),
				
				('294skjy73v4xambn','','','',4,'onoption','Yes Gesture','0','','/content/system/animations/gestures/','yesgesture.babylon',1,63,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('2eqg47npjmhj9qu0','','','',3,'onoption','Big Tut Hip Hop Dance','0','','/content/system/animations/movement/','bigtuthiphopdance.babylon',1,291,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('2kopg7lfdjk7awnj','','','',3,'onoption','Salsa Dancing','0','','/content/system/animations/movement/','salsadancing.babylon',1,288,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('2pdqkmd13bbpheh8','','','',5,'onoption','Injured Wave','0','/content/system/icons/animinjuredwave.png','/content/system/animations/gestures/','injuredwave.babylon',1,122,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('36i2rmud99jwxywp','','','',4,'onoption','Defeated Gesture','0','/content/system/icons/animdefeated.png','/content/system/animations/gestures/','defeatgesture.babylon',1,176,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('3b9d2a8bveclwqxh','','','',4,'onoption','Point Forward Gesture','0','','/content/system/animations/gestures/','pointforwardgesture.babylon',1,113,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('3nz15p12a61m084v','','','',4,'onoption','Dismissing Light Gesture','0','','/content/system/animations/gestures/','smalldismissinggesture.babylon',1,54,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('3nz17wvpvat9s4cc','','','',3,'onoption','Northern Soul Spin','0','','/content/system/animations/movement/','northernsoulspin.babylon',1,98,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('3p81hb6w0bjp0vb0','','','',4,'onoption','Shucks Gesture','0','','/content/system/animations/gestures/','shucksdisappointedgesture.babylon',1,101,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('45dg48tccn60jnna','','dihtmpm1ae3b9d3a','',100,'onwait','Mild Male Movement','0','','/content/system/avatars/malcolm/','malcolmidle.babylon',1,195,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2),
				('45dh9tcbikbvhqa9','','','',38,'onrunturnleft','Default','1','','/content/system/avatars/male/','maleturnleft.babylon',1,29,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('46kczxmcwhp14ftt','','','',49,'onwalkbackwards','Looking Back','0','','/content/system/animations/movement/','lookingback.babylon',1,37,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('52yl1g7mggx8c3h1','','','',3,'onoption','Quick Wave Hip Hop','0','','/content/system/animations/movement/','quickwavehiphopdance.babylon',1,29,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('57k7c3h6c8630tyd','','','',5,'onoption','Waving Gesture','0','/content/system/icons/animwavinggesture.png','/content/system/animations/gestures/','wavinggesture.babylon',1,36,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('5c850obkwugsi9pu','','','',48,'onturnleft','Happy Turn Left','0','','/content/system/animations/movement/','happyturnleft.babylon',1,36,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('5fo4lk4vzaip0ypq','','','',4,'onoption','Reacting Gesture','0','','/content/system/animations/gestures/','reactinggesture.babylon',1,89,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('5h1peyir8wr38ws8','','','',48,'onturnright','Female Turn Right','0','','/content/system/animations/movement/','femaleturnright.babylon',1,29,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('5mqtw1g5gtoyt47m','','','',4,'onoption','No Gesture','0','','/content/system/animations/gestures/','nogesture.babylon',1,44,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('5nt31zrtvvq4cdu3','','h1ro3h59xs5eknl0','',100,'onwait','Swaying Female','0','','/content/system/avatars/shae/','shaeidle.babylon',1,303,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2),
				
				('658miot2v41u2v4z','','','',4,'onoption','Thank You Gesture','0','','/content/system/animations/gestures/','thankyougesture.babylon',1,73,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('6b02dlxs7orqetut','','','',4,'onoption','Let Down Gesture','0','','/content/system/animations/gestures/','letdowngesture.babylon',1,54,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('6i1o866dabru0f4d','','','',4,'onoption','Shake Head Gesture','0','','/content/system/animations/gestures/','shakeheadgesture.babylon',1,74,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('6kcyrxfa73xd115n','','','',4,'onoption','Surprised Gesture','0','','/content/system/animations/gestures/','surprisedgesture.babylon',1,97,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('6moihybqo6x0cm4q','','','',3,'onoption','House Dancing','0','','/content/system/animations/movement/','housedancing.babylon',1,629,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('6x3o6sh2u1m1bjnq','','','',47,'onstraferight','Default','1','','/content/system/avatars/male/','malestraferight.babylon',1,45,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('755b2ernys6grg0n','','','',3,'onoption','Shuffling Dance','0','','/content/system/animations/movement/','shufflingdance.babylon',1,181,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('78k4zhhzhemwlcvc','','9e94useo7x2ief0s','',100,'onwait','Swaying Male','0','','/content/system/avatars/liam/','liamidle.babylon',1,200,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2),
				
				('7bxqw8ivvpxisgw2','','','',40,'onrun','Medium Run','0','','/content/system/animations/movement/','mediumrun.babylon',1,14,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('7kbub1a8d5nt3zqo','','','',4,'onoption','Pointing Gesture','0','','/content/system/animations/gestures/','pointinggesture.babylon',1,48,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('7q0whoxmdypm1doc','','','',40,'onrun','Tired Run','0','','/content/system/animations/movement/','tiredrun.babylon',1,18,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('7vr8tdhb5tlira5w','','','',3,'onoption','Robot Hip Hop','0','','/content/system/animations/movement/','robothiphopdance.babylon',1,371,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('81g5fo2bcu7ivthz','','','',4,'onoption','Angry Gesture','0','/content/system/icons/animangry.png','/content/system/animations/gestures/','angrygesture.babylon',1,461,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('83trbcrqfzkvnphe','','','',4,'onoption','Talking Gesture','0','','/content/system/animations/gestures/','talkinggesture.babylon',1,95,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('850lxwpsw51objq0','','','',4,'onoption','Whatever Gesture','0','','/content/system/animations/gestures/','whatevergesture.babylon',1,35,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('8hnu9s5deu3v545f','','','',4,'onoption','Look Away Gesture','0','','/content/system/animations/gestures/','lookawaygesture.babylon',1,57,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('8s5hvy5vx1dqlpu0','','','',100,'onwait','Look Around Idle','0','','/content/system/animations/movement/','lookaroundidle.babylon',1,97,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2),
				
				('8y1cl06y5ycu46hx','','','',4,'onoption','Yawn Gesture','0','','/content/system/animations/gestures/','yawngesture.babylon',1,201,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('91g7nl087d7vr8tf','','','',40,'onrun','Zombie Run','0','','/content/system/animations/movement/','zombierun.babylon',1,20,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('93p82o6si45c9cu9','','','',48,'onturnleft','Sad Turn Left','0','','/content/system/animations/movement/','sadturnleft.babylon',1,29,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('94slne4emxqwd3dj','','','',40,'onrun','Happy Run','0','','/content/system/animations/movement/','happyrun.babylon',1,22,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('94tsgw50n9bu6grd','','','',4,'onoption','Happy Gesture','0','','/content/system/animations/gestures/','happygesture.babylon',1,241,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('950lwr5gtnwj0f23','','','',4,'onoption','Shake It Off Gesture','0','','/content/system/animations/gestures/','shakeitoffgesture.babylon',1,141,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('9apn4p6ra3p6sfrk','','','',3,'onoption','Simple Hip Hop','0','','/content/system/animations/movement/','simplehiphop.babylon',1,369,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('9qwarzjulfen1bf6','','','',4,'onoption','Loser Gesture','0','','/content/system/animations/gestures/','losergesture.babylon',1,79,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('9tb3i9ufmt6gp94v','','','',4,'onoption','Tell Secret Gesture','0','','/content/system/animations/gestures/','tellsecretgesture.babylon',1,263,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('9uhtmngb5uthyd0y','','','',4,'onoption','Head Gesture','0','','/content/system/animations/gestures/','headgesture.babylon',1,68,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('9xworrh44cbkwq1y','','','',48,'onturnleft','Default Turn Left','1','','/content/system/avatars/male/','maleturnleft.babylon',1,29,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('a2i9vj3tsjata05q','','','',40,'onrun','Goofy Run','0','','/content/system/animations/movement/','goofyrun.babylon',1,16,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('ae3dhb4qa61pev6b','','','',3,'onoption','Big Swing Dance','0','','/content/system/animations/movement/','bigswingdance.babylon',1,560,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('ahkbxolyywmgcf21','','','',100,'onwait','Sad Idle','0','','/content/system/animations/movement/','sadidle.babylon',1,65,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2),
				
				('aryiq3b9d4i7iwz6','','','',49,'onwalkbackwards','Default Female','0','','/content/system/avatars/female/','femalewalkback.babylon',1,30,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('b03ftsjbxr0sxam8','','','',50,'onwalk','Default Male','1','','/content/system/avatars/male/','malewalk.babylon',1,26,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('bf8ui0jnm5x76b3g','','','',4,'onoption','Shake Fist Gesture','0','','/content/system/animations/gestures/','shakefistgesture.babylon',1,59,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('byudabpm1a9jwxvm','','','',49,'onwalkbackwards','Slow Jog Backwards','0','','/content/system/animations/movement/','slowjogback.babylon',1,18,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('cafb89mbrso015nt','','','',48,'onturnleft','Dizzy Turn Left','0','','/content/system/animations/movement/','dizzyturnleft.babylon',1,41,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('cjosv2o5rchcbinq','','','',3,'onoption','Macarena Dance','0','','/content/system/animations/movement/','macarenadance.babylon',1,198,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('crriawom5w1g8r4d','','','',50,'onwalk','Limp Walk','0','','/content/system/animations/movement/','limpwalk.babylon',1,40,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('dbimisccqkophb2g','','','',49,'onwalkbackwards','Moon Walk','0','','/content/system/animations/movement/','moonwalk.babylon',1,25,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('detuvuk9l9jvpzrw','','','',4,'onoption','Pouting Gesture','0','','/content/system/animations/gestures/','poutinggesture.babylon',1,72,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('dkorsmpqjhvti2v4','','','',4,'onoption','Greeting Wave Gesture','0','','/content/system/animations/gestures/','greetingwavegesture.babylon',1,123,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('dn4p2bcsw4yf8uka','','','',4,'onoption','Dismissing Gesture','0','/content/system/icons/animdismiss.png','/content/system/animations/gestures/','dismissinggesture.babylon',1,79,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('dv7gmrzn88jx3o3f','','','',4,'onoption','Arrogant Gesture','0','/content/system/icons/animarrogant.png','/content/system/animations/gestures/','arrogantgesture.babylon',1,71,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('dwd8y5vy4p5ovfh4','','','',4,'onoption','Agree Submit Gesture','0','/content/system/icons/animagreesubmit.png','/content/system/animations/gestures/','agreesubmitgesture.babylon',1,113,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('ebe10ys0rqettozu','','','',4,'onoption','Agitated Gesture','0','/content/system/icons/animagitated.png','/content/system/animations/gestures/','agitatedgesture.babylon',1,247,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('ebe124gw50l1binn','','','',50,'onwalk','Cat Walk','0','','/content/system/animations/movement/','catwalk.babylon',1,29,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('eckq10ypm06ur6ow','','','',4,'onoption','Looking Gesture','0','','/content/system/animations/gestures/','lookinggesture.babylon',1,117,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('f1webf4cdrsll9ff','','','',40,'onrun','Long Distance Run','0','','/content/system/animations/movement/','longdistancerun.babylon',1,18,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('f7r5i55dev56ddsu','','','',4,'onoption','Patting Gesture','0','','/content/system/animations/gestures/','pattinggesture.babylon',1,81,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('fmt7mipymal3qetx','','','',4,'onoption','Clapping Gesture','0','/content/system/icons/animclapping.png','/content/system/animations/gestures/','clappinggesture.babylon',1,29,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('gemyywk67fmrxd4f','','','',49,'onwalkbackwards','Happy Walk Backwards','0','','/content/system/animations/movement/','happywalkback.babylon',1,26,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('geo7z9d15mm8d3cg','','','',40,'onrun','Female Run','0','','/content/system/animations/movement/','femalerun.babylon',1,18,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('gfrjdbf5hx8fdm05','','','',4,'onoption','Happy Hand Gesture','0','','/content/system/animations/gestures/','happyhandgesture.babylon',1,71,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('gfso15ljwulgi6c9','','r8tgsns20ruwx0bg','',100,'onwait','Young Male','0','','/content/system/avatars/jasper/','jasperidle.babylon',1,201,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2),
				('gi7iwy1cobjpzqpf','','','',38,'onrunturnright','Default','1','','/content/system/avatars/male/','maleturnright.babylon',1,29,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('gozvhp6q7q4ccsuu','','','',48,'onturnright','Beast Turn Right','0','','/content/system/animations/movement/','beastturnright.babylon',1,26,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('gp5ll76c5rb9gfuv','','','',100,'onwait','Dizzy Idle','0','','/content/system/animations/movement/','dizzyidle.babylon',1,103,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2),
				
				('gyf7q390af9z5use','','','',50,'onwalk','Sad Walk','0','','/content/system/animations/movement/','sadwalk.babylon',1,36,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('h6flqwaqsrfv2o72','','','',4,'onoption','Taunt Gesture','0','','/content/system/animations/gestures/','tauntgesture.babylon',1,94,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('h8qzncruvvot2v7d','','','',4,'onoption','Look Back Gesture','0','','/content/system/animations/gestures/','lookbackgesture.babylon',1,98,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('hb6x2mvj1ltaz3h4','','','',4,'onoption','Neck Stretch Gesture','0','','/content/system/animations/gestures/','neckstretchgesture.babylon',1,77,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('hur9z71kpv6b2bgb','','','',47,'onstrafeleft','Default','1','','/content/system/avatars/male/','malestrafeleft.babylon',1,45,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('hzimk09d0zvdbf9y','','','',50,'onwalk','Sneaky Walk','0','','/content/system/animations/movement/','sneakywalk.babylon',1,42,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('ifjedo87c15nvc6t','','','',4,'onoption','Yelling Out Gesture','0','','/content/system/animations/gestures/','yellingoutgesture.babylon',1,104,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('ifnwj1lugo3dlteh','','','',100,'onwait','Ready Idle','0','','/content/system/animations/movement/','readyidle.babylon',1,48,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2),
				
				('igskfi7iwz740n8a','','','',4,'onoption','Formal Bow Gesture','0','/content/system/icons/animformalbow.png','/content/system/animations/gestures/','formalbowgesture.babylon',1,67,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('ix5ybplteh6j2so3','','','',4,'onoption','Back Pain Gesture','0','/content/system/icons/animbackpain.png','/content/system/animations/gestures/','paingesture.babylon',1,43,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('j7fkiupzvc5nwhse','','','',3,'onoption','Snake Hip Hop','0','','/content/system/animations/movement/','snakehiphop.babylon',1,367,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('jd979om4o16sdknm','','','',3,'onoption','Big Samba Dance','0','','/content/system/animations/movement/','bigsambadance.babylon',1,437,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('jnodt1pg3392g47q','','','',4,'onoption','Bashful Gesture','0','/content/system/icons/animbashful.png','/content/system/animations/gestures/','bashfulgesture.babylon',1,265,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('josx8d6rbcoezoih','','','',3,'onoption','Chicken Dance','0','','/content/system/animations/movement/','chickendance.babylon',1,115,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('js8voqp85yd0xmal','','','',3,'onoption','Northern Soul Floor Spin','0','','/content/system/animations/movement/','northernsoulfloorspin.babylon',1,180,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('jvosyd128xxwpwaq','','','',4,'onoption','Praying Gesture','0','','/content/system/animations/gestures/','prayinggesture.babylon',1,78,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('jx1drn2a9hnu7j0h','','','',48,'onturnright','Dizzy Turn Right','0','','/content/system/animations/movement/','dizzyturnright.babylon',1,41,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('jx1g35i1pexfbcrr','','','',4,'onoption','Sarcastic Nod Gesture','0','','/content/system/animations/gestures/','sarcasticnod.babylon',1,57,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('jy5w3rh45dexe7th','','','',3,'onoption','Full Swing Dancing','0','','/content/system/animations/movement/','fullswingdancing.babylon',1,594,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('k4uw1exfcf5gvzag','','','',50,'onwalk','Leisure Walk','0','','/content/system/animations/movement/','leisurewalk.babylon',1,34,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('kgi8nkui3yf92ifl','','','',49,'onwalkbackwards','Crouch Backwards','0','','/content/system/animations/movement/','crouchbackwards.babylon',1,94,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('l09bsyd394qernys','','','',4,'onoption','Informal Bow Gesture','0','','/content/system/animations/gestures/','informalbowgesture.babylon',1,67,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('lip3bcqn2fu0kpwf','','','',4,'onoption','Explaining Gesture','0','/content/system/icons/animexplaining.png','/content/system/animations/gestures/','explaininggesture.babylon',1,91,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('liq5jbvgnvgnuaxs','','','',4,'onoption','Arm Gesture','0','/content/system/icons/animarmgesture.png','/content/system/animations/gestures/','armgesture.babylon',1,83,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('lui1oae38z4q8z89','','','',4,'onoption','Shoulder Rub Gesture','0','','/content/system/animations/gestures/','shoulderrubgesture.babylon',1,141,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('ly05p4gzjqzt2v56','','','',100,'onwait','Happy Idle','0','','/content/system/animations/movement/','happyidle.babylon',1,71,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2),
				
				('m084uy5y9ip27sel','','','',50,'onwalk','Beast Walk','0','','/content/system/animations/movement/','beastwalk.babylon',1,35,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('mbpjld4fttowgnt6','','','',48,'onturnright','Default Turn Right','1','','/content/system/avatars/male/','maleturnright.babylon',1,29,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('me3cezrsqa768mhk','','','',49,'onwalkbackwards','Limp Backwards','0','','/content/system/animations/movement/','limpwalkback.babylon',1,41,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('mjwscdstrdii0hde','','','',4,'onoption','Rejected Gesture','0','','/content/system/animations/gestures/','rejectedgesture.babylon',1,116,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('mnct0obkwsa3lppd','','','',4,'onoption','Knockout Count Gesture','0','','/content/system/animations/gestures/','knockoutcountgesture.babylon',1,335,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('mne0wirdkpstrbbo','','','',4,'onoption','Head Turn Gesture','0','','/content/system/animations/gestures/','headturngesture.babylon',1,61,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('myvgp6sen2bgdeyj','','','',50,'onwalk','Happy Walk','0','','/content/system/animations/movement/','happywalk.babylon',1,27,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('mywoocpjiyal4tp1','','','',4,'onoption','Angry Point Gesture','0','/content/system/icons/animangrypoint.png','/content/system/animations/gestures/','angrypointgesture.babylon',1,78,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('mz182mwpsvx1f1va','','','',40,'onrun','Default','1','','/content/system/avatars/male/','malerun.babylon',1,16,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('n3g324bafcdwc17u','','','',3,'onoption','Northern Soul Dance','0','','/content/system/animations/movement/','northernsouldance.babylon',1,387,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('n3i9s7ophcae5h1r','','v1ij2rkmdypo97c2','',100,'onwait','Casual Female','0','','/content/system/avatars/stefani/','stefaniidle.babylon',1,299,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2),
				
				('n4ms0oe0sye3cg8q','','','',40,'onrun','Beast Run','0','','/content/system/animations/movement/','beastrun.babylon',1,22,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('nf5gtq80dtzgdg8q','','','',4,'onoption','Excited Gesture','0','/content/system/icons/animexcited.png','/content/system/animations/gestures/','excitedgesture.babylon',1,158,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('nkwr491exe8wukbw','','','',50,'onwalk','Dizzy Walk','0','','/content/system/animations/movement/','dizzywalk.babylon',1,51,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('nkxwr238y0978ngc','','','',40,'onrun','Jogging','0','','/content/system/animations/movement/','jogging.babylon',1,21,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('nneyndv8j1myzywn','','','',3,'onoption','Northern Soul Combo','0','','/content/system/animations/movement/','northernsoulcombo.babylon',1,255,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('nzyvhskedm1acu7j','','','',5,'onoption','Simple Wave','0','/content/system/icons/animsimplewave.png','/content/system/animations/gestures/','simplewave.babylon',1,115,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('o3h47opkqwat7mge','','odtx7arzof5eigp4','',100,'onwait','Mild Female Movement','0','','/content/system/avatars/regina/','reginaidle.babylon',1,241,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2),
				
				('o4kgmoik9nf8ws7p','','aajvq38y06vulgh0','',100,'onwait','Young Female','0','','/content/system/avatars/pearl/','pearlidle.babylon',1,325,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2),
				
				('o4ll77gmryhi6b3i','','','',4,'onoption','Weight Shift Gesture','0','','/content/system/animations/gestures/','weightshiftgesture.babylon',1,48,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('o5ns0qlqxgh3xgfu','','','',3,'onoption','Big House Dancing','0','','/content/system/animations/movement/','bighousedancing.babylon',1,476,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('odrpbe0xjzagi3xe','','','',40,'onrun','Treadmill Run','0','','/content/system/animations/movement/','treadmillrun.babylon',1,189,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('ohb6x5ze1112a9e6','','p7y3p6ti6d85yf7q','',100,'onwait','Default Female','0','','/content/system/avatars/female/','femaleidle.babylon',1,100,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2),
				
				('ovat8qwe81g48vnm','','','',3,'onoption','Samba Dancing','0','','/content/system/animations/movement/','sambadancing.babylon',1,476,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('owgiaxpqlqv6c4kj','','','',48,'onturnleft','Beast Turn Left','0','','/content/system/animations/movement/','beastturnleft.babylon',1,26,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('p5nqsnzwk4yf7sdi','','','',4,'onoption','Hands Forward Gesture','0','','/content/system/animations/gestures/','handsforwardgesture.babylon',1,75,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('pae24fsnud98fdks','','','',3,'onoption','Swim Dancing','0','','/content/system/animations/movement/','swimdancing.babylon',1,195,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('phb3iaxqwbvfjfh7','','','',4,'onoption','Major Thumbs Up','0','','/content/system/animations/gestures/','majorthumbsup.babylon',1,101,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('pjizf4enzxs35gsm','','','',3,'onoption','Quick Dance','0','','/content/system/animations/movement/','quickdance.babylon',1,177,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('pjnkwsa3jeg338tf','','','',3,'onoption','Arms Hip Hop Dance','0','','/content/system/animations/movement/','armshiphopdance.babylon',1,528,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('pqidae38xws7osux','','','',4,'onoption','Crazy Gesture','0','/content/system/icons/animcrazy.png','/content/system/animations/gestures/','crazygesture.babylon',1,121,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('pv9mcxisgxam79mc','','','',4,'onoption','Smoking Gesture','0','','/content/system/animations/gestures/','smokinggesture.babylon',1,431,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('pvaqtybndu45a3ki','','','',5,'onoption','Over Here Wave','0','/content/system/icons/animoverhere.png','/content/system/animations/gestures/','overherewave.babylon',1,77,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('qn1a8e94to0zveet','','','',4,'onoption','Crying Gesture','0','/content/system/icons/animcrying.png','/content/system/animations/gestures/','cryinggesture.babylon',1,151,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('r6j56eh8r36kat8o','','','',4,'onoption','Using Tablet Gesture','0','','/content/system/animations/gestures/','usingtabletgesture.babylon',1,796,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('r9087b004i9ptv0e','','3b9bt5c70igtmqux','',100,'onwait','Default Male','1','','/content/system/avatars/male/','maleidle.babylon',1,213,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2),
				
				('rlmct57mgemyxr22','','','',48,'onturnleft','Female Turn Left','0','','/content/system/animations/movement/','femaleturnleft.babylon',1,29,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('rqckr4dh9ui1n4o1','','','',3,'onoption','Cupboard House Dance','0','','/content/system/animations/movement/','refhousedance.babylon',1,513,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('rzn9d3dihtq4h2v5','','','',39,'onrunbackwards','Default','1','','/content/system/avatars/male/','malewalkback.babylon',1,29,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('s0qludcktfn16ra7','','','',3,'onoption','Quick Swing Dance','0','','/content/system/animations/movement/','quickswingdance.babylon',1,60,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('s1wbxqtx4w2n3g1v','','','',4,'onoption','Angry Fists Gesture','0','/content/system/icons/animangrysmall.png','/content/system/animations/gestures/','angrysmallgesture.babylon',1,79,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('s34ekmhkea8bwiwx','','','',4,'onoption','Yelling Gesture','0','','/content/system/animations/gestures/','yellinggesture.babylon',1,189,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('sekqwbwk3so17vpw','','','',50,'onwalk','Lady Walk','0','','/content/system/animations/movement/','ladywalk.babylon',1,29,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('sftqa61oagdg8q22','','','',4,'onoption','Arm Stretching Gesture','0','/content/system/icons/animarmstretch.png','/content/system/animations/gestures/','armstretchinggesture.babylon',1,214,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('sutmnct0n71lugsk','','','',4,'onoption','Phone Talk Gesture','0','','/content/system/animations/gestures/','phonetalkgesture.babylon',1,116,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('sye7thx78iwz73sq','','','',4,'onoption','Raise Hand Gesture','0','','/content/system/animations/gestures/','raisehandgesture.babylon',1,98,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('t0ks8vnm4sjb16sd','','','',4,'onoption','No No No Gesture','0','','/content/system/animations/gestures/','nononogesture.babylon',1,121,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('t8psw52wcxl9juor','','','',40,'onrun','Casual Run','0','','/content/system/animations/movement/','casualrun.babylon',1,18,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('t9xs5gtq7uj9mcu8','','','',50,'onwalk','Fast-Pace Walk','0','','/content/system/animations/movement/','fastpacewalk.babylon',1,22,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('tj69t9teic5sgygb','','','',100,'onwait','Warrior Idle','0','','/content/system/animations/movement/','warrioridle.babylon',1,276,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2),
				
				('tvy4tq8z6zbm73xe','','','',3,'onoption','Hip Hop Dance','0','','/content/system/animations/movement/','hiphopdance.babylon',1,415,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('u42zqn2essi6efyg','','','',50,'onwalk','Swagger Walk','0','','/content/system/animations/movement/','swaggerwalk.babylon',1,68,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('u7iy62u1m1bga2g6','','','',4,'onoption','Victory Gesture','0','','/content/system/animations/gestures/','victorygesture.babylon',1,206,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('uld4gzjr5hx8e93p','','','',4,'onoption','Thinking Gesture','0','','/content/system/animations/gestures/','thinkinggesture.babylon',1,103,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('v2qev531xk2n04mr','','','',40,'onrun','Focused Run','0','','/content/system/animations/movement/','focusedrun.babylon',1,16,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('vix5x656ejgnxprn','','','',4,'onoption','Fist Pump Gesture','0','/content/system/icons/animfistpump.png','/content/system/animations/gestures/','fistpumpgesture.babylon',1,92,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('vld4frlngcbjr7s8','','','',48,'onturnleft','Casual Turn Left','0','','/content/system/animations/movement/','casualturnleft.babylon',1,25,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('w547k8hrbbn89k4v','','','',37,'onrunstraferight','Default','1','','/content/system/avatars/male/','malestraferight.babylon',1,45,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('w66c83qh7izct0n8','','','',40,'onrun','Long Stride Run','0','','/content/system/animations/movement/','longstriderun.babylon',1,18,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('w8gjfi9t9tb4p5mp','','','',4,'onoption','Looking Down Gesture','0','','/content/system/animations/gestures/','lookingdowngesture.babylon',1,115,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('w9jy5ur91g34b869','','','',4,'onoption','Petting Gesture','0','','/content/system/animations/gestures/','pettinggesture.babylon',1,135,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('wc004i6dcn4rdn2g','','641svy8bwjx2kme7','',100,'onwait','Casual Male','0','','/content/system/avatars/remy/','remyidle.babylon',1,196,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2),
				
				('wglmdxkz9bt6gsi5','','','',4,'onoption','Acknowledge Gesture','0','/content/system/icons/animacknowledge.png','/content/system/animations/gestures/','acknowledgegesture.babylon',1,47,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('wr5gush0oahh0m3j','','','',48,'onturnright','Casual Turn Right','0','','/content/system/animations/movement/','casualturnright.babylon',1,25,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('x2jj1myxr0u4335i','','','',5,'onoption','Fast Wave','0','/content/system/icons/animfastwave.png','/content/system/animations/gestures/','fastwave.babylon',1,14,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('x3n02bct3yipypn3','','','',3,'onoption','Belly Dance','0','','/content/system/animations/movement/','bellydance.babylon',1,472,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('x50ktfmwlapo879p','','','',3,'onoption','Gangnam Style Dance','0','','/content/system/animations/movement/','gangnamstyledance.babylon',1,297,1,1.00,'','',100.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('x50m1cn60hb850pg','','','',4,'onoption','Muscle Flex Gesture','0','','/content/system/animations/gestures/','muscleflexgesture.babylon',1,113,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				('xd3eqg21webe0wff','','','',37,'onrunstrafeleft','Default','1','','/content/system/avatars/male/','malestrafeleft.babylon',1,45,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('xjx0cl084w78njq0','','','',4,'onoption','Strong Gesture','0','','/content/system/animations/gestures/','stronggesture.babylon',1,47,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('xpqkmgdg7mkxyywm','','','',40,'onrun','Fast Run','0','','/content/system/animations/movement/','fastrun.babylon',1,13,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('xqv42zrric7x3nzy','','','',4,'onoption','Thoughtful Nod Gesture','0','','/content/system/animations/gestures/','thoughtfulheadnodgesture.babylon',1,71,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('y7546hx62w7d82lr','','','',48,'onturnleft','Cat Walk Left','0','','/content/system/animations/movement/','catwalkleft.babylon',1,29,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('ycrv2pckvnnbncoe','','','',40,'onrun','Easy Run','0','','/content/system/animations/movement/','easyrun.babylon',1,21,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('yfbcqmywlapm197b','','','',40,'onrun','Drunk Run','0','','/content/system/animations/movement/','drunkrun.babylon',1,45,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('yjsekoodu42xisfp','','','',4,'onoption','Salute Gesture','0','','/content/system/animations/gestures/','salutegesture.babylon',1,69,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('z17vscbkwr6ml4tr','','','',48,'onturnright','Sad Turn Right','0','','/content/system/animations/movement/','sadturnright.babylon',1,29,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('z2ev4yiljunof38w','','','',4,'onoption','Agony Gesture','0','/content/system/icons/animagony.png','/content/system/animations/gestures/','agonygesture.babylon',1,90,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('zkwtccm2jgp4gyf8','','','',4,'onoption','Charge Gesture','0','/content/system/icons/animcharge.png','/content/system/animations/gestures/','chargegesture.babylon',1,138,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('zof6lea9ggxandvb','','','',4,'onoption','Agreeing Gesture','0','/content/system/icons/animagreeing.png','/content/system/animations/gestures/','agreeinggesture.babylon',1,45,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('zpkqzqn4lom2g48s','','','',40,'onrun','Slow Run','0','','/content/system/animations/movement/','slowrun.babylon',1,18,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('zubywnjr6mm8bu9u','','','',49,'onwalkbackwards','Sad Walk Backwards','0','','/content/system/animations/movement/','sadwalkback.babylon',1,30,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('zyt8s5elr1xhp26o','','','',4,'onoption','Annoyed Head Shake Gesture','0','/content/system/icons/animannoyedheadshake.png','/content/system/animations/gestures/','annoyedheadshakegesture.babylon',1,62,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");
			$wtwdb->query("
				INSERT INTO `".wtw_tableprefix."menuitems` VALUES 
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
				(14,'wtw_menuhomeicon','Home','main','left',-995,1,'','/content/system/images/menuhome32.png','navigate','/',3,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");
			$wtwdb->query("
				INSERT INTO `".wtw_tableprefix."roles` VALUES 
					('".$wtwdb->getRandomString(16,1)."','Admin','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'','0'),
					('".$wtwdb->getRandomString(16,1)."','Architect','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'','0'),
					('".$wtwdb->getRandomString(16,1)."','Graphics Artist','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'','0'),
					('".$wtwdb->getRandomString(16,1)."','Developer','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'','0'),
					('".$wtwdb->getRandomString(16,1)."','Subscriber','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'','0'),
					('".$wtwdb->getRandomString(16,1)."','Host','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'','0'),
					('".$wtwdb->getRandomString(16,1)."','Guest','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'','0');
			");
			$wtwdb->query("
				INSERT INTO `".wtw_tableprefix."uploadobjects` VALUES 
				('2lom1fyjsdf1wgkf','','".$zuserid."','/content/system/babylon/doorblinds/','doorblinds.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('3tur7r9z6y63w9k0','','".$zuserid."','/content/system/babylon/basket/','basket.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('c180du548ugrh59t','','".$zuserid."','/content/system/babylon/keyboard/','keyboard.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('hvvtgsnvfh5az2fy','','".$zuserid."','/content/system/babylon/desk/','desk.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('n2bhejhur8vpwc3d','','".$zuserid."','/content/system/babylon/computer/','computer.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('p6q4guuq6nqqfxd5','','".$zuserid."','/content/system/babylon/windowblinds/','windowblinds.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
				
				('v2n5p6owiwvnpkor','','".$zuserid."','/content/system/babylon/palmtree-highdef/','palmtree-highdef.babylon',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
			");
			$wtwdb->query("
				INSERT INTO `".wtw_tableprefix."uploadobjectanimations` VALUES 
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
			$wtwdb->query("
				INSERT INTO `".wtw_tableprefix."uploads` VALUES 
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
				INSERT INTO `".wtw_tableprefix."uploads` VALUES 
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
				INSERT INTO `".wtw_tableprefix."uploads` VALUES 
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
				INSERT INTO `".wtw_tableprefix."uploads` VALUES 
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

			/* updated v3.3.0 - add new avatars - if you do not wish to use them, set deleted=0. (if you try to full delete them, it will readd them) */
			/* updated v3.3.1 - added start and end frame for idle animation included with avatar file - to avatars and user avatars tables */
			/* updated v3.3.1 - rescaled Pearl and Jasper avatars to little larger to match the other avatars scale */
			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avatars where avatarid='3b9bt5c70igtmqux';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avatars VALUES ('3b9bt5c70igtmqux','Anonymous','Anonymous Male','/content/system/avatars/male/','maleidle.babylon','male',0.0800,0.0800,0.0800,1, 213,'malefull.png','maleface.png',2,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avatars set startframe=1, endframe=213, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='3b9bt5c70igtmqux';");
			}
			$wtwdb->query("update ".wtw_tableprefix."useravatars set startframe=1, endframe=213, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='3b9bt5c70igtmqux';");
			
			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avatars where avatarid='641svy8bwjx2kme7';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avatars VALUES ('641svy8bwjx2kme7','Default','Remy','/content/system/avatars/remy/','remyidle.babylon','male',0.0400,0.0400,0.0400,1,196,'remyfull.png','remyface.png',4,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avatars set startframe=1, endframe=196, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='641svy8bwjx2kme7';");
			}
			$wtwdb->query("update ".wtw_tableprefix."useravatars set startframe=1, endframe=196, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='641svy8bwjx2kme7';");
			
			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avatars where avatarid='9e94useo7x2ief0s';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avatars VALUES ('9e94useo7x2ief0s','Default','Liam','/content/system/avatars/liam/','liamidle.babylon','male',0.0400,0.0400,0.0400,1,200,'liamfull.png','liamface.png',4,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avatars set startframe=1, endframe=200, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='9e94useo7x2ief0s';");
			}
			$wtwdb->query("update ".wtw_tableprefix."useravatars set startframe=1, endframe=200, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='9e94useo7x2ief0s';");
			
			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avatars where avatarid='aajvq38y06vulgh0';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avatars VALUES ('aajvq38y06vulgh0','Default','Pearl','/content/system/avatars/pearl/','pearlidle.babylon','female',0.0700,0.0700,0.0700,1,325,'pearlfull.png','pearlface.png',3,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avatars set startframe=1, endframe=325, scalingx=.09, scalingy=.09, scalingz=.09, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='aajvq38y06vulgh0';");
			}
			$wtwdb->query("update ".wtw_tableprefix."useravatars set startframe=1, endframe=325, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='aajvq38y06vulgh0';");
			$wtwdb->query("update ".wtw_tableprefix."useravatars set scalingx=.09, scalingy=.09, scalingz=.09, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='aajvq38y06vulgh0' and scalingx=.07;");

			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avatars where avatarid='dihtmpm1ae3b9d3a';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avatars VALUES ('dihtmpm1ae3b9d3a','Default','Malcolm','/content/system/avatars/malcolm/','malcolmidle.babylon','male',0.0400,0.0400,0.0400,1,195,'malcolmfull.png','malcolmface.png',4,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avatars set startframe=1, endframe=195, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='dihtmpm1ae3b9d3a';");
			}
			$wtwdb->query("update ".wtw_tableprefix."useravatars set startframe=1, endframe=195, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='dihtmpm1ae3b9d3a';");

			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avatars where avatarid='h1ro3h59xs5eknl0';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avatars VALUES ('h1ro3h59xs5eknl0','Default','Shae','/content/system/avatars/shae/','shaeidle.babylon','female',0.0400,0.0400,0.0400,1,303,'shaefull.png','shaeface.png',3,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avatars set startframe=1, endframe=303, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='h1ro3h59xs5eknl0';");
			}
			$wtwdb->query("update ".wtw_tableprefix."useravatars set startframe=1, endframe=303, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='h1ro3h59xs5eknl0';");

			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avatars where avatarid='odtx7arzof5eigp4';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avatars VALUES ('odtx7arzof5eigp4','Default','Regina','/content/system/avatars/regina/','reginaidle.babylon','female',0.0400,0.0400,0.0400,1,241,'reginafull.png','reginaface.png',3,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avatars set startframe=1, endframe=241, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='odtx7arzof5eigp4';");
			}
			$wtwdb->query("update ".wtw_tableprefix."useravatars set startframe=1, endframe=241, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='odtx7arzof5eigp4';");

			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avatars where avatarid='p7y3p6ti6d85yf7q';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avatars VALUES ('p7y3p6ti6d85yf7q','Anonymous','Anonymous Female','/content/system/avatars/female/','femaleidle.babylon','female',0.0800,0.0800,0.0800,1,100,'femalefull.png','femaleface.png',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avatars set startframe=1, endframe=100, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='p7y3p6ti6d85yf7q';");
			}
			$wtwdb->query("update ".wtw_tableprefix."useravatars set startframe=1, endframe=100, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='p7y3p6ti6d85yf7q';");

			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avatars where avatarid='r8tgsns20ruwx0bg';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avatars VALUES ('r8tgsns20ruwx0bg','Default','Jasper','/content/system/avatars/jasper/','jasperidle.babylon','male',0.0700,0.0700,0.0700,1,71,'jasperfull.png','jasperface.png',4,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avatars set startframe=1, endframe=71, scalingx=.09, scalingy=.09, scalingz=.09, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='r8tgsns20ruwx0bg';");
			}
			$wtwdb->query("update ".wtw_tableprefix."useravatars set startframe=1, endframe=71, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='r8tgsns20ruwx0bg';");
			$wtwdb->query("update ".wtw_tableprefix."useravatars set scalingx=.09, scalingy=.09, scalingz=.09, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='r8tgsns20ruwx0bg' and scalingx=.07;");

			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avatars where avatarid='v1ij2rkmdypo97c2';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avatars VALUES ('v1ij2rkmdypo97c2','Default','Stefani','/content/system/avatars/stefani/','stefaniidle.babylon','female',0.0400,0.0400,0.0400,1,363,'stefanifull.png','stefaniface.png',3,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avatars set startframe=1, endframe=363, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='v1ij2rkmdypo97c2';");
			}
			$wtwdb->query("update ".wtw_tableprefix."useravatars set startframe=1, endframe=363, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avatarid='v1ij2rkmdypo97c2';");

			/* updated v3.3.4 - populate new table as needed */
			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avatarcolors;");
			if (count($zresults) == 0) {
				$wtwdb->query("
					INSERT INTO `".wtw_tableprefix."avatarcolors` VALUES 
					('n7ggpnsdmvafn27q','3b9bt5c70igtmqux','Alpha_Joints','#47547F','#000000','#000000','#47547F','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('whq222ptqbcwhbpe','3b9bt5c70igtmqux','Alpha_Surface','#31A6FD','#000000','#000000','#31A6FD','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('2x1u3pmt6xwp12gk','641svy8bwjx2kme7','Bottoms','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('2ze2ozdpolqedzz4','641svy8bwjx2kme7','Tops','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('9xm4fbcy6y9jb13m','641svy8bwjx2kme7','Shoes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('bfd5zs7qydryrh3t','641svy8bwjx2kme7','Hair','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('g4h2vp1mtk6ofy2t','641svy8bwjx2kme7','Eyes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('pt96upqdo1ru1yny','641svy8bwjx2kme7','Body','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('wjd8qs4v98d5y4cx','641svy8bwjx2kme7','Eyelashes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('2ciipvngwn3wzreg','9e94useo7x2ief0s','Eyelashes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('5a26y5b3f6z72yuu','9e94useo7x2ief0s','Shoes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('gmr5gbvgibrwm60r','9e94useo7x2ief0s','Body','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('jv39gf5r987oihmu','9e94useo7x2ief0s','Bottoms','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('vbpzojwthsuzmx2i','9e94useo7x2ief0s','Tops','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('w62hm4xe4r3d7d2b','9e94useo7x2ief0s','Eyes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('39ue6qhus79oyuq2','aajvq38y06vulgh0','Tops','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('789zg2mbpirdaefz','aajvq38y06vulgh0','Hair','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('fkdfdshjsgnhiv91','aajvq38y06vulgh0','Shoes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('skhk514cfn6z6528','aajvq38y06vulgh0','Bottoms','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('t1fn2kip0t3ek6k3','aajvq38y06vulgh0','Eyes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('twvty9thzku85bzy','aajvq38y06vulgh0','Eyelashes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('f411l0wtsjd938b3','aajvq38y06vulgh0','Body','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('0z6w4naqcxya572c','dihtmpm1ae3b9d3a','Shoes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('8zrvrc0yv3njmyhh','dihtmpm1ae3b9d3a','Eyelashes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('dujy29stjr1d3fxx','dihtmpm1ae3b9d3a','Hats','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('o477h8qsjou40mv3','dihtmpm1ae3b9d3a','Eyes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('p80ygek28v4htplx','dihtmpm1ae3b9d3a','Hair','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('r8jk0vdiqt477w3q','dihtmpm1ae3b9d3a','Tops','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('riko7jfagi42kvoq','dihtmpm1ae3b9d3a','Body','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('lxmqh7ux9z5ha1q1','dihtmpm1ae3b9d3a','Bottoms','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('5k2b3nv5ih945e6d','h1ro3h59xs5eknl0','Tops','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('99dfpy7ffwywgykb','h1ro3h59xs5eknl0','Bottoms','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('mwmy1ls9ro0b2k85','h1ro3h59xs5eknl0','Shoes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('s0kgfni1ksp7wypv','h1ro3h59xs5eknl0','Eyelashes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('sxykax0jn240aymt','h1ro3h59xs5eknl0','Hair','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('tud2y63eh8f07lgr','h1ro3h59xs5eknl0','Eyes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('ybdjum9lceqriu3l','h1ro3h59xs5eknl0','Body','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('2nr5nlf62qtfkkxq','odtx7arzof5eigp4','Eyes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('320ez8wnt7pi538i','odtx7arzof5eigp4','Bottoms','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('j3gkj9t025ax9rhs','odtx7arzof5eigp4','Eyelashes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('mfycst1inbeobx05','odtx7arzof5eigp4','Body','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('mkgy5jhejme7firt','odtx7arzof5eigp4','Hats','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('o2br140ugumjh29q','odtx7arzof5eigp4','Shoes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('ofxbs3a4i0w76pjb','odtx7arzof5eigp4','Tops','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('rl029y75fj1coxyp','odtx7arzof5eigp4','Hair','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('vxmtb8vpvjvf3zma','p7y3p6ti6d85yf7q','Beta_Joints','#4C2121','#000000','#000000','#4C2121','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('n89yro60qtgyy93v','p7y3p6ti6d85yf7q','Beta_Surface','#EB5F5F','#000000','#000000','#EB5F5F','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),
					
					('2mbft9rzjxflby1w','r8tgsns20ruwx0bg','Hair','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('vga26dqzrdmu05q6','r8tgsns20ruwx0bg','Eyelashes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('xnjwcxxfcsva4kcc','r8tgsns20ruwx0bg','Shoes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('d1rtqn7rmyhcenky','r8tgsns20ruwx0bg','Tops','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('i26nosqecbdflfbt','r8tgsns20ruwx0bg','Body','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('lq9c84ora5mqzei5','r8tgsns20ruwx0bg','Eyes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('rvz45hxmna26uhtg','r8tgsns20ruwx0bg','Bottoms','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('16t9ay39xyu7x6u4','v1ij2rkmdypo97c2','Eyes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('41e6r3eftk9bmzq9','v1ij2rkmdypo97c2','Eyelashes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('alrjnt7sat4cvx1c','v1ij2rkmdypo97c2','Shoes','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('cxsfyd6lqjfatjsb','v1ij2rkmdypo97c2','Tops','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('dfnl46bdj5o8r0gq','v1ij2rkmdypo97c2','Body','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('go4qcewxqkzep92r','v1ij2rkmdypo97c2','Hair','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0),

					('o28c083kl7r39w8c','v1ij2rkmdypo97c2','Bottoms','#FFFFFF','#000000','#000000','#FFFFFF','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);
				");
			}

			/* updated v3.3.0 - update onwait animations for each new avatar */
			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='45dg48tccn60jnna';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('45dg48tccn60jnna','','dihtmpm1ae3b9d3a','',100,'onwait','Mild Male Movement','0','','/content/system/avatars/malcolm/','malcolmidle.babylon',1,195,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avataranimations set avatarid='dihtmpm1ae3b9d3a', updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avataranimationid='45dg48tccn60jnna';"); 
			}

			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='5nt31zrtvvq4cdu3';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('5nt31zrtvvq4cdu3','','h1ro3h59xs5eknl0','',100,'onwait','Swaying Female','0','','/content/system/avatars/shae/','shaeidle.babylon',1,303,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avataranimations set avatarid='h1ro3h59xs5eknl0', updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avataranimationid='5nt31zrtvvq4cdu3';"); 
			}

			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='78k4zhhzhemwlcvc';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('78k4zhhzhemwlcvc','','9e94useo7x2ief0s','',100,'onwait','Swaying Male','0','','/content/system/avatars/liam/','liamidle.babylon',1,200,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avataranimations set avatarid='9e94useo7x2ief0s', updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avataranimationid='78k4zhhzhemwlcvc';"); 
			}

			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='gfso15ljwulgi6c9';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('gfso15ljwulgi6c9','','r8tgsns20ruwx0bg','',100,'onwait','Young Male','0','','/content/system/avatars/jasper/','jasperidle.babylon',1,71,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avataranimations set endframe=71, avatarid='r8tgsns20ruwx0bg', updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avataranimationid='gfso15ljwulgi6c9';"); 
			}

			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='n3i9s7ophcae5h1r';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('n3i9s7ophcae5h1r','','v1ij2rkmdypo97c2','',100,'onwait','Casual Female','0','','/content/system/avatars/stefani/','stefaniidle.babylon',1,363,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avataranimations set endframe=363, avatarid='v1ij2rkmdypo97c2', updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avataranimationid='n3i9s7ophcae5h1r';"); 
			}

			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='o3h47opkqwat7mge';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('o3h47opkqwat7mge','','odtx7arzof5eigp4','',100,'onwait','Mild Female Movement','0','','/content/system/avatars/regina/','reginaidle.babylon',1,241,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avataranimations set avatarid='odtx7arzof5eigp4', updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avataranimationid='o3h47opkqwat7mge';"); 
			}

			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='o4kgmoik9nf8ws7p';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('o4kgmoik9nf8ws7p','','aajvq38y06vulgh0','',100,'onwait','Young Female','0','','/content/system/avatars/pearl/','pearlidle.babylon',1,325,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avataranimations set avatarid='aajvq38y06vulgh0', updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avataranimationid='o4kgmoik9nf8ws7p';"); 
			}

			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='ohb6x5ze1112a9e6';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('ohb6x5ze1112a9e6','','p7y3p6ti6d85yf7q','',100,'onwait','Default Female','0','','/content/system/avatars/female/','femaleidle.babylon',1,100,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avataranimations set avatarid='p7y3p6ti6d85yf7q', updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avataranimationid='ohb6x5ze1112a9e6';"); 
			}

			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='r9087b004i9ptv0e';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('r9087b004i9ptv0e','','3b9bt5c70igtmqux','',100,'onwait','Default Male','1','','/content/system/avatars/male/','maleidle.babylon',1,213,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avataranimations set avatarid='3b9bt5c70igtmqux', updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avataranimationid='r9087b004i9ptv0e';"); 
			}

			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='wc004i6dcn4rdn2g';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('wc004i6dcn4rdn2g','','641svy8bwjx2kme7','',100,'onwait','Casual Male','0','','/content/system/avatars/remy/','remyidle.babylon',1,196,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2);");
			} else { 
				$wtwdb->query("update ".wtw_tableprefix."avataranimations set avatarid='641svy8bwjx2kme7', updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avataranimationid='wc004i6dcn4rdn2g';"); 
			}
			
			/* updated v3.3.0 - change in animation required a change in end frame value */
			$wtwdb->query("update ".wtw_tableprefix."avataranimations set endframe=36, updatedate='".$ztimestamp."', updateuserid='".$zuserid."' where avataranimationid='0m07zbocsuwwuj6b' or avataranimationid='5c850obkwugsi9pu';");
			
			/* updated v3.3.0 - created setdefault to allow one default for each animation event, it loads if no animation is set for that event */
			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where setdefault=1 and deleted=0;");
			if (count($zresults) < 12) { 
				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where animationevent='onwait' and setdefault=1 and deleted=0;");
				if (count($zresults) == 0) { 
					$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='r9087b004i9ptv0e';");
					if (count($zresults) == 0) { 
						$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('r9087b004i9ptv0e','','3b9bt5c70igtmqux','',100,'onwait','Default Male','1','','/content/system/avatars/male/','maleidle.babylon',1,213,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',2);");
					} else { 
						$wtwdb->query("update ".wtw_tableprefix."avataranimations set setdefault=1, updatedate='".$ztimestamp."', updateuserid='".$zuserid."', deleteddate=null, deleteduserid='', deleted=2  where avataranimationid='r9087b004i9ptv0e';"); 
					}
				}

				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where animationevent='onwalk' and setdefault=1 and deleted=0;");
				if (count($zresults) == 0) { 
					$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='b03ftsjbxr0sxam8';");
					if (count($zresults) == 0) { 
						$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('b03ftsjbxr0sxam8','','','',50,'onwalk','Default Male','1','','/content/system/avatars/male/','malewalk.babylon',1,26,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
					} else { 
						$wtwdb->query("update ".wtw_tableprefix."avataranimations set setdefault=1, updatedate='".$ztimestamp."', updateuserid='".$zuserid."', deleteddate=null, deleteduserid='', deleted=0  where avataranimationid='b03ftsjbxr0sxam8';"); 
					}
				}				

				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where animationevent='onwalkbackwards' and setdefault=1 and deleted=0;");
				if (count($zresults) == 0) { 
					$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='0ikarv3xbs0n7544';");
					if (count($zresults) == 0) { 
						$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('0ikarv3xbs0n7544','','','',49,'onwalkbackwards','Default Male','1','','/content/system/avatars/male/','malewalkback.babylon',1,29,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
					} else { 
						$wtwdb->query("update ".wtw_tableprefix."avataranimations set setdefault=1, updatedate='".$ztimestamp."', updateuserid='".$zuserid."', deleteddate=null, deleteduserid='', deleted=0  where avataranimationid='0ikarv3xbs0n7544';"); 
					}
				}				

				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where animationevent='onturnleft' and setdefault=1 and deleted=0;");
				if (count($zresults) == 0) { 
					$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='9xworrh44cbkwq1y';");
					if (count($zresults) == 0) { 
						$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('9xworrh44cbkwq1y','','','',48,'onturnleft','Default Turn Left','1','','/content/system/avatars/male/','maleturnleft.babylon',1,29,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
					} else { 
						$wtwdb->query("update ".wtw_tableprefix."avataranimations set setdefault=1, updatedate='".$ztimestamp."', updateuserid='".$zuserid."', deleteddate=null, deleteduserid='', deleted=0  where avataranimationid='9xworrh44cbkwq1y';"); 
					}
				}				

				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where animationevent='onturnright' and setdefault=1 and deleted=0;");
				if (count($zresults) == 0) { 
					$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='mbpjld4fttowgnt6';");
					if (count($zresults) == 0) { 
						$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('mbpjld4fttowgnt6','','','',48,'onturnright','Default Turn Right','1','','/content/system/avatars/male/','maleturnright.babylon',1,29,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
					} else { 
						$wtwdb->query("update ".wtw_tableprefix."avataranimations set setdefault=1, updatedate='".$ztimestamp."', updateuserid='".$zuserid."', deleteddate=null, deleteduserid='', deleted=0  where avataranimationid='mbpjld4fttowgnt6';"); 
					}
				}				

				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where animationevent='onstrafeleft' and setdefault=1 and deleted=0;");
				if (count($zresults) == 0) { 
					$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='hur9z71kpv6b2bgb';");
					if (count($zresults) == 0) { 
						$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('hur9z71kpv6b2bgb','','','',47,'onstrafeleft','Default','1','','/content/system/avatars/male/','malestrafeleft.babylon',1,45,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
					} else { 
						$wtwdb->query("update ".wtw_tableprefix."avataranimations set setdefault=1, updatedate='".$ztimestamp."', updateuserid='".$zuserid."', deleteddate=null, deleteduserid='', deleted=0  where avataranimationid='hur9z71kpv6b2bgb';"); 
					}
				}				

				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where animationevent='onstraferight' and setdefault=1 and deleted=0;");
				if (count($zresults) == 0) { 
					$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='6x3o6sh2u1m1bjnq';");
					if (count($zresults) == 0) { 
						$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('6x3o6sh2u1m1bjnq','','','',47,'onstraferight','Default','1','','/content/system/avatars/male/','malestraferight.babylon',1,45,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
					} else { 
						$wtwdb->query("update ".wtw_tableprefix."avataranimations set setdefault=1, updatedate='".$ztimestamp."', updateuserid='".$zuserid."', deleteddate=null, deleteduserid='', deleted=0  where avataranimationid='6x3o6sh2u1m1bjnq';"); 
					}
				}

				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where animationevent='onrun' and setdefault=1 and deleted=0;");
				if (count($zresults) == 0) { 
					$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='mz182mwpsvx1f1va';");
					if (count($zresults) == 0) { 
						$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('mz182mwpsvx1f1va','','','',40,'onrun','Default','1','','/content/system/avatars/male/','malerun.babylon',1,16,1,1.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
					} else { 
						$wtwdb->query("update ".wtw_tableprefix."avataranimations set setdefault=1, updatedate='".$ztimestamp."', updateuserid='".$zuserid."', deleteddate=null, deleteduserid='', deleted=0  where avataranimationid='mz182mwpsvx1f1va';"); 
					}
				}

				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where animationevent='onrunbackwards' and setdefault=1 and deleted=0;");
				if (count($zresults) == 0) { 
					$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='rzn9d3dihtq4h2v5';");
					if (count($zresults) == 0) { 
						$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('rzn9d3dihtq4h2v5','','','',39,'onrunbackwards','Default','1','','/content/system/avatars/male/','malewalkback.babylon',1,29,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
					} else { 
						$wtwdb->query("update ".wtw_tableprefix."avataranimations set setdefault=1, updatedate='".$ztimestamp."', updateuserid='".$zuserid."', deleteddate=null, deleteduserid='', deleted=0  where avataranimationid='rzn9d3dihtq4h2v5';"); 
					}
				}

				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where animationevent='onrunturnleft' and setdefault=1 and deleted=0;");
				if (count($zresults) == 0) { 
					$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='45dh9tcbikbvhqa9';");
					if (count($zresults) == 0) { 
						$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('45dh9tcbikbvhqa9','','','',38,'onrunturnleft','Default','1','','/content/system/avatars/male/','maleturnleft.babylon',1,29,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
					} else { 
						$wtwdb->query("update ".wtw_tableprefix."avataranimations set setdefault=1, updatedate='".$ztimestamp."', updateuserid='".$zuserid."', deleteddate=null, deleteduserid='', deleted=0  where avataranimationid='45dh9tcbikbvhqa9';"); 
					}
				}

				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where animationevent='onrunturnright' and setdefault=1 and deleted=0;");
				if (count($zresults) == 0) { 
					$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='gi7iwy1cobjpzqpf';");
					if (count($zresults) == 0) { 
						$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('gi7iwy1cobjpzqpf','','','',38,'onrunturnright','Default','1','','/content/system/avatars/male/','maleturnright.babylon',1,29,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
					} else { 
						$wtwdb->query("update ".wtw_tableprefix."avataranimations set setdefault=1, updatedate='".$ztimestamp."', updateuserid='".$zuserid."', deleteddate=null, deleteduserid='', deleted=0  where avataranimationid='gi7iwy1cobjpzqpf';"); 
					}
				}

				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where animationevent='onrunstrafeleft' and setdefault=1 and deleted=0;");
				if (count($zresults) == 0) { 
					$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='xd3eqg21webe0wff';");
					if (count($zresults) == 0) { 
						$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('xd3eqg21webe0wff','','','',37,'onrunstrafeleft','Default','1','','/content/system/avatars/male/','malestrafeleft.babylon',1,45,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
					} else { 
						$wtwdb->query("update ".wtw_tableprefix."avataranimations set setdefault=1, updatedate='".$ztimestamp."', updateuserid='".$zuserid."', deleteddate=null, deleteduserid='', deleted=0  where avataranimationid='xd3eqg21webe0wff';"); 
					}
				}

				$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where animationevent='onrunstraferight' and setdefault=1 and deleted=0;");
				if (count($zresults) == 0) { 
					$zresults = $wtwdb->query("select * from ".wtw_tableprefix."avataranimations where avataranimationid='w547k8hrbbn89k4v';");
					if (count($zresults) == 0) { 
						$wtwdb->query("INSERT INTO ".wtw_tableprefix."avataranimations VALUES ('w547k8hrbbn89k4v','','','',37,'onrunstraferight','Default','1','','/content/system/avatars/male/','malestraferight.babylon',1,45,1,2.00,'','',50.00,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);");
					} else { 
						$wtwdb->query("update ".wtw_tableprefix."avataranimations set setdefault=1, updatedate='".$ztimestamp."', updateuserid='".$zuserid."', deleteddate=null, deleteduserid='', deleted=0  where avataranimationid='w547k8hrbbn89k4v';"); 
					}
				}
			}
			
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
			
			/* updated v3.3.0 - avatar designer was moved to a plugin - these plugins need to be enabled on first run */
			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."plugins where pluginname='wtw-avatars';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."plugins VALUES 
				('wtw-avatars',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);"); 
			}
			$zresults = $wtwdb->query("select * from ".wtw_tableprefix."plugins where pluginname='wtw-shopping';");
			if (count($zresults) == 0) { 
				$wtwdb->query("INSERT INTO ".wtw_tableprefix."plugins VALUES 
				('wtw-shopping',1,'".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'',0);"); 
			}
			
			/* updated 3.3.4 - added avatar groups as categories for avatars */
			$zresults = $wtwdb->query("
				select * 
				from ".wtw_tableprefix."avatargroups;");
			if (count($zresults) == 0) {
				$wtwdb->query("
					INSERT INTO `".wtw_tableprefix."avatargroups` VALUES 
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
					INSERT INTO `".wtw_tableprefix."roles` VALUES 
						('".$wtwdb->getRandomString(16,1)."','Host','".$ztimestamp."','".$zuserid."','".$ztimestamp."','".$zuserid."',NULL,'','0');
				");
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
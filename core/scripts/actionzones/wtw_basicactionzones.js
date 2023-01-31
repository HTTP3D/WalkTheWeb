/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions create the various action zones */

WTWJS.prototype.addActionzoneLoadzone = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* load zone = shape often box by default - triggers molds to load when your avatar enters the load zone */
	var zactionzone;
	try {
		/* create the shape for the load zone */
		/* default actionzoneshape is cube and hidden (opacity 0) */
		var zmolddef = WTW.newMold();
		zmolddef.shape = zactionzonedef.actionzoneshape;
		zmolddef.covering = 'hidden';
		/* position, scaling, and rotation of zone */
		zmolddef.position.x = zactionzonedef.position.x;
		zmolddef.position.y = zactionzonedef.position.y;
		zmolddef.position.z = zactionzonedef.position.z;
		zmolddef.scaling.x = zactionzonedef.scaling.x;
		zmolddef.scaling.y = zactionzonedef.scaling.y;
		zmolddef.scaling.z = zactionzonedef.scaling.z;
		zmolddef.rotation.x = zactionzonedef.rotation.x;
		zmolddef.rotation.y = zactionzonedef.rotation.y;
		zmolddef.rotation.z = zactionzonedef.rotation.z;
		/* subdivisions are only used for some shapes like spheres */
		zmolddef.subdivisions = 12;
		/* set transparent in 3D Scene */
		zmolddef.opacity = 0;
		/* every mold has a parent except for the main scene mold cube - most times it is the 3D Community, Building or Thing */
		zmolddef.parentname = zactionzonedef.parentname;
		/* actionzoneid refers to the database saved unique identifier (definition of what is being built. */
		/* but since each 3D Object can be added to 3D Scenes multiple times, repeating the same actionzoneid, */
		/* zactionzoneind (notice ind is for index) refers to the instance of the 3d object when added to the 3D Scene */
		zmolddef.actionzoneind = zactionzoneind;
		/* by default zones do not have collisions - avatars can walk into them */
		zmolddef.checkcollisions = '0';
		/* even in admin mode, zones are not pickable in the 3D Scene, use the menu to select and edit a zone */
		zmolddef.ispickable = '0';
		WTW.addMoldToQueue(zactionzonename, zmolddef, zmolddef.parentname, zmolddef.covering, null);
		WTW.actionZones[zactionzoneind].shown = '2';
	} catch (ex) {
		WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzoneLoadzone=' + ex.message);
	}
	return zactionzone;
}

WTWJS.prototype.addActionzoneUnloadzone = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* load zone = shape often box by default - triggers molds to load when your avatar enters the load zone */
	var zactionzone;
	try {
		/* create the shape for the load zone */
		/* default actionzoneshape is cube and hidden (opacity 0) */
		var zmolddef = WTW.newMold();
		zmolddef.shape = zactionzonedef.actionzoneshape;
		zmolddef.covering = 'hidden';
		/* position, scaling, and rotation of zone */
		zmolddef.position.x = zactionzonedef.position.x;
		zmolddef.position.y = zactionzonedef.position.y;
		zmolddef.position.z = zactionzonedef.position.z;
		zmolddef.scaling.x = zactionzonedef.scaling.x;
		zmolddef.scaling.y = zactionzonedef.scaling.y;
		zmolddef.scaling.z = zactionzonedef.scaling.z;
		zmolddef.rotation.x = zactionzonedef.rotation.x;
		zmolddef.rotation.y = zactionzonedef.rotation.y;
		zmolddef.rotation.z = zactionzonedef.rotation.z;
		/* subdivisions are only used for some shapes like spheres */
		zmolddef.subdivisions = 12;
		/* set transparent in 3D Scene */
		zmolddef.opacity = 0;
		/* every mold has a parent except for the main scene mold cube - most times it is the 3D Community, Building or Thing */
		zmolddef.parentname = zactionzonedef.parentname;
		/* actionzoneid refers to the database saved unique identifier (definition of what is being built. */
		/* but since each 3D Object can be added to 3D Scenes multiple times, repeating the same actionzoneid, */
		/* zactionzoneind (notice ind is for index) refers to the instance of the 3d object when added to the 3D Scene */
		zmolddef.actionzoneind = zactionzoneind;
		/* by default zones do not have collisions - avatars can walk into them */
		zmolddef.checkcollisions = '0';
		/* even in admin mode, zones are not pickable in the 3D Scene, use the menu to select and edit a zone */
		zmolddef.ispickable = '0';
		WTW.addMoldToQueue(zactionzonename, zmolddef, zmolddef.parentname, zmolddef.covering, null);
		WTW.actionZones[zactionzoneind].shown = '2';
	} catch (ex) {
		WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzoneUnloadzone=' + ex.message);
	}
	return zactionzone;
}

WTWJS.prototype.addActionzoneTeleportZone = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* load zone = shape often box by default - triggers molds to load when your avatar enters the load zone */
	var zactionzone;
	try {
		/* create the shape for the load zone */
		/* default actionzoneshape is cube and hidden (opacity 0) */
		var zmolddef = WTW.newMold();
		zmolddef.shape = zactionzonedef.actionzoneshape;
		zmolddef.covering = 'hidden';
		/* position, scaling, and rotation of zone */
		zmolddef.position.x = zactionzonedef.position.x;
		zmolddef.position.y = zactionzonedef.position.y;
		zmolddef.position.z = zactionzonedef.position.z;
		zmolddef.scaling.x = zactionzonedef.scaling.x;
		zmolddef.scaling.y = zactionzonedef.scaling.y;
		zmolddef.scaling.z = zactionzonedef.scaling.z;
		zmolddef.rotation.x = zactionzonedef.rotation.x;
		zmolddef.rotation.y = zactionzonedef.rotation.y;
		zmolddef.rotation.z = zactionzonedef.rotation.z;
		/* subdivisions are only used for some shapes like spheres */
		zmolddef.subdivisions = 12;
		/* set transparent in 3D Scene */
		zmolddef.opacity = 0;
		/* every mold has a parent except for the main scene mold cube - most times it is the 3D Community, Building or Thing */
		zmolddef.parentname = zactionzonedef.parentname;
		/* actionzoneid refers to the database saved unique identifier (definition of what is being built. */
		/* but since each 3D Object can be added to 3D Scenes multiple times, repeating the same actionzoneid, */
		/* zactionzoneind (notice ind is for index) refers to the instance of the 3d object when added to the 3D Scene */
		zmolddef.actionzoneind = zactionzoneind;
		/* by default zones do not have collisions - avatars can walk into them */
		zmolddef.checkcollisions = '0';
		/* even in admin mode, zones are not pickable in the 3D Scene, use the menu to select and edit a zone */
		zmolddef.ispickable = '0';
		WTW.addMoldToQueue(zactionzonename, zmolddef, zmolddef.parentname, zmolddef.covering, null);
		WTW.actionZones[zactionzoneind].shown = '2';
	} catch (ex) {
		WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzoneTeleportZone=' + ex.message);
	}
	return zactionzone;
}

WTWJS.prototype.addActionzoneSpawnZone = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* load zone = shape often box by default - triggers molds to load when your avatar enters the load zone */
	var zactionzone;
	try {
		/* create the shape for the load zone */
		/* default actionzoneshape is cube and hidden (opacity 0) */
		var zmolddef = WTW.newMold();
		zmolddef.shape = zactionzonedef.actionzoneshape;
		zmolddef.covering = 'hidden';
		/* position, scaling, and rotation of zone */
		zmolddef.position.x = zactionzonedef.position.x;
		zmolddef.position.y = zactionzonedef.position.y;
		zmolddef.position.z = zactionzonedef.position.z;
		zmolddef.scaling.x = zactionzonedef.scaling.x;
		zmolddef.scaling.y = zactionzonedef.scaling.y;
		zmolddef.scaling.z = zactionzonedef.scaling.z;
		zmolddef.rotation.x = zactionzonedef.rotation.x;
		zmolddef.rotation.y = zactionzonedef.rotation.y;
		zmolddef.rotation.z = zactionzonedef.rotation.z;
		/* subdivisions are only used for some shapes like spheres */
		zmolddef.subdivisions = 12;
		/* set transparent in 3D Scene */
		zmolddef.opacity = 0;
		/* every mold has a parent except for the main scene mold cube - most times it is the 3D Community, Building or Thing */
		zmolddef.parentname = zactionzonedef.parentname;
		/* actionzoneid refers to the database saved unique identifier (definition of what is being built. */
		/* but since each 3D Object can be added to 3D Scenes multiple times, repeating the same actionzoneid, */
		/* zactionzoneind (notice ind is for index) refers to the instance of the 3d object when added to the 3D Scene */
		zmolddef.actionzoneind = zactionzoneind;
		/* by default zones do not have collisions - avatars can walk into them */
		zmolddef.checkcollisions = '0';
		/* even in admin mode, zones are not pickable in the 3D Scene, use the menu to select and edit a zone */
		zmolddef.ispickable = '0';
		WTW.addMoldToQueue(zactionzonename, zmolddef, zmolddef.parentname, zmolddef.covering, null);
		WTW.actionZones[zactionzoneind].shown = '2';
	} catch (ex) {
		WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzoneSpawnZone=' + ex.message);
	}
	return zactionzone;
}

WTWJS.prototype.addActionzoneLoadAnimations = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* load animations = shape often box by default - triggers to load avatar animations to your avatar when it enters the zone */
	var zactionzone;
	try {
		/* create the shape for the animation zone */
		/* default actionzoneshape is cube and hidden (opacity 0) */
		var zmolddef = WTW.newMold();
		zmolddef.shape = zactionzonedef.actionzoneshape;
		zmolddef.covering = 'hidden';
		zmolddef.position.x = zactionzonedef.position.x;
		zmolddef.position.y = zactionzonedef.position.y;
		zmolddef.position.z = zactionzonedef.position.z;
		zmolddef.scaling.x = zactionzonedef.scaling.x;
		zmolddef.scaling.y = zactionzonedef.scaling.y;
		zmolddef.scaling.z = zactionzonedef.scaling.z;
		zmolddef.rotation.x = zactionzonedef.rotation.x;
		zmolddef.rotation.y = zactionzonedef.rotation.y;
		zmolddef.rotation.z = zactionzonedef.rotation.z;
		zmolddef.subdivisions = 12;
		zmolddef.opacity = 0;
		zmolddef.parentname = zactionzonedef.parentname;
		zmolddef.actionzoneind = zactionzoneind;
		zmolddef.checkcollisions = '0';
		zmolddef.ispickable = '0';
		WTW.addMoldToQueue(zactionzonename, zmolddef, zmolddef.parentname, zmolddef.covering, null);
		if (WTW.adminView == 1) {
			if (dGet('wtw_bzones').title == 'Action Zones are Shown' || zactionzonedef.actionzoneid == dGet('wtw_tactionzoneid').value) {
				WTW.setOpacity(zactionzonename, .2);
			}
		}
		WTW.actionZones[zactionzoneind].shown = '2';
	} catch (ex) {
		WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzoneLoadAnimations=' + ex.message);
	}
	return zactionzone;
}

WTWJS.prototype.addActionzoneSlidingDoor = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* sliding door zone = shape often box by default - triggers molds to move in a defined axis direction when any avatar enters the zone */
	var zactionzone;
	try {
		var zparentname = zactionzonedef.parentname;
		var zparent = WTW.getMeshOrNodeByID(zparentname);
		var zpositionx = Number(zactionzonedef.position.x);
		var zpositiony = Number(zactionzonedef.position.y);
		var zpositionz = Number(zactionzonedef.position.z);
		var zaxispositionx = Number(zactionzonedef.axis.position.x);
		var zaxispositiony = Number(zactionzonedef.axis.position.y);
		var zaxispositionz = Number(zactionzonedef.axis.position.z);
		var zaxisrotx = Number(zactionzonedef.axis.rotation.x);
		var zaxisroty = Number(zactionzonedef.axis.rotation.y);
		var zaxisrotz = Number(zactionzonedef.axis.rotation.z);
		zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
		var zactionzoneaxlebase = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
		var zactionzoneaxle = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
		var zactionzoneaxlepole = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'));
		var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
		if (zactionzoneaxlebase == null) {
			zactionzoneaxlebase = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
			zactionzoneaxlebase.parent = zparent;
			zactionzoneaxlebase.position = new BABYLON.Vector3(zaxispositionx, zaxispositiony, zaxispositionz);
			zactionzoneaxlebase.rotation = new BABYLON.Vector3(WTW.getRadians(zaxisrotx), WTW.getRadians(zaxisroty), WTW.getRadians(zaxisrotz));
			zactionzoneaxlebase.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxle == null) {
			WTW.actionZones[zactionzoneind].status = 0;
			zactionzoneaxle = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
			zactionzoneaxle.parent = zactionzoneaxlebase;
			zactionzoneaxle.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle.rotation = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxlepole == null && WTW.adminView == 1) {
			var zmolddef4 = WTW.newMold();
			zmolddef4.shape = 'box';
			zmolddef4.covering = 'texture';
			zmolddef4.scaling.x = .20;
			zmolddef4.scaling.y = .20;
			zmolddef4.scaling.z = Number(zactionzonedef.movementdistance);
			zmolddef4.graphics.texture.id = '7orpcjosyct5b1bf';
			zmolddef4.graphics.texture.path = '/content/system/stock/vaxis-512x512.png';
			zmolddef4.opacity = 0;
			zmolddef4.parentname = zactionzonename.replace('-actionzone-','-actionzoneaxle-');
			zactionzoneaxlepole = WTW.addMold(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), zmolddef4, zmolddef4.parentname, zmolddef4.covering);
			zactionzoneaxlepole.isPickable = false;
			zactionzoneaxlepole.checkCollisions = false;
		}
		if (zactionzoneaxlebase2 == null) {
			zactionzoneaxlebase2 = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
			zactionzoneaxlebase2.parent = zactionzoneaxle;
			zactionzoneaxlebase2.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxlebase2.rotation = new BABYLON.Vector3(WTW.getRadians(-zaxisrotx),WTW.getRadians(-zaxisroty),WTW.getRadians(-zaxisrotz));
			zactionzoneaxlebase2.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzone == null) {
			/* create the shape for the zone that avatars enter to trigger the action */
			/* default actionzoneshape is cube and hidden (opacity 0) */
			var zmolddef5 = WTW.newMold();
			zmolddef5.shape = zactionzonedef.actionzoneshape;
			zmolddef5.covering = 'hidden';
			zmolddef5.scaling.x = zactionzonedef.scaling.x;
			zmolddef5.scaling.y = zactionzonedef.scaling.y;
			zmolddef5.scaling.z = zactionzonedef.scaling.z;
			zmolddef5.subdivisions = 20;
			zmolddef5.opacity = 0;
			zmolddef5.parentname = zparentname;
			zactionzone = WTW.addMold(zactionzonename, zmolddef5, zmolddef5.parentname, zmolddef5.covering);
			zactionzone.isPickable = false;
			zactionzone.checkCollisions = false;
			zactionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			var movementtype = 'slide';
			var movementdistance = 0;
			if (zactionzonedef.movementtype != null) {
				movementtype = zactionzonedef.movementtype;
			}
			if (WTW.isNumeric(zactionzonedef.movementdistance)) {
				movementdistance = Number(zactionzonedef.movementdistance);
			}
			try {
				var zcondition1 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var ztest = true;
					var zcurrentactionzoneind = zactionzoneind;
					if (WTW.actionZones[zcurrentactionzoneind] != null) {
						var zoffsetz = 0; //Number(WTW.actionZones[zcurrentactionzoneind].axis.position.z);
						var zcurrentdoor = zactionzoneaxle;
						var zcurrenttest = zcurrentdoor.position.z - zoffsetz;
						var zcurrentmovementdistance = Number(WTW.actionZones[zcurrentactionzoneind].movementdistance);
						var zdoorparts = zcurrentdoor.getChildren();
						if (WTW.actionZones[zcurrentactionzoneind] != null) {
							if (WTW.actionZones[zcurrentactionzoneind].status == 3) {
								if (Math.round(zcurrenttest * 1000) / 1000 >= Math.round(zcurrentmovementdistance * 1000) / 1000) {
									WTW.actionZones[zcurrentactionzoneind].status = 4;
								}
								ztest = (zcurrenttest < zcurrentmovementdistance);
							} else {
								ztest = false;
							}
						} else {
							ztest = false;
						}
					} else {
						ztest = false;
					}
					return ztest;
				});
				var zcondition2 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var ztest = true;
					var zcurrentactionzoneind = zactionzoneind;
					if (WTW.actionZones[zcurrentactionzoneind] != null) {
						var zoffsetz = 0; //Number(WTW.actionZones[zcurrentactionzoneind].axis.position.z);
						var zcurrentdoor = zactionzoneaxle;
						var zcurrenttest = zcurrentdoor.position.z - zoffsetz;
						var zcurrentmovementdistance = Number(WTW.actionZones[zcurrentactionzoneind].movementdistance);
						var zdoorparts = zcurrentdoor.getChildren();
						if (WTW.actionZones[zcurrentactionzoneind] != null) {
							if (WTW.actionZones[zcurrentactionzoneind].status == 2) {
								if (zcurrenttest <= 0) {
									zcurrentdoor.position.z = zoffsetz;
									WTW.actionZones[zcurrentactionzoneind].status = 1;
								}
								ztest = (zcurrenttest > 0);
							} else {
								ztest = false;
							}
						} else {
							ztest = false;
						}
					} else {
						ztest = false;
					}
					return ztest;
				});
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, zactionzoneaxle, 'position.z', 0.5, zcondition1)); 
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, zactionzoneaxle, 'position.z', -0.5, zcondition2));
				WTW.actionZones[zactionzoneind].status = 1;
			} catch (ex) {
			}
		}
		if (WTW.adminView == 1) {
			if (dGet('wtw_bzones').title == 'Action Zones are Shown' || zactionzonedef.actionzoneid == dGet('wtw_tactionzoneid').value) {
				WTW.setOpacity(zactionzonename, .2);
				WTW.setOpacity(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), 1);
			}
		}
		WTW.actionZones[zactionzoneind].shown = '2';
	} catch (ex) {
		WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzoneSlidingDoor=' + ex.message);
	}
	return zactionzone;
}

WTWJS.prototype.addActionzoneSwingingDoor = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* swinging door zone = shape often box by default - triggers molds to move in a rotation around a defined axis direction when any avatar enters the zone */
	var zactionzone;
	try {
		var zparentname = zactionzonedef.parentname;
		var zparent = WTW.getMeshOrNodeByID(zparentname);
		var zpositionx = Number(zactionzonedef.position.x);
		var zpositiony = Number(zactionzonedef.position.y);
		var zpositionz = Number(zactionzonedef.position.z);
		var zaxispositionx = Number(zactionzonedef.axis.position.x);
		var zaxispositiony = Number(zactionzonedef.axis.position.y);
		var zaxispositionz = Number(zactionzonedef.axis.position.z);
		var zaxisrotx = Number(zactionzonedef.axis.rotation.x);
		var zaxisroty = Number(zactionzonedef.axis.rotation.y);
		var zaxisrotz = Number(zactionzonedef.axis.rotation.z);
		zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
		var zactionzoneaxlebase = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
		var zactionzoneaxle = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
		var zactionzoneaxlepole = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'));
		var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
		if (zactionzoneaxlebase == null && zparent != null) {
			zactionzoneaxlebase = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
			zactionzoneaxlebase.parent = zparent;
			zactionzoneaxlebase.position = new BABYLON.Vector3(zaxispositionx, zaxispositiony, zaxispositionz);
			zactionzoneaxlebase.rotation = new BABYLON.Vector3(WTW.getRadians(zaxisrotx), WTW.getRadians(zaxisroty), WTW.getRadians(zaxisrotz));
			zactionzoneaxlebase.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxle == null) {
			WTW.actionZones[zactionzoneind].status = 0;
			zactionzoneaxle = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
			zactionzoneaxle.parent = zactionzoneaxlebase;
			zactionzoneaxle.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle.rotation = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxlepole == null && WTW.adminView == 1) {
			var zmolddef4 = WTW.newMold();
			zmolddef4.shape = 'box';
			zmolddef4.covering = 'texture';
			zmolddef4.scaling.x = .20;
			zmolddef4.scaling.y = 20;
			zmolddef4.scaling.z = .20;
			zmolddef4.rotation.x = Number(zactionzonedef.axis.rotation.x);
			zmolddef4.rotation.y = 0;
			zmolddef4.rotation.z = Number(zactionzonedef.axis.rotation.z);
			zmolddef4.graphics.texture.id = '7orpcjosyct5b1bf';
			zmolddef4.graphics.texture.path = '/content/system/stock/vaxis-512x512.png';
			zmolddef4.opacity = 0;
			zmolddef4.parentname = zactionzonename.replace('-actionzone-','-actionzoneaxle-');
			zactionzoneaxlepole = WTW.addMold(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), zmolddef4, zmolddef4.parentname, zmolddef4.covering);
			zactionzoneaxlepole.isPickable = false;
			zactionzoneaxlepole.checkCollisions = false;
		}
		if (zactionzoneaxlebase2 == null) {
			zactionzoneaxlebase2 = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
			zactionzoneaxlebase2.parent = zactionzoneaxle;
			zactionzoneaxlebase2.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxlebase2.rotation = new BABYLON.Vector3(WTW.getRadians(-zaxisrotx),WTW.getRadians(-zaxisroty),WTW.getRadians(-zaxisrotz));
			zactionzoneaxlebase2.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzone == null) {
			/* create the shape for the zone that avatars enter to trigger the action */
			/* default actionzoneshape is cube and hidden (opacity 0) */
			var zmolddef5 = WTW.newMold();
			zmolddef5.shape = zactionzonedef.actionzoneshape;
			zmolddef5.covering = 'hidden';
			zmolddef5.scaling.x = zactionzonedef.scaling.x;
			zmolddef5.scaling.y = zactionzonedef.scaling.y;
			zmolddef5.scaling.z = zactionzonedef.scaling.z;
			zmolddef5.subdivisions = 20;
			zmolddef5.opacity = 0;
			zmolddef5.parentname = zparentname;
			zactionzone = WTW.addMold(zactionzonename, zmolddef5, zmolddef5.parentname, zmolddef5.covering);
			zactionzone.isPickable = false;
			zactionzone.checkCollisions = false;
			zactionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			var zmovementtype = 'swing';
			var zmovementdistance = 0;
			if (zactionzonedef.movementtype != null) {
				zmovementtype = zactionzonedef.movementtype;
			}
			if (WTW.isNumeric(zactionzonedef.movementdistance)) {
				zmovementdistance = Number(zactionzonedef.movementdistance);
			}
			var zaxlename = zactionzonename.replace('-actionzone-','-actionzoneaxle-');
			var zaxledir = 'rotation.y';
			var zswingdir = 1;
			var zswingdist = 90;
			switch (zactionzonedef.axis.rotateaxis) {
				case 'x':
					zaxledir = 'rotation.x';
					break;
				case 'z':
					zaxledir = 'rotation.z';
					break;
				default:
					zaxledir = 'rotation.y';
					break;
			}
			if (zactionzonedef.axis.rotatedirection == '-1') {
				zswingdir = -1;
			}
			if (WTW.isNumeric(zactionzonedef.axis.rotatedegrees)) {
				zswingdist =  Number(zactionzonedef.axis.rotatedegrees);
			}			
			try {
				var zcondition1 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var ztest = true;
					var zcurrentactionzoneind = zactionzoneind;
					var zcurrentaxlename = zaxlename;
					var zcurrentaxledir = zaxledir;
					var zcurrentswingdist = zswingdist;
					var zcurrentrotatetest = 0;
					var zcurrentswingdir = zswingdir;
					var zcurrentdoor = zactionzoneaxle;
					var zdoorparts = zcurrentdoor.getChildren();
					if (WTW.actionZones[zcurrentactionzoneind] != null) {
						if (WTW.isNumeric(WTW.actionZones[zcurrentactionzoneind].axis.rotatedegrees)) {
							zcurrentswingdist =  Number(WTW.actionZones[zcurrentactionzoneind].axis.rotatedegrees);
						}
						if (Number(WTW.actionZones[zcurrentactionzoneind].axis.rotatedirection) == -1) {
							zcurrentswingdir = -1;
						} else if (Number(WTW.actionZones[zcurrentactionzoneind].axis.rotatedirection) == 1) {
							zcurrentswingdir = 1;
						}
						zcurrentaxledir =  WTW.actionZones[zcurrentactionzoneind].axis.rotateaxis;
						switch (zcurrentaxledir) {
							case 'rotation.x':
								zcurrentrotatetest = zcurrentdoor.rotation.x;
								break;
							case 'rotation.z':
								zcurrentrotatetest = zcurrentdoor.rotation.z;
								break;
							default:
								zcurrentrotatetest = zcurrentdoor.rotation.y;
								break;
						}
						if (WTW.actionZones[zcurrentactionzoneind].status == 3) {
							if (zcurrentswingdir == 1) {
								if (Math.round(zcurrentrotatetest * 1000) / 1000 >= Math.round(WTW.getRadians(zcurrentswingdist) * 1000) / 1000) {
									WTW.actionZones[zcurrentactionzoneind].status = 4;
								}
								ztest = (zcurrentrotatetest < WTW.getRadians(zcurrentswingdist));
							} else {
								if (Math.round(zcurrentrotatetest * 1000) / 1000 <= Math.round(WTW.getRadians(zcurrentswingdir * zcurrentswingdist) * 1000) / 1000) {
									WTW.actionZones[zcurrentactionzoneind].status = 4;
								}
								ztest = (zcurrentrotatetest > WTW.getRadians(zcurrentswingdir * zcurrentswingdist));
							}
						} else {
							ztest = false;
						}
					} else {
						ztest = false;
					}
					return ztest;
				});
				var zcondition2 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var ztest = true;
					var zcurrentactionzoneind = zactionzoneind;
					var zcurrentaxlename = zaxlename;
					var zcurrentaxledir = zaxledir;
					var zcurrentrotatetest = 0;
					var zcurrentswingdir = -zswingdir;
					var zcurrentdoor = zactionzoneaxle;
					var zdoorparts = zcurrentdoor.getChildren();
					if (WTW.actionZones[zcurrentactionzoneind] != null) {
						if (Number(WTW.actionZones[zcurrentactionzoneind].axis.rotatedirection) == -1) {
							zcurrentswingdir = 1;
						} else if (Number(WTW.actionZones[zcurrentactionzoneind].axis.rotatedirection) == 1) {
							zcurrentswingdir = -1;
						}
						zcurrentaxledir =  WTW.actionZones[zcurrentactionzoneind].axis.rotateaxis;
						switch (zcurrentaxledir) {
							case 'rotation.x':
								zcurrentrotatetest = zcurrentdoor.rotation.x;
								break;
							case 'rotation.z':
								zcurrentrotatetest = zcurrentdoor.rotation.z;
								break;
							default:
								zcurrentrotatetest = zcurrentdoor.rotation.y;
								break;
						}
						if (WTW.actionZones[zcurrentactionzoneind].status == 2) {
							if (zcurrentswingdir == 1) {
								if (zcurrentrotatetest >= WTW.getRadians(0)) {
									zcurrentdoor.rotation.y = WTW.getRadians(0);
									WTW.actionZones[zcurrentactionzoneind].status = 1;
								}
								ztest = (zcurrentrotatetest < WTW.getRadians(0));
							} else {
								if (zcurrentrotatetest <= WTW.getRadians(0)) {
									zcurrentdoor.rotation.y = WTW.getRadians(0);
									WTW.actionZones[zcurrentactionzoneind].status = 1;
								}
								ztest = (zcurrentrotatetest > WTW.getRadians(0));
							}
						} else {
							ztest = false;
						}
					} else {
						ztest = false;
					}
					return ztest;
				});
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, zactionzoneaxle, zaxledir, (zswingdir * 0.1), zcondition1)); 
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, zactionzoneaxle, zaxledir, (-zswingdir * 0.1), zcondition2));
				WTW.actionZones[zactionzoneind].status = 1;
			} catch (ex) {
			}
		}
		if (WTW.adminView == 1) {
			if (dGet('wtw_bzones').title == 'Action Zones are Shown' || zactionzonedef.actionzoneid == dGet('wtw_tactionzoneid').value) {
				WTW.setOpacity(zactionzonename, .2);
				WTW.setOpacity(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), 1);
			}
		}
		WTW.actionZones[zactionzoneind].shown = '2';
	} catch (ex) {
		WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzoneSwingingDoor=' + ex.message);
	}
	return zactionzone;
}

WTWJS.prototype.addActionzoneRotate = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* rotate - rotating axle that molds can be attached so that they rotate around the selected axle */
	var zactionzone;
	try {
		var zparentname = zactionzonedef.parentname;
		var zparent = WTW.getMeshOrNodeByID(zparentname);
		var zpositionx = Number(zactionzonedef.position.x);
		var zpositiony = Number(zactionzonedef.position.y);
		var zpositionz = Number(zactionzonedef.position.z);
		var zaxispositionx = Number(zactionzonedef.axis.position.x);
		var zaxispositiony = Number(zactionzonedef.axis.position.y);
		var zaxispositionz = Number(zactionzonedef.axis.position.z);
		var zaxisrotx = Number(zactionzonedef.axis.rotation.x);
		var zaxisroty = Number(zactionzonedef.axis.rotation.y);
		var zaxisrotz = Number(zactionzonedef.axis.rotation.z);
		var zrotatespeed = Number(zactionzonedef.rotatespeed);
		zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
		var zactionzoneaxlebase = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
		var zactionzoneaxle = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
		var zactionzoneaxlepole = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'));
		var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
		if (zactionzoneaxlebase == null) {
			zactionzoneaxlebase = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
			zactionzoneaxlebase.parent = zparent;
			zactionzoneaxlebase.position = new BABYLON.Vector3(zaxispositionx, zaxispositiony, zaxispositionz);
			zactionzoneaxlebase.rotation = new BABYLON.Vector3(WTW.getRadians(zaxisrotx), WTW.getRadians(0), WTW.getRadians(zaxisrotz));
			zactionzoneaxlebase.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxle == null) {
			WTW.actionZones[zactionzoneind].status = 0;
			zactionzoneaxle = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
			zactionzoneaxle.parent = zactionzoneaxlebase;
			zactionzoneaxle.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle.rotation = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxlepole == null && WTW.adminView == 1) {
			var zmolddef4 = WTW.newMold();
			zmolddef4.shape = 'box';
			zmolddef4.covering = 'texture';
			zmolddef4.scaling.x = .20;
			zmolddef4.scaling.y = 20;
			zmolddef4.scaling.z = .20;
			zmolddef4.rotation.x = Number(zactionzonedef.axis.rotation.x);
			zmolddef4.rotation.y = 0;
			zmolddef4.rotation.z = Number(zactionzonedef.axis.rotation.z);
			zmolddef4.graphics.texture.id = '7orpcjosyct5b1bf';
			zmolddef4.graphics.texture.path = '/content/system/stock/vaxis-512x512.png';
			zmolddef4.opacity = 1;
			zmolddef4.parentname = zactionzonename.replace('-actionzone-','-actionzoneaxle-');
			zactionzoneaxlepole = WTW.addMold(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), zmolddef4, zmolddef4.parentname, zmolddef4.covering);
			zactionzoneaxlepole.isPickable = false;
			zactionzoneaxlepole.checkCollisions = false;
		}
		if (zactionzoneaxlebase2 == null) {
			zactionzoneaxlebase2 = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
			zactionzoneaxlebase2.parent = zactionzoneaxle;
			zactionzoneaxlebase2.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxlebase2.rotation = new BABYLON.Vector3(WTW.getRadians(-zaxisrotx),WTW.getRadians(0),WTW.getRadians(-zaxisrotz));
			zactionzoneaxlebase2.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzone == null) {
			var zmolddef5 = WTW.newMold();
			zmolddef5.shape = 'box';
			zmolddef5.covering = 'hidden';
			zmolddef5.position.x = 0;
			zmolddef5.position.y = 0;
			zmolddef5.position.z = 0;
			zmolddef5.scaling.x = 1;
			zmolddef5.scaling.y = 1;
			zmolddef5.scaling.z = 1;
			zmolddef5.subdivisions = 20;
			zmolddef5.opacity = 0;
			zmolddef5.parentname = zparentname;
			zactionzone = WTW.addMold(zactionzonename, zmolddef5, zmolddef5.parentname, zmolddef5.covering);
			zactionzone.rotation.x = 0;
			zactionzone.rotation.y = 0;
			zactionzone.rotation.z = 0;
			zactionzone.isPickable = false;
			zactionzone.checkCollisions = false;
			zactionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			try {
				var zcondition1 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var ztest = false;
					var zcurrentactionzoneind = zactionzoneind;
					if (WTW.actionZones[zcurrentactionzoneind] != null) {
						if (WTW.actionZones[zcurrentactionzoneind].status == 1) {
							ztest = true;
						}
					}
					return ztest;
				});
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, zactionzoneaxle, 'rotation.y', Number(WTW.actionZones[zactionzoneind].rotatespeed)/100, zcondition1)); 
			} catch (ex) {
				WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzoneRotate=' + ex.message);
			}
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == 'Action Zones are Shown') {
				WTW.setOpacity(zactionzonename, .2);
				WTW.setOpacity(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), 1);
			}
		}
		WTW.actionZones[zactionzoneind].status = 1;
		WTW.actionZones[zactionzoneind].shown = '2';
	} catch (ex) {
		WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzoneRotate=' + ex.message);
	}
	return zactionzone;
}

WTWJS.prototype.addActionzoneClickSlidingDoor = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* click to sliding door zone = (work in progress) selected mold to click - triggers molds to move in a defined axis direction when any avatar enters the zone */
	var zactionzone;
	try {
		var zparentname = zactionzonedef.parentname;
		var zparent = WTW.getMeshOrNodeByID(zparentname);
		var zpositionx = Number(zactionzonedef.position.x);
		var zpositiony = Number(zactionzonedef.position.y);
		var zpositionz = Number(zactionzonedef.position.z);
		var zaxispositionx = Number(zactionzonedef.axis.position.x);
		var zaxispositiony = Number(zactionzonedef.axis.position.y);
		var zaxispositionz = Number(zactionzonedef.axis.position.z);
		var zaxisrotx = Number(zactionzonedef.axis.rotation.x);
		var zaxisroty = Number(zactionzonedef.axis.rotation.y);
		var zaxisrotz = Number(zactionzonedef.axis.rotation.z);
		zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
		var zactionzoneaxlebase = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
		var zactionzoneaxle = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
		var zactionzoneaxlepole = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'));
		var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
		if (zactionzoneaxlebase == null) {
			zactionzoneaxlebase = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
			zactionzoneaxlebase.parent = zparent;
			zactionzoneaxlebase.position = new BABYLON.Vector3(zaxispositionx, zaxispositiony, zaxispositionz);
			zactionzoneaxlebase.rotation = new BABYLON.Vector3(WTW.getRadians(zaxisrotx), WTW.getRadians(zaxisroty), WTW.getRadians(zaxisrotz));
			zactionzoneaxlebase.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxle == null) {
			WTW.actionZones[zactionzoneind].status = 0;
			zactionzoneaxle = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
			zactionzoneaxle.parent = zactionzoneaxlebase;
			zactionzoneaxle.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle.rotation = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxlepole == null && WTW.adminView == 1) {
			var zmolddef4 = WTW.newMold();
			zmolddef4.shape = 'box';
			zmolddef4.covering = 'texture';
			zmolddef4.scaling.x = .20;
			zmolddef4.scaling.y = .20;
			zmolddef4.scaling.z = Number(zactionzonedef.movementdistance);
			zmolddef4.graphics.texture.id = '7orpcjosyct5b1bf';
			zmolddef4.graphics.texture.path = '/content/system/stock/vaxis-512x512.png';
			zmolddef4.opacity = 0;
			zmolddef4.parentname = zactionzonename.replace('-actionzone-','-actionzoneaxle-');
			zactionzoneaxlepole = WTW.addMold(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), zmolddef4, zmolddef4.parentname, zmolddef4.covering);
			zactionzoneaxlepole.isPickable = false;
			zactionzoneaxlepole.checkCollisions = false;
		}
		if (zactionzoneaxlebase2 == null) {
			zactionzoneaxlebase2 = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
			zactionzoneaxlebase2.parent = zactionzoneaxle;
			zactionzoneaxlebase2.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxlebase2.rotation = new BABYLON.Vector3(WTW.getRadians(-zaxisrotx),WTW.getRadians(-zaxisroty),WTW.getRadians(-zaxisrotz));
			zactionzoneaxlebase2.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzone == null) {
			var zmolddef5 = WTW.newMold();
			zmolddef5.shape = zactionzonedef.actionzoneshape;
			zmolddef5.covering = 'hidden';
			zmolddef5.scaling.x = .001; //zactionzonedef.scaling.x;
			zmolddef5.scaling.y = .001; //zactionzonedef.scaling.y;
			zmolddef5.scaling.z = .001; //zactionzonedef.scaling.z;
			zmolddef5.subdivisions = 20;
			zmolddef5.opacity = 0;
			zmolddef5.parentname = zparentname;
			zactionzone = WTW.addMold(zactionzonename, zmolddef5, zmolddef5.parentname, zmolddef5.covering);
			zactionzone.isPickable = false;
			zactionzone.checkCollisions = false;
			zactionzone.isVisible = false;
			zactionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			var zmovementtype = 'slide';
			var zmovementdistance = 0;
			if (zactionzonedef.movementtype != null) {
				zmovementtype = zactionzonedef.movementtype;
			}
			if (WTW.isNumeric(zactionzonedef.movementdistance)) {
				zmovementdistance = Number(zactionzonedef.movementdistance);
			}
			try {
				var zcondition1 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var ztest = true;
					var zcurrentactionzoneind = zactionzoneind;
					if (WTW.actionZones[zcurrentactionzoneind] != null) {
						var zoffsetz = 0; //Number(WTW.actionZones[zcurrentactionzoneind].axis.position.z);
						var zcurrentdoor = zactionzoneaxle;
						var zcurrenttest = zcurrentdoor.position.z - zoffsetz;
						var zcurrentmovementdistance = Number(WTW.actionZones[zcurrentactionzoneind].movementdistance);
						var zdoorparts = zcurrentdoor.getChildren();
						if (WTW.actionZones[zcurrentactionzoneind] != null) {
							if (WTW.actionZones[zcurrentactionzoneind].status == 3) {
								if (Math.round(zcurrenttest * 1000) / 1000 >= Math.round(zcurrentmovementdistance * 1000) / 1000) {
									WTW.actionZones[zcurrentactionzoneind].status = 4;
								}
								ztest = (zcurrenttest < zcurrentmovementdistance);
							} else {
								ztest = false;
							}
						} else {
							ztest = false;
						}
					} else {
						ztest = false;
					}
					return ztest;
				});
				var zcondition2 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var ztest = true;
					var zcurrentactionzoneind = zactionzoneind;
					if (WTW.actionZones[zcurrentactionzoneind] != null) {
						var zoffsetz = 0; //Number(WTW.actionZones[zcurrentactionzoneind].axis.position.z);
						var zcurrentdoor = zactionzoneaxle;
						var zcurrenttest = zcurrentdoor.position.z - zoffsetz;
						var zcurrentmovementdistance = Number(WTW.actionZones[zcurrentactionzoneind].movementdistance);
						var zdoorparts = zcurrentdoor.getChildren();
						if (WTW.actionZones[zcurrentactionzoneind] != null) {
							if (WTW.actionZones[zcurrentactionzoneind].status == 2) {
								if (zcurrenttest <= 0) {
									zcurrentdoor.position.z = zoffsetz;
									WTW.actionZones[zcurrentactionzoneind].status = 1;
								}
								ztest = (zcurrenttest > 0);
							} else {
								ztest = false;
							}
						} else {
							ztest = false;
						}
					} else {
						ztest = false;
					}
					return ztest;
				});
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, zactionzoneaxle, 'position.z', 0.5, zcondition1)); 
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, zactionzoneaxle, 'position.z', -0.5, zcondition2));
				WTW.actionZones[zactionzoneind].status = 1;
			} catch (ex) {
			}
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == 'Action Zones are Shown') {
				WTW.setOpacity(zactionzonename, .2);
				WTW.setOpacity(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), 1);
			}
		}
		WTW.actionZones[zactionzoneind].shown = '2';
	} catch (ex) {
		WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzoneClickSlidingDoor=' + ex.message);
	}
	return zactionzone;
}

WTWJS.prototype.addActionzoneMirror = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* mirror - (work in progress) molds in this zone will automatically have a reflection in the mirrored surface of a selected mold */
	var zactionzone;
	try {
		if (WTW.actionZones[zactionzoneind].shown == '0') {
			var zparentname = zactionzonedef.parentname;
			var zpositionx = Number(zactionzonedef.position.x);
			var zpositiony = Number(zactionzonedef.position.y);
			var zpositionz = Number(zactionzonedef.position.z);
			zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
			if (zactionzone == null) {
				/* create the shape for the zone that watches for reflections of molds */
				/* default actionzoneshape is cube and hidden (opacity 0) */
				var zmolddef5 = WTW.newMold();
				zmolddef5.shape = zactionzonedef.actionzoneshape;
				zmolddef5.covering = 'hidden';
				zmolddef5.scaling.x = zactionzonedef.scaling.x;
				zmolddef5.scaling.y = zactionzonedef.scaling.y;
				zmolddef5.scaling.z = zactionzonedef.scaling.z;
				zmolddef5.subdivisions = 12;
				zmolddef5.opacity = 0;
				zmolddef5.parentname = zactionzonedef.parentname;
				zactionzone = WTW.addMold(zactionzonename, zmolddef5, zmolddef5.parentname, zmolddef5.covering);
				zactionzone.isPickable = false;
				zactionzone.checkCollisions = false;
				zactionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			}
			if (dGet('wtw_bzones') != null) {
				if (WTW.adminView == 1 && dGet('wtw_bzones').title == 'Action Zones are Shown') {
					WTW.setOpacity(zactionzonename, .2);
				}
			}
			WTW.actionZones[zactionzoneind].shown = '2';
		}
	} catch (ex) {
		WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzoneMirror=' + ex.message);
	}
	return zactionzone;
}

WTWJS.prototype.addActionzoneRidealong = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* ridealong - (work in progress) shape often box by default - attaches to a parent mold and moves with the parent mold - any avatar in the zone will automatically parent and move with the parent mold - picture a ride on a boat where the avatar can still walk around the boat */
	var zactionzone;
	try {
		zactionzone = BABYLON.MeshBuilder.CreateBox(zactionzonename, {}, scene);
		zactionzone.position = new BABYLON.Vector3(zactionzonedef.position.x, zactionzonedef.position.y, zactionzonedef.position.z);
		zactionzone.scaling = new BABYLON.Vector3(zactionzonedef.scaling.x, zactionzonedef.scaling.y, zactionzonedef.scaling.z);
		zactionzone.rotation = new BABYLON.Vector3(WTW.getRadians(zactionzonedef.rotation.x), WTW.getRadians(zactionzonedef.rotation.y), WTW.getRadians(zactionzonedef.rotation.z));
		zactionzone.material = new BABYLON.StandardMaterial('mat' + zactionzonename, scene);
		zactionzone.material.alpha = .2;
		zactionzone.isPickable = false;
		zactionzone.checkCollisions = false;

		var zactionzoneparent = new BABYLON.TransformNode(zactionzonename + '-parent');
		zactionzoneparent.position = new BABYLON.Vector3(0,0,0);
		zactionzoneparent.rotation = new BABYLON.Vector3(WTW.getRadians(0), WTW.getRadians(0), WTW.getRadians(0));
		zactionzoneparent.scaling = new BABYLON.Vector3(1/zactionzonedef.scaling.x, 1/zactionzonedef.scaling.y, 1/zactionzonedef.scaling.z);
		zactionzoneparent.parent = zactionzone;
		if (WTW.adminView == 1) {
			if (dGet('wtw_bzones').title == 'Action Zones are Shown' || zactionzonedef.actionzoneid == dGet('wtw_tactionzoneid').value) {
				WTW.setOpacity(zactionzonename, .2);
			}
		}
		WTW.actionZones[zactionzoneind].shown = '2';
	} catch (ex) {
		WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzoneRidealong=' + ex.message);
	}
	return zactionzone;
}

WTWJS.prototype.addActionzonePeoplemover = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* people mover - (work in progress) shape often box by default - when avatar is in the zone they will move at a defined pace in a direction of the axis. This is useful for things like moving sidewalks, elevators, and escalators. */
	var zactionzone;
	try {
		var zparentname = zactionzonedef.parentname;
		var zparent = WTW.getMeshOrNodeByID(zparentname);
		var zpositionx = Number(zactionzonedef.position.x);
		var zpositiony = Number(zactionzonedef.position.y);
		var zpositionz = Number(zactionzonedef.position.z);
		var zaxispositionx = Number(zactionzonedef.axis.position.x);
		var zaxispositiony = Number(zactionzonedef.axis.position.y);
		var zaxispositionz = Number(zactionzonedef.axis.position.z);
		var zaxisrotx = Number(zactionzonedef.axis.rotation.x);
		var zaxisroty = Number(zactionzonedef.axis.rotation.y);
		var zaxisrotz = Number(zactionzonedef.axis.rotation.z);
		var zrotx = Number(zactionzonedef.rotation.x);
		var zroty = Number(zactionzonedef.rotation.y);
		var zrotz = Number(zactionzonedef.rotation.z);
		zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
		var zactionzoneaxlebase = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
		var zactionzoneaxle = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
		var zactionzoneaxlepole = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'));
		var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
		if (zactionzoneaxlebase == null) {
			zactionzoneaxlebase = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
			zactionzoneaxlebase.parent = zparent;
			zactionzoneaxlebase.position = new BABYLON.Vector3(zaxispositionx, zaxispositiony, zaxispositionz);
			zactionzoneaxlebase.rotation = new BABYLON.Vector3(WTW.getRadians(zaxisrotx), WTW.getRadians(zaxisroty), WTW.getRadians(zaxisrotz));
			zactionzoneaxlebase.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxle == null) {
			WTW.actionZones[zactionzoneind].status = 0;
			zactionzoneaxle = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
			zactionzoneaxle.parent = zactionzoneaxlebase;
			zactionzoneaxle.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle.rotation = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle.scaling = new BABYLON.Vector3(1,1,1);
			if (zaxisroty == 90) {
				zactionzoneaxle.rotation.x -= WTW.getRadians(90);
			}
		}
		if (zactionzoneaxlepole == null && WTW.adminView == 1) {
			var zmolddef4 = WTW.newMold();
			zmolddef4.shape = 'box';
			zmolddef4.covering = 'texture';
			zmolddef4.scaling.x = .20;
			zmolddef4.scaling.y = .20;
			zmolddef4.scaling.z = Number(zactionzonedef.movementdistance);
			zmolddef4.graphics.texture.id = '7orpcjosyct5b1bf';
			zmolddef4.graphics.texture.path = '/content/system/stock/vaxis-512x512.png';
			zmolddef4.opacity = 0;
			zmolddef4.parentname = zactionzonename.replace('-actionzone-','-actionzoneaxle-');
			zactionzoneaxlepole = WTW.addMold(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), zmolddef4, zmolddef4.parentname, zmolddef4.covering);
			zactionzoneaxlepole.isPickable = false;
			zactionzoneaxlepole.checkCollisions = false;
		}
		if (zactionzoneaxlebase2 == null) {
			zactionzoneaxlebase2 = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
			zactionzoneaxlebase2.parent = zactionzoneaxle;
			zactionzoneaxlebase2.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxlebase2.scaling = new BABYLON.Vector3(1,1,1);
			zactionzoneaxlebase2.rotation.x = WTW.getRadians(0);
			zactionzoneaxlebase2.rotation.y = WTW.getRadians(-zaxisroty);
			zactionzoneaxlebase2.rotation.z = WTW.getRadians(-zaxisrotx); // note this is a fix z==x - wont work for all
		}
		if (zactionzone == null) {
			/* create the shape for the zone that avatars enter to move from one location to another along a defined axis */
			/* default actionzoneshape is cube and hidden (opacity 0) */
			var zmolddef5 = WTW.newMold();
			zmolddef5.shape = zactionzonedef.actionzoneshape;
			zmolddef5.covering = 'hidden';
			zmolddef5.scaling.x = zactionzonedef.scaling.x;
			zmolddef5.scaling.y = zactionzonedef.scaling.y;
			zmolddef5.scaling.z = zactionzonedef.scaling.z;
			zmolddef5.subdivisions = 20;
			zmolddef5.opacity = 0;
			zmolddef5.parentname = zparentname;
			zactionzone = WTW.addMold(zactionzonename, zmolddef5, zmolddef5.parentname, zmolddef5.covering);
			zactionzone.rotation.x = WTW.getRadians(zrotx);
			zactionzone.rotation.y = WTW.getRadians(zroty);
			zactionzone.rotation.z = WTW.getRadians(zrotz);
			zactionzone.isPickable = false;
			zactionzone.checkCollisions = false;
			zactionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			var zmovementtype = 'slide';
			var zmovementdistance = 0;
			if (zactionzonedef.movementtype != null) {
				zmovementtype = zactionzonedef.movementtype;
			}
			if (WTW.isNumeric(zactionzonedef.movementdistance)) {
				zmovementdistance = Number(zactionzonedef.movementdistance);
			}
			try {
				var zcondition1 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var ztest = true;
					var zcurrentactionzoneind = zactionzoneind;
					if (WTW.actionZones[zcurrentactionzoneind] != null) {
						var zcurrentmove = zactionzoneaxle;
						var zcurrenttest = zcurrentmove.position.z;
						var zcurrentmovementdistance = Number(WTW.actionZones[zcurrentactionzoneind].movementdistance);
						var zhix = null;
						var zhiy = null;
						var zhiz = null;
						var zlox = null;
						var zloy = null;
						var zloz = null;
						var zmoverotx = zaxisrotx;
						var zmoveroty = zaxisroty;
						var zmoverotz = zaxisrotz;
						var zmoveparts = zactionzoneaxlebase2.getChildren();
						if (zmoveparts != null) {
							if (zmoveparts.length > 0) {
								for (var i=0;i < zmoveparts.length;i++) {
									if (zmoveparts[i].id.indexOf('molds') > -1) {
										if (zhiy != null) {
											if (zmoveparts[i].position.y > zhiy) {
												zhiy = zmoveparts[i].position.y;
												zhix = zmoveparts[i].position.x;
												zhiz = zmoveparts[i].position.z;
											}
										} else {
											zhiy = zmoveparts[i].position.y;
											zhix = zmoveparts[i].position.x;
											zhiz = zmoveparts[i].position.z;
										}
										if (zloy != null) {
											if (zmoveparts[i].position.y < zloy) {
												zloy = zmoveparts[i].position.y;
												zlox = zmoveparts[i].position.x;
												zloz = zmoveparts[i].position.z;
											}
										} else {
											zloy = zmoveparts[i].position.y;
											zlox = zmoveparts[i].position.x;
											zloz = zmoveparts[i].position.z;
										}
									}
								}
							}
						}
						if (WTW.actionZones[zcurrentactionzoneind].status > 0) {
							var zrangex = 0;
							var zrangey = 0;
							var zrangez = 0;
							
							zrangez = zhiz - zloz;
							zrangex = zhix - zlox;
							zrangey = zhiy - zloy;
							
							if (zrangez == 0) {
								//escalators
								if (zmoverotx < 0) {
									zhiy = 29;
									zrangey = 42;
									zrangex = 42;
									var zcurrentpos = Math.round(zcurrenttest * 1000) / 1000;
									var zfullpos = Math.round(zcurrentmovementdistance * 1000) / 1000;
									var zcutoffy = zhiy - ((zcurrentpos / zfullpos) * zrangey);
									if (zcurrentpos >= zfullpos) {
										zcurrentmove.position.z = 0;
										if (zmoveparts != null) {
											if (zmoveparts.length > 0) {
												for (var i=0;i < zmoveparts.length;i++) {
													if (zmoveparts[i].id.indexOf('molds') > -1) {
														if (zmoveparts[i].position.y <= zcutoffy) {
															zmoveparts[i].position.x -= zrangex;
															zmoveparts[i].position.y += zrangey;
															zmoveparts[i].position.z += (zhiz-zloz);
														}
													}
												}
											}
										}
									} else {
										ztest = (zcurrenttest < zcurrentmovementdistance);
										if (zmoveparts != null) {
											if (zmoveparts.length > 0) {
												for (var i=0;i < zmoveparts.length;i++) {
													if (zmoveparts[i].id.indexOf('molds') > -1) {
														if (zmoveparts[i].position.y >= zcutoffy) {
															zmoveparts[i].position.x += zrangex;
															zmoveparts[i].position.y -= zrangey;
															zmoveparts[i].position.z -= (zhiz-zloz);
														}
													}
												}
											}
										}
									}
								} else if (zmoverotx > 0) {
									//	zhiy=-10.75 == -53.25
									//zhiy = -10.25;
									zloy = -52.75;
									zrangey = 42;
									zrangex = 42;
									var zcurrentpos = Math.round(zcurrenttest * 1000) / 1000;
									var zfullpos = Math.round(zcurrentmovementdistance * 1000) / 1000;
									var zcutoffy = zloy + ((zcurrentpos / zfullpos) * zrangey);
									if (zcurrentpos >= zfullpos) {
										zcurrentmove.position.z = 0;
										if (zmoveparts != null) {
											if (zmoveparts.length > 0) {
												for (var i=0;i < zmoveparts.length;i++) {
													if (zmoveparts[i].id.indexOf('molds') > -1) {
														if (zmoveparts[i].position.y >= zcutoffy) {
															zmoveparts[i].position.x += zrangex;
															zmoveparts[i].position.y -= zrangey;
															zmoveparts[i].position.z -= (zhiz-zloz);
														}
													}
												}
											}
										}
									} else {
										ztest = (zcurrenttest < zcurrentmovementdistance);
										if (zmoveparts != null) {
											if (zmoveparts.length > 0) {
												for (var i=0;i < zmoveparts.length;i++) {
													if (zmoveparts[i].id.indexOf('molds') > -1) {
														if (zmoveparts[i].position.y <= zcutoffy) {
															zmoveparts[i].position.x -= zrangex;
															zmoveparts[i].position.y += zrangey;
															zmoveparts[i].position.z += (zhiz-zloz);
														}
													}
												}
											}
										}
									}
								}
							
							} else {
								// conveyor
								var zcurrentactionzoneaxlebase = zactionzoneaxlebase;
								if (zcurrentactionzoneaxlebase != null) {
									var zazbaseabspos = WTW.getWorldPosition(zcurrentactionzoneaxlebase);

									if (Math.abs(zrangez) > 0 && Math.abs(zrangey) < 3) {
										var zcutoffz = zrangez / 2;
										var zcutoffx = zrangex / 2;
										if (zmoveparts != null) {
											if (zmoveparts.length > 0) {
												for (var i=0;i < zmoveparts.length;i++) {
													if (zmoveparts[i] != null) {
														if (zmoveparts[i].id.indexOf('molds') > -1) {
															var zabspos = WTW.getWorldPosition(zmoveparts[i]);
															if (Math.sqrt(Math.pow(zabspos.x - zazbaseabspos.x, 2) + Math.pow(zabspos.y - zazbaseabspos.y, 2) + Math.pow(zabspos.z - zazbaseabspos.z, 2)) > zcurrentmovementdistance/2) {
																zmoveparts[i].position.z += (zcurrentmovementdistance * .95);
															}
														}
													}
												}
											}
										}
									} else if (zrangex > 0 && zrangey < 3) {
/*										var zcutoffx = zrangex / 2;
										if (zmoveparts != null) {
											if (zmoveparts.length > 0) {
												for (var i=0;i < zmoveparts.length;i++) {
													if (zmoveparts[i] != null) {
														if (zmoveparts[i].id.indexOf('molds') > -1) {
															var zabspos = WTW.getWorldPosition(zmoveparts[i]);
															if ((zabspos.x) < (zazbaseabspos.x - zcutoffx)) {
																zmoveparts[i].position.x += zcurrentmovementdistance;
															} else if ((zabspos.x) > (zazbaseabspos.x + zcutoffx)) {
																zmoveparts[i].position.x -= zcurrentmovementdistance;
															} else {
																
															}
														}
													}
												}
											}
										}
*/									}	
								} else {
									ztest = false;
								}									
							}
						} else {
							ztest = false;
						}
					} else {
						ztest = false;
					}
					return ztest;
				});				
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, zactionzoneaxle, 'position.z', 0.1, zcondition1)); 
				WTW.actionZones[zactionzoneind].status = 1;
			} catch (ex) {
			}
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == 'Action Zones are Shown') {
				WTW.setOpacity(zactionzonename, .2);
				WTW.setOpacity(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), 1);
			}
		}
		WTW.actionZones[zactionzoneind].shown = '2';
	} catch (ex) {
		WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzonePeoplemover=' + ex.message);
	}
	return zactionzone;
}

WTWJS.prototype.addActionzoneElevator = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* elevator - (work in progress) shape often box by default - extenson of people mover to include button activated moves, timing with doors, and stopping movement on floors */
	var zactionzone;
	try {
		var zparentname = zactionzonedef.parentname;
		var zparent = WTW.getMeshOrNodeByID(zparentname);
		var zpositionx = Number(zactionzonedef.position.x);
		var zpositiony = Number(zactionzonedef.position.y);
		var zpositionz = Number(zactionzonedef.position.z);
		var zaxispositionx = Number(zactionzonedef.axis.position.x);
		var zaxispositiony = Number(zactionzonedef.axis.position.y);
		var zaxispositionz = Number(zactionzonedef.axis.position.z);
		var zaxisrotx = Number(zactionzonedef.axis.rotation.x);
		var zaxisroty = Number(zactionzonedef.axis.rotation.y);
		var zaxisrotz = Number(zactionzonedef.axis.rotation.z);
		var zconnectinggridind = -1;
		var znamepart = zactionzonename.split('-');
		if (znamepart[4] != null) {
			if (WTW.isNumeric(znamepart[4])) {
				zconnectinggridind = Number(znamepart[4]);
			}
		}
		zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
		var zactionzoneaxlebase = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
		var zactionzoneaxle = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
		var zactionzoneaxlepole = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'));
		var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
		if (zactionzoneaxlebase == null) {
			zactionzoneaxlebase = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
			zactionzoneaxlebase.parent = zparent;
			zactionzoneaxlebase.position = new BABYLON.Vector3(zaxispositionx, zaxispositiony, zaxispositionz);
			zactionzoneaxlebase.rotation = new BABYLON.Vector3(WTW.getRadians(zaxisrotx), WTW.getRadians(zaxisroty), WTW.getRadians(zaxisrotz));
			zactionzoneaxlebase.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxle == null) {
			WTW.actionZones[zactionzoneind].status = 0;
			zactionzoneaxle = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
			zactionzoneaxle.parent = zactionzoneaxlebase;
			zactionzoneaxle.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle.rotation = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxlepole == null && WTW.adminView == 1) {
			var zmolddef4 = WTW.newMold();
			zmolddef4.shape = 'box';
			zmolddef4.covering = 'texture';
			zmolddef4.position.y = Number(zactionzonedef.movementdistance)/2;
			zmolddef4.scaling.x = .20;
			zmolddef4.scaling.y = Number(zactionzonedef.movementdistance);
			zmolddef4.scaling.z = .20;
			zmolddef4.graphics.texture.id = '7orpcjosyct5b1bf';
			zmolddef4.graphics.texture.path = '/content/system/stock/vaxis-512x512.png';
			zmolddef4.opacity = 0;
			zmolddef4.parentname = zactionzonename.replace('-actionzone-','-actionzoneaxle-');
			zactionzoneaxlepole = WTW.addMold(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), zmolddef4, zmolddef4.parentname, zmolddef4.covering);
			zactionzoneaxlepole.isPickable = false;
			zactionzoneaxlepole.checkCollisions = false;
		}
		if (zactionzoneaxlebase2 == null) {
			zactionzoneaxlebase2 = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
			zactionzoneaxlebase2.parent = zactionzoneaxle;
			zactionzoneaxlebase2.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxlebase2.rotation = new BABYLON.Vector3(WTW.getRadians(-zaxisrotx),WTW.getRadians(-zaxisroty),WTW.getRadians(-zaxisrotz));
			zactionzoneaxlebase2.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzone == null) {
			/* create the shape for the zone that avatars enter to ride the elevator (parent to and move with) */
			/* default actionzoneshape is cube and hidden (opacity 0) */
			var zmolddef5 = WTW.newMold();
			zmolddef5.shape = zactionzonedef.actionzoneshape;
			zmolddef5.covering = 'hidden';
			zmolddef5.scaling.x = zactionzonedef.scaling.x;
			zmolddef5.scaling.y = zactionzonedef.scaling.y;
			zmolddef5.scaling.z = zactionzonedef.scaling.z;
			zmolddef5.subdivisions = 20;
			zmolddef5.opacity = 0;
			zmolddef5.parentname = zparentname;
			zactionzone = WTW.addMold(zactionzonename, zmolddef5, zmolddef5.parentname, zmolddef5.covering);
			zactionzone.isPickable = false;
			zactionzone.checkCollisions = false;
			zactionzone.isVisible = false;
			zactionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			var zmovementtype = 'slide';
			var zmovementdistance = 0;
			if (zactionzonedef.movementtype != null) {
				zmovementtype = zactionzonedef.movementtype;
			}
			if (WTW.isNumeric(zactionzonedef.movementdistance)) {
				zmovementdistance = Number(zactionzonedef.movementdistance);
			}
			try {
				var zcondition1 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var ztest = true;
					var zcurrentactionzoneind = zactionzoneind;
					if (WTW.actionZones[zcurrentactionzoneind] != null) {
						var zelevatorpath = zactionzoneaxle;
						var zelevatorbase = zactionzoneaxlebase;
						var zelevatorridealong = zactionzone;
						var zcurrenttest = zelevatorpath.position.y;
						var zcurrentmovementdistance = Number(WTW.actionZones[zcurrentactionzoneind].movementdistance);
						var zdoorparts = zelevatorpath.getChildren();
						var zcgind = zconnectinggridind;
						for (var i=0; i < WTW.actionZones.length; i++) {
							if (WTW.actionZones[i] != null) {
								if (zcgind == WTW.actionZones[i].connectinggridind && WTW.actionZones[i].actionzonetype == 'clickactivatedslidingdoor') {
									var zdooractionzoneaxlebase = WTW.getMeshOrNodeByID(WTW.actionZones[i].moldname.replace('-actionzone-','-actionzoneaxlebase-'));
									if (zdooractionzoneaxlebase != null) {
										if (zdooractionzoneaxlebase.position.x == zelevatorbase.position.x && zdooractionzoneaxlebase.position.z == zelevatorbase.position.z) {
											zelevatorridealong.position.y = zelevatorpath.position.y + (zelevatorridealong.scaling.y/2);
											zdooractionzoneaxlebase.position.y = zelevatorpath.position.y;
											WTW.actionZones[i].axis.position.y = zdooractionzoneaxlebase.position.y;
										}
									}				
								}
							}
						}
						if (WTW.actionZones[zcurrentactionzoneind] != null) {
							if (WTW.actionZones[zcurrentactionzoneind].status == 3) {
								if (Math.round(zcurrenttest * 1000) / 1000 >= Math.round(zcurrentmovementdistance * 1000) / 1000) {
									zelevatorpath.position.y = zcurrentmovementdistance;
									WTW.actionZones[zcurrentactionzoneind].status = 4;
								}
								ztest = (zcurrenttest < zcurrentmovementdistance);
							} else {
								ztest = false;
							}
						} else {
							ztest = false;
						}
					} else {
						ztest = false;
					}
					return ztest;
				});
				var zcondition2 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var ztest = true;
					var zcurrentactionzoneind = zactionzoneind;
					if (WTW.actionZones[zcurrentactionzoneind] != null) {
						var zelevatorpath = zactionzoneaxle;
						var zelevatorbase = zactionzoneaxlebase;
						var zelevatorridealong = zactionzone;
						var zcurrenttest = zelevatorpath.position.y;
						var zcurrentmovementdistance = Number(WTW.actionZones[zcurrentactionzoneind].movementdistance);
						var zdoorparts = zelevatorpath.getChildren();
						var zcgind = zconnectinggridind;
						for (var i=0; i < WTW.actionZones.length; i++) {
							if (WTW.actionZones[i] != null) {
								if (zcgind == WTW.actionZones[i].connectinggridind && WTW.actionZones[i].actionzonetype == 'clickactivatedslidingdoor') {
									var zdooractionzoneaxlebase = WTW.getMeshOrNodeByID(WTW.actionZones[i].moldname.replace('-actionzone-','-actionzoneaxlebase-'));
									if (zdooractionzoneaxlebase != null) {
										if (zdooractionzoneaxlebase.position.x == zelevatorbase.position.x && zdooractionzoneaxlebase.position.z == zelevatorbase.position.z) {
											zelevatorridealong.position.y = zelevatorpath.position.y + (zelevatorridealong.scaling.y/2);
											zdooractionzoneaxlebase.position.y = zelevatorpath.position.y;
											WTW.actionZones[i].axis.position.y = zdooractionzoneaxlebase.position.y;
										}
									}				
								}
							}
						}
						if (WTW.actionZones[zcurrentactionzoneind] != null) {
							if (WTW.actionZones[zcurrentactionzoneind].status == 2) {
								if (zcurrenttest <= 0) {
									zelevatorpath.position.y = 0;
									WTW.actionZones[zcurrentactionzoneind].status = 1;
								}
								ztest = (zcurrenttest > 0);
							} else {
								ztest = false;
							}
						} else {
							ztest = false;
						}
					} else {
						ztest = false;
					}
					return ztest;
				});
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, zactionzoneaxle, 'position.y', 0.5, zcondition1)); 
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, zactionzoneaxle, 'position.y', -0.5, zcondition2));
				WTW.actionZones[zactionzoneind].status = 1;
			} catch (ex) {
			}
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == 'Action Zones are Shown') {
				WTW.setOpacity(zactionzonename, .2);
				WTW.setOpacity(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), 1);
			}
		}
		WTW.actionZones[zactionzoneind].shown = '2';
	} catch (ex) {
		WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzoneElevator=' + ex.message);
	}
	return zactionzone;
}

WTWJS.prototype.addActionzoneSeat = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* seat - (work in progress) selected mold to click - trigers an animation of your avatar to move in front of the seat and sit */
	var zactionzone;
	try {
		var zparentname = zactionzonedef.parentname;
		var zparent = WTW.getMeshOrNodeByID(zparentname);
		var zpositionx = Number(zactionzonedef.position.x);
		var zpositiony = Number(zactionzonedef.position.y);
		var zpositionz = Number(zactionzonedef.position.z);
		var zaxispositionx = zpositionx; //Number(zactionzonedef.axis.position.x);
		var zaxispositiony = zpositiony; //Number(zactionzonedef.axis.position.y);
		var zaxispositionz = zpositionz; //Number(zactionzonedef.axis.position.z);
		var zaxisrotx = Number(zactionzonedef.axis.rotation.x);
		var zaxisroty = Number(zactionzonedef.axis.rotation.y);
		var zaxisrotz = Number(zactionzonedef.axis.rotation.z);
		zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
		var zactionzoneaxlebase = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
		var zactionzoneaxle = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
		var zactionzoneaxlepole = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'));
		var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
		if (zactionzoneaxlebase == null) {
			zactionzoneaxlebase = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
			zactionzoneaxlebase.parent = zparent;
			zactionzoneaxlebase.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			zactionzoneaxlebase.rotation = new BABYLON.Vector3(0,0,0);
			zactionzoneaxlebase.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxle == null) {
			WTW.actionZones[zactionzoneind].status = 0;
			zactionzoneaxle = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
			zactionzoneaxle.parent = zactionzoneaxlebase;
			zactionzoneaxle.position = new BABYLON.Vector3(zaxispositionx+4, zaxispositiony-8, zaxispositionz);
			zactionzoneaxle.rotation = new BABYLON.Vector3(0,WTW.getRadians(-90),0);
			zactionzoneaxle.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxlepole == null && WTW.adminView == 1) {
			var zmolddef4 = WTW.newMold();
			zmolddef4.shape = 'box';
			zmolddef4.covering = 'texture';
			zmolddef4.scaling.x = .20;
			zmolddef4.scaling.y = .20;
			zmolddef4.scaling.z = 10;
			zmolddef4.graphics.texture.id = '7orpcjosyct5b1bf';
			zmolddef4.graphics.texture.path = '/content/system/stock/vaxis-512x512.png';
			zmolddef4.opacity = 1;
			zmolddef4.parentname = zactionzonename.replace('-actionzone-','-actionzoneaxle-');
			zactionzoneaxlepole = WTW.addMold(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), zmolddef4, zmolddef4.parentname, zmolddef4.covering);
			zactionzoneaxlepole.isPickable = false;
			zactionzoneaxlepole.checkCollisions = false;
			zactionzoneaxlepole.rotation.x = WTW.getRadians(90);
			zactionzoneaxlepole.position.y += 5;
		}
		if (zactionzoneaxlebase2 == null) {
			zactionzoneaxlebase2 = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
			zactionzoneaxlebase2.parent = zactionzoneaxle;
			zactionzoneaxlebase2.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxlebase2.rotation = new BABYLON.Vector3(0, WTW.getRadians(-90), 0);
			zactionzoneaxlebase2.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzone == null) {
			var zmolddef5 = WTW.newMold();
			zmolddef5.shape = zactionzonedef.actionzoneshape;
			zmolddef5.covering = 'hidden';
			zmolddef5.position.x = zpositionx;
			zmolddef5.position.y = zpositiony;
			zmolddef5.position.z = zpositionz;
			zmolddef5.scaling.x = zactionzonedef.scaling.x;
			zmolddef5.scaling.y = zactionzonedef.scaling.y;
			zmolddef5.scaling.z = zactionzonedef.scaling.z;
			zmolddef5.subdivisions = 12;
			zmolddef5.opacity = 0;
			zmolddef5.parentname = zparentname;
			zactionzone = WTW.addMold(zactionzonename, zmolddef5, zmolddef5.parentname, zmolddef5.covering);
			zactionzone.isPickable = false;
			zactionzone.checkCollisions = false;
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == 'Action Zones are Shown') {
				WTW.setOpacity(zactionzonename, .2);
				WTW.setOpacity(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), 1);
			}
		}
		WTW.actionZones[zactionzoneind].shown = '2';	
	} catch (ex) {
		WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzoneSeat=' + ex.message);
	}
	return zactionzone;
}

WTWJS.prototype.addActionzonePassengerSeat = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* passengerseat - (work in progress) combo of seat and ridealong - seat functionality with the addition of parenting to mold for ridealong movement */
	var zactionzone;
	try {
		var zparentname = zactionzonedef.parentname;
		var zparent = WTW.getMeshOrNodeByID(zparentname);
		var zpositionx = Number(zactionzonedef.position.x);
		var zpositiony = Number(zactionzonedef.position.y);
		var zpositionz = Number(zactionzonedef.position.z);
		var zaxispositionx = Number(zactionzonedef.axis.position.x);
		var zaxispositiony = Number(zactionzonedef.axis.position.y);
		var zaxispositionz = Number(zactionzonedef.axis.position.z);
		var zaxisrotx = Number(zactionzonedef.axis.rotation.x);
		var zaxisroty = Number(zactionzonedef.axis.rotation.y);
		var zaxisrotz = Number(zactionzonedef.axis.rotation.z);
		zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
		var zactionzoneaxlebase = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
		var zactionzoneaxle = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
		var zactionzoneaxlepole = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'));
		var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
		if (zactionzoneaxlebase == null) {
			zactionzoneaxlebase = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
			zactionzoneaxlebase.parent = zparent;
			zactionzoneaxlebase.position = new BABYLON.Vector3(zaxispositionx, zaxispositiony, zaxispositionz);
			zactionzoneaxlebase.rotation = new BABYLON.Vector3(0,0,0);
			zactionzoneaxlebase.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxle == null) {
			WTW.actionZones[zactionzoneind].status = 0;
			zactionzoneaxle = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
			zactionzoneaxle.parent = zactionzoneaxlebase;
			zactionzoneaxle.position = new BABYLON.Vector3(zaxispositionx, zaxispositiony, zaxispositionz);
			zactionzoneaxle.rotation = new BABYLON.Vector3(WTW.getRadians(zaxisrotx), WTW.getRadians(zaxisroty), WTW.getRadians(zaxisrotz));
			zactionzoneaxle.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxlepole == null && WTW.adminView == 1) {
			var zmolddef4 = WTW.newMold();
			zmolddef4.shape = 'box';
			zmolddef4.covering = 'texture';
			zmolddef4.scaling.x = .20;
			zmolddef4.scaling.y = .20;
			zmolddef4.scaling.z = 10;
			zmolddef4.graphics.texture.id = '7orpcjosyct5b1bf';
			zmolddef4.graphics.texture.path = '/content/system/stock/vaxis-512x512.png';
			zmolddef4.opacity = 0;
			zmolddef4.parentname = zactionzonename.replace('-actionzone-','-actionzoneaxle-');
			zactionzoneaxlepole = WTW.addMold(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), zmolddef4, zmolddef4.parentname, zmolddef4.covering);
			zactionzoneaxlepole.position.z = 5;
			zactionzoneaxlepole.isPickable = false;
			zactionzoneaxlepole.checkCollisions = false;
		}
		if (zactionzoneaxlebase2 == null) {
			zactionzoneaxlebase2 = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
			zactionzoneaxlebase2.parent = zactionzoneaxle;
			zactionzoneaxlebase2.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxlebase2.rotation = new BABYLON.Vector3(0,0,0);
			zactionzoneaxlebase2.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzone == null) {
			var zmolddef5 = WTW.newMold();
			zmolddef5.shape = zactionzonedef.actionzoneshape;
			zmolddef5.covering = 'hidden';
			zmolddef5.position.x = zpositionx;
			zmolddef5.position.y = zpositiony;
			zmolddef5.position.z = zpositionz;
			zmolddef5.scaling.x = zactionzonedef.scaling.x;
			zmolddef5.scaling.y = zactionzonedef.scaling.y;
			zmolddef5.scaling.z = zactionzonedef.scaling.z;
			zmolddef5.subdivisions = 12;
			zmolddef5.opacity = 0;
			zmolddef5.parentname = zparentname;
			zactionzone = WTW.addMold(zactionzonename, zmolddef5, zmolddef5.parentname, zmolddef5.covering);
			zactionzone.isPickable = false;
			zactionzone.checkCollisions = false;
			zactionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == 'Action Zones are Shown') {
				WTW.setOpacity(zactionzonename, .2);
				WTW.setOpacity(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), 1);
			}
		}
		WTW.actionZones[zactionzoneind].shown = '2';		
	} catch (ex) {
		WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzonePassengerSeat=' + ex.message);
	}
	return zactionzone;
}

WTWJS.prototype.addActionzoneDriverSeat = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* driverseat - (work in progress) seat expansion with heads up display for driving, animations for steering, and ridealong */
	var zactionzone;
	try {
		var zparentname = zactionzonedef.parentname;
		var zparent = WTW.getMeshOrNodeByID(zparentname);
		var zpositionx = Number(zactionzonedef.position.x);
		var zpositiony = Number(zactionzonedef.position.y);
		var zpositionz = Number(zactionzonedef.position.z);
		var zaxispositionx = Number(zactionzonedef.axis.position.x);
		var zaxispositiony = Number(zactionzonedef.axis.position.y);
		var zaxispositionz = Number(zactionzonedef.axis.position.z);
		var zaxisrotx = Number(zactionzonedef.axis.rotation.x);
		var zaxisroty = Number(zactionzonedef.axis.rotation.y);
		var zaxisrotz = Number(zactionzonedef.axis.rotation.z);
		zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
		var zactionzoneaxlebase = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
		var zactionzoneaxle = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
		var zactionzoneaxlepole = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'));
		var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
		if (zactionzoneaxlebase == null) {
			zactionzoneaxlebase = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
			zactionzoneaxlebase.parent = zparent;
			zactionzoneaxlebase.position = new BABYLON.Vector3(zaxispositionx, zaxispositiony, zaxispositionz);
			zactionzoneaxlebase.rotation = new BABYLON.Vector3(0,0,0);
			zactionzoneaxlebase.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxle == null) {
			WTW.actionZones[zactionzoneind].status = 0;
			zactionzoneaxle = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
			zactionzoneaxle.parent = zactionzoneaxlebase;
			zactionzoneaxle.position = new BABYLON.Vector3(zaxispositionx, zaxispositiony, zaxispositionz);
			zactionzoneaxle.rotation = new BABYLON.Vector3(WTW.getRadians(zaxisrotx), WTW.getRadians(zaxisroty), WTW.getRadians(zaxisrotz));
			zactionzoneaxle.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxlepole == null && WTW.adminView == 1) {
			var zmolddef4 = WTW.newMold();
			zmolddef4.shape = 'box';
			zmolddef4.covering = 'texture';
			zmolddef4.scaling.x = .20;
			zmolddef4.scaling.y = .20;
			zmolddef4.scaling.z = 10;
			zmolddef4.graphics.texture.id = '7orpcjosyct5b1bf';
			zmolddef4.graphics.texture.path = '/content/system/stock/vaxis-512x512.png';
			zmolddef4.opacity = 0;
			zmolddef4.parentname = zactionzonename.replace('-actionzone-','-actionzoneaxle-');
			zactionzoneaxlepole = WTW.addMold(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), zmolddef4, zmolddef4.parentname, zmolddef4.covering);
			zactionzoneaxlepole.position.z = 5;
			zactionzoneaxlepole.isPickable = false;
			zactionzoneaxlepole.checkCollisions = false;
		}
		if (zactionzoneaxlebase2 == null) {
			zactionzoneaxlebase2 = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
			zactionzoneaxlebase2.parent = zactionzoneaxle;
			zactionzoneaxlebase2.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxlebase2.rotation = new BABYLON.Vector3(0,0,0);
			zactionzoneaxlebase2.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzone == null) {
			var zmolddef5 = WTW.newMold();
			zmolddef5.shape = zactionzonedef.actionzoneshape;
			zmolddef5.covering = 'hidden';
			zmolddef5.position.x = zpositionx;
			zmolddef5.position.y = zpositiony;
			zmolddef5.position.z = zpositionz;
			zmolddef5.scaling.x = zactionzonedef.scaling.x;
			zmolddef5.scaling.y = zactionzonedef.scaling.y;
			zmolddef5.scaling.z = zactionzonedef.scaling.z;
			zmolddef5.subdivisions = 12;
			zmolddef5.opacity = 0;
			zmolddef5.parentname = zparentname;
			zactionzone = WTW.addMold(zactionzonename, zmolddef5, zmolddef5.parentname, zmolddef5.covering);
			zactionzone.isPickable = false;
			zactionzone.checkCollisions = false;
			zactionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == 'Action Zones are Shown') {
				WTW.setOpacity(zactionzonename, .2);
				WTW.setOpacity(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), 1);
			}
		}
		WTW.actionZones[zactionzoneind].shown = '2';		
	} catch (ex) {
		WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzoneDriverSeat=' + ex.message);
	}
	return zactionzone;
}

WTWJS.prototype.addActionzoneDriverTurnAngle = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* driverturnangle - (work in progress) axis used as a parent mold for any mold that should rotate with the driver turning angle */
	var zactionzone;
	try {
		var zparentname = zactionzonedef.parentname;
		var zparent = WTW.getMeshOrNodeByID(zparentname);
		var zpositionx = Number(zactionzonedef.position.x);
		var zpositiony = Number(zactionzonedef.position.y);
		var zpositionz = Number(zactionzonedef.position.z);
		var zaxispositionx = Number(zactionzonedef.axis.position.x);
		var zaxispositiony = Number(zactionzonedef.axis.position.y);
		var zaxispositionz = Number(zactionzonedef.axis.position.z);
		var zaxisrotx = Number(zactionzonedef.axis.rotation.x);
		var zaxisroty = Number(zactionzonedef.axis.rotation.y);
		var zaxisrotz = Number(zactionzonedef.axis.rotation.z);
		var znamepart = zparentname.split('-');
		var zconnectinggridind = -1;
		if (znamepart[2] != null) {
			zconnectinggridind = Number(znamepart[2]);
		}
		zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
		var zactionzoneaxlebase = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
		var zactionzoneaxle = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
		var zactionzoneaxle2 = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxle2-'));
		var zactionzoneaxlepole = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'));
		var zactionzoneaxlepole2 = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlepole2-'));
		var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
		if (zactionzoneaxlebase == null) {
			zactionzoneaxlebase = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
			zactionzoneaxlebase.parent = zparent;
			zactionzoneaxlebase.position = new BABYLON.Vector3(zaxispositionx, zaxispositiony, zaxispositionz);
			zactionzoneaxlebase.rotation = new BABYLON.Vector3(WTW.getRadians(zaxisrotx), WTW.getRadians(zaxisroty), WTW.getRadians(zaxisrotz));
			zactionzoneaxlebase.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxle == null) {
			WTW.actionZones[zactionzoneind].status = 0;
			zactionzoneaxle = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
			zactionzoneaxle.parent = zactionzoneaxlebase;
			zactionzoneaxle.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle.rotation = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxlepole == null && WTW.adminView == 1) {
			var zmolddef4 = WTW.newMold();
			zmolddef4.shape = 'box';
			zmolddef4.covering = 'texture';
			zmolddef4.scaling.x = .20;
			zmolddef4.scaling.y = 20;
			zmolddef4.scaling.z = .20;
			zmolddef4.rotation.x = Number(zactionzonedef.axis.rotation.x);
			zmolddef4.rotation.y = Number(zactionzonedef.axis.rotation.y);
			zmolddef4.rotation.z = Number(zactionzonedef.axis.rotation.z);
			zmolddef4.graphics.texture.id = '7orpcjosyct5b1bf';
			zmolddef4.graphics.texture.path = '/content/system/stock/vaxis-512x512.png';
			zmolddef4.opacity = 0;
			zmolddef4.parentname = zactionzonename.replace('-actionzone-','-actionzoneaxle-');
			zactionzoneaxlepole = WTW.addMold(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), zmolddef4, zmolddef4.parentname, zmolddef4.covering);
			zactionzoneaxlepole.isPickable = false;
			zactionzoneaxlepole.checkCollisions = false;
		}
		if (zactionzoneaxlebase2 == null) {
			zactionzoneaxlebase2 = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
			zactionzoneaxlebase2.parent = zactionzoneaxle;
			zactionzoneaxlebase2.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxlebase2.rotation = new BABYLON.Vector3(WTW.getRadians(-zaxisrotx), WTW.getRadians(-zaxisroty), WTW.getRadians(-zaxisrotz));
			zactionzoneaxlebase2.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzone == null) {
			var zmolddef5 = WTW.newMold();
			zmolddef5.shape = zactionzonedef.actionzoneshape;
			zmolddef5.covering = 'hidden';
			zmolddef5.scaling.x = zactionzonedef.scaling.x;
			zmolddef5.scaling.y = zactionzonedef.scaling.y;
			zmolddef5.scaling.z = zactionzonedef.scaling.z;
			zmolddef5.subdivisions = 20;
			zmolddef5.opacity = 0;
			zmolddef5.parentname = zparentname;
			zactionzone = WTW.addMold(zactionzonename, zmolddef5, zmolddef5.parentname, zmolddef5.covering);
			zactionzone.isPickable = false;
			zactionzone.checkCollisions = false;
			zactionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			var zaxlename = zactionzonename.replace('-actionzone-','-actionzoneaxle-'); 
			try {
				var zcondition1 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var zcurrentfactor = Number(zactionzonedef.axis.rotatedegrees);
					var zcurrentturn = 0;
					var zcurrentconnectinggridind = zconnectinggridind;
					var ztestconnectinggridind = -2;
					var ztest = false;
					if (WTW.drive != null) {
						if (WTW.isNumeric(WTW.drive.currentturn)) {
							zcurrentturn = Number(WTW.drive.currentturn);
						}
						if (WTW.isNumeric(WTW.drive.connectinggridind)) {
							ztestconnectinggridind = Number(WTW.drive.connectinggridind);
						}
						zcurrentturn = zcurrentturn * zcurrentfactor;
						var zcurrentactionzoneind = zactionzoneind;
						var zcurrentdoor = zactionzoneaxle;
						var zcurrentdoorroty = Math.round(WTW.getDegrees(zcurrentdoor.rotation.y) * 100) / 100;
						if (zcurrentdoorroty > 180) {
							zcurrentdoorroty -= 360;
						}
						if (zcurrentconnectinggridind == ztestconnectinggridind) {
							if (WTW.actionZones[zcurrentactionzoneind] != null) {
								if (zcurrentdoorroty < Math.round(zcurrentturn * 100) / 100) {
									ztest = true;
								}
							}
						}
					}
					return ztest;
				});
				var zcondition2 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var zcurrentfactor = Number(zactionzonedef.axis.rotatedegrees);
					var zcurrentturn = 0;
					var zcurrentconnectinggridind = zconnectinggridind;
					var ztestconnectinggridind = -2;
					var ztest = false;
					if (WTW.drive != null) {
						if (WTW.isNumeric(WTW.drive.currentturn)) {
							zcurrentturn = Number(WTW.drive.currentturn);
						}
						if (WTW.isNumeric(WTW.drive.connectinggridind)) {
							ztestconnectinggridind = Number(WTW.drive.connectinggridind);
						}
						zcurrentturn = zcurrentturn * zcurrentfactor;
						var zcurrentactionzoneind = zactionzoneind;
						var zcurrentdoor = zactionzoneaxle;
						var zcurrentdoorroty = Math.round(WTW.getDegrees(zcurrentdoor.rotation.y) * 100) / 100;
						if (zcurrentdoorroty > 180) {
							zcurrentdoorroty -= 360;
						}
						if (zcurrentconnectinggridind == ztestconnectinggridind) {
							if (WTW.actionZones[zcurrentactionzoneind] != null) {
								if (zcurrentdoorroty > Math.round(zcurrentturn * 100) / 100) {
									ztest = true;
								}
							}
						}
					}
					return ztest;
				});
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, zactionzoneaxle, 'rotation.y', 0.1, zcondition1)); 
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, zactionzoneaxle, 'rotation.y', -0.1, zcondition2));
				WTW.actionZones[zactionzoneind].status = 1;
			} catch (ex) {
			}
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == 'Action Zones are Shown') {
				WTW.setOpacity(zactionzonename, .2);
				WTW.setOpacity(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), 1);
			}
		}
		WTW.actionZones[zactionzoneind].shown = '2';
	} catch (ex) {
		WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzoneDriverTurnAngle=' + ex.message);
	}
	return zactionzone;
}

WTWJS.prototype.addActionzoneDriverTurningWheel = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* driverturningwheel - (work in progress) axis used as a parent mold for any mold that should rotate with the driver turning angle with the additional rotation of movement tires */
	var zactionzone;
	try {
		var zparentname = zactionzonedef.parentname;
		var zparent = WTW.getMeshOrNodeByID(zparentname);
		var zpositionx = Number(zactionzonedef.position.x);
		var zpositiony = Number(zactionzonedef.position.y);
		var zpositionz = Number(zactionzonedef.position.z);
		var zaxispositionx = Number(zactionzonedef.axis.position.x);
		var zaxispositiony = Number(zactionzonedef.axis.position.y);
		var zaxispositionz = Number(zactionzonedef.axis.position.z);
		var zaxisrotx = Number(zactionzonedef.axis.rotation.x);
		var zaxisroty = Number(zactionzonedef.axis.rotation.y);
		var zaxisrotz = Number(zactionzonedef.axis.rotation.z);
		var znamepart = zparentname.split('-');
		var zconnectinggridind = -1;
		if (znamepart[2] != null) {
			zconnectinggridind = Number(znamepart[2]);
		}
		zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
		var zactionzoneaxlebase = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
		var zactionzoneaxle = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
		var zactionzoneaxle2 = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxle2-'));
		var zactionzoneaxlepole = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'));
		var zactionzoneaxlepole2 = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlepole2-'));
		var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
		if (zactionzoneaxlebase == null) {
			zactionzoneaxlebase = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
			zactionzoneaxlebase.parent = zparent;
			zactionzoneaxlebase.position = new BABYLON.Vector3(zaxispositionx, zaxispositiony, zaxispositionz);
			zactionzoneaxlebase.rotation = new BABYLON.Vector3(WTW.getRadians(zaxisrotx), WTW.getRadians(zaxisroty), WTW.getRadians(zaxisrotz));
			zactionzoneaxlebase.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxle == null) {
			WTW.actionZones[zactionzoneind].status = 0;
			zactionzoneaxle = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
			zactionzoneaxle.parent = zactionzoneaxlebase;
			zactionzoneaxle.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle.rotation = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxlepole == null && WTW.adminView == 1) {
			var zmolddef4 = WTW.newMold();
			zmolddef4.shape = 'box';
			zmolddef4.covering = 'texture';
			zmolddef4.scaling.x = .20;
			zmolddef4.scaling.y = 20;
			zmolddef4.scaling.z = .20;
			zmolddef4.rotation.x = Number(zactionzonedef.axis.rotation.x);
			zmolddef4.rotation.y = Number(zactionzonedef.axis.rotation.y);
			zmolddef4.rotation.z = Number(zactionzonedef.axis.rotation.z);
			zmolddef4.graphics.texture.id = '7orpcjosyct5b1bf';
			zmolddef4.graphics.texture.path = '/content/system/stock/vaxis-512x512.png';
			zmolddef4.opacity = 0;
			zmolddef4.parentname = zactionzonename.replace('-actionzone-','-actionzoneaxle-');
			zactionzoneaxlepole = WTW.addMold(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), zmolddef4, zmolddef4.parentname, zmolddef4.covering);
			zactionzoneaxlepole.isPickable = false;
			zactionzoneaxlepole.checkCollisions = false;
		}
		if (zactionzoneaxlebase2 == null) {
			zactionzoneaxlebase2 = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
			zactionzoneaxlebase2.parent = zactionzoneaxle;
			zactionzoneaxlebase2.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxlebase2.rotation = new BABYLON.Vector3(WTW.getRadians(-zaxisrotx), WTW.getRadians(-zaxisroty), WTW.getRadians(-zaxisrotz));
			zactionzoneaxlebase2.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxle2 == null) {
			WTW.actionZones[zactionzoneind].status = 0;
			zactionzoneaxle2 = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxle2-'));
			zactionzoneaxle2.parent = zactionzoneaxlebase2;
			zactionzoneaxle2.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle2.rotation = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle2.scaling = new BABYLON.Vector3(1,1,1);
			try {
				var zcondition3 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var zcurrentfactor = Number(zactionzonedef.axis.rotatedegrees);
					var zcurrentspeed = 0;
					var zcurrentdirection = 1;
					var zcurrentconnectinggridind = zconnectinggridind;
					var ztestconnectinggridind = -2;
					if (WTW.drive != null) {
						if (WTW.isNumeric(WTW.drive.currentspeed)) {
							zcurrentspeed = Number(WTW.drive.currentspeed);
						}
						if (WTW.isNumeric(WTW.drive.currentdirection)) {
							zcurrentdirection = Number(WTW.drive.currentdirection);
						}
						if (WTW.isNumeric(WTW.drive.connectinggridind)) {
							ztestconnectinggridind = Number(WTW.drive.connectinggridind);
						}
						zcurrentspeed = zcurrentspeed / 100;
						var ztest = false;
						var zcurrentactionzoneind = zactionzoneind;
						if (zcurrentconnectinggridind == ztestconnectinggridind) {
							if (zcurrentdirection == 1) {
								if (WTW.actionZones[zcurrentactionzoneind] != null) {
									if (zcurrentspeed != 0) {
										ztest = true;
									}
								}
							}
						}
					}
					return ztest;
				});
				var zcondition4 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var zcurrentfactor = Number(zactionzonedef.axis.rotatedegrees);
					var zcurrentspeed = 0;
					var zcurrentdirection = 1;
					var zcurrentconnectinggridind = zconnectinggridind;
					var ztestconnectinggridind = -2;
					var ztest = false;
					if (WTW.drive != null) {
						if (WTW.isNumeric(WTW.drive.currentspeed)) {
							zcurrentspeed = Number(WTW.drive.currentspeed);
						}
						if (WTW.isNumeric(WTW.drive.currentdirection)) {
							zcurrentdirection = Number(WTW.drive.currentdirection);
						}
						if (WTW.isNumeric(WTW.drive.connectinggridind)) {
							ztestconnectinggridind = Number(WTW.drive.connectinggridind);
						}
						zcurrentspeed = zcurrentspeed / 100;
						var zcurrentactionzoneind = zactionzoneind;
						if (zcurrentconnectinggridind == ztestconnectinggridind) {
							if (zcurrentdirection == -1) {
								if (WTW.actionZones[zcurrentactionzoneind] != null) {
									if (zcurrentspeed != 0) {
										ztest = true;
									}
								}
							}
						}
					}
					return ztest;
				});
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, zactionzoneaxle, 'rotation.z', -1, zcondition3)); 
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, zactionzoneaxle, 'rotation.z', 1, zcondition4)); 
			} catch (ex) {
			}
		}
		if (zactionzoneaxlepole2 == null && WTW.adminView == 1) {
			var zmolddef7 = WTW.newMold();
			zmolddef7.shape = 'box';
			zmolddef7.covering = 'texture';
			zmolddef7.scaling.x = .20;
			zmolddef7.scaling.y = .20;
			zmolddef7.scaling.z = 20;
			zmolddef7.rotation.x = Number(zactionzonedef.axis.rotation.x);
			zmolddef7.rotation.y = Number(zactionzonedef.axis.rotation.y);
			zmolddef7.rotation.z = Number(zactionzonedef.axis.rotation.z);
			zmolddef7.graphics.texture.id = '7orpcjosyct5b1bf';
			zmolddef7.graphics.texture.path = '/content/system/stock/vaxis-512x512.png';
			zmolddef7.opacity = 0;
			zmolddef7.parentname = zactionzonename.replace('-actionzone-','-actionzoneaxle-');
			zactionzoneaxlepole2 = WTW.addMold(zactionzonename.replace('-actionzone-','-actionzoneaxlepole2-'), zmolddef7, zmolddef7.parentname, zmolddef7.covering);
			zactionzoneaxlepole2.isPickable = false;
			zactionzoneaxlepole2.checkCollisions = false;
		}
		if (zactionzone == null) {
			var zmolddef5 = WTW.newMold();
			zmolddef5.shape = zactionzonedef.actionzoneshape;
			zmolddef5.covering = 'hidden';
			zmolddef5.scaling.x = zactionzonedef.scaling.x;
			zmolddef5.scaling.y = zactionzonedef.scaling.y;
			zmolddef5.scaling.z = zactionzonedef.scaling.z;
			zmolddef5.subdivisions = 20;
			zmolddef5.opacity = 0;
			zmolddef5.parentname = zparentname;
			zactionzone = WTW.addMold(zactionzonename, zmolddef5, zmolddef5.parentname, zmolddef5.covering);
			zactionzone.isPickable = false;
			zactionzone.checkCollisions = false;
			zactionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			var zaxlename = zactionzonename.replace('-actionzone-','-actionzoneaxle-'); 
			try {
				var zcondition1 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var zcurrentfactor = Number(zactionzonedef.axis.rotatedegrees);
					var zcurrentturn = 0;
					var zcurrentconnectinggridind = zconnectinggridind;
					var ztestconnectinggridind = -2;
					var ztest = false;
					if (WTW.drive != null) {
						if (WTW.isNumeric(WTW.drive.currentturn)) {
							zcurrentturn = Number(WTW.drive.currentturn);
						}
						if (WTW.isNumeric(WTW.drive.connectinggridind)) {
							ztestconnectinggridind = Number(WTW.drive.connectinggridind);
						}
						zcurrentturn = zcurrentturn * zcurrentfactor;
						var zcurrentactionzoneind = zactionzoneind;
						var zcurrentdoor = zactionzoneaxle;
						var zcurrentdoorroty = Math.round(WTW.getDegrees(zcurrentdoor.rotation.y) * 100) / 100;
						if (zcurrentdoorroty > 180) {
							zcurrentdoorroty -= 360;
						}
						if (zcurrentconnectinggridind == ztestconnectinggridind) {
							if (WTW.actionZones[zcurrentactionzoneind] != null) {
								if (zcurrentdoorroty < Math.round(zcurrentturn * 100) / 100) {
									ztest = true;
								}
							}
						}
					}
					return ztest;
				});
				var zcondition2 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var zcurrentfactor = Number(zactionzonedef.axis.rotatedegrees);
					var zcurrentturn = 0;
					var zcurrentconnectinggridind = zconnectinggridind;
					var ztestconnectinggridind = -2;
					var ztest = false;
					if (WTW.drive != null) {
						if (WTW.isNumeric(WTW.drive.currentturn)) {
							zcurrentturn = Number(WTW.drive.currentturn);
						}
						if (WTW.isNumeric(WTW.drive.connectinggridind)) {
							ztestconnectinggridind = Number(WTW.drive.connectinggridind);
						}
						zcurrentturn = zcurrentturn * zcurrentfactor;
						var zcurrentactionzoneind = zactionzoneind;
						var zcurrentdoor = zactionzoneaxle;
						var zcurrentdoorroty = Math.round(WTW.getDegrees(zcurrentdoor.rotation.y) * 100) / 100;
						if (zcurrentdoorroty > 180) {
							zcurrentdoorroty -= 360;
						}
						if (zcurrentconnectinggridind == ztestconnectinggridind) {
							if (WTW.actionZones[zcurrentactionzoneind] != null) {
								if (zcurrentdoorroty > Math.round(zcurrentturn * 100) / 100) {
									ztest = true;
								}
							}
						}
					}
					return ztest;
				});
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, zactionzoneaxle, 'rotation.y', 0.1, zcondition1)); 
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, zactionzoneaxle, 'rotation.y', -0.1, zcondition2));
				WTW.actionZones[zactionzoneind].status = 1;
			} catch (ex) {
			}
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == 'Action Zones are Shown') {
				WTW.setOpacity(zactionzonename, .2);
				WTW.setOpacity(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), 1);
			}
		}
		WTW.actionZones[zactionzoneind].shown = '2';
	} catch (ex) {
		WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzoneDriverTurningWheel=' + ex.message);
	}
	return zactionzone;
}

WTWJS.prototype.addActionzoneDriverWheel = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* driverwheel - (work in progress) rotation of movement tires tied to the acceleration */
	var zactionzone;
	try {
		var zparentname = zactionzonedef.parentname;
		var zparent = WTW.getMeshOrNodeByID(zparentname);
		var zpositionx = Number(zactionzonedef.position.x);
		var zpositiony = Number(zactionzonedef.position.y);
		var zpositionz = Number(zactionzonedef.position.z);
		var zaxispositionx = Number(zactionzonedef.axis.position.x);
		var zaxispositiony = Number(zactionzonedef.axis.position.y);
		var zaxispositionz = Number(zactionzonedef.axis.position.z);
		var zaxisrotx = Number(zactionzonedef.axis.rotation.x);
		var zaxisroty = Number(zactionzonedef.axis.rotation.y);
		var zaxisrotz = Number(zactionzonedef.axis.rotation.z);
		var znamepart = zparentname.split('-');
		var zconnectinggridind = -1;
		if (znamepart[2] != null) {
			zconnectinggridind = Number(znamepart[2]);
		}
		zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
		var zactionzoneaxlebase = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
		var zactionzoneaxle = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
		var zactionzoneaxlepole = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'));
		var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
		if (zactionzoneaxlebase == null) {
			zactionzoneaxlebase = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase-'));
			zactionzoneaxlebase.parent = zparent;
			zactionzoneaxlebase.position = new BABYLON.Vector3(zaxispositionx, zaxispositiony, zaxispositionz);
			zactionzoneaxlebase.rotation = new BABYLON.Vector3(WTW.getRadians(zaxisrotx), WTW.getRadians(zaxisroty), WTW.getRadians(zaxisrotz));
			zactionzoneaxlebase.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzoneaxle == null) {
			WTW.actionZones[zactionzoneind].status = 0;
			zactionzoneaxle = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxle-'));
			zactionzoneaxle.parent = zactionzoneaxlebase;
			zactionzoneaxle.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle.rotation = new BABYLON.Vector3(0,0,0);
			zactionzoneaxle.scaling = new BABYLON.Vector3(1,1,1);
			try {
				var zcondition3 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var zcurrentfactor = Number(zactionzonedef.axis.rotatedegrees);
					var zcurrentspeed = 0;
					var zcurrentdirection = 1;
					var zcurrentconnectinggridind = zconnectinggridind;
					var ztestconnectinggridind = -2;
					var ztest = false;
					if (WTW.drive != null) {
						if (WTW.isNumeric(WTW.drive.currentspeed)) {
							zcurrentspeed = Number(WTW.drive.currentspeed);
						}
						if (WTW.isNumeric(WTW.drive.currentdirection)) {
							zcurrentdirection = Number(WTW.drive.currentdirection);
						}
						if (WTW.isNumeric(WTW.drive.connectinggridind)) {
							ztestconnectinggridind = Number(WTW.drive.connectinggridind);
						}
						zcurrentspeed = zcurrentspeed / 100;
						var zcurrentactionzoneind = zactionzoneind;
						if (zcurrentconnectinggridind == ztestconnectinggridind) {
							if (zcurrentdirection == 1) {
								if (WTW.actionZones[zcurrentactionzoneind] != null) {
									if (zcurrentspeed != 0) {
										ztest = true;
									}
								}
							}
						}
					}
					return ztest;
				});
				var zcondition4 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var zcurrentfactor = Number(zactionzonedef.axis.rotatedegrees);
					var zcurrentspeed = 0;
					var zcurrentdirection = 1;
					var zcurrentconnectinggridind = zconnectinggridind;
					var ztestconnectinggridind = -2;
					var ztest = false;
					if (WTW.drive != null) {
						if (WTW.isNumeric(WTW.drive.currentspeed)) {
							zcurrentspeed = Number(WTW.drive.currentspeed);
						}
						if (WTW.isNumeric(WTW.drive.currentdirection)) {
							zcurrentdirection = Number(WTW.drive.currentdirection);
						}
						if (WTW.isNumeric(WTW.drive.connectinggridind)) {
							ztestconnectinggridind = Number(WTW.drive.connectinggridind);
						}
						zcurrentspeed = zcurrentspeed / 100;
						var zcurrentactionzoneind = zactionzoneind;
						if (zcurrentconnectinggridind == ztestconnectinggridind) {
							if (zcurrentdirection == -1) {
								if (WTW.actionZones[zcurrentactionzoneind] != null) {
									if (zcurrentspeed != 0) {
										ztest = true;
									}
								}
							}
						}
					}
					return ztest;
				});
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, zactionzoneaxle, 'rotation.z', 1, zcondition3)); 
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, zactionzoneaxle, 'rotation.z', -1, zcondition4)); 
			} catch (ex) {
			}			
		}
		if (zactionzoneaxlepole == null && WTW.adminView == 1) {
			var zmolddef4 = WTW.newMold();
			zmolddef4.shape = 'box';
			zmolddef4.covering = 'texture';
			zmolddef4.scaling.x = .20;
			zmolddef4.scaling.y = .20;
			zmolddef4.scaling.z = 20;
			zmolddef4.rotation.x = Number(zactionzonedef.axis.rotation.x);
			zmolddef4.rotation.y = Number(zactionzonedef.axis.rotation.y);
			zmolddef4.rotation.z = Number(zactionzonedef.axis.rotation.z);
			zmolddef4.graphics.texture.id = '7orpcjosyct5b1bf';
			zmolddef4.graphics.texture.path = '/content/system/stock/vaxis-512x512.png';
			zmolddef4.opacity = 0;
			zmolddef4.parentname = zactionzonename.replace('-actionzone-','-actionzoneaxle-');
			zactionzoneaxlepole = WTW.addMold(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), zmolddef4, zmolddef4.parentname, zmolddef4.covering);
			zactionzoneaxlepole.isPickable = false;
			zactionzoneaxlepole.checkCollisions = false;
		}
		if (zactionzoneaxlebase2 == null) {
			zactionzoneaxlebase2 = new BABYLON.TransformNode(zactionzonename.replace('-actionzone-','-actionzoneaxlebase2-'));
			zactionzoneaxlebase2.parent = zactionzoneaxle;
			zactionzoneaxlebase2.position = new BABYLON.Vector3(0,0,0);
			zactionzoneaxlebase2.rotation = new BABYLON.Vector3(WTW.getRadians(-zaxisrotx), WTW.getRadians(-zaxisroty), WTW.getRadians(-zaxisrotz));
			zactionzoneaxlebase2.scaling = new BABYLON.Vector3(1,1,1);
		}
		if (zactionzone == null) {
			var zmolddef5 = WTW.newMold();
			zmolddef5.shape = zactionzonedef.actionzoneshape;
			zmolddef5.covering = 'hidden';
			zmolddef5.scaling.x = zactionzonedef.scaling.x;
			zmolddef5.scaling.y = zactionzonedef.scaling.y;
			zmolddef5.scaling.z = zactionzonedef.scaling.z;
			zmolddef5.subdivisions = 20;
			zmolddef5.opacity = 0;
			zmolddef5.parentname = zparentname;
			zactionzone = WTW.addMold(zactionzonename, zmolddef5, zmolddef5.parentname, zmolddef5.covering);
			zactionzone.isPickable = false;
			zactionzone.checkCollisions = false;
			zactionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == 'Action Zones are Shown') {
				WTW.setOpacity(zactionzonename, .2);
				WTW.setOpacity(zactionzonename.replace('-actionzone-','-actionzoneaxlepole-'), 1);
			}
		}
		WTW.actionZones[zactionzoneind].shown = '2';
	} catch (ex) {
		WTW.log('core-scripts-actionzones-basicactionzones\r\n addActionzoneDriverWheel=' + ex.message);
	}
	return zactionzone;
}


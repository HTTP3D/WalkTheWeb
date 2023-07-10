/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions provide many of the common functions for browse and admin modes */
/* functions include loading connecting grids, action zones, and molds to the scene, */
/* executing dynamic javascript functions, mold animations, processing queues, save and retrieve database saved settings, and dispose functions */

WTWJS.prototype.resetActivityTimer = function() {
	/* resets the activity timer when avatar moves (determine inactivity timeout) */
	try {
		if (WTW.activityTimer != null) {
			window.clearTimeout(WTW.activityTimer);
			WTW.activityTimer = null;
		}
		if (WTW.isMobile) {
			WTW.activityTimer = window.setTimeout(function () {WTW.noActivityPause();}, 300000);
		} else {
			WTW.activityTimer = window.setTimeout(function () {WTW.noActivityPause();}, 10800000);
		}
		WTW.pluginsResetActivityTimer();
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-resetActivityTimer=' + ex.message);
	}
}

WTWJS.prototype.noActivityPause = function() {
	/* pauses the render cycle used with the activity timer */
	try {
		if (WTW.activityTimer != null) {
			window.clearTimeout(WTW.activityTimer);
			WTW.activityTimer = null;
		}
		WTW.stopRender();
		WTW.resetActivityTimer();
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-noActivityPause=' + ex.message);
	}
}


/* this section sets and loads various connecting grids, action zones, and molds to the scene */

WTWJS.prototype.setShownConnectingGrids = function() {
	/* set the shown connecting grids (the rest remain in the arrays until needed - these are added to scene but invisible) */
	try {
		for (var i = 0; i < WTW.connectingGrids.length; i++) {
			if (WTW.connectingGrids[i] != null) {
				var zshown = '0';
				var zparentshown = '0';
				var zattachactionzoneind = -1;
				var zloadlevel = '2';
				var zloadactionzoneid = '';
				var zloadactionzoneind = -1;
				var zaltloadactionzoneid = '';
				var zloadazstatus = 0;
				var zparentconnectinggridind = -1;
				var zmydist = 5000;
				var zlenmax = 1000;
				if (WTW.connectingGrids[i].shown != undefined) {
					zshown = WTW.connectingGrids[i].shown;
				}
				if (WTW.connectingGrids[i].parentconnectinggridind != undefined) {
					zparentconnectinggridind = WTW.connectingGrids[i].parentconnectinggridind;
				}
				if (WTW.connectingGrids[i].loadactionzoneind != undefined) {
					zloadactionzoneind = Number(WTW.connectingGrids[i].loadactionzoneind);
				}
				if (WTW.connectingGrids[i].altloadactionzoneid != undefined) {
					zaltloadactionzoneid = WTW.connectingGrids[i].altloadactionzoneid;
				}
				if (zloadactionzoneind == -1) {
					if (zaltloadactionzoneid != '') {
						if (zaltloadactionzoneid != '') {
							zloadactionzoneind = WTW.getActionZoneInd(zaltloadactionzoneid, zparentconnectinggridind);
							WTW.connectingGrids[i].loadactionzoneind = zloadactionzoneind;
						}
					} else if (WTW.connectingGrids[i].loadactionzoneid != undefined) {
						zloadactionzoneid = WTW.connectingGrids[i].loadactionzoneid;
						if (zloadactionzoneid != '') {
							zloadactionzoneind = WTW.getActionZoneInd(zloadactionzoneid, i);
							WTW.connectingGrids[i].loadactionzoneind = zloadactionzoneind;
						}
					}
				}
				if (WTW.connectingGrids[i].loadlevel != undefined) {
					zloadlevel = WTW.connectingGrids[i].loadlevel;
				}
				if (WTW.actionZones[zloadactionzoneind] != null) {
					var zloadazlenx = 0;
					var zloadazleny = 0;
					var zloadazlenz = 0;
					if (WTW.isNumeric(WTW.actionZones[zloadactionzoneind].scaling.x)) {
						zloadazlenx = Number(WTW.actionZones[zloadactionzoneind].scaling.x);
					}
					if (WTW.isNumeric(WTW.actionZones[zloadactionzoneind].scaling.y)) {
						zloadazleny = Number(WTW.actionZones[zloadactionzoneind].scaling.y);
					}
					if (WTW.isNumeric(WTW.actionZones[zloadactionzoneind].scaling.z)) {
						zloadazlenz = Number(WTW.actionZones[zloadactionzoneind].scaling.z);
					}
					if (WTW.actionZones[zloadactionzoneind].status != undefined) {
						zloadazstatus = Number(WTW.actionZones[zloadactionzoneind].status);
					}
					zlenmax = Math.max(zloadazlenx, zloadazleny, zloadazlenz) * 1.1;
				}
				if (WTW.connectingGrids[i].attachactionzoneind != undefined) {
					zattachactionzoneind = Number(WTW.connectingGrids[i].attachactionzoneind);
				}
				
				if (WTW.connectingGrids[zparentconnectinggridind] != null) {
					if (WTW.connectingGrids[zparentconnectinggridind].shown != undefined) {
						zparentshown = WTW.connectingGrids[zparentconnectinggridind].shown;
					}
				}
				if (zattachactionzoneind > -1) {
					if (WTW.connectingGrids[i].parentname.indexOf('actionzone') > -1) {
						zparentshown = WTW.actionZones[zattachactionzoneind].shown;
					} else {
						zparentshown = '0';
					}
				} else if (WTW.connectingGrids[i].parentname == '') {
					zparentshown = '2';
					if (zloadlevel == '1') {
						zlenmax = 5000;
					}
				} 
				if (zloadlevel == '1') {
					zmydist = WTW.getMyDistance(Number(WTW.connectingGrids[i].position.x), Number(WTW.connectingGrids[i].position.y), Number(WTW.connectingGrids[i].position.z));
				} else {
					try {
						zmydist = WTW.getBuildingDistance(Number(WTW.connectingGrids[zparentconnectinggridind].position.x), Number(WTW.connectingGrids[zparentconnectinggridind].position.y), Number(WTW.connectingGrids[zparentconnectinggridind].position.z), Number(WTW.connectingGrids[i].position.x), Number(WTW.connectingGrids[i].position.y), Number(WTW.connectingGrids[i].position.z), Number(WTW.connectingGrids[zparentconnectinggridind].rotation.x), Number(WTW.connectingGrids[zparentconnectinggridind].rotation.y), Number(WTW.connectingGrids[zparentconnectinggridind].rotation.z));
					} catch(ex) {
						zmydist = WTW.getMyDistance(Number(WTW.connectingGrids[i].position.x), Number(WTW.connectingGrids[i].position.y), Number(WTW.connectingGrids[i].position.z));
					}
				}
				var zmold = WTW.getMeshOrNodeByID(WTW.connectingGrids[i].moldname);
				if (zloadlevel == '1' || zaltloadactionzoneid == '') {
					if (zmydist < zlenmax && zshown == '0') {
						WTW.connectingGrids[i].status = 2;
						WTW.connectingGrids[i].shown = '1';
						WTW.addMoldToQueue(WTW.connectingGrids[i].moldname, WTW.connectingGrids[i], WTW.connectingGrids[i].parentname, 'hidden',null);
						WTW.getActionZones(i);
					} else if (zmydist < zlenmax && zshown == '2') {
						if (WTW.actionZones[zloadactionzoneind] != null) {
							if (WTW.actionZones[zloadactionzoneind].shown == '0' && zloadazstatus > 1) {
								WTW.actionZones[zloadactionzoneind].shown = '1';
								WTW.addActionZoneToQueue(WTW.actionZones[zloadactionzoneind].moldname, WTW.actionZones[zloadactionzoneind]);
							}
						}
					} else if (zmydist > zlenmax && zshown == '2') {
						WTW.connectingGrids[i].status = 0;
						WTW.connectingGrids[i].shown = '0';
						if (zmold != null) {
							WTW.addDisposeMoldToQueue(WTW.connectingGrids[i].moldname);
						}
					}
				} else if (zloadlevel == '2') {
					if (zshown == '0' && zloadazstatus == 2) {
						WTW.connectingGrids[i].status = 2;
						WTW.connectingGrids[i].shown = '1';
						WTW.addMoldToQueue(WTW.connectingGrids[i].moldname, WTW.connectingGrids[i], WTW.connectingGrids[i].parentname, 'hidden',null);
						WTW.getActionZones(i);
					} else if (zshown == '2' && zloadazstatus == 0) {
						WTW.connectingGrids[i].status = 0;
						WTW.connectingGrids[i].shown = '0';
						if (zmold != null) {
							WTW.addDisposeMoldToQueue(WTW.connectingGrids[i].moldname);
						}
					}
				} else {
					if (zshown == '2') {
						WTW.connectingGrids[i].status = 0;
						WTW.connectingGrids[i].shown = '0';
						if (zmold != null) {
							WTW.addDisposeMoldToQueue(WTW.connectingGrids[i].moldname);
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-setShownConnectingGrids=' + ex.message);
	} 	
}

WTWJS.prototype.setShownActionZones = function() {
	/* set the shown action zones (not shown but added to scene and invisible) */
	try {
		for (var i = 0; i < WTW.actionZones.length; i++) {
			if (WTW.actionZones[i] != null) {
				var zshown = '0';
				var zloadazshown = '0';
				var zloadazstatus = 0;
				var zconnectinggridind = Number(WTW.actionZones[i].connectinggridind);
				var zloadazind = -1;
				var zisazextreme = false;
				if (WTW.actionZones[i].loadactionzoneind != undefined) {
					zloadazind = WTW.actionZones[i].loadactionzoneind;
				}
				if (zloadazind == -1) {
					zloadazind = WTW.getActionZoneInd(WTW.actionZones[i].loadactionzoneid, zconnectinggridind);
					WTW.actionZones[i].loadactionzoneind = zloadazind;
				}
				if (WTW.actionZones[zloadazind] != null) {
					zloadazstatus = Number(WTW.actionZones[zloadazind].status);
					if (WTW.actionZones[zloadazind].shown != undefined) {
						zloadazshown = WTW.actionZones[zloadazind].shown;
					}
				} else {
					if (WTW.isNumeric(WTW.connectingGrids[zconnectinggridind].status)) {
						zloadazstatus = Number(WTW.connectingGrids[zconnectinggridind].status);
					}
				}
				if (WTW.actionZones[i].actionzonetype == 'loadzone' && WTW.actionZones[i].actionzonename.toLowerCase().indexOf('extreme') > -1 && WTW.actionZones[i].actionzonename.toLowerCase().indexOf('custom') == -1) {
					zisazextreme = true;
				}
				if (WTW.actionZones[i].shown != undefined) {
					zshown = WTW.actionZones[i].shown;
				}
				if (WTW.actionZones[i].loadactionzoneid == '') {
					zloadazshown = '2';
				}
				var zmold = WTW.getMeshOrNodeByID(WTW.actionZones[i].moldname);
				if (WTW.actionZones[i].parentname != '') {
					if (zloadazstatus > 1) {
						if (zshown == '0') {
							WTW.actionZones[i].shown = '1';
							WTW.addActionZoneToQueue(WTW.actionZones[i].moldname, WTW.actionZones[i]);
						}
					} else if (zshown == '2') {
						if (zisazextreme) {
							WTW.addUnloadZoneToQueue(i);
						}
						WTW.actionZones[i].shown = '0';
						if (zmold != null) {
							WTW.addDisposeMoldToQueue(WTW.actionZones[i].moldname);
						}
					}
				} else {
					WTW.actionZones[i].shown = '0';
					if (zmold != null) {
						WTW.addDisposeMoldToQueue(WTW.actionZones[i].moldname);
					}
				}
			}
		}	
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-setShownActionZones=' + ex.message);
	} 	
}

WTWJS.prototype.setShownMolds = function() {
	/* set shown molds based on if it should be shown (if avatar is in load zone that mold uses) */
	try {
		/* variable so this process only runs once at a time */
		WTW.checkShownMolds = 1;
		/* load connecting grids as needed */
		WTW.setShownConnectingGrids();
		/* load action zones as needed */
		WTW.setShownActionZones();
		/* variable for seeing if anything is loading */
		var zisloading = false;
		/* load community molds first, then buildings and things */
		/* false means that there were no more community molds loaded this cycle */
		if (WTW.setShownMoldsByWeb('community') == false) {
			if ((WTW.isInitCycle == 0 || communityid == '') || communityid != '') {
				if (WTW.setShownMoldsByWeb('building') == false) {
					if (WTW.setShownMoldsByWeb('thing')) {
						zisloading = true;
						WTW.optimizeScene = 1;
					}
				} else {
					zisloading = true;
					WTW.optimizeScene = 1;
				}
			}
		} else {
			zisloading = true;
			WTW.optimizeScene = 1;
		}
		if (zisloading) {
			scene.blockMaterialDirtyMechanism = true;
		} else {
			scene.blockMaterialDirtyMechanism = false;
			/* scene optimizer only runs after new objects are all loaded to the scene */
			if (WTW.optimizeScene == 1 && WTW.isInitCycle == 0) {
/*				BABYLON.SceneOptimizer.OptimizeAsync(scene); */
/*				BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.ModerateDegradationAllowed(),
				function() {
				   // On success
				}, function() {
				   // FPS target not reached
				});
*/
				WTW.optimizeScene = 0;
			}
		}
		/* after process is complete, reset the global variable so it can be checked again */
		WTW.checkShownMolds = 0;
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-setShownMolds=' + ex.message);
	} 
}

WTWJS.prototype.setShownMoldsByWeb = function(zwebtype) {
	/* each group of molds are checked to be added to scene by action zone */
	var zfound = false;
	try {
		var zwebid = communityid;
		var zmolds = WTW.communitiesMolds
		if (buildingid != '') {
			zwebid = buildingid;
		} else if (thingid != '') {
			zwebid = thingid;
		}
		switch (zwebtype) {
			case 'building':
				zmolds = WTW.buildingMolds;
				break;
			case 'thing':
				zmolds = WTW.thingMolds
				break;
		}
		if (zmolds != null) {
			for (var i = 0; i < zmolds.length; i++) {
				if (zmolds[i] != null) {
					var zshown = '0';
					var zloaded = '0';
					if (zmolds[i].shown != undefined) {
						zshown = zmolds[i].shown;
					}
					if (zmolds[i].loaded != undefined) {
						zloaded = zmolds[i].loaded;
					}
					var zparentmold = WTW.getMeshOrNodeByID(zmolds[i].parentname);
					if (zmolds[i].moldname != undefined) {
						var zmold = WTW.getMeshOrNodeByID(zmolds[i].moldname);
						var znode = WTW.getMeshOrNodeByID(zmolds[i].moldname);
						if (zparentmold != null) {
							var zloadazind = -1;
							var zunloadazind = -1;
							var zloadazstatus = 0;
							var zunloadazstatus = 0;
							var zconnectinggridind = Number(zmolds[i].connectinggridind);
							var zcsgmoldid = zmolds[i].csg.moldid;
							if (zmolds[i].loadactionzoneind != undefined) {
								zloadazind = zmolds[i].loadactionzoneind;
							}
							if (zmolds[i].unloadactionzoneind != undefined) {
								zunloadazind = zmolds[i].unloadactionzoneind;
							}
							if (zloadazind == -1) {
								zloadazind = WTW.getActionZoneInd(zmolds[i].loadactionzoneid, zconnectinggridind);
								zmolds[i].loadactionzoneind = zloadazind;
							}
							if (zunloadazind == -1) {
								zunloadazind = WTW.getActionZoneInd(zmolds[i].unloadactionzoneid, zconnectinggridind);
								zmolds[i].unloadactionzoneind = zunloadazind;
							}
							if (WTW.actionZones[zloadazind] != null) {
								if (WTW.actionZones[zloadazind] != null) {
									zloadazstatus = WTW.actionZones[zloadazind].status;
								}
							}
							if (WTW.actionZones[zunloadazind] != null) {
								if (WTW.actionZones[zunloadazind] != null) {
									zunloadazstatus = WTW.actionZones[zunloadazind].status;
								}
							}
							if (zloadazstatus == 0 || zunloadazstatus == 2) {
								if (zshown != '0') {
									zmolds[i].shown = '0';
									WTW.addDisposeMoldToQueue(zmolds[i].moldname);
								}
							} else if (zloadazstatus == 2 && zunloadazstatus != 2 && zshown == '0' && zmold == null) {
								WTW.setMoldActionZoneParent(zmolds, i);
								if (zcsgmoldid == '') {
									zmolds[i].shown = '1';
									WTW.addMoldToQueue(zmolds[i].moldname, zmolds[i], zmolds[i].parentname, zmolds[i].covering,null);
									zfound = true;
								}
							} else if (zloadazstatus == 2 && zunloadazstatus != 2 && zshown == '1' && zloaded == '0') {
								/* mold has not finished loading */
								zfound = true;
							}
							if (WTW.adminView == 1) {
								if (dGet('wtw_bmerged') != null && zcsgmoldid != '') {
									if (zwebid != '' && dGet('wtw_bmerged').title == 'Merged Shapes are Shown' && zmold == null) {
										WTW.addMold(zmolds[i].moldname, zmolds[i], zmolds[i].parentname, zmolds[i].covering);
										zfound = true;
									} else if (dGet('wtw_bmerged').title == 'Merged Shapes are Hidden' && zmold != null) {
										WTW.addDisposeMoldToQueue(zmolds[i].moldname);
									}
								}
							}
						} else {
							if (zmold != null || znode != null) {
								WTW.addDisposeMoldToQueue(zmolds[i].moldname);
							}
							if (zshown == '2') {
								zmolds[i].shown = '0';
							}
						}
						if (zshown == '2' && zmolds[i].shape == 'video') {
							var zvideomold = WTW.getMeshOrNodeByID(zmolds[i].moldname + '-mainvideo');
							if (zvideomold != null) {
								if (typeof zvideomold.material.diffuseTexture.video.pause == 'function') {
									zvideomold.material.diffuseTexture.video.volume = WTW.getSoundVolumeLinear(zmolds[i].moldname, zmolds[i].sound.maxdistance);
								}
							}
						}
					}
				}
			}
		}	
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-setShownMoldsByWeb=' + ex.message);
	} 
	return zfound;
}

WTWJS.prototype.setMoldActionZoneParent = function(zmolds, zmoldind) {
	/* set the mold parent to action zone when needed (example: mold is part of a swinging door) */
	try {
		if (zmolds[zmoldind].moldid != '') {
			var zparentname = '';
			var zattachmoldind = '-1';
			for (var j = 0; j < WTW.actionZones.length; j++) {
				if (WTW.actionZones[j] != null) {
					if (WTW.actionZones[j].parentname == zmolds[zmoldind].parentname) {
						var zactionzonetype = WTW.actionZones[j].actionzonetype;
						if (WTW.actionZones[j].actionzoneid == zmolds[zmoldind].actionzoneid && (zactionzonetype == 'door' || zactionzonetype == 'swingingdoor' || zactionzonetype == 'slidingdoor' || zactionzonetype == 'clickactivatedslidingdoor' || zactionzonetype == 'peoplemover' || zactionzonetype == 'rotate' || zactionzonetype == 'elevator' || zactionzonetype == 'driverturnangle' || zactionzonetype == 'driverwheel')) {
							zparentname = WTW.actionZones[j].moldname.replace('actionzone-', 'actionzoneaxlebase2-');
						} else if (WTW.actionZones[j].actionzoneid == zmolds[zmoldind].actionzoneid && zactionzonetype.indexOf('seat') > -1) {
							zparentname = WTW.actionZones[j].moldname.replace('actionzone-', 'actionzoneaxlebase-');
						} else if (WTW.actionZones[j].actionzoneid == zmolds[zmoldind].actionzoneid && WTW.actionZones[j].zactionzonetype == 'driverturningwheel') {
							zparentname = WTW.actionZones[j].moldname.replace('actionzone-', 'actionzoneaxle2-');
						}
						if (WTW.actionZones[j].attachmoldid == zmolds[zmoldind].moldid) {
							zattachmoldind = j;
						}
					}
				}
			}	
			if (zparentname != '') {
				zmolds[zmoldind].parentname = zparentname;
			}
			zmolds[zmoldind].attachmoldind = zattachmoldind;
			if (zattachmoldind > -1) {
				if (WTW.actionZones[zattachmoldind] != null) {
					WTW.actionZones[zattachmoldind].parentname = zmolds[zmoldind].moldname;
				}
			}		
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-setMoldActionZoneParent=' + ex.message);
	} 
}

WTWJS.prototype.getMoldCSG = function(zmold, zmolddef) {
	/* CSG is constructive solid geometry - this function checks mold for CSG (subtract or combine molds) */
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmold.name);
		if (zmoldnameparts.molds != null) {
			for (var i=0;i < zmoldnameparts.molds.length;i++) {
				if (zmoldnameparts.molds[i] != null) {
					if (zmolddef.moldid == zmoldnameparts.molds[i].csg.moldid) {
						var zcsgmold = WTW.getMeshOrNodeByID(zmoldnameparts.molds[i].moldname);
						if (zcsgmold == null) {
							zcsgmold = WTW.addMold(zmoldnameparts.molds[i].moldname, zmoldnameparts.molds[i], zmoldnameparts.molds[i].parentname, 'hidden');
						}
						zmoldnameparts.molds[i].shown = '2';
						/* if found, execute the CSG */
						zmold = WTW.processCSGAction(zmolddef.moldname, zmold, zcsgmold, zmoldnameparts.molds[i].csg.action, zmolddef);
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-getMoldCSG=' + ex.message);
	} 
	return zmold;
}

WTWJS.prototype.processCSGAction = function(zcsgmoldname, zcsgmold, zmold, zcsgaction, zmolddef) {
	/* CSG is constructive solid geometry - this function completes the mold combination csg process */
	try {
		var zparentobj = zcsgmold.parent;
		var zcsgmaterial = zcsgmold.material;
		var zcsgmain = BABYLON.CSG.FromMesh(zcsgmold);
		var zcsgsub = BABYLON.CSG.FromMesh(zmold);
		var zcsgmerge;
		var zcheckcollisions = zcsgmain.checkCollisions;
		switch (zcsgaction.toLowerCase()) {
			case 'subtract':
				zcsgmerge = zcsgmain.subtract(zcsgsub);
				break;
			case 'intersect':
				zcsgmerge = zcsgmain.intersect(zcsgsub);
				break;
			case 'union':
				zcsgmerge = zcsgmain.union(zcsgsub);
				break;
			default:
				zcsgmerge = zcsgmain.subtract(zcsgsub);
				break;
		}
		zcsgmold.dispose();
		zmold.dispose();
		var znewmold = zcsgmerge.toMesh(zcsgmoldname, zcsgmaterial, scene, false);
		var zalttag = '';
		znewmold.parent = zparentobj;
		if (zmolddef.alttag.name != undefined) {
			zalttag = zmolddef.alttag.name;
		}
		znewmold.checkCollisions = zcheckcollisions;
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-processCSGAction=' + ex.message);
	} 
	return znewmold;
}


/* sound added to 3D Scene */

WTWJS.prototype.loadSoundToMold = function(zmold, zmoldname, zsoundid, zsoundpath, zsoundloop, zsoundattenuation, zsoundmaxdistance, zsoundrollofffactor, zsoundrefdistance, zeventind) {
	/* load sound to a particular mold (mesh) */
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		if (zmold != null && zsoundid != '') {
			/* check settings or set defaults */
			var zsoundurl = '/connect/sound.php?soundid=' + zsoundid;
			if (zsoundpath != '') {
				zsoundurl = zsoundpath;
			}
			var zsoundautoplay = false;
			if (WTW.soundMute == false && zeventind == -1) {
				zsoundautoplay = true;
			}
			if (zsoundloop != '1') {
				zsoundloop = false;
			} else {
				zsoundloop = true;
			}
			if (zsoundmaxdistance != '') {
				if (WTW.isNumeric(zsoundmaxdistance)) {
					zsoundmaxdistance = Number(zsoundmaxdistance);
				} else {
					zsoundmaxdistance = 100;
				}
			} else {
				zsoundmaxdistance = 100;
			}
			if (zsoundrollofffactor != '') {
				if (WTW.isNumeric(zsoundrollofffactor)) {
					zsoundrollofffactor = Number(zsoundrollofffactor);
				} else {
					zsoundrollofffactor = 1;
				}
			} else {
				zsoundrollofffactor = 1;
			}
			if (zsoundrefdistance != '') {
				if (WTW.isNumeric(zsoundrefdistance)) {
					zsoundrefdistance = Number(zsoundrefdistance);
				} else {
					zsoundrefdistance = 1;
				}
			} else {
				zsoundrefdistance = 1;
			}
			if (zsoundattenuation != '' && zsoundattenuation != 'none') {
				/* request to load sound */
				var zrequest = new XMLHttpRequest();
				zrequest.open('GET', zsoundurl, true);
				zrequest.responseType = 'arraybuffer';
				zrequest.onreadystatechange = function () {
					if (zrequest.readyState == 4) {
						if (zrequest.status == 200) {
							var zaddsound = true;
							if (zeventind == -1) {
								/* sound is attached to a mold (mesh) */
								if (zmoldnameparts.molds[zmoldnameparts.moldind] != null) {
									if (zmoldnameparts.molds[zmoldnameparts.moldind].sound != null) {
										/* check if sound is already loaded */
										if (zmoldnameparts.molds[zmoldnameparts.moldind].sound.sound != null && zmoldnameparts.molds[zmoldnameparts.moldind].sound.sound != '') {
											zaddsound = false;
										}
									}
								}
							} else {
								/* sound is attached to an animation for a mold (mesh) */
								if (WTW.moldEvents[zeventind] != null) {
									/* check if sound is already loaded */
									if (WTW.moldEvents[zeventind].sound != null && WTW.moldEvents[zeventind].sound != '') {
										zaddsound = false;
									}
								}
							}
							/* load sound if it is not already loaded */
							if (zaddsound) {
								/* load and play sound (if autoplay) with passed settings */
								var zsound = new BABYLON.Sound(zmoldname + 'sound', zrequest.response, scene, null, {
									loop: zsoundloop, 
									autoplay: zsoundautoplay, 
									spatialSound: true,
									distanceModel: zsoundattenuation, 
									maxDistance : zsoundmaxdistance,
									rolloffFactor: zsoundrollofffactor,
									refDistance : zsoundrefdistance
								});
								zsound.attachToMesh(zmold);
								/* if mute on menu is set, pause sound */
								if (WTW.soundMute == true) {
									zsound.pause();
								}
								if (zeventind == -1) {
									if (zmoldnameparts.molds[zmoldnameparts.moldind] != null) {
										/* set the sound object as part of the mold array so it can be controlled again later (start, stop, pause, unload) */
										zmoldnameparts.molds[zmoldnameparts.moldind].sound.sound = zsound;
									}
								} else {
									if (WTW.moldEvents[zeventind] != null) {
										/* set the sound object as part of the mold events (animations) array so it can be controlled again later (start, stop, pause, unload) */
										WTW.moldEvents[zeventind].sound = zsound;
									}
								}
							}
						}
					}
				};
				zrequest.send(null);
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-loadSoundToMold=' + ex.message);
	}
}

WTWJS.prototype.getSoundVolumeLinear = function(zmoldname, zmaxdistance) {
	/* returns volume based on linear distance from sound source */
	var zvolume = 0;
	try {
		if (WTW.soundMute == false) {
			var zmold = WTW.getMeshOrNodeByID(zmoldname);
			if (zmold != null) {
				if (WTW.isNumeric(zmaxdistance)) {
					zmaxdistance = Number(zmaxdistance);
				} else {
					zmaxdistance = 100;
				}
				zmold.computeWorldMatrix(true);
				var zabspos = zmold.getAbsolutePosition();
				if (WTW.myAvatar != null) {
					var zdist = Math.round(Math.sqrt(Math.pow(zabspos.x-WTW.myAvatar.position.x, 2) + Math.pow(zabspos.y-WTW.myAvatar.position.y, 2) + Math.pow(zabspos.z-WTW.myAvatar.position.z, 2)));
					if (zdist < zmaxdistance) {
						zvolume = 1 - (1 / zmaxdistance * zdist);
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-getSoundVolumeLinear=' + ex.message);
	}
	return zvolume;
}


/* reflections, refractions, and shadows */

WTWJS.prototype.addShadowToMold = function(zmold, zshadowmap) {
	/* add shadow to mold via the shadowmap selected */
	try {
		window.setTimeout(function(){
			var zfound = false;
			var zfoundind = -1;
			var znextind = -1;
			if (zshadowmap != null) {
				if (zshadowmap.getShadowMap() != null) {
					znextind = zshadowmap.getShadowMap().renderList.length;
					for (var i=0; i < zshadowmap.getShadowMap().renderList.length; i++) {
						if (zshadowmap.getShadowMap().renderList[i] == null) {
							if (i < znextind) {
								znextind = i;
							}
						}
						if (zmold != null) {
							if (zmold.name != undefined) {
								if (zshadowmap.getShadowMap().renderList[i].name == zmold.name) {
									zfound = true;
									zfoundind = i;
								}
							}
						}
					}
					if (zfound == false) {
						if (zmold != null) {
							var zopacity = 1;
							if (zmold.material != null) {
								if (zmold.material.alpha != undefined) {
									zopacity = zmold.material.alpha;
								}
							}
							zshadowmap.addShadowCaster(zmold, true);
						}
					}
				}
			}
		},100); 
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-addShadowToMold=' + ex.message);
	} 
}

WTWJS.prototype.addReflection = function(zwatermat) {
	/* add the mold to the reflection / refraction list */
	try {
		if (zwatermat != null) {
			for (var i=0; i < WTW.communitiesMolds.length;i++) {
				if (WTW.communitiesMolds[i] != null) {
					if (WTW.communitiesMolds[i].graphics.waterreflection == '1' || WTW.communitiesMolds[i].moldname.indexOf('terrain') > -1 || WTW.communitiesMolds[i].shape == 'floor' ) {
						var zmold = WTW.getMeshOrNodeByID(WTW.communitiesMolds[i].moldname);
						if (zmold != null) {
							zwatermat.addToRenderList(zmold);
						}
					}
				}
			}
			for (var i=0; i < WTW.buildingMolds.length;i++) {
				if (WTW.buildingMolds[i] != null) {
					if (WTW.buildingMolds[i].graphics.waterreflection == '1') {
						var zmold = WTW.getMeshOrNodeByID(WTW.buildingMolds[i].moldname);
						if (zmold != null) {
							zwatermat.addToRenderList(zmold);
							if (WTW.buildingMolds[i].shape == 'image') {
								var zimagemold = WTW.getMeshOrNodeByID(WTW.buildingMolds[i].moldname + '-mainimage');
								if (zimagemold != null) {
									zwatermat.addToRenderList(zimagemold);
								}
								var zimagehovermold = WTW.getMeshOrNodeByID(WTW.buildingMolds[i].moldname + '-hoverimage');
								if (zimagehovermold != null) {
									zwatermat.addToRenderList(zimagehovermold);
								}
								var zimageclickmold = WTW.getMeshOrNodeByID(WTW.buildingMolds[i].moldname + '-clickimage');
								if (zimageclickmold != null) {
									zwatermat.addToRenderList(zimageclickmold);
								}
							}
						}
					}
				}
			}
			for (var i=0; i < WTW.thingMolds.length;i++) {
				if (WTW.thingMolds[i] != null) {
					if (WTW.thingMolds[i].graphics.waterreflection == '1') {
						var zmold = WTW.getMeshOrNodeByID(WTW.thingMolds[i].moldname);
						if (zmold != null) {
							zwatermat.addToRenderList(zmold);
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-addReflection=' + ex.message);
	} 
}

WTWJS.prototype.moldHasReflection = function(zmoldname, zwatermat) {
	/* check if the mold is set to have a reflection in water */
	var zfound = false;
	try {
		if (zwatermat != null) {
			var zrenderlist = zwatermat.getRenderList();
			if (zrenderlist != null) {
				for (var i=0;i < zrenderlist.length;i++) {
					if (zrenderlist[i] != null) {
						if (zrenderlist[i].name != undefined) {
							if (zrenderlist[i].name == zmoldname) {
								zfound = true;
							}
						}
					}
				}
			}
		}
		
		/* obsolete - uses old water texture that was replaced */
/*		if (zwatermat.reflectionTexture != null) {
			for (var i=0; i < zwatermat.reflectionTexture.renderList.length; i++) {
				if (zwatermat.reflectionTexture.renderList[i] != null) {
					if (zwatermat.reflectionTexture.renderList[i].name == zmoldname) {
						zfound = true;
					}
				}
			}
		}
		if (zwatermat.refractionTexture != null) {
			for (var i=0; i < zwatermat.refractionTexture.renderList.length; i++) {
				if (zwatermat.refractionTexture.renderList[i] != null) {
					if (zwatermat.refractionTexture.renderList[i].name == zmoldname) {
						zfound = true;
					}
				}
			}
		}
*/
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-moldHasReflection=' + ex.message);
	} 
	return zfound;
}

WTWJS.prototype.addReflectionRefraction = function(zmold) {
	try {
		if (WTW.moldHasReflection(zmold.name, WTW.waterMat) == false) {
			if (WTW.waterMat != null) {
				WTW.addReflectionToMold(WTW.waterMat, zmold);
//				WTW.addRefractionToMold(WTW.waterMat, zmold);
			}
		}
		/* obsolete, used old water procedure */
/*		for (var i=0; i < WTW.communitiesMolds.length;i++) {
			if (WTW.communitiesMolds[i] != null) {
				if (WTW.communitiesMolds[i].shape == 'waterplane' || WTW.communitiesMolds[i].shape == 'waterdisc') {
					var zrefmold = WTW.getMeshOrNodeByID(WTW.communitiesMolds[i].moldname);
					if (zrefmold != null) {
						var zwatermat = scene.getMaterialByID(WTW.communitiesMolds[i].moldname + '-watermat');
						if (WTW.moldHasReflection(WTW.communitiesMolds[i].moldname, zwatermat) == false) {
							WTW.addReflectionToMold(zwatermat, zmold);
							WTW.addRefractionToMold(zwatermat, zmold);
						}
					}
				}
			}
		}
		for (var i=0; i < WTW.buildingMolds.length;i++) {
			if (WTW.buildingMolds[i] != null) {
				if (WTW.buildingMolds[i].shape == 'waterplane' || WTW.buildingMolds[i].shape == 'waterdisc') {
					var zrefmold = WTW.getMeshOrNodeByID(WTW.buildingMolds[i].moldname);
					if (zrefmold != null) {
						var zwatermat = scene.getMaterialByID(WTW.buildingMolds[i].moldname + '-watermat');
						if (WTW.moldHasReflection(WTW.buildingMolds[i].moldname, zwatermat) == false) {
							WTW.addReflectionToMold(zwatermat, zmold);
							WTW.addRefractionToMold(zwatermat, zmold);
						}
					}
				}
			}
		}
		for (var i=0; i < WTW.thingMolds.length;i++) {
			if (WTW.thingMolds[i] != null) {
				if (WTW.thingMolds[i].shape == 'waterplane' || WTW.thingMolds[i].shape == 'waterdisc') {
					var zrefmold = WTW.getMeshOrNodeByID(WTW.thingMolds[i].moldname);
					if (zrefmold != null) {
						var zwatermat = scene.getMaterialByID(WTW.thingMolds[i].moldname + '-watermat');
						if (WTW.moldHasReflection(WTW.thingMolds[i].moldname, zwatermat) == false) {
							WTW.addReflectionToMold(zwatermat, zmold);
							WTW.addRefractionToMold(zwatermat, zmold);
						}
					}
				}
			}
		}
		var zimagemold = WTW.getMeshOrNodeByID(zmold.name + '-mainimage');
		if (zimagemold != null) {
			WTW.addReflectionRefraction(zimagemold);
		}
		var zimagehovermold = WTW.getMeshOrNodeByID(zmold.name + '-hoverimage');
		if (zimagehovermold != null) {
			WTW.addReflectionRefraction(zimagehovermold);
		}
		var zimageclickmold = WTW.getMeshOrNodeByID(zmold.name + '-clickimage');
		if (zimageclickmold != null) {
			WTW.addReflectionRefraction(zimageclickmold);
		} */
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-addReflectionRefraction=' + ex.message);
	} 
}

WTWJS.prototype.addReflectionToMold = function(zwatermat, zmold) {
	try {
		if (zwatermat != null && zmold != null) {
			zwatermat.addToRenderList(zmold);
		}
		
		/* obsolete, used old water procedure */
/*		var zfound = false;
		var zfoundind = -1;
		var znextind = 0;
		if (zwatermat.reflectionTexture != null) {
			znextind = zwatermat.reflectionTexture.renderList.length;
			for (var i=0; i < zwatermat.reflectionTexture.renderList.length; i++) {
				if (zwatermat.reflectionTexture.renderList[i] == null) {
					if (i < znextind) {
						znextind = i;
					}
				} else {
					if (zmold.name != undefined) {
						if (zwatermat.reflectionTexture.renderList[i].name == zmold.name) {
							zfound = true;
							zfoundind = i;
						}
					}
				}
			}
			window.setTimeout(function() {
				if (zfound == false) {
					if (zwatermat.reflectionTexture != null) {
						zwatermat.reflectionTexture.renderList[znextind] = zmold;
					}
				} else if (zfoundind > -1) {
					if (zwatermat.reflectionTexture != null) {
						zwatermat.reflectionTexture.renderList[zfoundind] = zmold;
					}
				}
			},2000);
		} */
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-addReflectionToMold=' + ex.message);
	} 
}

WTWJS.prototype.addRefractionToMold = function(zwatermat, zmold) {
	/* obsolete, used old water procedure */
	try {
/*		var zfound = false;
		var znextind = 0;
		if (zwatermat != null && zmold != null) {
			if (zwatermat.refractionTexture != null) {
				znextind = zwatermat.refractionTexture.renderList.length;
				for (var i=0; i < zwatermat.refractionTexture.renderList.length; i++) {
					if (zwatermat.refractionTexture.renderList[i] == null) {
						if (i < znextind) {
							znextind = i;
						}
					} else {
						if (zmold.name != undefined) {
							if (zwatermat.refractionTexture.renderList[i].name == zmold.name) {
								zfound = true;
							}
						}
					}
				}
				if (zfound == false) {
					if (zmold != null) {
						zwatermat.refractionTexture.renderList[znextind] = zmold;
					}
				}
			} 
		} */
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-addRefractionToMold=' + ex.message);
	} 
}

WTWJS.prototype.removeReflectionRefraction = function(zmoldname) {
	try {
		if (WTW.waterMat != null) {
			var zrenderlist = WTW.waterMat.getRenderList();
			if (zrenderlist != null) {
				for (var i=zrenderlist.length-1;i > -1;i--) {
					if (zrenderlist[i] != null) {
						if (zrenderlist[i].name != undefined) {
							if (zrenderlist[i].name == zmoldname) {
								zrenderlist.splice(i,1);
							}
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-removeReflectionRefraction=' + ex.message);
	} 
}

WTWJS.prototype.checkMirrorReflectionList = function(zactionzoneind) {
	/* work in progress */
	try {
		if (WTW.actionZones[zactionzoneind] != null) {
			if (WTW.actionZones[zactionzoneind].actionzonetype == 'mirror') {
				var zactionzone = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname);
				if (zactionzone != null) {
					var zmold = zactionzone.parent;
					if (zmold != null) {
						if (zmold.material.reflectionTexture != null) {
							var zreflectionlist = []
							if (zmold.material.reflectionTexture.renderList != undefined) {
								zreflectionlist = zmold.material.reflectionTexture.renderList;
//								WTW.addMirrorReflectionList(WTW.sky, zreflectionlist);
								WTW.addMirrorReflectionList(WTW.extraGround, zreflectionlist);
							}
							if (WTW.water != null) {
								WTW.addMirrorReflectionList(WTW.water, zreflectionlist);
							}
							if (scene.meshes != null) {
								for (var i=0;i < scene.meshes.length;i++) {
									var zmoldname = scene.meshes[i].name;
									if (zmoldname.indexOf('myavatar') > -1 || zmoldname.indexOf('molds') > -1) {
										WTW.addMirrorReflectionList(scene.meshes[i], zreflectionlist);
									}
								}
							}
						}
					}
				}
				window.setTimeout(function(){WTW.actionZones[zactionzoneind].status = 0;},1000);
			}
		}
	} catch (ex) { 
		WTW.log('core-scripts-prime-wtw_common.js-checkMirrorReflectionList=' + ex.message);
	}
}

WTWJS.prototype.addMirrorReflectionList = function(zmold, zreflectionlist) {
	/* work in progress */
	try {
		var zfound = false;
		for (var i=0;i < zreflectionlist.length;i++) {
			if (zreflectionlist[i].name == zmold.name) {
				zfound = true;
			}
		}
		if (zfound == false) {
			zreflectionlist.push(zmold);
		}
	} catch (ex) { 
		WTW.log('core-scripts-prime-wtw_common.js-addMirrorReflectionList=' + ex.message);
	}
}


/* sun, sky, and extended ground settings */

WTWJS.prototype.setSunLight = function () {
	/* create sun and backlight the 3D Scene */
	try {
		if (WTW.sun != null) {
			WTW.sun.dispose();
			WTW.sun = null;
		}
		if (WTW.backLight != null) {
			WTW.backLight.dispose();
			WTW.backLight = null;
		}
		/* set 2 light sources so that the front and backs of 3D Objects have at least a minimum light */
		/* direct light immitating the sun */
		WTW.sun = new BABYLON.DirectionalLight('sun', new BABYLON.Vector3(WTW.init.sunDirectionX, WTW.init.sunDirectionY, WTW.init.sunDirectionZ), scene);
		WTW.sun.position = new BABYLON.Vector3(0, WTW.sunPositionY, 0);
		if (WTW.init.skyType == '') {
			WTW.sun.intensity = WTW.getSunIntensity(WTW.init.skyInclination, WTW.init.skyAzimuth);
		} else {
			WTW.sun.intensity = WTW.init.sunDirectionalIntensity;
		}
		WTW.sun.shadowMinZ = 1;
		WTW.sun.shadowMaxZ = 2500;
		WTW.sun.diffuse = new BABYLON.Color3.FromHexString(WTW.init.sunDiffuseColor);
		WTW.sun.specular = new BABYLON.Color3.FromHexString(WTW.init.sunSpecularColor);
		WTW.sun.groundColor = new BABYLON.Color3.FromHexString(WTW.init.sunGroundColor);

		/* lesser light for back sides of 3D Objects */
		WTW.backLight = new BABYLON.HemisphericLight('backlight', new BABYLON.Vector3(WTW.init.backLightDirectionX, WTW.init.backLightDirectionY, WTW.init.backLightDirectionZ), scene);
		WTW.backLight.intensity = WTW.init.backLightIntensity;
		WTW.backLight.range = 10000;
		WTW.backLight.diffuse = new BABYLON.Color3.FromHexString(WTW.init.backLightDiffuseColor);
		WTW.backLight.specular = new BABYLON.Color3.FromHexString(WTW.init.backLightSpecularColor);
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-setSunLight=' + ex.message);
	}
}

WTWJS.prototype.getSunIntensity = function (zinclination, zazimuth) {
	/* get sun intensity based on sun position (inclination) */
	var zintensity = .3;
	try {
		if (WTW.init.skyType == '') {
			if (zinclination < .3 && zinclination > -.3 && zazimuth > .2) {
				zintensity = 1.5;
			} else if ((zinclination >= .3 || zinclination <= -.3) && zazimuth > .2) {
				zintensity = 0.75;
			} else if (zazimuth < .2) {
				zintensity = 0.43;
			}
		} else {
			zintensity = WTW.init.sunDirectionalIntensity;
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-getSunIntensity=' + ex.message);
	}
	return zintensity;
}

WTWJS.prototype.setFog = function () {
	/* Set fog settings if enabled */
	try {
		scene.fogEnabled = WTW.init.sceneFogEnabled;
		if (scene.fogEnabled) {
			switch (WTW.init.sceneFogMode) {
				case 'exponential':
					scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
					break;
				case 'exponential faster':
					scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
					break;
				case 'linear':
					scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
					break;
				default: /* none */
					scene.fogMode = BABYLON.Scene.FOGMODE_NONE;
					break;
			}
			scene.fogDensity = WTW.init.sceneFogDensity;
			scene.fogStart = WTW.init.sceneFogStart;
			scene.fogEnd = WTW.init.sceneFogEnd;
			scene.fogColor =  new BABYLON.Color3.FromHexString(WTW.init.sceneFogColor);
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-setFog=' + ex.message);
	}
}

WTWJS.prototype.setMeshTransparentFog = function(zmold, zmaxz) {
	/* used on large molds to provide the fog appearance at distances by vertex points */
	var zheapsizeused = 0;
	var zheapsize = 0;
	var zheapsizelimit = 0;
    try {
		/* check memory before adding this feature */
		zheapsizeused = performance.memory.usedJSHeapSize;
		zheapsize = performance.memory.totalJSHeapSize;
		zheapsizelimit = performance.memory.jsHeapSizeLimit;
		var zheapsizesoftlimit = 500000;
		if (zheapsizeused < zheapsizelimit - zheapsizesoftlimit && zheapsize < zheapsizelimit - zheapsizesoftlimit) {
			/* only perform this feature if there is room in the buffer */
			var zvtx = zmold.getVerticesData( BABYLON.VertexBuffer.PositionKind);
			/* vertex colors */
			var zcolors = [];
			var zcolor = [1,1,1,1];
			var i = 0;
			while (i<zvtx.length) {
				var zx = zvtx[i++];
				var zy = zvtx[i++];
				var zz = zvtx[i++];
				zcolor[3] = 1.0 - Math.min(1, Math.max(0, zz / zmaxz));
				zcolors.push(zcolor[0],zcolor[1],zcolor[2],zcolor[3]);
			}
			zmold.setVerticesData( BABYLON.VertexBuffer.ColorKind, zcolors);
			zmold.useVertexColors = true;
			zmold.hasVertexAlpha = true;
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-setMeshTransparentFog=' + ex.message);
	}
};

WTWJS.prototype.createSky = function () {
	/* select method of sky creation and add sky */
	try {
		if (WTW.sky != null) {
			WTW.sky.dispose();
			WTW.sky = null;
		}
		switch (WTW.init.skyType) {
			case "SkyBox":
				WTW.sky = BABYLON.MeshBuilder.CreateBox("sky", {size:WTW.init.skySize}, scene);
				var zskyboxmat = new BABYLON.StandardMaterial("skymat", scene);
				zskyboxmat.backFaceCulling = false;
				if (WTW.init.skyBoxFolder != '') {
					zskyboxmat.reflectionTexture = new BABYLON.CubeTexture(WTW.init.skyBoxFolder, scene);
				} else {
					var zfiles = [
						WTW.init.skyBoxImageLeft,
						WTW.init.skyBoxImageUp,
						WTW.init.skyBoxImageFront,
						WTW.init.skyBoxImageRight,
						WTW.init.skyBoxImageDown,
						WTW.init.skyBoxImageBack,
					];
					zskyboxmat.reflectionTexture = new BABYLON.CubeTexture.CreateFromImages(zfiles, scene);
				}
				zskyboxmat.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
				zskyboxmat.diffuseColor = new BABYLON.Color3.FromHexString(WTW.init.skyBoxDiffuseColor);
				zskyboxmat.specularColor = new BABYLON.Color3.FromHexString(WTW.init.skyBoxSpecularColor);
				zskyboxmat.ambientColor = new BABYLON.Color3.FromHexString(WTW.init.skyBoxAmbientColor);
				zskyboxmat.emissiveColor = new BABYLON.Color3.FromHexString(WTW.init.skyBoxEmissiveColor);
				/* remove reflections of the sun on the sky */
				zskyboxmat.disableLighting = true;
				WTW.sky.material = zskyboxmat;
				/* have skybox follow the camera position */
				WTW.sky.infiniteDistance = true;
				WTW.sky.isPickable = false;
				WTW.sky.renderingGroupId = 0;
				WTW.sky.id = 'sky';
				WTW.sky.name = 'sky';
				break;
			case "PBR SkyBox":
				/* quick create sky box from dds file */
				var zloadskytimer = window.setInterval(function() {
					if (WTW.isInitCycle == 0 && WTW.sky == null) {
						WTW.init.skyBoxFolder = '';
						if (WTW.init.skyBoxFile == '' || WTW.init.skyBoxFile.toLowerCase().indexOf('.dds') == -1) {
							WTW.init.skyBoxFile = '/content/system/skies/buildingenvironment.dds';
						}
						var zhdrtexture = new BABYLON.CubeTexture(WTW.init.skyBoxFile, scene);
						WTW.sky = scene.createDefaultSkybox(zhdrtexture, WTW.init.skyBoxPBR, WTW.init.skySize, WTW.init.skyBoxBlur, WTW.init.skyBoxAsEnvironmentTexture);
						/* have skybox follow the camera position */
						WTW.sky.infiniteDistance = true;
						WTW.sky.isPickable = false;
						WTW.sky.renderingGroupId = 0;
						WTW.sky.id = 'sky';
						WTW.sky.name = 'sky';
						window.clearInterval(zloadskytimer);
						zloadskytimer = null;
					} else if (WTW.sky != null) {
						window.clearInterval(zloadskytimer);
						zloadskytimer = null;
					}
				},100);
				break;
			case "Reflective PBR SkyBox":
				/* improves the absorbsion for reflective surfaces on 3D Objects */
				var zloadskytimer = window.setInterval(function() {
					if (WTW.isInitCycle == 0 && WTW.sky == null) {
						WTW.init.skyBoxFolder = '';
						if (WTW.init.skyBoxFile == '' || WTW.init.skyBoxFile.toLowerCase().indexOf('.dds') == -1) {
							WTW.init.skyBoxFile = '/content/system/skies/roomenvironment.dds';
						}
						scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(WTW.init.skyBoxFile, scene);
						WTW.sky = scene.createDefaultSkybox(scene.environmentTexture, WTW.init.skyBoxPBR, WTW.init.skySize, WTW.init.skyBoxBlur, WTW.init.skyBoxAsEnvironmentTexture);
						/* have skybox follow the camera position */
						WTW.sky.infiniteDistance = true;
						WTW.sky.isPickable = false;
						WTW.sky.renderingGroupId = 0;
						WTW.sky.id = 'sky';
						WTW.sky.name = 'sky';
						window.clearInterval(zloadskytimer);
						zloadskytimer = null;
					} else if (WTW.sky != null) {
						window.clearInterval(zloadskytimer);
						zloadskytimer = null;
					}
				},100);
				break;
			case "HDR SkyBox":
				/* High-dynamic-range rendering preserves details in limiting contrast ratios. */
				var zloadskytimer = window.setInterval(function() {
					if (WTW.isInitCycle == 0 && WTW.sky == null) {
						WTW.init.skyBoxFolder = '';
						if (WTW.init.skyBoxFile == '' || WTW.init.skyBoxFile.toLowerCase().indexOf('.hdr') == -1) {
							WTW.init.skyBoxFile = '/content/system/skies/room.hdr';
						}
						WTW.sky = BABYLON.MeshBuilder.CreateBox("sky", {size:WTW.init.skySize}, scene);
						var zskyboxmat = new BABYLON.StandardMaterial("skymat", scene);
						zskyboxmat.backFaceCulling = false;
						zskyboxmat.reflectionTexture = new BABYLON.HDRCubeTexture(WTW.init.skyBoxFile, scene, 512);
						zskyboxmat.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
						WTW.sky.material = zskyboxmat;
						WTW.sky.isPickable = false;
						WTW.sky.renderingGroupId = 0;
						WTW.sky.id = 'sky';
						WTW.sky.name = 'sky';
						window.clearInterval(zloadskytimer);
						zloadskytimer = null;
					} else if (WTW.sky != null) {
						window.clearInterval(zloadskytimer);
						zloadskytimer = null;
					}
				},100);
				break;
			case "Equirectangular Panoramic SkyBox":
				/* uses Equirectangular panoramic images */
				var zloadskytimer = window.setInterval(function() {
					if (WTW.isInitCycle == 0 && WTW.sky == null) {
						WTW.init.skyBoxFolder = '';
						if (WTW.init.skyBoxFile == '' || WTW.init.skyBoxFile.toLowerCase().indexOf('.jpg') == -1) {
							WTW.init.skyBoxFile = '/content/system/skies/boatdock.jpg';
						}
						var zenvironmenttexture = new BABYLON.EquiRectangularCubeTexture(WTW.init.skyBoxFile, scene, 512);
						scene.imageProcessingConfiguration.exposure = 1.0;
						scene.imageProcessingConfiguration.contrast = 2.0;

						WTW.sky = BABYLON.MeshBuilder.CreateBox("sky", {size:WTW.init.skySize}, scene);
						var zskyboxmat = new BABYLON.PBRMaterial("skymat", scene);
						zskyboxmat.backFaceCulling = false;
						zskyboxmat.reflectionTexture = zenvironmenttexture.clone();
						zskyboxmat.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
						zskyboxmat.microSurface = WTW.init.skyBoxMicroSurface;
						zskyboxmat.disableLighting = false;
						WTW.sky.isPickable = false;
						WTW.sky.material = zskyboxmat;
						/* have skybox follow the camera position */
						WTW.sky.infiniteDistance = true;
						/* set skybox to render behind everything else */
						WTW.sky.renderingGroupId = 0;
						WTW.sky.id = 'sky';
						WTW.sky.name = 'sky';
						window.clearInterval(zloadskytimer);
						zloadskytimer = null;
					} else if (WTW.sky != null) {
						window.clearInterval(zloadskytimer);
						zloadskytimer = null;
					}
				},100);
				break;
			default: 
				/* initialize sky sphere - scaling and material settings */
				WTW.sky = BABYLON.MeshBuilder.CreateSphere('sky', {segments: 40, diameter:1, updatable: true, sideOrientation: BABYLON.Mesh.BACKSIDE}, scene);
				WTW.sky.scaling.x = WTW.init.skySize;
				WTW.sky.scaling.y = WTW.init.skySize;
				WTW.sky.scaling.z = WTW.init.skySize;
				WTW.sky.position.x = WTW.init.startPositionX + WTW.init.skyPositionOffsetX;
				WTW.sky.position.y = WTW.init.startPositionY + WTW.init.skyPositionOffsetY;
				WTW.sky.position.z = WTW.init.startPositionZ + WTW.init.skyPositionOffsetZ;
				WTW.sky.isPickable = false;
				WTW.sky.disableLighting = true;
				var zskyboxmat = new BABYLON.SkyMaterial('skymat', scene);
				zskyboxmat.backFaceCulling = false;
				WTW.sky.material = zskyboxmat;
				WTW.sky.renderingGroupId = 0;
				WTW.sky.id = 'sky';
				WTW.sky.name = 'sky';
				window.setTimeout(function() {
					WTW.loadSkyScene(WTW.init.skyInclination, WTW.init.skyLuminance, WTW.init.skyAzimuth, WTW.init.skyRayleigh, WTW.init.skyTurbidity, WTW.init.skyMieDirectionalG, WTW.init.skyMieCoefficient, .25);
				}, 1000);
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-createSky=' + ex.message);
	}
}

WTWJS.prototype.loadSkyScene = function (zinclination, zluminance, zazimuth, zrayleigh, zturbidity, zmiedirectionalg, zmiecoefficient, zspeedratio) {
	/* load sky material based on passed settings */
	try {
		if (WTW.init.skyType == '') {
			var zframescount = 100;
			var zintensity = WTW.getSunIntensity(zinclination, zazimuth);
			if (zinclination < .3 && zinclination > -.3 && zazimuth > .2) {
				WTW.sun.position = new BABYLON.Vector3(0, WTW.sunPositionY, 0);
			} else if ((zinclination >= .3 || zinclination <= -.3) && zazimuth > .2) {
			} else if (zazimuth < .2) {
			}

			var zconditionsun = new BABYLON.PredicateCondition(scene.actionManager, function () {
				var ztest = false;
				if (WTW.sun.intensity != zintensity) {
					ztest = true;
				}
				return ztest;
			});
			var zanimationsun = BABYLON.PlayAnimationAction(BABYLON.ActionManager.OnEveryFrameTrigger, WTW.sun.intensity, WTW.sun.intensity, zintensity, false, zconditionsun);

			var zanimationinclination = new BABYLON.Animation('animationinclination', 'material.inclination', zframescount, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
			var zinclinationkeys = [
				{ frame: 0, value: WTW.sky.material.inclination },
				{ frame: zframescount, value: zinclination }
			];
			zanimationinclination.setKeys(zinclinationkeys);
			WTW.sky.animations.push(zanimationinclination);
			
			var zanimationluminance = new BABYLON.Animation('animationluminance', 'material.luminance', zframescount, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
			var zluminancekeys = [
				{ frame: 0, value: WTW.sky.material.luminance },
				{ frame: zframescount, value: zluminance }
			];
			zanimationluminance.setKeys(zluminancekeys);
			zanimationluminance.enableBlending = true;
			zanimationluminance.blendingSpeed = 0.01;
			WTW.sky.animations.push(zanimationluminance);

			var zanimationazimuth = new BABYLON.Animation('animationazimuth', 'material.azimuth', zframescount, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
			var zazimuthkeys = [
				{ frame: 0, value: WTW.sky.material.azimuth },
				{ frame: zframescount, value: zazimuth }
			];
			zanimationazimuth.setKeys(zazimuthkeys);
			zanimationazimuth.enableBlending = true;
			zanimationazimuth.blendingSpeed = 0.01;
			WTW.sky.animations.push(zanimationazimuth);
			
			var zanimationrayleigh = new BABYLON.Animation('animationrayleigh', 'material.rayleigh', zframescount, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
			var zrayleighkeys = [
				{ frame: 0, value: WTW.sky.material.rayleigh },
				{ frame: zframescount, value: zrayleigh }
			];
			zanimationrayleigh.setKeys(zrayleighkeys);
			zanimationrayleigh.enableBlending = true;
			zanimationrayleigh.blendingSpeed = 0.01;
			WTW.sky.animations.push(zanimationrayleigh);

			var zanimationturbidity = new BABYLON.Animation('animationturbidity', 'material.turbidity', zframescount, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
			var zturbiditykeys = [
				{ frame: 0, value: WTW.sky.material.turbidity },
				{ frame: zframescount, value: zturbidity }
			];
			zanimationturbidity.setKeys(zturbiditykeys);
			zanimationturbidity.enableBlending = true;
			zanimationturbidity.blendingSpeed = 0.01;
			WTW.sky.animations.push(zanimationturbidity);

			var zanimationmieDirectionalG = new BABYLON.Animation('animationmieDirectionalG', 'material.mieDirectionalG', zframescount, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
			var zdirectionalkeys = [
				{ frame: 0, value: WTW.sky.material.mieDirectionalG },
				{ frame: zframescount, value: zmiedirectionalg }
			];
			zanimationmieDirectionalG.setKeys(zdirectionalkeys);
			zanimationmieDirectionalG.enableBlending = true;
			zanimationmieDirectionalG.blendingSpeed = 0.01;
			WTW.sky.animations.push(zanimationmieDirectionalG);

			var zanimationmieCoefficient = new BABYLON.Animation('animationmieCoefficient', 'material.mieCoefficient', zframescount, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
			var zcoefficientkeys = [
				{ frame: 0, value: WTW.sky.material.mieCoefficient },
				{ frame: zframescount, value: zmiecoefficient }
			];
			zanimationmieCoefficient.setKeys(zcoefficientkeys);
			zanimationmieCoefficient.enableBlending = true;
			zanimationmieCoefficient.blendingSpeed = 0.01;
			WTW.sky.animations.push(zanimationmieCoefficient);

			var zmovesky = scene.beginAnimation(WTW.sky, 0, zframescount, true);
			zmovesky.speedRatio = zspeedratio;
			
			if (WTW.adminView == 1) {
				/* in admin, add settings to form for update */
				dGet('wtw_tskyinclination').value = Number(zinclination) + .6;
				dGet('wtw_skyinclination').innerHTML = zinclination;
				dGet('wtw_tskyluminance').value = zluminance;
				dGet('wtw_skyluminance').innerHTML = zluminance;
				dGet('wtw_tskyazimuth').value = zazimuth;
				dGet('wtw_skyazimuth').innerHTML = zazimuth;
				dGet('wtw_tskyrayleigh').value = zrayleigh;
				dGet('wtw_skyrayleigh').innerHTML = zrayleigh;
				dGet('wtw_tskyturbidity').value = zturbidity;
				dGet('wtw_skyturbidity').innerHTML = zturbidity;
				dGet('wtw_tskymiedirectionalg').value = zmiedirectionalg;
				dGet('wtw_skymiedirectionalg').innerHTML = zmiedirectionalg;
				dGet('wtw_tskymiecoefficient').value = zmiecoefficient;
				dGet('wtw_skymiecoefficient').innerHTML = zmiecoefficient;
			}
			/* set global settings based on new sky */
			WTW.init.skyInclination = zinclination;
			WTW.init.skyLuminance = zluminance;
			WTW.init.skyAzimuth = zazimuth;
			WTW.init.skyRayleigh = zrayleigh;
			WTW.init.skyTurbidity = zturbidity;
			WTW.init.skyMieDirectionalG = zmiedirectionalg;
			WTW.init.skyMieCoefficient = zmiecoefficient;

			if (WTW.extraGround.material != undefined) {
				WTW.extraGround.material.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-loadSkyScene=' + ex.message);
	}  
}

WTWJS.prototype.setExtendedGround = function () {
	/* initialize extra ground (extended ground that never ends while the avatar walks) */
	try {
		if (WTW.extraGround != null) {
			WTW.extraGround.dispose();
			WTW.extraGround = null;
		}
		WTW.extraGround = BABYLON.MeshBuilder.CreateGround('communityeground-', {width: 5000, height: 5000, subdivisions: 256, updatable: false}, scene);
		WTW.extraGround.position.x = 0;
		WTW.extraGround.position.y = 0;
		WTW.extraGround.position.z = 0;
		WTW.extraGround.isPickable = true;
		WTW.extraGround.checkCollisions = true;
		WTW.extraGround.material = new BABYLON.StandardMaterial('mat-communityeground', scene);
		WTW.extraGround.material.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		WTW.extraGround.material.diffuseTexture = new BABYLON.Texture(WTW.init.groundTexturePath, scene);
		WTW.extraGround.material.diffuseTexture.uScale = 500;
		WTW.extraGround.material.diffuseTexture.vScale = 500;
		/* set physics on ground */
		switch (WTW.physicsEngine) {
			case 'havok':
				var zgroundaggregate = new BABYLON.PhysicsAggregate(WTW.extraGround, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, scene);
				break;
			case 'oimo':
			case 'cannon':
				WTW.extraGround.physicsImpostor = new BABYLON.PhysicsImpostor(WTW.extraGround, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.5 }, scene);
				break;
		}

		WTW.extraGround.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-setExtendedGround=' + ex.message);
	}
}


/* main processing queues and functions */

WTWJS.prototype.addLoadZoneToQueue = function(zactionzoneind) {
	/* add load zone to queue to be added to scene */
	try {
		var zloadmoldqueind = WTW.loadMoldQueue.length;
		WTW.loadMoldQueue[zloadmoldqueind] = WTW.newMoldQueue();
		WTW.loadMoldQueue[zloadmoldqueind].actionzoneind = zactionzoneind;
		WTW.loadMoldQueue[zloadmoldqueind].queprocess = 'loadextreme';
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-addLoadZoneToQueue=' + ex.message);
	}
}

WTWJS.prototype.addUnloadZoneToQueue = function(zactionzoneind) {
	/* add request to remove load zone to queue to be removed from scene */
	try {
		var zloadmoldqueind = WTW.loadMoldQueue.length;
		WTW.loadMoldQueue[zloadmoldqueind] = WTW.newMoldQueue();
		WTW.loadMoldQueue[zloadmoldqueind].actionzoneind = zactionzoneind;
		WTW.loadMoldQueue[zloadmoldqueind].queprocess = 'unloadextreme';
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-addUnloadZoneToQueue=' + ex.message);
	}
}

WTWJS.prototype.addUnloadConnectingGridToQueue = function(zconnectinggridind) {
	/* add request to remove connectinggrid to queue to be removed from scene */
	try {
		var zloadmoldqueind = WTW.loadMoldQueue.length;
		WTW.loadMoldQueue[zloadmoldqueind] = WTW.newMoldQueue();
		WTW.loadMoldQueue[zloadmoldqueind].connectinggridind = zconnectinggridind;
		WTW.loadMoldQueue[zloadmoldqueind].queprocess = 'unloadconnectinggrid';
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-addUnloadConnectingGridToQueue=' + ex.message);
	}
}

WTWJS.prototype.addMoldToQueue = function(zmoldname, zmolddef, zparentname, zcoveringname, zcsgmolddef) {
	/* add mold to queue to be added to the scene */
	try {
		var zloadmoldqueind = WTW.loadMoldQueue.length;
		WTW.loadMoldQueue[zloadmoldqueind] = WTW.newMoldQueue();
		WTW.loadMoldQueue[zloadmoldqueind].moldname = zmoldname;
		WTW.loadMoldQueue[zloadmoldqueind].queprocess = 'add';
		WTW.loadMoldQueue[zloadmoldqueind].molddef = zmolddef;
		WTW.loadMoldQueue[zloadmoldqueind].parentname = zparentname;
		WTW.loadMoldQueue[zloadmoldqueind].coveringname = zcoveringname;
		WTW.loadMoldQueue[zloadmoldqueind].csgmolddef = zcsgmolddef;
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-addMoldToQueue=' + ex.message);
	}
}

WTWJS.prototype.addDisposeMoldToQueue = function(zmoldname, zcheck) {
	/* add request to dispose of mold to queue */
	try {
		if (WTW.isMoldInQueue(zmoldname, true) == false) {
			var zloadmoldqueind = WTW.loadMoldQueue.length;
			WTW.loadMoldQueue[zloadmoldqueind] = WTW.newMoldQueue();
			WTW.loadMoldQueue[zloadmoldqueind].moldname = zmoldname;
			WTW.loadMoldQueue[zloadmoldqueind].queprocess = 'dispose';
			WTW.loadMoldQueue[zloadmoldqueind].check = zcheck;
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-addDisposeMoldToQueue=' + ex.message);
	}
}

WTWJS.prototype.isMoldInQueue = function(moldname, remove) {
	/* check if a mold is already in the queue */
	var zisinque = false;
	try {
		for (var i=0; i < WTW.loadMoldQueue.length; i++) {
			if (WTW.loadMoldQueue[i] != null) {
				if (WTW.loadMoldQueue[i].moldname == moldname && WTW.loadMoldQueue[i].queprocess == 'add') {
					zisinque = true;
					if (remove) {
						WTW.loadMoldQueue[i] = null;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-isMoldInQueue=' + ex.message);
	}
	return zisinque;
}

WTWJS.prototype.addActionZoneToQueue = function(zmoldname, zmolddef) {
	/* load action zone (not load zone) to queue to be loaded */
	try {
		var zloadmoldqueind = WTW.loadMoldQueue.length;
		WTW.loadMoldQueue[zloadmoldqueind] = WTW.newMoldQueue();
		WTW.loadMoldQueue[zloadmoldqueind].moldname = zmoldname;
		WTW.loadMoldQueue[zloadmoldqueind].molddef = zmolddef;
		WTW.loadMoldQueue[zloadmoldqueind].queprocess = 'addactionzone';
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-addActionZoneToQueue=' + ex.message);
	}
}

WTWJS.prototype.processMoldQueue = function() {
	/* process the queue to add items */
	/* only processes a small number of items per frame in order to not cause a lag in animation when an item is added to the scene */
	WTW.checkLoadQueue = 1;
	try {
		var zfound = 0;
		var zcount = 0;
		for (var i=0;i<WTW.loadMoldQueue.length;i++) {
			if (WTW.loadMoldQueue[i] != null) {
				try {
					var zmoldname = WTW.loadMoldQueue[i].moldname;
					switch (WTW.loadMoldQueue[i].queprocess) {
						case 'loadextreme':
							WTW.getMoldsByWebID(WTW.loadMoldQueue[i].actionzoneind);
							break;
						case 'unloadextreme':
							WTW.unloadMoldsByWebID(WTW.loadMoldQueue[i].actionzoneind);
							break;
						case 'addactionzone':
							WTW.addActionZone(zmoldname, WTW.loadMoldQueue[i].molddef);
							WTW.checkZones = true;
							/* add support for plugins to execute code when action zones are added to scene */
							WTW.pluginsAddActionZone(zmoldname, WTW.loadMoldQueue[i].molddef);
							break;
						case 'dispose':
							WTW.disposeClean(zmoldname, WTW.loadMoldQueue[i].check);
							break;
						case 'unloadconnectinggrid':
							WTW.unloadConnectingGrid(WTW.loadMoldQueue[i].connectinggridind);
							break;
						case 'add':
							if (WTW.loadMoldQueue[i].molddef != null && WTW.loadMoldQueue[i].molddef != undefined) {
								var zmolddef = WTW.loadMoldQueue[i].molddef;
								var zattachmoldind = zmolddef.attachmoldind;
								var zmold = WTW.getMeshOrNodeByID(zmoldname);
								if (zmold == null) {
									var zparentmold = null;
									if (WTW.loadMoldQueue[i].parentname != '') {
										zparentmold = WTW.getMeshOrNodeByID(WTW.loadMoldQueue[i].parentname);
									}
									if (WTW.loadMoldQueue[i].parentname == '' || zparentmold != null) {
										zmold = WTW.addMold(zmoldname, zmolddef, WTW.loadMoldQueue[i].parentname, WTW.loadMoldQueue[i].coveringname);
									}
									var znode = scene.getTransformNodeByID(zmoldname);
									var zwebtype = '';
									var zmolds = null;
									var zmoldind = -1; 
									if (zmoldname.indexOf('communitymolds-') > -1) {
										zwebtype = 'community';
										zmolds = WTW.communitiesMolds;
										zmoldind = Number(zmolddef.moldind);
									} else if (zmoldname.indexOf('buildingmolds-') > -1) {
										zwebtype = 'building';
										zmolds = WTW.buildingMolds;
										zmoldind = Number(zmolddef.moldind);
									} else if (zmoldname.indexOf('thingmolds-') > -1) {
										zwebtype = 'thing';
										zmolds = WTW.thingMolds;
										zmoldind = Number(zmolddef.moldind);
									} else if (zmoldname.indexOf('connectinggrids-') > -1) {
										zwebtype = 'connectinggrid';
										zmolds = WTW.connectingGrids;
										zmoldind = Number(zmolddef.connectinggridind);
										if (zmoldname == WTW.mainParent) {
											WTW.mainParentMold = zmold;
										}
									} else if (zmoldname.indexOf('actionzone-') > -1) {
										zwebtype = 'actionzone';
										zmolds = WTW.actionZones;
										zmoldind = Number(zmolddef.actionzoneind);
									}
									if (zmolds != null) {
										if (zmolds[zmoldind] != null) {
											zmolds[zmoldind].shown = '2';
											if (zwebtype != 'connectinggrid' && zwebtype != 'actionzone' && zwebtype != '') {
												if (zattachmoldind > -1) {
													if (WTW.actionZones[zattachmoldind] != null) {
														WTW.addActionZone(zmolddef.moldname, WTW.actionZones[zattachmoldind]);
													}
												}
											}
											if (zmoldname.indexOf('molds-') > -1) {
												var zcsgcount = 0;
												var zreceiveshadows = '0';
												var zwaterreflection = '0';
												if (zmolddef.csg.count != undefined) {
													if (WTW.isNumeric(zmolddef.csg.count)) {
														zcsgcount = Number(zmolddef.csg.count);
													}
												}
												if (zmolddef.graphics.receiveshadows != undefined) {
													if (zmolddef.graphics.receiveshadows == '1') {
														zreceiveshadows = '1';
													}
												}
												if (zmolddef.graphics.waterreflection != undefined) {
													if (zmolddef.graphics.waterreflection == '1') {
														zwaterreflection = '1';
													}
												}
												if (zcsgcount > 0) {
													zmold = WTW.getMoldCSG(zmold, zmolddef);
												}
												if (zreceiveshadows == '1' && znode == null) {
													zmold.material.unfreeze();
													zmold.receiveShadows = true;
												} else if (zmold.material != null && znode == null && WTW.adminView == 0) {
													zmold.material.freeze();
												}
												if (WTW.shadowSet > 0 && zmoldname.indexOf('babylonfile') == -1) {
													if (znode == null) {
//														WTW.shadows.addShadowCaster(zmold, true);
													} else {
														/* add shadows to child meshes and child node child meshes */
														var zchildnodes = zmold.getChildTransformNodes(true);
														var zchildmeshes = zmold.getChildMeshes();
														for (var k=0;k < zchildmeshes.length;k++) {
//															WTW.shadows.addShadowCaster(zchildmeshes[k], true);
														}
														for (var j=0;j < zchildnodes.length;j++) {
															zchildmeshes = zchildnodes[j].getChildMeshes();
															for (var k=0;k < zchildmeshes.length;k++) {
//																WTW.shadows.addShadowCaster(zchildmeshes[k], true);
															}
														}
														
													}
												}
												if (zwaterreflection == '1' && WTW.waterMat != null && znode == null) {
													WTW.waterMat.addToRenderList(zmold);
												}
												zmold.isPickable = true;
												zmold.renderingGroupId = 1;
											}
											if (znode == null) {
												zmold.checkCollisions = false;
												if (zmolddef.checkcollisions != undefined) {
													if (zmolddef.checkcollisions == '1') {
														zmold.checkCollisions = true;
													}
												}
												if (zmolddef.ispickable != undefined) {
													if (zmolddef.ispickable == '0' && WTW.adminView != 1) {
														zmold.isPickable = false;
													}
												}
											}
											WTW.pluginsProcessMoldQueueAdd(zmoldname, zmold);
										}
									}
								}
							}
							zcount += 1;
							break;
					}
				} catch (ex) {
					WTW.log('core-scripts-prime-wtw_common.js-processMoldQueue2=' + ex.message);
				}
				WTW.loadMoldQueue[i] = null;
				zfound = 1;
				if (zcount > 2) {
					i = WTW.loadMoldQueue.length;
					zcount = 0;
				}
			}
		}
		if (zfound == 0) {
			WTW.loadMoldQueue = [];
			WTW.setShownMolds();
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-processMoldQueue=' + ex.message);
	}
	WTW.checkLoadQueue = 0;
}

WTWJS.prototype.unloadConnectingGrid = function(zconnectinggridind) {
	/* clear all child objects under a connecting grid and remove the connecting grid */
	try {
		if (WTW.connectingGrids[zconnectinggridind] != null) {
			/* currently handled in teleport - for future use when multiple Communities are loaded in scene */
			
			
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-unloadConnectingGrid=' + ex.message);
	}
}

/* settings are database saved variables */
/* developers can create and use these functions to save and retrieve the settings as needed */
WTWJS.prototype.getSetting = function(zsetting, zjsfunction, zjsparameters) {
	/* get a setting from the database by name */
	/* zsetting = name of the variable */
	/* zjsfunction = JavaScript function to run after the setting is retrieved */
	/* zjsparameters = additional parameters you want to send to the JavaScript when the function completes */
	/* example it will excute on completion: zjsfunction(zsettings, zjsparameters); */
	try {
		WTW.getSettings(zsetting, zjsfunction, zjsparameters);
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-getSetting=' + ex.message);
	}
}

WTWJS.prototype.getSettings = async function(zsettings, zjsfunction, zjsparameters) {
	/* get a set of settings from the database by names */
	/* zsettings = comma separated names of the variables */
	/* zjsfunction = JavaScript function to run after the setting is retrieved */
	/* zjsparameters = additional parameters you want to send to the JavaScript when the function completes */
	/* example it will excute on completion: zjsfunction(zsettings, zjsparameters); */
	/* where zsettings returned are a JSON formatted list of pairs like {name1: value1, name2:value2 } */
	try {
		if (zjsparameters == undefined) {
			zjsparameters = '';
		}
		var zrequest = {
			'settings': zsettings,
			'function':'getsettings'
		};
		WTW.postAsyncJSON('/core/handlers/uploads.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				if (zjsfunction != null) {
					WTW.returnSettings(zresponse.settings, zjsfunction, zjsparameters);
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-getSettings=' + ex.message);
	}
}

WTWJS.prototype.returnSettings = function(zsettings, zjsfunction, zjsparameters) {
	/* process the request for settings after retrieved from database */
	try {
		if (zjsfunction != null) {
			WTW.executeFunctionByName(zjsfunction, window, zsettings, zjsparameters);
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-returnSettings=' + ex.message);
	}
}

WTWJS.prototype.saveSetting = async function(zsetting, zvalue, zjsfunction, zjsparameters) {
	/* save a setting to the database by name */
	/* zsetting = name of the variable */
	/* zjsfunction = JavaScript function to run after the setting is saved */
	/* zjsparameters = additional parameters you want to send to the JavaScript when the function completes */
	/* example it will excute on completion: zjsfunction('success', zjsparameters); */
	try {
		if (zjsfunction == undefined) {
			zjsfunction = null;
		}
		if (zjsparameters == undefined) {
			zjsparameters = '';
		}
		var zrequest = {
			'settings': zsetting,
			'value':zvalue,
			'function':'savesetting'
		};
		WTW.postAsyncJSON('/core/handlers/uploads.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zjsfunction != null) {
					WTW.returnSettings(zresponse.success, zjsfunction, zjsparameters);
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-saveSetting=' + ex.message);
	}
}

WTWJS.prototype.saveSettings = async function(zsettings, zjsfunction, zjsparameters) {
	/* save a set of settings to the database by names:values */
	/* zsettings = names of the variables names and values, as in JSON formatted list of pairs like {name1: value1, name2:value2 } */
	/* zjsfunction = JavaScript function to run after the settings are saved */
	/* zjsparameters = additional parameters you want to send to the JavaScript when the function completes */
	/* example it will excute on completion: zjsfunction('success', zjsparameters); */
	/* note each setting is saved as an individual record and can be retrieved individually WTW.getSetting(...) */
	/* or in a set WTW.getSettings(...); */
	try {
		if (zjsfunction == undefined) {
			zjsfunction = null;
		}
		if (zjsparameters == undefined) {
			zjsparameters = '';
		}
		var zrequest = {
			'settings': JSON.stringify(zsettings),
			'function':'savesettings'
		};
		WTW.postAsyncJSON('/core/handlers/uploads.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zjsfunction != null) {
					WTW.returnSettings(zresponse.success, zjsfunction, zjsparameters);
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-saveSettings=' + ex.message);
	}
}


/* dispose of molds, action zones, connecting grids, automations, animations, sounds, and lights */

WTWJS.prototype.disposeClean = function(zmoldname, zcheck) {
	try {
		/* extension of the babylon dispose function to catch various child and sub elements */
		if (zmoldname != '') {
			scene.blockfreeActiveMeshesAndRenderingGroups = true;
			if (zcheck == undefined) {
				zcheck = true;
			}
            var znamepart = zmoldname.split('-');
			/* dispose mold (mesh) from shadow and reflection arrays */
			WTW.disposeShadowFromMold(zmoldname);
			WTW.disposeReflectionFromMold(zmoldname);
			try {
				/* plugin hook for custom code */
				WTW.pluginsDisposeClean(zmoldname);
			} catch (ex) {}
			try {
				WTW.disposeMoldEvent(zmoldname);
				WTW.disposeSoundAndLights(zmoldname);
				if (zmoldname.indexOf('myavatar') > -1 || zmoldname.indexOf('person') > -1 || zmoldname.indexOf('editavatar') > -1) {
					/* dispose of avatar parts / animations */
					WTW.disposeAnimations(zmoldname);
				} else if (znamepart[6] == 'video') {
					/* stop and clear the video before it is deleted */
					var zstrtemp = zmoldname;
					zstrtemp = zstrtemp.replace('-base','-mainvideo');
					var zvideomold = WTW.getMeshOrNodeByID(zstrtemp);
					if (zvideomold != null){
						if (zvideomold.material.diffuseTexture.video != undefined) {
							zvideomold.material.diffuseTexture.video.pause();
							zvideomold.material.diffuseTexture.video.src = '';
						}
						if (zvideomold.material.diffuseTexture.video != null) {
							zvideomold.material.diffuseTexture.video = null;
						}
				   }
				} else if (znamepart[6].indexOf('water') > -1) {
					/* remove mold from reflection and refraction arrays */
					var zstrtemp = zmoldname;
					if (zstrtemp.indexOf('-base') > -1) {
						zstrtemp = zstrtemp.replace('-base','');
					}
					var zwatermat = scene.getMaterialByID(zstrtemp + '-watermat');
					if (zwatermat != null) {
						if (zwatermat.reflectionTexture.renderList != null) {
							if (zwatermat.reflectionTexture.renderList.length > 0) {
								zwatermat.reflectionTexture.renderList.splice(0, zwatermat.reflectionTexture.renderList.length);
							}
						}
						if (zwatermat.refractionTexture.renderList != null) {
							if (zwatermat.refractionTexture.renderList.length > 0) {
								zwatermat.refractionTexture.renderList.splice(0, zwatermat.refractionTexture.renderList.length);
							}
						}
					}
					try {
						if (zwatermat.reflectionTexture != null) {
							zwatermat.reflectionTexture.dispose();
							zwatermat.reflectionTexture = null;
						}
					} catch(ex) {}
					try {
						if (zwatermat.refractionTexture != null) {
							zwatermat.refractionTexture.dispose();
							zwatermat.refractionTexture = null;
						}
						zwatermat.dispose();
					} catch(ex) {}
					if (zcheck) {
						WTW.disposeClean(zstrtemp + '-water', false);
					}
				} else if (znamepart[6].indexOf('image') > -1) {
					/* dispose of hover over and click image mold layers */
					var zstrtemp = zmoldname;
					if (zstrtemp.indexOf('-base') > -1) {
						zstrtemp = zstrtemp.replace('-base','-mainimage');
					} else {
						zstrtemp += '-mainimage';
					}
					if (zcheck) {
						WTW.disposeClean(zstrtemp, false);
						WTW.disposeClean(zstrtemp.replace('-mainimage','-hoverimage'), false);
						WTW.disposeClean(zstrtemp.replace('-mainimage','-clickimage'), false);
					}
				}
			} catch (ex) {}
			var zmold = WTW.getMeshOrNodeByID(zmoldname);
			/* confirm mold is in the scene */
			if (zmold != null) {
				if (zmold.WTW != undefined) {
					if (zmold.WTW.particlesystem != undefined) {
						zmold.WTW.particlesystem.stop();
						zmold.WTW.particlesystem.reset();
						WTW.disposeClean(zmoldname + '-sprite');
					}
				}
				try {
					if (zmoldname.indexOf('babylonfile') > -1 || zmoldname.indexOf('actionzone') > -1 || zmoldname.indexOf('myavatar') > -1 || zmoldname.indexOf('person') > -1 || zmoldname.indexOf('editavatar') > -1 || zmoldname == 'hud' || zmoldname == 'hudlogin') {
						/* dispose of child objects from imported meshes */
						var zchildmeshes = zmold.getChildren();
						if (zchildmeshes != null) {
							for (var i=0; i < zchildmeshes.length; i++) {
								if (zchildmeshes[i] != null) {
									WTW.removeReflectionRefraction(zchildmeshes[i].name);
									zchildmeshes[i].dispose();
								}
							}
						}
					}
				} catch(ex) {}
				try {
					/* dispose of any action managers (animations) */
					if (zmold.actionManager != null) {
						zmold.actionManager.dispose();
						zmold.actionManager = null;
					}
				} catch(ex) {}
				try {
					/* dispose of texture materials */
					if (zmold.material.diffuseTexture != null) {
						zmold.material.diffuseTexture.dispose();
						zmold.material.diffuseTexture = null;
					}
				} catch(ex) {}
				try {
					/* dispose of any remaining materials */
					if (zmold.material != null) {
						zmold.material.dispose();
						zmold.material = null;
					}
				} catch(ex) {}
				/* dispose of mold */
				zmold.dispose();
				zmold = null;
				WTW.setMoldLoaded(zmoldname, '0');
				if (zcheck) {
					/* dispose of action zone components (axle, pole, hinge, bases) */
					if (zmoldname.indexOf('actionzone') > -1) {
						WTW.disposeClean(zmoldname.replace('actionzone','actionzoneaxle'),false);
						WTW.disposeClean(zmoldname.replace('actionzone','actionzoneaxlepole'),false);
						WTW.disposeClean(zmoldname.replace('actionzone','actionzoneaxlebase'),false);
						WTW.disposeClean(zmoldname.replace('actionzone','actionzoneaxlebase2'),false);
					}
				}
				/* dispose of any dynamic meshes (changes subdivisions as get closer) */
				var zmoldfar = WTW.getMeshOrNodeByID(zmoldname + '-far');
				if (zmoldfar != null) {
					WTW.disposeClean(zmoldname + '-far');
				}
			}
			if (zmoldname.indexOf('babylonfile') > -1 || zmoldname.indexOf('myavatar') > -1 || zmoldname.indexOf('person') > -1 || zmoldname.indexOf('editavatar') > -1) {
				for (var i = 0; i < scene.meshes.length;i++) {
					/* check for child parts of the 3D Model that are still in the 3D Scene and delete them */
					if (scene.meshes[i].name.indexOf(zmoldname) > -1) {
						WTW.removeReflectionRefraction(scene.meshes[i].name);
						scene.meshes[i].dispose();
					}
				}
			}
			scene.blockfreeActiveMeshesAndRenderingGroups = false;
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-disposeClean=' + ex.message);
		scene.blockfreeActiveMeshesAndRenderingGroups = false;
	}
}

WTWJS.prototype.disposeSoundAndLights = function(zmoldname) {
	/* stop and remove sound and lights */
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		if (zmoldnameparts.molds != null) {
			if (zmoldnameparts.molds[zmoldnameparts.moldind] != null) {
				if (zmoldnameparts.molds[zmoldnameparts.moldind].sound != undefined) {
					if (zmoldnameparts.molds[zmoldnameparts.moldind].sound.sound != '') {
						zmoldnameparts.molds[zmoldnameparts.moldind].sound.sound.stop(0);
						zmoldnameparts.molds[zmoldnameparts.moldind].sound.sound.detachFromMesh();
						zmoldnameparts.molds[zmoldnameparts.moldind].sound.sound.dispose();
						zmoldnameparts.molds[zmoldnameparts.moldind].sound.sound = null;
						zmoldnameparts.molds[zmoldnameparts.moldind].sound.sound = '';
					}
				}
				if (zmoldnameparts.molds[zmoldnameparts.moldind].objects != undefined) {
					if (zmoldnameparts.molds[zmoldnameparts.moldind].objects.light != '') {
						zmoldnameparts.molds[zmoldnameparts.moldind].objects.light.dispose();
						zmoldnameparts.molds[zmoldnameparts.moldind].objects.shadows.dispose();
						zmoldnameparts.molds[zmoldnameparts.moldind].objects.light = '';
						zmoldnameparts.molds[zmoldnameparts.moldind].objects.shadows = '';
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-disposeSoundAndLights=' + ex.message);
	}
}

WTWJS.prototype.disposeSound = function(zmoldname) {
	/* stop and unload sound if it exists */
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		if (zmoldnameparts.molds != null) {
			if (zmoldnameparts.molds[zmoldnameparts.moldind] != null) {
				if (zmoldnameparts.molds[zmoldnameparts.moldind].sound.sound != '') {
					zmoldnameparts.molds[zmoldnameparts.moldind].sound.sound.stop(0);
					zmoldnameparts.molds[zmoldnameparts.moldind].sound.sound.detachFromMesh();
					zmoldnameparts.molds[zmoldnameparts.moldind].sound.sound.dispose();
					zmoldnameparts.molds[zmoldnameparts.moldind].sound.sound = null;
					zmoldnameparts.molds[zmoldnameparts.moldind].sound.sound = '';
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-disposeSound=' + ex.message);
	}
}

WTWJS.prototype.disposeMaterial = function(zmaterialname) {
	/* dispose of material from all molds using it in the 3D Scene */
	try {
		var zcovering = scene.getMaterialByID(zmaterialname);
		if (zcovering != null) {
			zcovering.dispose();
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-disposeMaterial=' + ex.message);
	}
}

WTWJS.prototype.disposeDirectionalTexture = function(zmold) {
	/* clear a directional texture (applies to 6 sided rectangular cubes and processes all sides individually) */
	try {
		if (zmold != null) {
			if (zmold.material != undefined) {
				if (zmold.material.subMaterials != undefined) {
					for (var i=0;i < zmold.material.subMaterials.length;i++) {
						if (zmold.material.subMaterials[i].diffuseTexture != undefined) {
							if (zmold.material.subMaterials[i].diffuseTexture != null) {
								zmold.material.subMaterials[i].diffuseTexture.dispose();
								zmold.material.subMaterials[i].diffuseTexture = null;
							}
						}
					}
					zmold.material.dispose();
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-disposeDirectionalTexture=' + ex.message);
	} 
}

WTWJS.prototype.disposeMoldEvent = function(zmoldname) {
	/* dispose mold animation event */
	try {
		for (var i=WTW.moldEvents.length-1;i>-1;i--) {
			if (WTW.moldEvents[i] != null) {
				if (WTW.moldEvents[i].moldname.indexOf(zmoldname) > -1) {
					if (typeof window[WTW.moldEvents[i].animationname] == 'function') {
						if (WTW.moldEvents[i].soundid != '') {
							if (typeof WTW.moldEvents[i].sound.play == 'function') {
								WTW.moldEvents[i].sound.stop();
							}
						}
						window[WTW.moldEvents[i].animationname] = null;
					}
					WTW.moldEvents.splice(i, 1);
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-disposeMoldEvent=' + ex.message);
	}
}

WTWJS.prototype.disposeShadowFromMold = function(zmoldname) {
	/* dispose of a shadow from the global shadowmap */
	try {
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null && WTW.shadows != null) {
			WTW.shadows.removeShadowCaster(zmold, true);
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-disposeShadowFromMold=' + ex.message);
	} 
}

WTWJS.prototype.disposeReflectionFromMold = function(zmoldname) {
	/* dispose the mold from the reflection / refraction list */
	try {
		if (WTW.waterMat != null) {
			if (WTW.waterMat.reflectionTexture != null) {
				for (var i=WTW.waterMat.reflectionTexture.renderList.length-1; i > -1 ; i--) {
					if (WTW.waterMat.reflectionTexture.renderList[i] != null) {
						if (WTW.waterMat.reflectionTexture.renderList[i].name == zmoldname) {
							WTW.waterMat.reflectionTexture.renderList[i] = null;
							WTW.waterMat.reflectionTexture.renderList.splice(i,1);
						}
					}
				}
			}
			if (WTW.waterMat.refractionTexture != null) {
				for (var i=WTW.waterMat.refractionTexture.renderList.length-1; i > -1 ; i--) {
					if (WTW.waterMat.refractionTexture.renderList[i] != null) {
						if (WTW.waterMat.refractionTexture.renderList[i].name == zmoldname) {
							WTW.waterMat.refractionTexture.renderList[i] = null;
							WTW.waterMat.refractionTexture.renderList.splice(i,1);
						}
					}
				}
			}
		}
		for (var j=0; j < WTW.communitiesMolds.length;j++) {
			if (WTW.communitiesMolds[j] != null) {
				if (WTW.communitiesMolds[j].shape == 'waterplane' || WTW.communitiesMolds[j].shape == 'waterdisc') {
					var zwatermat = scene.getMaterialByID(WTW.communitiesMolds[j].moldname + '-watermat');
					if (zwatermat != null) {
						if (zwatermat.reflectionTexture != null) {
							for (var i=zwatermat.reflectionTexture.renderList.length-1; i > -1 ; i--) {
								if (zwatermat.reflectionTexture.renderList[i] != null) {
									if (zwatermat.reflectionTexture.renderList[i].name == zmoldname) {
										zwatermat.reflectionTexture.renderList[i] = null;
										zwatermat.reflectionTexture.renderList.splice(i,1);
									}
								}
							}
						}
						if (zwatermat.refractionTexture != null) {
							for (var i=zwatermat.refractionTexture.renderList.length-1; i > -1 ; i--) {
								if (zwatermat.refractionTexture.renderList[i] != null) {
									if (zwatermat.refractionTexture.renderList[i].name == zmoldname) {
										zwatermat.refractionTexture.renderList[i] = null;
										zwatermat.refractionTexture.renderList.splice(i,1);
									}
								}
							}
						}
					}
				}
			}
		}
		for (var j=0; j < WTW.buildingMolds.length;j++) {
			if (WTW.buildingMolds[j] != null) {
				if (WTW.buildingMolds[j].shape == 'waterplane' || WTW.buildingMolds[j].shape == 'waterdisc') {
					var zwatermat = scene.getMaterialByID(WTW.buildingMolds[j].moldname + '-watermat');
					if (zwatermat != null) {
						if (zwatermat.reflectionTexture != null) {
							for (var i=zwatermat.reflectionTexture.renderList.length-1; i > -1 ; i--) {
								if (zwatermat.reflectionTexture.renderList[i] != null) {
									if (zwatermat.reflectionTexture.renderList[i].name == zmoldname) {
										zwatermat.reflectionTexture.renderList[i] = null;
										zwatermat.reflectionTexture.renderList.splice(i,1);
									}
								}
							}
						}
						if (zwatermat.refractionTexture != null) {
							for (var i=zwatermat.refractionTexture.renderList.length-1; i > -1 ; i--) {
								if (zwatermat.refractionTexture.renderList[i] != null) {
									if (zwatermat.refractionTexture.renderList[i].name == zmoldname) {
										zwatermat.refractionTexture.renderList[i] = null;
										zwatermat.refractionTexture.renderList.splice(i,1);
									}
								}
							}
						}
					}
				}
			}
		}
		for (var j=0; j < WTW.thingMolds.length;j++) {
			if (WTW.thingMolds[j] != null) {
				if (WTW.thingMolds[j].shape == 'waterplane' || WTW.thingMolds[j].shape == 'waterdisc') {
					var zwatermat = scene.getMaterialByID(WTW.thingMolds[j].moldname + '-watermat');
					if (zwatermat != null) {
						if (zwatermat.reflectionTexture != null) {
							for (var i=zwatermat.reflectionTexture.renderList.length-1; i > -1 ; i--) {
								if (zwatermat.reflectionTexture.renderList[i] != null) {
									if (zwatermat.reflectionTexture.renderList[i].name == zmoldname) {
										zwatermat.reflectionTexture.renderList[i] = null;
										zwatermat.reflectionTexture.renderList.splice(i,1);
									}
								}
							}
						}
						if (zwatermat.refractionTexture != null) {
							for (var i=zwatermat.refractionTexture.renderList.length-1; i > -1 ; i--) {
								if (zwatermat.refractionTexture.renderList[i] != null) {
									if (zwatermat.refractionTexture.renderList[i].name == zmoldname) {
										zwatermat.refractionTexture.renderList[i] = null;
										zwatermat.refractionTexture.renderList.splice(i,1);
									}
								}
							}
						}
					}
				}
			}
		} 
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-disposeReflectionFromMold=' + ex.message);
	} 
}

WTWJS.prototype.feedbackSnapshot = async function() {
	/* take Feedback Snapshot and update Feedback form */
	try {
		dGet('wtw_feedbacksnapshotbutton').onclick = '';
		dGet('wtw_feedbacksnapshotbutton').innerHTML = "<span style='color:gray;'>Loading Image...</span>";
		
		var zcontext = canvas.getContext('experimental-webgl', {preserveDrawingBuffer: true});
		scene.render();
		var zfiledata = canvas.toDataURL('image/png');
		zcontext = canvas.getContext('experimental-webgl', {preserveDrawingBuffer: false});
		var zrequest = {
			'filename': 'feedback-' + WTW.getRandomString(8) + '.png',
			'filepath': dGet('wtw_tcontentpath').value + '/uploads/feedback/snapshots/',
			'filedata': zfiledata,
			'function':'saveimage'
		};
		WTW.postAsyncJSON('/core/handlers/uploads.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.feedbackSnapshotResponse(zresponse);
			}
		);		
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-feedbackSnapshot=' + ex.message);
	} 
}

WTWJS.prototype.feedbackSnapshotResponse = function(zresponse) {
	/* Feedback Snapshot complete, update Feedback form */
	try {
		//zresponse.snapshotid, zresponse.snapshotpath, zresponse.snapshotdata

		dGet('wtw_feedbacksnapshot').src = zresponse.snapshotpath + '?' + WTW.getRandomString(5);
		WTW.show('wtw_feedbacksnapshot');
		
		dGet('wtw_feedbacksnapshotbutton').onclick = function(){
			WTW.feedbackSnapshot();
		};
		dGet('wtw_feedbacksnapshotbutton').innerHTML = 'Take Snapshot';

	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-feedbackSnapshotResponse=' + ex.message);
	} 
}

WTWJS.prototype.feedbackSubmit = async function() {
	/* submit Feedback form */
	try {
		if (dGet('wtw_feedbacksubject').value != '' && dGet('wtw_feedbackmessage').value != '') {
			var zrequest = {
				'serverinstanceid': dGet('wtw_serverinstanceid').value,
				'serverip': dGet('wtw_serverip').value,
				'url': btoa(window.location.href),
				'domainurl': btoa(wtw_domainurl),
				'wtwversion': btoa(wtw_version),
				'communityid': communityid,
				'buildingid': buildingid,
				'thingid': thingid,
				'feedbacktype': btoa(WTW.getDDLValue('wtw_feedbacktype')),
				'category': btoa(WTW.getDDLText('wtw_feedbackcategory')),
				'subject': btoa(dGet('wtw_feedbacksubject').value),
				'message': btoa(dGet('wtw_feedbackmessage').value),
				'snapshoturl': btoa(dGet('wtw_feedbacksnapshot').src),
				'feedbackname': btoa(dGet('wtw_feedbackname').value),
				'displayname': btoa(dGet('wtw_tdisplayname').value),
				'feedbackemail': btoa(dGet('wtw_feedbackemail').value),
				'useremail': btoa(dGet('wtw_tuseremail').value),
				'userid': dGet('wtw_tuserid').value,
				'userip': dGet('wtw_tuserip').value,
				'instanceid': dGet('wtw_tinstanceid').value,
				'globaluserid': dGet('wtw_tglobaluserid').value,
				'usertoken': dGet('wtw_tusertoken').value,
				'uploadpathid': dGet('wtw_tuploadpathid').value,
				'globaluseravatarid': dGet('wtw_tglobaluseravatarid').value,
				'useravatarid': dGet('wtw_tuseravatarid').value,
				'feedbackid': '',
				'function':'savefeedback'
			};
			WTW.hide('wtw_feedbackform');
			WTW.show('wtw_feedbackthankyou');
			WTW.postAsyncJSON('/core/handlers/tools.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					zrequest.feedbackid = zresponse.feedbackid;
					dGet('wtw_feedbacktype').selectedIndex = 0;
					dGet('wtw_feedbackcategory').selectedIndex = 0;
					dGet('wtw_feedbacksubject').value = '';
					dGet('wtw_feedbackmessage').value = '';
					dGet('wtw_feedbacksnapshot').src = '';
					WTW.hide('wtw_feedbacksnapshot');
					
					WTW.pluginsFeedbackSubmit(zrequest);
					
					window.setTimeout(function(){
						WTW.hide('wtw_feedbackthankyou');
						WTW.show('wtw_feedbackform');
					},5000);
				}
			);
		} else {
			if (dGet('wtw_feedbacksubject').value == '') {
				dGet('wtw_feedbacksubject').focus();
			} else {
				dGet('wtw_feedbackmessage').focus();
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_common.js-feedbackSubmit=' + ex.message);
	} 
}
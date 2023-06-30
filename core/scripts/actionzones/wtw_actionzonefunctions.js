/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions provide many of the common functions for browse and admin modes */
/* action zone functions are used to further define what happens when an avatar enters certain action zones */

WTWJS.prototype.checkActionZones = function() {
	/* check to see if your avatar or any other avatar is in an action zone to trigger an action */
	try {
		for (var i = 0; i < WTW.actionZones.length; i++) {
			if (WTW.actionZones[i] != null) {
				var zmoldname = WTW.actionZones[i].moldname;
				var zactionzone = WTW.getMeshOrNodeByID(zmoldname);
				if (zmoldname != undefined) {
					if ((zmoldname.indexOf('loadzone') > -1 || zmoldname.indexOf('teleportzone') > -1) && WTW.actionZones[i].shown != '2') {
						WTW.actionZones[i].status = 0;
					} else if (zactionzone != null) {
						var zmeinzone = false;
						if (WTW.myAvatar != null) {
							zmeinzone = WTW.myAvatar.intersectsMesh(zactionzone, false);
						}
						/* Available in Admin Mode Only, sets all load zones as if the avatar is in them so that it loads all sections of the map - great for getting snapshots and images */
						if (WTW.loadAllActionZones == 1 && WTW.adminView == 1 && zmoldname.indexOf('loadzone') > -1) {
							zmeinzone = true;
						}
						var zothersinzone = false;
						/* check if others are in the zone */
						
						zothersinzone = WTW.pluginsCheckActionPerZoneTrigger(zactionzone);
						if (zmeinzone || zothersinzone) {
							if (zmeinzone && zmoldname.indexOf('loadzone') > -1 && WTW.actionZones[i].status != 2) {
								/* my avatar in load zone - triggers loading of molds */
								if (WTW.actionZones[i].actionzonename.toLowerCase().indexOf('extreme') > -1 && WTW.actionZones[i].actionzonename.toLowerCase().indexOf('custom') == -1) {
									if (WTW.actionZones[i].status == 0) {
										/* loads molds in the zone */
										WTW.addLoadZoneToQueue(i);
									}
								}
								/* loads JavaScripts specifically for action zone */
								WTW.checkLoadScripts(i);
								try {
									/* trigger a pageview in analytics if set */
									WTW.checkAnalytics(i);
								} catch (ex) {}
								/* trigger plugins when avatar enters zone */
								WTW.pluginsEnterActionZone(zmoldname, WTW.actionZones[i]);
								/* status 2 means loaded */
								WTW.actionZones[i].status = 2;
							} else if (zmeinzone == false && zmoldname.indexOf('loadzone') > -1 && WTW.actionZones[i].status != 0) {
								if (WTW.actionZones[i].actionzonename.toLowerCase().indexOf('extreme') > -1 && WTW.actionZones[i].actionzonename.toLowerCase().indexOf('custom') == -1) {
									/* if avatar left zone, unload zone */
									if (WTW.actionZones[i].status == 2) {
										/* unload molds in zone */
										WTW.addUnloadZoneToQueue(i);
									}
								}
								/* trigger plugins when avatar exits zone */
								WTW.pluginsExitActionZone(zmoldname, WTW.actionZones[i]);
								/* status 0 means unloaded */
								WTW.actionZones[i].status = 0;
							} else if (zmeinzone && zmoldname.indexOf('teleportzone') > -1 && WTW.actionZones[i].status != 2 && WTW.isInitCycle == 0) {
								/* entered teleport */
								WTW.actionZones[i].status = 2;
								WTW.teleport(i);
							} else if (zmoldname.indexOf('loadanimations') > -1) {
								/* when in zone, see if there are animations defined to load */
								WTW.checkLoadAnimations(i);
							} else if (zmoldname.indexOf('clickactivated') > -1) {
								/* action zone for click activated items (not in use yet) */
							} else if (zmoldname.indexOf('door') > -1 && WTW.actionZones[i].status != 4 && WTW.actionZones[i].status != 3) {
								/* status 3 means opening door - status 4 means door is fully open */
								WTW.actionZones[i].status = 3;
							} else if (zmoldname.indexOf('mirror') > -1 && WTW.actionZones[i].status != 2) {
								/* mirror zone loads objects into the mirror reflection */
								WTW.actionZones[i].status = 2;
								WTW.checkMirrorReflectionList(i);
							} else if (zmeinzone && zmoldname.indexOf('ridealong') > -1) {
								/* when in ride along zone, set the avatar parent to zone parent to move with the parent and recalculate relative position */
								WTW.checkRideAlongZone(zactionzone, i, zmeinzone, zothersinzone);
							}
						} else {
							if (zmoldname.indexOf('loadzone') > -1 && WTW.actionZones[i].status != 0) {
								/* if avatar is not in the load zone, unload molds identified by that zone */
								if (WTW.actionZones[i].actionzonename.toLowerCase().indexOf('extreme') > -1 && WTW.actionZones[i].actionzonename.toLowerCase().indexOf('custom') == -1) {
									/* if avatar is not in parent zone, unload the zone itself */
									if (WTW.actionZones[i].status == 2) {
										WTW.addUnloadZoneToQueue(i);
									}
								}
								/* if there were JavaScripts loaded with the zone, unload them */
								WTW.checkUnloadScripts(i);
								/* trigger plugins when avatar exits zone */
								WTW.pluginsExitActionZone(zmoldname, WTW.actionZones[i]);
								/* status 0 means not in zone */
								WTW.actionZones[i].status = 0;
							} else if (zmoldname.indexOf('clickactivated') > -1) {
								/* action zone for click activated items (not in use yet) */
							} else if (zmoldname.indexOf('door') > -1 && WTW.actionZones[i].status != 2 && WTW.actionZones[i].status != 1 && WTW.actionZones[i].status != 0) {
								/* door status 2 means closing door, status 0 means door closed */
								WTW.actionZones[i].status = 2;
							} else if (zmoldname.indexOf('mirror') > -1 && WTW.actionZones[i].status != 2) {
								/* mirror status 0 means not in zone, unload reflection list */
								WTW.actionZones[i].status = 0;
								WTW.checkMirrorReflectionList(i);
							} else if (zmeinzone == false && zmoldname.indexOf('ridealong') > -1) {
								/* when avatar returns from ride along zone, set the avatar parent to scene parent and recalculate position */
								WTW.checkRideAlongZone(zactionzone, i, zmeinzone, zothersinzone);
							}
						}
						/* allow hooks for plugins to add code on check zone (mostly for custom zones or to add functions to an existing zone) */
						WTW.pluginsCheckActionPerZone(zmoldname, i, zmeinzone, zothersinzone);
					} else if (zmoldname.indexOf('loadzone') > -1) {
						/* if loadzone not otherwise defined, set status to avatar not in zone */
						WTW.actionZones[i].status = 0;
					}
				}
			}
		}
		if (WTW.activityTimer != null && WTW.myAvatar != null) {
			/* reset hold position to check for movement and reset the activity timer */
			if (WTW.holdPosition != WTW.myAvatar.position.x + '|' + WTW.myAvatar.position.y + '|' + WTW.myAvatar.position.z) {
				WTW.holdPosition = WTW.myAvatar.position.x + '|' + WTW.myAvatar.position.y + '|' + WTW.myAvatar.position.z;
				WTW.resetActivityTimer();
			}
		}
		WTW.pluginsCheckActionZone();
		/* this variable tells the render cycle that it is already executed, it must be true to execute function again. different places in code will trigger a true to force it to run the function on demand only */
		WTW.checkZones = false;
	} catch(ex) {
		WTW.log('core-scripts-actionzones-wtw_actionzonefunctions.js-checkActionZones=' + ex.message);
	}
}

WTWJS.prototype.getActiveLoadZones = function() {
	/* get array of action load zones that my avatar is in */
	var zactionzones = [];
	try {
		for (var i = 0; i < WTW.actionZones.length; i++) {
			if (WTW.actionZones[i] != null) {
				var zmoldname = WTW.actionZones[i].moldname;
				var zactionzone = WTW.getMeshOrNodeByID(zmoldname);
				if (zmoldname != undefined) {
					if (zmoldname.indexOf('loadzone') > -1 && WTW.actionZones[i].status == 2) {
						zactionzones[zactionzones.length] = WTW.actionZones[i];
					}
				}
			}
		}		
	} catch (ex) {
		WTW.log('core-scripts-actionzones-wtw_actionzonefunctions.js-getActiveLoadZones=' + ex.message);
	}
	return zactionzones;
}

WTWJS.prototype.getActiveWebs = function() {
	/* get array of webs that my avatar is in the extreme zone */
	var zwebs = [];
	try {
		for (var i = 0; i < WTW.actionZones.length; i++) {
			if (WTW.actionZones[i] != null) {
				var zmoldname = WTW.actionZones[i].moldname;
				var zactionzone = WTW.getMeshOrNodeByID(zmoldname);
				if (zmoldname != undefined) {
					if (zmoldname.indexOf('loadzone') > -1 && WTW.actionZones[i].status == 2 && WTW.actionZones[i].actionzonename.toLowerCase().indexOf('extreme') > -1 && WTW.actionZones[i].actionzonename.toLowerCase().indexOf('custom') == -1) {
						var zfound = false;
						var zwebtype = 'community';
						var zwebid = WTW.actionZones[i].communityinfo.communityid;
						if (WTW.actionZones[i].buildinginfo.buildingid != '') {
							zwebtype = 'building';
							zwebid = WTW.actionZones[i].buildinginfo.buildingid;
						} else if (WTW.actionZones[i].thinginfo.thingid != '') {
							zwebtype = 'thing';
							zwebid = WTW.actionZones[i].thinginfo.thingid;
						}
						/* check if the web is already in the array */
						for (var j = 0;j < zwebs.length;j++) {
							if (zwebs[j] != null) {
								if (zwebs[j].webtype == zwebtype && zwebs[j].webid == zwebid) {
									zfound = true;
								}
							}
						}
						if (zfound == false) {
							/* only add if not already in the array */
							zwebs[zwebs.length] = {
								'webtype': zwebtype,
								'webid': zwebid
							};
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-actionzones-wtw_actionzonefunctions.js-getActiveWebs=' + ex.message);
	}
	return zwebs;
}

WTWJS.prototype.checkAvatarsInZone = function(zactionzone) {
	/* for future use - to check if a multiplayer avatar is in the action zone */
	var zinzone = false;
	try {
		//zmeinzone = WTW.myAvatar.intersectsMesh(zactionzone, false);
		
		
		
	} catch (ex) {
		WTW.log('core-scripts-actionzones-wtw_actionzonefunctions.js-checkAvatarsInZone=' + ex.message);
	}
	return zinzone;
}

WTWJS.prototype.checkLoadAnimations = function(zactionzoneind) {
	/* when an avatar walks into a Load Animation action zone, this function checks for an animations list to load to your avatar */
	try {
		if (WTW.actionZones[zactionzoneind] != null) {
			if (WTW.actionZones[zactionzoneind].avataranimations != null) {
				if (WTW.actionZones[zactionzoneind].avataranimations.length > 0) {
					var zazanimations = WTW.actionZones[zactionzoneind].avataranimations;
					for (var i=0;i < zazanimations.length;i++) {
						if (zazanimations[i] != null) {
							var zactionzone = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname);
							if (zactionzone != null) {
								var zavatar = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value);
								if (zavatar != null) {
									var zmeinzone = zavatar.intersectsMesh(zactionzone, false);
									if (zmeinzone) {
										if (zavatar.WTW != null) {
											if (zavatar.WTW.animations != null) {
												if (zavatar.WTW.animations.running != null) {
													if (zavatar.WTW.animations.running[zazanimations[i].animationevent] == undefined) {
														var zanimationloop = true;
														if (zazanimations[i].animationloop == '0') {
															zanimationloop = false;
														}
														WTW.loadAvatarAnimation(zavatar.name, '', zazanimations[i].animationfriendlyname, zazanimations[i].animationicon, zazanimations[i].avataranimationid, zazanimations[i].animationevent, zazanimations[i].objectfolder, zazanimations[i].objectfile, zazanimations[i].startframe, zazanimations[i].endframe, zazanimations[i].speedratio, 0, zazanimations[i].loadpriority, zanimationloop, null);
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}	
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-actionzones-wtw_actionzonefunctions.js-checkLoadAnimations=' + ex.message);
	}
}


WTWJS.prototype.checkRideAlongZone = function(zactionzone, zactionzoneind, zmeinzone, zothersinzone) {
	/* see if avatar entered a ride along zone - if so, change the parent and transpose the position and rotation */
	try {
		var zavatarparentname = '';
		var zactionzoneparentname = zactionzone.name + '-parenttest';
		var zactionzoneparent = WTW.getMeshOrNodeByID(zactionzoneparentname);
//		var zactionzonepos = WTW.getWorldPosition(zactionzoneparent);
		//var zcoords = WTW.getWorldData(zactionzoneparent);
		
		
		if (WTW.myAvatar.parent != null) {
			zavatarparentname = WTW.myAvatar.parent.id;
		}
		if (zactionzoneparent != null) {
			if (zmeinzone) {
/*				var zcoords = WTW.getWorldData(zactionzoneparent);
				if (WTW.myAvatar.ridealong != undefined && WTW.myAvatar.ridealong != null) {
					if (WTW.isNumeric(zcoords.position.y) && WTW.isNumeric(WTW.myAvatar.ridealong.position.y)) {
//WTW.log('new=' + zactionzonepos.y);
//WTW.log('last=' + WTW.myAvatar.ridealong.position.y);
//WTW.log('dy=' + (zactionzonepos.y - WTW.myAvatar.ridealong.position.y));
						WTW.myAvatar.position.y += (Number(zactionzonepos.y) - Number(WTW.myAvatar.ridealong.position.y));
					}
				}
//				WTW.myAvatar.ridealong = zcoords;
*/				

				if (WTW.myAvatar.parent.name != zactionzoneparent.name) {
					WTW.myAvatar.setParent(zactionzoneparent);
					//WTW.myAvatar.parent = zactionzoneparent;
//WTW.log('zactionzoneparent=' + zactionzoneparent.name);
				}

//WTW.log('avatar=' + WTW.myAvatar.parent.name);

//				WTW.myAvatar.position.x -= (zcoords.position.x - zpositionx);
//				WTW.myAvatar.position.y -= (zcoords.position.y - zpositiony);
//				WTW.myAvatar.position.z -= (zcoords.position.z - zpositionz);
				//WTW.myAvatar.rotation.x = (zrotationx - zcoords.rotation.x);

//				WTW.myAvatar.rotation.y -= zcoords.rotation.y; //WTW.getRadians(Number(WTW.getDegrees(Number(zrotationy))) - Number(WTW.getDegrees(Number(zcoords.rotation.y))));
				//WTW.myAvatar.rotation.z = (zrotationz - zcoords.rotation.z);
//WTW.log('az-x=' + WTW.getDegrees(zrotationx) + ' = ' + WTW.getDegrees(zcoords.rotation.x));
//WTW.log('az-y=' + WTW.getDegrees(zrotationy) + ' = ' + WTW.getDegrees(zcoords.rotation.y));
//WTW.log('az-z=' + WTW.getDegrees(zrotationz) + ' = ' + WTW.getDegrees(zcoords.rotation.z));

				
			} else {
//				WTW.myAvatar.ridealong = null;
//				if (WTW.myAvatar.parent.name != WTW.mainParentMold.name) {
//					WTW.myAvatar.setParent(WTW.mainParentMold);
//WTW.log('parent=' + WTW.mainParentMold.name);		
//				}
//				WTW.myAvatar.position.x += (zpositionx - zcoords.position.x);
//				WTW.myAvatar.position.y -= (zpositiony - zcoords.position.y);
//WTW.log('zpositionz=' + zpositionz);
//WTW.log('zazz=' + zcoords.position.z);

//				WTW.myAvatar.position.z += (zpositionz - zcoords.position.z);
			} 
		}
	} catch (ex) {
		WTW.log('core-scripts-actionzones-wtw_actionzonefunctions.js-checkRideAlongZone=' + ex.message);
	}
}

WTWJS.prototype.initMirrorLoadZone = function(zmoldname, zmolddef) {
	try {
/*		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
			if (zmoldname.indexOf('-') > -1) {
				var znamepart = WTW.getMoldnameParts(zmoldname);
				if (znamepart.molds != null) {
					if (znamepart.molds[znamepart.moldind] != null) {
						if (znamepart.molds[znamepart.moldind].mirroractionzoneid == '') {
							var zactionzoneid = WTW.getRandomString(16);
							znamepart.molds[znamepart.moldind].mirroractionzoneid = zactionzoneid;
							var zactionzoneind = WTW.getNextCount(WTW.actionZones);
							WTW.actionZones[zactionzoneind] = WTW.newActionZone();
							WTW.actionZones[zactionzoneind].actionzoneid = zactionzoneid;
							WTW.actionZones[zactionzoneind].actionzonetype = 'mirror';
							WTW.actionZones[zactionzoneind].actionzoneshape = 'box';
							WTW.actionZones[zactionzoneind].status = 0;
							WTW.actionZones[zactionzoneind].shown = '0';
							WTW.actionZones[zactionzoneind].parentname = zmoldname;
							if (communityid != '') {
								var zbuildingid = '';
								if (communityid != '' && znamepart.webtype == 'buildingmolds' && znamepart.molds[znamepart.moldind].buildinginfo.buildingid != undefined) {
									zbuildingid = znamepart.molds[znamepart.moldind].buildinginfo.buildingid;
								}
								WTW.actionZones[zactionzoneind].communityinfo.communityid = communityid;
								WTW.actionZones[zactionzoneind].buildinginfo.buildingid = zbuildingid;
							} else if (buildingid != '') {
								WTW.actionZones[zactionzoneind].buildinginfo.buildingid = buildingid;
							} else if (thingid != '') {
								WTW.actionZones[zactionzoneind].thinginfo.thingid = thingid;
							}
							var zscalingx = zmold.scaling.x * 2;
							var zscalingy = zmold.scaling.y * 2;
							var zscalingz = zmold.scaling.z * 2;
							if (zscalingx < 60) {
								zscalingx = 60;
							}
							if (zscalingy < 60) {
								zscalingy = 60;
							}
							if (zscalingz < 60) {
								zscalingz = 60;
							}
							WTW.actionZones[zactionzoneind].scaling.x = zscalingx;
							WTW.actionZones[zactionzoneind].scaling.y = zscalingy;
							WTW.actionZones[zactionzoneind].scaling.z = zscalingz;
							WTW.setShownMolds();
						}
					}
				}
			}
		}*/
	} catch (ex) { 
		WTW.log('core-scripts-actionzones-wtw_actionzonefunctions.js-initMirrorLoadZone=' + ex.message);
	}
}

WTWJS.prototype.teleport = function(zactionzoneindex) {
	/* teleport to new community */
	try {
		WTW.isInitCycle = 1;
		var zwebid = '';
		var zteleportwebid = '';
		var zteleportwebtype = 'community';
		var zspawnactionzoneid = '';
		var zoldwebid = communityid;
		var zoldwebtype = 'community';
		var zoldconnectinggridind = '';
		if (buildingid != '') {
			zoldwebid = buildingid;
			zoldwebtype = 'building';
		} else if (thingid != '') {
			zoldwebid = thingid;
			zoldwebtype = 'thing';
		} else {
			
		}
		if (WTW.actionZones[zactionzoneindex] != null) {
			if (WTW.actionZones[zactionzoneindex].teleportwebid != undefined) {
				zteleportwebid = WTW.actionZones[zactionzoneindex].teleportwebid;
				zspawnactionzoneid = WTW.actionZones[zactionzoneindex].spawnactionzoneid;
				if (zteleportwebid != '') {
					if (zteleportwebid == zoldwebid) {
						/* same 3D Scene - different avatar position */
						/* hide avatar for reentry */
						var zavatarparts = [];
						var zavatarscale = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value + '-scale');
						if (zavatarscale != null) {
							zavatarparts = zavatarscale.getChildren();
						}
						for (var i=0; i<zavatarparts.length; i++) {
							if (zavatarparts[i] != null) {
								zavatarparts[i].isVisible = false;
								zavatarparts[i].visibility = 0;
							}
						}

						/* start stand for avatar while scene loads */
						/* start stand is a small box used to make sure you do not drop with gravity before the ground is rendered */
						var zspawnpoint = WTW.getSpawnPoint(WTW.spawnZones, zspawnactionzoneid);
						var zstartstand = BABYLON.MeshBuilder.CreateBox('startstand', {}, scene);
						zstartstand.scaling = new BABYLON.Vector3(50, 1, 50);
						zstartstand.position = new BABYLON.Vector3(zspawnpoint.position.x, zspawnpoint.position.y-.49, zspawnpoint.position.z);
						zstartstand.checkCollisions = true;
						zstartstand.material = new BABYLON.StandardMaterial('matstartstand', scene);
						zstartstand.material.alpha = 0;
						
						WTW.myAvatar.position = new BABYLON.Vector3(zspawnpoint.position.x, zspawnpoint.position.y + 1, zspawnpoint.position.z);
						WTW.myAvatar.rotation.y = WTW.getRadians(zspawnpoint.rotation.y);
						
						WTW.avatarShowFadeSwirlLong('myavatar-' + dGet('wtw_tinstanceid').value, zavatarparts);
						/* check the new position for what action zones the avatar is now inside */
						WTW.checkZones = true;
					} else {
						/* move to new 3D Scene */
						/* update the url to the new community id and enter url in history */
						if (window.history.pushState) {       
							var znewurl = new URL(window.location.href);       
							znewurl.search = '?communityid=' + zteleportwebid;
							window.history.pushState({ path: znewurl.href }, '', znewurl.href); 
						}
						/* get domaininfo, scene, and sky settings */
						WTW.getAsyncJSON('/connect/domaininfo.php?communityid=' + zteleportwebid, 
							function(zresponse) {
								zresponse = JSON.parse(zresponse);
								communityid = zteleportwebid;
								buildingid = '';
								thingid = '';
								var zconnectinggrids = [];
								/* new scene - clear current scene */
								zconnectinggrids = WTW.unloadAllZones(zoldwebid, zoldwebtype);
								
								/* hide avatar for reentry */
								var zavatarparts = [];
								var zavatarscale = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value + '-scale');
								if (zavatarscale != null) {
									zavatarparts = zavatarscale.getChildren();
								}
								for (var i=0; i<zavatarparts.length; i++) {
									if (zavatarparts[i] != null) {
										zavatarparts[i].isVisible = false;
										zavatarparts[i].visibility = 0;
									}
								}

								/* start stand for avatar while scene loads */
								/* start stand is a small box used to make sure you do not drop with gravity before the ground is rendered */
								var zspawnpoint = WTW.getSpawnPoint(zresponse.spawnzones, zspawnactionzoneid);
								var zstartstand = BABYLON.MeshBuilder.CreateBox('startstand', {}, scene);
								zstartstand.scaling = new BABYLON.Vector3(50, 1, 50);
								zstartstand.position = new BABYLON.Vector3(zspawnpoint.position.x, zspawnpoint.position.y-.49, zspawnpoint.position.z);
								zstartstand.checkCollisions = true;
								zstartstand.material = new BABYLON.StandardMaterial('matstartstand', scene);
								zstartstand.material.alpha = 0;
								
								WTW.myAvatar.position = new BABYLON.Vector3(zspawnpoint.position.x, zspawnpoint.position.y + 1, zspawnpoint.position.z);
								WTW.myAvatar.rotation.y = WTW.getRadians(zspawnpoint.rotation.y);
								
								WTW.avatarShowFadeSwirlLong('myavatar-' + dGet('wtw_tinstanceid').value, zavatarparts);
								
								if (zteleportwebid != zoldwebid || zteleportwebtype != zoldwebtype) {
									/* new 3D Community - load new scene settings */
									WTW.init = {
										'groundTextureID':zresponse.communityinfo.textureid,
										'groundTexturePath':zresponse.communityinfo.texturepath,
										'skyTextureID':zresponse.communityinfo.skydomeid,
										'skyTexturePath':zresponse.communityinfo.skydomepath,
										'sceneAmbientColor':zresponse.communityinfo.sceneambientcolor,
										'sceneClearColor':zresponse.communityinfo.sceneclearcolor,
										'sceneUseClonedMeshMap':Number(zresponse.communityinfo.sceneuseclonedmeshmap),
										'sceneBlockMaterialDirtyMechanism':Number(zresponse.communityinfo.sceneblockmaterialdirtymechanism),
										'sceneFogEnabled':Number(zresponse.communityinfo.scenefogenabled),
										'sceneFogMode':zresponse.communityinfo.scenefogmode,
										'sceneFogDensity':Number(zresponse.communityinfo.scenefogdensity),
										'sceneFogStart':Number(zresponse.communityinfo.scenefogstart),
										'sceneFogEnd':Number(zresponse.communityinfo.scenefogend),
										'sceneFogColor':zresponse.communityinfo.scenefogcolor,
										'sunDirectionalIntensity':Number(zresponse.communityinfo.sundirectionalintensity),
										'sunDiffuseColor':zresponse.communityinfo.sundiffusecolor,
										'sunSpecularColor':zresponse.communityinfo.sunspecularcolor,
										'sunGroundColor':zresponse.communityinfo.sungroundcolor,
										'sunDirectionX':Number(zresponse.communityinfo.sundirectionx),
										'sunDirectionY':Number(zresponse.communityinfo.sundirectiony),
										'sunDirectionZ':Number(zresponse.communityinfo.sundirectionz),
										'backLightIntensity':Number(zresponse.communityinfo.backlightintensity),
										'backLightDirectionX':Number(zresponse.communityinfo.backlightdirectionx),
										'backLightDirectionY':Number(zresponse.communityinfo.backlightdirectiony),
										'backLightDirectionZ':Number(zresponse.communityinfo.backlightdirectionz),
										'backLightDiffuseColor':zresponse.communityinfo.backlightdiffusecolor,
										'backLightSpecularColor':zresponse.communityinfo.backlightspecularcolor,
										'skyType':zresponse.communityinfo.skytype,
										'skySize':Number(zresponse.communityinfo.skysize),
										'skyBoxFolder':zresponse.communityinfo.skyboxfolder,
										'skyBoxFile':zresponse.communityinfo.skyboxfile,
										'skyBoxImageLeft':zresponse.communityinfo.skyboximageleft,
										'skyBoxImageUp':zresponse.communityinfo.skyboximageup,
										'skyBoxImageFront':zresponse.communityinfo.skyboximagefront,
										'skyBoxImageRight':zresponse.communityinfo.skyboximageright,
										'skyBoxImageDown':zresponse.communityinfo.skyboximagedown,
										'skyBoxImageBack':zresponse.communityinfo.skyboximageback,
										'skyPositionOffsetX':Number(zresponse.communityinfo.skypositionoffsetx),
										'skyPositionOffsetY':Number(zresponse.communityinfo.skypositionoffsety),
										'skyPositionOffsetZ':Number(zresponse.communityinfo.skypositionoffsetz),
										'skyBoxMicroSurface':Number(zresponse.communityinfo.skyboxmicrosurface),
										'skyBoxPBR':Number(zresponse.communityinfo.skyboxpbr),
										'skyBoxAsEnvironmentTexture':Number(zresponse.communityinfo.skyboxasenvironmenttexture),
										'skyBoxBlur':Number(zresponse.communityinfo.skyboxblur),
										'skyBoxDiffuseColor':zresponse.communityinfo.skyboxdiffusecolor,
										'skyBoxSpecularColor':zresponse.communityinfo.skyboxspecularcolor,
										'skyBoxAmbientColor':zresponse.communityinfo.skyboxambientcolor,
										'skyBoxEmissiveColor':zresponse.communityinfo.skyboxemissivecolor,
										'skyInclination':Number(zresponse.communityinfo.skyinclination),
										'skyLuminance':Number(zresponse.communityinfo.skyluminance),
										'skyAzimuth':Number(zresponse.communityinfo.skyazimuth),
										'skyRayleigh':Number(zresponse.communityinfo.skyrayleigh),
										'skyTurbidity':Number(zresponse.communityinfo.skyturbidity),
										'skyMieDirectionalG':Number(zresponse.communityinfo.skymiedirectionalg),
										'skyMieCoefficient':Number(zresponse.communityinfo.skymiecoefficient),
										'waterBumpHeight':Number(zresponse.communityinfo.waterbumpheight),
										'waterSubdivisions':Number(zresponse.communityinfo.watersubdivisions),
										'windForce':Number(zresponse.communityinfo.windforce),
										'windDirectionX':Number(zresponse.communityinfo.winddirectionx),
										'windDirectionY':Number(zresponse.communityinfo.winddirectiony),
										'windDirectionZ':Number(zresponse.communityinfo.winddirectionz),
										'waterWaveHeight':Number(zresponse.communityinfo.waterwaveheight),
										'waterWaveLength':Number(zresponse.communityinfo.waterwavelength),
										'waterColorRefraction':zresponse.communityinfo.watercolorrefraction,
										'waterColorReflection':zresponse.communityinfo.watercolorreflection,
										'waterColorBlendFactor':Number(zresponse.communityinfo.watercolorblendfactor),
										'waterColorBlendFactor2':Number(zresponse.communityinfo.watercolorblendfactor2),
										'waterAlpha':Number(zresponse.communityinfo.wateralpha),
										'groundPositionY':Number(zresponse.startlocation.position.groundpositiony),
										'waterPositionY':Number(zresponse.startlocation.position.waterpositiony),
										'startPositionX':Number(zresponse.startlocation.position.x),
										'startPositionY':Number(zresponse.startlocation.position.y),
										'startPositionZ':Number(zresponse.startlocation.position.z),
										'startScalingX':Number(zresponse.startlocation.scaling.x),
										'startScalingY':Number(zresponse.startlocation.scaling.y),
										'startScalingZ':Number(zresponse.startlocation.scaling.z),
										'startRotationX':Number(zresponse.startlocation.rotation.x),
										'startRotationY':Number(zresponse.startlocation.rotation.y),
										'startRotationZ':Number(zresponse.startlocation.rotation.z),
										'gravity':Number(zresponse.domaininfo.gravity),
										'loaded':1
									};
									WTW.extraGround.position.y = Number(WTW.init.groundPositionY);
									/* remove current water from the old scene */
									if (WTW.water != null) {
										WTW.water.material.dispose();
										WTW.water.dispose();
										WTW.water = null;
									}
									/* if ground is set below 0 (zero) y value, add water to the scene at 0 (zero) y value - otherwise no main water plane is loaded */
									if ((WTW.init.groundPositionY < 0) || (WTW.adminView == 1 && communityid != '')) {
										WTW.initLoadUpload(WTW.init.groundTextureID, WTW.init.groundTextureID, 7);
										if (WTW.adminView == 1 && communityid != '' && WTW.init.groundPositionY == 0) {
											WTW.init.waterPositionY = -50;
										}
										/* create water */
										WTW.water = BABYLON.Mesh.CreateGround('communitywater', 5000, 5000, Math.round(WTW.init.waterSubdivisions), scene, false);
										
										WTW.waterMat = new BABYLON.WaterMaterial('communitywatermat', scene, new BABYLON.Vector2(512, 512));
										
										WTW.waterMat.bumpTexture = new BABYLON.Texture('/content/system/images/waterbump.png', scene);
										WTW.waterMat.bumpHeight = WTW.init.waterBumpHeight;

										WTW.waterMat.windForce = WTW.init.windForce;
										WTW.waterMat.windDirection = new BABYLON.Vector2(WTW.init.windDirectionX, WTW.init.windDirectionZ);

										WTW.waterMat.waveHeight = WTW.init.waterWaveHeight;
										WTW.waterMat.waveLength = WTW.init.waterWaveLength;	

										/* water color blended with the refraction (near) */
										WTW.waterMat.waterColor = new BABYLON.Color3.FromHexString(WTW.init.waterColorRefraction); 
										WTW.waterMat.colorBlendFactor = WTW.init.waterColorBlendFactor;
										/* water color blended with the reflection (far) */
										WTW.waterMat.waterColor2 = new BABYLON.Color3.FromHexString(WTW.init.waterColorReflection); 
										WTW.waterMat.colorBlendFactor2 = WTW.init.waterColorBlendFactor2;

										WTW.waterMat.alpha = WTW.init.waterAlpha;
										WTW.waterMat.backFaceCulling = true;
										WTW.water.isPickable = false;
										WTW.water.checkCollisions = false;
										WTW.water.renderingGroupId = 1;
										WTW.water.material = WTW.waterMat;
										WTW.water.position.y = WTW.init.waterPositionY;
										WTW.waterMat.addToRenderList(WTW.sky);
										WTW.waterMat.addToRenderList(WTW.extraGround);
							//			WTW.water.physicsImpostor = new BABYLON.PhysicsImpostor(WTW.water, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.5 }, scene);
									}

									scene.gravity = new BABYLON.Vector3(0, -WTW.init.gravity, 0);
									scene.ambientColor = new BABYLON.Color3.FromHexString(WTW.init.sceneAmbientColor);
									scene.clearColor = new BABYLON.Color3.FromHexString(WTW.init.sceneClearColor); //optional light setting  */

									/* set fog if enabled */
									WTW.setFog();
											
									/* set the sun and back light the 3D Scene */
									WTW.setSunLight();
									
									/* initialize sky - scaling and material settings */
									WTW.createSky();

									/* set new content rating */
									WTW.setContentRating();
								}
								
								/* set community and initial building name */
								document.title = zresponse.communityinfo.communityname;
								dGet('wtw_showcommunityname').innerHTML = zresponse.communityinfo.communityname;
								dGet('wtw_showcommunitynamemobile').innerHTML = '3D Community: <b>' + zresponse.communityinfo.communityname + '</b>';
								dGet('wtw_showbuildingname').innerHTML = "<span class='wtw-yellow'>Welcome to WalkTheWeb</span>";
								dGet('wtw_showbuildingnamemobile').innerHTML = "<span class='wtw-yellow'>Welcome to WalkTheWeb</span>";
								/* checking for main parent - adding if needed */
								WTW.mainParent = 'local-connectinggrids-0---';
								var zmainparent = WTW.getMeshOrNodeByID(WTW.mainParent);
								if (zmainparent == null) {
									if (WTW.mainParentMold != null) {
										WTW.mainParentMold.name = WTW.mainParent;
										WTW.mainParentMold.id = WTW.mainParent;
									} else {
										/* create the parent most connecting grid box */
										/* everything else parents to this reference point */
										zmainparent = new BABYLON.TransformNode(WTW.mainParent);
										zmainparent.position = new BABYLON.Vector3(0,0,0);
										zmainparent.rotation = new BABYLON.Vector3(0,0,0);
										zmainparent.scaling = new BABYLON.Vector3(1,1,1);
										zmainparent.name = WTW.mainParent;
										zmainparent.id = WTW.mainParent;
									}
								}
								/* set global main parent mold WTW.mainParentMold */
								WTW.mainParentMold = zmainparent;
								WTW.myAvatar.parent = zmainparent;
								
								/* remove connecting grids from old scene - if it is no longer the same scene */
								if (zteleportwebid != zoldwebid || zteleportwebtype != zoldwebtype) {
									for (var i=0; i<zconnectinggrids.length;i++) {
										if (zconnectinggrids[i] != null) {
											if (zconnectinggrids[i].moldname != WTW.mainParent) {
												WTW.addUnloadConnectingGridToQueue(zconnectinggrids[i].connectinggridind);
												WTW.disposeClean(zconnectinggrids[i].moldname);
												WTW.connectingGrids[zconnectinggrids[i].connectinggridind] = null;
											}
										}
									}
								}
								
								/* load new scene */
								WTW.loadScene();
								window.setTimeout(function() {
									WTW.isInitCycle = 0;
									WTW.resetActivityTimer();
								}, 5000);
								window.setTimeout(function() {
									/* move avatar just in case the avatar sunk into the ground before it loaded the scene */
									WTW.myAvatar.position = new BABYLON.Vector3(zspawnpoint.position.x, zspawnpoint.position.y + .57, zspawnpoint.position.z);
									WTW.myAvatar.rotation.y = WTW.getRadians(zspawnpoint.rotation.y);
									/* delete start stand after 10 seconds */
									window.setTimeout(function() {
										if (WTW.isInitCycle == 0) {
											zstartstand.dispose();
										}
									},10000);
								},3000);
							}
						);
					}
				}
			}
		}
/* 	remember log off from multiplayer avatars scenes
	load domain settings
*/
	} catch (ex) {
		WTW.log('core-scripts-actionzones-wtw_actionzonefunctions.js-teleport=' + ex.message);
	}
}

WTWJS.prototype.unloadAllZones = function(zoldwebid, zoldwebtype) {
	/* Unload All Zones for teleport */
	var zconnectinggrids = [];
	try {
		var j = 0;
		if (scene.meshes != null) {
			for (var i=0;i < scene.meshes.length;i++) {
				var zmoldname = scene.meshes[i].name;
				var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
				if (zmoldname.indexOf('loadzone') > -1) {
					/* dispose of load zone meshes so that the avatar will not be found in it and reload */
					//scene.meshes[i].dispose();
					
				}
				/* collect connecting grid names */
				if (zmoldname.indexOf('connectinggrid') > -1) {
					zconnectinggrids[j] = {
						'connectinggridind': zmoldnameparts.moldind,
						'connectinggridid': zmoldnameparts.moldid,
						'moldname': zmoldname
					};
					j += 1;
				}
			}
		}
		
		for (var i=0; i<WTW.actionZones.length;i++) {
			if (WTW.actionZones[i] != null) {
				WTW.disposeClean(WTW.actionZones[i].moldname);
				WTW.actionZones[i] = null;
			}
		}
		for (var i=0; i<WTW.communitiesMolds.length;i++) {
			if (WTW.communitiesMolds[i] != null) {
				WTW.disposeClean(WTW.communitiesMolds[i].moldname);
				WTW.communitiesMolds[i] = null;
			}
		}
		for (var i=0; i<WTW.buildingMolds.length;i++) {
			if (WTW.buildingMolds[i] != null) {
				WTW.disposeClean(WTW.buildingMolds[i].moldname);
				WTW.buildingMolds[i] = null;
			}
		}
		for (var i=0; i<WTW.thingMolds.length;i++) {
			if (WTW.thingMolds[i] != null) {
				WTW.disposeClean(WTW.thingMolds[i].moldname);
				WTW.thingMolds[i] = null;
			}
		}
		WTW.pluginsUnloadAllZones(zoldwebid, zoldwebtype);

		for (var i = 0; i < WTW.actionZones.length; i++) {
			if (WTW.actionZones[i] != null) {
				/* queue to unload load zones so that they are properly unloaded with everything they trigger */
				WTW.actionZones[i].shown = '0';
				WTW.actionZones[i].status = 0;
				WTW.addUnloadZoneToQueue(i);
			}
		}
		
		WTW.communities = [];
		WTW.buildings = [];
		WTW.things = [];
		WTW.automations = [];

	} catch (ex) {
		WTW.log('core-scripts-actionzones-wtw_actionzonefunctions.js-unloadAllZones=' + ex.message);
	}
	return zconnectinggrids;
}

WTWJS.prototype.getSpawnPoint = function(zspawnzones, zspawnactionzoneid) {
	/* get entry point for avatar */
	/* uses a random offset so that multiplayer avatars do not enter at the exact position */
	var zspawnpoint = {
		'position': {
			'x':Number(WTW.init.startPositionX),
			'y':Number(WTW.init.startPositionY),
			'z':Number(WTW.init.startPositionZ)
		},
		'scaling': {
			'x':1,
			'y':1,
			'z':1
		},
		'rotation': {
			'x':0,
			'y':Number(WTW.init.startRotationY),
			'z':0
		}
	};
	try {
		if (zspawnzones == undefined) {
			zspawnzones = WTW.spawnZones;
		}
		if (zspawnactionzoneid == undefined) {
			zspawnactionzoneid = WTW.spawnZoneID;
		}
		/* randomly select a spawn zone (notice one more than the count of spawn zones will be for default location) */
		/* using Math.random() * (max - min) + min */
		var zrand = Math.round(Math.random() * zspawnzones.length);
		/* check for select spawn zone to exist, if it is set */
		if (zspawnactionzoneid != '' && zspawnactionzoneid != 'default') {
			for (var i=0;i<zspawnzones.length;i++) {
				if (zspawnzones[i] != null) {
					if (zspawnzones[i].actionzoneid == zspawnactionzoneid) {
						zrand = i;
						i = zspawnzones.length;
					}
				}
			}
		}
		if (zspawnzones[zrand] != null && zspawnactionzoneid != 'default') {
			var zpositivex = Math.round(Math.random());
			var zpositivez = Math.round(Math.random());
			/* divided by 2 so that it is distance from center point */
			var zlenx = zspawnzones[zrand].scalingx/2;
			var zlenz = zspawnzones[zrand].scalingz/2;
			zlenx = Math.random() * zlenx;
			zlenz = Math.random() * zlenz;

			/* random positive or negative from center point */
			if (zpositivex == 0) {
				zlenx = -zlenx;
			}
			if (zpositivez == 0) {
				zlenz = -zlenz;
			}
			/* calculate x and z for the rotation of the spawnzone */
			var zangle = WTW.getRadians(Number(zspawnzones[zrand].rotationy));
			var zdistx = Math.cos(zangle) * zlenx + Math.sin(zangle) * zlenz;
			var zdistz = Math.cos(zangle) * zlenz - Math.sin(zangle) * zlenx;
			/* append the x and z rotation to the origin of the spawn zone */
			zspawnpoint.position.x = Number(zspawnzones[zrand].positionx) + zdistx;
			zspawnpoint.position.y = Number(zspawnzones[zrand].positiony);
			zspawnpoint.position.z = Number(zspawnzones[zrand].positionz) + zdistz;
			zspawnpoint.rotation.y = Number(zspawnzones[zrand].rotationy);
		} else {
			/* default entry point, no spawn zones found or from random use of original position with spawn zones available */
			var zrand1 = ((Math.floor(Math.random() * 200) + 1)/10) - 10;
			var zrand2 = ((Math.floor(Math.random() * 200) + 1)/10) - 10;
			zspawnpoint.position.x += zrand1;
			zspawnpoint.position.z += zrand2;
		}
	} catch (ex) {
		WTW.log('core-scripts-actionzones-wtw_actionzonefunctions.js-getSpawnPoint=' + ex.message);
	}
	return zspawnpoint;
}

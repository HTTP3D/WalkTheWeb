/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions load and unload placeholders and avatars with their colors and animations */

WTWJS.prototype.loadAvatarPlaceholder = function() {
	/* call to create the placeholder before the user selects their avatar - provides a parent and focus for the cameras */
	try {
		/* get default avatar definition and set name, instance, and position */
		var zavatardef = WTW.newAvatarDef();
		zavatardef.name = 'myavatar-' + dGet('wtw_tinstanceid').value;
		zavatardef.instanceid = dGet('wtw_tinstanceid').value;
		zavatardef.start.position.y += .57;
		/* start stand is a small box used to make sure you do not drop with gravity before the ground is rendered */
		/* is it set to delete after 10 seconds */
		var zstartstand = BABYLON.MeshBuilder.CreateBox('startstand', {}, scene);
		zstartstand.scaling = new BABYLON.Vector3(1, 1, 1);
		zstartstand.position = new BABYLON.Vector3(zavatardef.start.position.x, zavatardef.start.position.y-.49, zavatardef.start.position.z);
		zstartstand.checkCollisions = true;
		zcovering = new BABYLON.StandardMaterial('matstartstand', scene);
		zstartstand.material = new BABYLON.StandardMaterial('matstartstand', scene);
		zstartstand.material.alpha = 0;
		WTW.myAvatar = WTW.addAvatarPlaceholder(zavatardef.name, zavatardef);
		WTW.myAvatar.rotation.y = WTW.getRadians(zavatardef.start.rotation.y);
		window.setTimeout(function() {
			if (WTW.isInitCycle == 0) {
				zstartstand.dispose();
			}
		},10000);
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-loadAvatarPlaceholder=' + ex.message);
    }
}

WTWJS.prototype.reloadAvatar = function() {
	/* used by the global login page to trigger an avatar reload after changes are made */
	try {
		WTW.openLoginHUD('Loading 3D Avatar');
		WTW.getSavedAvatar('myavatar-' + dGet('wtw_tinstanceid').value, dGet('wtw_tglobaluseravatarid').value, dGet('wtw_tuseravatarid').value, '', true);
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-reloadAvatar=' + ex.message);
    }
}

WTWJS.prototype.getSavedAvatar = async function(zavatarname, zglobaluseravatarid, zuseravatarid, zavatarid, zsendrefresh) {
	/* fetches the avatar definition for either the global avatar, local logged in avatar, or anonymous avatar */
	try {
		if (zglobaluseravatarid == null) {
			zglobaluseravatarid = '';
		}
		if (zglobaluseravatarid == undefined) {
			zglobaluseravatarid = '';
		}
		if (zglobaluseravatarid == 'undefined') {
			zglobaluseravatarid = '';
		}
		if (zuseravatarid == null) {
			zuseravatarid = '';
		}
		if (zuseravatarid == undefined) {
			zuseravatarid = '';
		}
		if (zuseravatarid == 'undefined') {
			zuseravatarid = '';
		}
		if (zavatarid == null) {
			zavatarid = '';
		}
		if (zavatarid == undefined) {
			zavatarid = '';
		}
		if (zavatarid == 'undefined') {
			zavatarid = '';
		}
		if (zglobaluseravatarid != '' || zuseravatarid != '' || zavatarid != '') {
			var zinstanceid = '';
			if (zavatarname.indexOf('-') > -1) {
				zinstanceid = zavatarname.split('-')[1];
			}
			if (zglobaluseravatarid == '') {
				/* Local or Anonymous avatar - uses a get method to current server */
				WTW.getAsyncJSON('/connect/useravatar.php?avatarid=' + btoa(zavatarid) + '&useravatarid=' + btoa(zuseravatarid) + '&instanceid=' + btoa(zinstanceid), 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						if (zresponse != null) {
							if (zresponse.avatar != null) {
								WTW.updateAvatar(zavatarname, zresponse.avatar, zsendrefresh);
							}
						}
					}	
				);
			}
			WTW.pluginsGetSavedAvatar(zglobaluseravatarid, zinstanceid, zavatarname, zsendrefresh);
		} else {
			WTW.openLoginHUD('Select My Avatar');
		}
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-getSavedAvatar=' + ex.message);
    }
}

WTWJS.prototype.updateAvatar = function(zavatarname, zavatardef, zsendrefresh) {
	/* called to render a fetched avatar definition */
	/* avatar name is either 'myavatar-instanceid' for the current user's avatar or 'person-instanceid' for a multiplayer avatar in the scene */
	try {
		var zinstanceid = '';
		var zavataridold = '';
		var zavatarid = '';
		if (zavatardef != undefined) {
			if (zavatardef.avatarid != undefined) {
				zavatarid = zavatardef.avatarid;
			}
		}
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatarname.indexOf('-') > -1) {
			zinstanceid = zavatarname.split('-')[1];
		}
		if (zavatarname.indexOf('myavatar') > -1) {
			dGet('wtw_tavatarid').value = zavatardef.avatarid;
			WTW.setCookie('globaluseravatarid', zavatardef.globaluseravatarid, 365);
			dGet('wtw_tglobaluseravatarid').value = zavatardef.globaluseravatarid;
			WTW.setCookie('useravatarid', zavatardef.useravatarid, 365);
			dGet('wtw_tuseravatarid').value = zavatardef.useravatarid;
			WTW.setCookie('useravatarid', zavatardef.useravatarid, 365);
		}
		if (zavatar != null) {
			/* get the previously loaded avatarid (avatar definition from the database avatars table) */
			if (zavatar != undefined) {
				if (zavatar.WTW != undefined) {
					if (zavatar.WTW.avatarid != undefined) {
						zavataridold = zavatar.WTW.avatarid;
					}
				}
			}
			if (zavatar.position != undefined) {
				/* update start position of avatar to current position */
				WTW.init.startPositionX = zavatar.position.x;
				WTW.init.startPositionY = zavatar.position.y;
				WTW.init.startPositionZ = zavatar.position.z;
				WTW.init.startRotationY = WTW.getDegrees(zavatar.rotation.y);
			}
		}
		zavatardef.name = zavatarname;
		zavatardef.instanceid = zinstanceid;
		zavatardef.parentname = WTW.mainParent;
		zavatardef.start.position.x = WTW.init.startPositionX;
		zavatardef.start.position.y = WTW.init.startPositionY;
		zavatardef.start.position.z = WTW.init.startPositionZ;
		zavatardef.start.rotation.x = 0;
		zavatardef.start.rotation.y = WTW.init.startRotationY;
		zavatardef.start.rotation.z = 0;
		if (zavatarid != zavataridold) {
			/* if the previously loaded avatar is not the same as the new avatar meshes - fully reload */
			WTW.disposeAnimations(zavatarname);
			/* transfer avatar sets the avatar scale old box as parent and renames the old meshes */
			WTW.transferAvatar(zavatarname);
			/* start stand is a small box used to make sure you do not drop with gravity before the ground is rendered */
			/* is it set to delete after 10 seconds */
			var zstartstand = BABYLON.MeshBuilder.CreateBox('startstand', {}, scene);
			zstartstand.scaling = new BABYLON.Vector3(1, 1, 1);
			zstartstand.position = new BABYLON.Vector3(WTW.init.startPositionX, WTW.init.startPositionY - .49, WTW.init.startPositionZ);
			zstartstand.checkCollisions = true;
			zcovering = new BABYLON.StandardMaterial('matstartstand', scene);
			zstartstand.material = new BABYLON.StandardMaterial('matstartstand', scene);
			zstartstand.material.alpha = 0;
			/* new avatar is called and built in place - then the old avatar will be removed when done */
			zavatar = WTW.addAvatar(zavatardef.name, zavatardef, zavatardef.parentname);
			zavatar.rotation.y = WTW.getRadians(WTW.init.startRotationY);
			if (zavatarname.indexOf('myavatar') > -1) {
				/* global variable for current user's avatar */
				WTW.myAvatar = zavatar;
			} else if (zavatarname.indexOf('editavatar') > -1) {
				WTW.editAvatar = zavatar;
			}
			window.setTimeout(function() {
				if (WTW.isInitCycle == 0) {
					zstartstand.dispose();
				}
			},10000);
		} else {
			/* if the avatar meshes are the same, only update the colors and animations */
			WTW.updateAvatarColors(zavatarname, zavatardef);
			WTW.disposeAnimations(zavatarname);
			/* reloads avatar animations except for the onwait that stays loaded */
			WTW.reloadAvatarAnimations(zavatarname, zavatardef.avataranimationdefs);
		}
		if (zavatarname.indexOf('myavatar') > -1) {
			WTW.placeHolder = 0;
		}
		/* this extends this function for plugins to hook code into this function */
		WTW.pluginsSavedAvatarRetrieved(zavatarname, zsendrefresh);
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-updateAvatar=' + ex.message);
		if (zavatarname.indexOf('myavatar') > -1) {
			WTW.openLoginHUD('Loading 3D Avatar');
		}
		WTW.getSavedAvatar('myavatar-' + dGet('wtw_tinstanceid').value, zglobaluseravatarid, zuseravatarid, zavatarid, true);
    }
}

WTWJS.prototype.disposeAvatar = function(zavatarname) {
	/* clears the meshes and scale box for the avatar */
	try {
		var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
		if (zavatarscale != null) {
			var zchildmeshes = zavatarscale.getChildren();
			if (zchildmeshes != null) {
				for (var i=0; i < zchildmeshes.length; i++) {
					if (zchildmeshes[i] != null) {
						zchildmeshes[i].dispose();
					}
				}
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-disposeAvatar=' + ex.message);
    }
}
	
WTWJS.prototype.transferAvatar = function(zavatarname) {
	/* sets the avatar scaleold box as parent and renames the old meshes */
	/* allows the new avatar to load while the old one stays until it is complete */
	try {
		var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
		var zavatarscaleold = WTW.getMeshOrNodeByID(zavatarname + '-scaleold');
		if (zavatarscale != null && zavatarscaleold != null) {
			zavatarscaleold.scaling = zavatarscale.scaling;
			var zchildmeshes = zavatarscale.getChildren();
			if (zchildmeshes != null) {
				for (var i=0; i < zchildmeshes.length; i++) {
					if (zchildmeshes[i] != null) {
						var znewname = zchildmeshes[i].id + '-wtwold';
						zchildmeshes[i].name = znewname;
						zchildmeshes[i].id = znewname;
						if (zchildmeshes[i].parent.id == zavatarname + '-scale') {
							zchildmeshes[i].parent = zavatarscaleold;
						}
					}
				}
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-transferAvatar=' + ex.message);
    }
}
	
WTWJS.prototype.disposeOldAvatar = function(zavatarname) {
	/* clears the old avatar meshes - called after the new avatar is completely loaded */
	try {
		var zavatarscaleold = WTW.getMeshOrNodeByID(zavatarname + '-scaleold');
		if (zavatarscaleold != null) {
			var zchildmeshes = zavatarscaleold.getChildren();
			if (zchildmeshes != null) {
				for (var i=0; i < zchildmeshes.length; i++) {
					if (zchildmeshes[i] != null) {
						if (zchildmeshes[i].id.indexOf('-') > -1) {
							var zmoldnames = zchildmeshes[i].id.split('-');
							if (zmoldnames[3] == 'wtwold') {
								zchildmeshes[i].dispose();
							}
						}
					}
				}
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-disposeOldAvatar=' + ex.message);
    }
}
	
WTWJS.prototype.updateAvatarColors = function(zavatarname, zavatardef) {
	/* cycles through the avatar meshes and applies the custom colors */
	try {
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			var zavatarpartcolors = null;
			if (zavatardef.avatarparts != null) {
				if (zavatardef.avatarparts != undefined) {
					zavatarpartcolors = zavatardef.avatarparts;
				}
			}			
			var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
			if (zavatarscale != null) {
				var zavatarparts = zavatarscale.getChildren();
				for (var i=0; i<zavatarparts.length;i++) {
					if (zavatarparts[i] != null) {
						var zmeshname = '';
						if (zavatarparts[i].name.split('-')[2] != undefined) {
							zmeshname = zavatarparts[i].name.split('-')[2];
						}
						if (zavatarparts[i].material != null) {
							if (zavatarparts[i].material.alpha != undefined) {
								zavatarparts[i].material.alpha = 1;
							}
							zavatarparts[i].material.ambientColor = new BABYLON.Color3(.3, .3, .3);
							if (zavatarpartcolors != null) {
								for (var j=0;j<zavatarpartcolors.length;j++) {
									if (zavatarpartcolors[j] != null) {
										var zavatarpart = zavatarpartcolors[j].avatarpart;
										if (zavatarpart == zmeshname) {
											var zer = zavatarpartcolors[j].emissivecolorr;
											var zeg = zavatarpartcolors[j].emissivecolorg;
											var zeb = zavatarpartcolors[j].emissivecolorb;
											zavatarparts[i].material.emissiveColor = new BABYLON.Color3(zer,zeg,zeb);
											var zcovering = zavatarparts[i].material;
											zavatarparts[i].material.dispose();
											zavatarparts[i].material = zcovering;
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
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-updateAvatarColors=' + ex.message);
    }
}

WTWJS.prototype.reloadAvatarAnimations = function(zavatarname, zavataranimationdefs) {
	/* load the avatar animations - note that the idle onwait animation is already loaded with the initial avatar object */
	/* this function starts the onwait animation */
	/* zavataranimationdefs is an array of animation definitions to be loaded index 0 is the idle onwait event */
	try {
		var zskeleton = null;
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			zskeleton = zavatar.WTW.skeleton;
			if (zavatar.WTW != undefined) {
				try {
					zavatar.WTW.animations = zavataranimationdefs;
					zavatar.WTW.animations.running = [];
					zavatar.WTW.animations.running['onrotateup'] = {
						'weight':0,
						'active':0
					};
					zavatar.WTW.animations.running['onrotatedown'] = {
						'weight':0,
						'active':0
					};
					/* start the onwait animation */
					zavatar.WTW.animations.running[zavataranimationdefs[0].animationevent] = scene.beginWeightedAnimation(zskeleton, Number(zavataranimationdefs[0].startframe), Number(zavataranimationdefs[0].endframe), 0, zavataranimationdefs[0].animationloop, Number(zavataranimationdefs[0].speedratio));
					zavatar.WTW.animations[0].totalframes = Number(zavataranimationdefs[0].endframe);
					zavatar.WTW.animations[0].totalstartframe = Number(zavataranimationdefs[0].startframe);
					zavatar.WTW.animations[0].totalendframe = Number(zavataranimationdefs[0].endframe);
					
					/* start the idle animation */
					if (zavataranimationdefs[0].animationevent == 'onwait') {
						zavatar.WTW.animations.running[zavataranimationdefs[0].animationevent].weight = 1;
						if (zavatarname.indexOf('editavatar') > -1) {
							WTW.avatarShowVisible(zavatarname);
						}
					}
				} catch (ex) {}
			}
			/* starts loading the rest of the animations starting with index 1 of the zavataranimationdefs */
			WTW.loadAvatarAnimations(zavatarname, 1);
		}
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-reloadAvatarAnimations=' + ex.message);
    }
}

WTWJS.prototype.loadAvatarAnimations = function(zavatarname, zanimationind, zenteranimate) {
	/* cycles through the avatar animations definitions and starts them synchronously */
	try {
		/* zanimationind is the index to start from */
		if (zanimationind == undefined) {
			zanimationind = 0;
		}
		/* zenteranimate is the animation for entering the scene after the last animation is loaded */
		if (zenteranimate == undefined) {
			zenteranimate = true;
		}
		let zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			if (zavatar.WTW != null) {
				/* when avatar is loaded, animations and skeleton objects are set to zavatar.WTW */
				if (zavatar.WTW.animations != null && zavatar.WTW.skeleton != null) {
					if (zavatar.WTW.animations[zanimationind] != null) {
						let zanimation = zavatar.WTW.animations[zanimationind];
						if (zanimation.objectfolder != '' && zanimation.objectfile != '') {
							/* fetch and load the animation file */
							BABYLON.SceneLoader.ImportMeshAsync('', zanimation.objectfolder, zanimation.objectfile, scene).then( function (zresponse) {
								let zavatarparent = WTW.getMeshOrNodeByID(zavatarname + '-scale');
								let zframetotal = WTW.getLastAnimationKey(zavatar) + zanimationind;
								let zskeleton = zresponse.skeletons[0];
								if (zskeleton.parent == null) {
									zskeleton.parent = zavatarparent;
								}
								/* uses weights to set animations on and off at various levels and blends */
								if (zanimation.startweight == undefined) {
									zanimation.startweight = 0;
								}
								/* onoption animations are not tied to movement events - they are called on demand from the interface */
								if (zanimation.animationevent == 'onoption') {
									zanimation.animationevent = 'onoption' + zanimation.avataranimationid;
								}
								/* read the animation frame range from the imported file */
								zskeleton.createAnimationRange(zanimation.animationevent, Number(zanimation.startframe), Number(zanimation.endframe));
								/* dispose any meshes in the animation */
								for (let i = 0; i < zresponse.meshes.length; i++) {
									if (zresponse.meshes[i] != null) {
										zresponse.meshes[i].dispose();
									}
								}
								if (zavatar.WTW.skeleton != undefined) {
									/* copy the animation frame range to the current avatar */
									zavatar.WTW.skeleton.copyAnimationRange(zskeleton, zanimation.animationevent, true);
									/* easing function defines how an animation starts and stops */
									var zeasingfunction = new BABYLON.QuinticEase(); /* alternative is QuadraticEase() */
									zeasingfunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

									if (zeasingfunction != undefined && zeasingfunction != null) {
										for (let j = 0; j < zavatar.WTW.skeleton.bones.length; j++) {
											zavatar.WTW.skeleton.bones[j].animations[0].setEasingFunction(zeasingfunction);
										}
									}
									let ztotalframes = Number(zanimation.endframe) - Number(zanimation.startframe);
									let ztotalendframe = (zframetotal + Number(zanimation.endframe) - Number(zanimation.startframe));
									let ztotalstartframe = ztotalendframe - ztotalframes;
									if (zavatar.WTW.animations[zanimationind] != null) {
										zavatar.WTW.animations[zanimationind].totalframes = ztotalframes;
										zavatar.WTW.animations[zanimationind].totalstartframe = ztotalstartframe;
										zavatar.WTW.animations[zanimationind].totalendframe = ztotalendframe;
									}
									/* start animation - may be set to weight 0 and not executing, but running */
									if (zenteranimate) {
										zavatar.WTW.animations.running[zanimation.animationevent] = scene.beginWeightedAnimation(zavatar.WTW.skeleton, zframetotal, ztotalendframe, zanimation.startweight, zanimation.animationloop, Number(zanimation.speedratio));
									}
									if (zenteranimate == false) {
										zavatar.WTW.animations.running[zanimation.animationevent] = scene.beginWeightedAnimation(zavatar.WTW.skeleton, zframetotal, ztotalendframe, zanimation.startweight, zanimation.animationloop, Number(zanimation.speedratio));
									} else if (zavatar.WTW.animations[zanimationind + 1] != null) {
										/* there are more animations to load - so load the next one */
										if (zanimationind == 11) {
											/* after basic animations are loaded, start the idle and show the avatar - then wait one second and continue loading the animations */
											zavatar.WTW.animations.running['onwait'].weight = 1;
											WTW.disposeOldAvatar(zavatarname);
											WTW.avatarEnter(zavatarname);
										}
										WTW.loadAvatarAnimations(zavatarname, zanimationind + 1);
									} else if (zavatarname.indexOf('myavatar-') > -1) {
										/* it is current user's avatar and all animations are loaded */
										WTW.toggleMenuAnimations();
										WTW.toggleMenuAnimations();
										WTW.showAvatarDisplayName(false);
										/* allow plugins to execute code after the avatar is fully loaded, rigt before it is shown */
										WTW.pluginsMyAnimationsLoaded();
										/* run enter animation to show the avatar */
										if (zanimationind < 12) {
											WTW.disposeOldAvatar(zavatarname);
											WTW.avatarEnter(zavatarname);
										}
										/* clean up the old avatar meshes if there were any */
									} else {
										/* other users' avatar is done loading */
										var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
										var zavatarparts = [];
										if (zavatarscale != null) {
											zavatarparts = zavatarscale.getChildren();
										}
										if (zavatarparts.length == 0) {
											/* clean up the old avatar meshes if there were any */
											WTW.disposeOldAvatar(zavatarname);
											/* play enter animation to show avatar */
											WTW.avatarEnter(zavatarname);
										}
									}
								}
							}); 
						}
					}
				}
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-loadAvatarAnimations=' + ex.message);
	}
}

WTWJS.prototype.loadAvatarAnimation = function(zavatarname, zuseravataranimationid, zanimationfriendlyname, zanimationicon, zavataranimationid, zanimationevent, zobjectfolder, zobjectfile, zstartframe, zendframe, zspeedratio, zstartweight, zloadpriority, zanimationloop, zonanimationend) {
	/* this function loads a single animation from the avatar animation definition */
	try {
		if (zloadpriority == undefined) {
			zloadpriority = 0;
		}
		if (zanimationloop == undefined) {
			zanimationloop = true;
		}
		if (zonanimationend == undefined) {
			zonanimationend = null;
		}
		if (zstartweight == undefined) {
			zstartweight = 0;
		}
		var zfound = -1;
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			if (zavatar.WTW.animations != undefined) {
				for (var i=zavatar.WTW.animations.length-1; i>-1; i--) {
					if (zavatar.WTW.animations[i] != null) {
						/* if animation is already found, stop the animation and remove the frame range */
						if (zavatar.WTW.animations[i].useravataranimationid == zuseravataranimationid && zanimationevent == 'onoption' && zuseravataranimationid != '') {
							if (zavatar.WTW.animations.running['onoption' + zavatar.WTW.animations[i].avataranimationid] != undefined) {
								zavatar.WTW.animations.running['onoption' + zavatar.WTW.animations[i].avataranimationid].stop();
							}
							zfound = i;
						} else if (zavatar.WTW.animations[i].avataranimationid == zuseravataranimationid && zanimationevent == 'onoption' && zavataranimationid != '') {
							if (zavatar.WTW.animations.running['onoption' + zavatar.WTW.animations[i].avataranimationid] != undefined) {
								zavatar.WTW.animations.running['onoption' + zavatar.WTW.animations[i].avataranimationid].stop();
							}
							zfound = i;
						} else if (zanimationevent != 'onoption') {
							if (zavatar.WTW.animations.running[zanimationevent] != undefined) {
								zavatar.WTW.animations.running[zanimationevent].stop();
								zavatar.WTW.skeleton.deleteAnimationRange(zanimationevent,true);
							}
							if (zanimationevent == zavatar.WTW.animations[i].animationevent && zfound == -1) {
								zfound = i;
							}
						}
					}
				}
				/* set avatar animation definition into the animation definitions array */
				if (zfound == -1) {
					zfound = zavatar.WTW.animations.length;
					zavatar.WTW.animations[zfound] = WTW.newAvatarAnimationDef();
				}
				zavatar.WTW.animations[zfound].useravataranimationid = zuseravataranimationid;
				zavatar.WTW.animations[zfound].avataranimationid = zavataranimationid;
				zavatar.WTW.animations[zfound].speedratio = zspeedratio;
				zavatar.WTW.animations[zfound].animationevent = zanimationevent;
				zavatar.WTW.animations[zfound].startframe = zstartframe;
				zavatar.WTW.animations[zfound].endframe = zendframe;
				zavatar.WTW.animations[zfound].objectfolder = zobjectfolder;
				zavatar.WTW.animations[zfound].objectfile = zobjectfile;
				zavatar.WTW.animations[zfound].animationfriendlyname = zanimationfriendlyname;
				zavatar.WTW.animations[zfound].loadpriority = zloadpriority;
				zavatar.WTW.animations[zfound].animationicon = zanimationicon;
				zavatar.WTW.animations[zfound].animationloop = zanimationloop;
				zavatar.WTW.animations[zfound].onanimationend = zonanimationend;
				zavatar.WTW.animations[zfound].startweight = zstartweight;
				/* load and start the avatar animation */
				WTW.loadAvatarAnimations(zavatarname, zfound, false);
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-loadAvatarAnimation=' + ex.message);
    }
}

WTWJS.prototype.changeAvatarAnimation = async function(zselobj) {
	/* allows the menu to select an animation for an event */
	try {
		var zanimationdata = WTW.getDDLValue(zselobj.id);
		var zavataranimationid = '';
		var zanimationevent = '';
		var zspeedratio = 1;
		var zstartframe = 1;
		var zendframe = 1;
		var zobjectfolder = '';
		var zobjectfile = '';
		var zloadpriority = 0;
		var zanimationicon = '';
		var zanimationfriendlyname = '';
		var zuseravataranimationid = '';
		if (zanimationdata.indexOf('|') > -1) {
			animationdatapart = zanimationdata.split('|');
			zuseravataranimationid = animationdatapart[0];
			zavataranimationid = animationdatapart[1];
			zspeedratio = Number(animationdatapart[2]);
			zanimationevent = animationdatapart[3];
			zstartframe = Number(animationdatapart[4]);
			zendframe = Number(animationdatapart[5]);
			zobjectfolder = animationdatapart[6];
			zobjectfile = animationdatapart[7];
			zanimationfriendlyname = animationdatapart[8];
			zloadpriority = Number(animationdatapart[9]);
			zanimationicon = animationdatapart[10];
			if (zuseravataranimationid == null) {
				zuseravataranimationid = '';
			}
			if (dGet(zselobj.id + '-value') != null) {
				zuseravataranimationid = dGet(zselobj.id + '-value').value;
			}
			var zavatarname = 'myavatar-' + dGet('wtw_tinstanceid').value;
			WTW.loadAvatarAnimation(zavatarname, zuseravataranimationid, zanimationfriendlyname, zanimationicon, zavataranimationid, zanimationevent, zobjectfolder, zobjectfile, zstartframe, zendframe, zspeedratio, zloadpriority);
			var zrequest = {
				'useravatarid': dGet('wtw_tuseravatarid').value,
				'useravataranimationid': zuseravataranimationid,
				'avataranimationid':zavataranimationid,
				'instanceid': dGet('wtw_tinstanceid').value,
				'animationevent':dGet('wtw_tavataranimationevent').value,
				'speedratio':zspeedratio,
				'function':'saveavataranimation'
			};
			WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					if (zresponse.useravataranimationid != undefined) {
						zuseravataranimationid = zresponse.useravataranimationid;
					}
					zselobj.blur();
					WTW.updateAnimSelectValue(zselobj.id + '-value', zuseravataranimationid);
				}
			);
		}
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-changeAvatarAnimation=' + ex.message);
    }
}

WTWJS.prototype.disposeAnimations = function(zavatarname) {
	/* clear animations and delete all frame ranges except the onwait animation */
	try {
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			if (zavatar.WTW != null) {
				if (zavatar.WTW.animations != null) {
					if (zavatar.WTW.animations.running != null) {
						for(var zevent in zavatar.WTW.animations.running) {
							if (zavatar.WTW.animations.running[zevent] != null) {
								if (typeof zavatar.WTW.animations.running[zevent].stop == 'function') {
									zavatar.WTW.animations.running[zevent].stop();
								}
								if (zavatar.WTW.skeleton != undefined && zevent != 'onwait') {
									zavatar.WTW.skeleton.deleteAnimationRange(zevent,true);
								}
								zavatar.WTW.animations.running[zevent] = null;
							}
						}
					}
					zavatar.WTW.animations = null;
					zavatar.WTW.animations = [];
				}
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-disposeAnimations=' + ex.message);
    }
}

WTWJS.prototype.getLastAnimationKey = function(zavatar) {
	/* check the frame ranges and identify the highest frame */
	/* allows us to identify the start from of the next animation added */
	let zmaxkey = 0;
	try {
		var zbone;
		var zanim;
		var zwhichbone;
		var zwhichanim;
		if (zavatar.WTW.skeleton != undefined) {
			for (zwhichbone in zavatar.WTW.skeleton.bones) {
				zbone = zavatar.WTW.skeleton.bones[zwhichbone];
				for (zwhichanim in zbone.animations) {
					zanim = zbone.animations[zwhichanim];
					if (zanim._keys.length > zmaxkey) {
						zmaxkey = zanim._keys.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-getLastAnimationKey=' + ex.message);
	}
	return zmaxkey;
}

WTWJS.prototype.editPlayAnimations = function() {
	/* play animations is a list of animations shown on the menu to allow the user to run an onoption event animation */ 
	try {
		WTW.closeMenus();
		WTW.hide('wtw_menuoptionalanimations');
		WTW.show('wtw_menuavatar');
		if (dGet('wtw_menuavataranimationsdiv').style.display == 'none') {
			WTW.switchAvatarMenu(3);
		}
		window.setTimeout(function() {
			if (dGet('wtw_animation-onoption') != null) {
				dGet('wtw_animation-onoption').click();
				window.location.href = '#wtw_viewanimations';
			}
		},1000);
	} catch (ex) { 
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-editPlayAnimations=' + ex.message);
	}
}

WTWJS.prototype.runOptionalAnimation = function(zobjdiv, zanimationevent) {
	/* executes an onoption event animation */
	try {
		WTW.canvasFocus = 0;
		var e = e || window.event;
		e.preventDefault();
		zobjdiv.className='wtw-animationiconplaydiv';
		WTW.keyPressedAdd(zanimationevent);
	} catch (ex) { 
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-runOptionalAnimation=' + ex.message);
	}
}

WTWJS.prototype.stopOptionalAnimation = function(zobjdiv, zanimationevent) {
	/* stops an onoption event animation */
	try {
		WTW.canvasFocus = 1;
		var e = e || window.event;
		e.preventDefault();
		WTW.keyPressedRemove(zanimationevent);
		zobjdiv.className='wtw-animationicondiv';
	} catch (ex) { 
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-stopOptionalAnimation=' + ex.message);
	}
}

WTWJS.prototype.getAnimationEventName = function(zevent) {
	/* provides a friendly name for an animation event */
	let zeventname = '';
	try {
		switch (zevent) {
			case 'onwalk':
				zeventname = 'Walk';
				break;
			case 'onwalkbackwards':
				zeventname = 'Walk Backwards';
				break;
			case 'onturnleft':
				zeventname = 'Turn Left';
				break;
			case 'onturnright':
				zeventname = 'Turn Right';
				break;
			case 'onstrafeleft':
				zeventname = 'Strafe Left';
				break;
			case 'onstraferight':
				zeventname = 'Strafe Right';
				break;
			case 'onrun':
				zeventname = 'Run';
				break;
			case 'onrunbackwards':
				zeventname = 'Run Backwards';
				break;
			case 'onrunturnleft':
				zeventname = 'Run Turn Left';
				break;
			case 'onrunturnright':
				zeventname = 'Run Turn Right';
				break;
			case 'onrunstrafeleft':
				zeventname = 'Run Strafe Left';
				break;
			case 'onrunstraferight':
				zeventname = 'Run Strafe Right';
				break;
			case 'onoption':
				zeventname = 'Optional Gestures';
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-getAnimationEventName=' + ex.message);
	}
	return zeventname;
}

WTWJS.prototype.getAnimationEvent = function(zeventname) {
	/* provides an animation event for a friendly name */
	let zevent = '';
	try {
		switch (zeventname) {
			case 'Walk':
				zevent = 'onwalk';
				break;
			case 'Walk Backwards':
				zevent = 'onwalkbackwards';
				break;
			case 'Turn Left':
				zevent = 'onturnleft';
				break;
			case 'Turn Right':
				zevent = 'onturnright';
				break;
			case 'Strafe Left':
				zevent = 'onstrafeleft';
				break;
			case 'Strafe Right':
				zevent = 'onstraferight';
				break;
			case 'Run':
				zevent = 'onrun';
				break;
			case 'Run Backwards':
				zevent = 'onrunbackwards';
				break;
			case 'Run Turn Left':
				zevent = 'onrunturnleft';
				break;
			case 'Run Turn Right':
				zevent = 'onrunturnright';
				break;
			case 'Run Strafe Left':
				zevent = 'onrunstrafeleft';
				break;
			case 'Run Strafe Right':
				zevent = 'onrunstraferight';
				break;
			case 'Optional Gestures':
				zevent = 'onoption';
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-getAnimationEvent=' + ex.message);
	}
	return zevent;
}

WTWJS.prototype.showAvatarDisplayName = function(zopen) {
	/* hides, disables, enables or shows the display name in the menu */
	try {
		if (zopen == undefined) {
			zopen = true;
		}
		if (dGet('wtw_tuserid').value == '') {
			dGet('wtw_tavatardisplayname').value = 'Anonymous';
			dGet('wtw_tavatardisplayname').disabled = true;
			dGet('wtw_tavatardisplayname').readOnly = true;
			WTW.hide('wtw_displaybannote');
		} else {
			if (WTW.myAvatar.WTW.displayname != null && WTW.myAvatar.WTW.displayname != undefined) {
				dGet('wtw_tavatardisplayname').value = WTW.myAvatar.WTW.displayname;
			}
			if (dGet('wtw_tavatardisplayname').value == '') {
				dGet('wtw_tavatardisplayname').value = dGet('wtw_menudisplayname').innerHTML;
			}
			dGet('wtw_tavatardisplayname').disabled = false;
			dGet('wtw_tavatardisplayname').readOnly = false;
			WTW.show('wtw_displaybannote');
			dGet('wtw_mainmenudisplayname').innerHTML = dGet('wtw_tavatardisplayname').value;
			dGet('wtw_profileimagesmmobiletext').innerHTML = 'Profile: ' + dGet('wtw_tavatardisplayname').value;
			dGet('wtw_menudisplayname').innerHTML = dGet('wtw_tavatardisplayname').value;
			dGet('wtw_tdisplayname').value = dGet('wtw_tavatardisplayname').value;
			WTW.hide('wtw_mainmenudisplaynamemobile');
		}
		if (zopen) {
			WTW.toggle('wtw_menuavatardisplaynamediv');
		}
	} catch (ex) { 
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-showAvatarDisplayName=' + ex.message);
	}
}

WTWJS.prototype.saveAvatarDisplayName = async function() {
	/* updates the displayname from the menu - writes it to the database */
	try {
		if (dGet('wtw_tuserid').value != '') {
			WTW.myAvatar.WTW.displayname = dGet('wtw_tavatardisplayname').value;
			if (dGet('wtw_tavatardisplayname').value == '') {
				dGet('wtw_tavatardisplayname').value = dGet('wtw_menudisplayname').innerHTML;
			}
			dGet('wtw_menudisplayname').innerHTML = dGet('wtw_tavatardisplayname').value;
			dGet('wtw_teditdisplayname').value = dGet('wtw_tavatardisplayname').value;
			var zrequest = {
				'useravatarid': dGet('wtw_tuseravatarid').value,
				'instanceid': dGet('wtw_tinstanceid').value,
				'avatardisplayname': dGet('wtw_tavatardisplayname').value,
				'function':'saveavatardisplayname'
			};
			WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
				}
			);
		}
	} catch (ex) { 
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-saveAvatarDisplayName=' + ex.message);
	}
}

WTWJS.prototype.avatarLoadComplete = function(zavatarname) {
	/* triggers at the end of the enter animation - no matter which one is used */
	try {
		if (zavatarname.indexOf('myavatar-') > -1) {
			WTW.myAvatar.WTW.loaded = true;
		}
		if (typeof WTW.pluginsAvatarLoadComplete == 'function') {
			WTW.pluginsAvatarLoadComplete(zavatarname);
		}
		WTW.closeLoginHUD();
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-avatarLoadComplete=' + ex.message);
    }
}

WTWJS.prototype.closeAvatarSettings = function() {
	/* close avatar menu */
	try {
		WTW.hide('wtw_menuavatar');
		dGet('wtw_tmoldname').value = '';
		WTW.closeMenus();
		dGet('wtw_tshowhelponstart').checked = true;
		var zmovecontrols = WTW.getCookie('movecontrols');
		if (zmovecontrols == null) {
			zmovecontrols = '0';
		}
		if (zmovecontrols == '1') {
			dGet('wtw_tshowhelponstart').checked = false;
		} else if (dGet('wtw_tuserid').value == '') {
			WTW.showSettingsMenu('wtw_menucontrols');
		}
	} catch (ex) {
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-closeAvatarSettings=' + ex.message);
    }
}

WTWJS.prototype.logoutMyAvatar = function() {
	/* log out my avatar (current user) from the scene - dispose of the avatar */
	try {
		WTW.disposeAvatar('myavatar-' + dGet('wtw_tinstanceid').value);
		WTW.hide('wtw_menuloggedin');
		WTW.show('wtw_menulogin');
	} catch (ex) {
		WTW.log('core-scripts-avatars-wtw_loadavatar.js-logoutMyAvatar=' + ex.message);
	}
}


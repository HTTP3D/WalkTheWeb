/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions provide many of the common functions for browse and admin modes */
/* heads up display (hud), menu options, and user settings */

WTWJS.prototype.openHUDFollow = function() {
	/* new feature just beginning to be coded */
	try {
/*WTW.log("OPEN HUD");
		var zanchor = new BABYLON.TransformNode("");
		var zmanager = new BABYLON.GUI.GUI3DManager(scene);

		var zpanel = new BABYLON.GUI.PlanePanel();
		zpanel.margin = .25;
		zpanel.columns = 1;
		
		zmanager.addControl(zpanel);
		zpanel.linkToTransformNode(zanchor);
		zpanel.position.z = -1.5;
		zpanel.scaling = new BABYLON.Vector3(3,3,3);
		//zpanel.position.y = 10;
		zpanel.blockLayout = true;
//		var button = new BABYLON.GUI.HolographicButton("orientation");
		
		
		zmanager.parent = WTW.myAvatar;
		
		var zbutton = new BABYLON.GUI.Button3D("reset");

		var ztext = new BABYLON.GUI.TextBlock();
		ztext.text = "HERE I AM";
		ztext.color = "white";
		ztext.fontSize = 50;
		zbutton.content = ztext;
		
		
		zpanel.addControl(zbutton);

		zbutton.text = "Button #" + zpanel.children.length;
		
		var zbutton2 = new BABYLON.GUI.HolographicButton("orientation");
		zpanel.addControl(zbutton2);

		zbutton.text = "Button #" + zpanel.children.length;
		zpanel.blockLayout = false;

		scene.render();
*/	} catch (ex) {
		WTW.log("core-scripts-hud-wtw_hud.js-openHUDFollow=" + ex.message);
	}
}


/* User Menu Settings functions */

WTWJS.prototype.changeCameraDistance = function() {
	/* walk animation speed set in the user menu */
	try {
		WTW.cameraDistance = Number(dGet('wtw_tcameradistance').value);
        WTW.setCookie("cameradistance",WTW.cameraDistance,365);
	} catch (ex) {
		WTW.log("core-scripts-hud-wtw_hud.js-changeCameraDistance=" + ex.message);
	}
}

WTWJS.prototype.changeWalkAnimationSpeed = function() {
	/* walk animation speed set in the user menu */
	try {
		WTW.walkAnimationSpeed = Number(dGet('wtw_twalkanimationspeed').value);
        WTW.setCookie("walkanimationspeed",WTW.walkAnimationSpeed,365);
	} catch (ex) {
		WTW.log("core-scripts-hud-wtw_hud.js-changeWalkAnimationSpeed=" + ex.message);
	}
}

WTWJS.prototype.changeWalkSpeed = function() {
	/* walk speed set in the user menu */
	try {
		WTW.walkSpeed = Number(dGet('wtw_twalkspeed').value);
        WTW.setCookie("walkspeed",WTW.walkSpeed,365);
	} catch (ex) {
		WTW.log("core-scripts-hud-wtw_hud.js-changeWalkSpeed=" + ex.message);
	}
}

WTWJS.prototype.changeTurnAnimationSpeed = function() {
	/* turn animation speed set in the user menu */
	try {
		WTW.turnAnimationSpeed = Number(dGet('wtw_tturnanimationspeed').value);
        WTW.setCookie("turnanimationspeed",WTW.turnAnimationSpeed,365);
	} catch (ex) {
		WTW.log("core-scripts-hud-wtw_hud.js-changeTurnAnimationSpeed=" + ex.message);
	}
}

WTWJS.prototype.changeTurnSpeed = function() {
	/* turn speed set in the user menu */
	try {
		WTW.turnSpeed = Number(dGet('wtw_tturnspeed').value);
        WTW.setCookie("turnspeed",WTW.turnSpeed,365);
	} catch (ex) {
		WTW.log("core-scripts-hud-wtw_hud.js-changeTurnSpeed=" + ex.message);
	}
}

WTWJS.prototype.changeGraphic = function(zvalue) {
	/* graphic level set in the user menu */
	try {
        if (WTW.isNumeric(zvalue)) {
            WTW.graphicSet = Number(zvalue);
        } else {
            WTW.graphicSet += zvalue;
		if (WTW.graphicSet > 2) {
			WTW.graphicSet = 2;
		}
		if (WTW.graphicSet < 0) {
			WTW.graphicSet = 0;
		}
        }
		switch (WTW.graphicSet) {
			case 0:
				dGet('wtw_graphichelptitle').innerHTML = "Graphics (Low Resolution)";
				WTW.gpuSetting = 'low';
				break;
			case 1:
				dGet('wtw_graphichelptitle').innerHTML = "Graphics (Optimum Balance)";
				WTW.gpuSetting = 'medium';
				break;
			case 2:
				dGet('wtw_graphichelptitle').innerHTML = "Graphics (High Resolution)";
				WTW.gpuSetting = 'high';
				break;
		}
		dGet('wtw_tgraphicsetting').value = WTW.graphicSet;
		WTW.setCookie("graphicsetting",WTW.graphicSet,365);
		WTW.setCookie("gpusetting", WTW.gpuSetting,30);
		document.location.reload(true);
	} catch (ex) { 
		WTW.log("core-scripts-hud-wtw_hud.js-changeGraphic=" + ex.message);
	}
}

WTWJS.prototype.changeShadow = function(zvalue) {
	/* shadow resolution set in the user menu */
	/* temporarily all shadows are set to level 3 */
	try {
        if (WTW.isNumeric(zvalue)) {
            WTW.shadowSet = Number(zvalue);
        } else {
            WTW.shadowSet += zvalue;
            if (WTW.shadowSet > 3) {
                WTW.shadowSet = 3;
            }
		    if (WTW.shadowSet < 0) {
                WTW.shadowSet = 3;
            }
		    if (WTW.adminView != 0) {
                WTW.shadowSet = 3;
            }
        }
        if (( WTW.gpuSetting == 'medium') && WTW.shadowSet == 3){
        } else if (( WTW.gpuSetting == 'low') && WTW.shadowSet == 2){
        } else {
			WTW.setShadowSettings();
		}
	} catch (ex) {
		WTW.log("core-scripts-hud-wtw_hud.js-changeShadow=" + ex.message);
	}
}

WTWJS.prototype.setShadowSettings = function() {
	/* set shadow properties after shadow setting changed in the user menu */
    try {
		dGet('wtw_tshadowsetting').defaultValue = WTW.shadowSet;
        var zshadowresolution = 1024;
		switch (WTW.shadowSet) {
			case 0:
				zshadowresolution = 512;
				if (WTW.gpuSetting == 'low') {
                    dGet('wtw_shadowhelptitle').innerHTML = "Shadows (None - Low Resolution)<br><b>This is your recommended setting.<b/>";
                }
                else {
                    dGet('wtw_shadowhelptitle').innerHTML = "Shadows (None - Low Resolution)<br /><br />";
                }
				break;
			case 1:
				zshadowresolution = 1024;
				if (WTW.gpuSetting == 'medium') {
                    dGet('wtw_shadowhelptitle').innerHTML = "Shadows (Some - Medium Resolution)<br><b>This is your recommended setting.<b/>";
                }
                else {
                    dGet('wtw_shadowhelptitle').innerHTML = "Shadows (Some - Medium Resolution)<br /><br />";
                }
				break;
			case 2:
				zshadowresolution = 1024;
				dGet('wtw_shadowhelptitle').innerHTML = "Shadows (All) - High Resolution<br /><br />";
				break;
			case 3:
				zshadowresolution = 4096;
				if (WTW.gpuSetting == 'high') {
                    dGet('wtw_shadowhelptitle').innerHTML = "Shadows (All - Ultimate Resolution)<br><b>This is your recommended setting.<b/>";
                }
                else {
                    dGet('wtw_shadowhelptitle').innerHTML = "Shadows (All - Ultimate Resolution)<br /><br />";
                }
				break;
		}
		dGet('wtw_tshadowsetting').value = WTW.shadowSet;
		
		WTW.setCookie("wtw_shadowsetting",WTW.shadowSet,365);
		
		var zrenderlist = [];
        if(WTW.shadows != null) {
			zrenderlist = WTW.shadows.getShadowMap().renderList;
            WTW.shadows.dispose();
            WTW.shadows = null;
        }
		WTW.shadows = new BABYLON.ShadowGenerator(zshadowresolution, WTW.sun);
		WTW.shadows.depthScale = 20000;
		WTW.shadows.setDarkness(0);
		WTW.shadows.bias = 0.0005;
		
//		WTW.shadows.useKernelBlur = true;
//		WTW.shadows.blurKernel = 64;
		//WTW.shadows.getShadowMap().refreshRate = BABYLON.RenderTargetTexture.REFRESHRATE_RENDER_ONCE;
//		WTW.shadows.forceBackFacesOnly = true;

//		if (WTW.shadowSet < 2) {
		WTW.shadows.usePoissonSampling = true;
//		} else if (WTW.shadowSet < 3) {
//          WTW.shadows.useExponentialShadowMap = true;
//		} else {
//			WTW.shadows.useBlurExponentialShadowMap = true;
//		}
		WTW.shadows.getShadowMap().renderList = zrenderlist;
        if (WTW.shadowSet > 0) {
			if (WTW.extraGround != null) {
				WTW.extraGround.receiveShadows = true;
			}
		}
    } catch (ex) {
        WTW.log("core-scripts-hud-wtw_hud.js-setShadowSettings=" +ex.message);
    }
}

WTWJS.prototype.toggleSoundMute = function() {
	/* toggle sound on and off from molds playing the sounds */
	try {
		if (WTW.soundMute == true) { 
			/* was off (muted) - now turn on */
			/* set menu options for sound turned on */
			dGet('wtw_menumute').src = "/content/system/images/menumuteoff32.png";
			dGet('wtw_menumute').alt = "Turn Sound Off";
			dGet('wtw_menumute').title = "Turn Sound Off";
			dGet('wtw_submenumute').src = "/content/system/images/menumuteoff.png";
			dGet('wtw_submenumute').alt = "Turn Sound Off";
			dGet('wtw_submenumute').title = "Turn Sound Off";
			dGet('wtw_submenumutetext').innerHTML = "Sound is On";
			
			/* check molds to turn on sound */
			for (var i=0;i < WTW.communitiesMolds.length; i++) {
				if (WTW.communitiesMolds[i] != null) {
					if (WTW.communitiesMolds[i].sound.id != undefined) {
						if (WTW.communitiesMolds[i].sound.id != '') {
							if (WTW.communitiesMolds[i].sound.sound != '') {
								if (WTW.communitiesMolds[i].sound.sound.isPlaying == false) {
									WTW.communitiesMolds[i].sound.sound.play();
								}
							}
						}
					}
					if (WTW.communitiesMolds[i].shape == 'video') {
						var zvideomold = scene.getMeshByID(WTW.communitiesMolds[i].moldname + "-mainvideo");
						if (zvideomold != null) {
							if (typeof zvideomold.material.diffuseTexture.video.pause == 'function') {
								zvideomold.material.diffuseTexture.video.volume = WTW.getSoundVolumeLinear(WTW.communitiesMolds[i].moldname, WTW.communitiesMolds[i].sound.maxdistance);
							}
						}
					}
				}
			}
			/* check molds to turn on sound */
			for (var i=0;i < WTW.buildingMolds.length; i++) {
				if (WTW.buildingMolds[i] != null) {
					if (WTW.buildingMolds[i].sound.id != undefined) {
						if (WTW.buildingMolds[i].sound.id != '') {
							if (WTW.buildingMolds[i].sound.sound != '') {
								if (WTW.buildingMolds[i].sound.sound.isPlaying == false) {
									WTW.buildingMolds[i].sound.sound.play();
								}
							}
						}
					}
					if (WTW.buildingMolds[i].shape == 'video') {
						var zvideomold = scene.getMeshByID(WTW.buildingMolds[i].moldname + "-mainvideo");
						if (zvideomold != null) {
							if (typeof zvideomold.material.diffuseTexture.video.pause == 'function') {
								zvideomold.material.diffuseTexture.video.volume = WTW.getSoundVolumeLinear(WTW.buildingMolds[i].moldname, WTW.buildingMolds[i].sound.maxdistance);
							}
						}
					}
				}
			}
			/* check molds to turn on sound */
			for (var i=0;i < WTW.thingMolds.length; i++) {
				if (WTW.thingMolds[i] != null) {
					if (WTW.thingMolds[i].sound.id != undefined) {
						if (WTW.thingMolds[i].sound.id != '') {
							if (WTW.thingMolds[i].sound.sound != '') {
								if (WTW.thingMolds[i].sound.sound.isPlaying == false) {
									WTW.thingMolds[i].sound.sound.play();
								}
							}
						}
					}
					if (WTW.thingMolds[i].shape == 'video') {
						var zvideomold = scene.getMeshByID(WTW.thingMolds[i].moldname + "-mainvideo");
						if (zvideomold != null) {
							if (typeof zvideomold.material.diffuseTexture.video.pause == 'function') {
								zvideomold.material.diffuseTexture.video.volume = WTW.getSoundVolumeLinear(WTW.thingMolds[i].moldname, WTW.thingMolds[i].sound.maxdistance);
							}
						}
					}
				}
			}
			/* set global variable for mute */
			WTW.soundMute = false;
		} else {
			/* set menu options for sound turned off */
			dGet('wtw_menumute').src = "/content/system/images/menumuteon32.png";
			dGet('wtw_menumute').alt = "Turn Sound On";
			dGet('wtw_menumute').title = "Turn Sound On";
			dGet('wtw_submenumute').src = "/content/system/images/menumuteon.png";
			dGet('wtw_submenumute').alt = "Turn Sound On";
			dGet('wtw_submenumute').title = "Turn Sound On";
			dGet('wtw_submenumutetext').innerHTML = "Sound is Off";

			/* check molds to turn off sound */
			for (var i=0;i < WTW.communitiesMolds.length; i++) {
				if (WTW.communitiesMolds[i] != null) {
					if (WTW.communitiesMolds[i].sound.id != undefined) {
						if (WTW.communitiesMolds[i].sound.id != '') {
							if (WTW.communitiesMolds[i].sound.sound != '') {
								if (WTW.communitiesMolds[i].sound.sound.isPlaying == true) {
									WTW.communitiesMolds[i].sound.sound.pause();
								}
							}
						}
					}
				}
			}
			/* check molds to turn off sound */
			for (var i=0;i < WTW.buildingMolds.length; i++) {
				if (WTW.buildingMolds[i] != null) {
					if (WTW.buildingMolds[i].sound.id != undefined) {
						if (WTW.buildingMolds[i].sound.id != '') {
							if (WTW.buildingMolds[i].sound.sound != '') {
								if (WTW.buildingMolds[i].sound.sound.isPlaying == true) {
									WTW.buildingMolds[i].sound.sound.pause();
								}
							}
						}
					} 
					if (WTW.buildingMolds[i].shape == 'video') {
						var zvideomold = scene.getMeshByID(WTW.buildingMolds[i].moldname + "-mainvideo");
						if (zvideomold != null) {
							if (typeof zvideomold.material.diffuseTexture.video.pause == 'function') {
								zvideomold.material.diffuseTexture.video.volume = 0;
							}
						}
					}
				}
			}
			/* check molds to turn off sound */
			for (var i=0;i < WTW.thingMolds.length; i++) {
				if (WTW.thingMolds[i] != null) {
					if (WTW.thingMolds[i].sound.id != undefined) {
						if (WTW.thingMolds[i].sound.id != '') {
							if (WTW.thingMolds[i].sound.sound != '') {
								if (WTW.thingMolds[i].sound.sound.isPlaying == true) {
									WTW.thingMolds[i].sound.sound.pause();
								}
							}
						}
					}
				}
			}
			/* check mold events (animations) to turn off sound */
			for (var i=0;i < WTW.moldEvents.length; i++) {
				if (WTW.moldEvents[i] != null) {
					if (WTW.moldEvents[i].soundid != undefined) {
						if (WTW.moldEvents[i].soundid != '') {
							if (typeof WTW.moldEvents[i].sound.pause == 'function') {
								if (WTW.moldEvents[i].sound.isPlaying == true) {
									WTW.moldEvents[i].sound.pause();
								}
							}
						}
					}
				}
			}
			/* set global variable for mute */
			WTW.soundMute = true;
		}
		WTW.setCookie("soundmute",WTW.soundMute,30);
	} catch (ex) {
		WTW.log("core-scripts-hud-wtw_hud.js-toggleSoundMute=" + ex.message);
	}
}


/* menu options - set on or off */
WTWJS.prototype.toggleCameraTwo = function() {
	/* toggle on or off camera two (scene camera) */
	try {
		if (dGet('wtw_cameratwotext').innerHTML == "Second Camera Off") { 
			/* turn on */
			dGet('wtw_cameratwotext').innerHTML = "Second Camera On";
			dGet('wtw_cameratwoicon').src = "/content/system/images/menucamera.png";
			dGet('wtw_cameratwoicon').alt = "Hide Second Camera";
			dGet('wtw_cameratwoicon').title = "Hide Second Camera";
			WTW.show('wtw_cameratwoselect');
			WTW.setCookie("showcameratwo","1",30);
		} else {
			/* turn off */
			dGet('wtw_cameratwotext').innerHTML = "Second Camera Off";
			dGet('wtw_cameratwoicon').src = "/content/system/images/menucameraoff.png";
			dGet('wtw_cameratwoicon').alt = "Show Second Camera";
			dGet('wtw_cameratwoicon').title = "Show Second Camera";
			WTW.hide('wtw_cameratwoselect');
			WTW.setCookie("showcameratwo","0",30);
		}
		WTW.switchCamera(2);
	} catch (ex) {
		WTW.log("core-scripts-hud-wtw_hud.js-toggleCameraTwo=" + ex.message);
	}
}

WTWJS.prototype.toggleCompass = function() {
	/* toggle show or hide compass */
	try {
		if (dGet('wtw_compassvisibility').innerHTML == "Compass is Visible") { 
			/* hide compass */
			dGet('wtw_compassvisibility').innerHTML = "Compass is Hidden";
			dGet('wtw_compassicon').src = "/content/system/images/menuoff.png";
			dGet('wtw_compassicon').alt = "Show Compass";
			dGet('wtw_compassicon').title = "Show Compass";
			WTW.setCookie("showcompass","0",30);
		} else {
			/* show compass */
			dGet('wtw_compassvisibility').innerHTML = "Compass is Visible";
			dGet('wtw_compassicon').src = "/content/system/images/menuon.png";
			dGet('wtw_compassicon').alt = "Hide Compass";
			dGet('wtw_compassicon').title = "Hide Compass";
			WTW.setCookie("showcompass","1",30);
		}
	} catch (ex) {
		WTW.log("core-scripts-hud-wtw_hud.js-toggleCompass=" + ex.message);
	}
}

WTWJS.prototype.toggleArrows = function() {
	/* toggle show or hide movement arrows (mostly for first person camera) */
	try {
		if (dGet('wtw_arrowsvisibility').innerHTML == "Arrows are Visible") { 
			/* hide arrows */
			dGet('wtw_arrowsvisibility').innerHTML = "Arrows are Hidden";
			dGet('wtw_arrowsicon').src = "/content/system/images/menuoff.png";
			dGet('wtw_arrowsicon').alt = "Show Arrows";
			dGet('wtw_arrowsicon').title = "Show Arrows";
			WTW.hide('wtw_iwalkarrow');
			WTW.hide('wtw_iwalkarrow2');
			WTW.setCookie("showarrows","0",30);
		} else {
			/* show arrows */
			dGet('wtw_arrowsvisibility').innerHTML = "Arrows are Visible";
			dGet('wtw_arrowsicon').src = "/content/system/images/menuon.png";
			dGet('wtw_arrowsicon').alt = "Hide Arrows";
			dGet('wtw_arrowsicon').title = "Hide Arrows";
			WTW.show('wtw_iwalkarrow');
			WTW.show('wtw_iwalkarrow2');
			WTW.setCookie("showarrows","1",30);
		}
	} catch (ex) {
		WTW.log("core-scripts-hud-wtw_hud.js-toggleArrows=" + ex.message);
	}
}

WTWJS.prototype.toggleFPS = function() {
	/* toggle show or hide frames per second counter */
	try {
		if (dGet('wtw_fpsvisibility').innerHTML == "Mold Count/FPS are Visible") { 
			/* hide fps */
			dGet('wtw_fpsvisibility').innerHTML = "Mold Count/FPS are Hidden";
			dGet('wtw_fpsicon').src = "/content/system/images/menuoff.png";
			dGet('wtw_fpsicon').alt = "Show Mold Count";
			dGet('wtw_fpsicon').title = "Show Mold Count";
			WTW.hide('wtw_showmeshfps');
			WTW.setCookie("showfps","0",30);
			WTW.showFPS = 0;
		} else {
			/* show fps */
			dGet('wtw_fpsvisibility').innerHTML = "Mold Count/FPS are Visible";
			dGet('wtw_fpsicon').src = "/content/system/images/menuon.png";
			dGet('wtw_fpsicon').alt = "Hide Mold Count";
			dGet('wtw_fpsicon').title = "Hide Mold Count";
			WTW.show('wtw_showmeshfps');
			WTW.setCookie("showfps","1",30);
			WTW.showFPS = 1;
		}
	} catch (ex) {
		WTW.log("core-scripts-hud-wtw_hud.js-toggleFPS=" + ex.message);
	}
}

WTWJS.prototype.showSettingsMenu = function(zmenuitem) {
	/* show or hide sections of the browse menu (bottom menu bar) */
	try {
		switch (zmenuitem) {
			case "wtw_menuprofile":
				WTW.openLoginMenu();WTW.closeMenus();
				return true;
				break;
		}
		
		WTW.show(zmenuitem);
		if (zmenuitem == 'wtw_menuprofile') {
			if (dGet('wtw_tuserid').value != '') {
				WTW.hide('wtw_menulogin');
				WTW.show('wtw_menuloggedin');
			} else {
				WTW.hide('wtw_menuloggedin');
				WTW.show('wtw_menulogin');
			}
		}
		if (dGet(zmenuitem + 'scroll') != null) {
			dGet(zmenuitem + 'scroll').style.height = 'auto';
			if (dGet(zmenuitem + 'scroll').clientHeight < (WTW.sizeY - 95)) {
				dGet(zmenuitem + 'scroll').style.height = dGet(zmenuitem + 'scroll').scrollHeight + "px";
			}
			if (zmenuitem == 'wtw_menuavatar') {
				if (dGet(zmenuitem + 'scroll').clientHeight > (WTW.sizeY - 355)) {
					dGet(zmenuitem + 'scroll').style.height = (WTW.sizeY - 355) + "px";
				}
			} else {
				if (dGet(zmenuitem + 'scroll').clientHeight > (WTW.sizeY - 95)) {
					dGet(zmenuitem + 'scroll').style.height = (WTW.sizeY - 95) + "px";
				}
			}
		} 
	} catch (ex) { 
		WTW.log("core-scripts-hud-wtw_hud.js-showSettingsMenu=" + ex.message);
	}
}

WTWJS.prototype.resizeMenu = function(zformid, zsize) {
	try {
		/* formid is the name of the form div */
		/* zsize should be min or max */
		if (zsize == 'min') {
			WTW.hide(zformid + 'maxdiv');
			WTW.hide(zformid + 'min');
			WTW.show(zformid + 'max');
		} else {
			WTW.show(zformid + 'maxdiv');
			WTW.hide(zformid + 'max');
			WTW.show(zformid + 'min');
		}
		if (dGet(zformid + 'scroll') != null) {
			dGet(zformid + 'scroll').style.height = 'auto';
			dGet(zformid + 'scroll').style.minHeight = '0px';
		}
	} catch (ex) { 
		WTW.log("core-scripts-hud-wtw_hud.js-resizeMenu=" + ex.message);
	}
}

WTWJS.prototype.closeMenus = function(zmenuid) {
	/* closes the browse menus */
	try {
		if (zmenuid == undefined) {
			zmenuid = '';
		}
		WTW.show('wtw_menulogin');
		var zmenuforms = document.getElementsByClassName('wtw-slideupmenuright');
		for (var i=0;i<zmenuforms.length;i++) {
			if (zmenuforms[i] != null) {
				if (zmenuforms[i].id != undefined) {
					WTW.hide(zmenuforms[i].id);
				}
			}
		}
		zmenuforms = document.getElementsByClassName('wtw-slideupmenuleft');
		for (var i=0;i<zmenuforms.length;i++) {
			if (zmenuforms[i] != null) {
				if (zmenuforms[i].id != undefined) {
					WTW.hide(zmenuforms[i].id);
				}
			}
		}
		WTW.pluginsCloseMenus(zmenuid);
	} catch (ex) {
		WTW.log("core-scripts-hud-wtw_hud.js-closeMenus=" + ex.message);
	}
}


/* these functions are used by admin menu - dev lists of objects for troubleshooting - prints results to the console log */

WTWJS.prototype.listConnectingGrids = function() {
	/* list connecting grids */
	var zcolor = "black";
	WTW.log("---connecting grids--------------------------------------");
	for (var i = 0; i < WTW.connectingGrids.length; i++) {
		if (WTW.connectingGrids[i] != null) {
			if (WTW.connectingGrids[i].shown == "2") {
				if (WTW.connectingGrids[i].childwebtype=="community") {
					zcolor = "red";
				} else if (WTW.connectingGrids[i].childwebtype=="building") {
					zcolor = "lightblue";
				} else if (WTW.connectingGrids[i].childwebtype=="thing") {
					zcolor = "green";
				} else {
					zcolor = "black";
				}
				WTW.log(i + "==" + WTW.connectingGrids[i].moldname + "=(shown)=" + WTW.connectingGrids[i].shown + "=(status)=" + WTW.connectingGrids[i].status, zcolor);		
			}
		}
	}
	WTW.log("-----------------------------------------");
	for (var i = 0; i < WTW.connectingGrids.length; i++) {
		if (WTW.connectingGrids[i] != null) {
			if (WTW.connectingGrids[i].shown != "2") {
				if (WTW.connectingGrids[i].childwebtype=="community") {
					zcolor = "brown";
				} else if (WTW.connectingGrids[i].childwebtype=="building") {
					zcolor = "lightblue";
				} else if (WTW.connectingGrids[i].childwebtype=="thing") {
					zcolor = "green";
				} else {
					zcolor = "black";
				}
				WTW.log(i + "==" + WTW.connectingGrids[i].moldname + "=(shown)=" + WTW.connectingGrids[i].shown + "=(status)=" + WTW.connectingGrids[i].status, zcolor);		
			}
		}
	}
}

WTWJS.prototype.listActionZones = function() {
	/* list action zones */
	var zcolor = "black";
	WTW.log("---action zones-(shown)------------------------------");
	for (var i = 0; i < WTW.actionZones.length; i++) {
		if (WTW.actionZones[i] != null) {
			if (WTW.actionZones[i].actionzonename.toLowerCase().indexOf("extreme") > -1) {
				zcolor = "green";
			} else if (WTW.actionZones[i].actionzonename.toLowerCase().indexOf("high") > -1) {
				zcolor = "lightblue";
			} else {
				zcolor = "black";
			}
			if (WTW.actionZones[i].shown == "2") {
				WTW.log(i + "==" + WTW.actionZones[i].moldname + "=(shown)=" + WTW.actionZones[i].shown + "=(status)=" + WTW.actionZones[i].status + "=(name)=" + WTW.actionZones[i].actionzonename + "=(cgind)=" + WTW.actionZones[i].connectinggridind, zcolor);		
				WTW.log(i + "==parent=" + WTW.actionZones[i].parentname, 'orange');
			}
		}
	}
	WTW.log("---action zones-(not shown)--------------------------");
	for (var i = 0; i < WTW.actionZones.length; i++) {
		if (WTW.actionZones[i] != null) {
			if (WTW.actionZones[i].actionzonename.toLowerCase().indexOf("extreme") > -1) {
				zcolor = "green";
			} else if (WTW.actionZones[i].actionzonename.toLowerCase().indexOf("high") > -1) {
				zcolor = "lightblue";
			} else {
				zcolor = "black";
			}
			if (WTW.actionZones[i].shown != "2") {
				WTW.log(i + "==" + WTW.actionZones[i].moldname + "=(shown)=" + WTW.actionZones[i].shown + "=(status)=" + WTW.actionZones[i].status + "=(name)=" + WTW.actionZones[i].actionzonename + "=(cgind)=" + WTW.actionZones[i].connectinggridind, zcolor);		
				WTW.log(i + "==parent=" + WTW.actionZones[i].parentname, 'orange');
			}
		}
	}
}

WTWJS.prototype.listCommunityMolds = function() {
	/* list community molds */
	for (var i = 0; i < WTW.communitiesMolds.length; i++) {
		if (WTW.communitiesMolds[i] != null) {
			var zmold = scene.getMeshByID(WTW.communitiesMolds[i].moldname);
			var zshadow = "false";
			if (zmold != null) {
				if (zmold.receiveShadows == true) {
					zshadow = "true";
				}
			}
			WTW.log(i + "==" + WTW.communitiesMolds[i].moldname + "=(shown)=" + WTW.communitiesMolds[i].shown + "=(shadows)=" + zshadow);		
		}
	}
}

WTWJS.prototype.listBuildingMolds = function() {
	/* list building molds */
	for (var i = 0; i < WTW.buildingMolds.length; i++) {
		if (WTW.buildingMolds[i] != null) {
			var zmold = scene.getMeshByID(WTW.buildingMolds[i].moldname);
			var zshadow = "false";
			var zvisible = 'no';
			if (zmold != null) {
				zvisible = zmold.isVisible;
				if (zmold.receiveShadows == true) {
					zshadow = "true";
				}
			} else {
				zvisible = 'null';
			}
			WTW.log(i + "==" + WTW.buildingMolds[i].moldname + "=(shown)=" + WTW.buildingMolds[i].shown + "=(visible)=" + zvisible + "=(shadows)=" + zshadow);
		}
	}
}

WTWJS.prototype.listThingMolds = function() {
	/* list thing molds */
	for (var i = 0; i < WTW.thingMolds.length; i++) {
		if (WTW.thingMolds[i] != null) {
			var zcolor = "black";
			WTW.log(i + "==" + WTW.thingMolds[i].moldname + "=(shown)=" + WTW.thingMolds[i].shown + "=(parent)=" + WTW.thingMolds[i].parentname, zcolor);		
		}
	}
}

WTWJS.prototype.listAutomations = function() {
	/* list automations */
	var zcolor = "black";
	for (var i = 0; i < WTW.automations.length; i++) {
		if (WTW.automations[i] != null) {
			zcolor = "black";
			WTW.log(i + "==" + WTW.automations[i].moldname + "=(step.step)=" + WTW.automations[i].step.step + "=" + WTW.automations[i].running, zcolor);		
		}
	}
}

WTWJS.prototype.listUploads = function() {
	/* lis uploads */
	if (wtw_uploads != null) {
		for (var i = 0; i < wtw_uploads.length; i++) {
			if (wtw_uploads[i] != null && wtw_uploads[i] != undefined) {
				if (wtw_uploads[i].uploadinfo != undefined) {
					WTW.log(i + "==" + wtw_uploads[i].uploadid + "=(queue)=" + wtw_uploads[i].queue + "=(title)=" + wtw_uploads[i].uploadinfo.title);
				} else {
					WTW.log(i + "==" + wtw_uploads[i].uploadid + "=(queue)=" + wtw_uploads[i].queue + "=(title)=undefined");
				}
			}
		}
	}		
	WTW.log("----------------------");
	WTW.log("len=" + wtw_uploads.length);
	WTW.log("----------------------");
}

WTWJS.prototype.listMeshes = function() {
	/* list all displayed meshes */
	try {
		var zcolor = "gray";
		WTW.log("---loaded meshes--------count=" + scene.meshes.length + "------------------------------");
		for (var i=0; i < scene.meshes.length; i++) {
			var zparentname = "";
			var zmoldname = scene.meshes[i].name;
			var zvisible = scene.meshes[i].isVisible;
			if (zmoldname.toLowerCase().indexOf("connectinggrid") > -1) {
				zcolor = "green";
				var zmold = scene.getMeshByID(zmoldname);
				if (zmold != null && zmold.parent != null) {
					zparentname = zmold.parent.name;
				}
			} else if (zmoldname.toLowerCase().indexOf("actionzone") > -1) {
				zcolor = "lightblue";
				var zmold = scene.getMeshByID(zmoldname);
				if (zmold != null && zmold.parent != null) {
					zparentname = zmold.parent.name;
				}
			} else if (zmoldname.toLowerCase().indexOf("person") > -1) {
				zcolor = "red";
				var zmold = scene.getMeshByID(zmoldname);
				if (zmold != null && zmold.parent != null) {
					zparentname = zmold.parent.name;
				}
			} else {
				zcolor = "gray";
			}
			var zinmesh = "NO";
			if (zmoldname.toLowerCase().indexOf("molds") > -1) {
				var zmold = scene.getMeshByID(zmoldname);
				if (zmold != null && WTW.myAvatar != null) {
					if (WTW.myAvatar.intersectsMesh(zmold, false)) {
						zinmesh = "YES";
					}
					zparentname = zmold.parent.name;
				}
			}
			if (zcolor == 'red') {
				WTW.log(i + "==" + zmoldname + " in=" + zinmesh + " parent=" + zparentname + " visible=" + zvisible, zcolor);
			} else {
				WTW.log(i + "==" + zmoldname + " in=" + zinmesh + " parent=" + zparentname + " visible=" + zvisible, zcolor);
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-hud-wtw_hud.js-listMeshes=" + ex.message);
	}
}


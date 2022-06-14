/* All code is Copyright 2013-2021 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are used by the event listeners to handle the input devices */
/* and functions for onclicks, hovers, and other user interface interactions */

WTWJS.prototype.setTouchMove = function(zevent) {
	/* touch input - movement detected */
	var zisclick = false;
	try {
		if (zevent == undefined) {
			zevent = window.event;
		}
		if (zevent.originalEvent != undefined) {
			if (zevent.originalEvent.touches != undefined) {
				WTW.touch = zevent.originalEvent.touches;
			}
			if (zevent.originalEvent.changedTouches != undefined) {
				WTW.touch = zevent.originalEvent.changedTouches;
			}
		}
		if (zevent.touches[0] != undefined) {
			WTW.touch = zevent.touches;
		}
		if (WTW.touch != null) {
			for (var i = 0;i < WTW.touch.length;i++) {
				if (i == 0) {
					WTW.mouseX = WTW.touch[i].pageX; 
					WTW.mouseY = WTW.touch[i].pageY;
				}
			}
			WTW.touch = null;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-setTouchMove=" + ex.message);
	}
	return zisclick;
}

WTWJS.prototype.touchDown = function(zevent) {
	/* touch input - touch detected */
	try {
		WTW.isMouseDown = 0;
		WTW.canvasFocus = 1;
		WTW.clearSelectedMold();
		//scene.activeCamera = scene.activeCameras[0];
		if (zevent.originalEvent != undefined) {
			if (zevent.originalEvent.touches != undefined) {
				WTW.touch = zevent.originalEvent.touches;
			}
			if (zevent.originalEvent.changedTouches != undefined) {
				WTW.touch = zevent.originalEvent.changedTouches;
			}
		}
		if (zevent.touches[0] != undefined) {
			WTW.touch = zevent.touches;
		} else {
			WTW.touch = null;
		}
		WTW.mouseX = WTW.touch[0].pageX; 
		WTW.mouseY = WTW.touch[0].pageY;
		WTW.mouseStartX = WTW.mouseX;
		WTW.mouseStartY = WTW.mouseY;
		if (WTW.mouseX < WTW.sizeX/2) {
			dGet('wtw_itouchleft').style.left = (WTW.mouseX - 25) + 'px';
			dGet('wtw_itouchleft').style.top = (WTW.mouseY - 25) + 'px';
			WTW.show('wtw_itouchleft');
			WTW.touchLeftTimer = new Date();
		} else {
			dGet('wtw_itouchright').style.left = (WTW.mouseX - 25) + 'px';
			dGet('wtw_itouchright').style.top = (WTW.mouseY - 25) + 'px';
			WTW.show('wtw_itouchright');
			WTW.touchRightTimer = new Date();
		}
		//WTW.setToolTipLocation();
		//window.setTimeout(function() { WTW.hide('wtw_itooltip'); },3000);
		if (WTW.pause == 1) {
			WTW.startRender();
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-touchDown=" + ex.message);
	}
}

WTWJS.prototype.touchUp = function(zevent) {
	/* touch input - touch release detected */
	try {
		if (zevent.touches[0] != undefined) {
			WTW.touch = zevent.touches;
		} else {
			WTW.touch = null;
		}
		WTW.setTouchMove(zevent);
		var zsetclick = false;
		var ztouchtimer = new Date();
		if (WTW.mouseX == WTW.mouseStartX && WTW.mouseY == WTW.mouseStartY) {
			if (WTW.touchLeftTimer != null) {
				if (ztouchtimer - WTW.touchLeftTimer < 240) {
					zsetclick = true;
				}
			}
			if (WTW.touchRightTimer != null) {
				if (ztouchtimer - WTW.touchRightTimer < 240) {
					zsetclick = true;
				}
			}
			if (zsetclick) {
				WTW.mouseClick(zevent);
			}
		}
		if (zsetclick == false) {
			WTW.keyPressedRemove(1038);
			WTW.keyPressedRemove(2038);
			WTW.keyPressedRemove(1040);
			WTW.keyPressedRemove(2040);
			WTW.keyPressedRemove(1037);
			WTW.keyPressedRemove(2037);
			WTW.keyPressedRemove(1039);
			WTW.keyPressedRemove(2039);
			WTW.keyPressedRemove(1082);
			WTW.keyPressedRemove(1070);
			WTW.vehicleStopTurn();
			WTW.hide('wtw_itouchleft');
			WTW.hide('wtw_itouchright');
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-touchUp=" + ex.message);
	}
}

WTWJS.prototype.touchMoving = function(zevent) {
	/* touch input - touch currently moving detected */
	try {
		if (WTW.canvasFocus == 1) {
			WTW.setTouchMove(zevent);
			if (dGet('wtw_itouchleft').style.display == 'block' && WTW.placeHolder == 0) {
				dGet('wtw_itouchleft').style.left = (WTW.mouseX - 25) + 'px';
				dGet('wtw_itouchleft').style.top = (WTW.mouseY - 25) + 'px';
				WTW.show('wtw_itouchleft');
				if (WTW.mouseStartY > WTW.mouseY) {
					if (WTW.mouseY < WTW.sizeY/4) {
						WTW.keyPressedReplace(1038, 2038);
					} else {
						WTW.keyPressedReplace(2038, 1038);
					}
				} else if (WTW.mouseStartY < WTW.mouseY) {
					if (WTW.mouseY > WTW.sizeY * 3/4) {
						WTW.keyPressedReplace(1040, 2040);
					} else {
						WTW.keyPressedReplace(2040, 1040);
					}
				}
			}
			if (dGet('wtw_itouchright').style.display == 'block') {
				dGet('wtw_itouchright').style.left = (WTW.mouseX - 25) + 'px';
				dGet('wtw_itouchright').style.top = (WTW.mouseY - 25) + 'px';
				WTW.show('wtw_itouchright');
				if (WTW.mouseStartX > WTW.mouseX) { // left
					if (WTW.mouseX < WTW.sizeX * 11/20) {
						WTW.keyPressedReplace(1037, 2037);
					} else {
						WTW.keyPressedReplace(2037, 1037);
					}
				} else if (WTW.mouseStartX < WTW.mouseX) {
					if (WTW.mouseX > WTW.sizeX * 9/10) {
						WTW.keyPressedReplace(1039, 2039);
					} else {
						WTW.keyPressedReplace(2039, 1039);
					}
				}
				if (WTW.mouseStartY < WTW.mouseY) {
					WTW.keyPressedAdd(1070);
				} else if (WTW.mouseStartY > WTW.mouseY) {
					WTW.keyPressedAdd(1082);
				}
				
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-touchMoving=" + ex.message);
	}
}

WTWJS.prototype.touchCancel = function(zevent) {
	/* touch input - touch canceled or released detected */
	try {
		WTW.setTouchMove(zevent);
		WTW.hide('wtw_itouchleft');
		WTW.hide('wtw_itouchright');
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-touchCancel=" + ex.message);
	}
}

WTWJS.prototype.keyDown = function(zevent) {
	/* keyboard input - key down detected */
	try {
		zevent = zevent || window.event;
		var zctrl = zevent.ctrlKey ? zevent.ctrlKey : ((zevent.keyCode === 17) ? true : false);
		WTW.shiftKey = zevent.shiftKey ? zevent.shiftKey : ((zevent.keyCode === 16) ? true : false);
		WTW.pluginsKeyDown(zevent);
		let zbrowser = WTW.getBrowser();
		let zcommandworksin = "chrome,edgechrome,safari,firefox,opera";
		if (zevent.keyCode === 122 && zcommandworksin.indexOf(zbrowser) > -1) {
			zevent.preventDefault();
			document.querySelector("#wtw_renderCanvas").requestFullscreen();
		}
		if (zevent.keyCode == 27) {
			WTW.clearSelectedMold();
		}
		if (WTW.adminView == 1 && (zctrl || zevent.keyCode == 27)) {
			WTW.adminMenuQuickKeys(zevent.keyCode);
		} else if (WTW.canvasFocus == 1 && WTW.placeHolder == 0) {
			if (WTW.pause == 1) {
				WTW.startRender();
			}
			if (WTW.selectedMoldName != "") {
				/* user is interacting with a mesh and should not move on key pressed - click on something else to resume movement */
				if (WTW.selectedMoldName.indexOf("-") > -1) {
					if (WTW.selectedMoldName.indexOf("-scrollboxbodytext") > -1) {
						var zscrollboxbodytext = WTW.getMeshOrNodeByID(WTW.selectedMoldName);
						if (zscrollboxbodytext != null && zscrollboxbodytext.WTW != undefined) {
							var zwebtext = zscrollboxbodytext.WTW.webtext.webtext;
							zscrollboxbodytext.WTW.webtext.webtext = WTW.processKey(zscrollboxbodytext.WTW.webtext.webtext, zevent);
							var zscrollpos = Number(zscrollboxbodytext.WTW.webtext.scrollpos);
							WTW.scrollBoxRepaint(WTW.selectedMoldName.replace("-scrollboxbodytext",""), zscrollpos);
							zevent.preventDefault();
						}
					}
					var zmoldname = WTW.selectedMoldName;
					if (dGet(zmoldname) != null) {
						/* mold name of 3D input box has matching HTML input element */
						dGet(zmoldname).value = dGet(zmoldname).value.replace('|','');
						switch (zevent.key) {
							case "Backspace":
							case "Delete":
								/* remove the last character */
								var ztext = dGet(zmoldname).value.substring(0, dGet(zmoldname).value.length - 1);
								dGet(zmoldname).value = ztext;
								break;
							default:
								/* only process accepted keys */
								var zaccept = 'abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.-+_@';
								if (zaccept.indexOf(zevent.key) > -1) {
									dGet(zmoldname).value += zevent.key;
								}
								break;
						}
					}
					WTW.pluginsKeyDownSelectedMold(zevent);
				}
			} else {
				WTW.keyPressed(zevent.keyCode);
				return true;
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-keyDown=" + ex.message);
	}
}

WTWJS.prototype.keyUp = function(zevent) {
	/* keyboard input - key up detected */
	try {
		zevent = zevent || window.event;
		var zctrl = zevent.ctrlKey ? zevent.ctrlKey : ((zevent.keyCode === 17) ? true : false);
		if (zevent.keyCode === 16) {
			WTW.shiftKey = false;
		}
		WTW.pluginsKeyUp(zevent);
		if (WTW.adminView == 1 && (zctrl || zevent.keyCode == 27)) {
			
		} else if (WTW.canvasFocus == 1 && WTW.placeHolder == 0) {
			if (WTW.pause == 1) {
				WTW.startRender();
			}
			WTW.keyPressedRemove(zevent.keyCode);
			WTW.vehicleStopTurn();
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-keyUp=" + ex.message);
    }
}

WTWJS.prototype.keyPressed = function(keycode) {
	/* keyboard pressed, process keys */
	try {
		if (document.activeElement.id.indexOf('wtw_chatadd-') == -1) {
			switch (keycode) {
				case 67: /* c */
					WTW.hudToggleCompass();
					break;
				case 72: /* h */
				case 77: /* m */
					WTW.hudToggle();
					break;
				default:
					WTW.keyPressedAdd(keycode);
					break;
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-keyPressed=" + ex.message);
    }
}

WTWJS.prototype.keyPressedAdd = function(keycode) {
	/* add a keycode or term to the WTW.keysPressed Array to be handled by the avatar movement */
	/* entered through code function and not necessarily tied to a keyboard */
	try {
		if (keycode != undefined) {
			keycode += "";
			if (WTW.canvasFocus == 1 || keycode.indexOf('onoption') > -1) {
				var zfound = false;
				if (WTW.keysPressed != null) {
					for (var i=0;i < WTW.keysPressed.length;i++) {
						if (WTW.keysPressed[i] != null) {
							if (WTW.keysPressed[i] == keycode) {
								zfound = true;
							}
						}
					}
				}
				if (zfound == false) {
					if (WTW.isNumeric(keycode)) {
						WTW.keysPressed[WTW.keysPressed.length] = Number(keycode);
					} else {
						WTW.keysPressed[WTW.keysPressed.length] = keycode;
					}
				}
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-keyPressedAdd=" + ex.message);
    }
}

WTWJS.prototype.keyPressedReplace = function(replacekeycode, keycode) {
	/* replace a keycode or term in the WTW.keysPressed Array to be handled by the avatar movement */
	/* entered through code function and not necessarily tied to a keyboard */
	try {
		if (keycode != undefined) {
			if (WTW.canvasFocus == 1 || keycode.indexOf('onoption') > -1) {
				var zfound = false;
				if (WTW.keysPressed != null) {
					for (var i=WTW.keysPressed.length-1;i > -1;i--) {
						if (WTW.keysPressed[i] != null) {
							if (WTW.keysPressed[i] == replacekeycode) {
								WTW.keysPressed.splice(i, 1);
							}
							if (WTW.keysPressed[i] == keycode) {
								zfound = true;
							}
						} else {
							WTW.keysPressed.splice(i, 1);
						}
					}
				}
				if (zfound == false) {
					WTW.keysPressed[WTW.keysPressed.length] = keycode;
				}
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-keyPressedReplace=" + ex.message);
    }
}

WTWJS.prototype.keyPressedRemove = function(keycode) {
	/* remove a keycode or term from the WTW.keysPressed Array to be handled by the avatar movement */
	/* entered through code function and not necessarily tied to a keyboard */
	try {
		if (keycode != undefined) {
			var zonoption = -1;
			if (WTW.isNumeric(keycode) == false) {
				zonoption = keycode.indexOf('onoption');
			}
			if (WTW.canvasFocus == 1 || zonoption > -1) {
				if (WTW.keysPressed != null) {
					for (var i=WTW.keysPressed.length-1;i > -1;i--) {
						if (WTW.keysPressed[i] != null) {
							if (WTW.keysPressed[i] == keycode) {
								WTW.keysPressed.splice(i, 1);
							}
						} else {
							WTW.keysPressed.splice(i, 1);
						}
					}
				}
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-keyPressedRemove=" + ex.message);
    }
}

WTWJS.prototype.mouseClick = function(zevent) {
	/* mouse input - single click detected */
	try {
		zevent = zevent || window.event;
		if (WTW.canvasFocus == 1) {
			if (WTW.pause == 1) {
				WTW.startRender();
			}
			WTW.clearSelectedMold();
			if (zevent.clientX != undefined) {
				WTW.mouseStartX = zevent.clientX; 
				WTW.mouseStartY = zevent.clientY;
			}
			if (WTW.adminView == 1) {
				WTW.mouseClickAdmin(zevent);
			} 
			if (WTW.mouseStartX == WTW.mouseX && WTW.mouseStartY == WTW.mouseY) {
				var zresult = scene.pick(WTW.mouseX, WTW.mouseY);
				var zpickedname = "";
				if (zresult.pickedMesh == null) {
					if (WTW.currentID != "") {
						zresult.pickedMesh = WTW.getMeshOrNodeByID(WTW.currentID);
					}
					zpickedname = WTW.currentID;
				} else {
					zpickedname = zresult.pickedMesh.name;
				}

				WTW.pluginsOnClick(zpickedname);
				if (zpickedname != '') {
					var zmold = WTW.getMeshOrNodeByID(zpickedname);
					if (zpickedname.indexOf("-") > -1) {
						WTW.checkMoldEvent('onclick', zpickedname);
						if (zpickedname.substr(0,4) == 'hud-') {
							WTW.hudClick(zpickedname);
						} else if (zpickedname.indexOf("-image") > -1) {
							WTW.checkImageClick(zpickedname);
						} else if (zpickedname.indexOf("-videoposter") > -1 || zpickedname.indexOf("-video-screen") > -1) {
							WTW.checkVideoClick(zpickedname);
						} else if (zpickedname.indexOf("-vehicle") > -1) {
							WTW.toggleStartVehicle(zpickedname);
						} else {
							WTW.checkMoldFunctionAndExecute(zpickedname);
						}
					}
				}
			}
		}
		return true;
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-mouseClick=" + ex.message);
    }
}

WTWJS.prototype.mouseRight = function(zevent) {
	/* mouse input - single right click detected */
	try {
		zevent = zevent || window.event;
		if (WTW.canvasFocus == 1) {
			if (WTW.pause == 1) {
				WTW.startRender();
			}
			WTW.clearSelectedMold();
			if (WTW.adminView == 1) {
				WTW.mouseClickRightAdmin(zevent);
				return false;
			} else {
				return true;
			}
		} else {
			let zclasses = "";
			if (zevent.target.attributes.class != undefined) {
				zclasses = zevent.target.attributes.class.value;
			}
			let allowright = false;
			if (WTW.isTextBox(zevent.target) && zevent.target.disabled == false) {
				allowright = true;
			} else if (zclasses != "") {
				if (zclasses.indexOf(' ') > -1) {
					allowright = zclasses.toLowerCase().split(" ").includes("allow-contextmenu");
				} else if (zclasses.toLowerCase() == "allow-contextmenu") {
					allowright = true;
				}
			}
			if (WTW.adminView != 1 && allowright == false) {
				zevent.preventDefault();
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-mouseRight=" + ex.message);
    }
}

WTWJS.prototype.mouseDown = function(zevent) {
	/* mouse input - left mouse button held down detected */
	try {
		WTW.isMouseDown = 1;
		zevent = zevent || window.event;
		if (WTW.canvasFocus == 1) {
			if (WTW.pause == 1) {
				WTW.startRender();
			}
			WTW.mouseStartX = zevent.clientX; 
			WTW.mouseStartY = zevent.clientY;
			WTW.mouseMoveX = zevent.clientX; 
			WTW.mouseMoveY = zevent.clientY;
			if (WTW.adminView == 1) {
				WTW.mouseDownAdmin(zevent);
			}
			if (scene != undefined && WTW.mouseStartX == WTW.mouseX && WTW.mouseStartY == WTW.mouseY) {
				var zresult = scene.pick(WTW.mouseX, WTW.mouseY);
				if (zresult.pickedMesh == null) {
					zresult.pickedMesh = WTW.getMeshOrNodeByID(WTW.currentID);
				}
				if (zresult.pickedMesh != null) {
					if (zresult.pickedMesh.name.indexOf("scrollboxup") > -1) {
						WTW.scrollBoxMove(zresult.pickedMesh.name, 25);
					} else if (zresult.pickedMesh.name.indexOf("scrollboxdown") > -1) {
						WTW.scrollBoxMove(zresult.pickedMesh.name, -25);
					} else if (zresult.pickedMesh.name.indexOf("-scrollboxtab") > -1) {
						WTW.dragID = zresult.pickedMesh.name;
					} else if (zresult.pickedMesh.name.indexOf("hud-") > -1) {
						WTW.hudChangeCameraDistance(zresult.pickedMesh.name);
					}
				}
			}
		}
		return true;
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-mouseDown=" + ex.message);
    }
}

WTWJS.prototype.mouseUp = function(zevent) {
	/* mouse input - left mouse button up or release detected */
	try {
		WTW.isMouseDown = 0;
		zevent = zevent || window.event;
		if (WTW.canvasFocus == 1) {
			if (WTW.mouseTimer != null) {
				window.clearInterval(WTW.mouseTimer);
				WTW.mouseTimer = null;
			}
			if (WTW.pause == 1) {
				WTW.startRender();
			}
			if (WTW.adminView == 1) {
				WTW.mouseUpAdmin(zevent);
			}
			if (WTW.dragID.indexOf("-scrollboxtab") > -1) {
				WTW.lastID = WTW.dragID;
				WTW.dragID = WTW.dragID.replace("-scrollboxtab","");
				WTW.resetScrollBox(WTW.dragID);
			} else if (WTW.dragID.indexOf("hud-") > -1) {
				WTW.hudChangeCameraDistance(WTW.dragID);
			}
			WTW.dragID = "";
		}
		WTW.keyPressedRemove(1038);
		WTW.keyPressedRemove(2038);
		WTW.keyPressedRemove(1040);
		WTW.keyPressedRemove(2040);
		WTW.keyPressedRemove(1037);
		WTW.keyPressedRemove(2037);
		WTW.keyPressedRemove(1039);
		WTW.keyPressedRemove(2039);
		WTW.keyPressedRemove(1082);
		WTW.keyPressedRemove(1070);
		WTW.vehicleStopTurn();
		WTW.hide('wtw_itouchleft');
		WTW.hide('wtw_itouchright');
		return true;
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-mouseUp=" + ex.message);
    }
}

WTWJS.prototype.mouseMove = function(zevent) {
	/* mouse input - mouse movement detected */
	try {
		zevent = zevent || window.event;
		if (WTW.canvasFocus == 1) {
			if (WTW.pause == 1) {
				WTW.startRender();
			}
			if (zevent.clientX != undefined) {
				WTW.mouseX = zevent.clientX; 
				WTW.mouseY = zevent.clientY;
			}
			if (WTW.dragID == '') {
				if (WTW.mouseMoveX < WTW.sizeX-285) {
					if (WTW.isMouseDown == 1 && WTW.mouseX > WTW.mouseMoveX) {
						WTW.keyPressedRemove(1037);
						WTW.keyPressedAdd(1039);
					} else if (WTW.isMouseDown == 1 && WTW.mouseX < WTW.mouseMoveX) {
						WTW.keyPressedRemove(1039);
						WTW.keyPressedAdd(1037);
					} else if (WTW.isMouseDown == 1) {
						WTW.keyPressedRemove(1037);
						WTW.keyPressedRemove(1039);
					}
					if (WTW.isMouseDown == 1 && WTW.mouseY > WTW.mouseMoveY) {
						WTW.keyPressedRemove(1082);
						WTW.keyPressedAdd(1070);
					} else if (WTW.isMouseDown == 1 && WTW.mouseY < WTW.mouseMoveY) {
						WTW.keyPressedRemove(1070);
						WTW.keyPressedAdd(1082);
					} else if (WTW.isMouseDown == 1) {
						WTW.keyPressedRemove(1070);
						WTW.keyPressedRemove(1082);
					}
				}
				WTW.mouseMoveX = WTW.mouseX;
				WTW.mouseMoveY = WTW.mouseY;
			}
			WTW.setToolTipLocation();
			if (WTW.isMouseDown == 1) {
				if (WTW.dragID.indexOf("-") > -1) {
					if (WTW.dragID.indexOf("-scrollboxtab") > -1) {
						var zmolds = WTW.buildingMolds;
						var zmoldind = -1;
						var znamepart = WTW.dragID.split('-');
						var zpheight = 0;
						var zscrollmove = 0;
						if (znamepart[0] != null) {
							if (znamepart[0].indexOf("communitymolds") > -1) {
								zmolds = WTW.communitiesMolds;
							}
						}
						if (znamepart[1] != null) {
							if (WTW.isNumeric(znamepart[1])) {
								zmoldind = Number(znamepart[1]);
							}
						}
						if (zmolds[zmoldind] != null) {
							if (zmolds[zmoldind].webtext.fullheight != undefined) {
								zpheight = Number(zmolds[zmoldind].webtext.fullheight);
							}			
						}					
						if (zpheight > 512) {
							zscrollmove = (WTW.mouseStartY - WTW.mouseY) * (zpheight / 512);
						} else {
							zscrollmove = (WTW.mouseStartY - WTW.mouseY);
						}
						WTW.scrollBoxMove(WTW.dragID, zscrollmove);
						WTW.mouseStartY = WTW.mouseY;
						zevent.preventDefault();
					} else if (WTW.dragID.indexOf("hud-") > -1) {
						WTW.hudChangeCameraDistance(WTW.dragID);
					}
				}
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-mouseMove=" + ex.message);
    }
}

WTWJS.prototype.mouseScroll1 = function(zevent) {
	/* mouse input - mouse scrollbar movement detected (type1) */
	try {
		zevent = zevent || window.event;
		if (WTW.canvasFocus == 1) {
			var zrolled = zevent.wheelDelta; 
			WTW.mouseScroll(zrolled);
			return (false);
		}
	} catch(ex) {
		WTW.log("core-scripts-prime-wtw_input.js-mouseScroll1=" + ex.message);
	}
}

WTWJS.prototype.mouseScroll2 = function(zevent) {
	/* mouse input - mouse scrollbar movement detected (type2) */
	try {
		zevent = zevent || window.event;
		if (WTW.canvasFocus == 1) {
			var zrolled = zevent.wheelDelta>0||zevent.detail<0?120:-120;
			WTW.mouseScroll(zrolled);
			return (false);
		}
	} catch(ex) {
		WTW.log("core-scripts-prime-wtw_input.js-mouseScroll2=" + ex.message);
	}
}

WTWJS.prototype.mouseScroll = function(zrolled) {
	/* mouse input - process mouse scrollbar movement */
    try {
		if (WTW.canvasFocus == 1 && WTW.placeHolder == 0) {
			if (WTW.pause == 1) {
				WTW.startRender();
			}
			if (WTW.cameraFocus == 0) {
				zrolled = zrolled / 24;
				var zdirx = Math.sin(WTW.cameraOne.rotation.y);
				var zdiry = -Math.sin(WTW.cameraOne.rotation.x);
				var zdirz = Math.cos(WTW.cameraOne.rotation.y);
				WTW.cameraOne.cameraDirection = WTW.cameraOne.cameraDirection.add(new BABYLON.Vector3(zrolled*zdirx, zrolled*zdiry, zrolled*zdirz));
			} else {
				if (zrolled > 0) {
					zrolled = 1.5;
					var znowdate = new Date();
					if (WTW.isMouseDown == 1) {
						if (WTW.scrollTimer != null) {
							if ((znowdate - WTW.scrollTimer) < 200) {
								WTW.keyPressedRemove(1040);
								WTW.keyPressedRemove(1038);
								WTW.keyPressedAdd(2038);
							}
						}
					} else {
						WTW.keyPressedRemove(1040);
						WTW.keyPressedRemove(2038);
						WTW.keyPressedAdd(1038);
					}
					WTW.scrollTimer = new Date();
				} else {
					zrolled = -1.5;
					WTW.keyPressedRemove(1038);
					WTW.keyPressedAdd(1040);
					WTW.scrollTimer = new Date();
				}
				return (false);
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-mouseScroll=" + ex.message);
    }
}

WTWJS.prototype.mouseOverMold = function(zmold) {
	/* mouse related - execute when a mouse cursor hovers a mold */
	/* mold has to have the event loaded using: WTW.registerMouseOver(mold); */
	try {
		if (WTW.canvasFocus == 1) {
			scene.hoverCursor = 'default';
			if (zmold.meshUnderPointer != null) {
				WTW.lastID = WTW.currentID;
				WTW.currentID = zmold.meshUnderPointer.name;
				if (zmold.meshUnderPointer.isPickable && WTW.currentID.indexOf('hud-background') == -1) {
					scene.hoverCursor = 'pointer';
				}
				WTW.checkHovers(zmold);
			}
		}
	} catch(ex) {
		WTW.log("core-scripts-prime-wtw_input.js-mouseOverMold=" + ex.message);
	}
}

WTWJS.prototype.mouseOutMold = function(zmold) {
	/* mouse related - execute when a mouse cursor stops hovering a mold */
	/* mold has to have the event loaded using: WTW.registerMouseOver(mold); */
	try {
		if (WTW.canvasFocus == 1) {
			WTW.hide('wtw_itooltip');
			if (WTW.adminView == 1) {
				if (dGet('wtw_bfocus') != null) {
					if (dGet('wtw_bfocus').title == "Focus Highlight is On" || WTW.highlightLayer != null) {
						WTW.unhilightMold(WTW.currentID);
					}
				}
			}
			document.body.style.cursor = "default";
			WTW.lastID = WTW.currentID;
			WTW.currentID = "";
			WTW.checkMoldEvent('onmouseout', WTW.lastID);
			WTW.resetHovers();
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-mouseOutMold=" + ex.message);
	}
}

WTWJS.prototype.clearSelectedMold = function () {
	/* selected mold pauses keyboard avatar movement - clearing will allow avatar to move again with the keyboard */
	try {
		/* allow plugins to clear items before the selected mold is cleared */
		WTW.pluginsClearSelectedMold();
		/* clear the selected mold */
		if (WTW.selectedMoldName.indexOf('hud-') > -1) {
			WTW.hudEditRefreshText(WTW.selectedMoldName, 'hud-pageform', true);
		}
		WTW.selectedMoldName = '';
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-clearSelectedMold=" + ex.message);
	}
}

WTWJS.prototype.onMessage = function (zevent) {
	/* message listener is enabled and this function can receive predefined messages from an iframe within the WalkTheWeb instance */
	try {
		zevent = zevent || window.event;
		let zsafe = false;
		// Check sender origin to be trusted
		if (zevent.origin == "https://3d.walktheweb.com") {
			zsafe = true;
		} else if (zevent.origin == "https://3dnet.walktheweb.com") {
			zsafe = true;
		} else if (zevent.origin == "https://3dnet.walktheweb.network") {
			zsafe = true;
		} else if (zevent.origin == wtw_domainurl) {
			zsafe = true;
		}
		if (zsafe) {
			let zfunctionname = '';
			if (zevent.data.func != undefined) {
				zfunctionname = zevent.data.func;
			}
			let zparameters = null;
			if (zevent.data.parameters != undefined) {
				zparameters = zevent.data.parameters;
			}
			let zmessage = null;
			if (zevent.data.message != undefined) {
				zmessage = zevent.data.message;
			}
			if (zfunctionname != '') {
				WTW.executeFunctionByName(zfunctionname, window, zparameters);
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-onMessage=" + ex.message);
	}
}


/* key mapping and key filters */

WTWJS.prototype.processKey = function(ztext, zevent) {
	/* keyboard filtering for input */
    try {
		zevent = zevent || window.event;
        ztext = ztext.replace(String.fromCharCode(16), "");
        var zfound = 0;
        var zicursor = 0;
        if (ztext.indexOf('|') == -1) {
            ztext += "|";
        }
        zicursor = ztext.indexOf('|');
        switch (zevent.keyCode) {
            case 8:
                if (ztext.length > 1) {
                    if (ztext.length > 1 && zicursor > 0) {
                        ztext = ztext.replace("|", "");
                        ztext = ztext.substr(0, zicursor - 1) + "|" + ztext.substr(zicursor, ztext.length - (zicursor));
                    }
                }
                zfound = 1;
                break;
            case 9: // tab
                ztext = ztext.replace("|", "     |");
                zfound = 1;
                break;
            case 13:
                ztext = ztext.replace("|", String.fromCharCode(182).toLowerCase() + " |");
                zfound = 1;
                break;
            case 27: // esc
                zfound = 1;
                break;
            case 32:
                ztext = ztext.replace("|", " |");
                zfound = 1;
                break;
            case 35: // end
                ztext = ztext.replace("|", "");
                zfound = 1;
                break;
            case 36: // home
                ztext = "|" + ztext.replace("|", "");
                zfound = 1;
                break;
            case 37: // left
                if (ztext.length > 1 && zicursor > 0) {
                    ztext = ztext.replace("|", "");
                    ztext = ztext.substr(0, zicursor - 1) + "|" + ztext.substr(zicursor - 1, ztext.length - (zicursor - 1));
                }
                zfound = 1;
                break;
            case 38: // up
                zfound = 1;
                break;
            case 39: // right
                ztext = ztext.replace("|", "");
                ztext = ztext.substr(0, zicursor + 1) + "|" + ztext.substr(zicursor + 1, ztext.length - (zicursor + 1));
                zfound = 1;
                break;
            case 40: // down
                zfound = 1;
                break;
            case 45: // insert
                zfound = 1;
                break;
            case 46: // delete
                if (ztext.length > zicursor + 1) {
                    ztext = ztext.replace("|", "");
                    ztext = ztext.substr(0, zicursor) + "|" + ztext.substr(zicursor + 1, ztext.length - (zicursor + 1));
                }
                zfound = 1;
                break;
        }
        if (zfound == 0) {
            if (zevent.shiftKey) {
                switch (zevent.keyCode) {
                    case 48:
                        ztext = ztext.replace("|", ")|");
                        break;
                    case 49:
                        ztext = ztext.replace("|", "!|");
                        break;
                    case 50:
                        ztext = ztext.replace("|", "@|");
                        break;
                    case 51:
                        ztext = ztext.replace("|", "#|");
                        break;
                    case 52:
                        ztext = ztext.replace("|", "$|");
                        break;
                    case 53:
                        ztext = ztext.replace("|", "%|");
                        break;
                    case 54:
                        ztext = ztext.replace("|", "^|");
                        break;
                    case 55:
                        ztext = ztext.replace("|", "&|");
                        break;
                    case 56:
                        ztext = ztext.replace("|", "*|");
                        break;
                    case 57:
                        ztext = ztext.replace("|", "(|");
                        break;
                    case 186:
                        ztext = ztext.replace("|", ":|");
                        break;
                    case 187:
                        ztext = ztext.replace("|", "+|");
                        break;
                    case 188:
                        ztext = ztext.replace("|", "<|");
                        break;
                    case 189:
                        ztext = ztext.replace("|", "_|");
                        break;
                    case 190:
                        ztext = ztext.replace("|", ">|");
                        break;
                    case 191:
                        ztext = ztext.replace("|", "?|");
                        break;
                    case 192:
                        ztext = ztext.replace("|", "~|");
                        break;
                    case 219:
                        ztext = ztext.replace("|", "{|");
                        break;
                    case 220: //  |
                        break;
                    case 221:
                        ztext = ztext.replace("|", "}|");
                        break;
                    case 222:
                        ztext = ztext.replace("|", "\"|");
                        break;
                    default:
                        ztext = ztext.replace("|", String.fromCharCode(zevent.keyCode).toUpperCase() + "|");
                        break;
                }
            } else {
                switch (zevent.keyCode) {
                    case 96:
                        ztext = ztext.replace("|", "0|");
                        break;
                    case 97:
                        ztext = ztext.replace("|", "1|");
                        break;
                    case 98:
                        ztext = ztext.replace("|", "2|");
                        break;
                    case 99:
                        ztext = ztext.replace("|", "3|");
                        break;
                    case 100:
                        ztext = ztext.replace("|", "4|");
                        break;
                    case 101:
                        ztext = ztext.replace("|", "5|");
                        break;
                    case 102:
                        ztext = ztext.replace("|", "6|");
                        break;
                    case 103:
                        ztext = ztext.replace("|", "7|");
                        break;
                    case 104:
                        ztext = ztext.replace("|", "8|");
                        break;
                    case 105:
                        ztext = ztext.replace("|", "9|");
                        break;
                    case 106:
                        ztext = ztext.replace("|", "*|");
                        break;
                    case 107:
                        ztext = ztext.replace("|", "+|");
                        break;
                    case 109:
                        ztext = ztext.replace("|", "-|");
                        break;
                    case 110:
                        ztext = ztext.replace("|", ".|");
                        break;
                    case 111:
                        ztext = ztext.replace("|", "/|");
                        break;
                    case 186:
                        ztext = ztext.replace("|", ";|");
                        break;
                    case 187:
                        ztext = ztext.replace("|", "=|");
                        break;
                    case 188:
                        ztext = ztext.replace("|", ",|");
                        break;
                    case 189:
                        ztext = ztext.replace("|", "-|");
                        break;
                    case 190:
                        ztext = ztext.replace("|", ".|");
                        break;
                    case 191:
                        ztext = ztext.replace("|", "/|");
                        break;
                    case 192:
                        ztext = ztext.replace("|", "`|");
                        break;
                    case 219:
                        ztext = ztext.replace("|", "[|");
                        break;
                    case 220:
                        ztext = ztext.replace("|", "\\|");
                        break;
                    case 221:
                        ztext = ztext.replace("|", "]|");
                        break;
                    case 222:
                        ztext = ztext.replace("|", "'|");
                        break;
                    default:
                        ztext = ztext.replace("|", String.fromCharCode(zevent.keyCode).toLowerCase() + "|");
                        break;
                }
            }
        }
        if (ztext.indexOf('|') == -1) {
            ztext += "|";
        }
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-processKey=" + ex.message);
	} 
    return ztext;
}

WTWJS.prototype.checkKey = function(ztextinput, zvalidtype, zallowblank, zcomplete) {
	/* keyboard key check for input (with preset allowed keys) */
	try {
		var zevent = window.event;
		var ztext = ztextinput.value;
		var zcaretstart = ztextinput.length - 1;
		var zcaretend = ztextinput.length - 1;
		if (WTW.getBrowser() != "safari") {
			zcaretstart = ztextinput.selectionStart;
			zcaretend = ztextinput.selectionEnd;
		}
		var znewtext = "";
		var zpossible = "";
		switch (zvalidtype) {
			case "number":
				zpossible = "1234567890.-";
				break;
			case "phonenumber":
				zpossible = "1234567890";
				break;
			case "text":
				zpossible = "1234567890abcdefghijklmnopqrstuvwxyz`~!@#$%^&*()_-+={[}]\\:;\"'<,>.?/ ";
				break;
			case "safetext":
				zpossible = "1234567890abcdefghijklmnopqrstuvwxyz~!@#$%^&*()_-+={[}]:;\"',.? ";
				break;
			case "password":
				zpossible = "1234567890abcdefghijklmnopqrstuvwxyz~!@#$%^&*()_-+={[}]:;<,>.? ";
				break;
			case "email":
				zpossible = "1234567890abcdefghijklmnopqrstuvwxyz@.!#$%&'*+-/=?^_`{|}~";
				break;
			case "webname":
				zpossible = "1234567890abcdefghijklmnopqrstuvwxyz-_.";
				break;
			case "displayname":
				zpossible = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_. ',";
				break;
			case "web":
				zpossible = "1234567890abcdefghijklmnopqrstuvwxyz`~!@#$%^&*()_-+={[}]\\:;\"'<,>.?/ ";
				break;
			case "idoremail":
				zpossible = "1234567890abcdefghijklmnopqrstuvwxyz@.-_";
				break;
		}
		if (ztext.length > 0 && zpossible != "") {
			for (var i = 0, len = ztext.length; i < len; i++) {
				if (zpossible.indexOf(ztext[i].toLowerCase()) > -1) {
					znewtext += ztext[i];
				} else {
					zcaretstart -= 1;
					zcaretend -= 1;
				}
			}
		}
		if (zevent != undefined) {
			switch (zevent.keyCode) {
				case 8: // backspace?
					//zcaretstart -= 1;
					//zcaretend -= 1;
					break;
				case 9: // tab
					break;
				case 13: //String.fromCharCode(182).toLowerCase()
					break;
				case 27: // esc
					break;
				case 32: // space
					break;
				case 35: // end
					break;
				case 36: // home
					break;
				case 37: // left
					break;
				case 38: // up
					break;
				case 39: // right
					break;
				case 40: // down
					break;
				case 45: // insert
					break;
				case 46: // delete
					break;
			}
		}
		ztextinput.style.backgroundColor = "#ffffff";
		ztextinput.style.color = "#000000";
		switch (zvalidtype) {
			case "number":
				if (znewtext.indexOf(".") > -1) {
					var zparts = znewtext.split('.');
					if (zparts.length > 1) {
						znewtext = zparts[0] + "." + zparts[1];
						for (i = 2;i < zparts.length;i++) {
							znewtext += zparts[i];
						}
					}
				}
				if (znewtext.indexOf("-") > -1) {
					var zparts = znewtext.split('-');
					if (zparts.length > 1) {
						if (zparts[0].length == 0) {
							znewtext = "-" + zparts[1];
							for (i = 2;i < zparts.length;i++) {
								znewtext += zparts[i];
							}
						} else {
							znewtext = zparts[0];
							for (i = 1;i < zparts.length;i++) {
								znewtext += zparts[i];
							}
						}
					}
				}
				break;
			case "phonenumber":
				var zleading = "";
				if (znewtext.length > 0) {
					if (znewtext.substr(0,1) == "1") {
						zleading = "1 ";
						znewtext = znewtext.substr(1,znewtext.length - 1);
						zcaretstart += 2;
						zcaretend += 2;
					}
				}
				if (znewtext.length > 10) {
					znewtext = "(" + znewtext.substr(0,3) + ") " + znewtext.substr(3,3) + "-" + znewtext.substr(6,4) + " " + znewtext.substr(10,znewtext.length - 10);
					zcaretstart += 5;
					zcaretend += 5;
				} else if (znewtext.length > 6) {
					znewtext = "(" + znewtext.substr(0,3) + ") " + znewtext.substr(3,3) + "-" + znewtext.substr(6,znewtext.length - 6);
					zcaretstart += 4;
					zcaretend += 4;
				} else if (znewtext.length > 3) {
					znewtext = "(" + znewtext.substr(0,3) + ") " + znewtext.substr(3,znewtext.length - 3);
					zcaretstart += 3;
					zcaretend += 3;
				} else if (znewtext.length > 0) {
					znewtext = "(" + znewtext;
					zcaretstart += 1;
					zcaretend += 1;
				}
				if (znewtext.length > 0) {
					znewtext = zleading + znewtext;
				} else {
					znewtext = zleading.replace(" ","");
				}
				break;
			case "text":
				break;
			case "safetext":
				if (zcomplete == 1) {
					if (znewtext.length > 0) {
						while (znewtext.indexOf("  ") > -1) {
							znewtext = znewtext.replace("  "," ");
							zcaretstart -= 1;
							zcaretend -= 1;
						}
						while (znewtext.indexOf(",,") > -1) {
							znewtext = znewtext.replace(",,",",");
							zcaretstart -= 1;
							zcaretend -= 1;
						}
						while (znewtext.indexOf("--") > -1) {
							znewtext = znewtext.replace("--","-");
							zcaretstart -= 1;
							zcaretend -= 1;
						}
					}
				}
				break;
			case "password":
				break;
			case "email":
				var zserverpossible = "abcdefghijklmnopqrstuvwxyz0123456789-.";
				if (znewtext.indexOf("@") > -1) {
					var zparts = znewtext.split('@');
					if (zparts.length > 1) {
						znewtext = zparts[0] + "@" + zparts[1];
						for (i = 2;i < zparts.length;i++) {
							znewtext += zparts[i];
						}
					}
					zparts = znewtext.split('@');
					znewtext = zparts[0] + "@";
					ztext = zparts[1];
					if (ztext.length > 0 && zpossible != "") {
						for (var i = 0, len = ztext.length; i < len; i++) {
							if (zpossible.indexOf(ztext[i].toLowerCase()) > -1) {
								znewtext += ztext[i];
							}
						}
					}
				}
				if (znewtext.length > 0) {
					while (znewtext.indexOf("..") > -1) {
						znewtext = znewtext.replace("..",".");
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					if (znewtext.substr(0,1) == ".") {
						znewtext = znewtext.substr(1,znewtext.length - 1);
						zcaretstart -= 1;
						zcaretend -= 1;
					}
				}
				if (zcomplete == 1) {
					if (znewtext.length > 0) {
						if (znewtext.substr(znewtext.length - 1,1) == ".") {
							znewtext = znewtext.substr(0,znewtext.length - 1)
						}
					}
					if (WTW.isEmail(znewtext) == false && znewtext.length > 0) {
						ztextinput.style.backgroundColor = "#ff0000";
						ztextinput.style.color = "#ffffff";
					}
				}
				break;
			case "webname":
				if (znewtext.length > 0) {
					while (znewtext.indexOf("..") > -1) {
						znewtext = znewtext.replace("..",".");
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					if (znewtext.substr(0,1) == ".") {
						znewtext = znewtext.substr(1,znewtext.length - 1);
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					while (znewtext.indexOf("--") > -1) {
						znewtext = znewtext.replace("--","-");
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					if (znewtext.substr(0,1) == "-") {
						znewtext = znewtext.substr(1,znewtext.length - 1);
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					while (znewtext.indexOf("__") > -1) {
						znewtext = znewtext.replace("__","_");
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					if (znewtext.substr(0,1) == "_") {
						znewtext = znewtext.substr(1,znewtext.length - 1);
						zcaretstart -= 1;
						zcaretend -= 1;
					}
				}
				if (zcomplete == 1) {
					if (znewtext.length > 0) {
						if (znewtext.substr(znewtext.length - 1,1) == ".") {
							znewtext = znewtext.substr(0,znewtext.length - 1)
						}
					}
					if (znewtext.length > 0) {
						if (znewtext.substr(znewtext.length - 1,1) == "-") {
							znewtext = znewtext.substr(0,znewtext.length - 1)
						}
					}
					if (znewtext.length > 0) {
						if (znewtext.substr(znewtext.length - 1,1) == "_") {
							znewtext = znewtext.substr(0,znewtext.length - 1)
						}
					}
				}
				break;
			case "displayname":
				if (znewtext.length > 0) {
					while (znewtext.indexOf("''") > -1) {
						znewtext = znewtext.replace("''","'");
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					if (znewtext.substr(0,1) == "'") {
						znewtext = znewtext.substr(1,znewtext.length - 1);
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					while (znewtext.indexOf("  ") > -1) {
						znewtext = znewtext.replace("  "," ");
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					if (znewtext.substr(0,1) == " ") {
						znewtext = znewtext.substr(1,znewtext.length - 1);
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					while (znewtext.indexOf("..") > -1) {
						znewtext = znewtext.replace("..",".");
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					if (znewtext.substr(0,1) == ".") {
						znewtext = znewtext.substr(1,znewtext.length - 1);
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					while (znewtext.indexOf(",,") > -1) {
						znewtext = znewtext.replace(",,",",");
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					if (znewtext.substr(0,1) == ",") {
						znewtext = znewtext.substr(1,znewtext.length - 1);
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					while (znewtext.indexOf("--") > -1) {
						znewtext = znewtext.replace("--","-");
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					if (znewtext.substr(0,1) == "-") {
						znewtext = znewtext.substr(1,znewtext.length - 1);
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					while (znewtext.indexOf("__") > -1) {
						znewtext = znewtext.replace("__","_");
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					if (znewtext.substr(0,1) == "_") {
						znewtext = znewtext.substr(1,znewtext.length - 1);
						zcaretstart -= 1;
						zcaretend -= 1;
					}
				}
				if (zcomplete == 1) {
					if (znewtext.length > 0) {
						if (znewtext.substr(znewtext.length - 1,1) == ".") {
							znewtext = znewtext.substr(0,znewtext.length - 1)
						}
					}
					if (znewtext.length > 0) {
						if (znewtext.substr(znewtext.length - 1,1) == "-") {
							znewtext = znewtext.substr(0,znewtext.length - 1)
						}
					}
					if (znewtext.length > 0) {
						if (znewtext.substr(znewtext.length - 1,1) == "_") {
							znewtext = znewtext.substr(0,znewtext.length - 1)
						}
					}
					if (znewtext.length > 0) {
						if (znewtext.substr(znewtext.length - 1,1) == " ") {
							znewtext = znewtext.substr(0,znewtext.length - 1)
						}
					}
					if (znewtext.length > 0) {
						if (znewtext.substr(znewtext.length - 1,1) == ",") {
							znewtext = znewtext.substr(0,znewtext.length - 1)
						}
					}
					if (znewtext.length > 0) {
						if (znewtext.substr(znewtext.length - 1,1) == "'") {
							znewtext = znewtext.substr(0,znewtext.length - 1)
						}
					}
				}
				break;
			case "web":
				if (znewtext.length > 0) {
					while (znewtext.indexOf("..") > -1) {
						znewtext = znewtext.replace("..",".");
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					if (znewtext.substr(0,1) == ".") {
						znewtext = znewtext.substr(1,znewtext.length - 1);
						zcaretstart -= 1;
						zcaretend -= 1;
					}
				}
				if (zcomplete == 1) {
					if (znewtext.length > 0) {
						if (znewtext.substr(znewtext.length - 1,1) == ".") {
							znewtext = znewtext.substr(0,znewtext.length - 1)
						}
					}
					if (WTW.isURL(znewtext) == false && znewtext.length > 0) {
						ztextinput.style.backgroundColor = "#ff0000";
						ztextinput.style.color = "#ffffff";
					}
				}
				break;
			case "idoremail":
				if (znewtext.length > 0) {
					while (znewtext.indexOf("..") > -1) {
						znewtext = znewtext.replace("..",".");
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					if (znewtext.substr(0,1) == ".") {
						znewtext = znewtext.substr(1,znewtext.length - 1);
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					while (znewtext.indexOf("@@") > -1) {
						znewtext = znewtext.replace("@@","@");
						zcaretstart -= 1;
						zcaretend -= 1;
					}
					if (znewtext.substr(0,1) == "@") {
						znewtext = znewtext.substr(1,znewtext.length - 1);
						zcaretstart -= 1;
						zcaretend -= 1;
					}
				}
				var zserverpossible = "abcdefghijklmnopqrstuvwxyz0123456789-.";
				if (znewtext.indexOf("@") > -1) {
					var zparts = znewtext.split('@');
					if (zparts.length > 1) {
						znewtext = zparts[0] + "@" + zparts[1];
						for (i = 2;i < zparts.length;i++) {
							znewtext += zparts[i];
						}
					}
					zparts = znewtext.split('@');
					znewtext = zparts[0] + "@";
					ztext = zparts[1];
					if (ztext.length > 0 && zpossible != "") {
						for (var i = 0, len = ztext.length; i < len; i++) {
							if (zpossible.indexOf(ztext[i].toLowerCase()) > -1) {
								znewtext += ztext[i];
							}
						}
					}
				}
				if (zcomplete == 1) {
					if (znewtext.length > 0) {
						if (znewtext.substr(znewtext.length - 1,1) == ".") {
							znewtext = znewtext.substr(0,znewtext.length - 1)
						}
					}
					if (WTW.isEmail(znewtext) == false) {
						if (znewtext.length > 0) {
							while (znewtext.indexOf("..") > -1) {
								znewtext = znewtext.replace("..",".");
								zcaretstart -= 1;
								zcaretend -= 1;
							}
							if (znewtext.substr(0,1) == ".") {
								znewtext = znewtext.substr(1,znewtext.length - 1);
								zcaretstart -= 1;
								zcaretend -= 1;
							}
							while (znewtext.indexOf("--") > -1) {
								znewtext = znewtext.replace("--","-");
								zcaretstart -= 1;
								zcaretend -= 1;
							}
							if (znewtext.substr(0,1) == "-") {
								znewtext = znewtext.substr(1,znewtext.length - 1);
								zcaretstart -= 1;
								zcaretend -= 1;
							}
							while (znewtext.indexOf("__") > -1) {
								znewtext = znewtext.replace("__","_");
								zcaretstart -= 1;
								zcaretend -= 1;
							}
							if (znewtext.substr(0,1) == "_") {
								znewtext = znewtext.substr(1,znewtext.length - 1);
								zcaretstart -= 1;
								zcaretend -= 1;
							}
						}
						while (znewtext.indexOf("!") > -1) {
							znewtext = znewtext.replace("!","");
						}
						while (znewtext.indexOf("#") > -1) {
							znewtext = znewtext.replace("#","");
						}
						while (znewtext.indexOf("$") > -1) {
							znewtext = znewtext.replace("$","");
						}
						while (znewtext.indexOf("%") > -1) {
							znewtext = znewtext.replace("%","");
						}
						while (znewtext.indexOf("&") > -1) {
							znewtext = znewtext.replace("&","");
						}
						while (znewtext.indexOf("'") > -1) {
							znewtext = znewtext.replace("'","");
						}
						while (znewtext.indexOf("*") > -1) {
							znewtext = znewtext.replace("*","");
						}
						while (znewtext.indexOf("+") > -1) {
							znewtext = znewtext.replace("+","");
						}
						while (znewtext.indexOf("/") > -1) {
							znewtext = znewtext.replace("/","");
						}
						while (znewtext.indexOf("=") > -1) {
							znewtext = znewtext.replace("=","");
						}
						while (znewtext.indexOf("?") > -1) {
							znewtext = znewtext.replace("?","");
						}
						while (znewtext.indexOf("^") > -1) {
							znewtext = znewtext.replace("^","");
						}
						while (znewtext.indexOf("`") > -1) {
							znewtext = znewtext.replace("`","");
						}
						while (znewtext.indexOf("{") > -1) {
							znewtext = znewtext.replace("{","");
						}
						while (znewtext.indexOf("}") > -1) {
							znewtext = znewtext.replace("}","");
						}
						while (znewtext.indexOf("|") > -1) {
							znewtext = znewtext.replace("|","");
						}
						while (znewtext.indexOf("~") > -1) {
							znewtext = znewtext.replace("~","");
						}
						if (znewtext.length > 0) {
							if (znewtext.substr(znewtext.length - 1,1) == ".") {
								znewtext = znewtext.substr(0,znewtext.length - 1)
							}
						}
						if (znewtext.length > 0) {
							if (znewtext.substr(znewtext.length - 1,1) == "-") {
								znewtext = znewtext.substr(0,znewtext.length - 1)
							}
						}
						if (znewtext.length > 0) {
							if (znewtext.substr(znewtext.length - 1,1) == "_") {
								znewtext = znewtext.substr(0,znewtext.length - 1)
							}
						}
					}
				}
				break;
		}
		if (zcomplete == 1 && znewtext.length == 0 && zallowblank == 0) {
			ztextinput.style.backgroundColor = "#ff0000";
			ztextinput.style.color = "#ffffff";
		}
		ztextinput.value = znewtext;
		if (WTW.getBrowser() != "safari") {
			ztextinput.selectionStart = zcaretstart;
			ztextinput.selectionEnd = zcaretend;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-WTW.checkKey=" + ex.message);
	} 
}


/* highlight, outline, or accent molds in a 3D Scene */

WTWJS.prototype.registerMouseOver = function(zmold) {
	/* register mouse over creates a mouseover event on a mold hover in the 3D Scene */
	try {
		if (zmold != null) {
			zmold.actionManager = new BABYLON.ActionManager(scene);	
			zmold.actionManager.registerAction(WTW.mouseOver);
			zmold.actionManager.registerAction(WTW.mouseOut);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-registerMouseOver=" + ex.message);
	}
}

WTWJS.prototype.hilightMoldFast = function(zmoldname, zcolor) {
	/* highlight a mold on the 3D Scene (quick blink) */
	try {
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
			var zcolorset = BABYLON.Color3.Yellow();
			switch (zcolor.toLowerCase()) {
				case "green":
					zcolorset = BABYLON.Color3.Green();
					break;
				case "red":
					zcolorset = BABYLON.Color3.Red();
					break;
				case "blue":
					zcolorset = BABYLON.Color3.Blue();
					break;
				case "yellow":
					zcolorset = BABYLON.Color3.Yellow();
					break;
			}
			WTW.unhilightMold(zmoldname);
			if (WTW.highlightLayer == null) {
				WTW.highlightLayer = new BABYLON.HighlightLayer("highlightlayer", scene);
			}
			WTW.highlightLayer.outerGlow = true;
			WTW.highlightLayer.innerGlow = true;
			WTW.highlightLayer.addMesh(zmold, zcolorset);
			window.setTimeout(function(){
				WTW.highlightLayer.outerGlow = false;
				WTW.highlightLayer.innerGlow = false;
				WTW.highlightLayer.removeMesh(zmold);
			},500);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-hilightMoldFast=" + ex.message);
	}
}

WTWJS.prototype.hilightMold = function(zmoldname, zcolor) {
	/* highlight a mold on the 3D Scene */
	try {
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
			var zcolorset = BABYLON.Color3.Yellow();
			switch (zcolor.toLowerCase()) {
				case "green":
					zcolorset = BABYLON.Color3.Green();
					break;
				case "red":
					zcolorset = BABYLON.Color3.Red();
					break;
				case "blue":
					zcolorset = BABYLON.Color3.Blue();
					break;
				case "yellow":
					zcolorset = BABYLON.Color3.Yellow();
					break;
			}
			WTW.unhilightMold(zmoldname);
			if (WTW.highlightLayer == null) {
				WTW.highlightLayer = new BABYLON.HighlightLayer("highlightlayer", scene);
			}
			WTW.highlightLayer.outerGlow = true;
			//WTW.highlightLayer.innerGlow = true;
			WTW.highlightLayer.addMesh(zmold, zcolorset);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-hilightMold=" + ex.message);
	}
}

WTWJS.prototype.unhilightMold = function(zmoldname) {
	/* unhighlight a mold on the 3D Scene */
	try {
		if (WTW.highlightLayer != null) {
			var zmold = WTW.getMeshOrNodeByID(zmoldname);
			if (zmold != null) {
				WTW.highlightLayer.removeMesh(zmold);
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-unhilightMold=" + ex.message);
	}
}

WTWJS.prototype.setOpacity = function(zmoldname, zopacity) {
	/* set opacity (transparency) of a given mold by name */
	try {
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
			if (zmold.material != undefined) {
				if (zmoldname.indexOf('person') > -1) {
					zmold.visibility = zopacity;
				} else if (zmoldname.indexOf('actionzone') == -1) {
					zmold.material.alpha = zopacity;
					zmold.material.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
				} else {
					zmold.material.alpha = zopacity;
				}
				if (zopacity == 0) {
					zmold.isVisible = false;				
				} else {
					zmold.isVisible = true;				
				}
			} else {
				var zcovering = new BABYLON.StandardMaterial("mat" + zmoldname, scene);
				zcovering.alpha = zopacity;
				zmold.material = zcovering;
			}
		} 
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-setOpacity=" + ex.message);
    }
}

WTWJS.prototype.setDirectionalOpacity = function(zmoldname, zopacity) {
	/* set opacity (transparency) on a directional textured surface */
	try {
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
			var zfound = false;
			if (zmold.material.subMaterials != null) {
				for (var i=0;i<zmold.material.subMaterials.length;i++) {
					if (zmold.material.subMaterials[i] != null) {
						zfound = true;
						zmold.material.subMaterials[i].alpha = zopacity;
						zmold.material.subMaterials[i].specularColor = new BABYLON.Color3(zopacity, zopacity, zopacity);
						//zmold.material.subMaterials[i].emissiveColor = new BABYLON.Color3(zopacity, zopacity, zopacity);
						zmold.material.subMaterials[i].diffuseColor = new BABYLON.Color3(zopacity, zopacity, zopacity);		
						zmold.material.subMaterials[i].emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
					}
				}
			}
			if (zfound == false) {
				WTW.setOpacity(zmoldname, zopacity);
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-setDirectionalOpacity=" + ex.message);
    }
}

WTWJS.prototype.resetMoldsOpacity = function() {
	/* cycles the molds arrays to reset the opacity of a mold after a highlighting */
	try {
		if (WTW.adminView == 1) {
			if (WTW.buildingMolds != null) {
				for (var i = 0; i < WTW.buildingMolds.length; i++) {
					if (WTW.buildingMolds[i] != null) {
						WTW.resetMoldOpacity('building', i);
					}
				}
			}
			if (WTW.communitiesMolds != null) {
				for (var i = 0; i < WTW.communitiesMolds.length; i++) {
					if (WTW.communitiesMolds[i] != null) {
						WTW.resetMoldOpacity('community', i);
					}
				}
			}
			if (WTW.thingMolds != null) {
				for (var i = 0; i < WTW.thingMolds.length; i++) {
					if (WTW.thingMolds[i] != null) {
						WTW.resetMoldOpacity('thing', i);
					}
				}
			}		
			if (dGet('wtw_tmoldname').value.indexOf('molds') > -1) {
				WTW.setNewMold();
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-resetMoldsOpacity=" + ex.message);
	}
}

WTWJS.prototype.resetMoldOpacity = function(zwebtype, zmoldind) {
	/* reset the opacity of a mold after a highlighting */
	try {
		var zmolds = WTW.buildingMolds;
		var zshape = "box";
		switch (zwebtype) {
			case "community":
				zmolds = WTW.communitiesMolds;
				break;
			case "thing":
				zmolds = WTW.thingMolds;
				break;
		}
		if (zmolds[zmoldind].shape != "") {
			zshape = zmolds[zmoldind].shape;
		}
		var zmoldname = zmolds[zmoldind].moldname;
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {	
			var zopacity = 1;
			if (zmolds[zmoldind].opacity != undefined) {
				if (WTW.isNumeric(zmolds[zmoldind].opacity)) {
					zopacity = Number(zmolds[zmoldind].opacity) / 100;
					if (zopacity > 1) {
						zopacity = 1;
					} else if (zopacity < 0) {
						zopacity = 0;
					}
				}
			}
			if ((zshape == "box" || zshape == "wall" || zshape == "floor") && zmolds[zmoldind].covering == "directional texture") {
				zmolds[zmoldind].covering = "directional texture";
			} else if (zshape != "box" && zshape != "wall" && zshape != "floor" && zmolds[zmoldind].covering == "directional texture") {
				zmolds[zmoldind].covering = "texture";
			}
			if (zmold.material != undefined) {
				if (zmolds[zmoldind].covering != "none" && zmolds[zmoldind].covering != "hidden" && zmolds[zmoldind].moldname.indexOf('video') == -1) {
					zmold.material.diffuseColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.diffusecolor);	
					zmold.material.emissiveColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.emissivecolor);
					zmold.material.specularColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.specularcolor);
					zmold.material.ambientColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.ambientcolor);
				} else {
					zopacity = 0;
					zmold.material.specularColor = new BABYLON.Color3(zopacity, zopacity, zopacity);			
					zmold.material.diffuseColor = new BABYLON.Color3(zopacity, zopacity, zopacity);	
					zmold.material.emissiveColor = new BABYLON.Color3(zopacity, zopacity, zopacity);
					zmold.material.ambientColor = new BABYLON.Color3(zopacity, zopacity, zopacity);
				}
				if (zmolds[zmoldind].covering == "glass") {
					zopacity = .2;
				}
				if (zshape != "image") {
					zmold.material.alpha = zopacity;
				}
				if (zmold.material.subMaterials != undefined) {
					for (var i = 0; i < zmold.material.subMaterials.length; i++) {
						zmold.material.subMaterials[i].alpha = zopacity;
						zmold.material.subMaterials[i].diffuseColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.diffusecolor);
						zmold.material.subMaterials[i].emissiveColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.emissivecolor);
						zmold.material.subMaterials[i].specularColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.specularcolor);
						zmold.material.subMaterials[i].ambientColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.ambientcolor);
					}
				}
			}
			var zmoldimageframename = zmoldname + "-imageframe";
			var zmoldimageframe = WTW.getMeshOrNodeByID(zmoldimageframename);
			if (zmoldimageframe != null) {	
				if (zmoldimageframe.material != undefined) {
					zmoldimageframe.material.diffuseColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.diffusecolor);	
					zmoldimageframe.material.emissiveColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.emissivecolor);
					zmoldimageframe.material.specularColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.specularcolor);
					zmoldimageframe.material.ambientColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.ambientcolor);
				}
			}
		}		
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-resetMoldOpacity=" + ex.message);
	} 
}

WTWJS.prototype.resetMoldCoverings = function() {
	/* process mold arrays to reload and reset the material on a mesh based on the mold def */
	try {
		if (WTW.buildingMolds != null) {
			for (var i = 0; i < WTW.buildingMolds.length; i++) {
				if (WTW.buildingMolds[i] != null) {
					var zshape = "wall";
					var zcoveringname = "texture";
					var ztexturebackupid = "";
					if (WTW.buildingMolds[i].shape != undefined) {
						zshape = WTW.buildingMolds[i].shape;
					}
					if (WTW.buildingMolds[i].covering != undefined) {
						zcoveringname = WTW.buildingMolds[i].covering;
					}
					if (WTW.buildingMolds[i].graphics.texture.backupid != undefined) {
						ztexturebackupid = WTW.buildingMolds[i].graphics.texture.backupid;
					}
					if (WTW.adminMenu == 6 || (WTW.adminMenu >= 10 && WTW.adminMenu <= 20) || WTW.adminMenu == 26 || WTW.adminMenu == 27 || WTW.adminMenu == 30 || WTW.adminMenu == 36 || (WTW.adminMenu >= 40 && WTW.adminMenu <= 52) || ztexturebackupid != "") {
						var zmold = WTW.getMeshOrNodeByID(WTW.buildingMolds[i].moldname);
						if (zmold != null) {
							var zmolddef = WTW.buildingMolds[i];
							if ((zshape == "box" || zshape == "wall" || zshape == "floor") && zcoveringname == "directional texture") {
								if (zmolddef.graphics.texture.id != zmolddef.graphics.texture.backupid && zmolddef.graphics.texture.backupid != '') {
									WTW.disposeDirectionalTexture(zmold);
								}
							}
							if (zshape != "image") {
								WTW.resetMoldOpacity('building', i);
								if (zshape != "viewblog" && zshape != "blogposting" && zshape != "image") {
									if (zmolddef.graphics.texture.id != zmolddef.graphics.texture.backupid && zmolddef.graphics.texture.backupid != '') {
										if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
											if (i != Number(dGet('wtw_tmoldind').value)) {
												WTW.resetMoldCovering('building', i);
											}
										} else {
											WTW.resetMoldCovering('building', i);
										}
									} else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		if (WTW.communitiesMolds != null) {
			for (var i = 0; i < WTW.communitiesMolds.length; i++) {
				if (WTW.communitiesMolds[i] != null) {
					var zshape = "wall";
					var zcoveringname = "texture";
					var ztexturebackupid = "";
					if (WTW.communitiesMolds[i].shape != undefined) {
						zshape = WTW.communitiesMolds[i].shape;
					}
					if (WTW.communitiesMolds[i].covering != undefined) {
						zcoveringname = WTW.communitiesMolds[i].covering;
					}
					if (WTW.communitiesMolds[i].graphics.texture.backupid != undefined) {
						ztexturebackupid = WTW.communitiesMolds[i].graphics.texture.backupid;
					}
					if (WTW.adminMenu == 6 || (WTW.adminMenu >= 10 && WTW.adminMenu <= 20) || WTW.adminMenu == 26 || WTW.adminMenu == 27 || WTW.adminMenu == 30 || WTW.adminMenu == 36 || (WTW.adminMenu >= 40 && WTW.adminMenu <= 52) || ztexturebackupid != "") {
						var zmold = WTW.getMeshOrNodeByID(WTW.communitiesMolds[i].moldname);
						if (zmold != null) {
							var zmolddef = WTW.communitiesMolds[i];
							if ((zshape == "box" || zshape == "wall" || zshape == "floor") && zcoveringname == "directional texture") {
								if (zmolddef.graphics.texture.id != zmolddef.graphics.texture.backupid && zmolddef.graphics.texture.backupid != '') {
									WTW.disposeDirectionalTexture(zmold);
								}
							}
							if (zshape != "image") {
								WTW.resetMoldOpacity('community', i);
								if (zshape != "viewblog" && zshape != "blogposting") {
									if (zmolddef.graphics.texture.id != zmolddef.graphics.texture.backupid && zmolddef.graphics.texture.backupid != '') {
										if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
											if (i != Number(dGet('wtw_tmoldind').value)) {
												WTW.resetMoldCovering('community', i);
											}
										} else {
											WTW.resetMoldCovering('community', i);
										}
									} else {
										
									}
								}
							}
						}
					}
				}
			}
		}
		if (WTW.thingMolds != null) {
			for (var i = 0; i < WTW.thingMolds.length; i++) {
				if (WTW.thingMolds[i] != null) {
					var zshape = "wall";
					var zcoveringname = "texture";
					var ztexturebackupid = "";
					if (WTW.thingMolds[i].shape != undefined) {
						zshape = WTW.thingMolds[i].shape;
					}
					if (WTW.thingMolds[i].covering != undefined) {
						zcoveringname = WTW.thingMolds[i].covering;
					}
					if (WTW.thingMolds[i].graphics.texture.backupid != undefined) {
						ztexturebackupid = WTW.thingMolds[i].graphics.texture.backupid;
					}
					if (WTW.adminMenu == 6 || (WTW.adminMenu >= 10 && WTW.adminMenu <= 20) || WTW.adminMenu == 26 || WTW.adminMenu == 27 || WTW.adminMenu == 30 || WTW.adminMenu == 36 || (WTW.adminMenu >= 40 && WTW.adminMenu <= 52) || ztexturebackupid != "") {
						var zmold = WTW.getMeshOrNodeByID(WTW.thingMolds[i].moldname);
						if (zmold != null) {
							var zmolddef = WTW.thingMolds[i];
							if ((zshape == "box" || zshape == "wall" || zshape == "floor") && zcoveringname == "directional texture") {
								if (zmolddef.graphics.texture.id != zmolddef.graphics.texture.backupid && zmolddef.graphics.texture.backupid != '') {
									WTW.disposeDirectionalTexture(zmold);
								}
							}
							if (zshape != "image") {
								WTW.resetMoldOpacity('thing', i);
								if (zshape != "viewblog" && zshape != "blogposting" && zshape != "image") {
									if (zmolddef.graphics.texture.id != zmolddef.graphics.texture.backupid && zmolddef.graphics.texture.backupid != '') {
										if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
											if (i != Number(dGet('wtw_tmoldind').value)) {
												WTW.resetMoldCovering('thing', i);
											}
										} else {
											WTW.resetMoldCovering('thing', i);
										}
									} else {
										
									}
								}
							}
						}
					}
				}
			}
		}		
		if (WTW.adminView == 1) {
			if (dGet('wtw_tmoldname').value.indexOf('molds') > -1) {
				WTW.setNewMold();
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-resetMoldCoverings=" + ex.message);
	}
}

WTWJS.prototype.resetMoldCovering = function(zwebtype, zmoldind) {
	/* reload and reset the material on a mesh based on the mold def */
	try {
		var zmolds = WTW.buildingMolds;
		var zshape = "box";
		switch (zwebtype) {
			case "building":
				break;
			case "community":
				zmolds = WTW.communitiesMolds;
				break;
			case "thing":
				zmolds = WTW.thingMolds;
				break;
		}
		if (zmolds[zmoldind].shape != "") {
			zshape = zmolds[zmoldind].shape;
		}
		var zmoldname = zmolds[zmoldind].moldname;
		var zmold = WTW.getMeshOrNodeByID(moldname);
		if (zmold != null) {			
			var zlenx = Number(zmolds[zmoldind].scaling.x);
			var zleny = Number(zmolds[zmoldind].scaling.y);
			var zlenz = Number(zmolds[zmoldind].scaling.z);
			var zspecial1 = 0;
			var zspecial2 = 0;
			try {
				if (WTW.isNumeric(zmolds[zmoldind].scaling.special1)) {
					zspecial1 = Number(zmolds[zmoldind].scaling.special1)
				}
			} catch(ex) {}
			try {
				if (WTW.isNumeric(zmolds[zmoldind].scaling.special2)) {
					zspecial2 = Number(zmolds[zmoldind].scaling.special2)
				}
			} catch(ex) {}
			if ((zshape == "box" || zshape == "wall" || zshape == "floor") && zmolds[zmoldind].covering == "directional texture") {
				zmolds[zmoldind].covering = "directional texture";
			} else if (zshape != "box" && zshape != "wall" && zshape != "floor" && zmolds[zmoldind].covering == "directional texture") {
				zmolds[zmoldind].covering = "texture";
			}
			if (zmolds[zmoldind].covering != "none") {
				if (zmolds[zmoldind].covering != "directional texture") {					
					if (zmold.material != undefined) {
						if (zmold.material.diffuseTexture != undefined) {
							if (zmold.material.diffuseTexture != null) {
								zmold.material.diffuseTexture.dispose();
								zmold.material.diffuseTexture = null;
							}
						}
						zmold.material.dispose();
						zmold.material = null;
					}
					zmold.material = WTW.addCovering(zmolds[zmoldind].covering, zmoldname, zmolds[zmoldind], zlenx, zleny, zlenz, zspecial1, zspecial2);
				} else {
					if (zmold.material != null) {
						if (zmold.material.subMaterials != undefined) {
							for (var i=0;i < zmold.material.subMaterials.length;i++) {
								if (zmold.material.subMaterials[i].diffuseTexture != undefined) {
									if (zmold.material.subMaterials[i].diffuseTexture != null) {
										zmold.material.subMaterials[i].diffuseTexture.dispose();
										zmold.material.subMaterials[i].diffuseTexture = null;
									}
								}
							}
						}
					}			
					zmold.subMeshes = [];
					WTW.addCovering(zmolds[zmoldind].covering, zmoldname, zmolds[zmoldind], zlenx, zleny, zlenz, zspecial1, zspecial2);
				}
			} else {
				if (zmold.material != undefined) {
					if (zmold.material.diffuseTexture != undefined) {
						if (zmold.material.diffuseTexture != null) {
							zmold.material.diffuseTexture.dispose();
							zmold.material.diffuseTexture = null;
						}
					}
					zmold.material.dispose();
					zmold.material = null;
				}
				zmold.material = new BABYLON.StandardMaterial("mat" + zmoldname, scene);
			}
		}		
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-resetMoldCovering=" + ex.message);
	} 
}


/* clicks, hover overs, and other interaction events */

WTWJS.prototype.checkImageClick = function(zmoldname) {
	/* check for image click and play JavaScript if set */
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		if (zmoldnameparts.molds[zmoldnameparts.moldind] != null) {
			if (zmoldnameparts.molds[zmoldnameparts.moldind].graphics.webimages[0] != null) {
				var zparameters = "";
				if (zmoldnameparts.molds[zmoldnameparts.moldind].graphics.webimages[0].jsparameters != undefined) {
					zparameters = zmoldnameparts.molds[zmoldnameparts.moldind].graphics.webimages[0].jsparameters;
				}
				if (zmoldnameparts.molds[zmoldnameparts.moldind].graphics.webimages[0].jsfunction != undefined) {
					var zfunctionname = zmoldnameparts.molds[zmoldnameparts.moldind].graphics.webimages[0].jsfunction;
					if (zfunctionname != "") {
						WTW.setFunctionAndExecute(zfunctionname, zparameters, zmoldname);
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-checkImageClick=" + ex.message);
	}
}

WTWJS.prototype.checkVideoClick = function(zmoldname, zforce) {
	/* click the buttons on the video player */
    try {
		if (zforce == undefined) {
			zforce = 3;
		}
		/* get parent moldname */
		zmoldname = zmoldname.replace('-videoposter','').replace('-mainvideo','').replace('-screen','');
		/* get mold with video player texture */
        var zvideomold = WTW.getMeshOrNodeByID(zmoldname + "-mainvideo");
		/* get mold for video poster image (for when not playing) */
        var zvideoposter = WTW.getMeshOrNodeByID(zmoldname + "-videoposter");

        if (zvideomold != null) {
			/* if it is fully loaded */
            if (!zvideomold.WTW.firstvideoclick) {
				/* load video to texture - only required the first time it is started after mold loads */
                zvideomold.material.diffuseTexture.video.src = zvideomold.WTW.videosrc;
                zvideomold.WTW.firstvideoclick = true;
                zvideomold.material.diffuseTexture.video.load();
                zvideomold.material.diffuseTexture.video.pause();
				/* move the video poster mold with the video texture (show it) */
				zvideoposter.position.x = zvideomold.position.x +.1;
            }
			if (zforce == 9) { /* open in tab (full screen mode) */
				/* stop the 3D Video Player */
				zvideomold.material.diffuseTexture.video.pause();
				/* open the video player page in new tab */
				WTW.openWebpage("/core/pages/playvideo.php?videosrc=" + zvideomold.material.diffuseTexture.video.src, "_blank");
			} else {
				if ((zvideomold.material.diffuseTexture.video.paused && zforce == 3) || zforce == 1 || zforce == 2) {
					/* move the video poster mold with the video texture (hide it) */
					zvideoposter.position.x = zvideomold.position.x -.1;
					if (zforce == 2) { /* start again */
						zvideomold.material.diffuseTexture.video.load();
					} else if (zforce == 1) {
					} /* zforce == 1 // play */
					zvideomold.material.diffuseTexture.video.play();
				} else { /* pause */
					if (zforce == -1) { /* pause at start */
						/* move the video poster mold with the video texture (show it) */
						zvideoposter.position.x = zvideomold.position.x +.1;
						zvideomold.material.diffuseTexture.video.load();
					} else if (zforce == 3) {
						zvideoposter.position.x = zvideomold.position.x +.1;
					} else {
						/* move the video poster mold with the video texture (hide it) */
						zvideoposter.position.x = zvideomold.position.x -.1;
					}
					zvideomold.material.diffuseTexture.video.pause();
				}
			}
        }
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_input.js-checkVideoClick=" + ex.message);
    }
}

WTWJS.prototype.checkHovers = function(zmold) {
	/* during a hover of a mold, the mold is checked for hover events and execute if exist */
	try {
		var zmoldnameparts = WTW.getMoldnameParts(WTW.currentID);
		var zmoldname = WTW.currentID;
		var zshape = '';
		WTW.checkMoldEvent('onmouseover', zmold.meshUnderPointer.name);
		if (zmoldnameparts.molds.length > 0) {
			if (WTW.adminView == 1) {
				WTW.mouseOverMoldAdmin(zmold, WTW.currentID);
			}
			if (zmoldnameparts.namepart.length > 5) {
				WTW.checkToolTip(zmoldnameparts.namepart, zmoldnameparts.moldind);
				if (zmoldnameparts.parentname.indexOf("seat") > -1) {
					WTW.showToolTip('Select to Sit');
				}
				/* molds have 2 methods of hover, move hover mold infront of image OR use opacity to show/hide */
				if (zmoldnameparts.shape == 'image') {
					var zhovermold = WTW.getMeshOrNodeByID(zmoldnameparts.namepart[0] + "-" + zmoldnameparts.namepart[1] + "-" + zmoldnameparts.namepart[2] + "-" + zmoldnameparts.namepart[3] + "-" + zmoldnameparts.namepart[4] + "-" + zmoldnameparts.namepart[5] + "-hoverimage");
					var zimagemold = WTW.getMeshOrNodeByID(zmoldnameparts.namepart[0] + "-" + zmoldnameparts.namepart[1] + "-" + zmoldnameparts.namepart[2] + "-" + zmoldnameparts.namepart[3] + "-" + zmoldnameparts.namepart[4] + "-" + zmoldnameparts.namepart[5] + "-mainimage");
					if (zhovermold != null && zimagemold != null) {
						zhovermold.position.x = -.25;
					}
				} else {
					var zhovermold = WTW.getMeshOrNodeByID(WTW.currentID + "hover");
					var zimagemold = WTW.getMeshOrNodeByID(WTW.currentID);
					if (zhovermold != null && zimagemold != null) {
						WTW.setDirectionalOpacity(WTW.currentID,0);
					}
				}
				zmoldname = zmoldnameparts.moldname;
				zshape = zmoldnameparts.shape;
			}
		} else {
			if (zmoldname.indexOf('person-') > -1 || zmoldname.indexOf('myavatar-') > -1) {
				zshape = 'avatar';
			} else if (zmoldname.indexOf('hud-') > -1) {
				WTW.hudCheckHovers(zmoldname, 1);
			}
		}
		if (zmoldname != undefined) {
			/* plugins can have hooks for hovers */
			WTW.pluginsCheckHovers(zmoldname, zshape);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-checkHovers=" + ex.message);
	}
}

WTWJS.prototype.resetHovers = function() {
	/* when hover of mold is complete, reverse the hover action (movement or opacity setting) */
	try {
		var zmoldname = WTW.lastID;
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		if (zmoldnameparts.molds.length > 0) {
			if (zmoldnameparts.shape == 'image') {
				if (zmoldname.indexOf("-") > -1) {
					var znamepart = zmoldname.split('-');
					if (znamepart.length > 5) {
						var zhovermold = WTW.getMeshOrNodeByID(znamepart[0] + "-" + znamepart[1] + "-" + znamepart[2] + "-" + znamepart[3] + "-" + znamepart[4] + "-" + znamepart[5] + "-hoverimage");
						var zimagemold = WTW.getMeshOrNodeByID(znamepart[0] + "-" + znamepart[1] + "-" + znamepart[2] + "-" + znamepart[3] + "-" + znamepart[4] + "-" + znamepart[5] + "-mainimage");
						if (zhovermold != null && zimagemold != null) {
							zhovermold.position.x = 0;
						}
					}
				}
			} else if (zmoldname.indexOf("scrollboxbodytext") > -1) {
				WTW.resetScrollBox(zmoldnameparts.moldname);
			} else { 
				var zhovermold = WTW.getMeshOrNodeByID(zmoldname + "hover");
				var zimagemold = WTW.getMeshOrNodeByID(zmoldname);
				if (zhovermold != null && zimagemold != null) {
					WTW.setDirectionalOpacity(zmoldname,1);
				}
			}
			/* plugins can have hooks to reset hovers */
			WTW.pluginsResetHovers(zmoldnameparts.moldname, zmoldnameparts.shape);
		} else {
			if (zmoldname.indexOf('hud-') > -1) {
				WTW.hudCheckHovers(zmoldname, 0);
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-resetHovers=" + ex.message);
	}
}

WTWJS.prototype.checkToolTip = function(znamepart, zmoldind) {
	/* check if mold has a tooltip note to show */
	/* this is the same as an alt tag on the mesh hover over */
	try {
		var zalttag = '';
		var zwebtype = znamepart[0];
		var zmolds = null;
		switch (zwebtype) {
			case "thingmolds":
				zmolds = WTW.thingMolds;
				break;
			case "buildingmolds":
				zmolds = WTW.buildingMolds;
				break;
			case "communitymolds":
				zmolds = WTW.communitiesMolds;
				break;
			case "things":
				zmolds = WTW.things;
				break;
			case "buildings":
				zmolds = WTW.buildings;
				break;
			case "communities":
				zmolds = WTW.communities;
				break;
			case "connectinggrids":
				zmolds = WTW.connectingGrids;
				break;
		}
		if (zmolds != null) {
			if (zmolds[zmoldind] != null) {
				if (zmolds[zmoldind].alttag.name != undefined) {
					zalttag = zmolds[zmoldind].alttag.name;
				}
			}
			if (zalttag == "" && thingid == "" && zwebtype == "thingmolds") {
				znamepart = WTW.thingMolds[zmoldind].parentname.split('-');
				zmoldind = Number(znamepart[1]);
				while (znamepart[0].indexOf("actionzone") > -1) {
					zmoldind = Number(znamepart[1]);
					znamepart = WTW.actionZones[zmoldind].parentname.split('-');
					zmoldind = Number(znamepart[1]);
				}
				WTW.checkToolTip(znamepart, zmoldind);
			} else {
				if (zalttag != "") {
					WTW.showToolTip(zalttag);
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-checkToolTip=" + ex.message);
	}
}

WTWJS.prototype.showToolTip = function(ztip) {
	/* display the tooltip */
	try {
		if (ztip != "") {
			dGet('wtw_itooltip').innerHTML = ztip;
			WTW.show('wtw_itooltip');
			WTW.setToolTipLocation();
		} else {
			WTW.hideToolTip();
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-showToolTip=" + ex.message);
	}
}

WTWJS.prototype.hideToolTip = function() {
	/* hide tool tip */
	try {
		WTW.hide('wtw_itooltip');
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-hideToolTip=" + ex.message);
	}
}

WTWJS.prototype.setToolTipLocation = function() {
	/* set the tool tip location, based on where the mouse is */
	try {
		if (dGet('wtw_itooltip').style.display != 'none') {
			var ziwidth = WTW.mouseX - (dGet('wtw_itooltip').offsetWidth/2);
			var ziheight = WTW.mouseY - dGet('wtw_itooltip').offsetHeight - 20;
			if (WTW.mouseX < WTW.sizeX / 5) {
				ziwidth += (dGet('wtw_itooltip').offsetWidth/2);
			} else if (WTW.mouseX > WTW.sizeX - (WTW.sizeX / 5)) {
				ziwidth -= (dGet('wtw_itooltip').offsetWidth/2);
			}
			if (WTW.mouseY < WTW.sizeY / 5) {
				ziheight += (dGet('wtw_itooltip').offsetHeight + 30);
			}
			dGet('wtw_itooltip').style.left = ziwidth + 'px';
			dGet('wtw_itooltip').style.top = ziheight + 'px';
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-setToolTipLocation=" + ex.message);
    }
}

WTWJS.prototype.activeMic = function() {
	/* Turn On Microphone */
	try {
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		
		navigator.getUserMedia(
			{ audio: true, video: false },
			WTW.onMicrophoneGranted,
			WTW.onMicrophoneDenied
		);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-activeMic=" + ex.message);
	}
}

WTWJS.prototype.onMicrophoneGranted = async function(zstream) {
	/* Microphone is on */
	try {
		if (WTW.audioSend == null) {
			/* Initialize audioSend object */
			if (WTW.audioSend == null) {
				WTW.audioSend = new AudioContext();
			}

			/* Adding an AudioWorkletProcessor from worker script with addModule method */
			await WTW.audioSend.audioWorklet.addModule('/content/plugins/wtw-3dinternet/scripts/voicechatsend.js')

			/* Creating a MediaStreamSource object and sending a MediaStream object granted by the user */
			WTW.audioSend.microphone = WTW.audioSend.createMediaStreamSource(zstream)

			/* Creating AudioWorkletNode sending context and name of processor registered in worker script */
			WTW.audioSend.audioNode = new AudioWorkletNode(WTW.audioSend, 'voicechatsend')
			
			let recordBuffer;
			
			/* Listing any message from AudioWorkletProcessor in its process method here where you can know the volume level */
			WTW.audioSend.audioNode.port.onmessage = zevent => {
				let zvolume = 0;
				let zsensibility = 5; /* Add any sensibility */
				if (zevent.data.volume) {
					zvolume = zevent.data.volume;
				}
				WTW.onMicVolumeChange((zvolume * 100) / zsensibility);
				
				if (WTW.micMute == false) {
					if (zevent.data.eventType === 'buffer') {
						recordBuffer = new Float32Array(zevent.data.buffer);
					}
					if (zevent.data.eventType === 'data' && WTW.micMute == false) {
//          	        socket.volatile.emit('voice', { id: socket.id, buffer: recordBuffer.slice(zevent.data.start, zevent.data.end).buffer });
						wtw3dinternet.streamAudio(recordBuffer.slice(zevent.data.start, zevent.data.end).buffer);
//						wtw3dinternet.streamAudio(zstream);
					}
				}
				
			}
			
			WTW.audioSend.microphone.connect(WTW.audioSend.audioNode);
			
			/* connect microphone to the AudioWorkletNode and output from WTW.audioSend */
			WTW.audioSend.microphone.connect(WTW.audioSend.audioNode).connect(WTW.audioSend.destination);
		}
		/* stop or resume the microphone from listening */
		if (WTW.micMute) {
			if (WTW.audioSend != null) {
				WTW.audioSend.suspend();
			}
			WTW.onMicVolumeChange(0);
		} else {
			if (WTW.audioSend != null) {
				WTW.audioSend.resume();
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-onMicrophoneGranted=" + ex.message);
	}
}

WTWJS.prototype.onMicrophoneDenied = function() {
	/* Microphone is off */
	try {
		dGet('wtw_audio').style.boxShadow = "-2px -2px 4px 0px #a7a7a73d, 2px 2px 4px 0px #0a0a0e5e";
		dGet('wtw_audio').style.fontSize = "25px";
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-onMicrophoneDenied=" + ex.message);
	}
}

WTWJS.prototype.onMicVolumeChange = function(zvolume) {
	/* test mic display colors */
	try {
		let zleds = [...document.getElementsByClassName('wtw-led')]
		let zrange = zleds.slice(0, Math.round(zvolume))
		var zledColor = [
			"#064dac",
			"#064dac",
			"#064dac",
			"#06ac5b",
			"#15ac06",
			"#4bac06",
			"#80ac06",
			"#acaa06",
			"#ac8b06",
			"#ac5506"
		];
		for (var i = 0; i < zleds.length; i++) {
			zleds[i].style.boxShadow = "-2px -2px 4px 0px #a7a7a73d, 2px 2px 4px 0px #0a0a0e5e";
			zleds[i].style.height = "22px";
		}

		for (var i = 0; i < zrange.length; i++) {
			zrange[i].style.boxShadow = `5px 2px 5px 0px #0a0a0e5e inset, -2px -2px 1px 0px #a7a7a73d inset, -2px -2px 30px 0px ${zledColor[i]} inset`;
			zrange[i].style.height = "25px";
		}
		WTW.pluginsOnMicVolumeChange(zvolume);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-onMicVolumeChange=" + ex.message);
	}
}
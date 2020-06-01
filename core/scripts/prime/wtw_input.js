/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are used by the event listeners to handle the input devices */

WTWJS.prototype.setTouchMove = function(e) {
	/* touch input - movement detected */
	var isclick = false;
	try {
		if (e == undefined) {
			e = window.event;
		}
		if (e.originalEvent != undefined) {
			if (e.originalEvent.touches != undefined) {
				WTW.touch = e.originalEvent.touches;
			}
			if (e.originalEvent.changedTouches != undefined) {
				WTW.touch = e.originalEvent.changedTouches;
			}
		}
		if (e.touches[0] != undefined) {
			WTW.touch = e.touches;
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
	return isclick;
}

WTWJS.prototype.touchDown = function(e) {
	/* touch input - touch detected */
	try {
		WTW.isMouseDown = 0;
		//scene.activeCamera = scene.activeCameras[0];
		if (e.originalEvent != undefined) {
			if (e.originalEvent.touches != undefined) {
				WTW.touch = e.originalEvent.touches;
			}
			if (e.originalEvent.changedTouches != undefined) {
				WTW.touch = e.originalEvent.changedTouches;
			}
		}
		if (e.touches[0] != undefined) {
			WTW.touch = e.touches;
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

WTWJS.prototype.touchUp = function(e) {
	/* touch input - touch release detected */
	try {
		if (e.touches[0] != undefined) {
			WTW.touch = e.touches;
		} else {
			WTW.touch = null;
		}
		WTW.setTouchMove(e);
		var setclick = false;
		var touchtimer = new Date();
		if (WTW.mouseX == WTW.mouseStartX && WTW.mouseY == WTW.mouseStartY) {
			if (WTW.touchLeftTimer != null) {
				if (touchtimer - WTW.touchLeftTimer < 240) {
					setclick = true;
				}
			}
			if (WTW.touchRightTimer != null) {
				if (touchtimer - WTW.touchRightTimer < 240) {
					setclick = true;
				}
			}
			if (setclick) {
				WTW.mouseClick(e);
			}
		}
		if (setclick == false) {
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
			WTW.hide('wtw_itouchleft');
			WTW.hide('wtw_itouchright');
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-touchUp=" + ex.message);
	}
}

WTWJS.prototype.touchMoving = function(e) {
	/* touch input - touch currently moving detected */
	try {
		if (WTW.canvasFocus == 1) {
			WTW.setTouchMove(e);
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

WTWJS.prototype.touchCancel = function(e) {
	/* touch input - touch canceled or released detected */
	try {
		WTW.setTouchMove(e);
		WTW.hide('wtw_itouchleft');
		WTW.hide('wtw_itouchright');
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-touchCancel=" + ex.message);
	}
}

WTWJS.prototype.keyDown = function(e) {
	/* keyboard input - key down detected */
	try {
		e = e || window.event;
		var ctrl = e.ctrlKey ? e.ctrlKey : ((e.keyCode === 17) ? true : false);
		WTW.shiftKey = e.shiftKey ? e.shiftKey : ((e.keyCode === 16) ? true : false);
		let zbrowser = WTW.getBrowser();
		let zcommandworksin = "chrome,edgechrome,safari,firefox,opera";
		if (e.keyCode === 122 && zcommandworksin.indexOf(zbrowser) > -1) {
			e.preventDefault();
			document.querySelector("#wtw_renderCanvas").requestFullscreen();
		}
		if (WTW.adminView == 1 && (ctrl || e.keyCode == 27)) {
			WTW.adminMenuQuickKeys(e.keyCode);
		} else if (WTW.canvasFocus == 1 && WTW.placeHolder == 0) {
			if (WTW.pause == 1) {
				WTW.startRender();
			}
			WTW.keyPressedAdd(e.keyCode);
			if (WTW.selectedMoldName != "") {
				if (WTW.selectedMoldName.indexOf("-") > -1) {
					if (WTW.selectedMoldName.indexOf("-scrollboxbodytext") > -1) {
						var scrollboxbodytext = scene.getMeshByID(WTW.selectedMoldName);
						if (scrollboxbodytext != null && scrollboxbodytext.WTW != undefined) {
							var webtext = scrollboxbodytext.WTW.webtext.webtext;
							scrollboxbodytext.WTW.webtext.webtext = WTW.processKey(scrollboxbodytext.WTW.webtext.webtext, e);
							var scrollpos = Number(scrollboxbodytext.WTW.webtext.scrollpos);
							WTW.scrollBoxRepaint(WTW.selectedMoldName.replace("-scrollboxbodytext",""), scrollpos);
						}
					}
				}
				e.preventDefault();
			} else {
				return true;
			}
			
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-keyDown=" + ex.message);
	}
}

WTWJS.prototype.keyUp = function(e) {
	/* keyboard input - key up detected */
	try {
		e = e || window.event;
		var ctrl = e.ctrlKey ? e.ctrlKey : ((e.keyCode === 17) ? true : false);
		if (e.keyCode === 16) {
			WTW.shiftKey = false;
		}
		if (WTW.adminView == 1 && (ctrl || e.keyCode == 27)) {
			
		} else if (WTW.canvasFocus == 1 && WTW.placeHolder == 0) {
			if (WTW.pause == 1) {
				WTW.startRender();
			}
			WTW.keyPressedRemove(e.keyCode);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-keyUp=" + ex.message);
    }
}

WTWJS.prototype.keyPressedAdd = function(keycode) {
	/* add a keycode or term to the WTW.keysPressed Array to be handled by the avatar movement */
	/* entered through code function and not necessarily tied to a keyboard */
	try {
		if (keycode != undefined) {
			keycode += "";
			if (WTW.canvasFocus == 1 || keycode.indexOf('onoption') > -1) {
				var found = false;
				if (WTW.keysPressed != null) {
					for (var i=0;i < WTW.keysPressed.length;i++) {
						if (WTW.keysPressed[i] != null) {
							if (WTW.keysPressed[i] == keycode) {
								found = true;
							}
						}
					}
				}
				if (found == false) {
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
				var found = false;
				if (WTW.keysPressed != null) {
					for (var i=WTW.keysPressed.length;i > -1;i--) {
						if (WTW.keysPressed[i] != null) {
							if (WTW.keysPressed[i] == replacekeycode) {
								WTW.keysPressed.splice(i, 1);
							}
							if (WTW.keysPressed[i] == keycode) {
								found = true;
							}
						} else {
							WTW.keysPressed.splice(i, 1);
						}
					}
				}
				if (found == false) {
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
			var onoption = -1;
			if (WTW.isNumeric(keycode) == false) {
				onoption = keycode.indexOf('onoption');
			}
			if (WTW.canvasFocus == 1 || onoption > -1) {
				if (WTW.keysPressed != null) {
					for (var i=WTW.keysPressed.length;i > -1;i--) {
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

WTWJS.prototype.mouseClick = function(e) {
	/* mouse input - single click detected */
	try {
		e = e || window.event;
		if (WTW.canvasFocus == 1) {
			if (WTW.pause == 1) {
				WTW.startRender();
			}
			if (e.clientX != undefined) {
				WTW.mouseStartX = e.clientX; 
				WTW.mouseStartY = e.clientY;
			}
			if (WTW.adminView == 1) {
				WTW.mouseClickAdmin(e);
			} 
			if (WTW.mouseStartX == WTW.mouseX && WTW.mouseStartY == WTW.mouseY) {
				var pickedResult = scene.pick(WTW.mouseX, WTW.mouseY);
				var zpickedname = "";
				if (pickedResult.pickedMesh == null) {
					if (WTW.currentID != "") {
						pickedResult.pickedMesh = scene.getMeshByID(WTW.currentID);
					}
					zpickedname = WTW.currentID;
				} else {
					zpickedname = pickedResult.pickedMesh.name;
				}
				if (zpickedname != '') {
					var mesh = scene.getMeshByID(zpickedname);
					if (zpickedname.indexOf("-") > -1) {
						var namepart = zpickedname.split('-');
						WTW.checkMoldEvent('onclick', zpickedname);
						WTW.pluginsOnClick(zpickedname);
						if (zpickedname.indexOf("-image") > -1) {
							WTW.checkImageClick(zpickedname);
						} else {
							WTW.checkJSFunction(zpickedname);
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

WTWJS.prototype.mouseRight = function(e) {
	/* mouse input - single right click detected */
	try {
		e = e || window.event;
		if (WTW.canvasFocus == 1) {
			if (WTW.pause == 1) {
				WTW.startRender();
			}
			if (WTW.adminView == 1) {
				WTW.mouseClickRightAdmin(e);
				return false;
			} else {
				return true;
			}
		} else {
			let zclasses = "";
			if (e.target.attributes.class != undefined) {
				zclasses = e.target.attributes.class.value;
			}
			let allowright = false;
			if (WTW.isTextBox(e.target) && e.target.disabled == false) {
				allowright = true;
			} else if (zclasses != "") {
				if (zclasses.indexOf(' ') > -1) {
					allowright = zclasses.toLowerCase().split(" ").includes("allow-contextmenu");
				} else if (zclasses.toLowerCase() == "allow-contextmenu") {
					allowright = true;
				}
			}
			if (WTW.adminView != 1 && allowright == false) {
				e.preventDefault();
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-mouseRight=" + ex.message);
    }
}

WTWJS.prototype.mouseDown = function(e) {
	/* mouse input - left mouse button held down detected */
	try {
		WTW.isMouseDown = 1;
		e = e || window.event;
		if (WTW.canvasFocus == 1) {
			if (WTW.pause == 1) {
				WTW.startRender();
			}
			WTW.mouseStartX = e.clientX; 
			WTW.mouseStartY = e.clientY;
			WTW.mouseMoveX = e.clientX; 
			WTW.mouseMoveY = e.clientY;
			if (WTW.adminView == 1) {
				WTW.mouseDownAdmin(e);
			}
			if (scene != undefined && WTW.mouseStartX == WTW.mouseX && WTW.mouseStartY == WTW.mouseY) {
				var pickedResult = scene.pick(WTW.mouseX, WTW.mouseY);
				if (pickedResult.pickedMesh == null) {
					pickedResult.pickedMesh = scene.getMeshByID(WTW.currentID);
				}
				if (pickedResult.pickedMesh != null) {
					if (pickedResult.pickedMesh.name.indexOf("scrollboxup") > -1) {
						WTW.scrollBoxMove(pickedResult.pickedMesh.name, 25);
					} else if (pickedResult.pickedMesh.name.indexOf("scrollboxdown") > -1) {
						WTW.scrollBoxMove(pickedResult.pickedMesh.name, -25);
					} else if (pickedResult.pickedMesh.name.indexOf("-scrollboxtab") > -1) {
						WTW.dragID = pickedResult.pickedMesh.name;
					}
				}
			}
		}
		return true;
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-mouseDown=" + ex.message);
    }
}

WTWJS.prototype.mouseUp = function(e) {
	/* mouse input - left mouse button up or release detected */
	try {
		WTW.isMouseDown = 0;
		e = e || window.event;
		if (WTW.canvasFocus == 1) {
			if (WTW.mouseTimer != null) {
				window.clearInterval(WTW.mouseTimer);
				WTW.mouseTimer = null;
			}
			if (WTW.pause == 1) {
				WTW.startRender();
			}
			if (WTW.adminView == 1) {
				WTW.mouseUpAdmin(e);
			}
			if (WTW.drive != null) {
				WTW.drive.currentturn = 0;
			}
			if (WTW.dragID.indexOf("-scrollboxtab") > -1) {
				WTW.lastID = WTW.dragID;
				WTW.dragID = WTW.dragID.replace("-scrollboxtab","");
				WTW.resetScrollBox(WTW.dragID);
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
		WTW.hide('wtw_itouchleft');
		WTW.hide('wtw_itouchright');
		return true;
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-mouseUp=" + ex.message);
    }
}

WTWJS.prototype.mouseMove = function(e) {
	/* mouse input - mouse movement detected */
	try {
		e = e || window.event;
		if (WTW.canvasFocus == 1) {
			if (WTW.pause == 1) {
				WTW.startRender();
			}
			if (e.clientX != undefined) {
				WTW.mouseX = e.clientX; 
				WTW.mouseY = e.clientY;
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
				if (WTW.drive == null) {
					if (WTW.dragID.indexOf("-") > -1) {
						if (WTW.dragID.indexOf("-scrollboxtab") > -1) {
							var molds = WTW.buildingMolds;
							var moldind = -1;
							var namepart = WTW.dragID.split('-');
							var pheight = 0;
							var scrollmove = 0;
							if (namepart[0] != null) {
								if (namepart[0].indexOf("communitymolds") > -1) {
									molds = WTW.communitiesMolds;
								}
							}
							if (namepart[1] != null) {
								if (WTW.isNumeric(namepart[1])) {
									moldind = Number(namepart[1]);
								}
							}
							if (molds[moldind] != null) {
								if (molds[moldind].webtext.fullheight != undefined) {
									pheight = Number(molds[moldind].webtext.fullheight);
								}			
							}					
							if (pheight > 512) {
								scrollmove = (WTW.mouseStartY - WTW.mouseY) * (pheight / 512);
							} else {
								scrollmove = (WTW.mouseStartY - WTW.mouseY);
							}
							WTW.scrollBoxMove(WTW.dragID, scrollmove);
							WTW.mouseStartY = WTW.mouseY;
							e.preventDefault();
						}
					}
				}
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-mouseMove=" + ex.message);
    }
}

WTWJS.prototype.mouseScroll1 = function(e) {
	/* mouse input - mouse scrollbar movement detected (type1) */
	try {
		e = e || window.event;
		if (WTW.canvasFocus == 1) {
			var rolled = e.wheelDelta; 
			WTW.mouseScroll(rolled);
			return (false);
		}
	} catch(ex) {
		WTW.log("core-scripts-prime-wtw_input.js-mouseScroll1=" + ex.message);
	}
}

WTWJS.prototype.mouseScroll2 = function(e) {
	/* mouse input - mouse scrollbar movement detected (type2) */
	try {
		if (WTW.canvasFocus == 1) {
			var rolled = e.wheelDelta>0||e.detail<0?120:-120;
			WTW.mouseScroll(rolled);
			return (false);
		}
	} catch(ex) {
		WTW.log("core-scripts-prime-wtw_input.js-mouseScroll2=" + ex.message);
	}
}

WTWJS.prototype.mouseScroll = function(rolled) {
	/* mouse input - process mouse scrollbar movement */
    try {
		if (WTW.canvasFocus == 1 && WTW.placeHolder == 0) {
			if (WTW.pause == 1) {
				WTW.startRender();
			}
			if (WTW.cameraFocus == 0) {
				rolled = rolled / 120;
				var DirX = Math.sin(WTW.camera.rotation.y);
				var DirY = -Math.sin(WTW.camera.rotation.x);
				var DirZ = Math.cos(WTW.camera.rotation.y);
				WTW.camera.cameraDirection = WTW.camera.cameraDirection.add(new BABYLON.Vector3(rolled*DirX, rolled*DirY, rolled*DirZ));
			} else {
				if (rolled > 0) {
					rolled = 1.5;
					var nowdate = new Date();
					if (WTW.isMouseDown == 1) {
						if (WTW.scrollTimer != null) {
							if ((nowdate - WTW.scrollTimer) < 200) {
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
					rolled = -1.5;
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

WTWJS.prototype.mouseOverMold = function(mold) {
	/* mouse related - execute when a mouse cursor hovers a mold */
	/* mold has to have the event loaded using: WTW.registerMouseOver(mold); */
	try {
		if (WTW.canvasFocus == 1) {
			document.body.style.cursor = "default";
			if (mold.meshUnderPointer != null) {
				WTW.lastID = WTW.currentID;
				WTW.currentID = mold.meshUnderPointer.name;
				if (mold.meshUnderPointer.isPickable) {
					document.body.style.cursor = "pointer";
				}
				WTW.checkHovers(mold);
			}
		}
	} catch(ex) {
		WTW.log("core-scripts-prime-wtw_input.js-mouseOverMold=" + ex.message);
	}
}

WTWJS.prototype.mouseOutMold = function(mold) {
	/* mouse related - execute when a mouse cursor stops hovering a mold */
	/* mold has to have the event loaded using: WTW.registerMouseOver(mold); */
	try {
		if (WTW.canvasFocus == 1) {
			WTW.hide('wtw_itooltip');
			if (WTW.adminView == 1) {
				if (dGet('wtw_bfocus').title == "Focus Highlight is On" || WTW.highlightLayer != null) {
					WTW.unhilightMold(WTW.currentID);
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

WTWJS.prototype.onMessage = function (e) {
	/* message listener is enabled and this function can receive predefined messages from an iframe within the WalkTheWeb instance */
	try {
		e = e || window.event;
		let zsafe = false;
		// Check sender origin to be trusted
		if (e.origin == "https://secure.walktheweb.com") {
			zsafe = true;
		} else if (e.origin == "https://3d.walktheweb.com") {
			zsafe = true;
		} else if (e.origin == "https://3dnet.walktheweb.com") {
			zsafe = true;
		} else if (e.origin == "https://3d.http3d.net") {
			zsafe = true;
		}
		if (zsafe) {
			let zfunctionname = '';
			if (e.data.func != undefined) {
				zfunctionname = e.data.func;
			}
			let zparameters = null;
			if (e.data.parameters != undefined) {
				zparameters = e.data.parameters;
			}
			let zmessage = null;
			if (e.data.message != undefined) {
				zmessage = e.data.message;
			}
			WTW.executeFunctionByName(zfunctionname, window, zparameters);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-onMessage=" + ex.message);
	}
}

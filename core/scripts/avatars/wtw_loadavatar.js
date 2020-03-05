WTWJS.prototype.loadSetupMode = function(reload) {
	try {
		if (reload == undefined) {
			reload == false;
		}
		var setupparent = scene.getMeshByID("setupparent-0");
		if (setupparent != null) {
			var objectfolder = "/content/system/babylon/selectavatar/";
			var objectfile = "selectavataranonymous.babylon";
			var selectnotetime = 1000;
			if (dGet("wtw_tuserid").value == '') {
				WTW.loadAvatar(1, setupparent, -5, 20);
				WTW.loadAvatar(2, setupparent, 5, 20);
				var tlogin = WTW.getCookie("rememberlogin");
				if (tlogin != '') {
					dGet('wtw_tlogin').value = tlogin;
					dGet('wtw_trememberlogin').checked = true;
				} else {
					dGet('wtw_trememberlogin').checked = false;
				}
			} else {
				objectfolder = "/content/system/babylon/selectavatar/";
				objectfile = "selectavatarloggedin.babylon";
				WTW.loadAvatar(1, setupparent, -17, 28);
				WTW.loadAvatar(2, setupparent, 17, 28);
				WTW.loadAvatar(3, setupparent, 4, 32);
				WTW.loadAvatar(4, setupparent, 5, 24);
				WTW.loadAvatar(5, setupparent, 11, 24);
				WTW.loadAvatar(6, setupparent, 9, 32);
				WTW.loadAvatar(7, setupparent, -4, 32);
				WTW.loadAvatar(8, setupparent, -5, 24);
				WTW.loadAvatar(9, setupparent, -11, 24);
				WTW.loadAvatar(10, setupparent, -9, 32);
				selectnotetime = 3000;
			}

			var moldname = "setupavataranonymous-0";
			var molddef = WTW.newMold();
			var objectanimations = [];
			WTW.disposeClean(moldname);
			objectanimations[0] = WTW.newObjectAnimation();
			objectanimations[0].animationname = 'setupavataronload';
			objectanimations[0].moldevent = 'onload';
			objectanimations[0].moldnamepart = 'WTWSign';
			objectanimations[0].startframe = 1010;
			objectanimations[0].endframe = 2010;
			objectanimations[0].animationloop = true;
			objectanimations[0].speedratio = 1.00;
			objectanimations[0].additionalscript = '';
			objectanimations[0].additionalparameters = '';
			molddef.object.folder = objectfolder;
			molddef.object.file = objectfile;
			molddef.parentname = "setupparent-0";
			molddef.object.objectanimations = objectanimations;
			window.setTimeout(function(){
				var selectavataranonymous = WTW.addMoldBabylonFile(moldname, molddef, 1, 1, 1);
				selectavataranonymous.parent = setupparent;
				selectavataranonymous.position.z = 12;
				selectavataranonymous.position.y = 1;
			},selectnotetime);
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-loadSetupMode=" + ex.message);
    }
}

WTWJS.prototype.nextSetupMode = function(zavatarname) {
	try {
		if (zavatarname.indexOf("selectavatar") > -1) {
			if (WTW.myAvatar != null) {
				WTW.disposeClean(WTW.myAvatar.name);
			}
			var znameparts = zavatarname.split('-');
			var zavatarind = Number(znameparts[1]);
			if (dGet('wtw_tuserid').value == '') {
				WTW.setCookie("avatarind", zavatarind, 365);
			}
			dGet('wtw_tavatarind').value = zavatarind;
			WTW.getMyAvatar(zavatarind);
//			WTW.loadCameraSettings();
			WTW.currentID = "";
			WTW.setCameraOnAvatar();
			var zmyavatarid = dGet('wtw_tmyavatarid').value;
			if (dGet('wtw_tuserid').value == '') {
				zmyavatarid = dGet('wtw_tmyavataridanon').value;
			}
			var zobjectfolder = "";
			var zobjectfile = "";
			var scalingx = 1;
			var scalingy = 1;
			var scalingz = 1;
			if (WTW.myAvatar.WTW != null) {
				if (WTW.myAvatar.WTW.object.folder != undefined) {
					zobjectfolder = WTW.myAvatar.WTW.object.folder;
				}
				if (WTW.myAvatar.WTW.object.file != undefined) {
					zobjectfile = WTW.myAvatar.WTW.object.file;
				}
				if (WTW.myAvatar.WTW.scaling.x != undefined) {
					scalingx = WTW.myAvatar.WTW.scaling.x;
				}
				if (WTW.myAvatar.WTW.scaling.y != undefined) {
					scalingy = WTW.myAvatar.WTW.scaling.y;
				}
				if (WTW.myAvatar.WTW.scaling.z != undefined) {
					scalingz = WTW.myAvatar.WTW.scaling.z;
				}
			}
			var zrequest = {
				'avatarid': zmyavatarid,
				'instanceid': dGet("wtw_tinstanceid").value,
				'userip': dGet("wtw_tuserip").value,
				'avatarind': dGet('wtw_tavatarind').value,
				'scalingx': scalingx,
				'scalingy': scalingy,
				'scalingz': scalingz,
				'objectfolder': zobjectfolder,
				'objectfile': zobjectfile,
				'function':'saveavatar'
			};
			WTW.postJSON("/core/handlers/avatars.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					if (zresponse.avatarid != undefined) {
						zmyavatarid = zresponse.avatarid;
						WTW.setAvatarID(zmyavatarid);
					}
				}
			);
			WTW.closeSelectAvatar();
			WTW.hide('wtw_menuavatarchangediv');
			WTW.showSettingsMenu('wtw_menuavatar');
		} else if (zavatarname.indexOf("myavatar-" + dGet("wtw_tinstanceid").value) > -1) {
			if (dGet('wtw_menuavatarcolordiv').style.display != 'none') {
				WTW.editAvatarPart(zavatarname);
			}
			var zselavatar = scene.getMeshByID("selectavatar-1-preview");
			if (zselavatar != null) {
				WTW.closeSelectAvatar();
				WTW.hide('wtw_menuavatarchangediv');
				WTW.showSettingsMenu('wtw_menuavatar');
			}
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-nextSetupMode=" + ex.message);
    }
}

WTWJS.prototype.setAvatarID = function(zavatarid) {
	try {
		if (dGet('wtw_tuserid').value == '') {
			dGet('wtw_tmyavataridanon').value = zavatarid;
		} else {
			dGet('wtw_tmyavatarid').value = zavatarid;
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-setAvatarID=" + ex.message);
    }
}

WTWJS.prototype.getSessionAvatar = function() {
	try {
		var zrequest = {
			'instanceid': dGet("wtw_tinstanceid").value,
			'function':'getsession'
		};
		WTW.postJSON("/core/handlers/avatars.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.loadUserSession(JSON.parse(zresponse.user));
			}
		);
    } catch (ex) {
		WTW.log("avatars-loadavatar-getSessionAvatar=" + ex.message);
    }
}

WTWJS.prototype.loadUserSession = function(zresponse) {
	try {
		if (zresponse != null) {
			if (zresponse.avatarind != undefined) {
				if (dGet("wtw_tuserid").value == '') {
					dGet('wtw_tmyavataridanon').value = zresponse.myavatarid;
					WTW.setCookie("myavataridanon", zresponse.myavatarid, 365);
				} else {
					dGet('wtw_tmyavatarid').value = zresponse.myavatarid;
					WTW.setCookie("myavatarid", zresponse.myavatarid, 365);
				}
				dGet('wtw_tavatarind').value = zresponse.avatarind;
				dGet('wtw_tuploadpathid').value = zresponse.uploadpathid;
				dGet('wtw_tuseremail').value = zresponse.email;
				if (zresponse.username != '' && zresponse.username != undefined && zresponse.username != 'undefined') {
					dGet('wtw_menuusername').innerHTML = zresponse.username;
				}
				if (zresponse.displayname == "" || zresponse.displayname == undefined || zresponse.displayname == 'undefined') {
					zresponse.displayname = zresponse.username;
				}
				if (zresponse.displayname == "" || zresponse.displayname == undefined || zresponse.displayname == 'undefined') {
					zresponse.displayname = "Anonymous";
				}
				dGet('wtw_mainmenudisplayname').innerHTML = zresponse.displayname;
				dGet('wtw_menudisplayname').innerHTML = zresponse.displayname;
				dGet('wtw_tuserimageurl').value = zresponse.userimageurl;
				if (zresponse.userimageurl != '' && zresponse.userimageurl != undefined && zresponse.userimageurl != 'undefined') {	
					dGet('wtw_profileimagelg').src = zresponse.userimageurl;
					dGet('wtw_profileimagesm').src = zresponse.userimageurl;
				}
				WTW.show('wtw_mainadminmode');
				WTW.hide('wtw_menulogin');
				WTW.hide('wtw_menupasswordrecovery');
				WTW.hide('wtw_menuregister');
				WTW.show('wtw_menuloggedin');
				WTW.hide('wtw_loginnote');
			}
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-loadUserSession=" + ex.message);
    }
}

WTWJS.prototype.getSavedAvatar = function(zreload) {
	try {
		if (zreload == undefined) {
			zreload = false;
		}
		WTW.getJSON("/connect/avatars.php?i=" + btoa(dGet('wtw_tinstanceid').value) + "&d=" + btoa(dGet('wtw_tuserid').value) + "&p=" + btoa(dGet('wtw_tuserip').value), 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zavatarind = -1;
				var zanonymous = "1";
				if (zresponse != null) {
					if (zresponse.avatar != null) {
						if (zresponse.avatar.avatarind != undefined) {
							if (WTW.isNumeric(zresponse.avatar.avatarind)) {
								zavatarind = Number(zresponse.avatar.avatarind);
							}
						}
						if (zresponse.avatar.anonymous != undefined) {
							zanonymous = zresponse.avatar.anonymous;
						}
						if (dGet('wtw_tuserid').value == '') {
							WTW.setCookie("myavatarid", zresponse.avatar.useravatarid, 365);
							dGet("wtw_tmyavatarid").value = zresponse.avatar.useravatarid;
						} else {
							WTW.setCookie("myavataridanon", zresponse.avatar.useravatarid, 365);
							dGet("wtw_tmyavataridanon").value = zresponse.avatar.useravatarid;
						}
					}
				}
				var zavatar = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value);
				if (zavatarind > -1 && zanonymous == "1" && dGet('wtw_tuserid').value != '') {
					/* load anonymous avatar - logged in and already has anonymous avatar, but no logged in avatar */
					dGet('wtw_tavatarind').value = zavatarind;
					WTW.setCameraOnAvatar();
					WTW.switchAvatarMenu(4);
				} else if (zavatar != null && zavatarind > -1 && zanonymous == "0" && dGet('wtw_tuserid').value != '') {
					/* anonymouse avatar already loaded - user logged in and this will switch from anonymous avatar to logged in avatar */ 
					dGet('wtw_tavatarind').value = zavatarind;
					//WTW.setCameraOnAvatar();
					WTW.disposeClean("myavatar-" + dGet("wtw_tinstanceid").value);
					WTW.loadAvatarFromDB(zresponse.avatar, zreload);
//					WTW.loadCameraSettings();
				} else if (zavatarind == -1) {
					/* needs an avatar - user does not have any avatars yet */
					dGet('wtw_tavatarind').value = '';
					WTW.setCameraOnAvatar();
					WTW.loadSetupMode(); // load all avatars to choose
				} else {
					/* load existing avatar, has anonymous avatar for anonymous user OR has logged in avatar for logged in user */
					dGet('wtw_tavatarind').value = zavatarind;
					if (zreload == false) {
//						WTW.loadCameraSettings();
						WTW.closeSelectAvatar();
						WTW.closeSetupMode(false);
					} else {
						/* may need to delete current MyAvatar... */
					}
					WTW.loadAvatarFromDB(zresponse.avatar, zreload);
					if (zreload == false) {
						WTW.switchCamera(1);
						WTW.pluginsSavedAvatarRetrieved();
					}
				}
			}
		);		
    } catch (ex) {
		WTW.log("avatars-loadavatar-getSavedAvatar=" + ex.message);
    }
}

WTWJS.prototype.transferMainParent = function(zparentmold) {
	try {
		var zsetupparent = scene.getMeshByID("setupparent-0");
		if (zsetupparent != null && zparentmold != null) {
			var zchildmolds = zsetupparent.getChildren();
			if (zchildmolds != null) {
				for (var i=0;i<zchildmolds.length;i++) {
					if (zchildmolds[i] != null) {
						zchildmolds[i].parent = zparentmold;
					}
				}
			}
			if (WTW.myAvatar != null) {
				WTW.myAvatar.parent = WTW.getMainParent();
				var zrand1 = ((Math.floor(Math.random() * 200) + 1)/10) - 10;
				var zrand2 = ((Math.floor(Math.random() * 200) + 1)/10) - 10;
				WTW.myAvatar.position.x = WTW.init.startPositionX + zrand1;
				WTW.myAvatar.position.y = WTW.init.startPositionY;
				WTW.myAvatar.position.z = WTW.init.startPositionZ + zrand2;
				WTW.myAvatar.rotation.y = WTW.getRadians(WTW.init.startRotationY);
			}
		}
		WTW.addDisposeMoldToQueue("setupparentcamera-0");
		WTW.addDisposeMoldToQueue("setupparent-0");
    } catch (ex) {
		WTW.log("avatars-loadavatar-transferMainParent=" + ex.message);
    }
}

WTWJS.prototype.toggleAvatarColor = function() {
	try {
		if (dGet('wtw_menuavatarcolordiv') != null) {
			if (dGet('wtw_menuavatarcolordiv').style.visibility == 'visible') {
				WTW.hide('wtw_menuavatarcolordiv');
				WTW.saveAvatarColor(dGet('wtw_tmoldname').value);
				if (WTW.guiAdminColors != null) {
					WTW.guiAdminColors.dispose();
					WTW.guiAdminColors = null;
				}
			} else {
				WTW.show('wtw_menuavatarcolordiv');
				WTW.editAvatarColors();
			}
		}
	} catch (ex) { 
		WTW.log("common-toggle=" + ex.message);
	}
}

WTWJS.prototype.saveAvatarColor = function(zmoldname) {
	try {
		if (zmoldname.indexOf("myavatar-" + dGet("wtw_tinstanceid").value) > -1) {
			var zavatarpart = zmoldname.replace("myavatar-" + dGet("wtw_tinstanceid").value + "-","");
			/* function for after iframe loads */
			var zmyavatarid = dGet('wtw_tmyavatarid').value;
			if (dGet('wtw_tuserid').value == '') {
				zmyavatarid = dGet('wtw_tmyavataridanon').value;
			}
			var zrequest = {
				'avatarid': zmyavatarid,
				'instanceid': dGet("wtw_tinstanceid").value,
				'avatarpart': zavatarpart,
				'emissivecolorr': dGet("wtw_temissivecolorr").value,
				'emissivecolorg': dGet("wtw_temissivecolorg").value,
				'emissivecolorb': dGet("wtw_temissivecolorb").value,
				'function':'saveavatarcolor'
			};
			WTW.postJSON("/core/handlers/avatars.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
				}
			);
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-saveAvatarColor=" + ex.message);
    }
}

WTWJS.prototype.closeSetupMode = function(zsave) {
	try {
		if (zsave == undefined) {
			zsave = true;
		}
		WTW.saveAvatarColor(dGet('wtw_tmoldname').value);
		if (WTW.guiAdminColors != null) {
			WTW.guiAdminColors.dispose();
			WTW.guiAdminColors = null;
		}
		WTW.hide('wtw_menuavatar');
		dGet('wtw_tmoldname').value = '';
		WTW.closeSelectAvatar();
		WTW.setupMode = 0;
		WTW.closeMenus();
		dGet('wtw_tshowhelponstart').checked = true;
		var zmovecontrols = WTW.getCookie("movecontrols");
		if (zmovecontrols == null) {
			zmovecontrols = '0';
		}
		if (zmovecontrols == '1') {
			dGet('wtw_tshowhelponstart').checked = false;
		} else if (dGet('wtw_tuserid').value == '') {
			WTW.showSettingsMenu('wtw_menucontrols');
		}
		if (WTW.init.loaded == 0) {
			WTW.continueLoadSequence();
			WTW.pluginsSetupModeClosed();
		}
		if (zsave) {
			WTW.switchCamera(1);
		}
	} catch (ex) {
		WTW.log("avatars-loadavatar-closeSetupMode=" + ex.message);
    }
}

WTWJS.prototype.setCameraOnAvatar = function() {
	try {
		WTW.setupMode = 1;
		WTW.hide('wtw_menuprofile');
		var zavatar = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value);
		var zavatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
		var zstep = 25;
		WTW.cameraYOffset = 6;
		if (WTW.cameraFollow == null) {
			WTW.initFollowCamera(1);
		}
		if (zavatar != null && zavatarcamera != null) {
			WTW.cameraFollow.lockedTarget = null;
			WTW.cameraFollow.lockedTarget = zavatarcamera;
			//WTW.cameraFollow.position = new BABYLON.Vector3(zavatar.position.x + parseFloat(Math.sin(zavatar.rotation.y)) * step, zavatar.position.y + avatarcamera.position.y + WTW.cameraYOffset, zavatar.position.z + parseFloat(Math.cos(zavatar.rotation.y)) * step);
			//WTW.cameraFollow.position = new BABYLON.Vector3(-zstep, 14, 0);
		} else {
			var zsetupparent = scene.getMeshByID("setupparent-0");
			if (zsetupparent != null) {			
				var setupparentcamera = scene.getMeshByID("setupparentcamera-0");
				if (setupparentcamera == null) {
					setupparentcamera = WTW.addMoldBox("setupparentcamera-0", 1, 1, 1);
					var transparentmat = new BABYLON.StandardMaterial("matsetupparentcamera-0", scene);
					transparentmat.alpha = 0;
					setupparentcamera.material = transparentmat;
					setupparentcamera.position.y = 8;
					setupparentcamera.parent = zsetupparent;
				}
				WTW.cameraFollow.lockedTarget = null;
				WTW.cameraFollow.lockedTarget = setupparentcamera;
			}
			zstep = 5;
			WTW.cameraYOffset = 0;
		}
		WTW.cameraFollow.radius = zstep; // how far from the object to follow
		WTW.cameraFollow.heightOffset = WTW.cameraYOffset; // how high above the object to place the camera
		WTW.cameraFollow.rotationOffset = 180; // the viewing angle		
		WTW.cameraFollow.yOffset = 0;
		WTW.cameraFollow.inertia = .10;
		WTW.cameraFollow.cameraAcceleration = 0.5;
		WTW.cameraFollow.maxCameraSpeed = 1000;
		WTW.cameraFollow.viewport = new BABYLON.Viewport(0, 0, 1, 1);
		scene.activeCameras[0] = WTW.cameraFollow;
		scene.cameraToUseForPointers = scene.activeCameras[0];
    } catch (ex) {
		WTW.log("avatars-loadavatar-setCameraOnAvatar=" + ex.message);
    }
}

WTWJS.prototype.getAvatarAnimationsAll = function() {
	try {
		var zmyavatarid = dGet('wtw_tmyavatarid').value;
		if (dGet('wtw_tuserid').value == '') {
			zmyavatarid = dGet('wtw_tmyavataridanon').value;
		}
		var zrequest = {
			'avatarid': zmyavatarid,
			'instanceid': dGet("wtw_tinstanceid").value,
			'function':'getavataranimationsall'
		};
		WTW.postJSON("/core/handlers/avatars.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.loadAvatarAnimationsAll(JSON.parse(zresponse.avataranimations));
			}
		);
    } catch (ex) {
		WTW.log("avatars-loadavatar-getAvatarAnimationsAll=" + ex.message);
    }
}

WTWJS.prototype.loadAvatarAnimationsAll = function(zresponse) {
	try {
		var zoptionind = -1;
		var zeditavataranimations = "<ul style='padding:0px;'>";
		var zoptionalanimations = [];
		if (zresponse != null) {
			var zlastanimationname = "";
			var zcurrentinput = "";
			var zsetselect = false;
			for (var i=0;i<zresponse.length;i++) {
				if (zresponse[i] != null) {
					var zfound = false;
					var zanimationname = zresponse[i].animationname;
					switch (zresponse[i].animationname) {
						case "onwait":
							zanimationname = "Standing Idle";
							zfound = true;
							break;
						case "onwalk":
							zanimationname = "Walk";
							zfound = true;
							break;
						case "onwalkbackwards":
							zanimationname = "Walk Backwards";
							zfound = true;
							break;
						case "onturnleft":
							zanimationname = "Turn Left";
							zfound = true;
							break;
						case "onturnright":
							zanimationname = "Turn Right";
							zfound = true;
							break;
						case "onstrafeleft":
							zanimationname = "Strafe Left";
							zfound = true;
							break;
						case "onstraferight":
							zanimationname = "Strafe Right";
							zfound = true;
							break;
						case "onrun":
							zanimationname = "Run";
							zfound = true;
							break;
						case "onrunbackwards":
							zanimationname = "Run Backwards";
							zfound = true;
							break;
						case "onrunturnleft":
							zanimationname = "Run Turn Left";
							zfound = true;
							break;
						case "onrunturnright":
							zanimationname = "Run Turn Right";
							zfound = true;
							break;
						case "onrunstrafeleft":
							zanimationname = "Run Strafe Left";
							zfound = true;
							break;
						case "onrunstraferight":
							zanimationname = "Run Strafe Right";
							zfound = true;
							break;
						case "onoption":
							zanimationname = "Optional Gestures ++";
							zfound = true;
							break;
					}
					if (zfound) {
						if (zlastanimationname != zanimationname) {
							zsetselect = false;
							if (zlastanimationname != "") {
								zeditavataranimations += "</select></div></li>";
							}
							if (zresponse[i].animationname == "onoption") {
								zoptionind = i;
							}
							zcurrentinput = "wtw_tselectavataranimation-" + i + "-value";
							zeditavataranimations += "<li id='wtw_animation-" + zresponse[i].animationname + "' class='wtw-avatarli' onclick=\"WTW.editAvatarAnimation('" + zresponse[i].animationname + "'," + i + "," + zresponse.length + ");\">";
							zeditavataranimations += "<div class='wtw-inlineindent'>" + zanimationname + "</div></li>";
							zeditavataranimations += "<li id='wtw_animationdiv-" + i + "' class='wtw-avatarli' style='display:none;visibility:hidden;'>";
							if (zresponse[i].animationname == "onoption") {
								zeditavataranimations += "<div>";
							} else {
								zeditavataranimations += "<div class='wtw-inlineindent2'>";
							}
							zeditavataranimations += "<input id='" + zcurrentinput + "' type='hidden' value='' />";
							
							if (zresponse[i].animationname == "onoption") {
								zeditavataranimations += "<select id='wtw_tselectavataranimation-" + i + "' onchange=\"WTW.changeAvatarAnimation(this);\" style='display:none;visibility:hidden;' >";
								zeditavataranimations += "<option value=''> -- Select Animation -- </option>";
							} else {
								zeditavataranimations += "<select id='wtw_tselectavataranimation-" + i + "' onchange=\"WTW.changeAvatarAnimation(this);\" >";
							}
							if (zoptionind > 68) {
								WTW.hide('wtw_animation-add');
							}
							zlastanimationname = zanimationname;
						}
						var zselected = "";
						var zvalue = zresponse[i].useravataranimationid + "|" + zresponse[i].avataranimationid + "|" + zresponse[i].speedratio + "|" + zresponse[i].animationname + "|" + zresponse[i].startframe + "|" + zresponse[i].endframe + "|" + zresponse[i].objectfolder + "|" + zresponse[i].objectfile + "|" + zresponse[i].animationfriendlyname + "|" + zresponse[i].loadpriority + "|" + zresponse[i].animationicon;
						if (zresponse[i].useravataranimationid != null && zresponse[i].useravataranimationid != '') {
							if (zsetselect == false && zresponse[i].animationname != "onoption") {
								zselected = "selected='true'";
								if (dGet(zcurrentinput) != null) {
									dGet(zcurrentinput).value = zresponse[i].useravataranimationid;
								}
								zsetselect = true;
							} else {
								zoptionalanimations[zoptionalanimations.length] = zvalue;
							}
						}
						zeditavataranimations += "<option " + zselected + " value='" + zvalue + "'>" + zresponse[i].animationfriendlyname + "</option>";
					}
				}
			}
		}
		zeditavataranimations += "</select></div><div id='wtw_addoptionalanimations'></div><div id='wtw_animation-add' class='wtw-chatbuttonaccept' onclick=\"WTW.addAvatarAnimationRow(" + zoptionind + ",'');\" style='text-align:center;margin-left:20px;'>+ Add Animation</div>";
		zeditavataranimations += "<div style='font-size:.8em;text-align:center;'><img id='wtw_helpanimicon' src='/content/system/images/menugestures32.png' alt='Animations' title='Animations' /> Click on toolbar below to execute.</div></li></ul>";
		dGet("wtw_editavataranimations").innerHTML = zeditavataranimations;
		if (zoptionalanimations.length > 0) {
			for (var i=0;i<zoptionalanimations.length;i++) {
				if (zoptionalanimations[i] != null) {
					if (zoptionalanimations[i] != '') {
						WTW.addAvatarAnimationRow(zoptionind, zoptionalanimations[i]);
					}
				}
			}
		}
		WTW.showSettingsMenu('wtw_menuavatar');
    } catch (ex) {
		WTW.log("avatars-loadavatar-loadAvatarAnimationsAll=" + ex.message);
    }
}

WTWJS.prototype.addAvatarAnimationRow = function(zoptionind, zselectedvalue) {
	try {
		var zuseravataranimationid = "";
		var zoptional = dGet('wtw_tselectavataranimation-' + zoptionind);
		var znewoptional = zoptional.cloneNode();
		var zbasename = 'wtw_tselectavataranimation-';
		var i = zoptionind;
		var znewname = zbasename + i;
		while (dGet(znewname) != null) {
			znewname = zbasename + i;
			zoptionind = i;
			i += 1;
		}
		if (zoptionind > 68) {
			WTW.hide('wtw_animation-add');
		}
		if (zselectedvalue.indexOf('|') > -1) {
			var zcurrentvalues = zselectedvalue.split('|');
			zuseravataranimationid = zcurrentvalues[0];
		}
		znewoptional.id = znewname;
		znewoptional.className = 'wtw-inlinespacing';
		znewoptional.style = '';
		znewoptional.innerHTML = "";
		for (var i = 0; i < zoptional.options.length; i++) {
			var zoption = zoptional.options[i].cloneNode();
			zoption.innerHTML = zoptional.options[i].innerHTML;
			if (zoption.value == zselectedvalue) {
				zoption.selected = true;
			} else {
				zoption.selected = false;
			}
			znewoptional.appendChild(zoption);
		}
		var zcurrent = document.createElement('input');
		zcurrent.type = 'hidden';
		zcurrent.value = zuseravataranimationid;
		zcurrent.id = 'wtw_tselectavataranimation-' + zoptionind + '-value';
		var zdeleteanimation = document.createElement('div');
		zdeleteanimation.id = 'wtw_tselectavataranimation-' + zoptionind + '-delete';
		zdeleteanimation.className = "wtw-deleteanimicon";
		zdeleteanimation.innerHTML = "<img src='/content/system/images/deleteicon.png' alt='Delete Animation' title='Delete Animation' onclick=\"WTW.deleteUserAnimation('" + znewname + "');\" class='wtw-deleteicon' />";
		dGet('wtw_addoptionalanimations').appendChild(zcurrent);
		zdeleteanimation.appendChild(znewoptional);
		dGet('wtw_addoptionalanimations').appendChild(zdeleteanimation);
    } catch (ex) {
		WTW.log("avatars-loadavatar-addAvatarAnimationRow=" + ex.message);
    }
}

WTWJS.prototype.deleteUserAnimation = function(zselectname) {
	try {
		var zuseravataranimationid = "";
		var zavataranimationid = "";
		var zanimationname = "";
		var zselectedvalue = WTW.getDDLValue(zselectname);
		if (zselectedvalue.indexOf('|') > -1) {
			var zcurrentvalues = zselectedvalue.split('|');
			zuseravataranimationid = zcurrentvalues[0];
			zavataranimationid = zcurrentvalues[1];
			zanimationname = zcurrentvalues[3];
		}
		WTW.show('wtw_animation-add');
		var zavatar = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value);
		if (zavatar != null) {
			if (zavatar.WTW.animations != undefined) {
				for (var i=zavatar.WTW.animations.length;i>-1;i--) {
					if (zavatar.WTW.animations[i] != null) {
						if (zavatar.WTW.animations[i].useravataranimationid == zuseravataranimationid) {
							if (zavatar.WTW.animations.running['onoption' + zavatar.WTW.animations[i].avataranimationid] != undefined) {
								zavatar.WTW.animations.running['onoption' + zavatar.WTW.animations[i].avataranimationid].stop();
							}
							zavatar.WTW.animations.splice(i,1);
						}
					}
				}
			}
		}
		if (dGet(zselectname) != null) {
			WTW.hide(zselectname);
			WTW.hide(zselectname + '-delete');
		}
		if (zuseravataranimationid != "") {
			var zmyavatarid = dGet('wtw_tmyavatarid').value;
			if (dGet('wtw_tuserid').value == '') {
				zmyavatarid = dGet('wtw_tmyavataridanon').value;
			}
			var zrequest = {
				'avatarid': zmyavatarid,
				'instanceid': dGet("wtw_tinstanceid").value,
				'useravataranimationid': zuseravataranimationid,
				'avataranimationid':zavataranimationid,
				'function':'deleteavataranimation'
			};
			WTW.postJSON("/core/handlers/avatars.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
				}
			);
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-deleteUserAnimation=" + ex.message);
    }
}

WTWJS.prototype.updateAnimSelectValue = function(zuseravataranimationidfield, zuseravataranimationid) {
	try {
		if (dGet(zuseravataranimationidfield) != null) {
			dGet(zuseravataranimationidfield).value = zuseravataranimationid;
			var zselobjid = zuseravataranimationidfield.replace('-value','');
			var zselvalue = WTW.getDDLValue(zselobjid);
			var znewselvalue = "";
			if (zselvalue.indexOf('|') > -1) {
				var zselvalues = zselvalue.split('|');
				znewselvalue = zuseravataranimationid;
				for (var i=1;i<zselvalues.length;i++) {
					znewselvalue += "|" + zselvalues[i];
				}
			}
			if (dGet(zselobjid) != null) {
				if (dGet(zselobjid).selectedIndex > -1) {
					dGet(zselobjid).options[dGet(zselobjid).selectedIndex].value = znewselvalue;
				}
			}
			var zavatar = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value);
			if (zavatar != null) {
				if (zavatar.WTW.animations != undefined) {
					for (var i=zavatar.WTW.animations.length;i>-1;i--) {
						if (zavatar.WTW.animations[i] != null) {
							if (zavatar.WTW.animations[i].animationname == "onoption" && zavatar.WTW.animations[i].useravataranimationid == '') {
								zavatar.WTW.animations[i].useravataranimationid = zuseravataranimationid;
							}
						}
					}
				}
			}
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-updateAnimSelectValue=" + ex.message);
    }
}

WTWJS.prototype.editEnterAnimation = function() {
	try {
		WTW.editAvatarAnimation('', -1, 181);
		WTW.toggle("wtw_animationdiv-enter");
    } catch (ex) {
		WTW.log("avatars-loadavatar-editEnterAnimation=" + ex.message);
    }
}

WTWJS.prototype.editAvatarAnimation = function(animationname, currentind, total) {
	try {
		dGet('wtw_tavataranimationname').value = animationname;
		for (var i=0;i<total;i++) {
			if (dGet("wtw_animationdiv-" + i) != null && i != currentind) {
				WTW.hide("wtw_animationdiv-" + i);
			} else if (i == currentind) {
				WTW.toggle("wtw_animationdiv-" + i);
			}
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-editAvatarAnimation=" + ex.message);
    }
}

WTWJS.prototype.editAvatarColors = function() {
	try {
		dGet("wtw_editavatarparts").innerHTML = "<ul style='padding:0px;'>";
		var zavatarscale = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-scale");
		var zavatarpieces = zavatarscale.getChildren();
		if (zavatarpieces != null) {
			var zavatarparts = [];
			for (var i=0;i<zavatarpieces.length;i++) {
				zavatarparts[zavatarparts.length] = zavatarpieces[i].name.replace("myavatar-" + dGet("wtw_tinstanceid").value + "-","");
			}
			zavatarparts.sort(function(a,b){return a < b ? -1 : 1}); 
			for (var i=0;i<zavatarparts.length;i++) {
				var zpartcolor = "#ffffff";
				var zavatarpart = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-" + zavatarparts[i]);
				if (zavatarpart != null) {
					if (zavatarpart.material == null) {
						zavatarpart.material = new BABYLON.StandardMaterial("mat" + "myavatar-" + dGet("wtw_tinstanceid").value + "-" + zavatarparts[i], scene);
					}
					zpartcolor = zavatarpart.material.emissiveColor.toHexString();
					if (zpartcolor == null || zpartcolor == undefined || zpartcolor == '') {
						zpartcolor = "#ffffff";
					}
				}
				var zavatarpartdisplayname = zavatarparts[i];
				if (zavatarpartdisplayname.indexOf("_") > -1) {
					zavatarpartdisplayname = zavatarparts[i].replace("_"," ");
				}
				dGet("wtw_editavatarparts").innerHTML += "<li id='wtw_li-myavatar-" + dGet("wtw_tinstanceid").value + "-" + zavatarparts[i] + "' class='wtw-avatarli' onclick=\"WTW.editAvatarPart('myavatar-" + dGet("wtw_tinstanceid").value + "-" + zavatarparts[i] + "');\"><div class='wtw-inlineindent'><div id='wtw_color-myavatar-" + dGet("wtw_tinstanceid").value + "-" + zavatarparts[i] + "' class='wtw-showcolorbox' style='background-color:" + zpartcolor + ";'></div>" + zavatarpartdisplayname.toProperCase(); + "</div></li>";
			}
		}
		dGet("wtw_editavatarparts").innerHTML += "</ul>";
    } catch (ex) {
		WTW.log("avatars-loadavatar-editAvatarColors=" + ex.message);
    }
}

WTWJS.prototype.editAvatarPart = function(zavatarpartname) {
	try {
		if (zavatarpartname != '') {
			var zlastmoldname = dGet('wtw_tmoldname').value;
			WTW.resetAvatarPartSelect();
			WTW.hilightMoldFast(zavatarpartname, 'yellow');
			dGet('wtw_li-' + zavatarpartname).className = 'wtw-avatarlihilight';
			dGet('wtw_tmoldname').value = zavatarpartname;
			var zmold = scene.getMeshByID(dGet('wtw_tmoldname').value);
			if (WTW.guiAdminColors == null) {
				WTW.guiAdminColors = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
				var zpanel = new BABYLON.GUI.StackPanel();
				zpanel.name = "avatarguipanel";
				zpanel.width = "300px";
				zpanel.isVertical = true;
				zpanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
				zpanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
				WTW.guiAdminColors.addControl(zpanel);
				if (zmold != null) {
					var zcolorpicker = new BABYLON.GUI.ColorPicker();
					zcolorpicker.name = "avatarcolorpicker";
					zcolorpicker.id = "avatarcolorpicker";
					zcolorpicker.value = zmold.material.emissiveColor;
					zcolorpicker.height = "250px";
					zcolorpicker.width = "250px";
					zcolorpicker.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
					zcolorpicker.onValueChangedObservable.add(function(value) {
						if (value != null) {
							WTW.setAvatarColor('emissive', value.r, value.g, value.b);
						}
					});
					zpanel.addControl(zcolorpicker); 
				}
			} else {
				WTW.saveAvatarColor(zlastmoldname);
				var zcolorpicker = null;
				var zgui = WTW.guiAdminColors.getDescendants();
				if (zgui != null) {
					for (var i=0;i<zgui.length;i++) {
						if (zgui[i] != null) {
							if (zgui[i].name == 'avatarcolorpicker') {
								zcolorpicker = zgui[i];
							}
						}
					}
					if (zcolorpicker != null && zmold != null) {
						zcolorpicker.value = zmold.material.emissiveColor;
					}
				}
			}
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-editAvatarPart=" + ex.message);
    }
}

WTWJS.prototype.setAvatarColor = function(zcolorgroup, r, g, b) {
	try {
		var zmold = scene.getMeshByID(dGet('wtw_tmoldname').value);
		var zpartcolor = "#ffffff";
		if (zmold != null) {
			switch (zcolorgroup) {
				case "diffuse":
					zmold.material.diffuseColor = new BABYLON.Color3(r,g,b);
					zpartcolor = zmold.material.diffuseColor.toHexString();
					break;
				case "specular":
					zmold.material.specularColor = new BABYLON.Color3(r,g,b);
					zpartcolor = zmold.material.specularColor.toHexString();
					break;
				case "emissive":
					zmold.material.emissiveColor = new BABYLON.Color3(r,g,b);
					zpartcolor = zmold.material.emissiveColor.toHexString();
					break;
			}
			var zcovering = zmold.material;
			zmold.material.dispose();
			zmold.material = zcovering;
		}
		if (dGet('wtw_color-' + dGet('wtw_tmoldname').value) != null) {
			dGet('wtw_color-' + dGet('wtw_tmoldname').value).style.backgroundColor = zpartcolor;
		}
		switch (zcolorgroup) {
			case "diffuse":
				dGet('wtw_tdiffusecolorr').value = r;
				dGet('wtw_tdiffusecolorg').value = g;
				dGet('wtw_tdiffusecolorb').value = b;
				break;
			case "specular":
				dGet('wtw_tspecularcolorr').value = r;
				dGet('wtw_tspecularcolorg').value = g;
				dGet('wtw_tspecularcolorb').value = b;
				break;
			case "emissive":
				dGet('wtw_temissivecolorr').value = r;
				dGet('wtw_temissivecolorg').value = g;
				dGet('wtw_temissivecolorb').value = b;
				break;
		}
		scene.render();
	} catch (ex) {
		WTW.log("avatars-loadavatar-setAvatarColor=" + ex.message);
	}
}

WTWJS.prototype.resetAvatarPartSelect = function() {
	try {
		var zavatarscale = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-scale");
		var zavatarpieces = zavatarscale.getChildren();
		if (zavatarpieces != null) {
			for (var i=0;i<zavatarpieces.length;i++) {
				if (dGet('wtw_li-' + zavatarpieces[i].name) != null) {
					dGet('wtw_li-' + zavatarpieces[i].name).className = 'wtw-avatarli';
				}
			}
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-resetAvatarPartSelect=" + ex.message);
    }
}

WTWJS.prototype.loadAvatarFromDB = function(zcustomdef, zreload) {
	try {
		if (zreload == undefined) {
			zreload = false;
		}
		var zwalkspeed = ".5";
		var zavatardef = WTW.newAvatarDef();
		zavatardef.displayname = zcustomdef.displayname;
		zavatardef.privacy = zcustomdef.privacy;
		zavatardef.enteranimation = zcustomdef.enteranimation;
		zavatardef.enteranimationparameter = zcustomdef.enteranimationparameter;
		zavatardef.exitanimation = zcustomdef.exitanimation;
		zavatardef.exitanimationparameter = zcustomdef.exitanimationparameter;
		zavatardef.avatarind = zcustomdef.avatarind;
		zavatardef.avatarparts = zcustomdef.avatarparts;
		zavatardef.avataranimationdefs = zcustomdef.avataranimationdefs;
		zavatardef.object.useravatarid = zcustomdef.useravatarid
		zavatardef.object.folder = zcustomdef.objectfolder;
		zavatardef.object.file = zcustomdef.objectfile;
		zavatardef.object.walkspeed = zwalkspeed;
		zavatardef.object.objectanimations = null;		
		zavatardef.scaling.x = zcustomdef.scalingx;
		zavatardef.scaling.y = zcustomdef.scalingy;
		zavatardef.scaling.z = zcustomdef.scalingz;
		zavatardef.lastscaling.x = zcustomdef.scalingx;
		zavatardef.lastscaling.y = zcustomdef.scalingy;
		zavatardef.lastscaling.z = zcustomdef.scalingz;
		if (dGet("wtw_tuserid").value == '') {
			dGet('wtw_tmyavataridanon').value = zcustomdef.useravatarid;
			WTW.setCookie("myavataridanon",dGet('wtw_tmyavataridanon').value,365);
		} else {
			dGet('wtw_tmyavatarid').value = zcustomdef.useravatarid;
			WTW.setCookie("myavatarid",dGet('wtw_tmyavatarid').value,365);
		}
		WTW.setDDLValue('wtw_tselectavataranimation-enter',zavatardef.enteranimation);
		WTW.loadMyAvatar(zavatardef, zreload);
    } catch (ex) {
		WTW.log("avatars-loadavatar-loadAvatarFromDB=" + ex.message);
    }
}

WTWJS.prototype.loadMyAvatar = function(zavatardef, reload) {
	try {
		if (reload == undefined) {
			reload = false;
		}
		zavatardef.name = "myavatar-" + dGet("wtw_tinstanceid").value;
		zavatardef.username = dGet("wtw_tusername").value;
		zavatardef.userid = dGet("wtw_tuserid").value;
		if ((zavatardef.displayname == "" || zavatardef.displayname == "Anonymous") && dGet("wtw_tusername").value != "") {
			zavatardef.displayname = dGet("wtw_tusername").value;
		}
		zavatardef.instanceid = dGet("wtw_tinstanceid").value;
		zavatardef.checkcollisions = "1";
		zavatardef.ispickable = "0"; 
		zavatardef.parentname = "person";
		zavatardef.position.x = WTW.init.startPositionX;
		zavatardef.position.y = WTW.init.startPositionY;
		zavatardef.position.z = WTW.init.startPositionZ;
		zavatardef.lastposition.x = WTW.init.startPositionX;
		zavatardef.lastposition.y = WTW.init.startPositionY;
		zavatardef.lastposition.z = WTW.init.startPositionZ;
		zavatardef.rotation.x = 0;
		zavatardef.rotation.y = WTW.init.startRotationY;
		zavatardef.rotation.z = 0;
		zavatardef.lastrotation.x = WTW.init.startRotationX;
		zavatardef.lastrotation.y = WTW.init.startRotationY;
		zavatardef.lastrotation.z = WTW.init.startRotationZ;

		var zstartstand = BABYLON.MeshBuilder.CreateBox('startstand', {}, scene);
		zstartstand.scaling = new BABYLON.Vector3(4, 1, 4);
		zstartstand.position = new BABYLON.Vector3(WTW.init.startPositionX, WTW.init.startPositionY - .5, WTW.init.startPositionZ);
		zstartstand.checkCollisions = true;
		zcovering = new BABYLON.StandardMaterial("matstartstand", scene);
		zstartstand.material = new BABYLON.StandardMaterial("matstartstand", scene);
		zstartstand.material.alpha = 0;
		
		WTW.myAvatar = WTW.addAvatar(zavatardef.name, zavatardef, zavatardef.parentname);
		//WTW.myAvatar.parent = WTW.getMainParent();
		WTW.myAvatar.rotation.y = WTW.getRadians(WTW.init.startRotationY);
		if (reload == false) {
			WTW.cameraYOffset = WTW.init.startRotationX;
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-loadMyAvatar=" + ex.message);
    }
}

WTWJS.prototype.loadAvatar = function(zavatarind, zparentmold, zoffsetx, zoffsetz) {
	try {
		var zavatarname = "selectavatar-" + zavatarind + "-preview";
		var zselavatar = scene.getMeshByID(zavatarname);
		if (zselavatar == null) {
			var zavatardef = WTW.newAvatarDef();
			var zdef = WTW.getAvatarSettings(zavatarind);
			zavatardef.object.folder = zdef.objectfolder;
			zavatardef.object.file = zdef.objectfile;
			zavatardef.object.walkspeed = zdef.walkspeed;
			zavatardef.scaling.x = zdef.scalingx;
			zavatardef.scaling.y = zdef.scalingy;
			zavatardef.scaling.z = zdef.scalingz;
			zavatardef.object.objectanimations = null;
			zavatardef.avatarind = zavatarind;
			zselavatar = WTW.addAvatar3DObject(zavatarname, zavatardef, true, true);
			zselavatar.parent = zparentmold;
			zselavatar.rotation.y = WTW.getRadians(90);
			zselavatar.position.x = zoffsetx;
			zselavatar.position.z = zoffsetz;
		} else {
			if (dGet('wtw_tuserid').value == '') {
				if (zavatarind == 1) {
					zselavatar.position.x = -5;
					zselavatar.position.z = 20;
				} else if (zavatarind == 2) {
					zselavatar.position.x = 5;
					zselavatar.position.z = 20;
				}
			} else {
				if (zavatarind == 1) {
					zselavatar.position.x = -16;
					zselavatar.position.z = 28;
				} else if (zavatarind == 2) {
					zselavatar.position.x = 16;
					zselavatar.position.z = 28;
				}
			}
			WTW.avatarMinLoadEnter(zavatarname);
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-loadAvatar=" + ex.message);
    }
}

WTWJS.prototype.avatarMinLoadEnter = function(zavatarname) {
	try {
		var zavatarparts = [];
		var zavatar = scene.getMeshByID(zavatarname);
		if (zavatar != null) {
			var zavatarscale = scene.getMeshByID(zavatarname + "-scale");
			if (zavatarscale != null) {
				zavatarparts = zavatarscale.getChildren();
			}
		}
		WTW.avatarShowGrowGlowSmoke(zavatarname, zavatarparts);
    } catch (ex) {
		WTW.log("avatars-loadavatar-avatarMinLoadEnter=" + ex.message);
    }
}

WTWJS.prototype.avatarEnter = function(zavatarname) {
	try {
		var zavatarparts = [];
		var zavatar = scene.getMeshByID(zavatarname);
		var zenteranimation = '1';
		if (zavatar != null) {
			if (zavatar.WTW != null) {
				if (zavatar.WTW.enteranimation != null) {
					if (WTW.isNumeric(zavatar.WTW.enteranimation)) {
						zenteranimation = zavatar.WTW.enteranimation;
					}
				}
			}
			var zavatarscale = scene.getMeshByID(zavatarname + "-scale");
			if (zavatarscale != null) {
				zavatarparts = zavatarscale.getChildren();
			}
		}
		switch (zenteranimation) {
			case '1':
				WTW.avatarShowVisible(zavatarname, zavatarparts);
				break;
			case '2':
				WTW.avatarShowFade(zavatarname, zavatarparts);
				break;
			case '3':
				WTW.avatarShowFadeSmoke(zavatarname, zavatarparts);
				break;
			case '4':
				WTW.avatarShowFadeSwirl(zavatarname, zavatarparts);
				break;
			case '5':
				WTW.avatarShowFadeSprite(zavatarname, zavatarparts);
				break;
			case '6':
				WTW.avatarShowFadeParticles(zavatarname, zavatarparts);
				break;
			case '7':
				WTW.avatarShowGrow(zavatarname, zavatarparts);
				break;
			case '8':
				WTW.avatarShowGrowGlow(zavatarname, zavatarparts);
				break;
			case '9':
				WTW.avatarShowGrowSmoke(zavatarname, zavatarparts);
				break;
			case '10':
				WTW.avatarShowGrowGlowSmoke(zavatarname, zavatarparts);
				break;
			case '11':
				WTW.avatarShowBeam(zavatarname, zavatarparts);
				break;
			default:
				WTW.avatarShowVisible(zavatarname, zavatarparts);
				break;
		}
		WTW.switchCamera(1);
    } catch (ex) {
		WTW.log("avatars-loadavatar-avatarEnter=" + ex.message);
    }
}

WTWJS.prototype.saveAvatarEnterAnimation = function() {
	try {
		var zavataranimationid = WTW.getDDLValue('wtw_tselectavataranimation-enter');
		var myavatarid = dGet('wtw_tmyavatarid').value;
		if (dGet('wtw_tuserid').value == '') {
			myavatarid = dGet('wtw_tmyavataridanon').value;
		}
		if (WTW.isNumeric(zavataranimationid) == false) {
			zavataranimationid = 1;
		}
		var zrequest = {
			'avatarid': myavatarid,
			'instanceid': dGet("wtw_tinstanceid").value,
			'avataranimationid': zavataranimationid,
			'transport': '1',
			'function':'savetransportanimation'
		};
		WTW.postJSON("/core/handlers/avatars.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
			}
		);
    } catch (ex) {
		WTW.log("avatars-loadavatar-saveAvatarEnterAnimation=" + ex.message);
    }
}

WTWJS.prototype.avatarShowVisible = function(zavatarname, zavatarparts) {
	try {
		if (zavatarparts == undefined) {
			zavatarparts = [];
			var zavatar = scene.getMeshByID(zavatarname);
			var zenteranimation = '1';
			if (zavatar != null) {
				if (zavatar.WTW != null) {
					if (zavatar.WTW.enteranimation != null) {
						if (WTW.isNumeric(zavatar.WTW.enteranimation)) {
							zenteranimation = zavatar.WTW.enteranimation;
						}
					}
				}
				var zavatarscale = scene.getMeshByID(zavatarname + "-scale");
				if (zavatarscale != null) {
					zavatarparts = zavatarscale.getChildren();
				}
			}
		}
		for (var i=0; i<zavatarparts.length; i++) {
			if (zavatarparts[i] != null) {
				zavatarparts[i].isVisible = true;
			}
		}
		WTW.myAvatarLoadComplete(zavatarname);
    } catch (ex) {
		WTW.log("avatars-loadavatar-avatarShowVisible=" + ex.message);
    }
}

WTWJS.prototype.avatarShowFade = function(zavatarname, zavatarparts) {
	try {
		for (var i=0; i<zavatarparts.length;i++) {
			if (zavatarparts[i] != null) {
				if (zavatarparts[i].material != null) {
					zavatarparts[i].material.alpha = 0;
				}
				zavatarparts[i].isVisible = true;
			}
		}
		var ztimername  = window.setInterval(function(){
			var zavatar = scene.getMeshByID(zavatarname);
			if (zavatar != null) {
				var zavatarscale = scene.getMeshByID(zavatarname + "-scale");
				if (zavatarscale != null) {
					var zavatarparts = zavatarscale.getChildren();
					var zchildalpha = 0;
					for (var i=0; i<zavatarparts.length;i++) {
						if (zavatarparts[i] != null) {
							if (zavatarparts[i].material != null) {
								zchildalpha = zavatarparts[i].material.alpha;
								if (zchildalpha < 1) {
									zchildalpha += .01;
								} else {
									zchildalpha = 1;
								}
								zavatarparts[i].material.alpha = zchildalpha;
							}
						}
					} 
					if (zchildalpha == 1) {
						window.clearInterval(ztimername);
						WTW.myAvatarLoadComplete(zavatarname);
					}
				}
			}
		},10);
    } catch (ex) {
		WTW.log("avatars-loadavatar-avatarShowFade=" + ex.message);
    }
}

WTWJS.prototype.avatarShowFadeSwirl = function(zavatarname, zavatarparts) {
	try {
		var zavatar = scene.getMeshByID(zavatarname);
		if (zavatar != null) {
			var ztorus1 = WTW.addMoldTorus(zavatarname + "-torus1", .5, .5, .5, 24, 20)
			ztorus1.isVisible = true;
			ztorus1.parent = zavatar;
			ztorus1.position.y += 10;
			ztorus1.rotation.z = WTW.getRadians(25);
			var ztorus2 = WTW.addMoldTorus(zavatarname + "-torus2", .5, .5, .5, 24, 20)
			ztorus2.isVisible = true;
			ztorus2.parent = zavatar;
			ztorus2.position.y += 5;
			ztorus2.rotation.z = WTW.getRadians(-25);
		}
		for (var i=0; i<zavatarparts.length;i++) {
			if (zavatarparts[i] != null) {
				if (zavatarparts[i].material != null) {
					zavatarparts[i].material.alpha = 0;
				}
				zavatarparts[i].isVisible = true;
			}
		}
		var timername  = window.setInterval(function(){
			var zavatar = scene.getMeshByID(zavatarname);
			if (zavatar != null) {
				var zavatarscale = scene.getMeshByID(zavatarname + "-scale");
				if (zavatarscale != null) {
					var zavatarparts = zavatarscale.getChildren();
					var zchildalpha = 0;
					for (var i=0; i<zavatarparts.length;i++) {
						if (zavatarparts[i] != null) {
							if (zavatarparts[i].material != null) {
								zchildalpha = zavatarparts[i].material.alpha;
								if (zchildalpha < 1) {
									zchildalpha += .01;
								} else {
									zchildalpha = 1;
								}
								zavatarparts[i].material.alpha = zchildalpha;
							}
						}
					} 
					var ztorus1 = scene.getMeshByID(zavatarname + "-torus1");
					var ztorus2 = scene.getMeshByID(zavatarname + "-torus2");
					if (ztorus1 != null) {
						ztorus1.rotation.y += WTW.getRadians(10);
					} else {
						zchildalpha = 1;
					}
					if (ztorus2 != null) {
						ztorus2.rotation.y += WTW.getRadians(10);
					} else {
						zchildalpha = 1;
					}
					if (zchildalpha == 1) {
						WTW.disposeClean(zavatarname + "-torus1");
						WTW.disposeClean(zavatarname + "-torus2");
						window.clearInterval(timername);
						WTW.myAvatarLoadComplete(zavatarname);
					}
				}
			}
		},20);
    } catch (ex) {
		WTW.log("avatars-loadavatar-avatarShowFadeSwirl=" + ex.message);
    }
}

WTWJS.prototype.avatarShowFadeSmoke = function(zavatarname, zavatarparts) {
	try {
		var zavatar = scene.getMeshByID(zavatarname);
		if (zavatar != null) {
			var zsmoke = WTW.addMoldSmoke(zavatarname + "-smoke", null, .6, 1, .6);
			zsmoke.parent = zavatar;
			zsmoke.position.y -= 2;
		}
		for (var i=0; i<zavatarparts.length;i++) {
			if (zavatarparts[i] != null) {
				if (zavatarparts[i].material != null) {
					zavatarparts[i].material.alpha = 0;
				}
				zavatarparts[i].isVisible = true;
			}
		}
		window.setTimeout(function() {
			var ztimername  = window.setInterval(function(){
				var zavatar = scene.getMeshByID(zavatarname);
				if (zavatar != null) {
					var zavatarscale = scene.getMeshByID(zavatarname + "-scale");
					if (zavatarscale != null) {
						var zavatarparts = zavatarscale.getChildren();
						var zchildalpha = 0;
						for (var i=0; i<zavatarparts.length;i++) {
							if (zavatarparts[i] != null) {
								if (zavatarparts[i].material != null) {
									zchildalpha = zavatarparts[i].material.alpha;
									if (zchildalpha < 1) {
										zchildalpha += .01;
									} else {
										zchildalpha = 1;
									}
									zavatarparts[i].material.alpha = zchildalpha;
								}
							}
						} 
						if (zchildalpha == 1) {
							var zsmoke = scene.getMeshByID(zavatarname + "-smoke");
							if (zsmoke != null) {
								zsmoke.position.y -= 1000;
								window.setTimeout(function(){WTW.disposeClean(zavatarname + "-smoke");},7000);
							}
							window.clearInterval(ztimername);
							WTW.myAvatarLoadComplete(zavatarname);
						}
					}
				}
			},30);
		},500);
    } catch (ex) {
		WTW.log("avatars-loadavatar-avatarShowFadeSmoke=" + ex.message);
    }
}

WTWJS.prototype.avatarShowFadeParticles = function(zavatarname, zavatarparts) {
	try {
		var zavatar = scene.getMeshByID(zavatarname);
		if (zavatar != null) {
			var zsmoke = WTW.addMoldSmoke(zavatarname + "-smoke", null, .6, 1, .6);
			zsmoke.parent = zavatar;
			zsmoke.position.y -= 2; 
		}
		var zpcs = new BABYLON.PointsCloudSystem(zavatarname + "pcs", 5, scene);
		for (var i=0; i<zavatarparts.length;i++) {
			if (zavatarparts[i] != null) {
				var zmold = BABYLON.MeshBuilder.CreateBox(zavatarname + "particles", {}, scene);
				zmold.scaling = new BABYLON.Vector3(1,1,1);
				var ztransparentmat = new BABYLON.StandardMaterial("mat" + zavatarname + "particles", scene);
				ztransparentmat.alpha = 0;
				zmold.material = ztransparentmat;
				zpcs.addSurfacePoints(zavatarparts[i], 20000, BABYLON.PointColor.UV);
				zpcs.buildMeshAsync().then((zmesh) => {
					zmesh.material.pointSize = 2;
					zmesh.material.alpha = 1;
					var zmeshtimer = window.setInterval(function(){
						if (zmesh.material.alpha > 0) {
							zmesh.material.alpha -= .01;
						} else {
							zmesh.dispose();
							window.clearInterval(zmeshtimer);
						}
					},30);
				});
				if (zavatarparts[i].material != null) {
					zavatarparts[i].material.alpha = 0;
				}
				zavatarparts[i].isVisible = true;
			}
		}
		window.setTimeout(function() {
			var ztimername  = window.setInterval(function(){
				var zavatar = scene.getMeshByID(zavatarname);
				if (zavatar != null) {
					var zavatarscale = scene.getMeshByID(zavatarname + "-scale");
					if (zavatarscale != null) {
						var zavatarparts = zavatarscale.getChildren();
						var zchildalpha = 0;
						for (var i=0; i<zavatarparts.length;i++) {
							if (zavatarparts[i] != null) {
								if (zavatarparts[i].material != null) {
									zchildalpha = zavatarparts[i].material.alpha;
									if (zchildalpha < 1) {
										zchildalpha += .01;
									} else {
										zchildalpha = 1;
									}
									zavatarparts[i].material.alpha = zchildalpha;
								}
							}
						} 
						if (zchildalpha == 1) {
							var zsmoke = scene.getMeshByID(zavatarname + "-smoke");
							if (zsmoke != null) {
								zsmoke.position.y -= 1000;
								window.setTimeout(function(){WTW.disposeClean(zavatarname + "-smoke");},7000);
							} 
							if (zpcs != null) {
								zpcs.dispose();
								zpcs = null;
							}
							window.clearInterval(ztimername);
							WTW.myAvatarLoadComplete(zavatarname);
						}
					}
				}
			},30);
		},1000);
    } catch (ex) {
		WTW.log("avatars-loadavatar-avatarShowFadeParticles=" + ex.message);
    }
}

WTWJS.prototype.avatarShowFadeSprite = function(zavatarname, zavatarparts) {
	try {
		var zavatar = scene.getMeshByID(zavatarname);
		if (zavatar != null) {
			var zmold = WTW.addMoldParticleSphere(zavatarname + "-sprite", null, 2.2, 2.2, 2.2);
			zmold.parent = zavatar;
			zmold.position.y += 8;
			var zsmoke = WTW.addMoldSmoke(zavatarname + "-smoke", null, .6, 1, .6);
			zsmoke.parent = zavatar;
			zsmoke.position.y -= 2;
		}
		for (var i=0; i<zavatarparts.length;i++) {
			if (zavatarparts[i] != null) {
				if (zavatarparts[i].material != null) {
					zavatarparts[i].material.alpha = 0;
				}
				zavatarparts[i].isVisible = true;
			}
		}
		window.setTimeout(function() {
			var ztimername  = window.setInterval(function(){
				var zavatar = scene.getMeshByID(zavatarname);
				if (zavatar != null) {
					var zavatarscale = scene.getMeshByID(zavatarname + "-scale");
					if (zavatarscale != null) {
						var zavatarparts = zavatarscale.getChildren();
						var zchildalpha = 0;
						for (var i=0; i<zavatarparts.length;i++) {
							if (zavatarparts[i] != null) {
								if (zavatarparts[i].material != null) {
									zchildalpha = zavatarparts[i].material.alpha;
									if (zchildalpha < 1) {
										zchildalpha += .01;
									} else {
										zchildalpha = 1;
									}
									zavatarparts[i].material.alpha = zchildalpha;
								}
							}
						} 
						if (zchildalpha == 1) {
							WTW.disposeClean(zavatarname + "-sprite");
							var zsmoke = scene.getMeshByID(zavatarname + "-smoke");
							if (zsmoke != null) {
								zsmoke.position.y -= 1000;
								window.setTimeout(function(){WTW.disposeClean(zavatarname + "-smoke");},7000);
							}
							window.clearInterval(ztimername);
							WTW.myAvatarLoadComplete(zavatarname);
						}
					}
				}
			},30);
		},500);
    } catch (ex) {
		WTW.log("avatars-loadavatar-avatarShowFadeSprite=" + ex.message);
    }
}

WTWJS.prototype.avatarShowGrow = function(zavatarname, zavatarparts) {
	try {
		var zavatarscale = scene.getMeshByID(zavatarname + "-scale");
		if (zavatarscale != null) {
			zavatarscale.scaling.x = .001;
			zavatarscale.scaling.y = .001;
			zavatarscale.scaling.z = .001;
		}
		
		for (var i=0; i<zavatarparts.length;i++) {
			if (zavatarparts[i] != null) {
				zavatarparts[i].isVisible = true;
			}
		}
		var ztimername  = window.setInterval(function(){
			var zavatar = scene.getMeshByID(zavatarname);
			if (zavatar != null) {
				var zscalingx = .04;
				var zscalingy = .04;
				var zscalingz = .04;
				if (zavatar.WTW != null) {
					if (zavatar.WTW.scaling != null) {
						if (zavatar.WTW.scaling.x != null) {
							if (WTW.isNumeric(zavatar.WTW.scaling.x)) {
								zscalingx = Number(zavatar.WTW.scaling.x);
							}
						}
						if (zavatar.WTW.scaling.y != null) {
							if (WTW.isNumeric(zavatar.WTW.scaling.y)) {
								zscalingy = Number(zavatar.WTW.scaling.y);
							}
						}
						if (zavatar.WTW.scaling.z != null) {
							if (WTW.isNumeric(zavatar.WTW.scaling.z)) {
								zscalingz = Number(zavatar.WTW.scaling.z);
							}
						}
					}
				}
				var zavatarscale = scene.getMeshByID(zavatarname + "-scale");
				if (zavatarscale != null) {
					var zsetscalingx = zavatarscale.scaling.x;
					var zsetscalingy = zavatarscale.scaling.y;
					var zsetscalingz = zavatarscale.scaling.z;
					if (zsetscalingx < zscalingx) {
						zavatarscale.scaling.x += .001;
					} else {
						zsetscalingx = zscalingx;
						zavatarscale.scaling.x = zscalingx;
					}
					if (zsetscalingy < zscalingy) {
						zavatarscale.scaling.y += .001;
					} else {
						zsetscalingy = zscalingy;
						zavatarscale.scaling.y = zscalingy;
					}
					if (zsetscalingz < zscalingz) {
						zavatarscale.scaling.z += .001;
					} else {
						zsetscalingz = zscalingz;
						zavatarscale.scaling.z = zscalingz;
					}
					if (zsetscalingx == zscalingx && zsetscalingy == zscalingy && zsetscalingz == zscalingz) {
						window.clearInterval(ztimername);
						WTW.myAvatarLoadComplete(zavatarname);
					}
				}
			}
		},10);
    } catch (ex) {
		WTW.log("avatars-loadavatar-avatarShowGrow=" + ex.message);
    }
}

WTWJS.prototype.avatarShowGrowSmoke = function(zavatarname, zavatarparts) {
	try {
		var zavatar = scene.getMeshByID(zavatarname);
		if (zavatar != null) {
			var zsmoke = WTW.addMoldSmoke(zavatarname + "-smoke", null, .6, .5, 2);
			zsmoke.parent = zavatar;
			zsmoke.position.y -= 2;
		}
		var zavatarscale = scene.getMeshByID(zavatarname + "-scale");
		if (zavatarscale != null) {
			zavatarscale.scaling.x = .001;
			zavatarscale.scaling.y = .001;
			zavatarscale.scaling.z = .001;
		}
		
		for (var i=0; i<zavatarparts.length;i++) {
			if (zavatarparts[i] != null) {
				zavatarparts[i].isVisible = true;
			}
		}
		window.setTimeout(function() {
			var ztimername  = window.setInterval(function(){
				var zavatar = scene.getMeshByID(zavatarname);
				if (zavatar != null) {
					var zscalingx = .04;
					var zscalingy = .04;
					var zscalingz = .04;
					if (zavatar.WTW != null) {
						if (zavatar.WTW.scaling != null) {
							if (zavatar.WTW.scaling.x != null) {
								if (WTW.isNumeric(zavatar.WTW.scaling.x)) {
									zscalingx = Number(zavatar.WTW.scaling.x);
								}
							}
							if (zavatar.WTW.scaling.y != null) {
								if (WTW.isNumeric(zavatar.WTW.scaling.y)) {
									zscalingy = Number(zavatar.WTW.scaling.y);
								}
							}
							if (zavatar.WTW.scaling.z != null) {
								if (WTW.isNumeric(zavatar.WTW.scaling.z)) {
									zscalingz = Number(zavatar.WTW.scaling.z);
								}
							}
						}
					}
					var zavatarscale = scene.getMeshByID(zavatarname + "-scale");
					if (zavatarscale != null) {
						var zsetscalingx = zavatarscale.scaling.x;
						var zsetscalingy = zavatarscale.scaling.y;
						var zsetscalingz = zavatarscale.scaling.z;
						if (zsetscalingx < zscalingx) {
							zavatarscale.scaling.x += .001;
						} else {
							zsetscalingx = zscalingx;
							zavatarscale.scaling.x = zscalingx;
						}
						if (zsetscalingy < zscalingy) {
							zavatarscale.scaling.y += .001;
						} else {
							zsetscalingy = zscalingy;
							zavatarscale.scaling.y = zscalingy;
						}
						if (zsetscalingz < zscalingz) {
							zavatarscale.scaling.z += .001;
						} else {
							zsetscalingz = zscalingz;
							zavatarscale.scaling.z = zscalingz;
						}
						if (zsetscalingx == zscalingx && zsetscalingy == zscalingy && zsetscalingz == zscalingz) {
							var zsmoke = scene.getMeshByID(zavatarname + "-smoke");
							if (zsmoke != null) {
								zsmoke.position.y -= 1000;
								window.setTimeout(function(){WTW.disposeClean(zavatarname + "-smoke");},7000);
							}
							window.clearInterval(ztimername);
							WTW.myAvatarLoadComplete(zavatarname);
						}
					}
				}
			},40);
		},300);
    } catch (ex) {
		WTW.log("avatars-loadavatar-avatarShowGrowSmoke=" + ex.message);
    }
}

WTWJS.prototype.avatarShowGrowGlow = function(zavatarname, zavatarparts) {
	try {
		if (WTW.highlightLayer == null) {
			WTW.highlightLayer = new BABYLON.HighlightLayer("highlightlayer", scene);
		}
		var zavatarscale = scene.getMeshByID(zavatarname + "-scale");
		if (zavatarscale != null) {
			zavatarscale.scaling.x = .001;
			zavatarscale.scaling.y = .001;
			zavatarscale.scaling.z = .001;
			for (var i=0; i<zavatarparts.length;i++) {
				if (zavatarparts[i] != null) {
					zavatarparts[i].isVisible = true;
					try {
						WTW.highlightLayer.addMesh(zavatarparts[i], BABYLON.Color3.Yellow());
					} catch(ex){}
				}
			} 
		}
		var ztimername  = window.setInterval(function(){
			var zavatar = scene.getMeshByID(zavatarname);
			if (zavatar != null) {
				var zscalingx = .04;
				var zscalingy = .04;
				var zscalingz = .04;
				if (zavatar.WTW != null) {
					if (zavatar.WTW.scaling != null) {
						if (zavatar.WTW.scaling.x != null) {
							if (WTW.isNumeric(zavatar.WTW.scaling.x)) {
								zscalingx = Number(zavatar.WTW.scaling.x);
							}
						}
						if (zavatar.WTW.scaling.y != null) {
							if (WTW.isNumeric(zavatar.WTW.scaling.y)) {
								zscalingy = Number(zavatar.WTW.scaling.y);
							}
						}
						if (zavatar.WTW.scaling.z != null) {
							if (WTW.isNumeric(zavatar.WTW.scaling.z)) {
								zscalingz = Number(zavatar.WTW.scaling.z);
							}
						}
					}
				}
				var zavatarscale = scene.getMeshByID(zavatarname + "-scale");
				if (zavatarscale != null) {
					var setscalingx = zavatarscale.scaling.x;
					var setscalingy = zavatarscale.scaling.y;
					var setscalingz = zavatarscale.scaling.z;
					if (setscalingx < zscalingx) {
						zavatarscale.scaling.x += .001;
					} else {
						setscalingx = zscalingx;
						zavatarscale.scaling.x = zscalingx;
					}
					if (setscalingy < zscalingy) {
						zavatarscale.scaling.y += .001;
					} else {
						setscalingy = zscalingy;
						zavatarscale.scaling.y = zscalingy;
					}
					if (setscalingz < zscalingz) {
						zavatarscale.scaling.z += .001;
					} else {
						setscalingz = zscalingz;
						zavatarscale.scaling.z = zscalingz;
					}
					if (setscalingx == zscalingx && setscalingy == zscalingy && setscalingz == zscalingz) {
						var zavatarparts = zavatarscale.getChildren();
						for (var i=0; i<zavatarparts.length;i++) {
							if (zavatarparts[i] != null) {
								try {
									WTW.highlightLayer.removeMesh(zavatarparts[i]);
								} catch(ex){}
							}
						} 
						window.clearInterval(ztimername);
						WTW.myAvatarLoadComplete(zavatarname);
					}
				}
			}
		},10);
    } catch (ex) {
		WTW.log("avatars-loadavatar-avatarShowGrowGlow=" + ex.message);
    }
}

WTWJS.prototype.avatarShowGrowGlowSmoke = function(zavatarname, zavatarparts) {
	try {
		var zavatar = scene.getMeshByID(zavatarname);
		if (zavatar != null) {
			var zsmoke = WTW.addMoldSmoke(zavatarname + "-smoke", null, .6, .5, 2);
			zsmoke.parent = zavatar;
			zsmoke.position.y -= 2;
		}
		var zavatarscale = scene.getMeshByID(zavatarname + "-scale");
		if (zavatarscale != null) {
			zavatarscale.scaling.x = .001;
			zavatarscale.scaling.y = .001;
			zavatarscale.scaling.z = .001;
		}
		if (WTW.highlightLayer == null) {
			WTW.highlightLayer = new BABYLON.HighlightLayer("highlightlayer", scene);
		}
		for (var i=0; i<zavatarparts.length;i++) {
			if (zavatarparts[i] != null) {
				zavatarparts[i].isVisible = true;
				try {
					WTW.highlightLayer.addMesh(zavatarparts[i], BABYLON.Color3.Gray());
					WTW.highlightLayer.outerGlow = true;
					WTW.highlightLayer.innerGlow = false;
				} catch(ex){}
			}
		}
		window.setTimeout(function() {
			var ztimername  = window.setInterval(function(){
				var zavatar = scene.getMeshByID(zavatarname);
				if (zavatar != null) {
					var zscalingx = .04;
					var zscalingy = .04;
					var zscalingz = .04;
					if (zavatar.WTW != null) {
						if (zavatar.WTW.scaling != null) {
							if (zavatar.WTW.scaling.x != null) {
								if (WTW.isNumeric(zavatar.WTW.scaling.x)) {
									zscalingx = Number(zavatar.WTW.scaling.x);
								}
							}
							if (zavatar.WTW.scaling.y != null) {
								if (WTW.isNumeric(zavatar.WTW.scaling.y)) {
									zscalingy = Number(zavatar.WTW.scaling.y);
								}
							}
							if (zavatar.WTW.scaling.z != null) {
								if (WTW.isNumeric(zavatar.WTW.scaling.z)) {
									zscalingz = Number(zavatar.WTW.scaling.z);
								}
							}
						}
					}
					var zavatarscale = scene.getMeshByID(zavatarname + "-scale");
					if (zavatarscale != null) {
						var zsetscalingx = zavatarscale.scaling.x;
						var zsetscalingy = zavatarscale.scaling.y;
						var zsetscalingz = zavatarscale.scaling.z;
						if (zsetscalingx < zscalingx) {
							zavatarscale.scaling.x += .001;
						} else {
							zsetscalingx = zscalingx;
							zavatarscale.scaling.x = zscalingx;
						}
						if (zsetscalingy < zscalingy) {
							zavatarscale.scaling.y += .001;
						} else {
							zsetscalingy = zscalingy;
							zavatarscale.scaling.y = zscalingy;
						}
						if (zsetscalingz < zscalingz) {
							zavatarscale.scaling.z += .001;
						} else {
							zsetscalingz = zscalingz;
							zavatarscale.scaling.z = zscalingz;
						}
						if (zsetscalingx == zscalingx && zsetscalingy == zscalingy && zsetscalingz == zscalingz) {
							var zsmoke = scene.getMeshByID(zavatarname + "-smoke");
							if (zsmoke != null) {
								zsmoke.position.y -= 1000;
								window.setTimeout(function(){WTW.disposeClean(zavatarname + "-smoke");},7000);
							}
							var zavatarparts = zavatarscale.getChildren();
							for (var i=0; i<zavatarparts.length;i++) {
								if (zavatarparts[i] != null) {
									try {
										WTW.highlightLayer.removeMesh(zavatarparts[i]);
									} catch(ex){}
								}
							} 
							window.clearInterval(ztimername);
							WTW.myAvatarLoadComplete(zavatarname);
						}
					}
				}
			},40);
		},300);
    } catch (ex) {
		WTW.log("avatars-loadavatar-avatarShowGrowGlowSmoke=" + ex.message);
    }
}

WTWJS.prototype.avatarShowBeam = function(zavatarname, zavatarparts) {
	try {
		var zavatar = scene.getMeshByID(zavatarname);
		if (zavatar != null) {
			var zmold = WTW.addMoldParticleShower(zavatarname + "-sprite", null, 1, 2.4, 1);
			zmold.parent = zavatar;
			zmold.position.y += 3;
		}
		for (var i=0; i<zavatarparts.length;i++) {
			if (zavatarparts[i] != null) {
				if (zavatarparts[i].material != null) {
					zavatarparts[i].material.alpha = 0;
				}
				zavatarparts[i].isVisible = true;
			}
		}
		window.setTimeout(function() {
			var ztimername  = window.setInterval(function(){
				var zavatar = scene.getMeshByID(zavatarname);
				if (zavatar != null) {
					var zavatarscale = scene.getMeshByID(zavatarname + "-scale");
					if (zavatarscale != null) {
						var zavatarparts = zavatarscale.getChildren();
						var zchildalpha = 0;
						for (var i=0; i<zavatarparts.length;i++) {
							if (zavatarparts[i] != null) {
								if (zavatarparts[i].material != null) {
									zchildalpha = zavatarparts[i].material.alpha;
									if (zchildalpha < 1) {
										zchildalpha += .01;
									} else {
										zchildalpha = 1;
									}
									zavatarparts[i].material.alpha = zchildalpha;
								}
							}
						} 
						if (zchildalpha == 1) {
							WTW.disposeClean(zavatarname + "-sprite");
							window.clearInterval(ztimername);
							WTW.myAvatarLoadComplete(zavatarname);
						}
					}
				}
			},50);
		},1500);
    } catch (ex) {
		WTW.log("avatars-loadavatar-avatarShowBeam=" + ex.message);
    }
}

WTWJS.prototype.getMyAvatar = function(avatarind) {
	try {
		var myavatarid = dGet('wtw_tmyavatarid').value;
		if (dGet('wtw_tuserid').value == '') {
			myavatarid = dGet('wtw_tmyavataridanon').value;
		}
		if (avatarind == undefined) {
			if (dGet('wtw_tuserid').value == '') {
				avatarind = WTW.getCookie("avatarind");
			} else {
				avatarind = dGet('wtw_tavatarind').value;
			}
		}
		if (WTW.isNumeric(avatarind)) {
			avatarind = Number(avatarind);
		} else {
			avatarind = 1;
		}
		var avatardef = WTW.newAvatarDef();
		var def = WTW.getAvatarSettings(avatarind);
		avatardef.object.folder = def.objectfolder;
		avatardef.object.file = def.objectfile;
		avatardef.object.walkspeed = def.walkspeed;
		avatardef.scaling.x = def.scalingx;
		avatardef.scaling.y = def.scalingy;
		avatardef.scaling.z = def.scalingz;
		avatardef.lastscaling.x = def.scalingx;
		avatardef.lastscaling.y = def.scalingy;
		avatardef.lastscaling.z = def.scalingz;
		avatardef.avatarind = avatarind;
		avatardef.object.objectanimations = null;
		WTW.loadMyAvatar(avatardef);
    } catch (ex) {
		WTW.log("avatars-loadavatar-getMyAvatar=" + ex.message);
    }
}

WTWJS.prototype.getAvatarSettings = function(avatarind) {
	var objectfolder = "/content/system/avatars/male/";
	var objectfile = "maleidle.babylon";
	var walkspeed = ".5";
	var scalingx = '.04';
	var scalingy = '.04';
	var scalingz = '.04';
	try {
		if (avatarind > -1) {
			switch (avatarind) {
				case 1:
					scalingx = '.08';
					scalingy = '.08';
					scalingz = '.08';
					objectfolder = "/content/system/avatars/female/";
					objectfile = "femaleidle.babylon";
					break;
				case 2:
					scalingx = '.08';
					scalingy = '.08';
					scalingz = '.08';
					objectfolder = "/content/system/avatars/male/";
					objectfile = "maleidle.babylon";
					break;
				case 3:
					objectfolder = "/content/system/avatars/remy/";
					objectfile = "remyidle.babylon";
					break;
				case 4:
					scalingx = '.07';
					scalingy = '.07';
					scalingz = '.07';
					objectfolder = "/content/system/avatars/jasper/";
					objectfile = "jasperidle.babylon";
					break;
				case 5:
					objectfolder = "/content/system/avatars/malcolm/";
					objectfile = "malcolmidle.babylon";
					break;
				case 6:
					objectfolder = "/content/system/avatars/liam/";
					objectfile = "liamidle.babylon";
					break;
				case 7:
					objectfolder = "/content/system/avatars/stefani/";
					objectfile = "stefaniidle.babylon";
					break;
				case 8:
					scalingx = '.07';
					scalingy = '.07';
					scalingz = '.07';
					objectfolder = "/content/system/avatars/pearl/";
					objectfile = "pearlidle.babylon";
					break;
				case 9:
					objectfolder = "/content/system/avatars/regina/";
					objectfile = "reginaidle.babylon";
					break;
				case 10:
					objectfolder = "/content/system/avatars/shae/";
					objectfile = "shaeidle.babylon";
					break;
			}
		}		
    } catch (ex) {
		WTW.log("avatars-loadavatar-getAvatarSettings=" + ex.message);
    }
	return {
		'objectfolder':objectfolder,
		'objectfile':objectfile,
		'walkspeed':walkspeed,
		'scalingx':scalingx,
		'scalingy':scalingy,
		'scalingz':scalingz
	}
}

WTWJS.prototype.loadAvatarAnimationDefinitions = function(avatarind, customanimationdefs) {
	var animationdefs = [];
	try {
		animationdefs = WTW.newAvatarAnimationDefs(avatarind);
		if (customanimationdefs != null) {
			if (customanimationdefs.length > 0) {
				for (var i=0;i<animationdefs.length;i++) {
					if (animationdefs[i] != null) {
						var animname = animationdefs[i].animationname;
						for (var j=0;j<customanimationdefs.length;j++) {
							if (customanimationdefs[j] != null) {
								if (customanimationdefs[j].animationname == animname) {
									animationdefs[i].useravataranimationid = customanimationdefs[j].useravataranimationid;
									animationdefs[i].avataranimationid = customanimationdefs[j].avataranimationid;
									animationdefs[i].objectfolder = customanimationdefs[j].objectfolder;
									animationdefs[i].objectfile = customanimationdefs[j].objectfile;
									animationdefs[i].startframe = customanimationdefs[j].startframe;
									animationdefs[i].endframe = customanimationdefs[j].endframe;
									animationdefs[i].animationloop = customanimationdefs[j].animationloop;
									animationdefs[i].defaultspeedratio = customanimationdefs[j].defaultspeedratio;
									animationdefs[i].speedratio = customanimationdefs[j].speedratio;
									animationdefs[i].walkspeed = customanimationdefs[j].walkspeed;
								}
							}
						}
					}
				}
				for (var j=0;j<customanimationdefs.length;j++) {
					if (customanimationdefs[j] != null) {
						var animname = customanimationdefs[j].animationname;
						var found = 0;
						for (var i=0;i<animationdefs.length;i++) {
							if (animationdefs[i] != null) {
								if (animationdefs[i].animationname == animname && animname != "onoption") {
									found = 1;
								}
							}
						}
						if (found == 0) {
							animationdefs[animationdefs.length] = customanimationdefs[j];
						}
					}
				}
			}
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-loadAvatarAnimationDefinitions=" + ex.message);
    }
	return animationdefs;
}

WTWJS.prototype.openChangeAvatar = function() {
	try {
		WTW.setupMode = 1;
		var setupparent = scene.getMeshByID("setupparent-0");
		if (setupparent == null) {
			var setupparent = BABYLON.MeshBuilder.CreateBox("setupparent-0", {}, scene);
			setupparent.material = WTW.addCovering("hidden", "setupparent-0", WTW.newAvatarDef(), 1, 1, 1, "0", "0");
			setupparent.material.alpha = 0;
		}
		setupparent.position.x = -20;
		setupparent.position.y = 0;
		setupparent.position.z = 0;
		setupparent.rotation.y = WTW.getRadians(90);
		setupparent.parent = WTW.myAvatar;
		WTW.loadSetupMode();
    } catch (ex) {
		WTW.log("avatars-loadavatar-openSelectAvatar=" + ex.message);
    }
}

WTWJS.prototype.closeSelectAvatar = function() {
	try {
		WTW.addDisposeMoldToQueue("setupavataranonymous-0");
		WTW.addDisposeMoldToQueue("SelectAvatarGate-0");
		var meshes = scene.meshes;
		if (meshes != null) {
			for (var i=0;i<meshes.length;i++) {
				if (meshes[i] != null) {
					if (meshes[i].name.indexOf("selectavatar") > -1) {
						meshes[i].isVisible = false;
						WTW.addDisposeMoldToQueue(meshes[i].name);
					}
				}
			}
		} 
		WTW.disposeClean("setupavataranonymous-0");
	} catch (ex) {
		WTW.log("avatars-loadavatar-closeSelectAvatar=" + ex.message);
    }
}

WTWJS.prototype.setAvatarVisible = function(avatarname, isvisible) {
	try {
		var meshes = scene.meshes;
		if (meshes != null) {
			for (var i=0;i<meshes.length;i++) {
				if (meshes[i] != null) {
					if (meshes[i].name.indexOf(avatarname) > -1) {
						meshes[i].isVisible = isvisible; //true or false
					}
				}
			}
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-setAvatarVisible=" + ex.message);
    }
}

WTWJS.prototype.logoutMyAvatar = function() {
	try {
		WTW.disposeClean("myavatar-" + dGet("wtw_tinstanceid").value);
		WTW.getSavedAvatar();
	} catch (ex) {
		WTW.log("avatars-loadavatar-logoutMyAvatar=" + ex.message);
	}
}

WTWJS.prototype.showAvatarDisplayName = function(zopen) {
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
			dGet('wtw_menudisplayname').innerHTML = dGet('wtw_tavatardisplayname').value;
		}
		if (zopen) {
			WTW.toggle('wtw_menuavatardisplaynamediv');
		}
	} catch (ex) { 
		WTW.log("avatars-loadavatar-showAvatarDisplayName=" + ex.message);
	}
}

WTWJS.prototype.saveAvatarDisplayName = function() {
	try {
		if (dGet('wtw_tuserid').value != '') {
			WTW.myAvatar.WTW.displayname = dGet('wtw_tavatardisplayname').value;
			if (dGet('wtw_tavatardisplayname').value == '') {
				dGet('wtw_tavatardisplayname').value = dGet('wtw_menudisplayname').innerHTML;
			}
			if (dGet('wtw_tavatardisplayname').value == '') {
				dGet('wtw_tavatardisplayname').value = dGet('wtw_tusername').value;
			}
			dGet('wtw_menudisplayname').innerHTML = dGet('wtw_tavatardisplayname').value;
			dGet('wtw_teditdisplayname').value = dGet('wtw_tavatardisplayname').value;
			var zrequest = {
				'avatarid': dGet('wtw_tmyavatarid').value,
				'instanceid': dGet("wtw_tinstanceid").value,
				'avatardisplayname': dGet('wtw_tavatardisplayname').value,
				'function':'saveavatardisplayname'
			};
			WTW.postJSON("/core/handlers/avatars.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
				}
			);
		}
	} catch (ex) { 
		WTW.log("avatars-loadavatar-saveAvatarDisplayName=" + ex.message);
	}
}

WTWJS.prototype.toggleMenuAnimations = function() {
	try {
		if (dGet('wtw_menuoptionalanimations').style.display == 'none') {
			var listoptionalanimations = "";
			var avatar = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value);
			if (avatar != null) {
				if (avatar.WTW.animations != undefined) {
					
					for (var i=avatar.WTW.animations.length;i>-1;i--) {
						if (avatar.WTW.animations[i] != null) {
							var animdef = avatar.WTW.animations[i];
							if (animdef.animationname.indexOf('onoption') > -1) {
								var icon = "/content/system/icons/animdefault.png";
								if (animdef.animationicon != '') {
									icon = animdef.animationicon;
								}
								listoptionalanimations += "<div id='wtw_playanimation" + i + "' class='wtw-animationicondiv'";
								listoptionalanimations += " onmousedown=\"WTW.runOptionalAnimation(this,'" + animdef.animationname + "')\"";
								listoptionalanimations += " onmouseup=\"WTW.stopOptionalAnimation(this,'" + animdef.animationname + "')\"";
								listoptionalanimations += " onpointerdown=\"WTW.runOptionalAnimation(this,'" + animdef.animationname + "')\"";
								listoptionalanimations += " onpointerup=\"WTW.stopOptionalAnimation(this,'" + animdef.animationname + "')\"";
								listoptionalanimations += " ontouchstart=\"WTW.runOptionalAnimation(this,'" + animdef.animationname + "')\"";
								listoptionalanimations += " ontouchend=\"WTW.stopOptionalAnimation(this,'" + animdef.animationname + "')\">";
								listoptionalanimations += "<img src='" + icon + "' class='wtw-animationicon' alt='" + animdef.animationfriendlyname + "' title='" + animdef.animationfriendlyname + "' /></div>";
							}
						}
					}
				}
			}
			listoptionalanimations += "<div id='wtw_editplayanimations' class='wtw-animationicondiv' onclick=\"WTW.editPlayAnimations();\">";
			listoptionalanimations += "<br />Select<br /><br />Animations<br /></div>";
			dGet('wtw_listoptionalanimations').innerHTML = listoptionalanimations;
			WTW.show('wtw_menuoptionalanimations');
			var menuwidth = dGet('wtw_menuoptionalanimations').clientWidth;
			if (dGet('wtw_menuoptionanimations') != null) {
				var icon = dGet('wtw_menuoptionanimations').getBoundingClientRect();
				dGet('wtw_menuoptionalanimations').style.left = (icon.left + 12 - (menuwidth/2)) + 'px';
			}
		} else {
			WTW.hide('wtw_menuoptionalanimations');
		}
	} catch (ex) { 
		WTW.log("avatars-loadavatar-toggleMenuAnimations=" + ex.message);
	}
}

WTWJS.prototype.editPlayAnimations = function() {
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
		WTW.log("avatars-loadavatar-editPlayAnimations=" + ex.message);
	}
}

WTWJS.prototype.runOptionalAnimation = function(objdiv, animationname) {
	try {
		WTW.canvasFocus = 0;
		var e = e || window.event;
		e.preventDefault();
		objdiv.className='wtw-animationiconplaydiv';
		WTW.keyPressedAdd(animationname);
	} catch (ex) { 
		WTW.log("avatars-loadavatar-runOptionalAnimation=" + ex.message);
	}
}

WTWJS.prototype.stopOptionalAnimation = function(objdiv, animationname) {
	try {
		WTW.canvasFocus = 1;
		var e = e || window.event;
		e.preventDefault();
		WTW.keyPressedRemove(animationname);
		objdiv.className='wtw-animationicondiv';
	} catch (ex) { 
		WTW.log("avatars-loadavatar-stopOptionalAnimation=" + ex.message);
	}
}

WTWJS.prototype.loadAvatarAnimations = function(avatarname, easingfunction, animationind, frametotal, lastframecount, enteranimate) {
	try {
		if (animationind == undefined) {
			animationind = 0;
		}
		if (frametotal == undefined) {
			frametotal = 1;
		}
		if (lastframecount == undefined) {
			lastframecount = 0;
		}
		if (enteranimate == undefined) {
			enteranimate = true;
		}
		var avatar = scene.getMeshByID(avatarname);
		if (avatar != null) {
			if (avatar.WTW != null) {
				if (avatar.WTW.animations != null && avatar.WTW.skeleton != null) {
					if (avatar.WTW.animations[animationind] != null) {
						var animation = avatar.WTW.animations[animationind];
						if (animation.objectfolder != '' && animation.objectfile != '') {
							BABYLON.SceneLoader.ImportMeshAsync("", animation.objectfolder, animation.objectfile, scene).then( function (walkresults) {
								var avatarparent = scene.getMeshByID(avatarname + "-scale");
								frametotal += lastframecount + 1;
/*								for (var i=0; i < walkresults.meshes.length; i++) {
									if (walkresults.meshes[i] != null) {
										if (walkresults.meshes[i].parent == null) {
											walkresults.meshes[i].parent = avatarparent;
										}
									}
								} */
								var walkskeleton = walkresults.skeletons[0];
								if (walkskeleton.parent == null) {
									walkskeleton.parent = avatarparent;
								}
								if (animation.startweight == undefined) {
									animation.startweight = 0;
								}
								if (animation.animationname == "onoption") {
									animation.animationname = "onoption" + animation.avataranimationid;
								}
								walkskeleton.createAnimationRange(animation.animationname, Number(animation.startframe), Number(animation.endframe));
								for (var m=0;m<walkresults.meshes.length;m++) {
									if (walkresults.meshes[m] != null) {
										walkresults.meshes[m].dispose();
									}
								}
								avatar.WTW.skeleton.copyAnimationRange(walkskeleton, animation.animationname, true);
								if (easingfunction != undefined && easingfunction != null) {
									for (var c=0; c < avatar.WTW.skeleton.bones.length; c++) {
										avatar.WTW.skeleton.bones[c].animations[0].setEasingFunction(easingfunction);
									}
								}
								var totalframes = Number(animation.endframe);
								var totalendframe = (frametotal + Number(animation.endframe) - Number(animation.startframe));
								var totalstartframe = totalendframe - animation.endframe;
								if (avatar.WTW.animations[animationind] != null) {
									avatar.WTW.animations[animationind].totalframes = animation.endframe;
									avatar.WTW.animations[animationind].totalstartframe = totalstartframe;
									avatar.WTW.animations[animationind].totalendframe = totalendframe;
								}
								if (enteranimate) {
									avatar.WTW.animations.running[animation.animationname] = scene.beginWeightedAnimation(avatar.WTW.skeleton, frametotal, totalendframe, animation.startweight, animation.animationloop, Number(animation.speedratio));
								}
								if (enteranimate == false) {
									avatar.WTW.animations.running[animation.animationname] = scene.beginWeightedAnimation(avatar.WTW.skeleton, Number(avatar.WTW.animations[animationind].totalstartframe), Number(avatar.WTW.animations[animationind].totalendframe), animation.startweight, animation.animationloop, Number(animation.speedratio), animation.onanimationend);
								} else if (avatar.WTW.animations[animationind + 1] != null) {
									lastframecount = Number(animation.endframe) - Number(animation.startframe) + 1;
									WTW.loadAvatarAnimations(avatarname, easingfunction, animationind + 1, frametotal, lastframecount);
								} else if (avatarname.indexOf('myavatar-') > -1) {
									WTW.toggleMenuAnimations();
									WTW.toggleMenuAnimations();
									WTW.showAvatarDisplayName(false);
									WTW.pluginsMyAnimationsLoaded();
									if (enteranimate) {
										WTW.avatarEnter(avatarname);
									} else {
										WTW.avatarShowVisible(avatarname);
									}
								} else {
									if (enteranimate) {
										WTW.avatarEnter(avatarname);
									} else {
										WTW.avatarShowVisible(avatarname);
									}
								}
							}); 
						}
					}
				}
			}
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-loadAvatarAnimations=" + ex.message);
    }
}

WTWJS.prototype.myAvatarLoadComplete = function(zavatarname) {
	try {
		if (zavatarname.indexOf('myavatar-') > -1) {
			WTW.myAvatar.WTW.loaded = true;
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-myAvatarLoadComplete=" + ex.message);
    }
}

WTWJS.prototype.changeAvatarAnimation = function(selobj) {
	try {
		var myavatarid = dGet('wtw_tmyavatarid').value;
		if (dGet('wtw_tuserid').value == '') {
			myavatarid = dGet('wtw_tmyavataridanon').value;
		}
		var animationdata = WTW.getDDLValue(selobj.id);
		var avataranimationid = "";
		var animationname = "";
		var speedratio = 1;
		var startframe = 1;
		var endframe = 1;
		var objectfolder = "";
		var objectfile = "";
		var loadpriority = 0;
		var animationicon = "";
		var animationfriendlyname = "";
		var useravataranimationid = "";
		var found = -1;
		if (animationdata.indexOf('|') > -1) {
			animationdatapart = animationdata.split('|');
			useravataranimationid = animationdatapart[0];
			avataranimationid = animationdatapart[1];
			speedratio = Number(animationdatapart[2]);
			animationname = animationdatapart[3];
			startframe = Number(animationdatapart[4]);
			endframe = Number(animationdatapart[5]);
			objectfolder = animationdatapart[6];
			objectfile = animationdatapart[7];
			animationfriendlyname = animationdatapart[8];
			loadpriority = Number(animationdatapart[9]);
			animationicon = animationdatapart[10];
			if (useravataranimationid == null) {
				useravataranimationid = '';
			}
			if (dGet(selobj.id + "-value") != null) {
				useravataranimationid = dGet(selobj.id + "-value").value;
			}
			var myavatarid = dGet('wtw_tmyavatarid').value;
			if (dGet('wtw_tuserid').value == '') {
				myavatarid = dGet('wtw_tmyavataridanon').value;
			}
			var avatarname = "myavatar-" + dGet("wtw_tinstanceid").value;
			WTW.loadAvatarAnimation(avatarname, useravataranimationid, animationfriendlyname, animationicon, avataranimationid, animationname, objectfolder, objectfile, startframe, endframe, speedratio, loadpriority);
			var zrequest = {
				'avatarid': myavatarid,
				'useravataranimationid': useravataranimationid,
				'avataranimationid':avataranimationid,
				'instanceid': dGet("wtw_tinstanceid").value,
				'avataranimationname':dGet('wtw_tavataranimationname').value,
				'speedratio':speedratio,
				'function':'saveavataranimation'
			};
			WTW.postJSON("/core/handlers/avatars.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					if (zresponse.useravataranimationid != undefined) {
						useravataranimationid = zresponse.useravataranimationid;
					}
					WTW.updateAnimSelectValue(selobj.id + '-value', useravataranimationid);
				}
			);
		}
		selobj.blur();
    } catch (ex) {
		WTW.log("avatars-loadavatar-changeAvatarAnimation=" + ex.message);
    }
}

WTWJS.prototype.loadAvatarAnimation = function(avatarname, useravataranimationid, animationfriendlyname, animationicon, avataranimationid, animationname, objectfolder, objectfile, startframe, endframe, speedratio, startweight, loadpriority, animationloop, onanimationend) {
	try {
		if (loadpriority == undefined) {
			loadpriority = 0;
		}
		if (animationloop == undefined) {
			animationloop = true;
		}
		if (onanimationend == undefined) {
			onanimationend = null;
		}
		if (startweight == undefined) {
			startweight = 0;
		}
		var found = -1;
		var avatar = scene.getMeshByID(avatarname);
		if (avatar != null) {
			if (avatar.WTW.animations != undefined) {
				var totalendframe = 0;
				var totalframes = 0;
				for (var i=avatar.WTW.animations.length;i>-1;i--) {
					if (avatar.WTW.animations[i] != null) {
						if (avatar.WTW.animations[i].useravataranimationid == useravataranimationid && animationname == "onoption" && useravataranimationid != '') {
							if (avatar.WTW.animations.running['onoption' + avatar.WTW.animations[i].avataranimationid] != undefined) {
								avatar.WTW.animations.running['onoption' + avatar.WTW.animations[i].avataranimationid].stop();
							}
							found = i;
						} else if (animationname != "onoption") {
							if (avatar.WTW.animations.running[animationname] != undefined) {
								avatar.WTW.animations.running[animationname].stop();
								avatar.WTW.skeleton.deleteAnimationRange(animationname,false);
							}
							if (animationname == avatar.WTW.animations[i].animationname && found == -1) {
								found = i;
							}
						}
						if (Number(avatar.WTW.animations[i].totalendframe) > totalendframe) {
							totalendframe = Number(avatar.WTW.animations[i].totalendframe);
							totalframes = Number(avatar.WTW.animations[i].totalframes);
						}
					}
				}
				if (found == -1) {
					found = avatar.WTW.animations.length;
					avatar.WTW.animations[found] = WTW.newAvatarAnimationDef();
				}
				avatar.WTW.animations[found].useravataranimationid = useravataranimationid;
				avatar.WTW.animations[found].avataranimationid = avataranimationid;
				avatar.WTW.animations[found].speedratio = speedratio;
				avatar.WTW.animations[found].animationname = animationname;
				avatar.WTW.animations[found].startframe = startframe;
				avatar.WTW.animations[found].endframe = endframe;
				avatar.WTW.animations[found].objectfolder = objectfolder;
				avatar.WTW.animations[found].objectfile = objectfile;
				avatar.WTW.animations[found].animationfriendlyname = animationfriendlyname;
				avatar.WTW.animations[found].loadpriority = loadpriority;
				avatar.WTW.animations[found].animationicon = animationicon;
				avatar.WTW.animations[found].animationloop = animationloop;
				avatar.WTW.animations[found].onanimationend = onanimationend;
				avatar.WTW.animations[found].startweight = startweight;
				
				var easingFunction = new BABYLON.QuinticEase(); /*QuadraticEase();*/
				easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

				totalendframe += 1;
				WTW.loadAvatarAnimations(avatarname, easingFunction, found, totalendframe, 0, false);
			}
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-loadAvatarAnimation=" + ex.message);
    }
}

WTWJS.prototype.disposeAnimations = function(avatarname) {
	try {
		var avatar = scene.getMeshByID(avatarname);
		if (avatar != null) {
			if (avatar.WTW != null) {
				if (avatar.WTW.animations != null) {
					if (avatar.WTW.animations.running != null) {
						for(var key in avatar.WTW.animations.running) {
							if (avatar.WTW.animations.running[key] != null) {
								if (typeof avatar.WTW.animations.running[key].stop == 'function') {
									avatar.WTW.animations.running[key].stop();
								}
								avatar.WTW.animations.running[key] = null;
							}
						}
					}
					avatar.WTW.animations = null;
					avatar.WTW.animations = [];
				}
			}
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-disposeAnimations=" + ex.message);
    }
}

WTWJS.prototype.loadSit = function(avatarname) {
	try {
		var useravataranimationid = "cccccccccccccccc";
		var avataranimationid = "dddddddddddddddd";
		WTW.loadAvatarAnimation(avatarname, useravataranimationid, 'Sit Wait', '', avataranimationid, 'onsitwait', '/content/system/animations/movement/', 'sitwait.babylon', 1, 155, 1, 0, 0);
    } catch (ex) {
		WTW.log("avatars-loadavatar-loadSit=" + ex.message);
    }
}

WTWJS.prototype.startSit = function(moldname) {
	try {	
		var avatarname = "myavatar-" + dGet("wtw_tinstanceid").value;
		var avatar = scene.getMeshByID(avatarname);
		if (avatar != null) {
			var moldnameparts = WTW.getMoldnameParts(moldname);
			var actionzonename = moldnameparts.parentname;
			var actionzoneaxle = scene.getMeshByID(actionzonename.replace("actionzoneaxlebase-","actionzoneaxle-"));
			if (actionzoneaxle != null) {
				WTW.walkToPosition(avatarname, actionzoneaxle, 'WTW.setSit', actionzoneaxle);
			}
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-startSit=" + ex.message);
    }
}

WTWJS.prototype.setSit = function(moldtomatch) {
	try {	
		/* walk to position, rotate then */
/*						
		WTW.keyPressedAdd('onsitwait');
		var sitdist = 0;
		var sitmove = window.setInterval(function() {
			avatar.translate(BABYLON.Axis.Z, .1, BABYLON.Space.LOCAL);
			if (sitdist > 4.4) {
				window.clearInterval(sitmove);
			} else {
				sitdist += .1;
			}
		},10); 
*/					
    } catch (ex) {
		WTW.log("avatars-loadavatar-setSit=" + ex.message);
    }
}

WTWJS.prototype.walkToPosition = function(avatarname, moldtomatch, functionname, parameters) {
	try {
		var avatar = scene.getMeshByID(avatarname);
		if (avatar != null) {
			var abspos = WTW.getWorldPosition(moldtomatch);
			var absrot = WTW.getWorldRotation(moldtomatch);

			if (avatar.position != abspos) {
				var angledegy = WTW.cleanDegrees(WTW.getDegrees(Math.atan((abspos.x-avatar.position.x)/(abspos.z-avatar.position.z))) + 180);
				var avatardeg = WTW.getDegrees(avatar.rotation.y);
				var moveavatar = window.setInterval(function(){
					var targetangle = WTW.getMyAngleToPoint(abspos.x,abspos.z);
					var avatardeg = WTW.getDegrees(avatar.rotation.y);
					var dir = 1;
					var degleft = 0;
					var walk = 1;
					var dx = (abspos.x - avatar.position.x);
					var dz = (abspos.z - avatar.position.z);
					var dist = Math.sqrt((dx * dx) + (dz * dz));
					if (Math.round(targetangle) == 0 || Math.round(targetangle) == 360 || dist < 3) {
						dir = 0;
					} else if (targetangle < 1) {
						dir = -.1;
						degleft = targetangle;
					} else if (targetangle < 2) {
						dir = -.5;
						degleft = targetangle;
					} else if (targetangle < 10) {
						dir = -1;
						degleft = targetangle;
					} else if (targetangle < 30) {
						dir = -5;
						degleft = targetangle;
					} else if (targetangle < 90) {
						dir = -10;
						degleft = targetangle;
					} else if (targetangle < 180) {
						dir = -15;
						degleft = targetangle;
					} else {
						degleft = 360 - targetangle;
					}
					avatardeg += dir;
					avatar.rotation.y = WTW.getRadians(avatardeg);
					if (dist < 3) {
						walk = 0;
						WTW.keyPressedRemove('onwalk');
					} else {
						WTW.keyPressedAdd('onwalk');
					}
					if (degleft < 3 && walk == 0) {
						window.clearInterval(moveavatar);
						avatar.position.x = abspos.x;
						avatar.position.z = abspos.z;
						WTW.executeFunctionByName(functionname, window, parameters);
					}
				},10);
			} else {
				WTW.executeFunctionByName(functionname, window, parameters);
			}
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-walkToPosition=" + ex.message);
    }
}

WTWJS.prototype.turnToRotation = function(avatarname, moldtoface, functionname, parameters) {
	try {
		var avatar = scene.getMeshByID(avatarname);
		if (avatar != null) {
			var abspos = WTW.getWorldPosition(moldtoface);
			var angle = WTW.getMyAngleToPoint(abspos.x, abspos.z);
			
			var moveavatar = window.setInterval(function(){
				WTW.moveOverride = 1;
				var targetangle = WTW.getMyAngleToPoint(abspos.x,abspos.z);
				var avatardeg = WTW.getDegrees(avatar.rotation.y);
				var dir = 1;
				var degleft = 0;
				if (Math.round(targetangle) == 0 || Math.round(targetangle) == 360) {
					dir = 0;
				} else if (targetangle < 2) {
					dir = -targetangle;
					degleft = targetangle;
				} else if (targetangle < 180) {
					dir = -1;
					degleft = targetangle;
				} else {
					degleft = 360 - targetangle;
				}
				avatardeg += dir;
				avatar.rotation.y = WTW.getRadians(avatardeg);
				if (dir > 1) {
					WTW.keyPressedAdd('onrunturnright');
				} else {
					WTW.keyPressedAdd('onrunturnleft');
				}
				if (degleft < 1) {
					window.clearInterval(moveavatar);
					WTW.keyPressedRemove('onrunturnright');
					WTW.keyPressedRemove('onrunturnleft');
					WTW.moveOverride = 0;
					WTW.executeFunctionByName(functionname, window, parameters);
				}
			},10);			
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-turnToRotation=" + ex.message);
    }
}

WTWJS.prototype.cancelSit = function(avatar, moveevents) {
	try {
		if (WTW.isInMovementEvents(moveevents, 'onsitwait')) {
			WTW.keyPressedAdd('onwait');
			WTW.keyPressedRemove('onsitwait');
			var dist = 0;
			var sitmove = window.setInterval(function() {
				var movedist = -.1;
				if (dist < .5) {
					movedist = -.5;
				}
				avatar.translate(BABYLON.Axis.Z, movedist, BABYLON.Space.LOCAL);
				if (dist < -4.4) {
					window.clearInterval(sitmove);
					WTW.keyPressedRemove('onwait');
				} else {
					dist += movedist;
				}
			},10);
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-cancelSit=" + ex.message);
    }
}

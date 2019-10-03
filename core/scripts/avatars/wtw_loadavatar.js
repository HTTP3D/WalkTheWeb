WTWJS.prototype.loadSetupMode = function() {
	try {
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

WTWJS.prototype.nextSetupMode = function(avatarname) {
	try {
		if (avatarname.indexOf("selectavatar") > -1) {
			if (WTW.myAvatar != null) {
				WTW.disposeClean(WTW.myAvatar.name);
			}
			var nameparts = avatarname.split('-');
			var avatarind = Number(nameparts[1]);
			if (dGet('wtw_tuserid').value == '') {
				WTW.setCookie("avatarind", avatarind, 365);
			}
			dGet('wtw_tavatarind').value = avatarind;
			WTW.getMyAvatar(avatarind);
			WTW.loadCameraSettings();
			WTW.currentID = "";
			WTW.editMyAvatar();
			var myavatarid = dGet('wtw_tmyavatarid').value;
			if (dGet('wtw_tuserid').value == '') {
				myavatarid = dGet('wtw_tmyavataridanon').value;
			}
			var objectfolder = "";
			var objectfile = "";
			var scalingx = 1;
			var scalingy = 1;
			var scalingz = 1;
			if (WTW.myAvatar.WTW != null) {
				if (WTW.myAvatar.WTW.object.folder != undefined) {
					objectfolder = WTW.myAvatar.WTW.object.folder;
				}
				if (WTW.myAvatar.WTW.object.file != undefined) {
					objectfile = WTW.myAvatar.WTW.object.file;
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
			var request = {
				'myavatarid':myavatarid,
				'instanceid':dGet("wtw_tinstanceid").value,
				'userip':dGet("wtw_tuserip").value,
				'avatarind':dGet('wtw_tavatarind').value,
				'scalingx':scalingx,
				'scalingy':scalingy,
				'scalingz':scalingz,
				'objectfolder':objectfolder,
				'objectfile':objectfile
			};
			/* function for after iframe loads */
			var onload = function(ipage) {
				ipage.getElementById('wtw_tmyavatarid').value = request.myavatarid;
				ipage.getElementById('wtw_tinstanceid').value = request.instanceid;
				ipage.getElementById('wtw_tuserip').value = request.userip;
				ipage.getElementById('wtw_tavatarind').value = request.avatarind;
				ipage.getElementById('wtw_tscalingx').value = request.scalingx;
				ipage.getElementById('wtw_tscalingy').value = request.scalingy;
				ipage.getElementById('wtw_tscalingz').value = request.scalingz;
				ipage.getElementById('wtw_tobjectfolder').value = request.objectfolder;
				ipage.getElementById('wtw_tobjectfile').value = request.objectfile;
				ipage.getElementById('wtw_bsaveavatar').click();
			}
			/* iframe src, onload function */
			var iframe = WTW.createIFrame('/core/iframes/avatars.php', onload);
			WTW.closeSelectAvatar();
			WTW.hide('wtw_menuavatarchangediv');
			WTW.showSettingsMenu('wtw_menuavatar');
		} else if (avatarname.indexOf("myavatar-" + dGet("wtw_tinstanceid").value) > -1) {
			if (dGet('wtw_menuavatarcolordiv').style.display != 'none') {
				WTW.editAvatarPart(avatarname);
			}
			var selavatar = scene.getMeshByID("selectavatar-1-preview");
			if (selavatar != null) {
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
		dGet('wtw_tmyavatarid').value = zavatarid;
    } catch (ex) {
		WTW.log("avatars-loadavatar-setAvatarID=" + ex.message);
    }
}

WTWJS.prototype.getSessionAvatar = function() {
	try {
		var request = {
			'instanceid':dGet("wtw_tinstanceid").value
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tinstanceid').value = request.instanceid;
			ipage.getElementById('wtw_bgetsession').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/avatars.php', onload);
    } catch (ex) {
		WTW.log("avatars-loadavatar-getSessionAvatar=" + ex.message);
    }
}

WTWJS.prototype.loadUserSession = function(response) {
	try {
		if (response != null) {
			if (response.avatarind != undefined) {
				if (dGet("wtw_tuserid").value == '') {
					dGet('wtw_tmyavataridanon').value = response.myavatarid;
					WTW.setCookie("myavataridanon", response.myavatarid, 365);
				} else {
					dGet('wtw_tmyavatarid').value = response.myavatarid;
					WTW.setCookie("myavatarid", response.myavatarid, 365);
				}
				dGet('wtw_tavatarind').value = response.avatarind;
				dGet('wtw_tuploadpathid').value = response.uploadpathid;
				dGet('wtw_tuseremail').value = response.email;
				if (response.username != '' && response.username != undefined && response.username != 'undefined') {
					dGet('wtw_menuusername').innerHTML = response.username;
				}
				if (response.displayname == "" || response.displayname == undefined || response.displayname == 'undefined') {
					response.displayname = response.username;
				}
				if (response.displayname == "" || response.displayname == undefined || response.displayname == 'undefined') {
					response.displayname = "Anonymous";
				}
				dGet('wtw_mainmenudisplayname').innerHTML = response.displayname;
				dGet('wtw_menudisplayname').innerHTML = response.displayname;
				dGet('wtw_tuserimageurl').value = response.userimageurl;
				if (response.userimageurl != '' && response.userimageurl != undefined && response.userimageurl != 'undefined') {	
					dGet('wtw_profileimagelg').src = response.userimageurl;
					dGet('wtw_profileimagesm').src = response.userimageurl;
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

WTWJS.prototype.getSavedAvatar = function(reload) {
	try {
		if (reload == undefined) {
			reload = false;
		}
		WTW.getJSON("/connect/avatars.php?i=" + dGet('wtw_tinstanceid').value + "&d=" + dGet('wtw_tuserid').value + "&p=" + dGet('wtw_tuserip').value, 
			function(response) {
				response = JSON.parse(response);
				var avatarind = -1;
				if (response != null) {
					if (response.avatar != null) {
						if (response.avatar.avatarind != undefined) {
							if (WTW.isNumeric(response.avatar.avatarind)) {
								avatarind = Number(response.avatar.avatarind);
							}
						}
						if (dGet('wtw_tuserid').value == '') {
							WTW.setCookie("myavatarid", response.avatar.useravatarid, 365);
							dGet("wtw_tmyavatarid").value = response.avatar.useravatarid;
						} else {
							WTW.setCookie("myavataridanon", response.avatar.useravatarid, 365);
							dGet("wtw_tmyavataridanon").value = response.avatar.useravatarid;
						}
					}
				}
				if (avatarind == -1) {
					dGet('wtw_tavatarind').value = '';
					WTW.loadSetupMode(); // load all avatars to choose
				} else {
					dGet('wtw_tavatarind').value = avatarind;
					if (reload == false) {
						WTW.loadCameraSettings();
						WTW.closeSelectAvatar();
						WTW.closeSetupMode(false);
					} else {
						// may need to delete current MyAvatar...
					}
					WTW.loadAvatarFromDB(response.avatar, reload);
					if (reload == false) {
						WTW.switchCamera(1);
						if (WTW.multipersonOn == 1) {
							if (WTW.isNumeric(WTW.multiPerson)) {
								if (Number(WTW.multiPerson) > 0) {
									window.setTimeout(function() {WTWMultiplayer.initMultiuser();},1000);
								}
							}
						} 
					}
				}
			}
		);		
    } catch (ex) {
		WTW.log("avatars-loadavatar-getSavedAvatar=" + ex.message);
    }
}

WTWJS.prototype.transferMainParent = function(parentmold) {
	try {
		var setupparent = scene.getMeshByID("setupparent-0");
		if (setupparent != null && parentmold != null) {
			var childmolds = setupparent.getChildren();
			if (childmolds != null) {
				for (var i=0;i<childmolds.length;i++) {
					if (childmolds[i] != null) {
						childmolds[i].parent = parentmold;
					}
				}
			}
			if (WTW.myAvatar != null) {
				//WTW.myAvatar.parent = WTW.getMainParent();
				WTW.myAvatar.position.x = WTW.init.startPositionX;
				WTW.myAvatar.position.y = WTW.init.startPositionY;
				WTW.myAvatar.position.z = WTW.init.startPositionZ;
				WTW.myAvatar.rotation.y = WTW.getRadians(WTW.init.startRotationY);
			}
		}
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

WTWJS.prototype.saveAvatarColor = function(moldname) {
	try {
		if (moldname.indexOf("myavatar-" + dGet("wtw_tinstanceid").value) > -1) {
			var avatarpart = moldname.replace("myavatar-" + dGet("wtw_tinstanceid").value + "-","");
			/* function for after iframe loads */
			var myavatarid = dGet('wtw_tmyavatarid').value;
			if (dGet('wtw_tuserid').value == '') {
				myavatarid = dGet('wtw_tmyavataridanon').value;
			}
			var request = {
				'myavatarid':myavatarid,
				'instanceid':dGet("wtw_tinstanceid").value,
				'avatarpart':avatarpart,
				'emissivecolorr':dGet("wtw_temissivecolorr").value,
				'emissivecolorg':dGet("wtw_temissivecolorg").value,
				'emissivecolorb':dGet("wtw_temissivecolorb").value
			};
			var onload = function(ipage) {
				ipage.getElementById('wtw_tmyavatarid').value = request.myavatarid;
				ipage.getElementById('wtw_tinstanceid').value = request.instanceid;
				ipage.getElementById('wtw_tavatarpart').value = request.avatarpart;
				ipage.getElementById('wtw_temissivecolorr').value = request.emissivecolorr;
				ipage.getElementById('wtw_temissivecolorg').value = request.emissivecolorg;
				ipage.getElementById('wtw_temissivecolorb').value = request.emissivecolorb;
				ipage.getElementById('wtw_bsaveavatarcolor').click();
			}
			/* iframe src, onload function */
			var iframe = WTW.createIFrame('/core/iframes/avatars.php', onload);
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-saveAvatarColor=" + ex.message);
    }
}

WTWJS.prototype.closeSetupMode = function(save) {
	try {
		if (save == undefined) {
			save = true;
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
		var movecontrols = WTW.getCookie("movecontrols");
		if (movecontrols == null) {
			movecontrols = '0';
		}
		if (movecontrols == '1') {
			dGet('wtw_tshowhelponstart').checked = false;
		} else if (dGet('wtw_tuserid').value == '') {
			WTW.showSettingsMenu('wtw_menucontrols');
		}
		if (WTW.init.loaded == 0) {
			WTW.continueLoadSequence();
			if (WTW.multipersonOn == 1) {
				if (WTW.isNumeric(WTW.multiPerson)) {
					if (Number(WTW.multiPerson) > 0) {
						window.setTimeout(function() {WTWMultiplayer.initMultiuser();},1000);
					}
				}
			} 
		}
		if (save) {
			WTW.switchCamera(1);
		}
	} catch (ex) {
		WTW.log("avatars-loadavatar-closeSetupMode=" + ex.message);
    }
}

WTWJS.prototype.editMyAvatar = function() {
	try {
		WTW.setupMode = 1;
		WTW.hide('wtw_menuprofile');
		var avatar = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value);
		var avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
		var step = 25;
		WTW.cameraYOffset = 6;
		if (WTW.cameraFollow == null) {
			WTW.initFollowCamera(1);
		}
		if (avatar != null && avatarcamera != null) {
			WTW.cameraFollow.lockedTarget = null;
			WTW.cameraFollow.lockedTarget = avatarcamera;
			WTW.cameraFollow.position = new BABYLON.Vector3(avatar.position.x + parseFloat(Math.sin(avatar.rotation.y)) * step, avatar.position.y + avatarcamera.position.y + WTW.cameraYOffset, avatar.position.z + parseFloat(Math.cos(avatar.rotation.y)) * step);
		}
		WTW.cameraFollow.radius = -step; // how far from the object to follow
		WTW.cameraFollow.heightOffset = WTW.cameraYOffset; // how high above the object to place the camera
		WTW.cameraFollow.rotationOffset = 0; // the viewing angle		
		WTW.cameraFollow.yOffset = 0;
		WTW.cameraFollow.inertia = .10;
		WTW.cameraFollow.cameraAcceleration = 0.5;
		WTW.cameraFollow.maxCameraSpeed = 1000;
		WTW.cameraFollow.viewport = new BABYLON.Viewport(0, 0, 1, 1);
		scene.activeCameras[0] = WTW.cameraFollow;
		WTW.showSettingsMenu('wtw_menuavatar');
    } catch (ex) {
		WTW.log("avatars-loadavatar-editMyAvatar=" + ex.message);
    }
}

WTWJS.prototype.getAvatarAnimationsAll = function() {
	try {
		var myavatarid = dGet('wtw_tmyavatarid').value;
		if (dGet('wtw_tuserid').value == '') {
			myavatarid = dGet('wtw_tmyavataridanon').value;
		}
		var request = {
			'myavatarid':myavatarid
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tmyavatarid').value = request.myavatarid;
			ipage.getElementById('wtw_bgetavataranimationsall').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/avatars.php', onload);		
    } catch (ex) {
		WTW.log("avatars-loadavatar-getAvatarAnimationsAll=" + ex.message);
    }
}

WTWJS.prototype.loadAvatarAnimationsAll = function(response) {
	try {
		var optionind = -1;
		var editavataranimations = "<ul style='padding:0px;'>";
		var optionalanimations = [];
		if (response != null) {
			var lastanimationname = "";
			var currentinput = "";
			var setselect = false;
			for (var i=0;i<response.length;i++) {
				if (response[i] != null) {
					var animationname = response[i].animationname;
					switch (response[i].animationname) {
						case "onwait":
							animationname = "Standing Idle";
							break;
						case "onwalk":
							animationname = "Walk";
							break;
						case "onwalkbackwards":
							animationname = "Walk Backwards";
							break;
						case "onturnleft":
							animationname = "Turn Left";
							break;
						case "onturnright":
							animationname = "Turn Right";
							break;
						case "onstrafeleft":
							animationname = "Strafe Left";
							break;
						case "onstraferight":
							animationname = "Strafe Right";
							break;
						case "onrun":
							animationname = "Run";
							break;
						case "onrunbackwards":
							animationname = "Run Backwards";
							break;
						case "onrunturnleft":
							animationname = "Run Turn Left";
							break;
						case "onrunturnright":
							animationname = "Run Turn Right";
							break;
						case "onrunstrafeleft":
							animationname = "Run Strafe Left";
							break;
						case "onrunstraferight":
							animationname = "Run Strafe Right";
							break;
						case "onoption":
							animationname = "Optional Gestures ++";
							break;
					}
					if (lastanimationname != animationname) {
						setselect = false;
						if (lastanimationname != "") {
							editavataranimations += "</select></div></li>";
						}
						if (response[i].animationname == "onoption") {
							optionind = i;
						}
						currentinput = "wtw_tselectavataranimation-" + i + "-value";
						editavataranimations += "<li id='wtw_animation-" + response[i].animationname + "' class='wtw-avatarli' onclick=\"WTW.editAvatarAnimation('" + response[i].animationname + "'," + i + "," + response.length + ");\">";
						editavataranimations += "<div class='wtw-inlineindent'>" + animationname + "</div></li>";
						editavataranimations += "<li id='wtw_animationdiv-" + i + "' class='wtw-avatarli' style='display:none;visibility:hidden;'>";
						if (response[i].animationname == "onoption") {
							editavataranimations += "<div>";
						} else {
							editavataranimations += "<div class='wtw-inlineindent2'>";
						}
						editavataranimations += "<input id='" + currentinput + "' type='hidden' value='' />";
						
						if (response[i].animationname == "onoption") {
							editavataranimations += "<select id='wtw_tselectavataranimation-" + i + "' onchange=\"WTW.changeAvatarAnimation(this);\" style='display:none;visibility:hidden;' >";
							editavataranimations += "<option value=''> -- Select Animation -- </option>";
						} else {
							editavataranimations += "<select id='wtw_tselectavataranimation-" + i + "' onchange=\"WTW.changeAvatarAnimation(this);\" >";
						}
						if (optionind > 68) {
							WTW.hide('wtw_animation-add');
						}
						lastanimationname = animationname;
					}
					var selected = "";
					var value = response[i].useravataranimationid + "|" + response[i].avataranimationid + "|" + response[i].speedratio + "|" + response[i].animationname + "|" + response[i].startframe + "|" + response[i].endframe + "|" + response[i].objectfolder + "|" + response[i].objectfile + "|" + response[i].animationfriendlyname + "|" + response[i].loadpriority + "|" + response[i].animationicon;
					if (response[i].useravataranimationid != null && response[i].useravataranimationid != '') {
						if (setselect == false && response[i].animationname != "onoption") {
							selected = "selected='true'";
							if (dGet(currentinput) != null) {
								dGet(currentinput).value = response[i].useravataranimationid;
							}
							setselect = true;
						} else {
							optionalanimations[optionalanimations.length] = value;
						}
					}
					editavataranimations += "<option " + selected + " value='" + value + "'>" + response[i].animationfriendlyname + "</option>";
				}
			}
		}
		editavataranimations += "</select></div><div id='wtw_addoptionalanimations'></div><div id='wtw_animation-add' class='wtw-chatbuttonaccept' onclick=\"WTW.addAvatarAnimationRow(" + optionind + ",'');\" style='text-align:center;margin-left:20px;'>+ Add Animation</div>";
		editavataranimations += "<div style='font-size:.8em;text-align:center;'><img id='wtw_helpanimicon' src='/content/system/images/menugestures32.png' alt='Animations' title='Animations' /> Click on toolbar below to execute.</div></li></ul>";
		dGet("wtw_editavataranimations").innerHTML = editavataranimations;
		if (optionalanimations.length > 0) {
			for (var i=0;i<optionalanimations.length;i++) {
				if (optionalanimations[i] != null) {
					if (optionalanimations[i] != '') {
						WTW.addAvatarAnimationRow(optionind, optionalanimations[i]);
					}
				}
			}
		}
		WTW.showSettingsMenu('wtw_menuavatar');
    } catch (ex) {
		WTW.log("avatars-loadavatar-loadAvatarAnimationsAll=" + ex.message);
    }
}

WTWJS.prototype.addAvatarAnimationRow = function(optionind, selectedvalue) {
	try {
		var useravataranimationid = "";
		var optional = dGet('wtw_tselectavataranimation-' + optionind);
		var newoptional = optional.cloneNode();
		var basename = 'wtw_tselectavataranimation-';
		var i = optionind;
		var newname = basename + i;
		while (dGet(newname) != null) {
			newname = basename + i;
			optionind = i;
			i += 1;
		}
		if (optionind > 68) {
			WTW.hide('wtw_animation-add');
		}
		if (selectedvalue.indexOf('|') > -1) {
			var currentvalues = selectedvalue.split('|');
			useravataranimationid = currentvalues[0];
		}
		newoptional.id = newname;
		newoptional.className = 'wtw-inlinespacing';
		newoptional.style = '';
		newoptional.innerHTML = "";
		for (var i = 0; i < optional.options.length; i++) {
			var option = optional.options[i].cloneNode();
			option.innerHTML = optional.options[i].innerHTML;
			if (option.value == selectedvalue) {
				option.selected = true;
			} else {
				option.selected = false;
			}
			newoptional.appendChild(option);
		}
		var current = document.createElement('input');
		current.type = 'hidden';
		current.value = useravataranimationid;
		current.id = 'wtw_tselectavataranimation-' + optionind + '-value';
		var deleteanimation = document.createElement('div');
		deleteanimation.id = 'wtw_tselectavataranimation-' + optionind + '-delete';
		deleteanimation.className = "wtw-deleteanimicon";
		deleteanimation.innerHTML = "<img src='/content/system/images/deleteicon.png' alt='Delete Animation' title='Delete Animation' onclick=\"WTW.deleteUserAnimation('" + newname + "');\" class='wtw-deleteicon' />";
		dGet('wtw_addoptionalanimations').appendChild(current);
		deleteanimation.appendChild(newoptional);
		dGet('wtw_addoptionalanimations').appendChild(deleteanimation);
    } catch (ex) {
		WTW.log("avatars-loadavatar-addAvatarAnimationRow=" + ex.message);
    }
}

WTWJS.prototype.deleteUserAnimation = function(selectname) {
	try {
		var myavatarid = dGet('wtw_tmyavatarid').value;
		if (dGet('wtw_tuserid').value == '') {
			myavatarid = dGet('wtw_tmyavataridanon').value;
		}
		var useravataranimationid = "";
		var avataranimationid = "";
		var animationname = "";
		var animationind = -1;
		var selectedvalue = WTW.getDDLValue(selectname);
		if (selectedvalue.indexOf('|') > -1) {
			var currentvalues = selectedvalue.split('|');
			useravataranimationid = currentvalues[0];
			avataranimationid = currentvalues[1];
			animationname = currentvalues[3];
		}
		WTW.show('wtw_animation-add');
		var avatar = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value);
		if (avatar != null) {
			if (avatar.WTW.animations != undefined) {
				for (var i=avatar.WTW.animations.length;i>-1;i--) {
					if (avatar.WTW.animations[i] != null) {
						if (avatar.WTW.animations[i].useravataranimationid == useravataranimationid) {
							if (avatar.WTW.animations.running['onoption' + avatar.WTW.animations[i].avataranimationid] != undefined) {
								avatar.WTW.animations.running['onoption' + avatar.WTW.animations[i].avataranimationid].stop();
							}
							avatar.WTW.animations.splice(i,1);
						}
					}
				}
			}
		}
		if (dGet(selectname) != null) {
			WTW.hide(selectname);
			WTW.hide(selectname + '-delete');
		}
		if (useravataranimationid != "") {
			var myavatarid = dGet('wtw_tmyavatarid').value;
			if (dGet('wtw_tuserid').value == '') {
				myavatarid = dGet('wtw_tmyavataridanon').value;
			}
			var request = {
				'myavatarid':myavatarid,
				'useravataranimationid':useravataranimationid,
				'avataranimationid':avataranimationid
			};
			/* function for after iframe loads */
			var onload = function(ipage) {
				ipage.getElementById('wtw_tmyavatarid').value = request.myavatarid;
				ipage.getElementById('wtw_tuseravataranimationid').value = request.useravataranimationid;
				ipage.getElementById('wtw_tavataranimationid').value = request.avataranimationid;
				ipage.getElementById('wtw_bdeleteavataranimation').click();
			}
			/* iframe src, onload function */
			var iframe = WTW.createIFrame('/core/iframes/avatars.php', onload);
		}
		WTW.reloadMyAvatar('', '');
    } catch (ex) {
		WTW.log("avatars-loadavatar-deleteUserAnimation=" + ex.message);
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
			var avatar = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value);
			if (avatar != null) {
				if (avatar.WTW.animations != undefined) {
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
								}
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
				}
			}
			var myavatarid = dGet('wtw_tmyavatarid').value;
			if (dGet('wtw_tuserid').value == '') {
				myavatarid = dGet('wtw_tmyavataridanon').value;
			}
			var request = {
				'myavatarid':myavatarid,
				'useravataranimationid':useravataranimationid,
				'useravataranimationidfield':selobj.id + '-value',
				'avataranimationid':avataranimationid,
				'avataranimationname':dGet('wtw_tavataranimationname').value,
				'speedratio':speedratio
			};
			/* function for after iframe loads */
			var onload = function(ipage) {
				ipage.getElementById('wtw_tmyavatarid').value = request.myavatarid;
				ipage.getElementById('wtw_tuseravataranimationid').value = request.useravataranimationid;
				ipage.getElementById('wtw_tuseravataranimationidfield').value = request.useravataranimationidfield;
				ipage.getElementById('wtw_tavataranimationid').value = request.avataranimationid;
				ipage.getElementById('wtw_tavataranimationname').value = request.avataranimationname;
				ipage.getElementById('wtw_tspeedratio').value = request.speedratio;
				ipage.getElementById('wtw_bsaveavataranimation').click();
			}
			/* iframe src, onload function */
			var iframe = WTW.createIFrame('/core/iframes/avatars.php', onload);
		}
		selobj.blur();
    } catch (ex) {
		WTW.log("avatars-loadavatar-changeAvatarAnimation=" + ex.message);
    }
}

WTWJS.prototype.updateAnimSelectValue = function(useravataranimationidfield, useravataranimationid) {
	try {
		if (dGet(useravataranimationidfield) != null) {
			dGet(useravataranimationidfield).value = useravataranimationid;
			var selobjid = useravataranimationidfield.replace('-value','');
			var selvalue = WTW.getDDLValue(selobjid);
			var newselvalue = "";
			if (selvalue.indexOf('|') > -1) {
				var selvalues = selvalue.split('|');
				newselvalue = useravataranimationid;
				for (var i=1;i<selvalues.length;i++) {
					newselvalue += "|" + selvalues[i];
				}
			}
			if (dGet(selobjid) != null) {
				if (dGet(selobjid).selectedIndex > -1) {
					dGet(selobjid).options[dGet(selobjid).selectedIndex].value = newselvalue;
				}
			}
			var avatar = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value);
			if (avatar != null) {
				if (avatar.WTW.animations != undefined) {
					for (var i=avatar.WTW.animations.length;i>-1;i--) {
						if (avatar.WTW.animations[i] != null) {
							if (avatar.WTW.animations[i].animationname == "onoption" && avatar.WTW.animations[i].useravataranimationid == '') {
								avatar.WTW.animations[i].useravataranimationid = useravataranimationid;
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

WTWJS.prototype.reloadMyAvatar = function(useravataranimationid, useravataranimationidfield) {
	try {
		WTW.updateAnimSelectValue(useravataranimationidfield, useravataranimationid);
		if (WTW.myAvatar != null) {
			WTW.init.startPositionX = WTW.myAvatar.position.x;
			WTW.init.startPositionY = WTW.myAvatar.position.y;
			WTW.init.startPositionZ = WTW.myAvatar.position.z;
			WTW.init.startRotationY = WTW.getDegrees(WTW.myAvatar.rotation.y);
			WTW.disposeAnimations("myavatar-" + dGet("wtw_tinstanceid").value);
			WTW.disposeClean("myavatar-" + dGet("wtw_tinstanceid").value + "-scale");
			WTW.getSavedAvatar(true);
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-reloadMyAvatar=" + ex.message);
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
		var avatarscale = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-scale");
		var avatarpieces = avatarscale.getChildren();
		if (avatarpieces != null) {
			var avatarparts = [];
			for (var i=0;i<avatarpieces.length;i++) {
				avatarparts[avatarparts.length] = avatarpieces[i].name.replace("myavatar-" + dGet("wtw_tinstanceid").value + "-","");
			}
			avatarparts.sort(function(a,b){return a < b ? -1 : 1}); 
			for (var i=0;i<avatarparts.length;i++) {
				var partcolor = "#ffffff";
				var avatarpart = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-" + avatarparts[i]);
				if (avatarpart != null) {
					if (avatarpart.material == null) {
						avatarpart.material = new BABYLON.StandardMaterial("mat" + "myavatar-" + dGet("wtw_tinstanceid").value + "-" + avatarparts[i], scene);
					}
					partcolor = avatarpart.material.emissiveColor.toHexString();
					if (partcolor == null || partcolor == undefined || partcolor == '') {
						partcolor = "#ffffff";
					}
				}
				var avatarpartdisplayname = avatarparts[i];
				if (avatarpartdisplayname.indexOf("_") > -1) {
					avatarpartdisplayname = avatarparts[i].replace("_"," ");
				}
				dGet("wtw_editavatarparts").innerHTML += "<li id='wtw_li-myavatar-" + dGet("wtw_tinstanceid").value + "-" + avatarparts[i] + "' class='wtw-avatarli' onclick=\"WTW.editAvatarPart('myavatar-" + dGet("wtw_tinstanceid").value + "-" + avatarparts[i] + "');\"><div class='wtw-inlineindent'><div id='wtw_color-myavatar-" + dGet("wtw_tinstanceid").value + "-" + avatarparts[i] + "' class='wtw-showcolorbox' style='background-color:" + partcolor + ";'></div>" + avatarpartdisplayname.toProperCase(); + "</div></li>";
			}
		}
		dGet("wtw_editavatarparts").innerHTML += "</ul>";
    } catch (ex) {
		WTW.log("avatars-loadavatar-editAvatarColors=" + ex.message);
    }
}

WTWJS.prototype.editAvatarPart = function(avatarpartname) {
	try {
		if (avatarpartname != '') {
			var lastmoldname = dGet('wtw_tmoldname').value;
			WTW.resetAvatarPartSelect();
			WTW.hilightMoldFast(avatarpartname, 'yellow');
			dGet('wtw_li-' + avatarpartname).className = 'wtw-avatarlihilight';
			dGet('wtw_tmoldname').value = avatarpartname;
			var mold = scene.getMeshByID(dGet('wtw_tmoldname').value);
			if (WTW.guiAdminColors == null) {
				WTW.guiAdminColors = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
				var panel = new BABYLON.GUI.StackPanel();
				panel.name = "avatarguipanel";
				panel.width = "300px";
				panel.isVertical = true;
				panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
				panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
				WTW.guiAdminColors.addControl(panel);
				if (mold != null) {
					var colorpicker = new BABYLON.GUI.ColorPicker();
					colorpicker.name = "avatarcolorpicker";
					colorpicker.id = "avatarcolorpicker";
					colorpicker.value = mold.material.emissiveColor;
					colorpicker.height = "250px";
					colorpicker.width = "250px";
					colorpicker.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
					colorpicker.onValueChangedObservable.add(function(value) {
						if (value != null) {
							WTW.setAvatarColor('emissive', value.r, value.g, value.b);
						}
					});
					panel.addControl(colorpicker); 
				}
			} else {
				WTW.saveAvatarColor(lastmoldname);
				var colorpicker = null;
				var gui = WTW.guiAdminColors.getDescendants();
				if (gui != null) {
					for (var i=0;i<gui.length;i++) {
						if (gui[i] != null) {
							if (gui[i].name == 'avatarcolorpicker') {
								colorpicker = gui[i];
							}
						}
					}
					if (colorpicker != null && mold != null) {
						colorpicker.value = mold.material.emissiveColor;
					}
				}
			}
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-editAvatarPart=" + ex.message);
    }
}

WTWJS.prototype.setAvatarColor = function(colorgroup, r, g, b) {
	try {
		var mold = scene.getMeshByID(dGet('wtw_tmoldname').value);
		var partcolor = "#ffffff";
		if (mold != null) {
			switch (colorgroup) {
				case "diffuse":
					mold.material.diffuseColor = new BABYLON.Color3(r,g,b);
					partcolor = mold.material.diffuseColor.toHexString();
					break;
				case "specular":
					mold.material.specularColor = new BABYLON.Color3(r,g,b);
					partcolor = mold.material.specularColor.toHexString();
					break;
				case "emissive":
					mold.material.emissiveColor = new BABYLON.Color3(r,g,b);
					partcolor = mold.material.emissiveColor.toHexString();
					break;
			}
			var covering = mold.material;
			mold.material.dispose();
			mold.material = covering;
		}
		if (dGet('wtw_color-' + dGet('wtw_tmoldname').value) != null) {
			dGet('wtw_color-' + dGet('wtw_tmoldname').value).style.backgroundColor = partcolor;
		}
		switch (colorgroup) {
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
		var avatarscale = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-scale");
		var avatarpieces = avatarscale.getChildren();
		if (avatarpieces != null) {
			for (var i=0;i<avatarpieces.length;i++) {
				dGet('wtw_li-' + avatarpieces[i].name).className = 'wtw-avatarli';
			}
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-resetAvatarPartSelect=" + ex.message);
    }
}

WTWJS.prototype.loadAvatarFromDB = function(customdef, reload) {
	try {
		if (reload == undefined) {
			reload = false;
		}
		var walkspeed = ".5";
		var avatardef = WTW.newAvatarDef();
		avatardef.displayname = customdef.displayname;
		avatardef.privacy = customdef.privacy;
		avatardef.avatarind = customdef.avatarind;
		avatardef.avatarparts = customdef.avatarparts;
		avatardef.avataranimationdefs = customdef.avataranimationdefs;
		avatardef.object.useravatarid = customdef.useravatarid
		avatardef.object.folder = customdef.objectfolder;
		avatardef.object.file = customdef.objectfile;
		avatardef.object.walkspeed = walkspeed;
		avatardef.object.objectanimations = null;		
		avatardef.scaling.x = customdef.scalingx;
		avatardef.scaling.y = customdef.scalingy;
		avatardef.scaling.z = customdef.scalingz;
		avatardef.lastscaling.x = customdef.scalingx;
		avatardef.lastscaling.y = customdef.scalingy;
		avatardef.lastscaling.z = customdef.scalingz;
		if (dGet("wtw_tuserid").value == '') {
			dGet('wtw_tmyavataridanon').value = customdef.useravatarid;
			WTW.setCookie("myavataridanon",dGet('wtw_tmyavataridanon').value,365);
		} else {
			dGet('wtw_tmyavatarid').value = customdef.useravatarid;
			WTW.setCookie("myavatarid",dGet('wtw_tmyavatarid').value,365);
		}
		WTW.loadMyAvatar(avatardef, reload);
    } catch (ex) {
		WTW.log("avatars-loadavatar-loadAvatarFromDB=" + ex.message);
    }
}

WTWJS.prototype.loadMyAvatar = function(avatardef, reload) {
	try {
		if (reload == undefined) {
			reload = false;
		}
		avatardef.name = "myavatar-" + dGet("wtw_tinstanceid").value;
		avatardef.username = dGet("wtw_tusername").value;
		avatardef.userid = dGet("wtw_tuserid").value;
		if ((avatardef.displayname == "" || avatardef.displayname == "Anonymous") && dGet("wtw_tusername").value != "") {
			avatardef.displayname = dGet("wtw_tusername").value;
		}
		avatardef.instanceid = dGet("wtw_tinstanceid").value;
		avatardef.checkcollisions = "1";
		avatardef.ispickable = "0"; 
		avatardef.parentname = "person";
		avatardef.position.x = WTW.init.startPositionX;
		avatardef.position.y = WTW.init.startPositionY;
		avatardef.position.z = WTW.init.startPositionZ;
		avatardef.lastposition.x = WTW.init.startPositionX;
		avatardef.lastposition.y = WTW.init.startPositionY;
		avatardef.lastposition.z = WTW.init.startPositionZ;
		avatardef.rotation.x = 0;
		avatardef.rotation.y = WTW.init.startRotationY;
		avatardef.rotation.z = 0;
		avatardef.lastrotation.x = WTW.init.startRotationX;
		avatardef.lastrotation.y = WTW.init.startRotationY;
		avatardef.lastrotation.z = WTW.init.startRotationZ;
		WTW.myAvatar = WTW.addAvatar(avatardef.name, avatardef, avatardef.parentname);
		//WTW.myAvatar.parent = WTW.getMainParent();
		WTW.myAvatar.rotation.y = WTW.getRadians(WTW.init.startRotationY);
		if (reload == false) {
			WTW.cameraYOffset = WTW.init.startRotationX;
			WTW.initAvatarCameras();
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-loadMyAvatar=" + ex.message);
    }
}

WTWJS.prototype.loadAvatar = function(avatarind, parentmold, offsetX, offsetZ) {
	try {
		var avatarname = "selectavatar-" + avatarind + "-preview";
		var selavatar = scene.getMeshByID(avatarname);
		if (selavatar == null) {
			var avatardef = WTW.newAvatarDef();
			var def = WTW.getAvatarSettings(avatarind);
			avatardef.object.folder = def.objectfolder;
			avatardef.object.file = def.objectfile;
			avatardef.object.walkspeed = def.walkspeed;
			avatardef.scaling.x = def.scalingx;
			avatardef.scaling.y = def.scalingy;
			avatardef.scaling.z = def.scalingz;
			avatardef.object.objectanimations = null;
			avatardef.avatarind = avatarind;
			selavatar = WTW.addAvatar3DObject(avatarname, avatardef, true, true);
			selavatar.parent = parentmold;
			selavatar.rotation.y = WTW.getRadians(0);
			selavatar.position.x = offsetX;
			selavatar.position.z = offsetZ;
		} else {
			if (dGet('wtw_tuserid').value == '') {
				if (avatarind == 1) {
					selavatar.position.x = -5;
					selavatar.position.z = 20;
				} else if (avatarind == 2) {
					selavatar.position.x = 5;
					selavatar.position.z = 20;
				}
			} else {
				if (avatarind == 1) {
					selavatar.position.x = -16;
					selavatar.position.z = 28;
				} else if (avatarind == 2) {
					selavatar.position.x = 16;
					selavatar.position.z = 28;
				}
			}
			WTW.setAvatarVisible(avatarname, true);
		}
    } catch (ex) {
		WTW.log("avatars-loadavatar-loadAvatar=" + ex.message);
    }
}

WTWJS.prototype.loadAvatarAnimations = function(avatarname, easingfunction, animationind, frametotal, lastframecount) {
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
		var avatar = scene.getMeshByID(avatarname);
		if (avatar != null) {
			if (avatar.WTW != null) {
				if (avatar.WTW.animations != null && avatar.WTW.skeleton != null) {
					if (avatar.WTW.animations[animationind] != null) {
						var animation = avatar.WTW.animations[animationind];
						if (animation.objectfolder != '' && animation.objectfile != '') {
							BABYLON.SceneLoader.ImportMeshAsync("", animation.objectfolder, animation.objectfile, scene).then( function (walkresults) {
								frametotal += lastframecount + 1;
								var walkskeleton = walkresults.skeletons[0];
								if (animation.animationname == "onoption") {
									animation.animationname = "onoption" + animation.avataranimationid;
								}
								walkskeleton.createAnimationRange(animation.animationname, Number(animation.startframe), Number(animation.endframe));
								for (var m=0;m<walkresults.meshes.length;m++) {
									if (walkresults.meshes[m] != null) {
										walkresults.meshes[m].isVisible = false;
										walkresults.meshes[m].name = "avataranimation-" + m + "-" + animation.animationname + "-" + walkresults.meshes[m].name;
										WTW.addDisposeMoldToQueue(walkresults.meshes[m].name);
									}
								}
								avatar.WTW.skeleton.copyAnimationRange(walkskeleton, animation.animationname, true);
								if (easingfunction != undefined && easingfunction != null) {
									for (var c=0; c < avatar.WTW.skeleton.bones.length; c++) {
										//avatar.WTW.skeleton.bones[c].animations[0].loopMode = BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT;
										avatar.WTW.skeleton.bones[c].animations[0].setEasingFunction(easingfunction);
									}
								}
								avatar.WTW.animations.running[animation.animationname] = scene.beginWeightedAnimation(avatar.WTW.skeleton, frametotal, frametotal + Number(animation.endframe) - Number(animation.startframe), 0, animation.animationloop, Number(animation.speedratio));
								if (avatar.WTW.animations[animationind + 1] != null) {
									lastframecount = Number(animation.endframe) - Number(animation.startframe) + 1;
									WTW.loadAvatarAnimations(avatarname, easingfunction, animationind + 1, frametotal, lastframecount);
								} else if (avatarname.indexOf('myavatar-') > -1) {
									WTW.toggleMenuAnimations();
									WTW.toggleMenuAnimations();
									WTW.showAvatarDisplayName(false);
									if (WTW.multipersonOn == 1) {
										if (WTW.isNumeric(WTW.multiPerson)) {
											if (Number(WTW.multiPerson) > 0 && WTW.setupMode == 0) {
												window.setTimeout(function() {WTWMultiplayer.initMultiuser();},1000);
											}
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
		WTW.log("avatars-loadavatar-loadAvatarAnimations=" + ex.message);
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
	var scalingx = '.037';
	var scalingy = '.037';
	var scalingz = '.037';
	try {
		if (avatarind > -1) {
			switch (avatarind) {
				case 1:
					scalingx = '.07';
					scalingy = '.07';
					scalingz = '.07';
					objectfolder = "/content/system/avatars/female/";
					objectfile = "femaleidle.babylon";
					break;
				case 2:
					scalingx = '.07';
					scalingy = '.07';
					scalingz = '.07';
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
		setupparent.position.x = 0;
		setupparent.position.y = 0;
		setupparent.position.z = -20;
		setupparent.rotation.y = WTW.getRadians(0);
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
			var request = {
				'myavatarid':dGet('wtw_tmyavatarid').value,
				'instanceid':dGet("wtw_tinstanceid").value,
				'avatardisplayname':dGet('wtw_tavatardisplayname').value
			};
			/* function for after iframe loads */
			var onload = function(ipage) {
				ipage.getElementById('wtw_tmyavatarid').value = request.myavatarid;
				ipage.getElementById('wtw_tinstanceid').value = request.instanceid;
				ipage.getElementById('wtw_tavatardisplayname').value = request.avatardisplayname;
				ipage.getElementById('wtw_bsaveavatardisplayname').click();
			}
			/* iframe src, onload function */
			var iframe = WTW.createIFrame('/core/iframes/avatars.php', onload);
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

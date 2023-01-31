/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions provide many of the common functions for browse and admin modes */
/* The heads up display (hud) provides menu options and user settings */
/* These functions set the camera views and related settings */

WTWJS.prototype.hudGetCameras = function() {
	/* get Camera Settings */
	try {
		WTW.hudAddLabel('Main Camera', 'hud-camera1', -8, 3.2, 0);
		WTW.hudAddLabel('3D Mode', 'hud-camera1-style', -7.3, 1.5, 0);
//		WTW.hudAddLabel('Second Camera', 'hud-camera2', -8, -3.5, 0);
		WTW.hudAddLabel('Distance', 'hud-camera1-disttext', -7.3, -.5, 0);
		WTW.hudAddLabel('Follow', 'hud-camera1-distfollowtext', 0.2, -1.1, 0, .4, .1);
		WTW.hudAddLabel('Selfie', 'hud-camera1-distselfietext', 4.7, -1.1, 0, .4, .1);
		
		WTW.hudAddImageButton('/content/system/images/camera-follow.png', 'camera1-follow', 1, 3.5, 0, 1);
		WTW.hudAddImageButton('/content/system/images/camera-firstpersonstable.png', 'camera1-firststable', 3.5, 3.5, 0);
		WTW.hudAddImageButton('/content/system/images/camera-firstperson.png', 'camera1-first', 6, 3.5, 0);

		WTW.hudAddImageButton('/content/system/images/camera-picture.png', 'camerastyle-picture', -1.5, 1.7, 0, 1);
		WTW.hudAddImageButton('/content/system/images/camera-anaglyph.png', 'camerastyle-anaglyph', 1, 1.7, 0);
		WTW.hudAddImageButton('/content/system/images/camera-vr.png', 'camerastyle-vr', 3.5, 1.7, 0);
		WTW.hudAddImageButton('/content/system/images/camera-vrgamepad.png', 'camerastyle-vrgamepad', 6, 1.7, 0);
		
		WTW.hudAddSlider(WTW.cameraDistance, -100, 100, 'camera1-dist', 3, -.2, 0);
		
//		WTW.hudAddImageButton('/content/system/images/camera-follow.png', 'camera2-follow', 1, -3.3, 0);
//		WTW.hudAddImageButton('/content/system/images/camera-scene.png', 'camera2-scene', 3.5, -3.3, 0);
//		WTW.hudAddImageButton('/content/system/images/camera-self.png', 'camera2-self', 6, -3.3, 0);
		
		WTW.hudAddSaveClose('cameras', 0, -5.3, 0);
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_cameras.js-hudGetCameras=' + ex.message);
	}
}

WTWJS.prototype.hudHighlightCamera = function(zcameraset, zactivebutton) {
	/* this function changes which camera is highlighted */
	try {
		var zbuttons = [];
		switch (zcameraset) {
			case 0:
				zbuttons = ['hud-imagebutton-camerastyle-picture', 'hud-imagebutton-camerastyle-anaglyph', 'hud-imagebutton-camerastyle-vr', 'hud-imagebutton-camerastyle-vrgamepad'];
				break;
			case 1:
				zbuttons = ['hud-imagebutton-camera1-follow', 'hud-imagebutton-camera1-firststable', 'hud-imagebutton-camera1-first'];
				break;
			case 2:
				zbuttons = ['hud-imagebutton-camera2-follow', 'hud-imagebutton-camera2-scene', 'hud-imagebutton-camera2-self'];
				break;
		}
		for (var i=0;i < zbuttons.length;i++) {
			/* reset the material on the menu item button - blue for selected and black is default */
			var zbutton = scene.getMeshByID(zbuttons[i]);
			if (zbutton != null) {
				var zbgcolor = '#000000';
				if (zactivebutton == zbuttons[i]) {
					zbgcolor = '#09255F';
				}
				var zcovering = zbutton.material;
				zcovering.emissiveColor =  new BABYLON.Color3.FromHexString(zbgcolor);
				zcovering.diffuseColor =  new BABYLON.Color3.FromHexString(zbgcolor);
				zcovering.specularColor =  new BABYLON.Color3.FromHexString(zbgcolor);
				zcovering.ambientColor =  new BABYLON.Color3.FromHexString(zbgcolor);
				zbutton.material = zcovering;
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_cameras.js-hudHighlightCamera=' + ex.message);
	}
}

WTWJS.prototype.hudChangeCameraDistance = function(zmoldname) {
	/* this function changes camera distance */
	try {
		if (zmoldname.indexOf('hud-slider-camera1-dist') > -1) {
			var zslidertab = scene.getMeshByID(zmoldname.replace('-left','').replace('-right',''));
			var zmin = 0;
			var zmax = 1;
			var ztabpositionx = 3; /* 3 is slider x position */
			if (dGet(zmoldname.replace('-left','').replace('-right','') + '-min') != null) {
				zmin = Number(dGet(zmoldname.replace('-left','').replace('-right','') + '-min').value);
			}
			if (dGet(zmoldname.replace('-left','').replace('-right','') + '-max') != null) {
				zmax = Number(dGet(zmoldname.replace('-left','').replace('-right','') + '-max').value);
			}
			WTW.cameraDistance = Number(dGet('wtw_tcameradistance').value);
			if (dGet('hud-slider-camera1-dist') != null) {
				WTW.cameraDistance = Number(dGet('hud-slider-camera1-dist').value);
			}
			if (zmax - zmin != 0 && zslidertab != null) {
				switch (zmoldname) {
					case 'hud-slider-camera1-dist':
						if (WTW.isMouseDown == 1 && WTW.dragID == '') {
							WTW.dragID = zmoldname;
						} else if (WTW.isMouseDown == 0) {
							WTW.setCookie('cameradistance',WTW.cameraDistance,365);
						} else {
							if (WTW.mouseStartX != WTW.mouseX) {
								WTW.cameraDistance += (WTW.mouseX - WTW.mouseStartX);
								WTW.mouseStartX = WTW.mouseX;
							}
						}
						break;
					case 'hud-slider-camera1-dist-left':
						WTW.cameraDistance -= 5;
						break;
					case 'hud-slider-camera1-dist-right':
						WTW.cameraDistance += 5;
						break;
				}
				dGet('wtw_tcameradistance').value = WTW.cameraDistance;
				if (dGet('hud-slider-camera1-dist') != null) {
					dGet('hud-slider-camera1-dist').value = WTW.cameraDistance;
				}
				ztabpositionx += ((WTW.cameraDistance / (zmax - zmin)) * 5.4); 
				zslidertab.position.x = ztabpositionx;
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_cameras.js-hudChangeCameraDistance=' + ex.message);
	}
}

WTWJS.prototype.hudClearCameras = async function() {
	/* clear profile input textboxes */
	try {
		if (dGet('hud-slider-camera1-dist') != null) {
			dGet('hud-slider-camera1-dist').parentNode.removeChild(dGet('hud-slider-camera1-dist'));
		}
		if (dGet('hud-slider-camera1-dist-min') != null) {
			dGet('hud-slider-camera1-dist-min').parentNode.removeChild(dGet('hud-slider-camera1-dist-min'));
		}
		if (dGet('hud-slider-camera1-dist-max') != null) {
			dGet('hud-slider-camera1-dist-max').parentNode.removeChild(dGet('hud-slider-camera1-dist-max'));
		}

		if (dGet('wtw_hudfields') != null) {
			/* remove the div container for hud if it is no longer in use */
			if (dGet('wtw_hudfields').innerHTML == '') {
				dGet('wtw_hudfields').parentNode.removeChild(dGet('wtw_hudfields'));
			}
		}
		/* clear page form elements */
		var zmold = WTW.getMeshOrNodeByID('hud-pageform');
		if (zmold != null) {
			var zelements = zmold.getChildren();
			if (zelements != null) {
				for (var i=0;i < zelements.length;i++) {
					zelements[i].dispose();
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_cameras.js-hudClearCameras=' + ex.message);
	}
}

WTWJS.prototype.hudSaveCameras = async function() {
	/* save local server user profile */
	try {
		/* validate entries... */
/*		var zrequest = {
			'userid':dGet('wtw_tuserid').value,
			'displayname':btoa(dGet('hud-textbox-displayname').value.replace('|','')),
			'useremail':dGet('hud-textbox-email').value.replace('|',''),
			'firstname':btoa(dGet('hud-textbox-firstname').value.replace('|','')),
			'lastname':btoa(dGet('hud-textbox-lastname').value.replace('|','')),
			'gender':btoa(dGet('hud-textbox-gender').value.replace('|','')),
			'dob':dGet('hud-textbox-dob').value.replace('|',''),
			'function':'savemyprofile'
		};
		WTW.postAsyncJSON('/core/handlers/users.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/ * note serror would contain errors * /
				WTW.hudCheckLayout('');
				WTW.hudMenuText('settings');
				WTW.hudClearProfile();
			}
		);
*/	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_cameras.js-hudSaveCameras=' + ex.message);
	}
}


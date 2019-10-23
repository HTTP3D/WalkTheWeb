/* All code is Copyright 2013-2019 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

WTWJS.prototype.switchCamera = function(w) {
	try {
		WTW.cameraYOffset = 0;
		var avatar = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value);
		var avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-camera");
		var firstcamera = WTW.getDDLValue('wtw_firstcamera');
		var secondcamera = WTW.getDDLValue('wtw_secondcamera');
		var dimensions = WTW.getDDLValue('wtw_cameradimensions');
		document.activeElement.blur();
		if (w == 1) {
			WTW.setCookie("firstcamera",firstcamera,30);
			WTW.setCookie("dimensions",dimensions,30);
			var step = -25;
			WTW.cameraYOffset = 5;
			switch (firstcamera) {
				case 'First-Person Camera':
					step = 0;
					WTW.cameraYOffset = 2;
					break;
				case 'Scene Camera':
					step = -40;
					WTW.cameraYOffset = 15;
					break;
				case 'Self Camera':
					avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
					step = 30;
					WTW.cameraYOffset = 8;
					break;
			}
			if (firstcamera == 'First-Person Camera') {
				switch (dimensions) {
					case 'Anaglyph':
						if (WTW.cameraAnaglyph == null) {
							WTW.initAnaglyphCamera();
						}
						if (avatar != null && avatarcamera != null) {
							WTW.cameraAnaglyph.lockedTarget = null;
							WTW.cameraAnaglyph.yOffset = 180;
							WTW.cameraAnaglyph.rotation.y = WTW.getRadians(WTW.getDegrees(avatar.rotation.y) + WTW.cameraAnaglyph.yOffset);
							WTW.cameraAnaglyph.position = new BABYLON.Vector3(avatar.position.x + parseFloat(Math.sin(avatar.rotation.y)) * step, avatar.position.y + avatarcamera.position.y + WTW.cameraYOffset, avatar.position.z + parseFloat(Math.cos(avatar.rotation.y)) * step);
						}
						break;
					case 'VR':
						if (WTW.cameraVR == null) {
							WTW.initVRCamera();
						}
						if (avatar != null && avatarcamera != null) {
							WTW.cameraVR.lockedTarget = null;
							WTW.cameraVR.yOffset = 180;
							WTW.cameraVR.rotation.y = WTW.getRadians(WTW.getDegrees(avatar.rotation.y) + WTW.cameraVR.yOffset);
							WTW.cameraVR.position = new BABYLON.Vector3(avatar.position.x + parseFloat(Math.sin(avatar.rotation.y)) * step, avatar.position.y + avatarcamera.position.y + WTW.cameraYOffset, avatar.position.z + parseFloat(Math.cos(avatar.rotation.y)) * step);
						}
						break;
					case 'VR Gamepad':
						if (WTW.cameraVRGamepad == null) {
							WTW.initVRGamepadCamera();
						}
						if (avatar != null && avatarcamera != null) {
							WTW.cameraVRGamepad.lockedTarget = null;
							WTW.cameraVRGamepad.yOffset = 180;
							WTW.cameraVRGamepad.rotation.y = WTW.getRadians(WTW.getDegrees(avatar.rotation.y) + WTW.cameraVRGamepad.yOffset);
							WTW.cameraVRGamepad.position = new BABYLON.Vector3(avatar.position.x + parseFloat(Math.sin(avatar.rotation.y)) * step, avatar.position.y + avatarcamera.position.y + WTW.cameraYOffset, avatar.position.z + parseFloat(Math.cos(avatar.rotation.y)) * step);
						}
						break;
					default:
						if (WTW.camera != null && avatar != null && avatarcamera != null) {
							WTW.camera.position.x = avatar.position.x;
							WTW.camera.position.y = avatar.position.y + avatarcamera.position.y;
							WTW.camera.position.z = avatar.position.z;
							WTW.camera.rotation.y = WTW.getRadians(WTW.getDegrees(avatar.rotation.y) + WTW.camera.yOffset);
							WTW.camera.viewport = new BABYLON.Viewport(0, 0, 1, 1);
							scene.activeCameras[0] = WTW.camera;
						}
						break;
				}
			} else {
				switch (dimensions) {
					case 'Anaglyph':
						if (WTW.cameraAnaglyph == null) {
							WTW.initAnaglyphCamera();
						}
						if (avatar != null && avatarcamera != null) {
							WTW.cameraAnaglyph.lockedTarget = null;
							WTW.cameraAnaglyph.lockedTarget = avatarcamera;
							WTW.cameraAnaglyph.position = new BABYLON.Vector3(avatar.position.x + parseFloat(Math.sin(avatar.rotation.y)) * -step, avatar.position.y + avatarcamera.position.y + WTW.cameraYOffset, avatar.position.z + parseFloat(Math.cos(avatar.rotation.y)) * -step);
						}
						
						WTW.cameraAnaglyph.yOffset = 0;
						WTW.cameraAnaglyph.viewport = new BABYLON.Viewport(0, 0, 1, 1);
						scene.activeCameras[0] = WTW.cameraAnaglyph; 
						break;
					case 'VR':
						if (WTW.cameraVR == null) {
							WTW.initVRCamera();
						}
						if (avatar != null && avatarcamera != null) {
							WTW.cameraVR.lockedTarget = null;
							WTW.cameraVR.lockedTarget = avatarcamera;
							WTW.cameraVR.position = new BABYLON.Vector3(avatar.position.x + parseFloat(Math.sin(avatar.rotation.y)) * -step, avatar.position.y + avatarcamera.position.y + WTW.cameraYOffset, avatar.position.z + parseFloat(Math.cos(avatar.rotation.y)) * -step);
						}
						WTW.cameraVR.yOffset = 0;
						WTW.cameraVR.viewport = new BABYLON.Viewport(0, 0, 1, 1);
						scene.activeCameras[0] = WTW.cameraVR; 
						break;
					case 'VR Gamepad':
						if (WTW.cameraVRGamepad == null) {
							WTW.initVRGamepadCamera();
						}
						if (avatar != null && avatarcamera != null) {
							WTW.cameraVRGamepad.lockedTarget = null;
							WTW.cameraVRGamepad.lockedTarget = avatarcamera;
							WTW.cameraVRGamepad.position = new BABYLON.Vector3(avatar.position.x + parseFloat(Math.sin(avatar.rotation.y)) * -step, avatar.position.y + avatarcamera.position.y + WTW.cameraYOffset, avatar.position.z + parseFloat(Math.cos(avatar.rotation.y)) * -step);
						}
						WTW.cameraVRGamepad.yOffset = 0;
						WTW.cameraVRGamepad.viewport = new BABYLON.Viewport(0, 0, 1, 1);
						scene.activeCameras[0] = WTW.cameraVRGamepad; 
						break;
					default:
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
						break;
				}
			}
			if (avatar != null) {
				if (WTW.camera != null) {
					WTW.camera.rotation.y = WTW.getRadians(WTW.getDegrees(avatar.rotation.y) + WTW.camera.yOffset);
					WTW.camera.position.x = avatar.position.x;
					WTW.camera.position.y = avatar.position.y + avatarcamera.position.y;
					WTW.camera.position.z = avatar.position.z;
				}
				if (WTW.cameraFollow != null) {
					WTW.cameraFollow.rotationOffset = WTW.getDegrees(avatar.rotation.y) + WTW.cameraFollow.yOffset;
				}
				if (WTW.cameraFollowTwo != null) {
					WTW.cameraFollowTwo.rotationOffset = WTW.getDegrees(avatar.rotation.y) + WTW.cameraFollowTwo.yOffset;
				}
			}
			if (dGet('wtw_cameratwotext').innerHTML == "Second Camera On") {
				//WTW.toggleCameraTwo();
				//WTW.toggleCameraTwo();
			}
		} else if (w == 3) {
			if (WTW.cameraArc == null) {
				WTW.initArcCamera();
			}
			avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
			step = 30;
			WTW.cameraYOffset = 20;
			if (avatar != null && avatarcamera != null) {
				WTW.cameraArc.lockedTarget = null;
				WTW.cameraArc.lockedTarget = avatarcamera;
				WTW.cameraArc.position = new BABYLON.Vector3(avatar.position.x + parseFloat(Math.sin(avatar.rotation.y)) * step, avatar.position.y + avatarcamera.position.y + WTW.cameraYOffset, avatar.position.z + parseFloat(Math.cos(avatar.rotation.y)) * step);
			}
			WTW.cameraArc.radius = -step; // how far from the object to follow
			WTW.cameraArc.beta = -Math.PI/3; // how high above the object to place the camera
			WTW.cameraArc.alpha = 0; // the viewing angle		
			WTW.cameraArc.yOffset = 0;
			WTW.cameraArc.viewport = new BABYLON.Viewport(0, 0, 1, 1);
			scene.activeCameras[0] = WTW.cameraArc;
		} else {
			WTW.setCookie("secondcamera",secondcamera,30);
			if (dGet('wtw_cameratwotext').innerHTML == "Second Camera On") {
				if (WTW.cameraFollowTwo == null) {
					WTW.initFollowCamera(2);
				}
				var step = 25;
				WTW.cameraYOffset = 5;
				WTW.cameraFollowTwo.lockedTarget = null;
				switch (secondcamera) {
					case 'First-Person Camera':
						step = 1;
						WTW.cameraYOffset = 0;
						WTW.cameraFollowTwo.radius = step; // how far from the object to follow
						WTW.cameraFollowTwo.heightOffset = WTW.cameraYOffset; // how high above the object to place the camera
						WTW.cameraFollowTwo.yOffset = 0;
						WTW.cameraFollowTwo.inertia = .005;
						WTW.cameraFollowTwo.cameraAcceleration = 0.5;
						WTW.cameraFollowTwo.maxCameraSpeed = 1000;
						WTW.cameraFollowTwo.panningSensibility = 0;
						WTW.cameraFollowTwo.angularSensibility = 0;
						WTW.cameraFollowTwo.moveSensibility = 0;
						WTW.cameraFollowTwo.viewport = new BABYLON.Viewport(0.7, 0.7, 0.3, 0.3);
						scene.activeCameras[1] = WTW.cameraFollowTwo;
						WTW.cameraFollowTwo.rotation.y = avatar.rotation.y;
						WTW.cameraFollowTwo.position.x = avatar.position.x;
						WTW.cameraFollowTwo.position.y = avatar.position.y + avatarcamera.position.y;
						WTW.cameraFollowTwo.position.z = avatar.position.z;
						break;
					case 'Scene Camera':
						step = 40;
						WTW.cameraYOffset = 15;
						WTW.cameraFollowTwo.radius = step; // how far from the object to follow
						WTW.cameraFollowTwo.heightOffset = WTW.cameraYOffset; // how high above the object to place the camera
						WTW.cameraFollowTwo.yOffset = 0;
						WTW.cameraFollowTwo.inertia = .25;
						WTW.cameraFollowTwo.cameraAcceleration = 0.3;
						WTW.cameraFollowTwo.maxCameraSpeed = 800;
						if (avatarcamera != null) {
							WTW.cameraFollowTwo.lockedTarget = avatarcamera;
						}
						WTW.cameraFollowTwo.viewport = new BABYLON.Viewport(0.7, 0.7, 0.3, 0.3);
						scene.activeCameras[1] = WTW.cameraFollowTwo;
						if (avatar != null) {
							WTW.cameraFollowTwo.rotationOffset = WTW.getDegrees(avatar.rotation.y) + WTW.cameraFollowTwo.yOffset;
						}
						break;
					case 'Self Camera':
						avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
						step = 30;
						WTW.cameraYOffset = 8;
						WTW.cameraFollowTwo.radius = step; // how far from the object to follow
						WTW.cameraFollowTwo.heightOffset = WTW.cameraYOffset; // how high above the object to place the camera
						WTW.cameraFollowTwo.yOffset = 180;
						WTW.cameraFollowTwo.inertia = .10;
						WTW.cameraFollowTwo.cameraAcceleration = 0.5;
						WTW.cameraFollowTwo.maxCameraSpeed = 1000;
						if (avatarcamera != null) {
							WTW.cameraFollowTwo.lockedTarget = avatarcamera;
						}
						WTW.cameraFollowTwo.viewport = new BABYLON.Viewport(0.7, 0.7, 0.3, 0.3);
						scene.activeCameras[1] = WTW.cameraFollowTwo;
						if (avatar != null) {
							WTW.cameraFollowTwo.rotationOffset = WTW.getDegrees(avatar.rotation.y) + WTW.cameraFollowTwo.yOffset;
						}
						break;
					default:
						WTW.cameraFollowTwo.radius = step; // how far from the object to follow
						WTW.cameraFollowTwo.heightOffset = WTW.cameraYOffset; // how high above the object to place the camera
						WTW.cameraFollowTwo.yOffset = 0;
						WTW.cameraFollowTwo.inertia = .10;
						WTW.cameraFollowTwo.cameraAcceleration = 0.5;
						WTW.cameraFollowTwo.maxCameraSpeed = 1000;
						if (avatarcamera != null) {
							WTW.cameraFollowTwo.lockedTarget = avatarcamera;
						}
						WTW.cameraFollowTwo.viewport = new BABYLON.Viewport(0.7, 0.7, 0.3, 0.3);
						scene.activeCameras[1] = WTW.cameraFollowTwo;
						if (avatar != null) {
							WTW.cameraFollowTwo.rotationOffset = WTW.getDegrees(avatar.rotation.y) + WTW.cameraFollowTwo.yOffset;
						}
						break;
				}
			} else {
				try {
					if (scene.activeCameras[2] != undefined) {
						scene.activeCameras.splice(2,1);
					}
					if (scene.activeCameras[1] != undefined) {
						scene.activeCameras.splice(1,1);
					}
					if (WTW.cameraFollowTwo != null) {
						WTW.cameraFollowTwo.dispose();
						WTW.cameraFollowTwo = null;
					}
				} catch (ex) {}
			}
		}
		try {
			if (dimensions != 'Anaglyph') {
				WTW.cameraAnaglyph.dispose();
				WTW.cameraAnaglyph = null;
			}
		} catch (ex) {}
		try {
			if (dimensions != 'VR') {
				WTW.cameraVR.dispose();
				WTW.cameraVR = null;
			}
		} catch (ex) {}
		try {
			if (dimensions != 'VR Gamepad') {
				WTW.cameraVRGamepad.dispose();
				WTW.cameraVRGamepad = null;
			}
		} catch (ex) {}
		try {
			if (w != 3 && firstcamera != 'Arc Rotation Camera') {
				WTW.cameraArc.dispose();
				WTW.cameraArc = null;
			}
		} catch (ex) {}
		try {
			if (scene.activeCameras[0].id != 'maincamera') {
				if (scene.activeCameras[1] != undefined) {
					if (scene.activeCameras[1].id != 'maincamera') {
						WTW.camera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
						scene.activeCameras[2] = WTW.camera;
					} else {
						if (scene.activeCameras[2] != undefined) {
							scene.activeCameras[2].splice(2,1);
						}
					}
				} else {
					WTW.camera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
					scene.activeCameras[1] = WTW.camera;
				}
			} else {
				if (scene.activeCameras[2] != undefined) {
					scene.activeCameras[2].splice(2,1);
				}
			}
		} catch (ex) {}
		scene.cameraToUseForPointers = scene.activeCameras[0];
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_cameras.js-switchCamera=" + ex.message);
	}
}

WTWJS.prototype.loadCameraSettings = function() {
	try {
		var dimensions = WTW.getCookie("dimensions");
		if (dimensions == null) {
			dimensions = "";
		} else if (dimensions == '') {
			dimensions = "";
		}
		WTW.setDDLValue('wtw_cameradimensions',dimensions);
		var firstcamera = WTW.getCookie("firstcamera");
		if (firstcamera == null) {
			firstcamera = "Follow Camera";
		} else if (firstcamera == '') {
			firstcamera = "Follow Camera";
		}
		WTW.setDDLValue('wtw_firstcamera',firstcamera);
		WTW.switchCamera(1);
		var showcameratwo = WTW.getCookie("showcameratwo");
		if (showcameratwo != null) {
			if (showcameratwo == "1") {
				dGet('wtw_cameratwotext').innerHTML = "Second Camera On";
				dGet('wtw_cameratwoicon').src = "/content/system/images/menucamera.png";
				dGet('wtw_cameratwoicon').alt = "Hide Second Camera";
				dGet('wtw_cameratwoicon').title = "Hide Second Camera";
				WTW.show('wtw_cameratwoselect');
				var secondcamera = WTW.getCookie("secondcamera");
				if (secondcamera == null) {
					secondcamera = "Scene Camera";
				} else if (secondcamera == "") {
					secondcamera = "Scene Camera";
				}
				WTW.setDDLValue('wtw_secondcamera',secondcamera);
				WTW.switchCamera(2);
			}
		}
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_cameras.js-loadCameraSettings=" + ex.message);
	}
}

WTWJS.prototype.initAvatarCameras = function() {
	try {
		var step = -25;
		WTW.cameraYOffset = 5;
		var avatar = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value);
		var avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-camera");
		
		switch (WTW.getDDLValue('wtw_firstcamera')) {
			case 'First-Person Camera':
				step = 0;
				WTW.cameraYOffset = 2;
				break;
			case 'Scene Camera':
				step = -40;
				WTW.cameraYOffset = 15;
				break;
			case 'Self Camera':
				avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
				step = 30;
				WTW.cameraYOffset = 8;
				break;
		}
		if (avatarcamera != null && avatar != null) {
			if (WTW.cameraFollow != null) {
				//WTW.cameraFollow.parent = WTW.myAvatar;
				WTW.cameraFollow.lockedTarget = avatarcamera;
			}
			if (WTW.cameraAnaglyph != null) {
				//WTW.cameraAnaglyph.parent = WTW.myAvatar;
				switch (WTW.getDDLValue('wtw_firstcamera')) {
					case 'First-Person Camera':
						WTW.cameraAnaglyph.lockedTarget = null;
						break;
					default:
						WTW.cameraAnaglyph.lockedTarget = avatarcamera;
						break;
				}
			}
			if (WTW.cameraVR != null) {
				//WTW.cameraVR.parent = WTW.myAvatar;
				switch (WTW.getDDLValue('wtw_firstcamera')) {
					case 'First-Person Camera':
						WTW.cameraVR.lockedTarget = null;
						break;
					default:
						WTW.cameraVR.lockedTarget = avatarcamera;
						break;
				}
			}
			if (WTW.cameraVRGamepad != null) {
				//WTW.cameraVRGamepad.parent = WTW.myAvatar;
				switch (WTW.getDDLValue('wtw_firstcamera')) {
					case 'First-Person Camera':
						WTW.cameraVRGamepad.lockedTarget = null;
						break;
					default:
						WTW.cameraVRGamepad.lockedTarget = avatarcamera;
						break;
				}
			}
			if (WTW.cameraFollowTwo != null && avatar != null) {
				//WTW.cameraFollowTwo.parent = WTW.myAvatar;
				avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-camera");
				WTW.cameraFollowTwo.lockedTarget = null;
				if (secondcamera == 'First-Person Camera' && avatarcamera != null) {
				} else if (secondcamera == 'Self Camera' && avatar != null && avatarcamera != null) {
					avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
					WTW.cameraFollowTwo.lockedTarget = avatarcamera;
				} else if (avatar != null && avatarcamera != null) {
					WTW.cameraFollowTwo.lockedTarget = avatarcamera;
				}
			}
			if (WTW.cameraArc != null && avatar != null) {
				//WTW.cameraArc.parent = WTW.myAvatar;
				avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
				WTW.cameraArc.lockedTarget = avatarcamera;
			}
		} 
		WTW.setMovingCameras(avatar, avatarcamera);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_cameras.js-initAvatarCameras=" + ex.message);
	}
}

WTWJS.prototype.initFirstPersonCamera = function() {
	try {
		WTW.camera = new BABYLON.UniversalCamera("maincamera", new BABYLON.Vector3(WTW.init.startPositionX, WTW.init.startPositionY, WTW.init.startPositionZ), scene);
		WTW.camera.inputs.clear();
		//WTW.camera.inputs.remove(WTW.camera.inputs.attached.keyboard); 
		//WTW.camera.inputs.remove(WTW.camera.inputs.attached.mouse); 
		WTW.camera.yOffset = 180;
		WTW.camera.inertia = .75;
		WTW.camera.id = "maincamera";
		scene.activeCameras.push(WTW.camera);	
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_cameras.js-initFirstPersonCamera=" + ex.message);
	}
}

WTWJS.prototype.initFollowCamera = function(viewport) {
	try {
		if (viewport == undefined) {
			viewport = 2;
		}
		var avatarcamera = null;
		if (WTW.getDDLValue('wtw_firstcamera') == 'Self Camera') {
			avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
		} else {
			avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-camera");
		}
		if (viewport == 2) {
			WTW.cameraFollowTwo = new BABYLON.FollowCamera("followcamera", WTW.camera.position, scene);
			WTW.cameraFollowTwo.inputs.clear();
			//WTW.cameraFollowTwo.inputs.remove(WTW.cameraFollowTwo.inputs.attached.keyboard); 
			//WTW.cameraFollowTwo.inputs.remove(WTW.cameraFollowTwo.inputs.attached.mouse); 
			if (avatarcamera != null) {
				WTW.cameraFollowTwo.lockedTarget = avatarcamera;
			}
			WTW.cameraFollowTwo.yOffset = 0;
			WTW.cameraFollowTwo.viewport = new BABYLON.Viewport(0.7, 0.7, 0.3, 0.3);
			WTW.cameraFollowTwo.id = "followcameratwo";
			//WTW.cameraFollowTwo.parent = WTW.myAvatar;
			scene.activeCameras.push(WTW.cameraFollowTwo);
		} else {
			WTW.cameraFollow = new BABYLON.FollowCamera("followcamera", WTW.camera.position, scene);
			WTW.cameraFollow.inputs.clear();
			//WTW.cameraFollow.inputs.remove(WTW.cameraFollow.inputs.attached.keyboard); 
			//WTW.cameraFollow.inputs.remove(WTW.cameraFollow.inputs.attached.mouse); 
			if (avatarcamera != null) {
				WTW.cameraFollow.lockedTarget = avatarcamera;
			}
			WTW.cameraFollow.yOffset = 0;
			WTW.cameraFollow.viewport = new BABYLON.Viewport(0, 0, 1, 1);
			WTW.cameraFollow.id = "followcamera";
			//WTW.cameraFollow.parent = WTW.myAvatar;
			scene.activeCameras.push(WTW.cameraFollow);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_cameras.js-initFollowCamera=" + ex.message);
	}
}

WTWJS.prototype.initArcCamera = function() {
	try {
		WTW.cameraArc = new BABYLON.ArcRotateCamera("thingcamera", 0, 1.5, 75, scene.activeCameras[0].position, scene);
		WTW.cameraArc.inputs.clear();
		//WTW.cameraArc.inputs.remove(WTW.cameraArc.inputs.attached.keyboard); 
		//WTW.cameraArc.inputs.remove(WTW.cameraArc.inputs.attached.mouse); 
		WTW.cameraArc.id = "thingcamera";
		WTW.cameraArc.alpha = 0;
		//WTW.cameraArc.beta = 1.5;
		WTW.cameraArc.radius = 75;
		WTW.cameraArc.viewport = new BABYLON.Viewport(0, 0, 1, 1);
		WTW.cameraArc.angularSensibility = 1000;
		//WTW.cameraArc.ellipsoid = new BABYLON.Vector3(3, 6, 3);
		//WTW.cameraArc.checkCollisions = true;
		//WTW.cameraArc.applyGravity = true;		
		WTW.cameraArc.inertia = .75;
		WTW.cameraArc.fov = .4;
		//WTW.cameraArc.parent = WTW.myAvatar;
		scene.activeCameras.push(WTW.cameraArc);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_cameras.js-initArcCamera=" + ex.message);
	}
}

WTWJS.prototype.initAnaglyphCamera = function() {
	try {
		WTW.cameraAnaglyph = new BABYLON.AnaglyphUniversalCamera("anaglyphcamera", scene.activeCameras[0].position, .033, scene); //eye space = .033 try .05
		//WTW.cameraAnaglyph = new BABYLON.AnaglyphArcRotateCamera("anaglyphcamera", 0, Math.PI / 2, 10, scene.activeCameras[0].position, .033, scene);
		WTW.cameraAnaglyph.inputs.clear();
		//WTW.cameraAnaglyph.inputs.remove(WTW.cameraAnaglyph.inputs.attached.keyboard); 
		//WTW.cameraAnaglyph.inputs.remove(WTW.cameraAnaglyph.inputs.attached.mouse); 
		var avatarcamera = null;
		if (WTW.getDDLValue('wtw_firstcamera') == 'Self Camera') {
			avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
		} else {
			avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-camera");
		}
		if (avatarcamera != null) {
			WTW.cameraAnaglyph.lockedTarget = avatarcamera;
		}
		WTW.cameraAnaglyph.yOffset = 180;
/*		WTW.cameraAnaglyph.inertia = .10;
		WTW.cameraAnaglyph.cameraAcceleration = 0.5;
		WTW.cameraAnaglyph.maxCameraSpeed = 1000;
*/		WTW.cameraAnaglyph.viewport = new BABYLON.Viewport(0, 0, 1, 1);
		WTW.cameraAnaglyph.id = "anaglyphcamera";
		//WTW.cameraAnaglyph.parent = WTW.myAvatar;
		scene.activeCameras.push(WTW.cameraAnaglyph);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_cameras.js-initAnaglyphCamera=" + ex.message);
	}
}

WTWJS.prototype.initVRCamera = function() {
	try {
		WTW.cameraVR = new BABYLON.VRDeviceOrientationFreeCamera ("vrcamera", scene.activeCameras[0].position, scene);
		//WTW.cameraVR = new BABYLON.VRDeviceOrientationArcRotateCamera ("vrcamera", 0, Math.PI / 2, 10, scene.activeCameras[0].position, scene);
		WTW.cameraVR.inputs.clear();
		//WTW.cameraVR.inputs.remove(WTW.cameraVR.inputs.attached.keyboard); 
		//WTW.cameraVR.inputs.remove(WTW.cameraVR.inputs.attached.mouse);
		var avatarcamera = null;
		if (WTW.getDDLValue('wtw_firstcamera') == 'Self Camera') {
			avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
		} else {
			avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-camera");
		}
		if (avatarcamera != null) {
			WTW.cameraVR.lockedTarget = avatarcamera;
		}
		WTW.cameraVR.yOffset = 180;
/*		WTW.cameraVR.inertia = .10;
		WTW.cameraVR.cameraAcceleration = 0.5;
		WTW.cameraVR.maxCameraSpeed = 1000;
*/		WTW.cameraVR.viewport = new BABYLON.Viewport(0, 0, 1, 1);
		WTW.cameraVR.id = "vrcamera";
		//WTW.cameraVR.parent = WTW.myAvatar;
		scene.activeCameras.push(WTW.cameraVR);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_cameras.js-initVRCamera=" + ex.message);
	}
}

WTWJS.prototype.initVRGamepadCamera = function() {
	try {
		WTW.cameraVRGamepad = new BABYLON.VRDeviceOrientationGamepadCamera("vrgamepadcamera", scene.activeCameras[0].position, scene);
		//WTW.cameraVRGamepad.inputs.clear();
		WTW.cameraVRGamepad.inputs.remove(WTW.cameraVRGamepad.inputs.attached.keyboard); 
		WTW.cameraVRGamepad.inputs.remove(WTW.cameraVRGamepad.inputs.attached.mouse);
		var avatarcamera = null;
		if (WTW.getDDLValue('wtw_firstcamera') == 'Self Camera') {
			avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
		} else {
			avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-camera");
		}
		if (avatarcamera != null) {
			WTW.cameraVRGamepad.lockedTarget = avatarcamera;
		}
		WTW.cameraVRGamepad.yOffset = 180;
/*		WTW.cameraVRGamepad.inertia = .10;
		WTW.cameraVRGamepad.cameraAcceleration = 0.5;
		WTW.cameraVRGamepad.maxCameraSpeed = 1000;
*/		WTW.cameraVRGamepad.viewport = new BABYLON.Viewport(0, 0, 1, 1);
		WTW.cameraVRGamepad.id = "vrgamepadcamera";
		//WTW.cameraVRGamepad.parent = WTW.myAvatar;
		scene.activeCameras.push(WTW.cameraVRGamepad);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_cameras.js-initVRGamepadCamera=" + ex.message);
	}
}

WTWJS.prototype.setMovingCameras = function(avatar, avatarcamera) {
	try {
		if (avatar != null && WTW.cameraFocus == 1) {
			var mainparent = scene.getMeshByID(WTW.mainParent);
			if (avatar.name.indexOf('myavatar-') > -1) {
				var dist = -25;
				var height = 5;
				var firstcamera = WTW.getDDLValue('wtw_firstcamera');
				var secondcamera = WTW.getDDLValue('wtw_secondcamera');
				switch (firstcamera) {
					case 'First-Person Camera':
						dist = 2;
						height = 2;
						break;
					case 'Scene Camera':
						dist = -40;
						height = 15;
						break;
					case 'Self Camera':
						dist = 30;
						height = 8;
						break;
				}
				if (WTW.camera != null && avatarcamera != null) {
//WTW.log("sin=" + Math.sin(avatar.rotation.y) + "==cos=" + Math.cos(avatar.rotation.y));
					WTW.camera.position.x = avatar.position.x; //-(Math.sin(avatar.rotation.y) - Math.cos(avatar.rotation.y));
					WTW.camera.position.y = avatar.position.y + avatarcamera.position.y;
					WTW.camera.position.z = avatar.position.z-(Math.sin(avatar.rotation.y) + Math.cos(avatar.rotation.y));
					WTW.camera.rotation.y = WTW.getRadians(WTW.getDegrees(avatar.rotation.y) + WTW.camera.yOffset);
					WTW.camera.rotation.x = Math.atan2(WTW.cameraYOffset, 20);
				}
				if (WTW.cameraFollow != null) {
					WTW.cameraFollow.heightOffset = WTW.cameraYOffset;
					WTW.cameraFollow.rotationOffset = WTW.getDegrees(avatar.rotation.y) + WTW.cameraFollow.yOffset;
				}
				if (WTW.cameraFollowTwo != null && avatar != null && avatarcamera != null) {
					if (secondcamera == 'First-Person Camera') {
						WTW.cameraFollowTwo.position.x = avatar.position.x;
						WTW.cameraFollowTwo.position.y = avatar.position.y + avatarcamera.position.y;
						WTW.cameraFollowTwo.position.z = avatar.position.z-(Math.sin(avatar.rotation.y) + Math.cos(avatar.rotation.y));
						WTW.cameraFollowTwo.rotation.y = avatar.rotation.y;
					} else {
						WTW.cameraFollowTwo.rotationOffset = WTW.getDegrees(avatar.rotation.y) + WTW.cameraFollowTwo.yOffset;
					}
				}
				if (WTW.cameraAnaglyph != null && avatar != null && avatarcamera != null) {
					if (firstcamera == 'First-Person Camera') {
						WTW.cameraAnaglyph.rotation.x = Math.atan2(WTW.cameraYOffset, 20);
					}
					WTW.cameraAnaglyph.rotation.y = WTW.getRadians(WTW.getDegrees(avatar.rotation.y) + WTW.cameraAnaglyph.yOffset);
					WTW.cameraAnaglyph.position = new BABYLON.Vector3(avatar.position.x + parseFloat(Math.sin(avatar.rotation.y)) * -dist, avatar.position.y + avatarcamera.position.y + WTW.cameraYOffset, avatar.position.z + parseFloat(Math.cos(avatar.rotation.y)) * -dist);
				}
				if (WTW.cameraVR != null && avatar != null && avatarcamera != null) {
					if (firstcamera == 'First-Person Camera') {
						var e = new BABYLON.Vector3(Math.atan2(WTW.cameraYOffset, 20),WTW.getRadians(WTW.getDegrees(avatar.rotation.y) + WTW.cameraVR.yOffset),0);
						WTW.cameraVR.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(e.y, e.x, e.z);   
					} else {
						WTW.cameraVR.rotation.y = WTW.getRadians(WTW.getDegrees(avatar.rotation.y) + WTW.cameraVR.yOffset);
					}
					WTW.cameraVR.position = new BABYLON.Vector3(avatar.position.x + parseFloat(Math.sin(avatar.rotation.y)) * -dist, avatar.position.y + avatarcamera.position.y + WTW.cameraYOffset, avatar.position.z + parseFloat(Math.cos(avatar.rotation.y)) * -dist);
				}
				if (WTW.cameraVRGamepad != null && avatar != null && avatarcamera != null) {
					if (firstcamera == 'First-Person Camera') {
						var e = new BABYLON.Vector3(Math.atan2(WTW.cameraYOffset, 20),WTW.getRadians(WTW.getDegrees(avatar.rotation.y) + WTW.cameraVRGamepad.yOffset),0);
						WTW.cameraVRGamepad.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(e.y, e.x, e.z);   
					} else {
						WTW.cameraVRGamepad.rotation.y = WTW.getRadians(WTW.getDegrees(avatar.rotation.y) + WTW.cameraVRGamepad.yOffset);
					}
					WTW.cameraVRGamepad.position = new BABYLON.Vector3(avatar.position.x + parseFloat(Math.sin(avatar.rotation.y)) * -dist, avatar.position.y + avatarcamera.position.y + WTW.cameraYOffset, avatar.position.z + parseFloat(Math.cos(avatar.rotation.y)) * -dist);
				}								

				if (WTW.cameraArc != null && avatar != null) {
					dist = -60;
					height = 5;
					avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
					WTW.cameraArc.lockedTarget = avatarcamera;
					WTW.cameraArc.setPosition(new BABYLON.Vector3(avatar.position.x + parseFloat(Math.sin(avatar.rotation.y)) * dist, avatar.position.y + avatarcamera.position.y + WTW.cameraYOffset, avatar.position.z + parseFloat(Math.cos(avatar.rotation.y)) * dist));
				}
				if (WTW.scrollTimer != null) {
					var nowdate = new Date();
					if ((nowdate - WTW.scrollTimer) > 500) {
						WTW.keyPressedRemove(1040);
						WTW.keyPressedRemove(1038);
						WTW.keyPressedRemove(2038);
						WTW.keyPressedRemove(2040);
						WTW.scrollTimer = null;
					}	
				}
			}
		}
	} catch(ex) {
		WTW.log("core-scripts-prime-wtw_cameras.js-setMovingCameras=" + ex.message);
	}
}

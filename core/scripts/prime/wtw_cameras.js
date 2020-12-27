/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions pertain to the various camera and camera tracking with avatars */

WTWJS.prototype.loadPrimaryCamera = function(parentmold) {
	/* loads the initial camera on the scene - before the avatar is shown */
	try {
		if (/Android|webOS|iPhone|iPad|Opera Mini|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            WTW.isMobile = true;
			WTW.camera = new BABYLON.VirtualJoysticksCamera("maincamera",new BABYLON.Vector3(WTW.init.startPositionX, WTW.init.startPositionY, WTW.init.startPositionZ), scene);
            WTW.camera.inertia = .70;
            WTW.camera.speed = 1.8;
		} else {
            WTW.isMobile = false;
			WTW.camera = new BABYLON.UniversalCamera("maincamera", new BABYLON.Vector3(WTW.init.startPositionX, WTW.init.startPositionY, WTW.init.startPositionZ), scene);
			WTW.camera.inertia = .80;
		}
		WTW.camera.inputs.attached.keyboard.detachControl();
		if (WTW.placeHolder == 0) {
			WTW.camera.inputs.attached.mouse.detachControl();
		} else {
			WTW.camera.inputs.remove(WTW.camera.inputs.attached.keyboard); 
		}
		WTW.resetActivityTimer();
		WTW.camera.yOffset = 90;	
		WTW.camera.angularSensibility = 1800;
		WTW.camera.maxZ = 5000;
		WTW.camera.id = "maincamera";
		WTW.camera.position.x = WTW.init.startPositionX;
		WTW.camera.position.y = WTW.init.startPositionY + 16;
		WTW.camera.position.z = WTW.init.startPositionZ;
		WTW.camera.rotation.y = WTW.getRadians(WTW.init.startRotationY + 90);
		WTW.camera.rotation.x = WTW.getRadians(10);
		WTW.camera.viewport = new BABYLON.Viewport(0, 0, 1, 1);
		WTW.addActiveCamera(WTW.camera);
		scene.activeCameras[0].attachControl(canvas, true);
		WTW.camera.parent = parentmold; 
		scene.cameraToUseForPointers = scene.activeCameras[0];
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_cameras.js-loadPrimaryCamera=" + ex.message);
	}
}

WTWJS.prototype.loadCameraSettings = function() {
	/* retrieve the camera settings from cookies if they are set */
	try {
		var zfirstcamera = WTW.getCookie("firstcamera");
		if (zfirstcamera == null) {
			zfirstcamera = "Follow Camera";
		} else if (zfirstcamera == '') {
			zfirstcamera = "Follow Camera";
		}
		WTW.setDDLValue('wtw_firstcamera',zfirstcamera);
		var zdimensions = WTW.getCookie("dimensions");
		if (zdimensions == null) {
			zdimensions = "";
		} else if (zdimensions == '') {
			zdimensions = "";
		}
		WTW.setDDLValue('wtw_cameradimensions',zdimensions);
		//WTW.switchCamera(1);
		var zshowcameratwo = WTW.getCookie("showcameratwo");
		if (zshowcameratwo != null) {
			if (zshowcameratwo == "1") {
				dGet('wtw_cameratwotext').innerHTML = "Second Camera On";
				dGet('wtw_cameratwoicon').src = "/content/system/images/menucamera.png";
				dGet('wtw_cameratwoicon').alt = "Hide Second Camera";
				dGet('wtw_cameratwoicon').title = "Hide Second Camera";
				WTW.show('wtw_cameratwoselect');
				var zsecondcamera = WTW.getCookie("secondcamera");
				if (zsecondcamera == null) {
					zsecondcamera = "Scene Camera";
				} else if (zsecondcamera == "") {
					zsecondcamera = "Scene Camera";
				}
				WTW.setDDLValue('wtw_secondcamera',zsecondcamera);
				//WTW.switchCamera(2);
			}
		}
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_cameras.js-loadCameraSettings=" + ex.message);
	}
}

WTWJS.prototype.switchCamera = function(w) {
	/* switch camera for your avatar - includes various combinations of cameras and positions */
	try {
		WTW.cameraYOffset = 0;
		var zavatar = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value);
		var zavatarcenter = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
		var zavatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-camera");
		var zfirstcamera = WTW.getDDLValue('wtw_firstcamera');
		var zsecondcamera = WTW.getDDLValue('wtw_secondcamera');
		var zdimensions = WTW.getDDLValue('wtw_cameradimensions');
		document.activeElement.blur();
		if (w == 1) {
			if (zfirstcamera == "First-Person Camera") {
				WTW.setCookie("firstcamera","Follow Camera",30);
				zdimensions = '';
				WTW.setDDLValue('wtw_cameradimensions',zdimensions);
			} else {
				WTW.setCookie("firstcamera",zfirstcamera,30);
				WTW.setCookie("dimensions",zdimensions,30);
			}
			var zstep = -25;
			WTW.cameraYOffset = 5;
			switch (zfirstcamera) {
				case 'First-Person Camera':
					zstep = 0;
					WTW.cameraYOffset = 2;
					break;
				case 'Scene Camera':
					zstep = -40;
					WTW.cameraYOffset = 15;
					break;
				case 'Self Camera':
					zstep = 30;
					WTW.cameraYOffset = 8;
					break;
			}
			if (zfirstcamera == 'First-Person Camera') {
				var zheadtop = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-headtop");
				switch (zdimensions) {
					case 'Anaglyph':
						if (WTW.cameraAnaglyph == null) {
							WTW.initAnaglyphCamera();
						}
						if (WTW.cameraAnaglyph != null && zavatar != null && zavatarcamera != null) {
							WTW.cameraAnaglyph.lockedTarget = null;
							//WTW.cameraAnaglyph.yOffset = 180;
							//WTW.cameraAnaglyph.rotation.y = WTW.getRadians(WTW.getDegrees(zavatar.rotation.y) + WTW.cameraAnaglyph.yOffset);
							//WTW.cameraAnaglyph.position = new BABYLON.Vector3(zavatar.position.x + parseFloat(Math.sin(zavatar.rotation.y)) * zstep, zavatar.position.y + zavatarcamera.position.y + WTW.cameraYOffset, zavatar.position.z + parseFloat(Math.cos(zavatar.rotation.y)) * zstep);

							if (WTW.cameraFocus == 1 && zheadtop != null) {
								WTW.cameraAnaglyph.parent = WTW.camera;
								//WTW.cameraAnaglyph.parent = zavatarcamera;
								//zavatarcamera.parent = zheadtop;
								WTW.cameraAnaglyph.position.x = 0;
								WTW.cameraAnaglyph.position.y = 0;
								WTW.cameraAnaglyph.position.z = 0;
								WTW.cameraAnaglyph.rotation.x = WTW.getRadians(0);
								WTW.cameraAnaglyph.rotation.y = WTW.getRadians(0);
								WTW.cameraAnaglyph.rotation.z = WTW.getRadians(0);
							} else if (WTW.cameraFocus != 1) {
								//if (WTW.mainParentMold != null) {
								//	WTW.cameraAnaglyph.parent = WTW.mainParentMold;
								//}
							}
							if (WTW.cameraFollow != null) {
								WTW.cameraFollow.viewport = new BABYLON.Viewport(0, 0, 0, 0);
								scene.activeCameras[2] = WTW.cameraFollow;
							}
							WTW.camera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
							scene.activeCameras[1] = WTW.camera;
							WTW.cameraAnaglyph.viewport = new BABYLON.Viewport(0, 0, 1, 1);
							scene.activeCameras[0] = WTW.cameraAnaglyph;
						}
						break;
					case 'VR':
						if (WTW.cameraVR == null) {
							WTW.initVRCamera();
						}
						if (zavatar != null && zavatarcamera != null) {
							WTW.cameraVR.lockedTarget = null;
							WTW.cameraVR.yOffset = 180;
							WTW.cameraVR.rotation.y = WTW.getRadians(WTW.getDegrees(zavatar.rotation.y) + WTW.cameraVR.yOffset);
							WTW.cameraVR.position = new BABYLON.Vector3(zavatar.position.x + parseFloat(Math.sin(zavatar.rotation.y)) * zstep, zavatar.position.y + zavatarcamera.position.y + WTW.cameraYOffset, zavatar.position.z + parseFloat(Math.cos(zavatar.rotation.y)) * zstep);
						}
						break;
					case 'VR Gamepad':
						if (WTW.cameraVRGamepad == null) {
							WTW.initVRGamepadCamera();
						}
						if (zavatar != null && zavatarcamera != null) {
							WTW.cameraVRGamepad.lockedTarget = null;
							WTW.cameraVRGamepad.yOffset = 180;
							WTW.cameraVRGamepad.rotation.y = WTW.getRadians(WTW.getDegrees(zavatar.rotation.y) + WTW.cameraVRGamepad.yOffset);
							WTW.cameraVRGamepad.position = new BABYLON.Vector3(zavatar.position.x + parseFloat(Math.sin(zavatar.rotation.y)) * zstep, zavatar.position.y + zavatarcamera.position.y + WTW.cameraYOffset, zavatar.position.z + parseFloat(Math.cos(zavatar.rotation.y)) * zstep);
						}
						break;
					default:
						if (WTW.camera != null && zavatar != null && zavatarcamera != null) {
							if (WTW.cameraFocus == 1 && zheadtop != null) {
								WTW.camera.parent = zavatarcamera;
								zavatarcamera.parent = zheadtop;
								WTW.camera.position.x = 0;
								WTW.camera.position.y = 0;
								WTW.camera.position.z = 0;
								WTW.camera.rotation.x = WTW.getRadians(0);
								WTW.camera.rotation.y = WTW.getRadians(0);
								WTW.camera.rotation.z = WTW.getRadians(0);
							} else if (WTW.cameraFocus != 1) {
								if (WTW.mainParentMold != null) {
									WTW.camera.parent = WTW.mainParentMold;
									
								}
							}
							if (WTW.cameraFollow != null) {
								WTW.cameraFollow.viewport = new BABYLON.Viewport(0, 0, 0, 0);
								scene.activeCameras[1] = WTW.cameraFollow;
							}
							WTW.camera.viewport = new BABYLON.Viewport(0, 0, 1, 1);
							scene.activeCameras[0] = WTW.camera;
						}
						break;
				}
			} else {
				switch (zdimensions) {
					case 'Anaglyph':
						if (WTW.cameraAnaglyph == null) {
							WTW.initAnaglyphCamera();
						}
						if (zavatar != null && zavatarcenter != null) {
							WTW.cameraAnaglyph.lockedTarget = null;
							WTW.cameraAnaglyph.lockedTarget = zavatarcenter;
						}
						if (WTW.mainParentMold != null) {
							WTW.cameraAnaglyph.parent = WTW.mainParentMold;
						}
						if (WTW.cameraFollow != null) {
							WTW.cameraFollow.viewport = new BABYLON.Viewport(0, 0, 0, 0);
							scene.activeCameras[2] = WTW.cameraFollow;
						}
						WTW.camera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
						scene.activeCameras[1] = WTW.camera;
						WTW.cameraAnaglyph.viewport = new BABYLON.Viewport(0, 0, 1, 1);
						scene.activeCameras[0] = WTW.cameraAnaglyph; 
						break;
					case 'VR':
						if (WTW.cameraVR == null) {
							WTW.initVRCamera();
						}
						if (zavatar != null && zavatarcenter != null) {
							WTW.cameraVR.lockedTarget = null;
							WTW.cameraVR.lockedTarget = zavatarcenter;
						}
						if (WTW.cameraFollow != null) {
							WTW.cameraFollow.viewport = new BABYLON.Viewport(0, 0, 0, 0);
							scene.activeCameras[2] = WTW.cameraFollow;
						}
						WTW.camera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
						scene.activeCameras[1] = WTW.camera;
						WTW.cameraVR.viewport = new BABYLON.Viewport(0, 0, 1, 1);
						scene.activeCameras[0] = WTW.cameraVR; 
						break;
					case 'VR Gamepad':
						if (WTW.cameraVRGamepad == null) {
							WTW.initVRGamepadCamera();
						}
						if (zavatar != null && zavatarcenter != null) {
							WTW.cameraVRGamepad.lockedTarget = null;
							WTW.cameraVRGamepad.lockedTarget = zavatarcenter;
							WTW.cameraVRGamepad.position = new BABYLON.Vector3(zavatar.position.x + parseFloat(Math.sin(zavatar.rotation.y)) * -zstep, zavatar.position.y + zavatarcenter.position.y + WTW.cameraYOffset, zavatar.position.z + parseFloat(Math.cos(zavatar.rotation.y)) * -zstep);
						}
						if (WTW.cameraFollow != null) {
							WTW.cameraFollow.viewport = new BABYLON.Viewport(0, 0, 0, 0);
							scene.activeCameras[2] = WTW.cameraFollow;
						}
						WTW.camera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
						scene.activeCameras[1] = WTW.camera;
						WTW.cameraVRGamepad.viewport = new BABYLON.Viewport(0, 0, 1, 1);
						scene.activeCameras[0] = WTW.cameraVRGamepad; 
						break;
					default:
						if (WTW.cameraFollow == null) {
							WTW.initFollowCamera(1);
						}
						if (zavatar != null && zavatarcenter != null) {
							WTW.cameraFollow.lockedTarget = null;
							WTW.cameraFollow.lockedTarget = zavatarcenter;
						}
						WTW.setCameraDistance(); // how far from the object to follow
						WTW.cameraFollow.heightOffset = WTW.cameraYOffset; // how high above the object to place the camera
						WTW.cameraFollow.rotationOffset = 0; // the viewing angle		
						WTW.cameraFollow.yOffset = 180;
						WTW.cameraFollow.inertia = .10;
						WTW.cameraFollow.cameraAcceleration = 0.5;
						WTW.cameraFollow.maxCameraSpeed = 1000;
						WTW.camera.viewport = new BABYLON.Viewport(0, 0, 0, 0);
						scene.activeCameras[1] = WTW.camera;
						WTW.cameraFollow.viewport = new BABYLON.Viewport(0, 0, 1, 1);
						scene.activeCameras[0] = WTW.cameraFollow;
						break;
				}
			}
		} else if (w == 3) {
			if (WTW.cameraArc == null) {
				WTW.initArcCamera();
			}
			zstep = 30;
			WTW.cameraYOffset = 20;
			if (zavatar != null && zavatarcenter != null) {
				WTW.cameraArc.lockedTarget = null;
				WTW.cameraArc.lockedTarget = zavatarcenter;
				WTW.cameraArc.position = new BABYLON.Vector3(zavatar.position.x + parseFloat(Math.sin(zavatar.rotation.y)) * zstep, zavatar.position.y + zavatarcenter.position.y + WTW.cameraYOffset, zavatar.position.z + parseFloat(Math.cos(zavatar.rotation.y)) * zstep);
			}
			WTW.cameraArc.radius = -zstep; // how far from the object to follow
			WTW.cameraArc.beta = -Math.PI/3; // how high above the object to place the camera
			WTW.cameraArc.alpha = 0; // the viewing angle		
			WTW.cameraArc.yOffset = 0;
			WTW.cameraArc.viewport = new BABYLON.Viewport(0, 0, 1, 1);
			scene.activeCameras[0] = WTW.cameraArc;
		} else {
			WTW.setCookie("secondcamera",zsecondcamera,30);
			if (dGet('wtw_cameratwotext').innerHTML == "Second Camera On") {
				if (WTW.cameraFollowTwo == null) {
					WTW.initFollowCamera(2);
				}
				var zstep = 25;
				WTW.cameraFollowTwo.lockedTarget = null;
				switch (zsecondcamera) {
					case 'First-Person Camera':
						zstep = 1;
						WTW.cameraFollowTwo.radius = zstep; // how far from the object to follow
						WTW.cameraFollowTwo.heightOffset = 0; // how high above the object to place the camera
						WTW.cameraFollowTwo.yOffset = 0;
						WTW.cameraFollowTwo.inertia = .005;
						WTW.cameraFollowTwo.cameraAcceleration = 0.5;
						WTW.cameraFollowTwo.maxCameraSpeed = 1000;
						WTW.cameraFollowTwo.panningSensibility = 0;
						WTW.cameraFollowTwo.angularSensibility = 0;
						WTW.cameraFollowTwo.moveSensibility = 0;
						WTW.cameraFollowTwo.viewport = new BABYLON.Viewport(0.7, 0.7, 0.3, 0.3);
						scene.activeCameras[1] = WTW.cameraFollowTwo;
						WTW.cameraFollowTwo.rotation.y = zavatar.rotation.y;
						WTW.cameraFollowTwo.position.x = zavatar.position.x;
						WTW.cameraFollowTwo.position.y = zavatar.position.y + zavatarcamera.position.y;
						WTW.cameraFollowTwo.position.z = zavatar.position.z;
						break;
					case 'Scene Camera':
						zstep = 40;
						WTW.cameraFollowTwo.radius = zstep; // how far from the object to follow
						WTW.cameraFollowTwo.heightOffset = 15; // how high above the object to place the camera
						WTW.cameraFollowTwo.yOffset = 0;
						WTW.cameraFollowTwo.inertia = .25;
						WTW.cameraFollowTwo.cameraAcceleration = 0.3;
						WTW.cameraFollowTwo.maxCameraSpeed = 800;
						if (zavatarcenter != null) {
							WTW.cameraFollowTwo.lockedTarget = zavatarcenter;
						}
						WTW.cameraFollowTwo.viewport = new BABYLON.Viewport(0.7, 0.7, 0.3, 0.3);
						scene.activeCameras[1] = WTW.cameraFollowTwo;
						if (zavatar != null) {
							WTW.cameraFollowTwo.rotationOffset = WTW.getDegrees(zavatar.rotation.y) + WTW.cameraFollowTwo.yOffset;
						}
						break;
					case 'Self Camera':
						zstep = 30;
						WTW.cameraFollowTwo.radius = zstep; // how far from the object to follow
						WTW.cameraFollowTwo.heightOffset = 8; // how high above the object to place the camera
						WTW.cameraFollowTwo.yOffset = 180;
						WTW.cameraFollowTwo.inertia = .10;
						WTW.cameraFollowTwo.cameraAcceleration = 0.5;
						WTW.cameraFollowTwo.maxCameraSpeed = 1000;
						if (zavatarcenter != null) {
							WTW.cameraFollowTwo.lockedTarget = zavatarcenter;
						}
						WTW.cameraFollowTwo.viewport = new BABYLON.Viewport(0.7, 0.7, 0.3, 0.3);
						scene.activeCameras[1] = WTW.cameraFollowTwo;
						if (zavatar != null) {
							WTW.cameraFollowTwo.rotationOffset = WTW.getDegrees(zavatar.rotation.y) + WTW.cameraFollowTwo.yOffset;
						}
						break;
					default:
						WTW.cameraFollowTwo.radius = zstep; // how far from the object to follow
						WTW.cameraFollowTwo.heightOffset = 0; // how high above the object to place the camera
						WTW.cameraFollowTwo.yOffset = 0;
						WTW.cameraFollowTwo.inertia = .10;
						WTW.cameraFollowTwo.cameraAcceleration = 0.5;
						WTW.cameraFollowTwo.maxCameraSpeed = 1000;
						if (zavatarcenter != null) {
							WTW.cameraFollowTwo.lockedTarget = zavatarcenter;
						}
						WTW.cameraFollowTwo.viewport = new BABYLON.Viewport(0.7, 0.7, 0.3, 0.3);
						scene.activeCameras[1] = WTW.cameraFollowTwo;
						if (zavatar != null) {
							WTW.cameraFollowTwo.rotationOffset = WTW.getDegrees(zavatar.rotation.y) + WTW.cameraFollowTwo.yOffset;
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
			if (zdimensions != 'Anaglyph') {
				WTW.cameraAnaglyph.dispose();
				WTW.cameraAnaglyph = null;
			}
		} catch (ex) {}
		try {
			if (zdimensions != 'VR') {
				WTW.cameraVR.dispose();
				WTW.cameraVR = null;
			}
		} catch (ex) {}
		try {
			if (zdimensions != 'VR Gamepad') {
				WTW.cameraVRGamepad.dispose();
				WTW.cameraVRGamepad = null;
			}
		} catch (ex) {}
		try {
			if (w != 3 && zfirstcamera != 'Arc Rotation Camera') {
				WTW.cameraArc.dispose();
				WTW.cameraArc = null;
			}
		} catch (ex) {}
		if (scene.activeCameras[3] != undefined) {
			scene.activeCameras.splice(3,1);
		}

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

WTWJS.prototype.addActiveCamera = function(zcamera) {
	/* add a camera to the active cameras array - active camera track position even if not shown */
	try {
		var zfound = false;
		for (var i=0;i<scene.activeCameras.length;i++) {
			if (scene.activeCameras[i].id == zcamera.id) {
				zfound = true;
			}
		}
		if (zfound == false) {
			scene.activeCameras.push(zcamera);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_cameras.js-addActiveCamera=" + ex.message);
	}
}
		
WTWJS.prototype.initFollowCamera = function(zviewport) {
	/* create a follow camera */
	try {
		if (zviewport == undefined) {
			zviewport = 2;
		}
		var zavatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
		if (zviewport == 2) {
			/* zviewport 2 is the top right small scene window */
			var zstartposition = new BABYLON.Vector3(WTW.init.startPositionX, WTW.init.startPositionY, WTW.init.startPositionZ);
			if (WTW.myAvatar != null) {
				zstartposition = new BABYLON.Vector3(WTW.myAvatar.position.x, WTW.myAvatar.position.y, WTW.myAvatar.position.z);
			}
			WTW.cameraFollowTwo = new BABYLON.FollowCamera("followcameratwo", zstartposition, scene);
			/* remove camera inputs to replace with custom controls */
			WTW.cameraFollowTwo.inputs.clear();
			//WTW.cameraFollowTwo.inputs.remove(WTW.cameraFollowTwo.inputs.attached.keyboard); 
			//WTW.cameraFollowTwo.inputs.remove(WTW.cameraFollowTwo.inputs.attached.mouse); 
			if (zavatarcamera != null) {
				WTW.cameraFollowTwo.lockedTarget = zavatarcamera;
			}
			WTW.cameraFollowTwo.yOffset = 0;
			WTW.cameraFollowTwo.viewport = new BABYLON.Viewport(0.7, 0.7, 0.3, 0.3);
			WTW.cameraFollowTwo.id = "followcameratwo";
			WTW.addActiveCamera(WTW.cameraFollowTwo);
		} else {
			/* zviewport 1 is the main full scene window */
			WTW.cameraFollow = new BABYLON.FollowCamera("followcamera", WTW.camera.position, scene);
			/* remove camera inputs to replace with custom controls */
			WTW.cameraFollow.inputs.clear();
			//WTW.cameraFollow.inputs.remove(WTW.cameraFollow.inputs.attached.keyboard); 
			//WTW.cameraFollow.inputs.remove(WTW.cameraFollow.inputs.attached.mouse); 
			if (zavatarcamera != null) {
				WTW.cameraFollow.lockedTarget = zavatarcamera;
			}
			WTW.cameraFollow.yOffset = 180;
			WTW.cameraFollow.viewport = new BABYLON.Viewport(0, 0, 1, 1);
			WTW.cameraFollow.id = "followcamera";
			WTW.addActiveCamera(WTW.cameraFollow);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_cameras.js-initFollowCamera=" + ex.message);
	}
}

WTWJS.prototype.initArcCamera = function() {
	/* create an arc rotation camera */
	try {
		WTW.cameraArc = new BABYLON.ArcRotateCamera("thingcamera", 0, 1.5, 75, scene.activeCameras[0].position, scene);
		/* remove camera inputs to replace with custom controls */
		WTW.cameraArc.inputs.clear();
		//WTW.cameraArc.inputs.remove(WTW.cameraArc.inputs.attached.keyboard); 
		//WTW.cameraArc.inputs.remove(WTW.cameraArc.inputs.attached.mouse); 
		WTW.cameraArc.id = "thingcamera";
		WTW.cameraArc.alpha = 0;
		//WTW.cameraArc.beta = 1.5;
		WTW.cameraArc.radius = 75;
		WTW.cameraArc.viewport = new BABYLON.Viewport(0, 0, 1, 1);
		WTW.cameraArc.angularSensibility = 1000;
		WTW.cameraArc.inertia = .75;
		WTW.cameraArc.fov = .4;
		//WTW.cameraArc.parent = WTW.myAvatar;
		WTW.addActiveCamera(WTW.cameraArc);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_cameras.js-initArcCamera=" + ex.message);
	}
}

WTWJS.prototype.initAnaglyphCamera = function() {
	/* create a red/cyan glasses camera */
	try {
		WTW.cameraAnaglyph = new BABYLON.AnaglyphUniversalCamera("anaglyphcamera", scene.activeCameras[0].position, .033, scene); //eye space = .033 try .05
		/* remove camera inputs to replace with custom controls */
		WTW.cameraAnaglyph.inputs.clear();
		//WTW.cameraAnaglyph.inputs.remove(WTW.cameraAnaglyph.inputs.attached.keyboard); 
		//WTW.cameraAnaglyph.inputs.remove(WTW.cameraAnaglyph.inputs.attached.mouse); 
		var zavatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
		if (zavatarcamera != null) {
			WTW.cameraAnaglyph.lockedTarget = zavatarcamera;
		}
		WTW.cameraAnaglyph.yOffset = 180;
/*		WTW.cameraAnaglyph.inertia = .10;
		WTW.cameraAnaglyph.cameraAcceleration = 0.5;
		WTW.cameraAnaglyph.maxCameraSpeed = 1000;
*/		WTW.cameraAnaglyph.viewport = new BABYLON.Viewport(0, 0, 1, 1);
		WTW.cameraAnaglyph.id = "anaglyphcamera";
		//WTW.cameraAnaglyph.parent = WTW.myAvatar;
		WTW.addActiveCamera(WTW.cameraAnaglyph);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_cameras.js-initAnaglyphCamera=" + ex.message);
	}
}

WTWJS.prototype.initVRCamera = function() {
	/* create a VR camera */
	try {
		WTW.cameraVR = new BABYLON.VRDeviceOrientationFreeCamera ("vrcamera", scene.activeCameras[0].position, scene);
		/* remove camera inputs to replace with custom controls */
		//WTW.cameraVR.inputs.clear();
		WTW.cameraVR.inputs.remove(WTW.cameraVR.inputs.attached.keyboard); 
		WTW.cameraVR.inputs.remove(WTW.cameraVR.inputs.attached.mouse);
		var zavatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
		if (zavatarcamera != null) {
			WTW.cameraVR.lockedTarget = zavatarcamera;
		}
		WTW.cameraVR.yOffset = 180;
/*		WTW.cameraVR.inertia = .10;
		WTW.cameraVR.cameraAcceleration = 0.5;
		WTW.cameraVR.maxCameraSpeed = 1000;
*/		WTW.cameraVR.viewport = new BABYLON.Viewport(0, 0, 1, 1);
		WTW.cameraVR.id = "vrcamera";
		//WTW.cameraVR.parent = WTW.myAvatar;
		WTW.addActiveCamera(WTW.cameraVR);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_cameras.js-initVRCamera=" + ex.message);
	}
}

WTWJS.prototype.initVRGamepadCamera = function() {
	/* create a VR camera with gamepad support */
	try {
		WTW.cameraVRGamepad = new BABYLON.VRDeviceOrientationGamepadCamera("vrgamepadcamera", scene.activeCameras[0].position, scene);
		/* remove camera inputs to replace with custom controls */
		//WTW.cameraVRGamepad.inputs.clear();
		WTW.cameraVRGamepad.inputs.remove(WTW.cameraVRGamepad.inputs.attached.keyboard); 
		WTW.cameraVRGamepad.inputs.remove(WTW.cameraVRGamepad.inputs.attached.mouse);
		var zavatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
		if (zavatarcamera != null) {
			WTW.cameraVRGamepad.lockedTarget = zavatarcamera;
		}
		WTW.cameraVRGamepad.yOffset = 180;
/*		WTW.cameraVRGamepad.inertia = .10;
		WTW.cameraVRGamepad.cameraAcceleration = 0.5;
		WTW.cameraVRGamepad.maxCameraSpeed = 1000;
*/		WTW.cameraVRGamepad.viewport = new BABYLON.Viewport(0, 0, 1, 1);
		WTW.cameraVRGamepad.id = "vrgamepadcamera";
		//WTW.cameraVRGamepad.parent = WTW.myAvatar;
		WTW.addActiveCamera(WTW.cameraVRGamepad);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_cameras.js-initVRGamepadCamera=" + ex.message);
	}
}

WTWJS.prototype.setMovingCameras = function(zavatar) {
	/* adjust the camera position and rotation based on avatar movement */
	/* this function executes every time your avatar moves or turns - or - in the render cycle when you are driving a vehicle */
	try {
		if (zavatar != null && WTW.cameraFocus == 1) {
			var zavatarradiansy = zavatar.rotation.y;
			
			
			
			/* these objects are used to focus the camera on parts of the avatar */
			var zavatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-camera");
			var zavatarcenter = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
			/* rotation of a parent object to the avatar (riding on a vehicle) is added to the camera rotation for world space */
			var zrotation = 0;
			if (zavatar.parent != null) {
				if (zavatar.parent.name.indexOf('ridealong-parent') > -1) {
					zrotation = WTW.getDegrees(zavatar.parent.parent.rotation.y);
				} else {
					zrotation = WTW.getDegrees(zavatar.parent.rotation.y);
				}
			}
			
			/* cameras only adjusts movement when focused on your avatar */
			if (zavatar.name.indexOf('myavatar-') > -1) {
				var zdist = -25;
				var zfirstcamera = WTW.getDDLValue('wtw_firstcamera');
				var zsecondcamera = WTW.getDDLValue('wtw_secondcamera');
				switch (zfirstcamera) {
					case 'First-Person Camera':
						zdist = 2;
						break;
					case 'Scene Camera':
						zdist = -40;
						break;
					case 'Self Camera':
						zdist = 30;
						break;
				}
				/* main camera for first person */
				if (WTW.camera != null) {
					WTW.camera.rotation.x = Math.atan2(WTW.cameraYOffset, 20);
				}
				/* main follow camera (also used for self camera) */
				if (WTW.cameraFollow != null) {
					WTW.cameraFollow.heightOffset = WTW.cameraYOffset;
					WTW.cameraFollow.rotationOffset = WTW.getDegrees(zavatar.rotation.y) + WTW.cameraFollow.yOffset + zrotation;
					WTW.setCameraDistance();
				}
				/* follow two is the scene camera window follow camera */
				if (WTW.cameraFollowTwo != null && zavatar != null && zavatarcenter != null) {
					if (zsecondcamera == 'First-Person Camera') {
						WTW.cameraFollowTwo.position.x = zavatar.position.x;
						WTW.cameraFollowTwo.position.y = zavatar.position.y + zavatarcenter.position.y;
						WTW.cameraFollowTwo.position.z = zavatar.position.z-(Math.sin(zavatar.rotation.y) + Math.cos(zavatar.rotation.y));
						WTW.cameraFollowTwo.rotation.y = zavatar.rotation.y;
					} else {
						WTW.cameraFollowTwo.rotationOffset = WTW.getDegrees(zavatar.rotation.y) + WTW.cameraFollowTwo.yOffset + zrotation;
					}
				}
				/* main window with the red/cyan glasses camera */
				if (WTW.cameraAnaglyph != null && zavatar != null && zavatarcamera != null) {
					if (zfirstcamera == 'First-Person Camera') {
						WTW.cameraAnaglyph.rotation.x = Math.atan2(WTW.cameraYOffset, 20);
					} else {
						WTW.cameraAnaglyph.heightOffset = WTW.cameraYOffset;
						WTW.cameraAnaglyph.rotation.y = WTW.getRadians(WTW.getDegrees(zavatar.rotation.y) + WTW.cameraAnaglyph.yOffset + zrotation);
						WTW.cameraAnaglyph.position = new BABYLON.Vector3(zavatar.position.x + parseFloat(Math.cos(zavatar.rotation.y)) * zdist, zavatar.position.y + zavatarcenter.position.y + WTW.cameraYOffset, zavatar.position.z - parseFloat(Math.sin(zavatar.rotation.y)) * zdist);
					}
				}
				/* main window with the VR camera */
				if (WTW.cameraVR != null && zavatar != null && zavatarcenter != null) {
					if (zfirstcamera != 'First-Person Camera') {
						WTW.cameraVR.rotation.y = WTW.getRadians(WTW.getDegrees(zavatar.rotation.y) + WTW.cameraVR.yOffset + zrotation);
					}
					WTW.cameraVR.position = new BABYLON.Vector3(zavatar.position.x + parseFloat(Math.cos(zavatar.rotation.y)) * zdist, zavatar.position.y + zavatarcenter.position.y + WTW.cameraYOffset, zavatar.position.z - parseFloat(Math.sin(zavatar.rotation.y)) * zdist);
				}
				/* main window with the VR camera with gamepad support */
				if (WTW.cameraVRGamepad != null && zavatar != null && zavatarcenter != null) {
					if (zfirstcamera != 'First-Person Camera') {
						WTW.cameraVRGamepad.rotation.y = WTW.getRadians(WTW.getDegrees(zavatar.rotation.y) + WTW.cameraVRGamepad.yOffset + zrotation);
					}
					WTW.cameraVRGamepad.position = new BABYLON.Vector3(zavatar.position.x + parseFloat(Math.cos(zavatar.rotation.y)) * zdist, zavatar.position.y + zavatarcenter.position.y + WTW.cameraYOffset, zavatar.position.z - parseFloat(Math.sin(zavatar.rotation.y)) * zdist);
				}
				/* arc camera support (currently not in the selection list) */
				if (WTW.cameraArc != null && zavatar != null) {
					zdist = -60;
					WTW.cameraArc.lockedTarget = zavatarcenter;
					WTW.cameraArc.setPosition(new BABYLON.Vector3(zavatar.position.x + parseFloat(Math.cos(zavatar.rotation.y)) * zdist, zavatar.position.y + zavatarcenter.position.y + WTW.cameraYOffset, zavatar.position.z - parseFloat(Math.sin(zavatar.rotation.y)) * zdist));
				}
				/* release the scroll wheel timer movement after the camera adjustments */
				if (WTW.scrollTimer != null) {
					var znowdate = new Date();
					if ((znowdate - WTW.scrollTimer) > 500) {
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

WTWJS.prototype.setCameraDistance = function() {
	/* adjust the camera distance if intercepts a mold before showing the avatar */
	try {
		if (WTW.placeHolder == 0) {
			/* only process if avatar is on the scene */
			var zdist = 100;
			var zavatardistance = 100;
			/* get camera focus point of avatar (center mass) */
			var zavatarcenter = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
			if (zavatarcenter != null) {
				var zavatarcenterposition = WTW.getWorldPosition(zavatarcenter);
				var zavatarpos = new BABYLON.Vector3(zavatarcenterposition.x, zavatarcenterposition.y, zavatarcenterposition.z);
				/* get direction by delta of the points (x2-x1, y2-y1, z2-z1) */
				var zdir = new BABYLON.Vector3((WTW.cameraFollow.position.x-zavatarcenterposition.x), (WTW.cameraFollow.position.y-zavatarcenterposition.y), (WTW.cameraFollow.position.z-zavatarcenterposition.z));
				var zray = new BABYLON.Ray(zavatarpos, zdir, zdist);
				/* get distance of camera currently from avatar */
				var zcameradistance = Math.sqrt(Math.pow(zavatarpos.x - WTW.cameraFollow.position.x, 2) + Math.pow(zavatarpos.y - WTW.cameraFollow.position.y, 2) + Math.pow(zavatarpos.z - WTW.cameraFollow.position.z, 2));
				var zhits = scene.multiPickWithRay(zray);
				for (var i=0; i<zhits.length; i++){
					if (zhits[i].pickedMesh.name.indexOf("molds-") > -1) {
						if (zhits[i].distance < zdist) {
							/* distance of closest mold */
							zdist = zhits[i].distance;
						}
					}
				} 
			}
			/* if distance to closest mold is less than set camera distance, move camera closer than mold */
			if (zdist < Math.abs(WTW.cameraDistance)) {
				if (WTW.cameraDistance < 0) {
					/* camera behind avatar (follow) */
					WTW.cameraFollow.radius = -zdist + 1;
				} else {
					/* camera in front of avatar (selfie) */
					WTW.cameraFollow.radius = zdist - 1;
				}
			} else {
				/* otherwise set camera distance to default set */
				WTW.cameraFollow.radius = WTW.cameraDistance;
			}
		}
	} catch(ex) {
		/* on error, set camera to default */
		WTW.cameraFollow.radius = WTW.cameraDistance;
		WTW.log("core-scripts-prime-wtw_cameras.js-setCameraDistance=" + ex.message);
	}
}
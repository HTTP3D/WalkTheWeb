/* All code is Copyright 2013-2021 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions pertain to the various cameras and camera tracking with avatars */

WTWJS.prototype.loadPrimaryCamera = function() {
	/* loads the initial camera on the scene - before the avatar is shown */
	try {
		if (/Android|webOS|iPhone|iPad|Opera Mini|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            WTW.isMobile = true;
		} else {
            WTW.isMobile = false;
		}
		var zsettings = {
			'parent': '',
			'distance': -28,
			'position': new BABYLON.Vector3(0, 0, 0),
			'rotation': new BABYLON.Vector3(0, 0, 0)
		};
		WTW.initCamera(1, 'followcamera', zsettings);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_cameras.js-loadPrimaryCamera=" + ex.message);
	}
}

WTWJS.prototype.initCamera = function(zviewport, zcameraid, zsettings) {
	/* create the camera */
	try {
		var zparent = '';
		var zcamera1id = '';
		var zcamera2id = '';
		var zcamera = null;
		var zdefaultdistance = WTW.cameraDistance;
		var zposition = new BABYLON.Vector3(WTW.init.startPositionX, WTW.init.startPositionY, WTW.init.startPositionZ);
		var zavatarcamera = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value + '-camera');
		if (zviewport == undefined) {
			zviewport = 1;
		}
		if (zcameraid == '') {
			zcameraid = 'followcamera';
		}
		if (WTW.cameraOne != null) {
			zposition = WTW.cameraOne.position;
			zcamera1id = WTW.cameraOne.id;
			if (WTW.cameraOne.parent != null) {
				zparent = WTW.cameraOne.parent.name;
			}
		}
		if (WTW.cameraTwo != null) {
			zcamera2id = WTW.cameraTwo.id;
			if (zviewport == 2 && WTW.cameraTwo.cameraDistance != undefined) {
				zdefaultdistance = WTW.cameraTwo.cameraDistance;
			}
		}
		if (zsettings == undefined) {
			zsettings = {
				'parent': zparent,
				'distance': zdefaultdistance,
				'yoffset': 180
			};
		}
		if (zcamera2id == zcameraid.toLowerCase() && zviewport == 2) {
			if (WTW.cameraTwo.cameraDistance != zsettings.distance) {
				WTW.cameraTwo.cameraDistance = zsettings.distance;
			} else {
				WTW.cameraTwo.dispose();
				WTW.cameraTwo = null;
				var zbuttons = ['hud-imagebutton-camera2-follow', 'hud-imagebutton-camera2-scene', 'hud-imagebutton-camera2-self'];
				for (var i=0;i < zbuttons.length;i++) {
					/* reset the material on the menu item button - black for not selected */
					var zbutton = scene.getMeshByID(zbuttons[i]);
					if (zbutton != null) {
						var zbgcolor = '#000000';
						var zcovering = zbutton.material;
						zcovering.emissiveColor =  new BABYLON.Color3.FromHexString(zbgcolor);
						zcovering.diffuseColor =  new BABYLON.Color3.FromHexString(zbgcolor);
						zcovering.specularColor =  new BABYLON.Color3.FromHexString(zbgcolor);
						zcovering.ambientColor =  new BABYLON.Color3.FromHexString(zbgcolor);
						zbutton.material = zcovering;
					}
				}
			}
		} else if ((zcamera1id != zcameraid.toLowerCase() && zviewport == 1) || (zcamera2id != zcameraid.toLowerCase() && zviewport == 2)) {
			/* https://doc.babylonjs.com/divingDeeper/cameras/camera_introduction */
			switch (zcameraid.toLowerCase()) {
				case 'anaglyphcamera':
					zcamera = new BABYLON.AnaglyphUniversalCamera("anaglyphcamera", zposition, .033, scene); /* eye space = .033 might try .05 */
					zcamera.id = "anaglyphcamera";
					break;
				case 'vrcamera':
					zcamera = new BABYLON.VRDeviceOrientationFreeCamera ("vrcamera", zposition, scene);
					zcamera.id = "vrcamera";
					break;
				case 'vrgamepadcamera':
					zcamera = new BABYLON.VRDeviceOrientationGamepadCamera("vrgamepadcamera", zposition, scene);
					zcamera.id = "vrgamepadcamera";
					break;
				case 'webvrcamera':
					zcamera = new BABYLON.WebVRFreeCamera ("webvrcamera", zposition, scene);
					zcamera.id = "webvrcamera";
					break;
				case 'flycamera':
					zcamera = new BABYLON.FlyCamera ("flycamera", zposition, scene);
					zcamera.id = "flycamera";
					/* Airplane like rotation, with faster roll correction and banked-turns. */
					/* Default is 100. A higher number means slower correction. */
					zcamera.rollCorrect = 10;
					/* Default is false. */
					zcamera.bankedTurn = true;
					/* Defaults to 90° in radians in how far banking will roll the camera. */
					zcamera.bankedTurnLimit = Math.PI / 2;
					/* How much of the Yawing (turning) will affect the Rolling (banked-turn.) */
					/* Less than 1 will reduce the Rolling, and more than 1 will increase it. */
					zcamera.bankedTurnMultiplier = 1;
					break;
				case 'orientationcamera':
					zcamera = new BABYLON.DeviceOrientationCamera ("orientationcamera", zposition, scene);
					zcamera.id = "orientationcamera";
					zcamera.angularSensibility = 10;
					zcamera.moveSensibility = 10;
					break;
				case 'joystickcamera':
					zcamera = new BABYLON.VirtualJoysticksCamera ("joystickcamera", zposition, scene);
					zcamera.id = "joystickcamera";
					break;
				case 'arccamera':
					/* Parameters: name, alpha, beta, radius, target position, scene */
					zcamera = new BABYLON.ArcRotateCamera ("arccamera", 0, 0, 20, zposition, scene);
					zcamera.id = "arccamera";
					break;
				case 'webxrcamera':
					/* https://doc.babylonjs.com/divingDeeper/webXR/webXRSessionManagers */
					var zxrsession = new WebXRSessionManager(scene);
					/* https://doc.babylonjs.com/divingDeeper/webXR/webXRCamera */
					zcamera = new BABYLON.WebXRCamera("webxrcamera", scene, zxrsession);
					zcamera.id = "webxrcamera";
					break;
				default:
					zcamera = new BABYLON.UniversalCamera("followcamera", zposition, scene);
					zcamera.id = "followcamera";
					break;
			}
			
			if (zviewport == 1) {
				WTW.cameraOne = zcamera;
				WTW.cameraOne.inertia = .10;
				WTW.cameraOne.cameraAcceleration = 0.7;
				WTW.cameraOne.maxZ = 5000;
//				WTW.cameraOne.angularSensibility = 1800;
//				WTW.cameraOne.maxCameraSpeed = 1000;
				WTW.cameraDistance = zsettings.distance;
			} else {
				WTW.cameraTwo = zcamera;
				WTW.cameraTwo.inertia = .10;
				WTW.cameraTwo.cameraAcceleration = 0.7;
				WTW.cameraTwo.maxZ = 5000;
//				WTW.cameraTwo.angularSensibility = 1800;
//				WTW.cameraTwo.maxCameraSpeed = 1000;
				WTW.cameraTwo.viewport = new BABYLON.Viewport(0.7, 0.7, 0.3, 0.3);
				scene.activeCameras[1] = WTW.cameraTwo;
				WTW.cameraTwo.cameraDistance = zsettings.distance;
				if (zavatarcamera != null && WTW.cameraTwo.parent == null) {
					WTW.cameraTwo.lockedTarget = zavatarcamera;
				} else {
					WTW.cameraTwo.lockedTarget = null;
				}
			}
		}
		if (zsettings.parent != zparent) {
			if (zsettings.parent == '') {
				WTW.cameraOne.parent = null;
			} else {
				var zparentmold = WTW.getMeshOrNodeByID(zsettings.parent);
				if (zparentmold != null) {
					WTW.cameraOne.parent = zparentmold;
					WTW.cameraOne.position = zsettings.position;
					WTW.cameraOne.rotation = zsettings.rotation;
				}
			}
		}
		if (zavatarcamera != null && WTW.cameraOne.parent == null) {
			WTW.cameraOne.lockedTarget = zavatarcamera;
		} else {
			WTW.cameraOne.lockedTarget = null;
		}
		WTW.setCookie("cameradistance",WTW.cameraDistance,365);
		WTW.cameraOne.viewport = new BABYLON.Viewport(0, 0, 1, 1);
		scene.activeCameras[0] = WTW.cameraOne;
		scene.activeCameras[0].attachControl(canvas, true);
		scene.cameraToUseForPointers = scene.activeCameras[0];
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_cameras.js-initCamera=" + ex.message);
	}
}

WTWJS.prototype.setMovingCameras = function(zavatar) {
	/* adjust the camera position and rotation based on avatar movement */
	/* this function executes every time your avatar moves or turns - or - in the render cycle when you are driving a vehicle */
	try {
		if (zavatar != null && WTW.cameraFocus == 1) {
			/* cameras only adjusts movement when focused on your avatar */
			if (zavatar.name.indexOf('myavatar-') > -1) {
				var zavatarradiansy = zavatar.rotation.y;
				
				/* these objects are used to focus the camera on parts of the avatar */
				var zavatarcenter = WTW.getMeshOrNodeByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");

				/* rotation of a parent object to the avatar (riding on a vehicle) is added to the camera rotation for world space */
				var zrotation = 0;
				if (zavatar.parent != null) {
					if (zavatar.parent.name.indexOf('ridealong-parent') > -1) {
						zrotation = WTW.getDegrees(zavatar.parent.parent.rotation.y);
					} else {
//						zrotation = WTW.getDegrees(zavatar.parent.rotation.y);
					}
				}

				/* camera one */
				if (WTW.cameraOne != null) {
					if (WTW.cameraOne.parent == null) {
						/* camera is not parented (defaults to scene) and follows locked target */
						WTW.cameraOne.heightOffset = WTW.cameraYOffset;
						WTW.cameraOne.position = new BABYLON.Vector3(zavatar.position.x + parseFloat(Math.cos(zavatar.rotation.y)) * WTW.cameraDistance, zavatar.position.y + zavatarcenter.position.y + WTW.cameraYOffset, zavatar.position.z - parseFloat(Math.sin(zavatar.rotation.y)) * WTW.cameraDistance);
						WTW.setCameraDistance();
					} else {
						/* camera is parented to avatar and has no locked target */
//						WTW.cameraOne.heightOffset = WTW.cameraYOffset;
//						WTW.cameraOne.position = new BABYLON.Vector3(0, WTW.cameraYOffset, 0);
//						WTW.cameraOne.rotation.y = WTW.getRadians(180);
					}
				}
				/* camera two is the scene camera window follow camera */
				if (WTW.cameraTwo != null) {
					if (WTW.cameraTwo.parent == null) {
						WTW.cameraTwo.heightOffset = WTW.cameraYOffset;
//					WTW.cameraTwo.rotation.y = WTW.getRadians(WTW.getDegrees(zavatar.rotation.y) + WTW.cameraTwo.yOffset + zrotation);
						WTW.cameraTwo.position = new BABYLON.Vector3(zavatar.position.x + parseFloat(Math.cos(zavatar.rotation.y)) * WTW.cameraTwo.cameraDistance, zavatar.position.y + zavatarcenter.position.y + WTW.cameraYOffset, zavatar.position.z - parseFloat(Math.sin(zavatar.rotation.y)) * WTW.cameraTwo.cameraDistance);
						//WTW.setCameraDistance();
					}
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
				/* camera front box is an invisible box in front of the active camera */
				/* it is used as a parent to anything you would like to keep in camera view */
				/* example - this box is used as the parent for the HUD and Compass */
				if (scene.activeCameras[0] != null) {
					var zcamerafront = WTW.getMeshOrNodeByID('camerafront');
					if (zcamerafront == null) {
						zcamerafront = new BABYLON.TransformNode('camerafront');
						zcamerafront.position = new BABYLON.Vector3(0,0,0);
						zcamerafront.rotation = new BABYLON.Vector3(0,0,0);
						zcamerafront.scaling = new BABYLON.Vector3(1,1,1);
						zcamerafront.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
						zcamerafront.parent = scene.activeCameras[0];
					}
					if (zcamerafront.parent.id != scene.activeCameras[0].id) {
						zcamerafront.parent = scene.activeCameras[0];
					}
					/* switch case is set up to allow custom support for specific cameras */
					switch (scene.activeCameras[0].id) {
						default:
							var zray = scene.activeCameras[0].getForwardRay(20);
							zcamerafront.position = zray.direction.scale(zray.length);
							break;
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
			var zavatarcenter = WTW.getMeshOrNodeByID("myavatar-" + dGet("wtw_tinstanceid").value + "-center");
			if (zavatarcenter != null) {
				var zavatarcenterposition = WTW.getWorldPosition(zavatarcenter);
				var zavatarpos = new BABYLON.Vector3(zavatarcenterposition.x, zavatarcenterposition.y, zavatarcenterposition.z);
				/* get direction by delta of the points (x2-x1, y2-y1, z2-z1) */
				var zdir = new BABYLON.Vector3((WTW.cameraOne.position.x-zavatarcenterposition.x), (WTW.cameraOne.position.y-zavatarcenterposition.y), (WTW.cameraOne.position.z-zavatarcenterposition.z));
				var zray = new BABYLON.Ray(zavatarpos, zdir, zdist);
				/* get distance of camera currently from avatar */
				var zcameradistance = Math.sqrt(Math.pow(zavatarpos.x - WTW.cameraOne.position.x, 2) + Math.pow(zavatarpos.y - WTW.cameraOne.position.y, 2) + Math.pow(zavatarpos.z - WTW.cameraOne.position.z, 2));
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
					WTW.cameraOne.radius = -zdist + 1;
				} else {
					/* camera in front of avatar (selfie) */
					WTW.cameraOne.radius = zdist - 1;
				}
			} else {
				/* otherwise set camera distance to default set */
				WTW.cameraOne.radius = WTW.cameraDistance;
			}
		}
	} catch(ex) {
		/* on error, set camera to default */
		WTW.cameraOne.radius = WTW.cameraDistance;
		WTW.log("core-scripts-prime-wtw_cameras.js-setCameraDistance=" + ex.message);
	}
}

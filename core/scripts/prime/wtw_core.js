/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

WTWJS.prototype.initLoadSequence = function() {
	try {
		if (typeof WTW.adminInit == 'function') {
			WTW.adminView = 1;
			if (dGet('wtw_tuserid').value == "") {
				window.location.href = '/';
			}
		}
		if (dGet('wtw_tuserid').value != "") {
			WTW.setLoginValues();
		}
		if (BABYLON.Engine.isSupported()) {
			WTW.initEnvironment();
		} else {
			window.location.href = "https://www.walktheweb.com/wiki/trouble-viewing-3d-websites/";
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_core.js-initLoadSequence=" + ex.message);
	} 
}

WTWJS.prototype.continueLoadSequence = function() {
	try {
		WTW.loadInitSettings();
		WTW.loadUserSettings();
		WTW.loadUserCanvas();
		WTW.loadScene();
		WTW.loadUserSettingsAfterEngine();
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_core.js-continueLoadSequence=" + ex.message);
	} 
}

WTWJS.prototype.initEnvironment = function() {
	try {
		var instanceid = WTW.getCookie("instanceid");
		if (dGet('wtw_tinstanceid').value == '' && instanceid != null) {
			if (instanceid.length == 24) {
				dGet('wtw_tinstanceid').value = instanceid;
			}
		}
		if (dGet('wtw_tinstanceid').value.length != 24) {
			instanceid = WTW.getRandomString(24);
			dGet('wtw_tinstanceid').value = instanceid;
		}
		WTW.setCookie("instanceid", instanceid, 365);
		window.name = instanceid;
		dGet("wtw_renderCanvas").onmouseover = function() {WTW.canvasFocus = 1;};
		dGet("wtw_renderCanvas").onmouseout = function() {WTW.canvasFocus = 0;WTW.keysPressed=[];};
		canvas = dGet("wtw_renderCanvas");
		canvas.addEventListener("webglcontextrestored", function (event) {initializeResources();  }, false);
		engine = new BABYLON.Engine(canvas, true, {deterministicLockstep: false, lockstepMaxSteps: 4});
		console.log("%c\r\n\r\nWalkTheWeb Open-Source 3D Internet\r\n" + wtw_versiontext + "\r\n", "color:green;font-weight:bold;");
		scene = new BABYLON.Scene(engine);        
		scene.name = "WalkTheWeb";
		scene.gravity = new BABYLON.Vector3(0, -WTW.init.gravity, 0);
		var physicsplugin = new BABYLON.CannonJSPlugin();
		scene.enablePhysics(scene.gravity, physicsplugin);
		scene.autoClear = false;
		scene.autoClearDepthAndStencil = false;
		scene.collisionsEnabled = true;
		scene.ambientColor = new BABYLON.Color3(.3, .3, .3);
		scene.fogEnabled = true;
		scene.fogMode = BABYLON.Scene.FOGMODE_EXP;

		WTW.mouseOver = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, WTW.mouseOverMold);
		WTW.mouseOut = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, WTW.mouseOutMold);
		scene.actionManager = new BABYLON.ActionManager(scene);
		scene.useClonedMeshMap = true;
		if (WTW.adminView == 1) {
			scene.blockMaterialDirtyMechanism = true;
		}
		if (WTW.highlightLayer == null) {
			WTW.highlightLayer = new BABYLON.HighlightLayer("highlightlayer", scene);
		}
		var setupparent = BABYLON.MeshBuilder.CreateBox("setupparent-0", {}, scene);
		setupparent.material = WTW.addCovering("hidden", "setupparent-0", WTW.newAvatarDef(), 1, 1, 1, "0", "0");
		setupparent.material.alpha = 0;
		setupparent.position.x = 0;
		setupparent.position.y = 0;
		setupparent.position.z = 0;
		setupparent.rotation.y = WTW.getRadians(0);
		WTW.loadPrimaryCamera(setupparent);

		/* direct light immitating the sun */
		WTW.sun = new BABYLON.DirectionalLight("sun", new BABYLON.Vector3(-1, -1, -1), scene);
		WTW.sun.position = new BABYLON.Vector3(0, WTW.sunPositionY, 0);
		WTW.sun.intensity = WTW.getSunIntensity(WTW.init.skyInclination, WTW.init.skyAzimuth);
		WTW.sun.shadowMinZ = 1;
		WTW.sun.shadowMaxZ = 4000;
		WTW.sun.ambient = new BABYLON.Color3(.4, .4, .4);
		WTW.sun.diffuse = new BABYLON.Color3(.4, .4, .4);
		WTW.sun.specular = new BABYLON.Color3(.2, .2, .2);
		WTW.sun.groundColor = new BABYLON.Color3(.1, .1, .1);

		/* lesser light for back sides */
		WTW.sunlight = new BABYLON.DirectionalLight("sunlight", new BABYLON.Vector3(1, -1, 1), scene);
		WTW.sunlight.intensity = WTW.sun.intensity / 1.5; //3;
		
		WTW.sky = BABYLON.MeshBuilder.CreateSphere("sky", {segments: 40, diameter:1, updatable: true, sideOrientation: BABYLON.Mesh.BACKSIDE}, scene);
		WTW.sky.scaling.x = 5000;
		WTW.sky.scaling.y = 4800;
		WTW.sky.scaling.z = 5000;
		WTW.sky.position.x = 0;
		WTW.sky.position.y = -100;
		WTW.sky.position.z = 0;
		WTW.sky.isPickable = false;
		WTW.sky.disableLighting = true;
		var skyboxMat = new BABYLON.SkyMaterial("skyMaterial", scene);
		skyboxMat.backFaceCulling = false;
		WTW.sky.material = skyboxMat;
		window.setTimeout(function() {
			WTW.loadSkyScene(WTW.init.skyInclination, WTW.init.skyLuminance, WTW.init.skyAzimuth, WTW.init.skyRayleigh, WTW.init.skyTurbidity, WTW.init.skyMieDirectionalG, WTW.init.skyMieCoefficient, .25);
		}, 1000);
		WTW.extraGround = BABYLON.MeshBuilder.CreateGround("communityeground", {width: 5000, height: 5000, subdivisions: 2, updatable: false}, scene);
		WTW.extraGround.position.x = 0;
		WTW.extraGround.position.y = 0;
		WTW.extraGround.position.z = 0;
		WTW.extraGround.isPickable = false;
		WTW.extraGround.checkCollisions = true;
		WTW.extraGround.material = new BABYLON.StandardMaterial("mat-communityeground", scene);
		WTW.extraGround.material.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		WTW.extraGround.material.diffuseTexture = new BABYLON.Texture(WTW.init.groundTexturePath, scene);
		WTW.extraGround.material.diffuseTexture.uScale = 500;
		WTW.extraGround.material.diffuseTexture.vScale = 500;
		WTW.extraGround.physicsImpostor = new BABYLON.PhysicsImpostor(WTW.extraGround, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.5 }, scene);
		var mainparent = WTW.getMainParent();
		WTW.loadCameraSettings();
		WTW.toggleCompass();
		WTW.startRender();
		var condition1 = new BABYLON.PredicateCondition(scene.actionManager, function () {
			var test = true;
			return test;
		});
		scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnEveryFrameTrigger, WTW.moveAvatar, condition1));
		if (dGet('wtw_showcommunityname') != null) {
			dGet('wtw_showcommunityname').innerHTML = "HTTP3D Inc.";
		}
		if (dGet('wtw_showbuildingname') != null) {
			dGet('wtw_showbuildingname').innerHTML = "<span style='color:yellow;'>Welcome to WalkTheWeb</span>";
		}
		WTW.showInline('wtw_showcommunityname');
		WTW.showInline('wtw_showbuildingname');
		if (dGet("wtw_tuserid").value == "") {
			WTW.setupMode = 1;
			if (dGet('wtw_mainmenudisplayname') != null) {
				dGet('wtw_mainmenudisplayname').innerHTML = "<span style='color:yellow;'>Login</span>";
			}
		}
		WTW.getSavedAvatar();
		if (dGet("wtw_tuserid").value != "") {
			WTW.getSessionAvatar();
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_core.js-initEnvironment=" + ex.message);
	} 
}

WTWJS.prototype.loadInitSettings = function() {
	try {
		var sitename = wtw_defaultsitename;
		if (wtw_domain != null) {
			wtw_domain = JSON.parse(wtw_domain);
			if (wtw_domain.domaininfo != null) {
				sitename = wtw_domain.domaininfo.communityname;				
				WTW.buildingName = wtw_domain.buildinginfo.buildingname;
				WTW.communityName = WTW.decode(wtw_domain.communityinfo.communityname);
				if (dGet('wtw_communitysummary') != null) {
					dGet('wtw_communitysummary').innerHTML = WTW.decode(wtw_domain.communityinfo.communityname) + " Community Summary";
				}
				WTW.init.groundTextureID = wtw_domain.domaininfo.textureid;
				WTW.init.groundTexturePath = wtw_domain.domaininfo.texturepath;
				WTW.init.skyTextureID = wtw_domain.domaininfo.skydomeid;
				WTW.init.skyTexturePath = wtw_domain.domaininfo.skydomepath;
				WTW.init.skyInclination = wtw_domain.domaininfo.skyinclination;
				WTW.init.skyLuminance = wtw_domain.domaininfo.skyluminance;
				WTW.init.skyAzimuth = wtw_domain.domaininfo.skyazimuth;
				WTW.init.skyRayleigh = wtw_domain.domaininfo.skyrayleigh;
				WTW.init.skyTurbidity = wtw_domain.domaininfo.skyturbidity;
				WTW.init.skyMieDirectionalG = wtw_domain.domaininfo.skymiedirectionalg;
				WTW.init.skyMieCoefficient = wtw_domain.domaininfo.skymiecoefficient;
				WTW.init.groundPositionY = Number(wtw_domain.startlocation.position.groundpositiony);
				WTW.init.waterPositionY = Number(wtw_domain.startlocation.position.waterpositiony);				
				WTW.init.startPositionX = Number(wtw_domain.startlocation.position.x);
				WTW.init.startPositionY = Number(wtw_domain.startlocation.position.y);
				WTW.init.startPositionZ = Number(wtw_domain.startlocation.position.z);
				WTW.init.startScalingX = Number(wtw_domain.startlocation.scaling.x);
				WTW.init.startScalingY = Number(wtw_domain.startlocation.scaling.y);
				WTW.init.startScalingZ = Number(wtw_domain.startlocation.scaling.z);
				WTW.init.startRotationX = Number(wtw_domain.startlocation.rotation.x);
				WTW.init.startRotationY = Number(wtw_domain.startlocation.rotation.y);
				WTW.init.startRotationZ = Number(wtw_domain.startlocation.rotation.z);
				WTW.editCommunityAccess = wtw_domain.communityinfo.access;
				WTW.editBuildingAccess = wtw_domain.buildinginfo.access;
				try {
					WTW.init.gravity = wtw_domain.domaininfo.gravity;
				} catch (ex) {}
				if (WTW.init.startRotationX > 180) {
					WTW.init.startRotationX -= 360;
				}
				WTW.init.loaded = 1;
			}
		}
		if (communityid == null) {
			communityid = "";
		}
		if (buildingid == null) {
			buildingid = "";
		}
		if (thingid == null) {
			thingid = "";
		}
		if (buildingid != "") {
			communityid = "";
		}
		if (thingid != "") {
			communityid = "";
			buildingid = "";
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_core.js-loadInitSettings=" + ex.message);
	} 
}

WTWJS.prototype.loadUserCanvas = function() {
	try {
		if (dGet('wtw_compassvisibility').innerHTML == "Compass is Visible") {
			WTW.uicanvas = dGet("wtw_uiCanvas");
			WTW.uicanvas.width = WTW.sizeX;
			WTW.uicanvas.height = WTW.sizeY;
			WTW.ctx = WTW.uicanvas.getContext("2d");
			var compassangle = 90;
			if (WTW.myAvatar != null) {
				compassangle = -WTW.getDegrees(WTW.myAvatar.rotation.y) + 90;
			}
			if (WTW.adminView == 1) {
				WTW.ctx.translate(WTW.sizeX - (WTW.sizeX * 1.1 / 24),WTW.sizeY - (WTW.sizeX * .3 / 12) - 120); 
			} else {
				WTW.ctx.translate(WTW.sizeX - (WTW.sizeX * 1.1 / 24),WTW.sizeY - (WTW.sizeX * .3 / 12) - 90); 
			}
			WTW.ctx.rotate(compassangle * Math.PI / 180); 
			try {
				WTW.ctx.drawImage(dGet("wtw_iwalkcompass"), -(WTW.sizeX / 24), -(WTW.sizeX / 24), (WTW.sizeX * 2 / 24), (WTW.sizeX * 2 / 24));
			} catch(ex) {}
			WTW.ctx.rotate(-compassangle * Math.PI / 180);
			if (WTW.closestAngle != null && WTW.closestDistance > 80) {
				WTW.ctx.rotate(-(WTW.closestAngle) * Math.PI / 180); 
				try {
					WTW.ctx.drawImage(dGet("wtw_iwalkcompassarrow"), -10, -80, 19, 80);
				} catch(ex) {}
				WTW.ctx.rotate((WTW.closestAngle) * Math.PI / 180);
			}
			if (WTW.adminView == 1) {
				WTW.ctx.translate(-(WTW.sizeX - (WTW.sizeX * 1.1 / 24)), -(WTW.sizeY - (WTW.sizeX * .3 / 12) - 120)); 
			} else {
				WTW.ctx.translate(-(WTW.sizeX - (WTW.sizeX * 1.1 / 24)), -(WTW.sizeY - (WTW.sizeX * .3 / 12) - 90)); 
			}
		} else {
			WTW.uicanvas = dGet("wtw_uiCanvas");
			WTW.uicanvas.width = WTW.sizeX;
			WTW.uicanvas.height = WTW.sizeY;
			WTW.ctx = WTW.uicanvas.getContext("2d");
			WTW.ctx.clearRect(0, 0, WTW.sizeX, WTW.sizeY);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_core.js-loadUserCanvas=" + ex.message);
	} 
}

WTWJS.prototype.loadScene = function() {
	try {
		if (communityid != 0) {
			WTW.getJSON("/connect/community.php?communityid=" + communityid, 
				function(response) {
					WTW.loadCommunity(JSON.parse(response));
				}
			);
		} else {
			WTW.loadCommunity(null);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_core.js-loadScene=" + ex.message);
	} 
}

WTWJS.prototype.loadCommunity = function(addcommunities) {
	try {
		if (addcommunities != null) {
			if (addcommunities.communities != undefined) {
				WTW.communities = addcommunities.communities;
				if (WTW.communities[0] != null) {
					WTW.communityName = WTW.communities[0].communityinfo.communityname;
					WTW.editCommunityAccess = WTW.communities[0].communityinfo.access;
				}
			}
			if (WTW.communityName == "Walk the Web") {
				dGet('wtw_showcommunityname').innerHTML = "Walk the Web";
				dGet('wtw_showcommunityname').style.cursor = 'default';
			} else {
				dGet('wtw_showcommunityname').innerHTML = WTW.decode(WTW.communityName);
				dGet('wtw_showcommunityname').style.cursor = 'pointer';
			}
		} else {
			if (window.location.href.indexOf('/building/') > -1 || window.location.href.indexOf('/buildings/') > -1) {
				dGet('wtw_showcommunityname').innerHTML = 'View Building';
				dGet('wtw_showcommunityname').style.cursor = 'default';
			} else if (window.location.href.indexOf('/thing/') > -1 || window.location.href.indexOf('/things/') > -1) {
				dGet('wtw_showcommunityname').innerHTML = 'View Thing';
				dGet('wtw_showcommunityname').style.cursor = 'default';
			}
		}
		var skydomeid = "";
		var skydomepath = "";
		var groundtextureid = WTW.init.groundTextureID;
		var groundtexturepath = WTW.init.groundTexturePath;
		var eguscale = 500;
		var egvscale = 500;
		var groundpositiony = 0;
		var waterpositiony = -1;
		var loadedsettings = 0;
		if (WTW.communities != null) {
			for (var i=0; i < WTW.communities.length; i++) {
				if (WTW.communities[i] != null) {
					if (WTW.communities[i].communityinfo.communityid == communityid) {
						if (WTW.communities[i].graphics.sky.id != null) {
							skydomeid = WTW.communities[i].graphics.sky.id;
						}
						if (WTW.communities[i].graphics.texture.id != null) {
							groundtextureid = WTW.communities[i].graphics.texture.id;
						}
						if (WTW.communities[i].graphics.texture.path != null) {
							groundtexturepath = WTW.communities[i].graphics.texture.path;
						}
						if (WTW.communities[i].ground.position.y != null) {
							groundpositiony = Number(WTW.communities[i].ground.position.y);
						}
						if (WTW.communities[i].water.position.y != null) {
							waterpositiony = Number(WTW.communities[i].water.position.y);
						}
						WTW.init.gravity = Number(WTW.communities[i].gravity);
						loadedsettings = 1;
					}
				}
			} 
		}
		if (loadedsettings == 0) {
			skydomeid = WTW.init.skyTextureID;
			skydomepath = WTW.init.skyTexturePath;
			groundtextureid = WTW.init.groundTextureID;
			groundtexturepath = WTW.init.groundTexturePath;
			groundpositiony = WTW.init.groundPositionY;
			waterpositiony = WTW.init.waterPositionY;
		}
		WTW.loadSkyScene(WTW.init.skyInclination, WTW.init.skyLuminance, WTW.init.skyAzimuth, WTW.init.skyRayleigh, WTW.init.skyTurbidity, WTW.init.skyMieDirectionalG, WTW.init.skyMieCoefficient, .25);
		WTW.sun.intensity = WTW.getSunIntensity(WTW.init.skyInclination, WTW.init.skyAzimuth);

		WTW.extraGround.material.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		if (groundtexturepath != "" && groundtexturepath != '/content/system/images/dirt-512x512.jpg') {
			WTW.extraGround.material.diffuseTexture = new BABYLON.Texture(groundtexturepath, scene);
		}
		WTW.extraGround.material.diffuseTexture.uScale = 500;
		WTW.extraGround.material.diffuseTexture.vScale = 500;
		var groundcovering = WTW.extraGround.material;
		WTW.extraGround.material.dispose();
		WTW.extraGround.material = groundcovering;
		if ((groundpositiony < waterpositiony) || (WTW.adminView == 1 && communityid != "")) {
			WTW.initLoadUpload(groundtextureid, groundtextureid, 7);
			WTW.water = BABYLON.MeshBuilder.CreatePlane("communitywater", {width:5000, height:5000, updatable: true, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
			WTW.water.rotation.x = WTW.getRadians(90);
			WTW.waterMat = new BABYLON.WaterMaterial("communitywatermat", scene, new BABYLON.Vector2(512, 512));
			WTW.waterMat.backFaceCulling = true;
			WTW.waterMat.bumpTexture = new BABYLON.Texture("/content/system/images/waterbump.png", scene);
			WTW.waterMat.windForce = -10;
			WTW.waterMat.waveHeight = .2;
			WTW.waterMat.windDirection = new BABYLON.Vector2(1, 1);
			WTW.waterMat.waterColor = new BABYLON.Color3(0.1, 0.2, 0.5); /* water color blended with the refraction (near) */
			WTW.waterMat.waterColor2 = new BABYLON.Color3(0.3, 0.4, 0.8); /* water color blended with the reflection (far) */
			WTW.waterMat.colorBlendFactor = 0.2;
			WTW.waterMat.bumpHeight = 0.6;
			WTW.waterMat.waveLength = 0.02;	
			WTW.waterMat.alpha = .98;
			WTW.water.isPickable = false;
			WTW.water.checkCollisions = false;
			WTW.water.material = WTW.waterMat;
			WTW.water.position.y = waterpositiony;
			WTW.waterMat.addToRenderList(WTW.sky);
			WTW.waterMat.addToRenderList(WTW.extraGround);
		}
		
		if (WTW.sky.position.x != WTW.init.startPositionX || WTW.sky.position.y != WTW.init.startPositionY - 100 || WTW.sky.position.z != WTW.init.startPositionZ) {
			// optional: add animation
			WTW.sky.position.x = WTW.init.startPositionX;
			WTW.sky.position.y = WTW.init.startPositionY - 100;
			WTW.sky.position.z = WTW.init.startPositionZ;
		}
		if (groundpositiony != 0) {
			// optional: add animation
			WTW.extraGround.position.y = groundpositiony;
		}
		if (WTW.shadows == null) {
			var shadowsetting = WTW.getCookie("wtw_shadowsetting");
            if (shadowsetting == null || isNaN(shadowsetting))  {
                if (WTW.gpuSetting == 'medium') {
					WTW.shadowset = 1;
                }
                else if (WTW.gpuSetting == 'high') {
					WTW.shadowset = 3;
                } else {
					WTW.shadowset = 3;
                }
            }
            WTW.setShadowSettings();
		}
		WTW.getConnectingGrids();
		if (WTW.adminView == 1) {
			WTW.baseMoldCount = scene.meshes.length;
			if (typeof WTW.adminLoadAfterScreen == 'function') {
				window.setTimeout( function() { WTW.adminLoadAfterScreen();},2000 );
			}
		}
		WTW.isUploadReadyOrAdd('t1qlqxd6pzubzzzy');
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_core.js-loadCommunity=" + ex.message);
	} 
}

WTWJS.prototype.getConnectingGrids = function() {
	try {
		var parentwebid = "";
		if (communityid != "") {
			parentwebid = communityid;
		} else if (buildingid != "") {
			parentwebid = buildingid;
		} else if (thingid != "") {
			parentwebid = thingid;
		}
		if (parentwebid != '') {
			var positionx = 0;
			var positiony = 0;
			var positionz = 0;
			if (WTW.myAvatar != null) {
				positionx = WTW.myAvatar.position.x;
				positiony = WTW.myAvatar.position.y;
				positionz = WTW.myAvatar.position.z;
			} else {
				positionx = WTW.init.startPositionX;
				positiony = WTW.init.startPositionY;
				positionz = WTW.init.startPositionZ;
			}
			WTW.getJSON("/connect/connectinggrids.php?parentwebid=" + parentwebid + "&startpositionx=" + positionx + "&startpositiony=" + positiony + "&startpositionz=" + positionz + "&userid=" + dGet('wtw_tuserid').value, 
				function(response) {
					WTW.loadConnectingGrids(JSON.parse(response));
				}
			);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_core.js-getConnectingGrids=" + ex.message);
	} 
}

WTWJS.prototype.loadConnectingGrids = function(addconnectinggrids) {
	try {
		var zparentconnectinggridind = -1;
		var zparentconnectinggridid = "";
		if (addconnectinggrids.webitems != undefined) {
			for (var i = 0; i < addconnectinggrids.webitems.length; i++) {
				if (addconnectinggrids.webitems[i] != null) {
					var zcommunityid = "";
					var zbuildingid = "";
					var zthingid = "";
					var zconnectinggridind = WTW.getNextCount(WTW.connectingGrids);
					WTW.connectingGrids[zconnectinggridind] = addconnectinggrids.webitems[i];
					WTW.connectingGrids[zconnectinggridind].connectinggridind = zconnectinggridind;
					switch (WTW.connectingGrids[zconnectinggridind].childwebtype) {
						case "community":
							zcommunityid = WTW.connectingGrids[zconnectinggridind].childwebid;
							break;
						case "building":
							zbuildingid = WTW.connectingGrids[zconnectinggridind].childwebid;
							break;
						case "thing":
							zthingid = WTW.connectingGrids[zconnectinggridind].childwebid;
							break;
					}
					if (WTW.connectingGrids[zconnectinggridind].loadlevel == "1") {
						var zparentname = "";
						if (WTW.connectingGrids[zconnectinggridind].parentwebid == "") {
							zparentconnectinggridind = zconnectinggridind;
							zparentconnectinggridid = WTW.connectingGrids[zconnectinggridind].connectinggridid;
							WTW.connectingGrids[zconnectinggridind].moldname = "connectinggrids-" + zconnectinggridind + "-" + zparentconnectinggridid + "--";
							WTW.connectingGrids[zconnectinggridind].shown = "1";
							WTW.connectingGrids[zconnectinggridind].parentname = zparentname;
							WTW.connectingGrids[zconnectinggridind].parentconnectinggridind = -1;
							WTW.connectingGrids[zconnectinggridind].parentconnectinggridid = "";
							WTW.connectingGrids[zconnectinggridind].status = 2;
							WTW.addMoldToQueue(WTW.connectingGrids[zconnectinggridind].moldname, WTW.connectingGrids[zconnectinggridind], zparentname, "hidden",null);
							dGet('wtw_tconnectinggridname').value = WTW.connectingGrids[zconnectinggridind].moldname;
							dGet('wtw_tconnectinggridind').value = zconnectinggridind;
							dGet('wtw_tconnectinggridid').value = zparentconnectinggridid;
						} else if (zparentconnectinggridind != -1) {
							WTW.connectingGrids[zconnectinggridind].moldname = "connectinggrids-" + zconnectinggridind + "-" + WTW.connectingGrids[zconnectinggridind].connectinggridid + "-" + zparentconnectinggridind + "-" + zparentconnectinggridid;
							zparentname = "connectinggrids-" + zparentconnectinggridind + "-" + zparentconnectinggridid + "--";
							WTW.mainParent = zparentname;
							WTW.connectingGrids[zconnectinggridind].shown = "0";
							WTW.connectingGrids[zconnectinggridind].parentname = zparentname;
							WTW.connectingGrids[zconnectinggridind].parentconnectinggridind = zparentconnectinggridind;
							WTW.connectingGrids[zconnectinggridind].parentconnectinggridid = zparentconnectinggridid;
						}
						if (WTW.connectingGrids[zconnectinggridind].altloadactionzoneid == "") {
							WTW.getJSON("/connect/actionzonesbywebid.php?communityid=" + zcommunityid + "&buildingid=" + zbuildingid + "&thingid=" + zthingid + "&parentname=" + WTW.connectingGrids[zconnectinggridind].moldname + "&connectinggridid=" + WTW.connectingGrids[zconnectinggridind].connectinggridid + "&connectinggridind=" + zconnectinggridind, 
								function(response) {
									WTW.loadActionZones(JSON.parse(response));
								}
							);
						}
					} else {
						var zsubparentconnectinggridid = WTW.connectingGrids[zconnectinggridind].parentconnectinggridid;
						var zsubparentconnectinggridind = WTW.getConnectingGridInd(zsubparentconnectinggridid);
						WTW.connectingGrids[zconnectinggridind].moldname = "connectinggrids-" + zconnectinggridind + "-" + WTW.connectingGrids[zconnectinggridind].connectinggridid + "-" + zsubparentconnectinggridind + "-" + zsubparentconnectinggridid;
						zparentname = "connectinggrids-" + zsubparentconnectinggridind + "-" + zsubparentconnectinggridid + "-" + zparentconnectinggridind + "-" + zparentconnectinggridid;
						WTW.connectingGrids[zconnectinggridind].shown = "0";
						WTW.connectingGrids[zconnectinggridind].parentname = zparentname;
						WTW.connectingGrids[zconnectinggridind].parentconnectinggridind = zsubparentconnectinggridind;
						WTW.connectingGrids[zconnectinggridind].parentconnectinggridid = zsubparentconnectinggridid;
						if (WTW.connectingGrids[zconnectinggridind].altloadactionzoneid == "") {
							WTW.getJSON("/connect/actionzonesbywebid.php?communityid=" + zcommunityid + "&buildingid=" + zbuildingid + "&thingid=" + zthingid + "&parentname=" + WTW.connectingGrids[zconnectinggridind].moldname + "&connectinggridid=" + WTW.connectingGrids[zconnectinggridind].connectinggridid + "&connectinggridind=" + zconnectinggridind, 
								function(response) {
									WTW.loadActionZones(JSON.parse(response));
								}
							);
						}
					}
					WTW.pluginsLoadConnectingGrids(zconnectinggridind, zcommunityid, zbuildingid, zthingid);
				}
			}
		}
		var condition2 = new BABYLON.PredicateCondition(scene.actionManager, function () {
			var test = false;
			if (WTW.loadMoldQueue.length > 0 && WTW.checkLoadQueue == 0) {
				test = true;
			}
			return test;
		});
		scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnEveryFrameTrigger, WTW.processMoldQueue, condition2));
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_core.js-loadConnectingGrids=" + ex.message);
	} 
}

WTWJS.prototype.getActionZones = function(connectinggridind) {
	try {
		if (WTW.connectingGrids[connectinggridind] != null) {
			var zcommunityid = "";
			var zbuildingid = "";
			var zthingid = "";
			var altloadactionzoneid = "";
			switch (WTW.connectingGrids[connectinggridind].childwebtype) {
				case "community":
					zcommunityid = WTW.connectingGrids[connectinggridind].childwebid;
					break;
				case "building":
					zbuildingid = WTW.connectingGrids[connectinggridind].childwebid;
					break;
				case "thing":
					zthingid = WTW.connectingGrids[connectinggridind].childwebid;
					break;
			}
			if (WTW.connectingGrids[connectinggridind] != null) {
				if (WTW.connectingGrids[connectinggridind].altloadactionzoneid != undefined) {
					altloadactionzoneid = WTW.connectingGrids[connectinggridind].altloadactionzoneid;
				}
			}
			if (altloadactionzoneid == "") {
				WTW.getJSON("/connect/actionzonesbywebid.php?communityid=" + zcommunityid + "&buildingid=" + zbuildingid + "&thingid=" + zthingid + "&parentname=" + WTW.connectingGrids[connectinggridind].moldname + "&connectinggridid=" + WTW.connectingGrids[connectinggridind].connectinggridid + "&connectinggridind=" + connectinggridind, 
					function(response) {
						WTW.loadActionZones(JSON.parse(response));
					}
				);
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_core.js-getActionZones=" + ex.message);
	} 
}

WTWJS.prototype.loadActionZones = function(addactionzones) {
	try {
		if (addactionzones.actionzones != undefined) {
			for (var i = 0; i < addactionzones.actionzones.length; i++) {
				if (WTW.isItemInArray(WTW.actionZones, addactionzones.actionzones[i].actionzoneid, addactionzones.actionzones[i].connectinggridind, -1, "actionzones") == false) {
					var actionzoneind = WTW.getNextCount(WTW.actionZones);
					var altconnectinggridid = "";
					var altconnectinggridind = -1;
					WTW.actionZones[actionzoneind] = addactionzones.actionzones[i];
					WTW.actionZones[actionzoneind].actionzoneind = actionzoneind;
					WTW.actionZones[actionzoneind].status = 0;
					if (WTW.actionZones[actionzoneind].altconnectinggridid != "" && WTW.actionZones[actionzoneind].altconnectinggridid != undefined) {
						altconnectinggridid = WTW.actionZones[actionzoneind].altconnectinggridid;
						altconnectinggridind = WTW.getConnectingGridInd(altconnectinggridid);
					}
					var cgmoldname = WTW.connectingGrids[Number(WTW.actionZones[actionzoneind].connectinggridind)].moldname;
					if (altconnectinggridind > -1 && WTW.connectingGrids[altconnectinggridind] != undefined) {
						var parentname = WTW.connectingGrids[altconnectinggridind].moldname;
						if (cgmoldname.indexOf("-") > -1) {
							var namepart = cgmoldname.split('-');
							if (namepart[2] != null) {
								parentname = "connectinggrids-" + altconnectinggridind + "-" + altconnectinggridid + "-" + namepart[1] + "-" + namepart[2];
							}
						}
						WTW.actionZones[actionzoneind].parentname = parentname;
					} else {
						WTW.actionZones[actionzoneind].parentname = cgmoldname;
					}
					var actionzonename = "actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype;
					WTW.actionZones[actionzoneind].moldname = actionzonename;
					WTW.attachConnectingGridToActionZone(actionzoneind);
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_core.js-loadActionZones=" + ex.message);
	} 
}

WTWJS.prototype.attachConnectingGridToActionZone = function(actionzoneind) {
	try {
		for (var i=0;i < WTW.connectingGrids.length; i++) {
			if (WTW.connectingGrids[i] != null) {
				var attachactionzoneid = "";
				var attachactionzoneind = -1;
				if (WTW.connectingGrids[i].attachactionzoneid != undefined) {
					attachactionzoneid = WTW.connectingGrids[i].attachactionzoneid;
				}
				if (attachactionzoneid != "") {
					attachactionzoneind = WTW.getActionZoneInd(attachactionzoneid, WTW.connectingGrids[i].parentconnectinggridind);
					WTW.connectingGrids[i].attachactionzoneind = attachactionzoneind;
					if (actionzoneind == attachactionzoneind) {
						var parentname = WTW.getParentActionZoneName(actionzoneind, WTW.connectingGrids[i].parentconnectinggridind);
						if (parentname != "") {
							WTW.connectingGrids[i].parentname = parentname;
							if (WTW.actionZones[actionzoneind] != null) {
								var posx = Number(WTW.actionZones[actionzoneind].position.x);
								var posy = Number(WTW.actionZones[actionzoneind].position.y);
								var posz = Number(WTW.actionZones[actionzoneind].position.z);
								WTW.connectingGrids[i].position.x = Number(WTW.connectingGrids[i].position.x) - posx;
								WTW.connectingGrids[i].position.y = Number(WTW.connectingGrids[i].position.y) - posy;
								WTW.connectingGrids[i].position.z = Number(WTW.connectingGrids[i].position.z) - posz;
							}
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_core.js-attachConnectingGridToActionZone=" + ex.message);
	} 
}

WTWJS.prototype.getMoldsByWebID = function(actionzoneind) {
	try {
		var zcommunityid = "";
		var zbuildingid = "";
		var zthingid = "";
		var actionzoneid = "";
		var connectinggridind = -1;
		var connectinggridid = "";
		var altloadactionzoneid = "";
		if (WTW.actionZones[actionzoneind] != null) {
			WTW.actionZones[actionzoneind].status = 3;
			actionzoneid = WTW.actionZones[actionzoneind].actionzoneid;
			if (WTW.actionZones[actionzoneind].thinginfo.thingid != undefined) {
				zthingid = WTW.actionZones[actionzoneind].thinginfo.thingid;
			}
			if (WTW.actionZones[actionzoneind].buildinginfo.buildingid != undefined && zthingid == '') {
				zbuildingid = WTW.actionZones[actionzoneind].buildinginfo.buildingid;
			}
			if (WTW.actionZones[actionzoneind].communityinfo.communityid != undefined && zthingid == '' && zbuildingid == '') {
				zcommunityid = WTW.actionZones[actionzoneind].communityinfo.communityid;
			}
			connectinggridind = WTW.actionZones[actionzoneind].connectinggridind;
			connectinggridid = WTW.actionZones[actionzoneind].connectinggridid;
			var parentname = "";
			if (WTW.connectingGrids[connectinggridind] != null) {
				parentname = WTW.connectingGrids[connectinggridind].moldname
				if (WTW.connectingGrids[connectinggridind].altloadactionzoneid != undefined) {
					altloadactionzoneid = WTW.connectingGrids[connectinggridind].altloadactionzoneid;
				}
			}
			if (parentname == "") {
				WTW.actionZones[actionzoneind].parentname;
			}
		}
		if (altloadactionzoneid == "") {
			WTW.getJSON("/connect/actionzonesbywebid.php?communityid=" + zcommunityid + "&buildingid=" + zbuildingid + "&thingid=" + zthingid + "&parentname=" + parentname + "&connectinggridid=" + connectinggridid + "&connectinggridind=" + connectinggridind, 
				function(response) {
					WTW.loadActionZones(JSON.parse(response));
				}
			);
		}
		var gpusetting = WTW.gpuSetting;
		if (gpusetting == "medium") {
			gpusetting = "high";
		}
		var graphiclevel = '-1'; // auto
		switch (WTW.graphicSet) {
			case 0: // low
				graphiclevel = '0';
				break;
			case 2: // high
				graphiclevel = '1';
				break;
		}
		if (WTW.adminView == 1) {
			graphiclevel = '-1';
			WTW.show('wtw_graphichelpadmin');
		}
		WTW.getJSON("/connect/moldsbywebid.php?webcommunityid=" + communityid + "&webbuildingid=" + buildingid + "&communityid=" + zcommunityid + "&buildingid=" + zbuildingid + "&thingid=" + zthingid + "&parentactionzoneind=" + actionzoneind + "&actionzoneid=" + actionzoneid + "&parentname=" + WTW.actionZones[actionzoneind].parentname + "&connectinggridid=" + connectinggridid + "&connectinggridind=" + connectinggridind + "&userid=" + dGet("wtw_tuserid").value + "&graphiclevel=" + graphiclevel, 
			function(response) {
				WTW.loadMolds(JSON.parse(response));
			}
		);
/*		WTW.getJSON("/connect/automationsbywebid.php?communityid=" + zcommunityid + "&buildingid=" + zbuildingid + "&thingid=" + zthingid + "&parentname=" + parentname + "&connectinggridid=" + connectinggridid + "&connectinggridind=" + connectinggridind, 
			function(response) {
				WTW.loadAutomations(JSON.parse(response));
			}
		); */
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_core.js-getMoldsByWebID=" + ex.message);
	}
}

WTWJS.prototype.loadMolds = function(addmolds) {
	try {
		var connectinggridid = "";
		var connectinggridind = -1;
		var parentactionzoneind = -1;
		if (addmolds != null) {
		if (addmolds.molds != null) {
				for (var i = 0; i < addmolds.molds.length; i++) {
					if (addmolds.molds[i] != null) {
						var zcommunityid = "";
						var zbuildingid = "";
						var zthingid = "";
						if (addmolds.molds[i] != null) {
							var altconnectinggridid = "";
							var altconnectinggridind = -1;
							var testactionzoneid = "";
							var loadactionzoneind = -1;
							var inloadactionzone = "0";
							if (addmolds.molds[i].altconnectinggridid != "" && addmolds.molds[i].altconnectinggridid != undefined) {
								altconnectinggridid = addmolds.molds[i].altconnectinggridid;
								altconnectinggridind = WTW.getConnectingGridInd(altconnectinggridid);
								addmolds.molds[i].altconnectinggridind = altconnectinggridind;
							}
							if (connectinggridind == -1) {
								connectinggridid = addmolds.molds[i].connectinggridid;
								connectinggridind = WTW.getConnectingGridInd(connectinggridid);
							}
							if (addmolds.molds[i].loadactionzoneind != undefined) {
								loadactionzoneind = addmolds.molds[i].loadactionzoneind;
							}
							if (loadactionzoneind == -1) {
								loadactionzoneind = WTW.getActionZoneInd(addmolds.molds[i].loadactionzoneid, connectinggridind);
								addmolds.molds[i].loadactionzoneind = loadactionzoneind;
							}
							if (parentactionzoneind == -1) {
								parentactionzoneind = addmolds.molds[i].parentactionzoneind;
							}
							if (loadactionzoneind == parentactionzoneind) {
								inloadactionzone = "1";
								WTW.actionZones[loadactionzoneind].inloadactionzone = inloadactionzone;
							} else if (WTW.actionZones[loadactionzoneind] != null) {
								if (WTW.actionZones[loadactionzoneind].inloadactionzone != undefined) {
									inloadactionzone = WTW.actionZones[loadactionzoneind].inloadactionzone;
								} else {
									var loadactionzone = scene.getMeshByID(WTW.actionZones[loadactionzoneind].moldname);
									if (loadactionzone != null) {
										if (WTW.myAvatar.intersectsMesh(loadactionzone, false)) { // (precise false)
											inloadactionzone = "1";
										}
									}
								}
								WTW.actionZones[loadactionzoneind].inloadactionzone = inloadactionzone;
							}
							if (addmolds.molds[i].communityinfo.communityid != undefined) {
								zcommunityid = addmolds.molds[i].communityinfo.communityid;
								if (zcommunityid != "" && zbuildingid == "" && zthingid == "") {
									if (WTW.isItemInArray(WTW.communitiesMolds, addmolds.molds[i].moldid, connectinggridind, altconnectinggridind, "communitymolds") == false) {
										var moldind = WTW.getNextCount(WTW.communitiesMolds);
										WTW.communitiesMolds[moldind] = addmolds.molds[i];
										WTW.communitiesMolds[moldind].moldind = moldind;
										WTW.communitiesMolds[moldind].connectinggridind = connectinggridind;
										WTW.communitiesMolds[moldind].connectinggridid = connectinggridid;
										var cgmoldname = WTW.connectingGrids[Number(connectinggridind)].moldname;
										if (altconnectinggridind > -1 && WTW.connectingGrids[altconnectinggridind] != undefined) {
											var parentname = WTW.connectingGrids[altconnectinggridind].moldname;
											if (cgmoldname.indexOf("-") > -1) {
												var namepart = cgmoldname.split('-');
												if (namepart[2] != null) {
													parentname = "connectinggrids-" + altconnectinggridind + "-" + altconnectinggridid + "-" + namepart[1] + "-" + namepart[2];
												}
											}
											WTW.communitiesMolds[moldind].parentname = parentname;
										} else {
											WTW.communitiesMolds[moldind].parentname = cgmoldname;
										}
										WTW.communitiesMolds[moldind].moldname = "communitymolds-" + moldind + "-" + WTW.communitiesMolds[moldind].moldid + "-" + connectinggridind + "-" + connectinggridid + "-" + WTW.communitiesMolds[moldind].shape;
										WTW.communitiesMolds[moldind].inloadactionzone = inloadactionzone;
										if (testactionzoneid != WTW.communitiesMolds[moldind].loadactionzoneid) {
											testactionzoneid = WTW.communitiesMolds[moldind].loadactionzoneid;
										}
									}			
								}								
							}
							if (addmolds.molds[i].buildinginfo.buildingid != undefined) {
								zbuildingid = addmolds.molds[i].buildinginfo.buildingid;
								if (zbuildingid != "" && zthingid == "") {
									if (WTW.isItemInArray(WTW.buildingMolds, addmolds.molds[i].moldid, connectinggridind, altconnectinggridind, "buildingmolds") == false) {
										var moldind = WTW.getNextCount(WTW.buildingMolds);
										WTW.buildingMolds[moldind] = addmolds.molds[i];
										WTW.buildingMolds[moldind].moldind = moldind;
										WTW.buildingMolds[moldind].connectinggridind = connectinggridind;
										WTW.buildingMolds[moldind].connectinggridid = connectinggridid;
										var cgmoldname = WTW.connectingGrids[Number(connectinggridind)].moldname;
										if (altconnectinggridind > -1 && WTW.connectingGrids[altconnectinggridind] != undefined) {
											var parentname = WTW.connectingGrids[altconnectinggridind].moldname;
											if (cgmoldname.indexOf("-") > -1) {
												var namepart = cgmoldname.split('-');
												if (namepart[2] != null) {
													parentname = "connectinggrids-" + altconnectinggridind + "-" + altconnectinggridid + "-" + namepart[1] + "-" + namepart[2];
												}
											}
											WTW.buildingMolds[moldind].parentname = parentname;
										} else {
											WTW.buildingMolds[moldind].parentname = cgmoldname;
										}
										WTW.buildingMolds[moldind].moldname = "buildingmolds-" + moldind + "-" + WTW.buildingMolds[moldind].moldid + "-" + connectinggridind + "-" + connectinggridid + "-" + WTW.buildingMolds[moldind].shape;
										WTW.buildingMolds[moldind].inloadactionzone = inloadactionzone;
										if (testactionzoneid != WTW.buildingMolds[moldind].loadactionzoneid) {
											testactionzoneid = WTW.buildingMolds[moldind].loadactionzoneid;
										}
									}						
								}
							} 
							if (addmolds.molds[i].thinginfo.thingid != undefined) {
								zthingid = addmolds.molds[i].thinginfo.thingid;
								if (zthingid != "") {
									if (WTW.isItemInArray(WTW.thingMolds, addmolds.molds[i].moldid, connectinggridind, altconnectinggridind, "thingmolds") == false) {
										var moldind = WTW.getNextCount(WTW.thingMolds);
										WTW.thingMolds[moldind] = addmolds.molds[i];
										WTW.thingMolds[moldind].moldind = moldind;
										WTW.thingMolds[moldind].connectinggridind = connectinggridind;
										WTW.thingMolds[moldind].connectinggridid = connectinggridid;
										var cgmoldname = WTW.connectingGrids[Number(connectinggridind)].moldname;
										if (altconnectinggridind > -1 && WTW.connectingGrids[altconnectinggridind] != undefined) {
											var parentname = WTW.connectingGrids[altconnectinggridind].moldname;
											if (cgmoldname.indexOf("-") > -1) {
												var namepart = cgmoldname.split('-');
												if (namepart[2] != null) {
													parentname = "connectinggrids-" + altconnectinggridind + "-" + altconnectinggridid + "-" + namepart[1] + "-" + namepart[2];
												}
											}
											WTW.thingMolds[moldind].parentname = parentname;
										} else {
											WTW.thingMolds[moldind].parentname = cgmoldname;
										}
										WTW.thingMolds[moldind].moldname = "thingmolds-" + moldind + "-" + WTW.thingMolds[moldind].moldid + "-" + connectinggridind + "-" + connectinggridid + "-" + WTW.thingMolds[moldind].shape;
										WTW.thingMolds[moldind].inloadactionzone = inloadactionzone;
										if (testactionzoneid != WTW.thingMolds[moldind].loadactionzoneid) {
											testactionzoneid = WTW.thingMolds[moldind].loadactionzoneid;
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
		WTW.log("core-scripts-prime-wtw_core.js-loadMolds=" + ex.message);
	}
}

WTWJS.prototype.loadAutomations = function(addautomations) {
	try {
		if (addautomations != null) {
			if (addautomations.automations != null) {
				var automationcount = 0;
				for (var i = 0; i < addautomations.automations.length; i++) {
					if (addautomations.automations[i] != null) {
						if (WTW.isStepInAutomations(addautomations.automations[i].step.automationstepid) == false, addautomations.automations[i].connectinggridind) {
							var automationind = WTW.getNextCount(WTW.automations);
							WTW.automations[automationind] = addautomations.automations[i];
							WTW.automations[automationind].automationind = automationind;
							WTW.automations[automationind].moldid = WTW.automations[automationind].automationid;
							WTW.automations[automationind].step.automationstepind = automationind;
							WTW.automations[automationind].moldname = "automation-" + automationind + "-" + WTW.automations[automationind].step.automationstepid + "-" + WTW.automations[automationind].connectinggridind + "-" + WTW.automations[automationind].connectinggridid;
							automationcount += 1;
						}
					}
				}
				if (automationcount > 0) {
					//window.setTimeout(function() { WTW.initAutomations(); }, 5000);
				}
			}
		}	
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_core.js-loadAutomations=" + ex.message);
	}
}

WTWJS.prototype.unloadMoldsByWebID = function(actionzoneind) {
	try {
		if (WTW.actionZones[actionzoneind] != null) {
			var zcommunityid = WTW.actionZones[actionzoneind].communityinfo.communityid;
			var zbuildingid = WTW.actionZones[actionzoneind].buildinginfo.buildingid;
			var zthingid = WTW.actionZones[actionzoneind].thinginfo.thingid;
			var connectinggridind = WTW.actionZones[actionzoneind].connectinggridind;
			for (var i=0; i < WTW.actionZones.length; i++) {
				if (WTW.actionZones[i] != null) {
					if (WTW.actionZones[i].connectinggridind  == connectinggridind && WTW.actionZones[i].communityinfo.communityid == zcommunityid && WTW.actionZones[i].buildinginfo.buildingid == zbuildingid && WTW.actionZones[i].thinginfo.thingid == zthingid) {
						var actionzoneid = WTW.actionZones[i].actionzoneid;
						for (var j=0; j < WTW.communitiesMolds.length; j++) {
							if (WTW.communitiesMolds[j] != null) {
								if (WTW.communitiesMolds[j].loadactionzoneid == actionzoneid && WTW.communitiesMolds[j].connectinggridind == connectinggridind) {
									WTW.addDisposeMoldToQueue(WTW.communitiesMolds[j].moldname, false);
									WTW.communitiesMolds[j] = null;
								}
							}
						}
						for (var j=0; j < WTW.buildingMolds.length; j++) {
							if (WTW.buildingMolds[j] != null) {
								if (WTW.buildingMolds[j].loadactionzoneid == actionzoneid && WTW.buildingMolds[j].connectinggridind == connectinggridind) {
									WTW.addDisposeMoldToQueue(WTW.buildingMolds[j].moldname, false);
									WTW.buildingMolds[j] = null;
								}
							}
						}
						for (var j=0; j < WTW.thingMolds.length; j++) {
							if (WTW.thingMolds[j] != null) {
								if (WTW.thingMolds[j].loadactionzoneid == actionzoneid && WTW.thingMolds[j].connectinggridind == connectinggridind) {
									WTW.addDisposeMoldToQueue(WTW.thingMolds[j].moldname, false);
									WTW.thingMolds[j] = null;
								}
							}
						}
						for (var j=0; j < WTW.automations.length; j++) {
							if (WTW.automations[j] != null) {
								if (WTW.automations[j].loadactionzoneid == actionzoneid && WTW.automations[j].connectinggridind == connectinggridind) {
									if (WTW.automations[j].step.timer != null) {
										window.clearInterval(WTW.automations[j].step.timer);
										WTW.automations[j].step.timer = null;
									}
									WTW.automations[j] = null;
								}
							}
						}
						if (WTW.actionZones[i] != null) {
							//WTW.addDisposeMoldToQueue(WTW.actionZones[i].moldname, false);
							//WTW.actionZones[i] = null;
						}
						
					}
				}
			}
			if (WTW.actionZones[actionzoneind] != null) {
				//WTW.addDisposeMoldToQueue(WTW.actionZones[actionzoneind].moldname, false);
				//WTW.actionZones[actionzoneind] = null;
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_core.js-unloadMoldsByWebID=" + ex.message);
	}
}

WTWJS.prototype.stopRender = function() {
	try {
		if (engine != null && engine != undefined) {
			WTW.pause = 1;
			engine.stopRenderLoop();
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_core.js-stopRender=" + ex.message);
	}
}

WTWJS.prototype.startRender = function() {
	try {
		if (engine != null && engine != undefined) {
			if (WTW.pause == 0) {
				engine.stopRenderLoop();
			}
			WTW.pause = 0;
			engine.runRenderLoop(function () {
				scene.render();
				try {
					WTW.pluginsRenderloop();
					WTW.animationRatio = scene.getAnimationRatio();
					WTW.fps = (Math.round(engine.getFps() * 100) / 100).toFixed(2);
					WTW.framei += 1;
					if (WTW.framei > WTW.fps * 2) {
						WTW.framei = 0;
					}
					if (WTW.isInitCycle == 0 && WTW.myAvatar != null && WTW.setupMode == 0) { // WTW.adminView == 0 && 
						WTW.pluginsRenderloopAfterInit();
					}
					if (WTW.myAvatar != null) {
						WTW.sky.position.x = WTW.myAvatar.position.x;
						WTW.sky.position.y = WTW.myAvatar.position.y - 100;
						WTW.sky.position.z = WTW.myAvatar.position.z;			
						WTW.extraGround.position.x = WTW.myAvatar.position.x;
						WTW.extraGround.position.z = WTW.myAvatar.position.z;
						WTW.extraGround.material.diffuseTexture.uOffset = (WTW.myAvatar.position.x)/10;
						WTW.extraGround.material.diffuseTexture.vOffset = (WTW.myAvatar.position.z)/10;
						if (WTW.water != null) {
							WTW.water.position.x = WTW.myAvatar.position.x;
							WTW.water.position.z = WTW.myAvatar.position.z;
						}
						if (WTW.water != null && WTW.myAvatar.position.y < -16) {
							WTW.sky.scaling.x = 2500;
							WTW.sky.scaling.y = 2500;
							WTW.sky.scaling.z = 2500;
							scene.fogDensity = 0.01;
							scene.fogColor = new BABYLON.Color3(0.0, 0.3, 0.4);
						} else {
							var skysize = 1000 + (WTW.myAvatar.position.y * 2);
							if (skysize < 3500) {
								skysize = 3500;
							}
							scene.fogDensity = 0.0005;
							scene.fogColor = new BABYLON.Color3(0.4, 0.5, 0.6);
							
							WTW.setMeshTransparentFog(WTW.sky,30);
							
							WTW.sky.scaling.x = skysize;
							WTW.sky.scaling.y = skysize-200;
							WTW.sky.scaling.z = skysize;
						}
					} else { 
						WTW.sky.position.x = WTW.init.startPositionX;
						WTW.sky.position.y = WTW.init.startPositionY - 100;
						WTW.sky.position.z = WTW.init.startPositionZ;				
						WTW.extraGround.position.x =WTW.init.startPositionX;
						WTW.extraGround.position.z = WTW.init.startPositionZ;
						WTW.extraGround.material.diffuseTexture.uOffset = (WTW.init.startPositionX)/10;
						WTW.extraGround.material.diffuseTexture.vOffset = (WTW.init.startPositionZ)/10;
						if (WTW.water != null) {
							WTW.water.position.x = WTW.init.startPositionX;
							WTW.water.position.z = WTW.init.startPositionZ;
						}
						if (WTW.water != null && WTW.init.startPositionY < -16) {
							WTW.sky.scaling.x = 2500;
							WTW.sky.scaling.y = 2500;
							WTW.sky.scaling.z = 2500;
							scene.fogDensity = 0.001;
							scene.fogColor = new BABYLON.Color3(0.0, 0.3, 0.4);
						} else {
							var skysize = 3500;
							if (WTW.myAvatar != null) {
								skysize = 1000 + (WTW.myAvatar.position.y * 2);
							}
							if (skysize < 3500) {
								skysize = 3500;
							}
							scene.fogDensity = 0.0005;
							scene.fogColor = new BABYLON.Color3(0.4, 0.5, 0.6);
							WTW.sky.scaling.x = skysize;
							WTW.sky.scaling.y = skysize;
							WTW.sky.scaling.z = skysize;
						}
					} 
					WTW.loadUserCanvas();
					if (WTW.checkShownMolds == 0) {
						WTW.setShownMolds();
					}
					WTW.setClosestBuilding();
					WTW.checkActionZones();
				} catch (ex) {} 
			});
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_core.js-startRender=" + ex.message);
	}
}

WTWJS.prototype.checkActionZones = function() {
	try {
		if (WTW.setupMode == 0) {
			var checkactionzones = false;
			if (WTW.myAvatar != null) {
				if (WTW.holdPosition != WTW.myAvatar.position.x + "|" + WTW.myAvatar.position.y + "|" + WTW.myAvatar.position.z) {
					/* if my avatar has moved then check action zones */
					checkactionzones = true;
				}
			}
			if (WTW.pluginsSetCheckActionZones()) {
				/* plugins can trigger if you need to check the Action Zones (common after any avatar movement) */
				checkactionzones = true;
			}
			if (checkactionzones || WTW.isInitCycle == 1 || WTW.rideAlong != null) {
				for (var i = 0; i < WTW.actionZones.length; i++) {
					if (WTW.actionZones[i] != null) {
						var moldname = WTW.actionZones[i].moldname;
						var actionzone = scene.getMeshByID(moldname);
						if (moldname.indexOf("loadzone") > -1 && WTW.actionZones[i].shown != "2") {
							WTW.actionZones[i].status = 0;
						} else if (actionzone != null) {
							var meinzone = false;
							if (WTW.myAvatar != null) {
								meinzone = WTW.myAvatar.intersectsMesh(actionzone, false);
							}
							var othersinzone = false;
							/* check if others are in the zone */
							
							othersinzone = WTW.pluginsCheckActionZoneTrigger(actionzone);
							if (meinzone || othersinzone) {
								if (meinzone && moldname.indexOf("loadzone") > -1 && WTW.actionZones[i].status != 2) {
									if (WTW.actionZones[i].actionzonename.toLowerCase().indexOf("extreme") > -1 && WTW.actionZones[i].actionzonename.toLowerCase().indexOf("custom") == -1) {
										if (WTW.actionZones[i].status == 0) {
											WTW.addLoadZoneToQueue(i);
										}
									}
									WTW.checkAnalytics(i);
									WTW.actionZones[i].status = 2;
								} else if (moldname.indexOf("loadanimations") > -1) {
									WTW.checkLoadAnimations(i);
								} else if (moldname.indexOf("clickactivated") > -1) {
								} else if (moldname.indexOf("door") > -1 && WTW.actionZones[i].status != 4 && WTW.actionZones[i].status != 3) {
									WTW.actionZones[i].status = 3;
								} else if (moldname.indexOf("mirror") > -1 && WTW.actionZones[i].status != 2) {
									WTW.actionZones[i].status = 2;
									WTW.checkMirrorReflectionList(i);
								} else if ((moldname.indexOf("ridealong") > -1 || moldname.indexOf("elevator") > -1 || moldname.indexOf("passengerseat") > -1) && WTW.rideAlong == null) {
									WTW.rideAlong = WTW.newRideAlong();
									WTW.rideAlong.ridealongmoldname = moldname;
									WTW.rideAlong.attachmoldid = WTW.actionZones[i].attachmoldid;
									WTW.rideAlong.attachmoldname = WTW.actionZones[i].parentname;
									WTW.rideAlong.rotatemoldname = WTW.getRotateMoldName(WTW.actionZones[i].parentname);
								} else if (moldname.indexOf("peoplemover") > -1) {
									if (WTW.rideAlong == null) {
										WTW.rideAlong = WTW.newRideAlong();
										WTW.rideAlong.ridealongmoldname = moldname.replace("actionzone-", "actionzoneaxle-");
									}
								}
							} else {
								if (moldname.indexOf("loadzone") > -1 && WTW.actionZones[i].status != 0) {
									if (WTW.actionZones[i].actionzonename.toLowerCase().indexOf("extreme") > -1 && WTW.actionZones[i].actionzonename.toLowerCase().indexOf("custom") == -1) {
										if (WTW.actionZones[i].status == 2) {
											WTW.addUnloadZoneToQueue(i);
										}
									}
									WTW.actionZones[i].status = 0;
								} else if (moldname.indexOf("clickactivated") > -1) {
								} else if (moldname.indexOf("door") > -1 && WTW.actionZones[i].status != 2 && WTW.actionZones[i].status != 1 && WTW.actionZones[i].status != 0) {
									WTW.actionZones[i].status = 2;
								} else if (moldname.indexOf("mirror") > -1 && WTW.actionZones[i].status != 2) {
									WTW.actionZones[i].status = 2;
									WTW.checkMirrorReflectionList(i);
								} else if ((moldname.indexOf("ridealong") > -1 || moldname.indexOf("elevator") > -1 || moldname.indexOf("passengerseat") > -1) && WTW.rideAlong != null) {
									if (moldname == WTW.rideAlong.ridealongmoldname) {
										if (WTW.rideAlong.attachmoldid == WTW.actionZones[i].attachmoldid) {
											WTW.rideAlong = null;
										}
									}
								} else if (moldname.indexOf("peoplemover") > -1 && WTW.rideAlong != null) {
									if (moldname == WTW.rideAlong.ridealongmoldname.replace("actionzoneaxle","actionzone")) {
										WTW.rideAlong = null;
									}
								}
							}
							WTW.pluginsCheckActionZone(moldname, i, meinzone, othersinzone);
						} else if (WTW.rideAlong != null) {
							if (moldname == WTW.rideAlong.ridealongmoldname || moldname == WTW.rideAlong.ridealongmoldname.replace("actionzoneaxle","actionzone")) {
								WTW.rideAlong = null;
							}
						} else if (moldname.indexOf("loadzone") > -1) {
							WTW.actionZones[i].status = 0;
						}
					}
				}
				if (WTW.myAvatar != null) {
					WTW.holdPosition = WTW.myAvatar.position.x + "|" + WTW.myAvatar.position.y + "|" + WTW.myAvatar.position.z;
				} else {
					WTW.holdPosition = "||";
				}
			}
		}
		if (WTW.activityTimer != null && WTW.myAvatar != null) {
			if (WTW.holdPosition != WTW.myAvatar.position.x + "|" + WTW.myAvatar.position.y + "|" + WTW.myAvatar.position.z) {
				WTW.holdPosition = WTW.myAvatar.position.x + "|" + WTW.myAvatar.position.y + "|" + WTW.myAvatar.position.z;
				WTW.resetActivityTimer();
			}
		}
		if (WTW.showFPS == 1) {
			var gridlines = 0;
			if (WTW.lineY != null) {
				gridlines = 30;
			}
			var mcount = 0;
			if (scene.meshes.length - WTW.baseMoldCount - gridlines > 0) {
				mcount = scene.meshes.length - WTW.baseMoldCount - gridlines;
			}
			dGet('wtw_showmeshfps').innerHTML = "Mold Count = " + (mcount) + "<br />Frames Per Second=" + WTW.fps;
			dGet('wtw_fpsvisibility').innerHTML = "Mold Count/FPS are Visible";
			dGet('wtw_fpsicon').src = "/content/system/images/menuon.png";
			dGet('wtw_fpsicon').alt = "Hide Mold Count";
			dGet('wtw_fpsicon').title = "Hide Mold Count";
			WTW.show('wtw_showmeshfps');
			WTW.showFPS = 1;
		} else {
			WTW.hide('wtw_showmeshfps');
		}
	} catch(ex) {
		WTW.log("core-scripts-prime-wtw_core.js-checkActionZones=" + ex.message);
	}
}

WTWJS.prototype.setClosestBuilding = function() {
	try {
		var closestwebid = '';
		var closestaccess = '';
		var closestwebname = '';
		var closestwebtype = 'Building';
		if (thingid != '') {
			if (WTW.things != null) {
				if (WTW.things.length > 0) {
					var thingind = WTW.getThingInd(thingid);
					if (WTW.things[thingind] != null) {
						if (WTW.things[thingind].thinginfo != undefined) {
							var thingname = WTW.things[thingind].thinginfo.thingname;
							if (thingname != '') {
								closestwebname = WTW.decode(thingname);
							}
							closestwebid = WTW.things[thingind].thinginfo.thingid;
							closestaccess = WTW.things[thingind].thinginfo.access;
							closestwebtype = 'Thing';
						}
					}
				} 
			}
			if (closestwebname == '') {
				closestwebname = "3D Thing";
				closestwebtype = 'Thing';
				closestwebid = thingid;
			}
		} else if (buildingid != "") {
			if (WTW.buildings != null) {
				if (WTW.buildings.length > 0) {
					var buildingind = WTW.getBuildingInd(buildingid);
					if (WTW.buildings[buildingind] != null) {
						if (WTW.buildings[buildingind].buildinginfo != undefined) {
							closestwebname = WTW.decode(WTW.buildings[buildingind].buildinginfo.buildingname);
							closestwebid = WTW.buildings[buildingind].buildinginfo.buildingid;
						}
					}
				}
			}
			if (closestwebname == '') {
				if (WTW.buildingName != '') {
					closestwebname = WTW.decode(WTW.buildingName);
				} else {
					closestwebname = "3D Building";
				}
				closestwebid = buildingid;
			}
		} else {
			var lowdist = -1;
			if (WTW.connectingGrids != null) {
				if (WTW.connectingGrids.length > 0) {
					for (var i=0; i < WTW.connectingGrids.length; i++) {
						if (WTW.connectingGrids[i] != null) {
							if (WTW.connectingGrids[i].parentwebtype == 'community' && WTW.connectingGrids[i].childwebtype == 'building') {
								var checkdist = 1000000;
								var x = WTW.connectingGrids[i].position.x;
								var y = WTW.connectingGrids[i].position.y;
								var z = WTW.connectingGrids[i].position.z;
								if (WTW.myAvatar != null) {
									checkdist = WTW.distance(WTW.myAvatar.position.x,WTW.myAvatar.position.y,WTW.myAvatar.position.z,x,y,z);
								}
								if (lowdist == -1 || checkdist < lowdist) {
									WTW.closestAngle = WTW.getMyAngleToPoint(x,z);
									if (WTW.connectingGrids[i].buildinginfo.buildingname != "" && WTW.connectingGrids[i].buildinginfo.buildingname != undefined && WTW.connectingGrids[i].buildinginfo.buildingname != null) {
										closestwebname = WTW.decode(WTW.connectingGrids[i].buildinginfo.buildingname);
									} else if (WTW.buildingName != "") {
										closestwebname = WTW.decode(WTW.buildingName);
									} else {
										closestwebname = "Walk the Web!";
									}
									closestwebid = WTW.connectingGrids[i].buildinginfo.buildingid;
									closestaccess = WTW.connectingGrids[i].buildinginfo.access;
									WTW.editBuildingAccess = closestaccess;
									lowdist = checkdist;
									WTW.closestDistance = lowdist;
								}
							}
						}
					}
				}
			} else {
				WTW.closestAngle = null;
			} 
		}
		if (WTW.browseWebID != closestwebid || (WTW.browseUserID != dGet('wtw_tuserid').value)) {
			
			if (dGet('wtw_showbuildingname') != null) {
				if (closestwebname != "") {
					dGet('wtw_showbuildingname').innerHTML = closestwebname;
					dGet('wtw_showbuildingname').style.cursor = 'pointer';
					WTW.showInline('wtw_showbuildingname');
				}
			}
			if (WTW.editBuildingAccess != undefined) {
				if (WTW.adminView == 0 && ((WTW.editBuildingAccess.indexOf(dGet('wtw_tuserid').value) > -1 && closestwebtype == 'Building') || (closestaccess.indexOf(dGet('wtw_tuserid').value) > -1 && closestwebtype == 'Thing')) && dGet('wtw_tuserid').value != '') {
					dGet('wtw_modebuilding').alt = "Edit " + closestwebtype;
					dGet('wtw_modebuilding').title = "Edit " + closestwebtype;
					switch (closestwebtype) {
						case "Thing":
							dGet('wtw_modebuilding').src = "/content/system/images/menuthings32.png";
							break;
						case "Community":
							dGet('wtw_modebuilding').src = "/content/system/images/menucommunities32.png";
							break;
						default:
							dGet('wtw_modebuilding').src = "/content/system/images/menubuildings32.png";
							break;
					}
					dGet('wtw_modebuilding').onclick = function() {
						var returnpath = window.location.href;
						if (closestwebid != '') {
							window.location.href = '/admin.php?' + closestwebtype.toLowerCase() + 'id=' + closestwebid + '&returnpath=' + returnpath;
						} else {
							window.location.href = '/admin.php';
						}
					}
					WTW.showInline('wtw_modebuilding');
				} else if (WTW.adminView == 1) {
					dGet('wtw_modebuilding').src = "/content/system/images/menuedit32.png";
					var returnpath = '';
					if (dGet('wtw_returnpath') != null) {
						returnpath = dGet('wtw_returnpath').value;
					}
					if (returnpath != '') {
						dGet('wtw_modebuilding').alt = "Return to 3D Website";
						dGet('wtw_modebuilding').title = "Return to 3D Website";
					} else {
						dGet('wtw_modebuilding').alt = "View " + closestwebtype;
						dGet('wtw_modebuilding').title = "View " + closestwebtype;
					}
					dGet('wtw_modebuilding').onclick = function() {
						var sreturnpath = '';
						if (dGet('wtw_returnpath') != null) {
							sreturnpath = dGet('wtw_returnpath').value;
						}
						if (sreturnpath != '') {
							window.location.href = sreturnpath;
						} else if (closestwebid != '') {
							window.location.href = '/' + closestwebtype.toLowerCase() + '/' + closestwebid;
						} else {
							window.location.href = '/';
						}
					}
					WTW.showInline('wtw_modebuilding');
				} else {
					WTW.hide('wtw_modebuilding');
				}
			}
			if (WTW.editCommunityAccess != undefined) {
				if (WTW.adminView == 0 && communityid != '' && WTW.editCommunityAccess.indexOf(dGet('wtw_tuserid').value) > -1 && dGet('wtw_tuserid').value != '') {
					if (dGet('wtw_showcommunityname') != null) {
						dGet('wtw_showcommunityname').innerHTML = WTW.communityName;
						dGet('wtw_showcommunityname').style.cursor = 'pointer';
					}
					dGet('wtw_modecommunity').alt = "Edit Community";
					dGet('wtw_modecommunity').title = "Edit Community";
					dGet('wtw_modecommunity').src = "/content/system/images/menucommunities32.png";
					dGet('wtw_modecommunity').onclick = function() {
						var returnpath = window.location.href;
						if (closestwebid != '') {
							window.location.href = '/admin.php?communityid=' + communityid + '&returnpath=' + returnpath;
						} else {
							window.location.href = '/admin.php';
						}
					}
					WTW.showInline('wtw_modecommunity');		
				} else if (WTW.adminView == 1 && communityid != '') {
					if (dGet('wtw_showcommunityname') != null) {
						dGet('wtw_showcommunityname').innerHTML = WTW.communityName;
						dGet('wtw_showcommunityname').style.cursor = 'pointer';
					}
					dGet('wtw_modecommunity').src = "/content/system/images/menuedit32.png";
					var returnpath = '';
					if (dGet('wtw_returnpath') != null) {
						returnpath = dGet('wtw_returnpath').value;
					}
					if (returnpath != '') {
						dGet('wtw_modecommunity').alt = "Return to 3D Website";
						dGet('wtw_modecommunity').title = "Return to 3D Website";
					} else {
						dGet('wtw_modecommunity').alt = "View 3D Community";
						dGet('wtw_modecommunity').title = "View  3D Community";
					}
					dGet('wtw_modecommunity').onclick = function() {
						var sreturnpath = '';
						if (dGet('wtw_returnpath') != null) {
							sreturnpath = dGet('wtw_returnpath').value;
						}
						if (sreturnpath != '') {
							window.location.href = sreturnpath;
						} else if (communityid != '') {
							window.location.href = '/' + communityid;
						} else {
							window.location.href = '/';
						}
					}
					WTW.showInline('wtw_modecommunity');
				} else {
					WTW.hide('wtw_modecommunity');
				}
			}
			WTW.browseUserID = dGet('wtw_tuserid').value;
			WTW.browseWebID = closestwebid;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_core.js-setClosestBuilding=" + ex.message);
	}
}

WTWJS.prototype.moveAvatar = function(zavatar, zkeyspressed) {
	try {//active
		if (zavatar == undefined) {
			zavatar = WTW.myAvatar;
		}
		if (zkeyspressed == undefined) {
			zkeyspressed = WTW.keysPressed;
		}
		if (WTW.animationSet == undefined || WTW.animationSet == null) {
			WTW.animationSet = '';
		}
		if (zavatar != null && WTW.cameraFocus == 1) {
			zavatar.rotation.x = 0;
			zavatar.rotation.z = 0;
			var increment = .10;
			var zactivecount = 0;
			var zmoveevents = [];
			if (zavatar.WTW != null) {
				if (zavatar.WTW.animations != null) {
					if (zavatar.WTW.animations.running != null) {
						WTW.resetActiveAnimations(zavatar);
						if (zkeyspressed != null) {
							for (var k=0;k < zkeyspressed.length;k++) {
								if (zkeyspressed[k] != null) {
									if (WTW.isNumeric(zkeyspressed[k])) {
										let zanim = '';
										switch (zkeyspressed[k]) {
											case 32: //space jump
												let zonwalk = false;
												let zonrun = false;
												if (zavatar.WTW.animations.running[WTW.checkAnimationSet(zavatar, 'onwalk', WTW.animationSet)] != undefined) {
													if (zavatar.WTW.animations.running[WTW.checkAnimationSet(zavatar, 'onwalk', WTW.animationSet)].active == 1) {
														zonwalk = true;
													}
												}
												if (zavatar.WTW.animations.running[WTW.checkAnimationSet(zavatar, 'onrun', WTW.animationSet)] != undefined) {
													if (zavatar.WTW.animations.running[WTW.checkAnimationSet(zavatar, 'onrun', WTW.animationSet)].active == 1) {
														zonrun = true;
													}
												}
												if (zonwalk) {
													zanim = WTW.checkAnimationSet(zavatar, 'onwalkjump', WTW.animationSet);
													if (zavatar.WTW.animations.running[zanim] != undefined) {
														zavatar.WTW.animations.running[zanim].active = 1;
													}
													zanim = '';
													zactivecount += 1;
												} else if (zonrun) {
													zanim = WTW.checkAnimationSet(zavatar, 'onrunjump', WTW.animationSet);
													if (zavatar.WTW.animations.running[zanim] != undefined) {
														zavatar.WTW.animations.running[zanim].active = 1;
													}
													zanim = '';
													zactivecount += 1;
												} else {
													zanim = WTW.checkAnimationSet(zavatar, 'onjump', WTW.animationSet);
												}
												break;
											case 38: //arrow w forward
											case 87: //w forward
												let zonjump = false;
												if (zavatar.WTW.animations.running[WTW.checkAnimationSet(zavatar, 'onjump', WTW.animationSet)] != undefined) {
													if (zavatar.WTW.animations.running[WTW.checkAnimationSet(zavatar, 'onjump', WTW.animationSet)].active == 1) {
														zonjump = true;
													}
												}
												if (zonjump) {
													if (WTW.shiftKey) {
														zanim = WTW.checkAnimationSet(zavatar, 'onrunjump', WTW.animationSet);
													} else {
														zanim = WTW.checkAnimationSet(zavatar, 'onwalkjump', WTW.animationSet);
													}
													if (zavatar.WTW.animations.running[zanim] != undefined) {
														zavatar.WTW.animations.running[zanim].active = 1;
													}
													zanim = '';
													zactivecount += 1;
												} else {
													if (WTW.shiftKey) {
														zanim = WTW.checkAnimationSet(zavatar, 'onrun', WTW.animationSet);
													} else {
														zanim = WTW.checkAnimationSet(zavatar, 'onwalk', WTW.animationSet);
													}
												}
												break;
											case 1038: //arrow w forward
												zanim = WTW.checkAnimationSet(zavatar, 'onwalk', WTW.animationSet);
												break;
											case 2038: //arrow w forward
												zanim = WTW.checkAnimationSet(zavatar, 'onrun', WTW.animationSet);
												break;
											case 40: //arrow s backwards
											case 83: //s backwards
												if (WTW.shiftKey) {
													zanim = WTW.checkAnimationSet(zavatar, 'onrunbackwards', WTW.animationSet);
												} else {
													zanim = WTW.checkAnimationSet(zavatar, 'onwalkbackwards', WTW.animationSet);
												}
												break;
											case 1040: //arrow s backwards
												zanim = WTW.checkAnimationSet(zavatar, 'onwalkbackwards', WTW.animationSet);
												break;
											case 2040: //arrow s backwards
												zanim = WTW.checkAnimationSet(zavatar, 'onrunbackwards', WTW.animationSet);
												break;
											case 37: //arrow q rotate left
											case 81: //q rotate left
												if (WTW.shiftKey) {
													zanim = WTW.checkAnimationSet(zavatar, 'onrunturnleft', WTW.animationSet);
												} else {
													zanim = WTW.checkAnimationSet(zavatar, 'onturnleft', WTW.animationSet);
												}
												break;
											case 1037: //mouse rotate left
												zanim = WTW.checkAnimationSet(zavatar, 'onturnleft', WTW.animationSet);
												break;
											case 2037: //mouse rotate left
												zanim = WTW.checkAnimationSet(zavatar, 'onrunturnleft', WTW.animationSet);
												break;
											case 39: //arrow e rotate right
											case 69: //e rotate right
												if (WTW.shiftKey) {
													zanim = WTW.checkAnimationSet(zavatar, 'onrunturnright', WTW.animationSet);
												} else {
													zanim = WTW.checkAnimationSet(zavatar, 'onturnright', WTW.animationSet);
												}
												break;
											case 1039: //mouse rotate right
												zanim = WTW.checkAnimationSet(zavatar, 'onturnright', WTW.animationSet);
												break;
											case 2039: //mouse rotate right
												zanim = WTW.checkAnimationSet(zavatar, 'onrunturnright', WTW.animationSet);
												break;
											case 65: //a strafe left
											case 1065: //mouse strafe left
												if (WTW.shiftKey) {
													zanim = WTW.checkAnimationSet(zavatar, 'onrunstrafeleft', WTW.animationSet);
												} else {
													zanim = WTW.checkAnimationSet(zavatar, 'onstrafeleft', WTW.animationSet);
												}
												break;
											case 2065: //mouse strafe left
												zanim = WTW.checkAnimationSet(zavatar, 'onrunstrafeleft', WTW.animationSet);
												break;
											case 68: //d strafe right
											case 1068: //mouse strafe right
												if (WTW.shiftKey) {
													zanim = WTW.checkAnimationSet(zavatar, 'onrunstraferight', WTW.animationSet);
												} else {
													zanim = WTW.checkAnimationSet(zavatar, 'onstraferight', WTW.animationSet);
												}
												break;
											case 2068: //mouse strafe right
												zanim = WTW.checkAnimationSet(zavatar, 'onrunstraferight', WTW.animationSet);
												break;
											case 82: //r rotate up
											case 1082: //mouse rotate up
												zanim = WTW.checkAnimationSet(zavatar, 'onrotateup', WTW.animationSet);
												break;
											case 70: //f rotate down
											case 1070: //mouse rotate down
												zanim = WTW.checkAnimationSet(zavatar, 'onrotatedown', WTW.animationSet);
												break;
											case 0: //pause animation
												zanim = WTW.checkAnimationSet(zavatar, 'onpause', WTW.animationSet);
												break;
											case 3001: //sit wait
												zanim = WTW.checkAnimationSet(zavatar, 'onsitwait', WTW.animationSet);
												break;
										} 
										if (zanim != '') {
											if (zavatar.WTW.animations.running[zanim] != undefined) {
												zavatar.WTW.animations.running[zanim].active = 1;
											}
											zanim = '';
											zactivecount += 1;
										}
									} else {
										zanim = WTW.checkAnimationSet(zavatar, zkeyspressed[k], WTW.animationSet);
										if (zavatar.WTW.animations.running[zanim] != undefined) {
											zavatar.WTW.animations.running[zanim].active = 1;
										}
										zactivecount += 1;
									}
								}
							}
						}
						if (zkeyspressed.length == 0) {
							zanim = WTW.checkAnimationSet(zavatar, 'onwait', WTW.animationSet);
							if (zavatar.WTW.animations.running[zanim] != undefined) {
								zavatar.WTW.animations.running[zanim].active = 1;
							}
							zactivecount += 1;
						}

						/* set the weight for each animation running */
						var zweight = 0;
						if (zavatar.WTW.animations.running['onwait'] != undefined) {
							if (zavatar.WTW.animations.running['onwait'].active == 0) {
								zavatar.WTW.animations.running['onwait'].weight = 0;
							}
						}
						if (zavatar.WTW.animations.running['onwalkjump'] != undefined) {
							if (zavatar.WTW.animations.running['onwalkjump'].active == 1) {
								// clear other weights
								zavatar.WTW.animations.running['onwalkjump'].weight = 1;
							}
						}
						if (zavatar.WTW.animations.running['onrunjump'] != undefined) {
							if (zavatar.WTW.animations.running['onrunjump'].active == 1) {
								// clear other weights
								zavatar.WTW.animations.running['onrunjump'].weight = 1;
							}
						}
						for(var key in zavatar.WTW.animations.running) {
							if (zavatar.WTW.animations.running[key] != undefined) {
								if (zavatar.WTW.animations.running[key].active == 0) {
									if (zavatar.WTW.animations.running[key].weight > 0) {
										zavatar.WTW.animations.running[key].weight -= increment;
									} else {
										zavatar.WTW.animations.running[key].weight = 0;
									}
								} else {
									if (zavatar.WTW.animations.running[key].weight < (1/zactivecount)) {
										if (zavatar.WTW.animations.running[key].weight + increment > (1/zactivecount)) {
											zavatar.WTW.animations.running[key].weight = (1/zactivecount);
										} else {
											zavatar.WTW.animations.running[key].weight += increment;
										}
									} else {
										if (zavatar.WTW.animations.running[key].weight - increment < (1/zactivecount)) {
											zavatar.WTW.animations.running[key].weight = (1/zactivecount);
										} else {
											zavatar.WTW.animations.running[key].weight -= increment;
										}
									}
								}
								zmoveevents[zmoveevents.length] = {
									'key':key,
									'weight':zavatar.WTW.animations.running[key].weight,
									'active':zavatar.WTW.animations.running[key].active
								}
								zweight += zavatar.WTW.animations.running[key].weight;
								if (zavatar.WTW.animations.running[key].weight > 0) {
									/* sets movement based on weight, move settings, and framerate */
									switch (key) {
										case 'onwait':
											var zstride = WTW.init.gravity * 15 * zavatar.WTW.animations.running[key].weight / WTW.fps;
											var zmove = WTW.getMoveDownVector(zavatar.name, -zstride);
											zavatar.moveWithCollisions(zmove);
											break;
										case 'onrotateup':
											WTW.cameraYOffset -= 200/(WTW.sizeY - WTW.mouseStartY + WTW.mouseY);
											if (WTW.cameraYOffset < -10) {
												WTW.cameraYOffset = -10; // -4
											}
											zweight -= zavatar.WTW.animations.running[key].weight;
											break;
										case 'onrotatedown':
											WTW.cameraYOffset += 200/(WTW.sizeY - WTW.mouseY + WTW.mouseStartY);
											if (WTW.cameraYOffset > 20) {
												WTW.cameraYOffset = 20;
											}
											zweight -= zavatar.WTW.animations.running[key].weight;
											break;
										case 'onwalk':
											if (WTW.moveOverride == 0) {
												var zstride = 15 * zavatar.WTW.animations.running[key].weight * WTW.walkSpeed / WTW.fps;
												zavatar.WTW.animations.running[key].speedRatio = WTW.walkAnimationSpeed;
												var move = WTW.getMoveVector(zavatar.name, 0, zstride);
												zavatar.moveWithCollisions(move);
											}
											break;
										case 'onwalkjump':	
											var zstride = 15 * zavatar.WTW.animations.running[key].weight * WTW.walkSpeed / WTW.fps;
											zavatar.WTW.animations.running[key].speedRatio = WTW.walkAnimationSpeed;
											var move = WTW.getMoveVector(zavatar.name, 0, zstride);
											zavatar.moveWithCollisions(move);
											break;
										case 'onrun':
											if (WTW.moveOverride == 0) {
												var zstride = 25 * zavatar.WTW.animations.running[key].weight * WTW.walkSpeed / WTW.fps;
												zavatar.WTW.animations.running[key].speedRatio = WTW.walkAnimationSpeed;
												var move = WTW.getMoveVector(zavatar.name, 0, zstride);
												zavatar.moveWithCollisions(move);
											}
											break;
										case 'onrunjump':
											var zstride = 25 * zavatar.WTW.animations.running[key].weight * WTW.walkSpeed / WTW.fps;
											zavatar.WTW.animations.running[key].speedRatio = WTW.walkAnimationSpeed;
											var move = WTW.getMoveVector(zavatar.name, 0, zstride);
											zavatar.moveWithCollisions(move);
											break;
										case 'onwalkbackwards':
											if (WTW.moveOverride == 0) {
												var zstride = 10 * zavatar.WTW.animations.running[key].weight * WTW.walkSpeed / WTW.fps;
												zavatar.WTW.animations.running[key].speedRatio = WTW.walkAnimationSpeed;
												var move = WTW.getMoveVector(zavatar.name, 180, zstride);
												zavatar.moveWithCollisions(move);
											}
											break;
										case 'onrunbackwards':
											if (WTW.moveOverride == 0) {
												var zstride = 25 * zavatar.WTW.animations.running[key].weight * WTW.walkSpeed / WTW.fps;
												zavatar.WTW.animations.running[key].speedRatio = WTW.walkAnimationSpeed;
												var move = WTW.getMoveVector(zavatar.name, 180, zstride);
												zavatar.moveWithCollisions(move);
											}
											break;
										case 'onturnleft':
											if (WTW.moveOverride == 0) {
												zavatar.rotation.y -= WTW.getRadians(70 * zavatar.WTW.animations.running[key].weight * WTW.turnSpeed / WTW.fps);
												zavatar.WTW.animations.running[key].speedRatio = WTW.turnAnimationSpeed;
											}
											break;
										case 'onrunturnleft':
											if (WTW.moveOverride == 0) {
												zavatar.rotation.y -= WTW.getRadians(120 * zavatar.WTW.animations.running[key].weight * WTW.turnSpeed / WTW.fps);
												zavatar.WTW.animations.running[key].speedRatio = WTW.turnAnimationSpeed * 1.5;
											}
											break;
										case 'onturnright':
											if (WTW.moveOverride == 0) {
												zavatar.rotation.y += WTW.getRadians(70 * zavatar.WTW.animations.running[key].weight * WTW.turnSpeed / WTW.fps);
												zavatar.WTW.animations.running[key].speedRatio = WTW.turnAnimationSpeed;
											}
											break;
										case 'onrunturnright':
											if (WTW.moveOverride == 0) {
												zavatar.rotation.y += WTW.getRadians(120 * zavatar.WTW.animations.running[key].weight * WTW.turnSpeed / WTW.fps);
												zavatar.WTW.animations.running[key].speedRatio = WTW.turnAnimationSpeed * 1.5;
											}
											break;
										case 'onstrafeleft':
											if (WTW.moveOverride == 0) {
												var zstride = 4 * zavatar.WTW.animations.running[key].weight * WTW.walkSpeed / WTW.fps;
												zavatar.WTW.animations.running[key].speedRatio = WTW.walkAnimationSpeed;
												var move = WTW.getMoveVector(zavatar.name, -90, zstride);
												zavatar.moveWithCollisions(move);
											}
											break;
										case 'onrunstrafeleft':
											if (WTW.moveOverride == 0) {
												var zstride = 8 * zavatar.WTW.animations.running[key].weight * WTW.walkSpeed / WTW.fps;
												zavatar.WTW.animations.running[key].speedRatio = WTW.walkAnimationSpeed;
												var move = WTW.getMoveVector(zavatar.name, -90, zstride);
												zavatar.moveWithCollisions(move);
											}
											break;
										case 'onstraferight':
											if (WTW.moveOverride == 0) {
												var zstride = 4 * zavatar.WTW.animations.running[key].weight * WTW.walkSpeed / WTW.fps;
												zavatar.WTW.animations.running[key].speedRatio = WTW.walkAnimationSpeed;
												var move = WTW.getMoveVector(zavatar.name, 90, zstride);
												zavatar.moveWithCollisions(move);
											}
											break;
										case 'onrunstraferight':
											if (WTW.moveOverride == 0) {
												var zstride = 8 * zavatar.WTW.animations.running[key].weight * WTW.walkSpeed / WTW.fps;
												zavatar.WTW.animations.running[key].speedRatio = WTW.walkAnimationSpeed;
												var move = WTW.getMoveVector(zavatar.name, 90, zstride);
												zavatar.moveWithCollisions(move);
											}
											break;
										default:
											zweight = WTW.pluginsSetAvatarMovement(zavatar, key, zweight);
											break;
									}
									WTW.setMovingCameras(zavatar);
								}
							}
						}
						if (zweight < 1) {
							let zanimset = WTW.checkAnimationSet(zavatar, 'onwait', WTW.animationSet);
							if (zavatar.WTW.animations.running[zanimset] != null) {
								zavatar.WTW.animations.running[zanimset].weight += (1-zweight);
								zmoveevents = WTW.setMovementEventsKey(zmoveevents, zanimset, zavatar.WTW.animations.running[zanimset].weight);
							}
						}
					}
				}
			}
			WTW.pluginsMoveAvatar(zavatar, zmoveevents);
		} 
	} catch(ex) {
		WTW.log("core-scripts-prime-wtw_core.js-moveAvatar=" + ex.message);
	}
}

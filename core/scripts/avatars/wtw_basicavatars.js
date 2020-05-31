WTWJS.prototype.addAvatarPlaceholder = function(zavatarname, zavatardef) {
	/* creates a placeholder for the current user - before they select an avatar */
	var zavatar = null;
	try {
		/* validate values from the avatar definition file */
		var zpositionx = 0;
		var zpositiony = 0;
		var zpositionz = 0;
		var zscalingx = 1;
		var zscalingy = 1;
		var zscalingz = 1;
		var zrotationx = 0;
		var zrotationy = 0;
		var zrotationz = 0;
		if (zavatardef.position.x != undefined) {
			if (WTW.isNumeric(zavatardef.position.x)) {
				zpositionx = Number(zavatardef.position.x);
			}
		}
		if (zavatardef.position.y != undefined) {
			if (WTW.isNumeric(zavatardef.position.y)) {
				zpositiony = Number(zavatardef.position.y);
			}
		}
		if (zavatardef.position.z != undefined) {
			if (WTW.isNumeric(zavatardef.position.z)) {
				zpositionz = Number(zavatardef.position.z);
			}
		}
		if (zavatardef.scaling.x != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.x)) {
				zscalingx = Number(zavatardef.scaling.x);
			}
		}
		if (zavatardef.scaling.y != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.y)) {
				zscalingy = Number(zavatardef.scaling.y);
			}
		}
		if (zavatardef.scaling.z != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.z)) {
				zscalingz = Number(zavatardef.scaling.z);
			}
		} 
		if (zavatardef.rotation.x != undefined) {
			if (WTW.isNumeric(zavatardef.rotation.x)) {
				zrotationx = Number(zavatardef.rotation.x);
			}
		}
		if (zavatardef.rotation.y != undefined) {
			if (WTW.isNumeric(zavatardef.rotation.y)) {
				zrotationy = Number(zavatardef.rotation.y);
			}
		}
		if (zavatardef.rotation.z != undefined) {
			if (WTW.isNumeric(zavatardef.rotation.z)) {
				zrotationz = Number(zavatardef.rotation.z);
			}
		}
		/* create the base avatar hidden boxes used to scale and parent various items - and give focus points for cameras */
		zavatardef.parentname = WTW.mainParent;
		/* this is the box for the avatar position and is the parent object of the avatar */
		zavatar = scene.getMeshByID(zavatarname);
		if (zavatar == null) {
			zavatar = BABYLON.MeshBuilder.CreateBox(zavatarname, {}, scene);
			zavatar.material = WTW.addCovering("hidden", zavatarname, zavatardef, 1, 1, 1, "0", "0");
			zavatar.material.alpha = 0;
			zavatar.applyGravity = true;
			zavatar.showBoundingBox = false;
			zavatar.ellipsoid = new BABYLON.Vector3(3, 8, 3);
			zavatar.ellipsoidOffset = new BABYLON.Vector3(0, 8, 0);
			zavatar.checkCollisions = true;
			zavatar.isPickable = false;
			zavatar.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			zavatar.rotation = new BABYLON.Vector3(WTW.getRadians(zrotationx), WTW.getRadians(zrotationy), WTW.getRadians(zrotationz));
		}
		zavatar.WTW = zavatardef;
		
		/* this box is the parent of the meshes - used for applying the scale your avatar */
		var zavatarscale = scene.getMeshByID(zavatarname + '-scale');
		if (zavatarscale == null) {
			zavatarscale = BABYLON.MeshBuilder.CreateBox(zavatarname + '-scale', {}, scene);
			zavatarscale.material = WTW.addCovering("hidden", zavatarname + '-scale', zavatardef, 1, 1, 1, "0", "0");
			zavatarscale.material.alpha = 0;
			zavatarscale.isPickable = false;
			zavatarscale.parent = zavatar;
			zavatarscale.scaling = new BABYLON.Vector3(zscalingx, zscalingy, zscalingz);
			zavatarscale.rotation.y = WTW.getRadians(-90);
		}
		
		/* this box is the parent of the meshes during a transition to a new avatar */
		/* used for applying the scale your old avatar while the new one is downloading and rendering */
		var zavatarscaleold = scene.getMeshByID(zavatarname + '-scaleold');
		if (zavatarscaleold == null) {
			zavatarscaleold = BABYLON.MeshBuilder.CreateBox(zavatarname + '-scaleold', {}, scene);
			zavatarscaleold.material = WTW.addCovering("hidden", zavatarname + '-scaleold', zavatardef, 1, 1, 1, "0", "0");
			zavatarscaleold.material.alpha = 0;
			zavatarscaleold.isPickable = false;
			zavatarscaleold.parent = zavatar;
			zavatarscaleold.scaling = new BABYLON.Vector3(zscalingx, zscalingy, zscalingz);
			zavatarscaleold.rotation.y = WTW.getRadians(-90);
		}
		
		/* this box is the parent to the cameras as needed */
		var zavatarcamera = scene.getMeshByID(zavatarname + "-camera");
		if (zavatarcamera == null) {
			zavatarcamera = BABYLON.MeshBuilder.CreateBox(zavatarname + "-camera", {}, scene);
			zavatarcamera.material = WTW.addCovering("hidden", zavatarname, zavatardef, 1, 1, 1, "0", "0");
			zavatarcamera.material.alpha = 0;
			zavatarcamera.parent = zavatar;
			zavatarcamera.position.y = 12;
			zavatarcamera.rotation.y = WTW.getRadians(-90);
		}
		
		/* this box is the center mass and used as a target for selfie cameras */
		var zavatarcenter = scene.getMeshByID(zavatarname + "-center");
		if (zavatarcenter == null) {
			zavatarcenter = BABYLON.MeshBuilder.CreateBox(zavatarname + "-center", {}, scene);
			zavatarcenter.material = WTW.addCovering("hidden", zavatarname, zavatardef, 1, 1, 1, "0", "0");
			zavatarcenter.material.alpha = 0;
			zavatarcenter.parent = zavatar;
			zavatarcenter.position.y = 12;
			zavatarcenter.rotation.y = WTW.getRadians(-90);
		}
		zavatar.isVisible = false;
		zavatarscale.isVisible = false;
		zavatarcamera.isVisible = false;
		zavatarcenter.isVisible = false;
		
		/* the following boxes will be attached to various skeleton bones for easy parenting to the animated avatar */
		/* headtop box parents to top of head */
		var zheadtop = scene.getMeshByID(zavatarname + "-headtop");
		if (zheadtop == null) {
			zheadtop = BABYLON.MeshBuilder.CreateBox(zavatarname + "-headtop", {}, scene);
			zheadtop.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
			zheadtop.material = covering = new BABYLON.StandardMaterial("mat" + zavatarname + '-headtop', scene);
			zheadtop.material.alpha = 0;
			zheadtop.isPickable = true;
			zheadtop.parent = zavatar;
			zheadtop.position.x = 0;
			zheadtop.position.y = 1;
			zheadtop.position.z = 0;
		}
		/* chest box parents to chest for carrying 3d objects in front or on back */
		var zchest = scene.getMeshByID(zavatarname + "-chest");
		if (zchest == null) {
			zchest = BABYLON.MeshBuilder.CreateBox(zavatarname + "-chest", {}, scene);
			zchest.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
			zchest.material = covering = new BABYLON.StandardMaterial("mat" + zavatarname + '-chest', scene);
			zchest.material.alpha = 0;
			zchest.isPickable = true;
			zchest.parent = zavatar;
			zchest.position.x = 1;
			zchest.position.y = .5;
			zchest.position.z = 0;
		}
		/* right hand parents to right hand while in t-pose direction */
		var zrighthand = scene.getMeshByID(zavatarname + "-righthand");
		if (zrighthand == null) {
			zrighthand = BABYLON.MeshBuilder.CreateBox(zavatarname + "-righthand", {}, scene);
			zrighthand.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
			zrighthand.material = covering = new BABYLON.StandardMaterial("mat" + zavatarname + '-righthand', scene);
			zrighthand.material.alpha = 0;
			zrighthand.isPickable = true;
			zrighthand.parent = zavatar;
			zrighthand.position.x = 1;
			zrighthand.position.y = .5;
			zrighthand.position.z = 1;
		}
		/* left hand parents to left hand while in t-pose direction */
		var zlefthand = scene.getMeshByID(zavatarname + "-lefthand");
		if (zlefthand == null) {
			zlefthand = BABYLON.MeshBuilder.CreateBox(zavatarname + "-lefthand", {}, scene);
			zlefthand.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
			zlefthand.material = covering = new BABYLON.StandardMaterial("mat" + zavatarname + '-lefthand', scene);
			zlefthand.material.alpha = 0;
			zlefthand.isPickable = true;
			zlefthand.parent = zavatar;
			zlefthand.position.x = 1;
			zlefthand.position.y = .5;
			zlefthand.position.z = -1;
		}
		/* right hip parents to top right leg */
		var zrighthip = scene.getMeshByID(zavatarname + "-righthip");
		if (zrighthip == null) {
			zrighthip = BABYLON.MeshBuilder.CreateBox(zavatarname + "-righthip", {}, scene);
			zrighthip.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
			zrighthip.material = covering = new BABYLON.StandardMaterial("mat" + zavatarname + '-righthip', scene);
			zrighthip.material.alpha = 0;
			zrighthip.isPickable = true;
			zrighthip.parent = zavatar;
			zrighthip.position.x = 0;
			zrighthip.position.y = .5;
			zrighthip.position.z = 1.5;
		}
		/* left hip parents to top left leg */
		var zlefthip = scene.getMeshByID(zavatarname + "-lefthip");
		if (zlefthip == null) {
			zlefthip = BABYLON.MeshBuilder.CreateBox(zavatarname + "-lefthip", {}, scene);
			zlefthip.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
			zlefthip.material = covering = new BABYLON.StandardMaterial("mat" + zavatarname + '-lefthip', scene);
			zlefthip.material.alpha = 0;
			zlefthip.isPickable = true;
			zlefthip.parent = zavatar;
			zlefthip.position.x = 0;
			zlefthip.position.y = .5;
			zlefthip.position.z = -1.5;
		}
		/* right foot parents to right foot */
		var zrightfoot = scene.getMeshByID(zavatarname + "-rightfoot");
		if (zrightfoot == null) {
			zrightfoot = BABYLON.MeshBuilder.CreateBox(zavatarname + "-rightfoot", {}, scene);
			zrightfoot.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
			zrightfoot.material = covering = new BABYLON.StandardMaterial("mat" + zavatarname + '-rightfoot', scene);
			zrightfoot.material.alpha = 0;
			zrightfoot.isPickable = true;
			zrightfoot.parent = zavatar;
			zrightfoot.position.x = 0;
			zrightfoot.position.y = .25;
			zrightfoot.position.z = .5;
		}
		/* left foot parents to left foot */
		var zleftfoot = scene.getMeshByID(zavatarname + "-leftfoot");
		if (zleftfoot == null) {
			zleftfoot = BABYLON.MeshBuilder.CreateBox(zavatarname + "-leftfoot", {}, scene);
			zleftfoot.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
			zleftfoot.material = covering = new BABYLON.StandardMaterial("mat" + zavatarname + '-leftfoot', scene);
			zleftfoot.material.alpha = 0;
			zleftfoot.isPickable = true;
			zleftfoot.parent = zavatar;
			zleftfoot.position.x = 0;
			zleftfoot.position.y = .25;
			zleftfoot.position.z = -.5;
		}
	} catch (ex) {
		WTW.log("core-scripts-avatars-basicavatars\r\n addAvatarPlaceholder=" + ex.message);
	}
	return zavatar;
}

WTWJS.prototype.addAvatar3DObject = function(zavatarname, zavatardef) {
	/* create an avatar from an avatar definition file - see /core/scripts/prime/wtw_objectdefinitions.js file for avatar def format */
	var zavatar = null;
	try {
		/* validate values form the avatar definition file */
		var zpositionx = 0;
		var zpositiony = 0;
		var zpositionz = 0;
		var zscalingx = 1;
		var zscalingy = 1;
		var zscalingz = 1;
		var zrotationx = 0;
		var zrotationy = 0;
		var zrotationz = 0;
		if (zavatardef.position.x != undefined) {
			if (WTW.isNumeric(zavatardef.position.x)) {
				zpositionx = Number(zavatardef.position.x);
			}
		}
		if (zavatardef.position.y != undefined) {
			if (WTW.isNumeric(zavatardef.position.y)) {
				zpositiony = Number(zavatardef.position.y);
			}
		}
		if (zavatardef.position.z != undefined) {
			if (WTW.isNumeric(zavatardef.position.z)) {
				zpositionz = Number(zavatardef.position.z);
			}
		}
		if (zavatardef.scaling.x != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.x)) {
				zscalingx = Number(zavatardef.scaling.x);
			}
		}
		if (zavatardef.scaling.y != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.y)) {
				zscalingy = Number(zavatardef.scaling.y);
			}
		}
		if (zavatardef.scaling.z != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.z)) {
				zscalingz = Number(zavatardef.scaling.z);
			}
		} 
		if (zavatardef.rotation.x != undefined) {
			if (WTW.isNumeric(zavatardef.rotation.x)) {
				zrotationx = Number(zavatardef.rotation.x);
			}
		}
		if (zavatardef.rotation.y != undefined) {
			if (WTW.isNumeric(zavatardef.rotation.y)) {
				zrotationy = Number(zavatardef.rotation.y);
			}
		}
		if (zavatardef.rotation.z != undefined) {
			if (WTW.isNumeric(zavatardef.rotation.z)) {
				zrotationz = Number(zavatardef.rotation.z);
			}
		}
		/* create the base avatar hidden boxes used to scale and parent various items - and give focus points for cameras */
		/* this is the box for the avatar position and is the parent object of the avatar */
		zavatar = scene.getMeshByID(zavatarname);
		if (zavatar == null) {
			zavatar = BABYLON.MeshBuilder.CreateBox(zavatarname, {}, scene);
			zavatar.material = WTW.addCovering("hidden", zavatarname, zavatardef, 1, 1, 1, "0", "0");
			zavatar.material.alpha = 0;
			zavatar.applyGravity = true;
			zavatar.showBoundingBox = false;
			zavatar.ellipsoid = new BABYLON.Vector3(3, 8, 3);
			zavatar.ellipsoidOffset = new BABYLON.Vector3(0, 8, 0);
			zavatar.checkCollisions = true;
			zavatar.isPickable = false;
			zavatar.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			zavatar.rotation = new BABYLON.Vector3(WTW.getRadians(zrotationx), WTW.getRadians(zrotationy), WTW.getRadians(zrotationz));
		}
		
		/* this box is the parent of the meshes - used for applying the scale your avatar */
		var zavatarscale = scene.getMeshByID(zavatarname + '-scale');
		if (zavatarscale == null) {
			zavatarscale = BABYLON.MeshBuilder.CreateBox(zavatarname + '-scale', {}, scene);
			zavatarscale.material = WTW.addCovering("hidden", zavatarname + '-scale', zavatardef, 1, 1, 1, "0", "0");
			zavatarscale.material.alpha = 0;
			zavatarscale.isPickable = false;
			zavatarscale.parent = zavatar;
			zavatarscale.scaling = new BABYLON.Vector3(zscalingx, zscalingy, zscalingz);
			zavatarscale.rotation.y = WTW.getRadians(-90);
		} else {
			zavatarscale.scaling = new BABYLON.Vector3(zscalingx, zscalingy, zscalingz);
		}
		
		/* this box is the parent of the meshes during a transition to a new avatar */
		/* used for applying the scale your old avatar while the new one is downloading and rendering */
		var zavatarscaleold = scene.getMeshByID(zavatarname + '-scaleold');
		if (zavatarscaleold == null) {
			zavatarscaleold = BABYLON.MeshBuilder.CreateBox(zavatarname + '-scaleold', {}, scene);
			zavatarscaleold.material = WTW.addCovering("hidden", zavatarname + '-scaleold', zavatardef, 1, 1, 1, "0", "0");
			zavatarscaleold.material.alpha = 0;
			zavatarscaleold.isPickable = false;
			zavatarscaleold.parent = zavatar;
			zavatarscaleold.scaling = new BABYLON.Vector3(zscalingx, zscalingy, zscalingz);
			zavatarscaleold.rotation.y = WTW.getRadians(-90);
		}
		
		/* this box is the parent to the cameras as needed */
		var zavatarcamera = scene.getMeshByID(zavatarname + "-camera");
		if (zavatarcamera == null) {
			zavatarcamera = BABYLON.MeshBuilder.CreateBox(zavatarname + "-camera", {}, scene);
			zavatarcamera.material = WTW.addCovering("hidden", zavatarname, zavatardef, 1, 1, 1, "0", "0");
			zavatarcamera.material.alpha = 0;
			zavatarcamera.parent = zavatar;
			zavatarcamera.position.y = 12;
			zavatarcamera.rotation.y = WTW.getRadians(-90);
		}
		
		/* this box is the center mass and used as a target for selfie cameras */
		var zavatarcenter = scene.getMeshByID(zavatarname + "-center");
		if (zavatarcenter == null) {
			zavatarcenter = BABYLON.MeshBuilder.CreateBox(zavatarname + "-center", {}, scene);
			zavatarcenter.material = WTW.addCovering("hidden", zavatarname, zavatardef, 1, 1, 1, "0", "0");
			zavatarcenter.material.alpha = 0;
			zavatarcenter.parent = zavatar;
			zavatarcenter.position.y = 12;
			zavatarcenter.rotation.y = WTW.getRadians(-90);
		}

		var zobjectanimations = null;
		var zobjectfolder = "/content/system/avatars/male/";
		var zobjectfile = "maleidle.babylon";
		var zavatarparts = [];
		var zavataranimationdefs = [];
		if (zavatardef.object.folder != undefined) {
			if (zavatardef.object.folder != '') {
				zobjectfolder = zavatardef.object.folder;
			}
		}
		if (zavatardef.object.file != undefined) {
			if (zavatardef.object.file != '') {
				zobjectfile = zavatardef.object.file;
			}
		}
		if (zavatardef.object.objectanimations != undefined) {
			zobjectanimations = zavatardef.object.objectanimations;
		}
		if (zavatardef.avatarparts != null) {
			if (zavatardef.avatarparts != undefined) {
				zavatarparts = zavatardef.avatarparts;
			}
		}
		if (zavatardef.avataranimationdefs != null) {
			if (zavatardef.avataranimationdefs != undefined) {
				zavataranimationdefs = zavatardef.avataranimationdefs;
			}
		}
		zavataranimationdefs = WTW.loadAvatarAnimationDefinitions(zavataranimationdefs);

		zavatar.WTW = zavatardef;
		/* make sure the base functions are defined - otherwise adds default for that avatar event */
		/* basic avatar animation events: (onwait, onwalk, onwalkbackwards, onturnleft, onturnright, onstrafeleft, onstraferight, onrun, onrunbackwards, onrunleft, onrunright, onrunstrafeleft, onrunstraferight) */
		zavatardef = WTW.pluginsAvatarBeforeCreate(zavatarname, zavatardef);

		BABYLON.SceneLoader.ImportMeshAsync("", zobjectfolder, zobjectfile, scene).then(
			function (results) {
				var zavatar = scene.getMeshByID(zavatarname);
				var zavatarparent = scene.getMeshByID(zavatarname + "-scale");
				if (zavatar != null) {
					if (results.meshes != null) {
						results.meshes[0].WTW = [];
						results.meshes[0].WTW.skeletons = null;
						for (var i=0; i < results.meshes.length; i++) {
							if (results.meshes[i] != null) {
								var zmesh = results.meshes[i];
								var zmeshname = results.meshes[i].name;
								var zchildmoldname = zavatarname + "-" + zmeshname;
								var zexistingmold = scene.getMeshByID(zchildmoldname);
								if (zexistingmold != null) {
									zexistingmold.dispose();
								}
								results.meshes[i].isPickable = true;
								results.meshes[i].name = zchildmoldname;
								results.meshes[i].id = zchildmoldname;
								results.meshes[i].isVisible = false;
								if (results.meshes[i].material != null) {
									if (results.meshes[i].material.alpha != undefined) {
										results.meshes[i].material.alpha = 1;
									}
									results.meshes[i].material.ambientColor = new BABYLON.Color3(.3, .3, .3);
									if (zavatarparts != null) {
										for (var j=0;j<zavatarparts.length;j++) {
											if (zavatarparts[j] != null) {
												var zavatarpart = zavatarparts[j].avatarpart;
												if (zavatarpart == zmeshname) {
													var zer = zavatarparts[j].emissivecolorr;
													var zeg = zavatarparts[j].emissivecolorg;
													var zeb = zavatarparts[j].emissivecolorb;
													results.meshes[i].material.emissiveColor = new BABYLON.Color3(zer,zeg,zeb);
													var zcovering = results.meshes[i].material;
													results.meshes[i].material.dispose();
													results.meshes[i].material = zcovering;
												}
											}
										}
									}
								}
								WTW.registerMouseOver(results.meshes[i]);
								if (results.meshes[i].parent == null) {
									results.meshes[i].parent = zavatarparent;
								}
								if (WTW.shadows != null) {
									WTW.shadows.getShadowMap().renderList.push(results.meshes[i]);
								}
								results.meshes[i].receiveShadows = true;
								if (i > 0) {
									results.meshes[i].WTW = [];
								}
								results.meshes[i].WTW.animations = [];
								if (zobjectanimations != null) {
									if (zobjectanimations != null) {
										for (var j=0; j < zobjectanimations.length;j++) {
											if (zobjectanimations[j] != null) {
												var moldnamepart = zobjectanimations[j].moldnamepart;
												if (moldnamepart == zmeshname) {
													var zmoldevent = zobjectanimations[j].moldevent;
													var zstartframe = Number(zobjectanimations[j].startframe);
													var zendframe = Number(zobjectanimations[j].endframe);
													var zanimationloop = false;
													var zspeedratio = Number(zobjectanimations[j].speedratio);
													if (zobjectanimations[j].animationloop+'' == '1') {
														zanimationloop = true;
													}
													if (zmoldevent == 'onload') {
														zanimationloop = false;
														if ((typeof zmesh.WTW.animations.onwait) != "undefined") {
															results.meshes[i].WTW.animations[zmoldevent] = scene.beginWeightedAnimation(zmesh, zstartframe, zendframe, 1, zanimationloop, zspeedratio, function() {zmesh.WTW.animations.onload.weight=0; zmesh.WTW.animations.onwait.weight=1;});
														} else {
															results.meshes[i].WTW.animations[zmoldevent] = scene.beginWeightedAnimation(zmesh, zstartframe, zendframe, 1, zanimationloop, zspeedratio);
														}
													} else {
														results.meshes[i].WTW.animations[zmoldevent] = scene.beginWeightedAnimation(zmesh, zstartframe, zendframe, 0, zanimationloop, zspeedratio);
													}
												}
												
											}
										}
										if ((typeof zmesh.WTW.animations.onload) == "undefined" && (typeof zmesh.WTW.animations.onwait) != "undefined") {
											zmesh.WTW.animations.onwait.weight=1;
										}
									}
								}
							}
						} 
					}
					if (results.skeletons != null)	{
						var zskeleton = results.meshes[0].skeleton;
						zavatar.WTW.skeleton = results.meshes[0].skeleton;
						for (var i=0; i < results.skeletons.length; i++) {
							if (results.skeletons[i] != null) {
								var zmeshname = results.skeletons[i].name;
								var zchildmoldname = zavatarname + "-" + zmeshname;
								results.skeletons[i].name = zchildmoldname;
								results.skeletons[i].id = zchildmoldname;
								WTW.registerMouseOver(results.skeletons[i]);
								if (results.skeletons[i].parent == null) {
									results.skeletons[i].scaling = new BABYLON.Vector3(zscalingx,zscalingy,zscalingz);
								}
								if (results.skeletons[i].bones != null) {
									/* the following boxes will be attached to various skeleton bones for easy parenting to the animated avatar */
									/* useful for carrying 3d objects */
									var zheadtopbone = -1;
									var zspine2bone = -1;
									var zrighthandbone = -1;
									var zlefthandbone = -1;
									var zrightlegbone = -1;
									var zleftlegbone = -1;
									var zrightfootbone = -1;
									var zleftfootbone = -1;
									for (var j=0; j < results.skeletons[i].bones.length; j++) {
										if (results.skeletons[i].bones[j] != null) {
											var zbonename = results.skeletons[i].bones[j].name.toLowerCase();
											if (zbonename.indexOf("headtop") > -1 && zheadtopbone == -1) {
												zheadtopbone = j;
											} else if (zbonename.indexOf("spine2") > -1 && zspine2bone == -1) {
												zspine2bone = j;
											} else if (zbonename.indexOf("righthand") > -1 && zrighthandbone == -1) {
												zrighthandbone = j;
											} else if (zbonename.indexOf("lefthand") > -1 && zlefthandbone == -1) {
												zlefthandbone = j;
											} else if (zbonename.indexOf("rightupleg") > -1 && zrightlegbone == -1) {
												zrightlegbone = j;
											} else if (zbonename.indexOf("leftupleg") > -1 && zleftlegbone == -1) {
												zleftlegbone = j;
											} else if (zbonename.indexOf("rightfoot") > -1 && zrightfootbone == -1) {
												zrightfootbone = j;
											} else if (zbonename.indexOf("leftfoot") > -1 && zleftfootbone == -1) {
												zleftfootbone = j;
											}
											if (j == 0) {
												results.skeletons[i].bones[j].parent = zavatarparent;
											} else {
												if (results.skeletons[i].bones[j].parent == null) {
													results.skeletons[i].bones[j].parent = results.skeletons[i].bones[0];
												}
											}
										}
									}
									if (zheadtopbone > -1) {
										/* headtop box parents to top of head */
										var zheadtop = BABYLON.MeshBuilder.CreateBox(zavatarname + "-headtop", {}, scene);
										zheadtop.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zheadtop.material = covering = new BABYLON.StandardMaterial("mat" + zavatarname + '-headtop', scene);
										zheadtop.material.alpha = 0;
										zheadtop.isPickable = true;
										zheadtop.attachToBone(results.skeletons[i].bones[zheadtopbone], results.meshes[0]);
										if (zavatarname == "myavatar-" + dGet("wtw_tinstanceid").value) {
											zavatarcamera.parent = zheadtop;
											zavatarcamera.position.y = 0;
											zavatarcamera.rotation.y = WTW.getRadians(0);
										}
									}
									if (zspine2bone > -1) {
										/* chest box parents to chest for carrying 3d objects in front or on back */
										var zchest = BABYLON.MeshBuilder.CreateBox(zavatarname + "-chest", {}, scene);
										zchest.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zchest.material = covering = new BABYLON.StandardMaterial("mat" + zavatarname + '-chest', scene);
										zchest.material.alpha = 0;
										zchest.isPickable = true;
										zchest.attachToBone(results.skeletons[i].bones[zspine2bone], results.meshes[0]);
									}
									if (zrighthandbone > -1) {
										/* right hand parents to right hand while in t-pose direction */
										var zrighthand = BABYLON.MeshBuilder.CreateBox(zavatarname + "-righthand", {}, scene);
										zrighthand.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zrighthand.material = covering = new BABYLON.StandardMaterial("mat" + zavatarname + '-righthand', scene);
										zrighthand.material.alpha = 0;
										zrighthand.isPickable = true;
										zrighthand.attachToBone(results.skeletons[i].bones[zrighthandbone], results.meshes[0]);
									}
									if (zlefthandbone > -1) {
										/* left hand parents to left hand while in t-pose direction */
										var zlefthand = BABYLON.MeshBuilder.CreateBox(zavatarname + "-lefthand", {}, scene);
										zlefthand.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zlefthand.material = covering = new BABYLON.StandardMaterial("mat" + zavatarname + '-lefthand', scene);
										zlefthand.material.alpha = 0;
										zlefthand.isPickable = true;
										zlefthand.attachToBone(results.skeletons[i].bones[zlefthandbone], results.meshes[0]);
									}
									if (zrightlegbone > -1) {
										/* right hip parents to top right leg */
										var zrighthip = BABYLON.MeshBuilder.CreateBox(zavatarname + "-righthip", {}, scene);
										zrighthip.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zrighthip.material = covering = new BABYLON.StandardMaterial("mat" + zavatarname + '-righthip', scene);
										zrighthip.material.alpha = 0;
										zrighthip.isPickable = true;
										zrighthip.attachToBone(results.skeletons[i].bones[zrightlegbone], results.meshes[0]);
									}
									if (zleftlegbone > -1) {
										/* left hip parents to top left leg */
										var zlefthip = BABYLON.MeshBuilder.CreateBox(zavatarname + "-lefthip", {}, scene);
										zlefthip.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zlefthip.material = covering = new BABYLON.StandardMaterial("mat" + zavatarname + '-lefthip', scene);
										zlefthip.material.alpha = 0;
										zlefthip.isPickable = true;
										zlefthip.attachToBone(results.skeletons[i].bones[zleftlegbone], results.meshes[0]);
									}
									if (zrightfootbone > -1) {
										/* right foot parents to right foot */
										var zrightfoot = BABYLON.MeshBuilder.CreateBox(zavatarname + "-rightfoot", {}, scene);
										zrightfoot.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zrightfoot.material = covering = new BABYLON.StandardMaterial("mat" + zavatarname + '-rightfoot', scene);
										zrightfoot.material.alpha = 0;
										zrightfoot.isPickable = true;
										zrightfoot.attachToBone(results.skeletons[i].bones[zrightfootbone], results.meshes[0]);
									}
									if (zleftfootbone > -1) {
										/* left foot parents to left foot */
										var zleftfoot = BABYLON.MeshBuilder.CreateBox(zavatarname + "-leftfoot", {}, scene);
										zleftfoot.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zleftfoot.material = covering = new BABYLON.StandardMaterial("mat" + zavatarname + '-leftfoot', scene);
										zleftfoot.material.alpha = 0;
										zleftfoot.isPickable = true;
										zleftfoot.attachToBone(results.skeletons[i].bones[zleftfootbone], results.meshes[0]);
									}
								}
								/* load the avatar animations - note that the idle onwait animation is already loaded with the initial avatar object */
								/* zavataranimationdefs is an array of animation definitions to be loaded index 0 is the idle onwait event */
								WTW.reloadAvatarAnimations(zavatarname, zavataranimationdefs);
							}
						}
					} 
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-avatars-basicavatars\r\n addAvatar3DObject=" + ex.message);
	}
	return zavatar;
}

WTWJS.prototype.addAvatarShark = function(avatarname, avatardef) {
	/* robo avatar as a shark - early test kept as template, may need to be retested with latest code before use */
	var avatar;
	try {
		var imageskinid = "v1n3kix1hb2ern02";
		var imageeyesid = "hhyd114h30sybrv4";
		avatar = scene.getMeshByID(avatarname);
		var tank = scene.getMeshByID(avatardef.parentname);
		var tailball = scene.getMeshByID(avatarname + "-tailball");
		var avatarshark = scene.getMeshByID(avatarname + "-avatarshark");
		if (avatar == null && tank != null) {
			var basicmold = WTW.newMold();
			basicmold.covering = "hidden";
			basicmold.position.x = avatardef.position.x;
			basicmold.position.y = avatardef.position.y;
			basicmold.position.z = avatardef.position.z;
			basicmold.scaling.x = 1 / Number(avatardef.scaling.x);
			basicmold.scaling.y = 1 / Number(avatardef.scaling.y);
			basicmold.scaling.z = 1 / Number(avatardef.scaling.z);
			basicmold.rotation.y = avatardef.rotation.y;
			basicmold.checkcollisions = "0";
			avatar = WTW.addMold(avatarname, basicmold, avatardef.parentname, basicmold.covering);
			
			basicmold = WTW.newMold();
			basicmold.covering = "hidden";
			basicmold.position.x = 0;
			basicmold.position.y = 0;
			basicmold.position.z = 0;
			basicmold.rotation.y = 0;
			basicmold.parentname = avatarname;
			basicmold.checkcollisions = "0";
			avatarshark = WTW.addMold(avatarname + "-avatarshark", basicmold, basicmold.parentname, basicmold.covering);

			basicmold = WTW.newMold();
			basicmold.covering = "hidden";
			basicmold.position.x = 6;
			basicmold.position.y = 0;
			basicmold.position.z = 0;
			basicmold.parentname = avatarname + "-avatarshark";
			basicmold.checkcollisions = "0";
			WTW.addMold(avatarname + "-checkfront", basicmold, basicmold.parentname, basicmold.covering);

			basicmold = WTW.newMold();
			basicmold.covering = "hidden";
			basicmold.position.x = 4;
			basicmold.position.y = 0;
			basicmold.position.z = 4;
			basicmold.parentname = avatarname + "-avatarshark";
			basicmold.checkcollisions = "0";
			WTW.addMold(avatarname + "-checkleft", basicmold, basicmold.parentname, basicmold.covering);

			basicmold = WTW.newMold();
			basicmold.covering = "hidden";
			basicmold.position.x = 4;
			basicmold.position.y = 0;
			basicmold.position.z = -4;
			basicmold.parentname = avatarname + "-avatarshark";
			basicmold.checkcollisions = "0";
			WTW.addMold(avatarname + "-checkright", basicmold, basicmold.parentname, basicmold.covering);
			
			var skinmat = new BABYLON.StandardMaterial(avatarname + "-skinmat",scene);
			var imageinfo = WTW.getUploadFileData(imageskinid);
			skinmat.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(imageinfo.filedata, avatarname + "-skinmattexture", scene);
			skinmat.specularColor = new BABYLON.Color3(.5,.5,.5);
			skinmat.emissiveColor = new BABYLON.Color3(.8,.8,.8);
			skinmat.diffuseColor = new BABYLON.Color3(.5,.5,.5);
			skinmat.diffuseTexture.uScale = .7;
			
			var eyemat = new BABYLON.StandardMaterial(avatarname + "-eyemat",scene);
			var imageinfo = WTW.getUploadFileData(imageeyesid);
			eyemat.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(imageinfo.filedata, avatarname + "-eyemattexture", scene);
			eyemat.specularColor = new BABYLON.Color3(.5,.5,.5);
			eyemat.emissiveColor = new BABYLON.Color3(.8,.8,.8);
			eyemat.diffuseColor = new BABYLON.Color3(.5,.5,.5);
			
			var shark = BABYLON.MeshBuilder.CreateSphere(avatarname + "-shark",{segments: 20, diameter:1, updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE},scene);
			shark.position.x = 0;
			shark.position.y = .9;
			shark.position.z = 0;
			shark.scaling.x = 8;
			shark.scaling.y = 1.5;
			shark.scaling.z = .9;
			shark.material = skinmat;
			shark.material.diffuseTexture.uOffset = .5;
			shark.parent = avatarshark;
			WTW.addReflectionToMold(WTW.waterMat, shark);

			var fins1 = BABYLON.MeshBuilder.CreateSphere(avatarname + "-fins1",{segments: 20, diameter:1, updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE},scene);
			fins1.position.x = .5;
			fins1.position.y = .4;
			fins1.position.z = .5;
			fins1.scaling.x = .4;
			fins1.scaling.y = 1.5;
			fins1.scaling.z = .3;
			fins1.rotation.x = WTW.getRadians(120);
			fins1.material = skinmat;
			fins1.material.diffuseTexture.uOffset = .5;
			fins1.parent = avatarshark;
			WTW.addReflectionToMold(WTW.waterMat, fins1);
			var fins2 = BABYLON.MeshBuilder.CreateSphere(avatarname + "-fins2",{segments: 20, diameter:.8, updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE},scene);
			fins2.position.x = .5;
			fins2.position.y = .4;
			fins2.position.z = -.5;
			fins2.scaling.x = .4;
			fins2.scaling.y = 1.5;
			fins2.scaling.z = .3;
			fins2.rotation.x = WTW.getRadians(-120);
			fins2.material = skinmat;
			fins2.parent = avatarshark;
			WTW.addReflectionToMold(WTW.waterMat, fins2);
			var fins3 = BABYLON.MeshBuilder.CreateSphere(avatarname + "-fins3",{segments: 20, diameter:.8, updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE},scene);
			fins3.position.x = -2;
			fins3.position.y = .5;
			fins3.position.z = -.5;
			fins3.scaling.x = .5;
			fins3.scaling.y = .7;
			fins3.scaling.z = .1;
			fins3.rotation.x = WTW.getRadians(-120);
			fins3.material = skinmat;
			fins3.parent = avatarshark;
			WTW.addReflectionToMold(WTW.waterMat, fins3);
			var fins4 = BABYLON.MeshBuilder.CreateSphere(avatarname + "-fins4",{segments: 20, diameter:.8, updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE},scene);
			fins4.position.x = -2;
			fins4.position.y = .5;
			fins4.position.z = .5;
			fins4.scaling.x = .5;
			fins4.scaling.y = .7;
			fins4.scaling.z = .1;
			fins4.rotation.x = WTW.getRadians(120);
			fins4.material = skinmat;
			fins4.parent = avatarshark;
			WTW.addReflectionToMold(WTW.waterMat, fins4);
			var head_fin = BABYLON.MeshBuilder.CreateCylinder(avatarname + "-hfin",{height: 1, diameterTop: 0, diameterBottom: 1, tessellation: 30, subdivisions: 1, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE},scene);
			head_fin.position.x = -.5;
			head_fin.position.y = 1.85;
			head_fin.position.z = 0;
			head_fin.scaling.z = .12;
			head_fin.scaling.x = 2;
			head_fin.material = skinmat;
			head_fin.parent = avatarshark;
			WTW.addReflectionToMold(WTW.waterMat, head_fin);
			var sharkeye = BABYLON.MeshBuilder.CreateSphere(avatarname + "-eye1",{segments: 20, diameter:1, updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE},scene);
			sharkeye.position.x = 3.3;
			sharkeye.position.y = 1;
			sharkeye.position.z = .22;
			sharkeye.scaling.x = .15;
			sharkeye.scaling.y = .15;
			sharkeye.scaling.z = .15;
			sharkeye.material = eyemat;
			sharkeye.parent = avatarshark;
			var sharkeye2 = BABYLON.MeshBuilder.CreateSphere(avatarname + "-eye2",{segments: 20, diameter:1, updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE},scene);
			sharkeye2.position.x = 3.3;
			sharkeye2.position.y = 1;
			sharkeye2.position.z = -.22;
			sharkeye2.scaling.x = .15;
			sharkeye2.scaling.y = .15;
			sharkeye2.scaling.z = .15;
			sharkeye2.material = eyemat;
			sharkeye2.parent = avatarshark;
			
			var basicmold = WTW.newMold();
			basicmold.shape = "sphere";
			basicmold.covering = "hidden";
			basicmold.position.x = -3.6;
			basicmold.position.y = .9;
			basicmold.position.z = 0;
			basicmold.subdivisions = 12;
			basicmold.parentname = avatarname + "-avatarshark";
			basicmold.checkcollisions = "0";
			tailball = WTW.addMold(avatarname + "-tailball", basicmold, basicmold.parentname, basicmold.covering);

			basicmold = WTW.newMold();
			basicmold.shape = "cone";
			basicmold.covering = "texture";
			basicmold.position.x = -.6;
			basicmold.position.y = 0;
			basicmold.position.z = 0;
			basicmold.scaling.x = .8;
			basicmold.scaling.y = 1.7;
			basicmold.scaling.z = .3;
			basicmold.rotation.z = 90;
			basicmold.subdivisions = 12;
			basicmold.graphics.texture.id = imageskinid;
			basicmold.parentname = avatarname + "-tailball";
			basicmold.checkcollisions = "0";
			var tailcone = WTW.addMold(avatarname + "-tailcone", basicmold, basicmold.parentname, basicmold.covering);
			WTW.addReflectionToMold(WTW.waterMat, tailcone);
			
			var tail_fin2 = BABYLON.MeshBuilder.CreateCylinder(avatarname + "-tail2",{height: 2, diameterTop: 0, diameterBottom: 1, tessellation: 10, subdivisions: 1, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE},scene);
			tail_fin2.position.x = -4;
			tail_fin2.position.y = .9;
			tail_fin2.position.z = 0;
			tail_fin2.scaling.x = .15;
			tail_fin2.scaling.y = 1;
			tail_fin2.scaling.z = 1.7;
			tail_fin2.rotation.z = WTW.getRadians(-90);
			tail_fin2.rotation.x = WTW.getRadians(90);
			var tail_fin3 = BABYLON.MeshBuilder.CreateCylinder(avatarname + "-tail3",{height: .7, diameterTop: 0, diameterBottom: 1, tessellation: 10, subdivisions: 1, updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE},scene);
			tail_fin3.position.x = -5.8;
			tail_fin3.position.y = .9;
			tail_fin3.position.z = 0;
			tail_fin3.scaling.x = .2;
			tail_fin3.scaling.y = 1;
			tail_fin3.scaling.z = 1;
			tail_fin3.rotation.z = WTW.getRadians(-90);
			tail_fin3.rotation.x = WTW.getRadians(90);
			var aCSG = BABYLON.CSG.FromMesh(tail_fin2);
			var bCSG = BABYLON.CSG.FromMesh(tail_fin3);
			var real_tail = aCSG.subtract(bCSG);
			tail_fin2.dispose();
			tail_fin3.dispose();

			var tailfin = real_tail.toMesh(avatarname + "-tailfin",skinmat,scene);
			tailfin.position.x = -.5;
			tailfin.position.y = 0;
			tailfin.position.z = 0;
			tailfin.parent = tailball;
			WTW.addReflectionToMold(WTW.waterMat, tailfin);
		} else if (avatar != null && tailball != null && avatarshark != null && tank != null) {
			// position changed - forward
			var tailrot = Math.round(WTW.getDegrees(tailball.rotation.y));
			if (tailrot > 90) {
				tailrot -= 360;
			}
			if (tailrot >= 30 && WTW.isOdd(Math.round(tailrot))) {
				tailball.rotation.y = WTW.getRadians(tailrot - 1);
			} else if (tailrot <= -30 && WTW.isOdd(Math.round(tailrot)) == false) {
				tailball.rotation.y = WTW.getRadians(tailrot + 1);
			} else if (tailrot < 30 && WTW.isOdd(tailrot)) {
				tailball.rotation.y = WTW.getRadians(tailrot + 4);
			} else {
				tailball.rotation.y = WTW.getRadians(tailrot - 4);
			}
			avatar.rotation.y = WTW.getRadians(Number(avatardef.rotation.y));
			avatarshark.rotation.y = -(tailball.rotation.y)/4;
			avatar.position.x = Number(avatardef.position.x);
			avatar.position.y = Number(avatardef.position.y);
			avatar.position.z = Number(avatardef.position.z); 
			avatarshark.position.z = -Number(tailball.rotation.y);
		} else {
			try {
				window.clearInterval(avatardef.movetimer);
				avatardef.movetimer = null;
			} catch (ex) {}
		}
	} catch (ex) {
		WTW.log("core-scripts-avatars-customavatars\r\n addAvatarShark=" + ex.message);
	}
	return avatar;
}
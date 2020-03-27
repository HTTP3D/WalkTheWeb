WTWJS.prototype.addAvatar3DObject = function(avatarname, avatardef, loadmin, isvisible) {
	var avatar = null;
	try {
		if (loadmin == undefined) {
			loadmin = false;
		}
		if (isvisible == undefined) {
			isvisible = false;
		}
		var positionx = 0;
		var positiony = 0;
		var positionz = 0;
		var scalingx = 1;
		var scalingy = 1;
		var scalingz = 1;
		var rotationx = 0;
		var rotationy = 0;
		var rotationz = 0;
		var avatarind = 0;
		if (avatardef.position.x != undefined) {
			if (WTW.isNumeric(avatardef.position.x)) {
				positionx = Number(avatardef.position.x);
			}
		}
		if (avatardef.position.y != undefined) {
			if (WTW.isNumeric(avatardef.position.y)) {
				positiony = Number(avatardef.position.y);
			}
		}
		if (avatardef.position.z != undefined) {
			if (WTW.isNumeric(avatardef.position.z)) {
				positionz = Number(avatardef.position.z);
			}
		}
		if (avatardef.scaling.x != undefined) {
			if (WTW.isNumeric(avatardef.scaling.x)) {
				scalingx = Number(avatardef.scaling.x);
			}
		}
		if (avatardef.scaling.y != undefined) {
			if (WTW.isNumeric(avatardef.scaling.y)) {
				scalingy = Number(avatardef.scaling.y);
			}
		}
		if (avatardef.scaling.z != undefined) {
			if (WTW.isNumeric(avatardef.scaling.z)) {
				scalingz = Number(avatardef.scaling.z);
			}
		} 
		if (avatardef.rotation.x != undefined) {
			if (WTW.isNumeric(avatardef.rotation.x)) {
				rotationx = Number(avatardef.rotation.x);
			}
		}
		if (avatardef.rotation.y != undefined) {
			if (WTW.isNumeric(avatardef.rotation.y)) {
				rotationy = Number(avatardef.rotation.y);
			}
		}
		if (avatardef.rotation.z != undefined) {
			if (WTW.isNumeric(avatardef.rotation.z)) {
				rotationz = Number(avatardef.rotation.z);
			}
		}
		if (avatardef.avatarind != undefined) {
			if (WTW.isNumeric(avatardef.avatarind)) {
				avatarind = Number(avatardef.avatarind);
			}
		}
		avatar = scene.getMeshByID(avatarname);
		if (avatar == null) {
			avatar = BABYLON.MeshBuilder.CreateBox(avatarname, {}, scene);
			avatar.material = WTW.addCovering("hidden", avatarname, avatardef, 1, 1, 1, "0", "0");
			avatar.material.alpha = 0;
			avatar.applyGravity = true;
			avatar.showBoundingBox = false;
			if (loadmin == false) {
				avatar.ellipsoid = new BABYLON.Vector3(3, 8, 3);
				avatar.ellipsoidOffset = new BABYLON.Vector3(0, 8, 0);
				avatar.checkCollisions = true;
			} else {
				avatar.checkCollisions = false;
			}
			avatar.isPickable = false;
			avatar.WTW = avatardef;
			avatar.position = new BABYLON.Vector3(positionx, positiony, positionz);
			avatar.rotation = new BABYLON.Vector3(WTW.getRadians(rotationx), WTW.getRadians(rotationy), WTW.getRadians(rotationz));
		}
		
		var avatarscale = scene.getMeshByID(avatarname + '-scale');
		if (avatarscale == null) {
			avatarscale = BABYLON.MeshBuilder.CreateBox(avatarname + '-scale', {}, scene);
			avatarscale.material = WTW.addCovering("hidden", avatarname + '-scale', avatardef, 1, 1, 1, "0", "0");
			avatarscale.material.alpha = 0;
			avatarscale.isPickable = false;
			avatarscale.parent = avatar;
			avatarscale.scaling = new BABYLON.Vector3(scalingx, scalingy, scalingz);
			avatarscale.rotation.y = WTW.getRadians(-90);
		}
		
		var avatarcamera = scene.getMeshByID(avatarname + "-camera");
		if (avatarcamera == null) {
			avatarcamera = BABYLON.MeshBuilder.CreateBox(avatarname + "-camera", {}, scene);
			avatarcamera.material = WTW.addCovering("hidden", avatarname, avatardef, 1, 1, 1, "0", "0");
			avatarcamera.material.alpha = 0;
			avatarcamera.parent = avatar;
			avatarcamera.position.y = 12;
			avatarcamera.rotation.y = WTW.getRadians(-90);
		}
		
		var avatarcenter = scene.getMeshByID(avatarname + "-center");
		if (avatarcenter == null) {
			avatarcenter = BABYLON.MeshBuilder.CreateBox(avatarname + "-center", {}, scene);
			avatarcenter.material = WTW.addCovering("hidden", avatarname, avatardef, 1, 1, 1, "0", "0");
			avatarcenter.material.alpha = 0;
			avatarcenter.parent = avatar;
			avatarcenter.position.y = 12;
			avatarcenter.rotation.y = WTW.getRadians(-90);
		}
		if (loadmin) {
			avatar.isVisible = false;
			avatarscale.isVisible = false;
			avatarcamera.isVisible = false;
			avatarcenter.isVisible = false;
		}
		
		var objectanimations = null;
		var objectfolder = "/content/system/avatars/male/";
		var objectfile = "maleidle.babylon";
		var avatarparts = [];
		var avataranimationdefs = [];
		if (avatardef.object.folder != undefined) {
			if (avatardef.object.folder != '') {
				objectfolder = avatardef.object.folder;
			}
		}
		if (avatardef.object.file != undefined) {
			if (avatardef.object.file != '') {
				objectfile = avatardef.object.file;
			}
		}
		if (avatardef.object.objectanimations != undefined) {
			objectanimations = avatardef.object.objectanimations;
		}
		if (avatardef.avatarparts != null) {
			if (avatardef.avatarparts != undefined) {
				avatarparts = avatardef.avatarparts;
			}
		}
		if (avatardef.avataranimationdefs != null) {
			if (avatardef.avataranimationdefs != undefined) {
				avataranimationdefs = avatardef.avataranimationdefs;
			}
		}
		avataranimationdefs = WTW.loadAvatarAnimationDefinitions(avatarind, avataranimationdefs);

		avatardef = WTW.pluginsAvatarBeforeCreate(avatarname, avatardef);
		
		BABYLON.SceneLoader.ImportMeshAsync("", objectfolder, objectfile, scene).then(
			function (results) {
				var easingFunction = new BABYLON.QuadraticEase();
				easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
				var avatarparent = scene.getMeshByID(avatarname + "-scale");
				if (results.meshes != null) {
					var totalx = 0;
					var totaly = 0;
					var totalz = 0;
					var avex = 0;
					var avey = 0;
					var avez = 0;
					for (var i=0; i < results.meshes.length; i++) {
						if (results.meshes[i] != null) {
							totalx += results.meshes[i].position.x;
							totaly += results.meshes[i].position.y;
							totalz += results.meshes[i].position.z;
						}
					}
					if (results.meshes.length > 0) {
						avex = totalx/results.meshes.length;
						avey = totaly/results.meshes.length;
						avez = totalz/results.meshes.length;
					}
					results.meshes[0].WTW = [];
					results.meshes[0].WTW.skeletons = null;
					for (var i=0; i < results.meshes.length; i++) {
						if (results.meshes[i] != null) {
							var mesh = results.meshes[i];
							var meshname = results.meshes[i].name;
							var childmoldname = avatarname + "-" + meshname;
							results.meshes[i].isPickable = true;
							results.meshes[i].name = childmoldname;
							results.meshes[i].id = childmoldname;
							results.meshes[i].isVisible = false;
							if (results.meshes[i].material != null) {
								if (results.meshes[i].material.alpha != undefined) {
									results.meshes[i].material.alpha = 1;
								}
								
								results.meshes[i].material.ambientColor = new BABYLON.Color3(.3, .3, .3);
								
								if (avatarparts != null) {
									for (var j=0;j<avatarparts.length;j++) {
										if (avatarparts[j] != null) {
											var avatarpart = avatarparts[j].avatarpart;
											if (avatarpart == meshname) {
												var er = avatarparts[j].emissivecolorr;
												var eg = avatarparts[j].emissivecolorg;
												var eb = avatarparts[j].emissivecolorb;
												results.meshes[i].material.emissiveColor = new BABYLON.Color3(er,eg,eb);
												var covering = results.meshes[i].material;
												results.meshes[i].material.dispose();
												results.meshes[i].material = covering;
											}
										}
									}
								}
							}
							WTW.registerMouseOver(results.meshes[i]);
							if (results.meshes[i].parent == null) {
								results.meshes[i].parent = avatarparent;
							}
							if (WTW.shadows != null) {
								WTW.shadows.getShadowMap().renderList.push(results.meshes[i]);
							}
							results.meshes[i].receiveShadows = true;
							if (i > 0) {
								results.meshes[i].WTW = [];
							}
							results.meshes[i].WTW.animations = [];
							if (objectanimations != null) {
								if (objectanimations != null) {
									for (var j=0; j < objectanimations.length;j++) {
										if (objectanimations[j] != null) {
											var moldnamepart = objectanimations[j].moldnamepart;
											if (moldnamepart == meshname) {
												var moldevent = objectanimations[j].moldevent;
												var startframe = Number(objectanimations[j].startframe);
												var endframe = Number(objectanimations[j].endframe);
												var animationloop = false;
												var speedratio = Number(objectanimations[j].speedratio);
												if (objectanimations[j].animationloop+'' == '1') {
													animationloop = true;
												}
												if (moldevent == 'onload') {
													animationloop = false;
													if ((typeof mesh.WTW.animations.onwait) != "undefined") {
														results.meshes[i].WTW.animations[moldevent] = scene.beginWeightedAnimation(mesh, startframe, endframe, 1, animationloop, speedratio, function() {mesh.WTW.animations.onload.weight=0; mesh.WTW.animations.onwait.weight=1;});
													} else {
														results.meshes[i].WTW.animations[moldevent] = scene.beginWeightedAnimation(mesh, startframe, endframe, 1, animationloop, speedratio);
													}
												} else {
													results.meshes[i].WTW.animations[moldevent] = scene.beginWeightedAnimation(mesh, startframe, endframe, 0, animationloop, speedratio);
												}
											}
											
										}
									}
									if ((typeof mesh.WTW.animations.onload) == "undefined" && (typeof mesh.WTW.animations.onwait) != "undefined") {
										mesh.WTW.animations.onwait.weight=1;
									}
								}
							}
						}
					} 
				}
				if (results.skeletons != null)	{
					var skeleton = results.meshes[0].skeleton;
					avatar.WTW.skeleton = results.meshes[0].skeleton;
					for (var i=0; i < results.skeletons.length; i++) {
						if (results.skeletons[i] != null) {
							var mesh = results.skeletons[i];
							var meshname = results.skeletons[i].name;
							var childmoldname = avatarname + "-" + meshname;
							results.skeletons[i].name = childmoldname;
							results.skeletons[i].id = childmoldname;
							WTW.registerMouseOver(results.skeletons[i]);
							if (results.skeletons[i].parent == null) {
								results.skeletons[i].scaling = new BABYLON.Vector3(scalingx,scalingy,scalingz);
							}
							if (results.skeletons[i].bones != null) {
								var headtopbone = -1;
								var spine2bone = -1;
								var righthandbone = -1;
								var lefthandbone = -1;
								var rightlegbone = -1;
								var leftlegbone = -1;
								var rightfootbone = -1;
								var leftfootbone = -1;
								for (var j=0; j < results.skeletons[i].bones.length; j++) {
									if (results.skeletons[i].bones[j] != null) {
										var bonename = results.skeletons[i].bones[j].name.toLowerCase();
										if (bonename.indexOf("headtop") > -1 && headtopbone == -1) {
											headtopbone = j;
										} else if (bonename.indexOf("spine2") > -1 && spine2bone == -1) {
											spine2bone = j;
										} else if (bonename.indexOf("righthand") > -1 && righthandbone == -1) {
											righthandbone = j;
										} else if (bonename.indexOf("lefthand") > -1 && lefthandbone == -1) {
											lefthandbone = j;
										} else if (bonename.indexOf("rightupleg") > -1 && rightlegbone == -1) {
											rightlegbone = j;
										} else if (bonename.indexOf("leftupleg") > -1 && leftlegbone == -1) {
											leftlegbone = j;
										} else if (bonename.indexOf("rightfoot") > -1 && rightfootbone == -1) {
											rightfootbone = j;
										} else if (bonename.indexOf("leftfoot") > -1 && leftfootbone == -1) {
											leftfootbone = j;
										}
										if (j == 0) {
											results.skeletons[i].bones[j].parent = avatarparent;
										} else {
											if (results.skeletons[i].bones[j].parent == null) {
												results.skeletons[i].bones[j].parent = results.skeletons[i].bones[0];
											}
										}
									}
								}
								if (headtopbone > -1) {
									var headtop = BABYLON.MeshBuilder.CreateBox(avatarname + "-headtop", {}, scene);
									headtop.scaling = new BABYLON.Vector3(1/scalingx, 1/scalingy, 1/scalingz);
									headtop.material = covering = new BABYLON.StandardMaterial("mat" + avatarname + '-headtop', scene);
									headtop.material.alpha = 0;
									headtop.isPickable = true;
									//WTW.registerMouseOver(headtop);
									headtop.attachToBone(results.skeletons[i].bones[headtopbone], results.meshes[0]);
									if (avatarname == "myavatar-" + dGet("wtw_tinstanceid").value) {
										avatarcamera.parent = headtop;
										avatarcamera.position.y = 0;
										avatarcamera.rotation.y = WTW.getRadians(0);
									}
								}
								if (spine2bone > -1) {
									var chest = BABYLON.MeshBuilder.CreateBox(avatarname + "-chest", {}, scene);
									chest.scaling = new BABYLON.Vector3(1/scalingx, 1/scalingy, 1/scalingz);
									chest.material = covering = new BABYLON.StandardMaterial("mat" + avatarname + '-chest', scene);
									chest.material.alpha = 0;
									chest.isPickable = true;
									//WTW.registerMouseOver(chest);
									chest.attachToBone(results.skeletons[i].bones[spine2bone], results.meshes[0]);
								}
								if (righthandbone > -1) {
									var righthand = BABYLON.MeshBuilder.CreateBox(avatarname + "-righthand", {}, scene);
									righthand.scaling = new BABYLON.Vector3(1/scalingx, 1/scalingz, 1/scalingz);
									righthand.material = covering = new BABYLON.StandardMaterial("mat" + avatarname + '-righthand', scene);
									righthand.material.alpha = 0;
									righthand.isPickable = true;
									//WTW.registerMouseOver(righthand);
									righthand.attachToBone(results.skeletons[i].bones[righthandbone], results.meshes[0]);
								}
								if (lefthandbone > -1) {
									var lefthand = BABYLON.MeshBuilder.CreateBox(avatarname + "-lefthand", {}, scene);
									lefthand.scaling = new BABYLON.Vector3(1/scalingx, 1/scalingy, 1/scalingz);
									lefthand.material = covering = new BABYLON.StandardMaterial("mat" + avatarname + '-lefthand', scene);
									lefthand.material.alpha = 0;
									lefthand.isPickable = true;
									//WTW.registerMouseOver(lefthand);
									lefthand.attachToBone(results.skeletons[i].bones[lefthandbone], results.meshes[0]);
								}
								if (rightlegbone > -1) {
									var rightleg = BABYLON.MeshBuilder.CreateBox(avatarname + "-righthip", {}, scene);
									rightleg.scaling = new BABYLON.Vector3(1/scalingx, 1/scalingy, 1/scalingz);
									rightleg.material = covering = new BABYLON.StandardMaterial("mat" + avatarname + '-rightleg', scene);
									rightleg.material.alpha = 0;
									rightleg.isPickable = true;
									//WTW.registerMouseOver(rightleg);
									rightleg.attachToBone(results.skeletons[i].bones[rightlegbone], results.meshes[0]);
								}
								if (leftlegbone > -1) {
									var leftleg = BABYLON.MeshBuilder.CreateBox(avatarname + "-lefthip", {}, scene);
									leftleg.scaling = new BABYLON.Vector3(1/scalingx, 1/scalingy, 1/scalingz);
									leftleg.material = covering = new BABYLON.StandardMaterial("mat" + avatarname + '-leftleg', scene);
									leftleg.material.alpha = 0;
									leftleg.isPickable = true;
									//WTW.registerMouseOver(leftleg);
									leftleg.attachToBone(results.skeletons[i].bones[leftlegbone], results.meshes[0]);
								}
								if (rightfootbone > -1) {
									var rightfoot = BABYLON.MeshBuilder.CreateBox(avatarname + "-rightfoot", {}, scene);
									rightfoot.scaling = new BABYLON.Vector3(1/scalingx, 1/scalingy, 1/scalingz);
									rightfoot.material = covering = new BABYLON.StandardMaterial("mat" + avatarname + '-rightfoot', scene);
									rightfoot.material.alpha = 0;
									rightfoot.isPickable = true;
									//WTW.registerMouseOver(rightfoot);
									rightfoot.attachToBone(results.skeletons[i].bones[rightfootbone], results.meshes[0]);
								}
								if (leftfootbone > -1) {
									var leftfoot = BABYLON.MeshBuilder.CreateBox(avatarname + "-leftfoot", {}, scene);
									leftfoot.scaling = new BABYLON.Vector3(1/scalingx, 1/scalingy, 1/scalingz);
									leftfoot.material = covering = new BABYLON.StandardMaterial("mat" + avatarname + '-leftfoot', scene);
									leftfoot.material.alpha = 0;
									leftfoot.isPickable = true;
									//WTW.registerMouseOver(leftfoot);
									leftfoot.attachToBone(results.skeletons[i].bones[leftfootbone], results.meshes[0]);
								}
							}
		
							if (avatar.WTW.animations.length == 0) {
								avatar.WTW.animations = avataranimationdefs;
							}
							avatar.WTW.animations.running = [];
							avatar.WTW.animations.running['onrotateup'] = {
								'weight':0,
								'active':0
							};
							avatar.WTW.animations.running['onrotatedown'] = {
								'weight':0,
								'active':0
							};
							var firstloaded = true; // first animation was already loaded with avatar mesh
							if (firstloaded) {
								if (loadmin == false) {
									avatar.WTW.animations.running[avataranimationdefs[0].animationname] = scene.beginWeightedAnimation(skeleton, Number(avataranimationdefs[0].startframe), Number(avataranimationdefs[0].endframe), 0, avataranimationdefs[0].animationloop, Number(avataranimationdefs[0].speedratio));
									avatar.WTW.animations[0].totalframes = Number(avataranimationdefs[0].endframe);
									avatar.WTW.animations[0].totalstartframe = 1;
									avatar.WTW.animations[0].totalendframe = Number(avataranimationdefs[0].endframe);
									WTW.loadAvatarAnimations(avatarname, easingFunction, 1, Number(avataranimationdefs[0].startframe), Number(avataranimationdefs[0].endframe));
								} else {
									avatar.WTW.animations.running[avataranimationdefs[0].animationname] = scene.beginWeightedAnimation(skeleton, Number(avataranimationdefs[0].startframe), Number(avataranimationdefs[0].endframe), 1, avataranimationdefs[0].animationloop, Number(avataranimationdefs[0].speedratio));
									avatar.WTW.animations[0].totalframes = Number(avataranimationdefs[0].endframe);
									avatar.WTW.animations[0].totalstartframe = 1;
									avatar.WTW.animations[0].totalendframe = Number(avataranimationdefs[0].endframe);
									WTW.avatarMinLoadEnter(avatarname);
								}
							} else {
								WTW.loadAvatarAnimations(avatarname, easingFunction);
							}
						}
					}
				} 
				
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-avatars-basicavatars\r\n addAvatar3DObject=" + ex.message);
	}
	return avatar;
}

WTWJS.prototype.addAvatarShark = function(avatarname, avatardef) {
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
/* covering functions - adds the materials to the molds (meshes) */

WTWJS.prototype.addCoveringWire = function(moldname, molddef) {
	/* wireframe the mold instead of adding a material */
	var covering;
	try {
		covering = "none";
		var mold = scene.getMeshByID(moldname);
		if (mold != null) {
			mold.wireframe = true;
		}
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringWire=" + ex.message);
	}
	return covering;
}

WTWJS.prototype.addCoveringColor = function(moldname, molddef) {
	/* set the color of the mold - works alone and with a texture to tint the texture */
	var covering;
	try {
		var opacity = 1;
		if (molddef.opacity != undefined) {
			if (WTW.isNumeric(molddef.opacity)) {
				opacity = Number(molddef.opacity) / 100;
				if (opacity > 1) {
					opacity = 1;
				} else if (opacity < 0) {
					opacity = 0;
				}
			}
		}
		covering = new BABYLON.StandardMaterial("mat" + moldname, scene);
		covering.alpha = opacity;
		covering.specularColor = new BABYLON.Color3(Number(molddef.color.specular.r), Number(molddef.color.specular.g), Number(molddef.color.specular.b));
		covering.emissiveColor = new BABYLON.Color3(Number(molddef.color.emissive.r), Number(molddef.color.emissive.g), Number(molddef.color.emissive.b));
		covering.diffuseColor = new BABYLON.Color3(Number(molddef.color.diffuse.r), Number(molddef.color.diffuse.g), Number(molddef.color.diffuse.b));

		//covering.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringColor=" + ex.message);
	}
	return covering;
}

WTWJS.prototype.addCoveringGlass = function(moldname, molddef) {
	/* basically a color material with an opacity of .2 (or 20%) */
	/* you can also achieve this with a color or texture with an opacity set in advanced options on the form */
	var covering;
	try {
		WTW.disposeMaterial("mat" + moldname);		
		covering = new BABYLON.StandardMaterial("mat" + moldname, scene);
		var opacity = .2;
		covering.alpha = opacity;
		covering.specularColor = new BABYLON.Color3(Number(molddef.color.specular.r), Number(molddef.color.specular.g), Number(molddef.color.specular.b));
		covering.emissiveColor = new BABYLON.Color3(Number(molddef.color.emissive.r), Number(molddef.color.emissive.g), Number(molddef.color.emissive.b));
		covering.diffuseColor = new BABYLON.Color3(Number(molddef.color.diffuse.r), Number(molddef.color.diffuse.g), Number(molddef.color.diffuse.b));

		covering.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringGlass=" + ex.message);
	}
	return covering;
}

WTWJS.prototype.addCoveringMirror = function(moldname, molddef) {
	/* work in progress - adds a mirror surface to a mold and will load the molds that will reflect in that surface */
	var covering;
	try {
		var mirrorLevel = .9;
		var opacity = 1;
/*		if (molddef.opacity != undefined) {
			if (WTW.isNumeric(molddef.opacity)) {
				opacity = Number(molddef.opacity) / 100;
				if (opacity > 1) {
					opacity = 1;
				} else if (opacity < 0) {
					opacity = 0;
				}
			}
		}*/
		covering = new BABYLON.StandardMaterial("mat" + moldname, scene);
		covering.reflectionTexture = new BABYLON.MirrorTexture("matmirror" + moldname, 1024, scene, true);
		covering.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, 0, 1, -10.0);
		//covering.reflectionTexture.renderList = [WTW.sky, WTW.extraGround];
		covering.reflectionTexture.level = mirrorLevel;
		covering.alpha = opacity;
		opacity = 0.0;
		covering.specularColor = new BABYLON.Color3(Number(molddef.color.specular.r), Number(molddef.color.specular.g), Number(molddef.color.specular.b));
		covering.emissiveColor = new BABYLON.Color3(Number(molddef.color.emissive.r), Number(molddef.color.emissive.g), Number(molddef.color.emissive.b));
		covering.diffuseColor = new BABYLON.Color3(Number(molddef.color.diffuse.r), Number(molddef.color.diffuse.g), Number(molddef.color.diffuse.b));

		covering.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		WTW.initMirrorLoadZone(moldname, molddef);
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringMirror=" + ex.message);
	}
	return covering;
}

WTWJS.prototype.addCoveringTexture = function(moldname, molddef, lenx, leny, lenz, special1, special2) {
	/* basic add texture material to mold - attempts to scale the texture on the surface (which can be overwritten in the advanced options of the form) */
	var covering;
	try {
		var shape = "box"; 
		var uoffset = 0;
		var voffset = 0;
		var uscale = lenx/10;
		var vscale = leny/10;
		if (lenz > lenx) {
			vscale = lenz/10;
			uscale = leny/10;
		}
		if (leny < lenx && leny < lenz) {
			uscale = lenz/10;
			vscale = lenx/10;
		}
		var imageid = "t1qlqxd6pzubzzzy";
		var texturepath = "";
		var bumpid = "";
		var bumppath = "";
		if (molddef != undefined) {
			if (molddef.shape != "") {
				shape = molddef.shape;
			}
			if (shape == "sphere" || shape == "dome" || shape == "cone") {
				uscale = ((lenx/10 + lenz/10) / 2) * Math.PI;
				vscale = vscale * Math.PI;
			} else if (shape == "cylinder") {
				uscale = ((lenx + lenz) / 2) / Math.PI;
				vscale = 1;
			} else if (shape == "half pipe") {
				uscale = lenx / 10;
				vscale = lenz / 10;
			}
			if (molddef.graphics != undefined) {
				if (molddef.graphics.texture.id != undefined) {
					imageid = molddef.graphics.texture.id;
				}
				if (molddef.graphics.texture.path != undefined) {
					texturepath = molddef.graphics.texture.path;
					texturepath = texturepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
				}
				if (molddef.graphics.texture.bumpid != undefined) {
					bumpid = molddef.graphics.texture.bumpid;
				}
				if (molddef.graphics.texture.bumppath != undefined) {
					bumppath = molddef.graphics.texture.bumppath;
					bumppath = bumppath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
				}
				if (WTW.isNumeric(molddef.graphics.uscale)) {
					if (Number(molddef.graphics.uscale) > 0) {
						uscale = uscale * Number(molddef.graphics.uscale);
					}
				}
				if (WTW.isNumeric(molddef.graphics.vscale)) {
					if (Number(molddef.graphics.vscale) > 0) {
						vscale = vscale * Number(molddef.graphics.vscale);
					}
				}
				if (WTW.isNumeric(molddef.graphics.uoffset)) {
					if (Number(molddef.graphics.uoffset) != 0) {
						uoffset = Number(molddef.graphics.uoffset);
					}
				}
				if (WTW.isNumeric(molddef.graphics.voffset)) {
					if (Number(molddef.graphics.voffset) != 0) {
						voffset = Number(molddef.graphics.voffset);
					}
				}	
			}
		}
		WTW.disposeMaterial("mat" + moldname);		
		covering = new BABYLON.StandardMaterial("mat" + moldname, scene);
		covering.specularColor = new BABYLON.Color3(Number(molddef.color.specular.r), Number(molddef.color.specular.g), Number(molddef.color.specular.b));
		covering.emissiveColor = new BABYLON.Color3(Number(molddef.color.emissive.r), Number(molddef.color.emissive.g), Number(molddef.color.emissive.b));
		covering.diffuseColor = new BABYLON.Color3(Number(molddef.color.diffuse.r), Number(molddef.color.diffuse.g), Number(molddef.color.diffuse.b));	
		
		covering.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		var imageextension = "";
		if (texturepath == '') {
			var imageinfo = WTW.getUploadFileData(imageid);
			imageextension = imageinfo.extension;
			covering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(imageinfo.image.src, "mattexture" + imageid, scene);
		} else {
			covering.diffuseTexture = new BABYLON.Texture(texturepath, scene);
			imageextension = texturepath.substr(texturepath.length - 3).toLowerCase();
		}
		covering.diffuseTexture.uScale = uscale;
		covering.diffuseTexture.vScale = vscale;
		covering.diffuseTexture.uOffset = uoffset;
		covering.diffuseTexture.vOffset = voffset;
		if (imageextension.indexOf("gif") > -1 || imageextension.indexOf("png") > -1) {
			covering.diffuseTexture.hasAlpha = true;
		}	
		if (bumpid != '' || bumppath != '') {
			if (bumppath != '') {
				covering.bumpTexture = new BABYLON.Texture(bumppath, scene);
			} else {
				var imageinfobump = WTW.getUploadFileData(bumpid);
				covering.bumpTexture = new BABYLON.Texture.CreateFromBase64String(imageinfobump.image.src, "mattexture" + bumpid, scene);
			}
			covering.bumpTexture.uScale = uscale;
			covering.bumpTexture.vScale = vscale;
			covering.bumpTexture.uOffset = uoffset;
			covering.bumpTexture.vOffset = voffset;
			covering.useParallax = true;
			covering.useParallaxOcclusion = true;
		}

		//covering.freeze();  // covering.unfreeze();
		//covering.isBlocking = false;
		//covering.forceCompilation(mold, function() {
//					mold.simplify([{ quality: 0.9, distance: 50 }, { quality: 0.5, distance: 80 }, { quality: 0.3, distance: 100 }, { quality: 0.1, distance: 180 }], true, BABYLON.SimplificationType.QUADRATIC, function() {
//					covering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(imageinfo.image.src, "mattexture" + imageid, scene);
//				});
		//});
		if (moldname.indexOf("myavatar-") > -1 || moldname.indexOf("person-") > -1) {
			covering.backFaceCulling = false;
		} else {
			covering.backFaceCulling = true;
		}
		var opacity = 1;
		if (molddef.opacity != undefined) {
			if (WTW.isNumeric(molddef.opacity)) {
				opacity = Number(molddef.opacity) / 100;
				if (opacity > 1) {
					opacity = 1;
				} else if (opacity < 0) {
					opacity = 0;
				}
			}
		}
		covering.alpha = opacity;
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringTexture=" + ex.message);
	}
	return covering;
}

WTWJS.prototype.addCoveringDirectionalTexture = function(moldname, molddef, lenx, leny, lenz) {
	/* texture applied to cubes that will make texture aling around the cube (like for a brick wall) */
	var covering;
	try {
		var alphawall = 1;
		var uoffset = 0;
		var voffset = 0;
		var uscale = 0;
		var vscale = 0;
		var uscf = leny/10; 
		var vscf = lenz/10;
		var uscb = leny/10; 
		var vscb = lenz/10; 
		var uscl = lenx/10; 
		var vscl = leny/10; 
		var uscr = lenx/10; 
		var vscr = leny/10; 
		var uscu = lenz/10; 
		var vscu = lenx/10; 
		var uscd = lenz/10; 
		var vscd = lenx/10; 
		var uosf = 0; 
		var vosf = 0; 
		var uosb = 0; 
		var vosb = 0; 
		var uosl = 0; 
		var vosl = 0; 
		var uosr = 0; 
		var vosr = 0; 
		var uosu = 0; 
		var vosu = 0; 
		var uosd = 0; 
		var vosd = 0; 
		var imageid = "t1qlqxd6pzubzzzy";
		var texturepath = "";
		var bumpid = "";
		var bumppath = "";
		var opacity = 1;
		var imageextension = "";
		if (molddef != undefined) {
			if (molddef.opacity != undefined) {
				if (WTW.isNumeric(molddef.opacity)) {
					opacity = Number(molddef.opacity) / 100;
					if (opacity > 1) {
						opacity = 1;
					} else if (opacity < 0) {
						opacity = 0;
					}
				}
			}
			if (molddef.graphics != undefined) {
				if (molddef.graphics.texture.id != undefined) {
					if (molddef.graphics.texture.id != "") {
						imageid = molddef.graphics.texture.id;
					}
				}
				if (molddef.graphics.texture.path != undefined) {
					if (molddef.graphics.texture.path != "") {
						texturepath = molddef.graphics.texture.path;
						texturepath = texturepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
					}
				}
				if (molddef.graphics.texture.bumpid != undefined) {
					bumpid = molddef.graphics.texture.bumpid;
				}
				if (molddef.graphics.texture.bumppath != undefined) {
					bumppath = molddef.graphics.texture.bumppath;
					bumppath = bumppath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
				}
				if (WTW.isNumeric(molddef.graphics.uscale)) {
					if (Number(molddef.graphics.uscale) > 0) {
						uscale = Number(molddef.graphics.uscale);
					}
				}
				if (WTW.isNumeric(molddef.graphics.vscale)) {
					if (Number(molddef.graphics.vscale) > 0) {
						vscale = Number(molddef.graphics.vscale);
					}
				}
				if (WTW.isNumeric(molddef.graphics.uoffset)) {
					if (Number(molddef.graphics.uoffset) != 0) {
						uoffset = Number(molddef.graphics.uoffset);
					}
				}
				if (WTW.isNumeric(molddef.graphics.voffset)) {
					if (Number(molddef.graphics.voffset) != 0) {
						voffset = Number(molddef.graphics.voffset);
					}
				}	
				if (WTW.isNumeric(molddef.graphics.uscale)) {
					if (Number(molddef.graphics.uscale) > 0) {
						uscale = Number(molddef.graphics.uscale);
						uscf = leny/10 * uscale; 
						uscb = leny/10 * uscale; 
						uscl = lenx/10 * uscale; 
						uscr = lenx/10 * uscale; 
						uscu = lenz/10 * uscale; 
						uscd = lenz/10 * uscale; 
					}
				}
				if (WTW.isNumeric(molddef.graphics.vscale)) {
					if (Number(molddef.graphics.vscale) > 0) {
						vscale = Number(molddef.graphics.vscale);
						vscf = lenz/10 * vscale;
						vscb = lenz/10 * vscale; 
						vscl = leny/10 * vscale; 
						vscr = leny/10 * vscale; 
						vscu = lenx/10 * vscale; 
						vscd = lenx/10 * vscale; 
					}
				}
				if (WTW.isNumeric(molddef.graphics.uoffset)) {
					if (Number(molddef.graphics.uoffset) != 0) {
						uoffset = Number(molddef.graphics.uoffset);
						uosf = uoffset; 
						uosb = uoffset; 
						uosl = uoffset; 
						uosr = uoffset; 
						uosu = uoffset; 
						uosd = uoffset; 
					}
				}
				if (WTW.isNumeric(molddef.graphics.voffset)) {
					if (Number(molddef.graphics.voffset) != 0) {
						voffset = Number(molddef.graphics.voffset);
						vosf = voffset; 
						vosb = voffset; 
						vosl = voffset; 
						vosr = voffset; 
						vosu = voffset; 
						vosd = voffset; 
					}
				}		
			}
		}
		var mold = scene.getMeshByID(moldname);
		if (mold != null) {
			if (mold.material != null) {
				if (mold.material.subMaterials != undefined) {
					for (var i=0;i < mold.material.subMaterials.length;i++) {
						if (mold.material.subMaterials[i].diffuseTexture != undefined) {
							if (mold.material.subMaterials[i].diffuseTexture != null) {
								mold.material.subMaterials[i].diffuseTexture.dispose();
								mold.material.subMaterials[i].diffuseTexture = null;
							}
						}
					}
				}
				
			}
			mold.subMeshes = [];
			if (mold.subMeshes.length < 12) {
				mold.subMeshes.push(new BABYLON.SubMesh(0, 0, 4, 0, 6, mold));
				mold.subMeshes.push(new BABYLON.SubMesh(1, 4, 4, 6, 6, mold));
				mold.subMeshes.push(new BABYLON.SubMesh(2, 8, 4, 12, 6, mold));
				mold.subMeshes.push(new BABYLON.SubMesh(3, 12, 4, 18, 6, mold));
				mold.subMeshes.push(new BABYLON.SubMesh(4, 16, 4, 24, 6, mold));
				mold.subMeshes.push(new BABYLON.SubMesh(5, 20, 4, 30, 6, mold));
			}		
		}
		covering = new BABYLON.MultiMaterial("cubemat" + moldname, scene);
		var rMaterial = new BABYLON.StandardMaterial("rmat" + moldname, scene);
		var imageinfo;
		var imageextension = '';
		if (texturepath == '') {
			imageinfo = WTW.getUploadFileData(imageid);
			imageextension = imageinfo.extension;
			rMaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(imageinfo.image.src, "mattexture" + imageid, scene);
		} else {
			rMaterial.diffuseTexture = new BABYLON.Texture(texturepath, scene);
			imageextension = texturepath.substr(texturepath.length - 3).toLowerCase();
		}
		rMaterial.diffuseTexture.wAng = 0 * Math.PI / 180;
		rMaterial.diffuseTexture.uScale = uscr;
		rMaterial.diffuseTexture.vScale = vscr;
		rMaterial.diffuseTexture.uOffset = uosr;
		rMaterial.diffuseTexture.vOffset = vosr;
		rMaterial.diffuseTexture.alpha = alphawall;
		rMaterial.alpha = opacity;
		rMaterial.specularColor = new BABYLON.Color3(Number(molddef.color.specular.r), Number(molddef.color.specular.g), Number(molddef.color.specular.b));
		rMaterial.emissiveColor = new BABYLON.Color3(Number(molddef.color.emissive.r), Number(molddef.color.emissive.g), Number(molddef.color.emissive.b));
		rMaterial.diffuseColor = new BABYLON.Color3(Number(molddef.color.diffuse.r), Number(molddef.color.diffuse.g), Number(molddef.color.diffuse.b));	
	
		rMaterial.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		if (imageextension.indexOf("gif") > -1 || imageextension.indexOf("png") > -1) {
			rMaterial.diffuseTexture.hasAlpha = true;
			rMaterial.useAlphaFromDiffuseTexture = true;
		}
		if (bumpid != '' || bumppath != '') {
			if (bumppath != '') {
				rMaterial.bumpTexture = new BABYLON.Texture(bumppath, scene);
			} else {
				var imageinfobump = WTW.getUploadFileData(bumpid);
				rMaterial.bumpTexture = new BABYLON.Texture.CreateFromBase64String(imageinfobump.image.src, "rMaterial" + moldname, scene);
			}
			rMaterial.bumpTexture.wAng = 0 * Math.PI / 180;
			rMaterial.bumpTexture.uScale = uscr;
			rMaterial.bumpTexture.vScale = vscr;
			rMaterial.bumpTexture.uOffset = uosr;
			rMaterial.bumpTexture.vOffset = vosr;
			rMaterial.useParallax = true;
			rMaterial.useParallaxOcclusion = true;
		}
		var lMaterial = new BABYLON.StandardMaterial("lmat" + moldname, scene);
		if (texturepath == '') {
			lMaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(imageinfo.image.src, "mattexture" + imageid, scene);
		} else {
			lMaterial.diffuseTexture = new BABYLON.Texture(texturepath, scene);
		}
		lMaterial.diffuseTexture.wAng = 180 * Math.PI / 180;
		lMaterial.diffuseTexture.uScale = uscl;
		lMaterial.diffuseTexture.vScale = vscl;
		lMaterial.diffuseTexture.uOffset = uosl;
		lMaterial.diffuseTexture.vOffset = vosl;
		lMaterial.alpha = opacity;
		lMaterial.specularColor = new BABYLON.Color3(Number(molddef.color.specular.r), Number(molddef.color.specular.g), Number(molddef.color.specular.b));
		lMaterial.emissiveColor = new BABYLON.Color3(Number(molddef.color.emissive.r), Number(molddef.color.emissive.g), Number(molddef.color.emissive.b));
		lMaterial.diffuseColor = new BABYLON.Color3(Number(molddef.color.diffuse.r), Number(molddef.color.diffuse.g), Number(molddef.color.diffuse.b));	
	
		lMaterial.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		if (imageextension.indexOf("gif") > -1 || imageextension.indexOf("png") > -1) {
			lMaterial.diffuseTexture.hasAlpha = true;
			lMaterial.useAlphaFromDiffuseTexture = true;
		}
		if (bumpid != '' || bumppath != '') {
			if (bumppath != '') {
				lMaterial.bumpTexture = new BABYLON.Texture(bumppath, scene);
			} else {
				var imageinfobump = WTW.getUploadFileData(bumpid);
				lMaterial.bumpTexture = new BABYLON.Texture.CreateFromBase64String(imageinfobump.image.src, "lMaterial" + moldname, scene);
			}
			lMaterial.bumpTexture.wAng = 180 * Math.PI / 180;
			lMaterial.bumpTexture.uScale = uscl;
			lMaterial.bumpTexture.vScale = vscl;
			lMaterial.bumpTexture.uOffset = uosl;
			lMaterial.bumpTexture.vOffset = vosl;
			lMaterial.useParallax = true;
			lMaterial.useParallaxOcclusion = true;
		}
		var imagename = "fmattexture" + moldname;
		if (WTW.adminView == 1) {
			imagename +=  WTW.getRandomString(16);
		}
		var fMaterial = new BABYLON.StandardMaterial("fmat" + moldname, scene);
		if (texturepath == '') {
			fMaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(imageinfo.image.src, "mattexture" + imageid, scene);
		} else {
			fMaterial.diffuseTexture = new BABYLON.Texture(texturepath, scene);
		}
		fMaterial.diffuseTexture.wAng = 90 * Math.PI / 180;
		fMaterial.diffuseTexture.uScale = uscf;
		fMaterial.diffuseTexture.vScale = vscf;
		fMaterial.diffuseTexture.uOffset = uosf;
		fMaterial.diffuseTexture.vOffset = vosf;
		fMaterial.alpha = opacity;
		fMaterial.specularColor = new BABYLON.Color3(Number(molddef.color.specular.r), Number(molddef.color.specular.g), Number(molddef.color.specular.b));
		fMaterial.emissiveColor = new BABYLON.Color3(Number(molddef.color.emissive.r), Number(molddef.color.emissive.g), Number(molddef.color.emissive.b));
		fMaterial.diffuseColor = new BABYLON.Color3(Number(molddef.color.diffuse.r), Number(molddef.color.diffuse.g), Number(molddef.color.diffuse.b));	
	
		fMaterial.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		if (imageextension.indexOf("gif") > -1 || imageextension.indexOf("png") > -1) {
			fMaterial.diffuseTexture.hasAlpha = true;
			fMaterial.useAlphaFromDiffuseTexture = true;
		}
		if (bumpid != '' || bumppath != '') {
			if (bumppath != '') {
				fMaterial.bumpTexture = new BABYLON.Texture(bumppath, scene);
			} else {
				var imageinfobump = WTW.getUploadFileData(bumpid);
				fMaterial.bumpTexture = new BABYLON.Texture.CreateFromBase64String(imageinfobump.image.src, "fMaterial" + moldname, scene);
			}
			fMaterial.bumpTexture.wAng = 90 * Math.PI / 180;
			fMaterial.bumpTexture.uScale = uscf;
			fMaterial.bumpTexture.vScale = vscf;
			fMaterial.bumpTexture.uOffset = uosf;
			fMaterial.bumpTexture.vOffset = vosf;
			fMaterial.useParallax = true;
			fMaterial.useParallaxOcclusion = true;
		}
		var bMaterial = new BABYLON.StandardMaterial("bmat" + moldname, scene);
		if (texturepath == '') {
			bMaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(imageinfo.image.src, "mattexture" + imageid, scene);
		} else {
			bMaterial.diffuseTexture = new BABYLON.Texture(texturepath, scene);
		}
		bMaterial.diffuseTexture.wAng = 90 * Math.PI / 180;
		bMaterial.diffuseTexture.uScale = uscb;
		bMaterial.diffuseTexture.vScale = vscb;
		bMaterial.diffuseTexture.uOffset = uosb;
		bMaterial.diffuseTexture.vOffset = vosb;
		bMaterial.diffuseTexture.alpha = alphawall;
		bMaterial.alpha = opacity;
		bMaterial.specularColor = new BABYLON.Color3(Number(molddef.color.specular.r), Number(molddef.color.specular.g), Number(molddef.color.specular.b));
		bMaterial.emissiveColor = new BABYLON.Color3(Number(molddef.color.emissive.r), Number(molddef.color.emissive.g), Number(molddef.color.emissive.b));
		bMaterial.diffuseColor = new BABYLON.Color3(Number(molddef.color.diffuse.r), Number(molddef.color.diffuse.g), Number(molddef.color.diffuse.b));	
	
		bMaterial.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		if (imageextension.indexOf("gif") > -1 || imageextension.indexOf("png") > -1) {
			bMaterial.diffuseTexture.hasAlpha = true;
			bMaterial.useAlphaFromDiffuseTexture = true;
		}
		if (bumpid != '' || bumppath != '') {
			if (bumppath != '') {
				bMaterial.bumpTexture = new BABYLON.Texture(bumppath, scene);
			} else {
				var imageinfobump = WTW.getUploadFileData(bumpid);
				bMaterial.bumpTexture = new BABYLON.Texture.CreateFromBase64String(imageinfobump.image.src, "bMaterial" + moldname, scene);
			}
			bMaterial.bumpTexture.wAng = 90 * Math.PI / 180;
			bMaterial.bumpTexture.uScale = uscb;
			bMaterial.bumpTexture.vScale = vscb;
			bMaterial.bumpTexture.uOffset = uosb;
			bMaterial.bumpTexture.vOffset = vosb;
			bMaterial.useParallax = true;
			bMaterial.useParallaxOcclusion = true;
		}
		var uMaterial = new BABYLON.StandardMaterial("umat" + moldname, scene);
		if (texturepath == '') {
			uMaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(imageinfo.image.src, "mattexture" + imageid, scene);
		} else {
			uMaterial.diffuseTexture = new BABYLON.Texture(texturepath, scene);
		}
		uMaterial.diffuseTexture.wAng = 180 * Math.PI / 180;
		uMaterial.diffuseTexture.uScale = uscu;
		uMaterial.diffuseTexture.vScale = vscu;
		uMaterial.diffuseTexture.uOffset = uosu;
		uMaterial.diffuseTexture.vOffset = vosu;
		uMaterial.diffuseTexture.alpha = alphawall;
		uMaterial.alpha = opacity;
		uMaterial.specularColor = new BABYLON.Color3(Number(molddef.color.specular.r), Number(molddef.color.specular.g), Number(molddef.color.specular.b));
		uMaterial.emissiveColor = new BABYLON.Color3(Number(molddef.color.emissive.r), Number(molddef.color.emissive.g), Number(molddef.color.emissive.b));
		uMaterial.diffuseColor = new BABYLON.Color3(Number(molddef.color.diffuse.r), Number(molddef.color.diffuse.g), Number(molddef.color.diffuse.b));	
	
		uMaterial.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		if (imageextension.indexOf("gif") > -1 || imageextension.indexOf("png") > -1) {
			uMaterial.diffuseTexture.hasAlpha = true;
			uMaterial.useAlphaFromDiffuseTexture = true;
		}
		if (bumpid != '' || bumppath != '') {
			if (bumppath != '') {
				uMaterial.bumpTexture = new BABYLON.Texture(bumppath, scene);
			} else {
				var imageinfobump = WTW.getUploadFileData(bumpid);
				uMaterial.bumpTexture = new BABYLON.Texture.CreateFromBase64String(imageinfobump.image.src, "uMaterial" + moldname, scene);
			}
			uMaterial.bumpTexture.wAng = 180 * Math.PI / 180;
			uMaterial.bumpTexture.uScale = uscu;
			uMaterial.bumpTexture.vScale = vscu;
			uMaterial.bumpTexture.uOffset = uosu;
			uMaterial.bumpTexture.vOffset = vosu;
			uMaterial.useParallax = true;
			uMaterial.useParallaxOcclusion = true;
		}
		var dMaterial = new BABYLON.StandardMaterial("dmat" + moldname, scene);
		if (texturepath == '') {
			dMaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(imageinfo.image.src, "mattexture" + imageid, scene);
		} else {
			dMaterial.diffuseTexture = new BABYLON.Texture(texturepath, scene);
		}
		dMaterial.diffuseTexture.wAng = 180 * Math.PI / 180;
		dMaterial.diffuseTexture.uScale = uscd;
		dMaterial.diffuseTexture.vScale = vscd;
		dMaterial.diffuseTexture.uOffset = uosd;
		dMaterial.diffuseTexture.vOffset = vosd;
		dMaterial.diffuseTexture.alpha = alphawall;
		dMaterial.alpha = opacity;
		dMaterial.specularColor = new BABYLON.Color3(Number(molddef.color.specular.r), Number(molddef.color.specular.g), Number(molddef.color.specular.b));
		dMaterial.emissiveColor = new BABYLON.Color3(Number(molddef.color.emissive.r), Number(molddef.color.emissive.g), Number(molddef.color.emissive.b));
		dMaterial.diffuseColor = new BABYLON.Color3(Number(molddef.color.diffuse.r), Number(molddef.color.diffuse.g), Number(molddef.color.diffuse.b));	
	
		dMaterial.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		if (imageextension.indexOf("gif") > -1 || imageextension.indexOf("png") > -1) {
			dMaterial.diffuseTexture.hasAlpha = true;
			dMaterial.useAlphaFromDiffuseTexture = true;
		}
		if (bumpid != '' || bumppath != '') {
			if (bumppath != '') {
				dMaterial.bumpTexture = new BABYLON.Texture(bumppath, scene);
			} else {
				var imageinfobump = WTW.getUploadFileData(bumpid);
				dMaterial.bumpTexture = new BABYLON.Texture.CreateFromBase64String(imageinfobump.image.src, "dMaterial" + moldname, scene);
			}
			dMaterial.bumpTexture.wAng = 180 * Math.PI / 180;
			dMaterial.bumpTexture.uScale = uscd;
			dMaterial.bumpTexture.vScale = vscd;
			dMaterial.bumpTexture.uOffset = uosd;
			dMaterial.bumpTexture.vOffset = vosd;
			dMaterial.useParallax = true;
			dMaterial.useParallaxOcclusion = true;
		}
		covering.subMaterials[0] = lMaterial;
		covering.subMaterials[1] = rMaterial;
		covering.subMaterials[2] = bMaterial;
		covering.subMaterials[3] = fMaterial;
		covering.subMaterials[4] = uMaterial;
		covering.subMaterials[5] = dMaterial;
		if (moldname.indexOf("myavatar-") > -1 || moldname.indexOf("person-") > -1) {
			covering.backFaceCulling = false;
		} else {
			covering.backFaceCulling = true;
		}
		covering.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		covering.alpha = 1;
		//covering.freeze();  // covering.unfreeze();
		//covering.isBlocking = false;
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringDirectionalTexture=" + ex.message);
	}
	return covering;
}

WTWJS.prototype.addCoveringWater = function(moldname, molddef) {
	/* water like surface material with reflection and refraction */
	var covering;
	try {
		covering = new BABYLON.WaterMaterial("mat" + moldname, scene, new BABYLON.Vector2(512, 512));
		covering.backFaceCulling = true;
		covering.bumpTexture = new BABYLON.Texture("/content/system/images/waterbump.png", scene);
		covering.windForce = -15;
		covering.waveHeight = .1;
		//covering.windDirection = new BABYLON.Vector2(1, 1);
		covering.waterColor = new BABYLON.Color3(0.2, 0.3, 0.7); // water color blended with the refraction (near)
		covering.waterColor2 = new BABYLON.Color3(0.3, 0.4, 0.8); // water color blended with the reflection (far)
		covering.colorBlendFactor = 0;
		covering.bumpHeight = 0.5;
		covering.waveLength = 0.5;			
		covering.addToRenderList(WTW.sky);
		covering.addToRenderList(WTW.extraGround);
		WTW.addReflection(covering);
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringWater=" + ex.message);
	}
	return covering;
}

WTWJS.prototype.addCoveringFire = function(moldname, molddef) {
	/* fire procedural texture */
	var covering;
	try {
		covering = new BABYLON.StandardMaterial("mat" + moldname, scene);
		var coveringfire = new BABYLON.FireProceduralTexture("matfiretex" + moldname, 256, scene);
		covering.diffuseTexture = coveringfire;
		covering.opacityTexture = coveringfire;
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringFire=" + ex.message);
	}
	return covering;
}

WTWJS.prototype.addCoveringMarble = function(moldname, molddef, lenx, leny, lenz) {
	/* marble procedural texture */
	var covering;
	try {
		var max = Math.max(Number(lenx), Number(leny), Number(lenz));
		var uscale = 1/max;
		var vscale = 1/max;
		var opacity = 1;
		if (molddef.opacity != undefined) {
			if (WTW.isNumeric(molddef.opacity)) {
				opacity = Number(molddef.opacity) / 100;
				if (opacity > 1) {
					opacity = 1;
				} else if (opacity < 0) {
					opacity = 0;
				}
			}
		}
		if (WTW.isNumeric(molddef.graphics.uscale)) {
			if (Number(molddef.graphics.uscale) > 0) {
				uscale = Number(molddef.graphics.uscale);
			}
		}
		if (WTW.isNumeric(molddef.graphics.vscale)) {
			if (Number(molddef.graphics.vscale) > 0) {
				vscale = Number(molddef.graphics.vscale);
			}
		}
		if (uscale < 1) {
			uscale = 1;
		}
		if (vscale < 1) {
			vscale = 1;
		}
		var marbleTexture = new BABYLON.MarbleProceduralTexture("matmarbletex" + moldname, 512, scene);
		marbleTexture.numberOfTilesHeight = Number(uscale).toFixed(0);
		marbleTexture.numberOfTilesWidth = Number(vscale).toFixed(0);
		covering = new BABYLON.StandardMaterial("mat" + moldname, scene);
		covering.alpha = opacity;
		covering.ambientTexture = marbleTexture;
		covering.specularColor = new BABYLON.Color3(Number(molddef.color.specular.r), Number(molddef.color.specular.g), Number(molddef.color.specular.b));
		covering.emissiveColor = new BABYLON.Color3(Number(molddef.color.emissive.r), Number(molddef.color.emissive.g), Number(molddef.color.emissive.b));
		covering.diffuseColor = new BABYLON.Color3(Number(molddef.color.diffuse.r), Number(molddef.color.diffuse.g), Number(molddef.color.diffuse.b));

		covering.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringMarble=" + ex.message);
	}
	return covering;
}

WTWJS.prototype.addCoveringRoad = function(moldname, molddef) {
	/* road procedural texture */
	var covering;
	try {
		covering = new BABYLON.StandardMaterial("mat" + moldname, scene);
		var roadTexture = new BABYLON.RoadProceduralTexture("matroadtex" + moldname, 512, scene);
		covering.diffuseTexture = roadTexture;
		covering.specularColor = new BABYLON.Color3(Number(molddef.color.specular.r), Number(molddef.color.specular.g), Number(molddef.color.specular.b));
		covering.emissiveColor = new BABYLON.Color3(Number(molddef.color.emissive.r), Number(molddef.color.emissive.g), Number(molddef.color.emissive.b));
		covering.diffuseColor = new BABYLON.Color3(Number(molddef.color.diffuse.r), Number(molddef.color.diffuse.g), Number(molddef.color.diffuse.b));

		covering.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringRoad=" + ex.message);
	}
	return covering;
}

WTWJS.prototype.addCoveringHidden = function(moldname, alpha) {
	/* hidden will make a transparent object */
	var covering;
	try {
		if (typeof alpha === "undefined") {
			alpha = 0;
		}
		covering = new BABYLON.StandardMaterial("mat" + moldname, scene);
		covering.alpha = alpha;
		covering.specularColor = new BABYLON.Color3(alpha, alpha, alpha);
		covering.emissiveColor = new BABYLON.Color3(alpha, alpha, alpha);
		covering.diffuseColor = new BABYLON.Color3(alpha, alpha, alpha);	
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringHidden=" + ex.message);
	}
	return covering;
}

WTWJS.prototype.addCovering2D = function(moldname, molddef, lenx, leny, lenz) {
	/* simple texture for a plane or disc */
	var covering;
	try {
		var uoffset = 0;
		var voffset = 0;
		var uscale = lenx / 10;
		var vscale = leny / 10;
		var textureid = "t1qlqxd6pzubzzzy";
		var texturepath = "/content/system/stock/lightgray-512x447.jpg";
		var imageextension = "";
		if (molddef != undefined) {
			if (molddef.graphics != undefined) {
				if (molddef.graphics.texture.id != undefined) {
					if (molddef.graphics.texture.id.length > 0) {
						textureid = molddef.graphics.texture.id;
					}
				}
				if (molddef.graphics.texture.path != undefined) {
					if (molddef.graphics.texture.path.length > 0) {
						texturepath = molddef.graphics.texture.path;
						texturepath = texturepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
					}
				}
				if (WTW.isNumeric(molddef.graphics.uscale)) {
					if (Number(molddef.graphics.uscale) > 0) {
						uscale = uscale * Number(molddef.graphics.uscale);
					}
				}
				if (WTW.isNumeric(molddef.graphics.vscale)) {
					if (Number(molddef.graphics.vscale) > 0) {
						vscale = vscale * Number(molddef.graphics.vscale);
					}
				}
				if (WTW.isNumeric(molddef.graphics.uoffset)) {
					if (Number(molddef.graphics.uoffset) != 0) {
						uoffset = Number(molddef.graphics.uoffset);
					}
				}
				if (WTW.isNumeric(molddef.graphics.voffset)) {
					if (Number(molddef.graphics.voffset) != 0) {
						voffset = Number(molddef.graphics.voffset);
					}
				}		
			}
		}
		covering = new BABYLON.StandardMaterial("mat" + moldname, scene);
		if (texturepath == '') {
			var imageinfo = WTW.getUploadFileData(textureid);
			imageextension = imageinfo.extension;
			texturepath = imageinfo.image.src;
		} else {
			imageextension = texturepath.substr(texturepath.length - 3).toLowerCase();
		}
		covering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(texturepath, "mattexture" + textureid, scene);
		if (imageextension.indexOf("gif") > -1 || imageextension.indexOf("png") > -1) {
			covering.diffuseTexture.hasAlpha = true;
		}
		covering.diffuseTexture.uScale = uscale;
		covering.diffuseTexture.vScale = vscale;
		covering.diffuseTexture.uOffset = uoffset;
		covering.diffuseTexture.vOffset = voffset;
		var opacity = 1;
		if (molddef.opacity != undefined) {
			if (WTW.isNumeric(molddef.opacity)) {
				opacity = Number(molddef.opacity) / 100;
				if (opacity > 1) {
					opacity = 1;
				} else if (opacity < 0) {
					opacity = 0;
				}
			}
		}
		covering.alpha = opacity;
		covering.specularColor = new BABYLON.Color3(Number(molddef.color.specular.r), Number(molddef.color.specular.g), Number(molddef.color.specular.b));
		covering.emissiveColor = new BABYLON.Color3(Number(molddef.color.emissive.r), Number(molddef.color.emissive.g), Number(molddef.color.emissive.b));
		covering.diffuseColor = new BABYLON.Color3(Number(molddef.color.diffuse.r), Number(molddef.color.diffuse.g), Number(molddef.color.diffuse.b));

		covering.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCovering2D=" + ex.message);
	}
	return covering;
}

WTWJS.prototype.addCoveringTerrain = function(moldname, molddef, lenx, leny, lenz) {
	/* terrain allows a number of configuration options including heightmap, RGB tri-color map, bump maps, etc... */
	/* the attempt was to make it work no matter what combination was supplied. so there are a lot of if-else conditions */
	/* preloading images before render */
	/* and advanced options */
	var covering;
	try {
		if (molddef.graphics.heightmap.mixmappath != '' && molddef.graphics.heightmap.texturerpath != '' && molddef.graphics.heightmap.texturegpath != '' && molddef.graphics.heightmap.texturebpath != '') {
			covering = WTW.addCoveringTerrainAdvanced(moldname, lenx, leny, lenz, molddef, molddef.graphics.heightmap.heightmappath, molddef.graphics.heightmap.mixmappath, molddef.graphics.heightmap.texturerpath, molddef.graphics.heightmap.texturegpath, molddef.graphics.heightmap.texturebpath, molddef.graphics.heightmap.texturebumprpath, molddef.graphics.heightmap.texturebumpgpath, molddef.graphics.heightmap.texturebumpbpath);
		} else if (molddef.graphics.heightmap.mixmapid != '' && molddef.graphics.heightmap.texturerid != '' && molddef.graphics.heightmap.texturegid != '' && molddef.graphics.heightmap.texturebid != '') {
			covering = WTW.loadTerrainAdvancedImages(moldname, lenx, leny, lenz, molddef.graphics.heightmap.id, molddef.parentname, molddef, molddef.coveringname, molddef.graphics.heightmap.mixmapid, molddef.graphics.heightmap.texturerid, molddef.graphics.heightmap.texturegid, molddef.graphics.heightmap.texturebid, molddef.graphics.heightmap.texturebumprid, molddef.graphics.heightmap.texturebumpgid, molddef.graphics.heightmap.texturebumpbid);
		} else {
			var uoffset = 0;
			var voffset = 0;
			var uscale = lenx / 10;
			var vscale = lenz / 10;
			var textureid = "t1qlqxd6pzubzzzy";
			var texturepath = "/content/system/stock/lightgray-512x447.jpg";
			if (molddef != undefined) {
				if (molddef.graphics != undefined) {
					if (molddef.graphics.texture.id != undefined) {
						if (molddef.graphics.texture.id.length > 0) {
							textureid = molddef.graphics.texture.id;
						}
					}
					if (molddef.graphics.texture.path != undefined) {
						if (molddef.graphics.texture.path.length > 0) {
							texturepath = molddef.graphics.texture.path;
							texturepath = texturepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
						}
					}
					if (WTW.isNumeric(molddef.graphics.uscale)) {
						if (Number(molddef.graphics.uscale) > 0) {
							uscale = uscale * Number(molddef.graphics.uscale);
						}
					}
					if (WTW.isNumeric(molddef.graphics.vscale)) {
						if (Number(molddef.graphics.vscale) > 0) {
							vscale = vscale * Number(molddef.graphics.vscale);
						}
					}
					if (WTW.isNumeric(molddef.graphics.uoffset)) {
						if (Number(molddef.graphics.uoffset) != 0) {
							uoffset = Number(molddef.graphics.uoffset);
						}
					}
					if (WTW.isNumeric(molddef.graphics.voffset)) {
						if (Number(molddef.graphics.voffset) != 0) {
							voffset = Number(molddef.graphics.voffset);
						}
					}		
				}
			}
			covering = new BABYLON.StandardMaterial("mat-" + moldname, scene);
			if (textureid != "" || texturepath != "") {
				covering.specularColor = new BABYLON.Color3(Number(molddef.color.specular.r), Number(molddef.color.specular.g), Number(molddef.color.specular.b));
				covering.emissiveColor = new BABYLON.Color3(Number(molddef.color.emissive.r), Number(molddef.color.emissive.g), Number(molddef.color.emissive.b));
				covering.diffuseColor = new BABYLON.Color3(Number(molddef.color.diffuse.r), Number(molddef.color.diffuse.g), Number(molddef.color.diffuse.b));

				covering.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
				if (texturepath != '') {
					covering.diffuseTexture = new BABYLON.Texture(texturepath, scene);
				} else {
					var imageinfo = WTW.getUploadFileData(textureid);
					covering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(imageinfo.image.src, "mattexture" + textureid, scene);
				}
				covering.diffuseTexture.uScale = uscale;
				covering.diffuseTexture.vScale = vscale;
				covering.diffuseTexture.uOffset = uoffset;
				covering.diffuseTexture.vOffset = voffset;
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringTerrain=" + ex.message);
	}
	return covering;
}

WTWJS.prototype.loadTerrainAdvancedImages = function(moldname, lenx, leny, lenz, heightmapid, parentname, molddef, coveringname, mixmapid, texturerid, texturegid, texturebid, texturebumprid, texturebumpgid, texturebumpbid) {
	/* terrain allows a number of configuration options including heightmap, RGB tri-color map, bump maps, etc... */
	/* the attempt was to make it work no matter what combination was supplied. so there are a lot of if-else conditions */
	/* preloading images before render */
	/* and advanced options */
	var covering;
	try {
		var heightmappath = molddef.graphics.heightmap.path;
		var mixmappath = molddef.graphics.heightmap.mixmappath;
		var texturerpath = molddef.graphics.heightmap.texturerpath;
		var texturegpath = molddef.graphics.heightmap.texturegpath;
		var texturebpath = molddef.graphics.heightmap.texturebpath;
		var texturebumprpath = molddef.graphics.heightmap.texturebumprpath;
		var texturebumpgpath = molddef.graphics.heightmap.texturebumpgpath;
		var texturebumpbpath = molddef.graphics.heightmap.texturebumpbpath;
		heightmappath = heightmappath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");

		if ((heightmappath != '' || WTW.isUploadReady(heightmapid)) && (mixmappath != '' || WTW.isUploadReady(mixmapid)) && (texturerpath != '' || WTW.isUploadReady(texturerid)) && (texturegpath != '' || WTW.isUploadReady(texturegid)) && (texturebpath != '' || WTW.isUploadReady(texturebid)) && (texturebumprpath != '' || WTW.isUploadReady(texturebumprid) || texturebumprid == '') && (texturebumpgpath != '' || WTW.isUploadReady(texturebumpgid) || texturebumpgid == '') && (texturebumpbpath != '' || WTW.isUploadReady(texturebumpbid) || texturebumpbid == '')) {
			var imageheightmapid = WTW.getUploadFileData(heightmapid);
			var imagemixmapid = WTW.getUploadFileData(mixmapid);
			if (mixmappath == '') {
				mixmappath = imagemixmapid.image.src;
			}
			var imagetexturerid = WTW.getUploadFileData(texturerid);
			if (texturerpath == '') {
				texturerpath = imagetexturerid.image.src;
			}
			var imagetexturegid = WTW.getUploadFileData(texturegid);
			if (texturegpath == '') {
				texturegpath = imagetexturegid.image.src;
			}
			var imagetexturebid = WTW.getUploadFileData(texturebid);
			if (texturebpath == '') {
				texturebpath = imagetexturebid.image.src;
			}
			if (molddef.graphics.heightmap.texturebumprid != '') {	
				var imagetexturebumprid = WTW.getUploadFileData(texturebumprid);
				if (molddef.graphics.heightmap.texturebumpgid != '') {	
					var imagetexturebumpgid = WTW.getUploadFileData(texturebumpgid);
					if (molddef.graphics.heightmap.texturebumpbid != '') {	
						var imagetexturebumpbid = WTW.getUploadFileData(texturebumpbid);
						covering = WTW.addCoveringTerrainAdvanced(moldname, lenx, leny, lenz, molddef, heightmappath, mixmappath, texturerpath, texturegpath, texturebpath, texturebumprpath, texturebumpgpath, texturebumpbpath);
					} else {
						var imagetexturebumpbid = null;
						covering = WTW.addCoveringTerrainAdvanced(moldname, lenx, leny, lenz, molddef, heightmappath, mixmappath, texturerpath, texturegpath, texturebpath, texturebumprpath, texturebumpgpath, texturebumpbpath);
					}
				} else {
					var imagetexturebumpgid = null;
					if (molddef.graphics.heightmap.texturebumpbid != '') {	
						var imagetexturebumpbid = WTW.getUploadFileData(texturebumpbid);
						covering = WTW.addCoveringTerrainAdvanced(moldname, lenx, leny, lenz, molddef, heightmappath, mixmappath, texturerpath, texturegpath, texturebpath, texturebumprpath, texturebumpgpath, texturebumpbpath);
					} else {
						var imagetexturebumpbid = null;
						covering = WTW.addCoveringTerrainAdvanced(moldname, lenx, leny, lenz, molddef, heightmappath, mixmappath, texturerpath, texturegpath, texturebpath, texturebumprpath, texturebumpgpath, texturebumpbpath);
					}
				}
			} else {
				var imagetexturebumprid = null;
				if (molddef.graphics.heightmap.texturebumpgid != '') {	
					var imagetexturebumpgid = WTW.getUploadFileData(texturebumpgid);
					if (molddef.graphics.heightmap.texturebumpbid != '') {	
						var imagetexturebumpbid = WTW.getUploadFileData(texturebumpbid);
						covering = WTW.addCoveringTerrainAdvanced(moldname, lenx, leny, lenz, molddef, heightmappath, mixmappath, texturerpath, texturegpath, texturebpath, texturebumprpath, texturebumpgpath, texturebumpbpath);
					} else {
						var imagetexturebumpbid = null;
						covering = WTW.addCoveringTerrainAdvanced(moldname, lenx, leny, lenz, molddef, heightmappath, mixmappath, texturerpath, texturegpath, texturebpath, texturebumprpath, texturebumpgpath, texturebumpbpath);
					}
				} else {
					var imagetexturebumpgid = null;
					if (molddef.graphics.heightmap.texturebumpbid != '') {	
						var imagetexturebumpbid = WTW.getUploadFileData(texturebumpbid);
						covering = WTW.addCoveringTerrainAdvanced(moldname, lenx, leny, lenz, molddef, heightmappath, mixmappath, texturerpath, texturegpath, texturebpath, texturebumprpath, texturebumpgpath, texturebumpbpath);
					} else {
						var imagetexturebumpbid = null;
						covering = WTW.addCoveringTerrainAdvanced(moldname, lenx, leny, lenz, molddef, heightmappath, mixmappath, texturerpath, texturegpath, texturebpath, texturebumprpath, texturebumpgpath, texturebumpbpath);
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n loadTerrainAdvancedImages=" + ex.message);
	}
	return covering;
}

WTWJS.prototype.addCoveringTerrainAdvanced = function(moldname, lenx, leny, lenz, molddef, heightmappath, mixmappath, texturerpath, texturegpath, texturebpath, texturebumprpath, texturebumpgpath, texturebumpbpath) {
	/* terrain allows a number of configuration options including heightmap, RGB tri-color map, bump maps, etc... */
	/* the attempt was to make it work no matter what combination was supplied. so there are a lot of if-else conditions */
	/* preloading images before render */
	/* and advanced options */
	var covering;
	try {
		var uoffset = 0;
		var voffset = 0;
		var uscale = 10;
		var vscale = 10;
		if (molddef != undefined) {
			if (molddef.graphics != undefined) {
				if (WTW.isNumeric(molddef.graphics.uscale)) {
					if (Number(molddef.graphics.uscale) > 0) {
						uscale = Number(molddef.graphics.uscale);
					}
				}
				if (WTW.isNumeric(molddef.graphics.vscale)) {
					if (Number(molddef.graphics.vscale) > 0) {
						vscale = Number(molddef.graphics.vscale);
					}
				}
				if (WTW.isNumeric(molddef.graphics.uoffset)) {
					if (Number(molddef.graphics.uoffset) != 0) {
						uoffset = Number(molddef.graphics.uoffset);
					}
				}
				if (WTW.isNumeric(molddef.graphics.voffset)) {
					if (Number(molddef.graphics.voffset) != 0) {
						voffset = Number(molddef.graphics.voffset);
					}
				}		
			}
		}	
		mixmappath = mixmappath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
		texturerpath = texturerpath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
		texturegpath = texturegpath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
		texturebpath = texturebpath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
		texturebumprpath = texturebumprpath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
		texturebumpgpath = texturebumpgpath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
		texturebumpbpath = texturebumpbpath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
		
		// Create terrain material
		var covering = new BABYLON.TerrainMaterial("mat" + moldname, scene);
		covering.specularColor = new BABYLON.Color3(Number(molddef.color.specular.r), Number(molddef.color.specular.g), Number(molddef.color.specular.b));
//		covering.emissiveColor = new BABYLON.Color3(Number(molddef.color.emissive.r), Number(molddef.color.emissive.g), Number(molddef.color.emissive.b));
		covering.diffuseColor = new BABYLON.Color3(Number(molddef.color.diffuse.r), Number(molddef.color.diffuse.g), Number(molddef.color.diffuse.b));
		covering.specularPower = 64;
		
//		covering.emissiveColor = new BABYLON.Color3(1,1,1);
//		covering.specularColor = new BABYLON.Color3(1,1,1);
//		covering.diffuseColor = new BABYLON.Color3(1,1,1);

		covering.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);

		// Set the mix texture (represents the RGB values)
		covering.mixTexture = new BABYLON.Texture(mixmappath, scene);
		// Diffuse textures following the RGB values of the mix map
		// diffuseTexture1: Red
		// diffuseTexture2: Green
		// diffuseTexture3: Blue
		covering.diffuseTexture1 = new BABYLON.Texture(texturerpath, scene);
		covering.diffuseTexture2 = new BABYLON.Texture(texturegpath, scene);
		covering.diffuseTexture3 = new BABYLON.Texture(texturebpath, scene);
		
		// Bump textures according to the previously set diffuse textures
		if (molddef.graphics.heightmap.texturebumprid != '') {	
			covering.bumpTexture1 = new BABYLON.Texture(texturebumprpath, scene);
		}
		if (molddef.graphics.heightmap.texturebumpgid != '') {	
			covering.bumpTexture2 = new BABYLON.Texture(texturebumpgpath, scene);
		}
		if (molddef.graphics.heightmap.texturebumpbid != '') {	
			covering.bumpTexture3 = new BABYLON.Texture(texturebumpbpath, scene);
		}

		// Rescale textures according to the terrain
		covering.diffuseTexture1.uScale = uscale;
		covering.diffuseTexture1.vScale = vscale;
		covering.diffuseTexture2.uScale = uscale;
		covering.diffuseTexture2.vScale = vscale;
		covering.diffuseTexture3.uScale = uscale;
		covering.diffuseTexture3.vScale = vscale;								
		covering.diffuseTexture1.uOffset = uoffset;
		covering.diffuseTexture1.vOffset = uoffset;
		covering.diffuseTexture2.uOffset = uoffset;
		covering.diffuseTexture2.vOffset = uoffset;
		covering.diffuseTexture3.uOffset = uoffset;
		covering.diffuseTexture3.vOffset = uoffset;								
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringTerrainAdvanced=" + ex.message);
	}
	return covering;
}
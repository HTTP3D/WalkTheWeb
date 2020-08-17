/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions create the various coverings */

/* materials vs coverings - materials are loaded on the meshes in the scene, coverings are the definitions that create the materials to be added the mesh on demand */

WTWJS.prototype.addCoveringWire = function(zmoldname, zmolddef) {
	/* wireframe the mold instead of adding a material */
	var zcovering;
	try {
		zcovering = "none";
		var zmold = scene.getMeshByID(zmoldname);
		if (zmold != null) {
			zmold.wireframe = true;
		}
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringWire=" + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCoveringColor = function(zmoldname, zmolddef) {
	/* set the color of the mold - works alone and with a texture to tint the texture */
	var zcovering;
	try {
		var zopacity = 1;
		if (zmolddef.opacity != undefined) {
			if (WTW.isNumeric(zmolddef.opacity)) {
				zopacity = Number(zmolddef.opacity) / 100;
				if (zopacity > 1) {
					zopacity = 1;
				} else if (zopacity < 0) {
					zopacity = 0;
				}
			}
		}
		zcovering = new BABYLON.StandardMaterial("mat" + zmoldname, scene);
		zcovering.alpha = zopacity;
		zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringColor=" + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCoveringGlass = function(zmoldname, zmolddef) {
	/* basically a color material with an opacity of .2 (or 20%) */
	/* you can also achieve this with a color or texture with an opacity set in advanced options on the form */
	var zcovering;
	try {
		WTW.disposeMaterial("mat" + zmoldname);		
		zcovering = new BABYLON.StandardMaterial("mat" + zmoldname, scene);
		var zopacity = .2;
		zcovering.alpha = zopacity;
		zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringGlass=" + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCoveringMirror = function(zmoldname, zmolddef) {
	/* work in progress - adds a mirror surface to a mold and will load the molds that will reflect in that surface */
	var zcovering;
	try {
		var zmirrorLevel = .9;
		var zopacity = 1;
/*		if (zmolddef.opacity != undefined) {
			if (WTW.isNumeric(zmolddef.opacity)) {
				zopacity = Number(zmolddef.opacity) / 100;
				if (zopacity > 1) {
					zopacity = 1;
				} else if (zopacity < 0) {
					zopacity = 0;
				}
			}
		}*/
		zcovering = new BABYLON.StandardMaterial("mat" + zmoldname, scene);
		zcovering.reflectionTexture = new BABYLON.MirrorTexture("matmirror" + zmoldname, 1024, scene, true);
		zcovering.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, 0, 1, -10.0);
		//zcovering.reflectionTexture.renderList = [WTW.sky, WTW.extraGround];
		zcovering.reflectionTexture.level = zmirrorLevel;
		zcovering.alpha = zopacity;
		zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);
		WTW.initMirrorLoadZone(zmoldname, zmolddef);
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringMirror=" + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCoveringTexture = function(zmoldname, zmolddef, zlenx, zleny, zlenz, zspecial1, zspecial2) {
	/* basic add texture material to mold - attempts to scale the texture on the surface (which can be overwritten in the advanced options of the form) */
	var zcovering;
	try {
		var zshape = "box"; 
		var zuoffset = 0;
		var zvoffset = 0;
		var zuscale = zlenx/10;
		var zvscale = zleny/10;
		if (zlenz > zlenx) {
			zvscale = zlenz/10;
			zuscale = zleny/10;
		}
		if (zleny < zlenx && zleny < zlenz) {
			zuscale = zlenz/10;
			zvscale = zlenx/10;
		}
		var zimageid = "t1qlqxd6pzubzzzy";
		var ztexturepath = "";
		var zbumpid = "";
		var zbumppath = "";
		if (zmolddef != undefined) {
			if (zmolddef.shape != "") {
				zshape = zmolddef.shape;
			}
			if (zshape == "sphere" || zshape == "dome" || zshape == "cone") {
				zuscale = ((zlenx/10 + zlenz/10) / 2) * Math.PI;
				zvscale = zvscale * Math.PI;
			} else if (zshape == "cylinder") {
				zuscale = ((zlenx + zlenz) / 2) / Math.PI;
				zvscale = 1;
			} else if (zshape == "half pipe") {
				zuscale = zlenx / 10;
				zvscale = zlenz / 10;
			}
			if (zmolddef.graphics != undefined) {
				if (zmolddef.graphics.texture.id != undefined) {
					zimageid = zmolddef.graphics.texture.id;
				}
				if (zmolddef.graphics.texture.path != undefined) {
					ztexturepath = zmolddef.graphics.texture.path;
					ztexturepath = ztexturepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
				}
				if (zmolddef.graphics.texture.bumpid != undefined) {
					zbumpid = zmolddef.graphics.texture.bumpid;
				}
				if (zmolddef.graphics.texture.bumppath != undefined) {
					zbumppath = zmolddef.graphics.texture.bumppath;
					zbumppath = zbumppath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
				}
				if (WTW.isNumeric(zmolddef.graphics.uscale)) {
					if (Number(zmolddef.graphics.uscale) > 0) {
						zuscale = zuscale * Number(zmolddef.graphics.uscale);
					}
				}
				if (WTW.isNumeric(zmolddef.graphics.vscale)) {
					if (Number(zmolddef.graphics.vscale) > 0) {
						zvscale = zvscale * Number(zmolddef.graphics.vscale);
					}
				}
				if (WTW.isNumeric(zmolddef.graphics.uoffset)) {
					if (Number(zmolddef.graphics.uoffset) != 0) {
						zuoffset = Number(zmolddef.graphics.uoffset);
					}
				}
				if (WTW.isNumeric(zmolddef.graphics.voffset)) {
					if (Number(zmolddef.graphics.voffset) != 0) {
						zvoffset = Number(zmolddef.graphics.voffset);
					}
				}	
			}
		}
		WTW.disposeMaterial("mat" + zmoldname);		
		zcovering = new BABYLON.StandardMaterial("mat" + zmoldname, scene);
		zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);

		var zimageextension = "";
		if (ztexturepath == '') {
			var zimageinfo = WTW.getUploadFileData(zimageid);
			zimageextension = zimageinfo.extension;
			zcovering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.image.src, "mattexture" + zimageid, scene);
		} else {
			zcovering.diffuseTexture = new BABYLON.Texture(ztexturepath, scene);
			zimageextension = ztexturepath.substr(ztexturepath.length - 3).toLowerCase();
		}
		zcovering.diffuseTexture.uScale = zuscale;
		zcovering.diffuseTexture.vScale = zvscale;
		zcovering.diffuseTexture.uOffset = zuoffset;
		zcovering.diffuseTexture.vOffset = zvoffset;
		if (zimageextension.indexOf("gif") > -1 || zimageextension.indexOf("png") > -1) {
			zcovering.diffuseTexture.hasAlpha = true;
		}	
		if (zbumpid != '' || zbumppath != '') {
			if (zbumppath != '') {
				zcovering.bumpTexture = new BABYLON.Texture(zbumppath, scene);
			} else {
				var zimageinfobump = WTW.getUploadFileData(zbumpid);
				zcovering.bumpTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfobump.image.src, "mattexture" + zbumpid, scene);
			}
			zcovering.bumpTexture.uScale = zuscale;
			zcovering.bumpTexture.vScale = zvscale;
			zcovering.bumpTexture.uOffset = zuoffset;
			zcovering.bumpTexture.vOffset = zvoffset;
			zcovering.useParallax = true;
			zcovering.useParallaxOcclusion = true;
		}

		//zcovering.freeze();  // zcovering.unfreeze();
		//zcovering.isBlocking = false;
		//zcovering.forceCompilation(mold, function() {
//					mold.simplify([{ quality: 0.9, distance: 50 }, { quality: 0.5, distance: 80 }, { quality: 0.3, distance: 100 }, { quality: 0.1, distance: 180 }], true, BABYLON.SimplificationType.QUADRATIC, function() {
//					zcovering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.image.src, "mattexture" + zimageid, scene);
//				});
		//});
		if (zmoldname.indexOf("myavatar-") > -1 || zmoldname.indexOf("person-") > -1) {
			zcovering.backFaceCulling = false;
		} else {
			zcovering.backFaceCulling = true;
		}
		var zopacity = 1;
		if (zmolddef.opacity != undefined) {
			if (WTW.isNumeric(zmolddef.opacity)) {
				zopacity = Number(zmolddef.opacity) / 100;
				if (zopacity > 1) {
					zopacity = 1;
				} else if (zopacity < 0) {
					zopacity = 0;
				}
			}
		}
		zcovering.alpha = zopacity;
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringTexture=" + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCoveringDirectionalTexture = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	/* texture applied to cubes that will make texture aling around the cube (like for a brick wall) */
	var zcovering;
	try {
		var zalpha = 1;
		var zuoffset = 0;
		var zvoffset = 0;
		var zuscale = 0;
		var zvscale = 0;
		var zuscf = zleny/10; 
		var zvscf = zlenz/10;
		var zuscb = zleny/10; 
		var zvscb = zlenz/10; 
		var zuscl = zlenx/10; 
		var zvscl = zleny/10; 
		var zuscr = zlenx/10; 
		var zvscr = zleny/10; 
		var zuscu = zlenz/10; 
		var zvscu = zlenx/10; 
		var zuscd = zlenz/10; 
		var zvscd = zlenx/10; 
		var zuosf = 0; 
		var zvosf = 0; 
		var zuosb = 0; 
		var zvosb = 0; 
		var zuosl = 0; 
		var zvosl = 0; 
		var zuosr = 0; 
		var zvosr = 0; 
		var zuosu = 0; 
		var zvosu = 0; 
		var zuosd = 0; 
		var zvosd = 0; 
		var zimageid = "t1qlqxd6pzubzzzy";
		var ztexturepath = "";
		var zbumpid = "";
		var zbumppath = "";
		var zopacity = 1;
		var zimageextension = "";
		if (zmolddef != undefined) {
			if (zmolddef.opacity != undefined) {
				if (WTW.isNumeric(zmolddef.opacity)) {
					zopacity = Number(zmolddef.opacity) / 100;
					if (zopacity > 1) {
						zopacity = 1;
					} else if (zopacity < 0) {
						zopacity = 0;
					}
				}
			}
			if (zmolddef.graphics != undefined) {
				if (zmolddef.graphics.texture.id != undefined) {
					if (zmolddef.graphics.texture.id != "") {
						zimageid = zmolddef.graphics.texture.id;
					}
				}
				if (zmolddef.graphics.texture.path != undefined) {
					if (zmolddef.graphics.texture.path != "") {
						ztexturepath = zmolddef.graphics.texture.path;
						ztexturepath = ztexturepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
					}
				}
				if (zmolddef.graphics.texture.bumpid != undefined) {
					zbumpid = zmolddef.graphics.texture.bumpid;
				}
				if (zmolddef.graphics.texture.bumppath != undefined) {
					zbumppath = zmolddef.graphics.texture.bumppath;
					zbumppath = zbumppath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
				}
				if (WTW.isNumeric(zmolddef.graphics.uscale)) {
					if (Number(zmolddef.graphics.uscale) > 0) {
						zuscale = Number(zmolddef.graphics.uscale);
					}
				}
				if (WTW.isNumeric(zmolddef.graphics.vscale)) {
					if (Number(zmolddef.graphics.vscale) > 0) {
						zvscale = Number(zmolddef.graphics.vscale);
					}
				}
				if (WTW.isNumeric(zmolddef.graphics.uoffset)) {
					if (Number(zmolddef.graphics.uoffset) != 0) {
						zuoffset = Number(zmolddef.graphics.uoffset);
					}
				}
				if (WTW.isNumeric(zmolddef.graphics.voffset)) {
					if (Number(zmolddef.graphics.voffset) != 0) {
						zvoffset = Number(zmolddef.graphics.voffset);
					}
				}	
				if (WTW.isNumeric(zmolddef.graphics.uscale)) {
					if (Number(zmolddef.graphics.uscale) > 0) {
						zuscale = Number(zmolddef.graphics.uscale);
						zuscf = zleny/10 * zuscale; 
						zuscb = zleny/10 * zuscale; 
						zuscl = zlenx/10 * zuscale; 
						zuscr = zlenx/10 * zuscale; 
						zuscu = zlenz/10 * zuscale; 
						zuscd = zlenz/10 * zuscale; 
					}
				}
				if (WTW.isNumeric(zmolddef.graphics.vscale)) {
					if (Number(zmolddef.graphics.vscale) > 0) {
						zvscale = Number(zmolddef.graphics.vscale);
						zvscf = zlenz/10 * zvscale;
						zvscb = zlenz/10 * zvscale; 
						zvscl = zleny/10 * zvscale; 
						zvscr = zleny/10 * zvscale; 
						zvscu = zlenx/10 * zvscale; 
						zvscd = zlenx/10 * zvscale; 
					}
				}
				if (WTW.isNumeric(zmolddef.graphics.uoffset)) {
					if (Number(zmolddef.graphics.uoffset) != 0) {
						zuoffset = Number(zmolddef.graphics.uoffset);
						zuosf = zuoffset; 
						zuosb = zuoffset; 
						zuosl = zuoffset; 
						zuosr = zuoffset; 
						zuosu = zuoffset; 
						zuosd = zuoffset; 
					}
				}
				if (WTW.isNumeric(zmolddef.graphics.voffset)) {
					if (Number(zmolddef.graphics.voffset) != 0) {
						zvoffset = Number(zmolddef.graphics.voffset);
						zvosf = zvoffset; 
						zvosb = zvoffset; 
						zvosl = zvoffset; 
						zvosr = zvoffset; 
						zvosu = zvoffset; 
						zvosd = zvoffset; 
					}
				}		
			}
		}
		var zmold = scene.getMeshByID(zmoldname);
		if (zmold != null) {
			if (zmold.material != null) {
				if (zmold.material.subMaterials != undefined) {
					for (var i=0;i < zmold.material.subMaterials.length;i++) {
						if (zmold.material.subMaterials[i].diffuseTexture != undefined) {
							if (zmold.material.subMaterials[i].diffuseTexture != null) {
								zmold.material.subMaterials[i].diffuseTexture.dispose();
								zmold.material.subMaterials[i].diffuseTexture = null;
							}
						}
					}
				}
				
			}
			zmold.subMeshes = [];
			if (zmold.subMeshes.length < 12) {
				zmold.subMeshes.push(new BABYLON.SubMesh(0, 0, 4, 0, 6, zmold));
				zmold.subMeshes.push(new BABYLON.SubMesh(1, 4, 4, 6, 6, zmold));
				zmold.subMeshes.push(new BABYLON.SubMesh(2, 8, 4, 12, 6, zmold));
				zmold.subMeshes.push(new BABYLON.SubMesh(3, 12, 4, 18, 6, zmold));
				zmold.subMeshes.push(new BABYLON.SubMesh(4, 16, 4, 24, 6, zmold));
				zmold.subMeshes.push(new BABYLON.SubMesh(5, 20, 4, 30, 6, zmold));
			}		
		}
		zcovering = new BABYLON.MultiMaterial("cubemat" + zmoldname, scene);
		var rMaterial = new BABYLON.StandardMaterial("rmat" + zmoldname, scene);
		var zimageinfo;
		var zimageextension = '';
		if (ztexturepath == '') {
			zimageinfo = WTW.getUploadFileData(zimageid);
			zimageextension = zimageinfo.extension;
			rMaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.image.src, "mattexture" + zimageid, scene);
		} else {
			rMaterial.diffuseTexture = new BABYLON.Texture(ztexturepath, scene);
			zimageextension = ztexturepath.substr(ztexturepath.length - 3).toLowerCase();
		}
		rMaterial.diffuseTexture.wAng = 0 * Math.PI / 180;
		rMaterial.diffuseTexture.uScale = zuscr;
		rMaterial.diffuseTexture.vScale = zvscr;
		rMaterial.diffuseTexture.uOffset = zuosr;
		rMaterial.diffuseTexture.vOffset = zvosr;
		rMaterial.diffuseTexture.alpha = zalpha;
		rMaterial.alpha = zopacity;
		rMaterial.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		rMaterial.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		rMaterial.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		rMaterial.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);

		if (zimageextension.indexOf("gif") > -1 || zimageextension.indexOf("png") > -1) {
			rMaterial.diffuseTexture.hasAlpha = true;
			rMaterial.useAlphaFromDiffuseTexture = true;
		}
		if (zbumpid != '' || zbumppath != '') {
			if (zbumppath != '') {
				rMaterial.bumpTexture = new BABYLON.Texture(zbumppath, scene);
			} else {
				var zimageinfobump = WTW.getUploadFileData(zbumpid);
				rMaterial.bumpTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfobump.image.src, "rMaterial" + zmoldname, scene);
			}
			rMaterial.bumpTexture.wAng = 0 * Math.PI / 180;
			rMaterial.bumpTexture.uScale = zuscr;
			rMaterial.bumpTexture.vScale = zvscr;
			rMaterial.bumpTexture.uOffset = zuosr;
			rMaterial.bumpTexture.vOffset = zvosr;
			rMaterial.useParallax = true;
			rMaterial.useParallaxOcclusion = true;
		}
		var lMaterial = new BABYLON.StandardMaterial("lmat" + zmoldname, scene);
		if (ztexturepath == '') {
			lMaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.image.src, "mattexture" + zimageid, scene);
		} else {
			lMaterial.diffuseTexture = new BABYLON.Texture(ztexturepath, scene);
		}
		lMaterial.diffuseTexture.wAng = 180 * Math.PI / 180;
		lMaterial.diffuseTexture.uScale = zuscl;
		lMaterial.diffuseTexture.vScale = zvscl;
		lMaterial.diffuseTexture.uOffset = zuosl;
		lMaterial.diffuseTexture.vOffset = zvosl;
		lMaterial.alpha = zopacity;
		lMaterial.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		lMaterial.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		lMaterial.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		lMaterial.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);

		if (zimageextension.indexOf("gif") > -1 || zimageextension.indexOf("png") > -1) {
			lMaterial.diffuseTexture.hasAlpha = true;
			lMaterial.useAlphaFromDiffuseTexture = true;
		}
		if (zbumpid != '' || zbumppath != '') {
			if (zbumppath != '') {
				lMaterial.bumpTexture = new BABYLON.Texture(zbumppath, scene);
			} else {
				var zimageinfobump = WTW.getUploadFileData(zbumpid);
				lMaterial.bumpTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfobump.image.src, "lMaterial" + zmoldname, scene);
			}
			lMaterial.bumpTexture.wAng = 180 * Math.PI / 180;
			lMaterial.bumpTexture.uScale = zuscl;
			lMaterial.bumpTexture.vScale = zvscl;
			lMaterial.bumpTexture.uOffset = zuosl;
			lMaterial.bumpTexture.vOffset = zvosl;
			lMaterial.useParallax = true;
			lMaterial.useParallaxOcclusion = true;
		}
		var imagename = "fmattexture" + zmoldname;
		if (WTW.adminView == 1) {
			imagename +=  WTW.getRandomString(16);
		}
		var fMaterial = new BABYLON.StandardMaterial("fmat" + zmoldname, scene);
		if (ztexturepath == '') {
			fMaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.image.src, "mattexture" + zimageid, scene);
		} else {
			fMaterial.diffuseTexture = new BABYLON.Texture(ztexturepath, scene);
		}
		fMaterial.diffuseTexture.wAng = 90 * Math.PI / 180;
		fMaterial.diffuseTexture.uScale = zuscf;
		fMaterial.diffuseTexture.vScale = zvscf;
		fMaterial.diffuseTexture.uOffset = zuosf;
		fMaterial.diffuseTexture.vOffset = zvosf;
		fMaterial.alpha = zopacity;
		fMaterial.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		fMaterial.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		fMaterial.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		fMaterial.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);

		if (zimageextension.indexOf("gif") > -1 || zimageextension.indexOf("png") > -1) {
			fMaterial.diffuseTexture.hasAlpha = true;
			fMaterial.useAlphaFromDiffuseTexture = true;
		}
		if (zbumpid != '' || zbumppath != '') {
			if (zbumppath != '') {
				fMaterial.bumpTexture = new BABYLON.Texture(zbumppath, scene);
			} else {
				var zimageinfobump = WTW.getUploadFileData(zbumpid);
				fMaterial.bumpTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfobump.image.src, "fMaterial" + zmoldname, scene);
			}
			fMaterial.bumpTexture.wAng = 90 * Math.PI / 180;
			fMaterial.bumpTexture.uScale = zuscf;
			fMaterial.bumpTexture.vScale = zvscf;
			fMaterial.bumpTexture.uOffset = zuosf;
			fMaterial.bumpTexture.vOffset = zvosf;
			fMaterial.useParallax = true;
			fMaterial.useParallaxOcclusion = true;
		}
		var bMaterial = new BABYLON.StandardMaterial("bmat" + zmoldname, scene);
		if (ztexturepath == '') {
			bMaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.image.src, "mattexture" + zimageid, scene);
		} else {
			bMaterial.diffuseTexture = new BABYLON.Texture(ztexturepath, scene);
		}
		bMaterial.diffuseTexture.wAng = 90 * Math.PI / 180;
		bMaterial.diffuseTexture.uScale = zuscb;
		bMaterial.diffuseTexture.vScale = zvscb;
		bMaterial.diffuseTexture.uOffset = zuosb;
		bMaterial.diffuseTexture.vOffset = zvosb;
		bMaterial.diffuseTexture.alpha = zalpha;
		bMaterial.alpha = zopacity;
		bMaterial.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		bMaterial.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		bMaterial.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		bMaterial.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);

		if (zimageextension.indexOf("gif") > -1 || zimageextension.indexOf("png") > -1) {
			bMaterial.diffuseTexture.hasAlpha = true;
			bMaterial.useAlphaFromDiffuseTexture = true;
		}
		if (zbumpid != '' || zbumppath != '') {
			if (zbumppath != '') {
				bMaterial.bumpTexture = new BABYLON.Texture(zbumppath, scene);
			} else {
				var zimageinfobump = WTW.getUploadFileData(zbumpid);
				bMaterial.bumpTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfobump.image.src, "bMaterial" + zmoldname, scene);
			}
			bMaterial.bumpTexture.wAng = 90 * Math.PI / 180;
			bMaterial.bumpTexture.uScale = zuscb;
			bMaterial.bumpTexture.vScale = zvscb;
			bMaterial.bumpTexture.uOffset = zuosb;
			bMaterial.bumpTexture.vOffset = zvosb;
			bMaterial.useParallax = true;
			bMaterial.useParallaxOcclusion = true;
		}
		var uMaterial = new BABYLON.StandardMaterial("umat" + zmoldname, scene);
		if (ztexturepath == '') {
			uMaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.image.src, "mattexture" + zimageid, scene);
		} else {
			uMaterial.diffuseTexture = new BABYLON.Texture(ztexturepath, scene);
		}
		uMaterial.diffuseTexture.wAng = 180 * Math.PI / 180;
		uMaterial.diffuseTexture.uScale = zuscu;
		uMaterial.diffuseTexture.vScale = zvscu;
		uMaterial.diffuseTexture.uOffset = zuosu;
		uMaterial.diffuseTexture.vOffset = zvosu;
		uMaterial.diffuseTexture.alpha = zalpha;
		uMaterial.alpha = zopacity;
		uMaterial.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		uMaterial.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		uMaterial.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		uMaterial.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);

		if (zimageextension.indexOf("gif") > -1 || zimageextension.indexOf("png") > -1) {
			uMaterial.diffuseTexture.hasAlpha = true;
			uMaterial.useAlphaFromDiffuseTexture = true;
		}
		if (zbumpid != '' || zbumppath != '') {
			if (zbumppath != '') {
				uMaterial.bumpTexture = new BABYLON.Texture(zbumppath, scene);
			} else {
				var zimageinfobump = WTW.getUploadFileData(zbumpid);
				uMaterial.bumpTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfobump.image.src, "uMaterial" + zmoldname, scene);
			}
			uMaterial.bumpTexture.wAng = 180 * Math.PI / 180;
			uMaterial.bumpTexture.uScale = zuscu;
			uMaterial.bumpTexture.vScale = zvscu;
			uMaterial.bumpTexture.uOffset = zuosu;
			uMaterial.bumpTexture.vOffset = zvosu;
			uMaterial.useParallax = true;
			uMaterial.useParallaxOcclusion = true;
		}
		var dMaterial = new BABYLON.StandardMaterial("dmat" + zmoldname, scene);
		if (ztexturepath == '') {
			dMaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.image.src, "mattexture" + zimageid, scene);
		} else {
			dMaterial.diffuseTexture = new BABYLON.Texture(ztexturepath, scene);
		}
		dMaterial.diffuseTexture.wAng = 180 * Math.PI / 180;
		dMaterial.diffuseTexture.uScale = zuscd;
		dMaterial.diffuseTexture.vScale = zvscd;
		dMaterial.diffuseTexture.uOffset = zuosd;
		dMaterial.diffuseTexture.vOffset = zvosd;
		dMaterial.diffuseTexture.alpha = zalpha;
		dMaterial.alpha = zopacity;
		dMaterial.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		dMaterial.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		dMaterial.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		dMaterial.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);

		if (zimageextension.indexOf("gif") > -1 || zimageextension.indexOf("png") > -1) {
			dMaterial.diffuseTexture.hasAlpha = true;
			dMaterial.useAlphaFromDiffuseTexture = true;
		}
		if (zbumpid != '' || zbumppath != '') {
			if (zbumppath != '') {
				dMaterial.bumpTexture = new BABYLON.Texture(zbumppath, scene);
			} else {
				var zimageinfobump = WTW.getUploadFileData(zbumpid);
				dMaterial.bumpTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfobump.image.src, "dMaterial" + zmoldname, scene);
			}
			dMaterial.bumpTexture.wAng = 180 * Math.PI / 180;
			dMaterial.bumpTexture.uScale = zuscd;
			dMaterial.bumpTexture.vScale = zvscd;
			dMaterial.bumpTexture.uOffset = zuosd;
			dMaterial.bumpTexture.vOffset = zvosd;
			dMaterial.useParallax = true;
			dMaterial.useParallaxOcclusion = true;
		}
		zcovering.subMaterials[0] = lMaterial;
		zcovering.subMaterials[1] = rMaterial;
		zcovering.subMaterials[2] = bMaterial;
		zcovering.subMaterials[3] = fMaterial;
		zcovering.subMaterials[4] = uMaterial;
		zcovering.subMaterials[5] = dMaterial;
		if (zmoldname.indexOf("myavatar-") > -1 || zmoldname.indexOf("person-") > -1) {
			zcovering.backFaceCulling = false;
		} else {
			zcovering.backFaceCulling = true;
		}
		zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);

		zcovering.alpha = 1;
		//zcovering.freeze();  // zcovering.unfreeze();
		//zcovering.isBlocking = false;
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringDirectionalTexture=" + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCoveringWater = function(zmoldname, zmolddef) {
	/* water like surface material with reflection and refraction */
	var zcovering;
	try {
		zcovering = new BABYLON.WaterMaterial("mat" + zmoldname, scene, new BABYLON.Vector2(512, 512));
		zcovering.backFaceCulling = true;
		zcovering.bumpTexture = new BABYLON.Texture("/content/system/images/waterbump.png", scene);
		zcovering.windForce = -15;
		zcovering.waveHeight = .1;
		//zcovering.windDirection = new BABYLON.Vector2(1, 1);
		zcovering.waterColor = new BABYLON.Color3(0.2, 0.3, 0.7); // water color blended with the refraction (near)
		zcovering.waterColor2 = new BABYLON.Color3(0.3, 0.4, 0.8); // water color blended with the reflection (far)
		zcovering.colorBlendFactor = 0;
		zcovering.bumpHeight = 0.5;
		zcovering.waveLength = 0.5;			
		zcovering.addToRenderList(WTW.sky);
		zcovering.addToRenderList(WTW.extraGround);
		WTW.addReflection(zcovering);
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringWater=" + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCoveringFire = function(zmoldname, zmolddef) {
	/* fire procedural texture */
	var zcovering;
	try {
		zcovering = new BABYLON.StandardMaterial("mat" + zmoldname, scene);
		var zcoveringfire = new BABYLON.FireProceduralTexture("matfiretex" + zmoldname, 256, scene);
		zcovering.diffuseTexture = zcoveringfire;
		zcovering.opacityTexture = zcoveringfire;
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringFire=" + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCoveringMarble = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	/* marble procedural texture */
	var zcovering;
	try {
		var zmax = Math.max(Number(zlenx), Number(zleny), Number(zlenz));
		var zuscale = 1/zmax;
		var zvscale = 1/zmax;
		var zopacity = 1;
		if (zmolddef.opacity != undefined) {
			if (WTW.isNumeric(zmolddef.opacity)) {
				zopacity = Number(zmolddef.opacity) / 100;
				if (zopacity > 1) {
					zopacity = 1;
				} else if (zopacity < 0) {
					zopacity = 0;
				}
			}
		}
		if (WTW.isNumeric(zmolddef.graphics.uscale)) {
			if (Number(zmolddef.graphics.uscale) > 0) {
				zuscale = Number(zmolddef.graphics.uscale);
			}
		}
		if (WTW.isNumeric(zmolddef.graphics.vscale)) {
			if (Number(zmolddef.graphics.vscale) > 0) {
				zvscale = Number(zmolddef.graphics.vscale);
			}
		}
		if (zuscale < 1) {
			zuscale = 1;
		}
		if (zvscale < 1) {
			zvscale = 1;
		}
		var zmarbletexture = new BABYLON.MarbleProceduralTexture("matmarbletex" + zmoldname, 512, scene);
		zmarbletexture.numberOfTilesHeight = Number(zuscale).toFixed(0);
		zmarbletexture.numberOfTilesWidth = Number(zvscale).toFixed(0);
		zcovering = new BABYLON.StandardMaterial("mat" + zmoldname, scene);
		zcovering.alpha = zopacity;
		zcovering.ambientTexture = zmarbletexture;
		zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringMarble=" + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCoveringRoad = function(zmoldname, zmolddef) {
	/* road procedural texture */
	var zcovering;
	try {
		zcovering = new BABYLON.StandardMaterial("mat" + zmoldname, scene);
		var zroadtexture = new BABYLON.RoadProceduralTexture("matroadtex" + zmoldname, 512, scene);
		zcovering.diffuseTexture = zroadtexture;
		zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringRoad=" + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCoveringHidden = function(zmoldname, zalpha) {
	/* hidden will make a transparent object */
	var zcovering;
	try {
		if (typeof zalpha === "undefined") {
			zalpha = 0;
		}
		zcovering = new BABYLON.StandardMaterial("mat" + zmoldname, scene);
		zcovering.alpha = zalpha;
		zcovering.specularColor = new BABYLON.Color3(zalpha, zalpha, zalpha);
		zcovering.emissiveColor = new BABYLON.Color3(zalpha, zalpha, zalpha);
		zcovering.diffuseColor = new BABYLON.Color3(zalpha, zalpha, zalpha);	
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringHidden=" + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCovering2D = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	/* simple texture for a plane or disc */
	var zcovering;
	try {
		var zuoffset = 0;
		var zvoffset = 0;
		var zuscale = zlenx / 10;
		var zvscale = zleny / 10;
		var ztextureid = "t1qlqxd6pzubzzzy";
		var ztexturepath = "/content/system/stock/lightgray-512x447.jpg";
		var zimageextension = "";
		if (zmolddef != undefined) {
			if (zmolddef.graphics != undefined) {
				if (zmolddef.graphics.texture.id != undefined) {
					if (zmolddef.graphics.texture.id.length > 0) {
						ztextureid = zmolddef.graphics.texture.id;
					}
				}
				if (zmolddef.graphics.texture.path != undefined) {
					if (zmolddef.graphics.texture.path.length > 0) {
						ztexturepath = zmolddef.graphics.texture.path;
						ztexturepath = ztexturepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
					}
				}
				if (WTW.isNumeric(zmolddef.graphics.uscale)) {
					if (Number(zmolddef.graphics.uscale) > 0) {
						zuscale = zuscale * Number(zmolddef.graphics.uscale);
					}
				}
				if (WTW.isNumeric(zmolddef.graphics.vscale)) {
					if (Number(zmolddef.graphics.vscale) > 0) {
						zvscale = zvscale * Number(zmolddef.graphics.vscale);
					}
				}
				if (WTW.isNumeric(zmolddef.graphics.uoffset)) {
					if (Number(zmolddef.graphics.uoffset) != 0) {
						zuoffset = Number(zmolddef.graphics.uoffset);
					}
				}
				if (WTW.isNumeric(zmolddef.graphics.voffset)) {
					if (Number(zmolddef.graphics.voffset) != 0) {
						zvoffset = Number(zmolddef.graphics.voffset);
					}
				}		
			}
		}
		zcovering = new BABYLON.StandardMaterial("mat" + zmoldname, scene);
		if (ztexturepath == '') {
			var zimageinfo = WTW.getUploadFileData(ztextureid);
			zimageextension = zimageinfo.extension;
			ztexturepath = zimageinfo.image.src;
		} else {
			zimageextension = ztexturepath.substr(ztexturepath.length - 3).toLowerCase();
		}
		zcovering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(ztexturepath, "mattexture" + ztextureid, scene);
		if (zimageextension.indexOf("gif") > -1 || zimageextension.indexOf("png") > -1) {
			zcovering.diffuseTexture.hasAlpha = true;
		}
		zcovering.diffuseTexture.uScale = zuscale;
		zcovering.diffuseTexture.vScale = zvscale;
		zcovering.diffuseTexture.uOffset = zuoffset;
		zcovering.diffuseTexture.vOffset = zvoffset;
		var zopacity = 1;
		if (zmolddef.opacity != undefined) {
			if (WTW.isNumeric(zmolddef.opacity)) {
				zopacity = Number(zmolddef.opacity) / 100;
				if (zopacity > 1) {
					zopacity = 1;
				} else if (zopacity < 0) {
					zopacity = 0;
				}
			}
		}
		zcovering.alpha = zopacity;
		zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCovering2D=" + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCoveringTerrain = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	/* terrain allows a number of configuration options including heightmap, RGB tri-color map, bump maps, etc... */
	/* the attempt was to make it work no matter what combination was supplied. so there are a lot of if-else conditions */
	/* preloading images before render */
	/* and advanced options */
	var zcovering;
	try {
		if (zmolddef.graphics.heightmap.mixmappath != '' && zmolddef.graphics.heightmap.texturerpath != '' && zmolddef.graphics.heightmap.texturegpath != '' && zmolddef.graphics.heightmap.texturebpath != '') {
			zcovering = WTW.addCoveringTerrainAdvanced(zmoldname, zlenx, zleny, zlenz, zmolddef, zmolddef.graphics.heightmap.heightmappath, zmolddef.graphics.heightmap.mixmappath, zmolddef.graphics.heightmap.texturerpath, zmolddef.graphics.heightmap.texturegpath, zmolddef.graphics.heightmap.texturebpath, zmolddef.graphics.heightmap.texturebumprpath, zmolddef.graphics.heightmap.texturebumpgpath, zmolddef.graphics.heightmap.texturebumpbpath);
		} else if (zmolddef.graphics.heightmap.mixmapid != '' && zmolddef.graphics.heightmap.texturerid != '' && zmolddef.graphics.heightmap.texturegid != '' && zmolddef.graphics.heightmap.texturebid != '') {
			zcovering = WTW.loadTerrainAdvancedImages(zmoldname, zlenx, zleny, zlenz, zmolddef.graphics.heightmap.id, zmolddef.parentname, zmolddef, zmolddef.coveringname, zmolddef.graphics.heightmap.mixmapid, zmolddef.graphics.heightmap.texturerid, zmolddef.graphics.heightmap.texturegid, zmolddef.graphics.heightmap.texturebid, zmolddef.graphics.heightmap.texturebumprid, zmolddef.graphics.heightmap.texturebumpgid, zmolddef.graphics.heightmap.texturebumpbid);
		} else {
			var zuoffset = 0;
			var zvoffset = 0;
			var zuscale = zlenx / 10;
			var zvscale = zlenz / 10;
			var ztextureid = "t1qlqxd6pzubzzzy";
			var ztexturepath = "/content/system/stock/lightgray-512x447.jpg";
			if (zmolddef != undefined) {
				if (zmolddef.graphics != undefined) {
					if (zmolddef.graphics.texture.id != undefined) {
						if (zmolddef.graphics.texture.id.length > 0) {
							ztextureid = zmolddef.graphics.texture.id;
						}
					}
					if (zmolddef.graphics.texture.path != undefined) {
						if (zmolddef.graphics.texture.path.length > 0) {
							ztexturepath = zmolddef.graphics.texture.path;
							ztexturepath = ztexturepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
						}
					}
					if (WTW.isNumeric(zmolddef.graphics.uscale)) {
						if (Number(zmolddef.graphics.uscale) > 0) {
							zuscale = zuscale * Number(zmolddef.graphics.uscale);
						}
					}
					if (WTW.isNumeric(zmolddef.graphics.vscale)) {
						if (Number(zmolddef.graphics.vscale) > 0) {
							zvscale = zvscale * Number(zmolddef.graphics.vscale);
						}
					}
					if (WTW.isNumeric(zmolddef.graphics.uoffset)) {
						if (Number(zmolddef.graphics.uoffset) != 0) {
							zuoffset = Number(zmolddef.graphics.uoffset);
						}
					}
					if (WTW.isNumeric(zmolddef.graphics.voffset)) {
						if (Number(zmolddef.graphics.voffset) != 0) {
							zvoffset = Number(zmolddef.graphics.voffset);
						}
					}		
				}
			}
			zcovering = new BABYLON.StandardMaterial("mat-" + zmoldname, scene);
			if (ztextureid != "" || ztexturepath != "") {
				zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
				zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
				zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
				zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);
				if (ztexturepath != '') {
					zcovering.diffuseTexture = new BABYLON.Texture(ztexturepath, scene);
				} else {
					var zimageinfo = WTW.getUploadFileData(ztextureid);
					zcovering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.image.src, "mattexture" + ztextureid, scene);
				}
				zcovering.diffuseTexture.uScale = zuscale;
				zcovering.diffuseTexture.vScale = zvscale;
				zcovering.diffuseTexture.uOffset = zuoffset;
				zcovering.diffuseTexture.vOffset = zvoffset;
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringTerrain=" + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.loadTerrainAdvancedImages = function(zmoldname, zlenx, zleny, zlenz, heightmapid, parentname, zmolddef, zcoveringname, mixmapid, texturerid, texturegid, texturebid, texturebumprid, texturebumpgid, texturebumpbid) {
	/* terrain allows a number of configuration options including heightmap, RGB tri-color map, bump maps, etc... */
	/* the attempt was to make it work no matter what combination was supplied. so there are a lot of if-else conditions */
	/* preloading images before render */
	/* and advanced options */
	var zcovering;
	try {
		var zheightmappath = zmolddef.graphics.heightmap.path;
		var zmixmappath = zmolddef.graphics.heightmap.mixmappath;
		var ztexturerpath = zmolddef.graphics.heightmap.texturerpath;
		var ztexturegpath = zmolddef.graphics.heightmap.texturegpath;
		var ztexturebpath = zmolddef.graphics.heightmap.texturebpath;
		var ztexturebumprpath = zmolddef.graphics.heightmap.texturebumprpath;
		var ztexturebumpgpath = zmolddef.graphics.heightmap.texturebumpgpath;
		var ztexturebumpbpath = zmolddef.graphics.heightmap.texturebumpbpath;
		zheightmappath = zheightmappath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");

		if ((zheightmappath != '' || WTW.isUploadReady(heightmapid)) && (zmixmappath != '' || WTW.isUploadReady(mixmapid)) && (ztexturerpath != '' || WTW.isUploadReady(texturerid)) && (ztexturegpath != '' || WTW.isUploadReady(texturegid)) && (ztexturebpath != '' || WTW.isUploadReady(texturebid)) && (ztexturebumprpath != '' || WTW.isUploadReady(texturebumprid) || texturebumprid == '') && (ztexturebumpgpath != '' || WTW.isUploadReady(texturebumpgid) || texturebumpgid == '') && (ztexturebumpbpath != '' || WTW.isUploadReady(texturebumpbid) || texturebumpbid == '')) {
			var zimageheightmapid = WTW.getUploadFileData(heightmapid);
			var zimagemixmapid = WTW.getUploadFileData(mixmapid);
			if (zmixmappath == '') {
				zmixmappath = zimagemixmapid.image.src;
			}
			var zimagetexturerid = WTW.getUploadFileData(texturerid);
			if (ztexturerpath == '') {
				ztexturerpath = zimagetexturerid.image.src;
			}
			var zimagetexturegid = WTW.getUploadFileData(texturegid);
			if (ztexturegpath == '') {
				ztexturegpath = zimagetexturegid.image.src;
			}
			var zimagetexturebid = WTW.getUploadFileData(texturebid);
			if (ztexturebpath == '') {
				ztexturebpath = zimagetexturebid.image.src;
			}
			if (zmolddef.graphics.heightmap.texturebumprid != '') {	
				var zimagetexturebumprid = WTW.getUploadFileData(texturebumprid);
				if (zmolddef.graphics.heightmap.texturebumpgid != '') {	
					var zimagetexturebumpgid = WTW.getUploadFileData(texturebumpgid);
					if (zmolddef.graphics.heightmap.texturebumpbid != '') {	
						var zimagetexturebumpbid = WTW.getUploadFileData(texturebumpbid);
						zcovering = WTW.addCoveringTerrainAdvanced(zmoldname, zlenx, zleny, zlenz, zmolddef, zheightmappath, zmixmappath, ztexturerpath, ztexturegpath, ztexturebpath, ztexturebumprpath, ztexturebumpgpath, ztexturebumpbpath);
					} else {
						var zimagetexturebumpbid = null;
						zcovering = WTW.addCoveringTerrainAdvanced(zmoldname, zlenx, zleny, zlenz, zmolddef, zheightmappath, zmixmappath, ztexturerpath, ztexturegpath, ztexturebpath, ztexturebumprpath, ztexturebumpgpath, ztexturebumpbpath);
					}
				} else {
					var zimagetexturebumpgid = null;
					if (zmolddef.graphics.heightmap.texturebumpbid != '') {	
						var zimagetexturebumpbid = WTW.getUploadFileData(texturebumpbid);
						zcovering = WTW.addCoveringTerrainAdvanced(zmoldname, zlenx, zleny, zlenz, zmolddef, zheightmappath, zmixmappath, ztexturerpath, ztexturegpath, ztexturebpath, ztexturebumprpath, ztexturebumpgpath, ztexturebumpbpath);
					} else {
						var zimagetexturebumpbid = null;
						zcovering = WTW.addCoveringTerrainAdvanced(zmoldname, zlenx, zleny, zlenz, zmolddef, zheightmappath, zmixmappath, ztexturerpath, ztexturegpath, ztexturebpath, ztexturebumprpath, ztexturebumpgpath, ztexturebumpbpath);
					}
				}
			} else {
				var zimagetexturebumprid = null;
				if (zmolddef.graphics.heightmap.texturebumpgid != '') {	
					var zimagetexturebumpgid = WTW.getUploadFileData(texturebumpgid);
					if (zmolddef.graphics.heightmap.texturebumpbid != '') {	
						var zimagetexturebumpbid = WTW.getUploadFileData(texturebumpbid);
						zcovering = WTW.addCoveringTerrainAdvanced(zmoldname, zlenx, zleny, zlenz, zmolddef, zheightmappath, zmixmappath, ztexturerpath, ztexturegpath, ztexturebpath, ztexturebumprpath, ztexturebumpgpath, ztexturebumpbpath);
					} else {
						var zimagetexturebumpbid = null;
						zcovering = WTW.addCoveringTerrainAdvanced(zmoldname, zlenx, zleny, zlenz, zmolddef, zheightmappath, zmixmappath, ztexturerpath, ztexturegpath, ztexturebpath, ztexturebumprpath, ztexturebumpgpath, ztexturebumpbpath);
					}
				} else {
					var zimagetexturebumpgid = null;
					if (zmolddef.graphics.heightmap.texturebumpbid != '') {	
						var zimagetexturebumpbid = WTW.getUploadFileData(texturebumpbid);
						zcovering = WTW.addCoveringTerrainAdvanced(zmoldname, zlenx, zleny, zlenz, zmolddef, zheightmappath, zmixmappath, ztexturerpath, ztexturegpath, ztexturebpath, ztexturebumprpath, ztexturebumpgpath, ztexturebumpbpath);
					} else {
						var zimagetexturebumpbid = null;
						zcovering = WTW.addCoveringTerrainAdvanced(zmoldname, zlenx, zleny, zlenz, zmolddef, zheightmappath, zmixmappath, ztexturerpath, ztexturegpath, ztexturebpath, ztexturebumprpath, ztexturebumpgpath, ztexturebumpbpath);
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n loadTerrainAdvancedImages=" + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCoveringTerrainAdvanced = function(zmoldname, zlenx, zleny, zlenz, zmolddef, zheightmappath, zmixmappath, ztexturerpath, ztexturegpath, ztexturebpath, ztexturebumprpath, ztexturebumpgpath, ztexturebumpbpath) {
	/* terrain allows a number of configuration options including heightmap, RGB tri-color map, bump maps, etc... */
	/* the attempt was to make it work no matter what combination was supplied. so there are a lot of if-else conditions */
	/* preloading images before render */
	/* and advanced options */
	var zcovering;
	try {
		var zuoffset = 0;
		var zvoffset = 0;
		var zuscale = 10;
		var zvscale = 10;
		if (zmolddef != undefined) {
			if (zmolddef.graphics != undefined) {
				if (WTW.isNumeric(zmolddef.graphics.uscale)) {
					if (Number(zmolddef.graphics.uscale) > 0) {
						zuscale = Number(zmolddef.graphics.uscale);
					}
				}
				if (WTW.isNumeric(zmolddef.graphics.vscale)) {
					if (Number(zmolddef.graphics.vscale) > 0) {
						zvscale = Number(zmolddef.graphics.vscale);
					}
				}
				if (WTW.isNumeric(zmolddef.graphics.uoffset)) {
					if (Number(zmolddef.graphics.uoffset) != 0) {
						zuoffset = Number(zmolddef.graphics.uoffset);
					}
				}
				if (WTW.isNumeric(zmolddef.graphics.voffset)) {
					if (Number(zmolddef.graphics.voffset) != 0) {
						zvoffset = Number(zmolddef.graphics.voffset);
					}
				}		
			}
		}	
		zmixmappath = zmixmappath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
		ztexturerpath = ztexturerpath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
		ztexturegpath = ztexturegpath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
		ztexturebpath = ztexturebpath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
		ztexturebumprpath = ztexturebumprpath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
		ztexturebumpgpath = ztexturebumpgpath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
		ztexturebumpbpath = ztexturebumpbpath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
		
		// Create terrain material
		var zcovering = new BABYLON.TerrainMaterial("mat" + zmoldname, scene);
		zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);
		zcovering.specularPower = 64;

		// Set the mix texture (represents the RGB values)
		zcovering.mixTexture = new BABYLON.Texture(zmixmappath, scene);
		// Diffuse textures following the RGB values of the mix map
		// diffuseTexture1: Red
		// diffuseTexture2: Green
		// diffuseTexture3: Blue
		zcovering.diffuseTexture1 = new BABYLON.Texture(ztexturerpath, scene);
		zcovering.diffuseTexture2 = new BABYLON.Texture(ztexturegpath, scene);
		zcovering.diffuseTexture3 = new BABYLON.Texture(ztexturebpath, scene);
		
		// Bump textures according to the previously set diffuse textures
		if (zmolddef.graphics.heightmap.texturebumprid != '') {	
			zcovering.bumpTexture1 = new BABYLON.Texture(ztexturebumprpath, scene);
		}
		if (zmolddef.graphics.heightmap.texturebumpgid != '') {	
			zcovering.bumpTexture2 = new BABYLON.Texture(ztexturebumpgpath, scene);
		}
		if (zmolddef.graphics.heightmap.texturebumpbid != '') {	
			zcovering.bumpTexture3 = new BABYLON.Texture(ztexturebumpbpath, scene);
		}

		// Rescale textures according to the terrain
		zcovering.diffuseTexture1.uScale = zuscale;
		zcovering.diffuseTexture1.vScale = zvscale;
		zcovering.diffuseTexture2.uScale = zuscale;
		zcovering.diffuseTexture2.vScale = zvscale;
		zcovering.diffuseTexture3.uScale = zuscale;
		zcovering.diffuseTexture3.vScale = zvscale;								
		zcovering.diffuseTexture1.uOffset = zuoffset;
		zcovering.diffuseTexture1.vOffset = zuoffset;
		zcovering.diffuseTexture2.uOffset = zuoffset;
		zcovering.diffuseTexture2.vOffset = zuoffset;
		zcovering.diffuseTexture3.uOffset = zuoffset;
		zcovering.diffuseTexture3.vOffset = zuoffset;								
	} catch (ex) {
		WTW.log("core-scripts-coverings-basiccoverings\r\n addCoveringTerrainAdvanced=" + ex.message);
	}
	return zcovering;
}
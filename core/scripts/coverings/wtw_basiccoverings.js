/* All code is Copyright 2013-2022 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions create the various coverings */

/* materials vs coverings - materials are loaded on the meshes in the scene, coverings are the definitions that create the materials to be added the mesh on demand */

WTWJS.prototype.addCoveringWire = function(zmoldname, zmolddef) {
	/* wireframe the mold instead of adding a material */
	var zcovering;
	try {
		zcovering = 'none';
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
			zmold.wireframe = true;
		}
	} catch (ex) {
		WTW.log('core-scripts-coverings-basiccoverings\r\n addCoveringWire=' + ex.message);
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
		zcovering = new BABYLON.StandardMaterial('mat' + zmoldname, scene);
		zcovering.alpha = zopacity;
		zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);
	} catch (ex) {
		WTW.log('core-scripts-coverings-basiccoverings\r\n addCoveringColor=' + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCoveringGlass = function(zmoldname, zmolddef) {
	/* basically a color material with an opacity of .2 (or 20%) */
	/* you can also achieve this with a color or texture with an opacity set in advanced options on the form */
	var zcovering;
	try {
		WTW.disposeMaterial('mat' + zmoldname);		
		zcovering = new BABYLON.StandardMaterial('mat' + zmoldname, scene);
		var zopacity = .2;
		zcovering.alpha = zopacity;
		zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);
	} catch (ex) {
		WTW.log('core-scripts-coverings-basiccoverings\r\n addCoveringGlass=' + ex.message);
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
		zcovering = new BABYLON.StandardMaterial('mat' + zmoldname, scene);
		zcovering.reflectionTexture = new BABYLON.MirrorTexture('matmirror' + zmoldname, 1024, scene, true);
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
		WTW.log('core-scripts-coverings-basiccoverings\r\n addCoveringMirror=' + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCoveringTexture = function(zmoldname, zmolddef, zlenx, zleny, zlenz, zspecial1, zspecial2) {
	/* basic add texture material to mold - attempts to scale the texture on the surface (which can be overwritten in the advanced options of the form) */
	var zcovering;
	try {
		var zshape = 'box'; 
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
		var zimageid = 't1qlqxd6pzubzzzy';
		var ztexturepath = '';
		var zbumpid = '';
		var zbumppath = '';
		var zdiffusecolor = '#ffffff';
		var zemissivecolor = '#000000';
		var zspecularcolor = '#000000';
		var zambientcolor = '#ffffff';
		if (zmolddef != undefined) {
			if (zmolddef.shape != '') {
				zshape = zmolddef.shape;
			}
			if (zshape == 'sphere' || zshape == 'dome' || zshape == 'cone') {
				zuscale = ((zlenx/10 + zlenz/10) / 2) * Math.PI;
				zvscale = zvscale * Math.PI;
			} else if (zshape == 'cylinder') {
				zuscale = ((zlenx + zlenz) / 2) / Math.PI;
				zvscale = 1;
			} else if (zshape == 'half pipe') {
				zuscale = zlenx / 10;
				zvscale = zlenz / 10;
			}
			if (zmolddef.graphics != undefined) {
				if (zmolddef.graphics.texture.id != undefined) {
					zimageid = zmolddef.graphics.texture.id;
				}
				if (zmolddef.graphics.texture.path != undefined) {
					ztexturepath = zmolddef.graphics.texture.path;
					ztexturepath = ztexturepath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
				}
				if (zmolddef.graphics.texture.bumpid != undefined) {
					zbumpid = zmolddef.graphics.texture.bumpid;
				}
				if (zmolddef.graphics.texture.bumppath != undefined) {
					zbumppath = zmolddef.graphics.texture.bumppath;
					zbumppath = zbumppath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
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
			if (zmolddef.color != undefined) {
				if (zmolddef.color.diffusecolor != undefined) {
					if (zmolddef.color.diffusecolor != '') {
						zdiffusecolor = zmolddef.color.diffusecolor;
					}
				}
				if (zmolddef.color.emissivecolor != undefined) {
					if (zmolddef.color.emissivecolor != '') {
						zemissivecolor = zmolddef.color.emissivecolor;
					}
				}
				if (zmolddef.color.specularcolor != undefined) {
					if (zmolddef.color.specularcolor != '') {
						zspecularcolor = zmolddef.color.specularcolor;
					}
				}
				if (zmolddef.color.ambientcolor != undefined) {
					if (zmolddef.color.ambientcolor != '') {
						zambientcolor = zmolddef.color.ambientcolor;
					}
				}
			}
		}
		WTW.disposeMaterial('mat' + zmoldname);		
		zcovering = new BABYLON.StandardMaterial('mat' + zmoldname, scene);
		zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zdiffusecolor);
		zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zemissivecolor);
		zcovering.specularColor = new BABYLON.Color3.FromHexString(zspecularcolor);
		zcovering.ambientColor = new BABYLON.Color3.FromHexString(zambientcolor);

		var zimageextension = '';
		if (ztexturepath == '') {
			var zimageinfo = WTW.getUploadFileData(zimageid);
			zimageextension = zimageinfo.extension;
			zcovering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.image.src, 'mattexture' + zimageid, scene);
		} else {
			zcovering.diffuseTexture = new BABYLON.Texture(ztexturepath, scene);
			zimageextension = ztexturepath.substr(ztexturepath.length - 3).toLowerCase();
		}
		zcovering.diffuseTexture.uScale = zuscale;
		zcovering.diffuseTexture.vScale = zvscale;
		zcovering.diffuseTexture.uOffset = zuoffset;
		zcovering.diffuseTexture.vOffset = zvoffset;
		if (zimageextension.indexOf('gif') > -1 || zimageextension.indexOf('png') > -1) {
			zcovering.diffuseTexture.hasAlpha = true;
		}	
		if (zbumpid != '' || zbumppath != '') {
			if (zbumppath != '') {
				zcovering.bumpTexture = new BABYLON.Texture(zbumppath, scene);
			} else {
				var zimageinfobump = WTW.getUploadFileData(zbumpid);
				zcovering.bumpTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfobump.image.src, 'mattexture' + zbumpid, scene);
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
//					zcovering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.image.src, 'mattexture' + zimageid, scene);
//				});
		//});
		if (zmoldname.indexOf('myavatar-') > -1 || zmoldname.indexOf('person-') > -1) {
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
		WTW.log('core-scripts-coverings-basiccoverings\r\n addCoveringTexture=' + ex.message);
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
		var zimageid = 't1qlqxd6pzubzzzy';
		var ztexturepath = '';
		var zbumpid = '';
		var zbumppath = '';
		var zopacity = 1;
		var zimageextension = '';
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
					if (zmolddef.graphics.texture.id != '') {
						zimageid = zmolddef.graphics.texture.id;
					}
				}
				if (zmolddef.graphics.texture.path != undefined) {
					if (zmolddef.graphics.texture.path != '') {
						ztexturepath = zmolddef.graphics.texture.path;
						ztexturepath = ztexturepath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
					}
				}
				if (zmolddef.graphics.texture.bumpid != undefined) {
					zbumpid = zmolddef.graphics.texture.bumpid;
				}
				if (zmolddef.graphics.texture.bumppath != undefined) {
					zbumppath = zmolddef.graphics.texture.bumppath;
					zbumppath = zbumppath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
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
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
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
		zcovering = new BABYLON.MultiMaterial('cubemat' + zmoldname, scene);
		var zrmaterial = new BABYLON.StandardMaterial('rmat' + zmoldname, scene);
		var zimageinfo;
		var zimageextension = '';
		if (ztexturepath == '') {
			zimageinfo = WTW.getUploadFileData(zimageid);
			zimageextension = zimageinfo.extension;
			zrmaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.image.src, 'mattexture' + zimageid, scene);
		} else {
			zrmaterial.diffuseTexture = new BABYLON.Texture(ztexturepath, scene);
			zimageextension = ztexturepath.substr(ztexturepath.length - 3).toLowerCase();
		}
		zrmaterial.diffuseTexture.wAng = 0 * Math.PI / 180;
		zrmaterial.diffuseTexture.uScale = zuscr;
		zrmaterial.diffuseTexture.vScale = zvscr;
		zrmaterial.diffuseTexture.uOffset = zuosr;
		zrmaterial.diffuseTexture.vOffset = zvosr;
		zrmaterial.diffuseTexture.alpha = zalpha;
		zrmaterial.alpha = zopacity;
		zrmaterial.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zrmaterial.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zrmaterial.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zrmaterial.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);

		if (zimageextension.indexOf('gif') > -1 || zimageextension.indexOf('png') > -1) {
			zrmaterial.diffuseTexture.hasAlpha = true;
			zrmaterial.useAlphaFromDiffuseTexture = true;
		}
		if (zbumpid != '' || zbumppath != '') {
			if (zbumppath != '') {
				zrmaterial.bumpTexture = new BABYLON.Texture(zbumppath, scene);
			} else {
				var zimageinfobump = WTW.getUploadFileData(zbumpid);
				zrmaterial.bumpTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfobump.image.src, 'rMaterial' + zmoldname, scene);
			}
			zrmaterial.bumpTexture.wAng = 0 * Math.PI / 180;
			zrmaterial.bumpTexture.uScale = zuscr;
			zrmaterial.bumpTexture.vScale = zvscr;
			zrmaterial.bumpTexture.uOffset = zuosr;
			zrmaterial.bumpTexture.vOffset = zvosr;
			zrmaterial.useParallax = true;
			zrmaterial.useParallaxOcclusion = true;
		}
		var zlmaterial = new BABYLON.StandardMaterial('lmat' + zmoldname, scene);
		if (ztexturepath == '') {
			zlmaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.image.src, 'mattexture' + zimageid, scene);
		} else {
			zlmaterial.diffuseTexture = new BABYLON.Texture(ztexturepath, scene);
		}
		zlmaterial.diffuseTexture.wAng = 180 * Math.PI / 180;
		zlmaterial.diffuseTexture.uScale = zuscl;
		zlmaterial.diffuseTexture.vScale = zvscl;
		zlmaterial.diffuseTexture.uOffset = zuosl;
		zlmaterial.diffuseTexture.vOffset = zvosl;
		zlmaterial.alpha = zopacity;
		zlmaterial.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zlmaterial.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zlmaterial.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zlmaterial.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);

		if (zimageextension.indexOf('gif') > -1 || zimageextension.indexOf('png') > -1) {
			zlmaterial.diffuseTexture.hasAlpha = true;
			zlmaterial.useAlphaFromDiffuseTexture = true;
		}
		if (zbumpid != '' || zbumppath != '') {
			if (zbumppath != '') {
				zlmaterial.bumpTexture = new BABYLON.Texture(zbumppath, scene);
			} else {
				var zimageinfobump = WTW.getUploadFileData(zbumpid);
				zlmaterial.bumpTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfobump.image.src, 'lMaterial' + zmoldname, scene);
			}
			zlmaterial.bumpTexture.wAng = 180 * Math.PI / 180;
			zlmaterial.bumpTexture.uScale = zuscl;
			zlmaterial.bumpTexture.vScale = zvscl;
			zlmaterial.bumpTexture.uOffset = zuosl;
			zlmaterial.bumpTexture.vOffset = zvosl;
			zlmaterial.useParallax = true;
			zlmaterial.useParallaxOcclusion = true;
		}
		var imagename = 'fmattexture' + zmoldname;
		if (WTW.adminView == 1) {
			imagename +=  WTW.getRandomString(16);
		}
		var zfmaterial = new BABYLON.StandardMaterial('fmat' + zmoldname, scene);
		if (ztexturepath == '') {
			zfmaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.image.src, 'mattexture' + zimageid, scene);
		} else {
			zfmaterial.diffuseTexture = new BABYLON.Texture(ztexturepath, scene);
		}
		zfmaterial.diffuseTexture.wAng = 90 * Math.PI / 180;
		zfmaterial.diffuseTexture.uScale = zuscf;
		zfmaterial.diffuseTexture.vScale = zvscf;
		zfmaterial.diffuseTexture.uOffset = zuosf;
		zfmaterial.diffuseTexture.vOffset = zvosf;
		zfmaterial.alpha = zopacity;
		zfmaterial.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zfmaterial.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zfmaterial.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zfmaterial.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);

		if (zimageextension.indexOf('gif') > -1 || zimageextension.indexOf('png') > -1) {
			zfmaterial.diffuseTexture.hasAlpha = true;
			zfmaterial.useAlphaFromDiffuseTexture = true;
		}
		if (zbumpid != '' || zbumppath != '') {
			if (zbumppath != '') {
				zfmaterial.bumpTexture = new BABYLON.Texture(zbumppath, scene);
			} else {
				var zimageinfobump = WTW.getUploadFileData(zbumpid);
				zfmaterial.bumpTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfobump.image.src, 'fMaterial' + zmoldname, scene);
			}
			zfmaterial.bumpTexture.wAng = 90 * Math.PI / 180;
			zfmaterial.bumpTexture.uScale = zuscf;
			zfmaterial.bumpTexture.vScale = zvscf;
			zfmaterial.bumpTexture.uOffset = zuosf;
			zfmaterial.bumpTexture.vOffset = zvosf;
			zfmaterial.useParallax = true;
			zfmaterial.useParallaxOcclusion = true;
		}
		var zbmaterial = new BABYLON.StandardMaterial('bmat' + zmoldname, scene);
		if (ztexturepath == '') {
			zbmaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.image.src, 'mattexture' + zimageid, scene);
		} else {
			zbmaterial.diffuseTexture = new BABYLON.Texture(ztexturepath, scene);
		}
		zbmaterial.diffuseTexture.wAng = 90 * Math.PI / 180;
		zbmaterial.diffuseTexture.uScale = zuscb;
		zbmaterial.diffuseTexture.vScale = zvscb;
		zbmaterial.diffuseTexture.uOffset = zuosb;
		zbmaterial.diffuseTexture.vOffset = zvosb;
		zbmaterial.diffuseTexture.alpha = zalpha;
		zbmaterial.alpha = zopacity;
		zbmaterial.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zbmaterial.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zbmaterial.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zbmaterial.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);

		if (zimageextension.indexOf('gif') > -1 || zimageextension.indexOf('png') > -1) {
			zbmaterial.diffuseTexture.hasAlpha = true;
			zbmaterial.useAlphaFromDiffuseTexture = true;
		}
		if (zbumpid != '' || zbumppath != '') {
			if (zbumppath != '') {
				zbmaterial.bumpTexture = new BABYLON.Texture(zbumppath, scene);
			} else {
				var zimageinfobump = WTW.getUploadFileData(zbumpid);
				zbmaterial.bumpTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfobump.image.src, 'bMaterial' + zmoldname, scene);
			}
			zbmaterial.bumpTexture.wAng = 90 * Math.PI / 180;
			zbmaterial.bumpTexture.uScale = zuscb;
			zbmaterial.bumpTexture.vScale = zvscb;
			zbmaterial.bumpTexture.uOffset = zuosb;
			zbmaterial.bumpTexture.vOffset = zvosb;
			zbmaterial.useParallax = true;
			zbmaterial.useParallaxOcclusion = true;
		}
		var zumaterial = new BABYLON.StandardMaterial('umat' + zmoldname, scene);
		if (ztexturepath == '') {
			zumaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.image.src, 'mattexture' + zimageid, scene);
		} else {
			zumaterial.diffuseTexture = new BABYLON.Texture(ztexturepath, scene);
		}
		zumaterial.diffuseTexture.wAng = 180 * Math.PI / 180;
		zumaterial.diffuseTexture.uScale = zuscu;
		zumaterial.diffuseTexture.vScale = zvscu;
		zumaterial.diffuseTexture.uOffset = zuosu;
		zumaterial.diffuseTexture.vOffset = zvosu;
		zumaterial.diffuseTexture.alpha = zalpha;
		zumaterial.alpha = zopacity;
		zumaterial.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zumaterial.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zumaterial.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zumaterial.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);

		if (zimageextension.indexOf('gif') > -1 || zimageextension.indexOf('png') > -1) {
			zumaterial.diffuseTexture.hasAlpha = true;
			zumaterial.useAlphaFromDiffuseTexture = true;
		}
		if (zbumpid != '' || zbumppath != '') {
			if (zbumppath != '') {
				zumaterial.bumpTexture = new BABYLON.Texture(zbumppath, scene);
			} else {
				var zimageinfobump = WTW.getUploadFileData(zbumpid);
				zumaterial.bumpTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfobump.image.src, 'uMaterial' + zmoldname, scene);
			}
			zumaterial.bumpTexture.wAng = 180 * Math.PI / 180;
			zumaterial.bumpTexture.uScale = zuscu;
			zumaterial.bumpTexture.vScale = zvscu;
			zumaterial.bumpTexture.uOffset = zuosu;
			zumaterial.bumpTexture.vOffset = zvosu;
			zumaterial.useParallax = true;
			zumaterial.useParallaxOcclusion = true;
		}
		var zdmaterial = new BABYLON.StandardMaterial('dmat' + zmoldname, scene);
		if (ztexturepath == '') {
			zdmaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.image.src, 'mattexture' + zimageid, scene);
		} else {
			zdmaterial.diffuseTexture = new BABYLON.Texture(ztexturepath, scene);
		}
		zdmaterial.diffuseTexture.wAng = 180 * Math.PI / 180;
		zdmaterial.diffuseTexture.uScale = zuscd;
		zdmaterial.diffuseTexture.vScale = zvscd;
		zdmaterial.diffuseTexture.uOffset = zuosd;
		zdmaterial.diffuseTexture.vOffset = zvosd;
		zdmaterial.diffuseTexture.alpha = zalpha;
		zdmaterial.alpha = zopacity;
		zdmaterial.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zdmaterial.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zdmaterial.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zdmaterial.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);

		if (zimageextension.indexOf('gif') > -1 || zimageextension.indexOf('png') > -1) {
			zdmaterial.diffuseTexture.hasAlpha = true;
			zdmaterial.useAlphaFromDiffuseTexture = true;
		}
		if (zbumpid != '' || zbumppath != '') {
			if (zbumppath != '') {
				zdmaterial.bumpTexture = new BABYLON.Texture(zbumppath, scene);
			} else {
				var zimageinfobump = WTW.getUploadFileData(zbumpid);
				zdmaterial.bumpTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfobump.image.src, 'dMaterial' + zmoldname, scene);
			}
			zdmaterial.bumpTexture.wAng = 180 * Math.PI / 180;
			zdmaterial.bumpTexture.uScale = zuscd;
			zdmaterial.bumpTexture.vScale = zvscd;
			zdmaterial.bumpTexture.uOffset = zuosd;
			zdmaterial.bumpTexture.vOffset = zvosd;
			zdmaterial.useParallax = true;
			zdmaterial.useParallaxOcclusion = true;
		}
		zcovering.subMaterials[0] = zlmaterial;
		zcovering.subMaterials[1] = zrmaterial;
		zcovering.subMaterials[2] = zbmaterial;
		zcovering.subMaterials[3] = zfmaterial;
		zcovering.subMaterials[4] = zumaterial;
		zcovering.subMaterials[5] = zdmaterial;
		if (zmoldname.indexOf('myavatar-') > -1 || zmoldname.indexOf('person-') > -1) {
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
		WTW.log('core-scripts-coverings-basiccoverings\r\n addCoveringDirectionalTexture=' + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCoveringWater = function(zmoldname, zmolddef) {
	/* water like surface material with reflection and refraction */
	var zcovering;
	try {
		zcovering = new BABYLON.WaterMaterial('mat' + zmoldname, scene, new BABYLON.Vector2(512, 512));
		zcovering.backFaceCulling = true;
		zcovering.bumpTexture = new BABYLON.Texture('/content/system/stock/waterbump.png', scene);
		zcovering.windForce = -10;
		zcovering.waveHeight = .2;
		//zcovering.windDirection = new BABYLON.Vector2(1, 1);
		zcovering.waterColor = new BABYLON.Color3(0.2, 0.3, 0.7); // water color blended with the refraction (near)
		zcovering.waterColor2 = new BABYLON.Color3(0.3, 0.4, 0.8); // water color blended with the reflection (far)
		zcovering.colorBlendFactor = .2;
		zcovering.colorBlendFactor2 = .2;
		zcovering.bumpHeight = 0.6;
		zcovering.waveLength = 0.02;			
		zcovering.addToRenderList(WTW.sky);
		zcovering.addToRenderList(WTW.extraGround);
		WTW.addReflection(zcovering);
	} catch (ex) {
		WTW.log('core-scripts-coverings-basiccoverings\r\n addCoveringWater=' + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCoveringFire = function(zmoldname, zmolddef) {
	/* fire procedural texture */
	var zcovering;
	try {
		zcovering = new BABYLON.StandardMaterial('mat' + zmoldname, scene);
		var zcoveringfire = new BABYLON.FireProceduralTexture('matfiretex' + zmoldname, 256, scene);
		zcovering.diffuseTexture = zcoveringfire;
		zcovering.opacityTexture = zcoveringfire;
	} catch (ex) {
		WTW.log('core-scripts-coverings-basiccoverings\r\n addCoveringFire=' + ex.message);
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
		var zmarbletexture = new BABYLON.MarbleProceduralTexture('matmarbletex' + zmoldname, 512, scene);
		zmarbletexture.numberOfTilesHeight = Number(zuscale).toFixed(0);
		zmarbletexture.numberOfTilesWidth = Number(zvscale).toFixed(0);
		zcovering = new BABYLON.StandardMaterial('mat' + zmoldname, scene);
		zcovering.alpha = zopacity;
		zcovering.ambientTexture = zmarbletexture;
		zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);
	} catch (ex) {
		WTW.log('core-scripts-coverings-basiccoverings\r\n addCoveringMarble=' + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCoveringRoad = function(zmoldname, zmolddef) {
	/* road procedural texture */
	var zcovering;
	try {
		zcovering = new BABYLON.StandardMaterial('mat' + zmoldname, scene);
		var zroadtexture = new BABYLON.RoadProceduralTexture('matroadtex' + zmoldname, 512, scene);
		zcovering.diffuseTexture = zroadtexture;
		zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);
	} catch (ex) {
		WTW.log('core-scripts-coverings-basiccoverings\r\n addCoveringRoad=' + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCoveringHidden = function(zmoldname, zalpha) {
	/* hidden will make a transparent object */
	var zcovering;
	try {
		if (typeof zalpha === 'undefined') {
			zalpha = 0;
		}
		zcovering = new BABYLON.StandardMaterial('mat' + zmoldname, scene);
		zcovering.alpha = zalpha;
		zcovering.specularColor = new BABYLON.Color3(zalpha, zalpha, zalpha);
		zcovering.emissiveColor = new BABYLON.Color3(zalpha, zalpha, zalpha);
		zcovering.diffuseColor = new BABYLON.Color3(zalpha, zalpha, zalpha);	
	} catch (ex) {
		WTW.log('core-scripts-coverings-basiccoverings\r\n addCoveringHidden=' + ex.message);
	}
	return zcovering;
}

WTWJS.prototype.addCovering2D = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	/* simple texture for a plane or disc */
	var zcovering;
	try {
		var zuoffset = 0;
		var zvoffset = 0;
		var zuscale = 1;
		var zvscale = 1;
		var ztextureid = 't1qlqxd6pzubzzzy';
		var ztexturepath = '/content/system/stock/lightgray-512x512.jpg';
		var zimageextension = '';
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
						ztexturepath = ztexturepath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
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
		zcovering = new BABYLON.StandardMaterial('mat' + zmoldname, scene);
		if (ztexturepath == '') {
			var zimageinfo = WTW.getUploadFileData(ztextureid);
			zimageextension = zimageinfo.extension;
			ztexturepath = zimageinfo.image.src;
		} else {
			zimageextension = ztexturepath.substr(ztexturepath.length - 3).toLowerCase();
		}
		zcovering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(ztexturepath, 'mattexture' + ztextureid, scene);
		if (zimageextension.indexOf('gif') > -1 || zimageextension.indexOf('png') > -1) {
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
		WTW.log('core-scripts-coverings-basiccoverings\r\n addCovering2D=' + ex.message);
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
			var ztextureid = 't1qlqxd6pzubzzzy';
			var ztexturepath = '/content/system/stock/lightgray-512x512.jpg';
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
							ztexturepath = ztexturepath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
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
			zcovering = new BABYLON.StandardMaterial('mat-' + zmoldname, scene);
			if (ztextureid != '' || ztexturepath != '') {
				zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
				zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
				zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
				zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);
				if (ztexturepath != '') {
					zcovering.diffuseTexture = new BABYLON.Texture(ztexturepath, scene);
				} else {
					var zimageinfo = WTW.getUploadFileData(ztextureid);
					zcovering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.image.src, 'mattexture' + ztextureid, scene);
				}
				zcovering.diffuseTexture.uScale = zuscale;
				zcovering.diffuseTexture.vScale = zvscale;
				zcovering.diffuseTexture.uOffset = zuoffset;
				zcovering.diffuseTexture.vOffset = zvoffset;
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-coverings-basiccoverings\r\n addCoveringTerrain=' + ex.message);
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
		zheightmappath = zheightmappath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');

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
		WTW.log('core-scripts-coverings-basiccoverings\r\n loadTerrainAdvancedImages=' + ex.message);
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
		zmixmappath = zmixmappath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
		ztexturerpath = ztexturerpath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
		ztexturegpath = ztexturegpath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
		ztexturebpath = ztexturebpath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
		ztexturebumprpath = ztexturebumprpath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
		ztexturebumpgpath = ztexturebumpgpath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
		ztexturebumpbpath = ztexturebumpbpath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
		
		// Create terrain material
		var zcovering = new BABYLON.TerrainMaterial('mat' + zmoldname, scene);
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
		WTW.log('core-scripts-coverings-basiccoverings\r\n addCoveringTerrainAdvanced=' + ex.message);
	}
	return zcovering;
}
/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions create the various molds */

/* meshes vs molds - meshes are loaded to the scene, molds are the definitions that will create the mesh on demand */
/* rendering group id should be 1 or 2 based on the layer to be drawn. Most should be 1. FYI BABYLON.RenderingManager.MAX_RENDERINGGROUPS to increase groups from the default 4. */

WTWJS.prototype.addMoldBox = function(zmoldname, zlenx, zleny, zlenz) {
	var zmold;
	try {
		var zsideorientation = BABYLON.Mesh.DEFAULT;
		if (zmoldname.indexOf('actionzone') > -1 && WTW.adminView == 1) {
			zsideorientation = BABYLON.Mesh.DOUBLESIDE;
		}
		zmold = BABYLON.MeshBuilder.CreateBox(zmoldname, {sideOrientation: zsideorientation}, scene);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zmold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldBox=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldCylinder = function(zmoldname, zlenx, zleny, zlenz, zsubdivisions) {
	var zmold;
	try {
		zmold = BABYLON.MeshBuilder.CreateCylinder(zmoldname, {height: 1, diameterTop: 1, diameterBottom: 1, tessellation: zsubdivisions, subdivisions: 1, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zmold.convertToUnIndexedMesh();
		zmold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldCylinder=' + ex.message);
	}
	return zmold;
}	

WTWJS.prototype.addMoldCone = function(zmoldname, zlenx, zleny, zlenz, zsubdivisions, zspecial1, zspecial2) {
	var zmold;
	try {
		zmold = BABYLON.MeshBuilder.CreateCylinder(zmoldname, {height: 1, diameterTop: zspecial1, diameterBottom: zspecial2, tessellation: zsubdivisions, subdivisions: 1, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zmold.convertToUnIndexedMesh();
		zmold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldCone=' + ex.message);
	}
	return zmold;
}	

WTWJS.prototype.addMoldSpotLight = function(zmoldname, zlenx, zleny, zlenz, zsubdivisions, zspecial1, zspecial2) {
	var zmold;
	try {
		zmold = BABYLON.MeshBuilder.CreateCylinder(zmoldname, {height: 1, diameterTop: zspecial1, diameterBottom: zspecial2, tessellation: zsubdivisions, subdivisions: 1, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		var zlight = new BABYLON.SpotLight(zmoldname + '-spotlight', new BABYLON.Vector3(0, -3, 0), new BABYLON.Vector3(0, -3, 0), Math.PI / 3, 20, scene);
		zlight.parent = zmold;
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zmold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldSpotLight=' + ex.message);
	}
	return zmold;
}	

WTWJS.prototype.addMoldPolygon = function(zmoldname, zlenx, zleny, zlenz, zspecial1) {
	var zmold;
	try {
		zspecial1 = Math.round(zspecial1);
		if (zspecial1 < 0) {
			zspecial1 = 0;
		}
		if (zspecial1 > 14) {
			zspecial1 = 14;
		}
		zmold = BABYLON.MeshBuilder.CreatePolyhedron(zmoldname, {type: zspecial1, size: 1, updatable: true, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zmold.convertToUnIndexedMesh();
		zmold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldPolygon=' + ex.message);
	}
	return zmold;
}	

WTWJS.prototype.addMoldSphere = function(zmoldname, zlenx, zleny, zlenz, zsubdivisions) {
	var zmold;
	try {
		zmold = BABYLON.MeshBuilder.CreateSphere(zmoldname, {segments: zsubdivisions, diameter:1, updatable: true, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zmold.convertToUnIndexedMesh();
		zmold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldSphere=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldTriangle = function(zmoldname, zlenx, zleny, zlenz, zspecial1) {
	var zmold;
	try {
		zmold = new BABYLON.Mesh(zmoldname, scene);
		var zpositions = [-0.5,-0.5,-0.5,-0.5,0.5,0,-0.5,-0.5,0.5,0.5,-0.5,0.5,0.5,0.5,0,0.5,-0.5,-0.5];
		var zindices = [0,1,2,1,3,2,3,4,5,4,0,5,3,0,2,1,4,3,4,1,0,3,5,0];    
		var znormals = [-0.557,-0.437,-0.707,-0.551,0.835,0,-0.557,-0.437,0.707,0.557,-0.437,0.707,0.551,0.835,0,0.557,-0.437,-0.707];
		var zuvs = [0,0,0,0,0,0,0,0,0,0,0,0];
		BABYLON.VertexData.ComputeNormals(zpositions, zindices, znormals);
		var zvertexdata = new BABYLON.VertexData();
		zvertexdata.positions = zpositions;
		zvertexdata.indices = zindices;
		zvertexdata.normals = znormals;
		zvertexdata.uvs = zuvs;
		zvertexdata.applyToMesh(zmold, true);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zmold.convertToUnIndexedMesh();
		zmold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldTriangle=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldTorus = function(zmoldname, zlenx, zleny, zlenz, zsubdivisions, zspecial1) {
	var zmold;
	try {
		zmold = BABYLON.MeshBuilder.CreateTorus(zmoldname, {diameter: zspecial1, thickness: 1, tessellation: zsubdivisions, updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zmold.convertToUnIndexedMesh();
		zmold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldTorus=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldPlane = function(zmoldname, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = BABYLON.MeshBuilder.CreatePlane(zmoldname, {updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zmold.convertToUnIndexedMesh();
		zmold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldPlane=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldDisc = function(zmoldname, zlenx, zleny, zlenz, zsubdivisions) {
	var zmold;
	try {
		zmold = BABYLON.MeshBuilder.CreateDisc(zmoldname, {tessellation: zsubdivisions, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zmold.convertToUnIndexedMesh();
		zmold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldDisc=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldTube = function(zmoldname, zlenx, zleny, zlenz, zsubdivisions, zspecial1, zpath1) {
	var zmold;
	try {
		var zpatha = [];
		if (zlenx == undefined) {
			zlenx = 1;
		}
		if (zleny == undefined) {
			zleny = 1;
		}
		if (zlenz == undefined) {
			zlenz = 1;
		}
		if (zsubdivisions == undefined) {
			zsubdivisions = 16;
		}
		if (zpath1 == null || zpath1[0] == null) {
			zpatha.push(new BABYLON.Vector3(0, 0, 5));
			zpatha.push(new BABYLON.Vector3(0, 0, -5));
			zpatha.push(new BABYLON.Vector3(5, 0, -5)); 
		} else {
			for (var i=0;i < zpath1.length;i++) {
				if (zpath1[i] != null) {
					zpatha.push(new BABYLON.Vector3(Number(zpath1[i].x), Number(zpath1[i].y), Number(zpath1[i].z)));
				}
			}
		}
		zmold = BABYLON.Mesh.CreateTube(zmoldname, zpatha, zspecial1, zsubdivisions, null, BABYLON.Mesh.NO_CAP, scene, false, BABYLON.Mesh.DOUBLESIDE);
		/* cap : BABYLON.Mesh.NO_CAP, BABYLON.Mesh.CAP_START, BABYLON.Mesh.CAP_END, BABYLON.Mesh.CAP_ALL, */
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zmold.convertToUnIndexedMesh();
		zmold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldTube=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldLine = function(zmoldname, zlenx, zleny, zlenz, zpath1) {
	var zmold;
	try {
		var zpatha = [];
		if (zlenx == undefined) {
			zlenx = 1;
		}
		if (zleny == undefined) {
			zleny = 1;
		}
		if (zlenz == undefined) {
			zlenz = 1;
		}
		if (zpath1 == null || zpath1[0] == null) {
			zpatha.push(new BABYLON.Vector3(0, 0, (zlenz / 2)));
			zpatha.push(new BABYLON.Vector3(0, 0, (-zlenz / 2)));
			zpatha.push(new BABYLON.Vector3((zlenx / 2), 0, (-zlenz / 2)));
		} else {
			for (var i=0;i < zpath1.length;i++) {
				if (zpath1[i] != null) {
					zpatha.push(new BABYLON.Vector3(Number(zpath1[i].x), Number(zpath1[i].y), Number(zpath1[i].z)));
				}
			}
		}		
		zmold = BABYLON.MeshBuilder.CreateLines(zmoldname, {points: zpatha, useVertexAlpha: false, updatable: false}, scene);
		zmold.enableEdgesRendering();
		zmold.edgesWidth = zleny;
		zmold.edgesColor = new BABYLON.Color4(0, 1, 0, 1);
		zmold.convertToUnIndexedMesh();
		zmold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldLine=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldTerrain = function(zmoldname, zlenx, zleny, zlenz, zsubdivisions, zheightmappath, zheightmapid, zminheight, zmaxheight, zparentname, zmolddef, zcoveringname, zposx, zposy, zposz) {
	var zmold;
	try {
		if (zmolddef.graphics.heightmap.path != undefined) {
			zheightmappath = zmolddef.graphics.heightmap.path;
		}
		if (zheightmappath == '') {
			zheightmappath = '/content/system/stock/heightmap-1500x1500.jpg';
		}
		if (zheightmapid == '') {
			zheightmapid = 'dxmbplwoocpg5df3';
		}
		if (zheightmappath != null) {
			zheightmappath = zheightmappath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
		}
		if (WTW.adminView == 1) {
			zmold = BABYLON.MeshBuilder.CreateGroundFromHeightMap(zmoldname, zheightmappath, {width: 1, height: 1, subdivisions: zsubdivisions, minHeight: zminheight, maxHeight: zmaxheight, updatable: false}, scene);
			zmold.scaling.x = zlenx;
			zmold.scaling.z = zlenz;
		} else {
			zmold = BABYLON.MeshBuilder.CreateGroundFromHeightMap(zmoldname, zheightmappath, {width: zlenx, height: zlenz, subdivisions: zsubdivisions, minHeight: zminheight, maxHeight: zmaxheight, updatable: false}, scene);
		}
		zmold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldTerrain=' + ex.message);
	}
	return zmold;
}


WTWJS.prototype.addMoldDome = function(zmoldname, zlenx, zleny, zlenz, zsubdivisions, zspecial1) {
	var zmold;
	try {
		if (zspecial1 < 1) {
			zspecial1 = 1;
		}
		var zsphere1 = BABYLON.MeshBuilder.CreateSphere(zmoldname + '-sphere1', {segments: zsubdivisions, diameter:1, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		zsphere1.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zsphere1.position.y = 10;
		var zsphere1CSG = BABYLON.CSG.FromMesh(zsphere1);
		var zsphere2 = BABYLON.MeshBuilder.CreateSphere(zmoldname + '-sphere2', {segments: zsubdivisions, diameter:1, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		zsphere2.scaling = new BABYLON.Vector3(zlenx - zspecial1, zleny - zspecial1, zlenz - zspecial1);
		zsphere2.position.y = 10;
		var zsphere2CSG = BABYLON.CSG.FromMesh(zsphere2);
		var zbox1 = BABYLON.MeshBuilder.CreateBox(zmoldname + '-box1', {}, scene);
		zbox1.scaling = new BABYLON.Vector3(zlenx + 1, zleny + 1, zlenz + 1);
		zbox1.position = new BABYLON.Vector3(0, (10+zleny/2), 0);
		var zbox1CSG = BABYLON.CSG.FromMesh(zbox1);
		var zdomeCSG = zsphere1CSG.intersect(zbox1CSG);
		zdomeCSG = zdomeCSG.subtract(zsphere2CSG);
		var zcovering = new BABYLON.StandardMaterial('mat' + zmoldname, scene);
		zcovering.backFaceCulling = false;
		zmold = zdomeCSG.toMesh(zmoldname, zcovering, scene);
		WTW.disposeClean(zmoldname + '-sphere1');
		WTW.disposeClean(zmoldname + '-sphere2');
		WTW.disposeClean(zmoldname + '-box1');
		zmold.convertToUnIndexedMesh();
		zmold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldDome=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldHalfPipe = function(zmoldname, zlenx, zleny, zlenz, zsubdivisions, zspecial1) {
	var zmold;
	try {
		var zcylinder1 = BABYLON.MeshBuilder.CreateCylinder(zmoldname + '-cylinder1', {height: 1, diameterTop: 1, diameterBottom: 1, tessellation: zsubdivisions, subdivisions: 1, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		zcylinder1.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zcylinder1.rotation.x = WTW.getRadians(90);
		zcylinder1.rotation.y = WTW.getRadians(90);
		zcylinder1.position.y = 10;
		var zcylinder2 = BABYLON.MeshBuilder.CreateCylinder(zmoldname + '-cylinder2', {height: 1, diameterTop: 1, diameterBottom: 1, tessellation: zsubdivisions, subdivisions: 1, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		zcylinder2.scaling = new BABYLON.Vector3(zlenx-zspecial1, zleny + 1, zlenz-zspecial1);
		zcylinder2.rotation.x = WTW.getRadians(90);
		zcylinder2.rotation.y = WTW.getRadians(90);
		zcylinder2.position.y = 10;
		var zbox1 = BABYLON.MeshBuilder.CreateBox(zmoldname + '-box1', {}, scene);
		zbox1.scaling = new BABYLON.Vector3(zlenx + 1, zleny + 1, zlenz + 1);
		zbox1.position = new BABYLON.Vector3(0, 0, 0);
		zbox1.rotation.x = WTW.getRadians(90);
		zbox1.rotation.y = WTW.getRadians(90);
		zbox1.position.y = 10 - zleny/2;
		var zcylinder1CSG = BABYLON.CSG.FromMesh(zcylinder1);
		var zcylinder2CSG = BABYLON.CSG.FromMesh(zcylinder2);
		var zbox1CSG = BABYLON.CSG.FromMesh(zbox1);
		var zhalfpipeCSG = zcylinder1CSG.subtract(zbox1CSG).subtract(zcylinder2CSG)
		var zcovering = new BABYLON.StandardMaterial('mat' + zmoldname, scene);
		zcovering.backFaceCulling = false;
		zmold = zhalfpipeCSG.toMesh(zmoldname, zcovering, scene);
		WTW.disposeClean(zmoldname + '-cylinder1');
		WTW.disposeClean(zmoldname + '-cylinder2');
		WTW.disposeClean(zmoldname + '-box1');
		zmold.convertToUnIndexedMesh();
		zmold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldHalfPipe=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldSimpleTextBox = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx,zleny,zlenz);

		var zwebimageid = 't1qlqxd6pzubzzzy';
		var zwebtext = "<div style='font-size:24px;color:blue;'>Community Blog</div>";
		var zbasicmold = WTW.newMold();
		zbasicmold.shape = 'box';
		zbasicmold.covering = zmolddef.covering;
		zbasicmold.position.x = 0;
		zbasicmold.position.y = 0;
		zbasicmold.position.z = 0;
		zbasicmold.scaling.x = 1;
		zbasicmold.scaling.y = 1;
		zbasicmold.scaling.z = 1;
		zbasicmold.subdivisions = 12;
		zbasicmold.graphics.texture.id = zmolddef.graphics.texture.id;
		zbasicmold.parentname = zmoldname;
		zbasicmold.checkcollisions = '1';
		var zimageframe = WTW.addMold(zmoldname + '-simpletextboxframe', zbasicmold, zbasicmold.parentname, zbasicmold.covering);
		zimageframe.renderingGroupId = 1;

		var zbasicmold1 = WTW.newMold();
		zbasicmold1.shape = 'box';
		zbasicmold1.covering = 'texture';
		zbasicmold1.position.x = -.2;
		zbasicmold1.position.y = 0;
		zbasicmold1.position.z = 0;
		zbasicmold1.scaling.x = 1;
		zbasicmold1.scaling.y = 1;
		zbasicmold1.scaling.z = 1;
		zbasicmold1.rotation.x = -90;
		zbasicmold1.subdivisions = 12;
		zbasicmold1.webtext.webtext = WTW.encode(zwebtext);
		zbasicmold1.graphics.texture.id = zwebimageid;
		zbasicmold1.parentname = zmoldname;
		zbasicmold1.checkcollisions = '1';
		var ztextwall = WTW.addMold(zmoldname + '-simpletextboxwall', zbasicmold1, zbasicmold1.parentname, zbasicmold1.covering);
		ztextwall.renderingGroupId = 1;
		ztextwall.WTW = zbasicmold1;
		
		var ztexture = new BABYLON.DynamicTexture(zmoldname + '-simpletextboxtexture', {width: 512,height: 512}, scene, true);
		ztexture.name = zmoldname + '-simpletextboxtexture';
		ztexture.hasAlpha = true;
		ztexture.uScale = (zlenz/10);
		ztexture.vScale = (zleny/10);
		ztexture.uOffset = 0;
		ztexture.vOffset = (1 - (zleny/10));
		ztextwall.material.diffuseTexture = ztexture;
		var zscrollpos = 0;
		var zparagraph = WTW.wrapHtml(ztextwall, zwebtext, zscrollpos);
		zparagraph.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldSimpleTextBox=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldImage = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx,zleny,zlenz);
		
		var zbasemold = new BABYLON.TransformNode(zmoldname + '-base');
		zbasemold.position = new BABYLON.Vector3(0,0,0);
		zbasemold.rotation = new BABYLON.Vector3(0,0,0);
		zbasemold.scaling = new BABYLON.Vector3(1/zlenx,1/zleny,1/zlenz);
		zbasemold.parent = zmold;
		
		var zimageid = 't1qlqxd6pzubzzzy';
		var zimagepath = '/content/system/stock/lightgray-512x512.jpg';
		var ztextureid = 't1qlqxd6pzubzzzy';
		var ztexturepath = '/content/system/stock/lightgray-512x512.jpg';
		var zimagehoverid = '';
		var zimagehoverpath = '';
		var zimageclickid = '';
		var zimageclickpath = '';
		var zimagewallname = zmoldname + '-imagewall';
		var zuoffset = 0;
		var zvoffset = 0;
		var zuscale = 10/zleny;
		var zvscale = 10/zlenz;
		if (zmolddef != undefined) {
			if (zmolddef.shape != '') {
				zshape = zmolddef.shape;
			}
			if (zmolddef.graphics != undefined) {
				if (zmolddef.graphics.webimages[0] != null) {
					if (zmolddef.graphics.webimages[0].imageid != undefined) {
						if (zmolddef.graphics.webimages[0].imageid != '') {
							zimageid = zmolddef.graphics.webimages[0].imageid;
						}
					}
					if (zmolddef.graphics.webimages[0].imagepath != undefined) {
						if (zmolddef.graphics.webimages[0].imagepath != '') {
							zimagepath = zmolddef.graphics.webimages[0].imagepath;
							zimagepath = zimagepath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
						}
					}
					if (zmolddef.graphics.webimages[0].imagehoverid != undefined) {
						if (zmolddef.graphics.webimages[0].imagehoverid != '') {
							zimagehoverid = zmolddef.graphics.webimages[0].imagehoverid;
						}
					}
					if (zmolddef.graphics.webimages[0].imagehoverpath != undefined) {
						if (zmolddef.graphics.webimages[0].imagehoverpath != '') {
							zimagehoverpath = zmolddef.graphics.webimages[0].imagehoverpath;
							zimagehoverpath = zimagehoverpath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
						}
					}
					if (zmolddef.graphics.webimages[0].imageclickid != undefined) {
						if (zmolddef.graphics.webimages[0].imageclickid != '') {
							zimageclickid = zmolddef.graphics.webimages[0].imageclickid;
						}
					}
					if (zmolddef.graphics.webimages[0].imageclickpath != undefined) {
						if (zmolddef.graphics.webimages[0].imageclickpath != '') {
							zimageclickpath = zmolddef.graphics.webimages[0].imageclickpath;
							zimageclickpath = zimageclickpath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
						}
					}
				}
				if (zmolddef.graphics.texture.id != undefined) {
					ztextureid = zmolddef.graphics.texture.id;
				}
				if (zmolddef.graphics.texture.path != undefined) {
					ztexturepath = zmolddef.graphics.texture.path;
					ztexturepath = ztexturepath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
				}
			}
		}		
		var zmolddefimage = WTW.newMold();
		zmolddefimage.shape = 'box';
		zmolddefimage.covering = 'texture';
		zmolddefimage.position.x = 0;
		zmolddefimage.position.y = 0;
		zmolddefimage.position.z = 0;
		zmolddefimage.scaling.x = .2;
		zmolddefimage.scaling.y = zlenz;
		zmolddefimage.scaling.z = zleny;
		zmolddefimage.subdivisions = 12;
		zmolddefimage.graphics.texture.id = zimageid;
		zmolddefimage.graphics.texture.path = zimagepath;
		zmolddefimage.graphics.uscale = zvscale; /* intentionally swapped */
		zmolddefimage.graphics.vscale = zuscale; /* intentionally swapped */
		zmolddefimage.graphics.uoffset = zvoffset;
		zmolddefimage.graphics.voffset = zuoffset;
		zmolddefimage.parentname = zmoldname + '-base';
		zmolddefimage.checkcollisions = zmolddef.checkcollisions;
		var zimagemold = BABYLON.MeshBuilder.CreateBox(zmoldname + '-mainimage', {}, scene);
		zimagemold.scaling = new BABYLON.Vector3(.2, zlenz, zleny);
		zimagemold.rotation.x = WTW.getRadians(-90);
		zimagemold.material = WTW.addCovering('texture', zmoldname + '-mainimage', zmolddefimage, .2, zlenz, zleny, '0', '0');
		zimagemold.material.alpha = 1;
		if (zmolddef.checkcollisions == '1') {
			zimagemold.checkCollisions = true;
		}
		zimagemold.renderingGroupId = 1;
		zimagemold.parent = zbasemold;
		if (zimagehoverid != '' && zimagehoverid != 't1qlqxd6pzubzzzy') {
			var zmolddefhoverimage = WTW.newMold();
			zmolddefhoverimage.shape = 'box';
			zmolddefhoverimage.covering = 'texture';
			zmolddefhoverimage.position.x = 0;
			zmolddefhoverimage.position.y = 0;
			zmolddefhoverimage.position.z = 0;
			zmolddefhoverimage.scaling.x = .15;
			zmolddefhoverimage.scaling.y = zlenz;
			zmolddefhoverimage.scaling.z = zleny;
			zmolddefhoverimage.subdivisions = 12;
			zmolddefhoverimage.graphics.texture.id = zimagehoverid;
			zmolddefhoverimage.graphics.texture.path = zimagehoverpath;
			zmolddefhoverimage.graphics.uscale = zvscale; /* intentionally swapped */
			zmolddefhoverimage.graphics.vscale = zuscale; /* intentionally swapped */
			zmolddefhoverimage.graphics.uoffset = zvoffset;
			zmolddefhoverimage.graphics.voffset = zuoffset;
			zmolddefhoverimage.parentname = zmoldname + '-base';
			zmolddefhoverimage.checkcollisions = '1';
			var zhoverimagemold = BABYLON.MeshBuilder.CreateBox(zmoldname + '-hoverimage', {}, scene);
			zhoverimagemold.scaling = new BABYLON.Vector3(.15, zlenz, zleny);
			zhoverimagemold.rotation.x = WTW.getRadians(-90);
			zhoverimagemold.material = WTW.addCovering('texture', zmoldname + '-hoverimage', zmolddefhoverimage, .15, zlenz, zleny, '0', '0');
			zhoverimagemold.renderingGroupId = 1;
			zhoverimagemold.parent = zbasemold;		
		}
		if (zimageclickid != '' && zimageclickid != 't1qlqxd6pzubzzzy') {
			var zmolddefclickimage = WTW.newMold();
			zmolddefclickimage.shape = 'box';
			zmolddefclickimage.covering = 'texture';
			zmolddefclickimage.position.x = 0;
			zmolddefclickimage.position.y = 0;
			zmolddefclickimage.position.z = 0;
			zmolddefclickimage.scaling.x = .25;
			zmolddefclickimage.scaling.y = zlenz;
			zmolddefclickimage.scaling.z = zleny;
			zmolddefclickimage.subdivisions = 12;
			zmolddefclickimage.opacity = 0;
			zmolddefclickimage.graphics.texture.id = zimageclickid;
			zmolddefclickimage.graphics.texture.path = zimageclickpath;
			zmolddefclickimage.graphics.uscale = zvscale; /* intentionally swapped */
			zmolddefclickimage.graphics.vscale = zuscale; /* intentionally swapped */
			zmolddefclickimage.graphics.uoffset = zvoffset;
			zmolddefclickimage.graphics.voffset = zuoffset;
			zmolddefclickimage.parentname = zmoldname + '-base';
			zmolddefclickimage.checkcollisions = '1';
			var zclickimagemold = BABYLON.MeshBuilder.CreateBox(zmoldname + '-clickimage', {}, scene);
			zclickimagemold.scaling = new BABYLON.Vector3(.25, zlenz, zleny);
			zclickimagemold.rotation.x = WTW.getRadians(-90);
			zclickimagemold.material = WTW.addCovering('texture', zmoldname + '-clickimage', zmolddefclickimage, .25, zlenz, zleny, '0', '0');
			zclickimagemold.renderingGroupId = 1;
			zclickimagemold.parent = zbasemold;
		}
		if (zmolddef.covering != 'glass') {
			var zmolddefframe = WTW.newMold();
			zmolddefframe.shape = 'box';
			zmolddefframe.covering = zmolddef.covering;
			zmolddefframe.color = zmolddef.color;
			zmolddefframe.position.x = .05;
			zmolddefframe.position.y = 0;
			zmolddefframe.position.z = 0;
			zmolddefframe.scaling.x = .2;
			zmolddefframe.scaling.y = zlenz * 1.02;
			zmolddefframe.scaling.z = zleny * 1.02;
			zmolddefframe.subdivisions = 12;
			zmolddefframe.graphics.texture.id = ztextureid;
			zmolddefframe.graphics.texture.path = ztexturepath;
			zmolddefframe.graphics.uscale = zvscale; /* intentionally swapped */
			zmolddefframe.graphics.vscale = zuscale; /* intentionally swapped */
			zmolddefframe.graphics.uoffset = zvoffset;
			zmolddefframe.graphics.voffset = zuoffset;
			zmolddefframe.parentname = zmoldname + '-base';
			zmolddefframe.checkcollisions = '1';
			var zimageframemold = BABYLON.MeshBuilder.CreateBox(zmoldname + '-imageframe', {}, scene);
			zimageframemold.scaling = new BABYLON.Vector3(.2, zlenz * 1.02, zleny * 1.02);
			zimageframemold.position = new BABYLON.Vector3(.05, 0, 0);
			zimageframemold.rotation.x = WTW.getRadians(-90);
			zimageframemold.material = WTW.addCovering(zmolddef.covering, zmoldname + '-imageframe', zmolddefframe, .2, zlenz * 1.02, zleny * 1.02, '0', '0');
			zimageframemold.renderingGroupId = 1;
			zimageframemold.parent = zbasemold;	
			zimageframemold.material.alpha = 1;	
		}		
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldImage=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldRaisedImage = async function(zmoldname, zmolddef, zlenx, zleny, zlenz, zsubdivisions, zheightmappath, zminheight, zmaxheight) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx,zleny,zlenz);

		var zbasemold = new BABYLON.TransformNode(zmoldname + '-base');
		zbasemold.position = new BABYLON.Vector3(0,0,0);
		zbasemold.rotation = new BABYLON.Vector3(0,0,0);
		zbasemold.scaling = new BABYLON.Vector3(1/zlenx,1/zleny,1/zlenz);
		zbasemold.parent = zmold;

		var ztextureid = 't1qlqxd6pzubzzzy';
		var ztexturepath = '/content/system/stock/lightgray-512x512.jpg';
		var zimageid = 't1qlqxd6pzubzzzy';
		var zimagepath = '/content/system/stock/lightgray-512x512.jpg';
		var zimagehoverid = '';
		var zimagehoverpath = '';
		var zimagewallname = zmoldname + '-imagewall';
		if (zmolddef.graphics.webimages[0] != null) {
			if (zmolddef.graphics.webimages[0].imageid != undefined) {
				if (zmolddef.graphics.webimages[0].imageid != '') {
					zimageid = zmolddef.graphics.webimages[0].imageid;
				}
			}
			if (zmolddef.graphics.webimages[0].imagepath != undefined) {
				if (zmolddef.graphics.webimages[0].imagepath != '') {
					zimagepath = zmolddef.graphics.webimages[0].imagepath;
					zimagepath = zimagepath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
				}
			}
			if (zmolddef.graphics.webimages[0].imagehoverid != undefined) {
				if (zmolddef.graphics.webimages[0].imagehoverid != '') {
					zimagehoverid = zmolddef.graphics.webimages[0].imagehoverid;
				}
			}
			if (zmolddef.graphics.webimages[0].imagehoverpath != undefined) {
				if (zmolddef.graphics.webimages[0].imagehoverpath != '') {
					zimagehoverpath = zmolddef.graphics.webimages[0].imagehoverpath;
					zimagehoverpath = zimagehoverpath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
				}
			}
		}
		if (zmolddef.graphics.texture.id != undefined) {
			if (zmolddef.graphics.texture.id != '') {
				ztextureid = zmolddef.graphics.texture.id;
			}
		}
		if (zmolddef.graphics.texture.path != undefined) {
			if (zmolddef.graphics.texture.path != '') {
				ztexturepath = zmolddef.graphics.texture.path;
				ztexturepath = ztexturepath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
			}
		}
		if (WTW.isUploadReady(zimageid) == false && zimageid != '') {
			WTW.initLoadUpload(zimageid, zimageid, 5);
		}
		if (WTW.isUploadReady(zimagehoverid) == false && zimagehoverid != '') {
			WTW.initLoadUpload(zimagehoverid, zimagehoverid, 5);
			zimagewallname = zmoldname + '-imagewall';
		}
		var zraisedmold = BABYLON.MeshBuilder.CreateGroundFromHeightMap(zmoldname + '-raised', zheightmappath, {width: 1, height: 1, subdivisions: zsubdivisions, minHeight: zminheight, maxHeight: zmaxheight, updatable: false}, scene);
		zraisedmold.position.x = .05;
		zraisedmold.scaling.x = zlenz;
		zraisedmold.scaling.z = zleny;
		zraisedmold.rotation.z = WTW.getRadians(90);
		zraisedmold.rotation.x = WTW.getRadians(270);
		zraisedmold.renderingGroupId = 1;
		zraisedmold.parent = zbasemold;
		zraisedmold.convertToUnIndexedMesh();
		var zuoffset = 0;
		var zvoffset = 0;
		var zuscale = 1;
		var zvscale = 1;
		var zcovering = new BABYLON.StandardMaterial('mat-' + zmoldname + '-raised', scene);
		async function loadcoveringtexture(zmoldname, zcovering, zimageid, zuscale, zvscale, zuoffset, zvoffset) {
			var zimageinfo = WTW.getUploadFileData(zimageid);
			var zimageextension = zimageinfo.extension;
			zcovering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.filedata, 'mattexture' + zmoldname + '-raised', scene);
			zcovering.diffuseTexture.uScale = zuscale;
			zcovering.diffuseTexture.vScale = zvscale;
			zcovering.diffuseTexture.uOffset = zuoffset;
			zcovering.diffuseTexture.vOffset = zvoffset;
			zcovering.specularColor = new BABYLON.Color3(.4, .4, .4);
			zcovering.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);	
			var zthisraisedmold = WTW.getMeshOrNodeByID(zmoldname + '-raised');
			if (zthisraisedmold != null) {
				zthisraisedmold.material = zcovering;
			}
		}
		var zmolddefimage = WTW.newMold();
		zmolddefimage.shape = 'box';
		zmolddefimage.covering = 'directional texture';
		zmolddefimage.position.x = 0;
		zmolddefimage.position.y = 0;
		zmolddefimage.position.z = 0;
		zmolddefimage.scaling.x = .2;
		zmolddefimage.scaling.y = zleny;
		zmolddefimage.scaling.z = zlenz;
		zmolddefimage.subdivisions = 12;
		zmolddefimage.graphics.texture.id = zimageid;
		zmolddefimage.graphics.texture.path = zimagepath;
		zmolddefimage.graphics.uscale = 10/zleny;
		zmolddefimage.graphics.vscale = 10/zlenz;
		zmolddefimage.parentname = zmoldname + '-base';
		zmolddefimage.checkcollisions = zmolddef.checkcollisions;;
		var zimagemold = BABYLON.MeshBuilder.CreateBox(zmoldname + '-mainimage', {}, scene);
		zimagemold.scaling = new BABYLON.Vector3(.2, zleny, zlenz);
		zimagemold.material = WTW.addCovering('directional texture', zmoldname + '-mainimage', zmolddefimage, .2, zleny, zlenz, '0', '0');
		zimagemold.material.alpha = 1;
		if (zmolddef.checkcollisions == '1') {
			zimagemold.checkCollisions = true;
		}
		zimagemold.renderingGroupId = 1;
		zimagemold.parent = zbasemold;
		if (zimagehoverid != '' && zimagehoverid != 't1qlqxd6pzubzzzy') {
			var zmolddefhoverimage = WTW.newMold();
			zmolddefhoverimage.shape = 'box';
			zmolddefhoverimage.covering = 'directional texture';
			zmolddefhoverimage.position.x = 0;
			zmolddefhoverimage.position.y = 0;
			zmolddefhoverimage.position.z = 0;
			zmolddefhoverimage.scaling.x = .15;
			zmolddefhoverimage.scaling.y = zleny;
			zmolddefhoverimage.scaling.z = zlenz;
			zmolddefhoverimage.subdivisions = 12;
			zmolddefhoverimage.graphics.texture.id = zimagehoverid;
			zmolddefhoverimage.graphics.texture.path = zimagehoverpath;
			zmolddefhoverimage.graphics.uscale = 10/zleny;
			zmolddefhoverimage.graphics.vscale = 10/zlenz;
			zmolddefhoverimage.parentname = zmoldname + '-base';
			zmolddefhoverimage.checkcollisions = '1';
			var zhoverimagemold = BABYLON.MeshBuilder.CreateBox(zmoldname + '-hoverimage', {}, scene);
			zhoverimagemold.scaling = new BABYLON.Vector3(.15, zleny, zlenz);
			zhoverimagemold.material = WTW.addCovering('directional texture', zmoldname + '-hoverimage', zmolddefhoverimage, .15, zleny, zlenz, '0', '0');
			zhoverimagemold.renderingGroupId = 1;
			zhoverimagemold.parent = zbasemold;		
		}
		if (zmolddef.covering != 'glass') {
			var zmolddefframe = WTW.newMold();
			zmolddefframe.shape = 'box';
			zmolddefframe.covering = zmolddef.covering;
			zmolddefframe.position.x = .1;
			zmolddefframe.position.y = 0;
			zmolddefframe.position.z = 0;
			zmolddefframe.scaling.x = .2;
			zmolddefframe.scaling.y = zleny * 1.02;
			zmolddefframe.scaling.z = zlenz * 1.02;
			zmolddefframe.color = zmolddef.color;
			zmolddefframe.subdivisions = 12;
			zmolddefframe.graphics.texture.id = zmolddef.graphics.texture.id;
			zmolddefframe.graphics.texture.path = zmolddef.graphics.texture.path;
			zmolddefframe.graphics.uscale = 10/zleny;
			zmolddefframe.graphics.vscale = 10/zlenz;
			zmolddefframe.parentname = zmoldname + '-base';
			zmolddefframe.checkcollisions = '1';
			var zimageframemold = BABYLON.MeshBuilder.CreateBox(zmoldname + '-imageframe', {}, scene);
			zimageframemold.scaling = new BABYLON.Vector3(.2, zleny * 1.02, zlenz * 1.02);
			zimageframemold.position = new BABYLON.Vector3(.1, 0, 0);
			zimageframemold.material = WTW.addCovering('directional texture', zmoldname + '-imageframe', zmolddefframe, .2, zleny * 1.02, zlenz * 1.02, '0', '0');
			zimageframemold.renderingGroupId = 1;
			zimageframemold.parent = zbasemold;	
			zimageframemold.material.alpha = 1;	
		}
		if (WTW.isUploadReady(zimageid)) {
			loadcoveringtexture(zmoldname, zcovering, zimageid, zuscale, zvscale, zuoffset, zvoffset);
		} else {
			WTW.getAsyncJSON('/connect/upload.php?uploadid=' + zimageid, 
				function(zresponse) {
					WTW.loadUpload(JSON.parse(zresponse), zimageid, 0);
					loadcoveringtexture(zmoldname, zcovering, zimageid, zuscale, zvscale, zuoffset, zvoffset);
				}
			);
		}
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldRaisedImage=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldVideo = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
    var zmold;
    try {
		var zpositionx = 0;
		var zpositiony = 0;
		var zpositionz = 0;
		var zrotationx = 0;
		var zrotationy = 0;
		var zrotationz = 0;
		if (zmolddef.position.x != undefined) {
			if (WTW.isNumeric(zmolddef.position.x)) {
				zpositionx = Number(zmolddef.position.x);
			}
		}
		if (zmolddef.position.y != undefined) {
			if (WTW.isNumeric(zmolddef.position.y)) {
				zpositiony = Number(zmolddef.position.y);
			}
		}
		if (zmolddef.position.z != undefined) {
			if (WTW.isNumeric(zmolddef.position.z)) {
				zpositionz = Number(zmolddef.position.z);
			}
		}
		if (zmolddef.rotation.x != undefined) {
			if (WTW.isNumeric(zmolddef.rotation.x)) {
				zrotationx = Number(zmolddef.rotation.x);
			}
		}
		if (zmolddef.rotation.y != undefined) {
			if (WTW.isNumeric(zmolddef.rotation.y)) {
				zrotationy = Number(zmolddef.rotation.y);
			}
		}
		if (zmolddef.rotation.z != undefined) {
			if (WTW.isNumeric(zmolddef.rotation.z)) {
				zrotationz = Number(zmolddef.rotation.z);
			}
		}
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(zpositionx,zpositiony,zpositionz);
		zmold.rotation = new BABYLON.Vector3(WTW.getRadians(zrotationx),WTW.getRadians(zrotationy),WTW.getRadians(zrotationz));
		zmold.scaling = new BABYLON.Vector3(zlenx,zleny,zlenz);
		
		if (WTW.adminView == 1) {
			var zbasemold = new BABYLON.TransformNode(zmoldname + '-guide');
			zbasemold.position = new BABYLON.Vector3(0,0,0);
			zbasemold.rotation = new BABYLON.Vector3(0,0,0);
			zbasemold.scaling = new BABYLON.Vector3(.87,9.4,16.4);
			zbasemold.parent = zmold;
		}

		var zloop = false;
        var zvideo = '/content/system/images/EnterWelcomeCenter.mp4';
		var zvideoposter = '/content/system/images/videoposter.jpg';
		if (zmolddef.sound.loop != undefined) {
			if (zmolddef.sound.loop == '1') {
				zloop = true;
			}
		}
		if (zmolddef.graphics.texture.video != undefined) {
			if (zmolddef.graphics.texture.video != '') {
				zvideo = zmolddef.graphics.texture.video;
			}
		}
		if (zmolddef.graphics.texture.videoposter != undefined) {
			if (zmolddef.graphics.texture.videoposter != '') {
				zvideoposter = zmolddef.graphics.texture.videoposter;
			}
		}
		zmolddef.objects.folder = '/content/system/babylon/tv/';
		zmolddef.objects.file = 'tv.babylon';
		BABYLON.SceneLoader.ImportMeshAsync('', zmolddef.objects.folder, zmolddef.objects.file, scene).then(
			function (zresults) {
				if (zresults.meshes != null) {
					var zobjectanimations = [];
					
					// add object animations using WTW.newObjectAnimation();
					zobjectanimations[0] = WTW.newObjectAnimation();
					zobjectanimations[0].animationname = 'playTV';
					zobjectanimations[0].moldevent = 'onclick';
					zobjectanimations[0].moldnamepart = 'play';
					zobjectanimations[0].startframe = 10;
					zobjectanimations[0].endframe = 20;
					zobjectanimations[0].animationloop = false;
					zobjectanimations[0].speedratio = 1.00;
					zobjectanimations[0].additionalscript = 'WTW.checkVideoClick';
					zobjectanimations[0].additionalparameters = zmoldname + ',1';
					
					zobjectanimations[1] = WTW.newObjectAnimation();
					zobjectanimations[1].animationname = 'pauseTV';
					zobjectanimations[1].moldevent = 'onclick';
					zobjectanimations[1].moldnamepart = 'pause';
					zobjectanimations[1].startframe = 10;
					zobjectanimations[1].endframe = 20;
					zobjectanimations[1].animationloop = false;
					zobjectanimations[1].speedratio = 1.00;
					zobjectanimations[1].additionalscript = 'WTW.checkVideoClick';
					zobjectanimations[1].additionalparameters = zmoldname + ',0';
					
					zobjectanimations[2] = WTW.newObjectAnimation();
					zobjectanimations[2].animationname = 'stopTV';
					zobjectanimations[2].moldevent = 'onclick';
					zobjectanimations[2].moldnamepart = 'stop';
					zobjectanimations[2].startframe = 10;
					zobjectanimations[2].endframe = 20;
					zobjectanimations[2].animationloop = false;
					zobjectanimations[2].speedratio = 1.00;
					zobjectanimations[2].additionalscript = 'WTW.checkVideoClick';
					zobjectanimations[2].additionalparameters = zmoldname + ',-1';
					
					zobjectanimations[3] = WTW.newObjectAnimation();
					zobjectanimations[3].animationname = 'fullScreenTV';
					zobjectanimations[3].moldevent = 'onclick';
					zobjectanimations[3].moldnamepart = 'fullscreen';
					zobjectanimations[3].startframe = 10;
					zobjectanimations[3].endframe = 20;
					zobjectanimations[3].animationloop = false;
					zobjectanimations[3].speedratio = 1.00;
					zobjectanimations[3].additionalscript = 'WTW.checkVideoClick';
					zobjectanimations[3].additionalparameters = zmoldname + ',9';

					zobjectanimations[4] = WTW.newObjectAnimation();
					zobjectanimations[4].animationname = 'startAgainTV';
					zobjectanimations[4].moldevent = 'onclick';
					zobjectanimations[4].moldnamepart = 'startagain';
					zobjectanimations[4].startframe = 10;
					zobjectanimations[4].endframe = 20;
					zobjectanimations[4].animationloop = false;
					zobjectanimations[4].speedratio = 1.00;
					zobjectanimations[4].additionalscript = 'WTW.checkVideoClick';
					zobjectanimations[4].additionalparameters = zmoldname + ',2';

					zobjectanimations[5] = WTW.newObjectAnimation();
					zobjectanimations[5].animationname = 'onmouseoverPlayTV';
					zobjectanimations[5].moldevent = 'onmouseover';
					zobjectanimations[5].moldnamepart = 'play';
					zobjectanimations[5].startframe = 40;
					zobjectanimations[5].endframe = 42;
					zobjectanimations[5].animationloop = false;
					zobjectanimations[5].speedratio = 2;
					zobjectanimations[5].additionalscript = 'WTW.showToolTip';
					zobjectanimations[5].additionalparameters = 'Play';
					
					zobjectanimations[6] = WTW.newObjectAnimation();
					zobjectanimations[6].animationname = 'onmouseoverPauseTV';
					zobjectanimations[6].moldevent = 'onmouseover';
					zobjectanimations[6].moldnamepart = 'pause';
					zobjectanimations[6].startframe = 40;
					zobjectanimations[6].endframe = 42;
					zobjectanimations[6].animationloop = false;
					zobjectanimations[6].speedratio = 2;
					zobjectanimations[6].additionalscript = 'WTW.showToolTip';
					zobjectanimations[6].additionalparameters = 'Pause';
					
					zobjectanimations[7] = WTW.newObjectAnimation();
					zobjectanimations[7].animationname = 'onmouseoverStopTV';
					zobjectanimations[7].moldevent = 'onmouseover';
					zobjectanimations[7].moldnamepart = 'stop';
					zobjectanimations[7].startframe = 40;
					zobjectanimations[7].endframe = 42;
					zobjectanimations[7].animationloop = false;
					zobjectanimations[7].speedratio = 2;
					zobjectanimations[7].additionalscript = 'WTW.showToolTip';
					zobjectanimations[7].additionalparameters = 'Stop';
					
					zobjectanimations[8] = WTW.newObjectAnimation();
					zobjectanimations[8].animationname = 'onmouseoverFullScreenTV';
					zobjectanimations[8].moldevent = 'onmouseover';
					zobjectanimations[8].moldnamepart = 'fullscreen';
					zobjectanimations[8].startframe = 40;
					zobjectanimations[8].endframe = 42;
					zobjectanimations[8].animationloop = false;
					zobjectanimations[8].speedratio = 2;
					zobjectanimations[8].additionalscript = 'WTW.showToolTip';
					zobjectanimations[8].additionalparameters = 'Full Screen';

					zobjectanimations[9] = WTW.newObjectAnimation();
					zobjectanimations[9].animationname = 'onmouseoverStartAgainTV';
					zobjectanimations[9].moldevent = 'onmouseover';
					zobjectanimations[9].moldnamepart = 'startagain';
					zobjectanimations[9].startframe = 40;
					zobjectanimations[9].endframe = 42;
					zobjectanimations[9].animationloop = false;
					zobjectanimations[9].speedratio = 2;
					zobjectanimations[9].additionalscript = 'WTW.showToolTip';
					zobjectanimations[9].additionalparameters = 'Start Again';

					zobjectanimations[10] = WTW.newObjectAnimation();
					zobjectanimations[10].animationname = 'onmouseoutPlayTV';
					zobjectanimations[10].moldevent = 'onmouseout';
					zobjectanimations[10].moldnamepart = 'play';
					zobjectanimations[10].startframe = 50;
					zobjectanimations[10].endframe = 52;
					zobjectanimations[10].animationloop = false;
					zobjectanimations[10].speedratio = 2;
					zobjectanimations[10].additionalscript = 'WTW.hide';
					zobjectanimations[10].additionalparameters = 'wtw_itooltip';
					
					zobjectanimations[11] = WTW.newObjectAnimation();
					zobjectanimations[11].animationname = 'onmouseoutPauseTV';
					zobjectanimations[11].moldevent = 'onmouseout';
					zobjectanimations[11].moldnamepart = 'pause';
					zobjectanimations[11].startframe = 50;
					zobjectanimations[11].endframe = 52;
					zobjectanimations[11].animationloop = false;
					zobjectanimations[11].speedratio = 2;
					zobjectanimations[11].additionalscript = 'WTW.hide';
					zobjectanimations[11].additionalparameters = 'wtw_itooltip';
					
					zobjectanimations[12] = WTW.newObjectAnimation();
					zobjectanimations[12].animationname = 'onmouseoutStopTV';
					zobjectanimations[12].moldevent = 'onmouseout';
					zobjectanimations[12].moldnamepart = 'stop';
					zobjectanimations[12].startframe = 50;
					zobjectanimations[12].endframe = 52;
					zobjectanimations[12].animationloop = false;
					zobjectanimations[12].speedratio = 2;
					zobjectanimations[12].additionalscript = 'WTW.hide';
					zobjectanimations[12].additionalparameters = 'wtw_itooltip';
					
					zobjectanimations[13] = WTW.newObjectAnimation();
					zobjectanimations[13].animationname = 'onmouseoutFullScreenTV';
					zobjectanimations[13].moldevent = 'onmouseout';
					zobjectanimations[13].moldnamepart = 'fullscreen';
					zobjectanimations[13].startframe = 50;
					zobjectanimations[13].endframe = 52;
					zobjectanimations[13].animationloop = false;
					zobjectanimations[13].speedratio = 2;
					zobjectanimations[13].additionalscript = 'WTW.hide';
					zobjectanimations[13].additionalparameters = 'wtw_itooltip';

					zobjectanimations[14] = WTW.newObjectAnimation();
					zobjectanimations[14].animationname = 'onmouseoutStartAgainTV';
					zobjectanimations[14].moldevent = 'onmouseout';
					zobjectanimations[14].moldnamepart = 'startagain';
					zobjectanimations[14].startframe = 50;
					zobjectanimations[14].endframe = 52;
					zobjectanimations[14].animationloop = false;
					zobjectanimations[14].speedratio = 2;
					zobjectanimations[14].additionalscript = 'WTW.hide';
					zobjectanimations[14].additionalparameters = 'wtw_itooltip';
					
					zmold = scene.getTransformNodeByID(zmoldname);

					for (var i=0; i < zresults.meshes.length; i++) {
						if (zresults.meshes[i] != null) {
							var zmeshname = zresults.meshes[i].name.toLowerCase();
							var zchildmoldname = zmoldname + '-' + zmeshname;
							zresults.meshes[i].name = zchildmoldname;
							zresults.meshes[i].id = zchildmoldname;
							zresults.meshes[i].renderingGroupId = 1;
							if (zresults.meshes[i].parent == null) {
								zresults.meshes[i].parent = zmold;
							}
							if (zobjectanimations != null) {
								WTW.addMoldAnimation(zmoldname, zmeshname, zresults.meshes[i], zobjectanimations);
							}
						}
					}
				}
				/* check to see if the mold still exists since the time it was requested */
				var zmold = WTW.getMeshOrNodeByID(zmoldname);
				if (zmold == null) {
					WTW.disposeClean(zmoldname);
				}
			}
		);
        var zvideomat = new BABYLON.StandardMaterial(zmoldname + '-mat', scene);
        var zvideotexture = new BABYLON.VideoTexture(zmoldname + '-video', zvideo, scene, false, false); /* generateMipMaps?: boolean, invertY?: boolean */
        zvideomat.diffuseTexture = zvideotexture;
        zvideomat.alpha = 1;
        zvideomat.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
        var zvideomold = BABYLON.MeshBuilder.CreatePlane(zmoldname + '-mainvideo', {height: 9, width: 16, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
        zvideomold.position.x = (zlenx * .1);
		zvideomold.rotation.y = WTW.getRadians(-90);
        zvideomold.material = zvideomat;
        zvideomold.material.diffuseTexture.video.loop = zloop;
        zvideomold.WTW = {'videosrc':zvideo,'firstvideoclick':false};
		zvideomold.renderingGroupId = 1;
        zvideomold.parent = zmold;

        var zvideopostermold = BABYLON.MeshBuilder.CreatePlane(zmoldname + '-videoposter', {height: 9, width: 16.2, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
        zvideopostermold.position.x = zvideomold.position.x + .1;
		zvideopostermold.rotation.y = WTW.getRadians(-90);
		zvideopostermold.renderingGroupId = 1;
		zvideopostermold.parent = zmold;
        var zpostermat = new BABYLON.StandardMaterial(zmoldname + '-postermat', scene);
        zpostermat.diffuseTexture = new BABYLON.Texture(zvideoposter, scene);
        zpostermat.diffuseTexture.hasAlpha = false;
		zpostermat.alpha = 1;
		zpostermat.specularColor = new BABYLON.Color3(1,1,1);
		zpostermat.emissiveColor = new BABYLON.Color3(1,1,1);
		zpostermat.diffuseColor = new BABYLON.Color3(1,1,1);
		zvideopostermold.material = zpostermat;
    } catch (ex) {
        WTW.log('core-scripts-molds-basicmolds\r\n addMoldVideo=' + ex.message);
    }
    return zmold;
}

WTWJS.prototype.addMoldCreateSceneKiosk = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
    var zmold;
    try {
		var zpositionx = 0;
		var zpositiony = 0;
		var zpositionz = 0;
		var zrotationx = 0;
		var zrotationy = 0;
		var zrotationz = 0;
		if (zmolddef.position.x != undefined) {
			if (WTW.isNumeric(zmolddef.position.x)) {
				zpositionx = Number(zmolddef.position.x);
			}
		}
		if (zmolddef.position.y != undefined) {
			if (WTW.isNumeric(zmolddef.position.y)) {
				zpositiony = Number(zmolddef.position.y);
			}
		}
		if (zmolddef.position.z != undefined) {
			if (WTW.isNumeric(zmolddef.position.z)) {
				zpositionz = Number(zmolddef.position.z);
			}
		}
		if (zmolddef.rotation.x != undefined) {
			if (WTW.isNumeric(zmolddef.rotation.x)) {
				zrotationx = Number(zmolddef.rotation.x);
			}
		}
		if (zmolddef.rotation.y != undefined) {
			if (WTW.isNumeric(zmolddef.rotation.y)) {
				zrotationy = Number(zmolddef.rotation.y);
			}
		}
		if (zmolddef.rotation.z != undefined) {
			if (WTW.isNumeric(zmolddef.rotation.z)) {
				zrotationz = Number(zmolddef.rotation.z);
			}
		}
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(zpositionx,zpositiony,zpositionz);
		zmold.rotation = new BABYLON.Vector3(WTW.getRadians(zrotationx),WTW.getRadians(zrotationy),WTW.getRadians(zrotationz));
		zmold.scaling = new BABYLON.Vector3(zlenx,zleny,zlenz);
		
		if (WTW.adminView == 1) {
			var zbasemold = new BABYLON.TransformNode(zmoldname + '-guide');
			zbasemold.position = new BABYLON.Vector3(0,5.35,0);
			zbasemold.rotation = new BABYLON.Vector3(0,0,0);
			zbasemold.scaling = new BABYLON.Vector3(3.7,10.7,3.7);
			zbasemold.parent = zmold;
		}

		var zloop = false;
		zmolddef.objects.folder = '/content/system/babylon/createscene/';
		zmolddef.objects.file = 'createscene.babylon';
		BABYLON.SceneLoader.ImportMeshAsync('', zmolddef.objects.folder, zmolddef.objects.file, scene).then(
			function (zresults) {
				if (zresults.meshes != null) {
					var zobjectanimations = [];
					
					// add object animations using WTW.newObjectAnimation();
					zobjectanimations[0] = WTW.newObjectAnimation();
					zobjectanimations[0].animationname = 'createSceneButton';
					zobjectanimations[0].moldevent = 'onclick';
					zobjectanimations[0].moldnamepart = 'createscene';
					zobjectanimations[0].startframe = 1;
					zobjectanimations[0].endframe = 40;
					zobjectanimations[0].animationloop = false;
					zobjectanimations[0].speedratio = 1.00;
					zobjectanimations[0].additionalscript = 'WTW.create3DWebsite';
					zobjectanimations[0].additionalparameters = '';

					zmold = scene.getTransformNodeByID(zmoldname);

					for (var i=0; i < zresults.meshes.length; i++) {
						if (zresults.meshes[i] != null) {
							var zmeshname = zresults.meshes[i].name.toLowerCase();
							var zchildmoldname = zmoldname + '-' + zmeshname;
							zresults.meshes[i].name = zchildmoldname;
							zresults.meshes[i].id = zchildmoldname;
							zresults.meshes[i].renderingGroupId = 1;
							if (zresults.meshes[i].parent == null) {
								zresults.meshes[i].parent = zmold;
							}
							if (zobjectanimations != null) {
								WTW.addMoldAnimation(zmoldname, zmeshname, zresults.meshes[i], zobjectanimations);
							}
						}
					}
				}
				/* check to see if the mold still exists since the time it was requested */
				var zmold = WTW.getMeshOrNodeByID(zmoldname);
				if (zmold == null) {
					WTW.disposeClean(zmoldname);
				}
			}
		);
    } catch (ex) {
        WTW.log('core-scripts-molds-basicmolds\r\n addMoldCreateSceneKiosk=' + ex.message);
    }
    return zmold;
}

WTWJS.prototype.addMoldCandleFlame = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = BABYLON.MeshBuilder.CreatePlane(zmoldname, {updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zmold.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
		var zcovering = new BABYLON.FireMaterial('mat' + zmoldname, scene);
		zcovering.diffuseTexture = new BABYLON.Texture('/content/system/images/fire.png', scene);
		zcovering.distortionTexture = new BABYLON.Texture('/content/system/images/distortion.png', scene);
		zcovering.opacityTexture = new BABYLON.Texture('/content/system/images/candleopacity.png', scene);
		zcovering.speed = 5.0;
		zmold.material = zcovering;
		zmold.convertToUnIndexedMesh();
		zmold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldCandleFlame=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldWaterPlane = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx,1,zlenz);

		var zbasemold = new BABYLON.TransformNode(zmoldname + '-base');
		zbasemold.position = new BABYLON.Vector3(0,0,0);
		zbasemold.rotation = new BABYLON.Vector3(0,0,0);
		zbasemold.scaling = new BABYLON.Vector3(1/zlenx, 1, 1/zlenz);
		zbasemold.parent = zmold;

		var zwatermold = BABYLON.MeshBuilder.CreatePlane(zmoldname + '-water', {updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		zwatermold.scaling.x = zlenx;
		zwatermold.scaling.y = zlenz;
		zwatermold.rotation.x = WTW.getRadians(90);
		zwatermold.parent = zbasemold;
		zwatermold.isPickable = true;
		zwatermold.checkCollisions = false;
		zwatermold.position.y = 0;
		zwatermold.convertToUnIndexedMesh();
		zwatermold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldWaterPlane=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldWaterDisc = function(zmoldname, zmolddef, zlenx, zleny, zlenz, zsubdivisions) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx,1,zlenz);

		var zbasemold = new BABYLON.TransformNode(zmoldname + '-base');
		zbasemold.position = new BABYLON.Vector3(0,0,0);
		zbasemold.rotation = new BABYLON.Vector3(0,0,0);
		zbasemold.scaling = new BABYLON.Vector3(1/zlenx, 1, 1/zlenz);
		zbasemold.parent = zmold;

		var zwatermold = BABYLON.MeshBuilder.CreateDisc(zmoldname + '-water', {tessellation: zsubdivisions, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		zwatermold.scaling.x = zlenx;
		zwatermold.scaling.y = zlenz;
		zwatermold.rotation.x = WTW.getRadians(90);
		zwatermold.parent = zbasemold;
		zwatermold.isPickable = true;
		zwatermold.checkCollisions = false;
		zwatermold.position.y = 0;
		zwatermold.convertToUnIndexedMesh();
		zwatermold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldWaterDisc=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldParticleSphere = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);

		var zparticlesystem = new BABYLON.ParticleSystem(zmoldname + '-particles', 2000, scene);
		zparticlesystem.renderingGroupId = 1;
		zparticlesystem.parent = zmold;
		zparticlesystem.particleTexture = new BABYLON.Texture('/content/system/images/flare.png', scene);
		
		zparticlesystem.emitter = zmold; // the starting object, the emitter
		var zemittertype = new BABYLON.SphereParticleEmitter();
		zemittertype.radius = Math.sqrt(zlenx*zlenx + zleny*zleny + zlenz*zlenz);
		zemittertype.radiusRange = 0;

		zparticlesystem.particleEmitterType = zemittertype;
		
		zparticlesystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
		zparticlesystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
		zparticlesystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
	
		zparticlesystem.minSize = 0.1;
		zparticlesystem.maxSize = 0.5;
	
		zparticlesystem.minLifeTime = 0.3;
		zparticlesystem.maxLifeTime = 1.5;
	
		zparticlesystem.emitRate = 1500;
		
		zparticlesystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
		
		zparticlesystem.gravity = new BABYLON.Vector3(0, 0, 0);
		
		zparticlesystem.minAngularSpeed = 0;
		
		zparticlesystem.maxAngularSpeed = Math.PI;
		
		zparticlesystem.minEmitPower = 1;
		zparticlesystem.maxEmitPower = 1;
		zparticlesystem.updateSpeed = 0.005;
	
		zparticlesystem.addVelocityGradient(0, 3, 5);
		zparticlesystem.addVelocityGradient(1.0, -5, -10);
		zparticlesystem.disposeOnStop = true;
		
		zparticlesystem.start();
		
		zmold.WTW = {
			'particlesystem':zparticlesystem
		};
		
		
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldParticleSphere=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldParticleShower = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		
		var zparticlesystem = new BABYLON.ParticleSystem(zmoldname + '-particles', 2000, scene);
		zparticlesystem.renderingGroupId = 1;
		zparticlesystem.parent = zmold;
		zparticlesystem.particleTexture = new BABYLON.Texture('/content/system/images/flare.png', scene);
		
		zparticlesystem.emitter = zmold; // the starting object, the emitter

		var zemittertype = zparticlesystem.createDirectedSphereEmitter(1.2, new BABYLON.Vector3(0, zleny, 0), new BABYLON.Vector3(zlenx * 1.5, zleny * 1.5, zlenz * 1.5));
		zparticlesystem.particleEmitterType = zemittertype;
		
		zparticlesystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
		zparticlesystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
		zparticlesystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
	
		zparticlesystem.minSize = 0.1;
		zparticlesystem.maxSize = 0.5;
	
		zparticlesystem.minLifeTime = 0.3;
		zparticlesystem.maxLifeTime = 1.5;
	
		zparticlesystem.emitRate = 1500;
		
		zparticlesystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
		
		zparticlesystem.gravity = new BABYLON.Vector3(0, 0, 0);
		
		zparticlesystem.minAngularSpeed = 0;
		
		zparticlesystem.maxAngularSpeed = Math.PI;
		
		zparticlesystem.minEmitPower = 1;
		zparticlesystem.maxEmitPower = 1;
		zparticlesystem.updateSpeed = 0.005;
	
		zparticlesystem.addVelocityGradient(0, 3, 5);
		zparticlesystem.addVelocityGradient(1.0, -5, -10);
	
		zparticlesystem.disposeOnStop = true;
		zparticlesystem.start();

		zmold.WTW = {
			'particlesystem':zparticlesystem
		};
		
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldParticleShower=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldSmoke = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);

		var zsmokepillar = BABYLON.ParticleHelper.CreateDefault(new BABYLON.Vector3.Zero, 2000);
		var zemittertype = zsmokepillar.createConeEmitter(0.6, 1);
		zsmokepillar.emitRate = 20;
		zsmokepillar.emitter = zmold;
		zsmokepillar.id = zmoldname + '-smokepillar';
		zsmokepillar.name = zmoldname + '-smokepillar';
		
		/* Size */
		zsmokepillar.addSizeGradient(0.0, 1.0, 2.0);
		zsmokepillar.addSizeGradient(1.0, 5.0, 8.0);

		/* Lifetime */
		zsmokepillar.minLifeTime = 5;
		zsmokepillar.maxLifeTime = 8;

		/* Rotation */
		zsmokepillar.minInitialRotation = -Math.PI / 2;
		zsmokepillar.maxInitialRotation = Math.PI / 2;

		/* Rotation over lifetime */
		zsmokepillar.addAngularSpeedGradient(0, 0);
		zsmokepillar.addAngularSpeedGradient(1.0,-0.4, 0.4);

		/* Color over lifetime */
		zsmokepillar.addColorGradient(0.0, new BABYLON.Color4(190/255, 180/255, 180/255, 0.0));
		zsmokepillar.addColorGradient(0.2, new BABYLON.Color4(190/255, 180/255, 180/255, 128/255));
		zsmokepillar.addColorGradient(0.6, new BABYLON.Color4(110/255, 100/255, 100/255, 60/255));
		zsmokepillar.addColorGradient(1.0, new BABYLON.Color4(110/255, 100/255, 100/255, 0.0));

		/* Texture */
		zsmokepillar.isAnimationSheetEnabled = true;
		zsmokepillar.particleTexture = new BABYLON.Texture('/content/system/images/cloudsprite.png', scene);
		zsmokepillar.blendMode = BABYLON.ParticleSystem.BLENDMODE_MULTIPLY;
		zsmokepillar.spriteCellWidth = 256;
		zsmokepillar.spriteCellHeight = 256;
		zsmokepillar.startSpriteCellID = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
		zsmokepillar.endSpriteCellID = zsmokepillar.startSpriteCellID;
		zsmokepillar.spriteCellChangeSpeed = 1;

		/* Prewarm */
		zsmokepillar.preWarmCycles = 500;

		/* Start */
		zsmokepillar.start(30);
		
		zsmokepillar.renderingGroupId = 1;
		zsmokepillar.parent = zmold;

	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldSmoke=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldFountain = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny ,zlenz);

		// Create a particle system
		var zwater = new BABYLON.ParticleSystem('particles', 20000, scene);
	  
		//Texture of each particle
		zwater.particleTexture = new BABYLON.Texture('/content/system/images/flare.png', scene);
	  
		// Where the particles come from
		zwater.emitter = zmold; // the starting object, the emitter
		zwater.id = zmoldname + '-water';
		zwater.name = zmoldname + '-water';
		zwater.minEmitBox = new BABYLON.Vector3(.1, 0, 0); // Starting all from
		zwater.maxEmitBox = new BABYLON.Vector3(-.1, 0, 0); // To...
	  
		// Colors of all particles
		zwater.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
		zwater.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
		zwater.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
	  
		// Size of each particle (random between...
		zwater.minSize = .1
		zwater.maxSize = 0.5; //.1
	  
		// Life time of each particle (random between...
		zwater.minLifeTime = 8;
		zwater.maxLifeTime = 12.5;
	  
		// Emission rate
		// zwater.emitRate = 100;
		//zwater.manualEmitCount = 1500;
	  
		// Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
		zwater.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
	  
		// Set the gravity of all particles
		zwater.gravity = new BABYLON.Vector3(0, -3, 0);
	  
		// Direction of each particle after it has been emitted
		zwater.direction1 = new BABYLON.Vector3(-1, 4, 1);
		zwater.direction2 = new BABYLON.Vector3(1, 4, -1);
	  
		// Angular speed, in radians
		zwater.minAngularSpeed = Math.PI /4;
		zwater.maxAngularSpeed = Math.PI;
	  
		// Speed
		zwater.minEmitPower = .5;
		zwater.maxEmitPower = .75;
	  
		zwater.updateSpeed = 0.05;
		zwater.emitRate = 200;

		zwater.renderingGroupId = 1;
		zwater.parent = zmold;
	  
		// Start the particle system
		zwater.start();
		zwater.disposeOnStop = true;
		zmold.WTW = {
			'particlesystem':zwater
		};
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldFountain=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldBabylonFile = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);

		var zmoldrot = null;
		var zuploadobjectid = '';
		var zobjectfolder = '';
		var zobjectfile = '';
		var zobjectanimations = null;
		var zparentname = '';
		var zrotationy = 0;
		var zbillboard = '0';
		var zdiffusecolor = '#ffffff';
		var zemissivecolor = '#000000';
		var zspecularcolor = '#000000';
		var zambientcolor = '#ffffff';
		var zreceiveshadows = false;
		var zwaterreflection = false;
		var zcheckcollisions = true;
		var zispickable = true;
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
		
		/* read objectid, folder path, and file values */
		if (zmolddef.objects.uploadobjectid != undefined) {
			if (zmolddef.objects.uploadobjectid != '') {
				zuploadobjectid = zmolddef.objects.uploadobjectid;
			}
		}
		if (zmolddef.objects.folder != undefined) {
			if (zmolddef.objects.folder != '') {
				zobjectfolder = zmolddef.objects.folder;
			}
		}
		if (zmolddef.objects.file != undefined) {
			if (zmolddef.objects.file != '') {
				zobjectfile = zmolddef.objects.file;
			}
		}
		if (zmolddef.parentname != undefined) {
			if (zmolddef.parentname != '') {
				zparentname = zmolddef.parentname;
			}
		}
		if (zmolddef.checkcollisions != undefined) {
			if (zmolddef.checkcollisions != '1') {
				zcheckcollisions = false;
			}
		}
		if (zmolddef.ispickable != undefined) {
			if (zmolddef.ispickable != '1') {
				zispickable = false;
			}
		}
		/* get array of animation defs */
		if (zmolddef.objects.objectanimations != undefined) {
			if (zmolddef.objects.objectanimations != '') {
				zobjectanimations = zmolddef.objects.objectanimations;
			}
		}
		/* this rotation gets applied as offset to billboard mode */
		if (zmolddef.rotation.y != undefined) {
			if (zmolddef.rotation.y != '') {
				zrotationy = zmolddef.rotation.y;
			}
		}
		if (zmolddef.graphics.receiveshadows != undefined) {
			if (zmolddef.graphics.receiveshadows == '1') {
				zreceiveshadows = true;
			}
		}
		if (zmolddef.graphics.waterreflection != undefined) {
			if (zmolddef.graphics.waterreflection == '1') {
				zwaterreflection = true;
			}
		}

		/* when billboard enabled, it keeps the object orientated to your camera view (always facing the same direction to you) */
		if (zmolddef.rotation.billboard != undefined) {
			if (zmolddef.rotation.billboard != '') {
				zbillboard = zmolddef.rotation.billboard;
				if (zbillboard == '1') {
					zmold.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
					/* create rotation box to parent 3D Object */
					zmoldrot = new BABYLON.TransformNode(zmoldname + '-moldrot');
					zmoldrot.position = new BABYLON.Vector3(0,0,0);
					zmoldrot.rotation = new BABYLON.Vector3(0,WTW.getRadians(-zrotationy),0);
					zmoldrot.scaling = new BABYLON.Vector3(zlenx,zleny,zlenz);
					zmoldrot.parent = zmold;
				}
			}
		}
		if (zobjectfile != '') {
			if (zobjectfile.indexOf('.babylon') > -1 || zobjectfile.indexOf('.glb') > -1 || zobjectfile.indexOf('.gltf') > -1 || zobjectfile.indexOf('.obj') > -1) {
				BABYLON.SceneLoader.ImportMeshAsync('', zobjectfolder, zobjectfile, scene).then(
					function (zresults) {
						var zhasanimation = false;
						if (zresults.meshes != null) {
							/* make sure the 3D Object is positioned over parent (if transformations are all applied, there is no position adjustment) */
							var znode = WTW.getMeshOrNodeByID(zmoldname);
							for (var i=0; i < zresults.meshes.length; i++) {
								if (zresults.meshes[i] != null) {
									/* add the base mold name to each of the child meshes */
									var zmeshname = zresults.meshes[i].name;
									var zchildmoldname = zmoldname + '-' + zmeshname;
									zchildmoldname = zchildmoldname.replace(' ','_').toLowerCase();
									zresults.meshes[i].id = zchildmoldname;
									zresults.meshes[i].name = zchildmoldname;
									zresults.meshes[i].renderingGroupId = 1;
//									zresults.meshes[i].convertToUnIndexedMesh();
									zresults.meshes[i].cullingStrategy = BABYLON.AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY; //BABYLON.AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION;
									
									var zcovering = null;
									
									if (zresults.meshes[i].material != null) {
										zcovering = zresults.meshes[i].material;
									} else {
										zcovering = new BABYLON.StandardMaterial(zmoldname + 'mat', scene);
									}
									zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zdiffusecolor);
									zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zemissivecolor);
									zcovering.specularColor = new BABYLON.Color3.FromHexString(zspecularcolor);
									zcovering.ambientColor = new BABYLON.Color3.FromHexString(zambientcolor);
									zresults.meshes[i].material = zcovering;
									
									if (WTW.shadows != null) {
										/* add mesh to world shadow map */
//										WTW.shadows.getShadowMap().renderList.push(zresults.meshes[i]);
									}
									if (zresults.meshes[i].material != null) {
										zresults.meshes[i].material.unfreeze();
									}
									/* turn on or off receive shadows */
									zresults.meshes[i].receiveShadows = zreceiveshadows;
									/* add reflection on water if set */
									if (zwaterreflection && WTW.waterMat != null) {
										WTW.addReflectionRefraction(zresults.meshes[i]);
									}

									/* make sure child meshes are pickable */
									if (WTW.adminView == 1 || zispickable) {
										zresults.meshes[i].isPickable = true;
									}
									/* make sure child meshes check collisions if flag is true (we are not forcing false, just inheriting original settings) */
									if (zcheckcollisions) {
										zresults.meshes[i].checkcollisions = true;
									}
									/* make sure all object meshes have a parent */
									if (zresults.meshes[i].parent == null) {
										if (zbillboard == '1') {
											zresults.meshes[i].parent = zmoldrot;
										} else {
											zresults.meshes[i].parent = zmold;
										}
									}

									/* this if statement will be moved to a plugin hook (minigolf related test) */
									if (zresults.meshes[i].name.indexOf('ground') > -1) {
//										zresults.meshes[i].physicsImpostor = new BABYLON.PhysicsImpostor(zresults.meshes[i], BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0, friction: 1, restitution: 0.3 }, scene);
									} else if (zresults.meshes[i].name.indexOf('sides') > -1) {
//										zresults.meshes[i].physicsImpostor = new BABYLON.PhysicsImpostor(zresults.meshes[i], BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0, friction: 1, restitution: 0.9 }, scene);
									} else if (zresults.meshes[i].name.indexOf('hull') > -1) {
//										zmold.physicsImpostor = new BABYLON.PhysicsImpostor(zresults.meshes[i], BABYLON.PhysicsImpostor.MeshImpostor, {ignoreParent: false,  mass: 1, friction: 1, restitution: .5 }, scene);
									}
									/* overwrite material to wireframe if selected */
									if (zmeshname.indexOf('WireFrame') > -1) {
										zresults.meshes[i].material.wireframe = true;
									}

									/* initiate and preload any event driven animations */
									if (zobjectanimations != null) {
										zhasanimation = true;
										WTW.addMoldAnimation(zmoldname, zmeshname, zresults.meshes[i], zobjectanimations);
									}
									if (zmold == null || zmold.parent == null) {
										/* if the parent has been deleted after this async process began (avoiding orphaned objects)*/
										zresults.meshes[i].dispose();
									}
								}
							}
						}

						if (zresults.skeletons != null)	{
							/* load any skeletons (most often avatars) */
							for (var i=0; i < zresults.skeletons.length; i++) {
								if (zresults.skeletons[i] != null) {
									zhasanimation = true;
									var zbone = zresults.skeletons[i];
									var zmeshname = zresults.skeletons[i].name;
									zbone.isVisible = false;
									/* append zmoldname to all child skeleton names */
									var zchildmoldname = zmoldname + '-' + zmeshname;
									zresults.skeletons[i].name = zchildmoldname;
									/* make sure all bones have a parent set */
									if (zresults.skeletons[i].parent == null) {
										if (zbillboard == '1') {
											zresults.skeletons[i].parent = zmoldrot;
										} else {
											zresults.skeletons[i].parent = zmold;
										}
									}
									if (zmold == null || zmold.parent == null) {
										/* if the parent has been deleted after this async process began (avoiding orphaned objects) */
										zresults.skeletons[i].dispose();
									}
								}
							}
						}
						zmold = WTW.getMeshOrNodeByID(zmoldname);
						if (zmold == null || zmold.parent == null) {
							/* if the parent has been deleted after this async process began (avoiding orphaned objects) */
							WTW.disposeClean(zmoldname);
						} else {
							/* if there is no animation included, freeze world matrix */
							if (zhasanimation == false && WTW.adminView == 0 && zparentname.indexOf('actionzone') == -1) {
								for (var i=0; i < zresults.meshes.length; i++) {
									if (zresults.meshes[i] != null) {
										zresults.meshes[i].freezeWorldMatrix();
									}
								}
							}
						}
						WTW.setMoldLoaded(zmoldname, '1');
					}
				);
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldBabylonFile=' + ex.message);
	}
	return zmold;
} 

WTWJS.prototype.addMoldViewBlog = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);

		var zscalemold = new BABYLON.TransformNode(zmoldname + '-scale');
		zscalemold.position = new BABYLON.Vector3(0,0,0);
		zscalemold.rotation = new BABYLON.Vector3(0,0,0);
		zscalemold.scaling = new BABYLON.Vector3(1/zlenx, 1/zleny, 1/zlenz);
		zscalemold.WTW = zmolddef;
		zscalemold.parent = zmold;

		var zwebtext = '';
		if (zmolddef.webtext.webtext != undefined) {
			zwebtext = WTW.decode(zmolddef.webtext.webtext);
		}
		var zscrollpos = 0;
		if (WTW.isNumeric(zmolddef.position.scroll)) {
			zscrollpos = Number(zmolddef.position.scroll);
		}
		var zgroovetextureid = 't1qlqxd6pzubzzzy';
		var zbuttontextureid = 'vvpzrv2pae3bbkwv';
		var zbuttontexturehoverid = 'yxs6lcxokr6lhll3';
		var zbodyimageid = '8uhx630pg7pu57lc';
		var zarrowdownid = 'hj9oly198c17x086';
		var zarrowdownhoverid = 'q3bajsb9brye6q3c';
		var zarrowupid = 'xghzjpxk2lqv9l9k';
		var zarrowuphoverid = 'jgmqro16rbainojm';
		if (WTW.isUploadReady(zgroovetextureid) == false) {
			WTW.initLoadUpload(zgroovetextureid, zgroovetextureid, 5);
		}
		if (WTW.isUploadReady(zbuttontextureid) == false) {
			WTW.initLoadUpload(zbuttontextureid, zbuttontextureid, 5);
		}
		if (WTW.isUploadReady(zbodyimageid) == false) {
			WTW.initLoadUpload(zbodyimageid, zbodyimageid, 5);
		}
		var zbasicmold = WTW.newMold();
		zbasicmold.shape = 'box';
		zbasicmold.position.x = 0;
		zbasicmold.position.y = 0;
		zbasicmold.position.z = 0;
		zbasicmold.scaling.x = 1;
		zbasicmold.scaling.y = 15;
		zbasicmold.scaling.z = 15;
		zbasicmold.subdivisions = 12;
		zbasicmold.graphics.texture.id = zmolddef.graphics.texture.id;
		zbasicmold.graphics.texture.path = zmolddef.graphics.texture.path;
		zbasicmold.parentname = zmoldname + '-scale';
		zbasicmold.checkcollisions = '1';
		var zscrollboxwall = WTW.addMold(zmoldname + '-scrollboxwall', zbasicmold, zbasicmold.parentname, zbasicmold.covering);
		zscrollboxwall.renderingGroupId = 1;
		
		var zbasicmold2 = WTW.newMold();
		zbasicmold2.shape = 'box';
		zbasicmold2.position.x = 1/2;
		zbasicmold2.position.y = 0;
		zbasicmold2.position.z = 15/2 - .75;
		zbasicmold2.scaling.x = 1;
		zbasicmold2.scaling.y = (15 - .5);
		zbasicmold2.scaling.z = .65;
		zbasicmold2.subdivisions = 12;
		zbasicmold2.parentname = zmoldname + '-scale';
		zbasicmold2.checkcollisions = '1';
		var zscrollboxgroove = WTW.addMold(zmoldname + '-scrollboxgroove', zbasicmold2, zbasicmold2.parentname, zbasicmold2.covering);
		WTW.processCSGAction(zmoldname + '-scrollboxwall', zscrollboxwall, zscrollboxgroove, 'subtract', zbasicmold);
		zscrollboxgroove.renderingGroupId = 1;
		
		var zbasicmold3 = WTW.newMold();
		zbasicmold3.shape = 'box';
		zbasicmold3.position.x = 1/4;
		zbasicmold3.position.y = 0;
		zbasicmold3.position.z = 15/2 - .75;
		zbasicmold3.scaling.x = 1/2;
		zbasicmold3.scaling.y = (15 - .5);
		zbasicmold3.scaling.z = .65;
		zbasicmold3.subdivisions = 12;
		zbasicmold3.graphics.texture.id = zgroovetextureid;
		zbasicmold3.parentname = zmoldname + '-scale';
		zbasicmold3.checkcollisions = '1';
		var zscrollboxgroovetexture = WTW.addMold(zmoldname + '-scrollboxgroovetexture', zbasicmold3, zbasicmold3.parentname, zbasicmold3.covering);
		zscrollboxgroovetexture.renderingGroupId = 1;

		var zbasicmold4 = WTW.newMold();
		zbasicmold4.shape = 'box';
		zbasicmold4.position.x = 1/4 + .05;
		zbasicmold4.position.y = 0;
		zbasicmold4.position.z = 15/2 - .75;
		zbasicmold4.scaling.x = 1/2;
		zbasicmold4.scaling.y = (15 - .5);
		zbasicmold4.scaling.z = .6;
		zbasicmold4.subdivisions = 12;
		zbasicmold4.parentname = zmoldname + '-scale';
		zbasicmold4.checkcollisions = '1';
		var zscrollboxgroovecut = WTW.addMold(zmoldname + '-scrollboxgroovecut', zbasicmold4, zbasicmold4.parentname, zbasicmold4.covering);
		zscrollboxgroovecut.renderingGroupId = 1;
		WTW.processCSGAction(zmoldname + '-scrollboxgroovetexture', zscrollboxgroovetexture, zscrollboxgroovecut, 'subtract', zbasicmold3);
			
		var zbasicmold10 = WTW.newMold();
		zbasicmold10.shape = 'box';
		zbasicmold10.position.x = 1/2 + .02;
		zbasicmold10.position.y = 0;
		zbasicmold10.position.z = -.5;
		zbasicmold10.scaling.x = .04;
		zbasicmold10.scaling.y = 15 - 1;
		zbasicmold10.scaling.z = 15 - 2;
		zbasicmold10.subdivisions = 12;
		zbasicmold10.graphics.texture.id = zbodyimageid;
		zbasicmold10.parentname = zmoldname + '-scale';
		zbasicmold10.checkcollisions = '1';
		var zscrollboxbody = WTW.addMold(zmoldname + '-scrollboxbody', zbasicmold10, zbasicmold10.parentname, zbasicmold10.covering);
		zscrollboxbody.renderingGroupId = 1;

		var zbasicmold11 = WTW.newMold();
		zbasicmold11.shape = 'box';
		zbasicmold11.covering = 'texture';
		zbasicmold11.position.x = 1/2 + .04;
		zbasicmold11.position.y = 0;
		zbasicmold11.position.z = 0;
		zbasicmold11.scaling.x = 1;
		zbasicmold11.scaling.y = 1;
		zbasicmold11.scaling.z = 1;
		zbasicmold11.rotation.x = 90;
		zbasicmold11.subdivisions = 12;
		zbasicmold11.webtext.scrollpos = 0;
		zbasicmold11.webtext.webtext = zwebtext;
		zbasicmold11.graphics.texture.id = zbodyimageid;
		zbasicmold11.parentname = zmoldname + '-scrollboxbody';
		zbasicmold11.checkcollisions = '1';
		var zscrollboxbodytext = WTW.addMold(zmoldname + '-scrollboxbodytext', zbasicmold11, zbasicmold11.parentname, zbasicmold11.covering);
		zscrollboxbodytext.renderingGroupId = 1;
		zscrollboxbodytext.WTW = zbasicmold11;

		var ztexture = new BABYLON.DynamicTexture(zmoldname + '-scrollboxbodytexture', {width: 512,height: 512}, scene, true);
		ztexture.name = zmoldname + '-scrollboxbodytexture';
		ztexture.hasAlpha = true;
		zscrollboxbodytext.material.diffuseTexture = ztexture;
		var zparagraph = WTW.wrapHtml(zscrollboxbodytext, zwebtext, zscrollpos);
		var ztabheight = 1;
		zparagraph.renderingGroupId = 1;
		if (zparagraph.maxheight < zparagraph.height) {
			ztabheight = (15 - 2) * zparagraph.maxheight / zparagraph.height;
		}
		if ((15 - 2) * zparagraph.maxheight / zparagraph.height > (15 - 2)) {
			ztabheight = (15 - 2);
		}
		var ztabpos = ztabpos = (15 - 2) / 2 - ztabheight / 2;
		if (zparagraph.height > zparagraph.maxheight) {
			var zbasicmold9 = WTW.newMold();
			zbasicmold9.shape = 'box';
			zbasicmold9.position.x = 1/4 + .2;
			zbasicmold9.position.y = ztabpos;
			zbasicmold9.position.z = 15/2 - .75;
			zbasicmold9.scaling.x = 1/2;
			zbasicmold9.scaling.y = ztabheight;
			zbasicmold9.scaling.z = .65;
			zbasicmold9.subdivisions = 12;
			zbasicmold9.graphics.texture.id = zbuttontextureid;
			zbasicmold9.parentname = zmoldname + '-scale';
			zbasicmold9.checkcollisions = '1';
			zbasicmold9.ispickable = '1';
			var zscrollboxtab = WTW.addMold(zmoldname + '-scrollboxtab', zbasicmold9, zbasicmold9.parentname, zbasicmold9.covering);
			zscrollboxtab.renderingGroupId = 1;
			zscrollboxtab.WTW = zbasicmold9;

			var zbasicmold9b = WTW.newMold();
			zbasicmold9b.shape = 'box';
			zbasicmold9b.position.x = 0;
			zbasicmold9b.position.y = 0;
			zbasicmold9b.position.z = 0;
			zbasicmold9b.scaling.x = .8;
			zbasicmold9b.scaling.y = .99;
			zbasicmold9b.scaling.z = .8;
			zbasicmold9b.subdivisions = 12;
			zbasicmold9b.graphics.texture.id = zbuttontexturehoverid;
			zbasicmold9b.parentname = zmoldname + '-scale';
			zbasicmold9b.checkcollisions = '1';
			var zscrollboxtabhover = WTW.addMold(zmoldname + '-scrollboxtabhover', zbasicmold9b, zbasicmold9b.parentname, zbasicmold9b.covering);
			zscrollboxtabhover.renderingGroupId = 1;
			
			var zbasicmold5 = WTW.newMold();
			zbasicmold5.shape = 'box';
			zbasicmold5.covering = 'directional texture';
			zbasicmold5.position.x = 1/4 + .2;
			zbasicmold5.position.y = 15/2 - .6;
			zbasicmold5.position.z = 15/2 - .75;
			zbasicmold5.scaling.x = .5;
			zbasicmold5.scaling.y = .65;
			zbasicmold5.scaling.z = .65;
			zbasicmold5.graphics.uscale = 15;
			zbasicmold5.graphics.vscale = 17;
			zbasicmold5.subdivisions = 12;
			zbasicmold5.graphics.texture.id = zarrowupid;
			zbasicmold5.parentname = zmoldname + '-scale';
			zbasicmold5.checkcollisions = '1';
			zbasicmold5.ispickable = '1';
			var zscrollboxup = WTW.addMold(zmoldname + '-scrollboxup', zbasicmold5, zbasicmold5.parentname, zbasicmold5.covering);
			zscrollboxup.renderingGroupId = 1;
			zscrollboxup.WTW = zbasicmold5;

			var zbasicmold5b = WTW.newMold();
			zbasicmold5b.shape = 'box';
			zbasicmold5b.covering = 'directional texture';
			zbasicmold5b.position.x = 0;
			zbasicmold5b.position.y = 0;
			zbasicmold5b.position.z = 0;
			zbasicmold5b.scaling.x = .8;
			zbasicmold5b.scaling.y = .8;
			zbasicmold5b.scaling.z = .8;
			zbasicmold5b.graphics.uscale = 13;
			zbasicmold5b.graphics.vscale = 13;
			zbasicmold5b.subdivisions = 12;
			zbasicmold5b.graphics.texture.id = zarrowuphoverid;
			zbasicmold5b.parentname = zmoldname + '-scrollboxup';
			zbasicmold5b.checkcollisions = '1';
			var zscrollboxuphover = WTW.addMold(zmoldname + '-scrollboxuphover', zbasicmold5b, zbasicmold5b.parentname, zbasicmold5b.covering);
			zscrollboxuphover.renderingGroupId = 1;

			var zbasicmold7 = WTW.newMold();
			zbasicmold7.shape = 'box';
			zbasicmold7.covering = 'directional texture';
			zbasicmold7.position.x = 1/4 + .2;
			zbasicmold7.position.y = -15/2 + .6;
			zbasicmold7.position.z = 15/2 - .75;
			zbasicmold7.scaling.x = .5;
			zbasicmold7.scaling.y = .65;
			zbasicmold7.scaling.z = .65;
			zbasicmold7.rotation.z = 90;
			zbasicmold7.rotation.y = 180;
			zbasicmold7.graphics.uscale = 15;
			zbasicmold7.graphics.vscale = 17;
			zbasicmold7.subdivisions = 12;
			zbasicmold7.graphics.texture.id = zarrowdownid;
			zbasicmold7.parentname = zmoldname + '-scale';
			zbasicmold7.checkcollisions = '1';
			zbasicmold7.ispickable = '1';
			var zscrollboxdown = WTW.addMold(zmoldname + '-scrollboxdown', zbasicmold7, zbasicmold7.parentname, zbasicmold7.covering);
			zscrollboxdown.renderingGroupId = 1;
			zscrollboxdown.WTW = zbasicmold7;

			var zbasicmold7b = WTW.newMold();
			zbasicmold7b.shape = 'box';
			zbasicmold7b.covering = 'directional texture';
			zbasicmold7b.position.x = 0;
			zbasicmold7b.position.y = 0;
			zbasicmold7b.position.z = 0;
			zbasicmold7b.scaling.x = .8;
			zbasicmold7b.scaling.y = .8;
			zbasicmold7b.scaling.z = .8;
			zbasicmold7b.graphics.uscale = 13;
			zbasicmold7b.graphics.vscale = 13;
			zbasicmold7b.subdivisions = 12;
			zbasicmold7b.graphics.texture.id = zarrowdownhoverid;
			zbasicmold7b.parentname = zmoldname + '-scrollboxdown';
			zbasicmold7b.checkcollisions = '1';
			var zscrollboxdownhover = WTW.addMold(zmoldname + '-scrollboxdownhover', zbasicmold7b, zbasicmold7b.parentname, zbasicmold7b.covering);
			zscrollboxdownhover.renderingGroupId = 1;
		}
		if (zmoldname.indexOf('-') > -1) {
			var znamepart = zmoldname.split('-');
			if (znamepart.length > 3) {
				var zmolds = WTW.buildingMolds;
				var zmoldind = Number(znamepart[2]);
				if (znamepart[1] == 'communitymolds') {
					zmolds = WTW.communitiesMolds;
				}
				if (zmolds[zmoldind] != null) {
					var zscrollpos = 0;
					if (zmolds[zmoldind].webtext.fullheight != undefined) {
						zmolds[zmoldind].webtext.fullheight = zparagraph.height;
					}
				}
			}
		}
		window.setTimeout(function() {
			WTW.scrollBoxRepaint(zmoldname, 0);
		},1000);
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldViewBlog=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldBlogPosting = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zmold.WTW = zmolddef;

		var zscalemold = new BABYLON.TransformNode(zmoldname + '-scale');
		zscalemold.position = new BABYLON.Vector3(.5,0,0);
		zscalemold.rotation = new BABYLON.Vector3(0,0,0);
		zscalemold.scaling = new BABYLON.Vector3(1/zlenx, 1/zleny, 1/zlenz);
		zscalemold.WTW = zmolddef;
		zscalemold.parent = zmold;

		var zwebtext = '';
		if (zmolddef.webtext.webtext != undefined) {
			zwebtext = WTW.decode(zmolddef.webtext.webtext);
		}
		if (zwebtext == '') {
			zwebtext = "<div style='color:green;'>Click Here to Post</div>";
		}
		var zscrollpos = 0;
		if (WTW.isNumeric(zmolddef.position.scroll)) {
			zscrollpos = Number(zmolddef.position.scroll);
		}
		var zgroovetextureid = 't1qlqxd6pzubzzzy';
		var zbuttontextureid = 'vvpzrv2pae3bbkwv';
		var zbodyimageid = '8uhx630pg7pu57lc';
		var zcancelbuttontextureid = 'ksa2h7mf909cvech';
		var zgreenbuttontextureid = 'ngb72qh6hvy3ms5c';
		var zbodyimagebgid = '1acvat7nlz840lz2';
		if (WTW.isUploadReady(zgroovetextureid) == false) {
			WTW.initLoadUpload(zgroovetextureid, zgroovetextureid, 5);
		}
		if (WTW.isUploadReady(zbuttontextureid) == false) {
			WTW.initLoadUpload(zbuttontextureid, zbuttontextureid, 5);
		}
		if (WTW.isUploadReady(zbodyimageid) == false) {
			WTW.initLoadUpload(zbodyimageid, zbodyimageid, 5);
		}
		if (WTW.isUploadReady(zcancelbuttontextureid) == false) {
			WTW.initLoadUpload(zcancelbuttontextureid, zcancelbuttontextureid, 5);
		}
		if (WTW.isUploadReady(zgreenbuttontextureid) == false) {
			WTW.initLoadUpload(zgreenbuttontextureid, zgreenbuttontextureid, 5);
		}
		if (WTW.isUploadReady(zbodyimagebgid) == false) {
			WTW.initLoadUpload(zbodyimagebgid, zbodyimagebgid, 5);
		}
		var zbcanceltextureid = '3lnjnpihw0dvaqsu';
		var zbcanceltexturehoverid = 'u8nlyz4nveessjec';
		var zbposttextureid = '77htnrtwy4rdo84v';
		var zbposttexturehoverid = '4o13fso28z6zcu58';
		var zbpictextureid = 'v1jophdeu3w8iumn';
		var zbpictexturehoverid = 'gdhb5sgye391ev69';
		
		var zbasicmold = WTW.newMold();
		zbasicmold.shape = 'box';
		zbasicmold.position.x = 0;
		zbasicmold.position.y = 0;
		zbasicmold.position.z = 0;
		zbasicmold.scaling.x = 1;
		zbasicmold.scaling.y = 15;
		zbasicmold.scaling.z = 15;
		zbasicmold.subdivisions = 12;
		zbasicmold.graphics.texture.id = zmolddef.graphics.texture.id;
		zbasicmold.graphics.texture.path = zmolddef.graphics.texture.path;
		zbasicmold.parentname = zmoldname + '-scale';
		zbasicmold.checkcollisions = '1';
		var zposttextwall = WTW.addMold(zmoldname + '-posttextwall', zbasicmold, zbasicmold.parentname, zbasicmold.covering);
		zposttextwall.renderingGroupId = 1;
		
		var zbasicmold1 = WTW.newMold();
		zbasicmold1.shape = 'box';
		zbasicmold1.position.x = 1/2;
		zbasicmold1.position.y = (15 * .25)/2;
		zbasicmold1.position.z = -.5;
		zbasicmold1.scaling.x = 1;
		zbasicmold1.scaling.y = (15 * .75) - 1;
		zbasicmold1.scaling.z = 15 - 2;
		zbasicmold1.subdivisions = 12;
		zbasicmold1.parentname = zmoldname + '-scale';
		zbasicmold1.checkcollisions = '1';
		var zposttextviewgroove = WTW.addMold(zmoldname + '-posttextviewgroove', zbasicmold1, zbasicmold1.parentname, zbasicmold1.covering);
		zposttextviewgroove.renderingGroupId = 1;
		zposttextwall = WTW.processCSGAction(zmoldname + '-posttextwall', zposttextwall, zposttextviewgroove, 'subtract', zbasicmold);

		var zbasicmold2 = WTW.newMold();
		zbasicmold2.shape = 'box';
		zbasicmold2.position.x = 1/2;
		zbasicmold2.position.y = 0;
		zbasicmold2.position.z = 15/2 - .75;
		zbasicmold2.scaling.x = 1;
		zbasicmold2.scaling.y = (15 - .5);
		zbasicmold2.scaling.z = .65;
		zbasicmold2.subdivisions = 12;
		zbasicmold2.parentname = zmoldname + '-scale';
		zbasicmold2.checkcollisions = '1';
		var zposttextgroove = WTW.addMold(zmoldname + '-posttextgroove', zbasicmold2, zbasicmold2.parentname, zbasicmold2.covering);
		zposttextgroove.renderingGroupId = 1;
		zposttextwall = WTW.processCSGAction(zmoldname + '-posttextwall', zposttextwall, zposttextgroove, 'subtract', zbasicmold);
		
		var zbasicmold3 = WTW.newMold();
		zbasicmold3.shape = 'box';
		zbasicmold3.position.x = 1/4;
		zbasicmold3.position.y = 0;
		zbasicmold3.position.z = 15/2 - .75;
		zbasicmold3.scaling.x = 1/2;
		zbasicmold3.scaling.y = (15 - .5);
		zbasicmold3.scaling.z = .65;
		zbasicmold3.subdivisions = 12;
		zbasicmold3.graphics.texture.id = zgroovetextureid;
		zbasicmold3.parentname = zmoldname + '-scale';
		zbasicmold3.checkcollisions = '1';
		var zposttextgroovetexture = WTW.addMold(zmoldname + '-posttextgroovetexture', zbasicmold3, zbasicmold3.parentname, zbasicmold3.covering);
		zposttextgroovetexture.renderingGroupId = 1;

		var zbasicmold4 = WTW.newMold();
		zbasicmold4.shape = 'box';
		zbasicmold4.position.x = 1/4 + .05;
		zbasicmold4.position.y = 0;
		zbasicmold4.position.z = 15/2 - .75;
		zbasicmold4.scaling.x = 1/2;
		zbasicmold4.scaling.y = (15 - .5);
		zbasicmold4.scaling.z = .6;
		zbasicmold4.subdivisions = 12;
		zbasicmold4.parentname = zmoldname + '-scale';
		zbasicmold4.checkcollisions = '1';
		var zposttextgroovecut = WTW.addMold(zmoldname + '-posttextgroovecut', zbasicmold4, zbasicmold4.parentname, zbasicmold4.covering);
		zposttextgroovecut.renderingGroupId = 1;
		zposttextgroovetexture = WTW.processCSGAction(zmoldname + '-posttextgroovetexture', zposttextgroovetexture, zposttextgroovecut, 'subtract', zbasicmold3);
		
		var zbasicmold18 = WTW.newMold();
		zbasicmold18.shape = 'box';
		zbasicmold18.position.x = .2;
		zbasicmold18.position.y = 0;
		zbasicmold18.position.z = -.5;
		zbasicmold18.scaling.x = .04;
		zbasicmold18.scaling.y = 15 - 1;
		zbasicmold18.scaling.z = 15 - 2;
		zbasicmold18.subdivisions = 12;
		zbasicmold18.graphics.texture.id = zbodyimagebgid;
		zbasicmold18.parentname = zmoldname + '-scale';
		zbasicmold18.checkcollisions = '1';
		var zscrollboxtbodybg = WTW.addMold(zmoldname + '-scrollboxtbodybg', zbasicmold18, zbasicmold18.parentname, zbasicmold18.covering);
		zscrollboxtbodybg.renderingGroupId = 1;
				
		var zbasicmold10 = WTW.newMold();
		zbasicmold10.shape = 'box';
		zbasicmold10.position.x = 1/4;
		zbasicmold10.position.y = 0;
		zbasicmold10.position.z = -.5;
		zbasicmold10.scaling.x = .04;
		zbasicmold10.scaling.y = 15 - 1;
		zbasicmold10.scaling.z = 15 - 2;
		zbasicmold10.subdivisions = 12;
		zbasicmold10.graphics.texture.id = zbodyimageid;
		zbasicmold10.parentname = zmoldname + '-scale';
		zbasicmold10.checkcollisions = '1';
		var zscrollboxtbody = WTW.addMold(zmoldname + '-scrollboxtbody', zbasicmold10, zbasicmold10.parentname, zbasicmold10.covering);
		zscrollboxtbody.renderingGroupId = 1;
		zscrollboxtbody.WTW = zbasicmold10;
		
		var zbasicmold11 = WTW.newMold();
		zbasicmold11.shape = 'box';
		zbasicmold11.position.x = 1/2 + .04;
		zbasicmold11.position.y = 0;
		zbasicmold11.position.z = 0;
		zbasicmold11.scaling.x = 1;
		zbasicmold11.scaling.y = 1;
		zbasicmold11.scaling.z = 1;
		zbasicmold11.rotation.x = 90;
		zbasicmold11.subdivisions = 12;
		zbasicmold11.webtext.webtext = zwebtext;
		zbasicmold11.webtext.scrollpos = zscrollpos;
		zbasicmold11.graphics.texture.id = zbodyimageid;
		zbasicmold11.parentname = zmoldname + '-scrollboxtbody';
		zbasicmold11.checkcollisions = '1';
		var zscrollboxbodytext = WTW.addMold(zmoldname + '-scrollboxbodytext', zbasicmold11, zbasicmold11.parentname, zbasicmold11.covering);
		zscrollboxbodytext.renderingGroupId = 1;
		zscrollboxbodytext.WTW = zbasicmold11;
		
		var ztexture = new BABYLON.DynamicTexture(zmoldname + '-scrollboxbodytexture', {width: 512,height: 512}, scene, true);
		ztexture.name = zmoldname + '-scrollboxbodytexture';
		ztexture.hasAlpha = true;
		zscrollboxbodytext.material.diffuseTexture = ztexture;
		var zparagraph = WTW.wrapHtml(zscrollboxbodytext, zwebtext, zscrollpos);
		var ztabheight = 1;
		if (zparagraph.maxheight < zparagraph.height) {
			ztabheight = (15 - 2) * zparagraph.maxheight / zparagraph.height;
		}
		if ((15 - 2) * zparagraph.maxheight / zparagraph.height > (15 - 2)) {
			ztabheight = (15 - 2);
		}
		var ztabpos = 0;
		ztabpos = (15 - 2) / 2 - ztabheight / 2;

		var zbasicmold12 = WTW.newMold();
		zbasicmold12.shape = 'box';
		zbasicmold12.covering = 'directional texture';
		zbasicmold12.graphics.uscale = '7.2';
		zbasicmold12.graphics.vscale = '2.2';
		zbasicmold12.position.x = 1/4 + .2;
		zbasicmold12.position.y = (-15 * .3);
		zbasicmold12.position.z = 15/4;
		zbasicmold12.scaling.x = 1/2;
		zbasicmold12.scaling.y = (15 * .1);
		zbasicmold12.scaling.z = (15 * .3);
		zbasicmold12.subdivisions = 12;
		zbasicmold12.graphics.texture.id = zbposttextureid;
		zbasicmold12.parentname = zmoldname + '-scale';
		zbasicmold12.checkcollisions = '1';
		var zposttextbpost = WTW.addMold(zmoldname + '-posttextbpost', zbasicmold12, zbasicmold12.parentname, zbasicmold12.covering);
		zposttextbpost.renderingGroupId = 1;
		
		var zbasicmold13 = WTW.newMold();
		zbasicmold13.shape = 'box';
		zbasicmold13.covering = 'directional texture';
		zbasicmold13.graphics.uscale = '7.2';
		zbasicmold13.graphics.vscale = '2.2';
		zbasicmold13.position.x = 1/4 + .1;
		zbasicmold13.position.y = (-15 * .3);
		zbasicmold13.position.z = 15/4;
		zbasicmold13.scaling.x = 1/2;
		zbasicmold13.scaling.y = (15 * .1)-.05;
		zbasicmold13.scaling.z = (15 * .3)-.05;
		zbasicmold13.subdivisions = 12;
		zbasicmold13.graphics.texture.id = zbposttexturehoverid;
		zbasicmold13.parentname = zmoldname + '-scale';
		zbasicmold13.checkcollisions = '1';
		var zposttextbposthover = WTW.addMold(zmoldname + '-posttextbposthover', zbasicmold13, zbasicmold13.parentname, zbasicmold13.covering);
		zposttextbposthover.renderingGroupId = 1;
		
		var zbasicmold14 = WTW.newMold();
		zbasicmold14.shape = 'box';
		zbasicmold14.covering = 'directional texture';
		zbasicmold14.graphics.uscale = '7.2';
		zbasicmold14.graphics.vscale = '2.2';
		zbasicmold14.position.x = 1/4 + .2;
		zbasicmold14.position.y = (-15 * .3);
		zbasicmold14.position.z = -15 /3.2;
		zbasicmold14.scaling.x = 1/2;
		zbasicmold14.scaling.y = (15 * .1);
		zbasicmold14.scaling.z = (15 * .3);
		zbasicmold14.subdivisions = 12;
		zbasicmold14.graphics.texture.id = zbcanceltextureid;
		zbasicmold14.parentname = zmoldname + '-scale';
		zbasicmold14.checkcollisions = '1';
		var zposttextbcancel = WTW.addMold(zmoldname + '-posttextbcancel', zbasicmold14, zbasicmold14.parentname, zbasicmold14.covering);
		zposttextbcancel.renderingGroupId = 1;
		
		var zbasicmold15 = WTW.newMold();
		zbasicmold15.shape = 'box';
		zbasicmold15.covering = 'directional texture';
		zbasicmold15.graphics.uscale = '7.2';
		zbasicmold15.graphics.vscale = '2.2';
		zbasicmold15.position.x = 1/4 + .1;
		zbasicmold15.position.y = (-15 * .3);
		zbasicmold15.position.z = -15 /3.2;
		zbasicmold15.scaling.x = 1/2;
		zbasicmold15.scaling.y = (15 * .1)-.05;
		zbasicmold15.scaling.z = (15 * .3)-.05;
		zbasicmold15.subdivisions = 12;
		zbasicmold15.graphics.texture.id = zbcanceltexturehoverid;
		zbasicmold15.parentname = zmoldname + '-scale';
		zbasicmold15.checkcollisions = '1';
		var zposttextbcancelhover = WTW.addMold(zmoldname + '-posttextbcancelhover', zbasicmold15, zbasicmold15.parentname, zbasicmold15.covering);
		zposttextbcancelhover.renderingGroupId = 1;
		
		var zbasicmold16 = WTW.newMold();
		zbasicmold16.shape = 'box';
		zbasicmold16.covering = 'directional texture';
		zbasicmold16.graphics.uscale = '6.7';
		zbasicmold16.graphics.vscale = '6.7';
		zbasicmold16.position.x = 1/4 + .2;
		zbasicmold16.position.y = (-15 * .42);
		zbasicmold16.position.z = -15 /2.45;
		zbasicmold16.scaling.x = 1/2;
		zbasicmold16.scaling.y = (15 * .1);
		zbasicmold16.scaling.z = (15 * .1);
		zbasicmold16.subdivisions = 12;
		zbasicmold16.graphics.texture.id = zbpictextureid;
		zbasicmold16.parentname = zmoldname + '-scale';
		zbasicmold16.checkcollisions = '1';
		var zposttextbpic = WTW.addMold(zmoldname + '-posttextbpic', zbasicmold16, zbasicmold16.parentname, zbasicmold16.covering);
		zposttextbpic.renderingGroupId = 1;
		
		var zbasicmold17 = WTW.newMold();
		zbasicmold17.shape = 'box';
		zbasicmold17.covering = 'directional texture';
		zbasicmold17.graphics.uscale = '6.7';
		zbasicmold17.graphics.vscale = '6.7';
		zbasicmold17.position.x = 1/4 + .1;
		zbasicmold17.position.y = (-15 * .42);
		zbasicmold17.position.z = -15 /2.45;
		zbasicmold17.scaling.x = 1/2;
		zbasicmold17.scaling.y = (15 * .1)-.05;
		zbasicmold17.scaling.z = (15 * .1)-.05;
		zbasicmold17.subdivisions = 12;
		zbasicmold17.graphics.texture.id = zbpictexturehoverid;
		zbasicmold17.parentname = zmoldname + '-scale';
		zbasicmold17.checkcollisions = '1';
		var zposttextbpichover = WTW.addMold(zmoldname + '-posttextbpichover', zbasicmold17, zbasicmold17.parentname, zbasicmold17.covering);
		zposttextbpichover.renderingGroupId = 1;
		
		if (zparagraph.height > zparagraph.maxheight) {
			var zbasicmold9 = WTW.newMold();
			zbasicmold9.shape = 'box';
			zbasicmold9.position.x = 1/4 + .2;
			zbasicmold9.position.y = ztabpos;
			zbasicmold9.position.z = 15/2 - .75;
			zbasicmold9.scaling.x = 1/2;
			zbasicmold9.scaling.y = ztabheight;
			zbasicmold9.scaling.z = .65;
			zbasicmold9.subdivisions = 12;
			zbasicmold9.graphics.texture.id = zbuttontextureid;
			zbasicmold9.parentname = zmoldname + '-scale';
			zbasicmold9.checkcollisions = '1';
			var zscrollboxtab = WTW.addMold(zmoldname + '-scrollboxtab', zbasicmold9, zbasicmold9.parentname, zbasicmold9.covering);
			zscrollboxtab.renderingGroupId = 1;

			var zbasicmold5 = WTW.newMold();
			zbasicmold5.shape = 'box';
			zbasicmold5.position.x = 1/4 + .2;
			zbasicmold5.position.y = 15/2 - .6;
			zbasicmold5.position.z = 15/2 - .75;
			zbasicmold5.scaling.x = 1/2;
			zbasicmold5.scaling.y = .65;
			zbasicmold5.scaling.z = .65;
			zbasicmold5.subdivisions = 12;
			zbasicmold5.graphics.texture.id = zbuttontextureid;
			zbasicmold5.parentname = zmoldname + '-scale';
			zbasicmold5.checkcollisions = '1';
			var zscrollboxup = WTW.addMold(zmoldname + '-scrollboxup', zbasicmold5, zbasicmold5.parentname, zbasicmold5.covering);
			zscrollboxup.renderingGroupId = 1;
			
			var zbasicmold6 = WTW.newMold();
			zbasicmold6.shape = 'triangle';
			zbasicmold6.position.x = 1/4 + .4;
			zbasicmold6.position.y = 15/2 - .6;
			zbasicmold6.position.z = 15/2 - .75;
			zbasicmold6.scaling.x = 1/2;
			zbasicmold6.scaling.y = .5;
			zbasicmold6.scaling.z = .5;
			zbasicmold6.rotation.x = -90;
			zbasicmold6.rotation.y = 0;
			zbasicmold6.rotation.z = 90;
			zbasicmold6.subdivisions = 12;
			zbasicmold6.graphics.texture.id = zgroovetextureid;
			zbasicmold6.parentname = zmoldname + '-scale';
			zbasicmold6.checkcollisions = '1';
			var zscrollboxuparrow = WTW.addMold(zmoldname + '-scrollboxuparrow', zbasicmold6, zbasicmold6.parentname, zbasicmold6.covering);
			zscrollboxuparrow.renderingGroupId = 1;
			
			var zbasicmold7 = WTW.newMold();
			zbasicmold7.shape = 'box';
			zbasicmold7.position.x = 1/4 + .2;
			zbasicmold7.position.y = -15/2 + .6;
			zbasicmold7.position.z = 15/2 - .75;
			zbasicmold7.scaling.x = 1/2;
			zbasicmold7.scaling.y = .65;
			zbasicmold7.scaling.z = .65;
			zbasicmold7.subdivisions = 12;
			zbasicmold7.graphics.texture.id = zbuttontextureid;
			zbasicmold7.parentname = zmoldname + '-scale';
			zbasicmold7.checkcollisions = '1';
			var zscrollboxdown = WTW.addMold(zmoldname + '-scrollboxdown', zbasicmold7, zbasicmold7.parentname, zbasicmold7.covering);
			zscrollboxdown.renderingGroupId = 1;
			
			var zbasicmold8 = WTW.newMold();
			zbasicmold8.shape = 'triangle';
			zbasicmold8.position.x = 1/4 + .4;
			zbasicmold8.position.y = -15/2 + .6;
			zbasicmold8.position.z = 15/2 - .75;
			zbasicmold8.scaling.x = 1/2;
			zbasicmold8.scaling.y = .5;
			zbasicmold8.scaling.z = .5;
			zbasicmold8.rotation.x = 90;
			zbasicmold8.rotation.y = 0;
			zbasicmold8.rotation.z = 90;
			zbasicmold8.subdivisions = 12;
			zbasicmold8.graphics.texture.id = zgroovetextureid;
			zbasicmold8.parentname = zmoldname + '-scale';
			zbasicmold8.checkcollisions = '1';
			var zscrollboxdownarrow = WTW.addMold(zmoldname + '-scrollboxdownarrow', zbasicmold8, zbasicmold8.parentname, zbasicmold8.covering);
			zscrollboxdownarrow.renderingGroupId = 1;
		}
		if (zmoldname.indexOf('-') > -1) {
			var znamepart = zmoldname.split('-');
			if (znamepart.length > 3) {
				var zmolds = WTW.buildingMolds;
				var i = Number(znamepart[2]);
				if (znamepart[1] == 'communitymolds') {
					zmolds = WTW.communitiesMolds;
				}
				if (zmolds[i] != null) {
					var zscrollpos = 0;
					if (zmolds[i].webtext.fullheight != undefined) {
						zmolds[i].webtext.fullheight = zparagraph.height;
					}
				}
			}
		}
		window.setTimeout(function() {
			WTW.scrollBoxRepaint(zmoldname, 0);
		},1000);
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldBlogPosting=' + ex.message);
	}
	return zmold;
} 

WTWJS.prototype.addMoldLightbulb = function(zmoldname, zmolddef, zlenx, zleny, zlenz, zposx, zposy, zposz, zsubdivisions) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		
		var zmoldbulb = WTW.newMold();
		zmoldbulb.shape = 'sphere';
		zmoldbulb.covering = 'color';
		zmoldbulb.color = zmolddef.color;
		zmoldbulb.scaling = zmolddef.scaling;
		zmoldbulb.subdivisions = zmolddef.subdivisions;
		zmoldbulb.parentname = zmoldname;
		zmoldbulb.checkcollisions = '1';
		var zbulbcenter = BABYLON.MeshBuilder.CreateSphere(zmoldname + '-bulbcenter', {segments: zsubdivisions, diameter:1, updatable: false, sideOrientation: BABYLON.Mesh.FRONTSIDE}, scene);
		zbulbcenter.scaling = new BABYLON.Vector3(zlenx * .3, zleny * .8, zlenz * .3);
		zbulbcenter.material = WTW.addCovering('color', zmoldname + '-bulbmat', zmoldbulb, zlenx * .3, zleny * .8, zlenz * .3, '0', '0');
		zbulbcenter.isPickable = true;
		zbulbcenter.renderingGroupId = 1;
		zbulbcenter.parent = zmold;
		zbulbcenter.convertToUnIndexedMesh();
		
		var zmoldglass = BABYLON.MeshBuilder.CreateSphere(zmoldname, {segments: zsubdivisions, diameter:1, updatable: false, sideOrientation: BABYLON.Mesh.FRONTSIDE}, scene);
		zmoldglass.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zmoldglass.renderingGroupId = 1;
		zmoldglass.parent = zmold;
		zmoldglass.convertToUnIndexedMesh();
		var zglassmat = new BABYLON.StandardMaterial(zmoldname + '-glassmat', scene);
		zglassmat.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zglassmat.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zglassmat.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zglassmat.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);
		zglassmat.alpha = .4;
		zglassmat.backFaceCulling = false;
		zmoldglass.material = zglassmat;
		
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		if (zmoldnameparts.molds[zmoldnameparts.moldind] != null) {
			if (zmoldnameparts.molds[zmoldnameparts.moldind].objects.light != '') {
				zmoldnameparts.molds[zmoldnameparts.moldind].objects.light.dispose();
				zmoldnameparts.molds[zmoldnameparts.moldind].objects.light = '';
				zmoldnameparts.molds[zmoldnameparts.moldind].objects.shadows.dispose();
				zmoldnameparts.molds[zmoldnameparts.moldind].objects.shadows = '';
			}
			zmoldnameparts.molds[zmoldnameparts.moldind].objects.light = new BABYLON.DirectionalLight(zmoldname + '-light', new BABYLON.Vector3(0, -1, 1), scene);
			zmoldnameparts.molds[zmoldnameparts.moldind].objects.light.intensity = 0.8;
			zmoldnameparts.molds[zmoldnameparts.moldind].objects.light.shadowMinZ = 0;
			zmoldnameparts.molds[zmoldnameparts.moldind].objects.light.shadowMaxZ = 100;
			
			zmoldnameparts.molds[zmoldnameparts.moldind].objects.light.diffuse = new BABYLON.Color3.FromHexString(zmoldnameparts.molds[zmoldnameparts.moldind].color.diffusecolor);
			zmoldnameparts.molds[zmoldnameparts.moldind].objects.light.emissive = new BABYLON.Color3.FromHexString(zmoldnameparts.molds[zmoldnameparts.moldind].color.emissivecolor);
			zmoldnameparts.molds[zmoldnameparts.moldind].objects.light.specular = new BABYLON.Color3.FromHexString(zmoldnameparts.molds[zmoldnameparts.moldind].color.specularcolor);
			zmoldnameparts.molds[zmoldnameparts.moldind].objects.light.ambient = new BABYLON.Color3.FromHexString(zmoldnameparts.molds[zmoldnameparts.moldind].color.ambientcolor);
			zmoldnameparts.molds[zmoldnameparts.moldind].objects.light.parent = zmold;
			
			zmoldnameparts.molds[zmoldnameparts.moldind].objects.shadows = new BABYLON.ShadowGenerator(1024, zmoldnameparts.molds[zmoldnameparts.moldind].objects.light);
			zmoldnameparts.molds[zmoldnameparts.moldind].objects.shadows.setDarkness(0.1);
			zmoldnameparts.molds[zmoldnameparts.moldind].objects.shadows.usePoissonSampling = true;
		}
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldLightbulb=' + ex.message);
	}
	return zmold;
}

//Tree generator code

var coordSystem=function(b){var g=b.normalize();b=0==Math.abs(b.x)&&0==Math.abs(b.y)?(new BABYLON.Vector3(b.z,0,0)).normalize():(new BABYLON.Vector3(b.y,-b.x,0)).normalize();var r=BABYLON.Vector3.Cross(b,g);return{x:b,y:g,z:r}},randPct=function(b,g){return 0==g?b:(1+(1-2*Math.random())*g)*b},createBranch=function(b,g,r,w,h,l,v,n,x){for(var t=[],d,c=[],f,q=[],a=0;12>a;a++)t[a]=[];for(var m=0;m<h;m++)for(a=m/h,d=g.y.scale(a*r),d.addInPlace(g.x.scale(v*Math.exp(-a)*Math.sin(l*a*Math.PI))),d.addInPlace(b),c[m]=d,d=n*(1+(.4*Math.random()-.2))*(1-(1-w)*a),q.push(d),a=0;12>a;a++)f=a*Math.PI/6,f=g.x.scale(d*Math.cos(f)).add(g.z.scale(d*Math.sin(f))),f.addInPlace(c[m]),t[a].push(f);for(a=0;12>a;a++)t[a].push(c[c.length-1]);return{branch:BABYLON.MeshBuilder.CreateRibbon('branch',{pathArray:t,closeArray:!0},x),core:c,_radii:q}},createTreeBase=function(b,g,r,w,h,l,v,n,x,t){var d=2/(1+Math.sqrt(5)),c=new BABYLON.Vector3(0,1,0),f,c=coordSystem(c),q=new BABYLON.Vector3(0,0,0),a=[],m=[],e=[],A=[],q=createBranch(q,c,b,g,r,1,x,1,t);a.push(q.branch);var y=q.core;m.push(y);e.push(q._radii);A.push(c);for(var q=y[y.length-1],y=2*Math.PI/h,z,u,p,C,B=0;B<h;B++)if(f=randPct(B*y,.25),f=c.y.scale(Math.cos(randPct(l,.15))).add(c.x.scale(Math.sin(randPct(l,.15))*Math.sin(f))).add(c.z.scale(Math.sin(randPct(l,.15))*Math.cos(f))),z=coordSystem(f),f=createBranch(q,z,b*v,g,r,n,x*d,g,t),p=f.core,p=p[p.length-1],a.push(f.branch),m.push(f.core),e.push(f._radii),A.push(z),1<w)for(var D=0;D<h;D++)u=randPct(D*y,.25),u=z.y.scale(Math.cos(randPct(l,.15))).add(z.x.scale(Math.sin(randPct(l,.15))*Math.sin(u))).add(z.z.scale(Math.sin(randPct(l,.15))*Math.cos(u))),u=coordSystem(u),C=createBranch(p,u,b*v*v,g,r,n,x*d*d,g*g,t),a.push(C.branch),m.push(C.core),e.push(f._radii),A.push(u);return{tree:BABYLON.Mesh.MergeMeshes(a),paths:m,radii:e,directions:A}},createTree=function(b,g,r,w,h,l,v,n,x,t,d,c,f,q,a,m){1!=h&&2!=h&&(h=1);var e=createTreeBase(b,g,r,h,l,v,n,d,c,m);e.tree.material=w;var A=b*Math.pow(n,h),y=A/(2*f),z=1.5*Math.pow(g,h-1);n=BABYLON.MeshBuilder.CreateDisc('leaf',{radius:z/2,tessellation:12,sideOrientation:BABYLON.Mesh.DOUBLESIDE},m);b=new BABYLON.SolidParticleSystem('leaveSPS',m,{updatable:!1});b.addShape(n,2*f*Math.pow(l,h),{positionFunction:function(b,a,g){a=Math.floor(g/(2*f));1==h?a++:a=2+a%l+Math.floor(a/l)*(l+1);var E=(g%(2*f)*y+3*y/2)/A,d=Math.ceil(r*E);d>e.paths[a].length-1&&(d=e.paths[a].length-1);var k=d-1,c=k/(r-1),m=d/(r-1);b.position=new BABYLON.Vector3(e.paths[a][k].x+(e.paths[a][d].x-e.paths[a][k].x)*(E-c)/(m-c),e.paths[a][k].y+(e.paths[a][d].y-e.paths[a][k].y)*(E-c)/(m-c)+(.6*z/q+e.radii[a][d])*(g%2*2-1),e.paths[a][k].z+(e.paths[a][d].z-e.paths[a][k].z)*(E-c)/(m-c));b.rotation.z=Math.random()*Math.PI/4;b.rotation.y=Math.random()*Math.PI/2;b.rotation.z=Math.random()*Math.PI/4;b.scale.y=1/q}});b=b.buildMesh();b.billboard=!0;n.dispose();d=new BABYLON.SolidParticleSystem('miniSPS',m,{updatable:!1});n=new BABYLON.SolidParticleSystem('minileavesSPS',m,{updatable:!1});var u=[];c=2*Math.PI/l;for(var p=0;p<Math.pow(l,h+1);p++)u.push(randPct(Math.floor(p/Math.pow(l,h))*c,.2));c=function(a,b,d){var c=d%Math.pow(l,h);1==h?c++:c=2+c%l+Math.floor(c/l)*(l+1);var f=e.directions[c],c=new BABYLON.Vector3(e.paths[c][e.paths[c].length-1].x,e.paths[c][e.paths[c].length-1].y,e.paths[c][e.paths[c].length-1].z),k=u[d],k=f.y.scale(Math.cos(randPct(v,0))).add(f.x.scale(Math.sin(randPct(v,0))*Math.sin(k))).add(f.z.scale(Math.sin(randPct(v,0))*Math.cos(k))),f=BABYLON.Vector3.Cross(BABYLON.Axis.Y,k),k=Math.acos(BABYLON.Vector3.Dot(k,BABYLON.Axis.Y)/k.length());a.scale=new BABYLON.Vector3(Math.pow(g,h+1),Math.pow(g,h+1),Math.pow(g,h+1));a.quaternion=BABYLON.Quaternion.RotationAxis(f,k);a.position=c;};for(var C=[],B=[],p=e.paths.length,D=e.paths[0].length,F=0;F<x;F++)C.push(2*Math.PI*Math.random()-Math.PI),B.push([Math.floor(Math.random()*p),Math.floor(Math.random()*(D-1)+1)]);p=function(a,c,b){var d=B[b][0],f=B[b][1],k=e.directions[d];c=new BABYLON.Vector3(e.paths[d][f].x,e.paths[d][f].y,e.paths[d][f].z);c.addInPlace(k.z.scale(e.radii[d][f]/2));b=C[b];k=k.y.scale(Math.cos(randPct(t,0))).add(k.x.scale(Math.sin(randPct(t,0))*Math.sin(b))).add(k.z.scale(Math.sin(randPct(t,0))*Math.cos(b)));b=BABYLON.Vector3.Cross(BABYLON.Axis.Y,k);k=Math.acos(BABYLON.Vector3.Dot(k,BABYLON.Axis.Y)/k.length());a.scale=new BABYLON.Vector3(Math.pow(g,h+1),Math.pow(g,h+1),Math.pow(g,h+1));a.quaternion=BABYLON.Quaternion.RotationAxis(b,k);a.position=c};d.addShape(e.tree,Math.pow(l,h+1),{positionFunction:c});d.addShape(e.tree,x,{positionFunction:p});d=d.buildMesh();d.material=w;n.addShape(b,Math.pow(l,h+1),{positionFunction:c});n.addShape(b,x,{positionFunction:p});w=n.buildMesh();b.dispose();w.material=a;a=BABYLON.MeshBuilder.CreateBox('',{},m);a.isVisible=!1;e.tree.parent=a;d.parent=a;return w.parent=a};

WTWJS.prototype.addMoldTree = function(zmoldname, zmolddef, zlenx, zleny, zlenz, zposx, zposy, zposz, zsubdivisions) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);

		var ztreebase = new BABYLON.TransformNode(zmoldname + '-treebase');
		ztreebase.position = new BABYLON.Vector3(0,3,0);
		ztreebase.rotation = new BABYLON.Vector3(0,0,0);
		ztreebase.scaling = new BABYLON.Vector3(zlenx + .2,6,zlenz + .2);
		ztreebase.parent = zmold;
		
		/* leaf material */
		var zgreen = new BABYLON.StandardMaterial('green', scene);
		zgreen.diffuseColor = new BABYLON.Color3(.1,.6,0);	
		
		/* trunk and branch material */
		var zbark = new BABYLON.StandardMaterial('bark', scene);
		zbark.emissiveTexture = new BABYLON.Texture('/content/system/images/barktexture.jpg', scene);
		zbark.diffuseTexture = new BABYLON.Texture('/content/system/images/barktexture.jpg', scene);
		zbark.diffuseTexture.uScale = 2.0;//Repeat 5 times on the Vertical Axes
		zbark.diffuseTexture.vScale = 2.0;//Repeat 5 times on the Horizontal Axes		
					
		/* Tree parameters */
		var ztrunk_height = 20;
		var ztrunk_taper = 0.6;
		var ztrunk_slices = 5;
		var zboughs = 2; /* 1 or 2 */
		var zforks = 4;
		var zfork_angle = Math.PI/4;
		var zfork_ratio = 2/(1+Math.sqrt(5));
		var zbranch_angle = Math.PI/3;
		var zbow_freq = 2;
		var zbow_height = 3.5;
		var zbranches = 10;
		var zleaves_on_branch = 5;
		var zleaf_wh_ratio = 0.5;
					
		var ztree = createTree(ztrunk_height, ztrunk_taper, ztrunk_slices, zbark, zboughs, zforks, zfork_angle, zfork_ratio, zbranches, zbranch_angle, zbow_freq, zbow_height, zleaves_on_branch, zleaf_wh_ratio, zgreen, scene);		
		ztree.name = zmoldname + '-tree';
		ztree.renderingGroupId = 1;
		ztree.parent = zmold;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldTree=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldFlag = async function(zmoldname, zmolddef, zlenx, zleny, zlenz, zposx, zposy, zposz, zsubdivisions) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);

		var zlenx = 10;
		
		var zdistancebetweenpoints = zlenx / zsubdivisions;	
		
		var zcovering = new BABYLON.StandardMaterial(zmoldname + '-mat', scene);
		zcovering.diffuseTexture = WTW.addCoveringTexture(zmoldname, zmolddef, zlenx, zleny, zlenz, '0', '0');
		/* zcovering.zOffset = -20; */
		zcovering.backFaceCulling = false;
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
		async function loadcoveringtexture(zmoldname, zcovering, zimageid, zuscale, zvscale, zuoffset, zvoffset, zmold) {
			var zimageinfo = WTW.getUploadFileData(zimageid);
			var zimageextension = zimageinfo.extension;
			zcovering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.filedata, 'mattexture' + zmoldname + '-raised', scene);
			zcovering.diffuseTexture.uScale = zuscale;
			zcovering.diffuseTexture.vScale = zvscale;
			zcovering.diffuseTexture.uOffset = zuoffset;
			zcovering.diffuseTexture.vOffset = zvoffset;
			zcovering.specularColor = new BABYLON.Color3(.4, .4, .4);
			zcovering.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);	
			/* Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene */
			var zflagcloth = BABYLON.Mesh.CreateGround(zmoldname + '-flagcloth', zlenx, zleny, zsubdivisions - 1, scene, true);
				
			zflagcloth.renderingGroupId = 1;
			zflagcloth.material = zcovering;
			zflagcloth.parent = zmold;
			/* zflagcloth.rotate.z = 45 * Math.PI / 180; */

			var zpositions = zflagcloth.getVerticesData(BABYLON.VertexBuffer.PositionKind);
			var zspheres = [];
			for (var i = 0; i < zpositions.length; i = i + 3) {
				var zvector = BABYLON.Vector3.FromArray(zpositions, i);
				
				var zsphere = BABYLON.MeshBuilder.CreateSphere(zmoldname + '-sphere' + i, { diameter: 0.1 }, scene);
				zsphere.position.copyFrom(zvector);
				zspheres.push(zsphere);
			}
			
			/* create the impostors */
/*			zspheres.forEach(function (point, idx) {
				var zmass = idx < zsubdivisions ? 0 : 1;
				point.physicsImpostor = new BABYLON.PhysicsImpostor(point, BABYLON.PhysicsImpostor.ParticleImpostor, { mass: zmass }, scene);
				if (idx >= zsubdivisions) {
					WTW.createJoint(point.physicsImpostor, zspheres[idx - zsubdivisions].physicsImpostor, zdistancebetweenpoints);
					if (idx % zsubdivisions) {
						WTW.createJoint(point.physicsImpostor, zspheres[idx - 1].physicsImpostor, zdistancebetweenpoints);
					}
				}
			});
*/			
			zflagcloth.registerBeforeRender(function () {
				var zpositions = [];
				zspheres.forEach(function (zsphere) {
					zpositions.push(zsphere.position.x, zsphere.position.y, zsphere.position.z);

				});
				zflagcloth.updateVerticesData(BABYLON.VertexBuffer.PositionKind, zpositions);
				zflagcloth.refreshBoundingInfo();
			});		
		}
		if (WTW.isUploadReady(zimageid)) {
			loadcoveringtexture(zmoldname, zcovering, zimageid, zuscale, zvscale, zuoffset, zvoffset, zmold);
		} else {
			WTW.getAsyncJSON('/connect/upload.php?uploadid=' + zimageid, 
				function(zresponse) {
					WTW.loadUpload(JSON.parse(zresponse), zimageid, 0);
					loadcoveringtexture(zmoldname, zcovering, zimageid, zuscale, zvscale, zuoffset, zvoffset, zmold);
				}
			);
		}		
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldFlag=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addMoldRoundedBox = function(zmoldname, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = new BABYLON.Mesh(zmoldname, scene);
		var zpositions = [0.4,-0.4,0.5,-0.4,0.4,0.5,0.4,0.4,0.5,0.4,-0.5,-0.4,-0.4,-0.5,0.4,0.4,-0.5,0.4,-0.5,-0.4,-0.4,-0.5,0.4,0.4,-0.5,-0.4,0.4,-0.4,0.5,0.4,0.4,0.5,-0.4,0.4,0.5,0.4,0.4,0.4,-0.5,-0.4,-0.4,-0.5,0.4,-0.4,-0.5,0.4924,-0.4383,0.4,0.4924,-0.4,0.4383,0.5,-0.4,0.4,0.4707,-0.4707,0.4,0.4832,-0.4392,0.4392,0.4707,-0.4,0.4707,0.4577,-0.4577,0.4577,0.4656,-0.4372,0.4656,0.4,-0.4924,0.4383,0.4383,-0.4924,0.4,0.4,-0.4707,0.4707,0.4392,-0.4832,0.4392,0.4707,-0.4707,0.4,0.4656,-0.4656,0.4372,0.4383,-0.4,0.4924,0.4,-0.4383,0.4924,0.4707,-0.4,0.4707,0.4392,-0.4392,0.4832,0.4,-0.4707,0.4707,0.4577,-0.4577,0.4577,0.4372,-0.4656,0.4656,0.4924,-0.4,-0.4383,0.4924,-0.4383,-0.4,0.5,-0.4,-0.4,0.4707,-0.4,-0.4707,0.4832,-0.4392,-0.4392,0.4707,-0.4707,-0.4,0.4577,-0.4577,-0.4577,0.4656,-0.4656,-0.4372,0.4,-0.4383,-0.4924,0.4383,-0.4,-0.4924,0.4,-0.4707,-0.4707,0.4392,-0.4392,-0.4832,0.4707,-0.4,-0.4707,0.4577,-0.4577,-0.4577,0.4656,-0.4372,-0.4656,0.4383,-0.4924,-0.4,0.4,-0.4924,-0.4383,0.4707,-0.4707,-0.4,0.4392,-0.4832,-0.4392,0.4,-0.4707,-0.4707,0.4577,-0.4577,-0.4577,0.4372,-0.4656,-0.4656,-0.4383,-0.4,-0.4924,-0.4,-0.4383,-0.4924,-0.4707,-0.4,-0.4707,-0.4392,-0.4392,-0.4832,-0.4,-0.4707,-0.4707,-0.4577,-0.4577,-0.4577,-0.4372,-0.4656,-0.4656,-0.4924,-0.4383,-0.4,-0.4924,-0.4,-0.4383,-0.4707,-0.4707,-0.4,-0.4832,-0.4392,-0.4392,-0.4707,-0.4,-0.4707,-0.4577,-0.4577,-0.4577,-0.4656,-0.4372,-0.4656,-0.4,-0.4924,-0.4383,-0.4383,-0.4924,-0.4,-0.4,-0.5,-0.4,-0.4,-0.4707,-0.4707,-0.4392,-0.4832,-0.4392,-0.4707,-0.4707,-0.4,-0.4577,-0.4577,-0.4577,-0.4656,-0.4656,-0.4372,-0.4,-0.4383,0.4924,-0.4383,-0.4,0.4924,-0.4,-0.4,0.5,-0.4,-0.4707,0.4707,-0.4392,-0.4392,0.4832,-0.4707,-0.4,0.4707,-0.4577,-0.4577,0.4577,-0.4656,-0.4372,0.4656,-0.4383,-0.4924,0.4,-0.4,-0.4924,0.4383,-0.4707,-0.4707,0.4,-0.4392,-0.4832,0.4392,-0.4,-0.4707,0.4707,-0.4577,-0.4577,0.4577,-0.4372,-0.4656,0.4656,-0.4924,-0.4,0.4383,-0.4924,-0.4383,0.4,-0.4707,-0.4,0.4707,-0.4832,-0.4392,0.4392,-0.4707,-0.4707,0.4,-0.4577,-0.4577,0.4577,-0.4656,-0.4656,0.4372,0.4,0.4383,0.4924,0.4383,0.4,0.4924,0.4,0.4707,0.4707,0.4392,0.4392,0.4832,0.4707,0.4,0.4707,0.4577,0.4577,0.4577,0.4656,0.4372,0.4656,0.4383,0.4924,0.4,0.4,0.4924,0.4383,0.4707,0.4707,0.4,0.4392,0.4832,0.4392,0.4,0.4707,0.4707,0.4372,0.4656,0.4656,0.4924,0.4,0.4383,0.4924,0.4383,0.4,0.5,0.4,0.4,0.4707,0.4,0.4707,0.4832,0.4392,0.4392,0.4707,0.4707,0.4,0.4577,0.4577,0.4577,0.4656,0.4656,0.4372,0.4383,0.4,-0.4924,0.4,0.4383,-0.4924,0.4707,0.4,-0.4707,0.4392,0.4392,-0.4832,0.4,0.4707,-0.4707,0.4577,0.4577,-0.4577,0.4372,0.4656,-0.4656,0.4924,0.4383,-0.4,0.4924,0.4,-0.4383,0.5,0.4,-0.4,0.4707,0.4707,-0.4,0.4832,0.4392,-0.4392,0.4707,0.4,-0.4707,0.4577,0.4577,-0.4577,0.4656,0.4372,-0.4656,0.4,0.4924,-0.4383,0.4383,0.4924,-0.4,0.4,0.4707,-0.4707,0.4392,0.4832,-0.4392,0.4707,0.4707,-0.4,0.4577,0.4577,-0.4577,0.4656,0.4656,-0.4372,-0.4924,0.4,-0.4383,-0.4924,0.4383,-0.4,-0.5,0.4,-0.4,-0.4707,0.4,-0.4707,-0.4832,0.4392,-0.4392,-0.4707,0.4707,-0.4,-0.4577,0.4577,-0.4577,-0.4656,0.4656,-0.4372,-0.4,0.4383,-0.4924,-0.4383,0.4,-0.4924,-0.4,0.4,-0.5,-0.4,0.4707,-0.4707,-0.4392,0.4392,-0.4832,-0.4707,0.4,-0.4707,-0.4577,0.4577,-0.4577,-0.4656,0.4372,-0.4656,-0.4383,0.4924,-0.4,-0.4,0.4924,-0.4383,-0.4,0.5,-0.4,-0.4707,0.4707,-0.4,-0.4392,0.4832,-0.4392,-0.4,0.4707,-0.4707,-0.4577,0.4577,-0.4577,-0.4372,0.4656,-0.4656,-0.4924,0.4383,0.4,-0.4924,0.4,0.4383,-0.4707,0.4707,0.4,-0.4832,0.4392,0.4392,-0.4707,0.4,0.4707,-0.4577,0.4577,0.4577,-0.4656,0.4372,0.4656,-0.4,0.4924,0.4383,-0.4383,0.4924,0.4,-0.4,0.4707,0.4707,-0.4392,0.4832,0.4392,-0.4707,0.4707,0.4,-0.4577,0.4577,0.4577,-0.4656,0.4656,0.4372,-0.4383,0.4,0.4924,-0.4,0.4383,0.4924,-0.4707,0.4,0.4707,-0.4392,0.4392,0.4832,-0.4,0.4707,0.4707,-0.4577,0.4577,0.4577,-0.4372,0.4656,0.4656,0.4707,-0.4707,-0.4,0.4707,-0.4707,0.4,0.4,-0.4707,0.4707,0.4707,-0.4,0.4707,0.4707,0.4,0.4707,-0.4,-0.4707,-0.4707,0.4,-0.4707,-0.4707,0.4707,-0.4,-0.4707,-0.4707,-0.4707,-0.4,-0.4707,-0.4,-0.4707,-0.4707,-0.4,0.4707,-0.4707,0.4,0.4707,0.4707,0.4707,0.4,0.4,0.4707,0.4707,0.4,0.4707,-0.4707,-0.4707,0.4707,-0.4,0.4656,-0.4656,0.4372,0.4656,-0.4656,0.4372,0.4372,-0.4656,0.4656,0.4707,-0.4707,0.4,0.4372,-0.4656,0.4656,0.4707,-0.4,0.4707,0.4656,-0.4372,0.4656,0.4,-0.4707,0.4707,0.4656,-0.4372,0.4656,0.4577,-0.4577,0.4577,0.4656,-0.4372,-0.4656,0.4656,-0.4372,-0.4656,0.4372,-0.4656,-0.4656,0.4707,-0.4,-0.4707,0.4372,-0.4656,-0.4656,0.4577,-0.4577,-0.4577,0.4707,-0.4707,-0.4,0.4656,-0.4656,-0.4372,0.4,-0.4707,-0.4707,0.4656,-0.4656,-0.4372,0.4577,-0.4577,-0.4577,-0.4656,-0.4372,-0.4656,-0.4656,-0.4372,-0.4656,-0.4656,-0.4656,-0.4372,-0.4707,-0.4,-0.4707,-0.4656,-0.4656,-0.4372,-0.4577,-0.4577,-0.4577,-0.4,-0.4707,-0.4707,-0.4372,-0.4656,-0.4656,-0.4707,-0.4707,-0.4,-0.4372,-0.4656,-0.4656,-0.4577,-0.4577,-0.4577,-0.4372,-0.4656,0.4656,-0.4372,-0.4656,0.4656,-0.4656,-0.4656,0.4372,-0.4,-0.4707,0.4707,-0.4656,-0.4656,0.4372,-0.4577,-0.4577,0.4577,-0.4707,-0.4,0.4707,-0.4656,-0.4372,0.4656,-0.4707,-0.4707,0.4,-0.4656,-0.4372,0.4656,-0.4577,-0.4577,0.4577,0.4372,0.4656,0.4656,0.4372,0.4656,0.4656,0.4656,0.4656,0.4372,0.4,0.4707,0.4707,0.4656,0.4656,0.4372,0.4707,0.4,0.4707,0.4656,0.4372,0.4656,0.4707,0.4707,0.4,0.4656,0.4372,0.4656,0.4577,0.4577,0.4577,0.4656,0.4372,-0.4656,0.4656,0.4372,-0.4656,0.4656,0.4656,-0.4372,0.4707,0.4,-0.4707,0.4656,0.4656,-0.4372,0.4577,0.4577,-0.4577,0.4,0.4707,-0.4707,0.4372,0.4656,-0.4656,0.4707,0.4707,-0.4,0.4372,0.4656,-0.4656,0.4577,0.4577,-0.4577,-0.4656,0.4372,-0.4656,-0.4656,0.4372,-0.4656,-0.4372,0.4656,-0.4656,-0.4707,0.4,-0.4707,-0.4372,0.4656,-0.4656,-0.4577,0.4577,-0.4577,-0.4707,0.4707,-0.4,-0.4656,0.4656,-0.4372,-0.4,0.4707,-0.4707,-0.4656,0.4656,-0.4372,-0.4577,0.4577,-0.4577,-0.4656,0.4656,0.4372,-0.4656,0.4656,0.4372,-0.4372,0.4656,0.4656,-0.4707,0.4707,0.4,-0.4372,0.4656,0.4656,-0.4577,0.4577,0.4577,-0.4707,0.4,0.4707,-0.4656,0.4372,0.4656,-0.4,0.4707,0.4707,-0.4656,0.4372,0.4656,-0.4577,0.4577,0.4577,0.4707,-0.4707,-0.4,-0.4,-0.4707,0.4707,0.4707,-0.4,0.4707,0.4707,0.4,0.4707,-0.4,-0.4707,-0.4707,0.4707,0.4,-0.4707,-0.4707,-0.4707,0.4,-0.4707,0.4,-0.4707,-0.4707,-0.4,0.4707,-0.4707,0.4,0.4707,0.4707,0.4707,-0.4,-0.4,0.4707,0.4707,-0.4,0.4707,-0.4707,0.4,0.4707,-0.4707,-0.4707,0.4707,0.4,-0.4707,0.4707,-0.4];
		var zindices = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,15,19,20,16,19,21,22,23,24,5,25,26,23,26,27,24,26,21,28,29,30,0,31,32,29,32,33,30,32,34,35,36,37,38,39,40,36,40,41,37,40,42,43,44,45,14,46,47,44,47,48,45,47,49,50,51,52,3,53,54,51,54,55,52,54,56,57,58,59,13,60,61,58,61,62,59,61,63,64,65,66,6,67,68,65,68,69,66,68,70,71,72,73,74,75,76,72,76,77,73,76,78,79,80,81,82,83,84,80,84,85,81,84,86,87,88,89,4,90,91,88,91,92,89,91,93,94,95,96,8,97,98,95,98,99,96,98,100,101,102,103,2,104,105,102,105,106,103,105,107,108,109,110,11,111,112,109,112,113,110,112,107,114,115,116,117,118,119,115,119,120,116,119,121,122,123,124,12,125,126,123,126,127,124,126,128,129,130,131,132,133,134,130,134,135,131,134,136,137,138,139,10,140,141,138,141,142,139,141,143,144,145,146,147,148,149,145,149,150,146,149,151,152,153,154,155,156,157,153,157,158,154,157,159,160,161,162,163,164,165,161,165,166,162,165,167,168,169,170,7,171,172,169,172,173,170,172,174,175,176,177,9,178,179,176,179,180,177,179,181,182,183,184,1,185,186,183,186,187,184,186,188,189,38,15,17,37,18,15,190,24,191,51,5,24,4,23,5,89,25,23,83,30,192,80,0,30,2,29,0,103,193,29,194,16,20,115,17,16,13,44,14,59,46,44,195,52,196,72,3,52,132,36,38,131,39,36,125,45,197,123,14,45,8,65,6,96,67,65,90,73,198,88,74,73,155,58,13,154,60,58,148,66,199,145,6,66,7,95,8,170,200,95,201,81,85,183,82,81,11,139,109,139,111,109,133,116,202,130,117,116,1,102,2,184,104,102,178,110,203,176,11,110,163,138,10,162,204,138,156,124,127,153,12,124,9,161,163,177,205,161,171,146,150,169,147,146,117,38,17,0,82,1,3,74,4,6,147,7,9,163,10,12,155,13,15,19,16,18,206,19,19,22,20,19,207,21,23,26,24,25,208,26,26,28,209,26,210,21,29,32,30,211,212,32,32,35,213,32,214,215,36,40,37,39,216,40,40,43,41,40,217,42,44,47,45,46,218,47,47,50,219,47,220,221,51,54,52,222,223,54,54,57,224,54,225,226,58,61,59,60,227,61,61,64,62,61,228,63,65,68,66,67,229,68,68,71,230,68,231,232,72,76,73,233,234,76,76,79,235,76,236,237,80,84,81,83,238,84,84,87,85,84,239,86,88,91,89,90,240,91,91,94,241,91,242,243,95,98,96,244,245,98,98,101,246,98,247,248,102,105,103,104,249,105,105,108,106,105,250,107,109,112,110,111,251,112,112,114,252,112,253,107,115,119,116,254,255,119,119,122,256,119,257,258,123,126,124,125,259,126,126,129,127,126,260,128,130,134,131,133,261,134,134,137,262,134,263,264,138,141,139,265,266,141,141,144,267,141,268,269,145,149,146,148,270,149,149,152,150,149,271,151,153,157,154,156,272,157,157,160,273,157,274,275,161,165,162,276,277,165,165,168,278,165,279,280,169,172,170,171,281,172,172,175,173,172,282,174,176,179,177,178,283,179,179,182,284,179,285,286,183,186,184,287,288,186,186,189,289,186,290,291,38,37,15,37,41,18,292,51,24,51,3,5,4,89,23,89,293,25,83,80,30,80,82,0,2,103,29,103,106,294,295,115,16,115,117,17,13,59,44,59,62,46,296,72,52,72,74,3,132,131,36,131,297,39,125,123,45,123,12,14,8,96,65,96,298,67,90,88,73,88,4,74,155,154,58,154,299,60,148,145,66,145,147,6,7,170,95,170,173,300,301,183,81,183,1,82,11,10,139,139,302,111,133,130,116,130,132,117,1,184,102,184,303,104,178,176,110,176,9,11,163,162,138,162,304,305,156,153,124,153,155,12,9,177,161,177,306,307,171,169,146,169,7,147,117,132,38];    
		var znormals = [0.097,-0.097,0.991,-0.097,0.097,0.991,0.097,0.097,0.991,0.097,-0.991,-0.097,-0.097,-0.991,0.097,0.097,-0.991,0.097,-0.991,-0.097,-0.097,-0.991,0.097,0.097,-0.991,-0.097,0.097,-0.097,0.991,0.097,0.097,0.991,-0.097,0.097,0.991,0.097,0.097,0.097,-0.991,-0.097,-0.097,-0.991,0.097,-0.097,-0.991,0.921,-0.378,0.097,0.921,-0.097,0.378,0.991,-0.097,0.097,0.704,-0.704,0.092,0.852,-0.37,0.37,0.704,-0.092,0.704,0.577,-0.577,0.577,0.668,-0.327,0.668,0.097,-0.921,0.378,0.378,-0.921,0.097,0.092,-0.704,0.704,0.37,-0.852,0.37,0.704,-0.704,0.092,0.668,-0.668,0.327,0.378,-0.097,0.921,0.097,-0.378,0.921,0.704,-0.092,0.704,0.37,-0.37,0.852,0.092,-0.704,0.704,0.577,-0.577,0.577,0.327,-0.668,0.668,0.921,-0.097,-0.378,0.921,-0.378,-0.097,0.991,-0.097,-0.097,0.704,-0.092,-0.704,0.852,-0.37,-0.37,0.704,-0.704,-0.092,0.577,-0.577,-0.577,0.668,-0.668,-0.327,0.097,-0.378,-0.921,0.378,-0.097,-0.921,0.092,-0.704,-0.704,0.37,-0.37,-0.852,0.704,-0.092,-0.704,0.577,-0.577,-0.577,0.668,-0.327,-0.668,0.378,-0.921,-0.097,0.097,-0.921,-0.378,0.704,-0.704,-0.092,0.37,-0.852,-0.37,0.092,-0.704,-0.704,0.577,-0.577,-0.577,0.327,-0.668,-0.668,-0.378,-0.097,-0.921,-0.097,-0.378,-0.921,-0.704,-0.092,-0.704,-0.37,-0.37,-0.852,-0.092,-0.704,-0.704,-0.577,-0.577,-0.577,-0.327,-0.668,-0.668,-0.921,-0.378,-0.097,-0.921,-0.097,-0.378,-0.704,-0.704,-0.092,-0.852,-0.37,-0.37,-0.704,-0.092,-0.704,-0.577,-0.577,-0.577,-0.668,-0.327,-0.668,-0.097,-0.921,-0.378,-0.378,-0.921,-0.097,-0.097,-0.991,-0.097,-0.092,-0.704,-0.704,-0.37,-0.852,-0.37,-0.704,-0.704,-0.092,-0.577,-0.577,-0.577,-0.668,-0.668,-0.327,-0.097,-0.378,0.921,-0.378,-0.097,0.921,-0.097,-0.097,0.991,-0.092,-0.704,0.704,-0.37,-0.37,0.852,-0.704,-0.092,0.704,-0.577,-0.577,0.577,-0.668,-0.327,0.668,-0.378,-0.921,0.097,-0.097,-0.921,0.378,-0.704,-0.704,0.092,-0.37,-0.852,0.37,-0.092,-0.704,0.704,-0.577,-0.577,0.577,-0.327,-0.668,0.668,-0.921,-0.097,0.378,-0.921,-0.378,0.097,-0.704,-0.092,0.704,-0.852,-0.37,0.37,-0.704,-0.704,0.092,-0.577,-0.577,0.577,-0.668,-0.668,0.327,0.097,0.378,0.921,0.378,0.097,0.921,0.092,0.704,0.704,0.37,0.37,0.852,0.704,0.092,0.704,0.577,0.577,0.577,0.668,0.327,0.668,0.378,0.921,0.097,0.097,0.921,0.378,0.704,0.704,0.092,0.37,0.852,0.37,0.092,0.704,0.704,0.327,0.668,0.668,0.921,0.097,0.378,0.921,0.378,0.097,0.991,0.097,0.097,0.704,0.092,0.704,0.852,0.37,0.37,0.704,0.704,0.092,0.577,0.577,0.577,0.668,0.668,0.327,0.378,0.097,-0.921,0.097,0.378,-0.921,0.704,0.092,-0.704,0.37,0.37,-0.852,0.092,0.704,-0.704,0.577,0.577,-0.577,0.327,0.668,-0.668,0.921,0.378,-0.097,0.921,0.097,-0.378,0.991,0.097,-0.097,0.704,0.704,-0.092,0.852,0.37,-0.37,0.704,0.092,-0.704,0.577,0.577,-0.577,0.668,0.327,-0.668,0.097,0.921,-0.378,0.378,0.921,-0.097,0.092,0.704,-0.704,0.37,0.852,-0.37,0.704,0.704,-0.092,0.577,0.577,-0.577,0.668,0.668,-0.327,-0.921,0.097,-0.378,-0.921,0.378,-0.097,-0.991,0.097,-0.097,-0.704,0.092,-0.704,-0.852,0.37,-0.37,-0.704,0.704,-0.092,-0.577,0.577,-0.577,-0.668,0.668,-0.327,-0.097,0.378,-0.921,-0.378,0.097,-0.921,-0.097,0.097,-0.991,-0.092,0.704,-0.704,-0.37,0.37,-0.852,-0.704,0.092,-0.704,-0.577,0.577,-0.577,-0.668,0.327,-0.668,-0.378,0.921,-0.097,-0.097,0.921,-0.378,-0.097,0.991,-0.097,-0.704,0.704,-0.092,-0.37,0.852,-0.37,-0.092,0.704,-0.704,-0.577,0.577,-0.577,-0.327,0.668,-0.668,-0.921,0.378,0.097,-0.921,0.097,0.378,-0.704,0.704,0.092,-0.852,0.37,0.37,-0.704,0.092,0.704,-0.577,0.577,0.577,-0.668,0.327,0.668,-0.097,0.921,0.378,-0.378,0.921,0.097,-0.092,0.704,0.704,-0.37,0.852,0.37,-0.704,0.704,0.092,-0.577,0.577,0.577,-0.668,0.668,0.327,-0.378,0.097,0.921,-0.097,0.378,0.921,-0.704,0.092,0.704,-0.37,0.37,0.852,-0.092,0.704,0.704,-0.577,0.577,0.577,-0.327,0.668,0.668,0.704,-0.704,-0.092,0.704,-0.704,0.092,0.092,-0.704,0.704,0.704,-0.092,0.704,0.704,0.092,0.704,-0.092,-0.704,-0.704,0.092,-0.704,-0.704,0.704,-0.092,-0.704,-0.704,-0.704,-0.092,-0.704,-0.092,-0.704,-0.704,-0.092,0.704,-0.704,0.092,0.704,0.704,0.704,0.092,0.092,0.704,0.704,0.092,0.704,-0.704,-0.704,0.704,-0.092,0.668,-0.668,0.327,0.668,-0.668,0.327,0.327,-0.668,0.668,0.704,-0.704,0.092,0.327,-0.668,0.668,0.704,-0.092,0.704,0.668,-0.327,0.668,0.092,-0.704,0.704,0.668,-0.327,0.668,0.577,-0.577,0.577,0.668,-0.327,-0.668,0.668,-0.327,-0.668,0.327,-0.668,-0.668,0.704,-0.092,-0.704,0.327,-0.668,-0.668,0.577,-0.577,-0.577,0.704,-0.704,-0.092,0.668,-0.668,-0.327,0.092,-0.704,-0.704,0.668,-0.668,-0.327,0.577,-0.577,-0.577,-0.668,-0.327,-0.668,-0.668,-0.327,-0.668,-0.668,-0.668,-0.327,-0.704,-0.092,-0.704,-0.668,-0.668,-0.327,-0.577,-0.577,-0.577,-0.092,-0.704,-0.704,-0.327,-0.668,-0.668,-0.704,-0.704,-0.092,-0.327,-0.668,-0.668,-0.577,-0.577,-0.577,-0.327,-0.668,0.668,-0.327,-0.668,0.668,-0.668,-0.668,0.327,-0.092,-0.704,0.704,-0.668,-0.668,0.327,-0.577,-0.577,0.577,-0.704,-0.092,0.704,-0.668,-0.327,0.668,-0.704,-0.704,0.092,-0.668,-0.327,0.668,-0.577,-0.577,0.577,0.327,0.668,0.668,0.327,0.668,0.668,0.668,0.668,0.327,0.092,0.704,0.704,0.668,0.668,0.327,0.704,0.092,0.704,0.668,0.327,0.668,0.704,0.704,0.092,0.668,0.327,0.668,0.577,0.577,0.577,0.668,0.327,-0.668,0.668,0.327,-0.668,0.668,0.668,-0.327,0.704,0.092,-0.704,0.668,0.668,-0.327,0.577,0.577,-0.577,0.092,0.704,-0.704,0.327,0.668,-0.668,0.704,0.704,-0.092,0.327,0.668,-0.668,0.577,0.577,-0.577,-0.668,0.327,-0.668,-0.668,0.327,-0.668,-0.327,0.668,-0.668,-0.704,0.092,-0.704,-0.327,0.668,-0.668,-0.577,0.577,-0.577,-0.704,0.704,-0.092,-0.668,0.668,-0.327,-0.092,0.704,-0.704,-0.668,0.668,-0.327,-0.577,0.577,-0.577,-0.668,0.668,0.327,-0.668,0.668,0.327,-0.327,0.668,0.668,-0.704,0.704,0.092,-0.327,0.668,0.668,-0.577,0.577,0.577,-0.704,0.092,0.704,-0.668,0.327,0.668,-0.092,0.704,0.704,-0.668,0.327,0.668,-0.577,0.577,0.577,0.704,-0.704,-0.092,-0.092,-0.704,0.704,0.704,-0.092,0.704,0.704,0.092,0.704,-0.092,-0.704,-0.704,0.704,0.092,-0.704,-0.704,-0.704,0.092,-0.704,0.092,-0.704,-0.704,-0.092,0.704,-0.704,0.092,0.704,0.704,0.704,-0.092,-0.092,0.704,0.704,-0.092,0.704,-0.704,0.092,0.704,-0.704,-0.704,0.704,0.092,-0.704,0.704,-0.092];
		var zuvs = [0.9,0.1,0.1,0.9,0.1,0.1,0.9,0.1,0.1,0.9,0.1,0.1,0.1,0.1,0.9,0.9,0.1,0.9,0.9,0.1,0.1,0.9,0.1,0.1,0.9,0.1,0.1,0.9,0.1,0.1,0.062,0.1,0.1,0.062,0.1,0.1,0,0.1,0.061,0.061,0.1,0,0,0.042,0.063,0,0.062,0.1,0.1,0.062,0,0.1,0.061,0.061,0.1,0,0.063,0,0.9,0.062,0.938,0.1,0.9,0,0.939,0.061,1,0.1,0.958,0,1,0.063,0.1,0.938,0.062,0.9,0.1,0.9,0.1,1,0.061,0.939,0,0.9,0.042,1,0,0.937,0.062,0.1,0.1,0.062,0,0.1,0.061,0.061,0.1,0,0,0.042,0.063,0,0.9,0.062,0.938,0.1,0.9,0,0.939,0.061,1,0.1,0.958,0,1,0.063,0.1,0.938,0.062,0.9,0.1,1,0.061,0.939,0,0.9,0.042,1,0,0.937,0.062,0.1,0.1,0.062,0,0.1,0.061,0.061,0.1,0,0,0.042,0.063,0,0.938,0.9,0.9,0.938,0.9,0.9,1,0.9,0.939,0.939,0.9,1,1,0.958,0.937,1,0.938,0.9,0.9,0.938,0.9,0.9,1,0.9,0.939,0.939,0.9,1,1,0.958,0.937,1,0.1,0.938,0.062,0.9,0.1,1,0.061,0.939,0,0.9,0.042,1,0,0.937,0.1,0.938,0.062,0.9,0.1,1,0.061,0.939,0,0.9,0.042,1,0,0.937,0.062,0.1,0.1,0.062,0,0.1,0.061,0.061,0.1,0,0,0.042,0.063,0,0.062,0.1,0.1,0.062,0,0.1,0.061,0.061,0.1,0,0.063,0,0.9,0.062,0.938,0.1,0.9,0.1,0.9,0,0.939,0.061,1,0.1,0.958,0,1,0.063,0.9,0.062,0.938,0.1,0.9,0,0.939,0.061,1,0.1,0.958,0,1,0.063,0.938,0.9,0.9,0.938,0.9,0.9,1,0.9,0.939,0.939,0.9,1,1,0.958,0.937,1,0.1,0.938,0.062,0.9,0.1,1,0.061,0.939,0,0.9,0.042,1,0,0.937,0.9,0.062,0.938,0.1,0.9,0.1,0.9,0,0.939,0.061,1,0.1,0.958,0,1,0.063,0.938,0.9,0.9,0.938,0.9,0.9,1,0.9,0.939,0.939,0.9,1,1,0.958,0.937,1,0.938,0.9,0.9,0.938,0.9,0.9,1,0.9,0.939,0.939,0.9,1,1,0.958,0.937,1,0.938,0.9,0.9,0.938,1,0.9,0.939,0.939,0.9,1,1,0.958,0.937,1,0.9,0.062,0.938,0.1,0.9,0,0.939,0.061,1,0.1,0.958,0,1,0.063,0.1,0.938,0.062,0.9,0.1,1,0.061,0.939,0,0.9,0.042,1,0,0.937,0.9,0,0.1,0,1,0.1,0.9,0,0.9,0,1,0.9,1,0.1,0.1,0,0.9,1,0.1,0,0.1,1,0.1,1,1,0.1,0.1,0,0.1,1,1,0.9,0,0.063,0,0.063,0,0.063,0.1,0,0,0.063,0.9,0,0.937,0,1,0.1,0.937,0,0.958,0,0.063,1,0.063,1,0,0.063,0.1,0,0,0.063,0,0.042,0.9,0,0.937,0,1,0.1,0.937,0,0.958,0,0.063,1,0.063,1,0,0.063,0.1,0,0,0.063,0,0.042,1,0.9,1,0.937,0.9,1,1,0.937,1,0.958,1,0.937,1,0.937,0.063,1,0,0.9,0.063,1,0.042,1,0.1,1,0.063,1,0,0.9,0.063,1,0.042,1,0,0.063,0,0.063,0,0.063,0.1,0,0,0.063,0.9,0,0.937,0,1,0.1,0.937,0,0.958,0,0.937,0,0.937,0,1,0.937,0.9,1,1,0.937,1,0.958,0.1,1,0.063,1,0,0.9,0.063,1,0.042,1,0.937,0,0.937,0,1,0.937,0.9,1,1,0.937,1,0.958,1,0.9,1,0.937,0.9,1,1,0.937,1,0.958,1,0.937,1,0.937,0.937,0,1,0.1,0.937,0,0.958,0,0.1,1,0.063,1,0,0.9,0.063,1,0.042,1,0.9,0,0,0.9,0.9,0,0.9,0,1,0.9,0.9,1,0,0.9,0.9,1,0.1,1,0.1,1,0,0.9,0,0.9,0.9,1,0.1,1,1,0.1,1,0.9];

		BABYLON.VertexData.ComputeNormals(zpositions, zindices, znormals);
		var zvertexdata = new BABYLON.VertexData();
		zvertexdata.positions = zpositions;
		zvertexdata.indices = zindices;
		zvertexdata.normals = znormals;
		zvertexdata.uvs = zuvs;
		zvertexdata.applyToMesh(zmold, true); 
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zmold.convertToUnIndexedMesh();
		zmold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addMoldRoundedBox=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addVideoStream = function(zmoldname, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = BABYLON.MeshBuilder.CreatePlane(zmoldname, {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULT}, scene);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		/* get webid */
		var zwebid = '';
		
		/* add video player if needed */
		if (dGet('wtw_streaming-' + zwebid) == null) {
//<div><video id='wtw_camerapreview' class='wtw-camerapreview'></video></div>
			var zdiv = document.createElement('div');
			zdiv.id = 'wtw_streamingdiv-' + zwebid;
			var zvideo = document.createElement('video');
			zvideo.id = 'wtw_streaming-' + zwebid;
			zvideo.className = 'wtw-videohidden';
			zdiv.appendChild(zvideo);
			dGet('wtw_streaming').appendChild(zdiv);
		}
		
		
		if (dGet('wtw_streaming-' + zwebid) != null) {
/*			var zvideomat = new BABYLON.StandardMaterial(zmoldname + '-streammat', scene);
			var zvideotexture = new BABYLON.VideoTexture(zmoldname + '-streamtexture', dGet('wtw_streaming-' + zwebid), scene, true, true);
			zvideomat.backFaceCulling = false;
			zvideomat.diffuseTexture = zvideotexture;
			zvideomat.emissiveColor = BABYLON.Color3.White();
			zmold.material = zvideomat;
*/		}
		zmold.convertToUnIndexedMesh();
		zmold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('core-scripts-molds-basicmolds\r\n addVideoStream=' + ex.message);
	}
	return zmold;
}


/* check for new mesh types, need to add molds for lathe, ribbon, etc */

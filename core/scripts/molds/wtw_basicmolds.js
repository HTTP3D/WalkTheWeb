WTWJS.prototype.addMoldBox = function(moldname, lenx, leny, lenz) {
	var mold;
	try {
		var sideorientation = BABYLON.Mesh.DEFAULT;
		if (moldname.indexOf("actionzone") > -1 && WTW.adminView == 1) {
			sideorientation = BABYLON.Mesh.DOUBLESIDE;
		}
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {sideOrientation: sideorientation}, scene);
		mold.scaling = new BABYLON.Vector3(lenx, leny, lenz);
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldBox=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldCylinder = function(moldname, lenx, leny, lenz, subdivisions) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateCylinder(moldname, {height: 1, diameterTop: 1, diameterBottom: 1, tessellation: subdivisions, subdivisions: 1, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		mold.scaling = new BABYLON.Vector3(lenx, leny, lenz);
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldCylinder=" + ex.message);
	}
	return mold;
}	

WTWJS.prototype.addMoldCone = function(moldname, lenx, leny, lenz, subdivisions, special1, special2) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateCylinder(moldname, {height: 1, diameterTop: special1, diameterBottom: special2, tessellation: subdivisions, subdivisions: 1, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		mold.scaling = new BABYLON.Vector3(lenx, leny, lenz);
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldCone=" + ex.message);
	}
	return mold;
}	

WTWJS.prototype.addMoldPolygon = function(moldname, lenx, leny, lenz, special1) {
	var mold;
	try {
		special1 = Math.round(special1);
		if (special1 < 0) {
			special1 = 0;
		}
		if (special1 > 14) {
			special1 = 14;
		}
		mold = BABYLON.MeshBuilder.CreatePolyhedron(moldname, {type: special1, size: 1, updatable: true, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		mold.scaling = new BABYLON.Vector3(lenx, leny, lenz);
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldPolygon=" + ex.message);
	}
	return mold;
}	

WTWJS.prototype.addMoldSphere = function(moldname, lenx, leny, lenz, subdivisions) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateSphere(moldname, {segments: subdivisions, diameter:1, updatable: true, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		mold.scaling = new BABYLON.Vector3(lenx, leny, lenz);
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldSphere=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldTriangle = function(moldname, lenx, leny, lenz, special1) {
	var mold;
	try {
		mold = new BABYLON.Mesh(moldname, scene);
		var positions = [-0.5,-0.5,-0.5,-0.5,0.5,0,-0.5,-0.5,0.5,0.5,-0.5,0.5,0.5,0.5,0,0.5,-0.5,-0.5];
		var indices = [0,1,2,1,3,2,3,4,5,4,0,5,3,0,2,1,4,3,4,1,0,3,5,0];    
		var normals = [-0.557,-0.437,-0.707,-0.551,0.835,0,-0.557,-0.437,0.707,0.557,-0.437,0.707,0.551,0.835,0,0.557,-0.437,-0.707];
		var uvs = [0,0,0,0,0,0,0,0,0,0,0,0];
		BABYLON.VertexData.ComputeNormals(positions, indices, normals);
		var vertexData = new BABYLON.VertexData();
		vertexData.positions = positions;
		vertexData.indices = indices;
		vertexData.normals = normals;
		vertexData.uvs = uvs;
		vertexData.applyToMesh(mold, true);
		mold.scaling = new BABYLON.Vector3(lenx, leny, lenz);
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldTriangle=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldTorus = function(moldname, lenx, leny, lenz, subdivisions, special1) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateTorus(moldname, {diameter: special1, thickness: 1, tessellation: subdivisions, updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
		mold.scaling = new BABYLON.Vector3(lenx, leny, lenz);
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldTorus=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldPlane = function(moldname, lenx, leny, lenz) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreatePlane(moldname, {updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		mold.scaling = new BABYLON.Vector3(lenx, leny, lenz);
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldPlane=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldDisc = function(moldname, lenx, leny, lenz, subdivisions) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateDisc(moldname, {tessellation: subdivisions, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		mold.scaling = new BABYLON.Vector3(lenx, leny, lenz);
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldDisc=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldTube = function(moldname, lenx, leny, lenz, subdivisions, special1, path1) {
	var mold;
	try {
		var patha = [];
		if (lenx == undefined) {
			lenx = 1;
		}
		if (leny == undefined) {
			leny = 1;
		}
		if (lenz == undefined) {
			lenz = 1;
		}
		if (subdivisions == undefined) {
			subdivisions = 16;
		}
		if (path1 == null || path1[0] == null) {
			patha.push(new BABYLON.Vector3(0, 0, 5));
			patha.push(new BABYLON.Vector3(0, 0, -5));
			patha.push(new BABYLON.Vector3(5, 0, -5)); 
		} else {
			for (var i=0;i < path1.length;i++) {
				if (path1[i] != null) {
					patha.push(new BABYLON.Vector3(Number(path1[i].x), Number(path1[i].y), Number(path1[i].z)));
				}
			}
		}
		mold = BABYLON.Mesh.CreateTube(moldname, patha, special1, subdivisions, null, BABYLON.Mesh.NO_CAP, scene, false, BABYLON.Mesh.DOUBLESIDE);
		/* cap : BABYLON.Mesh.NO_CAP, BABYLON.Mesh.CAP_START, BABYLON.Mesh.CAP_END, BABYLON.Mesh.CAP_ALL, */
		mold.scaling = new BABYLON.Vector3(lenx, leny, lenz);
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldTube=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldLine = function(moldname, lenx, leny, lenz, path1) {
	var mold;
	try {
		var patha = [];
		if (lenx == undefined) {
			lenx = 1;
		}
		if (leny == undefined) {
			leny = 1;
		}
		if (lenz == undefined) {
			lenz = 1;
		}
		if (path1 == null || path1[0] == null) {
			patha.push(new BABYLON.Vector3(0, 0, (lenz / 2)));
			patha.push(new BABYLON.Vector3(0, 0, (-lenz / 2)));
			patha.push(new BABYLON.Vector3((lenx / 2), 0, (-lenz / 2)));
		} else {
			for (var i=0;i < path1.length;i++) {
				if (path1[i] != null) {
					patha.push(new BABYLON.Vector3(Number(path1[i].x), Number(path1[i].y), Number(path1[i].z)));
				}
			}
		}		
		mold = BABYLON.MeshBuilder.CreateLines(name, {points: patha, useVertexAlpha: false, updatable: false}, scene);
		mold.enableEdgesRendering();
		mold.edgesWidth = leny;
		mold.edgesColor = new BABYLON.Color4(0, 1, 0, 1);
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldLine=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldTerrain = function(moldname, lenx, leny, lenz, subdivisions, heightmappath, heightmapid, minheight, maxheight, parentname, molddef, coveringname, posx, posy, posz) {
	var mold;
	try {
		if (molddef.graphics.heightmap.path != undefined) {
			heightmappath = molddef.graphics.heightmap.path;
		}
		if (heightmappath == '') {
			heightmappath = '/content/system/stock/heightmap-1500x1500.jpg';
		}
		if (heightmapid == '') {
			heightmapid = "dxmbplwoocpg5df3";
		}
		if (heightmappath != null) {
			heightmappath = heightmappath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
		}
		if (WTW.adminView == 1) {
			mold = BABYLON.MeshBuilder.CreateGroundFromHeightMap(moldname, heightmappath, {width: 1, height: 1, subdivisions: subdivisions, minHeight: minheight, maxHeight: maxheight, updatable: false}, scene);
			mold.scaling.x = lenx;
			mold.scaling.z = lenz;
		} else {
			mold = BABYLON.MeshBuilder.CreateGroundFromHeightMap(moldname, heightmappath, {width: lenx, height: lenz, subdivisions: subdivisions, minHeight: minheight, maxHeight: maxheight, updatable: false}, scene);
		}
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldTerrain=" + ex.message);
	}
	return mold;
}


WTWJS.prototype.addMoldDome = function(moldname, lenx, leny, lenz, subdivisions, special1) {
	var mold;
	try {
		if (special1 < 1) {
			special1 = 1;
		}
		var sphere1 = BABYLON.MeshBuilder.CreateSphere(moldname + "-sphere1", {segments: subdivisions, diameter:1, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		sphere1.scaling = new BABYLON.Vector3(lenx, leny, lenz);
		sphere1.position.y = 10;
		var sphere1CSG = BABYLON.CSG.FromMesh(sphere1);
		var sphere2 = BABYLON.MeshBuilder.CreateSphere(moldname + "-sphere2", {segments: subdivisions, diameter:1, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		sphere2.scaling = new BABYLON.Vector3(lenx - special1, leny - special1, lenz - special1);
		sphere2.position.y = 10;
		var sphere2CSG = BABYLON.CSG.FromMesh(sphere2);
		var box1 = BABYLON.MeshBuilder.CreateBox(moldname + "-box1", {}, scene);
		box1.scaling = new BABYLON.Vector3(lenx + 1, leny + 1, lenz + 1);
		box1.position = new BABYLON.Vector3(0, (10+leny/2), 0);
		var box1CSG = BABYLON.CSG.FromMesh(box1);
		var domeCSG = sphere1CSG.intersect(box1CSG);
		domeCSG = domeCSG.subtract(sphere2CSG);
		var covering = new BABYLON.StandardMaterial("mat" + moldname, scene);
		covering.backFaceCulling = false;
		mold = domeCSG.toMesh(moldname, covering, scene);
		WTW.disposeClean(moldname + "-sphere1");
		WTW.disposeClean(moldname + "-sphere2");
		WTW.disposeClean(moldname + "-box1");
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldDome=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldHalfPipe = function(moldname, lenx, leny, lenz, subdivisions, special1) {
	var mold;
	try {
		var cylinder1 = BABYLON.MeshBuilder.CreateCylinder(moldname + "-cylinder1", {height: 1, diameterTop: 1, diameterBottom: 1, tessellation: subdivisions, subdivisions: 1, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		cylinder1.scaling = new BABYLON.Vector3(lenx, leny, lenz);
		cylinder1.rotation.x = WTW.getRadians(90);
		cylinder1.rotation.y = WTW.getRadians(90);
		cylinder1.position.y = 10;
		var cylinder2 = BABYLON.MeshBuilder.CreateCylinder(moldname + "-cylinder2", {height: 1, diameterTop: 1, diameterBottom: 1, tessellation: subdivisions, subdivisions: 1, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		cylinder2.scaling = new BABYLON.Vector3(lenx-special1, leny + 1, lenz-special1);
		cylinder2.rotation.x = WTW.getRadians(90);
		cylinder2.rotation.y = WTW.getRadians(90);
		cylinder2.position.y = 10;
		var box1 = BABYLON.MeshBuilder.CreateBox(moldname + "-box1", {}, scene);
		box1.scaling = new BABYLON.Vector3(lenx + 1, leny + 1, lenz + 1);
		box1.position = new BABYLON.Vector3(0, 0, 0);
		box1.rotation.x = WTW.getRadians(90);
		box1.rotation.y = WTW.getRadians(90);
		box1.position.y = 10 - leny/2;
		var cylinder1CSG = BABYLON.CSG.FromMesh(cylinder1);
		var cylinder2CSG = BABYLON.CSG.FromMesh(cylinder2);
		var box1CSG = BABYLON.CSG.FromMesh(box1);
		var halfpipeCSG = cylinder1CSG.subtract(box1CSG).subtract(cylinder2CSG)
		var covering = new BABYLON.StandardMaterial("mat" + moldname, scene);
		covering.backFaceCulling = false;
		mold = halfpipeCSG.toMesh(moldname, covering, scene);
		WTW.disposeClean(moldname + "-cylinder1");
		WTW.disposeClean(moldname + "-cylinder2");
		WTW.disposeClean(moldname + "-box1");
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldHalfPipe=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldSimpleTextBox = function(moldname, molddef, lenx, leny, lenz) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,leny,lenz);
		mold.material = WTW.addCovering("hidden", moldname, molddef, lenx, leny, lenz, "0", "0");
		mold.material.alpha = 0;
		var webimageid = "t1qlqxd6pzubzzzy";
		var webtext = "<div style=\"font-size:24px;color:blue;\">Community Blog</div>";
		var basicmold = WTW.newMold();
		basicmold.shape = "box";
		basicmold.covering = molddef.covering;
		basicmold.position.x = 0;
		basicmold.position.y = 0;
		basicmold.position.z = 0;
		basicmold.scaling.x = 1;
		basicmold.scaling.y = 1;
		basicmold.scaling.z = 1;
		basicmold.subdivisions = 12;
		basicmold.graphics.texture.id = molddef.graphics.texture.id;
		basicmold.parentname = moldname;
		basicmold.checkcollisions = "1";
		var imageframe = WTW.addMold(moldname + "-simpletextboxframe", basicmold, basicmold.parentname, basicmold.covering);

		var basicmold1 = WTW.newMold();
		basicmold1.shape = "box";
		basicmold1.covering = "texture";
		basicmold1.position.x = -.2;
		basicmold1.position.y = 0;
		basicmold1.position.z = 0;
		basicmold1.scaling.x = 1;
		basicmold1.scaling.y = 1;
		basicmold1.scaling.z = 1;
		basicmold1.rotation.x = -90;
		basicmold1.subdivisions = 12;
		basicmold1.webtext.webtext = webtext;
		basicmold1.graphics.texture.id = webimageid;
		basicmold1.parentname = moldname;
		basicmold1.checkcollisions = "1";
		var textwall = WTW.addMold(moldname + "-simpletextboxwall", basicmold1, basicmold1.parentname, basicmold1.covering);
		WTW.registerMouseOver(textwall);
		textwall.WTW = basicmold1;
		
		var contentTexture = new BABYLON.DynamicTexture(moldname + "-simpletextboxtexture", {width: 512,height: 512}, scene, true);
		contentTexture.name = moldname + "-simpletextboxtexture";
		contentTexture.hasAlpha = true;
		contentTexture.uScale = (lenz/10);
		contentTexture.vScale = (leny/10);
		contentTexture.uOffset = 0;
		contentTexture.vOffset = (1 - (leny/10));
		textwall.material.diffuseTexture = contentTexture;
		var scrollpos = 0;
		var paragraph = WTW.wrapHtml(textwall, webtext, scrollpos);
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldSimpleTextBox=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldImage = function(moldname, molddef, lenx, leny, lenz) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,leny,lenz);
		mold.material = WTW.addCovering("hidden", moldname, molddef, lenx, leny, lenz, "0", "0");
		mold.material.alpha = 0;
		var basemold = BABYLON.MeshBuilder.CreateBox(moldname + "-base", {}, scene);
		basemold.scaling = new BABYLON.Vector3(1/lenx,1/leny,1/lenz);
		basemold.material = WTW.addCovering("hidden", moldname + "-base", molddef, lenx, leny, lenz, "0", "0");
		basemold.material.alpha = 0;
		basemold.parent = mold;
		var imageid = "t1qlqxd6pzubzzzy";
		var imagepath = "/content/system/stock/lightgray-512x447.jpg";
		var textureid = "t1qlqxd6pzubzzzy";
		var texturepath = "/content/system/stock/lightgray-512x447.jpg";
		var imagehoverid = "";
		var imagehoverpath = "";
		var imageclickid = "";
		var imageclickpath = "";
		var imagewallname = moldname + "-imagewall";
		var img = new Image();
		var uoffset = 0;
		var voffset = 0;
		var uscale = 10/leny;
		var vscale = 10/lenz;
		if (molddef != undefined) {
			if (molddef.shape != "") {
				shape = molddef.shape;
			}
			if (molddef.graphics != undefined) {
				if (molddef.graphics.webimages[0] != null) {
					if (molddef.graphics.webimages[0].imageid != undefined) {
						if (molddef.graphics.webimages[0].imageid != "") {
							imageid = molddef.graphics.webimages[0].imageid;
						}
					}
					if (molddef.graphics.webimages[0].imagepath != undefined) {
						if (molddef.graphics.webimages[0].imagepath != "") {
							imagepath = molddef.graphics.webimages[0].imagepath;
							imagepath = imagepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
						}
					}
					if (molddef.graphics.webimages[0].imagehoverid != undefined) {
						if (molddef.graphics.webimages[0].imagehoverid != "") {
							imagehoverid = molddef.graphics.webimages[0].imagehoverid;
						}
					}
					if (molddef.graphics.webimages[0].imagehoverpath != undefined) {
						if (molddef.graphics.webimages[0].imagehoverpath != "") {
							imagehoverpath = molddef.graphics.webimages[0].imagehoverpath;
							imagehoverpath = imagehoverpath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
						}
					}
					if (molddef.graphics.webimages[0].imageclickid != undefined) {
						if (molddef.graphics.webimages[0].imageclickid != "") {
							imageclickid = molddef.graphics.webimages[0].imageclickid;
						}
					}
					if (molddef.graphics.webimages[0].imageclickpath != undefined) {
						if (molddef.graphics.webimages[0].imageclickpath != "") {
							imageclickpath = molddef.graphics.webimages[0].imageclickpath;
							imageclickpath = imageclickpath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
						}
					}
				}
				if (molddef.graphics.texture.id != undefined) {
					textureid = molddef.graphics.texture.id;
				}
				if (molddef.graphics.texture.path != undefined) {
					texturepath = molddef.graphics.texture.path;
					texturepath = texturepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
				}
			}
		}		
		var molddefimage = WTW.newMold();
		molddefimage.shape = "box";
		molddefimage.covering = "texture";
		molddefimage.position.x = 0;
		molddefimage.position.y = 0;
		molddefimage.position.z = 0;
		molddefimage.scaling.x = .2;
		molddefimage.scaling.y = lenz;
		molddefimage.scaling.z = leny;
		molddefimage.subdivisions = 12;
		molddefimage.graphics.texture.id = imageid;
		molddefimage.graphics.texture.path = imagepath;
		molddefimage.graphics.uscale = vscale;
		molddefimage.graphics.vscale = uscale;
		molddefimage.graphics.uoffset = voffset;
		molddefimage.graphics.voffset = uoffset;
		molddefimage.parentname = moldname + "-base";
		molddefimage.checkcollisions = "1";
		var imagemold = BABYLON.MeshBuilder.CreateBox(moldname + "-mainimage", {}, scene);
		imagemold.scaling = new BABYLON.Vector3(.2, lenz, leny);
		imagemold.rotation.x = WTW.getRadians(-90);
		imagemold.material = WTW.addCovering("texture", moldname + "-mainimage", molddefimage, .2, lenz, leny, '0', '0');
		imagemold.material.alpha = 1;
		imagemold.parent = basemold;
		WTW.registerMouseOver(imagemold);
		if (imagehoverid != '' && imagehoverid != 't1qlqxd6pzubzzzy') {
			var molddefhoverimage = WTW.newMold();
			molddefhoverimage.shape = "box";
			molddefhoverimage.covering = "texture";
			molddefhoverimage.position.x = 0;
			molddefhoverimage.position.y = 0;
			molddefhoverimage.position.z = 0;
			molddefhoverimage.scaling.x = .15;
			molddefhoverimage.scaling.y = lenz;
			molddefhoverimage.scaling.z = leny;
			molddefhoverimage.subdivisions = 12;
			molddefhoverimage.graphics.texture.id = imagehoverid;
			molddefhoverimage.graphics.texture.path = imagehoverpath;
			molddefhoverimage.graphics.uscale = vscale;
			molddefhoverimage.graphics.vscale = uscale;
			molddefhoverimage.graphics.uoffset = voffset;
			molddefhoverimage.graphics.voffset = uoffset;
			molddefhoverimage.parentname = moldname + "-base";
			molddefhoverimage.checkcollisions = "1";
			var hoverimagemold = BABYLON.MeshBuilder.CreateBox(moldname + "-hoverimage", {}, scene);
			hoverimagemold.scaling = new BABYLON.Vector3(.15, lenz, leny);
			hoverimagemold.rotation.x = WTW.getRadians(-90);
			hoverimagemold.material = WTW.addCovering("texture", moldname + "-hoverimage", molddefhoverimage, .15, lenz, leny, '0', '0');
			hoverimagemold.parent = basemold;		
		}
		if (imageclickid != '' && imageclickid != 't1qlqxd6pzubzzzy') {
			var molddefclickimage = WTW.newMold();
			molddefclickimage.shape = "box";
			molddefclickimage.covering = "texture";
			molddefclickimage.position.x = 0;
			molddefclickimage.position.y = 0;
			molddefclickimage.position.z = 0;
			molddefclickimage.scaling.x = .25;
			molddefclickimage.scaling.y = lenz;
			molddefclickimage.scaling.z = leny;
			molddefclickimage.subdivisions = 12;
			molddefclickimage.opacity = 0;
			molddefclickimage.graphics.texture.id = imageclickid;
			molddefclickimage.graphics.texture.path = imageclickpath;
			molddefclickimage.graphics.uscale = vscale;
			molddefclickimage.graphics.vscale = uscale;
			molddefclickimage.graphics.uoffset = voffset;
			molddefclickimage.graphics.voffset = uoffset;
			molddefclickimage.parentname = moldname + "-base";
			molddefclickimage.checkcollisions = "1";
			var clickimagemold = BABYLON.MeshBuilder.CreateBox(moldname + "-clickimage", {}, scene);
			clickimagemold.scaling = new BABYLON.Vector3(.25, lenz, leny);
			clickimagemold.rotation.x = WTW.getRadians(-90);
			clickimagemold.material = WTW.addCovering("texture", moldname + "-clickimage", molddefclickimage, .25, lenz, leny, '0', '0');
			clickimagemold.parent = basemold;
		}
		if (molddef.covering != "glass") {
			var molddefframe = WTW.newMold();
			molddefframe.shape = "box";
			molddefframe.covering = molddef.covering;
			molddefframe.color = molddef.color;
			molddefframe.position.x = .05;
			molddefframe.position.y = 0;
			molddefframe.position.z = 0;
			molddefframe.scaling.x = .2;
			molddefframe.scaling.y = lenz * 1.02;
			molddefframe.scaling.z = leny * 1.02;
			molddefframe.subdivisions = 12;
			molddefframe.graphics.texture.id = textureid;
			molddefframe.graphics.texture.path = texturepath;
			molddefframe.graphics.uscale = vscale;
			molddefframe.graphics.vscale = uscale;
			molddefframe.graphics.uoffset = voffset;
			molddefframe.graphics.voffset = uoffset;
			molddefframe.parentname = moldname + "-base";
			molddefframe.checkcollisions = "1";
			var imageframemold = BABYLON.MeshBuilder.CreateBox(moldname + "-imageframe", {}, scene);
			imageframemold.scaling = new BABYLON.Vector3(.2, lenz * 1.02, leny * 1.02);
			imageframemold.position = new BABYLON.Vector3(.05, 0, 0);
			imageframemold.rotation.x = WTW.getRadians(-90);
			imageframemold.material = WTW.addCovering(molddef.covering, moldname + "-imageframe", molddefframe, .2, lenz * 1.02, leny * 1.02, '0', '0');
			imageframemold.parent = basemold;	
			imageframemold.material.alpha = 1;	
		}		
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldImage=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldRaisedImage = function(moldname, molddef, lenx, leny, lenz, subdivisions, heightmappath, minheight, maxheight) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,leny,lenz);
		mold.material = WTW.addCovering("hidden", moldname, molddef, lenx, leny, lenz, "0", "0");
		mold.material.alpha = 0;
		var basemold = BABYLON.MeshBuilder.CreateBox(moldname + "-base", {}, scene);
		basemold.scaling = new BABYLON.Vector3(1/lenx,1/leny,1/lenz);
		basemold.material = WTW.addCovering("hidden", moldname + "-base", molddef, lenx, leny, lenz, "0", "0");
		basemold.parent = mold;
		var textureid = "t1qlqxd6pzubzzzy";
		var texturepath = "/content/system/stock/lightgray-512x447.jpg";
		var imageid = "t1qlqxd6pzubzzzy";
		var imagepath = "/content/system/stock/lightgray-512x447.jpg";
		var imagehoverid = "";
		var imagehoverpath = "";
		var imagewallname = moldname + "-imagewall";
		var img = new Image();
		if (molddef.graphics.webimages[0] != null) {
			if (molddef.graphics.webimages[0].imageid != undefined) {
				if (molddef.graphics.webimages[0].imageid != "") {
					imageid = molddef.graphics.webimages[0].imageid;
				}
			}
			if (molddef.graphics.webimages[0].imagepath != undefined) {
				if (molddef.graphics.webimages[0].imagepath != "") {
					imagepath = molddef.graphics.webimages[0].imagepath;
					imagepath = imagepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
				}
			}
			if (molddef.graphics.webimages[0].imagehoverid != undefined) {
				if (molddef.graphics.webimages[0].imagehoverid != "") {
					imagehoverid = molddef.graphics.webimages[0].imagehoverid;
				}
			}
			if (molddef.graphics.webimages[0].imagehoverpath != undefined) {
				if (molddef.graphics.webimages[0].imagehoverpath != "") {
					imagehoverpath = molddef.graphics.webimages[0].imagehoverpath;
					imagehoverpath = imagehoverpath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
				}
			}
		}
		if (molddef.graphics.texture.id != undefined) {
			if (molddef.graphics.texture.id != "") {
				textureid = molddef.graphics.texture.id;
			}
		}
		if (molddef.graphics.texture.path != undefined) {
			if (molddef.graphics.texture.path != "") {
				texturepath = molddef.graphics.texture.path;
				texturepath = texturepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
			}
		}
		if (WTW.isUploadReady(imageid) == false && imageid != "") {
			WTW.initLoadUpload(imageid, imageid, 5);
		}
		if (WTW.isUploadReady(imagehoverid) == false && imagehoverid != "") {
			WTW.initLoadUpload(imagehoverid, imagehoverid, 5);
			imagewallname = moldname + "-imagewall";
		}
		var raisedmold = BABYLON.MeshBuilder.CreateGroundFromHeightMap(moldname + "-raised", heightmappath, {width: 1, height: 1, subdivisions: subdivisions, minHeight: minheight, maxHeight: maxheight, updatable: false}, scene);
		var shapdef2 = WTW.newMold();
		raisedmold.position.x = .05;
		raisedmold.scaling.x = lenz;
		raisedmold.scaling.z = leny;
		raisedmold.rotation.z = WTW.getRadians(90);
		raisedmold.rotation.x = WTW.getRadians(270);
		raisedmold.parent = basemold;
		var uoffset = 0;
		var voffset = 0;
		var uscale = 1;
		var vscale = 1;
		var covering = new BABYLON.StandardMaterial("mat-" + moldname + "-raised", scene);
		function loadcoveringtexture(moldname, covering, imageid, uscale, vscale, uoffset, voffset) {
			var imageinfo = WTW.getUploadFileData(imageid);
			var imageextension = imageinfo.extension;
			covering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(imageinfo.filedata, "mattexture" + moldname + "-raised", scene);
			covering.diffuseTexture.uScale = uscale;
			covering.diffuseTexture.vScale = vscale;
			covering.diffuseTexture.uOffset = uoffset;
			covering.diffuseTexture.vOffset = voffset;
			covering.specularColor = new BABYLON.Color3(.4, .4, .4);
			covering.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);	
			var thisraisedmold = scene.getMeshByID(moldname + "-raised");
			if (thisraisedmold != null) {
				thisraisedmold.material = covering;
			}
		}
		if (WTW.isUploadReady(imageid)) {
			loadcoveringtexture(moldname, covering, imageid, uscale, vscale, uoffset, voffset);
		} else {
			WTW.getJSON("/connect/upload.php?uploadid=" + imageid, 
				function(response) {
					WTW.loadUpload(JSON.parse(response), imageid, 0);
					loadcoveringtexture(moldname, covering, imageid, uscale, vscale, uoffset, voffset);
				}
			);
		}
		var molddefimage = WTW.newMold();
		molddefimage.shape = "box";
		molddefimage.covering = "directional texture";
		molddefimage.position.x = 0;
		molddefimage.position.y = 0;
		molddefimage.position.z = 0;
		molddefimage.scaling.x = .2;
		molddefimage.scaling.y = leny;
		molddefimage.scaling.z = lenz;
		molddefimage.subdivisions = 12;
		molddefimage.graphics.texture.id = imageid;
		molddefimage.graphics.texture.path = imagepath;
		molddefimage.graphics.uscale = 10/leny;
		molddefimage.graphics.vscale = 10/lenz;
		molddefimage.parentname = moldname + "-base";
		molddefimage.checkcollisions = "1";
		var imagemold = BABYLON.MeshBuilder.CreateBox(moldname + "-mainimage", {}, scene);
		imagemold.scaling = new BABYLON.Vector3(.2, leny, lenz);
		imagemold.material = WTW.addCovering("directional texture", moldname + "-mainimage", molddefimage, .2, leny, lenz, '0', '0');
		imagemold.material.alpha = 1;
		imagemold.parent = basemold;
		WTW.registerMouseOver(imagemold);
		if (imagehoverid != '' && imagehoverid != 't1qlqxd6pzubzzzy') {
			var molddefhoverimage = WTW.newMold();
			molddefhoverimage.shape = "box";
			molddefhoverimage.covering = "directional texture";
			molddefhoverimage.position.x = 0;
			molddefhoverimage.position.y = 0;
			molddefhoverimage.position.z = 0;
			molddefhoverimage.scaling.x = .15;
			molddefhoverimage.scaling.y = leny;
			molddefhoverimage.scaling.z = lenz;
			molddefhoverimage.subdivisions = 12;
			molddefhoverimage.graphics.texture.id = imagehoverid;
			molddefhoverimage.graphics.texture.path = imagehoverpath;
			molddefhoverimage.graphics.uscale = 10/leny;
			molddefhoverimage.graphics.vscale = 10/lenz;
			molddefhoverimage.parentname = moldname + "-base";
			molddefhoverimage.checkcollisions = "1";
			var hoverimagemold = BABYLON.MeshBuilder.CreateBox(moldname + "-hoverimage", {}, scene);
			hoverimagemold.scaling = new BABYLON.Vector3(.15, leny, lenz);
			hoverimagemold.material = WTW.addCovering("directional texture", moldname + "-hoverimage", molddefhoverimage, .15, leny, lenz, '0', '0');
			hoverimagemold.parent = basemold;		
		}
		if (molddef.covering != "glass") {
			var molddefframe = WTW.newMold();
			molddefframe.shape = "box";
			molddefframe.covering = molddef.covering;
			molddefframe.position.x = .1;
			molddefframe.position.y = 0;
			molddefframe.position.z = 0;
			molddefframe.scaling.x = .2;
			molddefframe.scaling.y = leny * 1.02;
			molddefframe.scaling.z = lenz * 1.02;
			molddefframe.color = molddef.color;
			molddefframe.subdivisions = 12;
			molddefframe.graphics.texture.id = molddef.graphics.texture.id;
			molddefframe.graphics.texture.path = molddef.graphics.texture.path;
			molddefframe.graphics.uscale = 10/leny;
			molddefframe.graphics.vscale = 10/lenz;
			molddefframe.parentname = moldname + "-base";
			molddefframe.checkcollisions = "1";
			var imageframemold = BABYLON.MeshBuilder.CreateBox(moldname + "-imageframe", {}, scene);
			imageframemold.scaling = new BABYLON.Vector3(.2, leny * 1.02, lenz * 1.02);
			imageframemold.position = new BABYLON.Vector3(.1, 0, 0);
			imageframemold.material = WTW.addCovering("directional texture", moldname + "-imageframe", molddefframe, .2, leny * 1.02, lenz * 1.02, '0', '0');
			imageframemold.parent = basemold;	
			imageframemold.material.alpha = 1;	
		}		
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldRaisedImage=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldVideo = function(moldname, molddef, lenx, leny, lenz) {
    var mold;
    try {
        mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
        mold.scaling = new BABYLON.Vector3(lenx, leny, lenz);
        mold.material = WTW.addCovering("hidden", moldname, molddef, lenx, leny, lenz, "0", "0");
		mold.material.alpha = 0;
        var basemold = BABYLON.MeshBuilder.CreateBox(moldname + "-base", {}, scene);
        basemold.scaling = new BABYLON.Vector3(1 / lenx, 1 / leny, 1 / lenz);
        basemold.material = WTW.addCovering("hidden", moldname + "-base", molddef, lenx, leny, lenz, "0", "0");
        basemold.parent = mold;
		basemold.material.alpha = 0;
		var loop = false;
        var video = "/content/system/images/enterwelcomecenter.mp4";
		var videoposter = "/content/system/images/videoposter.jpg";
		if (molddef.sound.loop != undefined) {
			if (molddef.sound.loop == '1') {
				loop = true;
			}
		}
		if (molddef.graphics.texture.video != undefined) {
			if (molddef.graphics.texture.video != '') {
				video = molddef.graphics.texture.video;
			}
		}
		if (molddef.graphics.texture.videoposter != undefined) {
			if (molddef.graphics.texture.videoposter != '') {
				videoposter = molddef.graphics.texture.videoposter;
			}
		}
		molddef.object.folder = "/content/system/babylon/tv/";
		molddef.object.file = "tv.babylon";
		
		BABYLON.SceneLoader.ImportMeshAsync("", molddef.object.folder, molddef.object.file, scene).then(
			function (results) {
				if (results.meshes != null) {
					var objectanimations = [];
					var totalx = 0;
					var totaly = 0;
					var totalz = 0;
					var avex = 0;
					var avey = 0;
					var avez = 0;
					
					// add object animations using WTW.newObjectAnimation();
					objectanimations[0] = WTW.newObjectAnimation();
					objectanimations[0].animationname = 'playTV';
					objectanimations[0].moldevent = 'onclick';
					objectanimations[0].moldnamepart = 'Play';
					objectanimations[0].startframe = 10;
					objectanimations[0].endframe = 20;
					objectanimations[0].animationloop = false;
					objectanimations[0].speedratio = 1.00;
					objectanimations[0].additionalscript = 'WTW.checkVideoClick';
					objectanimations[0].additionalparameters = moldname + ',1';
					
					objectanimations[1] = WTW.newObjectAnimation();
					objectanimations[1].animationname = 'pauseTV';
					objectanimations[1].moldevent = 'onclick';
					objectanimations[1].moldnamepart = 'Pause';
					objectanimations[1].startframe = 10;
					objectanimations[1].endframe = 20;
					objectanimations[1].animationloop = false;
					objectanimations[1].speedratio = 1.00;
					objectanimations[1].additionalscript = 'WTW.checkVideoClick';
					objectanimations[1].additionalparameters = moldname + ',0';
					
					objectanimations[2] = WTW.newObjectAnimation();
					objectanimations[2].animationname = 'stopTV';
					objectanimations[2].moldevent = 'onclick';
					objectanimations[2].moldnamepart = 'Stop';
					objectanimations[2].startframe = 10;
					objectanimations[2].endframe = 20;
					objectanimations[2].animationloop = false;
					objectanimations[2].speedratio = 1.00;
					objectanimations[2].additionalscript = 'WTW.checkVideoClick';
					objectanimations[2].additionalparameters = moldname + ',-1';
					
					objectanimations[3] = WTW.newObjectAnimation();
					objectanimations[3].animationname = 'fullScreenTV';
					objectanimations[3].moldevent = 'onclick';
					objectanimations[3].moldnamepart = 'FullScreen';
					objectanimations[3].startframe = 10;
					objectanimations[3].endframe = 20;
					objectanimations[3].animationloop = false;
					objectanimations[3].speedratio = 1.00;
					objectanimations[3].additionalscript = 'WTW.checkVideoClick';
					objectanimations[3].additionalparameters = moldname + ',0';

					objectanimations[4] = WTW.newObjectAnimation();
					objectanimations[4].animationname = 'startAgainTV';
					objectanimations[4].moldevent = 'onclick';
					objectanimations[4].moldnamepart = 'StartAgain';
					objectanimations[4].startframe = 10;
					objectanimations[4].endframe = 20;
					objectanimations[4].animationloop = false;
					objectanimations[4].speedratio = 1.00;
					objectanimations[4].additionalscript = 'WTW.checkVideoClick';
					objectanimations[4].additionalparameters = moldname + ',2';

					objectanimations[5] = WTW.newObjectAnimation();
					objectanimations[5].animationname = 'onmouseoverPlayTV';
					objectanimations[5].moldevent = 'onmouseover';
					objectanimations[5].moldnamepart = 'Play';
					objectanimations[5].startframe = 40;
					objectanimations[5].endframe = 42;
					objectanimations[5].animationloop = false;
					objectanimations[5].speedratio = 2;
					objectanimations[5].additionalscript = 'WTW.showToolTip';
					objectanimations[5].additionalparameters = 'Play';
					
					objectanimations[6] = WTW.newObjectAnimation();
					objectanimations[6].animationname = 'onmouseoverPauseTV';
					objectanimations[6].moldevent = 'onmouseover';
					objectanimations[6].moldnamepart = 'Pause';
					objectanimations[6].startframe = 40;
					objectanimations[6].endframe = 42;
					objectanimations[6].animationloop = false;
					objectanimations[6].speedratio = 2;
					objectanimations[6].additionalscript = 'WTW.showToolTip';
					objectanimations[6].additionalparameters = 'Pause';
					
					objectanimations[7] = WTW.newObjectAnimation();
					objectanimations[7].animationname = 'onmouseoverStopTV';
					objectanimations[7].moldevent = 'onmouseover';
					objectanimations[7].moldnamepart = 'Stop';
					objectanimations[7].startframe = 40;
					objectanimations[7].endframe = 42;
					objectanimations[7].animationloop = false;
					objectanimations[7].speedratio = 2;
					objectanimations[7].additionalscript = 'WTW.showToolTip';
					objectanimations[7].additionalparameters = 'Stop';
					
					objectanimations[8] = WTW.newObjectAnimation();
					objectanimations[8].animationname = 'onmouseoverFullScreenTV';
					objectanimations[8].moldevent = 'onmouseover';
					objectanimations[8].moldnamepart = 'FullScreen';
					objectanimations[8].startframe = 40;
					objectanimations[8].endframe = 42;
					objectanimations[8].animationloop = false;
					objectanimations[8].speedratio = 2;
					objectanimations[8].additionalscript = 'WTW.showToolTip';
					objectanimations[8].additionalparameters = 'Full Screen';

					objectanimations[9] = WTW.newObjectAnimation();
					objectanimations[9].animationname = 'onmouseoverStartAgainTV';
					objectanimations[9].moldevent = 'onmouseover';
					objectanimations[9].moldnamepart = 'StartAgain';
					objectanimations[9].startframe = 40;
					objectanimations[9].endframe = 42;
					objectanimations[9].animationloop = false;
					objectanimations[9].speedratio = 2;
					objectanimations[9].additionalscript = 'WTW.showToolTip';
					objectanimations[9].additionalparameters = 'Start Again';

					objectanimations[10] = WTW.newObjectAnimation();
					objectanimations[10].animationname = 'onmouseoutPlayTV';
					objectanimations[10].moldevent = 'onmouseout';
					objectanimations[10].moldnamepart = 'Play';
					objectanimations[10].startframe = 50;
					objectanimations[10].endframe = 52;
					objectanimations[10].animationloop = false;
					objectanimations[10].speedratio = 2;
					objectanimations[10].additionalscript = 'WTW.hide';
					objectanimations[10].additionalparameters = 'wtw_itooltip';
					
					objectanimations[11] = WTW.newObjectAnimation();
					objectanimations[11].animationname = 'onmouseoutPauseTV';
					objectanimations[11].moldevent = 'onmouseout';
					objectanimations[11].moldnamepart = 'Pause';
					objectanimations[11].startframe = 50;
					objectanimations[11].endframe = 52;
					objectanimations[11].animationloop = false;
					objectanimations[11].speedratio = 2;
					objectanimations[11].additionalscript = 'WTW.hide';
					objectanimations[11].additionalparameters = 'wtw_itooltip';
					
					objectanimations[12] = WTW.newObjectAnimation();
					objectanimations[12].animationname = 'onmouseoutStopTV';
					objectanimations[12].moldevent = 'onmouseout';
					objectanimations[12].moldnamepart = 'Stop';
					objectanimations[12].startframe = 50;
					objectanimations[12].endframe = 52;
					objectanimations[12].animationloop = false;
					objectanimations[12].speedratio = 2;
					objectanimations[12].additionalscript = 'WTW.hide';
					objectanimations[12].additionalparameters = 'wtw_itooltip';
					
					objectanimations[13] = WTW.newObjectAnimation();
					objectanimations[13].animationname = 'onmouseoutFullScreenTV';
					objectanimations[13].moldevent = 'onmouseout';
					objectanimations[13].moldnamepart = 'FullScreen';
					objectanimations[13].startframe = 50;
					objectanimations[13].endframe = 52;
					objectanimations[13].animationloop = false;
					objectanimations[13].speedratio = 2;
					objectanimations[13].additionalscript = 'WTW.hide';
					objectanimations[13].additionalparameters = 'wtw_itooltip';

					objectanimations[14] = WTW.newObjectAnimation();
					objectanimations[14].animationname = 'onmouseoutStartAgainTV';
					objectanimations[14].moldevent = 'onmouseout';
					objectanimations[14].moldnamepart = 'StartAgain';
					objectanimations[14].startframe = 50;
					objectanimations[14].endframe = 52;
					objectanimations[14].animationloop = false;
					objectanimations[14].speedratio = 2;
					objectanimations[14].additionalscript = 'WTW.hide';
					objectanimations[14].additionalparameters = 'wtw_itooltip';

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
					for (var i=0; i < results.meshes.length; i++) {
						if (results.meshes[i] != null) {
							var meshname = results.meshes[i].name;
							var childmoldname = moldname + "-" + meshname;
							results.meshes[i].name = childmoldname;
							results.meshes[i].position.x -= avex;
							results.meshes[i].position.y -= avey;
							results.meshes[i].position.z -= avez;
							WTW.registerMouseOver(results.meshes[i]);
							if (results.meshes[i].parent == null) {
								results.meshes[i].parent = mold;
								results.meshes[i].rotation.x = WTW.getRadians(0);
								results.meshes[i].rotation.y = WTW.getRadians(180);
								results.meshes[i].scaling.y = .11;
								results.meshes[i].scaling.x = 1;
								results.meshes[i].scaling.z = .0633;
							}
							if (objectanimations != null) {
								WTW.addMoldAnimation(moldname, meshname, results.meshes[i], objectanimations);
								/* results.meshes[i].isPickable = true; */
							}
						}
					}
				}
			}
		);		
        var mat = new BABYLON.StandardMaterial(moldname + "-mat", scene);
        var videotexture = new BABYLON.VideoTexture(moldname + "-video", ["/content/stock/webvideos/blank.mp4"], scene, true, false);
        mat.diffuseTexture = videotexture;
        mat.alpha = 1;
        mat.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
        var videomold = BABYLON.MeshBuilder.CreateBox(moldname + "-mainvideo", {}, scene);
        videomold.scaling = new BABYLON.Vector3(.1, leny, lenz);
        videomold.position.x = -(lenx * .25);
        videomold.material = mat;
        videomold.material.diffuseTexture.video.loop = loop;
        videomold.WTW = {'videosrc':video,'firstvideoclick':false};
        videomold.parent = basemold;

        var videopostermold = BABYLON.MeshBuilder.CreateBox(moldname + "-videoposter", {}, scene);
        videopostermold.scaling = new BABYLON.Vector3(.1, leny, lenz);
        videopostermold.position.x = videomold.position.x -.1;
		videopostermold.parent = basemold;
        var postermat = new BABYLON.StandardMaterial(moldname + "-postermat", scene);
        postermat.diffuseTexture = new BABYLON.Texture(videoposter, scene);
        postermat.diffuseTexture.hasAlpha = false;
		postermat.alpha = 1;
		postermat.specularColor = new BABYLON.Color3(1,1,1);
		postermat.emissiveColor = new BABYLON.Color3(1,1,1);
		postermat.diffuseColor = new BABYLON.Color3(1,1,1);
		videopostermold.material = postermat;

        basemold.rotation.x = WTW.getRadians(-90);
    } catch (ex) {
        WTW.log("core-scripts-molds-basicmolds\r\n addMoldVideo=" + ex.message);
    }
    return mold;
}

WTWJS.prototype.addMoldCandleFlame = function(moldname, molddef, lenx, leny, lenz) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreatePlane(moldname, {updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		mold.scaling = new BABYLON.Vector3(lenx, leny, lenz);
		mold.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
		var covering = new BABYLON.FireMaterial("mat" + moldname, scene);
		covering.diffuseTexture = new BABYLON.Texture("/content/system/images/fire.png", scene);
		covering.distortionTexture = new BABYLON.Texture("/content/system/images/distortion.png", scene);
		covering.opacityTexture = new BABYLON.Texture("/content/system/images/candleopacity.png", scene);
		covering.speed = 5.0;
		mold.material = covering;
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldCandleFlame=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldWaterPlane = function(moldname, molddef, lenx, leny, lenz) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,1,lenz);
		mold.material = WTW.addCovering("hidden", moldname, molddef, lenx, 1, lenz, "0", "0");
		mold.material.alpha = 0;
		var basemold = BABYLON.MeshBuilder.CreateBox(moldname + "-base", {}, scene);
		basemold.scaling = new BABYLON.Vector3(1/lenx,1,1/lenz);
		basemold.material = WTW.addCovering("hidden", moldname + "-base", molddef, lenx, 1, lenz, "0", "0");
		basemold.parent = mold;
		
		var watermold = BABYLON.MeshBuilder.CreatePlane(moldname + "-water", {updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		watermold.scaling.x = lenx;
		watermold.scaling.y = lenz;
		watermold.rotation.x = WTW.getRadians(90);
		watermold.parent = basemold;
		watermold.isPickable = true;
		watermold.checkCollisions = false;
		watermold.position.y = 0;
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldWaterPlane=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldWaterDisc = function(moldname, molddef, lenx, leny, lenz, subdivisions) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,1,lenz);
		mold.material = WTW.addCovering("hidden", moldname, molddef, lenx, 1, lenz, "0", "0");
		mold.material.alpha = 0;
		var basemold = BABYLON.MeshBuilder.CreateBox(moldname + "-base", {}, scene);
		basemold.scaling = new BABYLON.Vector3(1/lenx,1,1/lenz);
		basemold.material = WTW.addCovering("hidden", moldname + "-base", molddef, lenx, 1, lenz, "0", "0");
		basemold.parent = mold;
		
		var watermold = BABYLON.MeshBuilder.CreateDisc(moldname + "-water", {tessellation: subdivisions, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
		watermold.scaling.x = lenx;
		watermold.scaling.y = lenz;
		watermold.rotation.x = WTW.getRadians(90);
		watermold.parent = basemold;
		watermold.isPickable = true;
		watermold.checkCollisions = false;
		watermold.position.y = 0;
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldWaterDisc=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldParticleSphere = function(moldname, molddef, lenx, leny, lenz) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,leny,lenz);
		var transparentmat = new BABYLON.StandardMaterial("mat" + moldname, scene);
		transparentmat.alpha = 0;
		mold.material = transparentmat;
		
		var particleSystem = new BABYLON.ParticleSystem(moldname + "-particles", 2000, scene);
		particleSystem.parent = mold;
		particleSystem.particleTexture = new BABYLON.Texture("/content/system/images/flare.png", scene);
		
		particleSystem.emitter = mold; // the starting object, the emitter
		var emitterType = new BABYLON.SphereParticleEmitter();
		emitterType.radius = Math.sqrt(lenx*lenx + leny*leny + lenz*lenz);
		emitterType.radiusRange = 0;

		particleSystem.particleEmitterType = emitterType;
		
		particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
		particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
		particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
	
		particleSystem.minSize = 0.1;
		particleSystem.maxSize = 0.5;
	
		particleSystem.minLifeTime = 0.3;
		particleSystem.maxLifeTime = 1.5;
	
		particleSystem.emitRate = 1500;
		
		particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
		
		particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);
		
		particleSystem.minAngularSpeed = 0;
		
		particleSystem.maxAngularSpeed = Math.PI;
		
		particleSystem.minEmitPower = 1;
		particleSystem.maxEmitPower = 1;
		particleSystem.updateSpeed = 0.005;
	
		particleSystem.addVelocityGradient(0, 3, 5);
		particleSystem.addVelocityGradient(1.0, -5, -10);
	
		particleSystem.start();
		
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldParticleSphere=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldParticleShower = function(moldname, molddef, lenx, leny, lenz) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,leny,lenz);
		var transparentmat = new BABYLON.StandardMaterial("mat" + moldname, scene);
		transparentmat.alpha = 0;
		mold.material = transparentmat;
		
		var particleSystem = new BABYLON.ParticleSystem(moldname + "-particles", 2000, scene);
		particleSystem.parent = mold;
		particleSystem.particleTexture = new BABYLON.Texture("/content/system/images/flare.png", scene);
		
		particleSystem.emitter = mold; // the starting object, the emitter

		var sphereEmitter = particleSystem.createDirectedSphereEmitter(1.2, new BABYLON.Vector3(0, leny, 0), new BABYLON.Vector3(lenx * 1.5, leny * 1.5, lenz * 1.5));
		particleSystem.particleEmitterType = sphereEmitter;
		
		particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
		particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
		particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
	
		particleSystem.minSize = 0.1;
		particleSystem.maxSize = 0.5;
	
		particleSystem.minLifeTime = 0.3;
		particleSystem.maxLifeTime = 1.5;
	
		particleSystem.emitRate = 1500;
		
		particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
		
		particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);
		
		particleSystem.minAngularSpeed = 0;
		
		particleSystem.maxAngularSpeed = Math.PI;
		
		particleSystem.minEmitPower = 1;
		particleSystem.maxEmitPower = 1;
		particleSystem.updateSpeed = 0.005;
	
		particleSystem.addVelocityGradient(0, 3, 5);
		particleSystem.addVelocityGradient(1.0, -5, -10);
	
		particleSystem.start();
		
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldParticleShower=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldSmoke = function(moldname, molddef, lenx, leny, lenz) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,leny,lenz);
		var transparentmat = new BABYLON.StandardMaterial("mat" + moldname, scene);
		transparentmat.alpha = 0;
		mold.material = transparentmat;
		
		var smokePillar = BABYLON.ParticleHelper.CreateDefault(new BABYLON.Vector3.Zero, 2000);
		var smokePillarCone = smokePillar.createConeEmitter(0.6, 1);
		smokePillar.emitRate = 20;
		smokePillar.emitter = mold;
		smokePillar.id = moldname + "-smokepillar";
		smokePillar.name = moldname + "-smokepillar";
		
		/* Size */
		smokePillar.addSizeGradient(0.0, 1.0, 2.0);
		smokePillar.addSizeGradient(1.0, 5.0, 8.0);

		/* Lifetime */
		smokePillar.minLifeTime = 5;
		smokePillar.maxLifeTime = 8;

		/* Rotation */
		smokePillar.minInitialRotation = -Math.PI / 2;
		smokePillar.maxInitialRotation = Math.PI / 2;

		/* Rotation over lifetime */
		smokePillar.addAngularSpeedGradient(0, 0);
		smokePillar.addAngularSpeedGradient(1.0,-0.4, 0.4);

		/* Color over lifetime */
		smokePillar.addColorGradient(0.0, new BABYLON.Color4(190/255, 180/255, 180/255, 0.0));
		smokePillar.addColorGradient(0.2, new BABYLON.Color4(190/255, 180/255, 180/255, 128/255));
		smokePillar.addColorGradient(0.6, new BABYLON.Color4(110/255, 100/255, 100/255, 60/255));
		smokePillar.addColorGradient(1.0, new BABYLON.Color4(110/255, 100/255, 100/255, 0.0));

		/* Texture */
		smokePillar.isAnimationSheetEnabled = true;
		smokePillar.particleTexture = new BABYLON.Texture("/content/system/images/cloudsprite.png", scene);
		smokePillar.blendMode = BABYLON.ParticleSystem.BLENDMODE_MULTIPLY;
		smokePillar.spriteCellWidth = 256;
		smokePillar.spriteCellHeight = 256;
		smokePillar.startSpriteCellID = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
		smokePillar.endSpriteCellID = smokePillar.startSpriteCellID;
		smokePillar.spriteCellChangeSpeed = 1;

		/* Prewarm */
		smokePillar.preWarmCycles = 500;

		/* Start */
		smokePillar.start(30);
		
		smokePillar.parent = mold;

	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldSmoke=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldBabylonFile = function(moldname, molddef, lenx, leny, lenz) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,leny,lenz);
		var moldrot = null;
		var uploadobjectid = '';
		var objectfolder = '';
		var objectfile = '';
		var objectanimations = null;
		var drotationy = 0;
		var billboard = '0';
		if (molddef.object.uploadobjectid != undefined) {
			if (molddef.object.uploadobjectid != '') {
				uploadobjectid = molddef.object.uploadobjectid;
			}
		}
		if (molddef.object.folder != undefined) {
			if (molddef.object.folder != '') {
				objectfolder = molddef.object.folder;
			}
		}
		if (molddef.object.file != undefined) {
			if (molddef.object.file != '') {
				objectfile = molddef.object.file;
			}
		}
		if (molddef.object.objectanimations != undefined) {
			if (molddef.object.objectanimations != '') {
				objectanimations = molddef.object.objectanimations;
			}
		}
		if (molddef.rotation.y != undefined) {
			if (molddef.rotation.y != '') {
				drotationy = molddef.rotation.y;
			}
		}
		if (molddef.rotation.billboard != undefined) {
			if (molddef.rotation.billboard != '') {
				billboard = molddef.rotation.billboard;
				if (billboard == '1') {
					mold.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
					moldrot = BABYLON.MeshBuilder.CreateBox(moldname + "-moldrot", {}, scene);
					moldrot.scaling = new BABYLON.Vector3(lenx,leny,lenz);
					moldrot.parent = mold;
					moldrot.rotation.y = WTW.getRadians(-drotationy);
				}
			}
		}
		if (objectfile != '') {
			var transparentmat = new BABYLON.StandardMaterial("mat" + moldname, scene);
			transparentmat.alpha = 0;
			mold.material = transparentmat;
			if (moldrot != null) {
				moldrot.material = transparentmat;
			}
			if (objectfile.indexOf('.babylon') > -1) {
				BABYLON.SceneLoader.ImportMeshAsync("", objectfolder, objectfile, scene).then(
					function (results) {
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
							for (var i=0; i < results.meshes.length; i++) {
								if (results.meshes[i] != null) {
									var meshname = results.meshes[i].name;
									var childmoldname = moldname + "-" + results.meshes[i].name;
									results.meshes[i].id = childmoldname;
									results.meshes[i].name = childmoldname;
									results.meshes[i].position.x -= avex;
									results.meshes[i].position.y -= avey;
									results.meshes[i].position.z -= avez;
									if (results.meshes[i].name.indexOf('ground') > -1) {
										results.meshes[i].physicsImpostor = new BABYLON.PhysicsImpostor(results.meshes[i], BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0, friction: 1, restitution: 0.3 }, scene);
									} else if (results.meshes[i].name.indexOf('sides') > -1) {
										results.meshes[i].physicsImpostor = new BABYLON.PhysicsImpostor(results.meshes[i], BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0, friction: 1, restitution: 0.9 }, scene);
									}
									if (meshname.indexOf("WireFrame") > -1) {
										results.meshes[i].material.wireframe = true;
									}
									results.meshes[i].isPickable = true;
									WTW.registerMouseOver(results.meshes[i]);
									if (results.meshes[i].parent == null) {
										if (billboard == '1') {
											results.meshes[i].parent = moldrot;
										} else {
											results.meshes[i].parent = mold;
										}
									}
									if (WTW.shadows != null) {
										WTW.shadows.getShadowMap().renderList.push(results.meshes[i]);
									}
									results.meshes[i].receiveShadows = true;
									if (objectanimations != null) {
										WTW.addMoldAnimation(moldname, meshname, results.meshes[i], objectanimations);
									}
								}
							}
						}
						if (results.skeletons != null)	{
							for (var i=0; i < results.skeletons.length; i++) {
								if (results.skeletons[i] != null) {
									var bone = results.skeletons[i];
									var meshname = results.skeletons[i].name;
									bone.isVisible = false;
									var childmoldname = moldname + "-" + meshname;
									results.skeletons[i].name = childmoldname;
									/* WTW.registerMouseOver(results.skeletons[i]); */
									if (results.skeletons[i].parent == null) {
										if (billboard == '1') {
											results.skeletons[i].parent = moldrot;
										} else {
											results.skeletons[i].parent = mold;
										}
									}
								}
							}
						}
					}
				);
			} else if (objectfile.indexOf('.gltf') > -1) {
				BABYLON.SceneLoader.ImportMeshAsync("", objectfolder, objectfile, scene).then(
					function (results) {
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
							for (var i=0; i < results.meshes.length; i++) {
								if (results.meshes[i] != null) {
									results.meshes[i].name = moldname + "-file" + i;
									results.meshes[i].position.x -= avex;
									results.meshes[i].position.y -= avey;
									results.meshes[i].position.z -= avez;
									WTW.registerMouseOver(results.meshes[i]);
									if (results.meshes[i].parent == null) {
										if (billboard == '1') {
											results.meshes[i].parent = moldrot;
										} else {
											results.meshes[i].parent = mold;
										}
									}
								}
							}
							
						}
					}
				);				
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldBabylonFile=" + ex.message);
	}
	return mold;
} 

WTWJS.prototype.addMoldViewBlog = function(moldname, molddef, lenx, leny, lenz) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,leny,lenz);
		mold.material = WTW.addCovering("hidden", moldname, molddef, lenx, leny, lenz, "0", "0");
		mold.material.alpha = 0;
		var scalemold = BABYLON.MeshBuilder.CreateBox(moldname + "-scale", {}, scene);
		scalemold.scaling = new BABYLON.Vector3(1/lenx,1/leny,1/lenz);
		scalemold.material = WTW.addCovering("hidden", moldname + "-scale", molddef, 1, 1, 1, "0", "0");
		scalemold.WTW = molddef;
		scalemold.parent = mold;
		var webtext = "";
		if (molddef.webtext.webtext != undefined) {
			webtext = molddef.webtext.webtext;
		}
		var scrollpos = 0;
		if (WTW.isNumeric(molddef.position.scroll)) {
			scrollpos = Number(molddef.position.scroll);
		}
		var groovetextureid = "t1qlqxd6pzubzzzy";
		var buttontextureid = "vvpzrv2pae3bbkwv";
		var buttontexturehoverid = "yxs6lcxokr6lhll3";
		var bodyimageid = "8uhx630pg7pu57lc";
		var arrowdownid = "hj9oly198c17x086";
		var arrowdownhoverid = "q3bajsb9brye6q3c";
		var arrowupid = "xghzjpxk2lqv9l9k";
		var arrowuphoverid = "jgmqro16rbainojm";
		if (WTW.isUploadReady(groovetextureid) == false) {
			WTW.initLoadUpload(groovetextureid, groovetextureid, 5);
		}
		if (WTW.isUploadReady(buttontextureid) == false) {
			WTW.initLoadUpload(buttontextureid, buttontextureid, 5);
		}
		if (WTW.isUploadReady(bodyimageid) == false) {
			WTW.initLoadUpload(bodyimageid, bodyimageid, 5);
		}
		var basicmold = WTW.newMold();
		basicmold.shape = "box";
		basicmold.position.x = 0;
		basicmold.position.y = 0;
		basicmold.position.z = 0;
		basicmold.scaling.x = 1;
		basicmold.scaling.y = 15;
		basicmold.scaling.z = 15;
		basicmold.subdivisions = 12;
		basicmold.graphics.texture.id = molddef.graphics.texture.id;
		basicmold.graphics.texture.path = molddef.graphics.texture.path;
		basicmold.parentname = moldname + "-scale";
		basicmold.checkcollisions = "1";
		var scrollboxwall = WTW.addMold(moldname + "-scrollboxwall", basicmold, basicmold.parentname, basicmold.covering);
		
		var basicmold2 = WTW.newMold();
		basicmold2.shape = "box";
		basicmold2.position.x = 1/2;
		basicmold2.position.y = 0;
		basicmold2.position.z = 15/2 - .75;
		basicmold2.scaling.x = 1;
		basicmold2.scaling.y = (15 - .5);
		basicmold2.scaling.z = .65;
		basicmold2.subdivisions = 12;
		basicmold2.parentname = moldname + "-scale";
		basicmold2.checkcollisions = "1";
		var scrollboxgroove = WTW.addMold(moldname + "-scrollboxgroove", basicmold2, basicmold2.parentname, basicmold2.covering);
		WTW.setCSGAction(moldname + "-scrollboxwall", scrollboxwall, scrollboxgroove, "subtract", basicmold);
		
		var basicmold3 = WTW.newMold();
		basicmold3.shape = "box";
		basicmold3.position.x = 1/4;
		basicmold3.position.y = 0;
		basicmold3.position.z = 15/2 - .75;
		basicmold3.scaling.x = 1/2;
		basicmold3.scaling.y = (15 - .5);
		basicmold3.scaling.z = .65;
		basicmold3.subdivisions = 12;
		basicmold3.graphics.texture.id = groovetextureid;
		basicmold3.parentname = moldname + "-scale";
		basicmold3.checkcollisions = "1";
		var scrollboxgroovetexture = WTW.addMold(moldname + "-scrollboxgroovetexture", basicmold3, basicmold3.parentname, basicmold3.covering);

		var basicmold4 = WTW.newMold();
		basicmold4.shape = "box";
		basicmold4.position.x = 1/4 + .05;
		basicmold4.position.y = 0;
		basicmold4.position.z = 15/2 - .75;
		basicmold4.scaling.x = 1/2;
		basicmold4.scaling.y = (15 - .5);
		basicmold4.scaling.z = .6;
		basicmold4.subdivisions = 12;
		basicmold4.parentname = moldname + "-scale";
		basicmold4.checkcollisions = "1";
		var scrollboxgroovecut = WTW.addMold(moldname + "-scrollboxgroovecut", basicmold4, basicmold4.parentname, basicmold4.covering);
		WTW.setCSGAction(moldname + "-scrollboxgroovetexture", scrollboxgroovetexture, scrollboxgroovecut, "subtract", basicmold3);
			
		var basicmold10 = WTW.newMold();
		basicmold10.shape = "box";
		basicmold10.position.x = 1/2 + .02;
		basicmold10.position.y = 0;
		basicmold10.position.z = -.5;
		basicmold10.scaling.x = .04;
		basicmold10.scaling.y = 15 - 1;
		basicmold10.scaling.z = 15 - 2;
		basicmold10.subdivisions = 12;
		basicmold10.graphics.texture.id = bodyimageid;
		basicmold10.parentname = moldname + "-scale";
		basicmold10.checkcollisions = "1";
		var scrollboxbody = WTW.addMold(moldname + "-scrollboxbody", basicmold10, basicmold10.parentname, basicmold10.covering);

		var basicmold11 = WTW.newMold();
		basicmold11.shape = "box";
		basicmold11.covering = "texture";
		basicmold11.position.x = 1/2 + .04;
		basicmold11.position.y = 0;
		basicmold11.position.z = 0;
		basicmold11.scaling.x = 1;
		basicmold11.scaling.y = 1;
		basicmold11.scaling.z = 1;
		basicmold11.rotation.x = 90;
		basicmold11.subdivisions = 12;
		basicmold11.webtext.scrollpos = 0;
		basicmold11.webtext.webtext = webtext;
		basicmold11.graphics.texture.id = bodyimageid;
		basicmold11.parentname = moldname + "-scrollboxbody";
		basicmold11.checkcollisions = "1";
		var scrollboxbodytext = WTW.addMold(moldname + "-scrollboxbodytext", basicmold11, basicmold11.parentname, basicmold11.covering);
		scrollboxbodytext.WTW = basicmold11;

		var contentTexture = new BABYLON.DynamicTexture(moldname + "-scrollboxbodytexture", {width: 512,height: 512}, scene, true);
		contentTexture.name = moldname + "-scrollboxbodytexture";
		contentTexture.hasAlpha = true;
		scrollboxbodytext.material.diffuseTexture = contentTexture;
		var paragraph = WTW.wrapHtml(scrollboxbodytext, webtext, scrollpos);
		var tabheight = 1;
		if (paragraph.maxheight < paragraph.height) {
			tabheight = (15 - 2) * paragraph.maxheight / paragraph.height;
		}
		if ((15 - 2) * paragraph.maxheight / paragraph.height > (15 - 2)) {
			tabheight = (15 - 2);
		}
		var tabpos = tabpos = (15 - 2) / 2 - tabheight / 2;
		if (paragraph.height > paragraph.maxheight) {
			var basicmold9 = WTW.newMold();
			basicmold9.shape = "box";
			basicmold9.position.x = 1/4 + .2;
			basicmold9.position.y = tabpos;
			basicmold9.position.z = 15/2 - .75;
			basicmold9.scaling.x = 1/2;
			basicmold9.scaling.y = tabheight;
			basicmold9.scaling.z = .65;
			basicmold9.subdivisions = 12;
			basicmold9.graphics.texture.id = buttontextureid;
			basicmold9.parentname = moldname + "-scale";
			basicmold9.checkcollisions = "1";
			basicmold9.ispickable = "1";
			var scrollboxtab = WTW.addMold(moldname + "-scrollboxtab", basicmold9, basicmold9.parentname, basicmold9.covering);
			WTW.registerMouseOver(scrollboxtab);
			scrollboxtab.WTW = basicmold9;

			var basicmold9b = WTW.newMold();
			basicmold9b.shape = "box";
			basicmold9b.position.x = 0;
			basicmold9b.position.y = 0;
			basicmold9b.position.z = 0;
			basicmold9b.scaling.x = .8;
			basicmold9b.scaling.y = .99;
			basicmold9b.scaling.z = .8;
			basicmold9b.subdivisions = 12;
			basicmold9b.graphics.texture.id = buttontexturehoverid;
			basicmold9b.parentname = moldname + "-scale";
			basicmold9b.checkcollisions = "1";
			var scrollboxtabhover = WTW.addMold(moldname + "-scrollboxtabhover", basicmold9b, basicmold9b.parentname, basicmold9b.covering);
			
			var basicmold5 = WTW.newMold();
			basicmold5.shape = "box";
			basicmold5.covering = "directional texture";
			basicmold5.position.x = 1/4 + .2;
			basicmold5.position.y = 15/2 - .6;
			basicmold5.position.z = 15/2 - .75;
			basicmold5.scaling.x = .5;
			basicmold5.scaling.y = .65;
			basicmold5.scaling.z = .65;
			basicmold5.graphics.uscale = 15;
			basicmold5.graphics.vscale = 17;
			basicmold5.subdivisions = 12;
			basicmold5.graphics.texture.id = arrowupid;
			basicmold5.parentname = moldname + "-scale";
			basicmold5.checkcollisions = "1";
			basicmold5.ispickable = "1";
			var scrollboxup = WTW.addMold(moldname + "-scrollboxup", basicmold5, basicmold5.parentname, basicmold5.covering);
			WTW.registerMouseOver(scrollboxup);
			scrollboxup.WTW = basicmold5;

			var basicmold5b = WTW.newMold();
			basicmold5b.shape = "box";
			basicmold5b.covering = "directional texture";
			basicmold5b.position.x = 0;
			basicmold5b.position.y = 0;
			basicmold5b.position.z = 0;
			basicmold5b.scaling.x = .8;
			basicmold5b.scaling.y = .8;
			basicmold5b.scaling.z = .8;
			basicmold5b.graphics.uscale = 13;
			basicmold5b.graphics.vscale = 13;
			basicmold5b.subdivisions = 12;
			basicmold5b.graphics.texture.id = arrowuphoverid;
			basicmold5b.parentname = moldname + "-scrollboxup";
			basicmold5b.checkcollisions = "1";
			var scrollboxuphover = WTW.addMold(moldname + "-scrollboxuphover", basicmold5b, basicmold5b.parentname, basicmold5b.covering);

			var basicmold7 = WTW.newMold();
			basicmold7.shape = "box";
			basicmold7.covering = "directional texture";
			basicmold7.position.x = 1/4 + .2;
			basicmold7.position.y = -15/2 + .6;
			basicmold7.position.z = 15/2 - .75;
			basicmold7.scaling.x = .5;
			basicmold7.scaling.y = .65;
			basicmold7.scaling.z = .65;
			basicmold7.rotation.z = 90;
			basicmold7.rotation.y = 180;
			basicmold7.graphics.uscale = 15;
			basicmold7.graphics.vscale = 17;
			basicmold7.subdivisions = 12;
			basicmold7.graphics.texture.id = arrowdownid;
			basicmold7.parentname = moldname + "-scale";
			basicmold7.checkcollisions = "1";
			basicmold7.ispickable = "1";
			var scrollboxdown = WTW.addMold(moldname + "-scrollboxdown", basicmold7, basicmold7.parentname, basicmold7.covering);
			WTW.registerMouseOver(scrollboxdown);
			scrollboxdown.WTW = basicmold7;

			var basicmold7b = WTW.newMold();
			basicmold7b.shape = "box";
			basicmold7b.covering = "directional texture";
			basicmold7b.position.x = 0;
			basicmold7b.position.y = 0;
			basicmold7b.position.z = 0;
			basicmold7b.scaling.x = .8;
			basicmold7b.scaling.y = .8;
			basicmold7b.scaling.z = .8;
			basicmold7b.graphics.uscale = 13;
			basicmold7b.graphics.vscale = 13;
			basicmold7b.subdivisions = 12;
			basicmold7b.graphics.texture.id = arrowdownhoverid;
			basicmold7b.parentname = moldname + "-scrollboxdown";
			basicmold7b.checkcollisions = "1";
			var scrollboxdownhover = WTW.addMold(moldname + "-scrollboxdownhover", basicmold7b, basicmold7b.parentname, basicmold7b.covering);
		}
		if (moldname.indexOf("-") > -1) {
			var namepart = moldname.split('-');
			if (namepart.length > 2) {
				var molds = WTW.buildingMolds;
				var moldgroup = "building";
				var moldind = Number(namepart[1]);
				if (namepart[0] == "communitymolds") {
					molds = WTW.communitiesMolds;
					moldgroup = "community";
				}
				if (molds[moldind] != null) {
					var scrollpos = 0;
					if (molds[moldind].webtext.fullheight != undefined) {
						molds[moldind].webtext.fullheight = paragraph.height;
					}
				}
			}
		}
		window.setTimeout(function() {
			WTW.scrollBoxRepaint(moldname, 0);
		},1000);
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldViewBlog=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldBlogPosting = function(moldname, molddef, lenx, leny, lenz) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,leny,lenz);
		mold.material = WTW.addCovering("hidden", moldname, molddef, lenx, leny, lenz, "0", "0");
		mold.WTW = molddef;
		mold.material.alpha = 0;
		var scalemold = BABYLON.MeshBuilder.CreateBox(moldname + "-scale", {}, scene);
		scalemold.scaling = new BABYLON.Vector3(1/lenx,1/leny,1/lenz);
		scalemold.position.x = .5;
		scalemold.material = WTW.addCovering("hidden", moldname + "-scale", molddef, 1, 1, 1, "0", "0");
		scalemold.WTW = molddef;
		scalemold.parent = mold;
		
		var webtext = "";
		if (molddef.webtext.webtext != undefined) {
			webtext = molddef.webtext.webtext;
		}
		if (webtext == "") {
			webtext = "<div style=\"color:green;\">Click Here to Post</div>";
		}
		var scrollpos = 0;
		if (WTW.isNumeric(molddef.position.scroll)) {
			scrollpos = Number(molddef.position.scroll);
		}
		var groovetextureid = "t1qlqxd6pzubzzzy";
		var buttontextureid = "vvpzrv2pae3bbkwv";
		var bodyimageid = "8uhx630pg7pu57lc";
		var cancelbuttontextureid = "ksa2h7mf909cvech";
		var greenbuttontextureid = "ngb72qh6hvy3ms5c";
		var bodyimagebgid = "1acvat7nlz840lz2";
		if (WTW.isUploadReady(groovetextureid) == false) {
			WTW.initLoadUpload(groovetextureid, groovetextureid, 5);
		}
		if (WTW.isUploadReady(buttontextureid) == false) {
			WTW.initLoadUpload(buttontextureid, buttontextureid, 5);
		}
		if (WTW.isUploadReady(bodyimageid) == false) {
			WTW.initLoadUpload(bodyimageid, bodyimageid, 5);
		}
		if (WTW.isUploadReady(cancelbuttontextureid) == false) {
			WTW.initLoadUpload(cancelbuttontextureid, cancelbuttontextureid, 5);
		}
		if (WTW.isUploadReady(greenbuttontextureid) == false) {
			WTW.initLoadUpload(greenbuttontextureid, greenbuttontextureid, 5);
		}
		if (WTW.isUploadReady(bodyimagebgid) == false) {
			WTW.initLoadUpload(bodyimagebgid, bodyimagebgid, 5);
		}
		var bcanceltextureid = "3lnjnpihw0dvaqsu";
		var bcanceltexturehoverid = "u8nlyz4nveessjec";
		var bposttextureid = "77htnrtwy4rdo84v";
		var bposttexturehoverid = "4o13fso28z6zcu58";
		var bpictextureid = "v1jophdeu3w8iumn";
		var bpictexturehoverid = "gdhb5sgye391ev69";
		
		var basicmold = WTW.newMold();
		basicmold.shape = "box";
		basicmold.position.x = 0;
		basicmold.position.y = 0;
		basicmold.position.z = 0;
		basicmold.scaling.x = 1;
		basicmold.scaling.y = 15;
		basicmold.scaling.z = 15;
		basicmold.subdivisions = 12;
		basicmold.graphics.texture.id = molddef.graphics.texture.id;
		basicmold.graphics.texture.path = molddef.graphics.texture.path;
		basicmold.parentname = moldname + "-scale";
		basicmold.checkcollisions = "1";
		var posttextwall = WTW.addMold(moldname + "-posttextwall", basicmold, basicmold.parentname, basicmold.covering);
		
		var basicmold1 = WTW.newMold();
		basicmold1.shape = "box";
		basicmold1.position.x = 1/2;
		basicmold1.position.y = (15 * .25)/2;
		basicmold1.position.z = -.5;
		basicmold1.scaling.x = 1;
		basicmold1.scaling.y = (15 * .75) - 1;
		basicmold1.scaling.z = 15 - 2;
		basicmold1.subdivisions = 12;
		basicmold1.parentname = moldname + "-scale";
		basicmold1.checkcollisions = "1";
		var posttextviewgroove = WTW.addMold(moldname + "-posttextviewgroove", basicmold1, basicmold1.parentname, basicmold1.covering);
		posttextwall = WTW.setCSGAction(moldname + "-posttextwall", posttextwall, posttextviewgroove, "subtract", basicmold);

		var basicmold2 = WTW.newMold();
		basicmold2.shape = "box";
		basicmold2.position.x = 1/2;
		basicmold2.position.y = 0;
		basicmold2.position.z = 15/2 - .75;
		basicmold2.scaling.x = 1;
		basicmold2.scaling.y = (15 - .5);
		basicmold2.scaling.z = .65;
		basicmold2.subdivisions = 12;
		basicmold2.parentname = moldname + "-scale";
		basicmold2.checkcollisions = "1";
		var posttextgroove = WTW.addMold(moldname + "-posttextgroove", basicmold2, basicmold2.parentname, basicmold2.covering);
		posttextwall = WTW.setCSGAction(moldname + "-posttextwall", posttextwall, posttextgroove, "subtract", basicmold);
		WTW.registerMouseOver(posttextwall);
		
		var basicmold3 = WTW.newMold();
		basicmold3.shape = "box";
		basicmold3.position.x = 1/4;
		basicmold3.position.y = 0;
		basicmold3.position.z = 15/2 - .75;
		basicmold3.scaling.x = 1/2;
		basicmold3.scaling.y = (15 - .5);
		basicmold3.scaling.z = .65;
		basicmold3.subdivisions = 12;
		basicmold3.graphics.texture.id = groovetextureid;
		basicmold3.parentname = moldname + "-scale";
		basicmold3.checkcollisions = "1";
		var posttextgroovetexture = WTW.addMold(moldname + "-posttextgroovetexture", basicmold3, basicmold3.parentname, basicmold3.covering);

		var basicmold4 = WTW.newMold();
		basicmold4.shape = "box";
		basicmold4.position.x = 1/4 + .05;
		basicmold4.position.y = 0;
		basicmold4.position.z = 15/2 - .75;
		basicmold4.scaling.x = 1/2;
		basicmold4.scaling.y = (15 - .5);
		basicmold4.scaling.z = .6;
		basicmold4.subdivisions = 12;
		basicmold4.parentname = moldname + "-scale";
		basicmold4.checkcollisions = "1";
		var posttextgroovecut = WTW.addMold(moldname + "-posttextgroovecut", basicmold4, basicmold4.parentname, basicmold4.covering);
		posttextgroovetexture = WTW.setCSGAction(moldname + "-posttextgroovetexture", posttextgroovetexture, posttextgroovecut, "subtract", basicmold3);
		
		var basicmold18 = WTW.newMold();
		basicmold18.shape = "box";
		basicmold18.position.x = .2;
		basicmold18.position.y = 0;
		basicmold18.position.z = -.5;
		basicmold18.scaling.x = .04;
		basicmold18.scaling.y = 15 - 1;
		basicmold18.scaling.z = 15 - 2;
		basicmold18.subdivisions = 12;
		basicmold18.graphics.texture.id = bodyimagebgid;
		basicmold18.parentname = moldname + "-scale";
		basicmold18.checkcollisions = "1";
		var scrollboxtbodybg = WTW.addMold(moldname + "-scrollboxtbodybg", basicmold18, basicmold18.parentname, basicmold18.covering);
				
		var basicmold10 = WTW.newMold();
		basicmold10.shape = "box";
		basicmold10.position.x = 1/4;
		basicmold10.position.y = 0;
		basicmold10.position.z = -.5;
		basicmold10.scaling.x = .04;
		basicmold10.scaling.y = 15 - 1;
		basicmold10.scaling.z = 15 - 2;
		basicmold10.subdivisions = 12;
		basicmold10.graphics.texture.id = bodyimageid;
		basicmold10.parentname = moldname + "-scale";
		basicmold10.checkcollisions = "1";
		var scrollboxtbody = WTW.addMold(moldname + "-scrollboxtbody", basicmold10, basicmold10.parentname, basicmold10.covering);
		WTW.registerMouseOver(scrollboxtbody);
		scrollboxtbody.WTW = basicmold10;
		
		var basicmold11 = WTW.newMold();
		basicmold11.shape = "box";
		basicmold11.position.x = 1/2 + .04;
		basicmold11.position.y = 0;
		basicmold11.position.z = 0;
		basicmold11.scaling.x = 1;
		basicmold11.scaling.y = 1;
		basicmold11.scaling.z = 1;
		basicmold11.rotation.x = 90;
		basicmold11.subdivisions = 12;
		basicmold11.webtext.webtext = webtext;
		basicmold11.webtext.scrollpos = scrollpos;
		basicmold11.graphics.texture.id = bodyimageid;
		basicmold11.parentname = moldname + "-scrollboxtbody";
		basicmold11.checkcollisions = "1";
		var scrollboxbodytext = WTW.addMold(moldname + "-scrollboxbodytext", basicmold11, basicmold11.parentname, basicmold11.covering);
		scrollboxbodytext.WTW = basicmold11;
		
		var contentTexture = new BABYLON.DynamicTexture(moldname + "-scrollboxbodytexture", {width: 512,height: 512}, scene, true);
		contentTexture.name = moldname + "-scrollboxbodytexture";
		contentTexture.hasAlpha = true;
		scrollboxbodytext.material.diffuseTexture = contentTexture;
		var paragraph = WTW.wrapHtml(scrollboxbodytext, webtext, scrollpos);
		var tabheight = 1;
		if (paragraph.maxheight < paragraph.height) {
			tabheight = (15 - 2) * paragraph.maxheight / paragraph.height;
		}
		if ((15 - 2) * paragraph.maxheight / paragraph.height > (15 - 2)) {
			tabheight = (15 - 2);
		}
		var tabpos = 0;
		tabpos = (15 - 2) / 2 - tabheight / 2;

		var basicmold12 = WTW.newMold();
		basicmold12.shape = "box";
		basicmold12.covering = "directional texture";
		basicmold12.graphics.uscale = "7.2";
		basicmold12.graphics.vscale = "2.2";
		basicmold12.position.x = 1/4 + .2;
		basicmold12.position.y = (-15 * .3);
		basicmold12.position.z = 15/4;
		basicmold12.scaling.x = 1/2;
		basicmold12.scaling.y = (15 * .1);
		basicmold12.scaling.z = (15 * .3);
		basicmold12.subdivisions = 12;
		basicmold12.graphics.texture.id = bposttextureid;
		basicmold12.parentname = moldname + "-scale";
		basicmold12.checkcollisions = "1";
		var posttextbpost = WTW.addMold(moldname + "-posttextbpost", basicmold12, basicmold12.parentname, basicmold12.covering);
		WTW.registerMouseOver(posttextbpost);
		
		var basicmold13 = WTW.newMold();
		basicmold13.shape = "box";
		basicmold13.covering = "directional texture";
		basicmold13.graphics.uscale = "7.2";
		basicmold13.graphics.vscale = "2.2";
		basicmold13.position.x = 1/4 + .1;
		basicmold13.position.y = (-15 * .3);
		basicmold13.position.z = 15/4;
		basicmold13.scaling.x = 1/2;
		basicmold13.scaling.y = (15 * .1)-.05;
		basicmold13.scaling.z = (15 * .3)-.05;
		basicmold13.subdivisions = 12;
		basicmold13.graphics.texture.id = bposttexturehoverid;
		basicmold13.parentname = moldname + "-scale";
		basicmold13.checkcollisions = "1";
		var posttextbposthover = WTW.addMold(moldname + "-posttextbposthover", basicmold13, basicmold13.parentname, basicmold13.covering);
		
		var basicmold14 = WTW.newMold();
		basicmold14.shape = "box";
		basicmold14.covering = "directional texture";
		basicmold14.graphics.uscale = "7.2";
		basicmold14.graphics.vscale = "2.2";
		basicmold14.position.x = 1/4 + .2;
		basicmold14.position.y = (-15 * .3);
		basicmold14.position.z = -15 /3.2;
		basicmold14.scaling.x = 1/2;
		basicmold14.scaling.y = (15 * .1);
		basicmold14.scaling.z = (15 * .3);
		basicmold14.subdivisions = 12;
		basicmold14.graphics.texture.id = bcanceltextureid;
		basicmold14.parentname = moldname + "-scale";
		basicmold14.checkcollisions = "1";
		var posttextbcancel = WTW.addMold(moldname + "-posttextbcancel", basicmold14, basicmold14.parentname, basicmold14.covering);
		WTW.registerMouseOver(posttextbcancel);
		
		var basicmold15 = WTW.newMold();
		basicmold15.shape = "box";
		basicmold15.covering = "directional texture";
		basicmold15.graphics.uscale = "7.2";
		basicmold15.graphics.vscale = "2.2";
		basicmold15.position.x = 1/4 + .1;
		basicmold15.position.y = (-15 * .3);
		basicmold15.position.z = -15 /3.2;
		basicmold15.scaling.x = 1/2;
		basicmold15.scaling.y = (15 * .1)-.05;
		basicmold15.scaling.z = (15 * .3)-.05;
		basicmold15.subdivisions = 12;
		basicmold15.graphics.texture.id = bcanceltexturehoverid;
		basicmold15.parentname = moldname + "-scale";
		basicmold15.checkcollisions = "1";
		var posttextbcancelhover = WTW.addMold(moldname + "-posttextbcancelhover", basicmold15, basicmold15.parentname, basicmold15.covering);
		
		var basicmold16 = WTW.newMold();
		basicmold16.shape = "box";
		basicmold16.covering = "directional texture";
		basicmold16.graphics.uscale = "6.7";
		basicmold16.graphics.vscale = "6.7";
		basicmold16.position.x = 1/4 + .2;
		basicmold16.position.y = (-15 * .42);
		basicmold16.position.z = -15 /2.45;
		basicmold16.scaling.x = 1/2;
		basicmold16.scaling.y = (15 * .1);
		basicmold16.scaling.z = (15 * .1);
		basicmold16.subdivisions = 12;
		basicmold16.graphics.texture.id = bpictextureid;
		basicmold16.parentname = moldname + "-scale";
		basicmold16.checkcollisions = "1";
		var posttextbpic = WTW.addMold(moldname + "-posttextbpic", basicmold16, basicmold16.parentname, basicmold16.covering);
		WTW.registerMouseOver(posttextbpic);
		
		var basicmold17 = WTW.newMold();
		basicmold17.shape = "box";
		basicmold17.covering = "directional texture";
		basicmold17.graphics.uscale = "6.7";
		basicmold17.graphics.vscale = "6.7";
		basicmold17.position.x = 1/4 + .1;
		basicmold17.position.y = (-15 * .42);
		basicmold17.position.z = -15 /2.45;
		basicmold17.scaling.x = 1/2;
		basicmold17.scaling.y = (15 * .1)-.05;
		basicmold17.scaling.z = (15 * .1)-.05;
		basicmold17.subdivisions = 12;
		basicmold17.graphics.texture.id = bpictexturehoverid;
		basicmold17.parentname = moldname + "-scale";
		basicmold17.checkcollisions = "1";
		var posttextbpichover = WTW.addMold(moldname + "-posttextbpichover", basicmold17, basicmold17.parentname, basicmold17.covering);
		
		if (paragraph.height > paragraph.maxheight) {
			var basicmold9 = WTW.newMold();
			basicmold9.shape = "box";
			basicmold9.position.x = 1/4 + .2;
			basicmold9.position.y = tabpos;
			basicmold9.position.z = 15/2 - .75;
			basicmold9.scaling.x = 1/2;
			basicmold9.scaling.y = tabheight;
			basicmold9.scaling.z = .65;
			basicmold9.subdivisions = 12;
			basicmold9.graphics.texture.id = buttontextureid;
			basicmold9.parentname = moldname + "-scale";
			basicmold9.checkcollisions = "1";
			var scrollboxtab = WTW.addMold(moldname + "-scrollboxtab", basicmold9, basicmold9.parentname, basicmold9.covering);
			WTW.registerMouseOver(scrollboxtab);

			var basicmold5 = WTW.newMold();
			basicmold5.shape = "box";
			basicmold5.position.x = 1/4 + .2;
			basicmold5.position.y = 15/2 - .6;
			basicmold5.position.z = 15/2 - .75;
			basicmold5.scaling.x = 1/2;
			basicmold5.scaling.y = .65;
			basicmold5.scaling.z = .65;
			basicmold5.subdivisions = 12;
			basicmold5.graphics.texture.id = buttontextureid;
			basicmold5.parentname = moldname + "-scale";
			basicmold5.checkcollisions = "1";
			var scrollboxup = WTW.addMold(moldname + "-scrollboxup", basicmold5, basicmold5.parentname, basicmold5.covering);
			WTW.registerMouseOver(scrollboxup);
			
			var basicmold6 = WTW.newMold();
			basicmold6.shape = "triangle";
			basicmold6.position.x = 1/4 + .4;
			basicmold6.position.y = 15/2 - .6;
			basicmold6.position.z = 15/2 - .75;
			basicmold6.scaling.x = 1/2;
			basicmold6.scaling.y = .5;
			basicmold6.scaling.z = .5;
			basicmold6.rotation.x = -90;
			basicmold6.rotation.y = 0;
			basicmold6.rotation.z = 90;
			basicmold6.subdivisions = 12;
			basicmold6.graphics.texture.id = groovetextureid;
			basicmold6.parentname = moldname + "-scale";
			basicmold6.checkcollisions = "1";
			var scrollboxuparrow = WTW.addMold(moldname + "-scrollboxuparrow", basicmold6, basicmold6.parentname, basicmold6.covering);
			WTW.registerMouseOver(scrollboxuparrow);
			
			var basicmold7 = WTW.newMold();
			basicmold7.shape = "box";
			basicmold7.position.x = 1/4 + .2;
			basicmold7.position.y = -15/2 + .6;
			basicmold7.position.z = 15/2 - .75;
			basicmold7.scaling.x = 1/2;
			basicmold7.scaling.y = .65;
			basicmold7.scaling.z = .65;
			basicmold7.subdivisions = 12;
			basicmold7.graphics.texture.id = buttontextureid;
			basicmold7.parentname = moldname + "-scale";
			basicmold7.checkcollisions = "1";
			var scrollboxdown = WTW.addMold(moldname + "-scrollboxdown", basicmold7, basicmold7.parentname, basicmold7.covering);
			WTW.registerMouseOver(scrollboxdown);
			
			var basicmold8 = WTW.newMold();
			basicmold8.shape = "triangle";
			basicmold8.position.x = 1/4 + .4;
			basicmold8.position.y = -15/2 + .6;
			basicmold8.position.z = 15/2 - .75;
			basicmold8.scaling.x = 1/2;
			basicmold8.scaling.y = .5;
			basicmold8.scaling.z = .5;
			basicmold8.rotation.x = 90;
			basicmold8.rotation.y = 0;
			basicmold8.rotation.z = 90;
			basicmold8.subdivisions = 12;
			basicmold8.graphics.texture.id = groovetextureid;
			basicmold8.parentname = moldname + "-scale";
			basicmold8.checkcollisions = "1";
			var scrollboxdownarrow = WTW.addMold(moldname + "-scrollboxdownarrow", basicmold8, basicmold8.parentname, basicmold8.covering);
			WTW.registerMouseOver(scrollboxdownarrow);
		}
		if (moldname.indexOf("-") > -1) {
			var namepart = moldname.split('-');
			if (namepart.length > 2) {
				var molds = WTW.buildingMolds;
				var moldgroup = "building";
				var i = Number(namepart[1]);
				if (namepart[0] == "communitymolds") {
					molds = WTW.communitiesMolds;
					moldgroup = "community";
				}
				if (molds[i] != null) {
					var scrollpos = 0;
					if (molds[i].webtext.fullheight != undefined) {
						molds[i].webtext.fullheight = paragraph.height;
					}
				}
			}
		}
		window.setTimeout(function() {
			WTW.scrollBoxRepaint(moldname, 0);
		},1000);
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldBlogPosting=" + ex.message);
	}
	return mold;
} 

WTWJS.prototype.addMoldLightbulb = function(moldname, molddef, lenx, leny, lenz, posx, posy, posz, subdivisions) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,leny,lenz);
		molddef.covering = "hidden";
		mold.material = WTW.addCovering("hidden", moldname, molddef, lenx, leny, lenz, "0", "0");
		mold.material.alpha = 0;
		
		var moldbulb = WTW.newMold();
		moldbulb.shape = "sphere";
		moldbulb.covering = "color";
		moldbulb.color = molddef.color;
		moldbulb.scaling = molddef.scaling;
		moldbulb.subdivisions = molddef.subdivisions;
		moldbulb.parentname = moldname;
		moldbulb.checkcollisions = "1";
		bulbcenter = BABYLON.MeshBuilder.CreateSphere(moldname + "-bulbcenter", {segments: subdivisions, diameter:1, updatable: false, sideOrientation: BABYLON.Mesh.FRONTSIDE}, scene);
		bulbcenter.scaling = new BABYLON.Vector3(lenx * .3, leny * .8, lenz * .3);
		bulbcenter.material = WTW.addCovering("color", moldname + "-bulbmat", moldbulb, lenx * .3, leny * .8, lenz * .3, '0', '0');
		bulbcenter.parent = mold;
		
		var moldglass = BABYLON.MeshBuilder.CreateSphere(moldname, {segments: subdivisions, diameter:1, updatable: false, sideOrientation: BABYLON.Mesh.FRONTSIDE}, scene);
		moldglass.scaling = new BABYLON.Vector3(lenx, leny, lenz);
		moldglass.parent = mold;
		var glassmat = new BABYLON.StandardMaterial(moldname + "-glassmat", scene);
		glassmat.diffuseColor = new BABYLON.Color3(molddef.color.diffuse.r, molddef.color.diffuse.g, molddef.color.diffuse.b);
		glassmat.emissiveColor = new BABYLON.Color3(molddef.color.specular.r, molddef.color.specular.g, molddef.color.specular.b);
		glassmat.alpha = .4;
		glassmat.backFaceCulling = false;
		moldglass.material = glassmat;
		
		var moldnameparts = WTW.getMoldnameParts(moldname);
		if (moldnameparts.molds[moldnameparts.moldind] != null) {
			if (moldnameparts.molds[moldnameparts.moldind].objects.light != '') {
				moldnameparts.molds[moldnameparts.moldind].objects.light.dispose();
				moldnameparts.molds[moldnameparts.moldind].objects.light = '';
				moldnameparts.molds[moldnameparts.moldind].objects.shadows.dispose();
				moldnameparts.molds[moldnameparts.moldind].objects.shadows = '';
			}
			moldnameparts.molds[moldnameparts.moldind].objects.light = new BABYLON.PointLight(moldname + "-light", new BABYLON.Vector3(0, 0, 0), scene);
			moldnameparts.molds[moldnameparts.moldind].objects.light.intensity = 0.3;
			moldnameparts.molds[moldnameparts.moldind].objects.light.shadowMinZ = 1;
			moldnameparts.molds[moldnameparts.moldind].objects.light.shadowMaxZ = 100;
			moldnameparts.molds[moldnameparts.moldind].objects.light.diffuse = new BABYLON.Color3(Number(molddef.color.diffuse.r), Number(molddef.color.diffuse.g), Number(molddef.color.diffuse.b));
			moldnameparts.molds[moldnameparts.moldind].objects.light.specular = new BABYLON.Color3(Number(molddef.color.specular.r), Number(molddef.color.specular.g), Number(molddef.color.specular.b));
			moldnameparts.molds[moldnameparts.moldind].objects.light.parent = mold;
			
			moldnameparts.molds[moldnameparts.moldind].objects.shadows = new BABYLON.ShadowGenerator(1024, moldnameparts.molds[moldnameparts.moldind].objects.light);
			moldnameparts.molds[moldnameparts.moldind].objects.shadows.setDarkness(0.1);
			moldnameparts.molds[moldnameparts.moldind].objects.shadows.usePoissonSampling = true;
			
			for (var i=0; i < WTW.communitiesMolds.length;i++) {
				if (WTW.communitiesMolds[i] != null) {
					if (WTW.communitiesMolds[i].moldname != undefined) {
						var smold = scene.getMeshByID(WTW.communitiesMolds[i].moldname);
						if (smold != null) {
							WTW.addShadowToMold(smold, moldnameparts.molds[moldnameparts.moldind].objects.shadows);
						}
					}
				}
			}
			for (var i=0; i < WTW.buildingMolds.length;i++) {
				if (WTW.buildingMolds[i] != null) {
					if (WTW.buildingMolds[i].moldname != undefined) {
						var smold = scene.getMeshByID(WTW.buildingMolds[i].moldname);
						if (smold != null) {
							WTW.addShadowToMold(smold, moldnameparts.molds[moldnameparts.moldind].objects.shadows);
						}
					}
				}
			}
			for (var i=0; i < WTW.thingMolds.length;i++) {
				if (WTW.thingMolds[i] != null) {
					if (WTW.thingMolds[i].moldname != undefined) {
						var smold = scene.getMeshByID(WTW.thingMolds[i].moldname);
						if (smold != null) {
							WTW.addShadowToMold(smold, moldnameparts.molds[moldnameparts.moldind].objects.shadows);
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldLightbulb=" + ex.message);
	}
	return mold;
}

//Tree generator code

var coordSystem=function(b){var g=b.normalize();b=0==Math.abs(b.x)&&0==Math.abs(b.y)?(new BABYLON.Vector3(b.z,0,0)).normalize():(new BABYLON.Vector3(b.y,-b.x,0)).normalize();var r=BABYLON.Vector3.Cross(b,g);return{x:b,y:g,z:r}},randPct=function(b,g){return 0==g?b:(1+(1-2*Math.random())*g)*b},createBranch=function(b,g,r,w,h,l,v,n,x){for(var t=[],d,c=[],f,q=[],a=0;12>a;a++)t[a]=[];for(var m=0;m<h;m++)for(a=m/h,d=g.y.scale(a*r),d.addInPlace(g.x.scale(v*Math.exp(-a)*Math.sin(l*a*Math.PI))),d.addInPlace(b),c[m]=d,d=n*(1+(.4*Math.random()-.2))*(1-(1-w)*a),q.push(d),a=0;12>a;a++)f=a*Math.PI/6,f=g.x.scale(d*Math.cos(f)).add(g.z.scale(d*Math.sin(f))),f.addInPlace(c[m]),t[a].push(f);for(a=0;12>a;a++)t[a].push(c[c.length-1]);return{branch:BABYLON.MeshBuilder.CreateRibbon("branch",{pathArray:t,closeArray:!0},x),core:c,_radii:q}},createTreeBase=function(b,g,r,w,h,l,v,n,x,t){var d=2/(1+Math.sqrt(5)),c=new BABYLON.Vector3(0,1,0),f,c=coordSystem(c),q=new BABYLON.Vector3(0,0,0),a=[],m=[],e=[],A=[],q=createBranch(q,c,b,g,r,1,x,1,t);a.push(q.branch);var y=q.core;m.push(y);e.push(q._radii);A.push(c);for(var q=y[y.length-1],y=2*Math.PI/h,z,u,p,C,B=0;B<h;B++)if(f=randPct(B*y,.25),f=c.y.scale(Math.cos(randPct(l,.15))).add(c.x.scale(Math.sin(randPct(l,.15))*Math.sin(f))).add(c.z.scale(Math.sin(randPct(l,.15))*Math.cos(f))),z=coordSystem(f),f=createBranch(q,z,b*v,g,r,n,x*d,g,t),p=f.core,p=p[p.length-1],a.push(f.branch),m.push(f.core),e.push(f._radii),A.push(z),1<w)for(var D=0;D<h;D++)u=randPct(D*y,.25),u=z.y.scale(Math.cos(randPct(l,.15))).add(z.x.scale(Math.sin(randPct(l,.15))*Math.sin(u))).add(z.z.scale(Math.sin(randPct(l,.15))*Math.cos(u))),u=coordSystem(u),C=createBranch(p,u,b*v*v,g,r,n,x*d*d,g*g,t),a.push(C.branch),m.push(C.core),e.push(f._radii),A.push(u);return{tree:BABYLON.Mesh.MergeMeshes(a),paths:m,radii:e,directions:A}},createTree=function(b,g,r,w,h,l,v,n,x,t,d,c,f,q,a,m){1!=h&&2!=h&&(h=1);var e=createTreeBase(b,g,r,h,l,v,n,d,c,m);e.tree.material=w;var A=b*Math.pow(n,h),y=A/(2*f),z=1.5*Math.pow(g,h-1);n=BABYLON.MeshBuilder.CreateDisc("leaf",{radius:z/2,tessellation:12,sideOrientation:BABYLON.Mesh.DOUBLESIDE},m);b=new BABYLON.SolidParticleSystem("leaveSPS",m,{updatable:!1});b.addShape(n,2*f*Math.pow(l,h),{positionFunction:function(b,a,g){a=Math.floor(g/(2*f));1==h?a++:a=2+a%l+Math.floor(a/l)*(l+1);var E=(g%(2*f)*y+3*y/2)/A,d=Math.ceil(r*E);d>e.paths[a].length-1&&(d=e.paths[a].length-1);var k=d-1,c=k/(r-1),m=d/(r-1);b.position=new BABYLON.Vector3(e.paths[a][k].x+(e.paths[a][d].x-e.paths[a][k].x)*(E-c)/(m-c),e.paths[a][k].y+(e.paths[a][d].y-e.paths[a][k].y)*(E-c)/(m-c)+(.6*z/q+e.radii[a][d])*(g%2*2-1),e.paths[a][k].z+(e.paths[a][d].z-e.paths[a][k].z)*(E-c)/(m-c));b.rotation.z=Math.random()*Math.PI/4;b.rotation.y=Math.random()*Math.PI/2;b.rotation.z=Math.random()*Math.PI/4;b.scale.y=1/q}});b=b.buildMesh();b.billboard=!0;n.dispose();d=new BABYLON.SolidParticleSystem("miniSPS",m,{updatable:!1});n=new BABYLON.SolidParticleSystem("minileavesSPS",m,{updatable:!1});var u=[];c=2*Math.PI/l;for(var p=0;p<Math.pow(l,h+1);p++)u.push(randPct(Math.floor(p/Math.pow(l,h))*c,.2));c=function(a,b,d){var c=d%Math.pow(l,h);1==h?c++:c=2+c%l+Math.floor(c/l)*(l+1);var f=e.directions[c],c=new BABYLON.Vector3(e.paths[c][e.paths[c].length-1].x,e.paths[c][e.paths[c].length-1].y,e.paths[c][e.paths[c].length-1].z),k=u[d],k=f.y.scale(Math.cos(randPct(v,0))).add(f.x.scale(Math.sin(randPct(v,0))*Math.sin(k))).add(f.z.scale(Math.sin(randPct(v,0))*Math.cos(k))),f=BABYLON.Vector3.Cross(BABYLON.Axis.Y,k),k=Math.acos(BABYLON.Vector3.Dot(k,BABYLON.Axis.Y)/k.length());a.scale=new BABYLON.Vector3(Math.pow(g,h+1),Math.pow(g,h+1),Math.pow(g,h+1));a.quaternion=BABYLON.Quaternion.RotationAxis(f,k);a.position=c;};for(var C=[],B=[],p=e.paths.length,D=e.paths[0].length,F=0;F<x;F++)C.push(2*Math.PI*Math.random()-Math.PI),B.push([Math.floor(Math.random()*p),Math.floor(Math.random()*(D-1)+1)]);p=function(a,c,b){var d=B[b][0],f=B[b][1],k=e.directions[d];c=new BABYLON.Vector3(e.paths[d][f].x,e.paths[d][f].y,e.paths[d][f].z);c.addInPlace(k.z.scale(e.radii[d][f]/2));b=C[b];k=k.y.scale(Math.cos(randPct(t,0))).add(k.x.scale(Math.sin(randPct(t,0))*Math.sin(b))).add(k.z.scale(Math.sin(randPct(t,0))*Math.cos(b)));b=BABYLON.Vector3.Cross(BABYLON.Axis.Y,k);k=Math.acos(BABYLON.Vector3.Dot(k,BABYLON.Axis.Y)/k.length());a.scale=new BABYLON.Vector3(Math.pow(g,h+1),Math.pow(g,h+1),Math.pow(g,h+1));a.quaternion=BABYLON.Quaternion.RotationAxis(b,k);a.position=c};d.addShape(e.tree,Math.pow(l,h+1),{positionFunction:c});d.addShape(e.tree,x,{positionFunction:p});d=d.buildMesh();d.material=w;n.addShape(b,Math.pow(l,h+1),{positionFunction:c});n.addShape(b,x,{positionFunction:p});w=n.buildMesh();b.dispose();w.material=a;a=BABYLON.MeshBuilder.CreateBox("",{},m);a.isVisible=!1;e.tree.parent=a;d.parent=a;return w.parent=a};

WTWJS.prototype.addMoldTree = function(moldname, molddef, lenx, leny, lenz, posx, posy, posz, subdivisions) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,leny,lenz);
		molddef.covering = "hidden";
		mold.material = WTW.addCovering("hidden", moldname, molddef, lenx, leny, lenz, "0", "0");
		mold.material.alpha = 0;
		
		var treebase = BABYLON.MeshBuilder.CreateBox(moldname + "-treebase", {}, scene);
		treebase.scaling = new BABYLON.Vector3(lenx + .2,6,lenz + .2);
		treebase.position.y = 3;
		molddef.covering = "hidden";
		treebase.material = WTW.addCovering("hidden", moldname, molddef, lenx, leny, lenz, "0", "0");
		treebase.parent = mold;
		
		/* leaf material */
		var green = new BABYLON.StandardMaterial("green", scene);
		green.diffuseColor = new BABYLON.Color3(.1,.6,0);	
		
		/* trunk and branch material */
		var bark = new BABYLON.StandardMaterial("bark", scene);
		bark.emissiveTexture = new BABYLON.Texture("/content/system/images/barktexture.jpg", scene);
		bark.diffuseTexture = new BABYLON.Texture("/content/system/images/barktexture.jpg", scene);
		bark.diffuseTexture.uScale = 2.0;//Repeat 5 times on the Vertical Axes
		bark.diffuseTexture.vScale = 2.0;//Repeat 5 times on the Horizontal Axes		
					
		/* Tree parameters */
		var trunk_height = 20;
		var trunk_taper = 0.6;
		var trunk_slices = 5;
		var boughs = 2; /* 1 or 2 */
		var forks = 4;
		var fork_angle = Math.PI/4;
		var fork_ratio = 2/(1+Math.sqrt(5));
		var branch_angle = Math.PI/3;
		var bow_freq = 2;
		var bow_height = 3.5;
		var branches = 10;
		var leaves_on_branch = 5;
		var leaf_wh_ratio = 0.5;
					
		var tree = createTree(trunk_height, trunk_taper, trunk_slices, bark, boughs, forks, fork_angle, fork_ratio, branches, branch_angle, bow_freq, bow_height, leaves_on_branch, leaf_wh_ratio, green, scene);		
		tree.name = moldname + "-tree";
		tree.parent = mold;
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldTree=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldFlag = function(moldname, molddef, lenx, leny, lenz, posx, posy, posz, subdivisions) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,leny,lenz);
		molddef.covering = "hidden";
		mold.material = WTW.addCovering("hidden", moldname, molddef, lenx, leny, lenz, "0", "0");	
		molddef.covering = "texture";
		mold.material.alpha = 0;
		var lenx = 10;
		
		var distanceBetweenPoints = lenx / subdivisions;	
		
		var covering = new BABYLON.StandardMaterial(moldname + "-mat", scene);
		covering.diffuseTexture = WTW.addCoveringTexture(moldname, molddef, lenx, leny, lenz, '0', '0');
		/* covering.zOffset = -20; */
		covering.backFaceCulling = false;
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
		function loadcoveringtexture(moldname, covering, imageid, uscale, vscale, uoffset, voffset, mold) {
			var imageinfo = WTW.getUploadFileData(imageid);
			var imageextension = imageinfo.extension;
			covering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(imageinfo.filedata, "mattexture" + moldname + "-raised", scene);
			covering.diffuseTexture.uScale = uscale;
			covering.diffuseTexture.vScale = vscale;
			covering.diffuseTexture.uOffset = uoffset;
			covering.diffuseTexture.vOffset = voffset;
			covering.specularColor = new BABYLON.Color3(.4, .4, .4);
			covering.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);	
			/* Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene */
			var flagcloth = BABYLON.Mesh.CreateGround(moldname + "-flagcloth", lenx, leny, subdivisions - 1, scene, true);
				
			flagcloth.material = covering;
			flagcloth.parent = mold;
			/* flagcloth.rotate.z = 45 * Math.PI / 180; */

			var positions = flagcloth.getVerticesData(BABYLON.VertexBuffer.PositionKind);
			var spheres = [];
			for (var i = 0; i < positions.length; i = i + 3) {
				var v = BABYLON.Vector3.FromArray(positions, i);
				
				var s = BABYLON.MeshBuilder.CreateSphere("s" + i, { diameter: 0.1 }, scene);
				s.position.copyFrom(v);
				spheres.push(s);
			}
			
			/* create the impostors */
			spheres.forEach(function (point, idx) {
				var mass = idx < subdivisions ? 0 : 1;
				point.physicsImpostor = new BABYLON.PhysicsImpostor(point, BABYLON.PhysicsImpostor.ParticleImpostor, { mass: mass }, scene);
				if (idx >= subdivisions) {
					WTW.createJoint(point.physicsImpostor, spheres[idx - subdivisions].physicsImpostor, distanceBetweenPoints);
					if (idx % subdivisions) {
						WTW.createJoint(point.physicsImpostor, spheres[idx - 1].physicsImpostor, distanceBetweenPoints);
					}
				}
			});
			
			flagcloth.registerBeforeRender(function () {
				var positions = [];
				spheres.forEach(function (s) {
					positions.push(s.position.x, s.position.y, s.position.z);

				});
				flagcloth.updateVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
				flagcloth.refreshBoundingInfo();
			});		
		}
		if (WTW.isUploadReady(imageid)) {
			loadcoveringtexture(moldname, covering, imageid, uscale, vscale, uoffset, voffset, mold);
		} else {
			WTW.getJSON("/connect/upload.php?uploadid=" + imageid, 
				function(response) {
					WTW.loadUpload(JSON.parse(response), imageid, 0);
					loadcoveringtexture(moldname, covering, imageid, uscale, vscale, uoffset, voffset, mold);
				}
			);
		}		
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldFlag=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.addMoldRoundedBox = function(moldname, lenx, leny, lenz) {
	var mold;
	try {
		mold = new BABYLON.Mesh(moldname, scene);
		var positions = [0.4,-0.4,0.5,-0.4,0.4,0.5,0.4,0.4,0.5,0.4,-0.5,-0.4,-0.4,-0.5,0.4,0.4,-0.5,0.4,-0.5,-0.4,-0.4,-0.5,0.4,0.4,-0.5,-0.4,0.4,-0.4,0.5,0.4,0.4,0.5,-0.4,0.4,0.5,0.4,0.4,0.4,-0.5,-0.4,-0.4,-0.5,0.4,-0.4,-0.5,0.4924,-0.4383,0.4,0.4924,-0.4,0.4383,0.5,-0.4,0.4,0.4707,-0.4707,0.4,0.4832,-0.4392,0.4392,0.4707,-0.4,0.4707,0.4577,-0.4577,0.4577,0.4656,-0.4372,0.4656,0.4,-0.4924,0.4383,0.4383,-0.4924,0.4,0.4,-0.4707,0.4707,0.4392,-0.4832,0.4392,0.4707,-0.4707,0.4,0.4656,-0.4656,0.4372,0.4383,-0.4,0.4924,0.4,-0.4383,0.4924,0.4707,-0.4,0.4707,0.4392,-0.4392,0.4832,0.4,-0.4707,0.4707,0.4577,-0.4577,0.4577,0.4372,-0.4656,0.4656,0.4924,-0.4,-0.4383,0.4924,-0.4383,-0.4,0.5,-0.4,-0.4,0.4707,-0.4,-0.4707,0.4832,-0.4392,-0.4392,0.4707,-0.4707,-0.4,0.4577,-0.4577,-0.4577,0.4656,-0.4656,-0.4372,0.4,-0.4383,-0.4924,0.4383,-0.4,-0.4924,0.4,-0.4707,-0.4707,0.4392,-0.4392,-0.4832,0.4707,-0.4,-0.4707,0.4577,-0.4577,-0.4577,0.4656,-0.4372,-0.4656,0.4383,-0.4924,-0.4,0.4,-0.4924,-0.4383,0.4707,-0.4707,-0.4,0.4392,-0.4832,-0.4392,0.4,-0.4707,-0.4707,0.4577,-0.4577,-0.4577,0.4372,-0.4656,-0.4656,-0.4383,-0.4,-0.4924,-0.4,-0.4383,-0.4924,-0.4707,-0.4,-0.4707,-0.4392,-0.4392,-0.4832,-0.4,-0.4707,-0.4707,-0.4577,-0.4577,-0.4577,-0.4372,-0.4656,-0.4656,-0.4924,-0.4383,-0.4,-0.4924,-0.4,-0.4383,-0.4707,-0.4707,-0.4,-0.4832,-0.4392,-0.4392,-0.4707,-0.4,-0.4707,-0.4577,-0.4577,-0.4577,-0.4656,-0.4372,-0.4656,-0.4,-0.4924,-0.4383,-0.4383,-0.4924,-0.4,-0.4,-0.5,-0.4,-0.4,-0.4707,-0.4707,-0.4392,-0.4832,-0.4392,-0.4707,-0.4707,-0.4,-0.4577,-0.4577,-0.4577,-0.4656,-0.4656,-0.4372,-0.4,-0.4383,0.4924,-0.4383,-0.4,0.4924,-0.4,-0.4,0.5,-0.4,-0.4707,0.4707,-0.4392,-0.4392,0.4832,-0.4707,-0.4,0.4707,-0.4577,-0.4577,0.4577,-0.4656,-0.4372,0.4656,-0.4383,-0.4924,0.4,-0.4,-0.4924,0.4383,-0.4707,-0.4707,0.4,-0.4392,-0.4832,0.4392,-0.4,-0.4707,0.4707,-0.4577,-0.4577,0.4577,-0.4372,-0.4656,0.4656,-0.4924,-0.4,0.4383,-0.4924,-0.4383,0.4,-0.4707,-0.4,0.4707,-0.4832,-0.4392,0.4392,-0.4707,-0.4707,0.4,-0.4577,-0.4577,0.4577,-0.4656,-0.4656,0.4372,0.4,0.4383,0.4924,0.4383,0.4,0.4924,0.4,0.4707,0.4707,0.4392,0.4392,0.4832,0.4707,0.4,0.4707,0.4577,0.4577,0.4577,0.4656,0.4372,0.4656,0.4383,0.4924,0.4,0.4,0.4924,0.4383,0.4707,0.4707,0.4,0.4392,0.4832,0.4392,0.4,0.4707,0.4707,0.4372,0.4656,0.4656,0.4924,0.4,0.4383,0.4924,0.4383,0.4,0.5,0.4,0.4,0.4707,0.4,0.4707,0.4832,0.4392,0.4392,0.4707,0.4707,0.4,0.4577,0.4577,0.4577,0.4656,0.4656,0.4372,0.4383,0.4,-0.4924,0.4,0.4383,-0.4924,0.4707,0.4,-0.4707,0.4392,0.4392,-0.4832,0.4,0.4707,-0.4707,0.4577,0.4577,-0.4577,0.4372,0.4656,-0.4656,0.4924,0.4383,-0.4,0.4924,0.4,-0.4383,0.5,0.4,-0.4,0.4707,0.4707,-0.4,0.4832,0.4392,-0.4392,0.4707,0.4,-0.4707,0.4577,0.4577,-0.4577,0.4656,0.4372,-0.4656,0.4,0.4924,-0.4383,0.4383,0.4924,-0.4,0.4,0.4707,-0.4707,0.4392,0.4832,-0.4392,0.4707,0.4707,-0.4,0.4577,0.4577,-0.4577,0.4656,0.4656,-0.4372,-0.4924,0.4,-0.4383,-0.4924,0.4383,-0.4,-0.5,0.4,-0.4,-0.4707,0.4,-0.4707,-0.4832,0.4392,-0.4392,-0.4707,0.4707,-0.4,-0.4577,0.4577,-0.4577,-0.4656,0.4656,-0.4372,-0.4,0.4383,-0.4924,-0.4383,0.4,-0.4924,-0.4,0.4,-0.5,-0.4,0.4707,-0.4707,-0.4392,0.4392,-0.4832,-0.4707,0.4,-0.4707,-0.4577,0.4577,-0.4577,-0.4656,0.4372,-0.4656,-0.4383,0.4924,-0.4,-0.4,0.4924,-0.4383,-0.4,0.5,-0.4,-0.4707,0.4707,-0.4,-0.4392,0.4832,-0.4392,-0.4,0.4707,-0.4707,-0.4577,0.4577,-0.4577,-0.4372,0.4656,-0.4656,-0.4924,0.4383,0.4,-0.4924,0.4,0.4383,-0.4707,0.4707,0.4,-0.4832,0.4392,0.4392,-0.4707,0.4,0.4707,-0.4577,0.4577,0.4577,-0.4656,0.4372,0.4656,-0.4,0.4924,0.4383,-0.4383,0.4924,0.4,-0.4,0.4707,0.4707,-0.4392,0.4832,0.4392,-0.4707,0.4707,0.4,-0.4577,0.4577,0.4577,-0.4656,0.4656,0.4372,-0.4383,0.4,0.4924,-0.4,0.4383,0.4924,-0.4707,0.4,0.4707,-0.4392,0.4392,0.4832,-0.4,0.4707,0.4707,-0.4577,0.4577,0.4577,-0.4372,0.4656,0.4656,0.4707,-0.4707,-0.4,0.4707,-0.4707,0.4,0.4,-0.4707,0.4707,0.4707,-0.4,0.4707,0.4707,0.4,0.4707,-0.4,-0.4707,-0.4707,0.4,-0.4707,-0.4707,0.4707,-0.4,-0.4707,-0.4707,-0.4707,-0.4,-0.4707,-0.4,-0.4707,-0.4707,-0.4,0.4707,-0.4707,0.4,0.4707,0.4707,0.4707,0.4,0.4,0.4707,0.4707,0.4,0.4707,-0.4707,-0.4707,0.4707,-0.4,0.4656,-0.4656,0.4372,0.4656,-0.4656,0.4372,0.4372,-0.4656,0.4656,0.4707,-0.4707,0.4,0.4372,-0.4656,0.4656,0.4707,-0.4,0.4707,0.4656,-0.4372,0.4656,0.4,-0.4707,0.4707,0.4656,-0.4372,0.4656,0.4577,-0.4577,0.4577,0.4656,-0.4372,-0.4656,0.4656,-0.4372,-0.4656,0.4372,-0.4656,-0.4656,0.4707,-0.4,-0.4707,0.4372,-0.4656,-0.4656,0.4577,-0.4577,-0.4577,0.4707,-0.4707,-0.4,0.4656,-0.4656,-0.4372,0.4,-0.4707,-0.4707,0.4656,-0.4656,-0.4372,0.4577,-0.4577,-0.4577,-0.4656,-0.4372,-0.4656,-0.4656,-0.4372,-0.4656,-0.4656,-0.4656,-0.4372,-0.4707,-0.4,-0.4707,-0.4656,-0.4656,-0.4372,-0.4577,-0.4577,-0.4577,-0.4,-0.4707,-0.4707,-0.4372,-0.4656,-0.4656,-0.4707,-0.4707,-0.4,-0.4372,-0.4656,-0.4656,-0.4577,-0.4577,-0.4577,-0.4372,-0.4656,0.4656,-0.4372,-0.4656,0.4656,-0.4656,-0.4656,0.4372,-0.4,-0.4707,0.4707,-0.4656,-0.4656,0.4372,-0.4577,-0.4577,0.4577,-0.4707,-0.4,0.4707,-0.4656,-0.4372,0.4656,-0.4707,-0.4707,0.4,-0.4656,-0.4372,0.4656,-0.4577,-0.4577,0.4577,0.4372,0.4656,0.4656,0.4372,0.4656,0.4656,0.4656,0.4656,0.4372,0.4,0.4707,0.4707,0.4656,0.4656,0.4372,0.4707,0.4,0.4707,0.4656,0.4372,0.4656,0.4707,0.4707,0.4,0.4656,0.4372,0.4656,0.4577,0.4577,0.4577,0.4656,0.4372,-0.4656,0.4656,0.4372,-0.4656,0.4656,0.4656,-0.4372,0.4707,0.4,-0.4707,0.4656,0.4656,-0.4372,0.4577,0.4577,-0.4577,0.4,0.4707,-0.4707,0.4372,0.4656,-0.4656,0.4707,0.4707,-0.4,0.4372,0.4656,-0.4656,0.4577,0.4577,-0.4577,-0.4656,0.4372,-0.4656,-0.4656,0.4372,-0.4656,-0.4372,0.4656,-0.4656,-0.4707,0.4,-0.4707,-0.4372,0.4656,-0.4656,-0.4577,0.4577,-0.4577,-0.4707,0.4707,-0.4,-0.4656,0.4656,-0.4372,-0.4,0.4707,-0.4707,-0.4656,0.4656,-0.4372,-0.4577,0.4577,-0.4577,-0.4656,0.4656,0.4372,-0.4656,0.4656,0.4372,-0.4372,0.4656,0.4656,-0.4707,0.4707,0.4,-0.4372,0.4656,0.4656,-0.4577,0.4577,0.4577,-0.4707,0.4,0.4707,-0.4656,0.4372,0.4656,-0.4,0.4707,0.4707,-0.4656,0.4372,0.4656,-0.4577,0.4577,0.4577,0.4707,-0.4707,-0.4,-0.4,-0.4707,0.4707,0.4707,-0.4,0.4707,0.4707,0.4,0.4707,-0.4,-0.4707,-0.4707,0.4707,0.4,-0.4707,-0.4707,-0.4707,0.4,-0.4707,0.4,-0.4707,-0.4707,-0.4,0.4707,-0.4707,0.4,0.4707,0.4707,0.4707,-0.4,-0.4,0.4707,0.4707,-0.4,0.4707,-0.4707,0.4,0.4707,-0.4707,-0.4707,0.4707,0.4,-0.4707,0.4707,-0.4];
		var indices = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,15,19,20,16,19,21,22,23,24,5,25,26,23,26,27,24,26,21,28,29,30,0,31,32,29,32,33,30,32,34,35,36,37,38,39,40,36,40,41,37,40,42,43,44,45,14,46,47,44,47,48,45,47,49,50,51,52,3,53,54,51,54,55,52,54,56,57,58,59,13,60,61,58,61,62,59,61,63,64,65,66,6,67,68,65,68,69,66,68,70,71,72,73,74,75,76,72,76,77,73,76,78,79,80,81,82,83,84,80,84,85,81,84,86,87,88,89,4,90,91,88,91,92,89,91,93,94,95,96,8,97,98,95,98,99,96,98,100,101,102,103,2,104,105,102,105,106,103,105,107,108,109,110,11,111,112,109,112,113,110,112,107,114,115,116,117,118,119,115,119,120,116,119,121,122,123,124,12,125,126,123,126,127,124,126,128,129,130,131,132,133,134,130,134,135,131,134,136,137,138,139,10,140,141,138,141,142,139,141,143,144,145,146,147,148,149,145,149,150,146,149,151,152,153,154,155,156,157,153,157,158,154,157,159,160,161,162,163,164,165,161,165,166,162,165,167,168,169,170,7,171,172,169,172,173,170,172,174,175,176,177,9,178,179,176,179,180,177,179,181,182,183,184,1,185,186,183,186,187,184,186,188,189,38,15,17,37,18,15,190,24,191,51,5,24,4,23,5,89,25,23,83,30,192,80,0,30,2,29,0,103,193,29,194,16,20,115,17,16,13,44,14,59,46,44,195,52,196,72,3,52,132,36,38,131,39,36,125,45,197,123,14,45,8,65,6,96,67,65,90,73,198,88,74,73,155,58,13,154,60,58,148,66,199,145,6,66,7,95,8,170,200,95,201,81,85,183,82,81,11,139,109,139,111,109,133,116,202,130,117,116,1,102,2,184,104,102,178,110,203,176,11,110,163,138,10,162,204,138,156,124,127,153,12,124,9,161,163,177,205,161,171,146,150,169,147,146,117,38,17,0,82,1,3,74,4,6,147,7,9,163,10,12,155,13,15,19,16,18,206,19,19,22,20,19,207,21,23,26,24,25,208,26,26,28,209,26,210,21,29,32,30,211,212,32,32,35,213,32,214,215,36,40,37,39,216,40,40,43,41,40,217,42,44,47,45,46,218,47,47,50,219,47,220,221,51,54,52,222,223,54,54,57,224,54,225,226,58,61,59,60,227,61,61,64,62,61,228,63,65,68,66,67,229,68,68,71,230,68,231,232,72,76,73,233,234,76,76,79,235,76,236,237,80,84,81,83,238,84,84,87,85,84,239,86,88,91,89,90,240,91,91,94,241,91,242,243,95,98,96,244,245,98,98,101,246,98,247,248,102,105,103,104,249,105,105,108,106,105,250,107,109,112,110,111,251,112,112,114,252,112,253,107,115,119,116,254,255,119,119,122,256,119,257,258,123,126,124,125,259,126,126,129,127,126,260,128,130,134,131,133,261,134,134,137,262,134,263,264,138,141,139,265,266,141,141,144,267,141,268,269,145,149,146,148,270,149,149,152,150,149,271,151,153,157,154,156,272,157,157,160,273,157,274,275,161,165,162,276,277,165,165,168,278,165,279,280,169,172,170,171,281,172,172,175,173,172,282,174,176,179,177,178,283,179,179,182,284,179,285,286,183,186,184,287,288,186,186,189,289,186,290,291,38,37,15,37,41,18,292,51,24,51,3,5,4,89,23,89,293,25,83,80,30,80,82,0,2,103,29,103,106,294,295,115,16,115,117,17,13,59,44,59,62,46,296,72,52,72,74,3,132,131,36,131,297,39,125,123,45,123,12,14,8,96,65,96,298,67,90,88,73,88,4,74,155,154,58,154,299,60,148,145,66,145,147,6,7,170,95,170,173,300,301,183,81,183,1,82,11,10,139,139,302,111,133,130,116,130,132,117,1,184,102,184,303,104,178,176,110,176,9,11,163,162,138,162,304,305,156,153,124,153,155,12,9,177,161,177,306,307,171,169,146,169,7,147,117,132,38];    
		var normals = [0.097,-0.097,0.991,-0.097,0.097,0.991,0.097,0.097,0.991,0.097,-0.991,-0.097,-0.097,-0.991,0.097,0.097,-0.991,0.097,-0.991,-0.097,-0.097,-0.991,0.097,0.097,-0.991,-0.097,0.097,-0.097,0.991,0.097,0.097,0.991,-0.097,0.097,0.991,0.097,0.097,0.097,-0.991,-0.097,-0.097,-0.991,0.097,-0.097,-0.991,0.921,-0.378,0.097,0.921,-0.097,0.378,0.991,-0.097,0.097,0.704,-0.704,0.092,0.852,-0.37,0.37,0.704,-0.092,0.704,0.577,-0.577,0.577,0.668,-0.327,0.668,0.097,-0.921,0.378,0.378,-0.921,0.097,0.092,-0.704,0.704,0.37,-0.852,0.37,0.704,-0.704,0.092,0.668,-0.668,0.327,0.378,-0.097,0.921,0.097,-0.378,0.921,0.704,-0.092,0.704,0.37,-0.37,0.852,0.092,-0.704,0.704,0.577,-0.577,0.577,0.327,-0.668,0.668,0.921,-0.097,-0.378,0.921,-0.378,-0.097,0.991,-0.097,-0.097,0.704,-0.092,-0.704,0.852,-0.37,-0.37,0.704,-0.704,-0.092,0.577,-0.577,-0.577,0.668,-0.668,-0.327,0.097,-0.378,-0.921,0.378,-0.097,-0.921,0.092,-0.704,-0.704,0.37,-0.37,-0.852,0.704,-0.092,-0.704,0.577,-0.577,-0.577,0.668,-0.327,-0.668,0.378,-0.921,-0.097,0.097,-0.921,-0.378,0.704,-0.704,-0.092,0.37,-0.852,-0.37,0.092,-0.704,-0.704,0.577,-0.577,-0.577,0.327,-0.668,-0.668,-0.378,-0.097,-0.921,-0.097,-0.378,-0.921,-0.704,-0.092,-0.704,-0.37,-0.37,-0.852,-0.092,-0.704,-0.704,-0.577,-0.577,-0.577,-0.327,-0.668,-0.668,-0.921,-0.378,-0.097,-0.921,-0.097,-0.378,-0.704,-0.704,-0.092,-0.852,-0.37,-0.37,-0.704,-0.092,-0.704,-0.577,-0.577,-0.577,-0.668,-0.327,-0.668,-0.097,-0.921,-0.378,-0.378,-0.921,-0.097,-0.097,-0.991,-0.097,-0.092,-0.704,-0.704,-0.37,-0.852,-0.37,-0.704,-0.704,-0.092,-0.577,-0.577,-0.577,-0.668,-0.668,-0.327,-0.097,-0.378,0.921,-0.378,-0.097,0.921,-0.097,-0.097,0.991,-0.092,-0.704,0.704,-0.37,-0.37,0.852,-0.704,-0.092,0.704,-0.577,-0.577,0.577,-0.668,-0.327,0.668,-0.378,-0.921,0.097,-0.097,-0.921,0.378,-0.704,-0.704,0.092,-0.37,-0.852,0.37,-0.092,-0.704,0.704,-0.577,-0.577,0.577,-0.327,-0.668,0.668,-0.921,-0.097,0.378,-0.921,-0.378,0.097,-0.704,-0.092,0.704,-0.852,-0.37,0.37,-0.704,-0.704,0.092,-0.577,-0.577,0.577,-0.668,-0.668,0.327,0.097,0.378,0.921,0.378,0.097,0.921,0.092,0.704,0.704,0.37,0.37,0.852,0.704,0.092,0.704,0.577,0.577,0.577,0.668,0.327,0.668,0.378,0.921,0.097,0.097,0.921,0.378,0.704,0.704,0.092,0.37,0.852,0.37,0.092,0.704,0.704,0.327,0.668,0.668,0.921,0.097,0.378,0.921,0.378,0.097,0.991,0.097,0.097,0.704,0.092,0.704,0.852,0.37,0.37,0.704,0.704,0.092,0.577,0.577,0.577,0.668,0.668,0.327,0.378,0.097,-0.921,0.097,0.378,-0.921,0.704,0.092,-0.704,0.37,0.37,-0.852,0.092,0.704,-0.704,0.577,0.577,-0.577,0.327,0.668,-0.668,0.921,0.378,-0.097,0.921,0.097,-0.378,0.991,0.097,-0.097,0.704,0.704,-0.092,0.852,0.37,-0.37,0.704,0.092,-0.704,0.577,0.577,-0.577,0.668,0.327,-0.668,0.097,0.921,-0.378,0.378,0.921,-0.097,0.092,0.704,-0.704,0.37,0.852,-0.37,0.704,0.704,-0.092,0.577,0.577,-0.577,0.668,0.668,-0.327,-0.921,0.097,-0.378,-0.921,0.378,-0.097,-0.991,0.097,-0.097,-0.704,0.092,-0.704,-0.852,0.37,-0.37,-0.704,0.704,-0.092,-0.577,0.577,-0.577,-0.668,0.668,-0.327,-0.097,0.378,-0.921,-0.378,0.097,-0.921,-0.097,0.097,-0.991,-0.092,0.704,-0.704,-0.37,0.37,-0.852,-0.704,0.092,-0.704,-0.577,0.577,-0.577,-0.668,0.327,-0.668,-0.378,0.921,-0.097,-0.097,0.921,-0.378,-0.097,0.991,-0.097,-0.704,0.704,-0.092,-0.37,0.852,-0.37,-0.092,0.704,-0.704,-0.577,0.577,-0.577,-0.327,0.668,-0.668,-0.921,0.378,0.097,-0.921,0.097,0.378,-0.704,0.704,0.092,-0.852,0.37,0.37,-0.704,0.092,0.704,-0.577,0.577,0.577,-0.668,0.327,0.668,-0.097,0.921,0.378,-0.378,0.921,0.097,-0.092,0.704,0.704,-0.37,0.852,0.37,-0.704,0.704,0.092,-0.577,0.577,0.577,-0.668,0.668,0.327,-0.378,0.097,0.921,-0.097,0.378,0.921,-0.704,0.092,0.704,-0.37,0.37,0.852,-0.092,0.704,0.704,-0.577,0.577,0.577,-0.327,0.668,0.668,0.704,-0.704,-0.092,0.704,-0.704,0.092,0.092,-0.704,0.704,0.704,-0.092,0.704,0.704,0.092,0.704,-0.092,-0.704,-0.704,0.092,-0.704,-0.704,0.704,-0.092,-0.704,-0.704,-0.704,-0.092,-0.704,-0.092,-0.704,-0.704,-0.092,0.704,-0.704,0.092,0.704,0.704,0.704,0.092,0.092,0.704,0.704,0.092,0.704,-0.704,-0.704,0.704,-0.092,0.668,-0.668,0.327,0.668,-0.668,0.327,0.327,-0.668,0.668,0.704,-0.704,0.092,0.327,-0.668,0.668,0.704,-0.092,0.704,0.668,-0.327,0.668,0.092,-0.704,0.704,0.668,-0.327,0.668,0.577,-0.577,0.577,0.668,-0.327,-0.668,0.668,-0.327,-0.668,0.327,-0.668,-0.668,0.704,-0.092,-0.704,0.327,-0.668,-0.668,0.577,-0.577,-0.577,0.704,-0.704,-0.092,0.668,-0.668,-0.327,0.092,-0.704,-0.704,0.668,-0.668,-0.327,0.577,-0.577,-0.577,-0.668,-0.327,-0.668,-0.668,-0.327,-0.668,-0.668,-0.668,-0.327,-0.704,-0.092,-0.704,-0.668,-0.668,-0.327,-0.577,-0.577,-0.577,-0.092,-0.704,-0.704,-0.327,-0.668,-0.668,-0.704,-0.704,-0.092,-0.327,-0.668,-0.668,-0.577,-0.577,-0.577,-0.327,-0.668,0.668,-0.327,-0.668,0.668,-0.668,-0.668,0.327,-0.092,-0.704,0.704,-0.668,-0.668,0.327,-0.577,-0.577,0.577,-0.704,-0.092,0.704,-0.668,-0.327,0.668,-0.704,-0.704,0.092,-0.668,-0.327,0.668,-0.577,-0.577,0.577,0.327,0.668,0.668,0.327,0.668,0.668,0.668,0.668,0.327,0.092,0.704,0.704,0.668,0.668,0.327,0.704,0.092,0.704,0.668,0.327,0.668,0.704,0.704,0.092,0.668,0.327,0.668,0.577,0.577,0.577,0.668,0.327,-0.668,0.668,0.327,-0.668,0.668,0.668,-0.327,0.704,0.092,-0.704,0.668,0.668,-0.327,0.577,0.577,-0.577,0.092,0.704,-0.704,0.327,0.668,-0.668,0.704,0.704,-0.092,0.327,0.668,-0.668,0.577,0.577,-0.577,-0.668,0.327,-0.668,-0.668,0.327,-0.668,-0.327,0.668,-0.668,-0.704,0.092,-0.704,-0.327,0.668,-0.668,-0.577,0.577,-0.577,-0.704,0.704,-0.092,-0.668,0.668,-0.327,-0.092,0.704,-0.704,-0.668,0.668,-0.327,-0.577,0.577,-0.577,-0.668,0.668,0.327,-0.668,0.668,0.327,-0.327,0.668,0.668,-0.704,0.704,0.092,-0.327,0.668,0.668,-0.577,0.577,0.577,-0.704,0.092,0.704,-0.668,0.327,0.668,-0.092,0.704,0.704,-0.668,0.327,0.668,-0.577,0.577,0.577,0.704,-0.704,-0.092,-0.092,-0.704,0.704,0.704,-0.092,0.704,0.704,0.092,0.704,-0.092,-0.704,-0.704,0.704,0.092,-0.704,-0.704,-0.704,0.092,-0.704,0.092,-0.704,-0.704,-0.092,0.704,-0.704,0.092,0.704,0.704,0.704,-0.092,-0.092,0.704,0.704,-0.092,0.704,-0.704,0.092,0.704,-0.704,-0.704,0.704,0.092,-0.704,0.704,-0.092];
		var uvs = [0.9,0.1,0.1,0.9,0.1,0.1,0.9,0.1,0.1,0.9,0.1,0.1,0.1,0.1,0.9,0.9,0.1,0.9,0.9,0.1,0.1,0.9,0.1,0.1,0.9,0.1,0.1,0.9,0.1,0.1,0.062,0.1,0.1,0.062,0.1,0.1,0,0.1,0.061,0.061,0.1,0,0,0.042,0.063,0,0.062,0.1,0.1,0.062,0,0.1,0.061,0.061,0.1,0,0.063,0,0.9,0.062,0.938,0.1,0.9,0,0.939,0.061,1,0.1,0.958,0,1,0.063,0.1,0.938,0.062,0.9,0.1,0.9,0.1,1,0.061,0.939,0,0.9,0.042,1,0,0.937,0.062,0.1,0.1,0.062,0,0.1,0.061,0.061,0.1,0,0,0.042,0.063,0,0.9,0.062,0.938,0.1,0.9,0,0.939,0.061,1,0.1,0.958,0,1,0.063,0.1,0.938,0.062,0.9,0.1,1,0.061,0.939,0,0.9,0.042,1,0,0.937,0.062,0.1,0.1,0.062,0,0.1,0.061,0.061,0.1,0,0,0.042,0.063,0,0.938,0.9,0.9,0.938,0.9,0.9,1,0.9,0.939,0.939,0.9,1,1,0.958,0.937,1,0.938,0.9,0.9,0.938,0.9,0.9,1,0.9,0.939,0.939,0.9,1,1,0.958,0.937,1,0.1,0.938,0.062,0.9,0.1,1,0.061,0.939,0,0.9,0.042,1,0,0.937,0.1,0.938,0.062,0.9,0.1,1,0.061,0.939,0,0.9,0.042,1,0,0.937,0.062,0.1,0.1,0.062,0,0.1,0.061,0.061,0.1,0,0,0.042,0.063,0,0.062,0.1,0.1,0.062,0,0.1,0.061,0.061,0.1,0,0.063,0,0.9,0.062,0.938,0.1,0.9,0.1,0.9,0,0.939,0.061,1,0.1,0.958,0,1,0.063,0.9,0.062,0.938,0.1,0.9,0,0.939,0.061,1,0.1,0.958,0,1,0.063,0.938,0.9,0.9,0.938,0.9,0.9,1,0.9,0.939,0.939,0.9,1,1,0.958,0.937,1,0.1,0.938,0.062,0.9,0.1,1,0.061,0.939,0,0.9,0.042,1,0,0.937,0.9,0.062,0.938,0.1,0.9,0.1,0.9,0,0.939,0.061,1,0.1,0.958,0,1,0.063,0.938,0.9,0.9,0.938,0.9,0.9,1,0.9,0.939,0.939,0.9,1,1,0.958,0.937,1,0.938,0.9,0.9,0.938,0.9,0.9,1,0.9,0.939,0.939,0.9,1,1,0.958,0.937,1,0.938,0.9,0.9,0.938,1,0.9,0.939,0.939,0.9,1,1,0.958,0.937,1,0.9,0.062,0.938,0.1,0.9,0,0.939,0.061,1,0.1,0.958,0,1,0.063,0.1,0.938,0.062,0.9,0.1,1,0.061,0.939,0,0.9,0.042,1,0,0.937,0.9,0,0.1,0,1,0.1,0.9,0,0.9,0,1,0.9,1,0.1,0.1,0,0.9,1,0.1,0,0.1,1,0.1,1,1,0.1,0.1,0,0.1,1,1,0.9,0,0.063,0,0.063,0,0.063,0.1,0,0,0.063,0.9,0,0.937,0,1,0.1,0.937,0,0.958,0,0.063,1,0.063,1,0,0.063,0.1,0,0,0.063,0,0.042,0.9,0,0.937,0,1,0.1,0.937,0,0.958,0,0.063,1,0.063,1,0,0.063,0.1,0,0,0.063,0,0.042,1,0.9,1,0.937,0.9,1,1,0.937,1,0.958,1,0.937,1,0.937,0.063,1,0,0.9,0.063,1,0.042,1,0.1,1,0.063,1,0,0.9,0.063,1,0.042,1,0,0.063,0,0.063,0,0.063,0.1,0,0,0.063,0.9,0,0.937,0,1,0.1,0.937,0,0.958,0,0.937,0,0.937,0,1,0.937,0.9,1,1,0.937,1,0.958,0.1,1,0.063,1,0,0.9,0.063,1,0.042,1,0.937,0,0.937,0,1,0.937,0.9,1,1,0.937,1,0.958,1,0.9,1,0.937,0.9,1,1,0.937,1,0.958,1,0.937,1,0.937,0.937,0,1,0.1,0.937,0,0.958,0,0.1,1,0.063,1,0,0.9,0.063,1,0.042,1,0.9,0,0,0.9,0.9,0,0.9,0,1,0.9,0.9,1,0,0.9,0.9,1,0.1,1,0.1,1,0,0.9,0,0.9,0.9,1,0.1,1,1,0.1,1,0.9];

		BABYLON.VertexData.ComputeNormals(positions, indices, normals);
		var vertexData = new BABYLON.VertexData();
		vertexData.positions = positions;
		vertexData.indices = indices;
		vertexData.normals = normals;
		vertexData.uvs = uvs;
		vertexData.applyToMesh(mold, true); 
		mold.scaling = new BABYLON.Vector3(lenx, leny, lenz);
	} catch (ex) {
		WTW.log("core-scripts-molds-basicmolds\r\n addMoldRoundedBox=" + ex.message);
	}
	return mold;
}

/* check for new mesh types, need to add molds for lathe, ribbon, etc */

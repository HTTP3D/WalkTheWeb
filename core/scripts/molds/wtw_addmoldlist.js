WTWJS.prototype.getMoldList = function() {
	WTW.moldList = [];
	try {
		WTW.moldList[WTW.moldList.length] = "Wall";
		WTW.moldList[WTW.moldList.length] = "Floor";
		WTW.moldList[WTW.moldList.length] = "Box";
		WTW.moldList[WTW.moldList.length] = "Rounded Box";
		WTW.moldList[WTW.moldList.length] = "Cylinder";
		WTW.moldList[WTW.moldList.length] = "Half Pipe";
		WTW.moldList[WTW.moldList.length] = "Cone";
		WTW.moldList[WTW.moldList.length] = "Sphere";
		WTW.moldList[WTW.moldList.length] = "Dome";
		WTW.moldList[WTW.moldList.length] = "Triangle";
		WTW.moldList[WTW.moldList.length] = "Torus";
		WTW.moldList[WTW.moldList.length] = "Polygon";
		WTW.moldList[WTW.moldList.length] = "Plane";
		WTW.moldList[WTW.moldList.length] = "Disc";
		WTW.moldList[WTW.moldList.length] = "Tube";
		WTW.moldList[WTW.moldList.length] = "Line";
		dGet("wtw_moldsbuttonlist").innerHTML = "";
		for (var i=0;i < WTW.moldList.length;i++) {
			if (WTW.moldList[i] != null) {
				var moldvalue = WTW.moldList[i].toLowerCase();
				while (moldvalue.indexOf(" ") > -1) {
					moldvalue = moldvalue.replace(" ","");
				}
				var option = document.createElement("option");
				option.text = WTW.moldList[i];
				option.value = moldvalue;
				if (buildingid != "") {
					dGet("wtw_moldsbuttonlist").innerHTML += "<div id=\"wtw_baddbuild" + moldvalue + "\" name=\"wtw_baddbuild" + moldvalue + "\" onclick=\"WTW.openAddNewMold('building','" + moldvalue + "');\" class='wtw-menulevel2'>" + WTW.moldList[i] + "</div>\r\n";
				} else if (communityid != "") {
					dGet("wtw_moldsbuttonlist").innerHTML += "<div id=\"wtw_baddcomm" + moldvalue + "\" name=\"wtw_baddcomm" + moldvalue + "\" onclick=\"WTW.openAddNewMold('community','" + moldvalue + "');\" class='wtw-menulevel2'>" + WTW.moldList[i] + "</div>\r\n";
				} else if (thingid != "") {
					dGet("wtw_moldsbuttonlist").innerHTML += "<div id=\"wtw_baddthing" + moldvalue + "\" name=\"wtw_baddthing" + moldvalue + "\" onclick=\"WTW.openAddNewMold('thing','" + moldvalue + "');\" class='wtw-menulevel2'>" + WTW.moldList[i] + "</div>\r\n";
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-molds-addmoldlist\r\n getMoldList=" + ex.message);
	} 
	return WTW.moldList;
}

WTWJS.prototype.getWebMoldList = function() {
	var webmoldlist = [];
	try {
		webmoldlist[webmoldlist.length] = "3D Text";
		webmoldlist[webmoldlist.length] = "Image";
        webmoldlist[webmoldlist.length] = "Video";
        webmoldlist[webmoldlist.length] = "Lightbulb";
        webmoldlist[webmoldlist.length] = "Candle Flame";
        webmoldlist[webmoldlist.length] = "Tree";
        webmoldlist[webmoldlist.length] = "Flag";
        webmoldlist[webmoldlist.length] = "Partical Sphere";
        webmoldlist[webmoldlist.length] = "Partical Shower";
        webmoldlist[webmoldlist.length] = "Smoke";
		webmoldlist[webmoldlist.length] = "Babylon File";
        webmoldlist[webmoldlist.length] = "Water Plane";
        webmoldlist[webmoldlist.length] = "Water Disc";
		webmoldlist[webmoldlist.length] = "View Blog";
		webmoldlist[webmoldlist.length] = "Blog Posting";
		if (buildingid != "") {
			webmoldlist[webmoldlist.length] = "Store Product";
			webmoldlist[webmoldlist.length] = "Store Sign";
			webmoldlist[webmoldlist.length] = "Store 3D Sign";
			webmoldlist[webmoldlist.length] = "Store View Cart";
			webmoldlist[webmoldlist.length] = "Store Categories";
			webmoldlist[webmoldlist.length] = "Store Search";
		}
		dGet("wtw_webmoldsbuttonlist").innerHTML = "";
		for (var i=0;i < webmoldlist.length;i++) {
			if (webmoldlist[i] != null) {
				var moldvalue = webmoldlist[i].toLowerCase();
				while (moldvalue.indexOf(" ") > -1) {
					moldvalue = moldvalue.replace(" ","");
				}
				if (buildingid != "") {
					dGet("wtw_webmoldsbuttonlist").innerHTML += "<div id=\"wtw_baddweb" + moldvalue + "\" name=\"wtw_baddweb" + moldvalue + "\" onclick=\"WTW.openAddNewMold('building','" + moldvalue + "');\" class='wtw-menulevel2'>" + webmoldlist[i] + "</div>\r\n";
				} else if (communityid != "") {
					dGet("wtw_webmoldsbuttonlist").innerHTML += "<div id=\"wtw_baddcommweb" + moldvalue + "\" name=\"wtw_baddcommweb" + moldvalue + "\" onclick=\"WTW.openAddNewMold('community','" + moldvalue + "');\" class='wtw-menulevel2'>" + webmoldlist[i] + "</div>\r\n";
				} else if (thingid != "") {
					dGet("wtw_webmoldsbuttonlist").innerHTML += "<div id=\"wtw_baddthingweb" + moldvalue + "\" name=\"wtw_baddthingweb" + moldvalue + "\" onclick=\"WTW.openAddNewMold('thing','" + moldvalue + "');\" class='wtw-menulevel2'>" + webmoldlist[i] + "</div>\r\n";
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-molds-addmoldlist\r\n getWebMoldList=" + ex.message);
	} 
	return webmoldlist;
}
		
WTWJS.prototype.addMold = function(moldname, molddef, parentname, coveringname) {
	var mold;
	try {
		var checkcollisions = "1";
		try {
			if (molddef.checkcollisions != null) {
				checkcollisions = molddef.checkcollisions;
			}
		} catch(ex) {}
		mold = scene.getMeshByID(moldname);
		if (mold != null) {
			WTW.disposeClean(moldname);
		}
		var shape = "box"; 
		if (molddef.shape != undefined && molddef.shape != "") {
			shape = molddef.shape.toLowerCase();
		}
		if (moldname.indexOf("communitybuildings") > -1 || moldname.indexOf("communitycommunities") > -1 || (moldname.indexOf("person-") > -1 && shape=="box") || (moldname.indexOf("myavatar-") > -1 && shape=="box")) {
			coveringname = "hidden";
		}
		var iswaterreflection = "0";
		try {
			if (molddef.graphics.waterreflection != null) {
				iswaterreflection = molddef.graphics.waterreflection;
			}
		} catch(ex) {}
		var namepart = moldname.split('-');
		var posx = Number(molddef.position.x);
		var posy = Number(molddef.position.y);
		var posz = Number(molddef.position.z);
		var lenx = Number(molddef.scaling.x);
		var leny = Number(molddef.scaling.y);
		var lenz = Number(molddef.scaling.z);
		var rotx = Number(molddef.rotation.x);
		var roty = Number(molddef.rotation.y);
		var rotz = Number(molddef.rotation.z);
		var subdivisions = 12;
		var special1 = 0;
		var special2 = 0;
		var minheight = 0;
		var maxheight = 0;
		var path1 = [];
		var path2 = [];
		if (molddef.paths != undefined) {
			path1 = molddef.paths.path1;
		}
		if (molddef.paths != undefined) {
			path2 = molddef.paths.path2;
		}
		try {
			if (WTW.isNumeric(molddef.subdivisions)) {
				subdivisions = Number(molddef.subdivisions);
			}
		} catch(ex) {}
		try {
			if (WTW.isNumeric(molddef.scaling.special1)) {
				special1 = Number(molddef.scaling.special1)
			}
		} catch(ex) {}
		try {
			if (WTW.isNumeric(molddef.scaling.special2)) {
				special2 = Number(molddef.scaling.special2)
			}
		} catch(ex) {}
		try {
			if (WTW.isNumeric(molddef.graphics.heightmap.minheight)) {
				minheight = Number(molddef.graphics.heightmap.minheight);
			}
		} catch(ex) {}
		try {
			if (WTW.isNumeric(molddef.graphics.heightmap.maxheight)) {
				maxheight = Number(molddef.graphics.heightmap.maxheight);
			}
		} catch(ex) {}
		var transformposition = WTW.transformPosition(molddef, posx, posy, posz); // accounts for alternate parenting
		posx = transformposition.posx;
		posy = transformposition.posy;
		posz = transformposition.posz;
		switch (shape) {
			case "wall":
				mold = WTW.addMoldBox(moldname, lenx, leny, lenz);
				break;
			case "box":
				mold = WTW.addMoldBox(moldname, lenx, leny, lenz);
				break;
			case "roundedbox":
				mold = WTW.addMoldRoundedBox(moldname, lenx, leny, lenz);
				break;
			case "floor":
				mold = WTW.addMoldBox(moldname, lenx, leny, lenz);
				break;
			case "cylinder":
				mold = WTW.addMoldCylinder(moldname, lenx, leny, lenz, subdivisions);
				break;
			case "halfpipe":
				if (special1 < .01) {
					special1 = .01;
				}
				mold = WTW.addMoldHalfPipe(moldname, lenx, leny, lenz, subdivisions, special1);
				break;
			case "cone":
				mold = WTW.addMoldCone(moldname, lenx, leny, lenz, subdivisions, special1, special2);
				break;
			case "polygon":
				mold = WTW.addMoldPolygon(moldname, lenx, leny, lenz, special1);
				break; 
			case "sphere":
				mold = WTW.addMoldSphere(moldname, lenx, leny, lenz, subdivisions);
				break;
			case "dome":
				mold = WTW.addMoldDome(moldname, lenx, leny, lenz, subdivisions, special1);
				break;
			case "triangle":
				mold = WTW.addMoldTriangle(moldname, lenx, leny, lenz, special1);
				break;
			case "torus":
				mold = WTW.addMoldTorus(moldname, lenx, leny, lenz, subdivisions, special1);
				break;
			case "plane":
				mold = WTW.addMoldPlane(moldname, lenx, leny, lenz);
				break;
			case "disc":
				mold = WTW.addMoldDisc(moldname, lenx, leny, lenz, subdivisions);
				break;
			case "tube":
				mold = WTW.addMoldTube(moldname, lenx, leny, lenz, subdivisions, special1, path1);
				break;
			case "line":
				mold = WTW.addMoldLine(moldname, lenx, leny, lenz, path1);
				break;
			case "terrain":
				mold = WTW.addMoldTerrain(moldname, lenx, leny, lenz, subdivisions, molddef.graphics.heightmap.path, molddef.graphics.heightmap.id, minheight, maxheight, parentname, molddef, coveringname, posx, posy, posz);
				break;
			case "3dtext":
				mold = WTW.addMold3DText(moldname, molddef, lenx, leny, lenz);
				coveringname = "none";
				break;
			case "image":
				mold = WTW.addMoldImage(moldname, molddef, lenx, leny, lenz);
				coveringname = "none";
				break;
			case "raisedimage":
				mold = WTW.addMoldRaisedImage(moldname, molddef, lenx, leny, lenz, subdivisions, molddef.graphics.heightmap.path, minheight, maxheight);
				coveringname = "none";
				break;
            case "video":
				mold = WTW.addMoldVideo(moldname, molddef, lenx, leny, lenz);
				coveringname = "none";
				break;
            case "lightbulb":
				mold = WTW.addMoldLightbulb(moldname, molddef, lenx, leny, lenz, posx, posy, posz, subdivisions);
				break;
            case "candleflame":
				mold = WTW.addMoldCandleFlame(moldname, molddef, lenx, leny, lenz);
				coveringname = "none";
				break;
            case "tree":
				mold = WTW.addMoldTree(moldname, molddef, lenx, leny, lenz, posx, posy, posz, subdivisions);
				coveringname = "none";
				break;
            case "flag":
				mold = WTW.addMoldFlag(moldname, molddef, lenx, leny, lenz, posx, posy, posz, subdivisions);
				coveringname = "none";
				break;
            case "smoke":
				mold = WTW.addMoldSmoke(moldname, molddef, lenx, leny, lenz);
				coveringname = "none";
				break;
            case "particlesphere":
				mold = WTW.addMoldParticleSphere(moldname, molddef, lenx, leny, lenz);
				coveringname = "none";
				break;
            case "particleshower":
				mold = WTW.addMoldParticleShower(moldname, molddef, lenx, leny, lenz);
				coveringname = "none";
				break;
			case "babylonfile":
				mold = WTW.addMoldBabylonFile(moldname, molddef, lenx, leny, lenz);
				coveringname = "none";
				break;
            case "waterplane":
				mold = WTW.addMoldWaterPlane(moldname, molddef, lenx, leny, lenz);
				coveringname = "water";
				break;
            case "waterdisc":
				mold = WTW.addMoldWaterDisc(moldname, molddef, lenx, leny, lenz, subdivisions);
				coveringname = "water";
				break;
			case "simpletextbox":
				mold = WTW.addMoldSimpleTextBox(moldname, molddef, lenx, leny, lenz);
				coveringname = "none";
				break;
			case "viewblog":
				mold = WTW.addMoldViewBlog(moldname, molddef, lenx, leny, lenz);
				coveringname = "none";
				break;
			case "blogposting":
				mold = WTW.addMoldBlogPosting(moldname, molddef, lenx, leny, lenz);
				coveringname = "none";
				break;
			case "storeproduct":
				mold = WTW.addMoldStoreProduct(moldname, molddef, lenx, leny, lenz);
				coveringname = "none";
				break;
			case "storesign":
				mold = WTW.addMoldStoreSign(moldname, molddef, lenx, leny, lenz);
				coveringname = "none";
				break;
			case "store3dsign":
				mold = WTW.addMoldStore3DSign(moldname, molddef, lenx, leny, lenz);
				coveringname = "none";
				break;
			case "storeviewcart":
				mold = WTW.addMoldStoreViewCart(moldname, molddef, lenx, leny, lenz);
				coveringname = "none";
				break;
			case "storecategories":
				mold = WTW.addMoldStoreCategories(moldname, molddef, lenx, leny, lenz);
				coveringname = "none";
				break;
			case "storesearch":
				mold = WTW.addMoldStoreSearch(moldname, molddef, lenx, leny, lenz);
				coveringname = "none";
				break;
			default:
				mold = WTW.addMoldBox(moldname, lenx, leny, lenz);
				break;
		}
		mold = WTW.completeMold(mold, moldname, parentname, molddef, coveringname, posx, posy, posz);
		//mold = WTW.addPhysics(mold, molddef);
	} catch (ex) {
		WTW.log("core-scripts-molds-addmoldlist\r\n addMold=" + ex.message);
	} 
	return mold;
}

WTWJS.prototype.addPhysics = function(mold, molddef) {
	try {
/*		All matrices are rebuilt (if needed) on every frame. If you want to force a complete update of a specific mesh, you can just do:
		scene.incrementRenderId();
		object.computeWorldMatrix(true);
		incrementRenderId just simulates a new frame to invalidate all caches
		http://www.html5gamedevs.com/topic/21494-keep-childs-world-position-when-parenting/
	*/
		var moldname = mold.name;
		var parentname = "";
		var namepart = moldname.split('-');
		var parentnamepart = null;
		if (mold.parent != null) {
			parentname = mold.parent.name;
			parentnamepart = mold.parent.name.split('-');
		} else {
			var pname = "-----";
			parentnamepart = pname.split('-');
		}
		if (namepart[0] == "actionzone" && namepart[5] == "driverseat" && thingid == "") {
			mold.parent.parent = null;
/*			if (mold.parent.physicsImpostor == null) {
WTW.log("DRIVERSEATparent=" + mold.parent.name,'red');
				mold.parent.physicsImpostor = new BABYLON.PhysicsImpostor(mold.parent, BABYLON.PhysicsImpostor.BoxImpostor, {  
					mass: 80,
					friction: 0.5,
					restitution: 0.5,
					nativeOptions: {
						noSleep: true,
						move: true
					}
				});
			}*/
		} else if (parentnamepart[0] == "actionzoneaxlebase2" && parentnamepart[5] == "driverwheel" && thingid == "") {
			var parentmold = scene.getMeshByID(molddef.parentname);
			var connectingmold = parentmold;
			var parentactionzone = scene.getMeshByID(molddef.parentname.replace("actionzoneaxlebase2","actionzone"));
			parentactionzone.computeWorldMatrix(true);
			var parentazabspos = parentactionzone.getAbsolutePosition();
			//var parentabspos = parentmold.getAbsolutePosition();
			
			
			
			try {
				while (connectingmold.name.indexOf("connectinggrids") == -1) {
					connectingmold = connectingmold.parent;
				}
			} catch(ex){}
			if (mold.parent != null) {
				WTW.detachParent(mold,mold.parent);
			}
			if (mold.physicsImpostor == null) {
				mold.physicsImpostor = new BABYLON.PhysicsImpostor(mold, BABYLON.PhysicsImpostor.SphereImpostor, {
					mass: 1,
					friction: 4,
					restitution: 0.5,
					nativeOptions: {
						move: true
					}
				});
				var holderSize = 3;
				var holder1 = BABYLON.MeshBuilder.CreateBox(moldname.replace("thingmolds","actionzoneholder"), {
					height: holderSize, width: holderSize/3, depth: holderSize/3
				}, scene);
				//holder1.position.x = parentactionzone.position.x;
				//holder1.position.y = parentactionzone.position.y;
				//holder1.position.z = parentactionzone.position.z;
				holder1.position = parentazabspos;
				holder1.physicsImpostor = new BABYLON.PhysicsImpostor(holder1, BABYLON.PhysicsImpostor.SphereImpostor, {
					mass: 8,
					friction: 4,
					restitution: 0.5
				});
				holder1.physicsImpostor.physicsBody.collidesWith = ~1;
				
				var sJoint1 = new BABYLON.MotorEnabledJoint(BABYLON.PhysicsJoint.SliderJoint, {
					mainPivot: parentazabspos,
					mainAxis: new BABYLON.Vector3(0, -1, 0),
					connectedAxis: new BABYLON.Vector3(0, -1, 0),
					nativeParams: {
						limit: [0, 0],
						spring: [100, 2],
						min: 5,
						max: 30
					}
				});
				if (parentmold != null) {
					if (parentmold.physicsImpostor == null) {
						parentmold.physicsImpostor = new BABYLON.PhysicsImpostor(parentmold, BABYLON.PhysicsImpostor.BoxImpostor, {  
							mass: 20,
							friction: 0.5,
							restitution: 0.5,
							nativeOptions: {
								noSleep: true,
								move: true
							}
						});
					}
					parentmold.physicsImpostor.addJoint(holder1.physicsImpostor, sJoint1);
					parentmold.isVisible = true;
/*					var joint1 = new BABYLON.HingeJoint({
						mainPivot: new BABYLON.Vector3(parentmold.position.x, parentmold.position.y - 2, parentmold.position.z),
						connectedPivot: new BABYLON.Vector3(5, 0, 0),
						mainAxis: new BABYLON.Vector3(-1, 0, 0),
						connectedAxis: new BABYLON.Vector3(-1, 0, 0),
						nativeParams: {
							limit: [0, 0]
						}
					});
					holder1.physicsImpostor.addJoint(mold.physicsImpostor, joint1);*/
				}
			}
		}		

	} catch (ex) {
		WTW.log("core-scripts-molds-addmoldlist\r\n addPhysics=" + ex.message);
	} 
	return mold;
}

WTWJS.prototype.attachParent = function(child, parent) {
	var rotation = BABYLON.Quaternion.Identity();
	var position = BABYLON.Vector3.Zero();
	var m1 = BABYLON.Matrix.Identity();
	var m2 = BABYLON.Matrix.Identity();
	parent.getWorldMatrix().decompose(BABYLON.Vector3.Zero(), rotation, position);
	rotation.toRotationMatrix(m1);
	m2.setTranslation(position);
	m2.multiplyToRef(m1, m1);
	var invParentMatrix = BABYLON.Matrix.Invert(m1);
	var m = child.getWorldMatrix().multiply(invParentMatrix);
	m.decompose(BABYLON.Vector3.Zero(), child.rotationQuaternion, position);
	invParentMatrix = BABYLON.Matrix.Invert(parent.getWorldMatrix());
	var m = child.getWorldMatrix().multiply(invParentMatrix);
	m.decompose(BABYLON.Vector3.Zero(), BABYLON.Quaternion.Identity(), position);
	child.position.x = position.x * parent.scaling.x;
	child.position.y = position.y * parent.scaling.y;
	child.position.z = position.z * parent.scaling.z;
	if (parent.scaling.x != 1 || parent.scaling.y != 1 || parent.scaling.z != 1) {
		var children = parent.getChildren();
		var scaleFixMesh;
		for (var i = 0; i < children.length; i++) {
			if (children[i].name == 'scaleFixMesh') {
				scaleFixMesh = children[i];
				break;
			}
		}
		if (scaleFixMesh == undefined) {
			scaleFixMesh = new BABYLON.Mesh('scaleFixMesh', parent.getScene());
			scaleFixMesh.parent = parent;
		}
		scaleFixMesh.scaling.x = 1 / parent.scaling.x;
		scaleFixMesh.scaling.y = 1 / parent.scaling.y;
		scaleFixMesh.scaling.z = 1 / parent.scaling.z;
		child.parent = scaleFixMesh;
	} else {
		child.parent = parent;
	}
}

WTWJS.prototype.detachParent = function(object, parent) {
/*  //var parentMatrix = Matrix.Invert(parent.getWorldMatrix());  
  var newMatrix = object.getWorldMatrix(); //.multiply(parentMatrix);
  object.parent = null;
  object.getAbsolutePosition()
  newMatrix.decompose(object.scaling, object.rotationQuaternion, object.position);
 */ 
	object.computeWorldMatrix(true);
	var abspos = object.getAbsolutePosition();
	object.parent = null;
	object.setAbsolutePosition(abspos);
}



WTWJS.prototype.isDrivable = function(connectinggridmold) {
	var drivable = false;
	try {
		var parts = connectinggridmold.getChildren();
		if (parts != null) {
			for (var i=0; i < parts.length;i++) {
				if (parts[i].name.indexOf("driverseat") == -1) {
					drivable = true;
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-molds-addmoldlist\r\n isDrivable=" + ex.message);
	} 
	return drivable;
}

WTWJS.prototype.completeMold = function(mold, moldname, parentname, molddef, coveringname, posx, posy, posz) {
	try {
		if (mold != null) {
			var checkcollisions = "1";
			var shape = "box"; 
			var iswaterreflection = "0";
			var namepart = moldname.split('-');
			var lenx = Number(molddef.scaling.x);
			var leny = Number(molddef.scaling.y);
			var lenz = Number(molddef.scaling.z);
			var rotx = Number(molddef.rotation.x);
			var roty = Number(molddef.rotation.y);
			var rotz = Number(molddef.rotation.z);
			var special1 = 0;
			var special2 = 0;
			var parentvalid = false;
			try {
				if (molddef.checkcollisions != null) {
					checkcollisions = molddef.checkcollisions;
				}
			} catch(ex) {}
			if (molddef.shape != undefined && molddef.shape != "") {
				shape = molddef.shape.toLowerCase();
			}
			if (moldname.indexOf("communitybuildings") > -1 || moldname.indexOf("communitycommunities") > -1 || (moldname.indexOf("person-") > -1 && shape=="box") || (moldname.indexOf("myavatar-") > -1 && shape=="box")) {
				coveringname = "hidden";
			} else if (shape == "image" && shape == "video" && shape == "candleflame" && shape == "smoke" && shape == "babylonfile" && shape == "3dtext" && shape == "store3dsign" && shape == "particlesphere" && shape == "particleshower") {
				coveringname = "none";
			}
			try {
				if (molddef.graphics.waterreflection != null) {
					iswaterreflection = molddef.graphics.waterreflection;
				}
			} catch(ex) {}
			try {
				if (WTW.isNumeric(molddef.scaling.special1)) {
					special1 = Number(molddef.scaling.special1)
				}
			} catch(ex) {}
			try {
				if (WTW.isNumeric(molddef.scaling.special2)) {
					special2 = Number(molddef.scaling.special2)
				}
			} catch(ex) {}
			//mold.isVisible = false;
			mold.position = new BABYLON.Vector3(posx, posy, posz);
			mold.rotation = new BABYLON.Vector3(WTW.getRadians(rotx), WTW.getRadians(roty), WTW.getRadians(rotz));
			mold.isPickable = true;
			if (parentname != "") {
				var parentmold = scene.getMeshByID(parentname);
				if (parentmold != null) {
					mold.parent = parentmold;
					parentvalid = true;
				}
			}
			if (molddef.sound != undefined) {
				if (molddef.sound.id != '') {
					WTW.loadSoundToMold(mold, moldname, molddef.sound.id, molddef.sound.path, molddef.sound.loop, molddef.sound.attenuation, molddef.sound.maxdistance, molddef.sound.rollofffactor, molddef.sound.refdistance, -1);
				}
			}
/*			var csgmoldid = "";
			var csgaction = "";
			if (molddef.csg != undefined) {
				if (molddef.csg.moldid != undefined) {
					csgmoldid = molddef.csg.moldid;
				}
				if (molddef.csg.action != undefined) {
					csgaction = molddef.csg.action;
				}
			}
			if (csgmoldid != '' && csgaction == "subtract") {
				coveringname == "texture";
			} */
			if (coveringname == "hidden" || namepart[0] == "actionzone" || namepart[0] == "connectinggrid") {
				mold.isVisible = false;
			} else {
				if (shape != "box" && shape != "wall" && shape != "floor" && coveringname == "directional texture") {
					coveringname = "texture";
				}
				if (coveringname != "none") {
					if (coveringname == "directional texture") {
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
					} else {
						try {
							if (mold.material != undefined) {
								if (mold.material.diffuseTexture != null) {
									mold.material.diffuseTexture.dispose();
									mold.material.diffuseTexture = null;
								}
							}
						} catch (ex) {}
						try {
							if (mold.material != null) {
								mold.material.dispose();
								mold.material = null;
							}
						} catch (ex) {}
					}
					mold.material = WTW.addCovering(coveringname, moldname, molddef, lenx, leny, lenz, special1, special2);
				}
			}
			if (moldname.indexOf("terrain") > -1 || iswaterreflection == "1") {
				WTW.addReflectionRefraction(mold);
			}
			if (checkcollisions == "0" || coveringname == "none") {
				molddef.checkcollisions = "0";
				mold.checkCollisions = false;
			} else {
				if (WTW.init.wallCollisions == 0 && shape != "floor" && WTW.adminView == 1) {
					mold.checkCollisions = false;
				} else if (WTW.init.floorCollisions == 0 && shape == "floor" && WTW.adminView == 1) {
					mold.checkCollisions = false;
				} else {
					mold.checkCollisions = true; 
				}
			}
			if (parentvalid == false) {
				WTW.addDisposeMoldToQueue(moldname);
			}
			if (WTW.AdminView == 0 && parentname.indexOf("connectinggrids") > -1 && (moldname.indexOf("building") > -1 || moldname.indexOf("community") > -1)) {
				mold.freezeWorldMatrix();
			} else {
				//mold.unfreezeWorldMatrix();
			}
			
			/*
			 * Possible values : 
			 * - BABYLON.AbstractMesh.CULLINGSTRATEGY_STANDARD  
			 * - BABYLON.AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY  
			 * - BABYLON.AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION  
			 * - BABYLON.AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION_THEN_BSPHERE_ONLY  
			 mesh.cullingStrategy = oneOfThePossibleValues;			
			 */
			
			//if (shape == "box" && coveringname == "texture") {
			//	mold.convertToUnIndexedMesh();
			//}
		}	
	} catch (ex) {
		WTW.log("core-scripts-molds-addmoldlist\r\n completeMold=" + ex.message);
	} 
	return mold;
}

WTWJS.prototype.setNewMoldDefaults = function(shape) {
	try {
		var coords = WTW.getNewCoordinates(50);
		var positionX = coords.positionX;
		var positionY = coords.positionY;
		var positionZ = coords.positionZ;
		var rotationY = coords.rotationY;
		var shapevalue = shape.toLowerCase();
		var imageid = "ij7fi8qv7dbgb6zc";
		var imagepath = "/content/system/stock/stucco-512x512.jpg";
		var heightmapid = "dxmbplwoocpg5df3";
		var heightmappath = "/content/system/stock/heightmap-1500x1500.jpg";
		while (shapevalue.indexOf(" ") > -1) {
			shapevalue = shapevalue.replace(" ","");
		}
		if (thingid != '') {
			positionX = 0;
			positionZ = 0;
		}
		dGet('wtw_tmoldspecial1').value = "0.00";
		dGet('wtw_moldaddimagepreview').src = "";
		dGet('wtw_moldaddimagehoverpreview').src = "";
		dGet("wtw_tmoldaddonclick").selectedIndex = 0;
		dGet('wtw_tmoldimagejsfunction').value = "";
		dGet('wtw_tmoldimagejsparameters').value = "";
		dGet('wtw_tmoldalttag').value = "";
		dGet('wtw_tmoldwebtext').value = "";
		dGet('wtw_tmoldwebstyle').value = "";
		dGet('wtw_tmoldmaxheight').value = "0.00";
		dGet('wtw_tmolduploadobjectid').value = "";
		dGet('wtw_tmoldobjectfolder').value = "";
		dGet('wtw_tmoldobjectfile').value = "";
		dGet('wtw_tmoldcoveringold').value = "color";
		dGet('wtw_tmoldgraphiclevel').checked = false;
		dGet('wtw_tmoldreceiveshadows').checked = false;
		dGet('wtw_tmoldtextureid').value = "";
		dGet('wtw_tmoldtexturepath').value = "";
		dGet('wtw_tmoldtexturebumpid').value = "";
		dGet('wtw_tmoldtexturebumppath').value = "";
		dGet('wtw_tmoldheightmapid').value = "";
		dGet('wtw_tmoldheightmappath').value = "";
		dGet('wtw_tmoldmixmapid').value = "";
		dGet('wtw_tmoldmixmappath').value = "";
		dGet('wtw_tmoldtexturerid').value = "";
		dGet('wtw_tmoldtexturerpath').value = "";
		dGet('wtw_tmoldtexturegid').value = "";
		dGet('wtw_tmoldtexturegpath').value = "";
		dGet('wtw_tmoldtexturebid').value = "";
		dGet('wtw_tmoldtexturebpath').value = "";
		dGet('wtw_tmoldtexturebumprid').value = "";
		dGet('wtw_tmoldtexturebumprpath').value = "";
		dGet('wtw_tmoldtexturebumpgid').value = "";
		dGet('wtw_tmoldtexturebumpgpath').value = "";
		dGet('wtw_tmoldtexturebumpbid').value = "";		
		dGet('wtw_tmoldtexturebumpbpath').value = "";		
		dGet('wtw_tmoldvideoid').value = "";
		dGet('wtw_tmoldvideopath').value = "";
		dGet('wtw_tmoldvideoposterid').value = "";
		dGet('wtw_tmoldvideoposterpath').value = "";
		dGet('wtw_tmoldsoundid').value = "";
		dGet('wtw_tmoldsoundpath').value = "";
		dGet('wtw_tmoldsoundname').value = "";
		dGet('wtw_soundicon').alt = "";
		dGet('wtw_soundicon').title = "";
		dGet('wtw_selectedsound').innerHTML = "";
		WTW.setDDLValue('wtw_tmoldsoundattenuation', "none");
		WTW.setSoundFields();
		dGet('wtw_tmoldsoundloop').checked = true;
		dGet('wtw_tmoldsoundmaxdistance').value = "100.00";
		dGet('wtw_tmoldsoundrollofffactor').value = "1.00";
		dGet('wtw_tmoldsoundrefdistance').value = "1.00";
		dGet('wtw_tmoldsoundconeinnerangle').value = "90.00";
		dGet('wtw_tmoldsoundconeouterangle').value = "180.00";
		dGet('wtw_tmoldsoundconeoutergain').value = "0.50";		
		dGet('wtw_tmoldopacity').value = "100.00";
		dGet('wtw_tmoldwebtext').value = "";
		dGet('wtw_tmoldwebtextheight').value = "6.00";
		dGet('wtw_tmoldwebtextthick').value = "1.00";
		WTW.setDDLValue('wtw_tmoldwebtextalign', "center");
		dGet('wtw_tmoldwebtextcolor').value = "";
		dGet('wtw_tmoldwebtextspecular').value = "";
		dGet('wtw_tmoldwebtextdiffuse').value = "";
		dGet('wtw_tmoldwebtextambient').value = "";
		dGet('wtw_tdiffusecolorr').value = "1.000000000000000000";
		dGet('wtw_tdiffusecolorg').value = "0.999990000000000000";
		dGet('wtw_tdiffusecolorb').value = "0.999990000000000000";
		dGet('wtw_tspecularcolorr').value = "1.000000000000000000";
		dGet('wtw_tspecularcolorg').value = "0.999999723208150600";
		dGet('wtw_tspecularcolorb').value = "0.999990000000000000";
		dGet('wtw_temissivecolorr').value = "0.594280904158206200";
		dGet('wtw_temissivecolorg').value = "0.594274961349164700";
		dGet('wtw_temissivecolorb').value = "0.594274961349164700";
		switch (shapevalue) {
			case "cylinder":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "10.00";
				dGet('wtw_tmoldscalingy').value = "10.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = "0.00";
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "10";
				break;
			case "halfpipe":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "10.00";
				dGet('wtw_tmoldscalingy').value = "10.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "90.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "90.00";
				dGet('wtw_tmoldspecial1').value = "1.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "20";
				break;
			case "cone":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "10.00";
				dGet('wtw_tmoldscalingy').value = "10.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = "0.00";
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "1.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "20";
				break;
			case "polygon":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "10.00";
				dGet('wtw_tmoldscalingy').value = "10.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial1').value = "1";
				dGet('wtw_tmoldspecial2').value = "0";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "20";
				break; 
			case "sphere":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "10.00";
				dGet('wtw_tmoldscalingy').value = "10.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = "0.00";
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "10";
				break;
			case "dome":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "10.00";
				dGet('wtw_tmoldscalingy').value = "10.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial1').value = "1.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "10";
				break;
			case "triangle":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "10.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;
			case "torus":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY - 3;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "10.00";
				dGet('wtw_tmoldscalingy').value = "5.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = "0.00";
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial1').value = "3.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "16";
				break;
			case "plane":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "10.00";
				dGet('wtw_tmoldscalingy').value = "10.00";
				dGet('wtw_tmoldscalingz').value = "0.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY + 90;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "2";
				break;
			case "lightbulb":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "0.80";
				dGet('wtw_tmoldscalingy').value = "1.00";
				dGet('wtw_tmoldscalingz').value = "0.80";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = "0.00";
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "10";
				break;
			case "candleflame":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY-4;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "5.00";
				dGet('wtw_tmoldscalingz').value = ".1";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = "0.00";
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "2";
				dGet('wtw_tmoldcoveringold').value = "none";
				dGet('wtw_tmoldtextureid').value = imageid;
				dGet('wtw_tmoldtexturepath').value = imagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case "tree":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY-4;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "1.00";
				dGet('wtw_tmoldscalingz').value = "1.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = "0.00";
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				dGet('wtw_tmoldcoveringold').value = "none";
				dGet('wtw_tmoldtextureid').value = imageid;
				dGet('wtw_tmoldtexturepath').value = imagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case "flag":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY-4;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "1.00";
				dGet('wtw_tmoldscalingz').value = "1.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = "0.00";
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "10";
				dGet('wtw_tmoldcoveringold').value = "none";
				dGet('wtw_tmoldtextureid').value = imageid;
				dGet('wtw_tmoldtexturepath').value = imagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case "smoke":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY-4;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "1.00";
				dGet('wtw_tmoldscalingz').value = "1.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = "0.00";
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				dGet('wtw_tmoldcoveringold').value = "none";
				dGet('wtw_tmoldtextureid').value = imageid;
				dGet('wtw_tmoldtexturepath').value = imagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case "particlesphere":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY-4;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "2.00";
				dGet('wtw_tmoldscalingy').value = "2.00";
				dGet('wtw_tmoldscalingz').value = "2.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = "0.00";
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				dGet('wtw_tmoldcoveringold').value = "none";
				dGet('wtw_tmoldtextureid').value = imageid;
				dGet('wtw_tmoldtexturepath').value = imagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case "particleshower":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY-4;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "2.00";
				dGet('wtw_tmoldscalingy').value = "6.00";
				dGet('wtw_tmoldscalingz').value = "2.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = "0.00";
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				dGet('wtw_tmoldcoveringold').value = "none";
				dGet('wtw_tmoldtextureid').value = imageid;
				dGet('wtw_tmoldtexturepath').value = imagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case "babylonfile":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY-4;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "1.00";
				dGet('wtw_tmoldscalingz').value = "1.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = "0.00";
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				dGet('wtw_tmoldcoveringold').value = "none";
				dGet('wtw_tmoldtextureid').value = imageid;
				dGet('wtw_tmoldtexturepath').value = imagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case "waterplane":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY-4;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "10.00";
				dGet('wtw_tmoldscalingy').value = ".1";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "2";
				dGet('wtw_tmoldcoveringold').value = "2d texture";
				dGet('wtw_tmoldtextureid').value = imageid;
				dGet('wtw_tmoldtexturepath').value = imagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case "waterdisc":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY-4;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "10.00";
				dGet('wtw_tmoldscalingy').value = ".1";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldopacity').value = "100.00";
				dGet('wtw_tmoldsubdivisions').value = "10";
				dGet('wtw_tmoldcoveringold').value = "2d texture";
				dGet('wtw_tmoldtextureid').value = imageid;
				dGet('wtw_tmoldtexturepath').value = imagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case "disc":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "20.00";
				dGet('wtw_tmoldscalingy').value = "10.00";
				dGet('wtw_tmoldscalingz').value = "0.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY + 90;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "16";
				break;
			case "line":
				dGet('wtw_tmoldpositionx').value = "0.00";
				dGet('wtw_tmoldpositiony').value = "0.00";
				dGet('wtw_tmoldpositionz').value = "0.00";
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "1.00";
				dGet('wtw_tmoldscalingz').value = "1.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = "0.00";
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "2";
				dGet('wtw_tmoldcoveringold').value = "color";
				break;
			case "wall":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "20.00";
				dGet('wtw_tmoldscalingy').value = "20.00";
				dGet('wtw_tmoldscalingz').value = "1.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY + 90;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				dGet('wtw_tmoldcoveringold').value = "texture";
				dGet('wtw_tmoldtextureid').value = imageid;
				dGet('wtw_tmoldtexturepath').value = imagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case "floor":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY - 5;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "20.00";
				dGet('wtw_tmoldscalingy').value = "1.00";
				dGet('wtw_tmoldscalingz').value = "20.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				dGet('wtw_tmoldcoveringold').value = "texture";
				dGet('wtw_tmoldtextureid').value = "4to027vq39087bxr";
				dGet('wtw_tmoldtexturepath').value = "/content/system/stock/cement-512x344.jpg";
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case "box":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "10.00";
				dGet('wtw_tmoldscalingy').value = "10.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;
			case "roundedbox":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "10.00";
				dGet('wtw_tmoldscalingy').value = "10.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;
			case "3dtext":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY-4;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "1.00";
				dGet('wtw_tmoldscalingz').value = "1.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY + 90;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldwebtext').value = "Text";
				dGet('wtw_tmoldwebtextheight').value = "6.00";
				dGet('wtw_tmoldwebtextthick').value = "1.00";
				WTW.setDDLValue('wtw_tmoldwebtextalign', "center");
				dGet('wtw_tmoldwebtextcolor').value = "#ff0000";
				dGet('wtw_tmoldwebtextspecular').value = "#000000";
				dGet('wtw_tmoldwebtextdiffuse').value = "#f0f0f0";
				dGet('wtw_tmoldwebtextambient').value = "#808080";
				dGet('wtw_tmoldsubdivisions').value = "12";
				dGet('wtw_tmoldcoveringold').value = "none";
				dGet('wtw_tmoldtextureid').value = imageid;
				dGet('wtw_tmoldtexturepath').value = imagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case "image":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = ".25";
				dGet('wtw_tmoldscalingy').value = "10.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;
			case "raisedimage":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = ".25";
				dGet('wtw_tmoldscalingy').value = "10.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				dGet('wtw_tmoldmaxheight').value = "2.00";
				break;
			case "video":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = ".25";
				dGet('wtw_tmoldscalingy').value = "10.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY + 180;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				dGet('wtw_tmoldvideoid').value = "50lyz2cjpxhnt5az";
				dGet('wtw_tmoldvideopath').value = "/content/system/images/enterwelcomecenter.mp4";
				dGet('wtw_tmoldvideoposterid').value = "e0u9qw9mbrv0hfls";
				dGet('wtw_tmoldvideoposterpath').value = "/content/system/images/videoposter.jpg";
				WTW.setDDLValue('wtw_tmoldsoundattenuation','linear');
				dGet('wtw_tmoldsoundmaxdistance').value = "100.00";
				dGet('wtw_tmoldsoundloop').checked = false;
				dGet('wtw_tmoldvideomaxdistance').value = "100.00";
				dGet('wtw_tmoldvideoloop').checked = false;
				break;
			case "simpletextbox":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = ".25";
				dGet('wtw_tmoldscalingy').value = "10.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;
			case "viewblog":
				rotationY += 180;
				if (rotationY > 360) {
					rotationY -= 360;
				}
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY - 4;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "15.00";
				dGet('wtw_tmoldscalingz').value = "15.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				dGet('wtw_tmoldcoveringold').value = "texture";
				dGet('wtw_tmoldtextureid').value = imageid;
				dGet('wtw_tmoldtexturepath').value = imagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;			
			case "blogposting":
				rotationY += 180;
				if (rotationY > 360) {
					rotationY -= 360;
				}
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY - 4;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "15.00";
				dGet('wtw_tmoldscalingz').value = "15.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				dGet('wtw_tmoldcoveringold').value = "texture";
				dGet('wtw_tmoldtextureid').value = imageid;
				dGet('wtw_tmoldtexturepath').value = imagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case "sharktank":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY - 5;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "100.00";
				dGet('wtw_tmoldscalingy').value = "50.00";
				dGet('wtw_tmoldscalingz').value = "100.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial1').value = "7";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldopacity').value = "100.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				dGet('wtw_tmoldcoveringold').value = "glass";
				break;
			case "storeproduct":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "3.00";
				dGet('wtw_tmoldscalingy').value = "5.00";
				dGet('wtw_tmoldscalingz').value = "5.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;
			case "storesign":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "3.00";
				dGet('wtw_tmoldscalingy').value = "10.00";
				dGet('wtw_tmoldscalingz').value = "30.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;			
			case "store3dsign":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY-4;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "1.00";
				dGet('wtw_tmoldscalingz').value = "1.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY + 90;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldwebtext').value = "Text";
				dGet('wtw_tmoldwebtextheight').value = "6.00";
				dGet('wtw_tmoldwebtextthick').value = "1.00";
				WTW.setDDLValue('wtw_tmoldwebtextalign', "center");
				dGet('wtw_tmoldwebtextcolor').value = "#ff0000";
				dGet('wtw_tmoldwebtextspecular').value = "#000000";
				dGet('wtw_tmoldwebtextdiffuse').value = "#f0f0f0";
				dGet('wtw_tmoldwebtextambient').value = "#808080";
				dGet('wtw_tmoldsubdivisions').value = "12";
				dGet('wtw_tmoldcoveringold').value = "none";
				dGet('wtw_tmoldtextureid').value = imageid;
				dGet('wtw_tmoldtexturepath').value = imagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case "storeviewcart":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "0.25";
				dGet('wtw_tmoldscalingy').value = "1.00";
				dGet('wtw_tmoldscalingz').value = "5.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;			
			case "storecategories":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "14.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;			
			case "storesearch":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "14.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;			
			case "custom": 
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY - 5;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "1.00";
				dGet('wtw_tmoldscalingz').value = "1.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;	
			case "terrain": 
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = -1;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "1000.00";
				dGet('wtw_tmoldscalingy').value = "1000.00";
				dGet('wtw_tmoldscalingz').value = "1.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "70";
				dGet('wtw_tmoldmaxheight').value = "70.00";
				dGet('wtw_tmoldcoveringold').value = "terrain";
				dGet('wtw_tmoldtextureid').value = imageid;
				dGet('wtw_tmoldtexturepath').value = imagepath;
				dGet('wtw_tmoldheightmapid').value = heightmapid;
				dGet('wtw_tmoldheightmappath').value = heightmappath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				WTW.setPreviewImage('wtw_moldheightmappreview', 'wtw_tmoldheightmappath', 'wtw_tmoldheightmapid');
				break;	
			case "tube":
				dGet('wtw_tmoldpositionx').value = "0.00";
				dGet('wtw_tmoldpositiony').value = "0.00";
				dGet('wtw_tmoldpositionz').value = "0.00";
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "1.00";
				dGet('wtw_tmoldscalingz').value = "1.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = "0.00";
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial1').value = "1.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "8";
				break;				
			default:
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "10.00";
				dGet('wtw_tmoldscalingy').value = "10.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;
		}
		dGet('wtw_tmoldcsgmoldid').value = "";
		WTW.setDDLValue("wtw_tmoldcsgaction", "");
		WTW.setDDLValue("wtw_tmoldspecial1set", Number(dGet('wtw_tmoldspecial1').value));
		dGet('wtw_selectedcsgshape').innerHTML = "";
		dGet('wtw_tmoldactionzoneid').value = "";		
	} catch (ex) {
		WTW.log("core-scripts-molds-addmoldlist\r\n setNewMoldDefaults=" + ex.message);
	} 
}

WTWJS.prototype.setMoldFormFields = function(shape) {
	try {
		var shapevalue = shape.toLowerCase();
		while (shapevalue.indexOf(" ") > -1) {
			shapevalue = shapevalue.replace(" ","");
		}
		dGet('wtw_tmoldshape').value = shape;
		WTW.hide('wtw_moldaddimagediv');
		WTW.hide('wtw_moldscalediv');
		WTW.hide('wtw_moldmergemoldsdiv');
		dGet('wtw_tmoldcsgaction').selectedIndex = 0;
		WTW.show('wtw_moldscalingydiv');
		WTW.show('wtw_moldtexturesetdiv');
		WTW.show('wtw_moldbasictexturesetdiv');
		WTW.show('wtw_moldbasictextureset2div');
		WTW.show('wtw_moldbumptexturetitle');
		WTW.show('wtw_moldbumptextureset2div');
		WTW.show('wtw_alttagdiv');
		WTW.hide('wtw_moldwebtextdiv');
		WTW.hide('wtw_moldaddvideodiv');
		WTW.hide('wtw_terrainheightdiv');
		WTW.hide('wtw_moldheightmapdiv');
		WTW.hide('wtw_pointlistdiv');
		WTW.hide('wtw_pointeditdiv');
		WTW.hide('wtw_objectdiv');
		WTW.hide('wtw_productdiv');
		WTW.hide('wtw_productthingdiv');
		switch (shapevalue) {
			case "tube":
				dGet('wtw_moldpositiontitle').innerHTML = "Tube Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Tube Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Tube Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Tube Texture Image";
				dGet('wtw_moldbumptexturetitle').innerHTML = "Tube Bump Image";
				dGet('wtw_moldspecial1title').innerHTML = "Tube Thickness";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Tube";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Tube";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Tube";
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				WTW.show('wtw_pointlistdiv');
				break;
			case "cylinder":
				dGet('wtw_moldpositiontitle').innerHTML = "Cylinder Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Cylinder Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Cylinder Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Cylinder Texture Image";
				dGet('wtw_moldbumptexturetitle').innerHTML = "Cylinder Bump Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Cylinder";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Cylinder";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Cylinder";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case "halfpipe":
				dGet('wtw_moldpositiontitle').innerHTML = "Pipe Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Pipe Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Pipe Rotation";
				dGet('wtw_moldspecial1title').innerHTML = "Pipe Thickness";
				dGet('wtw_moldtexturetitle').innerHTML = "Pipe Texture Image";
				dGet('wtw_moldbumptexturetitle').innerHTML = "Pipe Bump Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Pipe";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Pipe";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Pipe";
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case "cone":
				dGet('wtw_moldpositiontitle').innerHTML = "Cone Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Cone Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Cone Rotation";
				dGet('wtw_moldspecial1title').innerHTML = "Top Radius";
				dGet('wtw_moldspecial2title').innerHTML = "Bottom Radius";
				dGet('wtw_moldtexturetitle').innerHTML = "Cone Texture Image";
				dGet('wtw_moldbumptexturetitle').innerHTML = "Cone Bump Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Cone";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Cone";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Cone";
				WTW.show('wtw_moldspecial1');
				WTW.show('wtw_moldspecial2');
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case "polygon":
				dGet('wtw_moldpositiontitle').innerHTML = "Polygon Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Polygon Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Polygon Rotation";
				dGet('wtw_moldspecial1title').innerHTML = "Polygon Type (0-14)";
				dGet('wtw_moldtexturetitle').innerHTML = "Polygon Texture Image";
				dGet('wtw_moldbumptexturetitle').innerHTML = "Polygon Bump Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Polygon";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Polygon";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Polygon";
				WTW.show('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break; 
			case "sphere":
				dGet('wtw_moldpositiontitle').innerHTML = "Sphere Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Sphere Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Sphere Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Sphere Texture Image";
				dGet('wtw_moldbumptexturetitle').innerHTML = "Sphere Bump Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Sphere";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Sphere";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Sphere";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case "dome":
				dGet('wtw_moldpositiontitle').innerHTML = "Dome Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Dome Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Dome Rotation";
				dGet('wtw_moldspecial1title').innerHTML = "Dome Thickness";
				dGet('wtw_moldtexturetitle').innerHTML = "Dome Texture Image";
				dGet('wtw_moldbumptexturetitle').innerHTML = "Dome Bump Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Dome";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Dome";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Dome";
				WTW.show('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case "triangle":
				dGet('wtw_moldpositiontitle').innerHTML = "Triangle Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Triangle Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Triangle Rotation";
				dGet('wtw_moldspecial1title').innerHTML = "Triangle Peak Offset";
				dGet('wtw_moldtexturetitle').innerHTML = "Triangle Texture Image";
				dGet('wtw_moldbumptexturetitle').innerHTML = "Triangle Bump Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Triangle";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Triangle";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Triangle";
				WTW.show('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case "torus":
				dGet('wtw_moldpositiontitle').innerHTML = "Torus Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Torus Length";
				dGet('wtw_moldspecial1title').innerHTML = "Hole Size";
				dGet('wtw_moldrotationtitle').innerHTML = "Torus Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Torus Texture Image";
				dGet('wtw_moldbumptexturetitle').innerHTML = "Torus Bump Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Torus";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Torus";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Torus";
				WTW.show('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case "plane":
				dGet('wtw_moldpositiontitle').innerHTML = "Plane Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Plane Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Plane Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Plane Texture Image";
				dGet('wtw_moldbumptexturetitle').innerHTML = "Plane Bump Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Plane";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Plane";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Plane";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case "lightbulb":
				dGet('wtw_moldpositiontitle').innerHTML = "Lightbulb Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Lightbulb Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Lightbulb Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Lightbulb Texture Image";
				dGet('wtw_moldbumptexturetitle').innerHTML = "Lightbulb Bump Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Lightbulb";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Lightbulb";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Lightbulb";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case "candleflame":
				dGet('wtw_moldpositiontitle').innerHTML = "Candle Flame Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Candle Flame Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Candle Flame Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Candle Flame Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Candle Flame";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Candle Flame";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Candle Flame";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				break;
			case "tree":
				dGet('wtw_moldpositiontitle').innerHTML = "Tree Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Tree Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Tree Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Tree Texture Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Tree";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Tree";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Tree";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				break;
			case "flag":
				dGet('wtw_moldpositiontitle').innerHTML = "Flag Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Flag Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Flag Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Flag Texture Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Flag";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Flag";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Flag";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.show('wtw_moldsubdivisions');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.show('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.show('wtw_moldscalediv');
				break;
			case "smoke":
				dGet('wtw_moldpositiontitle').innerHTML = "Smoke Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Smoke Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Smoke Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Smoke Texture Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Smoke";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Smoke";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Smoke";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				break;
			case "particlesphere":
				dGet('wtw_moldpositiontitle').innerHTML = "Sphere Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Sphere Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Sphere Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Sphere Texture Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Sphere";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Sphere";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Sphere";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				break;
			case "particleshower":
				dGet('wtw_moldpositiontitle').innerHTML = "Shower Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Shower Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Shower Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Shower Texture Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Shower";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Shower";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Shower";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				break;
			case "babylonfile":
				dGet('wtw_moldpositiontitle').innerHTML = "3D Object Position";
				dGet('wtw_moldscalingtitle').innerHTML = "3D Object Length";
				dGet('wtw_moldrotationtitle').innerHTML = "3D Object Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "3D Object Texture Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave 3D Object";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete 3D Object";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit 3D Object";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.show('wtw_objectdiv');
				break;
			case "waterplane":
				dGet('wtw_moldpositiontitle').innerHTML = "Water Plane Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Water Plane Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Water Plane Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Water Plane Texture Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Water Plane";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Water Plane";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Water Plane";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				break;
			case "waterdisc":
				dGet('wtw_moldpositiontitle').innerHTML = "Water Disc Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Water Disc Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Water Disc Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Water Disc Texture Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Water Disc";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Water Disc";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Water Disc";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				break;
			case "disc":
				dGet('wtw_moldpositiontitle').innerHTML = "Disc Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Disc Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Disc Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Disc Texture Image";
				dGet('wtw_moldbumptexturetitle').innerHTML = "Disc Bump Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Disc";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Disc";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Disc";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case "line":
				dGet('wtw_moldpositiontitle').innerHTML = "Line Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Line Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Line Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Line Texture Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Line";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Line";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Line";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				break;
			case "wall":
				dGet('wtw_moldpositiontitle').innerHTML = "Wall Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Wall Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Wall Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Wall Texture Image";
				dGet('wtw_moldbumptexturetitle').innerHTML = "Wall Bump Image";
				dGet('wtw_moldspecial1title').innerHTML = "Texture Scale Width";
				dGet('wtw_moldspecial2title').innerHTML = "Texture Scale Height";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Wall";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Wall";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Wall";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case "floor":
				dGet('wtw_moldpositiontitle').innerHTML = "Floor or Ceiling Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Floor or Ceiling Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Floor or Ceiling Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Floor or Ceiling Texture Image";
				dGet('wtw_moldbumptexturetitle').innerHTML = "Floor or Ceiling Bump Image";
				dGet('wtw_moldspecial1title').innerHTML = "Texture Scale Width";
				dGet('wtw_moldspecial2title').innerHTML = "Texture Scale Length";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Floor";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Floor";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Floor or Ceiling (Floor)";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case "box":
				dGet('wtw_moldpositiontitle').innerHTML = "Box Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Box Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Box Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Box Texture Image";
				dGet('wtw_moldbumptexturetitle').innerHTML = "Box Bump Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Box";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Box";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Box";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case "roundedbox":
				dGet('wtw_moldpositiontitle').innerHTML = "Box Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Box Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Box Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Box Texture Image";
				dGet('wtw_moldbumptexturetitle').innerHTML = "Box Bump Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Box";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Box";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Box";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case "3dtext":
				dGet('wtw_moldpositiontitle').innerHTML = "3D Text Position";
				dGet('wtw_moldscalingtitle').innerHTML = "3D Text Length";
				dGet('wtw_moldrotationtitle').innerHTML = "3D Text Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "3D Text Texture Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave 3D Text";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete 3D Text";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit 3D Text";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.show('wtw_moldwebtextdiv');
				break;
			case "image":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Frame Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Image";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Image";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Image";
				WTW.show('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldscalediv');
				break;
			case "video":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Frame Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Video";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Video";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Video";
				WTW.show('wtw_moldaddvideodiv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				break;
			case "raisedimage":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Frame Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Image";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Image";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Image";
				WTW.show('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_terrainheightdiv');
				WTW.show('wtw_moldheightmapdiv');
				break;
			case "simpletextbox":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Frame Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Textbox";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Textbox";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Textbox";
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				break;
			case "viewblog":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Texture Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Blog";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Blog";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Blog";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				break;
			case "blogposting":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Texture Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Blog";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Blog";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Blog";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				break;
			case "sharktank":
				dGet('wtw_moldpositiontitle').innerHTML = "Tank Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Tank Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Tank Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Tank Texture Image";
				dGet('wtw_moldspecial1title').innerHTML = "Number of Sharks";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Tank";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Tank";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Tank";
				WTW.show('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturepreview');
				break;
			case "storeproduct":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Frame Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Product";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Product";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Product";
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_alttagdiv');
				WTW.show('wtw_moldtexturetitle'); 
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				if (buildingid != "") {
					WTW.show('wtw_productdiv');
				} else if (thingid != "") {
					WTW.show('wtw_productthingdiv');
				}
				dGet('wtw_tallowsearch').checked = true;
				break;
			case "storesign":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Frame Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Sign";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Sign";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Sign";
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_alttagdiv');
				WTW.show('wtw_moldtexturetitle'); 
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				dGet('wtw_tallowsearch').checked = true;
				break;
			case "store3dsign":
				dGet('wtw_moldpositiontitle').innerHTML = "3D Text Position";
				dGet('wtw_moldscalingtitle').innerHTML = "3D Text Length";
				dGet('wtw_moldrotationtitle').innerHTML = "3D Text Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "3D Text Texture Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave 3D Sign";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete 3D Sign";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit 3D Sign";
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_alttagdiv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.show('wtw_moldwebtextdiv');
				break;
			case "storeviewcart":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Frame Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Cart Button";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Cart Button";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Cart Button";
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_alttagdiv');
				WTW.show('wtw_moldtexturetitle'); 
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				dGet('wtw_tallowsearch').checked = true;
				break;
			case "storecategories":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Frame Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Categories";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Categories";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Categories";
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_alttagdiv');
				WTW.show('wtw_moldtexturetitle'); 
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				dGet('wtw_tallowsearch').checked = true;
				break;
			case "storesearch":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Frame Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Search";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Search";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Search";
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_alttagdiv');
				WTW.show('wtw_moldtexturetitle'); 
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				dGet('wtw_tallowsearch').checked = true;
				break;
			case "custom":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Texture Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Item";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Item";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Item";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturepreview');
				break;
			case "terrain":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Terrain Texture";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Terrain";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Terrain";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Terrain";
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldscalingydiv');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_terrainheightdiv');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldheightmapdiv');
				break;
			default:
				dGet('wtw_moldpositiontitle').innerHTML = "Box Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Box Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Box Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Box Texture Image";
				dGet('wtw_moldbumptexturetitle').innerHTML = "Box Bump Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Box";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Box";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Box";
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-molds-addmoldlist\r\n setMoldFormFields=" + ex.message);
	}
}


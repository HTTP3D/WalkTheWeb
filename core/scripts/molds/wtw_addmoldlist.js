/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions set the types of molds to add and define the default values, form fields, and functions to create the molds */

/* meshes vs molds - meshes are loaded to the scene, molds are the definitions that will create the mesh on demand */

WTWJS.prototype.getMoldList = function() {
	/* Mold list is used by admin to populate the drop down list of possible molds */
	/* this is simplified into basic shapes (here) and complex ones 3D Web Objects shown in the next function */
	WTW.moldList = [];
	try {
		WTW.moldList[WTW.moldList.length] = 'Wall';
		WTW.moldList[WTW.moldList.length] = 'Floor';
		WTW.moldList[WTW.moldList.length] = 'Box';
		WTW.moldList[WTW.moldList.length] = 'Rounded Box';
		WTW.moldList[WTW.moldList.length] = 'Cylinder';
		WTW.moldList[WTW.moldList.length] = 'Half Pipe';
		WTW.moldList[WTW.moldList.length] = 'Cone';
		WTW.moldList[WTW.moldList.length] = 'Sphere';
		WTW.moldList[WTW.moldList.length] = 'Dome';
		WTW.moldList[WTW.moldList.length] = 'Triangle';
		WTW.moldList[WTW.moldList.length] = 'Torus';
		WTW.moldList[WTW.moldList.length] = 'Polygon';
		WTW.moldList[WTW.moldList.length] = 'Plane';
		WTW.moldList[WTW.moldList.length] = 'Disc';
		WTW.moldList[WTW.moldList.length] = 'Tube';
		WTW.moldList[WTW.moldList.length] = 'Line';
		WTW.moldList = WTW.pluginsMolds(WTW.moldList);
		dGet('wtw_moldsbuttonlist').innerHTML = '';
		for (var i=0;i < WTW.moldList.length;i++) {
			if (WTW.moldList[i] != null) {
				var zmoldvalue = WTW.moldList[i].toLowerCase();
				while (zmoldvalue.indexOf(' ') > -1) {
					zmoldvalue = zmoldvalue.replace(' ','');
				}
				var zoption = document.createElement('option');
				zoption.text = WTW.moldList[i];
				zoption.value = zmoldvalue;
				if (buildingid != '') {
					dGet('wtw_moldsbuttonlist').innerHTML += "<div id='wtw_baddbuild" + zmoldvalue + "' name='wtw_baddbuild" + zmoldvalue + "' onclick=\"WTW.openAddNewMold('building','" + zmoldvalue + "');\" class='wtw-menulevel2'>" + WTW.moldList[i] + "</div>\r\n";
				} else if (communityid != '') {
					dGet('wtw_moldsbuttonlist').innerHTML += "<div id='wtw_baddcomm" + zmoldvalue + "' name='wtw_baddcomm" + zmoldvalue + "' onclick=\"WTW.openAddNewMold('community','" + zmoldvalue + "');\" class='wtw-menulevel2'>" + WTW.moldList[i] + "</div>\r\n";
				} else if (thingid != '') {
					dGet('wtw_moldsbuttonlist').innerHTML += "<div id='wtw_baddthing" + zmoldvalue + "' name='wtw_baddthing" + zmoldvalue + "' onclick=\"WTW.openAddNewMold('thing','" + zmoldvalue + "');\" class='wtw-menulevel2'>" + WTW.moldList[i] + "</div>\r\n";
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-molds-addmoldlist\r\n getMoldList=' + ex.message);
	} 
	return WTW.moldList;
}

WTWJS.prototype.getWebMoldList = function() {
	/* Web Mold list is used by admin to populate the drop down list of possible Web Molds */
	/* this is simplified into basic shapes (function above) and complex ones 3D Web Objects (here) */
	/* these may be complex shapes and/or include uploaded objects, animation, lighting, or other functionality */
	var zwebmoldlist = [];
	try {
		zwebmoldlist[zwebmoldlist.length] = '3D Text';
		zwebmoldlist[zwebmoldlist.length] = 'Image';
        zwebmoldlist[zwebmoldlist.length] = 'Video';
/*		zwebmoldlist[zwebmoldlist.length] = 'Video Stream'; */
		zwebmoldlist[zwebmoldlist.length] = 'Babylon File';
		zwebmoldlist[zwebmoldlist.length] = 'Create Scene Kiosk';
        zwebmoldlist[zwebmoldlist.length] = 'Lightbulb';
/*	    zwebmoldlist[zwebmoldlist.length] = 'Spot Light'; */
        zwebmoldlist[zwebmoldlist.length] = 'Candle Flame';
        zwebmoldlist[zwebmoldlist.length] = 'Tree';
        zwebmoldlist[zwebmoldlist.length] = 'Flag';
        zwebmoldlist[zwebmoldlist.length] = 'Partical Sphere';
        zwebmoldlist[zwebmoldlist.length] = 'Partical Shower';
        zwebmoldlist[zwebmoldlist.length] = 'Smoke';
        zwebmoldlist[zwebmoldlist.length] = 'Water Fountain';
        zwebmoldlist[zwebmoldlist.length] = 'Water Plane';
        zwebmoldlist[zwebmoldlist.length] = 'Water Disc';
		zwebmoldlist[zwebmoldlist.length] = 'View Blog';
		zwebmoldlist[zwebmoldlist.length] = 'Blog Posting';
		zwebmoldlist = WTW.pluginsWebMolds(zwebmoldlist);
		dGet('wtw_webmoldsbuttonlist').innerHTML = '';
		for (var i=0;i < zwebmoldlist.length;i++) {
			if (zwebmoldlist[i] != null) {
				var zmoldvalue = zwebmoldlist[i].toLowerCase();
				while (zmoldvalue.indexOf(' ') > -1) {
					zmoldvalue = zmoldvalue.replace(' ','');
				}
				if (buildingid != '') {
					dGet('wtw_webmoldsbuttonlist').innerHTML += "<div id='wtw_baddweb" + zmoldvalue + "' name='wtw_baddweb" + zmoldvalue + "' onclick=\"WTW.openAddNewMold('building','" + zmoldvalue + "');\" class='wtw-menulevel2'>" + zwebmoldlist[i] + "</div>\r\n";
				} else if (communityid != '') {
					dGet('wtw_webmoldsbuttonlist').innerHTML += "<div id='wtw_baddcommweb" + zmoldvalue + "' name='wtw_baddcommweb" + zmoldvalue + "' onclick=\"WTW.openAddNewMold('community','" + zmoldvalue + "');\" class='wtw-menulevel2'>" + zwebmoldlist[i] + "</div>\r\n";
				} else if (thingid != '') {
					dGet('wtw_webmoldsbuttonlist').innerHTML += "<div id='wtw_baddthingweb" + zmoldvalue + "' name='wtw_baddthingweb" + zmoldvalue + "' onclick=\"WTW.openAddNewMold('thing','" + zmoldvalue + "');\" class='wtw-menulevel2'>" + zwebmoldlist[i] + "</div>\r\n";
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-molds-addmoldlist\r\n getWebMoldList=' + ex.message);
	} 
	return zwebmoldlist;
}
		
WTWJS.prototype.addMold = function(zmoldname, zmolddef, zparentname, zcoveringname) {
	/* the ad mold process checks the values and creates the meshes, applies the coverings, and initiates colllisions, shadows, physics, etc... */
	/* this process all molds into meshes in the 3D Scene (both basic and web molds lists above) */
	var zmold;
	try {
		zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
			WTW.disposeClean(zmoldname);
		}
		var zshape = 'box'; 
		if (zmolddef.shape != undefined && zmolddef.shape != '') {
			zshape = zmolddef.shape.toLowerCase();
		}
		if (zmoldname.indexOf('communitybuildings') > -1 || zmoldname.indexOf('communitycommunities') > -1 || (zmoldname.indexOf('person-') > -1 && zshape=='box') || (zmoldname.indexOf('myavatar-') > -1 && zshape=='box')) {
			zcoveringname = 'hidden';
		}
		var zposx = Number(zmolddef.position.x);
		var zposy = Number(zmolddef.position.y);
		var zposz = Number(zmolddef.position.z);
		var zlenx = Number(zmolddef.scaling.x);
		var zleny = Number(zmolddef.scaling.y);
		var zlenz = Number(zmolddef.scaling.z);
		var zrotx = Number(zmolddef.rotation.x);
		var zroty = Number(zmolddef.rotation.y);
		var zrotz = Number(zmolddef.rotation.z);
		var zsubdivisions = 12;
		var zspecial1 = 0;
		var zspecial2 = 0;
		var zminheight = 0;
		var zmaxheight = 0;
		var zpath1 = [];
		var zpath2 = [];
		if (zmolddef.paths != undefined) {
			zpath1 = zmolddef.paths.path1;
		}
		if (zmolddef.paths != undefined) {
			zpath2 = zmolddef.paths.path2;
		}
		try {
			if (WTW.isNumeric(zmolddef.subdivisions)) {
				zsubdivisions = Number(zmolddef.subdivisions);
			}
		} catch(ex) {}
		try {
			if (WTW.isNumeric(zmolddef.scaling.special1)) {
				zspecial1 = Number(zmolddef.scaling.special1)
			}
		} catch(ex) {}
		try {
			if (WTW.isNumeric(zmolddef.scaling.special2)) {
				zspecial2 = Number(zmolddef.scaling.special2)
			}
		} catch(ex) {}
		try {
			if (WTW.isNumeric(zmolddef.graphics.heightmap.minheight)) {
				zminheight = Number(zmolddef.graphics.heightmap.minheight);
			}
		} catch(ex) {}
		try {
			if (WTW.isNumeric(zmolddef.graphics.heightmap.maxheight)) {
				zmaxheight = Number(zmolddef.graphics.heightmap.maxheight);
			}
		} catch(ex) {}
		/* account for alternate parenting */
		var ztransformposition = WTW.transformPosition(zmolddef, zposx, zposy, zposz); 
		zposx = ztransformposition.posx;
		zposy = ztransformposition.posy;
		zposz = ztransformposition.posz;
		/* select the function to create the mold based on 'shape' which is the mold type */
		switch (zshape) {
			case 'wall':
				/* wall - a box set with defaults for common scaling */
				zmold = WTW.addMoldBox(zmoldname, zlenx, zleny, zlenz);
				break;
			case 'box':
				/* box - a basic cube shape of various scaling */
				zmold = WTW.addMoldBox(zmoldname, zlenx, zleny, zlenz);
				break;
			case 'roundedbox':
				/* roundedbox - a basic cube with round corners and various scaling */
				zmold = WTW.addMoldRoundedBox(zmoldname, zlenx, zleny, zlenz);
				break;
			case 'floor':
				/* floor - a box set with defaults for common scaling */
				zmold = WTW.addMoldBox(zmoldname, zlenx, zleny, zlenz);
				break;
			case 'cylinder':
				/* cylinder - canister with solid ends */
				zmold = WTW.addMoldCylinder(zmoldname, zlenx, zleny, zlenz, zsubdivisions);
				break;
			case 'halfpipe':
				/* halfpipe - cylinder cut in half and carved out */
				if (zspecial1 < .01) {
					zspecial1 = .01;
				}
				zmold = WTW.addMoldHalfPipe(zmoldname, zlenx, zleny, zlenz, zsubdivisions, zspecial1);
				break;
			case 'cone':
				/* cone - cylinder with one end closed to a point. */
				zmold = WTW.addMoldCone(zmoldname, zlenx, zleny, zlenz, zsubdivisions, zspecial1, zspecial2);
				break;
			case 'polygon':
				/* polygon - various polygons defined by the special setting */
				zmold = WTW.addMoldPolygon(zmoldname, zlenx, zleny, zlenz, zspecial1);
				break; 
			case 'sphere':
				/* sphere - ball with a setting for subdivisions that can make it smoother */
				zmold = WTW.addMoldSphere(zmoldname, zlenx, zleny, zlenz, zsubdivisions);
				break;
			case 'dome':
				/* dome - sphere cut in half and carved out */
				zmold = WTW.addMoldDome(zmoldname, zlenx, zleny, zlenz, zsubdivisions, zspecial1);
				break;
			case 'triangle':
				/* triangle - work in progress - needs to be able to adjust the points for various angles and thickness */
				zmold = WTW.addMoldTriangle(zmoldname, zlenx, zleny, zlenz, zspecial1);
				break;
			case 'torus':
				/* torus - donut shape */
				zmold = WTW.addMoldTorus(zmoldname, zlenx, zleny, zlenz, zsubdivisions, zspecial1);
				break;
			case 'plane':
				/* plane - one sided flat box */
				zmold = WTW.addMoldPlane(zmoldname, zlenx, zleny, zlenz);
				break;
			case 'disc':
				/* disc - one sided flat oval */
				zmold = WTW.addMoldDisc(zmoldname, zlenx, zleny, zlenz, zsubdivisions);
				break;
			case 'tube':
				/* tube - length of tube that you can set the points to pass through to make any shape */
				zmold = WTW.addMoldTube(zmoldname, zlenx, zleny, zlenz, zsubdivisions, zspecial1, zpath1);
				break;
			case 'line':
				/* line - tube without thickness - add points to pass through */
				zmold = WTW.addMoldLine(zmoldname, zlenx, zleny, zlenz, zpath1);
				break;
			case 'terrain':
				/* terrain - ground formations that can use heightmaps */
				zmold = WTW.addMoldTerrain(zmoldname, zlenx, zleny, zlenz, zsubdivisions, zmolddef.graphics.heightmap.path, zmolddef.graphics.heightmap.id, zminheight, zmaxheight, zparentname, zmolddef, zcoveringname, zposx, zposy, zposz);
				break;
			case '3dtext':
				/* 3dtext - 3d text font you can add text to 3D Scenes */
				zmold = WTW.addMold3DText(zmoldname, zmolddef, zlenx, zleny, zlenz);
				zcoveringname = 'done';
				break;
			case 'image':
				/* image - with ability to hover over and change image */
				zmold = WTW.addMoldImage(zmoldname, zmolddef, zlenx, zleny, zlenz);
				zcoveringname = 'done';
				break;
			case 'raisedimage':
				/* raisedimage - image that uses a heightmap */
				zmold = WTW.addMoldRaisedImage(zmoldname, zmolddef, zlenx, zleny, zlenz, zsubdivisions, zmolddef.graphics.heightmap.path, zminheight, zmaxheight);
				zcoveringname = 'done';
				break;
            case 'video':
				/* video - video player or screen - real videos with play, pause, stop , and rewind buttons */
				zmold = WTW.addMoldVideo(zmoldname, zmolddef, zlenx, zleny, zlenz);
				zcoveringname = 'done';
				break;
			case 'videostream':
				/* plane - one sided flat box, streaming video will display on it */
				zmold = WTW.addVideoStream(zmoldname, zlenx, zleny, zlenz);
				zcoveringname = 'done';
				break;
			case 'createscenekiosk':
				/* Create Scene Kiosk - allows users to click the botton to trigger Create Scene from Pages */
				zmold = WTW.addMoldCreateSceneKiosk(zmoldname, zmolddef, zlenx, zleny, zlenz);
				zcoveringname = 'none';
				break;
				break;
            case 'lightbulb':
				/* lightbulb - adds smaller light to scene - great for inside rooms */
				zmold = WTW.addMoldLightbulb(zmoldname, zmolddef, zlenx, zleny, zlenz, zposx, zposy, zposz, zsubdivisions);
				break;
            case 'spotlight':
				/* spotlight - adds a spot light to a scene */
				zmold = WTW.addMoldSpotLight(zmoldname, zlenx, zleny, zlenz, zsubdivisions, zspecial1, zspecial2);
				break;
            case 'candleflame':
				/* candleflame - image simulation */
				zmold = WTW.addMoldCandleFlame(zmoldname, zmolddef, zlenx, zleny, zlenz);
				zcoveringname = 'none';
				break;
            case 'tree':
				/* tree - dynamically created (depreciated soon to babylon 3D Models) */
				zmold = WTW.addMoldTree(zmoldname, zmolddef, zlenx, zleny, zlenz, zposx, zposy, zposz, zsubdivisions);
				zcoveringname = 'none';
				break;
            case 'flag':
				/* flag - dynamic flowing flag - depreciated soon to babylon 3D Models */
				zmold = WTW.addMoldFlag(zmoldname, zmolddef, zlenx, zleny, zlenz, zposx, zposy, zposz, zsubdivisions);
				zcoveringname = 'none';
				break;
            case 'smoke':
				/* smoke - particle emitter for smoke effect */
				zmold = WTW.addMoldSmoke(zmoldname, zmolddef, zlenx, zleny, zlenz);
				zcoveringname = 'none';
				break;
            case 'waterfountain':
				/* waterfountain - particle emitter for water effect */
				zmold = WTW.addMoldFountain(zmoldname, zmolddef, zlenx, zleny, zlenz);
				zcoveringname = 'none';
				break;
            case 'particlesphere':
				/* particlesphere - particle emitter for sphere effect */
				zmold = WTW.addMoldParticleSphere(zmoldname, zmolddef, zlenx, zleny, zlenz);
				zcoveringname = 'none';
				break;
            case 'particleshower':
				/* particleshower - particle emitter for water shower effect */
				zmold = WTW.addMoldParticleShower(zmoldname, zmolddef, zlenx, zleny, zlenz);
				zcoveringname = 'none';
				break;
			case 'babylonfile':
				/* babylonfile - upload your own 3D Object Molds and use them in your scene - uses the media library */
				zmold = WTW.addMoldBabylonFile(zmoldname, zmolddef, zlenx, zleny, zlenz);
				zcoveringname = 'none';
				break;
            case 'waterplane':
				/* waterplane - plane with a water procedural texture applied */
				zmold = WTW.addMoldWaterPlane(zmoldname, zmolddef, zlenx, zleny, zlenz);
				zcoveringname = 'water';
				break;
            case 'waterdisc':
				/* waterdisc - disc with a water procedural texture applied */
				zmold = WTW.addMoldWaterDisc(zmoldname, zmolddef, zlenx, zleny, zlenz, zsubdivisions);
				zcoveringname = 'water';
				break;
			case 'simpletextbox':
				/* simpletextbox - add text to a box material surface to add to your scene */
				zmold = WTW.addMoldSimpleTextBox(zmoldname, zmolddef, zlenx, zleny, zlenz);
				zcoveringname = 'none';
				break;
			case 'viewblog':
				/* viewblog - work in progress - view a 3D Blog */
				zmold = WTW.addMoldViewBlog(zmoldname, zmolddef, zlenx, zleny, zlenz);
				zcoveringname = 'none';
				break;
			case 'blogposting':
				/* blogposting - work in progress - write to a 3D Blog with a 3D Form */
				zmold = WTW.addMoldBlogPosting(zmoldname, zmolddef, zlenx, zleny, zlenz);
				zcoveringname = 'none';
				break;
			default:
				/* checks plugins for mold shape and custom functions */
				zmold = WTW.pluginsAddMolds(zshape, zmoldname, zmolddef, zlenx, zleny, zlenz);
				zcoveringname = 'none';
				break;
		}
		/* apply the coverings, properties, shadows, physics, etc... */
		zmold = WTW.completeMold(zmold, zmoldname, zparentname, zmolddef, zcoveringname, zposx, zposy, zposz);
		if (zshape != 'babylonfile') {
			WTW.setMoldLoaded(zmoldname, '1');
		}
	} catch (ex) {
		WTW.log('core-scripts-molds-addmoldlist\r\n addMold=' + ex.message);
	} 
	return zmold;
}

WTWJS.prototype.completeMold = function(zmold, zmoldname, zparentname, zmolddef, zcoveringname, zposx, zposy, zposz) {
	/* apply the coverings, properties, shadows, physics, etc... */
	try {
		if (zmold != null) {
			var zcheckcollisions = '1';
			var zshape = 'box'; 
			var ziswaterreflection = '0';
			var znamepart = zmoldname.split('-');
			var zlenx = Number(zmolddef.scaling.x);
			var zleny = Number(zmolddef.scaling.y);
			var zlenz = Number(zmolddef.scaling.z);
			var zrotx = Number(zmolddef.rotation.x);
			var zroty = Number(zmolddef.rotation.y);
			var zrotz = Number(zmolddef.rotation.z);
			var zspecial1 = 0;
			var zspecial2 = 0;
			var znode = scene.getTransformNodeByID(zmoldname);
			try {
				if (zmolddef.checkcollisions != null) {
					zcheckcollisions = zmolddef.checkcollisions;
				}
			} catch(ex) {}
			if (zmolddef.shape != undefined && zmolddef.shape != '') {
				zshape = zmolddef.shape.toLowerCase();
			}
			if (zmoldname.indexOf('communitybuildings') > -1 || zmoldname.indexOf('communitycommunities') > -1 || (zmoldname.indexOf('person-') > -1 && zshape == 'box') || (zmoldname.indexOf('myavatar-') > -1 && zshape == 'box')) {
				zcoveringname = 'hidden';
			}
			try {
				if (zmolddef.graphics.waterreflection != null) {
					ziswaterreflection = zmolddef.graphics.waterreflection;
				}
			} catch(ex) {}
			try {
				if (WTW.isNumeric(zmolddef.scaling.special1)) {
					zspecial1 = Number(zmolddef.scaling.special1)
				}
			} catch(ex) {}
			try {
				if (WTW.isNumeric(zmolddef.scaling.special2)) {
					zspecial2 = Number(zmolddef.scaling.special2)
				}
			} catch(ex) {}
			//zmold.isVisible = false;
			zmold.position = new BABYLON.Vector3(zposx, zposy, zposz);
			zmold.rotation = new BABYLON.Vector3(WTW.getRadians(zrotx), WTW.getRadians(zroty), WTW.getRadians(zrotz));
			
			if (zmolddef.sound != undefined) {
				if (zmolddef.sound.id != '') {
					WTW.loadSoundToMold(zmold, zmoldname, zmolddef.sound.id, zmolddef.sound.path, zmolddef.sound.loop, zmolddef.sound.attenuation, zmolddef.sound.maxdistance, zmolddef.sound.rollofffactor, zmolddef.sound.refdistance, -1);
				}
			}
			if (zcoveringname == 'hidden' || znamepart[1] == 'actionzone' || znamepart[1] == 'connectinggrid') {
				/* some molds do not ned coverings (came with - or not necessary) */
				zmold.isVisible = false;
			} else {
				/* molds that require coverings to be added */
				if (zshape != 'box' && zshape != 'wall' && zshape != 'floor' && zcoveringname == 'directional texture') {
					/* correction for molds that cannot use directional covering */
					zcoveringname = 'texture';
				}
				if (zcoveringname != 'none' && zcoveringname != 'done') {
					/* molds that require coverings to be added */
					if (zcoveringname == 'directional texture') {
						/* clear out old covering on directional defined surfaces before recovering */
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
					} else {
						/* clear old coverings that are not directional */
						try {
							if (zmold.material != undefined) {
								if (zmold.material.diffuseTexture != null) {
									zmold.material.diffuseTexture.dispose();
									zmold.material.diffuseTexture = null;
								}
							}
						} catch (ex) {}
						try {
							if (zmold.material != null) {
								zmold.material.dispose();
								zmold.material = null;
							}
						} catch (ex) {}
					}
					/* add covering basedon covering name */
					zmold.material = WTW.addCovering(zcoveringname, zmoldname, zmolddef, zlenx, zleny, zlenz, zspecial1, zspecial2);
					if (zmold.material != undefined) {
						/* set colors and color tinting mainly for textures just added */
						if (zmolddef.color.diffusecolor != undefined && zmolddef.color.emissivecolor != undefined && zmolddef.color.specularcolor != undefined && zmolddef.color.ambientcolor != undefined) {
							zmold.material.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);	
							zmold.material.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
							zmold.material.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
							zmold.material.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);
						} else if (zmolddef.color != undefined) {
							if (zmolddef.color.indexOf('#') > -1) {
								zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color);
							}
						}
					}
				}
			}
			if (zmoldname.indexOf('terrain') > -1 || (ziswaterreflection == '1' && znode == null)) {
				/* if mold is set to add reflection, add mold to the reflections array */
				WTW.addReflectionRefraction(zmold);
			}
			if (WTW.adminView == 1 || zmolddef.ispickable == '1') {
				zmold.isPickable = true;
			}
			if (zcheckcollisions == '1' && zcoveringname != 'none') {
				zmold.checkCollisions = true; 
			} else {
				zmolddef.checkcollisions = '0';
				zmold.checkCollisions = false;
			}
			/* work in progress - currently disabled, freeze world matrix can speed up the scene with less calculations */
			if (WTW.AdminView == 0 && zparentname.indexOf('actionzone') == -1 && zparentname != '') {
				zmold.freezeWorldMatrix();
			} else {
				zmold.unfreezeWorldMatrix();
			}
			zmold.renderingGroupId = 1;
			/*
			 * Possible values : 
			 * - BABYLON.AbstractMesh.CULLINGSTRATEGY_STANDARD  
			 * - BABYLON.AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY  
			 * - BABYLON.AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION  
			 * - BABYLON.AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION_THEN_BSPHERE_ONLY  
			 mesh.cullingStrategy = oneOfThePossibleValues;			
			 */
			
			//if (zshape == 'box' && zcoveringname == 'texture') {
			//	zmold.convertToUnIndexedMesh();
			//}
			
			/* cleanup - remove any un-parented molds (sometimes the parent was deleted since the mold started to be created) */
			if (zparentname != '') {
				var zparentmold = WTW.getMeshOrNodeByID(zparentname);
				if (zparentmold != null) {
					zmold.parent = zparentmold;
				} else {
					WTW.disposeClean(zmoldname);
				}
			}
			if (WTW.cleanCachedTextureBuffer) {
				scene.cleanCachedTextureBuffer();
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-molds-addmoldlist\r\n completeMold=' + ex.message);
	} 
	return zmold;
}

WTWJS.prototype.setNewMoldDefaults = function(zshape) {
	/* For each new mold and new web mold, these are the default values when created using the admin form */
	try {
		var zcoords = WTW.getNewCoordinates(50);
		var zpositionx = Number(zcoords.positionX);
		var zpositiony = Number(zcoords.positionY);
		var zpositionz = Number(zcoords.positionZ);
		var zrotationy = Number(zcoords.rotationY);
		var zshapevalue = zshape.toLowerCase();
		var zimageid = 'ij7fi8qv7dbgb6zc';
		var zimagepath = '/content/system/stock/stucco-512x512.jpg';
		var zheightmapid = 'dxmbplwoocpg5df3';
		var zheightmappath = '/content/system/stock/heightmap-1500x1500.jpg';
		while (zshapevalue.indexOf(' ') > -1) {
			zshapevalue = zshapevalue.replace(' ','');
		}
		if (thingid != '') {
			zpositionx = 0;
			zpositionz = 0;
		}
		dGet('wtw_moldaddimagepreview').src = '';
		dGet('wtw_moldaddimagehoverpreview').src = '';
		dGet('wtw_tmoldaddonclick').selectedIndex = 0;
		dGet('wtw_tmoldimagejsfunction').value = '';
		dGet('wtw_tmoldimagejsparameters').value = '';
		dGet('wtw_tmoldalttag').value = '';
		dGet('wtw_tmoldwebtext').value = '';
		dGet('wtw_tmoldwebstyle').value = '';
		dGet('wtw_tmoldmaxheight').value = '0.00';
		dGet('wtw_tmolduploadobjectid').value = '';
		dGet('wtw_tmoldobjectfolder').value = '';
		dGet('wtw_tmoldobjectfile').value = '';
		dGet('wtw_tmoldcoveringold').value = 'color';
		dGet('wtw_tmoldgraphiclevel').checked = false;
		dGet('wtw_tmoldreceiveshadows').checked = false;
		dGet('wtw_tmoldtextureid').value = '';
		dGet('wtw_tmoldtexturepath').value = '';
		dGet('wtw_tmoldtexturebumpid').value = '';
		dGet('wtw_tmoldtexturebumppath').value = '';
		dGet('wtw_tmoldheightmapid').value = '';
		dGet('wtw_tmoldheightmappath').value = '';
		dGet('wtw_tmoldmixmapid').value = '';
		dGet('wtw_tmoldmixmappath').value = '';
		dGet('wtw_tmoldtexturerid').value = '';
		dGet('wtw_tmoldtexturerpath').value = '';
		dGet('wtw_tmoldtexturegid').value = '';
		dGet('wtw_tmoldtexturegpath').value = '';
		dGet('wtw_tmoldtexturebid').value = '';
		dGet('wtw_tmoldtexturebpath').value = '';
		dGet('wtw_tmoldtexturebumprid').value = '';
		dGet('wtw_tmoldtexturebumprpath').value = '';
		dGet('wtw_tmoldtexturebumpgid').value = '';
		dGet('wtw_tmoldtexturebumpgpath').value = '';
		dGet('wtw_tmoldtexturebumpbid').value = '';		
		dGet('wtw_tmoldtexturebumpbpath').value = '';		
		dGet('wtw_tmoldvideoid').value = '';
		dGet('wtw_tmoldvideopath').value = '';
		dGet('wtw_tmoldvideoposterid').value = '';
		dGet('wtw_tmoldvideoposterpath').value = '';
		dGet('wtw_tmoldsoundid').value = '';
		dGet('wtw_tmoldsoundpath').value = '';
		dGet('wtw_tmoldsoundname').value = '';
		dGet('wtw_soundicon').alt = '';
		dGet('wtw_soundicon').title = '';
		dGet('wtw_selectedsound').innerHTML = '';
		WTW.setDDLValue('wtw_tmoldsoundattenuation', 'none');
		WTW.setSoundFields();
		dGet('wtw_tmoldsoundloop').checked = true;
		dGet('wtw_tmoldsoundmaxdistance').value = '100.00';
		dGet('wtw_tmoldsoundrollofffactor').value = '1.00';
		dGet('wtw_tmoldsoundrefdistance').value = '1.00';
		dGet('wtw_tmoldsoundconeinnerangle').value = '90.00';
		dGet('wtw_tmoldsoundconeouterangle').value = '180.00';
		dGet('wtw_tmoldsoundconeoutergain').value = '0.50';		
		dGet('wtw_tmoldopacity').value = '100.00';
		dGet('wtw_tmoldwebtext').value = '';
		dGet('wtw_tmoldwebtextheight').value = '6.00';
		dGet('wtw_tmoldwebtextthick').value = '1.00';
		WTW.setDDLValue('wtw_tmoldwebtextalign', 'center');
		dGet('wtw_tmoldwebtextemissive').value = '';
		dGet('wtw_tmoldwebtextspecular').value = '';
		dGet('wtw_tmoldwebtextdiffuse').value = '';
		dGet('wtw_tmoldwebtextambient').value = '';
		dGet('wtw_tmolddiffusecolor').value = '#ffffff';
		dGet('wtw_tmoldemissivecolor').value = '#000000';
		dGet('wtw_tmoldspecularcolor').value = '#686868';
		dGet('wtw_tmoldambientcolor').value = '#575757';
		dGet('wtw_tmoldpositionx').value = zpositionx;
		dGet('wtw_tmoldpositiony').value = zpositiony + 5;
		dGet('wtw_tmoldpositionz').value = zpositionz;
		dGet('wtw_tmoldscalingx').value = '10.00';
		dGet('wtw_tmoldscalingy').value = '10.00';
		dGet('wtw_tmoldscalingz').value = '10.00';
		dGet('wtw_tmoldrotationx').value = '0.00';
		dGet('wtw_tmoldrotationy').value = zrotationy;
		dGet('wtw_tmoldrotationz').value = '0.00';
		dGet('wtw_tmoldspecial1').value = '0.00';
		dGet('wtw_tmoldspecial2').value = '0.00';
		dGet('wtw_tmolduoffset').value = '0.00';
		dGet('wtw_tmoldvoffset').value = '0.00';
		dGet('wtw_tmolduscale').value = '0.00';
		dGet('wtw_tmoldvscale').value = '0.00';
		dGet('wtw_tmoldsubdivisions').value = '12';
		switch (zshapevalue) {
			case 'cylinder':
				dGet('wtw_tmoldrotationy').value = '0.00';
				dGet('wtw_tmoldsubdivisions').value = '10';
				break;
			case 'halfpipe':
				dGet('wtw_tmoldrotationx').value = '90.00';
				dGet('wtw_tmoldrotationy').value = zrotationy;
				dGet('wtw_tmoldrotationz').value = '90.00';
				dGet('wtw_tmoldspecial1').value = '1.00';
				dGet('wtw_tmoldsubdivisions').value = '20';
				break;
			case 'cone':
				dGet('wtw_tmoldrotationy').value = '0.00';
				dGet('wtw_tmoldspecial2').value = '1.00';
				dGet('wtw_tmoldsubdivisions').value = '20';
				break;
			case 'polygon':
				dGet('wtw_tmoldspecial1').value = '1';
				dGet('wtw_tmoldsubdivisions').value = '20';
				break; 
			case 'sphere':
				dGet('wtw_tmoldrotationy').value = '0.00';
				dGet('wtw_tmoldsubdivisions').value = '10';
				break;
			case 'dome':
				dGet('wtw_tmoldspecial1').value = '1.00';
				dGet('wtw_tmoldsubdivisions').value = '10';
				break;
			case 'triangle':
				dGet('wtw_tmoldscalingx').value = '1.00';
				break;
			case 'torus':
				dGet('wtw_tmoldscalingy').value = '5.00';
				dGet('wtw_tmoldrotationy').value = '0.00';
				dGet('wtw_tmoldspecial1').value = '3.00';
				dGet('wtw_tmoldsubdivisions').value = '16';
				break;
			case 'plane':
				dGet('wtw_tmoldscalingz').value = '0.00';
				dGet('wtw_tmolduscale').value = '1.00';
				dGet('wtw_tmoldvscale').value = '1.00';
				dGet('wtw_tmoldsubdivisions').value = '2';
				break;
			case 'lightbulb':
				dGet('wtw_tmoldpositiony').value = zpositiony + 1;
				dGet('wtw_tmoldscalingx').value = '0.80';
				dGet('wtw_tmoldscalingy').value = '1.00';
				dGet('wtw_tmoldscalingz').value = '0.80';
				dGet('wtw_tmoldrotationy').value = '0.00';
				dGet('wtw_tmoldsubdivisions').value = '10';
				break;
			case 'spotlight':
				dGet('wtw_tmoldpositiony').value = zpositiony + 1;
				dGet('wtw_tmoldscalingx').value = '2.00';
				dGet('wtw_tmoldscalingy').value = '2.00';
				dGet('wtw_tmoldscalingz').value = '2.00';
				dGet('wtw_tmoldrotationy').value = '0.00';
				dGet('wtw_tmoldspecial2').value = '1.00';
				dGet('wtw_tmoldsubdivisions').value = '20';
				break;
			case 'candleflame':
				dGet('wtw_tmoldpositiony').value = zpositiony + 3;
				dGet('wtw_tmoldscalingx').value = '1.00';
				dGet('wtw_tmoldscalingy').value = '5.00';
				dGet('wtw_tmoldscalingz').value = '.1';
				dGet('wtw_tmoldrotationy').value = '0.00';
				dGet('wtw_tmoldsubdivisions').value = '2';
				dGet('wtw_tmoldcoveringold').value = 'none';
				dGet('wtw_tmoldtextureid').value = zimageid;
				dGet('wtw_tmoldtexturepath').value = zimagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case 'tree':
				dGet('wtw_tmoldpositiony').value = zpositiony;
				dGet('wtw_tmoldscalingx').value = '1.00';
				dGet('wtw_tmoldscalingy').value = '1.00';
				dGet('wtw_tmoldscalingz').value = '1.00';
				dGet('wtw_tmoldrotationy').value = '0.00';
				dGet('wtw_tmoldcoveringold').value = 'none';
				dGet('wtw_tmoldtextureid').value = zimageid;
				dGet('wtw_tmoldtexturepath').value = zimagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case 'flag':
				dGet('wtw_tmoldpositiony').value = zpositiony;
				dGet('wtw_tmoldscalingx').value = '1.00';
				dGet('wtw_tmoldscalingy').value = '1.00';
				dGet('wtw_tmoldscalingz').value = '1.00';
				dGet('wtw_tmoldrotationy').value = '0.00';
				dGet('wtw_tmoldsubdivisions').value = '10';
				dGet('wtw_tmoldcoveringold').value = 'none';
				dGet('wtw_tmoldtextureid').value = zimageid;
				dGet('wtw_tmoldtexturepath').value = zimagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case 'smoke':
				dGet('wtw_tmoldpositiony').value = zpositiony;
				dGet('wtw_tmoldscalingx').value = '1.00';
				dGet('wtw_tmoldscalingy').value = '1.00';
				dGet('wtw_tmoldscalingz').value = '1.00';
				dGet('wtw_tmoldrotationy').value = '0.00';
				dGet('wtw_tmoldcoveringold').value = 'none';
				dGet('wtw_tmoldtextureid').value = zimageid;
				dGet('wtw_tmoldtexturepath').value = zimagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case 'waterfountain':
				dGet('wtw_tmoldpositiony').value = zpositiony;
				dGet('wtw_tmoldscalingx').value = '1.00';
				dGet('wtw_tmoldscalingy').value = '1.00';
				dGet('wtw_tmoldscalingz').value = '1.00';
				dGet('wtw_tmoldrotationy').value = '0.00';
				dGet('wtw_tmoldcoveringold').value = 'none';
				dGet('wtw_tmoldtextureid').value = zimageid;
				dGet('wtw_tmoldtexturepath').value = zimagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case 'particlesphere':
				dGet('wtw_tmoldpositiony').value = zpositiony;
				dGet('wtw_tmoldscalingx').value = '2.00';
				dGet('wtw_tmoldscalingy').value = '2.00';
				dGet('wtw_tmoldscalingz').value = '2.00';
				dGet('wtw_tmoldrotationy').value = '0.00';
				dGet('wtw_tmoldcoveringold').value = 'none';
				dGet('wtw_tmoldtextureid').value = zimageid;
				dGet('wtw_tmoldtexturepath').value = zimagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case 'particleshower':
				dGet('wtw_tmoldpositiony').value = zpositiony;
				dGet('wtw_tmoldscalingx').value = '2.00';
				dGet('wtw_tmoldscalingy').value = '6.00';
				dGet('wtw_tmoldscalingz').value = '2.00';
				dGet('wtw_tmoldrotationy').value = '0.00';
				dGet('wtw_tmoldcoveringold').value = 'none';
				dGet('wtw_tmoldtextureid').value = zimageid;
				dGet('wtw_tmoldtexturepath').value = zimagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case 'babylonfile':
				dGet('wtw_tmoldpositiony').value = zpositiony;
				dGet('wtw_tmoldscalingx').value = '1.00';
				dGet('wtw_tmoldscalingy').value = '1.00';
				dGet('wtw_tmoldscalingz').value = '1.00';
				dGet('wtw_tmoldrotationy').value = '0.00';
				dGet('wtw_tmoldcoveringold').value = 'none';
				dGet('wtw_tmoldtextureid').value = zimageid;
				dGet('wtw_tmoldtexturepath').value = zimagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case 'waterplane':
				dGet('wtw_tmoldpositiony').value = zpositiony;
				dGet('wtw_tmoldscalingy').value = '.1';
				dGet('wtw_tmoldsubdivisions').value = '2';
				dGet('wtw_tmoldcoveringold').value = '2d texture';
				dGet('wtw_tmoldtextureid').value = zimageid;
				dGet('wtw_tmoldtexturepath').value = zimagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case 'waterdisc':
				dGet('wtw_tmoldscalingy').value = '.1';
				dGet('wtw_tmoldopacity').value = '100.00';
				dGet('wtw_tmoldsubdivisions').value = '10';
				dGet('wtw_tmoldcoveringold').value = '2d texture';
				dGet('wtw_tmoldtextureid').value = zimageid;
				dGet('wtw_tmoldtexturepath').value = zimagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case 'disc':
				dGet('wtw_tmoldscalingx').value = '20.00';
				dGet('wtw_tmoldscalingz').value = '0.00';
				dGet('wtw_tmoldrotationy').value = zrotationy + 90;
				dGet('wtw_tmoldsubdivisions').value = '16';
				break;
			case 'line':
				dGet('wtw_tmoldscalingx').value = '1.00';
				dGet('wtw_tmoldscalingy').value = '1.00';
				dGet('wtw_tmoldscalingz').value = '1.00';
				dGet('wtw_tmoldrotationy').value = '0.00';
				dGet('wtw_tmoldsubdivisions').value = '2';
				dGet('wtw_tmoldcoveringold').value = 'color';
				break;
			case 'wall':
				dGet('wtw_tmoldpositiony').value = zpositiony + 10;
				dGet('wtw_tmoldscalingx').value = '20.00';
				dGet('wtw_tmoldscalingy').value = '20.00';
				dGet('wtw_tmoldscalingz').value = '1.00';
				dGet('wtw_tmoldrotationy').value = zrotationy + 90;
				dGet('wtw_tmoldcoveringold').value = 'texture';
				dGet('wtw_tmoldtextureid').value = zimageid;
				dGet('wtw_tmoldtexturepath').value = zimagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case 'floor':
				dGet('wtw_tmoldscalingx').value = '20.00';
				dGet('wtw_tmoldscalingy').value = '1.00';
				dGet('wtw_tmoldscalingz').value = '20.00';
				dGet('wtw_tmoldcoveringold').value = 'texture';
				dGet('wtw_tmoldtextureid').value = '4to027vq39087bxr';
				dGet('wtw_tmoldtexturepath').value = '/content/system/stock/cement-512x344.jpg';
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case 'box':
			case 'roundedbox':
				break;
			case '3dtext':
				dGet('wtw_tmoldpositiony').value = zpositiony;
				dGet('wtw_tmoldscalingx').value = '1.00';
				dGet('wtw_tmoldscalingy').value = '1.00';
				dGet('wtw_tmoldscalingz').value = '1.00';
				dGet('wtw_tmoldrotationy').value = zrotationy + 90;
				dGet('wtw_tmoldwebtext').value = 'Text';
				dGet('wtw_tmoldwebtextheight').value = '6.00';
				dGet('wtw_tmoldwebtextthick').value = '1.00';
				WTW.setDDLValue('wtw_tmoldwebtextalign', 'center');
				dGet('wtw_tmoldwebtextemissive').value = '#ff0000';
				dGet('wtw_tmoldwebtextspecular').value = '#000000';
				dGet('wtw_tmoldwebtextdiffuse').value = '#f0f0f0';
				dGet('wtw_tmoldwebtextambient').value = '#808080';
				dGet('wtw_tmoldcoveringold').value = 'none';
				dGet('wtw_tmoldtextureid').value = zimageid;
				dGet('wtw_tmoldtexturepath').value = zimagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case 'image':
				dGet('wtw_tmoldscalingx').value = '.25';
				dGet('wtw_tmoldrotationy').value = zrotationy + 90;
				break;
			case 'raisedimage':
				dGet('wtw_tmoldscalingx').value = '.25';
				dGet('wtw_tmoldmaxheight').value = '2.00';
				break;
			case 'video':
				dGet('wtw_tmoldpositiony').value = zpositiony + 10;
				dGet('wtw_tmoldscalingx').value = '1.00';
				dGet('wtw_tmoldscalingy').value = '1.00';
				dGet('wtw_tmoldscalingz').value = '1.00';
				dGet('wtw_tmoldrotationy').value = zrotationy - 90;
				dGet('wtw_tmoldvideoid').value = '';
				dGet('wtw_tmoldvideopath').value = '';
				dGet('wtw_tmoldvideoposterid').value = '';
				dGet('wtw_tmoldvideoposterpath').value = '';
				WTW.setDDLValue('wtw_tmoldsoundattenuation','linear');
				dGet('wtw_tmoldsoundmaxdistance').value = '100.00';
				dGet('wtw_tmoldsoundloop').checked = false;
				dGet('wtw_tmoldvideomaxdistance').value = '100.00';
				dGet('wtw_tmoldvideoloop').checked = false;
				break;
			case 'videostream':
				dGet('wtw_tmoldpositiony').value = zpositiony + 10;
				dGet('wtw_tmoldscalingy').value = '8.00';
				dGet('wtw_tmoldscalingz').value = '0.00';
				dGet('wtw_tmoldrotationy').value = zrotationy + 180;
				dGet('wtw_tmoldsubdivisions').value = '2';
				break;
			case 'createscenekiosk':
				dGet('wtw_tmoldpositiony').value = zpositiony - .5;
				dGet('wtw_tmoldscalingx').value = '1.00';
				dGet('wtw_tmoldscalingy').value = '1.00';
				dGet('wtw_tmoldscalingz').value = '1.00';
				dGet('wtw_tmoldrotationy').value = zrotationy - 90;
				break;
			case 'simpletextbox':
				dGet('wtw_tmoldscalingx').value = '.25';
				break;
			case 'viewblog':
				zrotationy += 180;
				if (zrotationy > 360) {
					zrotationy -= 360;
				}
				dGet('wtw_tmoldpositiony').value = zpositiony;
				dGet('wtw_tmoldscalingx').value = '1.00';
				dGet('wtw_tmoldscalingy').value = '15.00';
				dGet('wtw_tmoldscalingz').value = '15.00';
				dGet('wtw_tmoldcoveringold').value = 'texture';
				dGet('wtw_tmoldtextureid').value = zimageid;
				dGet('wtw_tmoldtexturepath').value = zimagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;			
			case 'blogposting':
				zrotationy += 180;
				if (zrotationy > 360) {
					zrotationy -= 360;
				}
				dGet('wtw_tmoldpositiony').value = zpositiony;
				dGet('wtw_tmoldscalingx').value = '1.00';
				dGet('wtw_tmoldscalingy').value = '15.00';
				dGet('wtw_tmoldscalingz').value = '15.00';
				dGet('wtw_tmoldcoveringold').value = 'texture';
				dGet('wtw_tmoldtextureid').value = zimageid;
				dGet('wtw_tmoldtexturepath').value = zimagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case 'sharktank':
				dGet('wtw_tmoldpositiony').value = zpositiony;
				dGet('wtw_tmoldscalingx').value = '100.00';
				dGet('wtw_tmoldscalingy').value = '50.00';
				dGet('wtw_tmoldscalingz').value = '100.00';
				dGet('wtw_tmoldspecial1').value = '7';
				dGet('wtw_tmoldopacity').value = '100.00';
				dGet('wtw_tmoldcoveringold').value = 'glass';
				break;
			case 'custom': 
				dGet('wtw_tmoldpositiony').value = zpositiony;
				dGet('wtw_tmoldscalingx').value = '1.00';
				dGet('wtw_tmoldscalingy').value = '1.00';
				dGet('wtw_tmoldscalingz').value = '1.00';
				break;	
			case 'terrain': 
				dGet('wtw_tmoldpositiony').value = -1;
				dGet('wtw_tmoldscalingx').value = '1000.00';
				dGet('wtw_tmoldscalingy').value = '1000.00';
				dGet('wtw_tmoldscalingz').value = '1.00';
				dGet('wtw_tmoldsubdivisions').value = '70';
				dGet('wtw_tmoldmaxheight').value = '70.00';
				dGet('wtw_tmoldcoveringold').value = 'terrain';
				dGet('wtw_tmoldtextureid').value = zimageid;
				dGet('wtw_tmoldtexturepath').value = zimagepath;
				dGet('wtw_tmoldheightmapid').value = zheightmapid;
				dGet('wtw_tmoldheightmappath').value = zheightmappath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				WTW.setPreviewImage('wtw_moldheightmappreview', 'wtw_tmoldheightmappath', 'wtw_tmoldheightmapid');
				break;	
			case 'tube':
				dGet('wtw_tmoldscalingx').value = '1.00';
				dGet('wtw_tmoldscalingy').value = '1.00';
				dGet('wtw_tmoldscalingz').value = '1.00';
				dGet('wtw_tmoldrotationy').value = '0.00';
				dGet('wtw_tmoldspecial1').value = '1.00';
				dGet('wtw_tmoldsubdivisions').value = '8';
				break;				
		}
		WTW.pluginsSetNewMoldDefaults(zshape, zpositionx, zpositiony, zpositionz, zrotationy);
		dGet('wtw_tmoldcsgmoldid').value = '';
		WTW.setDDLValue('wtw_tmoldcsgaction', '');
		dGet('wtw_selectedcsgshape').innerHTML = '';
		dGet('wtw_tmoldactionzoneid').value = '';
	} catch (ex) {
		WTW.log('core-scripts-molds-addmoldlist\r\n setNewMoldDefaults=' + ex.message);
	} 
}

WTWJS.prototype.setMoldFormFields = function(zshape) {
	/* For each new mold and new web mold, these are the sections shown on the admin form per shape */
	/* for example: sphere has subdivisions and a box does not, or babylon files allow uploads selections but have no added textures */
	try {
		var zshapevalue = zshape.toLowerCase();
		while (zshapevalue.indexOf(' ') > -1) {
			zshapevalue = zshapevalue.replace(' ','');
		}
		dGet('wtw_tmoldshape').value = zshape;
		WTW.hide('wtw_moldaddimagediv');
		WTW.hide('wtw_moldscalediv');
		WTW.hide('wtw_moldmergemoldsdiv');
		WTW.show('wtw_moldscalingydiv');
		WTW.show('wtw_moldcolorsdiv');
		WTW.show('wtw_moldtexturesetdiv');
		WTW.show('wtw_moldshadowreflectiondiv');
		WTW.show('wtw_moldbasictexturesetdiv');
		WTW.show('wtw_moldbasictextureset2div');
		WTW.show('wtw_moldbumptexturetitle');
		WTW.show('wtw_moldbumptextureset2div');
		WTW.show('wtw_alttagdiv');
		WTW.hide('wtw_moldwebtextdiv');
		WTW.hide('wtw_moldwebtextcolordiv');
		WTW.hide('wtw_moldaddvideodiv');
		WTW.hide('wtw_terrainheightdiv');
		WTW.hide('wtw_moldheightmapdiv');
		WTW.hide('wtw_pointlistdiv');
		WTW.hide('wtw_pointeditdiv');
		WTW.hide('wtw_objectdiv');
		WTW.hide('wtw_moldspecial1');
		WTW.hide('wtw_moldspecial2');
		WTW.hide('wtw_moldsubdivisions');
		WTW.show('wtw_moldtexturetitle');
		WTW.show('wtw_moldtexturepreview');
		switch (zshapevalue) {
			case 'tube':
				dGet('wtw_moldpositiontitle').innerHTML = 'Tube Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Tube Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Tube Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Tube Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Tube Bump Image';
				dGet('wtw_moldspecial1title').innerHTML = 'Tube Thickness';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Tube';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Tube';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Tube';
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldspecial1');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				WTW.show('wtw_pointlistdiv');
				break;
			case 'cylinder':
				dGet('wtw_moldpositiontitle').innerHTML = 'Cylinder Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Cylinder Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Cylinder Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Cylinder Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Cylinder Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Cylinder';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Cylinder';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Cylinder';
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case 'halfpipe':
				dGet('wtw_moldpositiontitle').innerHTML = 'Pipe Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Pipe Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Pipe Rotation';
				dGet('wtw_moldspecial1title').innerHTML = 'Pipe Thickness';
				dGet('wtw_moldtexturetitle').innerHTML = 'Pipe Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Pipe Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Pipe';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Pipe';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Pipe';
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldspecial1');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case 'cone':
				dGet('wtw_moldpositiontitle').innerHTML = 'Cone Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Cone Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Cone Rotation';
				dGet('wtw_moldspecial1title').innerHTML = 'Top Radius';
				dGet('wtw_moldspecial2title').innerHTML = 'Bottom Radius';
				dGet('wtw_moldtexturetitle').innerHTML = 'Cone Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Cone Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Cone';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Cone';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Cone';
				WTW.show('wtw_moldspecial1');
				WTW.show('wtw_moldspecial2');
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case 'polygon':
				dGet('wtw_moldpositiontitle').innerHTML = 'Polygon Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Polygon Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Polygon Rotation';
				dGet('wtw_moldspecial1title').innerHTML = 'Polygon Type (0-14)';
				dGet('wtw_moldtexturetitle').innerHTML = 'Polygon Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Polygon Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Polygon';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Polygon';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Polygon';
				WTW.show('wtw_moldspecial1');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break; 
			case 'sphere':
				dGet('wtw_moldpositiontitle').innerHTML = 'Sphere Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Sphere Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Sphere Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Sphere Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Sphere Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Sphere';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Sphere';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Sphere';
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case 'dome':
				dGet('wtw_moldpositiontitle').innerHTML = 'Dome Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Dome Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Dome Rotation';
				dGet('wtw_moldspecial1title').innerHTML = 'Dome Thickness';
				dGet('wtw_moldtexturetitle').innerHTML = 'Dome Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Dome Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Dome';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Dome';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Dome';
				WTW.show('wtw_moldspecial1');
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case 'triangle':
				dGet('wtw_moldpositiontitle').innerHTML = 'Triangle Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Triangle Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Triangle Rotation';
				dGet('wtw_moldspecial1title').innerHTML = 'Triangle Peak Offset';
				dGet('wtw_moldtexturetitle').innerHTML = 'Triangle Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Triangle Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Triangle';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Triangle';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Triangle';
				WTW.show('wtw_moldspecial1');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case 'torus':
				dGet('wtw_moldpositiontitle').innerHTML = 'Torus Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Torus Length';
				dGet('wtw_moldspecial1title').innerHTML = 'Hole Size';
				dGet('wtw_moldrotationtitle').innerHTML = 'Torus Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Torus Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Torus Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Torus';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Torus';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Torus';
				WTW.show('wtw_moldspecial1');
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case 'plane':
				dGet('wtw_moldpositiontitle').innerHTML = 'Plane Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Plane Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Plane Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Plane Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Plane Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Plane';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Plane';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Plane';
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case 'lightbulb':
				dGet('wtw_moldpositiontitle').innerHTML = 'Lightbulb Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Lightbulb Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Lightbulb Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Lightbulb Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Lightbulb Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Lightbulb';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Lightbulb';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Lightbulb';
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case 'spotlight':
				dGet('wtw_moldpositiontitle').innerHTML = 'Spot Light Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Spot Light Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Spot Light Rotation';
				dGet('wtw_moldspecial1title').innerHTML = 'Top Radius';
				dGet('wtw_moldspecial2title').innerHTML = 'Bottom Radius';
				dGet('wtw_moldtexturetitle').innerHTML = 'Spot Light Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Spot Light Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Spot Light';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Spot Light';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Spot Light';
				WTW.show('wtw_moldspecial1');
				WTW.show('wtw_moldspecial2');
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case 'candleflame':
				dGet('wtw_moldpositiontitle').innerHTML = 'Candle Flame Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Candle Flame Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Candle Flame Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Candle Flame Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Candle Flame';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Candle Flame';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Candle Flame';
				WTW.hide('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.hide('wtw_moldshadowreflectiondiv');
				break;
			case 'tree':
				dGet('wtw_moldpositiontitle').innerHTML = 'Tree Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Tree Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Tree Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Tree Texture Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Tree';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Tree';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Tree';
				WTW.hide('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.hide('wtw_moldshadowreflectiondiv');
				break;
			case 'flag':
				dGet('wtw_moldpositiontitle').innerHTML = 'Flag Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Flag Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Flag Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Flag Texture Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Flag';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Flag';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Flag';
				WTW.show('wtw_moldsubdivisions');
				WTW.hide('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.show('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.hide('wtw_moldshadowreflectiondiv');
				WTW.show('wtw_moldscalediv');
				break;
			case 'smoke':
				dGet('wtw_moldpositiontitle').innerHTML = 'Smoke Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Smoke Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Smoke Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Smoke Texture Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Smoke';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Smoke';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Smoke';
				WTW.hide('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.hide('wtw_moldshadowreflectiondiv');
				break;
			case 'waterfountain':
				dGet('wtw_moldpositiontitle').innerHTML = 'Fountain Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Fountain Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Fountain Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Fountain Texture Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Fountain';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Fountain';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Fountain';
				WTW.hide('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				break;
			case 'particlesphere':
				dGet('wtw_moldpositiontitle').innerHTML = 'Sphere Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Sphere Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Sphere Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Sphere Texture Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Sphere';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Sphere';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Sphere';
				WTW.hide('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.hide('wtw_moldshadowreflectiondiv');
				WTW.hide('wtw_moldshadowreflectiondiv');
				break;
			case 'particleshower':
				dGet('wtw_moldpositiontitle').innerHTML = 'Shower Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Shower Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Shower Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Shower Texture Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Shower';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Shower';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Shower';
				WTW.hide('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.hide('wtw_moldshadowreflectiondiv');
				break;
			case 'babylonfile':
				dGet('wtw_moldpositiontitle').innerHTML = '3D Model Position';
				dGet('wtw_moldscalingtitle').innerHTML = '3D Model Length';
				dGet('wtw_moldrotationtitle').innerHTML = '3D Model Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = '3D Model Texture Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave 3D Model';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete 3D Model';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit 3D Model';
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.show('wtw_objectdiv');
				break;
			case 'waterplane':
				dGet('wtw_moldpositiontitle').innerHTML = 'Water Plane Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Water Plane Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Water Plane Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Water Plane Texture Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Water Plane';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Water Plane';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Water Plane';
				WTW.hide('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.hide('wtw_moldshadowreflectiondiv');
				break;
			case 'waterdisc':
				dGet('wtw_moldpositiontitle').innerHTML = 'Water Disc Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Water Disc Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Water Disc Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Water Disc Texture Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Water Disc';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Water Disc';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Water Disc';
				WTW.show('wtw_moldsubdivisions');
				WTW.hide('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.hide('wtw_moldshadowreflectiondiv');
				break;
			case 'disc':
				dGet('wtw_moldpositiontitle').innerHTML = 'Disc Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Disc Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Disc Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Disc Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Disc Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Disc';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Disc';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Disc';
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case 'line':
				dGet('wtw_moldpositiontitle').innerHTML = 'Line Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Line Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Line Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Line Texture Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Line';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Line';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Line';
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				break;
			case 'wall':
				dGet('wtw_moldpositiontitle').innerHTML = 'Wall Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Wall Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Wall Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Wall Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Wall Bump Image';
				dGet('wtw_moldspecial1title').innerHTML = 'Texture Scale Width';
				dGet('wtw_moldspecial2title').innerHTML = 'Texture Scale Height';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Wall';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Wall';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Wall';
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case 'floor':
				dGet('wtw_moldpositiontitle').innerHTML = 'Floor or Ceiling Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Floor or Ceiling Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Floor or Ceiling Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Floor or Ceiling Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Floor or Ceiling Bump Image';
				dGet('wtw_moldspecial1title').innerHTML = 'Texture Scale Width';
				dGet('wtw_moldspecial2title').innerHTML = 'Texture Scale Length';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Floor';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Floor';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Floor or Ceiling (Floor)';
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case 'box':
				dGet('wtw_moldpositiontitle').innerHTML = 'Box Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Box Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Box Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Box Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Box Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Box';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Box';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Box';
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case 'roundedbox':
				dGet('wtw_moldpositiontitle').innerHTML = 'Box Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Box Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Box Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Box Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Box Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Box';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Box';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Box';
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case '3dtext':
				dGet('wtw_moldpositiontitle').innerHTML = '3D Text Position';
				dGet('wtw_moldscalingtitle').innerHTML = '3D Text Length';
				dGet('wtw_moldrotationtitle').innerHTML = '3D Text Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = '3D Text Texture Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave 3D Text';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete 3D Text';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit 3D Text';
				WTW.hide('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.hide('wtw_moldshadowreflectiondiv');
				WTW.show('wtw_moldwebtextdiv');
				WTW.show('wtw_moldwebtextcolordiv');
				break;
			case 'image':
				dGet('wtw_moldpositiontitle').innerHTML = 'Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Frame Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Image';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Image';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Image';
				WTW.show('wtw_moldaddimagediv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldscalediv');
				break;
			case 'video':
				dGet('wtw_moldpositiontitle').innerHTML = 'Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Frame Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Video';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Video';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Video';
				WTW.show('wtw_moldaddvideodiv');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				break;
			case 'videostream':
				dGet('wtw_moldpositiontitle').innerHTML = 'Video Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Video Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Video Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Video Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Video Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Video';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Video';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Video';
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
			case 'createscenekiosk':
				dGet('wtw_moldpositiontitle').innerHTML = 'Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Texture Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Kiosk';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Kiosk';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Kiosk';
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				break;
			case 'raisedimage':
				dGet('wtw_moldpositiontitle').innerHTML = 'Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Frame Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Image';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Image';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Image';
				WTW.show('wtw_moldaddimagediv');
				WTW.show('wtw_moldsubdivisions');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_terrainheightdiv');
				WTW.show('wtw_moldheightmapdiv');
				break;
			case 'simpletextbox':
				dGet('wtw_moldpositiontitle').innerHTML = 'Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Frame Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Textbox';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Textbox';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Textbox';
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				break;
			case 'viewblog':
				dGet('wtw_moldpositiontitle').innerHTML = 'Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Texture Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Blog';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Blog';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Blog';
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				break;
			case 'blogposting':
				dGet('wtw_moldpositiontitle').innerHTML = 'Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Texture Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Blog';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Blog';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Blog';
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				break;
			case 'sharktank':
				dGet('wtw_moldpositiontitle').innerHTML = 'Tank Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Tank Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Tank Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Tank Texture Image';
				dGet('wtw_moldspecial1title').innerHTML = 'Number of Sharks';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Tank';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Tank';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Tank';
				WTW.show('wtw_moldspecial1');
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturepreview');
				WTW.hide('wtw_moldtexturesetdiv');
				break;
			case 'custom':
				dGet('wtw_moldpositiontitle').innerHTML = 'Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Texture Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Item';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Item';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Item';
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturepreview');
				break;
			case 'terrain':
				dGet('wtw_moldpositiontitle').innerHTML = 'Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Terrain Texture';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Terrain';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Terrain';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Terrain';
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldscalingydiv');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.show('wtw_moldsubdivisions');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_terrainheightdiv');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldheightmapdiv');
				break;
			default:
				dGet('wtw_moldpositiontitle').innerHTML = 'Box Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Box Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Box Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Box Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Box Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Box';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Box';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Box';
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
		}
		WTW.pluginsSetMoldFormFields(zshape);
	} catch (ex) {
		WTW.log('core-scripts-molds-addmoldlist\r\n setMoldFormFields=' + ex.message);
	}
}


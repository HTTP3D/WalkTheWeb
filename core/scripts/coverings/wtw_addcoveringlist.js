/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions set the types of coverings to add and define the default values, form fields, and functions to create the coverings */

/* materials vs coverings - materials are loaded on the meshes in the scene, coverings are the definitions that create the materials to be added the mesh on demand */

WTWJS.prototype.getCoveringList = function(shape) {
	/* covering list is used by admin to populate the drop down list of possible coverings for a mold */
	var coveringlist = null;
	coveringlist = [];
	try {
		if (shape == "terrain") {
			coveringlist[coveringlist.length] = "Terrain";
		} else {
			if (shape == "plane" || shape == "disc") {
				coveringlist[coveringlist.length] = "2D Texture";
			} else if (shape != "sharktank") {
				coveringlist[coveringlist.length] = "Texture";
				if (shape == "wall" || shape == "floor" || shape == "box") {
					coveringlist[coveringlist.length] = "Directional Texture";
				}
			}
			coveringlist[coveringlist.length] = "Color";
			coveringlist[coveringlist.length] = "Glass";
			//coveringlist[coveringlist.length] = "Mirror";
			coveringlist[coveringlist.length] = "Water";
			coveringlist[coveringlist.length] = "Fire";
			coveringlist[coveringlist.length] = "Marble";
			coveringlist[coveringlist.length] = "Road";
			coveringlist[coveringlist.length] = "Hidden";
		}
		WTW.coveringlist = WTW.pluginsCoverings(WTW.coveringlist);
		WTW.clearDDL("wtw_tmoldcovering");
		for (var i=0;i < coveringlist.length;i++) {
			var option = document.createElement("option");
			option.text = coveringlist[i];
			option.value = coveringlist[i].toLowerCase();
			if (coveringlist[i] == "Texture") {
				option.selected = true;
			}
			dGet("wtw_tmoldcovering").add(option);
		}
	} catch (ex) {
		WTW.log("core-scripts-molds-addcoveringlist\r\n getCoveringList=" + ex.message);
	} 
	return coveringlist;
}

WTWJS.prototype.addCovering = function(coveringname, moldname, molddef, lenx, leny, lenz, special1, special2) {
	/* function that is run to add the covering to a mold - set by covering name */
	var covering;
	try {
		/* each covering is defined by a separate function */
		switch (coveringname) {
			case "color":
				covering = WTW.addCoveringColor(moldname, molddef);
				break;
			case "glass":
				molddef.opacity = .2;
				covering = WTW.addCoveringGlass(moldname, molddef);
				break;
			case "mirror":
				covering = WTW.addCoveringMirror(moldname, molddef);
				break;
			case "water":
				covering = WTW.addCoveringWater(moldname, molddef);
				break;
			case "fire":
				covering = WTW.addCoveringFire(moldname, molddef);
				break;
			case "marble":
				covering = WTW.addCoveringMarble(moldname, molddef, lenx, leny, lenz);
				break;
			case "road":
				covering = WTW.addCoveringRoad(moldname, molddef);
				break;
			case "texture":
				covering = WTW.addCoveringTexture(moldname, molddef, lenx, leny, lenz, special1, special2);
				break;
			case "directional texture":
				covering = WTW.addCoveringDirectionalTexture(moldname, molddef, lenx, leny, lenz);
				break; 
			case "2d texture":
				covering = WTW.addCovering2D(moldname, molddef, lenx, leny, lenz);
				break;
			case "terrain":
				covering = WTW.addCoveringTerrain(moldname, molddef, lenx, leny, lenz);
				break;
			case "hidden":
				covering = WTW.addCoveringHidden(moldname, 0);
				break;
			case "hiddenshow":
				covering = WTW.addCoveringHidden(moldname, .3);
				break;
			case "wire":
				covering = WTW.addCoveringWire(moldname);
				break;
			case "none":
				covering = null;
				break;
			default:
				covering = WTW.pluginsAddCoverings(coveringname, moldname, molddef, lenx, leny, lenz, special1, special2);
				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-molds-addcoveringlist\r\n addCovering=" + ex.message);
	} 
	return covering;
}

WTWJS.prototype.setCoveringFormFields = function(coveringname) {
	/* admin mode menu - shows and hides the various parts of the form depending on relevence to covering */
	/* for example a texture covering shows the texture selection part of the form */
	try {
		switch (coveringname) {
			case "glass":
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturepreview');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.closeColorSelector();
				break;
			case "mirror":
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturepreview');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.closeColorSelector();
				break;
			case "water":
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldtexturepreview');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.closeColorSelector();
				break;
			case "fire":
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturepreview');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.closeColorSelector();
				break;
			case "marble":
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturepreview');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.openColorSelector();
				break;
			case "road":
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturepreview');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.openColorSelector();
				break;
			case "directional texture":
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldbumptexturetitle');
				WTW.show('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldbasictextureset2div');
				WTW.openColorSelector();
				break; 
			case "texture":
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldbumptexturetitle');
				WTW.show('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldbasictextureset2div');
				WTW.openColorSelector();
				break;
			case "2d texture":
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldbumptexturetitle');
				WTW.show('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldbasictextureset2div');
				WTW.openColorSelector();
				break;
			case "terrain":
				WTW.show('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldbasictextureset2div');
				WTW.closeColorSelector();
				break;
			case "hidden":
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturepreview');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.closeColorSelector();
				break;
			case "color":
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturepreview');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.openColorSelector();
				break;
			default:
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldbumptexturetitle');
				WTW.show('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldbasictextureset2div');
				WTW.closeColorSelector();
				break;
		}	
		WTW.pluginsSetCoveringFormFields(coveringname);
	} catch (ex) {
		WTW.log("core-scripts-molds-addcoveringlist\r\n setCoveringFormFields=" + ex.message);
	}
}

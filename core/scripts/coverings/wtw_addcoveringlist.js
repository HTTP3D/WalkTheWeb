/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions set the types of coverings to add and define the default values, form fields, and functions to create the coverings */

/* materials vs coverings - materials are loaded on the meshes in the scene, coverings are the definitions that create the materials to be added the mesh on demand */

WTWJS.prototype.getCoveringList = function(zshape) {
	/* covering list is used by admin to populate the drop down list of possible coverings for a mold */
	var zcoveringlist = null;
	zcoveringlist = [];
	try {
		if (zshape == 'terrain') {
			zcoveringlist[zcoveringlist.length] = 'Terrain';
		} else {
			if (zshape == 'plane' || zshape == 'disc') {
				zcoveringlist[zcoveringlist.length] = '2D Texture';
			} else if (zshape != 'sharktank') {
				zcoveringlist[zcoveringlist.length] = 'Texture';
				if (zshape == 'wall' || zshape == 'floor' || zshape == 'box') {
					zcoveringlist[zcoveringlist.length] = 'Directional Texture';
				}
			}
			zcoveringlist[zcoveringlist.length] = 'Color';
			zcoveringlist[zcoveringlist.length] = 'Glass';
			//zcoveringlist[zcoveringlist.length] = 'Mirror';
			zcoveringlist[zcoveringlist.length] = 'Water';
			zcoveringlist[zcoveringlist.length] = 'Fire';
			zcoveringlist[zcoveringlist.length] = 'Marble';
			zcoveringlist[zcoveringlist.length] = 'Road';
			zcoveringlist[zcoveringlist.length] = 'Hidden';
		}
		WTW.coveringlist = WTW.pluginsCoverings(WTW.coveringlist);
		WTW.clearDDL('wtw_tmoldcovering');
		for (var i=0;i < zcoveringlist.length;i++) {
			var zoption = document.createElement('option');
			zoption.text = zcoveringlist[i];
			zoption.value = zcoveringlist[i].toLowerCase();
			if (zcoveringlist[i] == 'Texture') {
				zoption.selected = true;
			}
			dGet('wtw_tmoldcovering').add(zoption);
		}
	} catch (ex) {
		WTW.log('core-scripts-molds-addcoveringlist\r\n getCoveringList=' + ex.message);
	} 
	return zcoveringlist;
}

WTWJS.prototype.addCovering = function(zcoveringname, zmoldname, zmolddef, zlenx, zleny, zlenz, zspecial1, zspecial2) {
	/* function that is run to add the covering to a mold - set by covering name */
	var zcovering;
	try {
		/* each covering is defined by a separate function */
		switch (zcoveringname) {
			case 'color':
				zcovering = WTW.addCoveringColor(zmoldname, zmolddef);
				break;
			case 'glass':
				zmolddef.opacity = .2;
				zcovering = WTW.addCoveringGlass(zmoldname, zmolddef);
				break;
			case 'mirror':
				zcovering = WTW.addCoveringMirror(zmoldname, zmolddef);
				break;
			case 'water':
				zcovering = WTW.addCoveringWater(zmoldname, zmolddef);
				break;
			case 'fire':
				zcovering = WTW.addCoveringFire(zmoldname, zmolddef);
				break;
			case 'marble':
				zcovering = WTW.addCoveringMarble(zmoldname, zmolddef, zlenx, zleny, zlenz);
				break;
			case 'road':
				zcovering = WTW.addCoveringRoad(zmoldname, zmolddef);
				break;
			case 'texture':
				zcovering = WTW.addCoveringTexture(zmoldname, zmolddef, zlenx, zleny, zlenz, zspecial1, zspecial2);
				break;
			case 'directional texture':
				zcovering = WTW.addCoveringDirectionalTexture(zmoldname, zmolddef, zlenx, zleny, zlenz);
				break; 
			case '2d texture':
				zcovering = WTW.addCovering2D(zmoldname, zmolddef, zlenx, zleny, zlenz);
				break;
			case 'terrain':
				zcovering = WTW.addCoveringTerrain(zmoldname, zmolddef, zlenx, zleny, zlenz);
				break;
			case 'hidden':
				zcovering = WTW.addCoveringHidden(zmoldname, 0);
				break;
			case 'hiddenshow':
				zcovering = WTW.addCoveringHidden(zmoldname, .3);
				break;
			case 'wire':
				zcovering = WTW.addCoveringWire(zmoldname);
				break;
			case 'none':
				zcovering = null;
				break;
			default:
				zcovering = WTW.pluginsAddCoverings(zcoveringname, zmoldname, zmolddef, zlenx, zleny, zlenz, zspecial1, zspecial2);
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-molds-addcoveringlist\r\n addCovering=' + ex.message);
	} 
	return zcovering;
}

WTWJS.prototype.setCoveringFormFields = function(zcoveringname) {
	/* admin mode menu - shows and hides the various parts of the form depending on relevence to covering */
	/* for example a texture covering shows the texture selection part of the form */
	try {
		switch (zcoveringname) {
			case 'glass':
				WTW.show('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturepreview');
				WTW.hide('wtw_moldbasictextureset2div');
				break;
			case 'mirror':
				WTW.hide('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturepreview');
				WTW.hide('wtw_moldbasictextureset2div');
				break;
			case 'water':
				WTW.hide('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldtexturepreview');
				WTW.hide('wtw_moldbasictextureset2div');
				break;
			case 'fire':
				WTW.hide('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturepreview');
				WTW.hide('wtw_moldbasictextureset2div');
				break;
			case 'marble':
				WTW.show('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturepreview');
				WTW.hide('wtw_moldbasictextureset2div');
				break;
			case 'road':
				WTW.show('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturepreview');
				WTW.hide('wtw_moldbasictextureset2div');
				break;
			case 'directional texture':
				WTW.show('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldbumptexturetitle');
				WTW.show('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldbasictextureset2div');
				break; 
			case 'texture':
				WTW.show('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldbumptexturetitle');
				WTW.show('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldbasictextureset2div');
				break;
			case '2d texture':
				WTW.show('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldbumptexturetitle');
				WTW.show('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldbasictextureset2div');
				break;
			case 'terrain':
				WTW.show('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldbasictextureset2div');
				break;
			case 'hidden':
				WTW.hide('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturepreview');
				WTW.hide('wtw_moldbasictextureset2div');
				break;
			case 'color':
				WTW.show('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturepreview');
				WTW.hide('wtw_moldbasictextureset2div');
				break;
			case 'none':
				WTW.hide('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldtexturetitle');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturepreview');
				WTW.hide('wtw_moldbasictextureset2div');
				break;
			default:
				WTW.hide('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldbumptexturetitle');
				WTW.show('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldbasictextureset2div');
				break;
		}	
		WTW.pluginsSetCoveringFormFields(zcoveringname);
	} catch (ex) {
		WTW.log('core-scripts-molds-addcoveringlist\r\n setCoveringFormFields=' + ex.message);
	}
}

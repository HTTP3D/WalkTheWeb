/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

DEVID_PLUGINTEMPLATE.prototype.addMoldMyCustomMold = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	let zmold;
	try {
		/* each custom mold will have a separate function */
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		
		/* everything you create in this function should be parented to the above invisible Box: */
		/* yourobject.parent = zmold;
		/* so that your 3D Objects position, scaling, and rotatation work as child objects */
		/* if needed you can replace the zmold directly with your 3D Object. */
		/* examples of existing 3D Objects can be found at /core/scripts/molds/wtw_basicmolds.js */
		/* you can use one of the 3D Objects as a base and build off it as needed */
		/* names of your child objects and materials should be: */
		/* zmoldname + '-DEVIDpartname' */
		/* where partname is whatever you want it to be. */

	} catch (ex) {
		WTW.log('plugins:devid-plugintemplate:scripts-custom_molds.js-addMoldMyCustomMold=' + ex.message);
	}
	return zmold;
}

DEVID_PLUGINTEMPLATE.prototype.setNewMoldDefaults = function(zshape, zpositionx, zpositiony, zpositionz, zrotationy) {
	try {
		/* add each custom mold to this one function as a case - no need to add additional hooks */
		/* zshape is the name of my custom mold - all lowercase and no spaces */
		switch (zshape) {
			case 'mycustommold':
				/* position x, y, x and zrotationy are calculated from the current camera position so it is in front of the camera */
				dGet('wtw_tmoldpositionx').value = zpositionx;
				dGet('wtw_tmoldpositiony').value = zpositiony;
				dGet('wtw_tmoldpositionz').value = zpositionz;
				dGet('wtw_tmoldscalingx').value = '1.00';
				dGet('wtw_tmoldscalingy').value = '1.00';
				dGet('wtw_tmoldscalingz').value = '1.00';
				dGet('wtw_tmoldrotationx').value = '0.00';
				dGet('wtw_tmoldrotationy').value = zrotationy;
				dGet('wtw_tmoldrotationz').value = '0.00';
				dGet('wtw_tmoldspecial2').value = '0.00';
				dGet('wtw_tmolduoffset').value = '0.00';
				dGet('wtw_tmoldvoffset').value = '0.00';
				dGet('wtw_tmolduscale').value = '0.00';
				dGet('wtw_tmoldvscale').value = '0.00';
				dGet('wtw_tmoldsubdivisions').value = '12';
				break;
		}
	} catch (ex) {
		WTW.log('plugins:devid-plugintemplate:scripts-custom_molds.js-setNewMoldDefaults=' + ex.message);
	}
}

DEVID_PLUGINTEMPLATE.prototype.setMoldFormFields = function(zshape) {
	try {
		/* add each custom mold to this one function as a case - no need to add additional hooks */
		/* zshape is name of my custom mold - all lowercase and no spaces */
		switch (zshape) {
			case 'mycustommold':
				/* define the labels and button names used on the form */
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit MyCustomMold';
				dGet('wtw_moldpositiontitle').innerHTML = 'MyCustomMold Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'MyCustomMold Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'MyCustomMold Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'MyCustomMold Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'MyCustomMold Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave MyCustomMold';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete MyCustomMold';
				/* show or hide the section divs on the form (/core/forms/mold.php) */
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.show('wtw_moldsubdivisions');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldscalediv');
				WTW.show('wtw_moldmergemoldsdiv');
				break;
		}
	} catch (ex) {
		WTW.log('plugins:devid-plugintemplate:scripts-custom_molds.js-setMoldFormFields=' + ex.message);
	}
}

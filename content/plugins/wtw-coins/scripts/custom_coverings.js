/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

WTW_COINS.prototype.addCoveringMyCustomCovering = function(zmoldname, zmolddef, zlenx, zleny, zlenz, zspecial1, zspecial2) {
	let zcovering;
	try {
		/* each custom Covering will have a separate function */
		let zopacity = 1;
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
		zcovering = new BABYLON.StandardMaterial(zmoldname + 'mat', scene);
		zcovering.alpha = zopacity;
		zcovering.specularColor = new BABYLON.Color3(Number(zmolddef.color.specular.r), Number(zmolddef.color.specular.g), Number(zmolddef.color.specular.b));
		zcovering.emissiveColor = new BABYLON.Color3(Number(zmolddef.color.emissive.r), Number(zmolddef.color.emissive.g), Number(zmolddef.color.emissive.b));
		zcovering.diffuseColor = new BABYLON.Color3(Number(zmolddef.color.diffuse.r), Number(zmolddef.color.diffuse.g), Number(zmolddef.color.diffuse.b));

		/* replace the zcovering directly with your material. */
		/* examples of existing coverings (materials) can be found at /core/scripts/coverings/wtw_basiccoverings.js */
		/* you can use one of the coverings as a base and build off it as needed */
		/* names of your additions should be: */
		/* zmoldname + '-DEVIDpartname' */
		/* where partname is whatever you want it to be (suggest 'mat' in the partname but not required). */

	} catch (ex) {
		WTW.log('plugins:wtw-coins:scripts-custom_coverings.js-addCoveringMyCustomCovering=' + ex.message);
	}
	return zcovering;
}

WTW_COINS.prototype.setCoveringFormFields = function(zcoveringname) {
	try {
		/* add each custom covering to this one function as a case - no need to add additional hooks */
		/* zcoveringname is name of my custom covering (material) - all lowercase and no spaces */
		switch (zcoveringname) {
			case 'mycustomcovering':
				/* show or hide the section divs on the MOLD form (/core/forms/mold.php) */
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldbumptexturetitle');
				WTW.show('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldbasictextureset2div');
				WTW.closeColorSelector();
				break;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-coins:scripts-custom_molds.js-setCoveringFormFields=' + ex.message);
	}
}

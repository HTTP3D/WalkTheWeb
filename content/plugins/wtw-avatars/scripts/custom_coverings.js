WTW_AVATARS.prototype.addCoveringMyCustomCovering = function(zmoldname, zmolddef, zlenx, zleny, zlenz, zspecial1, zspecial2) {
	let zcovering;
	try {
		/* each custom Covering will have a separate function */
		let opacity = 1;
		if (zmolddef.opacity != undefined) {
			if (WTW.isNumeric(zmolddef.opacity)) {
				opacity = Number(zmolddef.opacity) / 100;
				if (opacity > 1) {
					opacity = 1;
				} else if (opacity < 0) {
					opacity = 0;
				}
			}
		}
		zcovering = new BABYLON.StandardMaterial(zmoldname + "mat", scene);
		zcovering.alpha = opacity;
		zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
		zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
		zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
		zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);

		/* replace the covering directly with your material. */
		/* examples of existing coverings (materials) can be found at /core/scripts/coverings/wtw_basiccoverings.js */
		/* you can use one of the coverings as a base and build off it as needed */
		/* names of your additions should be: */
		/* zmoldname + "-DEVIDpartname" */
		/* where partname is whatever you want it to be (suggest 'mat' in the partname but not required). */

	} catch (ex) {
		WTW.log("plugins:wtw-avatars:scripts-custom_coverings.js-addCoveringMyCustomCovering=" + ex.message);
	}
	return zcovering;
}

WTW_AVATARS.prototype.setCoveringFormFields = function(coveringname) {
	try {
		/* add each custom covering to this one function as a case - no need to add additional hooks */
		/* coveringname is name of my custom covering (material) - all lowercase and no spaces */
		switch (coveringname) {
			case "mycustomcovering":
				/* show or hide the section divs on the MOLD form (/core/forms/mold.php) */
				WTW.show('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle');
				WTW.show('wtw_moldbumptexturetitle');
				WTW.show('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_moldbasictextureset2div');
				break;
		}
	} catch (ex) {
		WTW.log("plugins:wtw-avatars:scripts-custom_molds.js-setCoveringFormFields=" + ex.message);
	}
}

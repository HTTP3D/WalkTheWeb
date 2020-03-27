DEVID_PLUGINTEMPLATE.prototype.addCoveringMyCustomCovering = function(moldname, molddef, lenx, leny, lenz, special1, special2) {
	let covering;
	try {
		/* each custom Covering will have a separate function */
		let opacity = 1;
		if (molddef.opacity != undefined) {
			if (WTW.isNumeric(molddef.opacity)) {
				opacity = Number(molddef.opacity) / 100;
				if (opacity > 1) {
					opacity = 1;
				} else if (opacity < 0) {
					opacity = 0;
				}
			}
		}
		covering = new BABYLON.StandardMaterial(moldname + "mat", scene);
		covering.alpha = opacity;
		covering.specularColor = new BABYLON.Color3(Number(molddef.color.specular.r), Number(molddef.color.specular.g), Number(molddef.color.specular.b));
		covering.emissiveColor = new BABYLON.Color3(Number(molddef.color.emissive.r), Number(molddef.color.emissive.g), Number(molddef.color.emissive.b));
		covering.diffuseColor = new BABYLON.Color3(Number(molddef.color.diffuse.r), Number(molddef.color.diffuse.g), Number(molddef.color.diffuse.b));

		/* replace the covering directly with your material. */
		/* examples of existing coverings (materials) can be found at /core/scripts/coverings/wtw_basiccoverings.js */
		/* you can use one of the coverings as a base and build off it as needed */
		/* names of your additions should be: */
		/* moldname + "-DEVIDpartname" */
		/* where partname is whatever you want it to be (suggest 'mat' in the partname but not required). */

	} catch (ex) {
		WTW.log("plugins:devid-plugintemplate:scripts-custom_coverings.js-addCoveringMyCustomCovering=" + ex.message);
	}
	return covering;
}

DEVID_PLUGINTEMPLATE.prototype.setCoveringFormFields = function(coveringname) {
	try {
		/* add each custom covering to this one function as a case - no need to add additional hooks */
		/* coveringname is name of my custom covering (material) - all lowercase and no spaces */
		switch (coveringname) {
			case "mycustomcovering":
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
		WTW.log("plugins:devid-plugintemplate:scripts-custom_molds.js-setCoveringFormFields=" + ex.message);
	}
	return mold;
}

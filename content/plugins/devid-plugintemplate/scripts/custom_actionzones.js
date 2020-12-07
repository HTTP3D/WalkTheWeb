DEVID_PLUGINTEMPLATE.prototype.addActionZoneMyCustomZone = function(zactionzonename, zactionzoneind, zactionzonedef) {
	let zactionzone;
	try {
		/* each custom Action Zone will have a separate function */
		/* example is a Load Zone (but not built from queue) */
		zactionzone = scene.getMeshById(zactionzonename);
		if (zactionzone == null) {
			/* WTW.newMold() provides a basic shape definition object */
			let zmolddef = WTW.newMold();
			/* Shape, Position, Scaling, Rotation, and Parent Name are passed to the object on creation */
			zmolddef.shape = zactionzonedef.actionzoneshape;
			zmolddef.covering = "hidden";
			zmolddef.scaling.x = zactionzonedef.scaling.x;
			zmolddef.scaling.y = zactionzonedef.scaling.y;
			zmolddef.scaling.z = zactionzonedef.scaling.z;
			zmolddef.subdivisions = 12;
			zmolddef.opacity = 0;
			zmolddef.parentname = zactionzonedef.parentname;
			zmolddef.actionzoneind = zactionzoneind;
			zmolddef.checkcollisions = "0";
			zmolddef.ispickable = "0";
			/* create the action zone using the mold definition above */
			zactionzone = WTW.addMold(zactionzonename, zmolddef, zmolddef.parentname, zmolddef.covering);
			zactionzone.rotation.x = WTW.getRadians(zactionzonedef.rotation.x);
			zactionzone.rotation.y = WTW.getRadians(zactionzonedef.rotation.y);
			zactionzone.rotation.z = WTW.getRadians(zactionzonedef.rotation.z);
			zactionzone.isPickable = false;
			zactionzone.checkCollisions = false;
			zactionzone.position.x = zactionzonedef.position.x;
			zactionzone.position.y = zactionzonedef.position.y;
			zactionzone.position.z = zactionzonedef.position.z;
		}
		/* shown = "2" will keep it from adding a duplicate object while it is in the queue */
		WTW.actionZones[zactionzoneind].shown = "2";
		
		
		/* everything you create in this function should be parented to the above or using the basic Action Zones */
		/* yourobject.parent = zactionzone;
		/* so that your 3D Objects position, scaling, and rotatation work as child objects */
		/* if needed you can replace the zactionzone directly with your 3D Object. */
		/* examples of existing 3D Objects can be found at /core/scripts/actionzones/wtw_basicactionzones.js */
		/* you can use one of the Action Zones as a base and build off it as needed */
		/* names of your child objects and materials should be: */
		/* zactionzonename + "-DEVIDpartname" */
		/* where partname is whatever you want it to be. */


	} catch (ex) {
		WTW.log("plugins:devid-plugintemplate:scripts-custom_actionzones.js-addActionZoneMyCustomZone=" + ex.message);
	}
	return zactionzone;
}

DEVID_PLUGINTEMPLATE.prototype.setNewActionZoneDefaults = function(zactionzonetype) {
	try {
		/* add each custom action zone to this one function as a case - no need to add additional hooks */
		/* zactionzonetype is name of 'My Custom Zone' - all lowercase and no spaces */
		switch (zactionzonetype) {
			case "mycustomzone":
				dGet('wtw_tactionzonename').value = "New My Custom Zone";
				break;
		}
	} catch (ex) {
		WTW.log("plugins:devid-plugintemplate:scripts-custom_actionzones.js-setNewActionZoneDefaults=" + ex.message);
	}
}
		
DEVID_PLUGINTEMPLATE.prototype.setActionZoneFormFields = function(zactionzonetype) {
	try {
		/* add each custom action zone to this one function as a case - no need to add additional hooks */
		/* zactionzonetype is name of my custom action zone - all lowercase and no spaces */
		switch (zactionzonetype) {
			case "mycustomzone":
				/* define the labels and button names used on the form */
				dGet('wtw_editactionzoneformtitle').innerHTML = "Add My Custom Zone";
				dGet('wtw_tcopyaxletoactionzone').disabled = true;
				/* show or hide the section divs on the form (/core/forms/actionzone.php) */
				WTW.hide('wtw_actionzoneaxisdiv');
				WTW.hide('wtw_copyaxletoactionzonediv');
				WTW.hide('wtw_actionzoneadvancedoptslink');
				WTW.hide('wtw_actionzonepartsdiv');
				WTW.show('wtw_actionzoneadvancedopts');
				break;
		}
	} catch (ex) {
		WTW.log("plugins:devid-plugintemplate:scripts-custom_actionzones.js-setActionZoneFormFields=" + ex.message);
	}
}
		
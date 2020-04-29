WTW_AVATARS.prototype.addMoldMyCustomMold = function(moldname, molddef, lenx, leny, lenz) {
	let mold;
	try {
		/* each custom mold will have a separate function */
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,leny,lenz);
		mold.material = WTW.addCovering("hidden", moldname, molddef, lenx, leny, lenz, "0", "0");
		mold.material.alpha = 0;
		
		/* everything you create in this function should be parented to the above invisible Box: */
		/* yourobject.parent = mold;
		/* so that your 3D Objects position, scaling, and rotatation work as child objects */
		/* if needed you can replace the mold directly with your 3D Object. */
		/* examples of existing 3D Objects can be found at /core/scripts/molds/wtw_basicmolds.js */
		/* you can use one of the 3D Objects as a base and build off it as needed */
		/* names of your child objects and materials should be: */
		/* moldname + "-DEVIDpartname" */
		/* where partname is whatever you want it to be. */

	} catch (ex) {
		WTW.log("plugins:wtw-avatars:scripts-custom_molds.js-addMoldMyCustomMold=" + ex.message);
	}
	return mold;
}

WTW_AVATARS.prototype.setNewMoldDefaults = function(shape, positionX, positionY, positionZ, rotationY) {
	try {
		/* add each custom mold to this one function as a case - no need to add additional hooks */
		/* shape is name of my custom mold - all lowercase and no spaces */
		switch (shape) {
			case "mycustommold":
				/* position x, y, x and rotationy are calculated from the current camera position so it is in front of the camera */
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
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
		}
	} catch (ex) {
		WTW.log("plugins:wtw-avatars:scripts-custom_molds.js-setNewMoldDefaults=" + ex.message);
	}
}

WTW_AVATARS.prototype.setMoldFormFields = function(shape) {
	try {
		/* add each custom mold to this one function as a case - no need to add additional hooks */
		/* shape is name of my custom mold - all lowercase and no spaces */
		switch (shape) {
			case "mycustommold":
				/* define the labels and button names used on the form */
				dGet('wtw_editmoldformtitle').innerHTML = "Edit MyCustomMold";
				dGet('wtw_moldpositiontitle').innerHTML = "MyCustomMold Position";
				dGet('wtw_moldscalingtitle').innerHTML = "MyCustomMold Length";
				dGet('wtw_moldrotationtitle').innerHTML = "MyCustomMold Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "MyCustomMold Texture Image";
				dGet('wtw_moldbumptexturetitle').innerHTML = "MyCustomMold Bump Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave MyCustomMold";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete MyCustomMold";
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
		WTW.log("plugins:wtw-avatars:scripts-custom_molds.js-setMoldFormFields=" + ex.message);
	}
	return mold;
}

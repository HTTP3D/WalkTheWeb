// All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors
// "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. 
// Read the included GNU Ver 3.0 license file for details and additional release information.

function DEVID_PLUGINTEMPLATE() {
	/* Add your global variables as needed here */
	this.ver = "1.0.0";
}

/* Create the class instance */
let devidplugintemplate = new DEVID_PLUGINTEMPLATE();

/* Add functions as needed to your class */
/* for simplicity, try to name the functions the same as the original WTW function name it is hooked into */
/* this is an example of an onClick function */
/* activate it with the core WTW.onclick function hook */
/* in the plugin/functions/class_plugin.php initHooks and initAdminOnlyHooks functions. */

DEVID_PLUGINTEMPLATE.prototype.onClick = function(pickedname) {
	try {
		pickedname = pickedname.toLowerCase();
		let moldnameparts = WTW.getMoldnameParts(pickedname);
		/* using moldnameparts, you can get the following values:
          moldnameparts.moldname is the moldname (pickedname)
          moldnameparts.moldind is the index number for the mold array
          moldnameparts.moldid is the unique ID of the mold (database table key value reference)
          moldnameparts.cgind is the connecting grid index number (WTW.connectingGrids[moldnameparts.cgind] gives you the 3D Object definition)
          moldnameparts.cgid is the unique ID of the Connecting Grid (database table key value reference)
          moldnameparts.communityid is the unique ID for the 3D Community related to this 3D Object (only has a value when is a WTW.communityMolds).
          moldnameparts.buildingid is the unique ID for the 3D Building related to this 3D Object (only has a value when is a WTW.buildingMolds).
          moldnameparts.thingid is the unique ID for the 3D Thing related to this 3D Object (only has a value when is a WTW.thingMolds).
          moldnameparts.moldgroup identifies what kind of 3D object it is; building, community, or thing.
          moldnameparts.molds is the Array for the Mold; WTW.communityMolds, WTW.buildingMolds, or WTW.thingMolds.
          moldnameparts.shape is the Mold shape which identifies the function used to create the Mold (mesh).
          moldnameparts.namepart is an array of the segments of the name split by the hyphen '-'. This is useful for checking the additional optional values and current state.
          moldnameparts.parentname is the full name of the parent 3D Object.

		  moldnameparts.molds[moldnameparts.moldind] provides the whole 3D Object definition
		  see /core/scripts/prime/wtw_objectdefinitions.js for full object references
		  

		*/		
		/* use indexOf function or the moldnameparts to set conditional code for the selected 3D Object */
		/* in this example, the pickedname has a name part "wtwpaintballgun1a" */
		/* when the 3D Object is clicked, the Avatar picks up the 3D Object in the righthand */
		/* using the offset Position, Scaling, and Rotation set below */
		/* note the offset is from an avatar in the T-Pose with palm of the hand facing down */
		/* 		x = arm to finger tips axis direction */
		/* 		y = palm to back of hand axis direction */
		/* 		z = first finger to forth finger axis direction */
		if (pickedname.indexOf("wtwpaintballgun1a") > -1) {
			let zoffset = {
				'position': {
					'x':-.77,
					'y':-0.33,
					'z':.2
				},
				'scaling': {
					'x':1,
					'y':1,
					'z':1
				},
				'rotation': {
					'x':89,
					'y':50,
					'z':78
				}
			};
			/* the current user avatar is named "myavatar-" + dGet("wtw_tinstanceid").value */
			/* pick up object function (avatarname, objectname, attachpoint, offset) */
			/* attachpoints can be found /core/scripts/avatars/basicavatars.js */
			WTW.pickUpObject("myavatar-" + dGet("wtw_tinstanceid").value, pickedname, 'righthand', zoffset);
		}
	} catch (ex) {
		WTW.log("plugins:devid-plugintemplate:scripts-class_main.js-onClick=" + ex.message);
	} 
}

DEVID_PLUGINTEMPLATE.prototype.checkActionZone = function(zactionzonename, zactionzoneind, zmeinzone, zothersinzone) {
	try {
		/* this function runs while your avatar (or another avatar in multiplayer) changes position */
		/* use zmeinzone and zothersinzone to trigger a function based on your zone type */
		/* this example checks if my avatar is in a load animations zone */
		/* if so, it calls the funtion to add the zone required animations to my avatar */
		if (zmeinzone) {
			if (zactionzonename.indexOf("loadanimations") > -1) {
				WTW.checkLoadAnimations(zactionzoneind);
			}
		}
	} catch (ex) {
		WTW.log("plugins:devid-plugintemplate:scripts-class_main.js-checkActionZone=" + ex.message);
	} 
}

DEVID_PLUGINTEMPLATE.prototype.setAvatarMovement = function(zavatar, zkey, zweight) {
	try {
		/* this function sets the positon (movement) of an avatar while a specific animation plays */
		/* zkey is the name of the animation */
		/* group animations can be set using the global variable: */
		/* WTW.animationSet = 'riffle'; */
		/* so that onwait becomes onwait-riffle animation if it exists */
		switch (zkey) {
			case "onwait-riffle":
				let zstride = WTW.init.gravity * 15 * zavatar.WTW.animations.running[zkey].weight * WTW.walkSpeed / WTW.fps;
				let zmove = WTW.getMoveDownVector(zavatar.name, -zstride);
				zavatar.moveWithCollisions(zmove);
				break;
			case "onwalk-riffle":
				if (WTW.moveOverride == 0) {
					let zstride = 15 * zavatar.WTW.animations.running[zkey].weight * WTW.walkSpeed / WTW.fps;
					zavatar.WTW.animations.running[zkey].speedRatio = WTW.walkAnimationSpeed;
					let zmove = WTW.getMoveVector(zavatar.name, 0, zstride);
					zavatar.moveWithCollisions(zmove);
				}
				break;
		}
	} catch (ex) {
		WTW.log("plugins:devid-plugintemplate:scripts-class_main.js-setAvatarMovement=" + ex.message);
	} 
	return zweight;
}

DEVID_PLUGINTEMPLATE.prototype.checkHovers = function(moldname, shape) {
	try {
		/* this function activates on hover over a 3D Object */
		/* useful if you want to change material, highlighting, or prompt a response */
		moldname = moldname.toLowerCase();
		if (moldname.indexOf("golfball") > -1) {
			
		}
	} catch (ex) {
		WTW.log("plugins:devid-plugintemplate:scripts-class_main.js-checkHovers=" + ex.message);
	} 
}

DEVID_PLUGINTEMPLATE.prototype.resetHovers = function(moldname, shape) {
	try {
		/* this function activates on lost focus (end hover) from a 3D Object */
		/* useful if you want to change material back, unhighlighting, or close a prompt */
		moldname = moldname.toLowerCase();
		if (moldname.indexOf("golfball") > -1) {
			
		}
	} catch (ex) {
		WTW.log("plugins:devid-plugintemplate:scripts-class_main.js-resetHovers=" + ex.message);
	} 
}

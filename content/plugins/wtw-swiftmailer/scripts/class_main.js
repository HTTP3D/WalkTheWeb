// All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors
// "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. 
// Read the included GNU Ver 3.0 license file for details and additional release information.

function WTW_SwiftMailer() {
	/* Add your global variables as needed here */
	this.ver = "1.0.0";
}

/* Create the class instance */
let wtwswiftmailer = new WTW_SwiftMailer();

/* Add functions as needed to your class */
/* for simplicity, try to name the functions the same as the original WTW function name it is hooked into */
/* this is an example of an onClick function */
/* activate it with the core WTW.onclick function hook */
/* in the plugin/functions/class_plugin.php initHooks and initAdminOnlyHooks functions. */

WTW_SwiftMailer.prototype.onClick = function(pickedname) {
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
	} catch (ex) {
		WTW.log("plugins:wtw-swiftmailer:scripts-class_main.js-onClick=" + ex.message);
	} 
}


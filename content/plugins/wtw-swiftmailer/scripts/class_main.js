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

WTW_SwiftMailer.prototype.onClick = function(zpickedname) {
	try {
		zpickedname = zpickedname.toLowerCase();
		let zmoldnameparts = WTW.getMoldnameParts(zpickedname);
		/* using zmoldnameparts, you can get the following values:
          zmoldnameparts.moldname is the moldname (zpickedname)
          zmoldnameparts.moldind is the index number for the mold array
          zmoldnameparts.moldid is the unique ID of the mold (database table key value reference)
          zmoldnameparts.cgind is the connecting grid index number (WTW.connectingGrids[zmoldnameparts.cgind] gives you the 3D Object definition)
          zmoldnameparts.cgid is the unique ID of the Connecting Grid (database table key value reference)
          zmoldnameparts.communityid is the unique ID for the 3D Community related to this 3D Object (only has a value when is a WTW.communityMolds).
          zmoldnameparts.buildingid is the unique ID for the 3D Building related to this 3D Object (only has a value when is a WTW.buildingMolds).
          zmoldnameparts.thingid is the unique ID for the 3D Thing related to this 3D Object (only has a value when is a WTW.thingMolds).
          zmoldnameparts.moldgroup identifies what kind of 3D object it is; building, community, or thing.
          zmoldnameparts.molds is the Array for the Mold; WTW.communityMolds, WTW.buildingMolds, or WTW.thingMolds.
          zmoldnameparts.shape is the Mold shape which identifies the function used to create the Mold (mesh).
          zmoldnameparts.namepart is an array of the segments of the name split by the hyphen '-'. This is useful for checking the additional optional values and current state.
          zmoldnameparts.parentname is the full name of the parent 3D Object.

		  zmoldnameparts.molds[zmoldnameparts.moldind] provides the whole 3D Object definition
		  see /core/scripts/prime/wtw_objectdefinitions.js for full object references
		*/
	} catch (ex) {
		WTW.log("plugins:wtw-swiftmailer:scripts-class_main.js-onClick=" + ex.message);
	} 
}


// All code is Copyright 2013-2021 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors
// "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. 
// Read the included GNU Ver 3.0 license file for details and additional release information.

function WTW_COINS() {
	/* Add your global variables as needed here */
	this.ver = "1.0.0";
	this.coinRotation = null;
}

/* Create the class instance */
let wtwcoins = new WTW_COINS();

/* Add functions as needed to your class */
/* for simplicity, try to name the functions the same as the original WTW function name it is hooked into */
/* this is an example of an onClick function */
/* activate it with the core WTW.onclick function hook */
/* in the plugin/functions/class_plugin.php initHooks and initAdminOnlyHooks functions. */

WTW_COINS.prototype.onClick = function(zpickedname) {
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
		WTW.log("plugins:wtw-coins:scripts-class_main.js-onClick=" + ex.message);
	} 
}

WTW_COINS.prototype.mouseClickRightAdmin = function(e, zpickedname) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zpickedname);
		if (zmoldnameparts.shape == 'wtwcoin') {
			/* get actionzone holding coin */
			var znameparts = zpickedname.split('-');
			zpickedname = znameparts[0] + '-' + znameparts[1] + '-' + znameparts[2] + '-' + znameparts[3] + '-' + znameparts[4] + '-' + znameparts[5];
			
			/* Edit Action Zone */
			wtwcoins.editCoin(zpickedname);
			
			/* prevent the right context menu from opening */
			e.preventDefault();
			/* since it is a match with wtwcoin, we do not need to continue to process the right click function */
			return false;
		}
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-class_main.js-mouseClickRightAdmin=" + ex.message);
	} 
}

WTW_COINS.prototype.checkActionZone = function(zactionzonename, zactionzoneind, zmeinzone, zothersinzone) {
	try {
		/* this function runs while your avatar (or another avatar in multiplayer) changes position */
		/* use zmeinzone and zothersinzone to trigger a function based on your zone type */
		/* this example checks if my avatar is in a load animations zone */
		/* if so, it calls the funtion to add the zone required animations to my avatar */
		if (zmeinzone) {
			if (zactionzonename.indexOf("coins") > -1) {
				WTW.checkLoadAnimations(zactionzoneind);
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-class_main.js-checkActionZone=" + ex.message);
	} 
}

WTW_COINS.prototype.checkHovers = function(zmoldname, zshape) {
	try {
		/* this function activates on hover over a 3D Object */
		/* useful if you want to change material, highlighting, or prompt a response */
		zmoldname = zmoldname.toLowerCase();

	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-class_main.js-checkHovers=" + ex.message);
	} 
}

WTW_COINS.prototype.resetHovers = function(zmoldname, zshape) {
	try {
		/* this function activates on lost focus (end hover) from a 3D Object */
		/* useful if you want to change material back, unhighlighting, or close a prompt */
		zmoldname = zmoldname.toLowerCase();

	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-class_main.js-resetHovers=" + ex.message);
	} 
}

WTW_COINS.prototype.toggleWTWGhostCoins = function(zenable) {
	/* toggle to show or hide the ghost coins when revisit website */
	try {
		if (zenable != undefined) {
			if (zenable == 1) {
				WTW.setCookie("wtwghostcoins", '1', 365);
				dGet('wtwcoins_showghostcoins').checked = true;
				dGet('wtwcoins_showghostcoinstext').className = 'wtw-enablelabel';
				dGet('wtwcoins_showghostcoinstext').innerHTML = 'Visible';
			} else {
				WTW.setCookie("wtwghostcoins", '0', 365);
				dGet('wtwcoins_showghostcoins').checked = false;
				dGet('wtwcoins_showghostcoinstext').className = 'wtw-disabledlabel';
				dGet('wtwcoins_showghostcoinstext').innerHTML = 'Hidden';
			}
		} else {
			if (dGet('wtwcoins_showghostcoins').checked) {
				WTW.setCookie("wtwghostcoins", '1', 365);
				dGet('wtwcoins_showghostcoinstext').className = 'wtw-enablelabel';
				dGet('wtwcoins_showghostcoinstext').innerHTML = 'Visible';
			} else {
				WTW.setCookie("wtwghostcoins", '0', 365);
				dGet('wtwcoins_showghostcoinstext').className = 'wtw-disabledlabel';
				dGet('wtwcoins_showghostcoinstext').innerHTML = 'Hidden';
			}
		}
		wtwcoins.showGhostCoins();
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-class_main.js-toggleWTWGhostCoins=" + ex.message);
	} 
}

WTW_COINS.prototype.loadUserSettings = function() {
	/* load settings when user loads the website */
	try {
		var zghostcoins = WTW.getCookie("wtwghostcoins");
		if (zghostcoins != null) {
			if (WTW.isNumeric(zghostcoins)) {
				if (Number(zghostcoins) == 1) {
					wtwcoins.toggleWTWGhostCoins(1);
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-class_main.js-loadUserSettings=" + ex.message);
	} 
}



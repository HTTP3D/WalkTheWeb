/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions are for input (touch, mouse, or keyboard) during admin mode only (input events extend to these functions) */

WTWJS.prototype.mouseDownAdmin = function(e) {
	/* mouse down event */
	try {
		WTW.selectPick(e);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admininput.js-mouseDownAdmin=" + ex.message);
    }
}

WTWJS.prototype.mouseUpAdmin = function(e) {
	/* mouse up event */
	try {
		WTW.changeStop();
		if (WTW.moveZ != null) {
			return false;
		} else {
			return true;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admininput.js-mouseUpAdmin=" + ex.message);
    }
}

WTWJS.prototype.mouseClickAdmin = function(e) {
	/* mouse click event */
	try {
		WTW.selectPick(e);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admininput.js-mouseClickAdmin=" + ex.message);
    }
}

WTWJS.prototype.mouseClickRightAdmin = function(e) {
	/* mouse right click event */
	try {
		WTW.pick = 1;
		var pickedname = "";
		var pickedResult = scene.pick(e.clientX, e.clientY);
		if (pickedResult.pickedMesh == null) {
			pickedResult.pickedMesh = scene.getMeshByID(WTW.currentID);
			pickedname = WTW.currentID;
		} else {
				pickedname = pickedResult.pickedMesh.name;
		}
		if (pickedname.indexOf('babylonfile-') > -1 && pickedResult.pickedMesh == null) {
			var nameparts = pickedname.split('-');
			pickedname = nameparts[0] + "-" + nameparts[1] + "-" + nameparts[2] + "-" + nameparts[3] + "-" + nameparts[4] + "-" + nameparts[5];
			pickedResult.pickedMesh = scene.getMeshByID(pickedname);
		}
		if (pickedResult.pickedMesh != null) {
			var pickedmesh = pickedResult.pickedMesh;
			if (dGet('wtw_tmoldname').value != '') {
				var firstmold = null;
				var nextmoldind = -1;
				var found = 0;
				var result = scene.multiPick(e.clientX, e.clientY);
				for (var i=0;i < result.length;i++) {
					firstmold = WTW.getMoldBase(result[0].pickedMesh);
					var resultmold = WTW.getMoldBase(result[i].pickedMesh);
					if (resultmold.name == dGet('wtw_tmoldname').value) {
						nextmoldind = i + 1;
						found = 1;
					}
				}
				if (found == 0) {
				} else if (result[nextmoldind] != null) {
					pickedmesh = WTW.getMoldBase(result[nextmoldind].pickedMesh);
				} else if (firstmold != null) {
					pickedmesh = firstmold;
				}
			}
			var mold = WTW.getMoldBase(pickedmesh);
			if (mold != null) {
				dGet('wtw_tmoldname').value = mold.name;
				WTW.loadPickedObject(mold);
			}
		} else if (pickedname != '') {
			var nameparts = pickedname.split('-');
			pickedname = nameparts[0] + "-" + nameparts[1] + "-" + nameparts[2] + "-" + nameparts[3] + "-" + nameparts[4] + "-" + nameparts[5];
			dGet('wtw_tmoldname').value = pickedname;
			var mold = scene.getMeshByID(pickedname);
			WTW.loadPickedObject(mold);
		}
		e.preventDefault();
		return false;
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admininput.js-mouseClickRightAdmin=" + ex.message);
    }
}

WTWJS.prototype.mouseOverMoldAdmin = function(tagmesh, currentid) {
	/* mouse hover over mold (mesh) in 3D Scene */
	try {
		if (dGet('wtw_bfocus').title == "Focus Highlight is On") {
			if ((WTW.currentID.indexOf("communitymold") > -1 && communityid != "") || (WTW.currentID.indexOf("buildingmold") > -1 && buildingid != "") || (WTW.currentID.indexOf("thingmold") > -1 && thingid != "")) {
				WTW.hilightMold(WTW.currentID, 'green');
			}
			var namepart;
			if (currentid.indexOf("-") > -1) {
				namepart = currentid.split('-');
			}
			var mold = null;
			if (namepart[0].indexOf("buildingmolds") > -1 && buildingid == "") {
				if (tagmesh.meshUnderPointer.parent != null) {
					mold = tagmesh.meshUnderPointer.parent;
					while (mold.name.indexOf("connectinggrids") == -1 && mold.parent != null) {
						mold = mold.parent;
					}
				}
			} else if (namepart[0].indexOf("thingmolds") > -1 && thingid == "") {
				if (tagmesh.meshUnderPointer.parent != null) {
					mold = tagmesh.meshUnderPointer.parent;
					while (mold.name.indexOf("connectinggrids") == -1 && mold.parent != null) {
						mold = mold.parent;
					}
				}
			} else if (namepart[0].indexOf("molds") > -1) {
				mold = tagmesh.meshUnderPointer;
			}
			if (mold != null) {
				//add code to get parent mold (connecting grid) from moldname part
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admininput.js-mouseOverMoldAdmin=" + ex.message);
    }
}

WTWJS.prototype.selectPick = function(e) {
	/* when WTW.pick global variable is set, mouse can click (and mouse down) on and select a mold in the 3D Scene */
	/* this is used to merge molds, add molds to action zones (swinging door parts) */
	try {
		if (WTW.moveZ != null && WTW.pick != 2) {
		} else if (WTW.pick == 1) {	
			/* nothing picked or no mold clicked on in 3D Scene */
		} else if (WTW.pick == 2) {
			/* mold selected */
			var pickedResult = scene.pick(WTW.mouseX, WTW.mouseY);
			if (pickedResult.pickedMesh == null) {
				pickedResult.pickedMesh = scene.getMeshByID(WTW.currentID);
			}
			var mold = null;
			if (pickedResult.pickedMesh != null) {
				if (pickedResult.pickedMesh.name.indexOf("molds-") > -1) {
					mold = pickedResult.pickedMesh;
				}
			}
			if (mold != null && mold != undefined) {
				if (dGet('wtw_baddactionzonepart').innerHTML == "Cancel Pick Shape") {
					/* pick came from action zone form */
					WTW.addActionZonePart(dGet('wtw_tactionzoneid').value, mold);
				} else if (dGet('wtw_bselectcsgshape').innerHTML == "Cancel Pick Shape") {
					/* pick came from mold form */
					WTW.addMergePart(mold);
				}
			}
		} else {
			return true;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admininput.js-selectPick=" + ex.message);
	}
}

WTWJS.prototype.changePick = function(w) {
	/* reset pick global variable to select a mold */
	try {
	    if (w == 1) {
			WTW.pick = 0;
		} else {
			WTW.pick = 1;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admininput.js-changePick=" + ex.message);
	}
}

WTWJS.prototype.loadPickedObject = function(mold) {
	/* after item is picked, load picked mold form */
	try {
		if (mold != null) {
			if (mold.name.indexOf("-") > -1) {
				let moldnameparts = WTW.getMoldnameParts(mold.name);
				if (moldnameparts.moldind > -1) {
					if (moldnameparts.cgind > 0) {
						WTW.openConnectingGridsForm(moldnameparts.cgind);
					} else if (moldnameparts.moldgroup == "thing" || moldnameparts.moldgroup == "building" || moldnameparts.moldgroup == "community") {
						/* selected object is a mold from the current object in edit mode */
						dGet('wtw_tnewmold').value = "0";
						/* open mold form for selected mold to edit it */
						WTW.openMoldForm(moldnameparts.moldind,moldnameparts.shape,moldnameparts.moldgroup); 
					} else {
						/* try again */
						WTW.changePick(1);
					}
				} else {
					/* try again */
					WTW.changePick(1);
				}
			} else {
				/* try again */
				WTW.changePick(1);
			}
		} else {
			/* try again */
			WTW.changePick(1);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admininput.js-loadPickedObject=" + ex.message);
	}
}


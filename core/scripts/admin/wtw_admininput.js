/* All code is Copyright 2013-2019 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

WTWJS.prototype.mouseDownAdmin = function(e) {
	try {
		if (WTW.moveTimer != null) {
			window.clearInterval(WTW.moveTimer);
			WTW.moveTimer = null;
		}
		WTW.selectPick(e);
	} catch (ex) {
		WTW.log("admininput-mouseDownAdmin=" + ex.message);
    }
}

WTWJS.prototype.mouseUpAdmin = function(e) {
	try {
		if (WTW.moveTimer != null) {
			window.clearInterval(WTW.moveTimer);
			WTW.moveTimer = null;
		}
		WTW.changeStop();
		if (WTW.moveZ != null) {
			return false;
		} else {
			return true;
		}
	} catch (ex) {
		WTW.log("admininput-mouseUpAdmin=" + ex.message);
    }
}

WTWJS.prototype.mouseClickAdmin = function(e) {
	try {
		WTW.selectPick(e);
	} catch (ex) {
		WTW.log("admininput-mouseClickAdmin=" + ex.message);
    }
}

WTWJS.prototype.mouseClickRightAdmin = function(e) {
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
		}
		e.preventDefault();
		return false;
	} catch (ex) {
		WTW.log("admininput-mouseClickRightAdmin=" + ex.message);
    }
}

WTWJS.prototype.getMoldBase = function(pickedmesh) {
	var mold = null;
	try {
		if (pickedmesh.name.indexOf("buildingmolds") > -1 && buildingid == "") {
			mold = pickedmesh.parent;
			while (mold.name.indexOf("connectinggrids") == -1) {
				mold = mold.parent;
			}
		} else if (pickedmesh.name.indexOf("thingmolds") > -1 && thingid == "") {
			mold = pickedmesh.parent;
			while (mold.name.indexOf("connectinggrids") == -1) {
				mold = mold.parent;
			}
		} else {
			mold = pickedmesh;
		}
	} catch (ex) {
		WTW.log("admininput-getMoldBase=" + ex.message);
    }
	return mold;
}

WTWJS.prototype.mouseOverMoldAdmin = function(tagmesh, currentid) {
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
		WTW.log("admininput-mouseOverMoldAdmin=" + ex.message);
    }
}
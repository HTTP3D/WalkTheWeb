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
		if (dGet('wtw_bfocus').alt == "Focus Highlight is On") {
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
			if (mold != null) {
				if ((WTW.adminMenu == 6 || WTW.adminMenu == 26 || WTW.adminMenu == 10 || WTW.adminMenu == 11 || WTW.adminMenu == 12 || WTW.adminMenu == 15 || WTW.adminMenu == 20) && mold.name.indexOf("connectinggrids") > -1) {
					var parts = mold.getChildren();
					if (parts != null) {
						for (var i=0; i < parts.length;i++) {
							if (parts[i].name.indexOf("actionzone") == -1) {
								WTW.highlightMold(parts[i], "#FFFF00");
								var subparts = parts[i].getChildren();
								if (subparts != null) {
									for (var j=0; j < subparts.length;j++) {
										if (subparts[j].name.indexOf("actionzone") == -1) {
											WTW.highlightMold(subparts[j], "#FFFF00");
											var subsubparts = subparts[j].getChildren();
											if (subsubparts != null) {
												for (var k=0; k < subsubparts.length;k++) {
													if (subsubparts[k].name.indexOf("actionzone") == -1) {
														WTW.highlightMold(subsubparts[k], "#FFFF00");
													}
												}
											}
										}
									}
								}
							}
						}
					}
				} else if ((WTW.adminMenu == 26 || WTW.adminMenu == 10 || WTW.adminMenu == 11 || WTW.adminMenu == 12 || WTW.adminMenu == 15 || WTW.adminMenu == 20 || WTW.adminMenu == 40 || WTW.adminMenu == 41 || WTW.adminMenu == 42 || WTW.adminMenu == 43) && namepart[0].indexOf("community") > -1 && namepart[5] != "terrain") {
					WTW.highlightMold(mold, "#008000");
				} else if ((WTW.adminMenu == 26 || WTW.adminMenu == 10 || WTW.adminMenu == 11 || WTW.adminMenu == 12 || WTW.adminMenu == 15 || WTW.adminMenu == 20 || WTW.adminMenu == 40 || WTW.adminMenu == 41 || WTW.adminMenu == 42 || WTW.adminMenu == 43) && namepart[0].indexOf("community") > -1 && namepart[5] == "terrain") {
					WTW.highlightMold(mold, "#800080");
				} else if ((WTW.adminMenu == 6 || WTW.adminMenu == 10 || WTW.adminMenu == 11 || WTW.adminMenu == 12 || WTW.adminMenu == 15 || WTW.adminMenu == 20) && namepart[0].indexOf("building") > -1) {
					WTW.highlightMold(mold, "#008000");
				} else if ((WTW.adminMenu == 10 || WTW.adminMenu == 11 || WTW.adminMenu == 12 || WTW.adminMenu == 15 || WTW.adminMenu == 20 || WTW.adminMenu == 36) && namepart[0].indexOf("thing") > -1) {
					WTW.highlightMold(mold, "#008000");
				}
			}
		}
	} catch (ex) {
		WTW.log("admininput-mouseOverMoldAdmin=" + ex.message);
    }
}
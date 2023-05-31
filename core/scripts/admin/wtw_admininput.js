/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions are for input (touch, mouse, or keyboard) during admin mode only (input events extend to these functions) */

WTWJS.prototype.mouseDownAdmin = function(e) {
	/* mouse down event */
	try {
		WTW.selectPick(e);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_admininput.js-mouseDownAdmin=' + ex.message);
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
		WTW.log('core-scripts-admin-wtw_admininput.js-mouseUpAdmin=' + ex.message);
    }
}

WTWJS.prototype.mouseClickAdmin = function(zevent) {
	/* mouse click event */
	try {
		WTW.selectPick(zevent);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_admininput.js-mouseClickAdmin=' + ex.message);
    }
}

WTWJS.prototype.mouseClickRightAdmin = function(zevent) {
	/* mouse right click event */
	try {
		WTW.pick = 1;
		var zpickedname = WTW.pickMoldNameByRenderingGroup(zevent);
		var zpickedmold = WTW.getMeshOrNodeByID(zpickedname);
		if (avatarid != '' && zpickedname.indexOf('editavatar') > -1) {
			/* edit avatar - for setting a color of a mold */
			zpickedmold = WTW.getMeshOrNodeByID(zpickedname);
		} else if (zpickedname != '') {
			/* get base name for molds with multiple parts */
			var znameparts = zpickedname.split('-');
			zpickedname = znameparts[0] + '-' + znameparts[1] + '-' + znameparts[2] + '-' + znameparts[3] + '-' + znameparts[4] + '-' + znameparts[5] + '-' + znameparts[6];
			dGet('wtw_tmoldname').value = zpickedname;
			zpickedmold = WTW.getMeshOrNodeByID(zpickedname);
			
		}
		/* allow plugins to use the picked name */
		WTW.pluginsMouseClickRightAdmin(zevent, zpickedname);
		
		/* WalkTheWeb built-in right mouse click functions */
		if (zpickedmold != null) {
			WTW.loadPickedObject(zpickedmold);
		}
		zevent.preventDefault();
		return false;
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_admininput.js-mouseClickRightAdmin=' + ex.message);
    }
}

WTWJS.prototype.mouseOverMoldAdmin = function(ztagmesh, zcurrentid) {
	/* mouse hover over mold (mesh) in 3D Scene */
	try {
		if (dGet('wtw_bfocus') != null) {
			if (dGet('wtw_bfocus').title == 'Focus Highlight is On') {
				if ((WTW.currentID.indexOf('communitymold') > -1 && communityid != '') || (WTW.currentID.indexOf('buildingmold') > -1 && buildingid != '') || (WTW.currentID.indexOf('thingmold') > -1 && thingid != '')) {
					WTW.hilightMold(WTW.currentID, 'green');
				}
				var znamepart = WTW.getMoldnameParts(zcurrentid);
				var zmold = null;
				if (znamepart.webset.indexOf('buildingmolds') > -1 && buildingid == '') {
					if (ztagmesh.parent != null) {
						zmold = ztagmesh.parent;
						while (zmold.name.indexOf('connectinggrids') == -1 && zmold.parent != null) {
							zmold = zmold.parent;
						}
					}
				} else if (znamepart.webset.indexOf('thingmolds') > -1 && thingid == '') {
					if (ztagmesh.parent != null) {
						zmold = ztagmesh.parent;
						while (zmold.name.indexOf('connectinggrids') == -1 && zmold.parent != null) {
							zmold = zmold.parent;
						}
					}
				} else if (znamepart.webset.indexOf('molds') > -1) {
					zmold = ztagmesh;
				}
				if (zmold != null) {
					//add code to get parent mold (connecting grid) from moldname part
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_admininput.js-mouseOverMoldAdmin=' + ex.message);
    }
}

WTWJS.prototype.selectPick = function(zevent) {
	/* when WTW.pick global variable is set, mouse can click (and mouse down) on and select a mold in the 3D Scene */
	/* this is used to merge molds, add molds to action zones (swinging door parts) */
	try {
		if (WTW.moveZ != null && WTW.pick != 2) {
		} else if (WTW.pick == 1) {	
			/* nothing picked or no mold clicked on in 3D Scene */
		} else if (WTW.pick == 2) {
			/* mold selected */
			var zpickedname = WTW.pickMoldNameByRenderingGroup(zevent);
			if (zpickedname.indexOf('molds-') > -1) {
				zmold = WTW.getMeshOrNodeByID(zpickedname);
			}
			
			if (zmold != null && zmold != undefined) {
				if (dGet('wtw_baddactionzonepart').innerHTML == 'Cancel Pick Shape') {
					/* pick came from action zone form */
					WTW.addActionZonePart(dGet('wtw_tactionzoneid').value, zmold);
				} else if (dGet('wtw_bselectcsgshape').innerHTML == 'Cancel Pick Shape') {
					/* pick came from mold form */
					WTW.addMergePart(zmold);
				}
			}
		} else {
			return true;
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_admininput.js-selectPick=' + ex.message);
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
		WTW.log('core-scripts-admin-wtw_admininput.js-changePick=' + ex.message);
	}
}

WTWJS.prototype.loadPickedObject = function(zmold) {
	/* after item is picked, load picked mold form */
	try {
		if (zmold != null) {
			if (zmold.name.indexOf('-') > -1) {
				/* check if you are editing an avatar part color */
				if (avatarid != '' && zmold.name.indexOf('editavatar') > -1) {
					WTW.openAvatarColorByMold(zmold);
				} else {
					let zmoldnameparts = WTW.getMoldnameParts(zmold.name);
					if (zmoldnameparts.moldind > -1) {
						if (zmoldnameparts.cgind > 0) {
							WTW.openConnectingGridsForm(zmoldnameparts.cgind);
						} else if (zmoldnameparts.webtype == 'thing' || zmoldnameparts.webtype == 'building' || zmoldnameparts.webtype == 'community') {
							/* selected object is a mold from the current object in edit mode */
							dGet('wtw_tnewmold').value = '0';
							/* open mold form for selected mold to edit it */
							WTW.openMoldForm(zmoldnameparts.moldind,zmoldnameparts.shape,zmoldnameparts.webtype); 
						} else {
							/* try again */
							WTW.changePick(1);
						}
					} else {
						/* try again */
						WTW.changePick(1);
					}
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
		WTW.log('core-scripts-admin-wtw_admininput.js-loadPickedObject=' + ex.message);
	}
}


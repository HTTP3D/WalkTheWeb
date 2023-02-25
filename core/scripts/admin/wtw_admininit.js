/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions can be used to add admin mode only initializations (run functions after scene is initialized) */

/* guide lines are used when editing molds or other 3D Objects */
WTWJS.prototype.lineZ;
WTWJS.prototype.lineX;
WTWJS.prototype.lineY;
WTWJS.prototype.lineY1;
WTWJS.prototype.lineY2;
WTWJS.prototype.lineY3;
WTWJS.prototype.lineY4;
WTWJS.prototype.lineY5;
WTWJS.prototype.lineY6;
WTWJS.prototype.lineY7;
WTWJS.prototype.lineY8;
WTWJS.prototype.lineZ1;
WTWJS.prototype.lineZ2;
WTWJS.prototype.lineZ3;
WTWJS.prototype.lineZ4;
WTWJS.prototype.lineZ5;
WTWJS.prototype.lineZ6;
WTWJS.prototype.lineZ7;
WTWJS.prototype.lineZ8;
WTWJS.prototype.lineX1;
WTWJS.prototype.lineX2;
WTWJS.prototype.lineX3;
WTWJS.prototype.lineX4;
WTWJS.prototype.lineX5;
WTWJS.prototype.lineX6;
WTWJS.prototype.lineX7;
WTWJS.prototype.lineX8;
WTWJS.prototype.moveX;
WTWJS.prototype.moveY;
WTWJS.prototype.moveZ;
/* mold backup is used before an edit to a mold in order to reverse the changes if cancelled */
WTWJS.prototype.moldBackup = null;

WTWJS.prototype.adminInit = function() {
	/* do not delete this function - if it exists, user is loading in admin mode (checks in the wtw_core.js init sequence) */
	try {
		/* add code if necessary, executes after WalkTheWeb scene completes loading sequence */
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_admininit.js-adminInit=' + ex.message);
	}
}

WTWJS.prototype.adminLoadAfterScreen = function() {
	/* Admin start sequence (sets menus, forms if needed, and checks for updates) */
	try {
		/* set window size */
		WTW.setWindowSize();

		var zsnapshot = WTW.getQuerystring('snapshot','0');
		var zhmenu = WTW.getQuerystring('hmenu',1);
		if (dGet('wtw_adminmenubutton').style.left == '') {
			dGet('wtw_adminmenubutton').style.left = '0px';
		}
		if (zsnapshot != '1') {
			/* default startup (not returning from a Babylon screen shot) */
			/* show updates page if returning from an update reload */
			var zshowupdates = WTW.getQuerystring('showupdates','0');
			switch (zshowupdates) {
				case '1':
					WTW.openFullPageForm('updates','','');
					break;
				case '2':
					WTW.openFullPageForm('plugins','All 3D Plugins');
					break;
				default:
					break;
			}
			if (WTW.isNumeric(zhmenu)) {
				/* if a particular menu is referenced, open it */
				WTW.hideAdminMenu();
				switch (Number(zhmenu)) {
					case 5:
						WTW.openBuildingForm(buildingid);
						break;
					case 25:
						WTW.openCommunityForm(communityid);
						break;
					case 35:
						WTW.openThingForm(thingid);
						break;
					case 69: /* change site preview image */
						if (communityid != '') {
							WTW.adminMenuItemSelected(dGet('wtw_admincommunitysnapshot'));
						} else if (buildingid != '') {
							WTW.adminMenuItemSelected(dGet('wtw_adminbuildingsnapshot'));
						} else if (thingid != '') {
							WTW.adminMenuItemSelected(dGet('wtw_adminthingsnapshot'));
						}
						break;
						
				}
				WTW.show('wtw_adminmenu' + zhmenu);
				if (dGet('wtw_adminmenubutton').style.left == '0px') {
					WTW.toggleAdminMenu('wtw_adminmenubutton');
				}
			} else if (zhmenu != '') {
				/* open default page (dashboard) */
				if (zhmenu == 'updates') {
					WTW.openFullPageForm('updates','','');
				}
				if (dGet('wtw_adminmenubutton').style.left == '0px') {
					WTW.toggleAdminMenu('wtw_adminmenubutton');
				}
			}
			WTW.pluginsAdminLoadAfterScreen(zhmenu);
		} else {
			/* page is returning from a babylon screen shot */
			/* open the appropriate menu option */
			zhmenu = 69;
			if (communityid != '') {
				WTW.hideAdminMenu();
				dGet('wtw_snapshottitle').innerHTML = '3D Community Snapshot';
				WTW.openUpdateSnapshotForm();
				WTW.show('wtw_adminmenu69');
			} else if (buildingid != '') {
				WTW.hideAdminMenu();
				dGet('wtw_snapshottitle').innerHTML = '3D Building Snapshot';
				WTW.openUpdateSnapshotForm();
				WTW.show('wtw_adminmenu69');
			} else if (thingid != '') {
				WTW.hideAdminMenu();
				dGet('wtw_snapshottitle').innerHTML = '3D Thing Snapshot';
				WTW.openUpdateSnapshotForm();
				WTW.show('wtw_adminmenu69');
			}
			if (dGet('wtw_adminmenubutton').style.left == '0px') {
				WTW.toggleAdminMenu('wtw_adminmenubutton');
			}
		}
		if (communityid != '') {
			WTW.loadCommunityForm(communityid);
		} else if (buildingid != '') {
			WTW.loadBuildingForm(buildingid);
		} else if (thingid != '') {
			WTW.loadThingForm(thingid);
		}
		if (WTW.getCookie('wtw_bfocus') != null) {
			if (WTW.getCookie('wtw_bfocus') == '0') {
				WTW.setQuickEditorFocus(0);
			}
		}
		if (WTW.getCookie('wtw_bmerged') != null) {
			if (WTW.getCookie('wtw_bmerged') == '1') {
				WTW.setQuickEditorMerged(1);
			}
		}
		if (WTW.getCookie('wtw_bzones') != null) {
			if (WTW.getCookie('wtw_bzones') == '1') {
				WTW.setQuickEditorZones(1);
			}
		}
		if (WTW.getCookie('wtw_bloadall') != null) {
			if (WTW.getCookie('wtw_bloadall') == '1') {
				WTW.setQuickEditorLoadAll(1);
			}
		}
		if (WTW.getCookie('wtw_blines') != null) {
			if (WTW.getCookie('wtw_blines') == '0') {
				WTW.setQuickEditorLines(0);
			}
		}
		dGet('wtw_twaterpositiony').value = WTW.init.waterPositionY;
		dGet('wtw_tgroundpositiony').value = WTW.init.groundPositionY;
		dGet('wtw_twaterbumpid').value = WTW.init.waterBumpID;
		dGet('wtw_twaterbumppath').value = WTW.init.waterBumpPath;
		WTW.setMenuBarSelectText();
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_admininit.js-adminLoadAfterScreen=' + ex.message);
	}
}


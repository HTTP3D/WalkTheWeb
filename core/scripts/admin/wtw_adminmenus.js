/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are for the admin menu in admin mode only */

WTWJS.prototype.toggleDashboardBox = function(zelementname) {
	try {
		var zdiv = dGet(zelementname);
		var zdivarrow = dGet(zelementname + 'arrow');
		if (zdiv != null) {
			zdiv.style.transition = 'max-height 0.3s ease';
			if (zdiv.style.maxHeight == '0px') {
				zdiv.style.maxHeight = '300px';
				zdiv.style.overflowY = 'auto';
				if (zdivarrow != null) {
					zdivarrow.innerHTML = '⯅';
				}
			} else {
				zdiv.style.maxHeight = '300px';
				zdiv.style.maxHeight = '0px';
				zdiv.style.overflowY = 'hidden';
				if (zdivarrow != null) {
					zdivarrow.innerHTML = '⯆';
				}
				
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmenus.js-toggleDashboardBox=" + ex.message);
	}
}

WTWJS.prototype.toggleAdminMenu = function(buttonid) {
	try {
		if (dGet(buttonid).style.left == "0px") {
			var x = 0;
			var menutimer = window.setInterval(function() {
				if (x < 325) {
					dGet(buttonid).style.left = x + 'px';
					x += 40;
				} else {
					dGet(buttonid).style.left = '315px';
					dGet(buttonid.replace("button","")).style.left = '0px';
					dGet(buttonid.replace("button","") + 'left').style.visibility = 'visible';
					dGet(buttonid.replace("button","") + 'right').style.visibility = 'hidden';
					window.clearInterval(menutimer);
					menutimer = null;
					WTW.show(buttonid.replace("button",""));
				}
				WTW.setWindowSize();
			},1);
		} else {
			WTW.hide(buttonid.replace("button",""));
			var x = 325;
			var menutimer = window.setInterval(function() {
				if (x > 0) {
					dGet(buttonid).style.left = x + 'px';
					x -= 40;
				} else {
					dGet(buttonid).style.left = '0px';
					dGet(buttonid.replace("button","")).style.left = '-315px';
					dGet(buttonid.replace("button","") + 'left').style.visibility = 'hidden';
					dGet(buttonid.replace("button","") + 'right').style.visibility = 'visible';
					window.clearInterval(menutimer);
					menutimer = null;
				}
				WTW.setWindowSize();
			},1);
		}
		if (dGet('wtw_adminmenu1').style.display != "none") {
			if (communityid != "") {
				WTW.show('wtw_admincommunitiesdiv');
				WTW.show('wtw_adminsettingscommunity');
				WTW.show('wtw_admineditcommunity');
			} else {
				WTW.hide('wtw_adminsettingscommunity');
				WTW.hide('wtw_admineditcommunity');
			}
			if (buildingid != "") {
				WTW.show('wtw_adminbuildingsdiv');
				WTW.show('wtw_adminsettingsbuilding');
				WTW.show('wtw_admineditbuilding');
			} else {
				WTW.hide('wtw_adminsettingsbuilding');
				WTW.hide('wtw_admineditbuilding');
			}
			if (thingid != "") {
				WTW.show('wtw_adminthingsdiv');
				WTW.show('wtw_adminsettingsthing');
				WTW.show('wtw_admineditthing');
			} else {
				WTW.hide('wtw_adminsettingsthing');
				WTW.hide('wtw_admineditthing');
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmenus.js-toggleAdminMenu=" + ex.message);
	}
}

WTWJS.prototype.toggleAdminMenuDashboard = function() {
	try {
		if (dGet('wtw_fullpageform').style.display == "none" || (dGet('wtw_dashboardpage').style.display == "none" && dGet('wtw_updatespage').style.display == "none")) {
			WTW.openFullPageForm('dashboard','','');
		} else {
			WTW.closeFullPageForm();
			//WTW.hideFullPages();
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmenus.js-toggleAdminMenuDashboard=" + ex.message);
	}
}

WTWJS.prototype.toggleAdminMenuMediaLibrary = function() {
	try {
		if (dGet('wtw_fullpageform').style.display == "none" || dGet('wtw_selectimagepage').style.display == "none") {
			WTW.openFullPageForm('medialibrary','','');
		} else {
			WTW.closeFullPageForm();
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmenus.js-toggleAdminMenuMediaLibrary=" + ex.message);
	}
}

WTWJS.prototype.toggleAdminMenuLevel = function(sectionname) {
	try {
		var obj = dGet("wtw_adminmenu" + sectionname + "div");
		if (obj != null) {
			var current = obj.style.display;
			WTW.hide('wtw_fullpageform');
			if (current == "none") {
				obj.style.display = "block";
				obj.style.visibility = "visible";
			} else {
				obj.style.display = "none";
				obj.style.visibility = "hidden";
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmenus.js-toggleAdminMenuLevel=" + ex.message);
	}
}

WTWJS.prototype.hideAdminMenu = function() {
	try {
		var menusubdivs = document.getElementsByClassName('wtw-adminmenuform');
		for (var i=0;i<menusubdivs.length;i++) {
			if (menusubdivs[i] != null) {
				if (menusubdivs[i].id != undefined) {
					WTW.hide(menusubdivs[i].id);
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmenus.js-hideAdminMenu=" + ex.message);
	}
}

WTWJS.prototype.adminOpenSubmenuForm = function(obj) {
	try {
		if (obj != null) {
			if (obj.id != undefined) {
				if (dGet(obj.id + 'div') != null) {
					WTW.hideAdminMenu();
					WTW.show(obj.id + 'div');
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmenus.js-adminOpenSubmenuForm=" + ex.message);
	}		
}

WTWJS.prototype.adminMenuItemSelected = function(obj) {
	try {
		if (obj != null) {
			if (obj.id != undefined) {
				switch (obj.id) {
				/* Dashboard */
					case "wtw_adminmenudashboard":
						WTW.openFullPageForm('dashboard','','');
						break;
				/* Community Admin Items */
					case 'wtw_adminselectcommunity':
						WTW.hideAdminMenu();
						WTW.getSelectCommunitiesList();
						WTW.show('wtw_adminmenu22');
						break;
					case 'wtw_adminaddcommunity':
						WTW.openFullPageForm('importpage','communities');
						break;
					case 'wtw_adminsettingscommunity':
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu24');
						break;
					case 'wtw_admineditcommunity':
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu26');
						break;
					case 'wtw_admincommunityinfo':
						WTW.hideAdminMenu();
						WTW.openCommunityForm(communityid);
						WTW.show('wtw_adminmenu25');
						break;
					case 'wtw_admincommunitystart':
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu44');
						break;
					case 'wtw_admincommunitygravity':
						WTW.hideAdminMenu();
						dGet('wtw_tcommgravity').value = WTW.init.gravity;
						if (WTW.init.gravity > 0) {
							scene.gravity = new BABYLON.Vector3(0, -WTW.init.gravity, 0);
						} else {
							scene.gravity = new BABYLON.Vector3(0, 0, 0);
						}
						WTW.show('wtw_adminmenu45');
						break;
					case 'wtw_admincommunityaccess':
						WTW.hideAdminMenu();
						WTW.openPermissionsForm();
						WTW.show('wtw_adminmenu60');
						break;
					case 'wtw_admincommunitycopy':
						WTW.copyMyCommunity();
						break;
					case 'wtw_admincommunitydelete':
						WTW.openConfirmation('2');
						break;
					case 'wtw_admincommunityshare':
						WTW.hideAdminMenu();
						dGet('wtw_bsharecommunitytemp').innerHTML = 'Share 3D Community as Template';
						WTW.openShareCommunityForm();
						WTW.show('wtw_adminmenu29');
						break;
					case "wtw_bback25":
					case "wtw_cancel25":
						WTW.submitCommunityForm(-1);
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu24');
						break;
					case "wtw_save25":
						WTW.submitCommunityForm(1);
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu24');
						break;
					case 'wtw_admincommunitylandscape':
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu30');
						break;
					case 'wtw_admincommunityaddblock':
						WTW.hideAdminMenu();
						WTW.getMoldList();
						WTW.show('wtw_adminmenu10');
						break;
					case 'wtw_admincommunityaddweb':
						WTW.hideAdminMenu();
						WTW.getWebMoldList();
						WTW.show('wtw_adminmenu12');
						break;
					case 'wtw_admincommunityaddthing':
						WTW.hideAdminMenu();
						WTW.getThingMoldList()
						WTW.show('wtw_adminmenu13');
						break;
					case 'wtw_admincommunityactionzones':
						WTW.hideAdminMenu();
						WTW.openSelectActionZoneForm();
						WTW.show('wtw_adminmenu15');
						break;
					case 'wtw_admincommunityrecover':
						WTW.hideAdminMenu();
						WTW.openRecoverItems();
						WTW.show('wtw_adminmenu16');
						break;
					case 'wtw_admincommunityaddbuilding':
						WTW.hideAdminMenu();
						WTW.openListConnectingGridsForm();
						WTW.show('wtw_adminmenu27');
						break;
					case "wtw_addbuildingtocommunity":
						var zbuildingid = WTW.getDDLValue('wtw_addcommunitybuildingid');
						var zbuildingname = WTW.encode(WTW.getDDLText('wtw_addcommunitybuildingid'));
						WTW.addConnectingGrid('building',zbuildingid, zbuildingname);
						break;
					case "wtw_bback27":
					case "wtw_cancel27":	
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu26');
						break;
					case "wtw_bback29":
					case "wtw_cancel29":	
						WTW.hideAdminMenu();
						WTW.saveShareCommunityForm();
						WTW.show('wtw_adminmenu24');
						break;
					case "wtw_bsharecommunitytemp":
						WTW.saveShareCommunityForm();
						if (dGet('wtw_bsharecommunitytemp').innerHTML.indexOf('Share 3D Community as Template') > -1) {
							WTW.openConfirmation('5');
						}
						break;
					case "wtw_adminlandscapesky":
						WTW.hideAdminMenu();
						WTW.openSkyDomeForm();
						WTW.show('wtw_adminmenu40');
						break;
					case "wtw_adminlandscapeground":
						WTW.hideAdminMenu();
						WTW.openEditGroundSettings();
						WTW.show('wtw_adminmenu41');
						break;
					case "wtw_adminlandscapewater":
						WTW.hideAdminMenu();
						WTW.openCommunityForm(communityid);
						WTW.show('wtw_adminmenu42');
						break;
					case "wtw_adminlandscapegravity":
						WTW.hideAdminMenu();
						dGet('wtw_tcommgravity').value = WTW.init.gravity;
						if (WTW.init.gravity > 0) {
							scene.gravity = new BABYLON.Vector3(0, -WTW.init.gravity, 0);
						} else {
							scene.gravity = new BABYLON.Vector3(0, 0, 0);
						}
						WTW.show('wtw_adminmenu45');
						break;
					case "wtw_adminlandscapeterrain":
						WTW.hideAdminMenu();
						WTW.openAddGroundTerrain();
						break;
					case "wtw_skysetday":
						WTW.loadSkyScene(0, 1, 0.25, 2, 10, 0.8, 0.005, .5);
						break;
					case "wtw_skysetsunrise":
						WTW.loadSkyScene(-0.5, 1, 0.25, 2, 10, 0.8, 0.005, .5);
						break;
					case "wtw_skysetsunset":
						WTW.loadSkyScene(0.5, 1, 0.25, 2, 10, 0.8, 0.005, .5);
						break;
					case "wtw_skysetnight":
						WTW.loadSkyScene(0.26, 1, 0.10, 0, 2, 0.8, 0.006, .5);
						break;
					case "wtw_bsaveeditskydome":	
						WTW.hideAdminMenu();
						WTW.saveSkyDome();
						WTW.show('wtw_adminmenu30');
						break;
					case "wtw_bback40":
					case "wtw_cancel40":
						WTW.hideAdminMenu();
						WTW.cancelSkyDome();
						WTW.show('wtw_adminmenu30');
						break;
					case "wtw_bsaveground":	
						WTW.hideAdminMenu();
						WTW.saveGround();
						WTW.show('wtw_adminmenu30');
						break;
					case "wtw_bback41":
					case "wtw_cancel41":
						WTW.hideAdminMenu();
						WTW.cancelGround();
						WTW.show('wtw_adminmenu30');
						break;
					case "wtw_bsavewaterdepth":	
						WTW.submitCommunityForm(1);
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu30');
						break;
					case "wtw_savecommgravity":
						WTW.hideAdminMenu();
						if (WTW.isNumeric(dGet('wtw_tcommgravity').value)) {
							if (Number(dGet('wtw_tcommgravity').value) != 0) {
								WTW.init.gravity = Number(dGet('wtw_tcommgravity').value);
								scene.gravity = new BABYLON.Vector3(0, -Number(dGet('wtw_tcommgravity').value), 0);
							} else {
								WTW.init.gravity = 0;
								scene.gravity = new BABYLON.Vector3(0, 0, 0);
							}
						} else {
							WTW.init.gravity = 0;
							scene.gravity = new BABYLON.Vector3(0, 0, 0);
						}
						WTW.saveGravity();
						WTW.show('wtw_adminmenu30');
						break;
					case "wtw_bback45":
					case "wtw_cancel45":
						WTW.hideAdminMenu();
						dGet('wtw_tcommgravity').value = WTW.init.gravity;
						if (WTW.isNumeric(dGet('wtw_tcommgravity').value)) {
							if (Number(dGet('wtw_tcommgravity').value) != 0) {
								WTW.init.gravity = Number(dGet('wtw_tcommgravity').value);
								scene.gravity = new BABYLON.Vector3(0, -Number(dGet('wtw_tcommgravity').value), 0);
							} else {
								WTW.init.gravity = 0;
								scene.gravity = new BABYLON.Vector3(0, 0, 0);
							}
						} else {
							WTW.init.gravity = 0;
							scene.gravity = new BABYLON.Vector3(0, 0, 0);
						}
						WTW.show('wtw_adminmenu30');
						break;
					case "wtw_bback42":
					case "wtw_cancel42":
						WTW.submitCommunityForm(-1);
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu30');
						break;
					case 'wtw_admincommunitysnapshot':	
						WTW.hideAdminMenu();
						dGet('wtw_snapshottitle').innerHTML = "3D Community Snapshot";
						WTW.openUpdateSnapshotForm();
						WTW.show('wtw_adminmenu69');
						break;
				/* Building Menu Items */
					case 'wtw_adminselectbuilding':
						WTW.hideAdminMenu();
						WTW.getSelectBuildingsList();
						WTW.show('wtw_adminmenu2');
						break;
					case 'wtw_adminaddbuilding':
						WTW.openFullPageForm('importpage','buildings');
						break;
					case 'wtw_adminsettingsbuilding':
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu4');
						break;
					case 'wtw_admineditbuilding':
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu6');
						break;
					case 'wtw_adminbuildinginfo':
						WTW.hideAdminMenu();
						WTW.openBuildingForm(buildingid);
						WTW.show('wtw_adminmenu5');
						break;
					case 'wtw_adminbuildingstart':
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu44');
						break;
					case 'wtw_adminbuildingcopy':
						WTW.copyMyBuilding();
						break;
					case 'wtw_adminbuildingdelete':
						WTW.openConfirmation('1');
						break;
					case 'wtw_adminbuildingshare':
						WTW.hideAdminMenu();
						dGet('wtw_bsharebuildingtemp').innerHTML = 'Share 3D Building as Template';
						WTW.openShareBuildingForm();
						WTW.show('wtw_adminmenu9');
						break;
					case 'wtw_adminbuildingaccess':
						WTW.hideAdminMenu();
						WTW.openPermissionsForm();
						WTW.show('wtw_adminmenu60');
						break;
					case "wtw_adminmenubuildsave":
						WTW.hideAdminMenu();
						WTW.submitBuildingForm(1);
						WTW.show('wtw_adminmenu1');
						break;
					case "wtw_bback5":
					case "wtw_cancel5":
						WTW.hideAdminMenu();
						WTW.submitBuildingForm(-1);
						WTW.show('wtw_adminmenu4');
						break;
					case "wtw_bback9":
						WTW.hideAdminMenu();
						WTW.saveShareBuildingForm();
						WTW.show('wtw_adminmenu4');
						break;
					case "wtw_bsharebuildingtemp":
						WTW.saveShareBuildingForm();
						if (dGet('wtw_bsharebuildingtemp').innerHTML.indexOf('Share 3D Building as Template') > -1) {
							WTW.openConfirmation('4');
						}
						break;
					case "wtw_adminmenubuildsharecancel":
						WTW.hideAdminMenu();
						WTW.saveShareBuildingForm();
						WTW.show('wtw_adminmenu4');
						break;
					case 'wtw_adminbuildingsnapshot':	
						WTW.hideAdminMenu();
						dGet('wtw_snapshottitle').innerHTML = "3D Building Snapshot";
						WTW.openUpdateSnapshotForm();
						WTW.show('wtw_adminmenu69');
						break;
				/* Thing Admin Items */
					case 'wtw_adminselectthing':
						WTW.hideAdminMenu();
						WTW.getSelectThingsList();
						WTW.show('wtw_adminmenu32');
						break;
					case 'wtw_adminaddthing':
						WTW.openFullPageForm('importpage','things');
						break;
					case 'wtw_adminsettingsthing':
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu34');
						break;
					case 'wtw_admineditthing':
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu36');
						break;
					case 'wtw_adminthinginfo':
						WTW.hideAdminMenu();
						WTW.openThingForm(thingid);
						WTW.show('wtw_adminmenu35');
						break;
					case 'wtw_adminthingstart':
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu44');
						break;
					case 'wtw_adminthingaccess':
						WTW.hideAdminMenu();
						WTW.openPermissionsForm();
						WTW.show('wtw_adminmenu60');
						break;
					case 'wtw_adminthingcopy':
						WTW.copyMyThing();
						break;
					case 'wtw_adminthingdelete':
						WTW.openConfirmation('6');
						break;
					case 'wtw_adminthingshare':
						WTW.hideAdminMenu();
						dGet('wtw_bsharethingtemplate').innerHTML = 'Share 3D Thing as Template';
						WTW.openShareThingForm();
						WTW.show('wtw_adminmenu39');
						break;
					case "wtw_bback35":
						WTW.submitthingForm(-1);
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu34');
						break;
					case "wtw_save35":
						WTW.submitthingForm(1);
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu34');
						break;
					case "wtw_cancel35":
						WTW.submitthingForm(-1);
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu34');
						break;
					case 'wtw_adminthingaddblock':
						WTW.hideAdminMenu();
						WTW.getMoldList();
						WTW.show('wtw_adminmenu10');
						break;
					case 'wtw_adminthingaddweb':
						WTW.hideAdminMenu();
						WTW.getWebMoldList();
						WTW.show('wtw_adminmenu12');
						break;
					case 'wtw_adminthingactions':
						WTW.hideAdminMenu();
						WTW.openSelectActionZoneForm();
						WTW.show('wtw_adminmenu15');
						break;
					case 'wtw_adminthingrecover':
						WTW.hideAdminMenu();
						WTW.openRecoverItems();
						WTW.show('wtw_adminmenu16');
						break;
					case "wtw_bback39":
						WTW.hideAdminMenu();
						WTW.saveShareThingForm();
						WTW.show('wtw_adminmenu34');
						break;
					case "wtw_bsharethingtemplate":
						WTW.saveShareThingForm();
						if (dGet('wtw_bsharethingtemplate').innerHTML.indexOf('Share 3D Thing as Template') > -1) {
							WTW.openConfirmation('7');
						}
						break;
					case "wtw_cancel39":	
						WTW.hideAdminMenu();
						WTW.saveShareThingForm();
						WTW.show('wtw_adminmenu34');
						break;
					case 'wtw_adminthingsnapshot':	
						WTW.hideAdminMenu();
						dGet('wtw_snapshottitle').innerHTML = "3D Thing Snapshot";
						WTW.openUpdateSnapshotForm();
						WTW.show('wtw_adminmenu69');
						break;
				/* common Admin Items */
					case 'wtw_adminbuildingaddblock':
						WTW.hideAdminMenu();
						WTW.getMoldList();
						WTW.show('wtw_adminmenu10');
						break;
					case 'wtw_adminbuildingaddweb':
						WTW.hideAdminMenu();
						WTW.getWebMoldList();
						WTW.show('wtw_adminmenu12');
						break;
					case 'wtw_adminbuildingaddthing':
						WTW.hideAdminMenu();
						WTW.getThingMoldList()
						WTW.show('wtw_adminmenu13');
						break;
					case 'wtw_adminbuildingactionzones':
						WTW.hideAdminMenu();
						WTW.openSelectActionZoneForm();
						WTW.show('wtw_adminmenu15');
						break;
					case 'wtw_adminbuildingrecover':
						WTW.hideAdminMenu();
						WTW.openRecoverItems();
						WTW.show('wtw_adminmenu16');
						break;
					case "wtw_changevideoposter":
						WTW.openFullPageForm('medialibrary','image','moldvideoposter','wtw_tmoldvideoposterid','wtw_tmoldvideoposterpath','wtw_moldaddvideoposterpreview');
						break;
					case "wtw_removevideoposter":
						dGet('wtw_moldaddvideoposterpreview').alt = "";
						dGet('wtw_moldaddvideoposterpreview').title = "";
						dGet('wtw_moldaddvideoposterpreview').src = "/content/system/images/videoposter.jpg";
						dGet('wtw_tmoldvideoposterpath').value = "/content/system/images/videoposter.jpg";
						dGet('wtw_tmoldvideoposterid').value = "e0u9qw9mbrv0hfls";
						WTW.setNewMold(0);
						break;
					case "wtw_moldchangetexture":
						WTW.openFullPageForm('medialibrary','image','moldtexture','wtw_tmoldtextureid','wtw_tmoldtexturepath','wtw_moldtexturepreview');
						break;
					case "wtw_moldchangebumptexture":
						WTW.openFullPageForm('medialibrary','image','moldbumptexture','wtw_tmoldtexturebumpid','wtw_tmoldtexturebumppath','wtw_moldtexturebumppreview');
						break;
					case "wtw_moldchangeheightmap":
						WTW.openFullPageForm('medialibrary','image','groundheightmap','wtw_tmoldheightmapid','wtw_tmoldheightmappath','wtw_moldheightmappreview');
						break;
					case "wtw_changemixmap":
						WTW.openFullPageForm('medialibrary','image','groundmixmap','wtw_tmoldmixmapid','wtw_tmoldmixmappath','wtw_moldmixmappreview');
						break;
					case "wtw_changeredtexture":
						WTW.openFullPageForm('medialibrary','image','groundredtexture','wtw_tmoldtexturerid','wtw_tmoldtexturerpath','wtw_moldtexturerpreview');
						break;
					case "wtw_changegreentexture":
						WTW.openFullPageForm('medialibrary','image','groundgreentexture','wtw_tmoldtexturegid','wtw_tmoldtexturegpath','wtw_moldtexturegpreview');
						break;
					case "wtw_changebluetexture":
						WTW.openFullPageForm('medialibrary','image','groundbluetexture','wtw_tmoldtexturebid','wtw_tmoldtexturebpath','wtw_moldtexturebpreview');
						break;
					case "wtw_changeredbumptexture":
						WTW.openFullPageForm('medialibrary','image','groundredbumpmap','wtw_tmoldtexturebumprid','wtw_tmoldtexturebumprpath','wtw_moldtexturebumprpreview');
						break;
					case "wtw_changegreenbumptexture":
						WTW.openFullPageForm('medialibrary','image','groundgreenbumpmap','wtw_tmoldtexturebumpgid','wtw_tmoldtexturebumpgpath','wtw_moldtexturebumpgpreview');
						break;
					case "wtw_changebluebumptexture":
						WTW.openFullPageForm('medialibrary','image','groundbluebumpmap','wtw_tmoldtexturebumpbid','wtw_tmoldtexturebumpbpath','wtw_moldtexturebumpbpreview');
						break;
					case "wtw_selectsound":
						WTW.openFullPageForm('medialibrary','audio','moldsound','wtw_tmoldsoundid','wtw_tmoldsoundpath','wtw_soundicon');
						break;
					case 'wtw_createduplicatemold':
						WTW.createDuplicateShape();
						break;
					case "wtw_setstartposition":
						WTW.setStartPosition(communityid, buildingid, thingid);
						break;
					case "wtw_bback11":
					case "wtw_bcancelmold":
						WTW.submitMoldForm(-1);
						WTW.hideAdminMenu();
						WTW.backToEdit();
						break;
					case "wtw_bback14":
					case "wtw_cancel14":
						WTW.submitConnectingGridsForm(-1);
						WTW.hideAdminMenu();
						WTW.backToEdit();
						break;
					case "wtw_bback20":
					case "wtw_cancel20":
						WTW.closeActionZoneForm();
						WTW.hideAdminMenu();
						WTW.backToEdit();
						break;
					case "wtw_bupdatesnapshot":
						if (communityid != '') {
							WTW.snapshot3D(dGet('wtw_tcontentpath').value + '/uploads/communities/' + dGet('wtw_tcommunityid').value + '/snapshots/', 'defaultcommunity.png');
						} else if (buildingid != '') {
							WTW.snapshot3D(dGet('wtw_tcontentpath').value + '/uploads/buildings/' + dGet('wtw_tbuildingid').value + '/snapshots/', 'defaultbuilding.png');
						} else if (thingid != '') {
							WTW.snapshot3D(dGet('wtw_tcontentpath').value + '/uploads/things/' + dGet('wtw_tthingid').value + '/snapshots/', 'defaultthing.png');
						}
						break;
				/* user Admin Items */
					case 'wtw_adminuserlist':
						WTW.openFullPageForm('users','All Users');
						break;
					case 'wtw_adminallplugins':
						WTW.openFullPageForm('plugins','All Plugins');
						break;
				/* Settings Admin Items */
					case 'wtw_adminemailserver':
						WTW.openFullPageForm('settings','Email Server');
						break;
					case 'wtw_adminwebalias':
						WTW.openFullPageForm('settings','Web Aliases');
						break;
				/* Dev Tools Admin Items */
					case "wtw_adminfocus":
						if (dGet('wtw_adminfocus').innerHTML.indexOf('Focus ON') > -1) {
							WTW.setQuickEditorFocus(0);
						} else {
							WTW.setQuickEditorFocus(1);
						}
						break;
					case "wtw_adminavatarcamera":
						if (dGet('wtw_adminavatarcamera').innerHTML.indexOf('Avatar Camera ON') > -1) {
							WTW.setQuickEditorAvatarCamera(0);
						} else {
							WTW.setQuickEditorAvatarCamera(1);
						}
						break;
					case "wtw_adminmerged":
						if (dGet('wtw_adminmerged').innerHTML.indexOf('Merged Molds ON') > -1) {
							WTW.setQuickEditorMerged(0);
						} else {
							WTW.setQuickEditorMerged(1);
						}
						break;
					case "wtw_adminzones":
						if (dGet('wtw_adminzones').innerHTML.indexOf('Action Zones ON') > -1) {
							WTW.setQuickEditorZones(0);
						} else {
							WTW.setQuickEditorZones(1);
						}
						break;
					case "wtw_adminlines":
						if (dGet('wtw_adminlines').innerHTML.indexOf('Alignment Lines ON') > -1) {
							WTW.setQuickEditorLines(0);
						} else {
							WTW.setQuickEditorLines(1);
						}
						break;
					case "wtw_adminaxislabels":
						if (dGet('wtw_adminaxislabels').innerHTML.indexOf('Axis Labels ON') > -1) {
							if (WTW.moveX == undefined || WTW.moveX == null ) {
							} else {
								WTW.moveX.isVisible = false;
								WTW.moveY.isVisible = false;
								WTW.moveZ.isVisible = false;          
							}
							dGet('wtw_adminaxislabels').innerHTML = 'Axis Labels OFF';
						} else {
							if (WTW.moveX == undefined || WTW.moveX == null ) {
							} else {
								WTW.moveX.isVisible = true;
								WTW.moveY.isVisible = true;
								WTW.moveZ.isVisible = true;				
							}
							dGet('wtw_adminaxislabels').innerHTML = 'Axis Labels ON';
						}
						break;
					case "wtw_adminloadedobjects":
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu70');
						break;
					case "wtw_listmeshes":
						WTW.listMeshes();
						break;
					case "wtw_listcgs":
						WTW.listConnectingGrids();
						break;
					case "wtw_listazs":
						WTW.listActionZones();
						break;
					case "wtw_listcommmolds":
						WTW.listCommunityMolds();
						break;
					case "wtw_listbuildmolds":
						WTW.listBuildingMolds();
						break;
					case "wtw_listthingmolds":
						WTW.listThingMolds();
						break;
					case "wtw_listautomations":
						WTW.listAutomations();
						break;
					case "wtw_listloadeduploads":
						WTW.listUploads();
						break;
				/* close and exit Admin Items */
					case "wtw_bback44":
					case "wtw_bback60":
					case "wtw_bback61":
					case "wtw_cancel44":
					case "wtw_cancel60":
					case "wtw_cancel61":
						WTW.hideAdminMenu();
						WTW.backToTools();
						break;
					case "wtw_bback10":
					case "wtw_bback12":
					case "wtw_bback13":
					case "wtw_bback15":
					case "wtw_bback16":
					case "wtw_bback30":
					case "wtw_cancel10":
					case "wtw_cancel12":
					case "wtw_cancel13":
					case "wtw_cancel15":
					case "wtw_cancel16":
					case "wtw_cancel30":	
						WTW.hideAdminMenu();
						WTW.backToEdit();
						break;
					case "wtw_bback4":
					case "wtw_bback6":
					case "wtw_bback69":
					case "wtw_cancel4":
					case 'wtw_cancel6':
					case "wtw_cancel69":
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu1');
						if (communityid != '') {
							WTW.show('wtw_admincommunitiesdiv');
						} else if (buildingid != '') {
							WTW.show('wtw_adminbuildingsdiv');
						} else if (thingid != '') {
							WTW.show('wtw_adminthingsdiv');
						}
						break;
					case "wtw_admincloseproject":
						window.location.href = wtw_domainurl + "/admin.php";
						break;
					case "wtw_adminexit":
						window.location.href = wtw_domainurl;
						break;
					default:
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu1');
						break;
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmenus.js-adminMenuItemSelected=" + ex.message);
	}
}

WTWJS.prototype.adminOpenSubmenu = function(zobj) {
	try {
		WTW.hide('wtw_fullpageform');
		var zobjid = zobj.id+'div';
		var menusubdivs = document.getElementsByClassName('wtw-adminmenudiv');
		for (var i=0;i<menusubdivs.length;i++) {
			if (menusubdivs[i] != null) {
				if (menusubdivs[i].id != undefined) {
					if (menusubdivs[i].id != zobjid) {
						WTW.hide(menusubdivs[i].id);
					}
				}
			}
		}
		if (dGet(zobjid) != null) {
			if (dGet(zobjid).style.display == 'none') {
				WTW.show(zobjid);
			} else {
				WTW.hide(zobjid);
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmenus.js-adminOpenSubmenu=" + ex.message);
	}
}


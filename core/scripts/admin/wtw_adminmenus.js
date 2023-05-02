/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are for the admin menu in admin mode only */

WTWJS.prototype.toggleAdminMenu = function(zbuttonid) {
	/* open and closes the admin menu (slide from the left) */
	try {
		if (dGet(zbuttonid).style.left == undefined || dGet(zbuttonid).style.left == '') {
			dGet(zbuttonid).style.left = '0px';
		}
		if (dGet(zbuttonid).style.left == '0px') {
			var x = 0;
			var zmenutimer = window.setInterval(function() {
				if (x < 325) {
					dGet(zbuttonid).style.left = x + 'px';
					x += 40;
				} else {
					dGet(zbuttonid).style.left = '315px';
					dGet(zbuttonid.replace('button','')).style.left = '0px';
					dGet(zbuttonid.replace('button','') + 'left').style.visibility = 'visible';
					dGet(zbuttonid.replace('button','') + 'right').style.visibility = 'hidden';
					window.clearInterval(zmenutimer);
					zmenutimer = null;
					WTW.show(zbuttonid.replace('button',''));
				}
				WTW.setWindowSize();
			},1);
		} else {
			WTW.hide(zbuttonid.replace('button',''));
			var x = 325;
			var zmenutimer = window.setInterval(function() {
				if (x > 0) {
					dGet(zbuttonid).style.left = x + 'px';
					x -= 40;
				} else {
					dGet(zbuttonid).style.left = '0px';
					dGet(zbuttonid.replace('button','')).style.left = '-315px';
					dGet(zbuttonid.replace('button','') + 'left').style.visibility = 'hidden';
					dGet(zbuttonid.replace('button','') + 'right').style.visibility = 'visible';
					window.clearInterval(zmenutimer);
					zmenutimer = null;
				}
				WTW.setWindowSize();
			},1);
		}
		if (dGet('wtw_adminmenu1').style.display != 'none') {
			if (communityid != '') {
				WTW.show('wtw_admincommunitiesdiv');
				WTW.show('wtw_adminsettingscommunity');
				WTW.show('wtw_admineditcommunity');
			} else {
				WTW.hide('wtw_adminsettingscommunity');
				WTW.hide('wtw_admineditcommunity');
			}
			if (buildingid != '') {
				WTW.show('wtw_adminbuildingsdiv');
				WTW.show('wtw_adminsettingsbuilding');
				WTW.show('wtw_admineditbuilding');
			} else {
				WTW.hide('wtw_adminsettingsbuilding');
				WTW.hide('wtw_admineditbuilding');
			}
			if (thingid != '') {
				WTW.show('wtw_adminthingsdiv');
				WTW.show('wtw_adminsettingsthing');
				WTW.show('wtw_admineditthing');
			} else {
				WTW.hide('wtw_adminsettingsthing');
				WTW.hide('wtw_admineditthing');
			}
			if (avatarid != '') {
				var zedit = WTW.getQuerystring('edit','0');
				if (zedit == '1') {
					WTW.hideAdminMenu();
					WTW.backToEdit();
				} else {
					WTW.show('wtw_adminavatarsdiv');
					WTW.show('wtw_adminsettingsavatar');
					WTW.show('wtw_admineditavatar');
				}
			} else {
				WTW.hide('wtw_adminsettingsavatar');
				WTW.hide('wtw_admineditavatar');
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-toggleAdminMenu=' + ex.message);
	}
}

WTWJS.prototype.toggleAdminMenuLevel = function(zsectionname) {
	/* opens and closes the main secions of the admin menu */
	try {
		var zobj = dGet('wtw_adminmenu' + zsectionname + 'div');
		if (zobj != null) {
			var zcurrent = zobj.style.display;
			WTW.hide('wtw_fullpageform');
			if (zcurrent == 'none') {
				zobj.style.display = 'block';
				zobj.style.visibility = 'visible';
			} else {
				zobj.style.display = 'none';
				zobj.style.visibility = 'hidden';
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-toggleAdminMenuLevel=' + ex.message);
	}
}

WTWJS.prototype.hideAdminMenu = function() {
	/* closes all sections of the admin menu */
	try {
		var zmenusubdivs = document.getElementsByClassName('wtw-adminmenuform');
		for (var i = 0;i < zmenusubdivs.length;i++) {
			if (zmenusubdivs[i] != null) {
				if (zmenusubdivs[i].id != undefined) {
					WTW.hide(zmenusubdivs[i].id);
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-hideAdminMenu=' + ex.message);
	}
}

WTWJS.prototype.adminOpenSubmenuForm = function(zobj) {
	/* open a section (submenu form) of the admin menu */
	try {
		if (zobj != null) {
			if (zobj.id != undefined) {
				if (dGet(zobj.id + 'div') != null) {
					WTW.hideAdminMenu();
					WTW.show(zobj.id + 'div');
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-adminOpenSubmenuForm=' + ex.message);
	}		
}

WTWJS.prototype.adminMenuItemSelected = function(zobj) {
	/* select the menu item and execute the appropriate functions per menu item */
	try {
		if (zobj != null) {
			if (zobj.id != undefined) {
				switch (zobj.id) {
				/* Dashboard */
					case 'wtw_adminmenudashboard':
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
						WTW.openStartPositionForm();
						WTW.show('wtw_adminmenu44');
						break;
					case 'wtw_admincommunityfirstbuilding':
						WTW.hideAdminMenu();
						WTW.openFirstBuildingForm();
						WTW.show('wtw_adminmenu28');
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
						WTW.openConfirmation('Delete 3D Community');
						break;
					case 'wtw_admincommunityshare':
						WTW.hideAdminMenu();
						dGet('wtw_bsharecommunitytemp').innerHTML = 'Share 3D Community as Template';
						WTW.openShareCommunityForm();
						WTW.show('wtw_adminmenu29');
						break;
					case 'wtw_bbackwtwshopping_admincommunitystoresdiv':
					case 'wtw_bback25':
					case 'wtw_cancel25':
						WTW.submitCommunityForm(-1);
						WTW.hideAdminMenu();
						WTW.backToTools();
						break;
					case 'wtw_save25':
						WTW.submitCommunityForm(1);
						WTW.hideAdminMenu();
						WTW.backToTools();
						break;
					case 'wtw_admincommunityscene':
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
					case 'wtw_admincommunityaddbuilding':
						WTW.hideAdminMenu();
						WTW.getAddBuildingList();
						WTW.show('wtw_adminmenu27');
						break;
					case 'wtw_admincommunityaddthing':
						WTW.hideAdminMenu();
						WTW.getAddThingList();
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
					case 'wtw_bback29':
					case 'wtw_cancel29':	
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu24');
						break;
					case 'wtw_bback27':
					case 'wtw_cancel27':	
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu26');
						break;
					case 'wtw_bback9':
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu4');
						break;
					case 'wtw_bback39':
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu34');
						break;
					case 'wtw_adminmenubuildsharecancel':
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu4');
						break;
					case 'wtw_cancel39':	
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu34');
						break;
					case 'wtw_cancelshareavatar':
						WTW.hideAdminMenu();
						WTW.backToTools();
						break;
					case 'wtw_adminscene':
						WTW.hideAdminMenu();
						WTW.openSceneForm();
						WTW.show('wtw_adminmenu46');
						break;
					case 'wtw_bsaveeditscene':
						WTW.hideAdminMenu();
						WTW.saveCommunityScene();
						WTW.show('wtw_adminmenu30');
						break;
					case 'wtw_bback46':
					case 'wtw_cancel46':
						WTW.hideAdminMenu();
						WTW.cancelCommunityScene();
						WTW.show('wtw_adminmenu30');
						break;
					case 'wtw_adminsky':
						WTW.hideAdminMenu();
						WTW.openCommunitySkyForm();
						WTW.show('wtw_adminmenu40');
						break;
					case 'wtw_adminground':
						WTW.hideAdminMenu();
						WTW.openEditGroundSettings();
						WTW.show('wtw_adminmenu41');
						break;
					case 'wtw_adminwater':
						WTW.hideAdminMenu();
						WTW.openCommunityForm(communityid);
						WTW.show('wtw_adminmenu42');
						break;
					case 'wtw_changewaterbumptexture':
						WTW.openFullPageForm('medialibrary','image','waterbumptexture','wtw_twaterbumpid','wtw_twaterbumppath','wtw_waterbumppreview');
						break;
					case 'wtw_admingravity':
						WTW.hideAdminMenu();
						dGet('wtw_tcommgravity').value = WTW.init.gravity;
						if (WTW.init.gravity > 0) {
							scene.gravity = new BABYLON.Vector3(0, -WTW.init.gravity, 0);
						} else {
							scene.gravity = new BABYLON.Vector3(0, 0, 0);
						}
						WTW.show('wtw_adminmenu45');
						break;
					case 'wtw_adminterrain':
						WTW.hideAdminMenu();
						WTW.openAddGroundTerrain();
						break;
					case 'wtw_skysetday':
						WTW.loadSkyScene(0, 1, 0.25, 2, 10, 0.8, 0.005, .5);
						break;
					case 'wtw_skysetsunrise':
						WTW.loadSkyScene(0.5, 1, 0.25, 2, 10, 0.8, 0.005, .5);
						break;
					case 'wtw_skysetsunset':
						WTW.loadSkyScene(-0.5, 1, 0.25, 2, 10, 0.8, 0.005, .5);
						break;
					case 'wtw_skysetnight':
						WTW.loadSkyScene(0.26, 1, 0.10, 0, 2, 0.8, 0.006, .5);
						break;
					case 'wtw_bsaveeditsky':	
						WTW.hideAdminMenu();
						WTW.saveCommunitySky();
						WTW.show('wtw_adminmenu30');
						break;
					case 'wtw_bback40':
					case 'wtw_cancel40':
						WTW.hideAdminMenu();
						WTW.cancelCommunitySky();
						WTW.show('wtw_adminmenu30');
						break;
					case 'wtw_bsaveground':	
						WTW.hideAdminMenu();
						WTW.saveGround();
						WTW.show('wtw_adminmenu30');
						break;
					case 'wtw_bback41':
					case 'wtw_cancel41':
						WTW.hideAdminMenu();
						WTW.cancelGround();
						WTW.show('wtw_adminmenu30');
						break;
					case 'wtw_bsavewaterdepth':	
						WTW.submitCommunityForm(1);
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu30');
						break;
					case 'wtw_savecommgravity':
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
						WTW.saveCommunityGravity();
						WTW.backToTools();
						break;
					case 'wtw_bback45':
					case 'wtw_cancel45':
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
					case 'wtw_bback42':
					case 'wtw_cancel42':
						WTW.submitCommunityForm(-1);
						WTW.hideAdminMenu();
						WTW.backToTools();
						break;
					case 'wtw_admincommunitysnapshot':	
						WTW.hideAdminMenu();
						dGet('wtw_snapshottitle').innerHTML = '3D Community Snapshot';
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
						WTW.openConfirmation('Delete 3D Building');
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
					case 'wtw_adminmenubuildsave':
						WTW.hideAdminMenu();
						WTW.submitBuildingForm(1);
						WTW.backToTools();
						break;
					case 'wtw_bback5':
					case 'wtw_cancel5':
						WTW.hideAdminMenu();
						WTW.submitBuildingForm(-1);
						WTW.backToTools();
						break;
					case 'wtw_adminbuildingsnapshot':	
						WTW.hideAdminMenu();
						dGet('wtw_snapshottitle').innerHTML = '3D Building Snapshot';
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
						WTW.openConfirmation('Delete 3D Thing');
						break;
					case 'wtw_adminthingshare':
						WTW.hideAdminMenu();
						dGet('wtw_bsharethingtemplate').innerHTML = 'Share 3D Thing as Template';
						WTW.openShareThingForm();
						WTW.show('wtw_adminmenu39');
						break;
					case 'wtw_bback35':
						WTW.submitthingForm(-1);
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu34');
						break;
					case 'wtw_adminmenuthingsave':
						WTW.submitthingForm(1);
						WTW.hideAdminMenu();
						WTW.backToTools();
						break;
					case 'wtw_cancel35':
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
					case 'wtw_adminthingsnapshot':	
						WTW.hideAdminMenu();
						dGet('wtw_snapshottitle').innerHTML = '3D Thing Snapshot';
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
						WTW.getAddThingList()
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
					case 'wtw_changevideoposter':
						WTW.openFullPageForm('medialibrary','image','moldvideoposter','wtw_tmoldvideoposterid','wtw_tmoldvideoposterpath','wtw_moldaddvideoposterpreview');
						break;
					case 'wtw_removevideoposter':
						dGet('wtw_moldaddvideoposterpreview').alt = '';
						dGet('wtw_moldaddvideoposterpreview').title = '';
						dGet('wtw_moldaddvideoposterpreview').src = '/content/system/images/videoposter.jpg';
						dGet('wtw_tmoldvideoposterpath').value = '/content/system/images/videoposter.jpg';
						dGet('wtw_tmoldvideoposterid').value = 'e0u9qw9mbrv0hfls';
						WTW.setNewMold(0);
						break;
					case 'wtw_moldchangetexture':
						WTW.openFullPageForm('medialibrary','image','moldtexture','wtw_tmoldtextureid','wtw_tmoldtexturepath','wtw_moldtexturepreview');
						break;
					case 'wtw_moldchangebumptexture':
						WTW.openFullPageForm('medialibrary','image','moldbumptexture','wtw_tmoldtexturebumpid','wtw_tmoldtexturebumppath','wtw_moldtexturebumppreview');
						break;
					case 'wtw_moldchangeheightmap':
						WTW.openFullPageForm('medialibrary','image','groundheightmap','wtw_tmoldheightmapid','wtw_tmoldheightmappath','wtw_moldheightmappreview');
						break;
					case 'wtw_changemixmap':
						WTW.openFullPageForm('medialibrary','image','groundmixmap','wtw_tmoldmixmapid','wtw_tmoldmixmappath','wtw_moldmixmappreview');
						break;
					case 'wtw_changeredtexture':
						WTW.openFullPageForm('medialibrary','image','groundredtexture','wtw_tmoldtexturerid','wtw_tmoldtexturerpath','wtw_moldtexturerpreview');
						break;
					case 'wtw_changegreentexture':
						WTW.openFullPageForm('medialibrary','image','groundgreentexture','wtw_tmoldtexturegid','wtw_tmoldtexturegpath','wtw_moldtexturegpreview');
						break;
					case 'wtw_changebluetexture':
						WTW.openFullPageForm('medialibrary','image','groundbluetexture','wtw_tmoldtexturebid','wtw_tmoldtexturebpath','wtw_moldtexturebpreview');
						break;
					case 'wtw_changeredbumptexture':
						WTW.openFullPageForm('medialibrary','image','groundredbumpmap','wtw_tmoldtexturebumprid','wtw_tmoldtexturebumprpath','wtw_moldtexturebumprpreview');
						break;
					case 'wtw_changegreenbumptexture':
						WTW.openFullPageForm('medialibrary','image','groundgreenbumpmap','wtw_tmoldtexturebumpgid','wtw_tmoldtexturebumpgpath','wtw_moldtexturebumpgpreview');
						break;
					case 'wtw_changebluebumptexture':
						WTW.openFullPageForm('medialibrary','image','groundbluebumpmap','wtw_tmoldtexturebumpbid','wtw_tmoldtexturebumpbpath','wtw_moldtexturebumpbpreview');
						break;
					case 'wtw_tskyboxbuttonleft':
						WTW.openFullPageForm('medialibrary','image','skybox','wtw_tskyboximageleftid','wtw_tskyboximageleft','wtw_tskyboxleftpreview');
						break;
					case 'wtw_tskyboxbuttonup':
						WTW.openFullPageForm('medialibrary','image','skybox','wtw_tskyboximageupid','wtw_tskyboximageup','wtw_tskyboxuppreview');
						break;
					case 'wtw_tskyboxbuttonfront':
						WTW.openFullPageForm('medialibrary','image','skybox','wtw_tskyboximagefrontid','wtw_tskyboximagefront','wtw_tskyboxfrontpreview');
						break;
					case 'wtw_tskyboxbuttonright':
						WTW.openFullPageForm('medialibrary','image','skybox','wtw_tskyboximagerightid','wtw_tskyboximageright','wtw_tskyboxrightpreview');
						break;
					case 'wtw_tskyboxbuttondown':
						WTW.openFullPageForm('medialibrary','image','skybox','wtw_tskyboximagedownid','wtw_tskyboximagedown','wtw_tskyboxdownpreview');
						break;
					case 'wtw_tskyboxbuttonback':
						WTW.openFullPageForm('medialibrary','image','skybox','wtw_tskyboximagebackid','wtw_tskyboximageback','wtw_tskyboxbackpreview');
						break;
					case 'wtw_selectsound':
						WTW.openFullPageForm('medialibrary','audio','moldsound','wtw_tmoldsoundid','wtw_tmoldsoundpath','wtw_soundicon');
						break;
					case 'wtw_createduplicatemold':
						WTW.createDuplicateShape();
						break;
					case 'wtw_setstartposition':
						WTW.setStartPosition(communityid, buildingid, thingid);
						break;
					case 'wtw_savespawnzone':
						WTW.saveDefaultSpawnZone(communityid, buildingid, thingid);
						break;
					case 'wtw_bback11':
					case 'wtw_bcancelmold':
						WTW.submitMoldForm(-1);
						WTW.hideAdminMenu();
						WTW.backToEdit();
						break;
					case 'wtw_bback14':
					case 'wtw_cancel14':
						WTW.submitConnectingGridsForm(-1);
						WTW.hideAdminMenu();
						WTW.backToEdit();
						break;
					case 'wtw_bback20':
					case 'wtw_cancel20':
						WTW.closeActionZoneForm();
						WTW.hideAdminMenu();
						WTW.backToEdit();
						break;
					case 'wtw_bupdatesnapshot':
						if (communityid != '') {
							WTW.snapshot3D(dGet('wtw_tcontentpath').value + '/uploads/communities/' + dGet('wtw_tcommunityid').value + '/snapshots/', 'defaultcommunity.png');
						} else if (buildingid != '') {
							WTW.snapshot3D(dGet('wtw_tcontentpath').value + '/uploads/buildings/' + dGet('wtw_tbuildingid').value + '/snapshots/', 'defaultbuilding.png');
						} else if (thingid != '') {
							WTW.snapshot3D(dGet('wtw_tcontentpath').value + '/uploads/things/' + dGet('wtw_tthingid').value + '/snapshots/', 'defaultthing.png');
						} else if (avatarid != '') {
							WTW.snapshot3D(dGet('wtw_trootpath').value + dGet('wtw_tavatarfolder').value + 'snapshots/', 'defaultavatar.png');
						}
						break;
				/* Avatar Admin Items */
					case 'wtw_selectavatar':
						WTW.hideAdminMenu();
						WTW.openSelectAvatar();
						WTW.show('wtw_adminSelectAvatarDiv');
						break;
					case 'wtw_addnewavatar':
						WTW.openFullPageForm('importpage','avatars');
						break;
					case 'wtw_createavatar':
						WTW.hideAdminMenu();
						WTW.openAddNewAvatar();
						WTW.show('wtw_adminAddNewAvatarDiv');
						break;
					case 'wtw_adminavatarsnapshot':	
						WTW.hideAdminMenu();
						dGet('wtw_snapshottitle').innerHTML = '3D Avatar Snapshot';
						WTW.openUpdateSnapshotForm();
						WTW.show('wtw_adminmenu69');
						break;
					case 'wtw_adminavatarcopy':
						WTW.copyMyAvatar();
						break;
					case 'wtw_adminavatardelete':
						WTW.openConfirmation('Delete 3D Avatar');
						break;
					case 'wtw_adminavatarshare':
						WTW.hideAdminMenu();
						WTW.openShareAvatarForm();
						WTW.show('wtw_adminShareAvatarDiv');
						break;
					case 'wtw_adminsettingsavatar':
						WTW.hideAdminMenu();
						WTW.show('wtw_adminSettingsAvatarDiv');
						break;
					case 'wtw_bbackwtw_adminEditAvatarInformationDiv':
					case 'wtw_bbackwtw_adminEditAvatarFilesDiv':
					case 'wtw_bbackwtw_adminEditAvatarScalingDiv':
					case 'wtw_bbackwtw_adminEditAvatarColorsDiv':
					case 'wtw_bbackwtw_adminEditAvatarAnimationsDiv':
					case 'wtw_admineditavatar':
						WTW.hideAdminMenu();
						WTW.closeAvatarColorSelector();
						WTW.disposeClean('avatarscale-0--0--babylonfile');
						WTW.show('wtw_adminEditAvatarDiv');
						break;
					case 'wtw_admincustomcopyavatar':
						WTW.copyMyAvatar();
						break;
					case 'wtw_adminavatarinformation':
						WTW.hideAdminMenu();
						WTW.openEditAvatar();
						break;
					case 'wtw_adminavatarfiles':
						WTW.hideAdminMenu();
						dGet('wtw_tavatarfolderdisplay').value = 'wtw_adminEditAvatarFilesDiv';
						WTW.openEditAvatarFiles('','wtw_adminEditAvatarFilesDiv');
						break;
					case 'wtw_adminavatarscaling':
						WTW.hideAdminMenu();
						WTW.openEditAvatarScaling();
						break;
					case 'wtw_adminavatarcolors':
						WTW.hideAdminMenu();
						WTW.openEditAvatarColors();
						break;
					case 'wtw_adminavataranimations':
						WTW.hideAdminMenu();
						WTW.openEditAvatarAnimations();
						break;
				/* user Admin Items */
					case 'wtw_adminuserlist':
						WTW.openFullPageForm('users','All Users');
						break;
					case 'wtw_adminprivilegeduserlist':
						WTW.openFullPageForm('users','Privileged Users');
						break;
					case 'wtw_adminlocaluserlist':
						WTW.openFullPageForm('users','Local Users');
						break;
					case 'wtw_adminglobaluserlist':
						WTW.openFullPageForm('users','Global Users');
						break;
					case 'wtw_adminvisitinguserlist':
						WTW.openFullPageForm('users','Visiting Users');
						break;
					case 'wtw_adminuserroles':
						WTW.openFullPageForm('users','User Roles');
						break;
					case 'wtw_adminallplugins':
						WTW.openFullPageForm('plugins','All 3D Plugins');
						break;
					case 'wtw_adminactiveplugins':
						WTW.openFullPageForm('plugins','Active 3D Plugins');
						break;
					case 'wtw_admininactiveplugins':
						WTW.openFullPageForm('plugins','Inactive 3D Plugins');
						break;
				/* Settings Admin Items */
					case 'wtw_adminserversettings':
						WTW.openFullPageForm('settings','Server Settings');
						break;
					case 'wtw_adminemailserver':
						WTW.openFullPageForm('settings','Email Server');
						break;
					case 'wtw_adminhostingserver':
						WTW.openFullPageForm('settings','Server Hosting Settings');
						break;
					case 'wtw_adminmenuwebdomains':
						WTW.openFullPageForm('settings','Web Domains');
						break;
					case 'wtw_adminmenuwebalias':
						WTW.openFullPageForm('settings','Web Aliases');
						break;
					case 'wtw_adminapikeys':
						WTW.openFullPageForm('settings','API Keys Access');
						break;
				/* Dev Tools Admin Items */
					case 'wtw_admindebuglayer':
						WTW.toggleDebugLayer();
						break;
					case 'wtw_adminphysicsviewer':
						WTW.togglePhysicsViewer();
						break;
					case 'wtw_adminlistmeshes':
						WTW.listMeshes();
						break;
					case 'wtw_adminlisttransformnodes':
						WTW.listTransformNodes();
						break;
					case 'wtw_adminlistcgs':
						WTW.listConnectingGrids();
						break;
					case 'wtw_adminlistazs':
						WTW.listActionZones();
						break;
					case 'wtw_adminlistcommmolds':
						WTW.listCommunityMolds();
						break;
					case 'wtw_adminlistbuildmolds':
						WTW.listBuildingMolds();
						break;
					case 'wtw_adminlistthingmolds':
						WTW.listThingMolds();
						break;
					case 'wtw_adminlistautomations':
						WTW.listAutomations();
						break;
					case 'wtw_adminlistloadeduploads':
						WTW.listUploads();
						break;
					case 'wtw_adminlistmyavatarlocation':
						WTW.listMyAvatarLocation();
						break;
				/* close and exit Admin Items */
					case 'wtw_cancel28':
						WTW.disposeClean('firstbuilding-----babylonfile');
						WTW.hideAdminMenu();
						WTW.backToTools();
						break;
					case 'wtw_bback28':
					case 'wtw_bback44':
					case 'wtw_bback60':
					case 'wtw_bback61':
					case 'wtw_bback69':
					case 'wtw_cancel69':
					case 'wtw_cancel44':
					case 'wtw_cancel60':
					case 'wtw_cancel61':
						WTW.hideAdminMenu();
						WTW.backToTools();
						break;
					case 'wtw_bback10':
					case 'wtw_bback12':
					case 'wtw_bback13':
					case 'wtw_bback15':
					case 'wtw_bback16':
					case 'wtw_bback30':
					case 'wtw_cancel10':
					case 'wtw_cancel12':
					case 'wtw_cancel13':
					case 'wtw_cancel15':
					case 'wtw_cancel16':
					case 'wtw_cancel30':	
						WTW.hideAdminMenu();
						WTW.backToEdit();
						break;
					case 'wtw_bback4':
					case 'wtw_bback6':
					case 'wtw_cancel4':
					case 'wtw_cancel6':
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
					case 'wtw_admincloseproject':
						window.location.href = wtw_domainurl + '/admin.php';
						break;
					case 'wtw_adminexit':
						window.location.href = wtw_domainurl;
						break;
					default:
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu1');
						break;
				}
			}
		}
		WTW.pluginsAdminMenuItemSelected(zobj);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-adminMenuItemSelected=' + ex.message);
	}
}

WTWJS.prototype.backToEdit = function() {
	/* select an edit menu based on if you are editing a 3D Community, 3D Building, or 3D Thing */
	try {
		if (buildingid != '') {
			WTW.show('wtw_adminmenu6');
		} else if (communityid != '') {
			WTW.show('wtw_adminmenu26');
		} else if (thingid != '') {
			WTW.show('wtw_adminmenu36');
		} else if (avatarid != '') {
			WTW.show('wtw_adminEditAvatarDiv');
		} else {
			WTW.show('wtw_adminmenu1');
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-backToEdit=' + ex.message);
	}
}

WTWJS.prototype.backToTools = function() {
	/* select a tools menu based on if you are editing a 3D Community, 3D Building, or 3D Thing */
	try {
		if (buildingid != '') {
			WTW.show('wtw_adminmenu4');
		} else if (communityid != '') {
			WTW.show('wtw_adminmenu24');
		} else if (thingid != '') {
			WTW.show('wtw_adminmenu34');
		} else if (avatarid != '') {
			WTW.show('wtw_adminSettingsAvatarDiv');
		} else {
			WTW.show('wtw_adminmenu1');
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-backToTools=' + ex.message);
	}
}

WTWJS.prototype.adminOpenSubmenu = function(zobj) {
	/* hide all submenu sections then load a select submenu form */
	try {
		WTW.hide('wtw_fullpageform');
		var zobjid = zobj.id+'div';
		var zmenusubdivs = document.getElementsByClassName('wtw-adminmenudiv');
		for (var i = 0;i < zmenusubdivs.length;i++) {
			if (zmenusubdivs[i] != null) {
				if (zmenusubdivs[i].id != undefined) {
					if (zmenusubdivs[i].id != zobjid) {
						WTW.hide(zmenusubdivs[i].id);
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
		WTW.log('core-scripts-admin-wtw_adminmenus.js-adminOpenSubmenu=' + ex.message);
	}
}


/* toggle open and closed full page forms */

WTWJS.prototype.toggleDashboardBox = function(zelementname) {
	/* open and close dashboard boxes with animation by changes in maxHeight */
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
				WTW.show(zelementname);
			} else {
				zdiv.style.maxHeight = '0px';
				zdiv.style.overflowY = 'hidden';
				if (zdivarrow != null) {
					zdivarrow.innerHTML = '⯆';
				}
				WTW.hide(zelementname);
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-toggleDashboardBox=' + ex.message);
	}
}

WTWJS.prototype.toggleAdminSubMenu = function(zobj) {
	/* open and close Menu - Submenu */
	try {
		switch (zobj.id) {
			case 'wtw_admindashboard':
				if ((dGet('wtw_dashboardpage').style.display == 'none' || dGet('wtw_dashboardpage').style.display == '') && (dGet('wtw_updatespage').style.display == 'none' || dGet('wtw_updatespage').style.display == '') && (dGet('wtw_feedbackpage').style.display == 'none' || dGet('wtw_feedbackpage').style.display == '') && (dGet('wtw_errorlogpage').style.display == 'none' || dGet('wtw_errorlogpage').style.display == '')) {
					WTW.openFullPageForm('dashboard','','');
				} else {
					WTW.hide('wtw_dashboardpage');
					WTW.hide('wtw_updatespage');
					WTW.hide('wtw_feedbackpage');
					WTW.hide('wtw_errorlogpage');
					WTW.closeFullPageForm();
				}
				break;
			case 'wtw_adminmedia':
				var zopen = false;
				if (dGet('wtw_adminmediawtwdownloads') != null) {
					if (dGet('wtw_adminmediawtwdownloads').style.display != 'none' && dGet('wtw_adminmediawtwdownloads').style.display != '') {
						zopen = true;
					}
				}
				if (dGet('wtw_showimportpage') != null) {
					if (dGet('wtw_showimportpage').style.display != 'none' && dGet('wtw_showimportpage').style.display != '') {
						zopen = true;
					}
				}
				if ((dGet('wtw_selectimagepage').style.display == 'none' || dGet('wtw_selectimagepage').style.display == '') && (dGet('wtw_admincommunitiesdiv').style.display == 'none' || dGet('wtw_admincommunitiesdiv').style.display == '') && (dGet('wtw_adminbuildingsdiv').style.display == 'none' || dGet('wtw_adminbuildingsdiv').style.display == '') && (dGet('wtw_adminthingsdiv').style.display == 'none' || dGet('wtw_adminthingsdiv').style.display == '') && zopen == false) {
					WTW.openFullPageForm('medialibrary','');WTW.setImageMenu(4);
				} else {
					WTW.hide('wtw_selectimagepage');
					WTW.hide('wtw_showimportpage');
					WTW.hide('wtw_admincommunitiesdiv');
					WTW.hide('wtw_adminbuildingsdiv');
					WTW.hide('wtw_adminthingsdiv');
					WTW.closeFullPageForm();
				}
				break;
			case 'wtw_adminwebsites':
				if ((dGet('wtw_webdomainsettings').style.display == 'none' || dGet('wtw_webdomainsettings').style.display == '') && (dGet('wtw_webaliassettings').style.display == 'none' || dGet('wtw_webaliassettings').style.display == '')) {
					WTW.openFullPageForm('settings','Web Domains');
				} else {
					WTW.hide('wtw_webdomainsettings');
					WTW.hide('wtw_webaliassettings');
					WTW.closeFullPageForm();
				}
				break;
			case 'wtw_adminplugins':
				if ((dGet('wtw_pluginspage').style.display == 'none' || dGet('wtw_pluginspage').style.display == '')) {
					WTW.toggleAdminMenuLevel('plugins');
					WTW.adminMenuItemSelected(dGet('wtw_adminallplugins'));
				} else {
					WTW.hide('wtw_pluginspage');
					WTW.closeFullPageForm();
				}
				break;
			case 'wtw_adminmenuinvoices':
				if (dGet('wtw_optionalpage').style.display == 'none' || dGet('wtw_optionalpage').style.display == '') {
					if (dGet('wtw_adminoptionalupgrades') != null) {
						WTW.openFullPageForm('fullpage','Optional Upgrades','wtw_optionalpage');
					} else {
						WTW.openFullPageForm('fullpage','Invoices','wtw_invoicepage');
					}
				} else {
					WTW.hide('wtw_optionalpage');
					WTW.hide('wtw_invoicepage');
					WTW.hide('wtw_myinvoicepage');
					WTW.closeFullPageForm();
				}
				break;
			case 'wtw_adminmyinvoices2':
				if (dGet('wtw_optionalpage').style.display == 'none' || dGet('wtw_optionalpage').style.display == '') {
					if (dGet('wtw_adminoptionalupgrades') != null) {
						WTW.openFullPageForm('fullpage','Optional Upgrades','wtw_optionalpage');
					} else {
						WTW.openFullPageForm('fullpage','My Invoices','wtw_myinvoicepage');
					}
				} else {
					WTW.hide('wtw_optionalpage');
					WTW.hide('wtw_myinvoicepage');
					WTW.closeFullPageForm();
				}
				break;
			case 'wtw_adminusers':
				if ((dGet('wtw_userspage').style.display == 'none' || dGet('wtw_userspage').style.display == '')) {
					WTW.toggleAdminMenuLevel('users');
					WTW.adminMenuItemSelected(dGet('wtw_adminuserlist'));
				} else {
					WTW.hide('wtw_userspage');
					WTW.closeFullPageForm();
				}
				break;
			case 'wtw_adminsettings':
				if ((dGet('wtw_settingspage').style.display == 'none' || dGet('wtw_settingspage').style.display == '')) {
					WTW.toggleAdminMenuLevel('settings');
					WTW.adminMenuItemSelected(dGet('wtw_adminserversettings'));
				} else {
					WTW.hide('wtw_settingspage');
					WTW.closeFullPageForm();
				}
				break;
		}
		WTW.pluginsToggleAdminSubMenu(zobj);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-toggleAdminSubMenu=' + ex.message);
	}
}


/* admin menu 'quick edit menu' (bottom left) toggle on/off features */

WTWJS.prototype.setQuickEditorAvatarCamera = function(zvalue) {
	/* toggle camera - attach to avatar or release for free movement */
	try {
		var zavatar = WTW.__('Avatar');
		var zcamera = WTW.__('Camera');
		var zavatarcamera = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value + '-camera');
		if (zvalue == 1) {
			WTW.cameraFocus = 1;
			if (zavatarcamera != null) {
				WTW.cameraOne.lockedTarget = zavatarcamera;
			}

			if (dGet('wtw_bavatarcamera') != null) {
				var zon = WTW.__('On');
				dGet('wtw_bavatarcamera').innerHTML = zavatar + '<br />' + zcamera + '<br />' + zon;
				dGet('wtw_bavatarcamera').onclick = function() { WTW.setQuickEditorAvatarCamera(0); };
				dGet('wtw_bavatarcamera').className = 'wtw-quickbar';
				dGet('wtw_bavatarcamera').title = WTW.__('Camera is Attached to Avatar');
				dGet('wtw_bavatarcamera').alt = WTW.__('Camera is Attached to Avatar');
			}
			WTW.setCookie('wtw_bavatarcamera','1',30);
		} else {
			WTW.cameraFocus = 0;
			WTW.cameraOne.lockedTarget = null;
		
			if (dGet('wtw_bavatarcamera') != null) {
				var zoff = WTW.__('Off');
				dGet('wtw_bavatarcamera').innerHTML = zavatar + '<br />' + zcamera + '<br />' + zoff;
				dGet('wtw_bavatarcamera').onclick = function() { WTW.setQuickEditorAvatarCamera(1); };
				dGet('wtw_bavatarcamera').className = 'wtw-quickbaroff';
				dGet('wtw_bavatarcamera').title = WTW.__('Camera is Detached from Avatar');
				dGet('wtw_bavatarcamera').alt = WTW.__('Camera is Detached from Avatar');
			}
			WTW.setCookie('wtw_bavatarcamera','0',30);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-setQuickEditorAvatarCamera=' + ex.message);
	}
}

WTWJS.prototype.setQuickEditorFocus = function(zvalue) {
	/* toggle off or on highlight molds on mouse over */
	try {
		var zfocus = WTW.__('Focus');
		if (zvalue == 1) {
			if (dGet('wtw_bfocus') != null) {
				var zon = WTW.__('On');
				dGet('wtw_bfocus').innerHTML = zfocus + '<br /><br />' + zon;
				dGet('wtw_bfocus').onclick = function() { WTW.setQuickEditorFocus(0); };
				dGet('wtw_bfocus').className = 'wtw-quickbar';
				dGet('wtw_bfocus').title = WTW.__('Focus Highlight is On');
				dGet('wtw_bfocus').alt = WTW.__('Focus Highlight is On');
			}
			WTW.setCookie('wtw_bfocus','1',30);
		} else {
			/* WTW.resetMoldsOpacity(); */
			if (dGet('wtw_bfocus') != null) {
				var zoff = WTW.__('Off');
				dGet('wtw_bfocus').innerHTML = zfocus + '<br /><br />' + zoff;
				dGet('wtw_bfocus').onclick = function() { WTW.setQuickEditorFocus(1); };
				dGet('wtw_bfocus').className = 'wtw-quickbaroff';
				dGet('wtw_bfocus').title = WTW.__('Focus Highlight is Off');
				dGet('wtw_bfocus').alt = WTW.__('Focus Highlight is Off');
			}
			WTW.setCookie('wtw_bfocus','0',30);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-setQuickEditorFocus=' + ex.message);
	}
}

WTWJS.prototype.setQuickEditorMerged = function(zvalue) {
	/* show or hide the complete molds that were merged (using opacity) */
	try {
		var zmerged = WTW.__('Merged');
		if (zvalue == 1) {
			WTW.setShowCSG();
			if (dGet('wtw_bmerged') != null) {
				var zon = WTW.__('On');
				dGet('wtw_bmerged').innerHTML = zmerged + '<br /><br />' + zon;
				dGet('wtw_bmerged').onclick = function() { WTW.setQuickEditorMerged(0); };
				dGet('wtw_bmerged').className = 'wtw-quickbar';
				dGet('wtw_bmerged').title = WTW.__('Merged Shapes are Shown');
				dGet('wtw_bmerged').alt = WTW.__('Merged Shapes are Shown');
			}
			WTW.setCookie('wtw_bmerged','1',30);
		} else {
			WTW.setHideCSG();
			if (dGet('wtw_bmerged') != null) {
				var zoff = WTW.__('Off');
				dGet('wtw_bmerged').innerHTML = zmerged + '<br /><br />' + zoff;
				dGet('wtw_bmerged').onclick = function() { WTW.setQuickEditorMerged(1); };
				dGet('wtw_bmerged').className = 'wtw-quickbaroff';
				dGet('wtw_bmerged').title = WTW.__('Merged Shapes are Hidden');
				dGet('wtw_bmerged').alt = WTW.__('Merged Shapes are Hidden');
			}
			WTW.setCookie('wtw_bmerged','0',30);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-setQuickEditorMerged=' + ex.message);
	}
}

WTWJS.prototype.setShowCSG = function() {
	/* show merged molds (show originals in opacity) */
	try {
		var zmolds = WTW.communitiesMolds;
		if (buildingid != '') {
			zmolds = WTW.buildingMolds;
		} else if (thingid != '') {
			zmolds = WTW.thingMolds;
		}
		for (var i=0; i < zmolds.length; i++) {
			if (zmolds[i] != null) {
				var zcsgmoldid = zmolds[i].csg.moldid;
				if (zcsgmoldid != '' && zmolds[i].shown == '2') {
					var zcsgmoldname = zmolds[i].moldname;
					var zcsgmold = WTW.getMeshOrNodeByID(zcsgmoldname);
					if (zcsgmold == null) {
						zmolds[i].covering = 'color';
						zmolds[i].opacity = '30';
						zcsgmold = WTW.addMold(zcsgmoldname, zmolds[i], zmolds[i].parentname, 'color');
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-setShowCSG=' + ex.message);
	}
}

WTWJS.prototype.setHideCSG = function() {
	/* hide merged molds */
	try {
		var zmolds = WTW.communitiesMolds;
		if (buildingid != '') {
			zmolds = WTW.buildingMolds;
		} else if (thingid != '') {
			zmolds = WTW.thingMolds;
		}
		for (var i=0; i < zmolds.length; i++) {
			if (zmolds[i] != null) {
				var zcsgmoldid = zmolds[i].csg.moldid;
				if (zcsgmoldid != '' && zmolds[i].shown == '2') {
					var zcsgmoldname = zmolds[i].moldname;
					var zcsgmold = WTW.getMeshOrNodeByID(zcsgmoldname);
					if (zcsgmold != null) {
						var zmoldnameparts = WTW.getMoldnameParts(zcsgmoldname);
						zmoldnameparts.molds[zmoldnameparts.moldind].shown = '0';
						WTW.disposeClean(zcsgmoldname);
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-setHideCSG=' + ex.message);
	}
}

WTWJS.prototype.setQuickEditorZones = function(value) {
	/* show or hide action zones in the 3D Scene */
	try {
		var zzones = WTW.__('Zones');
		if (value == 1) {
			for (var i=0;i<WTW.actionZones.length;i++) {
				if (WTW.actionZones[i] != null) {
					WTW.showActionZone(i);
				}
			}
			if (dGet('wtw_bzones') != null) {
				var zon = WTW.__('On');
				dGet('wtw_bzones').innerHTML = zzones + '<br /><br />' + zon;
				dGet('wtw_bzones').onclick = function() { WTW.setQuickEditorZones(0); };
				dGet('wtw_bzones').className = 'wtw-quickbar';
				dGet('wtw_bzones').title = WTW.__('Action Zones are Shown');
				dGet('wtw_bzones').alt = WTW.__('Action Zones are Shown');
			}
			WTW.setCookie('wtw_bzones','1',30);
		} else {
			for (var i=0;i<WTW.actionZones.length;i++) {
				if (WTW.actionZones[i] != null) {
					WTW.hideActionZone(i);
				}
			}
			if (dGet('wtw_bzones') != null) {
				var zoff = WTW.__('Off');
				dGet('wtw_bzones').innerHTML = zzones + '<br /><br />' + zoff;
				dGet('wtw_bzones').onclick = function() { WTW.setQuickEditorZones(1); };
				dGet('wtw_bzones').className = 'wtw-quickbaroff';
				dGet('wtw_bzones').title = WTW.__('Action Zones are Hidden');
				dGet('wtw_bzones').alt = WTW.__('Action Zones are Hidden');
			}
			WTW.setCookie('wtw_bzones','0',30);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-setQuickEditorZones=' + ex.message);
	}
}

WTWJS.prototype.setQuickEditorLoadAll = function(value) {
	/* load all action zones in the 3D Scene - great for getting snapshots and full images */
	try {
		var zload = WTW.__('Load');
		var zall = WTW.__('All');
		if (value == 1) {
			WTW.loadAllActionZones = 1;
			if (dGet('wtw_bloadall') != null) {
				var zon = WTW.__('On');
				dGet('wtw_bloadall').innerHTML = zload + '<br />' + zall + '<br />' + zon;
				dGet('wtw_bloadall').onclick = function() { WTW.setQuickEditorLoadAll(0); };
				dGet('wtw_bloadall').className = 'wtw-quickbar';
				dGet('wtw_bloadall').title = WTW.__('Load All Action Zones');
				dGet('wtw_bloadall').alt = WTW.__('Load All Action Zones');
			}
			WTW.setCookie('wtw_bloadall','1',30);
		} else {
			WTW.loadAllActionZones = 0;
			if (dGet('wtw_bloadall') != null) {
				var zoff = WTW.__('Off');
				dGet('wtw_bloadall').innerHTML = zload + '<br />' + zall + '<br />' + zoff;
				dGet('wtw_bloadall').onclick = function() { WTW.setQuickEditorLoadAll(1); };
				dGet('wtw_bloadall').className = 'wtw-quickbaroff';
				dGet('wtw_bloadall').title = WTW.__('Load Active Action Zones');
				dGet('wtw_bloadall').alt = WTW.__('Load Active Action Zones');
			}
			WTW.setCookie('wtw_bloadall','0',30);
		}
		WTW.checkZones = true;
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-setQuickEditorLoadAll=' + ex.message);
	}
}

WTWJS.prototype.setQuickEditorLines = function(value) {
	/* show or hide the editor guide lines when editing an object */
	try {
		var zlines = WTW.__('Lines');
		if (value == 1) {
			if (WTW.lineZ == undefined || WTW.lineZ == null ) {
			} else {
				WTW.lineZ.isVisible = true;
				WTW.lineX.isVisible = true;
				WTW.lineY.isVisible = true;
				WTW.lineX1.isVisible = true;
				WTW.lineX2.isVisible = true;
				WTW.lineX3.isVisible = true;
				WTW.lineX4.isVisible = true;
				WTW.lineX5.isVisible = true;
				WTW.lineX6.isVisible = true;
				WTW.lineX7.isVisible = true;
				WTW.lineX8.isVisible = true;
				WTW.lineY1.isVisible = true;
				WTW.lineY2.isVisible = true;
				WTW.lineY3.isVisible = true;
				WTW.lineY4.isVisible = true;
				WTW.lineY5.isVisible = true;
				WTW.lineY6.isVisible = true;
				WTW.lineY7.isVisible = true;
				WTW.lineY8.isVisible = true;
				WTW.lineZ1.isVisible = true;
				WTW.lineZ2.isVisible = true;
				WTW.lineZ3.isVisible = true;
				WTW.lineZ4.isVisible = true;
				WTW.lineZ5.isVisible = true;
				WTW.lineZ6.isVisible = true;
				WTW.lineZ7.isVisible = true;
				WTW.lineZ8.isVisible = true;  				
			}
			if (dGet('wtw_blines') != null) {
				var zon = WTW.__('On');
				dGet('wtw_blines').innerHTML = zlines + '<br /><br />' + zon;
				dGet('wtw_blines').onclick = function() { WTW.setQuickEditorLines(0); };
				dGet('wtw_blines').className = 'wtw-quickbar';
				dGet('wtw_blines').title = WTW.__('Alignment Lines are Shown');
				dGet('wtw_blines').alt = WTW.__('Alignment Lines are Shown');
			}
			WTW.setCookie('wtw_blines','1',30);
		} else {
			if (WTW.lineZ == undefined || WTW.lineZ == null ) {
			} else {
				WTW.lineZ.isVisible = false;
				WTW.lineX.isVisible = false;
				WTW.lineY.isVisible = false;
				WTW.lineX1.isVisible = false;
				WTW.lineX2.isVisible = false;
				WTW.lineX3.isVisible = false;
				WTW.lineX4.isVisible = false;
				WTW.lineX5.isVisible = false;
				WTW.lineX6.isVisible = false;
				WTW.lineX7.isVisible = false;
				WTW.lineX8.isVisible = false;
				WTW.lineY1.isVisible = false;
				WTW.lineY2.isVisible = false;
				WTW.lineY3.isVisible = false;
				WTW.lineY4.isVisible = false;
				WTW.lineY5.isVisible = false;
				WTW.lineY6.isVisible = false;
				WTW.lineY7.isVisible = false;
				WTW.lineY8.isVisible = false;
				WTW.lineZ1.isVisible = false;
				WTW.lineZ2.isVisible = false;
				WTW.lineZ3.isVisible = false;
				WTW.lineZ4.isVisible = false;
				WTW.lineZ5.isVisible = false;
				WTW.lineZ6.isVisible = false;
				WTW.lineZ7.isVisible = false;
				WTW.lineZ8.isVisible = false;            
			}
			if (dGet('wtw_blines') != null) {
				var zoff = WTW.__('Off');
				dGet('wtw_blines').innerHTML = zlines + '<br /><br />' + zoff;
				dGet('wtw_blines').onclick = function() { WTW.setQuickEditorLines(1); };
				dGet('wtw_blines').className = 'wtw-quickbaroff';
				dGet('wtw_blines').title = WTW.__('Alignment Lines are Hidden');
				dGet('wtw_blines').alt = WTW.__('Alignment Lines are Hidden');
			}
			WTW.setCookie('wtw_blines','0',30);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-setQuickEditorLines=' + ex.message);
	}
}

WTWJS.prototype.adminMenuQuickKeys = function(keycode) {
	/* some keys have been assigned with ctrl- combos to trigger admin menu options */
	try {
		var e = e || window.event;
		if (keycode == 90 || keycode == 88 || keycode == 67 || keycode == 86) {
			// save keys for undo, cut, copy, and paste
		} else {
			switch(WTW.adminMenu) {
				case 1:
					switch (keycode) {
						case 27: // esc
							break;
						case 65: // a
							break;
						case 66: // b
							break;
						case 67: // c
							break;
						case 68: // d
							break;
						case 69: // e
							break;
						case 71: // g
							break;
						case 72: // h
							break;
						case 76: // l
							WTW.openFullPageForm('medialibrary','','');
							break;
						case 79: // o
							break;
						case 82: // r
							WTW.openFullPageForm('dashboard','','');
							break;
						case 83: // s
							break;
					}
					break;
				case 2:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback2').click();
							break;
					}
					break;
				case 4:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback4').click();
							break;
						case 65: // a
							dGet('wtw_adminbuildingsnapshot').click();
							break;
						case 67: // c
							dGet('wtw_adminbuildingcopy').click();
							break;
						case 68: // d
							dGet('wtw_cancel4').click();
							break;
						case 72: // h
							dGet('wtw_adminbuildingshare').click();
							break;
						case 73: // i
							dGet('wtw_adminbuildinginfo').click();
							break;
						case 79: // o
							dGet('wtw_adminbuildingdelete').click();
							break;
						case 80: // p
							dGet('wtw_adminbuildingaccess').click();
							break;
						case 83: // s
							dGet('wtw_adminbuildingstart').click();
							break;
						case 46: // del
							dGet('wtw_adminbuildingdelete').click();
							break;
					}
					break;
				case 5:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback5').click();
							break;
					}
					break;
				case 6:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback6').click();
							break;
						case 65: // a
							dGet('wtw_adminbuildingactionzones').click();
							break;
						case 66: // b
							dGet('wtw_adminbuildingaddblock').click();
							break;
						case 68: // d
							dGet('wtw_cancel6').click();
							break;
						case 72: // h
							dGet('wtw_adminbuildingaddthing').click();
							break;
						case 77: // m
							dGet('wtw_adminbuildingaddmodel').click();
							break;
						case 79: // o
							dGet('wtw_adminbuildingaddweb').click();
							break;
						case 82: // r
							dGet('wtw_adminbuildingrecover').click();
							break;
					}
					break;
				case 9:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback9').click();
							break;
					}
					break;
				case 10:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback10').click();
							break;
					}
					break;
				case 11:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback11').click();
							break;
						case 68: // d
							dGet('wtw_bdelmold').click();
							break;
						case 80: // p
							dGet('wtw_createduplicatemold').click();
							break;
						case 83: // s
							dGet('wtw_bsavethismold').click();
							break;
					}
					break;
				case 12:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback12').click();
							break;
					}
					break;
				case 13:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback13').click();
							break;
					}
					break;
				case 14:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback14').click();
							break;
					}
					break;
				case 15:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback15').click();
							break;
					}
					break;
				case 16:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback16').click();
							break;
					}
					break;
				case 20:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback20').click();
							break;
					}
					break;
				case 22:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback22').click();
							break;
					}
					break;
				case 24:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback24').click();
							break;
						case 65: // a
							dGet('wtw_admincommunitysnapshot').click();
							break;
						case 67: // c
							dGet('wtw_admincommunitycopy').click();
							break;
						case 68: // d
							dGet('wtw_adminmenucommdone').click();
							break;
						case 70: // f
							dGet('wtw_admincommunityfirstbuilding').click();
							break;
						case 72: // h
							dGet('wtw_admincommunityshare').click();
							break;
						case 73: // i
							dGet('wtw_admincommunityinfo').click();
							break;
						case 80: // p
							dGet('wtw_adminbuildingaccess').click();
							break;
						case 82: // r
							dGet('wtw_admincommunityrequirements').click();
							break;
						case 83: // s
							dGet('wtw_admincommunitystart').click();
							break;
						case 46: // del
							dGet('wtw_admincommunitydelete').click();
							break;
					}
					break;
				case 25:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback25').click();
							break;
					}
					break;
				case 26:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback26').click();
							break;
						case 65: // a
							dGet('wtw_admincommunityactionzones').click();
							break;
						case 66: // b
							dGet('wtw_admincommunityaddblock').click();
							break;
						case 68: // d
							dGet('wtw_adminmenucommdoneediting').click();
							break;
						case 72: // h
							dGet('wtw_admincommunityaddthing').click();
							break;
						case 77: // m
							dGet('wtw_admincommunityaddmodel').click();
							break;
						case 79: // o
							dGet('wtw_admincommunityaddweb').click();
							break;
						case 82: // r
							dGet('wtw_admincommunityrecover').click();
							break;
						case 83: // s
							dGet('wtw_admincommunityscene').click();
							break;
						case 85: // u
							dGet('wtw_admincommunityaddbuilding').click();
							break;
					}
					break;
				case 27:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback27').click();
							break;
					}
					break;
				case 28:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback28').click();
							break;
					}
					break;
				case 29:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback29').click();
							break;
					}
					break;
				case 30:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback30').click();
							break;
					}
					break;
				case 32:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback32').click();
							break;
					}
					break;
				case 34:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback34').click();
							break;
						case 65: // a
							dGet('wtw_adminthingsnapshot').click();
							break;
						case 67: // c
							dGet('wtw_adminthingcopy').click();
							break;
						case 68: // d
							dGet('wtw_adminmenuthingdone').click();
							break;
						case 72: // h
							dGet('wtw_adminthingshare').click();
							break;
						case 73: // i
							dGet('wtw_adminthinginfo').click();
							break;
						case 80: // p
							dGet('wtw_adminbuildingaccess').click();
							break;
						case 83: // s
							dGet('wtw_adminthingstart').click();
							break;
						case 46: // del
							dGet('wtw_adminthingdelete').click();
							break;
					}
					break;
				case 35:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback35').click();
							break;
					}
					break;
				case 36:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback36').click();
							break;
						case 65: // a
							dGet('wtw_adminthingactions').click();
							break;
						case 66: // b
							dGet('wtw_adminthingaddblock').click();
							break;
						case 68: // d
							dGet('wtw_adminmenuthingdoneediting').click();
							break;
						case 77: // m
							dGet('wtw_adminthingaddmodel').click();
							break;
						case 79: // o
							dGet('wtw_adminthingaddweb').click();
							break;
						case 82: // r
							dGet('wtw_adminthingrecover').click();
							break;
					}
					break;
				case 39:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback39').click();
							break;
					}
					break;
				case 40:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback40').click();
							break;
					}
					break;
				case 41:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback41').click();
							break;
					}
					break;
				case 42:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback42').click();
							break;
					}
					break;
				case 44:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback44').click();
							break;
					}
					break;
				case 45:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback45').click();
							break;
					}
					break;
				case 60:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback60').click();
							break;
					}
					break;
				case 61:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback61').click();
							break;
					}
					break;
				case 65:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback65').click();
							break;
					}
					break;
				case 66:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback66').click();
							break;
					}
					break;
				case 69:
					switch (keycode) {
						case 27: // esc
							dGet('wtw_bback69').click();
							break;
					}
					break;
			}
			e.preventDefault();
			return false;
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-adminMenuQuickKeys=' + ex.message);
	}		
}

WTWJS.prototype.setMenuBarSelectText = function() {
	/* browse menubar while in admin mode - set default menu bar text wording and show/hide */
	try {
		if (thingid == '' && buildingid == '' && communityid == '' && avatarid == '') {
			dGet('wtw_showcommunityname').innerHTML = WTW.__('Select 3D Item to Edit');
			dGet('wtw_showcommunityname').style.cursor = 'default';
			dGet('wtw_showcommunitynamemobile').innerHTML = WTW.__('Select 3D Item to Edit');
			dGet('wtw_showcommunitynamemobile').style.cursor = 'default';
			dGet('wtw_showbuildingname').innerHTML = WTW.__('from Admin Menu Above');
			dGet('wtw_showbuildingname').style.cursor = 'default';
			dGet('wtw_showbuildingnamemobile').innerHTML = WTW.__('from Admin Menu');
			dGet('wtw_showbuildingnamemobile').style.cursor = 'default';
			WTW.hide('wtw_modebuilding');
			WTW.hide('wtw_modebuildingmobile');
			WTW.hide('wtw_mainadminmode');
			WTW.hide('wtw_mainadminmodemobile');
			WTW.hide('wtw_rating');
			WTW.hide('wtw_ratingmobile');
			WTW.hide('wtw_ratingmobiletext');
		} else {
			WTW.showInline('wtw_modebuilding');
			WTW.showInline('wtw_modebuildingmobile');
			WTW.showInline('wtw_mainadminmode');
			WTW.showInline('wtw_mainadminmodemobile');
			WTW.showInline('wtw_rating');
			WTW.showInline('wtw_ratingmobile');
			WTW.showInline('wtw_ratingmobiletext');
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-setMenuBarSelectText=' + ex.message);
	}
}

WTWJS.prototype.toggleAdvanced = function(thisdiv, sectiondiv) {
	/* various admin forms use an 'advanced options' link to show / hide additional settings */
	try {
		if (dGet(sectiondiv) != null) {
			if (thisdiv.innerHTML == '-- Show Advanced Options --') {
				thisdiv.innerHTML = '-- Hide Advanced Options --';
				dGet(sectiondiv).style.display = 'block';
				dGet(sectiondiv).style.visibility = 'visible';
			} else if (thisdiv.innerHTML == '-- Show Advanced Mixmap Terrain --') {
				thisdiv.innerHTML = '-- Hide Advanced Mixmap Terrain --';
				dGet(sectiondiv).style.display = 'block';
				dGet(sectiondiv).style.visibility = 'visible';
			} else if (thisdiv.innerHTML == '-- Hide Advanced Mixmap Terrain --') {
				thisdiv.innerHTML = '-- Show Advanced Mixmap Terrain --';
				dGet(sectiondiv).style.display = 'none';
				dGet(sectiondiv).style.visibility = 'hidden';
			} else {
				thisdiv.innerHTML = '-- Show Advanced Options --';
				dGet(sectiondiv).style.display = 'none';
				dGet(sectiondiv).style.visibility = 'hidden';
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-toggleAdvanced=' + ex.message);
	}
}

WTWJS.prototype.checkForUpdates = async function(zshow, zfilter) {
	/* check for updates for WalkTheWeb, 3D Plugins, 3D Communities, 3D Buildings, 3D Things, and 3D Avatars */
	try {
		if (zshow == undefined) {
			zshow = '1';
		}
		if (zfilter == undefined) {
			zfilter = 'All 3D Plugins';
		}
		switch (zshow) {
			case '1':
				WTW.show('wtw_loadingupdates');
				WTW.hide('wtw_updatelist');
				WTW.hide('wtw_updatepluginlist');
				dGet('wtw_updatelist').innerHTML = '';
				break;
			case '2':
				WTW.show('wtw_pluginspage');
				WTW.show('wtw_loadingplugins');
				WTW.hide('wtw_allplugins');
				WTW.hide('wtw_pluginslist');
				dGet('wtw_pluginslist').innerHTML = '';
				break;
			default:
				zshow = '0';
				break;
		}
		var zrequest = {
			'function':'getplugininfo'
		};
		WTW.postAsyncJSON('/core/handlers/pluginloader.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note zresponse.serror would contain any errors */
				/* process the 3D Plugins information */
				WTW.getPluginInfoComplete(zresponse.plugins, zshow, zfilter);
			}
		);
		
		WTW.openDashboardForm(false);
		WTW.checkForFeedback('Open Feedback');
		WTW.pluginsCheckForUpdates(zshow, zfilter);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-checkForUpdates=' + ex.message);
	}
}

WTWJS.prototype.getPluginInfoComplete = async function(zmyplugins, zshow, zfilter) {
	/* process the retrieved 3D Plugins information */
	try {
		zplugins = '';
		zmyplugins = JSON.parse(zmyplugins);
		zmyplugins[zmyplugins.length] = {
			'pluginname' : 'walktheweb',
			'version' : wtw_version,
			'latestversion' : wtw_version,
			'title' : 'WalkTheWeb',
			'author' : 'Aaron Dishno Ed.D.',
			'authoruserid' : '',
			'description' : 'WalkTheWeb 3D Internet',
			'foldername' : '',
			'filename' : '',
			'updatedate' : wtw_versiondate,
			'updateurl' : '',
			'updateid' : '',
			'active' : '1'
		}
		if (zmyplugins != null) {
			for (var i=0;i<zmyplugins.length;i++) {
				if (zmyplugins[i] != null) {
					if (zmyplugins[i].pluginname != undefined) {
						zplugins += zmyplugins[i].pluginname.toLowerCase() + ',';
					}
				}
			}
		}
		/* allow plugins to process additional information */
		WTW.pluginsGetPluginInfoComplete(zmyplugins, zplugins, zshow, zfilter);

		if (dGet('wtw_pluginslisttitle') != null) {
			dGet('wtw_pluginslisttitle').innerHTML = "<div id='wtw_addplugin' class='wtw-greenbuttonright' onclick=\"WTW.openFullPageForm('importpage','plugins');\" style=\"display:none;visibility:hidden;\">Add New</div>" + zfilter;
		}
		var zpluginslist = '';
		if (zmyplugins != null) {
			if (zmyplugins.length > 0) {
				if (zshow == '1') {
					zpluginslist += "<div class='wtw-dashboardboxleftfull'>";
					zpluginslist += "<div class='wtw-dashboardboxtitle'>Plugins: Updates Available!</div><div class='wtw-dashboardbox'>";
				}
				zpluginslist += "<table class='wtw-table'><tr>";
				zpluginslist += "<td class='wtw-tablecolumnheading'>&nbsp;</td>";
				zpluginslist += "<td class='wtw-tablecolumnheading'>Plugin Name</td>";
				zpluginslist += "<td class='wtw-tablecolumnheading'>Details</td>";
				zpluginslist += "<td class='wtw-tablecolumnheading'>&nbsp;</td>";
				zpluginslist += "<td class='wtw-tablecolumnheading'>&nbsp;</td>";
				zpluginslist += "</tr>";
				for (var i=0;i < zmyplugins.length;i++) {
					if (zmyplugins[i] != null) {
						if (zmyplugins[i].pluginname != undefined && zmyplugins[i].version != undefined && zmyplugins[i].latestversion != undefined) {
							if (zmyplugins[i].pluginname == 'walktheweb') {
							} else {
								if (zmyplugins[i].version != zmyplugins[i].latestversion || zshow == '2') {
									var zpluginclass = 'wtw-deactive';
									var ztdclass = 'wtw-tddeactive';
									if (zmyplugins[i].active == '1') {
										zpluginclass = 'wtw-active';
										ztdclass = 'wtw-tdactive';
									}
									if (zmyplugins[i].required == '1') {
										zrequired = ' checked ';
										zhasrequirements = true;
										if (zmyplugins[i].active != '1') {
											ztdclass = 'wtw-tdactiverequired';
										}
									}
									if (zmyplugins[i].optional == '1') {
										zoptional = ' checked ';
										zhasrequirements = true;
										if (zmyplugins[i].active != '1') {
											ztdclass = 'wtw-tdactiveoptional';
										}
									}
									if (zfilter == 'All 3D Plugins' || (zpluginclass == 'wtw-active' && zfilter == 'Active 3D Plugins') || (zpluginclass == 'wtw-deactive' && zfilter == 'Inactive 3D Plugins')) {
										zpluginslist += "<tr><td class='wtw-tablecolumns " + ztdclass + "'>";
										if (zmyplugins[i].imageurl != '') {
											zpluginslist += "<img src='" + zmyplugins[i].imageurl + "' style='width:75px;height:auto;' />";
										}
										zpluginslist += "</td>";
										zpluginslist += "<td class='wtw-tablecolumns " + ztdclass + "'>";
										zpluginslist += " <span class='" + zpluginclass + "'>" + zmyplugins[i].pluginname + "</span><br />Version: " + zmyplugins[i].version + "</td>";
										zpluginslist += "<td class='wtw-tablecolumns " + ztdclass + "'><span class='" + zpluginclass + "'>" + zmyplugins[i].title + "</span> : " + zmyplugins[i].author + "<br />" + zmyplugins[i].description + "<br /></td>";
										zpluginslist += "<td class='wtw-tablecolumns " + ztdclass + "'>";
										if (zmyplugins[i].active == '1' && (zmyplugins[i].authoruserid == '' || (dGet('wtw_tuserid').value == zmyplugins[i].authoruserid && zmyplugins[i].version != zmyplugins[i].latestversion))) {
											zpluginslist += "<div id='wtw_share_" + zmyplugins[i].pluginname + "' class='wtw-greenbuttonright' onclick=\"WTW.openSharePlugin('" + zmyplugins[i].pluginname + "');\" alt='Click to Share' title='Click to Share'>Share</div>";
										}
										zpluginslist += "</td><td class='wtw-tablecolumns " + ztdclass + "'>";
										if (zmyplugins[i].active == '1') {
											if (WTW.isUserInRole('Admin')) {
												zpluginslist += "<div id='wtw_activate_" + zmyplugins[i].pluginname + "' class='wtw-bluebuttonright' onclick=\"WTW.activatePlugin('" + zmyplugins[i].pluginname + "',0);\" alt='Click to Deactivate' title='Click to Deactivate'>Activated</div>";
											} else {
												zpluginslist += "<div id='wtw_activate_" + zmyplugins[i].pluginname + "' class='wtw-bluebuttonright' onclick=\"console.log('Will Not Deactivate');\" alt='' title=''>Activated</div>";
											}
										} else {
											if (WTW.isUserInRole('Admin')) {
												zpluginslist += "<div id='wtw_activate_" + zmyplugins[i].pluginname + "' class='wtw-yellowbuttonright' onclick=\"WTW.activatePlugin('" + zmyplugins[i].pluginname + "',1);\" alt='Click to Activate' title='Click to Activate'>Deactivated</div>";
											} else {
												zpluginslist += "<div id='wtw_activate_" + zmyplugins[i].pluginname + "' class='wtw-yellowbuttonright' onclick=\"console.log('Request Activation');\" alt='Click to Request Activate' title='Click to Request Activate'>Deactivated</div>";
											}
										}
										zpluginslist += "</td></tr>";
										if (zmyplugins[i].active != '1' && zmyplugins[i].websrequired != undefined) {
											if (zmyplugins[i].websrequired.length > 0) {
												zpluginslist += "<tr><td></td><td style='text-align:right;vertical-align:top;padding:5px;font-weight:bold;' >Dependents:</td><td class='wtw-tablecolumnheading wtw-tdactiveoptional'>";
												for (var j=0;j<zmyplugins[i].websrequired.length;j++) {
													if (zmyplugins[i].websrequired[j] != null) {
														var zrequiredtext = 'Required';
														if (zmyplugins[i].websrequired[j].optional == '1') {
															zrequiredtext = 'Optional';
														}
														zpluginslist += "<div><div class='wtw-pluginreqopt'>" + zrequiredtext + "</div><div style='width:150px;display:inline-block;min-height:12px;'>3D " + zmyplugins[i].websrequired[j].webtype + "</div><a href='/admin.php?" + zmyplugins[i].websrequired[j].webtype.toLowerCase() + "id=" + zmyplugins[i].websrequired[j].webid + "'>" + zmyplugins[i].websrequired[j].webname + "</a><div class='wtw-clear'></div></div>";
													}
												}
												zpluginslist += "</td>&nbsp;<td></td><td></td></tr>";
											}
										}
									}
								}
							}
						}
					}
				}
				zpluginslist += "</table></div>";
				if (zshow == '1') {
					zpluginslist += "</div></div>";
				}
			}
		}
		switch (zshow) {
			case '1':
				if (dGet('wtw_updatepluginlist') != null) {
					dGet('wtw_updatepluginlist').innerHTML = zpluginslist;
				}
				WTW.hide('wtw_loadingupdating');
				WTW.hide('wtw_loadingupdates');
				break;
			case '2':
				if (dGet('wtw_pluginslist') != null) {
					dGet('wtw_pluginslist').innerHTML = zpluginslist;
				}
				WTW.hide('wtw_loadingplugins');
				WTW.show('wtw_pluginslist');
				WTW.show('wtw_allplugins');
				break;
		}
		
		if (dGet('wtw_updatespagescroll') != null) {
			dGet('wtw_selectimagepage').style.height = (WTW.sizeY - 100) + 'px';
			dGet('wtw_updatespagescroll').style.height = (WTW.sizeY - 170) + 'px';
		}

	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-getPluginInfoComplete=' + ex.message);
	}
}

WTWJS.prototype.updateBadges = async function() {
	/* update the display badges in the admin menu */
	/* to fully check for updates, use the 3D Internet Plugin function: WTW.checkForUpdates('1'); */
	try {
		var ztotaldashboardupdates = 0;
		var ztotalupdates = 0;
		WTW.hide('wtw_admindashboardbadge');
		WTW.hide('wtw_adminmenudashboardbadge');
		WTW.hide('wtw_adminmenuupdatesbadge');
		WTW.hide('wtw_adminmenufeedbackbadge');
		if (dGet('wtw_adminmenufeedbackbadge') != null) {
			if (dGet('wtw_adminmenufeedbackbadge').innerHTML != '') {
				if (WTW.isNumeric(dGet('wtw_adminmenufeedbackbadge').innerHTML)) {
					if (Number(dGet('wtw_adminmenufeedbackbadge').innerHTML) > 0) {
						ztotaldashboardupdates += Number(dGet('wtw_adminmenufeedbackbadge').innerHTML);
						WTW.showInline('wtw_adminmenufeedbackbadge');
					}
				}
			}
		}
		dGet('wtw_tbadgesupdates').value = ztotalupdates;
		dGet('wtw_tbadges').value = ztotaldashboardupdates;
		if (ztotalupdates > 0 && dGet('wtw_adminmenuupdatesbadge') != null) {
			dGet('wtw_adminmenuupdatesbadge').innerHTML = ztotalupdates;
			WTW.showInline('wtw_adminmenuupdatesbadge');
		}
		if (ztotaldashboardupdates > 0 && dGet('wtw_admindashboardbadge') != null) {
			dGet('wtw_admindashboardbadge').innerHTML = ztotaldashboardupdates;
			WTW.showInline('wtw_admindashboardbadge');
		}
		/* allow plugins to add to the totals of the update badges */
		WTW.pluginsUpdateBadges(ztotalupdates, ztotaldashboardupdates);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmenus.js-updateBadges=' + ex.message);
	}
}

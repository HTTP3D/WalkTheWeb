/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are used to administer a website in admin mode only */
/* action zones are used to run functions based on avatar movement (execute scripts, animations, sounds, lighting changes, triggers, etc...) */
/* core action zones include load zones (fetch and load molds when the avatar enters a region), doors, and dynamically loading scripts */

WTWJS.prototype.getLoadActionZoneID = function(zactionzonenamepart) {
	/* look up a load action zone id based on the actionzonename */
	var zloadactionzoneid = '';
	try {
		if (WTW.actionZones != null) {
			for (var i=0;i<WTW.actionZones.length;i++) {
				if (WTW.actionZones[i] != null) {
					if (WTW.actionZones[i].actionzonetype == 'loadzone' && WTW.actionZones[i].connectinggridid == dGet('wtw_tconnectinggridid').value && WTW.actionZones[i].actionzonename.toLowerCase().indexOf(zactionzonenamepart.toLowerCase()) > -1 && WTW.actionZones[i].actionzonename.toLowerCase().indexOf('custom') == -1) {
						zloadactionzoneid = WTW.actionZones[i].actionzoneid;
					}
				}
			}
		}
    } catch(ex) {
        WTW.log('core-scripts-admin-wtw_adminactionzones.js-getLoadActionZoneID=' + ex.message);
    }
	return zloadactionzoneid;
}

WTWJS.prototype.showActionZone = function(zactionzoneind) {
	/* when viewing a 3D Scene in edit mode, you can toggle on/off show zones in the quick edit menu on the bottom left */
	/* this will show the zones with an opacity (alpha) and boundry edges */
	/* helpful for aligning and distributing the work load of load zones */
	try {
		if (WTW.actionZones[zactionzoneind] != null) {
			switch (WTW.actionZones[zactionzoneind].actionzonetype) {
				case 'loadzone':
				case 'loadanimations':
				case 'mirror':
					WTW.setOpacity(WTW.actionZones[zactionzoneind].moldname,.2);
					break;
				case 'seat':
				case 'slidingdoor':
				case 'swingingdoor':
				case 'rotate':
				case 'peoplemover':
				case 'elevator':
				case 'passengerseat':
				case 'driverseat':
					WTW.setOpacity(WTW.actionZones[zactionzoneind].moldname, .2);
					WTW.setOpacity(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlepole-'), 1);
					break;
				case 'clickactivatedslidingdoor':
				case 'driverturnangle':
				case 'driverwheel':
					WTW.setOpacity(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlepole-'), 1);
					break;
				case 'driverturningwheel':
					WTW.setOpacity(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlepole-'), 1);
					WTW.setOpacity(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlepole2-'), 1);
					break;
				default:
					WTW.setOpacity(WTW.actionZones[zactionzoneind].moldname, .1);
					break;
			}
			var zactionzone = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname);
			var zactionzoneaxle = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxle-'));
			var zactionzoneaxlepole = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlepole-'));
			var zactionzoneaxlebase = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlebase-'));
			var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlebase2-'));
			if (zactionzone != null) {
				zactionzone.isVisible = true;
				zactionzone.enableEdgesRendering(); 
				zactionzone.edgesWidth = 4.0;
				zactionzone.edgesColor = new BABYLON.Color4(0, 0, 1, 1);
				zactionzone.renderingGroupId = 1;
			}
			if (zactionzoneaxle != null) {
				zactionzoneaxle.isVisible = true;
			}
			if (zactionzoneaxlepole != null) {
				zactionzoneaxlepole.isVisible = true;
			}
			if (zactionzoneaxlebase != null) {
				zactionzoneaxlebase.isVisible = true;
			}
			if (zactionzoneaxlebase2 != null) {
				zactionzoneaxlebase2.isVisible = true;
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-showActionZone=' + ex.message);
	}
}

WTWJS.prototype.hideActionZone = function(zactionzoneind) {
	/* when viewing a 3D Scene in edit mode, you can toggle on/off show zones in the quick edit menu on the bottom left */
	/* this returns the opacity (alpha) to 0 - for transparent, applies to zones and edges */
	try {
		if (WTW.actionZones[zactionzoneind] != null) {
			switch (WTW.actionZones[zactionzoneind].actionzonetype) {
				case 'slidingdoor':
				case 'swingingdoor':
				case 'rotate':
				case 'peoplemover':
				case 'elevator':
				case 'passengerseat':
				case 'driverseat':
					WTW.setOpacity(WTW.actionZones[zactionzoneind].moldname, 0);
					WTW.setOpacity(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlepole-'), 0);
					break;
				case 'clickactivatedslidingdoor':
				case 'driverturnangle':
				case 'driverwheel':
					WTW.setOpacity(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlepole-'), 0);
					break;
				case 'driverturningwheel':
					WTW.setOpacity(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlepole-'), 0);
					WTW.setOpacity(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlepole2-'), 0);
					break;
				default:
					WTW.setOpacity(WTW.actionZones[zactionzoneind].moldname,0);
					break;
			}
			var zactionzone = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname);
			var zactionzoneaxle = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxle-'));
			var zactionzoneaxlepole = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlepole-'));
			var zactionzoneaxlebase = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlebase-'));
			var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlebase2-'));
			if (zactionzone != null) {
				zactionzone.isVisible = false;
				zactionzone.disableEdgesRendering(); 
				zactionzone.renderingGroupId = 0;
			}
			if (zactionzoneaxle != null) {
				zactionzoneaxle.isVisible = false;
			}
			if (zactionzoneaxlepole != null) {
				zactionzoneaxlepole.isVisible = false;
			}
			if (zactionzoneaxlebase != null) {
				zactionzoneaxlebase.isVisible = false;
			}
			if (zactionzoneaxlebase2 != null) {
				zactionzoneaxlebase2.isVisible = false;
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-hideActionZone=' + ex.message);
	}
}

WTWJS.prototype.openActionZoneForm = function(zactionzoneid) {
	/* open the action zone edit form to modify or add a new action zone */
	try {
		var zparentname = dGet('wtw_tconnectinggridname').value;
		var zwebtype = 'building';
		var zactionzonetype = '';
		var zteleportwebid = '';
		var zspawnactionzoneid = '';
		var zactionzoneind = -1;
		WTW.hideAdminMenu();
		WTW.show('wtw_adminmenu20');
		WTW.show('wtw_adminmenu20b');
		if (communityid != '') {
			zwebtype = 'community';
		} else if (thingid != '') {
			zwebtype = 'thing';
		}
		dGet('wtw_tmoldshape').value = 'box';
		dGet('wtw_tmoldwebtype').value = zwebtype;
		WTW.setDDLValue('wtw_tmoldcovering', 'texture');
		/* check if zactionzoneid is a type for a new actionzone, otherwise it is the id to be edited */
		for (var i=0;i < dGet('wtw_tactionzonetypelist').options.length;i++) {
			if (zactionzoneid == dGet('wtw_tactionzonetypelist').options[i].value) {
				zactionzonetype = zactionzoneid;
			}
		}
		if (zactionzonetype != '') {
			/* add new action zone */
			var zdefaultloadactionzoneid = WTW.getLoadActionZoneID('High');
			WTW.getLoadActionZoneList(zdefaultloadactionzoneid);
			zactionzoneid = WTW.getRandomString(16);
			dGet('wtw_tactionzoneid').value = zactionzoneid;
			dGet('wtw_tactionzonetype').value = zactionzonetype;
			WTW.setNewActionZoneDefaults(zactionzonetype);
			WTW.setActionZoneFormFields(zactionzonetype);
			zactionzoneind = WTW.getNextCount(WTW.actionZones);
			dGet('wtw_tactionzoneind').value = zactionzoneind;
			WTW.actionZones[zactionzoneind] = WTW.newActionZone();
			WTW.actionZones[zactionzoneind].actionzoneid = zactionzoneid;
			WTW.actionZones[zactionzoneind].actionzoneind = zactionzoneind;
			WTW.actionZones[zactionzoneind].buildinginfo.buildingid = buildingid;
			WTW.actionZones[zactionzoneind].communityinfo.communityid = communityid;
			WTW.actionZones[zactionzoneind].thinginfo.thingid = thingid;
			WTW.actionZones[zactionzoneind].actionzonename = dGet('wtw_tactionzonename').value;
			WTW.actionZones[zactionzoneind].actionzonetype = dGet('wtw_tactionzonetype').value;
			WTW.actionZones[zactionzoneind].actionzoneshape = dGet('wtw_tactionzoneshape').value;
			WTW.actionZones[zactionzoneind].position.x = dGet('wtw_tactionzoneposx').value;
			WTW.actionZones[zactionzoneind].position.y = dGet('wtw_tactionzoneposy').value;
			WTW.actionZones[zactionzoneind].position.z = dGet('wtw_tactionzoneposz').value;
			WTW.actionZones[zactionzoneind].scaling.x = dGet('wtw_tactionzonescalingx').value;
			WTW.actionZones[zactionzoneind].scaling.y = dGet('wtw_tactionzonescalingy').value;
			WTW.actionZones[zactionzoneind].scaling.z = dGet('wtw_tactionzonescalingz').value;
			WTW.actionZones[zactionzoneind].rotation.x = dGet('wtw_tactionzonerotx').value;
			WTW.actionZones[zactionzoneind].rotation.y = dGet('wtw_tactionzoneroty').value;
			WTW.actionZones[zactionzoneind].rotation.z = dGet('wtw_tactionzonerotz').value;
			WTW.actionZones[zactionzoneind].axis.position.x = dGet('wtw_taxispositionx').value;
			WTW.actionZones[zactionzoneind].axis.position.y = dGet('wtw_taxispositiony').value;
			WTW.actionZones[zactionzoneind].axis.position.z = dGet('wtw_taxispositionz').value;
			WTW.actionZones[zactionzoneind].axis.rotation.x = dGet('wtw_taxisrotationx').value;
			WTW.actionZones[zactionzoneind].axis.rotation.y = dGet('wtw_taxisrotationy').value;
			WTW.actionZones[zactionzoneind].axis.rotation.z = dGet('wtw_taxisrotationz').value;
			WTW.actionZones[zactionzoneind].axis.rotateaxis = dGet('wtw_tactionzonerotateaxis').value;
			WTW.actionZones[zactionzoneind].axis.rotatedegrees = dGet('wtw_tactionzonerotatedegrees').value;
			WTW.actionZones[zactionzoneind].axis.rotatedirection = '1';
			WTW.actionZones[zactionzoneind].attachmoldid = dGet('wtw_tattachmoldid').value;
			WTW.actionZones[zactionzoneind].movementtype = dGet('wtw_tactionzonemovementtype').value;
			WTW.actionZones[zactionzoneind].rotatespeed = dGet('wtw_tactionzonerotatespeed').value;
			WTW.actionZones[zactionzoneind].value1 = dGet('wtw_tactionzonevalue1').value;
			WTW.actionZones[zactionzoneind].value2 = dGet('wtw_tactionzonevalue2').value;
			WTW.actionZones[zactionzoneind].defaulteditform = dGet('wtw_tactionzonedefaulteditform').value;
			WTW.actionZones[zactionzoneind].movementdistance = dGet('wtw_taxisscalingz').value;
			WTW.actionZones[zactionzoneind].jsfunction = dGet('wtw_tactionzonejsfunction').value;
			WTW.actionZones[zactionzoneind].jsparameters = dGet('wtw_tactionzonejsparameters').value;
			WTW.actionZones[zactionzoneind].loadactionzoneid = zdefaultloadactionzoneid;
			WTW.actionZones[zactionzoneind].connectinggridid = dGet('wtw_tconnectinggridid').value;
			WTW.actionZones[zactionzoneind].connectinggridind = dGet('wtw_tconnectinggridind').value;
			WTW.actionZones[zactionzoneind].parentname = WTW.getParentName(WTW.actionZones[zactionzoneind].connectinggridind);
			WTW.actionZones[zactionzoneind].moldname = 'local-actionzone-' + zactionzoneind + '-' + WTW.actionZones[zactionzoneind].actionzoneid + '-' + WTW.actionZones[zactionzoneind].connectinggridind + '-' + WTW.actionZones[zactionzoneind].connectinggridid + '-' + WTW.actionZones[zactionzoneind].actionzonetype;
			WTW.addActionZone(WTW.actionZones[zactionzoneind].moldname, WTW.actionZones[zactionzoneind]);
			WTW.showActionZone(zactionzoneind);
			if (zactionzonetype.indexOf('seat') > -1) {	
				dGet('wtw_tattachavatarmoldname').value = WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlebase2-');
			}
			dGet('wtw_actionzonepartslist').innerHTML = '';
			WTW.submitActionZoneForm(2);
			var zsafetyincrement = 0;
			var znewaztimer = window.setInterval(function() {
				zsafetyincrement += 1;
				var zactionzone = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname);
				if (zactionzone != null || zsafetyincrement > 50) {
					WTW.setNewActionZone();
					window.clearInterval(znewaztimer);
					znewaztimer = null;
				}
			},100);
		} else {
			/* edit existing action zone */
			dGet('wtw_tactionzoneid').value = zactionzoneid;
			zactionzoneind = WTW.getActionZoneInd(zactionzoneid,dGet('wtw_tconnectinggridind').value);
			dGet('wtw_tactionzoneind').value = zactionzoneind;
			if (WTW.actionZones[zactionzoneind] != null) {
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Edit ' + WTW.actionZones[zactionzoneind].actionzonename;
				dGet('wtw_tactionzonetype').value = WTW.actionZones[zactionzoneind].actionzonetype;
				zactionzonetype = dGet('wtw_tactionzonetype').value;
				dGet('wtw_tactionzonerotateaxis').value = WTW.actionZones[zactionzoneind].axis.rotateaxis;
				dGet('wtw_tactionzonename').value = WTW.actionZones[zactionzoneind].actionzonename;
				dGet('wtw_tactionzonerotatedegrees').value = WTW.actionZones[zactionzoneind].axis.rotatedegrees;
				if (Number(WTW.actionZones[zactionzoneind].scaling.x) == 20 && Number(WTW.actionZones[zactionzoneind].scaling.y) == 20 && Number(WTW.actionZones[zactionzoneind].scaling.z) == 20 && Number(WTW.actionZones[zactionzoneind].position.x) == Number(WTW.actionZones[zactionzoneind].axis.position.x) && Number(WTW.actionZones[zactionzoneind].position.y) == Number(WTW.actionZones[zactionzoneind].axis.position.y) && Number(WTW.actionZones[zactionzoneind].position.z) == Number(WTW.actionZones[zactionzoneind].axis.position.z)) {
					dGet('wtw_tcopyaxletoactionzone').checked = true;
				} else {
					dGet('wtw_tcopyaxletoactionzone').checked = false;
				}
				dGet('wtw_taxisscalingx').value = '.20';
				dGet('wtw_taxisscalingy').value = '.20';						
				dGet('wtw_tactionzoneshape').value = WTW.actionZones[zactionzoneind].actionzoneshape;
				dGet('wtw_tactionzonemovementtype').value = WTW.actionZones[zactionzoneind].movementtype;
				dGet('wtw_taxispositionx').value = WTW.actionZones[zactionzoneind].axis.position.x;
				dGet('wtw_taxispositiony').value = WTW.actionZones[zactionzoneind].axis.position.y;
				dGet('wtw_taxispositionz').value = WTW.actionZones[zactionzoneind].axis.position.z;
				dGet('wtw_taxisrotationx').value = WTW.actionZones[zactionzoneind].axis.rotation.x;
				dGet('wtw_taxisrotationy').value = WTW.actionZones[zactionzoneind].axis.rotation.y;
				dGet('wtw_taxisrotationz').value = WTW.actionZones[zactionzoneind].axis.rotation.z;
				dGet('wtw_tactionzoneposx').value = WTW.actionZones[zactionzoneind].position.x;
				dGet('wtw_tactionzoneposy').value = WTW.actionZones[zactionzoneind].position.y;
				dGet('wtw_tactionzoneposz').value = WTW.actionZones[zactionzoneind].position.z;
				dGet('wtw_tactionzonescalingx').value = WTW.actionZones[zactionzoneind].scaling.x;
				dGet('wtw_tactionzonescalingy').value = WTW.actionZones[zactionzoneind].scaling.y;
				dGet('wtw_tactionzonescalingz').value = WTW.actionZones[zactionzoneind].scaling.z;
				dGet('wtw_tactionzonerotx').value = WTW.actionZones[zactionzoneind].rotation.x;
				dGet('wtw_tactionzoneroty').value = WTW.actionZones[zactionzoneind].rotation.y;
				dGet('wtw_tactionzonerotz').value = WTW.actionZones[zactionzoneind].rotation.z;
				dGet('wtw_tattachmoldid').value = WTW.actionZones[zactionzoneind].attachmoldid;
				dGet('wtw_taxisscalingz').value = WTW.actionZones[zactionzoneind].movementdistance;
				dGet('wtw_tactionzonerotatespeed').value = WTW.actionZones[zactionzoneind].rotatespeed;
				dGet('wtw_tactionzonevalue1').value = WTW.actionZones[zactionzoneind].value1;
				dGet('wtw_tactionzonevalue2').value = WTW.actionZones[zactionzoneind].value2;
				dGet('wtw_tactionzonedefaulteditform').value = WTW.actionZones[zactionzoneind].defaulteditform;
				dGet('wtw_tactionzonejsfunction').value = WTW.actionZones[zactionzoneind].jsfunction;
				dGet('wtw_tactionzonejsparameters').value = WTW.actionZones[zactionzoneind].jsparameters;
				zteleportwebid = WTW.actionZones[zactionzoneind].teleportwebid;
				zspawnactionzoneid = WTW.actionZones[zactionzoneind].spawnactionzoneid;
				if (WTW.actionZones[zactionzoneind].scripts != null) {
					WTW.loadAZFormScripts(WTW.actionZones[zactionzoneind].scripts);
				}
				WTW.getLoadActionZoneList(WTW.actionZones[zactionzoneind].loadactionzoneid);
				WTW.setActionZoneFormFields(dGet('wtw_tactionzonetype').value);
				if (zactionzonetype.indexOf('seat') > -1) {	
					dGet('wtw_tattachavatarmoldname').value = WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlebase2-');
				}
				var zactionzone = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname);
				if (zactionzone == null) {
					WTW.addActionZone(WTW.actionZones[zactionzoneind].moldname, WTW.actionZones[zactionzoneind]);
				}
				WTW.showActionZone(zactionzoneind);
				var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlebase2-'));
				var zactionzoneaxle = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxle-'));
				dGet('wtw_actionzonepartslist').innerHTML = '';
				if (zactionzoneaxlebase2 != null) {
					var zmoldparts1 = zactionzoneaxlebase2.getChildren();
					if (zmoldparts1.length > 0) {
						for (var i=0;i < zmoldparts1.length;i++) {
							var zmoldpartname = zmoldparts1[i].name;
							var zshape = i;
							if (zmoldpartname.indexOf('-') > -1) {
								var znamepart = WTW.getMoldnameParts(zmoldpartname);
								zshape = znamepart.shape;
							}
							if (zmoldpartname.indexOf('molds') > -1) {
								dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightMold('" + zmoldpartname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + zmoldpartname + "');\" onclick=\"WTW.removeActionZonePart('" + zmoldpartname + "')\">Action Zone Part (" + zshape + ")</div>";
							}
						}
					}
				}
				if (zactionzoneaxle != null) {
					var zmoldparts2 = zactionzoneaxle.getChildren();
					if (zmoldparts2.length > 0) {
						for (var i=0;i < zmoldparts2.length;i++) {
							var zmoldpartname = zmoldparts2[i].name;
							var zshape = i;
							if (zmoldpartname.indexOf('-') > -1) {
								var znamepart = WTW.getMoldnameParts(zmoldpartname);
								zshape = znamepart.shape;
							}
							if (zmoldpartname.indexOf('molds') > -1) {
								dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightMold('" + zmoldpartname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + zmoldpartname + "');\" onclick=\"WTW.removeActionZonePart('" + zmoldpartname + "')\">Action Zone Part (" + zshape + ")</div>";
							}
						}
					}
				}
				if (zactionzonetype.indexOf('seat') > -1) {
					for (var j=0; j < WTW.thingMolds.length; j++) {
						if (WTW.thingMolds[j] != null) {
							if (WTW.thingMolds[j].actionzoneid == zactionzoneid) {
								dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightMold('" + WTW.thingMolds[j].moldname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + WTW.thingMolds[j].moldname + "');\" onclick=\"WTW.removeActionZonePart('" + WTW.thingMolds[j].moldname + "')\">Action Zone Part (" + WTW.thingMolds[j].shape + ")</div>";
							}
						}
					}
					for (var j=0; j < WTW.buildingMolds.length; j++) {
						if (WTW.buildingMolds[j] != null) {
							if (WTW.buildingMolds[j].actionzoneid == zactionzoneid) {
								dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightMold('" + WTW.buildingMolds[j].moldname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + WTW.buildingMolds[j].moldname + "');\" onclick=\"WTW.removeActionZonePart('" + WTW.buildingMolds[j].moldname + "')\">Action Zone Part (" + WTW.buildingMolds[j].shape + ")</div>";
							}
						}
					}
					for (var j=0; j < WTW.communitiesMolds.length; j++) {
						if (WTW.communitiesMolds[j] != null) {
							if (WTW.communitiesMolds[j].actionzoneid == zactionzoneid) {
								dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightMold('" + WTW.communitiesMolds[j].moldname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + WTW.communitiesMolds[j].moldname + "');\" onclick=\"WTW.removeActionZonePart('" + WTW.communitiesMolds[j].moldname + "')\">Action Zone Part (" + WTW.communitiesMolds[j].shape + ")</div>";
							}
						}
					}
				}
				WTW.setNewActionZone();
			}
		}
		let actionzonename = dGet('wtw_tactionzonename').value;
		if (actionzonename == 'Extreme Load Zone' || actionzonename == 'High - Load when far' || actionzonename == 'Normal - Load when near') {
			dGet('wtw_tactionzonename').disabled = true;
			WTW.hide('wtw_bdelactionzone');
		} else {
			dGet('wtw_tactionzonename').disabled = false;
			WTW.showInline('wtw_bdelactionzone');
		}
		switch (zactionzonetype) {
			case 'loadanimations':
				WTW.loadAZAnimationsList();
				WTW.loadAZAvatarAnimations();
				break;
			case 'teleportzone':
				WTW.loadAZCommunitiesList(zteleportwebid, zspawnactionzoneid);
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-openActionZoneForm=' + ex.message);
	}
}		

WTWJS.prototype.getAZFormScripts = async function() {
	/* some action zones add javascripts when the avatar enters the zone */
	/* this function checks for scripts needing to be loaded */
	try {
		WTW.getAsyncJSON('/connect/scripts.php?actionzoneid=' + dGet('wtw_tactionzoneid').value, 
			function(zresponse) {
				if (zresponse != null) {
					zresponse = JSON.parse(zresponse);
					WTW.loadAZFormScripts(zresponse);
				}
			}
		);		
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-getAZFormScripts=' + ex.message);
	}
}		

WTWJS.prototype.loadAZFormScripts = function(zscripts) {
	/* process results of checking for scripts needing to be loaded */
	/* show the list of scripts */
	try {
		dGet('wtw_azjavascriptlinks').innerHTML = '';
		var zwebid = communityid + buildingid + thingid;
		var zwebtype = 'buildings';
		if (communityid != '') {
			zwebtype = 'communities';
		} else if (thingid != '') {
			zwebtype = 'things';
		}
		var zscriptlinks = '';
		for (var i=0;i<zscripts.length;i++) {
			zscriptlinks += "<div class='wtw-menulevel2'><div onclick=\"WTW.deleteAZFormScript('" + zscripts[i].scriptid + "','" + zscripts[i].scriptpath + "');\" class='wtw-redbuttonright'>Delete</div><a href='/content/uploads/" + zwebtype + "/" + zwebid + "/" + zscripts[i].scriptpath + "' target='_blank' class='wtw-linkwrap'>" + zscripts[i].scriptpath + "</a></div><div class='wtw-clear'></div>";
		}
		dGet('wtw_azjavascriptlinks').innerHTML = zscriptlinks;
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-loadAZFormScripts=' + ex.message);
	}
}		

WTWJS.prototype.deleteAZFormScript = async function(zscriptid, zscriptpath) {
	/* remove a script from the list of scripts to be loaded with a zone */
	try {
		var zwebtype = 'communities';
		if (buildingid != '') {
			zwebtype = 'buildings';
		} else if (thingid != '') {
			zwebtype = 'things';
		}
		var zrequest = {
			'actionzoneid': dGet('wtw_tactionzoneid').value,
			'webtype': zwebtype,
			'webid': communityid + buildingid + thingid,
			'scriptid': zscriptid,
			'scriptpath': zscriptpath,
			'function':'deletejavascriptfile'
		};
		WTW.postAsyncJSON('/core/handlers/uploadedfiles.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.getAZFormScripts();
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-deleteAZFormScript=' + ex.message);
	}
}		

WTWJS.prototype.loadAZAnimationsList = async function() {
	/* some action zones add animations to the avatar when the avatar enters the zone */
	/* this function lists the animations that are loaded in this zone */
	try {
		dGet('wtw_azavataranimations').innerHTML = '';
		WTW.getAsyncJSON('/connect/actionzone.php?actionzoneid=' + dGet('wtw_tactionzoneid').value, 
			function(zresponse) {
				if (zresponse != null) {
					zresponse = JSON.parse(zresponse);
					if (zresponse.actionzones[0].avataranimations.length > 0) {
						dGet('wtw_azavataranimations').innerHTML += "<div class='wtw-onecol'>Load Animations:</div><br />";
						for (var i=0;i<zresponse.actionzones[0].avataranimations.length;i++) {
							if (zresponse.actionzones[0].avataranimations[i] != null) {
								dGet('wtw_azavataranimations').innerHTML += "<div class='wtw-redbuttonright' onclick=\"WTW.deleteAZAvatarAnimation('" + zresponse.actionzones[0].avataranimations[i].actionzoneanimationid + "');\">Delete</div><div class='wtw-smallwhite'>" + zresponse.actionzones[0].avataranimations[i].animationfriendlyname + " (" + zresponse.actionzones[0].avataranimations[i].animationevent + ")</div><div class='wtw-clear'></div>";
							}
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-loadAZAnimationsList=' + ex.message);
	}
}		

WTWJS.prototype.deleteAZAvatarAnimation = async function(zactionzoneanimationid) {
	/* remove an animation from the list of animations to be loaded with a zone */
	try {
		var zrequest = {
			'actionzoneid': dGet('wtw_tactionzoneid').value,
			'communityid': communityid,
			'buildingid': buildingid,
			'thingid': thingid,
			'avataranimationid': zactionzoneanimationid,
			'function':'deleteazavataranimation'
		};
		WTW.postAsyncJSON('/core/handlers/actionzones.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.loadAZAnimationsList();
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-deleteAZAvatarAnimation=' + ex.message);
	}
}		

WTWJS.prototype.loadAZAvatarAnimations = async function() {
	/* load avatar animations list to select from when adding to a zone */
	try {
		WTW.clearDDL('wtw_tazavataranimationid');
		WTW.getAsyncJSON('/connect/avataranimations.php', 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				for (var i=0;i<zresponse.avataranimations.length;i++) {
					if (zresponse.avataranimations[i] != null) {
						var zoption = document.createElement('option');
						zoption.text = zresponse.avataranimations[i].animationfriendlyname + ' (' + zresponse.avataranimations[i].animationevent + ')';
						zoption.value = zresponse.avataranimations[i].avataranimationid;
						dGet('wtw_tazavataranimationid').add(zoption);
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-loadAZAvatarAnimations=' + ex.message);
	}
}		

WTWJS.prototype.loadAZCommunitiesList = async function(zteleportwebid, zspawnactionzoneid) {
	/* load communities list to select from when adding to a zone for teleport */
	try {
		WTW.clearDDL('wtw_tazteleportzoneid');
		var zoption0 = document.createElement('option');
		zoption0.text = '';
		zoption0.value = '';
		dGet('wtw_tazteleportzoneid').add(zoption0);
		WTW.getAsyncJSON('/connect/communitynames.php', 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zdefault = true;
				for (var i=0;i<zresponse.length;i++) {
					if (zresponse[i] != null) {
						var zoption = document.createElement('option');
						zoption.text = zresponse[i].communityname;
						zoption.value = zresponse[i].communityid;
						if (zteleportwebid == zresponse[i].communityid) {
							zoption.selected = true;
							zdefault = false;
							WTW.loadAZSpawnList(zteleportwebid, zspawnactionzoneid);
						}
						dGet('wtw_tazteleportzoneid').add(zoption);
					}
				}
				if (zdefault) {
					dGet('wtw_tazteleportzoneid').options[0].selected = true;
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-loadAZCommunitiesList=' + ex.message);
	}
}		

WTWJS.prototype.reloadAZSpawnList = async function() {
	/* reload spawn action zone list following a change in community */
	try {
		var zteleportzoneid = WTW.getDDLValue('wtw_tazteleportzoneid');
		WTW.loadAZSpawnList(zteleportzoneid);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-reloadAZSpawnList=' + ex.message);
	}
}		

WTWJS.prototype.loadAZSpawnList = async function(zteleportwebid, zspawnactionzoneid) {
	/* load communities list to select from when adding to a zone for teleport */
	try {
		WTW.clearDDL('wtw_tazspawnzoneid');
		var zoption0 = document.createElement('option');
		zoption0.text = 'Default';
		zoption0.value = '';
		dGet('wtw_tazspawnzoneid').add(zoption0);
		WTW.getAsyncJSON('/connect/domaininfo.php?communityid=' + zteleportwebid, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zdefault = true;
				if (zresponse.spawnzones != null) {
					for (var i=0;i<zresponse.spawnzones.length;i++) {
						if (zresponse.spawnzones[i] != null) {
							var zoption = document.createElement('option');
							zoption.text = zresponse.spawnzones[i].actionzonename;
							zoption.value = zresponse.spawnzones[i].actionzoneid;
							if (zspawnactionzoneid == zresponse.spawnzones[i].actionzoneid) {
								zoption.selected = true;
								zdefault = false;
							}
							dGet('wtw_tazspawnzoneid').add(zoption);
						}
					}
				}
				if (zdefault) {
					dGet('wtw_tazspawnzoneid').options[0].selected = true;
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-loadAZSpawnList=' + ex.message);
	}
}		

WTWJS.prototype.saveAZAvatarAnimation = async function() {
	/* save an avatar animation to the list for a zone */
	try {
		var zrequest = {
			'actionzoneid': dGet('wtw_tactionzoneid').value,
			'communityid': communityid,
			'buildingid': buildingid,
			'thingid': thingid,
			'avataranimationid':WTW.getDDLValue('wtw_tazavataranimationid'),
			'function':'saveazavataranimation'
		};
		WTW.postAsyncJSON('/core/handlers/actionzones.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.loadAZAnimationsList();
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-saveAZAvatarAnimation=' + ex.message);
	}
}		

WTWJS.prototype.setActionZonePosition = function() {
	/* the action zone moves with the axle on some zones when editing unless you uncheck the copy axle position checkbox */
	try {
		if (dGet('wtw_tcopyaxletoactionzone').checked == true) {
			dGet('wtw_tactionzoneposx').value = dGet('wtw_taxispositionx').value;
			dGet('wtw_tactionzoneposy').value = dGet('wtw_taxispositiony').value;
			dGet('wtw_tactionzoneposz').value = dGet('wtw_taxispositionz').value;
			WTW.setNewActionZone();
		}   
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-setActionZonePosition=' + ex.message);
	}
}

WTWJS.prototype.submitActionZoneForm = async function(w) {
	/* submit the action zone form */
	try {
		if (w != 2) {
			WTW.closeEditPoles();
		}
		let zactionzonename = dGet('wtw_tactionzonename').value;
		if (zactionzonename == 'Extreme Load Zone' || zactionzonename == 'High - Load when far' || zactionzonename == 'Normal - Load when near') {
			dGet('wtw_tactionzonename').disabled = false;
			WTW.showInline('wtw_bdelactionzone');
		} else {
			if (dGet('wtw_tactionzonetype').value == 'loadzone' && dGet('wtw_tactionzonename').value.toLowerCase().indexOf('custom') == -1) {
				dGet('wtw_tactionzonename').value = 'Custom: ' + dGet('wtw_tactionzonename').value;
			}
		}
		if (w == 0) {
			/* delete action zone - note that even a new action zone is already saved in the database when editing starts */
			/* (therefore there is no cancel or undo for the edit process) */
			/* this process sets the delete flag for it to not be loaded with the 3D Scene */
			var zactionzone = WTW.getMeshOrNodeByID('local-actionzone-' + dGet('wtw_tactionzoneind').value + '-' + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].actionzoneid + '-' + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].connectinggridind + '-' + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].connectinggridid + '-' + dGet('wtw_tactionzonetype').value);
			var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID('local-actionzoneaxlebase2-' + dGet('wtw_tactionzoneind').value + '-' + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].actionzoneid + '-' + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].connectinggridind + '-' + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].connectinggridid + '-' + dGet('wtw_tactionzonetype').value);
			var zactionzoneaxlebase = WTW.getMeshOrNodeByID('local-actionzoneaxlebase-' + dGet('wtw_tactionzoneind').value + '-' + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].actionzoneid + '-' + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].connectinggridind + '-' + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].connectinggridid + '-' + dGet('wtw_tactionzonetype').value);
			if (zactionzoneaxlebase2 != null && zactionzoneaxlebase != null) {
				var zactionzonepart = zactionzoneaxlebase2.getChildren();
				var zmoldswithactionzones = '';
				if (zactionzonepart != null) {
					if (zactionzonepart.length > 0) {
						for (var i=0;i< zactionzonepart.length;i++) {
							var zactionzonepartname = zactionzonepart[i].name;
							if (zactionzonepartname.indexOf('-') > -1) {
								var znamepart = WTW.getMoldnameParts(zactionzonepartname);
								if (znamepart.moldind != null) {
									if (WTW.isNumeric(znamepart.moldind)) {
										if (znamepart.molds != null) {
											if (znamepart.molds[znamepart.moldind] != null) {
												znamepart.molds[znamepart.moldind].actionzoneid = '';
												znamepart.molds[znamepart.moldind].parentname = WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].parentname;
												zmoldswithactionzones += ',' + znamepart.moldid;
											}
										}
									}
								}
							}
							if (zactionzonepart[i].parent != null) {
								if (zactionzonepart[i].parent != zactionzoneaxlebase.parent) {
									if (zactionzonepart[i].parent.name.indexOf('actionzone') > -1) {
										zactionzonepart[i].parent = zactionzoneaxlebase.parent;
										var zposx = zactionzonepart[i].position.x;
										var zposy = zactionzonepart[i].position.y;
										var zposz = zactionzonepart[i].position.z;
										zposx += zactionzoneaxlebase.position.x;
										zposy += zactionzoneaxlebase.position.y;
										zposz += zactionzoneaxlebase.position.z;
										zactionzonepart[i].position.x = zposx;
										zactionzonepart[i].position.y = zposy;
										zactionzonepart[i].position.z = zposz;
									}
								}
							}
						}
					}
				}				
				if (zmoldswithactionzones != '') {
					WTW.clearActionZone(zmoldswithactionzones, 0);
				}
			}
			if (WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].actionzonetype == 'loadzone') {
				WTW.setShownMolds();
			}
			if (w != 2) {
				WTW.disposeClean(WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].moldname + '-arrow');	
				WTW.hideActionZone(Number(dGet('wtw_tactionzoneind').value));
			}
			WTW.disposeClean('local-actionzone-' + dGet('wtw_tactionzoneind').value + '-' + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].actionzoneid + '-' + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].connectinggridind + '-' + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].connectinggridid + '-' + dGet('wtw_tactionzonetype').value);
			WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)] = null;

			if (dGet('wtw_tactionzoneid').value != '') {
				var zrequest = {
					'actionzoneid': dGet('wtw_tactionzoneid').value,
					'communityid': communityid,
					'buildingid': buildingid,
					'thingid': thingid,
					'function':'deleteactionzone'
				};
				WTW.postAsyncJSON('/core/handlers/actionzones.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						if (w != 2) {
							WTW.hideAdminMenu();
							WTW.backToEdit();
						}
					}
				);
			}
		} else {
			/* save the action zone */
			var zactionzoneind = Number(dGet('wtw_tactionzoneind').value);
			var zloadactionzoneid = WTW.getDDLValue('wtw_tazloadactionzoneid');
			var zteleportwebtype = '';
			var zteleportwebid = WTW.getDDLValue('wtw_tazteleportzoneid');
			var zspawnactionzoneid = WTW.getDDLValue('wtw_tazspawnzoneid');
			if (zteleportwebid != '') {
				zteleportwebtype = 'community';
			}
			if (zactionzonename == 'Extreme Load Zone') {
				zloadactionzoneid = '';
			}
			/* save the changes to the loaded arrays */
			if (WTW.actionZones[zactionzoneind] != null) {
				WTW.actionZones[zactionzoneind].actionzoneid = dGet('wtw_tactionzoneid').value;
				WTW.actionZones[zactionzoneind].thinginfo.thingid = thingid;
				WTW.actionZones[zactionzoneind].buildinginfo.buildingid = buildingid;
				WTW.actionZones[zactionzoneind].communityinfo.communityid = communityid;
				WTW.actionZones[zactionzoneind].actionzonename = dGet('wtw_tactionzonename').value;
				WTW.actionZones[zactionzoneind].actionzonetype = dGet('wtw_tactionzonetype').value;
				WTW.actionZones[zactionzoneind].actionzoneshape = dGet('wtw_tactionzoneshape').value;
				WTW.actionZones[zactionzoneind].attachmoldid = dGet('wtw_tattachmoldid').value;
				WTW.actionZones[zactionzoneind].teleportwebid = zteleportwebid;
				WTW.actionZones[zactionzoneind].teleportwebtype = zteleportwebtype;
				WTW.actionZones[zactionzoneind].spawnactionzoneid = zspawnactionzoneid;
				WTW.actionZones[zactionzoneind].movementtype = dGet('wtw_tactionzonemovementtype').value;
				WTW.actionZones[zactionzoneind].rotatespeed = dGet('wtw_tactionzonerotatespeed').value;
				WTW.actionZones[zactionzoneind].value1 = dGet('wtw_tactionzonevalue1').value;
				WTW.actionZones[zactionzoneind].value2 = dGet('wtw_tactionzonevalue2').value;
				WTW.actionZones[zactionzoneind].defaulteditform = dGet('wtw_tactionzonedefaulteditform').value;
				WTW.actionZones[zactionzoneind].position.x = dGet('wtw_tactionzoneposx').value;
				WTW.actionZones[zactionzoneind].position.y = dGet('wtw_tactionzoneposy').value;
				WTW.actionZones[zactionzoneind].position.z = dGet('wtw_tactionzoneposz').value;
				WTW.actionZones[zactionzoneind].scaling.x = dGet('wtw_tactionzonescalingx').value;
				WTW.actionZones[zactionzoneind].scaling.y = dGet('wtw_tactionzonescalingy').value;
				WTW.actionZones[zactionzoneind].scaling.z = dGet('wtw_tactionzonescalingz').value;
				WTW.actionZones[zactionzoneind].rotation.x = dGet('wtw_tactionzonerotx').value;
				WTW.actionZones[zactionzoneind].rotation.y = dGet('wtw_tactionzoneroty').value;
				WTW.actionZones[zactionzoneind].rotation.z = dGet('wtw_tactionzonerotz').value;
				WTW.actionZones[zactionzoneind].axis.position.x = dGet('wtw_taxispositionx').value;
				WTW.actionZones[zactionzoneind].axis.position.y = dGet('wtw_taxispositiony').value;
				WTW.actionZones[zactionzoneind].axis.position.z = dGet('wtw_taxispositionz').value;
				WTW.actionZones[zactionzoneind].axis.rotation.x = dGet('wtw_taxisrotationx').value;
				WTW.actionZones[zactionzoneind].axis.rotation.y = dGet('wtw_taxisrotationy').value;
				WTW.actionZones[zactionzoneind].axis.rotation.z = dGet('wtw_taxisrotationz').value;
				WTW.actionZones[zactionzoneind].axis.rotateaxis = dGet('wtw_tactionzonerotateaxis').value;
				WTW.actionZones[zactionzoneind].axis.rotatedegrees = dGet('wtw_tactionzonerotatedegrees').value;
				WTW.actionZones[zactionzoneind].axis.rotatedirection = '1';
				WTW.actionZones[zactionzoneind].movementdistance = dGet('wtw_taxisscalingz').value;
				WTW.actionZones[zactionzoneind].loadactionzoneid = zloadactionzoneid;
				WTW.actionZones[zactionzoneind].jsfunction = dGet('wtw_tactionzonejsfunction').value;
				WTW.actionZones[zactionzoneind].jsparameters = dGet('wtw_tactionzonejsparameters').value;
			}
			
			/* save to the database */
			var zrequest = {
				'actionzoneid': dGet('wtw_tactionzoneid').value,
				'communityid': communityid,
				'buildingid': buildingid,
				'thingid': thingid,
				'actionzonename':dGet('wtw_tactionzonename').value,
				'actionzonetype':dGet('wtw_tactionzonetype').value,
				'actionzoneshape':dGet('wtw_tactionzoneshape').value,
				'attachmoldid':dGet('wtw_tattachmoldid').value,
				'teleportwebid':zteleportwebid,
				'teleportwebtype':zteleportwebtype,
				'spawnactionzoneid':zspawnactionzoneid,
				'movementtype':dGet('wtw_tactionzonemovementtype').value,
				'rotatespeed':dGet('wtw_tactionzonerotatespeed').value,
				'value1':dGet('wtw_tactionzonevalue1').value,
				'value2':dGet('wtw_tactionzonevalue2').value,
				'defaulteditform':dGet('wtw_tactionzonedefaulteditform').value,
				'positionx':dGet('wtw_tactionzoneposx').value,
				'positiony':dGet('wtw_tactionzoneposy').value,
				'positionz':dGet('wtw_tactionzoneposz').value,
				'scalingx':dGet('wtw_tactionzonescalingx').value,
				'scalingy':dGet('wtw_tactionzonescalingy').value,
				'scalingz':dGet('wtw_tactionzonescalingz').value,
				'rotationx':dGet('wtw_tactionzonerotx').value,
				'rotationy':dGet('wtw_tactionzoneroty').value,
				'rotationz':dGet('wtw_tactionzonerotz').value,
				'axispositionx':dGet('wtw_taxispositionx').value,
				'axispositiony':dGet('wtw_taxispositiony').value,
				'axispositionz':dGet('wtw_taxispositionz').value,
				'axisscalingx':dGet('wtw_taxisscalingx').value,
				'axisscalingy':dGet('wtw_taxisscalingy').value,
				'axisscalingz':dGet('wtw_taxisscalingz').value,
				'axisrotationx':dGet('wtw_taxisrotationx').value,
				'axisrotationy':dGet('wtw_taxisrotationy').value,
				'axisrotationz':dGet('wtw_taxisrotationz').value,
				'rotateaxis':dGet('wtw_tactionzonerotateaxis').value,
				'rotatedegrees':dGet('wtw_tactionzonerotatedegrees').value,
				'rotatedirection':'1',
				'loadactionzoneid':zloadactionzoneid,
				'jsfunction':dGet('wtw_tactionzonejsfunction').value,
				'jsparameters':dGet('wtw_tactionzonejsparameters').value,
				'function':'saveactionzone'
			};
			WTW.postAsyncJSON('/core/handlers/actionzones.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					if (w != 2) {
						WTW.hideAdminMenu();
						WTW.backToEdit();
						WTW.hideActionZone(Number(dGet('wtw_tactionzoneind').value));
						WTW.disposeClean(WTW.actionZones[zactionzoneind].moldname + '-arrow');
					}
				}
			);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-submitActionZoneForm=' + ex.message);
	}
}

WTWJS.prototype.closeActionZoneForm = function() {
	/* close action zone form */
	try {
		WTW.closeEditPoles();
		WTW.hideAdminMenu();
		var zactionzoneind = -1;
		if (WTW.isNumeric(dGet('wtw_tactionzoneind').value)) {
			zactionzoneind = Number(dGet('wtw_tactionzoneind').value);
			if (WTW.actionZones[zactionzoneind] != null) {
				WTW.setOpacity(WTW.actionZones[zactionzoneind].moldname, 0);
				WTW.setOpacity('local-actionzoneaxlepole-' + zactionzoneind + '-' + WTW.actionZones[zactionzoneind].actionzoneid + '-' + WTW.actionZones[zactionzoneind].connectinggridind + '-' + WTW.actionZones[zactionzoneind].connectinggridid + '-' + WTW.actionZones[zactionzoneind].actionzonetype, 0);
				WTW.setOpacity('local-actionzoneaxle-' + zactionzoneind + '-' + WTW.actionZones[zactionzoneind].actionzoneid + '-' + WTW.actionZones[zactionzoneind].connectinggridind + '-' + WTW.actionZones[zactionzoneind].connectinggridid + '-' + WTW.actionZones[zactionzoneind].actionzonetype, 0);
				WTW.setOpacity('local-actionzoneaxlebase-' + zactionzoneind + '-' + WTW.actionZones[zactionzoneind].actionzoneid + '-' + WTW.actionZones[zactionzoneind].connectinggridind + '-' + WTW.actionZones[zactionzoneind].connectinggridid + '-' + WTW.actionZones[zactionzoneind].actionzonetype, 0);
				WTW.setOpacity('local-actionzoneaxlebase2-' + zactionzoneind + '-' + WTW.actionZones[zactionzoneind].actionzoneid + '-' + WTW.actionZones[zactionzoneind].connectinggridind + '-' + WTW.actionZones[zactionzoneind].connectinggridid + '-' + WTW.actionZones[zactionzoneind].actionzonetype, 0);
			}
			WTW.hideActionZone(zactionzoneind);
			WTW.disposeClean(WTW.actionZones[zactionzoneind].moldname + '-arrow');
		}
		dGet('wtw_tactionzoneid').value = '';
		dGet('wtw_tactionzoneind').value = '-1';
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-closeActionZoneForm=' + ex.message);
	}
}

WTWJS.prototype.clearActionZone = async function(zmoldswithactionzones, zactionzoneid) {
	/* when a load action zone is deleted, the molds that use it are automatically updated to another common load zone (so they can still load to the scene) */
	try {
		var zrequest = {
			'actionzoneid': dGet('wtw_tactionzoneid').value,
			'communityid': communityid,
			'buildingid': buildingid,
			'thingid': thingid,
			'moldswithactionzones':zmoldswithactionzones,
			'function':'removeactionzone'
		};
		WTW.postAsyncJSON('/core/handlers/actionzones.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-clearActionZone=' + ex.message);
	}
}

WTWJS.prototype.addActionZonePart = async function(zactionzoneid, zmold) {
	/* some action zones apply movement or rotation (like a swinging or sliding door) */
	/* molds (parts like a door and handle) are parented to the moving axle of the action zones */
	/* this function adds a mold and lists the molds that are now part of the action zone axle */
	try {
		if (zmold != null) {
			zmold = WTW.getMoldBase(zmold);
			var zmoldnameparts = WTW.getMoldnameParts(zmold.name);
			for (var i = 0; i < WTW.actionZones.length; i++) {
				if (WTW.actionZones[i] != null) {
					if (WTW.actionZones[i].actionzoneid == zactionzoneid) {
						var zactionzoneaxlebase = WTW.getMeshOrNodeByID(WTW.actionZones[i].moldname.replace('-actionzone-','-actionzoneaxlebase-'));
						var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID(WTW.actionZones[i].moldname.replace('-actionzone-','-actionzoneaxlebase2-'));
						if (zactionzoneaxlebase != null) {
							if (zmold.parent.name != zactionzoneaxlebase2.name) {
								zmold.parent = zactionzoneaxlebase2;
								var zposx = zmold.position.x;
								var zposy = zmold.position.y;
								var zposz = zmold.position.z; 
								zposx -= zactionzoneaxlebase.position.x;
								zposy -= zactionzoneaxlebase.position.y;
								zposz -= zactionzoneaxlebase.position.z;
								zmold.position.x = zposx;
								zmold.position.y = zposy;
								zmold.position.z = zposz;
							}
						}
					}
				}
			}
			WTW.hilightMoldFast(zmold.name,'yellow');
			if (zmoldnameparts.molds[zmoldnameparts.moldind] != null) {
				zmoldnameparts.molds[zmoldnameparts.moldind].actionzoneid = zactionzoneid;
				zmoldnameparts.molds[zmoldnameparts.moldind].graphics.texture.backupid = '';		
				WTW.loadMoldForm(zmoldnameparts.molds[zmoldnameparts.moldind]);
			} 	
			dGet('wtw_actionzonepartslist').innerHTML = '';
			for (var j=0; j < WTW.thingMolds.length; j++) {
				if (WTW.thingMolds[j] != null) {
					if (WTW.thingMolds[j].actionzoneid == zactionzoneid) {
						dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightMold('" + WTW.thingMolds[j].moldname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + WTW.thingMolds[j].moldname + "');\" onclick=\"WTW.removeActionZonePart('" + WTW.thingMolds[j].moldname + "')\">Action Zone Part (" + WTW.thingMolds[j].shape + ")</div>";
					}
				}
			}
			for (var j=0; j < WTW.buildingMolds.length; j++) {
				if (WTW.buildingMolds[j] != null) {
					if (WTW.buildingMolds[j].actionzoneid == zactionzoneid) {
						dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightMold('" + WTW.buildingMolds[j].moldname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + WTW.buildingMolds[j].moldname + "');\" onclick=\"WTW.removeActionZonePart('" + WTW.buildingMolds[j].moldname + "')\">Action Zone Part (" + WTW.buildingMolds[j].shape + ")</div>";
					}
				}
			}
			for (var j=0; j < WTW.communitiesMolds.length; j++) {
				if (WTW.communitiesMolds[j] != null) {
					if (WTW.communitiesMolds[j].actionzoneid == zactionzoneid) {
						dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightMold('" + WTW.communitiesMolds[j].moldname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + WTW.communitiesMolds[j].moldname + "');\" onclick=\"WTW.removeActionZonePart('" + WTW.communitiesMolds[j].moldname + "')\">Action Zone Part (" + WTW.communitiesMolds[j].shape + ")</div>";
					}
				}
			}
			if (zmoldnameparts.molds[zmoldnameparts.moldind] != null) {
				var zrequest = {
					'communityid': communityid,
					'buildingid': buildingid,
					'thingid': thingid,
					'moldid': zmoldnameparts.molds[zmoldnameparts.moldind].moldid,
					'moldind': zmoldnameparts.moldind,
					'actionzoneid': zmoldnameparts.molds[zmoldnameparts.moldind].actionzoneid,
					'function':'savemoldactionzone'
				};
				WTW.postAsyncJSON('/core/handlers/molds.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						WTW.selectAddActionZonePart(2); 
					}
				);
			} 	
		}
		WTW.selectAddActionZonePart(2); 
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-addActionZonePart=' + ex.message);
	}
}

WTWJS.prototype.selectAddActionZonePart = async function(w) {
	/* some action zones apply movement or rotation (like a swinging or sliding door) */
	/* molds (parts like a door and handle) are parented to the moving axle of the action zones */
	/* this function adds a mold to the action zone axle (continues the save and update process) */
	try {
		if (w == 0) {
			if (dGet('wtw_tactionzoneid').value == '') {
				var zactionzoneind = Number(dGet('wtw_tactionzoneind').value);
				if (WTW.actionZones[zactionzoneind] == null) {
					WTW.actionZones[zactionzoneind] = WTW.newActionZone();
				}
				
				var zloadactionzoneid = WTW.getDDLValue('wtw_tazloadactionzoneid');
				
				WTW.actionZones[zactionzoneind].actionzoneid = dGet('wtw_tactionzoneid').value;
				WTW.actionZones[zactionzoneind].communityinfo.communityid = communityid;
				WTW.actionZones[zactionzoneind].buildinginfo.buildingid = buildingid;
				WTW.actionZones[zactionzoneind].thinginfo.thingid = thingid;
				WTW.actionZones[zactionzoneind].actionzonename = dGet('wtw_tactionzonename').value;
				WTW.actionZones[zactionzoneind].actionzonetype = dGet('wtw_tactionzonetype').value;
				WTW.actionZones[zactionzoneind].actionzoneshape = dGet('wtw_tactionzoneshape').value;
				WTW.actionZones[zactionzoneind].attachmoldid = dGet('wtw_tattachmoldid').value;
				WTW.actionZones[zactionzoneind].loadactionzoneid = zloadactionzoneid;
				WTW.actionZones[zactionzoneind].movementtype = dGet('wtw_tactionzonemovementtype').value;
				WTW.actionZones[zactionzoneind].rotatespeed = dGet('wtw_tactionzonerotatespeed').value;
				WTW.actionZones[zactionzoneind].value1 = dGet('wtw_tactionzonevalue1').value;
				WTW.actionZones[zactionzoneind].value2 = dGet('wtw_tactionzonevalue2').value;
				WTW.actionZones[zactionzoneind].defaulteditform = dGet('wtw_tactionzonedefaulteditform').value;
				WTW.actionZones[zactionzoneind].position.x = dGet('wtw_tactionzoneposx').value;
				WTW.actionZones[zactionzoneind].position.y = dGet('wtw_tactionzoneposy').value;
				WTW.actionZones[zactionzoneind].position.z = dGet('wtw_tactionzoneposz').value;
				WTW.actionZones[zactionzoneind].scaling.x = dGet('wtw_tactionzonescalingx').value;
				WTW.actionZones[zactionzoneind].scaling.y = dGet('wtw_tactionzonescalingy').value;
				WTW.actionZones[zactionzoneind].scaling.z = dGet('wtw_tactionzonescalingz').value;
				WTW.actionZones[zactionzoneind].rotation.x = dGet('wtw_tactionzonerotx').value;
				WTW.actionZones[zactionzoneind].rotation.y = dGet('wtw_tactionzoneroty').value;
				WTW.actionZones[zactionzoneind].rotation.z = dGet('wtw_tactionzonerotz').value;
				WTW.actionZones[zactionzoneind].axis.position.x = dGet('wtw_taxispositionx').value;
				WTW.actionZones[zactionzoneind].axis.position.y = dGet('wtw_taxispositiony').value;
				WTW.actionZones[zactionzoneind].axis.position.z = dGet('wtw_taxispositionz').value;
				WTW.actionZones[zactionzoneind].axis.rotation.x = dGet('wtw_taxisrotationx').value;
				WTW.actionZones[zactionzoneind].axis.rotation.y = dGet('wtw_taxisrotationy').value;
				WTW.actionZones[zactionzoneind].axis.rotation.z = dGet('wtw_taxisrotationz').value;
				WTW.actionZones[zactionzoneind].axis.rotateaxis = dGet('wtw_tactionzonerotateaxis').value;
				WTW.actionZones[zactionzoneind].axis.rotatedegrees = dGet('wtw_tactionzonerotatedegrees').value;
				WTW.actionZones[zactionzoneind].axis.rotatedirection = '1';
				WTW.actionZones[zactionzoneind].movementdistance = dGet('wtw_taxisscalingz').value;
				WTW.actionZones[zactionzoneind].jsfunction = dGet('wtw_tactionzonejsfunction').value;
				WTW.actionZones[zactionzoneind].jsparameters = dGet('wtw_tactionzonejsparameters').value;

				var zrequest = {
					'actionzoneid': dGet('wtw_tactionzoneid').value,
					'communityid': communityid,
					'buildingid': buildingid,
					'thingid': thingid,
					'actionzonename':dGet('wtw_tactionzonename').value,
					'actionzonetype':dGet('wtw_tactionzonetype').value,
					'actionzoneshape':dGet('wtw_tactionzoneshape').value,
					'attachmoldid':dGet('wtw_tattachmoldid').value,
					'movementtype':dGet('wtw_tactionzonemovementtype').value,
					'rotatespeed':dGet('wtw_tactionzonerotatespeed').value,
					'value1':dGet('wtw_tactionzonevalue1').value,
					'value2':dGet('wtw_tactionzonevalue2').value,
					'defaulteditform':dGet('wtw_tactionzonedefaulteditform').value,
					'positionx':dGet('wtw_tactionzoneposx').value,
					'positiony':dGet('wtw_tactionzoneposy').value,
					'positionz':dGet('wtw_tactionzoneposz').value,
					'scalingx':dGet('wtw_tactionzonescalingx').value,
					'scalingy':dGet('wtw_tactionzonescalingy').value,
					'scalingz':dGet('wtw_tactionzonescalingz').value,
					'rotationx':dGet('wtw_tactionzonerotx').value,
					'rotationy':dGet('wtw_tactionzoneroty').value,
					'rotationz':dGet('wtw_tactionzonerotz').value,
					'axispositionx':dGet('wtw_taxispositionx').value,
					'axispositiony':dGet('wtw_taxispositiony').value,
					'axispositionz':dGet('wtw_taxispositionz').value,
					'axisscalingx':dGet('wtw_taxisscalingx').value,
					'axisscalingy':dGet('wtw_taxisscalingy').value,
					'axisscalingz':dGet('wtw_taxisscalingz').value,
					'axisrotationx':dGet('wtw_taxisrotationx').value,
					'axisrotationy':dGet('wtw_taxisrotationy').value,
					'axisrotationz':dGet('wtw_taxisrotationz').value,
					'rotateaxis':dGet('wtw_tactionzonerotateaxis').value,
					'rotatedegrees':dGet('wtw_tactionzonerotatedegrees').value,
					'rotatedirection':'1',
					'loadactionzoneid':zloadactionzoneid,
					'jsfunction':dGet('wtw_tactionzonejsfunction').value,
					'jsparameters':dGet('wtw_tactionzonejsparameters').value,
					'function':'saveactionzone'
				};
				WTW.postAsyncJSON('/core/handlers/actionzones.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						WTW.pick = 2;
						dGet('wtw_baddactionzonepart').innerHTML = 'Cancel Pick Shape';
					}
				);
			}
			WTW.pick = 2;
			dGet('wtw_baddactionzonepart').innerHTML = 'Cancel Pick Shape';
		} else {
			WTW.pick = 0;
			dGet('wtw_baddactionzonepart').innerHTML = 'Pick Shape to Add';
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-selectAddActionZonePart=' + ex.message);
	}
}

WTWJS.prototype.removeActionZonePart = async function(zmoldname) {
	/* some action zones apply movement or rotation (like a swinging or sliding door) */
	/* molds (parts like a door and handle) are parented to the moving axle of the action zones */
	/* this function removes a mold from the action zone axle */
	try {
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
			zmold = WTW.getMoldBase(zmold);
			var zmoldnameparts = WTW.getMoldnameParts(zmold.name);
			if (zmoldnameparts.molds[zmoldnameparts.moldind] != null) {
				zmoldnameparts.molds[zmoldnameparts.moldind].actionzoneid = '';
				zmoldnameparts.molds[zmoldnameparts.moldind].graphics.texture.backupid = '';
				WTW.loadMoldForm(zmoldnameparts.molds[zmoldnameparts.moldind]);
				var zrequest = {
					'communityid': communityid,
					'buildingid': buildingid,
					'thingid': thingid,
					'moldid': zmoldnameparts.molds[zmoldnameparts.moldind].moldid,
					'moldind': zmoldnameparts.moldind,
					'actionzoneid': '',
					'function':'savemoldactionzone'
				};
				WTW.postAsyncJSON('/core/handlers/molds.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						for (var i = 0; i < WTW.actionZones.length; i++) {
							if (WTW.actionZones[i] != null) {
								if (WTW.actionZones[i].actionzoneid == zmoldnameparts.actionzoneid) {
									var zactionzoneaxlebase = WTW.getMeshOrNodeByID('local-actionzoneaxlebase-' + i + '-' + WTW.actionZones[i].actionzoneid + '-' + WTW.actionZones[i].connectinggridind + '-' + WTW.actionZones[i].connectinggridid + '-' + WTW.actionZones[i].actionzonetype);
									var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID('local-actionzoneaxlebase2-' + i + '-' + WTW.actionZones[i].actionzoneid + '-' + WTW.actionZones[i].connectinggridind + '-' + WTW.actionZones[i].connectinggridid + '-' + WTW.actionZones[i].actionzonetype);
									var zactionzoneaxle = WTW.getMeshOrNodeByID('local-actionzoneaxle-' + i + '-' + WTW.actionZones[i].actionzoneid + '-' + WTW.actionZones[i].connectinggridind + '-' + WTW.actionZones[i].connectinggridid + '-' + WTW.actionZones[i].actionzonetype);
									if (zactionzoneaxlebase != null) {
										if (zmold.parent != null) {
											if (zmold.parent != zactionzoneaxlebase.parent) {
												if (zmold.parent.name.indexOf('actionzone') > -1) {
													zmold.parent = zactionzoneaxlebase.parent;
													zmold.position.x = zmoldnameparts.molds[zmoldnameparts.moldind].position.x;
													zmold.position.y = zmoldnameparts.molds[zmoldnameparts.moldind].position.y;
													zmold.position.z = zmoldnameparts.molds[zmoldnameparts.moldind].position.z;
													zmold.rotation.x = WTW.getRadians(zmoldnameparts.molds[zmoldnameparts.moldind].rotation.x);
													zmold.rotation.y = WTW.getRadians(zmoldnameparts.molds[zmoldnameparts.moldind].rotation.y);
													zmold.rotation.z = WTW.getRadians(zmoldnameparts.molds[zmoldnameparts.moldind].rotation.z);
												}
											}
										}
									}
									if (zactionzoneaxlebase2 != null) {
										dGet('wtw_actionzonepartslist').innerHTML = '';
										var zmoldparts = zactionzoneaxlebase2.getChildren();
										if (zmoldparts.length > 0) {
											for (var i=0;i < zmoldparts.length;i++) {
												var zmoldpartname = zmoldparts[i].name;
												var zshape = i;
												if (zmoldpartname.indexOf('-') > -1) {
													var znamepart = WTW.getMoldnameParts(zmoldpartname);
													zshape = znamepart.shape;
												}
												dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightMold('" + zmoldpartname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + zmoldpartname + "');\" onclick=\"WTW.removeActionZonePart('" + zmoldpartname + "')\">Action Zone Part (" + zshape + ")</div>";
											}
										}
									}
								}
							}
						}
						WTW.hilightMoldFast(zmoldname,'yellow');
					}
				);
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-removeActionZonePart=' + ex.message);
	}
}

WTWJS.prototype.getLoadZoneList = function(zdefaultvalue) {
	/* molds are set to load zones to know when to be added to a 3D Scene */
	/* this process provides a drop down list for the molds form to select a load zone (in the advanced options section) */
	try {
		WTW.clearDDL('wtw_tmoldloadactionzoneid');
		WTW.clearDDL('wtw_tmoldunloadactionzoneid');
		
		
		for (var i=0;i < WTW.actionZones.length;i++) {
			if (WTW.actionZones[i] != null) {
				if (WTW.actionZones[i].actionzonetype == 'loadzone') {
					if ((WTW.actionZones[i].thinginfo.thingid==thingid && thingid!='') || (WTW.actionZones[i].buildinginfo.buildingid==buildingid && buildingid!='') || (WTW.actionZones[i].communityinfo.communityid==communityid && communityid!='')) {
						var zoption = document.createElement('option');
						zoption.text = WTW.actionZones[i].actionzonename;
						zoption.value = WTW.actionZones[i].actionzoneid;
						if (zoption.value == zdefaultvalue) {
							zoption.selected = true;
						}
						dGet('wtw_tmoldloadactionzoneid').add(zoption);
					}
				} else if (WTW.actionZones[i].actionzonetype == 'unloadzone') {
					if ((WTW.actionZones[i].thinginfo.thingid==thingid && thingid!='') || (WTW.actionZones[i].buildinginfo.buildingid==buildingid && buildingid!='') || (WTW.actionZones[i].communityinfo.communityid==communityid && communityid!='')) {
						if (dGet('wtw_tmoldunloadactionzoneid').options.length == 0) {
							var zoption0 = document.createElement('option');
							zoption0.text = '';
							zoption0.value = '';
							zoption0.selected = true;
							dGet('wtw_tmoldunloadactionzoneid').add(zoption0);
						}
						
						var zoption = document.createElement('option');
						zoption.text = WTW.actionZones[i].actionzonename;
						zoption.value = WTW.actionZones[i].actionzoneid;
						if (zoption.value == zdefaultvalue) {
							zoption.selected = true;
						}
						dGet('wtw_tmoldunloadactionzoneid').add(zoption);
					}
				}
			}
		}
		if (dGet('wtw_tmoldloadactionzoneid').options.length == 0) {
			var zoption2 = document.createElement('option');
			zoption2.text = 'Default';
			zoption2.value = '';
			zoption2.selected = true;
			dGet('wtw_tmoldloadactionzoneid').add(zoption2);
		}
		if (dGet('wtw_tmoldunloadactionzoneid').options.length == 0) {
			WTW.hide('wtw_unloadzonediv');
		} else {
			WTW.show('wtw_unloadzonediv');
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-getLoadZoneList=' + ex.message);
	} 
}

WTWJS.prototype.getLoadActionZoneList = function(zdefaultvalue) {
	/* action zones are also set to load zones to know when to be added to a 3D Scene */
	/* only the extreme load zone for a 3D Community, 3D Building, or 3D Thing does not require a load zone set */
	/* this process provides a drop down list for the action zones form to select a load zone (in the advanced options section) */
	try {
		WTW.clearDDL('wtw_tazloadactionzoneid');
		for (var i=0;i < WTW.actionZones.length;i++) {
			if (WTW.actionZones[i] != null) {
				if (WTW.actionZones[i].actionzonetype == 'loadzone') {
					if ((WTW.actionZones[i].thinginfo.thingid==thingid && thingid!='') || (WTW.actionZones[i].buildinginfo.buildingid==buildingid && buildingid!='') || (WTW.actionZones[i].communityinfo.communityid==communityid && communityid!='')) {
						var zoption = document.createElement('option');
						zoption.text = WTW.actionZones[i].actionzonename;
						zoption.value = WTW.actionZones[i].actionzoneid;
						if (zoption.value == zdefaultvalue) {
							zoption.selected = true;
						}
						dGet('wtw_tazloadactionzoneid').add(zoption);
					}
				}
			}
		}
		if (dGet('wtw_tazloadactionzoneid').options.length == 0) {
			var zoption2 = document.createElement('option');
			zoption2.text = 'Default';
			zoption2.value = '';
			zoption2.selected = true;
			dGet('wtw_tazloadactionzoneid').add(zoption2);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-getLoadActionZoneList=' + ex.message);
	} 
}

WTWJS.prototype.openSelectActionZoneForm = function() {
	/* admin menu form, this function provides a list of action zones to select and edit an existing zone */
	try {
		WTW.getActionZoneList();
		if (WTW.actionZones.length > 0) {
			dGet('wtw_selectactionzoneid').onchange = function() {};
			WTW.clearDDL('wtw_selectactionzoneid');
			var actionzonecount = 0;
			dGet('wtw_selectactionzoneid').options[actionzonecount] = new Option('-- Select Action Zone --', '-1');
			actionzonecount += 1;
			for (var i = 0; i < WTW.actionZones.length; i++) {
				if (WTW.actionZones[i] != null) {
					if ((WTW.actionZones[i].communityinfo.communityid == communityid && communityid != '') || (WTW.actionZones[i].buildinginfo.buildingid == buildingid && buildingid != '') || (WTW.actionZones[i].thinginfo.thingid == thingid && thingid != '')) {
						if (WTW.actionZones[i].actionzonename.length > 0 && WTW.actionZones[i].defaulteditform == '0') {
							dGet('wtw_selectactionzoneid').options[actionzonecount] = new Option(WTW.actionZones[i].actionzonename, WTW.actionZones[i].actionzoneid);
							actionzonecount += 1;
						}
					}
				}
			}
			dGet('wtw_selectactionzoneid').onchange = function() { WTW.selectActionZoneToEdit(); };
			dGet('wtw_selectactionzoneid').focus();
			WTW.show('wtw_editexistingactionzonediv');
		} else {
			WTW.hide('wtw_editexistingactionzonediv');
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-openSelectActionZoneForm=' + ex.message);
	}
}

WTWJS.prototype.selectActionZoneToEdit = function() {
	/* this function executes on select from the drop down list of existing action zones to edit (admin menu) */
	try {
		WTW.openActionZoneForm(dGet('wtw_selectactionzoneid').options[dGet('wtw_selectactionzoneid').selectedIndex].value);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-selectActionZoneToEdit=' + ex.message);
	}
}

WTWJS.prototype.reverserotatedirection = function() {
	/* the direction of the axle rotation can be reversed by adding 180 degrees to the x axis */
	try {
		var xaxis = Number(dGet('wtw_taxisrotationx').value);
		xaxis += 180;
		xaxis = WTW.cleanDegrees(xaxis);
		dGet('wtw_taxisrotationx').value = xaxis.toFixed(2);
		WTW.setNewActionZone();
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-reverserotatedirection=' + ex.message);
	}
}

WTWJS.prototype.loadAltActionZones = function(zddlname) {
	/* alt load action zones allow a 3D Building or 3D Thing to be added to a 3D Community or 3D Building */
	/* using the parent's load zones instead of the original load zones for the object */
	/* this function creates the drop down list of load zones for that use */
	try {
		if (dGet(zddlname) != null) {
			WTW.clearDDL(zddlname);
			var zoption = document.createElement('option');
			zoption.text = 'Default';
			zoption.value = '';
			zoption.selected = true;
			dGet(zddlname).add(zoption);
			if (WTW.actionZones != null) {
				for (var i = 0; i < WTW.actionZones.length; i++) {
					if (WTW.actionZones[i] != null) {
						var zthingid = '';
						var zbuildingid = '';
						var zcommunityid = '';
						if (WTW.actionZones[i].thinginfo.thingid != undefined) {
							zthingid = WTW.actionZones[i].thinginfo.thingid;
						}
						if (WTW.actionZones[i].buildinginfo.buildingid != undefined) {
							zbuildingid = WTW.actionZones[i].buildinginfo.buildingid;
						}
						if (WTW.actionZones[i].communityinfo.communityid != undefined) {
							zcommunityid = WTW.actionZones[i].communityinfo.communityid;
						}
						if ((WTW.actionZones[i].actionzonetype == 'loadzone') && ((zcommunityid == communityid && communityid != '') || (zbuildingid == buildingid && buildingid != ''))) {
							var zoption2 = document.createElement('option');
							zoption2.text = WTW.actionZones[i].actionzonename;
							zoption2.value = WTW.actionZones[i].actionzoneid;
							dGet(zddlname).add(zoption2);
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-loadAltActionZones=' + ex.message);
	}
}

WTWJS.prototype.loadChildLoadZones = function(zaddactionzones, zserver) {
	/* loads the action zones for a 3D Things within a 3D Building */
	try {
		if (zaddactionzones.actionzones != undefined) {
			for (var i = 0; i < zaddactionzones.actionzones.length; i++) {
				if (WTW.isItemInArray(WTW.actionZones, zaddactionzones.actionzones[i].actionzoneid, zaddactionzones.actionzones[i].connectinggridind, -1, 'actionzones') == false) {
					var zactionzoneind = WTW.getNextCount(WTW.actionZones);
					WTW.actionZones[zactionzoneind] = zaddactionzones.actionzones[i];
					WTW.actionZones[zactionzoneind].actionzoneind = zactionzoneind;
					WTW.actionZones[zactionzoneind].status = 0;
					WTW.actionZones[zactionzoneind].parentname = WTW.getParentName(WTW.actionZones[zactionzoneind].connectinggridind);
					var zactionzonename = zserver + '-actionzone-' + zactionzoneind + '-' + WTW.actionZones[zactionzoneind].actionzoneid + '-' + WTW.actionZones[zactionzoneind].connectinggridind + '-' + WTW.actionZones[zactionzoneind].connectinggridid + '-' + WTW.actionZones[zactionzoneind].actionzonetype;
					WTW.actionZones[zactionzoneind].moldname = zactionzonename;
				}
			}
		}
		WTW.setWindowSize();
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-loadChildLoadZones=' + ex.message);
	} 
}


/* the following process is used to change the action zone while it is being edited */
/* using the action zone form fields for values */

WTWJS.prototype.setNewActionZone = function() {
	/* use the form settings to redraw the action zone */
	try {		
		var zaxispositionx = Number(dGet('wtw_taxispositionx').value);
		var zaxispositiony = Number(dGet('wtw_taxispositiony').value);
		var zaxispositionz = Number(dGet('wtw_taxispositionz').value);		
		var zaxisrotx = Number(dGet('wtw_taxisrotationx').value);
		var zaxisroty = Number(dGet('wtw_taxisrotationy').value);
		var zaxisrotz = Number(dGet('wtw_taxisrotationz').value);		
		var zpositionx = Number(dGet('wtw_tactionzoneposx').value);
		var zpositiony = Number(dGet('wtw_tactionzoneposy').value);
		var zpositionz = Number(dGet('wtw_tactionzoneposz').value);		
		var zscalingx = Number(dGet('wtw_tactionzonescalingx').value);		
		var zscalingy = Number(dGet('wtw_tactionzonescalingy').value);		
		var zscalingz = Number(dGet('wtw_tactionzonescalingz').value);		
		var zrotationx = WTW.getRadians(Number(dGet('wtw_tactionzonerotx').value));
		var zrotationy = WTW.getRadians(Number(dGet('wtw_tactionzoneroty').value));
		var zrotationz = WTW.getRadians(Number(dGet('wtw_tactionzonerotz').value));
		var zrotatespeed = Number(dGet('wtw_tactionzonerotatespeed').value);
		var zvalue1 = Number(dGet('wtw_tactionzonevalue1').value);
		var zvalue2 = Number(dGet('wtw_tactionzonevalue2').value);
		var zdefaulteditform = Number(dGet('wtw_tactionzonedefaulteditform').value);
		if (dGet('wtw_tactionzonetype').value == 'swingingdoor' || dGet('wtw_tactionzonetype').value == 'rotate' || dGet('wtw_tactionzonetype').value == 'driverturnangle' || dGet('wtw_tactionzonetype').value == 'driverturningwheel') {
			dGet('wtw_taxisscalingx').value = '.2';
			dGet('wtw_taxisscalingy').value = '20';
			dGet('wtw_taxisscalingz').value = '.2';
		} else if (dGet('wtw_tactionzonetype').value.indexOf('seat') > -1) {
			dGet('wtw_taxisscalingx').value = '.2';
			dGet('wtw_taxisscalingy').value = '.2';
			dGet('wtw_taxisscalingz').value = '10';
		}
		var zdoorrotatedirection = dGet('wtw_tactionzonerotatedirection').options[dGet('wtw_tactionzonerotatedirection').selectedIndex].value;
		var zdoorrotatedegrees = dGet('wtw_tactionzonerotatedegrees').value;
		if (WTW.isNumeric(zdoorrotatedegrees) == false) {
			zdoorrotatedegrees = 90;
			dGet('wtw_tactionzonerotatedegrees').value = 90;
		} else {
			if (Number(zdoorrotatedegrees) < 0) {
				zdoorrotatedegrees = 0;
				dGet('wtw_tactionzonerotatedegrees').value = 0;
			}
		}
		if (WTW.isNumeric(dGet('wtw_tactionzoneind').value)) {
			var zactionzoneind = Number(dGet('wtw_tactionzoneind').value);
			if (WTW.actionZones[zactionzoneind] != null) {
				WTW.actionZones[zactionzoneind].rotatespeed = zrotatespeed;
				WTW.actionZones[zactionzoneind].value1 = zvalue1;
				WTW.actionZones[zactionzoneind].value2 = zvalue2;
				WTW.actionZones[zactionzoneind].defaulteditform = zdefaulteditform;
				WTW.actionZones[zactionzoneind].axis.rotatedegrees = zdoorrotatedegrees;
				WTW.actionZones[zactionzoneind].axis.rotatedirection = zdoorrotatedirection;
				var zactionzoneaxlebase = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlebase-'));
				var zactionzoneaxle = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxle-'));
				var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlebase2-'));
				var zactionzone = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname);
				var zactionzoneaxlepole = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlepole-'));
				switch (WTW.actionZones[zactionzoneind].actionzonetype) {
					case 'driverseat':
						if (zactionzoneaxle != null) {
							zactionzoneaxle.position.x = zaxispositionx;
							zactionzoneaxle.position.y = zaxispositiony;
							zactionzoneaxle.position.z = zaxispositionz;
							zactionzoneaxle.rotation.x = WTW.getRadians(zaxisrotx);
							zactionzoneaxle.rotation.y = WTW.getRadians(zaxisroty);
							zactionzoneaxle.rotation.z = WTW.getRadians(zaxisrotz);
						}
						if (zactionzoneaxlepole != null) {
							zactionzoneaxlepole.position.x = 0;
							zactionzoneaxlepole.position.y = 0;
							zactionzoneaxlepole.position.z = 5;
							zactionzoneaxle.isVisible = true;
						}
						if (zactionzone != null) {
							zactionzone.position.x = zpositionx;
							zactionzone.position.y = zpositiony;
							zactionzone.position.z = zpositionz;
							zactionzone.scaling.x = zscalingx;
							zactionzone.scaling.y = zscalingy;
							zactionzone.scaling.z = zscalingz;
							zactionzone.rotation.x = zrotationx;
							zactionzone.rotation.y = zrotationy;
							zactionzone.rotation.z = zrotationz;
							zactionzone.isVisible = true;
							WTW.openEditPoles(zactionzone);
						}
						break;
					case 'passengerseat':
						if (zactionzoneaxle != null) {
							zactionzoneaxle.position.x = zaxispositionx;
							zactionzoneaxle.position.y = zaxispositiony;
							zactionzoneaxle.position.z = zaxispositionz;
							zactionzoneaxle.rotation.x = WTW.getRadians(zaxisrotx);
							zactionzoneaxle.rotation.y = WTW.getRadians(zaxisroty);
							zactionzoneaxle.rotation.z = WTW.getRadians(zaxisrotz);
						}
						if (zactionzoneaxlepole != null) {
							zactionzoneaxlepole.position.x = 0;
							zactionzoneaxlepole.position.y = 0;
							zactionzoneaxlepole.position.z = 5;
							zactionzoneaxle.isVisible = true;
						}
						if (zactionzone != null) {
							zactionzone.position.x = zpositionx;
							zactionzone.position.y = zpositiony;
							zactionzone.position.z = zpositionz;
							zactionzone.scaling.x = zscalingx;
							zactionzone.scaling.y = zscalingy;
							zactionzone.scaling.z = zscalingz;
							zactionzone.rotation.x = zrotationx;
							zactionzone.rotation.y = zrotationy;
							zactionzone.rotation.z = zrotationz;
							zactionzone.isVisible = true;
							WTW.openEditPoles(zactionzone);
						}
						break;
					case 'seat':
						if (zactionzoneaxle != null) {
							zactionzoneaxle.position.x = zaxispositionx;
							zactionzoneaxle.position.y = zaxispositiony;
							zactionzoneaxle.position.z = zaxispositionz;
							zactionzoneaxle.rotation.x = WTW.getRadians(zaxisrotx);
							zactionzoneaxle.rotation.y = WTW.getRadians(zaxisroty);
							zactionzoneaxle.rotation.z = WTW.getRadians(zaxisrotz);
						}
						if (zactionzoneaxlepole != null) {
							zactionzoneaxlepole.position.x = 0;
							zactionzoneaxlepole.position.y = 0;
							zactionzoneaxlepole.position.z = 5;
							zactionzoneaxle.isVisible = true;
						}
						if (zactionzone != null) {
							zactionzone.position.x = zpositionx;
							zactionzone.position.y = zpositiony;
							zactionzone.position.z = zpositionz;
							zactionzone.scaling.x = zscalingx;
							zactionzone.scaling.y = zscalingy;
							zactionzone.scaling.z = zscalingz;
							zactionzone.rotation.x = zrotationx;
							zactionzone.rotation.y = zrotationy;
							zactionzone.rotation.z = zrotationz;
							zactionzone.isVisible = true;
							WTW.openEditPoles(zactionzone);
						}
						break;
					case 'spawnzone':
						if (zactionzone != null) {
							zactionzone.position.x = zpositionx;
							zactionzone.position.y = zpositiony;
							zactionzone.position.z = zpositionz;
							zactionzone.scaling.x = zscalingx;
							zactionzone.scaling.y = zscalingy;
							zactionzone.scaling.z = zscalingz;
							zactionzone.rotation.x = zrotationx;
							zactionzone.rotation.y = zrotationy;
							zactionzone.rotation.z = zrotationz;
							zactionzone.isVisible = true;
							WTW.openEditPoles(zactionzone);
						}
						var zspawnzonearrow = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname + '-arrow');
						if (zspawnzonearrow == null) {
							var zmolddef = WTW.newMold();
							zmolddef.shape = 'babylonfile';
							zmolddef.covering = 'none';
							zmolddef.scaling.x = 1/zscalingx;
							zmolddef.scaling.y = 1/zscalingy;
							zmolddef.scaling.z = 1/zscalingz;
							zmolddef.subdivisions = 12;
							zmolddef.opacity = 1;
							zmolddef.parentname = WTW.actionZones[zactionzoneind].moldname;
							zmolddef.checkcollisions = '0';
							zmolddef.ispickable = '0';
							zmolddef.objects.folder = '/content/system/babylon/spawnzone/';
							zmolddef.objects.file = 'spawnzone.babylon';
							/* create the Direction Arrow using the mold definition above */
							var zmold = WTW.addMold(WTW.actionZones[zactionzoneind].moldname + '-arrow', zmolddef, zmolddef.parentname, zmolddef.covering);
							zmold.isPickable = false;
							zmold.checkCollisions = false;
						} else {
							zspawnzonearrow.scaling.x = 1/zscalingx;
							zspawnzonearrow.scaling.y = 1/zscalingy;
							zspawnzonearrow.scaling.z = 1/zscalingz;
						}
						break;
					default:
						if (zactionzoneaxlebase != null) {
							zactionzoneaxlebase.position.x = zaxispositionx;
							zactionzoneaxlebase.position.y = zaxispositiony;
							zactionzoneaxlebase.position.z = zaxispositionz;
							zactionzoneaxlebase.rotation.x = WTW.getRadians(zaxisrotx);
							zactionzoneaxlebase.rotation.y = WTW.getRadians(zaxisroty);
							zactionzoneaxlebase.rotation.z = WTW.getRadians(zaxisrotz);
							zactionzoneaxlebase.isVisible = true;
							if (dGet('wtw_tattachavatarmoldname').value != '') {

							}
						}						
						if (zactionzoneaxle != null) {
							zactionzoneaxle.position.x = 0;
							zactionzoneaxle.position.y = 0;
							zactionzoneaxle.position.z = 0;
							zactionzoneaxle.isVisible = true;
						}
						if (zactionzone != null) {
							if (dGet('wtw_tcopyaxletoactionzone').checked == true || dGet('wtw_tactionzonetype').value == 'rotate') {
								zpositionx = zaxispositionx;
								zpositiony = zaxispositiony;
								zpositionz = zaxispositionz;
								dGet('wtw_tactionzoneposx').value = zpositionx;
								dGet('wtw_tactionzoneposy').value = zpositiony;
								dGet('wtw_tactionzoneposz').value = zpositionz;		
							}
							zactionzone.position.x = zpositionx;
							zactionzone.position.y = zpositiony;
							zactionzone.position.z = zpositionz;
							zactionzone.scaling.x = zscalingx;
							zactionzone.scaling.y = zscalingy;
							zactionzone.scaling.z = zscalingz;
							zactionzone.rotation.x = zrotationx;
							zactionzone.rotation.y = zrotationy;
							zactionzone.rotation.z = zrotationz;
							zactionzone.isVisible = true;
							WTW.openEditPoles(zactionzone);
						}
						break;
				}
				if (zactionzoneaxlebase2 != null) {
					var zdoorparts = zactionzoneaxlebase2.getChildren();
					if (zdoorparts.length > 0) {
						var zdoorpartsind = 0;
						while (zdoorpartsind < zdoorparts.length) {
							var molds = WTW.buildingMolds;
							var zmoldind = -1;
							if (zdoorparts[zdoorpartsind].name.indexOf('-') > -1) {
								var zobjparts = zdoorparts[zdoorpartsind].name.split('-');
								if (zobjparts[0] != null) {
									if (zobjparts[0].indexOf('community') > -1) {
										molds = WTW.communitiesMolds;
									} else if (zobjparts[0].indexOf('thing') > -1) {
										molds = WTW.thingMolds;
									}
								}
								if (zobjparts[1] != null) {
									if (WTW.isNumeric(zobjparts[1])) {
										zmoldind = Number(zobjparts[1]);
									}
								}
							}
							if (molds[zmoldind] != null) {
								var zposx = Number(molds[zmoldind].position.x);
								var zposy = Number(molds[zmoldind].position.y);
								var zposz = Number(molds[zmoldind].position.z);
								zdoorparts[zdoorpartsind].position.x = zposx - zaxispositionx;
								zdoorparts[zdoorpartsind].position.y = zposy - zaxispositiony;
								zdoorparts[zdoorpartsind].position.z = zposz - zaxispositionz;
							}
							zdoorpartsind += 1;
						}
					}
					zactionzoneaxlebase2.position.x = 0;
					zactionzoneaxlebase2.position.y = 0;
					zactionzoneaxlebase2.position.z = 0;
					zactionzoneaxlebase2.rotation.x = WTW.getRadians(-zaxisrotx);
					zactionzoneaxlebase2.rotation.y = WTW.getRadians(-zaxisroty);
					zactionzoneaxlebase2.rotation.z = WTW.getRadians(-zaxisrotz);
				}
				if (zactionzoneaxlepole != null) {
					if (dGet('wtw_tactionzonetype').value == 'slidingdoor' || dGet('wtw_tactionzonetype').value == 'clickactivatedslidingdoor' || dGet('wtw_tactionzonetype').value == 'peoplemover') {
						dGet('wtw_taxisscalingx').value = '.2';
						dGet('wtw_taxisscalingy').value = '.2';
						zactionzoneaxlepole.scaling.x = Number(dGet('wtw_taxisscalingx').value);
						zactionzoneaxlepole.scaling.y = Number(dGet('wtw_taxisscalingy').value);
						zactionzoneaxlepole.scaling.z = Number(dGet('wtw_taxisscalingz').value);
					} else if (dGet('wtw_tactionzonetype').value == 'elevator') {
						dGet('wtw_taxisscalingx').value = '.2';
						zactionzoneaxlepole.scaling.x = .2;
						zactionzoneaxlepole.scaling.z = .2;
						zactionzoneaxlepole.scaling.y = Number(dGet('wtw_taxisscalingz').value);
						zactionzoneaxlepole.position.y = Number(dGet('wtw_taxisscalingz').value)/2;
					} else {
						zactionzoneaxlepole.scaling.x = Number(dGet('wtw_taxisscalingx').value);
						zactionzoneaxlepole.scaling.y = Number(dGet('wtw_taxisscalingy').value);
						zactionzoneaxlepole.scaling.z = Number(dGet('wtw_taxisscalingz').value);
					}
				}
				WTW.actionZones[zactionzoneind].position.x = zpositionx;
				WTW.actionZones[zactionzoneind].position.y = zpositiony;
				WTW.actionZones[zactionzoneind].position.z = zpositionz;
				WTW.actionZones[zactionzoneind].scaling.x = zscalingx;
				WTW.actionZones[zactionzoneind].scaling.y = zscalingy;
				WTW.actionZones[zactionzoneind].scaling.z = zscalingz;
				WTW.actionZones[zactionzoneind].rotation.x = zrotationx;
				WTW.actionZones[zactionzoneind].rotation.y = zrotationy;
				WTW.actionZones[zactionzoneind].rotation.z = zrotationz;
				WTW.actionZones[zactionzoneind].movementdistance = dGet('wtw_taxisscalingz').value;
				WTW.showActionZone(zactionzoneind);
			}
		}	
		scene.render();
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminactionzones.js-setNewActionZone=' + ex.message);
	}
}


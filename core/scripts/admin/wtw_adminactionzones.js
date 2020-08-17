/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are used to administer a website in admin mode only */
/* action zones are used to run functions based on avatar movement (execute scripts, animations, sounds, lighting changes, triggers, etc...) */
/* core action zones include load zones (fetch and load molds when the avatar enters a region), doors, and dynamically loading scripts */

WTWJS.prototype.getLoadActionZoneID = function(actionzonenamepart) {
	/* look up a load action zone id based on the actionzonename */
	var loadactionzoneid = "";
	try {
		if (WTW.actionZones != null) {
			for (var i=0;i<WTW.actionZones.length;i++) {
				if (WTW.actionZones[i] != null) {
					if (WTW.actionZones[i].actionzonetype == "loadzone" && WTW.actionZones[i].connectinggridid == dGet('wtw_tconnectinggridid').value && WTW.actionZones[i].actionzonename.toLowerCase().indexOf(actionzonenamepart.toLowerCase()) > -1 && WTW.actionZones[i].actionzonename.toLowerCase().indexOf("custom") == -1) {
						loadactionzoneid = WTW.actionZones[i].actionzoneid;
					}
				}
			}
		}
    } catch(ex) {
        WTW.log("core-scripts-admin-wtw_adminactionzones.js-getLoadActionZoneID=" + ex.message);
    }
	return loadactionzoneid;
}

WTWJS.prototype.showActionZone = function(actionzoneind) {
	/* when viewing a 3D Scene in edit mode, you can toggle on/off show zones in the quick edit menu on the bottom left */
	/* this will show the zones with an opacity (alpha) and boundry edges */
	/* helpful for aligning and distributing the work load of load zones */
	try {
		if (WTW.actionZones[actionzoneind] != null) {
			switch (WTW.actionZones[actionzoneind].actionzonetype) {
				case "loadzone":
				case "loadanimations":
				case "mirror":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, .2);
					break;
				case "seat":
				case "slidingdoor":
				case "swingingdoor":
				case "rotate":
				case "peoplemover":
				case "elevator":
				case "passengerseat":
				case "driverseat":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, .2);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 1);
					break;
				case "clickactivatedslidingdoor":
				case "driverturnangle":
				case "driverwheel":
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 1);
					break;
				case "driverturningwheel":
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 1);
					WTW.setOpacity("actionzoneaxlepole2-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 1);
					break;
				default:
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, .1);
					break;
			}
			var actionzone = scene.getMeshByID("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
			var actionzoneaxle = scene.getMeshByID("actionzoneaxle-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
			var actionzoneaxlepole = scene.getMeshByID("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
			var actionzoneaxlebase = scene.getMeshByID("actionzoneaxlebase-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
			var actionzoneaxlebase2 = scene.getMeshByID("actionzoneaxlebase2-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
			if (actionzone != null) {
				actionzone.isVisible = true;
				actionzone.enableEdgesRendering(); 
				actionzone.edgesWidth = 4.0;
				actionzone.edgesColor = new BABYLON.Color4(0, 0, 1, 1);
			}
			if (actionzoneaxle != null) {
				actionzoneaxle.isVisible = true;
			}
			if (actionzoneaxlepole != null) {
				actionzoneaxlepole.isVisible = true;
			}
			if (actionzoneaxlebase != null) {
				actionzoneaxlebase.isVisible = true;
			}
			if (actionzoneaxlebase2 != null) {
				actionzoneaxlebase2.isVisible = true;
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-showActionZone=" + ex.message);
	}
}

WTWJS.prototype.hideActionZone = function(actionzoneind) {
	/* when viewing a 3D Scene in edit mode, you can toggle on/off show zones in the quick edit menu on the bottom left */
	/* this returns the opacity (alpha) to 0 - for transparent, applies to zones and edges */
	try {
		if (WTW.actionZones[actionzoneind] != null) {
			switch (WTW.actionZones[actionzoneind].actionzonetype) {
				case "slidingdoor":
				case "swingingdoor":
				case "rotate":
				case "peoplemover":
				case "elevator":
				case "passengerseat":
				case "driverseat":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					break;
				case "clickactivatedslidingdoor":
				case "driverturnangle":
				case "driverwheel":
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					break;
				case "driverturningwheel":
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					WTW.setOpacity("actionzoneaxlepole2-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					break;
				default:
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					break;
			}
			var actionzone = scene.getMeshByID("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
			var actionzoneaxle = scene.getMeshByID("actionzoneaxle-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
			var actionzoneaxlepole = scene.getMeshByID("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
			var actionzoneaxlebase = scene.getMeshByID("actionzoneaxlebase-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
			var actionzoneaxlebase2 = scene.getMeshByID("actionzoneaxlebase2-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
			if (actionzone != null) {
				actionzone.isVisible = false;
				actionzone.disableEdgesRendering(); 
			}
			if (actionzoneaxle != null) {
				actionzoneaxle.isVisible = false;
			}
			if (actionzoneaxlepole != null) {
				actionzoneaxlepole.isVisible = false;
			}
			if (actionzoneaxlebase != null) {
				actionzoneaxlebase.isVisible = false;
			}
			if (actionzoneaxlebase2 != null) {
				actionzoneaxlebase2.isVisible = false;
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-hideActionZone=" + ex.message);
	}
}

WTWJS.prototype.openActionZoneForm = function(zactionzoneid) {
	/* open the action zone edit form to modify or add a new action zone */
	try {
		var zparentname = dGet('wtw_tconnectinggridname').value;
		var zwebtype = "building";
		WTW.hideAdminMenu();
		WTW.show('wtw_adminmenu20');
		WTW.show('wtw_adminmenu20b');
		if (communityid != "") {
			zwebtype = "community";
		} else if (thingid != "") {
			zwebtype = "thing";
		}
		dGet('wtw_tmoldshape').value = "box";
		dGet('wtw_tmoldwebtype').value = zwebtype;
		WTW.setDDLValue("wtw_tmoldcovering", "texture");
		var zactionzonetype = "";
		for (var i=0;i < dGet('wtw_tactionzonetypelist').options.length;i++) {
			if (zactionzoneid == dGet('wtw_tactionzonetypelist').options[i].value) {
				zactionzonetype = zactionzoneid;
			}
		}
		if (zactionzonetype != "") {
			var zdefaultloadactionzoneid = WTW.getLoadActionZoneID("High");
			WTW.getLoadActionZoneList(zdefaultloadactionzoneid);
			zactionzoneid = WTW.getRandomString(16);
			dGet('wtw_tactionzoneid').value = zactionzoneid;
			dGet('wtw_tactionzonetype').value = zactionzonetype;
			WTW.setNewActionZoneDefaults(zactionzonetype);
			WTW.setActionZoneFormFields(zactionzonetype);
			var zactionzoneind = WTW.getNextCount(WTW.actionZones);
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
			WTW.actionZones[zactionzoneind].axis.rotatedirection = "1";
			WTW.actionZones[zactionzoneind].attachmoldid = dGet('wtw_tattachmoldid').value;
			WTW.actionZones[zactionzoneind].movementtype = dGet('wtw_tactionzonemovementtype').value;
			WTW.actionZones[zactionzoneind].rotatespeed = dGet('wtw_tactionzonerotatespeed').value;
			WTW.actionZones[zactionzoneind].movementdistance = dGet('wtw_taxisscalingz').value;
			WTW.actionZones[zactionzoneind].parentname = zparentname;
			WTW.actionZones[zactionzoneind].jsfunction = dGet('wtw_tactionzonejsfunction').value;
			WTW.actionZones[zactionzoneind].jsparameters = dGet('wtw_tactionzonejsparameters').value;
			WTW.actionZones[zactionzoneind].loadactionzoneid = zdefaultloadactionzoneid;
			WTW.actionZones[zactionzoneind].connectinggridid = dGet("wtw_tconnectinggridid").value;
			WTW.actionZones[zactionzoneind].connectinggridind = dGet("wtw_tconnectinggridind").value;
			WTW.actionZones[zactionzoneind].parentname = WTW.getParentName(WTW.actionZones[zactionzoneind].connectinggridind);
			WTW.actionZones[zactionzoneind].moldname = "actionzone-" + zactionzoneind + "-" + WTW.actionZones[zactionzoneind].zactionzoneid + "-" + WTW.actionZones[zactionzoneind].connectinggridind + "-" + WTW.actionZones[zactionzoneind].connectinggridid + "-" + WTW.actionZones[zactionzoneind].actionzonetype;
			WTW.addActionZone(WTW.actionZones[zactionzoneind].moldname, WTW.actionZones[zactionzoneind]);
			WTW.showActionZone(zactionzoneind);
			if (zactionzonetype.indexOf("seat") > -1) {	
				dGet('wtw_tattachavatarmoldname').value = WTW.actionZones[zactionzoneind].moldname.replace("actionzone-","actionzoneaxlebase2-");
			}
			dGet('wtw_actionzonepartslist').innerHTML = "";
			WTW.submitActionZoneForm(2);
			var zsafetyincrement = 0;
			var znewaztimer = window.setInterval(function() {
				zsafetyincrement += 1;
				var zactionzone = scene.getMeshByID(WTW.actionZones[zactionzoneind].moldname);
				if (zactionzone != null || zsafetyincrement > 50) {
					WTW.setNewActionZone();
					window.clearInterval(znewaztimer);
					znewaztimer = null;
				}
			},100);
		} else {
			dGet('wtw_tactionzoneid').value = zactionzoneid;
			var zactionzoneind = WTW.getActionZoneInd(zactionzoneid,dGet("wtw_tconnectinggridind").value);
			dGet('wtw_tactionzoneind').value = zactionzoneind;
			if (WTW.actionZones[zactionzoneind] != null) {
				dGet('wtw_editactionzoneformtitle').innerHTML = "Edit " + WTW.actionZones[zactionzoneind].actionzonename;
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
				dGet('wtw_taxisscalingx').value = ".20";
				dGet('wtw_taxisscalingy').value = ".20";						
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
				dGet('wtw_tactionzonejsfunction').value = WTW.actionZones[zactionzoneind].jsfunction;
				dGet('wtw_tactionzonejsparameters').value = WTW.actionZones[zactionzoneind].jsparameters;
				if (WTW.actionZones[zactionzoneind].scripts != null) {
					WTW.loadAZFormScripts(WTW.actionZones[zactionzoneind].scripts);
				}
				WTW.getLoadActionZoneList(WTW.actionZones[zactionzoneind].loadactionzoneid);
				WTW.setActionZoneFormFields(dGet('wtw_tactionzonetype').value);
				if (zactionzonetype.indexOf("seat") > -1) {	
					dGet('wtw_tattachavatarmoldname').value = WTW.actionZones[zactionzoneind].moldname.replace("actionzone-","actionzoneaxlebase2-");
				}
				var zactionzone = scene.getMeshByID(WTW.actionZones[zactionzoneind].moldname);
				if (zactionzone == null) {
					WTW.addActionZone(WTW.actionZones[zactionzoneind].moldname, WTW.actionZones[zactionzoneind]);
				}
				WTW.showActionZone(zactionzoneind);
				var zactionzoneaxlebase2 = scene.getMeshByID(WTW.actionZones[zactionzoneind].moldname.replace("actionzone-","actionzoneaxlebase2-"));
				var zactionzoneaxle = scene.getMeshByID(WTW.actionZones[zactionzoneind].moldname.replace("actionzone-","actionzoneaxle-"));
				dGet('wtw_actionzonepartslist').innerHTML = "";
				if (zactionzoneaxlebase2 != null) {
					var zmoldparts1 = zactionzoneaxlebase2.getChildren();
					if (zmoldparts1.length > 0) {
						for (var i=0;i < zmoldparts1.length;i++) {
							var zmoldpartname = zmoldparts1[i].name;
							var zshape = i;
							if (zmoldpartname.indexOf("-") > -1) {
								var znamepart = zmoldpartname.split('-');
								zshape = znamepart[5];
							}
							if (zmoldpartname.indexOf("molds") > -1) {
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
							if (zmoldpartname.indexOf("-") > -1) {
								var znamepart = zmoldpartname.split('-');
								zshape = znamepart[5];
							}
							if (zmoldpartname.indexOf("molds") > -1) {
								dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightMold('" + zmoldpartname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + zmoldpartname + "');\" onclick=\"WTW.removeActionZonePart('" + zmoldpartname + "')\">Action Zone Part (" + zshape + ")</div>";
							}
						}
					}
				}
				if (zactionzonetype.indexOf("seat") > -1) {
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
		if (zactionzonetype == "loadanimations") {
			WTW.loadAZAnimationsList();
			WTW.loadAZAvatarAnimations();
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-openActionZoneForm=" + ex.message);
	}
}		

WTWJS.prototype.getAZFormScripts = function() {
	/* some action zones add javascripts when the avatar enters the zone */
	/* this function checks for scripts needing to be loaded */
	try {
		WTW.getJSON("/connect/scripts.php?actionzoneid=" + dGet('wtw_tactionzoneid').value, 
			function(zresponse) {
				if (zresponse != null) {
					zresponse = JSON.parse(zresponse);
					WTW.loadAZFormScripts(zresponse);
				}
			}
		);		
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-getAZFormScripts=" + ex.message);
	}
}		

WTWJS.prototype.loadAZFormScripts = function(zscripts) {
	/* process results of checking for scripts needing to be loaded */
	/* show the list of scripts */
	try {
		dGet('wtw_azjavascriptlinks').innerHTML = '';
		var zwebid = communityid + buildingid + thingid;
		var zwebtype = "buildings";
		if (communityid != "") {
			zwebtype = "communities";
		} else if (thingid != "") {
			zwebtype = "things";
		}
		var zscriptlinks = "";
		for (var i=0;i<zscripts.length;i++) {
			zscriptlinks += "<div class='wtw-menulevel2'><div onclick=\"WTW.deleteAZFormScript('" + zscripts[i].scriptid + "','" + zscripts[i].scriptpath + "');\" class=\"wtw-redbuttonright\">Delete</div><a href=\"/content/uploads/" + zwebtype + "/" + zwebid + "/" + zscripts[i].scriptpath + "\" target=\"_blank\" class=\"wtw-linkwrap\">" + zscripts[i].scriptpath + "</a></div><div class=\"wtw-clear\"></div>";
		}
		dGet('wtw_azjavascriptlinks').innerHTML = zscriptlinks;
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-loadAZFormScripts=" + ex.message);
	}
}		

WTWJS.prototype.deleteAZFormScript = function(zscriptid, zscriptpath) {
	/* remove a script from the list of scripts to be loaded with a zone */
	try {
		var zwebtype = "communities";
		if (buildingid != '') {
			zwebtype = "buildings";
		} else if (thingid != '') {
			zwebtype = "things";
		}
		var zrequest = {
			'actionzoneid': dGet('wtw_tactionzoneid').value,
			'webtype': zwebtype,
			'webid': communityid + buildingid + thingid,
			'scriptid': zscriptid,
			'scriptpath': zscriptpath,
			'function':'deletejavascriptfile'
		};
		WTW.postJSON("/core/handlers/uploadedfiles.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.getAZFormScripts();
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-deleteAZFormScript=" + ex.message);
	}
}		

WTWJS.prototype.loadAZAnimationsList = function() {
	/* some action zones add animations to the avatar when the avatar enters the zone */
	/* this function lists the animations that are loaded in this zone */
	try {
		dGet('wtw_azavataranimations').innerHTML = '';
		WTW.getJSON("/connect/actionzone.php?actionzoneid=" + dGet('wtw_tactionzoneid').value, 
			function(zresponse) {
				if (zresponse != null) {
					zresponse = JSON.parse(zresponse);
					if (zresponse.actionzones[0].avataranimations.length > 0) {
						dGet('wtw_azavataranimations').innerHTML += '<div class="wtw-onecol">Load Animations:</div><br />';
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
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-loadAZAnimationsList=" + ex.message);
	}
}		

WTWJS.prototype.deleteAZAvatarAnimation = function(zactionzoneanimationid) {
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
		WTW.postJSON("/core/handlers/actionzones.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.loadAZAnimationsList();
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-deleteAZAvatarAnimation=" + ex.message);
	}
}		

WTWJS.prototype.loadAZAvatarAnimations = function() {
	/* load avatar animations list to select from when adding to a zone */
	try {
		WTW.clearDDL('wtw_tazavataranimationid');
		WTW.getJSON("/connect/avataranimations.php", 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				for (var i=0;i<zresponse.avataranimations.length;i++) {
					if (zresponse.avataranimations[i] != null) {
						var option = document.createElement("option");
						option.text = zresponse.avataranimations[i].animationfriendlyname + " (" + zresponse.avataranimations[i].animationevent + ")";
						option.value = zresponse.avataranimations[i].avataranimationid;
						dGet('wtw_tazavataranimationid').add(option);
					}
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-loadAZAvatarAnimations=" + ex.message);
	}
}		

WTWJS.prototype.saveAZAvatarAnimation = function() {
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
		WTW.postJSON("/core/handlers/actionzones.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.loadAZAnimationsList();
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-saveAZAvatarAnimation=" + ex.message);
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
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-setActionZonePosition=" + ex.message);
	}
}

WTWJS.prototype.submitActionZoneForm = function(w) {
	/* submit the action zone form */
	try {
		if (w != 2) {
			WTW.closeEditPoles();
		}
		let actionzonename = dGet('wtw_tactionzonename').value;
		if (actionzonename == 'Extreme Load Zone' || actionzonename == 'High - Load when far' || actionzonename == 'Normal - Load when near') {
			dGet('wtw_tactionzonename').disabled = false;
			WTW.showInline('wtw_bdelactionzone');
		} else {
			if (dGet('wtw_tactionzonetype').value == "loadzone" && dGet('wtw_tactionzonename').value.toLowerCase().indexOf("custom") == -1) {
				dGet('wtw_tactionzonename').value = "Custom: " + dGet('wtw_tactionzonename').value;
			}
		}
		if (w == 0) {
			/* delete action zone - note that even a new action zone is already saved in the database when editing starts */
			/* (therefore there is no cancel or undo for the edit process) */
			/* this process sets the delete flag for it to not be loaded with the 3D Scene */
			var actionzone = scene.getMeshByID("actionzone-" + dGet('wtw_tactionzoneind').value + "-" + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].actionzoneid + "-" + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].connectinggridind + "-" + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].connectinggridid + "-" + dGet('wtw_tactionzonetype').value);
			var actionzoneaxlebase2 = scene.getMeshByID("actionzoneaxlebase2-" + dGet('wtw_tactionzoneind').value + "-" + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].actionzoneid + "-" + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].connectinggridind + "-" + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].connectinggridid + "-" + dGet('wtw_tactionzonetype').value);
			var actionzoneaxlebase = scene.getMeshByID("actionzoneaxlebase-" + dGet('wtw_tactionzoneind').value + "-" + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].actionzoneid + "-" + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].connectinggridind + "-" + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].connectinggridid + "-" + dGet('wtw_tactionzonetype').value);
			if (actionzoneaxlebase2 != null && actionzoneaxlebase != null) {
				var actionzonepart = actionzoneaxlebase2.getChildren();
				var moldswithactionzones = "";
				if (actionzonepart != null) {
					if (actionzonepart.length > 0) {
						for (var i=0;i< actionzonepart.length;i++) {
							var actionzonepartname = actionzonepart[i].name;
							if (actionzonepartname.indexOf("-") > -1) {
								var namepart = actionzonepartname.split('-');
								if (namepart[1] != null) {
									if (WTW.isNumeric(namepart[1])) {
										var moldind = Number(namepart[1]);
										var molds = null;
										if (namepart[0].indexOf("communitymolds") > -1) {
											molds = WTW.communitiesMolds;
										} else if (namepart[0].indexOf("thingmolds") > -1) {
											molds = WTW.thingMolds;
										} else if (namepart[0].indexOf("buildingmolds") > -1) {
											molds = WTW.buildingMolds;
										}
										if (molds != null) {
											if (molds[moldind] != null) {
												molds[moldind].actionzoneid = "";
												molds[moldind].parentname = WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].parentname;
												moldswithactionzones += "," + molds[moldind].moldid;
											}
										}
									}
								}
							}
							if (actionzonepart[i].parent != null) {
								if (actionzonepart[i].parent != actionzoneaxlebase.parent) {
									if (actionzonepart[i].parent.name.indexOf("actionzone") > -1) {
										actionzonepart[i].parent = actionzoneaxlebase.parent;
										var posx = actionzonepart[i].position.x;
										var posy = actionzonepart[i].position.y;
										var posz = actionzonepart[i].position.z;
										posx += actionzoneaxlebase.position.x;
										posy += actionzoneaxlebase.position.y;
										posz += actionzoneaxlebase.position.z;
										actionzonepart[i].position.x = posx;
										actionzonepart[i].position.y = posy;
										actionzonepart[i].position.z = posz;
									}
								}
							}
						}
					}
				}				
				if (moldswithactionzones != "") {
					WTW.clearActionZone(moldswithactionzones, 0);
				}
			}
			if (WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].actionzonetype == 'loadzone') {
				WTW.setShownMolds();
			}
			WTW.disposeClean("actionzone-" + dGet('wtw_tactionzoneind').value + "-" + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].actionzoneid + "-" + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].connectinggridind + "-" + WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].connectinggridid + "-" + dGet('wtw_tactionzonetype').value);
			WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)] = null;

			if (dGet('wtw_tactionzoneid').value != "") {
				var zrequest = {
					'actionzoneid': dGet('wtw_tactionzoneid').value,
					'communityid': communityid,
					'buildingid': buildingid,
					'thingid': thingid,
					'function':'deleteactionzone'
				};
				WTW.postJSON("/core/handlers/actionzones.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
					}
				);
			}
		} else {
			/* save the action zone */
			var zactionzoneind = Number(dGet('wtw_tactionzoneind').value);
			var zloadactionzoneid = WTW.getDDLValue('wtw_tazloadactionzoneid');
			if (actionzonename == 'Extreme Load Zone') {
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
				WTW.actionZones[zactionzoneind].movementtype = dGet('wtw_tactionzonemovementtype').value;
				WTW.actionZones[zactionzoneind].rotatespeed = dGet('wtw_tactionzonerotatespeed').value;
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
				WTW.actionZones[zactionzoneind].axis.rotatedirection = "1";
				WTW.actionZones[zactionzoneind].movementdistance = dGet('wtw_taxisscalingz').value;
				WTW.actionZones[zactionzoneind].loadactionzone = zloadactionzoneid;
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
				'movementtype':dGet('wtw_tactionzonemovementtype').value,
				'rotatespeed':dGet('wtw_tactionzonerotatespeed').value,
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
			WTW.postJSON("/core/handlers/actionzones.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
				}
			);
		}
		if (w != 2) {
			WTW.hideAdminMenu();
			WTW.backToEdit();
			WTW.hideActionZone(Number(dGet('wtw_tactionzoneind').value));
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-submitActionZoneForm=" + ex.message);
	}
}

WTWJS.prototype.closeActionZoneForm = function() {
	/* close action zone form */
	try {
		WTW.closeEditPoles();
		WTW.hideAdminMenu();
		var actionzoneid = -1;
		var actionzoneind = -1;
		if (WTW.isNumeric(dGet('wtw_tactionzoneind').value)) {
			actionzoneind = Number(dGet('wtw_tactionzoneind').value);
			if (WTW.actionZones[actionzoneind] != null) {
				WTW.setOpacity("actionzone-" + actionzoneind.toString() + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
				WTW.setOpacity("actionzoneaxlepole-" + actionzoneind.toString() + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
				WTW.setOpacity("actionzoneaxle-" + actionzoneind.toString() + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
				WTW.setOpacity("actionzoneaxlebase-" + actionzoneind.toString() + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
				WTW.setOpacity("actionzoneaxlebase2-" + actionzoneind.toString() + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
			}
			WTW.hideActionZone(actionzoneind);
		}
		dGet('wtw_tactionzoneid').value = "";
		dGet('wtw_tactionzoneind').value = "-1";
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-closeActionZoneForm=" + ex.message);
	}
}

WTWJS.prototype.clearActionZone = function(zmoldswithactionzones, zactionzoneid) {
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
		WTW.postJSON("/core/handlers/actionzones.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-clearActionZone=" + ex.message);
	}
}

WTWJS.prototype.addActionZonePart = function(actionzoneid, mold) {
	/* some action zones apply movement or rotation (like a swinging or sliding door) */
	/* molds (parts like a door and handle) are parented to the moving axle of the action zones */
	/* this function adds a mold and lists the molds that are now part of the action zone axle */
	try {
		if (mold != null) {
			mold = WTW.getMoldBase(mold);
			var moldnameparts = WTW.getMoldnameParts(mold.name);
			var namepart;
			for (var i = 0; i < WTW.actionZones.length; i++) {
				if (WTW.actionZones[i] != null) {
					if (WTW.actionZones[i].actionzoneid == actionzoneid) {
						var actionzoneaxlebase = scene.getMeshByID(WTW.actionZones[i].moldname.replace("actionzone-","actionzoneaxlebase-"));
						var actionzoneaxlebase2 = scene.getMeshByID(WTW.actionZones[i].moldname.replace("actionzone-","actionzoneaxlebase2-"));
						if (actionzoneaxlebase != null) {
							if (mold.parent.name != actionzoneaxlebase2.name) {
								mold.parent = actionzoneaxlebase2;
								var posx = mold.position.x;
								var posy = mold.position.y;
								var posz = mold.position.z; 
								posx -= actionzoneaxlebase.position.x;
								posy -= actionzoneaxlebase.position.y;
								posz -= actionzoneaxlebase.position.z;
								mold.position.x = posx;
								mold.position.y = posy;
								mold.position.z = posz;
							}
						}
					}
				}
			}
			WTW.hilightMoldFast(mold.name,'yellow');
			if (moldnameparts.molds[moldnameparts.moldind] != null) {
				moldnameparts.molds[moldnameparts.moldind].actionzoneid = actionzoneid;
				moldnameparts.molds[moldnameparts.moldind].graphics.texture.backupid = "";		
				WTW.loadMoldForm(moldnameparts.molds[moldnameparts.moldind]);
				var zrequest = {
					'communityid': communityid,
					'buildingid': buildingid,
					'thingid': thingid,
					'moldid': moldnameparts.molds[moldnameparts.moldind].moldid,
					'moldind': moldnameparts.moldind,
					'actionzoneid': moldnameparts.molds[moldnameparts.moldind].actionzoneid,
					'function':'savemoldactionzone'
				};
				WTW.postJSON("/core/handlers/molds.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
					}
				);
			} 	
			dGet('wtw_actionzonepartslist').innerHTML = "";
			for (var j=0; j < WTW.thingMolds.length; j++) {
				if (WTW.thingMolds[j] != null) {
					if (WTW.thingMolds[j].actionzoneid == actionzoneid) {
						dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightMold('" + WTW.thingMolds[j].moldname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + WTW.thingMolds[j].moldname + "');\" onclick=\"WTW.removeActionZonePart('" + WTW.thingMolds[j].moldname + "')\">Action Zone Part (" + WTW.thingMolds[j].shape + ")</div>";
					}
				}
			}
			for (var j=0; j < WTW.buildingMolds.length; j++) {
				if (WTW.buildingMolds[j] != null) {
					if (WTW.buildingMolds[j].actionzoneid == actionzoneid) {
						dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightMold('" + WTW.buildingMolds[j].moldname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + WTW.buildingMolds[j].moldname + "');\" onclick=\"WTW.removeActionZonePart('" + WTW.buildingMolds[j].moldname + "')\">Action Zone Part (" + WTW.buildingMolds[j].shape + ")</div>";
					}
				}
			}
			for (var j=0; j < WTW.communitiesMolds.length; j++) {
				if (WTW.communitiesMolds[j] != null) {
					if (WTW.communitiesMolds[j].actionzoneid == actionzoneid) {
						dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightMold('" + WTW.communitiesMolds[j].moldname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + WTW.communitiesMolds[j].moldname + "');\" onclick=\"WTW.removeActionZonePart('" + WTW.communitiesMolds[j].moldname + "')\">Action Zone Part (" + WTW.communitiesMolds[j].shape + ")</div>";
					}
				}
			}
		}
		WTW.selectAddActionZonePart(2); 
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-addActionZonePart=" + ex.message);
	}
}

WTWJS.prototype.selectAddActionZonePart = function(w) {
	/* some action zones apply movement or rotation (like a swinging or sliding door) */
	/* molds (parts like a door and handle) are parented to the moving axle of the action zones */
	/* this function adds a mold to the action zone axle (continues the save and update process) */
	try {
		if (w == 0) {
			if (dGet('wtw_tactionzoneid').value == "") {
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
				WTW.actionZones[zactionzoneind].axis.rotatedirection = "1";
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
				WTW.postJSON("/core/handlers/actionzones.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
					}
				);
			}
			WTW.pick = 2;
			dGet('wtw_baddactionzonepart').innerHTML = "Cancel Pick Shape";
		} else {
			WTW.pick = 0;
			dGet('wtw_baddactionzonepart').innerHTML = "Pick Shape to Add";
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-selectAddActionZonePart=" + ex.message);
	}
}

WTWJS.prototype.removeActionZonePart = function(moldname) {
	/* some action zones apply movement or rotation (like a swinging or sliding door) */
	/* molds (parts like a door and handle) are parented to the moving axle of the action zones */
	/* this function removes a mold from the action zone axle */
	try {
		var mold = scene.getMeshByID(moldname);
		if (mold != null) {
			mold = WTW.getMoldBase(mold);
			var moldnameparts = WTW.getMoldnameParts(mold.name);
			if (moldnameparts.molds[moldnameparts.moldind] != null) {
				moldnameparts.molds[moldnameparts.moldind].actionzoneid = "";
				moldnameparts.molds[moldnameparts.moldind].graphics.texture.backupid = "";
				WTW.loadMoldForm(moldnameparts.molds[moldnameparts.moldind]);
				var zrequest = {
					'communityid': communityid,
					'buildingid': buildingid,
					'thingid': thingid,
					'moldid': moldnameparts.molds[moldnameparts.moldind].moldid,
					'moldind': moldnameparts.moldind,
					'actionzoneid': '',
					'function':'savemoldactionzone'
				};
				WTW.postJSON("/core/handlers/molds.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
					}
				);
			} 	
			for (var i = 0; i < WTW.actionZones.length; i++) {
				if (WTW.actionZones[i] != null) {
					if (WTW.actionZones[i].actionzoneid == moldnameparts.actionzoneid) {
						var actionzoneaxlebase = scene.getMeshByID("actionzoneaxlebase-" + i + "-" + WTW.actionZones[i].actionzoneid + "-" + WTW.actionZones[i].connectinggridind + "-" + WTW.actionZones[i].connectinggridid + "-" + WTW.actionZones[i].actionzonetype);
						var actionzoneaxlebase2 = scene.getMeshByID("actionzoneaxlebase2-" + i + "-" + WTW.actionZones[i].actionzoneid + "-" + WTW.actionZones[i].connectinggridind + "-" + WTW.actionZones[i].connectinggridid + "-" + WTW.actionZones[i].actionzonetype);
						var actionzoneaxle = scene.getMeshByID("actionzoneaxle-" + i + "-" + WTW.actionZones[i].actionzoneid + "-" + WTW.actionZones[i].connectinggridind + "-" + WTW.actionZones[i].connectinggridid + "-" + WTW.actionZones[i].actionzonetype);
						if (actionzoneaxlebase != null) {
							if (mold.parent != null) {
								if (mold.parent != actionzoneaxlebase.parent) {
									if (mold.parent.name.indexOf("actionzone") > -1) {
										mold.parent = actionzoneaxlebase.parent;
										mold.position.x = moldnameparts.molds[moldnameparts.moldind].position.x;
										mold.position.y = moldnameparts.molds[moldnameparts.moldind].position.y;
										mold.position.z = moldnameparts.molds[moldnameparts.moldind].position.z;
										mold.rotation.x = WTW.getRadians(moldnameparts.molds[moldnameparts.moldind].rotation.x);
										mold.rotation.y = WTW.getRadians(moldnameparts.molds[moldnameparts.moldind].rotation.y);
										mold.rotation.z = WTW.getRadians(moldnameparts.molds[moldnameparts.moldind].rotation.z);
									}
								}
							}
						}
						if (actionzoneaxlebase2 != null) {
							dGet('wtw_actionzonepartslist').innerHTML = "";
							var moldparts = actionzoneaxlebase2.getChildren();
							if (moldparts.length > 0) {
								for (var i=0;i < moldparts.length;i++) {
									var moldpartname = moldparts[i].name;
									var shape = i;
									if (moldpartname.indexOf("-") > -1) {
										var namepart = moldpartname.split('-');
										shape = namepart[5];
									}
									dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightMold('" + moldpartname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + moldpartname + "');\" onclick=\"WTW.removeActionZonePart('" + moldpartname + "')\">Action Zone Part (" + shape + ")</div>";
								}
							}
						}
					}
				}
			}
			WTW.hilightMoldFast(moldname,'yellow');
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-removeActionZonePart=" + ex.message);
	}
}

WTWJS.prototype.getLoadZoneList = function(defaultvalue) {
	/* molds are set to load zones to know when to be added to a 3D Scene */
	/* this process provides a drop down list for the molds form to select a load zone (in the advanced options section) */
	try {
		WTW.clearDDL("wtw_tmoldloadactionzoneid");
		for (var i=0;i < WTW.actionZones.length;i++) {
			if (WTW.actionZones[i] != null) {
				if (WTW.actionZones[i].actionzonetype == 'loadzone') {
					if ((WTW.actionZones[i].thinginfo.thingid==thingid && thingid!='') || (WTW.actionZones[i].buildinginfo.buildingid==buildingid && buildingid!='') || (WTW.actionZones[i].communityinfo.communityid==communityid && communityid!='')) {
						var option = document.createElement("option");
						option.text = WTW.actionZones[i].actionzonename;
						option.value = WTW.actionZones[i].actionzoneid;
						if (option.value == defaultvalue) {
							option.selected = true;
						}
						dGet("wtw_tmoldloadactionzoneid").add(option);
					}
				}
			}
		}
		if (dGet("wtw_tmoldloadactionzoneid").options.length == 0) {
			var option = document.createElement("option");
			option.text = "Default";
			option.value = "";
			option.selected = true;
			dGet("wtw_tmoldloadactionzoneid").add(option);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-getLoadZoneList=" + ex.message);
	} 
}

WTWJS.prototype.getLoadActionZoneList = function(defaultvalue) {
	/* action zones are also set to load zones to know when to be added to a 3D Scene */
	/* only the extreme load zone for a 3D Community, 3D Building, or 3D Thing does not require a load zone set */
	/* this process provides a drop down list for the action zones form to select a load zone (in the advanced options section) */
	try {
		WTW.clearDDL("wtw_tazloadactionzoneid");
		for (var i=0;i < WTW.actionZones.length;i++) {
			if (WTW.actionZones[i] != null) {
				if (WTW.actionZones[i].actionzonetype == 'loadzone') {
					if ((WTW.actionZones[i].thinginfo.thingid==thingid && thingid!='') || (WTW.actionZones[i].buildinginfo.buildingid==buildingid && buildingid!='') || (WTW.actionZones[i].communityinfo.communityid==communityid && communityid!='')) {
						var option = document.createElement("option");
						option.text = WTW.actionZones[i].actionzonename;
						option.value = WTW.actionZones[i].actionzoneid;
						if (option.value == defaultvalue) {
							option.selected = true;
						}
						dGet("wtw_tazloadactionzoneid").add(option);
					}
				}
			}
		}
		if (dGet("wtw_tazloadactionzoneid").options.length == 0) {
			var option = document.createElement("option");
			option.text = "Default";
			option.value = "";
			option.selected = true;
			dGet("wtw_tazloadactionzoneid").add(option);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-getLoadActionZoneList=" + ex.message);
	} 
}

WTWJS.prototype.openSelectActionZoneForm = function() {
	/* admin menu form, this function provides a list of action zones to select and edit an existing zone */
	try {
		WTW.getActionZoneList();
		if (WTW.actionZones.length > 0) {
			dGet("wtw_selectactionzoneid").onchange = function() {};
			WTW.clearDDL("wtw_selectactionzoneid");
			var actionzonecount = 0;
			dGet("wtw_selectactionzoneid").options[actionzonecount] = new Option("-- Select Action Zone --", "-1");
			actionzonecount += 1;
			for (var i = 0; i < WTW.actionZones.length; i++) {
				if (WTW.actionZones[i] != null) {
					if ((WTW.actionZones[i].communityinfo.communityid == communityid && communityid != "") || (WTW.actionZones[i].buildinginfo.buildingid == buildingid && buildingid != "") || (WTW.actionZones[i].thinginfo.thingid == thingid && thingid != "")) {
						if (WTW.actionZones[i].actionzonename.length > 0) { /* ( && WTW.actionZones[i].actionzonename != 'Extreme Load Zone' && WTW.actionZones[i].actionzonename != 'High - Load when far' && WTW.actionZones[i].actionzonename != 'Normal - Load when near')  */
							dGet("wtw_selectactionzoneid").options[actionzonecount] = new Option(WTW.actionZones[i].actionzonename, WTW.actionZones[i].actionzoneid);
							actionzonecount += 1;
						}
					}
				}
			}
			dGet("wtw_selectactionzoneid").onchange = function() { WTW.selectActionZoneToEdit(); };
			dGet('wtw_selectactionzoneid').focus();
			WTW.show('wtw_editexistingactionzonediv');
		} else {
			WTW.hide('wtw_editexistingactionzonediv');
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-openSelectActionZoneForm=" + ex.message);
	}
}

WTWJS.prototype.selectActionZoneToEdit = function() {
	/* this function executes on select from the drop down list of existing action zones to edit (admin menu) */
	try {
		WTW.openActionZoneForm(dGet("wtw_selectactionzoneid").options[dGet("wtw_selectactionzoneid").selectedIndex].value);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-selectActionZoneToEdit=" + ex.message);
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
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-reverserotatedirection=" + ex.message);
	}
}

WTWJS.prototype.loadAltActionZones = function(ddlname) {
	/* alt load action zones allow a 3D Building or 3D Thing to be added to a 3D Community or 3D Building */
	/* using the parent's load zones instead of the original load zones for the object */
	/* this function creates the drop down list of load zones for that use */
	try {
		if (dGet(ddlname) != null) {
			WTW.clearDDL(ddlname);
			var option = document.createElement("option");
			option.text = "Default";
			option.value = "";
			option.selected = true;
			dGet(ddlname).add(option);
			if (WTW.actionZones != null) {
				for (var i = 0; i < WTW.actionZones.length; i++) {
					if (WTW.actionZones[i] != null) {
						var zthingid = "";
						var zbuildingid = "";
						var zcommunityid = "";
						if (WTW.actionZones[i].thinginfo.thingid != undefined) {
							zthingid = WTW.actionZones[i].thinginfo.thingid;
						}
						if (WTW.actionZones[i].buildinginfo.buildingid != undefined) {
							zbuildingid = WTW.actionZones[i].buildinginfo.buildingid;
						}
						if (WTW.actionZones[i].communityinfo.communityid != undefined) {
							zcommunityid = WTW.actionZones[i].communityinfo.communityid;
						}
						if ((WTW.actionZones[i].actionzonetype == "loadzone") && ((zcommunityid == communityid && communityid != "") || (zbuildingid == buildingid && buildingid != ""))) {
							var option = document.createElement("option");
							option.text = WTW.actionZones[i].actionzonename;
							option.value = WTW.actionZones[i].actionzoneid;
							dGet(ddlname).add(option);
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-loadAltActionZones=" + ex.message);
	}
}

WTWJS.prototype.loadBuildingThingsLoadZones = function(addactionzones) {
	/* loads the action zones for a 3D Things within a 3D Building */
	try {
		if (addactionzones.actionzones != undefined) {
			for (var i = 0; i < addactionzones.actionzones.length; i++) {
				if (WTW.isItemInArray(WTW.actionZones, addactionzones.actionzones[i].actionzoneid, addactionzones.actionzones[i].connectinggridind, -1, "actionzones") == false) {
					var actionzoneind = WTW.getNextCount(WTW.actionZones);
					WTW.actionZones[actionzoneind] = addactionzones.actionzones[i];
					WTW.actionZones[actionzoneind].actionzoneind = actionzoneind;
					WTW.actionZones[actionzoneind].status = 0;
					WTW.actionZones[actionzoneind].parentname = WTW.getParentName(WTW.actionZones[actionzoneind].connectinggridind);
					var actionzonename = "actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype;
					WTW.actionZones[actionzoneind].moldname = actionzonename;
				}
			}
		}
		WTW.setWindowSize();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-loadBuildingThingsLoadZones=" + ex.message);
	} 
}


/* the following process is used to change the action zone while it is being edited */
/* using the action zone form fields for values */

WTWJS.prototype.setNewActionZone = function() {
	/* use the form settings to redraw the action zone */
	try {		
		var axispositionx = Number(dGet('wtw_taxispositionx').value);
		var axispositiony = Number(dGet('wtw_taxispositiony').value);
		var axispositionz = Number(dGet('wtw_taxispositionz').value);		
		var axisrotx = Number(dGet('wtw_taxisrotationx').value);
		var axisroty = Number(dGet('wtw_taxisrotationy').value);
		var axisrotz = Number(dGet('wtw_taxisrotationz').value);		
		var zpositionx = Number(dGet('wtw_tactionzoneposx').value);
		var zpositiony = Number(dGet('wtw_tactionzoneposy').value);
		var zpositionz = Number(dGet('wtw_tactionzoneposz').value);		
		var zscalingx = Number(dGet('wtw_tactionzonescalingx').value);		
		var zscalingy = Number(dGet('wtw_tactionzonescalingy').value);		
		var zscalingz = Number(dGet('wtw_tactionzonescalingz').value);		
		var zrotationx = WTW.getRadians(Number(dGet('wtw_tactionzonerotx').value));
		var zrotationy = WTW.getRadians(Number(dGet('wtw_tactionzoneroty').value));
		var zrotationz = WTW.getRadians(Number(dGet('wtw_tactionzonerotz').value));
		var rotatespeed = Number(dGet('wtw_tactionzonerotatespeed').value);		
		if (dGet('wtw_tactionzonetype').value == "swingingdoor" || dGet('wtw_tactionzonetype').value == "rotate" || dGet('wtw_tactionzonetype').value == "driverturnangle" || dGet('wtw_tactionzonetype').value == "driverturningwheel") {
			dGet('wtw_taxisscalingx').value = ".2";
			dGet('wtw_taxisscalingy').value = "20";
			dGet('wtw_taxisscalingz').value = ".2";
		} else if (dGet('wtw_tactionzonetype').value.indexOf("seat") > -1) {
			dGet('wtw_taxisscalingx').value = ".2";
			dGet('wtw_taxisscalingy').value = ".2";
			dGet('wtw_taxisscalingz').value = "10";
		}
		var doorrotatedirection = dGet("wtw_tactionzonerotatedirection").options[dGet("wtw_tactionzonerotatedirection").selectedIndex].value;
		var doorrotatedegrees = dGet('wtw_tactionzonerotatedegrees').value;
		if (WTW.isNumeric(doorrotatedegrees) == false) {
			doorrotatedegrees = 90;
			dGet('wtw_tactionzonerotatedegrees').value = 90;
		} else {
			if (Number(doorrotatedegrees) < 0) {
				doorrotatedegrees = 0;
				dGet('wtw_tactionzonerotatedegrees').value = 0;
			}
		}
		if (WTW.isNumeric(dGet('wtw_tactionzoneind').value)) {
			var actionzoneind = Number(dGet('wtw_tactionzoneind').value);
			if (WTW.actionZones[actionzoneind] != null) {
				WTW.actionZones[actionzoneind].rotatespeed = rotatespeed;
				WTW.actionZones[actionzoneind].axis.rotatedegrees = doorrotatedegrees;
				WTW.actionZones[actionzoneind].axis.rotatedirection = doorrotatedirection;
				var actionzoneaxlebase = scene.getMeshByID("actionzoneaxlebase-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
				var actionzoneaxle = scene.getMeshByID("actionzoneaxle-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
				var actionzoneaxlebase2 = scene.getMeshByID("actionzoneaxlebase2-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
				var actionzone = scene.getMeshByID("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
				var actionzoneaxlepole = scene.getMeshByID("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
				var bposx = 0;
				var bposy = 0;
				var bposz = 0;
				switch (WTW.actionZones[actionzoneind].actionzonetype) {
					case "driverseat":
						if (actionzoneaxle != null) {
							actionzoneaxle.position.x = axispositionx;
							actionzoneaxle.position.y = axispositiony;
							actionzoneaxle.position.z = axispositionz;
							actionzoneaxle.rotation.x = WTW.getRadians(axisrotx);
							actionzoneaxle.rotation.y = WTW.getRadians(axisroty);
							actionzoneaxle.rotation.z = WTW.getRadians(axisrotz);
						}
						if (actionzoneaxlepole != null) {
							actionzoneaxlepole.position.x = 0;
							actionzoneaxlepole.position.y = 0;
							actionzoneaxlepole.position.z = 5;
							actionzoneaxle.isVisible = true;
						}
						if (actionzone != null) {
							actionzone.position.x = zpositionx;
							actionzone.position.y = zpositiony;
							actionzone.position.z = zpositionz;
							actionzone.scaling.x = zscalingx;
							actionzone.scaling.y = zscalingy;
							actionzone.scaling.z = zscalingz;
							actionzone.rotation.x = zrotationx;
							actionzone.rotation.y = zrotationy;
							actionzone.rotation.z = zrotationz;
							actionzone.isVisible = true;
							WTW.openEditPoles(actionzone);
						}
						break;
					case "passengerseat":
						if (actionzoneaxle != null) {
							actionzoneaxle.position.x = axispositionx;
							actionzoneaxle.position.y = axispositiony;
							actionzoneaxle.position.z = axispositionz;
							actionzoneaxle.rotation.x = WTW.getRadians(axisrotx);
							actionzoneaxle.rotation.y = WTW.getRadians(axisroty);
							actionzoneaxle.rotation.z = WTW.getRadians(axisrotz);
						}
						if (actionzoneaxlepole != null) {
							actionzoneaxlepole.position.x = 0;
							actionzoneaxlepole.position.y = 0;
							actionzoneaxlepole.position.z = 5;
							actionzoneaxle.isVisible = true;
						}
						if (actionzone != null) {
							actionzone.position.x = zpositionx;
							actionzone.position.y = zpositiony;
							actionzone.position.z = zpositionz;
							actionzone.scaling.x = zscalingx;
							actionzone.scaling.y = zscalingy;
							actionzone.scaling.z = zscalingz;
							actionzone.rotation.x = zrotationx;
							actionzone.rotation.y = zrotationy;
							actionzone.rotation.z = zrotationz;
							actionzone.isVisible = true;
							WTW.openEditPoles(actionzone);
						}
						break;
					case "seat":
						if (actionzoneaxle != null) {
							actionzoneaxle.position.x = axispositionx;
							actionzoneaxle.position.y = axispositiony;
							actionzoneaxle.position.z = axispositionz;
							actionzoneaxle.rotation.x = WTW.getRadians(axisrotx);
							actionzoneaxle.rotation.y = WTW.getRadians(axisroty);
							actionzoneaxle.rotation.z = WTW.getRadians(axisrotz);
						}
						if (actionzoneaxlepole != null) {
							actionzoneaxlepole.position.x = 0;
							actionzoneaxlepole.position.y = 0;
							actionzoneaxlepole.position.z = 5;
							actionzoneaxle.isVisible = true;
						}
						if (actionzone != null) {
							actionzone.position.x = zpositionx;
							actionzone.position.y = zpositiony;
							actionzone.position.z = zpositionz;
							actionzone.scaling.x = zscalingx;
							actionzone.scaling.y = zscalingy;
							actionzone.scaling.z = zscalingz;
							actionzone.rotation.x = zrotationx;
							actionzone.rotation.y = zrotationy;
							actionzone.rotation.z = zrotationz;
							actionzone.isVisible = true;
							WTW.openEditPoles(actionzone);
						}
						break;
					default:
						if (actionzoneaxlebase != null) {
							actionzoneaxlebase.position.x = axispositionx;
							actionzoneaxlebase.position.y = axispositiony;
							actionzoneaxlebase.position.z = axispositionz;
							actionzoneaxlebase.rotation.x = WTW.getRadians(axisrotx);
							actionzoneaxlebase.rotation.y = WTW.getRadians(axisroty);
							actionzoneaxlebase.rotation.z = WTW.getRadians(axisrotz);
							actionzoneaxlebase.isVisible = true;
							if (dGet('wtw_tattachavatarmoldname').value != "") {

							}
						}						
						if (actionzoneaxle != null) {
							actionzoneaxle.position.x = 0;
							actionzoneaxle.position.y = 0;
							actionzoneaxle.position.z = 0;
							actionzoneaxle.isVisible = true;
						}
						if (actionzone != null) {
							if (dGet('wtw_tcopyaxletoactionzone').checked == true || dGet('wtw_tactionzonetype').value == "rotate") {
								zpositionx = axispositionx;
								zpositiony = axispositiony;
								zpositionz = axispositionz;
								dGet('wtw_tactionzoneposx').value = zpositionx;
								dGet('wtw_tactionzoneposy').value = zpositiony;
								dGet('wtw_tactionzoneposz').value = zpositionz;		
							}
							actionzone.position.x = zpositionx;
							actionzone.position.y = zpositiony;
							actionzone.position.z = zpositionz;
							actionzone.scaling.x = zscalingx;
							actionzone.scaling.y = zscalingy;
							actionzone.scaling.z = zscalingz;
							actionzone.rotation.x = zrotationx;
							actionzone.rotation.y = zrotationy;
							actionzone.rotation.z = zrotationz;
							actionzone.isVisible = true;
							WTW.openEditPoles(actionzone);
						}
						break;
				}
				if (actionzoneaxlebase2 != null) {
					var doorparts = actionzoneaxlebase2.getChildren();
					if (doorparts.length > 0) {
						var doorpartsind = 0;
						while (doorpartsind < doorparts.length) {
							var molds = WTW.buildingMolds;
							var moldsgroup = "building";
							var moldind = -1;
							if (doorparts[doorpartsind].name.indexOf("-") > -1) {
								var objparts = doorparts[doorpartsind].name.split('-');
								if (objparts[0] != null) {
									if (objparts[0].indexOf("community") > -1) {
										molds = WTW.communitiesMolds;
										moldsgroup = "community";
									} else if (objparts[0].indexOf("thing") > -1) {
										molds = WTW.thingMolds;
										moldsgroup = "thing";
									}
								}
								if (objparts[1] != null) {
									if (WTW.isNumeric(objparts[1])) {
										moldind = Number(objparts[1]);
									}
								}
							}
							if (molds[moldind] != null) {
								var posx = Number(molds[moldind].position.x);
								var posy = Number(molds[moldind].position.y);
								var posz = Number(molds[moldind].position.z);
								doorparts[doorpartsind].position.x = posx - axispositionx;
								doorparts[doorpartsind].position.y = posy - axispositiony;
								doorparts[doorpartsind].position.z = posz - axispositionz;
							}
							doorpartsind += 1;
						}
					}
					actionzoneaxlebase2.position.x = 0;
					actionzoneaxlebase2.position.y = 0;
					actionzoneaxlebase2.position.z = 0;
					actionzoneaxlebase2.rotation.x = WTW.getRadians(-axisrotx);
					actionzoneaxlebase2.rotation.y = WTW.getRadians(-axisroty);
					actionzoneaxlebase2.rotation.z = WTW.getRadians(-axisrotz);
				}
				if (actionzoneaxlepole != null) {
					if (dGet('wtw_tactionzonetype').value == "slidingdoor" || dGet('wtw_tactionzonetype').value == "clickactivatedslidingdoor" || dGet('wtw_tactionzonetype').value == "peoplemover") {
						dGet('wtw_taxisscalingx').value = ".2";
						dGet('wtw_taxisscalingy').value = ".2";
						actionzoneaxlepole.scaling.x = Number(dGet('wtw_taxisscalingx').value);
						actionzoneaxlepole.scaling.y = Number(dGet('wtw_taxisscalingy').value);
						actionzoneaxlepole.scaling.z = Number(dGet('wtw_taxisscalingz').value);
					} else if (dGet('wtw_tactionzonetype').value == "elevator") {
						dGet('wtw_taxisscalingx').value = ".2";
						actionzoneaxlepole.scaling.x = .2;
						actionzoneaxlepole.scaling.z = .2;
						actionzoneaxlepole.scaling.y = Number(dGet('wtw_taxisscalingz').value);
						actionzoneaxlepole.position.y = Number(dGet('wtw_taxisscalingz').value)/2;
					} else {
						actionzoneaxlepole.scaling.x = Number(dGet('wtw_taxisscalingx').value);
						actionzoneaxlepole.scaling.y = Number(dGet('wtw_taxisscalingy').value);
						actionzoneaxlepole.scaling.z = Number(dGet('wtw_taxisscalingz').value);
					}
				}
				WTW.actionZones[actionzoneind].position.x = zpositionx;
				WTW.actionZones[actionzoneind].position.y = zpositiony;
				WTW.actionZones[actionzoneind].position.z = zpositionz;
				WTW.actionZones[actionzoneind].scaling.x = zscalingx;
				WTW.actionZones[actionzoneind].scaling.y = zscalingy;
				WTW.actionZones[actionzoneind].scaling.z = zscalingz;
				WTW.actionZones[actionzoneind].rotation.x = zrotationx;
				WTW.actionZones[actionzoneind].rotation.y = zrotationy;
				WTW.actionZones[actionzoneind].rotation.z = zrotationz;
				WTW.actionZones[actionzoneind].movementdistance = dGet('wtw_taxisscalingz').value;
				WTW.showActionZone(actionzoneind);
			}
		}	
		scene.render();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminactionzones.js-setNewActionZone=" + ex.message);
	}
}


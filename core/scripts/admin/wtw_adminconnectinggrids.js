/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are used to administer a website in admin mode only */
/* connecting grids are transparent cubes that set the position, rotation, and scaling for all 3D Communities, 3D Buildings, and 3D Things */
/* 		FYI: all molds and action zones parent to the connecting grids */

WTWJS.prototype.openConnectingGridsForm = function(connectinggridind) {
	/* open the connecting grids form to add a new or edit an existing connecting grid */
	try {
		WTW.hideAdminMenu();
		if (connectinggridind == undefined && dGet("wtw_teditconnectinggridind").value != "") {
			connectinggridind = dGet("wtw_teditconnectinggridind").value;
		} else if (connectinggridind == undefined) {
			connectinggridind = -1;
		}
		var parentwebid = "";
		var parentwebtype = "community";
		var childwebid = "";
		var childwebtype = "building";
		WTW.loadAltActionZones('wtw_taltloadactionzoneid');
		if (connectinggridind > -1) {
			if (WTW.connectingGrids[connectinggridind] != null) {
				dGet("wtw_teditconnectinggridid").value = WTW.connectingGrids[connectinggridind].connectinggridid;
				dGet('wtw_teditconnectinggridind').value = connectinggridind;
				dGet('wtw_tmoldname').value = WTW.connectingGrids[connectinggridind].moldname;
				dGet('wtw_tcommunityid').value = WTW.connectingGrids[connectinggridind].communityinfo.communityid;
				dGet('wtw_tbuildingid').value = WTW.connectingGrids[connectinggridind].buildinginfo.buildingid;
				dGet('wtw_tthingid').value = WTW.connectingGrids[connectinggridind].thinginfo.thingid;
				dGet('wtw_tparentwebid').value = WTW.connectingGrids[connectinggridind].parentwebid;
				dGet('wtw_tparentwebtype').value = WTW.connectingGrids[connectinggridind].parentwebtype;
				dGet('wtw_tchildwebid').value = WTW.connectingGrids[connectinggridind].childwebid;
				dGet('wtw_tchildwebtype').value = WTW.connectingGrids[connectinggridind].childwebtype;
				dGet('wtw_teditloadactionzoneid').value = WTW.connectingGrids[connectinggridind].loadactionzoneid;
				dGet('wtw_tcommunityname').value = WTW.decode(WTW.connectingGrids[connectinggridind].communityinfo.communityname);
				dGet('wtw_tcommunitydescription').value = WTW.decode(WTW.connectingGrids[connectinggridind].communityinfo.communitydescription);
				dGet('wtw_tcommunityanalyticsid').value = WTW.connectingGrids[connectinggridind].communityinfo.analyticsid;
				dGet('wtw_tconngridpositionx').value = WTW.connectingGrids[connectinggridind].position.x;
				dGet('wtw_tconngridpositiony').value = WTW.connectingGrids[connectinggridind].position.y;
				dGet('wtw_tconngridpositionz').value = WTW.connectingGrids[connectinggridind].position.z;
				dGet('wtw_tconngridscalingx').value = WTW.connectingGrids[connectinggridind].scaling.x;
				dGet('wtw_tconngridscalingy').value = WTW.connectingGrids[connectinggridind].scaling.y;
				dGet('wtw_tconngridscalingz').value = WTW.connectingGrids[connectinggridind].scaling.z;
				dGet('wtw_tconngridrotationx').value = WTW.connectingGrids[connectinggridind].rotation.x;
				dGet('wtw_tconngridrotationy').value = WTW.connectingGrids[connectinggridind].rotation.y;
				dGet('wtw_tconngridrotationz').value = WTW.connectingGrids[connectinggridind].rotation.z; 
				dGet('wtw_tconngridalttag').value = WTW.connectingGrids[connectinggridind].alttag.name;
				WTW.setDDLValue('wtw_taltloadactionzoneid', WTW.connectingGrids[connectinggridind].altloadactionzoneid);
				parentwebtype = WTW.connectingGrids[connectinggridind].parentwebtype;
				parentwebid = WTW.connectingGrids[connectinggridind].parentwebid;
				childwebtype = WTW.connectingGrids[connectinggridind].childwebtype;
				childwebid = WTW.connectingGrids[connectinggridind].childwebid;
				switch (childwebtype) {
					case "building":
						dGet('wtw_buildingnametitle').innerHTML = WTW.connectingGrids[connectinggridind].buildinginfo.buildingname;
						break;
					case "thing":
						dGet('wtw_buildingnametitle').innerHTML = WTW.connectingGrids[connectinggridind].thinginfo.thingname;
						break;
					default:
						dGet('wtw_buildingnametitle').innerHTML = "";
						break;
				}
				if (dGet('wtw_adminmenubutton').style.left == "0px") {
					WTW.toggleAdminMenu('wtw_adminmenubutton');
				}
				WTW.show('wtw_adminmenu14');
				WTW.show('wtw_adminmenu14b');
				if (parentwebtype == "community" && childwebtype == "building") {
					dGet('wtw_bdelconnectinggrid').onclick = function() {WTW.openConfirmation('3');};
				} else if (parentwebtype == "community") {
					dGet('wtw_bdelconnectinggrid').onclick = function() {WTW.submitConnectingGridsForm(0);};
				} else {
					dGet('wtw_bdelconnectinggrid').onclick = function() {WTW.submitConnectingGridsForm(0);};
				}
			}
		}	
		switch (childwebtype) {
			case "thing":
				dGet('wtw_editconnectinggridsformtitle').innerHTML = 'Edit 3D Thing Location';
				dGet('wtw_buildingpositiontitle').innerHTML = '3D Thing Position';
				dGet('wtw_buildingscaletitle').innerHTML = '3D Thing Scale (Size)';
				dGet('wtw_buildingrotationtitle').innerHTML = '3D Thing Rotation';
				dGet('wtw_beditconnectinggrid').innerHTML = 'Save 3D Thing';
				dGet('wtw_bdelconnectinggrid').innerHTML = 'Delete 3D Thing';
				dGet('wtw_beditthisbuilding').innerHTML = 'Open 3D Thing in Editor';
				dGet('wtw_beditthisbuilding').onclick = function(){WTW.editThing(childwebid);WTW.blockPassThrough(); return (false);};
				break;
			default:
				dGet('wtw_editconnectinggridsformtitle').innerHTML = 'Edit 3D Building Location';
				dGet('wtw_buildingpositiontitle').innerHTML = '3D Building Position';
				dGet('wtw_buildingscaletitle').innerHTML = '3D Building Scale (Size)';
				dGet('wtw_buildingrotationtitle').innerHTML = '3D Building Rotation';
				dGet('wtw_beditconnectinggrid').innerHTML = 'Save 3D Building';
				dGet('wtw_bdelconnectinggrid').innerHTML = 'Delete 3D Building';
				dGet('wtw_beditthisbuilding').innerHTML = 'Open 3D Building in Editor';
				dGet('wtw_beditthisbuilding').onclick = function(){WTW.editBuilding(childwebid);WTW.blockPassThrough(); return (false);};
				break;
		}
		if (WTW.connectingGrids[connectinggridind] != null) {
			var mold = scene.getMeshByID(WTW.connectingGrids[connectinggridind].moldname);
			if (mold != null) {
				WTW.openEditPoles(mold);
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminconnectinggrids.js-openConnectingGridsForm=" + ex.message);
	}
}

WTWJS.prototype.submitConnectingGridsForm = async function(w) {
	/* submit the connecting grids form */
	try {
		var connectinggridind = -1;
		if (WTW.isNumeric(dGet("wtw_teditconnectinggridind").value)) {
			connectinggridind = Number(dGet("wtw_teditconnectinggridind").value);
		}
		if (connectinggridind > -1) {
			switch (w) {
				case 0: 
					/* delect connecting grid */
					if (WTW.connectingGrids[connectinggridind] != null) {
						if (WTW.connectingGrids[connectinggridind] != null) {
							if (WTW.connectingGrids[connectinggridind].moldname != undefined) {
								WTW.disposeClean(WTW.connectingGrids[connectinggridind].moldname);
							}
						}
						WTW.connectingGrids[connectinggridind] = null;
						if (WTW.automations != null) {
							for (var i = 0; i < WTW.automations.length; i++) {
								if (WTW.automations[i] != null) {
									if (WTW.automations[i].connectinggridind == connectinggridind) {
										if (WTW.automations[i].step.timer != null) {
											window.clearInterval(WTW.automations[i].step.timer);
											WTW.automations[i].step.timer = null;
										}
										WTW.automations[i] = null;
									}
								}
							}
						} 
						if (WTW.actionZones != null) {
							for (var i = 0; i < WTW.actionZones.length; i++) {
								if (WTW.actionZones[i] != null) {
									if (WTW.actionZones[i].connectinggridind == connectinggridind) {
										WTW.addDisposeMoldToQueue(WTW.actionZones[i].moldname);
										WTW.actionZones[i] = null;
									}
								}
							}
						} 
						if (WTW.thingMolds != null) {
							for (var i = 0; i < WTW.thingMolds.length; i++) {
								if (WTW.thingMolds[i] != null) {
									if (WTW.thingMolds[i].connectinggridind == connectinggridind) {
										WTW.addDisposeMoldToQueue(WTW.thingMolds[i].moldname);
										WTW.thingMolds[i] = null;
									}
								}
							}
						}
						if (WTW.buildingMolds != null) {
							for (var i = 0; i < WTW.buildingMolds.length; i++) {
								if (WTW.buildingMolds[i] != null) {
									if (WTW.buildingMolds[i].connectinggridind == connectinggridind) {
										WTW.addDisposeMoldToQueue(WTW.buildingMolds[i].moldname);
										WTW.buildingMolds[i] = null;
									}
								}
							}
						}
					}
					WTW.closeConfirmation();
					var zrequest = {
						'connectinggridid': dGet("wtw_teditconnectinggridid").value,
						'function':'deleteconnectinggrid'
					};
					WTW.postAsyncJSON("/core/handlers/connectinggrids.php", zrequest, 
						function(zresponse) {
							zresponse = JSON.parse(zresponse);
							/* note serror would contain errors */
							WTW.hideAdminMenu();
							WTW.backToEdit();
							WTW.closeEditPoles();
						}
					);
					break;
				case -1: 
					/* cancel change connecting grid */
					if (WTW.connectingGrids[connectinggridind] != null) {
						dGet('wtw_teditconnectinggridid').value = WTW.connectingGrids[connectinggridind].connectinggridid;
						dGet('wtw_tconngridpositionx').value = WTW.connectingGrids[connectinggridind].position.x;
						dGet('wtw_tconngridpositiony').value = WTW.connectingGrids[connectinggridind].position.y;
						dGet('wtw_tconngridpositionz').value = WTW.connectingGrids[connectinggridind].position.z;
						dGet('wtw_tconngridscalingx').value = WTW.connectingGrids[connectinggridind].scaling.x;
						dGet('wtw_tconngridscalingy').value = WTW.connectingGrids[connectinggridind].scaling.y;
						dGet('wtw_tconngridscalingz').value = WTW.connectingGrids[connectinggridind].scaling.z;
						dGet('wtw_tconngridrotationx').value = WTW.connectingGrids[connectinggridind].rotation.x;
						dGet('wtw_tconngridrotationy').value = WTW.connectingGrids[connectinggridind].rotation.y;
						dGet('wtw_tconngridrotationz').value = WTW.connectingGrids[connectinggridind].rotation.z; 
						dGet('wtw_tconngridalttag').value = WTW.connectingGrids[connectinggridind].alttag.name; 
						WTW.setDDLValue('wtw_taltloadactionzoneid',WTW.connectingGrids[connectinggridind].altloadactionzoneid);
						WTW.setNewConnectingGrid();
					}
					WTW.hideAdminMenu();
					WTW.backToEdit();
					WTW.closeEditPoles();
					break;
				case 1: 
					/* save connecting grid */
					if (WTW.connectingGrids[connectinggridind] != null) {
						WTW.connectingGrids[connectinggridind].position.x = dGet('wtw_tconngridpositionx').value;
						WTW.connectingGrids[connectinggridind].position.y = dGet('wtw_tconngridpositiony').value;
						WTW.connectingGrids[connectinggridind].position.z = dGet('wtw_tconngridpositionz').value;
						WTW.connectingGrids[connectinggridind].scaling.x = dGet('wtw_tconngridscalingx').value;
						WTW.connectingGrids[connectinggridind].scaling.y = dGet('wtw_tconngridscalingy').value;
						WTW.connectingGrids[connectinggridind].scaling.z = dGet('wtw_tconngridscalingz').value;
						WTW.connectingGrids[connectinggridind].rotation.x = dGet('wtw_tconngridrotationx').value;
						WTW.connectingGrids[connectinggridind].rotation.y = dGet('wtw_tconngridrotationy').value;
						WTW.connectingGrids[connectinggridind].rotation.z = dGet('wtw_tconngridrotationz').value;
						WTW.connectingGrids[connectinggridind].alttag.name = dGet('wtw_tconngridalttag').value;
						WTW.connectingGrids[connectinggridind].altloadactionzoneid = dGet('wtw_taltloadactionzoneid').options[dGet('wtw_taltloadactionzoneid').selectedIndex].value;
					}
					var altloadactionzoneid = "";
					if (dGet('wtw_taltloadactionzoneid').selectedIndex > -1) {
						altloadactionzoneid = dGet('wtw_taltloadactionzoneid').options[dGet('wtw_taltloadactionzoneid').selectedIndex].value
					}
					var zrequest = {
						'connectinggridid': dGet("wtw_teditconnectinggridid").value,
						'communityid': communityid,
						'buildingid': buildingid,
						'thingid': thingid,
						'loadactionzoneid': dGet('wtw_teditloadactionzoneid').value,
						'altloadactionzoneid': altloadactionzoneid,
						'parentwebid': dGet('wtw_tparentwebid').value,
						'parentwebtype': dGet('wtw_tparentwebtype').value,
						'childwebid': dGet('wtw_tchildwebid').value,
						'childwebtype': dGet('wtw_tchildwebtype').value,
						'connectinggridind': connectinggridind,
						'positionx': dGet('wtw_tconngridpositionx').value,
						'positiony': dGet('wtw_tconngridpositiony').value,
						'positionz': dGet('wtw_tconngridpositionz').value,
						'scalingx': dGet('wtw_tconngridscalingx').value,
						'scalingy': dGet('wtw_tconngridscalingy').value,
						'scalingz': dGet('wtw_tconngridscalingz').value,
						'rotationx': dGet('wtw_tconngridrotationx').value,
						'rotationy': dGet('wtw_tconngridrotationy').value,
						'rotationz': dGet('wtw_tconngridrotationz').value,
						'alttag': dGet('wtw_tconngridalttag').value,
						'function':'saveconnectinggrid'
					};
					WTW.postAsyncJSON("/core/handlers/connectinggrids.php", zrequest, 
						function(zresponse) {
							zresponse = JSON.parse(zresponse);
							/* note serror would contain errors */
							WTW.hideAdminMenu();
							WTW.backToEdit();
							WTW.closeEditPoles();
						}
					);
					break;
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminconnectinggrids.js-submitConnectingGridsForm=" + ex.message);
	}
}

WTWJS.prototype.addConnectingGrid = async function(zchildwebtype, zchildwebid, zchildwebname) {
	/* add a connecting grid (add 3D Building to a 3D Community, or 3D Thing in a 3D Community or 3D Building) */
	try {
		WTW.hideAdminMenu();
		var zparentwebid = "";
		var zparentwebtype = "";
		var zdist = 100;
		dGet('wtw_tconngridalttag').value = '';
		if (communityid != "") {
			zparentwebid = communityid;
			zparentwebtype = "community";
		} else if (buildingid != "") {
			zparentwebid = buildingid;
			zparentwebtype = "building";
		} else if (thingid != "") {
			zparentwebid = thingid;
			zparentwebtype = "thing";
		}
		if (zparentwebtype != "" && zchildwebid != "") {
			if (zparentwebtype == "community") {
				if (WTW.communities != null) {
					for (var i = 0; i < WTW.communities.length; i++) {
						if (WTW.communities[i] != null) {
							if (communityid == WTW.communities[i].communityinfo.communityid) {
								dGet('wtw_tcommunityname').value = WTW.decode(WTW.communities[i].communityinfo.communityname);
								dGet('wtw_tcommunitydescription').value = WTW.decode(WTW.communities[i].communityinfo.communitydescription);
								dGet('wtw_tcommunityanalyticsid').value = WTW.communities[i].communityinfo.analyticsid;
							}
						}
					}
				}
				dGet('wtw_tbuildingname').value = '';
				dGet('wtw_tbuildingdescription').value = '';
				dGet('wtw_tbuildinganalyticsid').value = '';
			} else {
				if (WTW.buildings != null) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							if (buildingid == WTW.buildings[i].buildinginfo.buildingid) {
								dGet('wtw_tbuildingname').value = WTW.decode(WTW.buildings[i].buildinginfo.buildingname);
								dGet('wtw_tbuildingdescription').value = WTW.decode(WTW.buildings[i].buildinginfo.buildingdescription);
								dGet('wtw_tbuildinganalyticsid').value = WTW.buildings[i].buildinginfo.analyticsid;
							}
						}
					}
				}
				dGet('wtw_tcommunityname').value = "Walk the Web";
				dGet('wtw_tcommunitydescription').value = '';
				dGet('wtw_tcommunityanalyticsid').value = '';
			}
			if (zchildwebtype == "thing") {
				zdist = 50;
			}
			var zconnectinggridid = WTW.getRandomString(16);
			var zconnectinggridind = WTW.getNextCount(WTW.connectingGrids);
			WTW.connectingGrids[zconnectinggridind] = WTW.newConnectingGrid();
			WTW.connectingGrids[zconnectinggridind].parentname = dGet('wtw_tconnectinggridname').value;
			WTW.connectingGrids[zconnectinggridind].moldname = "connectinggrids-" + zconnectinggridind + "-" + zconnectinggridid + "-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value;
			var zloadactionzoneid = "";
			var zparentname = dGet('wtw_tconnectinggridname').value;
			var zpositionx = 0;
			var zpositiony = 0;
			var zpositionz = 0;
			var zrotationx = 0;
			var zrotationy = 0;
			var zrotationz = 0;
			var znewcoords = WTW.getNewCoordinates(zdist);
			zpositionx = znewcoords.positionX;
			zpositiony = znewcoords.positionY;
			zpositionz = znewcoords.positionZ;
			zrotationy = znewcoords.rotationY;
			WTW.getAsyncJSON("/connect/actionzones.php?thingid=" + zchildwebid + "&buildingid=" + zchildwebid + "&communityid=&parentname=" + zparentname + "&connectinggridid=" + zconnectinggridid + "&connectinggridind=" + zconnectinggridind, 
				function(response) {
					var zaddactionzones = JSON.parse(response);
					for (var j = 0; j < zaddactionzones.actionzones.length; j++) {
						var zactionzoneind = WTW.getNextCount(WTW.actionZones);
						WTW.actionZones[zactionzoneind] = zaddactionzones.actionzones[j];
						WTW.actionZones[zactionzoneind].actionzoneind = zactionzoneind;
						WTW.actionZones[zactionzoneind].status = 0;
						WTW.actionZones[zactionzoneind].shown = "0";
						WTW.actionZones[zactionzoneind].connectinggridind = zconnectinggridind;
						WTW.actionZones[zactionzoneind].connectinggridid = zconnectinggridid;
						WTW.actionZones[zactionzoneind].parentname = WTW.connectingGrids[zconnectinggridind].moldname;
						WTW.actionZones[zactionzoneind].moldname = "actionzone-" + zactionzoneind + "-" + WTW.actionZones[zactionzoneind].actionzoneid + "-" + zconnectinggridind + "-" + zconnectinggridid + "-" + WTW.actionZones[zactionzoneind].actionzonetype;
						if (WTW.actionZones[zactionzoneind].actionzonename.indexOf("Extreme") > -1) {
							zloadactionzoneid = WTW.actionZones[zactionzoneind].actionzoneid;
						}
					}
					WTW.connectingGrids[zconnectinggridind].connectinggridid = zconnectinggridid;
					WTW.connectingGrids[zconnectinggridind].connectinggridind = zconnectinggridind;
					WTW.connectingGrids[zconnectinggridind].loadactionzoneid = zloadactionzoneid;
					WTW.connectingGrids[zconnectinggridind].communityinfo.communityid = communityid;
					WTW.connectingGrids[zconnectinggridind].parentconnectinggridid = dGet('wtw_tconnectinggridid').value;
					WTW.connectingGrids[zconnectinggridind].parentconnectinggridind = dGet('wtw_tconnectinggridind').value;
					WTW.connectingGrids[zconnectinggridind].parentwebid = zparentwebid;
					WTW.connectingGrids[zconnectinggridind].parentwebtype = zparentwebtype;
					WTW.connectingGrids[zconnectinggridind].childwebid = zchildwebid;
					WTW.connectingGrids[zconnectinggridind].childwebtype = zchildwebtype;			
					WTW.connectingGrids[zconnectinggridind].position.x = zpositionx;
					WTW.connectingGrids[zconnectinggridind].position.y = zpositiony;
					WTW.connectingGrids[zconnectinggridind].position.z = zpositionz;
					WTW.connectingGrids[zconnectinggridind].scaling.x = "1.00";
					WTW.connectingGrids[zconnectinggridind].scaling.y = "1.00";
					WTW.connectingGrids[zconnectinggridind].scaling.z = "1.00";
					WTW.connectingGrids[zconnectinggridind].rotation.x = "0.00";
					WTW.connectingGrids[zconnectinggridind].rotation.y = zrotationy;
					WTW.connectingGrids[zconnectinggridind].rotation.z = "0.00"; 
					WTW.connectingGrids[zconnectinggridind].alttag.name = dGet('wtw_tconngridalttag').value;
					if (zparentwebtype == "community") {
						WTW.connectingGrids[zconnectinggridind].buildinginfo.buildingid = '';
						WTW.connectingGrids[zconnectinggridind].buildinginfo.buildingname = '';
						WTW.connectingGrids[zconnectinggridind].communityinfo.communityid = zparentwebid;
						WTW.connectingGrids[zconnectinggridind].communityinfo.communityname = WTW.encode(dGet('wtw_tcommunityname').value);
						WTW.connectingGrids[zconnectinggridind].communityinfo.communitydescription = WTW.encode(dGet('wtw_tcommunitydescription').value);
						WTW.connectingGrids[zconnectinggridind].communityinfo.analyticsid = dGet('wtw_tcommunityanalyticsid').value;
					} else {
						WTW.connectingGrids[zconnectinggridind].communityinfo.communityid = '';
						WTW.connectingGrids[zconnectinggridind].communityinfo.communityname = 'Walk the Web';
						WTW.connectingGrids[zconnectinggridind].buildinginfo.buildingid = zparentwebid;
						WTW.connectingGrids[zconnectinggridind].buildinginfo.buildingname = WTW.encode(zchildwebname);
					}
					if (zchildwebtype == "building") {
						WTW.connectingGrids[zconnectinggridind].buildinginfo.buildingid = zchildwebid;
						WTW.connectingGrids[zconnectinggridind].buildinginfo.buildingname = WTW.encode(zchildwebname);
						WTW.connectingGrids[zconnectinggridind].thinginfo.thingid = '';			
						WTW.connectingGrids[zconnectinggridind].thinginfo.thingname = '';
						dGet('wtw_tbuildinganalyticsid').value = "";
					} else {
						WTW.connectingGrids[zconnectinggridind].thinginfo.thingid = zchildwebid;			
						WTW.connectingGrids[zconnectinggridind].thinginfo.thingname = WTW.encode(zchildwebname);
						if (zparentwebtype == "community") {
							WTW.connectingGrids[zconnectinggridind].buildinginfo.buildingid = '';
							WTW.connectingGrids[zconnectinggridind].buildinginfo.buildingname = '';
						} else {
							WTW.connectingGrids[zconnectinggridind].communityinfo.communityid = '';
							WTW.connectingGrids[zconnectinggridind].communityinfo.communityname = 'Walk the Web';
						}
						dGet('wtw_tthinganalyticsid').value = "";
					}
					var zparentmold = scene.getMeshByID(WTW.connectingGrids[zconnectinggridind].parentname);
					if (zparentmold != null) {
						WTW.connectingGrids[zconnectinggridind].shown = "1";
						WTW.connectingGrids[zconnectinggridind].status = 2;
						WTW.addMoldToQueue(WTW.connectingGrids[zconnectinggridind].moldname, WTW.connectingGrids[zconnectinggridind], WTW.connectingGrids[zconnectinggridind].parentname, "texture",null);
					}
					dGet('wtw_teditconnectinggridid').value = zconnectinggridid;
					dGet('wtw_teditconnectinggridind').value = zconnectinggridind;
					dGet('wtw_teditloadactionzoneid').value = zloadactionzoneid;
					dGet('wtw_tparentwebid').value = zparentwebid;
					dGet('wtw_tparentwebtype').value = zparentwebtype;
					dGet('wtw_tchildwebid').value = zchildwebid;
					dGet('wtw_tchildwebtype').value = zchildwebtype;
					dGet('wtw_tconngridpositionx').value = zpositionx;
					dGet('wtw_tconngridpositiony').value = zpositiony;
					dGet('wtw_tconngridpositionz').value = zpositionz;
					dGet('wtw_tconngridscalingx').value = "1.00";
					dGet('wtw_tconngridscalingy').value = "1.00";
					dGet('wtw_tconngridscalingz').value = "1.00";
					dGet('wtw_tconngridrotationx').value = zrotationx;
					dGet('wtw_tconngridrotationy').value = zrotationy;
					dGet('wtw_tconngridrotationz').value = zrotationz;	
					if (WTW.myAvatar != null) {
						WTW.holdPosition = WTW.myAvatar.position.x + "|" + WTW.myAvatar.position.y + .1 + "|" + WTW.myAvatar.position.z;
					} else {
						WTW.holdPosition = "||";
					}
					WTW.checkActionZones();
					WTW.setNewConnectingGrid();
					WTW.openConnectingGridsForm(zconnectinggridind);
					WTW.setWindowSize();
					if (zchildwebtype == "building") {
						WTW.getAsyncJSON("/connect/connectinggrids.php?parentwebid=" + zchildwebid + "&startpositionx=0&startpositiony=0&startpositionz=0&parentname=" + WTW.connectingGrids[zconnectinggridind].moldname, 
							function(zresponse) {
								WTW.loadChildConnectingGrids(JSON.parse(zresponse));
							}
						);
					}
				}
			);
		} 
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminconnectinggrids.js-addConnectingGrid=" + ex.message);
	}
}

WTWJS.prototype.loadChildConnectingGrids = async function(addconnectinggrids) {
	/* load any connecting grids for 3D Things that are in the 3D Building or 3D Community */
	try {
		var parentname = "";
		var found = 0;
		var parentconnectinggridind = -1;
		var parentconnectinggridid = "";
		if (addconnectinggrids.webitems != undefined) {
			for (var i = 0; i < addconnectinggrids.webitems.length; i++) {
				if (addconnectinggrids.webitems[i] != null) {
					if (addconnectinggrids.webitems[i].loadlevel == "1") {
						if (addconnectinggrids.webitems[i].parentwebid == "") {
							parentconnectinggridind = Number(dGet('wtw_teditconnectinggridind').value);
							parentconnectinggridid = dGet('wtw_teditconnectinggridid').value;
						} else if (parentconnectinggridind != -1) {
							var connectinggridind = WTW.getNextCount(WTW.connectingGrids);
							WTW.connectingGrids[connectinggridind] = addconnectinggrids.webitems[i];
							WTW.connectingGrids[connectinggridind].connectinggridind = connectinggridind;
							WTW.connectingGrids[connectinggridind].moldname = "connectinggrids-" + connectinggridind + "-" + WTW.connectingGrids[connectinggridind].connectinggridid + "-" + Number(dGet('wtw_teditconnectinggridind').value) + "-" + dGet('wtw_teditconnectinggridid').value;
							WTW.connectingGrids[connectinggridind].shown = "0";
							WTW.connectingGrids[connectinggridind].status = 2;
							WTW.addMoldToQueue(WTW.connectingGrids[connectinggridind].moldname, WTW.connectingGrids[connectinggridind], WTW.connectingGrids[connectinggridind].parentname, "hidden",null);
							WTW.getAsyncJSON("/connect/actionzone.php?actionzoneid=" + WTW.connectingGrids[connectinggridind].loadactionzoneid + "&parentname=" + WTW.connectingGrids[connectinggridind].moldname + "&connectinggridid=" + WTW.connectingGrids[connectinggridind].connectinggridid + "&connectinggridind=" + connectinggridind, 
								function(response) {
									WTW.loadChildLoadZones(JSON.parse(response));
								}
							);
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminconnectinggrids.js-loadChildConnectingGrids=" + ex.message);
	} 
}


/* the following process is used to change the connecting grid while it is being edited */
/* using the connecting grid form fields for values */

WTWJS.prototype.setNewConnectingGrid = function() {
	/* use the form settings to redraw the connecting grid and child molds and action zones */
	try {	
		var connectinggridind = -1;
		if (WTW.isNumeric(dGet('wtw_teditconnectinggridind').value)) {
			connectinggridind = dGet('wtw_teditconnectinggridind').value;
		}
		if (connectinggridind > -1) {
			var mold = null;
			if (WTW.connectingGrids[connectinggridind].moldname != undefined) {
				mold = scene.getMeshByID(WTW.connectingGrids[connectinggridind].moldname);
			}
			if (mold != null) {
				if (WTW.isNumeric(dGet('wtw_tconngridpositionx').value)) {
					mold.position.x = Number(dGet('wtw_tconngridpositionx').value);
				}
				if (WTW.isNumeric(dGet('wtw_tconngridpositiony').value)) {
					mold.position.y = Number(dGet('wtw_tconngridpositiony').value);
				}
				if (WTW.isNumeric(dGet('wtw_tconngridpositionz').value)) {
					mold.position.z = Number(dGet('wtw_tconngridpositionz').value);
				}

				if (WTW.isNumeric(dGet('wtw_tconngridscalingx').value)) {
					if (Number(dGet('wtw_tconngridscalingx').value) < .01) {
						dGet('wtw_tconngridscalingx').value = ".01";
					}
					mold.scaling.x = Number(dGet('wtw_tconngridscalingx').value);
				}
				if (WTW.isNumeric(dGet('wtw_tconngridscalingy').value)) {
					if (Number(dGet('wtw_tconngridscalingy').value) < .01) {
						dGet('wtw_tconngridscalingy').value = ".01";
					}
					mold.scaling.y = Number(dGet('wtw_tconngridscalingy').value);
				}
				if (WTW.isNumeric(dGet('wtw_tconngridscalingz').value)) {
					if (Number(dGet('wtw_tconngridscalingz').value) < .01) {
						dGet('wtw_tconngridscalingz').value = ".01";
					}
					mold.scaling.z = Number(dGet('wtw_tconngridscalingz').value);
				}

				if (WTW.isNumeric(dGet('wtw_tconngridrotationx').value)) {
					mold.rotation.x = WTW.getRadians(Number(dGet('wtw_tconngridrotationx').value));
				}
				if (WTW.isNumeric(dGet('wtw_tconngridrotationy').value)) {
					mold.rotation.y = WTW.getRadians(Number(dGet('wtw_tconngridrotationy').value));
				}
				if (WTW.isNumeric(dGet('wtw_tconngridrotationz').value)) {
					mold.rotation.z = WTW.getRadians(Number(dGet('wtw_tconngridrotationz').value));
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminconnectinggrids.js-setNewConnectingGrid=" + ex.message);
	}
}

/* the following processes are used to set and save the first 3D Building location in a 3D Community - used in automated 3D Scene creation processes */

WTWJS.prototype.openFirstBuildingForm = async function() {
	/* open the form settings to position, scale, and rotate the first bulding marker */
	try {
		WTW.hide('wtw_adminmenu28b');
		WTW.getAsyncJSON("/connect/community.php?communityid=" + communityid,
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.communities[0].firstbuilding.position.x != undefined) {
					dGet('wtw_tfirstbuildpositionx').value = zresponse.communities[0].firstbuilding.position.x;
				} 
				if (zresponse.communities[0].firstbuilding.position.y != undefined) {
					dGet('wtw_tfirstbuildpositiony').value = zresponse.communities[0].firstbuilding.position.y;
				} 
				if (zresponse.communities[0].firstbuilding.position.z != undefined) {
					dGet('wtw_tfirstbuildpositionz').value = zresponse.communities[0].firstbuilding.position.z;
				} 
				if (zresponse.communities[0].firstbuilding.scaling.x != undefined) {
					dGet('wtw_tfirstbuildscalingx').value = zresponse.communities[0].firstbuilding.scaling.x;
				} 
				if (zresponse.communities[0].firstbuilding.scaling.y != undefined) {
					dGet('wtw_tfirstbuildscalingy').value = zresponse.communities[0].firstbuilding.scaling.y;
				} 
				if (zresponse.communities[0].firstbuilding.scaling.z != undefined) {
					dGet('wtw_tfirstbuildscalingz').value = zresponse.communities[0].firstbuilding.scaling.z;
				} 
				if (zresponse.communities[0].firstbuilding.rotation.x != undefined) {
					dGet('wtw_tfirstbuildrotationx').value = zresponse.communities[0].firstbuilding.rotation.x;
				} 
				if (zresponse.communities[0].firstbuilding.rotation.y != undefined) {
					dGet('wtw_tfirstbuildrotationy').value = zresponse.communities[0].firstbuilding.rotation.y;
				} 
				if (zresponse.communities[0].firstbuilding.rotation.z != undefined) {
					dGet('wtw_tfirstbuildrotationz').value = zresponse.communities[0].firstbuilding.rotation.z;
				} 
				WTW.show('wtw_adminmenu28b');
				WTW.setFirstBuilding();
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminconnectinggrids.js-openFirstBuildingForm=" + ex.message);
	}
}

WTWJS.prototype.setFirstBuilding = function() {
	/* use the form settings to position, scale, and rotate the first bulding marker */
	try {	
		var zmold = null;
		zmold = scene.getMeshByID('firstbuilding-----babylonfile');
		if (zmold != null) {
			if (WTW.isNumeric(dGet('wtw_tfirstbuildpositionx').value)) {
				zmold.position.x = Number(dGet('wtw_tfirstbuildpositionx').value);
			}
			if (WTW.isNumeric(dGet('wtw_tfirstbuildpositiony').value)) {
				zmold.position.y = Number(dGet('wtw_tfirstbuildpositiony').value);
			}
			if (WTW.isNumeric(dGet('wtw_tfirstbuildpositionz').value)) {
				zmold.position.z = Number(dGet('wtw_tfirstbuildpositionz').value);
			}

			if (WTW.isNumeric(dGet('wtw_tfirstbuildscalingx').value)) {
				if (Number(dGet('wtw_tfirstbuildscalingx').value) < .01) {
					dGet('wtw_tfirstbuildscalingx').value = ".01";
				}
				zmold.scaling.x = Number(dGet('wtw_tfirstbuildscalingx').value);
			}
			if (WTW.isNumeric(dGet('wtw_tfirstbuildscalingy').value)) {
				if (Number(dGet('wtw_tfirstbuildscalingy').value) < .01) {
					dGet('wtw_tfirstbuildscalingy').value = ".01";
				}
				zmold.scaling.y = Number(dGet('wtw_tfirstbuildscalingy').value);
			}
			if (WTW.isNumeric(dGet('wtw_tfirstbuildscalingz').value)) {
				if (Number(dGet('wtw_tfirstbuildscalingz').value) < .01) {
					dGet('wtw_tfirstbuildscalingz').value = ".01";
				}
				zmold.scaling.z = Number(dGet('wtw_tfirstbuildscalingz').value);
			}

			if (WTW.isNumeric(dGet('wtw_tfirstbuildrotationx').value)) {
				zmold.rotation.x = WTW.getRadians(Number(dGet('wtw_tfirstbuildrotationx').value));
			}
			if (WTW.isNumeric(dGet('wtw_tfirstbuildrotationy').value)) {
				zmold.rotation.y = WTW.getRadians(Number(dGet('wtw_tfirstbuildrotationy').value));
			}
			if (WTW.isNumeric(dGet('wtw_tfirstbuildrotationz').value)) {
				zmold.rotation.z = WTW.getRadians(Number(dGet('wtw_tfirstbuildrotationz').value));
			}
		} else {
			var zbuildingpositionx = 0;
			var zbuildingpositiony = 0;
			var zbuildingpositionz = 0;
			var zbuildingscalingx = 1;
			var zbuildingscalingy = 1;
			var zbuildingscalingz = 1;
			var zbuildingrotationx = 0;
			var zbuildingrotationy = 0;
			var zbuildingrotationz = 0;
			
			if (WTW.isNumeric(dGet('wtw_tfirstbuildpositionx').value)) {
				zbuildingpositionx = Number(dGet('wtw_tfirstbuildpositionx').value);
			}
			if (WTW.isNumeric(dGet('wtw_tfirstbuildpositiony').value)) {
				zbuildingpositiony = Number(dGet('wtw_tfirstbuildpositiony').value);
			}
			if (WTW.isNumeric(dGet('wtw_tfirstbuildpositionz').value)) {
				zbuildingpositionz = Number(dGet('wtw_tfirstbuildpositionz').value);
			}

			if (WTW.isNumeric(dGet('wtw_tfirstbuildscalingx').value)) {
				if (Number(dGet('wtw_tfirstbuildscalingx').value) < .01) {
					dGet('wtw_tfirstbuildscalingx').value = ".01";
				}
				zbuildingscalingx = Number(dGet('wtw_tfirstbuildscalingx').value);
			}
			if (WTW.isNumeric(dGet('wtw_tfirstbuildscalingy').value)) {
				if (Number(dGet('wtw_tfirstbuildscalingy').value) < .01) {
					dGet('wtw_tfirstbuildscalingy').value = ".01";
				}
				zbuildingscalingy = Number(dGet('wtw_tfirstbuildscalingy').value);
			}
			if (WTW.isNumeric(dGet('wtw_tfirstbuildscalingz').value)) {
				if (Number(dGet('wtw_tfirstbuildscalingz').value) < .01) {
					dGet('wtw_tfirstbuildscalingz').value = ".01";
				}
				zbuildingscalingz = Number(dGet('wtw_tfirstbuildscalingz').value);
			}

			if (WTW.isNumeric(dGet('wtw_tfirstbuildrotationx').value)) {
				zbuildingrotationx = Number(dGet('wtw_tfirstbuildrotationx').value);
			}
			if (WTW.isNumeric(dGet('wtw_tfirstbuildrotationy').value)) {
				zbuildingrotationy = Number(dGet('wtw_tfirstbuildrotationy').value);
			}
			if (WTW.isNumeric(dGet('wtw_tfirstbuildrotationz').value)) {
				zbuildingrotationz = Number(dGet('wtw_tfirstbuildrotationz').value);
			}
			
			var zmolddef = WTW.newMold();
			zmolddef.shape = 'babylonfile';
			zmolddef.covering = "none";
			zmolddef.scaling.x = zbuildingscalingx;
			zmolddef.scaling.y = zbuildingscalingy;
			zmolddef.scaling.z = zbuildingscalingz;
			zmolddef.subdivisions = 12;
			zmolddef.opacity = 1;
			zmolddef.parentname = WTW.mainParent;
			zmolddef.checkcollisions = "0";
			zmolddef.ispickable = "0";
			zmolddef.object.folder = '/content/system/babylon/buildingmarker/';
			zmolddef.object.file = 'buildingmarker.babylon';
			/* create the First Building Placemarker using the mold definition above */
			zmold = WTW.addMold('firstbuilding-----babylonfile', zmolddef, zmolddef.parentname, zmolddef.covering);
			zmold.rotation.x = WTW.getRadians(zbuildingrotationx);
			zmold.rotation.y = WTW.getRadians(zbuildingrotationy);
			zmold.rotation.z = WTW.getRadians(zbuildingrotationz);
			zmold.isPickable = false;
			zmold.checkCollisions = false;
			zmold.position.x = zbuildingpositionx;
			zmold.position.y = zbuildingpositiony;
			zmold.position.z = zbuildingpositionz;			
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminconnectinggrids.js-setFirstBuilding=" + ex.message);
	}
}

WTWJS.prototype.submitFirstBuildingForm = async function(w) {
	/* submit the form settings to position, scale, and rotate the first bulding marker */
	try {	
		switch(w) {
			case 1:
				var zbuildingpositionx = 0;
				var zbuildingpositiony = 0;
				var zbuildingpositionz = 0;
				var zbuildingscalingx = 1;
				var zbuildingscalingy = 1;
				var zbuildingscalingz = 1;
				var zbuildingrotationx = 0;
				var zbuildingrotationy = 0;
				var zbuildingrotationz = 0;
				
				if (WTW.isNumeric(dGet('wtw_tfirstbuildpositionx').value)) {
					zbuildingpositionx = Number(dGet('wtw_tfirstbuildpositionx').value);
				}
				if (WTW.isNumeric(dGet('wtw_tfirstbuildpositiony').value)) {
					zbuildingpositiony = Number(dGet('wtw_tfirstbuildpositiony').value);
				}
				if (WTW.isNumeric(dGet('wtw_tfirstbuildpositionz').value)) {
					zbuildingpositionz = Number(dGet('wtw_tfirstbuildpositionz').value);
				}

				if (WTW.isNumeric(dGet('wtw_tfirstbuildscalingx').value)) {
					if (Number(dGet('wtw_tfirstbuildscalingx').value) < .01) {
						dGet('wtw_tfirstbuildscalingx').value = ".01";
					}
					zbuildingscalingx = Number(dGet('wtw_tfirstbuildscalingx').value);
				}
				if (WTW.isNumeric(dGet('wtw_tfirstbuildscalingy').value)) {
					if (Number(dGet('wtw_tfirstbuildscalingy').value) < .01) {
						dGet('wtw_tfirstbuildscalingy').value = ".01";
					}
					zbuildingscalingy = Number(dGet('wtw_tfirstbuildscalingy').value);
				}
				if (WTW.isNumeric(dGet('wtw_tfirstbuildscalingz').value)) {
					if (Number(dGet('wtw_tfirstbuildscalingz').value) < .01) {
						dGet('wtw_tfirstbuildscalingz').value = ".01";
					}
					zbuildingscalingz = Number(dGet('wtw_tfirstbuildscalingz').value);
				}

				if (WTW.isNumeric(dGet('wtw_tfirstbuildrotationx').value)) {
					zbuildingrotationx = Number(dGet('wtw_tfirstbuildrotationx').value);
				}
				if (WTW.isNumeric(dGet('wtw_tfirstbuildrotationy').value)) {
					zbuildingrotationy = Number(dGet('wtw_tfirstbuildrotationy').value);
				}
				if (WTW.isNumeric(dGet('wtw_tfirstbuildrotationz').value)) {
					zbuildingrotationz = Number(dGet('wtw_tfirstbuildrotationz').value);
				}
				var zrequest = {
					'communityid': communityid,
					'buildingpositionx': zbuildingpositionx,
					'buildingpositiony': zbuildingpositiony,
					'buildingpositionz': zbuildingpositionz,
					'buildingscalingx': zbuildingscalingx,
					'buildingscalingy': zbuildingscalingy,
					'buildingscalingz': zbuildingscalingz,
					'buildingrotationx': zbuildingrotationx,
					'buildingrotationy': zbuildingrotationy,
					'buildingrotationz': zbuildingrotationz,
					'function':'updatefirstbuilding'
				};
				WTW.postAsyncJSON("/core/handlers/communities.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						WTW.disposeClean('firstbuilding-----babylonfile');
						WTW.hideAdminMenu();
						WTW.backToTools();
					}
				);
				break;
			case -1:
				WTW.disposeClean('firstbuilding-----babylonfile');
				WTW.hideAdminMenu();
				WTW.backToTools();
				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminconnectinggrids.js-submitFirstBuildingForm=" + ex.message);
	}
}


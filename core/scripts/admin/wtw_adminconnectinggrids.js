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

WTWJS.prototype.submitConnectingGridsForm = function(w) {
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
						dGet('wtw_commbuildinglist').innerHTML = "";
						if (WTW.connectingGrids.length > 0) {
							for (var i=0; i < WTW.connectingGrids.length; i++) {
								if (WTW.connectingGrids[i] != null) {
									if (WTW.connectingGrids[i].buildinginfo.buildingname != null && WTW.connectingGrids[i].parentwebtype == 'community' && WTW.connectingGrids[i].childwebtype == 'building') {
										dGet('wtw_commbuildinglist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"this.style.backgroundColor='lightgreen';\" onmouseout=\"this.style.backgroundColor='transparent';\">"
										+ "<div style='margin:10px;'>"
										+ "<h2>" + WTW.decode(WTW.connectingGrids[i].buildinginfo.buildingname) + "</h2>"
										+ "<div id='wtw_beditcg" + WTW.connectingGrids[i].connectinggridid + "' onclick=\"WTW.openConnectingGridsForm(" + i + ");\" class='wtw-menulevel2'>Edit</div>"
										+ "<div id='wtw_bdeletecg" + WTW.connectingGrids[i].connectinggridid + "' onclick=\"dGet('wtw_teditconnectinggridid').value='" + WTW.connectingGrids[i].connectinggridid + "';dGet('wtw_teditconnectinggridind').value=" + i + ";WTW.openConfirmation('3');\" class='wtw-menulevel2'>Delete</div>"
										+ "</div></div>";
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
					WTW.postJSON("/core/handlers/connectinggrids.php", zrequest, 
						function(zresponse) {
							zresponse = JSON.parse(zresponse);
							/* note serror would contain errors */
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
					WTW.postJSON("/core/handlers/connectinggrids.php", zrequest, 
						function(zresponse) {
							zresponse = JSON.parse(zresponse);
							/* note serror would contain errors */
						}
					);
					break;
			}
			WTW.hideAdminMenu();
			WTW.backToEdit();
		}
		WTW.closeEditPoles();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminconnectinggrids.js-submitConnectingGridsForm=" + ex.message);
	}
}

WTWJS.prototype.openListConnectingGridsForm = function() {
	/* admin menu related - loads a drop down list of 3D Buildings that can be added to the current 3D Community Scene */
	/* creates a list of 3D Buildings already added to the current 3D Community being edited */
	try {
		WTW.clearDDL('wtw_addcommunitybuildingid');
		dGet('wtw_commbuildinglist').innerHTML = "";
		WTW.getJSON("/connect/buildings.php", 
			function(response) {
				WTW.buildings = JSON.parse(response);
				if (WTW.buildings != null) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							if (WTW.buildings[i].buildinginfo.buildingid != undefined) {
								var option = document.createElement("option");
								option.text = WTW.decode(WTW.buildings[i].buildinginfo.buildingname);
								option.value = WTW.buildings[i].buildinginfo.buildingid;
								dGet('wtw_addcommunitybuildingid').add(option);
							}
						}
					}
				}
			}
		);
		if (WTW.connectingGrids.length > 0) {
			for (var i=0; i < WTW.connectingGrids.length; i++) {
				if (WTW.connectingGrids[i] != null) {
					if (WTW.connectingGrids[i].buildinginfo.buildingname != null && WTW.connectingGrids[i].parentwebtype == 'community' && WTW.connectingGrids[i].childwebtype == 'building') {
						dGet('wtw_commbuildinglist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"this.style.backgroundColor='lightgreen';\" onmouseout=\"this.style.backgroundColor='transparent';\">"
						+ "<div style='margin:10px;'>"
						+ "<h2>" + WTW.decode(WTW.connectingGrids[i].buildinginfo.buildingname) + "</h2>"
						+ "<div id='wtw_beditcg" + WTW.connectingGrids[i].connectinggridid + "' onclick=\"WTW.openConnectingGridsForm(" + i + ");\" class='wtw-menulevel2'>Edit</div>"
						+ "<div id='wtw_bdeletecg" + WTW.connectingGrids[i].connectinggridid + "' onclick=\"dGet('wtw_teditconnectinggridid').value='" + WTW.connectingGrids[i].connectinggridid + "';dGet('wtw_teditconnectinggridind').value=" + i + ";WTW.openConfirmation('3');\" class='wtw-menulevel2'>Delete</div>"
						+ "</div></div>";
					}
				}
			}
		}
		if (dGet('wtw_commbuildinglist').innerHTML == "") {
			WTW.hide('wtw_adminmenu27b');
		} else {
			WTW.show('wtw_adminmenu27b');
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminconnectinggrids.js-openListConnectingGridsForm=" + ex.message);
	}		
}

WTWJS.prototype.addConnectingGrid = function(childwebtype, childwebid, childwebname) {
	/* add a connecting grid (add 3D Building to a 3D Community, or 3D Thing in a 3D Community or 3D Building) */
	try {
		WTW.hideAdminMenu();
		var parentwebid = "";
		var parentwebtype = "";
		var dist = 100;
		dGet('wtw_tconngridalttag').value = '';
		if (communityid != "") {
			parentwebid = communityid;
			parentwebtype = "community";
		} else if (buildingid != "") {
			parentwebid = buildingid;
			parentwebtype = "building";
		} else if (thingid != "") {
			parentwebid = thingid;
			parentwebtype = "thing";
		}
		if (parentwebtype != "" && childwebid != "") {
			if (parentwebtype == "community") {
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
			if (childwebtype == "thing") {
				dist = 50;
			}
			var connectinggridid = WTW.getRandomString(16);
			var connectinggridind = WTW.getNextCount(WTW.connectingGrids);
			WTW.connectingGrids[connectinggridind] = WTW.newConnectingGrid();
			WTW.connectingGrids[connectinggridind].parentname = dGet('wtw_tconnectinggridname').value;
			WTW.connectingGrids[connectinggridind].moldname = "connectinggrids-" + connectinggridind + "-" + connectinggridid + "-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value;
			var loadactionzoneid = "";
			var parentname = dGet('wtw_tconnectinggridname').value;
			var positionx = 0;
			var positiony = 0;
			var positionz = 0;
			var rotationx = 0;
			var rotationy = 0;
			var rotationz = 0;
			var newcoords = WTW.getNewCoordinates(dist);
			positionx = newcoords.positionX;
			positiony = newcoords.positionY;
			positionz = newcoords.positionZ;
			rotationy = newcoords.rotationY;
			WTW.getJSON("/connect/actionzones.php?thingid=" + childwebid + "&buildingid=" + childwebid + "&communityid=&parentname=" + parentname + "&connectinggridid=" + connectinggridid + "&connectinggridind=" + connectinggridind, 
				function(response) {
					var addactionzones = JSON.parse(response);
					for (var j = 0; j < addactionzones.actionzones.length; j++) {
						var actionzoneind = WTW.getNextCount(WTW.actionZones);
						WTW.actionZones[actionzoneind] = addactionzones.actionzones[j];
						WTW.actionZones[actionzoneind].actionzoneind = actionzoneind;
						WTW.actionZones[actionzoneind].status = 0;
						WTW.actionZones[actionzoneind].shown = "0";
						WTW.actionZones[actionzoneind].connectinggridind = connectinggridind;
						WTW.actionZones[actionzoneind].connectinggridid = connectinggridid;
						WTW.actionZones[actionzoneind].parentname = WTW.connectingGrids[connectinggridind].moldname;
						WTW.actionZones[actionzoneind].moldname = "actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + connectinggridind + "-" + connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype;
						if (WTW.actionZones[actionzoneind].actionzonename.indexOf("Extreme") > -1) {
							loadactionzoneid = WTW.actionZones[actionzoneind].actionzoneid;
						}
					}
					WTW.connectingGrids[connectinggridind].connectinggridid = connectinggridid;
					WTW.connectingGrids[connectinggridind].connectinggridind = connectinggridind;
					WTW.connectingGrids[connectinggridind].loadactionzoneid = loadactionzoneid;
					WTW.connectingGrids[connectinggridind].communityinfo.communityid = communityid;
					WTW.connectingGrids[connectinggridind].parentconnectinggridid = dGet('wtw_tconnectinggridid').value;
					WTW.connectingGrids[connectinggridind].parentconnectinggridind = dGet('wtw_tconnectinggridind').value;
					WTW.connectingGrids[connectinggridind].parentwebid = parentwebid;
					WTW.connectingGrids[connectinggridind].parentwebtype = parentwebtype;
					WTW.connectingGrids[connectinggridind].childwebid = childwebid;
					WTW.connectingGrids[connectinggridind].childwebtype = childwebtype;			
					WTW.connectingGrids[connectinggridind].position.x = positionx;
					WTW.connectingGrids[connectinggridind].position.y = positiony;
					WTW.connectingGrids[connectinggridind].position.z = positionz;
					WTW.connectingGrids[connectinggridind].scaling.x = "1.00";
					WTW.connectingGrids[connectinggridind].scaling.y = "1.00";
					WTW.connectingGrids[connectinggridind].scaling.z = "1.00";
					WTW.connectingGrids[connectinggridind].rotation.x = "0.00";
					WTW.connectingGrids[connectinggridind].rotation.y = rotationy;
					WTW.connectingGrids[connectinggridind].rotation.z = "0.00"; 
					WTW.connectingGrids[connectinggridind].alttag.name = dGet('wtw_tconngridalttag').value;
					if (parentwebtype == "community") {
						WTW.connectingGrids[connectinggridind].buildinginfo.buildingid = '';
						WTW.connectingGrids[connectinggridind].buildinginfo.buildingname = '';
						WTW.connectingGrids[connectinggridind].communityinfo.communityid = parentwebid;
						WTW.connectingGrids[connectinggridind].communityinfo.communityname = WTW.encode(dGet('wtw_tcommunityname').value);
						WTW.connectingGrids[connectinggridind].communityinfo.communitydescription = WTW.encode(dGet('wtw_tcommunitydescription').value);
						WTW.connectingGrids[connectinggridind].communityinfo.analyticsid = dGet('wtw_tcommunityanalyticsid').value;
					} else {
						WTW.connectingGrids[connectinggridind].communityinfo.communityid = '';
						WTW.connectingGrids[connectinggridind].communityinfo.communityname = 'Walk the Web';
						WTW.connectingGrids[connectinggridind].buildinginfo.buildingid = parentwebid;
						WTW.connectingGrids[connectinggridind].buildinginfo.buildingname = WTW.encode(childwebname);
					}
					if (childwebtype == "building") {
						WTW.connectingGrids[connectinggridind].buildinginfo.buildingid = childwebid;
						WTW.connectingGrids[connectinggridind].buildinginfo.buildingname = WTW.encode(childwebname);
						WTW.connectingGrids[connectinggridind].thinginfo.thingid = '';			
						WTW.connectingGrids[connectinggridind].thinginfo.thingname = '';
						dGet('wtw_tbuildinganalyticsid').value = "";
					} else {
						WTW.connectingGrids[connectinggridind].thinginfo.thingid = childwebid;			
						WTW.connectingGrids[connectinggridind].thinginfo.thingname = WTW.encode(childwebname);
						if (parentwebtype == "community") {
							WTW.connectingGrids[connectinggridind].buildinginfo.buildingid = '';
							WTW.connectingGrids[connectinggridind].buildinginfo.buildingname = '';
						} else {
							WTW.connectingGrids[connectinggridind].communityinfo.communityid = '';
							WTW.connectingGrids[connectinggridind].communityinfo.communityname = 'Walk the Web';
						}
						dGet('wtw_tthinganalyticsid').value = "";
					}
					var parentmold = scene.getMeshByID(WTW.connectingGrids[connectinggridind].parentname);
					if (parentmold != null) {
						WTW.connectingGrids[connectinggridind].shown = "1";
						WTW.connectingGrids[connectinggridind].status = 2;
						WTW.addMoldToQueue(WTW.connectingGrids[connectinggridind].moldname, WTW.connectingGrids[connectinggridind], WTW.connectingGrids[connectinggridind].parentname, "texture",null);
					}
					dGet('wtw_teditconnectinggridid').value = connectinggridid;
					dGet('wtw_teditconnectinggridind').value = connectinggridind;
					dGet('wtw_teditloadactionzoneid').value = loadactionzoneid;
					dGet('wtw_tparentwebid').value = parentwebid;
					dGet('wtw_tparentwebtype').value = parentwebtype;
					dGet('wtw_tchildwebid').value = childwebid;
					dGet('wtw_tchildwebtype').value = childwebtype;
					dGet('wtw_tconngridpositionx').value = positionx;
					dGet('wtw_tconngridpositiony').value = positiony;
					dGet('wtw_tconngridpositionz').value = positionz;
					dGet('wtw_tconngridscalingx').value = "1.00";
					dGet('wtw_tconngridscalingy').value = "1.00";
					dGet('wtw_tconngridscalingz').value = "1.00";
					dGet('wtw_tconngridrotationx').value = rotationx;
					dGet('wtw_tconngridrotationy').value = rotationy;
					dGet('wtw_tconngridrotationz').value = rotationz;	
					if (childwebtype == "building") {
						WTW.getJSON("/connect/connectinggrids.php?parentwebid=" + childwebid + "&startpositionx=0&startpositiony=0&startpositionz=0&parentname=" + WTW.connectingGrids[connectinggridind].moldname, 
							function(response) {
								WTW.loadBuildingConnectingGrids(JSON.parse(response));
							}
						);
					}
					if (WTW.myAvatar != null) {
						WTW.holdPosition = WTW.myAvatar.position.x + "|" + WTW.myAvatar.position.y + .1 + "|" + WTW.myAvatar.position.z;
					} else {
						WTW.holdPosition = "||";
					}
					WTW.checkActionZones();
					WTW.setNewConnectingGrid();
					WTW.openConnectingGridsForm(connectinggridind);
					WTW.setWindowSize();
				}
			);
		} 
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminconnectinggrids.js-addConnectingGrid=" + ex.message);
	}
}

WTWJS.prototype.loadBuildingConnectingGrids = function(addconnectinggrids) {
	/* load any connecting grids for 3D Things that are in the 3D Building */
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
							WTW.getJSON("/connect/actionzone.php?actionzoneid=" + WTW.connectingGrids[connectinggridind].loadactionzoneid + "&parentname=" + WTW.connectingGrids[connectinggridind].moldname + "&connectinggridid=" + WTW.connectingGrids[connectinggridind].connectinggridid + "&connectinggridind=" + connectinggridind, 
								function(response) {
									WTW.loadBuildingThingsLoadZones(JSON.parse(response));
								}
							);
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminconnectinggrids.js-loadBuildingConnectingGrids=" + ex.message);
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


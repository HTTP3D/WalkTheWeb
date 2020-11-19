/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are used to administer a website in admin mode only */

/* these functions administer 3D Buildings as a whole (mold functions are in wtw_adminmolds.js) */
/* name, alt tags, set analytics, etc... */

WTWJS.prototype.openBuildingForm = async function(w) {
	/* open the 3D Building Information form */
	try {
		dGet('wtw_tbuildingname').focus();
		dGet("wtw_tbuildingid").value = w;
		if (dGet('wtw_tbuildingid').value == '') {
			dGet('wtw_tbuildingid').value = buildingid;
		}
		dGet('wtw_tbuildingname').value = "";
		dGet('wtw_tbuildingdescription').value = "";
		dGet('wtw_tbuildingalttag').value = "";
		WTW.show('wtw_loadingbuildingform');
		WTW.hide('wtw_adminmenu5b');
		await WTW.getAsyncJSON("/connect/buildings.php", 
			function(response) {
				WTW.buildings = JSON.parse(response);
				if (WTW.buildings != null) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							if (WTW.buildings[i].buildinginfo.buildingid != undefined) {
								if (WTW.buildings[i].buildinginfo.buildingid != null) {
									if (dGet("wtw_tbuildingid").value == WTW.buildings[i].buildinginfo.buildingid) {
										dGet('wtw_tbuildingname').value = WTW.decode(WTW.buildings[i].buildinginfo.buildingname);
										dGet('wtw_tbuildingdescription').value = WTW.decode(WTW.buildings[i].buildinginfo.buildingdescription);
										dGet('wtw_tbuildingsnapshotid').value = WTW.buildings[i].buildinginfo.snapshotid;
										dGet('wtw_tbuildinganalyticsid').value = WTW.buildings[i].buildinginfo.analyticsid;
										dGet('wtw_tbuildingalttag').value = WTW.decode(WTW.buildings[i].alttag.name);
									}
								}
							}
						}
					}
					dGet('wtw_showcommunityname').innerHTML = 'Edit 3D Building';
					dGet('wtw_showcommunityname').style.cursor = 'default';
					if (dGet('wtw_tbuildingname').value == '') {
						dGet('wtw_showbuildingname').innerHTML = '3D Building';
						dGet('wtw_showbuildingname').style.cursor = 'default';
					} else {
						dGet('wtw_showbuildingname').innerHTML = WTW.decode(dGet('wtw_tbuildingname').value);
						dGet('wtw_showbuildingname').style.cursor = 'pointer';
					}
					window.setTimeout(function() {
						WTW.hide('wtw_loadingbuildingform');
						WTW.show('wtw_adminmenu5b');
					},500);
				}
				WTW.setWindowSize();
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminbuildings.js-openBuildingForm=" + ex.message);
	}
}	

WTWJS.prototype.loadBuildingForm = async function(w) {
	/* load settings to the 3D Building Information Form */
	try {
		dGet("wtw_tbuildingid").value = w;
		if (dGet('wtw_tbuildingid').value == '') {
			dGet('wtw_tbuildingid').value = buildingid;
		}
		dGet('wtw_tbuildingname').value = "";
		dGet('wtw_tbuildingdescription').value = "";
		dGet('wtw_tbuildingalttag').value = "";
		await WTW.getAsyncJSON("/connect/buildings.php", 
			function(response) {
				WTW.buildings = JSON.parse(response);
				if (WTW.buildings != null) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							if (WTW.buildings[i].buildinginfo.buildingid != undefined) {
								if (WTW.buildings[i].buildinginfo.buildingid != null) {
									if (dGet("wtw_tbuildingid").value == WTW.buildings[i].buildinginfo.buildingid) {
										dGet('wtw_tbuildingname').value = WTW.decode(WTW.buildings[i].buildinginfo.buildingname);
										dGet('wtw_tbuildingdescription').value = WTW.decode(WTW.buildings[i].buildinginfo.buildingdescription);
										dGet('wtw_tbuildingsnapshotid').value = WTW.buildings[i].buildinginfo.snapshotid;
										dGet('wtw_tbuildinganalyticsid').value = WTW.buildings[i].buildinginfo.analyticsid;
										dGet('wtw_tbuildingalttag').value = WTW.decode(WTW.buildings[i].alttag.name);
									}
								}
							}
						}
					}
					dGet('wtw_showcommunityname').innerHTML = 'Edit 3D Building';
					dGet('wtw_showcommunityname').style.cursor = 'default';
					if (dGet('wtw_tbuildingname').value == '') {
						dGet('wtw_showbuildingname').innerHTML = '3D Building';
						dGet('wtw_showbuildingname').style.cursor = 'default';
					} else {
						dGet('wtw_showbuildingname').innerHTML = WTW.decode(dGet('wtw_tbuildingname').value);
						dGet('wtw_showbuildingname').style.cursor = 'pointer';
					}
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminbuildings.js-loadBuildingForm=" + ex.message);
	}
}	

WTWJS.prototype.submitBuildingForm = async function(w) {
	/* submit the 3D Building Information Form */
	try {
		if (dGet('wtw_tbuildingid').value == '') {
			dGet('wtw_tbuildingid').value = buildingid;
		}
		switch (w) {
			case 0:
				/* delete 3D Building */
				/* note that the 3D Building is flagged as deleted in the database and no data is actually deleted */
				var zrequest = {
					'buildingid': buildingid,
					'function':'deletebuilding'
				};
				await WTW.postAsyncJSON("/core/handlers/buildings.php", zrequest, 
					function(zresponse) {
						WTW.redirectParent('/admin.php');
					}
				);
				break;
			case 1: 
				/* save 3D Building settings */
				for (var i = 0; i < WTW.buildings.length; i++) {
					if (WTW.buildings[i] != null) {
						if (WTW.buildings[i].buildinginfo.buildingid == dGet('wtw_tbuildingid').value) {
							WTW.buildings[i].buildinginfo.buildingname = WTW.encode(dGet('wtw_tbuildingname').value);
							WTW.buildings[i].buildinginfo.buildingdescription = WTW.encode(dGet('wtw_tbuildingdescription').value);
							WTW.buildings[i].buildinginfo.analyticsid = dGet('wtw_tbuildinganalyticsid').value;
							WTW.buildings[i].alttag.name = WTW.encode(dGet('wtw_tbuildingalttag').value);
							dGet('wtw_showbuildingname').innerHTML = dGet('wtw_tbuildingname').value;
						}
					}
				}
				var zrequest = {
					'buildingid': buildingid,
					'buildingname':btoa(dGet('wtw_tbuildingname').value),
					'buildingdescription':btoa(dGet('wtw_tbuildingdescription').value),
					'alttag':btoa(dGet('wtw_tbuildingalttag').value),
					'analyticsid':dGet('wtw_tbuildinganalyticsid').value,
					'function':'savebuilding'
				};
				await WTW.postAsyncJSON("/core/handlers/buildings.php", zrequest, 
					function(zresponse) {
					}
				);
				break;
			case -1: 
				/* cancel and reverse any 3D Building settings */
				for (var i = 0; i < WTW.buildings.length; i++) {
					if (WTW.buildings[i] != null) {
					    if (WTW.buildings[i].buildinginfo.buildingid == dGet('wtw_tbuildingid').value) {
							dGet('wtw_tbuildingname').value = WTW.decode(WTW.buildings[i].buildinginfo.buildingname);
							dGet('wtw_tbuildingdescription').value = WTW.decode(WTW.buildings[i].buildinginfo.buildingdescription);
							dGet('wtw_tbuildinganalyticsid').value = WTW.buildings[i].buildinginfo.analyticsid;
							dGet('wtw_tbuildingalttag').value = WTW.decode(WTW.buildings[i].alttag.name);
						}
					}
				}
				break;
		}
		WTW.setMenuBarSelectText();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminbuildings.js-submitBuildingForm=" + ex.message);
	}
}

WTWJS.prototype.copyMyBuilding = async function() {
	/* make a copy of an existing 3D Building (use as backup or as a new 3D Building to edit and use) */
	try {
		dGet('wtw_tbuildingname').value = '';
		await WTW.getAsyncJSON("/connect/buildings.php?userid=" + dGet('wtw_tuserid').value, 
			function(response) {
				WTW.buildings = JSON.parse(response);
				if (WTW.buildings != null) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							if (WTW.buildings[i].buildinginfo.buildingid != undefined) {
								if (WTW.buildings[i].buildinginfo.buildingid != null) {
									if (buildingid == WTW.buildings[i].buildinginfo.buildingid) {
										dGet('wtw_tbuildingname').value = WTW.decode(WTW.buildings[i].buildinginfo.buildingname) + " - Copy";
										var zbuildingname = WTW.encode(dGet('wtw_tbuildingname').value);
										if (zbuildingname != "") {
											WTW.copyBuilding(buildingid, zbuildingname + " - Copy");
										} else {
											WTW.copyBuilding(buildingid, "New 3D Building - Copy");
										}
									}
								}
							}
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminbuildings.js-copyMyBuilding=" + ex.message);
	}
}

WTWJS.prototype.copyBuilding = async function(zcopybuildingid, zbuildingname) {
	/* submit the copy process to the database to duplicate */
	try {
		if (zbuildingname != "" && dGet('wtw_tbuildingname').value == "") {
			dGet('wtw_tbuildingname').value = zbuildingname;
		} else if (dGet('wtw_tbuildingname').value == "") {
			dGet('wtw_tbuildingname').value = "New 3D Building";
		}
		var zrequest = {
			'pastbuildingid': zcopybuildingid,
			'buildingname':btoa(dGet('wtw_tbuildingname').value),
			'buildingdescription':btoa(dGet('wtw_tbuildingdescription').value),
			'function':'savebuilding'
		};
		await WTW.postAsyncJSON("/core/handlers/buildings.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				WTW.copyBuildingComplete(zresponse.buildingid);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminbuildings.js-copyBuilding=" + ex.message);
	}
}

WTWJS.prototype.copyBuildingComplete = function(zbuildingid) {
	/* copy process is complete, load new 3D Building */
	try {
		window.setTimeout(function() {
			if (zbuildingid != "" && zbuildingid != buildingid) {
				window.location.href="/admin.php?buildingid=" + zbuildingid + "&hmenu=5&newbuilding=1";
			}
		}, 2000);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminbuildings.js-copyBuildingComplete=" + ex.message);
	} 
}

WTWJS.prototype.getSelectBuildingsList = async function() {
	/* populates the admin menu for My 3D Buildings to load and edit */
	try {
		WTW.hide('wtw_listbuildings');
		WTW.show('wtw_loadingbuildingid');
		dGet("wtw_listbuildings").innerHTML = "";
		await WTW.getAsyncJSON("/connect/buildings.php", 
			function(response) {
				WTW.buildings = JSON.parse(response);
				if (WTW.buildings != null) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							if (WTW.buildings[i].buildinginfo.buildingid == buildingid) {
								dGet("wtw_listbuildings").innerHTML += "<div id=\"wtw_beditbuilding" + WTW.buildings[i].buildinginfo.buildingid + "\" class='wtw-menulevel2' style='background-color:#2C2CAB;'>" + WTW.decode(WTW.buildings[i].buildinginfo.buildingname) + "</div>\r\n";
							} else {
								dGet("wtw_listbuildings").innerHTML += "<div id=\"wtw_beditbuilding" + WTW.buildings[i].buildinginfo.buildingid + "\" onclick=\"window.location.href='admin.php?buildingid=" + WTW.buildings[i].buildinginfo.buildingid + "';\" class='wtw-menulevel2'>" + WTW.decode(WTW.buildings[i].buildinginfo.buildingname) + "</div>\r\n";
							}
						}
					}
				}
				window.setTimeout(function() {
					WTW.hide('wtw_loadingbuildingid');
					WTW.show('wtw_listbuildings');
				},500);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminbuildings.js-getSelectBuildingsList=" + ex.message);
	}		
}

WTWJS.prototype.editBuilding = function(zbuildingid) {
	/* load a select 3D Building into the editor */
	try {
		WTW.openWebpage(wtw_domainurl + "/admin.php?buildingid=" + zbuildingid);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminbuildings.js-editBuilding=" + ex.message);
	}
}

WTWJS.prototype.openShareBuildingForm = async function() {
	/* share 3D Building is used to send a copy to WalkTheWeb for others to search and download copies of their own */
	try {
		dGet("wtw_tsharebuildtempname").value = "";
		dGet("wtw_tsharebuilddescription").value = "";
		dGet('wtw_tsharebuildtags').value = "";
		WTW.hide('wtw_adminmenu9b');
		WTW.show('wtw_loadingsharebuildingform');
		await WTW.getAsyncJSON("/connect/buildings.php", 
			function(response) {
				WTW.buildings = JSON.parse(response);
				if (WTW.buildings != null) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							if (WTW.buildings[i].buildinginfo.buildingid != undefined) {
								if (WTW.buildings[i].buildinginfo.buildingid != null) {
									if (buildingid == WTW.buildings[i].buildinginfo.buildingid) {
										if (WTW.buildings[i].share.templatename != "") {
											dGet('wtw_tsharebuildtempname').value = WTW.buildings[i].share.templatename;
										} else {
											dGet('wtw_tsharebuildtempname').value = WTW.buildings[i].buildinginfo.buildingname;
										}
										dGet('wtw_tsharebuilddescription').value = WTW.buildings[i].share.description;
										dGet('wtw_tsharebuildtags').value = WTW.buildings[i].share.tags;
										if (WTW.buildings[i].buildinginfo.snapshotpath != "") {
											dGet('wtw_defaultbuildingsnapshot').src = WTW.buildings[i].buildinginfo.snapshotpath;
										} else {
											dGet('wtw_defaultbuildingsnapshot').src = WTW.buildings[i].buildinginfo.snapshotdata;
										}
									}
								}
							}
						}
					}
				}
				if (dGet('wtw_defaultbuildingsnapshot').src.length < 20) {
					WTW.hide('wtw_defaultbuildingsnapshot');
				} else {
					WTW.show('wtw_defaultbuildingsnapshot');
				}
				WTW.hide('wtw_loadingsharebuildingform');
				WTW.show('wtw_adminmenu9b');
				WTW.setWindowSize();
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminbuildings.js-openShareBuildingForm=" + ex.message);
	}
}	

WTWJS.prototype.saveShareBuildingForm = async function() {
	/* process the share 3D Building and Save the settings locally for next Share */
	try {
		var zrequest = {
			'buildingid': buildingid,
			'buildingname': btoa(dGet('wtw_tsharebuildtempname').value),
			'description': btoa(dGet('wtw_tsharebuilddescription').value),
			'tags': btoa(dGet('wtw_tsharebuildtags').value),
			'function':'savebuildingtemplate'
		};
		await WTW.postAsyncJSON("/core/handlers/buildings.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				dGet('wtw_sharehash').value = zresponse.sharehash;
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminbuildings.js-saveShareBuildingForm=" + ex.message);
	}
}

WTWJS.prototype.shareBuildingTemplate = async function() {
	/* after user is sent to confirm form to make sure they want to Share the 3D Building */
	/* this process the share */
	try {
		WTW.closeConfirmation();
		dGet('wtw_bsharebuildingtemp').innerHTML = 'Shared 3D Building';
		var zrequest = {
			'buildingid': buildingid,
			'sharehash': dGet('wtw_sharehash').value,
			'function':'sharebuildingtemplate'
		};
		await WTW.postAsyncJSON("/core/handlers/buildings.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);

				/* note serror would contain errors */
				dGet('wtw_sharebuildingresponse').innerHTML = zresponse.success + " " + zresponse.serror;
				window.setTimeout(function() {
					dGet('wtw_sharebuildingresponse').innerHTML = "";
				}, 5000);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminbuildings.js-shareBuildingTemplate=" + ex.message);
	}
}

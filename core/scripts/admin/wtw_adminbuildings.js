/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are used to administer a website in admin mode only */

/* these functions administer 3D Buildings as a whole (mold functions are in wtw_adminmolds.js) */
/* name, alt tags, set analytics, etc... */

WTWJS.prototype.openBuildingForm = async function(w) {
	/* open the 3D Building Information form */
	try {
		dGet('wtw_tbuildingname').focus();
		dGet('wtw_tbuildingid').value = w;
		if (dGet('wtw_tbuildingid').value == '') {
			dGet('wtw_tbuildingid').value = buildingid;
		}
		dGet('wtw_tbuildingname').value = '';
		dGet('wtw_tbuildingdescription').value = '';
		dGet('wtw_tbuildingalttag').value = '';
		WTW.show('wtw_loadingbuildingform');
		WTW.hide('wtw_adminmenu5b');
		WTW.getAsyncJSON('/connect/buildings.php', 
			function(zresponse) {
				WTW.buildings = JSON.parse(zresponse);
				if (WTW.buildings != null) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							if (WTW.buildings[i].buildinginfo.buildingid != undefined) {
								if (WTW.buildings[i].buildinginfo.buildingid != null) {
									if (dGet('wtw_tbuildingid').value == WTW.buildings[i].buildinginfo.buildingid) {
										dGet('wtw_tinfobuildingversion').disabled = false;
										dGet('wtw_tinfobuildingversiondesc').disabled = false;
										dGet('wtw_tversionid').value = WTW.buildings[i].buildinginfo.versionid;
										dGet('wtw_tinfobuildingversion').value = WTW.buildings[i].buildinginfo.version;
										dGet('wtw_tinfobuildingversiondesc').value = WTW.decode(WTW.buildings[i].buildinginfo.versiondesc);
										dGet('wtw_tbuildingname').value = WTW.decode(WTW.buildings[i].buildinginfo.buildingname);
										dGet('wtw_tinfobuildingversion').value = WTW.buildings[i].buildinginfo.version;
										dGet('wtw_tbuildingdescription').value = WTW.decode(WTW.buildings[i].buildinginfo.buildingdescription);
										dGet('wtw_tbuildingsnapshotid').value = WTW.buildings[i].buildinginfo.snapshotid;
										dGet('wtw_tbuildinganalyticsid').value = WTW.buildings[i].buildinginfo.analyticsid;
										dGet('wtw_tbuildingalttag').value = WTW.decode(WTW.buildings[i].alttag.name);
										dGet('wtw_tinfobuildingversion').disabled = true;
										dGet('wtw_tinfobuildingversiondesc').disabled = true;
									}
								}
							}
						}
					}
					dGet('wtw_showcommunityname').innerHTML = 'Edit 3D Building';
					dGet('wtw_showcommunityname').style.cursor = 'default';
					dGet('wtw_showcommunitynamemobile').innerHTML = 'Edit 3D Building';
					dGet('wtw_showcommunitynamemobile').style.cursor = 'default';
					if (dGet('wtw_tbuildingname').value == '') {
						dGet('wtw_showbuildingname').innerHTML = '3D Building';
						dGet('wtw_showbuildingname').style.cursor = 'default';
						dGet('wtw_showbuildingnamemobile').innerHTML = '3D Building';
						dGet('wtw_showbuildingnamemobile').style.cursor = 'default';
					} else {
						dGet('wtw_showbuildingname').innerHTML = WTW.decode(dGet('wtw_tbuildingname').value);
						dGet('wtw_showbuildingnamemobile').innerHTML = 'Closest 3D Building: <b>' + WTW.decode(dGet('wtw_tbuildingname').value) + '</b>';
						if (WTW.adminView == 1) {
							dGet('wtw_showbuildingname').style.cursor = 'pointer';
							dGet('wtw_showbuildingnamemobile').style.cursor = 'pointer';
						} else {
							dGet('wtw_showbuildingname').style.cursor = 'default';
							dGet('wtw_showbuildingnamemobile').style.cursor = 'default';
						}
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
		WTW.log('core-scripts-admin-wtw_adminbuildings.js-openBuildingForm=' + ex.message);
	}
}	

WTWJS.prototype.loadBuildingForm = async function(w) {
	/* load settings to the 3D Building Information Form */
	try {
		dGet('wtw_tbuildingid').value = w;
		if (dGet('wtw_tbuildingid').value == '') {
			dGet('wtw_tbuildingid').value = buildingid;
		}
		dGet('wtw_tbuildingname').value = '';
		dGet('wtw_tbuildingdescription').value = '';
		dGet('wtw_tbuildingalttag').value = '';
		WTW.getAsyncJSON('/connect/buildings.php', 
			function(zresponse) {
				WTW.buildings = JSON.parse(zresponse);
				if (WTW.buildings != null) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							if (WTW.buildings[i].buildinginfo.buildingid != undefined) {
								if (WTW.buildings[i].buildinginfo.buildingid != null) {
									if (dGet('wtw_tbuildingid').value == WTW.buildings[i].buildinginfo.buildingid) {
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
					dGet('wtw_showcommunitynamemobile').innerHTML = 'Edit 3D Building';
					dGet('wtw_showcommunitynamemobile').style.cursor = 'default';
					if (dGet('wtw_tbuildingname').value == '') {
						dGet('wtw_showbuildingname').innerHTML = '3D Building';
						dGet('wtw_showbuildingname').style.cursor = 'default';
						dGet('wtw_showbuildingnamemobile').innerHTML = '3D Building';
						dGet('wtw_showbuildingnamemobile').style.cursor = 'default';
					} else {
						dGet('wtw_showbuildingname').innerHTML = WTW.decode(dGet('wtw_tbuildingname').value);
						dGet('wtw_showbuildingnamemobile').innerHTML = 'Closest 3D Building: <b>' + WTW.decode(dGet('wtw_tbuildingname').value) + '</b>';
						if (WTW.adminView == 1) {
							dGet('wtw_showbuildingname').style.cursor = 'pointer';
							dGet('wtw_showbuildingnamemobile').style.cursor = 'pointer';
						} else {
							dGet('wtw_showbuildingname').style.cursor = 'default';
							dGet('wtw_showbuildingnamemobile').style.cursor = 'default';
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminbuildings.js-loadBuildingForm=' + ex.message);
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
				WTW.postAsyncJSON('/core/handlers/buildings.php', zrequest, 
					function(zresponse) {
						WTW.redirectParent('/admin.php');
					}
				);
				break;
			case 1: 
				/* save 3D Building settings */
				var zvalidate = 1;
				if (dGet('wtw_tbuildingname').value.trim().length == 0) {
					WTW.showInline('wtw_reqeditbuildingname');
					dGet('wtw_tbuildingname').focus();
					zvalidate = 0;
				} else {
					WTW.hide('wtw_reqeditbuildingname');
				}
				if (zvalidate == 1) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							if (WTW.buildings[i].buildinginfo.buildingid == dGet('wtw_tbuildingid').value) {
								WTW.buildings[i].buildinginfo.buildingname = WTW.encode(dGet('wtw_tbuildingname').value);
								WTW.buildings[i].buildinginfo.buildingdescription = WTW.encode(dGet('wtw_tbuildingdescription').value);

								WTW.buildings[i].buildinginfo.versionid = dGet('wtw_tversionid').value;
								WTW.buildings[i].buildinginfo.version = dGet('wtw_tinfobuildingversion').value;
								WTW.buildings[i].buildinginfo.versiondesc = WTW.encode(dGet('wtw_tinfobuildingversiondesc').value);

								WTW.buildings[i].buildinginfo.analyticsid = dGet('wtw_tbuildinganalyticsid').value;
								WTW.buildings[i].alttag.name = WTW.encode(dGet('wtw_tbuildingalttag').value);
								dGet('wtw_showbuildingname').innerHTML = dGet('wtw_tbuildingname').value;
								dGet('wtw_showbuildingnamemobile').innerHTML = 'Closest 3D Building: <b>' + dGet('wtw_tbuildingname').value + '</b>';
							}
						}
					}
					var zrequest = {
						'buildingid': buildingid,
						'buildingname':btoa(dGet('wtw_tbuildingname').value),
						'buildingdescription':btoa(dGet('wtw_tbuildingdescription').value),
						'alttag':btoa(dGet('wtw_tbuildingalttag').value),
						'versionid':dGet('wtw_tversionid').value,
						'version':dGet('wtw_tinfobuildingversion').value,
						'versiondesc':btoa(dGet('wtw_tinfobuildingversiondesc').value),
						'analyticsid':dGet('wtw_tbuildinganalyticsid').value,
						'function':'savebuilding'
					};
					WTW.postAsyncJSON('/core/handlers/buildings.php', zrequest, 
						function(zresponse) {
							WTW.setMenuBarSelectText();
						}
					);
				}
				break;
			case -1: 
				/* cancel and reverse any 3D Building settings */
				for (var i = 0; i < WTW.buildings.length; i++) {
					if (WTW.buildings[i] != null) {
					    if (WTW.buildings[i].buildinginfo.buildingid == dGet('wtw_tbuildingid').value) {
							dGet('wtw_tinfobuildingversion').value = WTW.buildings[i].buildinginfo.version;
							dGet('wtw_tinfobuildingversiondesc').value = WTW.decode(WTW.buildings[i].buildinginfo.versiondesc);
							dGet('wtw_tbuildingname').value = WTW.decode(WTW.buildings[i].buildinginfo.buildingname);
							dGet('wtw_tbuildingdescription').value = WTW.decode(WTW.buildings[i].buildinginfo.buildingdescription);
							dGet('wtw_tbuildinganalyticsid').value = WTW.buildings[i].buildinginfo.analyticsid;
							dGet('wtw_tbuildingalttag').value = WTW.decode(WTW.buildings[i].alttag.name);
						}
					}
				}
				WTW.setMenuBarSelectText();
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminbuildings.js-submitBuildingForm=' + ex.message);
	}
}

WTWJS.prototype.copyMyBuilding = async function() {
	/* make a copy of an existing 3D Building (use as backup or as a new 3D Building to edit and use) */
	try {
		dGet('wtw_tbuildingname').value = '';
		WTW.getAsyncJSON('/connect/buildings.php?userid=' + dGet('wtw_tuserid').value, 
			function(zresponse) {
				WTW.buildings = JSON.parse(zresponse);
				if (WTW.buildings != null) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							if (WTW.buildings[i].buildinginfo.buildingid != undefined) {
								if (WTW.buildings[i].buildinginfo.buildingid != null) {
									if (buildingid == WTW.buildings[i].buildinginfo.buildingid) {
										dGet('wtw_tbuildingname').value = WTW.decode(WTW.buildings[i].buildinginfo.buildingname) + ' - Copy';
										var zbuildingname = WTW.encode(dGet('wtw_tbuildingname').value);
										if (zbuildingname != '') {
											WTW.copyBuilding(buildingid, zbuildingname + ' - Copy');
										} else {
											WTW.copyBuilding(buildingid, 'New 3D Building - Copy');
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
		WTW.log('core-scripts-admin-wtw_adminbuildings.js-copyMyBuilding=' + ex.message);
	}
}

WTWJS.prototype.copyBuilding = async function(zcopybuildingid, zbuildingname) {
	/* submit the copy process to the database to duplicate */
	try {
		if (zbuildingname != '' && dGet('wtw_tbuildingname').value == '') {
			dGet('wtw_tbuildingname').value = zbuildingname;
		} else if (dGet('wtw_tbuildingname').value == '') {
			dGet('wtw_tbuildingname').value = 'New 3D Building';
		}
		var zrequest = {
			'pastbuildingid': zcopybuildingid,
			'buildingname':btoa(dGet('wtw_tbuildingname').value),
			'buildingdescription':btoa(dGet('wtw_tbuildingdescription').value),
			'function':'savebuilding'
		};
		WTW.postAsyncJSON('/core/handlers/buildings.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				WTW.copyBuildingComplete(zresponse.buildingid);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminbuildings.js-copyBuilding=' + ex.message);
	}
}

WTWJS.prototype.copyBuildingComplete = function(zbuildingid) {
	/* copy process is complete, load new 3D Building */
	try {
		window.setTimeout(function() {
			if (zbuildingid != '' && zbuildingid != buildingid) {
				window.location.href='/admin.php?buildingid=' + zbuildingid + '&hmenu=5&newbuilding=1';
			}
		}, 2000);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminbuildings.js-copyBuildingComplete=' + ex.message);
	} 
}

WTWJS.prototype.setBuildingsListTab = async function(zfilter) {
	/* sets the tabs classes */
	try {
		if (zfilter == undefined) {
			zfilter = 'mine';
		}
		if (zfilter == 'all' && WTW.isUserInRole('admin')) {
			if (dGet('wtw_buildingbuttonmine') != null) {
				dGet('wtw_buildingbuttonmine').className = 'wtw-localbutton wtw-leftradius';
				dGet('wtw_buildingbuttonall').className = 'wtw-localbuttonselected wtw-rightradius';
			}
		} else {
			zfilter = 'mine';
			if (dGet('wtw_buildingbuttonmine') != null) {
				dGet('wtw_buildingbuttonmine').className = 'wtw-localbuttonselected wtw-leftradius';
				dGet('wtw_buildingbuttonall').className = 'wtw-localbutton wtw-rightradius';
			}
		}
		WTW.getSelectBuildingsList(zfilter);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminbuildings.js-setBuildingsListTab=' + ex.message);
	} 
}

WTWJS.prototype.getSelectBuildingsList = async function(zfilter) {
	/* populates the admin menu for My 3D Buildings to load and edit */
	try {
		if (zfilter == undefined) {
			zfilter = 'mine';
		}
		WTW.hide('wtw_listbuildings');
		WTW.show('wtw_loadingbuildingid');
		var zlistbuildings = '';
		if (WTW.isUserInRole('admin') || WTW.isUserInRole('developer') || WTW.isUserInRole('architect') || WTW.isUserInRole('graphic artist')) {
			zlistbuildings = "<div class='wtw-localbuttonleftpad'></div><div id='wtw_buildingbuttonmine' class='wtw-localbutton";
			if (zfilter == 'mine') {
				zlistbuildings += "selected";
			}
			zlistbuildings += " wtw-leftradius' onclick=\"WTW.setBuildingsListTab('mine');\">Mine</div><div class='wtw-localbuttonmiddlepad'> or </div><div id='wtw_buildingbuttonall' class='wtw-localbutton";
			if (zfilter == 'all') {
				zlistbuildings += "selected";
			}
			zlistbuildings += " wtw-rightradius' onclick=\"WTW.setBuildingsListTab('all');\">All</div><div class='wtw-localbuttonrightpad'></div><div class='wtw-clear'></div><div class='wtw-mainmenuvalue'>Admins and Developer Roles can edit <b>All</b> 3D Buildings on this server.</div><hr /><div class='wtw-clear'></div>\r\n";
		} else {
			zlistbuildings = '<br /><br />';
		}
		dGet('wtw_listbuildings').innerHTML = zlistbuildings;
		WTW.getAsyncJSON('/connect/buildings.php?filter=' + zfilter, 
			function(zresponse) {
				WTW.buildings = JSON.parse(zresponse);
				if (WTW.buildings != null) {
					if (WTW.buildings.length > 0) {
						var zversioncheck = [];
						for (var i = 0; i < WTW.buildings.length; i++) {
							if (WTW.buildings[i] != null) {
								var zversion = '';
								zversioncheck[zversioncheck.length] = {
									'webtype': 'building',
									'webname': btoa(WTW.buildings[i].buildinginfo.buildingname),
									'webdesc': btoa(WTW.buildings[i].buildinginfo.buildingdescription),
									'webimage': WTW.buildings[i].buildinginfo.snapshotpath,
									'webid': WTW.buildings[i].buildinginfo.buildingid,
									'versionid': WTW.buildings[i].buildinginfo.versionid,
									'version': WTW.buildings[i].buildinginfo.version
								};
								if (WTW.buildings[i].buildinginfo.version != undefined) {
									if (WTW.buildings[i].buildinginfo.version != '') {
										zversion = ' (v' + WTW.buildings[i].buildinginfo.version + ')';
									}
								}
								if (WTW.buildings[i].buildinginfo.buildingid == buildingid) {
									dGet('wtw_listbuildings').innerHTML += "<div id='wtw_beditweb-" + WTW.buildings[i].buildinginfo.buildingid + "' class='wtw-menulevel2' style='background-color:#2C2CAB;'><div style='float:right;color:#afafaf;'>" + zversion + "</div>" + WTW.decode(WTW.buildings[i].buildinginfo.buildingname) + "</div>\r\n";
								} else {
									dGet('wtw_listbuildings').innerHTML += "<div id='wtw_beditweb-" + WTW.buildings[i].buildinginfo.buildingid + "' onclick=\"window.location.href='admin.php?buildingid=" + WTW.buildings[i].buildinginfo.buildingid + "';\" class='wtw-menulevel2'><div style='float:right;color:#afafaf;'>" + zversion + "</div>" + WTW.decode(WTW.buildings[i].buildinginfo.buildingname) + "</div>\r\n";
								}
							}
						}
						dGet('wtw_listbuildings').innerHTML += "<div class='wtw-normalgray'>Total: <b>" + WTW.buildings.length + "</b> Buildings</div>";
						WTW.pluginsShowListVersionCheck('building', zversioncheck);
					} else {
						dGet('wtw_listbuildings').innerHTML = "<div class='wtw-yellow'>No 3D Buildings Found</div><br />";
						dGet('wtw_listbuildings').innerHTML += "<div id='wtw_adminaddbuilding2' class='wtw-adminsubmenu' onclick=\"WTW.adminMenuItemSelected(dGet('wtw_adminaddbuilding'));\">Add New 3D Building</div>";
					}
				}
				window.setTimeout(function() {
					WTW.hide('wtw_loadingbuildingid');
					WTW.show('wtw_listbuildings');
				},500);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminbuildings.js-getSelectBuildingsList=' + ex.message);
	}		
}

WTWJS.prototype.getAddBuildingList = async function() {
	/* 3D Buildings can be added to 3D Communities */
	/* this function creates a list of 3D Buildings to add */
	try {
		WTW.hide('wtw_buildingbuttonlist');
		WTW.show('wtw_loadingbuildingbuttonlist');
		dGet('wtw_buildingbuttonlist').innerHTML = '';
		WTW.getAsyncJSON('/connect/buildings.php?userid=' + dGet('wtw_tuserid').value, 
			function(zresponse) {
				WTW.buildings = JSON.parse(zresponse);
				if (WTW.buildings != null) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							dGet('wtw_buildingbuttonlist').innerHTML += "<div id='wtw_baddbbuildingmold" + WTW.buildings[i].buildinginfo.buildingid + "' onclick=\"WTW.addConnectingGrid('building', '" + WTW.buildings[i].buildinginfo.buildingid + "', '" + WTW.buildings[i].buildinginfo.buildingname + "');\" class='wtw-menulevel2'>" + WTW.buildings[i].buildinginfo.buildingname + "</div>\r\n";
						}
					}
				}
				WTW.hide('wtw_loadingbuildingbuttonlist');
				WTW.show('wtw_buildingbuttonlist');
				WTW.setWindowSize();
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminbuildings.js-getAddBuildingList=' + ex.message);
	}		
}

WTWJS.prototype.editBuilding = function(zbuildingid) {
	/* load a select 3D Building into the editor */
	try {
		WTW.openWebpage(wtw_domainurl + '/admin.php?buildingid=' + zbuildingid);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminbuildings.js-editBuilding=' + ex.message);
	}
}

WTWJS.prototype.openShareBuildingForm = async function() {
	/* share 3D Building is used to send a copy to WalkTheWeb for others to search and download copies of their own */
	try {
		dGet('wtw_tsharebuildingtempname').value = '';
		dGet('wtw_tsharebuildingdescription').value = '';
		dGet('wtw_tsharebuildingtags').value = '';
		WTW.hide('wtw_adminmenu9b');
		WTW.show('wtw_loadingsharebuildingform');
		WTW.getAsyncJSON('/connect/buildings.php', 
			function(zresponse) {
				WTW.buildings = JSON.parse(zresponse);
				if (WTW.buildings != null) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							if (WTW.buildings[i].buildinginfo.buildingid != undefined) {
								if (WTW.buildings[i].buildinginfo.buildingid != null) {
									if (buildingid == WTW.buildings[i].buildinginfo.buildingid) {
										var zversionid = buildingid;
										var zversion = '1.0.0';
										var zversiondesc = 'Initial Version';
										var zcreateuserid = '';
										if (WTW.buildings[i].buildinginfo.versionid != undefined) {
											if (WTW.buildings[i].buildinginfo.versionid != '') {
												zversionid = WTW.buildings[i].buildinginfo.versionid;
											}
										}
										if (WTW.buildings[i].buildinginfo.version != undefined) {
											if (WTW.buildings[i].buildinginfo.version != '') {
												zversion = WTW.buildings[i].buildinginfo.version;
											}
										}
										if (WTW.buildings[i].buildinginfo.versiondesc != undefined) {
											if (WTW.buildings[i].buildinginfo.versiondesc != '') {
												zversiondesc = WTW.buildings[i].buildinginfo.versiondesc;
											}
										}
										if (WTW.buildings[i].buildinginfo.createuserid != undefined) {
											if (WTW.buildings[i].buildinginfo.createuserid != '') {
												zcreateuserid = WTW.buildings[i].buildinginfo.createuserid;
											}
										}
										if (WTW.buildings[i].share.templatename != '') {
											dGet('wtw_tsharebuildingtempname').value = WTW.buildings[i].share.templatename;
										} else {
											dGet('wtw_tsharebuildingtempname').value = WTW.buildings[i].buildinginfo.buildingname;
										}
										dGet('wtw_tsharebuildingdescription').value = WTW.buildings[i].share.description;
										dGet('wtw_tsharebuildingtags').value = WTW.buildings[i].share.tags;
										if (WTW.buildings[i].buildinginfo.snapshotpath != '') {
											dGet('wtw_defaultbuildingsnapshot').src = WTW.buildings[i].buildinginfo.snapshotpath;
										} else {
											dGet('wtw_defaultbuildingsnapshot').src = WTW.buildings[i].buildinginfo.snapshotdata;
										}
										dGet('wtw_tsharebuildingversion').value = zversion;
										dGet('wtw_tsharebuildingversiondesc').value = zversiondesc;
										dGet('wtw_tsharebuildingoriginal').checked = true;
										dGet('wtw_tsharebuildingversion').disabled = true;
										dGet('wtw_tsharebuildingversiondesc').disabled = true;
										dGet('wtw_tsharebuildingoriginal').onchange = function() { WTW.changeWebVersion('building', zversion, zversiondesc);};
										dGet('wtw_tsharebuildingupdate').onchange = function() { WTW.changeWebVersion('building', zversion, zversiondesc);};
										if (dGet('wtw_tuserid').value == zcreateuserid && zcreateuserid != '') {
											dGet('wtw_tsharebuildingupdate').disabled = false;
										} else {
											dGet('wtw_tsharebuildingupdate').disabled = true;
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
		WTW.log('core-scripts-admin-wtw_adminbuildings.js-openShareBuildingForm=' + ex.message);
	}
}	



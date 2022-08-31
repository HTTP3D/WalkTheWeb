/* All code is Copyright 2013-2022 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
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

WTWJS.prototype.getSelectBuildingsList = async function() {
	/* populates the admin menu for My 3D Buildings to load and edit */
	try {
		WTW.hide('wtw_listbuildings');
		WTW.show('wtw_loadingbuildingid');
		dGet('wtw_listbuildings').innerHTML = '';
		WTW.getAsyncJSON('/connect/buildings.php', 
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
						/* check for updated versions */
						var zrequest2 = {
							'versioncheck': JSON.stringify(zversioncheck),
							'function':'versioncheck'
						};
						WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/versioncheck.php', zrequest2, 
							function(zresponse2) {
								zresponse2 = JSON.parse(zresponse2);
								for (var i = 0; i < zresponse2.length; i++) {
									if (zresponse2[i] != null) {
										var zversionid = zresponse2[i].versionid;
										if (document.getElementById('wtw_beditweb-' + zversionid) != null) {
											var zwebid = zresponse2[i].webid;
											var zupdatewebid = zresponse2[i].updatewebid;
											var zversion = zresponse2[i].version;
											var zoldversion = zresponse2[i].oldversion;
											
											var zdiv = document.createElement('div');
											zdiv.id = 'wtw_beditweb_update-' + zversionid;
											zdiv.className = 'wtw-badgebutton';
											zdiv.innerHTML = 'Update Available (v' + zversion + ')';
											zdiv.onclick = function(zevent) {
												if (zevent == undefined) {
													zevent = window.event;
												}
												WTW.downloadWebVersion(this, zwebid, zupdatewebid, zversionid, zversion, zoldversion, 'building');
												zevent.stopPropagation();
												zevent.preventDefault();
											};
											document.getElementById('wtw_beditweb-' + zversionid).appendChild(zdiv);
										}
									}
								}
							}
						);
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
		WTW.hide('wtw_buildingsbuttonlist');
		WTW.show('wtw_loadingbuildingsbuttonlist');
		dGet('wtw_buildingsbuttonlist').innerHTML = '';
		WTW.getAsyncJSON('/connect/buildings.php?userid=' + dGet('wtw_tuserid').value, 
			function(zresponse) {
				WTW.buildings = JSON.parse(zresponse);
				if (WTW.buildings != null) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							dGet('wtw_buildingsbuttonlist').innerHTML += "<div id='wtw_baddbbuildingmold" + WTW.buildings[i].buildinginfo.buildingid + "' onclick=\"WTW.addConnectingGrid('building', '" + WTW.buildings[i].buildinginfo.buildingid + "', '" + WTW.buildings[i].buildinginfo.buildingname + "');\" class='wtw-menulevel2'>" + WTW.buildings[i].buildinginfo.buildingname + "</div>\r\n";
						}
					}
				}
				WTW.hide('wtw_loadingbuildingsbuttonlist');
				WTW.show('wtw_buildingsbuttonlist');
				WTW.setWindowSize();
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminbuildings.js-getAddBuildingList=' + ex.message);
	}		
}

WTWJS.prototype.showFranchise = function(zobj, zdiv) {
	/* toggle Local vs Internet */
	try {
		switch (zobj.id) {
			case 'wtw_buildingsbuttonlocal':
				dGet('wtw_buildingsbuttonlocal').className = 'wtw-localbuttonselected';
				dGet('wtw_buildingsbuttoninternet').className = 'wtw-localbutton';
				WTW.hide(zdiv);
				WTW.getAddBuildingList();
				break;
			case 'wtw_buildingsbuttoninternet':
				dGet('wtw_buildingsbuttoninternet').className = 'wtw-localbuttonselected';
				dGet('wtw_buildingsbuttonlocal').className = 'wtw-localbutton';
				WTW.show(zdiv);
				dGet('wtw_buildingsbuttonlist').innerHTML = '';
				dGet('wtw_franchisesearch').value = '3d.';
				dGet('wtw_franchisesearch').focus();
				break;
		}
		
		
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminbuildings.js-showFranchise=' + ex.message);
	}		
}

WTWJS.prototype.getFranchiseBuildingList = async function() {
	/* 3D Buildings can be added to 3D Communities */
	/* this function creates a list of 3D Buildings to add */
	try {
		WTW.hide('wtw_buildingsbuttonlist');
		WTW.show('wtw_loadingbuildingsbuttonlist');
		dGet('wtw_buildingsbuttonlist').innerHTML = '';
		var zrequest = {
			'domainname': dGet('wtw_franchisesearch').value,
			'webtype': 'building',
			'function':'getfranchises'
		};
		WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/franchises.php', zrequest,
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zbuildingsbuttonlist = '';
				if (zresponse != null) {
					for (var i = 0; i < zresponse.length; i++) {
						if (zresponse[i] != null) {
							zbuildingsbuttonlist += "<div id='wtw_baddbbuildingmold" + zresponse[i].franchiseid + "' onclick=\"WTW.addConnectingGrid('building', '', '" + zresponse[i].sitename + "', '" + zresponse[i].franchiseid + "', '" + zresponse[i].serverfranchiseid + "', '" + zresponse[i].webalias + "');\" class='wtw-menulevel2'>";
							if (zresponse[i].sitepreview != '') {
								zbuildingsbuttonlist += "<img src='" + zresponse[i].sitepreview + "' style='width:100%;height:auto;' /><br />";
							}
							zbuildingsbuttonlist += "<b>" + zresponse[i].sitename + "</b><br /><div class='wtw-menusmalltext'>" + zresponse[i].sitedescription + "</div></div>\r\n";
						}
					}
				}
				dGet('wtw_buildingsbuttonlist').innerHTML = zbuildingsbuttonlist;
				WTW.hide('wtw_loadingbuildingsbuttonlist');
				WTW.show('wtw_buildingsbuttonlist');
				WTW.setWindowSize();
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminbuildings.js-getFranchiseBuildingList=' + ex.message);
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

WTWJS.prototype.saveShareBuildingForm = async function() {
	/* process the share 3D Building and Save the settings locally for next Share */
	try {
		dGet('wtw_tsharebuildingversion').disabled = false;
		dGet('wtw_tsharebuildingversiondesc').disabled = false;
		var zrequest = {
			'buildingid': buildingid,
			'buildingname': btoa(dGet('wtw_tsharebuildingtempname').value),
			'description': btoa(dGet('wtw_tsharebuildingdescription').value),
			'tags': btoa(dGet('wtw_tsharebuildingtags').value),
			'version' : dGet('wtw_tsharebuildingversion').value,
			'versiondesc' : btoa(dGet('wtw_tsharebuildingversiondesc').value),
			'function':'savebuildingtemplate'
		};
		WTW.postAsyncJSON('/core/handlers/buildings.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				dGet('wtw_sharehash').value = zresponse.sharehash;
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminbuildings.js-saveShareBuildingForm=' + ex.message);
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
		WTW.postAsyncJSON('/core/handlers/buildings.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);

				/* note serror would contain errors */
				dGet('wtw_sharebuildingresponse').innerHTML = zresponse.success + ' ' + zresponse.serror;
				window.setTimeout(function() {
					dGet('wtw_sharebuildingresponse').innerHTML = '';
				}, 5000);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminbuildings.js-shareBuildingTemplate=' + ex.message);
	}
}

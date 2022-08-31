/* All code is Copyright 2013-2022 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are used to administer a website in admin mode only */

/* these functions administer 3D Things as a whole (mold functions are in wtw_adminmolds.js) */
/* name, alt tags, set analytics, etc... */

WTWJS.prototype.openThingForm = async function(zthingid) {
	/* open the 3D Thing Information form */
	try {
		WTW.hide('wtw_reqeditthingname');
		dGet('wtw_tthingname').focus();
		dGet('wtw_tthingind').value = '-1';
		dGet('wtw_tthingname').value = '';
		dGet('wtw_tthingdescription').value = '';
		WTW.hide('wtw_adminmenu35b');
		WTW.show('wtw_loadingthingform');
		dGet('wtw_tthingalttag').value = '';
		WTW.getAsyncJSON('/connect/things.php?userid=' + dGet('wtw_tuserid').value, 
			function(zresponse) {
				WTW.things = JSON.parse(zresponse);
				if (WTW.things != null) {
					for (var i = 0; i < WTW.things.length; i++) {
						if (WTW.things[i] != null) {
							if (WTW.things[i].thinginfo.thingid != undefined) {
								if (WTW.things[i].thinginfo.thingid != null) {
									if (zthingid == WTW.things[i].thinginfo.thingid) {
										dGet('wtw_tinfothingversion').disabled = false;
										dGet('wtw_tinfothingversiondesc').disabled = false;
										dGet('wtw_tthingind').value = i;
										dGet('wtw_tthingname').value = WTW.decode(WTW.things[i].thinginfo.thingname);
										dGet('wtw_tversionid').value = WTW.things[i].thinginfo.versionid;
										dGet('wtw_tinfothingversion').value = WTW.things[i].thinginfo.version;
										dGet('wtw_tinfothingversiondesc').value = WTW.decode(WTW.things[i].thinginfo.versiondesc);
										dGet('wtw_tthingdescription').value = WTW.decode(WTW.things[i].thinginfo.thingdescription);
										dGet('wtw_tthingsnapshotid').value = WTW.things[i].thinginfo.snapshot;
										dGet('wtw_tthingalttag').value = WTW.decode(WTW.things[i].alttag.name);
										dGet('wtw_tinfothingversion').disabled = true;
										dGet('wtw_tinfothingversiondesc').disabled = true;
									}
								}
							}
						}
					}
					dGet('wtw_showcommunityname').innerHTML = 'Edit 3D Thing';
					dGet('wtw_showcommunityname').style.cursor = 'default';
					if (dGet('wtw_tthingname').value == '') {
						dGet('wtw_showbuildingname').innerHTML = '3D Thing';
						dGet('wtw_showbuildingname').style.cursor = 'default';
					} else {
						dGet('wtw_showbuildingname').innerHTML = WTW.decode(dGet('wtw_tthingname').value);
						dGet('wtw_showbuildingname').style.cursor = 'pointer';
					}
					window.setTimeout(function() {
						WTW.hide('wtw_loadingthingform');
						WTW.show('wtw_adminmenu35b');
					},500);
				}
				WTW.setWindowSize();
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminthings.js-openThingForm=' + ex.message);
	}
}

WTWJS.prototype.loadThingForm = async function(zthingid) {
	/* load settings to the 3D Thing Information Form */
	try {
		dGet('wtw_tthingind').value = '-1';
		dGet('wtw_tthingname').value = '';
		dGet('wtw_tthingdescription').value = '';
		dGet('wtw_tthingalttag').value = '';
		WTW.getAsyncJSON('/connect/things.php?userid=' + dGet('wtw_tuserid').value, 
			function(zresponse) {
				WTW.things = JSON.parse(zresponse);
				if (WTW.things != null) {
					for (var i = 0; i < WTW.things.length; i++) {
						if (WTW.things[i] != null) {
							if (WTW.things[i].thinginfo.thingid != undefined) {
								if (WTW.things[i].thinginfo.thingid != null) {
									if (zthingid == WTW.things[i].thinginfo.thingid) {
										dGet('wtw_tthingind').value = i;
										dGet('wtw_tthingname').value = WTW.decode(WTW.things[i].thinginfo.thingname);
										dGet('wtw_tthingdescription').value = WTW.decode(WTW.things[i].thinginfo.thingdescription);
										dGet('wtw_tversionid').value = WTW.things[i].thinginfo.versionid;
										dGet('wtw_tinfothingversion').value = WTW.things[i].thinginfo.version;
										dGet('wtw_tinfothingversiondesc').value = WTW.decode(WTW.things[i].thinginfo.versiondesc);
										dGet('wtw_tthingsnapshotid').value = WTW.things[i].thinginfo.snapshot;
										dGet('wtw_tthinganalyticsid').value = WTW.things[i].thinginfo.analytics;
										dGet('wtw_tthingalttag').value = WTW.decode(WTW.things[i].alttag.name);
									}
								}
							}
						}
					}
					dGet('wtw_showcommunityname').innerHTML = 'Edit 3D Thing';
					dGet('wtw_showcommunityname').style.cursor = 'default';
					if (dGet('wtw_tthingname').value == '') {
						dGet('wtw_showbuildingname').innerHTML = '3D Thing';
						dGet('wtw_showbuildingname').style.cursor = 'default';
					} else {
						dGet('wtw_showbuildingname').innerHTML = WTW.decode(dGet('wtw_tthingname').value);
						dGet('wtw_showbuildingname').style.cursor = 'pointer';
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminthings.js-loadThingForm=' + ex.message);
	}
}

WTWJS.prototype.submitthingForm = async function(w) {
	/* submit the 3D Thing Information Form */
	try {
		switch (w) {
			case 0:
				/* delete 3D Thing */
				/* note that the 3D Thing is flagged as deleted in the database and no data is actually deleted */
				var zrequest = {
					'thingid': thingid,
					'function':'deletething'
				};
				WTW.postAsyncJSON('/core/handlers/things.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						WTW.redirectParent('/admin.php');
					}
				);
				break;
			case 1: 
				/* save 3D Thing settings */
				var zvalidate = 1;
				if (dGet('wtw_tthingname').value.trim().length == 0) {
					WTW.showInline('wtw_reqeditthingname');
					dGet('wtw_tthingname').focus();
					zvalidate = 0;
				} else {
					WTW.hide('wtw_reqeditthingname');
				}
				if (zvalidate == 1) {
					for (var i = 0; i < WTW.things.length; i++) {
						if (WTW.things[i] != null) {
						    if (WTW.things[i].thinginfo.thingid == dGet('wtw_tthingid').value) {
								WTW.things[i].thinginfo.thingname = WTW.encode(dGet('wtw_tthingname').value);
								WTW.things[i].thinginfo.thingdescription = WTW.encode(dGet('wtw_tthingdescription').value);
								WTW.things[i].thinginfo.versionid = dGet('wtw_tversionid').value;
								WTW.things[i].thinginfo.version = dGet('wtw_tinfothingversion').value;
								WTW.things[i].thinginfo.versiondesc = WTW.encode(dGet('wtw_tinfothingversiondesc').value);
								WTW.things[i].thinginfo.analytics = dGet('wtw_tthinganalyticsid').value;
								dGet('wtw_showbuildingname').innerHTML = dGet('wtw_tthingname').value;
							}
						}
					}
					var zrequest = {
						'thingid': thingid,
						'pastthingid': '',
						'thingname': btoa(dGet('wtw_tthingname').value),
						'thingdescription': btoa(dGet('wtw_tthingdescription').value),
						'analyticsid': dGet('wtw_tthinganalyticsid').value,
						'versionid': dGet('wtw_tversionid').value,
						'version': dGet('wtw_tinfothingversion').value,
						'versiondesc': btoa(dGet('wtw_tinfothingversiondesc').value),
						'alttag': btoa(dGet('wtw_tthingalttag').value),
						'function':'savething'
					};
					WTW.postAsyncJSON('/core/handlers/things.php', zrequest, 
						function(zresponse) {
							zresponse = JSON.parse(zresponse);
							/* note serror would contain errors */
							/* return to previous menu */
							WTW.hideAdminMenu();
							WTW.backToTools();
							WTW.setMenuBarSelectText();
						}
					);
				}
				break;
			case -1: 
				/* cancel and reverse any 3D Thing settings */
				for (var i = 0; i < WTW.things.length; i++) {
					if (WTW.things[i] != null) {
					    if (WTW.things[i].thinginfo.thingid == dGet('wtw_tthingid').value) {
							dGet('wtw_tthingname').value = WTW.decode(WTW.things[i].thinginfo.thingname);
							dGet('wtw_tthingdescription').value = WTW.decode(WTW.things[i].thinginfo.thingdescription);
							dGet('wtw_tversionid').value = WTW.things[i].thinginfo.versionid;
							dGet('wtw_tinfothingversion').value = WTW.things[i].thinginfo.version;
							dGet('wtw_tinfothingversiondesc').value = WTW.decode(WTW.things[i].thinginfo.versiondesc);
							dGet('wtw_tthinganalyticsid').value = WTW.things[i].thinginfo.analytics;
							dGet('wtw_tthingalttag').value = WTW.decode(WTW.things[i].alttag.name);
						}
					}
				}
				/* return to previous menu */
				WTW.hideAdminMenu();
				WTW.backToTools();
				WTW.setMenuBarSelectText();
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminthings.js-submitthingForm=' + ex.message);
	}
}

WTWJS.prototype.copyMyThing = async function() {
	/* make a copy of an existing 3D Thing (use as backup or as a new 3D Thing to edit and use) */
	try {
		dGet('wtw_tthingind').value = '-1';
		dGet('wtw_tthingname').value = '';
		WTW.getAsyncJSON('/connect/things.php?userid=' + dGet('wtw_tuserid').value, 
			function(zresponse) {
				WTW.things = JSON.parse(zresponse);
				if (WTW.things != null) {
					for (var i = 0; i < WTW.things.length; i++) {
						if (WTW.things[i] != null) {
							if (WTW.things[i].thinginfo.thingid != undefined) {
								if (WTW.things[i].thinginfo.thingid != null) {
									if (thingid == WTW.things[i].thinginfo.thingid) {
										dGet('wtw_tthingname').value = WTW.decode(WTW.things[i].thinginfo.thingname) + ' - Copy';
										var zthingname = WTW.encode(dGet('wtw_tthingname').value);
										if (zthingname != '') {
											WTW.copyThing(thingid, zthingname + ' - Copy');
										} else {
											WTW.copyThing(thingid, 'New 3D Thing - Copy');
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
		WTW.log('core-scripts-admin-wtw_adminthings.js-copyMyThing=' + ex.message);
	}
}

WTWJS.prototype.copyThing = async function(zcopythingid, zthingname) {
	/* submit the copy process to the database to duplicate */
	try {
		if (zthingname != '' && dGet('wtw_tthingname').value == '') {
			dGet('wtw_tthingname').value = zthingname;
		} else if (dGet('wtw_tthingname').value == '') {
			dGet('wtw_tthingname').value = 'New 3D Thing';
		}
		var zrequest = {
			'thingid': '',
			'pastthingid': zcopythingid,
			'thingname': btoa(dGet('wtw_tthingname').value),
			'thingdescription': btoa(dGet('wtw_tthingdescription').value),
			'analyticsid': '',
			'alttag': btoa(dGet('wtw_tthingalttag').value),
			'function':'savething'
		};
		WTW.postAsyncJSON('/core/handlers/things.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.copyThingComplete(zresponse.thingid);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminthings.js-copyThing=' + ex.message);
	}
}

WTWJS.prototype.copyThingComplete = function(zthingid) {
	/* copy process is complete, load new 3D Thing */
	try {
		window.setTimeout(function() {
			if (zthingid != '' && zthingid != thingid) {
				window.location.href='/admin.php?thingid=' + zthingid + '&hmenu=35&newthing=1';
			}
		}, 2000);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminthings.js-copyThingComplete=' + ex.message);
	} 
}

WTWJS.prototype.getSelectThingsList = async function() {
	/* populates the admin menu for My 3D Things to load and edit */
	try {
		WTW.hide('wtw_listthings');
		WTW.show('wtw_loadingthingid');
		dGet('wtw_listthings').innerHTML = '';
		WTW.getAsyncJSON('/connect/things.php?userid=' + dGet('wtw_tuserid').value, 
			function(zresponse) {
				WTW.things = JSON.parse(zresponse);
				if (WTW.things != null) {
					if (WTW.things.length > 0) {
						var zversioncheck = [];
						for (var i = 0; i < WTW.things.length; i++) {
							if (WTW.things[i] != null) {
								var zversion = '';
								zversioncheck[zversioncheck.length] = {
									'webtype': 'thing',
									'webname': btoa(WTW.things[i].thinginfo.thingname),
									'webdesc': btoa(WTW.things[i].thinginfo.thingdescription),
									'webimage': WTW.things[i].thinginfo.snapshotpath,
									'webid': WTW.things[i].thinginfo.thingid,
									'versionid': WTW.things[i].thinginfo.versionid,
									'version': WTW.things[i].thinginfo.version
								};
								if (WTW.things[i].thinginfo.version != undefined) {
									if (WTW.things[i].thinginfo.version != '') {
										zversion = ' (v' + WTW.things[i].thinginfo.version + ')';
									}
								}
								if (WTW.things[i].thinginfo.thingid == thingid) {
									dGet('wtw_listthings').innerHTML += "<div id='wtw_beditweb-" + WTW.things[i].thinginfo.thingid + "' class='wtw-menulevel2' style='background-color:#2C2CAB;'><div style='float:right;color:#afafaf;'>" + zversion + "</div>" + WTW.decode(WTW.things[i].thinginfo.thingname) + "</div>\r\n";
								} else {
									dGet("wtw_listthings").innerHTML += "<div id='wtw_beditweb-" + WTW.things[i].thinginfo.thingid + "' onclick=\"window.location.href='admin.php?thingid=" + WTW.things[i].thinginfo.thingid + "';\" class='wtw-menulevel2'><div style='float:right;color:#afafaf;'>" + zversion + "</div>" + WTW.decode(WTW.things[i].thinginfo.thingname) + "</div>\r\n";
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
										var zwebid = zresponse2[i].webid;
										var zversionid = zresponse2[i].versionid;
										if (document.getElementById('wtw_beditweb-' + zwebid) != null) {
											var zupdatewebid = zresponse2[i].updatewebid;
											var zversion = zresponse2[i].version;
											var zoldversion = zresponse2[i].oldversion;
											
											var zdiv = document.createElement('div');
											zdiv.id = 'wtw_beditweb_update-' + zwebid;
											zdiv.className = 'wtw-badgebutton';
											zdiv.innerHTML = 'Update Available (v' + zversion + ')';
											zdiv.onclick = function(zevent) {
												if (zevent == undefined) {
													zevent = window.event;
												}
												WTW.downloadWebVersion(this, zwebid, zupdatewebid, zversionid, zversion, zoldversion, 'thing');
												zevent.stopPropagation();
												zevent.preventDefault();
											};
											document.getElementById('wtw_beditweb-' + zwebid).appendChild(zdiv);
										}
									}
								}
							}
						);
					} else {
						dGet('wtw_listthings').innerHTML = "<div class='wtw-yellow'>No 3D Things Found</div><br />";
						dGet("wtw_listthings").innerHTML += "<div id='wtw_adminaddthing2' class='wtw-adminsubmenu' onclick=\"WTW.adminMenuItemSelected(dGet('wtw_adminaddthing'));\">Add New 3D Thing</div>";
					}
				}
				window.setTimeout(function() {
					WTW.hide('wtw_loadingthingid');
					WTW.show('wtw_listthings');
				},500);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminthings.js-getSelectThingsList=' + ex.message);
	}		
}

WTWJS.prototype.getThingMoldList = async function() {
	/* 3D Things can be added to 3D Communities and 3D Buildings */
	/* this function creates a list of 3D Things to add */
	try {
		WTW.hide('wtw_thingmoldsbuttonlist');
		WTW.show('wtw_loadingthingmoldsbuttonlist');
		dGet('wtw_thingmoldsbuttonlist').innerHTML = '';
		WTW.getAsyncJSON('/connect/things.php?userid=' + dGet('wtw_tuserid').value, 
			function(zresponse) {
				WTW.things = JSON.parse(zresponse);
				if (WTW.things != null) {
					for (var i = 0; i < WTW.things.length; i++) {
						if (WTW.things[i] != null) {
							dGet("wtw_thingmoldsbuttonlist").innerHTML += "<div id='wtw_baddbthingmold" + WTW.things[i].thinginfo.thingid + "' onclick=\"WTW.addConnectingGrid('thing', '" + WTW.things[i].thinginfo.thingid + "', '" + WTW.things[i].thinginfo.thingname + "');\" class='wtw-menulevel2'>" + WTW.things[i].thinginfo.thingname + "</div>\r\n";
						}
					}
				}
				WTW.hide('wtw_loadingthingmoldsbuttonlist');
				WTW.show('wtw_thingmoldsbuttonlist');
				WTW.setWindowSize();
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminthings.js-getThingMoldList=' + ex.message);
	}		
}

WTWJS.prototype.editThing = function(zthingid) {
	/* load a select 3D Thing into the editor */
	try {
		WTW.openWebpage(wtw_domainurl + '/admin.php?thingid=' + zthingid + '&hmenu=35');
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminthings.js-editThing=' + ex.message);
	}
}

WTWJS.prototype.thingSearchShowThing = function(newthingid) {
	/* after you search and select a 3D Thing, this loads the 3D Thing in the editor */
	try {
		window.location.href='/admin.php?thingid=' + newthingid + '&hmenu=35&newthing=1';
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminthings.js-thingSearchShowThing=' + ex.message);
	}
}

WTWJS.prototype.openShareThingForm = async function() {
	/* share 3D Thing is used to send a copy to WalkTheWeb for others to search and download copies of their own */
	try {
		dGet('wtw_tsharethingtempname').value = '';
		dGet('wtw_tsharethingdescription').value = '';
		dGet('wtw_tsharethingtags').value = '';
		WTW.hide('wtw_adminmenu39b');
		WTW.show('wtw_loadingsharethingform');
		WTW.getAsyncJSON('/connect/things.php?userid=' + dGet('wtw_tuserid').value, 
			function(zresponse) {
				WTW.things = JSON.parse(zresponse);
				if (WTW.things != null) {
					for (var i = 0; i < WTW.things.length; i++) {
						if (WTW.things[i] != null) {
							if (WTW.things[i].thinginfo.thingid != undefined) {
								if (WTW.things[i].thinginfo.thingid != null) {
									if (thingid == WTW.things[i].thinginfo.thingid) {
										var zversionid = thingid;
										var zversion = '1.0.0';
										var zversiondesc = 'Initial Version';
										var zcreateuserid = '';
										if (WTW.things[i].thinginfo.versionid != undefined) {
											if (WTW.things[i].thinginfo.versionid != '') {
												zversionid = WTW.things[i].thinginfo.versionid;
											}
										}
										if (WTW.things[i].thinginfo.version != undefined) {
											if (WTW.things[i].thinginfo.version != '') {
												zversion = WTW.things[i].thinginfo.version;
											}
										}
										if (WTW.things[i].thinginfo.versiondesc != undefined) {
											if (WTW.things[i].thinginfo.versiondesc != '') {
												zversiondesc = WTW.things[i].thinginfo.versiondesc;
											}
										}
										if (WTW.things[i].thinginfo.createuserid != undefined) {
											if (WTW.things[i].thinginfo.createuserid != '') {
												zcreateuserid = WTW.things[i].thinginfo.createuserid;
											}
										}
										if (WTW.things[i].share.templatename != '') {
											dGet('wtw_tsharethingtempname').value = WTW.things[i].share.templatename;
										} else {
											dGet('wtw_tsharethingtempname').value = WTW.things[i].thinginfo.thingname;
										}
										dGet('wtw_tsharethingdescription').value = WTW.things[i].share.description;
										dGet('wtw_tsharethingtags').value = WTW.things[i].share.tags;
										if (WTW.things[i].thinginfo.snapshotpath != '') {
											dGet('wtw_defaultthingsnapshot').src = WTW.things[i].thinginfo.snapshotpath;
										} else {
											dGet('wtw_defaultthingsnapshot').src = WTW.things[i].thinginfo.snapshotdata;
										}
										dGet('wtw_tsharethingversion').value = zversion;
										dGet('wtw_tsharethingversiondesc').value = zversiondesc;
										dGet('wtw_tsharethingoriginal').checked = true;
										dGet('wtw_tsharethingversion').disabled = true;
										dGet('wtw_tsharethingversiondesc').disabled = true;
										dGet('wtw_tsharethingoriginal').onchange = function() { WTW.changeWebVersion('thing', zversion, zversiondesc);};
										dGet('wtw_tsharethingupdate').onchange = function() { WTW.changeWebVersion('thing', zversion, zversiondesc);};
										if (dGet('wtw_tuserid').value == zcreateuserid && zcreateuserid != '') {
											dGet('wtw_tsharethingupdate').disabled = false;
										} else {
											dGet('wtw_tsharethingupdate').disabled = true;
										}
									}
								}
							}
						}
					}
				}
				if (dGet('wtw_tsharethingtempname').value == '' && dGet('wtw_tthingname').value != '') {
					dGet('wtw_tsharethingtempname').value = dGet('wtw_tthingname').value;
				}
				if (dGet('wtw_defaultthingsnapshot').src.length < 20) {
					WTW.hide('wtw_defaultthingsnapshot');
				} else {
					WTW.show('wtw_defaultthingsnapshot');
				}
				window.setTimeout(function() {
					WTW.hide('wtw_loadingsharethingform');
					WTW.show('wtw_adminmenu39b');
					WTW.setWindowSize();
				},500);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminthings.js-openShareThingForm=' + ex.message);
	}
}

WTWJS.prototype.saveShareThingForm = async function() {
	/* process the share 3D Thing and Save the settings locally for next Share */
	try {
		dGet('wtw_tsharethingversion').disabled = false;
		dGet('wtw_tsharethingversiondesc').disabled = false;
		var zrequest = {
			'thingid': thingid,
			'pastthingid': '',
			'thingname': btoa(dGet('wtw_tsharethingtempname').value),
			'description': btoa(dGet('wtw_tsharethingdescription').value),
			'tags': btoa(dGet('wtw_tsharethingtags').value),
			'version' : dGet('wtw_tsharethingversion').value,
			'versiondesc' : btoa(dGet('wtw_tsharethingversiondesc').value),
			'function':'savethingtemplate'
		};
		WTW.postAsyncJSON('/core/handlers/things.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				dGet('wtw_sharehash').value = zresponse.sharehash;
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminthings.js-saveShareThingForm=' + ex.message);
	}
}

WTWJS.prototype.shareThingTemplate = async function() {
	/* after user is sent to confirm form to make sure they want to Share the 3D Thing */
	/* this will process the share */
	try {
		WTW.closeConfirmation();
		dGet('wtw_bsharethingtemplate').value = 'Shared 3D Thing';
		var zrequest = {
			'thingid': thingid,
			'sharehash': dGet('wtw_sharehash').value,
			'function':'sharethingtemplate'
		};
		WTW.postAsyncJSON('/core/handlers/things.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);

				/* note serror would contain errors */
				dGet('wtw_sharethingresponse').innerHTML = zresponse.success + ' ' + zresponse.serror;
				window.setTimeout(function() {
					dGet('wtw_sharethingresponse').innerHTML = '';
				}, 5000);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminthings.js-shareThingTemplate=' + ex.message);
	}
}

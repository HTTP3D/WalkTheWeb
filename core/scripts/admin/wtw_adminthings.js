/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
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
		dGet('wtw_tthingalttag').value = "";
		WTW.getAsyncJSON("/connect/things.php?userid=" + dGet('wtw_tuserid').value, 
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
										dGet('wtw_tthingsnapshotid').value = WTW.things[i].thinginfo.snapshot;
										dGet('wtw_tthingalttag').value = WTW.decode(WTW.things[i].alttag.name);
									}
								}
							}
						}
					}
					if (dGet('wtw_tthingname').value == "") {
						dGet('wtw_showbuildingname').innerHTML = "3D Thing";
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
		WTW.log("core-scripts-admin-wtw_adminthings.js-openThingForm=" + ex.message);
	}
}

WTWJS.prototype.loadThingForm = async function(zthingid) {
	/* load settings to the 3D Thing Information Form */
	try {
		dGet('wtw_tthingind').value = '-1';
		dGet('wtw_tthingname').value = '';
		dGet('wtw_tthingdescription').value = '';
		dGet('wtw_tthingalttag').value = "";
		WTW.getAsyncJSON("/connect/things.php?userid=" + dGet('wtw_tuserid').value, 
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
										dGet('wtw_tthingsnapshotid').value = WTW.things[i].thinginfo.snapshot;
										dGet('wtw_tthingalttag').value = WTW.decode(WTW.things[i].alttag.name);
									}
								}
							}
						}
					}
					if (dGet('wtw_tthingname').value == "") {
						dGet('wtw_showbuildingname').innerHTML = "3D Thing";
						dGet('wtw_showbuildingname').style.cursor = 'default';
					} else {
						dGet('wtw_showbuildingname').innerHTML = WTW.decode(dGet('wtw_tthingname').value);
						dGet('wtw_showbuildingname').style.cursor = 'pointer';
					}
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminthings.js-loadThingForm=" + ex.message);
	}
}

WTWJS.prototype.submitthingForm = async function(w) {
	/* submit the 3D Thing Information Form */
	try {
		var zvalidate = 1;
		switch (w) {
			case 0:
				/* delete 3D Thing */
				/* note that the 3D Thing is flagged as deleted in the database and no data is actually deleted */
				var zrequest = {
					'thingid': thingid,
					'function':'deletething'
				};
				WTW.postAsyncJSON("/core/handlers/things.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						WTW.redirectParent('/admin.php');
					}
				);
				break;
			case 1: 
				/* save 3D Thing settings */
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
								WTW.things[i].thinginfo.thingname = dGet('wtw_tthingname').value;
								WTW.things[i].thinginfo.thingdescription = dGet('wtw_tthingdescription').value;
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
						'alttag': btoa(dGet('wtw_tthingalttag').value),
						'function':'savething'
					};
					WTW.postAsyncJSON("/core/handlers/things.php", zrequest, 
						function(zresponse) {
							zresponse = JSON.parse(zresponse);
							/* note serror would contain errors */
							/* return to previous menu */
							WTW.hideAdminMenu();
							WTW.backToEdit();
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
							dGet('wtw_tthingname').value = WTW.things[i].thinginfo.thingname;
							dGet('wtw_tthingdescription').value = WTW.things[i].thinginfo.thingdescription;
							dGet('wtw_tthinganalyticsid').value = WTW.things[i].thinginfo.analytics;
							dGet('wtw_tthingalttag').value = WTW.decode(WTW.things[i].alttag.name);
						}
					}
				}
				/* return to previous menu */
				WTW.hideAdminMenu();
				WTW.backToEdit();
				WTW.setMenuBarSelectText();
				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminthings.js-submitthingForm=" + ex.message);
	}
}

WTWJS.prototype.copyMyThing = async function() {
	/* make a copy of an existing 3D Thing (use as backup or as a new 3D Thing to edit and use) */
	try {
		dGet('wtw_tthingind').value = '-1';
		dGet('wtw_tthingname').value = '';
		WTW.getAsyncJSON("/connect/things.php?userid=" + dGet('wtw_tuserid').value, 
			function(zresponse) {
				WTW.things = JSON.parse(zresponse);
				if (WTW.things != null) {
					for (var i = 0; i < WTW.things.length; i++) {
						if (WTW.things[i] != null) {
							if (WTW.things[i].thinginfo.thingid != undefined) {
								if (WTW.things[i].thinginfo.thingid != null) {
									if (thingid == WTW.things[i].thinginfo.thingid) {
										dGet('wtw_tthingname').value = WTW.decode(WTW.things[i].thinginfo.thingname) + " - Copy";
										var zthingname = WTW.encode(dGet('wtw_tthingname').value);
										if (zthingname != "") {
											WTW.copyThing(thingid, zthingname + " - Copy");
										} else {
											WTW.copyThing(thingid, "New 3D Thing - Copy");
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
		WTW.log("core-scripts-admin-wtw_adminthings.js-copyMyThing=" + ex.message);
	}
}

WTWJS.prototype.copyThing = async function(zcopythingid, zthingname) {
	/* submit the copy process to the database to duplicate */
	try {
		if (zthingname != "" && dGet('wtw_tthingname').value == "") {
			dGet('wtw_tthingname').value = zthingname;
		} else if (dGet('wtw_tthingname').value == "") {
			dGet('wtw_tthingname').value = "New 3D Thing";
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
		WTW.postAsyncJSON("/core/handlers/things.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.copyThingComplete(zresponse.thingid);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminthings.js-copyThing=" + ex.message);
	}
}

WTWJS.prototype.copyThingComplete = function(zthingid) {
	/* copy process is complete, load new 3D Thing */
	try {
		window.setTimeout(function() {
			if (zthingid != "" && zthingid != thingid) {
				window.location.href="/admin.php?thingid=" + zthingid + "&hmenu=35&newthing=1";
			}
		}, 2000);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminthings.js-copyThingComplete=" + ex.message);
	} 
}

WTWJS.prototype.getSelectThingsList = async function() {
	/* populates the admin menu for My 3D Things to load and edit */
	try {
		WTW.hide('wtw_listthings');
		WTW.show('wtw_loadingthingid');
		dGet("wtw_listthings").innerHTML = "";
		WTW.getAsyncJSON("/connect/things.php?userid=" + dGet('wtw_tuserid').value, 
			function(zresponse) {
				WTW.things = JSON.parse(zresponse);
				if (WTW.things != null) {
					for (var i = 0; i < WTW.things.length; i++) {
						if (WTW.things[i] != null) {
							if (WTW.things[i].thinginfo.thingid == thingid) {
								dGet("wtw_listthings").innerHTML += "<div id=\"wtw_beditthing" + WTW.things[i].thinginfo.thingid + "\" class='wtw-menulevel2' style='background-color:#2C2CAB;'>" + WTW.decode(WTW.things[i].thinginfo.thingname) + "</div>\r\n";
							} else {
								dGet("wtw_listthings").innerHTML += "<div id=\"wtw_beditthing" + WTW.things[i].thinginfo.thingid + "\" onclick=\"window.location.href='admin.php?thingid=" + WTW.things[i].thinginfo.thingid + "';\" class='wtw-menulevel2'>" + WTW.decode(WTW.things[i].thinginfo.thingname) + "</div>\r\n";
							}
						}
					}
				}
				window.setTimeout(function() {
					WTW.hide('wtw_loadingthingid');
					WTW.show('wtw_listthings');
				},500);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminthings.js-getSelectThingsList=" + ex.message);
	}		
}

WTWJS.prototype.getThingMoldList = async function() {
	/* 3D Things can be added to 3D Communities and 3D Buildings */
	/* this function creates a list of 3D Things to add */
	try {
		WTW.hide('wtw_thingmoldsbuttonlist');
		WTW.show('wtw_loadingthingmoldsbuttonlist');
		dGet("wtw_thingmoldsbuttonlist").innerHTML = "";
		WTW.getAsyncJSON("/connect/things.php?userid=" + dGet('wtw_tuserid').value, 
			function(zresponse) {
				WTW.things = JSON.parse(zresponse);
				if (WTW.things != null) {
					for (var i = 0; i < WTW.things.length; i++) {
						if (WTW.things[i] != null) {
							dGet("wtw_thingmoldsbuttonlist").innerHTML += "<div id=\"wtw_baddbthingmold" + WTW.things[i].thinginfo.thingid + "\" onclick=\"WTW.addConnectingGrid('thing', '" + WTW.things[i].thinginfo.thingid + "', '" + WTW.things[i].thinginfo.thingname + "');\" class='wtw-menulevel2'>" + WTW.things[i].thinginfo.thingname + "</div>\r\n";
						}
					}
				}
				WTW.hide('wtw_loadingthingmoldsbuttonlist');
				WTW.show('wtw_thingmoldsbuttonlist');
				WTW.setWindowSize();
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminthings.js-getThingMoldList=" + ex.message);
	}		
}

WTWJS.prototype.editThing = function(zthingid) {
	/* load a select 3D Thing into the editor */
	try {
		WTW.openWebpage(wtw_domainurl + "/admin.php?thingid=" + zthingid + "&hmenu=35");
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminthings.js-editThing=" + ex.message);
	}
}

WTWJS.prototype.thingSearchShowThing = function(newthingid) {
	/* after you search and select a 3D Thing, this loads the 3D Thing in the editor */
	try {
		window.location.href="/admin.php?thingid=" + newthingid + "&hmenu=35&newthing=1";
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminthings.js-thingSearchShowThing=" + ex.message);
	}
}

WTWJS.prototype.openShareThingForm = async function() {
	/* share 3D Thing is used to send a copy to WalkTheWeb for others to search and download copies of their own */
	try {
		dGet("wtw_tsharethingtempname").value = "";
		dGet("wtw_tsharethingdescription").value = "";
		dGet('wtw_tsharethingtags').value = "";
		WTW.hide('wtw_adminmenu39b');
		WTW.show('wtw_loadingsharethingform');
		WTW.getAsyncJSON("/connect/things.php?userid=" + dGet('wtw_tuserid').value, 
			function(zresponse) {
				WTW.things = JSON.parse(zresponse);
				if (WTW.things != null) {
					for (var i = 0; i < WTW.things.length; i++) {
						if (WTW.things[i] != null) {
							if (WTW.things[i].thinginfo.thingid != undefined) {
								if (WTW.things[i].thinginfo.thingid != null) {
									if (thingid == WTW.things[i].thinginfo.thingid) {
										if (WTW.things[i].share.templatename != "") {
											dGet('wtw_tsharethingtempname').value = WTW.things[i].share.templatename;
										} else {
											dGet('wtw_tsharethingtempname').value = WTW.things[i].thinginfo.thingname;
										}
										dGet('wtw_tsharethingdescription').value = WTW.things[i].share.description;
										dGet('wtw_tsharethingtags').value = WTW.things[i].share.tags;
										if (WTW.things[i].thinginfo.snapshotpath != "") {
											dGet('wtw_defaultthingsnapshot').src = WTW.things[i].thinginfo.snapshotpath;
										} else {
											dGet('wtw_defaultthingsnapshot').src = WTW.things[i].thinginfo.snapshotdata;
										}
									}
								}
							}
						}
					}
				}
				if (dGet('wtw_tsharethingtempname').value == "" && dGet('wtw_tthingname').value != "") {
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
		WTW.log("core-scripts-admin-wtw_adminthings.js-openShareThingForm=" + ex.message);
	}
}

WTWJS.prototype.saveShareThingForm = async function() {
	/* process the share 3D Thing and Save the settings locally for next Share */
	try {
		var zrequest = {
			'thingid': thingid,
			'pastthingid': '',
			'thingname': btoa(dGet('wtw_tsharethingtempname').value),
			'description': btoa(dGet('wtw_tsharethingdescription').value),
			'tags': btoa(dGet('wtw_tsharethingtags').value),
			'function':'savethingtemplate'
		};
		WTW.postAsyncJSON("/core/handlers/things.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				dGet('wtw_sharehash').value = zresponse.sharehash;
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminthings.js-saveShareThingForm=" + ex.message);
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
		WTW.postAsyncJSON("/core/handlers/things.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);

				/* note serror would contain errors */
				dGet('wtw_sharethingresponse').innerHTML = zresponse.success + " " + zresponse.serror;
				window.setTimeout(function() {
					dGet('wtw_sharethingresponse').innerHTML = "";
				}, 5000);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminthings.js-shareThingTemplate=" + ex.message);
	}
}

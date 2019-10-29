/* All code is Copyright 2013-2019 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

WTWJS.prototype.lineZ;
WTWJS.prototype.lineX;
WTWJS.prototype.lineY;
WTWJS.prototype.lineY1; 
WTWJS.prototype.lineY2;
WTWJS.prototype.lineY3;
WTWJS.prototype.lineY4;
WTWJS.prototype.lineY5;
WTWJS.prototype.lineY6;
WTWJS.prototype.lineY7;
WTWJS.prototype.lineY8;
WTWJS.prototype.lineZ1;
WTWJS.prototype.lineZ2;
WTWJS.prototype.lineZ3;
WTWJS.prototype.lineZ4;
WTWJS.prototype.lineZ5;
WTWJS.prototype.lineZ6;
WTWJS.prototype.lineZ7;
WTWJS.prototype.lineZ8;
WTWJS.prototype.lineX1;
WTWJS.prototype.lineX2;
WTWJS.prototype.lineX3;
WTWJS.prototype.lineX4;
WTWJS.prototype.lineX5;
WTWJS.prototype.lineX6;
WTWJS.prototype.lineX7;
WTWJS.prototype.lineX8;
WTWJS.prototype.moveX;
WTWJS.prototype.moveY;
WTWJS.prototype.moveZ;
WTWJS.prototype.moldBackup = null;

WTWJS.prototype.adminInit = function() {
	try {
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-adminInit=" + ex.message);
	}
}

WTWJS.prototype.adminLoadAfterScreen = function() {
	try {
		var snapshot = WTW.getQuerystring('snapshot','0');
		var hmenu = WTW.getQuerystring('hmenu',1);
		if (snapshot == '1') {
			hmenu = 69;
			if (communityid != '') {
				WTW.hideAdminMenu();
				dGet('wtw_snapshottitle').innerHTML = "3D Community Snapshot";
				WTW.openUpdateSnapshotForm();
				WTW.show('wtw_adminmenu69');
			} else if (buildingid != '') {
				WTW.hideAdminMenu();
				dGet('wtw_snapshottitle').innerHTML = "3D Building Snapshot";
				WTW.openUpdateSnapshotForm();
				WTW.show('wtw_adminmenu69');
			} else if (thingid != '') {
				WTW.hideAdminMenu();
				dGet('wtw_snapshottitle').innerHTML = "3D Thing Snapshot";
				WTW.openUpdateSnapshotForm();
				WTW.show('wtw_adminmenu69');
			}
			if (dGet('wtw_adminmenubutton').style.left == "0px") {
				WTW.toggleAdminMenu('wtw_adminmenubutton');
			}
			WTW.setWindowSize();
			WTW.checkForUpdates();
		} else {
			var zshowupdates = WTW.getQuerystring('showupdates','0');
			switch (zshowupdates) {
				case "1":
					WTW.openFullPageForm('updates','','');
					break;
				case "2":
					WTW.openFullPageForm('plugins','All Plugins');
					break;
				default:
					WTW.checkForUpdates();
					break;
			}
			if (WTW.isNumeric(hmenu)) {
				WTW.hideAdminMenu();
				switch (Number(hmenu)) {
					case 5:
						WTW.openBuildingForm(buildingid);
						break;
					case 25:
						WTW.openCommunityForm(communityid);
						break;
					case 35:
						WTW.openThingForm(thingid);
						break;
				}
				WTW.show('wtw_adminmenu' + hmenu);
				if (dGet('wtw_adminmenubutton').style.left == "0px") {
					WTW.toggleAdminMenu('wtw_adminmenubutton');
				}
				WTW.setWindowSize();
			} else if (hmenu != "") {
				if (hmenu == "updates") {
					WTW.openFullPageForm('updates','','');
				}
				if (dGet('wtw_adminmenubutton').style.left == "0px") {
					WTW.toggleAdminMenu('wtw_adminmenubutton');
				}
				WTW.setWindowSize();
			}
		}
		if (communityid != '') {
			WTW.loadCommunityForm(communityid);
		} else if (buildingid != '') {
			WTW.loadBuildingForm(buildingid);
		} else if (thingid != '') {
			WTW.loadThingForm(thingid);
		}
		if (WTW.getCookie("gravityoption") == '0') {
			WTW.setQuickEditorGravity(0);
		}
		if (WTW.getCookie("wtw_bfocus") == '0') {
			WTW.setQuickEditorFocus(0);
		}
        if (WTW.getCookie("wallcollisionsoption") == '1') {
            WTW.init.wallCollisions = 0;
        } else {
            WTW.init.wallCollisions = 1;
        }
        if (WTW.getCookie("floorcollisionsoption") == '1') {
            WTW.init.floorCollisions = 0;
        } else {
            WTW.init.floorCollisions = 1;
        }
		dGet('wtw_twaterpositiony').value = WTW.init.waterPositionY;
		dGet('wtw_tgroundpositiony').value = WTW.init.groundPositionY;
		WTW.setAdminTarget();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-adminLoadAfterScreen=" + ex.message);
	}
}

WTWJS.prototype.setAdminTarget = function() {
	try {
		if (thingid == "" && buildingid == "" && communityid == "") {
			dGet('wtw_showcommunityname').innerHTML = "Select 3D Item to Edit";	
			dGet('wtw_showcommunityname').style.cursor = 'default';
			dGet('wtw_showbuildingname').innerHTML = "from Admin Menu Above";	
			dGet('wtw_showbuildingname').style.cursor = 'default';
			WTW.hide('wtw_modebuilding');
			WTW.hide('wtw_mainadminmode');
		} else {
			WTW.showInline('wtw_modebuilding');
			WTW.showInline('wtw_mainadminmode');
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setAdminTarget=" + ex.message);
	}
}

WTWJS.prototype.toggleAdvanced = function(thisdiv, sectiondiv) {
	try {
		if (dGet(sectiondiv) != null) {
			if (thisdiv.innerHTML == "-- Show Advanced Options --") {
				thisdiv.innerHTML = "-- Hide Advanced Options --";
				dGet(sectiondiv).style.display = "block";
				dGet(sectiondiv).style.visibility = "visible";
			} else if (thisdiv.innerHTML == "-- Show Advanced Mixmap Terrain --") {
				thisdiv.innerHTML = "-- Hide Advanced Mixmap Terrain --";
				dGet(sectiondiv).style.display = "block";
				dGet(sectiondiv).style.visibility = "visible";
			} else if (thisdiv.innerHTML == "-- Hide Advanced Mixmap Terrain --") {
				thisdiv.innerHTML = "-- Show Advanced Mixmap Terrain --";
				dGet(sectiondiv).style.display = "none";
				dGet(sectiondiv).style.visibility = "hidden";
			} else {
				thisdiv.innerHTML = "-- Show Advanced Options --";
				dGet(sectiondiv).style.display = "none";
				dGet(sectiondiv).style.visibility = "hidden";
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-toggleAdvanced=" + ex.message);
	}
}

WTWJS.prototype.setUserThings = function(addthings, added) {
	try {
		if (added == undefined) {
			added = 0;
		}
		var tryaddthings = 0;
		window.setTimeout(function() {
			WTW.hide("wtw_loadingthingid");
		},1500);
		WTW.things = addthings;
		if (WTW.things != null && WTW.adminMenu == 7) {
			if (WTW.things.length > 0) {
			} else if (added == 0) {
				tryaddthings = 1;
			}
		} else if (WTW.things != null && added == 0) {
			if (WTW.things.length == 0) {
				tryaddthings = 1;
			}
		} else if (WTW.things == null) {
			tryaddthings = 1;
		}
		if (tryaddthings == 1 && added == 0) {
			WTW.addThingsMustHave();
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setUserThings=" + ex.message);
	}
}

WTWJS.prototype.addThingsMustHave = function() {
	try {
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tthings').value = "";
			ipage.getElementById('wtw_baddmusthave').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/things.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-addThingsMustHave=" + ex.message);
	}
}

WTWJS.prototype.getThingMoldList = function() {
	try {
		WTW.hide('wtw_thingmoldsbuttonlist');
		WTW.show('wtw_loadingthingmoldsbuttonlist');
		dGet("wtw_thingmoldsbuttonlist").innerHTML = "";
		WTW.getJSON("/connect/things.php?userid=" + dGet('wtw_tuserid').value, 
			function(response) {
				WTW.things = JSON.parse(response);
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-getThingMoldList=" + ex.message);
	}		
}

WTWJS.prototype.getSelectThingsList = function() {
	try {
		WTW.hide('wtw_listthings');
		WTW.show('wtw_loadingthingid');
		dGet("wtw_listthings").innerHTML = "";
		WTW.getJSON("/connect/things.php?userid=" + dGet('wtw_tuserid').value, 
			function(response) {
				WTW.things = JSON.parse(response);
				if (WTW.things != null) {
					for (var i = 0; i < WTW.things.length; i++) {
						if (WTW.things[i] != null) {
							if (WTW.things[i].thinginfo.thingid == thingid) {
								dGet("wtw_listthings").innerHTML += "<div id=\"wtw_beditthing" + WTW.things[i].thinginfo.thingid + "\" class='wtw-menulevel2' style='background-color:#2C2CAB;'>" + WTW.decode(WTW.things[i].thinginfo.thingname) + "</div>\r\n";
							} else {
								dGet("wtw_listthings").innerHTML += "<div id=\"wtw_beditthing" + WTW.things[i].thinginfo.thingid + "\" onclick=\"WTW.setCookie('thingid', '" + WTW.things[i].thinginfo.thingid + "', 30);	window.location.href='admin.php?thingid=" + WTW.things[i].thinginfo.thingid + "';\" class='wtw-menulevel2'>" + WTW.decode(WTW.things[i].thinginfo.thingname) + "</div>\r\n";
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-getSelectThingsList=" + ex.message);
	}		
}

WTWJS.prototype.setDevAccessValid = function(level1, level2, w) {
	try {
		if (w == 2) {
			if (dGet('wtw_tadduserdevaccess').value.length < 6) {
				WTW.showInline('wtw_reqtadduserdevaccess');
			} else {
				WTW.hide('wtw_reqtadduserdevaccess');
			}
		} else if (w == 1) {
			if (dGet(level2).checked) {
				dGet(level1).checked = true;
			}
		} else {
			if (dGet(level1).checked == false) {
				dGet(level2).checked = false;
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setDevAccessValid=" + ex.message);
	}		
}

WTWJS.prototype.setAccessValid = function(w) {
	try {
		if (w == 2) {
			if (dGet('wtw_tadduseridname').value.length < 6) {
				WTW.showInline('wtw_reqtadduseraccess');
			} else {
				WTW.hide('wtw_reqtadduseraccess');
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setAccessValid=" + ex.message);
	}		
}

WTWJS.prototype.deleteDevAccess = function() {
	try {
		var zrequest = {
			'userdevaccess':dGet('wtw_tadduserdevaccess').value
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tcommunityid').value = communityid;
			ipage.getElementById('wtw_tbuildingid').value = buildingid;
			ipage.getElementById('wtw_tthingid').value = thingid;
			ipage.getElementById('wtw_tpermissions').value = "";
			ipage.getElementById('wtw_tadduserdevaccess').value = zrequest.userdevaccess;
			ipage.getElementById('wtw_bdeletepermissions').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/users.php', onload);		
		dGet('wtw_tadduserdevaccess').value = "";
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-deleteDevAccess=" + ex.message);
	}		
}

WTWJS.prototype.addDevAccess = function() {
	try {
		var request = {
			'userdevaccess':dGet('wtw_tadduserdevaccess').value,
			'useraccess':dGet('wtw_taddnewaccess').value
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tcommunityid').value = communityid;
			ipage.getElementById('wtw_tbuildingid').value = buildingid;
			ipage.getElementById('wtw_tthingid').value = thingid;
			ipage.getElementById('wtw_tpermissions').value = "";
			ipage.getElementById('wtw_tadduserdevaccess').value = request.userdevaccess;
			ipage.getElementById('wtw_tuseraccess').value = request.useraccess;
			ipage.getElementById('wtw_bsavepermissions').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/users.php', onload);		
		dGet('wtw_tadduserdevaccess').value = "";
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-addDevAccess=" + ex.message);
	}		
}

WTWJS.prototype.addAccess = function() {
	try {
		var request = {
			'newaccess':dGet('wtw_taddnewaccess').value,
			'userid':dGet('wtw_tadduseridname').value
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tcommunityid').value = communityid;
			ipage.getElementById('wtw_tbuildingid').value = buildingid;
			ipage.getElementById('wtw_tthingid').value = thingid;
			ipage.getElementById('wtw_tpermissions').value = "";
			ipage.getElementById('wtw_tuseraccess').value = request.newaccess;
			ipage.getElementById('wtw_tuserid').value = request.userid;
			ipage.getElementById('wtw_bsavepermissions').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/users.php', onload);
		dGet('wtw_tadduseridname').value = "";
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-addAccess=" + ex.message);
	}		
}

WTWJS.prototype.deleteAccess = function() {
	try {
		var request = {
			'newaccess':dGet('wtw_taddnewaccess').value,
			'userid':dGet('wtw_tadduseridname').value
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tcommunityid').value = communityid;
			ipage.getElementById('wtw_tbuildingid').value = buildingid;
			ipage.getElementById('wtw_tthingid').value = thingid;
			ipage.getElementById('wtw_tpermissions').value = "";
			ipage.getElementById('wtw_tuseraccess').value = request.newaccess;
			ipage.getElementById('wtw_tuserid').value = request.userid;
			ipage.getElementById('wtw_bdeletepermissions').click();
			dGet('wtw_tadduseridname').value = "";
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/users.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-deleteAccess=" + ex.message);
	}		
}

WTWJS.prototype.getAccess = function() {
	try {
		var request = {
			'newaccess':dGet('wtw_taddnewaccess').value,
			'userid':dGet('wtw_tadduseridname').value
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tcommunityid').value = communityid;
			ipage.getElementById('wtw_tbuildingid').value = buildingid;
			ipage.getElementById('wtw_tthingid').value = thingid;
			ipage.getElementById('wtw_tpermissions').value = "";
			ipage.getElementById('wtw_tuseraccess').value = request.newaccess;
			ipage.getElementById('wtw_tuserid').value = request.userid;
			ipage.getElementById('wtw_bgetpermissions').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/users.php', onload);
		WTW.hide('wtw_adminmenu60b');
		WTW.show('wtw_loadinguserdevaccessform');
		dGet('wtw_tadduseridname').value = "";
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-getAccess=" + ex.message);
	}		
}

WTWJS.prototype.openPermissionsForm = function() {
	try {
		WTW.hide('wtw_adminmenu60b');
		WTW.hide('wtw_userdevaccesslist');
		WTW.show('wtw_loadinguserdevaccessform');
		var moldgroup = 'Community';
		if (buildingid != '') {
			moldgroup = 'Building';
		} else if (thingid != '') {
			moldgroup = 'Thing';
		}
		dGet('wtw_accessnote').innerHTML = "Dev: updates to 3D " + moldgroup + ".<br />Admin: Dev and set permissions.";
		dGet('wtw_userdevaccesslist').innerHTML = "";
		WTW.getJSON("/connect/useraccess.php?communityid=" + communityid + "&buildingid=" + buildingid + "&thingid=" + thingid, 
			function(response) {
				var useraccess = JSON.parse(response);
				if (useraccess != null) {
					for (var i = 0; i < useraccess.length; i++) {
						if (useraccess[i] != null) {
							var displayname = useraccess[i].displayname;
							if (displayname == '') {
								displayname = useraccess[i].username;
							}
							if (displayname == '') {
								displayname = useraccess[i].email;
							}
							if (displayname == '') {
								displayname = useraccess[i].userid;
							}
							dGet('wtw_userdevaccesslist').innerHTML += "<div class='wtw-menulevel0' onclick=\"WTW.toggle('wtw_div-" + useraccess[i].userauthorizationid + "');\"><div class='wtw-altkey'>" + useraccess[i].useraccess + "</div>" + displayname + "</div><div id='wtw_div-" + useraccess[i].userauthorizationid + "' class='wtw-detailprint' style='display:none;visibility:hidden;'>User Name: " + useraccess[i].username + "<br />Display Name: " + useraccess[i].displayname + "<br /><div id=\"wtw_bdelete-" + useraccess[i].userauthorizationid + "\" class='wtw-redbutton' onclick=\"dGet('wtw_tadduserdevaccess').value='" + useraccess[i].userid + "';WTW.deleteDevAccess();\" style='margin-left:30px;margin-right:20px;'>Delete</div><div id=\"wtw_bcancel-" + useraccess[i].userauthorizationid + "\" class='wtw-yellowbutton' onclick=\"WTW.toggle('wtw_div-" + useraccess[i].userauthorizationid + "');\">Cancel</div></div>";
						}
					}
				}
				window.setTimeout(function() {
					WTW.hide('wtw_loadinguserdevaccessform');
					WTW.show('wtw_adminmenu60b');
					WTW.show('wtw_userdevaccesslist');
				},500);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openPermissionsForm=" + ex.message);
	}		
}

WTWJS.prototype.updateDevAccessList = function(permissionslist) {
	try {
		var totals = "";
		dGet('wtw_useraccesslist').innerHTML = "";
		dGet('wtw_userdevaccesslist').innerHTML = "";
		var permissions = JSON.parse(permissionslist);
		if (permissions != null) {
			if (permissions.length > 0) {
				for (var i = 0; i < permissions.length; i++) {
					if (permissions[i] != null) {
						switch (permissions[i].useraccess) {
							case "admin":
//								dGet('wtw_userdevaccesslist').innerHTML += "<div style='white-space:nowrap;'><div style='float:right;text-align:right;'><input type=\"checkbox\" id=\"wtw_taccesslevel1-" + permissions[i].authorizationid + "\" name=\"taccesslevel1-" + permissions[i].authorizationid + "\" class=\"smallprint\" value=\"1\" checked=\"true\" onchange=\"WTW.setDevAccessValid('taccesslevel1-" + permissions[i].authorizationid + "','taccesslevel2-" + permissions[i].authorizationid + "',0);dGet('wtw_tadduserdevaccess').value='" + permissions[i].userid + "';WTW.addDevAccess();\" /> Dev &nbsp;&nbsp;&nbsp;<input type=\"checkbox\" id=\"wtw_taccesslevel2-" + permissions[i].authorizationid + "\" name=\"wtw_taccesslevel2-" + permissions[i].authorizationid + "\" class=\"smallprint\" value=\"1\" checked=\"true\" onchange=\"WTW.setDevAccessValid('taccesslevel1-" + permissions[i].authorizationid + "','taccesslevel2-" + permissions[i].authorizationid + "',1);dGet('wtw_tadduserdevaccess').value='" + permissions[i].userid + "';WTW.addDevAccess();\" /> Admin &nbsp;&nbsp;&nbsp;<input id='wtw_bdeleteauthorization" + permissions[i].authorizationid + "' type='button' value='delete' onclick=\"dGet('wtw_tadduserdevaccess').value='" + permissions[i].userid + "';WTW.deleteDevAccess();return (false);\" /></div><div><b>" + permissions[i].userid + "</b></div></div><br />";
								break;
							case "architect":
//								dGet('wtw_userdevaccesslist').innerHTML += "<div style='white-space:nowrap;'><div style='float:right;text-align:right;'><input type=\"checkbox\" id=\"wtw_taccesslevel1-" + permissions[i].authorizationid + "\" name=\"taccesslevel1-" + permissions[i].authorizationid + "\" class=\"smallprint\" value=\"1\" checked=\"true\" onchange=\"WTW.setDevAccessValid('taccesslevel1-" + permissions[i].authorizationid + "','taccesslevel2-" + permissions[i].authorizationid + "',0);dGet('wtw_tadduserdevaccess').value='" + permissions[i].userid + "';WTW.addDevAccess();\" /> Dev &nbsp;&nbsp;&nbsp;<input type=\"checkbox\" id=\"wtw_taccesslevel2-" + permissions[i].authorizationid + "\" name=\"wtw_taccesslevel2-" + permissions[i].authorizationid + "\" class=\"smallprint\" value=\"1\" onchange=\"WTW.setDevAccessValid('taccesslevel1-" + permissions[i].authorizationid + "','wtw_taccesslevel2-" + permissions[i].authorizationid + "',1);dGet('wtw_tadduserdevaccess').value='" + permissions[i].userid + "';WTW.addDevAccess();\" /> Admin &nbsp;&nbsp;&nbsp;<input id='wtw_bdeleteauthorization" + permissions[i].authorizationid + "' type='button' value='delete' onclick=\"dGet('wtw_tadduserdevaccess').value='" + permissions[i].userid + "';WTW.deleteDevAccess();return (false);\" /></div><div><b>" + permissions[i].userid + "</b></div></div><br />";
								break;
							default:
//								dGet('wtw_useraccesslist').innerHTML += "<div style='white-space:nowrap;'><div style='float:right;text-align:right;'><input id='wtw_bdeletebrowseauthorization" + permissions[i].authorizationid + "' type='button' value='delete' onclick=\"dGet('wtw_tadduseridname').value='" + permissions[i].userid + "';WTW.deleteAccess();return (false);\" /></div><div><b>" + permissions[i].userid + "</b></div></div><br />";
								break;
						}
						totals = "<hr />Browsers = " + permissions[i].counts.browse + "<br />Invitees = " + permissions[i].counts.invitees + "<br />Neighbors = " + permissions[i].counts.neighbors + "<br />Architects = " + permissions[i].counts.architects + "<br />Administrators = " + permissions[i].counts.admins;
					}
				}
			}
		}
		dGet('wtw_useraccesslist').innerHTML += totals;
		dGet('wtw_userdevaccesslist').innerHTML += totals;
		WTW.hide('wtw_loadinguserdevaccessform');
		WTW.show('wtw_adminmenu60b');
		WTW.setWindowSize();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-updateDevAccessList=" + ex.message);
	}		
}

WTWJS.prototype.openAddGroundTerrain = function() {
	try {
		var moldind = WTW.getNextCount(WTW.communitiesMolds);
		WTW.communitiesMolds[moldind] = WTW.newMold();
		var shape = "terrain";
		var moldid = WTW.getRandomString(16);
		var settingx = 700;
		var settingz = 800;
		var positionx = 0;
		var positiony = -1;
		var positionz = 0;
		var rotationx = 0;
		var rotationy = 0;
		var rotationz = 0;
		var newcoords = WTW.getNewCoordinates(500);
		positionx = newcoords.positionX;
		positionz = newcoords.positionZ;
		rotationy = newcoords.rotationY;
		WTW.communitiesMolds[moldind].moldid = moldid;
		WTW.communitiesMolds[moldind].moldind = moldind;
		WTW.communitiesMolds[moldind].communityinfo.communityid = communityid;
		WTW.communitiesMolds[moldind].communityinfo.communityind = "-1";
		WTW.communitiesMolds[moldind].position.x = positionx;
		WTW.communitiesMolds[moldind].position.y = positiony;
		WTW.communitiesMolds[moldind].position.z = positionz;
		WTW.communitiesMolds[moldind].scaling.x = settingx;
		WTW.communitiesMolds[moldind].scaling.y = 1;
		WTW.communitiesMolds[moldind].scaling.z = settingz;
		WTW.communitiesMolds[moldind].rotation.x = rotationx;
		WTW.communitiesMolds[moldind].rotation.y = rotationy;
		WTW.communitiesMolds[moldind].rotation.z = rotationz;
		WTW.communitiesMolds[moldind].graphics.texture.id = 'p3a7548r37pzqpev';
		WTW.communitiesMolds[moldind].graphics.heightmap.id = 'dxmbplwoocpg5df3';
		WTW.communitiesMolds[moldind].graphics.heightmap.minheight = 0;
		WTW.communitiesMolds[moldind].graphics.heightmap.maxheight = 70;
		WTW.communitiesMolds[moldind].graphics.uscale = settingx / 10
		WTW.communitiesMolds[moldind].graphics.vscale = settingz / 10
		WTW.communitiesMolds[moldind].subdivisions = 70;
		WTW.communitiesMolds[moldind].shape = shape;
		WTW.communitiesMolds[moldind].covering = "terrain";
		WTW.communitiesMolds[moldind].checkcollisions = "0";
		WTW.communitiesMolds[moldind].ispickable = "1";	
		WTW.communitiesMolds[moldind].loadactionzoneid = WTW.getLoadActionZoneID("Extreme");		
		WTW.communitiesMolds[moldind].loadactionzoneind = WTW.getActionZoneInd(WTW.communitiesMolds[moldind].loadactionzoneid, Number(dGet('wtw_tconnectinggridind').value));
		WTW.communitiesMolds[moldind].connectinggridind = Number(dGet("wtw_tconnectinggridind").value);		
		WTW.communitiesMolds[moldind].connectinggridid = dGet("wtw_tconnectinggridid").value;		
		WTW.communitiesMolds[moldind].parentname = dGet("wtw_tconnectinggridname").value;		
		WTW.communitiesMolds[moldind].moldname = "communitymolds-" + moldind + "-" + moldid + "-" + dGet("wtw_tconnectinggridind").value + "-" + dGet("wtw_tconnectinggridid").value + "-" + shape;		
		var imageinfo = WTW.getUploadFileData('fcg9ws5gsjd7x2ko');
		var imageinfo2 = WTW.getUploadFileData('rb89jzbm4qepbimm');
		dGet('wtw_moldheightmappreview').src = imageinfo2.filedata;
		WTW.openMoldForm(moldind, 'terrain', 'community', false);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openAddGroundTerrain=" + ex.message);
	}		
}

WTWJS.prototype.openEditGroundSettings = function() {
	try {
		var groundtextureid = WTW.init.groundTextureID;
		var groundtexturepath = WTW.init.groundTexturePath;
		WTW.hide('wtw_adminmenu41b');
		WTW.show('wtw_loadinggroundsettingsform');
		for (var i = 0; i < WTW.communities.length; i++) {
			if (WTW.communities[i] != null) {
				if (WTW.communities[i].communityinfo.communityid == communityid) {
					if (WTW.communities[i].graphics.texture.id != null) {
						if (WTW.communities[i].graphics.texture.backupid == "") {
							WTW.communities[i].graphics.texture.backupid = WTW.communities[i].graphics.texture.id;
						}
						groundtextureid = WTW.communities[i].graphics.texture.id;
					}
					if (WTW.communities[i].graphics.texture.path != null) {
						if (WTW.communities[i].graphics.texture.backuppath == "") {
							WTW.communities[i].graphics.texture.backuppath = WTW.communities[i].graphics.texture.path;
						}
						groundtexturepath = WTW.communities[i].graphics.texture.path;
					}
				}
			}
		}
		WTW.hide('wtw_loadinggroundsettingsform');
		WTW.show('wtw_adminmenu41b');
		dGet('wtw_textendedgroundtextureid').value = groundtextureid;
		dGet('wtw_textendedgroundtexturepath').value = groundtexturepath;
		WTW.setPreviewImage('wtw_showextendedgroundpreview', 'wtw_textendedgroundtexturepath', 'wtw_textendedgroundtextureid');
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openEditGroundSettings=" + ex.message);
	}		
}

WTWJS.prototype.saveGround = function() {
	try {
		var groundtextureid = WTW.init.groundTextureID;
		var groundtexturepath = WTW.init.groundTexturePath;
		if (dGet('wtw_textendedgroundtextureid').value != "") {
			groundtextureid = dGet('wtw_textendedgroundtextureid').value;
		}
		if (dGet('wtw_textendedgroundtexturepath').value != "") {
			groundtexturepath = dGet('wtw_textendedgroundtexturepath').value;
		}
		for (var i = 0; i < WTW.communities.length; i++) {
			if (WTW.communities[i] != null) {
				if (WTW.communities[i].communityinfo.communityid == communityid) {
					if (WTW.communities[i].graphics.texture.id != null) {
						WTW.communities[i].graphics.texture.backupid = "";
						WTW.communities[i].graphics.texture.id = groundtextureid;
					}
					if (WTW.communities[i].graphics.texture.path != null) {
						WTW.communities[i].graphics.texture.backuppath = "";
						WTW.communities[i].graphics.texture.path = groundtexturepath;
					}
				}
			}
		}

		var request = {
			'groundtextureid':groundtextureid
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tcommunityid').value = communityid;
			ipage.getElementById('wtw_textendedgroundtextureid').value = request.groundtextureid;
			ipage.getElementById('wtw_bsaveextendedgroundtexture').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/communities.php', onload);		
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-saveGround=" + ex.message);
	}		
}

WTWJS.prototype.cancelGround = function() {
	try {
		var groundtextureid = WTW.init.groundTextureID;
		var groundtexturepath = WTW.init.groundTexturePath;
		for (var i = 0; i < WTW.communities.length; i++) {
			if (WTW.communities[i] != null) {
				if (WTW.communities[i].communityinfo.communityid == communityid) {
					if (WTW.communities[i].graphics.texture.id != null) {
						if (WTW.communities[i].graphics.texture.backupid != "") {
							WTW.communities[i].graphics.texture.id = WTW.communities[i].graphics.texture.backupid;
							WTW.communities[i].graphics.texture.backupid = "";
						}
						groundtextureid = WTW.communities[i].graphics.texture.id;
						if (WTW.communities[i].graphics.texture.backuppath != "") {
							WTW.communities[i].graphics.texture.path = WTW.communities[i].graphics.texture.backuppath;
							WTW.communities[i].graphics.texture.backuppath = "";
						}
						groundtexturepath = WTW.communities[i].graphics.texture.path;
					}
				}
			}
		}
		dGet('wtw_textendedgroundtextureid').value = groundtextureid;
		dGet('wtw_textendedgroundtexturepath').value = groundtexturepath;
		WTW.setPreviewImage('wtw_showextendedgroundpreview', 'wtw_textendedgroundtexturepath', 'wtw_textendedgroundtextureid');
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-cancelGround=" + ex.message);
	}		
}

WTWJS.prototype.openSkyDomeForm = function() {
	try {
		var skydomeid = WTW.init.skyTextureID;
		WTW.hide('wtw_adminmenu40b');
		WTW.show('wtw_loadingskysettingsform');
		WTW.loadSkyScene(WTW.init.skyInclination, WTW.init.skyLuminance, WTW.init.skyAzimuth, WTW.init.skyRayleigh, WTW.init.skyTurbidity, WTW.init.skyMieDirectionalG, WTW.init.skyMieCoefficient, 1);
		dGet('wtw_tskyinclinationbackup').value = WTW.init.skyInclination;
		dGet('wtw_tskyluminancebackup').value = WTW.init.skyLuminance;
		dGet('wtw_tskyazimuthbackup').value = WTW.init.skyAzimuth;
		dGet('wtw_tskyrayleighbackup').value = WTW.init.skyRayleigh;
		dGet('wtw_tskyturbiditybackup').value = WTW.init.skyTurbidity;
		dGet('wtw_tskymiedirectionalgbackup').value = WTW.init.skyMieDirectionalG;
		dGet('wtw_tskymiecoefficientbackup').value = WTW.init.skyMieCoefficient;
		for (var i = 0; i < WTW.communities.length; i++) {
			if (WTW.communities[i] != null) {
				if (WTW.communities[i].communityinfo.communityid == communityid) {
					if (WTW.communities[i].graphics.sky.id != null) {
						if (WTW.communities[i].graphics.sky.backupid == "") {
							WTW.communities[i].graphics.sky.backupid = WTW.communities[i].graphics.sky.id;
						}
						skydomeid = WTW.communities[i].graphics.sky.id;
					}
				}
			}
		}
		WTW.hide('wtw_loadingskysettingsform');
		WTW.show('wtw_adminmenu40b');
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openSkyDomeForm=" + ex.message);
	}
}

WTWJS.prototype.setSkyScene = function (key, newvalue, increment) {
	try {
		var lastvalue = 0;
		var property = '';
		var field = '';
		var min = 0;
		var max = 1;
		switch (key) {
			case 'inclination':
				field = 'wtw_tskyinclination';
				if (newvalue == null) {
					min = Number(dGet(field).min) - .6;
					max = Number(dGet(field).max) - .6;
					newvalue = (Number(WTW.init.skyInclination) + increment).toFixed(2);
					if (newvalue < min) {
						newvalue = min;
					} else if (newvalue > max) {
						newvalue = max;
					} 
				} else {
					newvalue = Number(newvalue) - .6;
				}
				WTW.init.skyInclination = Number(newvalue).toFixed(2);
				break;
			case 'luminance':
				field = 'wtw_tskyluminance';
				if (newvalue == null) {
					min = Number(dGet(field).min);
					max = Number(dGet(field).max);
					newvalue = (Number(WTW.init.skyLuminance) + increment).toFixed(2);
					if (newvalue < min) {
						newvalue = min;
					} else if (newvalue > max) {
						newvalue = max;
					} 
				}
				WTW.init.skyLuminance = Number(newvalue).toFixed(2);
				break;
			case 'azimuth':
				field = 'wtw_tskyazimuth';
				if (newvalue == null) {
					min = Number(dGet(field).min);
					max = Number(dGet(field).max);
					newvalue = (Number(WTW.init.skyAzimuth) + increment).toFixed(2);
					if (newvalue < min) {
						newvalue = min;
					} else if (newvalue > max) {
						newvalue = max;
					} 
				}
				WTW.init.skyAzimuth = Number(newvalue).toFixed(2);
				break;
			case 'rayleigh':
				field = 'wtw_tskyrayleigh';
				if (newvalue == null) {
					min = Number(dGet(field).min);
					max = Number(dGet(field).max);
					newvalue = (Number(WTW.init.skyRayleigh) + increment).toFixed(2);
					if (newvalue < min) {
						newvalue = min;
					} else if (newvalue > max) {
						newvalue = max;
					} 
				}
				WTW.init.skyRayleigh = Number(newvalue).toFixed(2);
				break;
			case 'turbidity':
				field = 'wtw_tskyturbidity';
				if (newvalue == null) {
					min = Number(dGet(field).min);
					max = Number(dGet(field).max);
					newvalue = (Number(WTW.init.skyTurbidity) + increment).toFixed(0);
					if (newvalue < min) {
						newvalue = min;
					} else if (newvalue > max) {
						newvalue = max;
					} 
				}
				WTW.init.skyTurbidity = Number(newvalue).toFixed(0);
				break;
			case 'miedirectionalg':
				field = 'wtw_tskymiedirectionalg';
				if (newvalue == null) {
					min = Number(dGet(field).min);
					max = Number(dGet(field).max);
					newvalue = (Number(WTW.init.skyMieDirectionalG) + increment).toFixed(2);
					if (newvalue < min) {
						newvalue = min;
					} else if (newvalue > max) {
						newvalue = max;
					} 
				}
				WTW.init.skyMieDirectionalG = Number(newvalue).toFixed(2);
				break;
			case 'miecoefficient':
				field = 'wtw_tskymiecoefficient';
				if (newvalue == null) {
					min = Number(dGet(field).min);
					max = Number(dGet(field).max);
					newvalue = (Number(WTW.init.skyMieCoefficient) + increment).toFixed(3);
					if (newvalue < min) {
						newvalue = min;
					} else if (newvalue > max) {
						newvalue = max;
					} 
				}
				WTW.init.skyMieCoefficient = Number(newvalue).toFixed(3);
				break;
		}
		WTW.loadSkyScene(WTW.init.skyInclination, WTW.init.skyLuminance, WTW.init.skyAzimuth, WTW.init.skyRayleigh, WTW.init.skyTurbidity, WTW.init.skyMieDirectionalG, WTW.init.skyMieCoefficient, 1);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setSkyScene=" + ex.message);
	}  
}

WTWJS.prototype.cancelSkyDome = function() {
	try {
		var skydomeid = WTW.init.skyTextureID;
		WTW.init.skyInclination = dGet('wtw_tskyinclinationbackup').value;
		WTW.init.skyLuminance = dGet('wtw_tskyluminancebackup').value;
		WTW.init.skyAzimuth = dGet('wtw_tskyazimuthbackup').value;
		WTW.init.skyRayleigh = dGet('wtw_tskyrayleighbackup').value;
		WTW.init.skyTurbidity = dGet('wtw_tskyturbiditybackup').value;
		WTW.init.skyMieDirectionalG = dGet('wtw_tskymiedirectionalgbackup').value;
		WTW.init.skyMieCoefficient = dGet('wtw_tskymiecoefficientbackup').value;
		WTW.loadSkyScene(WTW.init.skyInclination, WTW.init.skyLuminance, WTW.init.skyAzimuth, WTW.init.skyRayleigh, WTW.init.skyTurbidity, WTW.init.skyMieDirectionalG, WTW.init.skyMieCoefficient, 1);
		for (var i = 0; i < WTW.communities.length; i++) {
			if (WTW.communities[i] != null) {
				if (WTW.communities[i].communityinfo.communityid == communityid) {
					if (WTW.communities[i].graphics.sky.id != null) {
						if (WTW.communities[i].graphics.sky.backupid != "") {
							WTW.communities[i].graphics.sky.id = WTW.communities[i].graphics.sky.backupid;
							WTW.communities[i].graphics.sky.backupid = "";
						}
					}
					skydomeid = WTW.communities[i].graphics.sky.id;
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-cancelSkyDome=" + ex.message);
	}
}

WTWJS.prototype.saveSkyDome = function() {
	try {
		var skydomeid = WTW.init.skyTextureID;
		if (dGet('wtw_tskydomeid').value != "") {
			skydomeid = dGet('wtw_tskydomeid').value;
		}
		for (var i = 0; i < WTW.communities.length; i++) {
			if (WTW.communities[i] != null) {
				if (WTW.communities[i].communityinfo.communityid == communityid) {
					if (WTW.communities[i].graphics.sky.id != null) {
						WTW.communities[i].graphics.sky.backupid = "";
						WTW.communities[i].graphics.sky.id = skydomeid;
					}
				}
			}
		}
		var request = {
			'skydomeid':skydomeid,
			'skyInclination':WTW.init.skyInclination,
			'skyLuminance':WTW.init.skyLuminance,
			'skyAzimuth':WTW.init.skyAzimuth,
			'skyRayleigh':WTW.init.skyRayleigh,
			'skyTurbidity':WTW.init.skyTurbidity,
			'skyMieDirectionalG':WTW.init.skyMieDirectionalG,
			'skyMieCoefficient':WTW.init.skyMieCoefficient,
			
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tcommunityid').value = communityid;
			ipage.getElementById('wtw_tskydomeid').value = request.skydomeid;
			ipage.getElementById('wtw_tskyinclination').value = request.skyInclination;
			ipage.getElementById('wtw_tskyluminance').value = request.skyLuminance;
			ipage.getElementById('wtw_tskyazimuth').value = request.skyAzimuth;
			ipage.getElementById('wtw_tskyrayleigh').value = request.skyRayleigh;
			ipage.getElementById('wtw_tskyturbidity').value = request.skyTurbidity;
			ipage.getElementById('wtw_tskymiedirectionalg').value = request.skyMieDirectionalG;
			ipage.getElementById('wtw_tskymiecoefficient').value = request.skyMieCoefficient;
			ipage.getElementById('wtw_bsaveskydometexture').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/communities.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-saveSkyDome=" + ex.message);
	}
}

WTWJS.prototype.openListConnectingGridsForm = function() {
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-openListConnectingGridsForm=" + ex.message);
	}		
}

WTWJS.prototype.loadBuildingForm = function(w) {
	try {
		dGet("wtw_tbuildingid").value = w;
		if (dGet('wtw_tbuildingid').value == '') {
			dGet('wtw_tbuildingid').value = buildingid;
		}
		dGet('wtw_tbuildingname').value = "";
		dGet('wtw_tbuildingalttag').value = "";
		WTW.getJSON("/connect/buildings.php", 
			function(response) {
				WTW.buildings = JSON.parse(response);
				if (WTW.buildings != null) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							if (WTW.buildings[i].buildinginfo.buildingid != undefined) {
								if (WTW.buildings[i].buildinginfo.buildingid != null) {
									if (dGet("wtw_tbuildingid").value == WTW.buildings[i].buildinginfo.buildingid) {
										dGet('wtw_tbuildingname').value = WTW.decode(WTW.buildings[i].buildinginfo.buildingname);
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-loadBuildingForm=" + ex.message);
	}
}	

WTWJS.prototype.openBuildingForm = function(w) {
	try {
		dGet('wtw_tbuildingname').focus();
		dGet("wtw_tbuildingid").value = w;
		if (dGet('wtw_tbuildingid').value == '') {
			dGet('wtw_tbuildingid').value = buildingid;
		}
		dGet('wtw_tbuildingname').value = "";
		dGet('wtw_tbuildingalttag').value = "";
		WTW.show('wtw_loadingbuildingform');
		WTW.hide('wtw_adminmenu5b');
		WTW.getJSON("/connect/buildings.php", 
			function(response) {
				WTW.buildings = JSON.parse(response);
				if (WTW.buildings != null) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							if (WTW.buildings[i].buildinginfo.buildingid != undefined) {
								if (WTW.buildings[i].buildinginfo.buildingid != null) {
									if (dGet("wtw_tbuildingid").value == WTW.buildings[i].buildinginfo.buildingid) {
										dGet('wtw_tbuildingname').value = WTW.decode(WTW.buildings[i].buildinginfo.buildingname);
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-openBuildingForm=" + ex.message);
	}
}	

WTWJS.prototype.openShareBuildingForm = function() {
	try {
		dGet("wtw_tsharebuildtempname").value = "";
		dGet("wtw_tsharebuilddescription").value = "";
		dGet('wtw_tsharebuildtags').value = "";
		WTW.hide('wtw_adminmenu9b');
		WTW.show('wtw_loadingsharebuildingform');
		WTW.getJSON("/connect/buildings.php", 
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-openShareBuildingForm=" + ex.message);
	}
}	

WTWJS.prototype.loadThingForm = function(zthingid) {
	try {
		dGet('wtw_tthingind').value = '-1';
		dGet('wtw_tthingname').value = '';
		dGet('wtw_tthingalttag').value = "";
		WTW.getJSON("/connect/things.php?userid=" + dGet('wtw_tuserid').value, 
			function(response) {
				WTW.things = JSON.parse(response);
				if (WTW.things != null) {
					for (var i = 0; i < WTW.things.length; i++) {
						if (WTW.things[i] != null) {
							if (WTW.things[i].thinginfo.thingid != undefined) {
								if (WTW.things[i].thinginfo.thingid != null) {
									if (zthingid == WTW.things[i].thinginfo.thingid) {
										dGet('wtw_tthingind').value = i;
										dGet('wtw_tthingname').value = WTW.decode(WTW.things[i].thinginfo.thingname);
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-loadThingForm=" + ex.message);
	}
}

WTWJS.prototype.openThingForm = function(zthingid) {
	try {
		WTW.hide('wtw_reqeditthingname');
		dGet('wtw_tthingname').focus();
		dGet('wtw_tthingind').value = '-1';
		dGet('wtw_tthingname').value = '';
		WTW.hide('wtw_adminmenu35b');
		WTW.show('wtw_loadingthingform');
		dGet('wtw_tthingalttag').value = "";
		WTW.getJSON("/connect/things.php?userid=" + dGet('wtw_tuserid').value, 
			function(response) {
				WTW.things = JSON.parse(response);
				if (WTW.things != null) {
					for (var i = 0; i < WTW.things.length; i++) {
						if (WTW.things[i] != null) {
							if (WTW.things[i].thinginfo.thingid != undefined) {
								if (WTW.things[i].thinginfo.thingid != null) {
									if (zthingid == WTW.things[i].thinginfo.thingid) {
										dGet('wtw_tthingind').value = i;
										dGet('wtw_tthingname').value = WTW.decode(WTW.things[i].thinginfo.thingname);
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-openThingForm=" + ex.message);
	}
}

WTWJS.prototype.openShareThingForm = function() {
	try {
		dGet("wtw_tsharethingtempname").value = "";
		dGet("wtw_tsharethingdescription").value = "";
		dGet('wtw_tsharethingtags').value = "";
		WTW.hide('wtw_adminmenu39b');
		WTW.show('wtw_loadingsharethingform');
		WTW.getJSON("/connect/things.php?userid=" + dGet('wtw_tuserid').value, 
			function(response) {
				WTW.things = JSON.parse(response);
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-openShareThingForm=" + ex.message);
	}
}

WTWJS.prototype.openConfirmation = function(w) {
	try {
		WTW.showInline('wtw_confirmform');
		dGet('wtw_confirmform').style.top = (WTW.getScrollY() + 150).toString() + 'px';
		WTW.showInline('wtw_greyout');
		dGet('wtw_tconfirmid').value = w;
		switch (w) {
			case "1":
				dGet('wtw_confirmformtitle').innerHTML = "Confirm Delete Building";
				dGet('wtw_confirmheading').innerHTML = "Are you sure you want to Delete the Building?";
				dGet('wtw_confirmtext').innerHTML = "<br />Deleting the Building will Delete all Walls, Floors, and Web Components. It will also remove it from all <b>3D Communities</b>!";
				dGet('wtw_bconfirm').value = "Delete Building";
				break;
			case "2":
				dGet('wtw_confirmformtitle').innerHTML = "Confirm Delete Community";
				dGet('wtw_confirmheading').innerHTML = "Are you sure you want to Delete the Community?";
				dGet('wtw_confirmtext').innerHTML = "<br />Deleting the Community will also Delete all Terrain, Building Placements, Walls, Floors, and Web Components.";
				dGet('wtw_bconfirm').value = "Delete Community";
				break;
			case "3":
				dGet('wtw_confirmformtitle').innerHTML = "Confirm Delete Building from this Community";
				dGet('wtw_confirmheading').innerHTML = "Are you sure you want to Delete the Building from this Community?";
				dGet('wtw_confirmtext').innerHTML = "<br />The building can always be added again if you change your mind.";
				dGet('wtw_bconfirm').value = "Delete Building from Community";
				break;
			case "4":
				dGet('wtw_confirmformtitle').innerHTML = "Confirm Share 3D Building";
				dGet('wtw_confirmheading').innerHTML = "Are you sure you want to Share this 3D Building?";
				dGet('wtw_confirmtext').innerHTML = "<br />Other Users will be able to use a Shared Copy of this design for their own 3D Building. It will not affect your current 3D Building. The Shared Copy cannot be undone once Shared.";
				dGet('wtw_bconfirm').value = "Share My 3D Building";
				break;
			case "5":
				dGet('wtw_confirmformtitle').innerHTML = "Confirm Share 3D Community";
				dGet('wtw_confirmheading').innerHTML = "Are you sure you want to Share this 3D Community?";
				dGet('wtw_confirmtext').innerHTML = "<br />Other Users will be able to use a Shared Copy of this design for their own 3D Communities. It will not affect your current 3D Community. The Shared Copy cannot be undone once Shared.";
				dGet('wtw_bconfirm').value = "Share My 3D Community";
				break;
			case "6":
				dGet('wtw_confirmformtitle').innerHTML = "Confirm Delete 3D Thing";
				dGet('wtw_confirmheading').innerHTML = "Are you sure you want to Delete the 3D Thing?";
				dGet('wtw_confirmtext').innerHTML = "<br />Deleting the 3D Thing will also Delete all parts including Shapes and Web Components.";
				dGet('wtw_bconfirm').value = "Delete 3D Thing";
				break;
			case "7":
				dGet('wtw_confirmformtitle').innerHTML = "Confirm Share 3D Thing";
				dGet('wtw_confirmheading').innerHTML = "Are you sure you want to Share this 3D Thing?";
				dGet('wtw_confirmtext').innerHTML = "<br />Other Users will be able to use a Shared Copy of this design for their own 3D Thing. It will not affect your current 3D Thing. The Shared Copy cannot be undone once Shared.";
				dGet('wtw_bconfirm').value = "Share My 3D Thing";
				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openConfirmation=" + ex.message);
	}
}

WTWJS.prototype.completedConfirmation = function(w) {
	try {
		switch (w) {
			case "1":
				WTW.submitBuildingForm(0);
				break;
			case "2":
				WTW.submitCommunityForm(0);
				break;
			case "3":
				WTW.submitConnectingGridsForm(0);
				break;
			case "4":
				WTW.shareBuildingTemplate();
				break;
			case "5":
				WTW.shareCommunityTemplate();
				break;
			case "6":
				WTW.submitthingForm(0);
				break;
			case "7":
				WTW.shareThingTemplate();
				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-completedConfirmation=" + ex.message);
	}
}

WTWJS.prototype.closeConfirmation = function(w) {
	try {
		WTW.hide('wtw_confirmform');
		WTW.hide('wtw_greyout');
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-closeConfirmation=" + ex.message);
	}
}

WTWJS.prototype.submitCommunityForm = function(w) {
	try {
		switch (w) {
			case 0:
				/* function for after iframe loads */
				var onload = function(ipage) {
					ipage.getElementById('wtw_tcommunityid').value = communityid;
					ipage.getElementById('wtw_bdeletecommunity').click();
				}
				/* iframe src, onload function */
				var iframe = WTW.createIFrame('/core/iframes/communities.php', onload);
				WTW.deleteCookie("communityid");
				break;
			case 1:
				if (WTW.isNumeric(dGet('wtw_tgroundpositiony').value) == false) {
					dGet('wtw_tgroundpositiony').value = "0.00";
				}
				if (WTW.isNumeric(dGet('wtw_twaterpositiony').value) == false) {
					dGet('wtw_twaterpositiony').value = "-1.00";
				}
				for (var i = 0; i < WTW.communities.length; i++) {
					if (WTW.communities[i] != null) {
						if (WTW.communities[i].communityinfo.communityid == communityid) {
							WTW.communities[i].communityinfo.communityname = WTW.encode(dGet('wtw_tcommunityname').value);
							WTW.communities[i].communityinfo.analyticsid = dGet('wtw_tcommunityanalyticsid').value;
							WTW.communities[i].groundpositiony = dGet('wtw_tgroundpositiony').value;
							WTW.communities[i].waterpositiony = dGet('wtw_twaterpositiony').value;
							WTW.communities[i].alttag.name = WTW.encode(dGet('wtw_tcommunityalttag').value);
							dGet('wtw_showcommunityname').innerHTML = dGet('wtw_tcommunityname').value;
						}
					}
				}
				for (var i = 0; i < WTW.communitiesMolds.length; i++) {
					if (WTW.communitiesMolds[i] != null) {
						if (WTW.communitiesMolds[i].communityinfo.communityid == communityid) {
							WTW.communitiesMolds[i].graphics.texture.backupid = "";
						}
					}
				}
				var request = {
					'communityname':WTW.encode(dGet('wtw_tcommunityname').value),
					'analyticsid':dGet('wtw_tcommunityanalyticsid').value,
					'groundpositiony':dGet('wtw_tgroundpositiony').value,
					'waterpositiony':dGet('wtw_twaterpositiony').value,
					'alttag':WTW.encode(dGet('wtw_tcommunityalttag').value)
				};
				/* function for after iframe loads */
				var onload = function(ipage) {
					ipage.getElementById('wtw_tcommunityid').value = communityid;
					ipage.getElementById('wtw_tcommunityname').value = request.communityname;
					ipage.getElementById('wtw_tcommunityanalyticsid').value = request.analyticsid;
					ipage.getElementById('wtw_tgroundpositiony').value = request.groundpositiony;
					ipage.getElementById('wtw_twaterpositiony').value = request.waterpositiony;
					ipage.getElementById('wtw_talttag').value = request.alttag;
					ipage.getElementById('wtw_bsavecommunity').click();
				}
				/* iframe src, onload function */
				var iframe = WTW.createIFrame('/core/iframes/communities.php', onload);
				break;
			case -1:
				for (var i = 0; i < WTW.communities.length; i++) {
					if (WTW.communities[i] != null) {
						if (WTW.communities[i].communityinfo.communityid == communityid) {
							dGet('wtw_tcommunityname').value = WTW.decode(WTW.communities[i].communityinfo.communityname);
							dGet('wtw_tcommunityanalyticsid').value = WTW.communities[i].communityinfo.analyticsid;
							dGet('wtw_tcommunityalttag').value = WTW.decode(WTW.communities[i].alttag.name);
						}
					}
				}
				//need rollback on scene
				break;
		}
		WTW.hideAdminMenu();
		WTW.show('wtw_adminmenu24');
		WTW.setAdminTarget();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-submitCommunityForm=" + ex.message);
	}
}

WTWJS.prototype.submitBuildingForm = function(w) {
	try {
		if (dGet('wtw_tbuildingid').value == '') {
			dGet('wtw_tbuildingid').value = buildingid;
		}
		switch (w) {
			case 0:
				/* function for after iframe loads */
				var onload = function(ipage) {
					ipage.getElementById('wtw_tbuildingid').value = buildingid;
					ipage.getElementById('wtw_bdeletebuilding').click();
					WTW.deleteCookie("buildingid");
				}
				/* iframe src, onload function */
				var iframe = WTW.createIFrame('/core/iframes/buildings.php', onload);
				break;
			case 1: 
				for (var i = 0; i < WTW.buildings.length; i++) {
					if (WTW.buildings[i] != null) {
						if (WTW.buildings[i].buildinginfo.buildingid == dGet('wtw_tbuildingid').value) {
							WTW.buildings[i].buildinginfo.buildingname = WTW.encode(dGet('wtw_tbuildingname').value);
							WTW.buildings[i].buildinginfo.analyticsid = dGet('wtw_tbuildinganalyticsid').value;
							WTW.buildings[i].alttag.name = WTW.encode(dGet('wtw_tbuildingalttag').value);
							dGet('wtw_showbuildingname').innerHTML = dGet('wtw_tbuildingname').value;
						}
					}
				}
				for (var i = 0; i < WTW.buildingMolds.length; i++) {
					if (WTW.buildingMolds[i] != null) {
						if (WTW.buildingMolds[i].buildinginfo.buildingid == buildingid) {
							WTW.buildingMolds[i].graphics.texture.backupid = "";
						}
					}
				}
				var request = {
					'buildingname':WTW.encode(dGet('wtw_tbuildingname').value),
					'alttag':WTW.encode(dGet('wtw_tbuildingalttag').value),
					'analyticsid':dGet('wtw_tbuildinganalyticsid').value
				};
				/* function for after iframe loads */
				var onload = function(ipage) {
					ipage.getElementById('wtw_tbuildingid').value = buildingid;
					ipage.getElementById('wtw_tpastbuildingid').value = "";
					ipage.getElementById('wtw_tbuildingname').value = request.buildingname;
					ipage.getElementById('wtw_talttag').value = request.alttag;
					ipage.getElementById('wtw_tbuildinganalyticsid').value = request.analyticsid;
					ipage.getElementById('wtw_bsavebuilding').click();
				}
				/* iframe src, onload function */
				var iframe = WTW.createIFrame('/core/iframes/buildings.php', onload);
				break;
			case -1: 
				for (var i = 0; i < WTW.buildings.length; i++) {
					if (WTW.buildings[i] != null) {
					    if (WTW.buildings[i].buildinginfo.buildingid == dGet('wtw_tbuildingid').value) {
							dGet('wtw_tbuildingname').value = WTW.decode(WTW.buildings[i].buildinginfo.buildingname);
							dGet('wtw_tbuildinganalyticsid').value = WTW.buildings[i].buildinginfo.analyticsid;
							dGet('wtw_tbuildingalttag').value = WTW.decode(WTW.buildings[i].alttag.name);
						}
					}
				}
				break;
		}
		WTW.setAdminTarget();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-submitBuildingForm=" + ex.message);
	}
}

WTWJS.prototype.submitthingForm = function(w) {
	try {
		var validate = 1;
		switch (w) {
			case 0:
				var request = {
					'thingind':dGet('wtw_tthingind').value
				};
				/* function for after iframe loads */
				var onload = function(ipage) {
					ipage.getElementById('wtw_tthingid').value = thingid;
					ipage.getElementById('wtw_tthingind').value = request.thingind;
					ipage.getElementById('wtw_bdeletething').click();
					WTW.deleteCookie("thingid");
				}
				/* iframe src, onload function */
				var iframe = WTW.createIFrame('/core/iframes/things.php', onload);			
				break;
			case 1: 
				if (dGet('wtw_tthingname').value.trim().length == 0) {
					WTW.showInline('wtw_reqeditthingname');
					dGet('wtw_tthingname').focus();
					validate = 0;
				} else {
					WTW.hide('wtw_reqeditthingname');
				}
				if (validate == 1) {
					for (var i = 0; i < WTW.things.length; i++) {
						if (WTW.things[i] != null) {
						    if (WTW.things[i].thinginfo.thingid == dGet('wtw_tthingid').value) {
								WTW.things[i].thinginfo.thingname = dGet('wtw_tthingname').value;
								dGet('wtw_showbuildingname').innerHTML = dGet('wtw_tthingname').value;
							}
						}
					}
					var request = {
						'thingind':dGet('wtw_tthingind').value,
						'thingname':WTW.encode(dGet('wtw_tthingname').value),
						'analyticsid':dGet('wtw_tthinganalyticsid').value,
						'alttag':WTW.encode(dGet('wtw_tthingalttag').value)
					};
					/* function for after iframe loads */
					var onload = function(ipage) {
						ipage.getElementById('wtw_tthingid').value = thingid;
						ipage.getElementById('wtw_tthingind').value = request.thingind;
						ipage.getElementById('wtw_tpastthingid').value = "";
						ipage.getElementById('wtw_tthingname').value = request.thingname;
						ipage.getElementById('wtw_tthinganalyticsid').value = request.analyticsid;	
						ipage.getElementById('wtw_talttag').value = request.alttag;
						ipage.getElementById('wtw_bsavething').click();
					}
					/* iframe src, onload function */
					var iframe = WTW.createIFrame('/core/iframes/things.php', onload);			
				}
				break;
			case -1: 
				for (var i = 0; i < WTW.things.length; i++) {
					if (WTW.things[i] != null) {
					    if (WTW.things[i].thinginfo.thingid == dGet('wtw_tthingid').value) {
							dGet('wtw_tthingname').value = WTW.things[i].thinginfo.thingname;
							dGet('wtw_tthinganalyticsid').value = WTW.things[i].thinginfo.analytics;
							dGet('wtw_tthingalttag').value = WTW.decode(WTW.things[i].alttag.name);
						}
					}
				}
				validate = 1;
				break;
		}
		if (validate == 1) {
			WTW.hideAdminMenu();
			WTW.backToEdit();
		} 
		WTW.setAdminTarget();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-submitthingForm=" + ex.message);
	}
}

WTWJS.prototype.buildingSearchShowBuilding = function(newbuildingid) {
	try {
		WTW.setCookie("buildingid", newbuildingid, 30);
		window.location.href="/admin.php?buildingid=" + newbuildingid + "&hmenu=5&newbuilding=1";
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-buildingSearchShowBuilding=" + ex.message);
	}
}

WTWJS.prototype.thingSearchShowThing = function(newthingid) {
	try {
		window.location.href="/admin.php?thingid=" + newthingid + "&hmenu=35&newthing=1";
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-thingSearchShowThing=" + ex.message);
	}
}

WTWJS.prototype.communitySearchShowCommunity = function(newcommunityid) {
	try {
		window.location.href="/admin.php?communityid=" + newcommunityid + "&hmenu=25&newcommunity=1";
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-communitySearchShowCommunity=" + ex.message);
	}
}

WTWJS.prototype.copyMyThing = function() {
	try {
		dGet('wtw_tthingind').value = "-1";
		var thingname = WTW.encode(dGet('wtw_tthingname').value);
		if (thingname == "") {
			thingname = WTW.getThingName(thingid);
		}
		if (thingname != "") {
			WTW.copyThing(thingid, thingname + " - Copy");
		} else {
			WTW.copyThing(thingid, "New 3D Thing - Copy");
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-copyMyThing=" + ex.message);
	}
}

WTWJS.prototype.copyMyBuilding = function() {
	try {
		var buildingname = WTW.encode(dGet('wtw_tbuildingname').value);
		if (buildingname == "") {
			buildingname = WTW.getBuildingName(buildingid);
		}
		if (buildingname != "") {
			WTW.copyBuilding(buildingid, buildingname + " - Copy");
		} else {
			WTW.copyBuilding(buildingid, "New 3D Building - Copy");
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-copyMyBuilding=" + ex.message);
	}
}

WTWJS.prototype.copyMyCommunity = function() {
	try {
		dGet('wtw_tcommunityind').value = "-1";
		var communityname = WTW.encode(dGet('wtw_tcommunityname').value);
		if (communityname == "") {
			communityname = WTW.getCommunityName(communityid);
		}
		if (communityname != "") {
			WTW.copyCommunity(communityid, communityname + " - Copy");
		} else {
			WTW.copyCommunity(communityid, "New 3D Community - Copy");
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-copyMyCommunity=" + ex.message);
	}
}

WTWJS.prototype.copyThing = function(zcopythingid, zthingname) {
	try {
		if (zthingname != "" && dGet('wtw_tthingname').value == "") {
			dGet('wtw_tthingname').value = zthingname;
		} else if (dGet('wtw_tthingname').value == "") {
			dGet('wtw_tthingname').value = "New 3D Thing";
		}
		var request = {
			'copythingid':zcopythingid,
			'thingind':dGet('wtw_tthingind').value,
			'thingname':WTW.encode(dGet('wtw_tthingname').value)
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tthingid').value = "";
			ipage.getElementById('wtw_tthingind').value = request.thingind;
			ipage.getElementById('wtw_tpastthingid').value = request.copythingid;
			ipage.getElementById('wtw_tthingname').value = request.thingname;
			ipage.getElementById('wtw_talttag').value = "";
			ipage.getElementById('wtw_tthinganalyticsid').value = "";
			ipage.getElementById('wtw_bsavethingcopy').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/things.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-copyThing=" + ex.message);
	}
}

WTWJS.prototype.copyBuilding = function(zcopybuildingid, zbuildingname) {
	try {
		if (zbuildingname != "" && dGet('wtw_tbuildingname').value == "") {
			dGet('wtw_tbuildingname').value = zbuildingname;
		} else if (dGet('wtw_tbuildingname').value == "") {
			dGet('wtw_tbuildingname').value = "New 3D Building";
		}
		var request = {
			'copybuildingid':zcopybuildingid,
			'buildingname':dGet('wtw_tbuildingname').value
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tbuildingid').value = "";
			ipage.getElementById('wtw_tpastbuildingid').value = request.copybuildingid;
			ipage.getElementById('wtw_tbuildingname').value = request.buildingname;
			ipage.getElementById('wtw_talttag').value = "";
			ipage.getElementById('wtw_tbuildinganalyticsid').value = "";
			ipage.getElementById('wtw_bsavebuildingcopy').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/buildings.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-copyBuilding=" + ex.message);
	}
}

WTWJS.prototype.copyCommunity = function(zcopycommunityid, zcommunityname) {
	try {
		if (zcommunityname != "" && dGet('wtw_tcommunityname').value == "") {
			dGet('wtw_tcommunityname').value = zcommunityname;
		} else if (dGet('wtw_tcommunityname').value == "") {
			dGet('wtw_tcommunityname').value = "New 3D Community";
		}
		if (dGet('wtw_tgroundpositiony').value == "" || WTW.isNumeric(dGet('wtw_tgroundpositiony').value) == false) {
			dGet('wtw_tgroundpositiony').value = "0.00";
		}
		if (dGet('wtw_twaterpositiony').value == "" || WTW.isNumeric(dGet('wtw_twaterpositiony').value) == false) {
			dGet('wtw_twaterpositiony').value = "-1.00";
		}
		var request = {
			'communityind':dGet('wtw_tcommunityind').value,
			'copycommunityid':zcopycommunityid,
			'communityname':dGet('wtw_tcommunityname').value,
			'groundpositiony':dGet('wtw_tgroundpositiony').value,
			'waterpositiony':dGet('wtw_twaterpositiony').value
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tcommunityid').value = "";
			ipage.getElementById('wtw_tcommunityind').value = request.communityind;
			ipage.getElementById('wtw_tpastcommunityid').value = request.copycommunityid;
			ipage.getElementById('wtw_tcommunityname').value = request.communityname;
			ipage.getElementById('wtw_talttag').value = "";
			ipage.getElementById('wtw_tcommunityanalyticsid').value = "";
			ipage.getElementById('wtw_tgroundpositiony').value = request.groundpositiony;
			ipage.getElementById('wtw_twaterpositiony').value = request.waterpositiony;
			ipage.getElementById('wtw_bsavecommunitycopy').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/communities.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-copyCommunity=" + ex.message);
	}
}

WTWJS.prototype.openNewWeb = function(zthingid, zbuildingid, zcommunityid) {
	try {
		if (zthingid != "") {
			window.setTimeout(function() {
				WTW.setCookie("thingid", zthingid, 30);
				window.location.href="/admin.php?thingid=" + zthingid + "&hmenu=35&newthing=1";
			}, 2000);  
		} else if (zbuildingid != "") {
			window.setTimeout(function() {
				WTW.setCookie("buildingid", zbuildingid, 30);
				window.location.href="/admin.php?buildingid=" + zbuildingid + "&hmenu=5&newbuilding=1";
			}, 2000);  
		} else if (zcommunityid != "") {
			window.setTimeout(function() {
				WTW.setCookie("communityid", zcommunityid, 30);
				window.location.href="admin.php?communityid=" + zcommunityid + "&hmenu=25&newcommunity=1";
			}, 2000); 
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openNewWeb=" + ex.message);
	} 
}

WTWJS.prototype.copyThingComplete = function(zthingid) {
	try {
		window.setTimeout(function() {
			if (zthingid != "" && zthingid != thingid) {
				WTW.setCookie("thingid", zthingid, 30);
				window.location.href="/admin.php?thingid=" + zthingid + "&hmenu=35&newthing=1";
			} else {
				WTW.setCookie("thingid", thingid, 30);
				window.location.href="/admin.php?thingid=" + thingid + "&hmenu=35&newthing=1";
			}
		}, 2000);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-copyThingComplete=" + ex.message);
	} 
}

WTWJS.prototype.copyBuildingComplete = function(zbuildingid) {
	try {
		window.setTimeout(function() {
			if (zbuildingid != "" && zbuildingid != buildingid) {
				WTW.setCookie("buildingid", zbuildingid, 30);
				window.location.href="/admin.php?buildingid=" + zbuildingid + "&hmenu=5&newbuilding=1";
			} else {
				WTW.setCookie("buildingid", buildingid, 30);
				window.location.href="/admin.php?buildingid=" + buildingid + "&hmenu=5&newbuilding=1";
			}
		}, 2000);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-copyBuildingComplete=" + ex.message);
	} 
}

WTWJS.prototype.copyCommunityComplete = function(zcommunityid) {
	try {
		window.setTimeout(function() {
			if (zcommunityid != "" && zcommunityid != communityid) {
				WTW.setCookie("communityid", zcommunityid, 30);
				window.location.href="/admin.php?communityid=" + zcommunityid + "&hmenu=25&newcommunity=1";
			}
		}, 2000);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-copyCommunityComplete=" + ex.message);
	} 
}

WTWJS.prototype.setStartPosition = function(zcommunityid, zbuildingid, zthingid) {
	try {
		if (WTW.myAvatar!= null) {
			var iframe = null;
			var ipage = null;
			var request = {
				'positionx':WTW.myAvatar.position.x,
				'positiony':WTW.myAvatar.position.y,
				'positionz':WTW.myAvatar.position.z,
				'rotationx':WTW.cameraYOffset,
				'rotationy':WTW.getDegrees(WTW.myAvatar.rotation.y),
				'rotationz':WTW.getDegrees(WTW.myAvatar.rotation.z)
			}
			if (zcommunityid != "") {
				/* function for after iframe loads */
				var onload = function(ipage) {
					ipage.getElementById('wtw_tcommunityid').value = zcommunityid;
					ipage.getElementById('wtw_tstartpositionx').value = request.positionx;
					ipage.getElementById('wtw_tstartpositiony').value = request.positiony;
					ipage.getElementById('wtw_tstartpositionz').value = request.positionz;
					ipage.getElementById('wtw_tstartscalingx').value = 1; 
					ipage.getElementById('wtw_tstartscalingy').value = 1; 
					ipage.getElementById('wtw_tstartscalingz').value = 1; 
					ipage.getElementById('wtw_tstartrotationx').value = request.rotationx;
					ipage.getElementById('wtw_tstartrotationy').value = request.rotationy;
					ipage.getElementById('wtw_tstartrotationz').value = request.rotationz;
					ipage.getElementById('wtw_bsavestartposition').click();		
				}
				/* iframe src, onload function */
				var iframe = WTW.createIFrame('/core/iframes/communities.php', onload);
			} else if (zbuildingid != "") {
				/* function for after iframe loads */
				var onload = function(ipage) {
					ipage.getElementById('wtw_tbuildingid').value = zbuildingid;
					ipage.getElementById('wtw_tstartpositionx').value = request.positionx;
					ipage.getElementById('wtw_tstartpositiony').value = request.positiony;
					ipage.getElementById('wtw_tstartpositionz').value = request.positionz;
					ipage.getElementById('wtw_tstartscalingx').value = 1; 
					ipage.getElementById('wtw_tstartscalingy').value = 1; 
					ipage.getElementById('wtw_tstartscalingz').value = 1; 
					ipage.getElementById('wtw_tstartrotationx').value = request.rotationx;
					ipage.getElementById('wtw_tstartrotationy').value = request.rotationy;
					ipage.getElementById('wtw_tstartrotationz').value = request.rotationz;
					ipage.getElementById('wtw_bsavestartposition').click();		
				}
				/* iframe src, onload function */
				var iframe = WTW.createIFrame('/core/iframes/buildings.php', onload);
			} else if (zthingid != "") {
				/* function for after iframe loads */
				var onload = function(ipage) {
					ipage.getElementById('wtw_tthingid').value = zthingid;
					ipage.getElementById('wtw_tstartpositionx').value = request.positionx;
					ipage.getElementById('wtw_tstartpositiony').value = request.positiony;
					ipage.getElementById('wtw_tstartpositionz').value = request.positionz;
					ipage.getElementById('wtw_tstartscalingx').value = 1; 
					ipage.getElementById('wtw_tstartscalingy').value = 1; 
					ipage.getElementById('wtw_tstartscalingz').value = 1; 
					ipage.getElementById('wtw_tstartrotationx').value = request.rotationx;
					ipage.getElementById('wtw_tstartrotationy').value = request.rotationy;
					ipage.getElementById('wtw_tstartrotationz').value = request.rotationz;
					ipage.getElementById('wtw_bsavestartposition').click();		
				}
				/* iframe src, onload function */
				var iframe = WTW.createIFrame('/core/iframes/things.php', onload);
			}
			dGet('wtw_startsaved').style.visibility = "visible";
			window.setTimeout(function(){
				dGet('wtw_startsaved').style.visibility = "hidden";
			}, 3000);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setStartPosition=" + ex.message);
	}
}

WTWJS.prototype.saveGravity = function() {
	try {
		var request = {
			'gravity':WTW.init.gravity
		};
		if (communityid != "") {
			/* function for after iframe loads */
			var onload = function(ipage) {
				ipage.getElementById('wtw_tcommunityid').value = communityid;
				ipage.getElementById('wtw_tgravity').value = request.gravity;
				ipage.getElementById('wtw_bsavegravity').click();
			}
			/* iframe src, onload function */
			var iframe = WTW.createIFrame('/core/iframes/communities.php', onload);
		} else if (buildingid != "") {
			/* function for after iframe loads */
			var onload = function(ipage) {
				ipage.getElementById('wtw_tbuildingid').value = buildingid;
				ipage.getElementById('wtw_tgravity').value = request.gravity;
				ipage.getElementById('wtw_bsavegravity').click();
			}
			/* iframe src, onload function */
			var iframe = WTW.createIFrame('/core/iframes/buildings.php', onload);
		} else if (thingid != "") {
			/* function for after iframe loads */
			var onload = function(ipage) {
				ipage.getElementById('wtw_tthingid').value = thingid;
				ipage.getElementById('wtw_tgravity').value = request.gravity;
				ipage.getElementById('wtw_bsavegravity').click();
			}
			/* iframe src, onload function */
			var iframe = WTW.createIFrame('/core/iframes/things.php', onload);
		}		
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-saveGravity=" + ex.message);
	}
}

WTWJS.prototype.setGravity = function() {
	try {
		if (WTW.isNumeric(dGet('wtw_tcommgravity').value)) {
			if (Number(dGet('wtw_tcommgravity').value) != 0) {
				scene.gravity = new BABYLON.Vector3(0, -Number(dGet('wtw_tcommgravity').value), 0);
				WTW.camera.applyGravity = true;
			} else {
				scene.gravity = new BABYLON.Vector3(0, 0, 0);
				WTW.camera.applyGravity = false;
			}
		} else {
			scene.gravity = new BABYLON.Vector3(0, 0, 0);
			WTW.camera.applyGravity = false;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setGravity=" + ex.message);
	}
}

WTWJS.prototype.getLoadActionZoneID = function(actionzonenamepart) {
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
        WTW.log("core-scripts-admin-wtw_admineditor.js-getLoadActionZoneID=" + ex.message);
    }
	return loadactionzoneid;
}

WTWJS.prototype.openMoldForm = function(moldind, shape, moldgroup, saveprevious) {
	try { 
		var molds;
		if (typeof saveprevious === "undefined") {  
			saveprevious = true;
		}
		switch (moldgroup) {
			case "community":
				molds = WTW.communitiesMolds;
				break;
			case "thing":
				molds = WTW.thingMolds;
				break;
			default:
				molds = WTW.buildingMolds;
				break;
		}
		var testmoldid = "";
		if (molds[moldind] != null) {
			testmoldid = molds[moldind].moldid;
		}
		if (dGet("wtw_tmoldid").value != "" && dGet("wtw_tmoldid").value != testmoldid && saveprevious != false) {
			WTW.submitMoldForm(1);
		}
		WTW.getMoldList();
		WTW.getWebMoldList();
		if (shape == "") {
			shape = "box";
		}
		WTW.getCoveringList(shape);
		WTW.hideAdminMenu();
		WTW.show('wtw_adminmenu11');
		WTW.show('wtw_adminmenu11b');
		if (dGet('wtw_adminmenubutton').style.left == "0px") {
			WTW.toggleAdminMenu('wtw_adminmenubutton');
		}
		WTW.setMoldFormFields(shape);
		dGet('wtw_tmoldshape').value = shape;
		dGet('wtw_tmoldmoldgroup').value = moldgroup;
		if (molds[moldind] != null) {
			try {
				WTW.moldBackup = JSON.parse(JSON.stringify(molds[moldind]));
			} catch(ex) {}
			
			WTW.loadMoldForm(molds[moldind]);
			switch (moldgroup) {
				case "community":
					dGet('wtw_tcommunityind').value = 0;
					break;
				case "building":
					dGet('wtw_teditbuildingind').value = 0;
					break;
				case "thing":
					dGet('wtw_tthingind').value = 0;
					break;
				default:
					break;
			}
			WTW.setCoveringFormFields(molds[moldind].covering);
			dGet('wtw_tmolduploadobjectid').value = molds[moldind].object.uploadobjectid;
			dGet('wtw_tmoldobjectfolder').value = molds[moldind].object.folder;
			dGet('wtw_tmoldobjectfile').value = molds[moldind].object.file;
			if (molds[moldind].graphics.receiveshadows == '1') {
				dGet('wtw_tmoldreceiveshadows').checked = true;
			} else {
				dGet('wtw_tmoldreceiveshadows').checked = false;
			}
			if (molds[moldind].graphics.level == '1') {
				dGet('wtw_tmoldgraphiclevel').checked = true;
			} else {
				dGet('wtw_tmoldgraphiclevel').checked = false;
			}
			dGet('wtw_tmoldvideoid').value = molds[moldind].graphics.texture.videoid;
			dGet('wtw_tmoldvideopath').value = molds[moldind].graphics.texture.video;
			dGet('wtw_tmoldvideoposterid').value = molds[moldind].graphics.texture.videoposterid;
			dGet('wtw_tmoldvideoposterpath').value = molds[moldind].graphics.texture.videoposter;
			dGet('wtw_tmoldheightmapid').value = molds[moldind].graphics.heightmap.id;
			dGet('wtw_tmoldheightmappath').value = molds[moldind].graphics.heightmap.path;
			dGet('wtw_tmoldmixmapid').value = molds[moldind].graphics.heightmap.mixmapid;
			dGet('wtw_tmoldmixmappath').value = molds[moldind].graphics.heightmap.mixmappath;
			dGet('wtw_tmoldtexturerid').value = molds[moldind].graphics.heightmap.texturerid;
			dGet('wtw_tmoldtexturerpath').value = molds[moldind].graphics.heightmap.texturerpath;
			dGet('wtw_tmoldtexturegid').value = molds[moldind].graphics.heightmap.texturegid;
			dGet('wtw_tmoldtexturegpath').value = molds[moldind].graphics.heightmap.texturegpath;
			dGet('wtw_tmoldtexturebid').value = molds[moldind].graphics.heightmap.texturebid;
			dGet('wtw_tmoldtexturebpath').value = molds[moldind].graphics.heightmap.texturebpath;
			dGet('wtw_tmoldtexturebumprid').value = molds[moldind].graphics.heightmap.texturebumprid;
			dGet('wtw_tmoldtexturebumprpath').value = molds[moldind].graphics.heightmap.texturebumprpath;
			dGet('wtw_tmoldtexturebumpgid').value = molds[moldind].graphics.heightmap.texturebumpgid;
			dGet('wtw_tmoldtexturebumpgpath').value = molds[moldind].graphics.heightmap.texturebumpgpath;
			dGet('wtw_tmoldtexturebumpbid').value = molds[moldind].graphics.heightmap.texturebumpbid;
			dGet('wtw_tmoldtexturebumpbpath').value = molds[moldind].graphics.heightmap.texturebumpbpath;
			dGet('wtw_tmoldsoundid').value = molds[moldind].sound.id;
			dGet('wtw_tmoldsoundpath').value = molds[moldind].sound.path;
			dGet('wtw_tmoldsoundname').value = molds[moldind].sound.name;
			dGet('wtw_soundicon').alt = molds[moldind].sound.name;
			dGet('wtw_soundicon').title = molds[moldind].sound.name;
			dGet('wtw_selectedsound').innerHTML = molds[moldind].sound.name;
			WTW.setDDLValue("wtw_tmoldsoundattenuation", molds[moldind].sound.attenuation);
			WTW.setSoundFields();
			if (molds[moldind].sound.loop == '1') {
				dGet('wtw_tmoldsoundloop').checked = true;
				dGet('wtw_tmoldvideoloop').checked = true;
			} else {
				dGet('wtw_tmoldsoundloop').checked = false;
				dGet('wtw_tmoldvideoloop').checked = false;
			}
			dGet('wtw_tmoldvideomaxdistance').value = molds[moldind].sound.maxdistance;
			dGet('wtw_tmoldsoundmaxdistance').value = molds[moldind].sound.maxdistance;
			dGet('wtw_tmoldsoundrollofffactor').value = molds[moldind].sound.rollofffactor;
			dGet('wtw_tmoldsoundrefdistance').value = molds[moldind].sound.refdistance;
			dGet('wtw_tmoldsoundconeinnerangle').value = molds[moldind].sound.coneinnerangle;
			dGet('wtw_tmoldsoundconeouterangle').value = molds[moldind].sound.coneouterangle;
			dGet('wtw_tmoldsoundconeoutergain').value = molds[moldind].sound.coneoutergain;
			WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
			WTW.setPreviewImage('wtw_moldtexturebumppreview', 'wtw_tmoldtexturebumppath', 'wtw_tmoldtexturebumpid');
			WTW.setPreviewImage('wtw_moldheightmappreview', 'wtw_tmoldheightmappath', 'wtw_tmoldheightmapid');
			WTW.setPreviewImage('wtw_moldmixmappreview', 'wtw_tmoldmixmappath', 'wtw_tmoldmixmapid');
			WTW.setPreviewImage('wtw_moldtexturerpreview', 'wtw_tmoldtexturerpath', 'wtw_tmoldtexturerid');
			WTW.setPreviewImage('wtw_moldtexturegpreview', 'wtw_tmoldtexturegpath', 'wtw_tmoldtexturegid');
			WTW.setPreviewImage('wtw_moldtexturebpreview', 'wtw_tmoldtexturebpath', 'wtw_tmoldtexturebid');
			WTW.setPreviewImage('wtw_moldtexturebumprpreview', 'wtw_tmoldtexturebumprpath', 'wtw_tmoldtexturebumprid');
			WTW.setPreviewImage('wtw_moldtexturebumpgpreview', 'wtw_tmoldtexturebumpgpath', 'wtw_tmoldtexturebumpgid');
			WTW.setPreviewImage('wtw_moldtexturebumpbpreview', 'wtw_tmoldtexturebumpbpath', 'wtw_tmoldtexturebumpbid');
			if (shape == "3dtext") {
				dGet('wtw_tmoldwebtext').value = molds[moldind].webtext.webtext;
				dGet('wtw_tmoldwebstyle').value = molds[moldind].webtext.webstyle;
				var webstyle = dGet('wtw_tmoldwebstyle').value;
				var webtextalign = 'center';
				var webtextheight = 6;
				var webtextthick = 1;
				var webtextcolor = '#ff0000';
				var webtextdiffuse = '#f0f0f0';
				var webtextspecular = '#000000';
				var webtextambient = '#808080';
				if (webstyle.indexOf(',') > -1) {
					while (webstyle.indexOf('"') > -1) {
						webstyle = webstyle.replace('"','');
					}
					while (webstyle.indexOf('}') > -1) {
						webstyle = webstyle.replace('}','');
					}
					while (webstyle.indexOf('{') > -1) {
						webstyle = webstyle.replace('{','');
					}
					webstyle = webstyle.replace('colors:diffuse','diffuse');
					var styles = webstyle.split(',');
					for (var i=0;i<styles.length;i++) {
						if (styles[i].indexOf(':') > -1) {
							style = styles[i].split(':');
							switch (style[0]) {
								case 'anchor':
									webtextalign = style[1];
									break;
								case 'letter-height':
									webtextheight = Number(style[1]).toFixed(2);
									break;
								case 'letter-thickness':
									webtextthick = Number(style[1]).toFixed(2);
									break;
								case 'color':
									webtextcolor = style[1];
									break;
								case 'diffuse':
									webtextdiffuse = style[1];
									break;
								case 'specular':
									webtextspecular = style[1];
									break;
								case 'ambient':
									webtextambient = style[1];
									break;
							}
						}
					}
				}
				WTW.setDDLValue("wtw_tmoldwebtextalign", webtextalign);
				dGet('wtw_tmoldwebtextheight').value = webtextheight;
				dGet('wtw_tmoldwebtextthick').value = webtextthick;
				dGet('wtw_tmoldwebtextcolor').value = webtextcolor;
				dGet('wtw_tmoldwebtextdiffuse').value = webtextdiffuse;
				dGet('wtw_tmoldwebtextspecular').value = webtextspecular;
				dGet('wtw_tmoldwebtextambient').value = webtextambient;
			}
			dGet('wtw_tmoldimageind').value = "-1";
			if (shape == "image" && molds[moldind].graphics.webimages[0] != undefined) {
				dGet('wtw_tmoldimageind').value = "0";
				var imageid = "t1qlqxd6pzubzzzy";
				var imagehoverid = "t1qlqxd6pzubzzzy";
				var imageclickid = "t1qlqxd6pzubzzzy";
				if (molds[moldind].graphics.webimages[0].imageid != "") {
					imageid = molds[moldind].graphics.webimages[0].imageid;
				}
				if (molds[moldind].graphics.webimages[0].imagehoverid != "") {
					imagehoverid = molds[moldind].graphics.webimages[0].imagehoverid;
				}
				if (molds[moldind].graphics.webimages[0].imageclickid != "") {
					imageclickid = molds[moldind].graphics.webimages[0].imageclickid;
				}
				dGet('wtw_tmoldimagejsfunction').value = molds[moldind].graphics.webimages[0].jsfunction;
				dGet('wtw_tmoldimagejsparameters').value = molds[moldind].graphics.webimages[0].jsparameters;
				dGet('wtw_tmoldaddimageid').value = imageid;
				dGet('wtw_tmoldaddimagehoverid').value = imagehoverid;				
				dGet('wtw_tmoldaddimageclickid').value = imageclickid;	
				if (dGet('wtw_tmoldaddimageid').value != "") {
					WTW.getJSON("/connect/upload.php?uploadid=" + dGet('wtw_tmoldaddimageid').value, 
						function(response) {
							WTW.loadUpload(JSON.parse(response),dGet('wtw_tmoldaddimageid').value,0);
							var imageinfo = WTW.getUploadFileData(dGet('wtw_tmoldaddimageid').value);
							imageinfo.image.onload = function() {	
								dGet('wtw_moldaddimagepreview').src = imageinfo.filedata;
							}
						}
					);
				}
				if (dGet('wtw_tmoldaddimagehoverid').value != "") {
					WTW.getJSON("/connect/upload.php?uploadid=" + dGet('wtw_tmoldaddimagehoverid').value, 
						function(response) {
							WTW.loadUpload(JSON.parse(response),dGet('wtw_tmoldaddimagehoverid').value,0);
							var imageinfo = WTW.getUploadFileData(dGet('wtw_tmoldaddimagehoverid').value);
							imageinfo.image.onload = function() {	
								dGet('wtw_moldaddimagehoverpreview').src = imageinfo.filedata;
							}
						}
					);
				}
				if (molds[moldind].graphics.webimages[0].jsfunction == "WTW.openWebpage") {
					dGet("wtw_tmoldaddonclick").selectedIndex = 2;
				} else if (molds[moldind].graphics.webimages[0].jsfunction == "WTW.openIFrame") {
					dGet("wtw_tmoldaddonclick").selectedIndex = 1;
				} else if (molds[moldind].graphics.webimages[0].jsfunction != "") {
					dGet("wtw_tmoldaddonclick").selectedIndex = 3;
				} else {
					dGet("wtw_tmoldaddonclick").selectedIndex = 0;
				}
				WTW.changeOnClickEvent(dGet("wtw_tmoldaddonclick"));
			} else if (shape == "image") {
				dGet('wtw_tmoldimageind').value = "0";
			} else if (shape == "tube") {
				WTW.loadPointList(molds[moldind].paths.path1, 1);
			} else if (shape == "line") {
				WTW.loadPointList(molds[moldind].paths.path1, 1);
			}	 
			for (var i=0;i < WTW.moldList.length;i++) {
				if (WTW.moldList[i] != null) {
					var moldvalue = WTW.moldList[i].toLowerCase();
					while (moldvalue.indexOf(" ") > -1) {
						moldvalue = moldvalue.replace(" ","");
					}
					if (shape == moldvalue) {
						WTW.checkMoldTextureCSG();
					}
				}
			}
			dGet('wtw_selectedcsgshape').innerHTML = "";
			if (dGet('wtw_tmoldcsgaction').selectedIndex != 0) {
				var csgmoldind = -1;
				csgmoldind = WTW.getMoldInd(molds, molds[moldind].csg.moldid, dGet('wtw_tconnectinggridind').value);
				if (molds[csgmoldind] != null) {
					var csgmainname = molds[csgmoldind].moldname;
					dGet('wtw_selectedcsgshape').innerHTML += "<div class='wtw-secondcolcontent' onmouseover=\"WTW.hilightActionZonePart('" + csgmainname + "');\" onmouseout=\"WTW.unHilightActionZonePart();\">Merge with (" + molds[csgmoldind].shape + ") &nbsp;&nbsp;&nbsp;&nbsp; <a href='#' onclick=\"WTW.removeMerge('" + csgmainname + "')\">Remove</a></div><br /><br />";
				}
			}
			var mold = scene.getMeshByID(molds[moldind].moldname);
			if (mold != null) {
				WTW.openEditPoles(mold);
			}
			WTW.pluginsOpenMoldForm(molds[moldind].moldname);
		}
		dGet('wtw_tmoldpositionz').focus();
		WTW.setWindowSize();
		WTW.setNewMold(1);
		/* WTW.resetMoldsOpacity(); */
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openMoldForm=" + ex.message);
	}
}		

WTWJS.prototype.loadMoldForm = function(molddef) {
	try {
		var moldgroup = "";
		var shape = molddef.shape;
		if (molddef.moldname.indexOf("communitymolds") > -1) {
			moldgroup = "community";
		} else if (molddef.moldname.indexOf("buildingmolds") > -1) {
			moldgroup = "building";
		} else if (molddef.moldname.indexOf("thingmolds") > -1) {
			moldgroup = "thing";
		}
		switch (moldgroup) {
			case "community":
				dGet('wtw_tcommunityind').value = molddef.communityinfo.communityind;
				break;
			case "building":
				dGet('wtw_teditbuildingind').value = molddef.buildinginfo.buildingind;
				break;
			case "thing":
				dGet('wtw_tthingind').value = molddef.thinginfo.thingind;
				break;
		}
		WTW.getCoveringList(shape);
		WTW.getLoadActionZoneList(molddef.loadactionzoneid);
		WTW.getLoadZoneList(molddef.loadactionzoneid);
		dGet('wtw_tmoldid').value = molddef.moldid;
		dGet('wtw_tmoldind').value = molddef.moldind;
		dGet('wtw_tmoldshape').value = molddef.shape;
		dGet('wtw_tmoldmoldgroup').value = moldgroup;
		dGet('wtw_tmoldname').value = molddef.moldname;
		dGet('wtw_teditpointindex').value = "";
		dGet('wtw_tmoldpath1points').value = "";
		dGet('wtw_tmoldpath2points').value = "";
		dGet('wtw_tmoldcoveringold').value = molddef.covering;
		dGet('wtw_tmoldpositionx').value = molddef.position.x;
		dGet('wtw_tmoldpositiony').value = molddef.position.y;
		dGet('wtw_tmoldpositionz').value = molddef.position.z;
		dGet('wtw_tmoldscalingx').value = molddef.scaling.x;
		dGet('wtw_tmoldscalingy').value = molddef.scaling.y;
		dGet('wtw_tmoldscalingz').value = molddef.scaling.z;
		dGet('wtw_tmoldrotationx').value = molddef.rotation.x;
		dGet('wtw_tmoldrotationy').value = molddef.rotation.y;
		dGet('wtw_tmoldrotationz').value = molddef.rotation.z;
		dGet('wtw_tmoldspecial1').value = molddef.scaling.special1;
		dGet('wtw_tmoldspecial2').value = molddef.scaling.special2;
		dGet('wtw_tmolduploadobjectid').value = molddef.object.uploadobjectid;
		dGet('wtw_tmoldobjectfolder').value = molddef.object.folder;
		dGet('wtw_tmoldobjectfile').value = molddef.object.file;
		if (molddef.graphics.receiveshadows == '1') {
			dGet('wtw_tmoldreceiveshadows').checked = true;
		} else {
			dGet('wtw_tmoldreceiveshadows').checked = false;
		}
		if (molddef.graphics.level == '1') {
			dGet('wtw_tmoldgraphiclevel').checked = true;
		} else {
			dGet('wtw_tmoldgraphiclevel').checked = false;
		}
		dGet('wtw_tmoldtextureid').value = molddef.graphics.texture.id;
		dGet('wtw_tmoldtexturepath').value = molddef.graphics.texture.path;
		dGet('wtw_tmoldtexturebumpid').value = molddef.graphics.texture.bumpid;
		dGet('wtw_tmoldtexturebumppath').value = molddef.graphics.texture.bumppath;
		dGet('wtw_tmoldvideoid').value = molddef.graphics.texture.videoid;
		dGet('wtw_tmoldvideopath').value = molddef.graphics.texture.video;
		dGet('wtw_tmoldvideoposterid').value = molddef.graphics.texture.videoposterid;
		dGet('wtw_tmoldvideoposterpath').value = molddef.graphics.texture.videoposter;
		dGet('wtw_tmoldheightmapid').value = molddef.graphics.heightmap.id;
		dGet('wtw_tmoldheightmappath').value = molddef.graphics.heightmap.path;
		dGet('wtw_tmoldmixmapid').value = molddef.graphics.heightmap.mixmapid;
		dGet('wtw_tmoldmixmappath').value = molddef.graphics.heightmap.mixmappath;
		dGet('wtw_tmoldtexturerid').value = molddef.graphics.heightmap.texturerid;
		dGet('wtw_tmoldtexturerpath').value = molddef.graphics.heightmap.texturerpath;
		dGet('wtw_tmoldtexturegid').value = molddef.graphics.heightmap.texturegid;
		dGet('wtw_tmoldtexturegpath').value = molddef.graphics.heightmap.texturegpath;
		dGet('wtw_tmoldtexturebid').value = molddef.graphics.heightmap.texturebid;
		dGet('wtw_tmoldtexturebpath').value = molddef.graphics.heightmap.texturebpath;
		dGet('wtw_tmoldtexturebumprid').value = molddef.graphics.heightmap.texturebumprid;
		dGet('wtw_tmoldtexturebumprpath').value = molddef.graphics.heightmap.texturebumprpath;
		dGet('wtw_tmoldtexturebumpgid').value = molddef.graphics.heightmap.texturebumpgid;
		dGet('wtw_tmoldtexturebumpgpath').value = molddef.graphics.heightmap.texturebumpgpath;
		dGet('wtw_tmoldtexturebumpbid').value = molddef.graphics.heightmap.texturebumpbid;
		dGet('wtw_tmoldtexturebumpbpath').value = molddef.graphics.heightmap.texturebumpbpath;
		dGet('wtw_tmoldsoundid').value = molddef.sound.id;
		dGet('wtw_tmoldsoundpath').value = molddef.sound.path;
		dGet('wtw_tmoldsoundname').value = molddef.sound.name;
		dGet('wtw_soundicon').alt = molddef.sound.name;
		dGet('wtw_soundicon').title = molddef.sound.name;
		dGet('wtw_selectedsound').innerHTML = molddef.sound.name;
		WTW.setDDLValue("wtw_tmoldsoundattenuation", molddef.sound.attenuation);
		if (molddef.sound.loop == '1') {
			dGet('wtw_tmoldsoundloop').checked = true;
			dGet('wtw_tmoldvideoloop').checked = true;
		} else {
			dGet('wtw_tmoldsoundloop').checked = false;
			dGet('wtw_tmoldvideoloop').checked = false;
		}
		dGet('wtw_tmoldsoundmaxdistance').value = molddef.sound.maxdistance;
		dGet('wtw_tmoldvideomaxdistance').value = molddef.sound.maxdistance;
		dGet('wtw_tmoldsoundrollofffactor').value = molddef.sound.rollofffactor;
		dGet('wtw_tmoldsoundrefdistance').value = molddef.sound.refdistance;
		dGet('wtw_tmoldsoundconeinnerangle').value = molddef.sound.coneinnerangle;
		dGet('wtw_tmoldsoundconeouterangle').value = molddef.sound.coneouterangle;
		dGet('wtw_tmoldsoundconeoutergain').value = molddef.sound.coneoutergain;
		dGet('wtw_tmoldmaxheight').value = molddef.graphics.heightmap.maxheight;
		dGet('wtw_tmolduoffset').value = molddef.graphics.uoffset;
		dGet('wtw_tmoldvoffset').value = molddef.graphics.voffset;
		dGet('wtw_tmolduscale').value = molddef.graphics.uscale;
		dGet('wtw_tmoldvscale').value = molddef.graphics.vscale;
		dGet('wtw_tmoldopacity').value = molddef.opacity;
		dGet('wtw_tmoldsubdivisions').value = molddef.subdivisions;
		dGet('wtw_tmoldactionzoneid').value = molddef.actionzoneid;
		dGet('wtw_tmoldcsgmoldid').value = molddef.csg.moldid;
		if (dGet('wtw_tmoldshape').value == '3dtext') {
			dGet('wtw_tmoldwebtext').value = WTW.decode(molddef.webtext.webtext);
		} else {
			dGet('wtw_tmoldwebtext').value = '';
		}
		dGet('wtw_tmoldwebstyle').value = molddef.webtext.webstyle;
		dGet('wtw_tmoldalttag').value = WTW.decode(molddef.alttag.name);
		dGet('wtw_tspecularcolorr').value = molddef.color.specular.r;
		dGet('wtw_tspecularcolorg').value = molddef.color.specular.g;
		dGet('wtw_tspecularcolorb').value = molddef.color.specular.b;
		dGet('wtw_temissivecolorr').value = molddef.color.emissive.r;
		dGet('wtw_temissivecolorg').value = molddef.color.emissive.g;
		dGet('wtw_temissivecolorb').value = molddef.color.emissive.b;
		dGet('wtw_tdiffusecolorr').value = molddef.color.diffuse.r;
		dGet('wtw_tdiffusecolorg').value = molddef.color.diffuse.g;
		dGet('wtw_tdiffusecolorb').value = molddef.color.diffuse.b;
		dGet('wtw_moldaddimagepreview').src = "";
		dGet('wtw_moldaddimagehoverpreview').src = "";
		dGet('wtw_pointlist1').innerHTML = "";
		dGet('wtw_pointlist2').innerHTML = "";
		WTW.setDDLValue("wtw_tmoldcovering", molddef.covering);
		WTW.setDDLValue("wtw_tmoldcsgaction", molddef.csg.action);
		WTW.setDDLValue("wtw_tmoldloadactionzoneid", molddef.loadactionzoneid);
		if (molddef.graphics.waterreflection == "1") {
			dGet('wtw_tmoldwaterreflection').checked = true;
		} else {
			dGet('wtw_tmoldwaterreflection').checked = false;
		}
		if (dGet('wtw_tmoldcsgmoldid').value != "") {
			dGet('wtw_bselectcsgshape').innerHTML = "Change Shape to Merge";
		} else {
			dGet('wtw_bselectcsgshape').innerHTML = "Pick Shape to Merge";
			WTW.setDDLValue("wtw_tmoldcsgaction", "");
		}
		WTW.pluginsLoadMoldForm(moldgroup, dGet('wtw_tmoldshape').value, dGet('wtw_tmoldname').value);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-loadMoldForm=" + ex.message);
	}
}

WTWJS.prototype.loadPointList = function(patharray, pathnumber) {
	try {
		var pointlist = "wtw_pointlist1";
		var pathpoints = "wtw_tmoldpath1points";
		var pathname = "Path 1";
		var pointind = -1;
		if (WTW.isNumeric(dGet('wtw_teditpointindex').value)) {
			pointind = Number(dGet('wtw_teditpointindex').value);
		}
		if (pathnumber == 2) {
			pointlist = "wtw_pointlist2";
			pathpoints = "wtw_tmoldpath2points";
			pathname = "Path 2";
		}
		dGet(pointlist).innerHTML = "<hr /><h4>" + pathname + " Points (x,y,z)</h4><div id=\"wtw_bpointadd-\" class=\"wtw-menulevel00 wtw-center\" onmousedown=\"WTW.addPoint(this);\" >Add Point</div>";
		if (patharray != null) {
			if (patharray.length > 0) {
				for (var i=0; i < patharray.length;i++) {
					if (patharray[i] != null) {
						if (pointind == i) {
							dGet(pointlist).innerHTML += "<div id=\"wtw_bpointedit-" + i + "\" class=\"wtw-menulevel0selected wtw-center\" onmousedown=\"WTW.editPoint(this);\"><span style='font-size:.8em;color:#c0c0c0;'>(" + patharray[i].x + ", " + patharray[i].y + ", " + patharray[i].z + ")</span> Edit</div>";
						} else {
							dGet(pointlist).innerHTML += "<div id=\"wtw_bpointedit-" + i + "\" class=\"wtw-menulevel0 wtw-center\" onmousedown=\"WTW.editPoint(this);\"><span style='font-size:.8em;color:#c0c0c0;'>(" + patharray[i].x + ", " + patharray[i].y + ", " + patharray[i].z + ")</span> Edit</div>";
						}
						dGet(pointlist).innerHTML += "<div id=\"wtw_bpointadd-" + i + "\" class=\"wtw-menulevel00 wtw-center\" onmousedown=\"WTW.addPoint(this);\" >Add Point</div>";
					}
				}
			}
			dGet(pathpoints).value = JSON.stringify(patharray);
		} else {
			dGet(pathpoints).value = "";
		}
		dGet(pointlist).innerHTML += "<hr /><br />";
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-loadPointList=" + ex.message);
	}
}

WTWJS.prototype.deletePoint = function() {
	try {
		var pointind = -1;
		var moldind = -1;
		var molds = null;
		switch (dGet('wtw_tmoldmoldgroup').value) {
			case "community":
				molds = WTW.communitiesMolds;
				break;
			case "building":
				molds = WTW.buildingMolds;
				break;
			case "thing":
				molds = WTW.thingMolds;
				break;
		}
		if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
			moldind = Number(dGet('wtw_tmoldind').value);
		}
		if (WTW.isNumeric(dGet('wtw_teditpointindex').value)) {
			pointind = Number(dGet('wtw_teditpointindex').value);
		}
		if (molds[moldind] != null && pointind > -1) {
			if (molds[moldind].paths.path1 != null) {
				if (molds[moldind].paths.path1[pointind] != null) {
					molds[moldind].paths.path1.splice(pointind, 1);
				}
				for (var i=0; i < molds[moldind].paths.path1.length;i++) {
					if (molds[moldind].paths.path1[i] != null) {
						molds[moldind].paths.path1[i].sorder = i;
					}
				}
			}
		}
		dGet('wtw_teditpointindex').value = "";
		WTW.setNewMold();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-deletePoint=" + ex.message);
	}
}

WTWJS.prototype.editPoint = function(obj) {
	try {
		dGet('wtw_tpointpositionx').value = "";
		dGet('wtw_tpointpositiony').value = "";
		dGet('wtw_tpointpositionz').value = "";
		var moldind = -1;
		var molds = null;
		switch (dGet('wtw_tmoldmoldgroup').value) {
			case "community":
				molds = WTW.communitiesMolds;
				break;
			case "building":
				molds = WTW.buildingMolds;
				break;
			case "thing":
				molds = WTW.thingMolds;
				break;
		}
		if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
			moldind = Number(dGet('wtw_tmoldind').value);
		}
		if (obj != null && molds != null) {
			if (obj.id.indexOf('-') > -1 && molds[moldind] != null) {
				var namepart = obj.id.split('-');
				if (namepart[1] != null) {
					dGet('wtw_teditpointindex').value = namepart[1];
					var pointind = -1;
					if (WTW.isNumeric(namepart[1])) {
						pointind = Number(namepart[1]);
					}
					if (molds[moldind].paths.path1[pointind] != null) {
						dGet('wtw_tpointpositionx').value = molds[moldind].paths.path1[pointind].x;
						dGet('wtw_tpointpositiony').value = molds[moldind].paths.path1[pointind].y;
						dGet('wtw_tpointpositionz').value = molds[moldind].paths.path1[pointind].z;
						
						WTW.show('wtw_pointeditdiv');
					}
				}
			}
		} 
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-editPoint=" + ex.message);
	}
}

WTWJS.prototype.addPoint = function(obj) {
	try {
		var moldind = -1;
		var molds = null;
		switch (dGet('wtw_tmoldmoldgroup').value) {
			case "community":
				molds = WTW.communitiesMolds;
				break;
			case "building":
				molds = WTW.buildingMolds;
				break;
			case "thing":
				molds = WTW.thingMolds;
				break;
		}
		if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
			moldind = Number(dGet('wtw_tmoldind').value);
		}
		if (obj != null && molds != null) {
			if (obj.id.indexOf('-') > -1 && molds[moldind] != null) {
				var pointind = -1;
				var namepart = obj.id.split('-');
				if (namepart[1] != null) {
					if (WTW.isNumeric(namepart[1])) {
						pointind = Number(namepart[1]);
					}
				}
				if (molds[moldind].paths.path1 != null) {
					var x = null;
					var y = null;
					var z = null;
					var x1 = null;
					var y1 = null;
					var z1 = null;
					var minx = null;
					var miny = null;
					var minz = null;
					var maxx = null;
					var maxy = null;
					var maxz = null;
					var newx = null;
					var newy = null;
					var newz = null;
					var maxind = molds[moldind].paths.path1.length - 1;
					for (var i = molds[moldind].paths.path1.length - 1 ; i >= 0 ; i--) {
						if (molds[moldind].paths.path1[i] != null) {
							if (i == 0 && minx == null) {
								minx = Number(molds[moldind].paths.path1[i].x);
								miny = Number(molds[moldind].paths.path1[i].y);
								minz = Number(molds[moldind].paths.path1[i].z);
							}
							if (i == molds[moldind].paths.path1.length - 1 && maxx == null) {
								maxx = Number(molds[moldind].paths.path1[i].x);
								maxy = Number(molds[moldind].paths.path1[i].y);
								maxz = Number(molds[moldind].paths.path1[i].z);
							}
							if (i == pointind) {
								x = Number(molds[moldind].paths.path1[i].x);
								y = Number(molds[moldind].paths.path1[i].y);
								z = Number(molds[moldind].paths.path1[i].z);
								molds[moldind].paths.path1[i + 1] = JSON.parse(JSON.stringify(molds[moldind].paths.path1[i]));
								molds[moldind].paths.path1[i + 1].sorder = i + 1;
							} else if (i > pointind) {
								if (i == pointind + 1) {
									x1 = Number(molds[moldind].paths.path1[i].x);
									y1 = Number(molds[moldind].paths.path1[i].y);
									z1 = Number(molds[moldind].paths.path1[i].z);
								}
								molds[moldind].paths.path1[i + 1] = JSON.parse(JSON.stringify(molds[moldind].paths.path1[i]));
								molds[moldind].paths.path1[i + 1].sorder = i + 1;
							}
						}
					}
					if (pointind == -1) {
						newx = minx;
						newy = miny;
						newz = minz;
					} else if (pointind == maxind) {
						newx = maxx;
						newy = maxy;
						newz = maxz;
					} else {
						if (x != null && x1 != null) {
							newx = (x + x1) / 2;
							newy = (y + y1) / 2;
							newz = (z + z1) / 2;
						} else if (x != null) {
							newx = x;
							newy = y;
							newz = z;
						} else if (x1 != null) {
							newx = x1;
							newy = y1;
							newz = z1;
						} else {
							var coords = WTW.getNewCoordinates(50);
							newx = coords.positionX;
							newy = coords.positionY;
							newz = coords.positionZ;
						}
					}
					pointind += 1;
					molds[moldind].paths.path1[pointind].x = newx;
					molds[moldind].paths.path1[pointind].y = newy;
					molds[moldind].paths.path1[pointind].z = newz;
					molds[moldind].paths.path1[pointind].sorder = pointind;
				} else {
					pointind = 0;
					var coords = WTW.getNewCoordinates(50);
					newx = coords.positionX;
					newy = coords.positionY;
					newz = coords.positionZ;
					molds[moldind].paths.path1[0] = WTW.newPathPoint();
					molds[moldind].paths.path1[0].x = newx;
					molds[moldind].paths.path1[0].y = newy;
					molds[moldind].paths.path1[0].z = newz;
					molds[moldind].paths.path1[0].sorder = 0;
				}
				dGet('wtw_teditpointindex').value = pointind;
				if (molds[moldind].paths.path1[pointind] != null) {
					dGet('wtw_tpointpositionx').value = molds[moldind].paths.path1[pointind].x;
					dGet('wtw_tpointpositiony').value = molds[moldind].paths.path1[pointind].y;
					dGet('wtw_tpointpositionz').value = molds[moldind].paths.path1[pointind].z;
					WTW.show('wtw_pointeditdiv');
				}
				
			}
		} 
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-addPoint=" + ex.message);
	}
}

WTWJS.prototype.editEndPoint = function() {
	try {
		dGet('wtw_teditpointindex').value = "";
		WTW.hide('wtw_pointeditdiv');
		dGet('wtw_tpointpositionx').value = "";
		dGet('wtw_tpointpositiony').value = "";
		dGet('wtw_tpointpositionz').value = "";
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-editEndPoint=" + ex.message);
	}
}

WTWJS.prototype.openAddNewMold = function(moldgroup, shape) {
	try {
		dGet('wtw_tnewmold').value = "1";
		WTW.setMoldFormFields(shape);
		WTW.getCoveringList(shape);
		var moldind = -1;
		var molds = WTW.buildingMolds;
		switch (moldgroup) {
			case "community":
			    moldind = WTW.getNextCount(WTW.communitiesMolds);
				molds = WTW.communitiesMolds;
				molds[moldind] = WTW.newMold();
				dGet('wtw_tthingind').value = "-1";
				dGet('wtw_tcommunityind').value= WTW.getCommunityInd(communityid);
				molds[moldind].communityinfo.communityid = communityid;
				molds[moldind].communityinfo.communityind = dGet('wtw_tcommunityind').value;
				break;
			case "thing":
			    moldind = WTW.getNextCount(WTW.thingMolds);
				molds = WTW.thingMolds;
				molds[moldind] = WTW.newMold();
				dGet('wtw_tthingind').value = WTW.getThingInd(thingid);
				dGet('wtw_tcommunityind').value= "-1";
				molds[moldind].thinginfo.thingid = thingid;
				molds[moldind].thinginfo.thingind = dGet('wtw_tthingind').value;
				break;
			default:
			    moldind = WTW.getNextCount(WTW.buildingMolds);
				molds = WTW.buildingMolds;
				molds[moldind] = WTW.newMold();
				dGet('wtw_tthingind').value = "-1";
				dGet('wtw_tcommunityind').value= "-1";
				molds[moldind].buildinginfo.buildingid = buildingid;
				molds[moldind].buildinginfo.buildingind = WTW.getBuildingInd(buildingid);
				break;
		}
		var loadactionzoneid = WTW.getLoadActionZoneID("normal");
		WTW.getLoadZoneList(loadactionzoneid);
		var moldid = WTW.getRandomString(16);
		molds[moldind].moldid = moldid;
		dGet('wtw_tmoldmoldgroup').value = moldgroup;
		dGet('wtw_tmoldshape').value = shape;
		dGet('wtw_tmoldind').value = moldind.toString();
		dGet('wtw_tmoldid').value = moldid.toString();
		WTW.show('wtw_moldtexturetitle');
		WTW.show('wtw_moldbumptexturetitle');
		WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
		WTW.setPreviewImage('wtw_moldtexturebumppreview', 'wtw_tmoldtexturebumppath', 'wtw_tmoldtexturebumpid');
		WTW.setPreviewImage('wtw_moldheightmappreview', 'wtw_tmoldheightmappath', 'wtw_tmoldheightmapid');
		WTW.setPreviewImage('wtw_moldmixmappreview', 'wtw_tmoldmixmappath', 'wtw_tmoldmixmapid');
		WTW.setPreviewImage('wtw_moldtexturerpreview', 'wtw_tmoldtexturerpath', 'wtw_tmoldtexturerid');
		WTW.setPreviewImage('wtw_moldtexturegpreview', 'wtw_tmoldtexturegpath', 'wtw_tmoldtexturegid');
		WTW.setPreviewImage('wtw_moldtexturebpreview', 'wtw_tmoldtexturebpath', 'wtw_tmoldtexturebid');
		WTW.setPreviewImage('wtw_moldtexturebumprpreview', 'wtw_tmoldtexturebumprpath', 'wtw_tmoldtexturebumprid');
		WTW.setPreviewImage('wtw_moldtexturebumpgpreview', 'wtw_tmoldtexturebumpgpath', 'wtw_tmoldtexturebumpgid');
		WTW.setPreviewImage('wtw_moldtexturebumpbpreview', 'wtw_tmoldtexturebumpbpath', 'wtw_tmoldtexturebumpbid');
		WTW.show('wtw_moldbasictextureset2div');
		molds[moldind].graphics.waterreflection = "0";
		var mold = null;
		WTW.setNewMoldDefaults(shape);
		var coveringname = dGet('wtw_tmoldcoveringold').value;
		molds[moldind].shape = shape;
		molds[moldind].covering = coveringname;
		molds[moldind].position.x = dGet('wtw_tmoldpositionx').value;
		molds[moldind].position.y = dGet('wtw_tmoldpositiony').value;
		molds[moldind].position.z = dGet('wtw_tmoldpositionz').value;
		molds[moldind].scaling.x = dGet('wtw_tmoldscalingx').value;
		molds[moldind].scaling.y = dGet('wtw_tmoldscalingy').value;
		molds[moldind].scaling.z = dGet('wtw_tmoldscalingz').value;
		molds[moldind].rotation.x = dGet('wtw_tmoldrotationx').value;
		molds[moldind].rotation.y = dGet('wtw_tmoldrotationy').value;
		molds[moldind].rotation.z = dGet('wtw_tmoldrotationz').value;
		molds[moldind].scaling.special1 = dGet('wtw_tmoldspecial1').value;
		molds[moldind].scaling.special2 = dGet('wtw_tmoldspecial2').value;
		molds[moldind].graphics.uoffset = dGet('wtw_tmolduoffset').value;
		molds[moldind].graphics.voffset = dGet('wtw_tmoldvoffset').value;
		molds[moldind].graphics.uscale = dGet('wtw_tmolduscale').value;
		molds[moldind].graphics.vscale = dGet('wtw_tmoldvscale').value;
		molds[moldind].opacity = dGet('wtw_tmoldopacity').value;
		molds[moldind].subdivisions = dGet('wtw_tmoldsubdivisions').value;
		molds[moldind].object.uploadobjectid = dGet('wtw_tmolduploadobjectid').value;
		molds[moldind].object.folder = dGet('wtw_tmoldobjectfolder').value;
		molds[moldind].object.file = dGet('wtw_tmoldobjectfile').value;
		molds[moldind].graphics.texture.backupid = "";
		if (dGet('wtw_tmoldreceiveshadows').checked == true) {
			molds[moldind].graphics.receiveshadows = '1';
		} else {
			molds[moldind].graphics.receiveshadows = '0';
		}
		if (dGet('wtw_tmoldgraphiclevel').checked == true) {
			molds[moldind].graphics.level = '1';
		} else {
			molds[moldind].graphics.level = '0';
		}
		molds[moldind].graphics.texture.id = dGet('wtw_tmoldtextureid').value;
		molds[moldind].graphics.texture.path = dGet('wtw_tmoldtexturepath').value;
		molds[moldind].graphics.texture.bumpid = dGet('wtw_tmoldtexturebumpid').value;
		molds[moldind].graphics.texture.bumppath = dGet('wtw_tmoldtexturebumppath').value;
		molds[moldind].graphics.texture.videoid = dGet('wtw_tmoldvideoid').value;
		molds[moldind].graphics.texture.videoposterid = dGet('wtw_tmoldvideoposterid').value;
		molds[moldind].graphics.heightmap.id = dGet('wtw_tmoldheightmapid').value;
		molds[moldind].graphics.heightmap.path = dGet('wtw_tmoldheightmappath').value;
		molds[moldind].graphics.heightmap.mixmapid = dGet('wtw_tmoldmixmapid').value;
		molds[moldind].graphics.heightmap.mixmappath = dGet('wtw_tmoldmixmappath').value;
		molds[moldind].graphics.heightmap.texturerid = dGet('wtw_tmoldtexturerid').value;
		molds[moldind].graphics.heightmap.texturerpath = dGet('wtw_tmoldtexturerpath').value;
		molds[moldind].graphics.heightmap.texturegid = dGet('wtw_tmoldtexturegid').value;
		molds[moldind].graphics.heightmap.texturegpath = dGet('wtw_tmoldtexturegpath').value;
		molds[moldind].graphics.heightmap.texturebid = dGet('wtw_tmoldtexturebid').value;
		molds[moldind].graphics.heightmap.texturebpath = dGet('wtw_tmoldtexturebpath').value;
		molds[moldind].graphics.heightmap.texturebumprid = dGet('wtw_tmoldtexturebumprid').value;
		molds[moldind].graphics.heightmap.texturebumprpath = dGet('wtw_tmoldtexturebumprpath').value;
		molds[moldind].graphics.heightmap.texturebumpgid = dGet('wtw_tmoldtexturebumpgid').value;
		molds[moldind].graphics.heightmap.texturebumpgpath = dGet('wtw_tmoldtexturebumpgpath').value;
		molds[moldind].graphics.heightmap.texturebumpbid = dGet('wtw_tmoldtexturebumpbid').value;
		molds[moldind].graphics.heightmap.texturebumpbpath = dGet('wtw_tmoldtexturebumpbpath').value;
		molds[moldind].sound.id = dGet('wtw_tmoldsoundid').value;
		molds[moldind].sound.path = dGet('wtw_tmoldsoundpath').value;
		molds[moldind].sound.name = dGet('wtw_tmoldsoundname').value;
		var soundattenuation = "none";
		if (dGet('wtw_tmoldsoundattenuation').selectedIndex > -1) {
			soundattenuation = dGet('wtw_tmoldsoundattenuation').options[dGet('wtw_tmoldsoundattenuation').selectedIndex].value;
		}
		molds[moldind].sound.attenuation = soundattenuation;
		if (dGet('wtw_tmoldsoundloop').checked == true) {
			molds[moldind].sound.loop = '1';
		} else {
			molds[moldind].sound.loop = '0';
		}
		molds[moldind].sound.maxdistance = dGet('wtw_tmoldsoundmaxdistance').value;
		molds[moldind].sound.rollofffactor = dGet('wtw_tmoldsoundrollofffactor').value;
		molds[moldind].sound.refdistance = dGet('wtw_tmoldsoundrefdistance').value;
		molds[moldind].sound.coneinnerangle = dGet('wtw_tmoldsoundconeinnerangle').value;
		molds[moldind].sound.coneouterangle = dGet('wtw_tmoldsoundconeouterangle').value;
		molds[moldind].sound.coneoutergain = dGet('wtw_tmoldsoundconeoutergain').value;
		molds[moldind].graphics.heightmap.maxheight = dGet('wtw_tmoldmaxheight').value;
		molds[moldind].color.specular.r = dGet('wtw_tspecularcolorr').value;
		molds[moldind].color.specular.g = dGet('wtw_tspecularcolorg').value;
		molds[moldind].color.specular.b = dGet('wtw_tspecularcolorb').value;
		molds[moldind].color.emissive.r = dGet('wtw_temissivecolorr').value;
		molds[moldind].color.emissive.g = dGet('wtw_temissivecolorg').value;
		molds[moldind].color.emissive.b = dGet('wtw_temissivecolorb').value;
		molds[moldind].color.diffuse.r = dGet('wtw_tdiffusecolorr').value;
		molds[moldind].color.diffuse.g = dGet('wtw_tdiffusecolorg').value;
		molds[moldind].color.diffuse.b = dGet('wtw_tdiffusecolorb').value;
		molds[moldind].moldname = moldgroup + "molds-" + moldind.toString() + "-" + moldid + "-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "-" + shape;
		molds[moldind].connectinggridid = dGet('wtw_tconnectinggridid').value;
		molds[moldind].connectinggridind = dGet('wtw_tconnectinggridind').value;
		molds[moldind].parentname = dGet('wtw_tconnectinggridname').value;
		molds[moldind].loadactionzoneid = loadactionzoneid;
		molds[moldind].loadactionzoneind = WTW.getActionZoneInd(loadactionzoneid, Number(dGet('wtw_tconnectinggridind').value));
		WTW.setDDLValue('wtw_tmoldcovering', coveringname);
		mold = WTW.addMold(molds[moldind].moldname, molds[moldind], molds[moldind].parentname, coveringname);
		mold.isPickable = true;
		WTW.setCoveringFormFields(coveringname);
		WTW.registerMouseOver(mold);
		switch (shape.toLowerCase()) {
			case "tube":
				var coords = WTW.getNewCoordinates(50);
				var positionX = coords.positionX;
				var positionY = coords.positionY;
				var positionZ = coords.positionZ;
				molds[moldind].paths.path1[0] = WTW.newPathPoint();
				molds[moldind].paths.path1[0].x = positionX;
				molds[moldind].paths.path1[0].y = positionY;
				molds[moldind].paths.path1[0].z = positionZ;
				molds[moldind].paths.path1[1] = WTW.newPathPoint();
				molds[moldind].paths.path1[1].x = positionX;
				molds[moldind].paths.path1[1].y = (Number(positionY) + 10);
				molds[moldind].paths.path1[1].z = positionZ;
				molds[moldind].paths.path1[1].sorder = 1;
				break;
			case "line":
				var coords = WTW.getNewCoordinates(50);
				var positionX = coords.positionX;
				var positionY = coords.positionY;
				var positionZ = coords.positionZ;
				molds[moldind].paths.path1[0] = WTW.newPathPoint();
				molds[moldind].paths.path1[0].x = positionX;
				molds[moldind].paths.path1[0].y = positionY;
				molds[moldind].paths.path1[0].z = positionZ;
				molds[moldind].paths.path1[1] = WTW.newPathPoint();
				molds[moldind].paths.path1[1].x = positionX;
				molds[moldind].paths.path1[1].y = (Number(positionY) + 10);
				molds[moldind].paths.path1[1].z = positionZ;
				molds[moldind].paths.path1[1].sorder = 1;
				break;
			default:
				WTW.openEditPoles(mold);
				break;
		}
		WTW.pluginsOpenAddNewMold(moldgroup, shape, molds[moldind].moldname);
		WTW.hideAdminMenu();
		WTW.show('wtw_adminmenu11');
		WTW.show('wtw_adminmenu11b');
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openAddNewMold=" + ex.message);
	}
}

WTWJS.prototype.setSoundFields = function() {
	try {
		var soundattenuation = "none";
		if (dGet('wtw_tmoldsoundattenuation').selectedIndex > -1) {
			soundattenuation = dGet('wtw_tmoldsoundattenuation').options[dGet('wtw_tmoldsoundattenuation').selectedIndex].value;
		}
		switch (soundattenuation) {
			case "none":
				WTW.hide('wtw_moldsoundoffdiv');
				WTW.hide('wtw_moldsoundmaxdistdiv');
				WTW.hide('wtw_moldsoundrolloffdiv');
				WTW.hide('wtw_moldsoundrefdistdiv');
				break;
			case "linear":
				WTW.hide('wtw_moldsoundrolloffdiv');
				WTW.hide('wtw_moldsoundrefdistdiv');
				WTW.show('wtw_moldsoundoffdiv');
				WTW.show('wtw_moldsoundmaxdistdiv');
				break;
			default:
				WTW.hide('wtw_moldsoundmaxdistdiv');
				WTW.show('wtw_moldsoundoffdiv');
				WTW.show('wtw_moldsoundrolloffdiv');
				WTW.show('wtw_moldsoundrefdistdiv');
				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setSoundFields=" + ex.message);
	}
}

WTWJS.prototype.changeCoveringType = function() {
	try {	
		var settexture = '0';
		var imageid = 'ij7fi8qv7dbgb6zc';
		var imagepath = '/content/system/stock/stucco-512x512.jpg';
		var coveringname = WTW.getDDLValue('wtw_tmoldcovering');
		WTW.setCoveringFormFields(coveringname);
		switch (coveringname) {
			case "directional texture": 
			case "2d texture":
			case "texture": 
				if (dGet('wtw_tmoldtextureid').value == '') {
					dGet('wtw_tmoldtextureid').value = imageid;
				}
				if (dGet('wtw_tmoldtexturepath').value == '') {
					dGet('wtw_tmoldtexturepath').value = imagepath;
				}
				break; 
			case "terrain":
				imageid = '4to027vq39087bxr';
				imagepath = '/content/system/stock/cement-512x512.jpg';
				if (dGet('wtw_tmoldtextureid').value == '') {
					dGet('wtw_tmoldtextureid').value = imageid;
				}
				if (dGet('wtw_tmoldtexturepath').value == '') {
					dGet('wtw_tmoldtexturepath').value = imagepath;
				}
				break;
			default:
				dGet('wtw_tmoldtextureid').value = '';
				dGet('wtw_tmoldtexturepath').value = '';
				dGet('wtw_tmoldtexturebumpid').value = '';
				dGet('wtw_tmoldtexturebumppath').value = '';
				dGet('wtw_moldtexturepreview').src = '';
				dGet('wtw_moldtexturepreview').alt = '';
				dGet('wtw_moldtexturepreview').title = '';
				dGet('wtw_moldtexturebumppreview').src = '';
				dGet('wtw_moldtexturebumppreview').alt = '';
				dGet('wtw_moldtexturebumppreview').title = '';
				break;
		}
		WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
		WTW.setPreviewImage('wtw_moldtexturebumppreview', 'wtw_tmoldtexturebumppath', 'wtw_tmoldtexturebumpid');
		WTW.setPreviewImage('wtw_moldheightmappreview', 'wtw_tmoldheightmappath', 'wtw_tmoldheightmapid');
		WTW.setPreviewImage('wtw_moldmixmappreview', 'wtw_tmoldmixmappath', 'wtw_tmoldmixmapid');
		WTW.setPreviewImage('wtw_moldtexturerpreview', 'wtw_tmoldtexturerpath', 'wtw_tmoldtexturerid');
		WTW.setPreviewImage('wtw_moldtexturegpreview', 'wtw_tmoldtexturegpath', 'wtw_tmoldtexturegid');
		WTW.setPreviewImage('wtw_moldtexturebpreview', 'wtw_tmoldtexturebpath', 'wtw_tmoldtexturebid');
		WTW.setPreviewImage('wtw_moldtexturebumprpreview', 'wtw_tmoldtexturebumprpath', 'wtw_tmoldtexturebumprid');
		WTW.setPreviewImage('wtw_moldtexturebumpgpreview', 'wtw_tmoldtexturebumpgpath', 'wtw_tmoldtexturebumpgid');
		WTW.setPreviewImage('wtw_moldtexturebumpbpreview', 'wtw_tmoldtexturebumpbpath', 'wtw_tmoldtexturebumpbid');
		WTW.setNewMold(1);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-changeCoveringType=" + ex.message);
	}
}

WTWJS.prototype.changeOnClickEvent = function(obj) {
	try {
		if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
			var moldgroup = dGet("wtw_tmoldmoldgroup").value;
			var moldind = Number(dGet('wtw_tmoldind').value);
			var molds;
			switch (moldgroup) {
				case "community":
					molds = WTW.communitiesMolds;
					break;
				case "thing":
					molds = WTW.thingMolds;
					break;
				default:
					molds = WTW.buildingMolds;
					break;
			}
			if (molds[moldind] != null) {
				if (molds[moldind].graphics.webimages[0] != undefined) {
					dGet('wtw_tmoldimagejsfunction').value = molds[moldind].graphics.webimages[0].jsfunction;
					dGet('wtw_tmoldimagejsparameters').value = molds[moldind].graphics.webimages[0].jsparameters;
				}
			}
		}
		WTW.showInline('wtw_onclickjavascriptdiv');
		if (obj.selectedIndex == 1) {
			dGet("wtw_tmoldimagejsfunction").value = "WTW.openIFrame";
			dGet('wtw_moldjsparameterstitle').innerHTML = "Web Address (URL)";
			dGet('wtw_moldjsparametersnote').innerHTML = "(Example: https://www.walktheweb.com)";
		} else if (obj.selectedIndex == 2) {
			dGet("wtw_tmoldimagejsfunction").value = "WTW.openWebpage";
			dGet('wtw_moldjsparameterstitle').innerHTML = "Web Address (URL)";
			dGet('wtw_moldjsparametersnote').innerHTML = "(Example: https://www.walktheweb.com)";
		} else  if (obj.selectedIndex == 0) {
			dGet("wtw_tmoldimagejsfunction").value = "";
			dGet('wtw_tmoldimagejsparameters').value = "";
			WTW.hide('wtw_onclickjavascriptdiv');
		} else {
			dGet('wtw_moldjsparameterstitle').innerHTML = "JavaScript Parameters";
			dGet('wtw_moldjsparametersnote').innerHTML = "(optional; comma separated)";
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-changeOnClickEvent=" + ex.message);
	}
}

WTWJS.prototype.openEditPoles = function(mold) {
	try {
		WTW.closeEditPoles();
		scene.render();
		if (mold != null) {
			var px = mold.position.x;
			var py = mold.position.y;
			var pz = mold.position.z;
			if (mold.parent != null) {
				if (mold.parent.id.indexOf("actionzoneaxle") > -1) {
					px += mold.parent.position.x;
					py += mold.parent.position.y;
					pz += mold.parent.position.z;
				}
			} 
			var moldx = mold.scaling.x;
			var moldy = mold.scaling.y;
			var moldz = mold.scaling.z;
			if (WTW.lineX == null) {
				WTW.lineZ = BABYLON.MeshBuilder.CreateLines("linez", {points: [new BABYLON.Vector3(px, py, pz-100),	new BABYLON.Vector3(px, py, pz+100)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX = BABYLON.MeshBuilder.CreateLines("linex", {points: [new BABYLON.Vector3(px-100, py, pz),	new BABYLON.Vector3(px+100, py, pz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY = BABYLON.MeshBuilder.CreateLines("liney", {points: [new BABYLON.Vector3(px, py-100, pz),	new BABYLON.Vector3(px, py+100, pz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ.isPickable = false;
				WTW.lineX.isPickable = false;
				WTW.lineY.isPickable = false;

				WTW.lineX1 = BABYLON.MeshBuilder.CreateLines("linex1", {points: [new BABYLON.Vector3(-.5, -.5, -100), new BABYLON.Vector3(-.5, -.5, 100)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX2 = BABYLON.MeshBuilder.CreateLines("linex2", {points: [new BABYLON.Vector3(-.5, .5, -100), new BABYLON.Vector3(-.5, .5, 100)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX3 = BABYLON.MeshBuilder.CreateLines("linex3", {points: [new BABYLON.Vector3(.5, -.5, -100), new BABYLON.Vector3(.5, -.5, 100)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX4 = BABYLON.MeshBuilder.CreateLines("linex4", {points: [new BABYLON.Vector3(.5, .5, -100), new BABYLON.Vector3(.5, .5, 100)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX5 = BABYLON.MeshBuilder.CreateLines("linex5", {points: [new BABYLON.Vector3(0, -.5, -100), new BABYLON.Vector3(0, -.5, 100)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX6 = BABYLON.MeshBuilder.CreateLines("linex6", {points: [new BABYLON.Vector3(0, .5, -100), new BABYLON.Vector3(0, .5, 100)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX7 = BABYLON.MeshBuilder.CreateLines("linex5", {points: [new BABYLON.Vector3(-.5, 0, -100), new BABYLON.Vector3(-.5, 0, 100)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX8 = BABYLON.MeshBuilder.CreateLines("linex6", {points: [new BABYLON.Vector3(.5, 0, -100), new BABYLON.Vector3(.5, 0, 100)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX1.isPickable = false;
				WTW.lineX2.isPickable = false;
				WTW.lineX3.isPickable = false;
				WTW.lineX4.isPickable = false;
				WTW.lineX5.isPickable = false;
				WTW.lineX6.isPickable = false;
				WTW.lineX7.isPickable = false;
				WTW.lineX8.isPickable = false;
				WTW.lineX1.color = new BABYLON.Color3(0, 1, 0);
				WTW.lineX2.color = new BABYLON.Color3(0, 1, 0);
				WTW.lineX3.color = new BABYLON.Color3(0, 1, 0);
				WTW.lineX4.color = new BABYLON.Color3(0, 1, 0);
				WTW.lineX5.color = new BABYLON.Color3(0, 1, 0);
				WTW.lineX6.color = new BABYLON.Color3(0, 1, 0);
				WTW.lineX7.color = new BABYLON.Color3(0, 1, 0);
				WTW.lineX8.color = new BABYLON.Color3(0, 1, 0);
				WTW.lineX1.parent = mold;
				WTW.lineX2.parent = mold;
				WTW.lineX3.parent = mold;
				WTW.lineX4.parent = mold;
				WTW.lineX5.parent = mold;
				WTW.lineX6.parent = mold;
				WTW.lineX7.parent = mold;
				WTW.lineX8.parent = mold;

				WTW.lineY1 = BABYLON.MeshBuilder.CreateLines("liney1", {points: [new BABYLON.Vector3(-.5, -100, -.5), new BABYLON.Vector3(-.5, 100, -.5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY2 = BABYLON.MeshBuilder.CreateLines("liney2", {points: [new BABYLON.Vector3(-.5, -100, .5), new BABYLON.Vector3(-.5, 100, .5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY3 = BABYLON.MeshBuilder.CreateLines("liney3", {points: [new BABYLON.Vector3(.5, -100, -.5), new BABYLON.Vector3(.5, 100, -.5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY4 = BABYLON.MeshBuilder.CreateLines("liney4", {points: [new BABYLON.Vector3(.5, -100, .5), new BABYLON.Vector3(.5, 100, .5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY5 = BABYLON.MeshBuilder.CreateLines("liney5", {points: [new BABYLON.Vector3(0, -100, -.5), new BABYLON.Vector3(0, 100, -.5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY6 = BABYLON.MeshBuilder.CreateLines("liney6", {points: [new BABYLON.Vector3(0, -100, .5), new BABYLON.Vector3(0, 100, .5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY7 = BABYLON.MeshBuilder.CreateLines("liney5", {points: [new BABYLON.Vector3(-.5, -100, 0), new BABYLON.Vector3(-.5, 100, 0)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY8 = BABYLON.MeshBuilder.CreateLines("liney6", {points: [new BABYLON.Vector3(.5, -100, 0), new BABYLON.Vector3(.5, 100, 0)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY1.isPickable = false;
				WTW.lineY2.isPickable = false;
				WTW.lineY3.isPickable = false;
				WTW.lineY4.isPickable = false;
				WTW.lineY5.isPickable = false;
				WTW.lineY6.isPickable = false;
				WTW.lineY7.isPickable = false;
				WTW.lineY8.isPickable = false;
				WTW.lineY1.color = new BABYLON.Color3(1, 0, 0);
				WTW.lineY2.color = new BABYLON.Color3(1, 0, 0);
				WTW.lineY3.color = new BABYLON.Color3(1, 0, 0);
				WTW.lineY4.color = new BABYLON.Color3(1, 0, 0);
				WTW.lineY5.color = new BABYLON.Color3(1, 0, 0);
				WTW.lineY6.color = new BABYLON.Color3(1, 0, 0);
				WTW.lineY7.color = new BABYLON.Color3(1, 0, 0);
				WTW.lineY8.color = new BABYLON.Color3(1, 0, 0);
				WTW.lineY1.parent = mold;
				WTW.lineY2.parent = mold;
				WTW.lineY3.parent = mold;
				WTW.lineY4.parent = mold;
				WTW.lineY5.parent = mold;
				WTW.lineY6.parent = mold;
				WTW.lineY7.parent = mold;
				WTW.lineY8.parent = mold;

				WTW.lineZ1 = BABYLON.MeshBuilder.CreateLines("linez1", {points: [new BABYLON.Vector3(-100, -.5, -.5), new BABYLON.Vector3(100, -.5, -.5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ2 = BABYLON.MeshBuilder.CreateLines("linez2", {points: [new BABYLON.Vector3(-100, -.5, .5), new BABYLON.Vector3(100, -.5, .5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ3 = BABYLON.MeshBuilder.CreateLines("linez3", {points: [new BABYLON.Vector3(-100, .5, -.5), new BABYLON.Vector3(100, .5, -.5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ4 = BABYLON.MeshBuilder.CreateLines("linez4", {points: [new BABYLON.Vector3(-100, .5, .5), new BABYLON.Vector3(100, .5, .5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ5 = BABYLON.MeshBuilder.CreateLines("linez5", {points: [new BABYLON.Vector3(-100, 0, -.5), new BABYLON.Vector3(100, 0, -.5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ6 = BABYLON.MeshBuilder.CreateLines("linez6", {points: [new BABYLON.Vector3(-100, 0, .5),	new BABYLON.Vector3(100, 0, .5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ7 = BABYLON.MeshBuilder.CreateLines("linez5", {points: [new BABYLON.Vector3(-100, -.5, 0), new BABYLON.Vector3(100, -.5, 0)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ8 = BABYLON.MeshBuilder.CreateLines("linez6", {points: [new BABYLON.Vector3(-100, .5, 0),	new BABYLON.Vector3(100, .5, 0)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ1.isPickable = false;
				WTW.lineZ2.isPickable = false;
				WTW.lineZ3.isPickable = false;
				WTW.lineZ4.isPickable = false;
				WTW.lineZ5.isPickable = false;
				WTW.lineZ6.isPickable = false;
				WTW.lineZ7.isPickable = false;
				WTW.lineZ8.isPickable = false;
				WTW.lineZ1.color = new BABYLON.Color3(0, 0, 1);
				WTW.lineZ2.color = new BABYLON.Color3(0, 0, 1);
				WTW.lineZ3.color = new BABYLON.Color3(0, 0, 1);
				WTW.lineZ4.color = new BABYLON.Color3(0, 0, 1);
				WTW.lineZ5.color = new BABYLON.Color3(0, 0, 1);
				WTW.lineZ6.color = new BABYLON.Color3(0, 0, 1);
				WTW.lineZ7.color = new BABYLON.Color3(0, 0, 1);
				WTW.lineZ8.color = new BABYLON.Color3(0, 0, 1);
				WTW.lineZ1.parent = mold;
				WTW.lineZ2.parent = mold;
				WTW.lineZ3.parent = mold;
				WTW.lineZ4.parent = mold;
				WTW.lineZ5.parent = mold;
				WTW.lineZ6.parent = mold;
				WTW.lineZ7.parent = mold;
				WTW.lineZ8.parent = mold;
				var alphamold = 1;
				var wx = .1;
				var wy = 1;
				var wz = 2;
				if (WTW.moveZ == null) {
					WTW.moveZ = BABYLON.MeshBuilder.CreateBox("movez", {height:1, width:.1, depth:2}, scene);
					WTW.moveZ.position = new BABYLON.Vector3(px, py, (moldz / 2 + pz + 1.1));
					//WTW.moveZ.scaling.x = .1;
					//WTW.moveZ.scaling.y = 1;
					//WTW.moveZ.scaling.z = 2;
					WTW.moveZ.isPickable = false;
					image = "/content/system/images/movez.png";
					var rMaterial = new BABYLON.StandardMaterial("rmoldmovez", scene);
					rMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					rMaterial.diffuseTexture.wAng = WTW.getRadians(0);
					rMaterial.diffuseTexture.alpha = alphamold;
					rMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					var lMaterial = new BABYLON.StandardMaterial("lmoldmovez", scene);
					lMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					lMaterial.diffuseTexture.wAng = WTW.getRadians(180);
					lMaterial.diffuseTexture.alpha = alphamold;
					lMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7); 
					var fMaterial = new BABYLON.StandardMaterial("fmoldmovez", scene);
					fMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					fMaterial.diffuseTexture.wAng = WTW.getRadians(90);
					fMaterial.diffuseTexture.alpha = alphamold;
					fMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					var bMaterial = new BABYLON.StandardMaterial("bmoldmovez", scene);
					bMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					bMaterial.diffuseTexture.wAng = WTW.getRadians(90);
					bMaterial.diffuseTexture.alpha = alphamold;
					bMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					var uMaterial = new BABYLON.StandardMaterial("umoldmovez", scene);
					uMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					uMaterial.diffuseTexture.alpha = alphamold;
					uMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					var dMaterial = new BABYLON.StandardMaterial("dmoldmovez", scene);
					dMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					dMaterial.diffuseTexture.alpha = alphamold;
					dMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					var moldmulti = new BABYLON.MultiMaterial("multimoldmovez", scene);
					moldmulti.subMaterials.push(lMaterial);
					moldmulti.subMaterials.push(rMaterial);
					moldmulti.subMaterials.push(bMaterial);
					moldmulti.subMaterials.push(fMaterial);
					moldmulti.subMaterials.push(uMaterial);
					moldmulti.subMaterials.push(dMaterial);
					if (WTW.moveZ.subMeshes.length < 12) {
						WTW.moveZ.subMeshes.push(new BABYLON.SubMesh(0, 0,  4,  0, 6, WTW.moveZ));
						WTW.moveZ.subMeshes.push(new BABYLON.SubMesh(1, 4,  4,  6, 6, WTW.moveZ));
						WTW.moveZ.subMeshes.push(new BABYLON.SubMesh(2, 8,  4, 12, 6, WTW.moveZ));
						WTW.moveZ.subMeshes.push(new BABYLON.SubMesh(3, 12, 4, 18, 6, WTW.moveZ));
						WTW.moveZ.subMeshes.push(new BABYLON.SubMesh(4, 16, 4, 24, 6, WTW.moveZ));
						WTW.moveZ.subMeshes.push(new BABYLON.SubMesh(5, 20, 4, 30, 6, WTW.moveZ));
					}
					WTW.moveZ.material = moldmulti;
				}
				wx = .1;
				wy = 1;
				wz = 2;
				if (WTW.moveY == null) {
					WTW.moveY = BABYLON.MeshBuilder.CreateBox("movey", {height:1, width:2, depth:2}, scene);
					WTW.moveY.position = new BABYLON.Vector3(px, (moldy / 2 + py + 1.1), pz);
					//WTW.moveY.scaling.x = 2;
					//WTW.moveY.scaling.y = 1;
					//WTW.moveY.scaling.z = 2;
					WTW.moveY.isPickable = false;
					image = "/content/system/images/movey.png";
					rMaterial = new BABYLON.StandardMaterial("rmoldmovey", scene);
					rMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					rMaterial.diffuseTexture.wAng = WTW.getRadians(0);
					rMaterial.diffuseTexture.alpha = alphamold;
					rMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					lMaterial = new BABYLON.StandardMaterial("lmoldmovey", scene);
					lMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					lMaterial.diffuseTexture.wAng = WTW.getRadians(180);
					lMaterial.diffuseTexture.alpha = alphamold;
					lMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7); 
					fMaterial = new BABYLON.StandardMaterial("fmoldmovey", scene);
					fMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					fMaterial.diffuseTexture.wAng = WTW.getRadians(90);
					fMaterial.diffuseTexture.alpha = alphamold;
					fMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					bMaterial = new BABYLON.StandardMaterial("bmoldmovey", scene);
					bMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					bMaterial.diffuseTexture.wAng = WTW.getRadians(90);
					bMaterial.diffuseTexture.alpha = alphamold;
					bMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					uMaterial = new BABYLON.StandardMaterial("umoldmovey", scene);
					uMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					uMaterial.diffuseTexture.alpha = alphamold;
					uMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					dMaterial = new BABYLON.StandardMaterial("dmoldmovey", scene);
					dMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					dMaterial.diffuseTexture.alpha = alphamold;
					dMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					moldmulti = new BABYLON.MultiMaterial("multimoldmovey", scene);
					moldmulti.subMaterials.push(lMaterial);
					moldmulti.subMaterials.push(rMaterial);
					moldmulti.subMaterials.push(bMaterial);
					moldmulti.subMaterials.push(fMaterial);
					moldmulti.subMaterials.push(uMaterial);
					moldmulti.subMaterials.push(dMaterial);
					if (WTW.moveY.subMeshes.length < 12) {
						WTW.moveY.subMeshes.push(new BABYLON.SubMesh(0, 0,  4,  0, 6, WTW.moveY));
						WTW.moveY.subMeshes.push(new BABYLON.SubMesh(1, 4,  4,  6, 6, WTW.moveY));
						WTW.moveY.subMeshes.push(new BABYLON.SubMesh(2, 8,  4, 12, 6, WTW.moveY));
						WTW.moveY.subMeshes.push(new BABYLON.SubMesh(3, 12, 4, 18, 6, WTW.moveY));
						WTW.moveY.subMeshes.push(new BABYLON.SubMesh(4, 16, 4, 24, 6, WTW.moveY));
						WTW.moveY.subMeshes.push(new BABYLON.SubMesh(5, 20, 4, 30, 6, WTW.moveY));
					}
					WTW.moveY.material = moldmulti;
				}
				wx = 2;
				wy = 1;
				wz = .1;
				if (WTW.moveX == null) {
					WTW.moveX = BABYLON.MeshBuilder.CreateBox("movex", {height:1, width:2, depth:.1}, scene);
					WTW.moveX.position = new BABYLON.Vector3((moldx / 2 + px + 1.1), py, pz);
					//WTW.moveX.scaling.x = 2;
					//WTW.moveX.scaling.y = 1;
					//WTW.moveX.scaling.z = .1;
					WTW.moveX.isPickable = false;
					image = "/content/system/images/movex.png";
					rMaterial = new BABYLON.StandardMaterial("rmoldmovex", scene);
					rMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					rMaterial.diffuseTexture.wAng = WTW.getRadians(0);
					rMaterial.diffuseTexture.alpha = alphamold;
					rMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					lMaterial = new BABYLON.StandardMaterial("lmoldmovex", scene);
					lMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					lMaterial.diffuseTexture.wAng = WTW.getRadians(180);
					lMaterial.diffuseTexture.alpha = alphamold;
					lMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7); 
					fMaterial = new BABYLON.StandardMaterial("fmoldmovex", scene);
					fMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					fMaterial.diffuseTexture.wAng = WTW.getRadians(90);
					fMaterial.diffuseTexture.alpha = alphamold;
					fMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					bMaterial = new BABYLON.StandardMaterial("bmoldmovex", scene);
					bMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					bMaterial.diffuseTexture.wAng = WTW.getRadians(90);
					bMaterial.diffuseTexture.alpha = alphamold;
					bMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					uMaterial = new BABYLON.StandardMaterial("umoldmovex", scene);
					uMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					uMaterial.diffuseTexture.alpha = alphamold;
					uMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					dMaterial = new BABYLON.StandardMaterial("dmoldmovex", scene);
					dMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					dMaterial.diffuseTexture.alpha = alphamold;
					dMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					moldmulti = new BABYLON.MultiMaterial("multimoldmovex", scene);
					moldmulti.subMaterials.push(lMaterial);
					moldmulti.subMaterials.push(rMaterial);
					moldmulti.subMaterials.push(bMaterial);
					moldmulti.subMaterials.push(fMaterial);
					moldmulti.subMaterials.push(uMaterial);
					moldmulti.subMaterials.push(dMaterial);
					if (WTW.moveX.subMeshes.length < 12) {
						WTW.moveX.subMeshes.push(new BABYLON.SubMesh(0, 0,  4,  0, 6, WTW.moveX));
						WTW.moveX.subMeshes.push(new BABYLON.SubMesh(1, 4,  4,  6, 6, WTW.moveX));
						WTW.moveX.subMeshes.push(new BABYLON.SubMesh(2, 8,  4, 12, 6, WTW.moveX));
						WTW.moveX.subMeshes.push(new BABYLON.SubMesh(3, 12, 4, 18, 6, WTW.moveX));
						WTW.moveX.subMeshes.push(new BABYLON.SubMesh(4, 16, 4, 24, 6, WTW.moveX));
						WTW.moveX.subMeshes.push(new BABYLON.SubMesh(5, 20, 4, 30, 6, WTW.moveX));
					}
					WTW.moveX.material = moldmulti;	
				}
			} else {
				WTW.moveZ.position = new BABYLON.Vector3(px, py, (moldz / 2 + pz + 1.1));
				WTW.moveZ.scaling.x = .1;
				WTW.moveZ.scaling.y = 1;
				WTW.moveZ.scaling.z = 2;
				WTW.moveX.position = new BABYLON.Vector3((moldx / 2 + px + 1.1), py, pz);
				WTW.moveX.scaling.x = 2;
				WTW.moveX.scaling.y = 1;
				WTW.moveX.scaling.z = .1;
				WTW.moveY.position = new BABYLON.Vector3(px, (moldy / 2 + py + 1.1), pz);
				WTW.moveY.scaling.x = 2;
				WTW.moveY.scaling.y = 1;
				WTW.moveY.scaling.z = 2;
			}
			if (dGet('wtw_adminaxislabels').innerHTML == "Axis Labels ON<!--1-->") {
				WTW.moveX.isVisible = true;
				WTW.moveY.isVisible = true;
				WTW.moveZ.isVisible = true;				
			} else {
				WTW.moveX.isVisible = false;
				WTW.moveY.isVisible = false;
				WTW.moveZ.isVisible = false;          
			}	
			if (dGet('wtw_blines').alt = "Alignment Lines are Shown") {
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
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openEditPoles=" + ex.message);
	}
}

WTWJS.prototype.closeEditPoles = function() {
	try {
		if (WTW.lineZ != null) {
			WTW.lineZ.dispose();
            WTW.lineZ = null;
		}
		if (WTW.lineX != null) {
			WTW.lineX.dispose();
            WTW.lineX = null;
		}
		if (WTW.lineY != null) {
			WTW.lineY.dispose();
            WTW.lineY = null;
		}
		if (WTW.moveX != null) {
			WTW.moveX.material.dispose();
            WTW.moveX.material = null;
			WTW.moveX.dispose();
            WTW.moveX = null;
		}
		if (WTW.moveY != null) {
			WTW.moveY.material.dispose();
            WTW.moveY.material = null;
			WTW.moveY.dispose();
            WTW.moveY = null;
		}
		if (WTW.moveZ != null) {
			WTW.moveZ.material.dispose();
            WTW.moveZ.material = null;
			WTW.moveZ.dispose();
            WTW.moveZ = null;
		}
		if (WTW.lineX1 != null) {
			WTW.lineX1.dispose();
			WTW.lineX1 = null;
		}
		if (WTW.lineX2 != null) {
			WTW.lineX2.dispose();
			WTW.lineX2 = null;
		}
		if (WTW.lineX3 != null) {
			WTW.lineX3.dispose();
			WTW.lineX3 = null;
		}
		if (WTW.lineX4 != null) {
			WTW.lineX4.dispose();
			WTW.lineX4 = null;
		}
		if (WTW.lineX5 != null) {
			WTW.lineX5.dispose();
			WTW.lineX5 = null;
		}
		if (WTW.lineX6 != null) {
			WTW.lineX6.dispose();
			WTW.lineX6 = null;
		}
		if (WTW.lineX7 != null) {
			WTW.lineX7.dispose();
			WTW.lineX7 = null;
		}
		if (WTW.lineX8 != null) {
			WTW.lineX8.dispose();
			WTW.lineX8 = null;
		}
		if (WTW.lineY1 != null) {
			WTW.lineY1.dispose();
            WTW.lineY1 = null;
		}
		if (WTW.lineY2 != null) {
			WTW.lineY2.dispose();
            WTW.lineY2 = null;
		}
		if (WTW.lineY3 != null) {
			WTW.lineY3.dispose();
            WTW.lineY3 = null;
		}
		if (WTW.lineY4 != null) {
			WTW.lineY4.dispose();
            WTW.lineY4 = null;
		}
		if (WTW.lineY5 != null) {
			WTW.lineY5.dispose();
            WTW.lineY5 = null;
		}
		if (WTW.lineY6 != null) {
			WTW.lineY6.dispose();
            WTW.lineY6 = null;
		}
		if (WTW.lineY7 != null) {
			WTW.lineY7.dispose();
            WTW.lineY7 = null;
		}
		if (WTW.lineY8 != null) {
			WTW.lineY8.dispose();
            WTW.lineY8 = null;
		}
		if (WTW.lineZ1 != null) {
			WTW.lineZ1.dispose();
            WTW.lineZ1 = null;
		}
		if (WTW.lineZ2 != null) {
			WTW.lineZ2.dispose();
            WTW.lineZ2 = null;
		}
		if (WTW.lineZ3 != null) {
			WTW.lineZ3.dispose();
            WTW.lineZ3 = null;
		}
		if (WTW.lineZ4 != null) {
			WTW.lineZ4.dispose();
            WTW.lineZ4 = null;
		}
		if (WTW.lineZ5 != null) {
			WTW.lineZ5.dispose();
            WTW.lineZ5 = null;
		}
		if (WTW.lineZ6 != null) {
			WTW.lineZ6.dispose();
            WTW.lineZ6 = null;
		}
		if (WTW.lineZ7 != null) {
			WTW.lineZ7.dispose();
            WTW.lineZ7 = null;
		}
		if (WTW.lineZ8 != null) {
			WTW.lineZ8.dispose();
            WTW.lineZ8 = null;
		}
	/*	for (var i=0; i < scene.materials.length;i++) {
			try {
				if (scene.materials[i] != null) {
					if (scene.materials[i].id.indexOf("moldmove") > -1) {
						//scene.materials[i].dispose();
					}
				}
			} catch (ex) {
			}
		}*/
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-closeEditPoles=" + ex.message);
	}
}

WTWJS.prototype.setPreviewImage = function(zpreviewimageid, zimagepathid, zimageidid) {
	try {
		if (dGet(zpreviewimageid) != null) {
			WTW.hide(zpreviewimageid);
			dGet(zpreviewimageid).src = '';
			var zimagepath = "";
			var zimageid = "";
			if (dGet(zimagepathid) != null) {
				zimagepath = dGet(zimagepathid).value;
			}
			if (dGet(zimageidid) != null) {
				zimageid = dGet(zimageidid).value;
			}
			if (zimagepath != '') {
				dGet(zpreviewimageid).src = zimagepath;
			} else if (zimageid != "") {
				WTW.getJSON("/connect/upload.php?uploadid=" + zimageid, 
					function(response) {
						WTW.loadUpload(JSON.parse(response),zimageid,0);
						var imageinfo = WTW.getUploadFileData(zimageid);
						imageinfo.image.onload = function() {	
							dGet(zpreviewimageid).src = imageinfo.filedata;
						}
					}
				);
			}
			if (dGet(zpreviewimageid).src != '') {
				WTW.show(zpreviewimageid);
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setPreviewImage=" + ex.message);
	}
}

WTWJS.prototype.submitMoldForm = function(w) {
	try {
		WTW.closeColorSelector();
		var moldgroup = dGet('wtw_tmoldmoldgroup').value;
		var molds = null;
		var shape = "wall";
		var moldname = "";
		if (dGet('wtw_tmoldshape').value != "") {
			shape = dGet('wtw_tmoldshape').value;
		}
		var moldind = Number(dGet('wtw_tmoldind').value);
		switch (moldgroup) {
			case "community":
				molds = WTW.communitiesMolds;				
				break;
			case "thing":
				molds = WTW.thingMolds;
				break;
			default:
				molds = WTW.buildingMolds;
				break;
		}
		moldname = moldgroup + "molds-" + moldind + "-" + dGet('wtw_tmoldid').value + "-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "-" + shape;
		if (dGet('wtw_tmoldcsgmoldid').value == "") {
			WTW.setDDLValue("wtw_tmoldcsgaction", "");
		}		
		if (w == 0) {
			if (moldname != "") {
				WTW.disposeClean(moldname);
			}
			molds[moldind] = null;
			var request = {
				'communityid':dGet('wtw_tcommunityid').value,
				'buildingid':dGet('wtw_tbuildingid').value,
				'thingid':dGet('wtw_tthingid').value,
				'moldid':dGet('wtw_tmoldid').value
			};
			/* function for after iframe loads */
			var onload = function(ipage) {
				ipage.getElementById('wtw_tcommunityid').value = request.communityid;
				ipage.getElementById('wtw_tbuildingid').value = request.buildingid;
				ipage.getElementById('wtw_tthingid').value = request.thingid;
				ipage.getElementById('wtw_tmoldid').value = request.moldid;
				ipage.getElementById('wtw_tmolddeleted').value = "1";
				ipage.getElementById('wtw_bdeletemold').click();
				dGet('wtw_tnewmold').value = "0";
			}
			/* iframe src, onload function */
			var iframe = WTW.createIFrame('/core/iframes/molds.php', onload);	
		} else if (w == -1) {
			if (WTW.moldBackup != null) {
				molds[moldind] = WTW.moldBackup;
			}
			WTW.loadMoldForm(molds[moldind]);
			WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
			WTW.setPreviewImage('wtw_moldtexturebumppreview', 'wtw_tmoldtexturebumppath', 'wtw_tmoldtexturebumpid');
			WTW.setPreviewImage('wtw_moldheightmappreview', 'wtw_tmoldheightmappath', 'wtw_tmoldheightmapid');
			WTW.setPreviewImage('wtw_moldmixmappreview', 'wtw_tmoldmixmappath', 'wtw_tmoldmixmapid');
			WTW.setPreviewImage('wtw_moldtexturerpreview', 'wtw_tmoldtexturerpath', 'wtw_tmoldtexturerid');
			WTW.setPreviewImage('wtw_moldtexturegpreview', 'wtw_tmoldtexturegpath', 'wtw_tmoldtexturegid');
			WTW.setPreviewImage('wtw_moldtexturebpreview', 'wtw_tmoldtexturebpath', 'wtw_tmoldtexturebid');
			WTW.setPreviewImage('wtw_moldtexturebumprpreview', 'wtw_tmoldtexturebumprpath', 'wtw_tmoldtexturebumprid');
			WTW.setPreviewImage('wtw_moldtexturebumpgpreview', 'wtw_tmoldtexturebumpgpath', 'wtw_tmoldtexturebumpgid');
			WTW.setPreviewImage('wtw_moldtexturebumpbpreview', 'wtw_tmoldtexturebumpbpath', 'wtw_tmoldtexturebumpbid');
			WTW.disposeClean(molds[moldind].moldname);
			if (dGet('wtw_tnewmold').value == "1") {
				if (moldname != "") {
					WTW.disposeClean(moldname);
				}
				molds[moldind] = null;
			} else {
				molds[moldind].shown = "0";
				WTW.setShownMolds();
			}
		} else {
			if (molds[moldind] == null) {
				molds[moldind] = WTW.newMold();
			}
			switch (moldgroup) {
				case "community":
					molds[moldind].communityinfo.communityid = communityid;
					molds[moldind].communityinfo.communityind = dGet('wtw_tcommunityind').value;
					break;
				case "thing":
					molds[moldind].thinginfo.communityid = thingid;
					molds[moldind].thinginfo.thingind = dGet('wtw_tthingind').value;
					break;
				default:
					molds[moldind].buildinginfo.buildingid = buildingid;
					molds[moldind].buildinginfo.buildingind = WTW.getBuildingInd(buildingid);
					break;
			}
			molds[moldind].moldid = dGet('wtw_tmoldid').value;
			molds[moldind].moldind = moldind;
			molds[moldind].shape = dGet('wtw_tmoldshape').value;
			if (dGet('wtw_tmoldcovering').options[dGet('wtw_tmoldcovering').selectedIndex] != undefined) {
				molds[moldind].covering = dGet('wtw_tmoldcovering').options[dGet('wtw_tmoldcovering').selectedIndex].value;
			} else {
				molds[moldind].covering = dGet('wtw_tmoldcoveringold').value;
			}
			molds[moldind].position.x = dGet('wtw_tmoldpositionx').value;
			molds[moldind].position.y = dGet('wtw_tmoldpositiony').value;
			molds[moldind].position.z = dGet('wtw_tmoldpositionz').value;
			molds[moldind].scaling.x = dGet('wtw_tmoldscalingx').value;
			molds[moldind].scaling.y = dGet('wtw_tmoldscalingy').value;
			molds[moldind].scaling.z = dGet('wtw_tmoldscalingz').value;
			molds[moldind].rotation.x = dGet('wtw_tmoldrotationx').value;
			molds[moldind].rotation.y = dGet('wtw_tmoldrotationy').value;
			molds[moldind].rotation.z = dGet('wtw_tmoldrotationz').value;
			molds[moldind].scaling.special1 = dGet('wtw_tmoldspecial1').value;
			molds[moldind].scaling.special2 = dGet('wtw_tmoldspecial2').value;
			molds[moldind].graphics.uoffset = dGet('wtw_tmolduoffset').value;
			molds[moldind].graphics.voffset = dGet('wtw_tmoldvoffset').value;
			molds[moldind].graphics.uscale = dGet('wtw_tmolduscale').value;
			molds[moldind].graphics.vscale = dGet('wtw_tmoldvscale').value;
			if (molds[moldind].graphics.webimages[0] != undefined) {
				molds[moldind].graphics.webimages[0].imagepath = dGet('wtw_tmoldaddimagepath').value;
				molds[moldind].graphics.webimages[0].imageid = dGet('wtw_tmoldaddimageid').value;
				molds[moldind].graphics.webimages[0].imagehoverpath = dGet('wtw_tmoldaddimagehoverpath').value;
				molds[moldind].graphics.webimages[0].imagehoverid = dGet('wtw_tmoldaddimagehoverid').value;
				molds[moldind].graphics.webimages[0].imageclickpath = dGet('wtw_tmoldaddimageclickpath').value;
				molds[moldind].graphics.webimages[0].imageclickid = dGet('wtw_tmoldaddimageclickid').value;
				molds[moldind].graphics.webimages[0].jsfunction = dGet('wtw_tmoldimagejsfunction').value;
				molds[moldind].graphics.webimages[0].jsparameters = dGet('wtw_tmoldimagejsparameters').value;
			} else {
				molds[moldind].graphics.webimages[0] = WTW.newWebImage();
			}
			if (dGet('wtw_tmoldgraphiclevel').checked) {
				molds[moldind].graphics.level = '1';
			} else {
				molds[moldind].graphics.level = '0';
			}
			if (dGet('wtw_tmoldreceiveshadows').checked) {
				molds[moldind].graphics.receiveshadows = '1';
			} else {
				molds[moldind].graphics.receiveshadows = '0';
			}
			molds[moldind].opacity = dGet('wtw_tmoldopacity').value;
			molds[moldind].object.uploadobjectid = dGet('wtw_tmolduploadobjectid').value;
			molds[moldind].object.folder = dGet('wtw_tmoldobjectfolder').value;
			molds[moldind].object.file = dGet('wtw_tmoldobjectfile').value;
			molds[moldind].subdivisions = dGet('wtw_tmoldsubdivisions').value;
			molds[moldind].graphics.texture.id = dGet('wtw_tmoldtextureid').value;
			molds[moldind].graphics.texture.path = dGet('wtw_tmoldtexturepath').value;
			molds[moldind].graphics.texture.bumpid = dGet('wtw_tmoldtexturebumpid').value;
			molds[moldind].graphics.texture.bumppath = dGet('wtw_tmoldtexturebumppath').value;
			molds[moldind].graphics.texture.videoid = dGet('wtw_tmoldvideoid').value;
			molds[moldind].graphics.texture.video = dGet('wtw_tmoldvideopath').value;
			molds[moldind].graphics.texture.videoposterid = dGet('wtw_tmoldvideoposterid').value;
			molds[moldind].graphics.texture.videoposter = dGet('wtw_tmoldvideoposterpath').value;
			molds[moldind].graphics.heightmap.id = dGet('wtw_tmoldheightmapid').value;
			molds[moldind].graphics.heightmap.path = dGet('wtw_tmoldheightmappath').value;
			molds[moldind].graphics.heightmap.mixmapid = dGet('wtw_tmoldmixmapid').value;
			molds[moldind].graphics.heightmap.mixmappath = dGet('wtw_tmoldmixmappath').value;
			molds[moldind].graphics.heightmap.texturerid = dGet('wtw_tmoldtexturerid').value;
			molds[moldind].graphics.heightmap.texturerpath = dGet('wtw_tmoldtexturerpath').value;
			molds[moldind].graphics.heightmap.texturegid = dGet('wtw_tmoldtexturegid').value;
			molds[moldind].graphics.heightmap.texturegpath = dGet('wtw_tmoldtexturegpath').value;
			molds[moldind].graphics.heightmap.texturebid = dGet('wtw_tmoldtexturebid').value;
			molds[moldind].graphics.heightmap.texturebpath = dGet('wtw_tmoldtexturebpath').value;
			molds[moldind].graphics.heightmap.texturebumprid = dGet('wtw_tmoldtexturebumprid').value;
			molds[moldind].graphics.heightmap.texturebumprpath = dGet('wtw_tmoldtexturebumprpath').value;
			molds[moldind].graphics.heightmap.texturebumpgid = dGet('wtw_tmoldtexturebumpgid').value;
			molds[moldind].graphics.heightmap.texturebumpgpath = dGet('wtw_tmoldtexturebumpgpath').value;
			molds[moldind].graphics.heightmap.texturebumpbid = dGet('wtw_tmoldtexturebumpbid').value;
			molds[moldind].graphics.heightmap.texturebumpbpath = dGet('wtw_tmoldtexturebumpbpath').value;
			molds[moldind].graphics.heightmap.maxheight = dGet('wtw_tmoldmaxheight').value;
			var iswaterreflection = "0";
			if (dGet('wtw_tmoldwaterreflection').checked) {
				iswaterreflection = "1";
			}
			molds[moldind].graphics.waterreflection = iswaterreflection;
			molds[moldind].graphics.webimageind = dGet('wtw_tmoldimageind').value;
			molds[moldind].sound.id = dGet('wtw_tmoldsoundid').value;
			molds[moldind].sound.name = dGet('wtw_tmoldsoundname').value;
			var soundattenuation = "none";
			if (dGet('wtw_tmoldsoundattenuation').selectedIndex > -1) {
				soundattenuation = dGet('wtw_tmoldsoundattenuation').options[dGet('wtw_tmoldsoundattenuation').selectedIndex].value;
			}
			molds[moldind].sound.attenuation = soundattenuation;
			if (dGet('wtw_tmoldsoundloop').checked) {
				molds[moldind].sound.loop = '1';
			} else {
				molds[moldind].sound.loop = '0';
			}
			molds[moldind].sound.maxdistance = dGet('wtw_tmoldsoundmaxdistance').value;
			molds[moldind].sound.rollofffactor = dGet('wtw_tmoldsoundrollofffactor').value;
			molds[moldind].sound.refdistance = dGet('wtw_tmoldsoundrefdistance').value;
			molds[moldind].sound.coneinnerangle = dGet('wtw_tmoldsoundconeinnerangle').value;
			molds[moldind].sound.coneouterangle = dGet('wtw_tmoldsoundconeouterangle').value;
			molds[moldind].sound.coneoutergain = dGet('wtw_tmoldsoundconeoutergain').value;
			molds[moldind].actionzoneid = dGet('wtw_tmoldactionzoneid').value;
			molds[moldind].actionzoneind = WTW.getActionZoneInd(molds[moldind].actionzoneid,0);
			molds[moldind].loadactionzoneid = dGet('wtw_tmoldloadactionzoneid').options[dGet('wtw_tmoldloadactionzoneid').selectedIndex].value;
			molds[moldind].loadactionzoneind = WTW.getActionZoneInd(molds[moldind].loadactionzoneid,0);
			molds[moldind].csg.moldid = dGet('wtw_tmoldcsgmoldid').value;
			if (dGet('wtw_tmoldcsgaction').selectedIndex > -1) {
				molds[moldind].csg.action = dGet('wtw_tmoldcsgaction').options[dGet('wtw_tmoldcsgaction').selectedIndex].value;
			} else {
				molds[moldind].csg.action = "";
			}
			if (dGet('wtw_tmoldshape').value == '3dtext') {
				molds[moldind].webtext.webtext = WTW.encode(dGet('wtw_tmoldwebtext').value);
			} else {
				molds[moldind].webtext.webtext = '';
			}
			molds[moldind].webtext.webstyle = WTW.encode(dGet('wtw_tmoldwebstyle').value);
			molds[moldind].color.specular.r = dGet('wtw_tspecularcolorr').value;
			molds[moldind].color.specular.g = dGet('wtw_tspecularcolorg').value;
			molds[moldind].color.specular.b = dGet('wtw_tspecularcolorb').value;
			molds[moldind].color.emissive.r = dGet('wtw_temissivecolorr').value;
			molds[moldind].color.emissive.g = dGet('wtw_temissivecolorg').value;
			molds[moldind].color.emissive.b = dGet('wtw_temissivecolorb').value;
			molds[moldind].color.diffuse.r = dGet('wtw_tdiffusecolorr').value;
			molds[moldind].color.diffuse.g = dGet('wtw_tdiffusecolorg').value;
			molds[moldind].color.diffuse.b = dGet('wtw_tdiffusecolorb').value;
			molds[moldind].alttag.name = WTW.encode(dGet('wtw_tmoldalttag').value);
			molds[moldind].shown = "0";
			molds[moldind].graphics.texture.backupid = "";
			molds[moldind].parentname = "connectinggrids-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "--";
			molds[moldind].moldname = moldname;
			molds[moldind].connectinggridid = dGet('wtw_tconnectinggridid').value;
			molds[moldind].connectinggridind = dGet('wtw_tconnectinggridind').value;
			
			var request = {
				'communityid':communityid,
				'buildingid':buildingid,
				'thingid':thingid,
				'moldid':molds[moldind].moldid,
				'moldind':moldind,
				'loadactionzoneid':molds[moldind].loadactionzoneid,
				'moldgroup':moldgroup,
				'shape':molds[moldind].shape,
				'covering':molds[moldind].covering,
				'positionx':molds[moldind].position.x,
				'positiony':molds[moldind].position.y,
				'positionz':molds[moldind].position.z,
				'scalingx':molds[moldind].scaling.x,
				'scalingy':molds[moldind].scaling.y,
				'scalingz':molds[moldind].scaling.z,
				'rotationx':molds[moldind].rotation.x,
				'rotationy':molds[moldind].rotation.y,
				'rotationz':molds[moldind].rotation.z,
				'special1':molds[moldind].scaling.special1,
				'special2':molds[moldind].scaling.special2,
				'uoffset':molds[moldind].graphics.uoffset,
				'voffset':molds[moldind].graphics.voffset,
				'uscale':molds[moldind].graphics.uscale,
				'vscale':molds[moldind].graphics.vscale,
				'uploadobjectid':molds[moldind].object.uploadobjectid,
				'objectfolder':molds[moldind].object.folder,
				'objectfile':molds[moldind].object.file,
				'receiveshadows':molds[moldind].graphics.receiveshadows,
				'graphiclevel':molds[moldind].graphics.level,
				'videoid':molds[moldind].graphics.texture.videoid,
				'videoposterid':molds[moldind].graphics.texture.videoposterid,
				'textureid':molds[moldind].graphics.texture.id,
				'texturebumpid':molds[moldind].graphics.texture.bumpid,
				'heightmapid':molds[moldind].graphics.heightmap.id,
				'mixmapid':molds[moldind].graphics.heightmap.mixmapid,
				'texturerid':molds[moldind].graphics.heightmap.texturerid,
				'texturegid':molds[moldind].graphics.heightmap.texturegid,
				'texturebid':molds[moldind].graphics.heightmap.texturebid,
				'texturebumprid':molds[moldind].graphics.heightmap.texturebumprid,
				'texturebumpgid':molds[moldind].graphics.heightmap.texturebumpgid,
				'texturebumpbid':molds[moldind].graphics.heightmap.texturebumpbid,
				'soundid':molds[moldind].sound.id,
				'soundname':molds[moldind].sound.name,
				'soundattenuation':molds[moldind].sound.attenuation,
				'soundmaxdistance':molds[moldind].sound.maxdistance,
				'soundrollofffactor':molds[moldind].sound.rollofffactor,
				'soundrefdistance':molds[moldind].sound.refdistance,
				'soundconeinnerangle':molds[moldind].sound.coneinnerangle,
				'soundconeouterangle':molds[moldind].sound.coneouterangle,
				'soundconeoutergain':molds[moldind].sound.coneoutergain,
				'opacity':molds[moldind].opacity,
				'subdivisions':molds[moldind].subdivisions,
				'actionzoneid':molds[moldind].actionzoneid,
				'maxheight':molds[moldind].graphics.heightmap.maxheight,
				'csgmoldid':molds[moldind].csg.moldid,
				'csgaction':molds[moldind].csg.action,
				'webimageind':molds[moldind].graphics.webimageind,
				'alttagname':molds[moldind].alttag.name,
				'webtext':molds[moldind].webtext.webtext,
				'webstyle':molds[moldind].webtext.webstyle,
				'specularr':molds[moldind].color.specular.r,
				'specularg':molds[moldind].color.specular.g,
				'specularb':molds[moldind].color.specular.b,
				'emissiver':molds[moldind].color.emissive.r,
				'emissiveg':molds[moldind].color.emissive.g,
				'emissiveb':molds[moldind].color.emissive.b,
				'diffuser':molds[moldind].color.diffuse.r,
				'diffuseg':molds[moldind].color.diffuse.g,
				'diffuseb':molds[moldind].color.diffuse.b,
				'path1points':dGet('wtw_tmoldpath1points').value,
				'path2points':dGet('wtw_tmoldpath2points').value,
				'imageid':molds[moldind].graphics.webimages[0].imageid,
				'imagehoverid':molds[moldind].graphics.webimages[0].imagehoverid,
				'imageclickid':molds[moldind].graphics.webimages[0].imageclickid,
				'imagejsfunction':molds[moldind].graphics.webimages[0].jsfunction,
				'imagejsparameters':molds[moldind].graphics.webimages[0].jsparameters,
				'waterreflection':molds[moldind].graphics.waterreflection
			};

			/* function for after iframe loads */
			var onload = function(ipage) {
				ipage.getElementById('wtw_tcommunityid').value = request.communityid;
				ipage.getElementById('wtw_tbuildingid').value = request.buildingid;
				ipage.getElementById('wtw_tthingid').value = request.thingid;
				ipage.getElementById('wtw_tmoldid').value = request.moldid;
				ipage.getElementById('wtw_tmoldloadactionzoneid').value = request.loadactionzoneid;
				ipage.getElementById('wtw_tmoldmoldgroup').value = request.moldgroup;
				ipage.getElementById('wtw_tmoldshape').value = request.shape;
				ipage.getElementById('wtw_tmoldcovering').value = request.covering;
				ipage.getElementById('wtw_tmoldind').value = request.moldind;
				ipage.getElementById('wtw_tmoldpositionx').value = request.positionx;
				ipage.getElementById('wtw_tmoldpositiony').value = request.positiony;
				ipage.getElementById('wtw_tmoldpositionz').value = request.positionz;
				ipage.getElementById('wtw_tmoldscalingx').value = request.scalingx;
				ipage.getElementById('wtw_tmoldscalingy').value = request.scalingy;
				ipage.getElementById('wtw_tmoldscalingz').value = request.scalingz;
				ipage.getElementById('wtw_tmoldrotationx').value = request.rotationx;
				ipage.getElementById('wtw_tmoldrotationy').value = request.rotationy;
				ipage.getElementById('wtw_tmoldrotationz').value = request.rotationz;
				ipage.getElementById('wtw_tmoldspecial1').value = request.special1;
				ipage.getElementById('wtw_tmoldspecial2').value = request.special2;
				ipage.getElementById('wtw_tmolduoffset').value = request.uoffset;
				ipage.getElementById('wtw_tmoldvoffset').value = request.voffset;
				ipage.getElementById('wtw_tmolduscale').value = request.uscale;
				ipage.getElementById('wtw_tmoldvscale').value = request.vscale;
				ipage.getElementById('wtw_tmolduploadobjectid').value = request.uploadobjectid;
				ipage.getElementById('wtw_tmoldobjectfolder').value = request.objectfolder;
				ipage.getElementById('wtw_tmoldobjectfile').value = request.objectfile;
				ipage.getElementById('wtw_tmoldreceiveshadows').value = request.receiveshadows;
				ipage.getElementById('wtw_tmoldgraphiclevel').value = request.graphiclevel;
				ipage.getElementById('wtw_tmoldvideoid').value = request.videoid;
				ipage.getElementById('wtw_tmoldvideoposterid').value = request.videoposterid;
				ipage.getElementById('wtw_tmoldtextureid').value = request.textureid;
				ipage.getElementById('wtw_tmoldtexturebumpid').value = request.texturebumpid;
				ipage.getElementById('wtw_tmoldheightmapid').value = request.heightmapid;
				ipage.getElementById('wtw_tmoldmixmapid').value = request.mixmapid;
				ipage.getElementById('wtw_tmoldtexturerid').value = request.texturerid;
				ipage.getElementById('wtw_tmoldtexturegid').value = request.texturegid;
				ipage.getElementById('wtw_tmoldtexturebid').value = request.texturebid;
				ipage.getElementById('wtw_tmoldtexturebumprid').value = request.texturebumprid;
				ipage.getElementById('wtw_tmoldtexturebumpgid').value = request.texturebumpgid;
				ipage.getElementById('wtw_tmoldtexturebumpbid').value = request.texturebumpbid;
				ipage.getElementById('wtw_tmoldsoundid').value = request.soundid;
				ipage.getElementById('wtw_tmoldsoundname').value = request.soundname;
				ipage.getElementById('wtw_tmoldsoundattenuation').value = request.soundattenuation;
				ipage.getElementById('wtw_tmoldsoundloop').value = request.soundloop;
				ipage.getElementById('wtw_tmoldsoundmaxdistance').value = request.soundmaxdistance;
				ipage.getElementById('wtw_tmoldsoundrollofffactor').value = request.soundrollofffactor;
				ipage.getElementById('wtw_tmoldsoundrefdistance').value = request.soundrefdistance;
				ipage.getElementById('wtw_tmoldsoundconeinnerangle').value = request.soundconeinnerangle;
				ipage.getElementById('wtw_tmoldsoundconeouterangle').value = request.soundconeouterangle;
				ipage.getElementById('wtw_tmoldsoundconeoutergain').value = request.soundconeoutergain;
				ipage.getElementById('wtw_tmoldopacity').value = request.opacity;
				ipage.getElementById('wtw_tmoldsubdivisions').value = request.subdivisions;
				ipage.getElementById('wtw_tmoldactionzoneid').value = request.actionzoneid;
				ipage.getElementById('wtw_tmoldminheight').value = "0";
				ipage.getElementById('wtw_tmoldmaxheight').value = request.maxheight;
				ipage.getElementById('wtw_tmoldcheckcollisions').value = "1";
				ipage.getElementById('wtw_tmoldispickable').value = "1";
				ipage.getElementById('wtw_tmoldcsgmoldid').value = request.csgmoldid;
				ipage.getElementById('wtw_tmoldcsgaction').value = request.csgaction;
				ipage.getElementById('wtw_tmoldimageind').value = request.webimageind;
				ipage.getElementById('wtw_tmoldaddimagepath').value = "";
				ipage.getElementById('wtw_tmoldaddimagehoverpath').value = "";
				ipage.getElementById('wtw_tmoldalttag').value = request.alttagname;
				ipage.getElementById('wtw_tmoldwebtext').value = request.webtext;
				ipage.getElementById('wtw_tmoldwebstyle').value = request.webstyle;
				ipage.getElementById('wtw_tspecularcolorr').value = request.specularr;
				ipage.getElementById('wtw_tspecularcolorg').value = request.specularg;
				ipage.getElementById('wtw_tspecularcolorb').value = request.specularb;
				ipage.getElementById('wtw_temissivecolorr').value = request.emissiver;
				ipage.getElementById('wtw_temissivecolorg').value = request.emissiveg;
				ipage.getElementById('wtw_temissivecolorb').value = request.emissiveb;
				ipage.getElementById('wtw_tdiffusecolorr').value = request.diffuser;
				ipage.getElementById('wtw_tdiffusecolorg').value = request.diffuseg;
				ipage.getElementById('wtw_tdiffusecolorb').value = request.diffuseb;
				ipage.getElementById('wtw_tmoldpath1points').value = request.path1points;
				ipage.getElementById('wtw_tmoldpath2points').value = request.path2points;
				ipage.getElementById('wtw_tmoldaddimageid').value = request.imageid;
				ipage.getElementById('wtw_tmoldaddimagehoverid').value = request.imagehoverid;
				ipage.getElementById('wtw_tmoldaddimageclickid').value = request.imageclickid;
				ipage.getElementById('wtw_tmoldjsfunction').value = request.imagejsfunction;
				ipage.getElementById('wtw_tmoldjsparameters').value = request.imagejsparameters;
				ipage.getElementById('wtw_tmoldwaterreflection').value = request.waterreflection;
				ipage.getElementById('wtw_tmolddeleted').value = "0";
				ipage.getElementById('wtw_bsavemold').click();
			}
			/* iframe src, onload function */
			var iframe = WTW.createIFrame('/core/iframes/molds.php', onload);			
			dGet('wtw_tnewmold').value = "0";
			WTW.checkActionZones(molds[moldind]);
		}
		WTW.pluginsSubmitMoldForm(w);
		WTW.clearEditMold();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-submitMoldForm=" + ex.message);
	}
}

WTWJS.prototype.clearEditMold = function() {
	try {
		dGet('wtw_tmoldid').value = "";
		WTW.getLoadZoneList(WTW.getLoadActionZoneID("normal"));
		dGet('wtw_tmoldloadactionzoneid').selectedIndex = -1;
		dGet('wtw_tmoldcovering').selectedIndex = -1;
		dGet('wtw_tmoldcoveringold').value = "";
		dGet('wtw_tmoldshape').value = "";
		dGet('wtw_tmoldactionzoneid').value = "";
		dGet('wtw_tmoldpositionx').value = "0";
		dGet('wtw_tmoldpositiony').value = "0";
		dGet('wtw_tmoldpositionz').value = "0";
		dGet('wtw_tmoldscalingx').value = "1";
		dGet('wtw_tmoldscalingy').value = "1";
		dGet('wtw_tmoldscalingz').value = "1";
		dGet('wtw_tmoldrotationx').value = "0";
		dGet('wtw_tmoldrotationy').value = "0";
		dGet('wtw_tmoldrotationz').value = "0";
		dGet('wtw_tmoldspecial1').value = "0";
		dGet('wtw_tmoldspecial2').value = "0";
		dGet('wtw_tmoldsubdivisions').value = "12";
		dGet('wtw_tmoldopacity').value = "100";
		dGet('wtw_tmolduoffset').value = "0";
		dGet('wtw_tmoldvoffset').value = "0";
		dGet('wtw_tmolduscale').value = "0";
		dGet('wtw_tmoldvscale').value = "0";
		dGet('wtw_tmolduploadobjectid').value = "";
		dGet('wtw_tmoldobjectfolder').value = "";
		dGet('wtw_tmoldobjectfile').value = "";
		dGet('wtw_tmoldtextureid').value = "";
		dGet('wtw_tmoldtexturepath').value = "";
		dGet('wtw_tmoldtexturebumpid').value = "";
		dGet('wtw_tmoldtexturebumppath').value = "";
		dGet('wtw_tmoldheightmapid').value = "";
		dGet('wtw_tmoldheightmappath').value = "";
		dGet('wtw_tmoldmixmapid').value = "";
		dGet('wtw_tmoldmixmappath').value = "";
		dGet('wtw_tmoldtexturerid').value = "";
		dGet('wtw_tmoldtexturerpath').value = "";
		dGet('wtw_tmoldtexturegid').value = "";
		dGet('wtw_tmoldtexturegpath').value = "";
		dGet('wtw_tmoldtexturebid').value = "";
		dGet('wtw_tmoldtexturebpath').value = "";
		dGet('wtw_tmoldtexturebumprid').value = "";
		dGet('wtw_tmoldtexturebumprpath').value = "";
		dGet('wtw_tmoldtexturebumpgid').value = "";
		dGet('wtw_tmoldtexturebumpgpath').value = "";
		dGet('wtw_tmoldtexturebumpbid').value = "";
		dGet('wtw_tmoldtexturebumpbpath').value = "";
		dGet('wtw_tmoldvideoid').value = "";
		dGet('wtw_tmoldvideopath').value = "";
		dGet('wtw_tmoldvideoposterid').value = "";
		dGet('wtw_tmoldvideoposterpath').value = "";
		dGet('wtw_tmoldind').value = "-1";
		dGet('wtw_tmoldname').value = "";
		dGet('wtw_tmoldcsgmoldid').value = "";
		dGet('wtw_tmoldcsgaction').selectedIndex = -1;
		dGet('wtw_tmoldalttag').value = "";
		dGet('wtw_tspecularcolorr').value = "1";
		dGet('wtw_tspecularcolorg').value = "1";
		dGet('wtw_tspecularcolorb').value = "1";
		dGet('wtw_temissivecolorr').value = "1";
		dGet('wtw_temissivecolorg').value = "1";
		dGet('wtw_temissivecolorb').value = "1";
		dGet('wtw_tdiffusecolorr').value = "1";
		dGet('wtw_tdiffusecolorg').value = "1";
		dGet('wtw_tdiffusecolorb').value = "1";
		dGet('wtw_tmoldwebstyle').value = "";
		dGet('wtw_tmoldwebtext').value = "";
		dGet('wtw_tmoldsoundid').value = "";
		dGet('wtw_tmoldsoundname').value = "";
		dGet('wtw_tmoldsoundattenuation').selectedIndex = -1;
		dGet('wtw_tmoldsoundloop').checked = true;
		dGet('wtw_tmoldsoundmaxdistance').value = "100";
		dGet('wtw_tmoldsoundrollofffactor').value = "1";
		dGet('wtw_tmoldsoundrefdistance').value = "1";
		dGet('wtw_tmoldsoundconeinnerangle').value = "90";
		dGet('wtw_tmoldsoundconeouterangle').value = "180";
		dGet('wtw_tmoldsoundconeoutergain').value = ".5";
		dGet('wtw_tmoldimageind').value = "";
		dGet('wtw_tmoldwaterreflection').checked = false;
		dGet('wtw_tmoldmaxheight').value = "30";
		dGet('wtw_tmoldreceiveshadows').checked = false;
		dGet('wtw_tmoldgraphiclevel').checked = false;
		dGet('wtw_tmoldaddimagepath').value = "";
		dGet('wtw_tmoldaddimageid').value = "";
		dGet('wtw_tmoldaddimagehoverpath').value = "";
		dGet('wtw_tmoldaddimagehoverid').value = "";
		dGet('wtw_tmoldaddimageclickpath').value = "";
		dGet('wtw_tmoldaddimageclickid').value = "";
		dGet('wtw_tmoldimagejsfunction').value = "";
		dGet('wtw_tmoldimagejsparameters').value = "";
		WTW.pluginsClearEditMold();
		scene.render();
		WTW.closeEditPoles();
		WTW.setShownMolds();
		WTW.moldBackup = null;
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-clearEditMold=" + ex.message);
	}
}

WTWJS.prototype.updateMoldID = function(moldid,ind, moldgroup) {
	try {
		var i = -1;
		var molds = null;
		if (WTW.isNumeric(ind)) {
			i = Number(ind);
		}
		if (i > -1 && moldid.length > 0) {
			if (moldgroup == "building") {
				molds = WTW.buildingMolds;
			} else if (moldgroup == "community") {
				molds = WTW.communitiesMolds;
			} else if (moldgroup == "thing") {
				molds = WTW.thingMolds;
			}
			if (molds != null) {
				if (molds[i] != null) {
					molds[i].moldid = moldid;
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-updateMoldID=" + ex.message);
	}
}

WTWJS.prototype.openRecoverItems = function() {
	try {
		var path = "";
		if (buildingid != "") {
			path = "/connect/buildingrecoveritems.php?buildingid=" + buildingid;
		} else if (communityid != "") {
			path = "/connect/communityrecoveritems.php?communityid=" + communityid;
		} else if (thingid != "") {
			path = "/connect/thingrecoveritems.php?thingid=" + thingid;
		}
		dGet('wtw_deleteditemslist').innerHTML = "";
		if (path != "") {
			WTW.getJSON(path, 
				function(response) {
					var recoverylist = JSON.parse(response);
					if (recoverylist != null) {
						for (var i=0;i < recoverylist.length;i++) {
							if (recoverylist[i].itemid != null) {
								dGet("wtw_deleteditemslist").innerHTML += "<div id=\"wtw_brecover" + recoverylist[i].itemid + "\" name=\"wtw_brecover" + recoverylist[i].itemid + "\" onclick=\"WTW.recoverMold('" + recoverylist[i].itemid + "','" + recoverylist[i].itemtype + "');\" style='cursor: pointer;' class='wtw-menulevel2'>Recover '" + recoverylist[i].item + "'</div>\r\n";
							}
						}
					}
					WTW.setWindowSize();
				}
			);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openRecoverItems=" + ex.message);
	}
}

WTWJS.prototype.recoverMold = function(zmoldid, zmoldtype) {
	try {
		switch (zmoldtype) {
			case "communitymolds":
				var request = {
					'moldid':zmoldid
				};
				/* function for after iframe loads */
				var onload = function(ipage) {
					ipage.getElementById('wtw_tcommunityid').value = communityid;
					ipage.getElementById('wtw_tbuildingid').value = buildingid;
					ipage.getElementById('wtw_tthingid').value = thingid;
					ipage.getElementById('wtw_tmoldid').value = request.moldid;
					ipage.getElementById('wtw_tmolddeleted').value = "0";
					ipage.getElementById('wtw_bdeletemold').click();
				}
				/* iframe src, onload function */
				var iframe = WTW.createIFrame('/core/iframes/molds.php', onload);
				var communityind = -1;
				WTW.getJSON("/connect/communitymoldsrecover.php?communityid=" + communityid + "&communityind=" + communityind + "&communitymoldid=" + zmoldid, 
					function(response) {
						var communitymold = JSON.parse(response);
						var moldgroup = "community";
						var moldind = WTW.getNextCount(WTW.communitiesMolds);
						if (communitymold != null) {
							if (communitymold.molds[0] != null) {
								WTW.communitiesMolds[moldind] = communitymold.molds[0];
							}
						}
						if (WTW.communitiesMolds[moldind] != null) {
							WTW.communitiesMolds[moldind].moldind = moldind;
							WTW.communitiesMolds[moldind].connectinggridid = dGet('wtw_tconnectinggridid').value;
							WTW.communitiesMolds[moldind].connectinggridind = Number(dGet('wtw_tconnectinggridind').value);
							WTW.communitiesMolds[moldind].parentname = "connectinggrids-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "--";
							WTW.communitiesMolds[moldind].moldname = "communitymolds-" + moldind + "-" + WTW.communitiesMolds[moldind].moldid + "-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "-" + WTW.communitiesMolds[moldind].shape;
							WTW.communitiesMolds[moldind].shown = "0";
							WTW.openMoldForm(moldind,WTW.communitiesMolds[moldind].shape,moldgroup);
						}
						WTW.setWindowSize();
					}
				);			
				break;		
			case "buildingmolds":
				var request = {
					'moldid':zmoldid
				};
				/* function for after iframe loads */
				var onload = function(ipage) {
					ipage.getElementById('wtw_tcommunityid').value = communityid;
					ipage.getElementById('wtw_tbuildingid').value = buildingid;
					ipage.getElementById('wtw_tthingid').value = thingid;
					ipage.getElementById('wtw_tmoldid').value = request.moldid;
					ipage.getElementById('wtw_tmolddeleted').value = "0";
					ipage.getElementById('wtw_bdeletemold').click();
				}
				/* iframe src, onload function */
				var iframe = WTW.createIFrame('/core/iframes/molds.php', onload);
				var buildingind = WTW.getBuildingInd(buildingid);
				WTW.getJSON("/connect/buildingmoldsrecover.php?buildingid=" + buildingid + "&buildingind=" + buildingind + "&buildingmoldid=" + zmoldid, 
					function(response) {
						var buildingmold = JSON.parse(response);
						var moldgroup = "building";
						var moldind = WTW.getNextCount(WTW.buildingMolds);
						if (buildingmold != null) {
							if (buildingmold.molds[0] != null) {
								WTW.buildingMolds[moldind] = buildingmold.molds[0];
							}
						}
						if (WTW.buildingMolds[moldind] != null) {
							WTW.buildingMolds[moldind].moldind = moldind;
							WTW.buildingMolds[moldind].connectinggridid = dGet('wtw_tconnectinggridid').value;
							WTW.buildingMolds[moldind].connectinggridind = Number(dGet('wtw_tconnectinggridind').value);
							WTW.buildingMolds[moldind].parentname = "connectinggrids-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "--";
							WTW.buildingMolds[moldind].moldname = "buildingmolds-" + moldind + "-" + WTW.buildingMolds[moldind].moldid + "-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "-" + WTW.buildingMolds[moldind].shape;
							WTW.buildingMolds[moldind].shown = "0";
							WTW.openMoldForm(moldind,WTW.buildingMolds[moldind].shape,moldgroup);
						}
						WTW.setWindowSize();
					}
				);
				break;
			case "thingmolds":
				var request = {
					'moldid':zmoldid
				};
				/* function for after iframe loads */
				var onload = function(ipage) {
					ipage.getElementById('wtw_tcommunityid').value = communityid;
					ipage.getElementById('wtw_tbuildingid').value = buildingid;
					ipage.getElementById('wtw_tthingid').value = thingid;
					ipage.getElementById('wtw_tmoldid').value = request.moldid;
					ipage.getElementById('wtw_tmolddeleted').value = "0";
					ipage.getElementById('wtw_bdeletemold').click();
				}
				/* iframe src, onload function */
				var iframe = WTW.createIFrame('/core/iframes/molds.php', onload);
				var thingind = WTW.getThingInd(thingid);
				WTW.getJSON("/connect/thingmoldsrecover.php?thingid=" + thingid + "&thingind=" + thingind + "&thingmoldid=" + zmoldid, 
					function(response) {
						var thingmold = JSON.parse(response);
						var moldgroup = "thing";
						var moldind = WTW.getNextCount(WTW.thingMolds);
						if (thingmold != null) {
							if (thingmold.molds[0] != null) {
								WTW.thingMolds[moldind] = thingmold.molds[0];
							}
						}
						if (WTW.thingMolds[moldind] != null) {
							WTW.thingMolds[moldind].moldind = moldind;
							WTW.thingMolds[moldind].connectinggridid = dGet('wtw_tconnectinggridid').value;
							WTW.thingMolds[moldind].connectinggridind = Number(dGet('wtw_tconnectinggridind').value);
							WTW.thingMolds[moldind].parentname = "connectinggrids-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "--";
							WTW.thingMolds[moldind].moldname = "thingmolds-" + moldind + "-" + WTW.thingMolds[moldind].moldid + "-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "-" + WTW.thingMolds[moldind].shape;
							WTW.thingMolds[moldind].shown = "0";
							WTW.openMoldForm(moldind,WTW.thingMolds[moldind].shape,moldgroup);
						}
						WTW.setWindowSize();
					}
				);
				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-recoverMold=" + ex.message);
	}
}

WTWJS.prototype.createDuplicateShape = function() {
	try {
		var originalmoldind = Number(dGet('wtw_tmoldind').value);
		var shape = dGet('wtw_tmoldshape').value;
		var moldgroup = dGet('wtw_tmoldmoldgroup').value;
		var molds = null;
		var mold = null;
		var moldind = -1;
		var moldid = WTW.getRandomString(16);
		var coords = WTW.getNewCoordinates(50);
		var positionX = coords.positionX;
		var positionY = coords.positionY;
		var positionZ = coords.positionZ;
		var rotationY = coords.rotationY;
		switch (moldgroup) {
			case "community":
				molds = WTW.communitiesMolds;
				break;
			case "building":
				molds = WTW.buildingMolds;
				break;
			case "thing":
				positionX = 0;
				positionZ = 0;
				molds = WTW.thingMolds;
				break;
		}
		if (molds != null) {
			moldind = WTW.getNextCount(molds);
			molds[moldind] = JSON.parse(JSON.stringify(molds[originalmoldind]));
			molds[moldind].moldid = moldid;
			molds[moldind].moldind = moldind;
			molds[moldind].actionzoneid = "";
			molds[moldind].actionzoneind = "";
			molds[moldind].position.x = positionX;
			molds[moldind].position.z = positionZ;
			molds[moldind].moldname = moldgroup + "molds-" + moldind + "-" + moldid + "-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "-" + molds[moldind].shape;
			molds[moldind].parentname = "connectinggrids-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "--";
			molds[moldind].connectinggridid = dGet('wtw_tconnectinggridid').value;
			molds[moldind].connectinggridind = dGet('wtw_tconnectinggridind').value;
			molds[moldind].shown = "0";
			WTW.setShownMolds();
			dGet('wtw_tmoldind').value = moldind;
			dGet('wtw_tmoldid').value = moldid;
			WTW.openMoldForm(moldind,shape,moldgroup,false);
		}
		dGet('wtw_tmoldpositionx').value = positionX;
		dGet('wtw_tmoldpositionz').value = positionZ;
		dGet('wtw_tmoldactionzoneid').value = "";
		dGet('wtw_tmoldcsgaction').selectedIndex = 0;
		dGet('wtw_tmoldcsgmoldid').value = "";
		WTW.setWindowSize();
		window.setTimeout(function() {
			WTW.setNewMold();
		},200);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-createDuplicateShape=" + ex.message);
	}
}

WTWJS.prototype.showActionZone = function(actionzoneind) {
	try {
		if (WTW.actionZones[actionzoneind] != null) {
			switch (WTW.actionZones[actionzoneind].actionzonetype) {
				case "loadzone":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, .2);
					break;
				case "slidingdoor":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, .2);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 1);
					break;
				case "swingingdoor":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, .2);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 1);
					break;
				case "clickactivatedslidingdoor":
					//WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, .2);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 1);
					break;
				case "mirror":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, .2);
					break;
				case "ridealong":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 1);
					break;
				case "rotate":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, .2);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 1);
					break;
				case "peoplemover":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, .2);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 1);
					break;
				case "elevator":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, .2);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 1);
					break;
				case "passengerseat":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, .2);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 1);
					break;
				case "driverseat":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, .2);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 1);
					break;
				case "driverturnangle":
					//WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, .2);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 1);
					break;
				case "driverturningwheel":
					//WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, .2);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 1);
					WTW.setOpacity("actionzoneaxlepole2-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 1);
					break;
				case "driverwheel":
					//WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, .2);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 1);
					break;
				default:
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 1);
					break;
			}
			var actionzone = scene.getMeshByID("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
			var actionzoneaxle = scene.getMeshByID("actionzoneaxle-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
			var actionzoneaxlepole = scene.getMeshByID("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
			var actionzoneaxlebase = scene.getMeshByID("actionzoneaxlebase-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
			var actionzoneaxlebase2 = scene.getMeshByID("actionzoneaxlebase2-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
			if (actionzone != null) {
				actionzone.isVisible = true;
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-showActionZone=" + ex.message);
	}
}

WTWJS.prototype.hideActionZone = function(actionzoneind) {
	try {
		if (WTW.actionZones[actionzoneind] != null) {
			switch (WTW.actionZones[actionzoneind].actionzonetype) {
				case "loadzone":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					break;
				case "slidingdoor":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					break;
				case "swingingdoor":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					break;
				case "clickactivatedslidingdoor":
					//WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					break;
				case "mirror":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					break;
				case "ridealong":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					break;
				case "rotate":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					break;
				case "peoplemover":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					break;
				case "elevator":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					break;
				case "passengerseat":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					break;
				case "driverseat":
					WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					break;
				case "driverturnangle":
					//WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					break;
				case "driverturningwheel":
					//WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					WTW.setOpacity("actionzoneaxlepole2-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					break;
				case "driverwheel":
					//WTW.setOpacity("actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
					WTW.setOpacity("actionzoneaxlepole-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype, 0);
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-hideActionZone=" + ex.message);
	}
}

WTWJS.prototype.openActionZoneForm = function(actionzoneid) {
	try {
		var commbuildingind = -1;
		var parentname = dGet('wtw_tconnectinggridname').value;
		var moldgroup = "building";
		WTW.hideAdminMenu();
		WTW.show('wtw_adminmenu20');
		WTW.show('wtw_adminmenu20b');
		if (communityid != "") {
			moldgroup = "community";
		} else if (thingid != "") {
			moldgroup = "thing";
		}
		dGet('wtw_tmoldshape').value = "box";
		dGet('wtw_tmoldmoldgroup').value = moldgroup;
		WTW.setDDLValue("wtw_tmoldcovering", "texture");
		var actionzonetype = "";
		for (var i=0;i < dGet('wtw_tactionzonetypelist').options.length;i++) {
			if (actionzoneid == dGet('wtw_tactionzonetypelist').options[i].value) {
				actionzonetype = actionzoneid;
			}
		}
		if (actionzonetype != "") {
			var defaultloadactionzoneid = WTW.getLoadActionZoneID("High");
			WTW.getLoadActionZoneList(defaultloadactionzoneid);
			actionzoneid = WTW.getRandomString(16);
			dGet('wtw_tactionzoneid').value = actionzoneid;
			dGet('wtw_tactionzonetype').value = actionzonetype;
			WTW.setNewActionZoneDefaults(actionzonetype);
			WTW.setActionZoneFormFields(actionzonetype);
			var actionzoneind = WTW.getNextCount(WTW.actionZones);
			dGet('wtw_tactionzoneind').value = actionzoneind;
			WTW.actionZones[actionzoneind] = WTW.newActionZone();
			WTW.actionZones[actionzoneind].actionzoneid = actionzoneid;
			WTW.actionZones[actionzoneind].actionzoneind = actionzoneind;
			WTW.actionZones[actionzoneind].buildinginfo.buildingid = buildingid;
			WTW.actionZones[actionzoneind].communityinfo.communityid = communityid;
			WTW.actionZones[actionzoneind].thinginfo.thingid = thingid;
			WTW.actionZones[actionzoneind].actionzonename = dGet('wtw_tactionzonename').value;
			WTW.actionZones[actionzoneind].actionzonetype = dGet('wtw_tactionzonetype').value;
			WTW.actionZones[actionzoneind].actionzoneshape = dGet('wtw_tactionzoneshape').value;
			WTW.actionZones[actionzoneind].position.x = dGet('wtw_tactionzoneposx').value;
			WTW.actionZones[actionzoneind].position.y = dGet('wtw_tactionzoneposy').value;
			WTW.actionZones[actionzoneind].position.z = dGet('wtw_tactionzoneposz').value;
			WTW.actionZones[actionzoneind].scaling.x = dGet('wtw_tactionzonescalingx').value;
			WTW.actionZones[actionzoneind].scaling.y = dGet('wtw_tactionzonescalingy').value;
			WTW.actionZones[actionzoneind].scaling.z = dGet('wtw_tactionzonescalingz').value;
			WTW.actionZones[actionzoneind].rotation.x = dGet('wtw_tactionzonerotx').value;
			WTW.actionZones[actionzoneind].rotation.y = dGet('wtw_tactionzoneroty').value;
			WTW.actionZones[actionzoneind].rotation.z = dGet('wtw_tactionzonerotz').value;
			WTW.actionZones[actionzoneind].axis.position.x = dGet('wtw_taxispositionx').value;
			WTW.actionZones[actionzoneind].axis.position.y = dGet('wtw_taxispositiony').value;
			WTW.actionZones[actionzoneind].axis.position.z = dGet('wtw_taxispositionz').value;
			WTW.actionZones[actionzoneind].axis.rotation.x = dGet('wtw_taxisrotationx').value;
			WTW.actionZones[actionzoneind].axis.rotation.y = dGet('wtw_taxisrotationy').value;
			WTW.actionZones[actionzoneind].axis.rotation.z = dGet('wtw_taxisrotationz').value;
			WTW.actionZones[actionzoneind].axis.rotateaxis = dGet('wtw_tactionzonerotateaxis').value;
			WTW.actionZones[actionzoneind].axis.rotatedegrees = dGet('wtw_tactionzonerotatedegrees').value;
			WTW.actionZones[actionzoneind].axis.rotatedirection = "1";
			WTW.actionZones[actionzoneind].attachmoldid = dGet('wtw_tattachmoldid').value;
			WTW.actionZones[actionzoneind].movementtype = dGet('wtw_tactionzonemovementtype').value;
			WTW.actionZones[actionzoneind].rotatespeed = dGet('wtw_tactionzonerotatespeed').value;
			WTW.actionZones[actionzoneind].movementdistance = dGet('wtw_taxisscalingz').value;
			WTW.actionZones[actionzoneind].parentname = parentname;
			WTW.actionZones[actionzoneind].jsfunction = dGet('wtw_tactionzonejsfunction').value;
			WTW.actionZones[actionzoneind].jsparameters = dGet('wtw_tactionzonejsparameters').value;
			WTW.actionZones[actionzoneind].loadactionzoneid = defaultloadactionzoneid;
			WTW.actionZones[actionzoneind].connectinggridid = dGet("wtw_tconnectinggridid").value;
			WTW.actionZones[actionzoneind].connectinggridind = dGet("wtw_tconnectinggridind").value;
			WTW.actionZones[actionzoneind].parentname = WTW.getParentName(WTW.actionZones[actionzoneind].connectinggridind);
			WTW.actionZones[actionzoneind].moldname = "actionzone-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype;
			WTW.addActionZone(WTW.actionZones[actionzoneind].moldname, WTW.actionZones[actionzoneind]);
			WTW.showActionZone(actionzoneind);
			if (actionzonetype == "passengerseat" || actionzonetype == "driverseat") {	
				dGet('wtw_tattachavatarmoldname').value = WTW.actionZones[actionzoneind].moldname.replace("actionzone-","actionzoneaxlebase2-");
			}
			dGet('wtw_actionzonepartslist').innerHTML = "";
			WTW.submitActionZoneForm(2);
			var safetyincrement = 0;
			var newaztimer = window.setInterval(function() {
				safetyincrement += 1;
				var actionzone = scene.getMeshByID(WTW.actionZones[actionzoneind].moldname);
				if (actionzone != null || safetyincrement > 50) {
					WTW.setNewActionZone();
					window.clearInterval(newaztimer);
					newaztimer = null;
				}
			},100);
		} else {
			dGet('wtw_tactionzoneid').value = actionzoneid;
			var actionzoneind = WTW.getActionZoneInd(actionzoneid,dGet("wtw_tconnectinggridind").value);
			dGet('wtw_tactionzoneind').value = actionzoneind;
			if (WTW.actionZones[actionzoneind] != null) {
				dGet('wtw_editactionzoneformtitle').innerHTML = "Edit " + WTW.actionZones[actionzoneind].actionzonename;
				dGet('wtw_tactionzonetype').value = WTW.actionZones[actionzoneind].actionzonetype;
				actionzonetype = dGet('wtw_tactionzonetype').value;
				dGet('wtw_tactionzonerotateaxis').value = WTW.actionZones[actionzoneind].axis.rotateaxis;
				dGet('wtw_tactionzonename').value = WTW.actionZones[actionzoneind].actionzonename;
				dGet('wtw_tactionzonerotatedegrees').value = WTW.actionZones[actionzoneind].axis.rotatedegrees;
				if (Number(WTW.actionZones[actionzoneind].scaling.x) == 20 && Number(WTW.actionZones[actionzoneind].scaling.y) == 20 && Number(WTW.actionZones[actionzoneind].scaling.z) == 20 && Number(WTW.actionZones[actionzoneind].position.x) == Number(WTW.actionZones[actionzoneind].axis.position.x) && Number(WTW.actionZones[actionzoneind].position.y) == Number(WTW.actionZones[actionzoneind].axis.position.y) && Number(WTW.actionZones[actionzoneind].position.z) == Number(WTW.actionZones[actionzoneind].axis.position.z)) {
					dGet('wtw_tcopyaxletoactionzone').checked = true;
				} else {
					dGet('wtw_tcopyaxletoactionzone').checked = false;
				}
				dGet('wtw_taxisscalingx').value = ".20";
				dGet('wtw_taxisscalingy').value = ".20";						
				dGet('wtw_tactionzoneshape').value = WTW.actionZones[actionzoneind].actionzoneshape;
				dGet('wtw_tactionzonemovementtype').value = WTW.actionZones[actionzoneind].movementtype;
				dGet('wtw_taxispositionx').value = WTW.actionZones[actionzoneind].axis.position.x;
				dGet('wtw_taxispositiony').value = WTW.actionZones[actionzoneind].axis.position.y;
				dGet('wtw_taxispositionz').value = WTW.actionZones[actionzoneind].axis.position.z;
				dGet('wtw_taxisrotationx').value = WTW.actionZones[actionzoneind].axis.rotation.x;
				dGet('wtw_taxisrotationy').value = WTW.actionZones[actionzoneind].axis.rotation.y;
				dGet('wtw_taxisrotationz').value = WTW.actionZones[actionzoneind].axis.rotation.z;
				dGet('wtw_tactionzoneposx').value = WTW.actionZones[actionzoneind].position.x;
				dGet('wtw_tactionzoneposy').value = WTW.actionZones[actionzoneind].position.y;
				dGet('wtw_tactionzoneposz').value = WTW.actionZones[actionzoneind].position.z;
				dGet('wtw_tactionzonescalingx').value = WTW.actionZones[actionzoneind].scaling.x;
				dGet('wtw_tactionzonescalingy').value = WTW.actionZones[actionzoneind].scaling.y;
				dGet('wtw_tactionzonescalingz').value = WTW.actionZones[actionzoneind].scaling.z;
				dGet('wtw_tactionzonerotx').value = WTW.actionZones[actionzoneind].rotation.x;
				dGet('wtw_tactionzoneroty').value = WTW.actionZones[actionzoneind].rotation.y;
				dGet('wtw_tactionzonerotz').value = WTW.actionZones[actionzoneind].rotation.z;
				dGet('wtw_tattachmoldid').value = WTW.actionZones[actionzoneind].attachmoldid;
				dGet('wtw_taxisscalingz').value = WTW.actionZones[actionzoneind].movementdistance;
				dGet('wtw_tactionzonerotatespeed').value = WTW.actionZones[actionzoneind].rotatespeed;
				dGet('wtw_tactionzonejsfunction').value = WTW.actionZones[actionzoneind].jsfunction;
				dGet('wtw_tactionzonejsparameters').value = WTW.actionZones[actionzoneind].jsparameters;	
				WTW.getLoadActionZoneList(WTW.actionZones[actionzoneind].loadactionzoneid);
				WTW.setActionZoneFormFields(dGet('wtw_tactionzonetype').value);
				if (actionzonetype == "passengerseat" || actionzonetype == "driverseat") {	
					dGet('wtw_tattachavatarmoldname').value = WTW.actionZones[actionzoneind].moldname.replace("actionzone-","actionzoneaxlebase2-");
				}
				var actionzone = scene.getMeshByID(WTW.actionZones[actionzoneind].moldname);
				if (actionzone == null) {
					WTW.addActionZone(WTW.actionZones[actionzoneind].moldname, WTW.actionZones[actionzoneind]);
				}
				WTW.showActionZone(actionzoneind);
				var actionzoneaxlebase2 = scene.getMeshByID(WTW.actionZones[actionzoneind].moldname.replace("actionzone-","actionzoneaxlebase2-"));
				var actionzoneaxle = scene.getMeshByID(WTW.actionZones[actionzoneind].moldname.replace("actionzone-","actionzoneaxle-"));
				dGet('wtw_actionzonepartslist').innerHTML = "";
				if (actionzoneaxlebase2 != null) {
					var moldparts1 = actionzoneaxlebase2.getChildren();
					if (moldparts1.length > 0) {
						for (var i=0;i<moldparts1.length;i++) {
							var moldpartname = moldparts1[i].name;
							var shape = i;
							if (moldpartname.indexOf("-") > -1) {
								var namepart = moldpartname.split('-');
								shape = namepart[5];
							}
							if (moldpartname.indexOf("molds") > -1) {
								dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightActionZonePart('" + moldpartname + "');\" onmouseout=\"WTW.unHilightActionZonePart();\" onclick=\"WTW.removeActionZonePart('" + moldpartname + "')\">Action Zone Part (" + shape + ")</div>";
							}
						}
					}
				}
				if (actionzoneaxle != null) {
					var moldparts2 = actionzoneaxle.getChildren();
					if (moldparts2.length > 0) {
						for (var i=0;i<moldparts2.length;i++) {
							var moldpartname = moldparts2[i].name;
							var shape = i;
							if (moldpartname.indexOf("-") > -1) {
								var namepart = moldpartname.split('-');
								shape = namepart[5];
							}
							if (moldpartname.indexOf("molds") > -1) {
								dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightActionZonePart('" + moldpartname + "');\" onmouseout=\"WTW.unHilightActionZonePart();\" onclick=\"WTW.removeActionZonePart('" + moldpartname + "')\">Action Zone Part (" + shape + ")</div>";
							}
						}
					}
				}
				if (actionzonetype == "passengerseat" || actionzonetype == "driverseat") {
					for (var j=0; j < WTW.thingMolds.length; j++) {
						if (WTW.thingMolds[j] != null) {
							if (WTW.thingMolds[j].actionzoneid == actionzoneid) {
								dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightActionZonePart('" + WTW.thingMolds[j].moldname + "');\" onmouseout=\"WTW.unHilightActionZonePart();\" onclick=\"WTW.removeActionZonePart('" + WTW.thingMolds[j].moldname + "')\">Action Zone Part (" + WTW.thingMolds[j].shape + ")</div>";
							}
						}
					}
					for (var j=0; j < WTW.buildingMolds.length; j++) {
						if (WTW.buildingMolds[j] != null) {
							if (WTW.buildingMolds[j].actionzoneid == actionzoneid) {
								dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightActionZonePart('" + WTW.buildingMolds[j].moldname + "');\" onmouseout=\"WTW.unHilightActionZonePart();\" onclick=\"WTW.removeActionZonePart('" + WTW.buildingMolds[j].moldname + "')\">Action Zone Part (" + WTW.buildingMolds[j].shape + ")</div>";
							}
						}
					}
					for (var j=0; j < WTW.communitiesMolds.length; j++) {
						if (WTW.communitiesMolds[j] != null) {
							if (WTW.communitiesMolds[j].actionzoneid == actionzoneid) {
								dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightActionZonePart('" + WTW.communitiesMolds[j].moldname + "');\" onmouseout=\"WTW.unHilightActionZonePart();\" onclick=\"WTW.removeActionZonePart('" + WTW.communitiesMolds[j].moldname + "')\">Action Zone Part (" + WTW.communitiesMolds[j].shape + ")</div>";
							}
						}
					}
				}
				WTW.setNewActionZone();
			}
		}	
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openActionZoneForm=" + ex.message);
	}
}		

WTWJS.prototype.closeActionZoneForm = function() {
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-closeActionZoneForm=" + ex.message);
	}
}

WTWJS.prototype.setActionZonePosition = function() {
	try {
		if (dGet('wtw_tcopyaxletoactionzone').checked == true) {
			dGet('wtw_tactionzoneposx').value = dGet('wtw_taxispositionx').value;
			dGet('wtw_tactionzoneposy').value = dGet('wtw_taxispositiony').value;
			dGet('wtw_tactionzoneposz').value = dGet('wtw_taxispositionz').value;
			WTW.setNewActionZone();
		}   
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setActionZonePosition=" + ex.message);
	}
}

WTWJS.prototype.submitActionZoneForm = function(w) {
	try {
		if (w != 2) {
			WTW.closeEditPoles();
		}
		if (dGet('wtw_tactionzonetype').value == "loadzone" && dGet('wtw_tactionzonename').value.toLowerCase().indexOf("custom") == -1) {
			dGet('wtw_tactionzonename').value = "Custom: " + dGet('wtw_tactionzonename').value;
		}
		if (w == 0) {
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
			var request = {
				'actionzoneid':dGet('wtw_tactionzoneid').value
			};
			if (dGet('wtw_tactionzoneid').value != "") {
				/* function for after iframe loads */
				var onload = function(ipage) {
					ipage.getElementById('wtw_tcommunityid').value = communityid;
					ipage.getElementById('wtw_tbuildingid').value = buildingid;
					ipage.getElementById('wtw_tthingid').value = thingid;
					ipage.getElementById('wtw_tactionzoneid').value = request.actionzoneid;
					ipage.getElementById('wtw_bdeleteactionzone').click();	
				}
				/* iframe src, onload function */
				var iframe = WTW.createIFrame('/core/iframes/actionzones.php', onload);
			}
		} else {
			var zactionzoneind = Number(dGet('wtw_tactionzoneind').value);
			var loadactionzoneid = "";
			if (dGet('wtw_tazloadactionzoneid').selectedIndex > -1) {
				loadactionzoneid = dGet('wtw_tazloadactionzoneid').options[dGet('wtw_tazloadactionzoneid').selectedIndex].value;
			}
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
				WTW.actionZones[zactionzoneind].loadactionzone = loadactionzoneid;
				WTW.actionZones[zactionzoneind].jsfunction = dGet('wtw_tactionzonejsfunction').value;
				WTW.actionZones[zactionzoneind].jsparameters = dGet('wtw_tactionzonejsparameters').value;
			}
			
			var request = {
				'actionzoneid':dGet('wtw_tactionzoneid').value,
				'actionzoneind':dGet('wtw_tactionzoneind').value,
				'actionzonename':dGet('wtw_tactionzonename').value,
				'axispositionx':dGet('wtw_taxispositionx').value,
				'axispositiony':dGet('wtw_taxispositiony').value,
				'axispositionz':dGet('wtw_taxispositionz').value,
				'axisrotationx':dGet('wtw_taxisrotationx').value,
				'axisrotationy':dGet('wtw_taxisrotationy').value,
				'axisrotationz':dGet('wtw_taxisrotationz').value,
				'axisscalingx':dGet('wtw_taxisscalingx').value,
				'axisscalingy':dGet('wtw_taxisscalingy').value,
				'axisscalingz':dGet('wtw_taxisscalingz').value,
				'actionzonetype':dGet('wtw_tactionzonetype').value,
				'actionzoneshape':dGet('wtw_tactionzoneshape').value,
				'attachmoldid':dGet('wtw_tattachmoldid').value,
				'movementtype':dGet('wtw_tactionzonemovementtype').value,
				'rotatespeed':dGet('wtw_tactionzonerotatespeed').value,
				'actionzoneposx':dGet('wtw_tactionzoneposx').value,
				'actionzoneposy':dGet('wtw_tactionzoneposy').value,
				'actionzoneposz':dGet('wtw_tactionzoneposz').value,
				'actionzonescalingx':dGet('wtw_tactionzonescalingx').value,
				'actionzonescalingy':dGet('wtw_tactionzonescalingy').value,
				'actionzonescalingz':dGet('wtw_tactionzonescalingz').value,
				'actionzonerotx':dGet('wtw_tactionzonerotx').value,
				'actionzoneroty':dGet('wtw_tactionzoneroty').value,
				'actionzonerotz':dGet('wtw_tactionzonerotz').value,
				'jsfunction':dGet('wtw_tactionzonejsfunction').value,
				'jsparameters':dGet('wtw_tactionzonejsparameters').value,
				'rotateaxis':dGet('wtw_tactionzonerotateaxis').value,
				'rotatedegrees':dGet('wtw_tactionzonerotatedegrees').value,
				'loadactionzoneid':loadactionzoneid
			};
			/* function for after iframe loads */
			var onload = function(ipage) {
				ipage.getElementById('wtw_tcommunityid').value = communityid;
				ipage.getElementById('wtw_tbuildingid').value = buildingid;
				ipage.getElementById('wtw_tthingid').value = thingid;
				ipage.getElementById('wtw_tactionzoneid').value = request.actionzoneid;
				ipage.getElementById('wtw_tactionzoneind').value = request.actionzoneind;
				ipage.getElementById('wtw_tactionzonename').value = request.actionzonename;
				ipage.getElementById('wtw_taxispositionx').value = request.axispositionx;
				ipage.getElementById('wtw_taxispositiony').value = request.axispositiony;
				ipage.getElementById('wtw_taxispositionz').value = request.axispositionz;		
				ipage.getElementById('wtw_taxisrotationx').value = request.axisrotationx;
				ipage.getElementById('wtw_taxisrotationy').value = request.axisrotationy;
				ipage.getElementById('wtw_taxisrotationz').value = request.axisrotationz;		
				ipage.getElementById('wtw_taxisscalingx').value = request.axisscalingx;
				ipage.getElementById('wtw_taxisscalingy').value = request.axisscalingy;
				ipage.getElementById('wtw_taxisscalingz').value = request.axisscalingz;
				ipage.getElementById('wtw_tactionzonetype').value = request.actionzonetype;
				ipage.getElementById('wtw_tactionzoneshape').value = request.actionzoneshape;
				ipage.getElementById('wtw_tattachmoldid').value = request.attachmoldid;
				ipage.getElementById('wtw_tactionzonemovementtype').value = request.movementtype;
				ipage.getElementById('wtw_tactionzonerotatespeed').value = request.rotatespeed;
				ipage.getElementById('wtw_tactionzoneposx').value = request.actionzoneposx;
				ipage.getElementById('wtw_tactionzoneposy').value = request.actionzoneposy;
				ipage.getElementById('wtw_tactionzoneposz').value = request.actionzoneposz;
				ipage.getElementById('wtw_tactionzonescalingx').value = request.actionzonescalingx;
				ipage.getElementById('wtw_tactionzonescalingy').value = request.actionzonescalingy;
				ipage.getElementById('wtw_tactionzonescalingz').value = request.actionzonescalingz;		
				ipage.getElementById('wtw_tactionzonerotx').value = request.actionzonerotx;
				ipage.getElementById('wtw_tactionzoneroty').value = request.actionzoneroty;
				ipage.getElementById('wtw_tactionzonerotz').value = request.actionzonerotz;
				ipage.getElementById('wtw_tactionzonejsfunction').value = request.jsfunction;
				ipage.getElementById('wtw_tactionzonejsparameters').value = request.jsparameters;
				ipage.getElementById('wtw_tactionzonerotateaxis').value = request.rotateaxis;
				ipage.getElementById('wtw_tactionzonerotatedirection').value = "1";
				ipage.getElementById('wtw_tactionzonerotatedegrees').value = request.rotatedegrees;	
				ipage.getElementById('wtw_tazloadactionzoneid').value = request.loadactionzoneid;
				ipage.getElementById('wtw_bsaveactionzone').click();	
			}
			/* iframe src, onload function */
			var iframe = WTW.createIFrame('/core/iframes/actionzones.php', onload);
		}
		if (w != 2) {
			WTW.hideAdminMenu();
			WTW.backToEdit();
			WTW.hideActionZone(Number(dGet('wtw_tactionzoneind').value));
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-submitActionZoneForm=" + ex.message);
	}
}

WTWJS.prototype.clearActionZone = function(zmoldswithactionzones, zactionzoneid) {
	try {
		var request = {
			'actionzoneid':zactionzoneid,
			'moldswithactionzones':zmoldswithactionzones
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tcommunityid').value = communityid;
			ipage.getElementById('wtw_tbuildingid').value = buildingid;
			ipage.getElementById('wtw_tthingid').value = thingid;
			ipage.getElementById('wtw_tmoldactionzoneid').value = request.actionzoneid;
			ipage.getElementById('wtw_tmoldswithactionzones').value = request.moldswithactionzones;
			ipage.getElementById('wtw_bremoveactionzone').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/actionzones.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-clearActionZone=" + ex.message);
	}
}

WTWJS.prototype.hilightActionZonePart = function(moldname) {
	try {
		var mold = scene.getMeshByID(moldname);
		if (mold != null) {
			WTW.highlightMold(mold, "#0000ff");
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-hilightActionZonePart=" + ex.message);
	}
}

WTWJS.prototype.unHilightActionZonePart = function() {
	try {
		/* WTW.resetMoldCoverings(); */
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-unHilightActionZonePart=" + ex.message);
	}
}

WTWJS.prototype.removeActionZonePart = function(moldname) {
	try {
		var mold = scene.getMeshByID(moldname);
		if (mold != null) {
			var actionzoneid = "";
			var moldind = -1;
			var molds = WTW.buildingMolds;
			var moldgroup = "building";
			if (moldname.indexOf("community") > -1) {
				moldgroup = "community";
				molds = WTW.communitiesMolds;
			} else if (moldname.indexOf("thing") > -1) {
				moldgroup = "thing";
				molds = WTW.thingMolds;
			}
			if (moldname.indexOf("-") > -1) {
				var namepart = moldname.split('-');
				if (namepart[1] != null) {
					if (WTW.isNumeric(namepart[1])) {
						moldind = Number(namepart[1]);
					}
				}
			}
			if (molds[moldind] != null) {
				molds[moldind].actionzoneid = "";
				molds[moldind].graphics.texture.backupid = "";
				WTW.loadMoldForm(molds[moldind]);
				WTW.submitMoldForm(2);
			} 	
			if (dGet('wtw_tactionzonetype').value == "passengerseat" || dGet('wtw_tactionzonetype').value == "driverseat") {
				dGet('wtw_actionzonepartslist').innerHTML = "";
				for (var j=0; j < WTW.thingMolds.length; j++) {
					if (WTW.thingMolds[j] != null) {
						if (WTW.thingMolds[j].actionzoneid == actionzoneid) {
							dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightActionZonePart('" + WTW.thingMolds[j].moldname + "');\" onmouseout=\"WTW.unHilightActionZonePart();\" onclick=\"WTW.removeActionZonePart('" + WTW.thingMolds[j].moldname + "')\">Action Zone Part (" + WTW.thingMolds[j].shape + ")</div>";
						}
					}
				}
				for (var j=0; j < WTW.buildingMolds.length; j++) {
					if (WTW.buildingMolds[j] != null) {
						if (WTW.buildingMolds[j].actionzoneid == actionzoneid) {
							dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightActionZonePart('" + WTW.buildingMolds[j].moldname + "');\" onmouseout=\"WTW.unHilightActionZonePart();\" onclick=\"WTW.removeActionZonePart('" + WTW.buildingMolds[j].moldname + "')\">Action Zone Part (" + WTW.buildingMolds[j].shape + ")</div>";
						}
					}
				}
				for (var j=0; j < WTW.communitiesMolds.length; j++) {
					if (WTW.communitiesMolds[j] != null) {
						if (WTW.communitiesMolds[j].actionzoneid == actionzoneid) {
							dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightActionZonePart('" + WTW.communitiesMolds[j].moldname + "');\" onmouseout=\"WTW.unHilightActionZonePart();\" onclick=\"WTW.removeActionZonePart('" + WTW.communitiesMolds[j].moldname + "')\">Action Zone Part (" + WTW.communitiesMolds[j].shape + ")</div>";
						}
					}
				}
			} else {
				for (var i = 0; i < WTW.actionZones.length; i++) {
					if (WTW.actionZones[i] != null) {
						if (WTW.actionZones[i].actionzoneid == actionzoneid) {
							var actionzoneaxlebase = scene.getMeshByID("actionzoneaxlebase-" + i + "-" + WTW.actionZones[i].actionzoneid + "-" + WTW.actionZones[i].connectinggridind + "-" + WTW.actionZones[i].connectinggridid + "-" + WTW.actionZones[i].actionzonetype);
							var actionzoneaxlebase2 = scene.getMeshByID("actionzoneaxlebase2-" + i + "-" + WTW.actionZones[i].actionzoneid + "-" + WTW.actionZones[i].connectinggridind + "-" + WTW.actionZones[i].connectinggridid + "-" + WTW.actionZones[i].actionzonetype);
							var actionzoneaxle = scene.getMeshByID("actionzoneaxle-" + i + "-" + WTW.actionZones[i].actionzoneid + "-" + WTW.actionZones[i].connectinggridind + "-" + WTW.actionZones[i].connectinggridid + "-" + WTW.actionZones[i].actionzonetype);
							if (actionzoneaxlebase != null) {
								if (mold.parent != null) {
									if (mold.parent != actionzoneaxlebase.parent) {
										if (mold.parent.name.indexOf("actionzone") > -1) {
											mold.parent = actionzoneaxlebase.parent;
											mold.position.x = molds[moldind].position.x;
											mold.position.y = molds[moldind].position.y;
											mold.position.z = molds[moldind].position.z;
											mold.rotation.x = WTW.getRadians(molds[moldind].rotation.x);
											mold.rotation.y = WTW.getRadians(molds[moldind].rotation.y);
											mold.rotation.z = WTW.getRadians(molds[moldind].rotation.z);
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
										dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightActionZonePart('" + moldpartname + "');\" onmouseout=\"WTW.unHilightActionZonePart();\" onclick=\"WTW.removeActionZonePart('" + moldpartname + "')\">Action Zone Part (" + shape + ")</div>";
									}
								}
							}
						}
					}
				}
			}
			WTW.hilightActionZonePart(moldname);
			window.setTimeout(function(){ WTW.unHilightActionZonePart(); }, 500);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-removeActionZonePart=" + ex.message);
	}
}

WTWJS.prototype.addActionZonePart = function(actionzoneid, mold) {
	try {
		if (mold != null) {
			var moldgroup = "building";
			var moldind = -1;
			var molds = WTW.buildingMolds;
			var moldname = mold.name;
			var namepart;
			if (moldname.indexOf("community") > -1) {
				moldgroup = "community";
				molds = WTW.communitiesMolds;
			} else if (moldname.indexOf("thing") > -1) {
				moldgroup = "thing";
				molds = WTW.thingMolds;
			}
			if (moldname.indexOf("-") > -1) {
				namepart = moldname.split('-');
			}
			if (WTW.isNumeric(namepart[1])) {
				moldind = Number(namepart[1]);
			}
			var shape = namepart[5];
			if (dGet('wtw_tactionzonetype').value != "passengerseat" && dGet('wtw_tactionzonetype').value != "driverseat") {
				for (var i = 0; i < WTW.actionZones.length; i++) {
					if (WTW.actionZones[i] != null) {
						if (WTW.actionZones[i].actionzoneid == actionzoneid) {
							var actionzoneaxlebase = scene.getMeshByID(WTW.actionZones[i].moldname.replace("actionzone-","actionzoneaxlebase-"));
							var actionzoneaxlebase2 = scene.getMeshByID(WTW.actionZones[i].moldname.replace("actionzone-","actionzoneaxlebase2-"));
							if (actionzoneaxlebase != null) {
								if (mold.parent != actionzoneaxlebase2) {
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
									dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightActionZonePart('" + moldname + "');\" onmouseout=\"WTW.unHilightActionZonePart();\" onclick=\"WTW.removeActionZonePart('" + moldname + "')\">Action Zone Part (" + shape + ")</div>";
								}
							}
						}
					}
				}
			}
			WTW.hilightActionZonePart(moldname);
			window.setTimeout(function(){ WTW.unHilightActionZonePart(); }, 500);
			if (molds[moldind] != null) {
				molds[moldind].actionzoneid = actionzoneid;
				molds[moldind].graphics.texture.backupid = "";		
				WTW.loadMoldForm(molds[moldind]);
				WTW.submitMoldForm(2);
			} 	
			if (dGet('wtw_tactionzonetype').value == "passengerseat" || dGet('wtw_tactionzonetype').value == "driverseat") {
				dGet('wtw_actionzonepartslist').innerHTML = "";
				for (var j=0; j < WTW.thingMolds.length; j++) {
					if (WTW.thingMolds[j] != null) {
						if (WTW.thingMolds[j].actionzoneid == actionzoneid) {
							dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightActionZonePart('" + WTW.thingMolds[j].moldname + "');\" onmouseout=\"WTW.unHilightActionZonePart();\" onclick=\"WTW.removeActionZonePart('" + WTW.thingMolds[j].moldname + "')\">Action Zone Part (" + WTW.thingMolds[j].shape + ")</div>";
						}
					}
				}
				for (var j=0; j < WTW.buildingMolds.length; j++) {
					if (WTW.buildingMolds[j] != null) {
						if (WTW.buildingMolds[j].actionzoneid == actionzoneid) {
							dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightActionZonePart('" + WTW.buildingMolds[j].moldname + "');\" onmouseout=\"WTW.unHilightActionZonePart();\" onclick=\"WTW.removeActionZonePart('" + WTW.buildingMolds[j].moldname + "')\">Action Zone Part (" + WTW.buildingMolds[j].shape + ")</div>";
						}
					}
				}
				for (var j=0; j < WTW.communitiesMolds.length; j++) {
					if (WTW.communitiesMolds[j] != null) {
						if (WTW.communitiesMolds[j].actionzoneid == actionzoneid) {
							dGet('wtw_actionzonepartslist').innerHTML += "<div class='wtw-menulevel2' onmouseover=\"WTW.hilightActionZonePart('" + WTW.communitiesMolds[j].moldname + "');\" onmouseout=\"WTW.unHilightActionZonePart();\" onclick=\"WTW.removeActionZonePart('" + WTW.communitiesMolds[j].moldname + "')\">Action Zone Part (" + WTW.communitiesMolds[j].shape + ")</div>";
						}
					}
				}
			}
		}
		WTW.selectAddActionZonePart(2); 
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-addActionZonePart=" + ex.message);
	}
}

WTWJS.prototype.getLoadZoneList = function(defaultvalue) {
	try {
		WTW.clearOptions("wtw_tmoldloadactionzoneid");
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-getLoadZoneList=" + ex.message);
	} 
}

WTWJS.prototype.getLoadActionZoneList = function(defaultvalue) {
	try {
		WTW.clearOptions("wtw_tazloadactionzoneid");
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-getLoadActionZoneList=" + ex.message);
	} 
}

WTWJS.prototype.addMergePart = function(mold) {
	try {		
		if (mold != null) {
			var moldind = -1;
			var moldid = "";
			var shape = "";
			var moldgroup = dGet('wtw_tmoldmoldgroup').value;
			var moldname = mold.name;
			var namepart;
			var molds = null;
			if (moldname.indexOf("-") > -1) {
				namepart = moldname.split('-');
			}			
			if (WTW.isNumeric(namepart[1])) {
				if (namepart[0].indexOf("buildingmolds") > -1 && moldgroup == "building") {
					molds = WTW.buildingMolds;
				} else if (namepart[0].indexOf("thingmolds") > -1 && moldgroup == "thing") {
					molds = WTW.thingMolds;
				} else if (namepart[0].indexOf("communitymolds") > -1 && moldgroup == "community") {
					molds = WTW.communitiesMolds;
				}
				if (molds != null) {
					moldind = Number(namepart[1]);
					moldid = molds[moldind].moldid;
					dGet('wtw_tmoldcsgmoldid').value = moldid;
					shape = namepart[5];
					WTW.setCSGCount(moldid);
				}
			}
			if (moldid != "") {
				WTW.hilightActionZonePart(moldname);
				window.setTimeout(function(){ WTW.unHilightActionZonePart(); }, 500);
				dGet('wtw_selectedcsgshape').innerHTML = "";
				dGet('wtw_selectedcsgshape').innerHTML += "<div class='wtw-secondcolcontent' onmouseover=\"WTW.hilightActionZonePart('" + moldname + "');\" onmouseout=\"WTW.unHilightActionZonePart();\">Merge with (" + shape + ") &nbsp;&nbsp;&nbsp;&nbsp; <a href='#' onclick=\"WTW.removeMerge('" + moldname + "')\">Remove</a></div><br /><br />";
				dGet('wtw_bselectcsgshape').innerHTML = "Change Shape to Merge";
			} else {
				WTW.removeMerge(moldname);
			}
		}
		WTW.selectMergePart(2); 
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-addMergePart=" + ex.message);
	}
}

WTWJS.prototype.removeMerge = function(moldname) {
	try {
		var oldcsgmainid = dGet('wtw_tmoldcsgmoldid').value;
		var csgmainind = -1; 
		var csgchildind = -1;
		var moldind = -1;
		var namepart;
		var molds = null;
		var moldgroup = dGet('wtw_tmoldmoldgroup').value;
		WTW.setDDLValue('wtw_tmoldcsgaction', ''); 
		dGet('wtw_tmoldcsgmoldid').value = "";
		dGet('wtw_selectedcsgshape').innerHTML = "";
		dGet('wtw_bselectcsgshape').innerHTML = "Pick Shape to Merge";
		if (moldname.indexOf("-") > -1) {
			namepart = moldname.split('-');
		}			
		if (WTW.isNumeric(namepart[1])) {
			if (namepart[0].indexOf("buildingmolds") > -1 && moldgroup == "building") {
				molds = WTW.buildingMolds;
			} else if (namepart[0].indexOf("thingmolds") > -1 && moldgroup == "thing") {
				molds = WTW.thingMolds;
			} else if (namepart[0].indexOf("communitymolds") > -1 && moldgroup == "community") {
				molds = WTW.communitiesMolds;
			}
			if (molds != null) {
				moldind = Number(dGet('wtw_tmoldind').value);
				molds[moldind].csg.moldid = "";
				molds[moldind].covering = "color";
				molds[moldind].opacity = "100";
				molds[moldind].shown = "0";
			}
		}	
		if (oldcsgmainid != "") {
			csgmainind = WTW.getMoldInd(molds, oldcsgmainid, dGet('wtw_tconnectinggridind').value);
			if (molds[csgmainind] != null) {
				WTW.setCSGCount(oldcsgmainid);
				if (molds[csgmainind].shown != undefined) {
					molds[csgmainind].shown = "0";
				}
				if (molds[csgmainind].moldname != undefined) {
					WTW.disposeClean(molds[csgmainind].moldname);
				}
			}
		}
		WTW.disposeClean(moldname);
		WTW.setShownMolds();
		WTW.setNewMold();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-removeMerge=" + ex.message);
	}
}

WTWJS.prototype.openSelectActionZoneForm = function() {
	try {
		WTW.getActionZoneList();
		if (WTW.actionZones.length > 0) {
			dGet("wtw_selectactionzoneid").onchange = function() {};
			WTW.clearOptions("wtw_selectactionzoneid");
			var actionzonecount = 0;
			dGet("wtw_selectactionzoneid").options[actionzonecount] = new Option("-- Select Action Zone --", "-1");
			actionzonecount += 1;
			for (var i = 0; i < WTW.actionZones.length; i++) {
				if (WTW.actionZones[i] != null) {
					if ((WTW.actionZones[i].communityinfo.communityid == communityid && communityid != "") || (WTW.actionZones[i].buildinginfo.buildingid == buildingid && buildingid != "") || (WTW.actionZones[i].thinginfo.thingid == thingid && thingid != "")) {
						if (WTW.actionZones[i].actionzonename.length > 0 && WTW.actionZones[i].actionzonename != 'Extreme Load Zone' && WTW.actionZones[i].actionzonename != 'High - Load when far' && WTW.actionZones[i].actionzonename != 'Normal - Load when near') {
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-openSelectActionZoneForm=" + ex.message);
	}
}

WTWJS.prototype.selectActionZoneToEdit = function() {
	try {
		WTW.openActionZoneForm(dGet("wtw_selectactionzoneid").options[dGet("wtw_selectactionzoneid").selectedIndex].value);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-selectActionZoneToEdit=" + ex.message);
	}
}

WTWJS.prototype.reverserotatedirection = function() {
	try {
		var xaxis = Number(dGet('wtw_taxisrotationx').value);
		xaxis += 180;
		xaxis = WTW.cleanDegrees(xaxis);
		dGet('wtw_taxisrotationx').value = xaxis.toFixed(2);
		WTW.setNewActionZone();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-reverserotatedirection=" + ex.message);
	}
}

WTWJS.prototype.selectAddActionZonePart = function(w) {
	try {
		if (w == 0) {
			if (dGet('wtw_tactionzoneid').value == "") {
				var zactionzoneind = Number(dGet('wtw_tactionzoneind').value);
				if (WTW.actionZones[zactionzoneind] == null) {
					WTW.actionZones[zactionzoneind] = WTW.newActionZone();
				}
				WTW.actionZones[zactionzoneind].actionzoneid = dGet('wtw_tactionzoneid').value;
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
				WTW.actionZones[zactionzoneind].jsfunction = dGet('wtw_tactionzonejsfunction').value;
				WTW.actionZones[zactionzoneind].jsparameters = dGet('wtw_tactionzonejsparameters').value;
				var request = {
					'actionzoneid':dGet('wtw_tactionzoneid').value,
					'actionzoneind':dGet('wtw_tactionzoneind').value,
					'actionzonename':dGet('wtw_tactionzonename').value,
					'axispositionx':dGet('wtw_taxispositionx').value,
					'axispositiony':dGet('wtw_taxispositiony').value,
					'axispositionz':dGet('wtw_taxispositionz').value,
					'axisrotationx':dGet('wtw_taxisrotationx').value,
					'axisrotationy':dGet('wtw_taxisrotationy').value,
					'axisrotationz':dGet('wtw_taxisrotationz').value,
					'axisscalingx':dGet('wtw_taxisscalingx').value,
					'axisscalingy':dGet('wtw_taxisscalingy').value,
					'axisscalingz':dGet('wtw_taxisscalingz').value,
					'actionzonetype':dGet('wtw_tactionzonetype').value,
					'actionzoneshape':dGet('wtw_tactionzoneshape').value,
					'attachmoldid':dGet('wtw_tattachmoldid').value,
					'movementtype':dGet('wtw_tactionzonemovementtype').value,
					'rotatespeed':dGet('wtw_tactionzonerotatespeed').value,
					'actionzoneposx':dGet('wtw_tactionzoneposx').value,
					'actionzoneposy':dGet('wtw_tactionzoneposy').value,
					'actionzoneposz':dGet('wtw_tactionzoneposz').value,
					'actionzonescalingx':dGet('wtw_tactionzonescalingx').value,
					'actionzonescalingy':dGet('wtw_tactionzonescalingy').value,
					'actionzonescalingz':dGet('wtw_tactionzonescalingz').value,
					'actionzonerotx':dGet('wtw_tactionzonerotx').value,
					'actionzoneroty':dGet('wtw_tactionzoneroty').value,
					'actionzonerotz':dGet('wtw_tactionzonerotz').value,
					'jsfunction':dGet('wtw_tactionzonejsfunction').value,
					'jsparameters':dGet('wtw_tactionzonejsparameters').value,
					'rotateaxis':dGet('wtw_tactionzonerotateaxis').value,
					'rotatedegrees':dGet('wtw_tactionzonerotatedegrees').value
				};
				/* function for after iframe loads */
				var onload = function(ipage) {
					ipage.getElementById('wtw_tcommunityid').value = communityid;
					ipage.getElementById('wtw_tbuildingid').value = buildingid;
					ipage.getElementById('wtw_tthingid').value = thingid;
					ipage.getElementById('wtw_tactionzoneid').value = request.actionzoneid;
					ipage.getElementById('wtw_tactionzoneind').value = request.actionzoneind;
					ipage.getElementById('wtw_tactionzonename').value = request.actionzonename;
					ipage.getElementById('wtw_taxispositionx').value = request.axispositionx;
					ipage.getElementById('wtw_taxispositiony').value = request.axispositiony;
					ipage.getElementById('wtw_taxispositionz').value = request.axispositionz;
					ipage.getElementById('wtw_taxisrotationx').value = request.axisrotationx;
					ipage.getElementById('wtw_taxisrotationy').value = request.axisrotationy;
					ipage.getElementById('wtw_taxisrotationz').value = request.axisrotationz;
					ipage.getElementById('wtw_taxisscalingx').value = request.axisscalingx;
					ipage.getElementById('wtw_taxisscalingy').value = request.axisscalingy;
					ipage.getElementById('wtw_taxisscalingz').value = request.axisscalingz;
					ipage.getElementById('wtw_tactionzonetype').value = request.actionzonetype;
					ipage.getElementById('wtw_tactionzoneshape').value = request.actionzoneshape;
					ipage.getElementById('wtw_tattachmoldid').value = request.attachmoldid;
					ipage.getElementById('wtw_tactionzonemovementtype').value = request.movementtype;
					ipage.getElementById('wtw_tactionzonerotatespeed').value = request.rotatespeed;
					ipage.getElementById('wtw_tactionzoneposx').value = request.actionzoneposx;
					ipage.getElementById('wtw_tactionzoneposy').value = request.actionzoneposy;
					ipage.getElementById('wtw_tactionzoneposz').value = request.actionzoneposz;
					ipage.getElementById('wtw_tactionzonescalingx').value = request.actionzonescalingx;
					ipage.getElementById('wtw_tactionzonescalingy').value = request.actionzonescalingy;
					ipage.getElementById('wtw_tactionzonescalingz').value = request.actionzonescalingz;
					ipage.getElementById('wtw_tactionzonerotx').value = request.actionzonerotx;
					ipage.getElementById('wtw_tactionzoneroty').value = request.actionzoneroty;
					ipage.getElementById('wtw_tactionzonerotz').value = request.actionzonerotz;
					ipage.getElementById('wtw_tactionzonejsfunction').value = request.jsfunction;
					ipage.getElementById('wtw_tactionzonejsparameters').value = request.jsparameters;
					ipage.getElementById('wtw_tactionzonerotateaxis').value = request.rotateaxis;
					ipage.getElementById('wtw_tactionzonerotatedirection').value = "1";
					ipage.getElementById('wtw_tactionzonerotatedegrees').value = request.rotatedegrees;
					ipage.getElementById('wtw_bsaveactionzone').click();				
				}
				/* iframe src, onload function */
				var iframe = WTW.createIFrame('/core/iframes/actionzones.php', onload);
			}
			WTW.pick = 2;
			dGet('wtw_baddactionzonepart').innerHTML = "Cancel Pick Shape";
		} else {
			WTW.pick = 0;
			dGet('wtw_baddactionzonepart').innerHTML = "Pick Shape to Add";
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-selectAddActionZonePart=" + ex.message);
	}
}

WTWJS.prototype.selectMergePart = function(w) {
	try {
		if (w == 2) {
			WTW.pick = 0;
			dGet('wtw_bselectcsgshape').innerHTML = "Pick Shape to Merge";
		} else {
			WTW.pick = 2;
			dGet('wtw_bselectcsgshape').innerHTML = "Cancel Pick Shape";
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-selectMergePart=" + ex.message);
	}
}

WTWJS.prototype.loadCommunityForm = function(zcommunityid) {
	try {
		dGet('wtw_tcommunityalttag').value = "";
		WTW.getJSON("/connect/communities.php", 
			function(response) {
				WTW.communities = JSON.parse(response);
				if (WTW.communities != null) {
					for (var i = 0; i < WTW.communities.length; i++) {
						if (WTW.communities[i] != null) {
							if (WTW.communities[i].communityinfo.communityid != undefined) {
								if (zcommunityid == WTW.communities[i].communityinfo.communityid) {
									dGet('wtw_tcommunityname').value = WTW.decode(WTW.communities[i].communityinfo.communityname);
									dGet('wtw_tcommunitysnapshotid').value = WTW.communities[i].communityinfo.snapshotid;
									dGet('wtw_tcommunityanalyticsid').value = WTW.communities[i].communityinfo.analyticsid;
									dGet('wtw_tgroundpositiony').value = Number(WTW.communities[i].groundpositiony).toFixed(2);
									dGet('wtw_twaterpositiony').value = Number(WTW.communities[i].waterpositiony).toFixed(2);
									dGet('wtw_tcommunityalttag').value = WTW.decode(WTW.communities[i].alttag.name);
								}
							}
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-loadCommunityForm=" + ex.message);
	}
}		

WTWJS.prototype.openCommunityForm = function(zcommunityid) {
	try {
		WTW.show('wtw_loadingcommunityform');
		WTW.show('wtw_loadingwaterdepthform');
		WTW.hide('wtw_adminmenu25b');
		WTW.hide('wtw_adminmenu42b');
		dGet('wtw_tcommunityalttag').value = "";
		WTW.getJSON("/connect/communities.php", 
			function(response) {
				WTW.communities = JSON.parse(response);
				if (WTW.communities != null) {
					for (var i = 0; i < WTW.communities.length; i++) {
						if (WTW.communities[i] != null) {
							if (WTW.communities[i].communityinfo.communityid != undefined) {
								if (zcommunityid == WTW.communities[i].communityinfo.communityid) {
									dGet('wtw_tcommunityname').value = WTW.decode(WTW.communities[i].communityinfo.communityname);
									dGet('wtw_tcommunitysnapshotid').value = WTW.communities[i].communityinfo.snapshotid;
									dGet('wtw_tcommunityanalyticsid').value = WTW.communities[i].communityinfo.analyticsid;
									dGet('wtw_tgroundpositiony').value = Number(WTW.communities[i].groundpositiony).toFixed(2);
									dGet('wtw_twaterpositiony').value = Number(WTW.communities[i].waterpositiony).toFixed(2);
									dGet('wtw_tcommunityalttag').value = WTW.decode(WTW.communities[i].alttag.name);
								}
							}
						}
					}
				}
				window.setTimeout(function() {
					WTW.hide('wtw_loadingcommunityform');
					WTW.hide('wtw_loadingwaterdepthform');
					WTW.show('wtw_adminmenu25b');
					WTW.show('wtw_adminmenu42b');
					WTW.setWindowSize();
				},500);
			}
		);
		dGet('wtw_tcommunityname').focus();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openCommunityForm=" + ex.message);
	}
}		

WTWJS.prototype.openShareCommunityForm = function() {
	try {
		dGet("wtw_tsharecommtempname").value = "";
		dGet("wtw_tsharecommdescription").value = "";
		dGet('wtw_tsharecommtags').value = "";
		WTW.hide('wtw_adminmenu29b');
		WTW.show('wtw_loadingsharecommunityform');
		WTW.getJSON("/connect/communities.php", 
			function(response) {
				WTW.communities = JSON.parse(response);
				if (WTW.communities != null) {
					for (var i = 0; i < WTW.communities.length; i++) {
						if (WTW.communities[i] != null) {
							if (WTW.communities[i].communityinfo.communityid != undefined) {
								if (WTW.communities[i].communityinfo.communityid != null) {
									if (communityid == WTW.communities[i].communityinfo.communityid) {
										if (WTW.communities[i].share.templatename != "") {
											dGet('wtw_tsharecommtempname').value = WTW.communities[i].share.templatename;
										} else {
											dGet('wtw_tsharecommtempname').value = WTW.communities[i].communityinfo.communityname;
										}
										dGet('wtw_tsharecommdescription').value = WTW.communities[i].share.description;
										dGet('wtw_tsharecommtags').value = WTW.communities[i].share.tags;
										if (WTW.communities[i].communityinfo.snapshotpath != "") {
											dGet('wtw_defaultcommunitysnapshot').src = WTW.communities[i].communityinfo.snapshotpath;
										} else {
											dGet('wtw_defaultcommunitysnapshot').src = WTW.communities[i].communityinfo.snapshotdata;
										}
									}
								}
							}
						}
					}
				}
				if (dGet('wtw_defaultcommunitysnapshot').src.length < 20) {
					WTW.hide('wtw_defaultcommunitysnapshot');
				} else {
					WTW.show('wtw_defaultcommunitysnapshot');
				}
				WTW.hide('wtw_loadingsharecommunityform');
				WTW.show('wtw_adminmenu29b');
				WTW.setWindowSize();
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openShareCommunityForm=" + ex.message);
	}
}		

WTWJS.prototype.openUpdateSnapshotForm = function() {
	try {
		WTW.hide('wtw_adminmenu69b');
		WTW.show('wtw_loadingupdatesnapshot');
		if (communityid != '') {
			WTW.getJSON("/connect/communities.php", 
				function(response) {
					WTW.communities = JSON.parse(response);
					if (WTW.communities != null) {
						for (var i = 0; i < WTW.communities.length; i++) {
							if (WTW.communities[i] != null) {
								if (WTW.communities[i].communityinfo.communityid != undefined) {
									if (WTW.communities[i].communityinfo.communityid != null) {
										if (communityid == WTW.communities[i].communityinfo.communityid) {
											if (WTW.communities[i].communityinfo.snapshotpath != "") {
												dGet('wtw_defaultsnapshot').src = WTW.communities[i].communityinfo.snapshotpath;
											} else {
												dGet('wtw_defaultsnapshot').src = WTW.communities[i].communityinfo.snapshotdata;
											}
										}
									}
								}
							}
						}
					}
					if (dGet('wtw_defaultsnapshot').src.length < 20) {
						WTW.hide('wtw_defaultsnapshot');
					} else {
						WTW.show('wtw_defaultsnapshot');
					}
					WTW.hide('wtw_loadingupdatesnapshot');
					WTW.show('wtw_adminmenu69b');
					WTW.setWindowSize();
				}
			);
		} else if (buildingid != '') {
			WTW.getJSON("/connect/buildings.php", 
				function(response) {
					WTW.buildings = JSON.parse(response);
					if (WTW.buildings != null) {
						for (var i = 0; i < WTW.buildings.length; i++) {
							if (WTW.buildings[i] != null) {
								if (WTW.buildings[i].buildinginfo.buildingid != undefined) {
									if (WTW.buildings[i].buildinginfo.buildingid != null) {
										if (buildingid == WTW.buildings[i].buildinginfo.buildingid) {
											if (WTW.buildings[i].buildinginfo.snapshotpath != "") {
												dGet('wtw_defaultsnapshot').src = WTW.buildings[i].buildinginfo.snapshotpath;
											} else {
												dGet('wtw_defaultsnapshot').src = WTW.buildings[i].buildinginfo.snapshotdata;
											}
										}
									}
								}
							}
						}
					}
					if (dGet('wtw_defaultsnapshot').src.length < 20) {
						WTW.hide('wtw_defaultsnapshot');
					} else {
						WTW.show('wtw_defaultsnapshot');
					}
					WTW.hide('wtw_loadingupdatesnapshot');
					WTW.show('wtw_adminmenu69b');
					WTW.setWindowSize();
				}
			);
		} else if (thingid != '') {
			WTW.getJSON("/connect/things.php?userid=" + dGet('wtw_tuserid').value, 
				function(response) {
					WTW.things = JSON.parse(response);
					if (WTW.things != null) {
						for (var i = 0; i < WTW.things.length; i++) {
							if (WTW.things[i] != null) {
								if (WTW.things[i].thinginfo.thingid != undefined) {
									if (WTW.things[i].thinginfo.thingid != null) {
										if (thingid == WTW.things[i].thinginfo.thingid) {
											if (WTW.things[i].thinginfo.snapshotpath != "") {
												dGet('wtw_defaultsnapshot').src = WTW.things[i].thinginfo.snapshotpath;
											} else {
												dGet('wtw_defaultsnapshot').src = WTW.things[i].thinginfo.snapshotdata;
											}
										}
									}
								}
							}
						}
					}
					if (dGet('wtw_defaultsnapshot').src.length < 20) {
						WTW.hide('wtw_defaultsnapshot');
					} else {
						WTW.show('wtw_defaultsnapshot');
					}
					WTW.hide('wtw_loadingupdatesnapshot');
					WTW.show('wtw_adminmenu69b');
					WTW.setWindowSize();
				}
			);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openUpdateSnapshotForm=" + ex.message);
	}
}

WTWJS.prototype.openFullPageForm = function(pageid, setcategory, item, itemname, itemnamepath, previewname) {
	try {
		if (item == undefined) {
			item = '';
		}
		if (itemname == undefined) {
			itemname = '';
		}
		if (itemnamepath == undefined) {
			itemnamepath = '';
		}
		if (previewname == undefined) {
			previewname = '';
		}
		WTW.setDDLValue('wtw_fileselectcategory',setcategory);
		/* bringing up a fatal error may not use dGet() */
		document.getElementById('wtw_tfileitem').value = item;
		document.getElementById('wtw_tfileitemname').value = itemname;
		document.getElementById('wtw_tfileitemnamepath').value = itemnamepath;
		document.getElementById('wtw_tfileitempreviewname').value = previewname;
		WTW.hideFullPages();
		WTW.hide('wtw_mediapage');
		WTW.hide('wtw_menuwtwdownloads');
		WTW.show('wtw_fullpageform');
		switch (pageid) {
			case "error":
				document.getElementById('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Users</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + setcategory + "</div>";
				WTW.show('wtw_showfilepage');
				WTW.show('wtw_errorpage');
				WTW.show('wtw_showerror');
				break;
			case "dashboard":
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>WalkTheWeb Dashboard</div>";
				WTW.show('wtw_dashboardpage');
				WTW.openDashboardForm();
				break;
			case "updates":
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Updates</div>";
				WTW.show('wtw_showfilepage');
				WTW.show('wtw_updatespage');
				WTW.checkForUpdates('1');
				break;
			case "medialibrary":
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Media Library</div>";
				WTW.show('wtw_selectimagepage');
				dGet('wtw_fullpageform').style.width = (WTW.sizeX - 5 - Number(dGet('wtw_adminmenubutton').style.left.replace("px",""))).toString() + 'px';
				dGet('wtw_selectimageformscroll').style.height = (WTW.sizeY - 160) + 'px';
				WTW.selectFileForm();
				if (setcategory == "") {
					WTW.showInline('wtw_menuwtwdownloads');
				}
				break;
			case "mediapage":
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Media Library</div>";
				WTW.show('wtw_showfilepage');
				WTW.openMediaPageForm(item);
				break;
			case "importpage":
				if (WTW.adminView == 1) {
					dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowlink' onclick=\"WTW.openFullPageForm('medialibrary','','');\">Media Library</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>WalkTheWeb Downloads</div>";
					WTW.hide('wtw_installprogress');
					WTW.hide('searchcommunitiesdiv');
					WTW.hide('searchbuildingsdiv');
					WTW.hide('searchthingsdiv');
					WTW.hide('wtw_commtempsearchresults');
					WTW.hide('wtw_buildtempsearchresults');
					WTW.hide('wtw_thingtempsearchresults');
					WTW.showInline('wtw_menumedialibrary');
					WTW.showInline('wtw_menuwtwcommunities');
					WTW.showInline('wtw_menuwtwbuildings');
					WTW.showInline('wtw_menuwtwthings');
					WTW.show('wtw_showimportpage');
					WTW.show('wtw_selectwebform');
					dGet('wtw_menuwtwcommunities').className = 'wtw-menutabtop';
					dGet('wtw_menuwtwbuildings').className = 'wtw-menutabtop';
					dGet('wtw_menuwtwthings').className = 'wtw-menutabtop';
					switch (setcategory) {
						case "communities":
							WTW.showInline('searchcommunitiesdiv');
							dGet('wtw_menuwtwcommunities').className = 'wtw-menutabtopselected';
							dGet('wtw_commtempsearchresults').style.height = (WTW.sizeY - 175) + "px";
							WTW.communitySearch('');
							WTW.show('wtw_commtempsearchresults');
							break;
						case "buildings":
							WTW.showInline('searchbuildingsdiv');
							dGet('wtw_menuwtwbuildings').className = 'wtw-menutabtopselected';
							dGet('wtw_buildtempsearchresults').style.height = (WTW.sizeY - 175) + "px";
							WTW.buildingSearch('');
							WTW.show('wtw_buildtempsearchresults');
							break;
						case "things":
							WTW.showInline('searchthingsdiv');
							dGet('wtw_menuwtwthings').className = 'wtw-menutabtopselected';
							dGet('wtw_thingtempsearchresults').style.height = (WTW.sizeY - 175) + "px";
							WTW.thingSearch('');
							WTW.show('wtw_thingtempsearchresults');
							break;
					}
				}
				break;
			case "users":
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Users</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + setcategory + "</div>";
				WTW.show('wtw_showfilepage');
				WTW.openAllUsers();
				break;
			case "plugins":
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Users</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + setcategory + "</div>";
				WTW.show('wtw_showfilepage');
				/* WTW.openAllPlugins('',''); */
				WTW.checkForUpdates('2');
				break;
			case "settings":
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Settings</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + setcategory + "</div>";
				WTW.show('wtw_showfilepage');
				switch (setcategory) {
					case "Email Server":
						WTW.openEmailServerSettings();
						break;
					case "Web Aliases":
						WTW.openWebAliasSettings();
						break;
				}
				break;
			case "fullpage":
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>" + setcategory + "</div>";
				WTW.show('wtw_fullpageplugins');
				WTW.show(item);
				break;
			default:
				WTW.hide('wtw_fullpageform');
				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openFullPageForm=" + ex.message);
	}
}

WTWJS.prototype.closeFullPageForm = function() {
	try {
		WTW.hide('wtw_fullpageform');
		WTW.resetUploadButton();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-closeFullPageForm=" + ex.message);
	}
}

WTWJS.prototype.hideFullPages = function() {
	try {
		var fullpages = document.getElementsByClassName('wtw-dashboardpage');
		for (var i=0;i<fullpages.length;i++) {
			if (fullpages[i] != null) {
				if (fullpages[i].id != undefined) {
					WTW.hide(fullpages[i].id);
				}
			}
		}
		fullpages = document.getElementsByClassName('wtw-fullpage');
		for (var i=0;i<fullpages.length;i++) {
			if (fullpages[i] != null) {
				if (fullpages[i].id != undefined) {
					WTW.hide(fullpages[i].id);
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-hideFullPages=" + ex.message);
	}
}

WTWJS.prototype.openDashboardForm = function(item) {
	try {
		WTW.hide('wtw_dashboard');
		WTW.show('wtw_loadingdashboard');
		dGet("wtw_mycommcount").innerHTML = '0';
		dGet("wtw_mybuildcount").innerHTML = '0';
		dGet("wtw_mythingcount").innerHTML = '0';
		dGet("wtw_othercommcount").innerHTML = '0';
		dGet("wtw_otherbuildcount").innerHTML = '0';
		dGet("wtw_otherthingcount").innerHTML = '0';
		WTW.getJSON("/connect/dashboard.php", 
			function(response) {
				var dashboard = JSON.parse(response);
				if (dashboard != null) {
					for (var i = 0; i < dashboard.length; i++) {
						if (dashboard[i] != null) {
							if (dashboard[i].mycommunitycount != undefined) {
								dGet('wtw_mycommcount').innerHTML = WTW.formatNumber(Number(dashboard[i].mycommunitycount),0);
							}
							if (dashboard[i].mybuildingcount != undefined) {
								dGet('wtw_mybuildcount').innerHTML = WTW.formatNumber(Number(dashboard[i].mybuildingcount),0);
							}
							if (dashboard[i].mythingcount != undefined) {
								dGet('wtw_mythingcount').innerHTML = WTW.formatNumber(Number(dashboard[i].mythingcount),0);
							}
							if (dashboard[i].othercommunitycount != undefined) {
								dGet('wtw_othercommcount').innerHTML = WTW.formatNumber(Number(dashboard[i].othercommunitycount),0);
							}
							if (dashboard[i].otherbuildingcount != undefined) {
								dGet('wtw_otherbuildcount').innerHTML = WTW.formatNumber(Number(dashboard[i].otherbuildingcount),0);
							}
							if (dashboard[i].otherthingcount != undefined) {
								dGet('wtw_otherthingcount').innerHTML = WTW.formatNumber(Number(dashboard[i].otherthingcount),0);
							}
						}
					}
				}
				window.setTimeout(function() {
					WTW.hide('wtw_loadingdashboard');
					WTW.show('wtw_dashboard');
				},500);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openDashboardForm=" + ex.message);
	}
}

WTWJS.prototype.startUploadImage = function() {
	try {
		if (dGet('wtw_menuuploadedobjects').className == 'wtw-menutabtopselected') {
			var iframe = dGet('wtw_uploadedobjectsframe');
			var ipage = iframe.contentDocument || iframe.contentWindow.document;
			ipage.getElementById('wtw_buploadcommunityimage').click();
		} else {
			WTW.setImageMenu(2);
			var iframe = dGet('wtw_myimagesframe');
			var ipage = iframe.contentDocument || iframe.contentWindow.document;
			ipage.getElementById('wtw_buploadcommunityimage').click();
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-startUploadImage=" + ex.message);
	}
}

WTWJS.prototype.setImageMenu = function(w) {
	try {
		dGet('wtw_menuimagecommunity').className = 'wtw-menutabtop';
		dGet('wtw_menuimagemy').className = 'wtw-menutabtop';
		dGet('wtw_menuimagestock').className = 'wtw-menutabtop';
		dGet('wtw_menuuploadedobjects').className = 'wtw-menutabtop';
		dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Media Library</div>";
		WTW.hide('wtw_menuimagecommunitydiv');
		WTW.hide('wtw_menuimagemydiv');
		WTW.hide('wtw_hiddenimagesoption');
		WTW.hide('wtw_menuimagestockdiv');
		WTW.hide('wtw_menuuploadedobjectsdiv');
		WTW.show('wtw_bstartimageupload');
		if (WTW.isNumeric(w)) {
			switch (Number(w)) {
				case 2:
					dGet('wtw_menuimagemy').className = 'wtw-menutabtopselected';
					WTW.showInline('wtw_menuimagemydiv');
					WTW.showInline('wtw_hiddenimagesoption');
					dGet('wtw_myimagesframe').style.height = (WTW.sizeY - 160) + 'px';
					break;
				case 3:
					dGet('wtw_menuimagestock').className = 'wtw-menutabtopselected';
					WTW.showInline('wtw_menuimagestockdiv');
					dGet('wtw_stockimagesframe').style.height = (WTW.sizeY - 160) + 'px';
					break;
				case 4:
					dGet('wtw_menuuploadedobjects').className = 'wtw-menutabtopselected';
					WTW.showInline('wtw_menuuploadedobjectsdiv');
					dGet('wtw_uploadedobjectsframe').style.height = (WTW.sizeY - 160) + 'px';
					WTW.loadObjectPage(true);
					break;
				default: 
					dGet('wtw_menuimagecommunity').className = 'wtw-menutabtopselected';
					WTW.showInline('wtw_menuimagecommunitydiv');
					dGet('wtw_communityimagesframe').style.height = (WTW.sizeY - 160) + 'px';
					WTW.setDDLValue('wtw_fileselectcategory','image');
					break;
			}
			WTW.resetUploadButton();
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setImageMenu=" + ex.message);
	}
}

WTWJS.prototype.openObjectPageForm = function(item, filename) {
	try {
		var category = WTW.getDDLValue('wtw_fileselectcategory');
		WTW.hide('wtw_uploadedobjectsframe');
		WTW.show('wtw_loadingselectimage');
		dGet('wtw_uploadedobjectsframe').src = '/core/iframes/uploadedfiledetails.php?uploadobjectid=' + item + '&filename=' + filename;
		dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowlink' onclick=\"WTW.openFullPageForm('medialibrary','" + category + "','');WTW.setImageMenu(4);\">Media Library</div><img id='wtw_arrowicon2' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + filename + "</div>";
		dGet('wtw_tbackupfullpageformtitle').value = dGet('wtw_fullpageformtitle').innerHTML;
		dGet('wtw_uploadedobjectsframe').onload = function() {
			window.setTimeout(function() {
				WTW.show('wtw_uploadedobjectsframe');
				WTW.hide('wtw_loadingselectimage');
				WTW.resetUploadButton();
			},500);
		};
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openObjectPageForm=" + ex.message);
	}
}

WTWJS.prototype.setSelectObject = function(uploadobjectid, objectfolder, objectfile) {
	try {
		WTW.hide('wtw_fullpageform');
		dGet('wtw_tmolduploadobjectid').value = uploadobjectid;
		dGet('wtw_tmoldobjectfolder').value = objectfolder;
		dGet('wtw_tmoldobjectfile').value = objectfile;
		WTW.setNewMold();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setSelectObject=" + ex.message);
	}
}

WTWJS.prototype.setSelectFileID = function(selectedobj, uploadid, originalid, websizeid, fileextension, filesize, filetitle, filename, filepath) {
	try {
		var category = WTW.getDDLValue('wtw_fileselectcategory');
		var zitem = dGet('wtw_tfileitem').value;
		var itemname = dGet('wtw_tfileitemname').value;
		var itemnamepath = dGet('wtw_tfileitemnamepath').value;
		var previewname = dGet('wtw_tfileitempreviewname').value;
		if (dGet(itemname) != null) {
			dGet(itemname).value = originalid;
		}
		if (dGet(itemnamepath) != null) {
			dGet(itemnamepath).value = filepath;
		}
		if (dGet(previewname) != null) {
			dGet(previewname).alt = filename;
			dGet(previewname).title = filename;
			if (category == 'image') {
				dGet(previewname).src = selectedobj.src;
				WTW.show(previewname);
			}
		}
		switch (category) {
			case 'video':
				WTW.setDDLValue('wtw_tmoldsoundattenuation', "linear");
				WTW.setSoundFields();
				break;
		}
		switch (zitem) {
			case 'extendedgroundtexture':
				if (WTW.extraGround.material != undefined) {
					if (WTW.extraGround.material.diffuseTexture != null) {
						WTW.extraGround.material.diffuseTexture.dispose();
						WTW.extraGround.material.diffuseTexture = null;
					}
					if (WTW.extraGround.material != null) {
						WTW.extraGround.material.dispose();
						WTW.extraGround.material = null;
					}
				}
				var eguscale = 500;
				var egvscale = 500;
				var extraGroundMaterial = new BABYLON.StandardMaterial("egmat", scene);
				extraGroundMaterial.diffuseTexture = new BABYLON.Texture(dGet(itemnamepath).value, scene);
				//var imageinfo = WTW.getUploadFileData(uploadid);
				//extraGroundMaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(imageinfo.filedata, "egmattexture", scene);
				extraGroundMaterial.diffuseTexture.uScale = eguscale;
				extraGroundMaterial.diffuseTexture.vScale = egvscale;
				extraGroundMaterial.specularColor = new BABYLON.Color3(.7, .7, .7);
				extraGroundMaterial.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
				WTW.extraGround.material = extraGroundMaterial;
				break;
		}
		if (itemname != 'wtw_tobjectsoundid') {
			document.activeElement.blur();
			WTW.closeFullPageForm();
			if (WTW.adminView == 1) {
				WTW.setNewMold(0);
			}
		} else {
/*			var iframe = dGet('wtw_uploadedobjectsframe');
			var ipage = iframe.contentDocument || iframe.contentWindow.document;
			ipage.getElementById('wtw_tobjectsoundid').value = dGet('wtw_tobjectsoundid').value;
			ipage.getElementById('wtw_tobjectsoundpath').value = dGet('wtw_tobjectsoundpath').value;
			ipage.getElementById('wtw_objectsoundicon').alt = dGet('wtw_tobjectsoundicon').alt;
			ipage.getElementById('objectsoundicon').title = dGet('wtw_tobjectsoundicon').title;
			ipage.getElementById('wtw_objectselectedsound').innerHTML = dGet('wtw_tobjectsoundicon').title;
*/
			WTW.hide('wtw_menuimagemydiv');
			WTW.hide('wtw_menuwtwdownloads');
			WTW.show('wtw_menuuploadedobjectsdiv');
			dGet('wtw_fullpageformtitle').innerHTML = dGet('wtw_tbackupfullpageformtitle').value;
			WTW.setDDLValue('wtw_fileselectcategory','object');
			WTW.resetUploadButton();
			WTW.hide('wtw_hiddenimagesoption');
			dGet('wtw_menuimagecommunity').className = 'wtw-menutabtop';
			dGet('wtw_menuimagemy').className = 'wtw-menutabtop';
			dGet('wtw_menuimagestock').className = 'wtw-menutabtop';
			dGet('wtw_menuuploadedobjects').className = 'wtw-menutabtopselected';			
			dGet('wtw_menuimagemy').innerHTML = "My Files";
			dGet('wtw_menuimagestock').innerHTML = "Stock Images";
			if (communityid != '') {
				dGet('wtw_menuimagecommunity').innerHTML = "3D Community Images";
			} else if (buildingid != '') {
				dGet('wtw_menuimagecommunity').innerHTML = "3D Building Images";
			} else if (thingid != '') {
				dGet('wtw_menuimagecommunity').innerHTML = "3D Thing Images";
			}
			if (communityid != '' || buildingid != '' || thingid != '') {
				WTW.loadCommunityPage(communityid, buildingid, thingid, zitem);
				WTW.showInline('wtw_menuimagecommunity');
			}
			WTW.showInline('wtw_menuimagemy');
			WTW.showInline('wtw_menuimagestock');
			WTW.showInline('wtw_menuuploadedobjects');
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_admineditor.js-setSelectFileID=' + ex.message);
	}
}

WTWJS.prototype.selectFileForm = function(obj) {
	try {
		var zitem = dGet('wtw_tfileitem').value;
		var category = WTW.getDDLValue('wtw_fileselectcategory');
		var hide = '0';
		if (obj != undefined) {
			if (obj.id == 'wtw_showhiddenimagesdiv') {
				if (dGet('wtw_bshowhiddenimages').checked) {
					dGet('wtw_bshowhiddenimages').checked = false;
				} else {
					dGet('wtw_bshowhiddenimages').checked = true;
				}
			}
		}
		if (dGet('wtw_bshowhiddenimages').checked) {
			hide = '1';
		}		
		WTW.hide('wtw_menuimagecommunity');
		WTW.showInline('wtw_menuimagemy');
		WTW.hide('wtw_menuimagestock');
		WTW.hide('wtw_menuuploadedobjects');
		switch (category) {
			case '':
				WTW.loadMyFilesPage(zitem, category, hide);
				WTW.loadObjectPage(false);
				WTW.loadStockPage(zitem);
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Media Library</div>";
				dGet('wtw_menuimagemy').innerHTML = "My Files";
				dGet('wtw_menuimagestock').innerHTML = "Stock Images";
				dGet('wtw_showhiddenimagesdiv').innerHTML = "Show Hidden Files";
				if (communityid != '') {
					dGet('wtw_menuimagecommunity').innerHTML = "3D Community Images";
				} else if (buildingid != '') {
					dGet('wtw_menuimagecommunity').innerHTML = "3D Building Images";
				} else if (thingid != '') {
					dGet('wtw_menuimagecommunity').innerHTML = "3D Thing Images";
				}
				if (communityid != '' || buildingid != '' || thingid != '') {
					WTW.loadCommunityPage(communityid, buildingid, thingid, zitem);
					WTW.showInline('wtw_menuimagecommunity');
				}
				WTW.showInline('wtw_menuimagestock');
				WTW.showInline('wtw_menuuploadedobjects');
				break;
			case 'image':
				WTW.loadMyFilesPage(zitem, category, hide);
				WTW.loadStockPage(zitem);
				dGet('wtw_bstartimageupload').innerHTML = "Upload Image";
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Select Image</div>";
				dGet('wtw_menuimagemy').innerHTML = "My Images";
				dGet('wtw_menuimagestock').innerHTML = "Stock Images";
				dGet('wtw_showhiddenimagesdiv').innerHTML = "Show Hidden Images";
				if (communityid != '') {
					dGet('wtw_menuimagecommunity').innerHTML = "3D Community Images";
				} else if (buildingid != '') {
					dGet('wtw_menuimagecommunity').innerHTML = "3D Building Images";
				} else if (thingid != '') {
					dGet('wtw_menuimagecommunity').innerHTML = "3D Thing Images";
				}
				WTW.showInline('wtw_menuimagestock');
				if (communityid != '' || buildingid != '' || thingid != '') {
					WTW.loadCommunityPage(communityid, buildingid, thingid, zitem);
					WTW.showInline('wtw_menuimagecommunity');
				}
				break;
			case 'video':
				WTW.loadMyFilesPage(zitem, category, hide);
				dGet('wtw_bstartimageupload').innerHTML = "Upload Video";
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Select Video</div>";
				dGet('wtw_menuimagemy').innerHTML = "My Videos";
				dGet('wtw_menuimagestock').innerHTML = "Stock Videos";
				dGet('wtw_showhiddenimagesdiv').innerHTML = "Show Hidden Videos";
				if (communityid != '') {
					dGet('wtw_menuimagecommunity').innerHTML = "3D Community Videos";
				} else if (buildingid != '') {
					dGet('wtw_menuimagecommunity').innerHTML = "3D Building Videos";
				} else if (thingid != '') {
					dGet('wtw_menuimagecommunity').innerHTML = "3D Thing Videos";
				}
				break;
			case 'audio':
				WTW.loadMyFilesPage(zitem, category, hide);
				dGet('wtw_bstartimageupload').innerHTML = "Upload Sound";
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Select Sound</div>";
				dGet('wtw_menuimagemy').innerHTML = "My Sounds";
				dGet('wtw_menuimagestock').innerHTML = "Stock Sounds";
				dGet('wtw_showhiddenimagesdiv').innerHTML = "Show Hidden Sounds";
				if (communityid != '') {
					dGet('wtw_menuimagecommunity').innerHTML = "3D Community Sounds";
				} else if (buildingid != '') {
					dGet('wtw_menuimagecommunity').innerHTML = "3D Building Sounds";
				} else if (thingid != '') {
					dGet('wtw_menuimagecommunity').innerHTML = "3D Thing Sounds";
				}
				break;
			case 'object':
				WTW.loadObjectPage(true);
				WTW.hide('wtw_menuimagemy');
				WTW.showInline('wtw_menuuploadedobjects');
				WTW.setImageMenu(4);
				break;
			case 'doc':
				WTW.loadMyFilesPage(zitem, category, hide);
				dGet('wtw_bstartimageupload').innerHTML = "Upload Document";
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Select Document</div>";
				dGet('wtw_menuimagemy').innerHTML = "My Documents";
				dGet('wtw_menuimagestock').innerHTML = "Stock Documents";
				dGet('wtw_showhiddenimagesdiv').innerHTML = "Show Hidden Documents";
				if (communityid != '') {
					dGet('wtw_menuimagecommunity').innerHTML = "3D Community Documents";
				} else if (buildingid != '') {
					dGet('wtw_menuimagecommunity').innerHTML = "3D Building Documents";
				} else if (thingid != '') {
					dGet('wtw_menuimagecommunity').innerHTML = "3D Thing Documents";
				}
				break;
			default:
				WTW.loadMyFilesPage(zitem, category, hide);
				dGet('wtw_bstartimageupload').innerHTML = "Upload File";
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Select File</div>";
				dGet('wtw_menuimagemy').innerHTML = "My Files";
				dGet('wtw_menuimagestock').innerHTML = "Stock Files";
				dGet('wtw_showhiddenimagesdiv').innerHTML = "Show Hidden Files";
				if (communityid != '') {
					dGet('wtw_menuimagecommunity').innerHTML = "3D Community Files";
				} else if (buildingid != '') {
					dGet('wtw_menuimagecommunity').innerHTML = "3D Building Files";
				} else if (thingid != '') {
					dGet('wtw_menuimagecommunity').innerHTML = "3D Thing Files";
				}
				break;
		}
		if (category != 'object') {
			WTW.setImageMenu(2);
			if (zitem == 'blogimage') {
				if (WTW.selectedMoldName.indexOf("-") > -1) {
					var zthingid = '';
					var zbuildingid = '';
					var zcommunityid = '';
					var namepart = WTW.selectedMoldName.split('-');
					var i = Number(namepart[1]);
					if (namepart[0] == 'thingmolds') {
						zthingid = WTW.thingMolds[i].thinginfo.thingid;
					} else if (namepart[0] == 'buildingmolds') {
						zbuildingid = WTW.buildingMolds[i].buildinginfo.buildingid;
					} else {
						zcommunityid = communityid;
					}
					WTW.loadCommunityPage(zcommunityid, zbuildingid, zthingid, zitem);
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_admineditor.js-selectFileForm=' + ex.message);
	}
}	

WTWJS.prototype.resetUploadButton = function() {
	try {
		if (dGet('wtw_bstartimageupload') != null) {
			var category = WTW.getDDLValue('wtw_fileselectcategory');
			switch (category) {
				case '':
					if (dGet('wtw_menuuploadedobjects').className == 'wtw-menutabtopselected' && dGet('wtw_uploadedobjectsframe').src.indexOf('/core/iframes/uploadedfiles.php') > -1) {
						dGet('wtw_bstartimageupload').innerHTML = 'Upload Primary 3D File';
					} else {
						dGet('wtw_bstartimageupload').innerHTML = 'Upload File';
					}
					break;
				case 'image':
					dGet('wtw_bstartimageupload').innerHTML = "Upload Image";
					break;
				case 'video':
					dGet('wtw_bstartimageupload').innerHTML = "Upload Video";
					break;
				case 'audio':
					dGet('wtw_bstartimageupload').innerHTML = "Upload Sound";
					break;
				case 'object':
					if (dGet('wtw_menuuploadedobjects').className == 'wtw-menutabtopselected' && dGet('wtw_uploadedobjectsframe').src.indexOf('/core/iframes/uploadedfiles.php') > -1) {
						dGet('wtw_bstartimageupload').innerHTML = 'Upload Primary 3D File';
					} else {
						dGet('wtw_bstartimageupload').innerHTML = 'Upload File';
					}
					break;
				case 'doc':
					dGet('wtw_bstartimageupload').innerHTML = "Upload Document";
					break;
				default:
					dGet('wtw_bstartimageupload').innerHTML = "Upload File";
					break;
			}			
			dGet('wtw_bstartimageupload').onclick = function() {window.parent.WTW.startUploadImage();return (false)};
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-resetUploadButton=" + ex.message);
	}
}

WTWJS.prototype.loadMyFilesPage = function(zitem, zcategory, zhide) {
	try {
		if (WTW.adminView == 1) {
			dGet('wtw_myimagesframe').style.visibility = 'hidden';
			WTW.show('wtw_loadingselectimage');
			if (dGet('wtw_myimagesframe').src.indexOf('/core/iframes/myuploads.php?item=' + zitem + '&category=' + zcategory + '&hide=' + zhide) == -1) {
				dGet('wtw_myimagesframe').src = '/core/iframes/myuploads.php?item=' + zitem + '&category=' + zcategory + '&hide=' + zhide;
				dGet('wtw_myimagesframe').onload = function() {
					window.setTimeout(function() {
						dGet('wtw_selectimageformscroll').style.visibility = 'visible';
						dGet('wtw_communityimagesframe').style.visibility = 'visible';
						dGet('wtw_myimagesframe').style.visibility = 'visible';
						dGet('wtw_stockimagesframe').style.visibility = 'visible';
						WTW.hide('wtw_loadingselectimage');
					},500);
				};
			} else {
				dGet('wtw_selectimageformscroll').style.visibility = 'visible';
				dGet('wtw_communityimagesframe').style.visibility = 'visible';
				dGet('wtw_myimagesframe').style.visibility = 'visible';
				dGet('wtw_stockimagesframe').style.visibility = 'visible';
				WTW.hide('wtw_loadingselectimage');
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_admineditor.js-loadMyFilesPage=' + ex.message);
	}
}	

WTWJS.prototype.loadStockPage = function(zitem) {
	try {
		if (dGet('wtw_stockimagesframe').src.indexOf('/core/iframes/imagesstock.php?item=' + zitem) == -1) {
			dGet('wtw_stockimagesframe').src = '/core/iframes/imagesstock.php?item=' + zitem;
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_admineditor.js-loadStockPage=' + ex.message);
	}
}	

WTWJS.prototype.loadCommunityPage = function(zcommunityid, zbuildingid, zthingid, zitem) {
	try {
		if (dGet('wtw_communityimagesframe').src.indexOf('/core/iframes/imagesinuse.php?communityid=' + zcommunityid + '&buildingid=' + zbuildingid + '&thingid=' + zthingid + '&item=' + zitem) == -1) {
			dGet('wtw_communityimagesframe').src = '/core/iframes/imagesinuse.php?communityid=' + zcommunityid + '&buildingid=' + zbuildingid + '&thingid=' + zthingid + '&item=' + zitem; 
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_admineditor.js-loadCommunityPage=' + ex.message);
	}
}	

WTWJS.prototype.loadObjectPage = function(showloading) {
	try {
		if (dGet('wtw_uploadedobjectsframe').src.indexOf('/core/iframes/uploadedfiles.php?item=' + dGet('wtw_tfileitem').value) == -1) {
			WTW.hide('wtw_uploadedobjectsframe');
			if (showloading) {
				WTW.show('wtw_loadingselectimage');
			}
			dGet('wtw_uploadedobjectsframe').src = '/core/iframes/uploadedfiles.php?item=' + dGet('wtw_tfileitem').value; 
			dGet('wtw_uploadedobjectsframe').onload = function() {
				window.setTimeout(function() {
					WTW.show('wtw_uploadedobjectsframe');
					if (showloading) {
						WTW.hide('wtw_loadingselectimage');
					}
				},500);
			};
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_admineditor.js-loadObjectPage=' + ex.message);
	}
}	

WTWJS.prototype.openMediaPageForm = function(uploadid) {
	try {
		var category = WTW.getDDLValue('wtw_fileselectcategory');
		WTW.hide('wtw_mediapage');
		WTW.show('wtw_loadingmediapage');
		dGet("wtw_uploadfilename").innerHTML = '';
		dGet("wtw_uploadfiletype").innerHTML = '';
		dGet("wtw_uploadupdatedate").innerHTML = '';
		dGet("wtw_mediathumbnailsize").innerHTML = '';
		dGet("wtw_mediathumbnaildimensions").innerHTML = '';
		dGet("wtw_mediathumbnailpath").innerHTML = '';
		dGet('wtw_mediathumbnail').src = '';
		dGet("wtw_mediawebsizesize").innerHTML = '';
		dGet("wtw_mediawebsizedimensions").innerHTML = '';
		dGet("wtw_mediawebsizepath").innerHTML = '';
		dGet("wtw_mediaoriginalsize").innerHTML = '';
		dGet("wtw_mediaoriginaldimensions").innerHTML = '';
		dGet("wtw_mediaoriginalpath").innerHTML = '';
		dGet('wtw_mediaoriginal').src = '';
		WTW.getJSON("/connect/uploadmedia.php?uploadid=" + uploadid, 
			function(response) {
				var uploadinfo = JSON.parse(response);
				if (uploadinfo != null) {
					for (var i = 0; i < uploadinfo.length; i++) {
						if (uploadinfo[i] != null) {
							var filetitle = "File Information";
							if (uploadinfo[i].uploadinfo != null) {
								if (uploadinfo[i].uploadinfo.title != undefined) {
									filetitle = uploadinfo[i].uploadinfo.title;
									dGet('wtw_uploadfiletitle').innerHTML = uploadinfo[i].uploadinfo.title;
								}
								if (uploadinfo[i].uploadinfo.name != undefined) {
									dGet('wtw_uploadfilename').innerHTML = uploadinfo[i].uploadinfo.name;
								}
								if (uploadinfo[i].uploadinfo.type != undefined) {
									dGet('wtw_uploadfiletype').innerHTML = uploadinfo[i].uploadinfo.type;
								}
								if (uploadinfo[i].uploadinfo.updatedate != undefined) {
									dGet('wtw_uploadupdatedate').innerHTML = WTW.formatDateLong(uploadinfo[i].uploadinfo.updatedate);
								}
							}
							
							dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowlink' onclick=\"WTW.openFullPageForm('medialibrary','" + category + "','');WTW.setImageMenu(2);\">Media Library</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + filetitle + "</div>";
							if (dGet('wtw_uploadfiletype').innerHTML.indexOf('image') > -1) {
								if (uploadinfo[i].thumbnail != null) {
									if (uploadinfo[i].thumbnail.data != undefined) {
										dGet('wtw_mediathumbnail').src = uploadinfo[i].thumbnail.data;
									}
									if (uploadinfo[i].thumbnail.size != undefined) {
										dGet('wtw_mediathumbnailsize').innerHTML = WTW.formatDataSize(uploadinfo[i].thumbnail.size);
									}
									if (uploadinfo[i].thumbnail.width != undefined && uploadinfo[i].thumbnail.height != undefined) {
										dGet('wtw_mediathumbnaildimensions').innerHTML = WTW.formatNumber(uploadinfo[i].thumbnail.width,0) + ' x ' + WTW.formatNumber(uploadinfo[i].thumbnail.height,0);
									}
									if (uploadinfo[i].thumbnail.path != undefined) {
										dGet('wtw_mediathumbnailpath').innerHTML = "<a href='" + uploadinfo[i].thumbnail.path + "' target='_blank'>" + uploadinfo[i].thumbnail.path + "</a>";
										dGet('wtw_mediathumbnaildownload').href = uploadinfo[i].thumbnail.path;
									}
								}
								if (uploadinfo[i].original != null) {
									if (uploadinfo[i].original.data != undefined) {
										dGet('wtw_mediaoriginal').src = uploadinfo[i].original.data;
									}
									if (uploadinfo[i].original.size != undefined) {
										dGet('wtw_mediaoriginalsize').innerHTML = WTW.formatDataSize(uploadinfo[i].original.size);
									}
									if (uploadinfo[i].original.width != undefined && uploadinfo[i].original.height != undefined) {
										dGet('wtw_mediaoriginaldimensions').innerHTML = WTW.formatNumber(uploadinfo[i].original.width,0) + ' x ' + WTW.formatNumber(uploadinfo[i].original.height,0);
									}
									if (uploadinfo[i].original.path != undefined) {
										dGet('wtw_mediaoriginalpath').innerHTML = "<a href='" + uploadinfo[i].original.path + "' target='_blank'>" + uploadinfo[i].original.path + "</a>";
										dGet('wtw_mediaoriginaldownload').href = uploadinfo[i].original.path;
									}
								}
								if (uploadinfo[i].websize != null) {
									if (uploadinfo[i].websize.data != undefined) {
										dGet('wtw_mediawebsize').src = uploadinfo[i].websize.data;
									}
									if (uploadinfo[i].websize.size != undefined) {
										dGet('wtw_mediawebsizesize').innerHTML = WTW.formatDataSize(uploadinfo[i].websize.size);
									}
									if (uploadinfo[i].websize.width != undefined && uploadinfo[i].websize.height != undefined) {
										dGet('wtw_mediawebsizedimensions').innerHTML = WTW.formatNumber(uploadinfo[i].websize.width,0) + ' x ' + WTW.formatNumber(uploadinfo[i].websize.height,0);
									}
									if (uploadinfo[i].websize.path != undefined) {
										dGet('wtw_mediawebsizepath').innerHTML = "<a href='" + uploadinfo[i].websize.path + "' target='_blank'>" + uploadinfo[i].websize.path + "</a>";
										dGet('wtw_mediawebsizedownload').href = uploadinfo[i].websize.path;
									}
								}
								WTW.show('wtw_imagethumbnailinfo');
								WTW.show('wtw_imagewebsizeinfo');
								WTW.show('wtw_imageoriginalinfo');
								WTW.show('wtw_originalimagediv');
							} else {
								WTW.hide('wtw_imagethumbnailinfo');
								WTW.hide('wtw_imagewebsizeinfo');
								WTW.hide('wtw_imageoriginalinfo');
								WTW.hide('wtw_originalimagediv');
							}
						}
					}
				}
				window.setTimeout(function() {
					WTW.hide('wtw_loadingmediapage');
					WTW.show('wtw_mediapage');
				},500);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openMediaPageForm=" + ex.message);
	}
}

WTWJS.prototype.editBuilding = function(zbuildingid) {
	try {
		WTW.openWebpage(wtw_domainurl + "/admin.php?buildingid=" + zbuildingid + "&hmenu=25");
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-editBuilding=" + ex.message);
	}
}

WTWJS.prototype.editThing = function(zthingid) {
	try {
		WTW.openWebpage(wtw_domainurl + "/admin.php?thingid=" + zthingid + "&hmenu=35");
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-editThing=" + ex.message);
	}
}

WTWJS.prototype.loadAltActionZones = function(ddlname) {
	try {
		if (dGet(ddlname) != null) {
			WTW.clearOptions(ddlname);
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-loadAltActionZones=" + ex.message);
	}
}

WTWJS.prototype.openConnectingGridsForm = function(connectinggridind) {
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-openConnectingGridsForm=" + ex.message);
	}
}

WTWJS.prototype.submitConnectingGridsForm = function(w) {
	try {
		var connectinggridind = -1;
		if (WTW.isNumeric(dGet("wtw_teditconnectinggridind").value)) {
			connectinggridind = Number(dGet("wtw_teditconnectinggridind").value);
		}
		if (connectinggridind > -1) {
			switch (w) {
				case 1: /* save connecting grid */
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
					var request = {
						'connectinggridid':dGet("wtw_teditconnectinggridid").value,
						'communityid':WTW.connectingGrids[connectinggridind].communityinfo.communityid,
						'buildingid':WTW.connectingGrids[connectinggridind].buildinginfo.buildingid,
						'thingid':WTW.connectingGrids[connectinggridind].thinginfo.thingid,
						'loadactionzoneid':dGet('wtw_teditloadactionzoneid').value,
						'altloadactionzoneid':altloadactionzoneid,
						'parentwebid':dGet('wtw_tparentwebid').value,
						'parentwebtype':dGet('wtw_tparentwebtype').value,
						'childwebid':dGet('wtw_tchildwebid').value,
						'childwebtype':dGet('wtw_tchildwebtype').value,
						'connectinggridind':connectinggridind,
						'conngridpositionx':dGet('wtw_tconngridpositionx').value,
						'conngridpositiony':dGet('wtw_tconngridpositiony').value,
						'conngridpositionz':dGet('wtw_tconngridpositionz').value,
						'conngridscalingx':dGet('wtw_tconngridscalingx').value,
						'conngridscalingy':dGet('wtw_tconngridscalingy').value,
						'conngridscalingz':dGet('wtw_tconngridscalingz').value,
						'conngridrotationx':dGet('wtw_tconngridrotationx').value,
						'conngridrotationy':dGet('wtw_tconngridrotationy').value,
						'conngridrotationz':dGet('wtw_tconngridrotationz').value,
						'conngridalttag':dGet('wtw_tconngridalttag').value
					};
					/* function for after iframe loads */
					var onload = function(ipage) {
						ipage.getElementById('wtw_teditconnectinggridid').value = request.connectinggridid;
						ipage.getElementById('wtw_tcommunityid').value = request.communityid;
						ipage.getElementById('wtw_tbuildingid').value = request.buildingid;
						ipage.getElementById('wtw_tthingid').value = request.thingid;
						ipage.getElementById('wtw_tloadactionzoneid').value = request.loadactionzoneid;
						ipage.getElementById('wtw_taltloadactionzoneid').value = request.altloadactionzoneid;
						ipage.getElementById('wtw_tparentwebid').value = request.parentwebid;
						ipage.getElementById('wtw_tparentwebtype').value = request.parentwebtype;
						ipage.getElementById('wtw_tchildwebid').value = request.childwebid;
						ipage.getElementById('wtw_tchildwebtype').value = request.childwebtype;
						ipage.getElementById('wtw_teditconnectinggridind').value = request.connectinggridind;
						ipage.getElementById('wtw_tconngridpositionx').value = request.conngridpositionx;
						ipage.getElementById('wtw_tconngridpositiony').value = request.conngridpositiony;
						ipage.getElementById('wtw_tconngridpositionz').value = request.conngridpositionz;
						ipage.getElementById('wtw_tconngridscalingx').value = request.conngridscalingx;
						ipage.getElementById('wtw_tconngridscalingy').value = request.conngridscalingy;
						ipage.getElementById('wtw_tconngridscalingz').value = request.conngridscalingz;
						ipage.getElementById('wtw_tconngridrotationx').value = request.conngridrotationx;
						ipage.getElementById('wtw_tconngridrotationy').value = request.conngridrotationy;
						ipage.getElementById('wtw_tconngridrotationz').value = request.conngridrotationz;
						ipage.getElementById('wtw_tconngridalttag').value = request.conngridalttag;
						ipage.getElementById('wtw_bsaveconnectinggrid').click();	
					}
					/* iframe src, onload function */
					var iframe = WTW.createIFrame('/core/iframes/connectinggrids.php', onload);
					break;
				case 0: /* delect connecting grid */
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
					var request = {
						'connectinggridid':dGet("wtw_teditconnectinggridid").value
					};
					/* function for after iframe loads */
					var onload = function(ipage) {
						ipage.getElementById('wtw_teditconnectinggridid').value = request.connectinggridid;
						ipage.getElementById('wtw_bdeleteconnectinggrid').click();	
					}
					/* iframe src, onload function */
					var iframe = WTW.createIFrame('/core/iframes/connectinggrids.php', onload);
					break;
				case -1: /* cancel change connecting grid */
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
			}
			WTW.hideAdminMenu();
			WTW.backToEdit();
		}
		WTW.closeEditPoles();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-submitConnectingGridsForm=" + ex.message);
	}
}

WTWJS.prototype.addConnectingGrid = function(childwebtype, childwebid, childwebname) {
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
								dGet('wtw_tcommunityanalyticsid').value = WTW.communities[i].communityinfo.analyticsid;
							}
						}
					}
				}
				dGet('wtw_tbuildingname').value = '';
				dGet('wtw_tbuildinganalyticsid').value = '';
			} else {
				if (WTW.buildings != null) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							if (buildingid == WTW.buildings[i].buildinginfo.buildingid) {
								dGet('wtw_tbuildingname').value = WTW.decode(WTW.buildings[i].buildinginfo.buildingname);
								dGet('wtw_tbuildinganalyticsid').value = WTW.buildings[i].buildinginfo.analyticsid;
							}
						}
					}
				}
				dGet('wtw_tcommunityname').value = "Walk the Web";
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
			positiony = newcoords.positionY - 12;
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
					WTW.holdPosition = WTW.camera.position.x + "|" + WTW.camera.position.y + .1 + "|" + WTW.camera.position.z
					WTW.checkActionZones();
					WTW.setNewConnectingGrid();
					WTW.openConnectingGridsForm(connectinggridind);
					WTW.setWindowSize();
				}
			);
		} 
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-addConnectingGrid=" + ex.message);
	}
}

WTWJS.prototype.loadBuildingConnectingGrids = function(addconnectinggrids) {
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-loadBuildingConnectingGrids=" + ex.message);
	} 
}

WTWJS.prototype.loadBuildingThingsLoadZones = function(addactionzones) {
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-loadBuildingThingsLoadZones=" + ex.message);
	} 
}

WTWJS.prototype.changePick = function(w) {
	try {
	    if (w == 1) {
			WTW.pick = 0;
		} else {
			WTW.pick = 1;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-changePick=" + ex.message);
	}
}

WTWJS.prototype.selectPick = function(e) {
	try {
		if (WTW.moveZ != null && WTW.pick != 2) {
		} else if (WTW.pick == 1) {	
		} else if (WTW.pick == 2) {
			var pickedResult = scene.pick(WTW.mouseX, WTW.mouseY);
			if (pickedResult.pickedMesh == null) {
				pickedResult.pickedMesh = scene.getMeshByID(WTW.currentID);
			}
			var mold = null;
			if (pickedResult.pickedMesh != null) {
				if (pickedResult.pickedMesh.name.indexOf("molds-") > -1) {
					mold = pickedResult.pickedMesh;
				}
			}
			if (mold != null && mold != undefined) {
				if (dGet('wtw_baddactionzonepart').innerHTML == "Cancel Pick Shape") {
					WTW.addActionZonePart(dGet('wtw_tactionzoneid').value, mold);
				} else if (dGet('wtw_bselectcsgshape').innerHTML == "Cancel Pick Shape") {
					WTW.addMergePart(mold);
				}
			}
		} else {
			return true;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-selectPick=" + ex.message);
	}
}

WTWJS.prototype.loadPickedObject = function(mold) {
	try {
		if (mold != null) {
			if (mold.name.indexOf("-") > -1) {
				var shape = "box";
				var moldind = -1;
				var moldgroup = "building";
				var namepart = mold.name.split('-');
				if (namepart[0] != null) {
					moldgroup = namepart[0].replace("molds","");
				}
				if (namepart[1] != null) {
					if (WTW.isNumeric(namepart[1])) {
						moldind = Number(namepart[1]);
					}
				}
				if (namepart[5] != null) {
					shape = namepart[5];
				}
				if (moldind > -1) {
					if (moldgroup == "thing" || moldgroup == "building" || moldgroup == "community") {
						dGet('wtw_tnewmold').value = "0";
						WTW.openMoldForm(moldind,shape,moldgroup); 
					} else if (moldgroup == "connectinggrids") {
						var connectinggridind = -1;
						if (namepart[1] != null) {
							if (WTW.isNumeric(namepart[1])) {
								connectinggridind = Number(namepart[1]);
							}
						}
						if (connectinggridind > -1) {
							WTW.openConnectingGridsForm(connectinggridind);
							/* WTW.resetMoldCoverings(); */
						}
					} else {
						WTW.changePick(1);
					}
				} else {
					WTW.changePick(1);
				}
			} else {
				WTW.changePick(1);
			}
		} else {
			WTW.changePick(1);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-loadPickedObject=" + ex.message);
	}
}

WTWJS.prototype.setNewActionZone = function() {
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
		} else if (dGet('wtw_tactionzonetype').value == "driverseat" || dGet('wtw_tactionzonetype').value == "passengerseat") {
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
					case "ridealong":
						if (actionzoneaxlebase != null) {
							bposx = zpositionx - actionzoneaxlebase.position.x;
							bposy = zpositiony - actionzoneaxlebase.position.y;
							bposz = zpositionz - actionzoneaxlebase.position.z;
						}
						if (actionzone != null) {
							actionzone.position.x = bposx;
							actionzone.position.y = bposy;
							actionzone.position.z = bposz;
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-setNewActionZone=" + ex.message);
	}
}

WTWJS.prototype.checkMoldTextureCSG = function() {
	try {
		if (dGet('wtw_tmoldcsgaction').selectedIndex == 0) {
			WTW.show('wtw_moldtexturesetdiv');
			WTW.show('wtw_moldbasictexturesetdiv');
			WTW.show('wtw_moldbasictextureset2div');
			dGet('wtw_tmoldcsgmoldid').value = "";
		} else {
			WTW.hide('wtw_moldtexturesetdiv');
			WTW.hide('wtw_moldbasictexturesetdiv');
			WTW.hide('wtw_moldbasictextureset2div');
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-checkMoldTextureCSG=" + ex.message);
	}
}

WTWJS.prototype.setNewMold = function(rebuildmold) {
	try {
		if (rebuildmold == undefined) {
			rebuildmold = 0;
		}
		var moldname = "";
		var moldgroup = "";
		var molds = null;
		var moldid = dGet('wtw_tmoldid').value;
		var moldind = Number(dGet('wtw_tmoldind').value);
		var shape = dGet('wtw_tmoldshape').value;
		var coveringname = "texture";
		switch (dGet('wtw_tmoldmoldgroup').value) {
			case "community":
				moldgroup = "community";
				molds = WTW.communitiesMolds;
				break;
			case "thing":
				moldgroup = "thing";
				molds = WTW.thingMolds;
				break;
			default:
				moldgroup = "building";
				molds = WTW.buildingMolds;
				break;
		}
		moldname = moldgroup + "molds-" + dGet('wtw_tmoldind').value + "-" + dGet('wtw_tmoldid').value + "-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "-" + shape;
		if (moldname != "") {
			var posx = 0;
			var posy = 0;
			var posz = 0;
			var rotx = 0;
			var roty = 0;
			var rotz = 0;
			var lenx = 1;
			var leny = 1;
			var lenz = 1;
			var special1 = 0;
			var special2 = 0;
			var uoffset = 0;
			var voffset = 0;
			var uscale = 0;
			var vscale = 0;
			var opacity = 0;
			var subdivisions = 2;
			var maxheight = 70;
			var iswaterreflection = "0";
			var alphamold = 1;
			var mold = scene.getMeshByID(moldname);
			var moldparent = null;
			var parentname = "";
			if (mold != null) {
				try {
					moldparent = mold.parent;
					parentname = moldparent.name;
				} catch (ex) {}
			}
			if (mold != null && molds[moldind] != null) {
				if (WTW.isNumeric(dGet('wtw_tmoldsubdivisions').value)) {
					if (Number(dGet('wtw_tmoldsubdivisions').value) < 2) {
						dGet('wtw_tmoldsubdivisions').value = "2.00";
					}
					subdivisions = Number(dGet('wtw_tmoldsubdivisions').value);
				}			
				if (molds[moldind].subdivisions != subdivisions) {
					molds[moldind].subdivisions = subdivisions;
					rebuildmold = 1;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldmaxheight').value)) {
					if (Number(dGet('wtw_tmoldmaxheight').value) < 0) {
						dGet('wtw_tmoldmaxheight').value = "0.00";
					}
					maxheight = Number(dGet('wtw_tmoldmaxheight').value);
					molds[moldind].graphics.heightmap.maxheight = maxheight;
				}			
				if (dGet('wtw_tmoldcovering').options[dGet('wtw_tmoldcovering').selectedIndex] != undefined) {
					coveringname = dGet('wtw_tmoldcovering').options[dGet('wtw_tmoldcovering').selectedIndex].value;
				}
				dGet('wtw_pointlist1').innerHTML = "";
				dGet('wtw_pointlist2').innerHTML = "";
				if (shape == "image") {
					coveringname = "hidden";
					molds[moldind].graphics.webimages[0].imageid = dGet('wtw_tmoldaddimageid').value;
					molds[moldind].graphics.webimages[0].imagehoverid = dGet('wtw_tmoldaddimagehoverid').value;
					rebuildmold = 1;
				} else if (shape == "terrain") {
                    rebuildmold = 1;
                } else if (shape == "video") {
                    //rebuildmold = 1;
                } else if (shape == "tube") {
					rebuildmold = 1;
					var pointind = -1;
					if (WTW.isNumeric(dGet('wtw_teditpointindex').value)) {
						pointind = dGet('wtw_teditpointindex').value;
					}
					if (pointind > -1) {
						if (molds[moldind].paths.path1[pointind] == null) {
							molds[moldind].paths.path1[pointind] = WTW.newPathPoint();
							molds[moldind].paths.path1[pointind].sorder = pointind;
						}
						if (WTW.isNumeric(dGet('wtw_tpointpositionx').value)) {
							molds[moldind].paths.path1[pointind].x = dGet('wtw_tpointpositionx').value;
						}
						if (WTW.isNumeric(dGet('wtw_tpointpositiony').value)) {
							molds[moldind].paths.path1[pointind].y = dGet('wtw_tpointpositiony').value;
						}
						if (WTW.isNumeric(dGet('wtw_tpointpositionz').value)) {
							molds[moldind].paths.path1[pointind].z = dGet('wtw_tpointpositionz').value;
						}
					}
					WTW.loadPointList(molds[moldind].paths.path1, 1);
				}
				if (dGet('wtw_tmoldcoveringold').value == "") {
					dGet('wtw_tmoldcoveringold').value = coveringname;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldscalingx').value)) {
					if (Number(dGet('wtw_tmoldscalingx').value) < .01) {
						dGet('wtw_tmoldscalingx').value = ".01";
					}
					lenx = Number(dGet('wtw_tmoldscalingx').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldscalingy').value)) {
					if (Number(dGet('wtw_tmoldscalingy').value) < .01) {
						dGet('wtw_tmoldscalingy').value = ".01";
					}
					leny = Number(dGet('wtw_tmoldscalingy').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldscalingz').value)) {
					if (Number(dGet('wtw_tmoldscalingz').value) < .01) {
						dGet('wtw_tmoldscalingz').value = ".01";
					}
					lenz = Number(dGet('wtw_tmoldscalingz').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldspecial1').value)) {
					special1 = Number(dGet('wtw_tmoldspecial1').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldspecial2').value)) {
					special2 = Number(dGet('wtw_tmoldspecial2').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmolduoffset').value)) {
					uoffset = Number(dGet('wtw_tmolduoffset').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldvoffset').value)) {
					voffset = Number(dGet('wtw_tmoldvoffset').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmolduscale').value)) {
					uscale = Number(dGet('wtw_tmolduscale').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldvscale').value)) {
					vscale = Number(dGet('wtw_tmoldvscale').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldopacity').value)) {
					opacity = Number(dGet('wtw_tmoldopacity').value);
				}
				if (opacity < 0) {
					opacity = 0;
				}
				if (opacity > 100) {
					opacity = 100;
				}
				dGet('wtw_tmoldopacity').value = (opacity.toFixed(2));
				if (coveringname == "glass") {
					molds[moldind].graphics.texture.id = "";
					molds[moldind].graphics.texture.path = "";
					molds[moldind].graphics.texture.bumpid = "";
					molds[moldind].graphics.texture.bumppath = "";
					dGet('wtw_tmoldtextureid').value = "";
					dGet('wtw_tmoldtexturepath').value = "";
					dGet('wtw_tmoldtexturebumpid').value = "";
					dGet('wtw_tmoldtexturebumppath').value = "";
					opacity = .2;
				}
				if (molds[moldind].scaling.special1 != special1) {
					molds[moldind].scaling.special1 = special1;
					rebuildmold = 1;
				}
				if (molds[moldind].scaling.special2 != special2) {
					molds[moldind].scaling.special2 = special2;
					rebuildmold = 1;
				}
				if (molds[moldind].graphics.uoffset != uoffset) {
					molds[moldind].graphics.uoffset = uoffset;
					//rebuildmold = 1;
				}
				if (molds[moldind].graphics.voffset != voffset) {
					molds[moldind].graphics.voffset = voffset;
					//rebuildmold = 1;
				}
				if (molds[moldind].graphics.uscale != uscale) {
					molds[moldind].graphics.uscale = uscale;
					rebuildmold = 1;
				}
				if (molds[moldind].graphics.vscale != vscale) {
					molds[moldind].graphics.vscale = vscale;
					rebuildmold = 1;
				}
				molds[moldind].opacity = opacity;
				molds[moldind].scaling.x = lenx;
				molds[moldind].scaling.y = leny;
				molds[moldind].scaling.z = lenz;
				mold.scaling.x = lenx;
				mold.scaling.y = leny;
				mold.scaling.z = lenz;
				posx = molds[moldind].position.x;
				posy = molds[moldind].position.y;
				posz = molds[moldind].position.z;
				if (dGet('wtw_tmoldwaterreflection').checked == true) {
					molds[moldind].graphics.waterreflection = "1";
				} else {
					molds[moldind].graphics.waterreflection = "0";
				}
				if (WTW.isNumeric(dGet('wtw_tmoldpositionx').value)) {
					posx = Number(dGet('wtw_tmoldpositionx').value);
				} else {
					dGet('wtw_tmoldpositionx').value = posx;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldpositiony').value)) {
					posy = Number(dGet('wtw_tmoldpositiony').value);
				} else {
					dGet('wtw_tmoldpositiony').value = posy;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldpositionz').value)) {
					posz = Number(dGet('wtw_tmoldpositionz').value);
				} else {
					dGet('wtw_tmoldpositionz').value = posz;
				}
				molds[moldind].position.x = posx;
				molds[moldind].position.y = posy;
				molds[moldind].position.z = posz;
				molds[moldind].color.specular.r = dGet('wtw_tspecularcolorr').value;
				molds[moldind].color.specular.g = dGet('wtw_tspecularcolorg').value;
				molds[moldind].color.specular.b = dGet('wtw_tspecularcolorb').value;
				molds[moldind].color.emissive.r = dGet('wtw_temissivecolorr').value;
				molds[moldind].color.emissive.g = dGet('wtw_temissivecolorg').value;
				molds[moldind].color.emissive.b = dGet('wtw_temissivecolorb').value;
				molds[moldind].color.diffuse.r = dGet('wtw_tdiffusecolorr').value;
				molds[moldind].color.diffuse.g = dGet('wtw_tdiffusecolorg').value;
				molds[moldind].color.diffuse.b = dGet('wtw_tdiffusecolorb').value;
				if (mold.material != undefined) {
					mold.material.specularColor = new BABYLON.Color3(Number(molds[moldind].color.specular.r), Number(molds[moldind].color.specular.g), Number(molds[moldind].color.specular.b));
					mold.material.diffuseColor = new BABYLON.Color3(Number(molds[moldind].color.diffuse.r), Number(molds[moldind].color.diffuse.g), Number(molds[moldind].color.diffuse.b));	
					if (shape != "terrain" && shape != "floor") {
						mold.material.emissiveColor = new BABYLON.Color3(Number(molds[moldind].color.emissive.r), Number(molds[moldind].color.emissive.g), Number(molds[moldind].color.emissive.b));
					} else {
						mold.material.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
					}
				}
				if (molds[moldind].covering == "color" || molds[moldind].covering == "marble") {
					var moldimageframename = moldname + "-imageframe";
					var moldimageframe = scene.getMeshByID(moldimageframename);
					if (moldimageframe != null) {	
						if (moldimageframe.material != undefined) {
							moldimageframe.material.specularColor = new BABYLON.Color3(Number(molds[moldind].color.specular.r), Number(molds[moldind].color.specular.g), Number(molds[moldind].color.specular.b));
							moldimageframe.material.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
							moldimageframe.material.diffuseColor = new BABYLON.Color3(Number(molds[moldind].color.diffuse.r), Number(molds[moldind].color.diffuse.g), Number(molds[moldind].color.diffuse.b));	
						}
					}
				}
				if (parentname.indexOf("actionzone") > -1) {
					var actionzoneparts = parentname.split('-');
					var actionzoneind = Number(actionzoneparts[1]);
					if (WTW.actionZones[actionzoneind].actionzonetype == "passengerseat" || WTW.actionZones[actionzoneind].actionzonetype == "driverseat") {
						var actionzoneaxlebase2 = scene.getMeshByID("actionzoneaxlebase2-" + actionzoneind.toString() + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
						if (actionzoneaxlebase2 != null) {
//							posx -= actionzoneaxlebase2.position.x;
//							posy -= actionzoneaxlebase2.position.y;
//							posz -= actionzoneaxlebase2.position.z;
						}
					} else {
						var actionzoneaxlebase = scene.getMeshByID("actionzoneaxlebase-" + actionzoneind.toString() + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
						if (actionzoneaxlebase != null) {
							posx -= actionzoneaxlebase.position.x;
							posy -= actionzoneaxlebase.position.y;
							posz -= actionzoneaxlebase.position.z;
						}
					}
				}
				mold.position.x = posx;
				mold.position.y = posy;
				mold.position.z = posz;
				if (WTW.isNumeric(dGet('wtw_tmoldrotationx').value)) {
					rotx = WTW.getRadians(Number(dGet('wtw_tmoldrotationx').value));
				}
				if (WTW.isNumeric(dGet('wtw_tmoldrotationy').value)) {
					roty = WTW.getRadians(Number(dGet('wtw_tmoldrotationy').value));
				}
				if (WTW.isNumeric(dGet('wtw_tmoldrotationz').value)) {
					rotz = WTW.getRadians(Number(dGet('wtw_tmoldrotationz').value));
				}
				molds[moldind].rotation.x = WTW.getDegrees(rotx);
				molds[moldind].rotation.y = WTW.getDegrees(roty);
				molds[moldind].rotation.z = WTW.getDegrees(rotz);
				mold.rotation.x = rotx;
				if (shape == "candleflame") { // billboardmode
					mold.rotation.y = 0;
					dGet('wtw_tmoldrotationy').value = '0.00';
				} else {
					mold.rotation.y = roty;				
				}
				mold.rotation.z = rotz;				
				if ((shape == "box" || shape == "wall" || shape == "floor") && coveringname == "directional texture") {
					coveringname = "directional texture";
				} else if (shape != "box" && shape != "wall" && shape != "floor" && coveringname == "directional texture") {
					coveringname = "texture";
				}
				if (shape == "3dtext") {
					if (molds[moldind].webtext.webtext != undefined) {
						if (molds[moldind].webtext.webtext != dGet('wtw_tmoldwebtext').value) {
							molds[moldind].webtext.webtext = dGet('wtw_tmoldwebtext').value;
							rebuildmold = 1;
						}
					}
					if (dGet('wtw_tmoldwebtextheight').value == '' || WTW.isNumeric(dGet('wtw_tmoldwebtextheight').value) == false) {
						dGet('wtw_tmoldwebtextheight').value = 6;
					}
					if (dGet('wtw_tmoldwebtextthick').value == '' || WTW.isNumeric(dGet('wtw_tmoldwebtextthick').value) == false) {
						dGet('wtw_tmoldwebtextthick').value = 1;
					}
					if (dGet('wtw_tmoldwebtextcolor').value == '') {
						dGet('wtw_tmoldwebtextcolor').value = '#ff0000';
					}
					if (dGet('wtw_tmoldwebtextdiffuse').value == '') {
						dGet('wtw_tmoldwebtextdiffuse').value = '#f0f0f0';
					}
					if (dGet('wtw_tmoldwebtextspecular').value == '') {
						dGet('wtw_tmoldwebtextspecular').value = '#000000';
					}
					if (dGet('wtw_tmoldwebtextambient').value == '') {
						dGet('wtw_tmoldwebtextambient').value = '#808080';
					}
					if (molds[moldind].webtext.webstyle != undefined) {
						dGet('wtw_tmoldwebstyle').value = "{\"anchor\":\"" + dGet('wtw_tmoldwebtextalign').options[dGet('wtw_tmoldwebtextalign').selectedIndex].value + "\",\"letter-height\":" + dGet('wtw_tmoldwebtextheight').value + ",\"letter-thickness\":" + dGet('wtw_tmoldwebtextthick').value + ",\"color\":\"" + dGet('wtw_tmoldwebtextcolor').value + "\",\"alpha\":" + opacity/100 + ",\"colors\":{\"diffuse\":\"" + dGet('wtw_tmoldwebtextdiffuse').value + "\",\"specular\":\"" + dGet('wtw_tmoldwebtextspecular').value + "\",\"ambient\":\"" + dGet('wtw_tmoldwebtextambient').value + "\",\"emissive\":\"" + dGet('wtw_tmoldwebtextcolor').value + "\"}}";
						if (molds[moldind].webtext.webstyle != dGet('wtw_tmoldwebstyle').value) {
							molds[moldind].webtext.webstyle = dGet('wtw_tmoldwebstyle').value;
							rebuildmold = 1;
						}
					}
				}
				molds[moldind].csg.moldid = dGet('wtw_tmoldcsgmoldid').value;
				var csgmainid = molds[moldind].csg.moldid;

				if (molds[moldind].object.uploadobjectid != undefined) {
					if (molds[moldind].object.uploadobjectid != dGet('wtw_tmolduploadobjectid').value) {
						molds[moldind].object.uploadobjectid = dGet('wtw_tmolduploadobjectid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].object.folder != undefined) {
					if (molds[moldind].object.folder != dGet('wtw_tmoldobjectfolder').value) {
						molds[moldind].object.folder = dGet('wtw_tmoldobjectfolder').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].object.file != undefined) {
					if (molds[moldind].object.file != dGet('wtw_tmoldobjectfile').value) {
						molds[moldind].object.file = dGet('wtw_tmoldobjectfile').value;
						rebuildmold = 1;
					}
				}

				if (molds[moldind].graphics.receiveshadows != undefined) {
					if (dGet('wtw_tmoldreceiveshadows').checked) {
						molds[moldind].graphics.receiveshadows = '1';
					} else {
						molds[moldind].graphics.receiveshadows = '0';
					}
				}
				if (molds[moldind].graphics.level != undefined) {
					if (dGet('wtw_tmoldgraphiclevel').checked) {
						molds[moldind].graphics.level = '1';
					} else {
						molds[moldind].graphics.level = '0';
					}
				}
				if (molds[moldind].graphics.texture.id != undefined) {
					if (molds[moldind].graphics.texture.id != dGet('wtw_tmoldtextureid').value) {
						molds[moldind].graphics.texture.id = dGet('wtw_tmoldtextureid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.texture.path != undefined) {
					if (molds[moldind].graphics.texture.path != dGet('wtw_tmoldtexturepath').value) {
						molds[moldind].graphics.texture.path = dGet('wtw_tmoldtexturepath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.texture.bumpid != undefined) {
					if (molds[moldind].graphics.texture.bumpid != dGet('wtw_tmoldtexturebumpid').value) {
						molds[moldind].graphics.texture.bumpid = dGet('wtw_tmoldtexturebumpid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.texture.bumppath != undefined) {
					if (molds[moldind].graphics.texture.bumppath != dGet('wtw_tmoldtexturebumppath').value) {
						molds[moldind].graphics.texture.bumppath = dGet('wtw_tmoldtexturebumppath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.id != undefined) {
					if (molds[moldind].graphics.heightmap.id != dGet('wtw_tmoldheightmapid').value) {
						molds[moldind].graphics.heightmap.id = dGet('wtw_tmoldheightmapid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.path != undefined) {
					if (molds[moldind].graphics.heightmap.path != dGet('wtw_tmoldheightmappath').value) {
						molds[moldind].graphics.heightmap.path = dGet('wtw_tmoldheightmappath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.mixmapid != undefined) {
					if (molds[moldind].graphics.heightmap.mixmapid != dGet('wtw_tmoldmixmapid').value) {
						molds[moldind].graphics.heightmap.mixmapid = dGet('wtw_tmoldmixmapid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.mixmappath != undefined) {
					if (molds[moldind].graphics.heightmap.mixmappath != dGet('wtw_tmoldmixmappath').value) {
						molds[moldind].graphics.heightmap.mixmappath = dGet('wtw_tmoldmixmappath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturerid != undefined) {
					if (molds[moldind].graphics.heightmap.texturerid != dGet('wtw_tmoldtexturerid').value) {
						molds[moldind].graphics.heightmap.texturerid = dGet('wtw_tmoldtexturerid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturerpath != undefined) {
					if (molds[moldind].graphics.heightmap.texturerpath != dGet('wtw_tmoldtexturerpath').value) {
						molds[moldind].graphics.heightmap.texturerpath = dGet('wtw_tmoldtexturerpath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturegid != undefined) {
					if (molds[moldind].graphics.heightmap.texturegid != dGet('wtw_tmoldtexturegid').value) {
						molds[moldind].graphics.heightmap.texturegid = dGet('wtw_tmoldtexturegid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturegpath != undefined) {
					if (molds[moldind].graphics.heightmap.texturegpath != dGet('wtw_tmoldtexturegpath').value) {
						molds[moldind].graphics.heightmap.texturegpath = dGet('wtw_tmoldtexturegpath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturebid != undefined) {
					if (molds[moldind].graphics.heightmap.texturebid != dGet('wtw_tmoldtexturebid').value) {
						molds[moldind].graphics.heightmap.texturebid = dGet('wtw_tmoldtexturebid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturebpath != undefined) {
					if (molds[moldind].graphics.heightmap.texturebpath != dGet('wtw_tmoldtexturebpath').value) {
						molds[moldind].graphics.heightmap.texturebpath = dGet('wtw_tmoldtexturebpath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturebumprid != undefined) {
					if (molds[moldind].graphics.heightmap.texturebumprid != dGet('wtw_tmoldtexturebumprid').value) {
						molds[moldind].graphics.heightmap.texturebumprid = dGet('wtw_tmoldtexturebumprid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturebumprpath != undefined) {
					if (molds[moldind].graphics.heightmap.texturebumprpath != dGet('wtw_tmoldtexturebumprpath').value) {
						molds[moldind].graphics.heightmap.texturebumprpath = dGet('wtw_tmoldtexturebumprpath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturebumpgid != undefined) {
					if (molds[moldind].graphics.heightmap.texturebumpgid != dGet('wtw_tmoldtexturebumpgid').value) {
						molds[moldind].graphics.heightmap.texturebumpgid = dGet('wtw_tmoldtexturebumpgid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturebumpgpath != undefined) {
					if (molds[moldind].graphics.heightmap.texturebumpgpath != dGet('wtw_tmoldtexturebumpgpath').value) {
						molds[moldind].graphics.heightmap.texturebumpgpath = dGet('wtw_tmoldtexturebumpgpath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturebumpbid != undefined) {
					if (molds[moldind].graphics.heightmap.texturebumpbid != dGet('wtw_tmoldtexturebumpbid').value) {
						molds[moldind].graphics.heightmap.texturebumpbid = dGet('wtw_tmoldtexturebumpbid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturebumpbpath != undefined) {
					if (molds[moldind].graphics.heightmap.texturebumpbpath != dGet('wtw_tmoldtexturebumpbpath').value) {
						molds[moldind].graphics.heightmap.texturebumpbpath = dGet('wtw_tmoldtexturebumpbpath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.texture.videoid != undefined) {
					if (molds[moldind].graphics.texture.videoid != dGet('wtw_tmoldvideoid').value) {
						molds[moldind].graphics.texture.videoid = dGet('wtw_tmoldvideoid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.texture.video != undefined) {
					if (molds[moldind].graphics.texture.video != dGet('wtw_tmoldvideopath').value) {
						molds[moldind].graphics.texture.video = dGet('wtw_tmoldvideopath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.texture.videoposterid != undefined) {
					if (molds[moldind].graphics.texture.videoposterid != dGet('wtw_tmoldvideoposterid').value) {
						molds[moldind].graphics.texture.videoposterid = dGet('wtw_tmoldvideoposterid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.texture.videoposter != undefined) {
					if (molds[moldind].graphics.texture.videoposter != dGet('wtw_tmoldvideoposterpath').value) {
						molds[moldind].graphics.texture.videoposter = dGet('wtw_tmoldvideoposterpath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].sound.id != undefined) {
					if (molds[moldind].sound.id != dGet('wtw_tmoldsoundid').value) {
						molds[moldind].sound.id = dGet('wtw_tmoldsoundid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].sound.path != undefined) {
					if (molds[moldind].sound.path != dGet('wtw_tmoldsoundpath').value) {
						molds[moldind].sound.path = dGet('wtw_tmoldsoundpath').value;
						rebuildmold = 1;
					}
				}
				if (dGet('wtw_soundicon') != null && dGet('wtw_soundicon').alt != '') {
					dGet('wtw_tmoldsoundname').value = dGet('wtw_soundicon').alt;
					dGet('wtw_selectedsound').innerHTML = dGet('wtw_tmoldsoundname').value;
				}
				if (molds[moldind].sound.name != undefined) {
					if (molds[moldind].sound.name != dGet('wtw_tmoldsoundname').value) {
						molds[moldind].sound.name = dGet('wtw_tmoldsoundname').value;
						rebuildmold = 1;
					}
				}
				var soundattenuation = "none";
				if (dGet('wtw_tmoldsoundattenuation').selectedIndex > -1) {
					soundattenuation = dGet('wtw_tmoldsoundattenuation').options[dGet('wtw_tmoldsoundattenuation').selectedIndex].value;
				} else {
					WTW.setDDLValue('wtw_tmoldsoundattenuation', "linear");
					soundattenuation = "linear";
				}
				if (molds[moldind].sound.attenuation != undefined) {
					if (molds[moldind].sound.attenuation != soundattenuation) {
						molds[moldind].sound.attenuation = soundattenuation;
						WTW.setSoundFields();
						rebuildmold = 1;
					}
				}
				if (molds[moldind].sound.loop != undefined) {
					var soundloop = '0';
					if (dGet('wtw_tmoldsoundloop').checked == true) {
						soundloop = '1';
					}
					if (molds[moldind].sound.loop != soundloop) {
						if (soundloop == '1') {
							molds[moldind].sound.loop = '1';
						} else {
							molds[moldind].sound.loop = '0';
						}
						rebuildmold = 1;
					}
				}
				if (molds[moldind].sound.maxdistance != undefined) {
					if (molds[moldind].sound.maxdistance != dGet('wtw_tmoldsoundmaxdistance').value) {
						molds[moldind].sound.maxdistance = dGet('wtw_tmoldsoundmaxdistance').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].sound.rollofffactor != undefined) {
					if (molds[moldind].sound.rollofffactor != dGet('wtw_tmoldsoundrollofffactor').value) {
						molds[moldind].sound.rollofffactor = dGet('wtw_tmoldsoundrollofffactor').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].sound.refdistance != undefined) {
					if (molds[moldind].sound.refdistance != dGet('wtw_tmoldsoundrefdistance').value) {
						molds[moldind].sound.refdistance = dGet('wtw_tmoldsoundrefdistance').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].sound.coneinnerangle != undefined) {
					if (molds[moldind].sound.coneinnerangle != dGet('wtw_tmoldsoundconeinnerangle').value) {
						molds[moldind].sound.coneinnerangle = dGet('wtw_tmoldsoundconeinnerangle').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].sound.coneouterangle != undefined) {
					if (molds[moldind].sound.coneouterangle != dGet('wtw_tmoldsoundconeouterangle').value) {
						molds[moldind].sound.coneouterangle = dGet('wtw_tmoldsoundconeouterangle').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].sound.coneoutergain != undefined) {
					if (molds[moldind].sound.coneoutergain != dGet('wtw_tmoldsoundconeoutergain').value) {
						molds[moldind].sound.coneoutergain = dGet('wtw_tmoldsoundconeoutergain').value;
						rebuildmold = 1;
					}
				}
				var csgaction = dGet('wtw_tmoldcsgaction').options[dGet('wtw_tmoldcsgaction').selectedIndex].value;
				var csgmainind = -1; 
				var csgchildind = -1;
				if (csgmainid != "") {
					csgmainind = WTW.getMoldInd(molds, csgmainid, dGet('wtw_tconnectinggridind').value);
					WTW.setCSGCount(csgmainid);
					csgchildind = WTW.getMoldInd(molds, moldid, dGet('wtw_tconnectinggridind').value);
					molds[csgchildind].covering = "color";
					molds[csgchildind].opacity = "30";
					coveringname = "color";
				}
				if (WTW.isNumeric(molds[moldind].csg.count)) {
					if (Number(molds[moldind].csg.count) > 0) {
						WTW.disposeClean(moldname);
						molds[moldind].shown = "0";
						rebuildmold = 0;
						csgmainid = "";
					}
				}
				if (csgmainid != "" && molds[csgmainind] != null) {
					var csgmainname = moldgroup + "molds-" + csgmainind + "-" + molds[csgmainind].moldid + "-" + molds[csgmainind].connectinggridind + "-" + molds[csgmainind].connectinggridid + "-" + molds[csgmainind].shape;
					var csgmain = scene.getMeshByID(csgmainname);
					if (csgmain != null) {
						WTW.disposeClean(csgmainname);
						//molds[csgmainind].shown = '0';
						csgmain = WTW.addMold(molds[csgmainind].moldname, molds[csgmainind], molds[csgmainind].parentname, molds[csgmainind].covering);
						csgmain = WTW.processCSGAction(csgmain, moldgroup, molds[csgmainind]);
						var receiveshadows = '0';
						var waterreflection = '0';
						if (molds[csgmainind].graphics.receiveshadows != undefined) {
							if (molds[csgmainind].graphics.receiveshadows == '1') {
								receiveshadows = '1';
							}
						}
						if (molds[csgmainind].graphics.waterreflection != undefined) {
							if (molds[csgmainind].graphics.waterreflection == '1') {
								waterreflection = '1';
							}
						}
						if (receiveshadows == '1') {
							mold.receiveShadows = true;
						} else if (WTW.shadowset > 0) {
							WTW.addShadowToShadowmaps(mold);
						}
						if (waterreflection == '1' && WTW.waterMat != null) {
							WTW.waterMat.addToRenderList(mold);
						}
						csgmain.checkCollisions = false;
						csgmain.isPickable = false;
						if (molds[csgmainind].checkcollisions != undefined) {
							if (molds[csgmainind].checkcollisions == "1") {
								csgmain.checkCollisions = true;
							}
						}
						if (molds[csgmainind].ispickable != undefined) {
							if (molds[csgmainind].ispickable == "1") {
								csgmain.isPickable = true;
							}
						}
					}
				} 
				rebuildmold = WTW.pluginsSetNewMold(moldname, molds, moldind, rebuildmold);
				if (rebuildmold == 1 || csgmainid != "") {
					WTW.disposeClean(moldname);
					mold = WTW.addMold(moldname, molds[moldind], parentname, coveringname);
				}
				if (rebuildmold == 1 && shape != "image") {
					if (mold != null && dGet('wtw_tmoldmoldgroup').value == "building") {
						if (WTW.shadowset == 3) {
							if (molds[moldind].shape == "floor") {
								mold.receiveShadows = true;
							}
							WTW.addShadowToShadowmaps(mold);
						} else if (WTW.shadowset == 2 && molds[moldind] != null) {
							if (molds[moldind].shape == "floor") {
								mold.receiveShadows = true;
							}
							WTW.addShadowToShadowmaps(mold);
						}
					} else if (mold != null && dGet('wtw_tmoldmoldgroup').value == "community") {
						if (WTW.shadowset == 3) {
							if (molds[moldind].shape == "terrain" || molds[moldind].shape == "floor") {
								mold.receiveShadows = true;
							}
							WTW.addShadowToShadowmaps(mold);
						} else if (WTW.shadowset > 0) {
							if (molds[moldind].shape != "floor") {
								WTW.addShadowToShadowmaps(mold);
							} else {
								mold.receiveShadows = true;
							}
						}
					}
					WTW.registerMouseOver(mold);
				}
				WTW.openEditPoles(mold);
			}
		}	
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setNewMold=" + ex.message);
	}
}

WTWJS.prototype.setCSGCount = function(csgmainid) {
	try {
		var count = 0;
		var csgmainind = -1;
		var moldgroup = "community";
		var molds = WTW.communitiesMolds;
		if (buildingid != "") {
			moldgroup = "building";
			molds = WTW.buildingMolds;
		} else if (thingid != "") {
			moldgroup = "thing";
			molds = WTW.thingMolds;
		}
		for (var i=0; i < molds.length; i++) {
			if (molds[i] != null) {
				var csgmoldid = molds[i].csg.moldid;
				if (csgmoldid == csgmainid) {
					count += 1;
				}
				if (molds[i].moldid == csgmainid) {
					csgmainind = i;
				}
			}
		}
		if (molds[csgmainind] != null) {
			if (molds[csgmainind].csg.count != undefined) {
				molds[csgmainind].csg.count = count;
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setCSGCount=" + ex.message);
	}
}

WTWJS.prototype.setGroundWater = function() {
	try {
		if (communityid != "") {
			var groundpositiony = 0;
			var waterpositiony = -1;
			if (WTW.isNumeric(dGet('wtw_tgroundpositiony').value)) {
				groundpositiony = Number(dGet('wtw_tgroundpositiony').value);
			}
			if (groundpositiony > 0) {
				groundpositiony = 0;
				dGet('wtw_tgroundpositiony').value = "0.00";
			}
			if (groundpositiony != 0) {
				waterpositiony = 0;
			}
			if (WTW.extraGround != null) {
				WTW.extraGround.position.y = groundpositiony;
			}
			if (WTW.water != null) {
				WTW.water.position.y = waterpositiony;
			}
			dGet('wtw_twaterpositiony').value = waterpositiony;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setGroundWater=" + ex.message);
	}
}

WTWJS.prototype.setNewConnectingGrid = function() {
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-setNewConnectingGrid=" + ex.message);
	}
}

WTWJS.prototype.saveShareCommunityForm = function() {
	try {
		var request = {
			'sharename':dGet('wtw_tsharecommtempname').value,
			'sharedescription':dGet('wtw_tsharecommdescription').value,
			'sharetags':dGet('wtw_tsharecommtags').value
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tcommunityid').value = communityid;
			ipage.getElementById('wtw_tcommunityind').value = "-1";
			ipage.getElementById('wtw_tsharecommtempname').value = request.sharename;
			ipage.getElementById('wtw_tsharecommdescription').value = request.sharedescription;
			ipage.getElementById('wtw_tsharecommtags').value = request.sharetags;
			ipage.getElementById('wtw_bsharecommunitytemplate').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/communities.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-saveShareCommunityForm=" + ex.message);
	}
}

WTWJS.prototype.saveShareBuildingForm = function() {
	try {
		var request = {
			'sharename':dGet('wtw_tsharebuildtempname').value,
			'sharedescription':dGet('wtw_tsharebuilddescription').value,
			'sharetags':dGet('wtw_tsharebuildtags').value
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tbuildingid').value = buildingid;
			ipage.getElementById('wtw_tsharebuildtempname').value = request.sharename;
			ipage.getElementById('wtw_tsharebuilddescription').value = request.sharedescription;
			ipage.getElementById('wtw_tsharebuildtags').value = request.sharetags;
			ipage.getElementById('wtw_bsharebuildingtemplate').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/buildings.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-saveShareBuildingForm=" + ex.message);
	}
}

WTWJS.prototype.saveShareThingForm = function() {
	try {
		var request = {
			'sharename':dGet('wtw_tsharethingtempname').value,
			'sharedescription':dGet('wtw_tsharethingdescription').value,
			'sharetags':dGet('wtw_tsharethingtags').value
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tthingid').value = thingid;
			ipage.getElementById('wtw_tthingind').value = "-1";
			ipage.getElementById('wtw_tsharethingtempname').value = request.sharename;
			ipage.getElementById('wtw_tsharethingdescription').value = request.sharedescription;
			ipage.getElementById('wtw_tsharethingtags').value = request.sharetags;
			ipage.getElementById('wtw_bsharethingtemplate').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/things.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-saveShareThingForm=" + ex.message);
	}
}

WTWJS.prototype.shareCommunityTemplate = function() {
	try {
		WTW.closeConfirmation();
		dGet('wtw_bsharecommunitytemp').innerHTML = 'Shared 3D Thing';
		WTW.saveShareCommunityForm();
		var request = {
			'key':btoa(WTW.getRandomString(16)),
			'moldgroup': 'community',
			'webid':communityid
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tkey').value = request.key;
			ipage.getElementById('wtw_tmoldgroup').value = request.moldgroup;
			ipage.getElementById('wtw_twebid').value = request.webid;
			ipage.getElementById('wtw_bsetKeyHash').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/uploads.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-shareCommunityTemplate=" + ex.message);
	}
}

WTWJS.prototype.shareCommunitySecurity = function(zkey) {
	try {
		
		WTW.getJSON("https://3dnet.walktheweb.com/connect/communitysharerequest.php?key=" + zkey + "&communityid=" + communityid + "&userid=" + dGet('wtw_tuserid').value + "&protocol=" + wtw_protocol + "&domain=" + wtw_domainname, 
			function(response) {
				response = JSON.parse(response);

WTW.log("communityid=" + response.communityid);
WTW.log("userid=" + response.userid);
WTW.log("serror=" + response.serror);
WTW.log("url=" + response.url);

/*		'communityid' => $communityid,
		'userid' => $userid,
		'serror' => 'SUCCESS',
		'url' => $url
*/

				//WTW.updateShareCommunityTemplate(JSON.parse(response));
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-shareCommunitySecurity=" + ex.message);
	}
}

WTWJS.prototype.shareBuildingTemplate = function() {
	try {
		WTW.closeConfirmation();
		dGet('wtw_bsharebuildingtemp').innerHTML = 'Shared 3D Thing';
		WTW.saveShareBuildingForm();
		WTW.getJSON("/templates/connect/buildingsharetemplate.php?buildingid=" + buildingid + "&userid=" + dGet('wtw_tuserid').value, 
			function(response) {
				WTW.updateShareBuildingTemplate(JSON.parse(response));
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-shareBuildingTemplate=" + ex.message);
	}
}

WTWJS.prototype.shareThingTemplate = function() {
	try {
		WTW.closeConfirmation();
		dGet('wtw_bsharethingtemplate').value = 'Shared 3D Thing';
		WTW.saveShareThingForm();
		WTW.getJSON("/templates/connect/thingsharetemplate.php?thingid=" + thingid + "&userid=" + dGet('wtw_tuserid').value, 
			function(response) {
				WTW.updateShareThingTemplate(JSON.parse(response));
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-shareThingTemplate=" + ex.message);
	}
}

WTWJS.prototype.updateShareCommunityTemplate = function(response) {
	try {
		dGet('wtw_sharecommunityresponse').innerHTML = response;
		location.hash = "#wtw_sharecommunityresponse";
		window.setTimeout(function() {
			dGet('wtw_sharecommunityresponse').innerHTML = "";
		}, 3000);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-updateShareCommunityTemplate=" + ex.message);
	}
}

WTWJS.prototype.updateShareBuildingTemplate = function(response) {
	try {
		dGet('wtw_sharebuildingresponse').innerHTML = response;
		location.hash = "#wtw_sharebuildingresponse";
		window.setTimeout(function() {
			dGet('wtw_sharebuildingresponse').innerHTML = "";
		}, 3000);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-updateShareBuildingTemplate=" + ex.message);
	} 
}

WTWJS.prototype.updateShareThingTemplate = function(response) {
	try {
		dGet('wtw_sharethingresponse').innerHTML = response;
		location.hash = "#wtw_sharethingresponse";
		window.setTimeout(function() {
			dGet('wtw_sharethingresponse').innerHTML = "";
		}, 3000);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-updateShareThingTemplate=" + ex.message);
	}
}

WTWJS.prototype.setShowCSG = function() {
	try {
		var moldgroup = "community";
		var molds = WTW.communitiesMolds;
		if (buildingid != "") {
			moldgroup = "building";
			molds = WTW.buildingMolds;
		} else if (thingid != "") {
			moldgroup = "thing";
			molds = WTW.thingMolds;
		}
		for (var i=0; i < molds.length; i++) {
			if (molds[i] != null) {
				var csgmoldid = molds[i].csg.moldid;
				if (csgmoldid != "" && molds[i].shown == "2") {
					var csgmoldname = molds[i].moldname;
					var csgmold = scene.getMeshByID(csgmoldname);
					if (csgmold == null) {
						molds[i].covering = "color";
						molds[i].opacity = "30";
						csgmold = WTW.addMold(csgmoldname, molds[i], molds[i].parentname, "color");
						WTW.registerMouseOver(csgmold);
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setShowCSG=" + ex.message);
	}
}

WTWJS.prototype.setHideCSG = function() {
	try {
		var moldgroup = "community";
		var molds = WTW.communitiesMolds;
		if (buildingid != "") {
			moldgroup = "building";
			molds = WTW.buildingMolds;
		} else if (thingid != "") {
			moldgroup = "thing";
			molds = WTW.thingMolds;
		}
		for (var i=0; i < molds.length; i++) {
			if (molds[i] != null) {
				var csgmoldid = molds[i].csg.moldid;
				if (csgmoldid != "" && molds[i].shown == "2") {
					var csgmoldname = molds[i].moldname;
					var csgmold = scene.getMeshByID(csgmoldname);
					if (csgmold != null) {
						var moldnameparts = WTW.getMoldnameParts(csgmoldname);
						moldnameparts.molds[moldnameparts.moldind].shown = '0';
						WTW.disposeClean(csgmoldname);
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setHideCSG=" + ex.message);
	}
}

WTWJS.prototype.toggleAdminMenu = function(buttonid) {
	try {
		if (dGet(buttonid).style.left == "0px") {
			var x = 0;
			var menutimer = window.setInterval(function() {
				if (x < 325) {
					dGet(buttonid).style.left = x + 'px';
					x += 40;
				} else {
					dGet(buttonid).style.left = '315px';
					dGet(buttonid.replace("button","")).style.left = '0px';
					dGet(buttonid.replace("button","") + 'left').style.visibility = 'visible';
					dGet(buttonid.replace("button","") + 'right').style.visibility = 'hidden';
					window.clearInterval(menutimer);
					menutimer = null;
					WTW.show(buttonid.replace("button",""));
				}
				WTW.setWindowSize();
			},1);
		} else {
			WTW.hide(buttonid.replace("button",""));
			var x = 325;
			var menutimer = window.setInterval(function() {
				if (x > 0) {
					dGet(buttonid).style.left = x + 'px';
					x -= 40;
				} else {
					dGet(buttonid).style.left = '0px';
					dGet(buttonid.replace("button","")).style.left = '-315px';
					dGet(buttonid.replace("button","") + 'left').style.visibility = 'hidden';
					dGet(buttonid.replace("button","") + 'right').style.visibility = 'visible';
					window.clearInterval(menutimer);
					menutimer = null;
				}
				WTW.setWindowSize();
			},1);
		}
		if (dGet('wtw_adminmenu1').style.display != "none") {
			if (communityid != "") {
				WTW.show('wtw_admincommunitiesdiv');
				WTW.show('wtw_adminsettingscommunity');
				WTW.show('wtw_admineditcommunity');
			} else {
				WTW.hide('wtw_adminsettingscommunity');
				WTW.hide('wtw_admineditcommunity');
			}
			if (buildingid != "") {
				WTW.show('wtw_adminbuildingsdiv');
				WTW.show('wtw_adminsettingsbuilding');
				WTW.show('wtw_admineditbuilding');
			} else {
				WTW.hide('wtw_adminsettingsbuilding');
				WTW.hide('wtw_admineditbuilding');
			}
			if (thingid != "") {
				WTW.show('wtw_adminthingsdiv');
				WTW.show('wtw_adminsettingsthing');
				WTW.show('wtw_admineditthing');
			} else {
				WTW.hide('wtw_adminsettingsthing');
				WTW.hide('wtw_admineditthing');
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-toggleAdminMenu=" + ex.message);
	}
}

WTWJS.prototype.toggleAdminMenuDashboard = function() {
	try {
		if (dGet('wtw_fullpageform').style.display == "none" || (dGet('wtw_dashboardpage').style.display == "none" && dGet('wtw_updatespage').style.display == "none")) {
			WTW.openFullPageForm('dashboard','','');
		} else {
			WTW.closeFullPageForm();
			//WTW.hideFullPages();
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-toggleAdminMenuDashboard=" + ex.message);
	}
}

WTWJS.prototype.toggleAdminMenuMediaLibrary = function() {
	try {
		if (dGet('wtw_fullpageform').style.display == "none" || dGet('wtw_selectimagepage').style.display == "none") {
			WTW.openFullPageForm('medialibrary','','');
		} else {
			WTW.closeFullPageForm();
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-toggleAdminMenuMediaLibrary=" + ex.message);
	}
}

WTWJS.prototype.toggleAdminMenuLevel = function(sectionname) {
	try {
		var obj = dGet("wtw_adminmenu" + sectionname + "div");
		if (obj != null) {
			var current = obj.style.display;
			WTW.hide('wtw_fullpageform');
			if (current == "none") {
				obj.style.display = "block";
				obj.style.visibility = "visible";
			} else {
				obj.style.display = "none";
				obj.style.visibility = "hidden";
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-toggleAdminMenuLevel=" + ex.message);
	}
}

WTWJS.prototype.hideAdminMenu = function() {
	try {
		var menusubdivs = document.getElementsByClassName('wtw-adminmenuform');
		for (var i=0;i<menusubdivs.length;i++) {
			if (menusubdivs[i] != null) {
				if (menusubdivs[i].id != undefined) {
					WTW.hide(menusubdivs[i].id);
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-hideAdminMenu=" + ex.message);
	}
}

WTWJS.prototype.setQuickEditorGravity = function(value) {
	try {
		if (value == 1) {
			scene.gravity = new BABYLON.Vector3(0, -9.8, 0);
			WTW.camera.applyGravity = true;
			WTW.setCookie("gravityoption", "1", 30);
			WTW.mouseScroll(2);
			if (dGet('wtw_bgravity') != null) {
				dGet('wtw_bgravity').innerHTML = "Gravity<br /><br />ON";
				dGet('wtw_bgravity').onclick = function() { WTW.setQuickEditorGravity(0); };
				dGet('wtw_bgravity').className = "wtw-quickbar";
				dGet('wtw_bgravity').title = "Gravity is On";
				dGet('wtw_bgravity').alt = "Gravity is On";
				if (dGet('wtw_admingravity') != null) {
					dGet('wtw_admingravity').innerHTML = "Gravity ON<!--1-->";
				}
			}
		} else {
			scene.gravity = new BABYLON.Vector3(0, 0, 0);
			WTW.camera.applyGravity = false;
			WTW.setCookie("gravityoption", "0", 30);
			if (dGet('wtw_bgravity') != null) {
				dGet('wtw_bgravity').innerHTML = "Gravity<br /><br />OFF";
				dGet('wtw_bgravity').onclick = function() { WTW.setQuickEditorGravity(1); };
				dGet('wtw_bgravity').className = "wtw-quickbaroff";
				dGet('wtw_bgravity').title = "Gravity is Off";
				dGet('wtw_bgravity').alt = "Gravity is Off";
				if (dGet('wtw_admingravity') != null) {
					dGet('wtw_admingravity').innerHTML = "Gravity OFF<!--1-->";
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setQuickEditorGravity=" + ex.message);
	}
}

WTWJS.prototype.setQuickEditorWall = function(value) {
	try {
		if (value == 1) {
			for (var i = 0; i < scene.meshes.length; i++) {
				var moldname = scene.meshes[i].name;
				if (moldname.indexOf("buildingmolds") > -1 || moldname.indexOf("communitymolds") > -1 || moldname.indexOf("thingmolds") > -1) {
					if (moldname.indexOf("-") > -1) {
						var namepart = moldname.split('-');
						if (namepart[5] != null) {
							var shape = namepart[5];
							if (shape != "floor" && shape != "terrain") {
								var mold = scene.getMeshByID(moldname);
								if (mold != null) {
									mold.checkCollisions = true;
								}
							}
						}
					}
				}
			} 	
			if (dGet('wtw_bwall') != null) {
				dGet('wtw_bwall').innerHTML = "Walls<br /><br />ON";	
				dGet('wtw_bwall').onclick = function() { WTW.setQuickEditorWall(0); };
				dGet('wtw_bwall').className = "wtw-quickbar";
				dGet('wtw_bwall').title = "Wall Collisions are On";
				dGet('wtw_bwall').alt = "Wall Collisions are On";
				if (dGet('wtw_adminwall') != null) {
					dGet('wtw_adminwall').innerHTML = "Wall Collisions ON<!--1-->";	
				}
			}
		} else {
			for (var i = 0; i < scene.meshes.length; i++) {
				var moldname = scene.meshes[i].name;
				if (moldname.indexOf("buildingmolds") > -1 || moldname.indexOf("communitymolds") > -1 || moldname.indexOf("thingmolds") > -1) {
					if (moldname.indexOf("-") > -1) {
						var namepart = moldname.split('-');
						if (namepart[5] != null) {
							var shape = namepart[5];
							if (shape != "floor" && shape != "terrain") {
								var mold = scene.getMeshByID(moldname);
								if (mold != null) {
									mold.checkCollisions = false;
								}
							}
						}
					}
				}
			} 						
			if (dGet('wtw_bwall') != null) {
				dGet('wtw_bwall').innerHTML = "Walls<br /><br />OFF";	
				dGet('wtw_bwall').onclick = function() { WTW.setQuickEditorWall(1); };
				dGet('wtw_bwall').className = "wtw-quickbaroff";
				dGet('wtw_bwall').title = "Wall Collisions are Off";
				dGet('wtw_bwall').alt = "Wall Collisions are Off";
				if (dGet('wtw_adminwall') != null) {
					dGet('wtw_adminwall').innerHTML = "Wall Collisions OFF<!--1-->";	
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setQuickEditorWall=" + ex.message);
	}
}

WTWJS.prototype.setQuickEditorAvatarCamera = function(value) {
	try {
		if (value == 1) {
			WTW.cameraFocus = 1;
			//WTW.camera.inputs.clear();
			WTW.camera.inputs.attached.mouse.detachControl();
			WTW.switchCamera(1);
			if (dGet('wtw_bavatarcamera') != null) {
				dGet('wtw_bavatarcamera').innerHTML = "Avatar<br />Camera<br />ON";
				dGet('wtw_bavatarcamera').onclick = function() { WTW.setQuickEditorAvatarCamera(0); };
				dGet('wtw_bavatarcamera').className = "wtw-quickbar";
				dGet('wtw_bavatarcamera').title = "Camera is Attached to Avatar";
				dGet('wtw_bavatarcamera').alt = "Camera is Attached to Avatar";
				if (dGet('wtw_adminavatarcamera') != null) {
					dGet('wtw_adminavatarcamera').innerHTML = "Avatar Camera ON<!--1-->";
				}
			}
		} else {
			WTW.cameraFocus = 0;
			WTW.camera.inputs.attachInput(WTW.camera.inputs.attached.mouse);
			WTW.camera.viewport = new BABYLON.Viewport(0, 0, 1, 1);
			scene.activeCameras[0] = WTW.camera;
			if (dGet('wtw_bavatarcamera') != null) {
				dGet('wtw_bavatarcamera').innerHTML = "Avatar<br />Camera<br />OFF";
				dGet('wtw_bavatarcamera').onclick = function() { WTW.setQuickEditorAvatarCamera(1); };
				dGet('wtw_bavatarcamera').className = "wtw-quickbaroff";
				dGet('wtw_bavatarcamera').title = "Camera is Detached from Avatar";
				dGet('wtw_bavatarcamera').alt = "Camera is Detached from Avatar";
				if (dGet('wtw_adminavatarcamera') != null) {
					dGet('wtw_adminavatarcamera').innerHTML = "Avatar Camera OFF<!--1-->";
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setQuickEditorAvatarCamera=" + ex.message);
	}
}

WTWJS.prototype.setQuickEditorMerged = function(value) {
	try {
		if (value == 1) {
			WTW.setShowCSG();
			if (dGet('wtw_bmerged') != null) {
				dGet('wtw_bmerged').innerHTML = "Merged<br /><br />ON";
				dGet('wtw_bmerged').onclick = function() { WTW.setQuickEditorMerged(0); };
				dGet('wtw_bmerged').className = "wtw-quickbar";
				dGet('wtw_bmerged').title = "Merged Shapes are Shown";
				dGet('wtw_bmerged').alt = "Merged Shapes are Shown";
				if (dGet('wtw_adminmerged') != null) {
					dGet('wtw_adminmerged').innerHTML = "Merged Molds ON<!--1-->";
				}
			}
		} else {
			WTW.setHideCSG();
			if (dGet('wtw_bmerged') != null) {
				dGet('wtw_bmerged').innerHTML = "Merged<br /><br />OFF";
				dGet('wtw_bmerged').onclick = function() { WTW.setQuickEditorMerged(1); };
				dGet('wtw_bmerged').className = "wtw-quickbaroff";
				dGet('wtw_bmerged').title = "Merged Shapes are Hidden";
				dGet('wtw_bmerged').alt = "Merged Shapes are Hidden";
				if (dGet('wtw_adminmerged') != null) {
					dGet('wtw_adminmerged').innerHTML = "Merged Molds OFF<!--1-->";
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setQuickEditorMerged=" + ex.message);
	}
}

WTWJS.prototype.setQuickEditorZones = function(value) {
	try {
		if (value == 1) {
			for (var i=0;i<WTW.actionZones.length;i++) {
				if (WTW.actionZones[i] != null) {
					WTW.showActionZone(i);
				}
			}
			if (dGet('wtw_bzones') != null) {
				dGet('wtw_bzones').innerHTML = "Zones<br /><br />ON";
				dGet('wtw_bzones').onclick = function() { WTW.setQuickEditorZones(0); };
				dGet('wtw_bzones').className = "wtw-quickbar";
				dGet('wtw_bzones').title = "Action Zones are Shown";
				dGet('wtw_bzones').alt = "Action Zones are Shown";
				if (dGet('wtw_adminzones') != null) {
					dGet('wtw_adminzones').innerHTML = "Action Zones ON<!--1-->";
				}
			}
		} else {
			for (var i=0;i<WTW.actionZones.length;i++) {
				if (WTW.actionZones[i] != null) {
					WTW.hideActionZone(i);
				}
			}
			if (dGet('wtw_bzones') != null) {
				dGet('wtw_bzones').innerHTML = "Zones<br /><br />OFF";
				dGet('wtw_bzones').onclick = function() { WTW.setQuickEditorZones(1); };
				dGet('wtw_bzones').className = "wtw-quickbaroff";
				dGet('wtw_bzones').title = "Action Zones are Hidden";
				dGet('wtw_bzones').alt = "Action Zones are Hidden";
				if (dGet('wtw_adminzones') != null) {
					dGet('wtw_adminzones').innerHTML = "Action Zones OFF<!--1-->";
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setQuickEditorZones=" + ex.message);
	}
}

WTWJS.prototype.setQuickEditorLines = function(value) {
	try {
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
				dGet('wtw_blines').innerHTML = "Lines<br /><br />ON";
				dGet('wtw_blines').onclick = function() { WTW.setQuickEditorLines(0); };
				dGet('wtw_blines').className = "wtw-quickbar";
				dGet('wtw_blines').title = "Alignment Lines are Shown";
				dGet('wtw_blines').alt = "Alignment Lines are Shown";
				if (dGet('wtw_adminlines') != null) {
					dGet('wtw_adminlines').innerHTML = "Alignment Lines ON<!--1-->";
				}
			}
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
				dGet('wtw_blines').innerHTML = "Lines<br /><br />OFF";
				dGet('wtw_blines').onclick = function() { WTW.setQuickEditorLines(1); };
				dGet('wtw_blines').className = "wtw-quickbaroff";
				dGet('wtw_blines').title = "Alignment Lines are Hidden";
				dGet('wtw_blines').alt = "Alignment Lines are Hidden";
				if (dGet('wtw_adminlines') != null) {
					dGet('wtw_adminlines').innerHTML = "Alignment Lines OFF<!--1-->";
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setQuickEditorLines=" + ex.message);
	}
}

WTWJS.prototype.setQuickEditorFocus = function(value) {
	try {
		if (value == 1) {
			if (dGet('wtw_bfocus') != null) {
				dGet('wtw_bfocus').innerHTML = "Focus<br /><br />ON";
				dGet('wtw_bfocus').onclick = function() { WTW.setQuickEditorFocus(0); };
				dGet('wtw_bfocus').className = "wtw-quickbar";
				dGet('wtw_bfocus').title = "Focus Highlight is On";
				dGet('wtw_bfocus').alt = "Focus Highlight is On";
				if (dGet('wtw_adminfocus') != null) {
					dGet('wtw_adminfocus').innerHTML = "Focus ON<!--1-->";
				}
			}
			WTW.setCookie("bfocus","1",30);
		} else {
			/* WTW.resetMoldsOpacity(); */
			if (dGet('wtw_bfocus') != null) {
				dGet('wtw_bfocus').innerHTML = "Focus<br /><br />OFF";
				dGet('wtw_bfocus').onclick = function() { WTW.setQuickEditorFocus(1); };
				dGet('wtw_bfocus').className = "wtw-quickbaroff";
				dGet('wtw_bfocus').title = "Focus Highlight is Off";
				dGet('wtw_bfocus').alt = "Focus Highlight is Off";
				if (dGet('wtw_adminfocus') != null) {
					dGet('wtw_adminfocus').innerHTML = "Focus OFF<!--1-->";
				}
			}
			WTW.setCookie("bfocus","0",30);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setQuickEditorFocus=" + ex.message);
	}
}

WTWJS.prototype.backToEdit = function() {
	try {
		if (buildingid != "") {
			WTW.show('wtw_adminmenu6');
		} else if (communityid != "") {
			WTW.show('wtw_adminmenu26');
		} else if (thingid != "") {
			WTW.show('wtw_adminmenu36');
		} else {
			WTW.show('wtw_adminmenu1');
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-backToEdit=" + ex.message);
	}
}

WTWJS.prototype.backToTools = function() {
	try {
		if (buildingid != "") {
			WTW.show('wtw_adminmenu4');
		} else if (communityid != "") {
			WTW.show('wtw_adminmenu24');
		} else if (thingid != "") {
			WTW.show('wtw_adminmenu34');
		} else {
			WTW.show('wtw_adminmenu1');
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-backToTools=" + ex.message);
	}
}

WTWJS.prototype.getSelectBuildingsList = function() {
	try {
		WTW.hide('wtw_listbuildings');
		WTW.show('wtw_loadingbuildingid');
		dGet("wtw_listbuildings").innerHTML = "";
		WTW.getJSON("/connect/buildings.php", 
			function(response) {
				WTW.buildings = JSON.parse(response);
				if (WTW.buildings != null) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							if (WTW.buildings[i].buildinginfo.buildingid == buildingid) {
								dGet("wtw_listbuildings").innerHTML += "<div id=\"wtw_beditbuilding" + WTW.buildings[i].buildinginfo.buildingid + "\" class='wtw-menulevel2' style='background-color:#2C2CAB;'>" + WTW.decode(WTW.buildings[i].buildinginfo.buildingname) + "</div>\r\n";
							} else {
								dGet("wtw_listbuildings").innerHTML += "<div id=\"wtw_beditbuilding" + WTW.buildings[i].buildinginfo.buildingid + "\" onclick=\"WTW.setCookie('buildingid', '" + WTW.buildings[i].buildinginfo.buildingid + "', 30);	window.location.href='admin.php?buildingid=" + WTW.buildings[i].buildinginfo.buildingid + "';\" class='wtw-menulevel2'>" + WTW.decode(WTW.buildings[i].buildinginfo.buildingname) + "</div>\r\n";
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-getSelectBuildingsList=" + ex.message);
	}		
}

WTWJS.prototype.getSelectCommunitiesList = function() {
	try {
		WTW.hide('wtw_listcommunities');
		WTW.show('wtw_loadingcommunityid');
		dGet("wtw_listcommunities").innerHTML = "";
		WTW.getJSON("/connect/communities.php", 
			function(response) {
				WTW.communities = JSON.parse(response);
				if (WTW.communities != null) {
					for (var i = 0; i < WTW.communities.length; i++) {
						if (WTW.communities[i] != null) {
							if (WTW.communities[i].communityinfo.communityid == communityid) {
								dGet("wtw_listcommunities").innerHTML += "<div id=\"wtw_beditcommunity" + WTW.communities[i].communityinfo.communityid + "\" class='wtw-menulevel2' style='background-color:#2C2CAB;'>" + WTW.decode(WTW.communities[i].communityinfo.communityname) + "</div>\r\n";
							} else {
								dGet("wtw_listcommunities").innerHTML += "<div id=\"wtw_beditcommunity" + WTW.communities[i].communityinfo.communityid + "\" onclick=\"WTW.setCookie('communityid', '" + WTW.communities[i].communityinfo.communityid + "', 30);	window.location.href='admin.php?communityid=" + WTW.communities[i].communityinfo.communityid + "';\" class='wtw-menulevel2'>" + WTW.decode(WTW.communities[i].communityinfo.communityname) + "</div>\r\n";
							}
						}
					}
				}
				window.setTimeout(function() {
					WTW.hide('wtw_loadingcommunityid');
					WTW.show('wtw_listcommunities');
				},500);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-getSelectCommunitiesList=" + ex.message);
	}		
}

WTWJS.prototype.adminMenuQuickKeys = function(keycode) {
//WTW.log("adminMenu=" + WTW.adminMenu);
//WTW.log("keycode=" + keycode);
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
						case 71: // g
							dGet('wtw_admincommunitygravity').click();
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
						case 69: // e
							dGet('wtw_admincommunityaddbuilding').click();
							break;
						case 72: // h
							dGet('wtw_admincommunityaddthing').click();
							break;
						case 76: // l
							dGet('wtw_admincommunitylandscape').click();
							break;
						case 79: // o
							dGet('wtw_admincommunityaddweb').click();
							break;
						case 82: // r
							dGet('wtw_admincommunityrecover').click();
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-adminMenuQuickKeys=" + ex.message);
	}		
}

WTWJS.prototype.adminOpenSubmenuForm = function(obj) {
	try {
		if (obj != null) {
			if (obj.id != undefined) {
				if (dGet(obj.id + 'div') != null) {
					WTW.hideAdminMenu();
					WTW.show(obj.id + 'div');
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-adminOpenSubmenuForm=" + ex.message);
	}		
}

WTWJS.prototype.adminMenuItemSelected = function(obj) {
	try {
		if (obj != null) {
			if (obj.id != undefined) {
				switch (obj.id) {
				/* Dashboard */
					case "wtw_adminmenudashboard":
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
						WTW.show('wtw_adminmenu44');
						break;
					case 'wtw_admincommunitygravity':
						WTW.hideAdminMenu();
						dGet('wtw_tcommgravity').value = WTW.init.gravity;
						if (WTW.init.gravity > 0) {
							scene.gravity = new BABYLON.Vector3(0, -WTW.init.gravity, 0);
							WTW.camera.applyGravity = true;
						} else {
							scene.gravity = new BABYLON.Vector3(0, 0, 0);
							WTW.camera.applyGravity = false;
						}
						WTW.show('wtw_adminmenu45');
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
						WTW.openConfirmation('2');
						break;
					case 'wtw_admincommunityshare':
						WTW.hideAdminMenu();
						dGet('wtw_bsharecommunitytemp').innerHTML = 'Share 3D Community as Template';
						WTW.openShareCommunityForm();
						WTW.show('wtw_adminmenu29');
						break;
					case "wtw_bback25":
					case "wtw_cancel25":
						WTW.submitCommunityForm(-1);
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu24');
						break;
					case "wtw_save25":
						WTW.submitCommunityForm(1);
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu24');
						break;
					case 'wtw_admincommunitylandscape':
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
					case 'wtw_admincommunityaddthing':
						WTW.hideAdminMenu();
						WTW.getThingMoldList()
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
					case 'wtw_admincommunityaddbuilding':
						WTW.hideAdminMenu();
						WTW.openListConnectingGridsForm();
						WTW.show('wtw_adminmenu27');
						break;
					case "wtw_addbuildingtocommunity":
						var zbuildingid = WTW.getDDLValue('wtw_addcommunitybuildingid');
						var zbuildingname = WTW.encode(WTW.getDDLText('wtw_addcommunitybuildingid'));
						WTW.addConnectingGrid('building',zbuildingid, zbuildingname);
						break;
					case "wtw_bback27":
					case "wtw_cancel27":	
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu26');
						break;
					case "wtw_bback29":
					case "wtw_cancel29":	
						WTW.hideAdminMenu();
						WTW.saveShareCommunityForm();
						WTW.show('wtw_adminmenu24');
						break;
					case "wtw_bsharecommunitytemp":
						WTW.saveShareCommunityForm();
						if (dGet('wtw_bsharecommunitytemp').innerHTML.indexOf('Share 3D Community as Template') > -1) {
							WTW.openConfirmation('5');
						}
						break;
					case "wtw_adminlandscapesky":
						WTW.hideAdminMenu();
						WTW.openSkyDomeForm();
						WTW.show('wtw_adminmenu40');
						break;
					case "wtw_adminlandscapeground":
						WTW.hideAdminMenu();
						WTW.openEditGroundSettings();
						WTW.show('wtw_adminmenu41');
						break;
					case "wtw_adminlandscapewater":
						WTW.hideAdminMenu();
						WTW.openCommunityForm(communityid);
						WTW.show('wtw_adminmenu42');
						break;
					case "wtw_adminlandscapegravity":
						WTW.hideAdminMenu();
						dGet('wtw_tcommgravity').value = WTW.init.gravity;
						if (WTW.init.gravity > 0) {
							scene.gravity = new BABYLON.Vector3(0, -WTW.init.gravity, 0);
							WTW.camera.applyGravity = true;
						} else {
							scene.gravity = new BABYLON.Vector3(0, 0, 0);
							WTW.camera.applyGravity = false;
						}
						WTW.show('wtw_adminmenu45');
						break;
					case "wtw_adminlandscapeterrain":
						WTW.hideAdminMenu();
						WTW.openAddGroundTerrain();
						break;
					case "wtw_skysetday":
						WTW.loadSkyScene(0, 1, 0.25, 2, 10, 0.8, 0.005, .5);
						break;
					case "wtw_skysetsunrise":
						WTW.loadSkyScene(-0.5, 1, 0.25, 2, 10, 0.8, 0.005, .5);
						break;
					case "wtw_skysetsunset":
						WTW.loadSkyScene(0.5, 1, 0.25, 2, 10, 0.8, 0.005, .5);
						break;
					case "wtw_skysetnight":
						WTW.loadSkyScene(0.26, 1, 0.10, 0, 2, 0.8, 0.006, .5);
						break;
					case "wtw_bsaveeditskydome":	
						WTW.hideAdminMenu();
						WTW.saveSkyDome();
						WTW.show('wtw_adminmenu30');
						break;
					case "wtw_bback40":
					case "wtw_cancel40":
						WTW.hideAdminMenu();
						WTW.cancelSkyDome();
						WTW.show('wtw_adminmenu30');
						break;
					case "wtw_bsaveground":	
						WTW.hideAdminMenu();
						WTW.saveGround();
						WTW.show('wtw_adminmenu30');
						break;
					case "wtw_bback41":
					case "wtw_cancel41":
						WTW.hideAdminMenu();
						WTW.cancelGround();
						WTW.show('wtw_adminmenu30');
						break;
					case "wtw_bsavewaterdepth":	
						WTW.submitCommunityForm(1);
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu30');
						break;
					case "wtw_savecommgravity":
						WTW.hideAdminMenu();
						if (WTW.isNumeric(dGet('wtw_tcommgravity').value)) {
							if (Number(dGet('wtw_tcommgravity').value) != 0) {
								WTW.init.gravity = Number(dGet('wtw_tcommgravity').value);
								scene.gravity = new BABYLON.Vector3(0, -Number(dGet('wtw_tcommgravity').value), 0);
								WTW.camera.applyGravity = true;
							} else {
								WTW.init.gravity = 0;
								scene.gravity = new BABYLON.Vector3(0, 0, 0);
								WTW.camera.applyGravity = false;
							}
						} else {
							WTW.init.gravity = 0;
							scene.gravity = new BABYLON.Vector3(0, 0, 0);
							WTW.camera.applyGravity = false;
						}
						WTW.saveGravity();
						WTW.show('wtw_adminmenu30');
						break;
					case "wtw_bback45":
					case "wtw_cancel45":
						WTW.hideAdminMenu();
						dGet('wtw_tcommgravity').value = WTW.init.gravity;
						if (WTW.isNumeric(dGet('wtw_tcommgravity').value)) {
							if (Number(dGet('wtw_tcommgravity').value) != 0) {
								WTW.init.gravity = Number(dGet('wtw_tcommgravity').value);
								scene.gravity = new BABYLON.Vector3(0, -Number(dGet('wtw_tcommgravity').value), 0);
								WTW.camera.applyGravity = true;
							} else {
								WTW.init.gravity = 0;
								scene.gravity = new BABYLON.Vector3(0, 0, 0);
								WTW.camera.applyGravity = false;
							}
						} else {
							WTW.init.gravity = 0;
							scene.gravity = new BABYLON.Vector3(0, 0, 0);
							WTW.camera.applyGravity = false;
						}
						WTW.show('wtw_adminmenu30');
						break;
					case "wtw_bback42":
					case "wtw_cancel42":
						WTW.submitCommunityForm(-1);
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu30');
						break;
					case 'wtw_admincommunitysnapshot':	
						WTW.hideAdminMenu();
						dGet('wtw_snapshottitle').innerHTML = "3D Community Snapshot";
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
						WTW.openConfirmation('1');
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
					case "wtw_adminmenubuildsave":
						WTW.hideAdminMenu();
						WTW.submitBuildingForm(1);
						WTW.show('wtw_adminmenu1');
						break;
					case "wtw_bback5":
					case "wtw_cancel5":
						WTW.hideAdminMenu();
						WTW.submitBuildingForm(-1);
						WTW.show('wtw_adminmenu4');
						break;
					case "wtw_bback9":
						WTW.hideAdminMenu();
						WTW.saveShareBuildingForm();
						WTW.show('wtw_adminmenu4');
						break;
					case "wtw_bsharebuildingtemp":
						WTW.saveShareBuildingForm();
						if (dGet('wtw_bsharebuildingtemp').innerHTML.indexOf('Share 3D Building as Template') > -1) {
							WTW.openConfirmation('4');
						}
						break;
					case "wtw_adminmenubuildsharecancel":
						WTW.hideAdminMenu();
						WTW.saveShareBuildingForm();
						WTW.show('wtw_adminmenu4');
						break;
					case 'wtw_adminbuildingsnapshot':	
						WTW.hideAdminMenu();
						dGet('wtw_snapshottitle').innerHTML = "3D Building Snapshot";
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
						WTW.openConfirmation('6');
						break;
					case 'wtw_adminthingshare':
						WTW.hideAdminMenu();
						dGet('wtw_bsharethingtemplate').innerHTML = 'Share 3D Thing as Template';
						WTW.openShareThingForm();
						WTW.show('wtw_adminmenu39');
						break;
					case "wtw_bback35":
						WTW.submitthingForm(-1);
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu34');
						break;
					case "wtw_save35":
						WTW.submitthingForm(1);
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu34');
						break;
					case "wtw_cancel35":
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
					case "wtw_bback39":
						WTW.hideAdminMenu();
						WTW.saveShareThingForm();
						WTW.show('wtw_adminmenu34');
						break;
					case "wtw_bsharethingtemplate":
						WTW.saveShareThingForm();
						if (dGet('wtw_bsharethingtemplate').innerHTML.indexOf('Share 3D Thing as Template') > -1) {
							WTW.openConfirmation('7');
						}
						break;
					case "wtw_cancel39":	
						WTW.hideAdminMenu();
						WTW.saveShareThingForm();
						WTW.show('wtw_adminmenu34');
						break;
					case 'wtw_adminthingsnapshot':	
						WTW.hideAdminMenu();
						dGet('wtw_snapshottitle').innerHTML = "3D Thing Snapshot";
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
						WTW.getThingMoldList()
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
					case "wtw_changevideoposter":
						WTW.openFullPageForm('medialibrary','image','moldvideoposter','wtw_tmoldvideoposterid','wtw_tmoldvideoposterpath','wtw_moldaddvideoposterpreview');
						break;
					case "wtw_removevideoposter":
						dGet('wtw_moldaddvideoposterpreview').alt = "";
						dGet('wtw_moldaddvideoposterpreview').title = "";
						dGet('wtw_moldaddvideoposterpreview').src = "/content/system/images/videoposter.jpg";
						dGet('wtw_tmoldvideoposterpath').value = "/content/system/images/videoposter.jpg";
						dGet('wtw_tmoldvideoposterid').value = "e0u9qw9mbrv0hfls";
						WTW.setNewMold(0);
						break;
					case "wtw_moldchangetexture":
						WTW.openFullPageForm('medialibrary','image','moldtexture','wtw_tmoldtextureid','wtw_tmoldtexturepath','wtw_moldtexturepreview');
						break;
					case "wtw_moldchangebumptexture":
						WTW.openFullPageForm('medialibrary','image','moldbumptexture','wtw_tmoldtexturebumpid','wtw_tmoldtexturebumppath','wtw_moldtexturebumppreview');
						break;
					case "wtw_moldchangeheightmap":
						WTW.openFullPageForm('medialibrary','image','groundheightmap','wtw_tmoldheightmapid','wtw_tmoldheightmappath','wtw_moldheightmappreview');
						break;
					case "wtw_changemixmap":
						WTW.openFullPageForm('medialibrary','image','groundmixmap','wtw_tmoldmixmapid','wtw_tmoldmixmappath','wtw_moldmixmappreview');
						break;
					case "wtw_changeredtexture":
						WTW.openFullPageForm('medialibrary','image','groundredtexture','wtw_tmoldtexturerid','wtw_tmoldtexturerpath','wtw_moldtexturerpreview');
						break;
					case "wtw_changegreentexture":
						WTW.openFullPageForm('medialibrary','image','groundgreentexture','wtw_tmoldtexturegid','wtw_tmoldtexturegpath','wtw_moldtexturegpreview');
						break;
					case "wtw_changebluetexture":
						WTW.openFullPageForm('medialibrary','image','groundbluetexture','wtw_tmoldtexturebid','wtw_tmoldtexturebpath','wtw_moldtexturebpreview');
						break;
					case "wtw_changeredbumptexture":
						WTW.openFullPageForm('medialibrary','image','groundredbumpmap','wtw_tmoldtexturebumprid','wtw_tmoldtexturebumprpath','wtw_moldtexturebumprpreview');
						break;
					case "wtw_changegreenbumptexture":
						WTW.openFullPageForm('medialibrary','image','groundgreenbumpmap','wtw_tmoldtexturebumpgid','wtw_tmoldtexturebumpgpath','wtw_moldtexturebumpgpreview');
						break;
					case "wtw_changebluebumptexture":
						WTW.openFullPageForm('medialibrary','image','groundbluebumpmap','wtw_tmoldtexturebumpbid','wtw_tmoldtexturebumpbpath','wtw_moldtexturebumpbpreview');
						break;
					case "wtw_selectsound":
						WTW.openFullPageForm('medialibrary','audio','moldsound','wtw_tmoldsoundid','wtw_tmoldsoundpath','wtw_soundicon');
						break;
					case 'wtw_createduplicatemold':
						WTW.createDuplicateShape();
						break;
					case "wtw_setstartposition":
						WTW.setStartPosition(communityid, buildingid, thingid);
						break;
					case "wtw_bback11":
					case "wtw_bcancelmold":
						WTW.submitMoldForm(-1);
						WTW.hideAdminMenu();
						WTW.backToEdit();
						break;
					case "wtw_bback14":
					case "wtw_cancel14":
						WTW.submitConnectingGridsForm(-1);
						WTW.hideAdminMenu();
						WTW.backToEdit();
						break;
					case "wtw_bback20":
					case "wtw_cancel20":
						WTW.closeActionZoneForm();
						WTW.hideAdminMenu();
						WTW.backToEdit();
						break;
					case "wtw_bupdatesnapshot":
						if (communityid != '') {
							WTW.snapshot3D(dGet('wtw_tcontentpath').value + '\\uploads\\communities\\' + dGet('wtw_tcommunityid').value + '\\snapshots\\', 'defaultcommunity.png');
						} else if (buildingid != '') {
							WTW.snapshot3D(dGet('wtw_tcontentpath').value + '\\uploads\\buildings\\' + dGet('wtw_tbuildingid').value + '\\snapshots\\', 'defaultbuilding.png');
						} else if (thingid != '') {
							WTW.snapshot3D(dGet('wtw_tcontentpath').value + '\\uploads\\things\\' + dGet('wtw_tthingid').value + '\\snapshots\\', 'defaultthing.png');
						}
						break;
				/* user Admin Items */
					case 'wtw_adminuserlist':
						WTW.openFullPageForm('users','All Users');
						break;
					case 'wtw_adminallplugins':
						WTW.openFullPageForm('plugins','All Plugins');
						break;
				/* Settings Admin Items */
					case 'wtw_adminemailserver':
						WTW.openFullPageForm('settings','Email Server');
						break;
					case 'wtw_adminwebalias':
						WTW.openFullPageForm('settings','Web Aliases');
						break;
				/* Dev Tools Admin Items */
					case "wtw_admingravity":
						if (dGet('wtw_admingravity').innerHTML.indexOf('Gravity ON') > -1) {
							WTW.setQuickEditorGravity(0);
						} else {
							WTW.setQuickEditorGravity(1);
						}
						break;
					case "wtw_adminfocus":
						if (dGet('wtw_adminfocus').innerHTML.indexOf('Focus ON') > -1) {
							WTW.setQuickEditorFocus(0);
						} else {
							WTW.setQuickEditorFocus(1);
						}
						break;
					case "wtw_adminwall":
						if (dGet('wtw_adminwall').innerHTML.indexOf('Wall Collisions ON') > -1) {
							WTW.setQuickEditorWall(0);
						} else {
							WTW.setQuickEditorWall(1);
						}
						break;
					case "wtw_adminavatarcamera":
						if (dGet('wtw_adminavatarcamera').innerHTML.indexOf('Avatar Camera ON') > -1) {
							WTW.setQuickEditorAvatarCamera(0);
						} else {
							WTW.setQuickEditorAvatarCamera(1);
						}
						break;
					case "wtw_adminmerged":
						if (dGet('wtw_adminmerged').innerHTML.indexOf('Merged Molds ON') > -1) {
							WTW.setQuickEditorMerged(0);
						} else {
							WTW.setQuickEditorMerged(1);
						}
						break;
					case "wtw_adminzones":
						if (dGet('wtw_adminzones').innerHTML.indexOf('Action Zones ON') > -1) {
							WTW.setQuickEditorZones(0);
						} else {
							WTW.setQuickEditorZones(1);
						}
						break;
					case "wtw_adminlines":
						if (dGet('wtw_adminlines').innerHTML.indexOf('Alignment Lines ON') > -1) {
							WTW.setQuickEditorLines(0);
						} else {
							WTW.setQuickEditorLines(1);
						}
						break;
					case "wtw_adminaxislabels":
						if (dGet('wtw_adminaxislabels').innerHTML.indexOf('Axis Labels ON') > -1) {
							if (WTW.moveX == undefined || WTW.moveX == null ) {
							} else {
								WTW.moveX.isVisible = false;
								WTW.moveY.isVisible = false;
								WTW.moveZ.isVisible = false;          
							}
							dGet('wtw_adminaxislabels').innerHTML = 'Axis Labels OFF';
						} else {
							if (WTW.moveX == undefined || WTW.moveX == null ) {
							} else {
								WTW.moveX.isVisible = true;
								WTW.moveY.isVisible = true;
								WTW.moveZ.isVisible = true;				
							}
							dGet('wtw_adminaxislabels').innerHTML = 'Axis Labels ON';
						}
						break;
					case "wtw_adminloadedobjects":
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu70');
						break;
					case "wtw_listmeshes":
						WTW.listMeshes();
						break;
					case "wtw_listcgs":
						WTW.listConnectingGrids();
						break;
					case "wtw_listazs":
						WTW.listActionZones();
						break;
					case "wtw_listcommmolds":
						WTW.listCommunityMolds();
						break;
					case "wtw_listbuildmolds":
						WTW.listBuildingMolds();
						break;
					case "wtw_listthingmolds":
						WTW.listThingMolds();
						break;
					case "wtw_listautomations":
						WTW.listAutomations();
						break;
					case "wtw_listloadeduploads":
						WTW.listUploads();
						break;
				/* close and exit Admin Items */
					case "wtw_bback44":
					case "wtw_bback60":
					case "wtw_bback61":
					case "wtw_cancel44":
					case "wtw_cancel60":
					case "wtw_cancel61":
						WTW.hideAdminMenu();
						WTW.backToTools();
						break;
					case "wtw_bback10":
					case "wtw_bback12":
					case "wtw_bback13":
					case "wtw_bback15":
					case "wtw_bback16":
					case "wtw_bback30":
					case "wtw_cancel10":
					case "wtw_cancel12":
					case "wtw_cancel13":
					case "wtw_cancel15":
					case "wtw_cancel16":
					case "wtw_cancel30":	
						WTW.hideAdminMenu();
						WTW.backToEdit();
						break;
					case "wtw_bback4":
					case "wtw_bback6":
					case "wtw_bback69":
					case "wtw_cancel4":
					case 'wtw_cancel6':
					case "wtw_cancel69":
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
					case "wtw_admincloseproject":
						window.location.href = wtw_domainurl + "/admin.php";
						break;
					case "wtw_adminexit":
						window.location.href = wtw_domainurl;
						break;
					default:
						WTW.hideAdminMenu();
						WTW.show('wtw_adminmenu1');
						break;
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-adminMenuItemSelected=" + ex.message);
	}
}

WTWJS.prototype.openColorSelector = function() {
	try {
		var molds = null;
		var moldind = -1;
		if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
			moldind = Number(dGet('wtw_tmoldind').value);
		}
		switch (dGet('wtw_tmoldmoldgroup').value) {
			case "community":
				molds = WTW.communitiesMolds;
				break;
			case "thing":
				molds = WTW.thingMolds;
				break;
			default:
				molds = WTW.buildingMolds;
				break;
		}
		var moldname = dGet('wtw_tmoldmoldgroup').value + "molds-" + dGet('wtw_tmoldind').value + "-" + dGet('wtw_tmoldid').value + "-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "-" + dGet('wtw_tmoldshape').value;
		dGet('wtw_tmoldname').value = moldname;
		var mold = scene.getMeshByID(moldname);
		if (mold != null) {
			try {
				if (mold.material != undefined && mold.material != null) {
					WTW.clearDirectionalTexture(mold);
						if (mold.material.diffuseTexture != undefined) {
							if (mold.material.diffuseTexture != null) {
								mold.material.diffuseTexture.dispose();
								mold.material.diffuseTexture = null;
							}
						}
					mold.material.dispose();
					mold.material = null;
				}
			} catch (ex) {}
			var covering = new BABYLON.StandardMaterial("mat" + moldname, scene);
			if (molds[moldind] != null) {
				covering.specularColor = new BABYLON.Color3(Number(molds[moldind].color.specular.r), Number(molds[moldind].color.specular.g), Number(molds[moldind].color.specular.b));
				covering.emissiveColor = new BABYLON.Color3(Number(molds[moldind].color.emissive.r), Number(molds[moldind].color.emissive.g), Number(molds[moldind].color.emissive.b));
				covering.diffuseColor = new BABYLON.Color3(Number(molds[moldind].color.diffuse.r), Number(molds[moldind].color.diffuse.g), Number(molds[moldind].color.diffuse.b));	
				if (molds[moldind].covering == 'marble') {
					if (molds[moldind].opacity != undefined) {
						if (WTW.isNumeric(molds[moldind].opacity)) {
							opacity = Number(molds[moldind].opacity) / 100;
							if (opacity > 1) {
								opacity = 1;
							} else if (opacity < 0) {
								opacity = 0;
							}
						}
					}
					var max = Math.max(Number(molds[moldind].scaling.x), Number(molds[moldind].scaling.y), Number(molds[moldind].scaling.z));
					var uscale = 1/max;
					var vscale = 1/max;
					if (WTW.isNumeric(molds[moldind].graphics.uscale)) {
						if (Number(molds[moldind].graphics.uscale) > 0) {
							uscale = Number(molds[moldind].graphics.uscale);
						}
					}
					if (WTW.isNumeric(molds[moldind].graphics.vscale)) {
						if (Number(molds[moldind].graphics.vscale) > 0) {
							vscale = Number(molds[moldind].graphics.vscale);
						}
					}
					if (uscale < 1) {
						uscale = 1;
					}
					if (vscale < 1) {
						vscale = 1;
					}
					covering.alpha = opacity;
					var marbleTexture = new BABYLON.MarbleProceduralTexture("matmarbletex" + moldname, 512, scene);
					marbleTexture.numberOfTilesHeight = Number(uscale).toFixed(0);
					marbleTexture.numberOfTilesWidth = Number(vscale).toFixed(0);
					covering.ambientTexture = marbleTexture;
				}
				mold.material = covering;
				dGet('wtw_tspecularcolorr').value = molds[moldind].color.specular.r;
				dGet('wtw_tspecularcolorg').value = molds[moldind].color.specular.g;
				dGet('wtw_tspecularcolorb').value = molds[moldind].color.specular.b;
				dGet('wtw_temissivecolorr').value = molds[moldind].color.emissive.r;
				dGet('wtw_temissivecolorg').value = molds[moldind].color.emissive.g;
				dGet('wtw_temissivecolorb').value = molds[moldind].color.emissive.b;
				dGet('wtw_tdiffusecolorr').value = molds[moldind].color.diffuse.r;
				dGet('wtw_tdiffusecolorg').value = molds[moldind].color.diffuse.g;
				dGet('wtw_tdiffusecolorb').value = molds[moldind].color.diffuse.b;
			} else {
				covering.specularColor = new BABYLON.Color3(1, 1, 1);
				covering.emissiveColor = new BABYLON.Color3(1, 1, 1);
				covering.diffuseColor = new BABYLON.Color3(1, 1, 1);	
				mold.material = covering;
				dGet('wtw_tspecularcolorr').value = 1;
				dGet('wtw_tspecularcolorg').value = 1;
				dGet('wtw_tspecularcolorb').value = 1;
				dGet('wtw_temissivecolorr').value = 1;
				dGet('wtw_temissivecolorg').value = 1;
				dGet('wtw_temissivecolorb').value = 1;
				dGet('wtw_tdiffusecolorr').value = 1;
				dGet('wtw_tdiffusecolorg').value = 1;
				dGet('wtw_tdiffusecolorb').value = 1;
			}
			if (WTW.guiAdminColors == null) {
				WTW.guiAdminColors = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
				var panel = new BABYLON.GUI.StackPanel();
				panel.width = "200px";
				panel.isVertical = true;
				panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
				panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
				WTW.guiAdminColors.addControl(panel);

				var textdiffuse = new BABYLON.GUI.TextBlock();
				textdiffuse.text = "Diffuse color:";
				textdiffuse.height = "30px";
				panel.addControl(textdiffuse);     

				var diffuse = new BABYLON.GUI.ColorPicker();
				diffuse.value = covering.diffuseColor;
				diffuse.height = "150px";
				diffuse.width = "150px";
				diffuse.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
				diffuse.onValueChangedObservable.add(function(value) {
					if (value != null) {
						WTW.setColor(dGet('wtw_tmoldname').value, 'diffuse', value.r, value.g, value.b);
						dGet('wtw_tdiffusecolorr').value = value.r;
						dGet('wtw_tdiffusecolorg').value = value.g;
						dGet('wtw_tdiffusecolorb').value = value.b;
						WTW.pluginsOpenColorSelector(dGet('wtw_tmoldname').value, molds[moldind].shape, 'diffuse');
					}
				});
				panel.addControl(diffuse); 
				
				var textspecular = new BABYLON.GUI.TextBlock();
				textspecular.text = "Specular color:";
				textspecular.height = "30px";
				panel.addControl(textspecular);     

				var specular = new BABYLON.GUI.ColorPicker();
				specular.value = covering.specularColor;
				specular.height = "150px";
				specular.width = "150px";
				specular.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
				specular.onValueChangedObservable.add(function(value) {
					if (value != null) {
						WTW.setColor(dGet('wtw_tmoldname').value, 'specular', value.r, value.g, value.b);
						dGet('wtw_tspecularcolorr').value = value.r;
						dGet('wtw_tspecularcolorg').value = value.g;
						dGet('wtw_tspecularcolorb').value = value.b;
						WTW.pluginsOpenColorSelector(dGet('wtw_tmoldname').value, molds[moldind].shape, 'emissive');
					}
				});
				panel.addControl(specular); 

				var textemissive = new BABYLON.GUI.TextBlock();
				textemissive.text = "Emissive color:";
				textemissive.height = "30px";
				panel.addControl(textemissive);     

				var emissive = new BABYLON.GUI.ColorPicker();
				emissive.value = covering.emissiveColor;
				emissive.height = "150px";
				emissive.width = "150px";
				emissive.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
				emissive.onValueChangedObservable.add(function(value) { 
					if (value != null) {
						WTW.setColor(dGet('wtw_tmoldname').value, 'emissive', value.r, value.g, value.b);
						dGet('wtw_temissivecolorr').value = value.r;
						dGet('wtw_temissivecolorg').value = value.g;
						dGet('wtw_temissivecolorb').value = value.b;
						WTW.pluginsOpenColorSelector(dGet('wtw_tmoldname').value, molds[moldind].shape, 'emissive');
					}
				});
				panel.addControl(emissive);
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openColorSelector=" + ex.message);
	}
}

WTWJS.prototype.setColor = function(moldname, colorgroup, r, g, b) {
	try {
		var covering = scene.getMaterialByID("mat" + moldname);
		if (covering != null) {
			switch (colorgroup) {
				case "diffuse":
					covering.diffuseColor = new BABYLON.Color3(r,g,b);
					break;
				case "specular":
					covering.specularColor = new BABYLON.Color3(r,g,b);
					break;
				case "emissive":
					covering.emissiveColor = new BABYLON.Color3(r,g,b);
					break;
			}
			var mold = scene.getMeshByID(moldname);
			if (mold != null) {
				mold.material = covering;
			}
		}
		var molds = null;
		var moldind = -1;
		if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
			moldind = Number(dGet('wtw_tmoldind').value);
		}
		switch (dGet('wtw_tmoldmoldgroup').value) {
			case "community":
				molds = WTW.communitiesMolds;
				break;
			case "thing":
				molds = WTW.thingMolds;
				break;
			default:
				molds = WTW.buildingMolds;
				break;
		}
		if (molds[moldind] != null) {
			switch (colorgroup) {
				case "diffuse":
					molds[moldind].color.diffuse.r = r;
					molds[moldind].color.diffuse.g = g;
					molds[moldind].color.diffuse.b = b;
					dGet('wtw_tdiffusecolorr').value = r;
					dGet('wtw_tdiffusecolorg').value = g;
					dGet('wtw_tdiffusecolorb').value = b;
					break;
				case "specular":
					molds[moldind].color.specular.r = r;
					molds[moldind].color.specular.g = g;
					molds[moldind].color.specular.b = b;
					dGet('wtw_tspecularcolorr').value = r;
					dGet('wtw_tspecularcolorg').value = g;
					dGet('wtw_tspecularcolorb').value = b;
					break;
				case "emissive":
					molds[moldind].color.emissive.r = r;
					molds[moldind].color.emissive.g = g;
					molds[moldind].color.emissive.b = b;
					dGet('wtw_temissivecolorr').value = r;
					dGet('wtw_temissivecolorg').value = g;
					dGet('wtw_temissivecolorb').value = b;
					break;
			}
		}
		/* WTW.resetMoldsOpacity(); */
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setColor=" + ex.message);
	}
}

WTWJS.prototype.closeColorSelector = function() {
	try {
		if (WTW.guiAdminColors != null) {
			WTW.guiAdminColors.dispose();
			WTW.guiAdminColors = null;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-closeColorSelector=" + ex.message);
	}
}

WTWJS.prototype.changeImage = function(obj, imagepath) {
	try {
		if (obj != null) {
			obj.src = imagepath;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-changeImage=" + ex.message);
	}
}

WTWJS.prototype.openEmailServerSettings = function() {
	try {
		WTW.show('wtw_loadingemailserver');
		WTW.show('wtw_settingspage');
		WTW.show('wtw_emailserversettings');
		WTW.getSettings("smtphost, smtpport, smtplogin, smtppassword", "WTW.loadEmailServerSettings");
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openEmailServerSettings=" + ex.message);
	}
}

WTWJS.prototype.loadEmailServerSettings = function(zsettings, zparameters) {
	try {
		WTW.hide('wtw_loadingemailserver');
		zsetting = JSON.parse(zsettings);
		if (zsetting.smtphost != undefined) {
			dGet('wtw_tsmtphost').value = zsetting.smtphost;					
		}
		if (zsetting.smtpport != undefined) {
			dGet('wtw_tsmtpport').value = zsetting.smtpport;					
		}
		if (zsetting.smtplogin != undefined) {
			dGet('wtw_tsmtplogin').value = zsetting.smtplogin;					
		}
		if (zsetting.smtppassword != undefined) {
			dGet('wtw_tsmtppassword').value = atob(zsetting.smtppassword);					
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-loadEmailServerSettings=" + ex.message);
	}
}

WTWJS.prototype.saveEmailServerSettings = function() {
	try {
		var zsmtphost = dGet('wtw_tsmtphost').value;
		var zsmtpport = dGet('wtw_tsmtpport').value;
		var zsmtplogin = dGet('wtw_tsmtplogin').value;
		var zsmtppassword = btoa(dGet('wtw_tsmtppassword').value);
		
		var zsettings = {
			'smtphost': zsmtphost,
			'smtpport': zsmtpport,
			'smtplogin': zsmtplogin,
			'smtppassword': zsmtppassword
		};
		WTW.saveSettings(zsettings, "WTW.saveEmailServerSettingsComplete");
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-saveEmailServerSettings=" + ex.message);
	}
}

WTWJS.prototype.saveEmailServerSettingsComplete = function(zsuccess) {
	try {
		if (zsuccess == "1" || zsuccess) {
			dGet('wtw_emailservercomplete').innerHTML = "Settings Saved";
			dGet('wtw_emailservercomplete').style.color = "green";
		} else {
			dGet('wtw_emailservercomplete').innerHTML = "Settings Not Saved";
			dGet('wtw_emailservercomplete').style.color = "red";
		}
		window.setTimeout(function() {
			dGet('wtw_emailservercomplete').innerHTML = "";
		},5000);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-saveEmailServerSettingsComplete=" + ex.message);
	}
}

WTWJS.prototype.openWebAliasSettings = function() {
	try {
		WTW.show('wtw_loadingwtw_loadingwebalias');
		WTW.show('wtw_settingspage');
		WTW.show('wtw_webaliassettings');
		dGet('wtw_webaliaslist').innerHTML = "";
		WTW.getJSON("/connect/webaliases.php", 
			function(response) {
				response = JSON.parse(response);
				if (response != null) {
					var zwebaliaslist = "<table class=\"wtw-table\"><tr><td class=\"wtw-tablecolumnheading\"><b>Web URL</b></td><td class=\"wtw-tablecolumnheading\"><b>Domain Name</b></td><td class=\"wtw-tablecolumnheading\"><b>Community</b></td><td class=\"wtw-tablecolumnheading\"><b>Building</b></td><td class=\"wtw-tablecolumnheading\"><b>Thing</b></td><td class=\"wtw-tablecolumnheading\"><b>&nbsp;</b></td></tr>";
					for (var i=0;i<response.length;i++) {
						if (response[i] != null) {
							if (response[i].webaliasid != undefined) {
								var zforcehttps = response[i].forcehttps;
								var zdomainname = response[i].domainname;
								var zcommunitypub = response[i].communitypublishname;
								var zbuildingpub = response[i].buildingpublishname;
								var zthingpub = response[i].thingpublishname;
								var zurl = "http://" + zdomainname;
								if (zforcehttps == "1" || zforcehttps == 1) {
									zurl = "https://" + zdomainname;
								}
								if (zcommunitypub != "") {
									zurl += "/" + zcommunitypub;
									if (zbuildingpub != "") {
										zurl += "/" + zbuildingpub;
										if (zthingpub != "") {
											zurl += "/" + zthingpub;
										}
									} else if (zthingpub != "") {
										zurl += "/things/" + zthingpub;
									}
								} else if (zbuildingpub != "") {
									zurl += "/buildings/" + zbuildingpub;
									if (zthingpub != "") {
										zurl += "/" + zthingpub;
									}
								} else if (zthingpub != "") {
									zurl += "/things/" + zthingpub;
								}
								zwebaliaslist += "<tr><td class=\"wtw-tablecolumns\"><a href='" + zurl + "' target='_blank'>" + zurl + "</a></td><td class=\"wtw-tablecolumns\">" + zdomainname + "</td><td class=\"wtw-tablecolumns\">" + zcommunitypub + "</td><td class=\"wtw-tablecolumns\">" + zbuildingpub + "</td><td class=\"wtw-tablecolumns\">" + zthingpub + "</td><td class=\"wtw-tablecolumns\"><div class='wtw-bluebuttonright' onclick=\"WTW.editWebAlias('" + response[i].webaliasid + "');\">Edit</div></td></tr>";
							}
						}
					}
					zwebaliaslist += "</table>"
					dGet('wtw_webaliaslist').innerHTML = zwebaliaslist;
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openWebAliasSettings=" + ex.message);
	}
}

WTWJS.prototype.editWebAlias = function(zwebaliasid) {
	try {
		WTW.openAliasForm();
		WTW.getJSON("/connect/webalias.php?webaliasid=" + zwebaliasid, 
			function(response) {
				var zcommunityid = "";
				var zbuildingid = "";
				var zthingid = "";
				var zforcehttps = "";
				var zdomainname = "";
				var zcommunitypub = "";
				var zbuildingpub = "";
				var zthingpub = "";
				
				response = JSON.parse(response);
				if (response != null) {
					for (var i=0;i<response.length;i++) {
						if (response[i] != null) {
							if (response[i].webaliasid != undefined) {
								zforcehttps = response[i].forcehttps;
								zdomainname = response[i].domainname;
								zcommunitypub = response[i].communitypublishname;
								zbuildingpub = response[i].buildingpublishname;
								zthingpub = response[i].thingpublishname;
								zcommunityid = response[i].communityid;
								zbuildingid = response[i].buildingid;
								zthingid = response[i].thingid;
							}
						}
					}
				}
				if (zcommunityid != "") {
					WTW.setAliasCommunities(zcommunityid);
				}
				if (zbuildingid != "") {
					WTW.setAliasBuildings(zcommunityid, zbuildingid);
				}
				if (zthingid != "") {
					WTW.setAliasThings(zcommunityid, zbuildingid, zthingid);
				}
				var zpathtype = -1;
				if (zcommunityid != "") {
					if (zbuildingid != "") {
						if (zthingid != "") {
							zpathtype = 5;
						} else {
							zpathtype = 3;
						}
					} else {
						if (zthingid != "") {
							zpathtype = 4;
						} else {
							if (zcommunitypub != "") {
								zpathtype = 2;
							} else {
								zpathtype = 1;
							}
						}
					}
				} else {
					if (zbuildingid != "") {
						if (zthingid != "") {
							zpathtype = 7;
						} else {
							zpathtype = 6;
						}
					} else {
						if (zthingid != "") {
							zpathtype = 8;
						} else {
							zpathtype = 1;
						}
					}
				}
				WTW.setDDLValue('wtw_taliaspathtype', zpathtype);
				WTW.setAliasForm(dGet('wtw_taliaspathtype'));
				if (zforcehttps == "1") {
					dGet('wtw_aliasforcehttps').selectedIndex = 0;
				} else {
					dGet('wtw_aliasforcehttps').selectedIndex = 1;
				}
				dGet("wtw_twebaliasid").value = zwebaliasid;
				dGet("wtw_taliasdomainname").value = zdomainname;
				dGet("wtw_taliascommunitypublishname").value = zcommunitypub;
				dGet("wtw_taliasbuildingpublishname").value = zbuildingpub;
				dGet("wtw_taliasthingpublishname").value = zthingpub;
				WTW.show('wtw_baliasdelete');
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openWebAliasSettings=" + ex.message);
	}
}

WTWJS.prototype.openAliasForm = function() {
	try {
		WTW.clearAliasForm();
		dGet('wtw_aliaslevel1').innerHTML = "Domain Name";
		dGet('wtw_aliaslevel1').style.visibility = "visible";
		dGet('wtw_aliastext1').style.visibility = "visible";
		dGet('wtw_aliasselect1').style.visibility = "visible";
		WTW.setAliasCommunities();
		WTW.show('wtw_addwebaliasdiv');
		WTW.hide('wtw_addwebalias');
		WTW.hide('wtw_baliasdelete');
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openAliasForm=" + ex.message);
	}
}

WTWJS.prototype.clearAliasForm = function() {
	try {
		dGet("wtw_twebaliasid").value = "";
		dGet('wtw_taliasdomainname').value = wtw_domainname;
		dGet('wtw_aliaslevel1').innerHTML = "&nbsp;";
		dGet('wtw_aliaslevel2').innerHTML = "&nbsp;";
		dGet('wtw_aliaslevel3').innerHTML = "&nbsp;";
		dGet('wtw_aliaslevel4').innerHTML = "&nbsp;";
		dGet('wtw_aliaslevel1').style.visibility = "hidden";
		dGet('wtw_aliaslevel2').style.visibility = "hidden";
		dGet('wtw_aliaslevel3').style.visibility = "hidden";
		dGet('wtw_aliaslevel4').style.visibility = "hidden";
		dGet('wtw_aliastext1').style.visibility = "hidden";
		dGet('wtw_aliastext2').style.visibility = "hidden";
		dGet('wtw_aliastext3').style.visibility = "hidden";
		dGet('wtw_aliastext4').style.visibility = "hidden";
		dGet('wtw_taliasdomainname').disabled = false;
		dGet('wtw_taliascommunitypublishname').disabled = false;
		dGet('wtw_taliasbuildingpublishname').disabled = false;
		dGet('wtw_taliasthingpublishname').disabled = false;
		dGet('wtw_taliascommunitypublishname').value = "";
		dGet('wtw_taliasbuildingpublishname').value = "";
		dGet('wtw_taliasthingpublishname').value = "";
		dGet('wtw_aliasselect1').style.visibility = "hidden";
		dGet('wtw_aliasselect2').style.visibility = "hidden";
		dGet('wtw_aliasselect3').style.visibility = "hidden";
		dGet('wtw_aliasselect4').style.visibility = "hidden";
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-clearAliasForm=" + ex.message);
	}
}

WTWJS.prototype.setAliasForm = function(zobj) {
	try {
		var i = zobj.options[zobj.selectedIndex].value;
		WTW.clearAliasForm();
		switch (i) {
			case '1': /* Domain Name */
				dGet('wtw_aliaslevel1').innerHTML = "Domain Name";
				dGet('wtw_aliaslevel1').style.visibility = "visible";
				dGet('wtw_aliastext1').style.visibility = "visible";
				dGet('wtw_aliasselect1').style.visibility = "visible";
				WTW.setAliasCommunities();
				break;
			case '2': /* Community */
				dGet('wtw_aliaslevel1').innerHTML = "Domain Name";
				dGet('wtw_aliaslevel1').style.visibility = "visible";
				dGet('wtw_aliastext1').style.visibility = "visible";
				dGet('wtw_aliaslevel2').innerHTML = "Community";
				dGet('wtw_aliaslevel2').style.visibility = "visible";
				dGet('wtw_aliastext2').style.visibility = "visible";
				dGet('wtw_aliasselect2').style.visibility = "visible";
				WTW.setAliasCommunities();
				break;
			case '3': /* Building in Community */
				dGet('wtw_aliaslevel1').innerHTML = "Domain Name";
				dGet('wtw_aliaslevel1').style.visibility = "visible";
				dGet('wtw_aliastext1').style.visibility = "visible";
				dGet('wtw_aliaslevel2').innerHTML = "Community";
				dGet('wtw_aliaslevel2').style.visibility = "visible";
				dGet('wtw_aliastext2').style.visibility = "visible";
				dGet('wtw_aliasselect2').style.visibility = "visible";
				dGet('wtw_aliaslevel3').innerHTML = "Building";
				dGet('wtw_aliaslevel3').style.visibility = "visible";
				dGet('wtw_aliastext3').style.visibility = "visible";
				dGet('wtw_aliasselect3').style.visibility = "visible";
				WTW.setAliasCommunities();
				WTW.setAliasBuildings();
				break;
			case '4': /* Thing in Community */
				dGet('wtw_aliaslevel1').innerHTML = "Domain Name";
				dGet('wtw_aliaslevel1').style.visibility = "visible";
				dGet('wtw_aliastext1').style.visibility = "visible";
				dGet('wtw_aliaslevel2').innerHTML = "Community";
				dGet('wtw_aliaslevel2').style.visibility = "visible";
				dGet('wtw_aliastext2').style.visibility = "visible";
				dGet('wtw_aliasselect2').style.visibility = "visible";
				dGet('wtw_aliaslevel3').innerHTML = "Building";
				dGet('wtw_aliaslevel3').style.visibility = "visible";
				dGet('wtw_aliastext3').style.visibility = "visible";
				dGet('wtw_taliasbuildingpublishname').value = "things";
				dGet('wtw_taliasbuildingpublishname').disabled = true;
				dGet('wtw_aliaslevel4').innerHTML = "Thing";
				dGet('wtw_aliaslevel4').style.visibility = "visible";
				dGet('wtw_aliastext4').style.visibility = "visible";
				dGet('wtw_aliasselect4').style.visibility = "visible";
				WTW.setAliasCommunities();
				WTW.setAliasThings();
				break;
			case '5': /* Thing in Building in Community */
				dGet('wtw_aliaslevel1').innerHTML = "Domain Name";
				dGet('wtw_aliaslevel1').style.visibility = "visible";
				dGet('wtw_aliastext1').style.visibility = "visible";
				dGet('wtw_aliaslevel2').innerHTML = "Community";
				dGet('wtw_aliaslevel2').style.visibility = "visible";
				dGet('wtw_aliastext2').style.visibility = "visible";
				dGet('wtw_aliasselect2').style.visibility = "visible";
				dGet('wtw_aliaslevel3').innerHTML = "Building";
				dGet('wtw_aliaslevel3').style.visibility = "visible";
				dGet('wtw_aliastext3').style.visibility = "visible";
				dGet('wtw_aliasselect3').style.visibility = "visible";
				dGet('wtw_aliaslevel4').innerHTML = "Thing";
				dGet('wtw_aliaslevel4').style.visibility = "visible";
				dGet('wtw_aliastext4').style.visibility = "visible";
				dGet('wtw_aliasselect4').style.visibility = "visible";
				WTW.setAliasCommunities();
				WTW.setAliasBuildings();
				WTW.setAliasThings();
				break;
			case '6': /* Building */
				dGet('wtw_aliaslevel1').innerHTML = "Domain Name";
				dGet('wtw_aliaslevel1').style.visibility = "visible";
				dGet('wtw_aliastext1').style.visibility = "visible";
				dGet('wtw_aliaslevel2').innerHTML = "&nbsp;";
				dGet('wtw_aliaslevel2').style.visibility = "visible";
				dGet('wtw_aliastext2').style.visibility = "visible";
				dGet('wtw_taliascommunitypublishname').value = "buildings";
				dGet('wtw_taliascommunitypublishname').disabled = true;
				dGet('wtw_aliaslevel3').innerHTML = "Building";
				dGet('wtw_aliaslevel3').style.visibility = "visible";
				dGet('wtw_aliastext3').style.visibility = "visible";
				dGet('wtw_aliasselect3').style.visibility = "visible";
				WTW.setAliasBuildings();
				break;
			case '7': /* Thing in Building */
				dGet('wtw_aliaslevel1').innerHTML = "Domain Name";
				dGet('wtw_aliaslevel1').style.visibility = "visible";
				dGet('wtw_aliastext1').style.visibility = "visible";
				dGet('wtw_aliaslevel2').innerHTML = "&nbsp;";
				dGet('wtw_aliaslevel2').style.visibility = "visible";
				dGet('wtw_aliastext2').style.visibility = "visible";
				dGet('wtw_taliascommunitypublishname').value = "buildings";
				dGet('wtw_taliascommunitypublishname').disabled = true;
				dGet('wtw_aliaslevel3').innerHTML = "Building";
				dGet('wtw_aliaslevel3').style.visibility = "visible";
				dGet('wtw_aliastext3').style.visibility = "visible";
				dGet('wtw_aliasselect3').style.visibility = "visible";
				dGet('wtw_aliaslevel4').innerHTML = "Thing";
				dGet('wtw_aliaslevel4').style.visibility = "visible";
				dGet('wtw_aliastext4').style.visibility = "visible";
				dGet('wtw_aliasselect4').style.visibility = "visible";
				WTW.setAliasBuildings();
				WTW.setAliasThings();
				break;
			case '8': /* Thing */
				dGet('wtw_aliaslevel1').innerHTML = "Domain Name";
				dGet('wtw_aliaslevel1').style.visibility = "visible";
				dGet('wtw_aliastext1').style.visibility = "visible";
				dGet('wtw_aliaslevel2').innerHTML = "&nbsp;";
				dGet('wtw_aliaslevel2').style.visibility = "visible";
				dGet('wtw_aliastext2').style.visibility = "visible";
				dGet('wtw_taliascommunitypublishname').value = "things";
				dGet('wtw_taliascommunitypublishname').disabled = true;
				dGet('wtw_aliaslevel4').innerHTML = "Thing";
				dGet('wtw_aliaslevel4').style.visibility = "visible";
				dGet('wtw_aliastext4').style.visibility = "visible";
				dGet('wtw_aliasselect4').style.visibility = "visible";
				WTW.setAliasThings();
				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setAliasForm=" + ex.message);
	}
}

WTWJS.prototype.setAliasCommunities = function() {
	try {
		WTW.clearOptions("wtw_aliasdomaincommunityid");
		WTW.clearOptions("wtw_aliascommunityid");
		WTW.getJSON("/connect/communitynames.php", 
			function(response) {
				response = JSON.parse(response);
				if (response != null) {
					for (var i=0;i<response.length;i++) {
						if (response[i] != null) {
							if (response[i].communityid != undefined && response[i].communityname != undefined) {
								var option = document.createElement("option");
								option.text = response[i].communityname;
								option.value = response[i].communityid;
								if (i == 0) {
									option.selected = true;
								}
								var option2 = option.cloneNode(true);
								dGet("wtw_aliasdomaincommunityid").add(option);
								dGet("wtw_aliascommunityid").add(option2);
							}
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setAliasCommunities=" + ex.message);
	}
}

WTWJS.prototype.setAliasBuildings = function() {
	try {
		WTW.clearOptions("wtw_aliasbuildingid");
		WTW.getJSON("/connect/buildingnames.php", 
			function(response) {
				response = JSON.parse(response);
				if (response != null) {
					for (var i=0;i<response.length;i++) {
						if (response[i] != null) {
							if (response[i].buildingid != undefined && response[i].buildingname != undefined) {
								var option = document.createElement("option");
								option.text = response[i].buildingname;
								option.value = response[i].buildingid;
								if (i == 0) {
									option.selected = true;
								}
								dGet("wtw_aliasbuildingid").add(option);
							}
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setAliasBuildings=" + ex.message);
	}
}

WTWJS.prototype.setAliasThings = function() {
	try {
		WTW.clearOptions("wtw_aliasthingid");
		WTW.getJSON("/connect/thingnames.php", 
			function(response) {
				response = JSON.parse(response);
				if (response != null) {
					for (var i=0;i<response.length;i++) {
						if (response[i] != null) {
							if (response[i].thingid != undefined && response[i].thingname != undefined) {
								var option = document.createElement("option");
								option.text = response[i].thingname;
								option.value = response[i].thingid;
								if (i == 0) {
									option.selected = true;
								}
								dGet("wtw_aliasthingid").add(option);
							}
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-setAliasThings=" + ex.message);
	}
}

WTWJS.prototype.saveAliasForm = function(w) {
	try {
		var zwebaliasid = dGet('wtw_twebaliasid').value;
		switch (w) {
			case 1: /* save */
				var zdomainname = dGet('wtw_taliasdomainname').value;
				var zcommunitypublishname = dGet('wtw_taliascommunitypublishname').value;
				var zbuildingpublishname = dGet('wtw_taliasbuildingpublishname').value;
				var zthingpublishname = dGet('wtw_taliasthingpublishname').value;
				var zaliascommunityid = "";
				var zaliasbuildingid = "";
				var zaliasthingid = "";
				var zforcehttps = dGet('wtw_aliasforcehttps').options[dGet('wtw_aliasforcehttps').selectedIndex].text;
				var i = dGet('wtw_taliaspathtype').options[dGet('wtw_taliaspathtype').selectedIndex].value;
				if (zforcehttps == "https://") {
					zforcehttps = "1";
				} else {
					zforcehttps = "0";
				}
				switch (i) {
					case '1': /* Domain Name */
						zaliascommunityid = dGet('wtw_aliasdomaincommunityid').options[dGet('wtw_aliasdomaincommunityid').selectedIndex].value;
						break;
					case '2': /* Community */
						zaliascommunityid = dGet('wtw_aliascommunityid').options[dGet('wtw_aliascommunityid').selectedIndex].value;
						break;
					case '3': /* Building in Community */
						zaliascommunityid = dGet('wtw_aliascommunityid').options[dGet('wtw_aliascommunityid').selectedIndex].value;
						zaliasbuildingid = dGet('wtw_aliasbuildingid').options[dGet('wtw_aliasbuildingid').selectedIndex].value;
						break;
					case '4': /* Thing in Community */
						zbuildingpublishname = "";
						zaliascommunityid = dGet('wtw_aliascommunityid').options[dGet('wtw_aliascommunityid').selectedIndex].value;
						zaliasthingid = dGet('wtw_aliasthingid').options[dGet('wtw_aliasthingid').selectedIndex].value
						break;
					case '5': /* Thing in Building in Community */
						zaliascommunityid = dGet('wtw_aliascommunityid').options[dGet('wtw_aliascommunityid').selectedIndex].value;
						zaliasbuildingid = dGet('wtw_aliasbuildingid').options[dGet('wtw_aliasbuildingid').selectedIndex].value;
						zaliasthingid = dGet('wtw_aliasthingid').options[dGet('wtw_aliasthingid').selectedIndex].value
						break;
					case '6': /* Building */
						zcommunitypublishname = "";
						zaliasbuildingid = dGet('wtw_aliasbuildingid').options[dGet('wtw_aliasbuildingid').selectedIndex].value;
						break;
					case '7': /* Thing in Building */
						zcommunitypublishname = "";
						zaliasbuildingid = dGet('wtw_aliasbuildingid').options[dGet('wtw_aliasbuildingid').selectedIndex].value;
						zaliasthingid = dGet('wtw_aliasthingid').options[dGet('wtw_aliasthingid').selectedIndex].value
						break;
					case '8': /* Thing */
						zcommunitypublishname = "";
						zbuildingpublishname = "";
						zaliasthingid = dGet('wtw_aliasthingid').options[dGet('wtw_aliasthingid').selectedIndex].value
						break;
				}
				var zrequest = {
					'webaliasid': zwebaliasid,
					'domainname': zdomainname,
					'communitypublishname': zcommunitypublishname,
					'buildingpublishname': zbuildingpublishname,
					'thingpublishname': zthingpublishname,
					'communityid': zaliascommunityid,
					'buildingid': zaliasbuildingid,
					'thingid': zaliasthingid,
					'forcehttps': zforcehttps
				}
				/* function for after iframe loads */
				var onload = function(ipage) {
					ipage.getElementById('wtw_twebaliasid').value = zrequest.webaliasid;
					ipage.getElementById('wtw_tdomainname').value = zrequest.domainname;
					ipage.getElementById('wtw_tcommunitypublishname').value = zrequest.communitypublishname;
					ipage.getElementById('wtw_tbuildingpublishname').value = zrequest.buildingpublishname;
					ipage.getElementById('wtw_tthingpublishname').value = zrequest.thingpublishname;
					ipage.getElementById('wtw_tcommunityid').value = zrequest.communityid;
					ipage.getElementById('wtw_tbuildingid').value = zrequest.buildingid;
					ipage.getElementById('wtw_tthingid').value = zrequest.thingid;
					ipage.getElementById('wtw_tforcehttps').value = zrequest.forcehttps;
					ipage.getElementById('wtw_bsavewebalias').click();
				}
				/* iframe src, onload function */
				var iframe = WTW.createIFrame('/core/iframes/uploads.php', onload);
				break;
			case -1: /* cancel */
				break;
			case 0: /* delete */
				var zrequest = {
					'webaliasid': zwebaliasid
				}
				/* function for after iframe loads */
				var onload = function(ipage) {
					ipage.getElementById('wtw_twebaliasid').value = zrequest.webaliasid;
					ipage.getElementById('wtw_bdeletewebalias').click();
				}
				/* iframe src, onload function */
				var iframe = WTW.createIFrame('/core/iframes/uploads.php', onload);
				break;
		}
		WTW.clearAliasForm();
		WTW.hide('wtw_addwebaliasdiv');
		WTW.show('wtw_addwebalias');
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-saveAliasForm=" + ex.message);
	}
}

WTWJS.prototype.adminOpenSubmenu = function(zobj) {
	try {
		WTW.hide('wtw_fullpageform');
		var zobjid = zobj.id+'div';
		var menusubdivs = document.getElementsByClassName('wtw-adminmenudiv');
		for (var i=0;i<menusubdivs.length;i++) {
			if (menusubdivs[i] != null) {
				if (menusubdivs[i].id != undefined) {
					if (menusubdivs[i].id != zobjid) {
						WTW.hide(menusubdivs[i].id);
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
		WTW.log("core-scripts-admin-wtw_admineditor.js-adminOpenSubmenu=" + ex.message);
	}
}

WTWJS.prototype.openAllPlugins = function(zpluginname, zactive) {
	try {
		WTW.show('wtw_pluginspage');
		WTW.show('wtw_loadingplugins');
		WTW.hide('wtw_allplugins');
		WTW.hide('wtw_pluginslist');
		dGet('wtw_pluginslist').innerHTML = "";
		
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tpluginname').value = zpluginname;
			ipage.getElementById('wtw_tactive').value = zactive;
			ipage.getElementById('wtw_bgetallplugins').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/pluginloader.php', onload);
		
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openAllPlugins=" + ex.message);
	}
}

WTWJS.prototype.openAllPluginsComplete = function(zresponse, zpluginname, zactive) {
	try {
		var zpluginslist = "";
		zresponse = JSON.parse(zresponse);
		if (zresponse != null) {
			zpluginslist += "<table class=\"wtw-table\"><tr>";
			zpluginslist += "<td class=\"wtw-tablecolumnheading\">Plugin Name</td>";
			zpluginslist += "<td class=\"wtw-tablecolumnheading\">Details</td>";
			zpluginslist += "<td class=\"wtw-tablecolumnheading\">&nbsp;</td>";
			zpluginslist += "</tr>";
			for (var i=0;i<zresponse.length;i++) {
				if (zresponse[i] != null) {
					if (zresponse[i].pluginname != undefined) {
						var zpluginclass = "wtw-deactive";
						var ztdclass = "wtw-tddeactive";
						if (zresponse[i].active == "1") {
							zpluginclass = "wtw-active";
							ztdclass = "wtw-tdactive";
						}
						zpluginslist += "<tr><td class=\"wtw-tablecolumns " + ztdclass + "\"><span class='" + zpluginclass + "'>" + zresponse[i].pluginname + "</span><br />Version: " + zresponse[i].version + "</td>";
						zpluginslist += "<td class=\"wtw-tablecolumns " + ztdclass + "\"><span class='" + zpluginclass + "'>" + zresponse[i].title + "</span> : " + zresponse[i].author + "<br />" + zresponse[i].description + "<br /></td>";
						zpluginslist += "<td class=\"wtw-tablecolumns " + ztdclass + "\">";
						if (zresponse[i].active == "1") {
							zpluginslist += "<div id='activate" + zresponse[i].pluginname + "' class='wtw-bluebuttonright' onclick=\"WTW.activatePlugin('" + zresponse[i].pluginname + "',0);\" alt=\"Click to Deactivate\" title=\"Click to Deactivate\">Activated</div>";
						} else {
							zpluginslist += "<div id='activate" + zresponse[i].pluginname + "' class='wtw-yellowbuttonright' onclick=\"WTW.activatePlugin('" + zresponse[i].pluginname + "',1);\" alt=\"Click to Activate\" title=\"Click to Activate\">Deactivated</div>";
						}
						zpluginslist += "</td></tr>";
					}
				}
			}
			zpluginslist += "</table>";
		}
		dGet("wtw_pluginslist").innerHTML = zpluginslist;
		WTW.hide('wtw_loadingplugins');
		WTW.show('wtw_pluginslist');
		WTW.show('wtw_allplugins');
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openAllPluginsComplete=" + ex.message);
	}
}

WTWJS.prototype.activatePlugin = function(zpluginname, zactive) {
	try {
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tpluginname').value = zpluginname;
			ipage.getElementById('wtw_tactive').value = zactive;
			ipage.getElementById('wtw_bactivateplugin').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/pluginloader.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-activatePlugin=" + ex.message);
	}
}

WTWJS.prototype.activatePluginComplete = function() {
	try {
		window.location.href="/admin.php?showupdates=2&communityid=" + communityid + "&buildingid=" + buildingid + "&thingid=" + thingid;
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-activatePluginComplete=" + ex.message);
	}
}

WTWJS.prototype.checkForUpdates = function(zshow) {
	try {
		switch (zshow) {
			case "1":
				WTW.show('wtw_loadingupdates');
				WTW.hide('wtw_updatelist');
				WTW.hide('wtw_updatepluginlist');
				dGet('wtw_updatelist').innerHTML = "";
				break;
			case "2":
				WTW.show('wtw_pluginspage');
				WTW.show('wtw_loadingplugins');
				WTW.hide('wtw_allplugins');
				WTW.hide('wtw_pluginslist');
				dGet('wtw_pluginslist').innerHTML = "";
				break;
			default:
				zshow = "0";
				break;
		}
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tshow').value = zshow;
			ipage.getElementById('wtw_bgetplugininfo').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/pluginloader.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-checkForUpdates=" + ex.message);
	}
}

WTWJS.prototype.getPluginInfoComplete = function(zmyplugins, zshow) {
	try {
		zplugins = '';
		zmyplugins = JSON.parse(zmyplugins);
		zmyplugins[zmyplugins.length] = {
			'pluginname' : 'walktheweb',
			'version' : wtw_version,
			'latestversion' : wtw_version,
			'title' : 'WalkTheWeb',
			'author' : 'Aaron Dishno Ed.D.',
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
						zplugins += zmyplugins[i].pluginname.toLowerCase() + ",";
					}
				}
			}
		}
		WTW.getJSON("https://3dnet.walktheweb.com/connect/checkforupdates.php?pluginnames=" + zplugins, 
			function(zupdateinfo) {
				zupdateinfo = JSON.parse(zupdateinfo);
				WTW.checkForUpdatesComplete(zmyplugins, zupdateinfo, zshow);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-getPluginInfoComplete=" + ex.message);
	}
}

WTWJS.prototype.checkForUpdatesComplete = function(zmyplugins, zupdateinfo, zshow) {
	try {
		/* compare and set updates for plugins */
		if (zmyplugins != null) {
			for (var i=0;i<zmyplugins.length;i++) {
				if (zmyplugins[i] != null) {
					if (zmyplugins[i].pluginname != undefined && zmyplugins[i].version != undefined) {
						if (zupdateinfo != null) {				
							for (var j=0;j<zupdateinfo.length;j++) {
								if (zupdateinfo[j] != null) {
									if (zupdateinfo[j].pluginname != undefined && zupdateinfo[j].version != undefined) {
										if (zmyplugins[i].pluginname.toLowerCase() == zupdateinfo[j].pluginname.toLowerCase()) {
											zmyplugins[i].latestversion = zupdateinfo[j].version;
											zmyplugins[i].updatedate = zupdateinfo[j].updatedate;
											zmyplugins[i].updateurl = zupdateinfo[j].updateurl;
											zmyplugins[i].updateid = zupdateinfo[j].updateid;
										}
									}
								}
							}						
						}			
					}
				}
			}
		}
		var zupdates = 0;
		var zupdatewtw = 0;
		var zupdateslist = "<div class=\"wtw-dashboardboxleft\">";
		var zpluginslist = "";
		if (zmyplugins != null) {
			if (zmyplugins.length > 0) {
				if (zshow == "1") {
					zpluginslist += "<div class=\"wtw-dashboardboxleftfull\">";
					zpluginslist += "<div class=\"wtw-dashboardboxtitle\">Plugins: Updates Available!</div><div class=\"wtw-dashboardbox\">";
				}
				zpluginslist += "<table class=\"wtw-table\"><tr>";
				zpluginslist += "<td class=\"wtw-tablecolumnheading\">Plugin Name</td>";
				zpluginslist += "<td class=\"wtw-tablecolumnheading\">Details</td>";
				zpluginslist += "<td class=\"wtw-tablecolumnheading\">&nbsp;</td>";
				zpluginslist += "</tr>";
				for (var i=0;i < zmyplugins.length;i++) {
					if (zmyplugins[i] != null) {
						if (zmyplugins[i].pluginname != undefined && zmyplugins[i].version != undefined && zmyplugins[i].latestversion != undefined) {
							if (zmyplugins[i].pluginname == "walktheweb") {
								var updatedate = new Date(zmyplugins[i].updatedate);
								var datestring = (updatedate.getMonth()+1) + "/" + updatedate.getDate() + "/" + updatedate.getFullYear();
								if (zmyplugins[i].latestversion == wtw_version) {
									zupdateslist += "<div class=\"wtw-dashboardboxtitle\">WalkTheWeb is up to date!</div><div class=\"wtw-dashboardbox\"><b>Your Version:</b><hr />";
									zupdateslist += "App Name=" + zmyplugins[i].pluginname + "<br />";
									zupdateslist += "App Version=" + zmyplugins[i].latestversion + "<br />";
									zupdateslist += "Last Update=" + datestring + "<br />";
								} else {
									var versiondate = new Date(wtw_versiondate);
									var versiondatestring = (versiondate.getMonth()+1) + "/" + versiondate.getDate() + "/" + versiondate.getFullYear();
									zupdateslist += "<div class=\"wtw-dashboardboxtitle\">WalkTheWeb has an update!</div><div class=\"wtw-dashboardbox\">Your Version: " + wtw_version + " (" + versiondatestring + ")<br />";
									zupdateslist += "Last Update=" + datestring + "<br /><br />";
									zupdateslist += "<b>New Version Available:</b><hr />";
									zupdateslist += "App Name=" + zmyplugins[i].pluginname + "<br />";
									zupdateslist += "App Version=" + zmyplugins[i].latestversion + "<br />";
									zupdatewtw += 1;
								}
								zupdateslist += "<div id=\"wtw_loadingupdating\" class=\"wtw-loadingnotice\">Updating...</div>";
								if (zmyplugins[i].latestversion != wtw_version) {
									zupdateslist += "<div class=\"wtw-greenmenubutton\" onclick=\"WTW.updateWalkTheWeb('" + zmyplugins[i].pluginname + "','" + zmyplugins[i].version + "','" + datestring + "','" + zmyplugins[i].updateurl + "');\">Update Now!</div>";
									WTW.getVersionDetails(zmyplugins[i].updateid);
								}
								zupdateslist += "</div>";
							} else {
								if (zmyplugins[i].version != zmyplugins[i].latestversion || zshow == "2") {
									var zpluginclass = "wtw-deactive";
									var ztdclass = "wtw-tddeactive";
									if (zmyplugins[i].active == "1") {
										zpluginclass = "wtw-active";
										ztdclass = "wtw-tdactive";
									}
									zpluginslist += "<tr><td class=\"wtw-tablecolumns " + ztdclass + "\">";
									if (zmyplugins[i].version != zmyplugins[i].latestversion) {
										zpluginslist += "<div id='updateplugin" + zmyplugins[i].pluginname + "' class='wtw-greenbuttonleft' onclick=\"WTW.updatePlugin('" + zmyplugins[i].pluginname + "','" + zmyplugins[i].version + "','" + zmyplugins[i].updatedate + "','" + zmyplugins[i].updateurl + "','" + zshow + "');\">Update Now!</div>";
										zupdates += 1;
									}
									zpluginslist += " <span class='" + zpluginclass + "'>" + zmyplugins[i].pluginname + "</span><br />Version: " + zmyplugins[i].version + "</td>";
									zpluginslist += "<td class=\"wtw-tablecolumns " + ztdclass + "\"><span class='" + zpluginclass + "'>" + zmyplugins[i].title + "</span> : " + zmyplugins[i].author + "<br />" + zmyplugins[i].description + "<br /></td>";
									zpluginslist += "<td class=\"wtw-tablecolumns " + ztdclass + "\">";
									if (zmyplugins[i].active == "1") {
										zpluginslist += "<div id='activate" + zmyplugins[i].pluginname + "' class='wtw-bluebuttonright' onclick=\"WTW.activatePlugin('" + zmyplugins[i].pluginname + "',0);\" alt=\"Click to Deactivate\" title=\"Click to Deactivate\">Activated</div>";
									} else {
										zpluginslist += "<div id='activate" + zmyplugins[i].pluginname + "' class='wtw-yellowbuttonright' onclick=\"WTW.activatePlugin('" + zmyplugins[i].pluginname + "',1);\" alt=\"Click to Activate\" title=\"Click to Activate\">Deactivated</div>";
									}
									zpluginslist += "</td></tr>";
								}
							}
						}
					}
				}
				zpluginslist += "</table></div>";
				if (zshow == "1") {
					zpluginslist += "</div></div>";
				}
			}
		}
		zupdateslist += "</div>";
		switch (zshow) {
			case "1":
				dGet('wtw_updatelist').innerHTML = zupdateslist;
				dGet('wtw_updatepluginlist').innerHTML = zpluginslist;
				WTW.hide('wtw_loadingupdating');
				WTW.hide('wtw_loadingupdates');
				WTW.show('wtw_updatelist');
				if (zupdates > 0) {
					WTW.show('wtw_updatepluginlist');
				}
				break;
			case "2":
				dGet("wtw_pluginslist").innerHTML = zpluginslist;
				WTW.hide('wtw_loadingplugins');
				WTW.show('wtw_pluginslist');
				WTW.show('wtw_allplugins');
				break;
		}
		if (zupdates > 0 || zupdatewtw > 0) {
			dGet('wtw_admindashboardbadge').innerHTML = (zupdates + zupdatewtw);
			dGet('wtw_adminmenuupdatesbadge').innerHTML = (zupdates + zupdatewtw);
			WTW.showInline('wtw_admindashboardbadge');
			WTW.showInline('wtw_adminmenuupdatesbadge');
		}
		if (zupdates > 0) {
			dGet('wtw_adminpluginsbadge').innerHTML = zupdates;
			dGet('wtw_adminallpluginsbadge').innerHTML = zupdates;
			WTW.showInline('wtw_adminpluginsbadge');
			WTW.showInline('wtw_adminallpluginsbadge');
		}
		dGet('wtw_updatespagescroll').style.height = (WTW.sizeY - 160) + 'px';
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-checkForUpdatesComplete=" + ex.message);
	}
}

WTWJS.prototype.getVersionDetails = function(zupdateid) {
	try {
		dGet('wtw_updatedetailslist').innerHTML = "";
		WTW.getJSON("https://3dnet.walktheweb.com/connect/versiondetails.php?updateid=" + zupdateid, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse[0] != null) {
				var zupdatedetailslist = "<div class=\"wtw-dashboardboxleftfull\">";
				zupdatedetailslist += "<div class=\"wtw-dashboardboxtitle\">WalkTheWeb Update <b>" + zresponse[0]["version"] + "</b> Details</div><div class=\"wtw-dashboardbox\">Update Details: <br /><ul>";
				for (var i=0; i < zresponse.length;i++) {
					if (zresponse[i] != null) {
						zupdatedetailslist += "<li class='wtw-normalwrap'><b>" + zresponse[i].updatetitle + "</b> - " + zresponse[i].updateby + "<br /><div style='margin-left:20px;margin-bottom:10px;'>" + zresponse[i].updatedetails + "</div></li>";
					}
				}
				zupdatedetailslist += "</ul></div></div>";
				dGet('wtw_updatedetailslist').innerHTML = zupdatedetailslist;
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-getVersionDetails=" + ex.message);
	}
}

WTWJS.prototype.updatePlugin = function(zpluginname, zversion, zupdatedate, zupdateurl, zshow) {
	try {
		if (dGet('updateplugin' + zpluginname) != null) {
			dGet('updateplugin' + zpluginname).innerHTML = "Updating";
		}
		var zrequest = {
			'pluginname':zpluginname,
			'version':zversion,
			'updatedate':zupdatedate,
			'updateurl':zupdateurl,
			'show':zshow
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tpluginname').value = zrequest.pluginname;
			ipage.getElementById('wtw_tversion').value = zrequest.version;
			ipage.getElementById('wtw_tupdatedate').value = zrequest.updatedate;
			ipage.getElementById('wtw_tupdateurl').value = zrequest.updateurl;
			ipage.getElementById('wtw_tshow').value = zrequest.show;
			ipage.getElementById('wtw_bgetpluginupdate').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/pluginloader.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-updatePlugin=" + ex.message);
	}
}

WTWJS.prototype.updatePluginComplete = function(zpluginname, zversion, zupdatedate, zupdateurl, zsuccess, zshow) {
	try {
		window.location.href = "/admin.php?showupdates=" + zshow + "&communityid=" + communityid + "&buildingid=" + buildingid + "&thingid=" + thingid;
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-updatePluginComplete=" + ex.message);
	}
}

WTWJS.prototype.getPluginLatestVersion = function(zpluginname) {
	var zversion = "";
	try {
		WTW.getJSON("https://3dnet.walktheweb.com/connect/versioncheck.php?pluginname=" + zpluginname, 
			function(response) {
				response = JSON.parse(response);
				var zupdates = 0;
				if (response != null) {
					for (var i=0;i<response.length;i++) {
						if (response[i].version != undefined) {
							zversion = response[i].version;
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-getPluginLatestVersion=" + ex.message);
	}
	return zversion;
}

WTWJS.prototype.updateWalkTheWeb = function(zpluginname, zversion, zupdatedate, zupdateurl) {
	try {
		var zupdatesloading = "<div class=\"wtw-dashboardboxleft\">";
		zupdatesloading += "<div class=\"wtw-dashboardboxtitle\">WalkTheWeb is up to date!</div><div class=\"wtw-dashboardbox\"><b>Your Version:</b><hr />";
		zupdatesloading += "<div id=\"wtw_loadingupdating\" class=\"wtw-loadingnotice\">Updating...</div>";
		zupdatesloading += "<br /><br /><br /></div></div>";
		dGet('wtw_updatelist').innerHTML = zupdatesloading;
		WTW.show('wtw_loadingupdating');
		WTW.show('wtw_updatelist');
		var zrequest = {
			'pluginname':zpluginname,
			'version':zversion,
			'updatedate':zupdatedate,
			'updateurl':zupdateurl
		};
		/* function for after iframe loads */
		var onload = function(ipage) {
			ipage.getElementById('wtw_tpluginname').value = zrequest.pluginname;
			ipage.getElementById('wtw_tversion').value = zrequest.version;
			ipage.getElementById('wtw_tupdatedate').value = zrequest.updatedate;
			ipage.getElementById('wtw_tupdateurl').value = zrequest.updateurl;
			ipage.getElementById('wtw_bgetupdate').click();
		}
		/* iframe src, onload function */
		var iframe = WTW.createIFrame('/core/iframes/pluginloader.php', onload);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-updateWalkTheWeb=" + ex.message);
	}
}

WTWJS.prototype.updateWalkTheWebComplete = function(zpluginname, zversion, zupdatedate, zupdateurl, zsuccess) {
	try {
		var zupdatelist = "<div class=\"wtw-dashboardboxleft\">";
		if (zsuccess == "1" || zsuccess == true) {
			window.location.href = "/admin.php?showupdates=1";
		} else {
			zupdatelist += "<div class=\"wtw-dashboardboxtitle\">WalkTheWeb could not Update!</div><div class=\"wtw-dashboardbox\">Use the following steps:<hr />";
			zupdatelist += "1. Download the file.<br />";
			zupdatelist += "2. Unzip the files.<br />";
			if (zpluginname.toLowerCase() == "walktheweb") {
				zupdatelist += "3. Copy the files into the <b>Root</b> of your site for WalkTheWeb Core Updates.<br />";
			} else {
				zupdatelist += "3. Copy the files into the <b>Content/Plugins</b> folder of your site.<br />";
			}
			zupdatelist += "4. Overwrite the existing files.<br />";
			zupdatelist += "<div class=\"wtw-greenmenubutton\" onclick=\"window.location.href='" + zupdateurl + "';\">Download and Update Manually</div>";
			zupdatelist += "</div></div>";
			dGet('wtw_updatelist').innerHTML = zupdatelist;
		}
		WTW.show('wtw_updatelist');
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-updateWalkTheWebComplete=" + ex.message);
	}
}

WTWJS.prototype.openAllUsers = function() {
	try {
		dGet('wtw_alluserstitle').innerHTML = "<div id='wtw_adduserbutton' class='wtw-greenbuttonright' onclick=\"WTW.addUser();\">Add New</div>All Users";
		WTW.show('wtw_userspage');
		WTW.show('wtw_loadingusers');
		WTW.hide('wtw_allusers');
		WTW.hide('wtw_userlist');
		WTW.hide('wtw_userinfo');
		WTW.hide('wtw_useradd');
		dGet('wtw_userlist').innerHTML = "";
		dGet('wtw_alluserswidth').className = "wtw-dashboardboxleftfull";
		WTW.getJSON("/connect/users.php", 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zuserlist = "";
				if (zresponse != null) {
					zuserlist += "<table class=\"wtw-table\"><tr><td class=\"wtw-tablecolumnheading\">User Name</td><td class=\"wtw-tablecolumnheading\">Email</td><td class=\"wtw-tablecolumnheading\">User ID</td><td class=\"wtw-tablecolumnheading\">User Roles</td><td class=\"wtw-tablecolumnheading\">Create Date</td><td class=\"wtw-tablecolumnheading\">&nbsp;</td></tr>";
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i].userid != undefined) {
							zuserlist += "<tr><td class=\"wtw-tablecolumns\">" + zresponse[i].username + "</td><td class=\"wtw-tablecolumns\">" + zresponse[i].email + "</td><td class=\"wtw-tablecolumns\">" + zresponse[i].userid + "</td><td class=\"wtw-tablecolumns\">";
							for (var j=0;j<zresponse[i].roles.length;j++) {
								if (zresponse[i].roles[j] != undefined) {
									if (j == 0) {
										zuserlist += zresponse[i].roles[j].rolename;
									} else {
										zuserlist += ", " + zresponse[i].roles[j].rolename;
									}
								}
							}
							zuserlist += "</td><td class=\"wtw-tablecolumns\">" + zresponse[i].createdate + "</td><td class=\"wtw-tablecolumns\">";
							zuserlist += "<div id='getuser" + zresponse[i].userid + "' class='wtw-bluebuttonright' onclick=\"WTW.getUser('" + zresponse[i].userid + "');\">View User</div>";
							zuserlist += "</td></tr>";
						}
					}
					zuserlist += "</table>";
				}
				dGet('wtw_userlist').innerHTML = zuserlist;
				WTW.hide('wtw_loadingusers');
				WTW.show('wtw_userlist');
				WTW.show('wtw_allusers');
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-openAllUsers=" + ex.message);
	}
}

WTWJS.prototype.getUser = function(zuserid) {
	try {
		WTW.show('wtw_loadingusers');
		WTW.hide('wtw_userlist');
		WTW.hide('wtw_useradd');
		WTW.hide('wtw_userinfo');
		dGet('wtw_userinfo').innerHTML = "";
		dGet('wtw_alluserswidth').className = "wtw-dashboardboxleft";
		WTW.getJSON("/connect/user.php?userid=" + zuserid, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zuserlist = "";
				if (zresponse != null) {
					dGet('wtw_alluserstitle').innerHTML = "User: " + zresponse.username;
					zuserlist += "<div class=\"wtw-dashboardlabel\">User Name</div>";
					zuserlist += "<div class=\"wtw-dashboardvalue\"><input id=\"wtw_tuserusername\" type=\"text\" value=\"" + zresponse.username + "\" maxlength=\"64\"/></div>";
					zuserlist += "<div class=\"wtw-clear\"></div>";
					zuserlist += "<div class=\"wtw-dashboardlabel\">User ID</div>";
					zuserlist += "<div id=\"wtw_tuseruserid\" class=\"wtw-dashboardvalue\">" + zresponse.userid + "</div>";
					zuserlist += "<div class=\"wtw-clear\"></div>";
					zuserlist += "<div class=\"wtw-dashboardlabel\">User Upload Path ID</div>";
					zuserlist += "<div class=\"wtw-dashboardvalue\">" + zresponse.uploadpathid + "</div>";
					zuserlist += "<div class=\"wtw-clear\"></div>";
					zuserlist += "<div class=\"wtw-dashboardlabel\">Email</div>";
					zuserlist += "<div class=\"wtw-dashboardvalue\"><input id=\"wtw_tuseruseremail\" type=\"text\" value=\"" + zresponse.email + "\" maxlength=\"255\"/></div>";
					zuserlist += "<div class=\"wtw-clear\"></div>";
					zuserlist += "<div class=\"wtw-dashboardlabel\">Create Date</div>";
					zuserlist += "<div id=\"wtw_tuseruserid\" class=\"wtw-dashboardvalue\">" + zresponse.createdate + "</div>";
					zuserlist += "<div class=\"wtw-clear\"></div>";
					zuserlist += "<div class=\"wtw-dashboardlabel\">Last Update Date</div>";
					zuserlist += "<div id=\"wtw_tuseruserid\" class=\"wtw-dashboardvalue\">" + zresponse.updatedate + "</div>";
					zuserlist += "<div class=\"wtw-clear\"></div><hr />";
					zuserlist += "<div class=\"wtw-dashboardlabel\">Roles:</div><div class=\"wtw-clear\"></div><div class=\"wtw-indent\">";
					for (var i=0;i<zresponse.roles.length;i++) {
						if (zresponse.roles[i] != undefined) {
							zuserlist += "<div id='deleteuserrole" + zresponse.roles[i].userinroleid + "' class='wtw-redbuttonright' onclick=\"WTW.deleteUserRole('" + zresponse.userid + "','" + zresponse.roles[i].userinroleid + "');\" alt='Delete Role' title='Delete Role'>X</div>";
							zuserlist += "<div class=\"wtw-dashboardlabel\">" + zresponse.roles[i].rolename + "</div>";
							zuserlist += "<div class=\"wtw-clear\"></div>";
						}
					}
					zuserlist += "</div><div class=\"wtw-clear\"></div><br />";
					zuserlist += "<div class=\"wtw-dashboardlabel\"><select id=\"wtw_adduserrole\" class=\"wtw-indent\"></select></div>";
					zuserlist += "<div id='adduserrole" + zresponse.userid + "' class='wtw-bluebuttonright' onclick=\"WTW.addUserRole('" + zresponse.userid + "');\">Add Role</div>";
					zuserlist += "<div class=\"wtw-clear\"></div><hr />";

					zuserlist += "<div id=\"wtw_errorusersave\" class=\"wtw-dashboardlabel wtw-red\"></div>";
					zuserlist += "<div class=\"wtw-clear\"></div>";
					zuserlist += "<div id='deleteuser" + zresponse.userid + "' class='wtw-redbuttonleft' onclick=\"WTW.deleteUser('" + zresponse.userid + "');\">Delete User</div>";
					zuserlist += "<div id='saveuser" + zresponse.userid + "' class='wtw-greenbuttonright' onclick=\"WTW.saveUser();\">Save User</div>";
					zuserlist += "<div id='cancelsaveuser" + zresponse.userid + "' class='wtw-yellowbuttonright' onclick=\"WTW.cancelSaveUser();\">Cancel</div>";

				}
				dGet('wtw_userinfo').innerHTML = zuserlist;
				WTW.hide('wtw_loadingusers');
				WTW.show('wtw_userinfo');
				if (dGet('wtw_adduserrole') != null) {
					WTW.clearDDL('wtw_adduserrole');
					WTW.getJSON("/connect/roles.php", 
						function(zresponse) {
							if (zresponse != null) {
								zresponse = JSON.parse(zresponse);
								for (var i=0;i<zresponse.length;i++) {
									var option = document.createElement("option");
									option.text = zresponse[i].rolename;
									option.value = zresponse[i].roleid;
									dGet('wtw_adduserrole').add(option);
								}
							}
						}
					);
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-getUser=" + ex.message);
	}
}

WTWJS.prototype.deleteUserRole = function(zuserid, zuserinroleid) {
	try {	
		if (zuserinroleid != "") {
			dGet('deleteuserrole' + zuserinroleid).innerHTML = "Deleting...";
			var zrequest = {
				'userinroleid':zuserinroleid,
				'userid':zuserid
			};
			/* function for after iframe loads */
			var onload = function(ipage) {
				ipage.getElementById('wtw_tuserinroleid').value = zrequest.userinroleid;
				ipage.getElementById('wtw_tuserid').value = zrequest.userid;
				ipage.getElementById('wtw_bdeleteuserrole').click();
			}
			/* iframe src, onload function */
			var iframe = WTW.createIFrame('/core/iframes/users.php', onload);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-deleteUserRole=" + ex.message);
	}
}	

WTWJS.prototype.addUserRole = function(zuserid) {
	try {	
		var zroleid = WTW.getDDLValue('wtw_adduserrole');
		if (zroleid != "" && zuserid != "") {
			dGet('adduserrole' + zuserid).innerHTML = "Adding...";
			var zrequest = {
				'userid':zuserid,
				'roleid':zroleid
			};
			/* function for after iframe loads */
			var onload = function(ipage) {
				ipage.getElementById('wtw_tuserid').value = zrequest.userid;
				ipage.getElementById('wtw_troleid').value = zrequest.roleid;
				ipage.getElementById('wtw_bsaveuserrole').click();
			}
			/* iframe src, onload function */
			var iframe = WTW.createIFrame('/core/iframes/users.php', onload);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-addUserRole=" + ex.message);
	}
}	

WTWJS.prototype.addUser = function() {
	try {
		WTW.show('wtw_loadingusers');
		WTW.hide('wtw_userlist');
		WTW.hide('wtw_useradd');
		WTW.hide('wtw_userinfo');
		var zuserlist = "";
		var samplepassword = WTW.getRandomString(20);
		dGet('wtw_useradd').innerHTML = "";
		dGet('wtw_alluserswidth').className = "wtw-dashboardboxleft";
		dGet('wtw_alluserstitle').innerHTML = "New User";
		zuserlist += "<div class=\"wtw-dashboardlabel\">User Name</div>";
		zuserlist += "<div class=\"wtw-dashboardvalue\"><input id=\"wtw_tuserusername2\" type=\"text\" maxlength=\"64\"/></div>";
		zuserlist += "<div class=\"wtw-clear\"></div>";
		zuserlist += "<div class=\"wtw-dashboardlabel\">Email</div>";
		zuserlist += "<div class=\"wtw-dashboardvalue\"><input id=\"wtw_tuseruseremail2\" type=\"text\" maxlength=\"255\"/></div>";
		zuserlist += "<div class=\"wtw-clear\"></div>";
		zuserlist += "<div class=\"wtw-dashboardlabel\">Password</div>";
		zuserlist += "<div class=\"wtw-dashboardvalue\"><input id=\"wtw_tuseruserpassword2\" type=\"text\" value=\"" + samplepassword + "\" maxlength=\"255\"/></div>";
		zuserlist += "<div class=\"wtw-clear\"></div>";

		zuserlist += "<div id=\"wtw_errorusersave2\" class=\"wtw-dashboardlabel wtw-red\"></div>";
		zuserlist += "<div class=\"wtw-clear\"></div>";
		zuserlist += "<div id='cancelsaveuser' class='wtw-yellowbuttonleft' onclick=\"WTW.cancelSaveUser();\">Cancel</div>";
		zuserlist += "<div id='adduser' class='wtw-greenbuttonright' onclick=\"WTW.saveNewUser();\">Save User</div>";
		dGet('wtw_useradd').innerHTML = zuserlist;
		WTW.hide('wtw_loadingusers');
		WTW.show('wtw_useradd');
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-addUser=" + ex.message);
	}
}

WTWJS.prototype.cancelSaveUser = function() {
	try {	
		dGet('wtw_alluserstitle').innerHTML = "<div id='wtw_adduserbutton' class='wtw-greenbuttonright' onclick=\"WTW.addUser();\">Add New</div>All Users";
		WTW.hide('wtw_userinfo');
		WTW.hide('wtw_useradd');
		dGet('wtw_alluserswidth').className = "wtw-dashboardboxleftfull";
		WTW.show('wtw_userlist');
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-cancelSaveUser=" + ex.message);
	}
}	

WTWJS.prototype.saveNewUser = function() {
	try {	
		zusername = dGet("wtw_tuserusername2").value;
		dGet('wtw_errorusersave2').innerHTML = "";

		if (zusername.length > 2) {
			dGet('wtw_alluserstitle').innerHTML = "<div id='wtw_adduserbutton' class='wtw-greenbuttonright' onclick=\"WTW.addUser();\">Add New</div>All Users";
			WTW.hide('wtw_userlist');
			WTW.hide('wtw_userinfo');
			WTW.hide('wtw_useradd');
			dGet('wtw_alluserswidth').className = "wtw-dashboardboxleftfull";
			zemail = dGet("wtw_tuseruseremail2").value;
			zpassword = btoa(dGet("wtw_tuseruserpassword2").value);
			var zrequest = {
				'username':zusername,
				'password':zpassword,
				'email':zemail
			};
			/* function for after iframe loads */
			var onload = function(ipage) {
				ipage.getElementById('wtw_tuserid').value = '';
				ipage.getElementById('wtw_tusername').value = zrequest.username;
				ipage.getElementById('wtw_tpassword').value = zrequest.password;
				ipage.getElementById('wtw_tuseremail').value = zrequest.email;
				ipage.getElementById('wtw_bsavenewuser').click();
			}
			/* iframe src, onload function */
			var iframe = WTW.createIFrame('/core/iframes/users.php', onload);
		} else {
			dGet('wtw_errorusersave2').innerHTML = "User Name must be 3 or more characters";
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-saveNewUser=" + ex.message);
	}
}	

WTWJS.prototype.saveUser = function() {
	try {	
		zusername = dGet("wtw_tuserusername").value;
		dGet('wtw_errorusersave').innerHTML = "";

		if (zusername.length > 2) {
			dGet('wtw_alluserstitle').innerHTML = "<div id='wtw_adduserbutton' class='wtw-greenbuttonright' onclick=\"WTW.addUser();\">Add New</div>All Users";
			WTW.hide('wtw_userlist');
			WTW.hide('wtw_userinfo');
			WTW.hide('wtw_useradd');
			dGet('wtw_alluserswidth').className = "wtw-dashboardboxleftfull";
			zuserid = dGet("wtw_tuseruserid").innerText;
			zemail = dGet("wtw_tuseruseremail").value;
			var zrequest = {
				'userid':zuserid,
				'username':zusername,
				'email':zemail
			};
			/* function for after iframe loads */
			var onload = function(ipage) {
				ipage.getElementById('wtw_tuserid').value = zrequest.userid;
				ipage.getElementById('wtw_tusername').value = zrequest.username;
				ipage.getElementById('wtw_tuseremail').value = zrequest.email;
				ipage.getElementById('wtw_bsaveuser').click();
			}
			/* iframe src, onload function */
			var iframe = WTW.createIFrame('/core/iframes/users.php', onload);
		} else {
			dGet('wtw_errorusersave').innerHTML = "User Name must be 3 or more characters";
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-saveUser=" + ex.message);
	}
}	

WTWJS.prototype.deleteUser = function(zuserid) {
	try {	
		if (zuserid != "") {
			dGet('deleteuser' + zuserid).innerHTML = "Deleting...";
			var zrequest = {
				'userid':zuserid
			};
			/* function for after iframe loads */
			var onload = function(ipage) {
				ipage.getElementById('wtw_tuserid').value = zrequest.userid;
				ipage.getElementById('wtw_bdeleteuser').click();
			}
			/* iframe src, onload function */
			var iframe = WTW.createIFrame('/core/iframes/users.php', onload);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admineditor.js-deleteUser=" + ex.message);
	}
}	


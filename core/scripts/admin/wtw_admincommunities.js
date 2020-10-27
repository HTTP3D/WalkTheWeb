/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are used to administer a website in admin mode only */

/* these functions administer 3D Communities as a whole (mold functions are in wtw_adminmolds.js) */
/* name, alt tags, set analytics, etc... */
/* also includes 3D Scene settings: sky, gravity, water level, extended ground, etc... */
/* 		and common functions for 3D Communities, 3D Buildings, and 3D Things */

WTWJS.prototype.openCommunityForm = function(zcommunityid) {
	/* open the 3D Community Information form */
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
									dGet('wtw_tcommunitydescription').value = WTW.decode(WTW.communities[i].communityinfo.communitydescription);
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
		WTW.log("core-scripts-admin-wtw_admincommunities.js-openCommunityForm=" + ex.message);
	}
}		

WTWJS.prototype.loadCommunityForm = function(zcommunityid) {
	/* load settings to the 3D Community Information Form */
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
									dGet('wtw_tcommunitydescription').value = WTW.decode(WTW.communities[i].communityinfo.communitydescription);
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
		WTW.log("core-scripts-admin-wtw_admincommunities.js-loadCommunityForm=" + ex.message);
	}
}		

WTWJS.prototype.submitCommunityForm = function(w) {
	/* submit the 3D Community Information Form */
	try {
		switch (w) {
			case 0:
				/* delete 3D Community */
				/* note that the 3D Community is flagged as deleted in the database and no data is actually deleted */
				var zrequest = {
					'communityid': communityid,
					'function':'deletecommunity'
				};
				WTW.postJSON("/core/handlers/communities.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						WTW.redirectParent('/admin.php');
					}
				);
				break;
			case 1:
				/* save 3D Community settings */
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
							WTW.communities[i].communityinfo.communitydescription = WTW.encode(dGet('wtw_tcommunitydescription').value);
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
				var zrequest = {
					'communityid': communityid,
					'communityname': btoa(dGet('wtw_tcommunityname').value),
					'communitydescription': btoa(dGet('wtw_tcommunitydescription').value),
					'analyticsid': dGet('wtw_tcommunityanalyticsid').value,
					'groundpositiony': dGet('wtw_tgroundpositiony').value,
					'waterpositiony': dGet('wtw_twaterpositiony').value,
					'alttag': btoa(dGet('wtw_tcommunityalttag').value),
					'function':'savecommunity'
				};
				WTW.postJSON("/core/handlers/communities.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
					}
				);
				break;
			case -1:
				/* cancel and reverse any 3D Community settings */
				for (var i = 0; i < WTW.communities.length; i++) {
					if (WTW.communities[i] != null) {
						if (WTW.communities[i].communityinfo.communityid == communityid) {
							dGet('wtw_tcommunityname').value = WTW.decode(WTW.communities[i].communityinfo.communityname);
							dGet('wtw_tcommunitydescription').value = WTW.decode(WTW.communities[i].communityinfo.communitydescription);
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
		WTW.setMenuBarSelectText();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admincommunities.js-submitCommunityForm=" + ex.message);
	}
}

WTWJS.prototype.copyMyCommunity = function() {
	/* make a copy of an existing 3D Community (use as backup or as a new 3D Community to edit and use) */
	try {
		dGet('wtw_tcommunityname').value = '';
		WTW.getJSON("/connect/communities.php?userid=" + dGet('wtw_tuserid').value, 
			function(response) {
				WTW.communities = JSON.parse(response);
				if (WTW.communities != null) {
					for (var i = 0; i < WTW.communities.length; i++) {
						if (WTW.communities[i] != null) {
							if (WTW.communities[i].communityinfo.communityid != undefined) {
								if (WTW.communities[i].communityinfo.communityid != null) {
									if (communityid == WTW.communities[i].communityinfo.communityid) {
										dGet('wtw_tcommunityname').value = WTW.decode(WTW.communities[i].communityinfo.communityname) + " - Copy";
										var zcommunityname = WTW.encode(dGet('wtw_tcommunityname').value);
										if (zcommunityname != "") {
											WTW.copyCommunity(communityid, zcommunityname + " - Copy");
										} else {
											WTW.copyCommunity(communityid, "New 3D Community - Copy");
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
		WTW.log("core-scripts-admin-wtw_admincommunities.js-copyMyCommunity=" + ex.message);
	}
}

WTWJS.prototype.copyCommunity = function(zcopycommunityid, zcommunityname) {
	/* submit the copy process to the database to duplicate */
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
		var zrequest = {
			'pastcommunityid': zcopycommunityid,
			'communityname': btoa(dGet('wtw_tcommunityname').value),
			'communitydescription': btoa(dGet('wtw_tcommunitydescription').value),
			'groundpositiony': dGet('wtw_tgroundpositiony').value,
			'waterpositiony': dGet('wtw_twaterpositiony').value,
			'alttag': '',
			'function':'savecommunity'
		};
		WTW.postJSON("/core/handlers/communities.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.copyCommunityComplete(zresponse.communityid);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admincommunities.js-copyCommunity=" + ex.message);
	}
}

WTWJS.prototype.copyCommunityComplete = function(zcommunityid) {
	/* copy process is complete, load new 3D Community */
	try {
		window.setTimeout(function() {
			if (zcommunityid != "" && zcommunityid != communityid) {
				window.location.href="/admin.php?communityid=" + zcommunityid + "&hmenu=25&newcommunity=1";
			}
		}, 2000);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admincommunities.js-copyCommunityComplete=" + ex.message);
	} 
}

WTWJS.prototype.getSelectCommunitiesList = function() {
	/* populates the admin menu for My 3D Community to load and edit */
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
								dGet("wtw_listcommunities").innerHTML += "<div id=\"wtw_beditcommunity" + WTW.communities[i].communityinfo.communityid + "\" onclick=\"window.location.href='admin.php?communityid=" + WTW.communities[i].communityinfo.communityid + "';\" class='wtw-menulevel2'>" + WTW.decode(WTW.communities[i].communityinfo.communityname) + "</div>\r\n";
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
		WTW.log("core-scripts-admin-wtw_admincommunities.js-getSelectCommunitiesList=" + ex.message);
	}		
}

WTWJS.prototype.editCommunity = function(zcommunityid) {
	/* load a select 3D Community into the editor */
	try {
		WTW.openWebpage(wtw_domainurl + "/admin.php?communityidid=" + zcommunityid);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admincommunities.js-editCommunity=" + ex.message);
	}
}

WTWJS.prototype.communitySearchShowCommunity = function(newcommunityid) {
	/* after you search and select a 3D Community, this loads the 3D Community in the editor */
	try {
		window.location.href="/admin.php?communityid=" + newcommunityid + "&hmenu=25&newcommunity=1";
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admincommunities.js-communitySearchShowCommunity=" + ex.message);
	}
}

WTWJS.prototype.openShareCommunityForm = function() {
	/* share 3D Community is used to send a copy to WalkTheWeb for others to search and download copies of their own */
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
		WTW.log("core-scripts-admin-wtw_admincommunities.js-openShareCommunityForm=" + ex.message);
	}
}		

WTWJS.prototype.saveShareCommunityForm = function() {
	/* process the share 3D Community and Save the settings locally for next Share */
	try {
		var zrequest = {
			'communityid': communityid,
			'communityname': btoa(dGet('wtw_tsharecommtempname').value),
			'description': btoa(dGet('wtw_tsharecommdescription').value),
			'tags': btoa(dGet('wtw_tsharecommtags').value),
			'function':'savecommunitytemplate'
		};
		WTW.postJSON("/core/handlers/communities.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				dGet('wtw_sharehash').value = zresponse.sharehash;
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admincommunities.js-saveShareCommunityForm=" + ex.message);
	}
}

WTWJS.prototype.shareCommunityTemplate = function() {
	/* after user is sent to confirm form to make sure they want to Share the 3D Community */
	/* this process the share */
	try {
		WTW.closeConfirmation();
		dGet('wtw_bsharecommunitytemp').innerHTML = 'Shared 3D Community';
		var zrequest = {
			'communityid': communityid,
			'sharehash': dGet('wtw_sharehash').value,
			'function':'sharecommunitytemplate'
		};
		WTW.postJSON("/core/handlers/communities.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);

				/* note serror would contain errors */
				dGet('wtw_sharecommunityresponse').innerHTML = zresponse.success + " " + zresponse.serror;
				window.setTimeout(function() {
					dGet('wtw_sharecommunityresponse').innerHTML = "";
				}, 5000);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admincommunities.js-shareCommunityTemplate=" + ex.message);
	}
}


/* 3D Scene Settings */

/* ground Terrain */
WTWJS.prototype.openAddGroundTerrain = function() {
	/* add terrain and height map generated molds */
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
		WTW.log("core-scripts-admin-wtw_admincommunities.js-openAddGroundTerrain=" + ex.message);
	}		
}

WTWJS.prototype.openEditGroundSettings = function() {
	/* edit extended ground texture settings */
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
		WTW.log("core-scripts-admin-wtw_admincommunities.js-openEditGroundSettings=" + ex.message);
	}		
}

WTWJS.prototype.saveGround = function() {
	/* save extended ground texture settings */
	try {
		var zgroundtextureid = WTW.init.groundTextureID;
		var zgroundtexturepath = WTW.init.groundTexturePath;
		if (dGet('wtw_textendedgroundtextureid').value != "") {
			zgroundtextureid = dGet('wtw_textendedgroundtextureid').value;
		}
		if (dGet('wtw_textendedgroundtexturepath').value != "") {
			zgroundtexturepath = dGet('wtw_textendedgroundtexturepath').value;
		}
		for (var i = 0; i < WTW.communities.length; i++) {
			if (WTW.communities[i] != null) {
				if (WTW.communities[i].communityinfo.communityid == communityid) {
					if (WTW.communities[i].graphics.texture.id != null) {
						WTW.communities[i].graphics.texture.backupid = "";
						WTW.communities[i].graphics.texture.id = zgroundtextureid;
					}
					if (WTW.communities[i].graphics.texture.path != null) {
						WTW.communities[i].graphics.texture.backuppath = "";
						WTW.communities[i].graphics.texture.path = zgroundtexturepath;
					}
				}
			}
		}
		var zrequest = {
			'communityid': communityid,
			'groundtextureid': zgroundtextureid,
			'function':'saveextendedground'
		};
		WTW.postJSON("/core/handlers/communities.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admincommunities.js-saveGround=" + ex.message);
	}		
}

WTWJS.prototype.cancelGround = function() {
	/* cancel and undo extended ground texture settings */
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
		WTW.log("core-scripts-admin-wtw_admincommunities.js-cancelGround=" + ex.message);
	}		
}

/* sky dome */
WTWJS.prototype.openSkyDomeForm = function() {
	/* edit sky dome appearance */
	/* this sky dome uses sky procedure texture */
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
		WTW.log("core-scripts-admin-wtw_admincommunities.js-openSkyDomeForm=" + ex.message);
	}
}

WTWJS.prototype.setSkyScene = function (key, newvalue, increment) {
	/* set sky dome based on form settings (one value at a time updates) */
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
		WTW.log("core-scripts-admin-wtw_admincommunities.js-setSkyScene=" + ex.message);
	}  
}

WTWJS.prototype.cancelSkyDome = function() {
	/* cancel and undo sky dome form changes */
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
		WTW.log("core-scripts-admin-wtw_admincommunities.js-cancelSkyDome=" + ex.message);
	}
}

WTWJS.prototype.saveSkyDome = function() {
	/* save skydome sky changes */
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
		var zrequest = {
			'communityid': communityid,
			'skydomeid': skydomeid,
			'skyinclination': WTW.init.skyInclination,
			'skyluminance': WTW.init.skyLuminance,
			'skyazimuth': WTW.init.skyAzimuth,
			'skyrayleigh': WTW.init.skyRayleigh,
			'skyturbidity': WTW.init.skyTurbidity,
			'skymiedirectionalg': WTW.init.skyMieDirectionalG,
			'skymiecoefficient': WTW.init.skyMieCoefficient,
			'function':'saveskydome'
		};
		WTW.postJSON("/core/handlers/communities.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admincommunities.js-saveSkyDome=" + ex.message);
	}
}

/* 3D Community Scene gravity */
WTWJS.prototype.saveGravity = function() {
	/* save community gravity (applies to scene when loaded) */
	try {
		if (communityid != "") {
			var zrequest = {
				'communityid': communityid,
				'gravity':WTW.init.gravity,
				'function':'savegravity'
			};
			WTW.postJSON("/core/handlers/communities.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
				}
			);
		} else if (buildingid != "") {
			var zrequest = {
				'buildingid': buildingid,
				'gravity':WTW.init.gravity,
				'function':'savegravity'
			};
			WTW.postJSON("/core/handlers/buildings.php", zrequest, 
				function(zresponse) {
				}
			);
		} else if (thingid != "") {
			var zrequest = {
				'thingid': thingid,
				'gravity':WTW.init.gravity,
				'function':'savegravity'
			};
			WTW.postJSON("/core/handlers/things.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
				}
			);
		}		
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admincommunities.js-saveGravity=" + ex.message);
	}
}

WTWJS.prototype.setGravity = function() {
	/* set gravity based on form */
	try {
		if (WTW.isNumeric(dGet('wtw_tcommgravity').value)) {
			if (Number(dGet('wtw_tcommgravity').value) != 0) {
				scene.gravity = new BABYLON.Vector3(0, -Number(dGet('wtw_tcommgravity').value), 0);
			} else {
				scene.gravity = new BABYLON.Vector3(0, 0, 0);
			}
		} else {
			scene.gravity = new BABYLON.Vector3(0, 0, 0);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admincommunities.js-setGravity=" + ex.message);
	}
}

/* ground level - creates water if below 0 (zero) */
WTWJS.prototype.setGroundWater = function() {
	/* set ground level and water from form */
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
		WTW.log("core-scripts-admin-wtw_admincommunities.js-setGroundWater=" + ex.message);
	}
}


/* Common functions for 3D Communities, 3D Buildings, and 3D Things */

/* confirmation pages before executing a command */
WTWJS.prototype.openConfirmation = function(w) {
	/* open confirmation box with warning */
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
		WTW.log("core-scripts-admin-wtw_admincommunities.js-openConfirmation=" + ex.message);
	}
}

WTWJS.prototype.completedConfirmation = function(w) {
	/* if confirmed, continue to process */
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
		WTW.log("core-scripts-admin-wtw_admincommunities.js-completedConfirmation=" + ex.message);
	}
}

WTWJS.prototype.closeConfirmation = function(w) {
	/* close confirmation box */
	try {
		WTW.hide('wtw_confirmform');
		WTW.hide('wtw_greyout');
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admincommunities.js-closeConfirmation=" + ex.message);
	}
}

/* start position */
WTWJS.prototype.setStartPosition = function(zcommunityid, zbuildingid, zthingid) {
	/* sets start position for 3D COmmuity, 3D Building, or 3D Thing */
	try {
		if (WTW.myAvatar!= null) {
			var iframe = null;
			var ipage = null;
			if (zcommunityid != "") {
				var zrequest = {
					'communityid': communityid,
					'positionx': WTW.myAvatar.position.x,
					'positiony': WTW.myAvatar.position.y,
					'positionz': WTW.myAvatar.position.z,
					'scalingx': 1,
					'scalingy': 1,
					'scalingz': 1,
					'rotationx': WTW.cameraYOffset,
					'rotationy': WTW.getDegrees(WTW.myAvatar.rotation.y),
					'rotationz': WTW.getDegrees(WTW.myAvatar.rotation.z),
					'function':'savestartposition'
				};
				WTW.postJSON("/core/handlers/communities.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
					}
				);
			} else if (zbuildingid != "") {
				var zrequest = {
					'buildingid': zbuildingid,
					'positionx': WTW.myAvatar.position.x,
					'positiony': WTW.myAvatar.position.y,
					'positionz': WTW.myAvatar.position.z,
					'scalingx': 1,
					'scalingy': 1,
					'scalingz': 1,
					'rotationx': WTW.cameraYOffset,
					'rotationy': WTW.getDegrees(WTW.myAvatar.rotation.y),
					'rotationz': WTW.getDegrees(WTW.myAvatar.rotation.z),
					'function':'savestartposition'
				};
				WTW.postJSON("/core/handlers/buildings.php", zrequest, 
					function(zresponse) {
					}
				);
			} else if (zthingid != "") {
				var zrequest = {
					'thingid': thingid,
					'positionx': WTW.myAvatar.position.x,
					'positiony': WTW.myAvatar.position.y,
					'positionz': WTW.myAvatar.position.z,
					'scalingx': 1,
					'scalingy': 1,
					'scalingz': 1,
					'rotationx': WTW.cameraYOffset,
					'rotationy': WTW.getDegrees(WTW.myAvatar.rotation.y),
					'rotationz': WTW.getDegrees(WTW.myAvatar.rotation.z),
					'function':'savestartposition'
				};
				WTW.postJSON("/core/handlers/things.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
					}
				);
			}
			dGet('wtw_startsaved').style.visibility = "visible";
			window.setTimeout(function(){
				dGet('wtw_startsaved').style.visibility = "hidden";
			}, 3000);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_admincommunities.js-setStartPosition=" + ex.message);
	}
}


/* screen capture for babylon canvas of 3D Scene */

WTWJS.prototype.openUpdateSnapshotForm = function() {
	/* open stapshot form view  and load current snapshot if any */
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
		WTW.log("core-scripts-admin-wtw_admincommunities.js-openUpdateSnapshotForm=" + ex.message);
	}
}

WTWJS.prototype.snapshot3D = function(zfilepath, zfilename) {
	/* capture 3D Scene and save file to server */
	try {
		dGet('wtw_bupdatesnapshot').onclick = "";
		dGet('wtw_bupdatesnapshot').innerHTML = "<span style='color:gray;'>Loading Image...</span>";
		dGet('wtw_bsnapshotthing').onclick = "";
		dGet('wtw_bsnapshotthing').innerHTML = "<span style='color:gray;'>Loading Image...</span>";
		dGet('wtw_bsnapshotbuilding').onclick = "";
		dGet('wtw_bsnapshotbuilding').innerHTML = "<span style='color:gray;'>Loading Image...</span>";
		dGet('wtw_bsnapshotcommunity').onclick = "";
		dGet('wtw_bsnapshotcommunity').innerHTML = "<span style='color:gray;'>Loading Image...</span>";
		dGet('wtw_tfilename').value = zfilename;
		dGet('wtw_tfilepath').value = zfilepath;
		var zcontext = canvas.getContext("experimental-webgl", {preserveDrawingBuffer: true});
		scene.render();
		var filedata = canvas.toDataURL("image/png");
		zcontext = canvas.getContext("experimental-webgl", {preserveDrawingBuffer: false});
		var zrequest = {
			'communityid': communityid,
			'buildingid': buildingid,
			'thingid': thingid,
			'filename': dGet('wtw_tfilename').value,
			'filepath': dGet('wtw_tfilepath').value,
			'filedata': filedata,
			'function':'saveimage'
		};
		WTW.postJSON("/core/handlers/uploads.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.updateSnapshot3D(communityid, buildingid, thingid, zresponse.snapshotid, zresponse.snapshotpath, zresponse.snapshotdata);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_admincommunities.js-snapshot3D=" + ex.message);
	} 
}

WTWJS.prototype.updateSnapshot3D = function(zcommunityid, zbuildingid, zthingid, zsnapshotid, zsnapshotpath, zfiledata) {
	/* update snapshot of 3D Community, 3D Building, or 3D Thing */
	try {
		if (WTW.adminView == 1) {
			if (zthingid != "") {
				if (zsnapshotpath != "") {
					dGet('wtw_defaultthingsnapshot').src = zsnapshotpath + "?" + WTW.getRandomString(5);
				} else {
					dGet('wtw_defaultthingsnapshot').src = zfiledata;
				}
				WTW.show('wtw_defaultthingsnapshot');
				if (WTW.things != null) {
					for (var i = 0; i < WTW.things.length; i++) {
						if (WTW.things[i] != null) {
							if (WTW.things[i].thinginfo.thingid != undefined) {
								if (WTW.things[i].thinginfo.thingid != null) {
									if (zthingid == WTW.things[i].thinginfo.thingid) {
										WTW.things[i].thinginfo.snapshotid = zsnapshotid;
										WTW.things[i].thinginfo.snapshotpath = zsnapshotpath;
										WTW.things[i].thinginfo.snapshotdata = zfiledata;
									}
								}
							}
						}
					}
				}
			}
			if (zbuildingid != "") {
				if (zsnapshotpath != "") {
					dGet('wtw_defaultbuildingsnapshot').src = zsnapshotpath + "?" + WTW.getRandomString(5);
				} else {
					dGet('wtw_defaultbuildingsnapshot').src = zfiledata;
				}
				WTW.show('wtw_defaultbuildingsnapshot');
				if (WTW.buildings != null) {
					for (var i = 0; i < WTW.buildings.length; i++) {
						if (WTW.buildings[i] != null) {
							if (WTW.buildings[i].buildinginfo.buildingid != undefined) {
								if (WTW.buildings[i].buildinginfo.buildingid != null) {
									if (zbuildingid == WTW.buildings[i].buildinginfo.buildingid) {
										WTW.buildings[i].buildinginfo.snapshotid = zsnapshotid;
										WTW.buildings[i].buildinginfo.snapshotpath = zsnapshotpath;
										WTW.buildings[i].buildinginfo.snapshotdata = zfiledata;
									}
								}
							}
						}
					}
				}
			}
			if (zcommunityid != "") {
				if (zsnapshotpath != "") {
					dGet('wtw_defaultcommunitysnapshot').src = zsnapshotpath + "?" + WTW.getRandomString(5);
				} else {
					dGet('wtw_defaultcommunitysnapshot').src = zfiledata;
				}
				WTW.show('wtw_defaultcommunitysnapshot');
				if (WTW.communities != null) {
					for (var i = 0; i < WTW.communities.length; i++) {
						if (WTW.communities[i] != null) {
							if (WTW.communities[i].communityinfo.communityid != undefined) {
								if (WTW.communities[i].communityinfo.communityid != null) {
									if (zcommunityid == WTW.communities[i].communityinfo.communityid) {
										WTW.communities[i].communityinfo.snapshotid = zsnapshotid;
										WTW.communities[i].communityinfo.snapshotpath = zsnapshotpath;
										WTW.communities[i].communityinfo.snapshotdata = zfiledata;
									}
								}
							}
						}
					}
				}
			}
		}
		if (zsnapshotpath != "") {
			dGet('wtw_defaultsnapshot').src = zsnapshotpath + "?" + WTW.getRandomString(5);
		} else {
			dGet('wtw_defaultsnapshot').src = zfiledata;
		}
		dGet('wtw_defaultsnapshot').style.display = "block";
		dGet('wtw_defaultsnapshot').style.visibility = "visible";
		dGet('wtw_bupdatesnapshot').onclick = function(){
			if (WTW.adminView == 1) {
				WTW.adminMenuItemSelected(this);
			}
		};
		dGet('wtw_bupdatesnapshot').innerHTML = "Set Default Snapshot";

		dGet('wtw_bsnapshotthing').onclick = function(){
			WTW.snapshot3D(dGet('wtw_tcontentpath').value + '/uploads/things/' + dGet('wtw_tthingid').value + '/snapshots/', 'defaultthing.png');
		};
		dGet('wtw_bsnapshotthing').innerHTML = "Set Default Snapshot";
		dGet('wtw_bsnapshotbuilding').onclick = function(){
			WTW.snapshot3D(dGet('wtw_tcontentpath').value + '/uploads/buildings/' + dGet('wtw_tbuildingid').value + '/snapshots/', 'defaultbuilding.png');
		};
		dGet('wtw_bsnapshotbuilding').innerHTML = "Set Default Snapshot";
		dGet('wtw_bsnapshotcommunity').onclick = function(){
			WTW.snapshot3D(dGet('wtw_tcontentpath').value + '/uploads/communities/' + dGet('wtw_tcommunityid').value + '/snapshots/', 'defaultcommunity.png');
		};
		dGet('wtw_bsnapshotcommunity').innerHTML = "Set Default Snapshot";
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_admincommunities.js-updateSnapshot3D=" + ex.message);
	} 
}


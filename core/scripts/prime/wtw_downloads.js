/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

WTWJS.prototype.updateProgressText = function(ztext) {
	try {
		if (dGet('wtw_progresstext') != null) {
			dGet('wtw_progresstext').innerHTML = ztext;
		}
	} catch (ex) {
		WTW.log("install-updateProgressText=" + ex.message);
	}
}

WTWJS.prototype.updateProgressBar = function(zprogress, ztotal) {
	try {
		if (dGet('wtw_progressbar') != null) {
			zpercent = Math.round(100/ztotal * zprogress);
			dGet('wtw_progressbar').style.width = zpercent + "%";
		}
	} catch (ex) {
		WTW.log("install-updateProgressBar=" + ex.message);
	}
	return zprogress;
}

WTWJS.prototype.communitySearch = function(search) {
	try {
		search = WTW.encode(search);
		WTW.getJSON("https://3dnet.walktheweb.com/connect/communitysearch.php?s=" + search, 
			function(response) {
				WTW.communitySearchReply(JSON.parse(response));
			}
		);
	} catch (ex) {
		WTW.log("install-communitySearch=" + ex.message);
	}
}

WTWJS.prototype.communitySearchReply = function(response) {
	try {
		dGet('wtw_commtempsearchresults').innerHTML = "";
		for (var i=0; i < response.length; i++) {
			dGet('wtw_commtempsearchresults').innerHTML += "<h3 class=\"wtw-black\">" + response[i].templatename + "</h3>";
			dGet('wtw_commtempsearchresults').innerHTML += "<div style='white-space:normal;font-weight:normal;color:#000000;'>" + response[i].description + "</div><br />";
			if (response[i].snapshotid != "") {
				var zcommunityid = response[i].communityid;
				dGet('wtw_commtempsearchresults').innerHTML += "<img id='wtw_search" + zcommunityid + "' src='' onmouseover=\"this.style.border='1px solid yellow';\" onmouseout=\"this.style.border='1px solid gray';\" onclick=\"WTW.communitySearchSelect('" + zcommunityid + "');\" style=\"margin:5px;border:1px solid gray;cursor:pointer;width:250px;height:auto;\" />";
				WTW.getJSON("https://3dnet.walktheweb.com/connect/upload.php?uploadid=" + response[i].snapshotid + "&setid=" + zcommunityid, 
					function(response) {
						var imageinfo = JSON.parse(response);
						if (imageinfo[0] != null) {
							dGet('wtw_search' + imageinfo[0].setid).src = imageinfo[0].data;
						}
					}
				);
			}
			dGet('wtw_commtempsearchresults').innerHTML += "<br /><input type='button' id='wtw_bcommtempselect" + i + "' class='wtw-searchresultbutton' value='Select' onclick=\"WTW.communitySearchSelect('" + response[i].communityid + "');\" />";
			dGet('wtw_commtempsearchresults').innerHTML += "<br /><hr />";
		}
	} catch (ex) {
		WTW.log("install-communitySearchReply=" + ex.message);
	}
}

WTWJS.prototype.communitySearchSelect = function(zcopywebid) {
	try {
		WTW.hide('wtw_selectwebform');
		WTW.show('wtw_installprogress');
		WTW.updateProgressText("Fetching 3D Community Settings");
		WTW.updateProgressBar(1,100);
		
		var zprogress = 5;
		var zprogressbar = window.setInterval(function() {
			zprogress = WTW.updateProgressBar(zprogress,100) + 5;
			if (zprogress > 78) {
				window.clearInterval(zprogressbar);
			}
		},300);
		WTW.getJSON("https://3dnet.walktheweb.com/connect/community.php?communityid=" + zcopywebid + "&serverinstanceid=" + dGet('wtw_serverinstanceid').value + "&serverdomain=" + wtw_domainname, 
			function(response) {
				window.clearInterval(zprogressbar);
				WTW.updateProgressBar(100,100);
				WTW.updateProgressText("Writing 3D Community Settings");
				WTW.updateProgressBar(10,100);
				response = WTW.cleanInvalidCharacters(response);
				response = JSON.parse(response);
				if (response.communities[0] != undefined) {
					var community = response.communities[0];
					WTW.updateProgressBar(50,100);
					WTW.updateProgressBar(75,100);
					var zcommunityid = WTW.getRandomString(16);
					var zrequest = {
						'communityid': zcommunityid,
						'pastcommunityid': zcopywebid,
						'communityname': btoa(community.communityinfo.communityname),
						'analyticsid': '',
						'positionx': community.position.x,
						'positiony': community.position.y,
						'positionz': community.position.z,
						'scalingx': community.scaling.x,
						'scalingy': community.scaling.y,
						'scalingz': community.scaling.z,
						'rotationx': community.rotation.x,
						'rotationy': community.rotation.y,
						'rotationz': community.rotation.z,
						'gravity': community.ground.gravity,
						'textureid': community.graphics.texture.id,
						'skydomeid': community.graphics.sky.id,
						'skyinclination': community.graphics.sky.skyinclination,
						'skyluminance': community.graphics.sky.skyluminance,
						'skyazimuth': community.graphics.sky.skyazimuth,
						'skyrayleigh': community.graphics.sky.skyrayleigh,
						'skyturbidity': community.graphics.sky.skyturbidity,
						'skymiedirectionalg': community.graphics.sky.skymiedirectionalg,
						'skymiecoefficient': community.graphics.sky.skymiecoefficient,
						'groundpositiony': community.ground.position.y,
						'waterpositiony': community.water.position.y,
						'alttag': community.communityinfo.alttag,
						'function':'importcommunity'
					};
					WTW.postJSON("/core/handlers/communities.php", zrequest, 
						function(zresponse) {
							zresponse = JSON.parse(zresponse);
							WTW.updateProgressBar(95,100);
							/* note serror would contain errors */
							WTW.completedCommunityImport('community', zcommunityid, zcopywebid);
						}
					);
				}
			}
		);
	} catch (ex) {
		WTW.log("install-communitySearchSelect=" + ex.message);
	}
}

WTWJS.prototype.completedCommunityImport = function(zmoldgroup, zwebid, zcopywebid) {
	try {
		WTW.updateProgressBar(100,100);
		WTW.copyActionZones(zmoldgroup, zwebid, zcopywebid);
	} catch (ex) {
		WTW.log("install-completedCommunityImport=" + ex.message);
	}
}

WTWJS.prototype.buildingSearch = function(search) {
	try {
		search = WTW.encode(search);
		WTW.getJSON("https://3dnet.walktheweb.com/connect/buildingsearch.php?s=" + search, 
			function(response) {
				WTW.buildingSearchReply(JSON.parse(response));
			}
		);
	} catch (ex) {
		WTW.log("admineditor-buildingSearch=" + ex.message);
	}
}

WTWJS.prototype.buildingSearchReply = function(response) {
	try {
		dGet('wtw_buildtempsearchresults').innerHTML = "";
		for (var i=0; i < response.length; i++) {
			dGet('wtw_buildtempsearchresults').innerHTML += "<h3 class=\"wtw-black\">" + response[i].templatename + "</h3>";
			dGet('wtw_buildtempsearchresults').innerHTML += "<div style='white-space:normal;font-weight:normal;color:#000000;'>" + response[i].description + "</div><br />";
			if (response[i].snapshotid != "") {
				var zbuildingid = response[i].buildingid;
				dGet('wtw_buildtempsearchresults').innerHTML += "<img id='wtw_search" + zbuildingid + "' src='' onmouseover=\"this.style.border='1px solid yellow';\" onmouseout=\"this.style.border='1px solid gray';\" onclick=\"WTW.buildingSearchSelect('" + zbuildingid + "');return (false);\" style=\"margin:5px;border:1px solid gray;cursor:pointer;width:250px;height:auto;\" />";
				WTW.getJSON("https://3dnet.walktheweb.com/connect/upload.php?uploadid=" + response[i].snapshotid + "&setid=" + zbuildingid, 
					function(response) {
						var imageinfo = JSON.parse(response);
						if (imageinfo[0] != null) {
							dGet('wtw_search' + imageinfo[0].setid).src = imageinfo[0].data;
						}
					}
				);
			}
			dGet('wtw_buildtempsearchresults').innerHTML += "<br /><input type='button' id='wtw_btempselect" + i + "' class='wtw-searchresultbutton' value='Select' onclick=\"WTW.buildingSearchSelect('" + response[i].buildingid + "');return (false);\" />";
			dGet('wtw_buildtempsearchresults').innerHTML += "<br /><hr />";
		}
	} catch (ex) {
		WTW.log("admineditor-buildingSearchReply=" + ex.message);
	}
}

WTWJS.prototype.buildingSearchSelect = function(zcopywebid) {
	try {
		WTW.hide('wtw_selectwebform');
		WTW.show('wtw_installprogress');
		WTW.updateProgressText("Fetching 3D Building Settings");
		WTW.updateProgressBar(1,100);
		
		var zprogress = 5;
		var zprogressbar = window.setInterval(function() {
			zprogress = WTW.updateProgressBar(zprogress,100) + 5;
			if (zprogress > 78) {
				window.clearInterval(zprogressbar);
			}
		},300);
		WTW.getJSON("https://3dnet.walktheweb.com/connect/building.php?buildingid=" + zcopywebid + "&serverinstanceid=" + dGet('wtw_serverinstanceid').value + "&serverdomain=" + wtw_domainname, 
			function(response) {
				window.clearInterval(zprogressbar);
				WTW.updateProgressBar(100,100);
				WTW.updateProgressText("Writing 3D Building Settings");
				WTW.updateProgressBar(10,100);
				response = WTW.cleanInvalidCharacters(response);
				response = JSON.parse(response);
				if (response.buildings[0] != undefined) {
					var building = response.buildings[0];
					var zbuildingid = WTW.getRandomString(16);
					var zrequest = {
						'buildingid': zbuildingid,
						'pastbuildingid': zcopywebid,
						'buildingname': building.buildinginfo.buildingname,
						'analytics': '',
						'positionx': building.position.x,
						'positiony': building.position.y,
						'positionz': building.position.z,
						'scalingx': building.scaling.x,
						'scalingy': building.scaling.y,
						'scalingz': building.scaling.z,
						'rotationx': building.rotation.x,
						'rotationy': building.rotation.y,
						'rotationz': building.rotation.z,
						'gravity': building.gravity,
						'alttag': building.buildinginfo.alttag,
						'function':'importbuilding'
					};
					WTW.updateProgressBar(50,100);
					WTW.postJSON("/core/handlers/buildings.php", zrequest, 
						function(zresponse) {
							WTW.updateProgressBar(95,100);
							WTW.completedBuildingImport('building', zbuildingid, zcopywebid);
						}
					);
				}
			}
		);
	} catch (ex) {
		WTW.log("install-buildingSearchSelect=" + ex.message);
	}
}

WTWJS.prototype.completedBuildingImport = function(zmoldgroup, zwebid, zcopywebid) {
	try {
		WTW.updateProgressBar(100,100);
		WTW.copyActionZones(zmoldgroup, zwebid, zcopywebid);
	} catch (ex) {
		WTW.log("install-completedBuildingImport=" + ex.message);
	}
}

WTWJS.prototype.thingSearch = function(search) {
	try {
		search = WTW.encode(search);
		WTW.getJSON("https://3dnet.walktheweb.com/connect/thingsearch.php?s=" + search + "&u=" + dGet("wtw_tuserid").value, 
			function(response) {
				WTW.thingSearchReply(JSON.parse(response));
			}
		);
	} catch (ex) {
		WTW.log("admineditor-thingSearch=" + ex.message);
	}
}

WTWJS.prototype.thingSearchReply = function(response) {
	try {
		dGet('wtw_thingtempsearchresults').innerHTML = "";
		for (var i=0; i < response.length; i++) {
			dGet('wtw_thingtempsearchresults').innerHTML += "<h3 class=\"wtw-black\">" + response[i].templatename + "</h3>";
			dGet('wtw_thingtempsearchresults').innerHTML += "<div style='white-space:normal;font-weight:normal;color:#000000;'>" + response[i].description + "</div><br />";
			if (response[i].snapshotid != "") {
				var zthingid = response[i].thingid;
				dGet('wtw_thingtempsearchresults').innerHTML += "<img id='wtw_search" + zthingid + "' onmouseover=\"this.style.border='1px solid yellow';\" onmouseout=\"this.style.border='1px solid gray';\" onclick=\"WTW.thingSearchSelect('" + zthingid + "');return (false);\" style=\"margin:5px;border:1px solid gray;cursor:pointer;width:250px;height:auto;\" />";
				WTW.getJSON("https://3dnet.walktheweb.com/connect/upload.php?uploadid=" + response[i].snapshotid + "&setid=" + zthingid, 
					function(response) {
						var imageinfo = JSON.parse(response);
						if (imageinfo[0] != null) {
							dGet('wtw_search' + imageinfo[0].setid).src = imageinfo[0].data;
						}
					}
				);
			}
			dGet('wtw_thingtempsearchresults').innerHTML += "<br /><input type='button' id='wtw_bthingtempselect" + i + "' class='wtw-searchresultbutton' value='Select' onclick=\"WTW.thingSearchSelect('" + response[i].thingid + "');return (false);\" />";
			dGet('wtw_thingtempsearchresults').innerHTML += "<br /><hr />";
		}
		WTW.setWindowSize();
	} catch (ex) {
		WTW.log("admineditor-thingSearchReply=" + ex.message);
	}
}

WTWJS.prototype.thingSearchSelect = function(zcopywebid) {
	try {
		WTW.hide('wtw_selectwebform');
		WTW.show('wtw_installprogress');
		WTW.updateProgressText("Fetching 3D Thing Settings");
		WTW.updateProgressBar(1,100);
		
		var zprogress = 5;
		var zprogressbar = window.setInterval(function() {
			zprogress = WTW.updateProgressBar(zprogress,100) + 5;
			if (zprogress > 78) {
				window.clearInterval(zprogressbar);
			}
		},300);
		WTW.getJSON("https://3dnet.walktheweb.com/connect/thing.php?thingid=" + zcopywebid + "&serverinstanceid=" + dGet('wtw_serverinstanceid').value + "&serverdomain=" + wtw_domainname, 
			function(response) {
				window.clearInterval(zprogressbar);
				WTW.updateProgressBar(100,100);
				WTW.updateProgressText("Writing 3D Thing Settings");
				WTW.updateProgressBar(10,100);
				response = WTW.cleanInvalidCharacters(response);
				response = JSON.parse(response);
				if (response.things[0] != undefined) {
					var thing = response.things[0];
					WTW.updateProgressBar(50,100);
					var zthingid = WTW.getRandomString(16);
					var zrequest = {
						'thingid': zthingid,
						'pastthingid': zcopywebid,
						'thingname': thing.thinginfo.thingname,
						'analyticsid': '',
						'positionx': thing.position.x,
						'positiony': thing.position.y,
						'positionz': thing.position.z,
						'scalingx': thing.scaling.x,
						'scalingy': thing.scaling.y,
						'scalingz': thing.scaling.z,
						'rotationx': thing.rotation.x,
						'rotationy': thing.rotation.y,
						'rotationz': thing.rotation.z,
						'gravity': thing.gravity,
						'alttag': thing.thinginfo.alttag,
						'function':'importthing'
					};
					WTW.postJSON("/core/handlers/things.php", zrequest, 
						function(zresponse) {
							zresponse = JSON.parse(zresponse);
							WTW.updateProgressBar(95,100);
							/* note serror would contain errors */
							WTW.completedThingImport('thing', zthingid, zcopywebid);
						}
					);
				}
			}
		);
	} catch (ex) {
		WTW.log("install-thingSearchSelect=" + ex.message);
	}
}

WTWJS.prototype.completedThingImport = function(zmoldgroup, zwebid, zcopywebid) {
	try {
		WTW.updateProgressBar(100,100);
		WTW.copyActionZones(zmoldgroup, zwebid, zcopywebid);
	} catch (ex) {
		WTW.log("install-completedThingImport=" + ex.message);
	}
}

WTWJS.prototype.copyActionZones = function(zmoldgroup, zwebid, zcopywebid) {
	try {
		WTW.updateProgressText("Fetching Action Zones");
		WTW.updateProgressBar(1,100);
		
		var zprogress = 5;
		var zprogressbar = window.setInterval(function() {
			zprogress = WTW.updateProgressBar(zprogress,100) + 5;
			if (zprogress > 78) {
				window.clearInterval(zprogressbar);
			}
		},300);
		var zfield = "";
		var zcommunityid = '';
		var zbuildingid = '';
		var zthingid = '';
		switch (zmoldgroup) {
			case "community":
				zfield = "communityid";
				zcommunityid = zwebid;
				break;
			case "building":
				zfield = "buildingid";
				zbuildingid = zwebid;
				break;
			case "thing":
				zfield = "thingid";
				zthingid = zwebid;
				break;
		}
		if (zfield != "" && zwebid != "" && zcopywebid != "") {
			WTW.getJSON("https://3dnet.walktheweb.com/connect/actionzones.php?" + zfield + "=" + zcopywebid, 
				function(response) {
					window.clearInterval(zprogressbar);
					WTW.updateProgressBar(100,100);
					WTW.updateProgressText("Writing Action Zones");
					WTW.updateProgressBar(10,100);
					response = WTW.cleanInvalidCharacters(response);
					testresponse = JSON.parse(response);
					if (testresponse[0] != undefined) {
						WTW.updateProgressBar(50,100);
						var zrequest = {
							'communityid': zcommunityid,
							'buildingid': zbuildingid,
							'thingid': zthingid,
							'actionzonesbulk': btoa(response),
							'function':'importactionzone'
						};
						WTW.postJSON("/core/handlers/actionzones.php", zrequest, 
							function(zresponse) {
								WTW.updateProgressBar(95,100);
								WTW.completedActionZonesImport(zmoldgroup, zwebid, zcopywebid);
							}
						);
					} else {
						WTW.completedActionZonesImport(zmoldgroup, zwebid, zcopywebid);
					}
				}
			);
		}
	} catch (ex) {
		WTW.log("install-copyActionZones=" + ex.message);
	}
}

WTWJS.prototype.completedActionZonesImport = function(zmoldgroup, zwebid, zcopywebid) {
	try {
		WTW.updateProgressBar(100,100);
		WTW.copyParentConnectingGrids(zmoldgroup, zwebid, zcopywebid);
	} catch (ex) {
		WTW.log("install-completedActionZonesImport=" + ex.message);
	}
}

WTWJS.prototype.copyParentConnectingGrids = function(zmoldgroup, zwebid, zcopywebid) {
	try {
		WTW.updateProgressText("Fetching Connecting Grids");
		WTW.updateProgressBar(1,100);
		
		var zprogress = 5;
		var zprogressbar = window.setInterval(function() {
			zprogress = WTW.updateProgressBar(zprogress,100) + 5;
			if (zprogress > 78) {
				window.clearInterval(zprogressbar);
			}
		},300);
		if (zmoldgroup != "" && zwebid != "" && zcopywebid != "") {
			WTW.getJSON("https://3dnet.walktheweb.com/connect/connectinggrids.php?parentwebtype=%25&childwebtype=" + zmoldgroup + "&childwebid=" + zcopywebid, 
				function(response) {
					window.clearInterval(zprogressbar);
					WTW.updateProgressBar(100,100);
					WTW.updateProgressText("Writing Connecting Grids");
					WTW.updateProgressBar(10,100);
					response = WTW.cleanInvalidCharacters(response);
					testresponse = JSON.parse(response);
					if (testresponse[0] != undefined) {
						WTW.updateProgressBar(50,100);
						var zrequest = {
							'moldgroup': zmoldgroup,
							'webid': zwebid,
							'connectinggridsbulk': btoa(response),
							'function':'importparentconnectinggrids'
						};
						WTW.postJSON("/core/handlers/connectinggrids.php", zrequest, 
							function(zresponse) {
								zresponse = JSON.parse(zresponse);
								WTW.updateProgressBar(95,100);
								/* note serror would contain errors */
								WTW.completedParentConnectingGridsImport(zmoldgroup, zwebid, zcopywebid);
							}
						);
					} else {
						WTW.completedParentConnectingGridsImport(zmoldgroup, zwebid, zcopywebid);
					}
				}
			);			
		}
	} catch (ex) {
		WTW.log("install-copyParentConnectingGrids=" + ex.message);
	}
}

WTWJS.prototype.completedParentConnectingGridsImport = function(zmoldgroup, zwebid, zcopywebid) {
	try {
		WTW.updateProgressBar(100,100);
		WTW.copyConnectingGrids(zmoldgroup, zwebid, zcopywebid);
	} catch (ex) {
		WTW.log("install-completedParentConnectingGridsImport=" + ex.message);
	}
}

WTWJS.prototype.copyConnectingGrids = function(zmoldgroup, zwebid, zcopywebid) {
	try {
		WTW.updateProgressText("Fetching Connecting Grids");
		WTW.updateProgressBar(1,100);
		
		var zprogress = 5;
		var zprogressbar = window.setInterval(function() {
			zprogress = WTW.updateProgressBar(zprogress,100) + 5;
			if (zprogress > 78) {
				window.clearInterval(zprogressbar);
			}
		},300);
		if (zmoldgroup != "" && zwebid != "" && zcopywebid != "") {
			if (zmoldgroup == "community") {
				WTW.getJSON("https://3dnet.walktheweb.com/connect/connectinggrids.php?parentwebtype=community&childwebtype=building&parentwebid=" + zcopywebid + "&limit=1", 
					function(response) {
						window.clearInterval(zprogressbar);
						WTW.updateProgressBar(100,100);
						WTW.updateProgressText("Writing Connecting Grids");
						WTW.updateProgressBar(10,100);
						response = WTW.cleanInvalidCharacters(response);
						testresponse = JSON.parse(response);
						if (testresponse[0] != undefined) {
							WTW.updateProgressBar(50,100);
							var zrequest = {
								'moldgroup': zmoldgroup,
								'webid': zwebid,
								'connectinggridsbulk': btoa(response),
								'function':'importconnectinggrids'
							};
							WTW.postJSON("/core/handlers/connectinggrids.php", zrequest, 
								function(zresponse) {
									zresponse = JSON.parse(zresponse);
									WTW.updateProgressBar(95,100);
									/* note serror would contain errors */
									WTW.completedConnectingGridsImport(zmoldgroup, zwebid, zcopywebid);
								}
							);
						} else {
							WTW.completedConnectingGridsImport(zmoldgroup, zwebid, zcopywebid);
						}
					}
				);
			} else if (zmoldgroup == "building") {
				WTW.updateProgressBar(50,100);
				var zrequest = {
					'moldgroup': zmoldgroup,
					'webid': zwebid,
					'function':'updatechildconnectinggrids'
				};
				WTW.postJSON("/core/handlers/connectinggrids.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						WTW.updateProgressBar(95,100);
						/* note serror would contain errors */
						WTW.completedConnectingGridsImport(zmoldgroup, zwebid, zcopywebid);
					}
				);
			} else {
				WTW.completedConnectingGridsImport(zmoldgroup, zwebid, zcopywebid);
			}
		}
	} catch (ex) {
		WTW.log("install-copyConnectingGrids=" + ex.message);
	}
}

WTWJS.prototype.completedConnectingGridsImport = function(zmoldgroup, zwebid, zcopywebid) {
	try {
		WTW.updateProgressBar(100,100);
		WTW.copyMolds(zmoldgroup, zwebid, zcopywebid);
	} catch (ex) {
		WTW.log("install-completedConnectingGridsImport=" + ex.message);
	}
}

WTWJS.prototype.copyMolds = function(zmoldgroup, zwebid, zcopywebid) {
	try {
		WTW.updateProgressText("Fetching Molds");
		WTW.updateProgressBar(1,100);
		
		var zprogress = 5;
		var zprogressbar = window.setInterval(function() {
			zprogress = WTW.updateProgressBar(zprogress,100) + 5;
			if (zprogress > 78) {
				window.clearInterval(zprogressbar);
			}
		},600);
		if (zmoldgroup != "" && zwebid != "" && zcopywebid != "") {
			WTW.getJSON("https://3dnet.walktheweb.com/connect/" + zmoldgroup + "molds.php?" + zmoldgroup + "id=" + zcopywebid, 
				function(response) {
					window.clearInterval(zprogressbar);
					WTW.updateProgressBar(100,100);
					WTW.updateProgressText("Writing Molds");
					WTW.updateProgressBar(5,100);
					response = WTW.cleanInvalidCharacters(response);
					testresponse = JSON.parse(response);
					if (testresponse[0] != undefined) {
						WTW.updateProgressBar(10,100);
						var zrequest = {
							'moldgroup': zmoldgroup,
							'webid': zwebid,
							'copywebid': zcopywebid,
							'moldsbulk': btoa(response),
							'function':'importmolds'
						};
						WTW.postJSON("/core/handlers/molds.php", zrequest, 
							function(zresponse) {
								zresponse = JSON.parse(zresponse);
								WTW.updateProgressBar(95,100);
								/* note serror would contain errors */
								WTW.completedMoldsImport(zmoldgroup, zwebid, zcopywebid);
							}
						);
					} else {
						WTW.completedMoldsImport(zmoldgroup, zwebid, zcopywebid);
					}
				}
			);
		}
	} catch (ex) {
		WTW.log("install-copyMolds=" + ex.message);
	}
}

WTWJS.prototype.completedMoldsImport = function(zmoldgroup, zwebid, zcopywebid) {
	try {
		WTW.updateProgressBar(100,100);
		WTW.copyWebImages(zmoldgroup, zwebid, zcopywebid);
	} catch (ex) {
		WTW.log("install-completedMoldsImport=" + ex.message);
	}
}

WTWJS.prototype.copyWebImages = function(zmoldgroup, zwebid, zcopywebid) {
	try {
		WTW.updateProgressText("Fetching Web Image Settings");
		WTW.updateProgressBar(1,100);
		
		var zprogress = 5;
		var zprogressbar = window.setInterval(function() {
			zprogress = WTW.updateProgressBar(zprogress,100) + 5;
			if (zprogress > 78) {
				window.clearInterval(zprogressbar);
			}
		},300);
		if (zmoldgroup != "" && zwebid != "" && zcopywebid != "") {
			WTW.getJSON("https://3dnet.walktheweb.com/connect/webimages.php?" + zmoldgroup + "id=" + zcopywebid, 
				function(response) {
					window.clearInterval(zprogressbar);
					WTW.updateProgressBar(100,100);
					WTW.updateProgressText("Writing Web Image Settings");
					WTW.updateProgressBar(10,100);
					response = WTW.cleanInvalidCharacters(response);
					testresponse = JSON.parse(response);
					if (testresponse[0] != undefined) {
						WTW.updateProgressBar(50,100);
						var zrequest = {
							'moldgroup': zmoldgroup,
							'webid': zwebid,
							'copywebid': zcopywebid,
							'webimagesbulk': btoa(response),
							'function':'importwebimages'
						};
						WTW.postJSON("/core/handlers/uploads.php", zrequest, 
							function(zresponse) {
								zresponse = JSON.parse(zresponse);
								WTW.updateProgressBar(95,100);
								/* note serror would contain errors */
								WTW.completedWebImagesImport(zmoldgroup, zwebid, zcopywebid);
							}
						);
					} else {
						WTW.completedWebImagesImport(zmoldgroup, zwebid, zcopywebid);
					}
				}
			);
		}
	} catch (ex) {
		WTW.log("install-copyWebImages=" + ex.message);
	}
}

WTWJS.prototype.completedWebImagesImport = function(zmoldgroup, zwebid, zcopywebid) {
	try {
		WTW.updateProgressBar(100,100);
		WTW.copyUploads(zmoldgroup, zwebid, zcopywebid);
	} catch (ex) {
		WTW.log("install-completedWebImagesImport=" + ex.message);
	}
}

WTWJS.prototype.copyUploads = function(zmoldgroup, zwebid, zcopywebid) {
	try {
		WTW.updateProgressText("Fetching Uploaded Files and Images");
		WTW.updateProgressBar(1,100);
		
		var zprogress = 5;
		var zprogressbar = window.setInterval(function() {
			zprogress = WTW.updateProgressBar(zprogress,100) + 5;
			if (zprogress > 78) {
				window.clearInterval(zprogressbar);
			}
		},1000);
		if (zmoldgroup != "" && zwebid != "" && zcopywebid != "") {
			WTW.getJSON("https://3dnet.walktheweb.com/connect/" + zmoldgroup + "uploads.php?" + zmoldgroup + "id=" + zcopywebid, 
				function(response) {
					window.clearInterval(zprogressbar);
					WTW.updateProgressBar(100,100);
					WTW.updateProgressText("Writing Uploaded Files and Images");
					zprogress = 5;
					zprogressbar = window.setInterval(function() {
						zprogress = WTW.updateProgressBar(zprogress,100) + 5;
						if (zprogress > 78) {
							window.clearInterval(zprogressbar);
						}
					},1000);
					response = WTW.cleanInvalidCharacters(response);
					testresponse = JSON.parse(response);
					if (testresponse[0] != undefined) {
						WTW.updateProgressBar(50,100);
						var zrequest = {
							'moldgroup': zmoldgroup,
							'webid': zwebid,
							'copywebid': zcopywebid,
							'uploadsbulk': btoa(response),
							'function':'importuploads'
						};
						WTW.postJSON("/core/handlers/uploads.php", zrequest, 
							function(zresponse) {
								zresponse = JSON.parse(zresponse);
								WTW.updateProgressBar(95,100);
								/* note serror would contain errors */
								WTW.completedUploadsImport(zmoldgroup, zwebid, zcopywebid);
							}
						);
					} else {
						WTW.completedUploadsImport(zmoldgroup, zwebid, zcopywebid);
					}
				}
			);
		}
	} catch (ex) {
		WTW.log("install-copyUploads=" + ex.message);
	}
}

WTWJS.prototype.completedUploadsImport = function(zmoldgroup, zwebid, zcopywebid) {
	try {
		WTW.updateProgressBar(100,100);
		WTW.copyMoldPoints(zmoldgroup, zwebid, zcopywebid);
	} catch (ex) {
		WTW.log("install-completedUploadsImport=" + ex.message);
	}
}

WTWJS.prototype.copyMoldPoints = function(zmoldgroup, zwebid, zcopywebid) {
	try {
		WTW.updateProgressText("Fetching Mold Points");
		WTW.updateProgressBar(1,100);
		
		var zprogress = 5;
		var zprogressbar = window.setInterval(function() {
			zprogress = WTW.updateProgressBar(zprogress,100) + 5;
			if (zprogress > 78) {
				window.clearInterval(zprogressbar);
			}
		},300);
		if (zmoldgroup != "" && zwebid != "" && zcopywebid != "") {
			WTW.getJSON("https://3dnet.walktheweb.com/connect/moldpoints.php?" + zmoldgroup + "id=" + zcopywebid, 
				function(response) {
					window.clearInterval(zprogressbar);
					WTW.updateProgressBar(100,100);
					WTW.updateProgressText("Writing Mold Points");
					WTW.updateProgressBar(10,100);
					response = WTW.cleanInvalidCharacters(response);
					testresponse = JSON.parse(response);
					if (testresponse[0] != undefined) {
						WTW.updateProgressBar(50,100);
						var zrequest = {
							'moldgroup': zmoldgroup,
							'webid': zwebid,
							'copywebid': zcopywebid,
							'moldsbulk': btoa(response),
							'function':'importmoldpoints'
						};
						WTW.postJSON("/core/handlers/molds.php", zrequest, 
							function(zresponse) {
								zresponse = JSON.parse(zresponse);
								WTW.updateProgressBar(95,100);
								/* note serror would contain errors */
								WTW.completedMoldPointsImport(zmoldgroup, zwebid, zcopywebid);
							}
						);
					} else {
						WTW.completedMoldPointsImport(zmoldgroup, zwebid, zcopywebid);
					}
				}
			);
		}
	} catch (ex) {
		WTW.log("install-copyMoldPoints=" + ex.message);
	}
}

WTWJS.prototype.completedMoldPointsImport = function(zmoldgroup, zwebid, zcopywebid) {
	try {
		WTW.updateProgressText("3D Community Import Completed");
		WTW.updateProgressBar(100,100);
		var isinstall = true;
		if (WTW.adminView != undefined) {
			if (WTW.adminView == 1) {
				isinstall = false;
			}
		}
		if (isinstall) {
			window.location.href = "/";
		} else {
			WTW.hide('wtw_installprogress');
			WTW.hide('wtw_commtempsearchresults');
			WTW.hide('wtw_buildtempsearchresults');
			WTW.hide('wtw_thingtempsearchresults');
			WTW.show('wtw_downloadcomplete');
			switch (zmoldgroup) {
				case "community":
					dGet('wtw_downloadcompletemessage').innerHTML = "You can find your <b>New 3D Community</b> in the <b>Admin Menu</b><br />or select from the following:";
					dGet('wtw_bopenwebdownload').value = "Open Your New 3D Community in the Editor";
					dGet('wtw_bcontinuewebdownload').onclick = function() { WTW.openFullPageForm('importpage','communities'); };
					WTW.hideAdminMenu();
					WTW.getSelectCommunitiesList();
					WTW.show('wtw_adminmenu22');
					break;
				case "building":
					dGet('wtw_downloadcompletemessage').innerHTML = "You can find your <b>New 3D Building</b> in the <b>Admin Menu</b><br />or select from the following:";
					dGet('wtw_bopenwebdownload').value = "Open Your New 3D Building in the Editor";
					dGet('wtw_bcontinuewebdownload').onclick = function() { WTW.openFullPageForm('importpage','buildings'); };
					WTW.hideAdminMenu();
					WTW.getSelectBuildingsList();
					WTW.show('wtw_adminmenu2');
					break;
				case "thing":
					dGet('wtw_downloadcompletemessage').innerHTML = "You can find your <b>New 3D Thing</b> in the <b>Admin Menu</b><br />or select from the following:";
					dGet('wtw_bopenwebdownload').value = "Open Your New 3D Thing in the Editor";
					dGet('wtw_bcontinuewebdownload').onclick = function() { WTW.openFullPageForm('importpage','things'); };
					WTW.hideAdminMenu();
					WTW.getSelectThingsList();
					WTW.show('wtw_adminmenu32');
					break;
			}
			dGet('wtw_bopenwebdownload').onclick = function() { window.location.href = '/admin.php?'+ zmoldgroup + 'id=' + zwebid; };
			WTW.show('wtw_selectwebform');
		}
	} catch (ex) {
		WTW.log("install-completedMoldPointsImport=" + ex.message);
	}
}

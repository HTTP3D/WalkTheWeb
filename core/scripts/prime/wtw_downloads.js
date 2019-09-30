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
					/* function for after iframe loads */
					var onload = function(ipage) {
						var zcommunityid = WTW.getRandomString(16);
						ipage.getElementById('wtw_tcommunityid').value = zcommunityid;
						ipage.getElementById('wtw_tpastcommunityid').value = zcopywebid;
						ipage.getElementById('wtw_tcommunityname').value = community.communityinfo.communityname;
						ipage.getElementById('wtw_tcommunityanalyticsid').value = '';
						ipage.getElementById('wtw_tmoldgroup').value = 'community';
						ipage.getElementById('wtw_twebid').value = zcommunityid;
						ipage.getElementById('wtw_tcopywebid').value = zcopywebid;
						ipage.getElementById('wtw_tstartpositionx').value = community.position.x;
						ipage.getElementById('wtw_tstartpositiony').value = community.position.y;
						ipage.getElementById('wtw_tstartpositionz').value = community.position.x;
						ipage.getElementById('wtw_tstartscalingx').value = community.scaling.x;
						ipage.getElementById('wtw_tstartscalingy').value = community.scaling.y;
						ipage.getElementById('wtw_tstartscalingz').value = community.scaling.z;
						ipage.getElementById('wtw_tstartrotationx').value = community.rotation.x;
						ipage.getElementById('wtw_tstartrotationy').value = community.rotation.y;
						ipage.getElementById('wtw_tstartrotationz').value = community.rotation.z;
						ipage.getElementById('wtw_tgravity').value = community.ground.gravity;
						ipage.getElementById('wtw_ttextureid').value = community.graphics.texture.id;
						ipage.getElementById('wtw_tskydomeid').value = community.graphics.sky.id;
						ipage.getElementById('wtw_tskyinclination').value = community.graphics.sky.skyinclination;
						ipage.getElementById('wtw_tskyluminance').value = community.graphics.sky.skyluminance;
						ipage.getElementById('wtw_tskyazimuth').value = community.graphics.sky.skyazimuth;
						ipage.getElementById('wtw_tskyrayleigh').value = community.graphics.sky.skyrayleigh;
						ipage.getElementById('wtw_tskyturbidity').value = community.graphics.sky.skyturbidity;
						ipage.getElementById('wtw_tskymiedirectionalg').value = community.graphics.sky.skymiedirectionalg;
						ipage.getElementById('wtw_tskymiecoefficient').value = community.graphics.sky.skymiecoefficient;
						ipage.getElementById('wtw_tgroundpositiony').value = community.ground.position.y;
						ipage.getElementById('wtw_twaterpositiony').value = community.water.position.y;
						ipage.getElementById('wtw_talttag').value = community.communityinfo.alttag;
						WTW.updateProgressBar(50,100);
						ipage.getElementById('wtw_bimportcommunity').click();
					}
					/* iframe src, onload function */
					var iframe = WTW.createIFrame('/core/iframes/communities.php', onload);
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
					/* function for after iframe loads */
					var onload = function(ipage) {
						var zbuildingid = WTW.getRandomString(16);
						ipage.getElementById('wtw_tbuildingid').value = zbuildingid;
						ipage.getElementById('wtw_tpastbuildingid').value = zcopywebid;
						ipage.getElementById('wtw_tbuildingname').value = building.buildinginfo.buildingname;
						ipage.getElementById('wtw_tbuildinganalyticsid').value = '';
						ipage.getElementById('wtw_tmoldgroup').value = 'building';
						ipage.getElementById('wtw_twebid').value = zbuildingid;
						ipage.getElementById('wtw_tcopywebid').value = zcopywebid;
						ipage.getElementById('wtw_tstartpositionx').value = building.position.x;
						ipage.getElementById('wtw_tstartpositiony').value = building.position.y;
						ipage.getElementById('wtw_tstartpositionz').value = building.position.x;
						ipage.getElementById('wtw_tstartscalingx').value = building.scaling.x;
						ipage.getElementById('wtw_tstartscalingy').value = building.scaling.y;
						ipage.getElementById('wtw_tstartscalingz').value = building.scaling.z;
						ipage.getElementById('wtw_tstartrotationx').value = building.rotation.x;
						ipage.getElementById('wtw_tstartrotationy').value = building.rotation.y;
						ipage.getElementById('wtw_tstartrotationz').value = building.rotation.z;
						ipage.getElementById('wtw_tgravity').value = building.gravity;
						ipage.getElementById('wtw_talttag').value = building.buildinginfo.alttag;
						WTW.updateProgressBar(50,100);
						ipage.getElementById('wtw_bimportbuilding').click();
					}
					/* iframe src, onload function */
					var iframe = WTW.createIFrame('/core/iframes/buildings.php', onload);
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
					/* function for after iframe loads */
					var onload = function(ipage) {
						var zthingid = WTW.getRandomString(16);
						ipage.getElementById('wtw_tthingid').value = zthingid;
						ipage.getElementById('wtw_tpastthingid').value = zcopywebid;
						ipage.getElementById('wtw_tthingname').value = thing.thinginfo.thingname;
						ipage.getElementById('wtw_tthinganalyticsid').value = '';
						ipage.getElementById('wtw_tmoldgroup').value = 'thing';
						ipage.getElementById('wtw_twebid').value = zthingid;
						ipage.getElementById('wtw_tcopywebid').value = zcopywebid;
						ipage.getElementById('wtw_tstartpositionx').value = thing.position.x;
						ipage.getElementById('wtw_tstartpositiony').value = thing.position.y;
						ipage.getElementById('wtw_tstartpositionz').value = thing.position.x;
						ipage.getElementById('wtw_tstartscalingx').value = thing.scaling.x;
						ipage.getElementById('wtw_tstartscalingy').value = thing.scaling.y;
						ipage.getElementById('wtw_tstartscalingz').value = thing.scaling.z;
						ipage.getElementById('wtw_tstartrotationx').value = thing.rotation.x;
						ipage.getElementById('wtw_tstartrotationy').value = thing.rotation.y;
						ipage.getElementById('wtw_tstartrotationz').value = thing.rotation.z;
						ipage.getElementById('wtw_tgravity').value = thing.gravity;
						ipage.getElementById('wtw_talttag').value = thing.thinginfo.alttag;
						WTW.updateProgressBar(50,100);
						ipage.getElementById('wtw_bimportthing').click();
					}
					/* iframe src, onload function */
					var iframe = WTW.createIFrame('/core/iframes/things.php', onload);
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
		switch (zmoldgroup) {
			case "community":
				zfield = "communityid";
				break;
			case "building":
				zfield = "buildingid";
				break;
			case "thing":
				zfield = "thingid";
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
						/* function for after iframe loads */
						var onload = function(ipage) {
							ipage.getElementById('wtw_tmoldgroup').value = zmoldgroup;
							ipage.getElementById('wtw_twebid').value = zwebid;
							ipage.getElementById('wtw_tcopywebid').value = zcopywebid;
							ipage.getElementById('wtw_tcommunityid').value = '';
							ipage.getElementById('wtw_tbuildingid').value = '';
							ipage.getElementById('wtw_tthingid').value = '';
							ipage.getElementById('wtw_t' + zmoldgroup + 'id').value = zwebid;
							ipage.getElementById('wtw_tactionzonesbulk').value = btoa(response);
							WTW.updateProgressBar(50,100);
							ipage.getElementById('wtw_bimportactionzone').click();
						}
						/* iframe src, onload function */
						var iframe = WTW.createIFrame('/core/iframes/actionzones.php', onload);
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
						/* function for after iframe loads */
						var onload = function(ipage) {
							ipage.getElementById('wtw_tmoldgroup').value = zmoldgroup;
							ipage.getElementById('wtw_twebid').value = zwebid;
							ipage.getElementById('wtw_tcopywebid').value = zcopywebid;
							ipage.getElementById('wtw_tparentwebid').value = '';
							ipage.getElementById('wtw_tparentwebtype').value = '';
							ipage.getElementById('wtw_tchildwebid').value = zwebid;
							ipage.getElementById('wtw_tchildwebtype').value = zmoldgroup;
							ipage.getElementById('wtw_tconnectinggridsbulk').value = btoa(response);
							WTW.updateProgressBar(50,100);
							ipage.getElementById('wtw_bimportparentconnectinggrids').click();
						}
						/* iframe src, onload function */
						var iframe = WTW.createIFrame('/core/iframes/connectinggrids.php', onload);
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
							/* function for after iframe loads */
							var onload = function(ipage) {
								ipage.getElementById('wtw_tmoldgroup').value = zmoldgroup;
								ipage.getElementById('wtw_twebid').value = zwebid;
								ipage.getElementById('wtw_tcopywebid').value = zcopywebid;
								ipage.getElementById('wtw_tparentwebid').value = zwebid;
								ipage.getElementById('wtw_tparentwebtype').value = zmoldgroup;
								ipage.getElementById('wtw_tchildwebid').value = '';
								ipage.getElementById('wtw_tchildwebtype').value = '';
								ipage.getElementById('wtw_tconnectinggridsbulk').value = btoa(response);
								WTW.updateProgressBar(50,100);
								ipage.getElementById('wtw_bimportconnectinggrids').click();
							}
							/* iframe src, onload function */
							var iframe = WTW.createIFrame('/core/iframes/connectinggrids.php', onload);
						} else {
							WTW.completedConnectingGridsImport(zmoldgroup, zwebid, zcopywebid);
						}
					}
				);
			} else if (zmoldgroup == "building") {
				/* function for after iframe loads */
				var onload = function(ipage) {
					ipage.getElementById('wtw_tmoldgroup').value = zmoldgroup;
					ipage.getElementById('wtw_twebid').value = zwebid;
					ipage.getElementById('wtw_tcopywebid').value = zcopywebid;
					WTW.updateProgressBar(50,100);
					ipage.getElementById('wtw_bupdatechildconnectinggrids').click();
				}
				/* iframe src, onload function */
				var iframe = WTW.createIFrame('/core/iframes/connectinggrids.php', onload);
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
						/* function for after iframe loads */
						var onload = function(ipage) {
							ipage.getElementById('wtw_tmoldgroup').value = zmoldgroup;
							ipage.getElementById('wtw_twebid').value = zwebid;
							ipage.getElementById('wtw_tcopywebid').value = zcopywebid;
							ipage.getElementById('wtw_tmoldsbulk').value = btoa(response);
							WTW.updateProgressBar(10,100);
							ipage.getElementById('wtw_bimportmolds').click();
						}
						/* iframe src, onload function */
						var iframe = WTW.createIFrame('/core/iframes/molds.php', onload);
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
						/* function for after iframe loads */
						var onload = function(ipage) {
							ipage.getElementById('wtw_tmoldgroup').value = zmoldgroup;
							ipage.getElementById('wtw_twebid').value = zwebid;
							ipage.getElementById('wtw_tcopywebid').value = zcopywebid;
							ipage.getElementById('wtw_twebimagesbulk').value = btoa(response);
							WTW.updateProgressBar(50,100);
							ipage.getElementById('wtw_bimportwebimages').click();
						}
						/* iframe src, onload function */
						var iframe = WTW.createIFrame('/core/iframes/uploads.php', onload);
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
						/* function for after iframe loads */
						var onload = function(ipage) {
							ipage.getElementById('wtw_tmoldgroup').value = zmoldgroup;
							ipage.getElementById('wtw_twebid').value = zwebid;
							ipage.getElementById('wtw_tcopywebid').value = zcopywebid;
							ipage.getElementById('wtw_tuploadsbulk').value = btoa(response);
							ipage.getElementById('wtw_bimportuploads').click();
						}
						/* iframe src, onload function */
						var iframe = WTW.createIFrame('/core/iframes/uploads.php', onload);
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
						/* function for after iframe loads */
						var onload = function(ipage) {
							ipage.getElementById('wtw_tmoldgroup').value = zmoldgroup;
							ipage.getElementById('wtw_twebid').value = zwebid;
							ipage.getElementById('wtw_tcopywebid').value = zcopywebid;
							ipage.getElementById('wtw_tmoldsbulk').value = btoa(response);
							WTW.updateProgressBar(50,100);
							ipage.getElementById('wtw_bimportmoldpoints').click();
						}
						/* iframe src, onload function */
						var iframe = WTW.createIFrame('/core/iframes/molds.php', onload);
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

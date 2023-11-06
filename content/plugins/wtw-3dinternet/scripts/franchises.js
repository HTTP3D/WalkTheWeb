/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* franchise functions */

WTW_3DINTERNET.prototype.showFranchise = function(zobj, zwebtype) {
	/* toggle Local vs Internet */
	try {
		switch (zobj.id) {
			case 'wtw_' + zwebtype + 'buttonlocal':
				dGet('wtw_' + zwebtype + 'buttonlocal').className = 'wtw-localbuttonselected';
				dGet('wtw_' + zwebtype + 'buttoninternet').className = 'wtw-localbutton';
				WTW.hide('wtw_' + zwebtype + 'internetdiv');
				switch (zwebtype) {
					case 'community':
						//WTW.getAddCommunityList();
						break;
					case 'building':
						wtw3dinternet.getAddBuildingList();
						break;
					case 'thing':
						wtw3dinternet.getAddThingList();
						break;
				}
				break;
			case 'wtw_' + zwebtype + 'buttoninternet':
				dGet('wtw_' + zwebtype + 'buttoninternet').className = 'wtw-localbuttonselected';
				dGet('wtw_' + zwebtype + 'buttonlocal').className = 'wtw-localbutton';
				WTW.show('wtw_' + zwebtype + 'internetdiv');
				dGet('wtw_' + zwebtype + 'buttonlist').innerHTML = '';
				dGet('wtw_franchise' + zwebtype + 'search').value = '3d.';
				dGet('wtw_franchise' + zwebtype + 'search').focus();
				break;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-franchises.js-showFranchise=' + ex.message);
	}		
}

WTW_3DINTERNET.prototype.getFranchiseList = async function(zwebtype) {
	/* 3D Buildings and 3D Things can be added to 3D Communities */
	/* 3D Things can also be added to 3D Buildings */
	/* this function creates a list of 3D Webs (by webtype) to add */
	try {
		WTW.hide('wtw_' + zwebtype + 'buttonlist');
		WTW.show('wtw_loading' + zwebtype + 'buttonlist');
		dGet('wtw_' + zwebtype + 'buttonlist').innerHTML = '';
		var zrequest = {
			'domainname': dGet('wtw_franchise' + zwebtype + 'search').value,
			'webtype': zwebtype,
			'function':'getfranchises'
		};
		WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/franchises.php', zrequest,
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zbuttonlist = '';
				if (zresponse != null) {
					for (var i = 0; i < zresponse.length; i++) {
						if (zresponse[i] != null) {
							zbuttonlist += "<div id='wtw_badd' + zwebtype + 'mold" + zresponse[i].franchiseid + "' onclick=\"WTW.addConnectingGrid('" + zwebtype + "', '', '" + zresponse[i].sitename + "', '" + zresponse[i].franchiseid + "', '" + zresponse[i].serverfranchiseid + "', '" + zresponse[i].webalias + "');\" class='wtw-menulevel2'>";
							if (zresponse[i].sitepreview != '') {
								zbuttonlist += "<img src='" + zresponse[i].sitepreview + "' style='width:100%;height:auto;' /><br />";
							}
							zbuttonlist += "<b>" + zresponse[i].sitename + "</b><br /><div class='wtw-menusmalltext'>" + zresponse[i].sitedescription + "</div></div>\r\n";
						}
					}
				}
				dGet('wtw_' + zwebtype + 'buttonlist').innerHTML = zbuttonlist;
				WTW.hide('wtw_loading' + zwebtype + 'buttonlist');
				WTW.show('wtw_' + zwebtype + 'buttonlist');
				WTW.setWindowSize();
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-franchises.js-getFranchiseList=' + ex.message);
	}		
}

WTW_3DINTERNET.prototype.saveAliasForm = async function(zoption, zhostuserid, zwebaliasid, zdomainname, zforcehttps, zwebalias, zaliascommunityid, zaliasbuildingid, zaliasthingid, zcommunitypublishname, zbuildingpublishname, zthingpublishname, zfoundfranchiseid, zfranchise, zsiteiconpath, zsitepreview) {
	/* save changes to web alias url */
	try {
		switch (zoption) {
			case 1: /* save */
				var zrequest = {
					'serverinstanceid': dGet('wtw_serverinstanceid').value,
					'serverip': dGet('wtw_serverip').value,
					'userid': dGet('wtw_tuserid').value,
					'userip': dGet('wtw_tuserip').value,
					'hostuserid': zhostuserid,
					'globaluserid': dGet('wtw_tglobaluserid').value,
					'usertoken': dGet('wtw_tusertoken').value,
					'webaliasid': zwebaliasid,
					'domainname': zdomainname,
					'domainurl': wtw_domainurl,
					'instanceid': dGet('wtw_tinstanceid').value,
					'displayname': dGet('wtw_tdisplayname').value,
					'email': dGet('wtw_tuseremail').value,
					'uploadpathid': dGet('wtw_tuploadpathid').value,
					'forcehttps': zforcehttps,
					'webalias': zwebalias,
					'communityid': zaliascommunityid,
					'buildingid': zaliasbuildingid,
					'thingid': zaliasthingid,
					'communitypublishname': zcommunitypublishname,
					'buildingpublishname': zbuildingpublishname,
					'thingpublishname': zthingpublishname,
					'franchiseid': zfoundfranchiseid,
					'franchise': zfranchise,
					'sitename': dGet('wtw_aliassitename').value,
					'sitedescription': dGet('wtw_aliassitedescription').value,
					'siteiconid': dGet('wtw_taliassiteiconid').value,
					'siteiconpath': zsiteiconpath,
					'sitepreview': zsitepreview,
					'function':'franchisechange'
				};
				WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/franchises.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						if (zresponse.franchiseid != undefined) {
							if (zresponse.franchiseid != '') {
								/* save franchiseid locally */
								var zrequest = {
									'webaliasid': zwebaliasid,
									'franchiseid': zresponse.franchiseid,
									'function':'updatefranchiseid'
								};
								WTW.postAsyncJSON('/core/handlers/wtw-3dinternet-franchises.php', zrequest, 
									function(zresponse) {
										zresponse = JSON.parse(zresponse);	
										
									}
								);					
								
							}
						}
					}
				);
			break;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-franchises.js-saveAliasForm=' + ex.message);
	}		
}

WTW_3DINTERNET.prototype.getAddBuildingList = async function() {
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
		WTW.log('plugins:wtw-3dinternet:scripts-franchises.js-getAddBuildingList=' + ex.message);
	}		
}

WTW_3DINTERNET.prototype.getAddThingList = async function() {
	/* 3D Things can be added to 3D Communities and 3D Buildings */
	/* this function creates a list of 3D Things to add */
	try {
		WTW.hide('wtw_thingbuttonlist');
		WTW.show('wtw_loadingthingbuttonlist');
		dGet('wtw_thingbuttonlist').innerHTML = '';
		WTW.getAsyncJSON('/connect/things.php?userid=' + dGet('wtw_tuserid').value, 
			function(zresponse) {
				WTW.things = JSON.parse(zresponse);
				if (WTW.things != null) {
					for (var i = 0; i < WTW.things.length; i++) {
						if (WTW.things[i] != null) {
							dGet("wtw_thingbuttonlist").innerHTML += "<div id='wtw_baddbthingmold" + WTW.things[i].thinginfo.thingid + "' onclick=\"WTW.addConnectingGrid('thing', '" + WTW.things[i].thinginfo.thingid + "', '" + WTW.things[i].thinginfo.thingname + "');\" class='wtw-menulevel2'>" + WTW.things[i].thinginfo.thingname + "</div>\r\n";
						}
					}
				}
				WTW.hide('wtw_loadingthingbuttonlist');
				WTW.show('wtw_thingbuttonlist');
				WTW.setWindowSize();
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-franchises.js-getAddThingList=' + ex.message);
	}		
}


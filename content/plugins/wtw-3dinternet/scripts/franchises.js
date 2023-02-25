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
						WTW.getAddBuildingList();
						break;
					case 'thing':
						WTW.getAddThingList();
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
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-showFranchise=' + ex.message);
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
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-getFranchiseList=' + ex.message);
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
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-saveAliasForm=' + ex.message);
	}		
}

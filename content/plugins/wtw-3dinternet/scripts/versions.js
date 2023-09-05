/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* check for updates */
WTW_3DINTERNET.prototype.checkForUpdates = async function(zshow, zfilter) {
	/* check for updates for WalkTheWeb, 3D Plugins, 3D Communities, 3D Buildings, 3D Things, and 3D Avatars */
	try {
		wtw3dinternet.checkUpdatesForAllWebs();
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-versions.js-checkForUpdates=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.getPluginInfoComplete = async function(zmyplugins, zplugins, zshow, zfilter) {
	/* process the retrieved 3D Plugins information */
	try {
		/* get update information for 3D Plugins */
		WTW.getAsyncJSON('https://3dnet.walktheweb.com/connect/checkforupdates.php?list=2&pluginnames=' + zplugins, 
			function(zupdateinfo) {
				zupdateinfo = JSON.parse(zupdateinfo);
				wtw3dinternet.checkForUpdatesComplete(zmyplugins, zupdateinfo, zshow, zfilter);
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-versions.js-getPluginInfoComplete=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.checkForUpdatesComplete = function(zmyplugins, zupdateinfo, zshow, zfilter) {
	/* compare and set updates for 3D Plugins */
	try {
		if (zmyplugins != null) {
			for (var i=0;i<zmyplugins.length;i++) {
				if (zmyplugins[i] != null) {
					if (zmyplugins[i].pluginname != undefined && zmyplugins[i].version != undefined) {
						if (zupdateinfo != null) {
							if (zupdateinfo.versions != null) {
								for (var j=0;j<zupdateinfo.versions.length;j++) {
									if (zupdateinfo.versions[j] != null) {
										if (zupdateinfo.versions[j].pluginname != undefined && zupdateinfo.versions[j].version != undefined) {
											if (zmyplugins[i].pluginname.toLowerCase() == zupdateinfo.versions[j].pluginname.toLowerCase()) {
												zmyplugins[i].latestversion = zupdateinfo.versions[j].version;
												zmyplugins[i].updatedate = zupdateinfo.versions[j].updatedate;
												zmyplugins[i].updateurl = zupdateinfo.versions[j].updateurl;
												zmyplugins[i].updateid = zupdateinfo.versions[j].updateid;
											}
										}
									}
								}
							}
							if (zupdateinfo.plugins != null) {
								for (var j=0;j<zupdateinfo.plugins.length;j++) {
									if (zupdateinfo.plugins[j] != null) {
										if (zupdateinfo.plugins[j].pluginname != undefined && zupdateinfo.plugins[j].authoruserid != undefined) {
											if (zmyplugins[i].pluginname.toLowerCase() == zupdateinfo.plugins[j].pluginname.toLowerCase()) {
												zmyplugins[i].authoruserid = zupdateinfo.plugins[j].authoruserid;
											}
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
		var zupdateslist = "<div class='wtw-dashboardboxleft'>";
		if (dGet('wtw_pluginslisttitle') != null) {
			if (wtw3dinternet.masterPlugins == '1') {
				dGet('wtw_pluginslisttitle').innerHTML = "<div id='wtw_addplugin' class='wtw-greenbuttonright' onclick=\"WTW.openFullPageForm('importpage','plugins');\">Add New</div>" + zfilter;
			} else {
				dGet('wtw_pluginslisttitle').innerHTML = "<div id='wtw_addplugin' class='wtw-greenbuttonright' onclick=\"WTW.openFullPageForm('importpage','plugins');\" style=\"display:none;visibility:hidden;\">Add New</div>" + zfilter;
			}
		}
		var zpluginslist = '';
		if (zmyplugins != null) {
			if (zmyplugins.length > 0) {
				if (zshow == '1') {
					zpluginslist += "<div class='wtw-dashboardboxleftfull'>";
					zpluginslist += "<div class='wtw-dashboardboxtitle'>Plugins: Updates Available!</div><div class='wtw-dashboardbox'>";
				}
				zpluginslist += "<table class='wtw-table'><tr>";
				zpluginslist += "<td class='wtw-tablecolumnheading'>&nbsp;</td>";
				zpluginslist += "<td class='wtw-tablecolumnheading'>Plugin Name</td>";
				zpluginslist += "<td class='wtw-tablecolumnheading'>Details</td>";
				zpluginslist += "<td class='wtw-tablecolumnheading'>&nbsp;</td>";
				zpluginslist += "<td class='wtw-tablecolumnheading'>&nbsp;</td>";
				zpluginslist += "</tr>";
				for (var i=0;i < zmyplugins.length;i++) {
					if (zmyplugins[i] != null) {
						if (zmyplugins[i].pluginname != undefined && zmyplugins[i].version != undefined && zmyplugins[i].latestversion != undefined) {
							if (zmyplugins[i].pluginname == 'walktheweb') {
								var zupdatedate = new Date(zmyplugins[i].updatedate);
								var zdatestring = (zupdatedate.getMonth()+1) + '/' + zupdatedate.getDate() + '/' + zupdatedate.getFullYear();
								if (zmyplugins[i].latestversion == wtw_version) {
									zupdateslist += "<div class='wtw-dashboardboxtitle'>WalkTheWeb is up to date!</div><div class='wtw-dashboardbox'><b>Your Version:</b><hr />";
									zupdateslist += 'App Name=' + zmyplugins[i].pluginname + '<br />';
									zupdateslist += 'App Version=' + zmyplugins[i].latestversion + '<br />';
									zupdateslist += 'Last Update=' + zdatestring + '<br />';
								} else {
									var zversiondate = new Date(wtw_versiondate);
									var zversiondatestring = (zversiondate.getMonth()+1) + '/' + zversiondate.getDate() + '/' + zversiondate.getFullYear();
									zupdateslist += "<div class='wtw-dashboardboxtitle'>WalkTheWeb has an update!</div><div class='wtw-dashboardbox'>Your Version: " + wtw_version + " (" + zversiondatestring + ")<br /><br />";
									zupdateslist += '<b>New Version Available:</b><hr />';
									zupdateslist += 'App Name=' + zmyplugins[i].pluginname + '<br />';
									zupdateslist += 'App Version=' + zmyplugins[i].latestversion + '<br />';
									zupdateslist += 'App Update=' + zdatestring + '<br />';
									zupdateslist += 'Backup your files &amp; database before updating!<br />';
									zupdatewtw += 1;
								}
								zupdateslist += "<div id='wtw_loadingupdating' class='wtw-loadingnotice'>Updating...</div>";
								if (zmyplugins[i].latestversion != wtw_version && WTW.isUserInRole('Admin')) {
									zupdateslist += "<div class='wtw-greenmenubutton' onclick=\"WTW.updateWalkTheWeb('" + zmyplugins[i].pluginname + "','" + zmyplugins[i].latestversion + "','" + zdatestring + "','" + zmyplugins[i].updateurl + "');\">Update Now!</div>";
									wtw3dinternet.getVersionDetails(zmyplugins[i].updateid);
								}
								zupdateslist += "</div>";
							} else {
								if (zmyplugins[i].version != zmyplugins[i].latestversion || zshow == '2') {
									var zpluginclass = 'wtw-deactive';
									var ztdclass = 'wtw-tddeactive';
									if (zmyplugins[i].active == '1') {
										zpluginclass = 'wtw-active';
										ztdclass = 'wtw-tdactive';
									}
									if (zmyplugins[i].required == '1') {
										zrequired = ' checked ';
										zhasrequirements = true;
										if (zmyplugins[i].active != '1') {
											ztdclass = 'wtw-tdactiverequired';
										}
									}
									if (zmyplugins[i].optional == '1') {
										zoptional = ' checked ';
										zhasrequirements = true;
										if (zmyplugins[i].active != '1') {
											ztdclass = 'wtw-tdactiveoptional';
										}
									}
									if (zfilter == 'All 3D Plugins' || (zpluginclass == 'wtw-active' && zfilter == 'Active 3D Plugins') || (zpluginclass == 'wtw-deactive' && zfilter == 'Inactive 3D Plugins')) {
										zpluginslist += "<tr><td class='wtw-tablecolumns " + ztdclass + "'>";
										if (zmyplugins[i].imageurl != '') {
											zpluginslist += "<img src='" + zmyplugins[i].imageurl + "' style='width:75px;height:auto;' />";
										}
										zpluginslist += "</td>";
										zpluginslist += "<td class='wtw-tablecolumns " + ztdclass + "'>";
										if (zmyplugins[i].version != zmyplugins[i].latestversion && WTW.isUserInRole('Admin')) {
											zpluginslist += "<div id='updateplugin" + zmyplugins[i].pluginname + "' class='wtw-greenbuttonleft' onclick=\"WTW.updatePlugin('" + zmyplugins[i].pluginname + "','" + zmyplugins[i].version + "','" + zmyplugins[i].updatedate + "','" + zmyplugins[i].updateurl + "','" + zshow + "');\">Update Now!</div>";
											zupdates += 1;
										}
										zpluginslist += " <span class='" + zpluginclass + "'>" + zmyplugins[i].pluginname + "</span><br />Version: " + zmyplugins[i].version + "</td>";
										zpluginslist += "<td class='wtw-tablecolumns " + ztdclass + "'><span class='" + zpluginclass + "'>" + zmyplugins[i].title + "</span> : " + zmyplugins[i].author + "<br />" + zmyplugins[i].description + "<br /></td>";
										zpluginslist += "<td class='wtw-tablecolumns " + ztdclass + "'>";
										if (zmyplugins[i].active == '1' && (zmyplugins[i].authoruserid == '' || (dGet('wtw_tuserid').value == zmyplugins[i].authoruserid && zmyplugins[i].version != zmyplugins[i].latestversion))) {
											zpluginslist += "<div id='wtw_share_" + zmyplugins[i].pluginname + "' class='wtw-greenbuttonright' onclick=\"WTW.openSharePlugin('" + zmyplugins[i].pluginname + "');\" alt='Click to Share' title='Click to Share'>Share</div>";
										}
										zpluginslist += "</td><td class='wtw-tablecolumns " + ztdclass + "'>";
										if (zmyplugins[i].active == '1') {
											if (WTW.isUserInRole('Admin')) {
												zpluginslist += "<div id='wtw_activate_" + zmyplugins[i].pluginname + "' class='wtw-bluebuttonright' onclick=\"WTW.activatePlugin('" + zmyplugins[i].pluginname + "',0);\" alt='Click to Deactivate' title='Click to Deactivate'>Activated</div>";
											} else {
												zpluginslist += "<div id='wtw_activate_" + zmyplugins[i].pluginname + "' class='wtw-bluebuttonright' onclick=\"console.log('Will Not Deactivate');\" alt='' title=''>Activated</div>";
											}
										} else {
											if (WTW.isUserInRole('Admin')) {
												zpluginslist += "<div id='wtw_activate_" + zmyplugins[i].pluginname + "' class='wtw-yellowbuttonright' onclick=\"WTW.activatePlugin('" + zmyplugins[i].pluginname + "',1);\" alt='Click to Activate' title='Click to Activate'>Deactivated</div>";
											} else {
												zpluginslist += "<div id='wtw_activate_" + zmyplugins[i].pluginname + "' class='wtw-yellowbuttonright' onclick=\"console.log('Request Activation');\" alt='Click to Request Activate' title='Click to Request Activate'>Deactivated</div>";
											}
										}
										zpluginslist += "</td></tr>";
										if (zmyplugins[i].active != '1' && zmyplugins[i].websrequired != undefined) {
											if (zmyplugins[i].websrequired.length > 0) {
												zpluginslist += "<tr><td></td><td style='text-align:right;vertical-align:top;padding:5px;font-weight:bold;' >Dependents:</td><td class='wtw-tablecolumnheading wtw-tdactiveoptional'>";
												for (var j=0;j<zmyplugins[i].websrequired.length;j++) {
													if (zmyplugins[i].websrequired[j] != null) {
														var zrequiredtext = 'Required';
														if (zmyplugins[i].websrequired[j].optional == '1') {
															zrequiredtext = 'Optional';
														}
														zpluginslist += "<div><div class='wtw-pluginreqopt'>" + zrequiredtext + "</div><div style='width:150px;display:inline-block;min-height:12px;'>3D " + zmyplugins[i].websrequired[j].webtype + "</div><a href='/admin.php?" + zmyplugins[i].websrequired[j].webtype.toLowerCase() + "id=" + zmyplugins[i].websrequired[j].webid + "'>" + zmyplugins[i].websrequired[j].webname + "</a><div class='wtw-clear'></div></div>";
													}
												}
												zpluginslist += "</td>&nbsp;<td></td><td></td></tr>";
											}
										}
									}
								}
							}
						}
					}
				}
				zpluginslist += "</table></div>";
				if (zshow == '1') {
					zpluginslist += "</div></div>";
				}
			}
		}
		zupdateslist += "</div>";
		switch (zshow) {
			case '1':
				if (dGet('wtw_updatelist') != null) {
					dGet('wtw_updatelist').innerHTML = zupdateslist;
				}
				if (dGet('wtw_updatepluginlist') != null) {
					dGet('wtw_updatepluginlist').innerHTML = zpluginslist;
				}
				WTW.hide('wtw_loadingupdating');
				WTW.hide('wtw_loadingupdates');
				WTW.show('wtw_updatelist');
				if (zupdates > 0) {
					WTW.show('wtw_updatepluginlist');
				}
				break;
			case '2':
				if (dGet('wtw_pluginslist') != null) {
					dGet('wtw_pluginslist').innerHTML = zpluginslist;
				}
				WTW.hide('wtw_loadingplugins');
				WTW.show('wtw_pluginslist');
				WTW.show('wtw_allplugins');
				break;
		}
		
		/* update badges */
		if (dGet('wtw_adminpluginsbadge') != null) {
			dGet('wtw_adminpluginsbadge').innerHTML = zupdates;
		}
		dGet('wtw_tbadgeswtw').value = zupdatewtw;
		WTW.updateBadges();
		
		if (dGet('wtw_updatespagescroll') != null) {
			dGet('wtw_selectimagepage').style.height = (WTW.sizeY - 100) + 'px';
			dGet('wtw_updatespagescroll').style.height = (WTW.sizeY - 170) + 'px';
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-versions.js-checkForUpdatesComplete=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.checkUpdatesForAllWebs = async function() {
	/* gather list of 3D Webs and send to 3dnet hub to check for updates */
	try {
		dGet('wtw_updatewebslist').innerHTML = '';
		WTW.hide('wtw_updatewebslist');
		var zversioncheck = [];
		WTW.getAsyncJSON('/connect/communities.php?filter=all', 
			function(zresponse) {
				WTW.communities = JSON.parse(zresponse);
				if (WTW.communities != null) {
					for (var i = 0; i < WTW.communities.length; i++) {
						if (WTW.communities[i] != null) {
							zversioncheck[zversioncheck.length] = {
								'webtype': 'community',
								'webname': btoa(WTW.communities[i].communityinfo.communityname),
								'webdesc': btoa(WTW.communities[i].communityinfo.communitydescription),
								'webimage': WTW.communities[i].communityinfo.snapshotpath,
								'webid': WTW.communities[i].communityinfo.communityid,
								'versionid': WTW.communities[i].communityinfo.versionid,
								'version': WTW.communities[i].communityinfo.version
							};
						}
					}
				}
				WTW.getAsyncJSON('/connect/buildings.php', 
					function(zresponse2) {
						WTW.buildings = JSON.parse(zresponse2);
						if (WTW.buildings != null) {
							for (var i = 0; i < WTW.buildings.length; i++) {
								if (WTW.buildings[i] != null) {
									zversioncheck[zversioncheck.length] = {
										'webtype': 'building',
										'webname': btoa(WTW.buildings[i].buildinginfo.buildingname),
										'webdesc': btoa(WTW.buildings[i].buildinginfo.buildingdescription),
										'webimage': WTW.buildings[i].buildinginfo.snapshotpath,
										'webid': WTW.buildings[i].buildinginfo.buildingid,
										'versionid': WTW.buildings[i].buildinginfo.versionid,
										'version': WTW.buildings[i].buildinginfo.version
									};
								}
							}
						}
						WTW.getAsyncJSON('/connect/things.php?userid=' + dGet('wtw_tuserid').value, 
							function(zresponse3) {
								WTW.things = JSON.parse(zresponse3);
								if (WTW.things != null) {
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
										}
									}
								}
								WTW.getAsyncJSON('/connect/avatars.php', 
									function(zresponse4) {
										zresponse4 = JSON.parse(zresponse4);
										if (zresponse4.avatars != null) {
											for (var i = 0; i < zresponse4.avatars.length; i++) {
												if (zresponse4.avatars[i] != null) {
													zversioncheck[zversioncheck.length] = {
														'webtype': 'avatar',
														'webname': btoa(zresponse4.avatars[i].displayname),
														'webdesc': btoa(zresponse4.avatars[i].avatardescription),
														'webimage': zresponse4.avatars[i].snapshots.thumbnail,
														'webid': zresponse4.avatars[i].avatarid,
														'versionid': zresponse4.avatars[i].versionid,
														'version': zresponse4.avatars[i].version
													};								
												}
											}
										}
										/* check for updated versions */
										var zrequest = {
											'versioncheck': JSON.stringify(zversioncheck),
											'function':'versioncheck'
										};
										WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/versioncheck.php', zrequest, 
											function(zresponse5) {
												zresponse5 = JSON.parse(zresponse5);
												var zcommunitycount = 0;
												var zbuildingcount = 0;
												var zthingcount = 0;
												var zavatarcount = 0;
												var zupdatewebslist = '';
												if (zresponse5 != null) {
													zupdatewebslist += "<div class='wtw-dashboardboxleftfull'>";
													zupdatewebslist += "<div class='wtw-dashboardboxtitle'>3D Web Updates Available</div>";
													zupdatewebslist += "<div class='wtw-dashboardbox'>";
													for (var i = 0; i < zresponse5.length; i++) {
														if (zresponse5[i] != null) {
															var zversionid = zresponse5[i].versionid;
															var zwebid = zresponse5[i].webid;
															var zwebtype = zresponse5[i].webtype;
															var zwebname = atob(zresponse5[i].webname);
															var zwebdesc = atob(zresponse5[i].webdesc);
															var zwebimage = zresponse5[i].webimage;
															var zupdatewebid = zresponse5[i].updatewebid;
															var zversion = zresponse5[i].version;
															var zoldversion = zresponse5[i].oldversion;
															var zonclick = " onclick=\"wtw3dinternet.downloadWebVersion(this,'" + zwebid + "','" + zupdatewebid + "','" + zversionid + "','" + zversion + "','" + zoldversion + "','" + zwebtype + "');\" ";
															
															switch (zwebtype) {
																case 'community':
																	zcommunitycount += 1;
																	break;
																case 'building':
																	zbuildingcount += 1;
																	break;
																case 'thing':
																	zthingcount += 1;
																	break;
																case 'avatar':
																	zavatarcount += 1;
																	zonclick = " onclick=\"WTW.downloadAvatarVersion(this,'" + zwebid + "','" + zupdatewebid + "','" + zversionid + "','" + zversion + "','" + zoldversion + "','" + zwebtype + "');\" ";
																	break;
															}
															zupdatewebslist += "<div id='wtw_beditweb_div-" + zwebid + "' class='wtw-filelistdiv'>";
															if (zwebimage != '') {
																zupdatewebslist += "<img src='" + zwebimage + "' class='wtw-thumbnailleft' />";
															}
															zupdatewebslist += "<div id='wtw_beditweb_update-" + zwebid + "' class='wtw-updatebadgebutton' " + zonclick + ">Update Available (v" + zversion + ")</div>";
															zupdatewebslist += "<div><b>" + zwebname + " [v" + zoldversion + "]</b> - " + zwebdesc + "</div>";
															zupdatewebslist += "</div><div style='clear:both;'></div>";
														}
													}
													zupdatewebslist += "</div></div>";
													
													/* update badges */
													if (dGet('wtw_admincommunitiesbadge') != null) {
														dGet('wtw_admincommunitiesbadge').innerHTML = zcommunitycount;
													}
													if (dGet('wtw_adminbuildingsbadge') != null) {
														dGet('wtw_adminbuildingsbadge').innerHTML = zbuildingcount;
													}
													if (dGet('wtw_adminthingsbadge') != null) {
														dGet('wtw_adminthingsbadge').innerHTML = zthingcount;
													}
													if (dGet('wtw_adminavatarsbadge') != null) {
														dGet('wtw_adminavatarsbadge').innerHTML = zavatarcount;
													}
													
													WTW.updateBadges();
												}
												dGet('wtw_updatewebslist').innerHTML = zupdatewebslist;
												if (zresponse5.length > 0) {
													WTW.show('wtw_updatewebslist');
												}
											}
										);										
									}
								);	
							}
						);
					}
				);
			}
		);
		
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-versions.js-checkUpdatesForAllWebs=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.updateBadges = async function(ztotalupdates, ztotaldashboardupdates) {
	/* update the display badges in the admin menu */
	/* to fully check updates, use WTW.checkForUpdates('1'); */
	try {
		if (ztotalupdates == undefined || WTW.isNumeric(ztotalupdates) == false) {
			ztotalupdates = 0;
		}
		if (ztotaldashboardupdates == undefined || WTW.isNumeric(ztotaldashboardupdates) == false) {
			ztotaldashboardupdates = 0;
		}
		WTW.hide('wtw_admincommunitiesbadge');
		WTW.hide('wtw_adminbuildingsbadge');
		WTW.hide('wtw_adminthingsbadge');
		WTW.hide('wtw_adminavatarsbadge');
		WTW.hide('wtw_adminpluginsbadge');
		if (dGet('wtw_tbadgeswtw') != null) {
			if (dGet('wtw_tbadgeswtw').value != '') {
				if (WTW.isNumeric(dGet('wtw_tbadgeswtw').value)) {
					ztotalupdates += Number(dGet('wtw_tbadgeswtw').value);
					ztotaldashboardupdates += Number(dGet('wtw_tbadgeswtw').value);
				}
			}
		}
		if (dGet('wtw_adminpluginsbadge') != null) {
			if (dGet('wtw_adminpluginsbadge').innerHTML != '') {
				if (WTW.isNumeric(dGet('wtw_adminpluginsbadge').innerHTML)) {
					ztotalupdates += Number(dGet('wtw_adminpluginsbadge').innerHTML);
					ztotaldashboardupdates += Number(dGet('wtw_adminpluginsbadge').innerHTML);
					if (Number(dGet('wtw_adminpluginsbadge').innerHTML) > 0) {
						WTW.showInline('wtw_adminpluginsbadge');
					}
				}
			}
		}
		if (dGet('wtw_admincommunitiesbadge') != null) {
			if (dGet('wtw_admincommunitiesbadge').innerHTML != '') {
				if (WTW.isNumeric(dGet('wtw_admincommunitiesbadge').innerHTML)) {
					ztotalupdates += Number(dGet('wtw_admincommunitiesbadge').innerHTML);
					ztotaldashboardupdates += Number(dGet('wtw_admincommunitiesbadge').innerHTML);
					if (Number(dGet('wtw_admincommunitiesbadge').innerHTML) > 0) {
						WTW.showInline('wtw_admincommunitiesbadge');
					}
				}
			}
		}
		if (dGet('wtw_adminbuildingsbadge') != null) {
			if (dGet('wtw_adminbuildingsbadge').innerHTML != '') {
				if (WTW.isNumeric(dGet('wtw_adminbuildingsbadge').innerHTML)) {
					ztotalupdates += Number(dGet('wtw_adminbuildingsbadge').innerHTML);
					ztotaldashboardupdates += Number(dGet('wtw_adminbuildingsbadge').innerHTML);
					if (Number(dGet('wtw_adminbuildingsbadge').innerHTML) > 0) {
						WTW.showInline('wtw_adminbuildingsbadge');
					}
				}
			}
		}
		if (dGet('wtw_adminthingsbadge') != null) {
			if (dGet('wtw_adminthingsbadge').innerHTML != '') {
				if (WTW.isNumeric(dGet('wtw_adminthingsbadge').innerHTML)) {
					ztotalupdates += Number(dGet('wtw_adminthingsbadge').innerHTML);
					ztotaldashboardupdates += Number(dGet('wtw_adminthingsbadge').innerHTML);
					if (Number(dGet('wtw_adminthingsbadge').innerHTML) > 0) {
						WTW.showInline('wtw_adminthingsbadge');
					}
				}
			}
		}
		if (dGet('wtw_adminavatarsbadge') != null) {
			if (dGet('wtw_adminavatarsbadge').innerHTML != '') {
				if (WTW.isNumeric(dGet('wtw_adminavatarsbadge').innerHTML)) {
					ztotalupdates += Number(dGet('wtw_adminavatarsbadge').innerHTML);
					ztotaldashboardupdates += Number(dGet('wtw_adminavatarsbadge').innerHTML);
					if (Number(dGet('wtw_adminavatarsbadge').innerHTML) > 0) {
						WTW.showInline('wtw_adminavatarsbadge');
					}
				}
			}
		}
		if (dGet('wtw_adminmenudashboardbadge') != null) {
			if (dGet('wtw_adminmenudashboardbadge').innerHTML != '') {
				if (WTW.isNumeric(dGet('wtw_adminmenudashboardbadge').innerHTML)) {
					if (Number(dGet('wtw_adminmenudashboardbadge').innerHTML) > 0) {
						ztotaldashboardupdates += Number(dGet('wtw_adminmenudashboardbadge').innerHTML);
						WTW.showInline('wtw_adminmenudashboardbadge');
					}
				}
			}
		}
		dGet('wtw_tbadgesupdates').value = ztotalupdates;
		dGet('wtw_tbadges').value = ztotaldashboardupdates;
		if (ztotalupdates > 0 && dGet('wtw_adminmenuupdatesbadge') != null) {
			dGet('wtw_adminmenuupdatesbadge').innerHTML = ztotalupdates;
			WTW.showInline('wtw_adminmenuupdatesbadge');
		}
		if (ztotaldashboardupdates > 0 && dGet('wtw_admindashboardbadge') != null) {
			dGet('wtw_admindashboardbadge').innerHTML = ztotaldashboardupdates;
			WTW.showInline('wtw_admindashboardbadge');
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-versions.js-updateBadges=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.getPluginLatestVersion = async function(zpluginname) {
	var zversion = '';
	try {
		WTW.getAsyncJSON('https://3dnet.walktheweb.com/connect/versioncheck.php?pluginname=' + zpluginname, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zupdates = 0;
				if (zresponse != null) {
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i].version != undefined) {
							zversion = zresponse[i].version;
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-versions.js-getPluginLatestVersion=' + ex.message);
	}
	return zversion;
}

WTW_3DINTERNET.prototype.loadArchiveUpdates = async function() {
	/* get all archive version details for WalkTheWeb */
	try {
		dGet('wtw_archiveupdateslist').innerHTML = '';
		WTW.getAsyncJSON('https://3dnet.walktheweb.com/connect/wtwupdates.php', 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse[0] != null) {
					var zupdateid = '';
					var zupdatecounter = 0;
					var zupdatecounts = [];
					var zarchiveupdateslist = "<div class='wtw-dashboardboxleftfull'>";
					zarchiveupdateslist += "<div class='wtw-dashboardboxtitle'>Archive - WalkTheWeb Update Details</div><div class='wtw-dashboardbox'>";
					for (var i=0; i < zresponse.length;i++) {
						if (zresponse[i] != null) {
							if (zresponse[i].updateid != zupdateid) {
								if (zupdateid != '') {
									zarchiveupdateslist += "</ul></div>";
								}
								if (zupdateid != '') {
									zupdatecounts[zupdatecounts.length] = {
										'id':'wtw_count-'+zupdateid,
										'count':zupdatecounter
									}
									zupdatecounter = 0;
								}
								if (zresponse[i].deleted == 1) {
									zarchiveupdateslist += "<div class='wtw-versionheader' onclick=\"WTW.toggle('versiondiv" + zresponse[i].updateid + "');\"><div id='wtw_count-" + zresponse[i].updateid + "' style='float:right;margin-right:5px;'></div><strong>" + zresponse[i].appname + " " + zresponse[i].appversion + "</strong> (Preview of Next Release)</div><div id='versiondiv" + zresponse[i].updateid + "' style='display:block;visibility:visible;'><ul>";
								} else {
									zarchiveupdateslist += "<div class='wtw-versionheader' onclick=\"WTW.toggle('versiondiv" + zresponse[i].updateid + "');\"><div id='wtw_count-" + zresponse[i].updateid + "' style='float:right;margin-right:5px;'></div><strong>" + zresponse[i].appname + " " + zresponse[i].appversion + "</strong> (Released on: " + WTW.formatDate(zresponse[i].updatedate) + ")</div><div id='versiondiv" + zresponse[i].updateid + "' style='display:none;visibility:hidden;'>";
									if (zresponse[i].updatesummary != '') {
										zarchiveupdateslist += "<div class='wtw-versionsummary'><strong>Summary:</strong> " + zresponse[i].updatesummary + "</div>";
									}
									zarchiveupdateslist += "<br /><br />Updated in this release:<br /><ul>";
								}
								zupdateid = zresponse[i].updateid;
							}
							var zimage = '';
							if (zresponse[i].imageurl != '') {
								zimage = "<img src='" + zresponse[i].imageurl + "' title='" + zresponse[i].updatetitle + "' alt='" + zresponse[i].updatetitle + "' style='width:120px;height:auto;float:left;margin:8px 18px 8px 0px;cursor:pointer;' onclick=\"WTW.openIFrame('/core/pages/imageviewer.php?imageurl=" + zresponse[i].imageurl + "', .8, .8, 'WalkTheWeb Update Image');\" />";
							}
							zarchiveupdateslist += "<div style='clear:both;'></div>" + zimage + "<li class='wtw-normalwrap'><b>" + zresponse[i].updatetitle + "</b> - " + zresponse[i].updateby + " (" + WTW.formatDate(zresponse[i].detaildate) + ")<br /><div style='margin-left:20px;margin-bottom:10px;'>" + zresponse[i].updatedetails + "</div></li><div style='clear:both;'></div>";
							zupdatecounter += 1;
						}
					}
					if (zupdateid != '') {
						zupdatecounts[zupdatecounts.length] = {
							'id':'wtw_count-'+zupdateid,
							'count':zupdatecounter
						}
					}
					zarchiveupdateslist += "</ul></div></div></div><div style='clear:both;'></div><br />";
					dGet('wtw_archiveupdateslist').innerHTML = zarchiveupdateslist;
					for (var i=0;i < zupdatecounts.length;i++) {
						if (zupdatecounts[i] != null) {
							if (dGet(zupdatecounts[i].id) != null) {
								if (zupdatecounts[i].count == 1) {
									dGet(zupdatecounts[i].id).innerHTML = zupdatecounts[i].count + ' Update';
								} else if (zupdatecounts[i].count > 1) {
									dGet(zupdatecounts[i].id).innerHTML = zupdatecounts[i].count + ' Updates';
								}
							}
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-versions.js-loadArchiveUpdates=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.getVersionDetails = async function(zupdateid) {
	/* get version details on a particular 3D Plugin */
	try {
		dGet('wtw_updatedetailslist').innerHTML = '';
		WTW.getAsyncJSON('https://3dnet.walktheweb.com/connect/versiondetails.php?updateid=' + zupdateid, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse[0] != null) {
					var zupdatedetailslist = "<div class='wtw-dashboardboxleftfull'>";
					zupdatedetailslist += "<div class='wtw-dashboardboxtitle'>WalkTheWeb Update <b>" + zresponse[0].version + "</b> Details</div><div class='wtw-dashboardbox'>Update Details: <br /><ul>";
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
		WTW.log('plugins:wtw-3dinternet:scripts-versions.js-getVersionDetails=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.showListVersionCheck = function(zwebtype, zversioncheck) {
	/* version check and add badges where updates are available */
	try {
		var zrequest2 = {
			'versioncheck': JSON.stringify(zversioncheck),
			'function':'versioncheck'
		};
		WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/versioncheck.php', zrequest2, 
			function(zresponse2) {
				zresponse2 = JSON.parse(zresponse2);
				for (var i = 0; i < zresponse2.length; i++) {
					if (zresponse2[i] != null) {
						if (zwebtype == 'useravatar') {
							var zglobaluseravatarid = zresponse2[i].globaluseravatarid;
							var zuseravatarid = zresponse2[i].useravatarid;
							var zupdateuseravatarid = zuseravatarid;
							if (zglobaluseravatarid != '') {
								zupdateuseravatarid = zglobaluseravatarid;
							}
							if (document.getElementById('wtw_beditavatar-' + zupdateuseravatarid) != null) {
								var zwebid = zresponse2[i].webid;
								var zupdatewebid = zresponse2[i].updatewebid;
								var zversionid = zresponse2[i].versionid;
								var zversion = zresponse2[i].version;
								var zoldversion = zresponse2[i].oldversion;
								var zdiv = document.createElement('div');
								zdiv.id = 'wtw_beditavatar_update-' + zupdateuseravatarid;
								zdiv.className = 'wtw-badgebutton';
								zdiv.innerHTML = 'Update Available (v' + zversion + ')';
								zdiv.onclick = function(zevent) {
									if (zevent == undefined) {
										zevent = window.event;
									}
									WTW.downloadUserAvatarVersion(this, zglobaluseravatarid, zuseravatarid, zupdateuseravatarid, zwebid, zupdatewebid, zversionid, zversion, zoldversion, 'avatar');
									zevent.stopPropagation();
									zevent.preventDefault();
								};
								document.getElementById('wtw_beditavatar-' + zupdateuseravatarid).appendChild(zdiv);
							} 
						} else if (zwebtype == 'avatar') {
							var zversionid = zresponse2[i].versionid;
							if (document.getElementById('wtw_beditavatar-' + zwebid) != null) {
								var zwebid = zresponse2[i].webid;
								var zupdatewebid = zresponse2[i].updatewebid;
								var zversion = zresponse2[i].version;
								var zoldversion = zresponse2[i].oldversion;
								
								var zdiv = document.createElement('div');
								zdiv.id = 'wtw_beditavatar_update-' + zwebid;
								zdiv.className = 'wtw-badgebutton';
								zdiv.innerHTML = 'Update Available (v' + zversion + ')';
								zdiv.onclick = function(zevent) {
									if (zevent == undefined) {
										zevent = window.event;
									}
									WTW.downloadAvatarVersion(this, zwebid, zupdatewebid, zversionid, zversion, zoldversion, 'avatar');
									zevent.stopPropagation();
									zevent.preventDefault();
								};
								document.getElementById('wtw_beditavatar-' + zwebid).appendChild(zdiv);
							}
						} else {
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
									wtw3dinternet.downloadWebVersion(this, zwebid, zupdatewebid, zversionid, zversion, zoldversion, zwebtype);
									zevent.stopPropagation();
									zevent.preventDefault();
								};
								document.getElementById('wtw_beditweb-' + zwebid).appendChild(zdiv);
							}
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-versions.js-showListVersionCheck=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.downloadWebVersion = function(zobj, zwebid, zupdatewebid, zversionid, zversion, zoldversion, zwebtype) {
	/* download and update web by version */
	try {
		if (zobj != null) {
			zobj.innerHTML = 'Updating to (v' + zversion + ')';
			zobj.onclick = function () {};
		}
		var zrequest = {
			'webid': zwebid,
			'updatewebid': zupdatewebid,
			'versionid': zversionid,
			'version': zversion,
			'webtype': zwebtype,
			'function':'downloadupdateweb'
		};
		WTW.postAsyncJSON('/core/handlers/wtw-3dinternet-downloads.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				zobj.innerHTML = 'Completed (v' + zversion + ')';
				zobj.className += 'completed';
				if (dGet('wtw_beditweb-' + zwebid) != null) {
					dGet('wtw_beditweb-' + zwebid).innerHTML = dGet('wtw_beditweb-' + zwebid).innerHTML.replace(zoldversion,zversion);
				}

				/* update badges */
				WTW.checkForUpdates();
				window.setTimeout(function(){
					/* remove update buttons */
					if (dGet('wtw_beditweb_update-' + zwebid) != null) {
						dGet('wtw_beditweb_update-' + zwebid).remove();
					}
				},5000);
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-versions.js-downloadWebVersion=' + ex.message);
	} 
}


/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are used to administer a website in admin mode only */

/* admin forms are the full page screens that appear when admin menu items are selected. */
/* samples include: dashboard, updates, media library, 3D plugins list, settings, etc... */
/* note: user list functions are located on the wtw_adminusers.js file */

WTWJS.prototype.openFullPageForm = function(zpageid, zsetcategory, zitem, zitemname, zitemnamepath, zpreviewname) {
	/* this function sets the form page title, sections, menu options, breadcrumbs, etc */
	try {
		if (zitem == undefined) {
			zitem = '';
		}
		if (zitemname == undefined) {
			zitemname = '';
		}
		if (zitemnamepath == undefined) {
			zitemnamepath = '';
		}
		if (zpreviewname == undefined) {
			zpreviewname = '';
		}
		WTW.setDDLValue('wtw_fileselectcategory',zsetcategory);
		dGet('wtw_tfileitem').value = zitem;
		dGet('wtw_tfileitemname').value = zitemname;
		dGet('wtw_tfileitemnamepath').value = zitemnamepath;
		dGet('wtw_tfileitempreviewname').value = zpreviewname;
		/* hide any previously loaded pages */
		WTW.hideFullPages();
		WTW.hide('wtw_mediapage');
		WTW.hide('wtw_menuwtwdownloads');
		WTW.show('wtw_fullpageform');
		/* select page to show */
		switch (zpageid) {
			case "error":
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Users</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + zsetcategory + "</div>";
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
				WTW.loadArchiveUpdates();
				break;
			case "medialibrary":
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Media Library</div>";
				WTW.show('wtw_selectimagepage');
				dGet('wtw_fullpageform').style.width = (WTW.sizeX - 5 - Number(dGet('wtw_adminmenubutton').style.left.replace("px",""))).toString() + 'px';
				dGet('wtw_selectimageformscroll').style.height = (WTW.sizeY - 160) + 'px';
				WTW.selectFileForm();
				if (zsetcategory == "") {
					WTW.showInline('wtw_menuwtwdownloads');
				}
				break;
			case "mediapage":
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Media Library</div>";
				WTW.show('wtw_showfilepage');
				WTW.openMediaPageForm(zitem);
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
					switch (zsetcategory) {
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
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Users</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + zsetcategory + "</div>";
				WTW.show('wtw_showfilepage');
				WTW.openAllUsers();
				break;
			case "plugins":
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Users</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + zsetcategory + "</div>";
				WTW.show('wtw_showfilepage');
				/* WTW.openAllPlugins('',''); */
				WTW.checkForUpdates('2');
				break;
			case "settings":
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Settings</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + zsetcategory + "</div>";
				WTW.show('wtw_showfilepage');
				switch (zsetcategory) {
					case "Server Settings":
						WTW.openServerSettings();
						break;
					case "Email Server":
						WTW.openEmailServerSettings();
						break;
					case "Web Aliases":
						WTW.openWebAliasSettings();
						break;
					case "API Keys Access":
						WTW.openAPIKeys();
						break;
				}
				break;
			case "fullpage":
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>" + zsetcategory + "</div>";
				WTW.show('wtw_fullpageplugins');
				WTW.show(zitem);
				break;
			default:
				WTW.hide('wtw_fullpageform');
				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-openFullPageForm=" + ex.message);
	}
}

WTWJS.prototype.closeFullPageForm = function() {
	/* closes full page form */
	try {
		WTW.hide('wtw_fullpageform');
		WTW.resetUploadButton();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-closeFullPageForm=" + ex.message);
	}
}

WTWJS.prototype.hideFullPages = function() {
	/* hides all full page forms (prep before showing another form) */
	try {
		var zfullpages = document.getElementsByClassName('wtw-dashboardpage');
		for (var i=0;i<zfullpages.length;i++) {
			if (zfullpages[i] != null) {
				if (zfullpages[i].id != undefined) {
					WTW.hide(zfullpages[i].id);
				}
			}
		}
		zfullpages = document.getElementsByClassName('wtw-fullpage');
		for (var i=0;i<zfullpages.length;i++) {
			if (zfullpages[i] != null) {
				if (zfullpages[i].id != undefined) {
					WTW.hide(zfullpages[i].id);
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-hideFullPages=" + ex.message);
	}
}


/* WalkTheWeb and 3D Plugin Updates */

/* check for updates */
WTWJS.prototype.checkForUpdates = async function(zshow) {
	/* check for updates call */
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
		var zrequest = {
			'function':'getplugininfo'
		};
		WTW.postAsyncJSON("/core/handlers/pluginloader.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note zresponse.serror would contain any errors */
				/* process the 3D Plugins information */
				WTW.getPluginInfoComplete(zresponse.plugins, zshow);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-checkForUpdates=" + ex.message);
	}
}

WTWJS.prototype.getPluginInfoComplete = async function(zmyplugins, zshow) {
	/* process the retrieved 3D Plugins information */
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
		/* get update information for 3D Plugins */
		WTW.getAsyncJSON("https://3dnet.walktheweb.com/connect/checkforupdates.php?pluginnames=" + zplugins, 
			function(zupdateinfo) {
				zupdateinfo = JSON.parse(zupdateinfo);
				WTW.checkForUpdatesComplete(zmyplugins, zupdateinfo, zshow);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-getPluginInfoComplete=" + ex.message);
	}
}

WTWJS.prototype.checkForUpdatesComplete = function(zmyplugins, zupdateinfo, zshow) {
	/* compare and set updates for 3D Plugins */
	try {
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
								var zupdatedate = new Date(zmyplugins[i].updatedate);
								var zdatestring = (zupdatedate.getMonth()+1) + "/" + zupdatedate.getDate() + "/" + zupdatedate.getFullYear();
								if (zmyplugins[i].latestversion == wtw_version) {
									zupdateslist += "<div class=\"wtw-dashboardboxtitle\">WalkTheWeb is up to date!</div><div class=\"wtw-dashboardbox\"><b>Your Version:</b><hr />";
									zupdateslist += "App Name=" + zmyplugins[i].pluginname + "<br />";
									zupdateslist += "App Version=" + zmyplugins[i].latestversion + "<br />";
									zupdateslist += "Last Update=" + zdatestring + "<br />";
								} else {
									var zversiondate = new Date(wtw_versiondate);
									var zversiondatestring = (zversiondate.getMonth()+1) + "/" + zversiondate.getDate() + "/" + zversiondate.getFullYear();
									zupdateslist += "<div class=\"wtw-dashboardboxtitle\">WalkTheWeb has an update!</div><div class=\"wtw-dashboardbox\">Your Version: " + wtw_version + " (" + zversiondatestring + ")<br /><br />";
									zupdateslist += "<b>New Version Available:</b><hr />";
									zupdateslist += "App Name=" + zmyplugins[i].pluginname + "<br />";
									zupdateslist += "App Version=" + zmyplugins[i].latestversion + "<br />";
									zupdateslist += "App Update=" + zdatestring + "<br />";
									zupdateslist += "Backup your files and database before updating!<br />";
									zupdatewtw += 1;
								}
								zupdateslist += "<div id=\"wtw_loadingupdating\" class=\"wtw-loadingnotice\">Updating...</div>";
								if (zmyplugins[i].latestversion != wtw_version) {
									zupdateslist += "<div class=\"wtw-greenmenubutton\" onclick=\"WTW.updateWalkTheWeb('" + zmyplugins[i].pluginname + "','" + zmyplugins[i].latestversion + "','" + zdatestring + "','" + zmyplugins[i].updateurl + "');\">Update Now!</div>";
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
		WTW.log("core-scripts-admin-wtw_adminforms.js-checkForUpdatesComplete=" + ex.message);
	}
}

WTWJS.prototype.getVersionDetails = async function(zupdateid) {
	/* get version details on a particular 3D Plugin */
	try {
		dGet('wtw_updatedetailslist').innerHTML = "";
		WTW.getAsyncJSON("https://3dnet.walktheweb.com/connect/versiondetails.php?updateid=" + zupdateid, 
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
		WTW.log("core-scripts-admin-wtw_adminforms.js-getVersionDetails=" + ex.message);
	}
}

WTWJS.prototype.loadArchiveUpdates = async function() {
	/* get all archive version details for WalkTheWeb */
	try {
		dGet('wtw_archiveupdateslist').innerHTML = "";
		WTW.getAsyncJSON("https://3dnet.walktheweb.com/connect/wtwupdates.php", 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse[0] != null) {
					var zupdateid = '';
					var zarchiveupdateslist = "<div class=\"wtw-dashboardboxleftfull\">";
					zarchiveupdateslist += "<div class=\"wtw-dashboardboxtitle\">Archive - WalkTheWeb Update Details</div><div class=\"wtw-dashboardbox\">";
					for (var i=0; i < zresponse.length;i++) {
						if (zresponse[i] != null) {
							if (zresponse[i].updateid != zupdateid) {
								if (zupdateid != '') {
									zarchiveupdateslist += "</ul></div>";
								}
								if (zresponse[i].deleted == 1) {
									zarchiveupdateslist += "<div class=\"wtw-versionheader\" onclick=\"WTW.toggle('versiondiv" + zresponse[i].updateid + "');\"><strong>" + zresponse[i].appname + " " + zresponse[i].appversion + "</strong> (Preview of Next Release)</div><div id=\"versiondiv" + zresponse[i].updateid + "\" style=\"display:block;visibility:visible;\"><ul>";
								} else {
									zarchiveupdateslist += "<div class=\"wtw-versionheader\" onclick=\"WTW.toggle('versiondiv" + zresponse[i].updateid + "');\"><strong>" + zresponse[i].appname + " " + zresponse[i].appversion + "</strong> (Released on: " + WTW.formatDate(zresponse[i].updatedate) + ")</div><div id=\"versiondiv" + zresponse[i].updateid + "\" style=\"display:none;visibility:hidden;\">";
									if (zresponse[i].updatesummary != '') {
										zarchiveupdateslist += "<div class=\"wtw-versionsummary\"><strong>Summary:</strong> " + zresponse[i].updatesummary + "</div>";
									}
									zarchiveupdateslist += "<br /><br />Updated in this release:<br /><ul>";
								}
								zupdateid = zresponse[i].updateid;
							}
							zarchiveupdateslist += "<li class='wtw-normalwrap'><b>" + zresponse[i].updatetitle + "</b> - " + zresponse[i].updateby + " (" + WTW.formatDate(zresponse[i].detaildate) + ")<br /><div style='margin-left:20px;margin-bottom:10px;'>" + zresponse[i].updatedetails + "</div></li>";
						}
					}
					zarchiveupdateslist += "</ul></div></div></div>";
					dGet('wtw_archiveupdateslist').innerHTML = zarchiveupdateslist;
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-getVersionDetails=" + ex.message);
	}
}


/* 3D Plugins */
WTWJS.prototype.openAllPlugins = async function(zpluginname, zactive) {
	/* open a list of all 3D Plugins found in the file system */
	try {
		WTW.show('wtw_pluginspage');
		WTW.show('wtw_loadingplugins');
		WTW.hide('wtw_allplugins');
		WTW.hide('wtw_pluginslist');
		dGet('wtw_pluginslist').innerHTML = "";
		var zrequest = {
			'function':'getallplugins'
		};
		WTW.postAsyncJSON("/core/handlers/pluginloader.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.openAllPluginsComplete(zresponse.plugins, zpluginname, zactive);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-openAllPlugins=" + ex.message);
	}
}

WTWJS.prototype.openAllPluginsComplete = function(zresponse, zpluginname, zactive) {
	/* open all plugins process complete, display list of plugins */
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
		WTW.log("core-scripts-admin-wtw_adminforms.js-openAllPluginsComplete=" + ex.message);
	}
}

WTWJS.prototype.activatePlugin = async function(zpluginname, zactive) {
	/* activate or deactivate a 3D Plugin */
	try {
		var zrequest = {
			'pluginname': zpluginname,
			'active': zactive,
			'function':'activateplugin'
		};
		WTW.postAsyncJSON("/core/handlers/pluginloader.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.activatePluginComplete();
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-activatePlugin=" + ex.message);
	}
}

WTWJS.prototype.activatePluginComplete = function() {
	/* activate 3D Plugin completed, reload page with 3D Plugin active or inactive */
	try {
		window.location.href="/admin.php?showupdates=2&communityid=" + communityid + "&buildingid=" + buildingid + "&thingid=" + thingid;
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-activatePluginComplete=" + ex.message);
	}
}

WTWJS.prototype.updatePlugin = async function(zpluginname, zversion, zupdatedate, zupdateurl, zshow) {
	try {
		if (dGet('updateplugin' + zpluginname) != null) {
			dGet('updateplugin' + zpluginname).innerHTML = "Updating";
		}
		var zrequest = {
			'pluginname': zpluginname,
			'version': zversion,
			'updateurl': zupdateurl,
			'function':'getupdate'
		};
		WTW.postAsyncJSON("/core/handlers/pluginloader.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.updatePluginComplete(zpluginname, zversion, zupdatedate, zupdateurl, zresponse.success, zshow);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-updatePlugin=" + ex.message);
	}
}

WTWJS.prototype.updatePluginComplete = function(zpluginname, zversion, zupdatedate, zupdateurl, zsuccess, zshow) {
	try {
		window.location.href = "/admin.php?showupdates=" + zshow + "&communityid=" + communityid + "&buildingid=" + buildingid + "&thingid=" + thingid;
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-updatePluginComplete=" + ex.message);
	}
}

WTWJS.prototype.getPluginLatestVersion = async function(zpluginname) {
	var zversion = "";
	try {
		WTW.getAsyncJSON("https://3dnet.walktheweb.com/connect/versioncheck.php?pluginname=" + zpluginname, 
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
		WTW.log("core-scripts-admin-wtw_adminforms.js-getPluginLatestVersion=" + ex.message);
	}
	return zversion;
}

WTWJS.prototype.updateWalkTheWeb = async function(zpluginname, zversion, zupdatedate, zupdateurl) {
	try {
		var zupdatesloading = "<div class=\"wtw-dashboardboxleft\">";
		zupdatesloading += "<div class=\"wtw-dashboardboxtitle\">WalkTheWeb is up to date!</div><div class=\"wtw-dashboardbox\"><b>Your Version:</b><hr />";
		zupdatesloading += "<div id=\"wtw_loadingupdating\" class=\"wtw-loadingnotice\">Updating...</div>";
		zupdatesloading += "<br /><br /><br /></div></div>";
		dGet('wtw_updatelist').innerHTML = zupdatesloading;
		WTW.show('wtw_loadingupdating');
		WTW.show('wtw_updatelist');
		var zrequest = {
			'pluginname': zpluginname,
			'version': zversion,
			'updateurl': zupdateurl,
			'function':'getupdate'
		};
		WTW.postAsyncJSON("/core/handlers/pluginloader.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.updateWalkTheWebComplete(zpluginname, zversion, zupdatedate, zupdateurl, zresponse.success);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-updateWalkTheWeb=" + ex.message);
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
		WTW.log("core-scripts-admin-wtw_adminforms.js-updateWalkTheWebComplete=" + ex.message);
	}
}


/* dashboard and WalkTheWeb & 3D Plugin updates forms */

WTWJS.prototype.openDashboardForm = async function(item) {
	/* load dashboard form */
	try {
		WTW.hide('wtw_dashboard');
		WTW.show('wtw_loadingdashboard');
		WTW.hide('wtw_videolinks');
		dGet("wtw_mycommcount").innerHTML = '0';
		dGet("wtw_mybuildcount").innerHTML = '0';
		dGet("wtw_mythingcount").innerHTML = '0';
		dGet("wtw_othercommcount").innerHTML = '0';
		dGet("wtw_otherbuildcount").innerHTML = '0';
		dGet("wtw_otherthingcount").innerHTML = '0';
		WTW.getAsyncJSON("/connect/dashboard.php", 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					for (var i = 0; i < zresponse.length; i++) {
						if (zresponse[i] != null) {
							if (zresponse[i].mycommunitycount != undefined) {
								dGet('wtw_mycommcount').innerHTML = WTW.formatNumber(Number(zresponse[i].mycommunitycount),0);
							}
							if (zresponse[i].mybuildingcount != undefined) {
								dGet('wtw_mybuildcount').innerHTML = WTW.formatNumber(Number(zresponse[i].mybuildingcount),0);
							}
							if (zresponse[i].mythingcount != undefined) {
								dGet('wtw_mythingcount').innerHTML = WTW.formatNumber(Number(zresponse[i].mythingcount),0);
							}
							if (zresponse[i].othercommunitycount != undefined) {
								dGet('wtw_othercommcount').innerHTML = WTW.formatNumber(Number(zresponse[i].othercommunitycount),0);
							}
							if (zresponse[i].otherbuildingcount != undefined) {
								dGet('wtw_otherbuildcount').innerHTML = WTW.formatNumber(Number(zresponse[i].otherbuildingcount),0);
							}
							if (zresponse[i].otherthingcount != undefined) {
								dGet('wtw_otherthingcount').innerHTML = WTW.formatNumber(Number(zresponse[i].otherthingcount),0);
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
		WTW.getAsyncJSON("https://3dnet.walktheweb.com/connect/videolinks.php", 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				for (var i=0;i<zresponse.length;i++) {
					if (zresponse[i] != null) {
						if (i == 0) {
							dGet('wtw_latestvideotitle').innerHTML = atob(zresponse[i].videotitle);
							dGet('wtw_latestvideodetails').innerHTML = "Presented by: " + zresponse[i].presenter + " on " + WTW.formatDate(zresponse[i].updatedate) + "<br /><br />" + atob(zresponse[i].description);
							if (zresponse[i].videourl.indexOf('?v=') > -1) {
								var zyoutubeid = zresponse[i].videourl.split('?v=')[1];
								dGet('wtw_latestvideo').innerHTML = "<iframe width=\"100%\" height=\"auto\" src=\"https://www.youtube.com/embed/" + zyoutubeid + "?list=PLnMgA5ebbr8KXw9z5vp4E202e-RTKa9X-\" frameborder=\"0\" allowfullscreen style=\"min-height:350px;\"></iframe>";
							}
						} else {
							
						}
					}
				}
				WTW.show('wtw_videolinks');
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-openDashboardForm=" + ex.message);
	}
}


/* media library forms */

/* media library - main media page form */
WTWJS.prototype.openMediaPageForm = async function(zuploadid) {
	try {
		var zcategory = WTW.getDDLValue('wtw_fileselectcategory');
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
		WTW.getAsyncJSON("/connect/uploadmedia.php?uploadid=" + zuploadid, 
			function(zresponse) {
				var zuploadinfo = JSON.parse(zresponse);
				if (zuploadinfo != null) {
					for (var i = 0; i < zuploadinfo.length; i++) {
						if (zuploadinfo[i] != null) {
							var zfiletitle = "File Information";
							if (zuploadinfo[i].uploadinfo != null) {
								if (zuploadinfo[i].uploadinfo.title != undefined) {
									zfiletitle = zuploadinfo[i].uploadinfo.title;
									dGet('wtw_uploadfiletitle').innerHTML = zuploadinfo[i].uploadinfo.title;
								}
								if (zuploadinfo[i].uploadinfo.name != undefined) {
									dGet('wtw_uploadfilename').innerHTML = zuploadinfo[i].uploadinfo.name;
								}
								if (zuploadinfo[i].uploadinfo.type != undefined) {
									dGet('wtw_uploadfiletype').innerHTML = zuploadinfo[i].uploadinfo.type;
								}
								if (zuploadinfo[i].uploadinfo.updatedate != undefined) {
									dGet('wtw_uploadupdatedate').innerHTML = WTW.formatDateLong(zuploadinfo[i].uploadinfo.updatedate);
								}
							}
							
							dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowlink' onclick=\"WTW.openFullPageForm('medialibrary','" + zcategory + "','');WTW.setImageMenu(2);\">Media Library</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + zfiletitle + "</div>";
							if (dGet('wtw_uploadfiletype').innerHTML.indexOf('image') > -1) {
								if (zuploadinfo[i].thumbnail != null) {
									if (zuploadinfo[i].thumbnail.data != undefined) {
										dGet('wtw_mediathumbnail').src = zuploadinfo[i].thumbnail.data;
									}
									if (zuploadinfo[i].thumbnail.size != undefined) {
										dGet('wtw_mediathumbnailsize').innerHTML = WTW.formatDataSize(zuploadinfo[i].thumbnail.size);
									}
									if (zuploadinfo[i].thumbnail.width != undefined && zuploadinfo[i].thumbnail.height != undefined) {
										dGet('wtw_mediathumbnaildimensions').innerHTML = WTW.formatNumber(zuploadinfo[i].thumbnail.width,0) + ' x ' + WTW.formatNumber(zuploadinfo[i].thumbnail.height,0);
									}
									if (zuploadinfo[i].thumbnail.path != undefined) {
										dGet('wtw_mediathumbnail').src = zuploadinfo[i].thumbnail.path;
										dGet('wtw_mediathumbnailpath').innerHTML = "<a href='" + zuploadinfo[i].thumbnail.path + "' target='_blank'>" + zuploadinfo[i].thumbnail.path + "</a>";
										dGet('wtw_mediathumbnaildownload').href = zuploadinfo[i].thumbnail.path;
									}
								}
								if (zuploadinfo[i].original != null) {
									if (zuploadinfo[i].original.data != undefined) {
										dGet('wtw_mediaoriginal').src = zuploadinfo[i].original.data;
									}
									if (zuploadinfo[i].original.size != undefined) {
										dGet('wtw_mediaoriginalsize').innerHTML = WTW.formatDataSize(zuploadinfo[i].original.size);
									}
									if (zuploadinfo[i].original.width != undefined && zuploadinfo[i].original.height != undefined) {
										dGet('wtw_mediaoriginaldimensions').innerHTML = WTW.formatNumber(zuploadinfo[i].original.width,0) + ' x ' + WTW.formatNumber(zuploadinfo[i].original.height,0);
									}
									if (zuploadinfo[i].original.path != undefined) {
										dGet('wtw_mediaoriginal').src = zuploadinfo[i].original.path;
										dGet('wtw_mediaoriginalpath').innerHTML = "<a href='" + zuploadinfo[i].original.path + "' target='_blank'>" + zuploadinfo[i].original.path + "</a>";
										dGet('wtw_mediaoriginaldownload').href = zuploadinfo[i].original.path;
									}
								}
								if (zuploadinfo[i].websize != null) {
									if (zuploadinfo[i].websize.data != undefined) {
										dGet('wtw_mediawebsize').src = zuploadinfo[i].websize.data;
									}
									if (zuploadinfo[i].websize.size != undefined) {
										dGet('wtw_mediawebsizesize').innerHTML = WTW.formatDataSize(zuploadinfo[i].websize.size);
									}
									if (zuploadinfo[i].websize.width != undefined && zuploadinfo[i].websize.height != undefined) {
										dGet('wtw_mediawebsizedimensions').innerHTML = WTW.formatNumber(zuploadinfo[i].websize.width,0) + ' x ' + WTW.formatNumber(zuploadinfo[i].websize.height,0);
									}
									if (zuploadinfo[i].websize.path != undefined) {
										dGet('wtw_mediawebsize').src = zuploadinfo[i].websize.path;
										dGet('wtw_mediawebsizepath').innerHTML = "<a href='" + zuploadinfo[i].websize.path + "' target='_blank'>" + zuploadinfo[i].websize.path + "</a>";
										dGet('wtw_mediawebsizedownload').href = zuploadinfo[i].websize.path;
									}
								}
								WTW.show('wtw_imagethumbnailinfo');
								WTW.show('wtw_imagewebsizeinfo');
								WTW.show('wtw_imageoriginalinfo');
							} else {
								WTW.hide('wtw_imagethumbnailinfo');
								WTW.hide('wtw_imagewebsizeinfo');
								WTW.hide('wtw_imageoriginalinfo');
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
		WTW.log("core-scripts-admin-wtw_adminforms.js-openMediaPageForm=" + ex.message);
	}
}

/* media library - file uploads */
WTWJS.prototype.setImageMenu = function(zmenu) {
	/* set the image menu to community, my files, or stock menu page form */
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
		WTW.hide('wtw_menufilter');
		WTW.show('wtw_bstartimageupload');
		if (WTW.isNumeric(zmenu)) {
			switch (Number(zmenu)) {
				case 2:
					dGet('wtw_menuimagemy').className = 'wtw-menutabtopselected';
					WTW.showInline('wtw_menuimagemydiv');
					WTW.showInline('wtw_hiddenimagesoption');
					break;
				case 3:
					dGet('wtw_menuimagestock').className = 'wtw-menutabtopselected';
					WTW.showInline('wtw_menuimagestockdiv');
					break;
				case 4:
					dGet('wtw_menuuploadedobjects').className = 'wtw-menutabtopselected';
					WTW.showInline('wtw_menuuploadedobjectsdiv');
					WTW.showInline('wtw_menufilter');
					WTW.loadUploadedObjectsDiv(true);
					break;
				default: 
					dGet('wtw_menuimagecommunity').className = 'wtw-menutabtopselected';
					WTW.showInline('wtw_menuimagecommunitydiv');
					break;
			}
			WTW.resetUploadButton();
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-setImageMenu=" + ex.message);
	}
}

WTWJS.prototype.selectFileForm = function(zobj) {
	/* filter the page form to show images, docs, sounds, or videos */
	/* while cross referencing the existing files in the edit object, My files, or stock */
	try {
		var zitem = dGet('wtw_tfileitem').value;
		var zcategory = WTW.getDDLValue('wtw_fileselectcategory');
		var zhide = '0';
		if (zobj != undefined) {
			if (zobj.id == 'wtw_showhiddenimagesdiv') {
				if (dGet('wtw_bshowhiddenimages').checked) {
					dGet('wtw_bshowhiddenimages').checked = false;
				} else {
					dGet('wtw_bshowhiddenimages').checked = true;
				}
			}
		}
		if (dGet('wtw_bshowhiddenimages').checked) {
			zhide = '1';
		}		
		WTW.hide('wtw_menuimagecommunity');
		WTW.showInline('wtw_menuimagemy');
		WTW.hide('wtw_menuimagestock');
		WTW.hide('wtw_menuuploadedobjects');
		dGet('wtw_bstartimageupload').innerHTML = "Upload File(s)";
		dGet('wtw_showhiddenimagesdiv').innerHTML = "Show Hidden Files";
		if (communityid != '') {
			dGet('wtw_menuimagecommunity').innerHTML = "3D Community Files";
		} else if (buildingid != '') {
			dGet('wtw_menuimagecommunity').innerHTML = "3D Building Files";
		} else if (thingid != '') {
			dGet('wtw_menuimagecommunity').innerHTML = "3D Thing Files";
		}
		switch (zcategory) {
			case '':
				WTW.loadMyFilesPage(zitem, zcategory, zhide);
				WTW.loadUploadedObjectsDiv(false);
				WTW.loadStockPage(zitem);
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Media Library</div>";
				if (communityid != '' || buildingid != '' || thingid != '') {
					WTW.loadCommunityPage(communityid, buildingid, thingid, zitem);
					WTW.showInline('wtw_menuimagecommunity');
				}
				WTW.showInline('wtw_menuimagestock');
				WTW.showInline('wtw_menuuploadedobjects');
				break;
			case 'image':
				WTW.loadMyFilesPage(zitem, zcategory, zhide);
				WTW.loadStockPage(zitem);
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Select Image</div>";
				WTW.showInline('wtw_menuimagestock');
				if (communityid != '' || buildingid != '' || thingid != '') {
					WTW.loadCommunityPage(communityid, buildingid, thingid, zitem);
					WTW.showInline('wtw_menuimagecommunity');
				}
				break;
			case 'video':
				WTW.loadMyFilesPage(zitem, zcategory, zhide);
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Select Video</div>";
				break;
			case 'audio':
				WTW.loadMyFilesPage(zitem, zcategory, zhide);
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Select Sound</div>";
				break;
			case 'object':
				WTW.loadUploadedObjectsDiv(true);
				WTW.hide('wtw_menuimagemy');
				WTW.showInline('wtw_menuuploadedobjects');
				WTW.setImageMenu(4);
				break;
			case 'doc':
				WTW.loadMyFilesPage(zitem, zcategory, zhide);
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Select Document</div>";
				break;
			default:
				WTW.loadMyFilesPage(zitem, zcategory, zhide);
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Select File</div>";
				break;
		}
		if (zcategory != 'object') {
			WTW.setImageMenu(2);
			if (zitem == 'blogimage') {
				if (WTW.selectedMoldName.indexOf("-") > -1) {
					var zthingid = '';
					var zbuildingid = '';
					var zcommunityid = '';
					var znamepart = WTW.selectedMoldName.split('-');
					var i = Number(znamepart[1]);
					if (znamepart[0] == 'thingmolds') {
						zthingid = WTW.thingMolds[i].thinginfo.thingid;
					} else if (znamepart[0] == 'buildingmolds') {
						zbuildingid = WTW.buildingMolds[i].buildinginfo.buildingid;
					} else {
						zcommunityid = communityid;
					}
					WTW.loadCommunityPage(zcommunityid, zbuildingid, zthingid, zitem);
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-selectFileForm=' + ex.message);
	}
}	

WTWJS.prototype.setSelectFileID = function(zselectedobj, zuploadid, zoriginalid, zwebsizeid, zfileextension, zfilesize, zfiletitle, zfilename, zfilepath) {
	/* after selcting a file, implement the changes in the 3D Scene as necessary */
	try {
		var zcategory = WTW.getDDLValue('wtw_fileselectcategory');
		var zitem = dGet('wtw_tfileitem').value;
		var zitemname = dGet('wtw_tfileitemname').value;
		var zitemnamepath = dGet('wtw_tfileitemnamepath').value;
		var zpreviewname = dGet('wtw_tfileitempreviewname').value;
		if (dGet(zitemname) != null) {
			dGet(zitemname).value = zoriginalid;
		}
		if (dGet(zitemnamepath) != null) {
			dGet(zitemnamepath).value = zfilepath;
		}
		if (dGet(zpreviewname) != null) {
			dGet(zpreviewname).alt = zfilename;
			dGet(zpreviewname).title = zfilename;
			if (zcategory == 'image') {
				dGet(zpreviewname).src = zselectedobj.src;
				WTW.show(zpreviewname);
			}
		}
		switch (zcategory) {
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
				var zeguscale = 500;
				var zegvscale = 500;
				var zextragroundmaterial = new BABYLON.StandardMaterial("egmat", scene);
				zextragroundmaterial.diffuseTexture = new BABYLON.Texture(dGet(zitemnamepath).value, scene);
				//var zimageinfo = WTW.getUploadFileData(zuploadid);
				//zextragroundmaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.filedata, "egmattexture", scene);
				zextragroundmaterial.diffuseTexture.uScale = zeguscale;
				zextragroundmaterial.diffuseTexture.vScale = zegvscale;
				zextragroundmaterial.specularColor = new BABYLON.Color3(.1, .1, .1);
				zextragroundmaterial.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
				WTW.extraGround.material = zextragroundmaterial;
				break;
		}
		if (zitemname != 'wtw_tobjectsoundid') {
			document.activeElement.blur();
			WTW.closeFullPageForm();
			if (WTW.adminView == 1) {
				WTW.setNewMold(0);
			}
		} else {
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
			if (communityid != '') {
				dGet('wtw_menuimagecommunity').innerHTML = "3D Community Files";
			} else if (buildingid != '') {
				dGet('wtw_menuimagecommunity').innerHTML = "3D Building Files";
			} else if (thingid != '') {
				dGet('wtw_menuimagecommunity').innerHTML = "3D Thing Files";
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-setSelectFileID=' + ex.message);
	}
}

WTWJS.prototype.loadMyFilesPage = async function(zitem, zcategory, zhide) {
	/* my uploaded files (images, docs, sounds, and videos) page form */
	try {
		WTW.hide('wtw_myimagesdiv');
		WTW.show('wtw_loadingselectimage');
		dGet('wtw_myimagesdiv').innerHTML = "";
		var zrequest = {
			'category': zcategory,
			'hide': zhide,
			'function':'getmyimages'
		};
		WTW.postAsyncJSON("/core/handlers/uploads.php", zrequest, 
			function(zresponse) {
				var zmyimagesdiv = '';
				zresponse = JSON.parse(zresponse);
				if (zresponse.length > 0) {
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							zicononclick = '';
							if(zitem != '') {
								zicononclick = "onclick=\"WTW.setSelectFileID(this,'" + zresponse[i].uploadid + "','" + zresponse[i].originalid + "','" + zresponse[i].websizeid + "','" + zresponse[i].fileextension + "'," + zresponse[i].filesize + ",'" + zresponse[i].filetitle + "','" + zresponse[i].filename + "','" + zresponse[i].originalpath + "');\"";
							} else {
								zicononclick = "onclick=\"WTW.openFullPageForm('mediapage','" + zcategory + "','" + zresponse[i].uploadid + "');\"";
							}
							zfilehint = zresponse[i].filetitle;
							if (zfilehint.length > 13) {
								zfilehint = zfilehint.substr(0, 10) + "...";
							}
							var zimageid = "wtw_file" + zresponse[i].websizeid;
							var zimagesrc = '';
							var zthumbnailid = zresponse[i].thumbnailid;
							var zwebsizeid = zresponse[i].websizeid;
							if (zresponse[i].filetype.indexOf('image') > -1 && zresponse[i].filepath != '') {
								zimagesrc = zresponse[i].filepath;
							} else if (zresponse[i].filetype.indexOf('image') > -1) {
								zimagesrc = "data:" + zresponse[i].filetype + ";base64," + atob(zresponse[i].filedata);
							} else if (zresponse[i].filetype.indexOf('audio') > -1) {
								zimageid = "wtw_sound" + zresponse[i].uploadid;
								zimagesrc = "/content/system/images/iconaudio.png";
								zthumbnailid = zresponse[i].uploadid;
								zwebsizeid = zresponse[i].uploadid;
							} else if (zresponse[i].filetype.indexOf('video') > -1) {
								zimageid = "wtw_video" + zresponse[i].uploadid;
								zimagesrc = "/content/system/images/iconvideo.png";
								zthumbnailid = zresponse[i].uploadid;
								zwebsizeid = zresponse[i].uploadid;
							} else {
								zimageid = "wtw_doc" + zresponse[i].uploadid;
								zimagesrc = "/content/system/images/icondoc.png";
								zthumbnailid = zresponse[i].uploadid;
								zwebsizeid = zresponse[i].uploadid;
							}
							zmyimagesdiv += "<div class='wtw-sampleheightmapdiv' onmouseover=\"dGet('wtw_div" + zresponse[i].uploadid + "').style.visibility='visible';\" onmouseout=\"dGet('wtw_div" + zresponse[i].uploadid + "').style.visibility='hidden';\"><img id='" + zimageid + "' class='wtw-sampleheightmap' " + zicononclick + " src=\"" + zimagesrc + "\" style=\"cursor:pointer;margin-left:5px;margin-right:5px;margin-top:5px;margin-bottom:0px;display:inline-block;\" title=\"" + zresponse[i].filetitle + "\" alt=\"" + zresponse[i].filetitle + "\" /><div class='wtw-smallfilename'>" + zfilehint + "</div><div id='wtw_div" + zresponse[i].uploadid + "' style='visibility:hidden;'><div style='text-align:center;font-size:.6em;padding:0px;margin-top:0px;margin-bottom:0px;cursor:pointer;display:inline-block;' onclick=\"this.innerHTML='Saving...';this.style.color='red';dGet('wtw_file" + zwebsizeid + "').style.borderColor='red';WTW.toggleHideMyImage('" + zresponse[i].uploadid + "','" + zitem + "','" + zcategory + "','" + zhide + "');\"><img src='/content/system/images/iconhide.png' alt='Hide' title='Hide' class='wtw-smallicon' style=\"cursor:pointer;\" /></div><img src='/content/system/images/iconinfo.png' alt='Information' title='Information' class='wtw-smallicon' onclick=\"WTW.openFullPageForm('mediapage','" + zcategory + "','" + zresponse[i].uploadid + "');\" style=\"cursor:pointer;\" /></div></div>";
						}
					}
				} else {
					var zerror = "";
					switch (zcategory) {
						case 'image':
							zerror += "<h1 class='wtw-red'>No Uploaded Images Found</h1>Use the <strong>Stock Files</strong> button above or<br /><br />the <strong>Upload</strong> button on the top right to <strong>Add an Image</strong>.";
							break;
						case 'video':
							zerror += "<h1 class='wtw-red'>No Uploaded Videos Found</h1>Use the <strong>Upload</strong> button on the top right to <strong>Add a Video File</strong>.";
							break;
						case 'audio':
							zerror += "<h1 class='wtw-red'>No Uploaded Sound Files Found</h1>Use the <strong>Upload</strong> button on the top right to <strong>Add an Audio File</strong>.";
							break;
						case 'doc':
							zerror += "<h1 class='wtw-red'>No Uploaded Document Files Found</h1>Use the <strong>Upload</strong> button on the top right to <strong>Add a Document File</strong>.";
							break;
						case 'object':
							zerror += "<h1 class='wtw-red'>No 3D Object Files Found</h1>Use the <strong>Upload</strong> button on the top right to <strong>Add a 3D Object File</strong>.";
							break;
						default:
							zerror += "<h1 class='wtw-red'>No Files Found</h1>Use the <strong>Upload</strong> button on the top right to <strong>Add a File</strong>.";
							break;
					}
					zmyimagesdiv += "<div class='wtw-warningmessage'>" + zerror + "<br /><br /></div>";
				}
				dGet('wtw_myimagesdiv').innerHTML = zmyimagesdiv;
				WTW.show('wtw_myimagesdiv');
				dGet('wtw_myimagesdiv').style.height = (WTW.sizeY - 160) + 'px';
				WTW.hide('wtw_loadingselectimage');
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-loadMyFilesPage=' + ex.message);
	}
}	

WTWJS.prototype.toggleHideMyImage = async function(zuploadid, zitem, zcategory, zpagehide) {
	/* some images are used only a few times */
	/* this functions lets you hide them from normal viewing to keep the list of reusable textures and images smaller */
	/* they are still available by clicking the show hidden checkbox */
	try {
		var zhide = '0';
		if (zpagehide != '1') {
			zhide = '1';
		}
		var zrequest = {
			'uploadid': zuploadid,
			'hide': zhide,
			'function':'togglehidemyimage'
		};
		WTW.postAsyncJSON("/core/handlers/uploads.php", zrequest, 
			function(zresponse) {
				var zstockimagesdiv = '';
				zresponse = JSON.parse(zresponse);
				WTW.loadMyFilesPage(zitem, zcategory, zpagehide);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-toggleHideMyImage=' + ex.message);
	}
}	

WTWJS.prototype.loadStockPage = async function(zitem) {
	/* this pagge form shows stock images, sounds, and videos as necessary */
	try {
		WTW.hide('wtw_stockimagesdiv');
		WTW.show('wtw_loadingselectimage');
		dGet('wtw_stockimagesdiv').innerHTML = "";
		var zrequest = {
			'item': zitem,
			'function':'getstockimages'
		};
		WTW.postAsyncJSON("/core/handlers/uploads.php", zrequest, 
			function(zresponse) {
				var zstockimagesdiv = '';
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				for (var i=0;i<zresponse.length;i++) {
					if (zresponse[i] != null) {
						zfilehint = zresponse[i].filetitle;
						if (zfilehint.length > 13) {
							zfilehint = zfilehint.substr(0, 10) + "...";
						}
						var zwebsizeid = zresponse[i].websizeid;
						if (zitem.indexOf('sound') > -1) {
							zwebsizeid = zresponse[i].uploadid;
							zimagesrc = "/content/system/images/3dsound.png";
						} else {
							var zimagesrc = '';
							if (zresponse[i].filepath != '') {
								zimagesrc = zresponse[i].filepath;
							} else {
								zimagesrc = "data:" + zresponse[i].filetype + ";base64," + atob(zresponse[i].filedata);
							}
						}
						zstockimagesdiv += "<div class='wtw-sampleheightmapdiv'><img id='wtw_stockimage" + zwebsizeid + "' class='wtw-sampleheightmap' onclick=\"WTW.setSelectFileID(this,'" + zresponse[i].uploadid + "','" + zresponse[i].originalid + "','" + zresponse[i].websizeid + "','" + zresponse[i].fileextension + "'," + zresponse[i].filesize + ",'" + zresponse[i].filetitle + "','" + zresponse[i].filename + "','" + zresponse[i].originalpath + "');\" src=\"" + zimagesrc + "\" style=\"cursor:pointer;margin:5px;display:inline-block;\" title=\"" + zresponse[i].filetitle + "\" alt=\"" + zresponse[i].filetitle + "\" /><div class='wtw-smallfilename'>" + zfilehint + "</div></div>";
					}
				}
				dGet('wtw_stockimagesdiv').innerHTML = zstockimagesdiv;
				WTW.show('wtw_stockimagesdiv');
				dGet('wtw_stockimagesdiv').style.height = (WTW.sizeY - 160) + 'px';
				WTW.hide('wtw_loadingselectimage');
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-loadStockPage=' + ex.message);
	}
}	

WTWJS.prototype.loadCommunityPage = async function(zcommunityid, zbuildingid, zthingid, zitem) {
	/* this page form shows any images, documents, sounds, or video files currently in use on the 3D Community, 3D Building, or 3D Thing being edited */
	try {
		WTW.hide('wtw_communityimagesdiv');
		WTW.show('wtw_loadingselectimage');
		dGet('wtw_communityimagesdiv').innerHTML = "";
		var zrequest = {
			'communityid': zcommunityid,
			'buildingid': zbuildingid,
			'thingid': zthingid,
			'function':'getcommunityimages'
		};
		WTW.postAsyncJSON("/core/handlers/uploads.php", zrequest, 
			function(zresponse) {
				var zcommunityimagesdiv = '';
				zresponse = JSON.parse(zresponse);
				for (var i=0;i<zresponse.length;i++) {
					if (zresponse[i] != null) {
						var zicononclick = "onclick=\"WTW.setSelectFileID(this,'" + zresponse[i].uploadid + "','" + zresponse[i].originalid + "','" + zresponse[i].websizeid + "','" + zresponse[i].fileextension + "'," + zresponse[i].filesize + ",'" + zresponse[i].filetitle + "','" + zresponse[i].filename + "','" + zresponse[i].originalpath + "');\"";
						var zfilehint = zresponse[i].filetitle;
						if (zfilehint.length > 13) {
							zfilehint = zfilehint.substr(0, 10) + "...";
						}
						var zcategory = "images";
						var zimageid = "wtw_file" + zresponse[i].websizeid;
						var zimagesrc = '';
						var zwebsizeid = zresponse[i].websizeid;
						var zthumbnailid = zresponse[i].thumbnailid;
						if (zresponse[i].filetype.indexOf('image') > -1 && zresponse[i].filepath != '') {
							zimagesrc = zresponse[i].filepath;
						} else if (zresponse[i].filetype.indexOf('image') > -1) {
							zimagesrc = "data:" + zresponse[i].filetype + ";base64," + atob(zresponse[i].filedata);
						} else if (zresponse[i].filetype.indexOf('audio') > -1) {
							zcategory = "sounds";
							zimageid = "wtw_sound" + zresponse[i].uploadid;
							zimagesrc = '/content/system/images/iconaudio.png';
							zthumbnailid = zresponse[i].uploadid;
							zwebsizeid = zresponse[i].uploadid;
						} else if (zresponse[i].filetype.indexOf('video') > -1) {
							zcategory = "videos";
							zimageid = "wtw_video" + zresponse[i].uploadid;
							zimagesrc = '/content/system/images/iconvideo.png';
							zthumbnailid = zresponse[i].uploadid;
							zwebsizeid = zresponse[i].uploadid;
						} else {
							zcategory = "documents";
							zimageid = "wtw_doc" + zresponse[i].uploadid;
							zimagesrc = '/content/system/images/icondoc.png';
							zthumbnailid = zresponse[i].uploadid;
							zwebsizeid = zresponse[i].uploadid;
						}
						zcommunityimagesdiv += "<div class='wtw-sampleheightmapdiv' onmouseover=\"dGet('wtw_webdiv" + zresponse[i].uploadid + "').style.visibility='visible';\" onmouseout=\"dGet('wtw_webdiv" + zresponse[i].uploadid + "').style.visibility='hidden';\"><img id='" + zimageid + "' class='wtw-sampleheightmap' " + zicononclick + " src=\"" + zimagesrc + "\" style=\"cursor:pointer;margin-left:5px;margin-right:5px;margin-top:5px;margin-bottom:0px;display:inline-block;\" title=\"" + zresponse[i].filetitle + "\" alt=\"" + zresponse[i].filetitle + "\" /><div class='wtw-smallfilename'>" + zfilehint + "</div><div id='wtw_webdiv" + zresponse[i].uploadid + "' style='visibility:hidden;'><div style='text-align:center;font-size:.6em;padding:0px;margin-top:0px;margin-bottom:0px;cursor:pointer;display:inline-block;' onclick=\"this.innerHTML='Saving...';this.style.color='red';dGet('wtw_file" + zwebsizeid + "').style.borderColor='red';dGet('wtw_hideimageid').value='" + zthumbnailid + "';dGet('wtw_submit').click();\"></div><img src='/content/system/images/iconinfo.png' alt='Information' title='Information' class='wtw-smallicon' onclick=\"WTW.openFullPageForm('mediapage','" + zcategory + "','" + zresponse[i].uploadid + "');\" style=\"cursor:pointer;\" /></div></div>";
					}
				}
				dGet('wtw_communityimagesdiv').innerHTML = zcommunityimagesdiv;
				WTW.show('wtw_communityimagesdiv');
				dGet('wtw_communityimagesdiv').style.height = (WTW.sizeY - 160) + 'px';
				WTW.hide('wtw_loadingselectimage');
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-loadCommunityPage=' + ex.message);
	}
}	

WTWJS.prototype.startUploadImage = function(zbuttontext) {
	/* upload image process (upload process is based on which text is on the button) */
	/* some are single files and others are multi files select */
	try {
		switch (zbuttontext) {
			case "Upload Primary 3D File":
				dGet('wtw_fileupload').click();
				break;
			case "Upload or Replace File(s)":
				dGet('wtw_filesupload').onchange = function() {
					WTW.uploadObjectFiles();
				}
				dGet('wtw_filesupload').click();
				break;
			case "Upload JavaScript File":
				dGet('wtw_filesupload').onchange = function() {
					WTW.uploadObjectFiles('uploadjavascriptfiles');
				}
				dGet('wtw_filesupload').click();
				break;
			default:
				dGet('wtw_filesupload').onchange = function() {
					WTW.uploadFiles();
				}
				dGet('wtw_filesupload').click();
				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-startUploadImage=" + ex.message);
	}
}

WTWJS.prototype.uploadFile = function() {
	/* upload file form post */
	try {
		if (dGet('wtw_fileupload').value != null) {
			var zform1 = document.createElement('form');
			var Httpreq = new XMLHttpRequest();
			var zformdata = new FormData(zform1);
			zformdata.append('wtw_uploadfile', dGet('wtw_fileupload').files[0], dGet('wtw_fileupload').files[0].name);
			zformdata.append('action', 'POST');
			zformdata.append('function', 'uploadfile');
			Httpreq.open('POST', '/core/handlers/uploadedfiles.php');
			Httpreq.onreadystatechange = function () {
				if (Httpreq.readyState == 4 && Httpreq.status == "200") {
					try {
						var zresponse = JSON.parse(Httpreq.responseText);
					} catch (ex) {}
					dGet('wtw_fileupload').value = null;
					WTW.loadUploadedObjectsDiv(true);
				}
			};
			Httpreq.send(zformdata);  
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-uploadFile=" + ex.message);
	}
}

WTWJS.prototype.uploadAsyncFile = function() {
	/* upload file form post */
	try {
		if (dGet('wtw_fileupload').value != null) {
			return new Promise(function () {
				var zform1 = document.createElement('form');
				var Httpreq = new XMLHttpRequest();
				var zformdata = new FormData(zform1);
				zformdata.append('wtw_uploadfile', dGet('wtw_fileupload').files[0], dGet('wtw_fileupload').files[0].name);
				zformdata.append('action', 'POST');
				zformdata.append('function', 'uploadfile');
				Httpreq.open('POST', '/core/handlers/uploadedfiles.php');
				Httpreq.onreadystatechange = function () {
					if (Httpreq.readyState == 4 && Httpreq.status == "200") {
						try {
							var zresponse = JSON.parse(Httpreq.responseText);
						} catch (ex) {}
						dGet('wtw_fileupload').value = null;
						WTW.loadUploadedObjectsDiv(true);
					}
				};
				Httpreq.send(zformdata);  
			});
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-uploadAsyncFile=" + ex.message);
	}
}

WTWJS.prototype.selectUploadFiles = function() {
	/* open file selection based on one or more files available to select */
	try {
		if (dGet('wtw_bstartimageupload').innerHTML == "Upload of Replace File(s)") {
			WTWuploadObjectFiles();
		} else {
			WTW.uploadFiles();
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-selectUploadFiles=" + ex.message);
	}
}

WTWJS.prototype.uploadFiles = function() {
	/* upload files using form post */
	try {
		if (dGet('wtw_filesupload').value != null) {
			var zobjectfilepart = dGet('wtw_tobjectfile').value;
			var zitem = dGet('wtw_tfileitem').value;
			zobjectfilepart = zobjectfilepart.replace(".babylon","");
			var zform1 = document.createElement('form');
			var Httpreq = new XMLHttpRequest();
			var zformdata = new FormData(zform1);
			for (var i=0;i < dGet('wtw_filesupload').files.length;i++) {
				zformdata.append('wtw_uploadfiles[]', dGet('wtw_filesupload').files[i], dGet('wtw_filesupload').files[i].name);
			}
			zformdata.append('action', 'POST');
			zformdata.append('objectfilepart', zobjectfilepart);
			zformdata.append('item', zitem);
			zformdata.append('function', 'uploadfiles');
			Httpreq.open('POST', '/core/handlers/uploadedfiles.php');
			Httpreq.onreadystatechange = function () {
				if (Httpreq.readyState == 4 && Httpreq.status == "200") {
					var zresponse = JSON.parse(Httpreq.responseText);
					dGet('wtw_filesupload').value = null;
					var zcategory = WTW.getDDLValue('wtw_fileselectcategory');
					WTW.loadMyFilesPage(zitem, zcategory, '0');
					WTW.setImageMenu(2);
				}
			};
			Httpreq.send(zformdata);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-uploadFiles=" + ex.message);
	}
}

WTWJS.prototype.uploadAsyncFiles = function() {
	/* upload files using form post */
	try {
		if (dGet('wtw_filesupload').value != null) {
			return new Promise(function () {
				var zobjectfilepart = dGet('wtw_tobjectfile').value;
				var zitem = dGet('wtw_tfileitem').value;
				zobjectfilepart = zobjectfilepart.replace(".babylon","");
				var zform1 = document.createElement('form');
				var Httpreq = new XMLHttpRequest();
				var zformdata = new FormData(zform1);
				for (var i=0;i < dGet('wtw_filesupload').files.length;i++) {
					zformdata.append('wtw_uploadfiles[]', dGet('wtw_filesupload').files[i], dGet('wtw_filesupload').files[i].name);
				}
				zformdata.append('action', 'POST');
				zformdata.append('objectfilepart', zobjectfilepart);
				zformdata.append('item', zitem);
				zformdata.append('function', 'uploadfiles');
				Httpreq.open('POST', '/core/handlers/uploadedfiles.php');
				Httpreq.onreadystatechange = function () {
					if (Httpreq.readyState == 4 && Httpreq.status == "200") {
						var zresponse = JSON.parse(Httpreq.responseText);
						dGet('wtw_filesupload').value = null;
						var zcategory = WTW.getDDLValue('wtw_fileselectcategory');
						WTW.loadMyFilesPage(zitem, zcategory, '0');
						WTW.setImageMenu(2);
					}
				};
				Httpreq.send(zformdata);
			});
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-uploadAsyncFiles=" + ex.message);
	}
}

WTWJS.prototype.resetUploadButton = function() {
	/* reset the upload button after an upload (in case you want to upload the same file name again) */
	try {
		if (dGet('wtw_bstartimageupload') != null) {
			var zcategory = WTW.getDDLValue('wtw_fileselectcategory');
			if (dGet('wtw_menuuploadedobjectsdiv').style.display != 'none') {
				zcategory = 'object';
			}
			dGet('wtw_bstartimageupload').innerHTML = "Upload File(s)";
			if ((zcategory == '' || zcategory == 'object') && dGet('wtw_menuuploadedobjects').className == 'wtw-menutabtopselected' && dGet('wtw_uploadedmodelsdiv').style.display != 'none') {
				if (dGet('wtw_uploadedmodeldetailsdiv').style.display == 'none') {
					dGet('wtw_bstartimageupload').innerHTML = 'Upload Primary 3D File';
				} else {
					dGet('wtw_bstartimageupload').innerHTML = 'Upload or Replace File(s)';
				}
			}
			dGet('wtw_bstartimageupload').onclick = function() {WTW.startUploadImage(this.innerHTML);};
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-resetUploadButton=" + ex.message);
	}
}

/* media library - 3D Models uploads */
WTWJS.prototype.setSelectModel = function(zuploadobjectid, zobjectfolder, zobjectfile) {
	/* select the 3D Object to be used in mold form (when added to 3D Scene) */
	/* when editing a 3D Community, Building or Thing, add a 3D Web Object -> Babylon File */
	/* you will select the 3D Object form the media Library - and return to the edit form */
	try {
		WTW.hide('wtw_fullpageform');
		dGet('wtw_tmolduploadobjectid').value = zuploadobjectid;
		dGet('wtw_tmoldobjectfolder').value = zobjectfolder;
		dGet('wtw_tmoldobjectfile').value = zobjectfile;
		WTW.setNewMold();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-setSelectModel=" + ex.message);
	}
}

WTWJS.prototype.filterModels = function(zevent) {
	/* open file selection based on one or more files available to select */
	try {
		var ztext = dGet('wtw_modelfilter').value;
		switch (zevent) {
			case 0: /* onblur */
				if (ztext == '') {
					dGet('wtw_modelfilter').value = 'Name Filter';
				}
				break;
			case 1: /* onfocus */
				if (ztext == "Name Filter") {
					dGet('wtw_modelfilter').value = '';
				}
				break;
			case 2: /* onkeydown */
				if (ztext == 'Name Filter') {
					ztext = '';
				}
				if (ztext != '') {
					ztext = ztext.toLowerCase();
				}
				if (dGet('wtw_uploadedmodelsdiv').childNodes != null) {
					var zuploadedobjects = dGet('wtw_uploadedmodelsdiv').childNodes;
					for (var i=0;i<zuploadedobjects.length;i++) {
						if (zuploadedobjects[i].id != undefined) {
							if ((zuploadedobjects[i].id.indexOf(ztext) > -1 || ztext == '') && zuploadedobjects[i].id.indexOf("wtw_obj_") > -1) {
								WTW.showInline(zuploadedobjects[i].id);
							} else {
								WTW.hide(zuploadedobjects[i].id);
							}
						}
					}
				}
				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-filterModels=" + ex.message);
	}
}

WTWJS.prototype.openObjectPageForm = function(zuploadobjectid, zfilename) {
	/* 3D Models page form */
	try {
		var zcategory = WTW.getDDLValue('wtw_fileselectcategory');
		dGet('wtw_tbackupfullpageformtitle').value = dGet('wtw_fullpageformtitle').innerHTML;
		dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowlink' onclick=\"WTW.openFullPageForm('medialibrary','" + zcategory + "','');WTW.setImageMenu(4);\">Media Library</div><img id='wtw_arrowicon2' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + zfilename + "</div>";
		WTW.hide('wtw_uploadedmodelsdiv');
		WTW.hide('wtw_loadingselectimage');
		dGet('wtw_uploadedmodeldetailsdiv').style.height = (WTW.sizeY - 160) + 'px';
		WTW.show('wtw_uploadedmodeldetailsdiv');
		WTW.loadObjectDetailsName(zuploadobjectid);
		WTW.loadObjectDetailsAnimations(zuploadobjectid);
		dGet('wtw_bstartimageupload').innerHTML = 'Upload or Replace File(s)';
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-openObjectPageForm=" + ex.message);
	}
}

WTWJS.prototype.loadUploadedObjectsDiv = async function(showloading) {
	/* load the settings (and list) for the 3D Models div */
	try {
		dGet('wtw_bstartimageupload').innerHTML = 'Upload Primary 3D File';
		WTW.hide('wtw_uploadedmodeldetailsdiv');
		if (showloading) {
			WTW.hide('wtw_uploadedmodelsdiv');
			WTW.show('wtw_loadingselectimage');
		}
		dGet('wtw_uploadedmodelsdiv').innerHTML = '';
		var zrequest = {
			'function':'getuploadedfiles'
		};
		WTW.postAsyncJSON("/core/handlers/uploadedfiles.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zitem = dGet('wtw_tfileitem').value;
				var zuploadedobjectsdiv = '';
				for (var i=0;i<zresponse.length;i++) {
					zcreatedate = zresponse[i].createdate;
					//zcreatedate = date('m/d/Y', strtotime($zcreatedate));
					zlinktext = "Edit";
					if (zresponse[i].stock == '1') {
						zlinktext = "View";
					}
					if (zitem == "3dobject") {
						zlinktext = "Select";
						zuploadedobjectsdiv += "<div id='wtw_obj_" + i + "_" + zresponse[i].objectfile.toLowerCase() + "' class='wtw-objectcontainer'><div class='wtw-objectfile' onclick=\"WTW.setSelectModel('" + zresponse[i].uploadobjectid + "','" + zresponse[i].objectfolder + "','" + zresponse[i].objectfile + "');\">" + zresponse[i].objectfile + "</div><div class='wtw-objectfolder'>" + zresponse[i].objectfolder.replace("/objects/","/objects<br />/") + "<br /><br /><span style='color:gray;'>Uploaded on </span>" + zcreatedate + "<br /><br /><div class='wtw-rightbutton' onclick=\"WTW.setSelectModel('" + zresponse[i].uploadobjectid + "','" + zresponse[i].objectfolder + "','" + zresponse[i].objectfile + "');\">" + zlinktext + "</div><div class='wtw-rightbutton' onclick=\"WTW.openObjectPageForm('" + zresponse[i].uploadobjectid + "','" + zresponse[i].objectfile + "');\">Edit</div><div class='wtw-clear'></div></div></div>";
					} else {
						zuploadedobjectsdiv += "<div id='wtw_obj_" + i + "_" + zresponse[i].objectfile.toLowerCase() + "' class='wtw-objectcontainer'><div class='wtw-objectfile' onclick=\"WTW.openObjectPageForm('" + zresponse[i].uploadobjectid + "','" + zresponse[i].objectfile + "');\">" + zresponse[i].objectfile + "</div><div class='wtw-objectfolder'>" + zresponse[i].objectfolder.replace("/objects/","/objects<br />/") + "<br /><br /><span style='color:gray;'>Uploaded on </span>" + zcreatedate + "<br /><br /><div class='wtw-rightbutton' onclick=\"WTW.openObjectPageForm('" + zresponse[i].uploadobjectid + "','" + zresponse[i].objectfile + "');\">" + zlinktext + "</div><div class='wtw-clear'></div></div></div>";
					}
				}
				dGet('wtw_uploadedmodelsdiv').innerHTML = zuploadedobjectsdiv;
				dGet('wtw_uploadedmodelsdiv').style.height = (WTW.sizeY - 160) + 'px';
				WTW.show('wtw_uploadedmodelsdiv');
				if (showloading) {
					WTW.hide('wtw_loadingselectimage');
				}
				WTW.resetUploadButton();
				WTW.filterModels(2);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-loadUploadedObjectsDiv=" + ex.message);
	}
}

WTWJS.prototype.loadObjectDetailsName = async function(zuploadobjectid) {
	/* if an object is opened, this details page form shows */
	try {
		if (zuploadobjectid == undefined) {
			zuploadobjectid = dGet('wtw_tuploadobjectid').value;
		}
		dGet('wtw_uploadedmodelsnamediv').innerHTML = "";
		var znamediv = "";
		var zrequest = {
			'uploadobjectid': zuploadobjectid,
			'function':'getuploadedfilenamedetails'
		};
		WTW.postAsyncJSON("/core/handlers/uploadedfiles.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.length > 0) {
					for (var i=0;i < zresponse.length;i++) {
						if (zresponse[i] != null) {
							dGet('wtw_tuploadobjectid').value = zresponse[i].uploadobjectid;
							dGet('wtw_tobjectfile').value = zresponse[i].objectfile;
							if (zresponse[i].stock == 1) {
								znamediv += "<h1 style='color:black;margin-left:20px;'>Edit Stock 3D Object</h1>";
							} else {
								znamediv += "<h1 style='color:black;margin-left:20px;'>Edit 3D Object</h1>";
							}
							var zcreatedate = zresponse[i].createdate;
							//zcreatedate = date('m/d/Y', strtotime($zcreatedate));
							znamediv += "<div class='wtw-objectcontainer'><div class='wtw-objectfile'>" + zresponse[i].objectfile + "</div><div class='wtw-objectfolder'>" + zresponse[i].objectfolder.replace("/objects/","/objects<br />/") + "<br /><br /><span style='color:gray;'>Uploaded on </span>" + zcreatedate + "</div></div>";
							WTW.loadObjectDetailsFiles(zuploadobjectid, zresponse[i].objectfolder, zresponse[i].objectfile);
						}
					}
				} else {
					znamediv += "<h1 style='color:red;margin-left:20px;'>3D Object not found</h1>";
				}
				dGet('wtw_uploadedmodelsnamediv').innerHTML = znamediv;
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-loadObjectDetailsName=" + ex.message);
	}
}

WTWJS.prototype.uploadObjectFiles = function(ztype) {
	/* upload 3D Object files using form post */
	try {
		if (dGet('wtw_filesupload').value != null) {
			if (ztype == undefined) {
				ztype = 'uploadobjectfiles';
			}
			var zwebtype = "communities";
			if (buildingid != '') {
				zwebtype = "buildings";
			} else if (thingid != '') {
				zwebtype = "things";
			}
			var zobjectfilepart = dGet('wtw_tobjectfile').value;
			zobjectfilepart = zobjectfilepart.replace(".babylon","");
			var zform1 = document.createElement('form');
			var Httpreq = new XMLHttpRequest();
			var zformdata = new FormData(zform1);
			for (var i=0;i < dGet('wtw_filesupload').files.length;i++) {
				zformdata.append('wtw_uploadfiles[]', dGet('wtw_filesupload').files[i], dGet('wtw_filesupload').files[i].name);
			}
			zformdata.append('action', 'POST');
			zformdata.append('objectfilepart', zobjectfilepart);
			zformdata.append('webtype', zwebtype);
			zformdata.append('webid', communityid + buildingid + thingid);
			zformdata.append('actionzoneid', dGet('wtw_tactionzoneid').value);
			zformdata.append('function', ztype);
			Httpreq.open('POST', '/core/handlers/uploadedfiles.php');
			Httpreq.onreadystatechange = function () {
				if (Httpreq.readyState == 4 && Httpreq.status == "200") {
					var zresponse = JSON.parse(Httpreq.responseText);
					dGet('wtw_filesupload').value = null;
					switch (ztype) {
						case 'uploadobjectfiles':
							WTW.loadObjectDetailsName();
							break;
						case 'uploadjavascriptfiles':
							WTW.getAZFormScripts();
							break;
					}
				}
			};
			Httpreq.send(zformdata);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-uploadObjectFiles=" + ex.message);
	}
}

WTWJS.prototype.uploadAsyncObjectFiles = function(ztype) {
	/* upload 3D Object files using form post */
	try {
		if (dGet('wtw_filesupload').value != null) {
			return new Promise(function () {
				if (ztype == undefined) {
					ztype = 'uploadobjectfiles';
				}
				var zwebtype = "communities";
				if (buildingid != '') {
					zwebtype = "buildings";
				} else if (thingid != '') {
					zwebtype = "things";
				}
				var zobjectfilepart = dGet('wtw_tobjectfile').value;
				zobjectfilepart = zobjectfilepart.replace(".babylon","");
				var zform1 = document.createElement('form');
				var Httpreq = new XMLHttpRequest();
				var zformdata = new FormData(zform1);
				for (var i=0;i < dGet('wtw_filesupload').files.length;i++) {
					zformdata.append('wtw_uploadfiles[]', dGet('wtw_filesupload').files[i], dGet('wtw_filesupload').files[i].name);
				}
				zformdata.append('action', 'POST');
				zformdata.append('objectfilepart', zobjectfilepart);
				zformdata.append('webtype', zwebtype);
				zformdata.append('webid', communityid + buildingid + thingid);
				zformdata.append('actionzoneid', dGet('wtw_tactionzoneid').value);
				zformdata.append('function', ztype);
				Httpreq.open('POST', '/core/handlers/uploadedfiles.php');
				Httpreq.onreadystatechange = function () {
					if (Httpreq.readyState == 4 && Httpreq.status == "200") {
						var zresponse = JSON.parse(Httpreq.responseText);
						dGet('wtw_filesupload').value = null;
						switch (ztype) {
							case 'uploadobjectfiles':
								WTW.loadObjectDetailsName();
								break;
							case 'uploadjavascriptfiles':
								WTW.getAZFormScripts();
								break;
						}
					}
				};
				Httpreq.send(zformdata);
			});
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-uploadAsyncObjectFiles=" + ex.message);
	}
}

WTWJS.prototype.deleteObjectFile = async function() {
	/* delete 3D Mold Object file */
	try {
		var zobjectfilepart = dGet('wtw_tobjectfile').value;
		zobjectfilepart = zobjectfilepart.replace(".babylon","");
		var zrequest = {
			'filename': dGet('wtw_tdeletefile').value,
			'objectfilepart': zobjectfilepart,
			'function':'deleteobjectfile'
		};
		WTW.postAsyncJSON("/core/handlers/uploadedfiles.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.hide('wtw_deletefile');
				WTW.hide('wtw_canceldelete');
				WTW.loadObjectDetailsName();
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-deleteObjectFile=" + ex.message);
	}
}

WTWJS.prototype.loadObjectDetailsFiles = async function(zuploadobjectid, zobjectfolder, zfilename) {
	/* files list included on the 3D Object details page form */
	try {
		dGet('wtw_uploadedmodelsfilesdiv').innerHTML = "";
		var zfilesdiv = "";
		var zrequest = {
			'objectfolder': zobjectfolder,
			'function':'getuploadedfilefilesdetails'
		};
		WTW.postAsyncJSON("/core/handlers/uploadedfiles.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				zfilesdiv += "<div class='wtw-clear'></div>";
				zfilesdiv += "<div class='wtw-objectcontainer'><div class='wtw-objectfile'>File List</div><div class='wtw-objectfolder'>";
				if (zresponse.length > 0) {
					for (var i=0;i < zresponse.length;i++) {
						if (zresponse[i] != null) {
							zfilesdiv += "<img src='/content/system/images/close2.png' alt='Delete' title='Delete' style='width:24px;height:auto;float:right;right-margin:10px;cursor:pointer;' onclick=\"dGet('wtw_tdeletefile').value='" + zresponse[i].file + "';WTW.hide('wtw_uploadbutton');WTW.showInline('wtw_deletefile');WTW.showInline('wtw_canceldelete');\" />";
							if (zresponse[i].file == zfilename) {
								zfilesdiv += "<div class='wtw-floatright'>Primary</div><strong>" + zresponse[i].file + "</strong><br /><div class='wtw-clear'></div>";
							} else {
								zfilesdiv += "<div>" + zresponse[i].file + "</div><br /><div class='wtw-clear'></div>";
							}
						}
					}
				}
				zfilesdiv += "<br /><br /><div id='wtw_uploadbutton' class='wtw-greenbutton' style='width:318px;' onclick=\"WTW.startUploadImage('Upload or Replace File(s)');\">Upload or Replace File(s)</div>";
				zfilesdiv += "<div id='wtw_deletefile' class='wtw-redbutton' style='width:150px;display:none;visibility:hidden;text-align:center;margin-right:13px;cursor:pointer;' onclick=\"WTW.deleteObjectFile();\">Delete File</div><div id='wtw_canceldelete' class='wtw-yellowbutton' style='width:150px;display:none;visibility:hidden;text-align:center;cursor:pointer;' onclick=\"dGet('wtw_tdeletefile').value='';WTW.hide('wtw_deletefile');WTW.hide('wtw_canceldelete');WTW.show('wtw_uploadbutton');\">Cancel</div>";
				zfilesdiv += "</div></div>";
				dGet('wtw_uploadedmodelsfilesdiv').innerHTML = zfilesdiv;
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-loadObjectDetailsFiles=" + ex.message);
	}
}

WTWJS.prototype.loadObjectDetailsAnimations = async function(zuploadobjectid) {
	/* animations list included on the 3D Object details page form */
	try {
		dGet('wtw_uploadedmodelsanimationsdiv').innerHTML = "";
		var zanimationsdiv = "";
		var zrequest = {
			'uploadobjectid': zuploadobjectid,
			'function':'getuploadedfileanimationsdetails'
		};
		WTW.postAsyncJSON("/core/handlers/animations.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				zanimationsdiv += "<div class='wtw-clear'></div><div class='wtw-objectcontainer'><div class='wtw-objectfile'>Animations</div><div class='wtw-objectfolder'>";
				if (zresponse.length > 0) {
					for (var i=0;i < zresponse.length;i++) {
						if (zresponse[i] != null) {
							zanimationsdiv += "<img src='/content/system/images/close2.png' alt='Delete' title='Delete' style='width:24px;height:auto;float:right;right-margin:10px;cursor:pointer;' onclick=\"dGet('wtw_tdeleteanimation').value='" + zresponse[i].objectanimationid + "';WTW.showInline('wtw_deleteanimation');WTW.showInline('wtw_canceldeleteanimation');\" />";
							zanimationsdiv += "<img src='/content/system/images/edit.png' alt='Edit Animation' title='Edit Animation' style='width:24px;height:auto;float:right;right-margin:10px;cursor:pointer;' onclick=\"WTW.loadObjectAnimation('" + zresponse[i].objectanimationid + "');\" />";
							var zmoldevent = '';
							if (zresponse[i].moldevent != '') {
								zmoldevent = ": <strong>" + zresponse[i].moldevent + "</strong>";
							}
							zanimationsdiv += "<div>" + zresponse[i].animationname + zmoldevent + "</div><br /><div class='wtw-clear'></div>";
						}
					}
				}
				zanimationsdiv += "<br /><br /><div id='wtw_addanimation' class='wtw-greenbutton' style='width:318px;' onclick=\"WTW.addAnimation('" + zuploadobjectid + "');\">Add Animation</div>";
				zanimationsdiv += "<div id='wtw_deleteanimation' class='wtw-redbutton' style='width:150px;display:none;visibility:hidden;text-align:center;margin-right:13px;cursor:pointer;' onclick=\"WTW.deleteObjectAnimation(dGet('wtw_tdeleteanimation').value, '" + zuploadobjectid + "');\">Delete Animation</div><div id='wtw_canceldeleteanimation' class='wtw-yellowbutton' style='width:150px;display:none;visibility:hidden;text-align:center;cursor:pointer;' onclick=\"dGet('wtw_tdeleteanimation').value='';WTW.hide('wtw_deleteanimation');WTW.hide('wtw_canceldeleteanimation');\">Cancel</div>";
				zanimationsdiv += "</div></div>";
				dGet('wtw_uploadedmodelsanimationsdiv').innerHTML = zanimationsdiv;
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-loadObjectDetailsAnimations=" + ex.message);
	}
}

WTWJS.prototype.loadObjectAnimation = async function(zobjectanimationid) {
	/* load the 3D Object animation to the edit form (included on the 3D Object details page form) */
	try {
		WTW.hide('wtw_deleteanimation');
		WTW.hide('wtw_canceldeleteanimation');
		WTW.hide('wtw_addanimationdiv');
		var zrequest = {
			'objectanimationid': zobjectanimationid,
			'function':'getobjectanimation'
		};
		WTW.postAsyncJSON("/core/handlers/animations.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse[0] != null) {
					dGet('wtw_tobjectanimationid').value = zresponse[0].objectanimationid;
					dGet('wtw_tuploadobjectid').value = zresponse[0].uploadobjectid;
					dGet('wtw_tanimationname').value = zresponse[0].animationname;
					dGet('wtw_tmoldnamepart').value = zresponse[0].moldnamepart;
					dGet('wtw_tstartframe').value = zresponse[0].startframe;
					dGet('wtw_tendframe').value = zresponse[0].endframe;
					dGet('wtw_tspeedratio').value = zresponse[0].speedratio;
					dGet('wtw_tanimationendscript').value = zresponse[0].animationendscript;
					dGet('wtw_tanimationendparameters').value = zresponse[0].animationendparameters;
					dGet('wtw_tobjectsoundid').value = zresponse[0].soundid;
					dGet('wtw_tobjectsoundpath').value = zresponse[0].soundpath;
					dGet('wtw_objectselectedsound').innerHTML = zresponse[0].soundname;
					dGet('wtw_objectsoundicon').alt = zresponse[0].soundname;
					dGet('wtw_objectsoundicon').title = zresponse[0].soundname;
					dGet('wtw_tobjectsoundmaxdistance').value = zresponse[0].soundmaxdistance;
					WTW.setDDLValue('wtw_tmoldevent', zresponse[0].moldevent)
					if (zresponse[0].animationloop == '1') {
						dGet('wtw_tanimationloop').checked = true;
					} else {
						dGet('wtw_tanimationloop').checked = false;
					}
					if (zresponse[0].stopcurrentanimations == '1') {
						dGet('wtw_tstopcurrentanimations').checked = true;
					} else {
						dGet('wtw_tstopcurrentanimations').checked = false;
					}
					WTW.show('wtw_addanimationdiv');
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-loadObjectAnimation=" + ex.message);
	}
}

WTWJS.prototype.deleteObjectAnimation = async function(zobjectanimationid, zuploadobjectid) {
	/* delete the 3D Object animation on the edit form (included on the 3D Object details page form) */
	try {
		WTW.hide('wtw_addanimationdiv');
		if (zobjectanimationid != '') {
			var zrequest = {
				'objectanimationid': zobjectanimationid,
				'function':'deleteobjectanimation'
			};
			WTW.postAsyncJSON("/core/handlers/animations.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					WTW.hide('wtw_addanimationdiv');
					WTW.hide('wtw_deleteanimation');
					WTW.hide('wtw_canceldeleteanimation');
					WTW.loadObjectDetailsAnimations(zuploadobjectid)
				}
			);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-deleteObjectAnimation=" + ex.message);
	}
}

WTWJS.prototype.saveObjectAnimation = async function() {
	/* save the 3D Object animation on the edit form (included on the 3D Object details page form) */
	try {
		WTW.hide('wtw_addanimationdiv');
		if (dGet('wtw_tobjectanimationid').value != '') {
			var zanimationloop = '0';
			var zstopcurrentanimations = '0';
			if (dGet('wtw_tanimationloop').checked) {
				zanimationloop = '1';
			}
			if (dGet('wtw_tstopcurrentanimations').checked) {
				zstopcurrentanimations = '1';
			}
			var zrequest = {
				'objectanimationid': dGet('wtw_tobjectanimationid').value,
				'uploadobjectid': dGet('wtw_tuploadobjectid').value,
				'animationname': dGet('wtw_tanimationname').value,
				'moldevent': WTW.getDDLValue('wtw_tmoldevent'),
				'moldnamepart': dGet('wtw_tmoldnamepart').value,
				'startframe': dGet('wtw_tstartframe').value,
				'endframe': dGet('wtw_tendframe').value,
				'animationloop': zanimationloop,
				'speedratio': dGet('wtw_tspeedratio').value,
				'animationendscript': dGet('wtw_tanimationendscript').value,
				'animationendparameters': dGet('wtw_tanimationendparameters').value,
				'stopcurrentanimations': zstopcurrentanimations,
				'objectmaxdistance': dGet('wtw_tobjectsoundmaxdistance').value,
				'objectsoundid': dGet('wtw_tobjectsoundid').value,
				'function':'saveobjectanimation'
			};
			WTW.postAsyncJSON("/core/handlers/animations.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					WTW.hide('wtw_addanimationdiv');
					WTW.hide('wtw_deleteanimation');
					WTW.hide('wtw_canceldeleteanimation');
					WTW.loadObjectDetailsAnimations(dGet('wtw_tuploadobjectid').value)
				}
			);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-saveObjectAnimation=" + ex.message);
	}
}

WTWJS.prototype.addAnimation = function(zuploadobjectid) {
	/* add a 3D Object animation with the edit form (included on the 3D Object details page form) */
	try {
		dGet('wtw_tobjectanimationid').value = WTW.getRandomString(16);
		dGet('wtw_tuploadobjectid').value = zuploadobjectid;
		dGet('wtw_tanimationname').value = '';
		dGet('wtw_tmoldevent').selectedIndex = 0;
		dGet('wtw_tmoldnamepart').value = '';
		dGet('wtw_tstartframe').value = '';
		dGet('wtw_tendframe').value = '';
		dGet('wtw_tanimationloop').checked = false;
		dGet('wtw_tspeedratio').value = '1.00';
		dGet('wtw_tanimationendscript').value = '';
		dGet('wtw_tanimationendparameters').value = '';
		dGet('wtw_tstopcurrentanimations').checked = false;
		dGet('wtw_addanimationtitle').innerHTML = 'Add Animation';
		dGet('wtw_tobjectsoundmaxdistance').value = '1.00';
		dGet('wtw_objectselectedsound').innerHTML = '';
		dGet('wtw_objectsoundicon').alt = '';
		dGet('wtw_objectsoundicon').title = '';
		dGet('wtw_tobjectsoundid').value = '';
		dGet('wtw_tobjectsoundpath').value = '';
		WTW.show('wtw_addanimationdiv');
		dGet('wtw_tanimationname').focus();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-addAnimation=" + ex.message);
	}
}


/* email server settings */

WTWJS.prototype.openEmailServerSettings = function() {
	/* open email server settings form */
	try {
		WTW.show('wtw_loadingemailserver');
		WTW.show('wtw_settingspage');
		WTW.show('wtw_emailserversettings');
		WTW.getSettings("smtphost, smtpport, smtpusername, smtppassword, smtpencryption, fromemail, fromemailname, enableemailvalidation", "WTW.loadEmailServerSettings");
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-openEmailServerSettings=" + ex.message);
	}
}

WTWJS.prototype.loadEmailServerSettings = function(zsettings, zparameters) {
	/* load any existing email server settings */
	try {
		WTW.hide('wtw_loadingemailserver');
		zsettings = JSON.parse(zsettings);
		if (zsettings.smtphost != undefined) {
			dGet('wtw_tsmtphost').value = zsettings.smtphost;					
		}
		if (zsettings.smtpport != undefined) {
			dGet('wtw_tsmtpport').value = zsettings.smtpport;					
		}
		if (zsettings.smtpusername != undefined) {
			dGet('wtw_tsmtpusername').value = zsettings.smtpusername;					
		}
		if (zsettings.smtppassword != undefined) {
			dGet('wtw_tsmtppassword').value = atob(zsettings.smtppassword);					
		}
		if (zsettings.fromemail != undefined) {
			dGet('wtw_tfromemail').value = zsettings.fromemail;					
		}
		if (zsettings.fromemailname != undefined) {
			dGet('wtw_tfromemailname').value = zsettings.fromemailname;					
		}
		if (zsettings.smtpencryption != undefined) {
			dGet('wtw_tsmtpencryptionnone').checked = false;
			dGet('wtw_tsmtpencryptionssl').checked = false;
			dGet('wtw_tsmtpencryptiontls').checked = false;
			if (zsettings.smtpencryption == 'tls') {
				dGet('wtw_tsmtpencryptiontls').checked = true;
			} else if (zsettings.smtpencryption == 'ssl') {
				dGet('wtw_tsmtpencryptionssl').checked = true;
			} else {
				dGet('wtw_tsmtpencryptionnone').checked = true;
			}
		}
		if (zsettings.enableemailvalidation != undefined) {
			WTW.enableEmailValidation = Number(zsettings.enableemailvalidation);
			if (dGet('wtw_emailvalidation') != null) {
				if (WTW.enableEmailValidation == 1) {
					dGet('wtw_emailvalidation').checked = true;
					dGet('wtw_emailvalidationtext').className = 'wtw-enablelabel';
					dGet('wtw_emailvalidationtext').innerHTML = 'User Email Validation Enabled';
				} else {
					dGet('wtw_emailvalidation').checked = false;
					dGet('wtw_emailvalidationtext').className = 'wtw-disabledlabel';
					dGet('wtw_emailvalidationtext').innerHTML = 'User Email Validation Disabled';
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-loadEmailServerSettings=" + ex.message);
	}
}

WTWJS.prototype.saveEmailServerSettings = function() {
	/* save email server settings */
	try {
		var zsmtphost = dGet('wtw_tsmtphost').value;
		var zsmtpport = dGet('wtw_tsmtpport').value;
		var zsmtpusername = dGet('wtw_tsmtpusername').value;
		var zsmtppassword = btoa(dGet('wtw_tsmtppassword').value);
		var zencryption = '';
		var zfromemail = dGet('wtw_tfromemail').value;
		var zfromemailname = dGet('wtw_tfromemailname').value;
		if (dGet('wtw_tsmtpencryptionssl').checked) {
			zencryption = 'ssl';
		} else if (dGet('wtw_tsmtpencryptiontls').checked) {
			zencryption = 'tls';
		}
		
		var zsettings = {
			'smtphost': zsmtphost,
			'smtpport': zsmtpport,
			'smtpusername': zsmtpusername,
			'smtppassword': zsmtppassword,
			'smtpencryption': zencryption,
			'fromemail': zfromemail,
			'fromemailname': zfromemailname
		};
		WTW.saveSettings(zsettings, "WTW.saveEmailServerSettingsComplete");
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-saveEmailServerSettings=" + ex.message);
	}
}

WTWJS.prototype.saveEmailServerSettingsComplete = function(zsuccess) {
	/* completed saving email server settings, report results */
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
		WTW.log("core-scripts-admin-wtw_adminforms.js-saveEmailServerSettingsComplete=" + ex.message);
	}
}

WTWJS.prototype.testEmailServerSettings = async function() {
	/* test Email Server Settings */
	try {
		var zrequest = {
			'sendto': dGet('wtw_ttestemail').value,
			'subject': 'Test Message from WalkTheWeb',
			'message':'This is a test message',
			'function':'sendadminemail'
		};
		WTW.postAsyncJSON("/core/handlers/tools.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.serror != '') {
					dGet('wtw_emailservercomplete').innerHTML = zresponse.serror;
					dGet('wtw_emailservercomplete').style.color = "red";
				} else {
					dGet('wtw_emailservercomplete').innerHTML = "Email Sent Successfully";
					dGet('wtw_emailservercomplete').style.color = "green";
				}
				window.setTimeout(function() {
					dGet('wtw_emailservercomplete').innerHTML = "";
				},5000);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-testEmailServerSettings=" + ex.message);
	}
}

WTWJS.prototype.changeEmailSwitch = function() {
	/* enable user email verification process */
	try {
		if (dGet('wtw_emailvalidation') != null) {
			if (dGet('wtw_emailvalidation').checked) {
				dGet('wtw_emailvalidationtext').className = 'wtw-enablelabel';
				dGet('wtw_emailvalidationtext').innerHTML = 'User Email Validation Enabled';
				WTW.enableEmailValidation = 1;
			} else {
				dGet('wtw_emailvalidationtext').className = 'wtw-disabledlabel';
				dGet('wtw_emailvalidationtext').innerHTML = 'User Email Validation Disabled';
				WTW.enableEmailValidation = 0;
			}
			WTW.saveSetting("enableemailvalidation", WTW.enableEmailValidation + '');
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-changeEmailSwitch=" + ex.message);
	}
}

/* web aliases - mapping urls to 3D Communities, 3D Buildings, and 3D Things */

WTWJS.prototype.openWebAliasSettings = async function() {
	/* open web aliases page form */
	try {
		WTW.show('wtw_loadingwebalias');
		WTW.show('wtw_settingspage');
		WTW.show('wtw_webaliassettings');
		dGet('wtw_webaliaslist').innerHTML = "";
		WTW.getAsyncJSON("/connect/webaliases.php", 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					var zwebaliaslist = "<table class=\"wtw-table\"><tr><td class=\"wtw-tablecolumnheading\"><b>Web URL</b></td><td class=\"wtw-tablecolumnheading\"><b>Domain Name</b></td><td class=\"wtw-tablecolumnheading\"><b>Community</b></td><td class=\"wtw-tablecolumnheading\"><b>Building</b></td><td class=\"wtw-tablecolumnheading\"><b>Thing</b></td><td class=\"wtw-tablecolumnheading\"><b>&nbsp;</b></td></tr>";
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							if (zresponse[i].webaliasid != undefined) {
								var zforcehttps = zresponse[i].forcehttps;
								var zdomainname = zresponse[i].domainname;
								var zcommunitypub = zresponse[i].communitypublishname;
								var zbuildingpub = zresponse[i].buildingpublishname;
								var zthingpub = zresponse[i].thingpublishname;
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
								zwebaliaslist += "<tr><td class=\"wtw-tablecolumns\"><a href='" + zurl + "' target='_blank'>" + zurl + "</a></td><td class=\"wtw-tablecolumns\">" + zdomainname + "</td><td class=\"wtw-tablecolumns\">" + zcommunitypub + "</td><td class=\"wtw-tablecolumns\">" + zbuildingpub + "</td><td class=\"wtw-tablecolumns\">" + zthingpub + "</td><td class=\"wtw-tablecolumns\"><div class='wtw-bluebuttonright' onclick=\"WTW.editWebAlias('" + zresponse[i].webaliasid + "');\">Edit</div></td></tr>";
							}
						}
					}
					zwebaliaslist += "</table>"
					dGet('wtw_webaliaslist').innerHTML = zwebaliaslist;
					WTW.hide('wtw_loadingwebalias');
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-openWebAliasSettings=" + ex.message);
	}
}

WTWJS.prototype.editWebAlias = async function(zwebaliasid) {
	/* load to edit a web alias */
	try {
		WTW.openAliasForm();
		WTW.getAsyncJSON("/connect/webalias.php?webaliasid=" + zwebaliasid, 
			function(zresponse) {
				var zcommunityid = "";
				var zbuildingid = "";
				var zthingid = "";
				var zforcehttps = "";
				var zdomainname = "";
				var zcommunitypub = "";
				var zbuildingpub = "";
				var zthingpub = "";
				
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							if (zresponse[i].webaliasid != undefined) {
								zforcehttps = zresponse[i].forcehttps;
								zdomainname = zresponse[i].domainname;
								zcommunitypub = zresponse[i].communitypublishname;
								zbuildingpub = zresponse[i].buildingpublishname;
								zthingpub = zresponse[i].thingpublishname;
								zcommunityid = zresponse[i].communityid;
								zbuildingid = zresponse[i].buildingid;
								zthingid = zresponse[i].thingid;
							}
						}
					}
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
				if (zcommunityid != "") {
					WTW.setAliasCommunities(zcommunityid);
				}
				if (zbuildingid != "") {
					WTW.setAliasBuildings(zbuildingid);
				}
				if (zthingid != "") {
					WTW.setAliasThings(zthingid);
				}
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
				dGet('wtw_taliaspathtype').focus();
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-editWebAlias=" + ex.message);
	}
}

WTWJS.prototype.setAliasCommunities = async function(zcommunityid) {
	/* drop down list of 3D Communities to select a 3D Community to map */
	try {
		if (zcommunityid == undefined) {
			zcommunityid = '';
		}
		WTW.clearDDL("wtw_aliasdomaincommunityid");
		WTW.clearDDL("wtw_aliascommunityid");
		WTW.getAsyncJSON("/connect/communitynames.php", 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							if (zresponse[i].communityid != undefined && zresponse[i].communityname != undefined) {
								var zoption = document.createElement("option");
								zoption.text = zresponse[i].communityname;
								zoption.value = zresponse[i].communityid;
								if (i == 0 && zcommunityid == '') {
									zoption.selected = true;
								} else if (zcommunityid == zresponse[i].communityid) {
									zoption.selected = true;
								}
								var zoption2 = zoption.cloneNode(true);
								dGet("wtw_aliasdomaincommunityid").add(zoption);
								dGet("wtw_aliascommunityid").add(zoption2);
							}
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-setAliasCommunities=" + ex.message);
	}
}

WTWJS.prototype.setAliasBuildings = async function(zbuildingid) {
	/* drop down list of 3D Buildings to select a 3D Building to map */
	try {
		if (zbuildingid == undefined) {
			zbuildingid = '';
		}
		WTW.clearDDL("wtw_aliasbuildingid");
		WTW.getAsyncJSON("/connect/buildingnames.php", 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							if (zresponse[i].buildingid != undefined && zresponse[i].buildingname != undefined) {
								var zoption = document.createElement("option");
								zoption.text = zresponse[i].buildingname;
								zoption.value = zresponse[i].buildingid;
								if (i == 0 && zbuildingid == '') {
									zoption.selected = true;
								} else if (zbuildingid == zresponse[i].buildingid) {
									zoption.selected = true;
								}
								dGet("wtw_aliasbuildingid").add(zoption);
							}
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-setAliasBuildings=" + ex.message);
	}
}

WTWJS.prototype.setAliasThings = async function(zthingid) {
	/* drop down list of 3D Things to select a 3D Thing to map */
	try {
		if (zthingid == undefined) {
			zthingid = '';
		}
		WTW.clearDDL("wtw_aliasthingid");
		WTW.getAsyncJSON("/connect/thingnames.php", 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							if (zresponse[i].thingid != undefined && zresponse[i].thingname != undefined) {
								var zoption = document.createElement("option");
								zoption.text = zresponse[i].thingname;
								zoption.value = zresponse[i].thingid;
								if (i == 0 && zthingid == '') {
									zoption.selected = true;
								} else if (zthingid == zresponse[i].thingid) {
									zoption.selected = true;
								}
								dGet("wtw_aliasthingid").add(zoption);
							}
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-setAliasThings=" + ex.message);
	}
}

WTWJS.prototype.openAliasForm = function() {
	/* open edit web alias form */
	try {
		WTW.clearAliasForm();
		dGet('wtw_aliaslevel1').innerHTML = "Domain Name";
		dGet('wtw_aliaslevel1').style.visibility = "visible";
		dGet('wtw_aliastext1').style.visibility = "visible";
		dGet('wtw_aliasselect1').style.visibility = "visible";
		WTW.show('wtw_addwebaliasdiv');
		WTW.hide('wtw_addwebalias');
		WTW.hide('wtw_baliasdelete');
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-openAliasForm=" + ex.message);
	}
}

WTWJS.prototype.clearAliasForm = function() {
	/* clear web alias edit form */
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
		WTW.log("core-scripts-admin-wtw_adminforms.js-clearAliasForm=" + ex.message);
	}
}

WTWJS.prototype.setAliasForm = function(zobj) {
	/* web alias form fields depend on what level to map */
	/* example: you can create a URL to a 3D Building within a 3D Community */
	/* Note that you can also map more than one domain name to the same 3D Community */
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
		WTW.log("core-scripts-admin-wtw_adminforms.js-setAliasForm=" + ex.message);
	}
}

WTWJS.prototype.saveAliasForm = async function(w) {
	/* save web alias url */
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
					'forcehttps': zforcehttps,
					'function':'savewebalias'
				};
				WTW.postAsyncJSON("/core/handlers/uploads.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						WTW.clearAliasForm();
						WTW.hide('wtw_addwebaliasdiv');
						WTW.show('wtw_addwebalias');
						WTW.openWebAliasSettings();
					}
				);
				break;
			case -1: /* cancel */
				WTW.clearAliasForm();
				WTW.hide('wtw_addwebaliasdiv');
				WTW.show('wtw_addwebalias');
				break;
			case 0: /* delete */
				var zrequest = {
					'webaliasid': zwebaliasid,
					'function':'deletewebalias'
				};
				WTW.postAsyncJSON("/core/handlers/uploads.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						WTW.clearAliasForm();
						WTW.hide('wtw_addwebaliasdiv');
						WTW.show('wtw_addwebalias');
						WTW.openWebAliasSettings();
					}
				);
				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-saveAliasForm=" + ex.message);
	}
}

/* API Keys Admin */

WTWJS.prototype.openAPIKeys = async function(zdeleted) {
	/* open API Keys page form */
	try {
		if (zdeleted == undefined) {
			zdeleted = 0;
		}
		WTW.show('wtw_loadingapikeys');
		WTW.show('wtw_settingspage');
		WTW.show('wtw_apikeyssettings');
		dGet('wtw_apikeyslist').innerHTML = "";
		var zrequest = {
			'deleted':zdeleted,
			'function':'getapikeys'
		};
		WTW.postAsyncJSON("/core/handlers/api.php", zrequest,
			function(zresponse) {
				if (zresponse != null) {
					zresponse = JSON.parse(zresponse);
					/* send JSON results to be formated on the form */
					WTW.displayAPIKeys(zresponse, zdeleted);
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-openAPIKeys=" + ex.message);
	}
}

WTWJS.prototype.displayAPIKeys = function(zresponse, zdeleted) {
	/* display API Keys on the full page form */
	try {
		if (zdeleted == undefined) {
			zdeleted = 0;
		}
		if (zdeleted == 0) {
			dGet('wtw_apikeystitle').innerHTML = "<div class='wtw-bluebuttonright' onclick=\"WTW.openAPIKeys(1);\">Show Deleted API Keys</div>Active API Keys";
		} else {
			dGet('wtw_apikeystitle').innerHTML = "<div class='wtw-bluebuttonright' onclick=\"WTW.openAPIKeys(0);\">Show Active API Keys</div>Deleted API Keys";
		}
		if (zresponse != null) {
			var zapikeyslist = "<table class=\"wtw-table\"><tr><td class=\"wtw-tablecolumnheading\"><b>App URL</b></td><td class=\"wtw-tablecolumnheading\"><b>App Name</b></td><td class=\"wtw-tablecolumnheading\"><b>WalkTheWeb Key</b></td><td class=\"wtw-tablecolumnheading\"><b>Approved</b></td><td class=\"wtw-tablecolumnheading\"><b>Date</b></td><td class=\"wtw-tablecolumnheading\"><b>&nbsp;</b></td></tr>";
			if (zresponse.apikeys != undefined) {
				for (var i=0;i<zresponse.apikeys.length;i++) {
					if (zresponse.apikeys[i] != null) {
						if (zresponse.apikeys[i].appurl != undefined) {
							var zapprovetext = '';
							if (zresponse.apikeys[i].approved == '1') {
								zapprovetext = WTW.formatDate(zresponse.apikeys[i].approveddate);
							} else if (zresponse.apikeys[i].approveddate != null) {
								zapprovetext = "<span style='red'>Denied</span>";
							}
							zapikeyslist += "<tr><td class=\"wtw-tablecolumns\"><a href='" + zresponse.apikeys[i].appurl + "' target='_blank'>" + zresponse.apikeys[i].appurl + "</a></td><td class=\"wtw-tablecolumns\">" + zresponse.apikeys[i].appname + "</td><td class=\"wtw-tablecolumns\">" + zresponse.apikeys[i].wtwkey + "</td><td class=\"wtw-tablecolumns\">" + zapprovetext + "</td><td class=\"wtw-tablecolumns\">" + WTW.formatDate(zresponse.apikeys[i].createdate) + "</td>";
							if (zresponse.apikeys[i].approveddate != null) {
								zapikeyslist += "<td class=\"wtw-tablecolumns\"><div class='wtw-bluebuttonright' onclick=\"WTW.openAPIKeyForm('" + zresponse.apikeys[i].apikeyid + "');\">Edit</div></td>";
							} else {
								zapikeyslist += "<td class=\"wtw-tablecolumns\"><div class='wtw-redbuttonright' onclick=\"WTW.approveAPIKey('" + zresponse.apikeys[i].apikeyid + "','0');\">Deny</div><div class='wtw-greenbuttonright' onclick=\"WTW.approveAPIKey('" + zresponse.apikeys[i].apikeyid + "','1');\">Approve</div></td>";
							}
							zapikeyslist += "</tr>";
						}
					}
				}
			}
			zapikeyslist += "</table>"
			dGet('wtw_apikeyslist').innerHTML = zapikeyslist;
			WTW.hide('wtw_loadingapikeys');
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-displayAPIKeys=" + ex.message);
	}
}

WTWJS.prototype.approveAPIKey = async function(zapikeyid, zapproved) {
	/* save API Key approval, 0 is denied, 1 is approved */
	try {
		dGet('wtw_apikeyerror').innerHTML = '';
		var zrequest = {
			'apikeyid':btoa(zapikeyid),
			'approved':zapproved,
			'function':'approveapikey'
		};
		WTW.postAsyncJSON("/core/handlers/api.php", zrequest,
			function(zresponse) {
				if (zresponse != null) {
					zresponse = JSON.parse(zresponse);
					if (zresponse.serror == '') {
						/* no error, refresh display list */
						WTW.displayAPIKeys(zresponse, 0);
					} else {
						/* if error, show error mesage for 5 seconds */
						dGet('wtw_apikeyerror').innerHTML = zresponse.serror;
						window.setTimeout(function(){
							dGet('wtw_apikeyerror').innerHTML = '';
						},5000);
					}
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-approveAPIKey=" + ex.message);
	}
}

WTWJS.prototype.openAPIKeyForm = async function(zapikeyid) {
	/* open edit API Key form */
	try {
		if (zapikeyid == undefined) {
			zapikeyid = '';
		}
		WTW.clearAPIKeyForm();
		WTW.hide('wtw_addapikey');
		if (zapikeyid == '') {
			dGet("wtw_tapikeyid").value = '';
			dGet('wtw_tapiappname').value = 'New App';
			dGet('wtw_tapiappurl').value = 'https://';
			dGet('wtw_tapiwtwkey').value = 'ck_' + WTW.getRandomString(40,1);
			dGet('wtw_tapiwtwsecret').value = 'cs_' + WTW.getRandomString(40,1);
			dGet('wtw_tapiwtwsecret').type = 'text';
			dGet('wtw_tapiwtwkey').disabled = false;
			dGet('wtw_tapiwtwsecret').disabled = false;
			dGet('wtw_bapikeysave').innerHTML = 'Save API Key';
			WTW.hide('wtw_bapikeydelete');
			WTW.hide('wtw_bapikeyrekey');
			WTW.show('wtw_apicopynote');
			WTW.show('wtw_addapikeydiv');
		} else {
			dGet("wtw_tapikeyid").value = zapikeyid;
			dGet('wtw_tapiwtwsecret').type = 'password';
			WTW.hide('wtw_apicopynote');

			var zrequest = {
				'apikeyid':btoa(zapikeyid),
				'function':'getapikey'
			};
			WTW.postAsyncJSON("/core/handlers/api.php", zrequest,
				function(zresponse) {
					if (zresponse != null) {
						zresponse = JSON.parse(zresponse);
						if (zresponse.apikeys[0] != null) {
							dGet('wtw_tapiwtwkey').disabled = false;
							dGet('wtw_tapiwtwsecret').disabled = false;
							dGet('wtw_tapiappname').value = zresponse.apikeys[0].appname;
							dGet('wtw_tapiappurl').value = zresponse.apikeys[0].appurl;
							dGet('wtw_tapiwtwkey').value = zresponse.apikeys[0].wtwkey;
							dGet('wtw_tapiwtwsecret').value = '*******************************************';
							dGet('wtw_tapiwtwkey').disabled = true;
							dGet('wtw_tapiwtwsecret').disabled = true;
							if (zresponse.apikeys[0].deleted == 1) {
								WTW.hide('wtw_bapikeydelete');
								WTW.hide('wtw_bapikeyrekey');
								dGet('wtw_bapikeysave').innerHTML = 'Restore API Key';
							} else {
								WTW.show('wtw_bapikeydelete');
								WTW.show('wtw_bapikeyrekey');
								dGet('wtw_bapikeysave').innerHTML = 'Save API Key';
							}
						}
					}
					WTW.show('wtw_addapikeydiv');
				}
			);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-openAPIKeyForm=" + ex.message);
	}
}

WTWJS.prototype.clearAPIKeyForm = function() {
	/* clear API Key edit form */
	try {
		dGet("wtw_tapikeyid").value = '';
		dGet('wtw_tapiappid').value = '';
		dGet('wtw_tapiappurl').value = '';
		dGet('wtw_tapiwtwkey').value = '';
		dGet('wtw_tapiwtwsecret').value = '';
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-clearAPIKeyForm=" + ex.message);
	}
}

WTWJS.prototype.newAPIKey = function() {
	/* assign New API Key on edit form */
	try {
		dGet('wtw_tapiwtwkey').disabled = false;
		dGet('wtw_tapiwtwsecret').disabled = false;
		dGet('wtw_tapiwtwkey').value = 'ck_' + WTW.getRandomString(40,1);
		dGet('wtw_tapiwtwsecret').value = 'cs_' + WTW.getRandomString(40,1);
		dGet('wtw_tapiwtwsecret').type = 'text';
		WTW.show('wtw_apicopynote');
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-newAPIKey=" + ex.message);
	}
}

WTWJS.prototype.saveAPIKeyForm = async function(w) {
	/* save API Key form */
	try {
		var zapikeyid = dGet('wtw_tapikeyid').value;
		switch (w) {
			case 1: /* save */
				dGet('wtw_tapiwtwkey').disabled = false;
				dGet('wtw_tapiwtwsecret').disabled = false;
				var zrequest = {
					'apikeyid': btoa(zapikeyid),
					'appid': btoa(dGet('wtw_tapiappid').value),
					'appname': btoa(dGet('wtw_tapiappname').value),
					'appurl': btoa(dGet('wtw_tapiappurl').value),
					'wtwkey': btoa(dGet('wtw_tapiwtwkey').value),
					'wtwsecret': btoa(dGet('wtw_tapiwtwsecret').value),
					'function':'saveapikey'
				};
				WTW.postAsyncJSON("/core/handlers/api.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						/* send JSON results to be formated on the form */
						WTW.clearAPIKeyForm();
						WTW.hide('wtw_addapikeydiv');
						WTW.show('wtw_addapikey');
						WTW.displayAPIKeys(zresponse, 0);
					}
				);
				break;
			case -1: /* cancel */
				WTW.clearAPIKeyForm();
				WTW.hide('wtw_addapikeydiv');
				WTW.show('wtw_addapikey');
				break;
			case 0: /* delete */
				var zrequest = {
					'apikeyid': btoa(zapikeyid),
					'function':'deleteapikey'
				};
				WTW.postAsyncJSON("/core/handlers/api.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						/* send JSON results to be formated on the form */
						WTW.clearAPIKeyForm();
						WTW.hide('wtw_addapikeydiv');
						WTW.show('wtw_addapikey');
						WTW.displayAPIKeys(zresponse, 0);
					}
				);
				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-saveAPIKeyForm=" + ex.message);
	}
}

/* server settings */

WTWJS.prototype.openServerSettings = async function() {
	/* open server settings page form */
	try {
		WTW.show('wtw_loadingserversettings');
		WTW.show('wtw_settingspage');
		WTW.show('wtw_serversettings');
		var zrequest = {
			'function':'getserversettings'
		};
		WTW.postAsyncJSON("/core/handlers/tools.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					/* load values into form */
					var zumask = '0027';
					var zchmod = '755';
					dGet('wtw_tserverinstanceid').disabled = false;
					if (zresponse.serverinstanceid != undefined) {
						dGet('wtw_tserverinstanceid').value = zresponse.serverinstanceid;
					} else {
						dGet('wtw_tserverinstanceid').value = '';
					}
					dGet('wtw_tserverinstanceid').disabled = true;
					if (zresponse.dbserver != undefined) {
						dGet('wtw_dbserver').value = zresponse.dbserver;
					} else {
						dGet('wtw_dbserver').value = '';
					}
					if (zresponse.dbname != undefined) {
						dGet('wtw_dbname').value = zresponse.dbname;
					} else {
						dGet('wtw_dbname').value = '';
					}
					if (zresponse.dbusername != undefined) {
						dGet('wtw_dbusername').value = zresponse.dbusername;
					} else {
						dGet('wtw_dbusername').value = '';
					}
					if (zresponse.dbpassword != undefined) {
						dGet('wtw_dbpassword').value = atob(zresponse.dbpassword);
					} else {
						dGet('wtw_dbpassword').value = '';
					}
					dGet('wtw_tableprefix').disabled = false;
					if (zresponse.tableprefix != undefined) {
						dGet('wtw_tableprefix').value = zresponse.tableprefix;
					} else {
						dGet('wtw_tableprefix').value = '';
					}
					dGet('wtw_tableprefix').disabled = true;
					if (zresponse.adminemail != undefined) {
						dGet('wtw_adminemail').value = zresponse.adminemail;
					} else {
						dGet('wtw_adminemail').value = '';
					}
					if (zresponse.adminname != undefined) {
						dGet('wtw_adminname').value = zresponse.adminname;
					} else {
						dGet('wtw_adminname').value = '';
					}
					if (zresponse.defaultdomain != undefined) {
						dGet('wtw_defaultdomain').value = zresponse.defaultdomain;
					} else {
						dGet('wtw_defaultdomain').value = '';
					}
					if (zresponse.defaultsitename != undefined) {
						dGet('wtw_defaultsitename').value = zresponse.defaultsitename;
					} else {
						dGet('wtw_defaultsitename').value = '';
					}
					if (zresponse.googleanalytics != undefined) {
						dGet('wtw_googleanalytics').value = zresponse.googleanalytics;
					} else {
						dGet('wtw_googleanalytics').value = '';
					}
					if (zresponse.contentpath != undefined) {
						dGet('wtw_contentpath').value = zresponse.contentpath;
					} else {
						dGet('wtw_contentpath').value = '';
					}
					dGet('wtw_contenturl').disabled = false;
					if (zresponse.contenturl != undefined) {
						dGet('wtw_contenturl').value = zresponse.contenturl;
					} else {
						dGet('wtw_contenturl').value = '';
					}
					dGet('wtw_contenturl').disabled = true;
					if (zresponse.umask != undefined) {
						zumask = zresponse.umask;
					}
					dGet('wtw_umask').value = zumask;
					if (zresponse.chmod != undefined) {
						zchmod = zresponse.chmod;
					}
					dGet('wtw_chmod').value = zchmod;
					if (zresponse.ftphost != undefined) {
						dGet('wtw_ftphost').value = zresponse.ftphost;
					} else {
						dGet('wtw_ftphost').value = '';
					}
					if (zresponse.ftpuser != undefined) {
						dGet('wtw_ftpuser').value = zresponse.ftpuser;
					} else {
						dGet('wtw_ftpuser').value = '';
					}
					if (zresponse.ftppassword != undefined) {
						dGet('wtw_ftppassword').value = atob(zresponse.ftppassword);
					} else {
						dGet('wtw_ftppassword').value = '';
					}
					if (zresponse.ftpbase != undefined) {
						dGet('wtw_ftpbase').value = zresponse.ftpbase;
					} else {
						dGet('wtw_ftpbase').value = '';
					}
					WTW.hide('wtw_loadingserversettings');
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-openServerSettings=" + ex.message);
	}
}

WTWJS.prototype.saveServerSettings = async function() {
	/* save Server Settings to the Config file */
	try {
		var zrequest = {
			'dbserver': dGet('wtw_dbserver').value,
			'dbname': dGet('wtw_dbname').value,
			'dbusername': dGet('wtw_dbusername').value,
			'dbpassword': btoa(dGet('wtw_dbpassword').value),
			'contentpath': dGet('wtw_contentpath').value,
			'defaultdomain': dGet('wtw_defaultdomain').value,
			'defaultsitename': dGet('wtw_defaultsitename').value,
			'googleanalytics': dGet('wtw_googleanalytics').value,
			'adminemail': dGet('wtw_adminemail').value,
			'adminname': dGet('wtw_adminname').value,
			'umask': dGet('wtw_umask').value,
			'chmod': dGet('wtw_chmod').value,
			'ftpuser': dGet('wtw_ftpuser').value,
			'ftppassword': btoa(dGet('wtw_ftppassword').value),
			'ftpbase': dGet('wtw_ftpbase').value,
			'function':'saveserversettings'
		};
		WTW.postAsyncJSON("/core/handlers/tools.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				if (zresponse.serror != '') {
					dGet('wtw_serversettingscomplete').innerHTML = zresponse.serror;
					dGet('wtw_serversettingscomplete').style.color = 'red';
				} else {
					dGet('wtw_serversettingscomplete').innerHTML = 'Server Settings Saved';
					dGet('wtw_serversettingscomplete').style.color = 'green';
				}
				window.setTimeout(function() {
					dGet('wtw_serversettingscomplete').innerHTML = '';
				},5000);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-saveServerSettings=" + ex.message);
	}
}

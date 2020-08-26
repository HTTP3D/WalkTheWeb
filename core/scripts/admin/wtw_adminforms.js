/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are used to administer a website in admin mode only */

/* admin forms are the full page screens that appear when admin menu items are selected. */
/* samples include: dashboard, updates, media library, 3D plugins list, settings, etc... */
/* note: user list functions are located on the wtw_adminusers.js file */

WTWJS.prototype.openFullPageForm = function(pageid, setcategory, item, itemname, itemnamepath, previewname) {
	/* this function sets the form page title, sections, menu options, breadcrumbs, etc */
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
		dGet('wtw_tfileitem').value = item;
		dGet('wtw_tfileitemname').value = itemname;
		dGet('wtw_tfileitemnamepath').value = itemnamepath;
		dGet('wtw_tfileitempreviewname').value = previewname;
		/* hide any previously loaded pages */
		WTW.hideFullPages();
		WTW.hide('wtw_mediapage');
		WTW.hide('wtw_menuwtwdownloads');
		WTW.show('wtw_fullpageform');
		/* select page to show */
		switch (pageid) {
			case "error":
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Users</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + setcategory + "</div>";
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
		WTW.log("core-scripts-admin-wtw_adminforms.js-hideFullPages=" + ex.message);
	}
}


/* WalkTheWeb and 3D Plugin Updates */

/* check for updates */
WTWJS.prototype.checkForUpdates = function(zshow) {
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
		WTW.postJSON("/core/handlers/pluginloader.php", zrequest, 
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

WTWJS.prototype.getPluginInfoComplete = function(zmyplugins, zshow) {
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
		WTW.getJSON("https://3dnet.walktheweb.com/connect/checkforupdates.php?pluginnames=" + zplugins, 
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
									zupdateslist += "<div class=\"wtw-dashboardboxtitle\">WalkTheWeb has an update!</div><div class=\"wtw-dashboardbox\">Your Version: " + wtw_version + " (" + versiondatestring + ")<br /><br />";
									zupdateslist += "<b>New Version Available:</b><hr />";
									zupdateslist += "App Name=" + zmyplugins[i].pluginname + "<br />";
									zupdateslist += "App Version=" + zmyplugins[i].latestversion + "<br />";
									zupdateslist += "App Update=" + datestring + "<br />";
									zupdateslist += "Backup your files and database before updating!<br />";
									zupdatewtw += 1;
								}
								zupdateslist += "<div id=\"wtw_loadingupdating\" class=\"wtw-loadingnotice\">Updating...</div>";
								if (zmyplugins[i].latestversion != wtw_version) {
									zupdateslist += "<div class=\"wtw-greenmenubutton\" onclick=\"WTW.updateWalkTheWeb('" + zmyplugins[i].pluginname + "','" + zmyplugins[i].latestversion + "','" + datestring + "','" + zmyplugins[i].updateurl + "');\">Update Now!</div>";
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

WTWJS.prototype.getVersionDetails = function(zupdateid) {
	/* get version details on a particular 3D Plugin */
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
		WTW.log("core-scripts-admin-wtw_adminforms.js-getVersionDetails=" + ex.message);
	}
}

/* 3D Plugins */
WTWJS.prototype.openAllPlugins = function(zpluginname, zactive) {
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
		WTW.postJSON("/core/handlers/pluginloader.php", zrequest, 
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

WTWJS.prototype.activatePlugin = function(zpluginname, zactive) {
	/* activate or deactivate a 3D Plugin */
	try {
		var zrequest = {
			'pluginname': zpluginname,
			'active': zactive,
			'function':'activateplugin'
		};
		WTW.postJSON("/core/handlers/pluginloader.php", zrequest, 
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

WTWJS.prototype.updatePlugin = function(zpluginname, zversion, zupdatedate, zupdateurl, zshow) {
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
		WTW.postJSON("/core/handlers/pluginloader.php", zrequest, 
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
		WTW.log("core-scripts-admin-wtw_adminforms.js-getPluginLatestVersion=" + ex.message);
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
			'pluginname': zpluginname,
			'version': zversion,
			'updateurl': zupdateurl,
			'function':'getupdate'
		};
		WTW.postJSON("/core/handlers/pluginloader.php", zrequest, 
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

WTWJS.prototype.openDashboardForm = function(item) {
	/* load dashboard form */
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
		WTW.log("core-scripts-admin-wtw_adminforms.js-openDashboardForm=" + ex.message);
	}
}


/* media library forms */

/* media library - main media page form */
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
										dGet('wtw_mediathumbnail').src = uploadinfo[i].thumbnail.path;
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
										dGet('wtw_mediaoriginal').src = uploadinfo[i].original.path;
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
										dGet('wtw_mediawebsize').src = uploadinfo[i].websize.path;
										dGet('wtw_mediawebsizepath').innerHTML = "<a href='" + uploadinfo[i].websize.path + "' target='_blank'>" + uploadinfo[i].websize.path + "</a>";
										dGet('wtw_mediawebsizedownload').href = uploadinfo[i].websize.path;
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
WTWJS.prototype.setImageMenu = function(w) {
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
		WTW.show('wtw_bstartimageupload');
		if (WTW.isNumeric(w)) {
			switch (Number(w)) {
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

WTWJS.prototype.selectFileForm = function(obj) {
	/* filter the page form to show images, docs, sounds, or videos */
	/* while cross referencing the existing files in the edit object, My files, or stock */
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
		dGet('wtw_bstartimageupload').innerHTML = "Upload File(s)";
		dGet('wtw_showhiddenimagesdiv').innerHTML = "Show Hidden Files";
		if (communityid != '') {
			dGet('wtw_menuimagecommunity').innerHTML = "3D Community Files";
		} else if (buildingid != '') {
			dGet('wtw_menuimagecommunity').innerHTML = "3D Building Files";
		} else if (thingid != '') {
			dGet('wtw_menuimagecommunity').innerHTML = "3D Thing Files";
		}
		switch (category) {
			case '':
				WTW.loadMyFilesPage(zitem, category, hide);
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
				WTW.loadMyFilesPage(zitem, category, hide);
				WTW.loadStockPage(zitem);
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Select Image</div>";
				WTW.showInline('wtw_menuimagestock');
				if (communityid != '' || buildingid != '' || thingid != '') {
					WTW.loadCommunityPage(communityid, buildingid, thingid, zitem);
					WTW.showInline('wtw_menuimagecommunity');
				}
				break;
			case 'video':
				WTW.loadMyFilesPage(zitem, category, hide);
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Select Video</div>";
				break;
			case 'audio':
				WTW.loadMyFilesPage(zitem, category, hide);
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Select Sound</div>";
				break;
			case 'object':
				WTW.loadUploadedObjectsDiv(true);
				WTW.hide('wtw_menuimagemy');
				WTW.showInline('wtw_menuuploadedobjects');
				WTW.setImageMenu(4);
				break;
			case 'doc':
				WTW.loadMyFilesPage(zitem, category, hide);
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Select Document</div>";
				break;
			default:
				WTW.loadMyFilesPage(zitem, category, hide);
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>Select File</div>";
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-selectFileForm=' + ex.message);
	}
}	

WTWJS.prototype.setSelectFileID = function(selectedobj, uploadid, originalid, websizeid, fileextension, filesize, filetitle, filename, filepath) {
	/* after selcting a file, implement the changes in the 3D Scene as necessary */
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
				extraGroundMaterial.specularColor = new BABYLON.Color3(.1, .1, .1);
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

WTWJS.prototype.loadMyFilesPage = function(zitem, zcategory, zhide) {
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
		WTW.postJSON("/core/handlers/uploads.php", zrequest, 
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
					var serror = "";
					switch (zcategory) {
						case 'image':
							serror += "<h1 class='wtw-red'>No Uploaded Images Found</h1>Use the <strong>Stock Files</strong> button above or<br /><br />the <strong>Upload</strong> button on the top right to <strong>Add an Image</strong>.";
							break;
						case 'video':
							serror += "<h1 class='wtw-red'>No Uploaded Videos Found</h1>Use the <strong>Upload</strong> button on the top right to <strong>Add a Video File</strong>.";
							break;
						case 'audio':
							serror += "<h1 class='wtw-red'>No Uploaded Sound Files Found</h1>Use the <strong>Upload</strong> button on the top right to <strong>Add an Audio File</strong>.";
							break;
						case 'doc':
							serror += "<h1 class='wtw-red'>No Uploaded Document Files Found</h1>Use the <strong>Upload</strong> button on the top right to <strong>Add a Document File</strong>.";
							break;
						case 'object':
							serror += "<h1 class='wtw-red'>No 3D Object Files Found</h1>Use the <strong>Upload</strong> button on the top right to <strong>Add a 3D Object File</strong>.";
							break;
						default:
							serror += "<h1 class='wtw-red'>No Files Found</h1>Use the <strong>Upload</strong> button on the top right to <strong>Add a File</strong>.";
							break;
					}
					zmyimagesdiv += "<div class='wtw-warningmessage'>" + serror + "<br /><br /></div>";
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

WTWJS.prototype.toggleHideMyImage = function(zuploadid, zitem, zcategory, zpagehide) {
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
		WTW.postJSON("/core/handlers/uploads.php", zrequest, 
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

WTWJS.prototype.loadStockPage = function(zitem) {
	/* this pagge form shows stock images, sounds, and videos as necessary */
	try {
		WTW.hide('wtw_stockimagesdiv');
		WTW.show('wtw_loadingselectimage');
		dGet('wtw_stockimagesdiv').innerHTML = "";
		var zrequest = {
			'item': zitem,
			'function':'getstockimages'
		};
		WTW.postJSON("/core/handlers/uploads.php", zrequest, 
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

WTWJS.prototype.loadCommunityPage = function(zcommunityid, zbuildingid, zthingid, zitem) {
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
		WTW.postJSON("/core/handlers/uploads.php", zrequest, 
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
			var form1 = document.createElement('form');
			var Httpreq = new XMLHttpRequest();
			var zformdata = new FormData(form1);
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
			var form1 = document.createElement('form');
			var Httpreq = new XMLHttpRequest();
			var zformdata = new FormData(form1);
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

WTWJS.prototype.resetUploadButton = function() {
	/* reset the upload button after an upload (in case you want to upload the same file name again) */
	try {
		if (dGet('wtw_bstartimageupload') != null) {
			var category = WTW.getDDLValue('wtw_fileselectcategory');
			if (dGet('wtw_menuuploadedobjectsdiv').style.display != 'none') {
				category = 'object';
			}
			dGet('wtw_bstartimageupload').innerHTML = "Upload File(s)";
			if ((category == '' || category == 'object') && dGet('wtw_menuuploadedobjects').className == 'wtw-menutabtopselected' && dGet('wtw_uploadedobjectsdiv').style.display != 'none') {
				if (dGet('wtw_uploadedobjectdetailsdiv').style.display == 'none') {
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

/* media library - 3D Objects uploads */
WTWJS.prototype.setSelectObject = function(zuploadobjectid, zobjectfolder, zobjectfile) {
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
		WTW.log("core-scripts-admin-wtw_adminforms.js-setSelectObject=" + ex.message);
	}
}

WTWJS.prototype.openObjectPageForm = function(zuploadobjectid, zfilename) {
	/* 3D Objects page form */
	try {
		var category = WTW.getDDLValue('wtw_fileselectcategory');
		dGet('wtw_tbackupfullpageformtitle').value = dGet('wtw_fullpageformtitle').innerHTML;
		dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowlink' onclick=\"WTW.openFullPageForm('medialibrary','" + category + "','');WTW.setImageMenu(4);\">Media Library</div><img id='wtw_arrowicon2' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + zfilename + "</div>";
		WTW.hide('wtw_uploadedobjectsdiv');
		WTW.hide('wtw_loadingselectimage');
		dGet('wtw_uploadedobjectdetailsdiv').style.height = (WTW.sizeY - 160) + 'px';
		WTW.show('wtw_uploadedobjectdetailsdiv');
		WTW.loadObjectDetailsName(zuploadobjectid);
		WTW.loadObjectDetailsAnimations(zuploadobjectid);
		dGet('wtw_bstartimageupload').innerHTML = 'Upload or Replace File(s)';
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-openObjectPageForm=" + ex.message);
	}
}

WTWJS.prototype.loadUploadedObjectsDiv = function(showloading) {
	/* load the settings (and list) for the 3D Objects div */
	try {
		dGet('wtw_bstartimageupload').innerHTML = 'Upload Primary 3D File';
		WTW.hide('wtw_uploadedobjectdetailsdiv');
		if (showloading) {
			WTW.hide('wtw_uploadedobjectsdiv');
			WTW.show('wtw_loadingselectimage');
		}
		dGet('wtw_uploadedobjectsdiv').innerHTML = "";
		var zrequest = {
			'function':'getuploadedfiles'
		};
		WTW.postJSON("/core/handlers/uploadedfiles.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zitem = dGet('wtw_tfileitem').value;
				for (var i=0;i<zresponse.length;i++) {
					zcreatedate = zresponse[i].createdate;
					//zcreatedate = date('m/d/Y', strtotime($zcreatedate));
					zlinktext = "Edit";
					if (zresponse[i].stock == '1') {
						zlinktext = "View";
					}
					if (zitem == "3dobject") {
						zlinktext = "Select";
						dGet('wtw_uploadedobjectsdiv').innerHTML += "<div class='wtw-objectcontainer'><div class='wtw-objectfile' onclick=\"WTW.setSelectObject('" + zresponse[i].uploadobjectid + "','" + zresponse[i].objectfolder + "','" + zresponse[i].objectfile + "');\">" + zresponse[i].objectfile + "</div><div class='wtw-objectfolder'>" + zresponse[i].objectfolder.replace("/objects/","/objects<br />/") + "<br /><br /><span style='color:gray;'>Uploaded on </span>" + zcreatedate + "<br /><br /><div class='wtw-rightbutton' onclick=\"WTW.setSelectObject('" + zresponse[i].uploadobjectid + "','" + zresponse[i].objectfolder + "','" + zresponse[i].objectfile + "');\">" + zlinktext + "</div><div class='wtw-rightbutton' onclick=\"WTW.openObjectPageForm('" + zresponse[i].uploadobjectid + "','" + zresponse[i].objectfile + "');\">Edit</div><div class='wtw-clear'></div></div></div>";
					} else {
						dGet('wtw_uploadedobjectsdiv').innerHTML += "<div class='wtw-objectcontainer'><div class='wtw-objectfile' onclick=\"WTW.openObjectPageForm('" + zresponse[i].uploadobjectid + "','" + zresponse[i].objectfile + "');\">" + zresponse[i].objectfile + "</div><div class='wtw-objectfolder'>" + zresponse[i].objectfolder.replace("/objects/","/objects<br />/") + "<br /><br /><span style='color:gray;'>Uploaded on </span>" + zcreatedate + "<br /><br /><div class='wtw-rightbutton' onclick=\"WTW.openObjectPageForm('" + zresponse[i].uploadobjectid + "','" + zresponse[i].objectfile + "');\">" + zlinktext + "</div><div class='wtw-clear'></div></div></div>";
					}
				}
				dGet('wtw_uploadedobjectsdiv').style.height = (WTW.sizeY - 160) + 'px';
				WTW.show('wtw_uploadedobjectsdiv');
				if (showloading) {
					WTW.hide('wtw_loadingselectimage');
				}
				WTW.resetUploadButton();
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-loadUploadedObjectsDiv=" + ex.message);
	}
}

WTWJS.prototype.loadObjectDetailsName = function(zuploadobjectid) {
	/* if an object is opened, this details page form shows */
	try {
		if (zuploadobjectid == undefined) {
			zuploadobjectid = dGet('wtw_tuploadobjectid').value;
		}
		dGet('wtw_uploadedobjectsnamediv').innerHTML = "";
		var znamediv = "";
		var zrequest = {
			'uploadobjectid': zuploadobjectid,
			'function':'getuploadedfilenamedetails'
		};
		WTW.postJSON("/core/handlers/uploadedfiles.php", zrequest, 
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
				dGet('wtw_uploadedobjectsnamediv').innerHTML = znamediv;
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
			var form1 = document.createElement('form');
			var Httpreq = new XMLHttpRequest();
			var zformdata = new FormData(form1);
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

WTWJS.prototype.deleteObjectFile = function() {
	/* delete 3D Mold Object file */
	try {
		var zobjectfilepart = dGet('wtw_tobjectfile').value;
		zobjectfilepart = zobjectfilepart.replace(".babylon","");
		var zrequest = {
			'filename': dGet('wtw_tdeletefile').value,
			'objectfilepart': zobjectfilepart,
			'function':'deleteobjectfile'
		};
		WTW.postJSON("/core/handlers/uploadedfiles.php", zrequest, 
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

WTWJS.prototype.loadObjectDetailsFiles = function(zuploadobjectid, zobjectfolder, zfilename) {
	/* files list included on the 3D Object details page form */
	try {
		dGet('wtw_uploadedobjectsfilesdiv').innerHTML = "";
		var zfilesdiv = "";
		var zrequest = {
			'objectfolder': zobjectfolder,
			'function':'getuploadedfilefilesdetails'
		};
		WTW.postJSON("/core/handlers/uploadedfiles.php", zrequest, 
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
				dGet('wtw_uploadedobjectsfilesdiv').innerHTML = zfilesdiv;
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-loadObjectDetailsFiles=" + ex.message);
	}
}

WTWJS.prototype.loadObjectDetailsAnimations = function(zuploadobjectid) {
	/* animations list included on the 3D Object details page form */
	try {
		dGet('wtw_uploadedobjectsanimationsdiv').innerHTML = "";
		var zanimationsdiv = "";
		var zrequest = {
			'uploadobjectid': zuploadobjectid,
			'function':'getuploadedfileanimationsdetails'
		};
		WTW.postJSON("/core/handlers/animations.php", zrequest, 
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
				dGet('wtw_uploadedobjectsanimationsdiv').innerHTML = zanimationsdiv;
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-loadObjectDetailsAnimations=" + ex.message);
	}
}

WTWJS.prototype.loadObjectAnimation = function(zobjectanimationid) {
	/* load the 3D Object animation to the edit form (included on the 3D Object details page form) */
	try {
		WTW.hide('wtw_deleteanimation');
		WTW.hide('wtw_canceldeleteanimation');
		WTW.hide('wtw_addanimationdiv');
		var zrequest = {
			'objectanimationid': zobjectanimationid,
			'function':'getobjectanimation'
		};
		WTW.postJSON("/core/handlers/animations.php", zrequest, 
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

WTWJS.prototype.deleteObjectAnimation = function(zobjectanimationid, zuploadobjectid) {
	/* delete the 3D Object animation on the edit form (included on the 3D Object details page form) */
	try {
		WTW.hide('wtw_addanimationdiv');
		if (zobjectanimationid != '') {
			var zrequest = {
				'objectanimationid': zobjectanimationid,
				'function':'deleteobjectanimation'
			};
			WTW.postJSON("/core/handlers/animations.php", zrequest, 
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

WTWJS.prototype.saveObjectAnimation = function() {
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
			WTW.postJSON("/core/handlers/animations.php", zrequest, 
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
		WTW.getSettings("smtphost, smtpport, smtplogin, smtppassword", "WTW.loadEmailServerSettings");
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-openEmailServerSettings=" + ex.message);
	}
}

WTWJS.prototype.loadEmailServerSettings = function(zsettings, zparameters) {
	/* load any existing email server settings */
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
		WTW.log("core-scripts-admin-wtw_adminforms.js-loadEmailServerSettings=" + ex.message);
	}
}

WTWJS.prototype.saveEmailServerSettings = function() {
	/* save email server settings */
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


/* web aliases - mapping urls to 3D Communities, 3D Buildings, and 3D Things */

WTWJS.prototype.openWebAliasSettings = function() {
	/* open web aliases page form */
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
		WTW.log("core-scripts-admin-wtw_adminforms.js-openWebAliasSettings=" + ex.message);
	}
}

WTWJS.prototype.editWebAlias = function(zwebaliasid) {
	/* load to edit a web alias */
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
		WTW.log("core-scripts-admin-wtw_adminforms.js-openWebAliasSettings=" + ex.message);
	}
}

WTWJS.prototype.setAliasCommunities = function(zcommunityid) {
	/* drop down list of 3D Communities to select a 3D Community to map */
	try {
		if (zcommunityid == undefined) {
			zcommunityid = '';
		}
		WTW.clearDDL("wtw_aliasdomaincommunityid");
		WTW.clearDDL("wtw_aliascommunityid");
		WTW.getJSON("/connect/communitynames.php", 
			function(response) {
				response = JSON.parse(response);
				if (response != null) {
					for (var i=0;i<response.length;i++) {
						if (response[i] != null) {
							if (response[i].communityid != undefined && response[i].communityname != undefined) {
								var zoption = document.createElement("option");
								zoption.text = response[i].communityname;
								zoption.value = response[i].communityid;
								if (i == 0 && zcommunityid == '') {
									zoption.selected = true;
								} else if (zcommunityid == response[i].communityid) {
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

WTWJS.prototype.setAliasBuildings = function(zbuildingid) {
	/* drop down list of 3D Buildings to select a 3D Building to map */
	try {
		if (zbuildingid == undefined) {
			zbuildingid = '';
		}
		WTW.clearDDL("wtw_aliasbuildingid");
		WTW.getJSON("/connect/buildingnames.php", 
			function(response) {
				response = JSON.parse(response);
				if (response != null) {
					for (var i=0;i<response.length;i++) {
						if (response[i] != null) {
							if (response[i].buildingid != undefined && response[i].buildingname != undefined) {
								var zoption = document.createElement("option");
								zoption.text = response[i].buildingname;
								zoption.value = response[i].buildingid;
								if (i == 0 && zbuildingid == '') {
									zoption.selected = true;
								} else if (zbuildingid == response[i].buildingid) {
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

WTWJS.prototype.setAliasThings = function(zthingid) {
	/* drop down list of 3D Things to select a 3D Thing to map */
	try {
		if (zthingid == undefined) {
			zthingid = '';
		}
		WTW.clearDDL("wtw_aliasthingid");
		WTW.getJSON("/connect/thingnames.php", 
			function(response) {
				response = JSON.parse(response);
				if (response != null) {
					for (var i=0;i<response.length;i++) {
						if (response[i] != null) {
							if (response[i].thingid != undefined && response[i].thingname != undefined) {
								var zoption = document.createElement("option");
								zoption.text = response[i].thingname;
								zoption.value = response[i].thingid;
								if (i == 0 && zthingid == '') {
									zoption.selected = true;
								} else if (zthingid == response[i].thingid) {
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

WTWJS.prototype.saveAliasForm = function(w) {
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
				WTW.postJSON("/core/handlers/uploads.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						WTW.openWebAliasSettings();
					}
				);
				break;
			case -1: /* cancel */
				break;
			case 0: /* delete */
				var zrequest = {
					'webaliasid': zwebaliasid,
					'function':'deletewebalias'
				};
				WTW.postJSON("/core/handlers/uploads.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						WTW.openWebAliasSettings();
					}
				);
				break;
		}
		WTW.clearAliasForm();
		WTW.hide('wtw_addwebaliasdiv');
		WTW.show('wtw_addwebalias');
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminforms.js-saveAliasForm=" + ex.message);
	}
}

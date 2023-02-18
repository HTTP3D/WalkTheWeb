/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are used to administer a website in admin mode only */

/* admin plugins includes the functions to administer plugins, check for updates, add, edit, remove, and share */


/* 3D Plugins functions */

WTWJS.prototype.openAllPlugins = async function(zpluginname, zactive) {
	/* open a list of all 3D Plugins found in the file system */
	try {
		WTW.show('wtw_pluginspage');
		WTW.show('wtw_loadingplugins');
		WTW.hide('wtw_allplugins');
		WTW.hide('wtw_pluginslist');
		dGet('wtw_pluginslist').innerHTML = '';
		var zrequest = {
			'function':'getallplugins'
		};
		WTW.postAsyncJSON('/core/handlers/pluginloader.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.openAllPluginsComplete(zresponse.plugins, zpluginname, zactive);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminplugins.js-openAllPlugins=' + ex.message);
	}
}

WTWJS.prototype.openAllPluginsComplete = function(zresponse, zpluginname, zactive) {
	/* open all 3D plugins process complete, display list of plugins */
	try {
		var zpluginslist = '';
		zresponse = JSON.parse(zresponse);
		if (zresponse != null) {
			zpluginslist += "<table class='wtw-table'><tr>";
			zpluginslist += "<td class='wtw-tablecolumnheading'>Plugin Name</td>";
			zpluginslist += "<td class='wtw-tablecolumnheading'>Details</td>";
			zpluginslist += "<td class='wtw-tablecolumnheading'>&nbsp;</td>";
			zpluginslist += "</tr>";
			for (var i=0;i<zresponse.length;i++) {
				if (zresponse[i] != null) {
					if (zresponse[i].pluginname != undefined) {
						var zpluginclass = 'wtw-deactive';
						var ztdclass = 'wtw-tddeactive';
						if (zresponse[i].active == '1') {
							zpluginclass = 'wtw-active';
							ztdclass = 'wtw-tdactive';
						}
						if (zresponse[i].required == '1') {
							zrequired = ' checked ';
							zhasrequirements = true;
							if (zresponse[i].active != '1') {
								ztdclass = 'wtw-tdactiverequired';
							}
						}
						if (zresponse[i].optional == '1') {
							zoptional = ' checked ';
							zhasrequirements = true;
							if (zresponse[i].active != '1') {
								ztdclass = 'wtw-tdactiveoptional';
							}
						}
						zpluginslist += "<tr><td class='wtw-tablecolumns " + ztdclass + "'><span class='" + zpluginclass + "'>" + zresponse[i].pluginname + "</span><br />Version: " + zresponse[i].version + "</td>";
						zpluginslist += "<td class='wtw-tablecolumns " + ztdclass + "'><span class='" + zpluginclass + "'>" + zresponse[i].title + "</span> : " + zresponse[i].author + "<br />" + zresponse[i].description + "<br /></td>";
						zpluginslist += "<td class='wtw-tablecolumns " + ztdclass + "'>";
						if (zresponse[i].active == '1') {
							if (WTW.isUserInRole('Admin')) {
								zpluginslist += "<div id='activate" + zresponse[i].pluginname + "' class='wtw-bluebuttonright' onclick=\"WTW.activatePlugin('" + zresponse[i].pluginname + "',0);\" alt='Click to Deactivate' title='Click to Deactivate'>Activated</div>";
							} else {
								zpluginslist += "<div id='activate" + zresponse[i].pluginname + "' class='wtw-bluebuttonright' onclick=\"console.log('Will Not Deactivate');\" alt='' title=''>Activated</div>";
							}
						} else {
							if (WTW.isUserInRole('Admin')) {
								zpluginslist += "<div id='activate" + zresponse[i].pluginname + "' class='wtw-yellowbuttonright' onclick=\"WTW.activatePlugin('" + zresponse[i].pluginname + "',1);\" alt='Click to Activate' title='Click to Activate'>Deactivated</div>";
							} else {
								zpluginslist += "<div id='activate" + zresponse[i].pluginname + "' class='wtw-yellowbuttonright' onclick=\"WTW.console.log('Request Activation');\" alt='Click to Request Activate' title='Click to Request Activate'>Deactivated</div>";
							}
						}
						zpluginslist += "</td></tr>";
						if (zresponse[i].active != '1' && zresponse[i].websrequired != undefined) {
							if (zresponse[i].websrequired.length > 0) {
								zpluginslist += "<tr><td style='text-align:right;vertical-align:top;padding:5px;font-weight:bold;' >Dependents:</td><td class='wtw-tablecolumnheading wtw-tdactiveoptional'>";
								for (var j=0;j<zresponse[i].websrequired.length;j++) {
									if (zresponse[i].websrequired[j] != null) {
										var zrequiredtext = 'Required';
										if (zresponse[i].websrequired[j].optional == '1') {
											zrequiredtext = 'Optional';
										}
										zpluginslist += "<div><div class='wtw-pluginreqopt'>" + zrequiredtext + "</div><div style='width:150px;display:inline-block;min-height:12px;'>3D " + zresponse[i].websrequired[j].webtype + "</div><a href='/admin.php?" + zresponse[i].websrequired[j].webtype.toLowerCase() + "id=" + zresponse[i].websrequired[j].webid + "'>" + zresponse[i].websrequired[j].webname + "</a><div class='wtw-clear'></div></div>";
									}
								}
								zpluginslist += "</td>&nbsp;<td></td>";
							}
						}
					}
				}
			}
			zpluginslist += "</table>";
		}
		dGet('wtw_pluginslist').innerHTML = zpluginslist;
		WTW.hide('wtw_loadingplugins');
		WTW.show('wtw_pluginslist');
		WTW.show('wtw_allplugins');
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminplugins.js-openAllPluginsComplete=' + ex.message);
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
		WTW.postAsyncJSON('/core/handlers/pluginloader.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.activatePluginComplete();
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminplugins.js-activatePlugin=' + ex.message);
	}
}

WTWJS.prototype.activatePluginComplete = function() {
	/* activate 3D Plugin completed, reload page with 3D Plugin active or inactive */
	try {
		window.location.href='/admin.php?showupdates=2&communityid=' + communityid + '&buildingid=' + buildingid + '&thingid=' + thingid;
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminplugins.js-activatePluginComplete=' + ex.message);
	}
}

WTWJS.prototype.updatePlugin = async function(zpluginname, zversion, zupdatedate, zupdateurl, zshow) {
	try {
		if (dGet('updateplugin' + zpluginname) != null) {
			dGet('updateplugin' + zpluginname).innerHTML = 'Updating';
		}
		var zrequest = {
			'pluginname': zpluginname,
			'version': zversion,
			'updateurl': zupdateurl,
			'function':'getupdate'
		};
		WTW.postAsyncJSON('/core/handlers/pluginloader.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.updatePluginComplete(zpluginname, zversion, zupdatedate, zupdateurl, zresponse.success, zshow);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminplugins.js-updatePlugin=' + ex.message);
	}
}

WTWJS.prototype.updatePluginComplete = function(zpluginname, zversion, zupdatedate, zupdateurl, zsuccess, zshow) {
	try {
		window.location.href = '/admin.php?showupdates=' + zshow + '&communityid=' + communityid + '&buildingid=' + buildingid + '&thingid=' + thingid;
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminplugins.js-updatePluginComplete=' + ex.message);
	}
}

WTWJS.prototype.updateWalkTheWeb = async function(zpluginname, zversion, zupdatedate, zupdateurl) {
	try {
		var zupdatesloading = "<div class='wtw-dashboardboxleft'>";
		zupdatesloading += "<div class='wtw-dashboardboxtitle'>WalkTheWeb is up to date!</div><div class='wtw-dashboardbox'><b>Your Version:</b><hr />";
		zupdatesloading += "<div id='wtw_loadingupdating' class='wtw-loadingnotice'>Updating...</div>";
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
		WTW.postAsyncJSON('/core/handlers/pluginloader.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.updateWalkTheWebComplete(zpluginname, zversion, zupdatedate, zupdateurl, zresponse.success);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminplugins.js-updateWalkTheWeb=' + ex.message);
	}
}

WTWJS.prototype.updateWalkTheWebComplete = function(zpluginname, zversion, zupdatedate, zupdateurl, zsuccess) {
	try {
		var zupdatelist = "<div class='wtw-dashboardboxleft'>";
		if (zsuccess == '1' || zsuccess == true) {
			window.location.href = '/admin.php?showupdates=1';
		} else {
			zupdatelist += "<div class='wtw-dashboardboxtitle'>WalkTheWeb could not Update!</div><div class='wtw-dashboardbox'>Use the following steps:<hr />";
			zupdatelist += "1. Download the file.<br />";
			zupdatelist += "2. Unzip the files.<br />";
			if (zpluginname.toLowerCase() == 'walktheweb') {
				zupdatelist += "3. Copy the files into the <b>Root</b> of your site for WalkTheWeb Core Updates.<br />";
			} else {
				zupdatelist += "3. Copy the files into the <b>Content/Plugins</b> folder of your site.<br />";
			}
			zupdatelist += "4. Overwrite the existing files.<br />";
			zupdatelist += "<div class='wtw-greenmenubutton' onclick=\"window.location.href='" + zupdateurl + "';\">Download and Update Manually</div>";
			zupdatelist += "</div></div>";
			dGet('wtw_updatelist').innerHTML = zupdatelist;
		}
		WTW.show('wtw_updatelist');
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminplugins.js-updateWalkTheWebComplete=' + ex.message);
	}
}

WTWJS.prototype.enablePluginsRequired = function(zchecked) {
	/* enable plugins required switch */
	try {
		if (zchecked == '1') {
			dGet('wtw_enablepluginsrequiredtext').innerHTML = 'Specific 3D Plugins are Required';
			dGet('wtw_enablepluginsrequiredtext').className = 'wtw-enablelabel';
			WTW.show('wtw_pluginsrequiredlist');
		} else {
			dGet('wtw_enablepluginsrequiredtext').innerHTML = 'No specific 3D Plugins are Required';
			dGet('wtw_enablepluginsrequiredtext').className = 'wtw-disabledlabel';
			WTW.hide('wtw_pluginsrequiredlist');
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminplugins.js-enablePluginsRequired=' + ex.message);
	} 
}

WTWJS.prototype.savePluginsRequired = function() {
	/* save plugins required */
	try {
		dGet('wtw_pluginsrequirederror').innerHTML = '';
		var zcheckboxes = document.getElementsByClassName('wtw-pluginsrequired');
		for (var i=0;i<zcheckboxes.length;i++) {
			if (zcheckboxes[i] != null) {
				var zrequired = '0';
				var zoptional = '0';
				var zwebtype = '';
				var zpluginname = zcheckboxes[i].id.replace('wtw_pluginrequired-','').replace('wtw_pluginoptional','');
				if (zcheckboxes[i].checked) {
					zrequired = '1';
				}
				if (dGet(zcheckboxes[i].id.replace('wtw_pluginrequired-','wtw_pluginoptional-')).checked) {
					zoptional = '1';
				}
				if (communityid != '') {
					zwebtype = 'community';
				}
				if (buildingid != '') {
					zwebtype = 'building';
				}
				if (thingid != '') {
					zwebtype = 'thing';
				}
				if (avatarid != '') {
					zwebtype = 'avatar';
				}
				var zrequest = {
					'webid': communityid + buildingid + thingid + avatarid,
					'webtype': zwebtype,
					'pluginname': zpluginname,
					'required': zrequired,
					'optional': zoptional,
					'function':'savepluginsrequired'
				};
				WTW.postAsyncJSON('/core/handlers/pluginloader.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						if (zresponse.serror != '') {
							dGet('wtw_pluginsrequirederror').innerHTML = zresponse.serror;
							dGet('wtw_pluginsrequirederror').style.color = 'red';
						} else {
							dGet('wtw_pluginsrequirederror').innerHTML = 'Plugins Required are Saved';
							dGet('wtw_pluginsrequirederror').style.color = 'green';
						}
						window.setTimeout(function() {
							dGet('wtw_pluginsrequirederror').innerHTML = '';
						},5000);
					}
				);
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminplugins.js-savePluginsRequired=' + ex.message);
	} 
}



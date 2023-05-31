/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
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
			case 'error':
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>" + WTW.__('Error') + "</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + WTW.__(zsetcategory) + "</div>";
				WTW.show('wtw_showfilepage');
				WTW.show('wtw_errorpage');
				WTW.show('wtw_showerror');
				break;
			case 'dashboard':
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>" + WTW.__('WalkTheWeb Dashboard') + "</div>";
				WTW.show('wtw_dashboardpage');
				WTW.openDashboardForm();
				break;
			case 'feedback':
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>" + WTW.__('Feedback') + "</div>";
				WTW.show('wtw_showfilepage');
				WTW.show('wtw_feedbackpage');
				WTW.checkForFeedback('Open Feedback');
				break;
			case 'errorlog':
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>" + WTW.__('Error Log') + "</div>";
				WTW.show('wtw_showfilepage');
				WTW.show('wtw_errorlogpage');
				WTW.openErrorLog();
				break;
			case 'medialibrary':
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>" + WTW.__('Media Library') + "</div>";
				WTW.show('wtw_selectimagepage');
				dGet('wtw_fullpageform').style.width = (WTW.sizeX - 5 - Number(dGet('wtw_adminmenubutton').style.left.replace('px',''))).toString() + 'px';
				dGet('wtw_selectimagepage').style.height = (WTW.sizeY - 100) + 'px';
				dGet('wtw_selectimageformscroll').style.height = (WTW.sizeY - 170) + 'px';
				WTW.selectFileForm();
				WTW.pluginsOpenFullPageFormMediaLibrary(zpageid, zsetcategory, zitem, zitemname, zitemnamepath, zpreviewname);
				break;
			case 'mediapage':
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>" + WTW.__('Media Library') + "</div>";
				WTW.show('wtw_showfilepage');
				WTW.openMediaPageForm(zitem);
				break;
			case 'users':
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>" + WTW.__('Users') + "</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + WTW.__(zsetcategory) + "</div>";
				WTW.show('wtw_showfilepage');
				switch (zsetcategory) {
					case 'User Roles':
						WTW.openAllRoles();
						break;
					default: /* All Users */
						WTW.openAllUsers(zsetcategory);
						break;
				}
				break;
			case 'plugins':
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>" + WTW.__('3D Plugins') + "</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + WTW.__(zsetcategory) + "</div>";
				WTW.show('wtw_showfilepage');
				WTW.checkForUpdates('2', zsetcategory);
				break;
			case 'settings':
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>" + WTW.__('Settings') + "</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + WTW.__(zsetcategory) + "</div>";
				WTW.show('wtw_showfilepage');
				switch (zsetcategory) {
					case 'Server Settings':
						WTW.openServerSettings();
						break;
					case 'Email Server':
						WTW.openEmailServerSettings();
						break;
					case 'Web Domains':
						WTW.openWebDomainsSettings();
						/* cancel add or edit if it is open */
						WTW.saveDomainForm(-1);
						break;
					case 'Web Aliases':
						WTW.openWebAliasSettings();
						break;
					case 'API Keys Access':
						WTW.openAPIKeys();
						break;
				}
				break;
			case 'fullpage':
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>" + WTW.__(zsetcategory) + "</div>";
				WTW.show('wtw_settingspage');
				WTW.show('wtw_fullpageplugins');
				WTW.show(zitem);
				switch (zsetcategory) {
					case 'Optional Upgrades':
						WTW.openOptionalUpgrades();
						break;
					case 'Invoices':
						WTW.openInvoices('admin');
						break;
					case 'My Invoices':
						WTW.openInvoices('my');
						break;
				}
				break;
			default:
				if (WTW.pluginsOpenFullPageForm(zpageid, zsetcategory, zitem, zitemname, zitemnamepath, zpreviewname) == false) {
					/* return false means the zpageid is not found in the plugins */
					WTW.hide('wtw_fullpageform');
				}
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-openFullPageForm=' + ex.message);
	}
}

WTWJS.prototype.closeFullPageForm = function() {
	/* closes full page form */
	try {
		WTW.hide('wtw_fullpageform');
		WTW.resetUploadButton();
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-closeFullPageForm=' + ex.message);
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-hideFullPages=' + ex.message);
	}
}


/* WalkTheWeb Feedback and Issues */

/* check for feedback */
WTWJS.prototype.checkForFeedback = async function(zfilter) {
	/* check for feedback call */
	try {
		if (zfilter == undefined) {
			zfilter = 'Open Feedback';
		}
		WTW.show('wtw_loadingfeedback');
		WTW.hide('wtw_feedbacklist');
		dGet('wtw_feedbacklist').innerHTML = '';

		var zrequest = {
			'filter':zfilter,
			'function':'getfeedback'
		};
		/* get feedback data */
		WTW.postAsyncJSON('/core/handlers/tools.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				WTW.checkForFeedbackComplete(zresponse, zfilter);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-checkForFeedback=' + ex.message);
	}
}

WTWJS.prototype.checkForFeedbackComplete = function(zresponse, zfilter) {
	/* show list of feedback */
	try {
		var znewfeedback = 0;
		var zfeedbacklist = "<div class='wtw-dashboardbox'>";
		if (dGet('wtw_feedbacklisttitle') != null) {
			dGet('wtw_feedbacklisttitle').innerHTML = zfilter;
		}
		if (zresponse != null) {
			if (zresponse.length > 0) {
				zfeedbacklist += "<table class='wtw-table'>";
				for (var i=0;i < zresponse.length;i++) {
					if (zresponse[i] != null) {
						var zstatus = 'New';
						var zstatuscolor = 'green';
						var zarchivetext = 'Close';
						var zviewed = false;
						var zarchived = false;
						var zfeedbackdate = new Date(zresponse[i].feedbackdate);
						var zdatestring = (zfeedbackdate.getMonth()+1) + '/' + zfeedbackdate.getDate() + '/' + zfeedbackdate.getFullYear();
						if (zresponse[i].viewdate != null) {
							zviewed = true;
							zstatuscolor = '';
						}
						if (zresponse[i].archivedate != null) {
							zarchived = true;
							zstatuscolor = 'black';
						}
						if (zarchived) {
							zstatus = 'Closed';
							zarchivetext = 'Reopen';
						} else if (zviewed) {
							zstatus = 'Open';
						} else {
							znewfeedback += 1;
						}
						
						zfeedbacklist += "<tr id='wtw_feedback-header-" + zresponse[i].feedbackid + "' onclick=\"WTW.toggleFeedback('" + zresponse[i].feedbackid + "');\" class='wtw-versionheader" + zstatuscolor + "'>";
						zfeedbacklist += "<td class='wtw-tablecolumns' style='white-space:normal;'>" + zdatestring + "</td>";
						zfeedbacklist += "<td class='wtw-tablecolumns' style='white-space:normal;'><b>" + zresponse[i].subject + "</b></td>";
						zfeedbacklist += "<td class='wtw-tablecolumns' style='white-space:normal;'>" + zresponse[i].feedbacktype + ": " + zresponse[i].category + "</td>";
						zfeedbacklist += "<td id='wtw_feedback-status-" + zresponse[i].feedbackid + "' class='wtw-tablecolumns' style='text-align:right;'>" + zstatus + "</td>";
						zfeedbacklist += "</tr>";
						zfeedbacklist += "<tr id='wtw_feedback-" + zresponse[i].feedbackid + "' style='display:none;visibility:hidden;'>";
						if (zresponse[i].snapshoturl != '') {
							zfeedbacklist += "<td class='wtw-tablecolumns'><img src='" + zresponse[i].snapshoturl + "' style='width:120px;height:auto;float:left;margin:8px 18px 8px 0px;cursor:pointer;' onclick=\"WTW.openIFrame('/core/pages/imageviewer.php?imageurl=" + zresponse[i].snapshoturl + "', .8, .8, 'WalkTheWeb Feedback Image');\" /></td>";
						} else {
							zfeedbacklist += "<td class='wtw-tablecolumns'>&nbsp;</td>";
						}
						zfeedbacklist += "<td class='wtw-tablecolumns' style='white-space:normal;'>" + zresponse[i].feedbacktype + "<br />" + zresponse[i].category + "</td>";
						zfeedbacklist += "<td class='wtw-tablecolumns' style='white-space:normal;'>" + WTW.encode(zresponse[i].message) + "</td>";
						zfeedbacklist += "<td class='wtw-tablecolumns' style='white-space:nowrap;'><a href='" + zresponse[i].url + "'>Open 3D Scene</a> ";
						zfeedbacklist += "<div id='wtw_feedback-archive-" + zresponse[i].feedbackid + "' class='wtw-archivebutton' onclick=\"WTW.archiveFeedback('" + zresponse[i].feedbackid + "');\">" + zarchivetext + "</div>";
						zfeedbacklist += "</td>";
						zfeedbacklist += "</tr>";
					}
				}
				zfeedbacklist += "</table></div>";
			}
		}
		if (zfeedbacklist == "<div class='wtw-dashboardbox'>") {
			zfeedbacklist += "No Feedback has been submitted at this time.";
		}
		zfeedbacklist += "</div>";
		if (dGet('wtw_feedbacklist') != null) {
			dGet('wtw_feedbacklist').innerHTML = zfeedbacklist;
		}
		WTW.hide('wtw_loadingfeedback');
		WTW.show('wtw_feedbacklist');
		
		if (dGet('wtw_adminmenufeedbackbadge') != null) {
			dGet('wtw_adminmenufeedbackbadge').innerHTML = znewfeedback;
		}
		WTW.updateBadges();
		
		if (dGet('wtw_feedbackpagescroll') != null) {
			dGet('wtw_selectimagepage').style.height = (WTW.sizeY - 100) + 'px';
			dGet('wtw_feedbackpagescroll').style.height = (WTW.sizeY - 170) + 'px';
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-checkForFeedbackComplete=' + ex.message);
	}
}

WTWJS.prototype.toggleFeedback = async function(zfeedbackid) {
	/* toggle Feedback block and set as read */
	try {
		if (dGet('wtw_feedback-' + zfeedbackid) != null) {
			if (dGet('wtw_feedback-' + zfeedbackid).style.display == 'none') {
				dGet('wtw_feedback-' + zfeedbackid).style.display = 'table-row';
				dGet('wtw_feedback-' + zfeedbackid).style.visibility = 'visible';
				if (dGet('wtw_feedback-status-' + zfeedbackid).innerHTML == 'New') {
					var zrequest = {
						'feedbackid':zfeedbackid,
						'status':'Open',
						'function':'updatefeedbackstatus'
					};
					WTW.postAsyncJSON('/core/handlers/tools.php', zrequest, 
						function(zresponse) {
							zresponse = JSON.parse(zresponse);
							/* note zresponse.serror would contain any errors */
							/* update badges */
							if (dGet('wtw_adminmenufeedbackbadge').innerHTML != '') {
								if (WTW.isNumeric(dGet('wtw_adminmenufeedbackbadge').innerHTML)) {
									if (Number(dGet('wtw_adminmenufeedbackbadge').innerHTML) > 0) {
										dGet('wtw_adminmenufeedbackbadge').innerHTML = (Number(dGet('wtw_adminmenufeedbackbadge').innerHTML) - 1);
									}
								}
							}
							WTW.updateBadges();
						}
					);
					dGet('wtw_feedback-status-' + zfeedbackid).innerHTML = 'Open';
					dGet('wtw_feedback-header-' + zfeedbackid).className = 'wtw-versionheader';
				}
			} else {
				WTW.hide('wtw_feedback-' + zfeedbackid);
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-toggleFeedback=' + ex.message);
	}
}

WTWJS.prototype.archiveFeedback = async function(zfeedbackid) {
	/* toggle Feedback archive */
	try {
		if (dGet('wtw_feedback-archive-' + zfeedbackid) != null) {
			var zstatus = 'Close';
			if (dGet('wtw_feedback-archive-' + zfeedbackid).innerHTML == 'Close') {
				dGet('wtw_feedback-status-' + zfeedbackid).innerHTML = 'Closed';
				dGet('wtw_feedback-archive-' + zfeedbackid).innerHTML = 'Reopen';
				dGet('wtw_feedback-header-' + zfeedbackid).className = 'wtw-versionheaderblack';
			} else {
				zstatus = 'Reopen';
				dGet('wtw_feedback-status-' + zfeedbackid).innerHTML = 'Open';
				dGet('wtw_feedback-archive-' + zfeedbackid).innerHTML = 'Close';
				dGet('wtw_feedback-header-' + zfeedbackid).className = 'wtw-versionheader';
			}
			var zrequest = {
				'feedbackid':zfeedbackid,
				'status':zstatus,
				'function':'updatefeedbackstatus'
			};
			WTW.postAsyncJSON('/core/handlers/tools.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note zresponse.serror would contain any errors */
				}
			);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-archiveFeedback=' + ex.message);
	}
}

/* Error Log */
WTWJS.prototype.openErrorLog = async function(zfilter) {
	/* retrieve Error Log data */
	try {
		if (zfilter == undefined) {
			zfilter = 'All Errors';
		}
		if (WTW.isUserInRole('admin')) {
			WTW.show('wtw_errorlogdelete');
		} else {
			WTW.hide('wtw_errorlogdelete');
		}
		dGet('wtw_errorlogactive').className = 'wtw-bluebutton';
		dGet('wtw_errorlogrecent').className = 'wtw-bluebutton';
		dGet('wtw_errorlogall').className = 'wtw-bluebutton';
		switch (zfilter) {
			case 'Active Errors':
				dGet('wtw_errorlogactive').className = 'wtw-bluebuttonselected';
				break;
			case 'Most Recent Errors':
				dGet('wtw_errorlogrecent').className = 'wtw-bluebuttonselected';
				break;
			default: /* All Errors */
				dGet('wtw_errorlogall').className = 'wtw-bluebuttonselected';
				break;
		}
		WTW.show('wtw_loadingerrorlog');
		WTW.hide('wtw_errorloglist');
		dGet('wtw_errorloglist').innerHTML = '';

		var zrequest = {
			'filter':zfilter,
			'function':'geterrorlog'
		};
		/* get error log */
		WTW.postAsyncJSON('/core/handlers/tools.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				WTW.openErrorLogComplete(zresponse, zfilter);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-openErrorLog=' + ex.message);
	}
}

WTWJS.prototype.openErrorLogComplete = function(zresponse, zfilter) {
	/* show list of feedback */
	try {
		var zerrorloglist = "<div class='wtw-dashboardbox'>";
		if (dGet('wtw_errorloglisttitle') != null) {
			dGet('wtw_errorloglisttitle').innerHTML = zfilter;
		}
		if (zresponse != null) {
			zerrorloglist += "<table class='wtw-table'>";
			if (zresponse.length > 0) {
				for (var i=0;i < zresponse.length;i++) {
					if (zresponse[i] != null) {
						var zstatuscolor = 'green';
						var zarchivetext = 'Archive';
						var zreadonlytext = 'Active';
						var zarchived = false;
						var zlogdate = new Date(zresponse[i].logdate);
						var zdatestring = (zlogdate.getMonth()+1) + '/' + zlogdate.getDate() + '/' + zlogdate.getFullYear();
						if (zresponse[i].archivedate != null) {
							zarchived = true;
							zstatuscolor = 'black';
							zarchivetext = 'Restore';
							zreadonlytext = 'Archived';
						}
						
						zerrorloglist += "<tr id='wtw_errorlog-header-" + zresponse[i].errorid + "' class='wtw-versionheader" + zstatuscolor + "'>";
						zerrorloglist += "<td class='wtw-tablecolumns' style='white-space:normal;'>" + zdatestring + "</td>";
						zerrorloglist += "<td class='wtw-tablecolumns wtw-linkwrap' style='max-width:80%;word-break:break-all;'>" + WTW.encode(zresponse[i].message) + "</td>";
						if (WTW.isUserInRole('Admin')) {
							zerrorloglist += "<td class='wtw-tablecolumns' style='white-space:normal;text-align:right;'><div id='wtw_errorlog-archive-" + zresponse[i].errorid + "' class='wtw-archivebutton' onclick=\"WTW.archiveErrorLog('" + zresponse[i].errorid + "');\">" + zarchivetext + "</div></td>";
						} else {
							zerrorloglist += "<td class='wtw-tablecolumns' style='white-space:normal;text-align:right;'><div id='wtw_errorlog-archive-" + zresponse[i].errorid + "' class='wtw-archivebutton'>" + zreadonlytext + "</div></td>";
						}
						zerrorloglist += "</tr>";
					}
				}
			} else {
				zerrorloglist += "<tr><td class='wtw-tablecolumns' style='white-space:normal;font-size:1.4em;'>No Errors Found</td></tr>";
			}
			zerrorloglist += "</table>";
		}
		zerrorloglist += "</div>";
		dGet('wtw_errorloglist').innerHTML = zerrorloglist;
		WTW.hide('wtw_loadingerrorlog');
		WTW.show('wtw_errorloglist');
		dGet('wtw_selectimagepage').style.height = (WTW.sizeY - 100) + 'px';
		dGet('wtw_errorlogpagescroll').style.height = (WTW.sizeY - 170) + 'px';
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-openErrorLogComplete=' + ex.message);
	}
}

WTWJS.prototype.archiveErrorLog = async function(zerrorid) {
	/* update the error log archive status */
	try {
		if (dGet('wtw_errorlog-archive-' + zerrorid) != null) {
			var zstatus = 'Archive';
			if (dGet('wtw_errorlog-archive-' + zerrorid).innerHTML == 'Archive') {
				dGet('wtw_errorlog-archive-' + zerrorid).innerHTML = 'Restore';
				dGet('wtw_errorlog-header-' + zerrorid).className = 'wtw-versionheaderblack';
			} else {
				zstatus = 'Restore';
				dGet('wtw_errorlog-archive-' + zerrorid).innerHTML = 'Archive';
				dGet('wtw_errorlog-header-' + zerrorid).className = 'wtw-versionheadergreen';
			}
			var zrequest = {
				'errorid':zerrorid,
				'status':zstatus,
				'function':'updateerrorlogstatus'
			};
			WTW.postAsyncJSON('/core/handlers/tools.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note zresponse.serror would contain any errors */
				}
			);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-archiveErrorLog=' + ex.message);
	}
}


WTWJS.prototype.deleteArchivedErrorLog = async function() {
	/* delete the archived error log records */
	try {
		var zrequest = {
			'function':'deletearchivederrorlog'
		};
		WTW.postAsyncJSON('/core/handlers/tools.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note zresponse.serror would contain any errors */
				WTW.openErrorLog();
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-deleteArchivedErrorLog=' + ex.message);
	}
}


/* dashboard and WalkTheWeb & 3D Plugin updates forms */

WTWJS.prototype.openDashboardForm = async function(zshow) {
	/* load dashboard form */
	try {
		if (zshow == undefined) {
			zshow = true;
		}
		if (zshow) {
			WTW.hide('wtw_dashboard');
			WTW.show('wtw_loadingdashboard');
			WTW.hide('wtw_videolinks');
			WTW.hide('wtw_wtwactivity');
			WTW.hide('wtw_downloadqueue');
			WTW.hide('wtw_serverstats');
		}
		dGet('wtw_serverstatslist').innerHTML = '';
		dGet('wtw_wtwactivitylist').innerHTML = '';
		WTW.getAsyncJSON('/connect/dashboard.php', 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					var zserverstatslist = '';
					zserverstatslist += "<div style='width:98%;margin:5px;'>";
					zserverstatslist += "<div class='wtw-dashboardlabel'>&nbsp;</div>";
					if (WTW.isUserInRole('admin')) {
						zserverstatslist += "<div class='wtw-dashboardvaluefloat' style='min-width:90px;'><b><u>Serverwide</u></b></div>";
					} else {
						zserverstatslist += "<div class='wtw-dashboardvaluefloat' style='min-width:90px;'><b><u>Folder Size</u></b></div>";
					}
					zserverstatslist += "<div class='wtw-dashboardvaluefloat' style='min-width:60px;'><b><u>My Account</u></b></div>";
					zserverstatslist += "</div>";
					zserverstatslist += "<div class='wtw-clear'></div>";
					for (var i = 0; i < zresponse.length; i++) {
						if (zresponse[i] != null) {
							var zmycount = zresponse[i].mycount;
							var zscount = zresponse[i].scount;
							var zfoldersize = zresponse[i].foldersize;
							if (zresponse[i].item == 'Total Folder Size') {
								zscount = WTW.formatNumber(Math.round(Number(zscount)/1000000),0);
								zserverstatslist += "<hr /><div style='width:98%;margin:5px;'>";
								zserverstatslist += "<div class='wtw-dashboardlabel'><b>" + zresponse[i].item + "</b></div>";
								zserverstatslist += "<div class='wtw-dashboardvaluefloat' style='min-width:100px;'>" + zscount + " MB</div>";
								zserverstatslist += "</div>";
								zserverstatslist += "<div class='wtw-clear'></div>";
							} else if (WTW.isUserInRole('admin')) {
								if (WTW.isNumeric(zresponse[i].mycount)) {
									zmycount = WTW.formatNumber(Number(zresponse[i].mycount),0);
								}
								if (WTW.isNumeric(zresponse[i].scount)) {
									zscount = WTW.formatNumber(Number(zresponse[i].scount),0);
								}
								zserverstatslist += "<div style='width:98%;margin:5px;'>";
								zserverstatslist += "<div class='wtw-dashboardlabel'><b>" + zresponse[i].item + "</b></div>";
								zserverstatslist += "<div class='wtw-dashboardvaluefloat' style='min-width:90px;'>" + zscount + "</div>";
								zserverstatslist += "<div class='wtw-dashboardvaluefloat' style='min-width:60px;'>" + zmycount + "</div>";
								zserverstatslist += "</div>";
								zserverstatslist += "<div class='wtw-clear'></div>";
							} else {
								zfoldersize = WTW.formatNumber(Math.round(Number(zfoldersize)/1000000),0);
								if (WTW.isNumeric(zresponse[i].mycount)) {
									zmycount = WTW.formatNumber(Number(zresponse[i].mycount),0);
								}
								if (WTW.isNumeric(zresponse[i].scount)) {
									zscount = WTW.formatNumber(Number(zresponse[i].scount),0);
								}
								zserverstatslist += "<div style='width:98%;margin:5px;'>";
								zserverstatslist += "<div class='wtw-dashboardlabel'><b>" + zresponse[i].item + "</b></div>";
								zserverstatslist += "<div class='wtw-dashboardvaluefloat' style='min-width:90px;'>" + zfoldersize + " MB</div>";
								zserverstatslist += "<div class='wtw-dashboardvaluefloat' style='min-width:60px;'>" + zmycount + "</div>";
								zserverstatslist += "</div>";
								zserverstatslist += "<div class='wtw-clear'></div>";
							}
							if (i == 0) {
								if (zresponse[i].downloads != undefined) {
									if (zresponse[i].downloads.length > 0) {
										/* if there is a downloads array, allow parsing by plugins */
										WTW.pluginsOpenDashboardFormDownloads(zresponse[i].downloads, zshow);
									}
								}
							}
						}
					}
					if (zshow) {
						dGet('wtw_serverstatslist').innerHTML = zserverstatslist;
					}
					WTW.show('wtw_serverstats');
				}
				if (zshow) {
					window.setTimeout(function() {
						WTW.hide('wtw_loadingdashboard');
						WTW.show('wtw_dashboard');
					},500);
				}
			}
		);
		WTW.pluginsOpenDashboardForm(zshow);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-openDashboardForm=' + ex.message);
	}
}

		
/* media library forms */

/* media library - main media page form */
WTWJS.prototype.openMediaPageForm = async function(zuploadid) {
	try {
		var zcategory = WTW.getDDLValue('wtw_fileselectcategory');
		WTW.hide('wtw_mediapage');
		WTW.show('wtw_loadingmediapage');
		dGet('wtw_uploadfilename').innerHTML = '';
		dGet('wtw_uploadfiletype').innerHTML = '';
		dGet('wtw_uploadupdatedate').innerHTML = '';
		dGet('wtw_mediathumbnailsize').innerHTML = '';
		dGet('wtw_mediathumbnaildimensions').innerHTML = '';
		dGet('wtw_mediathumbnailpath').innerHTML = '';
		dGet('wtw_mediathumbnail').src = '';
		dGet('wtw_mediawebsizesize').innerHTML = '';
		dGet('wtw_mediawebsizedimensions').innerHTML = '';
		dGet('wtw_mediawebsizepath').innerHTML = '';
		dGet('wtw_mediaoriginalsize').innerHTML = '';
		dGet('wtw_mediaoriginaldimensions').innerHTML = '';
		dGet('wtw_mediaoriginalpath').innerHTML = '';
		dGet('wtw_mediaoriginal').src = '';
		WTW.getAsyncJSON('/connect/uploadmedia.php?uploadid=' + zuploadid, 
			function(zresponse) {
				var zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					for (var i = 0; i < zresponse.length; i++) {
						if (zresponse[i] != null) {
							var zfiletitle = 'File Information';
							if (zresponse[i].uploadinfo != null) {
								if (zresponse[i].uploadinfo.title != undefined) {
									zfiletitle = zresponse[i].uploadinfo.title;
									dGet('wtw_uploadfiletitle').innerHTML = zresponse[i].uploadinfo.title;
								}
								if (zresponse[i].uploadinfo.name != undefined) {
									dGet('wtw_uploadfilename').innerHTML = zresponse[i].uploadinfo.name;
								}
								if (zresponse[i].uploadinfo.type != undefined) {
									dGet('wtw_uploadfiletype').innerHTML = zresponse[i].uploadinfo.type;
								}
								if (zresponse[i].uploadinfo.updatedate != undefined) {
									dGet('wtw_uploadupdatedate').innerHTML = WTW.formatDateLong(zresponse[i].uploadinfo.updatedate);
								}
								dGet('wtw_uploadfiledelete').onclick = function() {
									WTW.deleteUploadFiles(zuploadid);
								};
							}
							
							dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowlink' onclick=\"dGet('wtw_modelfilter').value='';dGet('wtw_tgroupuploadobjectid').value='';dGet('wtw_tgroupdiv').value='';WTW.openFullPageForm('medialibrary','" + zcategory + "','');WTW.setImageMenu(4);\">Media Library</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + zfiletitle + "</div>";

							if (dGet('wtw_uploadfiletype').innerHTML.indexOf('image') > -1 && zresponse[i].uploadinfo.extension != 'dds' && zresponse[i].uploadinfo.extension != 'hdr' && zresponse[i].uploadinfo.extension != 'exr') {
								if (zresponse[i].thumbnail != null) {
									if (zresponse[i].thumbnail.data != undefined) {
										dGet('wtw_mediathumbnail').src = zresponse[i].thumbnail.data;
									}
									if (zresponse[i].thumbnail.size != undefined) {
										dGet('wtw_mediathumbnailsize').innerHTML = WTW.formatDataSize(zresponse[i].thumbnail.size);
									}
									if (zresponse[i].thumbnail.width != undefined && zresponse[i].thumbnail.height != undefined) {
										dGet('wtw_mediathumbnaildimensions').innerHTML = WTW.formatNumber(zresponse[i].thumbnail.width,0) + ' x ' + WTW.formatNumber(zresponse[i].thumbnail.height,0);
									}
									if (zresponse[i].thumbnail.path != undefined) {
										dGet('wtw_mediathumbnail').src = zresponse[i].thumbnail.path;
										dGet('wtw_mediathumbnailpath').innerHTML = "<a href='" + zresponse[i].thumbnail.path + "' target='_blank'>" + zresponse[i].thumbnail.path + "</a>";
										dGet('wtw_mediathumbnaildownload').href = zresponse[i].thumbnail.path;
									}
								}
								if (zresponse[i].original != null) {
									if (zresponse[i].original.data != undefined) {
										dGet('wtw_mediaoriginal').src = zresponse[i].original.data;
									}
									if (zresponse[i].original.size != undefined) {
										dGet('wtw_mediaoriginalsize').innerHTML = WTW.formatDataSize(zresponse[i].original.size);
									}
									if (zresponse[i].original.width != undefined && zresponse[i].original.height != undefined) {
										dGet('wtw_mediaoriginaldimensions').innerHTML = WTW.formatNumber(zresponse[i].original.width,0) + ' x ' + WTW.formatNumber(zresponse[i].original.height,0);
									}
									if (zresponse[i].original.path != undefined) {
										dGet('wtw_mediaoriginal').src = zresponse[i].original.path;
										dGet('wtw_mediaoriginalpath').innerHTML = "<a href='" + zresponse[i].original.path + "' target='_blank'>" + zresponse[i].original.path + "</a>";
										dGet('wtw_mediaoriginaldownload').href = zresponse[i].original.path;
									}
								}
								if (zresponse[i].websize != null) {
									if (zresponse[i].websize.data != undefined) {
										dGet('wtw_mediawebsize').src = zresponse[i].websize.data;
									}
									if (zresponse[i].websize.size != undefined) {
										dGet('wtw_mediawebsizesize').innerHTML = WTW.formatDataSize(zresponse[i].websize.size);
									}
									if (zresponse[i].websize.width != undefined && zresponse[i].websize.height != undefined) {
										dGet('wtw_mediawebsizedimensions').innerHTML = WTW.formatNumber(zresponse[i].websize.width,0) + ' x ' + WTW.formatNumber(zresponse[i].websize.height,0);
									}
									if (zresponse[i].websize.path != undefined) {
										dGet('wtw_mediawebsize').src = zresponse[i].websize.path;
										dGet('wtw_mediawebsizepath').innerHTML = "<a href='" + zresponse[i].websize.path + "' target='_blank'>" + zresponse[i].websize.path + "</a>";
										dGet('wtw_mediawebsizedownload').href = zresponse[i].websize.path;
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-openMediaPageForm=' + ex.message);
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-setImageMenu=' + ex.message);
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
		dGet('wtw_bstartimageupload').innerHTML = 'Upload File(s)';
		dGet('wtw_showhiddenimagesdiv').innerHTML = 'Show Hidden Files';
		if (communityid != '') {
			dGet('wtw_menuimagecommunity').innerHTML = '3D Community Files';
		} else if (buildingid != '') {
			dGet('wtw_menuimagecommunity').innerHTML = '3D Building Files';
		} else if (thingid != '') {
			dGet('wtw_menuimagecommunity').innerHTML = '3D Thing Files';
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
				if (WTW.selectedMoldName.indexOf('-') > -1) {
					var zthingid = '';
					var zbuildingid = '';
					var zcommunityid = '';
					var znamepart = WTW.getMoldnameParts(selectedMoldName);
					var i = Number(znamepart.moldind);
					if (znamepart.webset == 'thingmolds') {
						zthingid = WTW.thingMolds[i].thinginfo.thingid;
					} else if (znamepart.webset == 'buildingmolds') {
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
				WTW.setDDLValue('wtw_tmoldsoundattenuation', 'linear');
				WTW.setSoundFields();
				break;
			case 'image':
				if (zitem != 'skybox') {
					WTW.setNewMold(1);
				}
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
				var zextragroundmaterial = new BABYLON.StandardMaterial('egmat', scene);
				zextragroundmaterial.diffuseTexture = new BABYLON.Texture(dGet(zitemnamepath).value, scene);
				//var zimageinfo = WTW.getUploadFileData(zuploadid);
				//zextragroundmaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.filedata, 'egmattexture', scene);
				zextragroundmaterial.diffuseTexture.uScale = zeguscale;
				zextragroundmaterial.diffuseTexture.vScale = zegvscale;
				zextragroundmaterial.specularColor = new BABYLON.Color3(.1, .1, .1);
				zextragroundmaterial.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
				WTW.extraGround.material = zextragroundmaterial;
				break;
			case "skybox":
				WTW.closeFullPageForm();
				WTW.setSkyBox();
				return true;
				break;
		}
		if (zitemname == 'wtw_taliassiteiconid') {
			WTW.openFullPageForm('settings','Web Aliases');
		} else if (zitemname != 'wtw_tobjectsoundid') {
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
				dGet('wtw_menuimagecommunity').innerHTML = '3D Community Files';
			} else if (buildingid != '') {
				dGet('wtw_menuimagecommunity').innerHTML = '3D Building Files';
			} else if (thingid != '') {
				dGet('wtw_menuimagecommunity').innerHTML = '3D Thing Files';
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
		dGet('wtw_myimagesdiv').innerHTML = '';
		var zrequest = {
			'category': zcategory,
			'hide': zhide,
			'function':'getmyimages'
		};
		WTW.postAsyncJSON('/core/handlers/uploads.php', zrequest, 
			function(zresponse) {
				var zmyimagesdiv = "<div class='wtw-roundedbox'><b>My Uploads and Images</b> can be used in any 3D Community Scene, 3D Building, and 3D Thing. Images are added as 3D Web Objects or Textures on 3D Building Blocks.<br /></div><div class='wtw-clear'></div>";
				zresponse = JSON.parse(zresponse);
				if (zresponse.length > 0) {
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							zicononclick = '';
							if (zitem != '') {
								zicononclick = "onclick=\"WTW.setSelectFileID(this,'" + zresponse[i].uploadid + "','" + zresponse[i].originalid + "','" + zresponse[i].websizeid + "','" + zresponse[i].fileextension + "'," + zresponse[i].filesize + ",'" + zresponse[i].filetitle + "','" + zresponse[i].filename + "','" + zresponse[i].originalpath + "');\"";
							} else {
								zicononclick = "onclick=\"WTW.openFullPageForm('mediapage','" + zcategory + "','" + zresponse[i].uploadid + "');\"";
							}
							zfilehint = zresponse[i].filetitle;
							if (zfilehint.length > 13) {
								zfilehint = zfilehint.substr(0, 10) + '...';
							}
							var zimageid = 'wtw_file' + zresponse[i].websizeid;
							var zimagesrc = '';
							var zthumbnailid = zresponse[i].thumbnailid;
							var zwebsizeid = zresponse[i].websizeid;
							var zisimage = false;
							if (zresponse[i].filetype.indexOf('image') > -1 && zresponse[i].fileextension != 'dds' && zresponse[i].fileextension != 'hdr' && zresponse[i].fileextension != 'exr') {
								zisimage = true;
							}
							if (zisimage && zresponse[i].filepath != '') {
								zimagesrc = zresponse[i].filepath;
							} else if (zisimage) {
								zimagesrc = 'data:' + zresponse[i].filetype + ';base64,' + atob(zresponse[i].filedata);
							} else if (zresponse[i].filetype.indexOf('audio') > -1) {
								zimageid = 'wtw_sound' + zresponse[i].uploadid;
								zimagesrc = '/content/system/images/iconaudio.png';
								zthumbnailid = zresponse[i].uploadid;
								zwebsizeid = zresponse[i].uploadid;
							} else if (zresponse[i].filetype.indexOf('video') > -1) {
								zimageid = 'wtw_video' + zresponse[i].uploadid;
								zimagesrc = '/content/system/images/iconvideo.png';
								zthumbnailid = zresponse[i].uploadid;
								zwebsizeid = zresponse[i].uploadid;
							} else if (zresponse[i].filetype.indexOf('doc') > -1 || zresponse[i].filetype.indexOf('text') > -1 || zresponse[i].filetype.indexOf('rtf') > -1 || zresponse[i].filetype.indexOf('pdf') > -1) {
								zimageid = 'wtw_doc' + zresponse[i].uploadid;
								zimagesrc = '/content/system/images/icondoc.png';
								zthumbnailid = zresponse[i].uploadid;
								zwebsizeid = zresponse[i].uploadid;
							} else {
								zimageid = 'wtw_file' + zresponse[i].uploadid;
								zimagesrc = '/content/system/images/iconfile.png';
								zthumbnailid = zresponse[i].uploadid;
								zwebsizeid = zresponse[i].uploadid;
							}
							zmyimagesdiv += "<div class='wtw-sampleheightmapdiv' onmouseover=\"dGet('wtw_div" + zresponse[i].uploadid + "').style.visibility='visible';\" onmouseout=\"dGet('wtw_div" + zresponse[i].uploadid + "').style.visibility='hidden';\"><img id='" + zimageid + "' class='wtw-sampleheightmap' " + zicononclick + " src=\"" + zimagesrc + "\" style=\"cursor:pointer;margin-left:5px;margin-right:5px;margin-top:5px;margin-bottom:0px;display:inline-block;\" title=\"" + zresponse[i].filetitle + "\" alt=\"" + zresponse[i].filetitle + "\" /><div class='wtw-smallfilename'>" + zfilehint + "</div><div id='wtw_div" + zresponse[i].uploadid + "' style='visibility:hidden;'><div style='text-align:center;font-size:.6em;padding:0px;margin-top:0px;margin-bottom:0px;cursor:pointer;display:inline-block;' onclick=\"this.innerHTML='Saving...';this.style.color='red';dGet('wtw_file" + zwebsizeid + "').style.borderColor='red';WTW.toggleHideMyImage('" + zresponse[i].uploadid + "','" + zitem + "','" + zcategory + "','" + zhide + "');\"><img src='/content/system/images/iconhide.png' alt='Hide' title='Hide' class='wtw-smallicon' style=\"cursor:pointer;\" /></div><img src='/content/system/images/iconinfo.png' alt='Information' title='Information' class='wtw-smallicon' onclick=\"WTW.openFullPageForm('mediapage','" + zcategory + "','" + zresponse[i].uploadid + "');\" style=\"cursor:pointer;\" /></div></div>";
						}
					}
				} else {
					var zerror = '';
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
						case 'file':
							zerror += "<h1 class='wtw-red'>No Uploaded Files of this type Found</h1>Use the <strong>Upload</strong> button on the top right to <strong>Add a File</strong>.";
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
				dGet('wtw_selectimagepage').style.height = (WTW.sizeY - 100) + 'px';
				dGet('wtw_myimagesdiv').style.height = (WTW.sizeY - 170) + 'px';
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
		WTW.postAsyncJSON('/core/handlers/uploads.php', zrequest, 
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

WTWJS.prototype.deleteUploadFiles = async function(zuploadid) {
	/* this pagge form shows stock images, sounds, and videos as necessary */
	try {
		var zrequest = {
			'uploadid': zuploadid,
			'function':'deleteuploadfiles'
		};
		WTW.postAsyncJSON('/core/handlers/uploads.php', zrequest, 
			function(zresponse) {
				WTW.openFullPageForm('medialibrary','','');WTW.setImageMenu(2);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-deleteUploadFiles=' + ex.message);
	}
}	

WTWJS.prototype.loadStockPage = async function(zitem) {
	/* this pagge form shows stock images, sounds, and videos as necessary */
	try {
		WTW.hide('wtw_stockimagesdiv');
		WTW.show('wtw_loadingselectimage');
		dGet('wtw_stockimagesdiv').innerHTML = '';
		var zrequest = {
			'item': zitem,
			'function':'getstockimages'
		};
		WTW.postAsyncJSON('/core/handlers/uploads.php', zrequest, 
			function(zresponse) {
				var zstockimagesdiv = "<div class='wtw-roundedbox'><b>Stock Images</b> can be used in any 3D Community Scene, 3D Building, and 3D Thing. Images are added as 3D Web Objects or Textures on 3D Building Blocks.<br /></div><div class='wtw-clear'></div>";
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				for (var i=0;i<zresponse.length;i++) {
					if (zresponse[i] != null) {
						zfilehint = zresponse[i].filetitle;
						if (zfilehint.length > 13) {
							zfilehint = zfilehint.substr(0, 10) + '...';
						}
						var zwebsizeid = zresponse[i].websizeid;
						if (zitem.indexOf('sound') > -1) {
							zwebsizeid = zresponse[i].uploadid;
							zimagesrc = '/content/system/images/3dsound.png';
						} else {
							var zimagesrc = '';
							if (zresponse[i].filepath != '') {
								zimagesrc = zresponse[i].filepath;
							} else {
								zimagesrc = 'data:' + zresponse[i].filetype + ';base64,' + atob(zresponse[i].filedata);
							}
						}
						zstockimagesdiv += "<div class='wtw-sampleheightmapdiv'><img id='wtw_stockimage" + zwebsizeid + "' class='wtw-sampleheightmap' onclick=\"WTW.setSelectFileID(this,'" + zresponse[i].uploadid + "','" + zresponse[i].originalid + "','" + zresponse[i].websizeid + "','" + zresponse[i].fileextension + "'," + zresponse[i].filesize + ",'" + zresponse[i].filetitle + "','" + zresponse[i].filename + "','" + zresponse[i].originalpath + "');\" src='" + zimagesrc + "' style=\"cursor:pointer;margin:5px;display:inline-block;\" title=\"" + zresponse[i].filetitle + "\" alt=\"" + zresponse[i].filetitle + "\" /><div class='wtw-smallfilename'>" + zfilehint + "</div></div>";
					}
				}
				dGet('wtw_stockimagesdiv').innerHTML = zstockimagesdiv;
				WTW.show('wtw_stockimagesdiv');
				dGet('wtw_selectimagepage').style.height = (WTW.sizeY - 100) + 'px';
				dGet('wtw_stockimagesdiv').style.height = (WTW.sizeY - 170) + 'px';
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
		dGet('wtw_communityimagesdiv').innerHTML = '';
		var zrequest = {
			'communityid': zcommunityid,
			'buildingid': zbuildingid,
			'thingid': zthingid,
			'function':'getcommunityimages'
		};
		WTW.postAsyncJSON('/core/handlers/uploads.php', zrequest, 
			function(zresponse) {
				var zcommunityimagesdiv = '';
				zresponse = JSON.parse(zresponse);
				for (var i=0;i<zresponse.length;i++) {
					if (zresponse[i] != null) {
						var zicononclick = "onclick=\"WTW.setSelectFileID(this,'" + zresponse[i].uploadid + "','" + zresponse[i].originalid + "','" + zresponse[i].websizeid + "','" + zresponse[i].fileextension + "'," + zresponse[i].filesize + ",'" + zresponse[i].filetitle + "','" + zresponse[i].filename + "','" + zresponse[i].originalpath + "');\"";
						var zfilehint = zresponse[i].filetitle;
						if (zfilehint.length > 13) {
							zfilehint = zfilehint.substr(0, 10) + '...';
						}
						var zcategory = 'images';
						var zimageid = 'wtw_file' + zresponse[i].websizeid;
						var zimagesrc = '';
						var zwebsizeid = zresponse[i].websizeid;
						var zthumbnailid = zresponse[i].thumbnailid;
						if (zresponse[i].filetype.indexOf('image') > -1 && zresponse[i].filepath != '') {
							zimagesrc = zresponse[i].filepath;
						} else if (zresponse[i].filetype.indexOf('image') > -1) {
							zimagesrc = 'data:' + zresponse[i].filetype + ';base64,' + atob(zresponse[i].filedata);
						} else if (zresponse[i].filetype.indexOf('audio') > -1) {
							zcategory = 'sounds';
							zimageid = 'wtw_sound' + zresponse[i].uploadid;
							zimagesrc = '/content/system/images/iconaudio.png';
							zthumbnailid = zresponse[i].uploadid;
							zwebsizeid = zresponse[i].uploadid;
						} else if (zresponse[i].filetype.indexOf('video') > -1) {
							zcategory = 'videos';
							zimageid = 'wtw_video' + zresponse[i].uploadid;
							zimagesrc = '/content/system/images/iconvideo.png';
							zthumbnailid = zresponse[i].uploadid;
							zwebsizeid = zresponse[i].uploadid;
						} else {
							zcategory = 'documents';
							zimageid = 'wtw_doc' + zresponse[i].uploadid;
							zimagesrc = '/content/system/images/icondoc.png';
							zthumbnailid = zresponse[i].uploadid;
							zwebsizeid = zresponse[i].uploadid;
						}
						zcommunityimagesdiv += "<div class='wtw-sampleheightmapdiv' onmouseover=\"dGet('wtw_webdiv" + zresponse[i].uploadid + "').style.visibility='visible';\" onmouseout=\"dGet('wtw_webdiv" + zresponse[i].uploadid + "').style.visibility='hidden';\"><img id='" + zimageid + "' class='wtw-sampleheightmap' " + zicononclick + " src='" + zimagesrc + "' style='cursor:pointer;margin-left:5px;margin-right:5px;margin-top:5px;margin-bottom:0px;display:inline-block;' title=\"" + zresponse[i].filetitle + "\" alt=\"" + zresponse[i].filetitle + "\" /><div class='wtw-smallfilename'>" + zfilehint + "</div><div id='wtw_webdiv" + zresponse[i].uploadid + "' style='visibility:hidden;'><div style='text-align:center;font-size:.6em;padding:0px;margin-top:0px;margin-bottom:0px;cursor:pointer;display:inline-block;' onclick=\"this.innerHTML='Saving...';this.style.color='red';dGet('wtw_file" + zwebsizeid + "').style.borderColor='red';dGet('wtw_hideimageid').value='" + zthumbnailid + "';dGet('wtw_submit').click();\"></div><img src='/content/system/images/iconinfo.png' alt='Information' title='Information' class='wtw-smallicon' onclick=\"WTW.openFullPageForm('mediapage','" + zcategory + "','" + zresponse[i].uploadid + "');\" style=\"cursor:pointer;\" /></div></div>";
					}
				}
				dGet('wtw_communityimagesdiv').innerHTML = zcommunityimagesdiv;
				WTW.show('wtw_communityimagesdiv');
				dGet('wtw_selectimagepage').style.height = (WTW.sizeY - 100) + 'px';
				dGet('wtw_communityimagesdiv').style.height = (WTW.sizeY - 170) + 'px';
				WTW.hide('wtw_loadingselectimage');
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-loadCommunityPage=' + ex.message);
	}
}	

WTWJS.prototype.startUploadImage = function(zbuttontext, zobjectfolder) {
	/* upload image process (upload process is based on which text is on the button) */
	/* some are single files and others are multi files select */
	try {
		if (zobjectfolder == undefined) {
			zobjectfolder = '';
		}
		switch (zbuttontext) {
			case 'Upload Primary 3D File':
				dGet('wtw_fileupload').click();
				break;
			case 'Upload or Replace File(s)':
				dGet('wtw_filesupload').onchange = function() {
					WTW.uploadObjectFiles('uploadobjectfiles', zobjectfolder);
				}
				dGet('wtw_filesupload').click();
				break;
			case 'Upload JavaScript File':
				dGet('wtw_filesupload').onchange = function() {
					WTW.uploadObjectFiles('uploadjavascriptfiles', zobjectfolder);
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-startUploadImage=' + ex.message);
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
				if (Httpreq.readyState == 4 && Httpreq.status == '200') {
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-uploadFile=' + ex.message);
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
					if (Httpreq.readyState == 4 && Httpreq.status == '200') {
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-uploadAsyncFile=' + ex.message);
	}
}

WTWJS.prototype.selectUploadFiles = function() {
	/* open file selection based on one or more files available to select */
	try {
		if (dGet('wtw_bstartimageupload').innerHTML == 'Upload of Replace File(s)') {
			WTW.uploadObjectFiles('uploadobjectfiles');
		} else {
			WTW.uploadFiles();
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-selectUploadFiles=' + ex.message);
	}
}

WTWJS.prototype.uploadFiles = function() {
	/* upload files using form post */
	try {
		if (dGet('wtw_filesupload').value != null) {
			var zobjectfilepart = dGet('wtw_tobjectfile').value;
			var zitem = dGet('wtw_tfileitem').value;
			zobjectfilepart = zobjectfilepart.replace('.babylon','').replace('.glb','').replace('.gltf','').replace('.obj','');
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
				if (Httpreq.readyState == 4 && Httpreq.status == '200') {
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-uploadFiles=' + ex.message);
	}
}

WTWJS.prototype.uploadAsyncFiles = function() {
	/* upload files using form post */
	try {
		if (dGet('wtw_filesupload').value != null) {
			return new Promise(function () {
				var zobjectfilepart = dGet('wtw_tobjectfile').value;
				var zitem = dGet('wtw_tfileitem').value;
				zobjectfilepart = zobjectfilepart.replace('.babylon','').replace('.glb','').replace('.gltf','').replace('.obj','');
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
					if (Httpreq.readyState == 4 && Httpreq.status == '200') {
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-uploadAsyncFiles=' + ex.message);
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
			dGet('wtw_bstartimageupload').innerHTML = 'Upload File(s)';
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-resetUploadButton=' + ex.message);
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-setSelectModel=' + ex.message);
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
				if (ztext == 'Name Filter') {
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
							if ((zuploadedobjects[i].id.indexOf(ztext) > -1 || ztext == '') && zuploadedobjects[i].id.indexOf('wtw_obj_') > -1) {
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-filterModels=' + ex.message);
	}
}

WTWJS.prototype.openObjectPageForm = function(zuploadobjectid, zfilename) {
	/* 3D Models page form */
	try {
		var zcategory = WTW.getDDLValue('wtw_fileselectcategory');
		dGet('wtw_tbackupfullpageformtitle').value = dGet('wtw_fullpageformtitle').innerHTML;
		dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowlink' onclick=\"dGet('wtw_modelfilter').value='';dGet('wtw_tgroupuploadobjectid').value='';dGet('wtw_tgroupdiv').value='';WTW.openFullPageForm('medialibrary','" + zcategory + "','');WTW.setImageMenu(4);\">Media Library</div><img id='wtw_arrowicon2' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + zfilename + "</div>";
		WTW.hide('wtw_uploadedmodelsdiv');
		WTW.hide('wtw_loadingselectimage');
		dGet('wtw_selectimagepage').style.height = (WTW.sizeY - 100) + 'px';
		dGet('wtw_uploadedmodeldetailsdiv').style.height = (WTW.sizeY - 170) + 'px';
		WTW.show('wtw_uploadedmodeldetailsdiv');
		WTW.loadObjectDetailsName(zuploadobjectid);
		WTW.loadObjectDetailsAnimations(zuploadobjectid);
		dGet('wtw_bstartimageupload').innerHTML = 'Upload or Replace File(s)';
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-openObjectPageForm=' + ex.message);
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
		WTW.postAsyncJSON('/core/handlers/uploadedfiles.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zitem = dGet('wtw_tfileitem').value;
				var zuploadedobjectsdiv = "<div class='wtw-roundedbox'><b>3D Models</b> can be downloaded off the Internet or created from scratch using software like <a href='https://www.blender.org/' target='_blank'>Blender.org</a>. <b>3D Models</b> can be added to any 3D Community Scene, 3D Building, or 3D Thing. Recommended formats are .blender, .obj, .glb, or .gltf.<br /></div><div class='wtw-clear'></div>";
				for (var i=0;i<zresponse.length;i++) {
					var zfilecount = 0;
					var zfoldersize = 0;
					var zanimationcount = 0;
					var zanimationdiv = '';
					zcreatedate = zresponse[i].createdate;
					if (zresponse[i].filecount != undefined) {
						zfilecount = zresponse[i].filecount;
					}
					if (zresponse[i].foldersize != undefined) {
						zfoldersize = zresponse[i].foldersize;
					}
					if (zresponse[i].animationcount != undefined) {
						zanimationcount = zresponse[i].animationcount;
						if (Number(zanimationcount) > 0) {
							zanimationdiv = "<div class='wtw-animated'>Animated</div>";
						}
					}
					zfoldersize = WTW.formatNumber(zfoldersize/1000000,3);
					//zcreatedate = date('m/d/Y', strtotime($zcreatedate));
					zlinktext = 'Edit';
					if (zresponse[i].stock == '1') {
						zlinktext = 'View';
					}
					var zwebcount = "<div class='wtw-webcount'><b>(" + zresponse[i].webcount + ")</b> 3D Webs are using this 3D Model</div><br /><br />";
					if (Number(zresponse[i].webcount) == 0) {
						zwebcount = "<div class='wtw-webcountzero'>No 3D Webs are using this 3D Model</div><br /><br />";
					} else if (Number(zresponse[i].webcount) == 1) {
						zwebcount = "<div class='wtw-webcount'><b>(" + zresponse[i].webcount + ")</b> 3D Web is using this 3D Model</div><br /><br />";
					}
					if (zitem == '3dobject') {
						zlinktext = 'Select';
						zuploadedobjectsdiv += "<div id='wtw_obj_" + i + "_" + zresponse[i].objectfile.toLowerCase() + "' class='wtw-objectcontainer'><div class='wtw-objectfile' onclick=\"WTW.setSelectModel('" + zresponse[i].uploadobjectid + "','" + zresponse[i].objectfolder + "','" + zresponse[i].objectfile + "');\">" + zresponse[i].objectfile + "</div><div class='wtw-objectfolder'><canvas id='wtw_modelCanvas" + i + "' style='border:1px solid black;display:none;visibility:hidden;'></canvas>" + zresponse[i].objectfolder.replace("/objects/","/objects<br />/") + "<br /><br />" + zanimationdiv + "<b>(" + zfilecount + ")</b> File(s) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>" + zfoldersize + " MB</b> Total<br /><br /><span style='color:gray;'>Uploaded on </span>" + zcreatedate + "<br /><br />" + zwebcount + "<div class='wtw-rightbutton' onclick=\"WTW.setSelectModel('" + zresponse[i].uploadobjectid + "','" + zresponse[i].objectfolder + "','" + zresponse[i].objectfile + "');\">" + zlinktext + "</div><div class='wtw-rightbutton' onclick=\"WTW.openObjectPageForm('" + zresponse[i].uploadobjectid + "','" + zresponse[i].objectfile + "');\">Edit</div><div class='wtw-leftbutton' onclick=\"WTW.openIFrame('/core/pages/models.php?objectfile=" + zresponse[i].objectfolder + zresponse[i].objectfile + "',.8,.8,'Preview " + zresponse[i].objectfile + "');\">Preview</div><div class='wtw-clear'></div></div></div>";
					} else {
						zuploadedobjectsdiv += "<div id='wtw_obj_" + i + "_" + zresponse[i].objectfile.toLowerCase() + "-" + zresponse[i].groupid + "' class='wtw-objectcontainer'><div class='wtw-objectfile' onclick=\"WTW.openObjectPageForm('" + zresponse[i].uploadobjectid + "','" + zresponse[i].objectfile + "');\">" + zresponse[i].objectfile + "</div><div class='wtw-objectfolder'><canvas id='wtw_modelCanvas" + i + "' style='border:1px solid black;display:none;visibility:hidden;'></canvas>" + zresponse[i].objectfolder.replace("/objects/","/objects<br />/") + "<br /><br />" + zanimationdiv + "<b>(" + zfilecount + ")</b> File(s) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>" + zfoldersize + " MB</b> Total<br /><br /><span style='color:gray;'>Uploaded on </span>" + zcreatedate + "<br /><br />" + zwebcount + "<div class='wtw-rightbutton' onclick=\"WTW.openObjectPageForm('" + zresponse[i].uploadobjectid + "','" + zresponse[i].objectfile + "');\">" + zlinktext + "</div><div id='wtw_bgroup_" + zresponse[i].uploadobjectid + "' class='wtw-rightbutton' onclick=\"WTW.selectObjectGroup('" + zresponse[i].uploadobjectid + "','" + zresponse[i].groupid + "', 'wtw_obj_" + i + "_" + zresponse[i].objectfile.toLowerCase() + "-" + zresponse[i].groupid + "');\" onmouseover=\"WTW.showObjectGroup('" + zresponse[i].uploadobjectid + "','" + zresponse[i].groupid + "',true);\" onmouseout=\"WTW.showObjectGroup('" + zresponse[i].uploadobjectid + "','" + zresponse[i].groupid + "',false);\">Group</div><div id='wtw_bduplicate_" + zresponse[i].uploadobjectid + "' class='wtw-rightbutton' onclick=\"WTW.selectObjectDuplicate('" + zresponse[i].uploadobjectid + "','" + zresponse[i].objectfile.toLowerCase() + "', 'wtw_obj_" + i + "_" + zresponse[i].objectfile.toLowerCase() + "-" + zresponse[i].groupid + "');\">Duplicate</div><div class='wtw-leftbutton' onclick=\"WTW.openIFrame('/core/pages/models.php?objectfile=" + zresponse[i].objectfolder + zresponse[i].objectfile + "',.8,.8,'Preview " + zresponse[i].objectfile + "');\">Preview</div><div class='wtw-clear'></div></div></div>";
					}
					WTW.loadPreviewScene(i);
				}
				dGet('wtw_uploadedmodelsdiv').innerHTML = zuploadedobjectsdiv;
				dGet('wtw_selectimagepage').style.height = (WTW.sizeY - 100) + 'px';
				dGet('wtw_uploadedmodelsdiv').style.height = (WTW.sizeY - 170) + 'px';
				WTW.show('wtw_uploadedmodelsdiv');
				if (showloading) {
					WTW.hide('wtw_loadingselectimage');
				}
				WTW.resetUploadButton();
				WTW.filterModels(2);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-loadUploadedObjectsDiv=' + ex.message);
	}
}

WTWJS.prototype.showObjectGroup = async function(zuploadobjectid, zgroupid, zshow) {
	/* show obj group to mark parts of 3D Models */
	try {
		var zbgcolor = '#ffffff';
		if (zshow) {
			zbgcolor = '#feffce';
		}
		var zobjectcontainers = document.getElementsByClassName('wtw-objectcontainer');
		for (var i=0;i<zobjectcontainers.length;i++) {
			if (zobjectcontainers[i] != null) {
				if (zobjectcontainers[i].id.indexOf('wtw_obj_') > -1 && zobjectcontainers[i].id.indexOf('-' + zgroupid) > -1) {
					if (dGet('wtw_tgroupuploadobjectid').value != zuploadobjectid) {
						dGet(zobjectcontainers[i].id).style.backgroundColor = zbgcolor;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-showObjectGroup=' + ex.message);
	}
}

WTWJS.prototype.selectObjectGroup = async function(zuploadobjectid, zgroupid, zgroupdiv) {
	/* select obj groupid to mark parts of 3D Models */
	try {
		if (dGet('wtw_tgroupuploadobjectid').value == '' || dGet('wtw_tgroupuploadobjectid').value == zuploadobjectid) {
			if (dGet(zgroupdiv) != null) {
				if (dGet(zgroupdiv).style.borderColor != 'red') {
					dGet(zgroupdiv).style.borderColor = 'red';
					dGet(zgroupdiv).style.backgroundColor = '#feffce';
					dGet('wtw_tgroupuploadobjectid').value = zuploadobjectid;
					dGet('wtw_tgroupid').value = zgroupid;
					dGet('wtw_tgroupdiv').value = zgroupdiv;
				} else {
					dGet(zgroupdiv).style.borderColor = '#afafaf';
					dGet(zgroupdiv).style.backgroundColor = '#ffffff';
					dGet('wtw_tgroupuploadobjectid').value = '';
					dGet('wtw_tgroupid').value = '';
					dGet('wtw_tgroupdiv').value = '';
				}
			}
		} else {
			dGet(zgroupdiv).style.borderColor = 'red';
			dGet(zgroupdiv).style.backgroundColor = '#feffce';
			var zrequest = {
				'uploadobjectid': dGet('wtw_tgroupuploadobjectid').value,
				'groupid': zgroupid,
				'function':'saveobjectgroup'
			};
			WTW.postAsyncJSON('/core/handlers/uploadedfiles.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					try {
						/* set new div id, events, and styles */
						var znewuploadobjectid = dGet('wtw_tgroupuploadobjectid').value;
						var znewdivid = dGet('wtw_tgroupdiv').value.replace('-' + dGet('wtw_tgroupid').value, '-' + zgroupid);
						var zbgroup = 'wtw_bgroup_' + znewuploadobjectid;
						dGet(zbgroup).onclick = function() {
							WTW.selectObjectGroup(znewuploadobjectid, zgroupid, znewdivid);
						};
						dGet(zbgroup).onmouseover = function() {
							WTW.showObjectGroup(znewuploadobjectid, zgroupid, true);
						};
						dGet(zbgroup).onmouseout = function() {
							WTW.showObjectGroup(znewuploadobjectid, zgroupid, false);
						};
						dGet(zgroupdiv).style.borderColor = '#afafaf';
						dGet(zgroupdiv).style.backgroundColor = '#ffffff';
						dGet(dGet('wtw_tgroupdiv').value).id = znewdivid;
						dGet(znewdivid).style.borderColor = '#afafaf';
						dGet(znewdivid).style.backgroundColor = '#ffffff';
						WTW.showObjectGroup(zuploadobjectid, zgroupid, true);
					} catch (ex) {}
					dGet('wtw_tgroupuploadobjectid').value = '';
					dGet('wtw_tgroupid').value = '';
					dGet('wtw_tgroupdiv').value = '';
				}
			);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-selectObjectGroup=' + ex.message);
	}
}

WTWJS.prototype.ungroupModel = async function(zobj, zuploadobjectid, zedituploadobjectid, zgroupid) {
	/* remove a 3D Model from a group */
	try {
		if (zuploadobjectid == zedituploadobjectid) {
			/* hide group section - this object is no longer in a group */
			WTW.hide('wtw_divgroupedobjects');
		} else {
			/* hide the object from the group - editing another obect that still has a group */
			WTW.hide(zobj.id.replace('wtw_bungroup-','wtw_divungroup-'));
		}
		var zrequest = {
			'uploadobjectid': zuploadobjectid,
			'groupid': zgroupid,
			'function':'ungroupobject'
		};
		WTW.postAsyncJSON('/core/handlers/uploadedfiles.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-ungroupModel=' + ex.message);
	}
}

WTWJS.prototype.selectObjectDuplicate = async function(zuploadobjectid, zobjectfile, zgroupdiv) {
	/* select obj to eliminate duplicate 3D Models */
	try {
		if (dGet('wtw_tgroupuploadobjectid').value == '' || dGet('wtw_tgroupuploadobjectid').value == zuploadobjectid) {
			if (dGet(zgroupdiv) != null) {
				if (dGet(zgroupdiv).style.borderColor != 'red') {
					dGet(zgroupdiv).style.borderColor = 'red';
					dGet(zgroupdiv).style.backgroundColor = '#feffce';
					dGet('wtw_tgroupuploadobjectid').value = zuploadobjectid;
					dGet('wtw_tgroupdiv').value = zgroupdiv;
					dGet('wtw_modelfilter').value = zobjectfile;
					WTW.filterModels(2);
				} else {
					dGet(zgroupdiv).style.borderColor = '#afafaf';
					dGet(zgroupdiv).style.backgroundColor = '#ffffff';
					dGet('wtw_tgroupuploadobjectid').value = '';
					dGet('wtw_tgroupdiv').value = '';
				}
			}
		} else {
			dGet(zgroupdiv).style.borderColor = 'red';
			dGet(zgroupdiv).style.backgroundColor = '#feffce';
			var zrequest = {
				'uploadobjectid': zuploadobjectid,
				'duplicateuploadobjectid': dGet('wtw_tgroupuploadobjectid').value,
				'function':'removeduplicateuploadobject'
			};
			WTW.postAsyncJSON('/core/handlers/uploadedfiles.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					dGet('wtw_tgroupuploadobjectid').value = '';
					dGet('wtw_tgroupdiv').value = '';
					dGet('wtw_modelfilter').value = zobjectfile;
					WTW.openFullPageForm('medialibrary','');
					WTW.setImageMenu(4);
				}
			);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-selectObjectDuplicate=' + ex.message);
	}
}

WTWJS.prototype.clearNameFilter = async function() {
	/* clear name filter and reset duplicate function */
	try {
		if (dGet('wtw_tgroupdiv').value != '') {
			dGet(dGet('wtw_tgroupdiv').value).style.borderColor = '#afafaf';
			dGet(dGet('wtw_tgroupdiv').value).style.backgroundColor = '#ffffff';
		}
		dGet('wtw_tgroupuploadobjectid').value = '';
		dGet('wtw_tgroupid').value = '';
		dGet('wtw_modelfilter').value='';
		WTW.filterModels(2);
		dGet('wtw_modelfilter').focus();
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-clearNameFilter=' + ex.message);
	}
}

WTWJS.prototype.loadPreviewScene = async function(zind) {
	/* creates scene used to preview a 3D Model */
	try {
		var zcanvasid = 'wtw_modelCanvas' + zind;
		if (dGet(zcanvasid) != null) {
/*			var zview = engine.registerView(dGet(zcanvasid));
			var scene1 = new BABYLON.Scene(engine);        
			scene1.name = 'wtw_modelcanvas' + zind;
			scene1.gravity = new BABYLON.Vector3(0, -WTW.init.gravity, 0);
			scene1.autoClear = false;
			scene1.autoClearDepthAndStencil = false;
*/			
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-loadPreviewScene=' + ex.message);
	}
}

WTWJS.prototype.loadObjectDetailsName = async function(zuploadobjectid) {
	/* if an object is opened, this details page form shows */
	try {
		if (zuploadobjectid == undefined) {
			zuploadobjectid = dGet('wtw_tuploadobjectid').value;
		}
		dGet('wtw_uploadedmodelsnamediv').innerHTML = '';
		dGet('wtw_uploadedmodelpreviewdiv').innerHTML = '';
		var znamediv = '';
		var zpreviewdiv = '';
		var zrequest = {
			'uploadobjectid': zuploadobjectid,
			'function':'getuploadedfilenamedetails'
		};
		WTW.postAsyncJSON('/core/handlers/uploadedfiles.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.length > 0) {
					for (var i=0;i < zresponse.length;i++) {
						if (zresponse[i] != null) {
							if (zresponse[i].uploadobjectid != undefined) {
								var zcreatedate = zresponse[i].createdate;
								//zcreatedate = date('m/d/Y', strtotime($zcreatedate));
								dGet('wtw_tuploadobjectid').value = zresponse[i].uploadobjectid;
								dGet('wtw_tobjectfile').value = zresponse[i].objectfile;
								if (zresponse[i].stock == 1) {
									znamediv += "<h1 style='color:black;margin-left:20px;'>Edit Stock 3D Model</h1>";
								} else {
									znamediv += "<h1 style='color:black;margin-left:20px;'>Edit 3D Model</h1>";
								}
								znamediv += "<div class='wtw-objectcontainer'><div class='wtw-objectfile'>" + zresponse[i].objectfile + "</div><div class='wtw-objectfolder'>" + zresponse[i].objectfolder.replace("/objects/","/objects<br />/") + "<br /><br /><span style='color:gray;'>Uploaded on </span>" + zcreatedate + "</div></div>";
								
								zpreviewdiv += "<div class='wtw-leftbutton' onclick=\"dGet('wtw_3dobectpreview-" + i + "').src='/core/pages/models.php?objectfile=" + zresponse[i].objectfolder + zresponse[i].objectfile + "';\" style='margin:10px;'>Preview or Refresh Preview</div> After an update, you may need to clear your browser cache files to fully refresh the 3D Model Preview.<br />\r\n";
								zpreviewdiv += "<iframe id='wtw_3dobectpreview-" + i + "' src='/core/pages/models.php?objectfile=" + zresponse[i].objectfolder + zresponse[i].objectfile + "' style='width:100%;min-height:400px;height:100%;'></iframe>\r\n";
								zpreviewdiv += "<br /><br />Use Mouse Scroll-Wheel to Zoom<br /><br />Hold Mouse Left Button Down to Rotate View as you move Mouse or<br /><br />Use Arrow Keys on the Keyboard.<br />\r\n";

								WTW.loadObjectDetailsFiles(zuploadobjectid, zresponse[i].objectfolder, zresponse[i].objectfile);
								if (zresponse[i].groupmodels != null) {
									if (zresponse[i].groupmodels.length > 1) {
										zpreviewdiv += "<div id='wtw_divgroupedobjects'><br /><br /><div class='wtw-dashboardboxtitle'><div style='float:right;margin-right:10px;'>(" + zresponse[i].groupmodels.length + " found)</div>3D Models in this Group</div><br />";
										for (var j=0;j<zresponse[i].groupmodels.length;j++) {
											if (zresponse[i].groupmodels[j] != null) {
												var zcolor = '#000000';
												var zmodel = '';
												if (zresponse[i].groupmodels[j].uploadobjectid == zresponse[i].uploadobjectid) {
													zcolor = '#0000ff';
													zmodel = ' (this 3D Model)';
												}
												zpreviewdiv += "<div id='wtw_divungroup-" + zresponse[i].groupmodels[j].uploadobjectid + "'><div id='wtw_bungroup-" + zresponse[i].groupmodels[j].uploadobjectid + "' class='wtw-rightbutton' onclick=\"WTW.ungroupModel(this, '" + zresponse[i].groupmodels[j].uploadobjectid + "','" + zresponse[i].uploadobjectid + "','" + zresponse[i].groupmodels[j].groupid + "');\">Ungroup</div><div style='display:inline-block;min-width:150px;'>3D Model:</div> <span style='color:" + zcolor + ";'><b>" + zresponse[i].groupmodels[j].objectfile.toLowerCase() + "</b></span>" + zmodel + "</div><div class='wtw-clear'><br /></div>";
											}
										}
										zpreviewdiv += "</div>";
									}
								}
								if (zresponse[i].webs != null) {
									if (zresponse[i].webs.length > 0) {
										zpreviewdiv += "<br /><br /><div class='wtw-dashboardboxtitle'><div style='float:right;margin-right:10px;'>(" + zresponse[i].webs.length + " found)</div>3D Webs that use this 3D Model</div><br />";
										for (var j=0;j<zresponse[i].webs.length;j++) {
											if (zresponse[i].webs[j] != null) {
												zpreviewdiv += "<div style='display:inline-block;min-width:150px;'>3D " + zresponse[i].webs[j].webtype + ":</div> <a href='\admin.php?" + zresponse[i].webs[j].webtype.toLowerCase() + "id=" + zresponse[i].webs[j].webid + "'><b>" + zresponse[i].webs[j].webname + "</b></a><br /><br />";
											}
										}
										zpreviewdiv += "<br /><br /><span style='color:red;'>Note: If you would like the option to delete this 3D Model, first remove it from the 3D Webs listed above.</span><br /><br />";
									} else {
										zpreviewdiv += "<br /><br /><div class='wtw-dashboardboxtitle'>Delete 3D Model</div><br />\r\n";
										if (zresponse[i].stock != '1') {
											zpreviewdiv += "<div id='wtw_uploadobjectdelete' class='wtw-redbuttonleft' onclick=\"WTW.deleteUploadObject('" + zresponse[i].uploadobjectid + "',0);\">Delete 3D Model</div> This button will mark the record Deleted and keep the files on the server.\r\n";
											zpreviewdiv += "<div class='wtw-clear'></div><hr />";
											zpreviewdiv += "<div id='wtw_uploadobjectpermdelete' class='wtw-redbuttonleft' onclick=\"dGet('wtw_tgroupuploadobjectid').value='" + zresponse[i].uploadobjectid + "';WTW.openConfirmation('Permanently Delete 3D Model');\">Permanently Delete 3D Model</div> This button will delete the record and related 3D Model files on the server if they are no longer in use by other 3D Models.\r\n";
										} else {
											zpreviewdiv += "<br /><span style='color:red;'>Note: Stock items cannot be deleted.</span><br /><br />";
										}
										zpreviewdiv += "<div class='wtw-clear'></div>";
									}									
								}
							}
						}
					}
				} else {
					znamediv += "<h1 style='color:red;margin-left:20px;'>3D Object not found</h1>";
				}
				dGet('wtw_uploadedmodelsnamediv').innerHTML = znamediv;
				dGet('wtw_uploadedmodelpreviewdiv').innerHTML = zpreviewdiv;
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-loadObjectDetailsName=' + ex.message);
	}
}

WTWJS.prototype.deleteUploadObject = function(zuploadobjectid, zpermanent) {
	/* delete 3D Model files */
	try {
		var zrequest = {
			'uploadobjectid': zuploadobjectid,
			'permanent': zpermanent,
			'function':'deleteuploadobject'
		};
		WTW.postAsyncJSON('/core/handlers/uploadedfiles.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				WTW.openFullPageForm('medialibrary','');
				WTW.setImageMenu(4);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-deleteUploadObject=' + ex.message);
	}
}

WTWJS.prototype.uploadObjectFiles = function(ztype, zobjectfolder) {
	/* upload 3D Object files using form post */
	try {
		if (dGet('wtw_filesupload').value != null) {
			if (ztype == undefined) {
				ztype = 'uploadobjectfiles';
			}
			if (zobjectfolder == undefined) {
				zobjectfolder = '';
			}
			var zwebtype = 'communities';
			if (buildingid != '') {
				zwebtype = 'buildings';
			} else if (thingid != '') {
				zwebtype = 'things';
			}
			var zobjectfilepart = dGet('wtw_tobjectfile').value;
			zobjectfilepart = zobjectfilepart.replace('.babylon','').replace('.glb','').replace('.gltf','').replace('.obj','');
			var zform1 = document.createElement('form');
			var Httpreq = new XMLHttpRequest();
			var zformdata = new FormData(zform1);
			for (var i=0;i < dGet('wtw_filesupload').files.length;i++) {
				zformdata.append('wtw_uploadfiles[]', dGet('wtw_filesupload').files[i], dGet('wtw_filesupload').files[i].name);
			}
			zformdata.append('action', 'POST');
			zformdata.append('objectfolder', zobjectfolder);
			zformdata.append('objectfilepart', zobjectfilepart);
			zformdata.append('webtype', zwebtype);
			zformdata.append('webid', communityid + buildingid + thingid);
			zformdata.append('actionzoneid', dGet('wtw_tactionzoneid').value);
			zformdata.append('function', ztype);
			Httpreq.open('POST', '/core/handlers/uploadedfiles.php');
			Httpreq.onreadystatechange = function () {
				if (Httpreq.readyState == 4 && Httpreq.status == '200') {
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-uploadObjectFiles=' + ex.message);
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
				var zwebtype = 'communities';
				if (buildingid != '') {
					zwebtype = 'buildings';
				} else if (thingid != '') {
					zwebtype = 'things';
				}
				var zobjectfilepart = dGet('wtw_tobjectfile').value;
				zobjectfilepart = zobjectfilepart.replace('.babylon','').replace('.glb','').replace('.gltf','').replace('.obj','');
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
					if (Httpreq.readyState == 4 && Httpreq.status == '200') {
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-uploadAsyncObjectFiles=' + ex.message);
	}
}

WTWJS.prototype.deleteObjectFile = async function(zobjectfolder) {
	/* delete 3D Mold Object file */
	try {
		var zobjectfilepart = dGet('wtw_tobjectfile').value;
		zobjectfilepart = zobjectfilepart.replace('.babylon','').replace('.glb','').replace('.gltf','').replace('.obj','');
		var zrequest = {
			'filename': dGet('wtw_tdeletefile').value,
			'objectfolder': zobjectfolder,
			'objectfilepart': zobjectfilepart,
			'function':'deleteobjectfile'
		};
		WTW.postAsyncJSON('/core/handlers/uploadedfiles.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.hide('wtw_deletefile');
				WTW.hide('wtw_canceldelete');
				WTW.loadObjectDetailsName();
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-deleteObjectFile=' + ex.message);
	}
}

WTWJS.prototype.loadObjectDetailsFiles = async function(zuploadobjectid, zobjectfolder, zfilename) {
	/* files list included on the 3D Object details page form */
	try {
		dGet('wtw_uploadedmodelsfilesdiv').innerHTML = '';
		var zfilesdiv = '';
		var zrequest = {
			'objectfolder': zobjectfolder,
			'function':'getuploadedfilefilesdetails'
		};
		WTW.postAsyncJSON('/core/handlers/uploadedfiles.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				zfilesdiv += "<div class='wtw-clear'></div>";
				zfilesdiv += "<div class='wtw-objectcontainer'><div class='wtw-objectfile'>File List</div><div class='wtw-objectfolder'>";
				if (zresponse.length > 0) {
					var zbgcolor = '#eeeeee';
					for (var i=0;i < zresponse.length;i++) {
						if (zresponse[i] != null) {
							zfilesdiv += "<div style='background-color:" + zbgcolor + ";margin-bottom:8px;'>";
							zfilesdiv += "<img src='/content/system/images/close2.png' alt='Delete' title='Delete' style='width:24px;height:auto;float:right;cursor:pointer;' onclick=\"dGet('wtw_tdeletefile').value='" + zresponse[i].file + "';WTW.hide('wtw_uploadbutton');WTW.showInline('wtw_deletefile');WTW.showInline('wtw_canceldelete');\" />";
							var zfolder = atob(zresponse[i].folder) + zresponse[i].file;
							if (zresponse[i].file == zfilename) {
								zfilesdiv += "<div class='wtw-download' onclick=\"WTW.downloadFile('" + zfolder + "', '" + zresponse[i].file + "');\"><div class='wtw-floatright'>Primary</div><strong>" + zresponse[i].file + "</strong></div><br /><div class='wtw-clear'></div>";
							} else {
								zfilesdiv += "<div class='wtw-download' onclick=\"WTW.downloadFile('" + zfolder + "', '" + zresponse[i].file + "');\">" + zresponse[i].file + "</div><br /><div class='wtw-clear'></div>";
							}
							zfilesdiv += "</div>";
							if (zbgcolor == '#ffffff') {
								zbgcolor = '#eeeeee';
							} else {
								zbgcolor = '#ffffff';
							}
						}
					}
				}
				zfilesdiv += "<br /><br /><div id='wtw_uploadbutton' class='wtw-greenbutton' style='width:318px;' onclick=\"WTW.startUploadImage('Upload or Replace File(s)','" + zobjectfolder + "');\">Upload or Replace File(s)</div>";
				zfilesdiv += "<div id='wtw_deletefile' class='wtw-redbutton' style='width:150px;display:none;visibility:hidden;text-align:center;margin-right:13px;cursor:pointer;' onclick=\"WTW.deleteObjectFile('" + zobjectfolder + "');\">Delete File</div><div id='wtw_canceldelete' class='wtw-yellowbutton' style='width:150px;display:none;visibility:hidden;text-align:center;cursor:pointer;' onclick=\"dGet('wtw_tdeletefile').value='';WTW.hide('wtw_deletefile');WTW.hide('wtw_canceldelete');WTW.show('wtw_uploadbutton');\">Cancel</div>";
				zfilesdiv += "</div></div>";
				dGet('wtw_uploadedmodelsfilesdiv').innerHTML = zfilesdiv;
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-loadObjectDetailsFiles=' + ex.message);
	}
}

WTWJS.prototype.loadObjectDetailsAnimations = async function(zuploadobjectid) {
	/* animations list included on the 3D Object details page form */
	try {
		dGet('wtw_uploadedmodelsanimationsdiv').innerHTML = '';
		var zanimationsdiv = '';
		var zrequest = {
			'uploadobjectid': zuploadobjectid,
			'function':'getuploadedfileanimationsdetails'
		};
		WTW.postAsyncJSON('/core/handlers/animations.php', zrequest, 
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
								zmoldevent = ': <strong>' + zresponse[i].moldevent + '</strong>';
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-loadObjectDetailsAnimations=' + ex.message);
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
		WTW.postAsyncJSON('/core/handlers/animations.php', zrequest, 
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-loadObjectAnimation=' + ex.message);
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
			WTW.postAsyncJSON('/core/handlers/animations.php', zrequest, 
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-deleteObjectAnimation=' + ex.message);
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
			WTW.postAsyncJSON('/core/handlers/animations.php', zrequest, 
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-saveObjectAnimation=' + ex.message);
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-addAnimation=' + ex.message);
	}
}


/* Ratings and Requirements Full Page */

WTWJS.prototype.openRequirements = function() {
	/* open Ratings and Requirements form */
	try {
		var zwebtype = '';
		if (communityid != '') {
			zwebtype = 'community';
		} else if (buildingid != '') {
			zwebtype = 'building';
		} else if (thingid != '') {
			zwebtype = 'thing';
		} else if (avatarid != '') {
			zwebtype = 'avatar';
		}
		WTW.getAsyncJSON('/connect/rating.php?extended=0&webid=' + communityid + buildingid + thingid + avatarid + '&webtype=' + zwebtype, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				switch (zwebtype) {
					case 'community':
						dGet('wtw_requirementstitle').innerHTML = '3D Community Requirements';
						dGet('wtw_requirementsdesc').innerHTML = 'The settings below will only apply to this 3D Community.';
						dGet('wtw_enableparentaltext').innerHTML = 'Rating is not set for this 3D Community.';
						dGet('wtw_requirementslabel').innerHTML = '3D Community Content Rating';
						break;
					case 'building':
						dGet('wtw_requirementstitle').innerHTML = '3D Building Requirements';
						dGet('wtw_requirementsdesc').innerHTML = 'The settings below will only apply to this 3D Building.';
						dGet('wtw_enableparentaltext').innerHTML = 'Rating is not set for this 3D Building.';
						dGet('wtw_requirementslabel').innerHTML = '3D Building Content Rating';
						break;
					case 'thing':
						dGet('wtw_requirementstitle').innerHTML = '3D Thing Requirements';
						dGet('wtw_requirementsdesc').innerHTML = 'The settings below will only apply to this 3D Thing.';
						dGet('wtw_enableparentaltext').innerHTML = 'Rating is not set for this 3D Thing.';
						dGet('wtw_requirementslabel').innerHTML = '3D Thing Content Rating';
						break;
					case 'avatar':
						dGet('wtw_requirementstitle').innerHTML = '3D Avatar Requirements';
						dGet('wtw_requirementsdesc').innerHTML = 'The settings below will only apply to this 3D Avatar.';
						dGet('wtw_enableparentaltext').innerHTML = 'Rating is not set for this 3D Avatar.';
						dGet('wtw_requirementslabel').innerHTML = '3D Avatar Content Rating';
						break;
				}
				if (zresponse.unratedcontent == '1') {
					dGet('wtw_enableparentalsettings').checked = false;
					WTW.enableParentalSettings('0');
					WTW.setDDLValue('wtw_webrating', 0);
					WTW.changeRating();
					dGet('wtw_webcontentwarning').value = '';
				} else {
					dGet('wtw_enableparentalsettings').checked = true;
					WTW.enableParentalSettings('1');
					WTW.setDDLValue('wtw_webrating', zresponse.ratingvalue);
					WTW.changeRating();
					dGet('wtw_webcontentwarning').value = atob(zresponse.contentwarning);
				}
				WTW.show('wtw_requirements');
			}
		);
		/* get plugins for required section */
		dGet('wtw_pluginsrequiredlist').innerHTML = '';
		WTW.getAsyncJSON('/connect/pluginsrequired.php?webid=' + communityid + buildingid + thingid + avatarid + '&webtype=' + zwebtype, 
			function(zresponse) {
				var zhasrequirements = false;
				if (zresponse != null) {
					zresponse = JSON.parse(zresponse);
					var zpluginslist = "<table class='wtw-table'><tr>";
					zpluginslist += "<td class='wtw-tablecolumnheading'>Required</td>";
					zpluginslist += "<td class='wtw-tablecolumnheading'>Plugin Name</td>";
					zpluginslist += "<td class='wtw-tablecolumnheading'>Details</td>";
					zpluginslist += "<td class='wtw-tablecolumnheading'>&nbsp;</td>";
					zpluginslist += "</tr>";
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							if (zresponse[i].pluginname != undefined) {
								var zpluginclass = 'wtw-deactive';
								var ztdclass = 'wtw-tddeactive';
								var zrequired = '';
								var zoptional = '';
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
								zpluginslist += "<tr><td class='wtw-tablecolumns " + ztdclass + "' style='white-space:nowrap;'><input id='wtw_pluginrequired-" + zresponse[i].pluginname + "' type='checkbox' class='wtw-pluginsrequired' onclick='WTW.requiredOrOptional(this);' " + zrequired + "/> Required<br /><input id='wtw_pluginoptional-" + zresponse[i].pluginname + "' type='checkbox' class='wtw-pluginsoptional' onclick='WTW.requiredOrOptional(this);' " + zoptional + "/> Optional</td>";
								zpluginslist += "<td class='wtw-tablecolumns " + ztdclass + "' style='white-space:nowrap;'><span class='" + zpluginclass + "'>" + zresponse[i].pluginname + "</span><br />Version: " + zresponse[i].version + "</td>";
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
							}
						}
					}
					zpluginslist += "</table>";
					dGet('wtw_pluginsrequiredlist').innerHTML = zpluginslist;
				}
				dGet('wtw_enablepluginsrequired').checked = zhasrequirements;
				WTW.changeSwitch(dGet('wtw_enablepluginsrequired'));
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-openRequirements=' + ex.message);
	}
}

WTWJS.prototype.requiredOrOptional = function(zobj) {
	/* make sure required and optional are not both checked */
	try {
		if (zobj.id.indexOf('wtw_pluginrequired-') > -1) {
			if (zobj.checked) {
				dGet(zobj.id.replace('wtw_pluginrequired-','wtw_pluginoptional-')).checked = false;
			}
		} else {
			if (zobj.checked) {
				dGet(zobj.id.replace('wtw_pluginoptional-','wtw_pluginrequired-')).checked = false;
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-requiredOrOptional=' + ex.message);
	}
}

WTWJS.prototype.changeSwitch = function(zobj) {
	/* toggle switch to set active vs inactive text */
	try {
		let zchecked = '0';
		if (zobj.checked) {
			zchecked = '1';
		}
		switch (zobj.id) {
			case 'wtw_enableparentalsettings':
				WTW.enableParentalSettings(zchecked);
				break;
			case 'wtw_enableavatargroups':
				WTW.enableAvatarGroups(zchecked);
				break;
			case 'wtw_enablepluginsrequired':
				WTW.enablePluginsRequired(zchecked);
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-changeSwitch=' + ex.message);
	} 
}

WTWJS.prototype.changeRating = function() {
	/* change website rating drop-down */
	try {
		var zrating = WTW.getDDLText('wtw_webrating');
		switch (zrating) {
			case 'Web-All':
				dGet('wtw_webratingtext').innerHTML = 'All Visitors - Safe for All Ages.';
				break;
			case 'Web-P':
				dGet('wtw_webratingtext').innerHTML = 'Parental Oversight - Adult supervision suggested for Children.';
				break;
			case 'Web-P13':
				dGet('wtw_webratingtext').innerHTML = 'Parental Caution for Children - Not recommended for Children under 13 Years Old.';
				break;
			case 'Web-P17':
				dGet('wtw_webratingtext').innerHTML = 'Parental Oversight for Visitors - Adult supervision recommended for Visitors under 18 Years Old, not recommended for Children under 13 Years Old.';
				break;
			case 'Web-Adult':
				dGet('wtw_webratingtext').innerHTML = 'Adult - Visitors must be at least 18 Years Old.';
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-changeRating=' + ex.message);
	} 
}

WTWJS.prototype.enableParentalSettings = function(zchecked) {
	/* enable parental settings */
	try {
		var zwebtype = '';
		if (communityid != '') {
			zwebtype = 'Community';
		} else if (buildingid != '') {
			zwebtype = 'Building';
		} else if (thingid != '') {
			zwebtype = 'Thing';
		} else if (avatarid != '') {
			zwebtype = 'Avatar';
		}
		if (zchecked == '1') {
			dGet('wtw_enableparentaltext').innerHTML = 'This 3D ' + zwebtype + ' has Age Restrictions.';
			dGet('wtw_enableparentaltext2').innerHTML = 'Visitors must exceed a minimum Age to browse this 3D ' + zwebtype + ' Website.';
			WTW.show('wtw_webratingdiv');
		} else {
			dGet('wtw_enableparentaltext').innerHTML = 'Rating is not set for this 3D ' + zwebtype + '.';
			dGet('wtw_enableparentaltext2').innerHTML = 'No content warning will be displayed.';
			WTW.hide('wtw_webratingdiv');
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-enableParentalSettings=' + ex.message);
	} 
}

WTWJS.prototype.enableAvatarGroups = function(zchecked) {
	/* enable avatar groups */
	try {

	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-enableAvatarGroups=' + ex.message);
	} 
}

WTWJS.prototype.saveCommunityRequirements = function(w) {
	/* save community requirements */
	try {
		switch (w) {
			case 1: /* save parental controls */
				dGet('wtw_parentalcontrolerror').innerHTML = '';
				var zchecked = '0';
				if (dGet('wtw_enableparentalsettings').checked) {
					zchecked = '1';
				}
				var zwebtype = '';
				if (communityid != '') {
					zwebtype = 'community';
				} else if (buildingid != '') {
					zwebtype = 'building';
				} else if (thingid != '') {
					zwebtype = 'thing';
				} else if (avatarid != '') {
					zwebtype = 'avatar';
				}
				var zwebrating = WTW.getDDLText('wtw_webrating');
				var zwebratingvalue = WTW.getDDLValue('wtw_webrating');
				var zcontentwarning = dGet('wtw_webcontentwarning').value;
				var zrequest = {
					'webid': communityid + buildingid + thingid + avatarid,
					'webtype': zwebtype,
					'parentalcontrols': zchecked,
					'rating': zwebrating,
					'ratingvalue':zwebratingvalue,
					'contentwarning':btoa(zcontentwarning),
					'function':'savecontentrating'
				};
				WTW.postAsyncJSON('/core/handlers/tools.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						if (zresponse.serror != '') {
							dGet('wtw_parentalcontrolerror').innerHTML = zresponse.serror;
							dGet('wtw_parentalcontrolerror').style.color = 'red';
						} else {
							dGet('wtw_parentalcontrolerror').innerHTML = 'Content Ratings Saved';
							dGet('wtw_parentalcontrolerror').style.color = 'green';
						}
						WTW.setContentRating();
						window.setTimeout(function() {
							dGet('wtw_parentalcontrolerror').innerHTML = '';
						},5000);
					}
				);
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-saveCommunityRequirements=' + ex.message);
	} 
}


/* email server settings */

WTWJS.prototype.openEmailServerSettings = function() {
	/* open email server settings form */
	try {
		WTW.show('wtw_loadingemailserver');
		WTW.show('wtw_settingspage');
		WTW.show('wtw_emailserversettings');
		WTW.getSettings('smtphost, smtpport, smtpusername, smtppassword, smtpencryption, fromemail, fromemailname, enableemailvalidation', 'WTW.loadEmailServerSettings');
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-openEmailServerSettings=' + ex.message);
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-loadEmailServerSettings=' + ex.message);
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
		WTW.saveSettings(zsettings, 'WTW.saveEmailServerSettingsComplete');
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-saveEmailServerSettings=' + ex.message);
	}
}

WTWJS.prototype.saveEmailServerSettingsComplete = function(zsuccess) {
	/* completed saving email server settings, report results */
	try {
		if (zsuccess == '1' || zsuccess) {
			dGet('wtw_emailservercomplete').innerHTML = 'Settings Saved';
			dGet('wtw_emailservercomplete').style.color = 'green';
		} else {
			dGet('wtw_emailservercomplete').innerHTML = 'Settings Not Saved';
			dGet('wtw_emailservercomplete').style.color = 'red';
		}
		window.setTimeout(function() {
			dGet('wtw_emailservercomplete').innerHTML = '';
		},5000);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-saveEmailServerSettingsComplete=' + ex.message);
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
		WTW.postAsyncJSON('/core/handlers/tools.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.serror != '') {
					dGet('wtw_emailservercomplete').innerHTML = zresponse.serror;
					dGet('wtw_emailservercomplete').style.color = 'red';
				} else {
					dGet('wtw_emailservercomplete').innerHTML = 'Email Sent Successfully';
					dGet('wtw_emailservercomplete').style.color = 'green';
				}
				window.setTimeout(function() {
					dGet('wtw_emailservercomplete').innerHTML = '';
				},5000);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-testEmailServerSettings=' + ex.message);
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
			WTW.saveSetting('enableemailvalidation', WTW.enableEmailValidation + '');
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-changeEmailSwitch=' + ex.message);
	}
}

/* web domains - for web hosting and default domains */

WTWJS.prototype.openWebDomainsSettings = async function() {
	/* open web domains page form */
	try {
		WTW.hide('wtw_serversettings');
		WTW.show('wtw_loadingwebdomain');
		WTW.show('wtw_settingspage');
		WTW.show('wtw_webdomainsettings');
		dGet('wtw_webdomainlist').innerHTML = '';
		WTW.getAsyncJSON('/connect/webdomains.php', 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					var zwebdomainlist = "<table class='wtw-table'><tr><td class='wtw-tablecolumnheading'><b>Domain Name</b></td>\r\n";
					zwebdomainlist += "<td class='wtw-tablecolumnheading'><b>Start<br />Date</b></td>\r\n";
					zwebdomainlist += "<td class='wtw-tablecolumnheading'><b>Expire<br />Date</b></td>\r\n";
					if (WTW.isUserInRole('admin')) {
						zwebdomainlist += "<td class='wtw-tablecolumnheading'><b>Allow<br />Hosting</b></td>\r\n";
					}
					zwebdomainlist += "<td class='wtw-tablecolumnheading'><b>Hosting<br />Price</b></td>\r\n";
					zwebdomainlist += "<td class='wtw-tablecolumnheading'><b>SSL Cert<br />Price</b></td>\r\n";
					zwebdomainlist += "<td class='wtw-tablecolumnheading'><b>Hosting Term<br />(Days)</b></td>\r\n";
					zwebdomainlist += "<td class='wtw-tablecolumnheading'><b>&nbsp;</b></td></tr>";
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							if (zresponse[i].webdomainid != undefined) {
								var zallowhosting = 'No';
								var zhostuserid = zresponse[i].hostuserid;
								var zforcehttps = zresponse[i].forcehttps;
								var zdomainname = zresponse[i].domainname;
								var zstartdate = WTW.formatDate(zresponse[i].startdate);
								var zexpiredate = WTW.formatDate(zresponse[i].expiredate);
								var zhostprice = WTW.formatMoney(zresponse[i].hostprice);
								var zsslprice = WTW.formatMoney(zresponse[i].sslprice);
								var zhostdays = WTW.formatNumber(zresponse[i].hostdays,0);
								var zurl = 'http://' + zdomainname;
								if (zforcehttps == '1' || zforcehttps == 1) {
									zurl = 'https://' + zdomainname;
								}
								if (zresponse[i].allowhosting == '1') {
									zallowhosting = 'Yes';
								}
								if (zhostuserid == dGet('wtw_tuserid').value || WTW.isUserInRole('admin')) {
									zwebdomainlist += "<tr><td class='wtw-tablecolumns'><a href='" + zurl + "' target='_blank'>" + zurl + "</a></td>\r\n";
									zwebdomainlist += "<td class='wtw-tablecolumns'>" + zstartdate + "</td>\r\n";
									zwebdomainlist += "<td class='wtw-tablecolumns'>" + zexpiredate + "</td>\r\n";
									if (WTW.isUserInRole('admin')) {
										zwebdomainlist += "<td class='wtw-tablecolumns'>" + zallowhosting + "</td>\r\n";
									}
									zwebdomainlist += "<td class='wtw-tablecolumns'>" + zhostprice + "</td>\r\n";
									zwebdomainlist += "<td class='wtw-tablecolumns'>" + zsslprice + "</td>\r\n";
									zwebdomainlist += "<td class='wtw-tablecolumns'>" + zhostdays + "</td>\r\n";
									zwebdomainlist += "<td class='wtw-tablecolumns'><div class='wtw-bluebuttonright' onclick=\"WTW.editWebDomain('" + zresponse[i].webdomainid + "');\">Edit</div></td></tr>";
								} else {
									zwebdomainlist += "<tr><td class='wtw-tablecolumns'><a href='" + zurl + "' target='_blank'>" + zurl + "</a></td>\r\n";
									zwebdomainlist += "<td class='wtw-tablecolumns'>" + zstartdate + "</td>\r\n";
									zwebdomainlist += "<td class='wtw-tablecolumns'>" + zexpiredate + "</td>\r\n";
									zwebdomainlist += "<td class='wtw-tablecolumns'></td>\r\n";
									zwebdomainlist += "<td class='wtw-tablecolumns'></td>\r\n";
									zwebdomainlist += "<td class='wtw-tablecolumns'></td>\r\n";
									zwebdomainlist += "<td class='wtw-tablecolumns'></td></tr>";
								}
							}
						}
					}
					zwebdomainlist += '</table>'
					dGet('wtw_webdomainlist').innerHTML = zwebdomainlist;
					WTW.hide('wtw_loadingwebdomain');
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-openWebDomainsSettings=' + ex.message);
	}
}

WTWJS.prototype.openDomainForm = function() {
	/* open edit web domain form */
	try {
		var zdate = new Date();
		var	zmonth = '' + (zdate.getMonth() + 1);
		var	zday = '' + zdate.getDate();
		var	zyear = zdate.getFullYear();

		if (zmonth.length < 2) {
			zmonth = '0' + zmonth;
		}
		if (zday.length < 2) {
			zday = '0' + zday;
		}
		zdate = [zmonth, zday, zyear].join('/');
		dGet('wtw_domainstartdate').disabled = false;
		dGet('wtw_domainexpiredate').disabled = false;
		dGet('wtw_domainhostprice').disabled = false;
		dGet('wtw_domainsslprice').disabled = false;
		dGet('wtw_domainhostdays').disabled = false;
		dGet('wtw_domainforcehttps').selectedIndex = 0;
		dGet('wtw_twebdomainid').value = '';
		dGet('wtw_twebdomain').value = '3d.';
		dGet('wtw_twebdomain').style.color = 'black';
		dGet('wtw_twebdomain').style.borderColor = '-internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))';
		dGet('wtw_domainstartdate').value = zdate;
		dGet('wtw_domainexpiredate').value = '';
		dGet('wtw_domainhostprice').value = '';
		dGet('wtw_domainsslprice').value = '';
		dGet('wtw_domainhostdays').value = '';
		dGet('wtw_tallowhostingyes').checked = false;
		dGet('wtw_tallowhostingno').checked = true;
		WTW.hide('wtw_domainpurchaseview');
		WTW.show('wtw_domaindetailsdiv');
		WTW.show('wtw_addwebdomaindiv');
		WTW.hide('wtw_addwebdomain');
		WTW.hide('wtw_bdomaindelete');
		WTW.pluginsOpenDomainForm();
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-openDomainForm=' + ex.message);
	}
}

WTWJS.prototype.changeDomainPurchaseSSL = async function(zserverhostdays, zserverhostprice, zserversslprice) {
	/* web domain change SSL option */
	try {
		var zssl = WTW.getDDLText('wtw_domainforcehttps');
		if (zssl == 'https://') {
			dGet('wtw_domainpurchasesslqty').innerHTML = '1';
			dGet('wtw_domainpurchasessldesc').innerHTML = WTW.formatNumber(zserverhostdays,0) + ' days - SSL Certficate (https)';
			dGet('wtw_domainpurchasesslprice').innerHTML = WTW.formatMoney(zserversslprice);
			dGet('wtw_domainpurchasetotal').innerHTML = WTW.formatMoney((zserverhostprice + zserversslprice));
		} else {
			dGet('wtw_domainpurchasesslqty').innerHTML = '&nbsp;';
			dGet('wtw_domainpurchasessldesc').innerHTML = '&nbsp;';
			dGet('wtw_domainpurchasesslprice').innerHTML = '&nbsp;';
			dGet('wtw_domainpurchasetotal').innerHTML = WTW.formatMoney(zserverhostprice);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-changeDomainPurchaseSSL=' + ex.message);
	}
}

WTWJS.prototype.editWebDomain = async function(zwebdomainid) {
	/* load to edit a web domain */
	try {
		WTW.show('wtw_addwebdomaindiv');
		WTW.hide('wtw_addwebdomain');
		WTW.hide('wtw_bdomaindelete');
		dGet('wtw_twebdomain').style.color = 'black';
		dGet('wtw_twebdomain').style.borderColor = '-internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))';
		dGet('wtw_domainstartdate').disabled = false;
		dGet('wtw_domainexpiredate').disabled = false;
		dGet('wtw_domainhostprice').disabled = false;
		dGet('wtw_domainsslprice').disabled = false;
		dGet('wtw_domainhostdays').disabled = false;
		WTW.hide('wtw_domainpurchaseview');
		WTW.show('wtw_domaindetailsdiv');
		WTW.getAsyncJSON('/connect/webdomain.php?webdomainid=' + zwebdomainid, 
			function(zresponse) {
				var zforcehttps = '';
				var zdomainname = '';
				var zstartdate = '';
				var zexpiredate = '';
				var zhostprice = '';
				var zsslprice = '';
				var zhostdays = '';
				var zallowhosting = '0';
				
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							if (zresponse[i].webdomainid != undefined) {
								zforcehttps = zresponse[i].forcehttps;
								zdomainname = zresponse[i].domainname;
								zstartdate = WTW.formatDate(zresponse[i].startdate);
								zexpiredate = WTW.formatDate(zresponse[i].expiredate);
								zhostprice = WTW.formatMoney(zresponse[i].hostprice);
								zsslprice = WTW.formatMoney(zresponse[i].sslprice);
								zhostdays = WTW.formatNumber(zresponse[i].hostdays,0);
								if (zresponse[i].allowhosting == '1') {
									zallowhosting = '1';
								}
							}
						}
					}
				}
				if (zforcehttps == '1') {
					dGet('wtw_domainforcehttps').selectedIndex = 0;
				} else {
					dGet('wtw_domainforcehttps').selectedIndex = 1;
				}
				dGet('wtw_twebdomainid').value = zwebdomainid;
				
				dGet('wtw_twebdomain').value = zdomainname;
				dGet('wtw_domainstartdate').value = zstartdate;
				dGet('wtw_domainexpiredate').value = zexpiredate;
				dGet('wtw_domainhostprice').value = zhostprice;
				dGet('wtw_domainsslprice').value = zsslprice;
				dGet('wtw_domainhostdays').value = zhostdays;
				if (zallowhosting == '1') {
					dGet('wtw_tallowhostingyes').checked = true;
				} else {
					dGet('wtw_tallowhostingno').checked = true;
				}
				if (WTW.isUserInRole('host')) {
					dGet('wtw_domainstartdate').disabled = true;
					dGet('wtw_domainexpiredate').disabled = true;
					dGet('wtw_domainhostprice').disabled = true;
					dGet('wtw_domainsslprice').disabled = true;
					dGet('wtw_domainhostdays').disabled = true;
				}
				WTW.show('wtw_bdomaindelete');
				dGet('wtw_twebdomain').focus();
				if (WTW.isUserInRole('host') && dGet('wtw_twebdomainid').value == '') {
					dGet('wtw_bdomainsave').innerHTML = 'Purchase Web Domain Hosting';
				} else {
					dGet('wtw_bdomainsave').innerHTML = 'Save Web Domain';
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-editWebDomain=' + ex.message);
	}
}

WTWJS.prototype.saveDomainForm = async function(w) {
	/* save web domain */
	try {
		var zwebdomainid = dGet('wtw_twebdomainid').value;
		dGet('wtw_domainstartdate').disabled = false;
		dGet('wtw_domainexpiredate').disabled = false;
		dGet('wtw_domainhostprice').disabled = false;
		dGet('wtw_domainsslprice').disabled = false;
		dGet('wtw_domainhostdays').disabled = false;
		switch (w) {
			case 1: /* save */
				var zdomainname = dGet('wtw_twebdomain').value;
				var zstartdate = WTW.formatDate(dGet('wtw_domainstartdate').value);
				var zexpiredate = WTW.formatDate(dGet('wtw_domainexpiredate').value);
				var zhostprice = WTW.formatMoney(dGet('wtw_domainhostprice').value);
				var zsslprice = WTW.formatMoney(dGet('wtw_domainsslprice').value);
				var zhostdays = WTW.formatNumber(dGet('wtw_domainhostdays').value);
				var zforcehttps = WTW.getDDLText('wtw_domainforcehttps');
				var zinvoicetotal = Number(dGet('wtw_domainhostprice').value.replace('$','').replace(' ',''));
				var zallowhosting = '0';
				if (zforcehttps == 'https://') {
					zforcehttps = '1';
					zinvoicetotal += Number(dGet('wtw_domainsslprice').value.replace('$','').replace(' ',''));
				} else {
					zforcehttps = '0';
				}
				if (dGet('wtw_tallowhostingyes').checked) {
					zallowhosting = '1';
				}
				if (zdomainname.length < 6) {
					dGet('wtw_twebdomain').style.color = 'red';
					dGet('wtw_twebdomain').style.borderColor = 'red';
				} else {
					if (WTW.isUserInRole('host')) {
						var zinvoiceid = WTW.getRandomString(16);
						var zinvoicedescription = 'Purchase 3D Web Hosting for ' + zdomainname;
						var zrequest = {
							'invoiceid': zinvoiceid,
							'domainname': zdomainname,
							'email': dGet('wtw_tuseremail').value,
							'invoicedescription': zinvoicedescription,
							'invoicetotal': zinvoicetotal,
							'function':'saveinvoice'
						};
						WTW.postAsyncJSON('/core/handlers/invoices.php', zrequest, 
							function(zresponse) {
								zresponse = JSON.parse(zresponse);
								/* note serror would contain errors */
								WTW.pluginsSaveDomainForm(w, zinvoiceid, zdomainname, zinvoicedescription, zinvoicetotal);
								var zinvoicedetailid = WTW.getRandomString(16);
								var zsortorder = 0;
								var zrequest1 = {
									'invoicedetailid': zinvoicedetailid,
									'invoiceid': zinvoiceid,
									'sortorder': zsortorder,
									'quantity': 1,
									'description': WTW.formatNumber(zhostdays,0) + ' days 3D Web Hosting of Your Domain Name',
									'price': zhostprice,
									'function':'saveinvoicedetail'
								};
								WTW.postAsyncJSON('/core/handlers/invoices.php', zrequest1, 
									function(zresponse1) {
										zresponse1 = JSON.parse(zresponse1);
										/* note serror would contain errors */
										
									}
								);
								if (dGet('wtw_domainpurchasesslqty').innerHTML == '1') {
									var zinvoicedetailid2 = WTW.getRandomString(16);
									var zsortorder2 = 1;
									var zrequest2 = {
										'invoicedetailid': zinvoicedetailid2,
										'invoiceid': zinvoiceid,
										'sortorder': zsortorder2,
										'quantity': 1,
										'description': WTW.formatNumber(zhostdays,0) + ' days - SSL Certficate (https)',
										'price': zsslprice,
										'function':'saveinvoicedetail'
									};
									WTW.postAsyncJSON('/core/handlers/invoices.php', zrequest2, 
										function(zresponse2) {
											zresponse2 = JSON.parse(zresponse2);
											/* note serror would contain errors */
										}
									);
								}
							}
						);
						/* after approved payment */
						if (zexpiredate == '' && zstartdate != '') {
							zexpiredate = WTW.addDays(zstartdate,zhostdays);
						}
						var zrequest4 = {
							'webdomainid': zwebdomainid,
							'domainname': zdomainname,
							'startdate': zstartdate,
							'expiredate': zexpiredate,
							'allowhosting': zallowhosting,
							'hostprice': zhostprice,
							'sslprice': zsslprice,
							'hostdays': zhostdays,
							'forcehttps': zforcehttps,
							'function':'savewebdomain'
						};
						WTW.postAsyncJSON('/core/handlers/uploads.php', zrequest4, 
							function(zresponse4) {
								zresponse4 = JSON.parse(zresponse4);
								/* note serror would contain errors */
								dGet('wtw_domainforcehttps').selectedIndex = 0;
								dGet('wtw_twebdomainid').value = '';
								dGet('wtw_twebdomain').value = '';
								dGet('wtw_domainstartdate').value = '';
								dGet('wtw_domainexpiredate').value = '';
								dGet('wtw_domainhostprice').value = '';
								dGet('wtw_domainsslprice').value = '';
								dGet('wtw_domainhostdays').value = '';
								dGet('wtw_tallowhostingyes').checked = false;
								dGet('wtw_tallowhostingno').checked = false;
								WTW.hide('wtw_addwebdomaindiv');
								WTW.show('wtw_addwebdomain');
								WTW.hide('wtw_domainpurchaseview');
								WTW.show('wtw_domaindetailsdiv');
								WTW.openWebDomainsSettings();
							}
						);
					} else {
						var zrequest = {
							'webdomainid': zwebdomainid,
							'domainname': zdomainname,
							'startdate': zstartdate,
							'expiredate': zexpiredate,
							'allowhosting': zallowhosting,
							'hostprice': zhostprice,
							'sslprice': zsslprice,
							'hostdays': zhostdays,
							'forcehttps': zforcehttps,
							'function':'savewebdomain'
						};
						WTW.postAsyncJSON('/core/handlers/uploads.php', zrequest, 
							function(zresponse) {
								zresponse = JSON.parse(zresponse);
								/* note serror would contain errors */
								dGet('wtw_domainforcehttps').selectedIndex = 0;
								dGet('wtw_twebdomainid').value = '';
								dGet('wtw_twebdomain').value = '';
								dGet('wtw_domainstartdate').value = '';
								dGet('wtw_domainexpiredate').value = '';
								dGet('wtw_domainhostprice').value = '';
								dGet('wtw_domainsslprice').value = '';
								dGet('wtw_domainhostdays').value = '';
								dGet('wtw_tallowhostingyes').checked = false;
								dGet('wtw_tallowhostingno').checked = false;
								WTW.hide('wtw_addwebdomaindiv');
								WTW.show('wtw_addwebdomain');
								WTW.hide('wtw_domainpurchaseview');
								WTW.show('wtw_domaindetailsdiv');
								WTW.openWebDomainsSettings();
							}
						);
					}
				}
				break;
			case -1: /* cancel */
				dGet('wtw_domainforcehttps').selectedIndex = 0;
				dGet('wtw_twebdomainid').value = '';
				dGet('wtw_twebdomain').value = '';
				dGet('wtw_domainstartdate').value = '';
				dGet('wtw_domainexpiredate').value = '';
				dGet('wtw_domainhostprice').value = '';
				dGet('wtw_domainsslprice').value = '';
				dGet('wtw_domainhostdays').value = '';
				dGet('wtw_tallowhostingyes').checked = false;
				dGet('wtw_tallowhostingno').checked = false;
				WTW.hide('wtw_addwebdomaindiv');
				WTW.show('wtw_addwebdomain');
				WTW.hide('wtw_domainpurchaseview');
				WTW.show('wtw_domaindetailsdiv');
				WTW.pluginsSaveDomainForm(w, '');
				break;
			case 0: /* delete */
				var zrequest = {
					'webdomainid': zwebdomainid,
					'function':'deletewebdomain'
				};
				WTW.postAsyncJSON('/core/handlers/uploads.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						dGet('wtw_domainforcehttps').selectedIndex = 0;
						dGet('wtw_twebdomainid').value = '';
						dGet('wtw_twebdomain').value = '';
						dGet('wtw_domainstartdate').value = '';
						dGet('wtw_domainexpiredate').value = '';
						dGet('wtw_domainhostprice').value = '';
						dGet('wtw_domainsslprice').value = '';
						dGet('wtw_domainhostdays').value = '';
						dGet('wtw_tallowhostingyes').checked = false;
						dGet('wtw_tallowhostingno').checked = false;
						WTW.hide('wtw_addwebdomaindiv');
						WTW.show('wtw_addwebdomain');
						WTW.hide('wtw_domainpurchaseview');
						WTW.show('wtw_domaindetailsdiv');
						WTW.pluginsSaveDomainForm(w, '');
						WTW.openWebDomainsSettings();
					}
				);
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-saveDomainForm=' + ex.message);
	}
}

/* web aliases - mapping urls to 3D Communities, 3D Buildings, and 3D Things */

WTWJS.prototype.openWebAliasSettings = async function() {
	/* open web aliases page form */
	try {
		WTW.hide('wtw_serversettings');
		WTW.show('wtw_loadingwebalias');
		WTW.show('wtw_settingspage');
		WTW.show('wtw_webaliassettings');
		dGet('wtw_webaliaslist').innerHTML = '';
		WTW.getAsyncJSON('/connect/webaliases.php', 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					var zwebaliaslist = "<table class='wtw-table'><tr>\r\n";
					zwebaliaslist += "<td class='wtw-tablecolumnheading'><b>Preview</b></td>\r\n";
					zwebaliaslist += "<td class='wtw-tablecolumnheading'><b>Web URL</b></td>\r\n";
					zwebaliaslist += "<td class='wtw-tablecolumnheading'><b>3D Website Name</b></td>\r\n";
					zwebaliaslist += "<td class='wtw-tablecolumnheading'><b>Description</b></td>\r\n";
					zwebaliaslist += "<td class='wtw-tablecolumnheading' style='text-align:center;'><b>Franchise</b></td>\r\n";
					zwebaliaslist += "<td class='wtw-tablecolumnheading'><b>&nbsp;</b></td></tr>\r\n";
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							if (zresponse[i].webaliasid != undefined) {
								var zforcehttps = zresponse[i].forcehttps;
								var zdomainname = zresponse[i].domainname;
								var zcommunityid = zresponse[i].communityid;
								var zbuildingid = zresponse[i].buildingid;
								var zthingid = zresponse[i].thingid;
								var zcommunitypub = zresponse[i].communitypublishname;
								var zbuildingpub = zresponse[i].buildingpublishname;
								var zthingpub = zresponse[i].thingpublishname;
								var zcommunityname = '';
								var zbuildingname = '';
								var zthingname = '';
								var zcommunitysnapshoturl = '';
								var zbuildingsnapshoturl = '';
								var zthingsnapshoturl = '';
								var zfranchise = 'No';
								var zsitename = '';
								var zsitedescription = '';
								var zsiteiconid = '';
								var zsiteiconpath = '';
								var zsitesnapshot = '';
								var zurl = 'http://' + zdomainname;
								if (zforcehttps == '1' || zforcehttps == 1) {
									zurl = 'https://' + zdomainname;
								}
								if (zresponse[i].communityname != null) {
									zcommunityname = zresponse[i].communityname;
								}
								if (zresponse[i].buildingname != null) {
									zbuildingname = zresponse[i].buildingname;
								}
								if (zresponse[i].thingname != null) {
									zthingname = zresponse[i].thingname;
								}
								if (zresponse[i].sitename != null) {
									zsitename = zresponse[i].sitename;
								}
								if (zresponse[i].sitedescription != null) {
									zsitedescription = zresponse[i].sitedescription;
								}
								if (zresponse[i].siteiconid != null) {
									zsiteiconid = zresponse[i].siteiconid;
								}
								if (zresponse[i].siteiconpath != null) {
									zsiteiconpath = zresponse[i].siteiconpath;
								}
								if (zsiteiconpath == '') {
									zsiteiconpath = '/favicon.ico';
								}
								if (zresponse[i].communitysnapshoturl != null) {
									zcommunitysnapshoturl = zresponse[i].communitysnapshoturl;
								}
								if (zresponse[i].buildingsnapshoturl != null) {
									zbuildingsnapshoturl = zresponse[i].buildingsnapshoturl;
								}
								if (zresponse[i].thingsnapshoturl != null) {
									zthingsnapshoturl = zresponse[i].thingsnapshoturl;
								}
								if (zresponse[i].franchise != null) {
									if (zresponse[i].franchise == '1') {
										zfranchise = 'Yes';
									}
								}
								if (zcommunityname != '') {
									zfranchise = '';
								}
								if (zcommunitypub != '') {
									zurl += '/' + zcommunitypub;
									if (zbuildingpub != '') {
										zurl += '/' + zbuildingpub;
										if (zthingpub != '') {
											zurl += '/' + zthingpub;
										}
									} else if (zthingpub != '') {
										zurl += '/things/' + zthingpub;
									}
								} else if (zbuildingpub != '') {
									zurl += '/buildings/' + zbuildingpub;
									if (zthingpub != '') {
										zurl += '/' + zthingpub;
									}
								} else if (zthingpub != '') {
									zurl += '/things/' + zthingpub;
								}
								if (zcommunityid != '' && zcommunitysnapshoturl != '') {
									zsitesnapshot = zcommunitysnapshoturl;
								} else if (zbuildingid != '' && zbuildingsnapshoturl != '') {
									zsitesnapshot = zbuildingsnapshoturl;
								} else if (zthingid != '' && zthingsnapshoturl != '') {
									zsitesnapshot = zthingsnapshoturl;
								}
								if (zsitesnapshot != '') {
									zsitesnapshot = "<img src='" + zsitesnapshot + "' class='wtw-smallimage' />";
								}
								if (zsitename == '' && zcommunityname != '') {
									zsitename = zcommunityname;
								} else if (zsitename == '' && zbuildingname != '') {
									zsitename = zbuildingname;
								} else if (zsitename == '' && zthingname != '') {
									zsitename = zthingname;
								} else if (zsitename == '') {
									zsitename = 'WalkTheWeb 3D Website';
								}
								zwebaliaslist += "<tr><td class='wtw-tablecolumns'>" + zsitesnapshot + "</td>\r\n";
								zwebaliaslist += "<td class='wtw-tablecolumns'><img src='" + zsiteiconpath + "' class='wtw-tinyimage' /> <a href='" + zurl + "' target='_blank'>" + zurl + "</a></td>\r\n";
								zwebaliaslist += "<td class='wtw-tablecolumns'>" + zsitename + "</td>\r\n";
								zwebaliaslist += "<td class='wtw-tablecolumns'>" + zsitedescription + "</td>\r\n";
								zwebaliaslist += "<td class='wtw-tablecolumns' style='text-align:center;'>" + zfranchise + "</td>\r\n";
								zwebaliaslist += "<td class='wtw-tablecolumns'><div class='wtw-bluebuttonright' onclick=\"WTW.editWebAlias('" + zresponse[i].webaliasid + "');\">Edit</div></td></tr>";
							}
						}
					}
					zwebaliaslist += '</table>'
					dGet('wtw_webaliaslist').innerHTML = zwebaliaslist;
					WTW.hide('wtw_loadingwebalias');
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-openWebAliasSettings=' + ex.message);
	}
}

WTWJS.prototype.editWebAlias = async function(zwebaliasid) {
	/* load to edit a web alias */
	try {
		WTW.openAliasForm();
		WTW.getAsyncJSON('/connect/webalias.php?webaliasid=' + zwebaliasid, 
			function(zresponse) {
				var zcommunityid = '';
				var zbuildingid = '';
				var zthingid = '';
				var zforcehttps = '';
				var zdomainname = '';
				var zcommunitypub = '';
				var zbuildingpub = '';
				var zthingpub = '';
				var zfranchise = '0';
				var zfranchiseid = '';
				var zaliaspreviewurl = '';
				var zcommunityname = '';
				var zbuildingname = '';
				var zthingname = '';
				var zsitename = '';
				var zsitedescription = '';
				var zsiteiconid = '';
				var zsiteiconpath = '';
				var zchangepreview = '/admin.php?hmenu=69';
				
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
								zfranchise = zresponse[i].franchise;
								zfranchiseid = zresponse[i].franchiseid;
								zcommunityname = zresponse[i].communityname;
								zbuildingname = zresponse[i].buildingname;
								zthingname = zresponse[i].thingname;
								zsitename = zresponse[i].sitename;
								zsitedescription = zresponse[i].sitedescription;
								zsiteiconid = zresponse[i].siteiconid;
								zsiteiconpath = zresponse[i].siteiconpath;
								if (zresponse[i].communitysnapshoturl != '') {
									zaliaspreviewurl = zresponse[i].communitysnapshoturl;
								} else if (zresponse[i].buildingsnapshoturl != '') {
									zaliaspreviewurl = zresponse[i].buildingsnapshoturl;
								} else if (zresponse[i].thingsnapshoturl != '') {
									zaliaspreviewurl = zresponse[i].thingsnapshoturl;
								}
							}
						}
					}
				}
				var zpathtype = -1;
				if (zcommunityid != '') {
					if (zbuildingid != '') {
						if (zthingid != '') {
							zpathtype = 5;
						} else {
							zpathtype = 3;
						}
					} else {
						if (zthingid != '') {
							zpathtype = 4;
						} else {
							if (zcommunitypub != '') {
								zpathtype = 2;
							} else {
								zpathtype = 1;
							}
						}
					}
					zchangepreview += '&communityid=' + zcommunityid;
				} else {
					if (zbuildingid != '') {
						if (zthingid != '') {
							zpathtype = 7;
						} else {
							zpathtype = 6;
						}
						zchangepreview += '&buildingid=' + zbuildingid;
					} else {
						if (zthingid != '') {
							zpathtype = 8;
						} else {
							zpathtype = 1;
						}
						zchangepreview += '&thingid=' + zthingid;
					}
				}
				WTW.setDDLValue('wtw_taliaspathtype', zpathtype);
				WTW.setAliasForm();
				if (zcommunityid != '') {
					WTW.setAliasCommunities(zcommunityid);
					if (zsitename == '') {
						zsitename = zcommunityname;
					} 
				}
				if (zbuildingid != '') {
					WTW.setAliasBuildings(zbuildingid);
					if (zsitename == '') {
						zsitename = zbuildingname;
					} 
				}
				if (zthingid != '') {
					WTW.setAliasThings(zthingid);
					if (zsitename == '') {
						zsitename = zthingname;
					} 
				}
				if (zsitedescription == '') {
					zsitedescription = 'WalkTheWeb: Internationally Patented 3D Internet Browsing and 3D Website hosting. WalkTheWeb (R), http://3d (TM), https://3d (TM), and HTTP3D (TM).';
				}
				dGet('wtw_aliassitename').value = zsitename;
				dGet('wtw_aliassitedescription').value = zsitedescription;
				dGet('wtw_taliassiteiconid').value = zsiteiconid;
				if (zsiteiconpath != '') {
					dGet('wtw_taliassiteiconpath').value = zsiteiconpath;
					dGet('wtw_aliassiteicon').src = zsiteiconpath;
				}
				if (zforcehttps == '1') {
					dGet('wtw_aliasforcehttps').selectedIndex = 0;
				} else {
					dGet('wtw_aliasforcehttps').selectedIndex = 1;
				}
				dGet('wtw_twebaliasid').value = zwebaliasid;
				WTW.loadWebDomainsForAliases(zdomainname);
				if (zcommunitypub != '') {
					dGet('wtw_taliascommunitypublishname').value = zcommunitypub;
				}
				if (zbuildingpub != '') {
					dGet('wtw_taliasbuildingpublishname').value = zbuildingpub;
				}
				if (zthingpub != '') {
					dGet('wtw_taliasthingpublishname').value = zthingpub;
				}
				if (zfranchise == '1') {
					dGet('wtw_aliasfranchise').checked = true;
				} else {
					dGet('wtw_aliasfranchise').checked = false;
				}
				WTW.changeFranchiseSwitch();
				if (zaliaspreviewurl != '') {
					dGet('wtw_aliaspreview').src = zaliaspreviewurl;
					WTW.show('wtw_aliaspreview');
				}
				dGet('wtw_aliaspreviewchange').href = zchangepreview;
				WTW.show('wtw_baliasdelete');
				dGet('wtw_taliaspathtype').focus();
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-editWebAlias=' + ex.message);
	}
}

WTWJS.prototype.changeFranchiseSwitch = async function() {
	/* change franchise switch on add webalias form */
	try {
		if (dGet('wtw_aliasfranchise').checked) {
			dGet('wtw_aliasfranchisetext').innerHTML = 'This 3D Website is Franchised.';
			dGet('wtw_aliasfranchisetext').className = 'wtw-enablelabel';
		} else {
			dGet('wtw_aliasfranchisetext').innerHTML = 'This 3D Website is not Franchised.';
			dGet('wtw_aliasfranchisetext').className = 'wtw-disabledlabel';
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-changeFranchiseSwitch=' + ex.message);
	}
}

WTWJS.prototype.updateAliasSnapshot = async function(zobj) {
	/* update the Web Alias snapshot on the form */
	try {
		var zwebtype = 'community';
		var zwebid = '';
		var zpreviewchange = '/admin.php?hmenu=69';
		var zdomaincommunityid = WTW.getDDLValue('wtw_aliasdomaincommunityid');
		var zcommunityid = WTW.getDDLValue('wtw_aliascommunityid');
		var zbuildingid = WTW.getDDLValue('wtw_aliasbuildingid');
		var zthingid = WTW.getDDLValue('wtw_aliasthingid');
		if (zobj != undefined) {
			/* sync domain community and community drop down lists */
			if (zobj.id == 'wtw_aliascommunityid') {
				zdomaincommunityid = zcommunityid;
				dGet('wtw_aliasdomaincommunityid').onchange = function(){};
				WTW.setDDLValue('wtw_aliasdomaincommunityid', zcommunityid);
				dGet('wtw_aliasdomaincommunityid').onchange = function(){
					WTW.updateAliasSnapshot(dGet('wtw_aliasdomaincommunityid'));
				};
			} else if (zobj.id == 'wtw_aliasdomaincommunityid') {
				zcommunityid = zdomaincommunityid;
				dGet('wtw_aliascommunityid').onchange = function(){};
				WTW.setDDLValue('wtw_aliascommunityid', zdomaincommunityid);
				dGet('wtw_aliascommunityid').onchange = function(){
					WTW.updateAliasSnapshot(dGet('wtw_aliascommunityid'));
				};
			}
		}
		var zsnapshotpath = '';
		if (zdomaincommunityid != '' && zbuildingid == '' && zthingid == '') {
			zwebid = zdomaincommunityid;
			zpreviewchange += '&communityid=' + zdomaincommunityid;
		} else if (zcommunityid != '') {
			zwebid = zcommunityid;
			zpreviewchange += '&communityid=' + zcommunityid;
		} else if (zbuildingid != '') {
			zwebid = zbuildingid;
			zwebtype = 'building';
			zpreviewchange += '&buildingid=' + zbuildingid;
		} else if (zthingid != '') {
			zwebid = zthingid;
			zwebtype = 'thing';
			zpreviewchange += '&thingid=' + zthingid;
		}
		WTW.getAsyncJSON('/connect/' + zwebtype + '.php?' + zwebtype + 'id=' + zwebid, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					if (zwebtype == 'community') {
						zresponse = zresponse.communities;
					}
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							switch (zwebtype) {
								case 'community':
									if (zresponse[i].communityinfo != undefined) {
										if (zresponse[i].communityinfo.snapshotpath != undefined) {
											zsnapshotpath = zresponse[i].communityinfo.snapshotpath;
										}
									}
									break;
								case 'building':
									if (zresponse[i].buildinginfo != undefined) {
										if (zresponse[i].buildinginfo.snapshotpath != undefined) {
											zsnapshotpath = zresponse[i].buildinginfo.snapshotpath;
										}
									}
									break;
								case 'thing':
									if (zresponse[i].thinginfo != undefined) {
										if (zresponse[i].thinginfo.snapshotpath != undefined) {
											zsnapshotpath = zresponse[i].thinginfo.snapshotpath;
										}
									}
									break;
							}
						}
					}
					dGet('wtw_aliaspreview').src = zsnapshotpath;
					dGet('wtw_aliaspreviewchange').href = zpreviewchange;
					if (zsnapshotpath != '') {
						WTW.show('wtw_aliaspreview');
					} else {
						WTW.hide('wtw_aliaspreview');
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-updateAliasSnapshot=' + ex.message);
	}
}

WTWJS.prototype.loadWebDomainsForAliases = async function(zselecteddomainname) {
	/* drop down list for selecting domain name on Web Alias form */
	try {
		WTW.clearDDL('wtw_taliasdomainname');
		WTW.getAsyncJSON('/connect/webdomains.php', 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							if (zresponse[i].webdomainid != undefined) {
								var zdomainname = zresponse[i].domainname;
								var zoption = document.createElement('option');
								zoption.text = zdomainname;
								zoption.value = zdomainname;
								if (zselecteddomainname.toLowerCase() == zdomainname.toLowerCase()) {
									zoption.selected = true;
								}
								dGet('wtw_taliasdomainname').add(zoption);
							}
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-loadWebDomainsForAliases=' + ex.message);
	}
}

WTWJS.prototype.setAliasCommunities = async function(zcommunityid) {
	/* drop down list of 3D Communities to select a 3D Community to map */
	try {
		if (zcommunityid == undefined) {
			zcommunityid = '';
		}
		var zpathtype = WTW.getDDLValue('wtw_taliaspathtype');
		WTW.clearDDL('wtw_aliasdomaincommunityid');
		WTW.clearDDL('wtw_aliascommunityid');
		WTW.getAsyncJSON('/connect/communitynames.php', 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							if (zresponse[i].communityid != undefined && zresponse[i].communityname != undefined) {
								var zoption = document.createElement('option');
								var zoption2 = document.createElement('option');
								zoption.text = zresponse[i].communityname;
								zoption2.text = zresponse[i].communityname;
								zoption.value = zresponse[i].communityid;
								zoption2.value = zresponse[i].communityid;
								if (i == 0 && zcommunityid == '') {
									zoption.selected = true;
									zoption2.selected = true;
								} else if (zcommunityid == zresponse[i].communityid) {
									zoption.selected = true;
									zoption2.selected = true;
								}
								dGet('wtw_aliasdomaincommunityid').add(zoption);
								dGet('wtw_aliascommunityid').add(zoption2);
							}
						}
					}
					if (Number(zpathtype) > 5) {
						dGet('wtw_aliasdomaincommunityid').selectedIndex = -1;
						dGet('wtw_aliascommunityid').selectedIndex = -1;
					} else {
						WTW.updateAliasSnapshot();
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-setAliasCommunities=' + ex.message);
	}
}

WTWJS.prototype.setAliasBuildings = async function(zbuildingid) {
	/* drop down list of 3D Buildings to select a 3D Building to map */
	try {
		if (zbuildingid == undefined) {
			zbuildingid = '';
		}
		var zpathtype = WTW.getDDLValue('wtw_taliaspathtype');
		WTW.clearDDL('wtw_aliasbuildingid');
		WTW.getAsyncJSON('/connect/buildingnames.php', 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							if (zresponse[i].buildingid != undefined && zresponse[i].buildingname != undefined) {
								var zoption = document.createElement('option');
								zoption.text = zresponse[i].buildingname;
								zoption.value = zresponse[i].buildingid;
								if (i == 0 && zbuildingid == '') {
									zoption.selected = true;
								} else if (zbuildingid == zresponse[i].buildingid) {
									zoption.selected = true;
								}
								dGet('wtw_aliasbuildingid').add(zoption);
							}
						}
					}
					if ('3567'.indexOf(zpathtype) == -1) {
						dGet('wtw_aliasbuildingid').selectedIndex = -1;
					} else {
						WTW.updateAliasSnapshot();
					}
					WTW.show('wtw_aliasfranchisediv');
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-setAliasBuildings=' + ex.message);
	}
}

WTWJS.prototype.setAliasThings = async function(zthingid) {
	/* drop down list of 3D Things to select a 3D Thing to map */
	try {
		if (zthingid == undefined) {
			zthingid = '';
		}
		var zpathtype = WTW.getDDLValue('wtw_taliaspathtype');
		WTW.clearDDL('wtw_aliasthingid');
		WTW.getAsyncJSON('/connect/thingnames.php', 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							if (zresponse[i].thingid != undefined && zresponse[i].thingname != undefined) {
								var zoption = document.createElement('option');
								zoption.text = zresponse[i].thingname;
								zoption.value = zresponse[i].thingid;
								if (i == 0 && zthingid == '') {
									zoption.selected = true;
								} else if (zthingid == zresponse[i].thingid) {
									zoption.selected = true;
								}
								dGet('wtw_aliasthingid').add(zoption);
							}
						}
					}
					if ('4578'.indexOf(zpathtype) == -1) {
						dGet('wtw_aliasthingid').selectedIndex = -1;
					} else {
						WTW.updateAliasSnapshot();
					}
					WTW.show('wtw_aliasfranchisediv');
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-setAliasThings=' + ex.message);
	}
}

WTWJS.prototype.openAliasForm = function() {
	/* open edit web alias form */
	try {
		dGet('wtw_aliaslevel1').innerHTML = 'Domain Name';
		dGet('wtw_aliaslevel1').style.visibility = 'visible';
		dGet('wtw_aliastext1').style.visibility = 'visible';
		dGet('wtw_aliasselect1').style.visibility = 'visible';
		WTW.hide('wtw_aliasfranchisediv');
		WTW.show('wtw_addwebaliasdiv');
		WTW.hide('wtw_addwebalias');
		WTW.hide('wtw_baliasdelete');
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-openAliasForm=' + ex.message);
	}
}

WTWJS.prototype.clearAliasForm = function() {
	/* clear web alias edit form */
	try {
		WTW.hide('wtw_aliaspreview');
		dGet('wtw_twebaliasid').value = '';
		WTW.loadWebDomainsForAliases(wtw_domainname);
		dGet('wtw_aliaslevel1').innerHTML = '&nbsp;';
		dGet('wtw_aliaslevel2').innerHTML = '&nbsp;';
		dGet('wtw_aliaslevel3').innerHTML = '&nbsp;';
		dGet('wtw_aliaslevel4').innerHTML = '&nbsp;';
		dGet('wtw_aliaslevel1').style.visibility = 'hidden';
		dGet('wtw_aliaslevel2').style.visibility = 'hidden';
		dGet('wtw_aliaslevel3').style.visibility = 'hidden';
		dGet('wtw_aliaslevel4').style.visibility = 'hidden';
		dGet('wtw_aliastext1').style.visibility = 'hidden';
		dGet('wtw_aliastext2').style.visibility = 'hidden';
		dGet('wtw_aliastext3').style.visibility = 'hidden';
		dGet('wtw_aliastext4').style.visibility = 'hidden';
		dGet('wtw_taliasdomainname').disabled = false;
		dGet('wtw_taliascommunitypublishname').disabled = false;
		dGet('wtw_taliasbuildingpublishname').disabled = false;
		dGet('wtw_taliasthingpublishname').disabled = false;
		dGet('wtw_taliascommunitypublishname').value = '';
		dGet('wtw_taliasbuildingpublishname').value = '';
		dGet('wtw_taliasthingpublishname').value = '';
		dGet('wtw_aliassitename').value = '';
		dGet('wtw_aliassitedescription').value = '';
		dGet('wtw_aliassiteicon').src = '/favicon.ico';
		dGet('wtw_aliasselect1').style.visibility = 'hidden';
		dGet('wtw_aliasselect2').style.visibility = 'hidden';
		dGet('wtw_aliasselect3').style.visibility = 'hidden';
		dGet('wtw_aliasselect4').style.visibility = 'hidden';
		dGet('wtw_aliasfranchise').checked = false;
		WTW.changeFranchiseSwitch();
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-clearAliasForm=' + ex.message);
	}
}

WTWJS.prototype.setAliasForm = function() {
	/* web alias form fields depend on what level to map */
	/* example: you can create a URL to a 3D Building within a 3D Community */
	/* Note that you can also map more than one domain name to the same 3D Community */
	try {
		var zpathtype = WTW.getDDLValue('wtw_taliaspathtype');
		WTW.clearAliasForm();
		WTW.hide('wtw_aliasfranchisediv');
		switch (zpathtype) {
			case '1': /* Domain Name */
				dGet('wtw_aliaslevel1').innerHTML = 'Domain Name';
				dGet('wtw_aliaslevel1').style.visibility = 'visible';
				dGet('wtw_aliastext1').style.visibility = 'visible';
				dGet('wtw_aliasselect1').style.visibility = 'visible';
				dGet('wtw_aliasbuildingid').selectedIndex = -1;
				dGet('wtw_aliasthingid').selectedIndex = -1;
				WTW.setAliasCommunities();
				break;
			case '2': /* Community */
				dGet('wtw_aliaslevel1').innerHTML = 'Domain Name';
				dGet('wtw_aliaslevel1').style.visibility = 'visible';
				dGet('wtw_aliastext1').style.visibility = 'visible';
				dGet('wtw_aliaslevel2').innerHTML = 'Community';
				dGet('wtw_aliaslevel2').style.visibility = 'visible';
				dGet('wtw_aliastext2').style.visibility = 'visible';
				dGet('wtw_aliasselect2').style.visibility = 'visible';
				dGet('wtw_aliasbuildingid').selectedIndex = -1;
				dGet('wtw_aliasthingid').selectedIndex = -1;
				WTW.setAliasCommunities();
				break;
			case '3': /* Building in Community */
				dGet('wtw_aliaslevel1').innerHTML = 'Domain Name';
				dGet('wtw_aliaslevel1').style.visibility = 'visible';
				dGet('wtw_aliastext1').style.visibility = 'visible';
				dGet('wtw_aliaslevel2').innerHTML = 'Community';
				dGet('wtw_aliaslevel2').style.visibility = 'visible';
				dGet('wtw_aliastext2').style.visibility = 'visible';
				dGet('wtw_aliasselect2').style.visibility = 'visible';
				dGet('wtw_aliaslevel3').innerHTML = 'Building';
				dGet('wtw_aliaslevel3').style.visibility = 'visible';
				dGet('wtw_aliastext3').style.visibility = 'visible';
				dGet('wtw_aliasselect3').style.visibility = 'visible';
				dGet('wtw_aliasthingid').selectedIndex = -1;
				WTW.setAliasCommunities();
				WTW.setAliasBuildings();
				break;
			case '4': /* Thing in Community */
				dGet('wtw_aliaslevel1').innerHTML = 'Domain Name';
				dGet('wtw_aliaslevel1').style.visibility = 'visible';
				dGet('wtw_aliastext1').style.visibility = 'visible';
				dGet('wtw_aliaslevel2').innerHTML = 'Community';
				dGet('wtw_aliaslevel2').style.visibility = 'visible';
				dGet('wtw_aliastext2').style.visibility = 'visible';
				dGet('wtw_aliasselect2').style.visibility = 'visible';
				dGet('wtw_aliaslevel3').innerHTML = 'Building';
				dGet('wtw_aliaslevel3').style.visibility = 'visible';
				dGet('wtw_aliastext3').style.visibility = 'visible';
				dGet('wtw_taliasbuildingpublishname').value = 'things';
				dGet('wtw_taliasbuildingpublishname').disabled = true;
				dGet('wtw_aliaslevel4').innerHTML = 'Thing';
				dGet('wtw_aliaslevel4').style.visibility = 'visible';
				dGet('wtw_aliastext4').style.visibility = 'visible';
				dGet('wtw_aliasselect4').style.visibility = 'visible';
				dGet('wtw_aliasbuildingid').selectedIndex = -1;
				WTW.setAliasCommunities();
				WTW.setAliasThings();
				break;
			case '5': /* Thing in Building in Community */
				dGet('wtw_aliaslevel1').innerHTML = 'Domain Name';
				dGet('wtw_aliaslevel1').style.visibility = 'visible';
				dGet('wtw_aliastext1').style.visibility = 'visible';
				dGet('wtw_aliaslevel2').innerHTML = 'Community';
				dGet('wtw_aliaslevel2').style.visibility = 'visible';
				dGet('wtw_aliastext2').style.visibility = 'visible';
				dGet('wtw_aliasselect2').style.visibility = 'visible';
				dGet('wtw_aliaslevel3').innerHTML = 'Building';
				dGet('wtw_aliaslevel3').style.visibility = 'visible';
				dGet('wtw_aliastext3').style.visibility = 'visible';
				dGet('wtw_aliasselect3').style.visibility = 'visible';
				dGet('wtw_aliaslevel4').innerHTML = 'Thing';
				dGet('wtw_aliaslevel4').style.visibility = 'visible';
				dGet('wtw_aliastext4').style.visibility = 'visible';
				dGet('wtw_aliasselect4').style.visibility = 'visible';
				WTW.setAliasCommunities();
				WTW.setAliasBuildings();
				WTW.setAliasThings();
				break;
			case '6': /* Building */
				dGet('wtw_aliaslevel1').innerHTML = 'Domain Name';
				dGet('wtw_aliaslevel1').style.visibility = 'visible';
				dGet('wtw_aliastext1').style.visibility = 'visible';
				dGet('wtw_aliaslevel2').innerHTML = '&nbsp;';
				dGet('wtw_aliaslevel2').style.visibility = 'visible';
				dGet('wtw_aliastext2').style.visibility = 'visible';
				dGet('wtw_taliascommunitypublishname').value = 'buildings';
				dGet('wtw_taliascommunitypublishname').disabled = true;
				dGet('wtw_aliaslevel3').innerHTML = 'Building';
				dGet('wtw_aliaslevel3').style.visibility = 'visible';
				dGet('wtw_aliastext3').style.visibility = 'visible';
				dGet('wtw_aliasselect3').style.visibility = 'visible';
				dGet('wtw_aliasdomaincommunityid').selectedIndex = -1;
				dGet('wtw_aliascommunityid').selectedIndex = -1;
				dGet('wtw_aliasthingid').selectedIndex = -1;
				WTW.setAliasBuildings();
				WTW.show('wtw_aliasfranchisediv');
				break;
			case '7': /* Thing in Building */
				dGet('wtw_aliaslevel1').innerHTML = 'Domain Name';
				dGet('wtw_aliaslevel1').style.visibility = 'visible';
				dGet('wtw_aliastext1').style.visibility = 'visible';
				dGet('wtw_aliaslevel2').innerHTML = '&nbsp;';
				dGet('wtw_aliaslevel2').style.visibility = 'visible';
				dGet('wtw_aliastext2').style.visibility = 'visible';
				dGet('wtw_taliascommunitypublishname').value = 'buildings';
				dGet('wtw_taliascommunitypublishname').disabled = true;
				dGet('wtw_aliaslevel3').innerHTML = 'Building';
				dGet('wtw_aliaslevel3').style.visibility = 'visible';
				dGet('wtw_aliastext3').style.visibility = 'visible';
				dGet('wtw_aliasselect3').style.visibility = 'visible';
				dGet('wtw_aliaslevel4').innerHTML = 'Thing';
				dGet('wtw_aliaslevel4').style.visibility = 'visible';
				dGet('wtw_aliastext4').style.visibility = 'visible';
				dGet('wtw_aliasselect4').style.visibility = 'visible';
				dGet('wtw_aliasdomaincommunityid').selectedIndex = -1;
				dGet('wtw_aliascommunityid').selectedIndex = -1;
				WTW.setAliasBuildings();
				WTW.setAliasThings();
				break;
			case '8': /* Thing */
				dGet('wtw_aliaslevel1').innerHTML = 'Domain Name';
				dGet('wtw_aliaslevel1').style.visibility = 'visible';
				dGet('wtw_aliastext1').style.visibility = 'visible';
				dGet('wtw_aliaslevel2').innerHTML = '&nbsp;';
				dGet('wtw_aliaslevel2').style.visibility = 'visible';
				dGet('wtw_aliastext2').style.visibility = 'visible';
				dGet('wtw_taliascommunitypublishname').value = 'things';
				dGet('wtw_taliascommunitypublishname').disabled = true;
				dGet('wtw_aliaslevel4').innerHTML = 'Thing';
				dGet('wtw_aliaslevel4').style.visibility = 'visible';
				dGet('wtw_aliastext4').style.visibility = 'visible';
				dGet('wtw_aliasselect4').style.visibility = 'visible';
				dGet('wtw_aliasdomaincommunityid').selectedIndex = -1;
				dGet('wtw_aliascommunityid').selectedIndex = -1;
				dGet('wtw_aliasbuildingid').selectedIndex = -1;
				WTW.setAliasThings();
				WTW.show('wtw_aliasfranchisediv');
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-setAliasForm=' + ex.message);
	}
}

WTWJS.prototype.saveAliasForm = async function(zoption) {
	/* save changes to web alias url */
	try {
		var zwebaliasid = dGet('wtw_twebaliasid').value;
		switch (zoption) {
			case 1: /* save */
				var zdomainname = WTW.getDDLValue('wtw_taliasdomainname');
				var zcommunitypublishname = dGet('wtw_taliascommunitypublishname').value;
				var zbuildingpublishname = dGet('wtw_taliasbuildingpublishname').value;
				var zthingpublishname = dGet('wtw_taliasthingpublishname').value;
				var zaliascommunityid = '';
				var zaliasbuildingid = '';
				var zaliasthingid = '';
				var zforcehttps = WTW.getDDLText('wtw_aliasforcehttps');
				var zfranchise = '0';
				var i = dGet('wtw_taliaspathtype').options[dGet('wtw_taliaspathtype').selectedIndex].value;
				if (zforcehttps == 'https://') {
					zforcehttps = '1';
				} else {
					zforcehttps = '0';
				}
				if (dGet('wtw_aliasfranchise').checked) {
					zfranchise = '1';
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
						zbuildingpublishname = '';
						zaliascommunityid = dGet('wtw_aliascommunityid').options[dGet('wtw_aliascommunityid').selectedIndex].value;
						zaliasthingid = dGet('wtw_aliasthingid').options[dGet('wtw_aliasthingid').selectedIndex].value
						break;
					case '5': /* Thing in Building in Community */
						zaliascommunityid = dGet('wtw_aliascommunityid').options[dGet('wtw_aliascommunityid').selectedIndex].value;
						zaliasbuildingid = dGet('wtw_aliasbuildingid').options[dGet('wtw_aliasbuildingid').selectedIndex].value;
						zaliasthingid = dGet('wtw_aliasthingid').options[dGet('wtw_aliasthingid').selectedIndex].value
						break;
					case '6': /* Building */
						zcommunitypublishname = '';
						zaliasbuildingid = dGet('wtw_aliasbuildingid').options[dGet('wtw_aliasbuildingid').selectedIndex].value;
						break;
					case '7': /* Thing in Building */
						zcommunitypublishname = '';
						zaliasbuildingid = dGet('wtw_aliasbuildingid').options[dGet('wtw_aliasbuildingid').selectedIndex].value;
						zaliasthingid = dGet('wtw_aliasthingid').options[dGet('wtw_aliasthingid').selectedIndex].value
						break;
					case '8': /* Thing */
						zcommunitypublishname = '';
						zbuildingpublishname = '';
						zaliasthingid = dGet('wtw_aliasthingid').options[dGet('wtw_aliasthingid').selectedIndex].value
						break;
				}
				var zrequest = {
					'webaliasid': zwebaliasid,
					'domainname': zdomainname,
					'instanceid': dGet('wtw_tinstanceid').value,
					'communitypublishname': zcommunitypublishname,
					'buildingpublishname': zbuildingpublishname,
					'thingpublishname': zthingpublishname,
					'communityid': zaliascommunityid,
					'buildingid': zaliasbuildingid,
					'thingid': zaliasthingid,
					'forcehttps': zforcehttps,
					'franchise': zfranchise,
					'sitename': dGet('wtw_aliassitename').value,
					'sitedescription': dGet('wtw_aliassitedescription').value,
					'siteiconid': dGet('wtw_taliassiteiconid').value,
					'function':'savewebalias'
				};
				WTW.postAsyncJSON('/core/handlers/uploads.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						var zhostuserid = '';
						var zwebalias = '';
						var zfoundfranchiseid = '';
						var zsiteiconpath = '';
						var zsitepreview = '';
						if (zresponse.hostuserid != undefined) {
							if (zresponse.hostuserid != '') {
								zhostuserid = zresponse.hostuserid;
							}
						}
						if (zresponse.webalias != undefined) {
							if (zresponse.webalias != '') {
								zwebalias = zresponse.webalias;
							}
						}
						if (zresponse.foundfranchiseid != undefined) {
							if (zresponse.foundfranchiseid != '') {
								zfoundfranchiseid = zresponse.foundfranchiseid;
							}
						}
						if (zresponse.siteiconpath != undefined) {
							if (zresponse.siteiconpath != '') {
								zsiteiconpath = zresponse.siteiconpath;
							}
						}
						if (zresponse.sitepreview != undefined) {
							if (zresponse.sitepreview != '') {
								zsitepreview = zresponse.sitepreview;
							}
						}
						
						WTW.pluginsSaveAliasForm(zoption, zhostuserid, zwebaliasid, zdomainname, zforcehttps, zwebalias, zaliascommunityid, zaliasbuildingid, zaliasthingid, zcommunitypublishname, zbuildingpublishname, zthingpublishname, zfoundfranchiseid, zfranchise, zsiteiconpath, zsitepreview);
						
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
				WTW.postAsyncJSON('/core/handlers/uploads.php', zrequest, 
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-saveAliasForm=' + ex.message);
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
		dGet('wtw_apikeyslist').innerHTML = '';
		var zrequest = {
			'deleted':zdeleted,
			'function':'getapikeys'
		};
		WTW.postAsyncJSON('/core/handlers/api.php', zrequest,
			function(zresponse) {
				if (zresponse != null) {
					zresponse = JSON.parse(zresponse);
					/* send JSON results to be formated on the form */
					WTW.displayAPIKeys(zresponse, zdeleted);
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-openAPIKeys=' + ex.message);
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
			var zapikeyslist = "";
			if (zresponse.apikeys != undefined) {
				if (zresponse.apikeys.length > 0) {
					zapikeyslist = "<table class='wtw-table'><tr><td class='wtw-tablecolumnheading'><b>App URL</b></td><td class='wtw-tablecolumnheading'><b>App Name</b></td><td class='wtw-tablecolumnheading'><b>WalkTheWeb Key</b></td><td class='wtw-tablecolumnheading'><b>Approved</b></td><td class='wtw-tablecolumnheading'><b>Date</b></td><td class='wtw-tablecolumnheading'><b>&nbsp;</b></td></tr>";
					for (var i=0;i<zresponse.apikeys.length;i++) {
						if (zresponse.apikeys[i] != null) {
							if (zresponse.apikeys[i].appurl != undefined) {
								var zapprovetext = '';
								if (zresponse.apikeys[i].approved == '1') {
									zapprovetext = WTW.formatDate(zresponse.apikeys[i].approveddate);
								} else if (zresponse.apikeys[i].approveddate != null) {
									zapprovetext = "<span style='red'>Denied</span>";
								}
								zapikeyslist += "<tr><td class='wtw-tablecolumns'><a href='" + zresponse.apikeys[i].appurl + "' target='_blank'>" + zresponse.apikeys[i].appurl + "</a></td><td class='wtw-tablecolumns'>" + zresponse.apikeys[i].appname + "</td><td class='wtw-tablecolumns'>" + zresponse.apikeys[i].wtwkey + "</td><td class='wtw-tablecolumns'>" + zapprovetext + "</td><td class='wtw-tablecolumns'>" + WTW.formatDate(zresponse.apikeys[i].createdate) + "</td>";
								if (zresponse.apikeys[i].approveddate != null) {
									zapikeyslist += "<td class='wtw-tablecolumns'><div class='wtw-bluebuttonright' onclick=\"WTW.openAPIKeyForm('" + zresponse.apikeys[i].apikeyid + "');\">Edit</div></td>";
								} else {
									zapikeyslist += "<td class='wtw-tablecolumns'><div class='wtw-redbuttonright' onclick=\"WTW.approveAPIKey('" + zresponse.apikeys[i].apikeyid + "','0');\">Deny</div><div class='wtw-greenbuttonright' onclick=\"WTW.approveAPIKey('" + zresponse.apikeys[i].apikeyid + "','1');\">Approve</div></td>";
								}
								zapikeyslist += "</tr>";
							}
						}
					}
					zapikeyslist += "</table>";
				}
			}
			if (zapikeyslist == '') {
				zapikeyslist = "<div style='margin:10px;'>No API Keys have been added.</div>";
			}
			dGet('wtw_apikeyslist').innerHTML = zapikeyslist;
			WTW.hide('wtw_loadingapikeys');
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-displayAPIKeys=' + ex.message);
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
		WTW.postAsyncJSON('/core/handlers/api.php', zrequest,
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-approveAPIKey=' + ex.message);
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
			dGet('wtw_tapikeyid').value = '';
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
			dGet('wtw_tapikeyid').value = zapikeyid;
			dGet('wtw_tapiwtwsecret').type = 'password';
			WTW.hide('wtw_apicopynote');

			var zrequest = {
				'apikeyid':btoa(zapikeyid),
				'function':'getapikey'
			};
			WTW.postAsyncJSON('/core/handlers/api.php', zrequest,
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-openAPIKeyForm=' + ex.message);
	}
}

WTWJS.prototype.clearAPIKeyForm = function() {
	/* clear API Key edit form */
	try {
		dGet('wtw_tapikeyid').value = '';
		dGet('wtw_tapiappid').value = '';
		dGet('wtw_tapiappurl').value = '';
		dGet('wtw_tapiwtwkey').value = '';
		dGet('wtw_tapiwtwsecret').value = '';
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-clearAPIKeyForm=' + ex.message);
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-newAPIKey=' + ex.message);
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
				WTW.postAsyncJSON('/core/handlers/api.php', zrequest, 
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
				WTW.postAsyncJSON('/core/handlers/api.php', zrequest, 
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-saveAPIKeyForm=' + ex.message);
	}
}

/* Optional Upgrades Admin */

WTWJS.prototype.openOptionalUpgrades = async function() {
	/* open Optional Upgrades page form */
	try {
		WTW.show('wtw_optionalpage');
		WTW.show('wtw_loadingoptional');
		dGet('wtw_optionaltitle').innerHTML = 'Optional Upgrades';
		dGet('wtw_optionalnote').innerHTML = '<b>Optional Upgrades</b> are additional services or features that may require a payment to unlock. Note that some are subscriptions while others are one-time fees.<br />';
		dGet('wtw_optionallist').innerHTML = '';
		var zrequest = {
			'function':'getoptionalupdates'
		};
		WTW.postAsyncJSON('/core/handlers/invoices.php', zrequest,
			function(zresponse) {
				if (zresponse != null) {
					zresponse = JSON.parse(zresponse);
					/* send JSON results to be formated on the form */
					var zoptionallist = "<table class='wtw-table'><tr><td class='wtw-tablecolumnheading'><b>Title ID</b></td>\r\n";
					zoptionallist += "<td class='wtw-tablecolumnheading'><b>Description</b></td>\r\n";
					zoptionallist += "<td class='wtw-tablecolumnheading'><b>Instructions</b></td>\r\n";
					zoptionallist += "<td class='wtw-tablecolumnheading' style='white-space:nowrap;'><b>Base Price</b></td>\r\n";
					zoptionallist += "<td class='wtw-tablecolumnheading'><b>&nbsp;</b></td></tr>";
					if (zresponse.upgrades != undefined) {
						for (var i=0;i<zresponse.upgrades.length;i++) {
							if (zresponse.upgrades[i] != null) {
								zoptionallist += "<tr><td class='wtw-tablecolumns' style='white-space:nowrap;'><b>" + zresponse.upgrades[i].title + "</b></td>\r\n";
								zoptionallist += "<td class='wtw-tablecolumns'>" + zresponse.upgrades[i].description + "</td>\r\n";
								zoptionallist += "<td class='wtw-tablecolumns'>" + zresponse.upgrades[i].instructions + "</td>\r\n";
								zoptionallist += "<td class='wtw-tablecolumns'>" + WTW.formatMoney(zresponse.upgrades[i].startprice) + "</td>\r\n";
								zoptionallist += "<td class='wtw-tablecolumns'>" + "</td></tr>\r\n";
							}
						}
					}
					zoptionallist += '</table>\r\n';
					dGet('wtw_optionallist').innerHTML = zoptionallist;
					WTW.hide('wtw_loadingoptional');
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-openOptionalUpgrades=' + ex.message);
	}
}

/* Invoices Admin */

WTWJS.prototype.openInvoices = async function(zlist) {
	/* open Invoices page form */
	try {
		if (zlist == undefined) {
			zlist = 'my';
		}
		WTW.show('wtw_invoicespage');
		WTW.show('wtw_loadinginvoices');
		dGet('wtw_invoicestitle').innerHTML = 'Invoices';
		dGet('wtw_invoicesnote').innerHTML = '<b>Invoices or Hosting Invoices</b> provide printable receipts for your WalkTheWeb Hosted Users Purchases and Upgrades. Your WalkTheWeb Instance can host 3D Websites for your customers!<br />';
		if (zlist == 'my') {
			dGet('wtw_invoicestitle').innerHTML = 'My Invoices';
			dGet('wtw_invoicesnote').innerHTML = '<b>My Invoices</b> provide printable receipts for your WalkTheWeb Purchases and Upgrades.<br />';
		}
		dGet('wtw_invoiceslist').innerHTML = '';
		var zrequest = {
			'list':zlist,
			'function':'getinvoices'
		};
		WTW.postAsyncJSON('/core/handlers/invoices.php', zrequest,
			function(zresponse) {
				if (zresponse != null) {
					zresponse = JSON.parse(zresponse);
					/* send JSON results to be formated on the form */
					var zinvoiceslist = "<table class='wtw-table'><tr><td class='wtw-tablecolumnheading'><b>Invoice ID</b></td>\r\n";
					zinvoiceslist += "<td class='wtw-tablecolumnheading'><b>Invoice Date</b></td>\r\n";
					zinvoiceslist += "<td class='wtw-tablecolumnheading'><b>Domain Name</b></td>\r\n";
					zinvoiceslist += "<td class='wtw-tablecolumnheading'><b>Description</b></td>\r\n";
					zinvoiceslist += "<td class='wtw-tablecolumnheading'><b>Total</b></td>\r\n";
					zinvoiceslist += "<td class='wtw-tablecolumnheading'><b>Paid</b></td>\r\n";
					zinvoiceslist += "<td class='wtw-tablecolumnheading'><b>&nbsp;</b></td></tr>";
					if (zresponse.invoices != undefined) {
						for (var i=0;i<zresponse.invoices.length;i++) {
							if (zresponse.invoices[i] != null) {
								var zinvoicedetails = [];
								var ztransactions = [];
								var zbdetails = '&nbsp;';
								if (zresponse.invoices[i].invoicedetails != null) {
									if (zresponse.invoices[i].invoicedetails.length > 0) {
										zinvoicedetails = zresponse.invoices[i].invoicedetails
									}
								}
								if (zresponse.invoices[i].transactions != null) {
									if (zresponse.invoices[i].transactions.length > 0) {
										ztransactions = zresponse.invoices[i].transactions
									}
								}
								if (zinvoicedetails.length > 0 || ztransactions.length > 0) {
									zbdetails = "<div class='wtw-bluebuttonright' onclick=\"WTW.openWebpage('/core/pages/invoice.php?invoiceid=" + zresponse.invoices[i].invoiceid + "','_blank');\">Print View</div><div class='wtw-bluebuttonright' onclick=\"WTW.toggleTR('wtw_invoice-" + zresponse.invoices[i].invoiceid + "');\">Details</div>";
								}
								zinvoiceslist += "<tr><td class='wtw-tablecolumns'>" + zresponse.invoices[i].invoiceid + "</td>\r\n";
								zinvoiceslist += "<td class='wtw-tablecolumns'>" + WTW.formatDate(zresponse.invoices[i].invoicedate) + "</td>\r\n";
								zinvoiceslist += "<td class='wtw-tablecolumns'>" + zresponse.invoices[i].domainname + "</td>\r\n";
								zinvoiceslist += "<td class='wtw-tablecolumns'>" + zresponse.invoices[i].invoicedescription + "</td>\r\n";
								zinvoiceslist += "<td class='wtw-tablecolumns'>" + WTW.formatMoney(zresponse.invoices[i].invoicetotal) + "</td>\r\n";
								zinvoiceslist += "<td class='wtw-tablecolumns'>" + zbdetails + "</td></tr>\r\n";
								if (zinvoicedetails.length > 0 || ztransactions.length > 0) {
									zinvoiceslist += "<tr id='wtw_invoice-" + zresponse.invoices[i].invoiceid + "' class='wtw-hide'><td class='wtw-tablecolumns'></td>\r\n";
									zinvoiceslist += "<td class='wtw-tablecolumns' colspan='4'>\r\n";
									if (zinvoicedetails.length > 0) {
										zinvoiceslist += "<table class='wtw-table'><tr><td class='wtw-tablecolumnheading' ><b>Quantity</b></td>\r\n";
										zinvoiceslist += "<td class='wtw-tablecolumnheading'><b>Description</b></td>\r\n";
										zinvoiceslist += "<td class='wtw-tablecolumnheading'><b>Price</b></td></tr>\r\n";
										for (var j=0;j< zinvoicedetails.length;j++) {
											if (zinvoicedetails[j] != null) {
												zinvoiceslist += "<tr><td class='wtw-tablecolumns'>" + zinvoicedetails[j].quantity + "</td>\r\n";
												zinvoiceslist += "<td class='wtw-tablecolumns'>" + zinvoicedetails[j].description + "</td>\r\n";
												zinvoiceslist += "<td class='wtw-tablecolumns'>" + WTW.formatMoney(zinvoicedetails[j].price) + "</td>\r\n";
												zinvoiceslist += "<td>&nbsp;</td></tr>\r\n";
											}
										}
										zinvoiceslist += "<tr><td class='wtw-tablecolumns' style='border-top:2px solid #000000;'>&nbsp;</td>\r\n";
										zinvoiceslist += "<td class='wtw-tablecolumns' style='border-top:2px solid #000000;'><b>Total Invoice</b></td>\r\n";
										zinvoiceslist += "<td class='wtw-tablecolumns' style='border-top:2px solid #000000;'><b>" + WTW.formatMoney(zresponse.invoices[i].invoicetotal) + "</b></td>\r\n";
										zinvoiceslist += "<td>&nbsp;</td></tr></table>\r\n";
									}
									if (ztransactions.length > 0) {
										zinvoiceslist += "<table class='wtw-table'><tr><td class='wtw-tablecolumnheading' ><b>Transaction ID</b></td>\r\n";
										zinvoiceslist += "<td class='wtw-tablecolumnheading'><b>Transaction Status</b></td>\r\n";
										zinvoiceslist += "<td class='wtw-tablecolumnheading'><b>Pay Status</b></td>\r\n";
										zinvoiceslist += "<td class='wtw-tablecolumnheading'><b>Pay Amount</b></td></tr>\r\n";
										for (var j=0;j< ztransactions.length;j++) {
											if (ztransactions[j] != null) {
												zinvoiceslist += "<tr><td class='wtw-tablecolumns'>" + ztransactions[j].transactionid + "</td>\r\n";
												zinvoiceslist += "<td class='wtw-tablecolumns'>" + ztransactions[j].transactionstatus + "</td>\r\n";
												zinvoiceslist += "<td class='wtw-tablecolumns'>" + ztransactions[j].paystatus + "</td>\r\n";
												zinvoiceslist += "<td class='wtw-tablecolumns'>" + WTW.formatMoney(ztransactions[j].payamount) + "</td>\r\n";
												zinvoiceslist += "<td>&nbsp;</td></tr>\r\n";
											}
										}
										zinvoiceslist += "</table>\r\n";
									}
									zinvoiceslist += "</td><td class='wtw-tablecolumns'></td></tr>\r\n";
								}
							}
						}
					}
					zinvoiceslist += '</table>\r\n';
					dGet('wtw_invoiceslist').innerHTML = zinvoiceslist;
					WTW.hide('wtw_loadinginvoices');
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-openInvoices=' + ex.message);
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
		WTW.postAsyncJSON('/core/handlers/tools.php', zrequest, 
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
					if (zresponse.defaultlanguage != undefined) {
						WTW.loadLanguages(zresponse.defaultlanguage);
					} else {
						WTW.loadLanguages('English');
					}
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
					if (zresponse.babylonversion != undefined) {
						WTW.setDDLValue('wtw_babylonversion', zresponse.babylonversion);
					} else {
						WTW.setDDLValue('wtw_babylonversion', WTW.babylonVersion);
					}
					if (zresponse.physicsengine != undefined) {
						WTW.setDDLValue('wtw_physicsengine', zresponse.physicsengine);
					} else {
						WTW.setDDLValue('wtw_physicsengine', '');
					}
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
		WTW.log('core-scripts-admin-wtw_adminforms.js-openServerSettings=' + ex.message);
	}
}

WTWJS.prototype.loadLanguages = async function(zlanguage) {
	/* load languages for Server Settings */
	try {
		if (zlanguage == undefined) {
			zlanguage = 'English';
		}
		WTW.clearDDL('wtw_defaultlanguage');
		var zoption = document.createElement('option');
		zoption.text = 'English';
		zoption.value = 'eng';
		if (zlanguage == 'English') {
			zoption.selected = true;
		}
		dGet('wtw_defaultlanguage').add(zoption);		
		
		var zrequest = {
			'function':'getlanguages'
		};
		WTW.postAsyncJSON('/core/handlers/tools.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					/* load values into dropdown */
					var zoption1 = document.createElement('option');
					zoption1.text = zresponse[0].language;
					zoption1.value = zresponse[0].abbreviation;
					if (zresponse[0].language == zlanguage) {
						zoption1.selected = true;
					}
					dGet('wtw_defaultlanguage').add(zoption1);		
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-loadLanguages=' + ex.message);
	}
}

WTWJS.prototype.saveServerSettings = async function(zreload) {
	/* save Server Settings to the Config file */
	try {
		if (zreload == undefined) {
			zreload = false;
		}
		var zrequest = {
			'dbserver': dGet('wtw_dbserver').value,
			'dbname': dGet('wtw_dbname').value,
			'dbusername': dGet('wtw_dbusername').value,
			'dbpassword': btoa(dGet('wtw_dbpassword').value),
			'defaultlanguage': WTW.getDDLText('wtw_defaultlanguage','English'),
			'contentpath': dGet('wtw_contentpath').value,
			'defaultdomain': dGet('wtw_defaultdomain').value,
			'defaultsitename': dGet('wtw_defaultsitename').value,
			'googleanalytics': dGet('wtw_googleanalytics').value,
			'adminemail': dGet('wtw_adminemail').value,
			'adminname': dGet('wtw_adminname').value,
			'umask': dGet('wtw_umask').value,
			'chmod': dGet('wtw_chmod').value,
			'babylonversion': WTW.getDDLValue('wtw_babylonversion'),
			'physicsengine': WTW.getDDLValue('wtw_physicsengine'),
			'ftphost': dGet('wtw_ftphost').value,
			'ftpuser': dGet('wtw_ftpuser').value,
			'ftppassword': btoa(dGet('wtw_ftppassword').value),
			'ftpbase': dGet('wtw_ftpbase').value,
			'function':'saveserversettings'
		};
		WTW.postAsyncJSON('/core/handlers/tools.php', zrequest, 
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
				if (zreload) {
					window.location.reload();
					return false;
				} else {
					window.setTimeout(function() {
						dGet('wtw_serversettingscomplete').innerHTML = '';
					},5000);
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminforms.js-saveServerSettings=' + ex.message);
	}
}



/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

function WTW_3DINTERNET() {
	/* Add your global variables as needed here */
	this.ver = '1.1.0';
	this.checkConnection = null; /* connection heartbeat for Admin Channel */
	this.masterMove = '0'; /* toggle off or on Multiplayer Movement tracking (server level) */
	this.masterChat = '0'; /* toggle off or on Chat (server level) */
	this.masterVoiceChat = '0'; /* toggle off or on Voice Chat (server level) */
	this.masterDownloads = '1'; /* toggle off or on WalkTheWeb Downloads for 3D Webs - 3D Communities, 3D Buildings, 3D Things, and 3D Avatars (server level) */
	this.masterPlugins = '1'; /* toggle off or on WalkTheWeb Downloads for 3D Plugins (server level) */
	this.masterSharing = '1'; /* toggle off or on Sharing Templates of 3D Webs - 3D Communities, 3D Buildings, 3D Things, and 3D Avatars (server level) */
	this.masterFranchising = '1'; /* toggle off or on ability to franchise out your buildings to other server 3D Scenes*/
	this.masterFranchiseAdditions = '1'; /* toggle off or on ability to add franchised buildings and things to your server 3D Scenes*/
	this.admin = null; /* admin channel object - used for connection and checking multiplayer server settings */
	this.move = null; /* movement channel object - tracks and sends multiplayer movements */
	this.chat = null; /* chat channel object - processes all chat to and from your user */
	this.voicechat = null; /* voice chat channel object - processes all voice chat to and from your user */
	this.voicestream = null; /* stream picked up from microphone audio */
	this.voiceprocessor = null; /* stream picked up from microphone audio */
	this.voiceaudiocontext = null; /* stream picked up from microphone audio */
	this.voiceinput = null; /* stream picked up from microphone audio */
	this.chatText = []; /* group chat text queue */
	this.loadZones = []; /* used to track offset of 3D Community vs 3D Buildings loaded directly */ 
	this.avatars = []; /* minimal tracking required for multiplayer avatars currently in the 3D Scene */
	this.AvatarIDs = 1; /* show or hide the avatar display name above the avatars */
	this.multiPlayer = 20; /* maximum multiplayers shown in 3D Scene - also limited by Multiplayer Server account max */
	this.multiPlayerOn = 1; /* toggle off or on Multiplayer */
	this.avatarParameterSize = 800; /* sets the scale of the avatar parameter box for showing multiplayer avatars */
	this.lastAnimations = ''; /* my previously running avatar animations used to track changes in animation */
	this.typingTimer = null; /* used to track if you are currently typing a message in personal chat */
	this.inactiveTimeout = 1800000; /* set the inactive timeout for my avatar 1800000 = 30 minutes */
	this.inactive = false; /* flag used after inactive timeout to keep multiplayer inactive until movement is detected again */
	
	/* the following variables are experimental settings used to test and program video */
	this.mediaStream = null; /* video stream */
	this.recordAudio = null; 
	this.recordVideo = null;
//	this.mediaSocket = null;
}

/* Create the class instance */
var wtw3dinternet = new WTW_3DINTERNET();

WTW_3DINTERNET.prototype.adminLoadAfterScreen = function(zhmenu) {
	/* Admin only, Load After Screen is loaded */
	try {
		/* check for updates to WalkTheWeb and 3D Plugins */
		WTW.checkForUpdates('1');
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-adminLoadAfterScreen=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.openFullPageForm = function(zpageid, zsetcategory, zitem, zitemname, zitemnamepath, zpreviewname) {
	/* this function sets the form page title, sections, menu options, breadcrumbs, etc */
	var zshow = false;
	try {
		/* select page to show */
		switch (zpageid) {
			case 'updates':
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>" + WTW.__('Updates') + "</div>";
				WTW.show('wtw_showfilepage');
				WTW.show('wtw_updatespage');
				WTW.checkForUpdates('1');
				wtw3dinternet.loadArchiveUpdates();
				zshow = true;
				break;
			case 'importpage':
				if (WTW.adminView == 1) {
					dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowlink' onclick=\"dGet('wtw_modelfilter').value='';dGet('wtw_tgroupuploadobjectid').value='';dGet('wtw_tgroupdiv').value='';WTW.openFullPageForm('medialibrary','');WTW.setImageMenu(4);\">" + WTW.__('Media Library') + "</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + WTW.__('WalkTheWeb Downloads') + "</div>";
					WTW.hide('searchcommunitiesdiv');
					WTW.hide('searchbuildingsdiv');
					WTW.hide('searchthingsdiv');
					WTW.hide('searchavatarsdiv');
					WTW.hide('searchpluginsdiv');
					WTW.hide('wtw_commtempsearchresults');
					WTW.hide('wtw_buildtempsearchresults');
					WTW.hide('wtw_thingtempsearchresults');
					WTW.hide('wtw_avatartempsearchresults');
					WTW.showInline('wtw_menumedialibrary');
					if (wtw3dinternet.masterDownloads == '1') {
						WTW.showInline('wtw_menuwtwcommunities');
						WTW.showInline('wtw_menuwtwbuildings');
						WTW.showInline('wtw_menuwtwthings');
						WTW.showInline('wtw_menuwtwavatars');
					} else {
						WTW.hide('wtw_menuwtwcommunities');
						WTW.hide('wtw_menuwtwbuildings');
						WTW.hide('wtw_menuwtwthings');
						WTW.hide('wtw_menuwtwavatars');
						if (wtw3dinternet.masterPlugins == '1') {
							/* if downloads is disabled and plugins is not, use plugins as default opened */
							zsetcategory = 'plugins';
						}
					}
					if (wtw3dinternet.masterPlugins == '1') {
						WTW.showInline('wtw_menuwtwplugins');
						WTW.show('wtw_addplugin');
					} else {
						WTW.hide('wtw_menuwtwplugins');
						WTW.hide('wtw_addplugin');
					}
					if (wtw3dinternet.masterDownloads == '1' || wtw3dinternet.masterPlugins == '1') {
						WTW.show('wtw_adminmediawtwdownloads');
						WTW.showInline('wtw_menuwtwdownloads');
					} else {
						WTW.hide('wtw_adminmediawtwdownloads');
						WTW.hide('wtw_menuwtwdownloads');
					}
					WTW.show('wtw_fullpageplugins');
					WTW.show('wtw_showimportpage');
					WTW.show('wtw_selectwebform');
					dGet('wtw_menuwtwcommunities').className = 'wtw-menutabtop';
					dGet('wtw_menuwtwbuildings').className = 'wtw-menutabtop';
					dGet('wtw_menuwtwthings').className = 'wtw-menutabtop';
					dGet('wtw_menuwtwavatars').className = 'wtw-menutabtop';
					dGet('wtw_menuwtwplugins').className = 'wtw-menutabtop';
					switch (zsetcategory) {
						case 'communities':
							WTW.showInline('searchcommunitiesdiv');
							dGet('wtw_menuwtwcommunities').className = 'wtw-menutabtopselected';
							dGet('wtw_commtempsearchresults').style.height = (WTW.sizeY - 175) + 'px';
							wtw3dinternet.communitySearch('');
							WTW.show('wtw_commtempsearchresults');
							break;
						case 'buildings':
							WTW.showInline('searchbuildingsdiv');
							dGet('wtw_menuwtwbuildings').className = 'wtw-menutabtopselected';
							dGet('wtw_buildtempsearchresults').style.height = (WTW.sizeY - 175) + 'px';
							wtw3dinternet.buildingSearch('');
							WTW.show('wtw_buildtempsearchresults');
							break;
						case 'things':
							WTW.showInline('searchthingsdiv');
							dGet('wtw_menuwtwthings').className = 'wtw-menutabtopselected';
							dGet('wtw_thingtempsearchresults').style.height = (WTW.sizeY - 175) + 'px';
							wtw3dinternet.thingSearch('');
							WTW.show('wtw_thingtempsearchresults');
							break;
						case 'avatars':
							WTW.showInline('searchavatarsdiv');
							dGet('wtw_menuwtwavatars').className = 'wtw-menutabtopselected';
							dGet('wtw_avatartempsearchresults').style.height = (WTW.sizeY - 175) + 'px';
							wtw3dinternet.avatarSearch('');
							WTW.show('wtw_avatartempsearchresults');
							break;
						case 'plugins':
							WTW.showInline('searchpluginsdiv');
							dGet('wtw_menuwtwplugins').className = 'wtw-menutabtopselected';
							dGet('wtw_plugintempsearchresults').style.height = (WTW.sizeY - 175) + 'px';
							wtw3dinternet.pluginSearch('');
							WTW.show('wtw_plugintempsearchresults');
							break;
					}
				}
				zshow = true;
				break;
			case 'plugins':
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>" + WTW.__('3D Plugins') + "</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + WTW.__(zsetcategory) + "</div>";
				WTW.show('wtw_showfilepage');
				WTW.checkForUpdates('2', zsetcategory);
				zshow = true;
				break;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-openFullPageForm=' + ex.message);
	}
	return zshow;
}

WTW_3DINTERNET.prototype.openFullPageFormMediaLibrary = async function(zpageid, zsetcategory, zitem, zitemname, zitemnamepath, zpreviewname) {
	/* this function sets the form page title, sections, menu options, breadcrumbs, etc - in the MEdia Library section */
	try {
		if (zsetcategory == '') {
			if (wtw3dinternet.masterDownloads == '1' || wtw3dinternet.masterPlugins == '1') {
				WTW.showInline('wtw_menuwtwdownloads');
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-openFullPageFormMediaLibrary=' + ex.message);
	}
}



/* WalkTheWeb and 3D Plugin Updates */

WTW_3DINTERNET.prototype.openDashboardForm = async function(zshow) {
	/* load dashboard form */
	try {
		if (zshow) {
			WTW.hide('wtw_videolinks');
			WTW.hide('wtw_wtwactivity');
			WTW.getAsyncJSON('https://3dnet.walktheweb.com/connect/videolinks.php', 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							if (i == 0) {
								dGet('wtw_latestvideotitle').innerHTML = atob(zresponse[i].videotitle);
								dGet('wtw_latestvideodetails').innerHTML = 'Presented by: ' + zresponse[i].presenter + ' on ' + WTW.formatDate(zresponse[i].updatedate) + '<br /><br />' + atob(zresponse[i].description);
								if (zresponse[i].videourl.indexOf('?v=') > -1) {
									var zyoutubeid = zresponse[i].videourl.split('?v=')[1];
									dGet('wtw_latestvideo').innerHTML = "<iframe width='100%' height='auto' src='https://www.youtube.com/embed/" + zyoutubeid + "?list=PLnMgA5ebbr8KXw9z5vp4E202e-RTKa9X-' frameborder='0' allowfullscreen style='min-height:350px;'></iframe>";
								}
							} else {
								
							}
						}
					}
					WTW.show('wtw_videolinks');
				}
			);
			WTW.getAsyncJSON('https://3dnet.walktheweb.com/connect/wtwactivities.php', 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					var zwtwactivities = '';
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							zwtwactivities += "<h2 class='wtw-black'>" + atob(zresponse[i].activitytitle) + ' (' + WTW.formatDate(zresponse[i].createdate) + ')</h2>' + atob(zresponse[i].activitydescription) + '<br />';
							switch (zresponse[i].category) {
								case 'Shared 3D Avatar':
								case 'Shared 3D Web':
									zwtwactivities += "<h3 class='wtw-blue'>" + atob(zresponse[i].sharedtitle) + "</h3>";
									zwtwactivities += atob(zresponse[i].shareddescription) + '<br /><br />';
									zwtwactivities += '<b>Search Tags</b><br />' + atob(zresponse[i].tags) + '<br /><br />';
									break;
								case 'WalkTheWeb Users':
									zresponse[i].sharedimage = '';
								case 'WalkTheWeb Servers':
									if (zresponse[i].sharedimage == '') {
										zresponse[i].sharedimage = 'https://3dnet.walktheweb.com/wp-content/uploads/2021/02/NewWTWServer.png';
									}
									zwtwactivities += "<h3><a href='" + zresponse[i].website + "' target='_blank'>" + zresponse[i].website + "</a></h3>";
									zwtwactivities += "<div class='wtw-mincol'>City: </div><b>" + zresponse[i].city + "</b><br /><div class='wtw-mincol'>Region: </div><b>" + zresponse[i].region + "</b><br /><div class='wtw-mincol'>Country: </div><b>" + zresponse[i].country + "</b><br /><div class='wtw-mincol'>Continent: </div><b>" + zresponse[i].continent + '</b><br /><br />';
									break;
								case 'WalkTheWeb Video':
									zwtwactivities += "<h3><a href='" + zresponse[i].videourl + "' target='_blank'>" + zresponse[i].website + "</a></h3>";
									zwtwactivities += 'Presented by: ' + zresponse[i].presenter + ' on ' + WTW.formatDate(zresponse[i].createdate) + '<br /><br />' + atob(zresponse[i].videodescription);
									break;
							}
							if (zresponse[i].sharedimage != '') {
								zwtwactivities += "<img src='" + zresponse[i].sharedimage + "' style='width:100%;height:auto;' /><hr />";
							} else {
								zwtwactivities += '<hr />';
							}
						}
					}
					dGet('wtw_wtwactivitylist').innerHTML = zwtwactivities;
					WTW.show('wtw_wtwactivity');
				}
			);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-openDashboardForm=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.openDashboardFormDownloads = async function(zdownloads, zshow) {
	/* load dashboard form - process response downloads list */
	try {
		wtw3dinternet.getDownloadsInfo(zdownloads, zshow);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-openDashboardFormDownloads=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.adminMenuItemSelected = function(zobj) {
	/* Admin only, when an admin menu item is selected */
	try {
		if (zobj != null) {
			if (zobj.id != undefined) {
				switch (zobj.id) {
					case 'wtw_admincommunityaddbuilding':
						WTW.hideAdminMenu();
						wtw3dinternet.showFranchise(dGet('wtw_buildingbuttonlocal'),'building');
						WTW.show('wtw_adminmenu27');
						break;
					case 'wtw_bback29':
					case 'wtw_cancel29':	
						WTW.hideAdminMenu();
						wtw3dinternet.saveShareCommunityForm();
						WTW.show('wtw_adminmenu24');
						break;
					case 'wtw_bsharecommunitytemp':
						wtw3dinternet.saveShareCommunityForm();
						if (dGet('wtw_bsharecommunitytemp').innerHTML.indexOf('Share 3D Community as Template') > -1) {
							WTW.openConfirmation('Share 3D Community');
						}
						break;
					case 'wtw_bback9':
						WTW.hideAdminMenu();
						wtw3dinternet.saveShareBuildingForm();
						WTW.show('wtw_adminmenu4');
						break;
					case 'wtw_bsharebuildingtemp':
						wtw3dinternet.saveShareBuildingForm();
						if (dGet('wtw_bsharebuildingtemp').innerHTML.indexOf('Share 3D Building as Template') > -1) {
							WTW.openConfirmation('Share 3D Building');
						}
						break;
					case 'wtw_adminmenubuildsharecancel':
						WTW.hideAdminMenu();
						wtw3dinternet.saveShareBuildingForm();
						WTW.show('wtw_adminmenu4');
						break;
					case 'wtw_bback39':
						WTW.hideAdminMenu();
						wtw3dinternet.saveShareThingForm();
						WTW.show('wtw_adminmenu34');
						break;
					case 'wtw_bsharethingtemplate':
						wtw3dinternet.saveShareThingForm();
						if (dGet('wtw_bsharethingtemplate').innerHTML.indexOf('Share 3D Thing as Template') > -1) {
							WTW.openConfirmation('Share 3D Thing');
						}
						break;
					case 'wtw_cancel39':	
						WTW.hideAdminMenu();
						wtw3dinternet.saveShareThingForm();
						WTW.show('wtw_adminmenu34');
						break;
					case 'wtw_bbackwtw_adminShareAvatarDiv':
					case 'wtw_cancelshareavatar':
						WTW.hideAdminMenu();
						wtw3dinternet.saveShareAvatarForm();
						WTW.backToTools();
						break;
					case 'wtw_bshareavatartemplate':
						wtw3dinternet.saveShareAvatarForm();
						WTW.openConfirmation('Share 3D Avatar');
						break;
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-adminMenuItemSelected=' + ex.message);
	} 
}

/* confirmation pages before executing a command */
WTW_3DINTERNET.prototype.openConfirmation = function(zoption) {
	/* open confirmation box with warning */
	try {
		switch (zoption) {
			case 'Share 3D Community':
				dGet('wtw_confirmformtitle').innerHTML = 'Confirm Share 3D Community';
				dGet('wtw_confirmheading').innerHTML = 'Are you sure you want to Share this 3D Community?';
				dGet('wtw_confirmtext').innerHTML = '<br />Other Users will be able to use a Shared Copy of this design for their own 3D Communities. It will not affect your current 3D Community. The Shared Copy cannot be undone once Shared.';
				dGet('wtw_bconfirm').value = 'Share My 3D Community';
				break;
			case 'Share 3D Building':
				dGet('wtw_confirmformtitle').innerHTML = 'Confirm Share 3D Building';
				dGet('wtw_confirmheading').innerHTML = 'Are you sure you want to Share this 3D Building?';
				dGet('wtw_confirmtext').innerHTML = '<br />Other Users will be able to use a Shared Copy of this design for their own 3D Building. It will not affect your current 3D Building. The Shared Copy cannot be undone once Shared.';
				dGet('wtw_bconfirm').value = 'Share My 3D Building';
				break;
			case 'Share 3D Thing':
				dGet('wtw_confirmformtitle').innerHTML = 'Confirm Share 3D Thing';
				dGet('wtw_confirmheading').innerHTML = 'Are you sure you want to Share this 3D Thing?';
				dGet('wtw_confirmtext').innerHTML = '<br />Other Users will be able to use a Shared Copy of this design for their own 3D Thing. It will not affect your current 3D Thing. The Shared Copy cannot be undone once Shared.';
				dGet('wtw_bconfirm').value = 'Share My 3D Thing';
				break;
			case 'Share 3D Avatar':
				dGet('wtw_confirmformtitle').innerHTML = 'Confirm Share 3D Avatar';
				dGet('wtw_confirmheading').innerHTML = 'Are you sure you want to Share this 3D Avatar?';
				dGet('wtw_confirmtext').innerHTML = '<br />Other Users will be able to use a Shared Copy of this design for their own 3D Avatar. It will not affect your current 3D Avatar. The Shared Copy cannot be undone once Shared.';
				dGet('wtw_bconfirm').value = 'Share My 3D Avatar';
				break;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-openConfirmation=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.completedConfirmation = function(zoption) {
	/* if confirmed, continue to process */
	try {
		switch (zoption) {
			case 'Share 3D Community':
				wtw3dinternet.shareCommunityTemplate();
				break;
			case 'Share 3D Building':
				wtw3dinternet.shareBuildingTemplate();
				break;
			case 'Share 3D Thing':
				wtw3dinternet.shareThingTemplate();
				break;
			case 'Share 3D Avatar':
				wtw3dinternet.shareAvatarTemplate();
				break;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-completedConfirmation=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.onClick = function(zpickedname) {
	/* process onclick events for plugin */
	try {
		zpickedname = zpickedname.toLowerCase();
		let zmoldnameparts = WTW.getMoldnameParts(zpickedname);
		if (zpickedname.indexOf('person') > -1) {
			wtw3dinternet.avatarConnectMenu(zmoldnameparts.instanceid);
		} else if (zpickedname.indexOf('hud-textprompt-background') > -1) {
			/* open text prompt */
			wtw3dinternet.promptEditText('hud-textprompt-background');
		} else if (zpickedname.indexOf('hud-textprompt-outterbar') > -1) {
			/* close text prompt */
			WTW.disposeClean('hud-textprompt');
		} else {
			if (dGet('hud-textprompt-background') != null) {
				var zvalue = dGet('hud-textprompt-background').value;
				if (zvalue == '' || zvalue == '|') {
					WTW.disposeClean('hud-textprompt');
				} else {
					wtw3dinternet.promptEditText('hud-textprompt-background');
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-onClick=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.keyUp = function(zevent) {
	/* check for enter key when canvas is focused and avatar is present */
	try {
		if (WTW.canvasFocus == 1 && zevent.keyCode == 13) {
			if (document.activeElement.id.indexOf('wtw_chatadd-') == -1) {
				wtw3dinternet.toggleChatPrompt();
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-keyUp=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.avatarConnectMenu = function(ztoinstanceid, zrefresh) {
	/* connect options menu that pops up when you click on a multiplayer avatar in the 3D Scene */
	try {
		if (zrefresh == undefined) {
			zrefresh = false;
		}
		if (dGet('wtw3dinternet_connect' + ztoinstanceid) != null && zrefresh) {
			dGet('wtw3dinternet_connect' + ztoinstanceid).parentElement.removeChild(dGet('wtw3dinternet_connect' + ztoinstanceid));
		}
		if (dGet('wtw3dinternet_connect' + ztoinstanceid) == null) {
			var zdisplayname = wtw3dinternet.getAvatarDisplayName(ztoinstanceid);
			var zbanavatar = WTW.getMeshOrNodeByID('person-' + ztoinstanceid);
			var zblockedchat = '0';
			var zbanblockedchat = '0';
			var zbanneduser = '0';
			var zbanbanneduser = '0';
			if (zbanavatar != null) {
				if (zbanavatar.WTW != undefined) {
					if (zbanavatar.WTW.blockedby != undefined) {
						for (var i=0;i<zbanavatar.WTW.blockedby.length;i++) {
							if (zbanavatar.WTW.blockedby[i] != null) {
								if (zbanavatar.WTW.blockedby[i].instanceid == dGet('wtw_tinstanceid').value) {
									zblockedchat = '1';
								} else if (zbanavatar.WTW.blockedby[i].baninstanceid == dGet('wtw_tinstanceid').value) {
									zbanblockedchat = '1';
								}
							}
						}
					}
					if (zbanavatar.WTW.bannedby != undefined) {
						for (var i=0;i<zbanavatar.WTW.bannedby.length;i++) {
							if (zbanavatar.WTW.bannedby[i] != null) {
								if (zbanavatar.WTW.bannedby[i].instanceid == dGet('wtw_tinstanceid').value) {
									zbanneduser = '1';
								} else if (zbanavatar.WTW.bannedby[i].baninstanceid == dGet('wtw_tinstanceid').value) {
									zbanbanneduser = '1';
								}
							}
						}
					}
				}
			}
			var zform = "<div id='wtw3dinternet_connect" + ztoinstanceid + "' class='wtw3dinternet-chatboxshadow'>" + 
					"<img class='wtw-closeright' onclick=\"wtw3dinternet.closeAvatarConnectMenu('" + ztoinstanceid + "');\" src='/content/system/images/menuclosegrey.png' alt='Close' title='Close' onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclosegrey.png';\" />" + 
					"<div class='wtw3dinternet-chatdisplayname'>" + zdisplayname + "</div><div style='clear:both;'></div>"; 
			if (zblockedchat == '0' && zbanneduser == '0' && zbanblockedchat == '0' && zbanbanneduser == '0') {
				zform += "<div id='wtw_startchat" + ztoinstanceid + "' class='wtw3dinternet-button' onclick=\"wtw3dinternet.closeAvatarConnectMenu('" + ztoinstanceid + "');wtw3dinternet.startChat('" + ztoinstanceid + "');\">Private Chat</div>";
			} else if (zbanneduser == '1' || zbanbanneduser == '1') {
				zform += "<div id='wtw_startchat" + ztoinstanceid + "' class='wtw3dinternet-button'>Private Chat Banned</div>";
			} else if (zblockedchat == '1' || zbanblockedchat == '1') {
				zform += "<div id='wtw_startchat" + ztoinstanceid + "' class='wtw3dinternet-button'>Private Chat Blocked</div>";
			}
/*			zform += "<div id='wtw_startvoicechat" + ztoinstanceid + "' class='wtw3dinternet-button' 		
			onclick=\"wtw3dinternet.closeAvatarConnectMenu('" + ztoinstanceid + "');wtw3dinternet.startVoiceChat('" + ztoinstanceid + "');\">Private Voice Chat</div>"; */
			if (zbanneduser == '0' && zbanbanneduser == '0') {
				if (zbanblockedchat == '1' && zblockedchat == '0') {
					zform += "<div id='wtw_blockchat" + ztoinstanceid + "' class='wtw3dinternet-button' onclick=\"wtw3dinternet.blockChat('" + ztoinstanceid + "');\">" + zdisplayname + " Blocked Chat</div>";
				} else if (zblockedchat == '1') {
					zform += "<div id='wtw_blockchat" + ztoinstanceid + "' class='wtw3dinternet-button' onclick=\"wtw3dinternet.blockChat('" + ztoinstanceid + "');\">Unblock Chat</div>";
				} else {
					zform += "<div id='wtw_blockchat" + ztoinstanceid + "' class='wtw3dinternet-button' onclick=\"wtw3dinternet.blockChat('" + ztoinstanceid + "');\">Block Chat</div>";
				}
			}
			if (zbanbanneduser == '1' && zbanneduser == '0') {
				zform += "<div id='wtw_blockchat" + ztoinstanceid + "' class='wtw3dinternet-button' onclick=\"wtw3dinternet.banUserInstance('" + ztoinstanceid + "');\">" + zdisplayname + " Banned You</div>";
			} else if (zbanneduser == '1') {
				zform += "<div id='wtw_blockchat" + ztoinstanceid + "' class='wtw3dinternet-button' onclick=\"wtw3dinternet.banUserInstance('" + ztoinstanceid + "');\">Unban User</div>";
			} else {
				zform += "<div id='wtw_blockchat" + ztoinstanceid + "' class='wtw3dinternet-button' onclick=\"wtw3dinternet.banUserInstance('" + ztoinstanceid + "');\">Ban User</div>";
			}
			zform += '</div>';
			dGet('wtw_startconnect').innerHTML += zform;
		}
		WTW.show('wtw_startconnect');
		WTW.showSettingsMenu('wtw_menuchat');
		if (dGet('wtw3dinternet_connect-' + ztoinstanceid) != null) {
			dGet('wtw3dinternet_connect-' + ztoinstanceid).scrollTop = dGet('wtw3dinternet_connect-' + ztoinstanceid).scrollHeight;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-avatarConnectMenu=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.closeAvatarConnectMenu = function(ztoinstanceid) {
	/* close menu for multiplayer avatar connect options */
	try {
		if (dGet('wtw_startconnect') != null && dGet('wtw3dinternet_connect' + ztoinstanceid ) != null) {
			dGet('wtw_startconnect').removeChild(dGet('wtw3dinternet_connect' + ztoinstanceid ));
		}
		if (dGet('wtw_chatsendrequests').innerHTML == '') {
			WTW.hide('wtw_menuchat');
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-closeAvatarConnectMenu=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.checkHovers = function(zmoldname, zshape) {
	/* added tooltip when you hover over an avatar */
	try {
		if (zmoldname.indexOf('person-') > -1) {
			if (wtw3dinternet.masterChat == '1' || wtw3dinternet.masterVoiceChat == '1') {
				WTW.showToolTip('Click to Chat');
			}
		}
	} catch(ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-checkHovers=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.resetHovers = function(zmoldname, zshape) {
	/* close tooltip after you mouse out from an avatar */
	try {
		WTW.hideToolTip();
	} catch(ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-resetHovers=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.loadUserSettingsAfterEngine = function() {
	/* 1 second delay on starting multiplayer so that initial scene is completely loaded. */
	try {
		window.setTimeout(function() {
			wtw3dinternet.initAdminSocket();
			/* only start the multiplayer services for browse mode */
			/* this will give more resources to admin mode */
			if (wtw3dinternet.masterMove == '1') {
				wtw3dinternet.initMoveSocket();
			}
			if (wtw3dinternet.masterChat == '1') {
				wtw3dinternet.initChatSocket();
			}
			if (wtw3dinternet.masterVoiceChat == '1') {
				wtw3dinternet.initVoiceChatSocket();
			}
		},1000);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-loadUserSettingsAfterEngine=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.loadLoginSettings = function(zloaddefault) {
	/* load additional login settings */
	try {
		WTW.getSettings('wtw3dinternet_masterMove, wtw3dinternet_masterChat, wtw3dinternet_masterDownloads, wtw3dinternet_masterPlugins, wtw3dinternet_masterSharing, wtw3dinternet_masterVoiceChat, wtw3dinternet_masterFranchising, wtw3dinternet_masterFranchiseAdditions', 'wtw3dinternet.responseLoadLoginSettings');
		
		var zavatarids = WTW.getCookie('AvatarIDs');
		if (zavatarids != null) {
			if (WTW.isNumeric(zavatarids)) {
				wtw3dinternet.AvatarIDs = Number(zavatarids);
			}
		}
		if (wtw3dinternet.AvatarIDs == 0) {
			dGet('wtw_submenuavataridstext').innerHTML = 'Avatar IDs are Off';
			dGet('wtw_submenuavatarids').src = '/content/system/images/menuavataridsoff.png';
			dGet('wtw_submenuavatarids').alt = 'Turn Avatar IDs On';
			dGet('wtw_submenuavatarids').title = 'Turn Avatar IDs On';
		}
		var zmultiplayeron = WTW.getCookie('multiplayeron');
		if (zmultiplayeron != null) {
			if (zmultiplayeron == '0') {
				wtw3dinternet.multiPlayerOn = 0;
				dGet('wtw_submenumultiplayertext').innerHTML = 'Multi-Player is Off';
				dGet('wtw_submenumultiplayer').src = '/content/system/images/menumultiplayeroff.png';
				dGet('wtw_submenumultiplayer').alt = 'Turn Multi-Player On';
				dGet('wtw_submenumultiplayer').title = 'Turn Multi-Player On';
			}
		}
		var zmultiplayer = WTW.getCookie('multiplayer');
		if (zmultiplayer != null) {
			if (WTW.isNumeric(zmultiplayer)) {
				wtw3dinternet.multiPlayer = Number(zmultiplayer);
			} else {
				wtw3dinternet.multiPlayer = 20;
			}
		} else {
			wtw3dinternet.multiPlayer = 20;
		}
		dGet('wtw_tavatarcount').value = wtw3dinternet.multiPlayer;
		zloaddefault = false;
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-loadLoginSettings=' + ex.message);
	} 
	return zloaddefault;
}

WTW_3DINTERNET.prototype.responseLoadLoginSettings = async function(zsettings, zparameters) {
	/* performed after it loads the login settings - sets the plugin global variables */
	try {
		zsetting = JSON.parse(zsettings);
		if (zsetting.wtw3dinternet_masterMove != undefined) {
			if (zsetting.wtw3dinternet_masterMove != '') {
				wtw3dinternet.masterMove = zsetting.wtw3dinternet_masterMove;
			}
		}
		if (zsetting.wtw3dinternet_masterChat != undefined) {
			if (zsetting.wtw3dinternet_masterChat != '') {
				wtw3dinternet.masterChat = zsetting.wtw3dinternet_masterChat;
			}
		}
		if (zsetting.wtw3dinternet_masterVoiceChat != undefined) {
			if (zsetting.wtw3dinternet_masterVoiceChat != '') {
				wtw3dinternet.masterVoiceChat = zsetting.wtw3dinternet_masterVoiceChat;
			}
		}
		if (zsetting.wtw3dinternet_masterDownloads != undefined) {
			if (zsetting.wtw3dinternet_masterDownloads != '') {
				wtw3dinternet.masterDownloads = zsetting.wtw3dinternet_masterDownloads;
			}
		}
		if (zsetting.wtw3dinternet_masterPlugins != undefined) {
			if (zsetting.wtw3dinternet_masterPlugins != '') {
				wtw3dinternet.masterPlugins = zsetting.wtw3dinternet_masterPlugins;
			}
		}
		if (zsetting.wtw3dinternet_masterSharing != undefined) {
			if (zsetting.wtw3dinternet_masterSharing != '') {
				wtw3dinternet.masterSharing = zsetting.wtw3dinternet_masterSharing;
			}
		}
		if (zsetting.wtw3dinternet_masterFranchising != undefined) {
			if (zsetting.wtw3dinternet_masterFranchising != '') {
				wtw3dinternet.masterFranchising = zsetting.wtw3dinternet_masterFranchising;
			}
		}
		if (zsetting.wtw3dinternet_masterFranchiseAdditions != undefined) {
			if (zsetting.wtw3dinternet_masterFranchiseAdditions != '') {
				wtw3dinternet.masterFranchiseAdditions = zsetting.wtw3dinternet_masterFranchiseAdditions;
			}
		}
		wtw3dinternet.setControlPanelSwitches();
		WTW.loadLoginAvatarSelect();

		/* check for purchased services */
		WTW.getAsyncJSON('https://3dnet.walktheweb.com/connect/myservices.php?serverinstanceid=' + dGet('wtw_serverinstanceid').value + '&serverip=' + dGet('wtw_serverip').value, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				wtw3dinternet.setActiveText(zresponse);
			}
		);		
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-responseLoadLoginSettings=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.setActiveText = function(zresponse) {
	/* set admin menu text show if your multiplayer account is active */
	try {
		if (zresponse != null) {
			for (var i=0;i<zresponse.length;i++) {
				if (zresponse[i] != null) {
					switch (zresponse[i].service) {
						case 'multiplayer':
							if (zresponse[i].expiredate != '') {
								if (dGet('wtw3dinternet_multiplayertext') != null) {
									dGet('wtw3dinternet_multiplayertext').innerHTML = '<b>' + zresponse[i].maxusers + ' Users</b> Multiplayer Active<br />Expires on ' + WTW.formatDate(zresponse[i].expiredate);
									dGet('wtw3dinternet_multiplayertext').innerHTML += "<div class='wtw3dinternet-chatbuttonaccept' onclick=\"wtw3dinternet.openActivateWindow();\">Expand</div>";
								}
							}
							break;
						case 'chat':
							if (zresponse[i].expiredate != '') {
								if (dGet('wtw3dinternet_chattext') != null) {
									dGet('wtw3dinternet_chattext').innerHTML = '<b>' + zresponse[i].maxusers + ' Users</b> Chat Active<br />Expires on ' + WTW.formatDate(zresponse[i].expiredate);
								}
							}
							break;
						case 'voicechat':
							if (zresponse[i].expiredate != '') {
								if (dGet('wtw3dinternet_voicechattext') != null) {
									dGet('wtw3dinternet_voicechattext').innerHTML = '<b>' + zresponse[i].maxusers + ' Users</b> Voice Chat Active<br />Expires on ' + WTW.formatDate(zresponse[i].expiredate);
								}
							}
							break;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-setActiveText=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.setControlPanelSwitches = function() {
	/* set admin menu switches for multiplayer and login account settings */
	try {
		if (WTW.adminView == 1) {
			if (dGet('wtw3dinternet_enableglobaltext') != null) {
				if (WTW.globalLogins == '1') {
					dGet('wtw3dinternet_enableglobaltext').className = 'wtw-enablelabel';
					dGet('wtw3dinternet_enableglobaltext').innerHTML = 'Global Login/Avatars Enabled';
					dGet('wtw3dinternet_enableglobal').checked = true;
				} else {
					dGet('wtw3dinternet_enableglobaltext').className = 'wtw-disabledlabel';
					dGet('wtw3dinternet_enableglobaltext').innerHTML = 'Global Login/Avatars Disabled';
					dGet('wtw3dinternet_enableglobal').checked = false;
				}
				if (WTW.localLogins == '1') {
					dGet('wtw3dinternet_enablelocaltext').className = 'wtw-enablelabel';
					dGet('wtw3dinternet_enablelocaltext').innerHTML = 'Local Login/Avatars Enabled';
					dGet('wtw3dinternet_enablelocal').checked = true;
				} else {
					dGet('wtw3dinternet_enablelocaltext').className = 'wtw-disabledlabel';
					dGet('wtw3dinternet_enablelocaltext').innerHTML = 'Local Login/Avatars Disabled';
					dGet('wtw3dinternet_enablelocal').checked = false;
				}
				if (WTW.anonymousLogins == '1') {
					dGet('wtw3dinternet_enableanonymoustext').className = 'wtw-enablelabel';
					dGet('wtw3dinternet_enableanonymoustext').innerHTML = 'Anonymous (Guest) Avatars Enabled';
					dGet('wtw3dinternet_enableanonymous').checked = true;
				} else {
					dGet('wtw3dinternet_enableanonymoustext').className = 'wtw-disabledlabel';
					dGet('wtw3dinternet_enableanonymoustext').innerHTML = 'Anonymous (Guest) Avatars Disabled';
					dGet('wtw3dinternet_enableanonymous').checked = false;
				}
				if (wtw3dinternet.masterMove == '1') {
					dGet('wtw3dinternet_enablemultiplayertext').className = 'wtw-enablelabel';
					dGet('wtw3dinternet_enablemultiplayertext').innerHTML = 'Multiplayer Enabled';
					dGet('wtw3dinternet_enablemultiplayer').checked = true;
					wtw3dinternet.initMoveSocket();
				} else {
					dGet('wtw3dinternet_enablemultiplayertext').className = 'wtw-disabledlabel';
					dGet('wtw3dinternet_enablemultiplayertext').innerHTML = 'Multiplayer Disabled';
					dGet('wtw3dinternet_enablemultiplayer').checked = false;
				}
				if (wtw3dinternet.masterChat == '1') {
					dGet('wtw3dinternet_enablechattext').className = 'wtw-enablelabel';
					dGet('wtw3dinternet_enablechattext').innerHTML = 'Multiplayer Chat Enabled';
					dGet('wtw3dinternet_enablechat').checked = true;
				} else {
					dGet('wtw3dinternet_enablechattext').className = 'wtw-disabledlabel';
					dGet('wtw3dinternet_enablechattext').innerHTML = 'Multiplayer Chat Disabled';
					dGet('wtw3dinternet_enablechat').checked = false;
				}
				if (wtw3dinternet.masterVoiceChat == '1') {
					dGet('wtw3dinternet_enablevoicechattext').className = 'wtw-enablelabel';
					dGet('wtw3dinternet_enablevoicechattext').innerHTML = 'Multiplayer Voice Chat Enabled';
					dGet('wtw3dinternet_enablevoicechat').checked = true;
				} else {
					dGet('wtw3dinternet_enablevoicechattext').className = 'wtw-disabledlabel';
					dGet('wtw3dinternet_enablevoicechattext').innerHTML = 'Multiplayer Voice Chat Disabled';
					dGet('wtw3dinternet_enablevoicechat').checked = false;
				}
				if (wtw3dinternet.masterDownloads == '1') {
					dGet('wtw3dinternet_enabledownloadstext').className = 'wtw-enablelabel';
					dGet('wtw3dinternet_enabledownloadstext').innerHTML = 'WalkTheWeb Downloads Enabled';
					dGet('wtw3dinternet_enabledownloads').checked = true;
					wtw3dinternet.enableDownloads(true);
				} else {
					dGet('wtw3dinternet_enabledownloadstext').className = 'wtw-disabledlabel';
					dGet('wtw3dinternet_enabledownloadstext').innerHTML = 'WalkTheWeb Downloads Disabled';
					dGet('wtw3dinternet_enabledownloads').checked = false;
					wtw3dinternet.enableDownloads(false);
				}
				if (wtw3dinternet.masterPlugins == '1') {
					dGet('wtw3dinternet_enablepluginstext').className = 'wtw-enablelabel';
					dGet('wtw3dinternet_enablepluginstext').innerHTML = 'Download 3D Plugins Enabled';
					dGet('wtw3dinternet_enableplugins').checked = true;
					wtw3dinternet.enablePlugins(true);
				} else {
					dGet('wtw3dinternet_enablepluginstext').className = 'wtw-disabledlabel';
					dGet('wtw3dinternet_enablepluginstext').innerHTML = 'Download 3D Plugins Disabled';
					dGet('wtw3dinternet_enableplugins').checked = false;
					wtw3dinternet.enablePlugins(false);
				}
				if (wtw3dinternet.masterSharing == '1') {
					dGet('wtw3dinternet_enablesharingtext').className = 'wtw-enablelabel';
					dGet('wtw3dinternet_enablesharingtext').innerHTML = 'Sharing 3D Webs Enabled';
					dGet('wtw3dinternet_enablesharing').checked = true;
					wtw3dinternet.enableSharing(true);
				} else {
					dGet('wtw3dinternet_enablesharingtext').className = 'wtw-disabledlabel';
					dGet('wtw3dinternet_enablesharingtext').innerHTML = 'Sharing 3D Webs Disabled';
					dGet('wtw3dinternet_enablesharing').checked = false;
					wtw3dinternet.enableSharing(false);
				}
				if (wtw3dinternet.masterFranchising == '1') {
					dGet('wtw3dinternet_enablefranchisingtext').className = 'wtw-enablelabel';
					dGet('wtw3dinternet_enablefranchisingtext').innerHTML = 'Franchising your 3D Webs Enabled';
					dGet('wtw3dinternet_enablefranchising').checked = true;
				} else {
					dGet('wtw3dinternet_enablefranchisingtext').className = 'wtw-disabledlabel';
					dGet('wtw3dinternet_enablefranchisingtext').innerHTML = 'Franchising your 3D Webs Disabled';
					dGet('wtw3dinternet_enablefranchising').checked = false;
				}
				if (wtw3dinternet.masterFranchiseAdditions == '1') {
					dGet('wtw3dinternet_enablefranchiseadditionstext').className = 'wtw-enablelabel';
					dGet('wtw3dinternet_enablefranchiseadditionstext').innerHTML = 'Franchise Additions Enabled';
					dGet('wtw3dinternet_enablefranchiseadditions').checked = true;
				} else {
					dGet('wtw3dinternet_enablefranchiseadditionstext').className = 'wtw-disabledlabel';
					dGet('wtw3dinternet_enablefranchiseadditionstext').innerHTML = 'Franchise Additions Disabled';
					dGet('wtw3dinternet_enablefranchiseadditions').checked = false;
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-setControlPanelSwitches=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.changeSwitch = function(zobj) {
	/* toggle admin multiplayer options menu switches */
	try {
		let zchecked = '0';
		if (zobj.checked) {
			zchecked = '1';
		}
		switch (zobj.id) {
			case 'wtw3dinternet_enableglobal':
				WTW.globalLogins = zchecked;
				if (zchecked == '0') {
					WTW.localLogins = '1';
				}
				break;
			case 'wtw3dinternet_enablelocal':
				WTW.localLogins = zchecked;
				if (zchecked == '0') {
					WTW.globalLogins = '1';
				}
				break;
			case 'wtw3dinternet_enableanonymous':
				WTW.anonymousLogins = zchecked;
				break;
			case 'wtw3dinternet_enablemultiplayer':
				wtw3dinternet.enableMultiplayer(zchecked);
				break;
			case 'wtw3dinternet_enablechat':
				wtw3dinternet.enableChat(zchecked);
				break;
			case 'wtw3dinternet_enablevoicechat':
				wtw3dinternet.enableVoiceChat(zchecked);
				break;
			case 'wtw3dinternet_enabledownloads':
				wtw3dinternet.enableDownloads(zchecked);
				break;
			case 'wtw3dinternet_enableplugins':
				wtw3dinternet.enablePlugins(zchecked);
				break;
			case 'wtw3dinternet_enablesharing':
				wtw3dinternet.enableSharing(zchecked);
				break;
			case 'wtw3dinternet_enablefranchising':
				wtw3dinternet.masterFranchising = zchecked;
				break;
			case 'wtw3dinternet_enablefranchiseadditions':
				wtw3dinternet.masterFranchiseAdditions = zchecked;
				break;
		}
		wtw3dinternet.setControlPanelSwitches();
		let zsettings = {
			'WTW_globalLogins': WTW.globalLogins,
			'WTW_localLogins': WTW.localLogins,
			'WTW_anonymousLogins': WTW.anonymousLogins,
			'wtw3dinternet_masterMove': wtw3dinternet.masterMove,
			'wtw3dinternet_masterChat': wtw3dinternet.masterChat,
			'wtw3dinternet_masterVoiceChat': wtw3dinternet.masterVoiceChat,
			'wtw3dinternet_masterDownloads': wtw3dinternet.masterDownloads,
			'wtw3dinternet_masterPlugins': wtw3dinternet.masterPlugins,
			'wtw3dinternet_masterSharing': wtw3dinternet.masterSharing,
			'wtw3dinternet_masterFranchising': wtw3dinternet.masterFranchising,
			'wtw3dinternet_masterFranchiseAdditions': wtw3dinternet.masterFranchiseAdditions
		};
		WTW.saveSettings(zsettings, null);		
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-changeSwitch=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.serviceCheck = async function(zservice) {
	/* check for multiplayer services on main WalkTheWeb hub */
	try {
		WTW.getAsyncJSON('https://3dnet.walktheweb.com/connect/servicecheck.php?serverinstanceid=' + dGet('wtw_serverinstanceid').value + '&serverip=' + dGet('wtw_serverip').value + '&service=' + zservice + '&userid=' + dGet('wtw_tuserid').value, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.serror != undefined) {
					if (zresponse.service == 'multiplayer') {
						if (zresponse.serror != '') {
							dGet('wtw3dinternet_multiplayertext').innerHTML = zresponse.serror;
							dGet('wtw3dinternet_enablechat').disabled = true;
							dGet('wtw3dinternet_enablevoicechat').disabled = true;
							if (zresponse.serror == 'Service Activation not found') {
								dGet('wtw3dinternet_multiplayertext').innerHTML += "<div class='wtw3dinternet-chatbuttonaccept' onclick='wtw3dinternet.openActivateWindow();'>Activate</div>";
							} else if (zresponse.serror.indexOf('suspended') > -1) {
							} else if (zresponse.serror.indexOf('banned') > -1) {
							} else if (zresponse.serror.indexOf('hold') > -1) {
							} else if (zresponse.serror.indexOf('expired') > -1) {
								dGet('wtw3dinternet_multiplayertext').innerHTML += "<div class='wtw3dinternet-chatbuttonaccept' onclick='wtw3dinternet.openActivateWindow();'>Renew</div>";
							}
						} else {
							dGet('wtw3dinternet_enablechat').disabled = false;
							dGet('wtw3dinternet_enablevoicechat').disabled = false;
						}
					}
				} else {
					dGet('wtw3dinternet_multiplayertext').innerHTML = 'service temporarily unavailable';
				}
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-serviceCheck=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.enableMultiplayer = function(zchecked) {
	/* toggle multiplayer on or off */
	try {
		wtw3dinternet.masterMove = zchecked;
		if (wtw3dinternet.masterMove == '1') {
			/* check if the multiplayer service is activated */
			wtw3dinternet.serviceCheck('multiplayer');
			/* attempt to turn on multiplayer (turn off hold) */
			if (wtw3dinternet.admin == null) {
				wtw3dinternet.admin.emit('hold', {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
					'communityid':communityid,
					'buildingid':buildingid,
					'thingid':thingid,
					'instanceid':dGet('wtw_tinstanceid').value,
					'userid':dGet('wtw_tuserid').value,
					'placeholder':WTW.placeHolder,
					'globaluseravatarid':dGet('wtw_tglobaluseravatarid').value,
					'useravatarid':dGet('wtw_tuseravatarid').value,
					'avatarid':dGet('wtw_tavatarid').value,
					'displayname':btoa(dGet('wtw_tdisplayname').value),
					'service':'multiplayer',
					'hold':0
				});
			}
			wtw3dinternet.initMoveSocket();
		} else {
			/* set multiplayer off (turn on hold) */
			if (wtw3dinternet.admin == null) {
				wtw3dinternet.admin.emit('hold', {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
					'communityid':communityid,
					'buildingid':buildingid,
					'thingid':thingid,
					'instanceid':dGet('wtw_tinstanceid').value,
					'userid':dGet('wtw_tuserid').value,
					'placeholder':WTW.placeHolder,
					'globaluseravatarid':dGet('wtw_tglobaluseravatarid').value,
					'useravatarid':dGet('wtw_tuseravatarid').value,
					'avatarid':dGet('wtw_tavatarid').value,
					'displayname':btoa(dGet('wtw_tdisplayname').value),
					'service':'multiplayer',
					'hold':1
				});
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-enableMultiplayer=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.purchaseComplete = async function() {
	/* purchase complete - close window and reset admin multiplayer options */
	try {
		/* close purchase window */
		WTW.closeIFrame();

		/* check for purchased services */
		WTW.getAsyncJSON('https://3dnet.walktheweb.com/connect/myservices.php?serverinstanceid=' + dGet('wtw_serverinstanceid').value + '&serverip=' + dGet('wtw_serverip').value, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				wtw3dinternet.setActiveText(zresponse);
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-purchaseComplete=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.openActivateWindow = function() {
	/* opens the window to offer service */
	try {
		WTW.openIFrame('https://3dnet.walktheweb.com/core/pages/serviceactivation.php?serverinstanceid=' + btoa(dGet('wtw_serverinstanceid').value) + '&domainname=' + btoa(wtw_domainname) + '&domainurl=' + btoa(wtw_domainurl) + '&websiteurl=' + btoa(wtw_websiteurl) + '&serverip=' + btoa(dGet('wtw_serverip').value) + '&userid=' + btoa(dGet('wtw_tuserid').value) + '&useremail=' + btoa(dGet('wtw_tuseremail').value), .6, .9, 'WalkTheWeb Service Activation');
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-openActivateWindow=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.enableChat = async function(zchecked) {
	/* enable chat options */
	try {
		wtw3dinternet.masterChat = zchecked;
		if (wtw3dinternet.masterChat == '1') {
			/* attempt to turn on chat (hold off) */
			wtw3dinternet.initChatSocket();
			WTW.getAsyncJSON('https://3dnet.walktheweb.com/connect/servicehold.php?serverinstanceid=' + dGet('wtw_serverinstanceid').value + '&serverip=' + dGet('wtw_serverip').value + '&service=chat&hold=0&userid=' + dGet('wtw_tuserid').value, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					wtw3dinternet.setActiveText(zresponse);
				}
			);
		} else {
			/* set chat on hold */
			WTW.getAsyncJSON('https://3dnet.walktheweb.com/connect/servicehold.php?serverinstanceid=' + dGet('wtw_serverinstanceid').value + '&serverip=' + dGet('wtw_serverip').value + '&service=chat&hold=1&userid=' + dGet('wtw_tuserid').value, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					wtw3dinternet.setActiveText(zresponse);
				}
			);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-enableChat=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.enableVoiceChat = async function(zchecked) {
	/* enable voice chat options (experimental) */
	try {
		wtw3dinternet.masterVoiceChat = zchecked;
		if (wtw3dinternet.masterVoiceChat == '1') {
			/* attempt to turn on voice chat (hold off) */
			wtw3dinternet.initVoiceChatSocket();
			WTW.getAsyncJSON('https://3dnet.walktheweb.com/connect/servicehold.php?serverinstanceid=' + dGet('wtw_serverinstanceid').value + '&serverip=' + dGet('wtw_serverip').value + '&service=voicechat&hold=0&userid=' + dGet('wtw_tuserid').value, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					wtw3dinternet.setActiveText(zresponse);
				}
			);
		} else {
			/* set voice chat on hold */
			WTW.getAsyncJSON('https://3dnet.walktheweb.com/connect/servicehold.php?serverinstanceid=' + dGet('wtw_serverinstanceid').value + '&serverip=' + dGet('wtw_serverip').value + '&service=voicechat&hold=1&userid=' + dGet('wtw_tuserid').value, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					wtw3dinternet.setActiveText(zresponse);
				}
			);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-enableVoiceChat=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.enableDownloads = async function(zchecked) {
	/* enable WalkTheWeb Downloads for 3D Webs options */
	try {
		wtw3dinternet.masterDownloads = zchecked;
		if (wtw3dinternet.masterDownloads == '1') {
			/* downloads on */
			WTW.show('wtw_adminaddcommunity');
			WTW.show('wtw_adminaddbuilding');
			WTW.show('wtw_adminaddthing');
			WTW.show('wtw_addnewavatar');
			WTW.show('wtw_menuwtwcommunities');
			WTW.show('wtw_menuwtwbuildings');
			WTW.show('wtw_menuwtwthings');
			WTW.show('wtw_menuwtwavatars');
		} else {
			/* downloads off */
			WTW.hide('wtw_adminaddcommunity');
			WTW.hide('wtw_adminaddbuilding');
			WTW.hide('wtw_adminaddthing');
			WTW.hide('wtw_addnewavatar');
			WTW.hide('wtw_menuwtwcommunities');
			WTW.hide('wtw_menuwtwbuildings');
			WTW.hide('wtw_menuwtwthings');
			WTW.hide('wtw_menuwtwavatars');
		}
		if (wtw3dinternet.masterDownloads == '1' || wtw3dinternet.masterPlugins == '1') {
			WTW.show('wtw_adminmediawtwdownloads');
			WTW.showInline('wtw_menuwtwdownloads');
		} else {
			WTW.hide('wtw_adminmediawtwdownloads');
			WTW.hide('wtw_menuwtwdownloads');
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-enableDownloads=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.enablePlugins = async function(zchecked) {
	/* enable WalkTheWeb Downloads for 3D Plugins options */
	try {
		wtw3dinternet.masterPlugins = zchecked;
		if (wtw3dinternet.masterPlugins == '1') {
			/* plugins on */
			WTW.show('wtw_addplugin');
			WTW.show('wtw_menuwtwplugins');
		} else {
			/* plugins off */
			WTW.hide('wtw_addplugin');
			WTW.hide('wtw_menuwtwplugins');
		}
		if (wtw3dinternet.masterDownloads == '1' || wtw3dinternet.masterPlugins == '1') {
			WTW.show('wtw_adminmediawtwdownloads');
			WTW.showInline('wtw_menuwtwdownloads');
		} else {
			WTW.hide('wtw_adminmediawtwdownloads');
			WTW.hide('wtw_menuwtwdownloads');
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-enablePlugins=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.enableSharing = async function(zchecked) {
	/* enable Sharing Templates of 3D Webs options */
	try {
		wtw3dinternet.masterSharing = zchecked;
		if (wtw3dinternet.masterSharing == '1') {
			/* sharing on */
			WTW.show('wtw_admincommunityshare');
			WTW.show('wtw_adminbuildingshare');
			WTW.show('wtw_adminthingshare');
			WTW.show('wtw_adminavatarshare');
		} else {
			/* sharing off */
			WTW.hide('wtw_admincommunityshare');
			WTW.hide('wtw_adminbuildingshare');
			WTW.hide('wtw_adminthingshare');
			WTW.hide('wtw_adminavatarshare');
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-enableSharing=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.beforeUnloadMove = function() {
	/* when web page is unloaded perform this first */
	try {
		wtw3dinternet.avatars = [];
		if (wtw3dinternet.move != null) {
			for (var i = 0; i < WTW.actionZones.length; i++) {
				if (WTW.actionZones[i] != null) {
					var zmoldname = WTW.actionZones[i].moldname;
					var zactionzone = WTW.getMeshOrNodeByID(zmoldname);
					var zmeinzone = false;
					if (WTW.myAvatar != null) {
						zmeinzone = WTW.myAvatar.intersectsMesh(zactionzone, false);
					}
					if (zmeinzone && zmoldname != undefined) {
						if (zmoldname.indexOf('loadzone') > -1 && zmoldname.indexOf('unloadzone') == -1) {
							/* trigger plugins when avatar exits zone */
							WTW.pluginsExitActionZone(zmoldname, WTW.actionZones[i]);
						}
					}
				}
			}			
			wtw3dinternet.move.emit('disconnect server', {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'communityid':communityid,
				'buildingid':buildingid,
				'thingid':thingid,
				'domainurl':wtw_domainurl,
				'siteurl':wtw_websiteurl,
				'instanceid':dGet('wtw_tinstanceid').value,
				'userid':dGet('wtw_tuserid').value,
				'displayname':btoa(dGet('wtw_tdisplayname').value)
			});
			wtw3dinternet.sendCommand('', 'scene command', 'leave scene');
		}
		if (wtw3dinternet.admin != null) {
			wtw3dinternet.admin.emit('disconnect server', {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'instanceid':dGet('wtw_tinstanceid').value
			});
		}
	} catch (ex) {
		/* use for troubleshooting only */
		/* WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-beforeUnloadMove=' + ex.message); */
	} 
}

WTW_3DINTERNET.prototype.openLocalLogin = function(zitem, zwidth, zheight) {
	/* local login options enabled and called */
	try {
		let zpagediv = '';
		switch (zitem) {
			case 'Global Local Profile':
				zpagediv += "<h2 class='wtw-login'>WalkTheWeb Profile</h2>";
				
				dGet('wtw_ipagediv').innerHTML = zpagediv;
				break;
			case 'Login Menu':
				zpagediv += "<h2 class='wtw-login'>Login Menu</h2>";
				if (WTW.globalLogins == '1') {
					zpagediv += "<div class='wtw-loginbutton' onclick='wtw3dinternet.openGlobalLogin();'><img src='/content/system/images/menuwtw.png' alt='WalkTheWeb' title='WalkTheWeb' class='wtw-image40'/><img id='wtw_globalcheck' src='/content/system/images/greencheck.png' class='wtw-imageright40' /><div style='margin-top:4px;'>WalkTheWeb Login<br /><span style='font-size:.6em;'>(Works on most WalkTheWeb 3D Websites)</span></div></div>";
				}
				if (WTW.localLogins == '1') {
					zpagediv += "<div class='wtw-loginbutton' onclick=\"WTW.openLocalLogin('3D Website Login', .4, .6);\"><img src='/content/system/images/icon-128x128.jpg' alt='HTTP3D Inc.' title='HTTP3D Inc.' class='wtw-image40'/><img id='wtw_localcheck' src='/content/system/images/greencheck.png' class='wtw-imageright40' /><div style='margin-top:4px;'>3D Website Login<br /><span style='font-size:.6em;'>(3D Websites on this Server Only)</span></div></div>";
				}
				if (dGet('wtw_tuserid').value != '') {
					if (WTW.globalLogins == '1') {
						zpagediv += "<div class='wtw-logincancel' onclick='wtw3dinternet.logoutGlobal();'>Logout WalkTheWeb</div>&nbsp;&nbsp;";
					}
					if (WTW.localLogins == '1') {
						zpagediv += "<div class='wtw-logincancel' onclick='WTW.logout();' style='width:170px;'>Logout 3D Website Only</div>";
					}
				} else {
					if (WTW.anonymousLogins == '1') {
						zpagediv += "<div class='wtw-loginbutton' onclick=\"WTW.openLocalLogin('Select an Anonymous Avatar', .4, .5);\"><img src='/content/system/images/menuprofilebig.png' alt='Anonymous Login' title='Anonymous Login' class='wtw-image40'/><div style='margin-top:10px;'>Continue as Guest</div></div>";
					}
				}
				dGet('wtw_ipagediv').innerHTML = zpagediv;
				if (dGet('wtw_tusertoken').value == '' || WTW.globalLogins != '1') {
					if (dGet('wtw_globalcheck') != null) {
						dGet('wtw_globalcheck').style.visibility = 'hidden';
					}
				}
				if (dGet('wtw_tuserid').value == '' || WTW.localLogins != '1') {
					if (dGet('wtw_localcheck') != null) {
						dGet('wtw_localcheck').style.visibility = 'hidden';
					}
				}
				break;
		}
	} catch(ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-openLocalLogin=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.getMyAvatarList = function(zloaddefault, zeditmode) {
	/* retrieve my available avatars to select one for this 3D Scene */
	try {
		if (zeditmode == undefined) {
			zeditmode = false;
		}
		let zmyavatars = [];
		let zversioncheck = [];
		let zlocalcomplete = false;
		let zglobalcomplete = false;
		if (WTW.localLogins == '1') {
			if (dGet('wtw_myavatars') != null) {
				WTW.getJSON('/connect/avatars.php?groups=my', 
					function(zresponse) {
						if (zresponse != null) {
							zresponse = JSON.parse(zresponse);
							if (zresponse.avatars != null) {
								if (zresponse.avatars.length > 0) {
									for (var i=0;i<zresponse.avatars.length;i++) {
										if (zresponse.avatars[i] != null) {
											zversioncheck[zversioncheck.length] = {
												'webtype': 'avatar',
												'globaluseravatarid': '',
												'useravatarid': zresponse.avatars[i].useravatarid,
												'webid': zresponse.avatars[i].avatarid,
												'webname': btoa(zresponse.avatars[i].displayname),
												'webdesc': btoa(zresponse.avatars[i].avatardescription),
												'webimage': zresponse.avatars[i].snapshots.thumbnail,
												'versionid': zresponse.avatars[i].versionid,
												'version': zresponse.avatars[i].version
											};
											zmyavatars[zmyavatars.length] = {
												'globaluseravatarid': '',
												'useravatarid': zresponse.avatars[i].useravatarid,
												'avatarid': zresponse.avatars[i].avatarid,
												'versionid': zresponse.avatars[i].versionid,
												'version': zresponse.avatars[i].version,
												'versionorder': zresponse.avatars[i].versionorder,
												'versiondesc': zresponse.avatars[i].versiondesc,
												'avatargroup': zresponse.avatars[i].avatargroup,
												'displayname': zresponse.avatars[i].displayname,
												'avatardescription': zresponse.avatars[i].avatardescription,
												'gender': zresponse.avatars[i].gender,
												'objects': {
													'folder': zresponse.avatars[i].objects.folder,
													'file': zresponse.avatars[i].objects.file
												},
												'scaling': {
													'x': zresponse.avatars[i].scaling.x,
													'y': zresponse.avatars[i].scaling.y,
													'z': zresponse.avatars[i].scaling.z
												},
												'snapshots': {
													'full': zresponse.avatars[i].snapshots.full,
													'thumbnail': zresponse.avatars[i].snapshots.thumbnail
												},
												'sortorder': zresponse.avatars[i].sortorder,
												'selected': false
											}
										}
									}
								}
							}
						}
						zlocalcomplete = true;
						if (zglobalcomplete || WTW.globalLogins != '1') {
							WTW.showMyAvatarList(zmyavatars, .4, .8, zeditmode, zversioncheck);
						}
					}
				);
			}
		}
		if (WTW.globalLogins == '1') {
			if (dGet('wtw_myavatars') != null) {
				/* call for global list */
				var zrequest = {
					'usertoken':dGet('wtw_tusertoken').value,
					'globaluserid':btoa(dGet('wtw_tglobaluserid').value),
					'serverinstanceid':btoa(dGet('wtw_serverinstanceid').value),
					'groups':'my',
					'function':'getmyglobalavatars'
				};
				WTW.postJSON('https://3dnet.walktheweb.com/connect/globalavatars.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						if (zresponse.avatars != null) {
							if (zresponse.avatars.length > 0) {
								for (var i=0;i<zresponse.avatars.length;i++) {
									if (zresponse.avatars[i] != null) {
										zversioncheck[zversioncheck.length] = {
											'webtype': 'avatar',
											'webname': btoa(zresponse.avatars[i].displayname),
											'webdesc': btoa(zresponse.avatars[i].avatardescription),
											'webimage': zresponse.avatars[i].snapshots.thumbnail,
											'globaluseravatarid': zresponse.avatars[i].globaluseravatarid,
											'useravatarid': zresponse.avatars[i].useravatarid,
											'webid': zresponse.avatars[i].avatarid,
											'versionid': zresponse.avatars[i].versionid,
											'version': zresponse.avatars[i].version
										};
										zmyavatars[zmyavatars.length] = {
											'globaluseravatarid': zresponse.avatars[i].globaluseravatarid,
											'useravatarid': zresponse.avatars[i].useravatarid,
											'avatarid': zresponse.avatars[i].avatarid,
											'versionid': zresponse.avatars[i].versionid,
											'version': zresponse.avatars[i].version,
											'versionorder': zresponse.avatars[i].versionorder,
											'versiondesc': zresponse.avatars[i].versiondesc,
											'avatargroup': zresponse.avatars[i].avatargroup,
											'displayname': zresponse.avatars[i].displayname,
											'avatardescription': zresponse.avatars[i].avatardescription,
											'gender': zresponse.avatars[i].gender,
											'objects': {
												'folder': zresponse.avatars[i].objects.folder,
												'file': zresponse.avatars[i].objects.file
											},
											'scaling': {
												'x': zresponse.avatars[i].scaling.x,
												'y': zresponse.avatars[i].scaling.y,
												'z': zresponse.avatars[i].scaling.z
											},
											'snapshots': {
												'full': zresponse.avatars[i].snapshots.full,
												'thumbnail': zresponse.avatars[i].snapshots.thumbnail
											},
											'sortorder': zresponse.avatars[i].sortorder,
											'selected': false
										}
									}
								}
							}
						}
						zglobalcomplete = true;
						if (zlocalcomplete || WTW.localLogins != '1') {
							WTW.showMyAvatarList(zmyavatars, .4, .8, zeditmode, zversioncheck);
						}
					}
				);
			}
		}
		zloaddefault = false;
	} catch(ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-getMyAvatarList=' + ex.message);
	}
	return zloaddefault;
}

WTW_3DINTERNET.prototype.onMyAvatarSelect = function(zglobaluseravatarid, zuseravatarid, zavatarid) {
	/* avatar selected - load avatar */
	var zloading = false;
	try {
		if (WTW.globalLogins == '1') {
			if (zglobaluseravatarid == '' && zuseravatarid != '') {
				var zdisplayname = 'Anonymous';
				if (dGet('wtw_tnewavatardisplayname') != null) {
					zdisplayname = dGet('wtw_tnewavatardisplayname').value;
				}
				var zprotocol = '0';
				if (wtw_protocol == 'https://') {
					zprotocol = '1';
				}
				zloading = true;

				WTW.openLoginHUD('Loading 3D Avatar');
				var zrequest = {
					'useravatarid': zuseravatarid,
					'function':'setuseravatarglobalhash'
				};
				WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						var zglobalhash = '';
						if (zresponse.globalhash != undefined) {
							if (zresponse.globalhash != '') {
								zglobalhash = zresponse.globalhash;
								var zrequest = {
									'serverinstanceid': dGet('wtw_serverinstanceid').value,
									'useravatarid': zuseravatarid,
									'globaluserid': btoa(dGet('wtw_tglobaluserid').value),
									'globalhash': zglobalhash,
									'userid': dGet('wtw_tuserid').value,
									'userip': dGet('wtw_tuserip').value,
									'avatarid':zavatarid,
									'instanceid': dGet('wtw_tinstanceid').value,
									'domain': wtw_domainname,
									'secureprotocol': zprotocol,
									'displayname':btoa(zdisplayname),
									'function':'quicksaveavatar'
								};
								WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/globalquicksaveavatar.php', zrequest, 
									function(zresponse) {
										zresponse = JSON.parse(zresponse);
										/* note serror would contain errors */
										if (zresponse.globaluseravatarid != undefined) {
											WTW.setCookie('globaluseravatarid', zresponse.globaluseravatarid, 365);
											WTW.getSavedAvatar('myavatar-' + dGet('wtw_tinstanceid').value, zresponse.globaluseravatarid, zuseravatarid, zavatarid, true);
										} else {
											WTW.getSavedAvatar('myavatar-' + dGet('wtw_tinstanceid').value, zglobaluseravatarid, zuseravatarid, zavatarid, true);
										}
									}
								);
							} else {
								WTW.closeLoginHUD();
								WTW.log("Avatar Not Found.");
								WTW.openLocalLogin('Select Avatar',.4,.9);
							}
						} else {
							WTW.closeLoginHUD();
							WTW.log("Avatar Not Found.");
							WTW.openLocalLogin('Select Avatar',.4,.9);
						}
					}
				);
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-onMyAvatarSelect=' + ex.message);
	} 
	return zloading;
}

WTW_3DINTERNET.prototype.downloadUserAvatarVersion = function(zobj, zglobaluseravatarid, zuseravatarid, zupdateuseravatarid, zwebid, zupdatewebid, zversionid, zversion, zoldversion, zwebtype) {
	/* download and update user avatar by version */
	try {
		if (zobj != null) {
			zobj.innerHTML = 'Updating to (v' + zversion + ')';
			zobj.onclick = function () {};
		}

		var zrequest = {
			'webid': zwebid,
			'serverinstanceid': dGet('wtw_serverinstanceid').value,
			'domainurl': wtw_domainurl,
			'globaluserid': btoa(dGet('wtw_tglobaluserid').value),
			'globaluseravatarid': zglobaluseravatarid,
			'useravatarid': zuseravatarid,
			'userid': dGet('wtw_tuserid').value,
			'instanceid': dGet('wtw_tinstanceid').value,
			'updatewebid': zupdatewebid,
			'versionid': zversionid,
			'version': zversion,
			'webtype': zwebtype,
			'function':'downloadupdateuseravatar'
		};
		
		if (zglobaluseravatarid != '') {
			WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/globalsaveavatar.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					WTW.updateVersionDisplay(zobj, zversion, zoldversion, 'wtw_beditavatar-' + zupdateuseravatarid, 'wtw_beditavatar_update-' + zupdateuseravatarid);
					window.setTimeout(function(){
						if (dGet('wtw_tglobaluseravatarid').value == zglobaluseravatarid) {
							WTW.onMyAvatarSelect(zglobaluseravatarid, zuseravatarid, zwebid);
						}
					},10000);
				}
			);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-downloadUserAvatarVersion=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.downloadUserAvatarVersionResponse = function(zobj, zglobaluseravatarid, zuseravatarid, zupdateuseravatarid, zwebid, zupdatewebid, zversionid, zversion, zoldversion, zwebtype) {
	/* download and update user avatar by version - process after local response */
	try {
		if (zglobaluseravatarid != '') {
			WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/globalsaveavatar.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					WTW.updateVersionDisplay(zobj, zversion, zoldversion, 'wtw_beditavatar-' + zupdateuseravatarid, 'wtw_beditavatar_update-' + zupdateuseravatarid);
					window.setTimeout(function(){
						if (dGet('wtw_tglobaluseravatarid').value == zglobaluseravatarid) {
							WTW.onMyAvatarSelect(zglobaluseravatarid, zuseravatarid, zwebid);
						}
					},10000);
				}
			);
		} 
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-downloadUserAvatarVersionResponse=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.getAvatarDisplayName = function(zinstanceid) {
	/* pull avatar display name */
	var zdisplayname = '';
	try {
		var zavatar = WTW.getMeshOrNodeByID('person-' + zinstanceid);
		if (zavatar != null) {
			if (zavatar.WTW != null) {
				if (zavatar.WTW.displayname != undefined) {
					zdisplayname = zavatar.WTW.displayname;
				}
			}
		}
	} catch(ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-getAvatarDisplayName=' + ex.message);
	}
	return zdisplayname;
}

WTW_3DINTERNET.prototype.blockedAvatar = function(zbaninstanceid, zblockchat, zbanuser) {
	/* block or unblock Avatar with a user instance */
	try {
		var zbanavatarscale = WTW.getMeshOrNodeByID('person-' + zbaninstanceid + '-scale');
		if (zbanavatarscale != null) {
			zopacity = 1;
			if (zbanuser == '1') {
				zopacity = 0;
			} else if (zblockchat == '1') {
				zopacity = .5;
			}
			var zbanavatarparts = [];
			zbanavatarparts = zbanavatarscale.getChildren();
			for (var i=0; i < zbanavatarparts.length; i++) {
				if (zbanavatarparts[i] != null) {
					WTW.setOpacity(zbanavatarparts[i].id, zopacity);
				}
			}
		}
		wtw3dinternet.showAvatarIDs('person-' + zbaninstanceid);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-blockedAvatar=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.avatarLoadComplete = function(zavatarname) {
	/* check avatar for block or ban after avatar enters */
	try {
		var zinstanceid = '';
		var zblockchat = '0';
		var zbanuser = '0';
		if (zavatarname.indexOf('person-') > -1) {
			zinstanceid = zavatarname.split('-')[1];

			if (wtw3dinternet.isBlocked(zinstanceid)) {
				zblockchat = '1';
			}
			if (wtw3dinternet.isBanned(zinstanceid)) {
				zbanuser = '1';
			}
			
			wtw3dinternet.blockedAvatar(zinstanceid, zblockchat, zbanuser);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-avatarLoadComplete=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.checkActionZone = async function() {
	/* executes after every time my avatar moves position */
	try {
		wtw3dinternet.checkAvatarParameter();
		
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-checkActionZone=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.resetActivityTimer = async function() {
	/* allow the multiplayer avatar to fade after inactive for a period of time */
	try {
		if (wtw3dinternet.inactive) {
			/* turn back on multiplayer */
			wtw3dinternet.inactive = false;
			wtw3dinternet.reconnectLoadZones();
		}
		if (wtw3dinternet.masterMove == '1') {
			if (wtw3dinternet.move != null) {
				wtw3dinternet.move.emit('fade avatar',{
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'communityid':communityid,
					'buildingid':buildingid,
					'thingid':thingid,
					'instanceid':dGet('wtw_tinstanceid').value,
					'userid':dGet('wtw_tuserid').value,
					'fade':1
				});
			}
			/* reset my avatar fade if it already started to go inactive */
			var zmyavatar = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value);
			if (zmyavatar != null) {
				if (zmyavatar.WTW != undefined) {
					/* fade my avatar in my 3D Scene */
					if (zmyavatar.WTW.fadetimer != null) {
						window.clearTimeout(zmyavatar.WTW.fadetimer);
						zmyavatar.WTW.fadetimer = null;
					}
					zmyavatar.WTW.fadetimer  = window.setInterval(function(){
						var zavatarname = 'myavatar-' + dGet('wtw_tinstanceid').value;
						var zavatarscale = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value + '-scale');
						if (zavatarscale != null) {
							var zavatarparts = zavatarscale.getChildren();
							var zdone = false;
							var zmaxvisibility = 1;
							if (WTW.isMobile && zavatarname.indexOf('myavatar') > -1) {
								zmaxvisibility = .5;
							}
							for (var i=0; i<zavatarparts.length;i++) {
								if (zavatarparts[i] != null) {
									if (zavatarparts[i].visibility < zmaxvisibility) {
										zavatarparts[i].visibility += .05;
									} else {
										zavatarparts[i].visibility = zmaxvisibility;
										zdone = true;
									}
								}
							} 
							if (zdone) {
								for (var i=0; i<zavatarparts.length;i++) {
									if (zavatarparts[i] != null) {
										zavatarparts[i].visibility = zmaxvisibility;
									}
								} 
								window.clearInterval(zmyavatar.WTW.fadetimer);
							}
						}
					},50);
				}
			}

			/* set timer to go inactive */
			if (WTW.activityTimer != null) {
				window.clearTimeout(WTW.activityTimer);
				WTW.activityTimer = null;
			}
			WTW.activityTimer = window.setTimeout(function () {
				wtw3dinternet.fadeMyInactiveAvatar();
			}, wtw3dinternet.inactiveTimeout);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-resetActivityTimer=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.fadeMyInactiveAvatar = async function() {
	/* allow the multiplayer avatar to fade after inactive for a period of time */
	try {
		if (wtw3dinternet.masterMove == '1') {
			/* send inactive signal to multiplayer users */
			if (wtw3dinternet.move != null) {
				wtw3dinternet.move.emit('fade avatar',{
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'communityid':communityid,
					'buildingid':buildingid,
					'thingid':thingid,
					'instanceid':dGet('wtw_tinstanceid').value,
					'userid':dGet('wtw_tuserid').value,
					'fade':.25
				});
			}
			/* check for my avatar */
			var zmyavatar = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value);
			if (zmyavatar != null) {
				if (zmyavatar.WTW != undefined) {
					/* fade my avatar in my 3D Scene */
					if (zmyavatar.WTW.fadetimer != null) {
						window.clearTimeout(zmyavatar.WTW.fadetimer);
						zmyavatar.WTW.fadetimer = null;
					}
					zmyavatar.WTW.fadetimer  = window.setInterval(function(){
						var zavatarscale = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value + '-scale');
						if (zavatarscale != null) {
							var zavatarparts = zavatarscale.getChildren();
							var zdone = false;
							for (var i=0; i<zavatarparts.length;i++) {
								if (zavatarparts[i] != null) {
									if (zavatarparts[i].visibility > .5) {
										zavatarparts[i].visibility -= .05;
									} else {
										zavatarparts[i].visibility = .5;
										zdone = true;
									}
								}
							} 
							if (zdone) {
								for (var i=0; i<zavatarparts.length;i++) {
									if (zavatarparts[i] != null) {
										zavatarparts[i].visibility = .5;
									}
								} 
								window.clearInterval(zmyavatar.WTW.fadetimer);
								zmyavatar.WTW.fadetimer = null;
								/* start new timer to go inactive and leave multiplayer if it remains inactive */
								zmyavatar.WTW.fadetimer  = window.setInterval(function(){
									var zavatarscale = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value + '-scale');
									if (zavatarscale != null) {
										var zavatarparts = zavatarscale.getChildren();
										var zdone = false;
										for (var i=0; i<zavatarparts.length;i++) {
											if (zavatarparts[i] != null) {
												if (zavatarparts[i].visibility > .25) {
													zavatarparts[i].visibility -= .05;
												} else {
													zavatarparts[i].visibility = .25;
													zdone = true;
												}
											}
										} 
										if (zdone) {
											for (var i=0; i<zavatarparts.length;i++) {
												if (zavatarparts[i] != null) {
													zavatarparts[i].visibility = .25;
												}
											} 
											window.clearInterval(zmyavatar.WTW.fadetimer);
											zmyavatar.WTW.fadetimer = null;
											/* log off */
											wtw3dinternet.inactive = true;
											/* disconnect from server (leave all rooms) */
											if (wtw3dinternet.move != null) {
												wtw3dinternet.move.emit('disconnect server',{
													'serverinstanceid':dGet('wtw_serverinstanceid').value,
													'communityid':communityid,
													'buildingid':buildingid,
													'thingid':thingid,
													'domainurl':wtw_domainurl,
													'siteurl':wtw_websiteurl,
													'instanceid':dGet('wtw_tinstanceid').value,
													'userid':dGet('wtw_tuserid').value,
													'displayname':btoa(dGet('wtw_tdisplayname').value)
												});
											}
											/* remove all multiplayer avatars */
											wtw3dinternet.removeAllAvatars();
										}
									}
								},5000);
							}
						}
					},500);
				}
			}
			/* restart the activity timer timeout */
			if (WTW.activityTimer != null) {
				window.clearTimeout(WTW.activityTimer);
				WTW.activityTimer = null;
			}
			if (WTW.isMobile) {
				WTW.activityTimer = window.setTimeout(function () {
					WTW.noActivityPause();
				}, 300000);
			} else {
				WTW.activityTimer = window.setTimeout(function () {
					WTW.noActivityPause();
				}, 10800000);
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-fadeMyInactiveAvatar=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.fadeAvatar = function(zdata) {
	/* fade avatar that is inactive - unfade avatar that returns to active */
	try {
		if (zdata.instanceid != undefined) {
			var zavatar = WTW.getMeshOrNodeByID('person-' + zdata.instanceid);
			if (zavatar != null) {
				if (zavatar.WTW != undefined) {
					var zfade = 1;
					if (WTW.isMobile && zavatarname.indexOf('myavatar') > -1) {
						zfade = .5;
					}
					var ztimeincrement = 500;
					if (zdata.fade != undefined) {
						zfade = Number(zdata.fade);
					}
					if (zavatar.WTW.fadetimer != null) {
						window.clearInterval(zavatar.WTW.fadetimer);
						zavatar.WTW.fadetimer = null;
					}
					if (zfade == 1) {
						ztimeincrement = 50;
					}
					zavatar.WTW.fadetimer  = window.setInterval(function(){
						var zavatarscale = WTW.getMeshOrNodeByID('person-' + zdata.instanceid + '-scale');
						if (zavatarscale != null) {
							var zfaded = zfade;
							var zavatarparts = zavatarscale.getChildren();
							var zdone = false;
							if (wtw3dinternet.isBlocked(zdata.instanceid)) {
								zfaded = 0;
							} else if (wtw3dinternet.isBanned(zdata.instanceid) && zfaded == 1) {
								zfaded = .5;
							}
							for (var i=0; i<zavatarparts.length;i++) {
								if (zavatarparts[i] != null) {
									if (zavatarparts[i].visibility > zfaded + .05) {
										zavatarparts[i].visibility -= .05;
									} else if (zavatarparts[i].visibility < zfaded - .05) {
										zavatarparts[i].visibility += .05;
									} else {
										zavatarparts[i].visibility = zfaded;
										zdone = true;
									}
								}
							} 
							if (zdone) {
								for (var i=0; i<zavatarparts.length;i++) {
									if (zavatarparts[i] != null) {
										zavatarparts[i].visibility = zfaded;
									}
								} 
								window.clearInterval(zavatar.WTW.fadetimer);
								zavatar.WTW.fadetimer = null;
							}
						}
					},ztimeincrement);
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-fadeAvatar=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.toggleMicMute = function() {
	/* toggle mic on and off */
	try {
		if (WTW.micMute == true) { 
			
		} else {
			
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-toggleMicMute=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.unloadAllZones = function(zoldwebid, zoldwebtype) {
	/* Unload All Zones for teleport */
	try {
		if (scene.meshes != null) {
			for (var i=0;i < scene.meshes.length;i++) {
				var zmoldname = scene.meshes[i].name;
				if (zmoldname.indexOf('person-') > -1) {
					/* clear any multiplayers from old scene */
					WTW.disposeAvatar(zmoldname);
					scene.meshes[i].dispose();
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-unloadAllZones=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.toggleAdminSubMenu = function(zobj) {
	/* toggle admin menu and submenu */
	try {
		switch (zobj.id) {
			case 'wtw_admin3dinternetmenu':
				if ((dGet('wtw_3dinternetloginspage').style.display == 'none' || dGet('wtw_3dinternetloginspage').style.display == '')) {
					WTW.openFullPageForm('fullpage','3D Internet','wtw_3dinternetloginspage');
				} else {
					WTW.hide('wtw_3dinternetloginspage');
					WTW.closeFullPageForm();
				}
				break;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-toggleAdminSubMenu=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.tryGlobalLogin = function() {
	try {
//		dGet('wtw_loginerrortext').innerHTML = "";
		let zemail = dGet('wtw_temail').value;
		let zpassword = dGet('wtw_tpassword').value;
		let zserverip = dGet('wtw_serverip').value;
		var zrequest = {
			'useremail':btoa(zemail),
			'password':btoa(zpassword),
			'serverip':btoa(zserverip),
			'function':'login'
		};
		WTW.postJSON("https://3dnet.walktheweb.com/connect/authenticate.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zuserid = '';
				var zusertoken = '';
				var zwtwusertoken = '';
				if (zresponse.userid != undefined) {
					zuserid = zresponse.userid;
				}
				if (zresponse.usertoken != undefined) {
					zusertoken = zresponse.usertoken;
				}
				if (zresponse.wtwusertoken != undefined) {
					zwtwusertoken = zresponse.wtwusertoken;
				}
				if (zusertoken.length > 100 || zuserid != '') {
/*					dGet('wtw_loginlabel').innerHTML = 'WalkTheWeb Login';
					WTW.hide('wtw_hostlogindiv');
					WTW.hide('wtw_logindiv');
					WTW.hide('wtw_registerdiv');
					WTW.hide('wtw_resetpassworddiv');
					dGet('wtw_usertoken').value = zusertoken;
					dGet('wtw_wtwusertoken').value = zwtwusertoken;
					dGet('wtw_userid').value = zuserid;
					dGet('wtw_temailloggedin').disabled = false;
					dGet('wtw_temailloggedin').value = zemail;
					dGet('wtw_temailloggedin').disabled = true;
					dGet('wtw_wtwemail').disabled = false;
					dGet('wtw_wtwemail').value = zemail;
					dGet('wtw_wtwemail').disabled = true;
					WTW.show('wtw_loggedindiv');
					if (dGet('wtw_usertoken').value != '' || dGet('wtw_userid').value != '') {
						dGet('wtw_step4_5').style.visibility = 'visible';
						dGet('wtw_step4_5b').style.visibility = 'visible';
					}
*/				} else {
					dGet('wtw_loginerrortext').innerHTML = zresponse.serror;
				}
			}
		);
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-tryGlobalLogin=" + ex.message);
	}
}

WTW_3DINTERNET.prototype.logoutGlobal = function() {
	/* references 3dnet.walktheweb.com - logout of global WalkTheWeb login */
	try {
		WTW.openLoginHUD('WalkTheWeb Login');
//		WTW.openIFrame('https://3dnet.walktheweb.com/core/login/login.php?logout=1&serverinstanceid=' + btoa(dGet('wtw_serverinstanceid').value) + '&domainname=' + btoa(wtw_domainname) + '&domainurl=' + btoa(wtw_domainurl) + '&websiteurl=' + btoa(wtw_websiteurl) + '&webid=' + btoa(communityid + buildingid + thingid), .4, .6, 'Login Menu');
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-logoutGlobal=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.openGlobalLogin = function() {
	/* opens login for 3dnet.walktheweb.com - as a global WalkTheWeb login option */
	try {
		WTW.openLoginHUD('WalkTheWeb Login');
//		WTW.openIFrame('https://3dnet.walktheweb.com/core/login/login.php?serverinstanceid=' + btoa(dGet('wtw_serverinstanceid').value) + '&domainname=' + btoa(wtw_domainname) + '&domainurl=' + btoa(wtw_domainurl) + '&websiteurl=' + btoa(wtw_websiteurl) + '&webid=' + btoa(communityid + buildingid + thingid), .4, .6, 'Login Menu');
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-openGlobalLogin=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.onMessage = function(zevent) {
	/* message listener is enabled and this function can receive predefined messages from an iframe within the WalkTheWeb instance - This function allows calls from 3dnet.walktheweb.com and .network */
	var zsafe = false;
	try {
		if (zevent.origin == 'https://3dnet.walktheweb.com') {
			zsafe = true;
		} else if (zevent.origin == 'https://3dnet.walktheweb.network') {
			zsafe = true;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-onMessage=' + ex.message);
	}
	return zsafe;
}

WTW_3DINTERNET.prototype.addConnectingGrid = function(zconnectinggridsurl, zchildwebtype, zchildwebid, zchildwebname, zfranchiseid, zserverfranchiseid, zwebalias, zparentname) {
	/* add a connecting grid (add 3D Building to a 3D Community, or 3D Thing in a 3D Community or 3D Building) */
	try {
		if (zfranchiseid != '') {
			zconnectinggridsurl = 'https://3dnet.walktheweb.com/connect/franchiseconnectinggrids.php?franchiseid=' + zfranchiseid + '&serverfranchiseid=' + zserverfranchiseid + '&webalias=' + zwebalias + '&parentname=' + zparentname + '&startpositionx=0&startpositiony=0&startpositionz=0';
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-addConnectingGrid=' + ex.message);
	}
	return zconnectinggridsurl;
}

WTW_3DINTERNET.prototype.addConnectingGridActionZones = function(zactionzonesurl, zchildwebtype, zchildwebid, zchildwebname, zfranchiseid, zserverfranchiseid, zwebalias, zparentname, zconnectinggridid, zconnectinggridind) {
	/* add a connecting grid's action zones (add 3D Building to a 3D Community, or 3D Thing in a 3D Community or 3D Building) */
	try {
		if (zfranchiseid != '') {
			zactionzonesurl = 'https://3dnet.walktheweb.com/connect/franchiseactionzones.php?franchiseid=' + zfranchiseid + '&serverfranchiseid=' + zserverfranchiseid + '&webalias=' + zwebalias + '&parentname=' + zparentname + '&connectinggridid=' + zconnectinggridid + '&connectinggridind=' + zconnectinggridind;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-addConnectingGridActionZones=' + ex.message);
	}
	return zactionzonesurl;
}

WTW_3DINTERNET.prototype.getActionZonesByWebID = function(zactionzonesurl, zserver, zcommunityid, zbuildingid, zthingid, zparentname, zconnectinggridid, zconnectinggridind) {
	/* when your avatar enters a Load action zone, the Mold definitions are fetched fro the internet then added to the local arrays to be added to the scene on demand */
	/* webid is the communityid, buildingid, or thingid for the web object */
	try {
		if (zserver != 'local') {
			zactionzonesurl = 'https://3dnet.walktheweb.com/connect/franchiseactionzonesbywebid.php?serverfranchiseid=' + zserver + '&franchiseid=' + WTW.connectingGrids[zconnectinggridind].childwebid + '&communityid=' + zcommunityid + '&buildingid=' + zbuildingid + '&thingid=' + zthingid + '&parentname=' + zparentname + '&connectinggridid=' + zconnectinggridid + '&connectinggridind=' + zconnectinggridind;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-getActionZonesByWebID=' + ex.message);
	}
	return zactionzonesurl;
}

WTW_3DINTERNET.prototype.getMoldsByWebID = function(zmoldsurl, zserver, zcommunityid, zbuildingid, zthingid, zactionzoneid, zactionzoneind, zconnectinggridid, zconnectinggridind, zgraphiclevel) {
	/* when your avatar enters a Load action zone, the Mold definitions are fetched fro the internet then added to the local arrays to be added to the scene on demand */
	/* webid is the communityid, buildingid, or thingid for the web object */
	try {
		if (zserver != 'local') {
			zmoldsurl = 'https://3dnet.walktheweb.com/connect/franchisemoldsbywebid.php?serverfranchiseid=' + zserver + '&franchiseid=' + WTW.connectingGrids[zconnectinggridind].childwebid + '&webcommunityid=' + communityid + '&webbuildingid=' + buildingid + '&communityid=' + zcommunityid + '&buildingid=' + zbuildingid + '&thingid=' + zthingid + '&parentactionzoneind=' + zactionzoneind + '&actionzoneid=' + zactionzoneid + '&parentname=' + WTW.actionZones[zactionzoneind].parentname + '&connectinggridid=' + zconnectinggridid + '&connectinggridind=' + zconnectinggridind + '&userid=' + dGet('wtw_tuserid').value + '&graphiclevel=' + zgraphiclevel;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-getMoldsByWebID=' + ex.message);
	}
	return zmoldsurl;
}

WTW_3DINTERNET.prototype.feedbackSubmit = function(zrequest) {
	/* forward feedback to WalkTheWeb hub to be logged */
	try {
		WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/feedback.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-feedbackSubmit=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.getSavedAvatar = function(zglobaluseravatarid, zinstanceid, zavatarname, zsendrefresh) {
	/* fetches the avatar definition for either the global avatar, local logged in avatar, or anonymous avatar */
	try {
		if (zglobaluseravatarid != '') {
			/* global avatar - uses a secure post method to 3dnet.walktheweb.com */
			var zrequest = {
				'globaluseravatarid':btoa(zglobaluseravatarid),
				'serverinstanceid':btoa(dGet('wtw_serverinstanceid').value),
				'instanceid':btoa(zinstanceid),
				'function':'getglobalavatar'
			};
			WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/globalavatar.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					if (zresponse.avatar != null) {
						WTW.updateAvatar(zavatarname, zresponse.avatar, zsendrefresh);
					}
				}
			);
		} 
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-getSavedAvatar=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.deleteUserAvatar = function(zglobaluseravatarid, zuseravatarid, zwidth, zheight) {
	/* flags a useravatar as deleted - does not actually delete the files or table records */
	try {
		if (zglobaluseravatarid != '') {
			/* send request to global server avatars handler */
			var zrequest2 = {
				'globaluseravatarid':zglobaluseravatarid,
				'globaluserid':btoa(dGet('wtw_tglobaluserid').value),
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'userid':dGet('wtw_tuserid').value,
				'instanceid':dGet('wtw_tinstanceid').value,
				'useravatarid':zuseravatarid,
				'function':'deleteglobaluseravatar'
			};
			/* send request to global server avatars handler */
			WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/globalsaveavatar.php', zrequest2, 
				function(zresponse2) {
					zresponse2 = JSON.parse(zresponse2);
					/* global user avatar - refresh list */
					WTW.getMyAvatarList(zwidth, zheight, true);
				}
			);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-deleteUserAvatar=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.hudLoginClick = function(zmoldname) {
	/* Hud Login Click - after default timer (allows for animation of button pressed) */
	try {
		if (zmoldname == 'hudlogin-button-loginwtw') {
			/* login menu */
			WTW.closeLoginHUD();
			if (dGet('wtw_tuserid').value == '') {
				wtw3dinternet.openGlobalLogin();
			} else {
				wtw3dinternet.logoutGlobal();
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-deleteUserAvatar=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.hudLoginLogin = function(zlocal, zemail, zpassword, zremembercheck) {
	/* run login attempt */
	try {
		if (zlocal == false) {
			if (zremembercheck) {
				WTW.setCookie('globalloginemail', zemail, 365);
				WTW.setCookie('globalloginpassword', btoa(zpassword), 365);
				WTW.setCookie('globalloginremember', zremembercheck, 365);
			} else {
				WTW.deleteCookie('globalloginemail');
				WTW.deleteCookie('globalloginpassword');
				WTW.deleteCookie('globalloginremember');
			}
			var zserverip = dGet('wtw_serverip').value;
			var zrequest = {
				'useremail':btoa(zemail),
				'password':btoa(zpassword),
				'serverip':btoa(zserverip),
				'function':'login'
			};
			WTW.postJSON("https://3dnet.walktheweb.com/connect/authenticate.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					var zuserid = '';
					var zdisplayname = '';
					var zuseremail = '';
					var zusertoken = '';
					var zwtwusertoken = '';
					if (zresponse.userid != undefined) {
						zuserid = zresponse.userid;
					}
					if (zresponse.displayname != undefined) {
						zdisplayname = zresponse.displayname;
					}
					if (zresponse.useremail != undefined) {
						zuseremail = zresponse.useremail;
					}
					if (zresponse.usertoken != undefined) {
						zusertoken = zresponse.usertoken;
					}
					if (zresponse.wtwusertoken != undefined) {
						zwtwusertoken = zresponse.wtwusertoken;
					}
					
					if (zusertoken.length > 100 || zuserid != '') {
						/* user global login successful - now use it to log on locally */
						dGet('wtw_tusertoken').value = zusertoken;
						dGet('wtw_tglobaluserid').value = zwtwusertoken;
						dGet('wtw_tuserid').value = zuserid;
						dGet('wtw_tuseremail').value = zuseremail;
						WTW.closeLoginHUD();
						var zrequest = {
							'globaluserid':zwtwusertoken,
							'usertoken':zusertoken,
							'displayname':btoa(zdisplayname),
							'useremail':zuseremail,
							'function':'globallogin'
						};
						WTW.postAsyncJSON('/core/handlers/users.php', zrequest,
							function(zresponse) {
								zresponse = JSON.parse(zresponse);
								/* continue if no errors */
								if (WTW.globalLoginResponse(zresponse)) {
									WTW.openLocalLogin('Select Avatar',.4,.9);
								}
							}
						);
					} else {
						/* there is an error */
						serror = zresponse.serror;
						dGet('wtw_tuserid').value = '';
						dGet('wtw_tuseremail').value = '';
						dGet('wtw_tdisplayname').value = '';
						dGet('wtw_mainmenudisplayname').innerHTML = 'Login';
						dGet('wtw_menudisplayname').innerHTML = 'Login';
						dGet('wtw_tuserimageurl').value = '';
						dGet('wtw_profileimagelg').src = '/content/system/images/menuprofilebig.png';
						dGet('wtw_profileimagesm').src = '/content/system/images/menuprofile32.png';

						WTW.log("Login Error = " + serror);
						var zinvalidlogin = WTW.getMeshOrNodeByID('hudlogin-invalidlogin');
						var zfocus = false;
						var zremember = WTW.getMeshOrNodeByID('hudlogin-check-remember');
						var zrememberborder = WTW.getMeshOrNodeByID('hudlogin-check-rememberborder');
						var zrememberborderfocus = WTW.getMeshOrNodeByID('hudlogin-check-rememberborderfocus');
						var zremembertext = WTW.getMeshOrNodeByID('hudlogin-check-remembertext');
						var zremember3dtext = WTW.getMeshOrNodeByID('hudlogin-check-remember-text');
						if (zinvalidlogin != null) {
							zinvalidlogin.isVisible = true;
						}
						if (zremember != null) {
							zremember.isVisible = false;
						}
						if (zrememberborder != null) {
							zrememberborder.isVisible = false;
						}
						if (zrememberborderfocus != null) {
							zfocus = zrememberborderfocus.isVisible;
							zrememberborderfocus.isVisible = false;
						}
						if (zremembertext != null) {
							zremembertext.isVisible = false;
						}
						if (zremember3dtext != null) {
							zremember3dtext.isVisible = false;
						}
						window.setTimeout(function(){
							zinvalidlogin = WTW.getMeshOrNodeByID('hudlogin-invalidlogin');
							zremember = WTW.getMeshOrNodeByID('hudlogin-check-remember');
							zrememberborder = WTW.getMeshOrNodeByID('hudlogin-check-rememberborder');
							zrememberborderfocus = WTW.getMeshOrNodeByID('hudlogin-check-rememberborderfocus');
							zremembertext = WTW.getMeshOrNodeByID('hudlogin-check-remembertext');
							zremember3dtext = WTW.getMeshOrNodeByID('hudlogin-check-remember-text');
							if (zinvalidlogin != null) {
								zinvalidlogin.isVisible = false;
							}
							if (zremember != null) {
								zremember.isVisible = true;
							}
							if (zfocus) {
								if (zrememberborderfocus != null) {
									zrememberborderfocus.isVisible = true;
								}
							} else {
								if (zrememberborder != null) {
									zrememberborder.isVisible = true;
								}
							}
							if (zremembertext != null) {
								zremembertext.isVisible = true;
							}
							if (zremember3dtext != null) {
								zremember3dtext.isVisible = true;
							}
						},5000);
					}
				}
			);
		} 
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-hudLoginLogin=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.hudLoginCreate = function(zlocal, zemail, zpassword, zpassword2) {
	/* run create Login */
	try {
		if (zlocal == false) {
			var zserverip = dGet('wtw_serverip').value;
			var zdisplayname = '';
			var zemailparts = zemail.split('@');
			zdisplayname = zemailparts[0];
			var zrequest = {
				'useremail':btoa(zemail),
				'password':btoa(zpassword),
				'password2':btoa(zpassword2),
				'displayname':btoa(zdisplayname),
				'serverip':btoa(zserverip),
				'function':'register'
			};
			WTW.postJSON("https://3dnet.walktheweb.com/connect/authenticate.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					var zuserid = '';
					var zdisplayname = '';
					var zuseremail = '';
					var zusertoken = '';
					var zwtwusertoken = '';
					if (zresponse.userid != undefined) {
						zuserid = zresponse.userid;
					}
					if (zresponse.displayname != undefined) {
						zdisplayname = zresponse.displayname;
					}
					if (zresponse.useremail != undefined) {
						zuseremail = zresponse.useremail;
					}
					if (zresponse.usertoken != undefined) {
						zusertoken = zresponse.usertoken;
					}
					if (zresponse.wtwusertoken != undefined) {
						zwtwusertoken = zresponse.wtwusertoken;
					}
					
					if (zusertoken.length > 100 || zuserid != '') {
						/* user global create login successful - now use it to log on locally */
						dGet('wtw_tusertoken').value = zusertoken;
						dGet('wtw_tglobaluserid').value = zwtwusertoken;
						dGet('wtw_tuserid').value = zuserid;
						dGet('wtw_tuseremail').value = zuseremail;
						WTW.closeLoginHUD();
						var zrequest = {
							'globaluserid':zwtwusertoken,
							'usertoken':zusertoken,
							'displayname':btoa(zdisplayname),
							'useremail':zuseremail,
							'function':'globallogin'
						};
						WTW.postAsyncJSON('/core/handlers/users.php', zrequest,
							function(zresponse) {
								zresponse = JSON.parse(zresponse);
								/* continue if no errors */
								if (WTW.globalLoginResponse(zresponse)) {
									WTW.openLocalLogin('Select Avatar',.4,.9);
								}
							}
						);
					} else {
						/* there is an error */
						var serror = zresponse.serror;
						dGet('wtw_tuserid').value = '';
						dGet('wtw_tuseremail').value = '';
						dGet('wtw_tdisplayname').value = '';
						dGet('wtw_mainmenudisplayname').innerHTML = 'Login';
						dGet('wtw_menudisplayname').innerHTML = 'Login';
						dGet('wtw_tuserimageurl').value = '';
						dGet('wtw_profileimagelg').src = '/content/system/images/menuprofilebig.png';
						dGet('wtw_profileimagesm').src = '/content/system/images/menuprofile32.png';

						WTW.log("Login Error = " + serror);
						var zinvalidlogin = WTW.getMeshOrNodeByID('hudlogin-invalidlogin');
						var zfocus = false;
						if (zinvalidlogin != null) {
							zinvalidlogin.isVisible = true;
						}
						window.setTimeout(function(){
							zinvalidlogin = WTW.getMeshOrNodeByID('hudlogin-invalidlogin');
							if (zinvalidlogin != null) {
								zinvalidlogin.isVisible = false;
							}
						},5000);
					}
				}
			);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-class_main.js-hudLoginCreate=' + ex.message);
	}
}


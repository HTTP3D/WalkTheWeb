/* All code is Copyright 2013-2021 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

function WTW_3DINTERNET() {
	/* Add your global variables as needed here */
	this.ver = "1.0.0";
	this.checkConnection = null;
	this.masterMove = '0';
	this.masterChat = '0';
	this.masterVoiceChat = '0';
	this.masterFranchising = '0';
	this.globalLogins = '0';
	this.localLogins = '1';
	this.anonymousLogins = '1';
	this.admin = null;
	this.move = null;
	this.chat = null;
	this.voicechat = null;
	this.lastAnimations = '';
	this.avatars = [];
	this.AvatarIDs = 1;
	this.multiPlayer = 20;
	this.multiPlayerOn = 1;
	this.typingTimer = null;
	this.mediaStream = null;
	this.recordAudio = null;
	this.recordVideo = null;
	this.mediaSocket = null;
}

/* Create the class instance */
var wtw3dinternet = new WTW_3DINTERNET();

WTW_3DINTERNET.prototype.onClick = function(zpickedname) {
	try {
		zpickedname = zpickedname.toLowerCase();
		let zmoldnameparts = WTW.getMoldnameParts(zpickedname);
		if (zpickedname.indexOf('person') > -1) {
			wtw3dinternet.avatarConnectMenu(zmoldnameparts.instanceid);
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-onClick=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.avatarConnectMenu = function(ztoinstanceid) {
	try {
		if (dGet("wtw3dinternet_connect" + ztoinstanceid) == null) {
			var zdisplayname = wtw3dinternet.getAvatarDisplayName(ztoinstanceid);
			var zform = "<div id=\"wtw3dinternet_connect" + ztoinstanceid + "\" class='wtw3dinternet-chatboxshadow'>" + 
					"<img class='wtw-closeright' onclick=\"wtw3dinternet.closeAvatarConnectMenu('" + ztoinstanceid + "');\" src='/content/system/images/menuclosegrey.png' alt='Close' title='Close' onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclosegrey.png';\" />" + 
					"<div class='wtw3dinternet-chatdisplayname'>" + zdisplayname + "</div><div style=\"clear:both;\"></div>" + 
					"<div class='wtw3dinternet-chatuserinstance'>ID: " + ztoinstanceid + "</div><div style=\"clear:both;\"></div>" + 
					"<div id=\"wtw_startchat" + ztoinstanceid + "\" class=\"wtw3dinternet-button\" onclick=\"wtw3dinternet.closeAvatarConnectMenu('" + ztoinstanceid + "');wtw3dinternet.startChat('" + ztoinstanceid + "');\">Private Chat</div>" +
					"<div id=\"wtw_startvoicechat" + ztoinstanceid + "\" class=\"wtw3dinternet-button\" onclick=\"wtw3dinternet.closeAvatarConnectMenu('" + ztoinstanceid + "');wtw3dinternet.startVoiceChat('" + ztoinstanceid + "');\">Private Voice Chat</div>" +
				"</div>";
			dGet('wtw_startconnect').innerHTML += zform;
		}
		WTW.show('wtw_startconnect');
		WTW.showSettingsMenu('wtw_menuchat');
		if (dGet('wtw3dinternet_connect-' + ztoinstanceid) != null) {
			dGet('wtw3dinternet_connect-' + ztoinstanceid).scrollTop = dGet('wtw3dinternet_connect-' + ztoinstanceid).scrollHeight;
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-avatarConnectMenu=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.closeAvatarConnectMenu = function(ztoinstanceid) {
	try {
		if (dGet('wtw_startconnect') != null && dGet("wtw3dinternet_connect" + ztoinstanceid ) != null) {
			dGet('wtw_startconnect').removeChild(dGet("wtw3dinternet_connect" + ztoinstanceid ));
		}
		if (dGet('wtw_chatsendrequests').innerHTML == '') {
			WTW.hide('wtw_menuchat');
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-closeAvatarConnectMenu=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.checkHovers = function(zmoldname, zshape) {
	try {
		if (zmoldname.indexOf('person-') > -1) {
			if (wtw3dinternet.masterChat == '1' || wtw3dinternet.masterVoiceChat == '1') {
				WTW.showToolTip('Click to Chat');
			}
		}
	} catch(ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-checkHovers=" + ex.message);
	}
}

WTW_3DINTERNET.prototype.resetHovers = function(zmoldname, zshape) {
	try {
		WTW.hideToolTip();
	} catch(ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-resetHovers=" + ex.message);
	}
}

WTW_3DINTERNET.prototype.loadUserSettingsAfterEngine = function() {
	try {
		/* 10 second delay on starting multiplayer so that initial scene is completely loaded. */
		window.setTimeout(function() {
			wtw3dinternet.initAdminSocket();
			if (wtw3dinternet.masterMove == '1') {
				wtw3dinternet.initMoveSocket();
			}
			if (wtw3dinternet.masterChat == '1') {
				wtw3dinternet.initChatSocket();
			}
			if (wtw3dinternet.masterVoiceChat == '1') {
				wtw3dinternet.initVoiceChatSocket();
			}
		},10000);
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-loadUserSettingsAfterEngine=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.loadLoginSettings = function(zloaddefault) {
	try {
		WTW.getSettings("wtw3dinternet_enableGlobal, wtw3dinternet_enableLocal, wtw3dinternet_enableAnonymous, wtw3dinternet_masterMove, wtw3dinternet_masterChat, wtw3dinternet_masterVoiceChat, wtw3dinternet_masterFranchising", "wtw3dinternet.responseLoadLoginSettings");
		
		var zavatarids = WTW.getCookie("AvatarIDs");
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
		var zmultiplayeron = WTW.getCookie("multiplayeron");
		if (zmultiplayeron != null) {
			if (zmultiplayeron == "0") {
				wtw3dinternet.multiPlayerOn = 0;
				dGet('wtw_submenumultiplayertext').innerHTML = 'Multi-Player is Off';
				dGet('wtw_submenumultiplayer').src = '/content/system/images/menumultiplayeroff.png';
				dGet('wtw_submenumultiplayer').alt = 'Turn Multi-Player On';
				dGet('wtw_submenumultiplayer').title = 'Turn Multi-Player On';
			}
		}
		var zmultiplayer = WTW.getCookie("multiplayer");
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
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-loadLoginSettings=" + ex.message);
	} 
	return zloaddefault;
}

WTW_3DINTERNET.prototype.responseLoadLoginSettings = async function(zsettings, zparameters) {
	try {
		zsetting = JSON.parse(zsettings);
		if (zsetting.wtw3dinternet_enableGlobal != undefined) {
			if (zsetting.wtw3dinternet_enableGlobal != '') {
				wtw3dinternet.globalLogins = zsetting.wtw3dinternet_enableGlobal;					
			}
		}
		if (zsetting.wtw3dinternet_enableLocal != undefined) {
			if (zsetting.wtw3dinternet_enableLocal != '') {
				wtw3dinternet.localLogins = zsetting.wtw3dinternet_enableLocal;					
			}
		}
		if (zsetting.wtw3dinternet_enableAnonymous != undefined) {
			if (zsetting.wtw3dinternet_enableAnonymous != '') {
				wtw3dinternet.anonymousLogins = zsetting.wtw3dinternet_enableAnonymous;					
			}
		}
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
		if (zsetting.wtw3dinternet_masterFranchising != undefined) {
			if (zsetting.wtw3dinternet_masterFranchising != '') {
				wtw3dinternet.masterFranchising = zsetting.wtw3dinternet_masterFranchising;
			}
		}
		if (wtw3dinternet.globalLogins != '1') {
			wtw3dinternet.localLogins = '1';
		}
		wtw3dinternet.setControlPanelSwitches();
		WTW.loadLoginAvatarSelect();

		/* check for purchased services */
		WTW.getAsyncJSON("https://3dnet.walktheweb.com/connect/myservices.php?serverinstanceid=" + dGet('wtw_serverinstanceid').value + "&serverip=" + dGet('wtw_serverip').value, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				wtw3dinternet.setActiveText(zresponse);
			}
		);		
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-responseLoadUserSettings=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.setActiveText = function(zresponse) {
	try {
		if (zresponse != null) {
			for (var i=0;i<zresponse.length;i++) {
				if (zresponse[i] != null) {
					switch (zresponse[i].service) {
						case 'multiplayer':
							if (zresponse[i].expiredate != '') {
								if (dGet('wtw3dinternet_multiplayertext') != null) {
									dGet('wtw3dinternet_multiplayertext').innerHTML = "<b>" + zresponse[i].maxusers + " Users</b> Multiplayer Active<br />Expires on " + WTW.formatDate(zresponse[i].expiredate);
									dGet('wtw3dinternet_multiplayertext').innerHTML += "<div class='wtw3dinternet-chatbuttonaccept' onclick=\"wtw3dinternet.openActivateWindow();\">Expand</div>";
								}
							}
							break;
						case 'chat':
							if (zresponse[i].expiredate != '') {
								if (dGet('wtw3dinternet_chattext') != null) {
									dGet('wtw3dinternet_chattext').innerHTML = "<b>" + zresponse[i].maxusers + " Users</b> Chat Active<br />Expires on " + WTW.formatDate(zresponse[i].expiredate);
								}
							}
							break;
						case 'voicechat':
							if (zresponse[i].expiredate != '') {
								if (dGet('wtw3dinternet_voicechattext') != null) {
									dGet('wtw3dinternet_voicechattext').innerHTML = "<b>" + zresponse[i].maxusers + " Users</b> Voice Chat Active<br />Expires on " + WTW.formatDate(zresponse[i].expiredate);
								}
							}
							break;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-setActiveText=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.setControlPanelSwitches = function() {
	try {
		if (WTW.adminView == 1) {
			if (dGet('wtw3dinternet_enableglobaltext') != null) {
				if (wtw3dinternet.globalLogins == '1') {
					dGet('wtw3dinternet_enableglobaltext').className = 'wtw-enablelabel';
					dGet('wtw3dinternet_enableglobaltext').innerHTML = 'Global Login/Avatars Enabled';
					dGet('wtw3dinternet_enableglobal').checked = true;
				} else {
					dGet('wtw3dinternet_enableglobaltext').className = 'wtw-disabledlabel';
					dGet('wtw3dinternet_enableglobaltext').innerHTML = 'Global Login/Avatars Disabled';
					dGet('wtw3dinternet_enableglobal').checked = false;
				}
				if (wtw3dinternet.localLogins == '1') {
					dGet('wtw3dinternet_enablelocaltext').className = 'wtw-enablelabel';
					dGet('wtw3dinternet_enablelocaltext').innerHTML = 'Local Login/Avatars Enabled';
					dGet('wtw3dinternet_enablelocal').checked = true;
				} else {
					dGet('wtw3dinternet_enablelocaltext').className = 'wtw-disabledlabel';
					dGet('wtw3dinternet_enablelocaltext').innerHTML = 'Local Login/Avatars Disabled';
					dGet('wtw3dinternet_enablelocal').checked = false;
				}
				if (wtw3dinternet.anonymousLogins == '1') {
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
				if (wtw3dinternet.masterFranchising == '1') {
					dGet('wtw3dinternet_enablefranchisebuildingstext').className = 'wtw-enablelabel';
					dGet('wtw3dinternet_enablefranchisebuildingstext').innerHTML = '3D Buildings Franchising Enabled';
					dGet('wtw3dinternet_enablefranchisebuildings').checked = true;
				} else {
					dGet('wtw3dinternet_enablefranchisebuildingstext').className = 'wtw-disabledlabel';
					dGet('wtw3dinternet_enablefranchisebuildingstext').innerHTML = '3D Buildings Franchising Disabled';
					dGet('wtw3dinternet_enablefranchisebuildings').checked = false;
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-setControlPanelSwitches=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.changeSwitch = function(zobj) {
	try {
		let zchecked = '0';
		if (zobj.checked) {
			zchecked = '1';
		}
		switch (zobj.id) {
			case "wtw3dinternet_enableglobal":
				wtw3dinternet.globalLogins = zchecked;
				if (zchecked == '0') {
					wtw3dinternet.localLogins = '1';
				}
				break;
			case "wtw3dinternet_enablelocal":
				wtw3dinternet.localLogins = zchecked;
				if (zchecked == '0') {
					wtw3dinternet.globalLogins = '1';
				}
				break;
			case "wtw3dinternet_enableanonymous":
				wtw3dinternet.anonymousLogins = zchecked;
				break;
			case "wtw3dinternet_enablemultiplayer":
				wtw3dinternet.enableMultiplayer(zchecked);
				break;
			case "wtw3dinternet_enablechat":
				wtw3dinternet.enableChat(zchecked);
				break;
			case "wtw3dinternet_enablevoicechat":
				wtw3dinternet.enableVoiceChat(zchecked);
				break;
			case "masterFranchising":
				wtw3dinternet.masterFranchising = zchecked;
				break;
		}
		wtw3dinternet.setControlPanelSwitches();
		let zsettings = {
			'wtw3dinternet_enableGlobal': wtw3dinternet.globalLogins,
			'wtw3dinternet_enableLocal': wtw3dinternet.localLogins,
			'wtw3dinternet_enableAnonymous': wtw3dinternet.anonymousLogins,
			'wtw3dinternet_masterMove': wtw3dinternet.masterMove,
			'wtw3dinternet_masterChat': wtw3dinternet.masterChat,
			'wtw3dinternet_masterVoiceChat': wtw3dinternet.masterVoiceChat,
			'wtw3dinternet_masterFranchising': wtw3dinternet.masterFranchising
		};
		WTW.saveSettings(zsettings, null);		
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-changeSwitch=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.serviceCheck = async function(zservice) {
	try {
		WTW.getAsyncJSON("https://3dnet.walktheweb.com/connect/servicecheck.php?serverinstanceid=" + dGet('wtw_serverinstanceid').value + "&serverip=" + dGet('wtw_serverip').value + "&service=" + zservice + "&userid=" + dGet('wtw_tuserid').value, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.serror != undefined) {
					if (zresponse.service == 'multiplayer') {
						if (zresponse.serror != '') {
							dGet('wtw3dinternet_multiplayertext').innerHTML = zresponse.serror;
							dGet('wtw3dinternet_enablechat').disabled = true;
							dGet('wtw3dinternet_enablevoicechat').disabled = true;
							if (zresponse.serror == 'Service Activation not found') {
								dGet('wtw3dinternet_multiplayertext').innerHTML += "<div class='wtw3dinternet-chatbuttonaccept' onclick=\"wtw3dinternet.openActivateWindow();\">Activate</div>";
							} else if (zresponse.serror.indexOf('suspended') > -1) {
							} else if (zresponse.serror.indexOf('banned') > -1) {
							} else if (zresponse.serror.indexOf('hold') > -1) {
							} else if (zresponse.serror.indexOf('expired') > -1) {
								dGet('wtw3dinternet_multiplayertext').innerHTML += "<div class='wtw3dinternet-chatbuttonaccept' onclick=\"wtw3dinternet.openActivateWindow();\">Renew</div>";
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
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-serviceCheck=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.enableMultiplayer = function(zchecked) {
	try {
		/* toggle multiplayer on or off */
		wtw3dinternet.masterMove = zchecked;
		if (wtw3dinternet.masterMove == '1') {
			/* check if the multiplayer service is activated */
			wtw3dinternet.serviceCheck('multiplayer');
			/* attempt to turn on multiplayer (turn off hold) */
			if (wtw3dinternet.admin == null) {
				wtw3dinternet.admin.emit('hold', {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
					'roomid':communityid + buildingid + thingid,
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
					'roomid':communityid + buildingid + thingid,
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
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-enableMultiplayer=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.purchaseComplete = async function() {
	try {
		/* close purchase window */
		WTW.closeIFrame();

		/* check for purchased services */
		WTW.getAsyncJSON("https://3dnet.walktheweb.com/connect/myservices.php?serverinstanceid=" + dGet('wtw_serverinstanceid').value + "&serverip=" + dGet('wtw_serverip').value, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				wtw3dinternet.setActiveText(zresponse);
			}
		);
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-purchaseComplete=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.openActivateWindow = function() {
	try {
		WTW.openIFrame("https://3dnet.walktheweb.com/core/pages/serviceactivation.php?serverinstanceid=" + btoa(dGet('wtw_serverinstanceid').value) + "&domainname=" + btoa(wtw_domainname) + "&domainurl=" + btoa(wtw_domainurl) + "&websiteurl=" + btoa(wtw_websiteurl) + "&serverip=" + btoa(dGet('wtw_serverip').value) + "&userid=" + btoa(dGet('wtw_tuserid').value) + "&useremail=" + btoa(dGet('wtw_tuseremail').value), .5, .7, "WalkTheWeb Service Activation");
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-openActivateWindow=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.enableChat = async function(zchecked) {
	try {
		wtw3dinternet.masterChat = zchecked;
		if (wtw3dinternet.masterChat == '1') {
			/* attempt to turn on chat (hold off) */
			wtw3dinternet.initChatSocket();
			WTW.getAsyncJSON("https://3dnet.walktheweb.com/connect/servicehold.php?serverinstanceid=" + dGet('wtw_serverinstanceid').value + "&serverip=" + dGet('wtw_serverip').value + "&service=chat&hold=0&userid=" + dGet('wtw_tuserid').value, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					wtw3dinternet.setActiveText(zresponse);
				}
			);
		} else {
			/* set chat on hold */
			WTW.getAsyncJSON("https://3dnet.walktheweb.com/connect/servicehold.php?serverinstanceid=" + dGet('wtw_serverinstanceid').value + "&serverip=" + dGet('wtw_serverip').value + "&service=chat&hold=1&userid=" + dGet('wtw_tuserid').value, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					wtw3dinternet.setActiveText(zresponse);
				}
			);
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-enableChat=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.enableVoiceChat = async function(zchecked) {
	try {
		wtw3dinternet.masterVoiceChat = zchecked;
		if (wtw3dinternet.masterVoiceChat == '1') {
			/* attempt to turn on voice chat (hold off) */
			wtw3dinternet.initVoiceChatSocket();
			WTW.getAsyncJSON("https://3dnet.walktheweb.com/connect/servicehold.php?serverinstanceid=" + dGet('wtw_serverinstanceid').value + "&serverip=" + dGet('wtw_serverip').value + "&service=voicechat&hold=0&userid=" + dGet('wtw_tuserid').value, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					wtw3dinternet.setActiveText(zresponse);
				}
			);
		} else {
			/* set voice chat on hold */
			WTW.getAsyncJSON("https://3dnet.walktheweb.com/connect/servicehold.php?serverinstanceid=" + dGet('wtw_serverinstanceid').value + "&serverip=" + dGet('wtw_serverip').value + "&service=voicechat&hold=1&userid=" + dGet('wtw_tuserid').value, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					wtw3dinternet.setActiveText(zresponse);
				}
			);
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-enableVoiceChat=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.beforeUnloadMove = function() {
	try {
		wtw3dinternet.avatars = [];
		if (wtw3dinternet.move != null) {
			wtw3dinternet.move.emit('disconnect', {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'roomid':communityid + buildingid + thingid,
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
				'roomid':communityid + buildingid + thingid,
				'domainurl':wtw_domainurl,
				'siteurl':wtw_websiteurl,
				'instanceid':dGet('wtw_tinstanceid').value,
				'userid':dGet('wtw_tuserid').value,
				'displayname':btoa(dGet('wtw_tdisplayname').value)
			});
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-beforeUnloadMove=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.openLocalLogin = function(zitem, zwidth, zheight) {
	try {
		let zpagediv = "";
		switch (zitem) {
			case "Global Local Profile":
				zpagediv += "<h2 class=\"wtw-login\">WalkTheWeb Profile</h2>";
				
				dGet('wtw_ipagediv').innerHTML = zpagediv;
				break;
			case "Login Menu":
				zpagediv += "<h2 class=\"wtw-login\">Login Menu</h2>";
				if (wtw3dinternet.globalLogins == '1') {
					zpagediv += "<div class=\"wtw-loginbutton\" onclick=\"WTW.openGlobalLogin();\"><img src=\"/content/system/images/menuwtw.png\" alt=\"WalkTheWeb\" title=\"WalkTheWeb\" class=\"wtw-loginlogo\"/><img id=\"wtw_globalcheck\" src=\"/content/system/images/greencheck.png\" class=\"wtw-checkcircle\" /><div style=\"margin-top:4px;\">WalkTheWeb Login<br /><span style=\"font-size:.6em;\">(Works on most WalkTheWeb 3D Websites)</span></div></div>";
				}
				if (wtw3dinternet.localLogins == '1') {
					zpagediv += "<div class=\"wtw-loginbutton\" onclick=\"WTW.openLocalLogin('3D Website Login', .3, .6);\"><img src=\"/content/system/images/icon-128x128.jpg\" alt=\"HTTP3D Inc.\" title=\"HTTP3D Inc.\" class=\"wtw-loginlogo\"/><img id=\"wtw_localcheck\" src=\"/content/system/images/greencheck.png\" class=\"wtw-checkcircle\" /><div style=\"margin-top:4px;\">3D Website Login<br /><span style=\"font-size:.6em;\">(3D Websites on this Server Only)</span></div></div>";
				}
				if (dGet('wtw_tuserid').value != '') {
					if (wtw3dinternet.globalLogins == '1') {
						zpagediv += "<div class=\"wtw-logincancel\" onclick=\"WTW.logoutGlobal();\">Logout WalkTheWeb</div>&nbsp;&nbsp;";
					}
					if (wtw3dinternet.localLogins == '1') {
						zpagediv += "<div class=\"wtw-logincancel\" onclick=\"WTW.logout();\" style=\"width:170px;\">Logout 3D Website Only</div>";
					}
				} else {
					if (wtw3dinternet.anonymousLogins == '1') {
						zpagediv += "<div class=\"wtw-loginbutton\" onclick=\"WTW.openLocalLogin('Select an Anonymous Avatar', .3, .5);\"><img src=\"/content/system/images/menuprofilebig.png\" alt=\"Anonymous Login\" title=\"Anonymous Login\" class=\"wtw-loginlogo\"/><div style=\"margin-top:10px;\">Continue as Guest</div></div>";
					}
				}
				dGet('wtw_ipagediv').innerHTML = zpagediv;
				if (dGet('wtw_tusertoken').value == '' || wtw3dinternet.globalLogins != '1') {
					if (dGet('wtw_globalcheck') != null) {
						dGet('wtw_globalcheck').style.visibility = 'hidden';
					}
				}
				if (dGet('wtw_tuserid').value == '' || wtw3dinternet.localLogins != '1') {
					if (dGet('wtw_localcheck') != null) {
						dGet('wtw_localcheck').style.visibility = 'hidden';
					}
				}
				break;
		}
	} catch(ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-openLocalLogin=" + ex.message);
	}
}

WTW_3DINTERNET.prototype.getMyAvatarList = function(zloaddefault) {
	try {
		let zmyavatars = [];
		let zlocalcomplete = false;
		let zglobalcomplete = false;
		if (wtw3dinternet.localLogins == '1') {
			if (dGet('wtw_myavatars') != null) {
				WTW.getJSON("/connect/avatars.php?groups=my", 
					function(zresponse) {
						if (zresponse != null) {
							zresponse = JSON.parse(zresponse);
							if (zresponse.avatars != null) {
								if (zresponse.avatars.length > 0) {
									for (var i=0;i<zresponse.avatars.length;i++) {
										if (zresponse.avatars[i] != null) {
											zmyavatars[zmyavatars.length] = {
												'globaluseravatarid': '',
												'useravatarid': zresponse.avatars[i].useravatarid,
												'avatarid': zresponse.avatars[i].avatarid,
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
						if (zglobalcomplete || wtw3dinternet.globalLogins != '1') {
							WTW.showMyAvatarList(zmyavatars, .4, .8);
						}
					}
				);
			}
		}
		if (wtw3dinternet.globalLogins == '1') {
			if (dGet('wtw_myavatars') != null) {
				// call for global list
				var zrequest = {
					'usertoken':dGet('wtw_tusertoken').value,
					'globaluserid':btoa(dGet('wtw_tglobaluserid').value),
					'serverinstanceid':btoa(dGet('wtw_serverinstanceid').value),
					'groups':'my',
					'function':'getmyglobalavatars'
				};
				WTW.postJSON("https://3dnet.walktheweb.com/connect/globalavatars.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						if (zresponse.avatars != null) {
							if (zresponse.avatars.length > 0) {
								for (var i=0;i<zresponse.avatars.length;i++) {
									if (zresponse.avatars[i] != null) {
										zmyavatars[zmyavatars.length] = {
											'globaluseravatarid': zresponse.avatars[i].globaluseravatarid,
											'useravatarid': zresponse.avatars[i].useravatarid,
											'avatarid': zresponse.avatars[i].avatarid,
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
						if (zlocalcomplete || wtw3dinternet.localLogins != '1') {
							WTW.showMyAvatarList(zmyavatars, .4, .8);
						}
					}
				);
			}
		}
		zloaddefault = false;
	} catch(ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-getMyAvatarList=" + ex.message);
	}
	return zloaddefault;
}

WTW_3DINTERNET.prototype.onMyAvatarSelect = function(zglobaluseravatarid, zuseravatarid, zavatarid) {
	var zloading = false;
	try {
		if (wtw3dinternet.globalLogins == '1') {
			if (zglobaluseravatarid == '' && zuseravatarid != '') {
				var zdisplayname = 'Anonymous';
				if (dGet('wtw_tnewavatardisplayname') != null) {
					zdisplayname = dGet('wtw_tnewavatardisplayname').value;
				}
				var zprotocol = '0';
				if (wtw_protocol == "https://") {
					zprotocol = '1';
				}
				zloading = true;

				var zrequest = {
					'useravatarid': zuseravatarid,
					'function':'setuseravatarglobalhash'
				};
				WTW.postAsyncJSON("/core/handlers/avatars.php", zrequest, 
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
									'instanceid': dGet("wtw_tinstanceid").value,
									'domain': wtw_domainname,
									'secureprotocol': zprotocol,
									'displayname':btoa(zdisplayname),
									'function':'quicksaveavatar'
								};
								WTW.postAsyncJSON("https://3dnet.walktheweb.com/connect/globalquicksaveavatar.php", zrequest, 
									function(zresponse) {
										zresponse = JSON.parse(zresponse);
										/* note serror would contain errors */
										if (zresponse.globaluseravatarid != undefined) {
											WTW.setCookie("globaluseravatarid", zresponse.globaluseravatarid, 365);
											WTW.getSavedAvatar("myavatar-" + dGet("wtw_tinstanceid").value, zresponse.globaluseravatarid, zuseravatarid, zavatarid, true);
										} else {
											WTW.getSavedAvatar("myavatar-" + dGet("wtw_tinstanceid").value, zglobaluseravatarid, zuseravatarid, zavatarid, true);
										}
									}
								);
							}
						}
					}
				);
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-onMyAvatarSelect=" + ex.message);
	} 
	return zloading;
}

WTW_3DINTERNET.prototype.getAvatarDisplayName = function(zinstanceid) {
	var zdisplayname = "";
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
		WTW.log("plugins:wtw-3dinternet:scripts-class_main.js-getAvatarDisplayName=" + ex.message);
	}
	return zdisplayname;
}

/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

WTW_3DINTERNET.prototype.initChatSocket = function() {
	/* initiate the listeners for WalkTheWeb Chat channel for multiplayer */
	try {
		if (wtw3dinternet.chat == null) {
			wtw3dinternet.chat = io.connect('https://3dnet.walktheweb.network/chat', {transports: ['websocket', "polling"]});

			wtw3dinternet.chat.emit('wtwconnect', {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'serverip':dGet('wtw_serverip').value,
				'userip':dGet('wtw_tuserip').value,
				'instanceid':dGet('wtw_tinstanceid').value,
				'domainurl':wtw_domainurl
			});

			wtw3dinternet.chat.on('reconnect', function(zdata) {
				wtw3dinternet.chat.emit('wtwconnect', {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
					'userip':dGet('wtw_tuserip').value,
					'instanceid':dGet('wtw_tinstanceid').value,
					'domainurl':wtw_domainurl
				});
				wtw3dinternet.reconnectLoadZones();
			});

			wtw3dinternet.chat.on('disconnect', function(zdata) {
				wtw3dinternet.chat.emit('wtwconnect', {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
					'userip':dGet('wtw_tuserip').value,
					'instanceid':dGet('wtw_tinstanceid').value,
					'domainurl':wtw_domainurl
				});
			});

			wtw3dinternet.chat.on('user left', function(zdata) {

			});




			wtw3dinternet.chat.on('serror', function(zresponse) {
				var zcolor = 'white';
				var zchannel = '';
				var zerror = JSON.stringify(zresponse);
				if (zresponse != null) {
					if (zresponse.channel != undefined) {
						zchannel = zresponse.channel;
						switch (zchannel) {
							case 'admin':
								zcolor = 'yellow';
								break;
							case 'move':
								zcolor = 'pink';
								break;
							case 'chat':
								zcolor = 'white';
								break;
						}
					}
					if (zresponse.page != undefined) {
						zchannel += '-' + zresponse.page;
					}
					if (zresponse.error != undefined) {
						zerror = atob(zresponse.error);
					}
				}
				WTW.log(zchannel + ' = ' + zerror, zcolor);
			});
			
/*
			
			wtw3dinternet.chat.on('reconnect_error', function(zdata) {
//				WTW.log('Chat-RECONNECT_ERROR=' + JSON.stringify(zdata), 'red');
			});
*/
			wtw3dinternet.chat.on('chat invite', function(zdata) {
				if (wtw3dinternet.masterChat == '1') {
					if (wtw3dinternet.isBlockedOrBanned(zdata.frominstanceid) == false) {
						if (dGet('wtw_chatbox-' + zdata.chatid) == null) {
							var zdisplayname = wtw3dinternet.getAvatarDisplayName(zdata.frominstanceid);
							dGet('wtw_chatsendrequests').innerHTML += wtw3dinternet.addChatBox(zdata.chatid, zdisplayname, 'Chat Request from ' + zdisplayname + '.<br />');
							WTW.showInline('wtw_chataccept-' + zdata.chatid);
							WTW.showInline('wtw_chatdecline-' + zdata.chatid);
							wtw3dinternet.chatSetScroll(zdata.chatid, false);
						}
						wtw3dinternet.chatSetScroll(zdata.chatid, true);
						WTW.show('wtw_3dinternetchatform');
					}
				}
			});
			
			wtw3dinternet.chat.on('receive chat', function(zdata) {
				if (wtw3dinternet.masterChat == '1') {
					if (wtw3dinternet.isBlockedOrBanned(zdata.frominstanceid) == false) {
						var ztext = WTW.decode(zdata.text);
						var zdisplayname = WTW.decode(zdata.displayname);
						if (zdisplayname == '') {
							zdisplayname = wtw3dinternet.getAvatarDisplayName(zdata.frominstanceid);
						}
						if (ztext.length > 0) {
							if (dGet('wtw_chattext-' + zdata.chatid) != null) {
								dGet('wtw_chattext-' + zdata.chatid).innerHTML += "<span class='wtw3dinternet-chatthem'><b>" + WTW.encode(atob(zdisplayname)) + "</b>: " + WTW.encode(ztext) + "</span><hr class='wtw3dinternet-chathr' />";
							}
						}
						wtw3dinternet.chatSetScroll(zdata.chatid, true);
					}
				}
			});

			wtw3dinternet.chat.on('receive chat command', function(zdata) {
				if (wtw3dinternet.masterChat == '1') {
					if (wtw3dinternet.isBlockedOrBanned(zdata.frominstanceid) == false) {
						wtw3dinternet.processChatCommand(zdata);
					}
				}
			});

			wtw3dinternet.chat.on('typing received', function(zdata) {
				if (wtw3dinternet.masterChat == '1') {
					if (wtw3dinternet.isBlockedOrBanned(zdata.frominstanceid) == false) {
						wtw3dinternet.processChatCommand(zdata);
					}
				}
			});

			wtw3dinternet.chat.on('stop typing received', function(zdata) {
				if (wtw3dinternet.masterChat == '1') {
					if (wtw3dinternet.isBlockedOrBanned(zdata.frominstanceid) == false) {
						wtw3dinternet.processChatCommand(zdata);
					}
				}
			});

			wtw3dinternet.chat.on('receive group chat', function(zdata) {
				if (wtw3dinternet.masterChat == '1') {
					if (wtw3dinternet.isBlockedOrBanned(zdata.instanceid) == false) {

						var ztimestamp = Math.round(new Date().getTime()/1000);
						wtw3dinternet.chatText[wtw3dinternet.chatText.length] = {
							'userid' : zdata.userid,
							'displayname' : zdata.displayname,
							'diffuse' : zdata.diffuse,
							'specular' : zdata.specular,
							'ambient' : zdata.ambient,
							'emissive' : zdata.emissive,
							'timestamp' : ztimestamp,
							'text' : zdata.text
						};
						wtw3dinternet.refreshChatText();
						wtw3dinternet.clearTextTimer();
					}
				}
			});
			
			wtw3dinternet.chat.on('block or ban user', function(zdata) {
				if (wtw3dinternet.masterChat == '1') {
					wtw3dinternet.receiveBlockOrBan(zdata);
				}
			});			
			
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-initChatSocket=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.enterChatLoadZone = function(zmoldname, zmolddef) {
	/* enter chat zone for group chat */
	try {
		if (wtw3dinternet.masterChat == '1') {
			var zstartchat = window.setInterval(function(){
				if (wtw3dinternet.chat != null) {
					/* communityid is read from scene while building and thing are read from action zone */
					wtw3dinternet.chat.emit('enter zone', {
						'serverinstanceid':dGet('wtw_serverinstanceid').value,
						'serverip':dGet('wtw_serverip').value,
						'communityid':communityid,
						'buildingid':zmolddef.buildinginfo.buildingid,
						'thingid':zmolddef.thinginfo.thingid,
						'instanceid':dGet('wtw_tinstanceid').value,
						'avatarid':dGet('wtw_tavatarid').value,
						'globaluseravatarid':dGet('wtw_tglobaluseravatarid').value,
						'useravatarid':dGet('wtw_tuseravatarid').value,
						'userid':dGet('wtw_tuserid').value,
						'placeholder':WTW.placeHolder,
						'displayname':btoa(dGet('wtw_tdisplayname').value)
					});
					window.clearInterval(zstartchat);
					zstartchat = null;
				}
			},500);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-enterChatLoadZone=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.exitChatLoadZone = function(zmoldname, zmolddef) {
	/* exit chat zone for group chat */
	try {
		if (wtw3dinternet.masterChat == '1') {
			var zactionzone = WTW.getMeshOrNodeByID(zmoldname);
			/* check mold to avoid multiple execution of code */
			if (wtw3dinternet.chat != null && zactionzone != null) {
				wtw3dinternet.chat.emit('exit zone', {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
					'communityid':zmolddef.communityinfo.communityid,
					'buildingid':zmolddef.buildinginfo.buildingid,
					'thingid':zmolddef.thinginfo.thingid,
					'instanceid':dGet('wtw_tinstanceid').value,
					'avatarid':dGet('wtw_tavatarid').value,
					'userid':dGet('wtw_tuserid').value,
					'displayname':btoa(dGet('wtw_tdisplayname').value)
				});
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-exitChatLoadZone=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.beforeUnloadChat = function() {
	/* announce leaving before closing chat */
	try {
		var zchats = dGet('wtw_chatsendrequests').childNodes;
		for (var i=0; i<zchats.length; i++) {
			if (zchats[i] != null) {
				if (zchats[i].id != undefined) {
					if (zchats[i].id.indexOf('wtw_chatbox-') > -1) {
						let nameparts = zchats[i].id.split('-');
						if (nameparts[1] != null) {
							wtw3dinternet.sendMessage('chat', nameparts[1], '', 'chat command', 'leave chat');
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-beforeUnloadChat=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.processChatCommand = function(zdata) {
	/* process personal chat command */ 
	try {
		if (wtw3dinternet.masterChat == '1') {
			if (wtw3dinternet.isBlockedOrBanned(zdata.frominstanceid) == false) {
				if (dGet('wtw_chatbox-' + zdata.chatid) != null) {
					var zdisplayname = wtw3dinternet.getAvatarDisplayName(zdata.frominstanceid);
					ztext = '';
					switch (zdata.text) {
						case 'decline chat':
							ztext = "<span class='wtw3dinternet-chatrednote'><b>" + zdisplayname + ":</b> Sorry, I can not chat right now.</span><br />";
							ztext += "<div id='wtw_chatclosenow-" + zdata.chatid + "' class='wtw3dinternet-chatbuttondecline' onclick=\"wtw3dinternet.closeChat('" + zdata.chatid + "');\">Close</div>";
							break;
						case 'leave chat':
							ztext = "<span class='wtw3dinternet-chatnote'><b>" + zdisplayname + "</b> has left the chat.</span>";
							WTW.hide('wtw_chattyping-' + zdata.chatid);
							WTW.hide('wtw_chatadd-' + zdata.chatid);
							WTW.hide('wtw_chattextsend-' + zdata.chatid);
							WTW.show('wtw_chatok-' + zdata.chatid);
							break;
						case 'accept chat':
							wtw3dinternet.acceptChat(zdata.chatid, zdisplayname);
							break;
						case 'typing':
							dGet('wtw_chattyping-' + zdata.chatid).innerHTML = zdisplayname + ' is typing...';
							dGet('wtw_chattyping-' + zdata.chatid).style.visibility = 'visible';
							break;
						case 'stop typing':
							dGet('wtw_chattyping-' + zdata.chatid).innerHTML = '';
							dGet('wtw_chattyping-' + zdata.chatid).style.visibility = 'hidden';
							break;
					}
					if (ztext != '' && dGet('wtw_chattext-' + zdata.chatid) != null) {
						dGet('wtw_chattext-' + zdata.chatid).innerHTML += ztext + "<hr class='wtw3dinternet-chathr' />";
					}
					wtw3dinternet.chatSetScroll(zdata.chatid, true);
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-processChatCommand=' + ex.message);
	} 
}
			
WTW_3DINTERNET.prototype.startChat = function(zinstanceid) {
	/* start personal chat */
	try {
		if (wtw3dinternet.masterChat == '1') {
			if (wtw3dinternet.isBlockedOrBanned(zinstanceid) == false) {
				let zchatid = WTW.getRandomString(20);
				if (dGet('wtw_chatbox-' + zchatid) == null) {
					var zdisplayname = wtw3dinternet.getAvatarDisplayName(zinstanceid);
					dGet('wtw_chatsendrequests').innerHTML += wtw3dinternet.addChatBox(zchatid, zdisplayname, 'Chat Request Sent to ' + zdisplayname + '.<br />');
					WTW.show('wtw_menuchatmin');
				}
				wtw3dinternet.chatSetScroll(zchatid, true);
				WTW.show('wtw_3dinternetchatform');
				wtw3dinternet.sendMessage('chat', zchatid, zinstanceid, 'start chat', '');
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-startChat=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.sendMessage = function(zchattype, zchatid, ztoinstanceid, zaction, ztext, zblockchat, zbanuser) {
	/* send chat message or ban to multiplayer user */
	try {
		switch (zchattype) {
			case 'chat':
				if (wtw3dinternet.masterChat == '1') {
					if (wtw3dinternet.isBlockedOrBanned(ztoinstanceid) == false) {
						let zroomid = communityid + buildingid + thingid;
						wtw3dinternet.chat.emit(zaction, {
							'serverinstanceid':dGet('wtw_serverinstanceid').value,
							'serverip':dGet('wtw_serverip').value,
							'roomid':zroomid,
							'communityid':communityid,
							'buildingid':buildingid,
							'thingid':thingid,
							'chatid':zchatid,
							'userid':dGet('wtw_tuserid').value,
							'displayname':btoa(dGet('wtw_tdisplayname').value),
							'frominstanceid':dGet('wtw_tinstanceid').value,
							'toinstanceid':ztoinstanceid,
							'text':ztext
						});
					}
				}
				break;
			case 'voicechat':
				if (wtw3dinternet.masterVoiceChat == '1') {
					if (wtw3dinternet.isBlockedOrBanned(ztoinstanceid) == false) {
						let zroomid = communityid + buildingid + thingid;
						wtw3dinternet.voicechat.emit(zaction, {
							'serverinstanceid':dGet('wtw_serverinstanceid').value,
							'serverip':dGet('wtw_serverip').value,
							'roomid':zroomid,
							'communityid':communityid,
							'buildingid':buildingid,
							'thingid':thingid,
							'voicechatid':zchatid,
							'userid':dGet('wtw_tuserid').value,
							'displayname':btoa(dGet('wtw_tdisplayname').value),
							'frominstanceid':dGet('wtw_tinstanceid').value,
							'toinstanceid':ztoinstanceid,
							'text':ztext
						});
					}
				}
				break;
			case 'ban':
				if (wtw3dinternet.masterChat == '1') {
					wtw3dinternet.chat.emit(zaction, {
						'serverinstanceid':dGet('wtw_serverinstanceid').value,
						'serverip':dGet('wtw_serverip').value,
						'communityid':communityid,
						'buildingid':buildingid,
						'thingid':thingid,
						'chatid':zchatid,
						'userid':dGet('wtw_tuserid').value,
						'displayname':btoa(dGet('wtw_tdisplayname').value),
						'frominstanceid':dGet('wtw_tinstanceid').value,
						'toinstanceid':ztoinstanceid,
						'blockchat':zblockchat,
						'banuser':zbanuser,
						'text':ztext
					});
				}
				break;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-sendMessage=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.addChatBox = function(zchatid, zdisplayname, ztext) {
	/* open a chat box */
	var zchatbox = '';
	try {
		if (wtw3dinternet.masterChat == '1') {
			zchatbox = 
				"<div id='wtw_chatbox-" + zchatid + "' class='wtw3dinternet-chatbox'>" + 
					"<div class='wtw3dinternet-chatboxshadow'>" +
						"<img class='wtw-closeright' onclick=\"wtw3dinternet.closeChat('" + zchatid + "',true);\" src='/content/system/images/menuclosegrey.png' alt='Leave Chat' title='Leave Chat' onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclosegrey.png';\" />" + 
						"<img id='wtw_chatmin" + zchatid + "' class='wtw-closeright' onclick=\"WTW.hide('wtw_chatmaxdiv" + zchatid + "');WTW.hide('wtw_chatmin" + zchatid + "');WTW.show('wtw_chatmax" + zchatid + "');wtw3dinternet.chatSetScroll('" + zchatid + "', true);\" src='/content/system/images/menuminimizegrey.png' alt='Minimize Chat' title='Minimize Chat' onmouseover=\"this.src='/content/system/images/menuminimizehover.png';\" onmouseout=\"this.src='/content/system/images/menuminimizegrey.png';\" />" + 
						"<img id='wtw_chatmax" + zchatid + "' class='wtw-closeright' onclick=\"WTW.show('wtw_chatmaxdiv" + zchatid + "');WTW.hide('wtw_chatmax" + zchatid + "');WTW.show('wtw_chatmin" + zchatid + "');wtw3dinternet.chatSetScroll('" + zchatid + "', true);\" src='/content/system/images/menumaximizegrey.png' alt='Maximize Chat' title='Maximize Chat' onmouseover=\"this.src='/content/system/images/menumaximizehover.png';\" onmouseout=\"this.src='/content/system/images/menumaximizegrey.png';\" style='display:none;visibility:hidden;' />" +
						"<div id='wtw_chatdisplayname" + zchatid + "' class='wtw3dinternet-chatdisplayname'>" + zdisplayname + "</div>" + 
						"<div id='wtw_chatmaxdiv" + zchatid + "'>" +
							"<div id='wtw_chattext-" + zchatid + "' class='wtw3dinternet-chattext'>" + ztext + "</div>" + 
							"<div class='wtw3dinternet-chatcenter'>" + 
								"<div id='wtw_chattyping-" + zchatid + "' class='wtw3dinternet-chattyping'></div>" +
								"<textarea id='wtw_chatadd-" + zchatid + "' rows='2' cols='39' class='wtw3dinternet-chattextarea' autocomplete='new-password' onkeyup=\"wtw3dinternet.chatCheckKey(this,'" + zchatid + "');\" onfocus=\"wtw3dinternet.setChatNewInfo('" + zchatid + "',false);\" style='display:none;visibility:hidden;'></textarea>" + 
								"<div id='wtw_chattextsend-" + zchatid + "' class='wtw3dinternet-chattextsend' onclick=\"wtw3dinternet.sendChat('" + zchatid + "');\" style='display:none;visibility:hidden;'>Send</div>" +
								"<div id='wtw_chataccept-" + zchatid + "' class='wtw3dinternet-chatbuttonaccept' onclick=\"wtw3dinternet.acceptChat('" + zchatid + "', '" + zdisplayname + "', true);\" style='display:none;visibility:hidden;'>Accept</div>" + 
								"<div id='wtw_chatdecline-" + zchatid + "' class='wtw3dinternet-chatbuttondecline' onclick=\"wtw3dinternet.closeChat('" + zchatid + "',true,true);\" style='display:none;visibility:hidden;'>Decline</div>" + 
								"<div id='wtw_chatok-" + zchatid + "' class='wtw3dinternet-chatbuttonaccept' onclick=\"wtw3dinternet.closeChat('" + zchatid + "');\" style='display:none;visibility:hidden;'>OK</div>" + 
							"</div>" +
						"</div>" +
					"</div>" +
				"</div>";
		}
	} catch(ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-addChatBox=' + ex.message);
	}
	return zchatbox;
}

WTW_3DINTERNET.prototype.acceptChat = function(zchatid, zdisplayname, zresponse) {
	/* accept personal chat */
	try {
		if (zresponse == undefined) {
			zresponse == false;
		}
		if (zresponse) {
			wtw3dinternet.sendMessage('chat', zchatid, '', 'chat command', 'accept chat');
		}
		WTW.hide('wtw_chataccept-' + zchatid);
		WTW.hide('wtw_chatdecline-' + zchatid);
		WTW.hide('wtw_chatok-' + zchatid);
		WTW.showInline('wtw_chatadd-' + zchatid);
		WTW.showInline('wtw_chattextsend-' + zchatid);
		if (dGet('wtw_chattext-' + zchatid) != null) {
			var zdate = new Date();
			dGet('wtw_chattext-' + zchatid).innerHTML = "<span class='wtw3dinternet-chatgreennote'><b>" + zdisplayname + "</b> Entered Chat: " + zdate.toLocaleString() + "</span><hr class='wtw3dinternet-chathr' />";
		}
		wtw3dinternet.chatSetScroll(zchatid, true);
	} catch(ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-acceptChat=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.sendChat = function(zchatid) {
	/* post and send chat message to other user */
	try {
		var ztext = '';
		if (dGet('wtw_chatadd-' + zchatid) != null) {
			ztext = dGet('wtw_chatadd-' + zchatid).value;
		}
		if (ztext.length > 0 && dGet('wtw_chattext-' + zchatid) != null) {
			dGet('wtw_chattext-' + zchatid).innerHTML += "<span class='wtw3dinternet-chatme'>Me:</span> " + WTW.encode(ztext) + "<hr class='wtw3dinternet-chathr' />";
			dGet('wtw_chatadd-' + zchatid).value = '';
			wtw3dinternet.sendMessage('chat', zchatid, '', 'send chat', WTW.encode(ztext));
		}
		wtw3dinternet.chatSetScroll(zchatid, true);
	} catch(ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-sendChat=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.closeChat = function(zchatid, zresponse, zdecline) {
	/* close chat window or decline chat */
	try {
		var ztext = 'leave chat';
		if (zresponse == undefined) {
			zresponse == false;
		}
		if (zdecline == undefined) {
			zdecline == false;
		}
		if (zdecline) {
			ztext = 'decline chat';
		}
		if (zresponse) {
			wtw3dinternet.sendMessage('chat', zchatid, '', 'chat command', ztext);
		} else if (ztext == 'leave chat') {
			wtw3dinternet.sendMessage('chat', zchatid, '', 'chat command', 'left chat');
		}
		if (dGet('wtw_chatsendrequests') != null && dGet('wtw_chatbox-' + zchatid) != null) {
			dGet('wtw_chatsendrequests').removeChild(dGet('wtw_chatbox-' + zchatid));
		}
		if (dGet('wtw_chatsendrequests').innerHTML == '') {
			WTW.hide('wtw_menuchat');
		} else {
			wtw3dinternet.chatSetScroll(zchatid, false);
		}
	} catch(ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-closeChat=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.closeMenus = function(zmenuid) {
	/* close chat boxes */
	try {
		switch (zmenuid) {
			case 'wtw_menuvoicechat':
				var zvoicechats = dGet('wtw_voicechatsendrequests').childNodes;
				for (var i=0; i<zvoicechats.length; i++) {
					if (zvoicechats[i] != null) {
						if (zvoicechats[i].id != undefined) {
							if (zvoicechats[i].id.indexOf('wtw_voicechatbox-') > -1) {
								let nameparts = zvoicechats[i].id.split('-');
								if (nameparts[1] != null) {
									wtw3dinternet.closeVoiceChat(nameparts[1], true, false);
								}
							}
						}
					}
				}
				dGet('wtw_startconnect').innerHTML = '';
				break;
			case 'wtw_menuchat':
				var zchats = dGet('wtw_chatsendrequests').childNodes;
				for (var i=0; i<zchats.length; i++) {
					if (zchats[i] != null) {
						if (zchats[i].id != undefined) {
							if (zchats[i].id.indexOf('wtw_chatbox-') > -1) {
								let nameparts = zchats[i].id.split('-');
								if (nameparts[1] != null) {
									wtw3dinternet.closeChat(nameparts[1], true, false);
								}
							}
						}
					}
				}
				dGet('wtw_startconnect').innerHTML = '';
				break;
		}
	} catch(ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-closeMenus=' + ex.message);
	}
}
	
WTW_3DINTERNET.prototype.chatCheckKey = function(obj, zchatid) {
	/* show typing message on private chat */
	try {
		var e = window.event;
		if (e != undefined) {
			if (e.keyCode == 13) {
				wtw3dinternet.sendChat(zchatid);
				wtw3dinternet.chat.emit('stop typing', {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
					'communityid':communityid,
					'buildingid':buildingid,
					'thingid':thingid,
					'chatid':zchatid,
					'userid':dGet('wtw_tuserid').value,
					'displayname':btoa(dGet('wtw_tdisplayname').value),
					'frominstanceid':dGet('wtw_tinstanceid').value,
					'text':'stop typing'
				});
			} else {
				WTW.checkKey(obj, 'text', 0, 0);
				if (wtw3dinternet.typingTimer != null) {
					window.clearTimeout(wtw3dinternet.typingTimer);
				}
				wtw3dinternet.typingTimer = window.setTimeout(function(){
					wtw3dinternet.chat.emit('stop typing', {
						'serverinstanceid':dGet('wtw_serverinstanceid').value,
						'serverip':dGet('wtw_serverip').value,
						'communityid':communityid,
						'buildingid':buildingid,
						'thingid':thingid,
						'chatid':zchatid,
						'userid':dGet('wtw_tuserid').value,
						'displayname':btoa(dGet('wtw_tdisplayname').value),
						'frominstanceid':dGet('wtw_tinstanceid').value,
						'text':'stop typing'
					});
				},1000);
				wtw3dinternet.chat.emit('typing', {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
					'communityid':communityid,
					'buildingid':buildingid,
					'thingid':thingid,
					'chatid':zchatid,
					'userid':dGet('wtw_tuserid').value,
					'displayname':btoa(dGet('wtw_tdisplayname').value),
					'frominstanceid':dGet('wtw_tinstanceid').value,
					'text':'typing'
				});
			}
			e.preventDefault();
		}
	} catch(ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-chatCheckKey=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.chatSetScroll = function(chatid, setfocus) {
	/* set scroll on chat window */
	try {
		WTW.showSettingsMenu('wtw_menuchat');
		if (dGet('wtw_chattext-' + chatid) != null) {
			dGet('wtw_chattext-' + chatid).scrollTop = dGet('wtw_chattext-' + chatid).scrollHeight;
		}
		if (setfocus) {
			if (dGet('wtw_chatadd-' + chatid) != null) {
				dGet('wtw_chatadd-' + chatid).focus();
			}
		} else {
			wtw3dinternet.setChatNewInfo(chatid,true);
		}
	} catch(ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-chatSetScroll=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.setChatNewInfo = function(chatid, setNew) {
	/* change text style class on new text */
	try {
		if (setNew) {
			if (dGet('wtw_chatdisplayname' + chatid) != null) {
				dGet('wtw_chatdisplayname' + chatid).className = 'wtw3dinternet-chatdisplaynameblink';
			}
		} else {
			if (dGet('wtw_chatdisplayname' + chatid) != null) {
				dGet('wtw_chatdisplayname' + chatid).className = 'wtw3dinternet-chatdisplayname';
			}
		}
	} catch(ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-setChatNewInfo=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.toggleChatPrompt = function() {
	/* toggle on and off chat prompt cursor */
	try {
		var zmoldname = 'hud-textprompt';
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold == null) {
			var zcamerafront = WTW.getMeshOrNodeByID('camerafront');
			
			/* reset HUD layout */
			var zobjectfolder = '/content/plugins/wtw-3dinternet/assets/objects/';
			var zobjectfile = 'textprompt.babylon';
			var zobjectanimations = null;
			
			zmold = new BABYLON.TransformNode(zmoldname);
			zmold.position = new BABYLON.Vector3(0,-6,0);
			zmold.rotation = new BABYLON.Vector3(0,0,0);
			zmold.scaling = new BABYLON.Vector3(.5,.5,.5);
			zmold.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
			zmold.parent = zcamerafront;
			
			BABYLON.SceneLoader.ImportMeshAsync('', zobjectfolder, zobjectfile, scene).then(
				function (zresults) {
					if (zresults.meshes != null) {
						var zobjectanimations = [];
						zmold.WTW = {
							'objectanimations':zobjectanimations
						};
						
						for (var i=0; i < zresults.meshes.length; i++) {
							if (zresults.meshes[i] != null) {
								/* add the base mold name to each of the child meshes */
								var zmeshname = zresults.meshes[i].name;
								var zchildmoldname = zmoldname + '-' + zmeshname;
								zchildmoldname = zchildmoldname.replace(' ','_').toLowerCase();
								zresults.meshes[i].id = zchildmoldname;
								zresults.meshes[i].name = zchildmoldname;
								
								if (zobjectanimations != null) {
//									WTW.addMoldAnimation(zmoldname, zmeshname, zresults.meshes[i], zobjectanimations);
								}

								/* make sure child meshes are pickable */
								if (zmeshname.indexOf('background') > -1 || zmeshname.indexOf('outterbar') > -1) {
									zresults.meshes[i].isPickable = true;
									zresults.meshes[i].isVisible = true;
								} else {
									zresults.meshes[i].isPickable = false;
								}
								/* make sure all object meshes have a parent */
								if (zresults.meshes[i].parent == null) {
									zresults.meshes[i].parent = zmold;
								}
								if (WTW.shadows != null) {
									/* add mesh to world shadow map */
									//WTW.shadows.getShadowMap().renderList.push(zresults.meshes[i]);
								}
//								zresults.meshes[i].receiveShadows = true;
								/* initiate and preload any event driven animations */
								if (zobjectanimations != null) {
//									WTW.addMoldAnimation(zmoldname, zmeshname, zresults.meshes[i], zobjectanimations);
								}
								if (zmold == null || zmold.parent == null) {
									/* if the parent has been deleted after this async process began (avoiding orphaned objects)*/
									zresults.meshes[i].dispose();
								}
							}
						}
					}
					zmold = WTW.getMeshOrNodeByID(zmoldname);
					if (zmold == null || zmold.parent == null) {
						/* if the parent has been deleted after this async process began (avoiding orphaned objects) */
						WTW.disposeClean(zmoldname);
					} else {
						/* start blinking prompt */
						wtw3dinternet.promptText();
					}
				}
			);
		} else {
			if (dGet('hud-textprompt-background') != null) {
				var zvalue = dGet('hud-textprompt-background').value;
				if (zvalue != '' && zvalue != '|') {
					wtw3dinternet.postPromptText();
				} else {
					/* close text prompt */
					WTW.disposeClean('hud-textprompt');
				}
			} else {
				/* close text prompt */
				WTW.disposeClean('hud-textprompt');
			}
		}
		wtw3dinternet.refreshChatText();
	} catch(ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-toggleChatPrompt=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.promptText = function() {
	/* append text in prompt box for group chat */ 
	try {
		var zmold = WTW.getMeshOrNodeByID('hud-textprompt');
		if (zmold != null) {
			var zvalue = '';
			var ztextboxid = 'hud-textprompt-background';
			if (dGet(ztextboxid) == null) {
				if (dGet('wtw_hudfields') == null) {
					var zhuddiv = document.createElement('div');
					zhuddiv.id = 'wtw_hudfields';
					zhuddiv.className = 'wtw-hide';
					document.getElementsByTagName('body')[0].appendChild(zhuddiv);
				}
				var zinput = document.createElement('input');
				zinput.id = ztextboxid;
				zinput.type = 'hidden';
				zinput.value = '';
				dGet('wtw_hudfields').appendChild(zinput);
			}
			wtw3dinternet.promptEditText('hud-textprompt-background');
		}		
	} catch(ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-promptText=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.promptEditText = function(zmoldname) {
	/* set selected mold and allow keyboard to enter text to 3D Textbox */
	try {
		WTW.hilightMoldFast(zmoldname, 'green');
		if (WTW.selectedMoldName != zmoldname) {
			WTW.selectedMoldName = zmoldname;
			if (wtw3dinternet.typingTimer != null) {
				window.clearInterval(wtw3dinternet.typingTimer);
				wtw3dinternet.typingTimer = null;
			}
		}
		/* start blinking cursor at end of text typed */
		if (wtw3dinternet.typingTimer == null) {
			wtw3dinternet.typingTimer = window.setInterval(function(){
				if (WTW.selectedMoldName != '' && dGet(WTW.selectedMoldName) != null) {
					wtw3dinternet.promptEditRefreshText(WTW.selectedMoldName, 'hud-textprompt');
				} else {
					window.clearInterval(wtw3dinternet.typingTimer);
					wtw3dinternet.typingTimer = null;
				}
			},500);
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_fields.js-promptEditText=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.promptEditRefreshText = function(zmoldname, zparentname, zeditdone) {
	/* refresh the text with the latest changes in group chat prompt */
	try {
		if (zeditdone == undefined) {
			zeditdone = false;
		}
		var zpositionx = 0;
		var zpositiony = 0;
		var zpositionz = 0;
		var zmytext = WTW.getMeshOrNodeByID(zmoldname + '-text');
		if (zmytext == null) {
			zmytext = WTW.getMeshOrNodeByID(zmoldname);
			zpositionx = -10.5;
			zpositiony = -.25;
			zpositionz = -.1;
		}
		if (zmytext != null) {
			zpositionx += zmytext.position.x;
			zpositiony += zmytext.position.y;
			zpositionz += zmytext.position.z;
		}
		WTW.disposeClean(zmoldname + '-text');
		var zshowtext = dGet(zmoldname).value;
		/* if text is too long, trim text for display */
		var zhaspipe = 0;
		var zmaxlength = 50;
		if (zshowtext.indexOf('|') > -1) {
			zhaspipe = 1;
			zshowtext = zshowtext.replace('|','');
		}
		/* W and M are wider and can not fit as many characters on the display screen */
		if (zshowtext.indexOf('w') > -1 || zshowtext.indexOf('m') > -1 || zshowtext.indexOf('W') > -1 || zshowtext.indexOf('M') > -1) {
			zmaxlength = 48;
		}
		if (zshowtext.length > zmaxlength) {
			zshowtext = zshowtext.substr(zshowtext.length-zmaxlength-1,zshowtext.length-(zshowtext.length-zmaxlength-1));
		}
		/* decide if pipe key | should show or not */
		if (zhaspipe == 0 && zeditdone == false) {
			zshowtext += '|';
			dGet(zmoldname).value += '|';
		} else {
			dGet(zmoldname).value = dGet(zmoldname).value.replace('|','');
		}
		/* create 3d text */
		Writer = BABYLON.MeshWriter(scene, {scale:1});
		var zdisplaytext = null;
		if (zshowtext != '') {
			var zwebstyle = {
				'font-family': 'Arial',
				'anchor':'left',
				'letter-height':.9,
				'letter-thickness':.4,
				'color':'#ffffff',
				'alpha':1.00,
				'colors':{
					'diffuse':'#ffffff',
					'specular':'#989e2c',
					'ambient':'#888722',
					'emissive':'#37370d'
				}
			};
			var zmoldparent = WTW.getMeshOrNodeByID(zparentname);
			
			if (zmoldparent != null) {
				zdisplaytext = new Writer(zshowtext, zwebstyle);
				var zmytext = zdisplaytext.getMesh();
				zmytext.rotation = new BABYLON.Vector3(WTW.getRadians(-90), 0, 0);
				zmytext.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
				zmytext.id = zmoldname + '-text';
				zmytext.name = zmoldname + '-text';
				zmytext.parent = zmoldparent;
				zmytext.isPickable = false;
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_fields.js-promptEditRefreshText=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.postPromptText = function() {
	/* post the text from the text box prompt for group chat */
	try {
		if (dGet('hud-textprompt-background') != null) {
			var ztext = dGet('hud-textprompt-background').value;
			if (ztext != '' && ztext != '|') {
				ztext = btoa(ztext.replace('|',''));
				/* note timestamp is in seconds */
				var ztimestamp = Math.round(new Date().getTime()/1000);
				wtw3dinternet.chatText[wtw3dinternet.chatText.length] = {
					'userid' : dGet('wtw_tuserid').value,
					'displayname' : btoa(dGet('wtw_tdisplayname').value),
					'email' : dGet('wtw_tuseremail').value,
					'diffuse' : '#FFFF6C',
					'specular' : '#989e2c',
					'ambient' : '#888722',
					'emissive' : '#37370d',
					'timestamp' : ztimestamp,
					'text' : ztext
				};
				if (wtw3dinternet.masterChat == '1') {
					wtw3dinternet.chat.emit('send group chat', {
						'serverinstanceid':dGet('wtw_serverinstanceid').value,
						'serverip':dGet('wtw_serverip').value,
						'communityid':communityid,
						'buildingid':buildingid,
						'thingid':thingid,
						'instanceid':dGet('wtw_tinstanceid').value,
						'userid':dGet('wtw_tuserid').value,
						'displayname':btoa(dGet('wtw_tdisplayname').value),
						'email' : dGet('wtw_tuseremail').value,
						'diffuse' : '#ffffff',
						'specular' : '#989e2c',
						'ambient' : '#888722',
						'emissive' : '#37370d',
						'timestamp' : ztimestamp,
						'text' : ztext
					});
				}
				dGet('hud-textprompt-background').value = '';
				wtw3dinternet.refreshChatText();
				wtw3dinternet.promptEditText('hud-textprompt-background');
				wtw3dinternet.clearTextTimer();
			}
		}
	} catch(ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-postPromptText=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.refreshChatText = function() {
	/* refresh the text in group chat prompt box */
	try {
		var zmoldname = 'hud-chattext';
		var zmoldparent = WTW.getMeshOrNodeByID(zmoldname);
		if (zmoldparent == null) {
			var zcamerafront = WTW.getMeshOrNodeByID('camerafront');

			zmoldparent = new BABYLON.TransformNode(zmoldname);
			zmoldparent.position = new BABYLON.Vector3(0,-6,0);
			zmoldparent.rotation = new BABYLON.Vector3(0,0,0);
			zmoldparent.scaling = new BABYLON.Vector3(1,1,1);
			zmoldparent.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
			zmoldparent.parent = zcamerafront;
		}
		
		var zpositionx = -6.5;
		var zpositiony = -.25;
		var zpositionz = -.1;

		var ztextpromptmold = WTW.getMeshOrNodeByID('hud-textprompt');
		if (ztextpromptmold != null) {
			zpositiony += 2;
		}
		/* remove old text messages */
		if (wtw3dinternet.chatText.length > 0) {
			for (i=wtw3dinternet.chatText.length-1; i > -1;i--) {
				WTW.disposeClean(zmoldname + i + '-text');
				var ztime = Math.round(new Date().getTime()/1000)-wtw3dinternet.chatText[i].timestamp;
				if (ztime > 60 || i > 10) {
					wtw3dinternet.chatText.splice(i,1);
				}
			}
		}
		/* add new text messages */
		if (wtw3dinternet.chatText.length > 0) {
			for (i=wtw3dinternet.chatText.length-1; i > -1;i--) {
				var ztext = atob(wtw3dinternet.chatText[i].displayname) + ': ' + atob(wtw3dinternet.chatText[i].text);
				var zwebstyle = {
					'font-family': 'Arial',
					'anchor':'left',
					'letter-height':.4,
					'letter-thickness':.1,
					'color':'#ffffff',
					'alpha':1.00,
					'colors':{
						'diffuse':wtw3dinternet.chatText[i].diffuse,
						'specular':'#989e2c',
						'ambient':'#888722',
						'emissive':'#37370d'
					}
				};
				var zdisplaytext = new Writer(ztext, zwebstyle);
				var zmytext = zdisplaytext.getMesh();
				zmytext.rotation = new BABYLON.Vector3(WTW.getRadians(-90), 0, 0);
				zmytext.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
				zmytext.id = zmoldname + i + '-text';
				zmytext.name = zmoldname + i + '-text';
				zmytext.parent = zmoldparent;
				zmytext.isPickable = false;
				zpositiony += 1;
			}
		}
	} catch(ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-refreshChatText=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.clearTextTimer = function() {
	/* clears old messages in the group chat display text */
	try {
		if (WTW.textTimer != null) {
			window.clearInterval(WTW.textTimer);
			WTW.textTimer = null;
		}
		/* start clear text timer */
		if (WTW.textTimer == null) {
			WTW.textTimer = window.setInterval(function(){
				var zresettext = false;
				if (wtw3dinternet.chatText != null) {
					if (wtw3dinternet.chatText.length > 0) {
						for (i=0;i < wtw3dinternet.chatText.length;i++) {
							if (wtw3dinternet.chatText[i] != null) {
								var ztime = Math.round(new Date().getTime()/1000)-wtw3dinternet.chatText[i].timestamp;
								if (ztime > 60) {
									zresettext = true;
								}
							}
						}
					} else {
						window.clearInterval(WTW.textTimer);
						WTW.textTimer = null;
						wtw3dinternet.refreshChatText();
					}
				} else {
					window.clearInterval(WTW.textTimer);
					WTW.textTimer = null;
					wtw3dinternet.refreshChatText();
				}
				if (zresettext) {
					wtw3dinternet.refreshChatText();
				}
			},1000);
		}
	} catch(ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-clearTextTimer=' + ex.message);
	}
}


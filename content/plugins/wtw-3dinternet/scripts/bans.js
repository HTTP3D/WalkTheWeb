/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

WTW_3DINTERNET.prototype.banUserInstance = function(zbaninstanceid) {
	/* ban an instance of a user */
	try {
		var zbanavatar = WTW.getMeshOrNodeByID('person-' + zbaninstanceid);
		if (zbanavatar != null) {
			var zbanuserid = '';
			var zbanuserip = '';
			var zbanuseravatarid = '';
			var zbanglobalavatarid = '';
			var zblockchat = '1';
			var zbanuser = '1';
			var zfoundblockedchat = false;
			if (zbanavatar.WTW != undefined) {
				if (zbanavatar.WTW.userid != undefined) {
					zbanuserid = zbanavatar.WTW.userid;
				}
				if (zbanavatar.WTW.userip != undefined) {
					zbanuserip = zbanavatar.WTW.userip;
				}
				if (zbanavatar.WTW.useravatarid != undefined) {
					zbanuseravatarid = zbanavatar.WTW.useravatarid;
				}
				if (zbanavatar.WTW.globaluseravatarid != undefined) {
					zbanglobalavatarid = zbanavatar.WTW.globaluseravatarid;
				}
				if (zbanavatar.WTW.bannedby != undefined) {
					for (var i=zbanavatar.WTW.bannedby.length-1;i>-1;i--) {
						if (zbanavatar.WTW.bannedby[i] != null) {
							if (zbanavatar.WTW.bannedby[i].instanceid == dGet('wtw_tinstanceid').value) {
								/* was already banned - so unban */
								zbanuser = '0';
								zblockchat = '0';
								zbanavatar.WTW.bannedby.splice(i,1);
							}
						}
					}
				}
				if (zbanavatar.WTW.blockedby != undefined) {
					for (var i=zbanavatar.WTW.blockedby.length-1;i>-1;i--) {
						if (zbanavatar.WTW.blockedby[i] != null) {
							if (zbanavatar.WTW.blockedby[i].instanceid == dGet('wtw_tinstanceid').value) {
								/* was already blocked */
								if (zbanuser == '0') {
									/* unban so unblock chat */
									zbanavatar.WTW.blockedby.splice(i,1);
								} else {
									zfoundblockedchat = true;
								}
							}
						}
					}
				}
				if (zbanuser == '1') {
					if (zbanavatar.WTW.bannedby != undefined) {
						zbanavatar.WTW.bannedby[zbanavatar.WTW.bannedby.length] = {
							'instanceid': dGet('wtw_tinstanceid').value,
							'baninstanceid': zbaninstanceid
						};
					} else {
						zbanavatar.WTW.bannedby[0] = {
							'instanceid': dGet('wtw_tinstanceid').value,
							'baninstanceid': zbaninstanceid
						};
					}
				}
				if (zblockchat == '1' && zfoundblockedchat == false) {
					if (zbanavatar.WTW.blockedby != undefined) {
						zbanavatar.WTW.blockedby[zbanavatar.WTW.blockedby.length] = {
							'instanceid': dGet('wtw_tinstanceid').value,
							'baninstanceid': zbaninstanceid
						};
					} else {
						zbanavatar.WTW.blockedby[0] = {
							'instanceid': dGet('wtw_tinstanceid').value,
							'baninstanceid': zbaninstanceid
						};
					}
				}
			}
			wtw3dinternet.showAvatarIDs('person-' + zbaninstanceid);
			/* pass block and ban change to other user through multiplayer */
			var zchatid = WTW.getRandomString(20);
			wtw3dinternet.sendMessage('ban', zchatid, zbaninstanceid, 'block or ban user', '', zblockchat, zbanuser);
			/* save block or ban to database */
			var zrequest = {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'instanceid':dGet('wtw_tinstanceid').value,
				'userid':dGet('wtw_tuserid').value,
				'baninstanceid':zbaninstanceid,
				'banuserid':zbanuserid,
				'banuserip':zbanuserip,
				'banuseravatarid':zbanuseravatarid,
				'banglobalavatarid':zbanglobalavatarid,
				'blockchat':zblockchat,
				'banuser':zbanuser,
				'function':'saveban'
			};
			WTW.postAsyncJSON('/core/handlers/wtw-3dinternet-bans.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					if (zresponse.serror != '') {
						WTW.log('plugins:wtw-3dinternet:scripts-chat.js-blockChat=' + zresponse.serror);
					}
					wtw3dinternet.avatarConnectMenu(zbaninstanceid, true);
					wtw3dinternet.blockedAvatar(zbaninstanceid, zblockchat, zbanuser);
				}
			);
			/* report to WalkTheWeb to assist in predicting bans globally */
			WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/wtwsaveban.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					wtw3dinternet.avatarConnectMenu(zbaninstanceid, true);
					wtw3dinternet.blockedAvatar(zbaninstanceid, zblockchat, zbanuser);
				}
			);
		}		
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-banUserInstance=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.blockChat = function(zbaninstanceid) {
	/* block or unblock Chat with a user instance */
	try {
		var zbanavatar = WTW.getMeshOrNodeByID('person-' + zbaninstanceid);
		if (zbanavatar != null) {
			var zbanuserid = '';
			var zbanuserip = '';
			var zbanuseravatarid = '';
			var zbanglobalavatarid = '';
			var zblockchat = '1';
			var zbanuser = '0';
			if (zbanavatar.WTW != undefined) {
				if (zbanavatar.WTW.userid != undefined) {
					zbanuserid = zbanavatar.WTW.userid;
				}
				if (zbanavatar.WTW.userip != undefined) {
					zbanuserip = zbanavatar.WTW.userip;
				}
				if (zbanavatar.WTW.useravatarid != undefined) {
					zbanuseravatarid = zbanavatar.WTW.useravatarid;
				}
				if (zbanavatar.WTW.globaluseravatarid != undefined) {
					zbanglobalavatarid = zbanavatar.WTW.globaluseravatarid;
				}
				if (zbanavatar.WTW.blockedby != undefined) {
					for (var i=zbanavatar.WTW.blockedby.length-1;i>-1;i--) {
						if (zbanavatar.WTW.blockedby[i] != null) {
							if (zbanavatar.WTW.blockedby[i].instanceid == dGet('wtw_tinstanceid').value) {
								/* was already blocked - so unblock */
								zblockchat = '0';
								zbanavatar.WTW.blockedby.splice(i,1);
							}
						}
					}
				}
				if (zbanavatar.WTW.bannedby != undefined) {
					for (var i=zbanavatar.WTW.bannedby.length-1;i>-1;i--) {
						if (zbanavatar.WTW.bannedby[i] != null) {
							if (zbanavatar.WTW.bannedby[i].instanceid == dGet('wtw_tinstanceid').value) {
								zbanuser = '1';
							}
						}
					}
				}
				if (zblockchat == '1' || zbanuser == '1') {
					if (zbanavatar.WTW.blockedby != undefined) {
						zbanavatar.WTW.blockedby[zbanavatar.WTW.blockedby.length] = {
							'instanceid': dGet('wtw_tinstanceid').value,
							'baninstanceid': zbaninstanceid
						};
					} else {
						zbanavatar.WTW.blockedby[0] = {
							'instanceid': dGet('wtw_tinstanceid').value,
							'baninstanceid': zbaninstanceid
						};
					}
				}
			}
			wtw3dinternet.showAvatarIDs('person-' + zbaninstanceid);
			/* pass block and ban change to other user through multiplayer */
			var zchatid = WTW.getRandomString(20);
			wtw3dinternet.sendMessage('ban', zchatid, zbaninstanceid, 'block or ban user', '', zblockchat, zbanuser);
			/* save block or ban to database */
			var zrequest = {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'instanceid':dGet('wtw_tinstanceid').value,
				'userid':dGet('wtw_tuserid').value,
				'baninstanceid':zbaninstanceid,
				'banuserid':zbanuserid,
				'banuserip':zbanuserip,
				'banuseravatarid':zbanuseravatarid,
				'banglobalavatarid':zbanglobalavatarid,
				'blockchat':zblockchat,
				'banuser':zbanuser,
				'function':'saveban'
			};
			WTW.postAsyncJSON('/core/handlers/wtw-3dinternet-bans.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					if (zresponse.serror != '') {
						WTW.log('plugins:wtw-3dinternet:scripts-chat.js-blockChat=' + zresponse.serror);
					}
					wtw3dinternet.avatarConnectMenu(zbaninstanceid, true);
					wtw3dinternet.blockedAvatar(zbaninstanceid, zblockchat, zbanuser);
				}
			);
			/* report block or ban to WalkTheWeb to assist in predicting bans globally */
			WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/wtwsaveban.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					wtw3dinternet.avatarConnectMenu(zbaninstanceid, true);
					wtw3dinternet.blockedAvatar(zbaninstanceid, zblockchat, zbanuser);
				}
			);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-blockChat=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.receiveBlockOrBan = function(zdata) {
	/* Process block or ban received by multiplayer */
	try {					
		var zfrominstanceid = zdata.frominstanceid;
		var ztoinstanceid = zdata.toinstanceid;
		var zblockchat = zdata.blockchat;
		var zbanuser = zdata.banuser;
		var zfoundblockchat = false;
		var zfoundbanuser = false;
		/* am I being blocked or Banned (or unblocked or unbanned) */
		if (ztoinstanceid == dGet('wtw_tinstanceid').value && zdata.serverinstanceid == dGet('wtw_serverinstanceid').value) {
			var zmyavatar = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value);
			if (zmyavatar != null) {			
				if (zmyavatar.WTW != undefined) {
					if (zmyavatar.WTW.blockedby != undefined) {
						for (var i=zmyavatar.WTW.blockedby.length-1;i>-1;i--) {
							if (zmyavatar.WTW.blockedby[i] != null) {
								if (zmyavatar.WTW.blockedby[i].baninstanceid == ztoinstanceid && zmyavatar.WTW.blockedby[i].instanceid == zfrominstanceid) {
									/* found block chat */
									if (zblockchat == '0') {
										zmyavatar.WTW.blockedby.splice(i,1);
									} else {
										zfoundblockchat = true;
									}
								}
							}
						}
					}
					if (zmyavatar.WTW.bannedby != undefined) {
						for (var i=zmyavatar.WTW.bannedby.length-1;i>-1;i--) {
							if (zmyavatar.WTW.bannedby[i] != null) {
								if (zmyavatar.WTW.bannedby[i].baninstanceid == ztoinstanceid && zmyavatar.WTW.bannedby[i].instanceid == zfrominstanceid) {
									/* found ban user */
									if (zbanuser == '0') {
										zmyavatar.WTW.bannedby.splice(i,1);
									} else {
										zfoundbanuser = true;
									}
								}
							}
						}
					}
					if ((zblockchat == '1' || zbanuser == '1') && zfoundblockchat == false) {
						if (zmyavatar.WTW.blockedby != undefined) {
							zmyavatar.WTW.blockedby[zmyavatar.WTW.blockedby.length] = {
								'instanceid': zfrominstanceid,
								'baninstanceid': ztoinstanceid
							};
						} else {
							zmyavatar.WTW.blockedby[0] = {
								'instanceid': zfrominstanceid,
								'baninstanceid': ztoinstanceid
							};
						}
					}
					if (zbanuser == '1' && zfoundbanuser == false) {
						if (zmyavatar.WTW.bannedby != undefined) {
							zmyavatar.WTW.bannedby[zmyavatar.WTW.bannedby.length] = {
								'instanceid': zfrominstanceid,
								'baninstanceid': ztoinstanceid
							};
						} else {
							zmyavatar.WTW.bannedby[0] = {
								'instanceid': zfrominstanceid,
								'baninstanceid': ztoinstanceid
							};
						}
					}
					
					
					
				}
			}
			/* update other avatar with block or ban change */
			zfoundblockchat = false;
			zfoundbanuser = false;
			var zbanavatar = WTW.getMeshOrNodeByID('person-' + zfrominstanceid);
			if (zbanavatar != null) {			
				if (zbanavatar.WTW != undefined) {
					if (zbanavatar.WTW.blockedby != undefined) {
						for (var i=zbanavatar.WTW.blockedby.length-1;i>-1;i--) {
							if (zbanavatar.WTW.blockedby[i] != null) {
								if (zbanavatar.WTW.blockedby[i].baninstanceid == ztoinstanceid && zbanavatar.WTW.blockedby[i].instanceid == zfrominstanceid) {
									/* found block chat */
									if (zblockchat == '0') {
										zbanavatar.WTW.blockedby.splice(i,1);
									} else {
										zfoundblockchat = true;
									}
								}
							}
						}
					}
					if (zbanavatar.WTW.bannedby != undefined) {
						for (var i=zbanavatar.WTW.bannedby.length-1;i>-1;i--) {
							if (zbanavatar.WTW.bannedby[i] != null) {
								if (zbanavatar.WTW.bannedby[i].baninstanceid == ztoinstanceid && zbanavatar.WTW.bannedby[i].instanceid == zfrominstanceid) {
									/* found ban user */
									if (zbanuser == '0') {
										zbanavatar.WTW.bannedby.splice(i,1);
									} else {
										zfoundbanuser = true;
									}
								}
							}
						}
					}
					if ((zblockchat == '1' || zbanuser == '1') && zfoundblockchat == false) {
						if (zbanavatar.WTW.blockedby != undefined) {
							zbanavatar.WTW.blockedby[zbanavatar.WTW.blockedby.length] = {
								'instanceid': zfrominstanceid,
								'baninstanceid': ztoinstanceid
							};
						} else {
							zbanavatar.WTW.blockedby[0] = {
								'instanceid': zfrominstanceid,
								'baninstanceid': ztoinstanceid
							};
						}
					}
					if (zbanuser == '1' && zfoundbanuser == false) {
						if (zbanavatar.WTW.bannedby != undefined) {
							zbanavatar.WTW.bannedby[zbanavatar.WTW.bannedby.length] = {
								'instanceid': zfrominstanceid,
								'baninstanceid': ztoinstanceid
							};
						} else {
							zbanavatar.WTW.bannedby[0] = {
								'instanceid': zfrominstanceid,
								'baninstanceid': ztoinstanceid
							};
						}
					}
					
					
					
				}
			}

			if (dGet('wtw3dinternet_connect' + zfrominstanceid) != null) {
				/* if your connect box is already open, refresh it */
				wtw3dinternet.avatarConnectMenu(zfrominstanceid, true);
			}
			/* refresh avatar opacity */
			wtw3dinternet.blockedAvatar(zfrominstanceid, zblockchat, zbanuser);					
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-receiveBlockOrBan=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.isBlockedOrBanned = function(zinstanceid) {
	/* Is user blocked or banned in multiplayer */
	var zblockedorbanned = false;
	try {
		if (wtw3dinternet.isBlocked(zinstanceid)) {
			zblockedorbanned = true;
		}
		if (wtw3dinternet.isBanned(zinstanceid)) {
			zblockedorbanned = true;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-isBlockedOrBanned=' + ex.message);
	}
	return zblockedorbanned;
}

WTW_3DINTERNET.prototype.isBlocked = function(zinstanceid) {
	/* Is user blocked or banned in multiplayer */
	var zblocked = false;
	try {
		/* am I being blocked or Banned (or unblocked or unbanned) */
		var zmyavatar = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value);
		if (zmyavatar != null) {			
			if (zmyavatar.WTW != undefined) {
				if (zmyavatar.WTW.blockedby != undefined) {
					for (var i=zmyavatar.WTW.blockedby.length-1;i>-1;i--) {
						if (zmyavatar.WTW.blockedby[i] != null) {
							if ((zmyavatar.WTW.blockedby[i].baninstanceid == zinstanceid && zmyavatar.WTW.blockedby[i].instanceid == dGet('wtw_tinstanceid').value) || (zmyavatar.WTW.blockedby[i].instanceid == zinstanceid && zmyavatar.WTW.blockedby[i].baninstanceid == dGet('wtw_tinstanceid').value)) {
								/* found block chat */
								zblocked = true;
							}
						}
					}
				}
			}
		}
		/* update other avatar with block or ban change */
		var zbanavatar = WTW.getMeshOrNodeByID('person-' + zinstanceid);
		if (zbanavatar != null) {			
			if (zbanavatar.WTW != undefined) {
				if (zbanavatar.WTW.blockedby != undefined) {
					for (var i=zbanavatar.WTW.blockedby.length-1;i>-1;i--) {
						if (zbanavatar.WTW.blockedby[i] != null) {
							if ((zbanavatar.WTW.blockedby[i].baninstanceid == zinstanceid && zbanavatar.WTW.blockedby[i].instanceid == dGet('wtw_tinstanceid').value) || (zbanavatar.WTW.blockedby[i].instanceid == zinstanceid && zbanavatar.WTW.blockedby[i].baninstanceid == dGet('wtw_tinstanceid').value)) {
								/* found block chat */
								zblocked = true;
							}
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-isBlocked=' + ex.message);
	}
	return zblocked;
}

WTW_3DINTERNET.prototype.isBanned = function(zinstanceid) {
	/* Is user blocked or banned in multiplayer */
	var zbanned = false;
	try {
		/* am I being blocked or Banned (or unblocked or unbanned) */
		var zmyavatar = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value);
		if (zmyavatar != null) {			
			if (zmyavatar.WTW != undefined) {
				if (zmyavatar.WTW.bannedby != undefined) {
					for (var i=zmyavatar.WTW.bannedby.length-1;i>-1;i--) {
						if (zmyavatar.WTW.bannedby[i] != null) {
							if ((zmyavatar.WTW.bannedby[i].baninstanceid == zinstanceid && zmyavatar.WTW.bannedby[i].instanceid == dGet('wtw_tinstanceid').value) || (zmyavatar.WTW.bannedby[i].instanceid == zinstanceid && zmyavatar.WTW.bannedby[i].baninstanceid == dGet('wtw_tinstanceid').value)) {
								/* found ban user */
								zbanned = true;
							}
						}
					}
				}
			}
		}
		/* update other avatar with block or ban change */
		var zbanavatar = WTW.getMeshOrNodeByID('person-' + zinstanceid);
		if (zbanavatar != null) {			
			if (zbanavatar.WTW != undefined) {
				if (zbanavatar.WTW.bannedby != undefined) {
					for (var i=zbanavatar.WTW.bannedby.length-1;i>-1;i--) {
						if (zbanavatar.WTW.bannedby[i] != null) {
							if ((zbanavatar.WTW.bannedby[i].baninstanceid == zinstanceid && zbanavatar.WTW.bannedby[i].instanceid == dGet('wtw_tinstanceid').value) || (zbanavatar.WTW.bannedby[i].instanceid == zinstanceid && zbanavatar.WTW.bannedby[i].baninstanceid == dGet('wtw_tinstanceid').value)) {
								/* found ban user */
								zbanned = true;
							}
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-chat.js-isBlockedOrBanned=' + ex.message);
	}
	return zbanned;
}

// All code is Copyright 2013-2019 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors
// "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. 
// Read the included GNU Ver 3.0 license file for details and additional release information.

function wtwmultiplayer() {
	this.avatars = [];
	this.chatQueue = [];
	this.AvatarIDs = 1;
	this.moveAvatars = 0;
	this.multiPlayer = 20;
	this.multiPlayerOn = 1;
	this.trackMovement = 0;
}

var WTWMultiplayer = new wtwmultiplayer();

wtwmultiplayer.prototype.initMultiuser = function() {
	try {
		var avatarind = 1;
		var objectfolder = "";
		var objectfile = "";
		var httpsecure = "0";
		var scalingx = "1";
		var scalingy = "1";
		var scalingz = "1";
		var privacy = "0";
		if (WTW.myAvatar != null) {
			if (WTW.myAvatar.WTW != null) {
				if (WTW.myAvatar.WTW.avatarind != undefined) {
					avatarind = WTW.myAvatar.WTW.avatarind;
				}
				if (WTW.myAvatar.WTW.object != null) {
					if (WTW.myAvatar.WTW.object.folder != undefined) {
						objectfolder = WTW.myAvatar.WTW.object.folder;
					}
					if (WTW.myAvatar.WTW.object.file != undefined) {
						objectfile = WTW.myAvatar.WTW.object.file;
					}
				}
				if (WTW.myAvatar.WTW.scaling.x != undefined) {
					scalingx = WTW.myAvatar.WTW.scaling.x;
				}
				if (WTW.myAvatar.WTW.scaling.y != undefined) {
					scalingy = WTW.myAvatar.WTW.scaling.y;
				}
				if (WTW.myAvatar.WTW.scaling.z != undefined) {
					scalingz = WTW.myAvatar.WTW.scaling.z;
				}
			}
		}
		if (dGet('wtw_menudisplayname').innerHTML == '' && dGet('wtw_tusername').value != '') {
			dGet('wtw_menudisplayname').innerHTML = dGet('wtw_tusername').value;
		}
		if (dGet('wtw_menudisplayname').innerHTML == '' && dGet('wtw_tuseremail').value != '') {
			var emailbase = dGet('wtw_tuseremail').value.split('@');
			dGet('wtw_menudisplayname').innerHTML = emailbase[0];
		}
		if (dGet('wtw_menudisplayname').innerHTML == '') {
			dGet('wtw_menudisplayname').innerHTML = 'Anonymous';
		}
		if (wtw_protocol.toLowerCase().indexOf('https') > -1) { httpsecure = "1"; }
		var zenteranimation = WTW.getDDLValue('wtw_tselectavataranimation-enter');
		var zenteranimationparameter = "";
		var zexitanimation = "1";
		var zexitanimationparameter = "";
		var myavatarid = dGet('wtw_tmyavatarid').value;
		if (dGet('wtw_tuserid').value == '') {
			myavatarid = dGet('wtw_tmyavataridanon').value;
		}
		var surl = wtw_domainurl + "/connect/wtw-multiplayer-updateavatar.php?" +
			"&i=" + btoa(dGet('wtw_tinstanceid').value) + 
			"&u=" + btoa(myavatarid) + 
			"&ai=" + btoa(avatarind) + 
			"&d=" + btoa(dGet('wtw_tuserid').value) + 
			"&o=" + btoa(objectfolder) + 
			"&f=" + btoa(objectfile) + 
			"&m=" + btoa(wtw_domainname) + 
			"&s=" + btoa(httpsecure) + 
			"&x=" + btoa(scalingx) + 
			"&y=" + btoa(scalingy) + 
			"&z=" + btoa(scalingz) + 
			"&n=" + btoa(dGet('wtw_menudisplayname').innerHTML) + 
			"&p=" + btoa(privacy) + 
			"&en=" + btoa(zenteranimation) + 
			"&enp=" + btoa(zenteranimationparameter) + 
			"&ex=" + btoa(zexitanimation) + 
			"&exp=" + btoa(zexitanimationparameter) + 
			"&a=" + btoa(dGet('wtw_tuserip').value);
		WTW.getJSON(surl, 
			function(response) {}
		);
	} catch (ex) {
		WTW.log("multiuser-tracking-initMultiuser=" + ex.message);
	} 
}

wtwmultiplayer.prototype.getMultiUserAvatar = function(instanceid, zuserid) {
	try {
		for (var i = 0; i < scene.meshes.length; i++) {
			var moldname = scene.meshes[i].name;
			if (moldname.indexOf("person-") > -1 && moldname.indexOf(instanceid) > -1) {
				WTW.addDisposeMoldToQueue(moldname);
			}
		}
		var surl = wtw_domainurl + "/connect/wtw-multiplayer-getavatar.php?" + 
			"i=" + btoa(instanceid) + 
			"&d=" + btoa(zuserid) +
			"&c=" + btoa(communityid) + 
			"&b=" + btoa(buildingid); 
		WTW.getJSON(surl, 
			function(response) {
				avatardef = JSON.parse(response);
				if (avatardef != null) {
					if (avatardef.instanceid != undefined) {
						var avatarname = "person-" + avatardef.instanceid;
						var avatar1 = WTW.addAvatar(avatarname, avatardef, WTW.mainParent); 
						var par = WTW.getMainParent();
						if (par != null) {
							avatar1.parent = par;
						}
						WTWMultiplayer.setAvatarInstanceState(avatardef.instanceid,'2');
					}
				}
			}
		); 
	} catch (ex) {
		WTW.log("multiuser-tracking-getMultiUserAvatar=" + ex.message);
	}
}

wtwmultiplayer.prototype.clearMultiuser = function(instance, zuserid) {
	try {
		for (var i = 0; i < scene.meshes.length; i++) {
			var moldname = scene.meshes[i].name;
			if (moldname.indexOf("person-") > -1) {
				WTW.addDisposeMoldToQueue(moldname);
			}
		}
		var surl = wtw_domainurl + "/connect/wtw-multiplayer-clearavatar.php?" + 
			"i=" + btoa(instance) + 
			"&d=" + btoa(zuserid) + 
			"&c=" + btoa(communityid) + 
			"&b=" + btoa(buildingid);
		WTW.getJSON(surl, 
			function(response) {}
		);
	} catch (ex) {
		WTW.log("multiuser-tracking-clearMultiuser=" + ex.message);
	}
}

wtwmultiplayer.prototype.getAvatarDisplayName = function(instanceid) {
	var displayname = "";
	try {
		var avatar = scene.getMeshByID('person-' + instanceid);
		if (avatar != null) {
			if (avatar.WTW != null) {
				if (avatar.WTW.displayname != undefined) {
					displayname = avatar.WTW.displayname;
				}
			}
		}
	} catch(ex) {
		WTW.log("multiuser-tracking-getAvatarDisplayName=" + ex.message);
	}
	return displayname;
}

wtwmultiplayer.prototype.setTrackMovement = function() {
	try {
		var trackid = '';
		var animations = '';
		var chatid = '';
		var chattext = '';
		if (WTW.myAvatar.WTW != null) {
			if (WTW.myAvatar.WTW.trackid != undefined) {
				trackid = WTW.myAvatar.WTW.trackid;
			}
		}
		if (WTW.keysPressed != null) {
			for (var i=0;i < WTW.keysPressed.length;i++) {
				if (WTW.keysPressed[i] != null) {
					if (WTW.isNumeric(WTW.keysPressed[i])) {
						switch (WTW.keysPressed[i]) {
								case 32: //space jump
									animations += "onjump,";
									break;
								case 38: //arrow w forward
								case 87: //w forward
									if (WTW.shiftKey) {
										animations += "onrun,";
									} else {
										animations += "onwalk,";
									}
									break;
								case 1038: //arrow w forward
									animations += "onwalk,";
									break;
								case 2038: //arrow w forward
									animations += "onrun,";
									break;
								case 40: //arrow s backwards
								case 83: //s backwards
									if (WTW.shiftKey) {
										animations += "onrunbackwards,";
									} else {
										animations += "onwalkbackwards,";
									}
									break;
								case 1040: //arrow s backwards
									animations += "onwalkbackwards,";
									break;
								case 2040: //arrow s backwards
									animations += "onrunbackwards,";
									break;
								case 37: //arrow q rotate left
								case 81: //q rotate left
									if (WTW.shiftKey) {
										animations += "onrunturnleft,";
									} else {
										animations += "onturnleft,";
									}
									break;
								case 1037: //mouse rotate left
									animations += "onturnleft,";
									break;
								case 2037: //mouse rotate left
									animations += "onrunturnleft,";
									break;
								case 39: //arrow e rotate right
								case 69: //e rotate right
									if (WTW.shiftKey) {
										animations += "onrunturnright,";
									} else {
										animations += "onturnright,";
									}
									break;
								case 1039: //mouse rotate right
									animations += "onturnright,";
									break;
								case 2039: //mouse rotate right
									animations += "onrunturnright,";
									break;
								case 65: //a strafe left
								case 1065: //mouse strafe left
									if (WTW.shiftKey) {
										animations += "onrunstrafeleft,";
									} else {
										animations += "onstrafeleft,";
									}
									break;
								case 2065: //mouse strafe left
									animations += "onrunstrafeleft,";
									break;
								case 68: //d strafe right
								case 1068: //mouse strafe right
									if (WTW.shiftKey) {
										animations += "onrunstraferight,";
									} else {
										animations += "onstraferight,";
									}
									break;
								case 2068: //mouse strafe right
									animations += "onrunstraferight,";
									break;								
								case 82: //r rotate up
								case 1082: //mouse rotate up
									animations += "onrotateup,";
									break;
								case 70: //f rotate down
								case 1070: //mouse rotate down
									animations += "onrotatedown,";
									break;
						}
					} else {
						animations += WTW.keysPressed[i];
					}
				}
			}
		}
		if (WTW.keysPressed.length == 0 || animations == '') {
			animations += "onwait,";
		}
		if (WTWMultiplayer.chatQueue != null) {
			if (WTWMultiplayer.chatQueue.length > 0) {
				if (WTWMultiplayer.chatQueue[0] != null) {
					if (WTWMultiplayer.chatQueue[0].chatid != undefined && WTWMultiplayer.chatQueue[0].chattext != undefined) {
						chatid = WTWMultiplayer.chatQueue[0].chatid;
						chattext = WTWMultiplayer.chatQueue[0].chattext;
						WTWMultiplayer.chatQueue.splice(0,1);
					}
				}
			}
		}
		var myavatarid = dGet('wtw_tmyavatarid').value;
		if (dGet('wtw_tuserid').value == '') {
			myavatarid = dGet('wtw_tmyavataridanon').value;
		}
		var surl = wtw_domainurl + "/connect/wtw-multiplayer-tracking.php?" +
			"i=" + btoa(dGet('wtw_tinstanceid').value) + 
			"&u=" + btoa(myavatarid) + 
			"&d=" + btoa(dGet('wtw_tuserid').value) + 
			"&c=" + btoa(communityid) + 
			"&b=" + btoa(buildingid) + 
			"&x=" + btoa(WTW.myAvatar.position.x) + 
			"&y=" + btoa(WTW.myAvatar.position.y) + 
			"&z=" + btoa(WTW.myAvatar.position.z) + 
			"&r=" + btoa(WTW.getDegrees(WTW.myAvatar.rotation.x)) + 
			"&o=" + btoa(WTW.getDegrees(WTW.myAvatar.rotation.y)) + 
			"&t=" + btoa(WTW.getDegrees(WTW.myAvatar.rotation.z)) + 
			"&w=" + btoa(WTW.walkSpeed) + 
			"&v=" + btoa(WTW.walkSpeed * 1.5) + 
			"&a=" + btoa(animations) + 
			"&m=" + btoa(WTWMultiplayer.multiPlayer) +
			"&ci=" + btoa(chatid) + 
			"&ct=" + btoa(chattext);
		WTW.getJSON(surl, 
			function(response) {
				WTWMultiplayer.renderTrackingMovement(JSON.parse(response));
			}
		);
	} catch (ex) {
		WTWMultiplayer.trackMovement = 0;
		WTW.log("multiuser-tracking-setTrackMovement=" + ex.message);
	} 
}

wtwmultiplayer.prototype.getAvatarInstance = function(avatarnamepart) {
	var instanceid = "";
	try {
		if (avatarnamepart.indexOf('-') > -1) {
			var nameparts = avatarnamepart.split('-');
			if (nameparts[0] == 'person' && nameparts[1] != null) {
				instanceid = nameparts[1];
			}
		}
	} catch(ex) {
		WTW.log("multiuser-tracking-getAvatarInstance=" + ex.message);
	}
	return instanceid;
}

wtwmultiplayer.prototype.setAvatarInstanceState = function(instanceid, loaded) {
	try {
		if (WTWMultiplayer.avatars != null) {
			if (WTWMultiplayer.avatars.length > 0) {
				for (var i=0;i<WTWMultiplayer.avatars.length;i++) {
					if (WTWMultiplayer.avatars[i] != null) {
						if (WTWMultiplayer.avatars[i].instanceid != null) {
							if (WTWMultiplayer.avatars[i].instanceid == instanceid) {
								WTWMultiplayer.avatars[i].loaded = loaded;
							}
						}
					}
				}
			}
		} else {
			WTWMultiplayer.avatars = [];
		}
	} catch (ex) {
		WTW.log("multiuser-tracking-setAvatarInstanceState=" + ex.message);
	}
}

wtwmultiplayer.prototype.getAvatarInstanceState = function(instanceid, zuserid) {
	var avatarind = -1;
	var loaded = 0;
	try {
		if (instanceid != dGet('wtw_tinstanceid').value) {
			if (WTWMultiplayer.avatars != null) {
				if (WTWMultiplayer.avatars.length > 0) {
					for (var i=0;i<WTWMultiplayer.avatars.length;i++) {
						if (WTWMultiplayer.avatars[i] != null) {
							if (WTWMultiplayer.avatars[i].instanceid != null) {
								if (WTWMultiplayer.avatars[i].instanceid == instanceid && WTWMultiplayer.avatars[i].userid == zuserid) {
									avatarind = i;
									loaded = WTWMultiplayer.avatars[i].loaded;
								}
							}
						}
					}
				}
			} else {
				WTWMultiplayer.avatars = [];
			}
		} else {
			loaded = 2;
		}
	} catch (ex) {
		WTW.log("multiuser-tracking-getAvatarInstanceState=" + ex.message);
	}
	return {
		'avatarind':avatarind,
		'loaded':loaded
	};
}

wtwmultiplayer.prototype.renderTrackingMovement = function(trackdefs) {
	try {
		if (trackdefs != null && trackdefs != undefined) {
			if(trackdefs.length > 0) {
				for (var i=trackdefs.length; i > -1; i--) {
					if (trackdefs[i] != null && trackdefs[i] != undefined) {
						if (i == 0) {
							WTWMultiplayer.receiveChatText(trackdefs[i].chat.chatid, trackdefs[i].chat.chattext);
						}
						var instanceid = trackdefs[i].instanceid;
						if (instanceid != dGet('wtw_tinstanceid').value) {
							var zuserid = trackdefs[i].userid;
							var instancestate = WTWMultiplayer.getAvatarInstanceState(instanceid, zuserid);
							var posx = Number(trackdefs[i].position.x);
							var posy = Number(trackdefs[i].position.y);
							var posz = Number(trackdefs[i].position.z);
							var selectavatarind = Number(trackdefs[i].avatarind);
							var posdist = Math.sqrt((WTW.myAvatar.position.x-posx)*(WTW.myAvatar.position.x-posx) + (WTW.myAvatar.position.y-posy)*(WTW.myAvatar.position.y-posy) + (WTW.myAvatar.position.z-posz)*(WTW.myAvatar.position.z-posz));
							if (posdist < 1000 && posdist > 1) {
								if (instancestate.loaded == '0') {
									var avatarind = WTWMultiplayer.avatars.length;
									WTWMultiplayer.avatars[avatarind] = WTW.newAvatarDef();
									WTWMultiplayer.avatars[avatarind].instanceid = instanceid;
									WTWMultiplayer.avatars[avatarind].avatarind = selectavatarind;
									WTWMultiplayer.avatars[avatarind].userid = zuserid;
									WTWMultiplayer.avatars[avatarind].updated = true;
									WTWMultiplayer.avatars[avatarind].lastupdate = false;
									WTWMultiplayer.avatars[avatarind].loaded = '1';
									WTWMultiplayer.getMultiUserAvatar(instanceid, zuserid);
								} else {
									if (WTWMultiplayer.avatars[instancestate.avatarind] != null) {
										if (instancestate.loaded == '2') {
											var avatar = scene.getMeshByID("person-" + WTWMultiplayer.avatars[instancestate.avatarind].instanceid);
											//if (avatar == null) {
											//	WTWMultiplayer.avatars.splice(instancestate.avatarind,1);
											//	WTWMultiplayer.avatars[instancestate.avatarind].lastupdate = false;
											//} else {
												WTWMultiplayer.avatars[instancestate.avatarind].loaded = '2';
												WTWMultiplayer.avatars[instancestate.avatarind].avatarind = selectavatarind;
												WTWMultiplayer.avatars[instancestate.avatarind].lastposition.x = WTWMultiplayer.avatars[instancestate.avatarind].position.x;
												WTWMultiplayer.avatars[instancestate.avatarind].lastposition.y = WTWMultiplayer.avatars[instancestate.avatarind].position.y;
												WTWMultiplayer.avatars[instancestate.avatarind].lastposition.z = WTWMultiplayer.avatars[instancestate.avatarind].position.z;
												WTWMultiplayer.avatars[instancestate.avatarind].lastrotation.x = WTWMultiplayer.avatars[instancestate.avatarind].rotation.x;
												WTWMultiplayer.avatars[instancestate.avatarind].lastrotation.y = WTWMultiplayer.avatars[instancestate.avatarind].rotation.y;
												WTWMultiplayer.avatars[instancestate.avatarind].lastrotation.z = WTWMultiplayer.avatars[instancestate.avatarind].rotation.z;
												WTWMultiplayer.avatars[instancestate.avatarind].lastmoveevents = WTWMultiplayer.avatars[instancestate.avatarind].moveevents;
												WTWMultiplayer.avatars[instancestate.avatarind].position.x = posx;
												WTWMultiplayer.avatars[instancestate.avatarind].position.y = posy;
												WTWMultiplayer.avatars[instancestate.avatarind].position.z = posz;
												WTWMultiplayer.avatars[instancestate.avatarind].rotation.x = Number(trackdefs[i].rotation.x);
												WTWMultiplayer.avatars[instancestate.avatarind].rotation.y = Number(trackdefs[i].rotation.y);
												WTWMultiplayer.avatars[instancestate.avatarind].rotation.z = Number(trackdefs[i].rotation.z);
												WTWMultiplayer.avatars[instancestate.avatarind].updated = true;
												var moveevents = [];
												var animations = trackdefs[i].activeanimations.split(',');
												for (var a=0;a<animations.length;a++) {
													if (animations[a] != null) {
														if (animations[a] != '') {
															moveevents[moveevents.length] = animations[a];
														}
													}
												}
												WTWMultiplayer.avatars[instancestate.avatarind].moveevents = moveevents;
												WTWMultiplayer.avatars[instancestate.avatarind].lastupdate = true;
											//}
										} else {
											WTWMultiplayer.avatars[instancestate.avatarind].updated = true;
											WTWMultiplayer.avatars[instancestate.avatarind].lastupdate = false;
										}
									}
								}
							} else {
								WTW.addDisposeMoldToQueue("person-" + instanceid);
								if (instancestate.avatarind > -1) {
									WTWMultiplayer.avatars.splice(instancestate.avatarind,1);
								}
							}
						}
					}
				}
			}
		}
		if (WTWMultiplayer.avatars != null) {
			if (WTWMultiplayer.avatars.length > 0) {
				for (var i=WTWMultiplayer.avatars.length;i>-1;i--) {
					if (WTWMultiplayer.avatars[i] != null && WTWMultiplayer.avatars[i] != undefined) {
						if (WTWMultiplayer.avatars[i].instanceid != null) {
							if (WTWMultiplayer.avatars[i].updated) {
								WTWMultiplayer.avatars[i].updated = false;
							} else {
								WTW.addDisposeMoldToQueue("person-" + WTWMultiplayer.avatars[i].instanceid);
								WTWMultiplayer.avatars.splice(i,1);
							}
						}
					}
				}
			}
		}
		WTW.refreshLastMoveEvents = true;
		WTWMultiplayer.trackMovement = 0;
	} catch (ex) {
		WTWMultiplayer.trackMovement = 0;
		WTW.log("multiuser-tracking-renderTrackingMovement=" + ex.message);
	} 
}

wtwmultiplayer.prototype.runOtherAvatarMovement = function() {
	try {
		if (WTWMultiplayer.avatars != null) {
			if (WTWMultiplayer.avatars.length > 0) {
				for (var i=0;i<WTWMultiplayer.avatars.length;i++) {
					if (WTWMultiplayer.avatars[i] != null) {
						if (WTWMultiplayer.avatars[i].loaded != undefined) {
							if (WTWMultiplayer.avatars[i].loaded == '2') {
								var avatar = scene.getMeshByID("person-" + WTWMultiplayer.avatars[i].instanceid);
								if (avatar != null) {
									WTWMultiplayer.setOtherAvatarMovement(avatar, i, WTWMultiplayer.avatars[i]);
								}
							}
						}
					}
				}
			}
		}
		WTWMultiplayer.moveAvatars = 0;
	} catch (ex) {
		WTW.log("multiuser-tracking-runOtherAvatarMovement=" + ex.message);
	} 
}

wtwmultiplayer.prototype.setOtherAvatarMovement = function(avatar, avatarind, trackdef) {
	try {
		var moveevents = trackdef.moveevents;
		var lastmoveevents = trackdef.lastmoveevents;
		var increment = .05;
		var positionx = 0;
		var positiony = 0;
		var positionz = 0;
		var lastposx = 0;
		var lastposy = 0;
		var lastposz = 0;
		var rotationx = 0;
		var rotationy = 0;
		var rotationz = 0;
		var lastrotx = 0;
		var lastroty = 0;
		var lastrotz = 0;
		var walkspeed = .5;
		if (trackdef.position.x != undefined) {
			if (WTW.isNumeric(trackdef.position.x)) {
				positionx = Number(trackdef.position.x);
			}
		}
		if (trackdef.position.y != undefined) {
			if (WTW.isNumeric(trackdef.position.y)) {
				positiony = Number(trackdef.position.y);
			}
		}
		if (trackdef.position.z != undefined) {
			if (WTW.isNumeric(trackdef.position.z)) {
				positionz = Number(trackdef.position.z);
			}
		}
		if (trackdef.lastposition.x != undefined) {
			if (WTW.isNumeric(trackdef.lastposition.x)) {
				lastposx = Number(trackdef.lastposition.x);
			}
		}
		if (trackdef.lastposition.y != undefined) {
			if (WTW.isNumeric(trackdef.lastposition.y)) {
				lastposy = Number(trackdef.lastposition.y);
			}
		}
		if (trackdef.lastposition.z != undefined) {
			if (WTW.isNumeric(trackdef.lastposition.z)) {
				lastposz = Number(trackdef.lastposition.z);
			}
		}
		if (trackdef.rotation.x != undefined) {
			if (WTW.isNumeric(trackdef.rotation.x)) {
				//rotationx = Number(trackdef.rotation.x);
			}
		}
		if (trackdef.rotation.y != undefined) {
			if (WTW.isNumeric(trackdef.rotation.y)) {
				rotationy = Number(trackdef.rotation.y);
			}
		}
		if (trackdef.rotation.z != undefined) {
			if (WTW.isNumeric(trackdef.rotation.z)) {
				//rotationz = Number(trackdef.rotation.z);
			}
		}
		if (trackdef.lastrotation.x != undefined) {
			if (WTW.isNumeric(trackdef.lastrotation.x)) {
				//lastrotx = Number(trackdef.lastrotation.x);
			}
		}
		if (trackdef.lastrotation.y != undefined) {
			if (WTW.isNumeric(trackdef.lastrotation.y)) {
				lastroty = Number(trackdef.lastrotation.y);
			}
		}
		if (trackdef.lastrotation.z != undefined) {
			if (WTW.isNumeric(trackdef.lastrotation.z)) {
				//lastrotz = Number(trackdef.lastrotation.z);
			}
		}
		if (trackdef.object.walkspeed != undefined) {
			if (WTW.isNumeric(trackdef.object.walkspeed)) {
				walkspeed = Number(trackdef.object.walkspeed);
			}
		}
		if (WTWMultiplayer.avatars[avatarind].lastupdate != undefined) {
			if (WTWMultiplayer.avatars[avatarind].lastupdate == true) {
				avatar.position = new BABYLON.Vector3(lastposx, lastposy, lastposz);
				WTWMultiplayer.avatars[avatarind].lastupdate = false;
			} else {
				WTWMultiplayer.avatars[avatarind].lastposition.x = lastposx;
				WTWMultiplayer.avatars[avatarind].lastposition.y = lastposy;
				WTWMultiplayer.avatars[avatarind].lastposition.z = lastposz;
			}
		}
		if (avatar.WTW != null) {
			if (avatar.WTW.animations != null) {
				if (avatar.WTW.animations.running != null) {
					var avatarcamera = scene.getMeshByID("myavatar-" + dGet("wtw_tinstanceid").value + "-camera");
					var weight = 0;
					for(var key in avatar.WTW.animations.running) {
						if (avatar.WTW.animations.running[key] != null) {
							if (key == 'onwait' && WTW.isInArray(moveevents, key) == false) {
								avatar.WTW.animations.running[key].weight = 0;
							} else if (WTW.isInArray(lastmoveevents, key) && WTW.isInArray(moveevents, key)) {
								if (avatar.WTW.animations.running[key].weight > 1/lastmoveevents.length) {
									if (avatar.WTW.animations.running[key].weight - 1/lastmoveevents.length > increment) {
										avatar.WTW.animations.running[key].weight -= increment;
									} else {
										avatar.WTW.animations.running[key].weight = 1/lastmoveevents.length;
									}
								} else if (avatar.WTW.animations.running[key].weight < 1/lastmoveevents.length) {
									if (1/lastmoveevents.length - avatar.WTW.animations.running[key].weight > increment) {
										avatar.WTW.animations.running[key].weight += increment;
									} else {
										avatar.WTW.animations.running[key].weight = 1/lastmoveevents.length;
									}
								}
							} else if (WTW.isInArray(moveevents, key)) {
								if (avatar.WTW.animations.running[key].weight < 1/moveevents.length) {
									if (1/moveevents.length - avatar.WTW.animations.running[key].weight > increment) {
										avatar.WTW.animations.running[key].weight += increment;
									} else {
										avatar.WTW.animations.running[key].weight = 1/moveevents.length;
									}
								}
							} else if (WTW.isInArray(lastmoveevents, key)) {
								if (avatar.WTW.animations.running[key].weight > 0) {
									if (avatar.WTW.animations.running[key].weight > increment) {
										avatar.WTW.animations.running[key].weight -= increment;
									} else {
										avatar.WTW.animations.running[key].weight = 0;
									}
								}
							} else {
								if (key != 'onwait') {
									avatar.WTW.animations.running[key].weight = 0;
								}
							}
							weight += avatar.WTW.animations.running[key].weight;
							if (avatar.WTW.animations.running[key].weight > 0) {
								switch (key) {
									case 'onwait':
										if (moveevents.length == 1) {
											avatar.position = new BABYLON.Vector3(positionx, positiony, positionz);
											avatar.rotation = new BABYLON.Vector3(WTW.getRadians(rotationx), WTW.getRadians(rotationy), WTW.getRadians(rotationz));
										}
										break;
									case 'onwalk':
											avatar.rotation = new BABYLON.Vector3(WTW.getRadians(rotationx), WTW.getRadians(rotationy), WTW.getRadians(rotationz));
											var stride =  (-15 * avatar.WTW.animations.running[key].weight) / WTW.fps; //WTW.walkSpeed
											var move = new BABYLON.Vector3(parseFloat(Math.sin(avatar.rotation.y)) * stride, -WTW.init.gravity, parseFloat(Math.cos(avatar.rotation.y)) * stride);
											var direction = new BABYLON.Vector3(parseFloat(Math.sin(avatar.rotation.y)) * stride, 0, parseFloat(Math.cos(avatar.rotation.y)) * stride);
											var ray = new BABYLON.Ray(avatar.position, direction, 50);
											var hit = scene.pickWithRay(ray);
											if (hit.pickedMesh){
												if (hit.distance < 2) {
													move = new BABYLON.Vector3(parseFloat(Math.sin(avatar.rotation.y)) * stride, 0, parseFloat(Math.cos(avatar.rotation.y)) * stride);
												}
											}
											avatar.moveWithCollisions(move);
										break;
									case 'onrun':
										avatar.rotation = new BABYLON.Vector3(WTW.getRadians(rotationx), WTW.getRadians(rotationy), WTW.getRadians(rotationz));
											var stride =  (-25 * avatar.WTW.animations.running[key].weight) / WTW.fps; //  / WTW.walkSpeed
											var move = new BABYLON.Vector3(parseFloat(Math.sin(avatar.rotation.y)) * stride, -WTW.init.gravity, parseFloat(Math.cos(avatar.rotation.y)) * stride);
											var direction = new BABYLON.Vector3(parseFloat(Math.sin(avatar.rotation.y)) * stride, 0, parseFloat(Math.cos(avatar.rotation.y)) * stride);
											var ray = new BABYLON.Ray(avatar.position, direction, 50);
											var hit = scene.pickWithRay(ray);
											if (hit.pickedMesh){
												if (hit.distance < 2) {
													move = new BABYLON.Vector3(parseFloat(Math.sin(avatar.rotation.y)) * stride, 0, parseFloat(Math.cos(avatar.rotation.y)) * stride);
												}
											}	
											avatar.moveWithCollisions(move);
										break;
									case 'onwalkbackwards':
										avatar.rotation = new BABYLON.Vector3(WTW.getRadians(rotationx), WTW.getRadians(rotationy), WTW.getRadians(rotationz));
											var stride =  10 * avatar.WTW.animations.running[key].weight / WTW.fps; //  / WTW.walkSpeed
											var move = new BABYLON.Vector3(parseFloat(Math.sin(avatar.rotation.y)) * stride, -WTW.init.gravity, parseFloat(Math.cos(avatar.rotation.y)) * stride);
											var direction = new BABYLON.Vector3(parseFloat(Math.sin(avatar.rotation.y)) * stride, 0, parseFloat(Math.cos(avatar.rotation.y)) * stride);
											var ray = new BABYLON.Ray(avatar.position, direction, 50);
											var hit = scene.pickWithRay(ray);
											if (hit.pickedMesh){
												if (hit.distance < 2) {
													move = new BABYLON.Vector3(parseFloat(Math.sin(avatar.rotation.y)) * stride, 0, parseFloat(Math.cos(avatar.rotation.y)) * stride);
												}
											}	
											avatar.moveWithCollisions(move);
										break;
									case 'onrunbackwards':
										avatar.rotation = new BABYLON.Vector3(WTW.getRadians(rotationx), WTW.getRadians(rotationy), WTW.getRadians(rotationz));
											var stride =  25 * avatar.WTW.animations.running[key].weight / WTW.fps; //  / WTW.walkSpeed
											var move = new BABYLON.Vector3(parseFloat(Math.sin(avatar.rotation.y)) * stride, -WTW.init.gravity, parseFloat(Math.cos(avatar.rotation.y)) * stride);
											var direction = new BABYLON.Vector3(parseFloat(Math.sin(avatar.rotation.y)) * stride, 0, parseFloat(Math.cos(avatar.rotation.y)) * stride);
											var ray = new BABYLON.Ray(avatar.position, direction, 50);
											var hit = scene.pickWithRay(ray);
											if (hit.pickedMesh){
												if (hit.distance < 2) {
													move = new BABYLON.Vector3(parseFloat(Math.sin(avatar.rotation.y)) * stride, 0, parseFloat(Math.cos(avatar.rotation.y)) * stride);
												}
											}	
											avatar.moveWithCollisions(move);
										break;
									case 'onturnleft':
										if (moveevents.length == 1) {
											avatar.rotation.y -= WTW.getRadians(25 * avatar.WTW.animations.running[key].weight / WTW.fps);
										}
										break;
									case 'onrunturnleft':
										if (moveevents.length == 1) {
											avatar.rotation.y -= WTW.getRadians(60 * avatar.WTW.animations.running[key].weight / WTW.fps);
										}
										break;
									case 'onturnright':
										if (moveevents.length == 1) {
											avatar.rotation.y += WTW.getRadians(25 * avatar.WTW.animations.running[key].weight / WTW.fps);
										}
										break;
									case 'onrunturnright':
										if (moveevents.length == 1) {
											avatar.rotation.y += WTW.getRadians(60 * avatar.WTW.animations.running[key].weight / WTW.fps);
										}
										break;
									case 'onstrafeleft':
										avatar.rotation = new BABYLON.Vector3(WTW.getRadians(rotationx), WTW.getRadians(rotationy), WTW.getRadians(rotationz));
										var stride =  6 * avatar.WTW.animations.running[key].weight / WTW.fps;
										var move = new BABYLON.Vector3(parseFloat(Math.cos(avatar.rotation.y)) * stride, -WTW.init.gravity, parseFloat(Math.sin(avatar.rotation.y)) * -stride);
										var direction = new BABYLON.Vector3(parseFloat(Math.cos(avatar.rotation.y)) * stride, 0, parseFloat(Math.sin(avatar.rotation.y)) * -stride);
										var ray = new BABYLON.Ray(avatar.position, direction, 50);
										var hit = scene.pickWithRay(ray);
										if (hit.pickedMesh){
											if (hit.distance < 2) {
												move = new BABYLON.Vector3(parseFloat(Math.cos(avatar.rotation.y)) * stride, 0, parseFloat(Math.sin(avatar.rotation.y)) * -stride);
											}
										}	
										avatar.moveWithCollisions(move);
										break;
									case 'onrunstrafeleft':
										var stride =  15 * avatar.WTW.animations.running[key].weight / WTW.fps;
										var move = new BABYLON.Vector3(parseFloat(Math.cos(avatar.rotation.y)) * stride, -WTW.init.gravity, parseFloat(Math.sin(avatar.rotation.y)) * -stride);
										var direction = new BABYLON.Vector3(parseFloat(Math.cos(avatar.rotation.y)) * stride, 0, parseFloat(Math.sin(avatar.rotation.y)) * -stride);
										var ray = new BABYLON.Ray(avatar.position, direction, 50);
										var hit = scene.pickWithRay(ray);
										if (hit.pickedMesh){
											if (hit.distance < 2) {
												move = new BABYLON.Vector3(parseFloat(Math.cos(avatar.rotation.y)) * stride, 0, parseFloat(Math.sin(avatar.rotation.y)) * -stride);
											}
										}	
										avatar.moveWithCollisions(move);
										break;
									case 'onstraferight':
										avatar.rotation = new BABYLON.Vector3(WTW.getRadians(rotationx), WTW.getRadians(rotationy), WTW.getRadians(rotationz));
										var stride =  -6 * avatar.WTW.animations.running[key].weight / WTW.fps;
										var move = new BABYLON.Vector3(parseFloat(Math.cos(avatar.rotation.y)) * stride, -WTW.init.gravity, parseFloat(Math.sin(avatar.rotation.y)) * -stride);
										var direction = new BABYLON.Vector3(parseFloat(Math.cos(avatar.rotation.y)) * stride, 0, parseFloat(Math.sin(avatar.rotation.y)) * -stride);
										var ray = new BABYLON.Ray(avatar.position, direction, 50);
										var hit = scene.pickWithRay(ray);
										if (hit.pickedMesh){
											if (hit.distance < 2) {
												move = new BABYLON.Vector3(parseFloat(Math.cos(avatar.rotation.y)) * stride, 0, parseFloat(Math.sin(avatar.rotation.y)) * -stride);
											}
										}	
										avatar.moveWithCollisions(move);
										break;
									case 'onrunstraferight':
										var stride =  -15 * avatar.WTW.animations.running[key].weight / WTW.fps;
										var move = new BABYLON.Vector3(parseFloat(Math.cos(avatar.rotation.y)) * stride, -WTW.init.gravity, parseFloat(Math.sin(avatar.rotation.y)) * -stride);
										var direction = new BABYLON.Vector3(parseFloat(Math.cos(avatar.rotation.y)) * stride, 0, parseFloat(Math.sin(avatar.rotation.y)) * -stride);
										var ray = new BABYLON.Ray(avatar.position, direction, 50);
										var hit = scene.pickWithRay(ray);
										if (hit.pickedMesh){
											if (hit.distance < 2) {
												move = new BABYLON.Vector3(parseFloat(Math.cos(avatar.rotation.y)) * stride, 0, parseFloat(Math.sin(avatar.rotation.y)) * -stride);
											}
										}	
										avatar.moveWithCollisions(move);
										break;
								}
							} 
						}
					}
					if (weight < 1) {
						if (avatar.WTW.animations.running['onwait'] != null) {
							avatar.WTW.animations.running['onwait'].weight += (1-weight);
						}
					}
					WTW.setAvatarSync(avatar.WTW.animations.running, moveevents);
				}
			}
		} 
	} catch(ex) {
		WTW.log("multiuser-tracking-setOtherAvatarMovement=" + ex.message);
	}
}

wtwmultiplayer.prototype.toggleMultiPlayer = function() {
	try {
		if (dGet('wtw_submenumultiplayertext').innerHTML == 'Multi-Player is Off') {
			dGet('wtw_submenumultiplayertext').innerHTML = 'Multi-Player is On';
			dGet('wtw_menumultiplayer').src = '/content/system/images/menumultiplayer.png';
			dGet('wtw_submenumultiplayer').src = '/content/system/images/menumultiplayer.png';
			dGet('wtw_submenumultiplayer').alt = 'Turn Multi-Player Off';
			dGet('wtw_submenumultiplayer').title = 'Turn Multi-Player Off';
			if (dGet('wtw_tavatarcount').value == '' || WTW.isNumeric(dGet('wtw_tavatarcount').value) == false) {
				dGet('wtw_tavatarcount').value = '20';
			}
			WTWMultiplayer.multiPlayer = dGet('wtw_tavatarcount').value;
			WTWMultiplayer.multiPlayerOn = 1;
			WTW.setCookie("multiplayeron","1",30);
			WTW.setCookie("multiplayer",WTWMultiplayer.multiPlayer,30);
			if (WTW.setupMode == 0) {
				WTWMultiplayer.initMultiuser();
			}
		} else {
			dGet('wtw_submenumultiplayertext').innerHTML = 'Multi-Player is Off';
			dGet('wtw_menumultiplayer').src = '/content/system/images/menumultiplayeroff.png';
			dGet('wtw_submenumultiplayer').src = '/content/system/images/menumultiplayeroff.png';
			dGet('wtw_submenumultiplayer').alt = 'Turn Multi-Player On';
			dGet('wtw_submenumultiplayer').title = 'Turn Multi-Player On';
			if (dGet('wtw_tavatarcount').value == '' || WTW.isNumeric(dGet('wtw_tavatarcount').value) == false) {
				dGet('wtw_tavatarcount').value = '0';
			}
			WTWMultiplayer.multiPlayer = dGet('wtw_tavatarcount').value;
			WTWMultiplayer.multiPlayerOn = 0;
			WTW.setCookie("multiplayeron","0",30);
			WTW.setCookie("multiplayer",WTWMultiplayer.multiPlayer,30);
			WTWMultiplayer.clearMultiuser(dGet('wtw_tinstanceid').value, dGet('wtw_tuserid').value);
		}
	} catch (ex) {
		WTW.log("multiuser-tracking-toggleMultiPlayer=" +ex.message);
	}
}

wtwmultiplayer.prototype.toggleAvatarIDs = function() {
	try {
		var setvisibility = false;
		if (dGet('wtw_submenuavataridstext').innerHTML == 'Avatar IDs are Off') {
			dGet('wtw_submenuavataridstext').innerHTML = 'Avatar IDs are On';
			dGet('wtw_submenuavatarids').src = '/content/system/images/menuavataridson.png';
			dGet('wtw_submenuavatarids').alt = 'Turn Avatar IDs Off';
			dGet('wtw_submenuavatarids').title = 'Turn Avatar IDs Off';
			WTWMultiplayer.AvatarIDs = 1;
			WTW.setCookie("AvatarIDs",WTWMultiplayer.AvatarIDs,30);
			setvisibility = true;
		} else {
			dGet('wtw_submenuavataridstext').innerHTML = 'Avatar IDs are Off';
			dGet('wtw_submenuavatarids').src = '/content/system/images/menuavataridsoff.png';
			dGet('wtw_submenuavatarids').alt = 'Turn Avatar IDs On';
			dGet('wtw_submenuavatarids').title = 'Turn Avatar IDs On';
			WTWMultiplayer.AvatarIDs = 0;
			WTW.setCookie("AvatarIDs",WTWMultiplayer.AvatarIDs,30);
		}
		var meshes = scene.meshes;
		if (meshes != null) {
			for (var i=0;i<meshes.length;i++) {
				if (meshes[i] != null) {
					if (meshes[i].name.indexOf("person-") > -1 && meshes[i].name.indexOf("-nameplate") > -1) {
						meshes[i].isVisible = setvisibility;
					}
				}
			}
		}
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-toggleAvatarIDs=" +ex.message);
    }
}

wtwmultiplayer.prototype.showAvatarIDs = function(avatarname, avatardef) {
	try {
		var displayname = 'Anonymous';
		if (avatardef.displayname != undefined) {
			displayname = avatardef.displayname;
		}
		if (displayname != '' && avatarname.indexOf('person-') > -1) {
			var avatar = scene.getMeshByID(avatarname);
			var molddef = WTW.newMold();
			molddef.webtext.webtext = displayname;
			molddef.webtext.webstyle = JSON.stringify({
				"anchor":"center",
				"letter-height":1.00,
				"letter-thickness":.10,
				"color":"#0000ff",
				"alpha":1.00,
				"colors":{
					"diffuse":"#f0f0f0",
					"specular":"#000000",
					"ambient":"#808080",
					"emissive":"#0000ff"
				}
			});
			var namemold = WTW.addMold3DText(avatarname + '-nameplate', molddef, 1, 1, 1);
			namemold.parent = avatar;
			namemold.position.y = 16;
			namemold.billboardMode = 2;
			if (WTWMultiplayer.AvatarIDs == 0) {
				namemold.isVisible = false;
			}
		}
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-showAvatarIDs=" +ex.message);
    }
}

wtwmultiplayer.prototype.renderLoopAfterInit = function() {
	try {
		if (WTWMultiplayer.trackMovement == 0 && WTWMultiplayer.multiPlayerOn == 1) {
			WTWMultiplayer.trackMovement = 1;
			WTWMultiplayer.setTrackMovement();
		}
		if (WTWMultiplayer.moveAvatars == 0) {
			WTWMultiplayer.moveAvatars = 1;
			WTWMultiplayer.runOtherAvatarMovement();
		}
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-renderLoopAfterInit=" +ex.message);
    }
}

wtwmultiplayer.prototype.loadUserSettings = function() {
	try {
		var AvatarIDs = WTW.getCookie("AvatarIDs");
		if (AvatarIDs != null) {
			if (WTW.isNumeric(AvatarIDs)) {
				WTWMultiplayer.AvatarIDs = Number(AvatarIDs);
			}
		}
		if (WTWMultiplayer.AvatarIDs == 0) {
			dGet('wtw_submenuavataridstext').innerHTML = 'Avatar IDs are Off';
			dGet('wtw_submenuavatarids').src = '/content/system/images/menuavataridsoff.png';
			dGet('wtw_submenuavatarids').alt = 'Turn Avatar IDs On';
			dGet('wtw_submenuavatarids').title = 'Turn Avatar IDs On';
		}
		var multiplayeron = WTW.getCookie("multiplayeron");
		if (multiplayeron != null) {
			if (multiplayeron == "0") {
				WTWMultiplayer.multiPlayerOn = 0;
				dGet('wtw_submenumultiplayertext').innerHTML = 'Multi-Player is Off';
				dGet('wtw_menumultiplayer').src = '/content/system/images/menumultiplayeroff.png';
				dGet('wtw_submenumultiplayer').src = '/content/system/images/menumultiplayeroff.png';
				dGet('wtw_submenumultiplayer').alt = 'Turn Multi-Player On';
				dGet('wtw_submenumultiplayer').title = 'Turn Multi-Player On';
			}
		}
		var multiplayer = WTW.getCookie("multiplayer");
		if (multiplayer != null) {
			if (WTW.isNumeric(multiplayer)) {
				WTWMultiplayer.multiPlayer = Number(multiplayer);
			} else {
				WTWMultiplayer.multiPlayer = 20;
			}
		} else {
			WTWMultiplayer.multiPlayer = 20;
		}
		dGet('wtw_tavatarcount').value = WTWMultiplayer.multiPlayer;
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-loadUserSettings=" +ex.message);
    }
}

wtwmultiplayer.prototype.activateMultiplayer = function() {
	try {
		if (WTWMultiplayer.multiPlayerOn == 1) {
			if (WTW.isNumeric(WTWMultiplayer.multiPlayer)) {
				if (Number(WTWMultiplayer.multiPlayer) > 0 && WTW.setupMode == 0) {
					window.setTimeout(function() {WTWMultiplayer.initMultiuser();},1000);
				}
			}
		}
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-activateMultiplayer=" +ex.message);
    }
}

wtwmultiplayer.prototype.multiPersonInActionZone = function(zactionzone) {
	var zintersects = false;
	try {
		for (var i=0; i < WTWMultiplayer.avatars.length; i++) {
			if (WTWMultiplayer.avatars[i] != null) {
				var avatarname = "person-" + WTWMultiplayer.avatars[i].instanceid;
				var avatar1 = scene.getMeshByID(avatarname);
				if (avatar1 != null) {
					zintersects = avatar1.intersectsMesh(zactionzone, false); // precise false
				}
				if (zintersects == true) {
					i = WTWMultiplayer.avatars.length;
				}
			}
		}
	} catch(ex){
		WTW.log("core-multiPersonInActionZone=" + ex.message);
	}
	return zintersects;
}



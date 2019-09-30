// "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. 
// Patent fully incorporates the concepts for:
//      the use of three dimensional structures or buildings as websites, 
//      first person movement between websites (i.e. Pan and Walk), 
//      and connecting three dimensional websites on grids to make virtual communities.
// HTTP3D, http://3d, https://3d, and "Walk the Web" are USPTO Trademarks of Aaron Scott Dishno Ed.D. and HTTP3D Inc.
// All code is Copyright 2013-2019 Aaron Scott Dishno Ed.D. (Author of the code) and HTTP3D Inc. 
// Use of the code, trademarks or Patent concepts without written authorization of Aaron Scott Dishno Ed.D. is strictly prohibited.
// Licensing, developer opportunities, and hosted solution options available, please contact adishno@walktheweb.com for details.

WTWJS.prototype.initMultiuser = function() {
	try {
		var objectfolder = "";
		var objectfile = "";
		var httpsecure = "0";
		var scalingx = "1";
		var scalingy = "1";
		var scalingz = "1";
		var privacy = "0";
		if (WTW.myAvatar != null) {
			if (WTW.myAvatar.WTW != null) {
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
		var myavatarid = dGet('wtw_tmyavatarid').value;
		if (dGet('wtw_tuserid').value == '') {
			myavatarid = dGet('wtw_tmyavataridanon').value;
		}
		var surl = "https://3dnet.walktheweb.com/connect/updateavatar.php?" +
			"&i=" + btoa(dGet('wtw_tinstanceid').value) + 
			"&u=" + btoa(myavatarid) + 
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
			"&a=" + btoa(dGet('wtw_tuserip').value);
		WTW.getJSON(surl, 
			function(response) {}
		);
	} catch (ex) {
		WTW.log("multiuser-tracking-initMultiuser=" + ex.message);
	} 
}

WTWJS.prototype.getMultiUserAvatar = function(instance, zuserid) {
	try {
		for (var i = 0; i < scene.meshes.length; i++) {
			var moldname = scene.meshes[i].name;
			if (moldname.indexOf("person-") > -1) {
				WTW.addDisposeMoldToQueue(moldname);
			}
		}
		var surl = "https://3dnet.walktheweb.com/connect/getavatar.php?" + 
			"i=" + btoa(instance) + 
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
						WTW.setAvatarInstanceState(avatardef.instanceid,'2');
					}
				}
			}
		); 
	} catch (ex) {
		WTW.log("multiuser-tracking-getMultiUserAvatar=" + ex.message);
	}
}

WTWJS.prototype.clearMultiuser = function(instance, zuserid) {
	try {
		for (var i = 0; i < scene.meshes.length; i++) {
			var moldname = scene.meshes[i].name;
			if (moldname.indexOf("person-") > -1) {
				WTW.addDisposeMoldToQueue(moldname);
			}
		}
		var surl = "https://3dnet.walktheweb.com/connect/clearavatar.php?" + 
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

WTWJS.prototype.getAvatarInstance = function(avatarnamepart) {
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

WTWJS.prototype.setAvatarInstanceState = function(instanceid, loaded) {
	try {
		if (WTW.avatars != null) {
			if (WTW.avatars.length > 0) {
				for (var i=0;i<WTW.avatars.length;i++) {
					if (WTW.avatars[i] != null) {
						if (WTW.avatars[i].instanceid != null) {
							if (WTW.avatars[i].instanceid == instanceid) {
								WTW.avatars[i].loaded = loaded;
							}
						}
					}
				}
			}
		} else {
			WTW.avatars = [];
		}
	} catch (ex) {
		WTW.log("multiuser-tracking-setAvatarInstanceState=" + ex.message);
	}
}

WTWJS.prototype.getAvatarInstanceState = function(instanceid, zuserid) {
	var avatarind = -1;
	var loaded = 0;
	try {
		if (WTW.avatars != null) {
			if (WTW.avatars.length > 0) {
				for (var i=0;i<WTW.avatars.length;i++) {
					if (WTW.avatars[i] != null) {
						if (WTW.avatars[i].instanceid != null) {
							if (WTW.avatars[i].instanceid == instanceid && WTW.avatars[i].userid == zuserid) {
								avatarind = i;
								loaded = WTW.avatars[i].loaded;
							}
						}
					}
				}
			}
		} else {
			WTW.avatars = [];
		}
	} catch (ex) {
		WTW.log("multiuser-tracking-getAvatarInstanceState=" + ex.message);
	}
	return {
		'avatarind':avatarind,
		'loaded':loaded
	};
}

WTWJS.prototype.getAvatarDisplayName = function(instanceid) {
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

WTWJS.prototype.setTrackMovement = function() {
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
		if (WTW.chatQueue != null) {
			if (WTW.chatQueue.length > 0) {
				if (WTW.chatQueue[0] != null) {
					if (WTW.chatQueue[0].chatid != undefined && WTW.chatQueue[0].chattext != undefined) {
						chatid = WTW.chatQueue[0].chatid;
						chattext = WTW.chatQueue[0].chattext;
						WTW.chatQueue.splice(0,1);
					}
				}
			}
		}
		var myavatarid = dGet('wtw_tmyavatarid').value;
		if (dGet('wtw_tuserid').value == '') {
			myavatarid = dGet('wtw_tmyavataridanon').value;
		}
		var surl = "https://3dnet.walktheweb.com/connect/track.php?" +
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
			"&m=" + btoa(WTW.multiPerson) +
			"&ci=" + btoa(chatid) + 
			"&ct=" + btoa(chattext);
		WTW.getJSON(surl, 
			function(response) {
				WTW.renderTrackingMovement(JSON.parse(response));
			}
		);
	} catch (ex) {
		WTW.log("multiuser-tracking-setTrackMovement=" + ex.message);
	} 
}

WTWJS.prototype.renderTrackingMovement = function(trackdefs) {
	try {
		if (trackdefs != null && trackdefs != undefined) {
			if(trackdefs.length > 0) {
				for (var i=0; i < trackdefs.length; i++) {
					if (trackdefs[i] != null && trackdefs[i] != undefined) {
						if (i == 0) {
							WTW.receiveChatText(trackdefs[i].chat.chatid, trackdefs[i].chat.chattext);
						}
						var instanceid = trackdefs[i].instanceid;
						var zuserid = trackdefs[i].userid;
						var instancestate = WTW.getAvatarInstanceState(instanceid, zuserid);
						if (instanceid != dGet('wtw_tinstanceid').value) {
							var posx = Number(trackdefs[i].position.x);
							var posy = Number(trackdefs[i].position.y);
							var posz = Number(trackdefs[i].position.z);
							var selectavatarind = Number(trackdefs[i].avatarind);
							var posdist = Math.sqrt((WTW.myAvatar.position.x-posx)*(WTW.myAvatar.position.x-posx) + (WTW.myAvatar.position.y-posy)*(WTW.myAvatar.position.y-posy) + (WTW.myAvatar.position.z-posz)*(WTW.myAvatar.position.z-posz));
							if (posdist < 1000 && posdist > 1) {
								if (instancestate.loaded == '0') {
									var avatarind = WTW.avatars.length;
									WTW.avatars[avatarind] = WTW.newAvatarDef();
									WTW.avatars[avatarind].instanceid = instanceid;
									WTW.avatars[avatarind].avatarind = selectavatarind;
									WTW.avatars[avatarind].userid = zuserid;
									WTW.avatars[avatarind].updated = true;
									WTW.avatars[avatarind].lastupdate = false;
									WTW.avatars[avatarind].loaded = '1';
									WTW.getMultiUserAvatar(instanceid, zuserid);
								} else {
									if (WTW.avatars[instancestate.avatarind] != null) {
										if (instancestate.loaded == '2') {
											var avatar = scene.getMeshByID("person-" + WTW.avatars[instancestate.avatarind].instanceid);
											if (avatar == null) {
												WTW.avatars.splice(instancestate.avatarind,1);
												WTW.avatars[instancestate.avatarind].lastupdate = false;
											} else {
												WTW.avatars[instancestate.avatarind].loaded = '2';
												WTW.avatars[instancestate.avatarind].avatarind = selectavatarind;
												WTW.avatars[instancestate.avatarind].lastposition.x = WTW.avatars[instancestate.avatarind].position.x;
												WTW.avatars[instancestate.avatarind].lastposition.y = WTW.avatars[instancestate.avatarind].position.y;
												WTW.avatars[instancestate.avatarind].lastposition.z = WTW.avatars[instancestate.avatarind].position.z;
												WTW.avatars[instancestate.avatarind].lastrotation.x = WTW.avatars[instancestate.avatarind].rotation.x;
												WTW.avatars[instancestate.avatarind].lastrotation.y = WTW.avatars[instancestate.avatarind].rotation.y;
												WTW.avatars[instancestate.avatarind].lastrotation.z = WTW.avatars[instancestate.avatarind].rotation.z;
												WTW.avatars[instancestate.avatarind].lastmoveevents = WTW.avatars[instancestate.avatarind].moveevents;
												WTW.avatars[instancestate.avatarind].position.x = posx;
												WTW.avatars[instancestate.avatarind].position.y = posy;
												WTW.avatars[instancestate.avatarind].position.z = posz;
												WTW.avatars[instancestate.avatarind].rotation.x = Number(trackdefs[i].rotation.x);
												WTW.avatars[instancestate.avatarind].rotation.y = Number(trackdefs[i].rotation.y);
												WTW.avatars[instancestate.avatarind].rotation.z = Number(trackdefs[i].rotation.z);
												WTW.avatars[instancestate.avatarind].updated = true;
												var moveevents = [];
												var animations = trackdefs[i].activeanimations.split(',');
												for (var a=0;a<animations.length;a++) {
													if (animations[a] != null) {
														if (animations[a] != '') {
															moveevents[moveevents.length] = animations[a];
														}
													}
												}
												WTW.avatars[instancestate.avatarind].moveevents = moveevents;
												WTW.avatars[instancestate.avatarind].lastupdate = true;
											}
										} else {
											WTW.avatars[instancestate.avatarind].updated = true;
											WTW.avatars[instancestate.avatarind].lastupdate = false;
										}
									}
								}
							} else {
								WTW.addDisposeMoldToQueue("person-" + instanceid);
								if (instancestate.avatarind > -1) {
									WTW.avatars.splice(instancestate.avatarind,1);
								}
							}
						}
					}
				}
			}
		}
		if (WTW.avatars != null) {
			if (WTW.avatars.length > 0) {
				for (var i=WTW.avatars.length;i>-1;i--) {
					if (WTW.avatars[i] != null && WTW.avatars[i] != undefined) {
						if (WTW.avatars[i].instanceid != null) {
							if (WTW.avatars[i].updated) {
								WTW.avatars[i].updated = false;
							} else {
								WTW.addDisposeMoldToQueue("person-" + WTW.avatars[i].instanceid);
								WTW.avatars.splice(i,1);
							}
						}
					}
				}
			}
		}
		WTW.refreshLastMoveEvents = true;
		WTW.trackMovement = 0;
	} catch (ex) {
		WTW.log("multiuser-tracking-renderTrackingMovement=" + ex.message);
	} 
}

WTWJS.prototype.runOtherAvatarMovement = function() {
	try {
		if (WTW.avatars != null) {
			if (WTW.avatars.length > 0) {
				for (var i=0;i<WTW.avatars.length;i++) {
					if (WTW.avatars[i] != null) {
						if (WTW.avatars[i].loaded != undefined) {
							if (WTW.avatars[i].loaded == '2') {
								var avatar = scene.getMeshByID("person-" + WTW.avatars[i].instanceid);
								if (avatar != null) {
									WTW.setOtherAvatarMovement(avatar, i, WTW.avatars[i]);
								}
							}
						}
					}
				}
			}
		}
		WTW.moveAvatars = 0;
	} catch (ex) {
		WTW.log("multiuser-tracking-runOtherAvatarMovement=" + ex.message);
	} 
}

WTWJS.prototype.setOtherAvatarMovement = function(avatar, avatarind, trackdef) {
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
		if (WTW.avatars[avatarind].lastupdate != undefined) {
			if (WTW.avatars[avatarind].lastupdate == true) {
				avatar.position = new BABYLON.Vector3(lastposx, lastposy, lastposz);
				WTW.avatars[avatarind].lastupdate = false;
			} else {
				WTW.avatars[avatarind].lastposition.x = lastposx;
				WTW.avatars[avatarind].lastposition.y = lastposy;
				WTW.avatars[avatarind].lastposition.z = lastposz;
			}
		}
		//WTW.setAvatarMovement(avatar, moveevents);
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




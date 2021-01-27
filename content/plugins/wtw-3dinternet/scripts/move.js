/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

WTW_3DINTERNET.prototype.initMoveSocket = function() {
	try {
		if (wtw3dinternet.move == null) {
			wtw3dinternet.move = io.connect('https://3dnet.walktheweb.network/move');
			
			wtw3dinternet.move.on('serror', function(message) {
				WTW.log("error = " + message,'red');
			}); 
			
			wtw3dinternet.move.on('login', function(data) {
				if (wtw3dinternet.masterMove == '1') {
					// Whenever the server emits 'login', add user to count
					wtw3dinternet.addParticipantsMessage(data); 
				}
			});

			wtw3dinternet.move.on('user joined', function(data) {
				if (wtw3dinternet.masterMove == '1') {
					wtw3dinternet.addParticipantsMessage(data);
					zavatar = scene.getMeshByID('person' + data.instanceid);
					if (zavatar == null) {
						if (data.instanceid != dGet('wtw_tinstanceid').value) {
							let zavatarind = wtw3dinternet.getAvatarInd(data.instanceid);
							if (wtw3dinternet.avatars[zavatarind] == null) {
								wtw3dinternet.avatars[wtw3dinternet.avatars.length] = {
									'instanceid':data.instanceid,
									'placeholder':data.placeholder,
									'userid':data.userid,
									'position':{
										'x':WTW.init.startPositionX,
										'y':WTW.init.startPositionY,
										'z':WTW.init.startPositionZ
									},
									'rotation':{
										'x':WTW.init.startRotationX,
										'y':WTW.init.startRotationY,
										'z':WTW.init.startRotationZ
									},
									'loadcounter':0,
									'loaded':'0'
								};
							}
							if (WTW.isNumeric(data.placeholder)) {
								if (Number(data.placeholder) == 0) {
									WTW.getSavedAvatar("person-" + data.instanceid, data.globaluseravatarid, data.useravatarid, data.avatarid, false);
								}
							}
						}
					}
				}
			});

			wtw3dinternet.move.on('user left', function(data) {
				// Whenever the server emits 'user left', fade and remove the avatar
				wtw3dinternet.addParticipantsMessage(data);
				wtw3dinternet.removeAvatar(data.avatarname);
			});

			wtw3dinternet.move.on('set disabled', function(data) {
				// Whenever the server emits 'user left', fade and remove the avatar
				wtw3dinternet.addParticipantsMessage(data);
				wtw3dinternet.removeAllAvatars();
			});

			wtw3dinternet.move.on('reconnect', function() {
				wtw3dinternet.move.emit('add user', {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
					'roomid':communityid + buildingid + thingid,
					'domainurl':wtw_domainurl,
					'instanceid':dGet('wtw_tinstanceid').value,
					'placeholder':WTW.placeHolder,
					'userid':dGet('wtw_tuserid').value,
					'globaluseravatarid':dGet('wtw_tglobaluseravatarid').value,
					'useravatarid':dGet('wtw_tuseravatarid').value,
					'avatarid':dGet('wtw_tavatarid').value,
					'displayname':btoa(dGet('wtw_tdisplayname').value)
				});
			});

			wtw3dinternet.move.on('reconnect_error', function() {
				WTW.log('reconnect failed');
			});

			wtw3dinternet.move.on('avatar movement', function(zmovedata) {
				/* process runs when another avatar in the scene moves */
				if (wtw3dinternet.masterMove == '1') {
					var zavatarname = "person-" + zmovedata.instanceid;
					let zavatarind = wtw3dinternet.getAvatarInd(zmovedata.instanceid);
					if (wtw3dinternet.avatars[zavatarind] == null) {
						zavatarind = wtw3dinternet.avatars.length;
						wtw3dinternet.avatars[zavatarind] = {
							'instanceid':zmovedata.instanceid,
							'placeholder':zmovedata.placeholder,
							'userid':zmovedata.userid,
							'position':{
								'x':WTW.init.startPositionX,
								'y':WTW.init.startPositionY,
								'z':WTW.init.startPositionZ
							},
							'rotation':{
								'x':WTW.init.startRotationX,
								'y':WTW.init.startRotationY,
								'z':WTW.init.startRotationZ
							},
							'loadcounter':0,
							'loaded':'0'
						};
						if (zmovedata.instanceid != dGet('wtw_tinstanceid').value) {
							if (WTW.isNumeric(zmovedata.placeholder)) {
								if (Number(zmovedata.placeholder) == 0) {
									WTW.getSavedAvatar("person-" + zmovedata.instanceid, zmovedata.globaluseravatarid, zmovedata.useravatarid, zmovedata.avatarid, false);
								}
							}
						}
					}
					var zavatar = scene.getMeshByID(zavatarname);
					if (zavatar != null) {
						if (zavatar.position.x != zmovedata.position.x || zavatar.position.y != zmovedata.position.y || zavatar.position.z != zmovedata.position.z) {
							zavatar.position.x = zmovedata.position.x;
							zavatar.position.y = zmovedata.position.y;
							zavatar.position.z = zmovedata.position.z;
							WTW.checkZones = true;
						}
						zavatar.rotation.x = zmovedata.rotation.x;
						zavatar.rotation.y = zmovedata.rotation.y;
						zavatar.rotation.z = zmovedata.rotation.z;
						for (var i=0;i<zmovedata.moveevents.length;i++) {
							if (zmovedata.moveevents[i] != null && zavatar.WTW.animations.running != null) {
								if (zavatar.WTW.animations.running[zmovedata.moveevents[i].event] != null) {
									zavatar.WTW.animations.running[zmovedata.moveevents[i].event].weight = zmovedata.moveevents[i].weight;
									switch (zmovedata.moveevents[i].event) {
										case 'onwait':
										case 'onrotateup':
										case 'onrotatedown':
											break;
										case 'onturnleft':
										case 'onturnright':
											zavatar.WTW.animations.running[zmovedata.moveevents[i].event].speedRatio = zmovedata.turnanimationspeed;
											break;
										case 'onrunturnleft':
										case 'onrunturnright':
											zavatar.WTW.animations.running[zmovedata.moveevents[i].event].speedRatio = zmovedata.turnanimationspeed * 1.5;
											break;
										default:
											zavatar.WTW.animations.running[zmovedata.moveevents[i].event].speedRatio = zmovedata.walkanimationspeed;
											break;
									}
								}
							}
						}
					} else if (wtw3dinternet.avatars[zavatarind].loaded == '0' && wtw3dinternet.avatars[zavatarind].loadcounter > 3000) {
						if (zmovedata.instanceid != dGet('wtw_tinstanceid').value) {
							wtw3dinternet.avatars[zavatarind].loadcounter = 0;
							if (WTW.isNumeric(zmovedata.placeholder)) {
								if (Number(zmovedata.placeholder) == 0) {
									WTW.getSavedAvatar("person-" + zmovedata.instanceid, zmovedata.globaluseravatarid, zmovedata.useravatarid, zmovedata.avatarid, false);
								}
							}
						}
					} else {
						if (wtw3dinternet.avatars[zavatarind] != null) {
							wtw3dinternet.avatars[zavatarind].position.x = zmovedata.position.x;
							wtw3dinternet.avatars[zavatarind].position.y = zmovedata.position.y;
							wtw3dinternet.avatars[zavatarind].position.z = zmovedata.position.z;
							wtw3dinternet.avatars[zavatarind].rotation.x = zmovedata.rotation.x;
							wtw3dinternet.avatars[zavatarind].rotation.y = zmovedata.rotation.y;
							wtw3dinternet.avatars[zavatarind].rotation.z = zmovedata.rotation.z;
							wtw3dinternet.avatars[zavatarind].loadcounter += 1;
						}
					}
				}
			});

			wtw3dinternet.move.emit('add user', {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'serverip':dGet('wtw_serverip').value,
				'roomid':communityid + buildingid + thingid,
				'domainurl':wtw_domainurl,
				'instanceid':dGet('wtw_tinstanceid').value,
				'userid':dGet('wtw_tuserid').value,
				'placeholder':WTW.placeHolder,
				'globaluseravatarid':dGet('wtw_tglobaluseravatarid').value,
				'useravatarid':dGet('wtw_tuseravatarid').value,
				'avatarid':dGet('wtw_tavatarid').value,
				'displayname':btoa(dGet('wtw_tdisplayname').value)
			});

			wtw3dinternet.move.on('wtwadminresponse', function(zresponse) {
				WTW.log('response=' + zresponse);
			});

			wtw3dinternet.move.on('receive scene command', function(data) {
				if (wtw3dinternet.masterMove == '1') {
					wtw3dinternet.processSceneCommand(data);
				}
			});

/*			/ * sample to be added in your code whereever you need to send a command * /
			wtw3dinternet.move.emit('wtwadmin', {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'roomid':communityid + buildingid + thingid,
				'command':'YOURCOMMAND' 
				/ * add any other values you need to pass here * /
			});
*/
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-move.js-initMoveSocket=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.processSceneCommand = function(data) {
	try {
		switch (data.text) {
			case "leave scene":
				wtw3dinternet.removeAvatar("person-" + data.instanceid);
				break;
			case "refresh avatar":
				let zavatarind = wtw3dinternet.getAvatarInd(data.instanceid);
				if (zavatarind > -1 && data.instanceid != dGet('wtw_tinstanceid').value) {
					if (WTW.isNumeric(data.placeholder)) {
						if (Number(data.placeholder) == 0) {
							WTW.getSavedAvatar("person-" + data.instanceid, data.globaluseravatarid, data.useravatarid, data.avatarid, false);
						}
					}
				}
				break;
		}
		if (wtw3dinternet.masterMove == '1') {
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-chat.js-processSceneCommand=" + ex.message);
	} 
}
			
WTW_3DINTERNET.prototype.moveAvatar = function(zavatar, zmoveevents) {
	try {
		if (wtw3dinternet.masterMove == '1') {
			if (wtw3dinternet.move != null) {
				/* send multiplayer the position and animations */
				let zmovedata = {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
					'roomid':communityid + buildingid + thingid,
					'globaluseravatarid':dGet('wtw_tglobaluseravatarid').value,
					'useravatarid':dGet('wtw_tuseravatarid').value,
					'avatarid':dGet('wtw_tavatarid').value,
					'instanceid':dGet('wtw_tinstanceid').value,
					'placeholder': WTW.placeHolder,
					'userid':dGet('wtw_tuserid').value,
					'displayname':btoa(dGet('wtw_tdisplayname').value),
					'walkspeed':WTW.walkSpeed,
					'walkanimationspeed':WTW.walkAnimationSpeed,
					'turnspeed':WTW.turnSpeed,
					'turnanimationspeed':WTW.turnAnimationSpeed,
					'position':{
						'x':WTW.myAvatar.position.x,
						'y':WTW.myAvatar.position.y,
						'z':WTW.myAvatar.position.z
					},
					'rotation':{
						'x':WTW.myAvatar.rotation.x,
						'y':WTW.myAvatar.rotation.y,
						'z':WTW.myAvatar.rotation.z
					},
					'moveevents':zmoveevents
				};
				wtw3dinternet.move.emit('my avatar movement', zmovedata);
			}
		} else {
			if (wtw3dinternet.move != null) {
				wtw3dinternet.move.emit('disable',{});
			}
			wtw3dinternet.removeAllAvatars();
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-move.js-moveAvatar=" + ex.message);
	} 
}
		
WTW_3DINTERNET.prototype.getMoveEventsArray = function(zmoveeventscsv) {
	var zmoveevents = [];
	try {
		if (zmoveeventscsv != undefined) {
			if (zmoveeventscsv.indexOf(',') > -1) {
				let zmovearray = zmoveeventscsv.split(',');
				for (let i=0;i<zmovearray.length;i++) {
					if (zmovearray[i] != '') {
						zmoveevents[zmoveevents.length] = trim(zmovearray[i]);
					}
				}
			} else {
				zmoveevents[zmoveevents.length] = zmoveeventscsv;
			}
		} else {
			zmoveevents[zmoveevents.length] = 'onwait';
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-move.js-getMoveEventsArray=" + ex.message);
	} 
	return zmoveevents;
}

WTW_3DINTERNET.prototype.getAvatarInd = function(zinstanceid) {
	var zavatarind = -1;
	try {
		for (var i=0;i<wtw3dinternet.avatars.length;i++) {
			if (wtw3dinternet.avatars[i] != null) {
				if (wtw3dinternet.avatars[i].instanceid != undefined) {
					if (wtw3dinternet.avatars[i].instanceid == zinstanceid) {
						zavatarind = i;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-move.js-getAvatarInd=" + ex.message);
	} 
	return zavatarind;
}

WTW_3DINTERNET.prototype.addParticipantsMessage = function(data) {
	try {
		if (data.usercount > 0 && wtw3dinternet.masterMove == '1') {
			document.getElementById('participantsMessage').innerHTML = "&nbsp;" + data.usercount + " Walkers";
		} else {
			document.getElementById('participantsMessage').innerHTML = '';
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-move.js-addParticipantsMessage=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.removeAvatar = function(zavatarname) {
	try {
		for (var i=wtw3dinternet.avatars.length;i>0;i--) {
			if (wtw3dinternet.avatars[i] != null) {
				if (wtw3dinternet.avatars[i].instanceid != undefined) {
					if (wtw3dinternet.avatars[i].instanceid == zavatarname.replace("person-","")) {
						wtw3dinternet.avatars.splice(i,1);
					}
				}
			}
		}
		var zfade = window.setInterval(function() {
			var zfaded = true;
			var zavatarparent = scene.getMeshByID(zavatarname + "-scale");
			if (zavatarparent != null) {
			var zavatarparts = zavatarparent.getChildren();
				if (zavatarparts != null) {
					if (zavatarparts.length > 0) {
						for (var i=0;i< zavatarparts.length;i++) {
							if (zavatarparts.material != undefined) {
								if (zavatarparts.material.alpha > 0) {
									zfaded = false;
									zavatarparts.material.alpha -= .05;
								} else {
									zavatarparts.material.alpha = 0;
								}
							}
						}
					}
				}
			}
			if (zfaded) {
				window.clearInterval(zfade);
				var zavatar = scene.getMeshByID(zavatarname);
				if (zavatar != null) {
					WTW.disposeClean(zavatarname);
				}
			}
		},100);
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-move.js-removeAvatar=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.removeAllAvatars = function() {
	try {
		for (var i=0; i<wtw3dinternet.avatars.length;i++) {
			if (wtw3dinternet.avatars[i] != null) {
				if (wtw3dinternet.avatars[i].instanceid != undefined) {
					wtw3dinternet.removeAvatar("person-" + wtw3dinternet.avatars[i].instanceid);
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-move.js-removeAllAvatars=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.savedAvatarRetrieved = function(zavatarname, zsendrefresh) {
	try {
		if (zavatarname.indexOf("person-") > -1) {
			let zinstanceid = zavatarname.split('-')[1];
			let zavatarind = wtw3dinternet.getAvatarInd(zinstanceid);
			if (wtw3dinternet.avatars[zavatarind] != null) {
				wtw3dinternet.avatars[zavatarind].loaded = '1';
				let zavatar1 = scene.getMeshByID(zavatarname);
				if (zavatar1 != null) {
					zavatar1.position.x = wtw3dinternet.avatars[zavatarind].position.x;
					zavatar1.position.y = wtw3dinternet.avatars[zavatarind].position.y;
					zavatar1.position.z = wtw3dinternet.avatars[zavatarind].position.z;
					zavatar1.rotation.y = wtw3dinternet.avatars[zavatarind].rotation.y;
					zavatar1.parent = WTW.mainParentMold;
				}
			}
		}
		if (zsendrefresh && zavatarname.indexOf("myavatar-") > -1) {
			wtw3dinternet.initMultiuser(true);
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-move.js-savedAvatarRetrieved=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.initMultiuser = async function(zsendrefresh) {
	try {
		var zavatarid = '';
		var zobjectfolder = "";
		var zobjectfile = "";
		var zhttpsecure = "0";
		var zscalingx = "1";
		var zscalingy = "1";
		var zscalingz = "1";
		var zprivacy = "0";
		if (WTW.myAvatar != null) {
			if (WTW.myAvatar.WTW != null) {
				if (WTW.myAvatar.WTW.avatarid != undefined) {
					zavatarid = WTW.myAvatar.WTW.avatarid;
				}
				if (WTW.myAvatar.WTW.objects != null) {
					if (WTW.myAvatar.WTW.objects.folder != undefined) {
						zobjectfolder = WTW.myAvatar.WTW.objects.folder;
					}
					if (WTW.myAvatar.WTW.objects.file != undefined) {
						zobjectfile = WTW.myAvatar.WTW.objects.file;
					}
				}
				if (WTW.myAvatar.WTW.scaling != null) {
					if (WTW.myAvatar.WTW.scaling.x != undefined) {
						zscalingx = WTW.myAvatar.WTW.scaling.x;
					}
					if (WTW.myAvatar.WTW.scaling.y != undefined) {
						zscalingy = WTW.myAvatar.WTW.scaling.y;
					}
					if (WTW.myAvatar.WTW.scaling.z != undefined) {
						zscalingz = WTW.myAvatar.WTW.scaling.z;
					}
				}
			}
		}

		if (dGet('wtw_menudisplayname').innerHTML == '' && dGet('wtw_tdisplayname').value != '') {
			dGet('wtw_menudisplayname').innerHTML = dGet('wtw_tdisplayname').value;
		}
		if (dGet('wtw_menudisplayname').innerHTML == '' && dGet('wtw_tuseremail').value != '') {
			var zemailbase = dGet('wtw_tuseremail').value.split('@');
			dGet('wtw_menudisplayname').innerHTML = zemailbase[0];
		}
		if (dGet('wtw_menudisplayname').innerHTML == '') {
			dGet('wtw_menudisplayname').innerHTML = 'Anonymous';
		}
		if (wtw_protocol.toLowerCase().indexOf('https') > -1) { zhttpsecure = "1"; }
		var zenteranimation = WTW.getDDLValue('wtw_tselectavataranimation-enter');
		var zenteranimationparameter = "";
		var zexitanimation = "1";
		var zexitanimationparameter = "";
		if (WTW.isNumeric(zenteranimation) == false) {
			zenteranimation = '1';
		}
		var zurl = wtw_domainurl + "/connect/wtw-3dinternet-updateavatar.php?" +
			"&i=" + btoa(dGet('wtw_tinstanceid').value) + 
			"&g=" + btoa(dGet('wtw_tglobaluseravatarid').value) + 
			"&u=" + btoa(dGet('wtw_tuseravatarid').value) + 
			"&ad=" + btoa(zavatarid) + 
			"&d=" + btoa(dGet('wtw_tuserid').value) + 
			"&o=" + btoa(zobjectfolder) + 
			"&f=" + btoa(zobjectfile) + 
			"&m=" + btoa(wtw_domainname) + 
			"&s=" + btoa(zhttpsecure) + 
			"&x=" + btoa(zscalingx) + 
			"&y=" + btoa(zscalingy) + 
			"&z=" + btoa(zscalingz) + 
			"&n=" + btoa(dGet('wtw_menudisplayname').innerHTML) + 
			"&p=" + btoa(zprivacy) + 
			"&en=" + btoa(zenteranimation) + 
			"&enp=" + btoa(zenteranimationparameter) + 
			"&ex=" + btoa(zexitanimation) + 
			"&exp=" + btoa(zexitanimationparameter) + 
			"&w=" + btoa(WTW.walkSpeed) + 
			"&v=" + btoa(WTW.walkAnimationSpeed) + 
			"&t=" + btoa(WTW.turnSpeed) + 
			"&r=" + btoa(WTW.turnAnimationSpeed) + 
			"&a=" + btoa(dGet('wtw_tuserip').value) +
			"&si=" + btoa(dGet('wtw_serverinstanceid').value) +
			"&at=" + dGet('wtw_tusertoken').value +
			"&refresh=" + zsendrefresh;
		WTW.getAsyncJSON(zurl, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.refresh) {
					wtw3dinternet.sendCommand('', 'scene command', 'refresh avatar');
				}
			}
		);
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-move.js-initMultiuser=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.clearMultiuser = async function(zuseravatarid, zinstance, zuserid) {
	try {
		for (var i = 0; i < scene.meshes.length; i++) {
			var zmoldname = scene.meshes[i].name;
			if (zmoldname.indexOf("person-") > -1) {
				WTW.addDisposeMoldToQueue(zmoldname);
			}
		}
		if (wtw3dinternet.move != null) {
			wtw3dinternet.move.emit('disconnect', {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'serverip':dGet('wtw_serverip').value,
				'roomid':communityid + buildingid + thingid,
				'domainurl':wtw_domainurl,
				'siteurl':wtw_websiteurl,
				'instanceid':dGet('wtw_tinstanceid').value,
				'userid':dGet('wtw_tuserid').value,
				'displayname':btoa(dGet('wtw_tdisplayname').value)
			});
			wtw3dinternet.sendCommand('', 'scene command', 'leave scene');
			var zurl = wtw_domainurl + "/connect/wtw-3dinternet-clearavatar.php?" + 
				"a=" + btoa(zuseravatarid) + 
				"&i=" + btoa(zinstance) + 
				"&d=" + btoa(zuserid) + 
				"&c=" + btoa(communityid) + 
				"&b=" + btoa(buildingid);
			WTW.getAsyncJSON(zurl, 
				function(zresponse) {
					//zresponse = JSON.parse(zresponse);
				}
			);
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-move.js-clearMultiuser=" + ex.message);
	}
}

WTW_3DINTERNET.prototype.toggleMultiPlayer = function() {
	try {
		if (dGet('wtw_submenumultiplayertext').innerHTML == 'Multi-Player is Off') {
			dGet('wtw_submenumultiplayertext').innerHTML = 'Multi-Player is On';
			dGet('wtw_submenumultiplayer').src = '/content/system/images/menumultiplayer.png';
			dGet('wtw_submenumultiplayer').alt = 'Turn Multi-Player Off';
			dGet('wtw_submenumultiplayer').title = 'Turn Multi-Player Off';
			if (dGet('wtw_tavatarcount').value == '' || WTW.isNumeric(dGet('wtw_tavatarcount').value) == false) {
				dGet('wtw_tavatarcount').value = '20';
			}
			wtw3dinternet.multiPlayer = dGet('wtw_tavatarcount').value;
			wtw3dinternet.multiPlayerOn = 1;
			WTW.setCookie("multiplayeron","1",30);
			WTW.setCookie("multiplayer",wtw3dinternet.multiPlayer,30);
			wtw3dinternet.initMultiuser(false);
		} else {
			dGet('wtw_submenumultiplayertext').innerHTML = 'Multi-Player is Off';
			dGet('wtw_submenumultiplayer').src = '/content/system/images/menumultiplayeroff.png';
			dGet('wtw_submenumultiplayer').alt = 'Turn Multi-Player On';
			dGet('wtw_submenumultiplayer').title = 'Turn Multi-Player On';
			if (dGet('wtw_tavatarcount').value == '' || WTW.isNumeric(dGet('wtw_tavatarcount').value) == false) {
				dGet('wtw_tavatarcount').value = '0';
			}
			wtw3dinternet.multiPlayer = dGet('wtw_tavatarcount').value;
			wtw3dinternet.multiPlayerOn = 0;
			WTW.setCookie("multiplayeron","0",30);
			WTW.setCookie("multiplayer",wtw3dinternet.multiPlayer,30);
			wtw3dinternet.clearMultiuser(dGet('wtw_tuseravatarid').value, dGet('wtw_tinstanceid').value, dGet('wtw_tuserid').value);
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-move.js-toggleMultiPlayer=" +ex.message);
	}
}

WTW_3DINTERNET.prototype.toggleAvatarIDs = function() {
	try {
		var zsetvisibility = false;
		if (dGet('wtw_submenuavataridstext').innerHTML == 'Avatar IDs are Off') {
			dGet('wtw_submenuavataridstext').innerHTML = 'Avatar IDs are On';
			dGet('wtw_submenuavatarids').src = '/content/system/images/menuavataridson.png';
			dGet('wtw_submenuavatarids').alt = 'Turn Avatar IDs Off';
			dGet('wtw_submenuavatarids').title = 'Turn Avatar IDs Off';
			wtw3dinternet.AvatarIDs = 1;
			WTW.setCookie("AvatarIDs",wtw3dinternet.AvatarIDs,30);
			zsetvisibility = true;
		} else {
			dGet('wtw_submenuavataridstext').innerHTML = 'Avatar IDs are Off';
			dGet('wtw_submenuavatarids').src = '/content/system/images/menuavataridsoff.png';
			dGet('wtw_submenuavatarids').alt = 'Turn Avatar IDs On';
			dGet('wtw_submenuavatarids').title = 'Turn Avatar IDs On';
			wtw3dinternet.AvatarIDs = 0;
			WTW.setCookie("AvatarIDs",wtw3dinternet.AvatarIDs,30);
		}
		var zmeshes = scene.meshes;
		if (zmeshes != null) {
			for (var i = 0;i < zmeshes.length;i++) {
				if (zmeshes[i] != null) {
					if (zmeshes[i].name.indexOf("person-") > -1 && zmeshes[i].name.indexOf("-nameplate") > -1) {
						zmeshes[i].isVisible = zsetvisibility;
					}
				}
			}
		}
    } catch (ex) {
        WTW.log("plugins:wtw-3dinternet:scripts-move.js-toggleAvatarIDs=" +ex.message);
    }
}

WTW_3DINTERNET.prototype.showAvatarIDs = function(zavatarname, zavatardef) {
	try {
		var zdisplayname = 'Anonymous';
		if (zavatardef.displayname != undefined) {
			zdisplayname = zavatardef.displayname;
		}
		try {
			zdisplayname = atob(zdisplayname);
		} catch (ex) {}
		if (zdisplayname != '' && zavatarname.indexOf('person-') > -1) {
			var zavatar = scene.getMeshByID(zavatarname);
			var zmolddef = WTW.newMold();
			zmolddef.webtext.webtext = zdisplayname;
			zmolddef.webtext.webstyle = JSON.stringify({
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
			var znamemold = WTW.addMold3DText(zavatarname + '-nameplate', zmolddef, 1, 1, 1);
			znamemold.parent = zavatar;
			znamemold.position.y = 16;
			znamemold.billboardMode = 2;
			if (wtw3dinternet.AvatarIDs == 0) {
				znamemold.isVisible = false;
			}
		}
    } catch (ex) {
        WTW.log("plugins:wtw-3dinternet:scripts-move.js-showAvatarIDs=" +ex.message);
    }
}

WTW_3DINTERNET.prototype.activateMultiplayer = function() {
	try {
		if (wtw3dinternet.multiPlayerOn == 1) {
			if (WTW.isNumeric(wtw3dinternet.multiPlayer)) {
				if (Number(wtw3dinternet.multiPlayer) > 0) {
					window.setTimeout(function() {wtw3dinternet.initMultiuser(false);},1000);
				}
			}
		}
    } catch (ex) {
        WTW.log("plugins:wtw-3dinternet:scripts-move.js-activateMultiplayer=" +ex.message);
    }
}

WTW_3DINTERNET.prototype.multiPersonInActionZone = function(zactionzone) {
	var zintersects = false;
	try {
		for (var i=0; i < wtw3dinternet.avatars.length; i++) {
			if (wtw3dinternet.avatars[i] != null) {
				var zavatarname = "person-" + wtw3dinternet.avatars[i].instanceid;
				var zavatar = scene.getMeshByID(zavatarname);
				if (zavatar != null) {
					zintersects = zavatar.intersectsMesh(zactionzone, false); // precise false
				}
				if (zintersects) {
					i = wtw3dinternet.avatars.length;
				}
			}
		}
	} catch(ex){
		WTW.log("plugins:wtw-3dinternet:scripts-move.js-multiPersonInActionZone=" + ex.message);
	}
	return zintersects;
}

WTW_3DINTERNET.prototype.sendCommand = function(ztoinstanceid, zaction, ztext) {
	try {
		if (wtw3dinternet.masterMove == '1' && wtw3dinternet.move != null) {
			let zroomid = communityid + buildingid + thingid;
			wtw3dinternet.move.emit(zaction, {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'serverip':dGet('wtw_serverip').value,
				'roomid':zroomid,
				'placeholder':WTW.placeHolder,
				'globaluseravatarid':dGet('wtw_tglobaluseravatarid').value,
				'useravatarid':dGet('wtw_tuseravatarid').value,
				'avatarid':dGet('wtw_tavatarid').value,
				'userid':dGet('wtw_tuserid').value,
				'instanceid':dGet('wtw_tinstanceid').value,
				'toinstanceid':ztoinstanceid,
				'text':ztext
			});
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-move.js-sendCommand=" + ex.message);
	} 
}

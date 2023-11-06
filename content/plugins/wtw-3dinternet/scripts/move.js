/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

WTW_3DINTERNET.prototype.initMoveSocket = function() {
	/* initiate the listeners for WalkTheWeb Move channel multiplayer tracking */
	try {
		if (wtw3dinternet.move == null) {
			wtw3dinternet.move = io.connect('https://3dnet.walktheweb.network/move', {transports: ['websocket', "polling"]});
			wtw3dinternet.move.emit('wtwconnect', {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'serverip':dGet('wtw_serverip').value,
				'userip':dGet('wtw_tuserip').value,
				'instanceid':dGet('wtw_tinstanceid').value,
				'domainurl':wtw_domainurl
			});

			wtw3dinternet.move.on('reconnect', function(zdata) {
				wtw3dinternet.move.emit('wtwconnect', {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
					'userip':dGet('wtw_tuserip').value,
					'instanceid':dGet('wtw_tinstanceid').value,
					'domainurl':wtw_domainurl
				});
				wtw3dinternet.inactive = false;
				wtw3dinternet.reconnectLoadZones();
			});

			wtw3dinternet.move.on('disconnect', function(zdata) {
				wtw3dinternet.move.emit('wtwconnect', {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
					'userip':dGet('wtw_tuserip').value,
					'instanceid':dGet('wtw_tinstanceid').value,
					'domainurl':wtw_domainurl
				});
				wtw3dinternet.inactive = false;
				wtw3dinternet.reconnectLoadZones();
			});

			wtw3dinternet.move.on('user left', function(zdata) {
				// Whenever the server emits 'user left', fade and remove the avatar
				if (zdata.instanceid != undefined) {
					wtw3dinternet.removeAvatar('person-' + zdata.instanceid);
				}
			});

			wtw3dinternet.move.on('entered zone', function(zdata) {
				if (wtw3dinternet.masterMove == '1' && wtw3dinternet.inactive == false) {
					if (dGet('wtw_serverinstanceid').value == zdata.serverinstanceid && communityid == zdata.communityid) { /* && buildingid == zdata.buildingid && thingid == zdata.thingid */
						wtw3dinternet.addParticipantsMessage(zdata);
						zavatar = WTW.getMeshOrNodeByID('person-' + zdata.instanceid);
						if (zavatar == null) {
							if (zdata.instanceid != dGet('wtw_tinstanceid').value) {
								let zavatarind = wtw3dinternet.getAvatarInd(zdata.instanceid);
								var zspawnpoint = WTW.getSpawnPoint();
								if (wtw3dinternet.avatars[zavatarind] == null) {
									wtw3dinternet.avatars[wtw3dinternet.avatars.length] = {
										'instanceid':zdata.instanceid,
										'placeholder':zdata.placeholder,
										'userid':zdata.userid,
										'globaluseravatarid':zdata.globaluseravatarid,
										'useravatarid':zdata.useravatarid, 
										'avatarid':zdata.avatarid,
										'position':{
											'x':zspawnpoint.position.x,
											'y':zspawnpoint.position.y,
											'z':zspawnpoint.position.z
										},
										'rotation':{
											'x':zspawnpoint.rotation.x,
											'y':zspawnpoint.rotation.y,
											'z':zspawnpoint.rotation.z
										},
										'loadcounter':0,
										'loaded':'0',
										'show':'1'
									};
								}
								/* check if avatar is already loaded */
								zdata.placeholder = 0;
								var zavatarscale = WTW.getMeshOrNodeByID('person-' + zdata.instanceid + '-scale');
								if (zavatarscale != null) {
									var zchildmeshes = zavatarscale.getChildren();
									if (zchildmeshes != null) {
										if (zchildmeshes.length > 0) {
											/* if zchildmeshes exist, avatar is loaded */
											zdata.placeholder = 1;
										}
									}
								}
								/* load avatar if not already loaded */
								if (zdata.placeholder == 0) {
									WTW.getSavedAvatar('person-' + zdata.instanceid, zdata.globaluseravatarid, zdata.useravatarid, zdata.avatarid, false);
								}
							}
						}
					}
				}
			});

			wtw3dinternet.move.on('exited zone', function(zdata) {
				if (wtw3dinternet.masterMove == '1') {
					if (zdata.instanceid != dGet('wtw_tinstanceid').value) {
						wtw3dinternet.removeAvatar('person-' + zdata.instanceid);
						
					}
				}
			});

			wtw3dinternet.move.on('check zones', function(zdata) {
				if (wtw3dinternet.masterMove == '1') {
					wtw3dinternet.checkLoadZones(zdata);
				}
			});

			wtw3dinternet.move.on('receive scene command', function(zdata) {
				if (wtw3dinternet.masterMove == '1' && wtw3dinternet.inactive == false) {
					wtw3dinternet.processSceneCommand(zdata);
				}
			});

			wtw3dinternet.move.on('show or hide avatar', function(zdata) {
				if (wtw3dinternet.masterMove == '1' && wtw3dinternet.inactive == false) {
					wtw3dinternet.checkAvatarParameter();
				}
			});

			wtw3dinternet.move.on('fade avatar', function(zdata) {
				wtw3dinternet.fadeAvatar(zdata);
			});

			wtw3dinternet.move.on('avatar movement', function(zmovedata) {
				/* process runs when another avatar in the scene moves */
				var zmeinzone = false;
				var zextremezonemoldname = '';
				for (var i = 0; i < WTW.actionZones.length; i++) {
					if (WTW.actionZones[i] != null) {
						if (WTW.actionZones[i].communityinfo.communityid == communityid && communityid != '' && WTW.actionZones[i].actionzonename.indexOf('Extreme') > -1 && WTW.actionZones[i].actionzonename.indexOf('Custom') == -1 && WTW.actionZones[i].actionzonetype == 'loadzone') {
							zextremezonemoldname = WTW.actionZones[i].moldname;
						}
					}
				}
				var zextremezone = WTW.getMeshOrNodeByID(zextremezonemoldname);
				if (zextremezone != null) {
					if (WTW.myAvatar != null) {
						zmeinzone = WTW.myAvatar.intersectsMesh(zextremezone, false);
					}					
				}
				if (zmeinzone && wtw3dinternet.masterMove == '1' && wtw3dinternet.inactive == false && zmovedata.instanceid != dGet('wtw_tinstanceid').value && ((zmovedata.primary == 'community' && communityid != '') || (zmovedata.primary == 'building' && buildingid != '') || (zmovedata.primary == 'community' && buildingid != '') || (zmovedata.primary == 'building' && zmovedata.buildingid != '' && zmovedata.communityid != ''))) {
					
					/* 	avatars in same community -> (zmovedata.primary == 'community' && communityid != '') || 
						avatars in same building -> (zmovedata.primary == 'building' && buildingid != '') || 
						avatars from building in community -> (zmovedata.primary == 'community' && buildingid != '') ||
						avatars from community in building -> (zmovedata.primary == 'building' && zmovedata.buildingid != '' && zmovedata.communityid != '')
					*/
					
					var zavatarname = 'person-' + zmovedata.instanceid;
					let zavatarind = wtw3dinternet.getAvatarInd(zmovedata.instanceid);
					var zspawnpoint = WTW.getSpawnPoint();
					if (wtw3dinternet.avatars[zavatarind] == null) {
						zavatarind = wtw3dinternet.avatars.length;
						wtw3dinternet.avatars[zavatarind] = {
							'instanceid':zmovedata.instanceid,
							'placeholder':zmovedata.placeholder,
							'userid':zmovedata.userid,
							'position':{
								'x':zspawnpoint.position.x,
								'y':zspawnpoint.position.y,
								'z':zspawnpoint.position.z
							},
							'rotation':{
								'x':zspawnpoint.rotation.x,
								'y':zspawnpoint.rotation.y,
								'z':zspawnpoint.rotation.z
							},
							'loadcounter':0,
							'loaded':'0',
							'show':'1'
						};
						if (WTW.isNumeric(zmovedata.placeholder)) {
							if (Number(zmovedata.placeholder) == 0) {
								WTW.getSavedAvatar('person-' + zmovedata.instanceid, zmovedata.globaluseravatarid, zmovedata.useravatarid, zmovedata.avatarid, false);
							}
						}
					}
					var zpositionx = zmovedata.position.x;
					var zpositiony = zmovedata.position.y;
					var zpositionz = zmovedata.position.z;
					var zscalingx = 1;
					var zscalingy = 1;
					var zscalingz = 1;
					var zrotationx = zmovedata.rotation.x;
					var zrotationy = zmovedata.rotation.y;
					var zrotationz = zmovedata.rotation.z;
					/* adjust for the offset of a building viewed without the community */
					if (zmovedata.buildingid == buildingid && buildingid != '' && zmovedata.primary == 'building' && zmovedata.communityid != '') {

						/* translate community avatar position to building centric position */
						var zadjrotationy = WTW.getRadians(zmovedata.offset.rotation.y);
						
						/* 	formulas for new position:
							posz = (cos*mz - cos*dz + sin*mx - sin*dx) / (cos^2 + sin^2);
							posx = (dz - mz + cos*posz) / sin; */

						zpositionz = (Math.cos(zadjrotationy) * zmovedata.position.z - Math.cos(zadjrotationy) * zmovedata.offset.position.z + Math.sin(zadjrotationy) * zmovedata.position.x - Math.sin(zadjrotationy) * zmovedata.offset.position.x) / (Math.cos(zadjrotationy) * Math.cos(zadjrotationy) + Math.sin(zadjrotationy) * Math.sin(zadjrotationy));

						zpositionx = (zmovedata.offset.position.z - zmovedata.position.z + Math.cos(zadjrotationy) * zpositionz) / Math.sin(zadjrotationy);
						
						/* y is not accounting for any rotation of the x or z axis at this time */
						zpositiony -= zmovedata.offset.position.y;
						
						/* adjust the avatar facing direction */
						zrotationy = WTW.getRadians(WTW.getDegrees(zmovedata.rotation.y) - zmovedata.offset.rotation.y);

					}
					
					var zavatar = WTW.getMeshOrNodeByID(zavatarname);
					if (zavatar != null) {
						if (zavatar.position.x != zpositionx || zavatar.position.y != zpositiony || zavatar.position.z != zpositionz) {
							zavatar.position.x = zpositionx;
							zavatar.position.y = zpositiony;
							zavatar.position.z = zpositionz;
							WTW.checkZones = true;
						}
						zavatar.rotation.x = zrotationx;
						zavatar.rotation.y = zrotationy;
						zavatar.rotation.z = zrotationz;
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
						wtw3dinternet.avatars[zavatarind].loadcounter = 0;
						if (WTW.isNumeric(zmovedata.placeholder)) {
							if (Number(zmovedata.placeholder) == 0) {
								WTW.getSavedAvatar('person-' + zmovedata.instanceid, zmovedata.globaluseravatarid, zmovedata.useravatarid, zmovedata.avatarid, false);
							}
						}
					} else {
						if (wtw3dinternet.avatars[zavatarind] != null) {
							wtw3dinternet.avatars[zavatarind].position.x = zpositionx;
							wtw3dinternet.avatars[zavatarind].position.y = zpositiony;
							wtw3dinternet.avatars[zavatarind].position.z = zpositionz;
							wtw3dinternet.avatars[zavatarind].rotation.x = zrotationx;
							wtw3dinternet.avatars[zavatarind].rotation.y = zrotationy;
							wtw3dinternet.avatars[zavatarind].rotation.z = zrotationz;
							wtw3dinternet.avatars[zavatarind].loadcounter += 1;
						}
					}
				}
			});

			wtw3dinternet.move.on('wtwadminresponse', function(zresponse) {
				WTW.log('response=' + zresponse);
			});

			wtw3dinternet.move.on('wtwbroadcast', function(zmessage) {
				zmessage = atob(zmessage);
				WTW.log(zmessage,'pink');
				dGet('wtw_wtwmessage').innerHTML = "<span class='wtw-wtwmessagetext' style='color:pink;'>" + zmessage + "</span>";
				window.setTimeout(function(){dGet('wtw_wtwmessage').innerHTML = '';},5000);
			}); 

			wtw3dinternet.move.on('serror', function(zresponse) {
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

			wtw3dinternet.move.on('reconnect_error', function(zdata) {
				if (wtw3dinternet.inactive == false) {
					/* WTW.log('Move-RECONNECT_ERROR=' + JSON.stringify(zdata), 'red'); */
				}
			});

			wtw3dinternet.updateAvatarHeartbeat();
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-initMoveSocket=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.updateAvatarHeartbeat = function() {
	/* avatar heartbeat for multiplayer */
	try {
		var zheartbeat = window.setInterval(function(){
			if (wtw3dinternet.inactive == false) {
				wtw3dinternet.move.emit('avatar heartbeat', {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
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
		},1000);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-updateAvatarHeartbeat=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.processSceneCommand = function(zdata) {
	/* process received multiplayer command */
	try {
		switch (zdata.text) {
			case 'leave scene':
				wtw3dinternet.removeAvatar('person-' + zdata.instanceid);
				break;
			case 'refresh avatar':
				if (wtw3dinternet.inactive == false) {
					let zavatarind = wtw3dinternet.getAvatarInd(zdata.instanceid);
					if (zavatarind > -1 && zdata.instanceid != dGet('wtw_tinstanceid').value) {
						if (WTW.isNumeric(zdata.placeholder)) {
							if (Number(zdata.placeholder) == 0) {
								WTW.getSavedAvatar('person-' + zdata.instanceid, zdata.globaluseravatarid, zdata.useravatarid, zdata.avatarid, false);
							}
						}
					}
				}
				break;
		}
		if (wtw3dinternet.masterMove == '1') {
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-processSceneCommand=' + ex.message);
	} 
}
			
WTW_3DINTERNET.prototype.moveAvatar = function(zavatar, zmoveevents) {
	/* send my avatar movement to multiplayer server */ 
	try {
		if (wtw3dinternet.masterMove == '1' && wtw3dinternet.inactive == false) {
			if (wtw3dinternet.move != null) {
				for (var i=0; i < wtw3dinternet.loadZones.length; i++) {
					if (wtw3dinternet.loadZones[i] != null) {
						var zprimary = 'community';
						if (buildingid != '') {
							zprimary = 'building';
						} else if (thingid != '') {
							zprimary = 'thing';
						}
						/* send multiplayer the position and animations */
						let zmovedata = {
							'serverinstanceid':dGet('wtw_serverinstanceid').value,
							'serverip':dGet('wtw_serverip').value,
							'communityid':communityid,
							'buildingid':wtw3dinternet.loadZones[i].buildingid,
							'thingid':wtw3dinternet.loadZones[i].thingid,
							'primary': zprimary,
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
							'offset':{
								'position':{
									'x':wtw3dinternet.loadZones[i].positionx,
									'y':wtw3dinternet.loadZones[i].positiony,
									'z':wtw3dinternet.loadZones[i].positionz
								},
								'scaling':{
									'x':wtw3dinternet.loadZones[i].scalingx,
									'y':wtw3dinternet.loadZones[i].scalingy,
									'z':wtw3dinternet.loadZones[i].scalingz
								},
								'rotation':{
									'x':wtw3dinternet.loadZones[i].rotationx,
									'y':wtw3dinternet.loadZones[i].rotationy,
									'z':wtw3dinternet.loadZones[i].rotationz
								},
							},
							'position':{
								'x':WTW.myAvatar.position.x,
								'y':WTW.myAvatar.position.y,
								'z':WTW.myAvatar.position.z
							},
							'scaling':{
								'x': 1,
								'y': 1,
								'z': 1
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
				}
			}
		} else if (wtw3dinternet.inactive == false) {
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
			wtw3dinternet.removeAllAvatars();
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-moveAvatar=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.getAvatarInd = function(zinstanceid) {
	/* get the index of the multiplayer avatar from the array of avatars in the 3D Scene */
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
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-getAvatarInd=' + ex.message);
	} 
	return zavatarind;
}

WTW_3DINTERNET.prototype.addParticipantsMessage = function(zdata) {
	/* updates the number of multiplayerrs in the 3D Scene */
	try {
		if (zdata.usercount > 0 && wtw3dinternet.masterMove == '1') {
			document.getElementById('participantsMessage').innerHTML = '&nbsp;' + zdata.usercount + ' Walkers';
		} else {
			document.getElementById('participantsMessage').innerHTML = '';
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-addParticipantsMessage=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.removeAvatar = function(zavatarname) {
	/* remove avatar from 3D Scene */
	try {
		for (var i=wtw3dinternet.avatars.length-1; i>-1; i--) {
			if (wtw3dinternet.avatars[i] != null) {
				if (wtw3dinternet.avatars[i].instanceid != undefined) {
					if (wtw3dinternet.avatars[i].instanceid == zavatarname.replace('person-','')) {
						wtw3dinternet.avatars.splice(i,1);
					}
				}
			}
		}
		var zfade = window.setInterval(function() {
			var zfaded = true;
			var zavatarparent = WTW.getMeshOrNodeByID(zavatarname + '-scale');
			if (zavatarparent != null) {
			var zavatarparts = zavatarparent.getChildren();
				if (zavatarparts != null) {
					if (zavatarparts.length > 0) {
						for (var i=0;i< zavatarparts.length;i++) {
							if (zavatarparts[i] != null) {
								if (zavatarparts[i].visibility > 0) {
									zfaded = false;
									zavatarparts[i].visibility -= .1;
								} else {
									zavatarparts[i].visibility = 0;
								}
							}
						}
					}
				}
			}
			if (zfaded) {
				window.clearInterval(zfade);
				var zavatar = WTW.getMeshOrNodeByID(zavatarname);
				if (zavatar != null) {
					WTW.disposeClean(zavatarname);
				}
			}
		},100);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-removeAvatar=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.showAvatar = async function(zavatarname, zsend) {
	/* show avatar in 3D Scene when in My Avatar Parameter */
	try {
		if (zsend == undefined) {
			zsend = false;
		}
		if (wtw3dinternet.inactive == false) {
			var zavatar = WTW.getMeshOrNodeByID(zavatarname);
			if (zavatar != null) {
				if (zavatar.WTW != undefined) {
					if (zsend) {
						wtw3dinternet.move.emit('show or hide avatar',{
							'serverinstanceid':dGet('wtw_serverinstanceid').value,
							'communityid':communityid,
							'buildingid':buildingid,
							'thingid':thingid,
							'instanceid':dGet('wtw_tinstanceid').value,
							'toinstanceid':zavatarname.replace('person-',''),
							'show':'1'
						});
					}
					if (zavatar.WTW.fadetimer == undefined) {
						zavatar.WTW.fadetimer = null;
					}
					if (zavatar.WTW.fadetimer != null) { 
						window.clearInterval(zavatar.WTW.fadetimer);
						zavatar.WTW.fadetimer = null;
					}
					zavatar.WTW.fadetimer = window.setInterval(function() {
						var zfadedin = true;
						var zmaxvisibility = 1;
						if ((WTW.isMobile || WTW.sizeX < WTW.sizeY) && zavatarname.indexOf('myavatar') > -1) {
							zmaxvisibility = .5;
						}
						
						var znamemold = WTW.getMeshOrNodeByID(zavatarname + '-nameplate-text');
						var zavatarparent = WTW.getMeshOrNodeByID(zavatarname + '-scale');
						/* check if avatar is blocked or banned and set max visibility accordingly */
						if (wtw3dinternet.isBanned(zavatarname.replace('person-',''))) {
							zmaxvisibility = 0;
						} else if (wtw3dinternet.isBlocked(zavatarname.replace('person-',''))) {
							zmaxvisibility = .5;
						}
						if (zavatarparent != null) {
							var zavatarparts = zavatarparent.getChildren();
							if (zavatarparts != null) {
								if (zavatarparts.length > 0) {
									for (var i=0;i< zavatarparts.length;i++) {
										if (zavatarparts[i] != null) {
											if (zavatarparts[i].visibility != undefined) {
												if (zavatarparts[i].visibility < zmaxvisibility) {
													zfadedin = false;
													zavatarparts[i].visibility += .05;
												} else {
													zavatarparts[i].visibility = zmaxvisibility;
												}
											}
										}
									}
								}
							}
						}
						if (znamemold != null) {
							if (znamemold.visibility < zmaxvisibility) {
								znamemold.visibility += .05;
							} else {
								znamemold.visibility = zmaxvisibility;
							}
						}
						if (zfadedin) {
							window.clearInterval(zavatar.WTW.fadetimer);
							if (zavatarparent != null) {
								var zavatarparts = zavatarparent.getChildren();
								if (zavatarparts != null) {
									if (zavatarparts.length > 0) {
										for (var i=0;i< zavatarparts.length;i++) {
											if (zavatarparts[i] != null) {
												if (zavatarparts[i].visibility != undefined) {
													zavatarparts[i].visibility = zmaxvisibility;
												}
											}
										}
									}
								}
							}
							if (znamemold != null) {
								znamemold.visibility = zmaxvisibility;
							}
						}
					},100);
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-showAvatar=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.hideAvatar = async function(zavatarname, zsend) {
	/* hide avatar in 3D Scene when not in My Avatar Parameter */
	try {
		if (zsend == undefined) {
			zsend = false;
		}
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			if (zavatar.WTW != undefined) {
				if (zsend) {
					wtw3dinternet.move.emit('show or hide avatar',{
						'serverinstanceid':dGet('wtw_serverinstanceid').value,
						'communityid':communityid,
						'buildingid':buildingid,
						'thingid':thingid,
						'instanceid':dGet('wtw_tinstanceid').value,
						'toinstanceid':zavatarname.replace('person-',''),
						'show':'0'
					});
				}
				if (zavatar.WTW.fadetimer == undefined) {
					zavatar.WTW.fadetimer = null;
				}
				if (zavatar.WTW.fadetimer != null) { 
					window.clearInterval(zavatar.WTW.fadetimer);
					zavatar.WTW.fadetimer = null;
				}
				zavatar.WTW.fadetimer = window.setInterval(function() {
					var zfaded = true;
					var znamemold = WTW.getMeshOrNodeByID(zavatarname + '-nameplate-text');
					var zavatarparent = WTW.getMeshOrNodeByID(zavatarname + '-scale');
					if (zavatarparent != null) {
						var zavatarparts = zavatarparent.getChildren();
						if (zavatarparts != null) {
							if (zavatarparts.length > 0) {
								for (var i=0;i< zavatarparts.length;i++) {
									if (zavatarparts[i] != null) {
										if (zavatarparts[i].visibility != undefined) {
											if (zavatarparts[i].visibility > 0) {
												zfaded = false;
												zavatarparts[i].visibility -= .05;
											} else {
												zavatarparts[i].visibility = 0;
											}
										}
									}
								}
							}
						}
					}
					if (znamemold != null) {
						if (znamemold.visibility > 0) {
							znamemold.visibility -= .05;
						} else {
							znamemold.visibility = 0;
						}
					}
					if (zfaded) {
						window.clearInterval(zavatar.WTW.fadetimer);
						//WTW.disposeAvatar(zavatarname);
						if (zavatarparent != null) {
							var zavatarparts = zavatarparent.getChildren();
							if (zavatarparts != null) {
								if (zavatarparts.length > 0) {
									for (var i=0;i< zavatarparts.length;i++) {
										if (zavatarparts[i] != null) {
											if (zavatarparts[i].visibility != undefined) {
												zavatarparts[i].visibility = 0;
											}
										}
									}
								}
							}
						}
						if (znamemold != null) {
							znamemold.visibility = 0;
						}
					}
				},100);
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-hideAvatar=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.removeAllAvatars = function() {
	/* clear all avatars form multiplayer 3D Scene */
	try {
		for (var i=0; i<wtw3dinternet.avatars.length;i++) {
			if (wtw3dinternet.avatars[i] != null) {
				if (wtw3dinternet.avatars[i].instanceid != undefined) {
					wtw3dinternet.removeAvatar('person-' + wtw3dinternet.avatars[i].instanceid);
				}
			}
		}
		wtw3dinternet.avatars = [];
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-removeAllAvatars=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.savedAvatarRetrieved = function(zavatarname, zsendrefresh) {
	/* set current position on avatar after it is loaded */
	try {
		if (zavatarname.indexOf('person-') > -1) {
			let zinstanceid = zavatarname.split('-')[1];
			let zavatarind = wtw3dinternet.getAvatarInd(zinstanceid);
			if (wtw3dinternet.avatars[zavatarind] != null) {
				wtw3dinternet.avatars[zavatarind].loaded = '1';
				let zavatar1 = WTW.getMeshOrNodeByID(zavatarname);
				if (zavatar1 != null) {
					zavatar1.position.x = wtw3dinternet.avatars[zavatarind].position.x;
					zavatar1.position.y = wtw3dinternet.avatars[zavatarind].position.y;
					zavatar1.position.z = wtw3dinternet.avatars[zavatarind].position.z;
					zavatar1.rotation.y = wtw3dinternet.avatars[zavatarind].rotation.y;
					zavatar1.parent = WTW.mainParentMold;
				}
			}
		}
		if (zsendrefresh && zavatarname.indexOf('myavatar-') > -1) {
			wtw3dinternet.initMultiuser(true);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-savedAvatarRetrieved=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.initMultiuser = async function(zsendrefresh) {
	/* initialize my avatar into multiplayer for others to see */
	try {
		var zavatarid = '';
		var zobjectfolder = '';
		var zobjectfile = '';
		var zhttpsecure = '0';
		var zscalingx = '1';
		var zscalingy = '1';
		var zscalingz = '1';
		var zprivacy = '0';
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
		if (wtw_protocol.toLowerCase().indexOf('https') > -1) { zhttpsecure = '1'; }
		var zenteranimation = WTW.getDDLValue('wtw_tselectavataranimation-enter');
		var zenteranimationparameter = '';
		var zexitanimation = '1';
		var zexitanimationparameter = '';
		if (WTW.isNumeric(zenteranimation) == false) {
			zenteranimation = '1';
		}
		var zurl = wtw_domainurl + '/connect/wtw-3dinternet-updateavatar.php?' +
			'&i=' + btoa(dGet('wtw_tinstanceid').value) + 
			'&g=' + btoa(dGet('wtw_tglobaluseravatarid').value) + 
			'&u=' + btoa(dGet('wtw_tuseravatarid').value) + 
			'&ad=' + btoa(zavatarid) + 
			'&d=' + btoa(dGet('wtw_tuserid').value) + 
			'&o=' + btoa(zobjectfolder) + 
			'&f=' + btoa(zobjectfile) + 
			'&m=' + btoa(wtw_domainname) + 
			'&s=' + btoa(zhttpsecure) + 
			'&x=' + btoa(zscalingx) + 
			'&y=' + btoa(zscalingy) + 
			'&z=' + btoa(zscalingz) + 
			'&n=' + btoa(dGet('wtw_menudisplayname').innerHTML) + 
			'&p=' + btoa(zprivacy) + 
			'&en=' + btoa(zenteranimation) + 
			'&enp=' + btoa(zenteranimationparameter) + 
			'&ex=' + btoa(zexitanimation) + 
			'&exp=' + btoa(zexitanimationparameter) + 
			'&w=' + btoa(WTW.walkSpeed) + 
			'&v=' + btoa(WTW.walkAnimationSpeed) + 
			'&t=' + btoa(WTW.turnSpeed) + 
			'&r=' + btoa(WTW.turnAnimationSpeed) + 
			'&a=' + btoa(dGet('wtw_tuserip').value) +
			'&si=' + btoa(dGet('wtw_serverinstanceid').value) +
			'&at=' + dGet('wtw_tusertoken').value +
			'&refresh=' + zsendrefresh;
		WTW.getAsyncJSON(zurl, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.refresh) {
					wtw3dinternet.sendCommand('', 'scene command', 'refresh avatar');
				}
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-initMultiuser=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.clearMultiuser = async function(zuseravatarid, zinstance, zuserid) {
	/* clear all multiplayer avatars and disconnect */
	try {
		for (var i = 0; i < scene.meshes.length; i++) {
			var zmoldname = scene.meshes[i].name;
			if (zmoldname.indexOf('person-') > -1) {
				WTW.addDisposeMoldToQueue(zmoldname);
			}
		}
		if (wtw3dinternet.move != null) {
			wtw3dinternet.move.emit('disconnect server', {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'serverip':dGet('wtw_serverip').value,
				'communityid':communityid,
				'buildingid':buildingid,
				'thingid':thingid,
				'domainurl':wtw_domainurl,
				'siteurl':wtw_websiteurl,
				'instanceid':dGet('wtw_tinstanceid').value,
				'userid':dGet('wtw_tuserid').value,
				'displayname':btoa(dGet('wtw_tdisplayname').value)
			});
			wtw3dinternet.removeAllAvatars();
			wtw3dinternet.sendCommand('', 'scene command', 'leave scene');
			var zurl = wtw_domainurl + '/connect/wtw-3dinternet-clearavatar.php?' + 
				'a=' + btoa(zuseravatarid) + 
				'&i=' + btoa(zinstance) + 
				'&d=' + btoa(zuserid) + 
				'&c=' + btoa(communityid) + 
				'&b=' + btoa(buildingid);
			WTW.getAsyncJSON(zurl, 
				function(zresponse) {
					//zresponse = JSON.parse(zresponse);
				}
			);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-clearMultiuser=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.toggleMultiPlayer = function() {
	/* toggle off or on multiplayer */
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
			WTW.setCookie('multiplayeron','1',30);
			WTW.setCookie('multiplayer',wtw3dinternet.multiPlayer,30);
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
			WTW.setCookie('multiplayeron','0',30);
			WTW.setCookie('multiplayer',wtw3dinternet.multiPlayer,30);
			wtw3dinternet.clearMultiuser(dGet('wtw_tuseravatarid').value, dGet('wtw_tinstanceid').value, dGet('wtw_tuserid').value);
			wtw3dinternet.removeAllAvatars();
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-toggleMultiPlayer=' +ex.message);
	}
}

WTW_3DINTERNET.prototype.toggleAvatarIDs = function() {
	/* toggle off or on multiplayer avatar display names */
	try {
		var zsetvisibility = false;
		if (dGet('wtw_submenuavataridstext').innerHTML == 'Avatar IDs are Off') {
			dGet('wtw_submenuavataridstext').innerHTML = 'Avatar IDs are On';
			dGet('wtw_submenuavatarids').src = '/content/system/images/menuavataridson.png';
			dGet('wtw_submenuavatarids').alt = 'Turn Avatar IDs Off';
			dGet('wtw_submenuavatarids').title = 'Turn Avatar IDs Off';
			wtw3dinternet.AvatarIDs = 1;
			WTW.setCookie('AvatarIDs',wtw3dinternet.AvatarIDs,30);
			zsetvisibility = true;
		} else {
			dGet('wtw_submenuavataridstext').innerHTML = 'Avatar IDs are Off';
			dGet('wtw_submenuavatarids').src = '/content/system/images/menuavataridsoff.png';
			dGet('wtw_submenuavatarids').alt = 'Turn Avatar IDs On';
			dGet('wtw_submenuavatarids').title = 'Turn Avatar IDs On';
			wtw3dinternet.AvatarIDs = 0;
			WTW.setCookie('AvatarIDs',wtw3dinternet.AvatarIDs,30);
		}
		var zmeshes = scene.meshes;
		if (zmeshes != null) {
			for (var i = 0;i < zmeshes.length;i++) {
				if (zmeshes[i] != null) {
					if (zmeshes[i].name.indexOf('person-') > -1 && zmeshes[i].name.indexOf('-nameplate') > -1) {
						zmeshes[i].isVisible = zsetvisibility;
					}
				}
			}
		}
    } catch (ex) {
        WTW.log('plugins:wtw-3dinternet:scripts-move.js-toggleAvatarIDs=' +ex.message);
    }
}

WTW_3DINTERNET.prototype.showAvatarIDs = function(zavatarname) {
	/* show multiplayer avatar display name */
	try {
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			var zdisplayname = 'Anonymous';
			var zinstanceid = '';
			if (zavatar.WTW != undefined) {
				if (zavatar.WTW.displayname != undefined) {
					zdisplayname = zavatar.WTW.displayname;
				}
				if (zavatar.WTW.instanceid != undefined) {
					zinstanceid = zavatar.WTW.instanceid;
				}
			}
			try {
				zdisplayname = atob(zdisplayname);
			} catch (ex) {}
			if (zdisplayname != '' && zavatarname.indexOf('person-') > -1) {
				WTW.disposeClean(zavatarname + '-nameplate');
				var zmolddef = WTW.newMold();
				var zalpha = 1;
				if (wtw3dinternet.isBanned(zinstanceid)) {
					zalpha = .01;
				} else if (wtw3dinternet.isBlocked(zinstanceid)) {
					zalpha = .5;
				}
				zmolddef.webtext.webtext = zdisplayname;
				zmolddef.webtext.webstyle = JSON.stringify({
					'anchor':'center',
					'letter-height':1.00,
					'letter-thickness':.10,
					'color':'#0000ff',
					'alpha':zalpha,
					'colors':{
						'diffuse':'#f0f0f0',
						'specular':'#000000',
						'ambient':'#808080',
						'emissive':'#0000ff'
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
		}
    } catch (ex) {
        WTW.log('plugins:wtw-3dinternet:scripts-move.js-showAvatarIDs=' +ex.message);
    }
}

WTW_3DINTERNET.prototype.activateMultiplayer = function() {
	/* start multiplayer services - has a 1 second delay before starting */
	try {
		if (wtw3dinternet.multiPlayerOn == 1) {
			if (WTW.isNumeric(wtw3dinternet.multiPlayer)) {
				if (Number(wtw3dinternet.multiPlayer) > 0) {
					window.setTimeout(function() {wtw3dinternet.initMultiuser(false);},1000);
				}
			}
		}
    } catch (ex) {
        WTW.log('plugins:wtw-3dinternet:scripts-move.js-activateMultiplayer=' +ex.message);
    }
}

WTW_3DINTERNET.prototype.multiPersonInActionZone = function(zactionzone) {
	/* is there a multiplayer avatar in an action zone (like opening a door) */
	var zintersects = false;
	try {
		for (var i=0; i < wtw3dinternet.avatars.length; i++) {
			if (wtw3dinternet.avatars[i] != null) {
				var zavatarname = 'person-' + wtw3dinternet.avatars[i].instanceid;
				var zavatar = WTW.getMeshOrNodeByID(zavatarname);
				if (zavatar != null) {
					zintersects = zavatar.intersectsMesh(zactionzone, false); // precise false
				}
				if (zintersects) {
					i = wtw3dinternet.avatars.length;
				}
			}
		}
	} catch(ex){
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-multiPersonInActionZone=' + ex.message);
	}
	return zintersects;
}

WTW_3DINTERNET.prototype.sendCommand = function(ztoinstanceid, zaction, ztext) {
	/* send multiplayer command to another avatar in the 3D Scene */
	try {
		if (wtw3dinternet.masterMove == '1' && wtw3dinternet.move != null && wtw3dinternet.inactive == false) {
			wtw3dinternet.move.emit(zaction, {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'serverip':dGet('wtw_serverip').value,
				'communityid':communityid,
				'buildingid':buildingid,
				'thingid':thingid,
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
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-sendCommand=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.checkLoadZones = function(zdata) {
	/* Re-enter all current load zones your avatar is in, processed after a reconnect, or check any time */
	try {
		for (var i = 0; i < WTW.actionZones.length; i++) {
			if (WTW.actionZones[i] != null) {
				var zmoldname = WTW.actionZones[i].moldname;
				var zactionzone = WTW.getMeshOrNodeByID(zmoldname);
				if (zmoldname != undefined) {
					if (WTW.actionZones[i].actionzonename.toLowerCase().indexOf('extreme') > -1 && WTW.actionZones[i].actionzonename.toLowerCase().indexOf('custom') == -1) {
						if (zactionzone != null) {
							var zmeinzone = false;
							if (WTW.myAvatar != null) {
								zmeinzone = WTW.myAvatar.intersectsMesh(zactionzone, false);
							}
							if (zmeinzone) {
								wtw3dinternet.enterLoadZone(zmoldname, WTW.actionZones[i]);
							}
						}
					}
				}
			}
		}			
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-checkLoadZones=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.enterLoadZone = function(zmoldname, zmolddef) {
	/* when you enter a load zone, join the multiplayer for that 3D Website (3D Community, 3D Building, or 3D Thing)*/
	try {
		if (wtw3dinternet.masterMove == '1' && wtw3dinternet.inactive == false) {
			/* add box around avatar to watch for avatars in range */
			wtw3dinternet.addAvatarParameter();
			/* process action zone */
			if (zmolddef.status == 0) {
				/* status makes sure it only fires once per actionzone entry */
				if (zmolddef.actionzonename.toLowerCase().indexOf('extreme') > -1 && zmolddef.actionzonename.toLowerCase().indexOf('custom') == -1) {
					/* status changes to 2 after this process - avoids executing multiple times */
					var zstartmove = window.setInterval(function(){
						if (wtw3dinternet.move != null) {
							var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
							var zactionzoneid = zmoldnameparts.actionzoneid;
							var zactionzone = WTW.getMeshOrNodeByID(zmoldname);
							if (zactionzone != null) {
								var zmeinzone = WTW.myAvatar.intersectsMesh(zactionzone, false);
								if (zmeinzone) {
									/* the next values are the Connecting Grid not the Action Zone */
									var zpositionx = 0;
									var zpositiony = 0;
									var zpositionz = 0;
									var zscalingx = 1;
									var zscalingy = 1;
									var zscalingz = 1;
									var zrotationx = 0;
									var zrotationy = 0;
									var zrotationz = 0;
									if (zmolddef.buildinginfo.buildingid != '' && zactionzone.parent != null) {
										zpositionx = zactionzone.parent.position.x;
										zpositiony = zactionzone.parent.position.y;
										zpositionz = zactionzone.parent.position.z;
										zscalingx = zactionzone.parent.scaling.x;
										zscalingy = zactionzone.parent.scaling.y;
										zscalingz = zactionzone.parent.scaling.z;
										zrotationx = WTW.getDegrees(zactionzone.parent.rotation.x);
										zrotationy = WTW.getDegrees(zactionzone.parent.rotation.y);
										zrotationz = WTW.getDegrees(zactionzone.parent.rotation.z);
									} else if (zmolddef.thinginfo.thingid != '' && zactionzone.parent != null) {
										zpositionx = zactionzone.parent.position.x;
										zpositiony = zactionzone.parent.position.y;
										zpositionz = zactionzone.parent.position.z;
										zscalingx = zactionzone.parent.scaling.x;
										zscalingy = zactionzone.parent.scaling.y;
										zscalingz = zactionzone.parent.scaling.z;
										zrotationx = WTW.getDegrees(zactionzone.parent.rotation.x);
										zrotationy = WTW.getDegrees(zactionzone.parent.rotation.y);
										zrotationz = WTW.getDegrees(zactionzone.parent.rotation.z);
									}
									/* communityid is read from scene while building and thing are read from action zone */
if (communityid != '' && zmolddef.buildinginfo.buildingid == '' && zmolddef.thinginfo.thingid == '') {
/* Temporary condition - only processing community level at this time */
									wtw3dinternet.move.emit('enter zone', {
										'serverinstanceid':dGet('wtw_serverinstanceid').value,
										'serverip':dGet('wtw_serverip').value,
										'actionzoneid':zactionzoneid,
										'communityid':communityid,
										'buildingid':zmolddef.buildinginfo.buildingid,
										'thingid':zmolddef.thinginfo.thingid,
										'positionx':zpositionx,
										'positiony':zpositiony,
										'positionz':zpositionz,
										'scalingx':zscalingx,
										'scalingy':zscalingy,
										'scalingz':zscalingz,
										'rotationx':zrotationx,
										'rotationy':zrotationy,
										'rotationz':zrotationz,
										'instanceid':dGet('wtw_tinstanceid').value,
										'avatarid':dGet('wtw_tavatarid').value,
										'globaluseravatarid':dGet('wtw_tglobaluseravatarid').value,
										'useravatarid':dGet('wtw_tuseravatarid').value,
										'userid':dGet('wtw_tuserid').value,
										'placeholder':WTW.placeHolder,
										'displayname':btoa(dGet('wtw_tdisplayname').value)
									});
									/* enter Chat Zone */
									wtw3dinternet.enterChatLoadZone(zmoldname, zmolddef);
									/* enter Voice Chat Zone */
									wtw3dinternet.enterVoiceChatLoadZone(zmoldname, zmolddef);
									/* add load zone to array of connecting grid offsets */
									wtw3dinternet.addLoadZone(zmolddef.actionzoneid, communityid, zmolddef.buildinginfo.buildingid, zmolddef.thinginfo.thingid, zpositionx, zpositiony, zpositionz, zscalingx, zscalingy, zscalingz, zrotationx, zrotationy, zrotationz);
}
								}
							}
							window.clearInterval(zstartmove);
							zstartmove = null;
						}
					},500);
					var zstartadmin = window.setInterval(function(){
						if (wtw3dinternet.admin != null) {
							wtw3dinternet.admin.emit('zone totals', '');
							window.clearInterval(zstartadmin);
							zstartadmin = null;
						}
					},500);
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-enterLoadZone=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.exitLoadZone = function(zmoldname, zmolddef) {
	/* leave multiplayer for a load zone when exiting the zone */ 
	try {
		if (wtw3dinternet.masterMove == '1') {
			if (zmolddef.actionzonename.toLowerCase().indexOf('extreme') > -1 && zmolddef.actionzonename.toLowerCase().indexOf('custom') == -1) {
				var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
				var zactionzoneid = zmoldnameparts.actionzoneid;
				var zactionzone = WTW.getMeshOrNodeByID(zmoldname);
				/* check mold to avoid multiple execution of code */
				if (wtw3dinternet.move != null && zactionzone != null) {
if (communityid != '' && zmolddef.buildinginfo.buildingid == '' && zmolddef.thinginfo.thingid == '') {
/* Temporary condition - only processing community level at this time */
					wtw3dinternet.move.emit('exit zone', {
						'serverinstanceid':dGet('wtw_serverinstanceid').value,
						'actionzoneid':zactionzoneid,
						'serverip':dGet('wtw_serverip').value,
						'communityid':zmolddef.communityinfo.communityid,
						'buildingid':zmolddef.buildinginfo.buildingid,
						'thingid':zmolddef.thinginfo.thingid,
						'instanceid':dGet('wtw_tinstanceid').value,
						'avatarid':dGet('wtw_tavatarid').value,
						'userid':dGet('wtw_tuserid').value,
						'displayname':btoa(dGet('wtw_tdisplayname').value)
					});
					/* exit Chat Zone */
					wtw3dinternet.exitChatLoadZone(zmoldname, zmolddef);
					/* exit Voice Chat Zone */
					wtw3dinternet.exitVoiceChatLoadZone(zmoldname, zmolddef);
					/* remove the load zone from the array of connecting grid offsets */
					wtw3dinternet.removeLoadZone(zmolddef.actionzoneid, zmolddef.communityinfo.communityid, zmolddef.buildinginfo.buildingid, zmolddef.thinginfo.thingid);
					/* clear other avatars from community */
					wtw3dinternet.removeAllAvatars();
}
				}
				var zstartadmin = window.setInterval(function(){
					if (wtw3dinternet.admin != null) {
						wtw3dinternet.admin.emit('zone totals', '');
						window.clearInterval(zstartadmin);
						zstartadmin = null;
					}
				},500);
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-exitLoadZone=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.addLoadZone = function(zactionzoneid, zcommunityid, zbuildingid, zthingid, zpositionx, zpositiony, zpositionz, zscalingx, zscalingy, zscalingz, zrotationx, zrotationy, zrotationz) {
	/* add load zone data for offset - used for 3D Buildings within multiple 3D Communities to track the position and rotation offset per 3D Community */
	try {
		/* add load zone to array of connecting grid offsets */
		/* position, scaling, and rotation values are the Connecting Grid not the Action Zone */
		var zfound = false;
		for (var i=0; i < wtw3dinternet.loadZones.length; i++) {
			if (wtw3dinternet.loadZones[i] != null) {
				if (wtw3dinternet.loadZones[i].actionzoneid == zactionzoneid && wtw3dinternet.loadZones[i].communityid == zcommunityid && wtw3dinternet.loadZones[i].buildingid == zbuildingid && wtw3dinternet.loadZones[i].thingid == zthingid) {
					zfound = true;
				}
			}
		}
		if (!zfound) {
			wtw3dinternet.loadZones[wtw3dinternet.loadZones.length] = {
				'actionzoneid': zactionzoneid,
				'communityid': zcommunityid,
				'buildingid': zbuildingid,
				'thingid': zthingid,
				'positionx': zpositionx,
				'positiony': zpositiony,
				'positionz': zpositionz,
				'scalingx': zscalingx,
				'scalingy': zscalingy,
				'scalingz': zscalingz,
				'rotationx': zrotationx,
				'rotationy': zrotationy,
				'rotationz': zrotationz
			};
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-addLoadZone=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.removeLoadZone = function(zactionzoneid, zcommunityid, zbuildingid, zthingid) {
	/* remove the load zone from the array of connecting grid offsets */
	try {
		for (var i = wtw3dinternet.loadZones.length-1; i > -1; i--) {
			if (wtw3dinternet.loadZones[i] != null) {
				if (wtw3dinternet.loadZones[i].actionzoneid == zactionzoneid && wtw3dinternet.loadZones[i].communityid == zcommunityid && wtw3dinternet.loadZones[i].buildingid == zbuildingid && wtw3dinternet.loadZones[i].thingid == zthingid) {
					wtw3dinternet.loadZones.splice(i,1);
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-removeLoadZone=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.reconnectLoadZones = function() {
	/* check to see if your avatar is in a load zone and reconnect for multiplayer */
	try {
		if (wtw3dinternet.inactive == false) {
			for (var i = 0; i < WTW.actionZones.length; i++) {
				if (WTW.actionZones[i] != null) {
					var zmoldname = WTW.actionZones[i].moldname;
					var zactionzone = WTW.getMeshOrNodeByID(zmoldname);
					if (zmoldname != undefined) {
						if (zactionzone != null) {
							var zmeinzone = false;
							if (WTW.myAvatar != null) {
								zmeinzone = WTW.myAvatar.intersectsMesh(zactionzone, false);
							}
							/* Available in Admin Mode Only, sets all load zones as if the avatar is in them so that it loads all sections of the map - great for getting snapshots and images */
							if (WTW.loadAllActionZones == 1 && WTW.adminView == 1 && zmoldname.indexOf('loadzone') > -1) {
								zmeinzone = true;
							}
							if (zmeinzone) {
								if (zmeinzone && zmoldname.indexOf('loadzone') > -1 && WTW.actionZones[i].status == 2) {
									/* trigger plugins when avatar enters zone */
									WTW.pluginsEnterActionZone(zmoldname, WTW.actionZones[i]);
								}
							} else {
								if (zmoldname.indexOf('loadzone') > -1 || WTW.actionZones[i].status == 0) {
									/* trigger plugins when avatar exits zone */
									WTW.pluginsExitActionZone(zmoldname, WTW.actionZones[i]);
									/* status 0 means not in zone */
								}
							}
						}
					}
				}
			}
		}
	} catch(ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-reconnectLoadZones=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.addAvatarParameter = function() {
	/* add box around avatar to watch for avatars in range */
	try {
		var zavatarname = 'myavatar-' + dGet('wtw_tinstanceid').value;
		var zavatarparametername = zavatarname + '-parameter';
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		var zavatarparameter = WTW.getMeshOrNodeByID(zavatarparametername);
		if (zavatar != null && zavatarparameter == null) {
			zavatarparameter = BABYLON.MeshBuilder.CreateBox(zavatarparametername, {}, scene);
			zavatarparameter.material = new BABYLON.StandardMaterial(zavatarparametername + '-mat', scene);
			zavatarparameter.material.alpha = 0;
			//zavatarparameter.showBoundingBox = false;
			zavatarparameter.checkCollisions = false;
			zavatarparameter.isPickable = false;
			zavatarparameter.scaling = new BABYLON.Vector3(wtw3dinternet.avatarParameterSize,wtw3dinternet.avatarParameterSize,wtw3dinternet.avatarParameterSize);
			zavatarparameter.parent = zavatar;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-addAvatarParameter=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.checkAvatarParameter = async function() {
	/* load or unload avatars based on my avatar parameter */
	try {
		var zavatarparametername = 'myavatar-' + dGet('wtw_tinstanceid').value + '-parameter';
		var zavatarparameter = WTW.getMeshOrNodeByID(zavatarparametername);
		if (zavatarparameter != null) {
			for (var i=0;i<wtw3dinternet.avatars.length;i++) {
				if (wtw3dinternet.avatars[i] != null) {
					if (wtw3dinternet.avatars[i].loaded == '1') {
						var zavatarname = 'person-' + wtw3dinternet.avatars[i].instanceid;
						var zavatar = WTW.getMeshOrNodeByID(zavatarname);
						if (zavatar != null) {
							var zothersinzone = zavatar.intersectsMesh(zavatarparameter, false);
							if (wtw3dinternet.avatars[i].show == '1' && (zothersinzone == false || wtw3dinternet.inactive)) {
								/* hide the avatar */
								wtw3dinternet.avatars[i].show = '0';
								wtw3dinternet.hideAvatar(zavatarname, true);
							} else if (wtw3dinternet.avatars[i].show == '0' && zothersinzone) {
								/* show the avatar */
								wtw3dinternet.avatars[i].show = '1';
								wtw3dinternet.showAvatar(zavatarname, true);
							}
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-move.js-checkAvatarParameter=' + ex.message);
	}
}




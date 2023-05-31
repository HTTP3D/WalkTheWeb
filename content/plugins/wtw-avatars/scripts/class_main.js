/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

function WTW_AVATARS() {
	/* Add your global variables as needed here */
	this.ver = '1.0.0';
}

/* Create the class instance */
let wtwavatars = new WTW_AVATARS();

/* Add functions as needed to your class */
/* for simplicity, try to name the functions the same as the original WTW function name it is hooked into */
/* this is an example of an inputClick function */
/* activate it with the core WTW.inputClick function hook */
/* in the plugin/functions/class_plugin.php initHooks and initAdminOnlyHooks functions. */

WTW_AVATARS.prototype.inputClick = function(zpickedname) {
	try {
		zpickedname = zpickedname.toLowerCase();
		let zmoldnameparts = WTW.getMoldnameParts(zpickedname);
		/* using zmoldnameparts, you can get the following values:
          zmoldnameparts.moldname is the moldname (zpickedname)
          zmoldnameparts.moldind is the index number for the mold array
          zmoldnameparts.moldid is the unique ID of the mold (database table key value reference)
          zmoldnameparts.cgind is the connecting grid index number (WTW.connectingGrids[zmoldnameparts.cgind] gives you the 3D Object definition)
          zmoldnameparts.cgid is the unique ID of the Connecting Grid (database table key value reference)
          zmoldnameparts.communityid is the unique ID for the 3D Community related to this 3D Object (only has a value when is a WTW.communityMolds).
          zmoldnameparts.buildingid is the unique ID for the 3D Building related to this 3D Object (only has a value when is a WTW.buildingMolds).
          zmoldnameparts.thingid is the unique ID for the 3D Thing related to this 3D Object (only has a value when is a WTW.thingMolds).
          zmoldnameparts.webtype identifies what kind of 3D object it is; building, community, or thing.
          zmoldnameparts.molds is the Array for the Mold; WTW.communityMolds, WTW.buildingMolds, or WTW.thingMolds.
          zmoldnameparts.shape is the Mold shape which identifies the function used to create the Mold (mesh).
          zmoldnameparts.namepart is an array of the segments of the name split by the hyphen '-'. This is useful for checking the additional optional values and current state.
          zmoldnameparts.parentname is the full name of the parent 3D Object.

		  zmoldnameparts.molds[zmoldnameparts.moldind] provides the whole 3D Object definition
		  see /core/scripts/prime/wtw_objectdefinitions.js for full object references
		  

		*/		
		/* use indexOf function or the zmoldnameparts to set conditional code for the selected 3D Object */
		/* in this example, the zpickedname has a name part 'wtwpaintballgun1a' */
		/* when the 3D Object is clicked, the Avatar picks up the 3D Object in the righthand */
		/* using the offset Position, Scaling, and Rotation set below */
		/* note the offset is from an avatar in the T-Pose with palm of the hand facing down */
		/* 		x = arm to finger tips axis direction */
		/* 		y = palm to back of hand axis direction */
		/* 		z = first finger to forth finger axis direction */
		if (zpickedname.indexOf('wtwpaintballgun1a') > -1) {
			let zoffset = {
				'position': {
					'x':-.77,
					'y':-0.33,
					'z':.2
				},
				'scaling': {
					'x':1,
					'y':1,
					'z':1
				},
				'rotation': {
					'x':89,
					'y':50,
					'z':78
				}
			};
			/* the current user avatar is named 'myavatar-' + dGet('wtw_tinstanceid').value */
			/* pick up object function (avatarname, objectname, attachpoint, offset) */
			/* attachpoints can be found /core/scripts/avatars/basicavatars.js */
			WTW.pickUpObject('myavatar-' + dGet('wtw_tinstanceid').value, zpickedname, 'righthand', zoffset);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-avatars:scripts-class_main.js-inputClick=' + ex.message);
	} 
	return zpickedname;
}

WTW_AVATARS.prototype.checkActionZone = function(zactionzonename, zactionzoneind, zmeinzone, zothersinzone) {
	try {
		/* this function runs while your avatar (or another avatar in multiplayer) changes position */
		/* use zmeinzone and zothersinzone to trigger a function based on your zone type */
		/* this example checks if my avatar is in a load animations zone */
		/* if so, it calls the funtion to add the zone required animations to my avatar */
		if (zmeinzone) {
			if (zactionzonename.indexOf('loadanimations') > -1) {
				WTW.checkLoadAnimations(zactionzoneind);
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-avatars:scripts-class_main.js-checkActionZone=' + ex.message);
	} 
}

WTW_AVATARS.prototype.setAvatarMovement = function(zavatar, zevent, zweight) {
	try {
		/* this function sets the positon (movement) of an avatar while a specific animation plays */
		/* zevent is the name of the animation */
		/* group animations can be set using the global variable: */
		/* WTW.animationSet = 'riffle'; */
		/* so that onwait becomes onwait-riffle animation if it exists */
		switch (zevent) {
			case 'onwait-riffle':
				var zstride = WTW.init.gravity * 15 * zavatar.WTW.animations.running[zevent].weight * WTW.walkSpeed / WTW.fps;
				var zmove = WTW.getMoveDownVector(zavatar.name, -zstride);
				zavatar.moveWithCollisions(zmove);
				break;
			case 'onwalk-riffle':
				var zstride = 15 * zavatar.WTW.animations.running[zevent].weight * WTW.walkSpeed / WTW.fps;
				zavatar.WTW.animations.running[zevent].speedRatio = WTW.walkAnimationSpeed;
				var zmove = WTW.getMoveVector(zavatar.name, 0, zstride);
				zavatar.moveWithCollisions(zmove);
				break;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-avatars:scripts-class_main.js-setAvatarMovement=' + ex.message);
	} 
	return zweight;
}

WTW_AVATARS.prototype.checkHovers = function(zmoldname, zshape) {
	try {
		/* this function activates on hover over a 3D Object */
		/* useful if you want to change material, highlighting, or prompt a response */
		zmoldname = zmoldname.toLowerCase();
		if (zmoldname.indexOf('golfball') > -1) {
			
		}
	} catch (ex) {
		WTW.log('plugins:wtw-avatars:scripts-class_main.js-checkHovers=' + ex.message);
	} 
}

WTW_AVATARS.prototype.resetHovers = function(zmoldname, zshape) {
	try {
		/* this function activates on lost focus (end hover) from a 3D Object */
		/* useful if you want to change material back, unhighlighting, or close a prompt */
		zmoldname = zmoldname.toLowerCase();
		if (zmoldname.indexOf('golfball') > -1) {
			
		}
	} catch (ex) {
		WTW.log('plugins:wtw-avatars:scripts-class_main.js-resetHovers=' + ex.message);
	} 
}


/* avatar groups */

WTW_AVATARS.prototype.openAvatarGroupForm = function(zavatargroupid, zavatargroup) {
	/* this function opens the Avatar Groups Form */
	try {
		if (zavatargroupid == undefined) {
			zavatargroupid = '';
		}
		if (zavatargroup == undefined) {
			zavatargroup = '';
		}
		dGet('wtw_avatargrouperror').innerHTML = '';
		if (zavatargroup == '') {
			/* add new avatar group */
			WTW.hide('wtw_bavatargroupdelete');
			dGet('wtw_addavatargrouptitle').innerHTML = 'Add Avatar Group';
			dGet('wtw_tavatargroup').value = '';
			dGet('wtw_tavatargroupid').value = WTW.getRandomString(16,1);
		} else {
			WTW.show('wtw_bavatargroupdelete');
			dGet('wtw_addavatargrouptitle').innerHTML = 'Edit Avatar Group';
			dGet('wtw_tavatargroup').value = zavatargroup;
			dGet('wtw_tavatargroupid').value = zavatargroupid;
		}
		WTW.hide('wtw_addavatargroup');
		WTW.show('wtw_addavatargroupdiv');
		dGet('wtw_tavatargroup').focus();
	} catch (ex) {
		WTW.log('plugins:wtw-avatars:scripts-class_main.js-openAvatarGroupForm=' + ex.message);
	} 
}

WTW_AVATARS.prototype.saveAvatarGroupForm = function(w) {
	/* this function saves the Avatar Groups Form */
	try {
		dGet('wtw_avatargrouperror').innerHTML = '';
		switch (w) {
			case 1:
				/* add avatar group */
				var zrequest = {
					'avatargroupid':dGet('wtw_tavatargroupid').value,
					'avatargroup':dGet('wtw_tavatargroup').value,
					'function':'saveavatargroup'
				};
				WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						if (zresponse.serror == '') {
							WTW.hide('wtw_addavatargroupdiv');
							WTW.show('wtw_addavatargroup');
							wtwavatars.loadAvatarGroups();
						} else {
							dGet('wtw_avatargrouperror').innerHTML = zresponse.serror;
							dGet('wtw_avatargrouperror').style.color = 'red';
						}
					}
				);
				break;
			case 0:
				/* delete avatar group */
				var zrequest = {
					'avatargroupid':dGet('wtw_tavatargroupid').value,
					'function':'deleteavatargroup'
				};
				WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						WTW.hide('wtw_addavatargroupdiv');
						WTW.show('wtw_addavatargroup');
						wtwavatars.loadAvatarGroups();
					}
				);
				break;
			case -1:
				/* cancel */
				WTW.hide('wtw_addavatargroupdiv');
				WTW.show('wtw_addavatargroup');
				break;
		}
		
	} catch (ex) {
		WTW.log('plugins:wtw-avatars:scripts-class_main.js-saveAvatarGroupForm=' + ex.message);
	} 
}

WTW_AVATARS.prototype.loadAvatarGroups = function() {
	/* this function loads the Avatar Groups Form */
	try {
		var zrequest = {
			'function':'getavatargroups'
		};
		WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				var zhostid = '';
				var zhostuserid = '';
				if (WTW.isUserInRole('host') && WTW.isUserInRole('admin') == false) {
					zhostuserid = dGet('wtw_tuserid').value;
				}
				if (zresponse.avatargroups != null) {
					dGet('wtw_avatargroupslist').innerHTML = '';
					for (var i=0;i < zresponse.avatargroups.length;i++) {
						if (zresponse.avatargroups[i] != null) {
							if (zhostid != zresponse.avatargroups[i].hostuserid) {
								if (zhostid == '') {
									dGet('wtw_avatargroupslist').innerHTML += "<div class='wtw-biglistcenter' style='color:blue;'>Custom Avatar Groups</div><div class='wtw-clear'></div><hr />";
								} else {
									dGet('wtw_avatargroupslist').innerHTML += "<div class='wtw-biglistcenter' style='color:blue;'>Global Avatar Groups</div><div class='wtw-clear'></div><hr />";
								}
								zhostid = zresponse.avatargroups[i].hostuserid;
							}
							if (zhostuserid == '' || zhostuserid == zresponse.avatargroups[i].hostuserid) {
								dGet('wtw_avatargroupslist').innerHTML += "<div class='wtw-biglistleft'>" + zresponse.avatargroups[i].avatargroup + "</div><div class='wtw-bluebuttonright' onclick=\"wtwavatars.openAvatarGroupForm('" + zresponse.avatargroups[i].avatargroupid + "','" + zresponse.avatargroups[i].avatargroup + "');\">Edit</div><div class='wtw-clear'></div><hr />";
							} else {
								dGet('wtw_avatargroupslist').innerHTML += "<div class='wtw-biglistleft'>" + zresponse.avatargroups[i].avatargroup + "</div><div class='wtw-clear'></div><hr />";
							}
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-avatars:scripts-class_main.js-loadAvatarGroups=' + ex.message);
	} 
}


/* avatar animation events */

WTW_AVATARS.prototype.openAvatarAnimationEventForm = function(zanimationeventid, zanimationevent, zloadpriority) {
	/* this function opens the Avatar Animation Events Form */
	try {
		if (zanimationeventid == undefined) {
			zanimationeventid = '';
		}
		if (zanimationevent == undefined) {
			zanimationevent = '';
		}
		if (zloadpriority == undefined) {
			zloadpriority = '0';
		}
		dGet('wtw_avataranimationeventerror').innerHTML = '';
		if (zanimationevent == '') {
			/* add new avatar animation event */
			WTW.hide('wtw_bavataranimationeventdelete');
			dGet('wtw_addavataranimationeventtitle').innerHTML = 'Add Avatar Animation Event';
			dGet('wtw_tavataranimationeventtext').value = '';
			dGet('wtw_tavatarloadpriority').value = '0';
			dGet('wtw_tavataranimationeventid').value = WTW.getRandomString(16,1);
		} else {
			WTW.show('wtw_bavataranimationeventdelete');
			dGet('wtw_addavataranimationeventtitle').innerHTML = 'Edit Avatar Animation Event';
			dGet('wtw_tavataranimationeventtext').value = zanimationevent;
			dGet('wtw_tavatarloadpriority').value = zloadpriority;
			dGet('wtw_tavataranimationeventid').value = zanimationeventid;
		}
		WTW.hide('wtw_addavataranimationevent');
		WTW.show('wtw_addavataranimationeventdiv');
		dGet('wtw_tavataranimationeventtext').focus();
	} catch (ex) {
		WTW.log('plugins:wtw-avatars:scripts-class_main.js-openAvatarAnimationEventForm=' + ex.message);
	} 
}

WTW_AVATARS.prototype.saveAvatarAnimationEventForm = function(w) {
	/* this function saves the Avatar Animation Event Form */
	try {
		dGet('wtw_avataranimationeventerror').innerHTML = '';
		switch (w) {
			case 1:
				/* add avatar animation event */
				var zrequest = {
					'animationeventid':dGet('wtw_tavataranimationeventid').value,
					'animationevent':dGet('wtw_tavataranimationeventtext').value,
					'loadpriority':dGet('wtw_tavatarloadpriority').value,
					'function':'saveavataranimationevent'
				};
				WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						if (zresponse.serror == '') {
							WTW.hide('wtw_addavataranimationeventdiv');
							WTW.show('wtw_addavataranimationevent');
							wtwavatars.loadAvatarAnimationEvents();
						} else {
							dGet('wtw_avataranimationeventerror').innerHTML = zresponse.serror;
							dGet('wtw_avataranimationeventerror').style.color = 'red';
						}
					}
				);
				break;
			case 0:
				/* delete avatar animation event */
				var zrequest = {
					'animationeventid':dGet('wtw_tavataranimationeventid').value,
					'function':'deleteavataranimationevent'
				};
				WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						WTW.hide('wtw_addavataranimationeventdiv');
						WTW.show('wtw_addavataranimationevent');
						wtwavatars.loadAvatarAnimationEvents();
					}
				);
				break;
			case -1:
				/* cancel */
				WTW.hide('wtw_addavataranimationeventdiv');
				WTW.show('wtw_addavataranimationevent');
				break;
		}
		
	} catch (ex) {
		WTW.log('plugins:wtw-avatars:scripts-class_main.js-saveAvatarAnimationEventForm=' + ex.message);
	} 
}

WTW_AVATARS.prototype.loadAvatarAnimationEvents = function() {
	/* this function loads the Avatar Animation Event Form */
	try {
		var zrequest = {
			'function':'getavataranimationevents'
		};
		WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				if (zresponse.animationevents != null) {
					dGet('wtw_avataranimationeventslist').innerHTML = '';
					for (var i=0;i < zresponse.animationevents.length;i++) {
						if (zresponse.animationevents[i] != null) {
							dGet('wtw_avataranimationeventslist').innerHTML += "<div class='wtw-biglistleft'>" + zresponse.animationevents[i].animationevent + "</div><div class='wtw-bluebuttonright' onclick=\"wtwavatars.openAvatarAnimationEventForm('" + zresponse.animationevents[i].animationeventid + "','" + zresponse.animationevents[i].animationevent + "','" + zresponse.animationevents[i].loadpriority + "');\">Edit</div><div style='float:right;margin-right:30px;'>Priority: " + zresponse.animationevents[i].loadpriority + "</div><div class='wtw-clear'></div><hr />";
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-avatars:scripts-class_main.js-loadAvatarAnimationEvents=' + ex.message);
	} 
}


/* avatar functions */

WTW_AVATARS.prototype.loadAvatarEditDDL = function(zddlid, zselectedavatarid) {
	/* this function loads the Avatar Edit Form list of Avatars to Select to Edit */
	try {
		if (zselectedavatarid == undefined) {
			zselectedavatarid = '';
		}
		if (dGet(zddlid) != null) {
			WTW.clearDDL(zddlid);
			WTW.getAsyncJSON('/connect/avatars.php', 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					if (zresponse.avatars != undefined) {
						var zoption0 = document.createElement('option');
						zoption0.text = '';
						zoption0.value = '';
						if (zselectedavatarid == '') {
							zoption0.selected = true;
						}
						dGet(zddlid).add(zoption0);
						for (var i=0;i < zresponse.avatars.length;i++) {
							if (zresponse.avatars[i] != null) {
								var zoption = document.createElement('option');
								zoption.text = zresponse.avatars[i].avatargroup + ': ' + zresponse.avatars[i].displayname;
								zoption.value = zresponse.avatars[i].avatarid;
								if (zresponse.avatars[i].avatarid == zselectedavatarid) {
									zoption.selected = true;
								}
								dGet(zddlid).add(zoption);
							}
						}
						if (zddlid == 'wtw_selecteditavatar') {
							if (zselectedavatarid != '' && zselectedavatarid != dGet('wtw_tavatarprofileavatarid').value) {
								wtwavatars.loadEditAvatar();
							} else {
								WTW.hide('wtw_avatardetails');
							}
						}
					}
				}
			);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-avatars:scripts-class_main.js-loadAvatarEditDDL=' + ex.message);
	} 
}

WTW_AVATARS.prototype.addNewAvatar = function(zavatargroup) {
	/* this function sets the Avatar Edit Form to create a new avatar profile */
	try {
		if (zavatargroup == undefined) {
			zavatargroup = 'Default';
		}
		dGet('wtw_tavatarprofileavatarid').value = WTW.getRandomString(16,1);
		dGet('wtw_tavatarprofiledisplayname').value = 'New Avatar';
		dGet('wtw_tavatarprofilegender').value = '';
		dGet('wtw_tavatarprofilefolder').value = '/content/avatars/newavatar/';
		dGet('wtw_tavatarprofilefile').value = 'newavatar.babylon';
		dGet('wtw_tavatarprofilescalingx').value = '1.0000';
		dGet('wtw_tavatarprofilescalingy').value = '1.0000';
		dGet('wtw_tavatarprofilescalingz').value = '1.0000';
		dGet('wtw_tavatarprofilestartframe').value = '1';
		dGet('wtw_tavatarprofileendframe').value = '100';
		dGet('wtw_tavatarprofilesortorder').value = '0';
		WTW.loadAvatarGroupDDL('wtw_tavatarprofileavatargroup', zavatargroup);
		WTW.show('wtw_avatardetails');
	} catch (ex) {
		WTW.log('plugins:wtw-avatars:scripts-class_main.js-addNewAvatar=' + ex.message);
	} 
}

WTW_AVATARS.prototype.loadEditAvatar = function() {
	/* this function loads the Avatar Edit Form with the selected avatarid */
	try {
		WTW.hide('wtw_avatardetails');
		var zavatarid = WTW.getDDLValue('wtw_selecteditavatar');
		/* clear colors and animations */
		dGet('wtw_avatarprofilecolorlist').innerHTML = '';
		dGet('wtw_avatarprofileanimationlist').innerHTML = '';
		/* get the avatar basics */
		WTW.getAsyncJSON('/connect/avatar.php?avatarid=' + zavatarid, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.avatar != undefined) {
					if (zresponse.avatar.objects != undefined) {
						dGet('wtw_tavatarprofileavatarid').value = zresponse.avatar.avatarid;
						dGet('wtw_tavatarprofiledisplayname').value = zresponse.avatar.displayname;
						dGet('wtw_tavatarprofilegender').value = zresponse.avatar.gender;
						dGet('wtw_tavatarprofilefolder').value = zresponse.avatar.objects.folder;
						dGet('wtw_tavatarprofilefile').value = zresponse.avatar.objects.file;
						dGet('wtw_tavatarprofilescalingx').value = zresponse.avatar.scaling.x;
						dGet('wtw_tavatarprofilescalingy').value = zresponse.avatar.scaling.y;
						dGet('wtw_tavatarprofilescalingz').value = zresponse.avatar.scaling.z;
						dGet('wtw_tavatarprofilestartframe').value = zresponse.avatars.object.startframe;
						dGet('wtw_tavatarprofileendframe').value = zresponse.avatar.objects.endframe;
						dGet('wtw_tavatarprofilesortorder').value = zresponse.avatar.sortorder;
						WTW.loadAvatarGroupDDL('wtw_tavatarprofileavatargroup', zresponse.avatar.avatargroup);
						WTW.show('wtw_avatardetails');
						
						if (zresponse.avatar.avatarparts != undefined) {
							if (zresponse.avatar.avatarparts.length > 0) {
								dGet('wtw_avatarprofilecolorlist').innerHTML += "<div class='wtw-dashboardlabel' style='min-width:20%;font-weight:bold;'>Avatar Part</div>";
								dGet('wtw_avatarprofilecolorlist').innerHTML += "<div style='display:inline-block;margin:10px;min-width:15%;font-weight:bold;'>Diffuse Color</div>";
								dGet('wtw_avatarprofilecolorlist').innerHTML += "<div style='display:inline-block;margin:10px;min-width:15%;font-weight:bold;'>Specular Color</div>";
								dGet('wtw_avatarprofilecolorlist').innerHTML += "<div style='display:inline-block;margin:10px;min-width:15%;font-weight:bold;'>Emissive Color</div>";
								dGet('wtw_avatarprofilecolorlist').innerHTML += "<div style='display:inline-block;margin:10px;min-width:15%;font-weight:bold;'>Ambient Color</div>";
								dGet('wtw_avatarprofilecolorlist').innerHTML += "</div><div class='wtw-clear'></div><hr />";
							}
							for (var i=0;i < zresponse.avatar.avatarparts.length;i++) {
								if (zresponse.avatar.avatarparts[i] != null) {
									var zavatarpart = zresponse.avatar.avatarparts[i];
									var zcolorlist = '<div>';
									zcolorlist += "<div class='wtw-dashboardlabel' style='min-width:20%;font-size:1.4em;font-weight:bold;'>" + zavatarpart.avatarpart + "</div>";
									zcolorlist += "<div style='display:inline-block;margin:10px;min-width:15%;vertical-align:top;'><div style='display:inline-block;margin-right:5px;width:24px;height:24px;border:1px solid #000000;background-color:" + zavatarpart.diffusecolor + ";'></div>" + zavatarpart.diffusecolor + "</div>";
									zcolorlist += "<div style='display:inline-block;margin:10px;min-width:15%;vertical-align:top;'><div style='display:inline-block;margin-right:5px;width:24px;height:24px;border:1px solid #000000;background-color:" + zavatarpart.specularcolor + ";'></div>" + zavatarpart.specularcolor + "</div>";
									zcolorlist += "<div style='display:inline-block;margin:10px;min-width:15%;vertical-align:top;'><div style='display:inline-block;margin-right:5px;width:24px;height:24px;border:1px solid #000000;background-color:" + zavatarpart.emissivecolor + ";'></div>" + zavatarpart.emissivecolor + "</div>";
									zcolorlist += "<div style='display:inline-block;margin:10px;min-width:15%;vertical-align:top;'><div style='display:inline-block;margin-right:5px;width:24px;height:24px;border:1px solid #000000;background-color:" + zavatarpart.ambientcolor + ";'></div>" + zavatarpart.ambientcolor + "</div>";
									zcolorlist += "</div><div class='wtw-clear'></div><hr />";
									dGet('wtw_avatarprofilecolorlist').innerHTML += zcolorlist;
								}
							}
						}
						
						if (zresponse.avatar.avataranimationdefs != undefined) {
							for (var i=0;i < zresponse.avatar.avataranimationdefs.length;i++) {
								if (zresponse.avatar.avataranimationdefs[i] != null) {
									var zavataranimation = zresponse.avatar.avataranimationdefs[i];
									var zanimationlist = '<div>';
									zanimationlist += "<div class='wtw-dashboardlabel' style='min-width:20%;'><span style='font-size:1.6em;font-weight:bold;'>" + zavataranimation.animationevent + "</span><br /><br /></div>";
									zanimationlist += "<div class='wtw-dashboardlabel' style='min-width:20%;'>Files<span style='font-size:1.6em;font-weight:bold;'>&nbsp;</span><br />" + zavataranimation.objectfolder + "<br />" + zavataranimation.objectfile + "</div>";
									zanimationlist += "<div class='wtw-dashboardlabel' style='min-width:20%;display:inline-block;'>Frames<span style='font-size:1.6em;font-weight:bold;'>&nbsp;</span><br />" + zavataranimation.startframe + "<br />" + zavataranimation.endframe + "</div>";
									zanimationlist += "<div class='wtw-dashboardlabel' style='min-width:20%;display:inline-block;'>Speed Ratio<span style='font-size:1.6em;font-weight:bold;'>&nbsp;</span><br />" + zavataranimation.speedratio + "<br /></div>";
									zanimationlist += "</div><div class='wtw-clear'></div><hr />";
									dGet('wtw_avatarprofileanimationlist').innerHTML += zanimationlist;
								}
							}
						}
					}
				}
			}
		);
		
		
	} catch (ex) {
		WTW.log('plugins:wtw-avatars:scripts-class_main.js-loadEditAvatar=' + ex.message);
	} 
}

WTW_AVATARS.prototype.saveAvatarProfileForm = function(w) {
	/* this function saves the Avatar Edit Form (save, delete, cancel) */
	try {
		switch (w) {
			case 1:
				/* save avatar basics */
				var zrequest = {
					'avatarid':dGet('wtw_tavatarprofileavatarid').value,
					'avatargroup':WTW.getDDLText('wtw_tavatarprofileavatargroup'),
					'displayname':dGet('wtw_tavatarprofiledisplayname').value,
					'objectfolder':dGet('wtw_tavatarprofilefolder').value,
					'objectfile':dGet('wtw_tavatarprofilefile').value,
					'gender':dGet('wtw_tavatarprofilegender').value,
					'scalingx':dGet('wtw_tavatarprofilescalingx').value,
					'scalingy':dGet('wtw_tavatarprofilescalingy').value,
					'scalingz':dGet('wtw_tavatarprofilescalingz').value,
					'startframe':dGet('wtw_tavatarprofilestartframe').value,
					'endframe':dGet('wtw_tavatarprofileendframe').value,
					'sortorder':dGet('wtw_tavatarprofilesortorder').value,
					'function':'saveavatarprofile'
				};
				WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						if (zresponse.serror == '') {
							wtwavatars.loadAvatarEditDDL('wtw_selecteditavatar', zresponse.avatarid);
							dGet('wtw_avatarprofileerror').innerHTML = 'Avatar Profile Saved';
							dGet('wtw_avatarprofileerror').style.color = 'green';
						} else {
							dGet('wtw_avatarprofileerror').innerHTML = zresponse.serror;
							dGet('wtw_avatarprofileerror').style.color = 'red';
						}
						window.setTimeout(function(){
							dGet('wtw_avatarprofileerror').innerHTML = '';
						},5000);
					}
				);
				break;
			case 0:
				/* delete avatar */
				var zrequest = {
					'avatarid':dGet('wtw_tavatarprofileavatarid').value,
					'function':'deleteavatarprofile'
				};
				WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						if (zresponse.serror == '') {
							WTW.hide('wtw_avatardetails');
							WTW.openFullPageForm('fullpage','Avatar Profile','wtw_avatarprofilepage');
							wtwavatars.loadAvatarEditDDL('wtw_selecteditavatar');
						} else {
							dGet('wtw_avatarprofileerror').innerHTML = zresponse.serror;
							dGet('wtw_avatarprofileerror').style.color = 'red';
							window.setTimeout(function(){
								dGet('wtw_avatarprofileerror').innerHTML = '';
							},5000);
						}
					}
				);
				break;
			case -1:
				/* cancel edit avatar basics */
				
				break;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-avatars:scripts-class_main.js-saveAvatarProfileForm=' + ex.message);
	} 
}



/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are related to transitions of avatars in and out of scenes */

WTWJS.prototype.saveAvatarEnterAnimation = async function() {
	/* saves the avatar enter animation to the database - depreciated by the new avatar designer plugin */
	try {
		var zavataranimationid = WTW.getDDLValue('wtw_tselectavataranimation-enter');
		if (WTW.isNumeric(zavataranimationid) == false) {
			zavataranimationid = 1;
		}
		var zrequest = {
			'useravatarid': dGet('wtw_tuseravatarid').value,
			'instanceid': dGet('wtw_tinstanceid').value,
			'avataranimationid': zavataranimationid,
			'transport': '1',
			'function':'savetransportanimation'
		};
		WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
			}
		);
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-saveAvatarEnterAnimation=' + ex.message);
    }
}

WTWJS.prototype.addAvatarAnimationRow = function(zoptionind, zselectedvalue) {
	/* adds another row to the available optional animations - depreciated by the new avatar designer plugin */
	try {
		var zuseravataranimationid = '';
		var zoptional = dGet('wtw_tselectavataranimation-' + zoptionind);
		var znewoptional = zoptional.cloneNode();
		var zbasename = 'wtw_tselectavataranimation-';
		var i = zoptionind;
		var znewname = zbasename + i;
		while (dGet(znewname) != null) {
			znewname = zbasename + i;
			zoptionind = i;
			i += 1;
		}
		if (zoptionind > 68) {
			WTW.hide('wtw_animation-add');
		}
		if (zselectedvalue.indexOf('|') > -1) {
			var zcurrentvalues = zselectedvalue.split('|');
			zuseravataranimationid = zcurrentvalues[0];
		}
		znewoptional.id = znewname;
		znewoptional.className = 'wtw-inlinespacing';
		znewoptional.style = '';
		znewoptional.innerHTML = '';
		for (var i = 0; i < zoptional.options.length; i++) {
			var zoption = zoptional.options[i].cloneNode();
			zoption.innerHTML = zoptional.options[i].innerHTML;
			if (zoption.value == zselectedvalue) {
				zoption.selected = true;
			} else {
				zoption.selected = false;
			}
			znewoptional.appendChild(zoption);
		}
		var zcurrent = document.createElement('input');
		zcurrent.type = 'hidden';
		zcurrent.value = zuseravataranimationid;
		zcurrent.id = 'wtw_tselectavataranimation-' + zoptionind + '-value';
		var zdeleteanimation = document.createElement('div');
		zdeleteanimation.id = 'wtw_tselectavataranimation-' + zoptionind + '-delete';
		zdeleteanimation.className = 'wtw-deleteanimicon';
		zdeleteanimation.innerHTML = "<img src='/content/system/images/deleteicon.png' alt='Delete Animation' title='Delete Animation' onclick=\"WTW.deleteUserAnimation('" + znewname + "');\" class='wtw-image18' />";
		dGet('wtw_addoptionalanimations').appendChild(zcurrent);
		zdeleteanimation.appendChild(znewoptional);
		dGet('wtw_addoptionalanimations').appendChild(zdeleteanimation);
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-addAvatarAnimationRow=' + ex.message);
    }
}

WTWJS.prototype.updateAnimSelectValue = function(zuseravataranimationidfield, zuseravataranimationid) {
	/* updates the optional animations - depreciated by the new avatar designer plugin */
	try {
		if (dGet(zuseravataranimationidfield) != null) {
			dGet(zuseravataranimationidfield).value = zuseravataranimationid;
			var zselobjid = zuseravataranimationidfield.replace('-value','');
			var zselvalue = WTW.getDDLValue(zselobjid);
			var znewselvalue = '';
			if (zselvalue.indexOf('|') > -1) {
				var zselvalues = zselvalue.split('|');
				znewselvalue = zuseravataranimationid;
				for (var i=1;i<zselvalues.length;i++) {
					znewselvalue += '|' + zselvalues[i];
				}
			}
			if (dGet(zselobjid) != null) {
				if (dGet(zselobjid).selectedIndex > -1) {
					dGet(zselobjid).options[dGet(zselobjid).selectedIndex].value = znewselvalue;
				}
			}
			var zavatar = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value);
			if (zavatar != null) {
				if (zavatar.WTW.animations != undefined) {
					for (var i=zavatar.WTW.animations.length-1;i>-1;i--) {
						if (zavatar.WTW.animations[i] != null) {
							if (zavatar.WTW.animations[i].animationevent == 'onoption' && zavatar.WTW.animations[i].useravataranimationid == '') {
								zavatar.WTW.animations[i].useravataranimationid = zuseravataranimationid;
							}
						}
					}
				}
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-updateAnimSelectValue=' + ex.message);
    }
}

WTWJS.prototype.deleteUserAnimation = async function(zselectname) {
	/* deletes an optional animation - depreciated by the new avatar designer plugin */
	try {
		var zuseravataranimationid = '';
		var zavataranimationid = '';
		var zanimationevent = '';
		var zselectedvalue = WTW.getDDLValue(zselectname);
		if (zselectedvalue.indexOf('|') > -1) {
			var zcurrentvalues = zselectedvalue.split('|');
			zuseravataranimationid = zcurrentvalues[0];
			zavataranimationid = zcurrentvalues[1];
			zanimationevent = zcurrentvalues[3];
		}
		WTW.show('wtw_animation-add');
		var zavatar = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value);
		if (zavatar != null) {
			if (zavatar.WTW.animations != undefined) {
				for (var i=zavatar.WTW.animations.length-1;i>-1;i--) {
					if (zavatar.WTW.animations[i] != null) {
						if (zavatar.WTW.animations[i].useravataranimationid == zuseravataranimationid) {
							if (zavatar.WTW.animations.running['onoption' + zavatar.WTW.animations[i].avataranimationid] != undefined) {
								zavatar.WTW.animations.running['onoption' + zavatar.WTW.animations[i].avataranimationid].stop();
							}
							zavatar.WTW.animations.splice(i,1);
						}
					}
				}
			}
		}
		if (dGet(zselectname) != null) {
			WTW.hide(zselectname);
			WTW.hide(zselectname + '-delete');
		}
		if (zuseravataranimationid != '') {
			var zrequest = {
				'useravatarid': dGet('wtw_tuseravatarid').value,
				'instanceid': dGet('wtw_tinstanceid').value,
				'useravataranimationid': zuseravataranimationid,
				'avataranimationid':zavataranimationid,
				'function':'deleteavataranimation'
			};
			WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
				}
			);
		}
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-deleteUserAnimation=' + ex.message);
    }
}

WTWJS.prototype.toggleMenuAnimations = function() {
	/* opens and closes the execute animations box from the menu - will be depreciated soon (moved to HUD) */
	try {
		if (dGet('wtw_menuoptionalanimations').style.display == 'none' || dGet('wtw_menuoptionalanimations').style.display == '') {
			var zlistoptionalanimations = '';
			var zavatar = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value);
			if (zavatar != null) {
				if (zavatar.WTW.avataranimationdefs != undefined) {
					zavatar.WTW.avataranimationdefs.sort(function (a, b) {
						return (+(a.loadpriority > b.loadpriority) || +(a.loadpriority === b.loadpriority) - 1) || (+(a.animationfriendlyname > b.animationfriendlyname) || +(a.animationfriendlyname === b.animationfriendlyname) - 1);
					});
					for (var i=0; i < zavatar.WTW.avataranimationdefs.length; i++) {
						if (zavatar.WTW.avataranimationdefs[i] != null) {
							var zanimdef = zavatar.WTW.avataranimationdefs[i];
							if (zanimdef.animationevent.indexOf('onoption') > -1) {
								var zfriendlyname = zanimdef.animationfriendlyname;
								var zmode = '';
								var zicon = '/content/system/images/animdefault.png';
								if (zanimdef.animationicon != '') {
									zicon = zanimdef.animationicon;
								}
								if (zfriendlyname.toLowerCase().indexOf('fight') > -1) {
									zmode = 'fight';
								}
								zfriendlyname = zfriendlyname.replace('Option - ','').replace('Option-','').replace('option - ','').replace('option-','').replace('Option -','').replace('option -','').replace('Option- ','').replace('option- ','');
								zfriendlyname = zfriendlyname.replace('Fight - ','').replace('Fight-','').replace('fight - ','').replace('fight-','').replace('Fight -','').replace('fight -','').replace('Fight- ','').replace('fight- ','');
								zlistoptionalanimations += "<div id='wtw_playanimation" + i + "-" + zmode + "' class='wtw-animationicondiv'";
								if (zmode == 'fight') {
									zlistoptionalanimations += " style='display:none;visibility:hidden;'"
								}
								zlistoptionalanimations += " onmousedown=\"WTW.runOptionalAnimation(this,'" + zanimdef.animationevent + "')\"";
								zlistoptionalanimations += " onmouseup=\"WTW.stopOptionalAnimation(this,'" + zanimdef.animationevent + "')\"";
								zlistoptionalanimations += " onpointerdown=\"WTW.runOptionalAnimation(this,'" + zanimdef.animationevent + "')\"";
								zlistoptionalanimations += " onpointerup=\"WTW.stopOptionalAnimation(this,'" + zanimdef.animationevent + "')\"";
								zlistoptionalanimations += " ontouchstart=\"WTW.runOptionalAnimation(this,'" + zanimdef.animationevent + "')\"";
								zlistoptionalanimations += " ontouchend=\"WTW.stopOptionalAnimation(this,'" + zanimdef.animationevent + "')\">";
								zlistoptionalanimations += "<img src='" + zicon + "' class='wtw-image80' alt='" + zfriendlyname + "' title='" + zfriendlyname + "' /><br /><div style='margin:3px;'>" +zfriendlyname  + "</div></div>";
							} else if (zanimdef.animationevent.indexOf('onwait-fight') > -1) {
								WTW.showInline('wtw_animationmodefight');
							}
						}
					}
				}
			}
			dGet('wtw_listoptionalanimations').innerHTML = zlistoptionalanimations;
			WTW.show('wtw_menuoptionalanimations');
			var zmenuwidth = dGet('wtw_menuoptionalanimations').clientWidth;
			if (zmenuwidth > (WTW.sizeX - 80)) {
				zmenuwidth = (WTW.sizeX - 80);
			}
			if (dGet('wtw_menuoptionanimations') != null) {
				dGet('wtw_menuoptionalanimations').style.left = (WTW.sizeX/2 + 12 - (zmenuwidth/2)) + 'px';
				dGet('wtw_menuoptionalanimations').style.width = (zmenuwidth) + 'px';
			}
		} else {
			WTW.hide('wtw_menuoptionalanimations');
		}
	} catch (ex) { 
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-toggleMenuAnimations=' + ex.message);
	}
}

WTWJS.prototype.avatarAnimationMode = function(zmode) {
	/* selects the animation mode */
	try {
		WTW.animationSet = zmode;
		if (zmode == 'fight') {
			dGet('wtw_animationmodenormal').className = 'wtw-animationmode';
			dGet('wtw_animationmodefight').className = 'wtw-animationmodeselected';
			var zanimbuttons = document.getElementsByClassName('wtw-animationicondiv');
			for (var i=0;i < zanimbuttons.length;i++) {
				if (zanimbuttons[i].id.indexOf('fight') > -1) {
					WTW.showInline(zanimbuttons[i].id);
				} else {
					WTW.hide(zanimbuttons[i].id);
				}
			}
		} else {
			dGet('wtw_animationmodefight').className = 'wtw-animationmode';
			dGet('wtw_animationmodenormal').className = 'wtw-animationmodeselected';
			var zanimbuttons = document.getElementsByClassName('wtw-animationicondiv');
			for (var i=0;i < zanimbuttons.length;i++) {
				if (zanimbuttons[i].id.indexOf('fight') > -1) {
					WTW.hide(zanimbuttons[i].id);
				} else {
					WTW.showInline(zanimbuttons[i].id);
				}
			}
		}
	} catch (ex) { 
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-avatarAnimationMode=' + ex.message);
	}
}

WTWJS.prototype.getAvatarAnimationsAll = async function() {
	/* loads all available animation definitions - will be depreciated soon */
	try {
		var zrequest = {
			'useravatarid': dGet('wtw_tuseravatarid').value,
			'instanceid': dGet('wtw_tinstanceid').value,
			'function':'getavataranimationsall'
		};
		WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.loadAvatarAnimationsAll(JSON.parse(zresponse.avataranimations));
			}
		);
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-getAvatarAnimationsAll=' + ex.message);
    }
}

WTWJS.prototype.loadAvatarAnimationsAll = function(zresponse) {
	/* loads all animation definitions noting the ones assigned to a particular avatar - used by the menu - will be depreciated soon */
	try {
		var zoptionind = -1;
		var zeditavataranimations = "<ul style='padding:0px;'>";
		var zoptionalanimations = [];
		if (zresponse != null) {
			var zlastanimationname = '';
			var zcurrentinput = '';
			var zsetselect = false;
			for (var i=0;i<zresponse.length;i++) {
				if (zresponse[i] != null) {
					var zfound = false;
					var zanimationname = zresponse[i].animationevent;
					switch (zresponse[i].animationevent) {
						case 'onwait':
							zanimationname = 'Standing Idle';
							zfound = true;
							break;
						case 'onwalk':
							zanimationname = 'Walk';
							zfound = true;
							break;
						case 'onwalkbackwards':
							zanimationname = 'Walk Backwards';
							zfound = true;
							break;
						case 'onturnleft':
							zanimationname = 'Turn Left';
							zfound = true;
							break;
						case 'onturnright':
							zanimationname = 'Turn Right';
							zfound = true;
							break;
						case 'onstrafeleft':
							zanimationname = 'Strafe Left';
							zfound = true;
							break;
						case 'onstraferight':
							zanimationname = 'Strafe Right';
							zfound = true;
							break;
						case 'onrun':
							zanimationname = 'Run';
							zfound = true;
							break;
						case 'onrunbackwards':
							zanimationname = 'Run Backwards';
							zfound = true;
							break;
						case 'onrunturnleft':
							zanimationname = 'Run Turn Left';
							zfound = true;
							break;
						case 'onrunturnright':
							zanimationname = 'Run Turn Right';
							zfound = true;
							break;
						case 'onrunstrafeleft':
							zanimationname = 'Run Strafe Left';
							zfound = true;
							break;
						case 'onrunstraferight':
							zanimationname = 'Run Strafe Right';
							zfound = true;
							break;
						case 'onoption':
							zanimationname = 'Optional Gestures ++';
							zfound = true;
							break;
					}
					if (zfound) {
						if (zlastanimationname != zanimationname) {
							zsetselect = false;
							if (zlastanimationname != '') {
								zeditavataranimations += "</select></div></li>";
							}
							if (zresponse[i].animationevent == 'onoption') {
								zoptionind = i;
							}
							zcurrentinput = 'wtw_tselectavataranimation-' + i + '-value';
							zeditavataranimations += "<li id='wtw_animation-" + zresponse[i].animationevent + "' class='wtw-avatarli' onclick=\"WTW.editAvatarAnimation('" + zresponse[i].animationevent + "'," + i + "," + zresponse.length + ");\">";
							zeditavataranimations += "<div class='wtw-inlineindent'>" + zanimationname + "</div></li>";
							zeditavataranimations += "<li id='wtw_animationdiv-" + i + "' class='wtw-avatarli' style='display:none;visibility:hidden;'>";
							if (zresponse[i].animationevent == 'onoption') {
								zeditavataranimations += '<div>';
							} else {
								zeditavataranimations += "<div class='wtw-inlineindent2'>";
							}
							zeditavataranimations += "<input id='" + zcurrentinput + "' type='hidden' value='' />";
							
							if (zresponse[i].animationevent == 'onoption') {
								zeditavataranimations += "<select id='wtw_tselectavataranimation-" + i + "' onchange=\"WTW.changeAvatarAnimation(this);\" class='wtw-pointer' style='display:none;visibility:hidden;' >";
								zeditavataranimations += "<option value=''> -- Select Animation -- </option>";
							} else {
								zeditavataranimations += "<select id='wtw_tselectavataranimation-" + i + "' onchange=\"WTW.changeAvatarAnimation(this);\" class='wtw-pointer' >";
							}
							if (zoptionind > 68) {
								WTW.hide('wtw_animation-add');
							}
							zlastanimationname = zanimationname;
						}
						var zselected = '';
						var zvalue = zresponse[i].useravataranimationid + '|' + zresponse[i].avataranimationid + '|' + zresponse[i].speedratio + '|' + zresponse[i].animationevent + '|' + zresponse[i].startframe + '|' + zresponse[i].endframe + '|' + zresponse[i].objectfolder + '|' + zresponse[i].objectfile + '|' + zresponse[i].animationfriendlyname + '|' + zresponse[i].loadpriority + '|' + zresponse[i].animationicon;
						if (zresponse[i].useravataranimationid != null && zresponse[i].useravataranimationid != '') {
							if (zsetselect == false && zresponse[i].animationevent != 'onoption') {
								zselected = "selected='true'";
								if (dGet(zcurrentinput) != null) {
									dGet(zcurrentinput).value = zresponse[i].useravataranimationid;
								}
								zsetselect = true;
							} else {
								zoptionalanimations[zoptionalanimations.length] = zvalue;
							}
						}
						zeditavataranimations += "<option " + zselected + " value='" + zvalue + "'>" + zresponse[i].animationfriendlyname + "</option>";
					}
				}
			}
		}
		zeditavataranimations += "</select></div><div id='wtw_addoptionalanimations'></div><div id='wtw_animation-add' class='wtw-addbuttonaccept' onclick=\"WTW.addAvatarAnimationRow(" + zoptionind + ",'');\" style='text-align:center;margin-left:20px;'>+ Add Animation</div>";
		zeditavataranimations += "<div style='font-size:.8em;text-align:center;'><img id='wtw_helpanimicon' src='/content/system/images/menugestures32.png' alt='Animations' title='Animations' /> Click on toolbar below to execute.</div></li></ul>";
		dGet('wtw_editavataranimations').innerHTML = zeditavataranimations;
		if (zoptionalanimations.length > 0) {
			for (var i=0;i<zoptionalanimations.length;i++) {
				if (zoptionalanimations[i] != null) {
					if (zoptionalanimations[i] != '') {
						WTW.addAvatarAnimationRow(zoptionind, zoptionalanimations[i]);
					}
				}
			}
		}
		WTW.showSettingsMenu('wtw_menuavatar');
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-loadAvatarAnimationsAll=' + ex.message);
    }
}

WTWJS.prototype.editEnterAnimation = function() {
	/* toggles to show/hide enter animation section - will be depreciated soon */
	try {
		WTW.editAvatarAnimation('', -1, 181);
		WTW.toggle('wtw_animationdiv-enter');
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-editEnterAnimation=' + ex.message);
    }
}

WTWJS.prototype.editAvatarAnimation = function(animationevent, currentind, total) {
	/* toggles to show/hide enter animation section by index - menu - will be depreciated soon */
	try {
		dGet('wtw_tavataranimationevent').value = animationevent;
		for (var i=0;i<total;i++) {
			if (dGet('wtw_animationdiv-' + i) != null && i != currentind) {
				WTW.hide('wtw_animationdiv-' + i);
			} else if (i == currentind) {
				WTW.toggle('wtw_animationdiv-' + i);
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-editAvatarAnimation=' + ex.message);
    }
}

WTWJS.prototype.avatarEnter = function(zavatarname) {
	/* selects the enter animation for an avatar and executes the appropriate function */
	try {
		var zavatarparts = [];
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		var zenteranimation = 0;
		if (zavatar != null) {
			if (zavatar.WTW != null) {
				if (zavatar.WTW.enteranimation != null) {
					if (WTW.isNumeric(zavatar.WTW.enteranimation)) {
						zenteranimation = Number(zavatar.WTW.enteranimation);
					}
				}
			}
			var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
			if (zavatarscale != null) {
				zavatarparts = zavatarscale.getChildren();
			}
		}
		if (zenteranimation == 0) {
			zenteranimation = Math.floor(Math.random() * 11) + 1;
		}
		switch (zenteranimation) {
			case 1:
				WTW.avatarShowVisible(zavatarname, zavatarparts);
				break;
			case 2:
				WTW.avatarShowFade(zavatarname, zavatarparts);
				break;
			case 3:
				WTW.avatarShowFadeSmoke(zavatarname, zavatarparts);
				break;
			case 4:
				WTW.avatarShowFadeSwirl(zavatarname, zavatarparts);
				break;
			case 5:
				WTW.avatarShowFadeSprite(zavatarname, zavatarparts);
				break;
			case 6:
				WTW.avatarShowFadeParticles(zavatarname, zavatarparts);
				break;
			case 7:
				WTW.avatarShowGrow(zavatarname, zavatarparts);
				break;
			case 8:
				WTW.avatarShowGrowGlow(zavatarname, zavatarparts);
				break;
			case 9:
				WTW.avatarShowGrowSmoke(zavatarname, zavatarparts);
				break;
			case 10:
				WTW.avatarShowGrowGlowSmoke(zavatarname, zavatarparts);
				break;
			case 11:
				WTW.avatarShowBeam(zavatarname, zavatarparts);
				break;
			default:
				WTW.avatarShowVisible(zavatarname, zavatarparts);
				break;
		}
		WTW.pluginsEnterAvatar(zavatarname);
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-avatarEnter=' + ex.message);
    }
}

WTWJS.prototype.avatarMinLoadEnter = function(zavatarname) {
	/* enter animation for an avatar - used for demo avatars in avatar designer */
	try {
		var zavatarparts = [];
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
			if (zavatarscale != null) {
				zavatarparts = zavatarscale.getChildren();
			}
		}
		WTW.avatarShowVisible(zavatarname, zavatarparts);
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-avatarMinLoadEnter=' + ex.message);
    }
}

WTWJS.prototype.avatarShowVisible = function(zavatarname, zavatarparts) {
	/* enter animation for an avatar - quick visible */
	try {
		if (zavatarparts == undefined) {
			zavatarparts = [];
			var zavatar = WTW.getMeshOrNodeByID(zavatarname);
			var zenteranimation = '1';
			if (zavatar != null) {
				if (zavatar.WTW != null) {
					if (zavatar.WTW.enteranimation != null) {
						if (WTW.isNumeric(zavatar.WTW.enteranimation)) {
							zenteranimation = zavatar.WTW.enteranimation;
						}
					}
				}
				var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
				if (zavatarscale != null) {
					zavatarparts = zavatarscale.getChildren();
				}
			}
		}
		var zmaxvisibility = 1;
		if ((WTW.isMobile || WTW.sizeX < WTW.sizeY) && zavatarname.indexOf('myavatar') > -1) {
			zmaxvisibility = .5;
		}
		for (var i=0; i<zavatarparts.length; i++) {
			if (zavatarparts[i] != null) {
				zavatarparts[i].visibility = zmaxvisibility;
				zavatarparts[i].isVisible = true;
			}
		}
		WTW.avatarLoadComplete(zavatarname);
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-avatarShowVisible=' + ex.message);
    }
}

WTWJS.prototype.avatarShowFade = function(zavatarname, zavatarparts) {
	/* enter animation for an avatar - fade to visible */
	try {
		for (var i=0; i<zavatarparts.length;i++) {
			if (zavatarparts[i] != null) {
				zavatarparts[i].isVisible = true;
				zavatarparts[i].visibility = 0;
			}
		}
		var ztimername  = window.setInterval(function(){
			var zavatar = WTW.getMeshOrNodeByID(zavatarname);
			if (zavatar != null) {
				var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
				if (zavatarscale != null) {
					var zavatarparts = zavatarscale.getChildren();
					var zdone = false;
					for (var i=0; i<zavatarparts.length;i++) {
						if (zavatarparts[i] != null) {
							var zmaxvisibility = 1;
							if ((WTW.isMobile || WTW.sizeX < WTW.sizeY) && zavatarname.indexOf('myavatar') > -1) {
								zmaxvisibility = .5;
							}
							if (zavatarparts[i].visibility < zmaxvisibility) {
								zavatarparts[i].visibility += .1;
							} else {
								zavatarparts[i].visibility = zmaxvisibility;
								zdone = true;
							}
						}
					} 
					if (zdone) {
						window.clearInterval(ztimername);
						WTW.avatarLoadComplete(zavatarname);
					}
				}
			}
		},50);
	} catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-avatarShowFade=' + ex.message);
    }
}

WTWJS.prototype.avatarShowFadeSmoke = function(zavatarname, zavatarparts) {
	/* enter animation for an avatar - fade to visible with smoke */
	try {
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			var zsmoke = WTW.addMoldSmoke(zavatarname + '-smoke', null, .6, 1, .6);
			zsmoke.parent = zavatar;
			zsmoke.position.y = -10;
		}
		for (var i=0; i<zavatarparts.length;i++) {
			if (zavatarparts[i] != null) {
				zavatarparts[i].isVisible = true;
				zavatarparts[i].visibility = 0;
			}
		}
		window.setTimeout(function() {
			var ztimername  = window.setInterval(function(){
				var zavatar = WTW.getMeshOrNodeByID(zavatarname);
				if (zavatar != null) {
					var zsmoke = WTW.getMeshOrNodeByID(zavatarname + '-smoke');
					var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
					if (zavatarscale != null) {
						var zavatarparts = zavatarscale.getChildren();
						var zdone = false;
						for (var i=0; i<zavatarparts.length;i++) {
							if (zavatarparts[i] != null) {
								var zmaxvisibility = 1;
								if ((WTW.isMobile || WTW.sizeX < WTW.sizeY) && zavatarname.indexOf('myavatar') > -1) {
									zmaxvisibility = .5;
								}
								if (zavatarparts[i].visibility < zmaxvisibility) {
									zavatarparts[i].visibility += .1;
								} else {
									zavatarparts[i].visibility = zmaxvisibility;
									zdone = true;
								}
							}
						} 
						if (zsmoke.position.y < -2) {
							zsmoke.position.y += 2;
						}
						if (zdone) {
							if (zsmoke != null) {
								zsmoke.position.y -= 1000;
								window.setTimeout(function(){WTW.disposeClean(zavatarname + '-smoke');},7000);
							}
							window.clearInterval(ztimername);
							WTW.avatarLoadComplete(zavatarname);
						}
					}
				}
			},100);
		},500);
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-avatarShowFadeSmoke=' + ex.message);
    }
}

WTWJS.prototype.avatarShowFadeSwirl = function(zavatarname, zavatarparts) {
	/* enter animation for an avatar - fade to visible with 2 torus swirling arroud */
	try {
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			var ztorus1 = WTW.addMoldTorus(zavatarname + '-torus1', .5, .5, .5, 24, 20)
			ztorus1.isVisible = true;
			ztorus1.parent = zavatar;
			ztorus1.position.y += 10;
			ztorus1.rotation.z = WTW.getRadians(25);
			ztorus1.isVisible = true;
			ztorus1.visibility = 0;
			var ztorus2 = WTW.addMoldTorus(zavatarname + '-torus2', .5, .5, .5, 24, 20)
			ztorus2.isVisible = true;
			ztorus2.parent = zavatar;
			ztorus2.position.y += 5;
			ztorus2.rotation.z = WTW.getRadians(-25);
			ztorus2.isVisible = true;
			ztorus2.visibility = 0;
		}
		for (var i=0; i<zavatarparts.length;i++) {
			if (zavatarparts[i] != null) {
				zavatarparts[i].isVisible = true;
				zavatarparts[i].visibility = 0;
			}
		}
		var ztimername  = window.setInterval(function(){
			var zavatar = WTW.getMeshOrNodeByID(zavatarname);
			if (zavatar != null) {
				var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
				if (zavatarscale != null) {
					var ztorus1 = WTW.getMeshOrNodeByID(zavatarname + '-torus1');
					var ztorus2 = WTW.getMeshOrNodeByID(zavatarname + '-torus2');
					var zavatarparts = zavatarscale.getChildren();
					var zdone = false;
					if (ztorus1 != null) {
						if (WTW.getDegrees(ztorus1.rotation.y) > 340 || zavatarparts[0].visibility > 0) {
							for (var i=0; i<zavatarparts.length;i++) {
								if (zavatarparts[i] != null) {
									var zmaxvisibility = 1;
									if ((WTW.isMobile || WTW.sizeX < WTW.sizeY) && zavatarname.indexOf('myavatar') > -1) {
										zmaxvisibility = .5;
									}
									if (zavatarparts[i].visibility < zmaxvisibility) {
										zavatarparts[i].visibility += .1;
									} else {
										zavatarparts[i].visibility = zmaxvisibility;
										zdone = true;
									}
								}
							} 
							
						}
						ztorus1.rotation.y += WTW.getRadians(10);
						if (ztorus1.visibility < 1) {
							ztorus1.visibility += .1;
						} else {
							ztorus1.visibility = 1;
						}
					}
					if (ztorus2 != null) {
						ztorus2.rotation.y += WTW.getRadians(10);
						if (ztorus2.visibility < 1) {
							ztorus2.visibility += .1;
						} else {
							ztorus2.visibility = 1;
						}
					}
					if (zdone) {
						window.clearInterval(ztimername);
						ztimername  = window.setInterval(function(){
							var ztorus1 = WTW.getMeshOrNodeByID(zavatarname + '-torus1');
							var ztorus2 = WTW.getMeshOrNodeByID(zavatarname + '-torus2');
							var zdone = false;
							if (ztorus1 != null) {
								ztorus1.rotation.y += WTW.getRadians(10);
								if (ztorus1.visibility > 0) {
									ztorus1.visibility -= .1;
								} else {
									zdone = true;
								}
							}
							if (ztorus2 != null) {
								ztorus2.rotation.y += WTW.getRadians(10);
								if (ztorus2.visibility > 0) {
									ztorus2.visibility -= .1;
								} else {
									zdone = true;
								}
							}
							if (zdone) {
								WTW.disposeClean(zavatarname + '-torus1');
								WTW.disposeClean(zavatarname + '-torus2');
								window.clearInterval(ztimername);
								WTW.avatarLoadComplete(zavatarname);
							}
						},70);
					}
				}
			}
		},70);
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-avatarShowFadeSwirl=' + ex.message);
    }
}

WTWJS.prototype.avatarShowFadeSwirlLong = function(zavatarname, zavatarparts) {
	/* enter animation for an avatar - fade to visible with 2 torus swirling arroud */
	try {
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			var ztorus1 = WTW.addMoldTorus(zavatarname + '-torus1', .5, .5, .5, 24, 20)
			ztorus1.isVisible = true;
			ztorus1.parent = zavatar;
			ztorus1.position.y += 10;
			ztorus1.rotation.z = WTW.getRadians(25);
			ztorus1.isVisible = true;
			ztorus1.visibility = 0;
			var ztorus2 = WTW.addMoldTorus(zavatarname + '-torus2', .5, .5, .5, 24, 20)
			ztorus2.isVisible = true;
			ztorus2.parent = zavatar;
			ztorus2.position.y += 5;
			ztorus2.rotation.z = WTW.getRadians(-25);
			ztorus2.isVisible = true;
			ztorus2.visibility = 0;
		}
		for (var i=0; i<zavatarparts.length;i++) {
			if (zavatarparts[i] != null) {
				zavatarparts[i].isVisible = true;
				zavatarparts[i].visibility = 0;
			}
		}
		var ztimername  = window.setInterval(function(){
			var zavatar = WTW.getMeshOrNodeByID(zavatarname);
			if (zavatar != null) {
				var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
				if (zavatarscale != null) {
					var ztorus1 = WTW.getMeshOrNodeByID(zavatarname + '-torus1');
					var ztorus2 = WTW.getMeshOrNodeByID(zavatarname + '-torus2');
					var zavatarparts = zavatarscale.getChildren();
					var zdone = false;
					if (ztorus1 != null) {
						if (WTW.getDegrees(ztorus1.rotation.y) > 340 || zavatarparts[0].visibility > 0) {
							for (var i=0; i<zavatarparts.length;i++) {
								if (zavatarparts[i] != null) {
									var zmaxvisibility = 1;
									if ((WTW.isMobile || WTW.sizeX < WTW.sizeY) && zavatarname.indexOf('myavatar') > -1) {
										zmaxvisibility = .5;
									}
									if (zavatarparts[i].visibility < zmaxvisibility) {
										zavatarparts[i].visibility += .1;
									} else {
										zavatarparts[i].visibility = zmaxvisibility;
										zdone = true;
									}
								}
							} 
							
						}
						ztorus1.rotation.y += WTW.getRadians(10);
						if (ztorus1.visibility < 1) {
							ztorus1.visibility += .01;
						} else {
							ztorus1.visibility = 1;
						}
					}
					if (ztorus2 != null) {
						ztorus2.rotation.y += WTW.getRadians(10);
						if (ztorus2.visibility < 1) {
							ztorus2.visibility += .01;
						} else {
							ztorus2.visibility = 1;
						}
					}
					if (zdone) {
						window.clearInterval(ztimername);
						ztimername  = window.setInterval(function(){
							var ztorus1 = WTW.getMeshOrNodeByID(zavatarname + '-torus1');
							var ztorus2 = WTW.getMeshOrNodeByID(zavatarname + '-torus2');
							var zdone = false;
							if (ztorus1 != null) {
								ztorus1.rotation.y += WTW.getRadians(10);
								if (ztorus1.visibility > 0) {
									ztorus1.visibility -= .1;
								} else {
									zdone = true;
								}
							}
							if (ztorus2 != null) {
								ztorus2.rotation.y += WTW.getRadians(10);
								if (ztorus2.visibility > 0) {
									ztorus2.visibility -= .1;
								} else {
									zdone = true;
								}
							}
							if (zdone) {
								WTW.disposeClean(zavatarname + '-torus1');
								WTW.disposeClean(zavatarname + '-torus2');
								window.clearInterval(ztimername);
								WTW.avatarLoadComplete(zavatarname);
							}
						},70);
					}
				}
			}
		},70);
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-avatarShowFadeSwirlLong=' + ex.message);
    }
}

WTWJS.prototype.avatarShowFadeSprite = function(zavatarname, zavatarparts) {
	/* enter animation for an avatar - fade to visible with particle sprite shower */
	try {
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			var zmold = WTW.addMoldParticleSphere(zavatarname + '-sprite', null, 2.2, 2.2, 2.2);
			zmold.parent = zavatar;
			zmold.position.y += 8;
			var zsmoke = WTW.addMoldSmoke(zavatarname + '-smoke', null, .6, 1, .6);
			zsmoke.parent = zavatar;
			zsmoke.position.y = -10;
		}
		for (var i=0; i<zavatarparts.length;i++) {
			if (zavatarparts[i] != null) {
				zavatarparts[i].isVisible = true;
				zavatarparts[i].visibility = 0;
			}
		}
		window.setTimeout(function() {
			var ztimername  = window.setInterval(function(){
				var zavatar = WTW.getMeshOrNodeByID(zavatarname);
				if (zavatar != null) {
					var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
					if (zavatarscale != null) {
						var zsmoke = WTW.getMeshOrNodeByID(zavatarname + '-smoke');
						var zavatarparts = zavatarscale.getChildren();
						var zdone = false;
						for (var i=0; i<zavatarparts.length;i++) {
							if (zavatarparts[i] != null) {
								var zmaxvisibility = 1;
								if ((WTW.isMobile || WTW.sizeX < WTW.sizeY) && zavatarname.indexOf('myavatar') > -1) {
									zmaxvisibility = .5;
								}
								if (zavatarparts[i].visibility < zmaxvisibility) {
									zavatarparts[i].visibility += .1;
								} else {
									zavatarparts[i].visibility = zmaxvisibility;
									zdone = true;
								}
							}
						} 
						if (zsmoke.position.y < -2) {
							zsmoke.position.y += 2;
						}
						if (zdone) {
							var zmold = WTW.getMeshOrNodeByID(zavatarname + '-sprite');
							if (zmold != null) {
								window.setTimeout(function(){
									if (zmold.WTW.particlesystem != undefined) {
										zmold.WTW.particlesystem.stop();
										zmold.WTW.particlesystem.reset();
										WTW.disposeClean(zavatarname + '-sprite');
										WTW.disposeClean(zavatarname + '-particles');
									}
								},2000);
							}
							if (zsmoke != null) {
								zsmoke.position.y -= 1000;
								window.setTimeout(function(){
									WTW.disposeClean(zavatarname + '-smoke');
								},7000);
							}
							window.clearInterval(ztimername);
							WTW.avatarLoadComplete(zavatarname);
						}
					}
				}
			},30);
		},500);
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-avatarShowFadeSprite=' + ex.message);
    }
}

WTWJS.prototype.avatarShowFadeParticles = function(zavatarname, zavatarparts) {
	/* enter animation for an avatar - fade to visible with particles then solid */
	try {
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			var zsmoke = WTW.addMoldSmoke(zavatarname + '-smoke', null, .6, 1, .6);
			zsmoke.parent = zavatar;
			zsmoke.position.y = -10;
		}
		var zpcs = new BABYLON.PointsCloudSystem(zavatarname + 'pcs', 5, scene);
		for (var i=0; i<zavatarparts.length;i++) {
			if (zavatarparts[i] != null) {
				try {
					zpcs.addSurfacePoints(zavatarparts[i], 1000, BABYLON.PointColor.Color);
				} catch {}
				zavatarparts[i].isVisible = true;
				zavatarparts[i].visibility = 0;
			}
		}
		zpcs.buildMeshAsync().then((zmesh) => {
			zmesh.material.pointSize = 2;
			zmesh.visibility = 1;
			var zmeshtimer = window.setInterval(function(){
				if (zmesh.visibility > 0) {
					zmesh.visibility -= .1;
				} else {
					zmesh.dispose();
					window.clearInterval(zmeshtimer);
				}
			},100);
		});
		window.setTimeout(function() {
			var ztimername  = window.setInterval(function(){
				var zsmoke = WTW.getMeshOrNodeByID(zavatarname + '-smoke');
				var zavatar = WTW.getMeshOrNodeByID(zavatarname);
				if (zavatar != null) {
					var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
					if (zavatarscale != null) {
						var zavatarparts = zavatarscale.getChildren();
						var zdone = false;
						for (var i=0; i<zavatarparts.length;i++) {
							if (zavatarparts[i] != null) {
								var zmaxvisibility = 1;
								if ((WTW.isMobile || WTW.sizeX < WTW.sizeY) && zavatarname.indexOf('myavatar') > -1) {
									zmaxvisibility = .5;
								}
								if (zavatarparts[i].visibility < zmaxvisibility) {
									zavatarparts[i].visibility += .1;
								} else {
									zavatarparts[i].visibility = zmaxvisibility;
									zdone = true;
								}
							}
						} 
						if (zsmoke.position.y < -2) {
							zsmoke.position.y += 2;
						}
						if (zdone) {
							if (zsmoke != null) {
								zsmoke.position.y -= 1000;
								window.setTimeout(function(){WTW.disposeClean(zavatarname + '-smoke');},7000);
							} 
							try {
								if (zpcs != null) {
									zpcs.dispose();
									zpcs = null;
								}
							} catch (ex) {}
							window.clearInterval(ztimername);
							WTW.avatarLoadComplete(zavatarname);
						}
					}
				}
			},25);
		},1000);
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-avatarShowFadeParticles=' + ex.message);
    }
}

WTWJS.prototype.avatarShowGrow = function(zavatarname, zavatarparts) {
	/* enter animation for an avatar - start small and grow to scale */
	try {
		var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
		if (zavatarscale != null) {
			zavatarscale.scaling.x = .001;
			zavatarscale.scaling.y = .001;
			zavatarscale.scaling.z = .001;
		}
		
		var zmaxvisibility = 1;
		if ((WTW.isMobile || WTW.sizeX < WTW.sizeY) && zavatarname.indexOf('myavatar') > -1) {
			zmaxvisibility = .5;
		}
		for (var i=0; i<zavatarparts.length;i++) {
			if (zavatarparts[i] != null) {
				zavatarparts[i].visibility = zmaxvisibility;
				zavatarparts[i].isVisible = true;
			}
		}
		var ztimername  = window.setInterval(function(){
			var zavatar = WTW.getMeshOrNodeByID(zavatarname);
			if (zavatar != null) {
				var zscalingx = .04;
				var zscalingy = .04;
				var zscalingz = .04;
				if (zavatar.WTW != null) {
					if (zavatar.WTW.scaling != null) {
						if (zavatar.WTW.scaling.x != null) {
							if (WTW.isNumeric(zavatar.WTW.scaling.x)) {
								zscalingx = Number(zavatar.WTW.scaling.x);
							}
						}
						if (zavatar.WTW.scaling.y != null) {
							if (WTW.isNumeric(zavatar.WTW.scaling.y)) {
								zscalingy = Number(zavatar.WTW.scaling.y);
							}
						}
						if (zavatar.WTW.scaling.z != null) {
							if (WTW.isNumeric(zavatar.WTW.scaling.z)) {
								zscalingz = Number(zavatar.WTW.scaling.z);
							}
						}
					}
				}
				var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
				if (zavatarscale != null) {
					var zsetscalingx = zavatarscale.scaling.x;
					var zsetscalingy = zavatarscale.scaling.y;
					var zsetscalingz = zavatarscale.scaling.z;
					if (zsetscalingx < zscalingx) {
						zavatarscale.scaling.x += .001;
					} else {
						zsetscalingx = zscalingx;
						zavatarscale.scaling.x = zscalingx;
					}
					if (zsetscalingy < zscalingy) {
						zavatarscale.scaling.y += .001;
					} else {
						zsetscalingy = zscalingy;
						zavatarscale.scaling.y = zscalingy;
					}
					if (zsetscalingz < zscalingz) {
						zavatarscale.scaling.z += .001;
					} else {
						zsetscalingz = zscalingz;
						zavatarscale.scaling.z = zscalingz;
					}
					if (zsetscalingx == zscalingx && zsetscalingy == zscalingy && zsetscalingz == zscalingz) {
						window.clearInterval(ztimername);
						WTW.avatarLoadComplete(zavatarname);
					}
				}
			}
		},10);
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-avatarShowGrow=' + ex.message);
    }
}

WTWJS.prototype.avatarShowGrowGlow = function(zavatarname, zavatarparts) {
	/* enter animation for an avatar - start small and grow to scale with glow outline */
	try {
		if (WTW.highlightLayer == null) {
			WTW.highlightLayer = new BABYLON.HighlightLayer('highlightlayer', scene);
		}
		var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
		if (zavatarscale != null) {
			zavatarscale.scaling.x = .001;
			zavatarscale.scaling.y = .001;
			zavatarscale.scaling.z = .001;
			var zmaxvisibility = 1;
			if ((WTW.isMobile || WTW.sizeX < WTW.sizeY) && zavatarname.indexOf('myavatar') > -1) {
				zmaxvisibility = .5;
			}
			for (var i=0; i<zavatarparts.length;i++) {
				if (zavatarparts[i] != null) {
					zavatarparts[i].visibility = zmaxvisibility;
					zavatarparts[i].isVisible = true;
					try {
						WTW.highlightLayer.addMesh(zavatarparts[i], BABYLON.Color3.Yellow());
					} catch(ex){}
				}
			} 
		}
		var ztimername  = window.setInterval(function(){
			var zavatar = WTW.getMeshOrNodeByID(zavatarname);
			if (zavatar != null) {
				var zscalingx = .04;
				var zscalingy = .04;
				var zscalingz = .04;
				if (zavatar.WTW != null) {
					if (zavatar.WTW.scaling != null) {
						if (zavatar.WTW.scaling.x != null) {
							if (WTW.isNumeric(zavatar.WTW.scaling.x)) {
								zscalingx = Number(zavatar.WTW.scaling.x);
							}
						}
						if (zavatar.WTW.scaling.y != null) {
							if (WTW.isNumeric(zavatar.WTW.scaling.y)) {
								zscalingy = Number(zavatar.WTW.scaling.y);
							}
						}
						if (zavatar.WTW.scaling.z != null) {
							if (WTW.isNumeric(zavatar.WTW.scaling.z)) {
								zscalingz = Number(zavatar.WTW.scaling.z);
							}
						}
					}
				}
				var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
				if (zavatarscale != null) {
					var zsetscalingx = zavatarscale.scaling.x;
					var zsetscalingy = zavatarscale.scaling.y;
					var zsetscalingz = zavatarscale.scaling.z;
					if (zsetscalingx < zscalingx) {
						zavatarscale.scaling.x += .001;
					} else {
						zsetscalingx = zscalingx;
						zavatarscale.scaling.x = zscalingx;
					}
					if (zsetscalingy < zscalingy) {
						zavatarscale.scaling.y += .001;
					} else {
						zsetscalingy = zscalingy;
						zavatarscale.scaling.y = zscalingy;
					}
					if (zsetscalingz < zscalingz) {
						zavatarscale.scaling.z += .001;
					} else {
						zsetscalingz = zscalingz;
						zavatarscale.scaling.z = zscalingz;
					}
					if (zsetscalingx == zscalingx && zsetscalingy == zscalingy && zsetscalingz == zscalingz) {
						window.setTimeout(function(){
							var zavatarparts = zavatarscale.getChildren();
							for (var i=0; i<zavatarparts.length;i++) {
								if (zavatarparts[i] != null) {
									try {
										WTW.highlightLayer.removeMesh(zavatarparts[i]);
									} catch(ex){}
								}
							} 
						},1000);
						window.clearInterval(ztimername);
						WTW.avatarLoadComplete(zavatarname);
					}
				}
			}
		},25);
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-avatarShowGrowGlow=' + ex.message);
    }
}

WTWJS.prototype.avatarShowGrowSmoke = function(zavatarname, zavatarparts) {
	/* enter animation for an avatar - start small and grow to scale with smoke */
	try {
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			var zsmoke = WTW.addMoldSmoke(zavatarname + '-smoke', null, .6, .5, 2);
			zsmoke.parent = zavatar;
			zsmoke.position.y = -10;
		}
		var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
		if (zavatarscale != null) {
			zavatarscale.scaling.x = .001;
			zavatarscale.scaling.y = .001;
			zavatarscale.scaling.z = .001;
		}
		
		var zmaxvisibility = 1;
		if ((WTW.isMobile || WTW.sizeX < WTW.sizeY) && zavatarname.indexOf('myavatar') > -1) {
			zmaxvisibility = .5;
		}
		for (var i=0; i<zavatarparts.length;i++) {
			if (zavatarparts[i] != null) {
				zavatarparts[i].visibility = zmaxvisibility;
				zavatarparts[i].isVisible = true;
			}
		}
		window.setTimeout(function() {
			var ztimername  = window.setInterval(function(){
				var zavatar = WTW.getMeshOrNodeByID(zavatarname);
				if (zavatar != null) {
					var zscalingx = .04;
					var zscalingy = .04;
					var zscalingz = .04;
					if (zavatar.WTW != null) {
						if (zavatar.WTW.scaling != null) {
							if (zavatar.WTW.scaling.x != null) {
								if (WTW.isNumeric(zavatar.WTW.scaling.x)) {
									zscalingx = Number(zavatar.WTW.scaling.x);
								}
							}
							if (zavatar.WTW.scaling.y != null) {
								if (WTW.isNumeric(zavatar.WTW.scaling.y)) {
									zscalingy = Number(zavatar.WTW.scaling.y);
								}
							}
							if (zavatar.WTW.scaling.z != null) {
								if (WTW.isNumeric(zavatar.WTW.scaling.z)) {
									zscalingz = Number(zavatar.WTW.scaling.z);
								}
							}
						}
					}
					var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
					if (zavatarscale != null) {
						var zsmoke = WTW.getMeshOrNodeByID(zavatarname + '-smoke');
						if (zsmoke.position.y < -2) {
							zsmoke.position.y += 2;
						}
						var zsetscalingx = zavatarscale.scaling.x;
						var zsetscalingy = zavatarscale.scaling.y;
						var zsetscalingz = zavatarscale.scaling.z;
						if (zsetscalingx < zscalingx) {
							zavatarscale.scaling.x += .001;
						} else {
							zsetscalingx = zscalingx;
							zavatarscale.scaling.x = zscalingx;
						}
						if (zsetscalingy < zscalingy) {
							zavatarscale.scaling.y += .001;
						} else {
							zsetscalingy = zscalingy;
							zavatarscale.scaling.y = zscalingy;
						}
						if (zsetscalingz < zscalingz) {
							zavatarscale.scaling.z += .001;
						} else {
							zsetscalingz = zscalingz;
							zavatarscale.scaling.z = zscalingz;
						}
						if (zsetscalingx == zscalingx && zsetscalingy == zscalingy && zsetscalingz == zscalingz) {
							if (zsmoke != null) {
								zsmoke.position.y -= 1000;
								window.setTimeout(function(){WTW.disposeClean(zavatarname + '-smoke');},7000);
							}
							window.clearInterval(ztimername);
							WTW.avatarLoadComplete(zavatarname);
						}
					}
				}
			},40);
		},300);
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-avatarShowGrowSmoke=' + ex.message);
    }
}

WTWJS.prototype.avatarShowGrowGlowSmoke = function(zavatarname, zavatarparts) {
	/* enter animation for an avatar - start small and grow to scale with glow outline and smoke */
	try {
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			var zsmoke = WTW.addMoldSmoke(zavatarname + '-smoke', null, .6, .5, 2);
			zsmoke.parent = zavatar;
			zsmoke.position.y = -10;
		}
		var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
		if (zavatarscale != null) {
			zavatarscale.scaling.x = .001;
			zavatarscale.scaling.y = .001;
			zavatarscale.scaling.z = .001;
		}
		if (WTW.highlightLayer == null) {
			WTW.highlightLayer = new BABYLON.HighlightLayer('highlightlayer', scene);
		}
		var zmaxvisibility = 1;
		if ((WTW.isMobile || WTW.sizeX < WTW.sizeY) && zavatarname.indexOf('myavatar') > -1) {
			zmaxvisibility = .5;
		}
		for (var i=0; i<zavatarparts.length;i++) {
			if (zavatarparts[i] != null) {
				zavatarparts[i].visibility = zmaxvisibility;
				zavatarparts[i].isVisible = true;
				try {
					WTW.highlightLayer.addMesh(zavatarparts[i], BABYLON.Color3.Gray());
					WTW.highlightLayer.outerGlow = true;
					WTW.highlightLayer.innerGlow = false;
				} catch(ex){}
			}
		}
		window.setTimeout(function() {
			var ztimername  = window.setInterval(function(){
				var zavatar = WTW.getMeshOrNodeByID(zavatarname);
				if (zavatar != null) {
					var zscalingx = .04;
					var zscalingy = .04;
					var zscalingz = .04;
					if (zavatar.WTW != null) {
						if (zavatar.WTW.scaling != null) {
							if (zavatar.WTW.scaling.x != null) {
								if (WTW.isNumeric(zavatar.WTW.scaling.x)) {
									zscalingx = Number(zavatar.WTW.scaling.x);
								}
							}
							if (zavatar.WTW.scaling.y != null) {
								if (WTW.isNumeric(zavatar.WTW.scaling.y)) {
									zscalingy = Number(zavatar.WTW.scaling.y);
								}
							}
							if (zavatar.WTW.scaling.z != null) {
								if (WTW.isNumeric(zavatar.WTW.scaling.z)) {
									zscalingz = Number(zavatar.WTW.scaling.z);
								}
							}
						}
					}
					var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
					if (zavatarscale != null) {
						var zsmoke = WTW.getMeshOrNodeByID(zavatarname + '-smoke');
						if (zsmoke.position.y < -2) {
							zsmoke.position.y += 2;
						}
						var zsetscalingx = zavatarscale.scaling.x;
						var zsetscalingy = zavatarscale.scaling.y;
						var zsetscalingz = zavatarscale.scaling.z;
						if (zsetscalingx < zscalingx) {
							zavatarscale.scaling.x += .001;
						} else {
							zsetscalingx = zscalingx;
							zavatarscale.scaling.x = zscalingx;
						}
						if (zsetscalingy < zscalingy) {
							zavatarscale.scaling.y += .001;
						} else {
							zsetscalingy = zscalingy;
							zavatarscale.scaling.y = zscalingy;
						}
						if (zsetscalingz < zscalingz) {
							zavatarscale.scaling.z += .001;
						} else {
							zsetscalingz = zscalingz;
							zavatarscale.scaling.z = zscalingz;
						}
						if (zsetscalingx == zscalingx && zsetscalingy == zscalingy && zsetscalingz == zscalingz) {
							if (zsmoke != null) {
								zsmoke.position.y -= 1000;
								window.setTimeout(function(){WTW.disposeClean(zavatarname + '-smoke');},7000);
							}
							var zavatarparts = zavatarscale.getChildren();
							for (var i=0; i<zavatarparts.length;i++) {
								if (zavatarparts[i] != null) {
									try {
										WTW.highlightLayer.removeMesh(zavatarparts[i]);
									} catch(ex){}
								}
							} 
							window.clearInterval(ztimername);
							WTW.avatarLoadComplete(zavatarname);
						}
					}
				}
			},40);
		},300);
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-avatarShowGrowGlowSmoke=' + ex.message);
    }
}

WTWJS.prototype.avatarShowBeam = function(zavatarname, zavatarparts) {
	/* enter animation for an avatar - show within a beam */
	try {
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			var zmold = WTW.addMoldParticleShower(zavatarname + '-sprite', null, 1.5, 3, 1.5);
			zmold.parent = zavatar;
			zmold.position.y += 3;
		}
		for (var i=0; i<zavatarparts.length;i++) {
			if (zavatarparts[i] != null) {
				zavatarparts[i].isVisible = true;
				zavatarparts[i].visibility = 0;
			}
		}
		window.setTimeout(function() {
			var ztimername  = window.setInterval(function(){
				var zavatar = WTW.getMeshOrNodeByID(zavatarname);
				if (zavatar != null) {
					var zavatarscale = WTW.getMeshOrNodeByID(zavatarname + '-scale');
					if (zavatarscale != null) {
						var zavatarparts = zavatarscale.getChildren();
						var zdone = false;
						for (var i=0; i<zavatarparts.length;i++) {
							if (zavatarparts[i] != null) {
								var zmaxvisibility = 1;
								if ((WTW.isMobile || WTW.sizeX < WTW.sizeY) && zavatarname.indexOf('myavatar') > -1) {
									zmaxvisibility = .5;
								}
								if (zavatarparts[i].visibility < zmaxvisibility) {
									zavatarparts[i].visibility += .1;
								} else {
									zavatarparts[i].visibility = zmaxvisibility;
									zdone = true;
								}
							}
						} 
						if (zdone) {
							var zmold = WTW.getMeshOrNodeByID(zavatarname + '-sprite');
							if (zmold != null) {
								window.setTimeout(function(){
									if (zmold.WTW.particlesystem != undefined) {
										zmold.WTW.particlesystem.stop();
										zmold.WTW.particlesystem.reset();
										WTW.disposeClean(zavatarname + '-sprite');
									}
								},2000);
							}
							window.clearInterval(ztimername);
							WTW.avatarLoadComplete(zavatarname);
						}
					}
				}
			},50);
		},1500);
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-avatarShowBeam=' + ex.message);
    }
}

WTWJS.prototype.loadSit = function(zavatarname) {
	/* work in progress - sit command will move avatar to location, turn, and sit on designated mold */
	try {
		
    } catch (ex) {
		WTW.log('avatars-loadavatar-loadSit=' + ex.message);
    }
}

WTWJS.prototype.startSit = function(zmoldname) {
	/* work in progress - start sit move by walk to position */
	try {	
		var zavatarname = 'myavatar-' + dGet('wtw_tinstanceid').value;
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
			var zactionzonename = zmoldnameparts.parentname;
			var zactionzoneaxle = WTW.getMeshOrNodeByID(zactionzonename.replace('actionzoneaxlebase-','actionzoneaxle-'));
			if (zactionzoneaxle != null) {
				WTW.walkToPosition(zavatarname, null, zactionzoneaxle, false, 'WTW.setSit', zactionzoneaxle);
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-startSit=' + ex.message);
    }
}

WTWJS.prototype.setSit = function(zmoldtomatch) {
	/* work in progress - sit move */
	try {	
		/* walk to position, rotate then */
						
		WTW.keyPressedAdd('onsitwait');
		var zsitdist = 0;
		var zsitmove = window.setInterval(function() {
			avatar.translate(BABYLON.Axis.Z, .1, BABYLON.Space.LOCAL);
			if (zsitdist > 4.4) {
				window.clearInterval(zsitmove);
			} else {
				zsitdist += .1;
			}
		},10); 
					
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-setSit=' + ex.message);
    }
}

WTWJS.prototype.selectWalkToPosition = function(zavatarname, zmoldname, zrun) {
	/* select position, add click-to-move decal, and initiate walk to position */
	/* zrun = true uses run movement - false uses walk movements */
	try {
		var zclicktomove = WTW.getMeshOrNodeByID('clicktomove');
		if (zclicktomove != null) {
			zclicktomove.dispose();
		}
		if (WTW.placeHolder == 0) {
			/* only works if avatar is loaded */
			var zmold = WTW.getMeshOrNodeByID(zmoldname);
			var zpickinfo = scene.pick(WTW.mouseX, WTW.mouseY, function (zmesh) { return zmesh === zmold; });
			if (zpickinfo.hit) {
				var decalMaterial = new BABYLON.StandardMaterial("clicktomove-mat", scene);
				decalMaterial.diffuseTexture = new BABYLON.Texture("/content/system/images/target.png", scene);
				decalMaterial.diffuseTexture.hasAlpha = true;
				decalMaterial.zOffset = -2;			
				zclicktomove = BABYLON.MeshBuilder.CreateDecal("clicktomove", zmold, {position: zpickinfo.pickedPoint, normal: zpickinfo.getNormal(true), size: new BABYLON.Vector3(4, 4, 4)});
				zclicktomove.material = decalMaterial;			
				zclicktomove.renderingGroupId = 1;				
				WTW.walkToPosition('myavatar-' + dGet('wtw_tinstanceid').value, zpickinfo.pickedPoint, null, zrun, null, null);
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-selectWalkToPosition=' + ex.message);
    }
}
		
WTWJS.prototype.walkToPosition = function(zavatarname, zabspos, zmoldtomatch, zrun, zfunctionname, zparameters) {
	/* work in progress - force avatar to walk to a position and rotation */
	try {
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			if (zmoldtomatch != null) {
				zabspos = WTW.getWorldPosition(zmoldtomatch);
			}
			/* move avatar - onwalk */
			if (WTW.avatarTimer != null) {
				window.clearInterval(WTW.avatarTimer);
				WTW.avatarTimer = null;
			}
			var zolddist = 10000;
			WTW.avatarTimer = window.setInterval(function(){
				var zdx = (zabspos.x - zavatar.position.x);
				var zdz = (zabspos.z - zavatar.position.z);
				var zdist = Math.sqrt((zdx * zdx) + (zdz * zdz));
				/* get angles in degrees */
				var zavatarangle = WTW.getDegrees(zavatar.rotation.y);
				var zpointangle = WTW.getDegrees(-Math.atan2(zdz,zdx));
				var zleft = 0;
				var zright = 0;
				var zrotating = false;
				/* calculate degrees to turn left or right to see which is less */
				if (zpointangle < zavatarangle) {
					zleft = zavatarangle - zpointangle;
					zright = 360 - zavatarangle + zpointangle;
				} else {
					zleft = 360 - zpointangle + zavatarangle;
					zright = zpointangle - zavatarangle;
				}
				if (zdist > 1 && zolddist >= zdist) {
					/* has not reached destination */
					if (Math.round(zleft) < Math.round(zright)) {
						/* need to rotate left */
						if (Math.round(zleft) < 5) {
							/* close enough to jump to rotation */
							WTW.keyPressedRemove(1037); /* rotate left */
							WTW.keyPressedRemove(2037); /* rotate run left */
							if (zrun) {
								WTW.keyPressedAdd(2038); /* run forward */
							} else {
								WTW.keyPressedAdd(1038); /* forward */
							}
							zavatar.rotation.y = WTW.getRadians(WTW.getDegrees(zavatar.rotation.y) - zleft);
						} else {
							if (zleft > 35) {
								/* distance is great - stop forward motion so it rotates more */
								WTW.keyPressedRemove(1038); /* forward */
								WTW.keyPressedRemove(2038); /* run forward */
							} else {
								/* move forward */
								if (zrun) {
									WTW.keyPressedAdd(2038); /* run forward */
								} else {
									WTW.keyPressedAdd(1038); /* forward */
								}
							}
							/* rotate left */
							if (zrun) {
								WTW.keyPressedAdd(2037); /* rotate run left */
							} else {
								WTW.keyPressedAdd(1037); /* rotate left */
							}
						}
						zrotating = true;
					} else if (Math.round(zright) < Math.round(zleft)) {
						/* need to rotate right */
						if (Math.round(zright) < 5) {
							/* close enough to jump to rotation */
							WTW.keyPressedRemove(1039); /* rotate right */
							WTW.keyPressedRemove(2039); /* rotate run right */
							if (zrun) {
								WTW.keyPressedAdd(2038); /* run forward */
							} else {
								WTW.keyPressedAdd(1038); /* forward */
							}
							zavatar.rotation.y = WTW.getRadians(WTW.getDegrees(zavatar.rotation.y) + zright);
						} else {
							if (zright > 35) {
								/* distance is great - stop forward motion so it rotates more */
								WTW.keyPressedRemove(1038); /* forward */
								WTW.keyPressedRemove(2038); /* run forward */
							} else {
								/* move forward */
								if (zrun) {
									WTW.keyPressedAdd(2038); /* run forward */
								} else {
									WTW.keyPressedAdd(1038); /* forward */
								}
							}
							/* rotate right */
							if (zrun) {
								WTW.keyPressedAdd(2039); /* rotate run right */
							} else {
								WTW.keyPressedAdd(1039); /* rotate right */
							}
						}
						zrotating = true;
					} else {
						if (zrun) {
							WTW.keyPressedAdd(2038); /* run forward */
						} else {
							WTW.keyPressedAdd(1038); /* forward */
						}
					}
					if (zolddist != zdist || zrotating) {
						zolddist = zdist;
					} else {
						/* stop walking if avatar is not moving closer */
						WTW.cancelWalkToPosition();
					}
				} else {
					WTW.cancelWalkToPosition();
					/* move to final point */
					zavatar.position.x = zabspos.x;
					zavatar.position.z = zabspos.z;
					if (zfunctionname != '') {
						/* execute a function on arrival to point */
						WTW.executeFunctionByName(zfunctionname, window, zparameters);
					}
				}
			},10);
		}
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-walkToPosition=' + ex.message);
    }
}

WTWJS.prototype.cancelWalkToPosition = function() {
	/* cancel walk to position if a decal target exists */
	try {
		var zclicktomove = WTW.getMeshOrNodeByID('clicktomove');
		if (zclicktomove != null) {
			zclicktomove.dispose();
			if (WTW.avatarTimer != null) {
				window.clearInterval(WTW.avatarTimer);
				WTW.avatarTimer = null;
			}
		}
		/* stop all current movements */
		WTW.keyPressedRemove(1038); /* forward */
		WTW.keyPressedRemove(2038); /* run forward */
		WTW.keyPressedRemove(1039); /* rotate right */
		WTW.keyPressedRemove(2039); /* rotate run right */
		WTW.keyPressedRemove(1037); /* rotate left */
		WTW.keyPressedRemove(2037); /* rotate run left */
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-cancelWalkToPosition=' + ex.message);
    }
}

WTWJS.prototype.turnToRotation = function(zavatarname, zmoldtoface, zfunctionname, zparameters) {
	/* work in progress - force avatar to turn to a set rotation */
	try {
		var zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			var zabspos = WTW.getWorldPosition(zmoldtoface);
			var zangle = WTW.getMyAngleToPoint(zabspos.x, zabspos.z);
			
			if (WTW.avatarTimer != null) {
				window.clearInterval(WTW.avatarTimer);
				WTW.avatarTimer = null;
			}
			WTW.avatarTimer = window.setInterval(function(){
				var ztargetangle = WTW.getMyAngleToPoint(zabspos.x,zabspos.z);
				var zavatardeg = WTW.getDegrees(zavatar.rotation.y);
				var zdir = 1;
				var zdegleft = 0;
				if (Math.round(ztargetangle) == 0 || Math.round(ztargetangle) == 360) {
					zdir = 0;
				} else if (ztargetangle < 2) {
					zdir = -ztargetangle;
					zdegleft = ztargetangle;
				} else if (ztargetangle < 180) {
					zdir = -1;
					zdegleft = ztargetangle;
				} else {
					zdegleft = 360 - ztargetangle;
				}
				zavatardeg += zdir;
				zavatar.rotation.y = WTW.getRadians(zavatardeg);
				if (zdir > 1) {
					WTW.keyPressedAdd('onrunturnright');
				} else {
					WTW.keyPressedAdd('onrunturnleft');
				}
				if (zdegleft < 1) {
					window.clearInterval(WTW.avatarTimer);
					WTW.keyPressedRemove('onrunturnright');
					WTW.keyPressedRemove('onrunturnleft');
					WTW.executeFunctionByName(zfunctionname, window, zparameters);
				}
			},10);			
		}
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-turnToRotation=' + ex.message);
    }
}

WTWJS.prototype.cancelSit = function(zavatar, zmoveevents) {
	/* work in progress - cancel a sit move and restart onwait */
	try {
		if (WTW.isInMovementEvents(zmoveevents, 'onsitwait')) {
			WTW.keyPressedAdd('onwait');
			WTW.keyPressedRemove('onsitwait');
			var zdist = 0;
			var zsitmove = window.setInterval(function() {
				var zmovedist = -.1;
				if (zdist < .5) {
					zmovedist = -.5;
				}
				zavatar.translate(BABYLON.Axis.Z, zmovedist, BABYLON.Space.LOCAL);
				if (zdist < -4.4) {
					window.clearInterval(zsitmove);
					WTW.keyPressedRemove('onwait');
				} else {
					zdist += zmovedist;
				}
			},10);
		}
    } catch (ex) {
		WTW.log('core-scripts-avatars-wtw_transitionsavatars.js-cancelSit=' + ex.message);
    }
}

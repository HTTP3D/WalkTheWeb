/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

function WTW_READYPLAYERME() {
	/* Add your global variables as needed here */
	this.ver = '1.0.0';
	this.rpmAvatars = '0'; /* toggle off or on ReadyPlayerMe Avatars */
	this.rpmAnonymousAvatars = '0'; /* toggle off or on ReadyPlayerMe Anonymous Avatars */
	this.rpmWTWAccount = '1'; /* toggle off or on the WalkTheWeb Account for ReadyPlayerMe */
	this.rpmSubdomain = ''; /* set from the ReadyPlayerMe developer account settings */
	this.rpmApplicationId = ''; /* set from the ReadyPlayerMe developer account settings */
	this.rpmOrganizationId = ''; /* set from the ReadyPlayerMe developer account settings */
	this.rpmToken = '';  /* set from the ReadyPlayerMe authentication response */
	this.rpmAvatarId = ''; /* set from the ReadyPlayerMe avatar selection */
}

/* Create the class instance */
let wtwreadyplayerme = new WTW_READYPLAYERME();

WTW_READYPLAYERME.prototype.loadUserSettings = function() {
	/* get the user settings to be used in the 3d scene */
	try {
		var zrequest = {
			'settings': 'wtwreadyplayerme_enableavatars, wtwreadyplayerme_enableanonymous, wtwreadyplayerme_usewtwaccount, wtwreadyplayerme_subdomain, wtwreadyplayerme_applicationid, wtwreadyplayerme_organizationid, wtwreadyplayerme_token, wtwreadyplayerme_avatarid',
			'function':'getsettings'
		};
		WTW.postAsyncJSON('/core/handlers/uploads.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zsettings = JSON.parse(zresponse.settings);
				if (zsettings.wtwreadyplayerme_enableavatars != undefined) {
					if (zsettings.wtwreadyplayerme_enableavatars != '') {
						wtwreadyplayerme.rpmAvatars = zsettings.wtwreadyplayerme_enableavatars;
					}
				}
				if (zsettings.wtwreadyplayerme_enableanonymous != undefined) {
					if (zsettings.wtwreadyplayerme_enableanonymous != '') {
						wtwreadyplayerme.rpmAnonymousAvatars = zsettings.wtwreadyplayerme_enableanonymous;
					}
				}
				if (zsettings.wtwreadyplayerme_usewtwaccount != undefined) {
					if (zsettings.wtwreadyplayerme_usewtwaccount != '') {
						wtwreadyplayerme.rpmWTWAccount = zsettings.wtwreadyplayerme_usewtwaccount;
					}
				}
				if (zsettings.wtwreadyplayerme_subdomain != undefined) {
					if (zsettings.wtwreadyplayerme_subdomain != '') {
						wtwreadyplayerme.rpmSubdomain = zsettings.wtwreadyplayerme_subdomain;
					}
				}
				if (zsettings.wtwreadyplayerme_applicationid != undefined) {
					if (zsettings.wtwreadyplayerme_applicationid != '') {
						wtwreadyplayerme.rpmApplicationId = zsettings.wtwreadyplayerme_applicationid;
					}
				}
				if (zsettings.wtwreadyplayerme_organizationid != undefined) {
					if (zsettings.wtwreadyplayerme_organizationid != '') {
						wtwreadyplayerme.rpmOrganizationId = zsettings.wtwreadyplayerme_organizationid;
					}
				}
				if (zsettings.wtwreadyplayerme_token != undefined) {
					if (zsettings.wtwreadyplayerme_token != '') {
						wtwreadyplayerme.rpmToken = zsettings.wtwreadyplayerme_token;
					}
				}
				if (zsettings.wtwreadyplayerme_avatarid != undefined) {
					if (zsettings.wtwreadyplayerme_avatarid != '') {
						wtwreadyplayerme.rpmAvatarId = zsettings.wtwreadyplayerme_avatarid;
					}
				}
			}
		);
		
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-loadUserSettings=' + ex.message);
	}
}

WTW_READYPLAYERME.prototype.adminMenuItemSelected = function(zobj) {
	/* Admin only, when an admin menu item is selected */
	try {
		if (zobj != null) {
			if (zobj.id != undefined) {
				switch (zobj.id) { //wtw_readyplayermemenudiv
					case 'wtw_adminavatarreadyplayerme':
						WTW.disposeClean('avatarscale-0--0--babylonfile');
						WTW.disposeClean('editavatar-0');
						WTW.hide('wtw_readyplayermescalingdiv');
						WTW.hide('wtw_readyplayermeanimationsdiv');
						WTW.hideAdminMenu();
						WTW.show('wtw_adminavatarreadyplayermediv');
						WTW.show('wtw_readyplayermemenudiv');
						dGet('wtw_bbackwtw_adminavatarreadyplayermediv').onclick = function(){WTW.adminMenuItemSelected(dGet('wtw_bbackreadyplayerme'));};
						break;
					case 'wtw_adminrpmsettings':
						WTW.openFullPageForm('ReadyPlayerMe','General Settings');
						wtwreadyplayerme.loadLoginSettings(false);
						break;
					case 'wtw_adminrpmscaling':
						WTW.hideAdminMenu();
						WTW.hide('wtw_readyplayermemenudiv');
						WTW.show('wtw_adminavatarreadyplayermediv');
						WTW.hide('wtw_readyplayermeanimationsdiv');
						wtwreadyplayerme.openTestAvatar();
						wtwreadyplayerme.openAvatarScale();
						WTW.show('wtw_readyplayermescalingdiv');
						dGet('wtw_bbackwtw_adminavatarreadyplayermediv').onclick = function(){WTW.adminMenuItemSelected(dGet('wtw_adminavatarreadyplayerme'));};
						break;
					case 'wtw_adminrpmanimations':
						WTW.disposeClean('avatarscale-0--0--babylonfile');
						WTW.hideAdminMenu();
						WTW.hide('wtw_readyplayermemenudiv');
						WTW.hide('wtw_readyplayermescalingdiv');
						WTW.show('wtw_adminavatarreadyplayermediv');
						WTW.show('wtw_readyplayermeanimationsdiv');
						wtwreadyplayerme.openTestAvatar();
						wtwreadyplayerme.openEditAvatarAnimations();
						dGet('wtw_bbackwtw_adminavatarreadyplayermediv').onclick = function(){WTW.adminMenuItemSelected(dGet('wtw_adminavatarreadyplayerme'));};
						break;
					case 'wtw_bbackwtw_adminavatarreadyplayermediv':
					case 'wtw_bbackwtw_adminavatarreadyplayermediv':
					case 'wtw_bbackreadyplayerme':
					case 'wtw_cancelreadyplayerme':
						WTW.disposeClean('avatarscale-0--0--babylonfile');
						WTW.disposeClean('editavatar-0');
						WTW.hide('wtw_readyplayermemenudiv');
						WTW.hide('wtw_readyplayermescalingdiv');
						WTW.hide('wtw_readyplayermeanimationsdiv');
						WTW.hideAdminMenu();
						WTW.backToEdit();
						dGet('wtw_bbackwtw_adminavatarreadyplayermediv').onclick = function(){WTW.adminMenuItemSelected(dGet('wtw_bbackreadyplayerme'));};
						break;
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-adminMenuItemSelected=' + ex.message);
	} 
}

WTW_READYPLAYERME.prototype.openFullPageForm = function(zpageid, zsetcategory, zitem, zitemname, zitemnamepath, zpreviewname, zshow) {
	/* this function sets the form page title, sections, menu options, breadcrumbs, etc */
	try {
		/* select page to show */
		switch (zpageid) {
			case 'ReadyPlayerMe':
				dGet('wtw_fullpageformtitle').innerHTML = "<div class='wtw-toparrowtext'>" + WTW.__('ReadyPlayerMe') + "</div><img id='wtw_arrowicon1' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' /><div class='wtw-toparrowtext'>" + WTW.__(zsetcategory) + "</div>";
				WTW.show('wtw_fullpageplugins');
				WTW.show('wtw_readyplayermesettingspage');
				zshow = true;
				break;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-openFullPageForm=' + ex.message);
	}
	return zshow;
}



WTW_READYPLAYERME.prototype.loadLoginSettings = function(zloaddefault) {
	/* load additional login settings */
	try {
		var zrequest = {
			'settings': 'wtwreadyplayerme_enableavatars, wtwreadyplayerme_enableanonymous, wtwreadyplayerme_usewtwaccount, wtwreadyplayerme_subdomain, wtwreadyplayerme_applicationid, wtwreadyplayerme_organizationid, wtwreadyplayerme_token, wtwreadyplayerme_avatarid',
			'function':'getsettings'
		};
		WTW.postAsyncJSON('/core/handlers/uploads.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				wtwreadyplayerme.responseLoadLoginSettings(zresponse.settings);
			}
		);

		/* returns false so it will not call WTW.initializeAvatar() until after these settings are loaded */
		zloaddefault = false;
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-loadLoginSettings=' + ex.message);
	} 
	return zloaddefault;
}

WTW_READYPLAYERME.prototype.responseLoadLoginSettings = async function(zsettings) {
	/* performed after it loads the login settings - sets the plugin global variables */
	try {
		zsetting = JSON.parse(zsettings);
		if (zsetting.wtwreadyplayerme_enableavatars != undefined) {
			if (zsetting.wtwreadyplayerme_enableavatars != '') {
				wtwreadyplayerme.rpmAvatars = zsetting.wtwreadyplayerme_enableavatars;
			}
		}
		if (zsetting.wtwreadyplayerme_enableanonymous != undefined) {
			if (zsetting.wtwreadyplayerme_enableanonymous != '') {
				wtwreadyplayerme.rpmAnonymousAvatars = zsetting.wtwreadyplayerme_enableanonymous;
			}
		}
		if (zsetting.wtwreadyplayerme_usewtwaccount != undefined) {
			if (zsetting.wtwreadyplayerme_usewtwaccount != '') {
				wtwreadyplayerme.rpmWTWAccount = zsetting.wtwreadyplayerme_usewtwaccount;
			}
		}
		if (zsetting.wtwreadyplayerme_subdomain != undefined) {
			if (zsetting.wtwreadyplayerme_subdomain != '') {
				wtwreadyplayerme.rpmSubdomain = zsetting.wtwreadyplayerme_subdomain;
			}
		}
		if (zsetting.wtwreadyplayerme_applicationid != undefined) {
			if (zsetting.wtwreadyplayerme_applicationid != '') {
				wtwreadyplayerme.rpmApplicationId = zsetting.wtwreadyplayerme_applicationid;
			}
		}
		if (zsetting.wtwreadyplayerme_organizationid != undefined) {
			if (zsetting.wtwreadyplayerme_organizationid != '') {
				wtwreadyplayerme.rpmOrganizationId = zsetting.wtwreadyplayerme_organizationid;
			}
		}
		if (zsetting.wtwreadyplayerme_token != undefined) {
			if (zsetting.wtwreadyplayerme_token != '') {
				wtwreadyplayerme.rpmToken = zsetting.wtwreadyplayerme_token;
			}
		}
		if (zsetting.wtwreadyplayerme_avatarid != undefined) {
			if (zsetting.wtwreadyplayerme_avatarid != '') {
				wtwreadyplayerme.rpmAvatarId = zsetting.wtwreadyplayerme_avatarid;
			}
		}
		wtwreadyplayerme.setControlPanelSwitches();
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-responseLoadLoginSettings=' + ex.message);
	} 
}

WTW_READYPLAYERME.prototype.setControlPanelSwitches = function() {
	/* set admin menu switches for RPM settings */
	try {
		if (WTW.adminView == 1) {
			if (dGet('wtwreadyplayerme_enableavatars') != null) {
				if (wtwreadyplayerme.rpmAvatars == '1') {
					dGet('wtwreadyplayerme_enableavatarstext').className = 'wtw-enablelabel';
					dGet('wtwreadyplayerme_enableavatarstext').innerHTML = 'ReadyPlayerMe Avatars Enabled';
					dGet('wtwreadyplayerme_enableavatars').checked = true;
				} else {
					dGet('wtwreadyplayerme_enableavatarstext').className = 'wtw-disabledlabel';
					dGet('wtwreadyplayerme_enableavatarstext').innerHTML = 'ReadyPlayerMe Avatars Disabled';
					dGet('wtwreadyplayerme_enableavatars').checked = false;
				}
				if (wtwreadyplayerme.rpmAnonymousAvatars == '1') {
					dGet('wtwreadyplayerme_enableanonymoustext').className = 'wtw-enablelabel';
					dGet('wtwreadyplayerme_enableanonymoustext').innerHTML = 'Anonymous ReadyPlayerMe Avatars Enabled';
					dGet('wtwreadyplayerme_enableanonymous').checked = true;
				} else {
					dGet('wtwreadyplayerme_enableanonymoustext').className = 'wtw-disabledlabel';
					dGet('wtwreadyplayerme_enableanonymoustext').innerHTML = 'Anonymous ReadyPlayerMe Avatars Disabled';
					dGet('wtwreadyplayerme_enableanonymous').checked = false;
				}
				if (wtwreadyplayerme.rpmWTWAccount == '1') {
					dGet('wtwreadyplayerme_usewtwaccounttext').className = 'wtw-enablelabel';
					dGet('wtwreadyplayerme_usewtwaccounttext').innerHTML = 'Default ReadyPlayerMe Account Enabled';
					dGet('wtwreadyplayerme_usewtwaccount').checked = true;
					WTW.hide('wtwreadyplayerme_accountdiv');
				} else {
					dGet('wtwreadyplayerme_usewtwaccounttext').className = 'wtw-disabledlabel';
					dGet('wtwreadyplayerme_usewtwaccounttext').innerHTML = 'Default ReadyPlayerMe Account Disabled';
					dGet('wtwreadyplayerme_usewtwaccount').checked = false;
					WTW.show('wtwreadyplayerme_accountdiv');
				}
				dGet('wtwreadyplayerme_subdomain').value = wtwreadyplayerme.rpmSubdomain;
				dGet('wtwreadyplayerme_applicationid').value = wtwreadyplayerme.rpmApplicationId;
				dGet('wtwreadyplayerme_organizationid').value = wtwreadyplayerme.rpmOrganizationId;
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-setControlPanelSwitches=' + ex.message);
	} 
}

WTW_READYPLAYERME.prototype.changeSwitch = function(zobj) {
	/* toggle admin multiplayer options menu switches */
	try {
		let zchecked = '0';
		if (zobj.checked) {
			zchecked = '1';
		}
		switch (zobj.id) {
			case 'wtwreadyplayerme_enableavatars':
				wtwreadyplayerme.rpmAvatars = zchecked;
				break;
			case 'wtwreadyplayerme_enableanonymous':
				wtwreadyplayerme.rpmAnonymousAvatars = zchecked;
				break;
			case 'wtwreadyplayerme_usewtwaccount':
				wtwreadyplayerme.rpmWTWAccount = zchecked;
				break;
			case 'wtwreadyplayerme_subdomain':
				wtwreadyplayerme.rpmSubdomain = dGet('wtwreadyplayerme_subdomain').value;
				break;
			case 'wtwreadyplayerme_applicationid':
				wtwreadyplayerme.rpmApplicationId = dGet('wtwreadyplayerme_applicationid').value;
				break;
			case 'wtwreadyplayerme_organizationid':
				wtwreadyplayerme.rpmOrganizationId = dGet('wtwreadyplayerme_organizationid').value;
				break;
		}
		wtwreadyplayerme.setControlPanelSwitches();
		let zsettings = {
			'wtwreadyplayerme_enableavatars': wtwreadyplayerme.rpmAvatars,
			'wtwreadyplayerme_enableanonymous': wtwreadyplayerme.rpmAnonymousAvatars,
			'wtwreadyplayerme_usewtwaccount': wtwreadyplayerme.rpmWTWAccount,
			'wtwreadyplayerme_subdomain': wtwreadyplayerme.rpmSubdomain,
			'wtwreadyplayerme_applicationid': wtwreadyplayerme.rpmApplicationId,
			'wtwreadyplayerme_organizationid': wtwreadyplayerme.rpmOrganizationId
		};
		WTW.saveSettings(zsettings, null);		
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-changeSwitch=' + ex.message);
	} 
}

WTW_READYPLAYERME.prototype.openTestAvatar = function() {
	try {
		WTW.myAvatar.position = new BABYLON.Vector3(35, 0, -10);
		WTW.myAvatar.rotation.y = WTW.getRadians(180);
		
		wtwreadyplayerme.getSettings('wtwrpm_positionx, wtwrpm_positiony, wtwrpm_positionz, wtwrpm_rotationx, wtwrpm_rotationy, wtwrpm_rotationz, wtwrpm_scalingx, wtwrpm_scalingy, wtwrpm_scalingz');
		
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-openTestAvatar=' + ex.message);
	}
}

WTW_READYPLAYERME.prototype.getSettings = async function(zsettings) {
	/* get a set of settings from the database by names */
	try {
		var zrequest = {
			'settings': zsettings,
			'function':'getsettings'
		};
		WTW.postAsyncJSON('/core/handlers/uploads.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				wtwreadyplayerme.loadAvatarSettings(zresponse.settings);
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-getSettings=' + ex.message);
	}
}

WTW_READYPLAYERME.prototype.loadAvatarSettings = async function(zsettings) {
	/* performed after it loads the avatar settings */
	try {
		zsetting = JSON.parse(zsettings);
		var zpositionx = 0;
		var zpositiony = 0;
		var zpositionz = 0;
		var zrotationx = 0;
		var zrotationy = -90;
		var zrotationz = 0;
		var zscalingx = 8;
		var zscalingy = 8;
		var zscalingz = 8;
		
		if (zsetting.wtwrpm_positionx != undefined) {
			if (zsetting.wtwrpm_positionx != '') {
				zpositionx = zsetting.wtwrpm_positionx;
			}
		}
		if (zsetting.wtwrpm_positiony != undefined) {
			if (zsetting.wtwrpm_positiony != '') {
				zpositiony = zsetting.wtwrpm_positiony;
			}
		}
		if (zsetting.wtwrpm_positionz != undefined) {
			if (zsetting.wtwrpm_positionz != '') {
				zpositionz = zsetting.wtwrpm_positionz;
			}
		}
		if (zsetting.wtwrpm_rotationx != undefined) {
			if (zsetting.wtwrpm_rotationx != '') {
				zrotationx = zsetting.wtwrpm_rotationx;
			}
		}
		if (zsetting.wtwrpm_rotationy != undefined) {
			if (zsetting.wtwrpm_rotationy != '') {
				zrotationy = zsetting.wtwrpm_rotationy;
			}
		}
		if (zsetting.wtwrpm_rotationz != undefined) {
			if (zsetting.wtwrpm_rotationz != '') {
				zrotationz = zsetting.wtwrpm_rotationz;
			}
		}
		if (zsetting.wtwrpm_scalingx != undefined) {
			if (zsetting.wtwrpm_scalingx != '') {
				zscalingx = zsetting.wtwrpm_scalingx;
			}
		}
		if (zsetting.wtwrpm_scalingy != undefined) {
			if (zsetting.wtwrpm_scalingy != '') {
				zscalingy = zsetting.wtwrpm_scalingy;
			}
		}
		if (zsetting.wtwrpm_scalingz != undefined) {
			if (zsetting.wtwrpm_scalingz != '') {
				zscalingz = zsetting.wtwrpm_scalingz;
			}
		}

		if (dGet('wtwrpm_tavatarpositionx') != undefined) {
			dGet('wtwrpm_tavatarpositionx').value = WTW.formatNumber(zpositionx,2);
			dGet('wtwrpm_tavatarpositiony').value = WTW.formatNumber(zpositiony,2);
			dGet('wtwrpm_tavatarpositionz').value = WTW.formatNumber(zpositionz,2);
		}
		if (dGet('wtwrpm_tavatarscalingx') != undefined) {
			dGet('wtwrpm_tavatarscalingx').value = WTW.formatNumber(zscalingx,2);
			dGet('wtwrpm_tavatarscalingy').value = WTW.formatNumber(zscalingy,2);
			dGet('wtwrpm_tavatarscalingz').value = WTW.formatNumber(zscalingz,2);
		}
		if (dGet('wtwrpm_tavatarrotationx') != undefined) {
			dGet('wtwrpm_tavatarrotationx').value = WTW.formatNumber(zrotationx,2);
			dGet('wtwrpm_tavatarrotationy').value = WTW.formatNumber(zrotationy,2);
			dGet('wtwrpm_tavatarrotationz').value = WTW.formatNumber(zrotationz,2);
		}

		/* get default avatar definition and set name, instance, and position */
		var zavatardef = {
			"position":{"x":zpositionx,"y":zpositiony,"z":zpositionz},
			"scaling":{"x":zscalingx,"y":zscalingy,"z":zscalingz},
			"rotation":{"x":zrotationx,"y":zrotationy,"z":zrotationz},
			"graphics":{
				"waterreflection":"1",
				"receiveshadows":"0",
				"castshadows":"1"
			},
			"objects":{
				"folder":"/content/plugins/wtw-readyplayerme/assets/fullbody/",
				"file":"testavatar.glb",
				"startframe":"0",
				"endframe":"0"
			},
			"sounds":{"voice":null},
			"start":{"position":{"x":0,"y":0.57,"z":0},"rotation":{"x":0,"y":0,"z":0}},
			"snapshots":{"full":"","thumbnail":""},
			"share":{"templatename":"","description":"","tags":""},
			"avatarparts":[
				{"avatarpartid":"hbbz70sy0zr1quzu","avatarpart":"EyeLeft","diffusecolor":"#ffffff","specularcolor":"#000000","emissivecolor":"#000000","ambientcolor":"#ffffff"},
				{"avatarpartid":"ia0c3ut311bgkhh2","avatarpart":"EyeRight","diffusecolor":"#ffffff","specularcolor":"#000000","emissivecolor":"#000000","ambientcolor":"#ffffff"},
				{"avatarpartid":"7r73rlbx2e3w6rr8","avatarpart":"Wolf3D_Body","diffusecolor":"#ffffff","specularcolor":"#000000","emissivecolor":"#000000","ambientcolor":"#ffffff"},
				{"avatarpartid":"84va8vtbtbq3l02m","avatarpart":"Wolf3D_Glasses","diffusecolor":"#ffffff","specularcolor":"#000000","emissivecolor":"#000000","ambientcolor":"#ffffff"},
				{"avatarpartid":"et1i01tvoxgt5i0v","avatarpart":"Wolf3D_Hair","diffusecolor":"#ffffff","specularcolor":"#000000","emissivecolor":"#000000","ambientcolor":"#ffffff"},
				{"avatarpartid":"5h6gurja9gle3owh","avatarpart":"Wolf3D_Head","diffusecolor":"#ffffff","specularcolor":"#000000","emissivecolor":"#000000","ambientcolor":"#ffffff"},
				{"avatarpartid":"lb5g9uqosw1zoc6m","avatarpart":"Wolf3D_Outfit_Bottom","diffusecolor":"#ffffff","specularcolor":"#000000","emissivecolor":"#000000","ambientcolor":"#ffffff"},
				{"avatarpartid":"oxgaobfzyn7nwivj","avatarpart":"Wolf3D_Outfit_Footwear","diffusecolor":"#ffffff","specularcolor":"#000000","emissivecolor":"#000000","ambientcolor":"#ffffff"},
				{"avatarpartid":"mr0z6wk1x6qpa3sk","avatarpart":"Wolf3D_Outfit_Top","diffusecolor":"#ffffff","specularcolor":"#000000","emissivecolor":"#000000","ambientcolor":"#ffffff"},
				{"avatarpartid":"70wwvvz8dhvajhlu","avatarpart":"Wolf3D_Teeth","diffusecolor":"#ffffff","specularcolor":"#000000","emissivecolor":"#000000","ambientcolor":"#ffffff"},
				{"avatarpartid":"x9euvntx591jz34a","avatarpart":"__root__","diffusecolor":"#ffffff","specularcolor":"#000000","emissivecolor":"#000000","ambientcolor":"#ffffff"}
			],
			"avataranimationdefs":[
				{"animationind":-1,
				"useravataranimationid":"",
				"avataranimationid":"8qz4ohoyrmxic5ho",
				"avatarid":"dq15u3k7k1l13mk1",
				"loadpriority":100,
				"animationevent":"onwait",
				"animationfriendlyname":"Wait",
				"animationicon":"",
				"objectfolder":"/content/plugins/wtw-readyplayerme/assets/fullbody/",
				"objectfile":"onwait.babylon",
				"startframe":"1",
				"endframe":"170",
				"animationloop":true,
				"defaultspeedratio":"1.00",
				"speedratio":"1.00",
				"startweight":"0",
				"onanimationend":null,
				"walkspeed":"1",
				"totalframes":"0",
				"totalstartframe":"0",
				"totalendframe":"0",
				"soundid":"",
				"soundpath":"",
				"soundmaxdistance":"100.00"}
			],
			"animations":[],
			"name":"editavatar-0",
			"globaluseravatarid":"",
			"useravatarid":"",
			"globalavatarid":"",
			"avatarid":"",
			"trackid":"",
			"instanceid":"0",
			"userid":"",
			"userip":"",
			"versionid":"",
			"version":"1.0.0",
			"versionorder":1000000,
			"versiondesc":"Initial Version",
			"anonymous":"1",
			"avatar":"default",
			"displayname":"",
			"defaultdisplayname":"",
			"avatardescription":"",
			"alttag":"",
			"privacy":"0",
			"enteranimation":"1",
			"enteranimationparameter":"",
			"exitanimation":"1",
			"exitanimationparameter":"",
			"walkspeed":"1",
			"walkanimationspeed":"1",
			"turnspeed":"1",
			"turnanimationspeed":"1",
			"shown":"0",
			"opacity":"1",
			"checkcollisions":"0",
			"ispickable":"1",
			"parentname":"local-connectinggrids-0---",
			"movetime":"",
			"moveevents":"",
			"updated":"",
			"ridealong":null,
			"lastupdate":false,
			"loaded":false,
			"blockedby":[],
			"bannedby":[],
			"fadetimer":null
		};
		
		WTW.addAvatarForEdit(zavatardef.name, zavatardef);

	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-loadAvatarSettings=' + ex.message);
	} 
}

WTW_READYPLAYERME.prototype.openAvatarScale = function() {
	try {
		var zmoldname = 'avatarscale-0--0--babylonfile';
		var zmolddef = WTW.newMold();
		zmolddef.moldname = zmoldname;
		zmolddef.shape = 'babylonfile';
		zmolddef.objects.folder = '/content/system/babylon/scale/';
		zmolddef.objects.file = 'scale.babylon';
		zmolddef.checkcollisions = '0';
		zmolddef.ispickable = '0';
		zmolddef.parentname = WTW.mainParent;
		var zmold = WTW.addMold(zmoldname, zmolddef, WTW.mainParent, 'none');
		zmold.rotation.y = WTW.getRadians(-90);
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-openAvatarScale=' + ex.message);
	}
}

WTW_READYPLAYERME.prototype.changeNumberValue = function(zitem, zdn, zrefresh) {
	/* when a number is changed in the forms, this automates the number counting as the button is held down */
	try {
		if (zrefresh == undefined) {
			zrefresh = 0;
		}
		WTW.changeStop();
		var zvali = dGet(zitem).value;
		var znvali = 0;
		var zndn = 0;
		if (WTW.isNumeric(zdn)) {
			ndni = parseFloat(zdn);
		}
		if (WTW.isNumeric(zvali)) {
			znvali = parseFloat(Math.round(Number(zvali) * 10000) / 10000) + ndni;
			dGet(zitem).value = (znvali.toFixed(2));
			wtwreadyplayerme.setNewAvatar();
		}
		WTW.mouseTimer = window.setInterval(function () {
			var zval = dGet(zitem).value;
			var znval = 0;
			zndn = 0;
			if (WTW.isNumeric(zdn)) {
				zndn = parseFloat(zdn);
			}
			if (WTW.isNumeric(zval)) {
				znval = parseFloat(Math.round(Number(zval) * 10000) / 10000) + zndn;
				dGet(zitem).value = (znval.toFixed(2));
				wtwreadyplayerme.setNewAvatar();
			}
		}, 100);
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-changeNumberValue=' + ex.message);
	}
}

WTW_READYPLAYERME.prototype.setNewAvatar = function() {
	/* Update Scene with Avatar Edit Changes */
	try {
		var editavatar = WTW.getMeshOrNodeByID('editavatar-0');
		if (editavatar != null) {
			var editavatarscale = WTW.getMeshOrNodeByID('editavatar-0-scale');
			if (editavatarscale != null) {
				/* adjust scaling */
				if (WTW.isNumeric(dGet('wtwrpm_tavatarscalingx').value)) {
					editavatarscale.scaling.x = Number(dGet('wtwrpm_tavatarscalingx').value);
				} else {
					editavatarscale.scaling.x = 8;
				}
				if (WTW.isNumeric(dGet('wtwrpm_tavatarscalingy').value)) {
					editavatarscale.scaling.y = Number(dGet('wtwrpm_tavatarscalingy').value);
				} else {
					editavatarscale.scaling.y = 8;
				}
				if (WTW.isNumeric(dGet('wtwrpm_tavatarscalingz').value)) {
					editavatarscale.scaling.z = Number(dGet('wtwrpm_tavatarscalingz').value);
				} else {
					editavatarscale.scaling.z = 8;
				}
				/* adjust rotation */
				if (WTW.isNumeric(dGet('wtwrpm_tavatarrotationx').value)) {
					editavatarscale.rotation.x = WTW.getRadians(Number(dGet('wtwrpm_tavatarrotationx').value));
				} else {
					editavatarscale.rotation.x = 0;
				}
				if (WTW.isNumeric(dGet('wtwrpm_tavatarrotationy').value)) {
					editavatarscale.rotation.y = WTW.getRadians(Number(dGet('wtwrpm_tavatarrotationy').value));
				} else {
					editavatarscale.rotation.y = 0;
				}
				if (WTW.isNumeric(dGet('wtwrpm_tavatarrotationz').value)) {
					editavatarscale.rotation.z = WTW.getRadians(Number(dGet('wtwrpm_tavatarrotationz').value));
				} else {
					editavatarscale.rotation.z = 0;
				}
				/* adjust position */
				if (WTW.isNumeric(dGet('wtwrpm_tavatarpositionx').value)) {
					editavatarscale.position.x = Number(dGet('wtwrpm_tavatarpositionx').value);
				} else {
					editavatarscale.position.x = 0;
				}
				if (WTW.isNumeric(dGet('wtwrpm_tavatarpositiony').value)) {
					editavatarscale.position.y = Number(dGet('wtwrpm_tavatarpositiony').value);
				} else {
					editavatarscale.position.y = 0;
				}
				if (WTW.isNumeric(dGet('wtwrpm_tavatarpositionz').value)) {
					editavatarscale.position.z = Number(dGet('wtwrpm_tavatarpositionz').value);
				} else {
					editavatarscale.position.z = 0;
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-setNewAvatar=' + ex.message);
	} 
}

WTW_READYPLAYERME.prototype.saveAvatarScaling = function() {
	/* Update Avatar Settings */
	try {
		WTW.disposeClean('avatarscale-0--0--babylonfile');
		WTW.disposeClean('editavatar-0');
		var zpositionx = 0;
		var zpositiony = 0;
		var zpositionz = 0;
		var zrotationx = 0;
		var zrotationy = -90;
		var zrotationz = 0;
		var zscalingx = 8;
		var zscalingy = 8;
		var zscalingz = 8;
		
		if (WTW.isNumeric(dGet('wtwrpm_tavatarpositionx').value)) {
			zpositionx = Number(dGet('wtwrpm_tavatarpositionx').value);
		}
		if (WTW.isNumeric(dGet('wtwrpm_tavatarpositiony').value)) {
			zpositiony = Number(dGet('wtwrpm_tavatarpositiony').value);
		}
		if (WTW.isNumeric(dGet('wtwrpm_tavatarpositionz').value)) {
			zpositionz = Number(dGet('wtwrpm_tavatarpositionz').value);
		}		
		if (WTW.isNumeric(dGet('wtwrpm_tavatarrotationx').value)) {
			zrotationx = Number(dGet('wtwrpm_tavatarrotationx').value);
		}
		if (WTW.isNumeric(dGet('wtwrpm_tavatarrotationy').value)) {
			zrotationy = Number(dGet('wtwrpm_tavatarrotationy').value);
		}
		if (WTW.isNumeric(dGet('wtwrpm_tavatarrotationz').value)) {
			zrotationz = Number(dGet('wtwrpm_tavatarrotationz').value);
		}
		if (WTW.isNumeric(dGet('wtwrpm_tavatarscalingx').value)) {
			zscalingx = Number(dGet('wtwrpm_tavatarscalingx').value);
		}
		if (WTW.isNumeric(dGet('wtwrpm_tavatarscalingy').value)) {
			zscalingy = Number(dGet('wtwrpm_tavatarscalingy').value);
		}
		if (WTW.isNumeric(dGet('wtwrpm_tavatarscalingz').value)) {
			zscalingz = Number(dGet('wtwrpm_tavatarscalingz').value);
		}
		
		var zsettings = {
			'wtwrpm_positionx':zpositionx, 
			'wtwrpm_positiony':zpositiony, 
			'wtwrpm_positionz':zpositionz, 
			'wtwrpm_rotationx':zrotationx, 
			'wtwrpm_rotationy':zrotationy, 
			'wtwrpm_rotationz':zrotationz, 
			'wtwrpm_scalingx':zscalingx, 
			'wtwrpm_scalingy':zscalingy, 
			'wtwrpm_scalingz':zscalingz
		}

		var zrequest = {
			'settings': JSON.stringify(zsettings),
			'function':'savesettings'
		};
		WTW.postAsyncJSON('/core/handlers/uploads.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
			}
		);
		WTW.hide('wtw_readyplayermeanimationsdiv');
		WTW.hide('wtw_readyplayermescalingdiv');
		WTW.hideAdminMenu();
		WTW.show('wtw_adminavatarreadyplayermediv');
		WTW.show('wtw_readyplayermemenudiv');
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-saveAvatarScaling=' + ex.message);
	} 
}

WTW_READYPLAYERME.prototype.openEditAvatarAnimations = function(zselectedanimation) {
	/* open the 3D Avatar Animations for Edit */
	try {
		if (zselectedanimation == undefined) {
			zselectedanimation = '';
		}
		dGet('wtwrpm_avataranimationslist').innerHTML = '';
		WTW.getAsyncJSON('/connect/wtw-readyplayerme-avataranimations.php', 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					var zselectedavataranimationid = '';
					var zavataranimationslist = '';

					if (zresponse != undefined) {
						for (var i=0;i < zresponse.length;i++) {
							if (zresponse[i] != null) {
								var zavataranimation = zresponse[i];
								if (zselectedanimation.toLowerCase() == zavataranimation.animationevent.toLowerCase()) {
									zselectedavataranimationid = zavataranimation.avataranimationid;
								}
								zavataranimationslist += "<div id='wtwrpm_beditavataranim-" + zavataranimation.avataranimationid + "' onclick=\"wtwreadyplayerme.openEditAvatarAnimation('" + zavataranimation.avataranimationid + "');\" class='wtw-menulevel2'>" + zavataranimation.animationevent;
								if (zavataranimation.animationevent == 'onoption') {
									zavataranimationslist += " - " + zavataranimation.animationfriendlyname;
								}
								zavataranimationslist += "</div>\r\n";
								zavataranimationslist += "<div id='wtwrpm_beditavataranimdiv-" + zavataranimation.avataranimationid + "' class='wtwrpm-animlist' style='display:none;visibility:hidden;'>\r\n";

								zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
								zavataranimationslist += "<div class='wtwrpm-animlistitem'>Friendly Name<br /><input type='text' id='wtwrpm_tavataranimfriendlyname-" + zavataranimation.avataranimationid + "' maxlength='255' class='wtwrpm-animlistvalue wtw-smallprintinput' value=\"" + zavataranimation.animationfriendlyname + "\" onfocus='' onblur='' style='width:250px;max-width:250px;' /></div>\r\n";

								zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
								zavataranimationslist += "<div class='wtwrpm-animlistitem'>Folder<br /><input type='text' id='wtwrpm_tavataranimobjectfolder-" + zavataranimation.avataranimationid + "' maxlength='255' class='wtw-smallprintinput' value='" + zavataranimation.objectfolder + "' onfocus='' onblur='' style='width:250px;max-width:250px;' /></div>\r\n";

								zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
								zavataranimationslist += "<div class='wtwrpm-animlistitem'>Main Animation File<br />";
								zavataranimationslist += "<input type='hidden' id='wtwrpm_tavataranimobjectfiledefault-" + zavataranimation.avataranimationid + "' value='" + zavataranimation.objectfile + "' />";
								zavataranimationslist += "<div class='wtw-yellowbuttonright' onclick=\"dGet('wtwrpm_avatarfilesupload2').click();\">Add</div>";
								zavataranimationslist += "<select id='wtwrpm_tavataranimobjectfile-" + zavataranimation.avataranimationid + "' class='wtw-smallprintinput'></select></div>\r\n";

								if (zavataranimation.animationevent != 'onwait') {
									/* onwait plays when other animations are not being tested - so there is no need for the test button */
									zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
									zavataranimationslist += "<br /><div id='wtwrpm_adminavatartestanimation-" + zavataranimation.avataranimationid + "' class='wtw-greenbutton' onmousedown=\"WTW.testAnimation('" + zavataranimation.avataranimationid + "', '" + zavataranimation.animationevent + "');\" onmouseup=\"WTW.testAnimationStop('" + zavataranimation.avataranimationid + "', '" + zavataranimation.animationevent + "');\" style='font-size:1.4em;'>test Animation</div>\r\n";
								}
								
								zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
								zavataranimationslist += "<div class='wtwrpm-animlistitem'>Animation Icon (optional)<br /><input type='text' id='wtwrpm_tavataranimanimationicon-" + zavataranimation.avataranimationid + "' maxlength='255' class='wtw-smallprintinput' value='" + zavataranimation.animationicon + "' onfocus='' onblur='' style='width:250px;max-width:250px;' /></div>\r\n";

								zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
								zavataranimationslist += "<div class='wtwrpm-animlistitem'><input type='text' id='wtwrpm_tavataranimstartframe-" + zavataranimation.avataranimationid + "' maxlength='10' class='wtwrpm-animlistvalue wtw-smallprintinput' value='" + zavataranimation.startframe + "' onfocus='' onblur='' />Start Frame</div>\r\n";

								zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
								zavataranimationslist += "<div class='wtwrpm-animlistitem'><input type='text' id='wtwrpm_tavataranimendframe-" + zavataranimation.avataranimationid + "' maxlength='10' class='wtwrpm-animlistvalue wtw-smallprintinput' value='" + zavataranimation.endframe + "' onfocus='' onblur='' />End Frame</div>\r\n";

								zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
								zavataranimationslist += "<div class='wtwrpm-animlistitem'><input type='text' id='wtwrpm_tavataranimspeedratio-" + zavataranimation.avataranimationid + "' maxlength='10' class='wtwrpm-animlistvalue wtw-smallprintinput' value='" + zavataranimation.speedratio + "' onfocus='' onblur='' />Speed Ratio</div>\r\n";

								zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
								zavataranimationslist += "<input type='hidden' id='wtwrpm_tavataranimevent-" + zavataranimation.avataranimationid + "'  value='" + zavataranimation.animationevent + "'/>\r\n";

								zavataranimationslist += "<input type='hidden' id='wtwrpm_tavataranimloadpriority-" + zavataranimation.avataranimationid + "'  value='" + zavataranimation.loadpriority + "'/>\r\n";
								zavataranimationslist += "<div class='wtw-clear'></div>\r\n";

								zavataranimationslist += "<div id='wtwrpm_adminavatardeleteanimation-" + zavataranimation.avataranimationid + "' class='wtw-redbuttonleft' onclick=\"wtwreadyplayerme.deleteAvatarAnimationDefinition('" + zavataranimation.avataranimationid + "');\" style='font-size:1.4em;'>Delete</div>\r\n";
								zavataranimationslist += "<div id='wtwrpm_adminavatarsaveanimation-" + zavataranimation.avataranimationid + "' class='wtw-greenbuttonright' onclick=\"wtwreadyplayerme.saveAvatarAnimationDefinition('" + zavataranimation.avataranimationid + "');\" style='font-size:1.4em;'>Save</div>\r\n";
								zavataranimationslist += "<div class='wtw-yellowbuttonright' onclick=\"wtwreadyplayerme.openEditAvatarAnimation('" + zavataranimation.avataranimationid + "');\" style='font-size:1.4em;'>Cancel</div>";
								zavataranimationslist += "<div class='wtw-clear'></div>\r\n";

								zavataranimationslist += "</div>\r\n";
							}
						}

						zavataranimationslist += "<div id='wtwrpm_beditavataranim' class='wtwrpm-animlist' style='display:none;visibility:hidden;' >\r\n";

						zavataranimationslist += "<h2 style='text-align:center;'>Add New Animation</h2>\r\n";
						zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
						zavataranimationslist += "<div class='wtwrpm-animlistitem'>Animation Event<br /><select id='wtwrpm_tavataranimevent' class='wtw-smallprintinput'></select></div>\r\n";

						zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
						zavataranimationslist += "<div class='wtwrpm-animlistitem'>Friendly Name<br /><input type='text' id='wtwrpm_tavataranimfriendlyname' maxlength='255' class='wtw-smallprintinput' style='width:250px;max-width:250px;' /></div>\r\n";

						zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
						zavataranimationslist += "<div class='wtwrpm-animlistitem'>Folder<br /><input type='text' id='wtwrpm_tavataranimobjectfolder' maxlength='255' class='wtw-smallprintinput' style='width:250px;max-width:250px;' /></div>\r\n";

						zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
						zavataranimationslist += "<div class='wtwrpm-animlistitem'>Main Animation File<br />";
						zavataranimationslist += "<div class='wtw-yellowbuttonright' onclick=\"dGet('wtwrpm_avatarfilesupload2').click();\">Add</div>";
						zavataranimationslist += "<select id='wtwrpm_tavataranimobjectfile' class='wtw-smallprintinput'></select></div>\r\n";

						zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
						zavataranimationslist += "<div class='wtwrpm-animlistitem'>Animation Icon (optional)<br /><input type='text' id='wtwrpm_tavataranimanimationicon' maxlength='255' class='wtw-smallprintinput' style='width:250px;max-width:250px;' /></div>\r\n";

						zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
						zavataranimationslist += "<div class='wtwrpm-animlistitem'><input type='text' id='wtwrpm_tavataranimstartframe' maxlength='10' class='wtwrpm-animlistvalue wtw-smallprintinput' />Start Frame</div>\r\n";

						zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
						zavataranimationslist += "<div class='wtwrpm-animlistitem'><input type='text' id='wtwrpm_tavataranimendframe' maxlength='10' class='wtwrpm-animlistvalue wtw-smallprintinput' />End Frame</div>\r\n";

						zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
						zavataranimationslist += "<div class='wtwrpm-animlistitem'><input type='text' id='wtwrpm_tavataranimspeedratio' maxlength='10' class='wtwrpm-animlistvalue wtw-smallprintinput' />Speed Ratio</div>\r\n";

						zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
						zavataranimationslist += "<br /><div id='wtwrpm_adminavatarsaveanimations' class='wtw-greenbuttonbig' onclick='wtwreadyplayerme.saveAvatarAnimationDefinition();'>Save New Animation</div><br />\r\n";
						zavataranimationslist += "<div style='text-align:center;'><div class='wtw-yellowbutton' onclick='wtwreadyplayerme.cancelAddNewAnimation();' >Cancel</div></div>";
						zavataranimationslist += "</div>\r\n";
						
						zavataranimationslist += "<br /><div class='wtw-yellow' style='font-weight:bold;'>Total Animations: " + zresponse.length + "</div><br />\r\n";
						zavataranimationslist += "<br /><div id='wtwrpm_adminavataraddnewanimation' class='wtw-greenbuttonbig' onclick='wtwreadyplayerme.addNewAvatarAnimation();'>Add New Animation</div>\r\n";
					}
					dGet('wtwrpm_avataranimationslist').innerHTML = zavataranimationslist;
					WTW.show('wtwrpm_adminEditAvatarAnimationsDiv');
					if (zselectedavataranimationid != '') {
						wtwreadyplayerme.openEditAvatarAnimation(zselectedavataranimationid);
					}
				}
			}
		);		
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-openEditAvatarAnimations=' + ex.message);
	} 
}

WTW_READYPLAYERME.prototype.addNewAvatarAnimation = function() {
	/* open add new Avatar Animation form */
	try {
		dGet('wtwrpm_tavataranimationid').value = '';
		dGet('wtwrpm_tavataranimfriendlyname').value = '';
		dGet('wtwrpm_tavataranimanimationicon').value = '';
		dGet('wtwrpm_tavataranimstartframe').value = '1';
		dGet('wtwrpm_tavataranimendframe').value = '1';
		dGet('wtwrpm_tavataranimspeedratio').value = '1.00';
		wtwreadyplayerme.loadAvatarAnimationEvents('wtwrpm_tavataranimevent','');
		WTW.getFileList('/content/plugins/wtw-readyplayerme/assets/fullbody/', wtwreadyplayerme.loadAvatarFilesDDL);
		WTW.hide('wtwrpm_adminavataraddnewanimation');
		WTW.hide('wtwrpm_cancelavataranimationsform');
		WTW.show('wtwrpm_beditavataranim');
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-addNewAvatarAnimation=' + ex.message);
	} 
}

WTW_READYPLAYERME.prototype.loadAvatarAnimationEvents = function(zddlid, zdefault) {
	/* load Avatar Animation events to a dropdown list */
	try {
		if (zdefault == undefined) {
			zdefault = '';
		}
		WTW.clearDDL(zddlid);
		var zrequest = {
			'function':'getavataranimationevents'
		};
		WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				if (zresponse.animationevents != null) {
					for (var i=0;i < zresponse.animationevents.length;i++) {
						if (zresponse.animationevents[i] != null) {
							/* see if event is already listed */
							var zfoundevent = false;
							/* you can have more than one onoption animation loaded */
							if (zresponse.animationevents[i].animationevent != 'onoption') {
								var zanimlist = document.getElementsByClassName('wtwrpm-animlist');
								for (var j=0;j < zanimlist.length;j++) {
									if (zanimlist[j] != null) {
										try {
											var zanimid = zanimlist[j].id.split('-')[1];
											if (dGet('wtwrpm_beditavataranim-' + zanimid) != null) {
												var zanimevent = dGet('wtwrpm_beditavataranim-' + zanimid).innerHTML;
												if (zanimevent == zresponse.animationevents[i].animationevent) {
													zfoundevent = true;
												}
											}
										} catch (ex) {}
									}
								}
							}
							if (!zfoundevent) {
								var zoption = document.createElement('option');
								zoption.text = zresponse.animationevents[i].animationevent;
								zoption.value = zresponse.animationevents[i].animationeventid + '|' + zresponse.animationevents[i].loadpriority;
								if (zresponse.animationevents[i].animationevent == zdefault) {
									zoption.selected = true;
								}
								dGet(zddlid).add(zoption);
							}
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('wtw-readyplayerme:scripts-class_main.js-loadAvatarAnimationEvents=' + ex.message);
	} 
}

WTW_READYPLAYERME.prototype.cancelAddNewAnimation = function() {
	/* cancel and close add new Avatar Animation form */
	try {
		WTW.hide('wtwrpm_beditavataranim');
		WTW.show('wtwrpm_adminavataraddnewanimation');
		WTW.showInline('wtwrpm_cancelavataranimationsform');
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-cancelAddNewAnimation=' + ex.message);
	} 
}

WTW_READYPLAYERME.prototype.openEditAvatarAnimation = function(zanimationid) {
	/* open Avatar Animation div for edit */
	try {
		if (dGet('wtwrpm_beditavataranimdiv-' + zanimationid).style.display != 'none') {
			WTW.hide('wtwrpm_beditavataranimdiv-' + zanimationid);
			WTW.show('wtwrpm_adminavataraddnewanimation');
		} else {
			var zanimlist = document.getElementsByClassName('wtwrpm-animlist');
			for (var i=0;i < zanimlist.length;i++) {
				WTW.hide(zanimlist[i].id);
			}
			WTW.hide('wtwrpm_adminavataraddnewanimation');
			dGet('wtwrpm_tavataranimationid').value = zanimationid;
			WTW.getFileList('/content/plugins/wtw-readyplayerme/assets/fullbody/', wtwreadyplayerme.loadAvatarFilesDDL);
			WTW.show('wtwrpm_beditavataranimdiv-' + zanimationid);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-openEditAvatarAnimation=' + ex.message);
	} 
}

WTW_READYPLAYERME.prototype.saveAvatarAnimationDefinition = function(zavataranimationid) {
	/* save Avatar Animation definition */
	try {
		var zddlvalue = '';
		var zanimationevent = '';
		var zloadpriority = 0;
		var zanimationfriendlyname = '';
		var zanimationicon = '';
		var zobjectfolder = dGet('wtwrpm_tavatarfolder').value + dGet('wtwrpm_tavatarsubfolder').value;
		var zobjectfile = '';
		var zstartframe = '1';
		var zendframe = '1';
		var zspeedratio = '1';
		if (zavataranimationid == undefined) {
			zavataranimationid = WTW.getRandomString(16,1);
			zddlvalue = WTW.getDDLValue('wtwrpm_tavataranimevent');
			zanimationevent = WTW.getDDLText('wtwrpm_tavataranimevent');
			zanimationfriendlyname = dGet('wtwrpm_tavataranimfriendlyname').value;
			zanimationicon = dGet('wtwrpm_tavataranimanimationicon').value;
			zobjectfolder = dGet('wtwrpm_tavataranimobjectfolder').value;
			zobjectfile = WTW.getDDLText('wtwrpm_tavataranimobjectfile');
			zstartframe = dGet('wtwrpm_tavataranimstartframe').value;
			zendframe = dGet('wtwrpm_tavataranimendframe').value;
			zspeedratio = dGet('wtwrpm_tavataranimspeedratio').value;
			if (zddlvalue.indexOf('|') > -1) {
				zloadpriority = zddlvalue.split('|')[1];
				if (WTW.isNumeric(zloadpriority) == false) {
					zloadpriority = 0;
				}
			}
		} else {
			zanimationevent = dGet('wtwrpm_tavataranimevent-' + zavataranimationid).value;
			zloadpriority = dGet('wtwrpm_tavataranimloadpriority-' + zavataranimationid).value;
			zanimationfriendlyname = dGet('wtwrpm_tavataranimfriendlyname-' + zavataranimationid).value;
			zanimationicon = dGet('wtwrpm_tavataranimanimationicon-' + zavataranimationid).value;
			zobjectfolder = dGet('wtwrpm_tavataranimobjectfolder-' + zavataranimationid).value;
			zobjectfile = WTW.getDDLText('wtwrpm_tavataranimobjectfile-' + zavataranimationid);
			zstartframe = dGet('wtwrpm_tavataranimstartframe-' + zavataranimationid).value;
			zendframe = dGet('wtwrpm_tavataranimendframe-' + zavataranimationid).value;
			zspeedratio = dGet('wtwrpm_tavataranimspeedratio-' + zavataranimationid).value;
		}
		
		/* load or replace the animation on the avatar */
		WTW.loadAvatarAnimation('editavatar-0', zavataranimationid, zanimationfriendlyname, zanimationicon, zavataranimationid, zanimationevent, zobjectfolder, zobjectfile, zstartframe, zendframe, zspeedratio, 0, zloadpriority);
		
		/* save the animation */
		var zrequest = {
			'avataranimationid': zavataranimationid,
			'loadpriority': zloadpriority,
			'animationevent': zanimationevent,
			'animationfriendlyname': zanimationfriendlyname,
			'animationicon': zanimationicon,
			'objectfolder': zobjectfolder,
			'objectfile': zobjectfile,
			'startframe': zstartframe,
			'endframe': zendframe,
			'speedratio': zspeedratio,
			'function':'saveavatardefinitionanimation'
		};
		WTW.postAsyncJSON('/core/handlers/wtw-readyplayerme-avatars.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				if (zresponse.serror != '' && dGet('wtwrpm_tanimationsavatarerror').innerHTML == '') {
					dGet('wtwrpm_tanimationsavatarerror').innerHTML = zresponse.serror;
				}
				if (dGet('wtwrpm_tanimationsavatarerror').innerHTML == '') {
					wtwreadyplayerme.openEditAvatarAnimations();
				}
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-saveAvatarAnimationDefinition=' + ex.message);
	} 
}

WTW_READYPLAYERME.prototype.deleteAvatarAnimationDefinition = function(zanimationid) {
	/* delete Avatar Animation */
	try {
		var zrequest = {
			'avataranimationid': dGet('wtwrpm_tavataranimationid').value,
			'function':'deleteavatardefinitionanimation'
		};
		WTW.postAsyncJSON('/core/handlers/wtw-readyplayerme-avatars.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				if (zresponse.serror != '' && dGet('wtwrpm_tanimationsavatarerror').innerHTML == '') {
					dGet('wtwrpm_tanimationsavatarerror').innerHTML = zresponse.serror;
				}
				if (dGet('wtwrpm_tanimationsavatarerror').innerHTML == '') {
					wtwreadyplayerme.openEditAvatarAnimations();
				}
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-deleteAvatarAnimationDefinition=' + ex.message);
	} 
}

WTW_READYPLAYERME.prototype.loadAvatarFilesDDL = function(zresponse) {
	/* load animation files drop down list */
	try {
		var zddlid = 'wtwrpm_tavataranimobjectfile';
		var zdefault = '';
		if (dGet('wtwrpm_tavataranimationid').value != '') {
			zddlid = 'wtwrpm_tavataranimobjectfile-' + dGet('wtwrpm_tavataranimationid').value;
			if (dGet('wtwrpm_tavataranimobjectfiledefault-' + dGet('wtwrpm_tavataranimationid').value) != null) {
				zdefault = dGet('wtwrpm_tavataranimobjectfiledefault-' + dGet('wtwrpm_tavataranimationid').value).value;
			}
		}
		WTW.clearDDL(zddlid);
		if (zresponse != null) {
			for (var i=0;i < zresponse.length;i++) {
				if (zresponse[i] != null) {
					if (zresponse[i].file != undefined) {
						if ((zresponse[i].file.indexOf('.babylon') > -1 || zresponse[i].file.indexOf('.obj') > -1 || zresponse[i].file.indexOf('.gltf') > -1 || zresponse[i].file.indexOf('.glb') > -1) && zresponse[i].file.indexOf('.manifest') == -1) {
							if (dGet(zddlid) != null) {
								var zoption = document.createElement('option');
								zoption.text = zresponse[i].file;
								zoption.value = zresponse[i].file;
								if (zresponse[i].file == zdefault) {
									zoption.selected = true;
								}
								dGet(zddlid).add(zoption);
							}
						}
					}
				}
			}
		}
		/* set dropdown default to newly uploaded babylon file if it exists */
		if (dGet('wtwrpm_avatarfilesupload2').value != null && zdefault == '') {
			for (var i=0;i < dGet('wtwrpm_avatarfilesupload2').files.length;i++) {
				if (dGet('wtwrpm_avatarfilesupload2').files[i] != null) {
					if (dGet('wtwrpm_avatarfilesupload2').files[i].name.indexOf('.babylon') > -1 && dGet('wtwrpm_avatarfilesupload2').files[i].name.indexOf('.babylon.manifest') == -1) {
						WTW.setDDLText(zddlid, dGet('wtwrpm_avatarfilesupload2').files[i].name);
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-loadAvatarFilesDDL=' + ex.message);
	} 
}

WTW_READYPLAYERME.prototype.uploadQuickAvatarFiles = function() {
	/* upload 3D Avatar files using form post */
	try {
		if (dGet('wtw_avatarfilesupload2').value != null) {
			var zform1 = document.createElement('form');
			var Httpreq = new XMLHttpRequest();
			var zformdata = new FormData(zform1);
			for (var i=0;i < dGet('wtw_avatarfilesupload2').files.length;i++) {
				zformdata.append('wtw_uploadfiles[]', dGet('wtw_avatarfilesupload2').files[i], dGet('wtw_avatarfilesupload2').files[i].name);
			}
			zformdata.append('action', 'POST');
			zformdata.append('objectfolder', '/content/plugins/wtw-readyplayerme/assets/fullbody/');
			zformdata.append('function', 'uploadavatarfiles');
			Httpreq.open('POST', '/core/handlers/wtw-readyplayerme-avatars.php');
			Httpreq.onreadystatechange = function () {
				if (Httpreq.readyState == 4 && Httpreq.status == '200') {
					var zresponse = JSON.parse(Httpreq.responseText);
					dGet('wtw_avatarfilesupload').value = null;
					WTW.getFileList('/content/plugins/wtw-readyplayerme/assets/fullbody/', wtwreadyplayerme.loadAvatarFilesDDL);
				}
			};
			Httpreq.send(zformdata);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-uploadQuickAvatarFiles=' + ex.message);
	}
}

WTW_READYPLAYERME.prototype.postAsyncJSON = function(zurl, zrequest, zcallback) {
	/* performs a form POST based JSON call for data in async mode  */
	try {
		return new Promise(function () {
			var zform1 = document.createElement('form');
			var zhttpreq = new XMLHttpRequest();
			var zformdata = new FormData(zform1);
			for(var zkey in zrequest) {
				zformdata.append(zkey, zrequest[zkey]);
			}
			zformdata.append('action', 'POST');
			zhttpreq.open('POST', zurl);
			
//			zhttpreq.onprogress = WTW.postAsyncJSONProgress;			
			zhttpreq.onreadystatechange = function () {
				if (zhttpreq.readyState == 4 && zhttpreq.status == '200') {
					zcallback(zhttpreq.responseText);
				}
			};
//			zhttpreq.setRequestHeader("x-api-key", "sk_live_85i5UCgxfk_8UPG3wD0XZmjTTKF_sdlkUv00");
			zhttpreq.send(zformdata);
		});
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-postAsyncJSON=' + ex.message);
	}
}

WTW_READYPLAYERME.prototype.initializeAvatar = function(zloaddefault, ztry) {
	/* load saved avatar or default avatar */
	try {
		if (ztry == undefined) {
			ztry = 0;
		}
WTW.log("wtw_tuserid=" + dGet('wtw_tuserid').value);
WTW.log("wtwreadyplayerme.rpmAvatars=" + wtwreadyplayerme.rpmAvatars);
WTW.log("wtw_tglobaluseravatarid=" + dGet('wtw_tglobaluseravatarid').value);
		if ((dGet('wtw_tuserid').value == '' && wtwreadyplayerme.rpmAnonymousAvatars == '1') || (wtwreadyplayerme.rpmAvatars == '1' && dGet('wtw_tuserid').value != '' && dGet('wtw_tglobaluseravatarid').value == '') && ztry < 2) {
			/* if anonymous and not logged in OR logged in and has not selected avatar */
			zloaddefault = false;
			WTW.show('wtw_menulogin');

			var zrequest = {
				'wtwaccount': wtwreadyplayerme.rpmWTWAccount,
				'function': 'getanonymoususerid'
			};
			WTW.postAsyncJSON('/core/handlers/wtw-readyplayerme-avatars.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					var ztoken = '';
					var zanonymousid = '';
					if (zresponse["token"] != undefined) {
						ztoken = zresponse["token"];
					}
					if (zresponse["id"] != undefined) {
						zanonymousid = zresponse["id"];
					}
					/* get avatar templates */
					var zrequest2 = {
						'wtwaccount': wtwreadyplayerme.rpmWTWAccount,
						'token': ztoken,
						'function': 'getavatartemplates'
					};
					WTW.postAsyncJSON('/core/handlers/wtw-readyplayerme-avatars.php', zrequest2, 
						function(zresponse2) {
							zresponse2 = JSON.parse(zresponse2);
							var zdata = zresponse2.data;
							var zrandom = Math.floor(Math.random() * zdata.data.length);
							var zavatarid = zdata.data[zrandom].id;
							/* get random avatar and create draft avatar */
							var zrequest3 = {
								'wtwaccount': wtwreadyplayerme.rpmWTWAccount,
								'token': ztoken,
								'avatarid': zavatarid,
								'function': 'createdraftavatar'
							};
							WTW.postAsyncJSON('/core/handlers/wtw-readyplayerme-avatars.php', zrequest3, 
								function(zresponse3) {
									zresponse3 = JSON.parse(zresponse3);
									var zdata3 = zresponse3.data;
									/* update avatarid to new draft avatarid */
									zavatarid = zdata3.data.id;

									/* get draft avatar */
									var zrequest4 = {
										'wtwaccount': wtwreadyplayerme.rpmWTWAccount,
										'token': ztoken,
										'avatarid': zavatarid,
										'function': 'getdraftavatar'
									};
									WTW.postAsyncJSON('/core/handlers/wtw-readyplayerme-avatars.php', zrequest4, 
										function(zresponse4) {
											zresponse4 = JSON.parse(zresponse4);
											if (zresponse4 != null) {
												/* check results - if null, try again */
												var zavatarurl = zresponse4.avatarurl;
												/* get avatar animations */
												var zrequest5 = {
													'function': 'getavataranimations'
												};
												WTW.postAsyncJSON('/core/handlers/wtw-readyplayerme-avatars.php', zrequest5, 
													function(zresponse5) {
														zresponse5 = JSON.parse(zresponse5);

														var zavatardef = WTW.newAvatarDef();
														var zsize = (Math.floor(Math.random() * (850 - 800 + 1) + 800))/100;
														zavatardef.avatarid = zavatarid;
														zavatardef.scaling.x = zsize;
														zavatardef.scaling.y = zsize;
														zavatardef.scaling.z = zsize;
														zavatardef.position.z = -.5;
														zavatardef.rotation.y = -90;
														zavatardef.avataranimationdefs = zresponse5;
														zavatardef.objects.folder = '/content/uploads/ReadyPlayerMe/';
														zavatardef.objects.file = zavatarid + '.glb';
WTW.log("zavatarid=" + zavatarid);														
														WTW.updateAvatar('myavatar-' + dGet('wtw_tinstanceid').value, zavatardef, true);
														
													}
												);
											} else {
												/* give it another try to load avatar */
												wtwreadyplayerme.initializeAvatar(zloaddefault, (ztry+1));
											}
										}
									);
								}
							);
						}
					);
				}
			);
		} else if (dGet('wtw_tuserid').value != '' && wtwreadyplayerme.rpmAvatars == '1' && ztry < 2) {
			zloaddefault = false;
			/* logged in, set login values */
			WTW.setLoginValues();
			/* check cookie and load Avatar OR open select Avatar list */
			WTW.hide('wtw_menulogin');

			if (dGet('wtw_tglobaluseravatarid').value != '' || dGet('wtw_tuseravatarid').value != '' || dGet('wtw_tavatarid').value != '') {
				var zavatarserver = WTW.getCookie('avatarlocation');
				var zglobaluseravatarid = dGet('wtw_tglobaluseravatarid').value;
				if (zavatarserver == 'local') {
					zglobaluseravatarid = '';
				}
				WTW.openLoginHUD('Loading 3D Avatar');
				/* if avatar saved, load avatar */
				WTW.getSavedAvatar('myavatar-' + dGet('wtw_tinstanceid').value, zglobaluseravatarid, dGet('wtw_tuseravatarid').value, dGet('wtw_tavatarid').value, false);
			} else {
				/* avatar not saved, select random avatar */
				WTW.hudLoginEnter();
			}
		} else {
			/* if ReadyPlayerMe avatar did not load on first 2 tries, use default avatar instead */
			/* zloaddefault = true; */
		}
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-initializeAvatar=' + ex.message);
	}
	return zloaddefault;
}

WTW_READYPLAYERME.prototype.hudLoginLoadChoiceAvatarsArray = function(zfilter, zdefaultdisplayname) {
	/* get any additional choices for avatars, add to selection */
	try {
		if (zfilter == undefined) {
			zfilter = 'anonymous';
		}
		var zrequest = {
			'wtwaccount': wtwreadyplayerme.rpmWTWAccount,
			'anonymous': wtwreadyplayerme.rpmAnonymousAvatars,
			'function': 'LoadChoiceAvatarsArray'
		};
		WTW.postAsyncJSON('/core/handlers/wtw-readyplayerme-avatars.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				for (var i=0;i<zresponse.avatars.length;i++) {
					if (zresponse.avatars[i] != null) {
						WTW.selectAvatars[WTW.selectAvatars.length] = zresponse.avatars[i];
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-hudLoginLoadChoiceAvatarsArray=' + ex.message);
	}
}

WTW_READYPLAYERME.prototype.onMyAvatarSelect = function(zglobaluseravatarid, zuseravatarid, zavatarid, zloaddefault) {
	/* avatar selected - load avatar */
	try {
		if (WTW.selectAvatars != null) {
			if (WTW.selectAvatars[WTW.selectedAvatar] != null) {
				if (WTW.selectAvatars[WTW.selectedAvatar].source == 'ReadyPlayerMe') {
					/* save selection and load avatar from ReadyPlayerMe */
					var zdisplayname = 'Anonymous';
					if (dGet('wtw_tnewavatardisplayname') != null) {
						zdisplayname = dGet('wtw_tnewavatardisplayname').value;
					}
					zloaddefault = false;
					WTW.openLoginHUD('Loading 3D Avatar');
					/* load avatar from local copy */
					WTW.getSavedAvatar('myavatar-' + dGet('wtw_tinstanceid').value, zglobaluseravatarid, zuseravatarid, zavatarid, true);
					
					
				}
			}
		}
		
		
/*		if (WTW.globalLogins == '1') {
			if (zglobaluseravatarid == '' && zuseravatarid != '') {
				var zdisplayname = 'Anonymous';
				if (dGet('wtw_tnewavatardisplayname') != null) {
					zdisplayname = dGet('wtw_tnewavatardisplayname').value;
				}
				var zprotocol = '0';
				if (wtw_protocol == 'https://') {
					zprotocol = '1';
				}
				zloaddefault = false;

				WTW.openLoginHUD('Loading 3D Avatar');
//				/ * load avatar from local copy * /
				WTW.getSavedAvatar('myavatar-' + dGet('wtw_tinstanceid').value, zglobaluseravatarid, zuseravatarid, zavatarid, true);
//				/ * save avatar local copy to global server for future use and when visiting other servers * /
				var zrequest = {
					'useravatarid': zuseravatarid,
					'function':'setuseravatarglobalhash'
				};
				WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
//						/ * note serror would contain errors * /
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
//										/ * note serror would contain errors * /
										if (zresponse.globaluseravatarid != undefined) {
											if (zresponse.globaluseravatarid != '') {
												WTW.setCookie('globaluseravatarid', zresponse.globaluseravatarid, 365);
											}
											if (zresponse.useravatarid != '') {
												WTW.setCookie('useravatarid', zresponse.useravatarid, 365);
											}
											if (zresponse.avatarid != '') {
												WTW.setCookie('avatarid', zresponse.avatarid, 365);
											}
										}
									}
								);
							} else {
								WTW.log("Avatar Not Found.");
								WTW.openLoginHUD('Select My Avatar');
							}
						} else {
							WTW.log("Avatar Not Found.");
							WTW.openLoginHUD('Select My Avatar');
						}
					}
				);
			}
		}
*/
	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-onMyAvatarSelect=' + ex.message);
	} 
	return zloaddefault;
}

WTW_READYPLAYERME.prototype.getSavedAvatar = function(zglobaluseravatarid, zinstanceid, zavatarname, zsendrefresh, zloaddefault) {
	/* fetches the avatar definition for either the global avatar, local logged in avatar, or anonymous avatar */
	try {
/*		if (zglobaluseravatarid != '') {
//			/ * global avatar - uses a secure post method to 3dnet.walktheweb.com * /
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
*/

	} catch (ex) {
		WTW.log('plugins:wtw-readyplayerme:scripts-class_main.js-getSavedAvatar=' + ex.message);
	}
	return zloaddefault;
}

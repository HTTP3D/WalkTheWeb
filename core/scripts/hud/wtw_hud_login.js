/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* The heads up display (hud) provides menu options and user settings */
/* These functions create the login and avatar seections for HUD */

WTWJS.prototype.openLoginHUD = function(zpage) {
	/* Open the Login HUD */
	try {
		if (zpage == 'User Menu' && dGet('wtw_tuserid').value == '') {
			zpage = 'Login Menu';
		}
		var zmoldname = 'hudlogin';
		var zhudlogin = WTW.getMeshOrNodeByID(zmoldname);
		var zobjectfolder = '/content/system/babylon/menus/';
		var zobjectfile = 'wtw-loginmenu.babylon';
		var zobjectanimations = [];
		if (zhudlogin != null) {
			WTW.closeLoginHUD();
		}
		var zcamerafront = WTW.getMeshOrNodeByID('camerafront');
		
		zhudlogin = new BABYLON.TransformNode(zmoldname);
		zhudlogin.position = new BABYLON.Vector3(0,0,0);
		zhudlogin.rotation = new BABYLON.Vector3(0,WTW.getRadians(90),WTW.getRadians(20));
		zhudlogin.scaling = new BABYLON.Vector3(1,1,1);
		zhudlogin.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
		zhudlogin.parent = zcamerafront;

		switch (zpage) {
			case "Loading 3D Scene":
			case "Loading 3D Model":
			case "Loading 3D Avatar":
			case "Loading 3D Community":
			case "Loading 3D Building":
			case "Loading 3D Thing":
			case "Loading":
				zobjectfile = 'wtw-loading.babylon';
				
				zobjectanimations[0] = WTW.newObjectAnimation();
				zobjectanimations[0].animationname = 'HUDLOGINonloadloading';
				zobjectanimations[0].moldevent = 'onload';
				zobjectanimations[0].moldnamepart = 'spindle';
				zobjectanimations[0].startframe = 0;
				zobjectanimations[0].endframe = 180;
				zobjectanimations[0].animationloop = true;
				zobjectanimations[0].speedratio = 1.00;
				zobjectanimations[0].additionalscript = '';
				zobjectanimations[0].additionalparameters = '';
				break;
			case "Login Menu":
				zobjectfile = 'wtw-loginmenu.babylon';
				
				zobjectanimations[0] = WTW.newObjectAnimation();
				zobjectanimations[0].animationname = 'HUDLOGINonloadloginmenu';
				zobjectanimations[0].moldevent = 'onload';
				zobjectanimations[0].moldnamepart = '';
				zobjectanimations[0].startframe = 80;
				zobjectanimations[0].endframe = 100;
				zobjectanimations[0].animationloop = false;
				zobjectanimations[0].speedratio = 1.00;
				zobjectanimations[0].additionalscript = '';
				zobjectanimations[0].additionalparameters = '';
				
				zobjectanimations[1] = WTW.newObjectAnimation();
				zobjectanimations[1].animationname = 'HUDLOGINbuttonloginwtw';
				zobjectanimations[1].moldevent = 'onclick';
				zobjectanimations[1].moldnamepart = 'button-loginwtw';
				zobjectanimations[1].startframe = 1;
				zobjectanimations[1].endframe = 20;
				zobjectanimations[1].animationloop = false;
				zobjectanimations[1].speedratio = 1.00;
				zobjectanimations[1].additionalscript = '';
				zobjectanimations[1].additionalparameters = '';

				zobjectanimations[2] = WTW.newObjectAnimation();
				zobjectanimations[2].animationname = 'HUDLOGINbuttonloginlocal';
				zobjectanimations[2].moldevent = 'onclick';
				zobjectanimations[2].moldnamepart = 'button-loginlocal';
				zobjectanimations[2].startframe = 20;
				zobjectanimations[2].endframe = 40;
				zobjectanimations[2].animationloop = false;
				zobjectanimations[2].speedratio = 1.00;
				zobjectanimations[2].additionalscript = '';
				zobjectanimations[2].additionalparameters = '';

				zobjectanimations[3] = WTW.newObjectAnimation();
				zobjectanimations[3].animationname = 'HUDLOGINbuttonloginguest';
				zobjectanimations[3].moldevent = 'onclick';
				zobjectanimations[3].moldnamepart = 'button-loginguest';
				zobjectanimations[3].startframe = 40;
				zobjectanimations[3].endframe = 60;
				zobjectanimations[3].animationloop = false;
				zobjectanimations[3].speedratio = 1.00;
				zobjectanimations[3].additionalscript = '';
				zobjectanimations[3].additionalparameters = '';

				break;
			case "User Menu":
				zobjectfile = 'wtw-usermenu.babylon';
				
				zobjectanimations[0] = WTW.newObjectAnimation();
				zobjectanimations[0].animationname = 'HUDLOGINonloadusermenu';
				zobjectanimations[0].moldevent = 'onload';
				zobjectanimations[0].moldnamepart = '';
				zobjectanimations[0].startframe = 80;
				zobjectanimations[0].endframe = 100;
				zobjectanimations[0].animationloop = false;
				zobjectanimations[0].speedratio = 1.00;
				zobjectanimations[0].additionalscript = '';
				zobjectanimations[0].additionalparameters = '';
				
				zobjectanimations[1] = WTW.newObjectAnimation();
				zobjectanimations[1].animationname = 'HUDLOGINbuttoneditprofile';
				zobjectanimations[1].moldevent = 'onclick';
				zobjectanimations[1].moldnamepart = 'button-editprofile';
				zobjectanimations[1].startframe = 1;
				zobjectanimations[1].endframe = 20;
				zobjectanimations[1].animationloop = false;
				zobjectanimations[1].speedratio = 1.00;
				zobjectanimations[1].additionalscript = '';
				zobjectanimations[1].additionalparameters = '';

				zobjectanimations[2] = WTW.newObjectAnimation();
				zobjectanimations[2].animationname = 'HUDLOGINbuttonselectmyavatar';
				zobjectanimations[2].moldevent = 'onclick';
				zobjectanimations[2].moldnamepart = 'button-selectmyavatar';
				zobjectanimations[2].startframe = 20;
				zobjectanimations[2].endframe = 40;
				zobjectanimations[2].animationloop = false;
				zobjectanimations[2].speedratio = 1.00;
				zobjectanimations[2].additionalscript = '';
				zobjectanimations[2].additionalparameters = '';

				zobjectanimations[3] = WTW.newObjectAnimation();
				zobjectanimations[3].animationname = 'HUDLOGINbuttoneditmyavatar';
				zobjectanimations[3].moldevent = 'onclick';
				zobjectanimations[3].moldnamepart = 'button-editmyavatar';
				zobjectanimations[3].startframe = 40;
				zobjectanimations[3].endframe = 60;
				zobjectanimations[3].animationloop = false;
				zobjectanimations[3].speedratio = 1.00;
				zobjectanimations[3].additionalscript = '';
				zobjectanimations[3].additionalparameters = '';

				zobjectanimations[4] = WTW.newObjectAnimation();
				zobjectanimations[4].animationname = 'HUDLOGINbuttonlogout';
				zobjectanimations[4].moldevent = 'onclick';
				zobjectanimations[4].moldnamepart = 'button-logout';
				zobjectanimations[4].startframe = 60;
				zobjectanimations[4].endframe = 80;
				zobjectanimations[4].animationloop = false;
				zobjectanimations[4].speedratio = 1.00;
				zobjectanimations[4].additionalscript = '';
				zobjectanimations[4].additionalparameters = '';

				break;
			case "WalkTheWeb Login":
			case "3D Website Login":
				zobjectfile = 'wtw-login.babylon';
				
				zobjectanimations[0] = WTW.newObjectAnimation();
				zobjectanimations[0].animationname = 'HUDLOGINonloadlogin';
				zobjectanimations[0].moldevent = 'onload';
				zobjectanimations[0].moldnamepart = '';
				zobjectanimations[0].startframe = 80;
				zobjectanimations[0].endframe = 100;
				zobjectanimations[0].animationloop = false;
				zobjectanimations[0].speedratio = 1.00;
				zobjectanimations[0].additionalscript = '';
				zobjectanimations[0].additionalparameters = '';
				
				zobjectanimations[1] = WTW.newObjectAnimation();
				zobjectanimations[1].animationname = 'HUDLOGINbuttonlogin';
				zobjectanimations[1].moldevent = 'onclick';
				zobjectanimations[1].moldnamepart = 'button-login';
				zobjectanimations[1].startframe = 1;
				zobjectanimations[1].endframe = 20;
				zobjectanimations[1].animationloop = false;
				zobjectanimations[1].speedratio = 1.00;
				zobjectanimations[1].additionalscript = '';
				zobjectanimations[1].additionalparameters = '';

				zobjectanimations[2] = WTW.newObjectAnimation();
				zobjectanimations[2].animationname = 'HUDLOGINbuttoncreatelink';
				zobjectanimations[2].moldevent = 'onclick';
				zobjectanimations[2].moldnamepart = 'button-createlink';
				zobjectanimations[2].startframe = 20;
				zobjectanimations[2].endframe = 40;
				zobjectanimations[2].animationloop = false;
				zobjectanimations[2].speedratio = 1.00;
				zobjectanimations[2].additionalscript = '';
				zobjectanimations[2].additionalparameters = '';

				zobjectanimations[3] = WTW.newObjectAnimation();
				zobjectanimations[3].animationname = 'HUDLOGINbuttonforgot';
				zobjectanimations[3].moldevent = 'onclick';
				zobjectanimations[3].moldnamepart = 'button-forgot';
				zobjectanimations[3].startframe = 40;
				zobjectanimations[3].endframe = 60;
				zobjectanimations[3].animationloop = false;
				zobjectanimations[3].speedratio = 1.00;
				zobjectanimations[3].additionalscript = '';
				zobjectanimations[3].additionalparameters = '';

				zobjectanimations[4] = WTW.newObjectAnimation();
				zobjectanimations[4].animationname = 'HUDLOGINbuttoncancellogin';
				zobjectanimations[4].moldevent = 'onclick';
				zobjectanimations[4].moldnamepart = 'button-cancellogin';
				zobjectanimations[4].startframe = 60;
				zobjectanimations[4].endframe = 80;
				zobjectanimations[4].animationloop = false;
				zobjectanimations[4].speedratio = 1.00;
				zobjectanimations[4].additionalscript = '';
				zobjectanimations[4].additionalparameters = '';

				break;
			case "Create WTW Login":
			case "Create Login":
				zobjectfile = 'wtw-create.babylon';
				
				zobjectanimations[0] = WTW.newObjectAnimation();
				zobjectanimations[0].animationname = 'HUDLOGINonloadcreatelogin';
				zobjectanimations[0].moldevent = 'onload';
				zobjectanimations[0].moldnamepart = '';
				zobjectanimations[0].startframe = 80;
				zobjectanimations[0].endframe = 100;
				zobjectanimations[0].animationloop = false;
				zobjectanimations[0].speedratio = 1.00;
				zobjectanimations[0].additionalscript = '';
				zobjectanimations[0].additionalparameters = '';
				
				zobjectanimations[1] = WTW.newObjectAnimation();
				zobjectanimations[1].animationname = 'HUDLOGINbuttoncreate';
				zobjectanimations[1].moldevent = 'onclick';
				zobjectanimations[1].moldnamepart = 'button-create';
				zobjectanimations[1].startframe = 1;
				zobjectanimations[1].endframe = 20;
				zobjectanimations[1].animationloop = false;
				zobjectanimations[1].speedratio = 1.00;
				zobjectanimations[1].additionalscript = '';
				zobjectanimations[1].additionalparameters = '';

				zobjectanimations[2] = WTW.newObjectAnimation();
				zobjectanimations[2].animationname = 'HUDLOGINbuttoncancelcreate';
				zobjectanimations[2].moldevent = 'onclick';
				zobjectanimations[2].moldnamepart = 'button-cancelcreate';
				zobjectanimations[2].startframe = 60;
				zobjectanimations[2].endframe = 80;
				zobjectanimations[2].animationloop = false;
				zobjectanimations[2].speedratio = 1.00;
				zobjectanimations[2].additionalscript = '';
				zobjectanimations[2].additionalparameters = '';

				break;
			case "Reset Password":
				zobjectfile = 'wtw-passwordreset.babylon';
				
				zobjectanimations[0] = WTW.newObjectAnimation();
				zobjectanimations[0].animationname = 'HUDLOGINonloadresetpassword';
				zobjectanimations[0].moldevent = 'onload';
				zobjectanimations[0].moldnamepart = '';
				zobjectanimations[0].startframe = 80;
				zobjectanimations[0].endframe = 100;
				zobjectanimations[0].animationloop = false;
				zobjectanimations[0].speedratio = 1.00;
				zobjectanimations[0].additionalscript = '';
				zobjectanimations[0].additionalparameters = '';
				
				zobjectanimations[1] = WTW.newObjectAnimation();
				zobjectanimations[1].animationname = 'HUDLOGINbuttonreset';
				zobjectanimations[1].moldevent = 'onclick';
				zobjectanimations[1].moldnamepart = 'button-reset';
				zobjectanimations[1].startframe = 1;
				zobjectanimations[1].endframe = 20;
				zobjectanimations[1].animationloop = false;
				zobjectanimations[1].speedratio = 1.00;
				zobjectanimations[1].additionalscript = '';
				zobjectanimations[1].additionalparameters = '';

				zobjectanimations[2] = WTW.newObjectAnimation();
				zobjectanimations[2].animationname = 'HUDLOGINbuttoncancelreset';
				zobjectanimations[2].moldevent = 'onclick';
				zobjectanimations[2].moldnamepart = 'button-cancelreset';
				zobjectanimations[2].startframe = 60;
				zobjectanimations[2].endframe = 80;
				zobjectanimations[2].animationloop = false;
				zobjectanimations[2].speedratio = 1.00;
				zobjectanimations[2].additionalscript = '';
				zobjectanimations[2].additionalparameters = '';

				break;
		}

		BABYLON.SceneLoader.ImportMeshAsync('', zobjectfolder, zobjectfile, scene).then(
			function (zresults) {
				if (zresults.meshes != null) {
					zhudlogin.WTW = {
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
							
							/* make sure child meshes are pickable */
							switch (zmeshname) {
								case 'button-loginwtw':
									if (WTW.globalLogins == '1') {
										zresults.meshes[i].isPickable = true;
										zresults.meshes[i].isVisible = true;
										WTW.registerMouseOver(zresults.meshes[i]);
									} else {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = false;
									}
									break;
								case 'button-loginlocal':
									if (WTW.localLogins == '1') {
										zresults.meshes[i].isPickable = true;
										zresults.meshes[i].isVisible = true;
										WTW.registerMouseOver(zresults.meshes[i]);
									} else {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = false;
									}
									break;
								case 'button-loginguest':
									if (WTW.anonymousLogins == '1') {
										zresults.meshes[i].isPickable = true;
										zresults.meshes[i].isVisible = true;
										WTW.registerMouseOver(zresults.meshes[i]);
									} else {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = false;
									}
									break;
								case 'hudlogin-button-editprofile':
								case 'hudlogin-button-selectmyavatar':
								case 'hudlogin-button-editmyavatar':
								case 'hudlogin-button-logout':
								case 'button-editprofile':
								case 'button-selectmyavatar':
								case 'button-editmyavatar':
								case 'button-logout':
								case 'button-login':
								case 'button-create':
								case 'button-reset':
								case 'button-createlink':
								case 'button-forgot':
								case 'button-cancellogin':
								case 'button-cancelreset':
								case 'button-cancelcreate':
								case 'email-email':
								case 'password-password':
								case 'password-password2':
								case 'check-remember':
									zresults.meshes[i].isPickable = true;
									zresults.meshes[i].isVisible = true;
									WTW.registerMouseOver(zresults.meshes[i]);
									break;
								case 'button-loginwtwtext':
									if (WTW.globalLogins == '1') {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = true;
									} else {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = false;
									}
									break;
								case 'button-loginlocaltext':
									if (WTW.localLogins == '1') {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = true;
									} else {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = false;
									}
									break;
								case 'button-loginguesttext':
									if (WTW.anonymousLogins == '1') {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = true;
									} else {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = false;
									}
									break;
								case 'invalidlogin':
								case 'invalidpassword':
								case 'invalidpasswords':
								case 'invalidemail':
								case 'invalidemailinuse':
								case 'notfound':
								case 'sent':
								case 'email-emailborder':
								case 'password-passwordborderfocus':
								case 'password-password2borderfocus':
								case 'check-rememberborderfocus':
								case 'loading':
								case 'loading3dscene':
								case 'loading3dmodel':
								case 'loading3davatar':
								case 'loading3dcommunity':
								case 'loading3dbuilding':
								case 'loading3dthing':
									zresults.meshes[i].isPickable = false;
									zresults.meshes[i].isVisible = false;
									break;
								case 'titlewtw':
									if (zpage == 'WalkTheWeb Login') {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = true;
									} else {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = false;
									}
									break;
								case 'titlelocal':
									if (zpage == '3D Website Login') {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = true;
									} else {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = false;
									}
									break;
								case 'titlecreatewtw':
									if (zpage == 'Create WTW Login') {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = true;
									} else {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = false;
									}
									break;
								case 'titlecreatelocal':
									if (zpage == 'Create Login') {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = true;
									} else {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = false;
									}
									break;
								default:
									zresults.meshes[i].isPickable = false;
									zresults.meshes[i].isVisible = true;
									break;
							}
							
							/* make sure all object meshes have a parent */
							if (zresults.meshes[i].parent == null) {
								zresults.meshes[i].parent = zhudlogin;
							}
							if (WTW.shadows != null) {
								/* add mesh to world shadow map */
//									WTW.shadows.getShadowMap().renderList.push(zresults.meshes[i]);
							}
//								zresults.meshes[i].receiveShadows = true;
							/* initiate and preload any event driven animations */
							if (zobjectanimations != null) {
								WTW.addMoldAnimation(zmoldname, zmeshname, zresults.meshes[i], zobjectanimations);
							}
							if (zhudlogin == null || zhudlogin.parent == null) {
								/* if the parent has been deleted after this async process began (avoiding orphaned objects)*/
								zresults.meshes[i].dispose();
							}
						}
					}
				}
				zhudlogin = WTW.getMeshOrNodeByID(zmoldname);
				if (zhudlogin == null || zhudlogin.parent == null) {
					/* if the parent has been deleted after this async process began (avoiding orphaned objects) */
					WTW.disposeClean(zmoldname);
				} else {
					/* perform any after load function like Focus or title selection */
					var zremember = false;
					var zemail = '';
					var zpassword = '';
					var zmoldfocus = '';
					switch (zpage) {
						case "Loading":
							var zloading = WTW.getMeshOrNodeByID('hudlogin-loading');
							if (zloading != null) {
								zloading.isVisible = true;
							}
							break;
						case "Loading 3D Scene":
							var zloading = WTW.getMeshOrNodeByID('hudlogin-loading3dscene');
							if (zloading != null) {
								zloading.isVisible = true;
							}
							break;
						case "Loading 3D Model":
							var zloading = WTW.getMeshOrNodeByID('hudlogin-loading3dmodel');
							if (zloading != null) {
								zloading.isVisible = true;
							}
							break;
						case "Loading 3D Avatar":
							var zloading = WTW.getMeshOrNodeByID('hudlogin-loading3davatar');
							if (zloading != null) {
								zloading.isVisible = true;
							}
							break;
						case "Loading 3D Community":
							var zloading = WTW.getMeshOrNodeByID('hudlogin-loading3dcommunity');
							if (zloading != null) {
								zloading.isVisible = true;
							}
							break;
						case "Loading 3D Building":
							var zloading = WTW.getMeshOrNodeByID('hudlogin-loading3dbuilding');
							if (zloading != null) {
								zloading.isVisible = true;
							}
							break;
						case "Loading 3D Thing":
							var zloading = WTW.getMeshOrNodeByID('hudlogin-loading3dthing');
							if (zloading != null) {
								zloading.isVisible = true;
							}
							break;
						case "Login Menu":
							break;
						case "Create WTW Login":
						case "Create Login":
							zmoldfocus = 'hudlogin-email-email';
							break;
						case "WalkTheWeb Login":
							zremember = WTW.getCookie('globalloginremember');
							zemail = WTW.getCookie('globalloginemail');
							zpassword = WTW.getCookie('globalloginpassword');
							if (zmoldfocus == '' && zremember) {
								if (zemail.length == 0) {
									zmoldfocus = 'hudlogin-email-email';
								} else if (atob(zpassword).length == 0) {
									zmoldfocus = 'hudlogin-password-password';
								} else {
									zmoldfocus = 'hudlogin-button-loginwtw';
								}
							}
							WTW.hudLoginFocusText('hudlogin-email-email', true);
							WTW.hudLoginFocusText('hudlogin-password-password', true);
							WTW.hudLoginFocusText('hudlogin-check-remember', true);
							WTW.tabNextField();
							break;
						case "3D Website Login":
							zremember = WTW.getCookie('localloginremember');
							zemail = WTW.getCookie('localloginemail');
							zpassword = WTW.getCookie('localloginpassword');
							if (zmoldfocus == '' && zremember) {
								if (zemail.length == 0) {
									zmoldfocus = 'hudlogin-email-email';
								} else if (atob(zpassword).length == 0) {
									zmoldfocus = 'hudlogin-password-password';
								} else {
									zmoldfocus = 'hudlogin-button-loginwtw';
								}
							}
							WTW.hudLoginFocusText('hudlogin-email-email', true);
							WTW.hudLoginFocusText('hudlogin-password-password', true);
							WTW.hudLoginFocusText('hudlogin-check-remember', true);
							WTW.tabNextField();
							break;
						case "Reset Password":
							zmoldfocus = 'hudlogin-email-email';
							break;
					}
					if (zmoldfocus != '') {
						window.setTimeout(function() {
							WTW.changeLoginHUDFocus(zmoldfocus);
						},1000);
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-openLoginHUD=' + ex.message);
	}
}

WTWJS.prototype.openLoginHUDLogin = function() {
	/* Select which Login Menu or Form based on Active Global Login variables */
	try {
		if ((WTW.globalLogins == '1' && WTW.localLogins == '1') || (WTW.globalLogins == '1' && WTW.anonymousLogins == '1') || (WTW.localLogins == '1' && WTW.anonymousLogins == '1')) {
			/* if there is more than one choice */
			WTW.openLoginHUD('Login Menu');
		} else if (WTW.globalLogins == '1') {
			/* open global login */
			WTW.openLoginHUD('WalkTheWeb Login');
		} else if (WTW.localLogins == '1') {
			/* open local login */
			WTW.openLoginHUD('3D Website Login');
		} else if (WTW.anonymousLogins == '1') {
			/* login not required - open select avatar */
			WTW.closeLoginHUD();
			WTW.openLocalLogin('Select an Anonymous Avatar', .4, .5);
		} else {
			WTW.openLoginHUD('Login Menu');
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-openLoginHUDLogin=' + ex.message);
	}
}


WTWJS.prototype.mouseOverLoginHUD = function(zmoldname, zhover) {
	/* mouse over Login HUD */
	try {
		var zmold = WTW.getMeshOrNodeByID(zmoldname.replace('text',''));
		var zmoldtext = WTW.getMeshOrNodeByID(zmoldname.replace('text','') + 'text');
		var zmoldblue = WTW.getMeshOrNodeByID('hudlogin-blue');
		var zmoldblack = WTW.getMeshOrNodeByID('hudlogin-black');
		var zmoldgray = WTW.getMeshOrNodeByID('hudlogin-gray');
		var zmoldgreen = WTW.getMeshOrNodeByID('hudlogin-green');
		var zmoldwhite = WTW.getMeshOrNodeByID('hudlogin-white');
		var zmoldyellow = WTW.getMeshOrNodeByID('hudlogin-yellow');
		var zmatblue = null;
		var zmatblack = null;
		var zmatgray = null;
		var zmatgreen = null;
		var zmatwhite = null;
		var zmatyellow = null;
		if (zmoldblue != null) {
			zmatblue = zmoldblue.material.clone();
		}
		if (zmoldblack != null) {
			zmatblack = zmoldblack.material.clone();
		}
		if (zmoldgray != null) {
			zmatgray = zmoldgray.material.clone();
		}
		if (zmoldgreen != null) {
			zmatgreen = zmoldgreen.material.clone();
		}
		if (zmoldwhite != null) {
			zmatwhite = zmoldwhite.material.clone();
		}
		if (zmoldyellow != null) {
			zmatyellow = zmoldyellow.material.clone();
		}
		
		switch (zmoldname) {
			case 'hudlogin-button-loginwtw':
			case 'hudlogin-button-loginlocal':
			case 'hudlogin-button-loginguest':
			case 'hudlogin-button-editprofile':
			case 'hudlogin-button-selectmyavatar':
			case 'hudlogin-button-editmyavatar':
			case 'hudlogin-button-logout':
			case 'hudlogin-button-create':
			case 'hudlogin-button-reset':
			case 'hudlogin-button-login':
				/* larger main buttons */
				if (zhover == 1) {
					if (zmatgreen != null && zmold != null) {
						zmold.material = zmatgreen;
					}
					if (zmatyellow != null && zmoldtext != null) {
						zmoldtext.material = zmatyellow;
					}
				} else {
					if (zmatblue != null && zmold != null) {
						zmold.material = zmatblue;
					}
					if (zmatwhite != null && zmoldtext != null) {
						zmoldtext.material = zmatwhite;
					}
				}
				break;
			case 'hudlogin-button-createlink':
			case 'hudlogin-button-forgot':
			case 'hudlogin-button-cancellogin':
			case 'hudlogin-button-cancelcreate':
			case 'hudlogin-button-cancelreset':
				/* smaller buttons */
				if (zhover == 1) {
					if (zmatyellow != null && zmold != null) {
						zmold.material = zmatyellow;
					}
					if (zmatblack != null && zmoldtext != null) {
						zmoldtext.material = zmatblack;
					}
				} else {
					if (zmatgray != null && zmold != null) {
						zmold.material = zmatgray;
					}
					if (zmatblue != null && zmoldtext != null) {
						zmoldtext.material = zmatblue;
					}
				}
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-mouseOverLoginHUD=' + ex.message);
	}
}

WTWJS.prototype.hudLoginClick = function(zmoldname) {
	/* Click on Login HUD Buttons */
	try {
		switch (zmoldname) {
			case 'hudlogin-email-email':
			case 'hudlogin-password-password':
			case 'hudlogin-password-password2':
			case 'hudlogin-check-remember':
				WTW.changeLoginHUDFocus(zmoldname);
				break;
			default:
				window.setTimeout(function() {
					if (zmoldname == 'hudlogin-button-loginwtw') {
						/* login menu */
						WTW.closeLoginHUD();
						if (dGet('wtw_tuserid').value == '') {
							WTW.openGlobalLogin();
						} else {
							WTW.logoutGlobal();
						}
					} else if (zmoldname == 'hudlogin-button-loginlocal') {
						/* login menu */
						WTW.closeLoginHUD();
						if (dGet('wtw_tuserid').value == '') {
							WTW.openLoginHUD('3D Website Login');
						} else {
							WTW.logout();
							WTW.openLoginHUD('3D Website Login');
						}
					} else if (zmoldname == 'hudlogin-button-loginguest') {
						/* login menu */
						WTW.closeLoginHUD();
						WTW.openLocalLogin('Select an Anonymous Avatar', .4, .5);
					} else if (zmoldname == 'hudlogin-button-editprofile') {
						/* open edit profile */
						WTW.closeLoginHUD();
						WTW.openLocalLogin('Edit Profile', .4, .6);
					} else if (zmoldname == 'hudlogin-button-selectmyavatar') {
						/* select my avatar */
						WTW.closeLoginHUD();
						WTW.openLocalLogin('Select Avatar',.4,.9);
					} else if (zmoldname == 'hudlogin-button-editmyavatar') {
						/* edit my avatar */
						WTW.closeLoginHUD();
						WTW.openAvatarDesigner();
					} else if (zmoldname == 'hudlogin-button-logout') {
						/* logout */
						WTW.closeLoginHUD();
						WTW.logout();
					} else if (zmoldname == 'hudlogin-button-login') {
						/* login */
						WTW.hudLoginLogin();
					} else if (zmoldname == 'hudlogin-button-createlink') {
						/* login */
						WTW.closeLoginHUD();
						let ztitlewtw = WTW.getMeshOrNodeByID('hudlogin-titlewtw');
						let zfocus = false;
						let zlocal = true;
						if (ztitlewtw != null) {
							if (ztitlewtw.isVisible) {
								zlocal = false;
							}
						}
						if (zlocal) {
							WTW.openLoginHUD('Create Login');
						} else {
							WTW.openLoginHUD('Create WTW Login');
						}
					} else if (zmoldname == 'hudlogin-button-forgot') {
						/* reset password */
						WTW.closeLoginHUD();
						//WTW.openLoginHUD('Reset Password'); /* 3d form is not ready */
						WTW.openLocalLogin('Recover Login', .4, .5);
					} else if (zmoldname == 'hudlogin-button-cancellogin') {
						/* login */
						WTW.closeLoginHUD();
						WTW.openLoginHUDLogin();
					} else if (zmoldname == 'hudlogin-button-create') {
						/* create login */
						WTW.hudLoginCreate();
					} else if (zmoldname == 'hudlogin-button-cancelcreate') {
						/* create login */
						WTW.closeLoginHUD();
						WTW.openLoginHUDLogin();
					} else if (zmoldname == 'hudlogin-button-reset') {
						/* reset password */
						
					} else if (zmoldname == 'hudlogin-button-cancelreset') {
						/* cancel reset password */
						WTW.closeLoginHUD();
						WTW.openLoginHUDLogin();
					}
				},1000);
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginClick=' + ex.message);
	}
}

WTWJS.prototype.changeLoginHUDFocus = function(zmoldname) {
	/* Change Login HUD Focus */
	try {
		var zborder = WTW.getMeshOrNodeByID(zmoldname + 'border');
		var zborderfocus = WTW.getMeshOrNodeByID(zmoldname + 'borderfocus');
		var zemailborder = WTW.getMeshOrNodeByID('hudlogin-email-emailborder');
		var zemailborderfocus = WTW.getMeshOrNodeByID('hudlogin-email-emailborderfocus');
		var zpasswordborder = WTW.getMeshOrNodeByID('hudlogin-password-passwordborder');
		var zpasswordborderfocus = WTW.getMeshOrNodeByID('hudlogin-password-passwordborderfocus');
		var zpassword2border = WTW.getMeshOrNodeByID('hudlogin-password-password2border');
		var zpassword2borderfocus = WTW.getMeshOrNodeByID('hudlogin-password-password2borderfocus');
		var zrememberborder = WTW.getMeshOrNodeByID('hudlogin-check-rememberborder');
		var zrememberborderfocus = WTW.getMeshOrNodeByID('hudlogin-check-rememberborderfocus');
		if (zemailborder != null) {
			zemailborder.isVisible = true;
		}
		if (zemailborderfocus != null) {
			zemailborderfocus.isVisible = false;
		}
		if (zpasswordborder != null) {
			zpasswordborder.isVisible = true;
		}
		if (zpasswordborderfocus != null) {
			zpasswordborderfocus.isVisible = false;
		}
		if (zpassword2border != null) {
			zpassword2border.isVisible = true;
		}
		if (zpassword2borderfocus != null) {
			zpassword2borderfocus.isVisible = false;
		}
		if (zrememberborder != null) {
			zrememberborder.isVisible = true;
		}
		if (zrememberborderfocus != null) {
			zrememberborderfocus.isVisible = false;
		}
		
		if (zborder != null) {
			zborder.isVisible = false;
		}
		if (zborderfocus != null) {
			zborderfocus.isVisible = true;
		}
		WTW.hudLoginFocusText(zmoldname);
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-changeLoginHUDFocus=' + ex.message);
	}
}

WTWJS.prototype.hudLoginFocusText = function(zmoldname, zeditdone) {
	/* Type into Login HUD */
	try {
		if (zeditdone == undefined) {
			zeditdone = false;
		}
		WTW.offsetX = 2;
		WTW.offsetY = 0;
		WTW.offsetZ = -1;
		WTW.maxLength = 15;
		WTW.tabOrder = [
			'hudlogin-button-loginwtw',
			'hudlogin-button-loginlocal',
			'hudlogin-button-loginguest',
			'hudlogin-button-editprofile',
			'hudlogin-button-selectmyavatar',
			'hudlogin-button-editmyavatar',
			'hudlogin-button-logout',
			'hudlogin-email-email',
			'hudlogin-password-password',
			'hudlogin-password-password2',
			'hudlogin-check-remember',
			'hudlogin-button-login',
			'hudlogin-button-create',
			'hudlogin-button-reset',
			'hudlogin-button-createlink',
			'hudlogin-button-forgot',
			'hudlogin-button-cancellogin',
			'hudlogin-button-cancelcreate',
			'hudlogin-button-cancelreset'
		];
		if (WTW.selectedMoldName != zmoldname) {
			window.clearInterval(WTW.textTimer);
			WTW.textTimer = null;
			WTW.selectedMoldName = zmoldname;
		}
		switch (WTW.selectedMoldName) {
			case 'hudlogin-email-email':
				WTW.offsetY = 1.8;
				break;
			case 'hudlogin-password-password':
				WTW.offsetY = 0;
				break;
			case 'hudlogin-password-password2':
				WTW.offsetY = -1.8;
				break;
			case 'hudlogin-check-remember':
				WTW.offsetY = -1.35;
				WTW.offsetZ = -1.15;
				WTW.maxLength = 1;
				break;
		}
		WTW.webStyle = {
			'anchor':'left',
			'letter-height':1.00,
			'letter-thickness':.2,
			'color':'#0069ff',
			'alpha':1.00,
			'colors':{
				'diffuse':'#0069ff',
				'specular':'#c0c0c0',
				'ambient':'#c0c0c0',
				'emissive':'#000000'
			}
		};
		WTW.focusText(zeditdone);
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginFocusText=' + ex.message);
	}
}

WTWJS.prototype.closeLoginHUD = function() {
	/* Close the Login HUD */
	try {
		WTW.disposeClean('hudlogin');
		if (dGet('wtw_formfields') != null) {
			dGet('wtw_formfields').parentNode.removeChild(dGet('wtw_formfields'));
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-closeLoginHUD=' + ex.message);
	}
}

WTWJS.prototype.hudLoginToggle = function() {
	/* Toggles Login HUD open or Closed if already open */
	try {
		var zhudlogin = WTW.getMeshOrNodeByID('hudlogin');
		if (zhudlogin == null) {
			WTW.openLoginHUDLogin();
		} else {
			WTW.closeLoginHUD();
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginToggle=' + ex.message);
	}
}

WTWJS.prototype.hudLoginLogin = function() {
	/* run login attempt */
	try {
		var zemail = dGet('hudlogin-email-email-textbox').value;
		var zpassword = dGet('hudlogin-password-password-textbox').value;
		var zremembercheck = dGet('hudlogin-check-remember-textbox').checked;
		let zinvalidemail = WTW.getMeshOrNodeByID('hudlogin-invalidemail');
		let zremember = WTW.getMeshOrNodeByID('hudlogin-check-remember');
		let zrememberborder = WTW.getMeshOrNodeByID('hudlogin-check-rememberborder');
		let zrememberborderfocus = WTW.getMeshOrNodeByID('hudlogin-check-rememberborderfocus');
		let zremembertext = WTW.getMeshOrNodeByID('hudlogin-check-remembertext');
		let zremember3dtext = WTW.getMeshOrNodeByID('hudlogin-check-remember-text');
		let ztitlewtw = WTW.getMeshOrNodeByID('hudlogin-titlewtw');
		let zfocus = false;
		let zlocal = true;
		if (ztitlewtw != null) {
			if (ztitlewtw.isVisible) {
				zlocal = false;
			}
		}
		if (WTW.isEmail(zemail) == false) {
			if (zinvalidemail != null) {
				zinvalidemail.isVisible = true;
				if (zremember != null) {
					zremember.isVisible = false;
				}
				if (zrememberborder != null) {
					zrememberborder.isVisible = false;
				}
				if (zrememberborderfocus != null) {
					zfocus = zrememberborderfocus.isVisible;
					zrememberborderfocus.isVisible = false;
				}
				if (zremembertext != null) {
					zremembertext.isVisible = false;
				}
				if (zremember3dtext != null) {
					zremember3dtext.isVisible = false;
				}
				window.setTimeout(function(){
					zinvalidemail = WTW.getMeshOrNodeByID('hudlogin-invalidemail');
					zremember = WTW.getMeshOrNodeByID('hudlogin-check-remember');
					zrememberborder = WTW.getMeshOrNodeByID('hudlogin-check-rememberborder');
					zrememberborderfocus = WTW.getMeshOrNodeByID('hudlogin-check-rememberborderfocus');
					zremembertext = WTW.getMeshOrNodeByID('hudlogin-check-remembertext');
					zremember3dtext = WTW.getMeshOrNodeByID('hudlogin-check-remember-text');
					if (zinvalidemail != null) {
						zinvalidemail.isVisible = false;
					}
					if (zremember != null) {
						zremember.isVisible = true;
					}
					if (zfocus) {
						if (zrememberborderfocus != null) {
							zrememberborderfocus.isVisible = true;
						}
					} else {
						if (zrememberborder != null) {
							zrememberborder.isVisible = true;
						}
					}
					if (zremembertext != null) {
						zremembertext.isVisible = true;
					}
					if (zremember3dtext != null) {
						zremember3dtext.isVisible = true;
					}
				},5000);
			}
		} else {
			if (zinvalidemail != null) {
				zinvalidemail.isVisible = false;
			}
			if (zremember != null) {
				zremember.isVisible = true;
			}
			if (zfocus) {
				if (zrememberborderfocus != null) {
					zrememberborderfocus.isVisible = true;
				}
			} else {
				if (zrememberborder != null) {
					zrememberborder.isVisible = true;
				}
			}
			if (zremembertext != null) {
				zremembertext.isVisible = true;
			}
			if (zlocal == false) {
				if (zremembercheck) {
					WTW.setCookie('globalloginemail', zemail, 365);
					WTW.setCookie('globalloginpassword', btoa(zpassword), 365);
					WTW.setCookie('globalloginremember', zremembercheck, 365);
				} else {
					WTW.deleteCookie('globalloginemail');
					WTW.deleteCookie('globalloginpassword');
					WTW.deleteCookie('globalloginremember');
				}
				var zserverip = dGet('wtw_serverip').value;
				var zrequest = {
					'useremail':btoa(zemail),
					'password':btoa(zpassword),
					'serverip':btoa(zserverip),
					'function':'login'
				};
				WTW.postJSON("https://3dnet.walktheweb.com/connect/authenticate.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						var zuserid = '';
						var zdisplayname = '';
						var zuseremail = '';
						var zusertoken = '';
						var zwtwusertoken = '';
						if (zresponse.userid != undefined) {
							zuserid = zresponse.userid;
						}
						if (zresponse.displayname != undefined) {
							zdisplayname = zresponse.displayname;
						}
						if (zresponse.useremail != undefined) {
							zuseremail = zresponse.useremail;
						}
						if (zresponse.usertoken != undefined) {
							zusertoken = zresponse.usertoken;
						}
						if (zresponse.wtwusertoken != undefined) {
							zwtwusertoken = zresponse.wtwusertoken;
						}
						
						if (zusertoken.length > 100 || zuserid != '') {
							dGet('wtw_tusertoken').value = zusertoken;
							dGet('wtw_tglobaluserid').value = zwtwusertoken;
							dGet('wtw_tuserid').value = zuserid;
							dGet('wtw_tuseremail').value = zuseremail;
							WTW.closeLoginHUD();
							var zrequest = {
								'globaluserid':zwtwusertoken,
								'usertoken':zusertoken,
								'displayname':btoa(zdisplayname),
								'useremail':zuseremail,
								'function':'globallogin'
							};
							WTW.postAsyncJSON('/core/handlers/users.php', zrequest,
								function(zresponse) {
									zresponse = JSON.parse(zresponse);
									/* continue if no errors */
									if (WTW.globalLoginResponse(zresponse)) {
										WTW.openLocalLogin('Select Avatar',.4,.9);
									}
								}
							);
						} else {
							/* there is an error */
							serror = zresponse.serror;
							dGet('wtw_tuserid').value = '';
							dGet('wtw_tuseremail').value = '';
							dGet('wtw_tdisplayname').value = '';
							dGet('wtw_mainmenudisplayname').innerHTML = 'Login';
							dGet('wtw_menudisplayname').innerHTML = 'Login';
							dGet('wtw_tuserimageurl').value = '';
							dGet('wtw_profileimagelg').src = '/content/system/images/menuprofilebig.png';
							dGet('wtw_profileimagesm').src = '/content/system/images/menuprofile32.png';

							WTW.log("Login Error = " + serror);
							var zinvalidlogin = WTW.getMeshOrNodeByID('hudlogin-invalidlogin');
							var zfocus = false;
							var zremember = WTW.getMeshOrNodeByID('hudlogin-check-remember');
							var zrememberborder = WTW.getMeshOrNodeByID('hudlogin-check-rememberborder');
							var zrememberborderfocus = WTW.getMeshOrNodeByID('hudlogin-check-rememberborderfocus');
							var zremembertext = WTW.getMeshOrNodeByID('hudlogin-check-remembertext');
							var zremember3dtext = WTW.getMeshOrNodeByID('hudlogin-check-remember-text');
							if (zinvalidlogin != null) {
								zinvalidlogin.isVisible = true;
							}
							if (zremember != null) {
								zremember.isVisible = false;
							}
							if (zrememberborder != null) {
								zrememberborder.isVisible = false;
							}
							if (zrememberborderfocus != null) {
								zfocus = zrememberborderfocus.isVisible;
								zrememberborderfocus.isVisible = false;
							}
							if (zremembertext != null) {
								zremembertext.isVisible = false;
							}
							if (zremember3dtext != null) {
								zremember3dtext.isVisible = false;
							}
							window.setTimeout(function(){
								zinvalidlogin = WTW.getMeshOrNodeByID('hudlogin-invalidlogin');
								zremember = WTW.getMeshOrNodeByID('hudlogin-check-remember');
								zrememberborder = WTW.getMeshOrNodeByID('hudlogin-check-rememberborder');
								zrememberborderfocus = WTW.getMeshOrNodeByID('hudlogin-check-rememberborderfocus');
								zremembertext = WTW.getMeshOrNodeByID('hudlogin-check-remembertext');
								zremember3dtext = WTW.getMeshOrNodeByID('hudlogin-check-remember-text');
								if (zinvalidlogin != null) {
									zinvalidlogin.isVisible = false;
								}
								if (zremember != null) {
									zremember.isVisible = true;
								}
								if (zfocus) {
									if (zrememberborderfocus != null) {
										zrememberborderfocus.isVisible = true;
									}
								} else {
									if (zrememberborder != null) {
										zrememberborder.isVisible = true;
									}
								}
								if (zremembertext != null) {
									zremembertext.isVisible = true;
								}
								if (zremember3dtext != null) {
									zremember3dtext.isVisible = true;
								}
							},5000);
						}
					}
				);
			} else {
				if (zremembercheck) {
					WTW.setCookie('localloginemail', zemail, 365);
					WTW.setCookie('localloginpassword', btoa(zpassword), 365);
					WTW.setCookie('localloginremember', zremembercheck, 365);
				} else {
					WTW.deleteCookie('localloginemail');
					WTW.deleteCookie('localloginpassword');
					WTW.deleteCookie('localloginremember');
				}
				var zrequest = {
					'useremail':zemail,
					'password':btoa(zpassword),
					'function':'login'
				};
				WTW.postAsyncJSON('/core/handlers/users.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						WTW.hudLoginLoginResponse(zresponse);
					}
				);
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginLogin=' + ex.message);
	}
}

WTWJS.prototype.hudLoginLoginResponse = function(zresponse) {
	/* process login response */
	try {
		var serror = '';
		if (zresponse != null) {
			if (zresponse.serror != undefined) {
				if (zresponse.serror != '') {
					/* there is an error */
					serror = zresponse.serror;
					dGet('wtw_tuserid').value = '';
					dGet('wtw_tuseremail').value = '';
					dGet('wtw_tdisplayname').value = '';
					dGet('wtw_mainmenudisplayname').innerHTML = 'Login';
					dGet('wtw_menudisplayname').innerHTML = 'Login';
					dGet('wtw_tuserimageurl').value = '';
					dGet('wtw_profileimagelg').src = '/content/system/images/menuprofilebig.png';
					dGet('wtw_profileimagesm').src = '/content/system/images/menuprofile32.png';
				}
				if (zresponse.userid != '') {
					/* successful login */
					WTW.closeLoginHUD();
					WTW.setLoginValues(zresponse.userid, zresponse.displayname, zresponse.email, zresponse.userimageurl);
					if (WTW.enableEmailValidation == 1) {
						WTW.checkEmailValidation(zresponse.email);
					} else {
						WTW.openLocalLogin('Select Avatar',.4,.9);
					}
				}
			}
		}
		/* show error if there is one */
		if (serror != '') {
			WTW.log("Login Error = " + serror);
			var zinvalidlogin = WTW.getMeshOrNodeByID('hudlogin-invalidlogin');
			var zfocus = false;
			var zremember = WTW.getMeshOrNodeByID('hudlogin-check-remember');
			var zrememberborder = WTW.getMeshOrNodeByID('hudlogin-check-rememberborder');
			var zrememberborderfocus = WTW.getMeshOrNodeByID('hudlogin-check-rememberborderfocus');
			var zremembertext = WTW.getMeshOrNodeByID('hudlogin-check-remembertext');
			var zremember3dtext = WTW.getMeshOrNodeByID('hudlogin-check-remember-text');
			if (zinvalidlogin != null) {
				zinvalidlogin.isVisible = true;
			}
			if (zremember != null) {
				zremember.isVisible = false;
			}
			if (zrememberborder != null) {
				zrememberborder.isVisible = false;
			}
			if (zrememberborderfocus != null) {
				zfocus = zrememberborderfocus.isVisible;
				zrememberborderfocus.isVisible = false;
			}
			if (zremembertext != null) {
				zremembertext.isVisible = false;
			}
			if (zremember3dtext != null) {
				zremember3dtext.isVisible = false;
			}
			window.setTimeout(function(){
				zinvalidlogin = WTW.getMeshOrNodeByID('hudlogin-invalidlogin');
				zremember = WTW.getMeshOrNodeByID('hudlogin-check-remember');
				zrememberborder = WTW.getMeshOrNodeByID('hudlogin-check-rememberborder');
				zrememberborderfocus = WTW.getMeshOrNodeByID('hudlogin-check-rememberborderfocus');
				zremembertext = WTW.getMeshOrNodeByID('hudlogin-check-remembertext');
				zremember3dtext = WTW.getMeshOrNodeByID('hudlogin-check-remember-text');
				if (zinvalidlogin != null) {
					zinvalidlogin.isVisible = false;
				}
				if (zremember != null) {
					zremember.isVisible = true;
				}
				if (zfocus) {
					if (zrememberborderfocus != null) {
						zrememberborderfocus.isVisible = true;
					}
				} else {
					if (zrememberborder != null) {
						zrememberborder.isVisible = true;
					}
				}
				if (zremembertext != null) {
					zremembertext.isVisible = true;
				}
				if (zremember3dtext != null) {
					zremember3dtext.isVisible = true;
				}
			},5000);
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginLoginResponse=' + ex.message);
	}
}

WTWJS.prototype.hudLoginCreate = function() {
	/* run create Login */
	try {
		var zemail = dGet('hudlogin-email-email-textbox').value;
		var zpassword = dGet('hudlogin-password-password-textbox').value;
		var zpassword2 = dGet('hudlogin-password-password2-textbox').value;
		let zinvalidemail = WTW.getMeshOrNodeByID('hudlogin-invalidemail');
		let zinvalidpasswords = WTW.getMeshOrNodeByID('hudlogin-invalidpasswords');
		let ztitlecreatewtw = WTW.getMeshOrNodeByID('hudlogin-titlecreatewtw');
		let zfocus = false;
		let zlocal = true;
		if (ztitlecreatewtw != null) {
			if (ztitlecreatewtw.isVisible) {
				zlocal = false;
			}
		}
		if (WTW.isEmail(zemail) == false) {
			if (zinvalidemail != null) {
				zinvalidemail.isVisible = true;
				window.setTimeout(function(){
					zinvalidemail = WTW.getMeshOrNodeByID('hudlogin-invalidemail');
					if (zinvalidemail != null) {
						zinvalidemail.isVisible = false;
					}
				},5000);
			}
		} else if (zpassword != zpassword2) {
			if (zinvalidpasswords != null) {
				zinvalidpasswords.isVisible = true;
				window.setTimeout(function(){
					zinvalidpasswords = WTW.getMeshOrNodeByID('hudlogin-invalidpasswords');
					if (zinvalidpasswords != null) {
						zinvalidpasswords.isVisible = false;
					}
				},5000);
			}
		} else {
			if (zinvalidemail != null) {
				zinvalidemail.isVisible = false;
			}
			if (zlocal == false) {
				var zserverip = dGet('wtw_serverip').value;
				var zdisplayname = '';
				var zemailparts = zemail.split('@');
				zdisplayname = zemailparts[0];
				var zrequest = {
					'useremail':btoa(zemail),
					'password':btoa(zpassword),
					'password2':btoa(zpassword2),
					'displayname':btoa(zdisplayname),
					'serverip':btoa(zserverip),
					'function':'register'
				};
				WTW.postJSON("https://3dnet.walktheweb.com/connect/authenticate.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						var zuserid = '';
						var zdisplayname = '';
						var zuseremail = '';
						var zusertoken = '';
						var zwtwusertoken = '';
						if (zresponse.userid != undefined) {
							zuserid = zresponse.userid;
						}
						if (zresponse.displayname != undefined) {
							zdisplayname = zresponse.displayname;
						}
						if (zresponse.useremail != undefined) {
							zuseremail = zresponse.useremail;
						}
						if (zresponse.usertoken != undefined) {
							zusertoken = zresponse.usertoken;
						}
						if (zresponse.wtwusertoken != undefined) {
							zwtwusertoken = zresponse.wtwusertoken;
						}
						
						if (zusertoken.length > 100 || zuserid != '') {
							dGet('wtw_tusertoken').value = zusertoken;
							dGet('wtw_tglobaluserid').value = zwtwusertoken;
							dGet('wtw_tuserid').value = zuserid;
							dGet('wtw_tuseremail').value = zuseremail;
							WTW.closeLoginHUD();
							var zrequest = {
								'globaluserid':zwtwusertoken,
								'usertoken':zusertoken,
								'displayname':btoa(zdisplayname),
								'useremail':zuseremail,
								'function':'globallogin'
							};
							WTW.postAsyncJSON('/core/handlers/users.php', zrequest,
								function(zresponse) {
									zresponse = JSON.parse(zresponse);
									/* continue if no errors */
									if (WTW.globalLoginResponse(zresponse)) {
										WTW.openLocalLogin('Select Avatar',.4,.9);
									}
								}
							);
						} else {
							/* there is an error */
							serror = zresponse.serror;
							dGet('wtw_tuserid').value = '';
							dGet('wtw_tuseremail').value = '';
							dGet('wtw_tdisplayname').value = '';
							dGet('wtw_mainmenudisplayname').innerHTML = 'Login';
							dGet('wtw_menudisplayname').innerHTML = 'Login';
							dGet('wtw_tuserimageurl').value = '';
							dGet('wtw_profileimagelg').src = '/content/system/images/menuprofilebig.png';
							dGet('wtw_profileimagesm').src = '/content/system/images/menuprofile32.png';

							WTW.log("Login Error = " + serror);
							var zinvalidlogin = WTW.getMeshOrNodeByID('hudlogin-invalidlogin');
							var zfocus = false;
							if (zinvalidlogin != null) {
								zinvalidlogin.isVisible = true;
							}
							window.setTimeout(function(){
								zinvalidlogin = WTW.getMeshOrNodeByID('hudlogin-invalidlogin');
								if (zinvalidlogin != null) {
									zinvalidlogin.isVisible = false;
								}
							},5000);
						}
					}
				);
			} else {
				var zdisplayname = '';
				var zemailparts = zemail.split('@');
				zdisplayname = zemailparts[0];
				var zrequest = {
					'displayname':btoa(zdisplayname),
					'useremail':zemail,
					'password':btoa(zpassword),
					'function':'register'
				};
				WTW.postAsyncJSON('/core/handlers/users.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						WTW.hudLoginCreateResponse(zresponse);
					}
				);
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginCreate=' + ex.message);
	}
}

WTWJS.prototype.hudLoginCreateResponse = function(zresponse) {
	/* process login response */
	try {
		var serror = '';
		if (zresponse != null) {
			if (zresponse.serror != undefined) {
				if (zresponse.serror != '') {
					/* there is an error */
					serror = zresponse.serror;
					dGet('wtw_tuserid').value = '';
					dGet('wtw_tuseremail').value = '';
					dGet('wtw_tdisplayname').value = '';
					dGet('wtw_mainmenudisplayname').innerHTML = 'Login';
					dGet('wtw_menudisplayname').innerHTML = 'Login';
					dGet('wtw_tuserimageurl').value = '';
					dGet('wtw_profileimagelg').src = '/content/system/images/menuprofilebig.png';
					dGet('wtw_profileimagesm').src = '/content/system/images/menuprofile32.png';
				}
				if (zresponse.userid != '') {
					/* successful login */
					WTW.closeLoginHUD();
					WTW.setLoginValues(zresponse.userid, zresponse.displayname, zresponse.email, zresponse.userimageurl);

					if (WTW.enableEmailValidation == 1) {
						WTW.checkEmailValidation(zresponse.email);
					} else {
						WTW.openLocalLogin('Select Avatar',.4,.9);
					}
				}
			}
		}
		/* show error if there is one */
		if (serror != '') {
			WTW.log("Email Error = " + serror);
			var zinvalidemailinuse = WTW.getMeshOrNodeByID('hudlogin-invalidemailinuse');
			var zfocus = false;
			if (zinvalidemailinuse != null) {
				zinvalidemailinuse.isVisible = true;
			}
			window.setTimeout(function(){
				zinvalidemailinuse = WTW.getMeshOrNodeByID('hudlogin-invalidemailinuse');
				if (zinvalidemailinuse != null) {
					zinvalidemailinuse.isVisible = false;
				}
			},5000);
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginCreateResponse=' + ex.message);
	}
}


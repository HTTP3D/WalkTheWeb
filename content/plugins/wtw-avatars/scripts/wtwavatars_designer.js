/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* avatar designer scripts - works menus and avatar settings */
/* global values used for the avatar designer only (page loads as iframe) */

var scene, canvas, engine, camera, gui;
var wtw_avatarselector, wtw_leftmenu, wtw_rightmenu, wtw_rightmenulower, wtw_colormenu, wtw_colorpicker, wtw_activeinput, wtw_loadingtext, wtw_loadingtimer, wtw_activemenu;
var wtw_runningevent = '';
var wtw_lasteditavatarid = '';
var wtw_editmode = false;
var wtw_baseanimationframes = 0;
var wtw_showglobal = true;
var wtw_avatardef = null;

WTWJS.prototype.createScene = function() {
	/* create the avatar designer scene - lighting designed to match the default WalkTheWeb scene */
	try {
		console.log('%c\r\n\r\nWalkTheWeb 3D Avatar Designer\r\nHTTP3D Inc. (v1.0.1) 08-29-2022', 'color:green;font-weight:bold;');
		if (BABYLON.Engine.isSupported()) {
			WTW.loadAnimations();
			var zinstanceid = WTW.getCookie('instanceid');
			if (dGet('wtw_tinstanceid').value == '' && zinstanceid != null) {
				if (zinstanceid.length == 24) {
					dGet('wtw_tinstanceid').value = zinstanceid;
				}
			}
			if (dGet('wtw_tinstanceid').value.length != 24) {
				zinstanceid = WTW.getRandomString(24);
				dGet('wtw_tinstanceid').value = zinstanceid;
			}
			WTW.setCookie('instanceid', zinstanceid, 365);
			scene = new BABYLON.Scene(engine);
			scene.autoClear = false;
			scene.autoClearDepthAndStencil = false;
			scene.ambientColor = new BABYLON.Color3(.3, .3, .3);

			camera = new BABYLON.ArcRotateCamera('ArcRotateCamera', BABYLON.Tools.ToRadians(0), Math.PI/2, 30, new BABYLON.Vector3(0,0,0), scene);
			camera.attachControl(canvas, true);

			/* direct light immitating the sun */
			WTW.sun = new BABYLON.DirectionalLight('sun', new BABYLON.Vector3(-1, -1, -1), scene);
			WTW.sun.position = new BABYLON.Vector3(-50, 500, 0);
			WTW.sun.intensity = 1;
			WTW.sun.shadowMinZ = 1;
			WTW.sun.shadowMaxZ = 4000;
			WTW.sun.ambient = new BABYLON.Color3(.4, .4, .4);
			WTW.sun.diffuse = new BABYLON.Color3(.4, .4, .4);
			WTW.sun.specular = new BABYLON.Color3(.2, .2, .2);
			WTW.sun.groundColor = new BABYLON.Color3(.1, .1, .1);

			/* lesser light for back sides */
//			WTW.backLight = new BABYLON.DirectionalLight('backlight', new BABYLON.Vector3(1, -1, 1), scene);
//			WTW.backLight.intensity = WTW.sun.intensity / 1.5; //3;
			
			var zsetupparent = new BABYLON.TransformNode('setupparent-0');
			zsetupparent.position = new BABYLON.Vector3(0, -5, 0);
			zsetupparent.rotation = new BABYLON.Vector3(0,0,0);
			zsetupparent.scaling = new BABYLON.Vector3(1,1,1);

			var zbgsphere = BABYLON.MeshBuilder.CreateSphere('bgsphere', {segments: 16, diameter:1, updatable: true, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
			zbgsphere.scaling = new BABYLON.Vector3(600, 600, 600); 
			zbgsphere.isPickable = false;

			WTW.mouseOver = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, WTW.mouseOverMold);
			WTW.mouseOut = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, WTW.mouseOutMold);
			scene.actionManager = new BABYLON.ActionManager(scene);
			
			gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
			
			var zuseravatarid = WTW.getQuerystring('useravatarid','');
			var zglobaluseravatarid = WTW.getQuerystring('globaluseravatarid','');
			var zglobaluserid = WTW.getQuerystring('globaluserid','');
			dGet('wtw_tuseravatarid').value = zuseravatarid;
			dGet('wtw_tglobaluseravatarid').value = zglobaluseravatarid;
			dGet('wtw_tglobaluserid').value = zglobaluserid;
			if (zglobaluseravatarid != '' || dGet('wtw_tglobaluserid').value != '') {
				dGet('wtw_tglobalavatar').value = '1';
			} else {
				dGet('wtw_tglobalavatar').value = '0';
			}
			if (zuseravatarid != '') {
				WTW.loadDesignerAvatar(zglobaluseravatarid, zuseravatarid);
			} else {
				window.setTimeout(function() {
					if (dGet('wtw_tavatarid').value != '') {
						WTW.loadLeftMenu(1);
						WTW.preloadAvatar(dGet('wtw_tavatarid').value);
					} else {
						WTW.loadLeftMenu(0);
					}
				}, 1000);
			}
		} else {
			WTW.log('WebGL not supported');
		}
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-createScene=' + ex.message);
	}
}

WTWJS.prototype.loadLeftMenu = function(zactive) {
	/* load the left menu, zactive sets the menu items to load */
	try {
		if (zactive == undefined || zactive == null) {
			zactive = 1;
		}
		WTW.closeMenu();
		if (zactive != 3 && wtw_runningevent != '' && WTW.myAvatar.WTW.animations.running[wtw_runningevent] != undefined) {
			WTW.myAvatar.WTW.animations.running[wtw_runningevent].weight = 0;
			WTW.myAvatar.WTW.animations.running['onwait'].weight = 1;
			wtw_runningevent = '';
			dGet('wtw_tavataranimationevent').value = '';
			dGet('wtw_tanimationfriendlyname').value = '';
			dGet('wtw_tanimationind').value = '';
		}
		dGet('wtw_activemenu').value = zactive;
		wtw_leftmenu = new BABYLON.GUI.Grid();
		wtw_leftmenu.width = '330px';
		wtw_leftmenu.height = '450px';
		wtw_leftmenu.leftInPixels = 20;
		wtw_leftmenu.addColumnDefinition(1);
		wtw_leftmenu.addRowDefinition(1/5);
		wtw_leftmenu.addRowDefinition(1/5);
		wtw_leftmenu.addRowDefinition(1/5);
		wtw_leftmenu.addRowDefinition(1/5);
		wtw_leftmenu.addRowDefinition(1/5);
		wtw_leftmenu.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
		wtw_leftmenu.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
		gui.addControl(wtw_leftmenu);
		
		/* select my avatar button */
		var zbutton0 = BABYLON.GUI.Button.CreateImageWithCenterTextButton('selectavatar-button', 'Select My Avatar', 'image');
		zbutton0.width = '330px';
		zbutton0.height = '60px';
		if (zactive  == 0) {
			/* set active button blue with yellow text */
			zbutton0.color = 'yellow';
			zbutton0.background = 'blue';
			if (dGet('wtw_tavatarid').value == '') {
				zbutton0.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(0);});
			} else {
				zbutton0.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(1);});
			}
		} else {
			zbutton0.color = 'white';
			zbutton0.background = 'green';
			zbutton0.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(0);});
		}
		wtw_leftmenu.addControl(zbutton0, 1, 0);
		
		if (dGet('wtw_tavatarid').value != '') {
			/* avatar profile button */
			var zbutton1 = BABYLON.GUI.Button.CreateImageWithCenterTextButton('avatarprofile-button', 'Avatar Profile', 'image');
			zbutton1.width = '330px';
			zbutton1.height = '60px';
			if (zactive  == 1) {
				/* set active button blue with yellow text */
				zbutton1.color = 'yellow';
				zbutton1.background = 'blue';
			} else {
				zbutton1.color = 'white';
				zbutton1.background = 'green';
			}
			zbutton1.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(1);});
			wtw_leftmenu.addControl(zbutton1, 0, 0);

			/* avatar colors button */
			var zbutton2 = BABYLON.GUI.Button.CreateImageWithCenterTextButton('avatarcolors-button', 'Avatar Colors', 'image');
			zbutton2.width = '330px';
			zbutton2.height = '60px';
			if (zactive  == 2) {
				/* set active button blue with yellow text */
				zbutton2.color = 'yellow';
				zbutton2.background = 'blue';
				zbutton2.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(1);});
			} else {
				zbutton2.color = 'white';
				zbutton2.background = 'green';
				zbutton2.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(2);});
			}
			wtw_leftmenu.addControl(zbutton2, 2, 0);

			/* avatar animations button */
			var zbutton3 = BABYLON.GUI.Button.CreateImageWithCenterTextButton('avataranimations-button', 'Avatar Animations', 'image');
			zbutton3.width = '330px';
			zbutton3.height = '60px';
			if (zactive  == 3) {
				/* set active button blue with yellow text */
				zbutton3.color = 'yellow';
				zbutton3.background = 'blue';
				zbutton3.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(1);});
			} else {
				zbutton3.color = 'white';
				zbutton3.background = 'green';
				zbutton3.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(3);});
			}
			wtw_leftmenu.addControl(zbutton3, 3, 0);

			/* save and continue button */
			var zbutton4 = BABYLON.GUI.Button.CreateImageWithCenterTextButton('save-button', 'Save and Continue', 'image');
			zbutton4.width = '330px';
			zbutton4.height = '60px';
			if (zactive  == 4) {
				zbutton4.color = 'yellow';
				zbutton4.background = 'blue';
			} else {
				zbutton4.color = 'white';
				zbutton4.background = 'green';
			}
			zbutton4.onPointerClickObservable.add(function(ev, state) {WTW.saveMyAvatar();WTW.loadLeftMenu(4);});
			wtw_leftmenu.addControl(zbutton4, 4, 0);
		}
		WTW.loadRightMenu(zactive);
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-loadLeftMenu=' + ex.message);
	}
}

WTWJS.prototype.loadRightMenu = function(zactive) {
	/* load the right menu, zactive sets the menu items to load */
	try {
		if (zactive == undefined) {
			zactive = -1;
		}
		wtw_activemenu = zactive;
		if (wtw_rightmenu != null) {
			wtw_rightmenu.dispose();
			wtw_rightmenu = null;
			if (wtw_loadingtimer != null) {
				window.clearTimeout(wtw_loadingtimer);
				wtw_loadingtimer = null;
			}
		}
		wtw_rightmenu = new BABYLON.GUI.Grid();
		wtw_rightmenu.rightInPixels = 20;
		wtw_rightmenu.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
		wtw_rightmenu.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
	
		switch (zactive) {
			case 0:   /* select avatar options */
				wtw_rightmenu.width = '330px';
				wtw_rightmenu.height = '200px';
				WTW.chooseAvatar();
				break;
			case 1:   /* select avatar profile settings */
				if (dGet('wtw_tavatarid').value != '') {
					wtw_rightmenu.width = '330px';
					wtw_rightmenu.height = '400px';
					wtw_rightmenu.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
					wtw_rightmenu.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
					wtw_rightmenu.addColumnDefinition(1);
					wtw_rightmenu.addRowDefinition(1/8);
					wtw_rightmenu.addRowDefinition(1/8);
					wtw_rightmenu.addRowDefinition(1/8);
					wtw_rightmenu.addRowDefinition(1/8);
					wtw_rightmenu.addRowDefinition(1/8);
					wtw_rightmenu.addRowDefinition(1/8);
					wtw_rightmenu.addRowDefinition(1/8);
					wtw_rightmenu.addRowDefinition(1/8);
					
					var ztext1 = new BABYLON.GUI.TextBlock();
					ztext1.text = 'Display Name:';
					ztext1.color = 'white';
					ztext1.fontSize = 24;
					ztext1.height = '30px';
					wtw_rightmenu.addControl(ztext1, 0, 0);
					
					var zdisplayname = dGet('wtw_tnewavatardisplayname').value;
					if (zdisplayname == '') {
						zdisplayname = 'Anonymous';
					}
					var zinput = new BABYLON.GUI.InputText();
					zinput.promptMessage = 'Display Name';
					zinput.width = '300px';
					zinput.height = '40px';
					zinput.text = zdisplayname;
					zinput.color = 'white';
					zinput.background = '#2F4720';
					zinput.onFocusSelectAll = true;
					zinput.onTextChangedObservable.add(function(value) {WTW.updateDisplayName(value.text);});
					wtw_rightmenu.addControl(zinput, 1, 0);
					
					if (wtw_showglobal) {
						var zbutton1 = new BABYLON.GUI.RadioButton();
						zbutton1.name = 'globalavatar';
						zbutton1.width = '30px';
						zbutton1.height = '30px';
						zbutton1.color = 'white';
						zbutton1.group = 'global';
						var ztext2 = new BABYLON.GUI.TextBlock();
						if (dGet('wtw_tglobaluserid').value != '') {
							zbutton1.isChecked = true;
							WTW.updateGlobalAvatar('1');
							zbutton1.background = 'green';
							zbutton1.onIsCheckedChangedObservable.add(function(state) {if (state) {WTW.updateGlobalAvatar('1');}}); 
							ztext2.text = 'Works on most WalkTheWeb 3D Websites Globally';
							ztext2.color = '#afafaf';
						} else {
							zbutton1.isChecked = false;
							WTW.updateGlobalAvatar('0');
							zbutton1.background = 'red';
							zbutton1.onIsCheckedChangedObservable.add(function(state) {if (state) {WTW.updateGlobalAvatar('0');state.checked=false;}}); 
							ztext2.text = 'Requires Global Login';
							ztext2.color = 'red';
						}
						var zlabel1 = BABYLON.GUI.Control.AddHeader(zbutton1, 'WalkTheWeb Global Avatar', '270px', { isHorizontal: true, controlFirst: true });
						zlabel1.height = '40px';
						zlabel1.width = '270px';
						zlabel1.color = 'white';
						wtw_rightmenu.addControl(zlabel1, 3, 0);

						ztext2.fontSize = 20;
						ztext2.height = '100px';
						ztext2.textWrapping = true;
						ztext2.textHorizontalAlignment = 3;
						wtw_rightmenu.addControl(ztext2, 4, 0);

						var zbutton2 = new BABYLON.GUI.RadioButton();
						zbutton2.name = 'localavatar';
						zbutton2.width = '30px';
						zbutton2.height = '30px';
						zbutton2.color = 'white';
						zbutton2.background = 'green';     
						zbutton2.group = 'global';
						if (dGet('wtw_tglobaluserid').value == '') {
							zbutton2.isChecked = true;
						}
						zbutton2.onIsCheckedChangedObservable.add(function(state) {if (state) {WTW.updateGlobalAvatar('0');}}); 
						var zlabel2 = BABYLON.GUI.Control.AddHeader(zbutton2, 'Local 3D Website Avatar', '270px', { isHorizontal: true, controlFirst: true });
						zlabel2.height = '40px';
						zlabel2.width = '270px';
						zlabel2.color = 'white';
						wtw_rightmenu.addControl(zlabel2, 6, 0);

						var ztext3 = new BABYLON.GUI.TextBlock();
						ztext3.text = 'Works on Local 3D Websites on the same Web Server';
						ztext3.color = '#afafaf';
						ztext3.fontSize = 20;
						ztext3.height = '100px';
						ztext3.textWrapping = true;
						ztext3.textHorizontalAlignment = 3;
						wtw_rightmenu.addControl(ztext3, 7, 0);
					}
				}
				break;
			case 2:   /* avatar colors settings */
				if (dGet('wtw_tavatarid').value != '') {
					if (wtw_colormenu != null) {
						wtw_colormenu.dispose();
					}
					wtw_colormenu = new BABYLON.GUI.Grid();
					wtw_colormenu.topInPixels = 75;
					wtw_colormenu.rightInPixels = 340;
					wtw_colormenu.width = '510px';
					wtw_colormenu.height = '150px';
					wtw_colormenu.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
					wtw_colormenu.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
					wtw_colormenu.addColumnDefinition(1/3);
					wtw_colormenu.addColumnDefinition(1/3);
					wtw_colormenu.addColumnDefinition(1/3);
					wtw_colormenu.addRowDefinition(1);
				
					wtw_rightmenu.topInPixels = 20;
					wtw_rightmenu.width = '330px';
					if (WTW.avatarParts != null) {
						if (WTW.avatarParts.length > 0) {
							wtw_rightmenu.height = ((WTW.avatarParts.length + 2.5) * 100) + 'px';
							wtw_rightmenu.addColumnDefinition(2/3);
							wtw_rightmenu.addColumnDefinition(1/3);
							wtw_rightmenu.addRowDefinition(1/(WTW.avatarParts.length + 1));
							for (var i=0;i<WTW.avatarParts.length;i++) {
								if (WTW.avatarParts[i] != null) {
									wtw_rightmenu.addRowDefinition(1/(WTW.avatarParts.length + 1));
								}
							}
							WTW.avatarParts.sort(function(a,b){return a.part < b.part ? -1 : 1}); 
						}
					}
					var zmoldname = WTW.getMyAvatarPart(dGet('wtw_tavatarpart').value);
					dGet('wtw_tmoldname').value = zmoldname;
					var zmold = WTW.getMeshOrNodeByID(zmoldname);
					if (wtw_colorpicker == null) {
						wtw_colorpicker = new BABYLON.GUI.ColorPicker();
						wtw_colorpicker.name = 'avatarcolorpicker';
						wtw_colorpicker.id = 'avatarcolorpicker';
						if (zmold != null) {
							if (dGet('wtw_tcolortype').value  == 'Diffuse') {
								wtw_colorpicker.value = zmold.material.diffuseColor;
							} else {
								wtw_colorpicker.value = zmold.material.emissiveColor;
							}
						} else {
							wtw_colorpicker.value = new BABYLON.Vector3(1, 1, 1);
						}
						wtw_colorpicker.height = '150px';
						wtw_colorpicker.width = '150px';
						wtw_colorpicker.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
						wtw_colorpicker.onValueChangedObservable.add(function(value) {
							if (value != null) {
								WTW.setMyAvatarColor(value.r, value.g, value.b);
							}
						});
					}
					wtw_colormenu.addControl(wtw_colorpicker,0,0);

					var zdiffusebutton = BABYLON.GUI.Button.CreateImageWithCenterTextButton('diffuse-button', 'Diffuse', 'image');
					zdiffusebutton.width = '210px';
					zdiffusebutton.height = '50px';
					if (dGet('wtw_tcolortype').value  == 'Diffuse') {
						zdiffusebutton.color = 'yellow';
						zdiffusebutton.background = 'blue';
					} else {
						zdiffusebutton.color = 'white';
						zdiffusebutton.background = 'green';
					}
					zdiffusebutton.onPointerClickObservable.add(function(ev, state) { dGet('wtw_tcolortype').value='Diffuse';WTW.loadLeftMenu(2);});
					wtw_rightmenu.addControl(zdiffusebutton, 0, 0);

					var zemissivebutton = BABYLON.GUI.Button.CreateImageWithCenterTextButton('emissive-button', 'Emissive', 'image');
					zemissivebutton.width = '210px';
					zemissivebutton.height = '50px';
					if (dGet('wtw_tcolortype').value  == 'Emissive') {
						zemissivebutton.color = 'yellow';
						zemissivebutton.background = 'blue';
					} else {
						zemissivebutton.color = 'white';
						zemissivebutton.background = 'green';
					}
					zemissivebutton.onPointerClickObservable.add(function(ev, state) { dGet('wtw_tcolortype').value='Emissive';WTW.loadLeftMenu(2);});
					wtw_rightmenu.addControl(zemissivebutton, 0, 1);

					if (WTW.avatarParts != null) {
						for (var i=0;i<WTW.avatarParts.length;i++) {
							if (WTW.avatarParts[i] != null) {
								wtw_rightmenu.addRowDefinition(1/(WTW.avatarParts.length + 1));
								var zbutton1 = BABYLON.GUI.Button.CreateImageWithCenterTextButton(WTW.avatarParts[i].part + '-color-button', WTW.avatarParts[i].part, 'image');
								zbutton1.width = '210px';
								zbutton1.height = '50px';
								if (dGet('wtw_tavatarpart').value  == WTW.avatarParts[i].part) {
									zbutton1.color = 'black';
									zbutton1.background = 'yellow';
								} else {
									zbutton1.color = 'black';
									zbutton1.background = 'white';
								}
								zbutton1.onPointerClickObservable.add(function(ev, state) {WTW.getMyAvatarPart(state.currentTarget.name.split('-')[0]);WTW.loadLeftMenu(2);});
								wtw_rightmenu.addControl(zbutton1, i+1, 0);
								
								var zhex = WTW.avatarParts[i].emissivecolor;
								if (dGet('wtw_tcolortype').value  == 'Diffuse') {
									zhex = WTW.avatarParts[i].diffusecolor;
								}

								if (dGet('wtw_tavatarpart').value  == WTW.avatarParts[i].part) {
									wtw_activeinput = new BABYLON.GUI.InputText(WTW.avatarParts[i].part + '-color-input');
									wtw_activeinput.promptMessage = 'Color (hex)';
									wtw_activeinput.width = '110px';
									wtw_activeinput.height = '50px';
									wtw_activeinput.text = zhex;
									wtw_activeinput.color = WTW.setTextColor(zhex, '#ffffff', '#000000');
									wtw_activeinput.background = zhex;
									wtw_activeinput.focusedBackground = '#000000';
									if (wtw_activeinput.color == '#000000') {
										wtw_activeinput.focusedBackground = '#ffffff';
									}
									wtw_activeinput.onFocusSelectAll = true;
									wtw_activeinput.onBlurObservable.add(function(value) {WTW.updateColorByHex(value.text);});
									wtw_activeinput.onTextPasteObservable.add(function(value) {WTW.updateColorByHex(value.text);});
									wtw_rightmenu.addControl(wtw_activeinput, i+1, 1);
								} else {
									var zinputtext = new BABYLON.GUI.InputText(WTW.avatarParts[i].part + '-color-input');
									zinputtext.promptMessage = 'Color (hex)';
									zinputtext.width = '110px';
									zinputtext.height = '50px';
									zinputtext.text = zhex;
									zinputtext.color = WTW.setTextColor(zhex, '#ffffff', '#000000');
									zinputtext.background = zhex;
									zinputtext.focusedBackground = '#000000';
									if (zinputtext.color == '#000000') {
										zinputtext.focusedBackground = '#ffffff';
									}
									zinputtext.onPointerClickObservable.add(function(ev, state) {WTW.getMyAvatarPart(state.currentTarget.name.split('-')[0]);WTW.loadLeftMenu(2);});
									wtw_rightmenu.addControl(zinputtext, i+1, 1);
								}
							}
						}
					}
					gui.addControl(wtw_colormenu);
				}
				break;
			case 3:   /* avatar animation settings */
				if (dGet('wtw_tavatarid').value != '') {
					wtw_rightmenu.topInPixels = 10;
					wtw_rightmenu.rightInPixels = 20;
					wtw_rightmenu.width = '350px';
					wtw_rightmenu.height = '60px';
					wtw_rightmenu.addColumnDefinition(2/3);
					wtw_rightmenu.addColumnDefinition(1/3);
					wtw_rightmenu.addRowDefinition(1);
					if (wtw_editmode && dGet('wtw_teditanimationevent').value == '') {
						if (dGet('wtw_tavataranimationevent').value != '') {
							dGet('wtw_teditanimationevent').value = dGet('wtw_tavataranimationevent').value;
						} else {
							dGet('wtw_teditanimationevent').value = 'onwalk';
						}
					}
					var zanimationname = 'Walk';
					if (wtw_editmode) {
						zanimationname = WTW.getAnimationEventName(dGet('wtw_teditanimationevent').value);
					}
					if (dGet('wtw_teditanimationevent').value != '' && wtw_editmode) {
						var zbutton2 = BABYLON.GUI.Button.CreateImageWithCenterTextButton('animationevent-button', zanimationname, 'image');
						zbutton2.width = '220px';
						zbutton2.height = '50px';
						zbutton2.color = 'yellow';
						zbutton2.background = 'blue';
						zbutton2.onPointerClickObservable.add(function(ev, state) {WTW.selectAnimationEvent(dGet('wtw_teditanimationevent').value);});
						wtw_rightmenu.addControl(zbutton2, 0, 0);
						WTW.selectAnimationEvent(dGet('wtw_teditanimationevent').value);
					} else {
						let zlabel = 'Select to Start & Stop:';
						if (wtw_editmode) {
							zlabel = zanimationname;
						}
						var zbutton3 = BABYLON.GUI.Button.CreateImageWithCenterTextButton('animationevent-button', zlabel, 'image');
						zbutton3.width = '220px';
						zbutton3.height = '50px';
						if (wtw_editmode) {
							zbutton3.color = '#ffffff';
							zbutton3.background = 'green';
						} else {
							zbutton3.color = 'yellow';
							zbutton3.background = 'blue';
						}
						zbutton3.onPointerClickObservable.add(function(ev, state) {WTW.selectAnimationEvent(dGet('wtw_tavataranimationevent').value);});
						wtw_rightmenu.addControl(zbutton3, 0, 0);
						WTW.selectAnimationEvent(dGet('wtw_tavataranimationevent').value);
					}
					let zbuttonedit = 'Edit';
					if (wtw_editmode) {
						zbuttonedit = 'Save';
					}
					var zbutton1 = BABYLON.GUI.Button.CreateImageWithCenterTextButton('editanimation-button', zbuttonedit, 'image');
					zbutton1.width = '110px';
					zbutton1.height = '50px';
					if (wtw_editmode) {
						zbutton1.color = 'yellow';
						zbutton1.background = 'blue';
					} else {
						zbutton1.color = '#ffffff';
						zbutton1.background = 'green';
					}
					zbutton1.onPointerClickObservable.add(function(ev, state) {WTW.toggleEditAnimations();WTW.selectAnimationEvent(dGet('wtw_tavataranimationevent').value);});
					wtw_rightmenu.addControl(zbutton1, 0, 1);
					
				}
				break;
			case 4:   /* save avatar settings */
				if (dGet('wtw_tavatarid').value != '') {
					wtw_rightmenu.topInPixels = 10;
					wtw_rightmenu.rightInPixels = 20;
					wtw_rightmenu.width = '350px';
					wtw_rightmenu.height = '300px';
					wtw_rightmenu.addColumnDefinition(1);
					wtw_rightmenu.addRowDefinition(1/2);
					wtw_rightmenu.addRowDefinition(1/2);
				
					var ztext1 = new BABYLON.GUI.TextBlock();
					ztext1.text = 'Avatar Saved';
					ztext1.color = 'green';
					ztext1.fontSize = 50;
					ztext1.height = '400px';
					ztext1.textWrapping = true;
					ztext1.textHorizontalAlignment = 3;
					wtw_rightmenu.addControl(ztext1, 0, 0);
					
					let zsaved = 'WalkTheWeb Global and the Local 3D Websites';
					if (dGet('wtw_tglobalavatar').value == '0') {
						zsaved = 'Local 3D Websites on the same Web Server';
					}
					var ztext2 = new BABYLON.GUI.TextBlock();
					ztext2.text = zsaved;
					ztext2.color = 'green';
					ztext2.fontSize = 30;
					ztext2.height = '400px';
					ztext2.textWrapping = true;
					ztext2.textHorizontalAlignment = 3;
					wtw_rightmenu.addControl(ztext2, 1, 0);
					
					wtw_loadingtimer = window.setTimeout(function(){
						if (wtw_rightmenu != null && wtw_activemenu == 4) {
							wtw_rightmenu.dispose();
							wtw_rightmenu = null;
						}
					},3000);
				}				
				break;
			default:
				
				break;
		}
		gui.addControl(wtw_rightmenu);
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-loadRightMenu=' + ex.message);
	}
}

WTWJS.prototype.loadDesignerAvatar = async function(zglobaluseravatarid, zuseravatarid) {
	/* loads your currently selected avatar to the designer (if you have one selected) */
	try {
		WTW.startLoading();
		/* if it is a global avatar get form 3dnet.walktheweb.com */
		if (zglobaluseravatarid != '') {
			var zrequest = {
				'globaluseravatarid':btoa(zglobaluseravatarid),
				'serverinstanceid':btoa(dGet('wtw_serverinstanceid').value),
				'function':'getglobalavatar'
			};
			WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/globalavatar.php', zrequest, 
				async function(zresponse) {
					zresponse = JSON.parse(zresponse);
					if (zresponse.avatar != null) {
						wtw_avatardef = zresponse.avatar;
						dGet('wtw_tnewavatardisplayname').value = zresponse.avatar.displayname;
						dGet('wtw_tavatarid').value = zresponse.avatar.avatarid;
						dGet('wtw_tglobaluseravatarid').value = zresponse.avatar.globaluseravatarid;
						dGet('wtw_tuseravatarid').value = zresponse.avatar.useravatarid;
						if (WTW.avatarAnimations != null && wtw_avatardef.avataranimationdefs != null) {
							if (WTW.avatarAnimations.length > 0) {
								for (var i=0;i<WTW.avatarAnimations.length;i++) {
									if (WTW.avatarAnimations[i] != undefined) {
										if (WTW.avatarAnimations[i].avataranimationid != undefined) {
											for (var j=0;j<wtw_avatardef.avataranimationdefs.length;j++) {
												if (wtw_avatardef.avataranimationdefs[j] != null) {
													if (WTW.avatarAnimations[i].avataranimationid == wtw_avatardef.avataranimationdefs[j].avataranimationid) {
														WTW.avatarAnimations[i].selected = true;
													}
												}
											}
										}
									}
								}
							}
						}
						WTW.avatars = [];
						var zrequest2 = {
							'usertoken':dGet('wtw_tusertoken').value,
							'globaluserid':btoa(dGet('wtw_tglobaluserid').value),
							'serverinstanceid':btoa(dGet('wtw_serverinstanceid').value),
							'groups':'',
							'function':'getglobalavatars'
						};
						WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/globalavatars.php', zrequest2, 
							function(zresponse2) {
								if (zresponse2 != null) {
									zresponse2 = JSON.parse(zresponse2);
									if (zresponse2.avatars != null) {
										if (zresponse2.avatars.length > 0) {
											for (var i=0; i<zresponse2.avatars.length;i++) {
												WTW.avatars[i] = {
													'avatarid': zresponse2.avatars[i].avatarid,
													'avatargroup': zresponse2.avatars[i].avatargroup,
													'displayname': zresponse2.avatars[i].displayname,
													'avatardescription': zresponse2.avatars[i].avatardescription,
													'gender': zresponse2.avatars[i].gender,
													'objects': {
														'folder': zresponse2.avatars[i].objects.folder,
														'file': zresponse2.avatars[i].objects.file
													},
													'scaling': {
														'x': zresponse2.avatars[i].scaling.x,
														'y': zresponse2.avatars[i].scaling.y,
														'z': zresponse2.avatars[i].scaling.z
													},
													'snapshots': {
														'full': zresponse2.avatars[i].snapshots.full,
														'thumbnail': zresponse2.avatars[i].snapshots.thumbnail
													},
													'sortorder': zresponse2.avatars[i].sortorder,
													'selected': false
												}
											}
										}
									}
								}
								WTW.loadLeftMenu(1);
								WTW.selectAvatar(dGet('wtw_tavatarid').value);
							}
						);
					}
				}
			);			
		} else {
			/* load local server user avatar */
			WTW.getAsyncJSON('/connect/useravatar.php?useravatarid=' + btoa(zuseravatarid) + '&instanceid=' + btoa(dGet('wtw_tinstanceid').value) + '&userid=' + btoa(dGet('wtw_tuserid').value) + '&userip=' + btoa(dGet('wtw_tuserip').value), 
				async function(zresponse) {
					zresponse = JSON.parse(zresponse);
					if (zresponse != null) {
						if (zresponse.avatar != null) {
							wtw_avatardef = zresponse.avatar;
							dGet('wtw_tnewavatardisplayname').value = zresponse.avatar.displayname;
							dGet('wtw_tavatarid').value = zresponse.avatar.avatarid;
							dGet('wtw_tglobaluseravatarid').value = '';
							dGet('wtw_tuseravatarid').value = zresponse.avatar.useravatarid;
							if (WTW.avatarAnimations != null && wtw_avatardef.avataranimationdefs != null) {
								if (WTW.avatarAnimations.length > 0) {
									for (var i=0;i<WTW.avatarAnimations.length;i++) {
										if (WTW.avatarAnimations[i] != undefined) {
											if (WTW.avatarAnimations[i].avataranimationid != undefined) {
												for (var j=0;j<wtw_avatardef.avataranimationdefs.length;j++) {
													if (wtw_avatardef.avataranimationdefs[j] != null) {
														if (WTW.avatarAnimations[i].avataranimationid == wtw_avatardef.avataranimationdefs[j].avataranimationid) {
															WTW.avatarAnimations[i].selected = true;
														}
													}
												}
											}
										}
									}
								}
							}
							WTW.avatars = [];
							WTW.getAsyncJSON('/connect/avatars.php', 
								function(zresponse2) {
									if (zresponse2 != null) {
										zresponse2 = JSON.parse(zresponse2);
										if (zresponse2.avatars != null) {
											if (zresponse2.avatars.length > 0) {
												for (var i=0; i<zresponse2.avatars.length;i++) {
													WTW.avatars[i] = {
														'avatarid': zresponse2.avatars[i].avatarid,
														'avatargroup': zresponse2.avatars[i].avatargroup,
														'displayname': zresponse2.avatars[i].displayname,
														'avatardesciption': zresponse2.avatars[i].avatardesciption,
														'gender': zresponse2.avatars[i].gender,
														'objects': {
															'folder': zresponse2.avatars[i].objects.folder,
															'file': zresponse2.avatars[i].objects.file
														},
														'scaling': {
															'x': zresponse2.avatars[i].scaling.x,
															'y': zresponse2.avatars[i].scaling.y,
															'z': zresponse2.avatars[i].scaling.z
														},
														'snapshots': {
															'full': zresponse2.avatars[i].snapshots.full,
															'thumbnail': zresponse2.avatars[i].snapshots.thumbnail
														},
														'sortorder': zresponse2.avatars[i].sortorder,
														'selected': false
													}
												}
											}
										}
									}
									WTW.loadLeftMenu(1);
									WTW.selectAvatar(dGet('wtw_tavatarid').value);
								}
							);
						}
					}
				}	
			);
		}
    } catch (ex) {
		WTW.log('avatars-loadavatar-loadDesignerAvatar=' + ex.message);
    }
}

WTWJS.prototype.saveMyAvatar = async function() {
	/* save avatar settings */
	try {
		var zavatardef = [];
		let zobjectfolder = '';
		let zobjectfile = '';
		let zgender = '';
		let zscalingx = '';
		let zscalingy = '';
		let zscalingz = '';
		let zavatardescription = '';
		for (var i=0;i<WTW.avatars.length;i++) {
			if (WTW.avatars[i] != null) {
				if (WTW.avatars[i].avatarid != undefined) {
					if (WTW.avatars[i].avatarid == dGet('wtw_tavatarid').value) {
						zavatardef = WTW.avatars[i];
						zobjectfolder = WTW.avatars[i].objects.folder;
						zobjectfile = WTW.avatars[i].objects.file;
						zgender = WTW.avatars[i].gender;
						zscalingx = WTW.avatars[i].scaling.x;
						zscalingy = WTW.avatars[i].scaling.y;
						zscalingz = WTW.avatars[i].scaling.z;
						zavatardescription = WTW.avatars[i].avatardescription;
					}
				}
			}
		}
		var zrequest = {
			'useravatarid':dGet('wtw_tuseravatarid').value,
			'avatarid':dGet('wtw_tavatarid').value,
			'userid':dGet('wtw_tuserid').value,
			'userip':dGet('wtw_tuserip').value,
			'instanceid':dGet('wtw_tinstanceid').value,
			'objectfolder':zobjectfolder,
			'objectfile':zobjectfile,
			'gender':zgender,
			'scalingx':zscalingx,
			'scalingy':zscalingy,
			'scalingz':zscalingz,
			'displayname':dGet('wtw_tnewavatardisplayname').value,
			'avatardescription':zavatardescription,
			'function':'saveavatar'
		};
		WTW.postAsyncJSON('/core/handlers/wtwavatars-saveavatar.php', zrequest, 
			async function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.useravatarid != '') {
					dGet('wtw_tuseravatarid').value = zresponse.useravatarid;
					if (dGet('wtw_tglobalavatar').value == '1') {
						/* if checkbox for global is checked, save to global 3dnet.walktheweb.com */
						var zsecureprotocol = '0';
						if (wtw_protocol == 'https://') {
							zsecureprotocol = '1';
						}
						if (zresponse.objectfolder.indexOf('http') == -1) {
							zresponse.objectfolder = 'https://3dnet.walktheweb.com' + zresponse.objectfolder;
						}
						var zrequest2 = {
							'usertoken':dGet('wtw_tusertoken').value,
							'globaluserid':btoa(dGet('wtw_tglobaluserid').value),
							'serverinstanceid':dGet('wtw_serverinstanceid').value,
							'useravatarid':dGet('wtw_tuseravatarid').value,
							'avatarid':dGet('wtw_tavatarid').value,
							'userid':dGet('wtw_tuserid').value,
							'userip':dGet('wtw_tuserip').value,
							'instanceid':dGet('wtw_tinstanceid').value,
							'objectfolder':zresponse.objectfolder,
							'objectfile':zresponse.objectfile,
							'gender':zresponse.gender,
							'scalingx':zresponse.scalingx,
							'scalingy':zresponse.scalingy,
							'scalingz':zresponse.scalingz,
							'domain':wtw_domainname,
							'domainurl':wtw_domainurl,
							'secureprotocol':zsecureprotocol,
							'privacy':'0',
							'enteranimation':'0',
							'exitanimation':'0',
							'enteranimationparameter':'',
							'exitanimationparameter':'',
							'walkspeed':WTW.walkSpeed,
							'walkanimationspeed':WTW.walkAnimationSpeed,
							'turnspeed':WTW.turnSpeed,
							'turnanimationspeed':WTW.turnAnimationSpeed,
							'displayname':dGet('wtw_tnewavatardisplayname').value,
							'avatardescription':zresponse.avatardescription,
							'function':'saveavatar'
						};
						WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/globalsaveavatar.php', zrequest2, 
							function(zresponse2) {
								zresponse2 = JSON.parse(zresponse2);
								WTW.saveMyAvatarColors();
							}
						); 
					} else {
						WTW.saveMyAvatarColors();
					}
				}
			} 
		);
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-saveMyAvatar=' + ex.message);
	}
}

WTWJS.prototype.saveMyAvatarColors = async function() {
	/* save avatar colors */
	try {
		/* save to local server */
		for (var i=0;i<WTW.avatarParts.length;i++) {
			if (WTW.avatarParts[i] != null) {
				var zrequest = {
					'useravatarid':dGet('wtw_tuseravatarid').value,
					'userid':dGet('wtw_tuserid').value,
					'instanceid':dGet('wtw_tinstanceid').value,
					'avatarpartid':'',
					'avatarpart':WTW.avatarParts[i].part,
					'diffusecolor':WTW.avatarParts[i].diffusecolor,
					'specularcolor':WTW.avatarParts[i].specularcolor,
					'emissivecolor':WTW.avatarParts[i].emissivecolor,
					'ambientcolor':WTW.avatarParts[i].ambientcolor,
					'index':i,
					'function':'saveavatarcolor'
				};
				WTW.postAsyncJSON('/core/handlers/wtwavatars-saveavatar.php', zrequest, 
					async function(zresponse) {
						zresponse = JSON.parse(zresponse);
						var zrequest2 = {
							'serverinstanceid':dGet('wtw_serverinstanceid').value,
							'usertoken':dGet('wtw_tusertoken').value,
							'globaluserid':btoa(dGet('wtw_tglobaluserid').value),
							'useravatarid':dGet('wtw_tuseravatarid').value,
							'userid':dGet('wtw_tuserid').value,
							'instanceid':dGet('wtw_tinstanceid').value,
							'avatarpartid':zresponse.avatarpartid,
							'avatarpart':zresponse.avatarpart,
							'diffusecolor':zresponse.diffusecolor,
							'specularcolor':zresponse.specularcolor,
							'emissivecolor':zresponse.emissivecolor,
							'ambientcolor':zresponse.ambientcolor,
							'index':zresponse.index,
							'function':'saveavatarcolor'
						};
						if (dGet('wtw_tglobalavatar').value == '1') {
							/* if checkbox for global is checked, save to global 3dnet.walktheweb.com */
							WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/globalsaveavatar.php', zrequest2, 
								function(zresponse2) {
									zresponse2 = JSON.parse(zresponse2);
									if (zresponse2.index == WTW.avatarParts.length - 1) {
										WTW.saveMyAvatarAnimations();
									}
								}
							);
						} else if (zresponse.index == WTW.avatarParts.length - 1) {
							WTW.saveMyAvatarAnimations();
						}
					}
				);
			}
		}
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-saveMyAvatarColors=' + ex.message);
	}
}

WTWJS.prototype.saveMyAvatarAnimations = async function() {
	/* save avatar animations */
	try {
		let zlastanimationevent = '';
		let zdefaultid = '';
		let zdefault = -1;
		let zselectedid = '';
		let zselected = -1;
		for (var i=0;i<WTW.avatarAnimations.length;i++) {
			if (WTW.avatarAnimations[i] != null) {
				if (zselectedid == '' && WTW.avatarAnimations[i].selected) {
					zselectedid = WTW.avatarAnimations[i].selected;
					zselected = i;
				}
				
				if (WTW.avatarAnimations[i].animationevent != zlastanimationevent || i == WTW.avatarAnimations.length-1) {
					let zanimationind = -1;
					if (zselected > -1) {
						zanimationind = zselected;
					} else if (zdefault > -1) {
						zanimationind = zdefault;
					}
					zdefaultid = '';
					zdefault = -1;
					zselectedid = '';
					zselected = -1;
					
					if (zlastanimationevent != '') {
						if (WTW.avatarAnimations[zanimationind] != null) {
							var zrequest = {
								'useravatarid':dGet('wtw_tuseravatarid').value,
								'userid':dGet('wtw_tuserid').value,
								'instanceid':dGet('wtw_tinstanceid').value,
								'useravataranimationid':'',
								'avataranimationid':WTW.avatarAnimations[zanimationind].avataranimationid,
								'animationevent':WTW.avatarAnimations[zanimationind].animationevent,
								'index':i,
								'function':'saveavataranimation'
							};
							WTW.postAsyncJSON('/core/handlers/wtwavatars-saveavatar.php', zrequest, 
								async function(zresponse) {
									zresponse = JSON.parse(zresponse);
									if (dGet('wtw_tglobalavatar').value == '1') {
										/* if checkbox for global is checked, save to global 3dnet.walktheweb.com */
										if (zresponse.objectfolder.indexOf('http') == -1) {
											zresponse.objectfolder = 'https://3dnet.walktheweb.com' + zresponse.objectfolder;
										}
										var zrequest2 = {
											'serverinstanceid':dGet('wtw_serverinstanceid').value,
											'usertoken':dGet('wtw_tusertoken').value,
											'globaluserid':btoa(dGet('wtw_tglobaluserid').value),
											'useravatarid':dGet('wtw_tuseravatarid').value,
											'userid':dGet('wtw_tuserid').value,
											'instanceid':dGet('wtw_tinstanceid').value,
											'useravataranimationid':zresponse.useravataranimationid,
											'avataranimationid':zresponse.avataranimationid,
											'avataranimationname':WTW.getAnimationEventName(zresponse.animationevent),
											'animationevent':zresponse.animationevent,
											'animationfriendlyname':zresponse.animationfriendlyname,
											'loadpriority':zresponse.loadpriority,
											'animationicon':zresponse.animationicon,
											'speedratio':zresponse.speedratio,
											'objectfolder':zresponse.objectfolder,
											'objectfile':zresponse.objectfile,
											'startframe':zresponse.startframe,
											'endframe':zresponse.endframe,
											'animationloop':zresponse.animationloop,
											'walkspeed':zresponse.walkspeed,
											'index':zresponse.index,
											'function':'saveavataranimation'
										};
										if (dGet('wtw_tglobalavatar').value == '1') {
											WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/globalsaveavatar.php', zrequest2, 
												function(zresponse2) {
													zresponse2 = JSON.parse(zresponse2);
													if (zresponse2.index == WTW.avatarAnimations.length-1) {
														WTW.returnCloseDesigner();
													}
												}
											);
										} else if (i == WTW.avatarAnimations.length-1) {
											WTW.returnCloseDesigner();
										}
									}
								}
							);
						}
					}
					zlastanimationevent = WTW.avatarAnimations[i].animationevent;
				}
			}
		}
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-saveMyAvatarAnimations=' + ex.message);
	}
}

WTWJS.prototype.returnCloseDesigner = function() {
	/* return to 3D website and close Avatar Designer */
	try {
		var zuseravatarid = WTW.getQuerystring('useravatarid','');
		if (zuseravatarid != '') {
			/* then add code to refresh other computers */
			window.setTimeout(function() {
				window.parent.postMessage({
					'func': 'WTW.reloadAvatar',
					'message': 'Reload Avatar',
					'parameters':null
				}, '*');
				window.parent.postMessage({
					'func': 'WTW.closeIFrame',
					'message': 'Close iFrame',
					'parameters':null
				}, '*');
			}, 2000);
		} else {
			WTW.openLoginHUD('Select My Avatar');
		}
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-returnCloseDesigner=' + ex.message);
	}
}

WTWJS.prototype.updateGlobalAvatar = function(zvalue) {
	/* sets the checkbox form value for saving */
	try {
		dGet('wtw_tglobalavatar').value = zvalue;
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-updateGlobalAvatar=' + ex.message);
	}
}

WTWJS.prototype.editMyAvatarAnimations = function(zevent) {
	/* set menu to edit animations (used by button click event) */
	try {
		dGet('wtw_teditanimationevent').value = zevent;
		WTW.loadRightMenu(3);
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-editMyAvatarAnimations=' + ex.message);
	}
}

WTWJS.prototype.toggleEditAnimations = function() {
	/* set menu to edit or stop editing animations (used by button click event) */
	try {
		if (wtw_editmode) {
			wtw_editmode = false;
			dGet('wtw_teditanimationevent').value = '';
		} else {
			wtw_editmode = true;
		}
		WTW.loadRightMenu(3);
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-toggleEditAnimations=' + ex.message);
	}
}

WTWJS.prototype.selectAnimationEvent = function(zevent) {
	/* select animation event and load the possible animations to change it to */
	try {
		let zlastanimationevent = '';
		let zrows = 0;
		let zcatrows = 0;
		let showcategories = false;
		if (wtw_editmode && dGet('wtw_teditanimationevent').value == '') {
			zevent = 'onwalk';
			dGet('wtw_teditanimationevent').value = zevent;
		}
		dGet('wtw_tavataranimationevent').value = zevent;
		for(var i=0;i<WTW.avatarAnimations.length;i++) {
			if (WTW.avatarAnimations[i] != null) {
				if (WTW.avatarAnimations[i].animationevent != zlastanimationevent) {
					zcatrows += 1;
					zlastanimationevent = WTW.avatarAnimations[i].animationevent;
				}
				if (WTW.avatarAnimations[i].animationevent == zevent) {
					zrows += 1;
				}
			}
		}
		if (wtw_editmode == false) {
			showcategories = true;
			zrows = zcatrows;
		}
		zlastanimationevent = '';
		if (wtw_rightmenulower != null) {
			wtw_rightmenulower.dispose();
		}
		wtw_rightmenulower = new BABYLON.GUI.Grid();
		wtw_rightmenulower.topInPixels = 70;
		wtw_rightmenulower.rightInPixels = 20;
		wtw_rightmenulower.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
		wtw_rightmenulower.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
		wtw_rightmenulower.addColumnDefinition(1);
		wtw_rightmenulower.width = '350px';
		if (zrows > 0) {
			let j = 0;
			wtw_rightmenulower.height = (zrows * 50) + 'px';
			for(var i=0;i<WTW.avatarAnimations.length;i++) {
				if (WTW.avatarAnimations[i] != null) {
					let zbuttonname = WTW.avatarAnimations[i].animationeventname;
					let zcolor = '#D8F8FF';
					let zweight = 0;
					if (WTW.myAvatar.WTW.animations.running[zevent] != undefined) {
						if (WTW.myAvatar.WTW.animations.running[zevent].weight != undefined) {
							if (WTW.myAvatar.WTW.animations.running[zevent].weight == 1) {
								zweight = 1;
							}
						}
					}
					if (WTW.avatarAnimations[i].animationevent != zlastanimationevent && showcategories) {
						wtw_rightmenulower.addRowDefinition(1/zrows);
						if (dGet('wtw_tavataranimationevent').value == WTW.avatarAnimations[i].animationevent && wtw_editmode == false) {
							if (zweight != 1) {
								zbuttonname += ': ' + dGet('wtw_tanimationfriendlyname').value;
								zcolor = 'yellow';
							}
						} else if (dGet('wtw_teditanimationevent').value == WTW.avatarAnimations[i].animationevent && wtw_editmode) {
							zbuttonname += ': ' + dGet('wtw_tanimationfriendlyname').value;
							zcolor = 'yellow';
						}
						var zbutton1 = BABYLON.GUI.Button.CreateImageWithCenterTextButton(WTW.avatarAnimations[i].animationevent + '-animation-button', zbuttonname, 'image');
						zbutton1.width = '330px';
						zbutton1.height = '50px';
						zbutton1.color = '#000000';
						zbutton1.background = zcolor;
						if (wtw_editmode) {
							zbutton1.onPointerClickObservable.add(function(ev, state) {WTW.editMyAvatarAnimations(state.currentTarget.name.split('-')[0]);});
						} else {
							zbutton1.onPointerClickObservable.add(function(ev, state) {WTW.getMyAvatarAnimations(state.currentTarget.name.split('-')[0]);});
						}
						wtw_rightmenulower.addControl(zbutton1, j, 0);
						j += 1;
						zlastanimationevent = WTW.avatarAnimations[i].animationevent;
					} else if (showcategories == false) {
						if (WTW.avatarAnimations[i].animationevent == zevent) {
							wtw_rightmenulower.addRowDefinition(1/zrows);
							zbuttonname = WTW.avatarAnimations[i].animationfriendlyname;
							if (WTW.avatarAnimations[i].selected) {
								zcolor = 'yellow';
							} else {
								zcolor = '#ffffff';
							}
							var zbutton2 = BABYLON.GUI.Button.CreateImageWithCenterTextButton(WTW.avatarAnimations[i].avataranimationid + '-animation-button', zbuttonname, 'image');
							zbutton2.width = '330px';
							zbutton2.height = '50px';
							zbutton2.color = '#000000';
							zbutton2.background = zcolor;
							zbutton2.onPointerClickObservable.add(function(ev, state) {WTW.changeMyAvatarAnimation(state.currentTarget.name.split('-')[0]);});
							wtw_rightmenulower.addControl(zbutton2, j, 0);
							j += 1;
						}
					}
					if (dGet('wtw_tanimationind').value != '') {
						if (Number(dGet('wtw_tanimationind').value) == i) {
							if (wtw_runningevent != '' && WTW.myAvatar.WTW.animations.running[wtw_runningevent] != undefined) {
								WTW.myAvatar.WTW.animations.running[wtw_runningevent].weight = 0;
								wtw_runningevent = '';
							}
							if (zweight == 0 || (wtw_editmode && dGet('wtw_teditanimationevent').value != wtw_lasteditavatarid)) {
								WTW.clearAnimations(WTW.myAvatar.name);
								zweight = 0;
							}
							if (WTW.myAvatar.WTW.animations.running[zevent] == undefined) {
								WTW.loadAvatarAnimation(WTW.myAvatar.name, '', WTW.avatarAnimations[i].animationfriendlyname, WTW.avatarAnimations[i].animationicon, WTW.avatarAnimations[i].avataranimationid, WTW.avatarAnimations[i].animationevent, WTW.avatarAnimations[i].objectfolder, WTW.avatarAnimations[i].objectfile, WTW.avatarAnimations[i].startframe, WTW.avatarAnimations[i].endframe, WTW.avatarAnimations[i].speedratio, 0, 0, true, '');
							}

							if (zweight == 0 && (wtw_editmode == false || (wtw_editmode && dGet('wtw_teditanimationevent').value != '')))  {
								var zrunAnimationTimer = window.setInterval(function() {
									if (WTW.myAvatar.WTW.animations.running[zevent] != null) {
										window.clearInterval(zrunAnimationTimer);
										WTW.myAvatar.WTW.animations.running[zevent].weight = 1;
										WTW.myAvatar.WTW.animations.running['onwait'].weight = 0;
										wtw_runningevent = zevent;
									}
								}, 100);
							} else {
								if (WTW.myAvatar.WTW.animations.running[zevent] != null) {
									WTW.myAvatar.WTW.animations.running[zevent].weight = 0;
									if (wtw_editmode == false) {
										dGet('wtw_tavataranimationevent').value = '';
									}
								}
								WTW.myAvatar.WTW.animations.running['onwait'].weight = 1;
							}
						}
					}
				}
			}
		} else {
			wtw_rightmenulower.height = '60px';
			wtw_rightmenulower.addRowDefinition(1);
		}
		gui.addControl(wtw_rightmenulower);
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-selectAnimationEvent=' + ex.message);
	}
}

WTWJS.prototype.clearAnimations = function(zavatarname) {
	/* clear the animations loaded (except the idle animation) so that it can be reloaded */
	try {
		let zavatar = WTW.getMeshOrNodeByID(zavatarname);
		if (zavatar != null) {
			if (zavatar.WTW != null) {
				if (zavatar.WTW.animations != null && zavatar.WTW.skeleton != null) {
					zavatar.WTW.animations.running['onwait'].weight = 1;
					let zlastanimationevent = '';
					for(var i=0;i<WTW.avatarAnimations.length;i++) {
						if (WTW.avatarAnimations[i] != null) {
							let zevent = WTW.avatarAnimations[i].animationevent;
							if (zevent != zlastanimationevent) {
								if (zavatar.WTW.animations.running[zevent] != null) {
									zavatar.WTW.animations.running[zevent].weight = 0;
									if (typeof zavatar.WTW.animations.running[zevent].stop == 'function') {
										zavatar.WTW.animations.running[zevent].stop();
									}
								}
								zavatar.WTW.skeleton.deleteAnimationRange(zevent,true);
								zavatar.WTW.animations.running[zevent] = null;
								zlastanimationevent = WTW.avatarAnimations[i].animationevent;
							}
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-clearAnimations=' + ex.message);
	}
}

WTWJS.prototype.changeMyAvatarAnimation = function(zavataranimationid) {
	/* change the selected animation */
	try {
		wtw_lasteditavatarid = zavataranimationid;
		let zavataranimationind = -1;
		if (dGet('wtw_teditanimationevent').value != '') {
			for (var i=0;i<WTW.avatarAnimations.length;i++) {
				if (WTW.avatarAnimations[i] != null) {
					if (WTW.avatarAnimations[i].avataranimationid == zavataranimationid) {
						zavataranimationind = i;
					}
					if (WTW.avatarAnimations[i].animationevent == dGet('wtw_teditanimationevent').value) {
						WTW.avatarAnimations[i].selected = false;
					}
				}
			}
		}
		if (WTW.avatarAnimations[zavataranimationind] != null) {
			WTW.avatarAnimations[zavataranimationind].selected = true;
		}
		WTW.getMyAvatarAnimations(dGet('wtw_teditanimationevent').value);
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-changeMyAvatarAnimation=' + ex.message);
	}
}

WTWJS.prototype.getMyAvatarAnimations = function(zanimationevent) {
	/* get my avatar animations or select the default animation for each animation event */
	try {
		if (wtw_editmode) {
			dGet('wtw_teditanimationevent').value = zanimationevent;
		} else {
			dGet('wtw_tavataranimationevent').value = zanimationevent;
		}
		let zselected = -1;
		let zselectedname = '';
		let zdefault = -1;
		let zdefaultname = '';
		for(var i=0;i<WTW.avatarAnimations.length;i++) {
			if (WTW.avatarAnimations[i] != null) {
				if (WTW.avatarAnimations[i].animationevent == zanimationevent) {
					if (WTW.avatarAnimations[i].selected) {
						zselected = i;
						zselectedname = WTW.avatarAnimations[i].animationfriendlyname;
					}
				}
			}
		}
		let zanimationind = -1;
		let zanimationfriendlyname = '';
		if (zselected > -1) {
			zanimationind = zselected;
			zanimationfriendlyname = zselectedname;
		} else if (zdefault > -1) {
			zanimationind = zdefault;
			zanimationfriendlyname = zdefaultname;
			WTW.avatarAnimations[zanimationind].selected = true;
		}
		if (zanimationind > -1) {
			dGet('wtw_tanimationind').value = zanimationind;
			dGet('wtw_tanimationfriendlyname').value = zanimationfriendlyname;
			WTW.loadRightMenu(3);
		}
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-getMyAvatarAnimations=' + ex.message);
	}
}

WTWJS.prototype.loadAvatarMeshes = function(zavatardef) {
	/* load the avatar and all of its parts and colors */
	try {
		WTW.startLoading();
		if (dGet('wtw_tavatarid').value == '') {
			var zbutton0 = BABYLON.GUI.Button.CreateImageWithCenterTextButton('selectavatar-button', 'Select My Avatar', 'image');
			zbutton0.width = '330px';
			zbutton0.height = '60px';
			zbutton0.color = 'yellow';
			zbutton0.background = 'blue';
			zbutton0.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(1);});
			wtw_leftmenu.addControl(zbutton0, 1, 0);

			var zbutton1 = BABYLON.GUI.Button.CreateImageWithCenterTextButton('avatarprofile-button', 'Avatar Profile', 'image');
			zbutton1.width = '330px';
			zbutton1.height = '60px';
			zbutton1.color = 'white';
			zbutton1.background = 'green';
			zbutton1.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(1);});
			wtw_leftmenu.addControl(zbutton1, 0, 0);

			var zbutton2 = BABYLON.GUI.Button.CreateImageWithCenterTextButton('avatarcolors-button', 'Avatar Colors', 'image');
			zbutton2.width = '330px';
			zbutton2.height = '60px';
			zbutton2.color = 'white';
			zbutton2.background = 'green';
			zbutton2.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(2);});
			wtw_leftmenu.addControl(zbutton2, 2, 0);

			var zbutton3 = BABYLON.GUI.Button.CreateImageWithCenterTextButton('avataranimations-button', 'Avatar Animations', 'image');
			zbutton3.width = '330px';
			zbutton3.height = '60px';
			zbutton3.color = 'white';
			zbutton3.background = 'green';
			zbutton3.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(3);});
			wtw_leftmenu.addControl(zbutton3, 3, 0);

			var zbutton4 = BABYLON.GUI.Button.CreateImageWithCenterTextButton('save-button', 'Save Avatar', 'image');
			zbutton4.width = '330px';
			zbutton4.height = '60px';
			zbutton4.color = 'white';
			zbutton4.background = 'green';
			zbutton4.onPointerClickObservable.add(function(ev, state) {WTW.saveMyAvatar();WTW.loadLeftMenu(4);});
			wtw_leftmenu.addControl(zbutton4, 4, 0);
		}
		dGet('wtw_tavatarid').value = zavatardef.avatarid;
		WTW.avatarParts = [];
		zsetupparent = WTW.getMeshOrNodeByID('setupparent-0');
		var zavatarname = 'myavatar-' + dGet('wtw_tinstanceid').value;
		WTW.myAvatar = WTW.getMeshOrNodeByID(zavatarname);
		if (WTW.myAvatar != null) {
			WTW.myAvatar.dispose();
		}
		var zpositionx = 0;
		var zpositiony = 0;
		var zpositionz = 0;
		var zrotationx = 0;
		var zrotationy = 0;
		var zrotationz = 0;
		var zscalingx = 1;
		var zscalingy = 1;
		var zscalingz = 1;
		var zobjectanimations = null;
		var zobjectfolder = '/content/system/avatars/male/';
		var zobjectfile = 'maleidle.babylon';
		var zavataranimationdefs = [];
		if (zavatardef.position.x != undefined) {
			if (WTW.isNumeric(zavatardef.position.x)) {
				zpositionx = Number(zavatardef.position.x);
			}
		}
		if (zavatardef.position.y != undefined) {
			if (WTW.isNumeric(zavatardef.position.y)) {
				zpositiony = Number(zavatardef.position.y);
			}
		}
		if (zavatardef.position.z != undefined) {
			if (WTW.isNumeric(zavatardef.position.z)) {
				zpositionz = Number(zavatardef.position.z);
			}
		} 
		
		if (zavatardef.rotation.x != undefined) {
			if (WTW.isNumeric(zavatardef.rotation.x)) {
				zrotationx = Number(zavatardef.rotation.x);
			}
		}
		if (zavatardef.rotation.y != undefined) {
			if (WTW.isNumeric(zavatardef.rotation.y)) {
				zrotationy = Number(zavatardef.rotation.y);
			}
		}
		if (zavatardef.rotation.z != undefined) {
			if (WTW.isNumeric(zavatardef.rotation.z)) {
				zrotationz = Number(zavatardef.rotation.z);
			}
		} 
		if (zavatardef.scaling.x != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.x)) {
				zscalingx = Number(zavatardef.scaling.x);
			}
		}
		if (zavatardef.scaling.y != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.y)) {
				zscalingy = Number(zavatardef.scaling.y);
			}
		}
		if (zavatardef.scaling.z != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.z)) {
				zscalingz = Number(zavatardef.scaling.z);
			}
		} 
		if (zavatardef.objects.folder != undefined) {
			if (zavatardef.objects.folder != '') {
				zobjectfolder = zavatardef.objects.folder;
			}
		}
		if (zavatardef.objects.file != undefined) {
			if (zavatardef.objects.file != '') {
				zobjectfile = zavatardef.objects.file;
			}
		}
		WTW.myAvatar = BABYLON.MeshBuilder.CreateBox(zavatarname, {}, scene);
		WTW.myAvatar.material = new BABYLON.StandardMaterial('matmyavatar' + zavatarname, scene);
		WTW.myAvatar.material.alpha = 0;
		WTW.myAvatar.parent = zsetupparent;
		WTW.myAvatar.applyGravity = true;
		WTW.myAvatar.showBoundingBox = false;
		WTW.myAvatar.ellipsoid = new BABYLON.Vector3(3, 8, 3);
		WTW.myAvatar.ellipsoidOffset = new BABYLON.Vector3(0, 8, 0);
		WTW.myAvatar.checkCollisions = true;
		WTW.myAvatar.isPickable = false;
		WTW.myAvatar.WTW = zavatardef;

		var zavatarscale = new BABYLON.TransformNode(zavatarname + '-scale');
		zavatarscale.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
		zavatarscale.rotation = new BABYLON.Vector3(WTW.getRadians(zrotationx), WTW.getRadians(zrotationy), WTW.getRadians(zrotationz));
		zavatarscale.scaling = new BABYLON.Vector3(zscalingx, zscalingy, zscalingz);
		zavatarscale.parent = WTW.myAvatar;

		var zavatarcamera = BABYLON.MeshBuilder.CreateBox(zavatarname + '-camera', {}, scene);
		zavatarcamera.material = new BABYLON.StandardMaterial('matcamera' + zavatarname, scene);
		zavatarcamera.material.alpha = 0;
		zavatarcamera.parent = WTW.myAvatar;
		zavatarcamera.position.y = 12;
		zavatarcamera.rotation.y = WTW.getRadians(-90);

		var zavatarcenter = BABYLON.MeshBuilder.CreateBox(zavatarname + '-center', {}, scene);
		zavatarcenter.material = new BABYLON.StandardMaterial('matcenter' + zavatarname, scene);
		zavatarcenter.material.alpha = 0;
		zavatarcenter.parent = WTW.myAvatar;
		zavatarcenter.position.y = 10;
		zavatarcenter.rotation.y = WTW.getRadians(-90);

		BABYLON.SceneLoader.ImportMeshAsync(null, zobjectfolder, zobjectfile, scene).then(
			function (zresponse) {
				if (zresponse.meshes != null) {
					for (var i=0; i < zresponse.meshes.length; i++) {
						if (zresponse.meshes[i] != null) {
							var zmesh = zresponse.meshes[i];
							var zmeshname = zresponse.meshes[i].name;
							var zchildmoldname = zavatarname + '-' + zmeshname;
							zresponse.meshes[i].isPickable = true;
							zresponse.meshes[i].name = zchildmoldname;
							zresponse.meshes[i].id = zchildmoldname;
							zresponse.meshes[i].isVisible = true;
							
							if (zresponse.meshes[i].material != null) {
								if (zresponse.meshes[i].material.alpha != undefined) {
									zresponse.meshes[i].material.alpha = 1;
								}
								/* load any color settings or set defaults */
								let zdiffusecolor = '#ffffff';
								let zemissivecolor = '#000000';
								let zspecularcolor = '#000000';
								let zambientcolor = '#ffffff';
								if (zavatardef.avatarparts != null) {
									if (zavatardef.avatarparts.length > 0) {
										for (var j=0;j<zavatardef.avatarparts.length;j++) {
											if (zavatardef.avatarparts[j] != undefined) {
												if (zavatardef.avatarparts[j].avatarpart == zmeshname) {
													if (zavatardef.avatarparts[j].diffusecolor != undefined) {
														zdiffusecolor = zavatardef.avatarparts[j].diffusecolor;
													}
													if (zavatardef.avatarparts[j].emissivecolor != undefined) {
														zemissivecolor = zavatardef.avatarparts[j].emissivecolor;
													}
													if (zavatardef.avatarparts[j].specularcolor != undefined) {
														zspecularcolor = zavatardef.avatarparts[j].specularcolor;
													}
													if (zavatardef.avatarparts[j].ambientcolor != undefined) {
														zambientcolor = zavatardef.avatarparts[j].ambientcolor;
													}
												}
											}
										}
									}
								}
								/* emissive and specular currently share colors */
								zresponse.meshes[i].material.emissiveColor = new BABYLON.Color3.FromHexString(zemissivecolor);
								zresponse.meshes[i].material.specularColor = new BABYLON.Color3.FromHexString(zspecularcolor);
								/* diffuse and ambient currently share colors */
								zresponse.meshes[i].material.diffuseColor = new BABYLON.Color3.FromHexString(zdiffusecolor);
								zresponse.meshes[i].material.ambientColor = new BABYLON.Color3.FromHexString(zambientcolor);
								/* refresh the materials to apply colors */
								var zcovering = zresponse.meshes[i].material;
								zresponse.meshes[i].material.dispose();
								zresponse.meshes[i].material = zcovering;
								
								/* set local array of color values per avatar mesh part for editor and save process */
								WTW.avatarParts[i] = {
									'moldname':zchildmoldname,
									'part':zmeshname,
									'diffusecolor':zdiffusecolor,
									'emissivecolor':zemissivecolor,
									'specularcolor':zspecularcolor,
									'ambientcolor':zambientcolor
								};
							}
							WTW.registerMouseOver(zresponse.meshes[i]);
							if (zresponse.meshes[i].parent == null) {
								zresponse.meshes[i].parent = zavatarscale;
							}
							zresponse.meshes[i].WTW = [];
							zresponse.meshes[i].WTW.animations = [];
							if (zobjectanimations != null) {
								if (zobjectanimations != null) {
									for (var j=0; j < zobjectanimations.length;j++) {
										if (zobjectanimations[j] != null) {
											var zmoldnamepart = zobjectanimations[j].moldnamepart;
											if (zmoldnamepart == zmeshname) {
												var zmoldevent = zobjectanimations[j].moldevent;
												var zstartframe = Number(zobjectanimations[j].startframe);
												var zendframe = Number(zobjectanimations[j].endframe);
												var zanimationloop = false;
												var zspeedratio = Number(zobjectanimations[j].speedratio);
												if (zobjectanimations[j].animationloop+'' == '1') {
													zanimationloop = true;
												}
												if (zmoldevent == 'onload') {
													zanimationloop = false;
													if ((typeof zmesh.WTW.animations.onwait) != 'undefined') {
														zresponse.meshes[i].WTW.animations[zmoldevent] = scene.beginWeightedAnimation(zmesh, zstartframe, zendframe, 1, zanimationloop, zspeedratio, function() {zmesh.WTW.animations.onload.weight=0; zmesh.WTW.animations.onwait.weight=1;});
													} else {
														zresponse.meshes[i].WTW.animations[zmoldevent] = scene.beginWeightedAnimation(zmesh, zstartframe, zendframe, 1, zanimationloop, zspeedratio);
													}
												} else {
													zresponse.meshes[i].WTW.animations[zmoldevent] = scene.beginWeightedAnimation(zmesh, zstartframe, zendframe, 0, zanimationloop, zspeedratio);
												}
											}
										}
									}
									if ((typeof zmesh.WTW.animations.onload) == 'undefined' && (typeof zmesh.WTW.animations.onwait) != 'undefined') {
										zmesh.WTW.animations.onwait.weight=1;
									}
								}
							}
						}
					}
				}
				/* load skeleton for animations */
				if (zresponse.skeletons != null)	{
					var zskeleton = zresponse.meshes[0].skeleton;
					WTW.myAvatar.WTW.skeleton = zresponse.meshes[0].skeleton;
					for (var i=0; i < zresponse.skeletons.length; i++) {
						if (zresponse.skeletons[i] != null) {
							var zmesh = zresponse.skeletons[i];
							var zmeshname = zresponse.skeletons[i].name;
							var zchildmoldname = zavatarname + '-' + zmeshname;
							zresponse.skeletons[i].name = zchildmoldname;
							zresponse.skeletons[i].id = zchildmoldname;
							WTW.registerMouseOver(zresponse.skeletons[i]);
							if (zresponse.skeletons[i].parent == null) {
								zresponse.skeletons[i].scaling = new BABYLON.Vector3(zscalingx,zscalingy,zscalingz);
							}
							if (zresponse.skeletons[i].bones != null) {
								var zheadtopbone = -1;
								var zspine2bone = -1;
								var zrighthandbone = -1;
								var zlefthandbone = -1;
								var zrightlegbone = -1;
								var zleftlegbone = -1;
								var zrightfootbone = -1;
								var zleftfootbone = -1;
								for (var j=0; j < zresponse.skeletons[i].bones.length; j++) {
									if (zresponse.skeletons[i].bones[j] != null) {
										var zbonename = zresponse.skeletons[i].bones[j].name.toLowerCase();
										if (zbonename.indexOf('headtop') > -1 && zheadtopbone == -1) {
											zheadtopbone = j;
										} else if (zbonename.indexOf('spine2') > -1 && zspine2bone == -1) {
											zspine2bone = j;
										} else if (zbonename.indexOf('righthand') > -1 && zrighthandbone == -1) {
											zrighthandbone = j;
										} else if (zbonename.indexOf('lefthand') > -1 && zlefthandbone == -1) {
											zlefthandbone = j;
										} else if (zbonename.indexOf('rightupleg') > -1 && zrightlegbone == -1) {
											zrightlegbone = j;
										} else if (zbonename.indexOf('leftupleg') > -1 && zleftlegbone == -1) {
											zleftlegbone = j;
										} else if (zbonename.indexOf('rightfoot') > -1 && zrightfootbone == -1) {
											zrightfootbone = j;
										} else if (zbonename.indexOf('leftfoot') > -1 && zleftfootbone == -1) {
											zleftfootbone = j;
										}
/*										if (j == 0) {
											zresponse.skeletons[i].bones[j].parent = zavatarscale;
										} else {
											if (zresponse.skeletons[i].bones[j].parent == null) {
												zresponse.skeletons[i].bones[j].parent = zresponse.skeletons[i].bones[0];
											}
										}
*/									}
								}
								if (zheadtopbone > -1) {
									var zheadtop = BABYLON.MeshBuilder.CreateBox(zavatarname + '-headtop', {}, scene);
									zheadtop.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
									zheadtop.material = zcovering = new BABYLON.StandardMaterial('mat' + zavatarname + '-headtop', scene);
									zheadtop.material.alpha = 0;
									zheadtop.isPickable = true;
									//WTW.registerMouseOver(zheadtop);
									zheadtop.attachToBone(zresponse.skeletons[i].bones[zheadtopbone], zresponse.meshes[0]);
									if (zavatarname == 'myavatar-' + dGet('wtw_tinstanceid').value) {
										zavatarcamera.parent = zheadtop;
										zavatarcamera.position.y = 0;
										zavatarcamera.rotation.y = WTW.getRadians(0);
									}
								}
								if (zspine2bone > -1) {
									var zchest = BABYLON.MeshBuilder.CreateBox(zavatarname + '-chest', {}, scene);
									zchest.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
									zchest.material = zcovering = new BABYLON.StandardMaterial('mat' + zavatarname + '-chest', scene);
									zchest.material.alpha = 0;
									zchest.isPickable = true;
									//WTW.registerMouseOver(zchest);
									zchest.attachToBone(zresponse.skeletons[i].bones[zspine2bone], zresponse.meshes[0]);
								}
								if (zrighthandbone > -1) {
									var zrighthand = BABYLON.MeshBuilder.CreateBox(zavatarname + '-righthand', {}, scene);
									zrighthand.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingz, 1/zscalingz);
									zrighthand.material = zcovering = new BABYLON.StandardMaterial('mat' + zavatarname + '-righthand', scene);
									zrighthand.material.alpha = 0;
									zrighthand.isPickable = true;
									//WTW.registerMouseOver(zrighthand);
									zrighthand.attachToBone(zresponse.skeletons[i].bones[zrighthandbone], zresponse.meshes[0]);
								}
								if (zlefthandbone > -1) {
									var zlefthand = BABYLON.MeshBuilder.CreateBox(zavatarname + '-lefthand', {}, scene);
									zlefthand.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
									zlefthand.material = zcovering = new BABYLON.StandardMaterial('mat' + zavatarname + '-lefthand', scene);
									zlefthand.material.alpha = 0;
									zlefthand.isPickable = true;
									//WTW.registerMouseOver(zlefthand);
									zlefthand.attachToBone(zresponse.skeletons[i].bones[zlefthandbone], zresponse.meshes[0]);
								}
								if (zrightlegbone > -1) {
									var zrightleg = BABYLON.MeshBuilder.CreateBox(zavatarname + '-righthip', {}, scene);
									zrightleg.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
									zrightleg.material = zcovering = new BABYLON.StandardMaterial('mat' + zavatarname + '-rightleg', scene);
									zrightleg.material.alpha = 0;
									zrightleg.isPickable = true;
									//WTW.registerMouseOver(zrightleg);
									zrightleg.attachToBone(zresponse.skeletons[i].bones[zrightlegbone], zresponse.meshes[0]);
								}
								if (zleftlegbone > -1) {
									var zleftleg = BABYLON.MeshBuilder.CreateBox(zavatarname + '-lefthip', {}, scene);
									zleftleg.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
									zleftleg.material = zcovering = new BABYLON.StandardMaterial('mat' + zavatarname + '-leftleg', scene);
									zleftleg.material.alpha = 0;
									zleftleg.isPickable = true;
									//WTW.registerMouseOver(zleftleg);
									zleftleg.attachToBone(zresponse.skeletons[i].bones[zleftlegbone], zresponse.meshes[0]);
								}
								if (zrightfootbone > -1) {
									var zrightfoot = BABYLON.MeshBuilder.CreateBox(zavatarname + '-rightfoot', {}, scene);
									zrightfoot.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
									zrightfoot.material = zcovering = new BABYLON.StandardMaterial('mat' + zavatarname + '-rightfoot', scene);
									zrightfoot.material.alpha = 0;
									zrightfoot.isPickable = true;
									//WTW.registerMouseOver(zrightfoot);
									zrightfoot.attachToBone(zresponse.skeletons[i].bones[zrightfootbone], zresponse.meshes[0]);
								}
								if (zleftfootbone > -1) {
									var zleftfoot = BABYLON.MeshBuilder.CreateBox(zavatarname + '-leftfoot', {}, scene);
									zleftfoot.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
									zleftfoot.material = zcovering = new BABYLON.StandardMaterial('mat' + zavatarname + '-leftfoot', scene);
									zleftfoot.material.alpha = 0;
									zleftfoot.isPickable = true;
									//WTW.registerMouseOver(zleftfoot);
									zleftfoot.attachToBone(zresponse.skeletons[i].bones[zleftfootbone], zresponse.meshes[0]);
								}
							}
							let zendframe = WTW.getLastAnimationKey(WTW.myAvatar);
							zavataranimationdefs[0] = {
								'useravataranimationid':'',
								'avataranimationid':'r9087b004i9ptv0e',
								'animationevent':'onwait',
								'animationeventname':'Wait',
								'animationfriendlyname':'',
								'loadpriority':0,
								'animationicon':'',
								'objectfolder':zobjectfolder,
								'objectfile':zobjectfile,
								'startframe':'1',
								'endframe':zendframe,
								'animationloop':true,
								'defaultspeedratio':'1.00',
								'speedratio':'1.00',
								'walkspeed':'1',
								'totalframes':zendframe,
								'totalstartframe':1,
								'totalendframe':zendframe
							};
							WTW.myAvatar.WTW.animations = zavataranimationdefs;
							WTW.myAvatar.WTW.animations.running = [];
							WTW.myAvatar.WTW.animations.running['onrotateup'] = {
								'weight':0,
								'active':0
							};
							WTW.myAvatar.WTW.animations.running['onrotatedown'] = {
								'weight':0,
								'active':0
							};
							if (zendframe > 0) {
								WTW.myAvatar.WTW.animations.running[zavataranimationdefs[0].animationevent] = scene.beginWeightedAnimation(zskeleton, Number(zavataranimationdefs[0].startframe), Number(zavataranimationdefs[0].endframe), 1, zavataranimationdefs[0].animationloop, Number(zavataranimationdefs[0].speedratio));
								WTW.avatarMinLoadEnter(zavatarname);
							} else {
								WTW.loadAvatarAnimations(zavatarname);
							}
						}
					}
				}
				wtw_baseanimationframes = WTW.getLastAnimationKey(WTW.myAvatar);
				WTW.stopLoading();
				WTW.updateDisplayName(dGet('wtw_tnewavatardisplayname').value);
			}
		);
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-loadAvatarMeshes=' + ex.message);
	}
}

WTWJS.prototype.loadAnimations = async function() {
	/* load avatar animation settings into an array for edit */
	try {
		var j = 0;
		WTW.avatarAnimations = [];
		WTW.getAsyncJSON('/connect/avataranimations.php', 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				for (var i=0;i<zresponse.avataranimations.length;i++) {
					if (zresponse.avataranimations[i] != null) {
						let zeventname = WTW.getAnimationEventName(zresponse.avataranimations[i].animationevent);
						if (zeventname != '') {
							let zselected = false;
							if (wtw_avatardef != null) {
								if (wtw_avatardef.avataranimationdefs != null) {
									if (wtw_avatardef.avataranimationdefs.length > 0) {
										for (var k=0;k<wtw_avatardef.avataranimationdefs.length;k++) {
											if (wtw_avatardef.avataranimationdefs[k] != undefined) {
												if (wtw_avatardef.avataranimationdefs[k].avataranimationid == zresponse.avataranimations[i].avataranimationid) {
													zselected = true;
												}
											}
										}
									}
								}
							}
							WTW.avatarAnimations[j] = {
								'avataranimationid': zresponse.avataranimations[i].avataranimationid,
								'animationevent': zresponse.avataranimations[i].animationevent,
								'animationeventname':zeventname,
								'animationfriendlyname': zresponse.avataranimations[i].animationfriendlyname,
								'loadpriority': zresponse.avataranimations[i].loadpriority,
								'animationicon': zresponse.avataranimations[i].animationicon,
								'speedratio': zresponse.avataranimations[i].speedratio,
								'objectfolder': zresponse.avataranimations[i].objectfolder,
								'objectfile': zresponse.avataranimations[i].objectfile,
								'startframe': zresponse.avataranimations[i].startframe,
								'endframe': zresponse.avataranimations[i].endframe,
								'soundid': zresponse.avataranimations[i].soundid,
								'soundpath': zresponse.avataranimations[i].soundpath,
								'soundmaxdistance': zresponse.avataranimations[i].soundmaxdistance,
								'selected': zselected
							}
							j += 1;
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-loadAnimations=' + ex.message);
	}
}

WTWJS.prototype.chooseAvatar = async function() {
	/* open horizontal scroll of avatar images to select the avatar */
	try {
		WTW.startLoading();
		if (wtw_avatarselector != null) {
			wtw_avatarselector.dispose();
		}
		WTW.avatars = [];
		WTW.getAsyncJSON('/connect/avatars.php', 
			function(zresponse) {
				if (zresponse != null) {
					zresponse = JSON.parse(zresponse);
					if (zresponse.avatars != null) {
						if (zresponse.avatars.length > 0) {
							wtw_avatarselector = new BABYLON.GUI.ScrollViewer('ChooseAvatar');
							wtw_avatarselector.width = .96;
							wtw_avatarselector.height = '225px';
							wtw_avatarselector.background = 'gray';
							wtw_avatarselector.barColor = 'tan';
							wtw_avatarselector.barBackground = 'black';
							wtw_avatarselector.thumbLength = .5;
							wtw_avatarselector.barSize = 20;
							wtw_avatarselector.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
							gui.addControl(wtw_avatarselector);
							var zgrid = new BABYLON.GUI.Grid();
							zgrid.width = (202 * zresponse.avatars.length) + 'px';
							zgrid.height = '200px';
							for (var i=0; i<zresponse.avatars.length;i++) {
								zgrid.addColumnDefinition(1/zresponse.avatars.length);
							}
							zgrid.addRowDefinition(1);
							wtw_avatarselector.addControl(zgrid);
							for (var i=0; i<zresponse.avatars.length;i++) {
								var zavatarid = zresponse.avatars[i].avatarid;
								var zbutton = BABYLON.GUI.Button.CreateImageWithCenterTextButton(zavatarid + '-button', zresponse.avatars[i].displayname, zresponse.avatars[i].objects.folder + zresponse.avatars[i].snapshots.thumbnail);
								zbutton.width = '240px';
								zbutton.height = '200px';
								zbutton.color = 'white';
								zbutton.background = 'green';
								zbutton.onPointerClickObservable.add(function(ev, state) {WTW.selectAvatar(state.currentTarget.name.split('-')[0]);});
								zgrid.addControl(zbutton, 0, i);
								
								WTW.avatars[i] = {
									'avatarid': zresponse.avatars[i].avatarid,
									'avatargroup': zresponse.avatars[i].avatargroup,
									'displayname': zresponse.avatars[i].displayname,
									'avatardescription': zresponse.avatars[i].avatardescription,
									'gender': zresponse.avatars[i].gender,
									'objects': {
										'folder': zresponse.avatars[i].objects.folder,
										'file': zresponse.avatars[i].objects.file
									},
									'scaling': {
										'x': zresponse.avatars[i].scaling.x,
										'y': zresponse.avatars[i].scaling.y,
										'z': zresponse.avatars[i].scaling.z
									},
									'snapshots': {
										'full': zresponse.avatars[i].snapshots.full,
										'thumbnail': zresponse.avatars[i].snapshots.thumbnail
									},
									'sortorder': zresponse.avatars[i].sortorder,
									'selected': false
								}
							}
						}
					}
				}
				WTW.stopLoading();
			}
		);
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-chooseAvatar=' + ex.message);
	}
}

WTWJS.prototype.updateColorByHex = function(zhex) {
	/* when a hex color code is changed, this process updates the mesh and color picker wheel selection */
	try {
		if (/^#([0-9A-F]{3}){1,2}$/i.test(zhex) == false) {
			zhex = '#FFFFFF';
		}
		var zmold = WTW.getMeshOrNodeByID(dGet('wtw_tmoldname').value);
		if (zmold != null) {
			if (dGet('wtw_tcolortype').value  == 'Diffuse') {
				zmold.material.diffuseColor = new BABYLON.Color3.FromHexString(zhex);
				zmold.material.ambientColor = new BABYLON.Color3.FromHexString(zhex);
				WTW.updateAvatarPartColor(zhex);
				wtw_colorpicker.value = zmold.material.diffuseColor;
			} else {
				zmold.material.emissiveColor = new BABYLON.Color3.FromHexString(zhex);
				zmold.material.specularColor = new BABYLON.Color3.FromHexString(zhex);
				WTW.updateAvatarPartColor(zhex);
				wtw_colorpicker.value = zmold.material.emissiveColor;
			}
			if (wtw_activeinput != null) {
				wtw_activeinput.text = zhex.toUpperCase();
				wtw_activeinput.background = zhex;
				wtw_activeinput.color = WTW.setTextColor(zhex, '#ffffff', '#000000');
				wtw_activeinput.focusedBackground = '#000000';
				if (wtw_activeinput.color == '#000000') {
					wtw_activeinput.focusedBackground = '#ffffff';
				}
			}
		}
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-updateColorByHex=' + ex.message);
	}
}

WTWJS.prototype.getMyAvatarPart = function(zpart) {
	/* when an avatar part is selected, this loads the part to be edited (for color selection) */
	let zmoldname = '';
	try {
		if (zpart == undefined) {
			zpart = '';
		}
		for (var i=0;i<WTW.avatarParts.length;i++) {
			if (WTW.avatarParts[i] != null) {
				if ((zpart == '' && i == 0) || WTW.avatarParts[i].part == zpart) {
					zmoldname = WTW.avatarParts[i].moldname;
					dGet('wtw_tmoldname').value = zmoldname;
					dGet('wtw_tavatarpart').value = WTW.avatarParts[i].part;
					var zmold = WTW.getMeshOrNodeByID(zmoldname);
					if (zmold != null && wtw_colorpicker != null) {
						if (dGet('wtw_tcolortype').value == 'Diffuse') {
							wtw_colorpicker.value = zmold.material.diffuseColor;
						} else {
							wtw_colorpicker.value = zmold.material.emissiveColor;
						}
						WTW.hilightMoldFast(zmoldname, 'yellow');
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-getMyAvatarPart=' + ex.message);
	}
	return zmoldname;
}

WTWJS.prototype.updateAvatarPartColor = function(zhex) {
	/* update the color selected to the local array of color settings (used for saving) */
	try {
		for (var i=0;i<WTW.avatarParts.length;i++) {
			if (WTW.avatarParts[i] != null) {
				if (WTW.avatarParts[i].part == dGet('wtw_tavatarpart').value) {
					if (dGet('wtw_tcolortype').value == 'Diffuse') {
						WTW.avatarParts[i].ambientcolor = zhex;
						WTW.avatarParts[i].diffusecolor = zhex;
					} else {
						WTW.avatarParts[i].emissivecolor = zhex;
						WTW.avatarParts[i].specularcolor = zhex;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-updateAvatarPartColor=' + ex.message);
	}
}

WTWJS.prototype.setMyAvatarColor = function(r, g, b) {
	/* on change of color, this function updates the avatar part with the color selected */
	try {
		var zmold = WTW.getMeshOrNodeByID(dGet('wtw_tmoldname').value);
		var zpartcolor = '#ffffff';
		if (zmold != null) {
			switch (dGet('wtw_tcolortype').value) {
				case 'Diffuse':
					zmold.material.diffuseColor = new BABYLON.Color3(r,g,b);
					zmold.material.ambientColor = new BABYLON.Color3(r,g,b);
					zpartcolor = zmold.material.diffuseColor.toHexString();
					break;
				case 'Specular':
					zmold.material.specularColor = new BABYLON.Color3(r,g,b);
					zpartcolor = zmold.material.specularColor.toHexString();
					break;
				case 'Emissive':
					zmold.material.specularColor = new BABYLON.Color3(r,g,b);
					zmold.material.emissiveColor = new BABYLON.Color3(r,g,b);
					zpartcolor = zmold.material.emissiveColor.toHexString();
					break;
				case 'Ambient':
					zmold.material.ambientColor = new BABYLON.Color3(r,g,b);
					zpartcolor = zmold.material.ambientColor.toHexString();
					break;
			}
			var zcovering = zmold.material;
			zmold.material.dispose();
			zmold.material = zcovering;
			if (wtw_activeinput != null) {
				wtw_activeinput.text = zpartcolor;
				wtw_activeinput.background = zpartcolor;
				wtw_activeinput.color = WTW.setTextColor(zpartcolor, '#ffffff', '#000000');
				wtw_activeinput.focusedBackground = '#000000';
				if (wtw_activeinput.color == '#000000') {
					wtw_activeinput.focusedBackground = '#ffffff';
				}
				WTW.updateAvatarPartColor(zpartcolor);
			}
		}
		scene.render();
	} catch (ex) {
		WTW.log('avatars-loadavatar-setMyAvatarColor=' + ex.message);
	}
}

WTWJS.prototype.setTextColor = function(zbgcolor, zlightcolor, zdarkcolor) {
	/* when the color is selected, the form updates the color to the background */
	/* this also sets the text color to an opposite color than the background (default is black or white) */
	var zcolor = 'black';
	try {
		if (zlightcolor == undefined) {
			zlightcolor = '#ffffff';
		}
		if (zdarkcolor == undefined) {
			zdarkcolor = '#000000';
		}
		var zcolorstring = (zbgcolor.charAt(0) === '#') ? zbgcolor.substring(1, 7) : zbgcolor;
		var zred = parseInt(zcolorstring.substring(0, 2), 16); // hexToR
		var zgreen = parseInt(zcolorstring.substring(2, 4), 16); // hexToG
		var zblue = parseInt(zcolorstring.substring(4, 6), 16); // hexToB
		var zuicolors = [zred / 255, zgreen / 255, zblue / 255];
		var zcols = zuicolors.map((zcol) => {
			if (zcol <= 0.03928) {
				return zcol / 12.92;
			}
			return Math.pow((zcol + 0.055) / 1.055, 2.4);
		});
		var zcompare = (0.2126 * zcols[0]) + (0.7152 * zcols[1]) + (0.0722 * zcols[2]);
		zcolor = (zcompare > 0.179) ? zdarkcolor : zlightcolor;
	} catch (ex) {
		WTW.log('avatars-loadavatar-setTextColor=' + ex.message);
	}
	return zcolor;
}

WTWJS.prototype.updateDisplayName = function(ztext) {
	/* update text name over avatar to match profile name */
	try {
		dGet('wtw_tnewavatardisplayname').value = ztext;
		WTW.showIDs(ztext);
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-updateDisplayName=' + ex.message);
	}
}

WTWJS.prototype.closeMenu = function() {
	/* close all menus - prep for opening the next menu option */
	try {
		if (wtw_leftmenu != null) {
			wtw_leftmenu.dispose();
			wtw_leftmenu = null;
		}
		if (wtw_rightmenu != null) {
			wtw_rightmenu.dispose();
			wtw_rightmenu = null;
		}
		if (wtw_rightmenulower != null) {
			wtw_rightmenulower.dispose();
			wtw_rightmenulower = null;
		}
		if (wtw_colormenu != null) {
			wtw_colormenu.dispose();
			wtw_colormenu = null;
		}
		if (wtw_avatarselector != null) {
			wtw_avatarselector.dispose();
			wtw_avatarselector = null;
		}
		if (wtw_colorpicker != null) {
			wtw_colorpicker.dispose();
			wtw_colorpicker = null;
		}
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-closeMenu=' + ex.message);
	}
}

WTWJS.prototype.preloadAvatar = async function(zavatarid) {
	/* load the basic avatar settings */
	try {
		WTW.getAsyncJSON('/connect/avatar.php?avatarid=' + zavatarid, 
			function(zresponse) {
				if (zresponse != null) {
					zresponse = JSON.parse(zresponse);
					if (zresponse.avatar != null) {
						WTW.loadAvatarMeshes(zresponse.avatar);
						WTW.showIDs(dGet('wtw_tnewavatardisplayname').value);
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-preloadAvatar=' + ex.message);
	}
}

WTWJS.prototype.selectAvatar = function(zavatarid) {
	/* on select avatar, this reloads the avatar by the selected avatar id */
	try {
		if (wtw_loadingtimer != null) {
			WTW.stopLoading();
		}
		for (var i=0;i<WTW.avatars.length;i++) {
			if (WTW.avatars[i] != null) {
				var zloadedavatarid = '';
				if (wtw_avatardef != null) {
					if (wtw_avatardef.avatarid != undefined) {
						zloadedavatarid = wtw_avatardef.avatarid;
					}
				}
				if (WTW.avatars[i].avatarid == zavatarid) {
					WTW.avatars[i].selected = true;
					if (zloadedavatarid == zavatarid) {
						WTW.loadAvatarMeshes(wtw_avatardef);
					} else {
						WTW.loadAvatarMeshes(WTW.avatars[i]);
					}
				} else {
					WTW.avatars[i].selected = false;
				}
			}
		}
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-selectAvatar=' + ex.message);
	}
}

WTWJS.prototype.startLoading = function() {
	/* show the blinking loading text */
	try {
		if (wtw_loadingtimer == null) {
			wtw_loadingtimer = window.setInterval(function() {
				if (wtw_loadingtext == null) {
					wtw_loadingtext = new BABYLON.GUI.TextBlock();
					wtw_loadingtext.text = 'Loading...';
					wtw_loadingtext.color = 'yellow';
					wtw_loadingtext.fontSize = 120;
					wtw_loadingtext.height = '180px';
					gui.addControl(wtw_loadingtext);
				} else {
					wtw_loadingtext.dispose();
					wtw_loadingtext = null;
				}
			}, 500);
		}
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-startLoading=' + ex.message);
	}
}

WTWJS.prototype.stopLoading = function() {
	/* stop the blinking loading text */
	try {
		if (wtw_loadingtimer != null) {
			window.clearInterval(wtw_loadingtimer);
			wtw_loadingtimer = null;
		}
		if (wtw_loadingtext != null) {
			wtw_loadingtext.dispose();
			wtw_loadingtext = null;
		}
	} catch (ex) {
		WTW.log('wtw-avatars-scripts-wtwavatars_designer.js-stopLoading=' + ex.message);
	}
}

WTWJS.prototype.mouseClick = function(e) {
	/* on mouse click event, used to select the part of the avatar to color on the avatar color menu option */
	try {
		e = e || window.event;
		var zpickedresult = scene.pick(e.clientX, e.clientY);
		var zpickedname = '';
		if (zpickedresult.pickedMesh == null) {
			if (WTW.currentID != '') {
				zpickedresult.pickedMesh = WTW.getMeshOrNodeByID(WTW.currentID);
			}
			zpickedname = WTW.currentID;
		} else {
			zpickedname = zpickedresult.pickedMesh.name;
		}
		if (zpickedname != '') {
			switch (dGet('wtw_activemenu').value) {
				case '2':
					if (zpickedname.indexOf('-') > -1) {
						let part = zpickedname.split('-')[2];
						WTW.getMyAvatarPart(part);
						WTW.loadLeftMenu(2);
					}
					break;
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-prime-wtw_input.js-mouseClick=' + ex.message);
    }
}

window.addEventListener('resize', function () {
	/* resize the canvas when the window is resized */
	engine.resize();
});

window.onload = function () {
	/* window on load event */
	/* add onclick event listener */
	dGet('renderCanvas').addEventListener('click', WTW.mouseClick);
	/* add on message event listener to talk with parent frame */
	if (window.addEventListener) {
		window.addEventListener('message', WTW.onMessage, false);        
	} else if (window.attachEvent) {
		window.attachEvent('onmessage', WTW.onMessage, false);
	}
	/* get avatar speed settings */
	var zwalkspeed = WTW.getCookie('walkspeed');
	if (zwalkspeed != null) {
		if (WTW.isNumeric(zwalkspeed)) {
			WTW.walkSpeed = Number(zwalkspeed);
		}
	}
	var zwalkanimationspeed = WTW.getCookie('walkanimationspeed');
	if (zwalkanimationspeed != null) {
		if (WTW.isNumeric(zwalkanimationspeed)) {
			WTW.walkAnimationSpeed = Number(zwalkanimationspeed);
		}
	}
	var zturnspeed = WTW.getCookie('turnspeed');
	if (zturnspeed != null) {
		if (WTW.isNumeric(zturnspeed)) {
			WTW.turnSpeed = Number(zturnspeed);
		}
	}
	var zturnanimationspeed = WTW.getCookie('turnanimationspeed');
	if (zturnanimationspeed != null) {
		if (WTW.isNumeric(zturnanimationspeed)) {
			WTW.turnAnimationSpeed = Number(zturnanimationspeed);
		}
	}
	/* get canvas and initiate the create scene function (and start render loop for animation) */
	canvas = document.getElementById('renderCanvas');
	engine = new BABYLON.Engine(canvas, true);
	WTW.createScene();
	engine.runRenderLoop(function () {
		scene.render();
	});
}

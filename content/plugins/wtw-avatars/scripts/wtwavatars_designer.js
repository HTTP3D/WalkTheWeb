/* avatar designer scripts - works menus and avatar settings */
/* global values used for the avatar designer only (page loads as iframe) */
var scene, canvas, engine, camera, gui;
var avatarSelector, leftMenu, rightMenu, rightMenuLower, colorMenu, colorpicker, activeinput, loadingtext, loadingtimer, activeMenu;
var runningevent = '';
var lasteditavatarid = '';
var editmode = false;
var baseanimationframes = 0;
var showglobal = true;
var avatardef = null;

WTWJS.prototype.createScene = function() {
	/* create the avatar designer scene - lighting designed to match the default WalkTheWeb scene */
	try {
		console.log("%c\r\n\r\nWalkTheWeb 3D Avatar Designer\r\nHTTP3D Inc. (v1.0.0) 04-17-2020", "color:green;font-weight:bold;");
		if (BABYLON.Engine.isSupported()) {
			WTW.loadAnimations();
			var instanceid = WTW.getCookie("instanceid");
			if (dGet('wtw_tinstanceid').value == '' && instanceid != null) {
				if (instanceid.length == 24) {
					dGet('wtw_tinstanceid').value = instanceid;
				}
			}
			if (dGet('wtw_tinstanceid').value.length != 24) {
				instanceid = WTW.getRandomString(24);
				dGet('wtw_tinstanceid').value = instanceid;
			}
			WTW.setCookie("instanceid", instanceid, 365);
			scene = new BABYLON.Scene(engine);
			scene.autoClear = false;
			scene.autoClearDepthAndStencil = false;
			scene.ambientColor = new BABYLON.Color3(.3, .3, .3);

			camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", BABYLON.Tools.ToRadians(0), Math.PI/2, 30, new BABYLON.Vector3(0,0,0), scene);
			camera.attachControl(canvas, true);

			/* direct light immitating the sun */
			WTW.sun = new BABYLON.DirectionalLight("sun", new BABYLON.Vector3(-1, -1, -1), scene);
			WTW.sun.position = new BABYLON.Vector3(-50, 500, 0);
			WTW.sun.intensity = 1;
			WTW.sun.shadowMinZ = 1;
			WTW.sun.shadowMaxZ = 4000;
			WTW.sun.ambient = new BABYLON.Color3(.4, .4, .4);
			WTW.sun.diffuse = new BABYLON.Color3(.4, .4, .4);
			WTW.sun.specular = new BABYLON.Color3(.2, .2, .2);
			WTW.sun.groundColor = new BABYLON.Color3(.1, .1, .1);

			/* lesser light for back sides */
			WTW.backLight = new BABYLON.DirectionalLight("backlight", new BABYLON.Vector3(1, -1, 1), scene);
			WTW.backLight.intensity = WTW.sun.intensity / 1.5; //3;
			
			var zsetupparent = BABYLON.MeshBuilder.CreateBox("setupparent-0", {}, scene);
			zsetupparent.material = new BABYLON.StandardMaterial("matsetupparent" + moldname, scene);
			zsetupparent.material.alpha = 0;
			zsetupparent.position.y = -5;
			
			var bgsphere = BABYLON.MeshBuilder.CreateSphere("bgsphere", {segments: 16, diameter:1, updatable: true, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
			bgsphere.scaling = new BABYLON.Vector3(600, 600, 600); 
			bgsphere.isPickable = false;

			WTW.mouseOver = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, WTW.mouseOverMold);
			WTW.mouseOut = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, WTW.mouseOutMold);
			scene.actionManager = new BABYLON.ActionManager(scene);
			
			gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
			
			var zuseravatarid = WTW.getQuerystring('useravatarid','');
			var zglobalavatarid = WTW.getQuerystring('globalavatarid','');
			var zglobaluserid = WTW.getQuerystring('globaluserid','');
			dGet('wtw_tuseravatarid').value = zuseravatarid;
			dGet('wtw_tglobalavatarid').value = zglobalavatarid;
			dGet('wtw_tglobaluserid').value = zglobaluserid;
			if (zglobalavatarid != '' || dGet('wtw_tglobaluserid').value != '') {
				dGet('wtw_tglobalavatar').value = '1';
			} else {
				dGet('wtw_tglobalavatar').value = '0';
			}
			if (zuseravatarid != '') {
				WTW.loadDesignerAvatar(zglobalavatarid, zuseravatarid);
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
			WTW.log("WebGL not supported");
		}
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-createScene=" + ex.message);
	}
}

WTWJS.prototype.loadLeftMenu = function(zactive) {
	/* load the left menu, zactive sets the menu items to load */
	try {
		if (zactive == undefined || zactive == null) {
			zactive = 1;
		}
		WTW.closeMenu();
		if (zactive != 3 && runningevent != '' && WTW.myAvatar.WTW.animations.running[runningevent] != undefined) {
			WTW.myAvatar.WTW.animations.running[runningevent].weight = 0;
			WTW.myAvatar.WTW.animations.running['onwait'].weight = 1;
			runningevent = '';
			dGet('wtw_tavataranimationevent').value = '';
			dGet('wtw_tanimationfriendlyname').value = '';
			dGet('wtw_tanimationind').value = '';
		}
		dGet('wtw_activemenu').value = zactive;
		leftMenu = new BABYLON.GUI.Grid();
		leftMenu.width = "330px";
		leftMenu.height = "450px";
		leftMenu.leftInPixels = 20;
		leftMenu.addColumnDefinition(1);
		leftMenu.addRowDefinition(1/5);
		leftMenu.addRowDefinition(1/5);
		leftMenu.addRowDefinition(1/5);
		leftMenu.addRowDefinition(1/5);
		leftMenu.addRowDefinition(1/5);
		leftMenu.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
		leftMenu.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
		gui.addControl(leftMenu);
		
		/* select my avatar button */
		var button0 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("selectavatar-button", 'Select My Avatar', 'image');
		button0.width = "330px";
		button0.height = "60px";
		if (zactive  == 0) {
			/* set active button blue with yellow text */
			button0.color = "yellow";
			button0.background = "blue";
			if (dGet('wtw_tavatarid').value == "") {
				button0.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(0);});
			} else {
				button0.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(1);});
			}
		} else {
			button0.color = "white";
			button0.background = "green";
			button0.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(0);});
		}
		leftMenu.addControl(button0, 1, 0);
		
		if (dGet('wtw_tavatarid').value != "") {
			/* avatar profile button */
			var button1 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("avatarprofile-button", 'Avatar Profile', 'image');
			button1.width = "330px";
			button1.height = "60px";
			if (zactive  == 1) {
				/* set active button blue with yellow text */
				button1.color = "yellow";
				button1.background = "blue";
			} else {
				button1.color = "white";
				button1.background = "green";
			}
			button1.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(1);});
			leftMenu.addControl(button1, 0, 0);

			/* avatar colors button */
			var button2 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("avatarcolors-button", 'Avatar Colors', 'image');
			button2.width = "330px";
			button2.height = "60px";
			if (zactive  == 2) {
				/* set active button blue with yellow text */
				button2.color = "yellow";
				button2.background = "blue";
				button2.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(1);});
			} else {
				button2.color = "white";
				button2.background = "green";
				button2.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(2);});
			}
			leftMenu.addControl(button2, 2, 0);

			/* avatar animations button */
			var button3 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("avataranimations-button", 'Avatar Animations', 'image');
			button3.width = "330px";
			button3.height = "60px";
			if (zactive  == 3) {
				/* set active button blue with yellow text */
				button3.color = "yellow";
				button3.background = "blue";
				button3.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(1);});
			} else {
				button3.color = "white";
				button3.background = "green";
				button3.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(3);});
			}
			leftMenu.addControl(button3, 3, 0);

			/* save and continue button */
			var button4 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("save-button", 'Save and Continue', 'image');
			button4.width = "330px";
			button4.height = "60px";
			if (zactive  == 4) {
				button4.color = "yellow";
				button4.background = "blue";
			} else {
				button4.color = "white";
				button4.background = "green";
			}
			button4.onPointerClickObservable.add(function(ev, state) {WTW.saveMyAvatar();WTW.loadLeftMenu(4);});
			leftMenu.addControl(button4, 4, 0);
		}
		WTW.loadRightMenu(zactive);
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-loadLeftMenu=" + ex.message);
	}
}

WTWJS.prototype.loadRightMenu = function(zactive) {
	/* load the right menu, zactive sets the menu items to load */
	try {
		if (zactive == undefined) {
			zactive = -1;
		}
		activeMenu = zactive;
		if (rightMenu != null) {
			rightMenu.dispose();
			rightMenu = null;
			if (loadingtimer != null) {
				window.clearTimeout(loadingtimer);
				loadingtimer = null;
			}
		}
		rightMenu = new BABYLON.GUI.Grid();
		rightMenu.rightInPixels = 20;
		rightMenu.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
		rightMenu.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
	
		switch (zactive) {
			case 0:   /* select avatar options */
				rightMenu.width = "330px";
				rightMenu.height = "200px";
				WTW.chooseAvatar();
				break;
			case 1:   /* select avatar profile settings */
				if (dGet('wtw_tavatarid').value != "") {
					rightMenu.width = "330px";
					rightMenu.height = "400px";
					rightMenu.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
					rightMenu.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
					rightMenu.addColumnDefinition(1);
					rightMenu.addRowDefinition(1/8);
					rightMenu.addRowDefinition(1/8);
					rightMenu.addRowDefinition(1/8);
					rightMenu.addRowDefinition(1/8);
					rightMenu.addRowDefinition(1/8);
					rightMenu.addRowDefinition(1/8);
					rightMenu.addRowDefinition(1/8);
					rightMenu.addRowDefinition(1/8);
					
					var text1 = new BABYLON.GUI.TextBlock();
					text1.text = "Display Name:";
					text1.color = "white";
					text1.fontSize = 24;
					text1.height = "30px";
					rightMenu.addControl(text1, 0, 0);
					
					var zdisplayname = dGet('wtw_tdisplayname').value;
					if (zdisplayname == '') {
						zdisplayname = "Anonymous";
					}
					var input = new BABYLON.GUI.InputText();
					input.promptMessage = "Display Name";
					input.width = "300px";
					input.height = "40px";
					input.text = zdisplayname;
					input.color = "white";
					input.background = "#2F4720";
					input.onFocusSelectAll = true;
					input.onTextChangedObservable.add(function(value) {WTW.updateDisplayName(value.text);});
					rightMenu.addControl(input, 1, 0);
					
					if (showglobal) {
						var button1 = new BABYLON.GUI.RadioButton();
						button1.name = "globalavatar";
						button1.width = "30px";
						button1.height = "30px";
						button1.color = "white";
						button1.group = "global";
						var text2 = new BABYLON.GUI.TextBlock();
						if (dGet('wtw_tglobaluserid').value != '') {
							button1.isChecked = true;
							WTW.updateGlobalAvatar("1");
							button1.background = "green";
							button1.onIsCheckedChangedObservable.add(function(state) {if (state) {WTW.updateGlobalAvatar("1");}}); 
							text2.text = "Works on most WalkTheWeb 3D Websites Globally";
							text2.color = "#afafaf";
						} else {
							button1.isChecked = false;
							WTW.updateGlobalAvatar("0");
							button1.background = "red";
							button1.onIsCheckedChangedObservable.add(function(state) {if (state) {WTW.updateGlobalAvatar("0");state.checked=false;}}); 
							text2.text = "Requires Global Login";
							text2.color = "red";
						}
						var label1 = BABYLON.GUI.Control.AddHeader(button1, 'WalkTheWeb Global Avatar', "270px", { isHorizontal: true, controlFirst: true });
						label1.height = "40px";
						label1.width = "270px";
						label1.color = "white";
						rightMenu.addControl(label1, 3, 0);

						text2.fontSize = 20;
						text2.height = "100px";
						text2.textWrapping = true;
						text2.textHorizontalAlignment = 3;
						rightMenu.addControl(text2, 4, 0);

						var button2 = new BABYLON.GUI.RadioButton();
						button2.name = "localavatar";
						button2.width = "30px";
						button2.height = "30px";
						button2.color = "white";
						button2.background = "green";     
						button2.group = "global";
						if (dGet('wtw_tglobaluserid').value == '') {
							button2.isChecked = true;
						}
						button2.onIsCheckedChangedObservable.add(function(state) {if (state) {WTW.updateGlobalAvatar("0");}}); 
						var label2 = BABYLON.GUI.Control.AddHeader(button2, 'Local 3D Website Avatar', "270px", { isHorizontal: true, controlFirst: true });
						label2.height = "40px";
						label2.width = "270px";
						label2.color = "white";
						rightMenu.addControl(label2, 6, 0);

						var text3 = new BABYLON.GUI.TextBlock();
						text3.text = "Works on Local 3D Websites on the same Web Server";
						text3.color = "#afafaf";
						text3.fontSize = 20;
						text3.height = "100px";
						text3.textWrapping = true;
						text3.textHorizontalAlignment = 3;
						rightMenu.addControl(text3, 7, 0);
					}
				}
				break;
			case 2:   /* avatar colors settings */
				if (dGet('wtw_tavatarid').value != "") {
					if (colorMenu != null) {
						colorMenu.dispose();
					}
					colorMenu = new BABYLON.GUI.Grid();
					colorMenu.topInPixels = 75;
					colorMenu.rightInPixels = 340;
					colorMenu.width = "510px";
					colorMenu.height = "150px";
					colorMenu.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
					colorMenu.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
					colorMenu.addColumnDefinition(1/3);
					colorMenu.addColumnDefinition(1/3);
					colorMenu.addColumnDefinition(1/3);
					colorMenu.addRowDefinition(1);
				
					rightMenu.topInPixels = 20;
					rightMenu.width = "330px";
					if (WTW.avatarParts != null) {
						if (WTW.avatarParts.length > 0) {
							rightMenu.height = ((WTW.avatarParts.length + 2.5) * 100) + "px";
							rightMenu.addColumnDefinition(2/3);
							rightMenu.addColumnDefinition(1/3);
							rightMenu.addRowDefinition(1/(WTW.avatarParts.length + 1));
							for (var i=0;i<WTW.avatarParts.length;i++) {
								if (WTW.avatarParts[i] != null) {
									rightMenu.addRowDefinition(1/(WTW.avatarParts.length + 1));
								}
							}
							WTW.avatarParts.sort(function(a,b){return a.part < b.part ? -1 : 1}); 
						}
					}
					var zmoldname = WTW.getMyAvatarPart(dGet('wtw_tavatarpart').value);
					dGet('wtw_tmoldname').value = zmoldname;
					var zmold = scene.getMeshByID(zmoldname);
					if (colorpicker == null) {
						colorpicker = new BABYLON.GUI.ColorPicker();
						colorpicker.name = "avatarcolorpicker";
						colorpicker.id = "avatarcolorpicker";
						if (zmold != null) {
							if (dGet('wtw_tcolortype').value  == 'Diffuse') {
								colorpicker.value = zmold.material.diffuseColor;
							} else {
								colorpicker.value = zmold.material.emissiveColor;
							}
						} else {
							colorpicker.value = new BABYLON.Vector3(1, 1, 1);
						}
						colorpicker.height = "150px";
						colorpicker.width = "150px";
						colorpicker.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
						colorpicker.onValueChangedObservable.add(function(value) {
							if (value != null) {
								WTW.setMyAvatarColor(value.r, value.g, value.b);
							}
						});
					}
					colorMenu.addControl(colorpicker,0,0);

					var zdiffusebutton = BABYLON.GUI.Button.CreateImageWithCenterTextButton('diffuse-button', 'Diffuse', 'image');
					zdiffusebutton.width = "210px";
					zdiffusebutton.height = "50px";
					if (dGet('wtw_tcolortype').value  == 'Diffuse') {
						zdiffusebutton.color = "yellow";
						zdiffusebutton.background = "blue";
					} else {
						zdiffusebutton.color = "white";
						zdiffusebutton.background = "green";
					}
					zdiffusebutton.onPointerClickObservable.add(function(ev, state) { dGet('wtw_tcolortype').value='Diffuse';WTW.loadLeftMenu(2);});
					rightMenu.addControl(zdiffusebutton, 0, 0);

					var zemissivebutton = BABYLON.GUI.Button.CreateImageWithCenterTextButton('emissive-button', 'Emissive', 'image');
					zemissivebutton.width = "210px";
					zemissivebutton.height = "50px";
					if (dGet('wtw_tcolortype').value  == 'Emissive') {
						zemissivebutton.color = "yellow";
						zemissivebutton.background = "blue";
					} else {
						zemissivebutton.color = "white";
						zemissivebutton.background = "green";
					}
					zemissivebutton.onPointerClickObservable.add(function(ev, state) { dGet('wtw_tcolortype').value='Emissive';WTW.loadLeftMenu(2);});
					rightMenu.addControl(zemissivebutton, 0, 1);

					if (WTW.avatarParts != null) {
						for (var i=0;i<WTW.avatarParts.length;i++) {
							if (WTW.avatarParts[i] != null) {
								rightMenu.addRowDefinition(1/(WTW.avatarParts.length + 1));
								var button1 = BABYLON.GUI.Button.CreateImageWithCenterTextButton(WTW.avatarParts[i].part + "-color-button", WTW.avatarParts[i].part, 'image');
								button1.width = "210px";
								button1.height = "50px";
								if (dGet('wtw_tavatarpart').value  == WTW.avatarParts[i].part) {
									button1.color = "black";
									button1.background = "yellow";
								} else {
									button1.color = "black";
									button1.background = "white";
								}
								button1.onPointerClickObservable.add(function(ev, state) {WTW.getMyAvatarPart(state.currentTarget.name.split('-')[0]);WTW.loadLeftMenu(2);});
								rightMenu.addControl(button1, i+1, 0);
								
								var zhex = WTW.avatarParts[i].emissivehex;
								if (dGet('wtw_tcolortype').value  == 'Diffuse') {
									zhex = WTW.avatarParts[i].diffusehex;
								}

								if (dGet('wtw_tavatarpart').value  == WTW.avatarParts[i].part) {
									activeinput = new BABYLON.GUI.InputText(WTW.avatarParts[i].part + "-color-input");
									activeinput.promptMessage = "Color (hex)";
									activeinput.width = "110px";
									activeinput.height = "50px";
									activeinput.text = zhex;
									activeinput.color = WTW.setTextColor(zhex, "#ffffff", "#000000");
									activeinput.background = zhex;
									activeinput.focusedBackground = "#000000";
									if (activeinput.color == "#000000") {
										activeinput.focusedBackground = "#ffffff";
									}
									activeinput.onFocusSelectAll = true;
									activeinput.onBlurObservable.add(function(value) {WTW.updateColorByHex(value.text);});
									activeinput.onTextPasteObservable.add(function(value) {WTW.updateColorByHex(value.text);});
									rightMenu.addControl(activeinput, i+1, 1);
								} else {
									var inputtext = new BABYLON.GUI.InputText(WTW.avatarParts[i].part + "-color-input");
									inputtext.promptMessage = "Color (hex)";
									inputtext.width = "110px";
									inputtext.height = "50px";
									inputtext.text = zhex;
									inputtext.color = WTW.setTextColor(zhex, "#ffffff", "#000000");
									inputtext.background = zhex;
									inputtext.focusedBackground = "#000000";
									if (inputtext.color == "#000000") {
										inputtext.focusedBackground = "#ffffff";
									}
									inputtext.onPointerClickObservable.add(function(ev, state) {WTW.getMyAvatarPart(state.currentTarget.name.split('-')[0]);WTW.loadLeftMenu(2);});
									rightMenu.addControl(inputtext, i+1, 1);
								}
							}
						}
					}
					gui.addControl(colorMenu);
				}
				break;
			case 3:   /* avatar animation settings */
				if (dGet('wtw_tavatarid').value != "") {
					rightMenu.topInPixels = 10;
					rightMenu.rightInPixels = 20;
					rightMenu.width = "350px";
					rightMenu.height = "60px";
					rightMenu.addColumnDefinition(2/3);
					rightMenu.addColumnDefinition(1/3);
					rightMenu.addRowDefinition(1);
					if (editmode && dGet('wtw_teditanimationevent').value == '') {
						if (dGet('wtw_tavataranimationevent').value != '') {
							dGet('wtw_teditanimationevent').value = dGet('wtw_tavataranimationevent').value;
						} else {
							dGet('wtw_teditanimationevent').value = 'onwalk';
						}
					}
					var zanimationname = 'Walk';
					if (editmode) {
						zanimationname = WTW.getAnimationEventName(dGet('wtw_teditanimationevent').value);
					}
					if (dGet('wtw_teditanimationevent').value != '' && editmode) {
						var button2 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("animationevent-button", zanimationname, 'image');
						button2.width = "220px";
						button2.height = "50px";
						button2.color = "yellow";
						button2.background = "blue";
						button2.onPointerClickObservable.add(function(ev, state) {WTW.selectAnimationEvent(dGet('wtw_teditanimationevent').value);});
						rightMenu.addControl(button2, 0, 0);
						WTW.selectAnimationEvent(dGet('wtw_teditanimationevent').value);
					} else {
						let zlabel = 'Select to Start & Stop:';
						if (editmode) {
							zlabel = zanimationname;
						}
						var button2 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("animationevent-button", zlabel, 'image');
						button2.width = "220px";
						button2.height = "50px";
						if (editmode) {
							button2.color = "#ffffff";
							button2.background = "green";
						} else {
							button2.color = "yellow";
							button2.background = "blue";
						}
						button2.onPointerClickObservable.add(function(ev, state) {WTW.selectAnimationEvent(dGet('wtw_tavataranimationevent').value);});
						rightMenu.addControl(button2, 0, 0);
						WTW.selectAnimationEvent(dGet('wtw_tavataranimationevent').value);
					}
					let zbuttonedit = "Edit";
					if (editmode) {
						zbuttonedit = "Save";
					}
					var button1 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("editanimation-button", zbuttonedit, 'image');
					button1.width = "110px";
					button1.height = "50px";
					if (editmode) {
						button1.color = "yellow";
						button1.background = "blue";
					} else {
						button1.color = "#ffffff";
						button1.background = "green";
					}
					button1.onPointerClickObservable.add(function(ev, state) {WTW.toggleEditAnimations();WTW.selectAnimationEvent(dGet('wtw_tavataranimationevent').value);});
					rightMenu.addControl(button1, 0, 1);
					
				}
				break;
			case 4:   /* save avatar settings */
				if (dGet('wtw_tavatarid').value != "") {
					rightMenu.topInPixels = 10;
					rightMenu.rightInPixels = 20;
					rightMenu.width = "350px";
					rightMenu.height = "300px";
					rightMenu.addColumnDefinition(1);
					rightMenu.addRowDefinition(1/2);
					rightMenu.addRowDefinition(1/2);
				
					var text1 = new BABYLON.GUI.TextBlock();
					text1.text = "Avatar Saved";
					text1.color = "green";
					text1.fontSize = 50;
					text1.height = "400px";
					text1.textWrapping = true;
					text1.textHorizontalAlignment = 3;
					rightMenu.addControl(text1, 0, 0);
					
					let zsaved = "WalkTheWeb Global and the Local 3D Websites";
					if (dGet('wtw_tglobalavatar').value == '0') {
						zsaved = "Local 3D Websites on the same Web Server";
					}
					var text2 = new BABYLON.GUI.TextBlock();
					text2.text = zsaved;
					text2.color = "green";
					text2.fontSize = 30;
					text2.height = "400px";
					text2.textWrapping = true;
					text2.textHorizontalAlignment = 3;
					rightMenu.addControl(text2, 1, 0);
					
					loadingtimer = window.setTimeout(function(){
						if (rightMenu != null && activeMenu == 4) {
							rightMenu.dispose();
							rightMenu = null;
						}
					},3000);
				}				
				break;
			default:
				
				break;
		}
		gui.addControl(rightMenu);
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-loadRightMenu=" + ex.message);
	}
}

WTWJS.prototype.loadDesignerAvatar = function(zglobalavatarid, zuseravatarid) {
	/* loads your currently selected avatar to the designer (if you have one selected) */
	try {
		WTW.startLoading();
		/* if it is a global avatar get form 3dnet.walktheweb.com */
		if (zglobalavatarid != '') {
			var zrequest = {
				'globalavatarid':btoa(zglobalavatarid),
				'serverinstanceid':btoa(dGet('wtw_serverinstanceid').value),
				'function':'getglobalavatar'
			};
			WTW.postJSON("https://3dnet.walktheweb.com/connect/globalavatar.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					if (zresponse.avatar != null) {
						avatardef = zresponse.avatar;
						dGet('wtw_tdisplayname').value = zresponse.avatar.displayname;
						dGet('wtw_tavatarid').value = zresponse.avatar.avatarid;
						dGet("wtw_tglobalavatarid").value = zresponse.avatar.globalavatarid;
						dGet("wtw_tuseravatarid").value = zresponse.avatar.useravatarid;
						if (WTW.avatarAnimations != null && avatardef.avataranimationdefs != null) {
							if (WTW.avatarAnimations.length > 0) {
								for (var i=0;i<WTW.avatarAnimations.length;i++) {
									if (WTW.avatarAnimations[i] != undefined) {
										if (WTW.avatarAnimations[i].avataranimationid != undefined) {
											for (var j=0;j<avatardef.avataranimationdefs.length;j++) {
												if (avatardef.avataranimationdefs[j] != null) {
													if (WTW.avatarAnimations[i].avataranimationid == avatardef.avataranimationdefs[j].avataranimationid) {
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
							'accesstoken':dGet('wtw_taccesstoken').value,
							'globaluserid':btoa(dGet('wtw_tglobaluserid').value),
							'serverinstanceid':btoa(dGet('wtw_serverinstanceid').value),
							'groups':'',
							'function':'getglobalavatars'
						};
						WTW.postJSON("https://3dnet.walktheweb.com/connect/globalavatars.php", zrequest2, 
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
													'gender': zresponse2.avatars[i].gender,
													'object': {
														'folder': zresponse2.avatars[i].object.folder,
														'file': zresponse2.avatars[i].object.file
													},
													'scaling': {
														'x': zresponse2.avatars[i].scaling.x,
														'y': zresponse2.avatars[i].scaling.y,
														'z': zresponse2.avatars[i].scaling.z
													},
													'thumbnails': {
														'imagefull': zresponse2.avatars[i].thumbnails.imagefull,
														'imageface': zresponse2.avatars[i].thumbnails.imageface
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
			WTW.getJSON("/connect/useravatar.php?a=" + btoa(zuseravatarid) + "&i=" + btoa(dGet('wtw_tinstanceid').value) + "&d=" + btoa(dGet('wtw_tuserid').value) + "&p=" + btoa(dGet('wtw_tuserip').value), 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					if (zresponse != null) {
						if (zresponse.avatar != null) {
							avatardef = zresponse.avatar;
							dGet('wtw_tdisplayname').value = zresponse.avatar.displayname;
							dGet('wtw_tavatarid').value = zresponse.avatar.avatarid;
							dGet("wtw_tglobalavatarid").value = '';
							dGet('wtw_tuseravatarid').value = zresponse.avatar.useravatarid;
							if (WTW.avatarAnimations != null && avatardef.avataranimationdefs != null) {
								if (WTW.avatarAnimations.length > 0) {
									for (var i=0;i<WTW.avatarAnimations.length;i++) {
										if (WTW.avatarAnimations[i] != undefined) {
											if (WTW.avatarAnimations[i].avataranimationid != undefined) {
												for (var j=0;j<avatardef.avataranimationdefs.length;j++) {
													if (avatardef.avataranimationdefs[j] != null) {
														if (WTW.avatarAnimations[i].avataranimationid == avatardef.avataranimationdefs[j].avataranimationid) {
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
							WTW.getJSON("/connect/avatars.php", 
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
														'gender': zresponse2.avatars[i].gender,
														'object': {
															'folder': zresponse2.avatars[i].object.folder,
															'file': zresponse2.avatars[i].object.file
														},
														'scaling': {
															'x': zresponse2.avatars[i].scaling.x,
															'y': zresponse2.avatars[i].scaling.y,
															'z': zresponse2.avatars[i].scaling.z
														},
														'thumbnails': {
															'imagefull': zresponse2.avatars[i].thumbnails.imagefull,
															'imageface': zresponse2.avatars[i].thumbnails.imageface
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
		WTW.log("avatars-loadavatar-loadDesignerAvatar=" + ex.message);
    }
}

WTWJS.prototype.saveMyAvatar = function() {
	/* save avatar settings */
	try {
		var zavatardef = [];
		let zobjectfolder = '';
		let zobjectfile = '';
		let zgender = '';
		let zscalingx = '';
		let zscalingy = '';
		let zscalingz = '';
		for (var i=0;i<WTW.avatars.length;i++) {
			if (WTW.avatars[i] != null) {
				if (WTW.avatars[i].avatarid != undefined) {
					if (WTW.avatars[i].avatarid == dGet('wtw_tavatarid').value) {
						zavatardef = WTW.avatars[i];
						zobjectfolder = WTW.avatars[i].object.folder;
						zobjectfile = WTW.avatars[i].object.file;
						zgender = WTW.avatars[i].gender;
						zscalingx = WTW.avatars[i].scaling.x;
						zscalingy = WTW.avatars[i].scaling.y;
						zscalingz = WTW.avatars[i].scaling.z;
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
			'displayname':dGet('wtw_tdisplayname').value,
			'function':'saveavatar'
		};
		WTW.postJSON("/core/handlers/wtwavatars-saveavatar.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.useravatarid != '') {
					dGet('wtw_tuseravatarid').value = zresponse.useravatarid;
					if (dGet('wtw_tglobalavatar').value == '1') {
						/* if checkbox for global is checked, save to global 3dnet.walktheweb.com */
						var zsecureprotocol = '0';
						if (wtw_protocol == "https://") {
							zsecureprotocol = '1';
						}
						if (zresponse.objectfolder.indexOf("http") == -1) {
							zresponse.objectfolder = "https://3dnet.walktheweb.com" + zresponse.objectfolder;
						}
						var zrequest2 = {
							'accesstoken':dGet('wtw_taccesstoken').value,
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
							'displayname':dGet('wtw_tdisplayname').value,
							'function':'saveavatar'
						};
						WTW.postJSON("https://3dnet.walktheweb.com/connect/globalsaveavatar.php", zrequest2, 
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
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-saveMyAvatar=" + ex.message);
	}
}

WTWJS.prototype.saveMyAvatarColors = function() {
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
					'emissivecolorr':WTW.avatarParts[i].emissivecolorr,
					'emissivecolorg':WTW.avatarParts[i].emissivecolorg,
					'emissivecolorb':WTW.avatarParts[i].emissivecolorb,
					'diffusecolorr':WTW.avatarParts[i].diffusecolorr,
					'diffusecolorg':WTW.avatarParts[i].diffusecolorg,
					'diffusecolorb':WTW.avatarParts[i].diffusecolorb,
					'index':i,
					'function':'saveavatarcolor'
				};
				WTW.postJSON("/core/handlers/wtwavatars-saveavatar.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						var zrequest2 = {
							'serverinstanceid':dGet('wtw_serverinstanceid').value,
							'accesstoken':dGet('wtw_taccesstoken').value,
							'globaluserid':btoa(dGet('wtw_tglobaluserid').value),
							'useravatarid':dGet('wtw_tuseravatarid').value,
							'userid':dGet('wtw_tuserid').value,
							'instanceid':dGet('wtw_tinstanceid').value,
							'avatarpartid':zresponse.avatarpartid,
							'avatarpart':zresponse.avatarpart,
							'emissivecolorr':zresponse.emissivecolorr,
							'emissivecolorg':zresponse.emissivecolorg,
							'emissivecolorb':zresponse.emissivecolorb,
							'diffusecolorr':zresponse.diffusecolorr,
							'diffusecolorg':zresponse.diffusecolorg,
							'diffusecolorb':zresponse.diffusecolorb,
							'index':zresponse.index,
							'function':'saveavatarcolor'
						};
						if (dGet('wtw_tglobalavatar').value == '1') {
							/* if checkbox for global is checked, save to global 3dnet.walktheweb.com */
							WTW.postJSON("https://3dnet.walktheweb.com/connect/globalsaveavatar.php", zrequest2, 
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
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-saveMyAvatarColors=" + ex.message);
	}
}

WTWJS.prototype.saveMyAvatarAnimations = function() {
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
				if (zdefaultid == '' && WTW.avatarAnimations[i].setdefault) {
					zdefaultid = WTW.avatarAnimations[i].setdefault;
					zdefault = i;
				}
				
				if (WTW.avatarAnimations[i].animationevent != zlastanimationevent || i == WTW.avatarAnimations.length-1) {
					let zanimationind = -1;
					if (zselected > -1) {
						zanimationind = zselected;
					} else if (zdefault > -1) {
						zanimationind = zdefault;
					}
					
					if (zlastanimationevent != '') {
						if (WTW.avatarAnimations[zanimationind] != null) {
							var zrequest = {
								'useravatarid':dGet('wtw_tuseravatarid').value,
								'userid':dGet('wtw_tuserid').value,
								'instanceid':dGet('wtw_tinstanceid').value,
								'useravataranimationid':'',
								'avataranimationid':WTW.avatarAnimations[zanimationind].avataranimationid,
								'avataranimationevent':WTW.avatarAnimations[zanimationind].animationevent,
								'index':i,
								'function':'saveavataranimation'
							};
							WTW.postJSON("/core/handlers/wtwavatars-saveavatar.php", zrequest, 
								function(zresponse) {
									zresponse = JSON.parse(zresponse);
									if (dGet('wtw_tglobalavatar').value == '1') {
										/* if checkbox for global is checked, save to global 3dnet.walktheweb.com */
										if (zresponse.objectfolder.indexOf("http") == -1) {
											zresponse.objectfolder = "https://3dnet.walktheweb.com" + zresponse.objectfolder;
										}
										var zrequest2 = {
											'serverinstanceid':dGet('wtw_serverinstanceid').value,
											'accesstoken':dGet('wtw_taccesstoken').value,
											'globaluserid':btoa(dGet('wtw_tglobaluserid').value),
											'useravatarid':dGet('wtw_tuseravatarid').value,
											'userid':dGet('wtw_tuserid').value,
											'instanceid':dGet('wtw_tinstanceid').value,
											'useravataranimationid':zresponse.useravataranimationid,
											'avataranimationid':zresponse.avataranimationid,
											'avataranimationname':WTW.getAnimationEventName(zresponse.avataranimationevent),
											'avataranimationevent':zresponse.avataranimationevent,
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
											WTW.postJSON("https://3dnet.walktheweb.com/connect/globalsaveavatar.php", zrequest2, 
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
					zdefaultid = '';
					zdefault = -1;
					zselectedid = '';
					zselected = -1;
					zlastanimationevent = WTW.avatarAnimations[i].animationevent;
				}
			}
		}
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-saveMyAvatarAnimations=" + ex.message);
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
				}, "*");
				window.parent.postMessage({
					'func': 'WTW.closeIFrame',
					'message': 'Close iFrame',
					'parameters':null
				}, "*");
			}, 2000);
		} else {
			WTW.openLocalLogin('Select My Avatar',.3,.6);
		}
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-returnCloseDesigner=" + ex.message);
	}
}

WTWJS.prototype.updateGlobalAvatar = function(zvalue) {
	/* sets the checkbox form value for saving */
	try {
		dGet('wtw_tglobalavatar').value = zvalue;
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-updateGlobalAvatar=" + ex.message);
	}
}

WTWJS.prototype.editMyAvatarAnimations = function(zevent) {
	/* set menu to edit animations (used by button click event) */
	try {
		dGet('wtw_teditanimationevent').value = zevent;
		WTW.loadRightMenu(3);
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-editMyAvatarAnimations=" + ex.message);
	}
}

WTWJS.prototype.toggleEditAnimations = function() {
	/* set menu to edit or stop editing animations (used by button click event) */
	try {
		if (editmode) {
			editmode = false;
			dGet('wtw_teditanimationevent').value = '';
		} else {
			editmode = true;
		}
		WTW.loadRightMenu(3);
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-toggleEditAnimations=" + ex.message);
	}
}

WTWJS.prototype.selectAnimationEvent = function(zevent) {
	/* select animation event and load the possible animations to change it to */
	try {
		let zlastanimationevent = '';
		let zrows = 0;
		let zcatrows = 0;
		let showcategories = false;
		if (editmode && dGet('wtw_teditanimationevent').value == '') {
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
		if (editmode == false) {
			showcategories = true;
			zrows = zcatrows;
		}
		zlastanimationevent = '';
		if (rightMenuLower != null) {
			rightMenuLower.dispose();
		}
		rightMenuLower = new BABYLON.GUI.Grid();
		rightMenuLower.topInPixels = 70;
		rightMenuLower.rightInPixels = 20;
		rightMenuLower.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
		rightMenuLower.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
		rightMenuLower.addColumnDefinition(1);
		rightMenuLower.width = "350px";
		if (zrows > 0) {
			let j = 0;
			rightMenuLower.height = (zrows * 50) + "px";
			for(var i=0;i<WTW.avatarAnimations.length;i++) {
				if (WTW.avatarAnimations[i] != null) {
					let zbuttonname = WTW.avatarAnimations[i].animationeventname;
					let zcolor = "#D8F8FF";
					let zweight = 0;
					if (WTW.myAvatar.WTW.animations.running[zevent] != undefined) {
						if (WTW.myAvatar.WTW.animations.running[zevent].weight != undefined) {
							if (WTW.myAvatar.WTW.animations.running[zevent].weight == 1) {
								zweight = 1;
							}
						}
					}
					if (WTW.avatarAnimations[i].animationevent != zlastanimationevent && showcategories) {
						rightMenuLower.addRowDefinition(1/zrows);
						if (dGet('wtw_tavataranimationevent').value == WTW.avatarAnimations[i].animationevent && editmode == false) {
							if (zweight != 1) {
								zbuttonname += ": " + dGet('wtw_tanimationfriendlyname').value;
								zcolor = "yellow";
							}
						} else if (dGet('wtw_teditanimationevent').value == WTW.avatarAnimations[i].animationevent && editmode) {
							zbuttonname += ": " + dGet('wtw_tanimationfriendlyname').value;
							zcolor = "yellow";
						}
						var button1 = BABYLON.GUI.Button.CreateImageWithCenterTextButton(WTW.avatarAnimations[i].animationevent + "-animation-button", zbuttonname, 'image');
						button1.width = "330px";
						button1.height = "50px";
						button1.color = "#000000";
						button1.background = zcolor;
						if (editmode) {
							button1.onPointerClickObservable.add(function(ev, state) {WTW.editMyAvatarAnimations(state.currentTarget.name.split('-')[0]);});
						} else {
							button1.onPointerClickObservable.add(function(ev, state) {WTW.getMyAvatarAnimations(state.currentTarget.name.split('-')[0]);});
						}
						rightMenuLower.addControl(button1, j, 0);
						j += 1;
						zlastanimationevent = WTW.avatarAnimations[i].animationevent;
					} else if (showcategories == false) {
						if (WTW.avatarAnimations[i].animationevent == zevent) {
							rightMenuLower.addRowDefinition(1/zrows);
							zbuttonname = WTW.avatarAnimations[i].animationfriendlyname;
							if (WTW.avatarAnimations[i].selected) {
								zcolor = "yellow";
							} else {
								zcolor = "#ffffff";
							}
							var button1 = BABYLON.GUI.Button.CreateImageWithCenterTextButton(WTW.avatarAnimations[i].avataranimationid + "-animation-button", zbuttonname, 'image');
							button1.width = "330px";
							button1.height = "50px";
							button1.color = "#000000";
							button1.background = zcolor;
							button1.onPointerClickObservable.add(function(ev, state) {WTW.changeMyAvatarAnimation(state.currentTarget.name.split('-')[0]);});
							rightMenuLower.addControl(button1, j, 0);
							j += 1;
						}
					}
					if (dGet('wtw_tanimationind').value != '') {
						if (Number(dGet('wtw_tanimationind').value) == i) {
							if (runningevent != '' && WTW.myAvatar.WTW.animations.running[runningevent] != undefined) {
								WTW.myAvatar.WTW.animations.running[runningevent].weight = 0;
								runningevent = '';
							}
							if (zweight == 0 || (editmode && dGet('wtw_teditanimationevent').value != lasteditavatarid)) {
								WTW.clearAnimations(WTW.myAvatar.name);
								zweight = 0;
							}
							if (WTW.myAvatar.WTW.animations.running[zevent] == undefined) {
								WTW.loadAvatarAnimation(WTW.myAvatar.name, '', WTW.avatarAnimations[i].animationfriendlyname, WTW.avatarAnimations[i].animationicon, WTW.avatarAnimations[i].avataranimationid, WTW.avatarAnimations[i].animationevent, WTW.avatarAnimations[i].objectfolder, WTW.avatarAnimations[i].objectfile, WTW.avatarAnimations[i].startframe, WTW.avatarAnimations[i].endframe, WTW.avatarAnimations[i].speedratio, 0, 0, true, '');
							}

							if (zweight == 0 && (editmode == false || (editmode && dGet('wtw_teditanimationevent').value != '')))  {
								var zrunAnimationTimer = window.setInterval(function() {
									if (WTW.myAvatar.WTW.animations.running[zevent] != null) {
										window.clearInterval(zrunAnimationTimer);
										WTW.myAvatar.WTW.animations.running[zevent].weight = 1;
										WTW.myAvatar.WTW.animations.running['onwait'].weight = 0;
										runningevent = zevent;
									}
								}, 100);
							} else {
								if (WTW.myAvatar.WTW.animations.running[zevent] != null) {
									WTW.myAvatar.WTW.animations.running[zevent].weight = 0;
									if (editmode == false) {
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
			rightMenuLower.height = "60px";
			rightMenuLower.addRowDefinition(1);
		}
		gui.addControl(rightMenuLower);
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-selectAnimationEvent=" + ex.message);
	}
}

WTWJS.prototype.clearAnimations = function(zavatarname) {
	/* clear the animations loaded (except the idle animation) so that it can be reloaded */
	try {
		let zavatar = scene.getMeshByID(zavatarname);
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
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-clearAnimations=" + ex.message);
	}
}

WTWJS.prototype.changeMyAvatarAnimation = function(zavataranimationid) {
	/* change the selected animation */
	try {
		lasteditavatarid = zavataranimationid;
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
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-changeMyAvatarAnimation=" + ex.message);
	}
}

WTWJS.prototype.getMyAvatarAnimations = function(zanimationevent) {
	/* get my avatar animations or select the default animation for each animation event */
	try {
		if (editmode) {
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
					if (WTW.avatarAnimations[i].setdefault + '' == '1') {
						zdefault = i;
						zdefaultname = WTW.avatarAnimations[i].animationfriendlyname;
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
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-getMyAvatarAnimations=" + ex.message);
	}
}

WTWJS.prototype.loadAvatarMeshes = function(zavatardef) {
	/* load the avatar and all of its parts and colors */
	try {
		WTW.startLoading();
		if (dGet('wtw_tavatarid').value == '') {
			var button0 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("selectavatar-button", 'Select My Avatar', 'image');
			button0.width = "330px";
			button0.height = "60px";
			button0.color = "yellow";
			button0.background = "blue";
			button0.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(1);});
			leftMenu.addControl(button0, 1, 0);

			var button1 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("avatarprofile-button", 'Avatar Profile', 'image');
			button1.width = "330px";
			button1.height = "60px";
			button1.color = "white";
			button1.background = "green";
			button1.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(1);});
			leftMenu.addControl(button1, 0, 0);

			var button2 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("avatarcolors-button", 'Avatar Colors', 'image');
			button2.width = "330px";
			button2.height = "60px";
			button2.color = "white";
			button2.background = "green";
			button2.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(2);});
			leftMenu.addControl(button2, 2, 0);

			var button3 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("avataranimations-button", 'Avatar Animations', 'image');
			button3.width = "330px";
			button3.height = "60px";
			button3.color = "white";
			button3.background = "green";
			button3.onPointerClickObservable.add(function(ev, state) {WTW.loadLeftMenu(3);});
			leftMenu.addControl(button3, 3, 0);

			var button4 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("save-button", 'Save Avatar', 'image');
			button4.width = "330px";
			button4.height = "60px";
			button4.color = "white";
			button4.background = "green";
			button4.onPointerClickObservable.add(function(ev, state) {WTW.saveMyAvatar();WTW.loadLeftMenu(4);});
			leftMenu.addControl(button4, 4, 0);
		}
		dGet('wtw_tavatarid').value = zavatardef.avatarid;
		WTW.avatarParts = [];
		zsetupparent = scene.getMeshByID("setupparent-0");
		var avatarname = "myavatar-" + dGet('wtw_tinstanceid').value;
		WTW.myAvatar = scene.getMeshByID(avatarname);
		if (WTW.myAvatar != null) {
			WTW.myAvatar.dispose();
		}
		var scalingx = 1;
		var scalingy = 1;
		var scalingz = 1;
		var objectanimations = null;
		var objectfolder = "/content/system/avatars/male/";
		var objectfile = "maleidle.babylon";
		var avataranimationdefs = [];
		if (zavatardef.scaling.x != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.x)) {
				scalingx = Number(zavatardef.scaling.x);
			}
		}
		if (zavatardef.scaling.y != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.y)) {
				scalingy = Number(zavatardef.scaling.y);
			}
		}
		if (zavatardef.scaling.z != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.z)) {
				scalingz = Number(zavatardef.scaling.z);
			}
		} 
		if (zavatardef.object.folder != undefined) {
			if (zavatardef.object.folder != '') {
				objectfolder = zavatardef.object.folder;
			}
		}
		if (zavatardef.object.file != undefined) {
			if (zavatardef.object.file != '') {
				objectfile = zavatardef.object.file;
			}
		}
		WTW.myAvatar = BABYLON.MeshBuilder.CreateBox(avatarname, {}, scene);
		WTW.myAvatar.material = new BABYLON.StandardMaterial("matmyavatar" + moldname, scene);
		WTW.myAvatar.material.alpha = 0;
		WTW.myAvatar.parent = zsetupparent;
		WTW.myAvatar.applyGravity = true;
		WTW.myAvatar.showBoundingBox = false;
		WTW.myAvatar.ellipsoid = new BABYLON.Vector3(3, 8, 3);
		WTW.myAvatar.ellipsoidOffset = new BABYLON.Vector3(0, 8, 0);
		WTW.myAvatar.checkCollisions = true;
		WTW.myAvatar.isPickable = false;
		WTW.myAvatar.WTW = zavatardef;

		var avatarscale = BABYLON.MeshBuilder.CreateBox(avatarname + '-scale', {}, scene);
		avatarscale.material = new BABYLON.StandardMaterial("matscale" + moldname, scene);
		avatarscale.material.alpha = 0;
		avatarscale.isPickable = false;
		avatarscale.parent = WTW.myAvatar;
		avatarscale.scaling = new BABYLON.Vector3(scalingx, scalingy, scalingz);
		avatarscale.rotation.y = WTW.getRadians(-90);

		var avatarcamera = BABYLON.MeshBuilder.CreateBox(avatarname + "-camera", {}, scene);
		avatarcamera.material = new BABYLON.StandardMaterial("matcamera" + moldname, scene);
		avatarcamera.material.alpha = 0;
		avatarcamera.parent = WTW.myAvatar;
		avatarcamera.position.y = 12;
		avatarcamera.rotation.y = WTW.getRadians(-90);

		var avatarcenter = BABYLON.MeshBuilder.CreateBox(avatarname + "-center", {}, scene);
		avatarcenter.material = new BABYLON.StandardMaterial("matcenter" + moldname, scene);
		avatarcenter.material.alpha = 0;
		avatarcenter.parent = WTW.myAvatar;
		avatarcenter.position.y = 10;
		avatarcenter.rotation.y = WTW.getRadians(-90);

		BABYLON.SceneLoader.ImportMeshAsync(null, objectfolder, objectfile, scene).then(
			function (results) {
				if (results.meshes != null) {
					for (var i=0; i < results.meshes.length; i++) {
						if (results.meshes[i] != null) {
							var mesh = results.meshes[i];
							var meshname = results.meshes[i].name;
							var childmoldname = avatarname + "-" + meshname;
							results.meshes[i].isPickable = true;
							results.meshes[i].name = childmoldname;
							results.meshes[i].id = childmoldname;
							results.meshes[i].isVisible = true;
							
							if (results.meshes[i].material != null) {
								if (results.meshes[i].material.alpha != undefined) {
									results.meshes[i].material.alpha = 1;
								}
								/* load any color settings or set defaults */
								let zemissivecolorr = 0;
								let zemissivecolorg = 0;
								let zemissivecolorb = 0;
								let zdiffusecolorr = 1;
								let zdiffusecolorg = 1;
								let zdiffusecolorb = 1;
								if (zavatardef.avatarparts != null) {
									if (zavatardef.avatarparts.length > 0) {
										for (var j=0;j<zavatardef.avatarparts.length;j++) {
											if (zavatardef.avatarparts[j] != undefined) {
												if (zavatardef.avatarparts[j].avatarpart == meshname) {
													if (zavatardef.avatarparts[j].emissivecolorr != undefined) {
														zemissivecolorr = zavatardef.avatarparts[j].emissivecolorr;
													}
													if (zavatardef.avatarparts[j].emissivecolorg != undefined) {
														zemissivecolorg = zavatardef.avatarparts[j].emissivecolorg;
													}
													if (zavatardef.avatarparts[j].emissivecolorb != undefined) {
														zemissivecolorb = zavatardef.avatarparts[j].emissivecolorb;
													}
													if (zavatardef.avatarparts[j].diffusecolorr != undefined) {
														zdiffusecolorr = zavatardef.avatarparts[j].diffusecolorr;
													}
													if (zavatardef.avatarparts[j].diffusecolorg != undefined) {
														zdiffusecolorg = zavatardef.avatarparts[j].diffusecolorg;
													}
													if (zavatardef.avatarparts[j].diffusecolorb != undefined) {
														zdiffusecolorb = zavatardef.avatarparts[j].diffusecolorb;
													}
												}
											}
										}
									}
								}
								let zemissivehex = "#000000";
								let zdiffusehex = "#ffffff";
								/* emissive and specular currently share colors */
								results.meshes[i].material.emissiveColor = new BABYLON.Color3(zemissivecolorr,zemissivecolorg,zemissivecolorb);
								results.meshes[i].material.specularColor = new BABYLON.Color3(zemissivecolorr,zemissivecolorg,zemissivecolorb);
								/* diffuse and ambient currently share colors */
								results.meshes[i].material.diffuseColor = new BABYLON.Color3(zdiffusecolorr,zdiffusecolorg,zdiffusecolorb);
								results.meshes[i].material.ambientColor = new BABYLON.Color3(zdiffusecolorr,zdiffusecolorg,zdiffusecolorb);
								/* refresh the materials to apply colors */
								var covering = results.meshes[i].material;
								results.meshes[i].material.dispose();
								results.meshes[i].material = covering;
								zemissivehex = results.meshes[i].material.emissiveColor.toHexString();
								zdiffusehex = results.meshes[i].material.diffuseColor.toHexString();
								
								/* set local array of color values per avatar mesh part for editor and save process */
								WTW.avatarParts[i] = {
									'moldname':childmoldname,
									'part':meshname,
									'emissivecolorr':zemissivecolorr,
									'emissivecolorg':zemissivecolorg,
									'emissivecolorb':zemissivecolorb,
									'emissivehex':zemissivehex,
									'diffusecolorr':zdiffusecolorr,
									'diffusecolorg':zdiffusecolorg,
									'diffusecolorb':zdiffusecolorb,
									'diffusehex':zdiffusehex
								};
							}
							WTW.registerMouseOver(results.meshes[i]);
							if (results.meshes[i].parent == null) {
								results.meshes[i].parent = avatarscale;
							}
							results.meshes[i].WTW = [];
							results.meshes[i].WTW.animations = [];
							if (objectanimations != null) {
								if (objectanimations != null) {
									for (var j=0; j < objectanimations.length;j++) {
										if (objectanimations[j] != null) {
											var moldnamepart = objectanimations[j].moldnamepart;
											if (moldnamepart == meshname) {
												var moldevent = objectanimations[j].moldevent;
												var startframe = Number(objectanimations[j].startframe);
												var endframe = Number(objectanimations[j].endframe);
												var animationloop = false;
												var speedratio = Number(objectanimations[j].speedratio);
												if (objectanimations[j].animationloop+'' == '1') {
													animationloop = true;
												}
												if (moldevent == 'onload') {
													animationloop = false;
													if ((typeof mesh.WTW.animations.onwait) != "undefined") {
														results.meshes[i].WTW.animations[moldevent] = scene.beginWeightedAnimation(mesh, startframe, endframe, 1, animationloop, speedratio, function() {mesh.WTW.animations.onload.weight=0; mesh.WTW.animations.onwait.weight=1;});
													} else {
														results.meshes[i].WTW.animations[moldevent] = scene.beginWeightedAnimation(mesh, startframe, endframe, 1, animationloop, speedratio);
													}
												} else {
													results.meshes[i].WTW.animations[moldevent] = scene.beginWeightedAnimation(mesh, startframe, endframe, 0, animationloop, speedratio);
												}
											}
										}
									}
									if ((typeof mesh.WTW.animations.onload) == "undefined" && (typeof mesh.WTW.animations.onwait) != "undefined") {
										mesh.WTW.animations.onwait.weight=1;
									}
								}
							}
						}
					}
				}
				/* load skeleton for animations */
				if (results.skeletons != null)	{
					var skeleton = results.meshes[0].skeleton;
					WTW.myAvatar.WTW.skeleton = results.meshes[0].skeleton;
					for (var i=0; i < results.skeletons.length; i++) {
						if (results.skeletons[i] != null) {
							var mesh = results.skeletons[i];
							var meshname = results.skeletons[i].name;
							var childmoldname = avatarname + "-" + meshname;
							results.skeletons[i].name = childmoldname;
							results.skeletons[i].id = childmoldname;
							WTW.registerMouseOver(results.skeletons[i]);
							if (results.skeletons[i].parent == null) {
								results.skeletons[i].scaling = new BABYLON.Vector3(scalingx,scalingy,scalingz);
							}
							if (results.skeletons[i].bones != null) {
								var headtopbone = -1;
								var spine2bone = -1;
								var righthandbone = -1;
								var lefthandbone = -1;
								var rightlegbone = -1;
								var leftlegbone = -1;
								var rightfootbone = -1;
								var leftfootbone = -1;
								for (var j=0; j < results.skeletons[i].bones.length; j++) {
									if (results.skeletons[i].bones[j] != null) {
										var bonename = results.skeletons[i].bones[j].name.toLowerCase();
										if (bonename.indexOf("headtop") > -1 && headtopbone == -1) {
											headtopbone = j;
										} else if (bonename.indexOf("spine2") > -1 && spine2bone == -1) {
											spine2bone = j;
										} else if (bonename.indexOf("righthand") > -1 && righthandbone == -1) {
											righthandbone = j;
										} else if (bonename.indexOf("lefthand") > -1 && lefthandbone == -1) {
											lefthandbone = j;
										} else if (bonename.indexOf("rightupleg") > -1 && rightlegbone == -1) {
											rightlegbone = j;
										} else if (bonename.indexOf("leftupleg") > -1 && leftlegbone == -1) {
											leftlegbone = j;
										} else if (bonename.indexOf("rightfoot") > -1 && rightfootbone == -1) {
											rightfootbone = j;
										} else if (bonename.indexOf("leftfoot") > -1 && leftfootbone == -1) {
											leftfootbone = j;
										}
										if (j == 0) {
											results.skeletons[i].bones[j].parent = avatarscale;
										} else {
											if (results.skeletons[i].bones[j].parent == null) {
												results.skeletons[i].bones[j].parent = results.skeletons[i].bones[0];
											}
										}
									}
								}
								if (headtopbone > -1) {
									var headtop = BABYLON.MeshBuilder.CreateBox(avatarname + "-headtop", {}, scene);
									headtop.scaling = new BABYLON.Vector3(1/scalingx, 1/scalingy, 1/scalingz);
									headtop.material = covering = new BABYLON.StandardMaterial("mat" + avatarname + '-headtop', scene);
									headtop.material.alpha = 0;
									headtop.isPickable = true;
									//WTW.registerMouseOver(headtop);
									headtop.attachToBone(results.skeletons[i].bones[headtopbone], results.meshes[0]);
									if (avatarname == "myavatar-" + dGet("wtw_tinstanceid").value) {
										avatarcamera.parent = headtop;
										avatarcamera.position.y = 0;
										avatarcamera.rotation.y = WTW.getRadians(0);
									}
								}
								if (spine2bone > -1) {
									var chest = BABYLON.MeshBuilder.CreateBox(avatarname + "-chest", {}, scene);
									chest.scaling = new BABYLON.Vector3(1/scalingx, 1/scalingy, 1/scalingz);
									chest.material = covering = new BABYLON.StandardMaterial("mat" + avatarname + '-chest', scene);
									chest.material.alpha = 0;
									chest.isPickable = true;
									//WTW.registerMouseOver(chest);
									chest.attachToBone(results.skeletons[i].bones[spine2bone], results.meshes[0]);
								}
								if (righthandbone > -1) {
									var righthand = BABYLON.MeshBuilder.CreateBox(avatarname + "-righthand", {}, scene);
									righthand.scaling = new BABYLON.Vector3(1/scalingx, 1/scalingz, 1/scalingz);
									righthand.material = covering = new BABYLON.StandardMaterial("mat" + avatarname + '-righthand', scene);
									righthand.material.alpha = 0;
									righthand.isPickable = true;
									//WTW.registerMouseOver(righthand);
									righthand.attachToBone(results.skeletons[i].bones[righthandbone], results.meshes[0]);
								}
								if (lefthandbone > -1) {
									var lefthand = BABYLON.MeshBuilder.CreateBox(avatarname + "-lefthand", {}, scene);
									lefthand.scaling = new BABYLON.Vector3(1/scalingx, 1/scalingy, 1/scalingz);
									lefthand.material = covering = new BABYLON.StandardMaterial("mat" + avatarname + '-lefthand', scene);
									lefthand.material.alpha = 0;
									lefthand.isPickable = true;
									//WTW.registerMouseOver(lefthand);
									lefthand.attachToBone(results.skeletons[i].bones[lefthandbone], results.meshes[0]);
								}
								if (rightlegbone > -1) {
									var rightleg = BABYLON.MeshBuilder.CreateBox(avatarname + "-righthip", {}, scene);
									rightleg.scaling = new BABYLON.Vector3(1/scalingx, 1/scalingy, 1/scalingz);
									rightleg.material = covering = new BABYLON.StandardMaterial("mat" + avatarname + '-rightleg', scene);
									rightleg.material.alpha = 0;
									rightleg.isPickable = true;
									//WTW.registerMouseOver(rightleg);
									rightleg.attachToBone(results.skeletons[i].bones[rightlegbone], results.meshes[0]);
								}
								if (leftlegbone > -1) {
									var leftleg = BABYLON.MeshBuilder.CreateBox(avatarname + "-lefthip", {}, scene);
									leftleg.scaling = new BABYLON.Vector3(1/scalingx, 1/scalingy, 1/scalingz);
									leftleg.material = covering = new BABYLON.StandardMaterial("mat" + avatarname + '-leftleg', scene);
									leftleg.material.alpha = 0;
									leftleg.isPickable = true;
									//WTW.registerMouseOver(leftleg);
									leftleg.attachToBone(results.skeletons[i].bones[leftlegbone], results.meshes[0]);
								}
								if (rightfootbone > -1) {
									var rightfoot = BABYLON.MeshBuilder.CreateBox(avatarname + "-rightfoot", {}, scene);
									rightfoot.scaling = new BABYLON.Vector3(1/scalingx, 1/scalingy, 1/scalingz);
									rightfoot.material = covering = new BABYLON.StandardMaterial("mat" + avatarname + '-rightfoot', scene);
									rightfoot.material.alpha = 0;
									rightfoot.isPickable = true;
									//WTW.registerMouseOver(rightfoot);
									rightfoot.attachToBone(results.skeletons[i].bones[rightfootbone], results.meshes[0]);
								}
								if (leftfootbone > -1) {
									var leftfoot = BABYLON.MeshBuilder.CreateBox(avatarname + "-leftfoot", {}, scene);
									leftfoot.scaling = new BABYLON.Vector3(1/scalingx, 1/scalingy, 1/scalingz);
									leftfoot.material = covering = new BABYLON.StandardMaterial("mat" + avatarname + '-leftfoot', scene);
									leftfoot.material.alpha = 0;
									leftfoot.isPickable = true;
									//WTW.registerMouseOver(leftfoot);
									leftfoot.attachToBone(results.skeletons[i].bones[leftfootbone], results.meshes[0]);
								}
							}
							let zendframe = WTW.getLastAnimationKey(WTW.myAvatar);
							avataranimationdefs[0] = {
								'useravataranimationid':'',
								'avataranimationid':'r9087b004i9ptv0e',
								'animationevent':'onwait',
								'animationeventname':'Wait',
								'animationfriendlyname':'',
								'loadpriority':0,
								'animationicon':'',
								'objectfolder':objectfolder,
								'objectfile':objectfile,
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
							WTW.myAvatar.WTW.animations = avataranimationdefs;
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
								WTW.myAvatar.WTW.animations.running[avataranimationdefs[0].animationevent] = scene.beginWeightedAnimation(skeleton, Number(avataranimationdefs[0].startframe), Number(avataranimationdefs[0].endframe), 1, avataranimationdefs[0].animationloop, Number(avataranimationdefs[0].speedratio));
								WTW.avatarMinLoadEnter(avatarname);
							} else {
								WTW.loadAvatarAnimations(avatarname);
							}
						}
					}
				}
				baseanimationframes = WTW.getLastAnimationKey(WTW.myAvatar);
				WTW.stopLoading();
				WTW.updateDisplayName(dGet('wtw_tdisplayname').value);
			}
		);
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-loadAvatarMeshes=" + ex.message);
	}
}

WTWJS.prototype.loadAnimations = function() {
	/* load avatar animation settings into an array for edit */
	try {
		var j = 0;
		WTW.avatarAnimations = [];
		WTW.getJSON("/connect/avataranimations.php", 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				for (var i=0;i<zresponse.avataranimations.length;i++) {
					if (zresponse.avataranimations[i] != null) {
						let zeventname = WTW.getAnimationEventName(zresponse.avataranimations[i].animationevent);
						if (zeventname != '') {
							let zselected = false;
							if (avatardef != null) {
								if (avatardef.avataranimationdefs != null) {
									if (avatardef.avataranimationdefs.length > 0) {
										for (var k=0;k<avatardef.avataranimationdefs.length;k++) {
											if (avatardef.avataranimationdefs[k] != undefined) {
												if (avatardef.avataranimationdefs[k].avataranimationid == zresponse.avataranimations[i].avataranimationid) {
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
								'setdefault': zresponse.avataranimations[i].setdefault,
								'selected': zselected
							}
							j += 1;
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-loadAnimations=" + ex.message);
	}
}

WTWJS.prototype.chooseAvatar = function() {
	/* open horizontal scroll of avatar images to select the avatar */
	try {
		WTW.startLoading();
		if (avatarSelector != null) {
			avatarSelector.dispose();
		}
		WTW.avatars = [];
		WTW.getJSON("/connect/avatars.php", 
			function(zresponse) {
				if (zresponse != null) {
					zresponse = JSON.parse(zresponse);
					if (zresponse.avatars != null) {
						if (zresponse.avatars.length > 0) {
							avatarSelector = new BABYLON.GUI.ScrollViewer("ChooseAvatar");
							avatarSelector.width = .96;
							avatarSelector.height = "225px";
							avatarSelector.background = "gray";
							avatarSelector.barColor = "tan";
							avatarSelector.barBackground = "black";
							avatarSelector.thumbLength = .5;
							avatarSelector.barSize = 20;
							avatarSelector.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
							gui.addControl(avatarSelector);
							var grid = new BABYLON.GUI.Grid();
							grid.width = (202 * zresponse.avatars.length) + "px";
							grid.height = "200px";
							for (var i=0; i<zresponse.avatars.length;i++) {
								grid.addColumnDefinition(1/zresponse.avatars.length);
							}
							grid.addRowDefinition(1);
							avatarSelector.addControl(grid);
							for (var i=0; i<zresponse.avatars.length;i++) {
								var zavatarid = zresponse.avatars[i].avatarid;
								var button = BABYLON.GUI.Button.CreateImageWithCenterTextButton(zavatarid + "-button", zresponse.avatars[i].displayname, zresponse.avatars[i].object.folder + zresponse.avatars[i].thumbnails.imagefull);
								button.width = "200px";
								button.height = "200px";
								button.color = "white";
								button.background = "green";
								button.onPointerClickObservable.add(function(ev, state) {WTW.selectAvatar(state.currentTarget.name.split('-')[0]);});
								grid.addControl(button, 0, i);
								
								WTW.avatars[i] = {
									'avatarid': zresponse.avatars[i].avatarid,
									'avatargroup': zresponse.avatars[i].avatargroup,
									'displayname': zresponse.avatars[i].displayname,
									'gender': zresponse.avatars[i].gender,
									'object': {
										'folder': zresponse.avatars[i].object.folder,
										'file': zresponse.avatars[i].object.file
									},
									'scaling': {
										'x': zresponse.avatars[i].scaling.x,
										'y': zresponse.avatars[i].scaling.y,
										'z': zresponse.avatars[i].scaling.z
									},
									'thumbnails': {
										'imagefull': zresponse.avatars[i].thumbnails.imagefull,
										'imageface': zresponse.avatars[i].thumbnails.imageface
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
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-chooseAvatar=" + ex.message);
	}
}

WTWJS.prototype.updateColorByHex = function(zhex) {
	/* when a hex color code is changed, this process updates the mesh and color picker wheel selection */
	try {
		if (/^#([0-9A-F]{3}){1,2}$/i.test(zhex) == false) {
			zhex = "#FFFFFF";
		}
		var zmold = scene.getMeshByID(dGet('wtw_tmoldname').value);
		if (zmold != null) {
			if (dGet('wtw_tcolortype').value  == 'Diffuse') {
				zmold.material.diffuseColor = new BABYLON.Color3.FromHexString(zhex);
				zmold.material.ambientColor = new BABYLON.Color3.FromHexString(zhex);
				WTW.updateAvatarPartColor(zmold.material.diffuseColor.r, zmold.material.diffuseColor.g, zmold.material.diffuseColor.b, zhex);
				colorpicker.value = zmold.material.diffuseColor;
			} else {
				zmold.material.emissiveColor = new BABYLON.Color3.FromHexString(zhex);
				zmold.material.specularColor = new BABYLON.Color3.FromHexString(zhex);
				WTW.updateAvatarPartColor(zmold.material.emissiveColor.r, zmold.material.emissiveColor.g, zmold.material.emissiveColor.b, zhex);
				colorpicker.value = zmold.material.emissiveColor;
			}
			if (activeinput != null) {
				activeinput.text = zhex.toUpperCase();
				activeinput.background = zhex;
				activeinput.color = WTW.setTextColor(zhex, "#ffffff", "#000000");
				activeinput.focusedBackground = "#000000";
				if (activeinput.color == "#000000") {
					activeinput.focusedBackground = "#ffffff";
				}
			}
		}
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-updateColorByHex=" + ex.message);
	}
}

WTWJS.prototype.getMyAvatarPart = function(zpart) {
	/* when an avatar part is selected, this loads the part to be edited (for color selection) */
	let zmoldname = "";
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
					var zmold = scene.getMeshByID(zmoldname);
					if (zmold != null && colorpicker != null) {
						if (dGet('wtw_tcolortype').value == 'Diffuse') {
							colorpicker.value = zmold.material.diffuseColor;
						} else {
							colorpicker.value = zmold.material.emissiveColor;
						}
						WTW.hilightMoldFast(zmoldname, "yellow");
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-getMyAvatarPart=" + ex.message);
	}
	return zmoldname;
}

WTWJS.prototype.updateAvatarPartColor = function(r, g, b, hex) {
	/* update the color selected to the local array of color settings (used for saving) */
	try {
		for (var i=0;i<WTW.avatarParts.length;i++) {
			if (WTW.avatarParts[i] != null) {
				if (WTW.avatarParts[i].part == dGet('wtw_tavatarpart').value) {
					if (dGet('wtw_tcolortype').value == 'Diffuse') {
						WTW.avatarParts[i].diffusecolorr = r;
						WTW.avatarParts[i].diffusecolorg = g;
						WTW.avatarParts[i].diffusecolorb = b;
						WTW.avatarParts[i].diffusehex = hex;
					} else {
						WTW.avatarParts[i].emissivecolorr = r;
						WTW.avatarParts[i].emissivecolorg = g;
						WTW.avatarParts[i].emissivecolorb = b;
						WTW.avatarParts[i].emissivehex = hex;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-updateAvatarPartColor=" + ex.message);
	}
}

WTWJS.prototype.setMyAvatarColor = function(r, g, b) {
	/* on change of color, this function updates the avatar part with the color selected */
	try {
		var zmold = scene.getMeshByID(dGet('wtw_tmoldname').value);
		var zpartcolor = "#ffffff";
		if (zmold != null) {
			switch (dGet('wtw_tcolortype').value) {
				case "Diffuse":
					zmold.material.diffuseColor = new BABYLON.Color3(r,g,b);
					zmold.material.ambientColor = new BABYLON.Color3(r,g,b);
					zpartcolor = zmold.material.diffuseColor.toHexString();
					break;
				case "Emissive":
					zmold.material.specularColor = new BABYLON.Color3(r,g,b);
					zmold.material.emissiveColor = new BABYLON.Color3(r,g,b);
					zpartcolor = zmold.material.emissiveColor.toHexString();
					break;
			}
			var zcovering = zmold.material;
			zmold.material.dispose();
			zmold.material = zcovering;
			if (activeinput != null) {
				activeinput.text = zpartcolor;
				activeinput.background = zpartcolor;
				activeinput.color = WTW.setTextColor(zpartcolor, "#ffffff", "#000000");
				activeinput.focusedBackground = "#000000";
				if (activeinput.color == "#000000") {
					activeinput.focusedBackground = "#ffffff";
				}
				WTW.updateAvatarPartColor(r, g, b, zpartcolor);
			}
		}
		scene.render();
	} catch (ex) {
		WTW.log("avatars-loadavatar-setMyAvatarColor=" + ex.message);
	}
}

WTWJS.prototype.setTextColor = function(bgColor, lightColor, darkColor) {
	/* when the color is selected, the form updates the color to the background */
	/* this also sets the text color to an opposite color than the background (black or white) */
	var zcolor = "black";
	try {
		var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
		var r = parseInt(color.substring(0, 2), 16); // hexToR
		var g = parseInt(color.substring(2, 4), 16); // hexToG
		var b = parseInt(color.substring(4, 6), 16); // hexToB
		var uicolors = [r / 255, g / 255, b / 255];
		var c = uicolors.map((col) => {
			if (col <= 0.03928) {
				return col / 12.92;
			}
			return Math.pow((col + 0.055) / 1.055, 2.4);
		});
		var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
		zcolor = (L > 0.179) ? darkColor : lightColor;
	} catch (ex) {
		WTW.log("avatars-loadavatar-setTextColor=" + ex.message);
	}
	return zcolor;
}

WTWJS.prototype.updateDisplayName = function(ztext) {
	/* update text name over avatar to match profile name */
	try {
		dGet('wtw_tdisplayname').value = ztext;
		WTW.showIDs(ztext);
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-updateDisplayName=" + ex.message);
	}
}

WTWJS.prototype.closeMenu = function() {
	/* close all menus - prep for opening the next menu option */
	try {
		if (leftMenu != null) {
			leftMenu.dispose();
			leftMenu = null;
		}
		if (rightMenu != null) {
			rightMenu.dispose();
			rightMenu = null;
		}
		if (rightMenuLower != null) {
			rightMenuLower.dispose();
			rightMenuLower = null;
		}
		if (colorMenu != null) {
			colorMenu.dispose();
			colorMenu = null;
		}
		if (avatarSelector != null) {
			avatarSelector.dispose();
			avatarSelector = null;
		}
		if (colorpicker != null) {
			colorpicker.dispose();
			colorpicker = null;
		}
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-closeMenu=" + ex.message);
	}
}

WTWJS.prototype.preloadAvatar = function(zavatarid) {
	/* load the basic avatar settings */
	try {
		WTW.getJSON("/connect/avatar.php?avatarid=" + zavatarid, 
			function(zresponse) {
				if (zresponse != null) {
					zresponse = JSON.parse(zresponse);
					if (zresponse.avatar != null) {
						WTW.loadAvatarMeshes(zresponse.avatar);
						WTW.showIDs(dGet('wtw_tdisplayname').value);
					}
				}
			}
		);
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-preloadAvatar=" + ex.message);
	}
}

WTWJS.prototype.selectAvatar = function(zavatarid) {
	/* on select avatar, this reloads the avatar by the selected avatar id */
	try {
		if (loadingtimer != null) {
			WTW.stopLoading();
		}
		for (var i=0;i<WTW.avatars.length;i++) {
			if (WTW.avatars[i] != null) {
				var zloadedavatarid = '';
				if (avatardef != null) {
					if (avatardef.avatarid != undefined) {
						zloadedavatarid = avatardef.avatarid;
					}
				}
				if (WTW.avatars[i].avatarid == zavatarid) {
					WTW.avatars[i].selected = true;
					if (zloadedavatarid == zavatarid) {
						WTW.loadAvatarMeshes(avatardef);
					} else {
						WTW.loadAvatarMeshes(WTW.avatars[i]);
					}
				} else {
					WTW.avatars[i].selected = false;
				}
			}
		}
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-selectAvatar=" + ex.message);
	}
}

WTWJS.prototype.startLoading = function() {
	/* show the blinking loading text */
	try {
		if (loadingtimer == null) {
			loadingtimer = window.setInterval(function() {
				if (loadingtext == null) {
					loadingtext = new BABYLON.GUI.TextBlock();
					loadingtext.text = "Loading...";
					loadingtext.color = "yellow";
					loadingtext.fontSize = 120;
					loadingtext.height = "180px";
					gui.addControl(loadingtext);
				} else {
					loadingtext.dispose();
					loadingtext = null;
				}
			}, 500);
		}
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-startLoading=" + ex.message);
	}
}

WTWJS.prototype.stopLoading = function() {
	/* stop the blinking loading text */
	try {
		if (loadingtimer != null) {
			window.clearInterval(loadingtimer);
			loadingtimer = null;
		}
		if (loadingtext != null) {
			loadingtext.dispose();
			loadingtext = null;
		}
	} catch (ex) {
		WTW.log("wtw-avatars-scripts-wtwavatars_designer.js-stopLoading=" + ex.message);
	}
}

WTWJS.prototype.mouseClick = function(e) {
	/* on mouse click event, used to select the part of the avatar to color on the avatar color menu option */
	try {
		e = e || window.event;
		var pickedResult = scene.pick(e.clientX, e.clientY);
		var pickedname = "";
		if (pickedResult.pickedMesh == null) {
			if (WTW.currentID != "") {
				pickedResult.pickedMesh = scene.getMeshByID(WTW.currentID);
			}
			pickedname = WTW.currentID;
		} else {
			pickedname = pickedResult.pickedMesh.name;
		}
		if (pickedname != '') {
			switch (dGet('wtw_activemenu').value) {
				case "2":
					if (pickedname.indexOf('-') > -1) {
						let part = pickedname.split('-')[2];
						WTW.getMyAvatarPart(part);
						WTW.loadLeftMenu(2);
					}
					break;
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-mouseClick=" + ex.message);
    }
}

window.addEventListener("resize", function () {
	/* resize the canvas when the window is resized */
	engine.resize();
});

window.onload = function () {
	/* window on load event */
	/* add onclick event listener */
	dGet('renderCanvas').addEventListener("click", WTW.mouseClick);
	/* add on message event listener to talk with parent frame */
	if (window.addEventListener) {
		window.addEventListener("message", WTW.onMessage, false);        
	} else if (window.attachEvent) {
		window.attachEvent("onmessage", WTW.onMessage, false);
	}
	/* get avatar speed settings */
	var walkspeed = WTW.getCookie("walkspeed");
	if (walkspeed != null) {
		if (WTW.isNumeric(walkspeed)) {
			WTW.walkSpeed = Number(walkspeed);
		}
	}
	var walkanimationspeed = WTW.getCookie("walkanimationspeed");
	if (walkanimationspeed != null) {
		if (WTW.isNumeric(walkanimationspeed)) {
			WTW.walkAnimationSpeed = Number(walkanimationspeed);
		}
	}
	var turnspeed = WTW.getCookie("turnspeed");
	if (turnspeed != null) {
		if (WTW.isNumeric(turnspeed)) {
			WTW.turnSpeed = Number(turnspeed);
		}
	}
	var turnanimationspeed = WTW.getCookie("turnanimationspeed");
	if (turnanimationspeed != null) {
		if (WTW.isNumeric(turnanimationspeed)) {
			WTW.turnAnimationSpeed = Number(turnanimationspeed);
		}
	}
	/* get canvas and initiate the create scene function (and start render loop for animation) */
	canvas = document.getElementById("renderCanvas");
	engine = new BABYLON.Engine(canvas, true);
	WTW.createScene();
	engine.runRenderLoop(function () {
		scene.render();
	});
}

/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions provide many of the common functions for browse and admin modes */
/* The heads up display (hud) provides menu options and user settings */
/* These functions create the HUD, change the menu items, and select the page to show (you will also find the legacy menu items here until they are retired) */

WTWJS.prototype.openHUD = function() {
	/* Open the HUD */
	try {
		var zmoldname = 'hud';
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold == null) {
			var zcamerafront = WTW.getMeshOrNodeByID('camerafront');
			
			/* reset HUD layout */
			WTW.hudLayout = '';
			var zobjectfolder = '/content/system/babylon/hud/';
			var zobjectfile = 'hud2.babylon';
			var zobjectanimations = null;
			
			zmold = new BABYLON.TransformNode(zmoldname);
			zmold.position = new BABYLON.Vector3(0,0,0);
			zmold.rotation = new BABYLON.Vector3(0,0,0);
			zmold.scaling = new BABYLON.Vector3(1,1,1);
			zmold.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
			zmold.parent = zcamerafront;
			
			BABYLON.SceneLoader.ImportMeshAsync('', zobjectfolder, zobjectfile, scene).then(
				function (zresults) {
					if (zresults.meshes != null) {
						zobjectanimations = [];

						zobjectanimations[0] = WTW.newObjectAnimation();
						zobjectanimations[0].animationname = 'HUDset';
						zobjectanimations[0].moldevent = 'onload';
						zobjectanimations[0].moldnamepart = '';
						zobjectanimations[0].startframe = 0;
						zobjectanimations[0].endframe = 0;
						zobjectanimations[0].animationloop = false;
						zobjectanimations[0].speedratio = 1.00;
						zobjectanimations[0].additionalscript = '';
						zobjectanimations[0].additionalparameters = '';
						
						zobjectanimations[1] = WTW.newObjectAnimation();
						zobjectanimations[1].animationname = 'HUDleftopen';
						zobjectanimations[1].moldevent = 'oncall';
						zobjectanimations[1].moldnamepart = '';
						zobjectanimations[1].startframe = 0;
						zobjectanimations[1].endframe = 30;
						zobjectanimations[1].animationloop = false;
						zobjectanimations[1].speedratio = 1.00;
						zobjectanimations[1].additionalscript = '';
						zobjectanimations[1].additionalparameters = '';

						zobjectanimations[2] = WTW.newObjectAnimation();
						zobjectanimations[2].animationname = 'HUDleftclose';
						zobjectanimations[2].moldevent = 'oncall';
						zobjectanimations[2].moldnamepart = '';
						zobjectanimations[2].startframe = 30;
						zobjectanimations[2].endframe = 60;
						zobjectanimations[2].animationloop = false;
						zobjectanimations[2].speedratio = 1.00;
						zobjectanimations[2].additionalscript = '';
						zobjectanimations[2].additionalparameters = '';

						zobjectanimations[3] = WTW.newObjectAnimation();
						zobjectanimations[3].animationname = 'HUDrightopen';
						zobjectanimations[3].moldevent = 'oncall';
						zobjectanimations[3].moldnamepart = '';
						zobjectanimations[3].startframe = 60;
						zobjectanimations[3].endframe = 90;
						zobjectanimations[3].animationloop = false;
						zobjectanimations[3].speedratio = 1.00;
						zobjectanimations[3].additionalscript = '';
						zobjectanimations[3].additionalparameters = '';

						zobjectanimations[4] = WTW.newObjectAnimation();
						zobjectanimations[4].animationname = 'HUDrightclose';
						zobjectanimations[4].moldevent = 'oncall';
						zobjectanimations[4].moldnamepart = '';
						zobjectanimations[4].startframe = 90;
						zobjectanimations[4].endframe = 120;
						zobjectanimations[4].animationloop = false;
						zobjectanimations[4].speedratio = 1.00;
						zobjectanimations[4].additionalscript = '';
						zobjectanimations[4].additionalparameters = '';

						zobjectanimations[5] = WTW.newObjectAnimation();
						zobjectanimations[5].animationname = 'HUDbottomopen';
						zobjectanimations[5].moldevent = 'oncall';
						zobjectanimations[5].moldnamepart = '';
						zobjectanimations[5].startframe = 120;
						zobjectanimations[5].endframe = 150;
						zobjectanimations[5].animationloop = false;
						zobjectanimations[5].speedratio = 1.00;
						zobjectanimations[5].additionalscript = '';
						zobjectanimations[5].additionalparameters = '';

						zobjectanimations[6] = WTW.newObjectAnimation();
						zobjectanimations[6].animationname = 'HUDbottomclose';
						zobjectanimations[6].moldevent = 'oncall';
						zobjectanimations[6].moldnamepart = '';
						zobjectanimations[6].startframe = 150;
						zobjectanimations[6].endframe = 180;
						zobjectanimations[6].animationloop = false;
						zobjectanimations[6].speedratio = 1.00;
						zobjectanimations[6].additionalscript = '';
						zobjectanimations[6].additionalparameters = '';

						zobjectanimations[7] = WTW.newObjectAnimation();
						zobjectanimations[7].animationname = 'HUDbottomleftopen';
						zobjectanimations[7].moldevent = 'oncall';
						zobjectanimations[7].moldnamepart = '';
						zobjectanimations[7].startframe = 210;
						zobjectanimations[7].endframe = 240;
						zobjectanimations[7].animationloop = false;
						zobjectanimations[7].speedratio = 1.00;
						zobjectanimations[7].additionalscript = '';
						zobjectanimations[7].additionalparameters = '';

						zobjectanimations[8] = WTW.newObjectAnimation();
						zobjectanimations[8].animationname = 'HUDbottomleftclose';
						zobjectanimations[8].moldevent = 'oncall';
						zobjectanimations[8].moldnamepart = '';
						zobjectanimations[8].startframe = 240;
						zobjectanimations[8].endframe = 270;
						zobjectanimations[8].animationloop = false;
						zobjectanimations[8].speedratio = 1.00;
						zobjectanimations[8].additionalscript = '';
						zobjectanimations[8].additionalparameters = '';

						zobjectanimations[9] = WTW.newObjectAnimation();
						zobjectanimations[9].animationname = 'HUDlefttoright';
						zobjectanimations[9].moldevent = 'oncall';
						zobjectanimations[9].moldnamepart = '';
						zobjectanimations[9].startframe = 30;
						zobjectanimations[9].endframe = 90;
						zobjectanimations[9].animationloop = false;
						zobjectanimations[9].speedratio = 1.00;
						zobjectanimations[9].additionalscript = '';
						zobjectanimations[9].additionalparameters = '';

						zobjectanimations[10] = WTW.newObjectAnimation();
						zobjectanimations[10].animationname = 'HUDrighttoleft';
						zobjectanimations[10].moldevent = 'oncall';
						zobjectanimations[10].moldnamepart = '';
						zobjectanimations[10].startframe = 90;
						zobjectanimations[10].endframe = 30;
						zobjectanimations[10].animationloop = false;
						zobjectanimations[10].speedratio = 1.00;
						zobjectanimations[10].additionalscript = '';
						zobjectanimations[10].additionalparameters = '';
						
						zmold.WTW = {
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
								zresults.meshes[i].renderingGroupId = 3;
								
								if (zobjectanimations != null) {
//									WTW.addMoldAnimation(zmoldname, zmeshname, zresults.meshes[i], zobjectanimations);
								}

								/* make sure child meshes are pickable */
								if (zmeshname == 'menuitem' || zmeshname == 'textbox' || zmeshname.indexOf('slider') > -1) {
									zresults.meshes[i].isPickable = false;
									zresults.meshes[i].isVisible = false;
								} else if (zmeshname == 'cornertopright') {
									/* cornertopright is the close button */
									zresults.meshes[i].isPickable = true;
								} else if (zmeshname.indexOf('background') > -1) {
									zresults.meshes[i].isPickable = true;
									zresults.meshes[i].isVisible = true;
								} else {
									zresults.meshes[i].isPickable = false;
								}
								/* make sure all object meshes have a parent */
								if (zresults.meshes[i].parent == null) {
									zresults.meshes[i].parent = zmold;
								}
								if (WTW.shadows != null) {
									/* add mesh to world shadow map */
									//WTW.shadows.getShadowMap().renderList.push(zresults.meshes[i]);
								}
//								zresults.meshes[i].receiveShadows = true;
								/* initiate and preload any event driven animations */
								if (zobjectanimations != null) {
									WTW.addMoldAnimation(zmoldname, zmeshname, zresults.meshes[i], zobjectanimations);
								}
								if (zmold == null || zmold.parent == null) {
									/* if the parent has been deleted after this async process began (avoiding orphaned objects)*/
									zresults.meshes[i].dispose();
								}
							}
						}
					}
					zmold = WTW.getMeshOrNodeByID(zmoldname);
					if (zmold == null || zmold.parent == null) {
						/* if the parent has been deleted after this async process began (avoiding orphaned objects) */
						WTW.disposeClean(zmoldname);
					} else {
						WTW.hudMenuText();
					}
				}
			);
		} else {
			WTW.closeHUD();
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-openHUD=' + ex.message);
	}
}

WTWJS.prototype.hudMenuText = function(zmenu, zselectedid) {
	/* Loads the HUD menu items */
	try {
		if (zselectedid == undefined) {
			zselectedid = null;
		}
		/* set menu title and menuset */
		var zmenutitle = '';
		var zmenuset = 'mainmenu';
		var zmold = WTW.getMeshOrNodeByID('hud-menuleft');
		switch (zmenu) {
			case 'settings':
				zmenuset = 'settings';
				zmenutitle = 'Settings';
				break;
			default:
				zmenutitle = 'Main Menu';
				break;
		}
		/* add Menu Name - top left of HUD */
		var zwebstyle = {
			'font-family': 'Arial',
			'anchor':'center',
			'letter-height':1.2,
			'letter-thickness':.2,
			'color':'#ffffff',
			'alpha':1.00,
			'colors':{
				'diffuse':'#ffffff',
				'specular':'#989e2c',
				'ambient':'#888722',
				'emissive':'#37370d'
			}
		};
		/* create 3d text menu name */
		Writer = BABYLON.MeshWriter(scene, {scale:1});
		if (zmenutitle != '') {
			var zmytext = WTW.getMeshOrNodeByID('hud-menutitle');
			if (zmytext != null) {
				zmytext.dispose();
			}
			var zdisplaytext = new Writer(zmenutitle, zwebstyle);
			zmytext = zdisplaytext.getMesh();
			zmytext.rotation = new BABYLON.Vector3(WTW.getRadians(-90), 0, 0);
			zmytext.position.y = 4.1;
			zmytext.id = 'hud-menutitle';
			zmytext.name = 'hud-menutitle';
			zmytext.parent = zmold;
			zmytext.isPickable = false;
			zmytext.renderingGroupId = 3;
		}
		/* clear any menu items already shown - parent box makes it easier to locate menu items to clear */
		var zmenuitemsparent = WTW.getMeshOrNodeByID('hud-menuitems');
		if (zmenuitemsparent != null) {
			var zmenuitems = zmenuitemsparent.getChildren();
			for (var i=0;i < zmenuitems.length;i++) {
				zmenuitems[i].dispose();
			}
		}
		
		/* fetch menu items from database menuitems table */
		var zrequest = {
			'menuset':zmenuset,
			'function':'gethudmenu'
		};
		WTW.postAsyncJSON('/core/handlers/hud.php', zrequest, 
			function(zresponse) {
				if (zresponse != null) {
					zresponse = JSON.parse(zresponse);
					var zlasty = 2.7;
					var zspacey = 1.6;
					var zhud = WTW.getMeshOrNodeByID('hud-menuleft');
					/* menu item master is the master for cloning each menu item */
					var zmenuitemmaster = WTW.getMeshOrNodeByID('hud-menuitem');

					/* dispose of any previous parent box for menu items */
					WTW.disposeClean('hud-menuitems');
					var zmenuitems = WTW.getMeshOrNodeByID('hud-menuitems');

					if (zmenuitems == null) {
						/* create parent box for menu items */
						zmenuitems = new BABYLON.TransformNode('hud-menuitems');
						zmenuitems.position = new BABYLON.Vector3(0,0,0);
						zmenuitems.rotation = new BABYLON.Vector3(0,0,0);
						zmenuitems.scaling = new BABYLON.Vector3(1,1,1);
					}
					zmenuitems.parent = zhud;
					
					/* create the menu items */
					for (var i=0;i < zresponse.length;i++) {
						if (zresponse[i] != null) {
							/* menu item text style */
							var zmenuitemstyle = {
								'font-family': 'Arial',
								'anchor':'center',
								'letter-height':.8,
								'letter-thickness':.3,
								'color':'#ffffff',
								'alpha':1.00,
								'colors':{
									'diffuse':'#ffffff',
									'specular':'#989e2c',
									'ambient':'#888722',
									'emissive':'#37370d'
								}
							};
							/* selected menu item text style */
							if (zselectedid == zresponse[i].menuitemid) {
								zmenuitemstyle = {
									'font-family': 'Arial',
									'anchor':'center',
									'letter-height':.8,
									'letter-thickness':.3,
									'color':'#ffffff',
									'alpha':1.00,
									'colors':{
										'diffuse':'#71ff7f',
										'specular':'#07570f',
										'ambient':'#020c03',
										'emissive':'#3b9845'
									}
								};
								/* load the selected menu item Form Page */
								WTW.hudGetMenuItem('hud-menuitem-' + zresponse[i].menuitemid);
							}
							WTW.disposeClean('hud-menuitemtext-' + zresponse[i].menuitemid);
							/* create 3d text for menu item */
							var zmenuitemtextwriter = new Writer(zresponse[i].menutext, zmenuitemstyle);
							var zmenuitemtext = zmenuitemtextwriter.getMesh();
							zmenuitemtext.rotation = new BABYLON.Vector3(WTW.getRadians(-90), 0, 0);
							zmenuitemtext.position.y = zlasty -.25;
							zmenuitemtext.id = 'hud-menuitemtext-' + zresponse[i].menuitemid;
							zmenuitemtext.name = 'hud-menuitemtext-' + zresponse[i].menuitemid;
							zmenuitemtext.parent = zmenuitems;
							zmenuitemtext.isPickable = false;
							zmenuitemtext.renderingGroupId = 3;
							
							/* create button for menu item */
							WTW.disposeClean('hud-menuitem-' + zresponse[i].menuitemid);
							var zmenuitem = zmenuitemmaster.clone('hud-menuitem-' + zresponse[i].menuitemid);
							zmenuitem.id = 'hud-menuitem-' + zresponse[i].menuitemid;
							zmenuitem.position.y = zlasty;
							zmenuitem.isPickable = true;
							zmenuitem.isVisible = true;
							zmenuitem.parent = zmenuitems;
							/* check to see if it closed before it finished loading */
							zhud = WTW.getMeshOrNodeByID('hud-menuleft');
							if (zhud == null) {
								zmenuitemtext.dispose();
								zmenuitem.dispose();
							}
							
							/* increment the position of the button and frame down the page */
							zlasty -= zspacey;
						}
					}
					/* check to see if it closed before it finished loading */
					zhud = WTW.getMeshOrNodeByID('hud-menuleft');
					if (zhud == null) {
						zmenuitems.dispose();
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-hudMenuText=' + ex.message);
	}
}
		
WTWJS.prototype.closeHUD = function() {
	/* Close the HUD */
	try {
		WTW.disposeClean('hud');
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-closeHUD=' + ex.message);
	}
}

WTWJS.prototype.hudToggle = function() {
	/* Toggles HUD open or Closed if already open */
	try {
		var zhud = WTW.getMeshOrNodeByID('hud');
		if (zhud == null) {
			WTW.openHUD();
		} else {
			WTW.closeHUD();
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-hudToggle=' + ex.message);
	}
}

WTWJS.prototype.hudClick = function(zmoldname) {
	/* handles click on HUD buttons */
	try {
		var zhud = WTW.getMeshOrNodeByID('hud');
		if (zhud != null) {
			var zcamera1id = '';
			var zparent = '';
			var zpositionx = 0;
			var zpositiony = 0;
			var zpositionz = 0;
			var zrotationx = 0;
			var zrotationy = 0;
			var zrotationz = 0;
			if (WTW.cameraOne != null) {
				if (WTW.cameraOne.position != undefined) {
					zpositionx = WTW.cameraOne.position.x;
					zpositiony = WTW.cameraOne.position.y;
					zpositionz = WTW.cameraOne.position.z;
				}
				if (WTW.cameraOne.rotation != undefined) {
					zrotationx = WTW.cameraOne.rotation.x;
					zrotationy = WTW.cameraOne.rotation.y;
					zrotationz = WTW.cameraOne.rotation.z;
				}
			}
			if (WTW.cameraOne != null) {
				zcamera1id = WTW.cameraOne.id;
				if (WTW.cameraOne.parent != null) {
					zparent = WTW.cameraOne.parent.name;
				}
			}
			var zsettings = {
				'parent': zparent,
				'distance': WTW.cameraDistance,
				'position': new BABYLON.Vector3(zpositionx, zpositiony, zpositionz),
				'rotation': new BABYLON.Vector3(zrotationx, zrotationy, zrotationz)
			};
			switch (zmoldname) {
				case 'hud-cornertopright':
					/* close X on the top right of HUD */
					WTW.closeHUD();
					break;
				case 'hud-save-cameras':
					WTW.hudSaveCameras();
					break;
				case 'hud-cancel-cameras':
					WTW.hudCheckLayout('');
					WTW.hudMenuText('settings');
					WTW.hudClearCameras();
					break;
				case 'hud-imagebutton-camera1-follow':
					zsettings = {
						'parent':'',
						'distance': -28,
						'position': new BABYLON.Vector3(0, 0, 0),
						'rotation': new BABYLON.Vector3(0, 0, 0)
					};
					WTW.hudHighlightCamera(1, zmoldname);
					WTW.initCamera(1, zcamera1id, zsettings);
					break;
				case 'hud-imagebutton-camera1-firststable':
					zsettings = {
						'parent': 'myavatar-' + dGet('wtw_tinstanceid').value + '-camera',
						'distance': 2,
						'position': new BABYLON.Vector3(-2, 0, 0),
						'rotation': new BABYLON.Vector3(0, WTW.getRadians(180), 0)
					};
					WTW.hudHighlightCamera(1, zmoldname);
					WTW.initCamera(1, zcamera1id, zsettings);
					break;
				case 'hud-imagebutton-camera1-first':
					zsettings = {
						'parent': 'myavatar-' + dGet('wtw_tinstanceid').value + '-headtop',
						'distance': 2,
						'position': new BABYLON.Vector3(-2, 0, 0),
						'rotation': new BABYLON.Vector3(0, WTW.getRadians(180), WTW.getRadians(180))
					};
					WTW.hudHighlightCamera(1, zmoldname);
					WTW.initCamera(1, zcamera1id, zsettings);
					break;
				case 'hud-imagebutton-camerastyle-picture':
					WTW.hudHighlightCamera(0, zmoldname);
					WTW.initCamera(1, 'followcamera', zsettings);
					break;
				case 'hud-imagebutton-camerastyle-anaglyph':
					WTW.hudHighlightCamera(0, zmoldname);
					WTW.initCamera(1, 'anaglyphcamera', zsettings);
					break;
				case 'hud-imagebutton-camerastyle-vr':
					WTW.hudHighlightCamera(0, zmoldname);
					WTW.initCamera(1, 'vrcamera', zsettings);
					break;
				case 'hud-imagebutton-camerastyle-vrgamepad':
					WTW.hudHighlightCamera(0, zmoldname);
					WTW.initCamera(1, 'vrgamepadcamera', zsettings);
					break;
				case 'hud-imagebutton-camera2-follow':
					zsettings = {
						'parent': zparent,
						'distance': -28,
						'position': new BABYLON.Vector3(0, 0, 0),
						'rotation': new BABYLON.Vector3(0, 0, 0)
					};
					WTW.hudHighlightCamera(2, zmoldname);
					WTW.initCamera(2, zcamera1id, zsettings);
					break;
				case 'hud-imagebutton-camera2-scene':
					zsettings = {
						'parent': zparent,
						'distance': -40,
						'position': new BABYLON.Vector3(0, 0, 0),
						'rotation': new BABYLON.Vector3(0, 0, 0)
					};
					WTW.hudHighlightCamera(2, zmoldname);
					WTW.initCamera(2, zcamera1id, zsettings);
					break;
				case 'hud-imagebutton-camera2-self':
					zsettings = {
						'parent': zparent,
						'distance': 30,
						'position': new BABYLON.Vector3(0, 0, 0),
						'rotation': new BABYLON.Vector3(0, 0, 0)
					};
					WTW.hudHighlightCamera(2, zmoldname);
					WTW.initCamera(2, zcamera1id, zsettings);
					break;
				case 'hud-slider-camera1-dist':
					
					break;
				case 'hud-slider-camera1-dist-left':
					
					break;
				case 'hud-slider-camera1-dist-right':
					
					break;
				case 'hud-save-profile':
					WTW.hudSaveProfile();
					break;
				case 'hud-cancel-profile':
					WTW.hudCheckLayout('');
					WTW.hudMenuText('settings');
					WTW.hudClearProfile();
					break;
				default:
					if (zmoldname.indexOf('hud-menuitem-') > -1) {
						/* process any HUD menu item */
						WTW.hudGetMenuItem(zmoldname);
					} else if (zmoldname.indexOf('hud-textbox-') > -1) {
						/* set selected mold and allow keyboard to enter text to 3D Textbox */
						WTW.hudEditText(zmoldname, 'hud-pageform');
					} else if (zmoldname.indexOf('background') > -1) {
						/* do nothing on the background */
					} else {
						WTW.closeHUD();
					}
					break;
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-hudClick=' + ex.message);
	}
}

WTWJS.prototype.hudCheckHovers = function(zmoldname, zactive) {
	/* hud button hover and reset hover: zactive = 1 for hover, 0 for reset hover */
	try {
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmoldname.indexOf('hud-menuitem-') > -1 || zmoldname.indexOf('hud-imagebutton-') > -1 || zmoldname.indexOf('hud-save-') > -1 || zmoldname.indexOf('hud-cancel-') > -1) {
			if (zmold != null) {
				if (Math.round(WTW.getDegrees(zmold.rotation.x)) == 0 && zactive == 1) {
					zmold.rotation.x = WTW.getRadians(20);
					zmold.position.z -= .2;
				} else if (Math.round(WTW.getDegrees(zmold.rotation.x)) == 20 && zactive == 0) {
					zmold.rotation.x = WTW.getRadians(0);
					zmold.position.z += .2;
				}
			}
			var zmoldtextname = zmoldname.replace('-menuitem-','-menuitemtext-');
			if (zmoldtextname.indexOf('hud-save-') > -1 || zmoldtextname.indexOf('hud-cancel-') > -1) {
				zmoldtextname += '-text';
			}
			var zmoldtext = WTW.getMeshOrNodeByID(zmoldtextname);
			if (zmoldtext != null) {
				if (Math.round(WTW.getDegrees(zmoldtext.rotation.x)) == 0 && zactive == 1) {
					zmoldtext.rotation.x = WTW.getRadians(20);
					zmoldtext.position.z -= .3;
				} else if (Math.round(WTW.getDegrees(zmoldtext.rotation.x)) == 20 && zactive == 0) {
					zmoldtext.rotation.x = WTW.getRadians(0);
					zmoldtext.position.z += .3;
				} else if (Math.round(WTW.getDegrees(zmoldtext.rotation.x)) == 270 && zactive == 1) {
					zmoldtext.rotation.x = WTW.getRadians(290);
					zmoldtext.position.z -= .3;
				} else if (Math.round(WTW.getDegrees(zmoldtext.rotation.x)) == 290 && zactive == 0) {
					zmoldtext.rotation.x = WTW.getRadians(270);
					zmoldtext.position.z += .3;
				}
			}
		} else if (zmoldname.indexOf('hud-textbox-') > -1) {
			if (zmold != null) {
				if (zmold.scaling.y == 1 && zactive == 1) {
					zmold.scaling.y = .9;
				} else if (zmold.scaling.y == .9 && zactive == 0) {
					zmold.scaling.y = 1;
				}
			}
		} else if (zmoldname.indexOf('hud-slider') > -1) {
			if (zmold != null) {
				if (zmold.scaling.y == 1 && zactive == 1) {
					zmold.scaling.y = 1.1;
				} else if (zmold.scaling.y == 1.1 && zactive == 0) {
					zmold.scaling.y = 1;
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-hudCheckHovers=' + ex.message);
	}
}

WTWJS.prototype.hudToggleCompass = function() {
	/* hud toggle compass open or closed */
	try {
		var zmoldname = 'compass-0';
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold == null) {
			/* HUD Compass layout */
			var zobjectfolder = '/content/system/babylon/compass/';
			var zobjectfile = 'compass.babylon';
			var zobjectanimations = null;

			var zcamerafront = WTW.getMeshOrNodeByID('camerafront');
			
			zmold = new BABYLON.TransformNode(zmoldname);
			zmold.position = new BABYLON.Vector3(8,-5,4);
			zmold.rotation = new BABYLON.Vector3(WTW.getRadians(-30),0,WTW.getRadians(10));
			zmold.scaling = new BABYLON.Vector3(.75,.75,.75);
			zmold.parent = zcamerafront;
			zmold.renderingGroupId = 3;
			
			BABYLON.SceneLoader.ImportMeshAsync('', zobjectfolder, zobjectfile, scene).then(
				function (zresults) {
					if (zresults.meshes != null) {
						var zobjectanimations = [];
						zmold.WTW = {
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
								zresults.meshes[i].isPickable = false;
								zresults.meshes[i].renderingGroupId = 3;
								
								/* make sure all object meshes have a parent */
								if (zresults.meshes[i].parent == null) {
									zresults.meshes[i].parent = zmold;
								}
								/* initiate and preload any event driven animations */
								if (zobjectanimations != null) {
									WTW.addMoldAnimation(zmoldname, zmeshname, zresults.meshes[i], zobjectanimations);
								}
								if (zmold == null || zmold.parent == null) {
									/* if the parent has been deleted after this async process began (avoiding orphaned objects)*/
									zresults.meshes[i].dispose();
								}
							}
						}
					}
					zmold = WTW.getMeshOrNodeByID(zmoldname);
					if (zmold == null || zmold.parent == null) {
						/* if the parent has been deleted after this async process began (avoiding orphaned objects) */
						WTW.disposeClean(zmoldname);
					}
				}
			);
		} else {
			WTW.disposeClean('compass-0');
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-hudToggleCompass=' + ex.message);
	}
}

WTWJS.prototype.hudGetMenuItem = function(zmoldname) {
	/* get the menu item function and execute */
	try {
		var zmenuitemid = '';
		if (zmoldname.indexOf('-') > -1) {
			zmenuitemid = zmoldname.split('-')[2];
		}
		if (zmenuitemid != '') {
			/* pull the menu option Action from the database menuitems table */
			var zrequest = {
				'menuitemid':zmenuitemid,
				'function':'gethudmenuitem'
			};
			WTW.postAsyncJSON('/core/handlers/hud.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* is Menu Action exists, execute the JavaScript function */
					if (zresponse[0].menuaction != undefined && zresponse[0].menuproperty != undefined) {
						WTW.executeFunctionByName(zresponse[0].menuaction, window, zresponse[0].menuproperty, zresponse[0].menuitemid, zresponse[0].menualignment);
					}
				}
			);
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-hudGetMenuItem=' + ex.message);
	}
}

WTWJS.prototype.hudCheckLayout = function(zmenualignment) {
	/* Change the HUD Layout as needed */
	try {
		if (WTW.hudLayout != zmenualignment) {
			if (WTW.hudLayout == 'left') {
				switch (zmenualignment) {
					case '':
						WTW.hudExecuteAnimation('HUDleftclose');
						break;
					case 'right':
						WTW.hudExecuteAnimation('HUDlefttoright');
						break;
					case 'bottom':
						WTW.hudExecuteAnimation('HUDbottomleftopen');
						break;
				}
			} else if (WTW.hudLayout == 'right') {
				switch (zmenualignment) {
					case '':
						WTW.hudExecuteAnimation('HUDrightclose');
						break;
					case 'left':
						WTW.hudExecuteAnimation('HUDrighttoleft');
						break;
				}
			} else if (WTW.hudLayout == 'bottom') {
				switch (zmenualignment) {
					case '':
						WTW.hudExecuteAnimation('HUDbottomclose');
						break;
					case 'left':
						WTW.hudExecuteAnimation('HUDbottomleftclose');
						break;
				}
			} else { /* WTW.hudLayout == '' */
				switch (zmenualignment) {
					case 'left':
						WTW.hudExecuteAnimation('HUDleftopen');
						break;
					case 'right':
						WTW.hudExecuteAnimation('HUDrightopen');
						break;
					case 'bottom':
						WTW.hudExecuteAnimation('HUDbottomopen');
						break;
				}
			}
			WTW.hudLayout = zmenualignment;
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-hudCheckLayout=' + ex.message);
	}
}


WTWJS.prototype.hudExecuteAnimation = function(zanimationname) {
	/* run the animaiton for all molds in the HUD */
	try {
		var zhud = WTW.getMeshOrNodeByID('hud');
		if (zhud != null) {
			var zanimationind = -1;
			var zobjectanimations = zhud.WTW.objectanimations;
			for (var i=0;i < zobjectanimations.length;i++) {
				if (zobjectanimations[i] != null) {
					if (zobjectanimations[i].animationname == zanimationname) {
						zanimationind = i;
					}
				}
			}
		
			var zhud = WTW.getMeshOrNodeByID('hud');
			if (zhud != null) {
				var zhudparts = zhud.getChildren();
				for (var i=0;i < zhudparts.length;i++) {
					if (zhudparts[i] != null) {
						scene.beginAnimation(zhudparts[i], zobjectanimations[zanimationind].startframe, zobjectanimations[zanimationind].endframe, zobjectanimations[zanimationind].animationloop, Number(zobjectanimations[zanimationind].speedratio), null, null);
					}
				}
			}		
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-hudExecuteAnimation=' + ex.message);
	}
}

WTWJS.prototype.hudOpenMenuItem = function(zmenuitem, zmenuitemid, zmenualignment) {
	/* get the menu form page for the menu item selected */
	try {
		WTW.hudClearForm();
		var zhud = WTW.getMeshOrNodeByID('hud');
		var zmenuleft = WTW.getMeshOrNodeByID('hud-menuleft');
		if (zhud != null) {
			/* change HUD layout if needed */
			WTW.hudCheckLayout(zmenualignment);
			/* only create if the HUD is still open */
			var zpageformtitle = '';
			var zpageformtitley = 4.5;
			var zpageformtitleparent = null;
			var zopacity = 1;
			var ztransparentmat = new BABYLON.StandardMaterial('hudmat', scene);
			ztransparentmat.alpha = 0;
			
			/* create a parent box for any added items on the page, makes it easier to clear on page change */
			var zmenucenter = WTW.getMeshOrNodeByID('hud-menucenter');
			var zmoldname = 'hud-pageform';
			var zmold = WTW.getMeshOrNodeByID(zmoldname);
			if (zmold == null) {
				zmold = new BABYLON.TransformNode(zmoldname);
				zmold.position = new BABYLON.Vector3(0,0,0);
				zmold.rotation = new BABYLON.Vector3(0,0,0);
				zmold.scaling = new BABYLON.Vector3(1,1,1);
			}
			zmold.parent = zmenucenter;
			zpageformtitleparent = zmold;
			
			/* clear old form elements */
			var zelements = zmold.getChildren();
			for (var i=0;i < zelements.length;i++) {
				zelements[i].dispose();
			}
			
			var zmenutitle = WTW.getMeshOrNodeByID('hud-menutitle');
			if (zmenutitle != null) {
				zmenutitle.isVisible = true;
			}
			
			switch (zmenuitem) {
				case '1': /* Player Stats */
					zpageformtitle = 'Player Stats';
					
					
					break;
				case '2': /* Inventory */
					zpageformtitle = 'Inventory';
					if (zmenutitle != null) {
						zmenutitle.isVisible = false;
					}
					zpageformtitley = 2.1;
					zpageformtitleparent = zmenuleft;
					zopacity = 0;
					WTW.hudGetInventory();
					break;
				case '50': /* Settings */
					WTW.hudMenuText('settings');
					break;
				case '51': /* Return to Main Menu */
					WTW.hudMenuText('mainmenu');
					break;
				case '55': /* Avatar */
					zpageformtitle = 'Avatar';

					break;
				case '60': /* Cameras */
					zpageformtitle = 'Cameras';
					zpageformtitley = 4.7;
					WTW.hudGetCameras();
					break;
				case '65': /* Sound */
					zpageformtitle = 'Sound';

					break;
				case '70': /* Graphics */
					zpageformtitle = 'Graphics';

					break;
				case '75': /* Multiplayer */
					zpageformtitle = 'Multiplayer';

					break;
				case '85': /* WTW Coins */
					zpageformtitle = 'WTW Coins';

					break;
				case '100': /* Profile */
					zpageformtitle = 'Profile';
					zpageformtitley = 4.7;
					WTW.hudGetProfile();
					break;
			}
			/* clear the menu items background to black and highlight the newly selected menu item */
			var zmenuitemsparent = WTW.getMeshOrNodeByID('hud-menuitems');
			if (zmenuitemsparent != null) {
				var zmenuitems = zmenuitemsparent.getChildren();
				for (var i=0;i < zmenuitems.length;i++) {
					if (zmenuitems[i] != null) {
						if (zmenuitems[i].name.indexOf('hud-menuitem-') > -1) {
							var zbgcolor = '#000000';
							/* need to check if it is selected */
							if (zmenuitems[i].name == 'hud-menuitem-' + zmenuitemid) {
								zbgcolor = '#09255F';
							}
							/* reset the material on the menu item button - blue for selected and black is default */
							var zcovering = new BABYLON.StandardMaterial(zmenuitems[i].name + 'mat', scene);
							zcovering.alpha = 1;
							zcovering.emissiveColor =  new BABYLON.Color3.FromHexString(zbgcolor);
							zcovering.diffuseColor =  new BABYLON.Color3.FromHexString(zbgcolor);
							zcovering.specularColor =  new BABYLON.Color3.FromHexString(zbgcolor);
							zcovering.ambientColor =  new BABYLON.Color3.FromHexString(zbgcolor);
							zmenuitems[i].material = zcovering;
							zcovering.alpha = zopacity;
						} else if (zmenuitems[i].name.indexOf('hud-menuitemtext-') > -1) {
							var zmenuitemtext = WTW.getMeshOrNodeByID(zmenuitems[i].name);
							if (zmenuitemtext != null) {
								if (zmenuitemtext.material != undefined) {
									zmenuitemtext.material.alpha = zopacity;
								}
							}
						}
					}
				}
			}
			if (zpageformtitle != '') {
				/* create page form title */
				var zpageformtitlestyle = {
					'font-family': 'Arial',
					'anchor':'center',
					'letter-height':1.2,
					'letter-thickness':.2,
					'color':'#ffffff',
					'alpha':1.00,
					'colors':{
						'diffuse':'#ffffff',
						'specular':'#989e2c',
						'ambient':'#888722',
						'emissive':'#37370d'
					}
				};
				/* create 3d text */
				Writer = BABYLON.MeshWriter(scene, {scale:1});
				var zmytext = WTW.getMeshOrNodeByID(zmoldname + '-pageformtitle');
				if (zmytext != null) {
					zmytext.dispose();
				}
				var zdisplaytext = new Writer(zpageformtitle, zpageformtitlestyle);
				zmytext = zdisplaytext.getMesh();
				zmytext.rotation = new BABYLON.Vector3(WTW.getRadians(-90), 0, 0);
				zmytext.position.y = zpageformtitley;
				zmytext.id = zmoldname + '-pageformtitle';
				zmytext.name = zmoldname + '-pageformtitle';
				zmytext.parent = zpageformtitleparent;
				zmytext.isPickable = false;
				zmytext.renderingGroupId = 3;
			}

		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-hudOpenMenuItem=' + ex.message);
	}
}

WTWJS.prototype.hudGetInventory = function() {
	/* get Player inventory */
	try {
		
		
		
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-hudGetInventory=' + ex.message);
	}
}

WTWJS.prototype.hudClearForm = function() {
	/* clear the HUD center Form */
	try {
		WTW.disposeClean('hud-pageform');
		
		
		
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-hudClearForm=' + ex.message);
	}
}


/* User Menu Settings functions */

WTWJS.prototype.changeCameraDistance = function() {
	/* walk animation speed set in the user menu */
	try {
		WTW.cameraDistance = Number(dGet('wtw_tcameradistance').value);
        WTW.setCookie('cameradistance',WTW.cameraDistance,365);
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-changeCameraDistance=' + ex.message);
	}
}

WTWJS.prototype.changeWalkAnimationSpeed = function() {
	/* walk animation speed set in the user menu */
	try {
		WTW.walkAnimationSpeed = Number(dGet('wtw_twalkanimationspeed').value);
        WTW.setCookie('walkanimationspeed',WTW.walkAnimationSpeed,365);
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-changeWalkAnimationSpeed=' + ex.message);
	}
}

WTWJS.prototype.changeWalkSpeed = function() {
	/* walk speed set in the user menu */
	try {
		WTW.walkSpeed = Number(dGet('wtw_twalkspeed').value);
        WTW.setCookie('walkspeed',WTW.walkSpeed,365);
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-changeWalkSpeed=' + ex.message);
	}
}

WTWJS.prototype.changeTurnAnimationSpeed = function() {
	/* turn animation speed set in the user menu */
	try {
		WTW.turnAnimationSpeed = Number(dGet('wtw_tturnanimationspeed').value);
        WTW.setCookie('turnanimationspeed',WTW.turnAnimationSpeed,365);
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-changeTurnAnimationSpeed=' + ex.message);
	}
}

WTWJS.prototype.changeTurnSpeed = function() {
	/* turn speed set in the user menu */
	try {
		WTW.turnSpeed = Number(dGet('wtw_tturnspeed').value);
        WTW.setCookie('turnspeed',WTW.turnSpeed,365);
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-changeTurnSpeed=' + ex.message);
	}
}

WTWJS.prototype.changeGraphic = function(zvalue) {
	/* graphic level set in the user menu */
	try {
        if (WTW.isNumeric(zvalue)) {
            WTW.graphicSet = Number(zvalue);
        } else {
            WTW.graphicSet += zvalue;
		if (WTW.graphicSet > 2) {
			WTW.graphicSet = 2;
		}
		if (WTW.graphicSet < 0) {
			WTW.graphicSet = 0;
		}
        }
		switch (WTW.graphicSet) {
			case 0:
				dGet('wtw_graphichelptitle').innerHTML = WTW.__('Graphics (Low Resolution)');
				WTW.gpuSetting = 'low';
				break;
			case 1:
				dGet('wtw_graphichelptitle').innerHTML = WTW.__('Graphics (Optimum Balance)');
				WTW.gpuSetting = 'medium';
				break;
			case 2:
				dGet('wtw_graphichelptitle').innerHTML = WTW.__('Graphics (High Resolution)');
				WTW.gpuSetting = 'high';
				break;
		}
		dGet('wtw_tgraphicsetting').value = WTW.graphicSet;
		WTW.setCookie('graphicsetting',WTW.graphicSet,365);
		WTW.setCookie('gpusetting', WTW.gpuSetting,30);
		document.location.reload(true);
	} catch (ex) { 
		WTW.log('core-scripts-hud-wtw_hud.js-changeGraphic=' + ex.message);
	}
}

WTWJS.prototype.changeShadow = function(zvalue) {
	/* shadow resolution set in the user menu */
	/* temporarily all shadows are set to level 3 */
	try {
        if (WTW.isNumeric(zvalue)) {
            WTW.shadowSet = Number(zvalue);
        } else {
            WTW.shadowSet += zvalue;
            if (WTW.shadowSet > 3) {
                WTW.shadowSet = 3;
            }
		    if (WTW.shadowSet < 0) {
                WTW.shadowSet = 3;
            }
		    if (WTW.adminView != 0) {
                WTW.shadowSet = 3;
            }
        }
        if (( WTW.gpuSetting == 'medium') && WTW.shadowSet == 3){
        } else if (( WTW.gpuSetting == 'low') && WTW.shadowSet == 2){
        } else {
			WTW.setShadowSettings();
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-changeShadow=' + ex.message);
	}
}

WTWJS.prototype.setShadowSettings = function() {
	/* set shadow properties after shadow setting changed in the user menu */
    try {
		dGet('wtw_tshadowsetting').defaultValue = WTW.shadowSet;
        var zshadowresolution = 1024;
		switch (WTW.shadowSet) {
			case 0:
				zshadowresolution = 512;
				if (WTW.gpuSetting == 'low') {
                    dGet('wtw_shadowhelptitle').innerHTML = WTW.__('Shadows (None - Low Resolution)') + '<br /><b>' + WTW.__('This is your recommended setting.') + '<b/>';
                }
                else {
                    dGet('wtw_shadowhelptitle').innerHTML = WTW.__('Shadows (None - Low Resolution)') + '<br /><br />';
                }
				break;
			case 1:
				zshadowresolution = 1024;
				if (WTW.gpuSetting == 'medium') {
                    dGet('wtw_shadowhelptitle').innerHTML = WTW.__('Shadows (Some - Medium Resolution)') + '<br /><b>' + WTW.__('This is your recommended setting.') + '<b/>';
                }
                else {
                    dGet('wtw_shadowhelptitle').innerHTML = WTW.__('Shadows (Some - Medium Resolution)') + '<br /><br />';
                }
				break;
			case 2:
				zshadowresolution = 1024;
				dGet('wtw_shadowhelptitle').innerHTML = WTW.__('Shadows (Most - High Resolution)') + '<br /><br />';
				break;
			case 3:
				zshadowresolution = 4096;
				if (WTW.gpuSetting == 'high') {
                    dGet('wtw_shadowhelptitle').innerHTML = WTW.__('Shadows (All - Ultimate Resolution)') + '<br><b>' + WTW.__('This is your recommended setting.') + '<b/>';
                }
                else {
                    dGet('wtw_shadowhelptitle').innerHTML = WTW.__('Shadows (All - Ultimate Resolution)') + '<br /><br />';
                }
				break;
		}
		dGet('wtw_tshadowsetting').value = WTW.shadowSet;
		
		WTW.setCookie('wtw_shadowsetting',WTW.shadowSet,365);
		
		var zrenderlist = [];
        if (WTW.shadows != null) {
//			zrenderlist = WTW.shadows.getShadowMap().renderList;
            WTW.shadows.dispose();
            WTW.shadows = null;
        }
		WTW.shadows = new BABYLON.ShadowGenerator(zshadowresolution, WTW.sun);
		WTW.shadows.depthScale = 20000;
		WTW.shadows.setDarkness(0);
		WTW.shadows.bias = 0.01;
		WTW.shadows.usePercentageCloserFiltering = true;
		
//		WTW.shadows.useKernelBlur = true;
//		WTW.shadows.blurKernel = 64;
		//WTW.shadows.getShadowMap().refreshRate = BABYLON.RenderTargetTexture.REFRESHRATE_RENDER_ONCE;
//		WTW.shadows.forceBackFacesOnly = true;

//		if (WTW.shadowSet < 2) {
		WTW.shadows.usePoissonSampling = true;
//		} else if (WTW.shadowSet < 3) {
//          WTW.shadows.useExponentialShadowMap = true;
//		} else {
//			WTW.shadows.useBlurExponentialShadowMap = true;
//		}
//		WTW.shadows.getShadowMap().renderList = zrenderlist;
        
		if (WTW.extraGround != null) {
			if (WTW.shadowSet > 0) {
				if (WTW.extraGround.material != null) {
					WTW.extraGround.material.unfreeze();
				}
				WTW.extraGround.receiveShadows = true;
			} else {
				if (WTW.extraGround.material != null && WTW.adminView == 0) {
					WTW.extraGround.material.freeze();
				}
			}
		}
    } catch (ex) {
        WTW.log('core-scripts-hud-wtw_hud.js-setShadowSettings=' +ex.message);
    }
}

WTWJS.prototype.toggleMicMute = function() {
	/* toggle mic on and off */
	try {
		if (WTW.micMute == true) { 
			/* set menu options for mic turned off */
			dGet('wtw_menumic').src = '/content/system/images/menumicon32.png';
			dGet('wtw_menumic').alt = WTW.__('Turn Mic Off');
			dGet('wtw_menumic').title = WTW.__('Turn Mic Off');
			dGet('wtw_menumicmobile').src = '/content/system/images/menumicon32.png';
			dGet('wtw_menumicmobile').alt = WTW.__('Turn Mic Off');
			dGet('wtw_menumicmobile').title = WTW.__('Turn Mic Off');
			dGet('wtw_audio').style.boxShadow = '5px 2px 5px 0px #0a0a0e5e inset, -2px -2px 1px 0px #a7a7a73d inset';
			dGet('wtw_audio').style.fontSize = '24px';
			WTW.micMute = false;
		} else {
			dGet('wtw_menumic').src = '/content/system/images/menumicoff32.png';
			dGet('wtw_menumic').alt = WTW.__('Turn Mic On');
			dGet('wtw_menumic').title = WTW.__('Turn Mic On');
			dGet('wtw_menumicmobile').src = '/content/system/images/menumicoff32.png';
			dGet('wtw_menumicmobile').alt = WTW.__('Turn Mic On');
			dGet('wtw_menumicmobile').title = WTW.__('Turn Mic On');
			dGet('wtw_audio').style.boxShadow = '-2px -2px 4px 0px #a7a7a73d, 2px 2px 4px 0px #0a0a0e5e';
			dGet('wtw_audio').style.fontSize = '25px';
			WTW.micMute = true;
		}
		WTW.pluginsToggleMicMute();
		WTW.activeMic();
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-toggleMicMute=' + ex.message);
	}
}

WTWJS.prototype.toggleSoundMute = function() {
	/* toggle sound on and off from molds playing the sounds */
	try {
		if (WTW.soundMute == true) { 
			/* was off (muted) - now turn on */
			/* set menu options for sound turned on */
			dGet('wtw_menumute').src = '/content/system/images/menumuteoff32.png';
			dGet('wtw_menumute').alt = WTW.__('Turn Sound Off');
			dGet('wtw_menumute').title = WTW.__('Turn Sound Off');
			dGet('wtw_menumutemobile').src = '/content/system/images/menumuteoff32.png';
			dGet('wtw_menumutemobile').alt = WTW.__('Turn Sound Off');
			dGet('wtw_menumutemobile').title = WTW.__('Turn Sound Off');
			dGet('wtw_submenumute').src = '/content/system/images/menumuteoff.png';
			dGet('wtw_submenumute').alt = WTW.__('Turn Sound Off');
			dGet('wtw_submenumute').title = WTW.__('Turn Sound Off');
			dGet('wtw_submenumutetext').innerHTML = WTW.__('Sound is On');
			
			/* check molds to turn on sound */
			for (var i=0;i < WTW.communitiesMolds.length; i++) {
				if (WTW.communitiesMolds[i] != null) {
					if (WTW.communitiesMolds[i].sound.id != undefined) {
						if (WTW.communitiesMolds[i].sound.id != '') {
							if (WTW.communitiesMolds[i].sound.sound != '') {
								if (WTW.communitiesMolds[i].sound.sound.isPlaying == false) {
									WTW.communitiesMolds[i].sound.sound.play();
								}
							}
						}
					}
					if (WTW.communitiesMolds[i].shape == 'video') {
						var zvideomold = WTW.getMeshOrNodeByID(WTW.communitiesMolds[i].moldname + '-mainvideo');
						if (zvideomold != null) {
							if (typeof zvideomold.material.diffuseTexture.video.pause == 'function') {
								zvideomold.material.diffuseTexture.video.volume = WTW.getSoundVolumeLinear(WTW.communitiesMolds[i].moldname, WTW.communitiesMolds[i].sound.maxdistance);
							}
						}
					}
				}
			}
			/* check molds to turn on sound */
			for (var i=0;i < WTW.buildingMolds.length; i++) {
				if (WTW.buildingMolds[i] != null) {
					if (WTW.buildingMolds[i].sound.id != undefined) {
						if (WTW.buildingMolds[i].sound.id != '') {
							if (WTW.buildingMolds[i].sound.sound != '') {
								if (WTW.buildingMolds[i].sound.sound.isPlaying == false) {
									WTW.buildingMolds[i].sound.sound.play();
								}
							}
						}
					}
					if (WTW.buildingMolds[i].shape == 'video') {
						var zvideomold = WTW.getMeshOrNodeByID(WTW.buildingMolds[i].moldname + '-mainvideo');
						if (zvideomold != null) {
							if (typeof zvideomold.material.diffuseTexture.video.pause == 'function') {
								zvideomold.material.diffuseTexture.video.volume = WTW.getSoundVolumeLinear(WTW.buildingMolds[i].moldname, WTW.buildingMolds[i].sound.maxdistance);
							}
						}
					}
				}
			}
			/* check molds to turn on sound */
			for (var i=0;i < WTW.thingMolds.length; i++) {
				if (WTW.thingMolds[i] != null) {
					if (WTW.thingMolds[i].sound.id != undefined) {
						if (WTW.thingMolds[i].sound.id != '') {
							if (WTW.thingMolds[i].sound.sound != '') {
								if (WTW.thingMolds[i].sound.sound.isPlaying == false) {
									WTW.thingMolds[i].sound.sound.play();
								}
							}
						}
					}
					if (WTW.thingMolds[i].shape == 'video') {
						var zvideomold = WTW.getMeshOrNodeByID(WTW.thingMolds[i].moldname + '-mainvideo');
						if (zvideomold != null) {
							if (typeof zvideomold.material.diffuseTexture.video.pause == 'function') {
								zvideomold.material.diffuseTexture.video.volume = WTW.getSoundVolumeLinear(WTW.thingMolds[i].moldname, WTW.thingMolds[i].sound.maxdistance);
							}
						}
					}
				}
			}
			/* set global variable for mute */
			WTW.soundMute = false;
		} else {
			/* set menu options for sound turned off */
			dGet('wtw_menumute').src = '/content/system/images/menumuteon32.png';
			dGet('wtw_menumute').alt = WTW.__('Turn Sound On');
			dGet('wtw_menumute').title = WTW.__('Turn Sound On');
			dGet('wtw_menumutemobile').src = '/content/system/images/menumuteon32.png';
			dGet('wtw_menumutemobile').alt = WTW.__('Turn Sound On');
			dGet('wtw_menumutemobile').title = WTW.__('Turn Sound On');
			dGet('wtw_submenumute').src = '/content/system/images/menumuteon.png';
			dGet('wtw_submenumute').alt = WTW.__('Turn Sound On');
			dGet('wtw_submenumute').title = WTW.__('Turn Sound On');
			dGet('wtw_submenumutetext').innerHTML = WTW.__('Sound is Off');

			/* check molds to turn off sound */
			for (var i=0;i < WTW.communitiesMolds.length; i++) {
				if (WTW.communitiesMolds[i] != null) {
					if (WTW.communitiesMolds[i].sound.id != undefined) {
						if (WTW.communitiesMolds[i].sound.id != '') {
							if (WTW.communitiesMolds[i].sound.sound != '') {
								if (WTW.communitiesMolds[i].sound.sound.isPlaying == true) {
									WTW.communitiesMolds[i].sound.sound.pause();
								}
							}
						}
					}
				}
			}
			/* check molds to turn off sound */
			for (var i=0;i < WTW.buildingMolds.length; i++) {
				if (WTW.buildingMolds[i] != null) {
					if (WTW.buildingMolds[i].sound.id != undefined) {
						if (WTW.buildingMolds[i].sound.id != '') {
							if (WTW.buildingMolds[i].sound.sound != '') {
								if (WTW.buildingMolds[i].sound.sound.isPlaying == true) {
									WTW.buildingMolds[i].sound.sound.pause();
								}
							}
						}
					} 
					if (WTW.buildingMolds[i].shape == 'video') {
						var zvideomold = WTW.getMeshOrNodeByID(WTW.buildingMolds[i].moldname + '-mainvideo');
						if (zvideomold != null) {
							if (typeof zvideomold.material.diffuseTexture.video.pause == 'function') {
								zvideomold.material.diffuseTexture.video.volume = 0;
							}
						}
					}
				}
			}
			/* check molds to turn off sound */
			for (var i=0;i < WTW.thingMolds.length; i++) {
				if (WTW.thingMolds[i] != null) {
					if (WTW.thingMolds[i].sound.id != undefined) {
						if (WTW.thingMolds[i].sound.id != '') {
							if (WTW.thingMolds[i].sound.sound != '') {
								if (WTW.thingMolds[i].sound.sound.isPlaying == true) {
									WTW.thingMolds[i].sound.sound.pause();
								}
							}
						}
					}
				}
			}
			/* check mold events (animations) to turn off sound */
			for (var i=0;i < WTW.moldEvents.length; i++) {
				if (WTW.moldEvents[i] != null) {
					if (WTW.moldEvents[i].soundid != undefined) {
						if (WTW.moldEvents[i].soundid != '') {
							if (typeof WTW.moldEvents[i].sound.pause == 'function') {
								if (WTW.moldEvents[i].sound.isPlaying == true) {
									WTW.moldEvents[i].sound.pause();
								}
							}
						}
					}
				}
			}
			/* set global variable for mute */
			WTW.soundMute = true;
		}
		WTW.setCookie('soundmute',WTW.soundMute,30);
		WTW.pluginsToggleSoundMute();
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-toggleSoundMute=' + ex.message);
	}
}

/* menu options - set on or off */
WTWJS.prototype.toggleCameraTwo = function() {
	/* toggle on or off camera two (scene camera) */
	try {
		var zcamera2 = WTW.getCookie('showcameratwo');
		if (zcamera2 == 0) { 
			/* turn on */
			WTW.show('wtw_cameratwoselect');
			WTW.setCookie('showcameratwo','1',30);
		} else {
			/* turn off */
			WTW.hide('wtw_cameratwoselect');
			WTW.setCookie('showcameratwo','0',30);
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-toggleCameraTwo=' + ex.message);
	}
}

WTWJS.prototype.toggleArrows = function() {
	/* toggle show or hide movement arrows (mostly for first person camera) */
	try {
		if (dGet('wtw_arrowsvisibility').innerHTML == WTW.__('Arrows are Visible')) { 
			/* hide arrows */
			dGet('wtw_arrowsvisibility').innerHTML = WTW.__('Arrows are Hidden');
			dGet('wtw_arrowsicon').src = '/content/system/images/menuoff.png';
			dGet('wtw_arrowsicon').alt = WTW.__('Show Arrows');
			dGet('wtw_arrowsicon').title = WTW.__('Show Arrows');
			WTW.hide('wtw_iwalkarrow');
			WTW.hide('wtw_iwalkarrow2');
			WTW.setCookie('showarrows','0',30);
		} else {
			/* show arrows */
			dGet('wtw_arrowsvisibility').innerHTML = WTW.__('Arrows are Visible');
			dGet('wtw_arrowsicon').src = '/content/system/images/menuon.png';
			dGet('wtw_arrowsicon').alt = WTW.__('Hide Arrows');
			dGet('wtw_arrowsicon').title = WTW.__('Hide Arrows');
			WTW.show('wtw_iwalkarrow');
			WTW.show('wtw_iwalkarrow2');
			WTW.setCookie('showarrows','1',30);
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-toggleArrows=' + ex.message);
	}
}

WTWJS.prototype.toggleFPS = function() {
	/* toggle show or hide frames per second counter */
	try {
		if (dGet('wtw_fpsvisibility').innerHTML == WTW.__('Counts and FPS are Visible')) { 
			/* hide fps */
			dGet('wtw_fpsvisibility').innerHTML = WTW.__('Counts and FPS are Hidden');
			dGet('wtw_fpsicon').src = '/content/system/images/menuoff.png';
			dGet('wtw_fpsicon').alt = WTW.__('Show Mold Count');
			dGet('wtw_fpsicon').title = WTW.__('Show Mold Count');
			WTW.hide('wtw_showmeshfps');
			WTW.setCookie('showfps','0',30);
			WTW.showFPS = 0;
		} else {
			/* show fps */
			dGet('wtw_fpsvisibility').innerHTML = WTW.__('Counts and FPS are Visible');
			dGet('wtw_fpsicon').src = '/content/system/images/menuon.png';
			dGet('wtw_fpsicon').alt = WTW.__('Hide Mold Count');
			dGet('wtw_fpsicon').title = WTW.__('Hide Mold Count');
			WTW.show('wtw_showmeshfps');
			WTW.setCookie('showfps','1',30);
			WTW.showFPS = 1;
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-toggleFPS=' + ex.message);
	}
}

WTWJS.prototype.showSettingsMenu = function(zmenuitem) {
	/* show or hide sections of the browse menu (bottom menu bar) */
	try {
		WTW.toggleBrowseMenu(0);
		switch (zmenuitem) {
			case 'wtw_menuprofile':
				var zentervisible = false;
				var zhudlogin = WTW.getMeshOrNodeByID('hudlogin');
				var zenter = WTW.getMeshOrNodeByID('hudlogin-button-enter');
				if (zenter != null) {
					zentervisible = zenter.isVisible;
				}
				if (zhudlogin == null || zentervisible) {
					WTW.openLoginMenu();WTW.closeMenus();
				} else {
					WTW.closeLoginHUD();
				}
				return true;
				break;
		}
		
		WTW.show(zmenuitem);
		if (zmenuitem == 'wtw_menuprofile') {
			if (dGet('wtw_tuserid').value != '') {
				WTW.hide('wtw_menulogin');
				WTW.show('wtw_menuloggedin');
			} else {
				WTW.hide('wtw_menuloggedin');
				WTW.show('wtw_menulogin');
			}
		}
		if (dGet(zmenuitem + 'scroll') != null) {
			dGet(zmenuitem + 'scroll').style.height = 'auto';
			if (dGet(zmenuitem + 'scroll').clientHeight < (WTW.sizeY - 95)) {
				dGet(zmenuitem + 'scroll').style.height = dGet(zmenuitem + 'scroll').scrollHeight + 'px';
			}
			if (zmenuitem == 'wtw_menuavatar') {
				if (dGet(zmenuitem + 'scroll').clientHeight > (WTW.sizeY - 355)) {
					dGet(zmenuitem + 'scroll').style.height = (WTW.sizeY - 355) + 'px';
				}
			} else {
				if (dGet(zmenuitem + 'scroll').clientHeight > (WTW.sizeY - 95)) {
					dGet(zmenuitem + 'scroll').style.height = (WTW.sizeY - 95) + 'px';
				}
			}
		} 
	} catch (ex) { 
		WTW.log('core-scripts-hud-wtw_hud.js-showSettingsMenu=' + ex.message);
	}
}

WTWJS.prototype.resizeMenu = function(zformid, zsize) {
	try {
		/* formid is the name of the form div */
		/* zsize should be min or max */
		if (zsize == 'min') {
			WTW.hide(zformid + 'maxdiv');
			WTW.hide(zformid + 'min');
			WTW.show(zformid + 'max');
		} else {
			WTW.show(zformid + 'maxdiv');
			WTW.hide(zformid + 'max');
			WTW.show(zformid + 'min');
		}
		if (dGet(zformid + 'scroll') != null) {
			dGet(zformid + 'scroll').style.height = 'auto';
			dGet(zformid + 'scroll').style.minHeight = '0px';
		}
	} catch (ex) { 
		WTW.log('core-scripts-hud-wtw_hud.js-resizeMenu=' + ex.message);
	}
}

WTWJS.prototype.closeMenus = function(zmenuid) {
	/* closes the browse menus */
	try {
		if (zmenuid == undefined) {
			zmenuid = '';
		}
		WTW.show('wtw_menulogin');
		var zmenuforms = document.getElementsByClassName('wtw-slideupmenuright');
		for (var i=0;i<zmenuforms.length;i++) {
			if (zmenuforms[i] != null) {
				if (zmenuforms[i].id != undefined) {
					WTW.hide(zmenuforms[i].id);
				}
			}
		}
		zmenuforms = document.getElementsByClassName('wtw-slideupmenuleft');
		for (var i=0;i<zmenuforms.length;i++) {
			if (zmenuforms[i] != null) {
				if (zmenuforms[i].id != undefined) {
					WTW.hide(zmenuforms[i].id);
				}
			}
		}
		WTW.pluginsCloseMenus(zmenuid);
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-closeMenus=' + ex.message);
	}
}

WTWJS.prototype.toggleBrowseMenu = function(zopen) {
	/* toggles the browse menu */
	try {
		if (zopen == undefined) {
			zopen = 3;
		}
		if (WTW.isMobile == 1 || WTW.sizeX < WTW.sizeY) {
			/* is Mobile or portrait */
			WTW.hide('wtw_menuexpanded');
			if (zopen == 1) {
				WTW.show('wtw_menuexpandedmobile');
			} else if (dGet('wtw_menuexpandedmobile').style.display == 'block' || zopen == 0) {
				WTW.hide('wtw_menuexpandedmobile');
			} else {
				WTW.show('wtw_menuexpandedmobile');
			}
			if (dGet('wtw_mobilemenuscroll') != null) {
				dGet('wtw_mobilemenuscroll').style.height = (WTW.sizeY - 80) + 'px';
			}
			WTW.hide('wtw_profileimagesmmobile');
			WTW.hide('wtw_profileimagesmmobiletext');
			WTW.hide('wtw_modecommunitymobiletext');
			WTW.hide('wtw_modebuildingmobiletext');
			if (WTW.placeHolder == 1) {
				WTW.hide('wtw_menuoptionanimationsmobile');
				WTW.hide('wtw_menuoptionanimationsmobiletext');
			} else {
				WTW.show('wtw_menuoptionanimationsmobile');
				WTW.show('wtw_menuoptionanimationsmobiletext');
				if (dGet('wtw_tuserid').value != '') {
					WTW.show('wtw_profileimagesmmobile');
					WTW.show('wtw_profileimagesmmobiletext');
				}
			}
			if (dGet('wtw_tuserid').value == '') {
				WTW.hide('wtw_mainadminmodemobile');
				WTW.hide('wtw_mainadminmodemobiletext');
				WTW.show('wtw_mainmenudisplaynamemobile');
			} else {
				WTW.show('wtw_mainadminmodemobile');
				WTW.show('wtw_mainadminmodemobiletext');
				WTW.hide('wtw_mainmenudisplaynamemobile');
			}
		} else {
			/* is not mobile or portrait */
			WTW.toggle('wtw_menuexpanded');
			WTW.hide('wtw_menuexpandedmobile');
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-toggleBrowseMenu=' + ex.message);
	}
}


/* Babylon debug tools */

WTWJS.prototype.toggleDebugLayer = function(zshow) {
	/* toggles the Babylon debugger */
	try {
		if (zshow == undefined) {
			if (scene.debugLayer.isVisible() == true) {
				zshow = false;
			} else {
				zshow = true;
			}
		}
		if (zshow) {
			scene.debugLayer.show({
			  embedMode: true
			});
		} else {
			scene.debugLayer.hide();
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-toggleDebugLayer=' + ex.message);
	}
}

WTWJS.prototype.togglePhysicsViewer = function(zshow) {
	/* toggles the physics debugger with show physics on the meshes */
	try {
		if (zshow == undefined) {
			if (WTW.physicsViewer == null) {
				zshow = true;
			} else {
				zshow = false;
			}
		}
		if (WTW.physicsViewer == null) {
			WTW.physicsViewer = new BABYLON.Debug.PhysicsViewer();
		}
		if (zshow) {
			for (var zmold of scene.rootNodes) {
				if (zmold.physicsBody) {
					var zdebugmold = WTW.physicsViewer.showBody(zmold.physicsBody);
				}
				if (zmold.physicsImposter) {
					var zdebugmold = WTW.physicsViewer.showImpostor(zmold.physicsImpostor);
				}
			}
		} else {
			for (var zmold of scene.rootNodes) {
				if (zmold.physicsBody) {
					var zdebugmold = WTW.physicsViewer.hideBody(zmold.physicsBody);
				}
				if (zmold.physicsImpostor) {
					var zdebugmold = WTW.physicsViewer.hideImpostor(zmold.physicsImpostor);
				}
			}
			WTW.physicsViewer.dispose();
			WTW.physicsViewer = null;
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-togglePhysicsViewer=' + ex.message);
	}
}


/* these functions are used by admin menu - dev lists of objects for troubleshooting - prints results to the console log */

WTWJS.prototype.listConnectingGrids = function() {
	/* list connecting grids */
	var zcolor = 'black';
	WTW.log('---connecting grids--------------------------------------');
	for (var i = 0; i < WTW.connectingGrids.length; i++) {
		if (WTW.connectingGrids[i] != null) {
			if (WTW.connectingGrids[i].shown == '2') {
				if (WTW.connectingGrids[i].childwebtype=='community') {
					zcolor = 'red';
				} else if (WTW.connectingGrids[i].childwebtype=='building') {
					zcolor = 'lightblue';
				} else if (WTW.connectingGrids[i].childwebtype=='thing') {
					zcolor = 'green';
				} else {
					zcolor = 'black';
				}
				WTW.log(i + '==' + WTW.connectingGrids[i].moldname + '=(shown)=' + WTW.connectingGrids[i].shown + '=(status)=' + WTW.connectingGrids[i].status, zcolor);		
			}
		}
	}
	WTW.log('-----------------------------------------');
	for (var i = 0; i < WTW.connectingGrids.length; i++) {
		if (WTW.connectingGrids[i] != null) {
			if (WTW.connectingGrids[i].shown != '2') {
				if (WTW.connectingGrids[i].childwebtype=='community') {
					zcolor = 'brown';
				} else if (WTW.connectingGrids[i].childwebtype=='building') {
					zcolor = 'lightblue';
				} else if (WTW.connectingGrids[i].childwebtype=='thing') {
					zcolor = 'green';
				} else {
					zcolor = 'black';
				}
				WTW.log(i + '==' + WTW.connectingGrids[i].moldname + '=(shown)=' + WTW.connectingGrids[i].shown + '=(status)=' + WTW.connectingGrids[i].status, zcolor);		
			}
		}
	}
}

WTWJS.prototype.listActionZones = function() {
	/* list action zones */
	var zcolor = 'black';
	WTW.log('---action zones-(shown)------------------------------');
	for (var i = 0; i < WTW.actionZones.length; i++) {
		if (WTW.actionZones[i] != null) {
			if (WTW.actionZones[i].actionzonename.toLowerCase().indexOf('extreme') > -1) {
				zcolor = 'green';
			} else if (WTW.actionZones[i].actionzonename.toLowerCase().indexOf('high') > -1) {
				zcolor = 'lightblue';
			} else {
				zcolor = 'black';
			}
			if (WTW.actionZones[i].shown == '2') {
				WTW.log(i + '==' + WTW.actionZones[i].moldname + '=(shown)=' + WTW.actionZones[i].shown + '=(status)=' + WTW.actionZones[i].status + '=(name)=' + WTW.actionZones[i].actionzonename + '=(cgind)=' + WTW.actionZones[i].connectinggridind, zcolor);		
				WTW.log(i + '==parent=' + WTW.actionZones[i].parentname, 'orange');
			}
		}
	}
	WTW.log('---action zones-(not shown)--------------------------');
	for (var i = 0; i < WTW.actionZones.length; i++) {
		if (WTW.actionZones[i] != null) {
			if (WTW.actionZones[i].actionzonename.toLowerCase().indexOf('extreme') > -1) {
				zcolor = 'green';
			} else if (WTW.actionZones[i].actionzonename.toLowerCase().indexOf('high') > -1) {
				zcolor = 'lightblue';
			} else {
				zcolor = 'black';
			}
			if (WTW.actionZones[i].shown != '2') {
				WTW.log(i + '==' + WTW.actionZones[i].moldname + '=(shown)=' + WTW.actionZones[i].shown + '=(status)=' + WTW.actionZones[i].status + '=(name)=' + WTW.actionZones[i].actionzonename + '=(cgind)=' + WTW.actionZones[i].connectinggridind, zcolor);		
				WTW.log(i + '==parent=' + WTW.actionZones[i].parentname, 'orange');
			}
		}
	}
}

WTWJS.prototype.listCommunityMolds = function() {
	/* list community molds */
	for (var i = 0; i < WTW.communitiesMolds.length; i++) {
		if (WTW.communitiesMolds[i] != null) {
			var zmold = WTW.getMeshOrNodeByID(WTW.communitiesMolds[i].moldname);
			var zshadow = 'false';
			if (zmold != null) {
				if (zmold.receiveShadows == true) {
					zshadow = 'true';
				}
			}
			WTW.log(i + '==' + WTW.communitiesMolds[i].moldname + '=(shown)=' + WTW.communitiesMolds[i].shown + '=(shadows)=' + zshadow);		
		}
	}
}

WTWJS.prototype.listBuildingMolds = function() {
	/* list building molds */
	for (var i = 0; i < WTW.buildingMolds.length; i++) {
		if (WTW.buildingMolds[i] != null) {
			var zmold = WTW.getMeshOrNodeByID(WTW.buildingMolds[i].moldname);
			var zshadow = 'false';
			var zvisible = 'no';
			if (zmold != null) {
				zvisible = zmold.isVisible;
				if (zmold.receiveShadows == true) {
					zshadow = 'true';
				}
			} else {
				zvisible = 'null';
			}
			WTW.log(i + '==' + WTW.buildingMolds[i].moldname + '=(shown)=' + WTW.buildingMolds[i].shown + '=(visible)=' + zvisible + '=(shadows)=' + zshadow);
		}
	}
}

WTWJS.prototype.listThingMolds = function() {
	/* list thing molds */
	for (var i = 0; i < WTW.thingMolds.length; i++) {
		if (WTW.thingMolds[i] != null) {
			var zcolor = 'black';
			WTW.log(i + '==' + WTW.thingMolds[i].moldname + '=(shown)=' + WTW.thingMolds[i].shown + '=(parent)=' + WTW.thingMolds[i].parentname, zcolor);		
		}
	}
}

WTWJS.prototype.listAutomations = function() {
	/* list automations */
	var zcolor = 'black';
	for (var i = 0; i < WTW.automations.length; i++) {
		if (WTW.automations[i] != null) {
			zcolor = 'black';
			WTW.log(i + '==' + WTW.automations[i].moldname + '=(step.step)=' + WTW.automations[i].step.step + '=' + WTW.automations[i].running, zcolor);		
		}
	}
}

WTWJS.prototype.listUploads = function() {
	/* lis uploads */
	if (wtw_uploads != null) {
		for (var i = 0; i < wtw_uploads.length; i++) {
			if (wtw_uploads[i] != null && wtw_uploads[i] != undefined) {
				if (wtw_uploads[i].uploadinfo != undefined) {
					WTW.log(i + '==' + wtw_uploads[i].uploadid + '=(queue)=' + wtw_uploads[i].queue + '=(title)=' + wtw_uploads[i].uploadinfo.title);
				} else {
					WTW.log(i + '==' + wtw_uploads[i].uploadid + '=(queue)=' + wtw_uploads[i].queue + '=(title)=undefined');
				}
			}
		}
	}		
	WTW.log('----------------------');
	WTW.log('len=' + wtw_uploads.length);
	WTW.log('----------------------');
}

WTWJS.prototype.listMyAvatarLocation = function() {
	/* list myavatar location */
	if (WTW.myAvatar != null) {
		WTW.log('----------------------');
		WTW.log('Position:');
		WTW.log(' x=' + WTW.myAvatar.position.x);
		WTW.log(' y=' + WTW.myAvatar.position.y);
		WTW.log(' z=' + WTW.myAvatar.position.z);
		WTW.log('Rotation:');
		WTW.log(' x=' + WTW.getDegrees(WTW.myAvatar.rotation.x));
		WTW.log(' y=' + WTW.getDegrees(WTW.myAvatar.rotation.y));
		WTW.log(' z=' + WTW.getDegrees(WTW.myAvatar.rotation.z));
	}		
	WTW.log('----------------------');
}

WTWJS.prototype.listMeshes = function() {
	/* list all displayed meshes */
	try {
		var zcolor = 'gray';
		WTW.log('---loaded meshes--------count=' + scene.meshes.length + '------------------------------');
		for (var i=0; i < scene.meshes.length; i++) {
			if (scene.meshes[i] != null) {
				var zparentname = '';
				var zstatus = '';
				var zshown = '';
				var zmoldname = scene.meshes[i].name;
				var zvisible = scene.meshes[i].isVisible;
				var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
				if (zmoldname.toLowerCase().indexOf('connectinggrid') > -1) {
					zcolor = 'green';
					var zmold = WTW.getMeshOrNodeByID(zmoldname);
					if (zmold != null && zmold.parent != null) {
						zparentname = zmold.parent.name;
					}
					if (WTW.connectingGrids[zmoldnameparts.moldind] != null) {
						zstatus = WTW.connectingGrids[zmoldnameparts.moldind].status;
						zshown = WTW.connectingGrids[zmoldnameparts.moldind].shown;
					}
				} else if (zmoldname.toLowerCase().indexOf('actionzone') > -1) {
					zcolor = 'lightblue';
					var zmold = WTW.getMeshOrNodeByID(zmoldname);
					if (zmold != null && zmold.parent != null) {
						zparentname = zmold.parent.name;
					}
					if (WTW.actionZones[zmoldnameparts.moldind] != null) {
						zstatus = WTW.actionZones[zmoldnameparts.moldind].status;
						zshown = WTW.actionZones[zmoldnameparts.moldind].shown;
					}
				} else if (zmoldname.toLowerCase().indexOf('person') > -1) {
					zcolor = 'red';
					var zmold = WTW.getMeshOrNodeByID(zmoldname);
					if (zmold != null && zmold.parent != null) {
						zparentname = zmold.parent.name;
					}
				} else {
					zcolor = 'gray';
				}
				var zinmesh = 'NO';
				if (zmoldname.toLowerCase().indexOf('molds') > -1) {
					var zmold = WTW.getMeshOrNodeByID(zmoldname);
					if (zmold != null && WTW.myAvatar != null) {
						if (WTW.myAvatar.intersectsMesh(zmold, false)) {
							zinmesh = 'YES';
						}
						zparentname = zmold.parent.name;
					}
				}
				if (zcolor == 'red') {
					WTW.log(i + '==' + zmoldname + ' in=' + zinmesh + ' parent=' + zparentname + ' visible=' + zvisible, zcolor);
				} else {
					WTW.log(i + '==' + zmoldname + ' in=' + zinmesh + ' parent=' + zparentname + ' visible=' + zvisible + ' status=' + zstatus + ' shown=' + zshown, zcolor);
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-listMeshes=' + ex.message);
	}
}

WTWJS.prototype.listTransformNodes = function() {
	/* list all created transform nodes */
	try {
		var zcolor = 'gray';
		WTW.log('---loaded Transform Nodes--------count=' + scene.transformNodes.length + '------------------------------');
		for (var i=0; i < scene.transformNodes.length; i++) {
			if (scene.transformNodes[i] != null) {
				var zparentname = '';
				var zmoldname = scene.transformNodes[i].name;
				var zparentname = ''
				if (scene.transformNodes[i].parent != null) {
					zparentname = scene.transformNodes[i].parent.name;
				}
				WTW.log(i + '==' + zmoldname + ' parent=' + zparentname, zcolor);
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-listTransformNodes=' + ex.message);
	}
}

WTWJS.prototype.openCameraMenu = function() {
	/* open camera menu */
	try {
		WTW.hide('wtw_menusettings');
		WTW.openHUD();
		window.setTimeout(function(){
			WTW.hudMenuText('settings');
			/* look up menu item id for camera */
			var zrequest = {
				'menuset':'settings',
				'function':'gethudmenu'
			};
			WTW.postAsyncJSON('/core/handlers/hud.php', zrequest, 
				function(zresponse) {
					if (zresponse != null) {
						zresponse = JSON.parse(zresponse);
						for (var i=0;i<zresponse.length;i++) {
							if (zresponse[i] != null) {
								if (zresponse[i].menutext == 'Cameras') {
									WTW.hudClick('hud-menuitem-' + zresponse[i].menuitemid);
									i = zresponse.length;
								}
							}
						}
					}
				}
			);			
		},1000)
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud.js-openCameraMenu=' + ex.message);
	}
}

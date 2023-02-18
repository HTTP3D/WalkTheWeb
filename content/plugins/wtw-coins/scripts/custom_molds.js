/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

WTW_COINS.prototype.setNewMoldDefaults = function(zshape, zpositionx, zpositiony, zpositionz, zrotationy) {
	try {
		/* add each custom mold to this one function as a case - no need to add additional hooks */
		/* zshape is name of my custom mold - all lowercase and no spaces */
		switch (zshape) {
			case 'wtwcoinplatform':
			case 'wtwcoinrampplatform':
			case 'wtwcoinramplargeplatform':
				/* position x, y, x and zrotationy are calculated from the current camera position so it is in front of the camera */
				dGet('wtw_tmoldpositionx').value = zpositionx;
				dGet('wtw_tmoldpositiony').value = (Number(zpositiony) + 5).toFixed(2);
				dGet('wtw_tmoldpositionz').value = zpositionz;
				dGet('wtw_tmoldscalingx').value = '1.00';
				dGet('wtw_tmoldscalingy').value = '1.00';
				dGet('wtw_tmoldscalingz').value = '1.00';
				dGet('wtw_tmoldrotationx').value = '0.00';
				dGet('wtw_tmoldrotationy').value = (Number(zrotationy) - 90).toFixed(2);
				dGet('wtw_tmoldrotationz').value = '0.00';
				dGet('wtw_tmoldspecial2').value = '0.00';
				dGet('wtw_tmolduoffset').value = '0.00';
				dGet('wtw_tmoldvoffset').value = '0.00';
				dGet('wtw_tmolduscale').value = '0.00';
				dGet('wtw_tmoldvscale').value = '0.00';
				dGet('wtw_tmoldsubdivisions').value = '12';
				//WTW.setDDLValue('wtw_tmoldcovering', 'none');
				dGet('wtw_tmoldcovering').selectedIndex = -1;
				dGet('wtw_tmoldcoveringold').value = 'none';
				break;
			case 'wtwcoinbase':
			case 'wtwcoinbasedouble':
			case 'wtwcoinbasetripple':
			case 'wtwcoinbasequad':
			case 'wtwcoinlift':
				/* position x, y, x and zrotationy are calculated from the current camera position so it is in front of the camera */
				dGet('wtw_tmoldpositionx').value = zpositionx;
				dGet('wtw_tmoldpositiony').value = Number(zpositiony).toFixed(2);
				dGet('wtw_tmoldpositionz').value = zpositionz;
				dGet('wtw_tmoldscalingx').value = '1.00';
				dGet('wtw_tmoldscalingy').value = '1.00';
				dGet('wtw_tmoldscalingz').value = '1.00';
				dGet('wtw_tmoldrotationx').value = '0.00';
				dGet('wtw_tmoldrotationy').value = (Number(zrotationy) - 90).toFixed(2);
				dGet('wtw_tmoldrotationz').value = '0.00';
				dGet('wtw_tmoldspecial2').value = '0.00';
				dGet('wtw_tmolduoffset').value = '0.00';
				dGet('wtw_tmoldvoffset').value = '0.00';
				dGet('wtw_tmolduscale').value = '0.00';
				dGet('wtw_tmoldvscale').value = '0.00';
				dGet('wtw_tmoldsubdivisions').value = '12';
				//WTW.setDDLValue('wtw_tmoldcovering', 'none');
				dGet('wtw_tmoldcovering').selectedIndex = -1;
				dGet('wtw_tmoldcoveringold').value = 'none';
				break;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-coins:scripts-custom_molds.js-setNewMoldDefaults=' + ex.message);
	}
}

WTW_COINS.prototype.setMoldFormFields = function(zshape) {
	try {
		/* add each custom mold to this one function as a case - no need to add additional hooks */
		/* zshape is name of my custom mold - all lowercase and no spaces */
		switch (zshape) {
			case 'wtwcoinplatform':
			case 'wtwcoinrampplatform':
			case 'wtwcoinramplargeplatform':
				/* define the labels and button names used on the form */
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Platform';
				dGet('wtw_moldpositiontitle').innerHTML = 'Platform Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Platform Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Platform Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Platform Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Platform Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Platform';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Platform';
				/* show or hide the section divs on the form (/core/forms/mold.php) */
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.hide('wtw_moldmergemoldsdiv');
				WTW.show('wtw_moldshadowreflectiondiv');
				break;
			case 'wtwcoinbase':
			case 'wtwcoinbasedouble':
			case 'wtwcoinbasetripple':
			case 'wtwcoinbasequad':
				/* define the labels and button names used on the form */
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Base';
				dGet('wtw_moldpositiontitle').innerHTML = 'Base Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Base Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Base Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Base Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Base Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Base';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Base';
				/* show or hide the section divs on the form (/core/forms/mold.php) */
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.show('wtw_moldshadowreflectiondiv');
				WTW.hide('wtw_moldmergemoldsdiv');
				break;
			case 'wtwcoinlift':
				/* define the labels and button names used on the form */
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Lift';
				dGet('wtw_moldpositiontitle').innerHTML = 'Lift Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Lift Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Lift Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Lift Texture Image';
				dGet('wtw_moldbumptexturetitle').innerHTML = 'Lift Bump Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Lift';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Lift';
				/* show or hide the section divs on the form (/core/forms/mold.php) */
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_moldcolorsdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.hide('wtw_moldmergemoldsdiv');
				WTW.show('wtw_moldshadowreflectiondiv');
				break;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-coins:scripts-custom_molds.js-setMoldFormFields=' + ex.message);
	}
}

WTW_COINS.prototype.addMoldPlatform = function(zobjectfile, zmoldname, zmolddef, zlenx, zleny, zlenz) {
	/* creates a Babylon File based Mold - platform to walk on while collecting WTW Coins */
	let zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);

		var zobjectfolder = '/content/plugins/wtw-coins/assets/3dobjects/';
		BABYLON.SceneLoader.ImportMeshAsync('', zobjectfolder, zobjectfile, scene).then(
			function (zresults) {
				if (zresults.meshes != null) {
					/* add moldname to all of the child meshes - makes mesh cleanup easier */
					for (var i=0; i < zresults.meshes.length; i++) {
						if (zresults.meshes[i] != null) {
							/* add the base mold name to each of the child meshes */
							var zmeshname = zresults.meshes[i].name;
							var zchildmoldname = zmoldname + '-' + zmeshname;
							zchildmoldname = zchildmoldname.replace(' ','_').toLowerCase();
							zresults.meshes[i].id = zchildmoldname;
							zresults.meshes[i].name = zchildmoldname;
							/* make sure chile meshes are pickable */
							zresults.meshes[i].isPickable = true;
							WTW.registerMouseOver(zresults.meshes[i]);
							/* make sure all object meshes have a parent */
							if (zresults.meshes[i].parent == null) {
								zresults.meshes[i].parent = zmold;
							}
							if (WTW.shadows != null) {
								/* add mesh to world shadow map */
								WTW.shadows.getShadowMap().renderList.push(zresults.meshes[i]);
							}
							zresults.meshes[i].receiveShadows = true;
							if (zmold == null || zmold.parent == null) {
								/* if the parent has been deleted after this async process began (avoiding orphaned objects)*/
								zresults.meshes[i].dispose();
							}
						}
					}
				}
				zmold = WTW.getMeshOrNodeByID(zmoldname);
				if (zmold == null || zmold.parent == null) {
					/* if the parent has been deleted after this async process began (avoiding orphaned bjects) */
					WTW.disposeClean(zmoldname);
				}
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-coins:scripts-custom_molds.js-addMoldPlatform=' + ex.message);
	}
	return zmold;
}

WTW_COINS.prototype.addMoldPlatformLift = function(zobjectfile, zmoldname, zmolddef, zlenx, zleny, zlenz) {
	/* creates a Babylon File based Mold - platform to walk on while collecting WTW Coins */
	let zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);

		var zobjectanimations = [];
		var zobjectfolder = '/content/plugins/wtw-coins/assets/3dobjects/';
		/* get array of animation defs */
		BABYLON.SceneLoader.ImportMeshAsync('', zobjectfolder, zobjectfile, scene).then(
			function (zresults) {
				if (zresults.meshes != null) {

					zobjectanimations[0] = WTW.newObjectAnimation();
					zobjectanimations[0].animationname = 'liftonload';
					zobjectanimations[0].moldevent = 'onload';
					zobjectanimations[0].moldnamepart = '';
					zobjectanimations[0].startframe = 0;
					zobjectanimations[0].endframe = 400; //400
					zobjectanimations[0].animationloop = true;
					zobjectanimations[0].speedratio = 1.00;
					zobjectanimations[0].additionalscript = '';
					zobjectanimations[0].additionalparameters = '';

					/* add moldname to all of the child meshes - makes mesh cleanup easier */
					for (var i=0; i < zresults.meshes.length; i++) {
						if (zresults.meshes[i] != null) {
							/* add the base mold name to each of the child meshes */
							var zmeshname = zresults.meshes[i].name;
							var zchildmoldname = zmoldname + '-' + zmeshname;
							zchildmoldname = zchildmoldname.replace(' ','_').toLowerCase();
							zresults.meshes[i].id = zchildmoldname;
							zresults.meshes[i].name = zchildmoldname;
							/* make sure chile meshes are pickable */
							zresults.meshes[i].isPickable = true;
							WTW.registerMouseOver(zresults.meshes[i]);
							/* make sure all object meshes have a parent */
							if (zresults.meshes[i].parent == null) {
								zresults.meshes[i].parent = zmold;
							}
							if (WTW.shadows != null) {
								/* add mesh to world shadow map */
								WTW.shadows.getShadowMap().renderList.push(zresults.meshes[i]);
							}
							zresults.meshes[i].receiveShadows = true;
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
				if (zresults.skeletons != null)	{
					/* load any skeletons (most often avatars) */
					for (var i=0; i < zresults.skeletons.length; i++) {
						if (zresults.skeletons[i] != null) {
							var zbone = zresults.skeletons[i];
							var zmeshname = zresults.skeletons[i].name;
							zbone.isVisible = false;
							/* append zmoldname to all child skeleton names */
							var zchildmoldname = zmoldname + '-' + zmeshname;
							zresults.skeletons[i].name = zchildmoldname;
							/* WTW.registerMouseOver(zresults.skeletons[i]); */
							/* make sure all bones have a parent set */
							if (zresults.skeletons[i].parent == null) {
								zresults.skeletons[i].parent = zmold;
							}

							if (zresults.skeletons[i].bones != null) {
								/* the following boxes will be attached to various skeleton bones for parenting th ridealong */
								var zliftbone = -1;
								for (var j=0; j < zresults.skeletons[i].bones.length; j++) {
									if (zresults.skeletons[i].bones[j] != null) {
										var zbonename = zresults.skeletons[i].bones[j].name.toLowerCase();
										if (zbonename.indexOf('liftbone') > -1 && zliftbone == -1) {
											zliftbone = j;
										}
										if (j == 0) {
//											zresults.skeletons[i].bones[j].parent = zmold;
										} else {
											if (zresults.skeletons[i].bones[j].parent == null) {
												zresults.skeletons[i].bones[j].parent = zresults.skeletons[i].bones[0];
											}
										}
									}
								}
								if (zliftbone > -1) {
									/* headtop box parents to top of head */
									var zactionzoneid = WTW.getRandomString(16);
									var zactionzoneind = WTW.getNextCount(WTW.actionZones);
									WTW.actionZones[zactionzoneind] = WTW.newActionZone();
									WTW.actionZones[zactionzoneind].actionzoneid = zactionzoneid;
									WTW.actionZones[zactionzoneind].actionzoneind = zactionzoneind;
									WTW.actionZones[zactionzoneind].buildinginfo.buildingid = buildingid;
									WTW.actionZones[zactionzoneind].communityinfo.communityid = communityid;
									WTW.actionZones[zactionzoneind].thinginfo.thingid = thingid;
									WTW.actionZones[zactionzoneind].actionzonename = 'Lift Ride Along';
									WTW.actionZones[zactionzoneind].actionzonetype = 'ridealong';
									WTW.actionZones[zactionzoneind].actionzoneshape = 'box';
									WTW.actionZones[zactionzoneind].position.x = '-8';
									WTW.actionZones[zactionzoneind].position.y = '3';
									WTW.actionZones[zactionzoneind].position.z = '0';
									WTW.actionZones[zactionzoneind].scaling.x = '20';
									WTW.actionZones[zactionzoneind].scaling.y = '20';
									WTW.actionZones[zactionzoneind].scaling.z = '20';
									WTW.actionZones[zactionzoneind].rotation.x = '0';
									WTW.actionZones[zactionzoneind].rotation.y = '0';
									WTW.actionZones[zactionzoneind].rotation.z = '-90';
									WTW.actionZones[zactionzoneind].axis.rotatedirection = '1';
									WTW.actionZones[zactionzoneind].attachmoldid = '';
									WTW.actionZones[zactionzoneind].movementtype = '';
									WTW.actionZones[zactionzoneind].rotatespeed = '';
									WTW.actionZones[zactionzoneind].value1 = '0';
									WTW.actionZones[zactionzoneind].value2 = '0';
									WTW.actionZones[zactionzoneind].defaulteditform = '1';
									WTW.actionZones[zactionzoneind].movementdistance = '0';
									WTW.actionZones[zactionzoneind].jsfunction = '';
									WTW.actionZones[zactionzoneind].jsparameters = '';
									WTW.actionZones[zactionzoneind].loadactionzoneid = zmolddef.loadactionzoneid;
									WTW.actionZones[zactionzoneind].connectinggridid = zmolddef.connectinggridid;
									WTW.actionZones[zactionzoneind].connectinggridind = zmolddef.connectinggridind;
									WTW.actionZones[zactionzoneind].parentname = zmoldname;
									WTW.actionZones[zactionzoneind].moldname = 'local-actionzone-' + zactionzoneind + '-' + WTW.actionZones[zactionzoneind].actionzoneid + '-' + WTW.actionZones[zactionzoneind].connectinggridind + '-' + WTW.actionZones[zactionzoneind].connectinggridid + '-' + WTW.actionZones[zactionzoneind].actionzonetype;
									var zactionzone = WTW.addActionZone(WTW.actionZones[zactionzoneind].moldname, WTW.actionZones[zactionzoneind]);
									//zactionzone.parent = zmold;
									//WTW.showActionZone(zactionzoneind);
									
									var zactionzoneparent = BABYLON.MeshBuilder.CreateBox(WTW.actionZones[zactionzoneind].moldname + '-parenttest', {}, scene);
									zactionzoneparent.position = new BABYLON.Vector3(0,0,0);
									zactionzoneparent.scaling = new BABYLON.Vector3(1, 1, 1);
									zactionzoneparent.rotation = new BABYLON.Vector3(WTW.getRadians(0), WTW.getRadians(0), WTW.getRadians(0));
									zactionzoneparent.material = new BABYLON.StandardMaterial('mat' + WTW.actionZones[zactionzoneind].moldname + '-parent', scene);
									zactionzoneparent.material.alpha = .4;
									zactionzoneparent.isPickable = false;
									zactionzoneparent.checkCollisions = false;
									//zactionzoneparent.parent = zactionzone;
									zactionzoneparent.attachToBone(zresults.skeletons[i].bones[zliftbone], zresults.meshes[0]);
									
									zactionzone.attachToBone(zresults.skeletons[i].bones[zliftbone], zresults.meshes[0]);
								}
							}
							if (zmold == null || zmold.parent == null) {
								/* if the parent has been deleted after this async process began (avoiding orphaned bjects) */
								zresults.skeletons[i].dispose();
							}
						}
					}
				}
				zmold = WTW.getMeshOrNodeByID(zmoldname);
				if (zmold == null || zmold.parent == null) {
					/* if the parent has been deleted after this async process began (avoiding orphaned bjects) */
					WTW.disposeClean(zmoldname);
				}
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-coins:scripts-custom_molds.js-addMoldPlatformLift=' + ex.message);
	}
	return zmold;
}

WTW_COINS.prototype.openAdminCoinObjects = function() {
	/* open the WTW Coin Molds Form */
	try {
		WTW.hideAdminMenu();
		var zwebtype = 'community';
		if (buildingid != '') {
			zwebtype = 'building';
		} else if (thingid != '') {
			zwebtype = 'thing';
		}
		dGet('wtwcoins_moldsbuttonlist').innerHTML = '';
		
		
		dGet('wtwcoins_moldsbuttonlist').innerHTML += "<div id='wtw_badd" + zwebtype + "wtwcoin' name='wtw_badd" + zwebtype + "wtwcoin' onclick='wtwcoins.addNewCoin();' class='wtw-menulevel2'>WTW Coin</div>\r\n";
		
		dGet('wtwcoins_moldsbuttonlist').innerHTML += "<div id='wtw_badd" + zwebtype + "wtwcoinplatform' name='wtw_badd" + zwebtype + "wtwcoinplatform' onclick=\"WTW.openAddNewMold('" + zwebtype + "','wtwcoinplatform');\" class='wtw-menulevel2'>Floating Platform</div>\r\n";
		
		dGet('wtwcoins_moldsbuttonlist').innerHTML += "<div id='wtw_badd" + zwebtype + "wtwcoinrampplatform' name='wtw_badd" + zwebtype + "wtwcoinrampplatform' onclick=\"WTW.openAddNewMold('" + zwebtype + "','wtwcoinrampplatform');\" class='wtw-menulevel2'>Platform with Ramp</div>\r\n";
		
		dGet('wtwcoins_moldsbuttonlist').innerHTML += "<div id='wtw_badd" + zwebtype + "wtwcoinramplargeplatform' name='wtw_badd" + zwebtype + "wtwcoinramplargeplatform' onclick=\"WTW.openAddNewMold('" + zwebtype + "','wtwcoinramplargeplatform');\" class='wtw-menulevel2'>Large Platform with Ramp</div>\r\n";
		
		dGet('wtwcoins_moldsbuttonlist').innerHTML += "<div id='wtw_badd" + zwebtype + "wtwcoinbase' name='wtw_badd" + zwebtype + "wtwcoinbase' onclick=\"WTW.openAddNewMold('" + zwebtype + "','wtwcoinbase');\" class='wtw-menulevel2'>Platform Base</div>\r\n";

		dGet('wtwcoins_moldsbuttonlist').innerHTML += "<div id='wtw_badd" + zwebtype + "wtwcoinbasedouble' name='wtw_badd" + zwebtype + "wtwcoinbasedouble' onclick=\"WTW.openAddNewMold('" + zwebtype + "','wtwcoinbasedouble');\" class='wtw-menulevel2'>Platform Base - Double</div>\r\n";

		dGet('wtwcoins_moldsbuttonlist').innerHTML += "<div id='wtw_badd" + zwebtype + "wtwcoinbasetripple' name='wtw_badd" + zwebtype + "wtwcoinbasetripple' onclick=\"WTW.openAddNewMold('" + zwebtype + "','wtwcoinbasetripple');\" class='wtw-menulevel2'>Platform Base - Tripple</div>\r\n";

		dGet('wtwcoins_moldsbuttonlist').innerHTML += "<div id='wtw_badd" + zwebtype + "wtwcoinbasequad' name='wtw_badd" + zwebtype + "wtwcoinbasequad' onclick=\"WTW.openAddNewMold('" + zwebtype + "','wtwcoinbasequad');\" class='wtw-menulevel2'>Platform Base - Quad</div>\r\n";
		
		dGet('wtwcoins_moldsbuttonlist').innerHTML += "<div id='wtw_badd" + zwebtype + "wtwcoinlift' name='wtw_badd" + zwebtype + "wtwcoinlift' onclick=\"WTW.openAddNewMold('" + zwebtype + "','wtwcoinlift');\" class='wtw-menulevel2'>Elevator Lift - Quad</div>\r\n";
		
		WTW.show('wtwcoins_adminMoldObjectsDiv');
		
	} catch (ex) {
		WTW.log('plugins:wtw-coins:scripts-custom_molds.js-openAdminCoinObjects=' + ex.message);
	} 
}

WTW_COINS.prototype.closeAdminCoinObjects = function() {
	/* close the WTW Coin Molds Form */
	try {
		WTW.hideAdminMenu();
		WTW.hide('wtwcoins_adminMoldObjectsDiv');
		WTW.backToEdit();
	} catch (ex) {
		WTW.log('plugins:wtw-coins:scripts-custom_molds.js-closeAdminCoinObjects=' + ex.message);
	} 
}

WTW_COINS.prototype.disposeClean = function(zmoldname) {
	/* dispose WTW Coin Molds */
	try {
		if (zmoldname.indexOf('wtwcoin') > -1) {
			WTW.disposeMoldEvent(zmoldname);
			for (var i = 0; i < scene.meshes.length;i++) {
				/* check for child parts of the 3D Model that are still in the 3D Scene and delete them */
				if (scene.meshes[i].name.indexOf(zmoldname) > -1) {
					scene.meshes[i].dispose();
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-coins:scripts-custom_molds.js-disposeClean=' + ex.message);
	} 
}

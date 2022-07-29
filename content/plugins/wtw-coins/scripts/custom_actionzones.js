WTW_COINS.prototype.addActionZoneMyCustomZone = function(zactionzonename, zactionzoneind, zactionzonedef) {
	let zactionzone;
	try {
		/* each custom Action Zone will have a separate function */
		/* example is a Load Zone (but not built from queue) */
		zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
		if (zactionzone == null) {
			/* WTW.newMold() provides a basic shape definition object */
			let zmolddef = WTW.newMold();
			/* Shape, Position, Scaling, Rotation, and Parent Name are passed to the object on creation */
			zmolddef.shape = zactionzonedef.actionzoneshape;
			zmolddef.covering = "hidden";
			zmolddef.scaling.x = zactionzonedef.scaling.x;
			zmolddef.scaling.y = zactionzonedef.scaling.y;
			zmolddef.scaling.z = zactionzonedef.scaling.z;
			zmolddef.subdivisions = 12;
			zmolddef.opacity = 0;
			zmolddef.parentname = zactionzonedef.parentname;
			zmolddef.actionzoneind = zactionzoneind;
			zmolddef.checkcollisions = "0";
			zmolddef.ispickable = "0";
			/* create the action zone using the mold definition above */
			zactionzone = WTW.addMold(zactionzonename, zmolddef, zmolddef.parentname, zmolddef.covering);
			zactionzone.rotation.x = WTW.getRadians(zactionzonedef.rotation.x);
			zactionzone.rotation.y = WTW.getRadians(zactionzonedef.rotation.y);
			zactionzone.rotation.z = WTW.getRadians(zactionzonedef.rotation.z);
			zactionzone.isPickable = false;
			zactionzone.checkCollisions = false;
			zactionzone.position.x = zactionzonedef.position.x;
			zactionzone.position.y = zactionzonedef.position.y;
			zactionzone.position.z = zactionzonedef.position.z;
		}
		/* shown = "2" will keep it from adding a duplicate object while it is in the queue */
		WTW.actionZones[zactionzoneind].shown = "2";
		
		
		/* everything you create in this function should be parented to the above or using the basic Action Zones */
		/* yourobject.parent = zactionzone;
		/* so that your 3D Objects position, scaling, and rotatation work as child objects */
		/* if needed you can replace the zactionzone directly with your 3D Object. */
		/* examples of existing 3D Objects can be found at /core/scripts/actionzones/wtw_basicactionzones.js */
		/* you can use one of the Action Zones as a base and build off it as needed */
		/* names of your child objects and materials should be: */
		/* zactionzonename + "-DEVIDpartname" */
		/* where partname is whatever you want it to be. */


	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-custom_actionzones.js-addActionZoneMyCustomZone=" + ex.message);
	}
	return zactionzone;
}

WTW_COINS.prototype.setNewActionZoneDefaults = function(zactionzonetype) {
	try {
		/* add each custom action zone to this one function as a case - no need to add additional hooks */
		/* zactionzonetype is name of 'My Custom Zone' - all lowercase and no spaces */
		switch (zactionzonetype) {
/*			case "mycustomzone":
				dGet('wtw_tactionzonename').value = "New My Custom Zone";
				break;
*/		}
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-custom_actionzones.js-setNewActionZoneDefaults=" + ex.message);
	}
}
		
WTW_COINS.prototype.setActionZoneFormFields = function(zactionzonetype) {
	try {
		/* add each custom action zone to this one function as a case - no need to add additional hooks */
		/* zactionzonetype is name of my custom action zone - all lowercase and no spaces */
		switch (zactionzonetype) {
/*			case "mycustomzone":
				/ * define the labels and button names used on the form * /
				dGet('wtw_editactionzoneformtitle').innerHTML = "Add My Custom Zone";
				dGet('wtw_tcopyaxletoactionzone').disabled = true;
				/ * show or hide the section divs on the form (/core/forms/actionzone.php) * /
				WTW.hide('wtw_actionzoneaxisdiv');
				WTW.hide('wtw_copyaxletoactionzonediv');
				WTW.hide('wtw_actionzoneadvancedoptslink');
				WTW.hide('wtw_actionzonepartsdiv');
				WTW.show('wtw_actionzoneadvancedopts');
				break;
*/		}
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-custom_actionzones.js-setActionZoneFormFields=" + ex.message);
	}
}

WTW_COINS.prototype.addNewCoin = function() {
	/* add a coin action zone to the 3D Web and open the Edit Coin Form */
	try {
		WTW.hideAdminMenu();
		WTW.hide('wtwcoins_bdelcoin');
		wtwcoins.loadActionZones();
		wtwcoins.loadCoinValues();
		var zwebtype = "building";
		if (communityid != "") {
			zwebtype = "community";
		} else if (thingid != "") {
			zwebtype = "thing";
		}
		dGet('wtw_tmoldshape').value = "box";
		dGet('wtw_tmoldwebtype').value = zwebtype;
		
		var zcoords = WTW.getNewCoordinates(25);
		dGet('wtwcoins_tactionzonecoinx').value = Number(zcoords.positionX).toFixed(2);
		dGet('wtwcoins_tactionzonecoiny').value = (Number(zcoords.positionY) + 6).toFixed(2);
		dGet('wtwcoins_tactionzonecoinz').value = Number(zcoords.positionZ).toFixed(2);
		
		var zdefaultloadactionzoneid = WTW.getLoadActionZoneID("High");
		var zactionzoneid = WTW.getRandomString(16);
		var zactionzoneind = WTW.getNextCount(WTW.actionZones);
		dGet('wtw_tactionzoneid').value = zactionzoneid;
		dGet('wtw_tactionzoneind').value = zactionzoneind;
		dGet('wtw_tactionzonetype').value = 'wtwcoin';
		dGet('wtw_tactionzonename').value = 'WTW Coin';
		dGet('wtw_tactionzoneshape').value = 'box';
		dGet('wtw_tactionzonescalingx').value = '5.00';
		dGet('wtw_tactionzonescalingy').value = '12.00';
		dGet('wtw_tactionzonescalingz').value = '5.00';
		dGet('wtw_tactionzonerotationdirection').value = '1';
		dGet('wtwcoins_rotationdirection').checked = false;
		
		/* value1 is tokens for the coin */
		dGet('wtw_tactionzonevalue1').value = '1'; 
		/* value2 = 0 for unsaved action zone, 1 for saved - helps with cancel */
		dGet('wtw_tactionzonevalue2').value = '0'; 
		/* default edit form set to 1 (custom) keeps it off the lists for other action zones */
		dGet('wtw_tactionzonedefaulteditform').value = '1';
		
		WTW.actionZones[zactionzoneind] = WTW.newActionZone();
		WTW.actionZones[zactionzoneind].actionzoneid = zactionzoneid;
		WTW.actionZones[zactionzoneind].actionzoneind = zactionzoneind;
		WTW.actionZones[zactionzoneind].buildinginfo.buildingid = buildingid;
		WTW.actionZones[zactionzoneind].communityinfo.communityid = communityid;
		WTW.actionZones[zactionzoneind].thinginfo.thingid = thingid;
		WTW.actionZones[zactionzoneind].actionzonename = dGet('wtw_tactionzonename').value;
		WTW.actionZones[zactionzoneind].actionzonetype = dGet('wtw_tactionzonetype').value;
		WTW.actionZones[zactionzoneind].actionzoneshape = dGet('wtw_tactionzoneshape').value;
		WTW.actionZones[zactionzoneind].position.x = dGet('wtwcoins_tactionzonecoinx').value;
		WTW.actionZones[zactionzoneind].position.y = dGet('wtwcoins_tactionzonecoiny').value;
		WTW.actionZones[zactionzoneind].position.z = dGet('wtwcoins_tactionzonecoinz').value;
		WTW.actionZones[zactionzoneind].scaling.x = dGet('wtw_tactionzonescalingx').value;
		WTW.actionZones[zactionzoneind].scaling.y = dGet('wtw_tactionzonescalingy').value;
		WTW.actionZones[zactionzoneind].scaling.z = dGet('wtw_tactionzonescalingz').value;
		WTW.actionZones[zactionzoneind].axis.rotatedirection = dGet('wtw_tactionzonerotationdirection').value;
		WTW.actionZones[zactionzoneind].value1 = dGet('wtw_tactionzonevalue1').value;
		WTW.actionZones[zactionzoneind].value2 = dGet('wtw_tactionzonevalue2').value;
		WTW.actionZones[zactionzoneind].defaulteditform = dGet('wtw_tactionzonedefaulteditform').value;
		WTW.actionZones[zactionzoneind].loadactionzoneid = zdefaultloadactionzoneid;
		WTW.actionZones[zactionzoneind].connectinggridid = dGet("wtw_tconnectinggridid").value;
		WTW.actionZones[zactionzoneind].connectinggridind = dGet("wtw_tconnectinggridind").value;
		WTW.actionZones[zactionzoneind].parentname = WTW.getParentName(WTW.actionZones[zactionzoneind].connectinggridind);
		WTW.actionZones[zactionzoneind].moldname = "actionzone-" + zactionzoneind + "-" + WTW.actionZones[zactionzoneind].actionzoneid + "-" + WTW.actionZones[zactionzoneind].connectinggridind + "-" + WTW.actionZones[zactionzoneind].connectinggridid + "-" + WTW.actionZones[zactionzoneind].actionzonetype;
		WTW.addActionZone(WTW.actionZones[zactionzoneind].moldname, WTW.actionZones[zactionzoneind]);
		WTW.showActionZone(zactionzoneind);
		WTW.show('wtwcoins_editcoindiv');
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-custom_actionzones.js-addNewCoin=" + ex.message);
	}
}

WTW_COINS.prototype.changeRotateDirection = function() {
	/* reverse the direction of the coin rotation */
	try {
		if (WTW.isNumeric(dGet('wtw_tactionzoneind').value)) {
			if (WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)] != null) {
				var zdir = Math.round(Number(WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].axis.rotatedirection));
				if (zdir > 0) {
					WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].axis.rotatedirection = '-1';
				} else {
					WTW.actionZones[Number(dGet('wtw_tactionzoneind').value)].axis.rotatedirection = '1';
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-custom_actionzones.js-changeRotateDirection=" + ex.message);
	}
}


WTW_COINS.prototype.editCoin = function(zactionzonename) {
	/* add a coin action zone to the 3D Web and open the Edit Coin Form */
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zactionzonename);
		WTW.hideAdminMenu();
		WTW.showInline('wtwcoins_bdelcoin');
		wtwcoins.loadActionZones();
		wtwcoins.loadCoinValues();
		var zwebtype = "building";
		if (communityid != "") {
			zwebtype = "community";
		} else if (thingid != "") {
			zwebtype = "thing";
		}
		dGet('wtw_tmoldshape').value = "box";
		dGet('wtw_tmoldwebtype').value = zwebtype;
		
		var zcoords = WTW.getNewCoordinates(25);
		dGet('wtwcoins_tactionzonecoinx').value = Number(zcoords.positionX).toFixed(2);
		dGet('wtwcoins_tactionzonecoiny').value = (Number(zcoords.positionY) + 6).toFixed(2);
		dGet('wtwcoins_tactionzonecoinz').value = Number(zcoords.positionZ).toFixed(2);
		
		var zdefaultloadactionzoneid = WTW.getLoadActionZoneID("High");
		var zactionzoneid = zmoldnameparts.moldid;
		var zactionzoneind = zmoldnameparts.moldind;
		dGet('wtw_tactionzoneid').value = zactionzoneid;
		dGet('wtw_tactionzoneind').value = zactionzoneind;
		dGet('wtw_tactionzonetype').value = 'wtwcoin';
		dGet('wtw_tactionzonename').value = 'WTW Coin';
		dGet('wtw_tactionzoneshape').value = 'box';
		
		if (WTW.actionZones[zactionzoneind] != null) {
			dGet('wtwcoins_tactionzonecoinx').value = WTW.actionZones[zactionzoneind].position.x;
			dGet('wtwcoins_tactionzonecoiny').value = WTW.actionZones[zactionzoneind].position.y;
			dGet('wtwcoins_tactionzonecoinz').value = WTW.actionZones[zactionzoneind].position.z;
			dGet('wtw_tactionzonescalingx').value = WTW.actionZones[zactionzoneind].scaling.x;
			dGet('wtw_tactionzonescalingy').value = WTW.actionZones[zactionzoneind].scaling.y;
			dGet('wtw_tactionzonescalingz').value = WTW.actionZones[zactionzoneind].scaling.z;
			dGet('wtw_tactionzonerotationdirection').value = Math.round(WTW.actionZones[zactionzoneind].axis.rotatedirection);
			if (Number(dGet('wtw_tactionzonerotationdirection').value) > 0) {
				dGet('wtwcoins_rotationdirection').checked = false;
			} else {
				dGet('wtwcoins_rotationdirection').checked = true;
			}
			
			/* value1 is tokens for the coin */
			dGet('wtw_tactionzonevalue1').value = Math.round(WTW.actionZones[zactionzoneind].value1);
			/* value2 = 0 for unsaved action zone, 1 for saved - helps with cancel */
			dGet('wtw_tactionzonevalue2').value = Math.round(WTW.actionZones[zactionzoneind].value2);
			/* default edit form set to 1 (custom) keeps it off the lists for other action zones */
			dGet('wtw_tactionzonedefaulteditform').value = WTW.actionZones[zactionzoneind].defaulteditform;
			WTW.setDDLValue('wtwcoins_tloadactionzoneid', WTW.actionZones[zactionzoneind].loadactionzoneid);
			dGet("wtw_tconnectinggridid").value = WTW.actionZones[zactionzoneind].connectinggridid;
			dGet("wtw_tconnectinggridind").value = WTW.actionZones[zactionzoneind].connectinggridind;
			WTW.setDDLValue('wtwcoins_tvalue1', dGet('wtw_tactionzonevalue1').value);
		}
		WTW.showActionZone(zactionzoneind);
		WTW.show('wtwcoins_editcoindiv');
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-custom_actionzones.js-editCoin=" + ex.message);
	}
}

WTW_COINS.prototype.addActionZoneCoin = function(zactionzonename, zactionzoneind, zactionzonedef) {
	/* add a coin to the Action Zone center */
	let zactionzone;
	try {
		zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
		if (zactionzone == null) {
			var zvalue1 = '1';
			if (zactionzonedef.value1 != undefined) {
				zvalue1 = zactionzonedef.value1;
			}
			
			/* WTW.newMold() provides a basic shape definition object */
			let zmolddef = WTW.newMold();
			/* Shape, Position, Scaling, Rotation, and Parent Name are passed to the object on creation */
			zmolddef.shape = zactionzonedef.actionzoneshape;
			zmolddef.covering = "hidden";
			zmolddef.scaling.x = zactionzonedef.scaling.x;
			zmolddef.scaling.y = zactionzonedef.scaling.y;
			zmolddef.scaling.z = zactionzonedef.scaling.z;
			zmolddef.subdivisions = 12;
			zmolddef.opacity = 0;
			zmolddef.parentname = zactionzonedef.parentname;
			zmolddef.actionzoneind = zactionzoneind;
			zmolddef.checkcollisions = "0";
			zmolddef.ispickable = "0";
			/* create the action zone using the mold definition above */
			zactionzone = WTW.addMold(zactionzonename, zmolddef, zmolddef.parentname, zmolddef.covering);
			zactionzone.rotation.x = WTW.getRadians(zactionzonedef.rotation.x);
			zactionzone.rotation.y = WTW.getRadians(WTW.randomBetween(0,360));
			zactionzone.rotation.z = WTW.getRadians(zactionzonedef.rotation.z);
			zactionzone.isPickable = false;
			zactionzone.checkCollisions = false;
			zactionzone.position.x = zactionzonedef.position.x;
			zactionzone.position.y = zactionzonedef.position.y;
			zactionzone.position.z = zactionzonedef.position.z;

			if (wtwcoins.coinRotation == null) {
				wtwcoins.coinRotation = window.setInterval(function() {
					if (WTW.actionZones.length > 0) {
						var zfound = false;
						for (var i=0;i < WTW.actionZones.length;i++) {
							if (WTW.actionZones[i] != null) {
								if (WTW.actionZones[i].actionzonetype == 'wtwcoin') {
									var zactionzone = WTW.getMeshOrNodeByID(WTW.actionZones[i].moldname);
									if (zactionzone != null) {
										var zrotation = WTW.getDegrees(zactionzone.rotation.y);

										if (Number(WTW.actionZones[i].axis.rotatedirection) > 0) {
											var zdegrees = zrotation + 3;
											if (zdegrees > 360) {
												zdegrees -= 360;
											}
										} else {
											var zdegrees = zrotation - 3;
											if (zdegrees < 0) {
												zdegrees += 360;
											}
										}
										zactionzone.rotation.y = WTW.getRadians(zdegrees);
										zfound = true;
									}
								}
							}
						}
						if (zfound == false) {
							window.clearInterval(wtwcoins.coinRotation);
							wtwcoins.coinRotation = null;
						}
					} else {
						window.clearInterval(wtwcoins.coinRotation);
						wtwcoins.coinRotation = null;
					}
				},50);
			}
			wtwcoins.loadPastCoinTotals();
			wtwcoins.loadCoin(zactionzonename, zvalue1, zactionzonedef.scaling.x, zactionzonedef.scaling.y, zactionzonedef.scaling.z, zactionzonedef);
			WTW.actionZones[zactionzoneind].status = 2;
		}
		/* shown = "2" will keep it from adding a duplicate object while it is in the queue */
		WTW.actionZones[zactionzoneind].shown = "2";
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-custom_actionzones.js-addActionZoneCoin=" + ex.message);
	}
	return zactionzone;
}

WTW_COINS.prototype.loadCoin = async function(zactionzonename, zvalue1, zscalingx, zscalingy, zscalingz, zghost, zactionzonedef) {
	/* load the coin to the action zone */
	try {
		if (zghost == undefined) {
			zghost = '';
		}
		
		/* check for previous coin and remove it if exists */
		var zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
		if (zactionzone != null) {
			var zcoinparts = zactionzone.getChildren();
			for (var i=0;i < zcoinparts.length;i++) {
				zcoinparts[i].dispose();
			}
		}

		if (zvalue1 > 0) {
			/* add coin using babylon file */
			var zfolder = '/content/plugins/wtw-coins/assets/3dobjects/';
			var zfile = 'wtwcoin-' + Math.round(zvalue1) + zghost + '.babylon';
			BABYLON.SceneLoader.ImportMeshAsync("", zfolder, zfile, scene).then(
				function (zresults) {
					if (zresults.meshes != null) {
						zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
						if (zactionzone != null) {
							for (var i=0; i < zresults.meshes.length; i++) {
								if (zresults.meshes[i] != null) {
									var zmeshname = zresults.meshes[i].name;
									var zchildmoldname = zactionzonename + "-" + zmeshname;
									zresults.meshes[i].name = zchildmoldname;
									WTW.registerMouseOver(zresults.meshes[i]);
									zresults.meshes[i].parent = zactionzone;
									zresults.meshes[i].scaling.x = 1 / zscalingx;
									zresults.meshes[i].scaling.y = 1 / zscalingy;
									zresults.meshes[i].scaling.z = 1 / zscalingz;
									zresults.meshes[i].position.y = 1 / zscalingy * 3;
								}
							}
						}
					}
					/* check to see if the mold still exists since the time it was requested */
					zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
					if (zactionzone == null) {
						WTW.disposeClean(zactionzonename);
					} else if (zghost == '') {
						wtwcoins.checkCoin(zactionzonename);
					}
				}
			);
		}
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-custom_actionzones.js-loadCoin=" + ex.message);
	}
}

WTW_COINS.prototype.checkCoin = async function(zactionzonename) {
	/* check if the coin was previously collected */
	try {
		/* only check if not in admin mode editing this coin */
		var zcheckactionzoneid = '';
		if (dGet('wtw_tactionzoneid') != null) {
			zcheckactionzoneid = dGet('wtw_tactionzoneid').value;
		}
		var zmoldnameparts = WTW.getMoldnameParts(zactionzonename);
		var zactionzoneind = zmoldnameparts.moldind;
		if (zcheckactionzoneid != zmoldnameparts.actionzoneid || zcheckactionzoneid == '') {
			/* only check collectible coins */
			if (WTW.actionZones[zactionzoneind].status == 2) {
				/* check coin */
				var zrequest = {
					'actionzoneid': zmoldnameparts.actionzoneid,
					'webid': zmoldnameparts.webid,
					'userid': dGet('wtw_tuserid').value,
					'function':'checkcoin'
				};
				WTW.postAsyncJSON("/core/handlers/wtw-coins-collected.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						if (zresponse.wtwcoinid != undefined) {
							if (zresponse.wtwcoinid != '') {
								WTW.actionZones[zactionzoneind].status = 5;
								if (dGet('wtwcoins_showghostcoins').checked) {
									wtwcoins.loadCoin(zactionzonename, WTW.actionZones[zactionzoneind].value1, WTW.actionZones[zactionzoneind].scaling.x, WTW.actionZones[zactionzoneind].scaling.y, WTW.actionZones[zactionzoneind].scaling.z, '-ghost', WTW.actionZones[zactionzoneind]);
								} else {
									wtwcoins.removeCoin(zactionzonename, zactionzoneind);
								}
							}
						}
					}
				);
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-custom_actionzones.js-checkCoin=" + ex.message);
	}
}

WTW_COINS.prototype.loadPastCoinTotals = async function() {
	/* on the first loaded coin, get the previous coins total */
	try {
		/* see if the coins total display is created */
		if (dGet('wtwcoins_display') == null) {
			var zplayerstats = dGet('wtw_playerstats');
			var zdiv = document.createElement("div");
			zdiv.id = 'wtwcoins_display';
			zdiv.className = 'wtwcoins-display';
			var zglobal = document.createElement("img");
			zglobal.id = 'wtwcoins_global';
			zglobal.className = 'wtwcoins-global';
			zglobal.src = '/content/system/images/global.png';
			zdiv.appendChild(zglobal);
			var zlabel = document.createElement("div");
			zlabel.id = 'wtwcoins_displaytext';
			zlabel.className = 'wtwcoins-displaylabel';
			zlabel.innerHTML = 'WTW Coins: ';
			zdiv.appendChild(zlabel);
			var zvalue = document.createElement("div");
			zvalue.id = 'wtwcoins_counter';
			zvalue.className = 'wtwcoins-displayvalue';
			zvalue.innerHTML = '0';
			zdiv.appendChild(zvalue);
			zplayerstats.appendChild(zdiv);

			/* get the past total */
			var zrequest = {
				'userid': dGet('wtw_tuserid').value,
				'function':'getcointotals'
			};
			WTW.postAsyncJSON("/core/handlers/wtw-coins-collected.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					if (zresponse.totalcoins != undefined) {
						if (WTW.isNumeric(zresponse.totalcoins)) {
							if (Number(zresponse.totalcoins) > 0) {
								/* set the total and show the display if it is greater than zero */
								dGet('wtwcoins_counter').innerHTML = WTW.formatNumber(zresponse.totalcoins,0);
								WTW.show('wtwcoins_display');
								WTW.show('wtw_playerstats');
							}
						}
					}
					
					/* if user is logged in as global account, get the global WTW Coin totals */
					if (dGet('wtw_tglobaluserid').value != '') {
						var zrequest = {
							'serverinstanceid':dGet('wtw_serverinstanceid').value,
							'globaluserid': btoa(dGet('wtw_tglobaluserid').value),
							'userid': dGet('wtw_tuserid').value,
							'usertoken': dGet('wtw_tusertoken').value,
							'function':'getcointotals'
						};
						WTW.postAsyncJSON("https://3dnet.walktheweb.com/connect/wtwcoins.php", zrequest, 
							function(zresponse) {
								zresponse = JSON.parse(zresponse);
								if (zresponse.totalcoins != undefined) {
									if (WTW.isNumeric(zresponse.totalcoins)) {
										if (Number(zresponse.totalcoins) > 0) {
											/* set the total and show the display if it is greater than zero */
											dGet('wtwcoins_counter').innerHTML = WTW.formatNumber(zresponse.totalcoins,0);
											WTW.showInline('wtwcoins_global');
											WTW.show('wtwcoins_display');
											WTW.show('wtw_playerstats');
										}
									}
								}
							}
						);
					}
				}
			);
		}
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-custom_actionzones.js-loadPastCoinTotals=" + ex.message);
	}
}


WTW_COINS.prototype.submitCoinForm = async function(w) {
	try {
		/* add a coin action zone to the 3D Web and open the Edit Coin Form */
		var zactionzoneid = dGet('wtw_tactionzoneid').value;
		var zactionzoneind = Number(dGet('wtw_tactionzoneind').value);
		var zactionzonename = "actionzone-" + zactionzoneind + "-" + WTW.actionZones[zactionzoneind].actionzoneid + "-" + WTW.actionZones[zactionzoneind].connectinggridind + "-" + WTW.actionZones[zactionzoneind].connectinggridid + "-wtwcoin";
		var zscalingx = dGet('wtw_tactionzonescalingx').value;
		var zscalingy = dGet('wtw_tactionzonescalingy').value;
		var zscalingz = dGet('wtw_tactionzonescalingz').value;
		var zloadactionzoneid = WTW.getDDLValue('wtwcoins_tloadactionzoneid');

		WTW.hideActionZone(zactionzoneind);
		switch (w) {
			case 1: /* save coin */
				if (WTW.actionZones[zactionzoneind] != null) {
					dGet('wtw_tactionzonerotationdirection').value = WTW.actionZones[zactionzoneind].axis.rotatedirection;
					WTW.actionZones[zactionzoneind].actionzoneid = dGet('wtw_tactionzoneid').value;
					WTW.actionZones[zactionzoneind].thinginfo.thingid = thingid;
					WTW.actionZones[zactionzoneind].buildinginfo.buildingid = buildingid;
					WTW.actionZones[zactionzoneind].communityinfo.communityid = communityid;
					WTW.actionZones[zactionzoneind].actionzonename = dGet('wtw_tactionzonename').value;
					WTW.actionZones[zactionzoneind].actionzonetype = dGet('wtw_tactionzonetype').value;
					WTW.actionZones[zactionzoneind].actionzoneshape = dGet('wtw_tactionzoneshape').value;
					WTW.actionZones[zactionzoneind].value1 = dGet('wtw_tactionzonevalue1').value;
					WTW.actionZones[zactionzoneind].value2 = dGet('wtw_tactionzonevalue2').value;
					WTW.actionZones[zactionzoneind].defaulteditform = dGet('wtw_tactionzonedefaulteditform').value;
					WTW.actionZones[zactionzoneind].position.x = dGet('wtwcoins_tactionzonecoinx').value;
					WTW.actionZones[zactionzoneind].position.y = dGet('wtwcoins_tactionzonecoiny').value;
					WTW.actionZones[zactionzoneind].position.z = dGet('wtwcoins_tactionzonecoinz').value;
					WTW.actionZones[zactionzoneind].scaling.x = zscalingx;
					WTW.actionZones[zactionzoneind].scaling.y = zscalingy;
					WTW.actionZones[zactionzoneind].scaling.z = zscalingz;
					WTW.actionZones[zactionzoneind].loadactionzoneid = zloadactionzoneid;
				}
				
				/* save to the database */
				var zrequest = {
					'actionzoneid': dGet('wtw_tactionzoneid').value,
					'communityid': communityid,
					'buildingid': buildingid,
					'thingid': thingid,
					'actionzonename':'WTW Coin',
					'actionzonetype':'wtwcoin',
					'actionzoneshape':'box',
					'attachmoldid':'',
					'movementtype':'',
					'rotatespeed':'1',
					'value1':dGet('wtw_tactionzonevalue1').value,
					'value2':'1',
					'defaulteditform':dGet('wtw_tactionzonedefaulteditform').value,
					'positionx':dGet('wtwcoins_tactionzonecoinx').value,
					'positiony':dGet('wtwcoins_tactionzonecoiny').value,
					'positionz':dGet('wtwcoins_tactionzonecoinz').value,
					'scalingx':dGet('wtw_tactionzonescalingx').value,
					'scalingy':dGet('wtw_tactionzonescalingy').value,
					'scalingz':dGet('wtw_tactionzonescalingz').value,
					'rotationx':'0',
					'rotationy':'0',
					'rotationz':'0',
					'axispositionx':'0',
					'axispositiony':'0',
					'axispositionz':'0',
					'axisscalingx':'1',
					'axisscalingy':'1',
					'axisscalingz':'1',
					'axisrotationx':'0',
					'axisrotationy':'0',
					'axisrotationz':'0',
					'rotateaxis':'',
					'rotatedegrees':'0',
					'rotatedirection':dGet('wtw_tactionzonerotationdirection').value,
					'loadactionzoneid':zloadactionzoneid,
					'jsfunction':'',
					'jsparameters':'',
					'function':'saveactionzone'
				};
				WTW.postAsyncJSON("/core/handlers/actionzones.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
					}
				);
				break;
			case 0: /* delete coin */
				WTW.actionZones[zactionzoneind] = null;
				WTW.disposeClean(zactionzonename);
				var zrequest = {
					'actionzoneid': zactionzoneid,
					'communityid': communityid,
					'buildingid': buildingid,
					'thingid': thingid,
					'function':'deleteactionzone'
				};
				WTW.postAsyncJSON("/core/handlers/actionzones.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
					}
				);
				break;
			case -1: /* cancel */
				if (WTW.actionZones[zactionzoneind].value2 == '0') {
					WTW.actionZones[zactionzoneind] = null;
					WTW.disposeClean(zactionzonename);
				} else {
					var zvalue1 = WTW.actionZones[zactionzoneind].value1;
					WTW.actionZones[zactionzoneind].axis.rotatedirection = dGet('wtw_tactionzonerotationdirection').value;
					dGet('wtwcoins_tactionzonecoinx').value = WTW.actionZones[zactionzoneind].position.x;
					dGet('wtwcoins_tactionzonecoiny').value = WTW.actionZones[zactionzoneind].position.y;
					dGet('wtwcoins_tactionzonecoinz').value = WTW.actionZones[zactionzoneind].position.z;
					dGet('wtw_tactionzonerotationdirection').value = WTW.actionZones[zactionzoneind].axis.rotatedirection;
					
					if (dGet('wtw_tactionzonevalue1').value != zvalue1) {
						wtwcoins.loadCoin(zactionzonename, zvalue1, zscalingx, zscalingy, zscalingz, WTW.actionZones[zactionzoneind]);
						dGet('wtw_tactionzonevalue1').value = zvalue1;
					}
					wtwcoins.setNewCoin();
				}
				break;
		}
		dGet('wtw_tactionzoneid').value = '';
		dGet('wtw_tactionzoneind').value = '-1';

		WTW.hideAdminMenu();
		WTW.hide('wtwcoins_editcoindiv');
		WTW.backToEdit();
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-custom_actionzones.js-submitCoinForm=" + ex.message);
	}
}

WTW_COINS.prototype.loadActionZones = function() {
	/* load action zones allow a coin to be added to a 3D Community, 3D Building, or 3D Thing */
	/* this function creates the drop down list of load zones for that use */
	try {
		if (dGet('wtwcoins_tloadactionzoneid') != null) {
			WTW.clearDDL('wtwcoins_tloadactionzoneid');
			if (WTW.actionZones != null) {
				for (var i = 0; i < WTW.actionZones.length; i++) {
					if (WTW.actionZones[i] != null) {
						var zthingid = "";
						var zbuildingid = "";
						var zcommunityid = "";
						if (WTW.actionZones[i].thinginfo.thingid != undefined) {
							zthingid = WTW.actionZones[i].thinginfo.thingid;
						}
						if (WTW.actionZones[i].buildinginfo.buildingid != undefined) {
							zbuildingid = WTW.actionZones[i].buildinginfo.buildingid;
						}
						if (WTW.actionZones[i].communityinfo.communityid != undefined) {
							zcommunityid = WTW.actionZones[i].communityinfo.communityid;
						}
						if ((WTW.actionZones[i].actionzonetype == "loadzone") && ((zcommunityid == communityid && communityid != "") || (zbuildingid == buildingid && buildingid != ""))) {
							var zoption = document.createElement("option");
							zoption.text = WTW.actionZones[i].actionzonename;
							zoption.value = WTW.actionZones[i].actionzoneid;
							if (WTW.actionZones[i].actionzonename == 'Normal - Load when near') {
								zoption.selected = true;
							}
							dGet('wtwcoins_tloadactionzoneid').add(zoption);
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-custom_actionzones.js-loadActionZones=" + ex.message);
	}
}

WTW_COINS.prototype.loadCoinValues = function() {
	/* load the coin values to the drop down list */
	try {
		if (dGet('wtwcoins_tvalue1') != null) {
			WTW.clearDDL('wtwcoins_tvalue1');

			var zoption1 = document.createElement("option");
			zoption1.text = '1 Token';
			zoption1.value = '1';
			zoption1.selected = true;
			dGet('wtwcoins_tvalue1').add(zoption1);
		
			var zoption5 = document.createElement("option");
			zoption5.text = '5 Tokens';
			zoption5.value = '5';
			dGet('wtwcoins_tvalue1').add(zoption5);
		
			var zoption10 = document.createElement("option");
			zoption10.text = '10 Tokens';
			zoption10.value = '10';
			dGet('wtwcoins_tvalue1').add(zoption10);
		
			var zoption25 = document.createElement("option");
			zoption25.text = '25 Tokens';
			zoption25.value = '25';
			dGet('wtwcoins_tvalue1').add(zoption25);
		
			var zoption50 = document.createElement("option");
			zoption50.text = '50 Tokens';
			zoption50.value = '50';
			dGet('wtwcoins_tvalue1').add(zoption50);
		
			var zoption100 = document.createElement("option");
			zoption100.text = '100 Tokens';
			zoption100.value = '100';
			dGet('wtwcoins_tvalue1').add(zoption100);
		}
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-custom_actionzones.js-loadCoinValues=" + ex.message);
	}
}

WTW_COINS.prototype.changeNumberValue = function(zitem, zdn, zrefresh) {
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
			znvali = parseFloat(Math.round(Number(zvali) * 100) / 100) + ndni;
			if (WTW.adminView == 1) {
				dGet(zitem).value = (znvali.toFixed(2));
				wtwcoins.setNewCoin();
			} else {
				dGet(zitem).value = (znvali.toFixed(0));
			}
		}
		WTW.mouseTimer = window.setInterval(function () {
			var zval = dGet(zitem).value;
			var znval = 0;
			zndn = 0;
			if (WTW.isNumeric(zdn)) {
				zndn = parseFloat(zdn);
			}
			if (WTW.isNumeric(zval)) {
				znval = parseFloat(Math.round(Number(zval) * 100) / 100) + zndn;
				if (WTW.adminView == 1) {
					dGet(zitem).value = (znval.toFixed(2));
					wtwcoins.setNewCoin();
				} else {
					dGet(zitem).value = (znval.toFixed(0));
				}
			}
		}, 100);
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-custom_actionzones.js-changeNumberValue=" + ex.message);
	}
}

WTW_COINS.prototype.setNewCoin = function() {
	/* show changes to the WTW Coin as it is edited */
	try {
		/* get the action zone mesh name (opposed to the friendly name) */
		var zactionzonename = "actionzone-" + dGet('wtw_tactionzoneind').value + "-" + dGet('wtw_tactionzoneid').value + "-" + dGet("wtw_tconnectinggridind").value + "-" + dGet("wtw_tconnectinggridid").value + "-wtwcoin";
		
		/* get the coin value */
		var zvalue1 = WTW.getDDLValue('wtwcoins_tvalue1');
		
		/* get the new position */
		var zpositionx = 0;
		var zpositiony = 0;
		var zpositionz = 0;
		var zscalingx = dGet('wtw_tactionzonescalingx').value;
		var zscalingy = dGet('wtw_tactionzonescalingy').value;
		var zscalingz = dGet('wtw_tactionzonescalingz').value;
		if (WTW.isNumeric(dGet('wtwcoins_tactionzonecoinx').value)) {
			zpositionx = Number(dGet('wtwcoins_tactionzonecoinx').value).toFixed(2);
		} else {
			dGet('wtwcoins_tactionzonecoinx').value = zpositionx.toFixed(2);
		}
		if (WTW.isNumeric(dGet('wtwcoins_tactionzonecoiny').value)) {
			zpositiony = Number(dGet('wtwcoins_tactionzonecoiny').value).toFixed(2);
		} else {
			dGet('wtwcoins_tactionzonecoiny').value = zpositiony.toFixed(2);
		}
		if (WTW.isNumeric(dGet('wtwcoins_tactionzonecoinz').value)) {
			zpositionz = Number(dGet('wtwcoins_tactionzonecoinz').value).toFixed(2);
		} else {
			dGet('wtwcoins_tactionzonecoinz').value = zpositionz.toFixed(2);
		}
		
		var zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
		if (zactionzone != null) {
			zactionzone.position.x = zpositionx;
			zactionzone.position.y = zpositiony;
			zactionzone.position.z = zpositionz;
		}
		
		if (Number(dGet('wtw_tactionzonevalue1').value) != Number(zvalue1)) {
			/* load new coin by value */
			wtwcoins.loadCoin(zactionzonename, zvalue1, zscalingx, zscalingy, zscalingz, null);
			dGet('wtw_tactionzonevalue1').value = zvalue1;
		}
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-custom_actionzones.js-setNewCoin=" + ex.message);
	}
}

WTW_COINS.prototype.checkActionZone = function(zactionzonename, zactionzoneind, zmeinzone, zothersinzone) {
	/* check if avatar is in the action zone and respond accordingly */
	try {
		if (zactionzonename.indexOf("wtwcoin") > -1) {
			if (zmeinzone) {
				wtwcoins.collectCoin(zactionzonename, zactionzoneind);
			} else if (zothersinzone) {
				wtwcoins.tempHideCoin(zactionzonename, zactionzoneind);
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-custom_actionzones.js-checkActionZone=" + ex.message);
	}
}

WTW_COINS.prototype.collectCoin = function(zactionzonename, zactionzoneind) {
	/* get the points and delete the coin and actionzone */
	try {
		
		if (dGet('wtwcoins_display') == null) {
			var zplayerstats = dGet('wtw_playerstats');
			var zdiv = document.createElement("div");
			zdiv.id = 'wtwcoins_display';
			zdiv.className = 'wtwcoins-display';
			var zglobal = document.createElement("img");
			zglobal.id = 'wtwcoins_global';
			zglobal.className = 'wtwcoins-global';
			zglobal.src = '/content/system/images/global.png';
			zdiv.appendChild(zglobal);
			var zlabel = document.createElement("div");
			zlabel.id = 'wtwcoins_displaytext';
			zlabel.className = 'wtwcoins-displaylabel';
			zlabel.innerHTML = 'WTW Coins: ';
			zdiv.appendChild(zlabel);
			var zvalue = document.createElement("div");
			zvalue.id = 'wtwcoins_counter';
			zvalue.className = 'wtwcoins-displayvalue';
			zvalue.innerHTML = '0';
			zdiv.appendChild(zvalue);
			zplayerstats.appendChild(zdiv);
		} else {
			WTW.show('wtwcoins_display');
			WTW.show('wtw_playerstats');
		}
		
		if (WTW.actionZones[zactionzoneind] != null) {
			/* see if status allows you to collect */
			/* status 	2 = ready to collect, 
						3 = someone else collected it (it will return in 5 seconds)
						4 = you already collected it 
						5 = ghost shown, you can collect again, but without points */

			var zmoldnameparts = WTW.getMoldnameParts(zactionzonename);
			
			if (WTW.actionZones[zactionzoneind].status == 2) {
				var zvalue1 = Number(WTW.actionZones[zactionzoneind].value1);
				var zlastvalue = 0;
				if (WTW.isNumeric(dGet('wtwcoins_counter').innerHTML)) {
					zlastvalue = Number(dGet('wtwcoins_counter').innerHTML);
				}
				dGet('wtwcoins_counter').innerHTML = WTW.formatNumber((zlastvalue + zvalue1),0);
				
				if (dGet('wtw_tuserid').value != '') {
					/* save score locally if user logged in */
					var zrequest = {
						'actionzoneid': WTW.actionZones[zactionzoneind].actionzoneid,
						'webid': zmoldnameparts.webid,
						'userid': dGet('wtw_tuserid').value,
						'globaluserid': dGet('wtw_tglobaluserid').value,
						'usertoken': dGet('wtw_tusertoken').value,
						'value1': zvalue1,
						'function':'collectcoin'
					};
					WTW.postAsyncJSON("/core/handlers/wtw-coins-collected.php", zrequest, 
						function(zresponse) {
							zresponse = JSON.parse(zresponse);
							/* note serror would contain errors */
						}
					);
					/* show globe if user is logged into WalkTheWeb Global Account */
					if (dGet('wtw_tglobaluserid').value != '' && dGet('wtw_tusertoken').value != '') {
						WTW.showInline('wtwcoins_global');
					}
				}
			}
			if (WTW.actionZones[zactionzoneind].status == 2 || WTW.actionZones[zactionzoneind].status == 5) {
				/* check for and remove it if exists */
				var zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
				if (zactionzone != null) {
					var zcoinparts = zactionzone.getChildren();
					for (var i=0;i < zcoinparts.length;i++) {
						zcoinparts[i].dispose();
					}
				}
				
				/* set status as collected */
				WTW.actionZones[zactionzoneind].status = 4;
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-custom_actionzones.js-collectCoin=" + ex.message);
	}
}

WTW_COINS.prototype.showGhostCoins = function() {
	/* used to show or hide ghost coins from the 3D scene (check box to hide ghost coins) */
	try {
		for (var i=0;i < WTW.actionZones.length;i++) {
			if (WTW.actionZones[i] != null) {
				if (WTW.actionZones[i].status == 5) {
					if (dGet('wtwcoins_showghostcoins').checked) {
						wtwcoins.loadCoin(WTW.actionZones[i].moldname, WTW.actionZones[i].value1, WTW.actionZones[i].scaling.x, WTW.actionZones[i].scaling.y, WTW.actionZones[i].scaling.z, '-ghost', WTW.actionZones[i]);
					} else {
						wtwcoins.removeCoin(WTW.actionZones[i].moldname, i);
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-custom_actionzones.js-removeCoin=" + ex.message);
	}
}

WTW_COINS.prototype.removeCoin = function(zactionzonename, zactionzoneind) {
	/* used to remove a ghost coin from the 3D Scene (check box to hide ghost coins) */
	try {
		if (WTW.actionZones[zactionzoneind] != null) {
			if (WTW.actionZones[zactionzoneind].status == 5) {
				/* check for previous coin and remove it if exists */
				var zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
				if (zactionzone != null) {
					var zcoinparts = zactionzone.getChildren();
					for (var i=0;i < zcoinparts.length;i++) {
						zcoinparts[i].dispose();
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-custom_actionzones.js-removeCoin=" + ex.message);
	}
}

WTW_COINS.prototype.tempHideCoin = function(zactionzonename, zactionzoneind) {
	/* If other avatar collects the coin, delete it in my 3D Scene, then add again after a timer */
	try {
		if (WTW.actionZones[zactionzoneind] != null) {
			if (WTW.actionZones[zactionzoneind].status == 2) {
				/* check for previous coin and remove it if exists */
				var zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
				if (zactionzone != null) {
					var zcoinparts = zactionzone.getChildren();
					for (var i=0;i < zcoinparts.length;i++) {
						zcoinparts[i].dispose();
					}
				}
				
				/* set status as collected */
				WTW.actionZones[zactionzoneind].status = 3;
				
				/* make the coin available again after 5 seconds */
				window.setTimeout(function(){
					wtwcoins.loadCoin(zactionzonename, WTW.actionZones[zactionzoneind].value1, WTW.actionZones[zactionzoneind].scaling.x, WTW.actionZones[zactionzoneind].scaling.y, WTW.actionZones[zactionzoneind].scaling.z, WTW.actionZones[zactionzoneind]);
					WTW.actionZones[zactionzoneind].status = 2;
				},5000);
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-coins:scripts-custom_actionzones.js-tempHideCoin=" + ex.message);
	}
}

WTWJS.prototype.elevatorDoorTimer = null;
WTWJS.prototype.elevatorTimer = null;

WTWJS.prototype.elevatorCall = function(parameters, moldname) {
	try {
		var floor = 1;
		var valuey = 0;
		var direction = "up";
		if (moldname == undefined) {
			moldname = "";
		}
		if (parameters.indexOf(",") > -1) {
			var parameter = parameters.split(',');
			if (WTW.isNumeric(parameter[0])) {
				floor = Number(parameter[0]);
			}
			if (WTW.isNumeric(parameter[1])) {
				valuey = Number(parameter[1]);
			}
			if (parameter[2] != undefined) {
				direction = parameter[2];
			}
		}
		if (moldname != "") {
			if (moldname.indexOf("-") > -1) {
				var namepart = moldname.split('-');
				var molds = null;
				var moldind = -1;
				if (namepart[0] != null) {
					switch (namepart[0]) {
						case "communitymolds":
							molds = WTW.communitiesMolds;
							break;
						case "buildingmolds":
							molds = WTW.buildingMolds;
							break;
						case "thingmolds":
							molds = WTW.thingMolds;
							break;
					}
				}
				if (namepart[1] != null) {
					if (WTW.isNumeric(namepart[1])) {
						moldind = Number(namepart[1]);
					}
				}
				if (namepart[3] != null) {
					if (WTW.isNumeric(namepart[3])) {
						connectinggridind = Number(namepart[3]);
					}
				}
				if (namepart[4] != null) {
					connectinggridid = namepart[3];
				}
				if (molds[moldind] != null) {
					if (molds[moldind].graphics.webimages[0] != null) {
						if (molds[moldind].graphics.webimages[0].jsfunction != undefined) {
							if (molds[moldind].graphics.webimages[0].jsfunction == "WTW.elevatorCall") {
								WTW.setDirectionalOpacity(moldname.replace("-base","-clickimage"),1);
							}
						}
					}
				}
			}
		}		
		WTW.elevatorSelectFloor(floor, moldname);
	} catch (ex) {
		WTW.log("custom-elevatorCall=" + ex.message);
	}
}

WTWJS.prototype.elevatorClearTimer = function(etimer) {
	try {
		if (etimer != null) {
			try {
				window.clearInterval(etimer);
			} catch (ex) {}
			try {
				window.clearTimeout(etimer);
			} catch (ex) {}
			etimer = null;
		}
	} catch (ex) {
		WTW.log("custom-elevatorClearTimer=" + ex.message);
	}
}

WTWJS.prototype.elevatorDoors = function(doordirection, floor, valuey, direction, connectinggridind, connectinggridid, moldname) {
	try {
		for (var i=0; i < WTW.actionZones.length; i++) {
			if (WTW.actionZones[i] != null) {
				if (connectinggridind == WTW.actionZones[i].connectinggridind && WTW.actionZones[i].actionzonetype == "clickactivatedslidingdoor" && Number(WTW.actionZones[i].axis.position.y) == valuey) {
					if (doordirection == "open") {
						if (WTW.actionZones[i].status != 4) {
							WTW.actionZones[i].status = 3;
							WTW.elevatorClearTimer(WTW.elevatorDoorTimer);
							WTW.elevatorDoorTimer = window.setTimeout(function() {
								WTW.elevatorClearTimer(WTW.elevatorDoorTimer);
								WTW.elevatorDoors("close", floor, valuey, direction, connectinggridind, connectinggridid, moldname);
							},15000);
						}
					} else if (doordirection == "close") {
						if (WTW.actionZones[i].status != 1) {
							WTW.actionZones[i].status = 2;
							WTW.elevatorClearTimer(WTW.elevatorDoorTimer);
							WTW.elevatorSelectFloor(floor, moldname);
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("custom-elevatorDoors=" + ex.message);
	}
}

WTWJS.prototype.elevatorRequestDoor = function(doordirection, moldname) {
	try {
		var valuey = 0;
		var floor = 1;
		var connectinggridind = -1;
		var connectinggridid = "";
		if (moldname != "") {
			if (moldname.indexOf("-") > -1) {
				var namepart = moldname.split('-');
				var molds = null;
				var moldind = -1;
				if (namepart[0] != null) {
					switch (namepart[0]) {
						case "communitymolds":
							molds = WTW.communitiesMolds;
							break;
						case "buildingmolds":
							molds = WTW.buildingMolds;
							break;
						case "thingmolds":
							molds = WTW.thingMolds;
							break;
					}
				}
				if (namepart[1] != null) {
					if (WTW.isNumeric(namepart[1])) {
						moldind = Number(namepart[1]);
					}
				}
				if (namepart[3] != null) {
					if (WTW.isNumeric(namepart[3])) {
						connectinggridind = Number(namepart[3]);
					}
				}
				if (namepart[4] != null) {
					connectinggridid = namepart[3];
				}
				if (molds[moldind] != null) {
					if (molds[moldind].graphics.webimages[0] != null) {
						if (molds[moldind].graphics.webimages[0].jsfunction != undefined) {
							if (molds[moldind].graphics.webimages[0].jsfunction == "WTW.elevatorRequestDoor") {
								WTW.setDirectionalOpacity(moldname.replace("-base","-clickimage"),1);
							}
						}
					}
				}
			}
		}
		var estatus = WTW.elevatorStatus(connectinggridind, connectinggridid);
		if (estatus == 4) {
			valuey = 40;
			floor = 2;
		}
		if (estatus < 2 || estatus == 4) {
			for (var i=0; i < WTW.actionZones.length; i++) {
				if (WTW.actionZones[i] != null) {
					if (connectinggridind == WTW.actionZones[i].connectinggridind && WTW.actionZones[i].actionzonetype == "clickactivatedslidingdoor" && (Number(WTW.actionZones[i].axis.position.y) == valuey)) {
						if (doordirection == "open") {
							if (WTW.actionZones[i].status != 4) {
								WTW.actionZones[i].status = 3;
								WTW.elevatorClearTimer(WTW.elevatorDoorTimer);
								WTW.elevatorDoorTimer = window.setTimeout(function() {
									WTW.elevatorClearTimer(WTW.elevatorDoorTimer);
									WTW.elevatorDoors("close", floor, valuey, "arrived", connectinggridind, connectinggridid, moldname);
								},15000);
							}
						} else if (doordirection == "close") {
							if (WTW.actionZones[i].status != 1) {
								WTW.actionZones[i].status = 2;
								WTW.elevatorClearTimer(WTW.elevatorDoorTimer);
								WTW.elevatorSelectFloor(floor, moldname);
							}
						}
					}
				}
			}
		}
		WTW.setDirectionalOpacity(moldname.replace("-base","-clickimage"),0);
	} catch (ex) {
		WTW.log("custom-elevatorRequestDoor=" + ex.message);
	}
}

WTWJS.prototype.elevatorSelectFloor = function(setfloor, moldname) {
	try {
		var connectinggridind = -1;
		var connectinggridid = "";
		var namepart = moldname.split('-');
		var molds = null;
		var moldind = -1;
		if (moldname != "") {
			if (moldname.indexOf("-") > -1) {
				if (namepart[0] != null) {
					switch (namepart[0]) {
						case "communitymolds":
							molds = WTW.communitiesMolds;
							break;
						case "buildingmolds":
							molds = WTW.buildingMolds;
							break;
						case "thingmolds":
							molds = WTW.thingMolds;
							break;
					}
				}
				if (namepart[1] != null) {
					if (WTW.isNumeric(namepart[1])) {
						moldind = Number(namepart[1]);
					}
				}
				if (namepart[3] != null) {
					if (WTW.isNumeric(namepart[3])) {
						connectinggridind = Number(namepart[3]);
					}
				}
				if (namepart[4] != null) {
					connectinggridid = namepart[3];
				}
				if (molds[moldind] != null) {
					if (molds[moldind].graphics.webimages[0] != null) {
						if (molds[moldind].graphics.webimages[0].jsfunction != undefined) {
							if (molds[moldind].graphics.webimages[0].jsfunction == "WTW.elevatorSelectFloor") {
								WTW.setDirectionalOpacity(moldname.replace("-base","-clickimage"),1);
							}
						}
					}
				}
			}
		}
		WTW.elevatorClearTimer(WTW.elevatorTimer);
		WTW.elevatorTimer = window.setInterval(function() {
			var floor = 0;
			var emolds = molds;
			var emoldind = moldind
			var cgind = connectinggridind;
			var cgid = connectinggridid;
			var estatus = WTW.elevatorStatus(cgind, cgid);
			var edoorstatus = WTW.elevatorDoorStatus(cgind, cgid);
			var emoving = 0;
			if (emolds != null) {
				for (var i=0;i < emolds.length;i++) {
					if (emolds[i] != null) {
						if (emolds[i].shape == "image" && emolds[i].graphics.webimages[0].jsfunction == "WTW.elevatorSelectFloor") {
							if (estatus < 2 && emolds[i].graphics.webimages[0].jsparameters == "1") {
								WTW.setDirectionalOpacity(emolds[i].moldname + "-clickimage",0);
							} else if (estatus == 4 && emolds[i].graphics.webimages[0].jsparameters == "2") {
								WTW.setDirectionalOpacity(emolds[i].moldname + "-clickimage",0);
							} else {
								var emold = scene.getMeshByID(emolds[i].moldname + "-clickimage");
								moldname = emolds[i].moldname + "-base";
								if (emold != null) {
									if (emold.material.subMaterials[0] != null) {
										if (emold.material.subMaterials[0].alpha != undefined) {
											if (emold.material.subMaterials[0].alpha == 1) {
												if (WTW.isNumeric(emolds[i].graphics.webimages[0].jsparameters)) {
													floor = Number(emolds[i].graphics.webimages[0].jsparameters);
													emoving = 1;
												}
											}
										}
									}
								}
							}
						}
					}
				}
				for (var i=0;i < emolds.length;i++) {
					if (emolds[i] != null) {
						if (emolds[i].shape == "image" && emolds[i].graphics.webimages[0].jsfunction == "WTW.elevatorCall") {
							var jsparameters = emolds[i].graphics.webimages[0].jsparameters.split(',');
							var jsparameter = jsparameters[0];
							var emold = scene.getMeshByID(emolds[i].moldname + "-clickimage");
							var eopacity = 0; 
							if (emold != null) {
								if (emold.material.subMaterials[0] != null) {
									if (emold.material.subMaterials[0].alpha != undefined) {
										eopacity = emold.material.subMaterials[0].alpha;
									}
								}
							}
							if (estatus < 2 && jsparameter == "1") {
								if (eopacity == 1 && emoving == 0) {
									WTW.elevatorRequestDoor("open", emolds[i].moldname + "-base");
								}
								WTW.setDirectionalOpacity(emolds[i].moldname + "-clickimage",0);
							} else if (estatus == 4 && jsparameter == "2") {
								if (eopacity == 1 && emoving == 0) {
									WTW.elevatorRequestDoor("open", emolds[i].moldname + "-base");
								}
								WTW.setDirectionalOpacity(emolds[i].moldname + "-clickimage",0);
							} else {
								if (floor == 0) {
									moldname = emolds[i].moldname + "-base";
									if (eopacity == 1) {
										if (WTW.isNumeric(jsparameter)) {
											floor = Number(jsparameter);
										}
									}
								}			
							}
						}
					}
				}	
			}
			for (var i=0; i < WTW.actionZones.length; i++) {
				if (WTW.actionZones[i] != null) {
					if (cgind == WTW.actionZones[i].connectinggridind && WTW.actionZones[i].actionzonetype == "elevator") {
						if (WTW.actionZones[i].status < 2 && floor == 1) {
							WTW.setDirectionalOpacity(moldname.replace("-base","-clickimage"),0);
						} else if (WTW.actionZones[i].status == 4 && floor == 2) {
							WTW.setDirectionalOpacity(moldname.replace("-base","-clickimage"),0);
						} else if (WTW.actionZones[i].status < 2 && floor == 2) {
							if (edoorstatus == 0) {
								WTW.elevatorClearTimer(WTW.elevatorTimer);
								WTW.elevatorTimer = window.setTimeout(function() {
									WTW.elevatorClearTimer(WTW.elevatorTimer);
									WTW.elevatorMove(2, 40, "up", cgind, cgid, moldname);
								},3000);
							}
						} else if (WTW.actionZones[i].status == 4 && floor == 1) {
							if (edoorstatus == 0) {
								WTW.elevatorClearTimer(WTW.elevatorTimer);
								WTW.elevatorTimer = window.setTimeout(function() {
									WTW.elevatorClearTimer(WTW.elevatorTimer);
									WTW.elevatorMove(1, 0, "down", cgind, cgid, moldname);
								},3000);
							}
						}
					}
				}
			}
		},1000);
	} catch (ex) {
		WTW.log("custom-elevatorSelectFloor=" + ex.message);
	}
}

WTWJS.prototype.elevatorMove = function(floor, valuey, direction, connectinggridind, connectinggridid, moldname) {
	try {
		for (var i=0; i < WTW.actionZones.length; i++) {
			if (WTW.actionZones[i] != null) {
				if (connectinggridind == WTW.actionZones[i].connectinggridind && WTW.actionZones[i].actionzonetype == "elevator") {
					if (direction == "up") {
						WTW.actionZones[i].status = 3;
					} else if (direction == "down") {
						WTW.actionZones[i].status = 2;
					}
				}
			}
		}
		WTW.elevatorClearTimer(WTW.elevatorTimer);
		WTW.elevatorTimer = window.setInterval(function() {
			var estatus = WTW.elevatorStatus(connectinggridind, connectinggridid);
			if (estatus < 2) {
				WTW.elevatorClearTimer(WTW.elevatorTimer);
				WTW.setDirectionalOpacity(moldname.replace("-base","-clickimage"),0);
				WTW.elevatorDoors("open", 1, 0, "arrival", connectinggridind, connectinggridid, moldname);
				WTW.elevatorDoorTimer = window.setTimeout(function() {
					WTW.elevatorClearTimer(WTW.elevatorDoorTimer);
					WTW.elevatorDoors("close", 1, 0, "arrival", connectinggridind, connectinggridid, moldname);
				},15000);	
			} else if (estatus == 4) {
				WTW.elevatorClearTimer(WTW.elevatorTimer);
				WTW.setDirectionalOpacity(moldname.replace("-base","-clickimage"),0);
				WTW.elevatorDoors("open", 2, 40, "arrival", connectinggridind, connectinggridid, moldname);
				WTW.elevatorDoorTimer = window.setTimeout(function() {
					WTW.elevatorClearTimer(WTW.elevatorDoorTimer);
					WTW.elevatorDoors("close", 1, 0, "arrival", connectinggridind, connectinggridid, moldname);
				},15000);	
			}
		},2000);
	} catch (ex) {
		WTW.log("custom-elevatorMove=" + ex.message);
	}
}

WTWJS.prototype.elevatorStatus = function(connectinggridind, connectinggridid) {
	var estatus = 0;
	try {
		for (var i=0; i < WTW.actionZones.length; i++) {
			if (WTW.actionZones[i] != null) {
				if (connectinggridind == WTW.actionZones[i].connectinggridind && WTW.actionZones[i].actionzonetype == "elevator") {
					estatus = WTW.actionZones[i].status;
				}
			}
		}
	} catch (ex) {
		WTW.log("custom-elevatorStatus=" + ex.message);
	}
	return estatus;
}

WTWJS.prototype.elevatorDoorStatus = function(connectinggridind, connectinggridid) {
	var edoorstatus = 0;
	try {
		for (var i=0; i < WTW.actionZones.length; i++) {
			if (WTW.actionZones[i] != null) {
				if (connectinggridind == WTW.actionZones[i].connectinggridind && WTW.actionZones[i].actionzonetype == "clickactivatedslidingdoor") {
					if (WTW.actionZones[i].status > 1) {
						edoorstatus = 1;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("custom-elevatorDoorStatus=" + ex.message);
	}
	return edoorstatus;
}

//need? -elevatorHeight- not currently in use
WTWJS.prototype.elevatorHeight = function(connectinggridind, connectinggridid) {
	var eheight = 0;
	try {
		for (var i=0; i < WTW.actionZones.length; i++) {
			if (WTW.actionZones[i] != null) {
				if (connectinggridind == WTW.actionZones[i].connectinggridind && WTW.actionZones[i].actionzonetype == "elevator") {
					var actionzoneaxle = scene.getMeshByID(WTW.actionZones[i].moldname.replace("actionzone-","actionzoneaxle-"));
					if (actionzoneaxle != null) {
						eheight = actionzoneaxle.position.y;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("custom-elevatorHeight=" + ex.message);
	}
	return eheight;
}
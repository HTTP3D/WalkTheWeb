/* All code is Copyright 2013-2022 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions create basic elevator functions (Work In Progress) */

/* code for an elevator */
WTWJS.prototype.elevatorDoorTimer = null;
WTWJS.prototype.elevatorTimer = null;

WTWJS.prototype.elevatorCall = function(zparameters, zmoldname) {
	try {
		var zfloor = 1;
		var zvaluey = 0;
		var zdirection = 'up';
		if (zmoldname == undefined) {
			zmoldname = '';
		}
		if (zparameters.indexOf(',') > -1) {
			var zparameter = zparameters.split(',');
			if (WTW.isNumeric(zparameter[0])) {
				zfloor = Number(zparameter[0]);
			}
			if (WTW.isNumeric(zparameter[1])) {
				zvaluey = Number(zparameter[1]);
			}
			if (zparameter[2] != undefined) {
				zdirection = zparameter[2];
			}
		}
		if (zmoldname != '') {
			if (zmoldname.indexOf('-') > -1) {
				var znamepart = zmoldname.split('-');
				var zmolds = null;
				var zmoldind = -1;
				if (znamepart[1] != null) {
					switch (znamepart[1]) {
						case 'communitymolds':
							zmolds = WTW.communitiesMolds;
							break;
						case 'buildingmolds':
							zmolds = WTW.buildingMolds;
							break;
						case 'thingmolds':
							zmolds = WTW.thingMolds;
							break;
					}
				}
				if (znamepart[2] != null) {
					if (WTW.isNumeric(znamepart[2])) {
						zmoldind = Number(znamepart[2]);
					}
				}
				if (znamepart[4] != null) {
					if (WTW.isNumeric(znamepart[4])) {
						connectinggridind = Number(znamepart[4]);
					}
				}
				if (znamepart[5] != null) {
					connectinggridid = znamepart[5];
				}
				if (zmolds[zmoldind] != null) {
					if (zmolds[zmoldind].graphics.webimages[0] != null) {
						if (zmolds[zmoldind].graphics.webimages[0].jsfunction != undefined) {
							if (zmolds[zmoldind].graphics.webimages[0].jsfunction == 'WTW.elevatorCall') {
								WTW.setDirectionalOpacity(zmoldname.replace('-base','-clickimage'),1);
							}
						}
					}
				}
			}
		}		
		WTW.elevatorSelectFloor(zfloor, zmoldname);
	} catch (ex) {
		WTW.log('custom-elevatorCall=' + ex.message);
	}
}

WTWJS.prototype.elevatorClearTimer = function(zetimer) {
	try {
		if (zetimer != null) {
			try {
				window.clearInterval(zetimer);
			} catch (ex) {}
			try {
				window.clearTimeout(zetimer);
			} catch (ex) {}
			zetimer = null;
		}
	} catch (ex) {
		WTW.log('custom-elevatorClearTimer=' + ex.message);
	}
}

WTWJS.prototype.elevatorDoors = function(zdoordirection, zfloor, zvaluey, zdirection, zconnectinggridind, zconnectinggridid, zmoldname) {
	try {
		for (var i=0; i < WTW.actionZones.length; i++) {
			if (WTW.actionZones[i] != null) {
				if (zconnectinggridind == WTW.actionZones[i].connectinggridind && WTW.actionZones[i].actionzonetype == 'clickactivatedslidingdoor' && Number(WTW.actionZones[i].axis.position.y) == zvaluey) {
					if (zdoordirection == 'open') {
						if (WTW.actionZones[i].status != 4) {
							WTW.actionZones[i].status = 3;
							WTW.elevatorClearTimer(WTW.elevatorDoorTimer);
							WTW.elevatorDoorTimer = window.setTimeout(function() {
								WTW.elevatorClearTimer(WTW.elevatorDoorTimer);
								WTW.elevatorDoors('close', zfloor, zvaluey, zdirection, zconnectinggridind, zconnectinggridid, zmoldname);
							},15000);
						}
					} else if (zdoordirection == 'close') {
						if (WTW.actionZones[i].status != 1) {
							WTW.actionZones[i].status = 2;
							WTW.elevatorClearTimer(WTW.elevatorDoorTimer);
							WTW.elevatorSelectFloor(zfloor, zmoldname);
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('custom-elevatorDoors=' + ex.message);
	}
}

WTWJS.prototype.elevatorRequestDoor = function(zdoordirection, zmoldname) {
	try {
		var zvaluey = 0;
		var zfloor = 1;
		var zconnectinggridind = -1;
		var zconnectinggridid = '';
		if (zmoldname != '') {
			if (zmoldname.indexOf('-') > -1) {
				var znamepart = zmoldname.split('-');
				var zmolds = null;
				var zmoldind = -1;
				if (znamepart[1] != null) {
					switch (znamepart[1]) {
						case 'communitymolds':
							zmolds = WTW.communitiesMolds;
							break;
						case 'buildingmolds':
							zmolds = WTW.buildingMolds;
							break;
						case 'thingmolds':
							zmolds = WTW.thingMolds;
							break;
					}
				}
				if (znamepart[2] != null) {
					if (WTW.isNumeric(znamepart[2])) {
						zmoldind = Number(znamepart[2]);
					}
				}
				if (znamepart[4] != null) {
					if (WTW.isNumeric(znamepart[4])) {
						zconnectinggridind = Number(znamepart[4]);
					}
				}
				if (znamepart[5] != null) {
					zconnectinggridid = znamepart[5];
				}
				if (zmolds[zmoldind] != null) {
					if (zmolds[zmoldind].graphics.webimages[0] != null) {
						if (zmolds[zmoldind].graphics.webimages[0].jsfunction != undefined) {
							if (zmolds[zmoldind].graphics.webimages[0].jsfunction == 'WTW.elevatorRequestDoor') {
								WTW.setDirectionalOpacity(zmoldname.replace('-base','-clickimage'),1);
							}
						}
					}
				}
			}
		}
		var zestatus = WTW.elevatorStatus(zconnectinggridind, zconnectinggridid);
		if (zestatus == 4) {
			zvaluey = 40;
			zfloor = 2;
		}
		if (zestatus < 2 || zestatus == 4) {
			for (var i=0; i < WTW.actionZones.length; i++) {
				if (WTW.actionZones[i] != null) {
					if (zconnectinggridind == WTW.actionZones[i].connectinggridind && WTW.actionZones[i].actionzonetype == 'clickactivatedslidingdoor' && (Number(WTW.actionZones[i].axis.position.y) == zvaluey)) {
						if (zdoordirection == 'open') {
							if (WTW.actionZones[i].status != 4) {
								WTW.actionZones[i].status = 3;
								WTW.elevatorClearTimer(WTW.elevatorDoorTimer);
								WTW.elevatorDoorTimer = window.setTimeout(function() {
									WTW.elevatorClearTimer(WTW.elevatorDoorTimer);
									WTW.elevatorDoors('close', zfloor, zvaluey, 'arrived', zconnectinggridind, zconnectinggridid, zmoldname);
								},15000);
							}
						} else if (zdoordirection == 'close') {
							if (WTW.actionZones[i].status != 1) {
								WTW.actionZones[i].status = 2;
								WTW.elevatorClearTimer(WTW.elevatorDoorTimer);
								WTW.elevatorSelectFloor(zfloor, zmoldname);
							}
						}
					}
				}
			}
		}
		WTW.setDirectionalOpacity(zmoldname.replace('-base','-clickimage'),0);
	} catch (ex) {
		WTW.log('custom-elevatorRequestDoor=' + ex.message);
	}
}

WTWJS.prototype.elevatorSelectFloor = function(zsetfloor, zmoldname) {
	try {
		var zconnectinggridind = -1;
		var zconnectinggridid = '';
		var znamepart = zmoldname.split('-');
		var zmolds = null;
		var zmoldind = -1;
		if (zmoldname != '') {
			if (zmoldname.indexOf('-') > -1) {
				if (znamepart[1] != null) {
					switch (znamepart[1]) {
						case 'communitymolds':
							zmolds = WTW.communitiesMolds;
							break;
						case 'buildingmolds':
							zmolds = WTW.buildingMolds;
							break;
						case 'thingmolds':
							zmolds = WTW.thingMolds;
							break;
					}
				}
				if (znamepart[2] != null) {
					if (WTW.isNumeric(znamepart[2])) {
						zmoldind = Number(znamepart[2]);
					}
				}
				if (znamepart[4] != null) {
					if (WTW.isNumeric(znamepart[4])) {
						zconnectinggridind = Number(znamepart[4]);
					}
				}
				if (znamepart[5] != null) {
					zconnectinggridid = znamepart[5];
				}
				if (zmolds[zmoldind] != null) {
					if (zmolds[zmoldind].graphics.webimages[0] != null) {
						if (zmolds[zmoldind].graphics.webimages[0].jsfunction != undefined) {
							if (zmolds[zmoldind].graphics.webimages[0].jsfunction == 'WTW.elevatorSelectFloor') {
								WTW.setDirectionalOpacity(zmoldname.replace('-base','-clickimage'),1);
							}
						}
					}
				}
			}
		}
		WTW.elevatorClearTimer(WTW.elevatorTimer);
		WTW.elevatorTimer = window.setInterval(function() {
			var zfloor = 0;
			var zestatus = WTW.elevatorStatus(zconnectinggridind, zconnectinggridid);
			var zedoorstatus = WTW.elevatorDoorStatus(zconnectinggridind, zconnectinggridid);
			var zemoving = 0;
			if (zmolds != null) {
				for (var i=0;i < zmolds.length;i++) {
					if (zmolds[i] != null) {
						if (zmolds[i].shape == 'image' && zmolds[i].graphics.webimages[0].jsfunction == 'WTW.elevatorSelectFloor') {
							if (zestatus < 2 && zmolds[i].graphics.webimages[0].jsparameters == '1') {
								WTW.setDirectionalOpacity(zmolds[i].moldname + '-clickimage',0);
							} else if (zestatus == 4 && zmolds[i].graphics.webimages[0].jsparameters == '2') {
								WTW.setDirectionalOpacity(zmolds[i].moldname + '-clickimage',0);
							} else {
								var zemold = WTW.getMeshOrNodeByID(zmolds[i].moldname + '-clickimage');
								zmoldname = zmolds[i].moldname + '-base';
								if (zemold != null) {
									if (zemold.material.subMaterials[0] != null) {
										if (zemold.material.subMaterials[0].alpha != undefined) {
											if (zemold.material.subMaterials[0].alpha == 1) {
												if (WTW.isNumeric(zmolds[i].graphics.webimages[0].jsparameters)) {
													zfloor = Number(zmolds[i].graphics.webimages[0].jsparameters);
													zemoving = 1;
												}
											}
										}
									}
								}
							}
						}
					}
				}
				for (var i=0;i < zmolds.length;i++) {
					if (zmolds[i] != null) {
						if (zmolds[i].shape == 'image' && zmolds[i].graphics.webimages[0].jsfunction == 'WTW.elevatorCall') {
							var zjsparameters = zmolds[i].graphics.webimages[0].jsparameters.split(',');
							var zjsparameter = zjsparameters[0];
							var zemold = WTW.getMeshOrNodeByID(zmolds[i].moldname + '-clickimage');
							var zeopacity = 0; 
							if (zemold != null) {
								if (zemold.material.subMaterials[0] != null) {
									if (zemold.material.subMaterials[0].alpha != undefined) {
										zeopacity = zemold.material.subMaterials[0].alpha;
									}
								}
							}
							if (zestatus < 2 && zjsparameter == '1') {
								if (zeopacity == 1 && zemoving == 0) {
									WTW.elevatorRequestDoor('open', zmolds[i].moldname + '-base');
								}
								WTW.setDirectionalOpacity(zmolds[i].moldname + '-clickimage',0);
							} else if (zestatus == 4 && zjsparameter == '2') {
								if (zeopacity == 1 && zemoving == 0) {
									WTW.elevatorRequestDoor('open', zmolds[i].moldname + '-base');
								}
								WTW.setDirectionalOpacity(zmolds[i].moldname + '-clickimage',0);
							} else {
								if (zfloor == 0) {
									zmoldname = zmolds[i].moldname + '-base';
									if (zeopacity == 1) {
										if (WTW.isNumeric(zjsparameter)) {
											zfloor = Number(zjsparameter);
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
					if (zconnectinggridind == WTW.actionZones[i].connectinggridind && WTW.actionZones[i].actionzonetype == 'elevator') {
						if (WTW.actionZones[i].status < 2 && zfloor == 1) {
							WTW.setDirectionalOpacity(zmoldname.replace('-base','-clickimage'),0);
						} else if (WTW.actionZones[i].status == 4 && zfloor == 2) {
							WTW.setDirectionalOpacity(zmoldname.replace('-base','-clickimage'),0);
						} else if (WTW.actionZones[i].status < 2 && zfloor == 2) {
							if (zedoorstatus == 0) {
								WTW.elevatorClearTimer(WTW.elevatorTimer);
								WTW.elevatorTimer = window.setTimeout(function() {
									WTW.elevatorClearTimer(WTW.elevatorTimer);
									WTW.elevatorMove(2, 40, 'up', zconnectinggridind, zconnectinggridid, zmoldname);
								},3000);
							}
						} else if (WTW.actionZones[i].status == 4 && zfloor == 1) {
							if (zedoorstatus == 0) {
								WTW.elevatorClearTimer(WTW.elevatorTimer);
								WTW.elevatorTimer = window.setTimeout(function() {
									WTW.elevatorClearTimer(WTW.elevatorTimer);
									WTW.elevatorMove(1, 0, 'down', zconnectinggridind, zconnectinggridid, zmoldname);
								},3000);
							}
						}
					}
				}
			}
		},1000);
	} catch (ex) {
		WTW.log('custom-elevatorSelectFloor=' + ex.message);
	}
}

WTWJS.prototype.elevatorMove = function(zfloor, zvaluey, zdirection, zconnectinggridind, zconnectinggridid, zmoldname) {
	try {
		for (var i=0; i < WTW.actionZones.length; i++) {
			if (WTW.actionZones[i] != null) {
				if (zconnectinggridind == WTW.actionZones[i].connectinggridind && WTW.actionZones[i].actionzonetype == 'elevator') {
					if (zdirection == 'up') {
						WTW.actionZones[i].status = 3;
					} else if (zdirection == 'down') {
						WTW.actionZones[i].status = 2;
					}
				}
			}
		}
		WTW.elevatorClearTimer(WTW.elevatorTimer);
		WTW.elevatorTimer = window.setInterval(function() {
			var zestatus = WTW.elevatorStatus(zconnectinggridind, zconnectinggridid);
			if (zestatus < 2) {
				WTW.elevatorClearTimer(WTW.elevatorTimer);
				WTW.setDirectionalOpacity(zmoldname.replace('-base','-clickimage'),0);
				WTW.elevatorDoors('open', 1, 0, 'arrival', zconnectinggridind, zconnectinggridid, zmoldname);
				WTW.elevatorDoorTimer = window.setTimeout(function() {
					WTW.elevatorClearTimer(WTW.elevatorDoorTimer);
					WTW.elevatorDoors('close', 1, 0, 'arrival', zconnectinggridind, zconnectinggridid, zmoldname);
				},15000);	
			} else if (zestatus == 4) {
				WTW.elevatorClearTimer(WTW.elevatorTimer);
				WTW.setDirectionalOpacity(zmoldname.replace('-base','-clickimage'),0);
				WTW.elevatorDoors('open', 2, 40, 'arrival', zconnectinggridind, zconnectinggridid, zmoldname);
				WTW.elevatorDoorTimer = window.setTimeout(function() {
					WTW.elevatorClearTimer(WTW.elevatorDoorTimer);
					WTW.elevatorDoors('close', 1, 0, 'arrival', zconnectinggridind, zconnectinggridid, zmoldname);
				},15000);	
			}
		},2000);
	} catch (ex) {
		WTW.log('custom-elevatorMove=' + ex.message);
	}
}

WTWJS.prototype.elevatorStatus = function(zconnectinggridind, zconnectinggridid) {
	var zestatus = 0;
	try {
		for (var i=0; i < WTW.actionZones.length; i++) {
			if (WTW.actionZones[i] != null) {
				if (zconnectinggridind == WTW.actionZones[i].connectinggridind && WTW.actionZones[i].actionzonetype == 'elevator') {
					zestatus = WTW.actionZones[i].status;
				}
			}
		}
	} catch (ex) {
		WTW.log('custom-elevatorStatus=' + ex.message);
	}
	return zestatus;
}

WTWJS.prototype.elevatorDoorStatus = function(zconnectinggridind, zconnectinggridid) {
	var zedoorstatus = 0;
	try {
		for (var i=0; i < WTW.actionZones.length; i++) {
			if (WTW.actionZones[i] != null) {
				if (zconnectinggridind == WTW.actionZones[i].connectinggridind && WTW.actionZones[i].actionzonetype == 'clickactivatedslidingdoor') {
					if (WTW.actionZones[i].status > 1) {
						zedoorstatus = 1;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('custom-elevatorDoorStatus=' + ex.message);
	}
	return zedoorstatus;
}

//need? -elevatorHeight- not currently in use
WTWJS.prototype.elevatorHeight = function(zconnectinggridind, zconnectinggridid) {
	var zeheight = 0;
	try {
		for (var i=0; i < WTW.actionZones.length; i++) {
			if (WTW.actionZones[i] != null) {
				if (zconnectinggridind == WTW.actionZones[i].connectinggridind && WTW.actionZones[i].actionzonetype == 'elevator') {
					var zactionzoneaxle = WTW.getMeshOrNodeByID(WTW.actionZones[i].moldname.replace('-actionzone-','-actionzoneaxle-'));
					if (zactionzoneaxle != null) {
						zeheight = zactionzoneaxle.position.y;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('custom-elevatorHeight=' + ex.message);
	}
	return zeheight;
}
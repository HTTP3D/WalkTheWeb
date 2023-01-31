/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are used to control and operate vehicles */

WTWJS.prototype.toggleStartVehicle = function(zpickedname) {
	try {
		
		if (WTW.animationSet == '') {
			WTW.animationSet = 'vehicle-boat';
//WTW.log('BOAT ON');
			var zconnectinggrid = WTW.getMoldConnectingGrid(zpickedname);
			WTW.drive = WTW.newDriveVehicle();
			WTW.drive.vehicletype = 'boat';
			WTW.drive.connectinggridname = zconnectinggrid.name; /* will have to use an instanceid for multiplayer */
			WTW.drive.vehicle = WTW.getMeshOrNodeByID(WTW.drive.connectinggridname);
			
//			WTW.drive.vehicle.showBoundingBox = false;
//			WTW.drive.vehicle.ellipsoid = new BABYLON.Vector3(10, 4, 5);
//			WTW.drive.vehicle.ellipsoidOffset = new BABYLON.Vector3(0, 4, 0);
//			WTW.drive.vehicle.checkCollisions = true;

		} else {
			WTW.animationSet = '';
			WTW.drive.vehicle = null;
			WTW.vehicleStopSpeed();
			WTW.vehicleStopTurn();
//WTW.log('BOAT OFF');
		}
	} catch (ex) {
		WTW.log('core-scripts-vehicles-wtw_vehicles.js-toggleStartVehicle=' + ex.message);
	}
}

WTWJS.prototype.setVehicleAnimation = function(zevent) {
	var zanimation = 'onwait';
	try {
		switch (zevent) {
			case 'onturnright':
			case 'onrunturnright':
				// set turn animation
				break;
			case 'onturnleft':
			case 'onrunturnleft':
				// set turn animation
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-vehicles-wtw_vehicles.js-setAnimation=' + ex.message);
	}
	return zanimation;
}

WTWJS.prototype.moveAvatarVehicle = function(zavatar, zkeyspressed) {
	try {
		if (WTW.keysPressed != null) {
			for (var k=0;k < WTW.keysPressed.length;k++) {
				if (WTW.keysPressed[k] != null) {
					let zanim = '';
					if (WTW.isNumeric(WTW.keysPressed[k])) {
						switch (WTW.keysPressed[k]) {
							case 32: //space jump
								if (WTW.shiftKey) {
									zanim = 'onrunjump';
								} else {
									zanim = 'onjump';
								}
								break;
							case 38: //arrow w forward
							case 87: //w forward
							case 1038: //arrow w forward (mouse scroll)
							case 2038: //arrow w forward
								if (WTW.shiftKey) {
									zanim = 'onrun';
								} else {
									zanim = 'onwalk';
								}
								WTW.keyPressedRemove(38);
								WTW.keyPressedRemove(87);
								WTW.keyPressedRemove(1038);
								WTW.keyPressedRemove(2038);
								break;
							case 40: //arrow s backwards
							case 83: //s backwards
							case 1040: //arrow s backwards (mouse scroll back)
							case 2040: //arrow s backwards
								if (WTW.shiftKey) {
									zanim = 'onrunbackwards';
								} else {
									zanim = 'onwalkbackwards';
								}
								WTW.keyPressedRemove(40);
								WTW.keyPressedRemove(83);
								WTW.keyPressedRemove(1040);
								WTW.keyPressedRemove(2040);
								break;
							case 37: //arrow q rotate left
							case 81: //q rotate left
							case 1037: //mouse rotate left
							case 2037: //mouse rotate left
								if (WTW.shiftKey) {
									zanim = 'onrunturnleft';
								} else {
									zanim = 'onturnleft';
								}
								break;
							case 39: //arrow e rotate right
							case 69: //e rotate right
							case 1039: //mouse rotate right
							case 2039: //mouse rotate right
								if (WTW.shiftKey) {
									zanim = 'onrunturnright';
								} else {
									zanim = 'onturnright';
								}
								break;
							case 65: //a strafe left
							case 1065: //mouse strafe left
							case 2065: //mouse strafe left
								if (WTW.shiftKey) {
									zanim = 'onrunstrafeleft';
								} else {
									zanim = 'onstrafeleft';
								}
								break;
							case 68: //d strafe right
							case 1068: //mouse strafe right
							case 2068: //mouse strafe right
								if (WTW.shiftKey) {
									zanim = 'onrunstraferight';
								} else {
									zanim = 'onstraferight';
								}
								break;
							case 82: //r rotate up
							case 1082: //mouse rotate up
								zanim = 'onrotateup';
								break;
							case 70: //f rotate down
							case 1070: //mouse rotate down
								zanim = 'onrotatedown';
								break;
							case 0: //pause animation
								zanim = 'onpause';
								break;
						} 
					} else {
						zanim = WTW.keysPressed[k];
					}
					switch (zanim) {
						case 'onwalk':
							WTW.changeVehicleSpeed(1,10);
							break;
						case 'onwalkbackwards':
							WTW.changeVehicleSpeed(1,-10);
							break;
						case 'onturnleft':
							WTW.changeVehicleTurn(-1);
							break;
						case 'onturnright':
							WTW.changeVehicleTurn(1);
							break;
					}
				}
			}
		}

	} catch (ex) {
		WTW.log('core-scripts-vehicles-wtw_vehicles.js-moveAvatarVehicle=' + ex.message);
	}
}

WTWJS.prototype.changeVehicleSpeed = function(zdir, zspeedchange) {
	try {
		/* zdir is 1 for forward, -1 for backwards, 0 for neutral (no force added) */

		if (WTW.drive.vehicle != null) {
			if (WTW.drive.autospeed != null) {
				window.clearInterval(WTW.drive.autospeed);
				WTW.drive.autospeed = null;
			}
			WTW.drive.applyspeed += zspeedchange;
			if (zdir == 1) {
				if (WTW.drive.applyspeed > 400) {
					WTW.drive.applyspeed = 400;
				} else if (WTW.drive.applyspeed < 0) {
					WTW.drive.applyspeed = 0;
					WTW.vehicleStopTurn();
				}
			} else if (zdir == -1) {
				if (WTW.drive.applyspeed < -50) {
					WTW.drive.applyspeed = -50;
				} else if (WTW.drive.applyspeed > 0) {
					WTW.drive.applyspeed = 0;
					WTW.vehicleStopTurn();
				}
			}


			
		}
		
/*
		zdrive = {
			'vehicle':null,
			'vehicletype':'boat',
			'connectinggridname':'',
			'instanceid':'',
			'applyturn':0,
			'currentturn':0,
			'applyspeed':0,
			'currentspeed':0,
			'currentdirection':0,
			'autoturn': null,
			'autospeed': null
		};

*/
		
	} catch (ex) {
		WTW.log('core-scripts-vehicles-wtw_vehicles.js-changeVehicleSpeed=' + ex.message);
	}
}

WTWJS.prototype.changeVehicleTurn = function(zturnchange) {
	try {
		/* zturnchange is the change in angle degree turn */
		if (WTW.drive.vehicle != null) {
			if (WTW.drive.autoturn != null) {
				window.clearInterval(WTW.drive.autoturn);
				WTW.drive.autoturn = null;
			}
			WTW.drive.applyturn += zturnchange;
			if (WTW.drive.applyturn > 25) {
				WTW.drive.applyturn = 25;
			} else if (WTW.drive.applyturn < -25) {
				WTW.drive.applyturn = -25;
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-vehicles-wtw_vehicles.js-changeVehicleTurn=' + ex.message);
	}
}

WTWJS.prototype.vehicleStopTurn = function() {
	try {
		if (WTW.drive != null) {
			if (WTW.drive.vehicle != null) {
				if (WTW.drive.applyturn != 0) {
					if (WTW.drive.autoturn != null) {
						window.clearInterval(WTW.drive.autoturn);
						WTW.drive.autoturn = null;
					}
					WTW.drive.autoturn = window.setInterval(function() {
						if (WTW.drive.applyturn != 0) {
							if (WTW.drive.applyturn > 0) {
								WTW.drive.applyturn -= 1;
							} else {
								WTW.drive.applyturn += 1;
							}
							if (WTW.myAvatar != null) {
								WTW.setMovingCameras(WTW.myAvatar);
							}
						} else {
							window.clearInterval(WTW.drive.autoturn);
							WTW.drive.autoturn = null;
						}
					}, 1);
					
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-vehicles-wtw_vehicles.js-vehicleStopTurn=' + ex.message);
	}
}

WTWJS.prototype.vehicleStopSpeed = function() {
	try {
		if (WTW.drive != null) {
			if (WTW.drive.vehicle != null) {
				if (WTW.drive.applyspeed != 0) {
					if (WTW.drive.autospeed != null) {
						window.clearInterval(WTW.drive.autospeed);
						WTW.drive.autospeed = null;
					}
					WTW.drive.autospeed = window.setInterval(function() {
						if (WTW.drive.applyspeed != 0) {
							if (WTW.drive.applyspeed > 0) {
								WTW.drive.applyspeed -= 1;
							} else {
								WTW.drive.applyspeed += 1;
							}
							if (WTW.myAvatar != null) {
								WTW.setMovingCameras(WTW.myAvatar);
							}
						} else {
							window.clearInterval(WTW.drive.autospeed);
							WTW.drive.autospeed = null;
						}
					}, 1);
					
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-vehicles-wtw_vehicles.js-vehicleStopSpeed=' + ex.message);
	}
}

WTWJS.prototype.vehicleRenderLoop = function() {
	try {
		if (WTW.drive != null) {
			if (WTW.drive.vehicle != null) {
				if (WTW.drive.applyspeed != 0) {
					var zstride = WTW.drive.applyspeed / WTW.fps;
					var zpitch = 0;
					if (WTW.drive.applyspeed > 0) {
						zpitch = WTW.drive.applyspeed / 30;
						if (zpitch > 16 && WTW.drive.applyspeed > 0) {
							zpitch = 16;
						}
					}
					WTW.drive.vehicle.rotation.y = WTW.getRadians(WTW.getDegrees(WTW.drive.vehicle.rotation.y) + (WTW.drive.applyturn/25));
					WTW.drive.vehicle.rotation.z = WTW.getRadians(-WTW.drive.applyturn * (WTW.drive.applyspeed / 400));
					
					WTW.drive.vehicle.position.y = zpitch / 2;
					WTW.drive.vehicle.rotation.x = -WTW.getRadians(zpitch);
					WTW.drive.vehicle.position.x += parseFloat(Math.sin(WTW.drive.vehicle.rotation.y)) * zstride; 
					WTW.drive.vehicle.position.z += parseFloat(Math.cos(WTW.drive.vehicle.rotation.y)) * zstride; 
					
					if (WTW.myAvatar != null) {
						WTW.setMovingCameras(WTW.myAvatar);
					}
				} else {
					WTW.drive.vehicle.position.y = 0;
					WTW.drive.vehicle.rotation.x = WTW.getRadians(0);
					WTW.drive.vehicle.rotation.z = WTW.getRadians(0);
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-vehicles-wtw_vehicles.js-vehicleRenderLoop=' + ex.message);
	}
}


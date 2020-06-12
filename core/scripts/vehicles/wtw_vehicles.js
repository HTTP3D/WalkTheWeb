WTWJS.prototype.toggleStartVehicle = function(zpickedname) {
	try {
		if (WTW.animationSet == "") {
			WTW.animationSet = "vehicle-boat";
WTW.log("BOAT ON");
			var zconnectinggrid = WTW.getMoldConnectingGrid(zpickedname);
			WTW.drive = WTW.newDriveVehicle();
			WTW.drive.vehicle = 'boat';
			WTW.drive.connectinggridname = zconnectinggrid.name; /* will have to use an instanceid for multiplayer */

		} else {
			WTW.animationSet = "";
WTW.log("BOAT OFF");
		}
	} catch (ex) {
		WTW.log("core-scripts-vehicles-wtw_vehicles.js-toggleStartVehicle=" + ex.message);
	}
}

WTWJS.prototype.setVehicleAnimation = function(zkey) {
	var zanimation = "onwait";
	try {
		switch (zkey) {
			case "onturnright":
			case "onrunturnright":
				// set turn animation
				break;
			case "onturnleft":
			case "onrunturnleft":
				// set turn animation
				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-vehicles-wtw_vehicles.js-setAnimation=" + ex.message);
	}
	return zanimation;
}

WTWJS.prototype.moveAvatarVehicle = function() {
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
							case 1038: //arrow w forward
							case 2038: //arrow w forward
								if (WTW.shiftKey) {
									zanim = 'onrun';
								} else {
									zanim = 'onwalk';
								}
								break;
							case 40: //arrow s backwards
							case 83: //s backwards
							case 1040: //arrow s backwards
							case 2040: //arrow s backwards
								if (WTW.shiftKey) {
									zanim = 'onrunbackwards';
								} else {
									zanim = 'onwalkbackwards';
								}
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
						case "onwalk":
							
							break;
						case "onwalkbackwards":
							
							break;
					}
					
					
				}
			}
		}

	} catch (ex) {
		WTW.log("core-scripts-vehicles-wtw_vehicles.js-moveAvatarVehicle=" + ex.message);
	}
}

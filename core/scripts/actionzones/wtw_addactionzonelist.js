WTWJS.prototype.getActionZoneList = function() {
	var actionzonelist = null;
	actionzonelist = [];
	try {
		actionzonelist[actionzonelist.length] = {"name":"Load Zone","helpurl":"https://www.walktheweb.com/wiki/load-zone-action-zones/"};
		actionzonelist[actionzonelist.length] = {"name":"Sliding Door","helpurl":"https://www.walktheweb.com/wiki/sliding-doors-action-zones/"};
		actionzonelist[actionzonelist.length] = {"name":"Swinging Door","helpurl":"https://www.walktheweb.com/wiki/swinging-doors-action-zone/"};
		actionzonelist[actionzonelist.length] = {"name":"Click Activated Sliding Door","helpurl":""};
		actionzonelist[actionzonelist.length] = {"name":"Rotate","helpurl":""};
/*		actionzonelist[actionzonelist.length] = {"name":"Seat","helpurl":""}; */
		/* currently in testing or under development */
/*		actionzonelist[actionzonelist.length] = {"name":"Mirror","helpurl":""}; 
		actionzonelist[actionzonelist.length] = {"name":"Ride Along","helpurl":""};
		actionzonelist[actionzonelist.length] = {"name":"Elevator","helpurl":""};
		actionzonelist[actionzonelist.length] = {"name":"People Mover","helpurl":""};
		actionzonelist[actionzonelist.length] = {"name":"Passenger Seat","helpurl":""};
		actionzonelist[actionzonelist.length] = {"name":"Driver Seat","helpurl":""};
		actionzonelist[actionzonelist.length] = {"name":"Driver Turn Angle","helpurl":""};
		actionzonelist[actionzonelist.length] = {"name":"Driver Turning Wheel","helpurl":""};
		actionzonelist[actionzonelist.length] = {"name":"Driver Wheel","helpurl":""}; */
		WTW.clearDDL('wtw_tactionzonetypelist');
		dGet("wtw_actionzonesbuttonlist").innerHTML = "";
		for (var i=0;i < actionzonelist.length;i++) {
			if (actionzonelist[i] != null) {
				var actionzonevalue = actionzonelist[i].name.toLowerCase();
				while (actionzonevalue.indexOf(" ") > -1) {
					actionzonevalue = actionzonevalue.replace(" ","");
				}
				if (actionzonelist[i].helpurl != "") {
					dGet("wtw_actionzonesbuttonlist").innerHTML += "<a href=\"" + actionzonelist[i].helpurl + "\" title=\"Help\" alt=\"Help\" class=\"wtw-helplink\" target=\"_blank\" onclick=\"WTW.blockPassThrough();\">?</a>";
				}
				dGet("wtw_actionzonesbuttonlist").innerHTML += "<div id=\"wtw_baddzones" + actionzonevalue + "\" name=\"wtw_baddzones" + actionzonevalue + "\" onclick=\"WTW.openActionZoneForm('" + actionzonevalue + "');\" style='cursor: pointer;' class='wtw-menulevel2'>" + actionzonelist[i].name + "</div>\r\n";
				var option = document.createElement("option");
				option.text = actionzonelist[i].name;
				option.value = actionzonevalue;
				dGet('wtw_tactionzonetypelist').add(option);
			}
		}		
		
	} catch (ex) {
		WTW.log("core-scripts-actionzones-addactionzonelist\r\n getActionZoneList=" + ex.message);
	} 
	return actionzonelist;
}

WTWJS.prototype.addActionZone = function(actionzonename, actionzonedef) {
	var actionzone = null;
	try {
		var actionzoneind = -1;
		if (WTW.isNumeric(actionzonedef.actionzoneind)) {
			actionzoneind = Number(actionzonedef.actionzoneind);
		}
		actionzone = scene.getMeshByID(actionzonename);
		if (actionzone == null) {
			if (WTW.actionZones[actionzoneind] != null) {
				var axispositionx = Number(actionzonedef.axis.position.x);
				var axispositiony = Number(actionzonedef.axis.position.y);
				var axispositionz = Number(actionzonedef.axis.position.z);
				var parentactionzoneind = -1;
				var parentactionzone = null;
				var actionzoneparent = WTW.actionZones[actionzoneind].parentname;
				if (WTW.actionZones[actionzoneind].parentactionzoneid != "") {
					parentactionzoneind = WTW.getActionZoneInd(WTW.actionZones[actionzoneind].parentactionzoneid, WTW.actionZones[actionzoneind].connectinggridind);
					if (parentactionzoneind > -1) {
						if (WTW.actionZones[parentactionzoneind] != null) {
							var parentactionzonename = "actionzone-" + parentactionzoneind.toString() + "-" + WTW.actionZones[parentactionzoneind].actionzoneid + "-" + WTW.actionZones[parentactionzoneind].connectinggridind + "-" + WTW.actionZones[parentactionzoneind].connectinggridid + "-" + WTW.actionZones[parentactionzoneind].actionzonetype;
							var parentactionzone = scene.getMeshByID(parentactionzonename);
							if (parentactionzone == null) {
								parentactionzone = WTW.addActionZone(parentactionzonename, WTW.actionZones[parentactionzoneind]);
							}
							WTW.actionZones[actionzoneind].parentname = "actionzoneaxlebase2-" + parentactionzoneind.toString() + "-" + WTW.actionZones[parentactionzoneind].actionzoneid + "-" + WTW.actionZones[parentactionzoneind].connectinggridind + "-" + WTW.actionZones[parentactionzoneind].connectinggridid + "-" + WTW.actionZones[parentactionzoneind].actionzonetype;
							
						}
					}
				}
				if (parentactionzone != null) {
					var parentactionzoneaxlebasename = "actionzoneaxlebase-" + parentactionzoneind.toString() + "-" + WTW.actionZones[parentactionzoneind].actionzoneid + "-" + WTW.actionZones[parentactionzoneind].connectinggridind + "-" + WTW.actionZones[parentactionzoneind].connectinggridid + "-" + WTW.actionZones[parentactionzoneind].actionzonetype;
					var parentactionzoneaxlebase2name = "actionzoneaxlebase2-" + parentactionzoneind.toString() + "-" + WTW.actionZones[parentactionzoneind].actionzoneid + "-" + WTW.actionZones[parentactionzoneind].connectinggridind + "-" + WTW.actionZones[parentactionzoneind].connectinggridid + "-" + WTW.actionZones[parentactionzoneind].actionzonetype;
					var parentactionzoneaxlebase = scene.getMeshByID(parentactionzoneaxlebasename);
					actionzonedef.axis.position.x -= (parentactionzoneaxlebase.position.x);
					actionzonedef.axis.position.y -= (parentactionzoneaxlebase.position.y);
					actionzonedef.axis.position.z -= (parentactionzoneaxlebase.position.z);
					actionzonedef.position.x -= (parentactionzoneaxlebase.position.x);
					actionzonedef.position.y -= (parentactionzoneaxlebase.position.y);
					actionzonedef.position.z -= (parentactionzoneaxlebase.position.z);
					actionzonedef.parentname = parentactionzoneaxlebase2name;
				}
				var actionzonetype = actionzonedef.actionzonetype.toLowerCase();
				while (actionzonetype.indexOf(" ") > -1) {
					actionzonetype = actionzonetype.replace(" ","");
				}
				switch (actionzonetype) {
					case "loadzone":
						actionzone = WTW.addActionzoneLoadzone(actionzonename, actionzoneind, actionzonedef);
						break;
					case "slidingdoor":
						actionzone = WTW.addActionzoneSlidingDoor(actionzonename, actionzoneind, actionzonedef);
						break;
					case "swingingdoor":
						actionzone = WTW.addActionzoneSwingingDoor(actionzonename, actionzoneind, actionzonedef);
						break;
					case "clickactivatedslidingdoor":
						actionzone = WTW.addActionzoneClickSlidingDoor(actionzonename, actionzoneind, actionzonedef);
						break;
					case "seat":
						actionzone = WTW.addActionzoneSeat(actionzonename, actionzoneind, actionzonedef);
						break;
					case "mirror":
						actionzone = WTW.addActionzoneMirror(actionzonename, actionzoneind, actionzonedef);
						break; 
					case "ridealong":
						actionzone = WTW.addActionzoneRidealong(actionzonename, actionzoneind, actionzonedef);
						break;
					case "rotate":
						actionzone = WTW.addActionzoneRotate(actionzonename, actionzoneind, actionzonedef);
						break;
					case "peoplemover":
						actionzone = WTW.addActionzonePeoplemover(actionzonename, actionzoneind, actionzonedef);
						break;
					case "elevator":
						actionzone = WTW.addActionzoneElevator(actionzonename, actionzoneind, actionzonedef);
						break;
					case "passengerseat":
						actionzone = WTW.addActionzonePassengerSeat(actionzonename, actionzoneind, actionzonedef);
						break;
					case "driverseat":
						actionzone = WTW.addActionzoneDriverSeat(actionzonename, actionzoneind, actionzonedef);
						break;
					case "driverturnangle":
						actionzone = WTW.addActionzoneDriverTurnAngle(actionzonename, actionzoneind, actionzonedef);
						break;
					case "driverturningwheel":
						actionzone = WTW.addActionzoneDriverTurningWheel(actionzonename, actionzoneind, actionzonedef);
						break;
					case "driverwheel":
						actionzone = WTW.addActionzoneDriverWheel(actionzonename, actionzoneind, actionzonedef);
						break;
					default:
						actionzone = WTW.addActionzoneLoadzone(actionzonename, actionzoneind, actionzonedef);
						break;
				}
			}
		} else {
			if (WTW.actionZones[actionzoneind] != null) {
				WTW.actionZones[actionzoneind].shown = "2";
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-actionzones-addactionzonelist\r\n addActionZone=" + ex.message);
	} 
	return actionzone;
}

WTWJS.prototype.setNewActionZoneDefaults = function(actionzonetype) {
	try {
		var coords = WTW.getNewCoordinates(50);
		var positionX = coords.positionX;
		var positionY = coords.positionY;
		var positionZ = coords.positionZ;
		var rotationY = coords.rotationY;
		if (thingid != "") {
			positionX = "0.00";
			positionZ = "0.00";
		}
		actionzonetype = actionzonetype.toLowerCase();
		while (actionzonetype.indexOf(" ") > -1) {
			actionzonetype = actionzonetype.replace(" ","");
		}
		dGet('wtw_tactionzonetype').value = actionzonetype;
		dGet('wtw_tactionzoneshape').value = "box";
		dGet('wtw_taxispositionx').value = positionX; //.toFixed(2);
		dGet('wtw_taxispositiony').value = positionY; //.toFixed(2);
		dGet('wtw_taxispositionz').value = positionZ; //.toFixed(2);
		dGet('wtw_taxisscalingx').value = "0.20";
		dGet('wtw_taxisscalingy').value = "0.20";
		dGet('wtw_taxisscalingz').value = "20.00";
		dGet('wtw_taxisrotationx').value = "0.00";
		dGet('wtw_taxisrotationy').value = rotationY; //.toFixed(2);
		dGet('wtw_taxisrotationz').value = "0.00";
		dGet('wtw_tactionzoneposx').value = positionX; //.toFixed(2);
		dGet('wtw_tactionzoneposy').value = positionY; //.toFixed(2);
		dGet('wtw_tactionzoneposz').value = positionZ; //.toFixed(2);
		dGet('wtw_tactionzonescalingx').value = "20.00";
		dGet('wtw_tactionzonescalingy').value = "20.00";
		dGet('wtw_tactionzonescalingz').value = "20.00";
		dGet('wtw_tactionzonerotx').value = "0.00";
		dGet('wtw_tactionzoneroty').value = "0.00";
		dGet('wtw_tactionzonerotz').value = "0.00";
		dGet('wtw_tactionzonerotateaxis').value = "y";
		dGet('wtw_tactionzonerotatedegrees').value = "90";
		dGet('wtw_tactionzonemovementtype').value = "";
		dGet('wtw_tactionzonejsfunction').value = "";
		dGet('wtw_tactionzonejsparameters').value = "";
		dGet('wtw_tactionzonerotatespeed').value = "0.00";
		dGet('wtw_tcopyaxletoactionzone').checked = true;
		switch (actionzonetype) {
			case "loadzone":
				dGet('wtw_tactionzonename').value = "Custom - Load Zone";
				break;
			case "slidingdoor":
				dGet('wtw_tactionzonename').value = "New Sliding Door";
				dGet('wtw_tactionzonemovementtype').value = "slide";
				break;
			case "swingingdoor":
				dGet('wtw_tactionzonename').value = "New Swinging Door";
				dGet('wtw_taxisscalingx').value = "0.20";
				dGet('wtw_taxisscalingy').value = "20.00";
				dGet('wtw_taxisscalingz').value = "0.20";
				dGet('wtw_taxisrotationy').value = "0.00";
				dGet('wtw_tactionzonerotatespeed').value = "10.00";
				dGet('wtw_tactionzonemovementtype').value = "swing";
				break;
			case "clickactivatedslidingdoor":
				dGet('wtw_tactionzonename').value = "New Click Sliding Door";
				dGet('wtw_tactionzonemovementtype').value = "slide";
				break;
			case "seat":
				dGet('wtw_tactionzonename').value = "New Seat";
				dGet('wtw_tactionzonescalingx').value = "4.00";
				dGet('wtw_tactionzonescalingy').value = "1.00";
				dGet('wtw_tactionzonescalingz').value = "4.00";
				break;
			case "mirror":
				dGet('wtw_tactionzonename').value = "New Mirror Zone";
				break; 
			case "ridealong":
				dGet('wtw_tactionzonename').value = "New Ride Along Zone";
				break;
			case "rotate":
				dGet('wtw_tactionzonename').value = "New Rotate Zone";
				dGet('wtw_taxisscalingx').value = "0.20";
				dGet('wtw_taxisscalingy').value = "20.00";
				dGet('wtw_taxisscalingz').value = "0.20";
				dGet('wtw_taxisrotationy').value = "0.00";
				dGet('wtw_tactionzonerotatespeed').value = "1.00";
				dGet('wtw_tactionzonemovementtype').value = "rotate";
				break;
			case "peoplemover":
				dGet('wtw_tactionzonename').value = "New People Mover Zone";
				dGet('wtw_tactionzonemovementtype').value = "slide";
				break;
			case "elevator":
				dGet('wtw_tactionzonename').value = "New Elevator Zone";
				dGet('wtw_tactionzonemovementtype').value = "slide";
				break;
			case "passengerseat":
				dGet('wtw_tactionzonename').value = "New Passenger Seat";
				break;
			case "driverseat":
				dGet('wtw_tactionzonename').value = "New Driver Seat";
				break;
			case "driverturnangle":
				dGet('wtw_tactionzonename').value = "New Driver Turn Angle";
				break;
			case "driverturningwheel":
				dGet('wtw_tactionzonename').value = "New Driver Turning Wheel";
				break;
			case "driverwheel":
				dGet('wtw_tactionzonename').value = "New Driver Wheel";
				break;
			default:
				dGet('wtw_tactionzonename').value = "New Action Zone";
				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-actionzones-addactionzonelist\r\n setNewActionZoneDefaults=" + ex.message);
	} 
}

WTWJS.prototype.setActionZoneFormFields = function(actionzonetype) {
	try {
		actionzonetype = actionzonetype.toLowerCase();
		while (actionzonetype.indexOf(" ") > -1) {
			actionzonetype = actionzonetype.replace(" ","");
		}
		WTW.hide('wtw_actionzoneswingdoordiv');
		WTW.hide('wtw_actionzonemovementdistancediv');
		WTW.hide('wtw_actionzonerotatespeeddiv');
		WTW.hide('wtw_actionzoneadvancedopts');
		WTW.hide('wtw_attachactionzonediv');
		dGet('wtw_tcopyaxletoactionzone').disabled = false;
		dGet('wtw_axispositiontitle').innerHTML = "Axis Position";
		dGet('wtw_axisrotationtitle').innerHTML = "Axis Rotation";
		WTW.show('wtw_actionzonesizediv');
		WTW.show('wtw_axisrotationy');
		WTW.showInline('wtw_swingdistancedegreesdiv');
		WTW.show('wtw_actionzonesettingsdiv');
		WTW.show('wtw_actionzoneaxisdiv');
		WTW.show('wtw_copyaxletoactionzonediv');
		WTW.show('wtw_actionzoneadvancedoptslink');
		WTW.show('wtw_actionzonepartsdiv');
		WTW.show('wtw_actionzonepartsdivlabel');
		switch (actionzonetype) {
			case "loadzone":
				WTW.hide('wtw_actionzoneaxisdiv');
				WTW.hide('wtw_copyaxletoactionzonediv');
				WTW.hide('wtw_actionzoneadvancedoptslink');
				WTW.hide('wtw_actionzonepartsdiv');
				dGet('wtw_editactionzoneformtitle').innerHTML = "Add Load Zone";
				dGet('wtw_tcopyaxletoactionzone').disabled = true;
				WTW.show('wtw_actionzoneadvancedopts');
				break;
			case "slidingdoor":
				dGet('wtw_editactionzoneformtitle').innerHTML = "Add Sliding Door";				
				WTW.show('wtw_actionzonemovementdistancediv');
				break;
			case "swingingdoor":
				WTW.hide('wtw_axisrotationy');
				dGet('wtw_editactionzoneformtitle').innerHTML = "Add Swinging Door";
				dGet('wtw_swingdistancediv').innerHTML = "Swing Distance";
				WTW.show('wtw_actionzoneswingdoordiv');
				WTW.show('wtw_rotatedirectiondiv');
				WTW.show('wtw_actionzonerotatespeeddiv');
				break;
			case "clickactivatedslidingdoor":
				dGet('wtw_editactionzoneformtitle').innerHTML = "Add Click Sliding Door";				
				WTW.show('wtw_actionzonemovementdistancediv');
				break;
			case "seat":
				WTW.hide('wtw_actionzonesizediv');
				WTW.hide('wtw_actionzoneaxisdiv');
				WTW.hide('wtw_copyaxletoactionzonediv');
				WTW.hide('wtw_actionzoneadvancedoptslink');
				dGet('wtw_editactionzoneformtitle').innerHTML = "Add Seat";
				dGet('wtw_tcopyaxletoactionzone').disabled = true;
				WTW.show('wtw_actionzoneadvancedopts');
				WTW.show('wtw_actionzonepartsdiv');
				break;
			case "mirror":
				dGet('wtw_editactionzoneformtitle').innerHTML = "Add Mirror Zone";
				break; 
			case "ridealong":
				WTW.hide('wtw_copyaxletoactionzonediv');
				WTW.hide('wtw_actionzoneadvancedoptslink');
				WTW.hide('wtw_actionzoneaxisdiv');
				WTW.hide('wtw_actionzonemovementdistancediv');
				dGet('wtw_editactionzoneformtitle').innerHTML = "Add Ride Along Zone";
				WTW.show('wtw_actionzoneadvancedopts');
				break;
			case "rotate":
				WTW.hide('wtw_axisrotationy');
				WTW.hide('wtw_actionzonesettingsdiv');
				WTW.hide('wtw_actionzoneadvancedoptslink');
				WTW.hide('wtw_actionzoneadvancedopts');
				dGet('wtw_editactionzoneformtitle').innerHTML = "Add Rotation Zone";
				dGet('wtw_tcopyaxletoactionzone').disabled = true;
				dGet('wtw_tcopyaxletoactionzone').checked = true;
				WTW.show('wtw_actionzonerotatespeeddiv');
				break;
			case "peoplemover":
				dGet('wtw_editactionzoneformtitle').innerHTML = "Add People Mover Zone";
				WTW.show('wtw_actionzonemovementdistancediv');
				break;
			case "elevator":
				dGet('wtw_editactionzoneformtitle').innerHTML = "Add Elevator Zone";
				WTW.show('wtw_actionzonemovementdistancediv');
				break;
			case "passengerseat":
				WTW.hide('wtw_actionzoneadvancedoptslink');
				WTW.hide('wtw_actionzonepartsdivlabel');
				dGet('wtw_editactionzoneformtitle').innerHTML = "Add Passenger Seat";
				dGet('wtw_axispositiontitle').innerHTML = "Camera Position";
				dGet('wtw_axisrotationtitle').innerHTML = "Camera Rotation";
				WTW.show('wtw_actionzoneadvancedopts');
				WTW.show('wtw_attachactionzonediv');
				break;
			case "driverseat":
				WTW.hide('wtw_actionzoneadvancedoptslink');
				WTW.hide('wtw_actionzonepartsdivlabel');
				dGet('wtw_editactionzoneformtitle').innerHTML = "Add Driver Seat";
				dGet('wtw_axispositiontitle').innerHTML = "Camera Position";
				dGet('wtw_axisrotationtitle').innerHTML = "Camera Rotation";
				WTW.show('wtw_actionzoneadvancedopts');
				WTW.show('wtw_attachactionzonediv');
				break;
			case "driverturnangle":
				WTW.hide('wtw_rotatedirectiondiv');
				WTW.hide('wtw_swingdistancedegreesdiv');
				dGet('wtw_editactionzoneformtitle').innerHTML = "Add Driver Turn Angle";
				dGet('wtw_swingdistancediv').innerHTML = "Rotation Factor (0-6)";
				WTW.show('wtw_actionzoneswingdoordiv');
				WTW.show('wtw_axisrotationy');
				break;
			case "driverturningwheel":
				WTW.hide('wtw_rotatedirectiondiv');
				WTW.hide('wtw_swingdistancedegreesdiv');
				dGet('wtw_editactionzoneformtitle').innerHTML = "Add Driver Turning Wheel";
				dGet('wtw_swingdistancediv').innerHTML = "Rotation Factor (0-6)";
				WTW.show('wtw_actionzoneswingdoordiv');
				WTW.show('wtw_axisrotationy');
				break;
			case "driverwheel":
				WTW.hide('wtw_rotatedirectiondiv');
				WTW.hide('wtw_swingdistancedegreesdiv');
				dGet('wtw_editactionzoneformtitle').innerHTML = "Add Driver Wheel";
				dGet('wtw_swingdistancediv').innerHTML = "Rotation Factor (0-6)";
				WTW.show('wtw_actionzoneswingdoordiv');
				WTW.show('wtw_axisrotationy');
				break;
			default:
				dGet('wtw_editactionzoneformtitle').innerHTML = "Add Action Zone";
				break;
		}	
	} catch (ex) {
		WTW.log("core-scripts-actionzones-addactionzonelist\r\n setActionZoneFormFields=" + ex.message);
	}
}

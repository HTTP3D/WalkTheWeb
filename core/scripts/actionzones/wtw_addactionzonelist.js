/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions set the types of action zones to add and define the default values, form fields, and functions to create the action zones */

WTWJS.prototype.getActionZoneList = function() {
	/* populates the new action zone list types drop down */
	var zactionzonelist = null;
	zactionzonelist = [];
	try {
		zactionzonelist[zactionzonelist.length] = {'name':'Load Zone','helpurl':'https://www.walktheweb.com/wiki/load-zone-action-zones/', 'defaulteditform':'0'};
		zactionzonelist[zactionzonelist.length] = {'name':'Unload Zone','helpurl':'https://www.walktheweb.com/wiki/load-zone-action-zones/', 'defaulteditform':'0'};
		zactionzonelist[zactionzonelist.length] = {'name':'Sliding Door','helpurl':'https://www.walktheweb.com/wiki/sliding-doors-action-zones/', 'defaulteditform':'0'};
		zactionzonelist[zactionzonelist.length] = {'name':'Swinging Door','helpurl':'https://www.walktheweb.com/wiki/swinging-doors-action-zone/', 'defaulteditform':'0'};
		zactionzonelist[zactionzonelist.length] = {'name':'Click Activated Sliding Door','helpurl':'', 'defaulteditform':'0'};
		zactionzonelist[zactionzonelist.length] = {'name':'Rotate','helpurl':'', 'defaulteditform':'0'};
		zactionzonelist[zactionzonelist.length] = {'name':'Load Animations','helpurl':'', 'defaulteditform':'0'};
		zactionzonelist[zactionzonelist.length] = {'name':'Ride Along','helpurl':'', 'defaulteditform':'0'};
		zactionzonelist[zactionzonelist.length] = {'name':'Teleport Zone','helpurl':'', 'defaulteditform':'0'};
		zactionzonelist[zactionzonelist.length] = {'name':'Spawn Zone','helpurl':'', 'defaulteditform':'0'};
/* the following are works in progress and conceptual ideas */
/*		zactionzonelist[zactionzonelist.length] = {'name':'Seat','helpurl':'', 'defaulteditform':'0'}; */
		/* currently in testing or under development */
/*		zactionzonelist[zactionzonelist.length] = {'name':'Mirror','helpurl':'', 'defaulteditform':'0'}; 
		zactionzonelist[zactionzonelist.length] = {'name':'Elevator','helpurl':'', 'defaulteditform':'0'};
		zactionzonelist[zactionzonelist.length] = {'name':'People Mover','helpurl':'', 'defaulteditform':'0'};
		zactionzonelist[zactionzonelist.length] = {'name':'Passenger Seat','helpurl':'', 'defaulteditform':'0'};
		zactionzonelist[zactionzonelist.length] = {'name':'Driver Seat','helpurl':'', 'defaulteditform':'0'};
		zactionzonelist[zactionzonelist.length] = {'name':'Driver Turn Angle','helpurl':'', 'defaulteditform':'0'};
		zactionzonelist[zactionzonelist.length] = {'name':'Driver Turning Wheel','helpurl':'', 'defaulteditform':'0'};
		zactionzonelist[zactionzonelist.length] = {'name':'Driver Wheel','helpurl':'', 'defaulteditform':'0'}; */
		zactionzonelist = WTW.pluginsActionZones(zactionzonelist);
		/* clear drop down list before reloading */
		WTW.clearDDL('wtw_tactionzonetypelist');
		/* besides the drop down, there is also a list of buttons to add an action zone */
		dGet('wtw_actionzonesbuttonlist').innerHTML = '';
		for (var i=0;i < zactionzonelist.length;i++) {
			if (zactionzonelist[i] != null) {
				if (zactionzonelist[i].defaulteditform == undefined) {
					zactionzonelist[i].defaulteditform = '0';
				}
				if (zactionzonelist[i].defaulteditform == '0') {
					var zactionzonevalue = zactionzonelist[i].name.toLowerCase();
					while (zactionzonevalue.indexOf(' ') > -1) {
						zactionzonevalue = zactionzonevalue.replace(' ','');
					}
					if (zactionzonelist[i].helpurl != '') {
						dGet('wtw_actionzonesbuttonlist').innerHTML += "<a href='" + zactionzonelist[i].helpurl + "' title='Help' alt='Help' class='wtw-helplink' target='_blank'>?</a>";
					}
					dGet('wtw_actionzonesbuttonlist').innerHTML += "<div id='wtw_baddzones" + zactionzonevalue + "' name='wtw_baddzones" + zactionzonevalue + "' onclick=\"WTW.openActionZoneForm('" + zactionzonevalue + "');\" class='wtw-menulevel2'>" + zactionzonelist[i].name + "</div>\r\n";
					/* option for drop down list */
					var zoption = document.createElement('option');
					zoption.text = zactionzonelist[i].name;
					zoption.value = zactionzonevalue;
					dGet('wtw_tactionzonetypelist').add(zoption);
				}
			}
		}		
		
	} catch (ex) {
		WTW.log('core-scripts-actionzones-addactionzonelist\r\n getActionZoneList=' + ex.message);
	} 
	return zactionzonelist;
}

WTWJS.prototype.addActionZone = function(zactionzonename, zactionzonedef) {
	/* function selects which function will create the action zone - by actionzonetype */
	var zactionzone = null;
	try {
		var zactionzoneind = -1;
		if (WTW.isNumeric(zactionzonedef.actionzoneind)) {
			zactionzoneind = Number(zactionzonedef.actionzoneind);
		}
		zactionzone = WTW.getMeshOrNodeByID(zactionzonename);
		/* only create if action zone is not already in the scene (by unique zactionzonename) */
		if (zactionzone == null) {
			if (WTW.actionZones[zactionzoneind] != null) {
				/* some action zones require position adjustments based on parent mold */
				var zparentactionzoneind = -1;
				var zparentactionzone = null;
				if (WTW.actionZones[zactionzoneind].parentactionzoneid != '') {
					zparentactionzoneind = WTW.getActionZoneInd(WTW.actionZones[zactionzoneind].parentactionzoneid, WTW.actionZones[zactionzoneind].connectinggridind);
					if (zparentactionzoneind > -1) {
						if (WTW.actionZones[zparentactionzoneind] != null) {
							var zparentactionzonename = WTW.actionZones[zparentactionzoneind].moldname;
							var zparentactionzone = WTW.getMeshOrNodeByID(zparentactionzonename);
							if (zparentactionzone == null) {
								zparentactionzone = WTW.addActionZone(zparentactionzonename, WTW.actionZones[zparentactionzoneind]);
							}
							WTW.actionZones[zactionzoneind].parentname = WTW.actionZones[zparentactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlebase2-');
						}
					}
				}
				if (zparentactionzone != null) {
					var zparentactionzoneaxlebasename = WTW.actionZones[zparentactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlebase-');
					var zparentactionzoneaxlebase2name = WTW.actionZones[zparentactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlebase2-'); 
					var zparentactionzoneaxlebase = WTW.getMeshOrNodeByID(zparentactionzoneaxlebasename);
					zactionzonedef.axis.position.x -= (zparentactionzoneaxlebase.position.x);
					zactionzonedef.axis.position.y -= (zparentactionzoneaxlebase.position.y);
					zactionzonedef.axis.position.z -= (zparentactionzoneaxlebase.position.z);
					zactionzonedef.position.x -= (zparentactionzoneaxlebase.position.x);
					zactionzonedef.position.y -= (zparentactionzoneaxlebase.position.y);
					zactionzonedef.position.z -= (zparentactionzoneaxlebase.position.z);
					zactionzonedef.parentname = zparentactionzoneaxlebase2name;
				}
				/* all action zone types are converted to lowercase and no spaces for the type comparison */ 
				var zactionzonetype = zactionzonedef.actionzonetype.toLowerCase();
				while (zactionzonetype.indexOf(' ') > -1) {
					zactionzonetype = zactionzonetype.replace(' ','');
				}
				/* select proper function to create the action zone based on zactionzonetype */
				/* action zones are designed to trigger an animation or javascript event onload, onclick, on avatar in zone, etc... */
				switch (zactionzonetype) {
					case 'loadzone':
						/* load zone = shape often box by default - triggers molds to load when your avatar enters the load zone */
						zactionzone = WTW.addActionzoneLoadzone(zactionzonename, zactionzoneind, zactionzonedef);
						break;
					case 'unloadzone':
						/* load zone = shape often box by default - triggers molds to load when your avatar enters the load zone */
						zactionzone = WTW.addActionzoneUnloadzone(zactionzonename, zactionzoneind, zactionzonedef);
						break;
					case 'loadanimations':
						/* load animations = shape often box by default - triggers to load avatar animations to your avatar when it enters the zone */
						zactionzone = WTW.addActionzoneLoadAnimations(zactionzonename, zactionzoneind, zactionzonedef);
						break;
					case 'teleportzone':
						/* load animations = shape often box by default - triggers to load avatar animations to your avatar when it enters the zone */
						zactionzone = WTW.addActionzoneTeleportZone(zactionzonename, zactionzoneind, zactionzonedef);
						break;
					case 'spawnzone':
						/* load animations = shape often box by default - triggers to load avatar animations to your avatar when it enters the zone */
						zactionzone = WTW.addActionzoneSpawnZone(zactionzonename, zactionzoneind, zactionzonedef);
						break;
					case 'slidingdoor':
						/* sliding door zone = shape often box by default - triggers molds to move in a defined axis direction when any avatar enters the zone */
						zactionzone = WTW.addActionzoneSlidingDoor(zactionzonename, zactionzoneind, zactionzonedef);
						break;
					case 'swingingdoor':
						/* swinging door zone = shape often box by default - triggers molds to move in a rotation around a defined axis direction when any avatar enters the zone */
						zactionzone = WTW.addActionzoneSwingingDoor(zactionzonename, zactionzoneind, zactionzonedef);
						break;
					case 'clickactivatedslidingdoor':
						/* click to sliding door zone = (work in progress) selected mold to click - triggers molds to move in a defined axis direction when any avatar enters the zone */
						zactionzone = WTW.addActionzoneClickSlidingDoor(zactionzonename, zactionzoneind, zactionzonedef);
						break;
					case 'mirror':
						/* mirror - (work in progress) molds in this zone will automatically have a reflection in the mirrored surface of a selected mold */
						zactionzone = WTW.addActionzoneMirror(zactionzonename, zactionzoneind, zactionzonedef);
						break; 
					case 'ridealong':
						/* ridealong - (work in progress) shape often box by default - attaches to a parent mold and moves with the parent mold - any avatar in the zone will automatically parent and move with the parent mold - picture a ride on a boat where the avatar can still walk around the boat */
						zactionzone = WTW.addActionzoneRidealong(zactionzonename, zactionzoneind, zactionzonedef);
						break;
					case 'rotate':
						/* rotate - rotating axle that molds can be attached so that they rotate around the selected axle */
						zactionzone = WTW.addActionzoneRotate(zactionzonename, zactionzoneind, zactionzonedef);
						break;
					case 'peoplemover':
						/* people mover - (work in progress) shape often box by default - when avatar is in the zone they will move at a defined pace in a direction of the axis. This is useful for things like moving sidewalks, elevators, and escalators. */
						zactionzone = WTW.addActionzonePeoplemover(zactionzonename, zactionzoneind, zactionzonedef);
						break;
					case 'elevator':
						/* elevator - (work in progress) shape often box by default - extenson of people mover to include button activated moves, timing with doors, and stopping movement on floors */
						zactionzone = WTW.addActionzoneElevator(zactionzonename, zactionzoneind, zactionzonedef);
						break;
					case 'seat':
						/* seat - (work in progress) selected mold to click - trigers an animation of your avatar to move in front of the seat and sit */
						zactionzone = WTW.addActionzoneSeat(zactionzonename, zactionzoneind, zactionzonedef);
						break;
					case 'passengerseat':
						/* passengerseat - (work in progress) combo of seat and ridealong - seat functionality with the addition of parenting to mold for ridealong movement */
						zactionzone = WTW.addActionzonePassengerSeat(zactionzonename, zactionzoneind, zactionzonedef);
						break;
					case 'driverseat':
						/* driverseat - (work in progress) seat expansion with heads up display for driving, animations for steering, and ridealong */
						zactionzone = WTW.addActionzoneDriverSeat(zactionzonename, zactionzoneind, zactionzonedef);
						break;
					case 'driverturnangle':
						/* driverturnangle - (work in progress) axis used as a parent mold for any mold that should rotate with the driver turning angle */
						zactionzone = WTW.addActionzoneDriverTurnAngle(zactionzonename, zactionzoneind, zactionzonedef);
						break;
					case 'driverturningwheel':
						/* driverturningwheel - (work in progress) axis used as a parent mold for any mold that should rotate with the driver turning angle with the additional rotation of movement tires */
						zactionzone = WTW.addActionzoneDriverTurningWheel(zactionzonename, zactionzoneind, zactionzonedef);
						break;
					case 'driverwheel':
						/* driverwheel - (work in progress) rotation of movement tires tied to the acceleration */
						zactionzone = WTW.addActionzoneDriverWheel(zactionzonename, zactionzoneind, zactionzonedef);
						break;
					default:
						/* this function is the hook so that plugins can define their own action zones */
						zactionzone = WTW.pluginsAddActionZones(zactionzonetype, zactionzonename, zactionzoneind, zactionzonedef);
						break;
				}
			}
		} else {
			if (WTW.actionZones[zactionzoneind] != null) {
				WTW.actionZones[zactionzoneind].shown = '2';
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-actionzones-addactionzonelist\r\n addActionZone=' + ex.message);
	} 
	return zactionzone;
}

WTWJS.prototype.setNewActionZoneDefaults = function(zactionzonetype) {
	/* selected by actionzonetype - defines the default values and zone names for admin edit of a zone */
	try {
		var zcoords = WTW.getNewCoordinates(50);
		var zpositionx = zcoords.positionX;
		var zpositiony = zcoords.positionY;
		var zpositionz = zcoords.positionZ;
		var zrotationy = zcoords.rotationY;
		if (thingid != '') {
			zpositionx = '0.00';
			zpositionz = '0.00';
		}
		zactionzonetype = zactionzonetype.toLowerCase();
		while (zactionzonetype.indexOf(' ') > -1) {
			zactionzonetype = zactionzonetype.replace(' ','');
		}
		dGet('wtw_tactionzonetype').value = zactionzonetype;
		dGet('wtw_tactionzoneshape').value = 'box';
		dGet('wtw_taxispositionx').value = zpositionx; //.toFixed(2);
		dGet('wtw_taxispositiony').value = zpositiony; //.toFixed(2);
		dGet('wtw_taxispositionz').value = zpositionz; //.toFixed(2);
		dGet('wtw_taxisscalingx').value = '0.20';
		dGet('wtw_taxisscalingy').value = '0.20';
		dGet('wtw_taxisscalingz').value = '20.00';
		dGet('wtw_taxisrotationx').value = '0.00';
		dGet('wtw_taxisrotationy').value = zrotationy; //.toFixed(2);
		dGet('wtw_taxisrotationz').value = '0.00';
		dGet('wtw_tactionzoneposx').value = zpositionx; //.toFixed(2);
		dGet('wtw_tactionzoneposy').value = zpositiony; //.toFixed(2);
		dGet('wtw_tactionzoneposz').value = zpositionz; //.toFixed(2);
		dGet('wtw_tactionzonescalingx').value = '20.00';
		dGet('wtw_tactionzonescalingy').value = '20.00';
		dGet('wtw_tactionzonescalingz').value = '20.00';
		dGet('wtw_tactionzonerotx').value = '0.00';
		dGet('wtw_tactionzoneroty').value = '0.00';
		dGet('wtw_tactionzonerotz').value = '0.00';
		dGet('wtw_tactionzonerotateaxis').value = 'y';
		dGet('wtw_tactionzonerotatedegrees').value = '90';
		dGet('wtw_tactionzonemovementtype').value = '';
		dGet('wtw_tactionzonejsfunction').value = '';
		dGet('wtw_tactionzonejsparameters').value = '';
		dGet('wtw_tactionzonerotatespeed').value = '0.00';
		dGet('wtw_tactionzonevalue1').value = '0.00';
		dGet('wtw_tactionzonevalue2').value = '0.00';
		dGet('wtw_tactionzonedefaulteditform').value = '0';
		dGet('wtw_tcopyaxletoactionzone').checked = true;
		switch (zactionzonetype) {
			case 'loadzone':
				dGet('wtw_tactionzonename').value = 'Custom - Load Zone';
				break;
			case 'unloadzone':
				dGet('wtw_tactionzonename').value = 'Unload Zone';
				break;
			case 'teleportzone':
				dGet('wtw_tactionzonename').value = 'Teleport Zone';
				break;
			case 'spawnzone':
				dGet('wtw_tactionzonename').value = 'Spawn Zone';
				break;
			case 'loadanimations':
				dGet('wtw_tactionzonename').value = 'Load Animations';
				break;
			case 'slidingdoor':
				dGet('wtw_tactionzonename').value = 'New Sliding Door';
				dGet('wtw_tactionzonemovementtype').value = 'slide';
				break;
			case 'swingingdoor':
				dGet('wtw_tactionzonename').value = 'New Swinging Door';
				dGet('wtw_taxisscalingx').value = '0.20';
				dGet('wtw_taxisscalingy').value = '20.00';
				dGet('wtw_taxisscalingz').value = '0.20';
				dGet('wtw_taxisrotationy').value = '0.00';
				dGet('wtw_tactionzonerotatespeed').value = '10.00';
				dGet('wtw_tactionzonemovementtype').value = 'swing';
				break;
			case 'clickactivatedslidingdoor':
				dGet('wtw_tactionzonename').value = 'New Click Sliding Door';
				dGet('wtw_tactionzonemovementtype').value = 'slide';
				break;
			case 'seat':
				dGet('wtw_tactionzonename').value = 'New Seat';
				dGet('wtw_tactionzonescalingx').value = '4.00';
				dGet('wtw_tactionzonescalingy').value = '1.00';
				dGet('wtw_tactionzonescalingz').value = '4.00';
				break;
			case 'mirror':
				dGet('wtw_tactionzonename').value = 'New Mirror Zone';
				break; 
			case 'ridealong':
				dGet('wtw_tactionzonename').value = 'New Ride Along Zone';
				break;
			case 'rotate':
				dGet('wtw_tactionzonename').value = 'New Rotate Zone';
				dGet('wtw_taxisscalingx').value = '0.20';
				dGet('wtw_taxisscalingy').value = '20.00';
				dGet('wtw_taxisscalingz').value = '0.20';
				dGet('wtw_taxisrotationy').value = '0.00';
				dGet('wtw_tactionzonerotatespeed').value = '1.00';
				dGet('wtw_tactionzonemovementtype').value = 'rotate';
				break;
			case 'peoplemover':
				dGet('wtw_tactionzonename').value = 'New People Mover Zone';
				dGet('wtw_tactionzonemovementtype').value = 'slide';
				break;
			case 'elevator':
				dGet('wtw_tactionzonename').value = 'New Elevator Zone';
				dGet('wtw_tactionzonemovementtype').value = 'slide';
				break;
			case 'passengerseat':
				dGet('wtw_tactionzonename').value = 'New Passenger Seat';
				break;
			case 'driverseat':
				dGet('wtw_tactionzonename').value = 'New Driver Seat';
				break;
			case 'driverturnangle':
				dGet('wtw_tactionzonename').value = 'New Driver Turn Angle';
				break;
			case 'driverturningwheel':
				dGet('wtw_tactionzonename').value = 'New Driver Turning Wheel';
				break;
			case 'driverwheel':
				dGet('wtw_tactionzonename').value = 'New Driver Wheel';
				break;
			default:
				dGet('wtw_tactionzonename').value = 'New Action Zone';
				WTW.pluginsSetNewActionZoneDefaults(zactionzonetype);
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-actionzones-addactionzonelist\r\n setNewActionZoneDefaults=' + ex.message);
	} 
}

WTWJS.prototype.setActionZoneFormFields = function(zactionzonetype) {
	/* selected by zactionzonetype - defines the default labels and visible form field sections for admin edit of a zone */
	try {
		zactionzonetype = zactionzonetype.toLowerCase();
		while (zactionzonetype.indexOf(' ') > -1) {
			zactionzonetype = zactionzonetype.replace(' ','');
		}
		WTW.hide('wtw_actionzoneswingdoordiv');
		WTW.hide('wtw_actionzonemovementdistancediv');
		WTW.hide('wtw_actionzonerotatespeeddiv');
		dGet('wtw_actionzoneadvancedoptslink').innerHTML = '-- Show Advanced Options --';
		WTW.hide('wtw_actionzoneadvancedopts');
		WTW.hide('wtw_attachactionzonediv');
		WTW.hide('wtw_actionzoneavataranimationsdiv');
		WTW.hide('wtw_azjavascriptdiv');
		WTW.hide('wtw_actionzoneteleportdiv');
		dGet('wtw_tcopyaxletoactionzone').disabled = false;
		dGet('wtw_axispositiontitle').innerHTML = 'Axis Position';
		dGet('wtw_axisrotationtitle').innerHTML = 'Axis Rotation';
		WTW.show('wtw_actionzonesizediv');
		WTW.show('wtw_axisrotationy');
		WTW.showInline('wtw_swingdistancedegreesdiv');
		WTW.show('wtw_actionzonesettingsdiv');
		WTW.show('wtw_actionzoneaxisdiv');
		WTW.show('wtw_copyaxletoactionzonediv');
		WTW.show('wtw_actionzoneadvancedoptslink');
		WTW.show('wtw_actionzonepartsdiv');
		WTW.show('wtw_actionzonepartsdivlabel');
		switch (zactionzonetype) {
			case 'loadzone':
				WTW.hide('wtw_actionzoneaxisdiv');
				WTW.hide('wtw_copyaxletoactionzonediv');
				WTW.hide('wtw_actionzoneadvancedoptslink');
				WTW.hide('wtw_actionzonepartsdiv');
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add Load Zone';
				dGet('wtw_tcopyaxletoactionzone').disabled = true;
				dGet('wtw_actionzoneadvancedoptslink').innerHTML = '-- Hide Advanced Options --';
				WTW.show('wtw_actionzoneadvancedopts');
				WTW.show('wtw_azjavascriptdiv');
				break;
			case 'unloadzone':
				WTW.hide('wtw_actionzoneaxisdiv');
				WTW.hide('wtw_copyaxletoactionzonediv');
				WTW.hide('wtw_actionzoneadvancedoptslink');
				WTW.hide('wtw_actionzonepartsdiv');
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add Unload Zone';
				dGet('wtw_tcopyaxletoactionzone').disabled = true;
				dGet('wtw_actionzoneadvancedoptslink').innerHTML = '-- Hide Advanced Options --';
				WTW.show('wtw_actionzoneadvancedopts');
				WTW.show('wtw_azjavascriptdiv');
				break;
			case 'teleportzone':
				WTW.hide('wtw_actionzoneaxisdiv');
				WTW.hide('wtw_copyaxletoactionzonediv');
				WTW.hide('wtw_actionzoneadvancedoptslink');
				WTW.hide('wtw_actionzonepartsdiv');
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add Teleport Zone';
				dGet('wtw_tcopyaxletoactionzone').disabled = true;
				dGet('wtw_actionzoneadvancedoptslink').innerHTML = '-- Hide Advanced Options --';
				WTW.show('wtw_actionzoneadvancedopts');
				WTW.show('wtw_actionzoneteleportdiv');
				break;
			case 'spawnzone':
				WTW.hide('wtw_actionzoneaxisdiv');
				WTW.hide('wtw_copyaxletoactionzonediv');
				WTW.hide('wtw_actionzoneadvancedoptslink');
				WTW.hide('wtw_actionzonepartsdiv');
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add Spawn Zone';
				dGet('wtw_tcopyaxletoactionzone').disabled = true;
				dGet('wtw_actionzoneadvancedoptslink').innerHTML = '-- Hide Advanced Options --';
				WTW.show('wtw_actionzoneadvancedopts');
				break;
			case 'loadanimations':
				WTW.hide('wtw_actionzoneaxisdiv');
				WTW.hide('wtw_copyaxletoactionzonediv');
				WTW.hide('wtw_actionzoneadvancedoptslink');
				WTW.hide('wtw_actionzonepartsdiv');
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add Load Animations';
				dGet('wtw_tcopyaxletoactionzone').disabled = true;
				dGet('wtw_actionzoneadvancedoptslink').innerHTML = '-- Hide Advanced Options --';
				WTW.show('wtw_actionzoneadvancedopts');
				WTW.show('wtw_actionzoneavataranimationsdiv');
				break;
			case 'slidingdoor':
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add Sliding Door';				
				WTW.show('wtw_actionzonemovementdistancediv');
				break;
			case 'swingingdoor':
				WTW.hide('wtw_axisrotationy');
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add Swinging Door';
				dGet('wtw_swingdistancediv').innerHTML = 'Swing Distance';
				WTW.show('wtw_actionzoneswingdoordiv');
				WTW.show('wtw_rotatedirectiondiv');
				WTW.show('wtw_actionzonerotatespeeddiv');
				break;
			case 'clickactivatedslidingdoor':
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add Click Sliding Door';				
				WTW.show('wtw_actionzonemovementdistancediv');
				break;
			case 'seat':
				WTW.hide('wtw_actionzonesizediv');
				WTW.hide('wtw_copyaxletoactionzonediv');
				WTW.hide('wtw_actionzoneaxisdiv');
				WTW.hide('wtw_actionzoneadvancedoptslink');
				WTW.hide('wtw_actionzonepartsdivlabel');
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add Seat';
				dGet('wtw_axispositiontitle').innerHTML = 'Camera Position';
				dGet('wtw_axisrotationtitle').innerHTML = 'Camera Rotation';
				dGet('wtw_actionzoneadvancedoptslink').innerHTML = '-- Hide Advanced Options --';
				WTW.show('wtw_actionzoneadvancedopts');
				WTW.show('wtw_attachactionzonediv');
				WTW.show('wtw_actionzonepartsdiv');
				break;
			case 'mirror':
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add Mirror Zone';
				break; 
			case 'ridealong':
				WTW.hide('wtw_copyaxletoactionzonediv');
				WTW.hide('wtw_actionzoneadvancedoptslink');
				WTW.hide('wtw_actionzoneaxisdiv');
				WTW.hide('wtw_actionzonemovementdistancediv');
				WTW.hide('wtw_actionzonepartsdiv');
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add Ride Along Zone';
				dGet('wtw_actionzoneadvancedoptslink').innerHTML = '-- Hide Advanced Options --';
				WTW.show('wtw_actionzoneadvancedopts');
				break;
			case 'rotate':
				WTW.hide('wtw_axisrotationy');
				WTW.hide('wtw_actionzonesettingsdiv');
				WTW.hide('wtw_actionzoneadvancedoptslink');
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add Rotation Zone';
				dGet('wtw_tcopyaxletoactionzone').disabled = true;
				dGet('wtw_tcopyaxletoactionzone').checked = true;
				WTW.show('wtw_actionzonerotatespeeddiv');
				break;
			case 'peoplemover':
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add People Mover Zone';
				WTW.show('wtw_actionzonemovementdistancediv');
				break;
			case 'elevator':
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add Elevator Zone';
				WTW.show('wtw_actionzonemovementdistancediv');
				break;
			case 'passengerseat':
				WTW.hide('wtw_actionzoneadvancedoptslink');
				WTW.hide('wtw_actionzonepartsdivlabel');
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add Passenger Seat';
				dGet('wtw_axispositiontitle').innerHTML = 'Camera Position';
				dGet('wtw_axisrotationtitle').innerHTML = 'Camera Rotation';
				WTW.show('wtw_actionzoneadvancedopts');
				WTW.show('wtw_attachactionzonediv');
				break;
			case 'driverseat':
				WTW.hide('wtw_actionzoneadvancedoptslink');
				WTW.hide('wtw_actionzonepartsdivlabel');
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add Driver Seat';
				dGet('wtw_axispositiontitle').innerHTML = 'Camera Position';
				dGet('wtw_axisrotationtitle').innerHTML = 'Camera Rotation';
				dGet('wtw_actionzoneadvancedoptslink').innerHTML = '-- Hide Advanced Options --';
				dGet('wtw_actionzoneadvancedoptslink').innerHTML = '-- Hide Advanced Options --';
				WTW.show('wtw_actionzoneadvancedopts');
				WTW.show('wtw_attachactionzonediv');
				break;
			case 'driverturnangle':
				WTW.hide('wtw_rotatedirectiondiv');
				WTW.hide('wtw_swingdistancedegreesdiv');
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add Driver Turn Angle';
				dGet('wtw_swingdistancediv').innerHTML = 'Rotation Factor (0-6)';
				WTW.show('wtw_actionzoneswingdoordiv');
				WTW.show('wtw_axisrotationy');
				break;
			case 'driverturningwheel':
				WTW.hide('wtw_rotatedirectiondiv');
				WTW.hide('wtw_swingdistancedegreesdiv');
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add Driver Turning Wheel';
				dGet('wtw_swingdistancediv').innerHTML = 'Rotation Factor (0-6)';
				WTW.show('wtw_actionzoneswingdoordiv');
				WTW.show('wtw_axisrotationy');
				break;
			case 'driverwheel':
				WTW.hide('wtw_rotatedirectiondiv');
				WTW.hide('wtw_swingdistancedegreesdiv');
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add Driver Wheel';
				dGet('wtw_swingdistancediv').innerHTML = 'Rotation Factor (0-6)';
				WTW.show('wtw_actionzoneswingdoordiv');
				WTW.show('wtw_axisrotationy');
				break;
			default:
				dGet('wtw_editactionzoneformtitle').innerHTML = 'Add Action Zone';
				WTW.pluginsSetActionZoneFormFields(zactionzonetype);
				break;
		}	
	} catch (ex) {
		WTW.log('core-scripts-actionzones-addactionzonelist\r\n setActionZoneFormFields=' + ex.message);
	}
}

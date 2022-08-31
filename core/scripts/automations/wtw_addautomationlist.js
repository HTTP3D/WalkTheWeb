/* All code is Copyright 2013-2022 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions set the types of automations to add and define the default values, form fields, and functions to create the automations */

/* automations are series of animations or timing of events that can be coordinated to function together. */
/* for example an elevator opens a door, waits x seconds, then closes the door. If a button is pressed starts another automation */
/* like when a floor is pressed, the door closes, elevator moves to that floor (with passengers), stops, opens the door, waits x seconds, and then closes the door again */
WTWJS.prototype.initAutomations = function() {
	/* load any existing automations when load zone (action zone) is entered */
	try {
		var zcheckautomationid = '';
		var zcheckconnectinggridid = '';
		for (var i = 0; i < WTW.automations.length; i++) {
			if (WTW.automations[i] != null) {
				if (zcheckautomationid != WTW.automations[i].automationid || zcheckconnectinggridid != WTW.automations[i].connectinggridid) {
					if (WTW.automations[i].running == '0') {
						WTW.automations[i].automationind = i;
						WTW.startAutomation(WTW.automations[i].automationid, WTW.automations[i].connectinggridind, WTW.automations[i].step.step);					
					}
					zcheckautomationid = WTW.automations[i].automationid;
					zcheckconnectinggridid = WTW.automations[i].connectinggridid;
				}
			}
		}
	} catch (ex) {
		WTW.log('core-initAutomations=' + ex.message);
	}
}

WTWJS.prototype.nextStepAutomation = function(zautomationid, zconnectinggridind, zcompletedstep) {
	/* each step runs sequentially after the previous step concludes */
	try {
		var znextstep = 1000;
		for (var i = 0; i < WTW.automations.length; i++) {
			if (WTW.automations[i] != null) {
				if (WTW.automations[i].automationid == zautomationid && WTW.automations[i].connectinggridind == zconnectinggridind && Number(WTW.automations[i].step.step) > Number(zcompletedstep)) {
					if (Number(WTW.automations[i].step.step) < znextstep) {
						znextstep = Number(WTW.automations[i].step.step);
						i = WTW.automations.length;
					}
				}
			}
		}
		if (znextstep > -1) {
			WTW.startAutomation(zautomationid, zconnectinggridind, znextstep, true);
		}
	} catch (ex) {
		WTW.log('core-nextStepAutomation=' + ex.message);
	}
}

WTWJS.prototype.startAutomation = function(zautomationid, zconnectinggridind, zstep, zignorerunning) {
	/* start the automation with step 1 */
	try {
		if (zignorerunning == undefined) {
			zignorerunning = false;
		}
		for (var i = 0; i < WTW.automations.length; i++) {
			if (WTW.automations[i] != null) {
				if (WTW.automations[i].automationid == zautomationid && WTW.automations[i].connectinggridind == zconnectinggridind && WTW.automations[i].step.step == zstep) {
					if (WTW.automations[i].running == '0' || zignorerunning) {
						switch(WTW.automations[i].step.automationtype){
							case 'pause':
								automationpause(WTW.automations[i]);
								break;
							case 'status':
								automationstatus(WTW.automations[i]);
								break;
							case 'condition':
								automationcondition(WTW.automations[i]);
								break;
							case 'repeat':
								automationrepeat(WTW.automations[i]);
								break;
							default:
								
								break;
						}
						WTW.automations[i].running = '1';
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-startAutomation=' + ex.message);
	}
}

WTWJS.prototype.addAutomation = function(zautomationname, zautomationdef) {
	/* temporarily disabled - work in progress */
/*	var zautomation = null;
	try {
		zautomation = WTW.getMeshOrNodeByID(zautomationname);
		if (zautomation == null) {
			var zautomationind = -1;
			if (WTW.isNumeric(zautomationdef.automationind)) {
				zautomationind = Number(zautomationdef.automationind);
			}
			if (zautomationind > -1) {
				var zparentautomationind = -1;
				var zparentautomation = null;
				var zautomationparent = WTW.automations[zautomationind].parentname;
				if (WTW.automations[zautomationind].parentautomationid != '') {
					zparentautomationind = getautomationind(WTW.automations[zautomationind].parentautomationid);
					if (zparentautomationind > -1) {
						if (WTW.automations[zparentautomationind] != null) {
							var parentautomationname = 'local-automation-' + zparentautomationind.toString() + '-' + WTW.automations[zparentautomationind].automationid + '-' + WTW.automations[zparentautomationind].connectinggridind + '-' + WTW.automations[zparentautomationind].connectinggridid + '-' + WTW.automations[zparentautomationind].automationtype;
							zparentautomation = WTW.getMeshOrNodeByID(parentautomationname);
							if (zparentautomation == null) {
								zparentautomation = WTW.addAutomation(parentautomationname, WTW.automations[zparentautomationind]);
							}
							WTW.automations[zautomationind].parentname = 'local-automationaxlebase2-' + zparentautomationind.toString() + '-' + WTW.automations[zparentautomationind].automationid + '-' + WTW.automations[zparentautomationind].connectinggridind + '-' + WTW.automations[zparentautomationind].connectinggridid + '-' + WTW.automations[zparentautomationind].automationtype;
							
						}
					}
				}
				if (zparentautomation != null) {
					var zparentautomationaxlebasename = 'local-automationaxlebase-' + zparentautomationind.toString() + '-' + WTW.automations[zparentautomationind].automationid + '-' + WTW.automations[zparentautomationind].connectinggridind + '-' + WTW.automations[zparentautomationind].connectinggridid + '-' + WTW.automations[zparentautomationind].automationtype;
					var zparentautomationaxlebase2name = 'local-automationaxlebase2-' + zparentautomationind.toString() + '-' + WTW.automations[zparentautomationind].automationid + '-' + WTW.automations[zparentautomationind].connectinggridind + '-' + WTW.automations[zparentautomationind].connectinggridid + '-' + WTW.automations[zparentautomationind].automationtype;
					var zparentautomationaxlebase = WTW.getMeshOrNodeByID(zparentautomationaxlebasename);
					zautomationdef.axis.position.x -= (zparentautomationaxlebase.position.x);
					zautomationdef.axis.position.y -= (zparentautomationaxlebase.position.y);
					zautomationdef.axis.position.z -= (zparentautomationaxlebase.position.z);
					zautomationdef.position.x -= (zparentautomationaxlebase.position.x);
					zautomationdef.position.y -= (zparentautomationaxlebase.position.y);
					zautomationdef.position.z -= (zparentautomationaxlebase.position.z);
					zautomationdef.parentname = zparentautomationaxlebase2name;
				}
				var zautomationtype = zautomationdef.automationtype.toLowerCase();
				while (zautomationtype.indexOf(' ') > -1) {
					zautomationtype = zautomationtype.replace(' ','');
				}
				switch (zautomationtype) {
					case 'loadzone':
						zautomation = addautomationloadzone(zautomationname, zautomationind, zautomationdef);
						break;
					default:
						zautomation = addautomationloadzone(zautomationname, zautomationind, zautomationdef);
						break;
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-automations-addautomationlist\r\n addAutomation=' + ex.message);
	} 
	return zautomation;*/
}

/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions set the types of automations to add and define the default values, form fields, and functions to create the automations */

/* automations are series of animations or timing of events that can be coordinated to function together. */
/* for example an elevator opens a door, waits x seconds, then closes the door. If a button is pressed starts another automation */
/* like when a floor is pressed, the door closes, elevator moves to that floor (with passengers), stops, opens the door, waits x seconds, and then closes the door again */
WTWJS.prototype.initAutomations = function() {
	/* load any existing automations when load zone (action zone) is entered */
	try {
		var checkautomationid = '';
		var checkconnectinggridid = '';
		for (var i = 0; i < WTW.automations.length; i++) {
			if (WTW.automations[i] != null) {
				if (checkautomationid != WTW.automations[i].automationid || checkconnectinggridid != WTW.automations[i].connectinggridid) {
					if (WTW.automations[i].running == '0') {
						WTW.automations[i].automationind = i;
						WTW.startAutomation(WTW.automations[i].automationid, WTW.automations[i].connectinggridind, WTW.automations[i].step.step);					
					}
					checkautomationid = WTW.automations[i].automationid;
					checkconnectinggridid = WTW.automations[i].connectinggridid;
				}
			}
		}
	} catch (ex) {
		WTW.log("core-initAutomations=" + ex.message);
	}
}

WTWJS.prototype.nextStepAutomation = function(automationid, connectinggridind, completedstep) {
	/* each step runs sequentially after the previous step concludes */
	try {
		var nextstep = 1000;
		for (var i = 0; i < WTW.automations.length; i++) {
			if (WTW.automations[i] != null) {
				if (WTW.automations[i].automationid == automationid && WTW.automations[i].connectinggridind == connectinggridind && Number(WTW.automations[i].step.step) > Number(completedstep)) {
					if (Number(WTW.automations[i].step.step) < nextstep) {
						nextstep = Number(WTW.automations[i].step.step);
						i = WTW.automations.length;
					}
				}
			}
		}
		if (nextstep > -1) {
			WTW.startAutomation(automationid, connectinggridind, nextstep, true);
		}
	} catch (ex) {
		WTW.log("core-nextStepAutomation=" + ex.message);
	}
}

WTWJS.prototype.startAutomation = function(automationid, connectinggridind, step, ignorerunning) {
	/* start the automation with step 1 */
	try {
		if (ignorerunning == undefined) {
			ignorerunning = false;
		}
		for (var i = 0; i < WTW.automations.length; i++) {
			if (WTW.automations[i] != null) {
				if (WTW.automations[i].automationid == automationid && WTW.automations[i].connectinggridind == connectinggridind && WTW.automations[i].step.step == step) {
					if (WTW.automations[i].running == '0' || ignorerunning) {
						switch(WTW.automations[i].step.automationtype){
							case "pause":
								automationpause(WTW.automations[i]);
								break;
							case "status":
								automationstatus(WTW.automations[i]);
								break;
							case "condition":
								automationcondition(WTW.automations[i]);
								break;
							case "repeat":
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
		WTW.log("core-startAutomation=" + ex.message);
	}
}

WTWJS.prototype.addAutomation = function(automationname, automationdef) {
	/* temporarily disabled - work in progress */
/*	var automation = null;
	try {
		automation = scene.getMeshByID(automationname);
		if (automation == null) {
			var automationind = -1;
			if (WTW.isNumeric(automationdef.automationind)) {
				automationind = Number(automationdef.automationind);
			}
			if (automationind > -1) {
				var axispositionx = Number(automationdef.axis.position.x);
				var axispositiony = Number(automationdef.axis.position.y);
				var axispositionz = Number(automationdef.axis.position.z);
				var namepart = automationname.split('-');
				var parentautomationind = -1;
				var parentautomation = null;
				var automationparent = WTW.automations[automationind].parentname;
				if (WTW.automations[automationind].parentautomationid != "") {
					parentautomationind = getautomationind(WTW.automations[automationind].parentautomationid);
					if (parentautomationind > -1) {
						if (WTW.automations[parentautomationind] != null) {
							var parentautomationname = "automation-" + parentautomationind.toString() + "-" + WTW.automations[parentautomationind].automationid + "-" + WTW.automations[parentautomationind].connectinggridind + "-" + WTW.automations[parentautomationind].connectinggridid + "-" + WTW.automations[parentautomationind].automationtype;
							var parentautomation = scene.getMeshByID(parentautomationname);
							if (parentautomation == null) {
								parentautomation = WTW.addAutomation(parentautomationname, WTW.automations[parentautomationind]);
							}
							WTW.automations[automationind].parentname = "automationaxlebase2-" + parentautomationind.toString() + "-" + WTW.automations[parentautomationind].automationid + "-" + WTW.automations[parentautomationind].connectinggridind + "-" + WTW.automations[parentautomationind].connectinggridid + "-" + WTW.automations[parentautomationind].automationtype;
							
						}
					}
				}
				if (parentautomation != null) {
					var parentautomationaxlebasename = "automationaxlebase-" + parentautomationind.toString() + "-" + WTW.automations[parentautomationind].automationid + "-" + WTW.automations[parentautomationind].connectinggridind + "-" + WTW.automations[parentautomationind].connectinggridid + "-" + WTW.automations[parentautomationind].automationtype;
					var parentautomationaxlebase2name = "automationaxlebase2-" + parentautomationind.toString() + "-" + WTW.automations[parentautomationind].automationid + "-" + WTW.automations[parentautomationind].connectinggridind + "-" + WTW.automations[parentautomationind].connectinggridid + "-" + WTW.automations[parentautomationind].automationtype;
					var parentautomationaxlebase = scene.getMeshByID(parentautomationaxlebasename);
					automationdef.axis.position.x -= (parentautomationaxlebase.position.x);
					automationdef.axis.position.y -= (parentautomationaxlebase.position.y);
					automationdef.axis.position.z -= (parentautomationaxlebase.position.z);
					automationdef.position.x -= (parentautomationaxlebase.position.x);
					automationdef.position.y -= (parentautomationaxlebase.position.y);
					automationdef.position.z -= (parentautomationaxlebase.position.z);
					automationdef.parentname = parentautomationaxlebase2name;
				}
				var automationtype = automationdef.automationtype.toLowerCase();
				while (automationtype.indexOf(" ") > -1) {
					automationtype = automationtype.replace(" ","");
				}
				switch (automationtype) {
					case "loadzone":
						automation = addautomationloadzone(automationname, automationind, automationdef);
						break;
					default:
						automation = addautomationloadzone(automationname, automationind, automationdef);
						break;
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-automations-addautomationlist\r\n addAutomation=" + ex.message);
	} 
	return automation;*/
}

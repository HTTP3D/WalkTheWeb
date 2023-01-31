/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions create the various automations */

/* automation steps can have the following functions assigned - some animate, pause, rotate, etc... */
function automationpause(zautomationdef) {
	/* built in pause as a step in the process */
	try {
		var zautomationind = zautomationdef.automationind;
		if (WTW.automations[zautomationind] != null) {
			WTW.automations[zautomationind].step.timer = window.setTimeout(function(){
				if (WTW.automations[zautomationind] != null) {
					WTW.nextStepAutomation(WTW.automations[zautomationind].automationid, WTW.automations[zautomationind].connectinggridind, WTW.automations[zautomationind].step.step);
					WTW.automations[zautomationind].step.timer = null;
				}
			},Number(zautomationdef.step.conditionvalue));
		}
	} catch (ex) {
		WTW.log('core-scripts-automations-basicautomations\r\n automationpause=' + ex.message);
	}
}

function automationstatus(zautomationdef) {
	/* check status of an automation */
	try {
		var zautomationind = zautomationdef.automationind;
		var zactionzoneind = -1;
		zactionzoneind = WTW.getActionZoneInd(zautomationdef.step.actionzoneid, zautomationdef.connectinggridind);
		if (WTW.actionZones[zactionzoneind] != null) {
			if (zactionzoneind > -1) {
				WTW.actionZones[zactionzoneind].status = Number(zautomationdef.step.actionzonestatus);
			}
			WTW.nextStepAutomation(WTW.automations[zautomationind].automationid, WTW.automations[zautomationind].connectinggridind, WTW.automations[zautomationind].step.step);
		}
	} catch (ex) {
		WTW.log('core-scripts-automations-basicautomations\r\n automationstatus=' + ex.message);
	}
}

function automationcondition(zautomationdef) {
	/* test for a condition for a step to be completed (like rotation = 45 degrees) */
	try {
		var zconditionskip = false;
		var zautomationind = zautomationdef.automationind;
		var zactionzoneind = -1;
		zactionzoneind = WTW.getActionZoneInd(zautomationdef.step.actionzoneid, zautomationdef.connectinggridind);
		if (WTW.actionZones[zactionzoneind] != null) {
			if (zactionzoneind > -1) {
				switch (WTW.actionZones[zactionzoneind].actionzonetype) {
					case 'rotate':
/*						var zactionzoneaxle = WTW.getMeshOrNodeByID(WTW.actionZones[zactionzoneind].moldname.replace('-actionzone-','-actionzoneaxle-'));
						if (zactionzoneaxle != null) {
							if (zautomationdef.step.conditionoperator == '<=') {
								if (WTW.automations[zautomationind].step.timer != null) {
									window.clearInterval(WTW.automations[zautomationind].step.timer);
									WTW.automations[zautomationind].step.timer = null;
								}
								WTW.automations[zautomationind].step.timer = window.setInterval(function(){
									if (Math.round(WTW.getDegrees(zactionzoneaxle.rotation.y)) <= Math.round(Number(zautomationdef.step.conditionvalue))) {
										if (WTW.automations[zautomationind] != null) {
											window.clearInterval(WTW.automations[zautomationind].step.timer);
											WTW.automations[zautomationind].step.timer = null;
											WTW.nextStepAutomation(WTW.automations[zautomationind].automationid, WTW.automations[zautomationind].connectinggridind, WTW.automations[zautomationind].step.step);
										}
									}
								},250);
							} else if (zautomationdef.step.conditionoperator == '>') {
								if (WTW.automations[zautomationind].step.timer != null) {
									window.clearInterval(WTW.automations[zautomationind].step.timer);
									WTW.automations[zautomationind].step.timer = null;
								}
								WTW.automations[zautomationind].step.timer = window.setInterval(function(){
									if (Math.round(WTW.getDegrees(zactionzoneaxle.rotation.y)) > Math.round(Number(zautomationdef.step.conditionvalue))) {
										if (WTW.automations[zautomationind] != null) {
											window.clearInterval(WTW.automations[zautomationind].step.timer);
											WTW.automations[zautomationind].step.timer = null;
											WTW.nextStepAutomation(WTW.automations[zautomationind].automationid, WTW.automations[zautomationind].connectinggridind, WTW.automations[zautomationind].step.step);
										}
									}
								},250);
							}
						} else {
							zconditionskip = true;
						}*/
						break;
				}
			}
			if (zconditionskip) {
				WTW.nextStepAutomation(WTW.automations[zautomationind].automationid, WTW.automations[zautomationind].connectinggridind, WTW.automations[zautomationind].step.step);
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-automations-basicautomations\r\n automationcondition=' + ex.message);
	}
}

function automationrepeat(zautomationdef) {
	/* when all steps are complete, should the automation start over again */
	try {
		var zjumptostep = Number(zautomationdef.step.conditionvalue) - .5;
		var zautomationind = zautomationdef.automationind;
		if (WTW.automations[zautomationind] != null) {
			WTW.nextStepAutomation(WTW.automations[zautomationind].automationid, WTW.automations[zautomationind].connectinggridind, zjumptostep);
		}
	} catch (ex) {
		WTW.log('core-scripts-automations-basicautomations\r\n automationrepeat=' + ex.message);
	}
}

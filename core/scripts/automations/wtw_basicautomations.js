/* automation steps can have the following functions assigned - some animate, pause, rotate, etc... */
function automationpause(automationdef) {
	/* built in pause as a step in the process */
	try {
		var automationind = automationdef.automationind;
		if (WTW.automations[automationind] != null) {
			WTW.automations[automationind].step.timer = window.setTimeout(function(){
				if (WTW.automations[automationind] != null) {
					WTW.nextStepAutomation(WTW.automations[automationind].automationid, WTW.automations[automationind].connectinggridind, WTW.automations[automationind].step.step);
					WTW.automations[automationind].step.timer = null;
				}
			},Number(automationdef.step.conditionvalue));
		}
	} catch (ex) {
		WTW.log("core-scripts-automations-basicautomations\r\n automationpause=" + ex.message);
	}
}

function automationstatus(automationdef) {
	/* check status of an automation */
	try {
		var automationind = automationdef.automationind;
		var actionzoneind = -1;
		actionzoneind = WTW.getActionZoneInd(automationdef.step.actionzoneid, automationdef.connectinggridind);
		if (WTW.actionZones[actionzoneind] != null) {
			if (actionzoneind > -1) {
				WTW.actionZones[actionzoneind].status = Number(automationdef.step.actionzonestatus);
			}
			WTW.nextStepAutomation(WTW.automations[automationind].automationid, WTW.automations[automationind].connectinggridind, WTW.automations[automationind].step.step);
		}
	} catch (ex) {
		WTW.log("core-scripts-automations-basicautomations\r\n automationstatus=" + ex.message);
	}
}

function automationcondition(automationdef) {
	/* test for a condition for a step to be completed (like rotation = 45 degrees) */
	try {
		var conditionskip = false;
		var automationind = automationdef.automationind;
		var actionzoneind = -1;
		actionzoneind = WTW.getActionZoneInd(automationdef.step.actionzoneid, automationdef.connectinggridind);
		if (WTW.actionZones[actionzoneind] != null) {
			if (actionzoneind > -1) {
				switch (WTW.actionZones[actionzoneind].actionzonetype) {
					case "rotate":
/*						var actionzoneaxle = scene.getMeshByID("actionzoneaxle-" + actionzoneind + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
						if (actionzoneaxle != null) {
							if (automationdef.step.conditionoperator == "<=") {
								if (WTW.automations[automationind].step.timer != null) {
									window.clearInterval(WTW.automations[automationind].step.timer);
									WTW.automations[automationind].step.timer = null;
								}
								WTW.automations[automationind].step.timer = window.setInterval(function(){
									if (Math.round(WTW.getDegrees(actionzoneaxle.rotation.y)) <= Math.round(Number(automationdef.step.conditionvalue))) {
										if (WTW.automations[automationind] != null) {
											window.clearInterval(WTW.automations[automationind].step.timer);
											WTW.automations[automationind].step.timer = null;
											WTW.nextStepAutomation(WTW.automations[automationind].automationid, WTW.automations[automationind].connectinggridind, WTW.automations[automationind].step.step);
										}
									}
								},250);
							} else if (automationdef.step.conditionoperator == ">") {
								if (WTW.automations[automationind].step.timer != null) {
									window.clearInterval(WTW.automations[automationind].step.timer);
									WTW.automations[automationind].step.timer = null;
								}
								WTW.automations[automationind].step.timer = window.setInterval(function(){
									if (Math.round(WTW.getDegrees(actionzoneaxle.rotation.y)) > Math.round(Number(automationdef.step.conditionvalue))) {
										if (WTW.automations[automationind] != null) {
											window.clearInterval(WTW.automations[automationind].step.timer);
											WTW.automations[automationind].step.timer = null;
											WTW.nextStepAutomation(WTW.automations[automationind].automationid, WTW.automations[automationind].connectinggridind, WTW.automations[automationind].step.step);
										}
									}
								},250);
							}
						} else {
							conditionskip = true;
						}*/
						break;
				}
			}
			if (conditionskip) {
				WTW.nextStepAutomation(WTW.automations[automationind].automationid, WTW.automations[automationind].connectinggridind, WTW.automations[automationind].step.step);
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-automations-basicautomations\r\n automationcondition=" + ex.message);
	}
}

function automationrepeat(automationdef) {
	/* when all steps are complete, should the automation start over again */
	try {
		var jumptostep = Number(automationdef.step.conditionvalue) - .5;
		var automationind = automationdef.automationind;
		if (WTW.automations[automationind] != null) {
			WTW.nextStepAutomation(WTW.automations[automationind].automationid, WTW.automations[automationind].connectinggridind, jumptostep);
		}
	} catch (ex) {
		WTW.log("core-scripts-automations-basicautomations\r\n automationrepeat=" + ex.message);
	}
}

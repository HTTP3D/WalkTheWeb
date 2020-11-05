/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions provide many of the common functions for browse and admin modes */
/* dynamically load and unload script files and execute JavaScript functions from text function names */


/* dynamically load or unload script files */

WTWJS.prototype.checkLoadJSFile = function(zfilename, zfiletype) {
	/* works with dynamically loading JavaScript files */
	/* require once functionality - check if it is already loaded and load if it is not. */
	try {
		if (WTW.loadedJSFiles.indexOf("[" + zfilename + "]") == -1) {
			WTW.loadJSFile(zfilename, zfiletype);
			WTW.loadedJSFiles += "[" + zfilename + "]";
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_dynamicscripts.js-checkLoadJSFile=" + ex.message);
	}
}

WTWJS.prototype.checkUnloadJSFile = function(zfilename, zfiletype) {
	/* works with dynamically loading JavaScript files */
	/* require once functionality - but only unload the JS file if all needs for it are no longer in use. */
	try {
		if (WTW.loadedJSFiles.indexOf("[" + zfilename + "]") != -1) {
			WTW.unloadJSFile(zfilename, zfiletype);
			WTW.loadedJSFiles = WTW.loadedJSFiles.replace(zfilename, "");
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_dynamicscripts.js-checkUnloadJSFile=" + ex.message);
	}
}

WTWJS.prototype.loadJSFile = function(zfilename, zfiletype) {
	/* dynamically loading JavaScript files */
	try {
		var zfileref;
		if (zfiletype == "js") {
			zfileref = document.createElement('script');
			zfileref.setAttribute("type", "text/javascript");
			zfileref.setAttribute("src", zfilename);
		}
		else if (zfiletype == "css") {
			zfileref = document.createElement("link");
			zfileref.setAttribute("rel", "stylesheet");
			zfileref.setAttribute("type", "text/css");
			zfileref.setAttribute("href", zfilename);
		}
		if (typeof zfileref != "undefined") {
			document.getElementsByTagName("head")[0].appendChild(zfileref);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_dynamicscripts.js-loadJSFile=" + ex.message);
	}
}

WTWJS.prototype.unloadJSFile = function(zfilename, zfiletype) {
	/* dynamically unloading JavaScript files */
	try {
		var ztargetelement = (zfiletype == "js") ? "script" : (zfiletype == "css") ? "link" : "none";
		var ztargetattr = (zfiletype == "js") ? "src" : (zfiletype == "css") ? "href" : "none";
		var zallsuspects = document.getElementsByTagName(ztargetelement);
		for (var i = zallsuspects.length; i >= 0; i--) {
			if (zallsuspects[i] && zallsuspects[i].getAttribute(ztargetattr) != null && zallsuspects[i].getAttribute(ztargetattr).indexOf(zfilename) != -1) {
				zallsuspects[i].parentNode.removeChild(zallsuspects[i]);
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_dynamicscripts.js-unloadJSFile=" + ex.message);
	}
}

WTWJS.prototype.checkLoadScripts = function(zactionzoneind) {
	/* dynamically loading JavaScript files */
	/* check to see if any script needs to be loaded with an action zone as reference (avatar entered the zone) */
	try {
		if (WTW.actionZones[zactionzoneind] != null) {
			var zscripts = WTW.actionZones[zactionzoneind].scripts;
			if (zscripts != null) {
				for (var i=0;i<zscripts.length;i++) {
					if (zscripts[i] != null) {
						if (zscripts[i].loaded == '0') {
							var zwebtype = "communities";
							var zwebid = WTW.actionZones[zactionzoneind].communityinfo.communityid;
							if (WTW.actionZones[zactionzoneind].buildinginfo.buildingid != '') {
								zwebtype = "buildings";
								zwebid = WTW.actionZones[zactionzoneind].buildinginfo.buildingid;
							} else if (WTW.actionZones[zactionzoneind].thinginfo.thingid != '') {
								zwebtype = "things";
								zwebid = WTW.actionZones[zactionzoneind].thinginfo.thingid;
							}
							WTW.checkLoadJSFile("/content/uploads/" + zwebtype + "/" + zwebid + "/" + zscripts[i].scriptpath, 'js');
							WTW.actionZones[zactionzoneind].scripts[i].loaded = '1';
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_dynamicscripts.js-checkLoadScripts=" + ex.message);
	}
}

WTWJS.prototype.checkUnloadScripts = function(zactionzoneind) {
	/* dynamically unloading JavaScript files */
	/* check to see if any script needs to be unloaded with an action zone as reference (avatar left the zone) */
	try {
		if (WTW.actionZones[zactionzoneind] != null) {
			var zscripts = WTW.actionZones[zactionzoneind].scripts;
			if (zscripts != null) {
				for (var i=0;i<zscripts.length;i++) {
					if (zscripts[i] != null) {
						if (zscripts[i].loaded == '1') {
							var zwebtype = "communities";
							var zwebid = WTW.actionZones[zactionzoneind].communityinfo.communityid;
							if (WTW.actionZones[zactionzoneind].buildinginfo.buildingid != '') {
								zwebtype = "buildings";
								zwebid = WTW.actionZones[zactionzoneind].buildinginfo.buildingid;
							} else if (WTW.actionZones[zactionzoneind].thinginfo.thingid != '') {
								zwebtype = "things";
								zwebid = WTW.actionZones[zactionzoneind].thinginfo.thingid;
							}
							WTW.checkUnloadJSFile("/content/uploads/" + zwebtype + "/" + zwebid + "/" + zscripts[i].scriptpath, 'js');
							WTW.actionZones[zactionzoneind].scripts[i].loaded = '0';
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_dynamicscripts.js-checkUnloadScripts=" + ex.message);
	}
}


/* set or execute JavaScript functions from text function names - for molds */

WTWJS.prototype.setFunctionName = function(moldname) {
	/* create new function name (or new name for repeated instances of the same object) */
	var functionname = "";
	try {
		functionname = "f" + moldname;
		while (functionname.indexOf(' ') > -1) {
			functionname = functionname.replace(' ','');
		}
		while (functionname.indexOf('-') > -1) {
			functionname = functionname.replace('-','');
		}
		if (typeof window[functionname] != "undefined") {
			var basename = functionname;
			var i = 0;
			while (typeof window[functionname] != "undefined") {
				i += 1;
				functionname = basename + i;
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_dynamicscripts.js-setFunctionName=" + ex.message);
	}
	return functionname;
}

WTWJS.prototype.setFunctionAndExecute = function(functionname, parameters, moldname) {
	/* convert function name and parameters to executable function and execute it */
	try {
		if (moldname != undefined) {
			parameters += "," + moldname;
		}
		if (parameters.indexOf(',') > -1) {
			var values = parameters.split(',');
			WTW.executeFunctionByName(functionname, window, values);
		} else if (parameters != null) {
			WTW.executeFunctionByName(functionname, window, parameters);
		} else {
			WTW.executeFunctionByName(functionname, window, null);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_dynamicscripts.js-setFunctionAndExecute=" + ex.message);
	}
}

WTWJS.prototype.checkMoldFunctionAndExecute = function(zmoldname) {
	/* triggered by click event, if the mold has a function (by function name string) assigned to it, this will execute it */
	try {
		if (zmoldname.indexOf('molds') > -1) {
			var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
			if (zmoldnameparts.molds[zmoldnameparts.moldind] != null) {
				if (zmoldnameparts.molds[zmoldnameparts.moldind].jsfunction != undefined) {
					WTW.setFunctionAndExecute(zmoldnameparts.molds[zmoldnameparts.moldind].jsfunction, zmoldnameparts.molds[zmoldnameparts.moldind].jsparameters);
				}
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_dynamicscripts.js-checkMoldFunctionAndExecute=" + ex.message);
    }
}

WTWJS.prototype.executeFunctionByName = function(zjsfunction, context /*, args */) {
	/* allows a name of a javascript function to be passed (even with class like WTW.testScript) with parameters string (context) to be executed */
	/* example: WTW.executeFunctionByName('WTW.testScript', 'arg1', 'arg2', 'arg3', 'arg4');   executes: WTW.testScript('arg1', 'arg2', 'arg3', 'arg4'); */
	var func = null;
	var args = null;
	var zfunction = null;
	try {
		if (zjsfunction != null) {
			if (zjsfunction != '') {
				args = Array.prototype.slice.call(arguments, 2);
				var namespaces = zjsfunction.split(".");
				func = namespaces.pop();
				for(var i = 0; i < namespaces.length; i++) {
					context = context[namespaces[i]];
				}
				if (typeof context[func] == 'function') {
					zfunction = context[func].apply(context, args);
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_dynamicscripts.js-executeFunctionByName=" + ex.message);
	}
	return zfunction;
}

WTWJS.prototype.executeAnimationByName = function(animationname) {
	/* run a mold animation (triggered by event) */
	try {
		for (var i=0;i < WTW.moldEvents.length;i++) {
			if (WTW.moldEvents[i] != null) {
				if (WTW.moldEvents[i].animationname == animationname) {
					if (WTW.moldEvents[i].mold != null) {
						if (WTW.moldEvents[i].loaded) {
							var endscript = WTW.moldEvents[i].animationendscript;
							var startframe = Number(WTW.moldEvents[i].startframe);
							var endframe = Number(WTW.moldEvents[i].endframe);
							if (WTW.moldEvents[i].moldevent == 'onclicktoggle') {
								if (WTW.moldEvents[i].stage == '0') {
									WTW.moldEvents[i].stage = '1';
								} else {
									startframe = Number(WTW.moldEvents[i].endframe);
									endframe = Number(WTW.moldEvents[i].startframe);
									WTW.moldEvents[i].stage = '0';
								}
							}
							/* temp for demo - sync 2 animations */
							if (WTW.moldEvents[i].mold.name == "buildingmolds-0-h3ecuos3uff4t8gl-0-2202l5q2xiaogwn5-babylonfile-OccupyGuy_MouthAnimGeo") {
								WTW.temp1 = scene.beginAnimation(WTW.moldEvents[i].mold, startframe, endframe, WTW.moldEvents[i].animationloop, Number(WTW.moldEvents[i].speedratio), function() {if (typeof window[endscript] == "function") {window[endscript](endscript);}}, WTW.moldEvents[i].stopcurrentanimations);
								if (WTW.temp2 != null) {
									WTW.temp1.syncWith(WTW.temp2);
								}
							} else if (WTW.moldEvents[i].mold.name == "buildingmolds-0-h3ecuos3uff4t8gl-0-2202l5q2xiaogwn5-babylonfile-Guitar") {
								WTW.temp2 = scene.beginAnimation(WTW.moldEvents[i].mold, startframe, endframe, WTW.moldEvents[i].animationloop, Number(WTW.moldEvents[i].speedratio), function() {if (typeof window[endscript] == "function") {window[endscript](endscript);}}, WTW.moldEvents[i].stopcurrentanimations);
								if (WTW.temp1 != null) {
									WTW.temp2.syncWith(WTW.temp1);
								}
							} else {
								scene.beginAnimation(WTW.moldEvents[i].mold, startframe, endframe, WTW.moldEvents[i].animationloop, Number(WTW.moldEvents[i].speedratio), function() {if (typeof window[endscript] == "function") {window[endscript](endscript);}}, WTW.moldEvents[i].stopcurrentanimations);
							}
							if (WTW.moldEvents[i].soundid != '' && WTW.soundMute == false) {
								if (typeof WTW.moldEvents[i].sound.play == 'function') {
									WTW.moldEvents[i].sound.play();
								}
							}
						} else {
							WTW.moldEvents[i].loaded = true;
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_dynamicscripts.js-executeAnimationByName=" + ex.message);
	}
}

WTWJS.prototype.checkFunctionname = function(zfunctionname, zmoldname) {
	/* this process names dynamic created functions and avoids duplicates */
	var znewfunctionname = "";
	try {
		var zletters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var znumbers = "01234567890_";
		var zreservedwords = ["break","do","instanceof","typeof","case","else","new","var","catch","finally","return","void","continue","for","switch","while","debugger","function","this","with","default","if","throw","delete","in","try","abstract","export","interface","static","boolean","extends","long","super","byte","final","native","synchronized","char","float","package","throws","class","goto","private","transient","const","implements","protected","volatile","double","import","public","enum","int","short","null","let","true","false","alert","blur","closed","document","focus","frames","history","innerHeight","innerWidth","length","location","navigator","open","outerHeight","outerWidth","parent","screen","screenX","screenY","statusbar","window"];
		if (zletters.indexOf(zfunctionname.substr(0,1)) > -1) {
			znewfunctionname = zfunctionname.substr(0,1);
		}
		if (znewfunctionname.length == 1) {
			for (var i=1;i<zfunctionname.length;i++) {
				if (zletters.indexOf(zfunctionname.substr(i,1)) > -1 || znumbers.indexOf(zfunctionname.substr(i,1)) > -1) {
					znewfunctionname += zfunctionname.substr(i,1);
				}
			}
			for (var i=0;i<zreservedwords.length;i++) {
				if (zreservedwords[i] == znewfunctionname) {
					znewfunctionname = "";
				}
			}
		}
		if (typeof window[znewfunctionname] == "object") {
			if (window[znewfunctionname] != null) {
				znewfunctionname = '';
			}
		} else if (typeof window[znewfunctionname] != "undefined" || typeof window[znewfunctionname] == "function") {
			znewfunctionname = '';
		}
		if (znewfunctionname == '') {
			znewfunctionname = WTW.setFunctionName(zmoldname);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_dynamicscripts.js-checkFunctionname=" + ex.message);
	}
	return znewfunctionname;
}


/* mold animations and triggered events */

WTWJS.prototype.addMoldAnimation = function(zmoldname, zchildname, zmold, zobjectanimations) {
	/* load an animation to a mold */
	try {
		if (zobjectanimations != null && zmold != null) {
			for (var i=0; i < zobjectanimations.length;i++) {
				if (zobjectanimations[i] != null) {
					if (zobjectanimations[i].animationname != undefined) {
						var zmoldnamepart = zobjectanimations[i].moldnamepart;
						var zmoldevent = zobjectanimations[i].moldevent;
						var zstartframe = Number(zobjectanimations[i].startframe);
						var zendframe = Number(zobjectanimations[i].endframe);
						var zparameters = zstartframe + "-" + zendframe;
						var zanimationloop = false;
						var zspeedratio = Number(zobjectanimations[i].speedratio);
						var zanimationendscript = zobjectanimations[i].animationendscript;
						var zanimationendparameters = zobjectanimations[i].animationendparameters;
						var zstopcurrentanimations = false;
						var zadditionalscript = zobjectanimations[i].additionalscript;
						var zadditionalparameters = zobjectanimations[i].additionalparameters;
						var zsoundid = zobjectanimations[i].soundid;
						var zsoundpath = zobjectanimations[i].soundpath;
						var zsoundmaxdistance = zobjectanimations[i].soundmaxdistance;
						var znamepart = zmoldname.split('-');
						var zsubmoldname = '';
						if (znamepart[6] != null) {
							zsubmoldname = znamepart[6];
						} else if (znamepart[2] != null) {
							zsubmoldname = znamepart[2];
						}
						if (zmoldnamepart == zchildname && zsubmoldname != zchildname && zchildname != '') {
							zmoldname = zmoldname + "-" + zchildname;
						}
						var zanimationname = WTW.checkFunctionname(zobjectanimations[i].animationname, zmoldname);
						if (zobjectanimations[i].animationloop+'' == '1' || zobjectanimations[i].animationloop == true) {
							zanimationloop = true;
						}
						if (zobjectanimations[i].stopcurrentanimations+'' == '1' || zobjectanimations[i].stopcurrentanimations == true) {
							zstopcurrentanimations = true;
						}

						var znewanimation = true;
						var zeventind = -1;
						for (var j=0;j<WTW.moldEvents.length;j++) {
							if (WTW.moldEvents[j] != null) {
								if (WTW.moldEvents[j].moldname == zmoldname && (zmoldnamepart == zchildname || zmoldnamepart == '') && WTW.moldEvents[j].moldevent == zmoldevent && WTW.moldEvents[j].parameters == zparameters) {
									zeventind = j;
									znewanimation = false;
								}
							}
						}
						if (zmoldnamepart == zchildname || zmoldnamepart == '') {
							if (zeventind == -1) {
								zeventind = WTW.moldEvents.length;
								WTW.moldEvents[zeventind] = WTW.newMoldEvent();
							}
							WTW.moldEvents[zeventind].moldevent = zmoldevent;
							WTW.moldEvents[zeventind].moldname = zmoldname;
							WTW.moldEvents[zeventind].mold = zmold;
							WTW.moldEvents[zeventind].parameters = zparameters;
							WTW.moldEvents[zeventind].startframe = zstartframe;
							WTW.moldEvents[zeventind].endframe = zendframe;
							WTW.moldEvents[zeventind].animationloop = zanimationloop;
							WTW.moldEvents[zeventind].speedratio = zspeedratio;
							WTW.moldEvents[zeventind].animationendscript = zanimationendscript;
							WTW.moldEvents[zeventind].animationendparameters = zanimationendparameters;
							WTW.moldEvents[zeventind].stopcurrentanimations = zstopcurrentanimations;
							WTW.moldEvents[zeventind].additionalscript = zadditionalscript;
							WTW.moldEvents[zeventind].additionalparameters = zadditionalparameters;
							WTW.moldEvents[zeventind].soundid = zsoundid;
							WTW.moldEvents[zeventind].soundpath = zsoundpath;
							WTW.moldEvents[zeventind].soundmaxdistance = zsoundmaxdistance;
							if (znewanimation) {
								window[zanimationname] = function(zanimationname) {
									WTW.executeAnimationByName(zanimationname);
								};
								WTW.moldEvents[zeventind].animationname = zanimationname;
								WTW.moldEvents[zeventind].moldfunction = window[zanimationname](zanimationname);
								if (WTW.moldEvents[zeventind].soundid != '') {
									WTW.loadSoundToMold(zmold, zmoldname, zsoundid, zsoundpath, zanimationloop, 'linear', zsoundmaxdistance, 1, 1, zeventind);
								}
								if (zmoldevent == 'onload') {
									window[zanimationname](zanimationname);
								}
							}
						}
					}
				}
			}
		}		
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_dynamicscripts.js-addMoldAnimation=" + ex.message);
	}
}

WTWJS.prototype.resetActiveAnimations = function(zavatar) {
	/* reset animations for an avatar (set active=0 to be reloaded) */
	try {
		if (zavatar != null) {
			if (zavatar.WTW != null) {
				if (zavatar.WTW.animations != null) {
					if (zavatar.WTW.animations.running != null) {
						for(var zevent in zavatar.WTW.animations.running) {
							if (zavatar.WTW.animations.running[zevent] != null) {
								zavatar.WTW.animations.running[zevent].active = 0;
							}
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_dynamicscripts.js-resetActiveAnimations=" + ex.message);
	}
}

WTWJS.prototype.checkAnimationSet = function(zavatar, zevent, zanimationset) {
	/* animation sets are used to temporarily replace animations with alternate animations */
	/* example if you set WTW.animationSet = 'sitting' */
	/* WTW.myAvatar animations would look for 'onwait-sitting' animation and run it temporarily instead of 'onwait' */
	/*      if it is not found, it would still run 'onwait' default animation */
	try {
		if (zavatar != null) {
			if (zavatar.WTW != null) {
				if (zavatar.WTW.animations != null) {
					if (zavatar.WTW.animations.running != null) {
						if (zanimationset.indexOf("vehicle") > -1) {
							zevent = WTW.setVehicleAnimation(zevent);
						} else {
							var zweightkey = zevent;
							if (zanimationset != '') {
								zweightkey = zevent + "-" + zanimationset;
							}
							if (zavatar.WTW.animations.running[zweightkey] != null) {
								zevent = zweightkey;
							}
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_dynamicscripts.js-checkAnimationSet=" + ex.message);
	}
	return zevent;
}

WTWJS.prototype.checkMoldEvent = function(zmoldevent, zmoldname) {
	/* check mold for an event to start an animation (onload, onckick, hovers, etc...) */
	try {
		for (var i=0;i<WTW.moldEvents.length;i++) {
			if (WTW.moldEvents[i] != null) {
				var zcheckmoldevent = WTW.moldEvents[i].moldevent;
				if (zcheckmoldevent == 'onclicktoggle') {
					zcheckmoldevent = 'onclick';
				}
				if (zcheckmoldevent == zmoldevent) {
					if (zmoldname == WTW.moldEvents[i].moldname) {
						if (typeof window[WTW.moldEvents[i].animationname] == 'function') {
							window[WTW.moldEvents[i].animationname](WTW.moldEvents[i].animationname);
						}
						var zadditionalscript = WTW.moldEvents[i].additionalscript;
						if (zadditionalscript != '') {
							if (zadditionalscript.indexOf("WTW.") > -1) {
								zadditionalscript = zadditionalscript.replace("WTW.","")
								if (typeof WTW[zadditionalscript] == 'function') {
									var zparameters = WTW.moldEvents[i].additionalparameters;
									if (zparameters.indexOf(',') > -1) {
										var zvalues = zparameters.split(',');
										WTW[zadditionalscript].apply(null, zvalues);
									} else if (zparameters != '') {
										WTW[zadditionalscript](zparameters);
									} else {
										WTW[zadditionalscript]();
									}
								}
							} else if (typeof window[zadditionalscript] == 'function') {
								var zparameters = WTW.moldEvents[i].additionalparameters;
								if (zparameters.indexOf(',') > -1) {
									var zvalues = zparameters.split(',');
									window[zadditionalscript].apply(null, zvalues);
								} else if (zparameters != '') {
									window[zadditionalscript](zparameters);
								} else {
									window[zadditionalscript]();
								}
							}
						}
					}
				}
			}
		}
		if (zmoldevent == "onclick") {
			var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
			if (zmoldnameparts.parentname.indexOf('seat') > -1) {
				WTW.startSit(zmoldname);
			}
			if (zmoldname.indexOf("myavatar") > -1) {
				WTW.openHUDFollow();
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_dynamicscripts.js-checkMoldEvent=" + ex.message);
	}
}

WTWJS.prototype.setMovementEventsKey = function(zmoveevents, zevent, zweight) {
	/* set the weight of an animation for an event of a 3D Object Model) */
	try {
		for (var i=0;i<zmoveevents.length;i++) {
			if (zmoveevents[i] != null) {
				if (zmoveevents[i].event == zevent) {
					zmoveevents[i].weight = zweight;
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_dynamicscripts.js-setMovementEventsKey=" + ex.message);
	}
	return zmoveevents;
}


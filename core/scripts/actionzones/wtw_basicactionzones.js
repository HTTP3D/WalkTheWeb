WTWJS.prototype.addActionzoneLoadzone = function(actionzonename, actionzoneind, actionzonedef) {
	var actionzone;
	try {
		var molddef = WTW.newMold();
		molddef.shape = actionzonedef.actionzoneshape;
		molddef.covering = "hidden";
		molddef.position.x = actionzonedef.position.x;
		molddef.position.y = actionzonedef.position.y;
		molddef.position.z = actionzonedef.position.z;
		molddef.scaling.x = actionzonedef.scaling.x;
		molddef.scaling.y = actionzonedef.scaling.y;
		molddef.scaling.z = actionzonedef.scaling.z;
		molddef.rotation.x = actionzonedef.rotation.x;
		molddef.rotation.y = actionzonedef.rotation.y;
		molddef.rotation.z = actionzonedef.rotation.z;
		molddef.subdivisions = 12;
		molddef.opacity = 0;
		molddef.parentname = actionzonedef.parentname;
		molddef.actionzoneind = actionzoneind;
		molddef.checkcollisions = "0";
		molddef.ispickable = "0";
		WTW.addMoldToQueue(actionzonename, molddef, molddef.parentname, molddef.covering, null);
		if (WTW.adminView == 1) {
			if (dGet('wtw_bzones').title == "Action Zones are Shown" || actionzonedef.actionzoneid == dGet('wtw_tactionzoneid').value) {
				WTW.setOpacity(actionzonename, .2);
			}
		}
		WTW.actionZones[actionzoneind].shown = "2";
	} catch (ex) {
		WTW.log("core-scripts-actionzones-basicactionzones\r\n addActionzoneLoadzone=" + ex.message);
	}
	return actionzone;
}

WTWJS.prototype.addActionzoneSlidingDoor = function(actionzonename, actionzoneind, actionzonedef) {
	var actionzone;
	try {
		var parentname = actionzonedef.parentname;
		var zpositionx = Number(actionzonedef.position.x);
		var zpositiony = Number(actionzonedef.position.y);
		var zpositionz = Number(actionzonedef.position.z);
		var axispositionx = Number(actionzonedef.axis.position.x);
		var axispositiony = Number(actionzonedef.axis.position.y);
		var axispositionz = Number(actionzonedef.axis.position.z);
		var axisrotx = Number(actionzonedef.axis.rotation.x);
		var axisroty = Number(actionzonedef.axis.rotation.y);
		var axisrotz = Number(actionzonedef.axis.rotation.z);
		var buildingind = -1;
		var moldgroup = "building";
		if (actionzonedef.buildinginfo.buildingid != "") {
			buildingind = WTW.getConnectingGridInd(actionzonedef.buildinginfo.buildingid);
		} else if (actionzonedef.communityinfo.communityid != "") {
			moldgroup = "community";
		} else if (actionzonedef.thinginfo.thingid != "") {
			moldgroup = "thing";
		}
		actionzone = scene.getMeshByID(actionzonename);
		var actionzoneaxlebase = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase-"));
		var actionzoneaxle = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxle-"));
		var actionzoneaxlepole = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlepole-"));
		var actionzoneaxlebase2 = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase2-"));
		if (actionzoneaxlebase == null) {
			var molddef = WTW.newMold();
			molddef.shape = "box";
			molddef.covering = "hidden";
			molddef.opacity = 0;
			molddef.parentname = parentname;
			actionzoneaxlebase = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase-"), molddef, molddef.parentname, molddef.covering);
			actionzoneaxlebase.position.x = axispositionx;
			actionzoneaxlebase.position.y = axispositiony;
			actionzoneaxlebase.position.z = axispositionz;
			actionzoneaxlebase.isPickable = false;
			actionzoneaxlebase.checkCollisions = false;
			actionzoneaxlebase.rotation.x = WTW.getRadians(axisrotx);
			actionzoneaxlebase.rotation.y = WTW.getRadians(axisroty);
			actionzoneaxlebase.rotation.z = WTW.getRadians(axisrotz);
		}
		if (actionzoneaxle == null) {
			WTW.actionZones[actionzoneind].status = 0;
			var molddef1 = WTW.newMold();
			molddef1.shape = "box";
			molddef1.covering = "hidden";
			molddef1.scaling.x = 1;
			molddef1.scaling.y = 1;
			molddef1.scaling.z = 1;
			molddef1.opacity = 0;
			molddef1.parentname = actionzonename.replace("actionzone-","actionzoneaxlebase-");
			actionzoneaxle = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxle-"), molddef1, molddef1.parentname, molddef1.covering);
			actionzoneaxle.position.x = 0;
			actionzoneaxle.position.y = 0;
			actionzoneaxle.position.z = 0;
			actionzoneaxle.isPickable = false;
			actionzoneaxle.checkCollisions = false;
		}
		if (actionzoneaxlepole == null && WTW.adminView == 1) {
			var molddef4 = WTW.newMold();
			molddef4.shape = "box";
			molddef4.covering = "texture";
			molddef4.scaling.x = .20;
			molddef4.scaling.y = .20;
			molddef4.scaling.z = Number(actionzonedef.movementdistance);
			molddef4.graphics.texture.id = "7orpcjosyct5b1bf";
			molddef4.graphics.texture.path = "/content/system/stock/vaxis-512x512.png";
			molddef4.opacity = 0;
			molddef4.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlepole = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlepole-"), molddef4, molddef4.parentname, molddef4.covering);
			actionzoneaxlepole.isPickable = false;
			actionzoneaxlepole.checkCollisions = false;
		}
		if (actionzoneaxlebase2 == null) {
			var molddef2 = WTW.newMold();
			molddef2.shape = "box";
			molddef2.covering = "hidden";
			molddef2.opacity = 0;
			molddef2.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlebase2 = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase2-"), molddef2, molddef2.parentname, molddef2.covering);
			actionzoneaxlebase2.position.x = 0;
			actionzoneaxlebase2.position.y = 0;
			actionzoneaxlebase2.position.z = 0;
			actionzoneaxlebase2.isPickable = false;
			actionzoneaxlebase2.checkCollisions = false;
			actionzoneaxlebase2.rotation.x = WTW.getRadians(-axisrotx);
			actionzoneaxlebase2.rotation.y = WTW.getRadians(-axisroty);
			actionzoneaxlebase2.rotation.z = WTW.getRadians(-axisrotz);
		}
		if (actionzone == null) {
			var molddef5 = WTW.newMold();
			molddef5.shape = actionzonedef.actionzoneshape;
			molddef5.covering = "hidden";
			molddef5.scaling.x = actionzonedef.scaling.x;
			molddef5.scaling.y = actionzonedef.scaling.y;
			molddef5.scaling.z = actionzonedef.scaling.z;
			molddef5.subdivisions = 20;
			molddef5.opacity = 0;
			molddef5.parentname = parentname;
			actionzone = WTW.addMold(actionzonename, molddef5, molddef5.parentname, molddef5.covering);
			actionzone.isPickable = false;
			actionzone.checkCollisions = false;
			actionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			var movementtype = "slide";
			var movementdistance = 0;
			if (actionzonedef.movementtype != null) {
				movementtype = actionzonedef.movementtype;
			}
			if (WTW.isNumeric(actionzonedef.movementdistance)) {
				movementdistance = Number(actionzonedef.movementdistance);
			}
			try {
				var condition1 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var test = true;
					var currentactionzoneind = actionzoneind;
					if (WTW.actionZones[currentactionzoneind] != null) {
						var offsetz = 0; //Number(WTW.actionZones[currentactionzoneind].axis.position.z);
						var currentdoor = actionzoneaxle;
						var currenttest = currentdoor.position.z - offsetz;
						var currentmovementdistance = Number(WTW.actionZones[currentactionzoneind].movementdistance);
						var doorparts = currentdoor.getChildren();
						if (WTW.actionZones[currentactionzoneind] != null) {
							if (WTW.actionZones[currentactionzoneind].status == 3) {
								if (Math.round(currenttest * 1000) / 1000 >= Math.round(currentmovementdistance * 1000) / 1000) {
									WTW.actionZones[currentactionzoneind].status = 4;
								}
								test = (currenttest < currentmovementdistance);
							} else {
								test = false;
							}
						} else {
							test = false;
						}
					} else {
						test = false;
					}
					return test;
				});
				var condition2 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var test = true;
					var currentactionzoneind = actionzoneind;
					if (WTW.actionZones[currentactionzoneind] != null) {
						var offsetz = 0; //Number(WTW.actionZones[currentactionzoneind].axis.position.z);
						var currentdoor = actionzoneaxle;
						var currenttest = currentdoor.position.z - offsetz;
						var currentmovementdistance = Number(WTW.actionZones[currentactionzoneind].movementdistance);
						var doorparts = currentdoor.getChildren();
						if (WTW.actionZones[currentactionzoneind] != null) {
							if (WTW.actionZones[currentactionzoneind].status == 2) {
								if (currenttest <= 0) {
									currentdoor.position.z = offsetz;
									WTW.actionZones[currentactionzoneind].status = 1;
								}
								test = (currenttest > 0);
							} else {
								test = false;
							}
						} else {
							test = false;
						}
					} else {
						test = false;
					}
					return test;
				});
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, actionzoneaxle, "position.z", 0.5, condition1)); 
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, actionzoneaxle, "position.z", -0.5, condition2));
				WTW.actionZones[actionzoneind].status = 1;
			} catch (ex) {
			}
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == "Action Zones are Shown") {
				WTW.setOpacity(actionzonename, .2);
				WTW.setOpacity(actionzonename.replace("actionzone-","actionzoneaxlepole-"), 1);
			}
		}
		WTW.actionZones[actionzoneind].shown = "2";
	} catch (ex) {
		WTW.log("core-scripts-actionzones-basicactionzones\r\n addActionzoneSlidingDoor=" + ex.message);
	}
	return actionzone;
}

WTWJS.prototype.addActionzoneSwingingDoor = function(actionzonename, actionzoneind, actionzonedef) {
	var actionzone;
	try {
		var parentname = actionzonedef.parentname;
		var zpositionx = Number(actionzonedef.position.x);
		var zpositiony = Number(actionzonedef.position.y);
		var zpositionz = Number(actionzonedef.position.z);
		var axispositionx = Number(actionzonedef.axis.position.x);
		var axispositiony = Number(actionzonedef.axis.position.y);
		var axispositionz = Number(actionzonedef.axis.position.z);
		var axisrotx = Number(actionzonedef.axis.rotation.x);
		var axisroty = Number(actionzonedef.axis.rotation.y);
		var axisrotz = Number(actionzonedef.axis.rotation.z);
		var buildingind = -1;
		var moldgroup = "building";
		if (actionzonedef.buildinginfo.buildingid != "") {
			buildingind = WTW.getConnectingGridInd(actionzonedef.buildinginfo.buildingid);
		} else if (actionzonedef.communityinfo.communityid != "") {
			moldgroup = "community";
		} else if (actionzonedef.thinginfo.thingid != "") {
			moldgroup = "thing";
		}
		actionzone = scene.getMeshByID(actionzonename);
		var actionzoneaxlebase = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase-"));
		var actionzoneaxle = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxle-"));
		var actionzoneaxlepole = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlepole-"));
		var actionzoneaxlebase2 = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase2-"));
		if (actionzoneaxlebase == null) {
			var molddef = WTW.newMold();
			molddef.shape = "box";
			molddef.covering = "hidden";
			molddef.opacity = 0;
			molddef.parentname = parentname;
			actionzoneaxlebase = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase-"), molddef, molddef.parentname, molddef.covering);
			actionzoneaxlebase.position.x = axispositionx;
			actionzoneaxlebase.position.y = axispositiony;
			actionzoneaxlebase.position.z = axispositionz;
			actionzoneaxlebase.isPickable = false;
			actionzoneaxlebase.checkCollisions = false;
			actionzoneaxlebase.rotation.x = WTW.getRadians(axisrotx);
			actionzoneaxlebase.rotation.y = WTW.getRadians(axisroty);
			actionzoneaxlebase.rotation.z = WTW.getRadians(axisrotz);
		}
		if (actionzoneaxle == null) {
			WTW.actionZones[actionzoneind].status = 0;
			var molddef1 = WTW.newMold();
			molddef1.shape = "box";
			molddef1.covering = "hidden";
			molddef1.scaling.x = 1;
			molddef1.scaling.y = 1;
			molddef1.scaling.z = 1;
			molddef1.opacity = 0;
			molddef1.parentname = actionzonename.replace("actionzone-","actionzoneaxlebase-");
			actionzoneaxle = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxle-"), molddef1, molddef1.parentname, molddef1.covering);
			actionzoneaxle.position.x = 0;
			actionzoneaxle.position.y = 0;
			actionzoneaxle.position.z = 0;
			actionzoneaxle.isPickable = false;
			actionzoneaxle.checkCollisions = false;
		}
		if (actionzoneaxlepole == null && WTW.adminView == 1) {
			var molddef4 = WTW.newMold();
			molddef4.shape = "box";
			molddef4.covering = "texture";
			molddef4.scaling.x = .20;
			molddef4.scaling.y = 20;
			molddef4.scaling.z = .20;
			molddef4.rotation.x = Number(actionzonedef.axis.rotation.x);
			molddef4.rotation.y = 0;
			molddef4.rotation.z = Number(actionzonedef.axis.rotation.z);
			molddef4.graphics.texture.id = "7orpcjosyct5b1bf";
			molddef4.graphics.texture.path = "/content/system/stock/vaxis-512x512.png";
			molddef4.opacity = 0;
			molddef4.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlepole = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlepole-"), molddef4, molddef4.parentname, molddef4.covering);
			actionzoneaxlepole.isPickable = false;
			actionzoneaxlepole.checkCollisions = false;
		}
		if (actionzoneaxlebase2 == null) {
			var molddef2 = WTW.newMold();
			molddef2.shape = "box";
			molddef2.covering = "hidden";
			molddef2.opacity = 0;
			molddef2.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlebase2 = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase2-"), molddef2, molddef2.parentname, molddef2.covering);
			actionzoneaxlebase2.position.x = 0;
			actionzoneaxlebase2.position.y = 0;
			actionzoneaxlebase2.position.z = 0;
			actionzoneaxlebase2.isPickable = false;
			actionzoneaxlebase2.checkCollisions = false;
			actionzoneaxlebase2.rotation.x = WTW.getRadians(-axisrotx);
			actionzoneaxlebase2.rotation.y = WTW.getRadians(-axisroty);
			actionzoneaxlebase2.rotation.z = WTW.getRadians(-axisrotz);
		}
		if (actionzone == null) {
			var molddef5 = WTW.newMold();
			molddef5.shape = actionzonedef.actionzoneshape;
			molddef5.covering = "hidden";
			molddef5.scaling.x = actionzonedef.scaling.x;
			molddef5.scaling.y = actionzonedef.scaling.y;
			molddef5.scaling.z = actionzonedef.scaling.z;
			molddef5.subdivisions = 20;
			molddef5.opacity = 0;
			molddef5.parentname = parentname;
			actionzone = WTW.addMold(actionzonename, molddef5, molddef5.parentname, molddef5.covering);
			actionzone.isPickable = false;
			actionzone.checkCollisions = false;
			actionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			var movementtype = "swing";
			var movementdistance = 0;
			if (actionzonedef.movementtype != null) {
				movementtype = actionzonedef.movementtype;
			}
			if (WTW.isNumeric(actionzonedef.movementdistance)) {
				movementdistance = Number(actionzonedef.movementdistance);
			}
			var axlename = actionzonename.replace("actionzone-","actionzoneaxle-");
			var axledir = "rotation.y";
			var swingdir = 1;
			var swingdist = 90;
			switch (actionzonedef.axis.rotateaxis) {
				case "x":
					axledir = "rotation.x";
					break;
				case "z":
					axledir = "rotation.z";
					break;
				default:
					axledir = "rotation.y";
					break;
			}
			if (actionzonedef.axis.rotatedirection == "-1") {
				swingdir = -1;
			}
			if (WTW.isNumeric(actionzonedef.axis.rotatedegrees)) {
				swingdist =  Number(actionzonedef.axis.rotatedegrees);
			}			
			try {
				var condition1 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var test = true;
					var currentactionzoneind = actionzoneind;
					var currentaxlename = axlename;
					var currentaxledir = axledir;
					var currentswingdist = swingdist;
					var currentrotatetest = 0;
					var currentswingdir = swingdir;
					var currentdoor = actionzoneaxle;
					var doorparts = currentdoor.getChildren();
					if (WTW.actionZones[currentactionzoneind] != null) {
						if (WTW.isNumeric(WTW.actionZones[currentactionzoneind].axis.rotatedegrees)) {
							currentswingdist =  Number(WTW.actionZones[currentactionzoneind].axis.rotatedegrees);
						}
						if (Number(WTW.actionZones[currentactionzoneind].axis.rotatedirection) == -1) {
							currentswingdir = -1;
						} else if (Number(WTW.actionZones[currentactionzoneind].axis.rotatedirection) == 1) {
							currentswingdir = 1;
						}
						currentaxledir =  WTW.actionZones[currentactionzoneind].axis.rotateaxis;
						switch (currentaxledir) {
							case "rotation.x":
								currentrotatetest = currentdoor.rotation.x;
								break;
							case "rotation.z":
								currentrotatetest = currentdoor.rotation.z;
								break;
							default:
								currentrotatetest = currentdoor.rotation.y;
								break;
						}
						if (WTW.actionZones[currentactionzoneind].status == 3) {
							if (currentswingdir == 1) {
								if (Math.round(currentrotatetest * 1000) / 1000 >= Math.round(WTW.getRadians(currentswingdist) * 1000) / 1000) {
									WTW.actionZones[currentactionzoneind].status = 4;
								}
								test = (currentrotatetest < WTW.getRadians(currentswingdist));
							} else {
								if (Math.round(currentrotatetest * 1000) / 1000 <= Math.round(WTW.getRadians(currentswingdir * currentswingdist) * 1000) / 1000) {
									WTW.actionZones[currentactionzoneind].status = 4;
								}
								test = (currentrotatetest > WTW.getRadians(currentswingdir * currentswingdist));
							}
						} else {
							test = false;
						}
					} else {
						test = false;
					}
					return test;
				});
				var condition2 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var test = true;
					var currentactionzoneind = actionzoneind;
					var currentaxlename = axlename;
					var currentaxledir = axledir;
					var currentrotatetest = 0;
					var currentswingdir = -swingdir;
					var currentdoor = actionzoneaxle;
					var doorparts = currentdoor.getChildren();
					if (WTW.actionZones[currentactionzoneind] != null) {
						if (Number(WTW.actionZones[currentactionzoneind].axis.rotatedirection) == -1) {
							currentswingdir = 1;
						} else if (Number(WTW.actionZones[currentactionzoneind].axis.rotatedirection) == 1) {
							currentswingdir = -1;
						}
						currentaxledir =  WTW.actionZones[currentactionzoneind].axis.rotateaxis;
						switch (currentaxledir) {
							case "rotation.x":
								currentrotatetest = currentdoor.rotation.x;
								break;
							case "rotation.z":
								currentrotatetest = currentdoor.rotation.z;
								break;
							default:
								currentrotatetest = currentdoor.rotation.y;
								break;
						}
						if (WTW.actionZones[currentactionzoneind].status == 2) {
							if (currentswingdir == 1) {
								if (currentrotatetest >= WTW.getRadians(0)) {
									currentdoor.rotation.y = WTW.getRadians(0);
									WTW.actionZones[currentactionzoneind].status = 1;
								}
								test = (currentrotatetest < WTW.getRadians(0));
							} else {
								if (currentrotatetest <= WTW.getRadians(0)) {
									currentdoor.rotation.y = WTW.getRadians(0);
									WTW.actionZones[currentactionzoneind].status = 1;
								}
								test = (currentrotatetest > WTW.getRadians(0));
							}
						} else {
							test = false;
						}
					} else {
						test = false;
					}
					return test;
				});
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, actionzoneaxle, axledir, (swingdir * 0.1), condition1)); 
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, actionzoneaxle, axledir, (-swingdir * 0.1), condition2));
				WTW.actionZones[actionzoneind].status = 1;
			} catch (ex) {
			}
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == "Action Zones are Shown") {
				WTW.setOpacity(actionzonename, .2);
				WTW.setOpacity(actionzonename.replace("actionzone-","actionzoneaxlepole-"), 1);
			}
		}
		WTW.actionZones[actionzoneind].shown = "2";
	} catch (ex) {
		WTW.log("core-scripts-actionzones-basicactionzones\r\n addActionzoneSwingingDoor=" + ex.message);
	}
	return actionzone;
}

WTWJS.prototype.addActionzoneClickSlidingDoor = function(actionzonename, actionzoneind, actionzonedef) {
	var actionzone;
	try {
		var parentname = actionzonedef.parentname;
		var zpositionx = Number(actionzonedef.position.x);
		var zpositiony = Number(actionzonedef.position.y);
		var zpositionz = Number(actionzonedef.position.z);
		var axispositionx = Number(actionzonedef.axis.position.x);
		var axispositiony = Number(actionzonedef.axis.position.y);
		var axispositionz = Number(actionzonedef.axis.position.z);
		var axisrotx = Number(actionzonedef.axis.rotation.x);
		var axisroty = Number(actionzonedef.axis.rotation.y);
		var axisrotz = Number(actionzonedef.axis.rotation.z);
		var buildingind = -1;
		var moldgroup = "building";
		if (actionzonedef.buildinginfo.buildingid != "") {
			buildingind = WTW.getConnectingGridInd(actionzonedef.buildinginfo.buildingid);
		} else if (actionzonedef.communityinfo.communityid != "") {
			moldgroup = "community";
		} else if (actionzonedef.thinginfo.thingid != "") {
			moldgroup = "thing";
		}
		actionzone = scene.getMeshByID(actionzonename);
		var actionzoneaxlebase = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase-"));
		var actionzoneaxle = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxle-"));
		var actionzoneaxlepole = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlepole-"));
		var actionzoneaxlebase2 = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase2-"));
		if (actionzoneaxlebase == null) {
			var molddef = WTW.newMold();
			molddef.shape = "box";
			molddef.covering = "hidden";
			molddef.opacity = 0;
			molddef.parentname = parentname;
			actionzoneaxlebase = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase-"), molddef, molddef.parentname, molddef.covering);
			actionzoneaxlebase.position.x = axispositionx;
			actionzoneaxlebase.position.y = axispositiony;
			actionzoneaxlebase.position.z = axispositionz;
			actionzoneaxlebase.isPickable = false;
			actionzoneaxlebase.checkCollisions = false;
			actionzoneaxlebase.rotation.x = WTW.getRadians(axisrotx);
			actionzoneaxlebase.rotation.y = WTW.getRadians(axisroty);
			actionzoneaxlebase.rotation.z = WTW.getRadians(axisrotz);
		}
		if (actionzoneaxle == null) {
			WTW.actionZones[actionzoneind].status = 0;
			var molddef1 = WTW.newMold();
			molddef1.shape = "box";
			molddef1.covering = "hidden";
			molddef1.scaling.x = 1;
			molddef1.scaling.y = 1;
			molddef1.scaling.z = 1;
			molddef1.opacity = 0;
			molddef1.parentname = actionzonename.replace("actionzone-","actionzoneaxlebase-");
			actionzoneaxle = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxle-"), molddef1, molddef1.parentname, molddef1.covering);
			actionzoneaxle.position.x = 0;
			actionzoneaxle.position.y = 0;
			actionzoneaxle.position.z = 0;
			actionzoneaxle.isPickable = false;
			actionzoneaxle.checkCollisions = false;
		}
		if (actionzoneaxlepole == null && WTW.adminView == 1) {
			var molddef4 = WTW.newMold();
			molddef4.shape = "box";
			molddef4.covering = "texture";
			molddef4.scaling.x = .20;
			molddef4.scaling.y = .20;
			molddef4.scaling.z = Number(actionzonedef.movementdistance);
			molddef4.graphics.texture.id = "7orpcjosyct5b1bf";
			molddef4.graphics.texture.path = "/content/system/stock/vaxis-512x512.png";
			molddef4.opacity = 0;
			molddef4.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlepole = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlepole-"), molddef4, molddef4.parentname, molddef4.covering);
			actionzoneaxlepole.isPickable = false;
			actionzoneaxlepole.checkCollisions = false;
		}
		if (actionzoneaxlebase2 == null) {
			var molddef2 = WTW.newMold();
			molddef2.shape = "box";
			molddef2.covering = "hidden";
			molddef2.opacity = 0;
			molddef2.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlebase2 = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase2-"), molddef2, molddef2.parentname, molddef2.covering);
			actionzoneaxlebase2.position.x = 0;
			actionzoneaxlebase2.position.y = 0;
			actionzoneaxlebase2.position.z = 0;
			actionzoneaxlebase2.isPickable = false;
			actionzoneaxlebase2.checkCollisions = false;
			actionzoneaxlebase2.rotation.x = WTW.getRadians(-axisrotx);
			actionzoneaxlebase2.rotation.y = WTW.getRadians(-axisroty);
			actionzoneaxlebase2.rotation.z = WTW.getRadians(-axisrotz);
		}
		if (actionzone == null) {
			var molddef5 = WTW.newMold();
			molddef5.shape = actionzonedef.actionzoneshape;
			molddef5.covering = "hidden";
			molddef5.scaling.x = .001; //actionzonedef.scaling.x;
			molddef5.scaling.y = .001; //actionzonedef.scaling.y;
			molddef5.scaling.z = .001; //actionzonedef.scaling.z;
			molddef5.subdivisions = 20;
			molddef5.opacity = 0;
			molddef5.parentname = parentname;
			actionzone = WTW.addMold(actionzonename, molddef5, molddef5.parentname, molddef5.covering);
			actionzone.isPickable = false;
			actionzone.checkCollisions = false;
			actionzone.isVisible = false;
			actionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			var movementtype = "slide";
			var movementdistance = 0;
			if (actionzonedef.movementtype != null) {
				movementtype = actionzonedef.movementtype;
			}
			if (WTW.isNumeric(actionzonedef.movementdistance)) {
				movementdistance = Number(actionzonedef.movementdistance);
			}
			try {
				var condition1 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var test = true;
					var currentactionzoneind = actionzoneind;
					if (WTW.actionZones[currentactionzoneind] != null) {
						var offsetz = 0; //Number(WTW.actionZones[currentactionzoneind].axis.position.z);
						var currentdoor = actionzoneaxle;
						var currenttest = currentdoor.position.z - offsetz;
						var currentmovementdistance = Number(WTW.actionZones[currentactionzoneind].movementdistance);
						var doorparts = currentdoor.getChildren();
						if (WTW.actionZones[currentactionzoneind] != null) {
							if (WTW.actionZones[currentactionzoneind].status == 3) {
								if (Math.round(currenttest * 1000) / 1000 >= Math.round(currentmovementdistance * 1000) / 1000) {
									WTW.actionZones[currentactionzoneind].status = 4;
								}
								test = (currenttest < currentmovementdistance);
							} else {
								test = false;
							}
						} else {
							test = false;
						}
					} else {
						test = false;
					}
					return test;
				});
				var condition2 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var test = true;
					var currentactionzoneind = actionzoneind;
					if (WTW.actionZones[currentactionzoneind] != null) {
						var offsetz = 0; //Number(WTW.actionZones[currentactionzoneind].axis.position.z);
						var currentdoor = actionzoneaxle;
						var currenttest = currentdoor.position.z - offsetz;
						var currentmovementdistance = Number(WTW.actionZones[currentactionzoneind].movementdistance);
						var doorparts = currentdoor.getChildren();
						if (WTW.actionZones[currentactionzoneind] != null) {
							if (WTW.actionZones[currentactionzoneind].status == 2) {
								if (currenttest <= 0) {
									currentdoor.position.z = offsetz;
									WTW.actionZones[currentactionzoneind].status = 1;
								}
								test = (currenttest > 0);
							} else {
								test = false;
							}
						} else {
							test = false;
						}
					} else {
						test = false;
					}
					return test;
				});
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, actionzoneaxle, "position.z", 0.5, condition1)); 
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, actionzoneaxle, "position.z", -0.5, condition2));
				WTW.actionZones[actionzoneind].status = 1;
			} catch (ex) {
			}
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == "Action Zones are Shown") {
				WTW.setOpacity(actionzonename, .2);
				WTW.setOpacity(actionzonename.replace("actionzone-","actionzoneaxlepole-"), 1);
			}
		}
		WTW.actionZones[actionzoneind].shown = "2";
	} catch (ex) {
		WTW.log("core-scripts-actionzones-basicactionzones\r\n addActionzoneClickSlidingDoor=" + ex.message);
	}
	return actionzone;
}

WTWJS.prototype.addActionzoneMirror = function(actionzonename, actionzoneind, actionzonedef) {
	var actionzone;
	try {
		if (WTW.actionZones[actionzoneind].shown == "0") {
			var parentname = actionzonedef.parentname;
			var zpositionx = Number(actionzonedef.position.x);
			var zpositiony = Number(actionzonedef.position.y);
			var zpositionz = Number(actionzonedef.position.z);
			actionzone = scene.getMeshByID(actionzonename);
			if (actionzone == null) {
				var molddef5 = WTW.newMold();
				molddef5.shape = actionzonedef.actionzoneshape;
				molddef5.covering = "hidden";
				molddef5.scaling.x = actionzonedef.scaling.x;
				molddef5.scaling.y = actionzonedef.scaling.y;
				molddef5.scaling.z = actionzonedef.scaling.z;
				molddef5.subdivisions = 12;
				molddef5.opacity = 0;
				molddef5.parentname = actionzonedef.parentname;
				actionzone = WTW.addMold(actionzonename, molddef5, molddef5.parentname, molddef5.covering);
				actionzone.isPickable = false;
				actionzone.checkCollisions = false;
				actionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			}
			if (dGet('wtw_bzones') != null) {
				if (WTW.adminView == 1 && dGet('wtw_bzones').title == "Action Zones are Shown") {
					WTW.setOpacity(actionzonename, .2);
				}
			}
			WTW.actionZones[actionzoneind].shown = "2";
		}
	} catch (ex) {
		WTW.log("core-scripts-actionzones-basicactionzones\r\n addActionzoneMirror=" + ex.message);
	}
	return actionzone;
}

WTWJS.prototype.addActionzoneRidealong = function(actionzonename, actionzoneind, actionzonedef) {
	var actionzone;
	try {
		var parentname = actionzonedef.parentname;
		var zpositionx = Number(actionzonedef.position.x);
		var zpositiony = Number(actionzonedef.position.y);
		var zpositionz = Number(actionzonedef.position.z);
		//var attachmoldid = actionzonedef.attachmoldid;
		var parentmold = scene.getMeshByID(parentname);
		if (parentmold != null) {
			if (parentname.indexOf("molds") > -1) {
				var actionzoneaxlebase = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase-"));
				if (actionzoneaxlebase == null) {
					var molddef = WTW.newMold();
					molddef.shape = "box";
					molddef.covering = "hidden";
					molddef.opacity = 0;
					molddef.parentname = parentname;
					actionzoneaxlebase = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase-"), molddef, molddef.parentname, molddef.covering);
					actionzoneaxlebase.position.x = 0;
					actionzoneaxlebase.position.y = 0;
					actionzoneaxlebase.position.z = 0;
					actionzoneaxlebase.isPickable = false;
					actionzoneaxlebase.checkCollisions = false;
					actionzoneaxlebase.scaling.x = 1/parentmold.scaling.x;
					actionzoneaxlebase.scaling.y = 1/parentmold.scaling.y;
					actionzoneaxlebase.scaling.z = 1/parentmold.scaling.z;
					actionzoneaxlebase.rotation.x = -parentmold.rotation.x;
					actionzoneaxlebase.rotation.y = -parentmold.rotation.y;
					actionzoneaxlebase.rotation.z = -parentmold.rotation.z;
				}
				actionzone = scene.getMeshByID(actionzonename);
				if (actionzone == null) {
					var molddef5 = WTW.newMold();
					molddef5.shape = actionzonedef.actionzoneshape;
					molddef5.covering = "hidden";
					molddef5.position.x = zpositionx - actionzoneaxlebase.position.x;
					molddef5.position.y = zpositiony - actionzoneaxlebase.position.y;
					molddef5.position.z = zpositionz - actionzoneaxlebase.position.z;
					molddef5.scaling.x = actionzonedef.scaling.x;
					molddef5.scaling.y = actionzonedef.scaling.y;
					molddef5.scaling.z = actionzonedef.scaling.z;
					molddef5.rotation.x = actionzonedef.rotation.x;
					molddef5.rotation.y = actionzonedef.rotation.y;
					molddef5.rotation.z = actionzonedef.rotation.z;
					molddef5.subdivisions = 12;
					molddef5.opacity = 0;
					molddef5.parentname = actionzonename.replace("actionzone-","actionzoneaxlebase-");
					actionzone = WTW.addMold(actionzonename, molddef5, molddef5.parentname, molddef5.covering);
					actionzone.isPickable = false;
					actionzone.checkCollisions = false;
				}
			} else {
				var actionzoneaxlebase = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase-"));
				if (actionzoneaxlebase == null) {
					var molddef = WTW.newMold();
					molddef.shape = "box";
					molddef.covering = "hidden";
					molddef.opacity = 0;
					molddef.parentname = parentname;
					actionzoneaxlebase = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase-"), molddef, molddef.parentname, molddef.covering);
					actionzoneaxlebase.position.x = 0;
					actionzoneaxlebase.position.y = 0;
					actionzoneaxlebase.position.z = 0;
					actionzoneaxlebase.isPickable = false;
					actionzoneaxlebase.checkCollisions = false;
					actionzoneaxlebase.scaling.x = 1;
					actionzoneaxlebase.scaling.y = 1;
					actionzoneaxlebase.scaling.z = 1;
					actionzoneaxlebase.rotation.x = 0;
					actionzoneaxlebase.rotation.y = 0;
					actionzoneaxlebase.rotation.z = 0;
				}
				actionzone = scene.getMeshByID(actionzonename);
				if (actionzone == null) {
					var molddef5 = WTW.newMold();
					molddef5.shape = actionzonedef.actionzoneshape;
					molddef5.covering = "hidden";
					molddef5.position.x = zpositionx;
					molddef5.position.y = zpositiony;
					molddef5.position.z = zpositionz;
					molddef5.scaling.x = actionzonedef.scaling.x;
					molddef5.scaling.y = actionzonedef.scaling.y;
					molddef5.scaling.z = actionzonedef.scaling.z;
					molddef5.rotation.x = actionzonedef.rotation.x;
					molddef5.rotation.y = actionzonedef.rotation.y;
					molddef5.rotation.z = actionzonedef.rotation.z;
					molddef5.subdivisions = 12;
					molddef5.opacity = 0;
					molddef5.parentname = actionzonedef.parentname;
					actionzone = WTW.addMold(actionzonename, molddef5, molddef5.parentname, molddef5.covering);
					actionzone.isPickable = false;
					actionzone.checkCollisions = false;
					actionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
				}
			}
			if (dGet('wtw_bzones') != null) {
				if (WTW.adminView == 1 && dGet('wtw_bzones').title == "Action Zones are Shown") {
					WTW.setOpacity(actionzonename, .2);
				}
			}
			WTW.actionZones[actionzoneind].shown = "2";
		}
	} catch (ex) {
		WTW.log("core-scripts-actionzones-basicactionzones\r\n addActionzoneRidealong=" + ex.message);
	}
	return actionzone;
}

WTWJS.prototype.addActionzoneRotate = function(actionzonename, actionzoneind, actionzonedef) {
	var actionzone;
	try {
		var parentname = actionzonedef.parentname;
		var zpositionx = Number(actionzonedef.position.x);
		var zpositiony = Number(actionzonedef.position.y);
		var zpositionz = Number(actionzonedef.position.z);
		var axispositionx = Number(actionzonedef.axis.position.x);
		var axispositiony = Number(actionzonedef.axis.position.y);
		var axispositionz = Number(actionzonedef.axis.position.z);
		var axisrotx = Number(actionzonedef.axis.rotation.x);
		var axisroty = Number(actionzonedef.axis.rotation.y);
		var axisrotz = Number(actionzonedef.axis.rotation.z);
		var rotatespeed = Number(actionzonedef.rotatespeed);
		var buildingind = -1;
		var moldgroup = "building";
		if (actionzonedef.buildinginfo.buildingid != "") {
			buildingind = WTW.getConnectingGridInd(actionzonedef.buildinginfo.buildingid);
		} else if (actionzonedef.communityinfo.communityid != "") {
			moldgroup = "community";
		} else if (actionzonedef.thinginfo.thingid != "") {
			moldgroup = "thing";
		}
		actionzone = scene.getMeshByID(actionzonename);
		var actionzoneaxlebase = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase-"));
		var actionzoneaxle = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxle-"));
		var actionzoneaxlepole = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlepole-"));
		var actionzoneaxlebase2 = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase2-"));
		if (actionzoneaxlebase == null) {
			var molddef = WTW.newMold();
			molddef.shape = "box";
			molddef.covering = "hidden";
			molddef.opacity = 0;
			molddef.parentname = parentname;
			actionzoneaxlebase = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase-"), molddef, molddef.parentname, molddef.covering);
			actionzoneaxlebase.position.x = axispositionx;
			actionzoneaxlebase.position.y = axispositiony;
			actionzoneaxlebase.position.z = axispositionz;
			actionzoneaxlebase.isPickable = false;
			actionzoneaxlebase.checkCollisions = false;
			actionzoneaxlebase.rotation.x = WTW.getRadians(axisrotx);
			actionzoneaxlebase.rotation.y = WTW.getRadians(0);
			actionzoneaxlebase.rotation.z = WTW.getRadians(axisrotz);
		}
		if (actionzoneaxle == null) {
			WTW.actionZones[actionzoneind].status = 0;
			var molddef1 = WTW.newMold();
			molddef1.shape = "box";
			molddef1.covering = "hidden";
			molddef1.scaling.x = 1;
			molddef1.scaling.y = 1;
			molddef1.scaling.z = 1;
			molddef1.opacity = 0;
			molddef1.parentname = actionzonename.replace("actionzone-","actionzoneaxlebase-");
			actionzoneaxle = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxle-"), molddef1, molddef1.parentname, molddef1.covering);
			actionzoneaxle.position.x = 0;
			actionzoneaxle.position.y = 0;
			actionzoneaxle.position.z = 0;
			actionzoneaxle.rotation.y = WTW.getRadians(axisroty);
			actionzoneaxle.isPickable = false;
			actionzoneaxle.checkCollisions = false;
		}
		if (actionzoneaxlepole == null) {
			var molddef4 = WTW.newMold();
			molddef4.shape = "box";
			molddef4.covering = "texture";
			molddef4.scaling.x = .20;
			molddef4.scaling.y = 20;
			molddef4.scaling.z = .20;
			molddef4.rotation.x = Number(actionzonedef.axis.rotation.x);
			molddef4.rotation.y = 0;
			molddef4.rotation.z = Number(actionzonedef.axis.rotation.z);
			molddef4.graphics.texture.id = "7orpcjosyct5b1bf";
			molddef4.graphics.texture.path = "/content/system/stock/vaxis-512x512.png";
			molddef4.opacity = 0;
			molddef4.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlepole = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlepole-"), molddef4, molddef4.parentname, molddef4.covering);
			actionzoneaxlepole.isPickable = false;
			actionzoneaxlepole.checkCollisions = false;
		}
		if (actionzoneaxlebase2 == null) {
			var molddef2 = WTW.newMold();
			molddef2.shape = "box";
			molddef2.covering = "hidden";
			molddef2.opacity = 0;
			molddef2.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlebase2 = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase2-"), molddef2, molddef2.parentname, molddef2.covering);
			actionzoneaxlebase2.position.x = 0;
			actionzoneaxlebase2.position.y = 0;
			actionzoneaxlebase2.position.z = 0;
			actionzoneaxlebase2.isPickable = false;
			actionzoneaxlebase2.checkCollisions = false;
			actionzoneaxlebase2.rotation.x = WTW.getRadians(-axisrotx);
			actionzoneaxlebase2.rotation.y = WTW.getRadians(0);
			actionzoneaxlebase2.rotation.z = WTW.getRadians(-axisrotz);
		}
		if (actionzone == null) {
			var molddef5 = WTW.newMold();
			molddef5.shape = "box";
			molddef5.covering = "hidden";
			molddef5.position.x = 0;
			molddef5.position.y = 0;
			molddef5.position.z = 0;
			molddef5.scaling.x = 1;
			molddef5.scaling.y = 1;
			molddef5.scaling.z = 1;
			molddef5.subdivisions = 20;
			molddef5.opacity = 0;
			molddef5.parentname = parentname;
			actionzone = WTW.addMold(actionzonename, molddef5, molddef5.parentname, molddef5.covering);
			actionzone.rotation.x = 0;
			actionzone.rotation.y = 0;
			actionzone.rotation.z = 0;
			actionzone.isPickable = false;
			actionzone.checkCollisions = false;
			actionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			try {
				var condition1 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var test = false;
					var currentactionzoneind = actionzoneind;
					if (WTW.actionZones[currentactionzoneind] != null) {
						if (WTW.actionZones[currentactionzoneind].status == 1) {
							test = true;
						}
					}
					return test;
				});
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, actionzoneaxle, "rotation.y", Number(WTW.actionZones[actionzoneind].rotatespeed)/100, condition1)); 
			} catch (ex) {
				WTW.log("core-scripts-actionzones-basicactionzones\r\n addActionzoneRotate=" + ex.message);
			}
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == "Action Zones are Shown") {
				WTW.setOpacity(actionzonename, .2);
				WTW.setOpacity(actionzonename.replace("actionzone-","actionzoneaxlepole-"), 1);
			}
		}
		WTW.actionZones[actionzoneind].status = 1;
		WTW.actionZones[actionzoneind].shown = "2";
	} catch (ex) {
		WTW.log("core-scripts-actionzones-basicactionzones\r\n addActionzoneRotate=" + ex.message);
	}
	return actionzone;
}

WTWJS.prototype.addActionzonePeoplemover = function(actionzonename, actionzoneind, actionzonedef) {
	var actionzone;
	try {
		var parentname = actionzonedef.parentname;
		var zpositionx = Number(actionzonedef.position.x);
		var zpositiony = Number(actionzonedef.position.y);
		var zpositionz = Number(actionzonedef.position.z);
		var axispositionx = Number(actionzonedef.axis.position.x);
		var axispositiony = Number(actionzonedef.axis.position.y);
		var axispositionz = Number(actionzonedef.axis.position.z);
		var axisrotx = Number(actionzonedef.axis.rotation.x);
		var axisroty = Number(actionzonedef.axis.rotation.y);
		var axisrotz = Number(actionzonedef.axis.rotation.z);
		var rotx = Number(actionzonedef.rotation.x);
		var roty = Number(actionzonedef.rotation.y);
		var rotz = Number(actionzonedef.rotation.z);
		var buildingind = -1;
		var moldgroup = "building";
		if (actionzonedef.buildinginfo.buildingid != "") {
			buildingind = WTW.getConnectingGridInd(actionzonedef.buildinginfo.buildingid);
		} else if (actionzonedef.communityinfo.communityid != "") {
			moldgroup = "community";
		} else if (actionzonedef.thinginfo.thingid != "") {
			moldgroup = "thing";
		}
		actionzone = scene.getMeshByID(actionzonename);
		var actionzoneaxlebase = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase-"));
		var actionzoneaxle = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxle-"));
		var actionzoneaxlepole = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlepole-"));
		var actionzoneaxlebase2 = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase2-"));
		if (actionzoneaxlebase == null) {
			var molddef = WTW.newMold();
			molddef.shape = "box";
			molddef.covering = "hidden";
			molddef.opacity = 0;
			molddef.parentname = parentname;
			actionzoneaxlebase = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase-"), molddef, molddef.parentname, molddef.covering);
			actionzoneaxlebase.position.x = axispositionx;
			actionzoneaxlebase.position.y = axispositiony;
			actionzoneaxlebase.position.z = axispositionz;
			actionzoneaxlebase.isPickable = false;
			actionzoneaxlebase.checkCollisions = false;
			actionzoneaxlebase.rotation.x = WTW.getRadians(axisrotx);
			actionzoneaxlebase.rotation.y = WTW.getRadians(axisroty);
			actionzoneaxlebase.rotation.z = WTW.getRadians(axisrotz);
		}
		if (actionzoneaxle == null) {
			WTW.actionZones[actionzoneind].status = 0;
			var molddef1 = WTW.newMold();
			molddef1.shape = "box";
			molddef1.covering = "hidden";
			molddef1.scaling.x = 1;
			molddef1.scaling.y = 1;
			molddef1.scaling.z = 1;
			molddef1.opacity = 0;
			molddef1.parentname = actionzonename.replace("actionzone-","actionzoneaxlebase-");
			actionzoneaxle = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxle-"), molddef1, molddef1.parentname, molddef1.covering);
			actionzoneaxle.position.x = 0;
			actionzoneaxle.position.y = 0;
			actionzoneaxle.position.z = 0;
			if (axisroty == 90) {
				actionzoneaxle.rotation.x -= WTW.getRadians(90);
			}
			actionzoneaxle.isPickable = false;
			actionzoneaxle.checkCollisions = false;
		}
		if (actionzoneaxlepole == null && WTW.adminView == 1) {
			var molddef4 = WTW.newMold();
			molddef4.shape = "box";
			molddef4.covering = "texture";
			molddef4.scaling.x = .20;
			molddef4.scaling.y = .20;
			molddef4.scaling.z = Number(actionzonedef.movementdistance);
			molddef4.graphics.texture.id = "7orpcjosyct5b1bf";
			molddef4.graphics.texture.path = "/content/system/stock/vaxis-512x512.png";
			molddef4.opacity = 0;
			molddef4.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlepole = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlepole-"), molddef4, molddef4.parentname, molddef4.covering);
			actionzoneaxlepole.isPickable = false;
			actionzoneaxlepole.checkCollisions = false;
		}
		if (actionzoneaxlebase2 == null) {
			var molddef2 = WTW.newMold();
			molddef2.shape = "box";
			molddef2.covering = "hidden";
			molddef2.opacity = 0;
			molddef2.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlebase2 = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase2-"), molddef2, molddef2.parentname, molddef2.covering);
			actionzoneaxlebase2.position.x = 0;
			actionzoneaxlebase2.position.y = 0;
			actionzoneaxlebase2.position.z = 0;
			actionzoneaxlebase2.isPickable = false;
			actionzoneaxlebase2.checkCollisions = false;
			actionzoneaxlebase2.rotation.x = WTW.getRadians(0);
			actionzoneaxlebase2.rotation.y = WTW.getRadians(-axisroty);
			actionzoneaxlebase2.rotation.z = WTW.getRadians(-axisrotx); // note this is a fix z==x - wont work for all
		}
		if (actionzone == null) {
			var molddef5 = WTW.newMold();
			molddef5.shape = actionzonedef.actionzoneshape;
			molddef5.covering = "hidden";
			molddef5.scaling.x = actionzonedef.scaling.x;
			molddef5.scaling.y = actionzonedef.scaling.y;
			molddef5.scaling.z = actionzonedef.scaling.z;
			molddef5.subdivisions = 20;
			molddef5.opacity = 0;
			molddef5.parentname = parentname;
			actionzone = WTW.addMold(actionzonename, molddef5, molddef5.parentname, molddef5.covering);
			actionzone.rotation.x = WTW.getRadians(rotx);
			actionzone.rotation.y = WTW.getRadians(roty);
			actionzone.rotation.z = WTW.getRadians(rotz);
			actionzone.isPickable = false;
			actionzone.checkCollisions = false;
			actionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			var movementtype = "slide";
			var movementdistance = 0;
			if (actionzonedef.movementtype != null) {
				movementtype = actionzonedef.movementtype;
			}
			if (WTW.isNumeric(actionzonedef.movementdistance)) {
				movementdistance = Number(actionzonedef.movementdistance);
			}
			try {
/*				var condition1 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var test = true;
					var currentactionzoneaxlebase = actionzoneaxlebase;
					if (currentactionzoneaxlebase != null) {
						var azbaseabspos = WTW.getWorldPosition(currentactionzoneaxlebase);
						var currentactionzoneind = actionzoneind;
						if (WTW.actionZones[currentactionzoneind] != null) {
							var currentmove = actionzoneaxle;
							var currenttest = currentmove.position.z;
							var currentmovementdistance = Number(WTW.actionZones[currentactionzoneind].movementdistance);
							var hix = null;
							var hiy = null;
							var hiz = null;
							var lox = null;
							var loy = null;
							var loz = null;
							var rangez = 0;
							var rangex = 0;
							var rangey = 0;
							var moverotx = axisrotx;
							var moveroty = axisroty;
							var moverotz = axisrotz;
							var moveparts = actionzoneaxlebase2.getChildren();
							if (moveparts != null) {
								if (moveparts.length > 0) {
									for (var i=0;i < moveparts.length;i++) {
										if (moveparts[i] != null) {
											if (moveparts[i].id.indexOf("molds") > -1) {
												var abspos = WTW.getWorldPosition(moveparts[i]);
												if (hiy != null) {
													if (abspos.y > hiy) {
														hiy = abspos.y;
													}
												} else {
													hiy = abspos.y;
												}
												if (loy != null) {
													if (abspos.y < loy) {
														loy = abspos.y;
													}
												} else {
													loy = abspos.y;
												}
												if (hix != null) {
													if (abspos.x > hix) {
														hix = abspos.x;
													}
												} else {
													hix = abspos.x;
												}
												if (lox != null) {
													if (abspos.x < lox) {
														lox = abspos.x;
													}
												} else {
													lox = abspos.x;
												}
												if (hiz != null) {
													if (abspos.z > hiz) {
														hiz = abspos.z;
													}
												} else {
													hiz = abspos.z;
												}
												if (loz != null) {
													if (abspos.z < loz) {
														loz = abspos.z;
													}
												} else {
													loz = abspos.z;
												}
											}
										}
									}
								} else {
									hix = 0;
									hiy = 0;
									hiz = 0;
									lox = 0;
									loy = 0;
									loz = 0;
								}
							} else {
								hix = 0;
								hiy = 0;
								hiz = 0;
								lox = 0;
								loy = 0;
								loz = 0;
							}
							rangez = hiz - loz;
							rangex = hix - lox;
							rangey = hiy - loy;
							if (WTW.actionZones[currentactionzoneind].status > 0) {
								if (rangez > 0 && rangey < 3) {
									var cutoffz = rangez / 2;
									var cutoffx = rangex / 2;
									if (moveparts != null) {
										if (moveparts.length > 0) {
											for (var i=0;i < moveparts.length;i++) {
												if (moveparts[i] != null) {
													if (moveparts[i].id.indexOf("molds") > -1) {
														var abspos = WTW.getWorldPosition(moveparts[i]);
														if ((abspos.z) < (azbaseabspos.z - cutoffz)) {
															moveparts[i].position.z += currentmovementdistance;
														} else if ((abspos.z) > (azbaseabspos.z + cutoffz)) {
															moveparts[i].position.z -= currentmovementdistance;
														} else if ((abspos.x) < (azbaseabspos.x - currentmovementdistance/2)) {
															moveparts[i].position.z -= currentmovementdistance;
														} else if ((abspos.x) > (azbaseabspos.x + currentmovementdistance/2)) {
															moveparts[i].position.z += currentmovementdistance;
														}
													}
												}
											}
										}
									}
								} else if (rangex > 0 && rangey < 3) {
									var cutoffx = rangex / 2;
									if (moveparts != null) {
										if (moveparts.length > 0) {
											for (var i=0;i < moveparts.length;i++) {
												if (moveparts[i] != null) {
													if (moveparts[i].id.indexOf("molds") > -1) {
														var abspos = WTW.getWorldPosition(moveparts[i]);
														if ((abspos.x) < (azbaseabspos.x - cutoffx)) {
															moveparts[i].position.x += currentmovementdistance;
														} else if ((abspos.x) > (azbaseabspos.x + cutoffx)) {
															moveparts[i].position.x -= currentmovementdistance;
														}
													}
												}
											}
										}
									}
								} else {
									if (moverotx < 0) {
										hiy = 29;
										rangey = 42;
										rangex = 42;
										var currentpos = Math.round(currenttest * 1000) / 1000;
										var fullpos = Math.round(currentmovementdistance * 1000) / 1000;
										var cutoffy = hiy - ((currentpos / fullpos) * rangey);
										if (currentpos >= fullpos) {
											currentmove.position.z = 0;
											if (moveparts != null) {
												if (moveparts.length > 0) {
													for (var i=0;i < moveparts.length;i++) {
														if (moveparts[i] != null) {
															if (moveparts[i].id.indexOf("molds") > -1) {
																if (moveparts[i].position.y <= cutoffy) {
																	moveparts[i].position.x -= rangex;
																	moveparts[i].position.y += rangey;
																	moveparts[i].position.z += (hiz-loz);
																}
															}
														}
													}
												}
											}
										} else {
											test = (currenttest < currentmovementdistance);
											if (moveparts != null) {
												if (moveparts.length > 0) {
													for (var i=0;i < moveparts.length;i++) {
														if (moveparts[i] != null) {
															if (moveparts[i].id.indexOf("molds") > -1) {
																if (moveparts[i].position.y >= cutoffy) {
																	moveparts[i].position.x += rangex;
																	moveparts[i].position.y -= rangey;
																	moveparts[i].position.z -= (hiz-loz);
																}
															}
														}
													}
												}
											}
										}
									} else if (moverotx > 0) {
										loy = -52.75;
										rangey = 42;
										rangex = 42;
										var currentpos = Math.round(currenttest * 1000) / 1000;
										var fullpos = Math.round(currentmovementdistance * 1000) / 1000;
										var cutoffy = loy + ((currentpos / fullpos) * rangey);
										if (currentpos >= fullpos) {
											currentmove.position.z = 0;
											if (moveparts != null) {
												if (moveparts.length > 0) {
													for (var i=0;i < moveparts.length;i++) {
														if (moveparts[i] != null) {
															if (moveparts[i].id.indexOf("molds") > -1) {
																if (moveparts[i].position.y >= cutoffy) {
																	moveparts[i].position.x += rangex;
																	moveparts[i].position.y -= rangey;
																	moveparts[i].position.z -= (hiz-loz);
																}
															}
														}
													}
												}
											}
										} else {
											test = (currenttest < currentmovementdistance);
											if (moveparts != null) {
												if (moveparts.length > 0) {
													for (var i=0;i < moveparts.length;i++) {
														if (moveparts[i] != null) {
															if (moveparts[i].id.indexOf("molds") > -1) {
																if (moveparts[i].position.y <= cutoffy) {
																	moveparts[i].position.x -= rangex;
																	moveparts[i].position.y += rangey;
																	moveparts[i].position.z += (hiz-loz);
																}
															}
														}
													}
												}
											}
										}
									}
								} 
							} else {
								test = false;
							}
						} else {
							test = false;
						}
					} else {
						test = false;
					}
					
					//test = false;
					
					return test;
				}); */
				var condition1 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var test = true;
					var currentactionzoneind = actionzoneind;
					if (WTW.actionZones[currentactionzoneind] != null) {
						var currentmove = actionzoneaxle;
						var currenttest = currentmove.position.z;
						var currentmovementdistance = Number(WTW.actionZones[currentactionzoneind].movementdistance);
						var hix = null;
						var hiy = null;
						var hiz = null;
						var lox = null;
						var loy = null;
						var loz = null;
						var moverotx = axisrotx;
						var moveroty = axisroty;
						var moverotz = axisrotz;
						var moveparts = actionzoneaxlebase2.getChildren();
						if (moveparts != null) {
							if (moveparts.length > 0) {
								for (var i=0;i < moveparts.length;i++) {
									if (moveparts[i].id.indexOf("molds") > -1) {
										if (hiy != null) {
											if (moveparts[i].position.y > hiy) {
												hiy = moveparts[i].position.y;
												hix = moveparts[i].position.x;
												hiz = moveparts[i].position.z;
											}
										} else {
											hiy = moveparts[i].position.y;
											hix = moveparts[i].position.x;
											hiz = moveparts[i].position.z;
										}
										if (loy != null) {
											if (moveparts[i].position.y < loy) {
												loy = moveparts[i].position.y;
												lox = moveparts[i].position.x;
												loz = moveparts[i].position.z;
											}
										} else {
											loy = moveparts[i].position.y;
											lox = moveparts[i].position.x;
											loz = moveparts[i].position.z;
										}
									}
								}
							}
						}
						if (WTW.actionZones[currentactionzoneind].status > 0) {
							var rangex = 0;
							var rangey = 0;
							var rangez = 0;
							
							rangez = hiz - loz;
							rangex = hix - lox;
							rangey = hiy - loy;
							
							if (rangez == 0) {
								//escalators
								if (moverotx < 0) {
									hiy = 29;
									rangey = 42;
									rangex = 42;
									var currentpos = Math.round(currenttest * 1000) / 1000;
									var fullpos = Math.round(currentmovementdistance * 1000) / 1000;
									var cutoffy = hiy - ((currentpos / fullpos) * rangey);
									if (currentpos >= fullpos) {
										currentmove.position.z = 0;
										if (moveparts != null) {
											if (moveparts.length > 0) {
												for (var i=0;i < moveparts.length;i++) {
													if (moveparts[i].id.indexOf("molds") > -1) {
														if (moveparts[i].position.y <= cutoffy) {
															moveparts[i].position.x -= rangex;
															moveparts[i].position.y += rangey;
															moveparts[i].position.z += (hiz-loz);
														}
													}
												}
											}
										}
									} else {
										test = (currenttest < currentmovementdistance);
										if (moveparts != null) {
											if (moveparts.length > 0) {
												for (var i=0;i < moveparts.length;i++) {
													if (moveparts[i].id.indexOf("molds") > -1) {
														if (moveparts[i].position.y >= cutoffy) {
															moveparts[i].position.x += rangex;
															moveparts[i].position.y -= rangey;
															moveparts[i].position.z -= (hiz-loz);
														}
													}
												}
											}
										}
									}
								} else if (moverotx > 0) {
									//	hiy=-10.75 == -53.25
									//hiy = -10.25;
									loy = -52.75;
									rangey = 42;
									rangex = 42;
									var currentpos = Math.round(currenttest * 1000) / 1000;
									var fullpos = Math.round(currentmovementdistance * 1000) / 1000;
									var cutoffy = loy + ((currentpos / fullpos) * rangey);
									if (currentpos >= fullpos) {
										currentmove.position.z = 0;
										if (moveparts != null) {
											if (moveparts.length > 0) {
												for (var i=0;i < moveparts.length;i++) {
													if (moveparts[i].id.indexOf("molds") > -1) {
														if (moveparts[i].position.y >= cutoffy) {
															moveparts[i].position.x += rangex;
															moveparts[i].position.y -= rangey;
															moveparts[i].position.z -= (hiz-loz);
														}
													}
												}
											}
										}
									} else {
										test = (currenttest < currentmovementdistance);
										if (moveparts != null) {
											if (moveparts.length > 0) {
												for (var i=0;i < moveparts.length;i++) {
													if (moveparts[i].id.indexOf("molds") > -1) {
														if (moveparts[i].position.y <= cutoffy) {
															moveparts[i].position.x -= rangex;
															moveparts[i].position.y += rangey;
															moveparts[i].position.z += (hiz-loz);
														}
													}
												}
											}
										}
									}
								}
							
							} else {
								// conveyor
								var currentactionzoneaxlebase = actionzoneaxlebase;
								if (currentactionzoneaxlebase != null) {
									var azbaseabspos = WTW.getWorldPosition(currentactionzoneaxlebase);

									if (Math.abs(rangez) > 0 && Math.abs(rangey) < 3) {
										var cutoffz = rangez / 2;
										var cutoffx = rangex / 2;
										if (moveparts != null) {
											if (moveparts.length > 0) {
												for (var i=0;i < moveparts.length;i++) {
													if (moveparts[i] != null) {
														if (moveparts[i].id.indexOf("molds") > -1) {
															var abspos = WTW.getWorldPosition(moveparts[i]);
															if (Math.sqrt(Math.pow(abspos.x - azbaseabspos.x, 2) + Math.pow(abspos.y - azbaseabspos.y, 2) + Math.pow(abspos.z - azbaseabspos.z, 2)) > currentmovementdistance/2) {
																moveparts[i].position.z += (currentmovementdistance * .95);
															}
														}
													}
												}
											}
										}
									} else if (rangex > 0 && rangey < 3) {
/*										var cutoffx = rangex / 2;
										if (moveparts != null) {
											if (moveparts.length > 0) {
												for (var i=0;i < moveparts.length;i++) {
													if (moveparts[i] != null) {
														if (moveparts[i].id.indexOf("molds") > -1) {
															var abspos = WTW.getWorldPosition(moveparts[i]);
															if ((abspos.x) < (azbaseabspos.x - cutoffx)) {
																moveparts[i].position.x += currentmovementdistance;
															} else if ((abspos.x) > (azbaseabspos.x + cutoffx)) {
																moveparts[i].position.x -= currentmovementdistance;
															} else {
																
															}
														}
													}
												}
											}
										}
*/									}	
								} else {
									test = false;
								}									
							}
						} else {
							test = false;
						}
					} else {
						test = false;
					}
					return test;
				});				
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, actionzoneaxle, "position.z", 0.1, condition1)); 
				WTW.actionZones[actionzoneind].status = 1;
			} catch (ex) {
			}
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == "Action Zones are Shown") {
				WTW.setOpacity(actionzonename, .2);
				WTW.setOpacity(actionzonename.replace("actionzone-","actionzoneaxlepole-"), 1);
			}
		}
		WTW.actionZones[actionzoneind].shown = "2";
	} catch (ex) {
		WTW.log("core-scripts-actionzones-basicactionzones\r\n addActionzonePeoplemover=" + ex.message);
	}
	return actionzone;
}

var testx = 0;

WTWJS.prototype.addActionzoneElevator = function(actionzonename, actionzoneind, actionzonedef) {
	var actionzone;
	try {
		var parentname = actionzonedef.parentname;
		var zpositionx = Number(actionzonedef.position.x);
		var zpositiony = Number(actionzonedef.position.y);
		var zpositionz = Number(actionzonedef.position.z);
		var axispositionx = Number(actionzonedef.axis.position.x);
		var axispositiony = Number(actionzonedef.axis.position.y);
		var axispositionz = Number(actionzonedef.axis.position.z);
		var axisrotx = Number(actionzonedef.axis.rotation.x);
		var axisroty = Number(actionzonedef.axis.rotation.y);
		var axisrotz = Number(actionzonedef.axis.rotation.z);
		var buildingind = -1;
		var moldgroup = "building";
		var connectinggridind = -1;
		var namepart = actionzonename.split('-');
		if (namepart[3] != null) {
			if (WTW.isNumeric(namepart[3])) {
				connectinggridind = Number(namepart[3]);
			}
		}
		if (actionzonedef.buildinginfo.buildingid != "") {
			buildingind = WTW.getConnectingGridInd(actionzonedef.buildinginfo.buildingid);
		} else if (actionzonedef.communityinfo.communityid != "") {
			moldgroup = "community";
		} else if (actionzonedef.thinginfo.thingid != "") {
			moldgroup = "thing";
		}
		actionzone = scene.getMeshByID(actionzonename);
		var actionzoneaxlebase = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase-"));
		var actionzoneaxle = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxle-"));
		var actionzoneaxlepole = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlepole-"));
		var actionzoneaxlebase2 = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase2-"));
		if (actionzoneaxlebase == null) {
			var molddef = WTW.newMold();
			molddef.shape = "box";
			molddef.covering = "hidden";
			molddef.opacity = 0;
			molddef.parentname = parentname;
			actionzoneaxlebase = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase-"), molddef, molddef.parentname, molddef.covering);
			actionzoneaxlebase.position.x = axispositionx;
			actionzoneaxlebase.position.y = axispositiony;
			actionzoneaxlebase.position.z = axispositionz;
			actionzoneaxlebase.isPickable = false;
			actionzoneaxlebase.checkCollisions = false;
			actionzoneaxlebase.rotation.x = WTW.getRadians(axisrotx);
			actionzoneaxlebase.rotation.y = WTW.getRadians(axisroty);
			actionzoneaxlebase.rotation.z = WTW.getRadians(axisrotz);
		}
		if (actionzoneaxle == null) {
			WTW.actionZones[actionzoneind].status = 0;
			var molddef1 = WTW.newMold();
			molddef1.shape = "box";
			molddef1.covering = "hidden";
			molddef1.scaling.x = 1;
			molddef1.scaling.y = 1;
			molddef1.scaling.z = 1;
			molddef1.opacity = 0;
			molddef1.parentname = actionzonename.replace("actionzone-","actionzoneaxlebase-");
			actionzoneaxle = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxle-"), molddef1, molddef1.parentname, molddef1.covering);
			actionzoneaxle.position.x = 0;
			actionzoneaxle.position.y = 0;
			actionzoneaxle.position.z = 0;
			actionzoneaxle.isPickable = false;
			actionzoneaxle.checkCollisions = false;
		}
		if (actionzoneaxlepole == null && WTW.adminView == 1) {
			var molddef4 = WTW.newMold();
			molddef4.shape = "box";
			molddef4.covering = "texture";
			molddef4.position.y = Number(actionzonedef.movementdistance)/2;
			molddef4.scaling.x = .20;
			molddef4.scaling.y = Number(actionzonedef.movementdistance);
			molddef4.scaling.z = .20;
			molddef4.graphics.texture.id = "7orpcjosyct5b1bf";
			molddef4.graphics.texture.path = "/content/system/stock/vaxis-512x512.png";
			molddef4.opacity = 0;
			molddef4.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlepole = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlepole-"), molddef4, molddef4.parentname, molddef4.covering);
			actionzoneaxlepole.isPickable = false;
			actionzoneaxlepole.checkCollisions = false;
		}
		if (actionzoneaxlebase2 == null) {
			var molddef2 = WTW.newMold();
			molddef2.shape = "box";
			molddef2.covering = "hidden";
			molddef2.opacity = 0;
			molddef2.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlebase2 = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase2-"), molddef2, molddef2.parentname, molddef2.covering);
			actionzoneaxlebase2.position.x = 0;
			actionzoneaxlebase2.position.y = 0;
			actionzoneaxlebase2.position.z = 0;
			actionzoneaxlebase2.isPickable = false;
			actionzoneaxlebase2.checkCollisions = false;
			actionzoneaxlebase2.rotation.x = WTW.getRadians(-axisrotx);
			actionzoneaxlebase2.rotation.y = WTW.getRadians(-axisroty);
			actionzoneaxlebase2.rotation.z = WTW.getRadians(-axisrotz);
		}
		if (actionzone == null) {
			var molddef5 = WTW.newMold();
			molddef5.shape = actionzonedef.actionzoneshape;
			molddef5.covering = "hidden";
			molddef5.scaling.x = actionzonedef.scaling.x;
			molddef5.scaling.y = actionzonedef.scaling.y;
			molddef5.scaling.z = actionzonedef.scaling.z;
			molddef5.subdivisions = 20;
			molddef5.opacity = 0;
			molddef5.parentname = parentname;
			actionzone = WTW.addMold(actionzonename, molddef5, molddef5.parentname, molddef5.covering);
			actionzone.isPickable = false;
			actionzone.checkCollisions = false;
			actionzone.isVisible = false;
			actionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			var movementtype = "slide";
			var movementdistance = 0;
			if (actionzonedef.movementtype != null) {
				movementtype = actionzonedef.movementtype;
			}
			if (WTW.isNumeric(actionzonedef.movementdistance)) {
				movementdistance = Number(actionzonedef.movementdistance);
			}
			try {
				var condition1 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var test = true;
					var currentactionzoneind = actionzoneind;
					if (WTW.actionZones[currentactionzoneind] != null) {
						var elevatorpath = actionzoneaxle;
						var elevatorbase = actionzoneaxlebase;
						var elevatorridealong = actionzone;
						var currenttest = elevatorpath.position.y;
						var currentmovementdistance = Number(WTW.actionZones[currentactionzoneind].movementdistance);
						var doorparts = elevatorpath.getChildren();
						var cgind = connectinggridind;
						for (var i=0; i < WTW.actionZones.length; i++) {
							if (WTW.actionZones[i] != null) {
								if (cgind == WTW.actionZones[i].connectinggridind && WTW.actionZones[i].actionzonetype == "clickactivatedslidingdoor") {
									var dooractionzoneaxlebase = scene.getMeshByID(WTW.actionZones[i].moldname.replace("actionzone-","actionzoneaxlebase-"));
									if (dooractionzoneaxlebase != null) {
										if (dooractionzoneaxlebase.position.x == elevatorbase.position.x && dooractionzoneaxlebase.position.z == elevatorbase.position.z) {
											elevatorridealong.position.y = elevatorpath.position.y + (elevatorridealong.scaling.y/2);
											dooractionzoneaxlebase.position.y = elevatorpath.position.y;
											WTW.actionZones[i].axis.position.y = dooractionzoneaxlebase.position.y;
										}
									}				
								}
							}
						}
						if (WTW.actionZones[currentactionzoneind] != null) {
							if (WTW.actionZones[currentactionzoneind].status == 3) {
								if (Math.round(currenttest * 1000) / 1000 >= Math.round(currentmovementdistance * 1000) / 1000) {
									elevatorpath.position.y = currentmovementdistance;
									WTW.actionZones[currentactionzoneind].status = 4;
								}
								test = (currenttest < currentmovementdistance);
							} else {
								test = false;
							}
						} else {
							test = false;
						}
					} else {
						test = false;
					}
					return test;
				});
				var condition2 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var test = true;
					var currentactionzoneind = actionzoneind;
					if (WTW.actionZones[currentactionzoneind] != null) {
						var elevatorpath = actionzoneaxle;
						var elevatorbase = actionzoneaxlebase;
						var elevatorridealong = actionzone;
						var currenttest = elevatorpath.position.y;
						var currentmovementdistance = Number(WTW.actionZones[currentactionzoneind].movementdistance);
						var doorparts = elevatorpath.getChildren();
						var cgind = connectinggridind;
						for (var i=0; i < WTW.actionZones.length; i++) {
							if (WTW.actionZones[i] != null) {
								if (cgind == WTW.actionZones[i].connectinggridind && WTW.actionZones[i].actionzonetype == "clickactivatedslidingdoor") {
									var dooractionzoneaxlebase = scene.getMeshByID(WTW.actionZones[i].moldname.replace("actionzone-","actionzoneaxlebase-"));
									if (dooractionzoneaxlebase != null) {
										if (dooractionzoneaxlebase.position.x == elevatorbase.position.x && dooractionzoneaxlebase.position.z == elevatorbase.position.z) {
											elevatorridealong.position.y = elevatorpath.position.y + (elevatorridealong.scaling.y/2);
											dooractionzoneaxlebase.position.y = elevatorpath.position.y;
											WTW.actionZones[i].axis.position.y = dooractionzoneaxlebase.position.y;
										}
									}				
								}
							}
						}
						if (WTW.actionZones[currentactionzoneind] != null) {
							if (WTW.actionZones[currentactionzoneind].status == 2) {
								if (currenttest <= 0) {
									elevatorpath.position.y = 0;
									WTW.actionZones[currentactionzoneind].status = 1;
								}
								test = (currenttest > 0);
							} else {
								test = false;
							}
						} else {
							test = false;
						}
					} else {
						test = false;
					}
					return test;
				});
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, actionzoneaxle, "position.y", 0.5, condition1)); 
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, actionzoneaxle, "position.y", -0.5, condition2));
				WTW.actionZones[actionzoneind].status = 1;
			} catch (ex) {
			}
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == "Action Zones are Shown") {
				WTW.setOpacity(actionzonename, .2);
				WTW.setOpacity(actionzonename.replace("actionzone-","actionzoneaxlepole-"), 1);
			}
		}
		WTW.actionZones[actionzoneind].shown = "2";
	} catch (ex) {
		WTW.log("core-scripts-actionzones-basicactionzones\r\n addActionzoneElevator=" + ex.message);
	}
	return actionzone;
}

WTWJS.prototype.addActionzonePassengerSeat = function(actionzonename, actionzoneind, actionzonedef) {
	var actionzone;
	try {
		var parentname = actionzonedef.parentname;
		var zpositionx = Number(actionzonedef.position.x);
		var zpositiony = Number(actionzonedef.position.y);
		var zpositionz = Number(actionzonedef.position.z);
		var axispositionx = Number(actionzonedef.axis.position.x);
		var axispositiony = Number(actionzonedef.axis.position.y);
		var axispositionz = Number(actionzonedef.axis.position.z);
		var axisrotx = Number(actionzonedef.axis.rotation.x);
		var axisroty = Number(actionzonedef.axis.rotation.y);
		var axisrotz = Number(actionzonedef.axis.rotation.z);
		var buildingind = -1;
		var moldgroup = "building";
		if (actionzonedef.buildinginfo.buildingid != "") {
			buildingind = WTW.getConnectingGridInd(actionzonedef.buildinginfo.buildingid);
		} else if (actionzonedef.communityinfo.communityid != "") {
			moldgroup = "community";
		} else if (actionzonedef.thinginfo.thingid != "") {
			moldgroup = "thing";
		}
		actionzone = scene.getMeshByID(actionzonename);
		var actionzoneaxlebase = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase-"));
		var actionzoneaxle = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxle-"));
		var actionzoneaxlepole = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlepole-"));
		var actionzoneaxlebase2 = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase2-"));
		if (actionzoneaxlebase == null) {
			var molddef = WTW.newMold();
			molddef.shape = "box";
			molddef.covering = "hidden";
			molddef.opacity = 0;
			molddef.scaling.x = 1;
			molddef.scaling.y = 1;
			molddef.scaling.z = 1;
			molddef.parentname = parentname;
			actionzoneaxlebase = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase-"), molddef, molddef.parentname, molddef.covering);
			actionzoneaxlebase.isPickable = false;
			actionzoneaxlebase.checkCollisions = false;
		}
		if (actionzoneaxle == null) {
			WTW.actionZones[actionzoneind].status = 0;
			var molddef1 = WTW.newMold();
			molddef1.shape = "box";
			molddef1.covering = "hidden";
			molddef1.scaling.x = 1;
			molddef1.scaling.y = 1;
			molddef1.scaling.z = 1;
			molddef1.opacity = 0;
			molddef1.parentname = actionzonename.replace("actionzone-","actionzoneaxlebase-");
			actionzoneaxle = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxle-"), molddef1, molddef1.parentname, molddef1.covering);
			actionzoneaxle.position.x = axispositionx;
			actionzoneaxle.position.y = axispositiony;
			actionzoneaxle.position.z = axispositionz;
			actionzoneaxle.rotation.x = WTW.getRadians(axisrotx);
			actionzoneaxle.rotation.y = WTW.getRadians(axisroty);
			actionzoneaxle.rotation.z = WTW.getRadians(axisrotz);
			actionzoneaxle.isPickable = false;
			actionzoneaxle.checkCollisions = false;
		}
		if (actionzoneaxlepole == null && WTW.adminView == 1) {
			var molddef4 = WTW.newMold();
			molddef4.shape = "box";
			molddef4.covering = "texture";
			molddef4.scaling.x = .20;
			molddef4.scaling.y = .20;
			molddef4.scaling.z = 10;
			molddef4.graphics.texture.id = "7orpcjosyct5b1bf";
			molddef4.graphics.texture.path = "/content/system/stock/vaxis-512x512.png";
			molddef4.opacity = 0;
			molddef4.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlepole = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlepole-"), molddef4, molddef4.parentname, molddef4.covering);
			actionzoneaxlepole.position.z = 5;
			actionzoneaxlepole.isPickable = false;
			actionzoneaxlepole.checkCollisions = false;
		}
		if (actionzoneaxlebase2 == null) {
			var molddef2 = WTW.newMold();
			molddef2.shape = "box";
			molddef2.covering = "hidden";
			molddef2.scaling.x = 1;
			molddef2.scaling.y = 1;
			molddef2.scaling.z = 1;
			molddef2.opacity = 0;
			molddef2.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlebase2 = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase2-"), molddef2, molddef2.parentname, molddef2.covering);
			actionzoneaxlebase2.isPickable = false;
			actionzoneaxlebase2.checkCollisions = false;
		}
		if (actionzone == null) {
			var molddef5 = WTW.newMold();
			molddef5.shape = actionzonedef.actionzoneshape;
			molddef5.covering = "hidden";
			molddef5.position.x = zpositionx;
			molddef5.position.y = zpositiony;
			molddef5.position.z = zpositionz;
			molddef5.scaling.x = actionzonedef.scaling.x;
			molddef5.scaling.y = actionzonedef.scaling.y;
			molddef5.scaling.z = actionzonedef.scaling.z;
			molddef5.subdivisions = 12;
			molddef5.opacity = 0;
			molddef5.parentname = parentname;
			actionzone = WTW.addMold(actionzonename, molddef5, molddef5.parentname, molddef5.covering);
			actionzone.isPickable = false;
			actionzone.checkCollisions = false;
			actionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == "Action Zones are Shown") {
				WTW.setOpacity(actionzonename, .2);
				WTW.setOpacity(actionzonename.replace("actionzone-","actionzoneaxlepole-"), 1);
			}
		}
		WTW.actionZones[actionzoneind].shown = "2";		
	} catch (ex) {
		WTW.log("core-scripts-actionzones-basicactionzones\r\n addActionzonePassengerSeat=" + ex.message);
	}
	return actionzone;
}

WTWJS.prototype.addActionzoneDriverSeat = function(actionzonename, actionzoneind, actionzonedef) {
	var actionzone;
	try {
		var parentname = actionzonedef.parentname;
		var zpositionx = Number(actionzonedef.position.x);
		var zpositiony = Number(actionzonedef.position.y);
		var zpositionz = Number(actionzonedef.position.z);
		var axispositionx = Number(actionzonedef.axis.position.x);
		var axispositiony = Number(actionzonedef.axis.position.y);
		var axispositionz = Number(actionzonedef.axis.position.z);
		var axisrotx = Number(actionzonedef.axis.rotation.x);
		var axisroty = Number(actionzonedef.axis.rotation.y);
		var axisrotz = Number(actionzonedef.axis.rotation.z);
		var buildingind = -1;
		var moldgroup = "building";
		if (actionzonedef.buildinginfo.buildingid != "") {
			buildingind = WTW.getConnectingGridInd(actionzonedef.buildinginfo.buildingid);
		} else if (actionzonedef.communityinfo.communityid != "") {
			moldgroup = "community";
		} else if (actionzonedef.thinginfo.thingid != "") {
			moldgroup = "thing";
		}
		actionzone = scene.getMeshByID(actionzonename);
		var actionzoneaxlebase = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase-"));
		var actionzoneaxle = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxle-"));
		var actionzoneaxlepole = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlepole-"));
		var actionzoneaxlebase2 = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase2-"));
		if (actionzoneaxlebase == null) {
			var molddef = WTW.newMold();
			molddef.shape = "box";
			molddef.covering = "hidden";
			molddef.opacity = 0;
			molddef.scaling.x = 1;
			molddef.scaling.y = 1;
			molddef.scaling.z = 1;
			molddef.parentname = parentname;
			actionzoneaxlebase = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase-"), molddef, molddef.parentname, molddef.covering);
			actionzoneaxlebase.isPickable = false;
			actionzoneaxlebase.checkCollisions = false;
		}
		if (actionzoneaxle == null) {
			WTW.actionZones[actionzoneind].status = 0;
			var molddef1 = WTW.newMold();
			molddef1.shape = "box";
			molddef1.covering = "hidden";
			molddef1.scaling.x = 1;
			molddef1.scaling.y = 1;
			molddef1.scaling.z = 1;
			molddef1.opacity = 0;
			molddef1.parentname = actionzonename.replace("actionzone-","actionzoneaxlebase-");
			actionzoneaxle = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxle-"), molddef1, molddef1.parentname, molddef1.covering);
			actionzoneaxle.position.x = axispositionx;
			actionzoneaxle.position.y = axispositiony;
			actionzoneaxle.position.z = axispositionz;
			actionzoneaxle.rotation.x = WTW.getRadians(axisrotx);
			actionzoneaxle.rotation.y = WTW.getRadians(axisroty);
			actionzoneaxle.rotation.z = WTW.getRadians(axisrotz);
			actionzoneaxle.isPickable = false;
			actionzoneaxle.checkCollisions = false;
		}
		if (actionzoneaxlepole == null && WTW.adminView == 1) {
			var molddef4 = WTW.newMold();
			molddef4.shape = "box";
			molddef4.covering = "texture";
			molddef4.scaling.x = .20;
			molddef4.scaling.y = .20;
			molddef4.scaling.z = 10;
			molddef4.graphics.texture.id = "7orpcjosyct5b1bf";
			molddef4.graphics.texture.path = "/content/system/stock/vaxis-512x512.png";
			molddef4.opacity = 0;
			molddef4.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlepole = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlepole-"), molddef4, molddef4.parentname, molddef4.covering);
			actionzoneaxlepole.position.z = 5;
			actionzoneaxlepole.isPickable = false;
			actionzoneaxlepole.checkCollisions = false;
		}
		if (actionzoneaxlebase2 == null) {
			var molddef2 = WTW.newMold();
			molddef2.shape = "box";
			molddef2.covering = "hidden";
			molddef2.scaling.x = 1;
			molddef2.scaling.y = 1;
			molddef2.scaling.z = 1;
			molddef2.opacity = 0;
			molddef2.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlebase2 = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase2-"), molddef2, molddef2.parentname, molddef2.covering);
			actionzoneaxlebase2.isPickable = false;
			actionzoneaxlebase2.checkCollisions = false;
		}
		if (actionzone == null) {
			var molddef5 = WTW.newMold();
			molddef5.shape = actionzonedef.actionzoneshape;
			molddef5.covering = "hidden";
			molddef5.position.x = zpositionx;
			molddef5.position.y = zpositiony;
			molddef5.position.z = zpositionz;
			molddef5.scaling.x = actionzonedef.scaling.x;
			molddef5.scaling.y = actionzonedef.scaling.y;
			molddef5.scaling.z = actionzonedef.scaling.z;
			molddef5.subdivisions = 12;
			molddef5.opacity = 0;
			molddef5.parentname = parentname;
			actionzone = WTW.addMold(actionzonename, molddef5, molddef5.parentname, molddef5.covering);
			actionzone.isPickable = false;
			actionzone.checkCollisions = false;
			actionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == "Action Zones are Shown") {
				WTW.setOpacity(actionzonename, .2);
				WTW.setOpacity(actionzonename.replace("actionzone-","actionzoneaxlepole-"), 1);
			}
		}
		WTW.actionZones[actionzoneind].shown = "2";		
	} catch (ex) {
		WTW.log("core-scripts-actionzones-basicactionzones\r\n addActionzoneDriverSeat=" + ex.message);
	}
	return actionzone;
}

WTWJS.prototype.addActionzoneDriverTurnAngle = function(actionzonename, actionzoneind, actionzonedef) {
	var actionzone;
	try {
		var parentname = actionzonedef.parentname;
		var zpositionx = Number(actionzonedef.position.x);
		var zpositiony = Number(actionzonedef.position.y);
		var zpositionz = Number(actionzonedef.position.z);
		var axispositionx = Number(actionzonedef.axis.position.x);
		var axispositiony = Number(actionzonedef.axis.position.y);
		var axispositionz = Number(actionzonedef.axis.position.z);
		var axisrotx = Number(actionzonedef.axis.rotation.x);
		var axisroty = Number(actionzonedef.axis.rotation.y);
		var axisrotz = Number(actionzonedef.axis.rotation.z);
		var buildingind = -1;
		var moldgroup = "building";
		var namepart = parentname.split('-');
		var connectinggridind = -1;
		if (namepart[1] != null) {
			connectinggridind = Number(namepart[1]);
		}
		if (actionzonedef.buildinginfo.buildingid != "") {
			buildingind = WTW.getConnectingGridInd(actionzonedef.buildinginfo.buildingid);
		} else if (actionzonedef.communityinfo.communityid != "") {
			moldgroup = "community";
		} else if (actionzonedef.thinginfo.thingid != "") {
			moldgroup = "thing";
		}
		actionzone = scene.getMeshByID(actionzonename);
		var actionzoneaxlebase = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase-"));
		var actionzoneaxle = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxle-"));
		var actionzoneaxle2 = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxle2-"));
		var actionzoneaxlepole = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlepole-"));
		var actionzoneaxlepole2 = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlepole2-"));
		var actionzoneaxlebase2 = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase2-"));
		if (actionzoneaxlebase == null) {
			var molddef = WTW.newMold();
			molddef.shape = "box";
			molddef.covering = "hidden";
			molddef.opacity = 0;
			molddef.parentname = parentname;
			actionzoneaxlebase = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase-"), molddef, molddef.parentname, molddef.covering);
			actionzoneaxlebase.position.x = axispositionx;
			actionzoneaxlebase.position.y = axispositiony;
			actionzoneaxlebase.position.z = axispositionz;
			actionzoneaxlebase.isPickable = false;
			actionzoneaxlebase.checkCollisions = false;
			actionzoneaxlebase.rotation.x = WTW.getRadians(axisrotx);
			actionzoneaxlebase.rotation.y = WTW.getRadians(axisroty);
			actionzoneaxlebase.rotation.z = WTW.getRadians(axisrotz);
		}
		if (actionzoneaxle == null) {
			WTW.actionZones[actionzoneind].status = 0;
			var molddef1 = WTW.newMold();
			molddef1.shape = "box";
			molddef1.covering = "hidden";
			molddef1.scaling.x = 1;
			molddef1.scaling.y = 1;
			molddef1.scaling.z = 1;
			molddef1.opacity = 0;
			molddef1.parentname = actionzonename.replace("actionzone-","actionzoneaxlebase-");
			actionzoneaxle = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxle-"), molddef1, molddef1.parentname, molddef1.covering);
			actionzoneaxle.position.x = 0;
			actionzoneaxle.position.y = 0;
			actionzoneaxle.position.z = 0;
			actionzoneaxle.isPickable = false;
			actionzoneaxle.checkCollisions = false;
		}
		if (actionzoneaxlepole == null && WTW.adminView == 1) {
			var molddef4 = WTW.newMold();
			molddef4.shape = "box";
			molddef4.covering = "texture";
			molddef4.scaling.x = .20;
			molddef4.scaling.y = 20;
			molddef4.scaling.z = .20;
			molddef4.rotation.x = Number(actionzonedef.axis.rotation.x);
			molddef4.rotation.y = Number(actionzonedef.axis.rotation.y);
			molddef4.rotation.z = Number(actionzonedef.axis.rotation.z);
			molddef4.graphics.texture.id = "7orpcjosyct5b1bf";
			molddef4.graphics.texture.path = "/content/system/stock/vaxis-512x512.png";
			molddef4.opacity = 0;
			molddef4.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlepole = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlepole-"), molddef4, molddef4.parentname, molddef4.covering);
			actionzoneaxlepole.isPickable = false;
			actionzoneaxlepole.checkCollisions = false;
		}
		if (actionzoneaxlebase2 == null) {
			var molddef2 = WTW.newMold();
			molddef2.shape = "box";
			molddef2.covering = "hidden";
			molddef2.opacity = 0;
			molddef2.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlebase2 = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase2-"), molddef2, molddef2.parentname, molddef2.covering);
			actionzoneaxlebase2.position.x = 0;
			actionzoneaxlebase2.position.y = 0;
			actionzoneaxlebase2.position.z = 0;
			actionzoneaxlebase2.isPickable = false;
			actionzoneaxlebase2.checkCollisions = false;
			actionzoneaxlebase2.rotation.x = WTW.getRadians(-axisrotx);
			actionzoneaxlebase2.rotation.y = WTW.getRadians(-axisroty);
			actionzoneaxlebase2.rotation.z = WTW.getRadians(-axisrotz);
		}
		if (actionzone == null) {
			var molddef5 = WTW.newMold();
			molddef5.shape = actionzonedef.actionzoneshape;
			molddef5.covering = "hidden";
			molddef5.scaling.x = actionzonedef.scaling.x;
			molddef5.scaling.y = actionzonedef.scaling.y;
			molddef5.scaling.z = actionzonedef.scaling.z;
			molddef5.subdivisions = 20;
			molddef5.opacity = 0;
			molddef5.parentname = parentname;
			actionzone = WTW.addMold(actionzonename, molddef5, molddef5.parentname, molddef5.covering);
			actionzone.isPickable = false;
			actionzone.checkCollisions = false;
			actionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			var axlename = actionzonename.replace("actionzone-","actionzoneaxle-"); 
			try {
				var condition1 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var currentfactor = Number(actionzonedef.axis.rotatedegrees);
					var currentturn = 0;
					var currentconnectinggridind = connectinggridind;
					var testconnectinggridind = -2;
					var test = false;
					if (WTW.drive != null) {
						if (WTW.isNumeric(WTW.drive.currentturn)) {
							currentturn = Number(WTW.drive.currentturn);
						}
						if (WTW.isNumeric(WTW.drive.connectinggridind)) {
							testconnectinggridind = Number(WTW.drive.connectinggridind);
						}
						currentturn = currentturn * currentfactor;
						var currentactionzoneind = actionzoneind;
						var currentdoor = actionzoneaxle;
						var currentdoorroty = Math.round(WTW.getDegrees(currentdoor.rotation.y) * 100) / 100;
						if (currentdoorroty > 180) {
							currentdoorroty -= 360;
						}
						if (currentconnectinggridind == testconnectinggridind) {
							if (WTW.actionZones[currentactionzoneind] != null) {
								if (currentdoorroty < Math.round(currentturn * 100) / 100) {
									test = true;
								}
							}
						}
					}
					return test;
				});
				var condition2 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var currentfactor = Number(actionzonedef.axis.rotatedegrees);
					var currentturn = 0;
					var currentconnectinggridind = connectinggridind;
					var testconnectinggridind = -2;
					var test = false;
					if (WTW.drive != null) {
						if (WTW.isNumeric(WTW.drive.currentturn)) {
							currentturn = Number(WTW.drive.currentturn);
						}
						if (WTW.isNumeric(WTW.drive.connectinggridind)) {
							testconnectinggridind = Number(WTW.drive.connectinggridind);
						}
						currentturn = currentturn * currentfactor;
						var currentactionzoneind = actionzoneind;
						var currentdoor = actionzoneaxle;
						var currentdoorroty = Math.round(WTW.getDegrees(currentdoor.rotation.y) * 100) / 100;
						if (currentdoorroty > 180) {
							currentdoorroty -= 360;
						}
						if (currentconnectinggridind == testconnectinggridind) {
							if (WTW.actionZones[currentactionzoneind] != null) {
								if (currentdoorroty > Math.round(currentturn * 100) / 100) {
									test = true;
								}
							}
						}
					}
					return test;
				});
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, actionzoneaxle, "rotation.y", 0.1, condition1)); 
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, actionzoneaxle, "rotation.y", -0.1, condition2));
				WTW.actionZones[actionzoneind].status = 1;
			} catch (ex) {
			}
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == "Action Zones are Shown") {
				WTW.setOpacity(actionzonename, .2);
				WTW.setOpacity(actionzonename.replace("actionzone-","actionzoneaxlepole-"), 1);
			}
		}
		WTW.actionZones[actionzoneind].shown = "2";
	} catch (ex) {
		WTW.log("core-scripts-actionzones-basicactionzones\r\n addActionzoneDriverTurnAngle=" + ex.message);
	}
	return actionzone;
}

WTWJS.prototype.addActionzoneDriverTurningWheel = function(actionzonename, actionzoneind, actionzonedef) {
	var actionzone;
	try {
		var parentname = actionzonedef.parentname;
		var zpositionx = Number(actionzonedef.position.x);
		var zpositiony = Number(actionzonedef.position.y);
		var zpositionz = Number(actionzonedef.position.z);
		var axispositionx = Number(actionzonedef.axis.position.x);
		var axispositiony = Number(actionzonedef.axis.position.y);
		var axispositionz = Number(actionzonedef.axis.position.z);
		var axisrotx = Number(actionzonedef.axis.rotation.x);
		var axisroty = Number(actionzonedef.axis.rotation.y);
		var axisrotz = Number(actionzonedef.axis.rotation.z);
		var buildingind = -1;
		var moldgroup = "building";
		var namepart = parentname.split('-');
		var connectinggridind = -1;
		if (namepart[1] != null) {
			connectinggridind = Number(namepart[1]);
		}
		if (actionzonedef.buildinginfo.buildingid != "") {
			buildingind = WTW.getConnectingGridInd(actionzonedef.buildinginfo.buildingid);
		} else if (actionzonedef.communityinfo.communityid != "") {
			moldgroup = "community";
		} else if (actionzonedef.thinginfo.thingid != "") {
			moldgroup = "thing";
		}
		actionzone = scene.getMeshByID(actionzonename);
		var actionzoneaxlebase = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase-"));
		var actionzoneaxle = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxle-"));
		var actionzoneaxle2 = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxle2-"));
		var actionzoneaxlepole = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlepole-"));
		var actionzoneaxlepole2 = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlepole2-"));
		var actionzoneaxlebase2 = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase2-"));
		if (actionzoneaxlebase == null) {
			var molddef = WTW.newMold();
			molddef.shape = "box";
			molddef.covering = "hidden";
			molddef.opacity = 0;
			molddef.parentname = parentname;
			actionzoneaxlebase = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase-"), molddef, molddef.parentname, molddef.covering);
			actionzoneaxlebase.position.x = axispositionx;
			actionzoneaxlebase.position.y = axispositiony;
			actionzoneaxlebase.position.z = axispositionz;
			actionzoneaxlebase.isPickable = false;
			actionzoneaxlebase.checkCollisions = false;
			actionzoneaxlebase.rotation.x = WTW.getRadians(axisrotx);
			actionzoneaxlebase.rotation.y = WTW.getRadians(axisroty);
			actionzoneaxlebase.rotation.z = WTW.getRadians(axisrotz);
		}
		if (actionzoneaxle == null) {
			WTW.actionZones[actionzoneind].status = 0;
			var molddef1 = WTW.newMold();
			molddef1.shape = "box";
			molddef1.covering = "hidden";
			molddef1.scaling.x = 1;
			molddef1.scaling.y = 1;
			molddef1.scaling.z = 1;
			molddef1.opacity = 0;
			molddef1.parentname = actionzonename.replace("actionzone-","actionzoneaxlebase-");
			actionzoneaxle = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxle-"), molddef1, molddef1.parentname, molddef1.covering);
			actionzoneaxle.position.x = 0;
			actionzoneaxle.position.y = 0;
			actionzoneaxle.position.z = 0;
			actionzoneaxle.isPickable = false;
			actionzoneaxle.checkCollisions = false;
		}
		if (actionzoneaxlepole == null && WTW.adminView == 1) {
			var molddef4 = WTW.newMold();
			molddef4.shape = "box";
			molddef4.covering = "texture";
			molddef4.scaling.x = .20;
			molddef4.scaling.y = 20;
			molddef4.scaling.z = .20;
			molddef4.rotation.x = Number(actionzonedef.axis.rotation.x);
			molddef4.rotation.y = Number(actionzonedef.axis.rotation.y);
			molddef4.rotation.z = Number(actionzonedef.axis.rotation.z);
			molddef4.graphics.texture.id = "7orpcjosyct5b1bf";
			molddef4.graphics.texture.path = "/content/system/stock/vaxis-512x512.png";
			molddef4.opacity = 0;
			molddef4.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlepole = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlepole-"), molddef4, molddef4.parentname, molddef4.covering);
			actionzoneaxlepole.isPickable = false;
			actionzoneaxlepole.checkCollisions = false;
		}
		if (actionzoneaxlebase2 == null) {
			var molddef2 = WTW.newMold();
			molddef2.shape = "box";
			molddef2.covering = "hidden";
			molddef2.opacity = 0;
			molddef2.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlebase2 = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase2-"), molddef2, molddef2.parentname, molddef2.covering);
			actionzoneaxlebase2.position.x = 0;
			actionzoneaxlebase2.position.y = 0;
			actionzoneaxlebase2.position.z = 0;
			actionzoneaxlebase2.isPickable = false;
			actionzoneaxlebase2.checkCollisions = false;
			actionzoneaxlebase2.rotation.x = WTW.getRadians(-axisrotx);
			actionzoneaxlebase2.rotation.y = WTW.getRadians(-axisroty);
			actionzoneaxlebase2.rotation.z = WTW.getRadians(-axisrotz);
		}
		if (actionzoneaxle2 == null) {
			WTW.actionZones[actionzoneind].status = 0;
			var molddef6 = WTW.newMold();
			molddef6.shape = "box";
			molddef6.covering = "hidden";
			molddef6.scaling.x = 1;
			molddef6.scaling.y = 1;
			molddef6.scaling.z = 1;
			molddef6.opacity = 0;
			molddef6.parentname = actionzonename.replace("actionzone-","actionzoneaxlebase2-");
			actionzoneaxle2 = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxle2-"), molddef6, molddef6.parentname, molddef6.covering);
			actionzoneaxle2.position.x = 0;
			actionzoneaxle2.position.y = 0;
			actionzoneaxle2.position.z = 0;
			actionzoneaxle2.isPickable = false;
			actionzoneaxle2.checkCollisions = false;
			try {
				var condition3 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var currentfactor = Number(actionzonedef.axis.rotatedegrees);
					var currentspeed = 0;
					var currentdirection = 1;
					var currentconnectinggridind = connectinggridind;
					var testconnectinggridind = -2;
					if (WTW.drive != null) {
						if (WTW.isNumeric(WTW.drive.currentspeed)) {
							currentspeed = Number(WTW.drive.currentspeed);
						}
						if (WTW.isNumeric(WTW.drive.drivedirection)) {
							currentdirection = Number(WTW.drive.drivedirection);
						}
						if (WTW.isNumeric(WTW.drive.connectinggridind)) {
							testconnectinggridind = Number(WTW.drive.connectinggridind);
						}
						currentspeed = currentspeed / 100;
						var test = false;
						var currentactionzoneind = actionzoneind;
						if (currentconnectinggridind == testconnectinggridind) {
							if (currentdirection == 1) {
								if (WTW.actionZones[currentactionzoneind] != null) {
									if (currentspeed != 0) {
										test = true;
									}
								}
							}
						}
					}
					return test;
				});
				var condition4 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var currentfactor = Number(actionzonedef.axis.rotatedegrees);
					var currentspeed = 0;
					var currentdirection = 1;
					var currentconnectinggridind = connectinggridind;
					var testconnectinggridind = -2;
					var test = false;
					if (WTW.drive != null) {
						if (WTW.isNumeric(WTW.drive.currentspeed)) {
							currentspeed = Number(WTW.drive.currentspeed);
						}
						if (WTW.isNumeric(WTW.drive.drivedirection)) {
							currentdirection = Number(WTW.drive.drivedirection);
						}
						if (WTW.isNumeric(WTW.drive.connectinggridind)) {
							testconnectinggridind = Number(WTW.drive.connectinggridind);
						}
						currentspeed = currentspeed / 100;
						var currentactionzoneind = actionzoneind;
						if (currentconnectinggridind == testconnectinggridind) {
							if (currentdirection == -1) {
								if (WTW.actionZones[currentactionzoneind] != null) {
									if (currentspeed != 0) {
										test = true;
									}
								}
							}
						}
					}
					return test;
				});
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, actionzoneaxle, "rotation.z", -1, condition3)); 
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, actionzoneaxle, "rotation.z", 1, condition4)); 
			} catch (ex) {
			}
		}
		if (actionzoneaxlepole2 == null && WTW.adminView == 1) {
			var molddef7 = WTW.newMold();
			molddef7.shape = "box";
			molddef7.covering = "texture";
			molddef7.scaling.x = .20;
			molddef7.scaling.y = .20;
			molddef7.scaling.z = 20;
			molddef7.rotation.x = Number(actionzonedef.axis.rotation.x);
			molddef7.rotation.y = Number(actionzonedef.axis.rotation.y);
			molddef7.rotation.z = Number(actionzonedef.axis.rotation.z);
			molddef7.graphics.texture.id = "7orpcjosyct5b1bf";
			molddef7.graphics.texture.path = "/content/system/stock/vaxis-512x512.png";
			molddef7.opacity = 0;
			molddef7.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlepole2 = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlepole2-"), molddef7, molddef7.parentname, molddef7.covering);
			actionzoneaxlepole2.isPickable = false;
			actionzoneaxlepole2.checkCollisions = false;
		}
		if (actionzone == null) {
			var molddef5 = WTW.newMold();
			molddef5.shape = actionzonedef.actionzoneshape;
			molddef5.covering = "hidden";
			molddef5.scaling.x = actionzonedef.scaling.x;
			molddef5.scaling.y = actionzonedef.scaling.y;
			molddef5.scaling.z = actionzonedef.scaling.z;
			molddef5.subdivisions = 20;
			molddef5.opacity = 0;
			molddef5.parentname = parentname;
			actionzone = WTW.addMold(actionzonename, molddef5, molddef5.parentname, molddef5.covering);
			actionzone.isPickable = false;
			actionzone.checkCollisions = false;
			actionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			var axlename = actionzonename.replace("actionzone-","actionzoneaxle-"); 
			try {
				var condition1 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var currentfactor = Number(actionzonedef.axis.rotatedegrees);
					var currentturn = 0;
					var currentconnectinggridind = connectinggridind;
					var testconnectinggridind = -2;
					var test = false;
					if (WTW.drive != null) {
						if (WTW.isNumeric(WTW.drive.currentturn)) {
							currentturn = Number(WTW.drive.currentturn);
						}
						if (WTW.isNumeric(WTW.drive.connectinggridind)) {
							testconnectinggridind = Number(WTW.drive.connectinggridind);
						}
						currentturn = currentturn * currentfactor;
						var currentactionzoneind = actionzoneind;
						var currentdoor = actionzoneaxle;
						var currentdoorroty = Math.round(WTW.getDegrees(currentdoor.rotation.y) * 100) / 100;
						if (currentdoorroty > 180) {
							currentdoorroty -= 360;
						}
						if (currentconnectinggridind == testconnectinggridind) {
							if (WTW.actionZones[currentactionzoneind] != null) {
								if (currentdoorroty < Math.round(currentturn * 100) / 100) {
									test = true;
								}
							}
						}
					}
					return test;
				});
				var condition2 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var currentfactor = Number(actionzonedef.axis.rotatedegrees);
					var currentturn = 0;
					var currentconnectinggridind = connectinggridind;
					var testconnectinggridind = -2;
					var test = false;
					if (WTW.drive != null) {
						if (WTW.isNumeric(WTW.drive.currentturn)) {
							currentturn = Number(WTW.drive.currentturn);
						}
						if (WTW.isNumeric(WTW.drive.connectinggridind)) {
							testconnectinggridind = Number(WTW.drive.connectinggridind);
						}
						currentturn = currentturn * currentfactor;
						var currentactionzoneind = actionzoneind;
						var currentdoor = actionzoneaxle;
						var currentdoorroty = Math.round(WTW.getDegrees(currentdoor.rotation.y) * 100) / 100;
						if (currentdoorroty > 180) {
							currentdoorroty -= 360;
						}
						if (currentconnectinggridind == testconnectinggridind) {
							if (WTW.actionZones[currentactionzoneind] != null) {
								if (currentdoorroty > Math.round(currentturn * 100) / 100) {
									test = true;
								}
							}
						}
					}
					return test;
				});
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, actionzoneaxle, "rotation.y", 0.1, condition1)); 
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, actionzoneaxle, "rotation.y", -0.1, condition2));
				WTW.actionZones[actionzoneind].status = 1;
			} catch (ex) {
			}
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == "Action Zones are Shown") {
				WTW.setOpacity(actionzonename, .2);
				WTW.setOpacity(actionzonename.replace("actionzone-","actionzoneaxlepole-"), 1);
			}
		}
		WTW.actionZones[actionzoneind].shown = "2";
	} catch (ex) {
		WTW.log("core-scripts-actionzones-basicactionzones\r\n addActionzoneDriverTurningWheel=" + ex.message);
	}
	return actionzone;
}

WTWJS.prototype.addActionzoneDriverWheel = function(actionzonename, actionzoneind, actionzonedef) {
	var actionzone;
	try {
		var parentname = actionzonedef.parentname;
		var zpositionx = Number(actionzonedef.position.x);
		var zpositiony = Number(actionzonedef.position.y);
		var zpositionz = Number(actionzonedef.position.z);
		var axispositionx = Number(actionzonedef.axis.position.x);
		var axispositiony = Number(actionzonedef.axis.position.y);
		var axispositionz = Number(actionzonedef.axis.position.z);
		var axisrotx = Number(actionzonedef.axis.rotation.x);
		var axisroty = Number(actionzonedef.axis.rotation.y);
		var axisrotz = Number(actionzonedef.axis.rotation.z);
		var buildingind = -1;
		var moldgroup = "building";
		var namepart = parentname.split('-');
		var connectinggridind = -1;
		if (namepart[1] != null) {
			connectinggridind = Number(namepart[1]);
		}
		if (actionzonedef.buildinginfo.buildingid != "") {
			buildingind = WTW.getConnectingGridInd(actionzonedef.buildinginfo.buildingid);
		} else if (actionzonedef.communityinfo.communityid != "") {
			moldgroup = "community";
		} else if (actionzonedef.thinginfo.thingid != "") {
			moldgroup = "thing";
		}
		actionzone = scene.getMeshByID(actionzonename);
		var actionzoneaxlebase = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase-"));
		var actionzoneaxle = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxle-"));
		var actionzoneaxlepole = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlepole-"));
		var actionzoneaxlebase2 = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase2-"));
		if (actionzoneaxlebase == null) {
			var molddef = WTW.newMold();
			molddef.shape = "box";
			molddef.covering = "hidden";
			molddef.opacity = 0;
			molddef.parentname = parentname;
			actionzoneaxlebase = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase-"), molddef, molddef.parentname, molddef.covering);
			actionzoneaxlebase.position.x = axispositionx;
			actionzoneaxlebase.position.y = axispositiony;
			actionzoneaxlebase.position.z = axispositionz;
			actionzoneaxlebase.isPickable = false;
			actionzoneaxlebase.checkCollisions = false;
			actionzoneaxlebase.rotation.x = WTW.getRadians(axisrotx);
			actionzoneaxlebase.rotation.y = WTW.getRadians(axisroty);
			actionzoneaxlebase.rotation.z = WTW.getRadians(axisrotz);
		}
		if (actionzoneaxle == null) {
			WTW.actionZones[actionzoneind].status = 0;
			var molddef1 = WTW.newMold();
			molddef1.shape = "box";
			molddef1.covering = "hidden";
			molddef1.scaling.x = 1;
			molddef1.scaling.y = 1;
			molddef1.scaling.z = 1;
			molddef1.opacity = 0;
			molddef1.parentname = actionzonename.replace("actionzone-","actionzoneaxlebase-");
			actionzoneaxle = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxle-"), molddef1, molddef1.parentname, molddef1.covering);
			actionzoneaxle.position.x = 0;
			actionzoneaxle.position.y = 0;
			actionzoneaxle.position.z = 0;
			actionzoneaxle.isPickable = false;
			actionzoneaxle.checkCollisions = false;
			try {
				var condition3 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var currentfactor = Number(actionzonedef.axis.rotatedegrees);
					var currentspeed = 0;
					var currentdirection = 1;
					var currentconnectinggridind = connectinggridind;
					var testconnectinggridind = -2;
					var test = false;
					if (WTW.drive != null) {
						if (WTW.isNumeric(WTW.drive.currentspeed)) {
							currentspeed = Number(WTW.drive.currentspeed);
						}
						if (WTW.isNumeric(WTW.drive.drivedirection)) {
							currentdirection = Number(WTW.drive.drivedirection);
						}
						if (WTW.isNumeric(WTW.drive.connectinggridind)) {
							testconnectinggridind = Number(WTW.drive.connectinggridind);
						}
						currentspeed = currentspeed / 100;
						var currentactionzoneind = actionzoneind;
						if (currentconnectinggridind == testconnectinggridind) {
							if (currentdirection == 1) {
								if (WTW.actionZones[currentactionzoneind] != null) {
									if (currentspeed != 0) {
										test = true;
									}
								}
							}
						}
					}
					return test;
				});
				var condition4 = new BABYLON.PredicateCondition(scene.actionManager, function () {
					var currentfactor = Number(actionzonedef.axis.rotatedegrees);
					var currentspeed = 0;
					var currentdirection = 1;
					var currentconnectinggridind = connectinggridind;
					var testconnectinggridind = -2;
					var test = false;
					if (WTW.drive != null) {
						if (WTW.isNumeric(WTW.drive.currentspeed)) {
							currentspeed = Number(WTW.drive.currentspeed);
						}
						if (WTW.isNumeric(WTW.drive.drivedirection)) {
							currentdirection = Number(WTW.drive.drivedirection);
						}
						if (WTW.isNumeric(WTW.drive.connectinggridind)) {
							testconnectinggridind = Number(WTW.drive.connectinggridind);
						}
						currentspeed = currentspeed / 100;
						var currentactionzoneind = actionzoneind;
						if (currentconnectinggridind == testconnectinggridind) {
							if (currentdirection == -1) {
								if (WTW.actionZones[currentactionzoneind] != null) {
									if (currentspeed != 0) {
										test = true;
									}
								}
							}
						}
					}
					return test;
				});
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, actionzoneaxle, "rotation.z", 1, condition3)); 
				scene.actionManager.registerAction(new BABYLON.IncrementValueAction(
				BABYLON.ActionManager.OnEveryFrameTrigger, actionzoneaxle, "rotation.z", -1, condition4)); 
			} catch (ex) {
			}			
		}
		if (actionzoneaxlepole == null && WTW.adminView == 1) {
			var molddef4 = WTW.newMold();
			molddef4.shape = "box";
			molddef4.covering = "texture";
			molddef4.scaling.x = .20;
			molddef4.scaling.y = .20;
			molddef4.scaling.z = 20;
			molddef4.rotation.x = Number(actionzonedef.axis.rotation.x);
			molddef4.rotation.y = Number(actionzonedef.axis.rotation.y);
			molddef4.rotation.z = Number(actionzonedef.axis.rotation.z);
			molddef4.graphics.texture.id = "7orpcjosyct5b1bf";
			molddef4.graphics.texture.path = "/content/system/stock/vaxis-512x512.png";
			molddef4.opacity = 0;
			molddef4.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlepole = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlepole-"), molddef4, molddef4.parentname, molddef4.covering);
			actionzoneaxlepole.isPickable = false;
			actionzoneaxlepole.checkCollisions = false;
		}
		if (actionzoneaxlebase2 == null) {
			var molddef2 = WTW.newMold();
			molddef2.shape = "box";
			molddef2.covering = "hidden";
			molddef2.opacity = 0;
			molddef2.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlebase2 = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase2-"), molddef2, molddef2.parentname, molddef2.covering);
			actionzoneaxlebase2.position.x = 0;
			actionzoneaxlebase2.position.y = 0;
			actionzoneaxlebase2.position.z = 0;
			actionzoneaxlebase2.isPickable = false;
			actionzoneaxlebase2.checkCollisions = false;
			actionzoneaxlebase2.rotation.x = WTW.getRadians(-axisrotx);
			actionzoneaxlebase2.rotation.y = WTW.getRadians(-axisroty);
			actionzoneaxlebase2.rotation.z = WTW.getRadians(-axisrotz);
		}
		if (actionzone == null) {
			var molddef5 = WTW.newMold();
			molddef5.shape = actionzonedef.actionzoneshape;
			molddef5.covering = "hidden";
			molddef5.scaling.x = actionzonedef.scaling.x;
			molddef5.scaling.y = actionzonedef.scaling.y;
			molddef5.scaling.z = actionzonedef.scaling.z;
			molddef5.subdivisions = 20;
			molddef5.opacity = 0;
			molddef5.parentname = parentname;
			actionzone = WTW.addMold(actionzonename, molddef5, molddef5.parentname, molddef5.covering);
			actionzone.isPickable = false;
			actionzone.checkCollisions = false;
			actionzone.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == "Action Zones are Shown") {
				WTW.setOpacity(actionzonename, .2);
				WTW.setOpacity(actionzonename.replace("actionzone-","actionzoneaxlepole-"), 1);
			}
		}
		WTW.actionZones[actionzoneind].shown = "2";
	} catch (ex) {
		WTW.log("core-scripts-actionzones-basicactionzones\r\n addActionzoneDriverWheel=" + ex.message);
	}
	return actionzone;
}

WTWJS.prototype.addActionzoneSeat = function(actionzonename, actionzoneind, actionzonedef) {
	var actionzone;
	try {
		var parentname = actionzonedef.parentname;
		var zpositionx = Number(actionzonedef.position.x);
		var zpositiony = Number(actionzonedef.position.y);
		var zpositionz = Number(actionzonedef.position.z);
		var axispositionx = zpositionx; //Number(actionzonedef.axis.position.x);
		var axispositiony = zpositiony; //Number(actionzonedef.axis.position.y);
		var axispositionz = zpositionz; //Number(actionzonedef.axis.position.z);
		var axisrotx = Number(actionzonedef.axis.rotation.x);
		var axisroty = Number(actionzonedef.axis.rotation.y);
		var axisrotz = Number(actionzonedef.axis.rotation.z);
		var buildingind = -1;
		var moldgroup = "building";
		if (actionzonedef.buildinginfo.buildingid != "") {
			buildingind = WTW.getConnectingGridInd(actionzonedef.buildinginfo.buildingid);
		} else if (actionzonedef.communityinfo.communityid != "") {
			moldgroup = "community";
		} else if (actionzonedef.thinginfo.thingid != "") {
			moldgroup = "thing";
		}
		actionzone = scene.getMeshByID(actionzonename);
		var actionzoneaxlebase = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase-"));
		var actionzoneaxle = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxle-"));
		var actionzoneaxlepole = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlepole-"));
		var actionzoneaxlebase2 = scene.getMeshByID(actionzonename.replace("actionzone-","actionzoneaxlebase2-"));
		if (actionzoneaxlebase == null) {
			var molddef = WTW.newMold();
			molddef.shape = "box";
			molddef.covering = "hidden";
			molddef.opacity = 0;
			molddef.scaling.x = 1;
			molddef.scaling.y = 1;
			molddef.scaling.z = 1;
			molddef.parentname = parentname;
			actionzoneaxlebase = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase-"), molddef, molddef.parentname, molddef.covering);
			actionzoneaxlebase.isPickable = false;
			actionzoneaxlebase.checkCollisions = false;
			actionzoneaxlebase.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
		}
		if (actionzoneaxle == null) {
			WTW.actionZones[actionzoneind].status = 0;
			var molddef1 = WTW.newMold();
			molddef1.shape = "box";
			molddef1.covering = "hidden";
			molddef1.scaling.x = 1;
			molddef1.scaling.y = 1;
			molddef1.scaling.z = 1;
			molddef1.opacity = 0;
			molddef1.parentname = actionzonename.replace("actionzone-","actionzoneaxlebase-");
			actionzoneaxle = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxle-"), molddef1, molddef1.parentname, molddef1.covering);
			actionzoneaxle.position.x = axispositionx;
			actionzoneaxle.position.y = axispositiony;
			actionzoneaxle.position.z = axispositionz;
			//actionzoneaxle.rotation.x = WTW.getRadians(axisrotx);
			//actionzoneaxle.rotation.y = WTW.getRadians(axisroty);
			//actionzoneaxle.rotation.z = WTW.getRadians(axisrotz);
			actionzoneaxle.isPickable = false;
			actionzoneaxle.checkCollisions = false;
			actionzoneaxle.position.y -= 8;
			actionzoneaxle.position.x += 4;
			actionzoneaxle.rotation.y = WTW.getRadians(-90);
		}
		if (actionzoneaxlepole == null && WTW.adminView == 1) {
			var molddef4 = WTW.newMold();
			molddef4.shape = "box";
			molddef4.covering = "texture";
			molddef4.scaling.x = .20;
			molddef4.scaling.y = .20;
			molddef4.scaling.z = 10;
			molddef4.graphics.texture.id = "7orpcjosyct5b1bf";
			molddef4.graphics.texture.path = "/content/system/stock/vaxis-512x512.png";
			molddef4.opacity = 1;
			molddef4.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlepole = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlepole-"), molddef4, molddef4.parentname, molddef4.covering);
			actionzoneaxlepole.isPickable = false;
			actionzoneaxlepole.checkCollisions = false;
			actionzoneaxlepole.rotation.x = WTW.getRadians(90);
			actionzoneaxlepole.position.y += 5;
		}
		if (actionzoneaxlebase2 == null) {
			var molddef2 = WTW.newMold();
			molddef2.shape = "box";
			molddef2.covering = "hidden";
			molddef2.scaling.x = 1;
			molddef2.scaling.y = 1;
			molddef2.scaling.z = 1;
			molddef2.opacity = 0;
			molddef2.parentname = actionzonename.replace("actionzone-","actionzoneaxle-");
			actionzoneaxlebase2 = WTW.addMold(actionzonename.replace("actionzone-","actionzoneaxlebase2-"), molddef2, molddef2.parentname, molddef2.covering);
			actionzoneaxlebase2.isPickable = false;
			actionzoneaxlebase2.checkCollisions = false;
			actionzoneaxlebase2.rotation.y = WTW.getRadians(-90);
		}
		if (actionzone == null) {
			var molddef5 = WTW.newMold();
			molddef5.shape = actionzonedef.actionzoneshape;
			molddef5.covering = "hidden";
			molddef5.position.x = zpositionx;
			molddef5.position.y = zpositiony;
			molddef5.position.z = zpositionz;
			molddef5.scaling.x = actionzonedef.scaling.x;
			molddef5.scaling.y = actionzonedef.scaling.y;
			molddef5.scaling.z = actionzonedef.scaling.z;
			molddef5.subdivisions = 12;
			molddef5.opacity = 0;
			molddef5.parentname = parentname;
			actionzone = WTW.addMold(actionzonename, molddef5, molddef5.parentname, molddef5.covering);
			actionzone.isPickable = false;
			actionzone.checkCollisions = false;
		}
		if (dGet('wtw_bzones') != null) {
			if (WTW.adminView == 1 && dGet('wtw_bzones').title == "Action Zones are Shown") {
				WTW.setOpacity(actionzonename, .2);
				WTW.setOpacity(actionzonename.replace("actionzone-","actionzoneaxlepole-"), 1);
			}
		}
		WTW.actionZones[actionzoneind].shown = "2";	
	} catch (ex) {
		WTW.log("core-scripts-actionzones-basicactionzones\r\n addActionzoneSeat=" + ex.message);
	}
	return actionzone;
}
function WTWJS() {
	this.ver = "1.0.0";
	this.avatars = [];
	this.avatarParts = [];
	this.avatarAnimations = [];
	this.myAvatar = null;
	this.mouseOver = null;
	this.mouseOut = null;
	this.sun = null;
	this.backLight = null;
	this.lastID = '';
	this.currentID = '';
	this.highlightLayer = null;
	this.walkSpeed = 1;
	this.walkAnimationSpeed = 1;
	this.turnSpeed = 1;
	this.turnAnimationSpeed = 1;
		this.init = {
		'startPositionX':0,
		'startPositionY':10,
		'startPositionZ':0,
		'startScalingX':1,
		'startScalingY':1,
		'startScalingZ':1,
		'startRotationX':0,
		'startRotationY':0,
		'startRotationZ':0,
		'loaded':0
	}
}
var WTW = new WTWJS();

function dGet(k) {
	return document.getElementById(k);
}

WTWJS.prototype.dGet = function(k) {
	return document.getElementById(k);
}

WTWJS.prototype.log = function(txt,color) {
	if (color == undefined) {
		color = 'black';
	}
	if (color.toLowerCase() == 'black') {
		console.log('\r\n' + txt);
	} else {
		console.log('\r\n%c' + txt, 'color:' + color + ';font-weight:bold;');
	}
}

WTWJS.prototype.getJSON = function(zurl, zcallback, zaction, zrequest) {
	try {
		if (zaction == undefined) {
			zaction = 'GET';
		}
		if (zrequest == undefined) {
			zrequest = null;
		}
		var Httpreq = new XMLHttpRequest();
		Httpreq.overrideMimeType("application/json");
		Httpreq.open(zaction, zurl, true);
		Httpreq.onreadystatechange = function () {
			if (Httpreq.readyState == 4 && Httpreq.status == "200") {
				zcallback(Httpreq.responseText);
			}
		};
		Httpreq.send(zrequest);  
	} catch (ex) {
		WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-getJSON=" + ex.message);
	}
}

WTWJS.prototype.getAsyncJSON = function(zurl, zcallback, zaction, zrequest) {
	/* performs a JSON call for data in async mode */
	try {
		return new Promise(function () {
			if (zaction == undefined) {
				zaction = 'GET';
			}
			if (zrequest == undefined) {
				zrequest = null;
			}
			var Httpreq = new XMLHttpRequest();
			Httpreq.overrideMimeType("application/json");
			Httpreq.open(zaction, zurl, true);
			Httpreq.onreadystatechange = function () {
				if (Httpreq.readyState == 4 && Httpreq.status == "200") {
					zcallback(Httpreq.responseText);
				}
			};
			Httpreq.send(zrequest);
		});
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getAsyncJSON=" + ex.message);
	}
}

WTWJS.prototype.postJSON = function(zurl, zrequest, zcallback) {
	try {
		var zform1 = document.createElement('form');
		var Httpreq = new XMLHttpRequest();
		var zformdata = new FormData(zform1);
		for(var zkey in zrequest) {
			zformdata.append(zkey, zrequest[zkey]);
		}
		zformdata.append('action', 'POST');
		Httpreq.open('POST', zurl);
		Httpreq.onreadystatechange = function () {
			if (Httpreq.readyState == 4 && Httpreq.status == "200") {
				zcallback(Httpreq.responseText);
			}
		};
		Httpreq.send(zformdata);  
	} catch (ex) {
		WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-postJSON=" + ex.message);
	}
}

WTWJS.prototype.postAsyncJSON = function(zurl, zrequest, zcallback) {
	/* performs a form POST based JSON call for data in async mode */
	try {
		return new Promise(function () {
			var zform1 = document.createElement('form');
			var Httpreq = new XMLHttpRequest();
			var zformdata = new FormData(zform1);
			for(var zkey in zrequest) {
				zformdata.append(zkey, zrequest[zkey]);
			}
			zformdata.append('action', 'POST');
			Httpreq.open('POST', zurl);
			Httpreq.onreadystatechange = function () {
				if (Httpreq.readyState == 4 && Httpreq.status == "200") {
					zcallback(Httpreq.responseText);
				}
			};
			Httpreq.send(zformdata);
		});
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-postAsyncJSON=" + ex.message);
	}
}

WTWJS.prototype.setCookie = function(zname, zvalue, zdays) {
	try {
		var zexpires = "";
		if (zdays) {
			var zdate = new Date();
			zdate.setTime(zdate.getTime() + (zdays*24*60*60*1000));
			zexpires = "; expires=" + zdate.toGMTString();
		}
		if (wtw_protocol == "https://") {
			document.cookie = zname + "=" + zvalue + zexpires + "; domain=" + wtw_domainname + ";path=/;secure";
		} else {
			document.cookie = zname + "non=" + zvalue + zexpires + "; path=/";
		}
    } catch (ex) {
        WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-setCookie=" +ex.message);
    }
}

WTWJS.prototype.getCookie = function(zname) {
	var zvalue = "";
	try {
		if (wtw_protocol != "https://") {
			zname += "non=";
		}
		var zcookies = document.cookie.split(';');
		for(var i=0;i < zcookies.length;i++) {
			var zcook = zcookies[i];
			while (zcook.charAt(0)==' ') {
				zcook = zcook.substring(1,zcook.length);
			}
			if (zcook.indexOf(zname) == 0) {
				zvalue = zcook.substring(zname.length,zcook.length);
			}
		}
		if (zvalue == "") {
			zvalue = null;
		} else if (zvalue.indexOf("non=") > -1) {
			zvalue = zvalue.replace("non=","");
		} else if (zvalue.indexOf("=") > -1) {
			zvalue = zvalue.replace("=","");
		}
    } catch (ex) {
        WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-getCookie=" +ex.message);
    }
	return zvalue;
}

WTWJS.prototype.deleteCookie = function(zname) {
    WTW.setCookie(zname,"",-1);
}

WTWJS.prototype.getQuerystring = function(zkey, zdefault) {
    var zquery = "";
    try {
        if (zdefault == null) zdefault = "";
        zkey = zkey.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var zregex = new RegExp("[\\?&]" + zkey + "=([^&#]*)");
        var zqs = zregex.exec(window.location.href);
        if (zqs == null) {
            zquery = zdefault;
        } else {
            zquery = zqs[1];
        }
    } catch (ex) {
		WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-getQuerystring=" + ex.message);
    }
    return zquery;
}

WTWJS.prototype.getRandomString = function(zlength) {
    var zresult = '';
	try {
		var zchars = '0123456789abcdefghijklmnopqrstuvwxyz';
		for (var i = zlength; i > 0; --i) {
			zresult += zchars[Math.floor(Math.random() * zchars.length)];
		}
	} catch (ex) {
		WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-randomString=" + ex.message);
	}
    return zresult;
}

WTWJS.prototype.isNumeric = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

WTWJS.prototype.getRadians = function(zdegrees) {
	var zradians = 0;
	try {
		if (WTW.isNumeric(zdegrees)) {
			zradians = zdegrees * Math.PI / 180;
		}
    } catch (ex) {
		WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-getRadians=" + ex.message);
    }
	return zradians;
}

WTWJS.prototype.getDegrees = function(zradians) {
	var zdegrees = 0;
	try {
		if (WTW.isNumeric(zradians)) {
			zdegrees = WTW.cleanDegrees(zradians * 180 / Math.PI);
		}
    } catch (ex) {
		WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-getDegrees=" + ex.message);
    }
	return zdegrees;
}

WTWJS.prototype.registerMouseOver = function(mold) {
	try {
		if (mold != null) {
			mold.actionManager = new BABYLON.ActionManager(scene);	
			mold.actionManager.registerAction(WTW.mouseOver);
			mold.actionManager.registerAction(WTW.mouseOut);
		}
	} catch (ex) {
		WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-registerMouseOver=" + ex.message);
	}
}

WTWJS.prototype.mouseOverMold = function(mold) {
	try {
		document.body.style.cursor = "default";
		if (mold.meshUnderPointer != null) {
			WTW.lastID = WTW.currentID;
			WTW.currentID = mold.meshUnderPointer.name;
			if (mold.meshUnderPointer.isPickable) {
				document.body.style.cursor = "pointer";
			}
		}
	} catch(ex) {
		WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-mouseOverMold=" + ex.message);
	}
}

WTWJS.prototype.mouseOutMold = function(mold) {
	try {
		document.body.style.cursor = "default";
		WTW.lastID = WTW.currentID;
		WTW.currentID = "";
	} catch (ex) {
		WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-mouseOutMold=" + ex.message);
	}
}

WTWJS.prototype.showIDs = function(zdisplayname) {
	try {
		if (zdisplayname == "") {
			zdisplayname = 'Anonymous';
		}
		var znamemold = WTW.getMeshOrNodeByID("myavatar" + dGet('wtw_tinstanceid').value + '-nameplate');
		if (znamemold != null) {
			znamemold.dispose();
		}
		var zmolddef = WTW.newMold();
		zmolddef.webtext.webtext = zdisplayname;
		zmolddef.webtext.webstyle = JSON.stringify({
			"anchor":"center",
			"letter-height":1.00,
			"letter-thickness":.10,
			"color":"#0000ff",
			"alpha":1.00,
			"colors":{
				"diffuse":"#f0f0f0",
				"specular":"#000000",
				"ambient":"#808080",
				"emissive":"#0000ff"
			}
		});
		znamemold = WTW.addMold3DText("myavatar" + dGet('wtw_tinstanceid').value + '-nameplate', zmolddef, 1, 1, 1);
		znamemold.parent = WTW.myAvatar;
		znamemold.position.y = 16;
		znamemold.billboardMode = 2;
    } catch (ex) {
        WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-showIDs=" +ex.message);
    }
}

WTWJS.prototype.newMold = function() {
	var zmolddef = '';
	var zpath1 = [];
	var zpath2 = [];
	var zwebimages = [];
	try {
		zwebimages[0] = WTW.newWebImage();
		zmolddef = {
			'communityinfo':
			{
				'communityid':'',
				'communityind':'-1',
				'analyticsid':''
			},
			'buildinginfo':
			{
				'buildingid':'',
				'buildingind':'-1',
				'analyticsid':''
			},
			'thinginfo':
			{
				'thingid':'',
				'thingind':'-1',
				'analyticsid':''
			},
			'position':
			{
				'x':'0.00',
				'y':'0.00',
				'z':'0.00',
				'scroll':'0'
			},
			'scaling':
			{
				'x':'1.00',
				'y':'1.00',
				'z':'1.00',
				'special1':'0.00',
				'special2':'0.00'
			},
			'rotation':
			{
				'x':'0.00',
				'y':'0.00',
				'z':'0.00',
				'billboard':'0'
			},
			'csg':
			{
				'moldid':'',
				'moldind':'-1',
				'action':'subtract',
				'count':'0'
			},
			'objects':
			{
				'uploadobjectid':'',
				'folder':'',
				'file':'',
				'objectanimations':null
			},
			'graphics':
			{
				'texture':
				{
					'id':'',
					'path':'',
					'bumpid':'',
					'bumppath':'',
					'videoid':'',
					'video':'',
					'videoposterid':'',
					'videoposter':'',
					'backupid':'',
					'backuppath':'',
					'loaded':'0'
				},
				'heightmap':
				{
					'original':'',
					'id':'',
					'path':'',
					'minheight':'0.00',
					'maxheight':'0.00',
					'backupid':'',
					'mixmapid':'',
					'mixmappath':'',
					'texturerid':'',
					'texturerpath':'',
					'texturegid':'',
					'texturegpath':'',
					'texturebid':'',
					'texturebpath':'',
					'texturebumprid':'',
					'texturebumprpath':'',
					'texturebumpgid':'',
					'texturebumpgpath':'',
					'texturebumpbid':'',
					'texturebumpbpath':''
				},
				'uoffset':'0.00',
				'voffset':'0.00',
				'uscale':'0.00',
				'vscale':'0.00',
				'level':'0',
				'receiveshadows':'0',
				'waterreflection':'0',
				'webimageind':'0',
				'webimages':zwebimages
			},
			'webtext':{
				'webtext':'',
				'fullheight':'0',
				'scrollpos':'0',
				'webstyle':''
			},
			'color':
			{
				'diffuse':{
					'r':'1',
					'g':'1',
					'b':'1'
				},
				'specular':{
					'r':'1',
					'g':'1',
					'b':'1'
				},
				'emissive':{
					'r':'1',
					'g':'1',
					'b':'1'
				}
			},
			'paths':
			{
				'path1':zpath1,
				'path2':zpath2
			},
			'alttag':
			{
				'name':''
			},
			'sound':
			{
				'id':'',
				'path':'',
				'name':'',
				'attenuation':'',
				'loop':'1',
				'maxdistance':'100',
				'rollofffactor':'1',
				'refdistance':'1',
				'coneinnerangle':'90',
				'coneouterangle':'180',
				'coneoutergain':'.5',
				'sound':''
			},
			'objects':
			{
				'light':'',
				'shadows':''
			},
			'moldid':'',
			'moldind':'-1',
			'shape':'box',
			'covering':'texture',
			'subdivisions':'',
			'subdivisionsshown':'0',
			'shown':'0',
			'opacity':'100',
			'checkcollisions':'1',
			'ispickable':'',
			'jsfunction':'',
			'jsparameters':'',
			'actionzoneid':'',
			'actionzoneind':'-1',
			'parentactionzoneind':'-1',
			'loadactionzoneid':'',
			'loadactionzoneind':'-1',
			'inloadactionzone':'0',
			'altconnectinggridid':'',
			'altconnectinggridind':'-1',
			'connectinggridid':'',
			'connectinggridind':'-1',
			'attachmoldind':'-1',
			'parentname':'',
			'moldname':''
		};
	} catch (ex) {
		WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-newmold=" + ex.message);
	}
	return zmolddef;
}

WTWJS.prototype.newWebImage = function() {
	var zwebimage = '';
	try {
		zwebimage = {
			'imageid':'',
			'imagepath':'',
			'imagehoverid':'',
			'imagehoverpath':'',
			'imageclickid':'',
			'imageclickpath':'',
			'jsfunction':'',
			'jsparameters':'',
			'imageloaded':'0',
			'hoverloaded':'0',
			'clickloaded':'0'
		};
	} catch (ex) {
		WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-newWebImage=" + ex.message);
	}
	return zwebimage;
}

WTWJS.prototype.addMold3DText = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);

		var zwebtext = zmolddef.webtext.webtext;
		var zwebstyle = zmolddef.webtext.webstyle;
		if (zwebtext == null || zwebtext == '') {
			zwebtext = '-';
		}
		if (zwebstyle == null || zwebstyle == '') {
			zwebstyle = {
				"anchor":"center",
				"letter-height":6.00,
				"letter-thickness":1.00,
				"color":"#ff0000",
				"alpha":1.00,
				"colors":{
					"diffuse":"#f0f0f0",
					"specular":"#000000",
					"ambient":"#808080",
					"emissive":"#ff0000"
				}
			};
		} else {
			zwebstyle = JSON.parse(zwebstyle);
		}
		Writer = BABYLON.MeshWriter(scene, {scale:1});
        var zdisplaytext  = new Writer(zwebtext, zwebstyle);
		var zmytext = zdisplaytext.getMesh();
		zmytext.rotation.x = WTW.getRadians(-90);
		zmytext.name = zmoldname + "-text";
		zmytext.parent = zmold;
		zmytext.isPickable = true;
		WTW.registerMouseOver(zmytext);
	} catch (ex) {
		WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-addMold3DText=" + ex.message);
	}
	return zmold;
}

WTWJS.prototype.hilightMoldFast = function(zmoldname, zcolor) {
	try {
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
			var zcolorcode = BABYLON.Color3.Yellow();
			switch (zcolor.toLowerCase()) {
				case "green":
					zcolorcode = BABYLON.Color3.Green();
					break;
				case "red":
					zcolorcode = BABYLON.Color3.Red();
					break;
				case "blue":
					zcolorcode = BABYLON.Color3.Blue();
					break;
				case "yellow":
					zcolorcode = BABYLON.Color3.Yellow();
					break;
			}
			WTW.unhilightMold(zmoldname);
			if (WTW.highlightLayer == null) {
				WTW.highlightLayer = new BABYLON.HighlightLayer("highlightlayer", scene);
			}
			WTW.highlightLayer.outerGlow = true;
			WTW.highlightLayer.innerGlow = true;
			WTW.highlightLayer.addMesh(zmold, zcolorcode);
			window.setTimeout(function(){
				WTW.highlightLayer.outerGlow = false;
				WTW.highlightLayer.innerGlow = false;
				WTW.highlightLayer.removeMesh(zmold);
			},500);
		}
	} catch (ex) {
		WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-hilightMoldFast=" + ex.message);
	}
}

WTWJS.prototype.hilightMold = function(zmoldname, zcolor) {
	try {
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
			var zcolorcode = BABYLON.Color3.Yellow();
			switch (zcolor.toLowerCase()) {
				case "green":
					zcolorcode = BABYLON.Color3.Green();
					break;
				case "red":
					zcolorcode = BABYLON.Color3.Red();
					break;
				case "blue":
					zcolorcode = BABYLON.Color3.Blue();
					break;
				case "yellow":
					zcolorcode = BABYLON.Color3.Yellow();
					break;
			}
			WTW.unhilightMold(zmoldname);
			if (WTW.highlightLayer == null) {
				WTW.highlightLayer = new BABYLON.HighlightLayer("highlightlayer", scene);
			}
			WTW.highlightLayer.outerGlow = true;
			//WTW.highlightLayer.innerGlow = true;
			WTW.highlightLayer.addMesh(zmold, zcolorcode);
		}
	} catch (ex) {
		WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-hilightMold=" + ex.message);
	}
}

WTWJS.prototype.unhilightMold = function(zmoldname) {
	try {
		if (WTW.highlightLayer != null) {
			var zmold = WTW.getMeshOrNodeByID(zmoldname);
			if (zmold != null) {
				WTW.highlightLayer.removeMesh(zmold);
			}
		}
	} catch (ex) {
		WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-unhilightMold=" + ex.message);
	}
}

WTWJS.prototype.disposeClean = function(zmoldname, zcheck) {
	try {
		/* extension of the babylon dispose function to catch various child and sub elements */
		if (zmoldname != "") {
			scene.blockfreeActiveMeshesAndRenderingGroups = true;
			if (zcheck == undefined) {
				zcheck = true;
			}
            var znamepart = zmoldname.split('-');
			/* dispose mold (mesh) from shadow and reflection arrays */
			WTW.disposeShadowFromMold(zmoldname);
			WTW.disposeReflectionFromMold(zmoldname);
			try {
				/* plugin hook for custom code */
				WTW.pluginsDisposeClean(zmoldname);
			} catch (ex) {}
			try {
				WTW.disposeMoldEvent(zmoldname);
				WTW.disposeSoundAndLights(zmoldname);
				if (zmoldname.indexOf("myavatar") > -1 || zmoldname.indexOf("person") > -1) {
					/* dispose of avatar parts / animations */
					WTW.disposeAnimations(zmoldname);
				} else if (znamepart[5] == 'video') {
					/* stop and clear the video before it is deleted */
					var zstrtemp = zmoldname;
					zstrtemp = zstrtemp.replace("-base","-mainvideo");
					var zvideomold = WTW.getMeshOrNodeByID(zstrtemp);
					if (zvideomold != null){
						if (zvideomold.material.diffuseTexture.video != undefined) {
							zvideomold.material.diffuseTexture.video.pause();
							zvideomold.material.diffuseTexture.video.src = "";
						}
						if (zvideomold.material.diffuseTexture.video != null) {
							zvideomold.material.diffuseTexture.video = null;
						}
				   }
				} else if (znamepart[5].indexOf('water') > -1) {
					/* remove mold from reflection and refraction arrays */
					var zstrtemp = zmoldname;
					if (zstrtemp.indexOf('-base') > -1) {
						zstrtemp = zstrtemp.replace("-base","");
					}
					var zwatermat = scene.getMaterialByID(zstrtemp + "-watermat");
					if (zwatermat != null) {
						if (zwatermat.reflectionTexture.renderList != null) {
							if (zwatermat.reflectionTexture.renderList.length > 0) {
								zwatermat.reflectionTexture.renderList.splice(0, zwatermat.reflectionTexture.renderList.length);
							}
						}
						if (zwatermat.refractionTexture.renderList != null) {
							if (zwatermat.refractionTexture.renderList.length > 0) {
								zwatermat.refractionTexture.renderList.splice(0, zwatermat.refractionTexture.renderList.length);
							}
						}
					}
					try {
						if (zwatermat.reflectionTexture != null) {
							zwatermat.reflectionTexture.dispose();
							zwatermat.reflectionTexture = null;
						}
					} catch(ex) {}
					try {
						if (zwatermat.refractionTexture != null) {
							zwatermat.refractionTexture.dispose();
							zwatermat.refractionTexture = null;
						}
						zwatermat.dispose();
					} catch(ex) {}
					if (zcheck) {
						WTW.disposeClean(zstrtemp + "-water", false);
					}
				} else if (znamepart[5].indexOf('image') > -1) {
					/* dispose of hover over and click image mold layers */
					var zstrtemp = zmoldname;
					if (zstrtemp.indexOf('-base') > -1) {
						zstrtemp = zstrtemp.replace("-base","-mainimage");
					} else {
						zstrtemp += "-mainimage";
					}
					if (zcheck) {
						WTW.disposeClean(zstrtemp, false);
						WTW.disposeClean(zstrtemp.replace("-mainimage","-hoverimage"), false);
						WTW.disposeClean(zstrtemp.replace("-mainimage","-clickimage"), false);
					}
				}
			} catch (ex) {}
			var zmold = WTW.getMeshOrNodeByID(zmoldname);
			/* confirm mold is in the scene */
			if (zmold != null) {
				try {
					if (zmoldname.indexOf('babylonfile') > -1 || zmoldname.indexOf('myavatar') > -1 || zmoldname.indexOf('person') > -1) {
						/* dispose of child objects from imported meshes */
						var zchildmeshes = zmold.getChildren();
						if (zchildmeshes != null) {
							for (var i=0; i < zchildmeshes.length; i++) {
								if (zchildmeshes[i] != null) {
									zchildmeshes[i].dispose();
								}
							}
						}
					}
				} catch(ex) {}
				try {
					/* dispose of any action managers (animations) */
					if (zmold.actionManager != null) {
						zmold.actionManager.dispose();
						zmold.actionManager = null;
					}
				} catch(ex) {}
				try {
					/* dispose of texture materials */
					if (zmold.material.diffuseTexture != null) {
						zmold.material.diffuseTexture.dispose();
						zmold.material.diffuseTexture = null;
					}
				} catch(ex) {}
				try {
					/* dispose of any remaining materials */
					if (zmold.material != null) {
						zmold.material.dispose();
						zmold.material = null;
					}
				} catch(ex) {}
				/* dispose of mold */
				zmold.dispose();
				zmold = null;
				if (zcheck) {
					/* dispose of action zone components (axle, pole, hinge, bases) */
					if (zmoldname.indexOf("actionzone") > -1) {
						WTW.disposeClean(zmoldname.replace("actionzone","actionzoneaxle"),false);
						WTW.disposeClean(zmoldname.replace("actionzone","actionzoneaxlepole"),false);
						WTW.disposeClean(zmoldname.replace("actionzone","actionzoneaxlebase"),false);
						WTW.disposeClean(zmoldname.replace("actionzone","actionzoneaxlebase2"),false);
					}
				}
				/* dispose of any dynamic meshes (changes subdivisions as get closer) */
				var zmoldfar = WTW.getMeshOrNodeByID(zmoldname + "-far");
				if (zmoldfar != null) {
					WTW.disposeClean(zmoldname + "-far");
				}
			}
			/* added support to dispose of Transform Nodes */
			var znode = WTW.getMeshOrNodeByID(zmoldname);
			if (znode != null) {
				znode.dispose();
			}
			if (zmoldname.indexOf('babylonfile') > -1 || zmoldname.indexOf('myavatar') > -1 || zmoldname.indexOf('person') > -1) {
				for (var i = 0; i < scene.meshes.length;i++) {
					/* check for child parts of the 3D Model that are still in the 3D Scene and delete them */
					if (scene.meshes[i].name.indexOf(zmoldname) > -1) {
						scene.meshes[i].dispose();
					}
				}
			}
			scene.blockfreeActiveMeshesAndRenderingGroups = false;
		}
	} catch (ex) {
		WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-disposeClean=" + ex.message);
		scene.blockfreeActiveMeshesAndRenderingGroups = false;
	}
}

WTWJS.prototype.openLocalLogin = function(zmenuname, zwidth, zheigth) {
	try {
		window.parent.postMessage({
			'func': 'WTW.openLocalLogin',
			'message': zmenuname,
			'parameters':Array(zmenuname)
		}, "*");
		window.parent.postMessage({
			'func': 'WTW.resizeIFrame',
			'message': 'Size Frame',
			'parameters':Array(zwidth,zheigth)
		}, "*");
	} catch (ex) {
		WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-openLocalLogin=" + ex.message);
	}
}

WTWJS.prototype.onMessage = function (e) {
	try {
		e = e || window.event;
		zmessage = e.data.message;
		if (zmessage != '') {
//WTW.log(zmessage.replace("<","&lt;").replace(">","&gt;"));
		}
	} catch (ex) {
		WTW.log("plugins-wtw-avatars-scripts-wtwavatars_common.js-onMessage=" + ex.message);
	}
}

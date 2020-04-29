function WTWJS() {
	this.ver = "1.0.0";
	this.avatars = [];
	this.avatarParts = [];
	this.avatarAnimations = [];
	this.myAvatar = null;
	this.mouseOver = null;
	this.mouseOut = null;
	this.sun = null;
	this.sunlight = null;
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
		WTW.log("wtw-avatars-scripts-wtwavatars_common.js-getJSON=" + ex.message);
	}
}

WTWJS.prototype.postJSON = function(zurl, zrequest, zcallback) {
	try {
		var form1 = document.createElement('form');
		var Httpreq = new XMLHttpRequest();
		var zformdata = new FormData(form1);
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
		WTW.log("wtw-avatars-scripts-wtwavatars_common.js-postJSON=" + ex.message);
	}
}

WTWJS.prototype.setCookie = function(name,value,days) {
	try {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			var expires = "; expires=" + date.toGMTString();
		}
		if (wtw_protocol == "https://") {
			document.cookie = name + "=" + value + expires + "; domain=" + wtw_domainname + ";path=/;secure";
		} else {
			document.cookie = name + "non=" + value + expires + "; path=/";
		}
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-setCookie=" +ex.message);
    }
}

WTWJS.prototype.getCookie = function(name) {
	var value = "";
	try {
		if (wtw_protocol != "https://") {
			name += "non=";
		}
		var cookies = document.cookie.split(';');
		for(var i=0;i < cookies.length;i++) {
			var cook = cookies[i];
			while (cook.charAt(0)==' ') {
				cook = cook.substring(1,cook.length);
			}
			if (cook.indexOf(name) == 0) {
				value = cook.substring(name.length,cook.length);
			}
		}
		if (value == "") {
			value = null;
		} else if (value.indexOf("non=") > -1) {
			value = value.replace("non=","");
		} else if (value.indexOf("=") > -1) {
			value = value.replace("=","");
		}
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-getCookie=" +ex.message);
    }
	return value;
}

WTWJS.prototype.deleteCookie = function(name) {
    WTW.setCookie(name,"",-1);
}

WTWJS.prototype.getQuerystring = function(key, default_) {
    var squery = "";
    try {
        if (default_ == null) default_ = "";
        key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
        var qs = regex.exec(window.location.href);
        if (qs == null) {
            squery = default_;
        } else {
            squery = qs[1];
        }
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getQuerystring=" + ex.message);
    }
    return squery;
}

WTWJS.prototype.getRandomString = function(length) {
    var result = '';
	try {
		var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
		for (var i = length; i > 0; --i) {
			result += chars[Math.floor(Math.random() * chars.length)];
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_install.js-randomString=" + ex.message);
	}
    return result;
}

WTWJS.prototype.isNumeric = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

WTWJS.prototype.getRadians = function(degrees) {
	var radians = 0;
	try {
		if (WTW.isNumeric(degrees)) {
			radians = degrees * Math.PI / 180;
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getRadians=" + ex.message);
    }
	return radians;
}

WTWJS.prototype.getDegrees = function(radians) {
	var degrees = 0;
	try {
		if (WTW.isNumeric(radians)) {
			degrees = WTW.cleanDegrees(radians * 180 / Math.PI);
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-getDegrees=" + ex.message);
    }
	return degrees;
}

WTWJS.prototype.registerMouseOver = function(mold) {
	try {
		if (mold != null) {
			mold.actionManager = new BABYLON.ActionManager(scene);	
			mold.actionManager.registerAction(WTW.mouseOver);
			mold.actionManager.registerAction(WTW.mouseOut);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-registerMouseOver=" + ex.message);
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
		WTW.log("core-scripts-prime-wtw_input.js-mouseOverMold=" + ex.message);
	}
}

WTWJS.prototype.mouseOutMold = function(mold) {
	try {
		document.body.style.cursor = "default";
		WTW.lastID = WTW.currentID;
		WTW.currentID = "";
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_input.js-mouseOutMold=" + ex.message);
	}
}

WTWJS.prototype.showIDs = function(zdisplayname) {
	try {
		if (zdisplayname == "") {
			zdisplayname = 'Anonymous';
		}
		var namemold = scene.getMeshByID("myavatar" + dGet('wtw_tinstanceid').value + '-nameplate');
		if (namemold != null) {
			namemold.dispose();
		}
		var molddef = WTW.newMold();
		molddef.webtext.webtext = zdisplayname;
		molddef.webtext.webstyle = JSON.stringify({
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
		namemold = WTW.addMold3DText("myavatar" + dGet('wtw_tinstanceid').value + '-nameplate', molddef, 1, 1, 1);
		namemold.parent = WTW.myAvatar;
		namemold.position.y = 16;
		namemold.billboardMode = 2;
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_common.js-showIDs=" +ex.message);
    }
}

WTWJS.prototype.newMold = function() {
	var molddef = '';
	var path1 = [];
	var path2 = [];
	var webimages = [];
	try {
		webimages[0] = WTW.newWebImage();
		molddef = {
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
			'object':
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
				'webimages':webimages
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
				'path1':path1,
				'path2':path2
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
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newmold=" + ex.message);
	}
	return molddef;
}

WTWJS.prototype.newWebImage = function() {
	var webimage = '';
	try {
		var webimage = {
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
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newWebImage=" + ex.message);
	}
	return webimage;
}

WTWJS.prototype.addMold3DText = function(moldname, molddef, lenx, leny, lenz) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx, leny, lenz);
		var transparentmat = new BABYLON.StandardMaterial("mat" + moldname, scene);
		transparentmat.alpha = 0;
		mold.material = transparentmat;
		var webtext = molddef.webtext.webtext;
		var webstyle = molddef.webtext.webstyle;
		if (webtext == null || webtext == '') {
			webtext = '-';
		}
		if (webstyle == null || webstyle == '') {
			webstyle = {
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
			webstyle = JSON.parse(webstyle);
		}
		Writer = BABYLON.MeshWriter(scene, {scale:1});
        var displaytext  = new Writer(webtext, webstyle);
		var mytext = displaytext.getMesh();
		mytext.rotation.x = WTW.getRadians(-90);
		mytext.name = moldname + "-text";
		mytext.parent = mold;
		mytext.isPickable = true;
		WTW.registerMouseOver(mytext);
		mold.isPickable = true;
		WTW.registerMouseOver(mold);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-addMold3DText=" + ex.message);
	}
	return mold;
}

WTWJS.prototype.hilightMoldFast = function(moldname, scolor) {
	try {
		var mold = scene.getMeshByID(moldname);
		if (mold != null) {
			var color = BABYLON.Color3.Yellow();
			switch (scolor.toLowerCase()) {
				case "green":
					color = BABYLON.Color3.Green();
					break;
				case "red":
					color = BABYLON.Color3.Red();
					break;
				case "blue":
					color = BABYLON.Color3.Blue();
					break;
				case "yellow":
					color = BABYLON.Color3.Yellow();
					break;
			}
			WTW.unhilightMold(moldname);
			if (WTW.highlightLayer == null) {
				WTW.highlightLayer = new BABYLON.HighlightLayer("highlightlayer", scene);
			}
			WTW.highlightLayer.outerGlow = true;
			WTW.highlightLayer.innerGlow = true;
			WTW.highlightLayer.addMesh(mold, color);
			window.setTimeout(function(){
				WTW.highlightLayer.outerGlow = false;
				WTW.highlightLayer.innerGlow = false;
				WTW.highlightLayer.removeMesh(mold);
			},500);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-hilightMoldFast=" + ex.message);
	}
}

WTWJS.prototype.hilightMold = function(moldname, scolor) {
	try {
		var mold = scene.getMeshByID(moldname);
		if (mold != null) {
			var color = BABYLON.Color3.Yellow();
			switch (scolor.toLowerCase()) {
				case "green":
					color = BABYLON.Color3.Green();
					break;
				case "red":
					color = BABYLON.Color3.Red();
					break;
				case "blue":
					color = BABYLON.Color3.Blue();
					break;
				case "yellow":
					color = BABYLON.Color3.Yellow();
					break;
			}
			WTW.unhilightMold(moldname);
			if (WTW.highlightLayer == null) {
				WTW.highlightLayer = new BABYLON.HighlightLayer("highlightlayer", scene);
			}
			WTW.highlightLayer.outerGlow = true;
			//WTW.highlightLayer.innerGlow = true;
			WTW.highlightLayer.addMesh(mold, color);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-hilightMold=" + ex.message);
	}
}

WTWJS.prototype.unhilightMold = function(moldname) {
	try {
		if (WTW.highlightLayer != null) {
			var mold = scene.getMeshByID(moldname);
			if (mold != null) {
				WTW.highlightLayer.removeMesh(mold);
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-unhilightMold=" + ex.message);
	}
}

WTWJS.prototype.disposeClean = function(moldname, check) {
	try {
		/* extension of the babylon dispose function to catch various child and sub elements */
		if (moldname != "") {
			scene.blockfreeActiveMeshesAndRenderingGroups = true;
			if (typeof check === "undefined") {
				check = true;
			}
            var namepart = moldname.split('-');
			/* dispose mold (mesh) from shadow and reflection arrays */
			WTW.disposeShadowFromMold(moldname);
			WTW.disposeReflectionFromMold(moldname);
			var mold = scene.getMeshByID(moldname);
			/* confirm mold is in the scene */
			if (mold != null) {
				try {
					/* plugin hook for custom code */
					WTW.pluginsDisposeClean(moldname);
				} catch (ex) {}
				try {
					if (moldname.indexOf("myavatar") > -1 || moldname.indexOf("selectavatar") > -1) {
						/* dispose of avatar parts / animations */
						WTW.disposeAnimations(moldname);
					} else if (namepart[5] == 'video') {
						/* stop and clear the video before it is deleted */
						var strtemp = moldname;
						strtemp = strtemp.replace("-base","-mainvideo");
						var videomold = scene.getMeshByID(strtemp);
						if (videomold != null){
							if (videomold.material.diffuseTexture.video != undefined) {
								videomold.material.diffuseTexture.video.pause();
								videomold.material.diffuseTexture.video.src = "";
							}
							if (videomold.material.diffuseTexture.video != null) {
								videomold.material.diffuseTexture.video = null;
							}
					   }
					} else if (namepart[5].indexOf('water') > -1) {
						/* remove mold from reflection and refraction arrays */
						var strtemp = moldname;
						if (strtemp.indexOf('-base') > -1) {
							strtemp = strtemp.replace("-base","");
						}
						var watermat = scene.getMaterialByID(strtemp + "-watermat");
						if (watermat != null) {
							if (watermat.reflectionTexture.renderList != null) {
								if (watermat.reflectionTexture.renderList.length > 0) {
									watermat.reflectionTexture.renderList.splice(0, watermat.reflectionTexture.renderList.length);
								}
							}
							if (watermat.refractionTexture.renderList != null) {
								if (watermat.refractionTexture.renderList.length > 0) {
									watermat.refractionTexture.renderList.splice(0, watermat.refractionTexture.renderList.length);
								}
							}
						}
						try {
							if (watermat.reflectionTexture != null) {
								watermat.reflectionTexture.dispose();
								watermat.reflectionTexture = null;
							}
						} catch(ex) {}
						try {
							if (watermat.refractionTexture != null) {
								watermat.refractionTexture.dispose();
								watermat.refractionTexture = null;
							}
							watermat.dispose();
						} catch(ex) {}
						if (check) {
							WTW.disposeClean(strtemp + "-water", false);
						}
					} else if (namepart[5].indexOf('image') > -1) {
						/* dispose of hover over and click image mold layers */
						var strtemp = moldname;
						if (strtemp.indexOf('-base') > -1) {
							strtemp = strtemp.replace("-base","-mainimage");
						} else {
							strtemp += "-mainimage";
						}
						if (check) {
							WTW.disposeClean(strtemp, false);
							WTW.disposeClean(strtemp.replace("-mainimage","-hoverimage"), false);
							WTW.disposeClean(strtemp.replace("-mainimage","-clickimage"), false);
						}
					} else if (namepart[5].indexOf('babylonfile') > -1 || namepart[0] == 'myavatar') {
						/* dispose of child objects from imported meshes */
						var childmeshes = mold.getChildren();
						if (childmeshes != null) {
							for (var i=0; i < childmeshes.length; i++) {
								if (childmeshes[i] != null) {
									childmeshes[i].dispose();
								}
							}
						}
					}
				} catch (ex) {}
				try {
					/* dispose of any action managers (animations) */
					if (mold.actionManager != null) {
						mold.actionManager.dispose();
						mold.actionManager = null;
					}
				} catch(ex) {}
				try {
					/* dispose of texture materials */
					if (mold.material.diffuseTexture != null) {
						mold.material.diffuseTexture.dispose();
						mold.material.diffuseTexture = null;
					}
				} catch(ex) {}
				try {
					/* dispose of any remaining materials */
					if (mold.material != null) {
						mold.material.dispose();
						mold.material = null;
					}
				} catch(ex) {}
				/* dispose of mold */
				mold.dispose();
				mold = null;
				if (check) {
					/* dispose of action zone components (axle, pole, hinge, bases) */
					WTW.disposeMoldEvent(moldname);
					if (moldname.indexOf("actionzone") > -1) {
						WTW.disposeClean(moldname.replace("actionzone","actionzoneaxle"),false);
						WTW.disposeClean(moldname.replace("actionzone","actionzoneaxlepole"),false);
						WTW.disposeClean(moldname.replace("actionzone","actionzoneaxlebase"),false);
						WTW.disposeClean(moldname.replace("actionzone","actionzoneaxlebase2"),false);
					}
				}
				/* dispose of any dynamic meshes (changes subdivisions as get closer) */
				var moldfar = scene.getMeshByID(moldname + "-far");
				if (moldfar != null) {
					WTW.disposeClean(moldname + "-far");
				}
			}
			try {
				var moldgroup = Number(namepart[0]);
				var moldind = Number(namepart[1]);
				WTW.clearSoundAndLights(moldgroup, moldind);
			} catch(ex) {}
			scene.blockfreeActiveMeshesAndRenderingGroups = false;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_common.js-disposeClean=" + ex.message);
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
		WTW.log("core-scripts-prime-wtw_login.js-openLocalLogin=" + ex.message);
	}
}

WTWJS.prototype.onMessage = function (e) {
	try {
		e = e || window.event;
		zmessage = e.data.message;
		if (zmessage != '') {
WTW.log(zmessage.replace("<","&lt;").replace(">","&gt;"));
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_login.js-onMessage=" + ex.message);
	}
}

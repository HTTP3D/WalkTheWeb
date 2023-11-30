/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions provide many of the common functions for browse and admin modes */
/* utility functions that can be used from any WalkTheWeb site and 3D Plugins */
/* includes: 	common functions, shortcuts, logging, and getting information */
/*				fetch and post data or web pages and iframe handling */
/*				load or unload script files */
/*				get text, text cleanup, encode, decode, and html string scrubbers, querystrings and cookies */
/*				text, number, date, urls, emails validation and checks */
/*				form handling and simple show / hide html element - utilities */
/*				get position, rotation, or distance to and from various reference points */
/*				get or set parent objects */
/*				get or set web name (3D Community, 3D Building, or 3D Thing) */
/*				arrays: check, find index, and remove from arrays */
/*				physics engine related common functions */
/*				get user capabilities (gpu, browser, etc...) */

function dGet(zelementname) {
	/* function to simplify document.getElementById calls (outside the WTW class) */
	return document.getElementById(zelementname);
}

WTWJS.prototype.dGet = function(zelementname) {
	/* function to simplify document.getElementById calls (inside the WTW class - WTW.dGet() ) */
	return document.getElementById(zelementname);
}

WTWJS.prototype.log = function(ztext, zcolor) {
	/* WTW.log() combines console.log and setting the color for the log */
	if (wtw_devmode == '1') {
		if (zcolor == undefined) {
			zcolor = 'black';
		}
		if (zcolor.toLowerCase() == 'black') {
			console.log('\r\n' + ztext);
		} else {
			console.log('\r\n%c' + ztext, 'color:' + zcolor + ';font-weight:bold;');
		}
	}
}

WTWJS.prototype.setWindowSize = function() {
	/* set window size and reset proportional elements as needed */
    try {
        if (typeof (window.innerWidth) == 'number') { /* Non-IE */
            WTW.sizeX = window.innerWidth;
            WTW.sizeY = window.innerHeight;
        } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) { /* IE 6+ */
            WTW.sizeX = document.documentElement.clientWidth;
            WTW.sizeY = document.documentElement.clientHeight;
        } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) { /* older */
            WTW.sizeX = document.body.clientWidth;
            WTW.sizeY = document.body.clientHeight;
        }
		if (WTW.adminView == 1) {
			if (dGet('wtw_adminmenu') != null) {
				dGet('wtw_adminmenu').style.height = (WTW.sizeY-33) + 'px';
				dGet('wtw_adminmenu3d').style.maxHeight = (WTW.sizeY - 34) + 'px';
				dGet('wtw_adminmenuscroll').style.height = (WTW.sizeY - 125) + 'px';
				var zfullpages = document.getElementsByClassName('wtw-fullpage');
				for (var i=0;i<zfullpages.length;i++) {
					if (zfullpages[i] != null) {
						if (zfullpages[i].id != undefined) {
							dGet(zfullpages[i].id).style.height = (WTW.sizeY - 95) + 'px';
						}
					}
				}
				dGet('wtw_fullpageform').style.width = (WTW.sizeX - 5 - Number(dGet('wtw_adminmenubutton').style.left.replace('px',''))).toString() + 'px';
			}
		}
		if (dGet('wtw_ibrowsediv') != null) {
			if (dGet('wtw_ibrowsediv').style.display != 'none') {
				var zwidth = .9;
				var zheight = .9;
				if (WTW.isNumeric(dGet('wtw_ibrowsewidth').value)) {
					zwidth = dGet('wtw_ibrowsewidth').value;
				}
				if (WTW.isNumeric(dGet('wtw_ibrowseheight').value)) {
					zheight = dGet('wtw_ibrowseheight').value;
				}
				if (WTW.isNumeric(zwidth)) {
					dGet('wtw_ibrowsediv').style.width = Math.round(WTW.sizeX * Number(zwidth)) + 'px';
					dGet('wtw_ibrowsediv').style.left = Math.round((WTW.sizeX - (WTW.sizeX * Number(zwidth))) / 2) + 'px';
				}
				if (WTW.isNumeric(zheight)) {
					dGet('wtw_ibrowsediv').style.height = Math.round(WTW.sizeY * Number(zheight)) + 'px';
					dGet('wtw_ibrowsediv').style.top = Math.round((WTW.sizeY - (WTW.sizeY * Number(zheight))) / 2) + 'px';
				}
			}
		}
		if (engine != undefined) {
			engine.resize();
		}
    } catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-setWindowSize=' + ex.message);
    }
}

WTWJS.prototype.checkFocus = function() {
	/* globally checks focus for all document events */
	try {
		if (WTW.adminView == 1) {
			document.activeElement.focus();
			if (document.activeElement.id != 'wtw_renderCanvas' && WTW.guiAdminColors != null) { 
				WTW.closeColorSelector(true); 
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-checkFocus=' + ex.message);
    }
}

WTWJS.prototype.getScrollY = function() {
	/* returns the amount of scroll of a window scrollbar */
	var zy = 0;
	try {
		var zdoc = document, w = window;
		var zx = 0; 
		var zdocument;
		if (typeof w.pageYOffset === 'number') {
			zx = w.pageXOffset;
			zy = w.pageYOffset;
		} else {
			zdocument = (zdoc.compatMode && zdoc.compatMode === 'CSS1Compat') ?
					zdoc.documentElement : zdoc.body;
			zx = zdocument.scrollLeft;
			zy = zdocument.scrollTop;
		}
    } catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getScrollY=' + ex.message);
    }
    return zy;
}

WTWJS.prototype.getMoldnameParts = function(zmoldname) {
	/* get mold name parts - the name reveals a lot of information about the mold and this breaks down the parts that you may use from it */
	var zserverid = 'local';
	var zmoldind = -1;
	var zmoldid = '';
	var zcgind = -1;
	var zcgid = '';
	var zcommunityid = '';
	var zbuildingid = '';
	var zthingid = '';
	var zwebid = '';
	var zwebtype = 'building';
	var zwebset = 'buildingmolds';
	var zmolds = [];
	var znamepart = [];
	var zavatarpart = '';
	var zshape = '';
	var zinstanceid = '';
	var zloadactionzoneid = '';
	var zunloadactionzoneid = '';
	var zactionzoneid = '';
	var zcoveringname = '';
	var zmoldnamebase = '';
	var zparentname = '';
	try {
		if (zmoldname == undefined) {
			zmoldname = dGet('wtw_tmoldname').value;
		}
		if (zmoldname.indexOf('-') > -1) {
			znamepart = zmoldname.split('-');
			if (znamepart[0] != null) {
				zserverid = znamepart[0];
				zwebset = znamepart[1];
				if (znamepart[1].indexOf('molds') > -1) {
					zwebtype = znamepart[1].replace('molds','');
					switch (zwebtype) {
						case 'community':
							zmolds = WTW.communitiesMolds;
							break;
						case 'building':
							zmolds = WTW.buildingMolds;
							break;
						case 'thing':
							zmolds = WTW.thingMolds;
							break;
					}
				} else if (znamepart[1].indexOf('actionzone') > -1) {
					zwebtype = 'actionzone';
					zmolds = WTW.actionZones;
				} else if (znamepart[1].indexOf('connectinggrid') > -1) {
					zwebtype = 'connectinggrid';
					zmolds = WTW.connectingGrids;
				} else if (znamepart[1].indexOf('myavatar') > -1 || znamepart[1].indexOf('person') > -1) {
					zwebtype = 'avatars';
				}
			}
			if (znamepart[2] != null) {
				if (znamepart[1].indexOf('myavatar') > -1 || znamepart[1].indexOf('person') > -1) {
					zinstanceid = znamepart[2];
				} else {
					if (WTW.isNumeric(znamepart[2])) {
						zmoldind = Number(znamepart[2]);
					}
				}
			}
			if (znamepart[3] != null) {
				if (znamepart[1].indexOf('myavatar') > -1 || znamepart[1].indexOf('person') > -1) {
					zavatarpart = znamepart[3];
				} else {
					zmoldid = znamepart[3];
				}
			}
			if (znamepart[4] != null) {
				if (WTW.isNumeric(znamepart[4])) {
					zcgind = Number(znamepart[4]);
				}
			}
			if (znamepart[5] != null) {
				zcgid = znamepart[5];
			}
			if (znamepart[6] != null) {
				zshape = znamepart[6];
			}
			zmoldnamebase = znamepart[0] + '-' + znamepart[1] + '-' + znamepart[2] + '-' + znamepart[3] + '-' + znamepart[4] + '-';
			if (zmolds[zmoldind] != null) {
				if (zmolds[zmoldind].communityinfo.communityid != undefined) {
					zcommunityid = zmolds[zmoldind].communityinfo.communityid;
					if (zcommunityid != '') {
						zwebid = zcommunityid;
					}
				}
				if (zmolds[zmoldind].buildinginfo.buildingid != undefined) {
					zbuildingid = zmolds[zmoldind].buildinginfo.buildingid;
					if (zbuildingid != '') {
						zwebid = zbuildingid;
					}
				}
				if (zmolds[zmoldind].thinginfo.thingid != undefined) {
					zthingid = zmolds[zmoldind].thinginfo.thingid;
					if (zthingid != '') {
						zwebid = zthingid;
					}
				}

				zloadactionzoneid = zmolds[zmoldind].loadactionzoneid;
				zunloadactionzoneid = zmolds[zmoldind].unloadactionzoneid;
				zactionzoneid = zmolds[zmoldind].actionzoneid;
				zcoveringname = zmolds[zmoldind].covering;
			}
		}
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
			var zparentmold = zmold.parent;
			if (zparentmold != null) {
				zparentname = zparentmold.name;
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getMoldnameParts=' + ex.message);
	}  
	return {
		'moldname':zmoldname,
		'moldind':zmoldind,
		'moldid':zmoldid,
		'cgind':zcgind,
		'cgid':zcgid,
		'serverid':zserverid,
		'communityid':zcommunityid,
		'buildingid':zbuildingid,
		'thingid':zthingid,
		'instanceid':zinstanceid,
		'webid':zwebid,
		'webtype':zwebtype,
		'webset':zwebset,
		'molds':zmolds,
		'shape':zshape,
		'avatarpart':zavatarpart,
		'loadactionzoneid':zloadactionzoneid,
		'unloadactionzoneid':zunloadactionzoneid,
		'actionzoneid':zactionzoneid,
		'coveringname':zcoveringname,
		'namepart':znamepart,
		'moldnamebase':zmoldnamebase,
		'parentname':zparentname
	}
}

WTWJS.prototype.rgbToHex = function(zred, zgreen, zblue) {
	/* converts red, green, blue to hex */
	var zhex = '';
	try {
		if (WTW.isNumeric(zred) && WTW.isNumeric(zgreen) && WTW.isNumeric(zblue)) {
			var zcolor = new BABYLON.Color3(zred,zgreen,zblue);
			zhex = zcolor.toHexString();
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-rgbToHex=' + ex.message);
	}
	return zhex;
}

WTWJS.prototype.hexToRGB = function(zhex) {
	/* converts hex to red, green, blue, and a babylon color3 */
	/* note uses babylon colors decimal between 0 and 1 */
	var zred = 0;
	var zgreen = 0;
	var zblue = 0;
	var zcolor3 = new BABYLON.Color3(zred, zgreen, zblue);
	try {
		var zresult = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(zhex);
		zred = parseInt(result[1], 16) / 255;
		zgreen = parseInt(result[2], 16) / 255;
		zblue = parseInt(result[3], 16) / 255;
		zcolor3 = new BABYLON.Color3(zred, zgreen, zblue);
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-hexToRGB=' + ex.message);
	}
	return {
		'r':zred,
		'g':zgreen,
		'b':zblue,
		'color3':zcolor3
	};
}

WTWJS.prototype.isHexColor = function(zhex) {
	/* validates Hex Color Code */
	var zisvalid = false;
	try {
		if (/^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(zhex)) {
			zisvalid = true;
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-isHexColor=' + ex.message);
	}
	return zisvalid;
}

WTWJS.prototype.clickVRStartButton = function() {
	/* To activate VR, this clicks the onscreen start button */
	try {
		var zelements = document.getElementsByClassName('babylonVRicon');
		for (var i=0;i<zelements.length;i++) {
			if (zelements[i] != null) {
				zelements[i].click();
			}
		}
		var zbackgroundhelper = scene.getMeshByID('BackgroundHelper');
		var zbackgroundplane = scene.getMeshByID('BackgroundPlane');
		var zbackgroundskybox = scene.getMeshByID('BackgroundSkybox');
		if (zbackgroundhelper != null) {
			zbackgroundhelper.visibility = false;
		}
		if (zbackgroundplane != null) {
			zbackgroundplane.visibility = false;
		}
		if (zbackgroundskybox != null) {
			zbackgroundskybox.visibility = false;
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-clickVRStartButton=' + ex.message);
	}
}

WTWJS.prototype.openColorSelector = function(zobj, ztitle) {
	/* when form uses a color, the color wheel is opened and set to the current color settings */
	try {
		if (WTW.guiAdminColors != null) {
			WTW.guiAdminColors.dispose();
			WTW.guiAdminColors = null;
		}
		WTW.guiAdminColors = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
		var zpanel = new BABYLON.GUI.StackPanel();
		zpanel.width = '300px';
		zpanel.isVertical = true;
		zpanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
		zpanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
		WTW.guiAdminColors.addControl(zpanel);

		var zcolortitle = new BABYLON.GUI.TextBlock();
		zcolortitle.text = ztitle;
		zcolortitle.color = '#FFFFFF';
		zcolortitle.fontSize = 20;
		zcolortitle.height = '50px';
		zpanel.addControl(zcolortitle);     
	
		var zcolorpicker = new BABYLON.GUI.ColorPicker();
		var colorvalue = new BABYLON.Color3.FromHexString(zobj.value);
		zcolorpicker.height = '250px';
		zcolorpicker.width = '250px';
		zcolorpicker.value = colorvalue;
		zcolorpicker.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
		zcolorpicker.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
		zcolorpicker.onValueChangedObservable.add(function(value) {
			if (value != null) {
				var zcolor = new BABYLON.Color3(value.r, value.g, value.b);
				zobj.value = zcolor.toHexString().toLowerCase();
				if (zobj.id.indexOf('sky') > -1) {
					WTW.setSkyBox();
				} else if (zobj.id.indexOf('scene') > -1 || zobj.id.indexOf('sun') > -1 || zobj.id.indexOf('backlight') > -1) {
					WTW.setCommunityScene();
				}
			}
		});
		zpanel.addControl(zcolorpicker); 
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-openColorSelector=' + ex.message);
	}
}

WTWJS.prototype.closeColorSelector = function(zcloseovercanvas) {
	/* close and dispose color selector after use */
	try {
		if (zcloseovercanvas == undefined) {
			zcloseovercanvas = true;
		}
		if ((zcloseovercanvas == false && WTW.guiAdminColors != null && WTW.canvasFocus == 0) || (zcloseovercanvas && WTW.guiAdminColors != null)) {
			WTW.guiAdminColors.dispose();
			WTW.guiAdminColors = null;
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-closeColorSelector=' + ex.message);
	}
}

WTWJS.prototype.setTextColor = function(zbgcolor, zlightcolor, zdarkcolor) {
	/* when the color is selected, the form updates the color to the background */
	/* this also sets the text color to an opposite color than the background (default is black or white) */
	var zcolor = 'black';
	try {
		if (zlightcolor == undefined) {
			zlightcolor = '#ffffff';
		}
		if (zdarkcolor == undefined) {
			zdarkcolor = '#000000';
		}
		var zcolorstring = (zbgcolor.charAt(0) === '#') ? zbgcolor.substring(1, 7) : zbgcolor;
		var zred = parseInt(zcolorstring.substring(0, 2), 16); // hexToR
		var zgreen = parseInt(zcolorstring.substring(2, 4), 16); // hexToG
		var zblue = parseInt(zcolorstring.substring(4, 6), 16); // hexToB
		var zuicolors = [zred / 255, zgreen / 255, zblue / 255];
		var zcols = zuicolors.map((zcol) => {
			if (zcol <= 0.03928) {
				return zcol / 12.92;
			}
			return Math.pow((zcol + 0.055) / 1.055, 2.4);
		});
		var zcompare = (0.2126 * zcols[0]) + (0.7152 * zcols[1]) + (0.0722 * zcols[2]);
		zcolor = (zcompare > 0.179) ? zdarkcolor : zlightcolor;
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-setTextColor=' + ex.message);
	}
	return zcolor;
}


/* fetch and post data or web pages */

WTWJS.prototype.getJSON = function(zurl, zcallback, zaction, zrequest) {
	/* performs a JSON call for data */
	try {
		if (zaction == undefined) {
			zaction = 'GET';
		}
		if (zrequest == undefined) {
			zrequest = null;
		}
		var zhttpreq = new XMLHttpRequest();
		zhttpreq.overrideMimeType('application/json');
		zhttpreq.open(zaction, zurl, true);
		zhttpreq.onreadystatechange = function () {
			if (zhttpreq.readyState == 4 && zhttpreq.status == '200') {
				zcallback(zhttpreq.responseText);
			}
		};
		zhttpreq.send(zrequest);  
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getJSON=' + ex.message);
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
			var zhttpreq = new XMLHttpRequest();
			zhttpreq.overrideMimeType('application/json');
			zhttpreq.open(zaction, zurl, true);
			zhttpreq.onreadystatechange = function () {
				if (zhttpreq.readyState == 4 && zhttpreq.status == '200') {
					zcallback(zhttpreq.responseText);
				}
			};
			zhttpreq.send(zrequest);
		});
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getAsyncJSON=' + ex.message);
	}
}

WTWJS.prototype.getFileList = function(zfolderpath, zcallback) {
	/* retrieve a list of files and folders in a select folder path */
	try {
		var zrequest = {
			'objectfolder': zfolderpath,
			'function':'getuploadedfilefilesdetails'
		};
		WTW.postAsyncJSON('/core/handlers/uploadedfiles.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				zcallback(zresponse);
			}
		);		
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getFileList=' + ex.message);
	}
}

WTWJS.prototype.postJSON = function(zurl, zrequest, zcallback) {
	/* performs a form POST based JSON call for data */
	try {
		var zform1 = document.createElement('form');
		var zhttpreq = new XMLHttpRequest();
		var zformdata = new FormData(zform1);
		for(var zkey in zrequest) {
			zformdata.append(zkey, zrequest[zkey]);
		}
		zformdata.append('action', 'POST');
		zhttpreq.open('POST', zurl);
		zhttpreq.onreadystatechange = function () {
			if (zhttpreq.readyState == 4 && zhttpreq.status == '200') {
				zcallback(zhttpreq.responseText);
			}
		};
		zhttpreq.send(zformdata);  
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-postJSON=' + ex.message);
	}
}

WTWJS.prototype.postAsyncJSON = function(zurl, zrequest, zcallback) {
	/* performs a form POST based JSON call for data in async mode  */
	try {
		return new Promise(function () {
			var zform1 = document.createElement('form');
			var zhttpreq = new XMLHttpRequest();
			var zformdata = new FormData(zform1);
			for(var zkey in zrequest) {
				zformdata.append(zkey, zrequest[zkey]);
			}
			zformdata.append('action', 'POST');
			zhttpreq.open('POST', zurl);
//			zhttpreq.onprogress = WTW.postAsyncJSONProgress;			
			zhttpreq.onreadystatechange = function () {
				if (zhttpreq.readyState == 4 && zhttpreq.status == '200') {
					zcallback(zhttpreq.responseText);
				}
			};
			zhttpreq.send(zformdata);
		});
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-postAsyncJSON=' + ex.message);
	}
}

WTWJS.prototype.postAsyncJSONProgress = function(zevent) {
	/* provides progress from a form POST based JSON call for data in async mode  */
	try {
		if (zevent.lengthComputable) {
			var percentComplete = (zevent.loaded / zevent.total) * 100;  
//WTW.log("percentComplete=" + percentComplete);
		} 
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-postAsyncJSONProgress=' + ex.message);
	}
}

WTWJS.prototype.downloadFile = function(zurl, zfilename) {
	/* make a link download a file instead of open it  */
	try {
		if (!window.ActiveXObject) {
			/* for non-IE */
			var zsave = document.createElement('a');
			zsave.href = zurl;
			zsave.target = '_blank';
			zsave.download = zfilename;
			if (navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search('Chrome') < 0) {
				document.location = save.href; 
			} else {
				var zevent = new MouseEvent('click', {
					'view': window,
					'bubbles': true,
					'cancelable': false
				});
				zsave.dispatchEvent(zevent);
				(window.URL || window.webkitURL).revokeObjectURL(zsave.href);
			}
		} else if ( !! window.ActiveXObject && document.execCommand) {
			/* for IE */
			var zwindow = window.open(zurl, '_blank');
			zwindow.document.close();
			zwindow.document.execCommand('SaveAs', true, zfilename || zurl)
			zwindow.close();
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-downloadFile=' + ex.message);
	}
}

WTWJS.prototype.getWebpage = function(zurl, zcallback) {
	/* retrieves a full webpage content */
	try {
		var Httpreq = new XMLHttpRequest();
		Httpreq.responseType = 'document';
		Httpreq.open('GET', zurl, true);
		Httpreq.onreadystatechange = function () {
			if (Httpreq.readyState == 4 && Httpreq.status == '200') {
				if (zcallback != null) {
					zcallback(Httpreq.responseText);
				}
			}
		};
		Httpreq.send(null);  
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getWebpage=' + ex.message);
	}
}

WTWJS.prototype.getAsycnWebpage = function(zurl, zcallback) {
	/* retrieves a full webpage content */
	try {
		return new Promise(function () {
			var Httpreq = new XMLHttpRequest();
			Httpreq.responseType = 'document';
			Httpreq.open('GET', zurl, true);
			Httpreq.onreadystatechange = function () {
				if (Httpreq.readyState == 4 && Httpreq.status == '200') {
					if (zcallback != null) {
						zcallback(Httpreq.responseText);
					}
				}
			};
			Httpreq.send(null);  
		});
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getAsycnWebpage=' + ex.message);
	}
}

WTWJS.prototype.openWebpage = function(zurl, ztarget) {
	/* open webpage - with target option */
	try {
		if (ztarget == undefined) {
			if (zurl.toLowerCase().indexOf('//' + wtw_domainname + '/') > -1) {
				ztarget = '';
			} else {
				ztarget = '_blank';
			}
		}
		if (ztarget == '') {
			window.parent.parent.window.location = zurl;
		} else {
			window.open(zurl,ztarget);
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-openWebpage=' + ex.message);
	}
}

WTWJS.prototype.openAsyncWebpage = function(zurl, ztarget) {
	/* open webpage - with target option */
	try {
		return new Promise(function () {
			if (ztarget == undefined) {
				if (zurl.toLowerCase().indexOf('//' + wtw_domainname + '/') > -1) {
					ztarget = '';
				} else {
					ztarget = '_blank';
				}
			}
			if (ztarget == '') {
				window.parent.parent.window.location = zurl;
			} else {
				window.open(zurl,ztarget);
			}
		});
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-openAsyncWebpage=' + ex.message);
	}
}

WTWJS.prototype.openIFrame = function(zurl, zwidth, zheight, ztitle) {
	/* open iframe page with frame window (includes title and close x), height and width (values should be between .1 and 1) */
	try {
		if (ztitle == undefined) {
			ztitle = '';
		}
		WTW.setWindowSize();
		if (typeof zwidth === 'undefined' || zwidth === null) {
			zwidth = .9; 
		}
		if (typeof zheight === 'undefined' || zheight === null) {
			zheight = .9; 
		}
		WTW.hide('wtw_ipagediv');
		WTW.show('wtw_ibrowseframe');
		var ziframe = dGet('wtw_ibrowseframe');
		if (ziframe.src != zurl) {
			ziframe.src = zurl;
		}
		dGet('wtw_ibrowsewidth').value = zwidth;
		dGet('wtw_ibrowseheight').value = zheight;
		dGet('wtw_ibrowsediv').style.width = Math.round(WTW.sizeX * zwidth) + 'px';
		dGet('wtw_ibrowsediv').style.height = Math.round(WTW.sizeY * zheight) + 'px';
		dGet('wtw_ibrowsediv').style.left = Math.round((WTW.sizeX * (1 - zwidth)) / 2) + 'px';
		dGet('wtw_ibrowsediv').style.top = Math.round((WTW.sizeY * (1 - zheight)) / 2) + 'px';
		dGet('wtw_ibrowsediv').style.display = 'inline-block';
		dGet('wtw_ibrowsediv').style.visibility = 'visible';
		dGet('wtw_ibrowsediv').style.zIndex = 3000;
		dGet('wtw_ibrowsediv').style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
		if (zurl == '/core/pages/help.php') {
			ziframe.onload = function() { WTW.setHelp();	};
			dGet('wtw_browsetitle').innerHTML = 'WalkTheWeb - Help';
		} else {
			dGet('wtw_browsetitle').innerHTML = ztitle;
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-openIFrame=' + ex.message);
		WTW.closeIFrame();
		WTW.openWebpage(zurl, '_blank');
	}
}

WTWJS.prototype.openAsyncIFrame = async function(zurl, zwidth, zheight, ztitle) {
	/* open iframe page with frame window (includes title and close x), height and width (values should be between .1 and 1) */
	try {
		if (ztitle == undefined) {
			ztitle = '';
		}
		return new Promise(function () {
			WTW.setWindowSize();
			if (typeof zwidth === 'undefined' || zwidth === null) {
				zwidth = .9; 
			}
			if (typeof zheight === 'undefined' || zheight === null) {
				zheight = .9; 
			}
			WTW.hide('wtw_ipagediv');
			WTW.show('wtw_ibrowseframe');
			var ziframe = dGet('wtw_ibrowseframe');
			if (ziframe.src != zurl) {
				ziframe.src = zurl;
			}
			dGet('wtw_ibrowsediv').style.width = Math.round(WTW.sizeX * zwidth) + 'px';
			dGet('wtw_ibrowsediv').style.height = Math.round(WTW.sizeY * zheight) + 'px';
			dGet('wtw_ibrowsediv').style.left = Math.round((WTW.sizeX * (1 - zwidth)) / 2) + 'px';
			dGet('wtw_ibrowsediv').style.top = Math.round((WTW.sizeY * (1 - zheight)) / 2) + 'px';
			dGet('wtw_ibrowsediv').style.display = 'inline-block';
			dGet('wtw_ibrowsediv').style.visibility = 'visible';
			dGet('wtw_ibrowsediv').style.zIndex = 3000;
			dGet('wtw_ibrowsediv').style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
			if (zurl == '/core/pages/help.php') {
				ziframe.onload = function() { WTW.setHelp();	};
				dGet('wtw_browsetitle').innerHTML = 'WalkTheWeb - Help';
			} else {
				dGet('wtw_browsetitle').innerHTML = ztitle;
			}
		});
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-openAsyncIFrame=' + ex.message);
		WTW.closeIFrame();
		WTW.openAsyncWebpage(zurl, '_blank');
	}
}

WTWJS.prototype.resizeIFrame = function(zdimensions) {
	/* resize iframe is called when window size is changed */
	try {
		/* zdimensions = zwidth, zheight */
		let zwidth = zdimensions[0];
		let zheight = zdimensions[1];
		WTW.setWindowSize();
		if (typeof zwidth === 'undefined' || zwidth === null) {
			zwidth = .9; 
		}
		if (typeof zheight === 'undefined' || zheight === null) {
			zheight = .9; 
		}
		dGet('wtw_ibrowsediv').style.width = Math.round(WTW.sizeX * zwidth) + 'px';
		dGet('wtw_ibrowsediv').style.height = Math.round(WTW.sizeY * zheight) + 'px';
		dGet('wtw_ibrowsediv').style.left = Math.round((WTW.sizeX * (1 - zwidth)) / 2) + 'px';
		dGet('wtw_ibrowsediv').style.top = Math.round((WTW.sizeY * (1 - zheight)) / 2) + 'px';
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-resizeIFrame=' + ex.message);
	}
}

WTWJS.prototype.closeIFrame = function() {
	/* closes the iframe window frame */
	try {
		var ziframe = dGet('wtw_ibrowseframe');
		ziframe.onload = function() {};
		dGet('wtw_ibrowsediv').style.zIndex = 0;
		dGet('wtw_ibrowsediv').style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
		dGet('wtw_ibrowsediv').style.display = 'none';
		dGet('wtw_ibrowsediv').style.visibility = 'hidden';
		dGet('wtw_browsetitle').innerHTML = '';
		dGet('wtw_ibrowseframe').src = '/core/pages/loading.php';
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-closeIFrame=' + ex.message);
	}
}

WTWJS.prototype.redirectParent = function(zurl) {
	/* used from within an iframe to redirect the main WalkTheWeb webpage */
	try {
		if (zurl.length > 0) {
			window.location.href = zurl;
		} else {
			window.location.href = 'index.php';
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-redirectParent=' + ex.message);
	}
}

WTWJS.prototype.refresh = function() {
	/* force reload the current Webpage */
	try {
		window.location.href = window.location.href;
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-refresh=' + ex.message);
	}
}


/* get text, text cleanup, encode, decode, and html string scrubbers */

String.prototype.toProperCase = function () {
	/* reformat text as proper case */
    return this.replace(/\w\S*/g, function(ztext){return ztext.charAt(0).toUpperCase() + ztext.substr(1).toLowerCase();});
}

WTWJS.prototype.cleanHTMLText = function(zhtmltext) {
	/* convert html to text so it cannot be executed as html (for form entries) */
	try {
		var zdiv = document.createElement('div');
		zdiv.innerHTML = zhtmltext;
		zhtmltext = (zdiv.innerText || zdiv.textContent);
		zdiv.remove();
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-cleanHTMLText=' + ex.message);
	}
	return zhtmltext;
}

WTWJS.prototype.encode = function(zvalue) {
	/* simplified version of escape text */
	try {
		if (zvalue != null) {
			while (zvalue.indexOf("'") > -1) {
				zvalue = zvalue.replace(/'/g, '&quot;');
			}
			while (zvalue.indexOf("'") > -1) {
				zvalue = zvalue.replace(/'/g, '&#039;');
			}
			while (zvalue.indexOf("'") > -1) {
				zvalue = zvalue.replace(/'/g, '&#39;');
			}
			while (zvalue.indexOf('<') > -1) {
				zvalue = zvalue.replace(/</g, '&lt;');
			}
			while (zvalue.indexOf('>') > -1) {
				zvalue = zvalue.replace(/>/g, '&gt;');
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-encode=' + ex.message);
    }
    return String(zvalue);
}

WTWJS.prototype.decode = function(zvalue) {
	/* decifer simplified version of escape text */
	try {
		if (zvalue != null) {
			while (zvalue.indexOf('&amp;') > -1) {
				zvalue = zvalue.replace('&amp;', '&');
			}
			while (zvalue.indexOf('&quot;') > -1) {
				zvalue = zvalue.replace('&quot;', '"');
			}
			while (zvalue.indexOf('&#039;') > -1) {
				zvalue = zvalue.replace('&#039;', "'");
			}
			while (zvalue.indexOf('&#39;') > -1) {
				zvalue = zvalue.replace('&#39;', "'");
			}
			while (zvalue.indexOf('&lt;') > -1) {
				zvalue = zvalue.replace('&lt;', '<');
			}
			while (zvalue.indexOf('&gt;') > -1) {
				zvalue = zvalue.replace('&gt;', '>');
			}
			while (zvalue.indexOf('\\') > -1) {
				zvalue = zvalue.replace('\\', '');
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-decode=' + ex.message);
    }
    return String(zvalue);
}

WTWJS.prototype.cleanInvalidCharacters = function(zvalue) {
	/* remove line breaks and other select non text characters from string */
	try {
		if (zvalue != null) {
			zvalue = zvalue.replace(/\\n/g, '\\n')  
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, '\\&')
               .replace(/\\r/g, '\\r')
               .replace(/\\t/g, '\\t')
               .replace(/\\b/g, '\\b')
               .replace(/\\f/g, '\\f');
			// remove non-printable and other non-valid JSON chars
			zvalue = zvalue.replace(/[\u0000-\u0019]+/g,''); 
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-cleanInvalidCharacters=' + ex.message);
    }
    return zvalue;
}

WTWJS.prototype.getQuerystring = function(zkey, zdefault) {
	/* get web page querystring value by key name */
    var zquery = '';
    try {
        if (zdefault == null) zdefault = '';
        zkey = zkey.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
        var zregex = new RegExp("[\\?&]" + zkey + "=([^&#]*)");
        var zqs = zregex.exec(window.location.href);
        if (zqs == null) {
            zquery = zdefault;
        } else {
            zquery = zqs[1];
        }
    } catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getQuerystring=' + ex.message);
    }
    return zquery;
}

WTWJS.prototype.setCookie = function(zname, zvalue, zdays) {
	/* set cookie will use https if available */
	try {
		var zallowcookies = WTW.checkAllowCookies();
		if (zallowcookies == true) {
			var zexpires = '';
			if (zdays) {
				var zdate = new Date();
				zdate.setTime(zdate.getTime() + (zdays*24*60*60*1000));
				zexpires = '; expires=' + zdate.toGMTString();
			} else {
				var zdate = new Date();
				zdate.setTime(zdate.getTime() - 2 * 24 * 60 * 60 * 1000);
				zexpires = '; expires=' + zdate.toUTCString();
			}
			if (wtw_protocol == 'https://') {
				document.cookie = zname + '=' + zvalue + zexpires + '; domain=' + wtw_domainname + ';SameSite=Strict;path=/;secure';
			} else {
				document.cookie = zname + 'non=' + zvalue + zexpires + ';SameSite=Strict;path=/';
			}
		} else if (zallowcookies == null) {
			/* have not answered prompt yet, store possible cookies in an array */
			WTW.pendingCookies[WTW.pendingCookies.length] = {
				'name': zname,
				'value': zvalue,
				'days': zdays
			}
		}
    } catch (ex) {
        WTW.log('core-scripts-prime-wtw_utilities.js-setCookie=' +ex.message);
    }
}

WTWJS.prototype.getCookie = function(zname) {
	/* get cookie by name */
	var zvalue = '';
	try {
		var zallowcookies = false;
		if (zname == 'allowcookies') {
			zallowcookies = true;
		} else {
			zallowcookies = WTW.checkAllowCookies();
		}
		if (zallowcookies) {
			if (wtw_protocol != 'https://') {
				zname += 'non=';
			}
			var zcookies = document.cookie.split(';');
			for(var i=0;i < zcookies.length;i++) {
				var zcook = zcookies[i].trim();
				while (zcook.charAt(0)==' ') {
					zcook = zcook.substring(1,zcook.length);
				}
				if (zcook.indexOf(zname) == 0) {
					zvalue = zcook.substring(zname.length,zcook.length);
				}
			}
			if (zvalue == '') {
				zvalue = null;
			} else if (zvalue.indexOf('non=') > -1) {
				zvalue = zvalue.replace('non=','');
			} else if (zvalue.indexOf('=') > -1) {
				zvalue = zvalue.replace('=','');
			}
		}
    } catch (ex) {
        WTW.log('core-scripts-prime-wtw_utilities.js-getCookie=' +ex.message);
    }
	return zvalue;
}

WTWJS.prototype.deleteCookie = function(zname) {
	/* delete cookie by name (expire immediately) */
	try {
		var zdate = new Date();
		zdate.setTime(zdate.getTime() - 2 * 24 * 60 * 60 * 1000);
		var zexpires = '; expires=' + zdate.toUTCString();
		if (wtw_protocol == 'https://') {
			document.cookie = zname + '=' + zexpires + '; domain=' + wtw_domainname + ';SameSite=Strict;path=/;secure';
		} else {
			document.cookie = zname + 'non=' + zexpires + ';SameSite=Strict;path=/';
		}
    } catch (ex) {
        WTW.log('core-scripts-prime-wtw_utilities.js-getCookie=' +ex.message);
    }
}

WTWJS.prototype.checkAllowCookies = function() {
	/* check if cookies are allowed */
	var zallowcookies = null;
	try {
		if (WTW.allowCookies == null) {
			/* has not been answered this session */
			/* check if allow was saved to a cookie in past session */
			zallowcookies = WTW.getCookie('allowcookies');
			if (zallowcookies == true || zallowcookies == 'true') {
				zallowcookies = true;
			} else if (zallowcookies == false || zallowcookies == 'false') {
				zallowcookies = false;
			}
		} else {
			zallowcookies = WTW.allowCookies;
		}
		if (zallowcookies == null) {
			/* show the prompt for user response */
			WTW.show('wtw_menucookies');
		}
    } catch (ex) {
        WTW.log('core-scripts-prime-wtw_utilities.js-checkAllowCookies=' +ex.message);
    }
	return zallowcookies;
}

WTWJS.prototype.saveAllowCookies = function(zallowcookies) {
	/* save response if cookies are allowed */
	try {
		if (zallowcookies) {
			/* true - set global variable and save response to a cookie for next time */
			WTW.allowCookies = true;
			WTW.setCookie('allowcookies', true, 365);
			/* process any pending cookies */
			for (var i=0;i < WTW.pendingCookies.length;i++) {
				if (WTW.pendingCookies[i] != null) {
					WTW.setCookie(WTW.pendingCookies[i].name, WTW.pendingCookies[i].value, WTW.pendingCookies[i].days);
				}
			}
		} else {
			/* false - remove all existing cookies for this site */
			WTW.allowCookies = false;
			var zcookies = document.cookie.split(';');
			for(var i=0;i < zcookies.length;i++) {
				var zname = zcookies[i].split("=")[0].trim();
				WTW.deleteCookie(zname);
			}
		}
		WTW.hide('wtw_menucookies');
		/* clear the pending cookies array */
		WTW.pendingCookies = [];
    } catch (ex) {
        WTW.log('core-scripts-prime-wtw_utilities.js-saveAllowCookies=' +ex.message);
    }
}


/* validate and format text, numbers, dates, url, email, etc... */

/* strings */
WTWJS.prototype.getRandomString = function(zlength) {
	/* gets a random alpha numeric string - often used as ID fields */
    var zresults = '';
	try {
		var zchars = '0123456789abcdefghijklmnopqrstuvwxyz';
		for (var i = zlength; i > 0; --i) {
			zresults += zchars[Math.floor(Math.random() * zchars.length)];
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-randomString=' + ex.message);
	}
    return zresults;
}

/* numbers */
WTWJS.prototype.isNumeric = function(zval) {
	/* boolean - is a text string a number */
    return !isNaN(parseFloat(zval)) && isFinite(zval);
}

WTWJS.prototype.isOdd = function(zval) {
	/* boolean - check if odd (true) or even (false) number */
	return zval % 2;
}

WTWJS.prototype.randomBetween = function(zmin,zmax) {
	/* get a random number between min and max numbers */
    return Math.floor(Math.random()*(zmax-zmin+1)+zmin);
}

WTWJS.prototype.formatNumber = function(zval, zdecimalpoints) {
	/* format a number with #,###.## (zval is the number and zdecimalpoints is number of decimal points) */
	var znumbertext = '';
	try {
		if (zdecimalpoints == undefined) {
			zdecimalpoints= 2;
		}
		if (zval != null) {
			if (WTW.isNumeric(zval)) {
				zval = Number(zval);
				var zdecimal = '';
				var zround = '';
				var zval1 = 0;
				var zval4 = 0;
				var zval3 = 0;
				var zval2 = zval.toFixed(zdecimalpoints), zval3 = zval2|0, b = zval < 0 ? 1 : 0,
				zval4 = Math.abs(zval2-zval3), zdecimal = ('' + zval4.toFixed(zdecimalpoints)).substr(2, zdecimalpoints),
				zval1 = '' + zval3, i = zval1.length, zround = '';
				while ( (i-=3) > b ) { 
					zround = ',' + zval1.substr(i, 3) + zround; 
				}
				znumbertext = zval1.substr(0, i + 3) + zround + (zdecimal ? '.' + zdecimal: '');
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-formatNumber=' + ex.message);
    }  
	return znumbertext;
}

WTWJS.prototype.formatMoney = function(zval, zdecimalpoints) {
	/* format a number with #,###.## (zval is the number and zdecimalpoints is number of decimal points) */
	var znumbertext = '';
	try {
		if (zdecimalpoints == undefined) {
			zdecimalpoints= 2;
		}
		if (zval != null) {
			if (zval.length > 0) {
				zval = zval.replace(' ','').replace('$','');
			}
			if (WTW.isNumeric(zval)) {
				zval = Number(zval);
				var zdecimal = '';
				var zround = '';
				var zval1 = 0;
				var zval4 = 0;
				var zval3 = 0;
				var zval2 = zval.toFixed(zdecimalpoints), zval3 = zval2|0, b = zval < 0 ? 1 : 0,
				zval4 = Math.abs(zval2-zval3), zdecimal = ('' + zval4.toFixed(zdecimalpoints)).substr(2, zdecimalpoints),
				zval1 = '' + zval3, i = zval1.length, zround = '';
				while ( (i-=3) > b ) { 
					zround = ',' + zval1.substr(i, 3) + zround; 
				}
				znumbertext = '$' + zval1.substr(0, i + 3) + zround + (zdecimal ? '.' + zdecimal: '');
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-formatMoney=' + ex.message);
    }  
	return znumbertext;
}

WTWJS.prototype.formatDataSize = function(zval) {
	/* format number with commas */
	var znumbertext = '';
	try {
		if (WTW.isNumeric(zval)) {
			zval = Number(zval);
			if (zval > 999999) {
				zval = (Math.round(zval * 10000) / 10000) / 1000000;
				znumbertext = WTW.formatNumber(zval,2) + ' mb';
			} else if (zval > 999) {
				zval = (Math.round(zval * 100) / 100) / 1000;
				znumbertext = WTW.formatNumber(zval,2) + ' kb';
			} else {
				zval = zval / 1000;
				znumbertext = WTW.formatNumber(zval,3) + ' kb';
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-formatDataSize=' + ex.message);
	}
	return znumbertext;
}

/* dates */
WTWJS.prototype.isDate = function(zval) {
	/* check if text is valid date */
	if (zval != null) {
		var zdate = new Date(zval);
		return !isNaN(zdate.valueOf());
	} else {
		return false;
	}
}

WTWJS.prototype.formatDate = function(zdatetext) {
	/* format zdatetext as month/day/year */
	var zdate = '';
	try {
		if (zdatetext != null) {
			if (zdatetext != '') {
				var zddate = new Date(zdatetext);
				var	zmonth = '' + (zddate.getMonth() + 1);
				var	zday = '' + zddate.getDate();
				var	zyear = zddate.getFullYear();

				if (zmonth.length < 2) {
					zmonth = '0' + zmonth;
				}
				if (zday.length < 2) {
					zday = '0' + zday;
				}
				zdate = [zmonth, zday, zyear].join('/');
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-formatDate=' + ex.message);
	}
	return zdate;
}

WTWJS.prototype.formatDateLong = function(zdatetext) {
	/* format long date spelled out month */
	try {
		if (zdatetext != '') {
			var zdate = new Date(zdatetext);
			var zmonth = (zdate.getMonth() + 1);
			var zday = zdate.getDate() + ', ';
			var zyear = zdate.getFullYear();
			var zmonthtext = '';
			switch (zmonth) {
				case 1:
					zmonthtext = 'January ';
					break;
				case 2:
					zmonthtext = 'February ';
					break;
				case 3:
					zmonthtext = 'March ';
					break;
				case 4:
					zmonthtext = 'April ';
					break;
				case 5:
					zmonthtext = 'May ';
					break;
				case 6:
					zmonthtext = 'June ';
					break;
				case 7:
					zmonthtext = 'July ';
					break;
				case 8:
					zmonthtext = 'August ';
					break;
				case 9:
					zmonthtext = 'September ';
					break;
				case 10:
					zmonthtext = 'October ';
					break;
				case 11:
					zmonthtext = 'November ';
					break;
				case 12:
					zmonthtext = 'December ';
					break;
			}
			return zmonthtext + zday + zyear;
		} else {
			return '';
		}
	} catch (ex) {
		return '';
	}
}

WTWJS.prototype.addDays = function(zdatetext, zdays) {
	/* add days to date */
	var zdate = '';
	try {
		if (zdatetext != null) {
			if (zdatetext != '') {
				var zddate = new Date(zdatetext);
				zddate.setDate(zddate.getDate() + Number(zdays));
				var	zmonth = '' + (zddate.getMonth() + 1);
				var	zday = '' + zddate.getDate();
				var	zyear = zddate.getFullYear();

				if (zmonth.length < 2) {
					zmonth = '0' + zmonth;
				}
				if (zday.length < 2) {
					zday = '0' + zday;
				}
				zdate = [zmonth, zday, zyear].join('/');
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-addDays=' + ex.message);
	}
	return zdate;
}

/* url and links */
WTWJS.prototype.isURL = function(zurl) {
	/* boolean - is a text string an URL */
	var zresults = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
	return zresults.test(zurl);
}

/* email */
WTWJS.prototype.isEmail = function(zemail) {
	/* boolean - is a text string an email address */
	var zresults = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return zresults.test(zemail);
}

/* angles (degrees and radians) */
WTWJS.prototype.getRadians = function(zdegrees) {
	/* converts degrees to radians */
	var zradians = 0;
	try {
		if (WTW.isNumeric(zdegrees)) {
			zradians = zdegrees * Math.PI / 180;
		}
    } catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getRadians=' + ex.message);
    }
	return zradians;
}

WTWJS.prototype.getDegrees = function(zradians) {
	/* converts radians to degrees */
	var zdegrees = 0;
	try {
		if (WTW.isNumeric(zradians)) {
			zdegrees = WTW.cleanDegrees(zradians * 180 / Math.PI);
		}
    } catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getDegrees=' + ex.message);
    }
	return zdegrees;
}

WTWJS.prototype.cleanDegrees = function(zdegrees) {
	/* converts degrees to between 0 and 360 (eliminates higher or negative degrees for easier comparisons) */
	try {
		if (WTW.isNumeric(zdegrees)) {
			while (zdegrees < 0) {
				zdegrees += 360;
			}
			while (zdegrees > 360) {
				zdegrees -= 360;
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-cleanDegrees=' + ex.message);
    }
	return zdegrees;
}


/* form field related functions (text, drop-down-lists, etc...) */

WTWJS.prototype.isTextBox = function(zelement) {
	/* check if a selected html element is a text enter box */
	let zistextbox = false;
	try {
		var ztagname = zelement.tagName;
		if (ztagname != null) {
			if (ztagname != undefined) {
				ztagname = ztagname.toLowerCase();
				if (ztagname === 'textarea') {
					zistextbox = true;
				} else if (ztagname == 'input') {
					zistextbox = true;
				} else {
					if (zelement.getAttribute('type') != null) {
						var ztype = zelement.getAttribute('type').toLowerCase(),
							/* if any of these input types is not supported by a browser, it will behave as input type text. */
							inputTypes = ['text', 'password', 'number', 'email', 'tel', 'url', 'search', 'date', 'datetime', 'datetime-local', 'time', 'month', 'week'];
						if (inputTypes.indexOf(ztype) >= 0) {
							zistextbox = true;
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-isTextBox=' + ex.message);
	}
    return zistextbox;
}

WTWJS.prototype.blockPassThrough = function(zevent) {
	/* keep the canvas from receiving click throughs from menu or form pages */
	try {
		if (zevent == undefined) {
			zevent = window.event;
		}
		if (zevent != undefined) {
			zevent.stopPropagation();
		}
    } catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-blockPassThrough=' + ex.message);
    }
}

WTWJS.prototype.setDDLValue = function(zddlname, zvalue) {
	/* set the drop-down list selected value by value */
	try {
		if (dGet(zddlname) != null) {
			var zddl = dGet(zddlname);
			zddl.selectedIndex = -1;
			for (var i = 0; i < zddl.options.length; i++){
				if (zddl.options[i].value != undefined && zddl.options[i].value != null) {
					if (WTW.isNumeric(zddl.options[i].value) && WTW.isNumeric(zvalue)) {
						if (Number(zddl.options[i].value) == Number(zvalue)) {
							zddl.selectedIndex = i;
						}
					} else {
						if (zddl.options[i].value.toLowerCase() == zvalue.toLowerCase()){
							zddl.selectedIndex = i;
						}
					}
				}
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-setDDLValue=' + ex.message);
    }
}

WTWJS.prototype.setDDLText = function(zddlname, ztext) {
	/* set the drop-down list selected value by text */
	try {
		if (dGet(zddlname) != null) {
			var zddl = dGet(zddlname);
			zddl.selectedIndex = -1;
			for (var i = 0; i < zddl.options.length; i++){
				if (zddl.options[i].text != undefined && zddl.options[i].text != null) {
					if (zddl.options[i].text.toLowerCase() == ztext.toLowerCase()){
						zddl.selectedIndex = i;
					}
				}
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-setDDLText=' + ex.message);
    }
}

WTWJS.prototype.getDDLValue = function(zddlname) {
	/* get the drop-down list selected value */
	var zddlvalue = '';
	try {
		if (dGet(zddlname) != null) {
			if (dGet(zddlname).options[dGet(zddlname).selectedIndex] != undefined) {
				zddlvalue = dGet(zddlname).options[dGet(zddlname).selectedIndex].value;
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-setDDLValue=' + ex.message);
    }
	return zddlvalue;
}

WTWJS.prototype.getDDLText = function(zddlname) {
	/* get the drop-down list selected text */
	var zddltext = '';
	try {
		if (dGet(zddlname) != null) {
			if (dGet(zddlname).options[dGet(zddlname).selectedIndex] != undefined) {
				zddltext = dGet(zddlname).options[dGet(zddlname).selectedIndex].text;
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getDDLText=' + ex.message);
    }
	return zddltext;
}

WTWJS.prototype.clearDDL = function(zddlname) {
	/* clear a drop-down list - remove all values (often used to prepare for reloading) */
	try {
		if (dGet(zddlname) != null) {
			var zddl = dGet(zddlname);
			if (zddl.options != undefined) {
				for (var i = zddl.options.length-1; i > -1 ; i--) {
					zddl.remove(i);
				}
			}
		}
    } catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-clearDDL=' + ex.message);
    }
}

WTWJS.prototype.changeNumberValue = function(zitem, zdn, zrefresh) {
	/* when a number is changed in the forms, this automates the number counting as the button is held down */
	try {
		if (zrefresh == undefined) {
			zrefresh = 0;
		}
		WTW.changeStop();
		var zvali = dGet(zitem).value;
		var znvali = 0;
		var zndn = 0;
		if (WTW.isNumeric(zdn)) {
			ndni = parseFloat(zdn);
		}
		if (WTW.isNumeric(zvali)) {
			if (WTW.adminView == 1) {
				if (zitem == 'wtw_tgroundpositiony' || zitem.indexOf('water') > -1) {
					znvali = parseFloat(Math.round(Number(zvali) * 100) / 100) + ndni;
					dGet(zitem).value = (znvali.toFixed(2));
					WTW.setGroundWater();
				} else if (zitem.indexOf('skysize2') > -1) {
					znvali = parseFloat(Math.round(Number(zvali) * 100) / 100) + ndni;
					dGet(zitem).value = (znvali.toFixed(2));
					WTW.setSkySize();
				} else if (zitem.indexOf('sky') > -1) {
					znvali = parseFloat(Math.round(Number(zvali) * 100) / 100) + ndni;
					dGet(zitem).value = (znvali.toFixed(2));
					WTW.setSkyBox();
				} else if (zitem.indexOf('scene') > -1 || zitem.indexOf('sun') > -1 || zitem.indexOf('backlight') > -1) {
					znvali = parseFloat(Math.round(Number(zvali) * 100) / 100) + ndni;
					dGet(zitem).value = (znvali.toFixed(2));
					WTW.setCommunityScene();
				} else if (zitem.indexOf('axis') > -1 || zitem.indexOf('actionzone') > -1) {
					znvali = parseFloat(Math.round(Number(zvali) * 100) / 100) + ndni;
					dGet(zitem).value = (znvali.toFixed(2));
					WTW.setNewActionZone();
				} else if (zitem.indexOf('tconngrid') > -1) {
					znvali = parseFloat(Math.round(Number(zvali) * 100) / 100) + ndni;
					dGet(zitem).value = (znvali.toFixed(2));
					WTW.setNewConnectingGrid();
				} else if (zitem.indexOf('wtw_tfirstbuild') > -1) {
					znvali = parseFloat(Math.round(Number(zvali) * 100) / 100) + ndni;
					dGet(zitem).value = (znvali.toFixed(2));
					WTW.setFirstBuilding();
				} else if (zitem.indexOf('wtw_tavatarscaling') > -1) {
					znvali = parseFloat(Math.round(Number(zvali) * 10000) / 10000) + ndni;
					dGet(zitem).value = (znvali.toFixed(4));
					WTW.setNewAvatar();
				} else if (zitem.indexOf('wtw_tavatar') > -1) {
					znvali = parseFloat(Math.round(Number(zvali) * 100) / 100) + ndni;
					dGet(zitem).value = (znvali.toFixed(2));
					WTW.setNewAvatar();
				} else {
					znvali = parseFloat(Math.round(Number(zvali) * 100) / 100) + ndni;
					dGet(zitem).value = (znvali.toFixed(2));
					WTW.setNewMold(zrefresh);
				}
			} else {
				znvali = parseFloat(Math.round(Number(zvali) * 100) / 100) + ndni;
				dGet(zitem).value = (znvali.toFixed(0));
			}
		}
		WTW.mouseTimer = window.setInterval(function () {
			var zval = dGet(zitem).value;
			var znval = 0;
			zndn = 0;
			if (WTW.isNumeric(zdn)) {
				zndn = parseFloat(zdn);
			}
			if (WTW.isNumeric(zval)) {
				if (WTW.adminView == 1) {
					if (zitem == 'wtw_tgroundpositiony' || zitem.indexOf('water') > -1) {
						znval = parseFloat(Math.round(Number(zval) * 100) / 100) + zndn;
						dGet(zitem).value = (znval.toFixed(2));
						WTW.setGroundWater();
					} else if (zitem.indexOf('skysize2') > -1) {
						znvali = parseFloat(Math.round(Number(zvali) * 100) / 100) + ndni;
						dGet(zitem).value = (znvali.toFixed(2));
						WTW.setSkySize();
					} else if (zitem.indexOf('sky') > -1) {
						znvali = parseFloat(Math.round(Number(zvali) * 100) / 100) + ndni;
						dGet(zitem).value = (znvali.toFixed(2));
						WTW.setSkyBox();
					} else if (zitem.indexOf('scene') > -1 || zitem.indexOf('sun') > -1 || zitem.indexOf('backlight') > -1) {
						znvali = parseFloat(Math.round(Number(zvali) * 100) / 100) + ndni;
						dGet(zitem).value = (znvali.toFixed(2));
						WTW.setCommunityScene();
					} else if (zitem.indexOf('axis') > -1 || zitem.indexOf('actionzone') > -1) {
						znval = parseFloat(Math.round(Number(zval) * 100) / 100) + zndn;
						dGet(zitem).value = (znval.toFixed(2));
						WTW.setNewActionZone();
					} else if (zitem.indexOf('tconngrid') > -1) {
						znval = parseFloat(Math.round(Number(zval) * 100) / 100) + zndn;
						dGet(zitem).value = (znval.toFixed(2));
						WTW.setNewConnectingGrid();
					} else if (zitem.indexOf('wtw_tfirstbuild') > -1) {
						znval = parseFloat(Math.round(Number(zval) * 100) / 100) + zndn;
						dGet(zitem).value = (znval.toFixed(2));
						WTW.setFirstBuilding();
					} else if (zitem.indexOf('wtw_tavatarscaling') > -1) {
						znval = parseFloat(Math.round(Number(zval) * 10000) / 10000) + zndn;
						dGet(zitem).value = (znval.toFixed(4));
						WTW.setNewAvatar();
					} else if (zitem.indexOf('wtw_tavatar') > -1) {
						znval = parseFloat(Math.round(Number(zval) * 100) / 100) + zndn;
						dGet(zitem).value = (znval.toFixed(2));
						WTW.setNewAvatar();
					} else {
						znval = parseFloat(Math.round(Number(zval) * 100) / 100) + zndn;
						dGet(zitem).value = (znval.toFixed(2));
						WTW.setNewMold(zrefresh);
					}
				} else {
					znval = parseFloat(Math.round(Number(zval) * 100) / 100) + zndn;
					dGet(zitem).value = (znval.toFixed(0));
				}
			}
		}, 100);
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-changeNumberValue=' + ex.message);
	}
}

WTWJS.prototype.changeStop = function() {
	/* stop the auto counting change of number on a form */
	try {
		if (WTW.mouseTimer != null) {
			window.clearInterval(WTW.mouseTimer);
			WTW.mouseTimer = null;
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-changeStop=' + ex.message);
	}
}

/* simple show / hide html element - utilities */
WTWJS.prototype.show = function(zelementname) {
	/* show an html element block */
	try {
		if (dGet(zelementname) != null) {
			dGet(zelementname).style.display = 'block';
			dGet(zelementname).style.visibility = 'visible';
			if (zelementname.indexOf('wtw_adminmenu') > -1 && WTW.adminView == 1) {
				var zmenu = zelementname.replace('wtw_adminmenu','');
				if (WTW.isNumeric(zmenu)) {
					WTW.adminMenu = Number(zmenu);
				}
			}
		}
	} catch (ex) { 
		WTW.log('core-scripts-prime-wtw_utilities.js-show=' + ex.message);
	}
}

WTWJS.prototype.showInline = function(zelementname) {
	/* show an html element inline */
	try {
		if (dGet(zelementname) != null) {
			dGet(zelementname).style.display = 'inline-block';
			dGet(zelementname).style.visibility = 'visible';
		}
	} catch (ex) { 
		WTW.log('core-scripts-prime-wtw_utilities.js-showInline=' + ex.message);
	}
}

WTWJS.prototype.hide = function(zelementname) {
	/* hide an html element */
	try {
		if (dGet(zelementname) != null) {
			dGet(zelementname).style.display = 'none';
			dGet(zelementname).style.visibility = 'hidden';
		}
	} catch (ex) { 
		WTW.log('core-scripts-prime-wtw_utilities.js-hide=' + ex.message);
	}
}

WTWJS.prototype.toggle = function(zelementname) {
	/* show or hide an html element (toggle show/hide) */
	try {
		if (dGet(zelementname) != null) {
			if (dGet(zelementname).style.visibility == 'visible') {
				WTW.hide(zelementname);
			} else {
				WTW.show(zelementname);
			}
		}
	} catch (ex) { 
		WTW.log('core-scripts-prime-wtw_utilities.js-toggle=' + ex.message);
	}
}

WTWJS.prototype.toggleTR = function(zelementname) {
	/* show or hide an table row element (toggle show/hide) */
	try {
		if (dGet(zelementname) != null) {
			if (dGet(zelementname).style.visibility == 'visible') {
				WTW.hide(zelementname);
			} else {
				dGet(zelementname).style.display = 'table-row';
				dGet(zelementname).style.visibility = 'visible';
			}
		}
	} catch (ex) { 
		WTW.log('core-scripts-prime-wtw_utilities.js-toggle=' + ex.message);
	}
}

/* get position, rotation, or distance to and from various reference points */

WTWJS.prototype.getWorldPosition = function(zmold) {
	/* world position is useful when molds have alternate parent coordinates */
	var zabspos = {
		'x':0,
		'y':0,
		'z':0};
	try {
		zmold.computeWorldMatrix(true);
		zabspos = zmold.getAbsolutePosition();
	} catch (ex){
		WTW.log('core-scripts-prime-wtw_utilities.js-getWorldPosition=' + ex.message);
	}
	return zabspos;
}

WTWJS.prototype.getWorldData = function(zmold) {
	/* world data is useful when molds have alternate parent coordinates */
	/* rotation is in radians */
	var zabs = {
		'position':{
			'x':0,
			'y':0,
			'z':0
		},
		'scaling':{
			'x':1,
			'y':1,
			'z':1
		},
		'rotation':{
			'x':0,
			'y':0,
			'z':0
		}
	};
	try {
		zmold.computeWorldMatrix(true);
		var zworldmatrix = zmold.getWorldMatrix();
		var zrotation =  new BABYLON.Quaternion();
		var zposition = new BABYLON.Vector3();
		var zscaling = new BABYLON.Vector3();
		zworldmatrix.decompose(zscaling, zrotation, zposition);
		zabs = {
			'position':{
				'x':Number(zposition.x),
				'y':Number(zposition.y),
				'z':Number(zposition.z)
			},
			'scaling':{
				'x':Number(zscaling.x),
				'y':Number(zscaling.y),
				'z':Number(zscaling.z)
			},
			'rotation':{
				'x':Number(zrotation.x),
				'y':Number(zrotation.y),
				'z':Number(zrotation.z)
			}
		};
	} catch (ex){
		WTW.log('core-scripts-prime-wtw_utilities.js-getWorldData=' + ex.message);
	}
	return zabs;
}

WTWJS.prototype.getWorldRotation = function(zmold) {
	/* world rotation is useful when molds have alternate parents and applied rotations */
	var zabsrot = {'x':0,'y':0,'z':0};
	try {
		zabsrot.x = zmold.rotation.x;
		zabsrot.y = zmold.rotation.y;
		zabsrot.z = zmold.rotation.z;
		var zparentmold = zmold.parent;
		if (zparentmold != null) {
			while (zparentmold != null) {
				zabsrot.x += zparentmold.rotation.x;
				zabsrot.y += zparentmold.rotation.y;
				zabsrot.z += zparentmold.rotation.z;
				zparentmold = zparentmold.parent;
			}
		}
	} catch (ex){
		WTW.log('core-scripts-prime-wtw_utilities.js-getWorldRotation=' + ex.message);
	}
	return zabsrot;
}

WTWJS.prototype.angleToTarget = function(zsourcename, ztargetname) {
	/* check the angle from one source mold by name to another target mold by name*/
	try {
		var zsource = WTW.getMeshOrNodeByID(zsourcename);
		var ztarget = WTW.getMeshOrNodeByID(ztargetname);
		if (zsource != null && ztarget != null) {
			var zline = WTW.getMeshOrNodeByID('zline');
			if (zline != null) {
				zline.dispose();
			}
			var zdx = ztarget.position.x - zsource.position.x;
			var zdz = ztarget.position.z - zsource.position.z;
			var zlinecolors = [];
			zlinecolors.push(new BABYLON.Color4(0, 1, 0, 1));
			zlinecolors.push(new BABYLON.Color4(0, 1, 0, 1));
			var zlinepath = [];
			zlinepath.push(new BABYLON.Vector3(zsource.position.x, .5, zsource.position.z));
			zlinepath.push(new BABYLON.Vector3(ztarget.position.x, .5, ztarget.position.z));
			zline = BABYLON.MeshBuilder.CreateLines('zline', {points: zlinepath, colors: zlinecolors, useVertexAlpha: true, updatable: true}, scene);
			var zlineangleradians = -Math.atan2(zdz,zdx);
			var zlineangledegrees = WTW.getDegrees(zlineangleradians);
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-angleToTarget=' + ex.message);
	}
}

WTWJS.prototype.rotateToTarget = function(zsourcename, ztargetname, zdegreeincrement) {
	/* rotate the source by name to face the target mold by name using a degree increment */
	try {
		var zsource = WTW.getMeshOrNodeByID(zsourcename);
		var ztarget = WTW.getMeshOrNodeByID(ztargetname);
		if (zsource != null && ztarget != null) {
			var zline = WTW.getMeshOrNodeByID('zline');
			if (zline != null) {
				zline.dispose();
			}
			var zdx = ztarget.position.x - zsource.position.x;
			var zdz = ztarget.position.z - zsource.position.z;
			var zlinecolors = [];
			zlinecolors.push(new BABYLON.Color4(0, 1, 0, 1));
			zlinecolors.push(new BABYLON.Color4(0, 1, 0, 1));
			var zlinepath = [];
			zlinepath.push(new BABYLON.Vector3(zsource.position.x, .5, zsource.position.z));
			zlinepath.push(new BABYLON.Vector3(ztarget.position.x, .5, ztarget.position.z));
			zline = BABYLON.MeshBuilder.CreateLines('zline', {points: zlinepath, colors: zlinecolors, useVertexAlpha: true, updatable: true}, scene);
			var zlineangleradians = -Math.atan2(zdz,zdx);
			var zlineangledegrees = WTW.getDegrees(zlineangleradians);
			var zsourcedegrees = WTW.getDegrees(zsource.rotation.y);
			var zdir = 1;
			if (zlineangledegrees < 180 && zsourcedegrees > zlineangledegrees && zsourcedegrees < zlineangledegrees + 180) {
				zdir = -1;
			} else if (zlineangledegrees > 180 && zsourcedegrees < zlineangledegrees - 180) {
				zdir = - 1;
			} else if (zsourcedegrees > zlineangledegrees && zlineangledegrees > zsourcedegrees - 180) {
				zdir = - 1;
			}
			if (zlineangledegrees > zsourcedegrees && zlineangledegrees - zsourcedegrees < zdegreeincrement) {
				zdegreeincrement = zlineangledegrees - zsourcedegrees;
			}
			if (zsourcedegrees > zlineangledegrees && zsourcedegrees - zlineangledegrees < zdegreeincrement) {
				zdegreeincrement = zsourcedegrees - zlineangledegrees;
			}
			if (zsourcedegrees != zlineangledegrees) {
				zsource.rotation.y = WTW.getRadians(zsourcedegrees + (zdir * zdegreeincrement));
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-rotateToTarget=' + ex.message);
	}
}

WTWJS.prototype.rotatePoint = function(zcx, zcz, zpx, zpz, zrad) {
	/* in a plane, rotate a point (zpx,zpz) around a center (zcx, zcz) */
	var znx = zpx;
	var znz = zpz;
	try {
		var cos = Math.cos(zrad);
		var sin = Math.sin(zrad);
		znx = (cos * (zpx - zcx)) + (sin * (zpz - zcz)) + zcx;
		znz = (cos * (zpz - zcz)) - (sin * (zpx - zcx)) + zcz;
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-rotatePoint=' + ex.message);
	}
    return {
		'nx':znx,
		'nz':znz
	};
}

WTWJS.prototype.getMyAngleToPoint = function(zx,zz) {
	/* calculate an angle from my avatar heading to a given point in a horizontal plane */
	var zangle = 0;
	try {
		var zpx = WTW.myAvatar.position.x;
		var zpz = WTW.myAvatar.position.z;
		var zavatarangle = WTW.getDegrees(WTW.myAvatar.rotation.y);
		var zbuildingangle = WTW.getAngleToPoint(zpx, zpz, zx, zz);
		zangle = WTW.cleanDegrees(zavatarangle + zbuildingangle);
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getMyAngleToPoint=' + ex.message);
	}
	return zangle;
}

WTWJS.prototype.getAngleToPoint = function(zcx, zcz, zpx, zpz) {
	/* calculate an angle from point (zcx,zcz) assumed 0 angle - to a given point (zpx,zpz) in a horizontal plane */
	var zpointangle = 0;
	try {
		var zdz = zpz - zcz;
		var zdx = zpx - zcx;
		zpointangle = Math.atan2(zdz, zdx);
		zpointangle *= 180 / Math.PI;
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getAngleToPoint=' + ex.message);
	}
	return zpointangle;
}

WTWJS.prototype.getDirectionVector = function(zsourcename, zdegreeoffset) {
	/* get a directional vector from a source mold name in the direction offset (example: direction vector for 40 degrees from the source) */
	var zdirection = null;
	try {
		if (zdegreeoffset == undefined) {
			zdegreeoffset = 0;
		}
		var zsource = WTW.getMeshOrNodeByID(zsourcename);
		if (zsource != null) {
			var zrot = WTW.getRadians(WTW.getDegrees(zsource.rotation.y) + zdegreeoffset);
			var zpositionx = zsource.position.x + (Math.cos(zrot) * 10.5);
			var zpositionz = zsource.position.z - (Math.sin(zrot) * 10.5);
			zdirection = new BABYLON.Vector3(zpositionx, 0, zpositionz);
			var zlineangleradians = -Math.atan2(dz,dx);
			var zlineangledegrees = WTW.getDegrees(zlineangleradians);
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getDirectionVector=' + ex.message);
	}
	return zdirection;
}

WTWJS.prototype.getMoveVector = function(zsourcename, zdegreeoffset, zstride, zevent) {
	/* this sets the direction vector for an avatar movement */
	/* zsourcename = avatar name */
	/* zdegreeoffset = 0 for forward movement, 180 for backwards etc... */
	/* zstride = distance to move (our passed value takes in account the frames per second (WTW.fps) so no matter what the frame rate, the distance per second is the same */
	/* zevent = name of the animation (examples: onwalk, onjump, onwalkbackwards, onstraferight) */
	var zmove = null;
	try {
		if (zdegreeoffset == undefined) {
			zdegreeoffset = 0;
		}
		var zsource = WTW.getMeshOrNodeByID(zsourcename);
		if (zsource != null) {
			var zdist = 200;
			var zrot = WTW.getRadians(WTW.getDegrees(zsource.rotation.y) + zdegreeoffset);
			var zpositionx = zsource.position.x + (Math.cos(zrot) * zdist);
			var zpositionz = zsource.position.z - (Math.sin(zrot) * zdist);
			var zdirection = new BABYLON.Vector3(zpositionx, zsource.position.y, zpositionz);
			zmove = new BABYLON.Vector3(parseFloat(Math.cos(zrot)) * zstride, 0, -parseFloat(Math.sin(zrot)) * zstride);
			var zraystart = new BABYLON.Vector3(zsource.position.x, zsource.position.y, zsource.position.z);
			var zray = new BABYLON.Ray(zraystart, zdirection, zdist);
			var zhits = scene.multiPickWithRay(zray);
			var zdist = 100;
			var zmoldname = '';
			for (var i = 0; i < zhits.length; i++){
				if (zhits[i].pickedMesh.name.indexOf('molds-') > -1) {
					if (zhits[i].distance < zdist) {
						zdist = zhits[i].distance;
						zmoldname = zhits[i].pickedMesh.name;
						
					}
				}
			}
			var zslope = 0;
			var zmold = WTW.getMeshOrNodeByID(zmoldname);
			if (zmold != null) {
				var zraystart2 = new BABYLON.Vector3(zsource.position.x, zsource.position.y+.2, zsource.position.z);
				var zray2 = new BABYLON.Ray(zraystart2, zdirection, zdist);
				var zhits2 = scene.multiPickWithRay(zray2);
				var zdist2 = 100;
				for (var i = 0; i < zhits2.length; i++){
					if (zhits2[i].pickedMesh.name == zmoldname) {
						if (zhits2[i].distance < zdist2) {
							zdist2 = zhits2[i].distance;
						}
					}
				}
				zslope = (Math.abs(zdist2)-Math.abs(zdist))/.2;
			}
			if (zsource.WTW != undefined) {
				if (zevent.indexOf('jump') > -1) {
					zmove = new BABYLON.Vector3(parseFloat(Math.cos(zrot)) * zstride, 0, -parseFloat(Math.sin(zrot)) * zstride);
					zsource.WTW.lastupdate = true;
				} else if (zdist < 2 && zslope < .2) {
					zmove = new BABYLON.Vector3(parseFloat(Math.cos(zrot)) * zstride, 1.1, -parseFloat(Math.sin(zrot)) * zstride);
					zsource.WTW.lastupdate = true;
				} else if (zdist < 5 && (zslope > 3 || zslope == 0)) {
					zmove = new BABYLON.Vector3(parseFloat(Math.cos(zrot)) * zstride, 0, -parseFloat(Math.sin(zrot)) * zstride);
					zsource.WTW.lastupdate = true;
				} else {
					if (zsource.WTW.lastupdate) {
						zmove = new BABYLON.Vector3(parseFloat(Math.cos(zrot)) * zstride, 0, -parseFloat(Math.sin(zrot)) * zstride);
						zsource.WTW.lastupdate = false;
					} else {
						zmove = new BABYLON.Vector3(parseFloat(Math.cos(zrot)) * zstride, -WTW.init.gravity, -parseFloat(Math.sin(zrot)) * zstride);
					}
				}
			}
/*			if (WTW.myAvatar.ridealong != undefined && WTW.myAvatar.ridealong != null) {
				zmove = new BABYLON.Vector3(parseFloat(Math.cos(zrot)) * zstride, 0, -parseFloat(Math.sin(zrot)) * zstride);
			}
*/		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getMoveVector=' + ex.message);
	}
	return zmove;
}

WTWJS.prototype.getMoveDownVector = function(zsourcename, zstride) {
	/* similar to move vector above, but applies gravity with the movement */
	var zmove = null;
	try {
		var zsource = WTW.getMeshOrNodeByID(zsourcename);
		if (zsource != null) {
			zmove = new BABYLON.Vector3(0, zstride, 0);
			var zdist = 6;
			var zdist1 = zdist;
			var zdist2 = zdist;
			var zdist3 = zdist;
			var zdist4 = zdist;
			var zpos1 = new BABYLON.Vector3(zsource.position.x+1, zsource.position.y+1, zsource.position.z);
			var zpos2 = new BABYLON.Vector3(zsource.position.x-1, zsource.position.y+1, zsource.position.z);
			var zpos3 = new BABYLON.Vector3(zsource.position.x, zsource.position.y+1, zsource.position.z+1);
			var zpos4 = new BABYLON.Vector3(zsource.position.x, zsource.position.y+1, zsource.position.z-1);
			var zdir1 = new BABYLON.Vector3(0, -1, 0);
			var zray1 = new BABYLON.Ray(zpos1, zdir1, zdist);
			var zray2 = new BABYLON.Ray(zpos2, zdir1, zdist);
			var zray3 = new BABYLON.Ray(zpos3, zdir1, zdist);
			var zray4 = new BABYLON.Ray(zpos4, zdir1, zdist);
			var zhits1 = scene.multiPickWithRay(zray1);
			var zhits2 = scene.multiPickWithRay(zray2);
			var zhits3 = scene.multiPickWithRay(zray3);
			var zhits4 = scene.multiPickWithRay(zray4);
			for (var i=0; i<zhits1.length; i++){
				if (zhits1[i].pickedMesh.name.indexOf('molds-') > -1 || zhits1[i].pickedMesh.name == 'communityeground-') {
					if (zhits1[i].distance < zdist1) {
						zdist1 = zhits1[i].distance;
					}
				}
			}
			for (var i=0; i<zhits2.length; i++){
				if (zhits2[i].pickedMesh.name.indexOf('molds-') > -1 || zhits2[i].pickedMesh.name == 'communityeground-') {
					if (zhits2[i].distance < zdist2) {
						zdist2 = zhits2[i].distance;
					}
				}
			}
			for (var i=0; i<zhits3.length; i++){
				if (zhits3[i].pickedMesh.name.indexOf('molds-') > -1 || zhits3[i].pickedMesh.name == 'communityeground-') {
					if (zhits3[i].distance < zdist3) {
						zdist3 = zhits3[i].distance;
					}
				}
			}
			for (var i=0; i<zhits4.length; i++){
				if (zhits4[i].pickedMesh.name.indexOf('molds-') > -1 || zhits4[i].pickedMesh.name == 'communityeground-') {
					if (zhits4[i].distance < zdist4) {
						zdist4 = zhits4[i].distance;
					}
				}
			}
			var zslope1 = 0;
			var zslope2 = 0;
			var zcriticalslope = 3.55;
			if (zdist1 != zdist2) {
				if (zdist2 > zdist1) {
					zslope1 = Math.abs(2/zdist2-zdist1);
				} else {
					zslope1 = Math.abs(2/zdist1-zdist2);
				}
			}
			if (zdist3 != zdist4) {
				if (zdist4 > zdist3) {
					zslope2 = Math.abs(2/zdist4-zdist3);
				} else {
					zslope2 = Math.abs(2/zdist3-zdist4);
				}
			}
			if ((zdist1 < 1.2 || zdist2 < 1.2 || zdist3 < 1.2 || zdist4 < 1.2) && ((zslope1 > 0 && zslope1 < zcriticalslope) || (zslope2 > 0 && zslope2 < zcriticalslope))) {
				zmove = new BABYLON.Vector3(0, 0, 0);
			} 
/*			if (WTW.myAvatar.ridealong != undefined && WTW.myAvatar.ridealong != null) {
				zmove = new BABYLON.Vector3(0, 0, 0);
			}
*/		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getMoveDownVector=' + ex.message);
	}
	return zmove;
}

WTWJS.prototype.getNewPoint = function(zx, zz, zangle, zdistance) {
	/* from any point (x,z) get a new point on the plane for an angle at a distance (rounded) */
    var zresults = {};
	try {
		zresults.x = Math.round(Math.cos((Math.PI / 2 - WTW.getRadians(zangle))) * zdistance + zx);
		zresults.z = Math.round(Math.sin((Math.PI / 2 - WTW.getRadians(zangle))) * zdistance + zz);
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getNewPoint=' + ex.message);
	}
    return zresults;
}

WTWJS.prototype.getNewPointDecimal = function(zx, zz, zangle, zdistance) {
	/* from any point (x,z) get a new point on the plane for an angle at a distance (not rounded) */
    var zresults = {};
	try {
		zresults.x = Math.cos((Math.PI / 2 - WTW.getRadians(zangle))) * zdistance + zx;
		zresults.z = Math.sin((Math.PI / 2 - WTW.getRadians(zangle))) * zdistance + zz;
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getNewPointDecimal=' + ex.message);
	}
    return zresults;
}

WTWJS.prototype.adjustOffset = function(zmoldname, zorientation, zdirection, zvalue) {
	/* make adjustments to an offset for parenting objects */
	/* example: avatar picks up a 3D Object and adjusts the position and rotation in their hand */
	try {
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
			if (zorientation == 'position') {
				if (zdirection == 'x') {
					zmold.position.x += zvalue;
				}
				if (zdirection == 'y') {
					zmold.position.y += zvalue;
				}
				if (zdirection == 'z') {
					zmold.position.z += zvalue;
				}
			}
			if (zorientation == 'scaling') {
				if (zdirection == 'x') {
					zmold.scaling.x += zvalue;
				}
				if (zdirection == 'y') {
					zmold.scaling.y += zvalue;
				}
				if (zdirection == 'z') {
					zmold.scaling.z += zvalue;
				}
			}
			if (zorientation == 'rotation') {
				if (zdirection == 'x') {
					zmold.rotation.x = WTW.getRadians(WTW.getDegrees(zmold.rotation.x) + zvalue);
				}
				if (zdirection == 'y') {
					zmold.rotation.y = WTW.getRadians(WTW.getDegrees(zmold.rotation.y) + zvalue);
				}
				if (zdirection == 'z') {
					zmold.rotation.z = WTW.getRadians(WTW.getDegrees(zmold.rotation.z) + zvalue);
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-adjustOffset=' + ex.message);
	}
}

WTWJS.prototype.getMeshOrNodeByID = function(zmoldname) {
	/* return the object if it is a Mesh or TransformNode */
	var zobject = null;
	try {
		zobject = scene.getMeshByID(zmoldname);
		if (zobject == null) {
			zobject = scene.getTransformNodeByID(zmoldname);
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getMeshOrNodeByID=' + ex.message);
	}
	return zobject;
}

WTWJS.prototype.setMoldLoaded = function(zmoldname, zloaded) {
	/* set a mold as loaded '1' or not loaded '0' */
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		if (zmoldnameparts.molds != null) {
			if (zmoldnameparts.molds[zmoldnameparts.moldind] != null) {
				zmoldnameparts.molds[zmoldnameparts.moldind].loaded = zloaded;
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-setMoldLoaded=' + ex.message);
	}
}

WTWJS.prototype.transformPosition = function(zmolddef, zposx, zposy, zposz) {
	/* transform position when a mold is added that uses an action zone as a parent (like swinging doors) */
	try {
		if (zmolddef.actionzoneid != '') {
			for (var j = 0; j < WTW.actionZones.length; j++) {
				if (WTW.actionZones[j] != null) {
					var zactionzonetype = WTW.actionZones[j].actionzonetype;
					if (WTW.actionZones[j].actionzoneid == zmolddef.actionzoneid && (zactionzonetype == 'door' || zactionzonetype == 'slidingdoor' || zactionzonetype == 'clickactivatedslidingdoor' || zactionzonetype == 'swingingdoor' || zactionzonetype == 'rotate' || zactionzonetype == 'elevator' || zactionzonetype == 'driverturnangle' || zactionzonetype == 'driverturningwheel' || zactionzonetype == 'driverwheel')) {
						var zactionzoneaxlebase = WTW.getMeshOrNodeByID(WTW.actionZones[j].moldname.replace('-actionzone-','-actionzoneaxlebase-'));
						if (zactionzoneaxlebase != null) {
							zposx -= zactionzoneaxlebase.position.x;
							zposy -= zactionzoneaxlebase.position.y;
							zposz -= zactionzoneaxlebase.position.z;
							//rotx -= WTW.getDegrees(zactionzoneaxlebase.rotation.x);
							//roty -= WTW.getDegrees(zactionzoneaxlebase.rotation.y);
							//rotz -= WTW.getDegrees(zactionzoneaxlebase.rotation.z);
						}
						if (WTW.actionZones[j].parentactionzoneid != '') {
							var zparentactionzoneind = WTW.getActionZoneInd(WTW.actionZones[j].parentactionzoneid, WTW.actionZones[j].connectinggridind);
							var zparentactionzoneaxlebasename = WTW.actionZones[zparentactionzoneind].moldname.replace('-actionzone-','-actionzoneaxlebase-');
							var zparentactionzoneaxlebase = WTW.getMeshOrNodeByID(zparentactionzoneaxlebasename);
							if (zparentactionzoneaxlebase == null) {
								WTW.addActionZone(zparentactionzoneaxlebasename.replace('-actionzoneaxlebase-','-actionzone-'), WTW.actionZones[zparentactionzoneind]);
								zparentactionzoneaxlebase = WTW.getMeshOrNodeByID(zparentactionzoneaxlebasename);
							}
							if (zparentactionzoneaxlebase != null) {
								zposx -= zparentactionzoneaxlebase.position.x;
								zposy -= zparentactionzoneaxlebase.position.y;
								zposz -= zparentactionzoneaxlebase.position.z;
								//rotx -= WTW.getDegrees(zparentactionzoneaxlebase.rotation.x);
								//roty -= WTW.getDegrees(zparentactionzoneaxlebase.rotation.y);
								//rotz -= WTW.getDegrees(zparentactionzoneaxlebase.rotation.z);
							}
						}
					} else if (WTW.actionZones[j].actionzoneid == zmolddef.actionzoneid && zactionzonetype == 'peoplemover') {
						var zactionzoneaxlebase = WTW.getMeshOrNodeByID(WTW.actionZones[j].moldname.replace('-actionzone-','-actionzoneaxlebase-'));
						if (zactionzoneaxlebase != null) {
							zposx -= zactionzoneaxlebase.position.x;
							zposy -= zactionzoneaxlebase.position.y;
							zposz -= zactionzoneaxlebase.position.z;
						}
					} else if (WTW.actionZones[j].actionzoneid == zmolddef.actionzoneid && zactionzonetype.indexOf('seat') > -1) {
						var zactionzoneaxlebase = WTW.getMeshOrNodeByID(WTW.actionZones[j].moldname.replace('-actionzone-','-actionzoneaxlebase-'));
						if (zactionzoneaxlebase != null) {
							zposx -= zactionzoneaxlebase.position.x;
							zposy -= zactionzoneaxlebase.position.y;
							zposz -= zactionzoneaxlebase.position.z;
						}
					}
				}
			}	
		}					
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-transformPosition=' + ex.message);
	} 
	return {
		'posx': zposx,
		'posy': zposy,
		'posz': zposz
	}
}

WTWJS.prototype.distance = function(zsx0,zsy0,zsz0,zsx1,zsy1,zsz1) {
	/* distance between 2 points in 3d space */
	var zdistance = 0;
	try {
		var zx0 = Number(zsx0);
		var zy0 = Number(zsy0);
		var zz0 = Number(zsz0);
		var zx1 = Number(zsx1);
		var zy1 = Number(zsy1);
		var zz1 = Number(zsz1);
		var zdeltax = zx1 - zx0;
		var zdeltay = zy1 - zy0;
		var zdeltaz = zz1 - zz0;
		zdistance = Math.sqrt(zdeltax * zdeltax + zdeltay * zdeltay + zdeltaz * zdeltaz);
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-distance=' + ex.message);
	}
	return zdistance;
}

WTWJS.prototype.getMyDistance = function(zsx1,zsy1,zsz1) {
	/* distance form point to my avatar current position */
	var zdistance = 0;
	try {
		if (WTW.myAvatar != null) {
			var zx0 = WTW.myAvatar.position.x;
			var zy0 = WTW.myAvatar.position.y;
			var zz0 = WTW.myAvatar.position.z;
			var zx1 = Number(zsx1);
			var zy1 = Number(zsy1);
			var zz1 = Number(zsz1);
			var zdeltax = zx1 - zx0;
			var zdeltay = zy1 - zy0;
			var zdeltaz = zz1 - zz0;
			zdistance = Math.sqrt(zdeltax * zdeltax + zdeltay * zdeltay + zdeltaz * zdeltaz);
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getMyDistance=' + ex.message);
	}
	return zdistance;
}

WTWJS.prototype.getBuildingDistance = function(zbx, zby, zbz, zposx, zposy, zposz, zbrotx, zbroty, zbrotz) {
	/* distance form my avatar to a particular building */
	var zdistance = 0;
	try {
		var zx0 = WTW.myAvatar.position.x;
		var zy0 = WTW.myAvatar.position.y;
		var zz0 = WTW.myAvatar.position.z;
		var deltax = (-Math.sin((Math.PI / 2 - WTW.getRadians(zbroty))) * zposx + Math.cos((Math.PI / 2 - WTW.getRadians(zbroty))) * zposz + zbx - zx0);
		var deltaz = (Math.sin((Math.PI / 2 - WTW.getRadians(zbroty))) * zposz + -Math.cos((Math.PI / 2 - WTW.getRadians(zbroty))) * zposx + zbz - zz0);
		var deltay = Number(zposy) + zby - zy0;
		zdistance = Math.sqrt(deltax * deltax + deltaz * deltaz + deltay * deltay);
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getBuildingDistance=' + ex.message);
	}
	return zdistance;
}


/* get or set parent object */

WTWJS.prototype.getParentName = function(zconnectinggridind) {
	/* get a parent name (Connecting Grid) based on the index in the array of loaded Connecting Grids */
	var zparentname = '';
	try {
		if (WTW.isNumeric(zconnectinggridind)) {
			if (WTW.connectingGrids[zconnectinggridind] != null) {
				zparentname = WTW.connectingGrids[zconnectinggridind].moldname;
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getParentName=' + ex.message);
	}
	return zparentname;	
}

WTWJS.prototype.getParentActionZoneName = function(zactionzoneind, zconnectinggridind) {
	/* get the Parent Name of a mold that parents an Action Zone (example part of a door) */
	var zparentname = '';
	try {
		if (WTW.isNumeric(zactionzoneind)) {
			if (WTW.actionZones[zactionzoneind] != null) {
				zparentname = WTW.actionZones[zactionzoneind].moldname.replace('actionzone-', 'actionzoneaxlebase2-');
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getParentActionZoneName=' + ex.message);
	}
	return zparentname;
}

WTWJS.prototype.attachParent = function(zchild, zparent) {
	/* work in progress - attach to new parent and recalculate the transition position, rotation, and scaling for consistency */
	var zrotation = BABYLON.Quaternion.Identity();
	var zposition = BABYLON.Vector3.Zero();
	var zm1 = BABYLON.Matrix.Identity();
	var zm2 = BABYLON.Matrix.Identity();
	zparent.getWorldMatrix().decompose(BABYLON.Vector3.Zero(), zrotation, zposition);
	zrotation.toRotationMatrix(zm1);
	zm2.setTranslation(zposition);
	zm2.multiplyToRef(zm1, zm1);
	var zinvparentmatrix = BABYLON.Matrix.Invert(zm1);
	var zm3 = zchild.getWorldMatrix().multiply(zinvparentmatrix);
	zm3.decompose(BABYLON.Vector3.Zero(), zchild.rotationQuaternion, zposition);
	zinvparentmatrix = BABYLON.Matrix.Invert(zparent.getWorldMatrix());
	var zm4 = zchild.getWorldMatrix().multiply(zinvparentmatrix);
	zm4.decompose(BABYLON.Vector3.Zero(), BABYLON.Quaternion.Identity(), zposition);
	zchild.position.x = zposition.x * zparent.scaling.x;
	zchild.position.y = zposition.y * zparent.scaling.y;
	zchild.position.z = zposition.z * zparent.scaling.z;
	if (zparent.scaling.x != 1 || zparent.scaling.y != 1 || zparent.scaling.z != 1) {
		var zchildren = zparent.getChildren();
		var zscalefixmesh;
		for (var i = 0; i < zchildren.length; i++) {
			if (zchildren[i].name == 'scaleFixMesh') {
				zscalefixmesh = zchildren[i];
				break;
			}
		}
		if (zscalefixmesh == undefined) {
			zscalefixmesh = new BABYLON.Mesh('scaleFixMesh', zparent.getScene());
			zscalefixmesh.parent = zparent;
		}
		zscalefixmesh.scaling.x = 1 / zparent.scaling.x;
		zscalefixmesh.scaling.y = 1 / zparent.scaling.y;
		zscalefixmesh.scaling.z = 1 / zparent.scaling.z;
		zchild.parent = zscalefixmesh;
	} else {
		zchild.parent = zparent;
	}
}

WTWJS.prototype.detachParent = function(zobject, zparent) {
	/* work in progress - deattach to new parent and recalculate the transition position, rotation, and scaling for consistency */
/*  //var zparentmatrix = Matrix.Invert(zparent.getWorldMatrix());  
  var znewmatrix = zobject.getWorldMatrix(); //.multiply(zparentmatrix);
  zobject.parent = null;
  zobject.getAbsolutePosition()
  znewmatrix.decompose(zobject.scaling, zobject.rotationQuaternion, zobject.position);
 */ 
	zobject.computeWorldMatrix(true);
	var abspos = zobject.getAbsolutePosition();
	zobject.parent = null;
	zobject.setAbsolutePosition(abspos);
}

WTWJS.prototype.getMoldConnectingGrid = function(zmoldname) {
	/* gets the name of the connecting grid (most parent) of the mold */
	/* connecting grid defines the web object (3D Community, 3D Building, or 3D Thing) that the mold is from */
	try {
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
			if (zmold.name.indexOf('communitymolds') > -1 && communityid == '') {
				while (zmold.name.indexOf('connectinggrids') == -1) {
					zmold = zmold.parent;
				}
			} else if (zmold.name.indexOf('buildingmolds') > -1 && buildingid == '') {
				while (zmold.name.indexOf('connectinggrids') == -1) {
					zmold = zmold.parent;
				}
			} else if (zmold.name.indexOf('thingmolds') > -1 && thingid == '') {
				while (zmold.name.indexOf('connectinggrids') == -1) {
					zmold = zmold.parent;
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getMoldConnectingGrid=' + ex.message);
    }
	return zmold;
}

WTWJS.prototype.getMoldBase = function(zmold) {
	/* some molds (3D Models) are made up of multiple meshes */
	/* this process gets the base (parent mold) for the 3D Object model */
	/* the base (parent mold) is used to scale and place the 3D Model as a whole to the web object (just like a connecting grid) */
	try {
		var moldname = zmold.name;
		if (zmold.parent != null) {
			var zmoldnameparts = WTW.getMoldnameParts(moldname);
			var zmoldparent = zmold.parent;
			var zparentnameparts = WTW.getMoldnameParts(zmoldparent.name);
			while (zmoldnameparts.moldnamebase == zparentnameparts.moldnamebase && zmold.parent != null) {
				zmold = zmoldparent;
				zmoldparent = zmoldparent.parent;
				zparentnameparts = WTW.getMoldnameParts(zmoldparent.name);
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getMoldBase=' + ex.message);
	}
	return zmold;
}


/* get or set web name (3D Community, 3D Building, or 3D Thing) */

WTWJS.prototype.getCommunityName = function(zcommunityid) {
	/* get community name for a given community id (all instances use the same name) */
	var zcommunityname = '';
	try {
		if (WTW.communities != null && zcommunityid !== '') {
			for (var i = 0; i < WTW.communities.length; i++) {
				if (WTW.communities[i] != null) {
					if (WTW.communities[i].communityinfo.communityid == zcommunityid) {
						zcommunityname = WTW.communities[i].communityinfo.communityname;
						i = WTW.communities.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getCommunityName=' + ex.message);
	}
	return zcommunityname;
}

WTWJS.prototype.getBuildingName = function(zbuildingid) {
	/* get building name for a given building id (all instances use the same name) */
	var zbuildingname = '';
	try {
		if (WTW.buildings != null && zbuildingid !== '') {
			for (var i = 0; i < WTW.buildings.length; i++) {
				if (WTW.buildings[i] != null) {
					if (WTW.buildings[i].buildinginfo.buildingid == zbuildingid) {
						zbuildingname = WTW.buildings[i].buildinginfo.buildingname;
						i = WTW.buildings.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getBuildingName=' + ex.message);
	}
	return zbuildingname;
}

WTWJS.prototype.getNameFromConnectingGrid = function(zwebid) {
	/* get hte name of a community, building, or thing by the connecting grid (instance) */
	var zwebname = '';
	try {
		if (WTW.connectingGrids != null && zwebid !== '') {
			for (var i = 0; i < WTW.connectingGrids.length; i++) {
				if (WTW.connectingGrids[i] != null) {
					if (WTW.connectingGrids[i].communityinfo.communityid == zwebid) {
						zwebname = WTW.connectingGrids[i].communityinfo.communityname;
						i = WTW.connectingGrids.length;
					} else if (WTW.connectingGrids[i].buildinginfo.buildingid == zwebid) {
						zwebname = WTW.connectingGrids[i].buildinginfo.buildingname;
						i = WTW.connectingGrids.length;
					} else if (WTW.connectingGrids[i].thinginfo.thingid == zwebid) {
						zwebname = WTW.connectingGrids[i].thinginfo.thingname;
						i = WTW.connectingGrids.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getNameFromConnectingGrid=' + ex.message);
	}
	return zwebname;
}

WTWJS.prototype.getThingName = function(zthingid) {
	/* get thing name for a given thing id (all instances use the same name) */
	var zthingname = '';
	try {
		if (WTW.things != null && zthingid !== '') {
			for (var i = 0; i < WTW.things.length; i++) {
				if (WTW.things[i] != null) {
					if (WTW.things[i].thinginfo.thingid == zthingid) {
						zthingname = WTW.things[i].thinginfo.thingname;
						i = WTW.things.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getThingName=' + ex.message);
	}
	return zthingname;
}

WTWJS.prototype.setClosestBuilding = function() {
	/* identifies the closest building and updates the wording on the left bottom menubar */
	try {
		var zclosestwebid = '';
		var zclosestaccess = '';
		var zclosestwebname = '';
		var zclosestwebtype = 'Building';
		if (thingid != '') {
			if (WTW.things != null) {
				if (WTW.things.length > 0) {
					var zthingind = WTW.getThingInd(thingid);
					if (WTW.things[zthingind] != null) {
						if (WTW.things[zthingind].thinginfo != undefined) {
							var zthingname = WTW.things[zthingind].thinginfo.thingname;
							if (zthingname != '') {
								zclosestwebname = WTW.decode(zthingname);
							}
							zclosestwebid = WTW.things[zthingind].thinginfo.thingid;
							zclosestaccess = WTW.things[zthingind].thinginfo.access;
							zclosestwebtype = 'Thing';
						}
					}
				} 
			}
			if (zclosestwebname == '') {
				zclosestwebname = '3D Thing';
				zclosestwebtype = 'Thing';
				zclosestwebid = thingid;
			}
		} else if (buildingid != '') {
			if (WTW.buildings != null) {
				if (WTW.buildings.length > 0) {
					var zbuildingind = WTW.getBuildingInd(buildingid);
					if (WTW.buildings[zbuildingind] != null) {
						if (WTW.buildings[zbuildingind].buildinginfo != undefined) {
							zclosestwebname = WTW.decode(WTW.buildings[zbuildingind].buildinginfo.buildingname);
							zclosestwebid = WTW.buildings[zbuildingind].buildinginfo.buildingid;
						}
					}
				}
			}
			if (zclosestwebname == '') {
				if (WTW.buildingName != '') {
					zclosestwebname = WTW.decode(WTW.buildingName);
				} else {
					zclosestwebname = '3D Building';
				}
				zclosestwebid = buildingid;
			}
		} else {
			var zlowdist = -1;
			if (WTW.connectingGrids != null) {
				if (WTW.connectingGrids.length > 0) {
					for (var i=0; i < WTW.connectingGrids.length; i++) {
						if (WTW.connectingGrids[i] != null) {
							if (WTW.connectingGrids[i].parentwebtype == 'community' && WTW.connectingGrids[i].childwebtype == 'building') {
								var zcheckdist = 1000000;
								var zx = WTW.connectingGrids[i].position.x;
								var zy = WTW.connectingGrids[i].position.y;
								var zz = WTW.connectingGrids[i].position.z;
								if (WTW.myAvatar != null) {
									zcheckdist = WTW.distance(WTW.myAvatar.position.x,WTW.myAvatar.position.y,WTW.myAvatar.position.z,zx,zy,zz);
								}
								if (zlowdist == -1 || zcheckdist < zlowdist) {
									WTW.closestAngle = WTW.getMyAngleToPoint(zx,zz);
									if (WTW.connectingGrids[i].buildinginfo.buildingname != '' && WTW.connectingGrids[i].buildinginfo.buildingname != undefined && WTW.connectingGrids[i].buildinginfo.buildingname != null) {
										zclosestwebname = WTW.decode(WTW.connectingGrids[i].buildinginfo.buildingname);
									} else if (WTW.buildingName != '') {
										zclosestwebname = WTW.decode(WTW.buildingName);
									} else {
										zclosestwebname = 'WalkTheWeb!';
									}
									zclosestwebid = WTW.connectingGrids[i].buildinginfo.buildingid;
									zclosestaccess = WTW.connectingGrids[i].buildinginfo.access;
									WTW.editBuildingAccess = zclosestaccess;
									zlowdist = zcheckdist;
									WTW.closestDistance = zlowdist;
								}
							}
						}
					}
				}
			} else {
				WTW.closestAngle = null;
			} 
		}
		if (WTW.closestWebID != zclosestwebid) {
			
			if (dGet('wtw_showbuildingname') != null) {
				if (zclosestwebname != '') {
					dGet('wtw_showbuildingname').innerHTML = zclosestwebname;
					WTW.showInline('wtw_showbuildingname');
					dGet('wtw_showbuildingnamemobile').innerHTML = 'Closest 3D Web: <b>' + zclosestwebname + '</b>';
					if (WTW.adminView == 1) {
						dGet('wtw_showbuildingname').style.cursor = 'pointer';
						dGet('wtw_showbuildingnamemobile').style.cursor = 'pointer';
					} else {
						dGet('wtw_showbuildingname').style.cursor = 'default';
						dGet('wtw_showbuildingnamemobile').style.cursor = 'default';
					}
					WTW.showInline('wtw_showbuildingnamemobile');
				}
			}
			if (WTW.editBuildingAccess != undefined) {
				if (WTW.adminView == 0 && ((WTW.editBuildingAccess.indexOf(dGet('wtw_tuserid').value) > -1 && zclosestwebtype == 'Building') || (zclosestaccess.indexOf(dGet('wtw_tuserid').value) > -1 && zclosestwebtype == 'Thing')) && dGet('wtw_tuserid').value != '') {
					dGet('wtw_modebuilding').alt = 'Edit ' + zclosestwebtype;
					dGet('wtw_modebuilding').title = 'Edit ' + zclosestwebtype;
					dGet('wtw_modebuildingmobile').alt = 'Edit ' + zclosestwebtype;
					dGet('wtw_modebuildingmobile').title = 'Edit ' + zclosestwebtype;
					switch (zclosestwebtype) {
						case 'Thing':
							dGet('wtw_modebuilding').src = '/content/system/images/menuthings32.png';
							dGet('wtw_modebuildingmobile').src = '/content/system/images/menuthings32.png';
							break;
						case 'Community':
							dGet('wtw_modebuilding').src = '/content/system/images/menucommunities32.png';
							dGet('wtw_modebuildingmobile').src = '/content/system/images/menucommunities32.png';
							break;
						default:
							dGet('wtw_modebuilding').src = '/content/system/images/menubuildings32.png';
							dGet('wtw_modebuildingmobile').src = '/content/system/images/menubuildings32.png';
							break;
					}
					dGet('wtw_modebuilding').onclick = function() {
						var zreturnpath = window.location.href;
						if (zclosestwebid != '') {
							window.location.href = '/admin.php?' + zclosestwebtype.toLowerCase() + 'id=' + zclosestwebid + '&returnpath=' + zreturnpath;
						} else {
							window.location.href = '/admin.php';
						}
					}
					dGet('wtw_modebuildingmobile').onclick = function() {
						var zreturnpath = window.location.href;
						if (zclosestwebid != '') {
							window.location.href = '/admin.php?' + zclosestwebtype.toLowerCase() + 'id=' + zclosestwebid + '&returnpath=' + zreturnpath;
						} else {
							window.location.href = '/admin.php';
						}
					}
					WTW.showInline('wtw_modebuilding');
					WTW.showInline('wtw_modebuildingmobile');
				} else if (WTW.adminView == 1) {
					dGet('wtw_modebuilding').src = '/content/system/images/menuedit32.png';
					dGet('wtw_modebuildingmobile').src = '/content/system/images/menuedit32.png';
					var zreturnpath1 = '';
					if (dGet('wtw_returnpath') != null) {
						zreturnpath1 = dGet('wtw_returnpath').value;
					}
					if (zreturnpath1 != '') {
						dGet('wtw_modebuilding').alt = 'Return to 3D Website';
						dGet('wtw_modebuilding').title = 'Return to 3D Website';
						dGet('wtw_modebuildingmobile').alt = 'Return to 3D Website';
						dGet('wtw_modebuildingmobile').title = 'Return to 3D Website';
					} else {
						dGet('wtw_modebuilding').alt = 'View ' + zclosestwebtype;
						dGet('wtw_modebuilding').title = 'View ' + zclosestwebtype;
						dGet('wtw_modebuildingmobile').alt = 'View ' + zclosestwebtype;
						dGet('wtw_modebuildingmobile').title = 'View ' + zclosestwebtype;
					}
					dGet('wtw_modebuilding').onclick = function() {
						var zreturnpath = '';
						if (dGet('wtw_returnpath') != null) {
							zreturnpath = dGet('wtw_returnpath').value;
						}
						if (zreturnpath != '') {
							window.location.href = zreturnpath;
						} else if (zclosestwebid != '') {
							window.location.href = '/' + zclosestwebtype.toLowerCase() + '/' + zclosestwebid;
						} else {
							window.location.href = '/';
						}
					}
					dGet('wtw_modebuildingmobile').onclick = function() {
						var zreturnpath = '';
						if (dGet('wtw_returnpath') != null) {
							zreturnpath = dGet('wtw_returnpath').value;
						}
						if (zreturnpath != '') {
							window.location.href = zreturnpath;
						} else if (zclosestwebid != '') {
							window.location.href = '/' + zclosestwebtype.toLowerCase() + '/' + zclosestwebid;
						} else {
							window.location.href = '/';
						}
					}
					WTW.showInline('wtw_modebuilding');
					WTW.showInline('wtw_modebuildingmobile');
				} else {
					WTW.hide('wtw_modebuilding');
					WTW.hide('wtw_modebuildingmobile');
				}
			}
			if (WTW.editCommunityAccess != undefined) {
				if (WTW.adminView == 0 && communityid != '' && WTW.editCommunityAccess.indexOf(dGet('wtw_tuserid').value) > -1 && dGet('wtw_tuserid').value != '') {
					if (dGet('wtw_showcommunityname') != null) {
						dGet('wtw_showcommunityname').innerHTML = WTW.communityName;
						dGet('wtw_showcommunityname').style.cursor = 'pointer';
						dGet('wtw_showcommunitynamemobile').innerHTML = '3D Community: <b>' + WTW.communityName + '</b>';
						dGet('wtw_showcommunitynamemobile').style.cursor = 'default';
					}
					dGet('wtw_modecommunity').alt = 'Edit Community';
					dGet('wtw_modecommunity').title = 'Edit Community';
					dGet('wtw_modecommunity').src = '/content/system/images/menucommunities32.png';
					dGet('wtw_modecommunitymobile').alt = 'Edit Community';
					dGet('wtw_modecommunitymobile').title = 'Edit Community';
					dGet('wtw_modecommunitymobile').src = '/content/system/images/menucommunities32.png';
					dGet('wtw_modecommunity').onclick = function() {
						var zreturnpath = window.location.href;
						if (zclosestwebid != '' || communityid != '') {
							window.location.href = '/admin.php?communityid=' + communityid + '&returnpath=' + zreturnpath;
						} else {
							window.location.href = '/admin.php';
						}
					}
					dGet('wtw_modecommunitymobile').onclick = function() {
						var zreturnpath = window.location.href;
						if (zclosestwebid != '') {
							window.location.href = '/admin.php?communityid=' + communityid + '&returnpath=' + zreturnpath;
						} else {
							window.location.href = '/admin.php';
						}
					}
					WTW.showInline('wtw_modecommunity');		
					WTW.showInline('wtw_modecommunitymobile');		
				} else if (WTW.adminView == 1 && communityid != '') {
					if (dGet('wtw_showcommunityname') != null) {
						dGet('wtw_showcommunityname').innerHTML = WTW.communityName;
						dGet('wtw_showcommunityname').style.cursor = 'pointer';
						dGet('wtw_showcommunitynamemobile').innerHTML = '3D Community: <b>' + WTW.communityName + '</b>';
						dGet('wtw_showcommunitynamemobile').style.cursor = 'pointer';
					}
					dGet('wtw_modecommunity').src = '/content/system/images/menuedit32.png';
					dGet('wtw_modecommunitymobile').src = '/content/system/images/menuedit32.png';
					var zreturnpath1 = '';
					if (dGet('wtw_returnpath') != null) {
						zreturnpath1 = dGet('wtw_returnpath').value;
					}
					if (zreturnpath1 != '') {
						dGet('wtw_modecommunity').alt = 'Return to 3D Website';
						dGet('wtw_modecommunity').title = 'Return to 3D Website';
						dGet('wtw_modecommunitymobile').alt = 'Return to 3D Website';
						dGet('wtw_modecommunitymobile').title = 'Return to 3D Website';
					} else {
						dGet('wtw_modecommunity').alt = 'View 3D Community';
						dGet('wtw_modecommunity').title = 'View  3D Community';
						dGet('wtw_modecommunitymobile').alt = 'View 3D Community';
						dGet('wtw_modecommunitymobile').title = 'View  3D Community';
					}
					dGet('wtw_modecommunity').onclick = function() {
						var zreturnpath = '';
						if (dGet('wtw_returnpath') != null) {
							zreturnpath = dGet('wtw_returnpath').value;
						}
						if (communityid != '') {
							window.location.href = '/admin.php?communityid=' + communityid;
						} else if (zreturnpath != '') {
							window.location.href = zreturnpath;
						} else {
							window.location.href = '/';
						}
					}
					dGet('wtw_modecommunitymobile').onclick = function() {
						var zreturnpath = '';
						if (dGet('wtw_returnpath') != null) {
							zreturnpath = dGet('wtw_returnpath').value;
						}
						if (zreturnpath != '') {
							window.location.href = zreturnpath;
						} else if (communityid != '') {
							window.location.href = '/' + communityid;
						} else {
							window.location.href = '/';
						}
					}
					WTW.showInline('wtw_modecommunity');
					WTW.showInline('wtw_modecommunitymobile');
				} else {
					WTW.hide('wtw_modecommunity');
					WTW.hide('wtw_modecommunitymobile');
				}
			}
			WTW.closestWebID = zclosestwebid;
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-setClosestBuilding=' + ex.message);
	}
}

WTWJS.prototype.create3DWebsite = function() {
	/* open Create 3D Website wizard Process */
	try {
		WTW.openIFrame('/core/pages/create3dwebsite.php?useremail='+dGet('wtw_tuseremail').value, .9, .9, 'Create 3D Website');
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-create3DWebsite=' + ex.message);
	}
}


/* arrays: check, find index, and remove from arrays */

/* boolean checks */
WTWJS.prototype.isInArray = function(zarray, ztext) {
	/* boolean - is text in the array values */
	var zinarray = false;
	try {
		if (zarray != null) {
			if (zarray.length > 0) {
				for (var i=0;i<zarray.length;i++) {
					if (zarray[i] != null) {
						if (zarray[i] == ztext) {
							zinarray = true;
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-isInArray=' + ex.message);
	}
	return zinarray;
}

WTWJS.prototype.isItemInArray = function(zarray, zcheckid, zconnectinggridind, zaltconnectinggridind, zarraytype) {
	/* boolean - check if an id is in a given array, with consideration to being the same connecting grid and mold group */
	/* each different connecting grid means a new instance of an object - so the id can be in the array more than once from different connecting grids (instances) in the same 3D Scene */
	/* Example, 4 of the same chairs around a table, each chair has the same design (id) but different instances with position, scaling, and rotation */
	var zfound = false;
	try {
		if (zarray != null && zcheckid != '') {
			for (var i = 0; i < zarray.length; i++) {
				if (zarray[i] != null) {
					if (zarray[i] != undefined) {
						if (zarraytype.indexOf('molds') > -1) {
							if (zarray[i].moldid != undefined) {
								if (zarray[i].moldid != undefined) {
									if (zarray[i].moldid == zcheckid && Number(zarray[i].connectinggridind) == Number(zconnectinggridind) && Number(zarray[i].altconnectinggridind) == Number(zaltconnectinggridind)) {
										zfound = true;
										i = zarray.length;
									}
								}
							}
						}
						if (zarraytype == 'actionzones') {
							if (zarray[i].actionzoneid != undefined) {
								if (zarray[i].actionzoneid != undefined) {
									if (zarray[i].actionzoneid == zcheckid && Number(zarray[i].connectinggridind) == Number(zconnectinggridind)) {
										zfound = true;
										i = zarray.length;
									}
								}
							}
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-isItemInArray=' + ex.message);
	}
	return zfound;
}

WTWJS.prototype.isStepInAutomations = function(zautomationstepid, zconnectinggridind) {
	/* check for an existing step in an automation (example: check for next step) */
	var zfound = false;
	try {
		if (WTW.automations != null && zautomationstepid != '') {
			for (var i = 0; i < WTW.automations.length; i++) {
				if (WTW.automations[i] != null) {
					if (WTW.automations[i].step.automationstepid == zautomationstepid && WTW.automations[i].connectinggridind == zconnectinggridind) {
						zfound = true;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-isStepInAutomations=' + ex.message);
	}
	return zfound;
}

WTWJS.prototype.isUploadReady = function(zuploadid) {
	/* has the uploaded item been loaded or is it still in process */
	var zready = false;
	try {
		if (wtw_uploads != null && zuploadid != '') {
			for (var i = 0; i < wtw_uploads.length; i++) {
				if (wtw_uploads[i] != null) {
					if (wtw_uploads[i].uploadid == zuploadid && wtw_uploads[i].queue == '0') {
						zready = true;
						i = wtw_uploads.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-isUploadReady=' + ex.message);
	}
	return zready;
}

WTWJS.prototype.isUploadAdded = function(zuploadid) {
	/* add an upload object to the upload array */
	var zfound = false;
	try {
		if (wtw_uploads != null && zuploadid != '') {
			for (var i = 0; i < wtw_uploads.length; i++) {
				if (wtw_uploads[i] != null) {
					if (wtw_uploads[i].uploadid == zuploadid) { 
						zfound = true;
						i = wtw_uploads.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-isUploadAdded=' + ex.message);
	}
	return zfound;
}

WTWJS.prototype.isUploadInQueue = function(zuploadid) {
	/* see if uplaod is queued to be loaded */
	var zfound = false;
	try {
		if (wtw_uploads != null && zuploadid != '') {
			for (var i = 0; i < wtw_uploads.length; i++) {
				if (wtw_uploads[i] != null) {
					if (wtw_uploads[i].uploadid == zuploadid && wtw_uploads[i].queue == '1') { 
						zfound = true;
						i = wtw_uploads.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-isUploadInQueue=' + ex.message);
	}
	return zfound;
}

/* find and return index */
WTWJS.prototype.indexInArray = function(zarray, ztext) {
	/* integer - return the Array index value where ztext is found in the zarray */
	var zindexinarray = -1;
	try {
		if (zarray != null) {
			if (zarray.length > 0) {
				for (var i=0;i<zarray.length;i++) {
					if (zarray[i] != null) {
						if (zarray[i] == ztext) {
							zindexinarray = i;
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-indexInArray=' + ex.message);
	}
	return zindexinarray;
}

WTWJS.prototype.getNextCount = function(zlistarray) {
	/* get next available index for an array */
	/* values were set to null instead of splice to preserve instance (index) for other items */
	/* null values found are next available or new index is added if needed */
	var znextcount = -1;
	try {
		if (zlistarray != null) {
			for (var i = 0; i < zlistarray.length; i++) {
				if (zlistarray[i] == null && znextcount == -1) {
					znextcount = i;
				}
			}
			if (znextcount == -1) {
				znextcount = zlistarray.length;
			}
		} else {
			znextcount = 0;
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getNextCount=' + ex.message);
	}
	return znextcount;
}

WTWJS.prototype.getMoldInd = function(zmolds, zmoldid, zconnectinggridind) {
	/* get Mold Index from an array of molds using the moldID (gets definition) and Connecting Grid (gets instance) */
	var zmoldind = -1;
	try {
		if (zmolds != null && zmoldid != '') {
			for (var i = 0; i < zmolds.length; i++) {
				if (zmolds[i] != null) {
					if (zmolds[i].moldid == zmoldid && zconnectinggridind == zmolds[i].connectinggridind) {
						zmoldind = i;
						i = zmolds.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getMoldInd=' + ex.message);
	}
	return zmoldind;
}

WTWJS.prototype.getAltMoldInd = function(zmolds, zmoldid, zaltconnectinggridind) {
	/* get Mold Index from an array of molds using the moldID (gets definition) and Alternate Connecting Grid (gets instance) */
	var zmoldind = -1;
	try {
		if (zmolds != null && zmoldid != '') {
			for (var i = 0; i < zmolds.length; i++) {
				if (zmolds[i] != null) {
					if (zmolds[i].moldid == zmoldid && zaltconnectinggridind == zmolds[i].altconnectinggridind) {
						zmoldind = i;
						i = zmolds.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getAltMoldInd=' + ex.message);
	}
	return zmoldind;
}

WTWJS.prototype.getUploadInd = function(zuploadid) {
	/* get upload index for an upload definition */
	var zuploadind = -1;
	try {
		if (wtw_uploads != null && zuploadid != '') {
			for (var i = 0; i < wtw_uploads.length; i++) {
				if (wtw_uploads[i] != null) {
					if (wtw_uploads[i].uploadid == zuploadid) {
						zuploadind = i;
						i = wtw_uploads.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getUploadInd=' + ex.message);
	}
	return zuploadind;
}

WTWJS.prototype.getThingInd = function(zthingid) {
	/* get thing Index for a thing (not concerned with instance) */
	var zthingind = -1;
	try {
		if (WTW.things != null) {
			for (var i = 0; i < WTW.things.length; i++) {
				if (WTW.things[i] != null) {
					if (WTW.things[i].thinginfo.thingid == zthingid) {
						zthingind = i;
						i = WTW.things.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getThingInd=' + ex.message);
	}
	return zthingind;
}

WTWJS.prototype.getBuildingInd = function(zbuildingid) {
	/* get thing Index for a building (not concerned with instance) */
	var zbuildingind = -1;
	try {
		if (WTW.buildings != null && zbuildingid !== '') {
			for (var i = 0; i < WTW.buildings.length; i++) {
				if (WTW.buildings[i] != null) {
					if (WTW.buildings[i].buildinginfo.buildingid == zbuildingid) {
						zbuildingind = i;
						i = WTW.buildings.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getBuildingInd=' + ex.message);
	}
	return zbuildingind;
}

WTWJS.prototype.getCommunityInd = function(zcommunityid) {
	/* get thing Index for a community (not concerned with instance) */
	var zcommunityind = -1;
	try {
		if (WTW.communities != null && zcommunityid != '') {
			for (var i = 0; i < WTW.communities.length; i++) {
				if (WTW.communities[i] != null) {
					if (WTW.communities[i].communityinfo != null) {
						if (WTW.communities[i].communityinfo.communityid == zcommunityid) {
							zcommunityind = i;
							i = WTW.communities.length;
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getCommunityInd=' + ex.message);
	}
	return zcommunityind;
}

WTWJS.prototype.getConnectingGridInd = function(zconnectinggridid) {
	/* get thing Index for a connecting grid (connecting grids create the instance) */
	var zconnectinggridind = -1;
	try {
		if (WTW.connectingGrids != null && zconnectinggridid != '') {
			for (var i = 0; i < WTW.connectingGrids.length; i++) {
				if (WTW.connectingGrids[i] != null) {
					if (WTW.connectingGrids[i].connectinggridid == zconnectinggridid) {
						zconnectinggridind = i;
						i = WTW.connectingGrids.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getConnectingGridInd=' + ex.message);
	}
	return zconnectinggridind;
}

WTWJS.prototype.getActionZoneInd = function(zactionzoneid, zconnectinggridind) {
	/* get action zone Index by id and connecting grid (connecting grids create the instance) */
	var zactionzoneind = -1;
	try {
		if (WTW.actionZones != null && zactionzoneid != '') {
			for (var i = 0; i < WTW.actionZones.length; i++) {
				if (WTW.actionZones[i] != null) {
					if (WTW.actionZones[i].actionzoneid == zactionzoneid && Number(WTW.actionZones[i].connectinggridind) == Number(zconnectinggridind)) {
						zactionzoneind = i;
						i = WTW.actionZones.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getActionZoneInd=' + ex.message);
	}
	return zactionzoneind;
}

/* add to array */
WTWJS.prototype.setUploadInQueue = function(zuploadid, zvalue) {
	/* add upload to queue */
	try {
		var zfound = -1;
		if (wtw_uploads != null && zuploadid != '') {
			for (var i = 0; i < wtw_uploads.length; i++) {
				if (wtw_uploads[i] != null) {
					if (wtw_uploads[i].uploadid == zuploadid) {
						wtw_uploads[i].queue = zvalue;
						zfound = i;
					}
				}
			}
		}
		if (zfound == -1 && zvalue == '1') {
			var zuploadind = WTW.getNextCount(wtw_uploads);
			wtw_uploads[zuploadind] = WTW.newUpload();
			wtw_uploads[zuploadind].uploadid = zuploadid;
			wtw_uploads[zuploadind].queue = '1';
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-setUploadInQueue=' + ex.message);
	}
}

/* delete from array (splice or null the value) */
WTWJS.prototype.deleteIdFromArray = function(zarray, ztext) {
	/* remove a select id from a given Array */
	try {
		if (zarray != null) {
			if (zarray.length > 0) {
				for (var i=zarray.length-1;i>-1;i--) {
					if (zarray[i] != null) {
						if (zarray[i].id == ztext) {
							zarray.splice(i,1);
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-deleteIdFromArray=' + ex.message);
	}
}


/* physics engine related functions */

WTWJS.prototype.createJoint = function(zimp1, zimp2, zdistanceBetweenPoints) {
	/* joints used by physics engine that relatively connect molds */
	try {
		var zjoint = new BABYLON.DistanceJoint({
			maxDistance: zdistanceBetweenPoints
		})
		zimp1.addJoint(zimp2, zjoint);
    } catch (ex) {
        WTW.log('core-scripts-prime-wtw_utilities.js-createJoint=' + ex.message);
    }
}


/* get user capabilities (gpu, browser, etc...) */

WTWJS.prototype.getGPU = function() {
	/* check for user GPU capabilities */
    var zgpu = 'high';
    try {
        var zgpustring;
        var zglinfo = canvas.getContext('experimental-webgl');
        var zscreenres = (screen.width * screen.height);
        var zdbgrenderinfo = null;

		if (zglinfo != null) {
			zdbgrenderinfo = zglinfo.getExtension('WEBGL_debug_renderer_info');
		}
        if (zdbgrenderinfo != null) {
            zgpustring = zglinfo.getParameter(zdbgrenderinfo.UNMASKED_RENDERER_WEBGL);
        } else if (WTW.getBrowser() == 'firefox') {
            if (zscreenres <= 2073600) {
                zgpu = 'medium';
            } else {
                zgpu = 'low';
            }
        }
        if (/Intel/i.test(zgpustring)) {
            zgpu = WTW.getIntel(zgpustring, zscreenres);
        } else if (/Nvidia/i.test(zgpustring)) {
            zgpu = WTW.getNVidia(zgpustring, zscreenres);
        } else if (/(AMD|ATI)/i.test(zgpustring)) {
            zgpu = WTW.getAMD(zgpustring, zscreenres);
        } else if (/Adreno/i.test(zgpustring)) {
            zgpu = WTW.getQualComm(zgpustring,zscreenres);
        } else if (/(PowerVR|POWERVR)/i.test(zgpustring)) {
            zgpu = WTW.getImagination(zgpustring, zscreenres);
        } else if (/(Mali|MALI)/i.test(zgpustring)) {
            zgpu = WTW.getARM(zgpustring, zscreenres);
        }
    } catch (ex) {
        WTW.log('core-scripts-prime-wtw_utilities.js-getGPU=' + ex.message);
    }
    return zgpu;
}

WTWJS.prototype.getBrowser = function() {
	/* check for user Browser capabilities */
    var zbrowser = 'unknown';
    try {
        var zisopera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0; // Opera 8.0+
        var zisfirefox = typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
        var zissafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === '[object SafariRemoteNotification]'; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)); // Safari 3.0+ 
        var zischrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime); // Chrome 1+
		var zisedgechromium = zischrome && (navigator.userAgent.indexOf('Edg') != -1); // Edge (based on chromium) detection
        var zisie = /*@cc_on!@*/ false || !!document.documentMode; // Internet Explorer 6-11
        var zisedge = !zisie && !!window.StyleMedia; // Edge 20+
		var zisblink = (zischrome || zisopera) && !!window.CSS; // Blink engine detection
        zbrowser = zisopera ? 'opera' :
            zisfirefox ? 'firefox' :
            zissafari ? 'safari' :
			zischrome ? 'chrome' :
			zisedgechromium ? 'edgechrome' :
            zisie ? 'ie' :
            zisedge ? 'edge' :
            zisblink ? 'blink' :
            'unknown';
    } catch (ex) {
        WTW.log('core-scripts-prime-wtw_utilities.js-getBrowser=' + ex.message);
    }
    return zbrowser;
}

WTWJS.prototype.getNVidia = function(zgpustr, zres) {
	/* check for user Video capabilities */
    var zresolution = 'low';
    try {
        if (/GTX [5-9]\d{2}\s/i.test(zgpustr) || /GTX [1]\d{3}\s/i.test(zgpustr)) { // check this statement, maybe add one for gtx 5XX series breakdown 
            zresolution = 'high'; // most powerfull desktop gpus from Nvidia since 2011
        } else if (/GTX [4-5]\d{2}[M]/i.test(zgpustr) && zres <= 2073600) {
            zresolution = 'medium';
        } else if (/GTX [6-9]\d{2}[M]/i.test(zgpustr)) {
            zresolution = 'high';
        } else if ((/GT [6-9]\d{2}\s/i.test(zgpustr) || /GeForce [6-9]\d{2}\s/i.test(zgpustr)) && zres <= 2073600) {
            zresolution = 'medium';
        } else if ((/GT [6-9]\d{2}[M]/i.test(zgpustr) || /GeForce [6-9]\d{2}[M]/i.test(zgpustr)) && zres <= 2073600) {
            zresolution = 'medium';
        }
    } catch (ex) {
        WTW.log('core-scripts-prime-wtw_utilities.js-getNVidia=' + ex.message);
    }
    return zresolution;
}

WTWJS.prototype.getIntel = function(zgpustr, zres) {
	/* check for user CPU capabilities */
    var zresolution = 'low';
    try {
        if ((/HD Graphics \d{3}/i.test(zgpustr) || /Iris Graphics \d{3}/i.test(zgpustr)) && zres <= 2073600) { // if the resolution if 1080p or less
            zresolution = 'medium';
        } else if ((/Iris Pro \d{3}/i.test(zgpustr) || /Iris Pro \w{4}/i.test(zgpustr) || /Iris Pro Graphics \w{4}/i.test(zgpustr) || /Iris Graphics \w{4}/i.test(zgpustr)) && zres <= 2073600) { //Iris Pro 580
            zresolution = 'high'; /* 'high' aka high shadows not ultimate shadows */
        }
    } catch (ex) {
        WTW.log('core-scripts-prime-wtw_utilities.js-getIntel=' + ex.message);
    }
    return zresolution;
}

WTWJS.prototype.getAMD = function(zgpustr, zres) {
	/* check for user CPU capabilities */
    var zresolution = 'low';
    /* the amd card with R5-R9 may not be differentiated */
    try {
        if (/Radeon HD [6-8][8-9]\d{2}\w?/i.test(zgpustr)) {
            if (zres > 3686400) {
                zresolution = 'medium';
            } else {
                zresolution = 'high';
            }
        } else if (/Radeon R5/i.test(zgpustr) && zres <= 2073600) {
            zresolution = 'medium';
        } else if (/Radeon R[7-9]\s[2-4][6-9]\d/i.test(zgpustr) || /Radeon RX/i.test(zgpustr) || /Radeon R[7-9]\s(m|M)[2-4][8-9]\d/i.test(zgpustr) ) {
            zresolution = 'high';
        } else if (/Radeon R[7-9]\s[2-4][1-5]\d/i.test(zgpustr) || /Radeon R[7-9]\s(m|M)[2-4][1-5]\d/i.test(zgpustr)) {
            zresolution = 'medium';

        }else if (/Radeon HD [4-5][8-9]\d{2}/i.test(zgpustr) && zres <= 2073600) {
            zresolution = 'medium'
        }
    } catch (ex) {
        WTW.log('core-scripts-prime-wtw_utilities.js-getAMD=' + ex.message);
    }
    return zresolution;
}

WTWJS.prototype.getQualComm = function(zgpustr, zres) {
	/* check for user CPU capabilities */
    var zresolution = 'low';
    try {
         if (/Adreno [4-5][3-9]\d/i.test(zgpustr) && zres <= 2073600) {
            zresolution = 'medium';
        }
    } catch (ex) {
        WTW.log('core-scripts-prime-wtw_utilities.js-getQualComm=' + ex.message);
    }
    return zresolution;
}

WTWJS.prototype.getImagination = function(zgpustr, zres) {
	/* check for user CPU capabilities */
    var zresolution = 'low';
    try {
        if (/Series.?GT7800/i.test(zgpustr) && zres <= 2073600) {
            zresolution = 'medium';
        } else if (/Series.?GT7600.?(plus|PLUS)/i.test(zgpustr) && zres <= 2073600 ) {
            zresolution = 'medium';
        }
    } catch (ex) {
        WTW.log('core-scripts-prime-wtw_utilities.js-getImagination=' + ex.message);
    }
    return zresolution;
}

WTWJS.prototype.getARM = function(zgpustr, zres) {
	/* check for user CPU capabilities */
    var zresolution = 'low';
    try {
        if (/(Mali|MALI)-T[8-9][6-8]\d/i.test(zgpustr) && zres <= 2073600) {
            zresolution = 'medium';
        } else if (/(Mali|MALI)-G71\d/i.test(zgpustr) && zres <= 2073600) {
            zresolution = 'medium';
        }
    } catch (ex) {
        WTW.log('core-scripts-prime-wtw_utilities.js-getARM=' + ex.message);
    }
	return zresolution;
}

WTWJS.prototype.__ = function(zlabel) {
	/* Language translation based on language file */
    var znewlabel = zlabel;
    try {
		if (wtw_defaultlanguage.toLowerCase() != 'english') {
			for (var i=0; i<wtw_translate.length;i++) {
				if (wtw_translate[i] != null) {
					if (wtw_translate[i].language != undefined) {
						if (wtw_translate[i].language.toLowerCase() == wtw_defaultlanguage.toLowerCase()) {
							for (var zkey in wtw_translate[i].translate) {
								if (zkey != null) {
									if (zkey.toLowerCase() == zlabel.toLowerCase()) {
										znewlabel = wtw_translate[i].translate[zkey];
									}
								}
							}
						}
					}
				}
			}
		}
    } catch (ex) {
        WTW.log('core-scripts-prime-wtw_utilities.js-__translate=' + ex.message);
    }
	return znewlabel;
}


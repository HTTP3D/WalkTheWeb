/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
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
				dGet('wtw_adminmenu').style.height = (WTW.sizeY-33) + "px";
				dGet('wtw_adminmenu3d').style.maxHeight = (WTW.sizeY - 34) + "px";
				dGet('wtw_adminmenuscroll').style.height = (WTW.sizeY - 95) + "px";
				var zfullpages = document.getElementsByClassName('wtw-fullpage');
				for (var i=0;i<zfullpages.length;i++) {
					if (zfullpages[i] != null) {
						if (zfullpages[i].id != undefined) {
							dGet(zfullpages[i].id).style.height = (WTW.sizeY - 95) + "px";
						}
					}
				}
				dGet('wtw_fullpageform').style.width = (WTW.sizeX - 5 - Number(dGet('wtw_adminmenubutton').style.left.replace("px",""))).toString() + 'px';
			}
		}
		if (dGet('wtw_ibrowsediv').style.display != "none") {
			var zwidth = dGet('wtw_ibrowsediv').clientWidth;
			var zheight = dGet('wtw_ibrowsediv').clientHeight;
			if (WTW.isNumeric(zwidth)) {
				dGet('wtw_ibrowsediv').style.width = Math.round(Number(zwidth)) + "px";
				dGet('wtw_ibrowsediv').style.left = Math.round((WTW.sizeX - Number(zwidth)) / 2) + "px";
			}
			if (WTW.isNumeric(zheight)) {
				dGet('wtw_ibrowsediv').style.height = Math.round(Number(zheight)) + "px";
				dGet('wtw_ibrowsediv').style.top = Math.round((WTW.sizeY - Number(zheight)) / 2) + "px";
			}
			dGet('wtw_ibrowsediv').style.display = "inline-block";
			dGet('wtw_ibrowsediv').style.visibility = "visible";
			dGet('wtw_ibrowsediv').style.zIndex = 3000;
		}
		if (engine != undefined) {
			engine.resize();
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-setWindowSize=" + ex.message);
    }
}

WTWJS.prototype.getScrollY = function() {
	/* returns the amount of scroll of a window scrollbar */
	var y = 0;
	try {
		var doc = document, w = window;
		var x, y, docEl;
		if (typeof w.pageYOffset === 'number') {
			x = w.pageXOffset;
			y = w.pageYOffset;
		} else {
			docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat') ?
					doc.documentElement : doc.body;
			x = docEl.scrollLeft;
			y = docEl.scrollTop;
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getScrollY=" + ex.message);
    }
    return y;
}

WTWJS.prototype.getMoldnameParts = function(moldname) {
	/* get mold name parts - the name reeals a lot of information about the mold and this breaks down the parts that you may use from it */
	var moldind = -1;
	var moldid = "";
	var cgind = -1;
	var cgid = "";
	var zcommunityid = "";
	var zbuildingid = "";
	var zthingid = "";
	var moldgroup = "building";
	var molds = [];
	var namepart = [];
	var avatarpart = "";
	var shape = "";
	var instanceid = "";
	var loadactionzoneid = "";
	var actionzoneid = "";
	var coveringname = "";
	var moldnamebase = "";
	var parentname = "";
	try {
		if (moldname == undefined) {
			moldname = dGet('wtw_tmoldname').value;
		}
		if (moldname.indexOf("-") > -1) {
			namepart = moldname.split('-');
			if (namepart[0] != null) {
				if (namepart[0].indexOf('molds') > -1) {
					moldgroup = namepart[0].replace("molds","");
					switch (moldgroup) {
						case "community":
							molds = WTW.communitiesMolds;
							break;
						case "building":
							molds = WTW.buildingMolds;
							break;
						case "thing":
							molds = WTW.thingMolds;
							break;
					}
				} else if (namepart[0].indexOf('actionzone') > -1) {
					moldgroup = "actionzone";
					molds = WTW.actionZones;
				} else if (namepart[0].indexOf('connectinggrid') > -1) {
					moldgroup = "connectinggrid";
					molds = WTW.connectingGrids;
				} else if (namepart[0].indexOf('myavatar') > -1 || namepart[0].indexOf('person') > -1) {
					moldgroup = "avatars";
				}
			}
			if (namepart[1] != null) {
				if (namepart[0].indexOf('myavatar') > -1 || namepart[0].indexOf('person') > -1) {
					instanceid = namepart[1];
				} else {
					if (WTW.isNumeric(namepart[1])) {
						moldind = Number(namepart[1]);
					}
				}
			}
			if (namepart[2] != null) {
				if (namepart[0].indexOf('myavatar') > -1 || namepart[0].indexOf('person') > -1) {
					avatarpart = namepart[2];
				} else {
					moldid = namepart[2];
				}
			}
			if (namepart[3] != null) {
				if (WTW.isNumeric(namepart[3])) {
					cgind = Number(namepart[3]);
				}
			}
			if (namepart[4] != null) {
				cgid = namepart[4];
			}
			if (namepart[5] != null) {
				shape = namepart[5];
			}
			moldnamebase = namepart[0] + "-" + namepart[1] + "-" + namepart[2] + "-" + namepart[3] + "-";
			if (molds[moldind] != null) {
				if (molds[moldind].communityinfo.communityid != undefined) {
					zcommunityid = molds[moldind].communityinfo.communityid;
				}
				if (molds[moldind].buildinginfo.buildingid != undefined) {
					zbuildingid = molds[moldind].buildinginfo.buildingid;
				}
				if (molds[moldind].thinginfo.thingid != undefined) {
					zthingid = molds[moldind].thinginfo.thingid;
				}
				loadactionzoneid = molds[moldind].loadactionzoneid;
				actionzoneid = molds[moldind].actionzoneid;
				coveringname = molds[moldind].covering;
			}
		}
		var mold = scene.getMeshByID(moldname);
		if (mold != null) {
			var parentmold = mold.parent;
			if (parentmold != null) {
				parentname = parentmold.name;
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getMoldnameParts=" + ex.message);
	}  
	return {
		moldname:moldname,
		moldind:moldind,
		moldid:moldid,
		cgind:cgind,
		cgid:cgid,
		communityid:zcommunityid,
		buildingid:zbuildingid,
		thingid:zthingid,
		instanceid:instanceid,
		moldgroup:moldgroup,
		molds:molds,
		shape:shape,
		avatarpart:avatarpart,
		loadactionzoneid:loadactionzoneid,
		actionzoneid:actionzoneid,
		coveringname:coveringname,
		namepart:namepart,
		moldnamebase:moldnamebase,
		parentname:parentname
	}
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
		var Httpreq = new XMLHttpRequest();
		Httpreq.overrideMimeType("application/json");
		Httpreq.open(zaction, zurl, true);
		Httpreq.onreadystatechange = function () {
			if (Httpreq.readyState == 4 && Httpreq.status == "200") {
				zcallback(Httpreq.responseText);
			} else if (zurl.indexOf("wtw-multiplayer-tracking.php") > -1 && Httpreq.status == "404") {
				WTWMultiplayer.trackMovement = 0;
			}
		};
		Httpreq.send(zrequest);  
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getJSON=" + ex.message);
	}
}

WTWJS.prototype.postJSON = function(zurl, zrequest, zcallback) {
	/* performs a form POST based JSON call for data */
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
		WTW.log("core-scripts-prime-wtw_utilities.js-postJSON=" + ex.message);
	}
}

WTWJS.prototype.getWebpage = function(zurl, zcallback) {
	/* retrieves a full webpage content */
	try {
		var Httpreq = new XMLHttpRequest();
		Httpreq.responseType = 'document';
		Httpreq.open('GET', zurl, true);
		Httpreq.onreadystatechange = function () {
			if (Httpreq.readyState == 4 && Httpreq.status == "200") {
				if (callback != null) {
					zcallback(Httpreq.responseText);
				}
			}
		};
		Httpreq.send(null);  
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getWebpage=" + ex.message);
	}
}

WTWJS.prototype.openWebpage = function(url, target) {
	/* open webpage - with target option */
	try {
		if (target == undefined) {
			if (url.toLowerCase().indexOf("//" + wtw_domainname + "/") > -1) {
				target = '';
			} else {
				target = '_blank';
			}
		}
		if (target == '') {
			window.parent.parent.window.location = url;
		} else {
			window.open(url,target);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-openWebpage=" + ex.message);
	}
}

WTWJS.prototype.openIFrame = function(url, zwidth, zheight, ztitle) {
	/* open iframe page with frame window (includes title and close x), height and width (values should be between .1 and 1) */
	try {
		if (ztitle == undefined) {
			ztitle = "";
		}
		WTW.setWindowSize();
		if (typeof zwidth === "undefined" || zwidth === null) {
			zwidth = .9; 
		}
		if (typeof zheight === "undefined" || zheight === null) {
			zheight = .9; 
		}
		WTW.hide('wtw_ipagediv');
		WTW.show('wtw_ibrowseframe');
		var iframe = dGet('wtw_ibrowseframe');
		if (iframe.src != url) {
			iframe.src = url;
		}
		dGet('wtw_ibrowsediv').style.width = Math.round(WTW.sizeX * zwidth) + "px";
		dGet('wtw_ibrowsediv').style.height = Math.round(WTW.sizeY * zheight) + "px";
		dGet('wtw_ibrowsediv').style.left = Math.round((WTW.sizeX * (1 - zwidth)) / 2) + "px";
		dGet('wtw_ibrowsediv').style.top = Math.round((WTW.sizeY * (1 - zheight)) / 2) + "px";
		dGet('wtw_ibrowsediv').style.display = "inline-block";
		dGet('wtw_ibrowsediv').style.visibility = "visible";
		dGet('wtw_ibrowsediv').style.zIndex = 3000;
		if (url == '/core/pages/help.php') {
			iframe.onload = function() { WTW.setHelp();	};
			dGet('wtw_browsetitle').innerHTML = "WalkTheWeb - Help";
		} else {
			dGet('wtw_browsetitle').innerHTML = ztitle;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-openIFrame=" + ex.message);
		WTW.closeIFrame();
		WTW.openWebpage(url, '_blank');
	}
}

WTWJS.prototype.resizeIFrame = function(zdimensions) {
	/* resize iframe is called when window size is changed */
	try {
		/* zdimensions = zwidth, zheight */
		let zwidth = zdimensions[0];
		let zheight = zdimensions[1];
		WTW.setWindowSize();
		if (typeof zwidth === "undefined" || zwidth === null) {
			zwidth = .9; 
		}
		if (typeof zheight === "undefined" || zheight === null) {
			zheight = .9; 
		}
		dGet('wtw_ibrowsediv').style.width = Math.round(WTW.sizeX * zwidth) + "px";
		dGet('wtw_ibrowsediv').style.height = Math.round(WTW.sizeY * zheight) + "px";
		dGet('wtw_ibrowsediv').style.left = Math.round((WTW.sizeX * (1 - zwidth)) / 2) + "px";
		dGet('wtw_ibrowsediv').style.top = Math.round((WTW.sizeY * (1 - zheight)) / 2) + "px";
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-resizeIFrame=" + ex.message);
	}
}

WTWJS.prototype.closeIFrame = function() {
	/* closes the iframe window frame */
	try {
		var iframe = dGet('wtw_ibrowseframe');
		iframe.onload = function() {};
		dGet('wtw_ibrowsediv').style.zIndex = 0;
		dGet('wtw_ibrowsediv').style.display = "none";
		dGet('wtw_ibrowsediv').style.visibility = "hidden";
		dGet('wtw_browsetitle').innerHTML = "";
		dGet('wtw_ibrowseframe').src = "/core/pages/loading.php";
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-closeIFrame=" + ex.message);
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
		WTW.log("core-scripts-prime-wtw_utilities.js-redirectParent=" + ex.message);
	}
}

WTWJS.prototype.refresh = function() {
	/* force reload the current Webpage */
	try {
		window.location.href = window.location.href;
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-refresh=" + ex.message);
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
		WTW.log("core-scripts-prime-wtw_utilities.js-cleanHTMLText=" + ex.message);
	}
	return zhtmltext;
}

WTWJS.prototype.encode = function(zvalue) {
	/* simplified version of escape text */
	try {
		if (zvalue != null) {
			while (zvalue.indexOf('"') > -1) {
				zvalue = zvalue.replace(/"/g, '&quot;');
			}
			while (zvalue.indexOf("'") > -1) {
				zvalue = zvalue.replace(/'/g, '&#039;');
			}
			while (zvalue.indexOf("'") > -1) {
				zvalue = zvalue.replace(/'/g, '&#39;');
			}
			while (zvalue.indexOf("<") > -1) {
				zvalue = zvalue.replace(/</g, '&lt;');
			}
			while (zvalue.indexOf(">") > -1) {
				zvalue = zvalue.replace(/>/g, '&gt;');
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-encode=" + ex.message);
    }
    return String(zvalue);
}

WTWJS.prototype.decode = function(zvalue) {
	/* decifer simplified version of escape text */
	try {
		if (zvalue != null) {
			while (zvalue.indexOf('&amp;') > -1) {
				zvalue = zvalue.replace('&amp;', "&");
			}
			while (zvalue.indexOf('&quot;') > -1) {
				zvalue = zvalue.replace('&quot;', '"');
			}
			while (zvalue.indexOf("&#039;") > -1) {
				zvalue = zvalue.replace('&#039;', "'");
			}
			while (zvalue.indexOf("&#39;") > -1) {
				zvalue = zvalue.replace('&#39;', "'");
			}
			while (zvalue.indexOf("&lt;") > -1) {
				zvalue = zvalue.replace('&lt;', "<");
			}
			while (zvalue.indexOf("&gt;") > -1) {
				zvalue = zvalue.replace('&gt;', ">");
			}
			while (zvalue.indexOf("\\") > -1) {
				zvalue = zvalue.replace('\\', "");
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-decode=" + ex.message);
    }
    return String(zvalue);
}

WTWJS.prototype.cleanInvalidCharacters = function(zvalue) {
	/* remove line breaks and other select non text characters from string */
	try {
		if (zvalue != null) {
			zvalue = zvalue.replace(/\\n/g, "\\n")  
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
			// remove non-printable and other non-valid JSON chars
			zvalue = zvalue.replace(/[\u0000-\u0019]+/g,""); 
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-cleanInvalidCharacters=" + ex.message);
    }
    return zvalue;
}

WTWJS.prototype.getQuerystring = function(zkey, zdefault) {
	/* get web page querystring value by key name */
    var squery = "";
    try {
        if (zdefault == null) zdefault = "";
        zkey = zkey.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + zkey + "=([^&#]*)");
        var qs = regex.exec(window.location.href);
        if (qs == null) {
            squery = zdefault;
        } else {
            squery = qs[1];
        }
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getQuerystring=" + ex.message);
    }
    return squery;
}

WTWJS.prototype.setCookie = function(name,value,days) {
	/* set cookie will use https if available */
	try {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			var expires = "; expires=" + date.toGMTString();
		}
		if (wtw_protocol == "https://") {
			document.cookie = name + "=" + value + expires + "; domain=" + wtw_domainname + ";SameSite=Strict;path=/;secure";
		} else {
			document.cookie = name + "non=" + value + expires + ";SameSite=Strict;path=/";
		}
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_utilities.js-setCookie=" +ex.message);
    }
}

WTWJS.prototype.getCookie = function(name) {
	/* get cookie by name */
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
        WTW.log("core-scripts-prime-wtw_utilities.js-getCookie=" +ex.message);
    }
	return value;
}

WTWJS.prototype.deleteCookie = function(name) {
	/* delete cookie by name (expire immediately) */
    WTW.setCookie(name,"",-1);
}


/* validate and format text, numbers, dates, url, email, etc... */

/* strings */
WTWJS.prototype.getRandomString = function(length) {
	/* gets a random alpha numeric string - often used as ID fields */
    var result = '';
	try {
		var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
		for (var i = length; i > 0; --i) {
			result += chars[Math.floor(Math.random() * chars.length)];
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-randomString=" + ex.message);
	}
    return result;
}

/* numbers */
WTWJS.prototype.isNumeric = function(n) {
	/* boolean - is a text string a number */
    return !isNaN(parseFloat(n)) && isFinite(n);
}

WTWJS.prototype.isOdd = function(num) {
	/* boolean - check if odd (true) or even (false) number */
	return num % 2;
}

WTWJS.prototype.randomBetween = function(min,max) {
	/* get a random number between min and max numbers */
    return Math.floor(Math.random()*(max-min+1)+min);
}

WTWJS.prototype.formatNumber = function(n, dp) {
	/* format a number with #,###.## (n is number and dp is number of decimal points) */
	var numbertext = "";
	try {
		if (WTW.isNumeric(n)) {
			n = Number(n);
			var w = n.toFixed(dp), k = w|0, b = n < 0 ? 1 : 0,
			u = Math.abs(w-k), d = ('' + u.toFixed(dp)).substr(2, dp),
			s = '' + k, i = s.length, r = '';
			while ( (i-=3) > b ) { 
				r = ',' + s.substr(i, 3) + r; 
			}
			numbertext = s.substr(0, i + 3) + r + (d ? '.' + d: '');
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-formatNumber=" + ex.message);
    }  
	return numbertext;
}

WTWJS.prototype.formatDataSize = function(num) {
	/* format number with commas */
	var snum = '';
	try {
		if (WTW.isNumeric(num)) {
			num = Number(num);
			if (num > 999999) {
				num = (Math.round(num * 10000) / 10000) / 1000000;
				snum = WTW.formatNumber(num,2) + ' mb';
			} else if (num > 999) {
				num = (Math.round(num * 100) / 100) / 1000;
				snum = WTW.formatNumber(num,2) + ' kb';
			} else {
				num = num / 1000;
				snum = WTW.formatNumber(num,3) + ' kb';
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-formatDataSize=" + ex.message);
	}
	return snum;
}

/* dates */
WTWJS.prototype.isDate = function(val) {
	/* check if text is valid date */
	if (val != null) {
		var d = new Date(val);
		return !isNaN(d.valueOf());
	} else {
		return false;
	}
}

WTWJS.prototype.formatDate = function(date) {
	/* format date as month/day/year */
	if (date != "") {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		return [month,day,year].join('/');
	} else {
		return "";
	}
}

WTWJS.prototype.formatDateLong = function(date) {
	/* format long date spelled out month */
	try {
		if (date != "") {
			var d = new Date(date);
			var month = (d.getMonth() + 1);
			var day = d.getDate() + ', ';
			var year = d.getFullYear();
			var smonth = '';
			switch (month) {
				case 1:
					smonth = "January ";
					break;
				case 2:
					smonth = "February ";
					break;
				case 3:
					smonth = "March ";
					break;
				case 4:
					smonth = "April ";
					break;
				case 5:
					smonth = "May ";
					break;
				case 6:
					smonth = "June ";
					break;
				case 7:
					smonth = "July ";
					break;
				case 8:
					smonth = "August ";
					break;
				case 9:
					smonth = "September ";
					break;
				case 10:
					smonth = "October ";
					break;
				case 11:
					smonth = "November ";
					break;
				case 12:
					smonth = "December ";
					break;
			}
			return smonth + day + year;
		} else {
			return "";
		}
	} catch (ex) {
		return "";
	}
}

WTWJS.prototype.addDays = function(date, days) {
	/* add days to date */
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/* url and links */
WTWJS.prototype.isURL = function(url) {
	/* boolean - is a text string an URL */
	var pattern = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
	return pattern.test(url);
}

/* email */
WTWJS.prototype.isEmail = function(email) {
	/* boolean - is a text string an email address */
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

/* angles (degrees and radians) */
WTWJS.prototype.getRadians = function(degrees) {
	/* converts degrees to radians */
	var radians = 0;
	try {
		if (WTW.isNumeric(degrees)) {
			radians = degrees * Math.PI / 180;
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getRadians=" + ex.message);
    }
	return radians;
}

WTWJS.prototype.getDegrees = function(radians) {
	/* converts radians to degrees */
	var degrees = 0;
	try {
		if (WTW.isNumeric(radians)) {
			degrees = WTW.cleanDegrees(radians * 180 / Math.PI);
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getDegrees=" + ex.message);
    }
	return degrees;
}

WTWJS.prototype.cleanDegrees = function(degrees) {
	/* converts degrees to between 0 and 360 (eliminates higher or negative degrees for easier comparisons) */
	try {
		if (WTW.isNumeric(degrees)) {
			while (degrees < 0) {
				degrees += 360;
			}
			while (degrees > 360) {
				degrees -= 360;
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-cleanDegrees=" + ex.message);
    }
	return degrees;
}


/* form field related functions (text, drop-down-lists, etc...) */

WTWJS.prototype.isTextBox = function(zelement) {
	/* check if a selected html element is a text enter box */
	let zistextbox = false;
	try {
		var ztagname = zelement.tagName.toLowerCase();
		if (ztagname === 'textarea') {
			zistextbox = true;
		} else if (ztagname == 'input') {
			zistextbox = true;
		} else {
			var ztype = zelement.getAttribute('type').toLowerCase(),
				/* if any of these input types is not supported by a browser, it will behave as input type text. */
				inputTypes = ['text', 'password', 'number', 'email', 'tel', 'url', 'search', 'date', 'datetime', 'datetime-local', 'time', 'month', 'week'];
			if (inputTypes.indexOf(ztype) >= 0) {
				zistextbox = true;
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-isTextBox=" + ex.message);
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
		WTW.log("core-scripts-prime-wtw_utilities.js-blockPassThrough=" + ex.message);
    }
}

WTWJS.prototype.setDDLValue = function(ddlname, value) {
	/* set the drop-down list selected value by value */
	try {
		if (dGet(ddlname) != null) {
			var ddl = dGet(ddlname);
			ddl.selectedIndex = -1;
			for (var i = 0; i < ddl.options.length; i++){
				if (ddl.options[i].value != undefined && ddl.options[i].value != null) {
					if (WTW.isNumeric(ddl.options[i].value) && WTW.isNumeric(value)) {
						if (Number(ddl.options[i].value) == Number(value)) {
							ddl.selectedIndex = i;
						}
					} else {
						if (ddl.options[i].value.toLowerCase() == value.toLowerCase()){
							ddl.selectedIndex = i;
						}
					}
				}
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-setDDLValue=" + ex.message);
    }
}

WTWJS.prototype.setDDLText = function(ddlname, stext) {
	/* set the drop-down list selected value by text */
	try {
		if (dGet(ddlname) != null) {
			var ddl = dGet(ddlname);
			ddl.selectedIndex = -1;
			for (var i = 0; i < ddl.options.length; i++){
				if (ddl.options[i].text != undefined && ddl.options[i].text != null) {
					if (ddl.options[i].text.toLowerCase() == stext.toLowerCase()){
						ddl.selectedIndex = i;
					}
				}
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-setDDLText=" + ex.message);
    }
}

WTWJS.prototype.getDDLValue = function(ddlname) {
	/* get the drop-down list selected value */
	var ddlvalue = "";
	try {
		if (dGet(ddlname).options[dGet(ddlname).selectedIndex] != undefined) {
			ddlvalue = dGet(ddlname).options[dGet(ddlname).selectedIndex].value;
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-setDDLValue=" + ex.message);
    }
	return ddlvalue;
}

WTWJS.prototype.getDDLText = function(ddlname) {
	/* get the drop-down list selected text */
	var ddltext = "";
	try {
		if (dGet(ddlname).options[dGet(ddlname).selectedIndex] != undefined) {
			ddltext = dGet(ddlname).options[dGet(ddlname).selectedIndex].text;
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getDDLText=" + ex.message);
    }
	return ddltext;
}

WTWJS.prototype.clearDDL = function(ddlname) {
	/* clear a drop-down list - remove all values (often used to prepare for reloading) */
	try {
		if (dGet(ddlname) != null) {
			var ddl = dGet(ddlname);
			for (var i = ddl.options.length - 1 ; i >= 0 ; i--) {
				ddl.remove(i);
			}
		}
    } catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-clearDDL=" + ex.message);
    }
}

WTWJS.prototype.changeNumberValue = function(item, dn, refresh) {
	/* when a number is changed in the forms, this automates the number counting as the button is held down */
	try {
		if (refresh == undefined) {
			refresh = 0;
		}
		WTW.changeStop();
		var vali = dGet(item).value;
		var nvali = 0;
		var ndn = 0;
		if (WTW.isNumeric(dn)) {
			ndni = parseFloat(dn);
		}
		if (WTW.isNumeric(vali)) {
			nvali = parseFloat(Math.round(Number(vali) * 100) / 100) + ndni;
			if (WTW.adminView == 1) {
				dGet(item).value = (nvali.toFixed(2));
				if (item == "wtw_tgroundpositiony") {
					WTW.setGroundWater();
				} else if (item.indexOf("axis") > -1 || item.indexOf("actionzone") > -1) {
					WTW.setNewActionZone();
				} else if (item.indexOf("tconngrid") > -1) {
					WTW.setNewConnectingGrid();
				} else {
					WTW.setNewMold(refresh);
				}
			} else {
				dGet(item).value = (nvali.toFixed(0));
			}
		}
		WTW.mouseTimer = window.setInterval(function () {
			var val = dGet(item).value;
			var nval = 0;
			var ndn = 0;
			if (WTW.isNumeric(dn)) {
				ndn = parseFloat(dn);
			}
			if (WTW.isNumeric(val)) {
				nval = parseFloat(Math.round(Number(val) * 100) / 100) + ndn;
				if (WTW.adminView == 1) {
					dGet(item).value = (nval.toFixed(2));
					if (item == "wtw_tgroundpositiony") {
						WTW.setGroundWater();
					} else if (item.indexOf("axis") > -1 || item.indexOf("actionzone") > -1) {
						WTW.setNewActionZone();
					} else if (item.indexOf("tconngrid") > -1) {
						WTW.setNewConnectingGrid();
					} else {
						WTW.setNewMold(refresh);
					}
				} else {
					dGet(item).value = (nval.toFixed(0));
				}
			}
		}, 100);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-changeNumberValue=" + ex.message);
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
		WTW.log("core-scripts-prime-wtw_utilities.js-changeStop=" + ex.message);
	}
}

/* simple show / hide html element - utilities */
WTWJS.prototype.show = function(zelementname) {
	/* show an html element block */
	try {
		if (dGet(zelementname) != null) {
			dGet(zelementname).style.display = 'block';
			dGet(zelementname).style.visibility = 'visible';
			if (zelementname.indexOf("wtw_adminmenu") > -1 && WTW.adminView == 1) {
				var zmenu = zelementname.replace("wtw_adminmenu","");
				if (WTW.isNumeric(zmenu)) {
					WTW.adminMenu = Number(zmenu);
				}
			}
		}
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_utilities.js-show=" + ex.message);
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
		WTW.log("core-scripts-prime-wtw_utilities.js-showInline=" + ex.message);
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
		WTW.log("core-scripts-prime-wtw_utilities.js-hide=" + ex.message);
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
		WTW.log("core-scripts-prime-wtw_utilities.js-toggle=" + ex.message);
	}
}


/* get position, rotation, or distance to and from various reference points */

WTWJS.prototype.getWorldPosition = function(zmold) {
	/* world position is useful when molds have alternate parent coordinates */
	var zabspos = {'x':0,'y':0,'z':0};
	try {
		zmold.computeWorldMatrix(true);
		zabspos = zmold.getAbsolutePosition();
	} catch (ex){
		WTW.log("core-scripts-prime-wtw_utilities.js-getWorldPosition=" + ex.message);
	}
	return zabspos;
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
		WTW.log("core-scripts-prime-wtw_utilities.js-getWorldRotation=" + ex.message);
	}
	return zabsrot;
}

WTWJS.prototype.angleToTarget = function(zsourcename, ztargetname) {
	/* check the angle from one source mold by name to another target mold by name*/
	try {
		var zsource = scene.getMeshByID(zsourcename);
		var ztarget = scene.getMeshByID(ztargetname);
		if (zsource != null && ztarget != null) {
			var zline = scene.getMeshByID("zline");
			if (zline != null) {
				zline.dispose();
			}
			var dx = ztarget.position.x - zsource.position.x;
			var dz = ztarget.position.z - zsource.position.z;
			var zlinecolors = [];
			zlinecolors.push(new BABYLON.Color4(0, 1, 0, 1));
			zlinecolors.push(new BABYLON.Color4(0, 1, 0, 1));
			var zlinepath = [];
			zlinepath.push(new BABYLON.Vector3(zsource.position.x, .5, zsource.position.z));
			zlinepath.push(new BABYLON.Vector3(ztarget.position.x, .5, ztarget.position.z));
			zline = BABYLON.MeshBuilder.CreateLines("zline", {points: zlinepath, colors: zlinecolors, useVertexAlpha: true, updatable: true}, scene);
			var zlineangleradians = -Math.atan2(dz,dx);
			var zlineangledegrees = WTW.getDegrees(zlineangleradians);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-angleToTarget=" + ex.message);
	}
}

WTWJS.prototype.rotateToTarget = function(zsourcename, ztargetname, zdegreeincrement) {
	/* rotate the source by name to face the target mold by name using a degree increment */
	try {
		var zsource = scene.getMeshByID(zsourcename);
		var ztarget = scene.getMeshByID(ztargetname);
		if (zsource != null && ztarget != null) {
			var zline = scene.getMeshByID("zline");
			if (zline != null) {
				zline.dispose();
			}
			var dx = ztarget.position.x - zsource.position.x;
			var dz = ztarget.position.z - zsource.position.z;
			var zlinecolors = [];
			zlinecolors.push(new BABYLON.Color4(0, 1, 0, 1));
			zlinecolors.push(new BABYLON.Color4(0, 1, 0, 1));
			var zlinepath = [];
			zlinepath.push(new BABYLON.Vector3(zsource.position.x, .5, zsource.position.z));
			zlinepath.push(new BABYLON.Vector3(ztarget.position.x, .5, ztarget.position.z));
			zline = BABYLON.MeshBuilder.CreateLines("zline", {points: zlinepath, colors: zlinecolors, useVertexAlpha: true, updatable: true}, scene);
			var zlineangleradians = -Math.atan2(dz,dx);
			var zlineangledegrees = WTW.getDegrees(zlineangleradians);
			var zsourcedegrees = WTW.getDegrees(zsource.rotation.y);
			var dir = 1;
			if (zlineangledegrees < 180 && zsourcedegrees > zlineangledegrees && zsourcedegrees < zlineangledegrees + 180) {
				dir = -1;
			} else if (zlineangledegrees > 180 && zsourcedegrees < zlineangledegrees - 180) {
				dir = - 1;
			} else if (zsourcedegrees > zlineangledegrees && zlineangledegrees > zsourcedegrees - 180) {
				dir = - 1;
			}
			if (zlineangledegrees > zsourcedegrees && zlineangledegrees - zsourcedegrees < zdegreeincrement) {
				zdegreeincrement = zlineangledegrees - zsourcedegrees;
			}
			if (zsourcedegrees > zlineangledegrees && zsourcedegrees - zlineangledegrees < zdegreeincrement) {
				zdegreeincrement = zsourcedegrees - zlineangledegrees;
			}
			if (zsourcedegrees != zlineangledegrees) {
				zsource.rotation.y = WTW.getRadians(zsourcedegrees + (dir * zdegreeincrement));
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-rotateToTarget=" + ex.message);
	}
}

WTWJS.prototype.rotatePoint = function(cx, cz, px, pz, rad) {
	/* in a plane, rotate a point (x,z) around a center (cx, cz) */
	var nx = px;
	var nz = pz;
	try {
		var cos = Math.cos(rad);
		var sin = Math.sin(rad);
		nx = (cos * (px - cx)) + (sin * (pz - cz)) + cx;
		nz = (cos * (pz - cz)) - (sin * (px - cx)) + cz;
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-rotatePoint=" + ex.message);
	}
    return {
		nx:nx,
		nz:nz
	};
}

WTWJS.prototype.getMyAngleToPoint = function(x,z) {
	/* calculate an angle from my avatar heading to a given point in a horizontal plane */
	var zangle = 0;
	try {
		var px = WTW.myAvatar.position.x;
		var pz = WTW.myAvatar.position.z;
		var avatarangle = WTW.getDegrees(WTW.myAvatar.rotation.y);
		var buildingangle = WTW.getAngleToPoint(px, pz, x, z);
		zangle = WTW.cleanDegrees(avatarangle + buildingangle);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getMyAngleToPoint=" + ex.message);
	}
	return zangle;
}

WTWJS.prototype.getAngleToPoint = function(cx, cz, px, pz) {
	/* calculate an angle from point (cx,cz) assumed 0 angle - to a given point (px,pz) in a horizontal plane */
	var pointangle = 0;
	try {
		var dz = pz - cz;
		var dx = px - cx;
		var pointangle = Math.atan2(dz, dx);
		pointangle *= 180 / Math.PI;
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getAngleToPoint=" + ex.message);
	}
	return pointangle;
}

WTWJS.prototype.getDirectionVector = function(zsourcename, zdegreeoffset) {
	/* get a directional vector from a source mold name in the direction offset (example: direction vector for 40 degrees from the source) */
	var zdirection = null;
	try {
		if (zdegreeoffset == undefined) {
			zdegreeoffset = 0;
		}
		var zsource = scene.getMeshByID(zsourcename);
		if (zsource != null) {
			var rot = WTW.getRadians(WTW.getDegrees(zsource.rotation.y) + zdegreeoffset);
			var positionx = zsource.position.x + (Math.cos(rot) * 10.5);
			var positionz = zsource.position.z - (Math.sin(rot) * 10.5);
			zdirection = new BABYLON.Vector3(positionx, 0, positionz);
			var zlineangleradians = -Math.atan2(dz,dx);
			var zlineangledegrees = WTW.getDegrees(zlineangleradians);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getDirectionVector=" + ex.message);
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
		var zsource = scene.getMeshByID(zsourcename);
		if (zsource != null) {
			var zdist = 200;
			var rot = WTW.getRadians(WTW.getDegrees(zsource.rotation.y) + zdegreeoffset);
			var positionx = zsource.position.x + (Math.cos(rot) * zdist);
			var positionz = zsource.position.z - (Math.sin(rot) * zdist);
			var zdirection = new BABYLON.Vector3(positionx, zsource.position.y, positionz);
			zmove = new BABYLON.Vector3(parseFloat(Math.cos(rot)) * zstride, 0, -parseFloat(Math.sin(rot)) * zstride);
			var raystart = new BABYLON.Vector3(zsource.position.x, zsource.position.y, zsource.position.z);
			var ray = new BABYLON.Ray(raystart, zdirection, zdist);
			var hits = scene.multiPickWithRay(ray);
			var dist = 100;
			var moldname = '';
			for (var i=0; i<hits.length; i++){
				if (hits[i].pickedMesh.name.indexOf("molds-") > -1) {
					if (hits[i].distance < dist) {
						dist = hits[i].distance;
						moldname = hits[i].pickedMesh.name;
						
					}
				}
			}
			var slope = 0;
			var mold = scene.getMeshByID(moldname);
			if (mold != null) {
				var raystart2 = new BABYLON.Vector3(zsource.position.x, zsource.position.y+.2, zsource.position.z);
				var ray2 = new BABYLON.Ray(raystart2, zdirection, zdist);
				var hits2 = scene.multiPickWithRay(ray2);
				var dist2 = 100;
				for (var i=0; i<hits2.length; i++){
					if (hits2[i].pickedMesh.name == moldname) {
						if (hits2[i].distance < dist2) {
							dist2 = hits2[i].distance;
						}
					}
				}
				slope = (Math.abs(dist2)-Math.abs(dist))/.2;
			}
			if (zsource.WTW != undefined) {
				if (zevent.indexOf('jump') > -1) {
					zmove = new BABYLON.Vector3(parseFloat(Math.cos(rot)) * zstride, 0, -parseFloat(Math.sin(rot)) * zstride);
					zsource.WTW.lastupdate = true;
				} else if (dist < 2 && slope < .2) {
					zmove = new BABYLON.Vector3(parseFloat(Math.cos(rot)) * zstride, 1.1, -parseFloat(Math.sin(rot)) * zstride);
					zsource.WTW.lastupdate = true;
				} else if (dist < 5 && (slope > 3 || slope == 0)) {
					zmove = new BABYLON.Vector3(parseFloat(Math.cos(rot)) * zstride, 0, -parseFloat(Math.sin(rot)) * zstride);
					zsource.WTW.lastupdate = true;
				} else {
					if (zsource.WTW.lastupdate) {
						zmove = new BABYLON.Vector3(parseFloat(Math.cos(rot)) * zstride, 0, -parseFloat(Math.sin(rot)) * zstride);
						zsource.WTW.lastupdate = false;
					} else {
						zmove = new BABYLON.Vector3(parseFloat(Math.cos(rot)) * zstride, -WTW.init.gravity, -parseFloat(Math.sin(rot)) * zstride);
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getMoveVector=" + ex.message);
	}
	return zmove;
}

WTWJS.prototype.getMoveDownVector = function(zsourcename, zstride) {
	/* similar to move vector above, but applies gravity with the movement */
	var zmove = null;
	try {
		var zsource = scene.getMeshByID(zsourcename);
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
				if (zhits1[i].pickedMesh.name.indexOf("molds-") > -1 || zhits1[i].pickedMesh.name == 'communityeground') {
					if (zhits1[i].distance < zdist1) {
						zdist1 = zhits1[i].distance;
					}
				}
			}
			for (var i=0; i<zhits2.length; i++){
				if (zhits2[i].pickedMesh.name.indexOf("molds-") > -1 || zhits2[i].pickedMesh.name == 'communityeground') {
					if (zhits2[i].distance < zdist2) {
						zdist2 = zhits2[i].distance;
					}
				}
			}
			for (var i=0; i<zhits3.length; i++){
				if (zhits3[i].pickedMesh.name.indexOf("molds-") > -1 || zhits3[i].pickedMesh.name == 'communityeground') {
					if (zhits3[i].distance < zdist3) {
						zdist3 = zhits3[i].distance;
					}
				}
			}
			for (var i=0; i<zhits4.length; i++){
				if (zhits4[i].pickedMesh.name.indexOf("molds-") > -1 || zhits4[i].pickedMesh.name == 'communityeground') {
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
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getMoveDownVector=" + ex.message);
	}
	return zmove;
}

WTWJS.prototype.getNewPoint = function(x, z, angle, distance) {
	/* from any point (x,z) get a new point on the plane for an angle at a distance (rounded) */
    var result = {};
	try {
		result.x = Math.round(Math.cos((Math.PI / 2 - WTW.getRadians(angle))) * distance + x);
		result.z = Math.round(Math.sin((Math.PI / 2 - WTW.getRadians(angle))) * distance + z);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getNewPoint=" + ex.message);
	}
    return result;
}

WTWJS.prototype.getNewPointDecimal = function(x, z, angle, distance) {
	/* from any point (x,z) get a new point on the plane for an angle at a distance (not rounded) */
    var result = {};
	try {
		result.x = Math.cos((Math.PI / 2 - WTW.getRadians(angle))) * distance + x;
		result.z = Math.sin((Math.PI / 2 - WTW.getRadians(angle))) * distance + z;
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getNewPointDecimal=" + ex.message);
	}
    return result;
}

WTWJS.prototype.adjustOffset = function(zmoldname, zorientation, zdirection, zvalue) {
	/* make adjustments to an offset for parenting objects */
	/* example: avatar picks up a 3D Object and adjusts the position and rotation in their hand */
	try {
		var zmold = scene.getMeshByID(zmoldname);
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
		WTW.log("core-scripts-prime-wtw_utilities.js-adjustOffset=" + ex.message);
	}
}

WTWJS.prototype.transformPosition = function(molddef, posx, posy, posz) {
	/* transform position when a mold is added that uses an action zone as a parent (like swinging doors) */
	try {
		if (molddef.actionzoneid != "") {
			for (var j = 0; j < WTW.actionZones.length; j++) {
				if (WTW.actionZones[j] != null) {
					if (WTW.actionZones[j].actionzoneid == molddef.actionzoneid && (WTW.actionZones[j].actionzonetype == "door" || WTW.actionZones[j].actionzonetype == "slidingdoor" || WTW.actionZones[j].actionzonetype == "clickactivatedslidingdoor" || WTW.actionZones[j].actionzonetype == "swingingdoor" || WTW.actionZones[j].actionzonetype == "rotate" || WTW.actionZones[j].actionzonetype == "elevator" || WTW.actionZones[j].actionzonetype == "driverturnangle" || WTW.actionZones[j].actionzonetype == "driverturningwheel" || WTW.actionZones[j].actionzonetype == "driverwheel")) {
						var actionzoneaxlebase = scene.getMeshByID("actionzoneaxlebase-" + j.toString() + "-" + WTW.actionZones[j].actionzoneid + "-" + WTW.actionZones[j].connectinggridind + "-" + WTW.actionZones[j].connectinggridid + "-" + WTW.actionZones[j].actionzonetype);
						if (actionzoneaxlebase != null) {
							posx -= actionzoneaxlebase.position.x;
							posy -= actionzoneaxlebase.position.y;
							posz -= actionzoneaxlebase.position.z;
							//rotx -= WTW.getDegrees(actionzoneaxlebase.rotation.x);
							//roty -= WTW.getDegrees(actionzoneaxlebase.rotation.y);
							//rotz -= WTW.getDegrees(actionzoneaxlebase.rotation.z);
						}
						if (WTW.actionZones[j].parentactionzoneid != "") {
							var parentactionzoneind = WTW.getActionZoneInd(WTW.actionZones[j].parentactionzoneid, WTW.actionZones[j].connectinggridind);
							var parentactionzoneaxlebasename = "actionzoneaxlebase-" + parentactionzoneind.toString() + "-" + WTW.actionZones[parentactionzoneind].actionzoneid + "-" + WTW.actionZones[parentactionzoneind].connectinggridind + "-" + WTW.actionZones[parentactionzoneind].connectinggridid + "-" + WTW.actionZones[parentactionzoneind].actionzonetype;
							var parentactionzoneaxlebase = scene.getMeshByID(parentactionzoneaxlebasename);
							if (parentactionzoneaxlebase == null) {
								WTW.addActionZone(parentactionzoneaxlebasename.replace("actionzoneaxlebase-","actionzone-"), WTW.actionZones[parentactionzoneind]);
								parentactionzoneaxlebase = scene.getMeshByID(parentactionzoneaxlebasename);
							}
							if (parentactionzoneaxlebase != null) {
								posx -= parentactionzoneaxlebase.position.x;
								posy -= parentactionzoneaxlebase.position.y;
								posz -= parentactionzoneaxlebase.position.z;
								//rotx -= WTW.getDegrees(parentactionzoneaxlebase.rotation.x);
								//roty -= WTW.getDegrees(parentactionzoneaxlebase.rotation.y);
								//rotz -= WTW.getDegrees(parentactionzoneaxlebase.rotation.z);
							}
						}
					} else if (WTW.actionZones[j].actionzoneid == molddef.actionzoneid && WTW.actionZones[j].actionzonetype == "peoplemover") {
						var actionzoneaxlebase = scene.getMeshByID("actionzoneaxlebase-" + j.toString() + "-" + WTW.actionZones[j].actionzoneid + "-" + WTW.actionZones[j].connectinggridind + "-" + WTW.actionZones[j].connectinggridid + "-" + WTW.actionZones[j].actionzonetype);
						if (actionzoneaxlebase != null) {
							posx -= actionzoneaxlebase.position.x;
							posy -= actionzoneaxlebase.position.y;
							posz -= actionzoneaxlebase.position.z;
						}
					} else if (WTW.actionZones[j].actionzoneid == molddef.actionzoneid && WTW.actionZones[j].actionzonetype.indexOf("seat") > -1) {
						var actionzoneaxlebase = scene.getMeshByID("actionzoneaxlebase-" + j.toString() + "-" + WTW.actionZones[j].actionzoneid + "-" + WTW.actionZones[j].connectinggridind + "-" + WTW.actionZones[j].connectinggridid + "-" + WTW.actionZones[j].actionzonetype);
						if (actionzoneaxlebase != null) {
							posx -= actionzoneaxlebase.position.x;
							posy -= actionzoneaxlebase.position.y;
							posz -= actionzoneaxlebase.position.z;
						}
					}
				}
			}	
		}					
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-transformPosition=" + ex.message);
	} 
	return {
		posx: posx,
		posy: posy,
		posz: posz
	}
}

WTWJS.prototype.distance = function(zx0,zy0,zz0,zx1,zy1,zz1) {
	/* distance between 2 points in 3d space */
	var distance = 0;
	try {
		var x0 = Number(zx0);
		var y0 = Number(zy0);
		var z0 = Number(zz0);
		var x1 = Number(zx1);
		var y1 = Number(zy1);
		var z1 = Number(zz1);
		deltaX = x1 - x0;
		deltaY = y1 - y0;
		deltaZ = z1 - z0;
		distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-distance=" + ex.message);
	}
	return distance;
}

WTWJS.prototype.getMyDistance = function(sx1,sy1,sz1) {
	/* distance form point to my avatar current position */
	var distance = 0;
	try {
		if (WTW.myAvatar != null) {
			var x0 = WTW.myAvatar.position.x;
			var y0 = WTW.myAvatar.position.y;
			var z0 = WTW.myAvatar.position.z;
			var x1 = Number(sx1);
			var y1 = Number(sy1);
			var z1 = Number(sz1);
			deltaX = x1 - x0;
			deltaY = y1 - y0;
			deltaZ = z1 - z0;
			distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getMyDistance=" + ex.message);
	}
	return distance;
}

WTWJS.prototype.getBuildingDistance = function(bx, by, bz, posx, posy, posz, brotx, broty, brotz) {
	/* distance form my avatar to a particular building */
	var distance = 0;
	try {
		var x0 = WTW.myAvatar.position.x;
		var y0 = WTW.myAvatar.position.y;
		var z0 = WTW.myAvatar.position.z;
		var deltax = (-Math.sin((Math.PI / 2 - WTW.getRadians(broty))) * posx + Math.cos((Math.PI / 2 - WTW.getRadians(broty))) * posz + bx - x0);
		var deltaz = (Math.sin((Math.PI / 2 - WTW.getRadians(broty))) * posz + -Math.cos((Math.PI / 2 - WTW.getRadians(broty))) * posx + bz - z0);
		var deltay = Number(posy) + by - y0;
		distance = Math.sqrt(deltax * deltax + deltaz * deltaz + deltay * deltay);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getBuildingDistance=" + ex.message);
	}
	return distance;
}


/* get or set parent object */

WTWJS.prototype.getParentName = function(connectinggridind) {
	/* get a parent name (Connecting Grid) based on the index in the array of loaded Connecting Grids */
	var parentname = "";
	try {
		if (WTW.isNumeric(connectinggridind)) {
			if (WTW.connectingGrids[connectinggridind] != null) {
				parentname = WTW.connectingGrids[connectinggridind].moldname;
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getParentName=" + ex.message);
	}
	return parentname;	
}

WTWJS.prototype.getParentActionZoneName = function(actionzoneind, connectinggridind) {
	/* get the Parent Name of a mold that parents an Action Zone (example part of a door) */
	var parentname = "";
	try {
		if (WTW.isNumeric(actionzoneind)) {
			if (WTW.actionZones[actionzoneind] != null) {
				parentname = WTW.actionZones[actionzoneind].moldname.replace("actionzone-", "actionzoneaxlebase2-");
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getParentActionZoneName=" + ex.message);
	}
	return parentname;
}

WTWJS.prototype.attachParent = function(child, parent) {
	/* work in progress - attach to new parent and recalculate the transition position, rotation, and scaling for consistency */
	var rotation = BABYLON.Quaternion.Identity();
	var position = BABYLON.Vector3.Zero();
	var m1 = BABYLON.Matrix.Identity();
	var m2 = BABYLON.Matrix.Identity();
	parent.getWorldMatrix().decompose(BABYLON.Vector3.Zero(), rotation, position);
	rotation.toRotationMatrix(m1);
	m2.setTranslation(position);
	m2.multiplyToRef(m1, m1);
	var invParentMatrix = BABYLON.Matrix.Invert(m1);
	var m = child.getWorldMatrix().multiply(invParentMatrix);
	m.decompose(BABYLON.Vector3.Zero(), child.rotationQuaternion, position);
	invParentMatrix = BABYLON.Matrix.Invert(parent.getWorldMatrix());
	var m = child.getWorldMatrix().multiply(invParentMatrix);
	m.decompose(BABYLON.Vector3.Zero(), BABYLON.Quaternion.Identity(), position);
	child.position.x = position.x * parent.scaling.x;
	child.position.y = position.y * parent.scaling.y;
	child.position.z = position.z * parent.scaling.z;
	if (parent.scaling.x != 1 || parent.scaling.y != 1 || parent.scaling.z != 1) {
		var children = parent.getChildren();
		var scaleFixMesh;
		for (var i = 0; i < children.length; i++) {
			if (children[i].name == 'scaleFixMesh') {
				scaleFixMesh = children[i];
				break;
			}
		}
		if (scaleFixMesh == undefined) {
			scaleFixMesh = new BABYLON.Mesh('scaleFixMesh', parent.getScene());
			scaleFixMesh.parent = parent;
		}
		scaleFixMesh.scaling.x = 1 / parent.scaling.x;
		scaleFixMesh.scaling.y = 1 / parent.scaling.y;
		scaleFixMesh.scaling.z = 1 / parent.scaling.z;
		child.parent = scaleFixMesh;
	} else {
		child.parent = parent;
	}
}

WTWJS.prototype.detachParent = function(object, parent) {
	/* work in progress - deattach to new parent and recalculate the transition position, rotation, and scaling for consistency */
/*  //var parentMatrix = Matrix.Invert(parent.getWorldMatrix());  
  var newMatrix = object.getWorldMatrix(); //.multiply(parentMatrix);
  object.parent = null;
  object.getAbsolutePosition()
  newMatrix.decompose(object.scaling, object.rotationQuaternion, object.position);
 */ 
	object.computeWorldMatrix(true);
	var abspos = object.getAbsolutePosition();
	object.parent = null;
	object.setAbsolutePosition(abspos);
}

WTWJS.prototype.getMoldConnectingGrid = function(zmoldname) {
	/* gets the name of the connecting grid (most parent) of the mold */
	/* connecting grid defines the web object (3D Community, 3D Building, or 3D Thing) that the mold is from */
	try {
		var zmold = scene.getMeshByID(zmoldname);
		if (zmold != null) {
			if (zmold.name.indexOf("communitymolds") > -1 && communityid == "") {
				while (zmold.name.indexOf("connectinggrids") == -1) {
					zmold = zmold.parent;
				}
			} else if (zmold.name.indexOf("buildingmolds") > -1 && buildingid == "") {
				while (zmold.name.indexOf("connectinggrids") == -1) {
					zmold = zmold.parent;
				}
			} else if (zmold.name.indexOf("thingmolds") > -1 && thingid == "") {
				while (zmold.name.indexOf("connectinggrids") == -1) {
					zmold = zmold.parent;
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getMoldConnectingGrid=" + ex.message);
    }
	return zmold;
}

WTWJS.prototype.getMoldBase = function(mold) {
	/* some molds (3D Models) are made up of multiple meshes */
	/* this process gets the base (parent mold) for the 3D Object model */
	/* the base (parent mold) is used to scale and place the 3D Model as a whole to the web object (just like a connecting grid) */
	try {
		var moldname = mold.name;
		if (mold.parent != null) {
			var moldnameparts = WTW.getMoldnameParts(moldname);
			var moldparent = mold.parent;
			var parentnameparts = WTW.getMoldnameParts(moldparent.name);
			while (moldnameparts.moldnamebase == parentnameparts.moldnamebase && mold.parent != null) {
				mold = moldparent;
				moldparent = moldparent.parent;
				parentnameparts = WTW.getMoldnameParts(moldparent.name);
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getMoldBase=" + ex.message);
	}
	return mold;
}


/* get or set web name (3D Community, 3D Building, or 3D Thing) */

WTWJS.prototype.getCommunityName = function(zcommunityid) {
	/* get community name for a given community id (all instances use the same name) */
	var zcommunityname = "";
	try {
		if (WTW.communities != null && zcommunityid !== "") {
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
		WTW.log("core-scripts-prime-wtw_utilities.js-getCommunityName=" + ex.message);
	}
	return zcommunityname;
}

WTWJS.prototype.getBuildingName = function(zbuildingid) {
	/* get building name for a given building id (all instances use the same name) */
	var zbuildingname = "";
	try {
		if (WTW.buildings != null && zbuildingid !== "") {
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
		WTW.log("core-scripts-prime-wtw_utilities.js-getBuildingName=" + ex.message);
	}
	return zbuildingname;
}

WTWJS.prototype.getNameFromConnectingGrid = function(zwebid) {
	/* get hte name of a community, building, or thing by the connecting grid (instance) */
	var zwebname = "";
	try {
		if (WTW.connectingGrids != null && zwebid !== "") {
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
		WTW.log("core-scripts-prime-wtw_utilities.js-getNameFromConnectingGrid=" + ex.message);
	}
	return zwebname;
}

WTWJS.prototype.getThingName = function(zthingid) {
	/* get thing name for a given thing id (all instances use the same name) */
	var zthingname = "";
	try {
		if (WTW.things != null && zthingid !== "") {
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
		WTW.log("core-scripts-prime-wtw_utilities.js-getThingName=" + ex.message);
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
				zclosestwebname = "3D Thing";
				zclosestwebtype = 'Thing';
				zclosestwebid = thingid;
			}
		} else if (buildingid != "") {
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
					zclosestwebname = "3D Building";
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
									if (WTW.connectingGrids[i].buildinginfo.buildingname != "" && WTW.connectingGrids[i].buildinginfo.buildingname != undefined && WTW.connectingGrids[i].buildinginfo.buildingname != null) {
										zclosestwebname = WTW.decode(WTW.connectingGrids[i].buildinginfo.buildingname);
									} else if (WTW.buildingName != "") {
										zclosestwebname = WTW.decode(WTW.buildingName);
									} else {
										zclosestwebname = "Walk the Web!";
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
				if (zclosestwebname != "") {
					dGet('wtw_showbuildingname').innerHTML = zclosestwebname;
					dGet('wtw_showbuildingname').style.cursor = 'pointer';
					WTW.showInline('wtw_showbuildingname');
				}
			}
			if (WTW.editBuildingAccess != undefined) {
				if (WTW.adminView == 0 && ((WTW.editBuildingAccess.indexOf(dGet('wtw_tuserid').value) > -1 && zclosestwebtype == 'Building') || (zclosestaccess.indexOf(dGet('wtw_tuserid').value) > -1 && zclosestwebtype == 'Thing')) && dGet('wtw_tuserid').value != '') {
					dGet('wtw_modebuilding').alt = "Edit " + zclosestwebtype;
					dGet('wtw_modebuilding').title = "Edit " + zclosestwebtype;
					switch (zclosestwebtype) {
						case "Thing":
							dGet('wtw_modebuilding').src = "/content/system/images/menuthings32.png";
							break;
						case "Community":
							dGet('wtw_modebuilding').src = "/content/system/images/menucommunities32.png";
							break;
						default:
							dGet('wtw_modebuilding').src = "/content/system/images/menubuildings32.png";
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
					WTW.showInline('wtw_modebuilding');
				} else if (WTW.adminView == 1) {
					dGet('wtw_modebuilding').src = "/content/system/images/menuedit32.png";
					var zreturnpath1 = '';
					if (dGet('wtw_returnpath') != null) {
						zreturnpath1 = dGet('wtw_returnpath').value;
					}
					if (zreturnpath1 != '') {
						dGet('wtw_modebuilding').alt = "Return to 3D Website";
						dGet('wtw_modebuilding').title = "Return to 3D Website";
					} else {
						dGet('wtw_modebuilding').alt = "View " + zclosestwebtype;
						dGet('wtw_modebuilding').title = "View " + zclosestwebtype;
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
					WTW.showInline('wtw_modebuilding');
				} else {
					WTW.hide('wtw_modebuilding');
				}
			}
			if (WTW.editCommunityAccess != undefined) {
				if (WTW.adminView == 0 && communityid != '' && WTW.editCommunityAccess.indexOf(dGet('wtw_tuserid').value) > -1 && dGet('wtw_tuserid').value != '') {
					if (dGet('wtw_showcommunityname') != null) {
						dGet('wtw_showcommunityname').innerHTML = WTW.communityName;
						dGet('wtw_showcommunityname').style.cursor = 'pointer';
					}
					dGet('wtw_modecommunity').alt = "Edit Community";
					dGet('wtw_modecommunity').title = "Edit Community";
					dGet('wtw_modecommunity').src = "/content/system/images/menucommunities32.png";
					dGet('wtw_modecommunity').onclick = function() {
						var zreturnpath = window.location.href;
						if (zclosestwebid != '') {
							window.location.href = '/admin.php?communityid=' + communityid + '&returnpath=' + zreturnpath;
						} else {
							window.location.href = '/admin.php';
						}
					}
					WTW.showInline('wtw_modecommunity');		
				} else if (WTW.adminView == 1 && communityid != '') {
					if (dGet('wtw_showcommunityname') != null) {
						dGet('wtw_showcommunityname').innerHTML = WTW.communityName;
						dGet('wtw_showcommunityname').style.cursor = 'pointer';
					}
					dGet('wtw_modecommunity').src = "/content/system/images/menuedit32.png";
					var zreturnpath1 = '';
					if (dGet('wtw_returnpath') != null) {
						zreturnpath1 = dGet('wtw_returnpath').value;
					}
					if (zreturnpath1 != '') {
						dGet('wtw_modecommunity').alt = "Return to 3D Website";
						dGet('wtw_modecommunity').title = "Return to 3D Website";
					} else {
						dGet('wtw_modecommunity').alt = "View 3D Community";
						dGet('wtw_modecommunity').title = "View  3D Community";
					}
					dGet('wtw_modecommunity').onclick = function() {
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
				} else {
					WTW.hide('wtw_modecommunity');
				}
			}
			WTW.closestWebID = zclosestwebid;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-setClosestBuilding=" + ex.message);
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
		WTW.log("core-scripts-prime-wtw_utilities.js-isInArray=" + ex.message);
	}
	return zinarray;
}

WTWJS.prototype.isItemInArray = function(sarray, checkid, connectinggridind, altconnectinggridind, moldgroup) {
	/* boolean - check if an id is in a given array, with consideration to being the same connecting grid and mold group */
	/* each different connecting grid means a new instance of an object - so the id can be in the array more than once from different connecting grids (instances) in the same 3D Scene */
	/* Example, 4 of the same chairs around a table, each chair has the same design (id) but different instances with position, scaling, and rotation */
	var found = false;
	try {
		if (sarray != null && checkid != "") {
			for (var i = 0; i < sarray.length; i++) {
				if (sarray[i] != null) {
					if (sarray[i] != undefined) {
						if (moldgroup.indexOf("molds") > -1) {
							if (sarray[i].moldid != undefined) {
								if (sarray[i].moldid != undefined) {
									if (sarray[i].moldid == checkid && Number(sarray[i].connectinggridind) == Number(connectinggridind) && Number(sarray[i].altconnectinggridind) == Number(altconnectinggridind)) {
										found = true;
										i = sarray.length;
									}
								}
							}
						}
						if (moldgroup == "actionzones") {
							if (sarray[i].actionzoneid != undefined) {
								if (sarray[i].actionzoneid != undefined) {
									if (sarray[i].actionzoneid == checkid && Number(sarray[i].connectinggridind) == Number(connectinggridind)) {
										found = true;
										i = sarray.length;
									}
								}
							}
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-isItemInArray=" + ex.message);
	}
	return found;
}

WTWJS.prototype.isStepInAutomations = function(automationstepid, connectinggridind) {
	/* check for an existing step in an automation (example: check for next step) */
	var found = false;
	try {
		if (WTW.automations != null && automationstepid != "") {
			for (var i = 0; i < WTW.automations.length; i++) {
				if (WTW.automations[i] != null) {
					if (WTW.automations[i].step.automationstepid == automationstepid && WTW.automations[i].connectinggridind == connectinggridind) {
						found = true;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-isStepInAutomations=" + ex.message);
	}
	return found;
}

WTWJS.prototype.isUploadReady = function(uploadid) {
	/* has the uploaded item been loaded or is it still in process */
	var ready = false;
	try {
		if (wtw_uploads != null && uploadid != "") {
			for (var i = 0; i < wtw_uploads.length; i++) {
				if (wtw_uploads[i] != null) {
					if (wtw_uploads[i].uploadid == uploadid && wtw_uploads[i].queue == '0') {
						ready = true;
						i = wtw_uploads.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-isUploadReady=" + ex.message);
	}
	return ready;
}

WTWJS.prototype.isUploadAdded = function(uploadid) {
	/* add an upload object to the upload array */
	var found = false;
	try {
		if (wtw_uploads != null && uploadid != "") {
			for (var i = 0; i < wtw_uploads.length; i++) {
				if (wtw_uploads[i] != null) {
					if (wtw_uploads[i].uploadid == uploadid) { 
						found = true;
						i = wtw_uploads.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-isUploadAdded=" + ex.message);
	}
	return found;
}

WTWJS.prototype.isUploadInQueue = function(uploadid) {
	/* see if uplaod is queued to be loaded */
	var found = false;
	try {
		if (wtw_uploads != null && uploadid != "") {
			for (var i = 0; i < wtw_uploads.length; i++) {
				if (wtw_uploads[i] != null) {
					if (wtw_uploads[i].uploadid == uploadid && wtw_uploads[i].queue == "1") { 
						found = true;
						i = wtw_uploads.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-isUploadInQueue=" + ex.message);
	}
	return found;
}

/* find and return index */
WTWJS.prototype.indexInArray = function(array, stext) {
	/* integer - return the Array index value where stext is found in the array */
	var indexinarray = -1;
	try {
		if (array != null) {
			if (array.length > 0) {
				for (var i=0;i<array.length;i++) {
					if (array[i] != null) {
						if (array[i] == stext) {
							indexinarray = i;
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-indexInArray=" + ex.message);
	}
	return indexinarray;
}

WTWJS.prototype.getNextCount = function(listarray) {
	/* get next available index for an array */
	/* values were set to null instead of splice to preserve instance (index) for other items */
	/* null values found are next available or new index is added if needed */
	var nextcount = -1;
	try {
		if (listarray != null) {
			for (var i = 0; i < listarray.length; i++) {
				if (listarray[i] == null && nextcount == -1) {
					nextcount = i;
				}
			}
			if (nextcount == -1) {
				nextcount = listarray.length;
			}
		} else {
			nextcount = 0;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getNextCount=" + ex.message);
	}
	return nextcount;
}

WTWJS.prototype.getMoldInd = function(molds, moldid, connectinggridind) {
	/* get Mold Index from an array of molds using the moldID (gets definition) and Connecting Grid (gets instance) */
	var moldind = -1;
	try {
		if (molds != null && moldid != "") {
			for (var i = 0; i < molds.length; i++) {
				if (molds[i] != null) {
					if (molds[i].moldid == moldid && connectinggridind == molds[i].connectinggridind) {
						moldind = i;
						i = molds.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getMoldInd=" + ex.message);
	}
	return moldind;
}

WTWJS.prototype.getAltMoldInd = function(molds, moldid, altconnectinggridind) {
	/* get Mold Index from an array of molds using the moldID (gets definition) and Alternate Connecting Grid (gets instance) */
	var moldind = -1;
	try {
		if (molds != null && moldid != "") {
			for (var i = 0; i < molds.length; i++) {
				if (molds[i] != null) {
					if (molds[i].moldid == moldid && altconnectinggridind == molds[i].altconnectinggridind) {
						moldind = i;
						i = molds.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getAltMoldInd=" + ex.message);
	}
	return moldind;
}

WTWJS.prototype.getUploadInd = function(uploadid) {
	/* get upload index for an upload definition */
	var uploadind = -1;
	try {
		if (wtw_uploads != null && uploadid != "") {
			for (var i = 0; i < wtw_uploads.length; i++) {
				if (wtw_uploads[i] != null) {
					if (wtw_uploads[i].uploadid == uploadid) {
						uploadind = i;
						i = wtw_uploads.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getUploadInd=" + ex.message);
	}
	return uploadind;
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
		WTW.log("core-scripts-prime-wtw_utilities.js-getThingInd=" + ex.message);
	}
	return zthingind;
}

WTWJS.prototype.getBuildingInd = function(zbuildingid) {
	/* get thing Index for a building (not concerned with instance) */
	var zbuildingind = -1;
	try {
		if (WTW.buildings != null && zbuildingid !== "") {
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
		WTW.log("core-scripts-prime-wtw_utilities.js-getBuildingInd=" + ex.message);
	}
	return zbuildingind;
}

WTWJS.prototype.getCommunityInd = function(zcommunityid) {
	/* get thing Index for a community (not concerned with instance) */
	var zcommunityind = -1;
	try {
		if (WTW.communities != null && zcommunityid != "") {
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
		WTW.log("core-scripts-prime-wtw_utilities.js-getCommunityInd=" + ex.message);
	}
	return zcommunityind;
}

WTWJS.prototype.getConnectingGridInd = function(zconnectinggridid) {
	/* get thing Index for a connecting grid (connecting grids create the instance) */
	var zconnectinggridind = -1;
	try {
		if (WTW.connectingGrids != null && zconnectinggridid != "") {
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
		WTW.log("core-scripts-prime-wtw_utilities.js-getConnectingGridInd=" + ex.message);
	}
	return zconnectinggridind;
}

WTWJS.prototype.getActionZoneInd = function(zactionzoneid, connectinggridind) {
	/* get action zone Index by id and connecting grid (connecting grids create the instance) */
	var zactionzoneind = -1;
	try {
		if (WTW.actionZones != null && zactionzoneid != "") {
			for (var i = 0; i < WTW.actionZones.length; i++) {
				if (WTW.actionZones[i] != null) {
					if (WTW.actionZones[i].actionzoneid == zactionzoneid && Number(WTW.actionZones[i].connectinggridind) == Number(connectinggridind)) {
						zactionzoneind = i;
						i = WTW.actionZones.length;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-getActionZoneInd=" + ex.message);
	}
	return zactionzoneind;
}

/* add to array */
WTWJS.prototype.setUploadInQueue = function(uploadid, value) {
	/* add upload to queue */
	try {
		var found = -1;
		if (wtw_uploads != null && uploadid != "") {
			for (var i = 0; i < wtw_uploads.length; i++) {
				if (wtw_uploads[i] != null) {
					if (wtw_uploads[i].uploadid == uploadid) {
						wtw_uploads[i].queue = value;
						found = i;
					}
				}
			}
		}
		if (found == -1 && value == "1") {
			var uploadind = WTW.getNextCount(wtw_uploads);
			wtw_uploads[uploadind] = WTW.newUpload();
			wtw_uploads[uploadind].uploadid = uploadid;
			wtw_uploads[uploadind].queue = "1";
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-setUploadInQueue=" + ex.message);
	}
}

/* delete from array (splice or null the value) */
WTWJS.prototype.deleteIdFromArray = function(array, stext) {
	/* remove a select id from a given Array */
	try {
		if (array != null) {
			if (array.length > 0) {
				for (var i=array.length;0>array.length;i--) {
					if (array[i] != null) {
						if (array[i].id == stext) {
							array.splice(i,1);
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_utilities.js-deleteIdFromArray=" + ex.message);
	}
}


/* physics engine related functions */

WTWJS.prototype.createJoint = function(imp1, imp2, distanceBetweenPoints) {
	/* joints used by physics engine that relatively connect molds */
	try {
		var joint = new BABYLON.DistanceJoint({
			maxDistance: distanceBetweenPoints
		})
		imp1.addJoint(imp2, joint);
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_utilities.js-createJoint=" + ex.message);
    }
}


/* get user capabilities (gpu, browser, etc...) */

WTWJS.prototype.getGPU = function() {
	/* check for user GPU capabilities */
    var zgpu = "high";
    try {
        var zgpustring;
        var zglinfo = canvas.getContext("experimental-webgl");
        var zscreenres = (screen.width * screen.height);
        var zdbgrenderinfo = null;

		if (zglinfo != null) {
			zdbgrenderinfo = zglinfo.getExtension("WEBGL_debug_renderer_info");
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
        WTW.log("core-scripts-prime-wtw_utilities.js-getGPU=" + ex.message);
    }
    return zgpu;
}

WTWJS.prototype.getBrowser = function() {
	/* check for user Browser capabilities */
    var zbrowser = "unknown";
    try {
        var zisopera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0; // Opera 8.0+
        var zisfirefox = typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
        var zissafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)); // Safari 3.0+ 
        var zischrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime); // Chrome 1+
		var zisedgechromium = zischrome && (navigator.userAgent.indexOf("Edg") != -1); // Edge (based on chromium) detection
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
        WTW.log("core-scripts-prime-wtw_utilities.js-getBrowser=" + ex.message);
    }
    return zbrowser;
}

WTWJS.prototype.getNVidia = function(zgpustr, zres) {
	/* check for user Video capabilities */
    var zresolution = "low";
    try {
        if (/GTX [5-9]\d{2}\s/i.test(zgpustr) || /GTX [1]\d{3}\s/i.test(zgpustr)) { // check this statement, maybe add one for gtx 5XX series breakdown 
            zresolution = "high"; // most powerfull desktop gpus from Nvidia since 2011
        } else if (/GTX [4-5]\d{2}[M]/i.test(zgpustr) && zres <= 2073600) {
            zresolution = "medium";
        } else if (/GTX [6-9]\d{2}[M]/i.test(zgpustr)) {
            zresolution = "high";
        } else if ((/GT [6-9]\d{2}\s/i.test(zgpustr) || /GeForce [6-9]\d{2}\s/i.test(zgpustr)) && zres <= 2073600) {
            zresolution = "medium";
        } else if ((/GT [6-9]\d{2}[M]/i.test(zgpustr) || /GeForce [6-9]\d{2}[M]/i.test(zgpustr)) && zres <= 2073600) {
            zresolution = "medium";
        }
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_utilities.js-getNVidia=" + ex.message);
    }
    return zresolution;
}

WTWJS.prototype.getIntel = function(zgpustr, zres) {
	/* check for user CPU capabilities */
    var zresolution = "low";
    try {
        if ((/HD Graphics \d{3}/i.test(zgpustr) || /Iris Graphics \d{3}/i.test(zgpustr)) && zres <= 2073600) { // if the resolution if 1080p or less
            zresolution = 'medium';
        } else if ((/Iris Pro \d{3}/i.test(zgpustr) || /Iris Pro \w{4}/i.test(zgpustr) || /Iris Pro Graphics \w{4}/i.test(zgpustr) || /Iris Graphics \w{4}/i.test(zgpustr)) && zres <= 2073600) { //Iris Pro 580
            zresolution = 'high'; /* "high" aka high shadows not ultimate shadows */
        }
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_utilities.js-getIntel=" + ex.message);
    }
    return zresolution;
}

WTWJS.prototype.getAMD = function(zgpustr, zres) {
	/* check for user CPU capabilities */
    var zresolution = "low";
    /* the amd card with R5-R9 may not be differentiated */
    try {
        if (/Radeon HD [6-8][8-9]\d{2}\w?/i.test(zgpustr)) {
            if (zres > 3686400) {
                zresolution = "medium";
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
        WTW.log("core-scripts-prime-wtw_utilities.js-getAMD=" + ex.message);
    }
    return zresolution;
}

WTWJS.prototype.getQualComm = function(zgpustr, zres) {
	/* check for user CPU capabilities */
    var zresolution = 'low';
    try {
         if (/Adreno [4-5][3-9]\d/i.test(zgpustr) && zres <= 2073600) {
            zresolution = "medium";
        }
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_utilities.js-getQualComm=" + ex.message);
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
        WTW.log("core-scripts-prime-wtw_utilities.js-getImagination=" + ex.message);
    }
    return zresolution;
}

WTWJS.prototype.getARM = function(zgpustr, zres) {
	/* check for user CPU capabilities */
    var zresolution = 'low';
    try {
        if (/(Mali|MALI)-T[8-9][6-8]\d/i.test(zgpustr) && zres <= 2073600) {
            zresolution = "medium";
        } else if (/(Mali|MALI)-G71\d/i.test(zgpustr) && zres <= 2073600) {
            zresolution = 'medium';
        }
    } catch (ex) {
        WTW.log("core-scripts-prime-wtw_utilities.js-getARM=" + ex.message);
    }
	return zresolution;
}


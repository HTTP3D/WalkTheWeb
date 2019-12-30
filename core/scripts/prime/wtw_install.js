/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

function WTWJS() {
	this.adminView = 0;
}
var WTW = new WTWJS();
var wtw_devmode = '1';

WTWJS.prototype.dGet = function(k) {
	return document.getElementById(k);
}

function dGet(k) {
	return document.getElementById(k);
}

WTWJS.prototype.log = function(txt,color) {
	if (wtw_devmode == '1') {
		if (color == undefined) {
			color = "black";
		}
		if (color.toLowerCase() == "black") {
			console.log(txt);
		} else {
			console.log("%c" + txt, "color:" + color + ";font-weight:bold;");
		}
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
		WTW.log("core-scripts-prime-wtw_install.js-getJSON=" + ex.message);
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
		WTW.log("core-scripts-prime-wtw_install.js-postJSON=" + ex.message);
	}
}

WTWJS.prototype.encode = function(value) {
	try {
		if (value != null) {
			while (value.indexOf('"') > -1) {
				value = value.replace(/"/g, '&quot;');
			}
			while (value.indexOf("'") > -1) {
				value = value.replace(/'/g, '&#039;');
			}
			while (value.indexOf("'") > -1) {
				value = value.replace(/'/g, '&#39;');
			}
			while (value.indexOf("<") > -1) {
				value = value.replace(/</g, '&lt;');
			}
			while (value.indexOf(">") > -1) {
				value = value.replace(/>/g, '&gt;');
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_install.js-encode=" + ex.message);
    }
    return String(value);
}

WTWJS.prototype.decode = function(value) {
	try {
		if (value != null) {
			while (value.indexOf('&amp;') > -1) {
				value = value.replace('&amp;', "&");
			}
			while (value.indexOf('&quot;') > -1) {
				value = value.replace('&quot;', '"');
			}
			while (value.indexOf("&#039;") > -1) {
				value = value.replace('&#039;', "'");
			}
			while (value.indexOf("&#39;") > -1) {
				value = value.replace('&#39;', "'");
			}
			while (value.indexOf("&lt;") > -1) {
				value = value.replace('&lt;', "<");
			}
			while (value.indexOf("&gt;") > -1) {
				value = value.replace('&gt;', ">");
			}
			while (value.indexOf("\\") > -1) {
				value = value.replace('\\', "");
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_install.js-decode=" + ex.message);
    }
    return String(value);
}

WTWJS.prototype.show = function(item) {
	try {
		if (dGet(item) != null) {
			dGet(item).style.display = 'block';
			dGet(item).style.visibility = 'visible';
			if (item.indexOf("wtw_adminmenu") > -1 && WTW.adminView == 1) {
				var menu = item.replace("wtw_adminmenu","");
				if (WTW.isNumeric(menu)) {
					WTW.adminMenu = Number(menu);
				}
			}
		}
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_install.js-show=" + ex.message);
	}
}

WTWJS.prototype.showInline = function(item) {
	try {
		if (dGet(item) != null) {
			dGet(item).style.display = 'inline-block';
			dGet(item).style.visibility = 'visible';
		}
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_install.js-showInline=" + ex.message);
	}
}

WTWJS.prototype.hide = function(item) {
	try {
		if (dGet(item) != null) {
			dGet(item).style.display = 'none';
			dGet(item).style.visibility = 'hidden';
		}
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_install.js-hide=" + ex.message);
	}
}

WTWJS.prototype.cleanInvalidCharacters = function(value) {
	try {
		if (value != null) {
			value = value.replace(/\\n/g, "\\n")  
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
			// remove non-printable and other non-valid JSON chars
			value = value.replace(/[\u0000-\u0019]+/g,""); 
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_install.js-cleanInvalidCharacters=" + ex.message);
    }
    return value;
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

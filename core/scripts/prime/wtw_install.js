/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are only used on the installation process. Some of these functions are later repeated in other files as needed (and can have modifications) */

/* initials the WTW JavaScript class */
function WTWJS() {
	this.adminView = 0;
}
var WTW = new WTWJS();
var wtw_devmode = '1';

function dGet(k) {
	/* function to simplify document.getElementById calls (outside the WTW class) */
	return document.getElementById(k);
}

WTWJS.prototype.dGet = function(k) {
	/* function to simplify document.getElementById calls (inside the WTW class - WTW.dGet() ) */
	return document.getElementById(k);
}

WTWJS.prototype.log = function(txt,color) {
	/* WTW.log() combines console.log and setting the color for the log */
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
			}
		};
		Httpreq.send(zrequest);  
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_install.js-getJSON=" + ex.message);
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
		WTW.log("core-scripts-prime-wtw_install.js-postJSON=" + ex.message);
	}
}

WTWJS.prototype.encode = function(value) {
	/* simplified version of escape text */
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
	/* decifer simplified version of escape text */
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
	/* show HTML element from its id */
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
	/* show HTML element inline-block from its id */
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
	/* hide HTML element from its id */
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
	/* remove line breaks and other select non text characters from string */
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
	/* gets a random alpha numeric string - often used as ID fields */
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

WTWJS.prototype.isNumeric = function(n) {
	/* boolean - is a text string a number */
    return !isNaN(parseFloat(n)) && isFinite(n);
}


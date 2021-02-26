/* All code is Copyright 2013-2021 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
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
	/* performs a form POST based JSON call for data */
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
		WTW.log("core-scripts-prime-wtw_install.js-postJSON=" + ex.message);
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
		WTW.log("core-scripts-prime-wtw_install.js-encode=" + ex.message);
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
		WTW.log("core-scripts-prime-wtw_install.js-decode=" + ex.message);
    }
    return String(zvalue);
}

WTWJS.prototype.show = function(zelement) {
	/* show HTML element from its id */
	try {
		if (dGet(zelement) != null) {
			dGet(zelement).style.display = 'block';
			dGet(zelement).style.visibility = 'visible';
			if (zelement.indexOf("wtw_adminmenu") > -1 && WTW.adminView == 1) {
				var menu = zelement.replace("wtw_adminmenu","");
				if (WTW.isNumeric(menu)) {
					WTW.adminMenu = Number(menu);
				}
			}
		}
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_install.js-show=" + ex.message);
	}
}

WTWJS.prototype.showInline = function(zelement) {
	/* show HTML element inline-block from its id */
	try {
		if (dGet(zelement) != null) {
			dGet(zelement).style.display = 'inline-block';
			dGet(zelement).style.visibility = 'visible';
		}
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_install.js-showInline=" + ex.message);
	}
}

WTWJS.prototype.hide = function(zelement) {
	/* hide HTML element from its id */
	try {
		if (dGet(zelement) != null) {
			dGet(zelement).style.display = 'none';
			dGet(zelement).style.visibility = 'hidden';
		}
	} catch (ex) { 
		WTW.log("core-scripts-prime-wtw_install.js-hide=" + ex.message);
	}
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
		WTW.log("core-scripts-prime-wtw_install.js-cleanInvalidCharacters=" + ex.message);
    }
    return zvalue;
}

WTWJS.prototype.getRandomString = function(zlength) {
	/* gets a random alpha numeric string - often used as ID fields */
    var zresults = '';
	try {
		var zchars = '0123456789abcdefghijklmnopqrstuvwxyz';
		for (var i = zlength; i > 0; --i) {
			zresults += zchars[Math.floor(Math.random() * zchars.length)];
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_install.js-randomString=" + ex.message);
	}
    return zresults;
}

WTWJS.prototype.formatDate = function(zdate) {
	/* format date as month/day/year */
	if (zdate != "") {
		var zsdate = new Date(zdate),
			zmonth = '' + (zsdate.getMonth() + 1),
			zday = '' + zsdate.getDate(),
			zyear = zsdate.getFullYear();

		if (zmonth.length < 2) zmonth = '0' + zmonth;
		if (zday.length < 2) zday = '0' + zday;
		return [zmonth, zday, zyear].join('/');
	} else {
		return "";
	}
}

WTWJS.prototype.isNumeric = function(n) {
	/* boolean - is a text string a number */
    return !isNaN(parseFloat(n)) && isFinite(n);
}


/* All code is Copyright 2013-2022 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
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
			color = 'black';
		}
		if (color.toLowerCase() == 'black') {
			console.log(txt);
		} else {
			console.log('%c' + txt, 'color:' + color + ';font-weight:bold;');
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
		Httpreq.overrideMimeType('application/json');
		Httpreq.open(zaction, zurl, true);
		Httpreq.onreadystatechange = function () {
			if (Httpreq.readyState == 4 && Httpreq.status == '200') {
				zcallback(Httpreq.responseText);
			}
		};
		Httpreq.send(zrequest);  
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_install.js-getJSON=' + ex.message);
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
			Httpreq.overrideMimeType('application/json');
			Httpreq.open(zaction, zurl, true);
			Httpreq.onreadystatechange = function () {
				if (Httpreq.readyState == 4 && Httpreq.status == '200') {
					zcallback(Httpreq.responseText);
				}
			};
			Httpreq.send(zrequest);
		});
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-getAsyncJSON=' + ex.message);
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
			if (Httpreq.readyState == 4 && Httpreq.status == '200') {
				zcallback(Httpreq.responseText);
			}
		};
		Httpreq.send(zformdata);  
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_install.js-postJSON=' + ex.message);
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
				if (Httpreq.readyState == 4 && Httpreq.status == '200') {
					zcallback(Httpreq.responseText);
				}
			};
			Httpreq.send(zformdata);
		});
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_utilities.js-postAsyncJSON=' + ex.message);
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
			while (zvalue.indexOf('<') > -1) {
				zvalue = zvalue.replace(/</g, '&lt;');
			}
			while (zvalue.indexOf('>') > -1) {
				zvalue = zvalue.replace(/>/g, '&gt;');
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_install.js-encode=' + ex.message);
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
		WTW.log('core-scripts-prime-wtw_install.js-decode=' + ex.message);
    }
    return String(zvalue);
}

WTWJS.prototype.show = function(zelement) {
	/* show HTML element from its id */
	try {
		if (dGet(zelement) != null) {
			dGet(zelement).style.display = 'block';
			dGet(zelement).style.visibility = 'visible';
			if (zelement.indexOf('wtw_adminmenu') > -1 && WTW.adminView == 1) {
				var menu = zelement.replace('wtw_adminmenu','');
				if (WTW.isNumeric(menu)) {
					WTW.adminMenu = Number(menu);
				}
			}
		}
	} catch (ex) { 
		WTW.log('core-scripts-prime-wtw_install.js-show=' + ex.message);
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
		WTW.log('core-scripts-prime-wtw_install.js-showInline=' + ex.message);
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
		WTW.log('core-scripts-prime-wtw_install.js-hide=' + ex.message);
	}
}

WTWJS.prototype.toggle = function(item) {
	try {
		if (dGet(item) != null) {
			if (dGet(item).style.display == 'none') {
				WTW.show(item);
			} else {
				WTW.hide(item);
			}
		}
	} catch (ex) { 
		WTW.log('core-scripts-prime-wtw_login.js-toggle=' + ex.message);
	}
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
		WTW.log('core-scripts-prime-wtw_install.js-cleanInvalidCharacters=' + ex.message);
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
		WTW.log('core-scripts-prime-wtw_install.js-randomString=' + ex.message);
	}
    return zresults;
}

WTWJS.prototype.formatDate = function(zdate) {
	/* format date as month/day/year */
	if (zdate != '') {
		var zsdate = new Date(zdate),
			zmonth = '' + (zsdate.getMonth() + 1),
			zday = '' + zsdate.getDate(),
			zyear = zsdate.getFullYear();

		if (zmonth.length < 2) zmonth = '0' + zmonth;
		if (zday.length < 2) zday = '0' + zday;
		return [zmonth, zday, zyear].join('/');
	} else {
		return '';
	}
}

WTWJS.prototype.isNumeric = function(n) {
	/* boolean - is a text string a number */
    return !isNaN(parseFloat(n)) && isFinite(n);
}

WTWJS.prototype.selectMultiplayerPackage = function(zobj) {
	try {
		dGet('wtw_business').className = 'wtw-servicelisting';
		dGet('wtw_gamer').className = 'wtw-servicelisting';
		dGet('wtw_developer').className = 'wtw-servicelisting';
		if (zobj != null) {
			zobj.className = 'wtw-servicelisting-selected';
			switch (zobj.id) {
				case 'wtw_business':
					dGet('wtw_selectedservice').innerHTML = 'Multiplayer for Small Businesses';
					dGet('wtw_selectedprice').innerHTML = '$20';
					break;
				case 'wtw_gamer':
					dGet('wtw_selectedservice').innerHTML = 'Multiplayer for 3D Game Websites';
					dGet('wtw_selectedprice').innerHTML = '$27';
					break;
				case 'wtw_developer':
					dGet('wtw_selectedservice').innerHTML = 'Multiplayer for Developers';
					dGet('wtw_selectedprice').innerHTML = '$10';
					break;
			}
		}
	} catch (ex) { 
		WTW.log('core-scripts-prime-wtw_install.js-selectMultiplayerPackage=' + ex.message);
	}
}

WTWJS.prototype.selectExpandedPackage = function(zobj) {
	try {
		if (zobj != null) {
			if (zobj.className == 'wtw-servicelisting') {
				zobj.className = 'wtw-servicelisting-selectedtoggle';
				WTW.show('wtw_expandedservice');
			} else {
				zobj.className = 'wtw-servicelisting';
				WTW.hide('wtw_expandedservice');
			}
		}
	} catch (ex) { 
		WTW.log('core-scripts-prime-wtw_install.js-selectExpandedPackage=' + ex.message);
	}
}

WTWJS.prototype.openCart = function() {
	try {
		var zselected = 'business';
		
		if (dGet('wtw_business') != null) {
			if (dGet('wtw_business').className == 'wtw-servicelisting-selected') {
				zselected = 'business';
			} else if (dGet('wtw_gamer').className == 'wtw-servicelisting-selected') {
				zselected = 'gamer';
			} else if (dGet('wtw_developer').className == 'wtw-servicelisting-selected') {
				zselected = 'developer';
			}
		}
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		WTW.openIFrame('https://3dnet.walktheweb.com/core/pages/cartwalktheweb.php?serverinstanceid=' + btoa(dGet('wtw_serverinstanceid').value) + '&serverip=' + btoa(dGet('wtw_serverip').value) + '&domainname=' + btoa(dGet('wtw_domainname').value) + '&domainurl=' + btoa(dGet('wtw_domainurl').value) + '&websiteurl=' + btoa(dGet('wtw_websiteurl').value) + '&userid=' + btoa(dGet('wtw_userid').value) + '&useremail=' + btoa(dGet('wtw_useremail').value) + '&usertoken=' + btoa(dGet('wtw_usertoken').value) + '&selected=' + btoa(zselected), .8, .8, 'WalkTheWeb Shopping Cart');
	} catch (ex) { 
		WTW.log('core-scripts-prime-wtw_install.js-openCart=' + ex.message);
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
		dGet('wtw_ibrowsediv').style.width = Math.round(WTW.sizeX * zwidth) + 'px';
		dGet('wtw_ibrowsediv').style.height = Math.round(WTW.sizeY * zheight) + 'px';
		dGet('wtw_ibrowsediv').style.left = Math.round((WTW.sizeX * (1 - zwidth)) / 2) + 'px';
		dGet('wtw_ibrowsediv').style.top = Math.round((WTW.sizeY * (1 - zheight)) / 2) + 'px';
		dGet('wtw_ibrowsediv').style.display = 'inline-block';
		dGet('wtw_ibrowsediv').style.visibility = 'visible';
		dGet('wtw_ibrowsediv').style.zIndex = 3000;
		dGet('wtw_ibrowsediv').style.backgroundColor = '#ffffff';
		if (zurl == '/core/pages/help.php') {
			ziframe.onload = function() { WTW.setHelp();	};
			dGet('wtw_browsetitle').innerHTML = 'WalkTheWeb - Help';
		} else {
			dGet('wtw_browsetitle').innerHTML = ztitle;
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_install.js-openIFrame=' + ex.message);
		WTW.closeIFrame();
	}
}

WTWJS.prototype.cartComplete = function() {
	/* closes shopping cart and the iframe window frame */
	try {
		/* close iframe */
		WTW.closeIFrame();
		/* refresh page to continue install */
		window.location.href=window.location.href;
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_install.js-cartComplete=' + ex.message);
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
		WTW.log('core-scripts-prime-wtw_install.js-closeIFrame=' + ex.message);
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
		if (dGet('wtw_ibrowsediv').style.display != 'none') {
			var zwidth = dGet('wtw_ibrowsediv').clientWidth;
			var zheight = dGet('wtw_ibrowsediv').clientHeight;
			if (WTW.isNumeric(zwidth)) {
				dGet('wtw_ibrowsediv').style.width = Math.round(Number(zwidth)) + 'px';
				dGet('wtw_ibrowsediv').style.left = Math.round((WTW.sizeX - Number(zwidth)) / 2) + 'px';
			}
			if (WTW.isNumeric(zheight)) {
				dGet('wtw_ibrowsediv').style.height = Math.round(Number(zheight)) + 'px';
				dGet('wtw_ibrowsediv').style.top = Math.round((WTW.sizeY - Number(zheight)) / 2) + 'px';
			}
			dGet('wtw_ibrowsediv').style.display = 'inline-block';
			dGet('wtw_ibrowsediv').style.visibility = 'visible';
			dGet('wtw_ibrowsediv').style.zIndex = 3000;
		}
    } catch (ex) {
		WTW.log('core-scripts-prime-wtw_install.js-setWindowSize=' + ex.message);
    }
}

WTWJS.prototype.onMessage = function (zevent) {
	/* message listener is enabled and this function can receive predefined messages from an iframe within the WalkTheWeb instance */
	try {
		zevent = zevent || window.event;
		let zsafe = false;
		// Check sender origin to be trusted
		if (zevent.origin == 'https://3d.walktheweb.com') {
			zsafe = true;
		} else if (zevent.origin == 'https://3dnet.walktheweb.com') {
			zsafe = true;
		} else if (zevent.origin == 'https://3dnet.walktheweb.network') {
			zsafe = true;
		} else if (zevent.origin == wtw_domainurl) {
			zsafe = true;
		}
		if (zsafe) {
			let zfunctionname = '';
			if (zevent.data.func != undefined) {
				zfunctionname = zevent.data.func;
			}
			let zparameters = null;
			if (zevent.data.parameters != undefined) {
				zparameters = zevent.data.parameters;
			}
			let zmessage = null;
			if (zevent.data.message != undefined) {
				zmessage = zevent.data.message;
			}
			if (zfunctionname != '') {
				WTW.executeFunctionByName(zfunctionname, window, zparameters);
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_install.js-onMessage=' + ex.message);
	}
}

WTWJS.prototype.executeFunctionByName = function(zjsfunction, zcontext /*, args */) {
	/* allows a name of a javascript function to be passed (even with class like WTW.testScript) with parameters string (zcontext) to be executed */
	/* example: WTW.executeFunctionByName('WTW.testScript', 'arg1', 'arg2', 'arg3', 'arg4');   executes: WTW.testScript('arg1', 'arg2', 'arg3', 'arg4'); */
	var zfunc = null;
	var zargs = null;
	var zfunction = null;
	try {
		if (zjsfunction != null) {
			if (zjsfunction != '') {
				zargs = Array.prototype.slice.call(arguments, 2);
				var znamespaces = zjsfunction.split('.');
				zfunc = znamespaces.pop();
				for(var i = 0; i < znamespaces.length; i++) {
					zcontext = zcontext[znamespaces[i]];
				}
				if (typeof zcontext[zfunc] == 'function') {
					zfunction = zcontext[zfunc].apply(zcontext, zargs);
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_install.js-executeFunctionByName=' + ex.message);
	}
	return zfunction;
}

window.onload = function() {
	if (window.addEventListener) {
		window.addEventListener('message', WTW.onMessage, false);        
	} else if (window.attachEvent) {
		window.attachEvent('onmessage', WTW.onMessage, false);
	}
}

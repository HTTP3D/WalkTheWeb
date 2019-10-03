/* All code is Copyright 2013-2019 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
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

WTWJS.prototype.getJSON = function(url, callback) {
	try {
		var Httpreq = new XMLHttpRequest();
		Httpreq.overrideMimeType("application/json");
		Httpreq.open('GET', url, true);
		Httpreq.onreadystatechange = function () {
			if (Httpreq.readyState == 4 && Httpreq.status == "200") {
				callback(Httpreq.responseText);
			}
		};
		Httpreq.send(null);  
	} catch (ex) {
		WTW.log("common_min-WTW.getJSON=" + ex.message);
	}
}

WTWJS.prototype.buttonClick = function(zbval) {
	try {
		if (dGet('wtw_bval') != null) {
			dGet('wtw_bval').value = zbval;
			//form1.style.display = "none";
			//document.body.appendChild(form1);
			dGet('wtw_form1').submit();
		}
	} catch (ex) {
		WTW.log("common_min-buttonClick=" + ex.message);
	}
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
		WTW.log("common_min-show=" + ex.message);
	}
}

WTWJS.prototype.showInline = function(item) {
	try {
		if (dGet(item) != null) {
			dGet(item).style.display = 'inline-block';
			dGet(item).style.visibility = 'visible';
		}
	} catch (ex) { 
		WTW.log("common_min-showInline=" + ex.message);
	}
}

WTWJS.prototype.hide = function(item) {
	try {
		if (dGet(item) != null) {
			dGet(item).style.display = 'none';
			dGet(item).style.visibility = 'hidden';
		}
	} catch (ex) { 
		WTW.log("common_min-hide=" + ex.message);
	}
}

WTWJS.prototype.getDDLValue = function(ddlname) {
	var ddlvalue = "";
	try {
		if (dGet(ddlname).options[dGet(ddlname).selectedIndex] != undefined) {
			ddlvalue = dGet(ddlname).options[dGet(ddlname).selectedIndex].value;
		}
    } catch (ex) {
		WTW.log("common_min-setDDLValue=" + ex.message);
    }
	return ddlvalue;
}

WTWJS.prototype.getParentDDLValue = function(ddlname) {
	var ddlvalue = "";
	try {
		if (window.parent.dGet(ddlname).options[window.parent.dGet(ddlname).selectedIndex] != undefined) {
			ddlvalue = window.parent.dGet(ddlname).options[window.parent.dGet(ddlname).selectedIndex].value;
		}
    } catch (ex) {
		WTW.log("common_min-setDDLValue=" + ex.message);
    }
	return ddlvalue;
}

WTWJS.prototype.resetUploadButton = function() {
	try {
		if (window.parent.dGet('wtw_bstartimageupload') != null) {
			var category = WTW.getParentDDLValue('wtw_fileselectcategory');
			switch (category) {
				case '':
					if (window.parent.dGet('wtw_menuuploadedobjects').className == 'wtw-menutabtopselected' && window.parent.dGet('wtw_uploadedobjectsframe').src.indexOf('/core/iframes/uploadedfiles.php') > -1) {
						window.parent.dGet('wtw_bstartimageupload').innerHTML = 'Upload Primary 3D File';
					} else {
						window.parent.dGet('wtw_bstartimageupload').innerHTML = 'Upload File';
					}
					break;
				case 'image':
					window.parent.dGet('wtw_bstartimageupload').innerHTML = "Upload Image";
					break;
				case 'video':
					window.parent.dGet('wtw_bstartimageupload').innerHTML = "Upload Video";
					break;
				case 'audio':
					window.parent.dGet('wtw_bstartimageupload').innerHTML = "Upload Sound";
					break;
				case 'object':
					if (window.parent.dGet('wtw_menuuploadedobjects').className == 'wtw-menutabtopselected' && window.parent.dGet('wtw_uploadedobjectsframe').src.indexOf('/core/iframes/uploadedfiles.php') > -1) {
						window.parent.dGet('wtw_bstartimageupload').innerHTML = 'Upload Primary 3D File';
					} else {
						window.parent.dGet('wtw_bstartimageupload').innerHTML = 'Upload File';
					}
					break;
				case 'doc':
					window.parent.dGet('wtw_bstartimageupload').innerHTML = "Upload Document";
					break;
				default:
					window.parent.dGet('wtw_bstartimageupload').innerHTML = "Upload File";
					break;
			}			
			window.parent.dGet('wtw_bstartimageupload').onclick = function() {window.parent.WTW.startUploadImage();return (false)};
		}
	} catch (ex) {
		WTW.log("common_min-resetUploadButton=" + ex.message);
	}
}

WTWJS.prototype.toggleAdvanced = function(thisdiv, sectiondiv) {
	try {
		if (dGet(sectiondiv) != null) {
			if (thisdiv.innerHTML == "-- Show Advanced Options --") {
				thisdiv.innerHTML = "-- Hide Advanced Options --";
				dGet(sectiondiv).style.display = "block";
				dGet(sectiondiv).style.visibility = "visible";
			} else {
				thisdiv.innerHTML = "-- Show Advanced Options --";
				dGet(sectiondiv).style.display = "none";
				dGet(sectiondiv).style.visibility = "hidden";
			}
		}
	} catch (ex) {
		WTW.log("common_min-toggleAdvanced=" + ex.message);
	}
}

WTWJS.prototype.getRandomString = function(length) {
    var result = '';
	try {
		var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
		for (var i = length; i > 0; --i) {
			result += chars[Math.floor(Math.random() * chars.length)];
		}
	} catch (ex) {
		WTW.log("common-randomString=" + ex.message);
	}
    return result;
}

try {	
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', wtw_googleanalytics, 'auto');
	ga('send', 'pageview');
} catch (ex) {}
if (window.frameElement) {
}
else {
  //window.location.href = '/index.php';
}

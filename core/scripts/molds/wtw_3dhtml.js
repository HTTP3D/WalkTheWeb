/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions provide many of the common functions for browse and admin modes */
/* reading HTML, CSS and creating 3D Versions of Web Pages  */

WTWJS.prototype.load3DWebpage = function(zmoldname, zwebaddress, zmolddef, zlenx, zleny, zlenz) {
	/* load 3D Webpage from an HTML page */
	try {
if (zmoldname == undefined) {
	zmoldname = 'buildingmolds-0-1111111111111111-0--';
}
if (zwebaddress == undefined) {
	zwebaddress = 'https://3d.http3d.org/test.php';
}
if (zlenx == undefined) {
	zlenx = 1;
	zleny = 1;
	zlenz = 1;
}
if (zmolddef == undefined) {
	zmolddef = WTW.newMold();
	zmolddef.position.x = 40;
	zmolddef.position.y = 11;
	zmolddef.position.z = -12;
	zmolddef.scaling.x = 1;
	zmolddef.scaling.y = 20;
	zmolddef.scaling.z = 15;
}
		WTW.getAsyncJSON(zwebaddress, 
			function(zresponse) {
//WTW.log(zresponse);
				/* replace line breaks and tabs with a space */
				while (zresponse.indexOf('\n') > -1) {
					zresponse = zresponse.replace(/[\n\r\t]/g,' ');
				}
				/* replace 2 spaces with one */
				while (zresponse.indexOf('  ') > -1) {
					zresponse = zresponse.replace('  ',' ');
				}
				var zhtml = document.createElement('html');
				zhtml.innerHTML = zresponse; 
				var zhtmlarray = WTW.getNodesAsArray(zhtml);
//WTW.log(JSON.stringify(zhtmlarray),'pink');
				WTW.create3DPageBox(zmoldname, zhtmlarray, zmolddef, zlenx, zleny, zlenz);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-molds-wtw_3dhtml.js-load3DWebpage=' + ex.message);
	}
}

WTWJS.prototype.getNodesAsArray = function(znode) {
	/* read child nodes */
	var zarray = [];
	try {
		var i = 0;
		var zchildnodes = znode.childNodes;
		if (zchildnodes != null) {
			for (var j=0;j<zchildnodes.length;j++) {
				if (zchildnodes[j] != null) {
					if (zchildnodes[j].nodeName == '#text' && zchildnodes[j].nodeValue == ' ') {
					} else {
						var znodevalue = '';
						if (zchildnodes[j].nodeValue != undefined) {
							if (zchildnodes[j].nodeValue != null) {
								znodevalue = zchildnodes[j].nodeValue.trim();
							}
						}
						var zchildarray = [];
						if (zchildnodes[j].childNodes.length > 0) {
							zchildarray = WTW.getNodesAsArray(zchildnodes[j]);
						}
						zarray[i] = {
							'type': zchildnodes[j].nodeName.toLowerCase(),
							'id': zchildnodes[j].id,
							'name': zchildnodes[j].name,
							'nodeValue': znodevalue,
							'children': zchildarray
						};
						/*
							,
							'innerHTML': zchildnodes[j].innerHTML,
							'innerText': zchildnodes[j].innerText,
							'value': zchildnodes[j].value,
							'style': zchildnodes[j].style,
							'class': zchildnodes[j].className						
						*/
						i += 1;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-molds-wtw_3dhtml.js-getNodesAsArray=' + ex.message);
	}
	return zarray;
}

WTWJS.prototype.create3DPageBox = function(zmoldname, zhtmlarray, zmolddef, zlenx, zleny, zlenz) {
	/* create3DPageBox converts the html array into a 3D formatted box */
	try {
		/* create transform node for position, rotation, and scaling */
		var zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(zmolddef.position.x,zmolddef.position.y,zmolddef.position.z);
		zmold.rotation = new BABYLON.Vector3(zmolddef.rotation.x,zmolddef.rotation.y,zmolddef.rotation.z);
		zmold.scaling = new BABYLON.Vector3(zlenx,zleny,zlenz);
		//zmold.parent = ???
		
		zmolddef.covering = 'color';
		zmolddef.color.diffusecolor = '#000000';
		zmolddef.color.emissivecolor = '#000000';
		zmolddef.color.specularcolor = '#000000';
		zmolddef.color.ambientcolor = '#000000';
		zmolddef.parentname = zmoldname;
		zmolddef.checkcollisions = '1';
		var zbasemold = WTW.addMoldBox(zmoldname + '-basemold', zmolddef.scaling.x, zmolddef.scaling.y, zmolddef.scaling.z);
		zbasemold.parent = zmold;
		zbasemold.renderingGroupId = 1;
		if (WTW.adminView == 1) {
			zbasemold.isPickable = true;
		}
		
	} catch (ex) {
		WTW.log('core-scripts-molds-wtw_3dhtml.js-create3DPageBox=' + ex.message);
	}
}

WTWJS.prototype.createTag = function(ztag) {
	/* createTag sets the function to create the 3D Tag visually */
	try {
		switch (ztag.toLowerCase()) {
			case 'html':
				
				break;
			case 'head':
				
				break;
			case 'body':
				
				break;
			case 'div':
				
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-molds-wtw_3dhtml.js-createTag=' + ex.message);
	}
}

WTWJS.prototype.readProperty = function(zproperty) {
	/* readProperty provides the settings to create the 3D Tag visually */
	try {
		switch (zproperty.toLowerCase()) {
			case 'width':
				
				break;
			case 'height':
				
				break;
			case 'color':
				
				break;
			case 'bgcolor':
			case 'background-color':
				
				break;
			case 'border':
				
				break;
			case 'float':
				
				break;
			case 'text-align':
				
				break;
			case 'vertical-align':
				
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-molds-wtw_3dhtml.js-readProperty=' + ex.message);
	}
}


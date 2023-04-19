/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions provide many of the common functions for browse and admin modes */
/* 3d blog components, 3d scrolling, 3D text, and wrap text  */

WTWJS.prototype.refreshTextBox = function() {
	/* refresh 3d text box, includes 3d scroll bar */
	try {
		if (WTW.selectedMoldName.indexOf('-') > -1) {
			if (WTW.selectedMoldName.indexOf('-scrollboxbodytext') > -1) {
				var zscrollboxbodytext = WTW.getMeshOrNodeByID(WTW.selectedMoldName);
				if (zscrollboxbodytext != null) {
					if (zscrollboxbodytext.WTW != undefined) {
						if (zscrollboxbodytext.WTW.webtext != undefined) {
							/* note: zwebtext = zscrollboxbodytext.WTW.webtext.webtext; */
							if (WTW.isNumeric(zscrollboxbodytext.WTW.webtext.scrollpos)) {
								var zscrollpos = Number(zscrollboxbodytext.WTW.webtext.scrollpos);
								WTW.scrollBoxRepaint(WTW.selectedMoldName.replace('-scrollboxbodytext',''), zscrollpos);
							}
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-molds-wtw_3dblog.js-refreshTextBox=' + ex.message);
	}
}

WTWJS.prototype.resetScrollBox = function(zmoldname) {
	/* reset the scroll box textures */
	try {
		var zscrollboxtab = WTW.getMeshOrNodeByID(zmoldname + '-scrollboxtab');
		if (zscrollboxtab != null && zscrollboxtab.WTW != undefined) {
			try {
				if (zscrollboxtab.material != null) {
					zscrollboxtab.material.dispose();
					zscrollboxtab.material = null;
				}	
			} catch(ex) {}
			zscrollboxtab.material = WTW.addCoveringTexture(zmoldname + '-scrollboxtab', zscrollboxtab.WTW, zscrollboxtab.scaling.x, zscrollboxtab.scaling.y, zscrollboxtab.scaling.z, zscrollboxtab.WTW.scaling.special1, zscrollboxtab.WTW.scaling.special1);
		}
		var zscrollboxup = WTW.getMeshOrNodeByID(zmoldname + '-scrollboxup');
		if (zscrollboxup != null && zscrollboxup.WTW != undefined) {
			try {
				if (zscrollboxup.material != null) {
					zscrollboxup.material.dispose();
					zscrollboxup.material = null;
				}	
			} catch(ex) {}
			zscrollboxup.material = WTW.addCoveringTexture(zmoldname + '-scrollboxup', zscrollboxup.WTW, zscrollboxup.scaling.x, zscrollboxup.scaling.y, zscrollboxup.scaling.z, zscrollboxup.WTW.scaling.special1, zscrollboxup.WTW.scaling.special1);
		}
		var zscrollboxuparrow = WTW.getMeshOrNodeByID(zmoldname + '-scrollboxuparrow');
		if (zscrollboxuparrow != null && zscrollboxuparrow.WTW != undefined) {
			try {
				if (zscrollboxuparrow.material != null) {
					zscrollboxuparrow.material.dispose();
					zscrollboxuparrow.material = null;
				}	
			} catch(ex) {}
			zscrollboxuparrow.material = WTW.addCoveringTexture(zmoldname + '-scrollboxuparrow', zscrollboxuparrow.WTW, zscrollboxuparrow.scaling.x, zscrollboxuparrow.scaling.y, zscrollboxuparrow.scaling.z, zscrollboxuparrow.WTW.scaling.special1, zscrollboxuparrow.WTW.scaling.special1);
		}
		var zscrollboxdown = WTW.getMeshOrNodeByID(zmoldname + '-scrollboxdown');
		if (zscrollboxdown != null && zscrollboxdown.WTW != undefined) {
			try {
				if (zscrollboxdown.material != null) {
					zscrollboxdown.material.dispose();
					zscrollboxdown.material = null;
				}	
			} catch(ex) {}
			zscrollboxdown.material = WTW.addCoveringTexture(zmoldname + '-scrollboxdown', zscrollboxdown.WTW, zscrollboxdown.scaling.x, zscrollboxdown.scaling.y, zscrollboxdown.scaling.z, zscrollboxdown.WTW.scaling.special1, zscrollboxdown.WTW.scaling.special1);
		}
		var zscrollboxdownarrow = WTW.getMeshOrNodeByID(zmoldname + '-scrollboxdownarrow');
		if (zscrollboxdownarrow != null && zscrollboxdownarrow.WTW != undefined) {
			try {
				if (zscrollboxdownarrow.material != null) {
					zscrollboxdownarrow.material.dispose();
					zscrollboxdownarrow.material = null;
				}	
			} catch(ex) {}
			zscrollboxdownarrow.material = WTW.addCoveringTexture(zmoldname + '-scrollboxdownarrow', zscrollboxdownarrow.WTW, zscrollboxdownarrow.scaling.x, zscrollboxdownarrow.scaling.y, zscrollboxdownarrow.scaling.z, zscrollboxdownarrow.WTW.scaling.special1, zscrollboxdownarrow.WTW.scaling.special1);
		}
	} catch (ex) {
		WTW.log('core-scripts-molds-wtw_3dblog.js-resetScrollBox=' + ex.message);
	}
}

WTWJS.prototype.addHtmlHR = function(zcontent, zcolor, zhalign, ztlinesize, ztwidth, zscrollpos, zindent) {
	/* create a horizontal rule in 3D on a blog wall */
	var zminx = 0;
	var zpwidth = 0;
	var zpheight = 0;
	var zmaxwidth = 0;
	var zmaxheight = 0;
	var zlinewidth = 0;
	try {
		var zwidth = 0;
		if (zscrollpos == undefined) {
			zscrollpos = 0;
		}
		if (zindent == undefined) {
			zindent = 0;
		} else if (WTW.isNumeric(zindent)) {
			zindent = Number(zindent);
		} else {
			zindent = 0;
		}
		var ztextureContext = zcontent.material.diffuseTexture.getContext();
		var zsize = zcontent.material.diffuseTexture.getSize();
		zmaxwidth = zsize.width - zindent;
		zmaxheight = zsize.height;
		zminx = zmaxwidth;
		if (ztlinesize != undefined) {
			var tsiz = ztlinesize.replace('px','').replace('em','').replace('pt','').replace(' ','');
			if (WTW.isNumeric(tsiz)) {
				linesize = tsiz;
			} else {
				linesize = '1';
			}
		} else {
			linesize = '1';
		}
		if (ztwidth != undefined) {
			var twid = ztwidth.replace('%','').replace(' ','');
			if (ztwidth.indexOf('%') > -1) {
				if (WTW.isNumeric(twid)) {
					zwidth = zmaxwidth * (Number(twid) / 100);
				} else {
					zwidth = zmaxwidth;
				}
			} else {
				zwidth = zmaxwidth;
			}
		} else {
			zwidth = zmaxwidth;
		}
		var zx = 1;
		var zy = 25;
		switch (zhalign) {
			case 'center':
				zx = zindent + (zmaxwidth - zwidth) / 2;
				if (zminx > zx) {
					zminx = zx;
				}
				zindent = 0;
				break;
			case 'right':
				zx = zindent + zmaxwidth - zwidth;
				if (zminx > zx) {
					zminx = zx;
				}
				zindent = 0;
				break;
			default:
				zx = zindent;
				if (zminx > zx) {
					zminx = zx;
				}
				zindent = 0;
				break;
		}
		zpheight = zy;
		zy += zscrollpos;
		ztextureContext.save();
		ztextureContext.strokeStyle = zcolor;
		ztextureContext.lineWidth = linesize;
		zlinewidth = zmaxwidth;
		ztextureContext.beginPath();
		ztextureContext.moveTo(zx, zy);
		ztextureContext.lineTo(zx + zwidth, zy);
		ztextureContext.stroke();
		ztextureContext.restore();
		zcontent.material.diffuseTexture.update();
		zpwidth = zmaxwidth;
	} catch (ex) {
		WTW.log('core-scripts-molds-wtw_3dblog.js-addHtmlHR=' + ex.message);
	} 
	return {
		minx:zminx,
		width:zpwidth,
		height:zpheight,
		maxwidth:zmaxwidth,
		maxheight:zmaxheight,
		linewidth:zlinewidth
	};
} 

WTWJS.prototype.addHtmlBorder = function(zcontent, ztx, zty, ztwidth, ztheight, zcolor, zttype, ztborderwidth, zscrollpos) {
	/* add html border to a 3d blog wall */
	var zmaxwidth = 0;
	var zmaxheight = 0;
	var zlinewidth = 0;
	try {
		var zwidth = 0;
		var zheight = 0;
		var zx = 1;
		var zy = 1;
		if (ztborderwidth == undefined) {
			ztborderwidth = '0px';
		}
		if (zscrollpos == undefined) {
			zscrollpos = 0;
		}
		var ztextureContext = zcontent.material.diffuseTexture.getContext();
		var zsize = zcontent.material.diffuseTexture.getSize();
		zmaxwidth = zsize.width;
		zmaxheight = zsize.height;
		ztborderwidth = ztborderwidth.replace('px','').replace('em','').replace('pt','').replace(' ','');
		if (WTW.isNumeric(ztborderwidth)) {
			linesize = ztborderwidth;
		} else {
			linesize = '1';
		}
		if (WTW.isNumeric(ztwidth)) {
			zwidth = Number(ztwidth);
		} else {
			zwidth = zmaxwidth;
		}
		if (WTW.isNumeric(ztheight)) {
			zheight = Number(ztheight);
		} else {
			zheight = zmaxheight;
		}
		if (WTW.isNumeric(ztx)) {
			zx = Number(ztx);
		} else {
			zx = zmaxwidth;
		}
		if (WTW.isNumeric(zty)) {
			zy = Number(zty);
		} else {
			zy = zmaxheight;
		}
		zy += zscrollpos;
		ztextureContext.save();
		ztextureContext.strokeStyle = zcolor;
		ztextureContext.lineWidth = linesize;
		zlinewidth = zmaxwidth;
		ztextureContext.strokeRect(zx, zy, zwidth, zheight);
		ztextureContext.restore();
		zcontent.material.diffuseTexture.update();
	} catch (ex) {
		WTW.log('core-scripts-molds-wtw_3dblog.js-addHtmlBorder=' + ex.message);
	} 
} 

WTWJS.prototype.wrapText = function(zcontent, ztext, ztlineheight, ztfontsize, zhalign, zvalign, zcolor, zscrollpos, zindent, ztmaxwidth, ztmarginleft, ztmarginright, ztfloat, ztfloatwidth, ztfloatheight) {
	/* wrap text by width on a texture for a mold */
	var zminx = 0;
	var zpwidth = 0;
	var zpheight = 0;
	var zmaxwidth = 0;
	var zmaxheight = 0;
	var zlinewidth = 0;
	var zmarginleft = 0;
	var zmarginright = 0;
	var zfloatheight = 0;
	var zfloatwidth = 0;
	try {
		var ztextureContext = zcontent.material.diffuseTexture.getContext();
		var zsize = zcontent.material.diffuseTexture.getSize();
		if (ztfloat == undefined) {
			ztfloat = '';
		}
		if (ztfloatwidth == undefined) {
			ztfloatwidth = '0px';
		}
		if (ztfloatheight == undefined) {
			ztfloatheight = '0px';
		}
		if (ztmaxwidth == undefined) {
			ztmaxwidth = '100%';
		}
		if (zscrollpos == undefined) {
			zscrollpos = 0;
		}
		if (zindent == undefined) {
			zindent = 5;
		} else if (WTW.isNumeric(zindent)) {
			zindent = Number(zindent);
		} else {
			zindent = 5;
		}
		if (ztmarginleft == undefined) {
			ztmarginleft = '0px';
		}
		if (ztmarginright == undefined) {
			ztmarginright = '0px';
		}
		if (WTW.isNumeric(ztfloatwidth)) {
			zfloatwidth = Number(ztfloatwidth);
		}
		if (WTW.isNumeric(ztfloatheight)) {
			zfloatheight = Number(ztfloatheight);
		}
		if (ztmarginleft.indexOf('%') > -1) {
			ztmarginleft = ztmarginleft.replace('%','').replace(' ','');
			if (WTW.isNumeric(ztmarginleft)) {
				zmarginleft = zsize.width * Number(ztmarginleft)/100;
			}
		} else {
			ztmarginleft = ztmarginleft.replace('px','').replace('em','').replace('pt','').replace(' ','');
			if (WTW.isNumeric(ztmarginleft)) {
				zmarginleft = Number(ztmarginleft);
			}
		}
		if (ztmarginright.indexOf('%') > -1) {
			ztmarginright = ztmarginright.replace('%','').replace(' ','');
			if (WTW.isNumeric(ztmarginright)) {
				zmarginright = zsize.width * Number(ztmarginright)/100;
			}
		} else if (ztmarginright.indexOf('em') > -1) {
			ztmarginright = ztmarginright.replace('em','').replace(' ','');
			if (WTW.isNumeric(ztmarginright)) {
				zmarginright = Number(ztmarginright) * 12;
				
			}
		} else {
			ztmarginright = ztmarginright.replace('px','').replace('pt','').replace(' ','');
			if (WTW.isNumeric(ztmarginright)) {
				zmarginright = Number(ztmarginright);
				
			}
		}
		if (zmarginright < 10) {
			zmarginright = 10;
		}
		var zfontsize = 20;
		if (ztfontsize.indexOf('em') > -1 && WTW.isNumeric(ztfontsize.replace('em','').replace(' ',''))) {
			zfontsize = Number(ztfontsize.replace('px','').replace('em','').replace('pt','').replace(' ','')) * 12;
		} else if (WTW.isNumeric(ztfontsize.replace('px','').replace('pt','').replace(' ',''))) {
			zfontsize = Number(ztfontsize.replace('px','').replace('pt','').replace(' ',''));
		}
		var zlineheight = 30;
		if (ztlineheight.indexOf('em') > -1 && WTW.isNumeric(ztlineheight.replace('em','').replace(' ',''))) {
			zlineheight = Number(ztlineheight.replace('px','').replace('em','').replace('pt','').replace(' ','')) * 12;
		} else if (WTW.isNumeric(ztlineheight.replace('px','').replace('pt','').replace(' ',''))) {
			zlineheight = Number(ztlineheight.replace('px','').replace('pt','').replace(' ',''));
		}
		ztext = ztext.replace(/(?:\r\n|\r|\n)/g," ¶ ");
		var zwords = ztext.split(' ');
		var zline = '';
		zmaxwidth = zsize.width - 5;
		zmaxheight = zsize.height;
		zmaxwidth -= zindent;
		zminx = zmaxwidth;
		if (ztmaxwidth.indexOf('%') > -1) {
			ztmaxwidth = ztmaxwidth.replace('%','').replace(' ','');
			if (WTW.isNumeric(ztmaxwidth)) {
				zmaxwidth = zmaxwidth * Number(ztmaxwidth)/100;
			}
		} else if (ztmaxwidth.indexOf('em') > -1 && WTW.isNumeric(ztfontsize.replace('em','').replace(' ',''))) {
			zmaxwidth = Number(ztmaxwidth.replace('px','').replace('em','').replace('pt','').replace(' ','')) * 12;
		} else if (WTW.isNumeric(ztmaxwidth.replace('px','').replace('pt','').replace(' ',''))) {
			zmaxwidth = Number(ztmaxwidth.replace('px','').replace('pt','').replace(' ',''));
		}
		if (zhalign == 'right') {
			zmarginleft = zsize.width - zmaxwidth - zmarginright;
			if (zmarginleft < 0) {
				zmarginleft = 0;
			}
		}

		var zx = 1;
		var zy = 25;
		var zylineheight = 25;
		var ztestWidth = 0;
		var ztestWidthlast = 0;
		var ztextsizelast;
		if (WTW.isNumeric(zlineheight)) {
			zy = Number(zlineheight);
			zylineheight = zy;
		} else if (WTW.isNumeric(zfontsize)) {
			zy = Number(zfontsize);
			zylineheight = zy;
		}
		zy += zscrollpos;
		zfloatheight += zylineheight;
		ztextureContext.save();
		ztextureContext.font = zfontsize + 'px Arial';
		ztextureContext.fillStyle = zcolor;
		var ztestmaxwidth = zmaxwidth;
		for(var n = 0; n < zwords.length; n++) {
			if (zy > zscrollpos && zy < (zscrollpos + zfloatheight)) {
				ztestmaxwidth = zmaxwidth - zfloatwidth;
			} else {
				ztestmaxwidth = zmaxwidth;
			}
			var ztestLine = zline + zwords[n] + ' ';
			var ztextsize =  ztextureContext.measureText(ztestLine.replace('¶ ','').trim());
			ztextsizelast =  ztextureContext.measureText(zline.replace('¶ ','').trim());
			ztestWidth = ztextsize.width;
			ztestWidthlast = ztextsizelast.width;
			if (zpwidth < ztestWidthlast) {
				zpwidth = ztestWidthlast;
			}
			if ((ztestWidth > ztestmaxwidth && n > 0) || zwords[n].indexOf('¶') > -1) {
				switch (zhalign) {
					case 'center':
						if (zy > zscrollpos && zy < (zscrollpos + zfloatheight)) {
							zx = zfloatwidth + zindent + (ztestmaxwidth - ztestWidthlast) / 2;
						} else {
							zx = zindent + (ztestmaxwidth - ztestWidthlast) / 2;
						}
						if (zminx > zx) {
							zminx = zx;
						}
						zindent = 5;
						break;
					case 'right':
						if (zy > zscrollpos && zy < (zscrollpos + zfloatheight)) {
							zx = zfloatwidth + zmarginleft + zindent + ztestmaxwidth - ztestWidthlast;
						} else {
							zx = zmarginleft + zindent + ztestmaxwidth - ztestWidthlast;
						}
						if (zminx > zx) {
							zminx = zx;
						}
						zindent = 5;
						break;
					default:
						if (zy > zscrollpos && zy < (zscrollpos + zfloatheight)) {
							zx = zfloatwidth + zmarginleft + zindent;
						} else {
							zx = zmarginleft + zindent;
						}
						if (zminx > zx) {
							zminx = zx;
						}
						zindent = 5;
						break;
				}
				ztextureContext.fillText(zline.replace('¶','').trim(), zx, zy);
				if (zwords[n].indexOf('¶') > -1) {
					zline = '';
				} else {
					zline = zwords[n] + ' ';
				}
				
				zy += zylineheight;
			}
			else {
				zline = ztestLine.replace('¶ ','');
			}
		}
		ztextsizelast =  ztextureContext.measureText(zline.replace('¶ ','').trim());
		ztestWidthlast = ztextsizelast.width;
		if (zpwidth < ztestWidthlast) {
			zpwidth = ztestWidthlast;
		}
		if (zy > zscrollpos && zy < (zscrollpos + zfloatheight)) {
			ztestmaxwidth = zmaxwidth - zfloatwidth;
		} else {
			ztestmaxwidth = zmaxwidth;
		}
		switch (zhalign) {
			case 'center':
				if (zy > zscrollpos && zy < (zscrollpos + zfloatheight)) {
					zx = zfloatwidth + zindent + (ztestmaxwidth - ztestWidthlast) / 2;
				} else {
					zx = zindent + (ztestmaxwidth - ztestWidthlast) / 2;
				}
				if (zminx > zx) {
					zminx = zx;
				}
				zindent = 5;
				break;
			case 'right':
				if (zy > zscrollpos && zy < (zscrollpos + zfloatheight)) {
					zx = zfloatwidth + zmarginleft + zindent + ztestmaxwidth - ztestWidthlast;
				} else {
					zx = zmarginleft + zindent + ztestmaxwidth - ztestWidthlast;
				}
				if (zminx > zx) {
					zminx = zx;
				}
				zindent = 5;
				break;
			default:
				if (zy > zscrollpos && zy < (zscrollpos + zfloatheight)) {
					zx = zfloatwidth + zmarginleft + zindent;
				} else {
					zx = zmarginleft + zindent;
				}
				if (zminx > zx) {
					zminx = zx;
				}
				zindent = 5;
				break;
		}
		zlinewidth = ztestWidthlast;
		ztextureContext.fillText(zline.replace('¶','').trim(), zx, zy);
		ztextureContext.restore();
		switch (zvalign) {
			case 'middle':
				zcontent.material.diffuseTexture.vOffset -= (1 - (1 / zmaxheight * zy)) / 2;
				break;
			case 'center':
				zcontent.material.diffuseTexture.vOffset -= (1 - (1 / zmaxheight * zy)) / 2;
				break;
			case 'bottom':
				zcontent.material.diffuseTexture.vOffset -= (1 - (1 / (zmaxheight - 1) * zy));
				break;
		}
		zcontent.material.diffuseTexture.update();
		zpheight = zy - zscrollpos;
	} catch (ex) {
		WTW.log('core-scripts-molds-wtw_3dblog.js-wrapText=' + ex.message);
	} 
	return {
		minx:zminx,
		width:zpwidth,
		height:zpheight,
		maxwidth:zmaxwidth,
		maxheight:zmaxheight,
		linewidth:zlinewidth
	};
} 

WTWJS.prototype.addMold3DText = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	/* add 3d mold text */
	var zmold;
	try {
		zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold == null) {
			zmold = new BABYLON.TransformNode(zmoldname);
			zmold.position = new BABYLON.Vector3(0,0,0);
			zmold.rotation = new BABYLON.Vector3(0,0,0);
			zmold.scaling = new BABYLON.Vector3(zlenx,zleny,zlenz);
		}
		var zwebtext = WTW.decode(zmolddef.webtext.webtext);
		var zwebstyle = WTW.decode(zmolddef.webtext.webstyle);
		if (zwebtext == null || zwebtext == '') {
			zwebtext = '-';
		}
		if (zwebstyle == null || zwebstyle == '') {
			var zemissivecolor = '#ff0000';
			var zdiffusecolor = '#f0f0f0';
			var zspecularcolor = '#000000';
			var zambientcolor = '#808080';
			if (zmolddef.color.emissivecolor != undefined) {
				if (zmolddef.color.emissivecolor != '') {
					zemissivecolor = zmolddef.color.emissivecolor;
				}
			}
			if (zmolddef.color.diffusecolor != undefined) {
				if (zmolddef.color.diffusecolor != '') {
					zdiffusecolor = zmolddef.color.diffusecolor;
				}
			}
			if (zmolddef.color.specularcolor != undefined) {
				if (zmolddef.color.specularcolor != '') {
					zspecularcolor = zmolddef.color.specularcolor;
				}
			}
			if (zmolddef.color.ambientcolor != undefined) {
				if (zmolddef.color.ambientcolor != '') {
					zambientcolor = zmolddef.color.ambientcolor;
				}
			}
			zwebstyle = {
				'anchor':'center',
				'letter-height':6.00,
				'letter-thickness':1.00,
				'color':zemissivecolor,
				'alpha':1.00,
				'colors':{
					'diffuse':zdiffusecolor,
					'specular':zspecularcolor,
					'ambient':zambientcolor,
					'emissive':zemissivecolor
				}
			};
		} else {
			try {
				zwebstyle = JSON.parse(zwebstyle);
			} catch (ex) {
				zwebstyle = {
					'anchor':'center',
					'letter-height':6.00,
					'letter-thickness':1.00,
					'color':zemissivecolor,
					'alpha':1.00,
					'colors':{
						'diffuse':zdiffusecolor,
						'specular':zspecularcolor,
						'ambient':zambientcolor,
						'emissive':zemissivecolor
					}
				};
			}
		}
		WTW.disposeClean(zmoldname + '-text');
		Writer = BABYLON.MeshWriter(scene, {scale:1});
        var zdisplaytext  = new Writer(zwebtext, zwebstyle);
		var zmytext = zdisplaytext.getMesh();
		zmytext.rotation.x = WTW.getRadians(-90);
		zmytext.name = zmoldname + '-text';
		zmytext.id = zmoldname + '-text';
		zmytext.parent = zmold;
		zmytext.isPickable = true;
	} catch (ex) {
		WTW.log('core-scripts-molds-wtw_3dblog.js-addMold3DText=' + ex.message);
	}
	return zmold;
}

WTWJS.prototype.addHtmlImg = function(zcontent, zsrc, zhalign, ztwidth, ztheight, ztborderwidth, ztbordercolor, zscrollpos, zindent, ztmarginleft, ztmarginright, ztmargintop, ztmarginbottom) {
	/* add html image to a 3d blog wall */
	var zminx = 0;
	var zpwidth = 0;
	var zpheight = 0;
	var zmaxwidth = 0;
	var zmaxheight = 0;
	var zlinewidth = 0;
	var zmarginright = 5;
	var zmargintop = 5;
	var zmarginbottom = 5;
	try {
		var zwidth = 0;
		var zheight = 0;
		var zborderwidth = '0';
		var ztextureContext = zcontent.material.diffuseTexture.getContext();
		var zsize = zcontent.material.diffuseTexture.getSize();
		if (ztborderwidth == undefined) {
			ztborderwidth = '0px';
		}
		if (ztbordercolor == undefined) {
			ztbordercolor = 'transparent';
		}
		if (zscrollpos == undefined) {
			zscrollpos = 0;
		}
		if (zindent == undefined) {
			zindent = 0;
		} else if (WTW.isNumeric(zindent)) {
			zindent = Number(zindent);
		} else {
			zindent = 0;
		}
		ztborderwidth = ztborderwidth.replace('px','').replace('em','').replace('pt','').replace(' ','');
		if (WTW.isNumeric(ztborderwidth)) {
			zborderwidth = ztborderwidth;
		} else {
			zborderwidth = '0';
		}
		if (ztmarginleft == undefined) {
			ztmarginleft = '0px';
		}
		if (ztmarginright == undefined) {
			ztmarginright = '0px';
		}
		if (ztmargintop == undefined) {
			ztmargintop = '0px';
		}
		if (ztmarginbottom == undefined) {
			ztmarginbottom = '0px';
		}
		if (ztmarginleft.indexOf('%') > -1) {
			ztmarginleft = ztmarginleft.replace('%','').replace(' ','');
			if (WTW.isNumeric(ztmarginleft)) {
				zmarginleft = zsize.width * Number(ztmarginleft)/100;
			}
		} else {
			ztmarginleft = ztmarginleft.replace('px','').replace('em','').replace('pt','').replace(' ','');
			if (WTW.isNumeric(ztmarginleft)) {
				zmarginleft = Number(ztmarginleft);
			}
		}
		if (ztmarginright.indexOf('%') > -1) {
			ztmarginright = ztmarginright.replace('%','').replace(' ','');
			if (WTW.isNumeric(ztmarginright)) {
				zmarginright = zsize.width * Number(ztmarginright)/100;
			}
		} else {
			ztmarginright = ztmarginright.replace('px','').replace('em','').replace('pt','').replace(' ','');
			if (WTW.isNumeric(ztmarginright)) {
				zmarginright = Number(ztmarginright);
			}
		}
		if (zmarginright < 10) {
			zmarginright = 10;
		}
		if (ztmargintop.indexOf('%') > -1) {
			ztmargintop = ztmargintop.replace('%','').replace(' ','');
			if (WTW.isNumeric(ztmargintop)) {
				zmargintop = zsize.height * Number(ztmargintop)/100;
			}
		} else {
			ztmargintop = ztmargintop.replace('px','').replace('em','').replace('pt','').replace(' ','');
			if (WTW.isNumeric(ztmargintop)) {
				zmargintop = Number(ztmargintop);
			}
		}
		if (ztmarginbottom.indexOf('%') > -1) {
			ztmarginbottom = ztmarginbottom.replace('%','').replace(' ','');
			if (WTW.isNumeric(ztmarginbottom)) {
				zmarginbottom = zsize.height * Number(ztmarginbottom)/100;
			}
		} else {
			ztmarginbottom = ztmarginbottom.replace('px','').replace('em','').replace('pt','').replace(' ','');
			if (WTW.isNumeric(ztmarginbottom)) {
				zmarginbottom = Number(ztmarginbottom);
			}
		}
		zmaxwidth = zsize.width - zindent;
		zmaxheight = zsize.height;
		zminx = zmaxwidth;
		if (zhalign == 'right') {
			zmarginleft = zsize.width - zmaxwidth - zmarginright;
			if (zmarginleft < 0) {
				zmarginleft = 0;
			}
		}
		if (ztwidth != undefined) {
			if (ztwidth.indexOf('%') > -1) {
				ztwidth = ztwidth.replace('%','').replace(' ','');
				if (WTW.isNumeric(ztwidth)) {
					zwidth = zmaxwidth * (Number(ztwidth) / 100);
				} else {
					zwidth = zmaxwidth;
				}
			} else {
				ztwidth = ztwidth.replace('px','').replace('pt','').replace(' ','');
				if (WTW.isNumeric(ztwidth)) {
					zwidth = Number(ztwidth);
				} else {
					zwidth = zmaxwidth;
				}
			}
		} else {
			zwidth = zmaxwidth;
		}
		if (ztheight != undefined) {
			if (ztheight.indexOf('%') > -1) {
				ztheight = ztheight.replace('%','').replace(' ','');
				if (WTW.isNumeric(ztheight)) {
					zheight = zmaxheight * (Number(ztheight) / 100);
				} else {
					zheight = zmaxheight;
				}
			} else {
				ztheight = ztheight.replace('px','').replace('pt','').replace(' ','');
				if (WTW.isNumeric(ztheight)) {
					zheight = Number(ztheight);
				} else {
					zheight = zmaxheight;
				}
			}
		} else {
			zheight = zmaxheight;
		}
		var zx = 1;
		var zy = zmargintop;
		switch (zhalign) {
			case 'center':
				zx = zindent + (zmaxwidth - zwidth) / 2;
				if (zminx > zx) {
					zminx = zx;
				}
				zindent = 0;
				break;
			case 'right':
				zx = zmarginleft + zindent + zmaxwidth - zwidth;
				if (zminx > zx) {
					zminx = zx;
				}
				zindent = 0;
				break;
			default:
				zx = zmarginleft + zindent;
				if (zminx > zx) {
					zminx = zx;
				}
				zindent = 0;
				break;
		}
		zy += zscrollpos;
		var ztempimage = new Image();
		if (zsrc != '') {
			ztempimage.src = zsrc;
			ztempimage.onload = function(){
				ztextureContext.save();
				ztextureContext.drawImage(ztempimage, zx, zy, zwidth, zheight);
				if (Number(zborderwidth) > 0) {
					ztextureContext.strokeStyle = ztbordercolor;
					ztextureContext.lineWidth = zborderwidth;
					ztextureContext.strokeRect(zx, zy, zwidth, zheight);
				}
				ztextureContext.restore();
				if (typeof zcontent.material.diffuseTexture.update == 'function') {
					zcontent.material.diffuseTexture.update();
				} else {
					window.setTimeout(function() {
						if (typeof zcontent.material.diffuseTexture.update == 'function') {
							zcontent.material.diffuseTexture.update();
						}
					},1000);
				}
			}
		}
		zpheight = zmargintop + zheight + zmarginbottom;
		zpwidth = zmarginleft + zwidth + zmarginright;
	} catch (ex) {
		WTW.log('core-scripts-molds-wtw_3dblog.js-addHtmlImg=' + ex.message);
	} 
	return {
		minx:zminx,
		width:zpwidth,
		height:zpheight,
		maxwidth:zmaxwidth,
		maxheight:zmaxheight,
		linewidth:zlinewidth
	};
} 

WTWJS.prototype.wrapHtml = function(zcontent, zhtml, zscrollpos) {
	/* wrap text on a 3d blog wall */
	var zhtmlwidth = 0;
	var zhtmlheight = 0;
	var zmaxwidth = 0;
	var zmaxheight = 0;
	try {
		var zmoldname = '';
		var znamepart = [];
		if (zcontent.name.indexOf('-') > -1) {
			znamepart = zcontent.name.split('-');
			zmoldname = znamepart[0] + '-' + znamepart[1] + '-' + znamepart[2] + '-'  + znamepart[3] + '-'  + znamepart[4] + '-'  + znamepart[5] + '-'  + znamepart[6];
		}
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
			var zhtmlsegments = [];
			var zhtmlind = 0;
			var zhrind = 0;
			zhtmlsegments[0] = WTW.newHTMLSegment();
			zhtmlsegments[0].tagname = 'root';
			if (zscrollpos == undefined) {
				zscrollpos = 0;
			}
			var zliney = zscrollpos;
			zhtml = zhtml.replace(/(?:\r\n|\r|\n)/g,' ¶ ');
			zhtml = WTW.decode(zhtml);
			zhtml = '<div>' + zhtml + '</div>';
			htmlpart = zhtml.split('<');
			for (var i=0;i < htmlpart.length;i++) {
				if (htmlpart[i].length > 0) {
					if (htmlpart[i].substr(0,1) == '/') {
						var ztag = htmlpart[i].substr(1,htmlpart[i].length - 2);
						if (zhtmlsegments[zhtmlind].style.borderwidth != '0px') {
							WTW.addHtmlBorder(zcontent, zhtmlsegments[zhtmlind].system.x, zhtmlsegments[zhtmlind].system.y, zhtmlsegments[zhtmlind].system.width, zhtmlsegments[zhtmlind].system.height, zhtmlsegments[zhtmlind].style.bordercolor, 'solid', zhtmlsegments[zhtmlind].style.borderwidth, zscrollpos);
						}
						zhtmlind -= 1;
					} else {
						paragraph = 
						{
							minx:0,
							width:0,
							height:0,
							maxwidth:0,
							maxheight:0,
							linewidth:0
						};
						var ztag = htmlpart[i];
						var ztagpart = [];
						var zwords = '';
						if (ztag.indexOf('>') > -1) {
							ztagpart = ztag.split('>');
							ztag = ztagpart[0];
							zwords = ztagpart[1];
						} else {
							zwords = ztag;
						}
						var ztagname = '';
						var zattributes = '';
						if (ztag.indexOf(' ') > -1) {
							ztagname = ztag.substr(0,ztag.indexOf(' '));
							zattributes = ztag.substr(ztag.indexOf(' '),ztag.length - ztag.indexOf(' '));
						} else {
							ztagname = ztag.substr(0,ztag.length);
						}
						while (zattributes.indexOf(' = ') > -1 || zattributes.indexOf('= ') > -1 || zattributes.indexOf(' =') > -1 || zattributes.indexOf(' : ') > -1 || zattributes.indexOf(': ') > -1 || zattributes.indexOf(' :') > -1 || zattributes.indexOf(' ; ') > -1 || zattributes.indexOf('; ') > -1 || zattributes.indexOf(' ;') > -1) {
							zattributes = zattributes.replace(' = ','=').replace('= ','=').replace(' =','=').replace(' : ',':').replace(': ',':').replace(' :',':').replace(' ; ',';').replace('; ',';').replace(' ;',';').toLowerCase();
						}
						zhtmlind += 1;
						if (zhtmlsegments[zhtmlind] == null) {
							zhtmlsegments[zhtmlind] = WTW.newHTMLSegment();
						}
						zhtmlsegments[zhtmlind].tagname = ztagname;
						zhtmlsegments[zhtmlind].style.color = zhtmlsegments[zhtmlind-1].style.color;
						zhtmlsegments[zhtmlind].style.float = zhtmlsegments[zhtmlind-1].style.float;
						zhtmlsegments[zhtmlind].style.textalign = zhtmlsegments[zhtmlind-1].style.textalign;
						zhtmlsegments[zhtmlind].style.display = zhtmlsegments[zhtmlind-1].style.display;
						zhtmlsegments[zhtmlind].style.width = zhtmlsegments[zhtmlind-1].style.width;
						zhtmlsegments[zhtmlind].style.height = zhtmlsegments[zhtmlind-1].style.height;
						zhtmlsegments[zhtmlind].style.size = zhtmlsegments[zhtmlind-1].style.size;
						zhtmlsegments[zhtmlind].style.lineheight = zhtmlsegments[zhtmlind-1].style.lineheight;
						zhtmlsegments[zhtmlind].style.fontsize = zhtmlsegments[zhtmlind-1].style.fontsize;
						zhtmlsegments[zhtmlind].style.borderwidth = zhtmlsegments[zhtmlind-1].style.borderwidth;
						zhtmlsegments[zhtmlind].style.bordercolor = zhtmlsegments[zhtmlind-1].style.bordercolor;
						zhtmlsegments[zhtmlind].style.maxwidth = zhtmlsegments[zhtmlind-1].style.maxwidth;
						zhtmlsegments[zhtmlind].style.marginleft = zhtmlsegments[zhtmlind-1].style.marginleft;
						zhtmlsegments[zhtmlind].style.marginright = zhtmlsegments[zhtmlind-1].style.marginright;
						zhtmlsegments[zhtmlind].style.margintop = zhtmlsegments[zhtmlind-1].style.margintop;
						zhtmlsegments[zhtmlind].style.marginbottom = zhtmlsegments[zhtmlind-1].style.marginbottom;
						var zattrib = [];
						if (zattributes.indexOf(' ') > -1) {
							zattrib = zattributes.split(' ');
						} else {
							zattrib[0] = zattributes;
						}
						for (var a=0;a < zattrib.length;a++) {
							var zattribute = '';
							var zproperties = '';
							if (zattrib[a].indexOf('=') > -1) {
								var zattributeparts = zattrib[a].split('=');
								zattribute = zattributeparts[0];
								while (zattribute.indexOf("'") > -1 || zattribute.indexOf(/'/g) > -1) {
									zattribute = zattribute.replace(/'/g, '').replace("'",'');
								}
								zproperties = zattributeparts[1];
								while (zproperties.indexOf('"') > -1 || zproperties.indexOf(/'/g) > -1) {
									zproperties = zproperties.replace(/'/g, '').replace('"','');
								}
							} else {
								zattribute = zattrib[a];
								while (zattribute.indexOf('"') > -1 || zattribute.indexOf(/'/g) > -1) {
									zattribute = zattribute.replace(/'/g, '').replace('"','');
								}
							}
							if (zattribute.length > 0) {
								if (zattribute == 'style') {
									var zprops = [];
									if (zproperties.indexOf(';') > -1) {
										zprops = zproperties.split(';');
									} else {
										zprops[0] = zproperties;
									}
									for (var p=0;p < zprops.length;p++) {
										if (zprops[p].length > 0) {
											if (zprops[p].indexOf(':') > -1) {
												var zproppart = zprops[p].split(':');
												var zprop = zproppart[0];
												while(zprop.indexOf('-') > -1) {
													zprop = zprop.replace('-','');
												}
												var zvalue = zproppart[1];
												switch (zprop) {
													case 'color':
														zhtmlsegments[zhtmlind].style.color = zvalue;
														break;
													case 'float':
														zhtmlsegments[zhtmlind].style.float = zvalue;
														break;
													case 'textalign':
														zhtmlsegments[zhtmlind].style.textalign = zvalue;
														break;
													case 'display':
														zhtmlsegments[zhtmlind].style.display = zvalue;
														break;
													case 'width':
														zhtmlsegments[zhtmlind].style.width = zvalue;
														break;
													case 'height':
														zhtmlsegments[zhtmlind].style.height = zvalue;
														break;
													case 'size':
														zhtmlsegments[zhtmlind].style.size = zvalue;
														break;
													case 'lineheight':
														zhtmlsegments[zhtmlind].style.lineheight = zvalue;
														break;
													case 'fontsize':
														zhtmlsegments[zhtmlind].style.fontsize = zvalue;
														break;
													case 'borderwidth':
														zhtmlsegments[zhtmlind].style.borderwidth = zvalue;
														break;
													case 'bordercolor':
														zhtmlsegments[zhtmlind].style.bordercolor = zvalue;
														break;
													case 'maxwidth':
														zhtmlsegments[zhtmlind].style.maxwidth = zvalue;
														break;
													case 'marginleft':
														zhtmlsegments[zhtmlind].style.marginleft = zvalue;
														break;
													case 'marginright':
														zhtmlsegments[zhtmlind].style.marginright = zvalue;
														break;
													case 'margintop':
														zhtmlsegments[zhtmlind].style.margintop = zvalue;
														break;
													case 'marginbottom':
														zhtmlsegments[zhtmlind].style.marginbottom = zvalue;
														break;
												}
											}
										}
									}
								} else if (zattribute == 'src') {
									zhtmlsegments[zhtmlind].src = zproperties;
								}
							}
						}
						var zminx = 0;
						var zparagraph;
						var zlineheight = 30;
						if (zhtmlsegments[zhtmlind].style.lineheight.indexOf('em') > -1 && WTW.isNumeric(zhtmlsegments[zhtmlind].style.lineheight.replace('px','').replace('em','').replace('pt','').replace(' ',''))) {
							zlineheight = Number(zhtmlsegments[zhtmlind].style.lineheight.replace('em','').replace(' ','')) * 12;
						} else if (WTW.isNumeric(zhtmlsegments[zhtmlind].style.lineheight.replace('px','').replace('em','').replace('pt','').replace(' ',''))) {
							zlineheight = Number(zhtmlsegments[zhtmlind].style.lineheight.replace('px','').replace('pt','').replace(' ',''));
						}
						var zfontsize = 20;
						if (zhtmlsegments[zhtmlind].style.fontsize.indexOf('em') > -1 && WTW.isNumeric(zhtmlsegments[zhtmlind].style.fontsize.replace('px','').replace('em','').replace('pt','').replace(' ',''))) {
							zfontsize = Number(zhtmlsegments[zhtmlind].style.fontsize.replace('em','').replace(' ','')) * 12;
						} else if (WTW.isNumeric(zhtmlsegments[zhtmlind].style.fontsize.replace('px','').replace('em','').replace('pt','').replace(' ',''))) {
							zfontsize = Number(zhtmlsegments[zhtmlind].style.fontsize.replace('px','').replace('pt','').replace(' ',''));
						}
						if (zattributes.indexOf('/') > -1) {
							switch (ztagname) {
								case 'br':
									zparagraph = WTW.wrapText(zcontent, ' ', zhtmlsegments[zhtmlind].style.lineheight, zhtmlsegments[zhtmlind].style.fontsize, zhtmlsegments[zhtmlind].style.textalign, 'top', zhtmlsegments[zhtmlind].style.color, zliney, zhtmlsegments[zhtmlind].style.maxwidth, zhtmlsegments[zhtmlind].style.marginleft, zhtmlsegments[zhtmlind].style.marginright, zhtmlsegments[zhtmlind].system.float, zhtmlsegments[zhtmlind].system.floatwidth, zhtmlsegments[zhtmlind].system.floatheight);
									zliney += zparagraph.height;
									zhtmlsegments[0].system.indent = 0;
									zmaxwidth = zparagraph.maxwidth;
									zmaxheight = zparagraph.maxheight;
									zminx = zparagraph.minx;
									break;
								case 'hr':
									var zhrname = zmoldname + '-posttexthr' + zhrind;
									var zhrbox = WTW.getMeshOrNodeByID(zhrname);
									if (zliney < -10 || zliney > 490) {
										if (zhrbox != null) {
											zhrbox.dispose();
										}
									} else {
										var zhry = .95 * ((-zliney/512 * zmold.scaling.y) + 6.8);
										if (zhrbox == null) {
											var zhrtexture = '/content/stock/walls/blue.jpg';
											var zhrtextureid = 'vvpzrv2pae3bbkwv';
											switch (zhtmlsegments[zhtmlind].style.color) {
												case 'red':
													zhrtexture = '/content/stock/walls/red.jpg';
													zhrtextureid = 'sjbxon868lcuaub5';
													break;
												case 'green':
													zhrtexture = '/content/stock/walls/green.jpg';
													zhrtextureid = 'ngb72qh6hvy3ms5c';
													break;
												case 'gray':
													zhrtexture = '/content/stock/walls/gray.jpg';
													zhrtextureid = 'ksa2h7mf909cvech';
													break;
												case 'lightgray':
													zhrtexture = '/content/stock/walls/lightgray.jpg';
													zhrtextureid = 't1qlqxd6pzubzzzy';
													break;
											}
											var zbasicmold = WTW.newMold();
											zbasicmold.shape = 'box';
											zbasicmold.position.x = .5;
											zbasicmold.position.y = zhry;
											zbasicmold.position.z = -.5;
											zbasicmold.scaling.x = 1;
											zbasicmold.scaling.y = .15;
											zbasicmold.scaling.z = zmold.scaling.z - 2;
											zbasicmold.subdivisions = 12;
											zbasicmold.graphics.texture.id = zhrtextureid;
											zbasicmold.parentname = zmoldname + '-scale';
											zbasicmold.checkcollisions = '1';
											var zposttexthr = WTW.addMold(zhrname, zbasicmold, zbasicmold.parentname, zbasicmold.covering);
										} else {
											zhrbox.position.y = zhry;
										}
									}
									zhrind += 1;
									zparagraph = WTW.wrapText(zcontent, ' ', zhtmlsegments[zhtmlind].style.lineheight, zhtmlsegments[zhtmlind].style.fontsize, zhtmlsegments[zhtmlind].style.textalign, 'top', zhtmlsegments[zhtmlind].style.color, zliney, zhtmlsegments[zhtmlind].style.maxwidth, zhtmlsegments[zhtmlind].style.marginleft, zhtmlsegments[zhtmlind].style.marginright, zhtmlsegments[zhtmlind].system.float, zhtmlsegments[zhtmlind].system.floatwidth, zhtmlsegments[zhtmlind].system.floatheight);
									/* zparagraph = WTW.addHtmlHR(zcontent, zhtmlsegments[zhtmlind].style.color, zhtmlsegments[zhtmlind].style.textalign, zhtmlsegments[zhtmlind].style.size, zhtmlsegments[zhtmlind].style.width, zliney); */
									zliney += zparagraph.height;
									zhtmlsegments[0].system.indent = 0;
									zmaxwidth = zparagraph.maxwidth;
									zmaxheight = zparagraph.maxheight;
									zminx = zparagraph.minx;
									break;
								case 'img':
									zparagraph = WTW.addHtmlImg(zcontent, zhtmlsegments[zhtmlind].src, zhtmlsegments[zhtmlind].style.textalign, zhtmlsegments[zhtmlind].style.width, zhtmlsegments[zhtmlind].style.height, zhtmlsegments[zhtmlind].style.borderwidth, zhtmlsegments[zhtmlind].style.bordercolor, zliney, 0, zhtmlsegments[zhtmlind].style.marginleft, zhtmlsegments[zhtmlind].style.marginright, zhtmlsegments[zhtmlind].style.margintop, zhtmlsegments[zhtmlind].style.marginbottom);
									zhtmlsegments[0].system.indent = 0;
									zmaxwidth = zparagraph.maxwidth;
									zmaxheight = zparagraph.maxheight;
									zminx = zparagraph.minx;
									if (zhtmlsegments[zhtmlind].style.float != '') {
										zhtmlsegments[zhtmlind].system.float = zhtmlsegments[zhtmlind].style.float;
										zhtmlsegments[zhtmlind].system.floatwidth = zparagraph.width;
										zhtmlsegments[zhtmlind].system.floatheight = zparagraph.height;
									} else {
										zliney += zparagraph.height;
									}
									break;
								default:
									
									break;
							}
							if (zhtmlwidth < zparagraph.width) {
								zhtmlwidth = zparagraph.width;
							}
							if (zwords.length > 0) {
								if (zhtmlsegments[zhtmlind].style.display == 'inline') {
									zliney -= zlineheight;
									zparagraph = WTW.wrapText(zcontent, zwords, zhtmlsegments[zhtmlind].style.lineheight, zhtmlsegments[zhtmlind].style.fontsize, zhtmlsegments[zhtmlind].style.textalign, 'top', zhtmlsegments[zhtmlind].style.color, zliney, zhtmlsegments[0].system.indent, zhtmlsegments[zhtmlind].style.maxwidth, zhtmlsegments[zhtmlind].style.marginleft, zhtmlsegments[zhtmlind].style.marginright, zhtmlsegments[zhtmlind].system.float, zhtmlsegments[zhtmlind].system.floatwidth, zhtmlsegments[zhtmlind].system.floatheight);
									zliney += zparagraph.height;
								} else {
									if (zhtmlsegments[zhtmlind].system.floatheight > 0) {
										/* zliney -= zhtmlsegments[zhtmlind].system.floatheight; */
									}
									zparagraph = WTW.wrapText(zcontent, zwords, zhtmlsegments[zhtmlind].style.lineheight, zhtmlsegments[zhtmlind].style.fontsize, zhtmlsegments[zhtmlind].style.textalign, 'top', zhtmlsegments[zhtmlind].style.color, zliney, 5, zhtmlsegments[zhtmlind].style.maxwidth, zhtmlsegments[zhtmlind].style.marginleft, zhtmlsegments[zhtmlind].style.marginright, zhtmlsegments[zhtmlind].system.float, zhtmlsegments[zhtmlind].system.floatwidth, zhtmlsegments[zhtmlind].system.floatheight);
									zliney += zparagraph.height;
									zhtmlsegments[0].system.indent = 0;
								}
								if (zhtmlwidth < zparagraph.width) {
									zhtmlwidth = zparagraph.width;
								}
								zmaxwidth = zparagraph.maxwidth;
								zmaxheight = zparagraph.maxheight;
								zminx = zparagraph.minx;
								zhtmlsegments[0].system.indent += zparagraph.linewidth + zfontsize/2;
								if (zhtmlsegments[zhtmlind].system.floatheight > zparagraph.height) {

									zliney += (zhtmlsegments[zhtmlind].system.floatheight - zparagraph.height);
								}
								zhtmlsegments[zhtmlind].system.float = '';
								zhtmlsegments[zhtmlind].system.floatwidth = 0;
								zhtmlsegments[zhtmlind].system.floatheight = 0;
							}
							zhtmlind -= 1;
						} else if (zwords.length > 0) {
							if (zhtmlsegments[zhtmlind].style.display == 'inline') {
								zliney -= zlineheight;
								zparagraph = WTW.wrapText(zcontent, zwords, zhtmlsegments[zhtmlind].style.lineheight, zhtmlsegments[zhtmlind].style.fontsize, zhtmlsegments[zhtmlind].style.textalign, 'top', zhtmlsegments[zhtmlind].style.color, zliney, zhtmlsegments[0].system.indent, zhtmlsegments[zhtmlind].style.maxwidth, zhtmlsegments[zhtmlind].style.marginleft, zhtmlsegments[zhtmlind].style.marginright, zhtmlsegments[zhtmlind].system.float, zhtmlsegments[zhtmlind].system.floatwidth, zhtmlsegments[zhtmlind].system.floatheight);
								zliney += zparagraph.height;
							} else {
								if (zhtmlsegments[zhtmlind].system.floatheight > 0) {
									/* zliney -= zhtmlsegments[zhtmlind].system.floatheight; */
								}
								zparagraph = WTW.wrapText(zcontent, zwords, zhtmlsegments[zhtmlind].style.lineheight, zhtmlsegments[zhtmlind].style.fontsize, zhtmlsegments[zhtmlind].style.textalign, 'top', zhtmlsegments[zhtmlind].style.color, zliney, 5, zhtmlsegments[zhtmlind].style.maxwidth, zhtmlsegments[zhtmlind].style.marginleft, zhtmlsegments[zhtmlind].style.marginright, zhtmlsegments[zhtmlind].system.float, zhtmlsegments[zhtmlind].system.floatwidth, zhtmlsegments[zhtmlind].system.floatheight);
								zliney += zparagraph.height;
								zhtmlsegments[0].system.indent = 0;
							}
							if (zhtmlwidth < zparagraph.width) {
								zhtmlwidth = zparagraph.width;
							}
							zmaxwidth = zparagraph.maxwidth;
							zmaxheight = zparagraph.maxheight;
							zminx = zparagraph.minx;
							zhtmlsegments[0].system.indent += zparagraph.linewidth + zfontsize/2;
							if (zhtmlsegments[zhtmlind].system.floatheight > zparagraph.height) {

								zliney += (zhtmlsegments[zhtmlind].system.floatheight - zparagraph.height);
							}
							zhtmlsegments[zhtmlind].system.float = '';
							zhtmlsegments[zhtmlind].system.floatwidth = 0;
							zhtmlsegments[zhtmlind].system.floatheight = 0;
						}
						
						zhtmlsegments[zhtmlind].system.x = zminx - zfontsize/16;
						zhtmlsegments[zhtmlind].system.y = (zliney - zparagraph.height) - zscrollpos + zfontsize/4;
						zhtmlsegments[zhtmlind].system.width = zparagraph.width + zfontsize/8;
						zhtmlsegments[zhtmlind].system.height = zparagraph.height;
						zhtmlsegments[zhtmlind].system.maxwidth = zmaxwidth;
						zhtmlsegments[zhtmlind].system.maxheight = zmaxheight;
						zhtmlheight += zparagraph.height;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-molds-wtw_3dblog.js-wrapHtml=' + ex.message);
	} 
	return {
		width:zhtmlwidth,
		height:zhtmlheight,
		maxwidth:zmaxwidth,
		maxheight:zmaxheight
	};
} 

WTWJS.prototype.scrollBoxMove = function(zmoldname, zscrollmove) {
	/* move the scroll box (scroll the 3d blog wall) */
	try {
		if (WTW.mouseTimer != null) {
			window.clearInterval(WTW.mouseTimer);
			WTW.mouseTimer = null;
		}
		WTW.scrollBoxRepaint(zmoldname, zscrollmove);
		WTW.mouseTimer = window.setInterval(function () {
			WTW.scrollBoxRepaint(zmoldname, zscrollmove);
		}, 100);
	} catch (ex) {
		WTW.log('core-scripts-molds-wtw_3dblog.js-scrollBoxMove=' + ex.message);
	} 
}

WTWJS.prototype.scrollBoxRepaint = function(zmoldname, zscrollmove) {
	/* repaint the scroll box (after scroll the 3d blog wall) */
	try {
		if (zmoldname.indexOf('-') > -1) {
			var znamepart = zmoldname.split('-');
			if (znamepart.length > 7) {
				var zmolds = WTW.buildingMolds;
				var zmoldind = Number(znamepart[2]);
				if (znamepart[1] == 'communitymolds') {
					zmolds = WTW.communitiesMolds;
				}
				if (zmolds[zmoldind] != null) {
					var zscrollpos = 0;
					if (zmolds[zmoldind].position.scroll != undefined) {
						if (WTW.isNumeric(zmolds[zmoldind].position.scroll)) {
							zscrollpos = Number(zmolds[zmoldind].position.scroll);
						}
					}
					zscrollpos += zscrollmove;
					if (zscrollpos > 0) {
						zscrollpos = 0;
					}
					var zwebtext = '';
					zmoldname = znamepart[0] + '-' + znamepart[1] + '-' + znamepart[2] + '-' + znamepart[3] + '-' + znamepart[4] + '-' + znamepart[5] + '-' + znamepart[6];
					var zscrollboxbodytext = WTW.getMeshOrNodeByID(zmoldname + '-scrollboxbodytext');
					if (zscrollboxbodytext != null) {
						zscrollboxbodytext.WTW.webtext.scrollpos = zscrollpos;
						if (zmolds[zmoldind].webtext.webtext != undefined) {
							zwebtext = WTW.decode(zmolds[zmoldind].webtext.webtext);
						}
						
						if (zscrollboxbodytext.WTW.webtext.webtext != zwebtext) {
							zwebtext = zscrollboxbodytext.WTW.webtext.webtext;
						}
						if (zmoldname.indexOf('-blogposting') > -1 && zwebtext == '') {
							zwebtext = "<div style='color:green;'>Click Here to Post</div>";
						}
						var zcontentTexture = new BABYLON.DynamicTexture(zmoldname + '-scrollboxbodytexture', 512, scene, true);
						zcontentTexture.name = zmoldname + '-scrollboxbodytexture';
						zcontentTexture.hasAlpha = true;
						zscrollboxbodytext.material.diffuseTexture = zcontentTexture;
						var zparagraph = WTW.wrapHtml(zscrollboxbodytext, zwebtext, zscrollpos);
						if (zparagraph.height < zparagraph.maxheight) {
							zscrollpos -= zscrollmove;
						}
						zmolds[zmoldind].webtext.fullheight = zparagraph.height;
						var zscrollboxtab = WTW.getMeshOrNodeByID(zmoldname + '-scrollboxtab');
						if (zparagraph.height > zparagraph.maxheight) {
							if (zscrollboxtab == null) {
								var zbuttontextureid = 'vvpzrv2pae3bbkwv';
								var zbuttontexturehoverid = 'yxs6lcxokr6lhll3';
								var zarrowdownid = 'hj9oly198c17x086';
								var zarrowdownhoverid = 'q3bajsb9brye6q3c';
								var zarrowupid = 'xghzjpxk2lqv9l9k';
								var zarrowuphoverid = 'jgmqro16rbainojm';
								var zleny = Number(zmolds[zmoldind].scaling.y);
								var ztabheight = 1;
								if (zparagraph.maxheight < zparagraph.height) {
									ztabheight = (zleny - 2) * zparagraph.maxheight / zparagraph.height;
								}
								if ((zleny - 2) * zparagraph.maxheight / zparagraph.height > (zleny - 2)) {
									ztabheight = (zleny - 2);
								}
								var ztabpos = ztabpos = (zleny - 2) / 2 - ztabheight / 2;
								
								var zbasicmold9 = WTW.newMold();
								zbasicmold9.shape = 'box';
								zbasicmold9.position.x = 1/4 + .2;
								zbasicmold9.position.y = ztabpos;
								zbasicmold9.position.z = 15/2 - .75;
								zbasicmold9.scaling.x = .5;
								zbasicmold9.scaling.y = ztabheight;
								zbasicmold9.scaling.z = .65;
								zbasicmold9.subdivisions = 12;
								zbasicmold9.graphics.texture.id = zbuttontextureid;
								zbasicmold9.parentname = zmoldname + '-scale';
								zbasicmold9.checkcollisions = '1';
								zbasicmold9.ispickable = '1';
								zscrollboxtab = WTW.addMold(zmoldname + '-scrollboxtab', zbasicmold9, zbasicmold9.parentname, zbasicmold9.covering);
								zscrollboxtab.WTW = zbasicmold9;

								var zbasicmold9b = WTW.newMold();
								zbasicmold9b.shape = 'box';
								zbasicmold9b.position.x = 0;
								zbasicmold9b.position.y = 0;
								zbasicmold9b.position.z = 0;
								zbasicmold9b.scaling.x = .8;
								zbasicmold9b.scaling.y = .99;
								zbasicmold9b.scaling.z = .8;
								zbasicmold9b.subdivisions = 12;
								zbasicmold9b.graphics.texture.id = zbuttontexturehoverid;
								zbasicmold9b.parentname = zmoldname + '-scrollboxtab';
								zbasicmold9b.checkcollisions = '1';
								var zscrollboxtabhover = WTW.addMold(zmoldname + '-scrollboxtabhover', zbasicmold9b, zbasicmold9b.parentname, zbasicmold9b.covering);
								
								var zbasicmold5 = WTW.newMold();
								zbasicmold5.shape = 'box';
								zbasicmold5.covering = 'directional texture';
								zbasicmold5.position.x = 1/4 + .2;
								zbasicmold5.position.y = 15/2 - .6;
								zbasicmold5.position.z = 15/2 - .75;
								zbasicmold5.scaling.x = .5;
								zbasicmold5.scaling.y = .65;
								zbasicmold5.scaling.z = .65;
								zbasicmold5.graphics.uscale = 15;
								zbasicmold5.graphics.vscale = 17;
								zbasicmold5.subdivisions = 12;
								zbasicmold5.graphics.texture.id = zarrowupid;
								zbasicmold5.parentname = zmoldname + '-scale';
								zbasicmold5.checkcollisions = '1';
								zbasicmold5.ispickable = '1';
								var zscrollboxup = WTW.addMold(zmoldname + '-scrollboxup', zbasicmold5, zbasicmold5.parentname, zbasicmold5.covering);
								zscrollboxup.WTW = zbasicmold5;

								var zbasicmold5b = WTW.newMold();
								zbasicmold5b.shape = 'box';
								zbasicmold5b.covering = 'directional texture';
								zbasicmold5b.position.x = 0;
								zbasicmold5b.position.y = 0;
								zbasicmold5b.position.z = 0;
								zbasicmold5b.scaling.x = .8;
								zbasicmold5b.scaling.y = .8;
								zbasicmold5b.scaling.z = .8;
								zbasicmold5b.graphics.uscale = 13;
								zbasicmold5b.graphics.vscale = 13;
								zbasicmold5b.subdivisions = 12;
								zbasicmold5b.graphics.texture.id = zarrowuphoverid;
								zbasicmold5b.parentname = zmoldname + '-scrollboxup';
								zbasicmold5b.checkcollisions = '1';
								var zscrollboxuphover = WTW.addMold(zmoldname + '-scrollboxuphover', zbasicmold5b, zbasicmold5b.parentname, zbasicmold5b.covering);

								var zbasicmold7 = WTW.newMold();
								zbasicmold7.shape = 'box';
								zbasicmold7.covering = 'directional texture';
								zbasicmold7.position.x = 1/4 + .2;
								zbasicmold7.position.y = -15/2 + .6;
								zbasicmold7.position.z = 15/2 - .75;
								zbasicmold7.scaling.x = .5;
								zbasicmold7.scaling.y = .65;
								zbasicmold7.scaling.z = .65;
								zbasicmold7.rotation.z = 90;
								zbasicmold7.rotation.y = 180;
								zbasicmold7.graphics.uscale = 15;
								zbasicmold7.graphics.vscale = 17;
								zbasicmold7.subdivisions = 12;
								zbasicmold7.graphics.texture.id = zarrowdownid;
								zbasicmold7.parentname = zmoldname + '-scale';
								zbasicmold7.checkcollisions = '1';
								zbasicmold7.ispickable = '1';
								var zscrollboxdown = WTW.addMold(zmoldname + '-scrollboxdown', zbasicmold7, zbasicmold7.parentname, zbasicmold7.covering);
								zscrollboxdown.WTW = zbasicmold7;

								var zbasicmold7b = WTW.newMold();
								zbasicmold7b.shape = 'box';
								zbasicmold7b.covering = 'directional texture';
								zbasicmold7b.position.x = 0;
								zbasicmold7b.position.y = 0;
								zbasicmold7b.position.z = 0;
								zbasicmold7b.scaling.x = .8;
								zbasicmold7b.scaling.y = .8;
								zbasicmold7b.scaling.z = .8;
								zbasicmold7b.graphics.uscale = 13;
								zbasicmold7b.graphics.vscale = 13;
								zbasicmold7b.subdivisions = 12;
								zbasicmold7b.graphics.texture.id = zarrowdownhoverid;
								zbasicmold7b.parentname = zmoldname + '-scrollboxdown';
								zbasicmold7b.checkcollisions = '1';
								var zscrollboxdownhover = WTW.addMold(zmoldname + '-scrollboxdownhover', zbasicmold7b, zbasicmold7b.parentname, zbasicmold7b.covering);

								scrollboxtab.position.y = (zscrollboxbodytext.parent.scaling.y - 1) / 2 - zscrollboxtab.scaling.y / 2 + (zscrollpos / (zparagraph.height - zparagraph.maxheight) * ((zscrollboxbodytext.parent.scaling.y - 1) - zscrollboxtab.scaling.y));
							} else {
								if (zscrollpos < zparagraph.maxheight - zparagraph.height) {
									zscrollpos = zparagraph.maxheight - zparagraph.height;
								}
								zscrollboxtab.position.y = (zscrollboxbodytext.parent.scaling.y - 1) / 2 - zscrollboxtab.scaling.y / 2 + (zscrollpos / (zparagraph.height - zparagraph.maxheight) * ((zscrollboxbodytext.parent.scaling.y - 1) - zscrollboxtab.scaling.y));
							}								
						}
						if (zmolds[zmoldind].position.scroll != undefined) {
							zmolds[zmoldind].position.scroll = zscrollpos;
						}
					}
				}
			}
		}
		if (scene.activeCameras[0] != null) {
			scene.activeCameras[0].attachControl(canvas, true); /* true allows canvas default event actions */
		}
	} catch (ex) {
		WTW.log('core-scripts-molds-wtw_3dblog.js-scrollBoxRepaint=' + ex.message);
	} 
}


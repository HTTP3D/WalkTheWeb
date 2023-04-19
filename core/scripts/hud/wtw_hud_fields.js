/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions provide many of the common functions for browse and admin modes */
/* The heads up display (hud) provides menu options and user settings */
/* hud-Fields are part of the page 3D Form fields added to the HUD. (Label, Textbox, Slider, Image Button, Button, etc...) */

WTWJS.prototype.hudAddLabel = function(zlabel, zid, zpositionx, zpositiony, zpositionz, zfontsize, zfontthickness) {
	/* Add Lable to Page Form */
	try {
		if (zfontsize == undefined) {
			zfontsize = 1;
		}
		if (zfontthickness == undefined) {
			zfontthickness = .2;
		}
		var zmold = WTW.getMeshOrNodeByID('hud-pageform');
		if (zmold != null) {
			var zstyle = {
				'font-family': 'Arial',
				'anchor':'left',
				'letter-height':zfontsize,
				'letter-thickness':zfontthickness,
				'color':'#ffffff',
				'alpha':1.00,
				'colors':{
					'diffuse':'#ffffff',
					'specular':'#989e2c',
					'ambient':'#888722',
					'emissive':'#37370d'
				}
			};
			var zmenuitemtextwriter = new Writer(zlabel, zstyle);
			var zmenuitemtext = zmenuitemtextwriter.getMesh();
			zmenuitemtext.rotation = new BABYLON.Vector3(WTW.getRadians(-90), 0, 0);
			zmenuitemtext.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			zmenuitemtext.id = zid;
			zmenuitemtext.name = zid;
			zmenuitemtext.parent = zmold;
			zmenuitemtext.isPickable = false;
			zmenuitemtext.renderingGroupId = 3;
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_fields.js-hudGetProfile=' + ex.message);
	}
}

WTWJS.prototype.hudAddTextbox = function(zvalue, zid, zpositionx, zpositiony, zpositionz) {
	/* Add Textbox to Page Form */
	try {
		var zmold = WTW.getMeshOrNodeByID('hud-pageform');
		var ztextboxmaster = WTW.getMeshOrNodeByID('hud-textbox');
		if (zmold != null && ztextboxmaster != null) {
			var ztextboxid = 'hud-textbox-' + zid;
			if (dGet(ztextboxid) == null) {
				if (dGet('wtw_hudfields') == null) {
					var zhuddiv = document.createElement('div');
					zhuddiv.id = 'wtw_hudfields';
					zhuddiv.className = 'wtw-hide';
					document.getElementsByTagName('body')[0].appendChild(zhuddiv);
				}
				var zinput = document.createElement('input');
				zinput.id = ztextboxid;
				zinput.type = 'hidden';
				zinput.value = '';
				dGet('wtw_hudfields').appendChild(zinput);
			}
			
			var ztextbox = ztextboxmaster.clone(ztextboxid);
			ztextbox.id = ztextboxid;
			ztextbox.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			ztextbox.isPickable = true;
			ztextbox.isVisible = true;
			ztextbox.parent = zmold;
			ztextbox.renderingGroupId = 3;

			var zstyle = {
				'font-family': 'Arial',
				'anchor':'left',
				'letter-height':.9,
				'letter-thickness':.4,
				'color':'#ffffff',
				'alpha':1.00,
				'colors':{
					'diffuse':'#ffffff',
					'specular':'#989e2c',
					'ambient':'#888722',
					'emissive':'#37370d'
				}
			};
			dGet(ztextboxid).value = zvalue;
			if (zvalue != '') {
				var zshowtext = dGet(ztextboxid).value;
				/* if text is too long, trim text for display */
				var zmaxlength = 10;
				if (zshowtext.indexOf('|') > -1) {
					zshowtext = zshowtext.replace('|','');
				}
				/* W and M are wider and can not fit as many characters on the display screen */
				if (zshowtext.indexOf('w') > -1 || zshowtext.indexOf('m') > -1 || zshowtext.indexOf('W') > -1 || zshowtext.indexOf('M') > -1) {
					zmaxlength = 8;
				}
				if (zshowtext.length > zmaxlength) {
					zshowtext = zshowtext.substr(0,zshowtext.length-(zshowtext.length-zmaxlength-1)) + '...';
				}
				
				var zmenuitemtextwriter = new Writer(zshowtext, zstyle);
				var zvaluetext = zmenuitemtextwriter.getMesh();
				zvaluetext.rotation = new BABYLON.Vector3(WTW.getRadians(-90), 0, 0);
				zvaluetext.position = new BABYLON.Vector3(zpositionx-2.75, zpositiony-.25, zpositionz-.1);
				zvaluetext.id = 'hud-textbox-' + zid + '-text';
				zvaluetext.name = 'hud-textbox-' + zid + '-text';
				zvaluetext.parent = zmold;
				zvaluetext.renderingGroupId = 3;
				zvaluetext.isPickable = false;
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_fields.js-hudAddTextbox=' + ex.message);
	}
}

WTWJS.prototype.hudAddImageButton = function(zimageurl, zid, zpositionx, zpositiony, zpositionz, zactive) {
	/* Add Image Button to Page Form */
	try {
		if (zactive == undefined) {
			zactive = 0;
		}
		var zmold = WTW.getMeshOrNodeByID('hud-pageform');
		var zbuttonmaster = WTW.getMeshOrNodeByID('hud-menuitem');
		if (zmold != null && zbuttonmaster != null) {
			var zbutton = zbuttonmaster.clone('hud-imagebutton-' + zid);
			zbutton.id = 'hud-imagebutton-' + zid;
			zbutton.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			zbutton.scaling = new BABYLON.Vector3(.3, 1, 1);
			zbutton.isPickable = true;
			zbutton.isVisible = true;
			zbutton.parent = zmold;
			zbutton.renderingGroupId = 3;
			var zbgcolor = '#000000';
			/* need to check if it is selected */
			if (zactive == 1) {
				zbgcolor = '#09255F';
			}
			/* reset the material on the menu item button - blue for selected and black is default */
			var zbuttoncovering = new BABYLON.StandardMaterial('hud-imagebutton-' + zid + '-mat', scene);
			zbuttoncovering.alpha = 1;
			zbuttoncovering.emissiveColor =  new BABYLON.Color3.FromHexString(zbgcolor);
			zbuttoncovering.diffuseColor =  new BABYLON.Color3.FromHexString(zbgcolor);
			zbuttoncovering.specularColor =  new BABYLON.Color3.FromHexString(zbgcolor);
			zbuttoncovering.ambientColor =  new BABYLON.Color3.FromHexString(zbgcolor);
			zbutton.material = zbuttoncovering;
			
			var zimage = BABYLON.MeshBuilder.CreatePlane('hud-imagebutton-image-' + zid, {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
			var zcovering = new BABYLON.StandardMaterial('hud-imagebutton-image-' + zid + '-mat', scene);
			zcovering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageurl, 'hud-imagebutton-image' + zid + '-texture', scene);
			var zbgcolor = '#7C7C7C';
			if (zactive == 1) {
				zbgcolor = '#ffffff';
			}
			zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zbgcolor);
			zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zbgcolor);
			zcovering.specularColor = new BABYLON.Color3.FromHexString('#000000');
			zimage.material = zcovering;
			zimage.position = new BABYLON.Vector3(0, 0, -.1);
			zimage.scaling = new BABYLON.Vector3(1/.3, 1, 1);
			zimage.isPickable = false;
			zimage.parent = zbutton;
			zimage.renderingGroupId = 3;
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_fields.js-hudAddImageButton=' + ex.message);
	}
}

WTWJS.prototype.hudAddSlider = function(zvalue, zmin, zmax, zid, zpositionx, zpositiony, zpositionz) {
	/* Add Slider Control to Page Form */
	try {
		var zmold = WTW.getMeshOrNodeByID('hud-pageform');
		var zslidermaster = WTW.getMeshOrNodeByID('hud-slider');
		var zslidertabmaster = WTW.getMeshOrNodeByID('hud-slidertab');
		var zsliderleftmaster = WTW.getMeshOrNodeByID('hud-sliderleft');
		var zsliderrightmaster = WTW.getMeshOrNodeByID('hud-sliderright');
		if (zmold != null && zslidermaster != null) {
			var zsliderid = 'hud-slider-' + zid;
			if (dGet(zsliderid) == null) {
				if (dGet('wtw_hudfields') == null) {
					var zhuddiv = document.createElement('div');
					zhuddiv.id = 'wtw_hudfields';
					zhuddiv.className = 'wtw-hide';
					document.getElementsByTagName('body')[0].appendChild(zhuddiv);
				}
				var zinput = document.createElement('input');
				zinput.id = zsliderid;
				zinput.type = 'hidden';
				zinput.value = zvalue;
				dGet('wtw_hudfields').appendChild(zinput);

				var zinputmin = document.createElement('input');
				zinputmin.id = zsliderid + '-min';
				zinputmin.type = 'hidden';
				zinputmin.value = zmin;
				dGet('wtw_hudfields').appendChild(zinputmin);

				var zinputmax = document.createElement('input');
				zinputmax.id = zsliderid + '-max';
				zinputmax.type = 'hidden';
				zinputmax.value = zmax;
				dGet('wtw_hudfields').appendChild(zinputmax);
			}
			
			/* 5.4 is the total distance of the slider */
			var ztabposition = ((zvalue / (zmax - zmin)) * 5.4);

			var zcovering = new BABYLON.StandardMaterial('hud-slider-' + zid + 'mat', scene);
			zcovering.emissiveColor =  new BABYLON.Color3.FromHexString('#30320B');
			zcovering.diffuseColor =  new BABYLON.Color3.FromHexString('#464910');
			zcovering.specularColor =  new BABYLON.Color3.FromHexString('#464910');
			zcovering.ambientColor =  new BABYLON.Color3.FromHexString('#30320B');
			
			var zslidertab = zslidertabmaster.clone(zsliderid);
			zslidertab.id = zsliderid;
			zslidertab.position = new BABYLON.Vector3(zpositionx + ztabposition, zpositiony, zpositionz);
			zslidertab.isPickable = true;
			zslidertab.isVisible = true;
			zslidertab.parent = zmold;
			zslidertab.renderingGroupId = 3;
			zslidertab.material = zcovering;

			var zslider = zslidermaster.clone(zsliderid + '-track');
			zslider.id = zsliderid + '-track';
			zslider.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			zslider.isPickable = false;
			zslider.isVisible = true;
			zslider.parent = zmold;
			zslider.renderingGroupId = 3;

			var zsliderleft = zsliderleftmaster.clone(zsliderid + '-left');
			zsliderleft.id = zsliderid + '-left';
			zsliderleft.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			zsliderleft.isPickable = true;
			zsliderleft.isVisible = true;
			zsliderleft.parent = zmold;
			zsliderleft.renderingGroupId = 3;
			zsliderleft.material = zcovering;

			var zsliderright = zsliderrightmaster.clone(zsliderid + '-right');
			zsliderright.id = zsliderid + '-right';
			zsliderright.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			zsliderright.isPickable = true;
			zsliderright.isVisible = true;
			zsliderright.parent = zmold;
			zsliderright.renderingGroupId = 3;
			zsliderright.material = zcovering;

		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_fields.js-hudAddSlider=' + ex.message);
	}
}

WTWJS.prototype.hudAddSaveClose = function(zid, zpositionx, zpositiony, zpositionz) {
	/* Add Save and Close Buttons to Page Form */
	try {
		var zmold = WTW.getMeshOrNodeByID('hud-pageform');
		var zbuttonmaster = WTW.getMeshOrNodeByID('hud-menuitem');
		if (zmold != null && zbuttonmaster != null) {
			var zsavebutton = zbuttonmaster.clone('hud-save-' + zid);
			zsavebutton.id = 'hud-save-' + zid;
			zsavebutton.position = new BABYLON.Vector3(zpositionx-2.5, zpositiony, zpositionz);
			zsavebutton.scaling = new BABYLON.Vector3(.7, .8, 1);
			zsavebutton.isPickable = true;
			zsavebutton.isVisible = true;
			zsavebutton.parent = zmold;
			zsavebutton.renderingGroupId = 3;
			var zcovering = new BABYLON.StandardMaterial('hud-save-' + zid + 'mat', scene);
			zcovering.emissiveColor =  new BABYLON.Color3.FromHexString('#082F0C');
			zcovering.diffuseColor =  new BABYLON.Color3.FromHexString('#094A0F');
			zcovering.specularColor =  new BABYLON.Color3.FromHexString('#094A0F');
			zcovering.ambientColor =  new BABYLON.Color3.FromHexString('#082F0C');
			zsavebutton.material = zcovering;

			var zcancelbutton = zbuttonmaster.clone('hud-cancel-' + zid);
			zcancelbutton.id = 'hud-cancel-' + zid;
			zcancelbutton.position = new BABYLON.Vector3(zpositionx+2.5, zpositiony, zpositionz);
			zcancelbutton.scaling = new BABYLON.Vector3(.7, .8, 1);
			zcancelbutton.isPickable = true;
			zcancelbutton.isVisible = true;
			zcancelbutton.parent = zmold;
			zcancelbutton.renderingGroupId = 3;
			var zcovering = new BABYLON.StandardMaterial('hud-save-' + zid + 'mat', scene);
			zcovering.emissiveColor =  new BABYLON.Color3.FromHexString('#30320B');
			zcovering.diffuseColor =  new BABYLON.Color3.FromHexString('#464910');
			zcovering.specularColor =  new BABYLON.Color3.FromHexString('#464910');
			zcovering.ambientColor =  new BABYLON.Color3.FromHexString('#30320B');
			zcancelbutton.material = zcovering;

			var zstyle = {
				'font-family': 'Arial',
				'anchor':'left',
				'letter-height':.9,
				'letter-thickness':.4,
				'color':'#ffffff',
				'alpha':1.00,
				'colors':{
					'diffuse':'#ffffff',
					'specular':'#989e2c',
					'ambient':'#888722',
					'emissive':'#37370d'
				}
			};
			var zsavewriter = new Writer('Save', zstyle);
			var zsavetext = zsavewriter.getMesh();
			zsavetext.rotation = new BABYLON.Vector3(WTW.getRadians(-90), 0, 0);
			zsavetext.position = new BABYLON.Vector3(zpositionx-3.5, zpositiony-.26, zpositionz-.1);
			zsavetext.id = 'hud-save-' + zid + '-text';
			zsavetext.name = 'hud-save-' + zid + '-text';
			zsavetext.parent = zmold;
			zsavewriter.renderingGroupId = 3;
			zsavetext.isPickable = false;

			var zcancelwriter = new Writer('Cancel', zstyle);
			var zcanceltext = zcancelwriter.getMesh();
			zcanceltext.rotation = new BABYLON.Vector3(WTW.getRadians(-90), 0, 0);
			zcanceltext.position = new BABYLON.Vector3(zpositionx+1, zpositiony-.26, zpositionz-.1);
			zcanceltext.id = 'hud-cancel-' + zid + '-text';
			zcanceltext.name = 'hud-cancel-' + zid + '-text';
			zcanceltext.parent = zmold;
			zcanceltext.renderingGroupId = 3;
			zcanceltext.isPickable = false;
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_fields.js-hudAddSaveClose=' + ex.message);
	}
}

WTWJS.prototype.hudEditText = function(zmoldname, zparentname) {
	/* set selected mold and allow keyboard to enter text to 3D Textbox */
	try {
		WTW.hilightMoldFast(zmoldname, 'green');
		var zoldmoldname = WTW.selectedMoldName;
		if (WTW.selectedMoldName != zmoldname) {
			WTW.clearSelectedMold();
			WTW.selectedMoldName = zmoldname;
			if (WTW.textTimer != null) {
				window.clearInterval(WTW.textTimer);
				WTW.textTimer = null;
			}
		}
		/* start blinking cursor at end of text typed */
		if (WTW.textTimer == null) {
			WTW.textTimer = window.setInterval(function(){
				if (WTW.selectedMoldName != '' && dGet(WTW.selectedMoldName) != null) {
					WTW.hudEditRefreshText(WTW.selectedMoldName, zparentname);
				} else {
					window.clearInterval(WTW.textTimer);
					WTW.textTimer = null;
				}
			},500);
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_fields.js-hudEditText=' + ex.message);
	}
}

WTWJS.prototype.hudEditRefreshText = function(zmoldname, zparentname, zeditdone) {
	/* refresh the text with the latest changes */
	try {
		if (zeditdone == undefined) {
			zeditdone = false;
		}
		var zpositionx = 0;
		var zpositiony = 0;
		var zpositionz = 0;
		var zmytext = WTW.getMeshOrNodeByID(zmoldname + '-text');
		if (zmytext == null) {
			zmytext = WTW.getMeshOrNodeByID(zmoldname);
			zpositionx = -2.75;
			zpositiony = -.25;
			zpositionz = -.1;
		}
		if (zmytext != null) {
			zpositionx += zmytext.position.x;
			zpositiony += zmytext.position.y;
			zpositionz += zmytext.position.z;
		}
		WTW.disposeClean(zmoldname + '-text');
		var zshowtext = dGet(zmoldname).value;
		/* if text is too long, trim text for display */
		var zhaspipe = 0;
		var zmaxlength = 10;
		if (zshowtext.indexOf('|') > -1) {
			zhaspipe = 1;
			zshowtext = zshowtext.replace('|','');
		}
		/* W and M are wider and can not fit as many characters on the display screen */
		if (zshowtext.indexOf('w') > -1 || zshowtext.indexOf('m') > -1 || zshowtext.indexOf('W') > -1 || zshowtext.indexOf('M') > -1) {
			zmaxlength = 8;
		}
		if (zshowtext.length > zmaxlength) {
			zshowtext = zshowtext.substr(zshowtext.length-zmaxlength-1,zshowtext.length-(zshowtext.length-zmaxlength-1));
		}
		/* decide if pipe key | should show or not */
		if (zhaspipe == 0 && zeditdone == false) {
			zshowtext += '|';
			dGet(zmoldname).value += '|';
		} else {
			dGet(zmoldname).value = dGet(zmoldname).value.replace('|','');
		}
		/* create 3d text */
		Writer = BABYLON.MeshWriter(scene, {scale:1});
		var zdisplaytext = null;
		if (zshowtext != '') {
			var zwebstyle = {
				'font-family': 'Arial',
				'anchor':'left',
				'letter-height':.9,
				'letter-thickness':.4,
				'color':'#ffffff',
				'alpha':1.00,
				'colors':{
					'diffuse':'#ffffff',
					'specular':'#989e2c',
					'ambient':'#888722',
					'emissive':'#37370d'
				}
			};
			var zmoldparent = WTW.getMeshOrNodeByID(zparentname);
			
			zdisplaytext = new Writer(zshowtext, zwebstyle);
			var zmytext = zdisplaytext.getMesh();
			zmytext.rotation = new BABYLON.Vector3(WTW.getRadians(-90), 0, 0);
			zmytext.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
			zmytext.id = zmoldname + '-text';
			zmytext.name = zmoldname + '-text';
			zmytext.parent = zmoldparent;
			zmytext.isPickable = false;
			zmytext.renderingGroupId = 3;
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_fields.js-hudEditRefreshText=' + ex.message);
	}
}


/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions provide many of the common functions for browse and admin modes */
/* 3d form components, 3d text fields, and 3D text  */

WTWJS.prototype.focusText = function(zeditdone) {
	/* Type on form field */
	try {
		if (zeditdone == undefined) {
			zeditdone = false;
		}
		var ztextbox = WTW.selectedMoldName + '-textbox';
		var ztitlewtw = WTW.getMeshOrNodeByID('hudlogin-titlewtw');
		var ztitlecreatewtw = WTW.getMeshOrNodeByID('hudlogin-titlecreatewtw');
		var zlocal = true;
		var zcreatelocal = true;
		if (ztitlewtw != null) {
			if (ztitlewtw.isVisible) {
				zlocal = false;
			}
		}
		if (ztitlecreatewtw != null) {
			if (ztitlecreatewtw.isVisible) {
				zcreatelocal = false;
			}
		}
		if (dGet(ztextbox) == null) {
			if (dGet('wtw_formfields') == null) {
				var zsearchboxdiv = document.createElement('div');
				zsearchboxdiv.id = 'wtw_formfields';
				zsearchboxdiv.className = 'wtw-hide';
				document.getElementsByTagName('body')[0].appendChild(zsearchboxdiv);
			}
			var zinput = document.createElement('input');
			zinput.id = ztextbox;
			if (WTW.selectedMoldName.indexOf('-password-') > -1) {
				zinput.type = 'password';
			} else if (WTW.selectedMoldName.indexOf('-check-') > -1) {
				zinput.type = 'checkbox';
			} else {
				zinput.type = 'hidden';
			}
			zinput.value = '';
			if (ztitlewtw != null) {
				/* only load from cookies if on login page */
				var zremember = WTW.getCookie('localloginremember');
				if (zlocal == false) {
					zremember = WTW.getCookie('globalloginremember');
				}
				if (zremember) {
					/* only load field if it is the login page */
					if (WTW.selectedMoldName.indexOf('-email-email') > -1) {
						var zemail = WTW.getCookie('localloginemail');
						if (zlocal == false) {
							zemail = WTW.getCookie('globalloginemail');
						}
						zinput.value = zemail;
					} else if (WTW.selectedMoldName.indexOf('-password-password') > -1) {
						var zpassword = WTW.getCookie('localloginpassword');
						if (zlocal == false) {
							zpassword = WTW.getCookie('globalloginpassword');
						}
						zinput.value = atob(zpassword);
					} else if (WTW.selectedMoldName.indexOf('-check-remember') > -1) {
						zinput.checked = true;
					}
				}
			}
			dGet('wtw_formfields').appendChild(zinput);
		}
		if (zeditdone) {
			WTW.addText(true);
		} else {
			/* start blinking cursor at end of text typed */
			if (WTW.textTimer == null) {
				WTW.textTimer = window.setInterval(function() {
						var zmold = WTW.getMeshOrNodeByID(WTW.selectedMoldName);
						if (zmold != null) {
							WTW.addText();
						} else {
							window.clearInterval(WTW.textTimer);
							WTW.textTimer = null;
						}
				}, 500);
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-molds-wtw_3dforms.js-focusText=' + ex.message);
	}
}

WTWJS.prototype.addText = function(zeditdone) {
	/* add text on form field with cursor */
	try {
		if (zeditdone == undefined) {
			zeditdone = false;
		}
		WTW.disposeClean(WTW.selectedMoldName + '-text');
		var zinputid = WTW.selectedMoldName + '-textbox';
		var zmold = WTW.getMeshOrNodeByID(WTW.selectedMoldName);
		if (zmold != null && dGet(zinputid) != null) {
			var zshowtext = dGet(zinputid).value;
			/* if text is too long, trim text for display */
			if (WTW.selectedMoldName.indexOf('-check-') > -1) {
				if (dGet(zinputid).checked) {
					zshowtext = 'x';
				} else {
					zshowtext = '';
				}
			} else if (WTW.selectedMoldName.indexOf('-button-') > -1) {
				zshowtext = '';
			} else if (WTW.selectedMoldName.indexOf('-text-') > -1 || WTW.selectedMoldName.indexOf('-password-') > -1 || WTW.selectedMoldName.indexOf('-email-') > -1 || WTW.selectedMoldName.indexOf('-name-') > -1) {
				var zhaspipe = 0;
				var zmaxlength = WTW.maxLength;
				var zstartposition = 0;
				if (zshowtext.indexOf('|') > -1) {
					zhaspipe = 1;
					zshowtext = zshowtext.replace('|','');
				}
				/* W and M are wider and can not fit as many characters on the display screen */
				if (zshowtext.indexOf('w') > -1 || zshowtext.indexOf('m') > -1 || zshowtext.indexOf('W') > -1 || zshowtext.indexOf('M') > -1) {
					if (zeditdone) {
						zmaxlength = Math.round(zmaxlength * .9);
					} else {
						zmaxlength = Math.round(zmaxlength * .8);
					}
				}
				if (zshowtext.length > zmaxlength) {
					if (zeditdone) {
						zshowtext = zshowtext.substr(zstartposition, zmaxlength);
					} else {
						zstartposition = zshowtext.length - zmaxlength;
						if (zstartposition < 0) {
							zstartposition = 0;
						}
						zshowtext = zshowtext.substr(zstartposition, zmaxlength);
					}
				}
				/* check if password field */
				if (WTW.selectedMoldName.indexOf('password') > -1) {
					var zastrisks = '';
					for (var i=0;i < zshowtext.replace('|','').length;i++) {
						zastrisks += '*';
					}
					zshowtext = zastrisks;
				}
				/* decide if pipe key | should show or not */
				if (zeditdone) {
					zshowtext = zshowtext.replace('|','');
					dGet(zinputid).value = dGet(zinputid).value.replace('|','');
				} else if (zhaspipe == 0 && zeditdone == false) {
					zshowtext += '|';
					dGet(zinputid).value += '|';
				} else {
					dGet(zinputid).value = dGet(zinputid).value.replace('|','');
				}
			} else {
				zshowtext = '';
			}
			/* create 3d text */
			Writer = BABYLON.MeshWriter(scene, {scale:1});
			var zdisplaytext = null;
			if (zshowtext != '') {
				zdisplaytext = new Writer(zshowtext, WTW.webStyle);
				var zmytext = zdisplaytext.getMesh();
				zmytext.rotation = new BABYLON.Vector3(WTW.getRadians(-90), WTW.getRadians(-90), 0);
				zmytext.position = new BABYLON.Vector3(WTW.offsetX, WTW.offsetY, WTW.offsetZ);
				zmytext.id = WTW.selectedMoldName + '-text';
				zmytext.name = WTW.selectedMoldName + '-text';
				zmytext.parent = zmold;
				zmytext.isPickable = false;
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-molds-wtw_3dforms.js-addText=' + ex.message);
	}
}

WTWJS.prototype.tabNextField = function() {
	/* tab to next field on form */
	try {
		if (WTW.tabOrder.length > 0) {
			var zmoldname = '';
			var zfoundfield = false;
			if (WTW.selectedMoldName == '') {
				/* find first tab on form */
				for (var i=0;i<WTW.tabOrder.length;i++) {
					if (WTW.tabOrder[i] != null) {
						var zmold = WTW.getMeshOrNodeByID(WTW.tabOrder[i]);
						if (zmold != null) {
							zmoldname = WTW.tabOrder[i];
							zfoundfield = true;
							i = WTW.tabOrder.length;
						}
					}
				}
			} else {
				/* find current tab field */
				var zcurrenttab = -1;
				var znexttab = -1;
				for (var i=0;i<WTW.tabOrder.length;i++) {
					if (WTW.tabOrder[i] != null) {
						if (WTW.tabOrder[i] == WTW.selectedMoldName) {
							zcurrenttab = i;
							i = WTW.tabOrder.length;
						}
					}
				}
				/* find next field */
				znexttab = zcurrenttab + 1;
				/* check array after current tab */
				for (var i=znexttab;i<WTW.tabOrder.length;i++) {
					if (WTW.tabOrder[i] != null) {
						var zmold = WTW.getMeshOrNodeByID(WTW.tabOrder[i]);
						if (zmold != null) {
							zmoldname = WTW.tabOrder[i];
							zfoundfield = true;
							i = WTW.tabOrder.length;
						}
					}
				}
				if (zfoundfield == false && znexttab > 0) {
					/* check from beginning of array */
					for (var i=0;i<znexttab;i++) {
						if (WTW.tabOrder[i] != null) {
							var zmold = WTW.getMeshOrNodeByID(WTW.tabOrder[i]);
							if (zmold != null) {
								zmoldname = WTW.tabOrder[i];
								zfoundfield = true;
								i = znexttab;
							}
						}
					}
				}
			}
			if (zfoundfield) {
				WTW.changeLoginHUDFocus(zmoldname);
				WTW.hilightMoldFast(WTW.selectedMoldName, 'green');
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-molds-wtw_3dforms.js-tabNextField=' + ex.message);
	}
}

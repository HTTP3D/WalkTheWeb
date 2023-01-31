/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions provide many of the common functions for browse and admin modes */
/* The heads up display (hud) provides menu options and user settings */
/* these functions set the user profile */

WTWJS.prototype.hudGetProfile = function() {
	/* get Player profile */
	try {
		var ztop = 3.5;
		var zleft = -8;
		var zleft2 = 3.9;
		WTW.hudAddLabel('Display Name', 'hud-displayname', zleft, ztop, 0);
		WTW.hudAddLabel('Email', 'hud-email', zleft, ztop-1.5, 0);
		WTW.hudAddLabel('First Name', 'hud-firstname', zleft, ztop-3, 0);
		WTW.hudAddLabel('Last Name', 'hud-lastname', zleft, ztop-4.5, 0);
		WTW.hudAddLabel('Gender', 'hud-gender', zleft, ztop-6, 0);
		WTW.hudAddLabel('Birth Date', 'hud-dob', zleft, ztop-7.5, 0);
		
		WTW.hudAddSaveClose('profile', 0, ztop-8.8, 0);
		
		/* fetch the user profile */
		WTW.getAsyncJSON('/connect/userprofile.php?useravatarid=' + dGet('wtw_tuseravatarid').value, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zdob = '';
				if (zresponse.dob != 'null' && zresponse.dob != null) {
					zdob = zresponse.dob;
				}
				WTW.hudAddTextbox(zresponse.displayname, 'displayname', zleft2, ztop+.1, 0);
				WTW.hudAddTextbox(zresponse.email, 'email', zleft2, ztop-1.4, 0);
				WTW.hudAddTextbox(zresponse.firstname, 'firstname', zleft2, ztop-2.9, 0);
				WTW.hudAddTextbox(zresponse.lastname, 'lastname', zleft2, ztop-4.4, 0);
				WTW.hudAddTextbox(zresponse.gender, 'gender', zleft2, ztop-5.9, 0);
				WTW.hudAddTextbox(zdob, 'dob', zleft2, ztop-7.4, 0);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_profile.js-hudGetProfile=' + ex.message);
	}
}

WTWJS.prototype.hudClearProfile = async function() {
	/* clear profile input textboxes */
	try {
		if (dGet('hud-textbox-displayname') != null) {
			dGet('hud-textbox-displayname').parentNode.removeChild(dGet('hud-textbox-displayname'));
		}
		if (dGet('hud-textbox-email') != null) {
			dGet('hud-textbox-email').parentNode.removeChild(dGet('hud-textbox-email'));
		}
		if (dGet('hud-textbox-firstname') != null) {
			dGet('hud-textbox-firstname').parentNode.removeChild(dGet('hud-textbox-firstname'));
		}
		if (dGet('hud-textbox-lastname') != null) {
			dGet('hud-textbox-lastname').parentNode.removeChild(dGet('hud-textbox-lastname'));
		}
		if (dGet('hud-textbox-gender') != null) {
			dGet('hud-textbox-gender').parentNode.removeChild(dGet('hud-textbox-gender'));
		}
		if (dGet('hud-textbox-dob') != null) {
			dGet('hud-textbox-dob').parentNode.removeChild(dGet('hud-textbox-dob'));
		}
		if (dGet('wtw_hudfields') != null) {
			/* remove the div container for hud if it is no longer in use */
			if (dGet('wtw_hudfields').innerHTML == '') {
				dGet('wtw_hudfields').parentNode.removeChild(dGet('wtw_hudfields'));
			}
		}
		/* clear page form elements */
		var zmold = WTW.getMeshOrNodeByID('hud-pageform');
		if (zmold != null) {
			var zelements = zmold.getChildren();
			if (zelements != null) {
				for (var i=0;i < zelements.length;i++) {
					zelements[i].dispose();
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_profile.js-hudClearProfile=' + ex.message);
	}
}

WTWJS.prototype.hudSaveProfile = async function() {
	/* save local server user profile */
	try {
		/* validate entries... */
		var zrequest = {
			'userid':dGet('wtw_tuserid').value,
			'displayname':btoa(dGet('hud-textbox-displayname').value.replace('|','')),
			'useremail':dGet('hud-textbox-email').value.replace('|',''),
			'firstname':btoa(dGet('hud-textbox-firstname').value.replace('|','')),
			'lastname':btoa(dGet('hud-textbox-lastname').value.replace('|','')),
			'gender':btoa(dGet('hud-textbox-gender').value.replace('|','')),
			'dob':dGet('hud-textbox-dob').value.replace('|',''),
			'function':'savemyprofile'
		};
		WTW.postAsyncJSON('/core/handlers/users.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.hudCheckLayout('');
				WTW.hudMenuText('settings');
				WTW.hudClearProfile();
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_profile.js-hudSaveProfile=' + ex.message);
	}
}


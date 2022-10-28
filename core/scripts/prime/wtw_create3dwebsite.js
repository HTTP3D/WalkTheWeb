/* All code is Copyright 2013-2022 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions are used to automate a new 3D Website creation by downloading a select 3D Community and 3D Building */
/* downloads are hosted by 3dnet.walktheweb.com 3D Internet (WalkTheWeb Downloads) */

WTWJS.prototype.startWizard = function(zstep) {
	try {
		WTW.show('wtw_wizard');
		for (var i=1;i<6;i++) {
			if (i == zstep) {
				WTW.show('wtw_wizard' + i);
				dGet('wtw_wizardstep' + i).className = 'wtw-dashboardstep-active';
				dGet('wtw_wizardstep' + i).onclick = function() {};
			} else if (i < zstep || (i == 2 && dGet('wtw_buildingid').value != '') || (i == 3 && dGet('wtw_communityid').value != '') || (i == 3 && dGet('wtw_availability').style.display == 'none') || (i < zstep && i == 4 && (dGet('wtw_usertoken').value != '' || dGet('wtw_userid').value != ''))) {
				WTW.hide('wtw_wizard' + i);
				dGet('wtw_wizardstep' + i).className = 'wtw-dashboardstep-past';
				switch (i) {
					case 1:
						WTW.show('wtw_step5_4');
						WTW.show('wtw_step5_4b');
						WTW.show('wtw_step5_4heading');
						dGet('wtw_wizardstep1').onclick = function() {
							WTW.startWizard(1);
						};
						break;
					case 2:
						dGet('wtw_wizardstep2').onclick = function() {
							WTW.startWizard(2);
						};
						break;
					case 3:
						dGet('wtw_wizardstep3').onclick = function() {
							WTW.startWizard(3);
						};
						break;
					case 4:
						dGet('wtw_wizardstep4').onclick = function() {
							WTW.startWizard(4);
						};
						break;
					case 5:
						dGet('wtw_wizardstep5').onclick = function() {
							WTW.startWizard(5);
						};
						break;
				}
			} else {
				WTW.hide('wtw_wizard' + i);
				dGet('wtw_wizardstep' + i).className = 'wtw-dashboardstep-next';
				dGet('wtw_wizardstep' + i).onclick = function() {};
			}
		}
		switch (zstep) {
			case 1:
				WTW.buildingSearch('');
				break;
			case 2:
				WTW.communitySearch('');
				break;
			case 3:
				WTW.selectWalkTheWebHosting('https://3d.walktheweb.com','');
				WTW.show('wtw_sitediv');
				break;
			case 4:
				if (dGet('wtw_userid') != '') {
					WTW.showLoggedin();
					if (dGet('wtw_usertoken').value != '') {
						dGet('wtw_loginlabel').innerHTML = 'WalkTheWeb Login';
					} else {
						dGet('wtw_loginlabel').innerHTML = 'Login';
					}
					dGet('wtw_step4_5').style.visibility = 'visible';
					dGet('wtw_step4_5b').style.visibility = 'visible';
				} else {
					WTW.showHostLogin();
					dGet('wtw_step4_5').style.visibility = 'hidden';
					dGet('wtw_step4_5b').style.visibility = 'hidden';
				}
				break;
			case 5:
				WTW.hide('wtw_newhostedwebsitedev');
				WTW.hide('wtw_creatingdev');
				WTW.show('wtw_reviewdev');
				break;
		}
		window.scrollTo(0,0);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-startWizard=" + ex.message);
	}
}

WTWJS.prototype.buildingSearch = function(zsearch) {
	/* keyword search to find a building to download to your instance */
	try {
		if (zsearch == undefined) {
			zsearch = dGet('wtw_tbuildingsearch').value;
		}
		dGet('wtw_tbuildingsearch').value = zsearch;
		zsearch = WTW.encode(zsearch);
		WTW.getJSON("https://3dnet.walktheweb.com/connect/sharesearch.php?search=" + zsearch + "&webtype=building&buildingtype=2", 
			function(zresponse) {
				WTW.buildingSearchReply(JSON.parse(zresponse));
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-buildingSearch=" + ex.message);
	}
}	

WTWJS.prototype.buildingSearchReply = function(zresponse) {
	/* receives search results and parses for screen display */
	try {
		var ztempsearchresults = '';
		dGet('wtw_buildtempsearchresults').innerHTML = "";
		for (var i=0; i < zresponse.length; i++) {
			var zdownloads = 0;
			var zbuildingid = zresponse[i].serverbuildingid;
			var zupdatedate  = WTW.formatDate(zresponse[i].updatedate);
			if (WTW.isNumeric(zresponse[i].downloads)) {
				zdownloads = zresponse[i].downloads;
			}
			ztempsearchresults += "<div class=\"wtw-simplebox\"><input type='button' id='wtw_btempselect" + i + "' class='wtw-searchresultbutton' value='Select' onclick=\"WTW.selectBuilding('" + zbuildingid + "','" + zresponse[i].templatename + "','" + zresponse[i].imageurl + "');return (false);\" />";
			ztempsearchresults += "<div style='display:inline-block;max-width:80%;'><h3 class=\"wtw-black\">" + zresponse[i].templatename + "</h3><br />";
			ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>" + zresponse[i].description + "</div><br />";
			ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>Created By: <b>" + zresponse[i].displayname + "</b> (<b>" + zupdatedate + "</b>)</div><br />";
			ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>Downloaded: <b>" + zdownloads + "</b> times.</div></div><br />";
			if (zresponse[i].imageurl != "") {
				ztempsearchresults += "<img id='wtw_search" + zbuildingid + "' src='" + zresponse[i].imageurl + "' onmouseover=\"this.style.border='1px solid yellow';\" onmouseout=\"this.style.border='1px solid gray';\" onclick=\"WTW.selectBuilding('" + zbuildingid + "','" + zresponse[i].templatename + "','" + zresponse[i].imageurl + "');return (false);\" style=\"margin:2%;border:1px solid gray;cursor:pointer;width:96%;height:auto;\" alt='" + zresponse[i].templatename + "' title='" + zresponse[i].templatename + "' />";
			}
			ztempsearchresults += "<br /></div><hr style=\"width:96%;\" />";
		}
		dGet('wtw_buildtempsearchresults').innerHTML = ztempsearchresults;
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-buildingSearchReply=" + ex.message);
	}
}

WTWJS.prototype.selectBuilding = function(zwebid, ztemplatename, zimageurl) {
	try {
		dGet('wtw_buildingid').value = zwebid;
		dGet('wtw_selectedbuildingname').innerHTML = ztemplatename;
		dGet('wtw_buildingname').value = ztemplatename;
		dGet('wtw_selectedbuildingimage').src = zimageurl;
		WTW.startWizard(2);
		dGet('wtw_step1_2').style.visibility = 'visible';
		dGet('wtw_step1_2b').style.visibility = 'visible';
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-selectBuilding=" + ex.message);
	}
}

WTWJS.prototype.communitySearch = function(zsearch) {
	/* keyword search to find a community to download to your instance */
	try {
		if (zsearch == undefined) {
			zsearch = dGet('wtw_tcommunitysearch').value;
		}
		zsearch = WTW.encode(zsearch);
		WTW.getJSON("https://3dnet.walktheweb.com/connect/sharesearch.php?search=" + zsearch + "&webtype=community", 
			function(zresponse) {
				WTW.communitySearchReply(JSON.parse(zresponse));
			}
		);
	} catch (ex) {
		WTW.error("core-scripts-prime-wtw_create3dwebsite.js-communitySearch=" + ex.message);
	}
}

WTWJS.prototype.communitySearchReply = function(zresponse) {
	/* receives search results and parses for screen display */
	try {
		var ztempsearchresults = '';
		dGet('wtw_communitytempsearchresults').innerHTML = "";
		for (var i=0; i < zresponse.length; i++) {
			var zdownloads = 0;
			var zcommunityid = zresponse[i].servercommunityid;
			var zupdatedate  = WTW.formatDate(zresponse[i].updatedate);
			if (WTW.isNumeric(zresponse[i].downloads)) {
				zdownloads = zresponse[i].downloads;
			}
			ztempsearchresults += "<div class=\"wtw-simplebox\"><input type='button' id='wtw_bcommtempselect" + i + "' class='wtw-searchresultbutton' value='Select' onclick=\"WTW.selectCommunity('" + zcommunityid + "','" + zresponse[i].templatename + "','" + zresponse[i].imageurl + "');\" />";
			ztempsearchresults += "<div style='display:inline-block;max-width:80%;'><h3 class=\"wtw-black\">" + zresponse[i].templatename + "</h3><br />";
			ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>" + zresponse[i].description + "</div><br />";
			ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>Created By: <b>" + zresponse[i].displayname + "</b> (<b>" + zupdatedate + "</b>)</div><br />";
			ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>Downloaded: <b>" + zdownloads + "</b> times.</div></div><br />";
			if (zresponse[i].imageurl != "") {
				ztempsearchresults += "<div style=\"clear:both;\"></div><img id='wtw_search" + zcommunityid + "' src='" + zresponse[i].imageurl + "' onmouseover=\"this.style.border='1px solid yellow';\" onmouseout=\"this.style.border='1px solid gray';\" onclick=\"WTW.selectCommunity('" + zcommunityid + "','" + zresponse[i].templatename + "','" + zresponse[i].imageurl + "');\" style=\"margin:2%;border:1px solid gray;cursor:pointer;width:96%;height:auto;\" alt='" + zresponse[i].templatename + "' title='" + zresponse[i].templatename + "' />";
			}
			ztempsearchresults += "<br /></div><hr style=\"width:96%;\" />";
		}
		dGet('wtw_communitytempsearchresults').innerHTML = ztempsearchresults;
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-communitySearchReply=" + ex.message);
	}
}

WTWJS.prototype.selectCommunity = function(zwebid, ztemplatename, zimageurl) {
	try {
		dGet('wtw_communityid').value = zwebid;
		dGet('wtw_selectedcommunityname').innerHTML = ztemplatename;
		dGet('wtw_communityname').value = ztemplatename;
		dGet('wtw_selectedcommunityimage').src = zimageurl;
		WTW.startWizard(3);
		dGet('wtw_step2_3').style.visibility = 'visible';
		dGet('wtw_step2_3b').style.visibility = 'visible';
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-selectCommunity=" + ex.message);
	}
}

WTWJS.prototype.selectWalkTheWebHosting = function(zhost, zwtwkeytext) {
	try {
		WTW.hide('wtw_registerdiv');
		WTW.hide('wtw_resetpassworddiv');
		WTW.hide('wtw_loggedindiv');
		WTW.show('wtw_sitediv');
		dGet('wtw_availability').style.visibility = 'visible';
		dGet('wtw_thosting').disabled = false;
		dGet('wtw_hosturl').innerHTML = dGet('wtw_domainurl').value;
		dGet('wtw_thosting').value = dGet('wtw_domainurl').value;
		dGet('wtw_thosting').disabled = true;
		
		WTW.checkWebname();
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-selectWalkTheWebHosting=" + ex.message);
	}
}

WTWJS.prototype.checkWebname = function() {
	try {
		dGet('wtw_availability_error').innerHTML = '';
		let zwebname = dGet('wtw_webname').value;
		WTW.getJSON("/connect/webnamecheck.php?webname=" + btoa(zwebname),
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.available == '1') {
					dGet('wtw_availability_error').innerHTML = '';
					dGet('wtw_webname').value = zresponse.webname;
					dGet('wtw_webname').style.border = '3px solid green';
					dGet('wtw_availability').style.visibility = 'hidden';
					WTW.show('wtw_savewebsite');
					dGet('wtw_step3_4').style.visibility = 'visible';
					dGet('wtw_step3_4b').style.visibility = 'visible';
				} else {
					dGet('wtw_availability_error').innerHTML = zresponse.serror;
					dGet('wtw_webname').style.border = '3px solid red';
					dGet('wtw_availability').style.visibility = 'visible';
					WTW.hide('wtw_savewebsite');
					dGet('wtw_step3_4').style.visibility = 'hidden';
					dGet('wtw_step3_4b').style.visibility = 'hidden';
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-checkWebname=" + ex.message);
	}
}

WTWJS.prototype.resetWebname = function() {
	try {
		dGet('wtw_webname').style.border = '1px solid #afafaf';
		dGet('wtw_availability').style.visibility = 'visible';
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-resetWebname=" + ex.message);
	}
}

WTWJS.prototype.saveWebsiteSettings = function() {
	try {
		dGet('wtw_wtwurl').disabled = false;
		dGet('wtw_wtwurl').value = dGet('wtw_domainurl').value + '/' + dGet('wtw_webname').value;
		dGet('wtw_wtwurl').disabled = true;
		dGet('wtw_websiteurl').value = dGet('wtw_domainurl').value + '/' + dGet('wtw_webname').value;
		dGet('wtw_wtwstorename').disabled = false;
		dGet('wtw_wtwstorename').value = dGet('wtw_tstorename').value;
		dGet('wtw_wtwstorename').disabled = true;
		if (dGet('wtw_availability').style.display == 'none') {
			dGet('wtw_step3_4').style.visibility = 'visible';
			dGet('wtw_step3_4b').style.visibility = 'visible';
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-saveWebsiteSettings=" + ex.message);
	}
}

WTWJS.prototype.logout = function() {
	try {
		dGet('wtw_userid').value = '';
		dGet('wtw_temailloggedin').disabled = false;
		dGet('wtw_temailloggedin').value = '';
		dGet('wtw_temailloggedin').disabled = true;			
		WTW.showLogin();
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-logout=" + ex.message);
	}
}

WTWJS.prototype.showHostLogin = function() {
	try {
		WTW.hide('wtw_logindiv');
		WTW.hide('wtw_registerdiv');
		WTW.hide('wtw_resetpassworddiv');
		WTW.hide('wtw_loggedindiv');
		WTW.show('wtw_hostlogindiv');
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-showHostLogin=" + ex.message);
	}
}

WTWJS.prototype.showLogin = function() {
	try {
		WTW.hide('wtw_hostlogindiv');
		WTW.hide('wtw_registerdiv');
		WTW.hide('wtw_resetpassworddiv');
		WTW.hide('wtw_loggedindiv');
		WTW.show('wtw_logindiv');
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-showLogin=" + ex.message);
	}
}

WTWJS.prototype.createLogin = function() {
	try {
		WTW.hide('wtw_hostlogindiv');
		WTW.hide('wtw_logindiv');
		WTW.hide('wtw_resetpassworddiv');
		WTW.hide('wtw_loggedindiv');
		WTW.show('wtw_registerdiv');
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-createLogin=" + ex.message);
	}
}

WTWJS.prototype.showRecoverPassword = function() {
	try {
		WTW.hide('wtw_hostlogindiv');
		WTW.hide('wtw_logindiv');
		WTW.hide('wtw_registerdiv');
		WTW.hide('wtw_loggedindiv');
		WTW.show('wtw_resetpassworddiv');
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-showRecoverPassword=" + ex.message);
	}
}

WTWJS.prototype.showLoggedin = function() {
	try {
		WTW.hide('wtw_hostlogindiv');
		WTW.hide('wtw_logindiv');
		WTW.hide('wtw_registerdiv');
		WTW.hide('wtw_resetpassworddiv');
		WTW.show('wtw_loggedindiv');
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-showLoggedin=" + ex.message);
	}
}

WTWJS.prototype.hideLogin = function() {
	try {
		WTW.hide('wtw_hostlogindiv');
		WTW.hide('wtw_logindiv');
		WTW.hide('wtw_registerdiv');
		WTW.hide('wtw_resetpassworddiv');
		WTW.hide('wtw_loggedindiv');
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-hideLogin=" + ex.message);
	}
}

WTWJS.prototype.toggleOptionalProfile = function() {
	try {
		if (dGet('wtw_optionalprofilediv').style.display == 'none') {
			WTW.show('wtw_optionalprofilediv');
		} else {
			WTW.hide('wtw_optionalprofilediv');
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-toggleOptionalProfile=" + ex.message);
	}
}

WTWJS.prototype.registerPasswordFocus = function() {
	try {
		dGet('wtw_passwordstrengthdiv').style.visibility = 'visible';
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-registerPasswordFocus=" + ex.message);
	}
}

WTWJS.prototype.registerPasswordBlur = function() {
	try {
		dGet('wtw_passwordstrengthdiv').style.visibility = 'hidden';
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-registerPasswordBlur=" + ex.message);
	}
}

WTWJS.prototype.scorePassword = function(zpassword) {
	var score = 0;
	try {
		if (zpassword != undefined) {
			/* points for every unique letter until 5 repetitions */
			var letters = new Object();
			for (var i=0; i<zpassword.length; i++) {
				letters[zpassword[i]] = (letters[zpassword[i]] || 0) + 1;
				score += 5.0 / letters[zpassword[i]];
			}
			/* bonus points for complexity */
			var variations = {
				digits: /\d/.test(zpassword),
				lower: /[a-z]/.test(zpassword),
				upper: /[A-Z]/.test(zpassword),
				nonWords: /\W/.test(zpassword),
			}
			variationCount = 0;
			for (var check in variations) {
				variationCount += (variations[check] == true) ? 1 : 0;
			}
			score += (variationCount - 1) * 10;
			score = parseInt(score);
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-scorePassword=" + ex.message);
	}
	return score;
}

WTWJS.prototype.checkPasswordStrength = function(zpassword) {
	score = 0;
	zvalue = "Poor Password";
	zcolor = "#F87777";
	try {
		var score = WTW.scorePassword(zpassword);
		if (score > 80) {
			zvalue = "Strong Password";
			zcolor = "#77F893";
		} else if (score > 60) {
			zvalue = "Good Password";
			zcolor = "#DEF877";
		} else if (score >= 30) {
			zvalue = "Weak Password";
			zcolor = "#F8DB77";
		} else {
			zvalue = "Poor Password";
			zcolor = "#F87777";
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-checkPasswordStrength=" + ex.message);
	}
	return {
		'score': score,
		'value': zvalue,
		'color': zcolor };
}

WTWJS.prototype.checkPassword = function(zpasswordtextbox, metername) {
	try {
		var check = WTW.checkPasswordStrength(zpasswordtextbox.value);
		if (zpasswordtextbox.value.length > 0) {
			dGet(metername).style.visibility = 'visible';
		} else {
			dGet(metername).style.visibility = 'hidden';
		}
		if (dGet(metername) != null) {
			dGet(metername).value = check.value;
			dGet(metername).style.textAlign = 'center';
			dGet(metername).style.backgroundColor = check.color;
			if (check.score > 80) {
				dGet(metername).style.borderColor = 'green';
			} else {
				dGet(metername).style.borderColor = 'gray';
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-checkPassword=" + ex.message);
	}
}

WTWJS.prototype.checkPasswordConfirm = function(zpassword, zpassword2, zerrortext) {
	try {
		if (dGet(zpassword) != null && dGet(zpassword2) != null && dGet(zerrortext) != null) {
			dGet(zerrortext).innerHTML = "";
			if (dGet(zpassword).value != dGet(zpassword2).value) {
				dGet(zerrortext).innerHTML = "Passwords do not match.";
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-checkPasswordConfirm=" + ex.message);
	}
}

WTWJS.prototype.hostLogin = function() {
	try {
		dGet('wtw_hostloginerrortext').innerHTML = "";
		let zemail = dGet('wtw_thostemail').value;
		let zpassword = dGet('wtw_thostpassword').value;
		let zserverip = dGet('wtw_serverip').value;
		var zrequest = {
			'useremail':btoa(zemail),
			'password':btoa(zpassword),
			'serverip':btoa(zserverip),
			'function':'login'
		};

		WTW.postJSON("/connect/userauthenticate.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zuserid = '';
				var zusertoken = '';
				var zwtwusertoken = '';
				if (zresponse.userid != undefined) {
					zuserid = zresponse.userid;
				}
				if (zresponse.wordpresstoken != undefined) {
					zusertoken = atob(zresponse.wordpresstoken);
				}
				if (zresponse.wtwusertoken != undefined) {
					zwtwusertoken = atob(zresponse.wtwusertoken);
				}
				if (zusertoken.length > 100 || zuserid != '') {
					dGet('wtw_loginlabel').innerHTML = 'Login';
					WTW.hide('wtw_hostlogindiv');
					WTW.hide('wtw_logindiv');
					WTW.hide('wtw_registerdiv');
					WTW.hide('wtw_resetpassworddiv');
					dGet('wtw_usertoken').value = zusertoken;
					dGet('wtw_wtwusertoken').value = zwtwusertoken;
					dGet('wtw_userid').value = zuserid;
					dGet('wtw_temailloggedin').disabled = false;
					dGet('wtw_temailloggedin').value = zemail;
					dGet('wtw_temailloggedin').disabled = true;
					dGet('wtw_wtwemail').disabled = false;
					dGet('wtw_wtwemail').value = zemail;
					dGet('wtw_wtwemail').disabled = true;
					WTW.show('wtw_loggedindiv');
					if (dGet('wtw_usertoken').value != '' || dGet('wtw_userid').value != '') {
						dGet('wtw_step4_5').style.visibility = 'visible';
						dGet('wtw_step4_5b').style.visibility = 'visible';
					}
				} else {
					dGet('wtw_hostloginerrortext').innerHTML = zresponse.serror;
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-hostLogin=" + ex.message);
	}
}	

WTWJS.prototype.login = function() {
	try {
		dGet('wtw_loginerrortext').innerHTML = "";
		let zemail = dGet('wtw_temail').value;
		let zpassword = dGet('wtw_tpassword').value;
		let zserverip = dGet('wtw_serverip').value;
		var zrequest = {
			'useremail':btoa(zemail),
			'password':btoa(zpassword),
			'serverip':btoa(zserverip),
			'function':'login'
		};
		WTW.postJSON("https://3dnet.walktheweb.com/connect/authenticate.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zuserid = '';
				var zusertoken = '';
				var zwtwusertoken = '';
				if (zresponse.userid != undefined) {
					zuserid = zresponse.userid;
				}
				if (zresponse.usertoken != undefined) {
					zusertoken = zresponse.usertoken;
				}
				if (zresponse.wtwusertoken != undefined) {
					zwtwusertoken = zresponse.wtwusertoken;
				}
				if (zusertoken.length > 100 || zuserid != '') {
					dGet('wtw_loginlabel').innerHTML = 'WalkTheWeb Login';
					WTW.hide('wtw_hostlogindiv');
					WTW.hide('wtw_logindiv');
					WTW.hide('wtw_registerdiv');
					WTW.hide('wtw_resetpassworddiv');
					dGet('wtw_usertoken').value = zusertoken;
					dGet('wtw_wtwusertoken').value = zwtwusertoken;
					dGet('wtw_userid').value = zuserid;
					dGet('wtw_temailloggedin').disabled = false;
					dGet('wtw_temailloggedin').value = zemail;
					dGet('wtw_temailloggedin').disabled = true;
					dGet('wtw_wtwemail').disabled = false;
					dGet('wtw_wtwemail').value = zemail;
					dGet('wtw_wtwemail').disabled = true;
					WTW.show('wtw_loggedindiv');
					if (dGet('wtw_usertoken').value != '' || dGet('wtw_userid').value != '') {
						dGet('wtw_step4_5').style.visibility = 'visible';
						dGet('wtw_step4_5b').style.visibility = 'visible';
					}
				} else {
					dGet('wtw_loginerrortext').innerHTML = zresponse.serror;
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-login=" + ex.message);
	}
}	

WTWJS.prototype.createAccount = function() {
	try {
		dGet('wtw_registererrortext').innerHTML = '';
		
		let zserverip = dGet('wtw_serverip').value;
		let zemail = dGet('wtw_tnewemail').value;
		let zpassword = dGet('wtw_tnewpassword').value;
		let zpassword2 = dGet('wtw_tnewpassword2').value;
		let zdisplayname = dGet('wtw_tnewdisplayname').value;
		let zfirstname = dGet('wtw_tnewfirstname').value;
		let zlastname = dGet('wtw_tnewlastname').value;
		let zgender = dGet('wtw_tnewgender').value;
		let zdob = dGet('wtw_tnewdob').value;

		var zrequest = {
			'useremail':btoa(zemail),
			'password':btoa(zpassword),
			'password2':btoa(zpassword2),
			'displayname':btoa(zdisplayname),
			'firstname':btoa(zfirstname),
			'lastname':btoa(zlastname),
			'gender':btoa(zgender),
			'dob':btoa(zdob),
			'serverip':btoa(zserverip),
			'function':'register'
		};
		WTW.postJSON("https://3dnet.walktheweb.com/connect/authenticate.php", zrequest,
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zuserid = '';
				var zusertoken = '';
				var zwtwusertoken = '';
				if (zresponse.userid != undefined) {
					zuserid = zresponse.userid;
				}
				if (zresponse.usertoken != undefined) {
					zusertoken = zresponse.usertoken;
				}
				if (zresponse.wtwusertoken != undefined) {
					zwtwusertoken = zresponse.wtwusertoken;
				}
				if (zusertoken.length > 100 || zuserid != '') {
					dGet('wtw_loginlabel').innerHTML = 'WalkTheWeb Login';
					WTW.hide('wtw_hostlogindiv');
					WTW.hide('wtw_logindiv');
					WTW.hide('wtw_registerdiv');
					WTW.hide('wtw_resetpassworddiv');
					dGet('wtw_usertoken').value = zusertoken;
					dGet('wtw_wtwusertoken').value = zwtwusertoken;
					dGet('wtw_userid').value = zuserid;
					dGet('wtw_temailloggedin').disabled = false;
					dGet('wtw_temailloggedin').value = zemail;
					dGet('wtw_temailloggedin').disabled = true;
					dGet('wtw_wtwemail').disabled = false;
					dGet('wtw_wtwemail').value = zemail;
					dGet('wtw_wtwemail').disabled = true;
					WTW.show('wtw_loggedindiv');
					if (dGet('wtw_usertoken').value != '' || dGet('wtw_userid').value != '') {
						dGet('wtw_step4_5').style.visibility = 'visible';
						dGet('wtw_step4_5b').style.visibility = 'visible';
					}
				} else {
					dGet('wtw_registererrortext').innerHTML = zresponse.serror;
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-createAccount=" + ex.message);
	}
}

WTWJS.prototype.createIt = function() {
	try {
		WTW.hide('wtw_reviewdev');
		WTW.hide('wtw_newhostedwebsitedev');
		WTW.hide('wtw_step5_4');
		WTW.hide('wtw_step5_4b');
		WTW.hide('wtw_step5_4heading');
		WTW.show('wtw_creatingdev');
		WTW.startWaiting(1);

		dGet('wtw_wtwemail').disabled = false;
		dGet('wtw_wtwstorename').disabled = false;
		dGet('wtw_wtwurl').disabled = false;
		dGet('wtw_thosting').disabled = false;

		let zwebsiteurl = dGet('wtw_websiteurl').value;
		let zbuildingid = dGet('wtw_buildingid').value;
		let zcommunityid = dGet('wtw_communityid').value;

		let zusertoken = dGet('wtw_usertoken').value;
		let zwtwusertoken = dGet('wtw_wtwusertoken').value;
		let zwtwemail = dGet('wtw_wtwemail').value;
		let zuserid = dGet('wtw_userid').value;

		let zhostid = -1;
		let zdomainurl = dGet('wtw_domainurl').value;
		let zwtwurl = dGet('wtw_wtwurl').value;
		let zwebname = dGet('wtw_webname').value;
		let zwtwstorename = dGet('wtw_wtwstorename').value;
		
		dGet('wtw_completewebsitename').innerHTML = zwtwstorename;
		dGet('wtw_completecommunityurl').innerHTML = "<a href='" + zdomainurl + '/' + zwebname + "' target='_blank'>" + zdomainurl + '/' + zwebname + "</a>";
		dGet('wtw_visitwebsite').href = zdomainurl + '/' + zwebname;
		dGet('wtw_completebuildingurl').innerHTML = "<a href='" + zdomainurl + '/buildings/' + zwebname + "' target='_blank'>" + zdomainurl + '/buildings/' + zwebname + "</a>";
		
		var zrequest = {
			'websiteurl':btoa(zwebsiteurl),
			'buildingid':btoa(zbuildingid),
			'communityid':btoa(zcommunityid),
			'usertoken':zusertoken,
			'wtwusertoken':zwtwusertoken,
			'wtwemail':btoa(zwtwemail),
			'userid':btoa(zuserid),
			'hosturl':btoa(zdomainurl),
			'wtwurl':btoa(zwtwurl),
			'webname':btoa(zwebname),
			'wtwstorename':btoa(zwtwstorename),
			'function':'createcommunityandbuilding'
		};

		WTW.postJSON("/connect/wordpress.php", zrequest,
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				dGet('wtw_buildingid').value = zresponse.buildingid;
				dGet('wtw_communityid').value = zresponse.communityid;
				dGet('wtw_visitwebsite').href = zdomainurl + '/' + zwebname;
				WTW.hide('wtw_creatingdev');
				WTW.startWaiting(0);
				WTW.hide('wtw_wizard');
				WTW.show('wtw_wizardcomplete');
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-createIt=" + ex.message);
	}
}

WTWJS.prototype.waitingTimer = null;
WTWJS.prototype.waiting = false;

WTWJS.prototype.startWaiting = function(zon) {
	try {
		if (zon == undefined) {
			zon = 1;
		}
		let zincrement = 2;
		let zball = [];
		zball[0] = {
			'name':'wtw_progress0',
			'dir':-zincrement,
			'start':0 };
		zball[1] = {
			'name':'wtw_progress1',
			'dir':-zincrement,
			'start':0 };
		zball[2] = {
			'name':'wtw_progress2',
			'dir':-zincrement,
			'start':0 };
		zball[3] = {
			'name':'wtw_progress3',
			'dir':-zincrement,
			'start':0 };
		zball[4] = {
			'name':'wtw_progress4',
			'dir':-zincrement,
			'start':0 };
		zball[5] = {
			'name':'wtw_progress5',
			'dir':-zincrement,
			'start':0 };
		zball[6] = {
			'name':'wtw_progress6',
			'dir':-zincrement,
			'start':0 };
		zball[7] = {
			'name':'wtw_progress7',
			'dir':-zincrement,
			'start':0 };
		zball[8] = {
			'name':'wtw_progress8',
			'dir':-zincrement,
			'start':0 };
		zball[9] = {
			'name':'wtw_progress9',
			'dir':-zincrement,
			'start':0 };
		
		let zstartcounter = 101;
		let zstart = 0;
		if (WTW.waitingTimer == null && zon == 1) {
			WTW.waitingTimer = window.setInterval(function() {
				if (zstart < 10) {
					if (zstartcounter > 50) {
						if (zball[zstart] != null) {
							zball[zstart].start = 1;
							zstart += 1;
							zstartcounter = 0;
						}
					} else {
						zstartcounter += 1;
					}
				}
				for (var i=0;i<10;i++) {
					if (zball[i].start == 1) {
						var zheight = Number(document.getElementById(zball[i].name).style.marginTop.replace("px",""));
						var zdir = zball[i].dir;
						if (zheight <= -150 && zdir == -zincrement) {
							zdir = zincrement;
						} else if (zheight >= 150 && zdir == zincrement) {
							zdir = -zincrement;
						}
						zball[i].dir = zdir;
						document.getElementById(zball[i].name).style.marginTop = (zheight + zdir) + "px";
					}
				}
			}, 5);
		} else {
			for (var i=0;i<10;i++) {
				document.getElementById(zball[i].name).style.marginTop = "150px";
			}
			window.clearInterval(WTW.waitingTimer);
			WTW.waitingTimer = null;
			WTW.show('wtw_newhostedwebsitedev');
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_create3dwebsite.js-startWaiting=" + ex.message);
	}
}

/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are used to administer a website in admin mode only */

/* roles and direct user access settings */
/* 		roles - give server wide access to levels of functionality */
/* 		dev access - provides direct access to a given 3D Community, 3D Building, or 3D Thing */

WTWJS.prototype.openAllUsers = function() {
	/* open admin page form for users and role access */
	try {
		dGet('wtw_alluserstitle').innerHTML = "<div id='wtw_adduserbutton' class='wtw-greenbuttonright' onclick=\"WTW.addUser();\">Add New</div>All Users";
		WTW.show('wtw_userspage');
		WTW.show('wtw_loadingusers');
		WTW.hide('wtw_allusers');
		WTW.hide('wtw_userlist');
		WTW.hide('wtw_userinfo');
		WTW.hide('wtw_useradd');
		dGet('wtw_userlist').innerHTML = "";
		dGet('wtw_alluserswidth').className = "wtw-dashboardboxleftfull";
		WTW.getJSON("/connect/users.php", 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zuserlist = "";
				if (zresponse != null) {
					zuserlist += "<table class=\"wtw-table\"><tr><td class=\"wtw-tablecolumnheading\">User Name</td><td class=\"wtw-tablecolumnheading\">Email</td><td class=\"wtw-tablecolumnheading\">User ID</td><td class=\"wtw-tablecolumnheading\">User Roles</td><td class=\"wtw-tablecolumnheading\">Create Date</td><td class=\"wtw-tablecolumnheading\">&nbsp;</td></tr>";
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i].userid != undefined) {
							zuserlist += "<tr><td class=\"wtw-tablecolumns\">" + zresponse[i].username + "</td><td class=\"wtw-tablecolumns\">" + zresponse[i].email + "</td><td class=\"wtw-tablecolumns\">" + zresponse[i].userid + "</td><td class=\"wtw-tablecolumns\">";
							for (var j=0;j<zresponse[i].roles.length;j++) {
								if (zresponse[i].roles[j] != undefined) {
									if (j == 0) {
										zuserlist += zresponse[i].roles[j].rolename;
									} else {
										zuserlist += ", " + zresponse[i].roles[j].rolename;
									}
								}
							}
							zuserlist += "</td><td class=\"wtw-tablecolumns\">" + zresponse[i].createdate + "</td><td class=\"wtw-tablecolumns\">";
							zuserlist += "<div id='getuser" + zresponse[i].userid + "' class='wtw-bluebuttonright' onclick=\"WTW.getUser('" + zresponse[i].userid + "');\">View User</div>";
							zuserlist += "</td></tr>";
						}
					}
					zuserlist += "</table>";
				}
				dGet('wtw_userlist').innerHTML = zuserlist;
				WTW.hide('wtw_loadingusers');
				WTW.show('wtw_userlist');
				WTW.show('wtw_allusers');
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminusers.js-openAllUsers=" + ex.message);
	}
}

WTWJS.prototype.getUser = function(zuserid) {
	/* select user form list and display user information and roles edit form */
	try {
		WTW.show('wtw_loadingusers');
		WTW.hide('wtw_userlist');
		WTW.hide('wtw_useradd');
		WTW.hide('wtw_userinfo');
		dGet('wtw_userinfo').innerHTML = "";
		dGet('wtw_alluserswidth').className = "wtw-dashboardboxleft";
		WTW.getJSON("/connect/user.php?userid=" + zuserid, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zuserlist = "";
				if (zresponse != null) {
					dGet('wtw_alluserstitle').innerHTML = "User: " + zresponse.username;
					zuserlist += "<div class=\"wtw-dashboardlabel\">User Name</div>";
					zuserlist += "<div class=\"wtw-dashboardvalue\"><input id=\"wtw_tuserusername\" type=\"text\" value=\"" + zresponse.username + "\" maxlength=\"64\"/></div>";
					zuserlist += "<div class=\"wtw-clear\"></div>";
					zuserlist += "<div class=\"wtw-dashboardlabel\">User ID</div>";
					zuserlist += "<div id=\"wtw_tuseruserid\" class=\"wtw-dashboardvalue\">" + zresponse.userid + "</div>";
					zuserlist += "<div class=\"wtw-clear\"></div>";
					zuserlist += "<div class=\"wtw-dashboardlabel\">User Upload Path ID</div>";
					zuserlist += "<div class=\"wtw-dashboardvalue\">" + zresponse.uploadpathid + "</div>";
					zuserlist += "<div class=\"wtw-clear\"></div>";
					zuserlist += "<div class=\"wtw-dashboardlabel\">Email</div>";
					zuserlist += "<div class=\"wtw-dashboardvalue\"><input id=\"wtw_tuseruseremail\" type=\"text\" value=\"" + zresponse.email + "\" maxlength=\"255\"/></div>";
					zuserlist += "<div class=\"wtw-clear\"></div>";
					zuserlist += "<div class=\"wtw-dashboardlabel\">Create Date</div>";
					zuserlist += "<div id=\"wtw_tuseruserid\" class=\"wtw-dashboardvalue\">" + zresponse.createdate + "</div>";
					zuserlist += "<div class=\"wtw-clear\"></div>";
					zuserlist += "<div class=\"wtw-dashboardlabel\">Last Update Date</div>";
					zuserlist += "<div id=\"wtw_tuseruserid\" class=\"wtw-dashboardvalue\">" + zresponse.updatedate + "</div>";
					zuserlist += "<div class=\"wtw-clear\"></div><hr />";
					zuserlist += "<div class=\"wtw-dashboardlabel\">Roles:</div><div class=\"wtw-clear\"></div><div class=\"wtw-indent\">";
					for (var i=0;i<zresponse.roles.length;i++) {
						if (zresponse.roles[i] != undefined) {
							zuserlist += "<div id='deleteuserrole" + zresponse.roles[i].userinroleid + "' class='wtw-redbuttonright' onclick=\"WTW.deleteUserRole('" + zresponse.userid + "','" + zresponse.roles[i].userinroleid + "');\" alt='Delete Role' title='Delete Role'>X</div>";
							zuserlist += "<div class=\"wtw-dashboardlabel\">" + zresponse.roles[i].rolename + "</div>";
							zuserlist += "<div class=\"wtw-clear\"></div>";
						}
					}
					zuserlist += "</div><div class=\"wtw-clear\"></div><br />";
					zuserlist += "<div class=\"wtw-dashboardlabel\"><select id=\"wtw_adduserrole\" class=\"wtw-indent\"></select></div>";
					zuserlist += "<div id='adduserrole" + zresponse.userid + "' class='wtw-bluebuttonright' onclick=\"WTW.addUserRole('" + zresponse.userid + "');\">Add Role</div>";
					zuserlist += "<div class=\"wtw-clear\"></div><hr />";

					zuserlist += "<div id=\"wtw_errorusersave\" class=\"wtw-dashboardlabel wtw-red\"></div>";
					zuserlist += "<div class=\"wtw-clear\"></div>";
					zuserlist += "<div id='deleteuser" + zresponse.userid + "' class='wtw-redbuttonleft' onclick=\"WTW.deleteUser('" + zresponse.userid + "');\">Delete User</div>";
					zuserlist += "<div id='saveuser" + zresponse.userid + "' class='wtw-greenbuttonright' onclick=\"WTW.saveUser();\">Save User</div>";
					zuserlist += "<div id='cancelsaveuser" + zresponse.userid + "' class='wtw-yellowbuttonright' onclick=\"WTW.cancelSaveUser();\">Cancel</div>";

				}
				dGet('wtw_userinfo').innerHTML = zuserlist;
				WTW.hide('wtw_loadingusers');
				WTW.show('wtw_userinfo');
				if (dGet('wtw_adduserrole') != null) {
					WTW.clearDDL('wtw_adduserrole');
					WTW.getJSON("/connect/roles.php", 
						function(zresponse) {
							if (zresponse != null) {
								zresponse = JSON.parse(zresponse);
								for (var i=0;i<zresponse.length;i++) {
									var option = document.createElement("option");
									option.text = zresponse[i].rolename;
									option.value = zresponse[i].roleid;
									dGet('wtw_adduserrole').add(option);
								}
							}
						}
					);
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminusers.js-getUser=" + ex.message);
	}
}

WTWJS.prototype.deleteUserRole = function(zuserid, zuserinroleid) {
	/* delete a role from a user */
	try {	
		if (zuserinroleid != "") {
			dGet('deleteuserrole' + zuserinroleid).innerHTML = "Deleting...";
			var zrequest = {
				'userinroleid':zuserinroleid,
				'userid':zuserid,
				'function':'deleteuserrole'
			};
			WTW.postJSON("/core/handlers/users.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					WTW.getUser(zuserid);
				}
			);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminusers.js-deleteUserRole=" + ex.message);
	}
}	

WTWJS.prototype.addUserRole = function(zuserid) {
	/* add a role to a user */
	try {	
		var zroleid = WTW.getDDLValue('wtw_adduserrole');
		if (zroleid != "" && zuserid != "") {
			dGet('adduserrole' + zuserid).innerHTML = "Adding...";
			var zrequest = {
				'userid': zuserid,
				'roleid': zroleid,
				'function':'saveuserrole'
			};
			WTW.postJSON("/core/handlers/users.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					WTW.getUser(zuserid);
				}
			);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminusers.js-addUserRole=" + ex.message);
	}
}	

WTWJS.prototype.addUser = function() {
	/* open form to add new user */
	try {
		WTW.show('wtw_loadingusers');
		WTW.hide('wtw_userlist');
		WTW.hide('wtw_useradd');
		WTW.hide('wtw_userinfo');
		var zuserlist = "";
		var samplepassword = WTW.getRandomString(20);
		dGet('wtw_useradd').innerHTML = "";
		dGet('wtw_alluserswidth').className = "wtw-dashboardboxleft";
		dGet('wtw_alluserstitle').innerHTML = "New User";
		zuserlist += "<div class=\"wtw-dashboardlabel\">User Name</div>";
		zuserlist += "<div class=\"wtw-dashboardvalue\"><input id=\"wtw_tuserusername2\" type=\"text\" maxlength=\"64\"/></div>";
		zuserlist += "<div class=\"wtw-clear\"></div>";
		zuserlist += "<div class=\"wtw-dashboardlabel\">Email</div>";
		zuserlist += "<div class=\"wtw-dashboardvalue\"><input id=\"wtw_tuseruseremail2\" type=\"text\" maxlength=\"255\"/></div>";
		zuserlist += "<div class=\"wtw-clear\"></div>";
		zuserlist += "<div class=\"wtw-dashboardlabel\">Password</div>";
		zuserlist += "<div class=\"wtw-dashboardvalue\"><input id=\"wtw_tuseruserpassword2\" type=\"text\" value=\"" + samplepassword + "\" maxlength=\"255\"/></div>";
		zuserlist += "<div class=\"wtw-clear\"></div>";

		zuserlist += "<div id=\"wtw_errorusersave2\" class=\"wtw-dashboardlabel wtw-red\"></div>";
		zuserlist += "<div class=\"wtw-clear\"></div>";
		zuserlist += "<div id='cancelsaveuser' class='wtw-yellowbuttonleft' onclick=\"WTW.cancelSaveUser();\">Cancel</div>";
		zuserlist += "<div id='adduser' class='wtw-greenbuttonright' onclick=\"WTW.saveNewUser();\">Save User</div>";
		dGet('wtw_useradd').innerHTML = zuserlist;
		WTW.hide('wtw_loadingusers');
		WTW.show('wtw_useradd');
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminusers.js-addUser=" + ex.message);
	}
}

WTWJS.prototype.cancelSaveUser = function() {
	/* cancel save user changes */
	try {	
		dGet('wtw_alluserstitle').innerHTML = "<div id='wtw_adduserbutton' class='wtw-greenbuttonright' onclick=\"WTW.addUser();\">Add New</div>All Users";
		WTW.hide('wtw_userinfo');
		WTW.hide('wtw_useradd');
		dGet('wtw_alluserswidth').className = "wtw-dashboardboxleftfull";
		WTW.show('wtw_userlist');
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminusers.js-cancelSaveUser=" + ex.message);
	}
}	

WTWJS.prototype.saveNewUser = function() {
	/* save new user settings */
	try {	
		zusername = dGet("wtw_tuserusername2").value;
		dGet('wtw_errorusersave2').innerHTML = "";

		if (zusername.length > 2) {
			dGet('wtw_alluserstitle').innerHTML = "<div id='wtw_adduserbutton' class='wtw-greenbuttonright' onclick=\"WTW.addUser();\">Add New</div>All Users";
			WTW.hide('wtw_userlist');
			WTW.hide('wtw_userinfo');
			WTW.hide('wtw_useradd');
			dGet('wtw_alluserswidth').className = "wtw-dashboardboxleftfull";
			zemail = dGet("wtw_tuseruseremail2").value;
			zpassword = btoa(dGet("wtw_tuseruserpassword2").value);
			var zrequest = {
				'username': zusername,
				'password': zpassword,
				'email': zemail,
				'function':'savenewuser'
			};
			WTW.postJSON("/core/handlers/users.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					WTW.openAllUsers();
				}
			);
		} else {
			dGet('wtw_errorusersave2').innerHTML = "User Name must be 3 or more characters";
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminusers.js-saveNewUser=" + ex.message);
	}
}	

WTWJS.prototype.saveUser = function() {
	/* save (update) user settings */
	try {	
		zusername = dGet("wtw_tuserusername").value;
		dGet('wtw_errorusersave').innerHTML = "";

		if (zusername.length > 2) {
			dGet('wtw_alluserstitle').innerHTML = "<div id='wtw_adduserbutton' class='wtw-greenbuttonright' onclick=\"WTW.addUser();\">Add New</div>All Users";
			WTW.hide('wtw_userlist');
			WTW.hide('wtw_userinfo');
			WTW.hide('wtw_useradd');
			dGet('wtw_alluserswidth').className = "wtw-dashboardboxleftfull";
			zuserid = dGet("wtw_tuseruserid").innerText;
			zemail = dGet("wtw_tuseruseremail").value;
			var zrequest = {
				'userid':zuserid,
				'username':zusername,
				'email':zemail,
				'function':'saveuser'
			};
			WTW.postJSON("/core/handlers/users.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					WTW.openAllUsers();
				}
			);
		} else {
			dGet('wtw_errorusersave').innerHTML = "User Name must be 3 or more characters";
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminusers.js-saveUser=" + ex.message);
	}
}	

WTWJS.prototype.deleteUser = function(zuserid) {
	/* delete user and refresh user list */
	try {	
		if (zuserid != "") {
			var zrequest = {
				'userid': zuserid,
				'function':'deleteuser'
			};
			WTW.postJSON("/core/handlers/users.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					WTW.openAllUsers();
				}
			);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminusers.js-deleteUser=" + ex.message);
	}
}	


/* dev access - provides direct access to a given 3D Community, 3D Building, or 3D Thing */

WTWJS.prototype.openPermissionsForm = function() {
	/* open permissions form to edit users with access */
	try {
		WTW.hide('wtw_adminmenu60b');
		WTW.hide('wtw_userdevaccesslist');
		WTW.show('wtw_loadinguserdevaccessform');
		var zwebtype = 'Community';
		if (buildingid != '') {
			zwebtype = 'Building';
		} else if (thingid != '') {
			zwebtype = 'Thing';
		}
		dGet('wtw_accessnote').innerHTML = "Dev: updates to 3D " + zwebtype + ".<br />Admin: Dev and set permissions.";
		dGet('wtw_userdevaccesslist').innerHTML = "";
		WTW.getJSON("/connect/useraccess.php?communityid=" + communityid + "&buildingid=" + buildingid + "&thingid=" + thingid, 
			function(response) {
				var useraccess = JSON.parse(response);
				if (useraccess != null) {
					for (var i = 0; i < useraccess.length; i++) {
						if (useraccess[i] != null) {
							var displayname = useraccess[i].displayname;
							if (displayname == '') {
								displayname = useraccess[i].username;
							}
							if (displayname == '') {
								displayname = useraccess[i].email;
							}
							if (displayname == '') {
								displayname = useraccess[i].userid;
							}
							dGet('wtw_userdevaccesslist').innerHTML += "<div class='wtw-menulevel0' onclick=\"WTW.toggle('wtw_div-" + useraccess[i].userauthorizationid + "');\"><div class='wtw-altkey'>" + useraccess[i].useraccess + "</div>" + displayname + "</div><div id='wtw_div-" + useraccess[i].userauthorizationid + "' class='wtw-detailprint' style='display:none;visibility:hidden;'>User Name: " + useraccess[i].username + "<br />Display Name: " + useraccess[i].displayname + "<br /><div id=\"wtw_bdelete-" + useraccess[i].userauthorizationid + "\" class='wtw-redbutton' onclick=\"dGet('wtw_tadduserdevaccess').value='" + useraccess[i].userid + "';WTW.deleteDevAccess();\" style='margin-left:30px;margin-right:20px;'>Delete</div><div id=\"wtw_bcancel-" + useraccess[i].userauthorizationid + "\" class='wtw-yellowbutton' onclick=\"WTW.toggle('wtw_div-" + useraccess[i].userauthorizationid + "');\">Cancel</div></div>";
						}
					}
				}
				window.setTimeout(function() {
					WTW.hide('wtw_loadinguserdevaccessform');
					WTW.show('wtw_adminmenu60b');
					WTW.show('wtw_userdevaccesslist');
				},500);
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminusers.js-openPermissionsForm=" + ex.message);
	}		
}

WTWJS.prototype.updateDevAccessList = function(permissionslist) {
	/* update developer access list (work in progress) */
	try {
		var totals = "";
		dGet('wtw_useraccesslist').innerHTML = "";
		dGet('wtw_userdevaccesslist').innerHTML = "";
		var permissions = JSON.parse(permissionslist);
		if (permissions != null) {
			if (permissions.length > 0) {
				for (var i = 0; i < permissions.length; i++) {
					if (permissions[i] != null) {
						switch (permissions[i].useraccess) {
							case "admin":
//								dGet('wtw_userdevaccesslist').innerHTML += "<div style='white-space:nowrap;'><div style='float:right;text-align:right;'><input type=\"checkbox\" id=\"wtw_taccesslevel1-" + permissions[i].authorizationid + "\" name=\"taccesslevel1-" + permissions[i].authorizationid + "\" class=\"smallprint\" value=\"1\" checked=\"true\" onchange=\"WTW.setDevAccessValid('taccesslevel1-" + permissions[i].authorizationid + "','taccesslevel2-" + permissions[i].authorizationid + "',0);dGet('wtw_tadduserdevaccess').value='" + permissions[i].userid + "';WTW.addDevAccess();\" /> Dev &nbsp;&nbsp;&nbsp;<input type=\"checkbox\" id=\"wtw_taccesslevel2-" + permissions[i].authorizationid + "\" name=\"wtw_taccesslevel2-" + permissions[i].authorizationid + "\" class=\"smallprint\" value=\"1\" checked=\"true\" onchange=\"WTW.setDevAccessValid('taccesslevel1-" + permissions[i].authorizationid + "','taccesslevel2-" + permissions[i].authorizationid + "',1);dGet('wtw_tadduserdevaccess').value='" + permissions[i].userid + "';WTW.addDevAccess();\" /> Admin &nbsp;&nbsp;&nbsp;<input id='wtw_bdeleteauthorization" + permissions[i].authorizationid + "' type='button' value='delete' onclick=\"dGet('wtw_tadduserdevaccess').value='" + permissions[i].userid + "';WTW.deleteDevAccess();return (false);\" /></div><div><b>" + permissions[i].userid + "</b></div></div><br />";
								break;
							case "architect":
//								dGet('wtw_userdevaccesslist').innerHTML += "<div style='white-space:nowrap;'><div style='float:right;text-align:right;'><input type=\"checkbox\" id=\"wtw_taccesslevel1-" + permissions[i].authorizationid + "\" name=\"taccesslevel1-" + permissions[i].authorizationid + "\" class=\"smallprint\" value=\"1\" checked=\"true\" onchange=\"WTW.setDevAccessValid('taccesslevel1-" + permissions[i].authorizationid + "','taccesslevel2-" + permissions[i].authorizationid + "',0);dGet('wtw_tadduserdevaccess').value='" + permissions[i].userid + "';WTW.addDevAccess();\" /> Dev &nbsp;&nbsp;&nbsp;<input type=\"checkbox\" id=\"wtw_taccesslevel2-" + permissions[i].authorizationid + "\" name=\"wtw_taccesslevel2-" + permissions[i].authorizationid + "\" class=\"smallprint\" value=\"1\" onchange=\"WTW.setDevAccessValid('taccesslevel1-" + permissions[i].authorizationid + "','wtw_taccesslevel2-" + permissions[i].authorizationid + "',1);dGet('wtw_tadduserdevaccess').value='" + permissions[i].userid + "';WTW.addDevAccess();\" /> Admin &nbsp;&nbsp;&nbsp;<input id='wtw_bdeleteauthorization" + permissions[i].authorizationid + "' type='button' value='delete' onclick=\"dGet('wtw_tadduserdevaccess').value='" + permissions[i].userid + "';WTW.deleteDevAccess();return (false);\" /></div><div><b>" + permissions[i].userid + "</b></div></div><br />";
								break;
							default:
//								dGet('wtw_useraccesslist').innerHTML += "<div style='white-space:nowrap;'><div style='float:right;text-align:right;'><input id='wtw_bdeletebrowseauthorization" + permissions[i].authorizationid + "' type='button' value='delete' onclick=\"dGet('wtw_tadduseridname').value='" + permissions[i].userid + "';WTW.deleteAccess();return (false);\" /></div><div><b>" + permissions[i].userid + "</b></div></div><br />";
								break;
						}
						totals = "<hr />Browsers = " + permissions[i].counts.browse + "<br />Invitees = " + permissions[i].counts.invitees + "<br />Neighbors = " + permissions[i].counts.neighbors + "<br />Architects = " + permissions[i].counts.architects + "<br />Administrators = " + permissions[i].counts.admins;
					}
				}
			}
		}
		dGet('wtw_useraccesslist').innerHTML += totals;
		dGet('wtw_userdevaccesslist').innerHTML += totals;
		WTW.hide('wtw_loadinguserdevaccessform');
		WTW.show('wtw_adminmenu60b');
		WTW.setWindowSize();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminusers.js-updateDevAccessList=" + ex.message);
	}		
}

WTWJS.prototype.addAccess = function() {
	/* add user access to 3D Community, 3D Building, or 3D Thing */
	try {
		var zrequest = {
			'communityid': communityid,
			'buildingid': buildingid,
			'thingid': thingid,
			'useraccess': dGet('wtw_taddnewaccess').value,
			'usersearch': dGet('wtw_tadduseridname').value,
			'function':'savepermissions'
		};
		WTW.postJSON("/core/handlers/users.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.openPermissionsForm();
			}
		);
		dGet('wtw_tadduseridname').value = "";
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminusers.js-addAccess=" + ex.message);
	}		
}

WTWJS.prototype.deleteAccess = function() {
	/* delete user access to 3D Community, 3D Building, or 3D Thing */
	try {
		var zrequest = {
			'communityid': communityid,
			'buildingid': buildingid,
			'thingid': thingid,
			'usersearch': dGet('wtw_tadduseridname').value,
			'function':'deletepermissions'
		};
		WTW.postJSON("/core/handlers/users.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.openPermissionsForm();
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminusers.js-deleteAccess=" + ex.message);
	}		
}




WTWJS.prototype.addDevAccess = function() {
	try {
		var zrequest = {
			'communityid': communityid,
			'buildingid': buildingid,
			'thingid': thingid,
			'useraccess': dGet('wtw_taddnewaccess').value,
			'usersearch': dGet('wtw_tadduserdevaccess').value,
			'function':'savepermissions'
		};
		WTW.postJSON("/core/handlers/users.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.openPermissionsForm();
			}
		);
		dGet('wtw_tadduserdevaccess').value = "";
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminusers.js-addDevAccess=" + ex.message);
	}		
}

WTWJS.prototype.setDevAccessValid = function(level1, level2, w) {
	try {
		if (w == 2) {
			if (dGet('wtw_tadduserdevaccess').value.length < 6) {
				WTW.showInline('wtw_reqtadduserdevaccess');
			} else {
				WTW.hide('wtw_reqtadduserdevaccess');
			}
		} else if (w == 1) {
			if (dGet(level2).checked) {
				dGet(level1).checked = true;
			}
		} else {
			if (dGet(level1).checked == false) {
				dGet(level2).checked = false;
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminusers.js-setDevAccessValid=" + ex.message);
	}		
}

WTWJS.prototype.setAccessValid = function(w) {
	try {
		if (w == 2) {
			if (dGet('wtw_tadduseridname').value.length < 6) {
				WTW.showInline('wtw_reqtadduseraccess');
			} else {
				WTW.hide('wtw_reqtadduseraccess');
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminusers.js-setAccessValid=" + ex.message);
	}		
}

WTWJS.prototype.deleteDevAccess = function() {
	try {
		var zrequest = {
			'communityid': communityid,
			'buildingid': buildingid,
			'thingid': thingid,
			'usersearch': dGet('wtw_tadduserdevaccess').value,
			'function':'deletepermissions'
		};
		WTW.postJSON("/core/handlers/users.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.openPermissionsForm();
			}
		);
		dGet('wtw_tadduserdevaccess').value = "";
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminusers.js-deleteDevAccess=" + ex.message);
	}		
}


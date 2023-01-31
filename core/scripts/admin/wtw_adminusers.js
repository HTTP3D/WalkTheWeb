/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are used to administer a website in admin mode only */

/* roles and direct user access settings */
/* 		roles - give server wide access to levels of functionality */
/* 		dev access - provides direct access to a given 3D Community, 3D Building, or 3D Thing */

WTWJS.prototype.openAllUsers = async function(zfilter) {
	/* open admin page form for users and role access */
	try {
		if (zfilter == undefined) {
			zfilter = 'All Users';
		}
		var zusersnote = '';
		switch (zfilter) {
			case 'Privileged Users':
				zusersnote = '<b>Privileged Users</b> provides a list of users that have been granted one or more security Roles.<br />';
				break;
			case 'Local Users':
				zusersnote = '<b>Local Users</b> provides a list of local users on this server that have been granted one or more security Roles.<br />';
				break;
			case 'Global Users':
				zusersnote = '<b>Global Users</b> provides a list of WalkTheWeb Global users that have been granted one or more security roles.<br />';
				break;
			case 'Visiting Users':
				zusersnote = '<b>Visiting Users</b> provides a list of logged in users including those who have visited using a WalkTheWeb Global Login, that do not have any security roles on this server.<br />';
				break;
			default:
				zusersnote = '<b>All Users</b> provides a list of users including those who have visited using a WalkTheWeb Global Login.<br />';
				break;
		}
		dGet('wtw_usersnote').innerHTML = zusersnote;
		dGet('wtw_filter').value = zfilter;
		dGet('wtw_alluserstitle').innerHTML = "<div id='wtw_adduserbutton' class='wtw-greenbuttonright' onclick=\"WTW.addUser();\">Add New</div>" + zfilter;
		WTW.show('wtw_userspage');
		WTW.show('wtw_loadingusers');
		WTW.hide('wtw_allusers');
		WTW.hide('wtw_userlist');
		WTW.hide('wtw_userinfo');
		WTW.hide('wtw_useradd');
		dGet('wtw_userlist').innerHTML = '';
		dGet('wtw_alluserswidth').className = 'wtw-dashboardboxleftfull';
		WTW.getAsyncJSON('/connect/users.php', 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zuserlist = '';
				if (zresponse != null) {
					zuserlist += "<table class='wtw-table'><tr><td class='wtw-tablecolumnheading'>Display Name</td><td class='wtw-tablecolumnheading'>Email</td><td class='wtw-tablecolumnheading'>User ID</td><td class='wtw-tablecolumnheading'>User Roles</td><td class='wtw-tablecolumnheading'>Create Date</td><td class='wtw-tablecolumnheading'>&nbsp;</td></tr>";
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i].userid != undefined) {
							if (zfilter == 'All Users' || 
								(zfilter == 'Privileged Users' && zresponse[i].roles.length > 0) || 
								(zfilter == 'Local Users' && zresponse[i].usertoken == 'false' && zresponse[i].roles.length > 0) || 
								(zfilter == 'Global Users' && zresponse[i].usertoken == 'true' && zresponse[i].roles.length > 0) || 
								(zfilter == 'Visiting Users' && zresponse[i].roles.length == 0)) {
								zuserlist += "<tr><td class='wtw-tablecolumns'>" + zresponse[i].displayname + "</td><td class='wtw-tablecolumns'>" + zresponse[i].email + "</td><td class='wtw-tablecolumns'>" + zresponse[i].userid + "</td><td class='wtw-tablecolumns'>";
								for (var j=0;j<zresponse[i].roles.length;j++) {
									if (zresponse[i].roles[j] != undefined) {
										if (j == 0) {
											zuserlist += zresponse[i].roles[j].rolename;
										} else {
											zuserlist += ', ' + zresponse[i].roles[j].rolename;
										}
									}
								}
								zuserlist += "</td><td class='wtw-tablecolumns'>" + zresponse[i].createdate + "</td><td class='wtw-tablecolumns'>";
								zuserlist += "<div id='getuser" + zresponse[i].userid + "' class='wtw-bluebuttonright' onclick=\"WTW.getUser('" + zresponse[i].userid + "');\">Edit User</div>";
								zuserlist += "</td></tr>";
							}
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
		WTW.log('core-scripts-admin-wtw_adminusers.js-openAllUsers=' + ex.message);
	}
}

WTWJS.prototype.getUser = async function(zuserid) {
	/* select user form list and display user information and roles edit form */
	try {
		WTW.show('wtw_loadingusers');
		WTW.hide('wtw_userlist');
		WTW.hide('wtw_useradd');
		WTW.hide('wtw_userinfo');
		dGet('wtw_userinfo').innerHTML = '';
		dGet('wtw_alluserswidth').className = 'wtw-dashboardboxleft';
		WTW.getAsyncJSON('/connect/user.php?userid=' + zuserid, 
			async function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zuserlist = '';
				if (zresponse != null) {
					dGet('wtw_alluserstitle').innerHTML = 'User: ' + zresponse.email;
					zuserlist += "<div class='wtw-dashboardlabel'>Display Name</div>";
					zuserlist += "<div class='wtw-dashboardvalue'><input id='wtw_tuserdisplayname' type='text' value=\"" + zresponse.displayname + "\" maxlength='64'/></div>";
					zuserlist += "<div class='wtw-clear'></div>";
					zuserlist += "<div class='wtw-dashboardlabel'>User ID</div>";
					zuserlist += "<div id='wtw_tuseruserid' class='wtw-dashboardvalue'>" + zresponse.userid + "</div>";
					zuserlist += "<div class='wtw-clear'></div>";
					zuserlist += "<div class='wtw-dashboardlabel'>User Upload Path ID</div>";
					zuserlist += "<div class='wtw-dashboardvalue'>" + zresponse.uploadpathid + "</div>";
					zuserlist += "<div class='wtw-clear'></div>";
					zuserlist += "<div class='wtw-dashboardlabel'>Email</div>";
					zuserlist += "<div class='wtw-dashboardvalue'><input id='wtw_tuseruseremail' type='text' value='" + zresponse.email + "' maxlength='255'/></div>";
					zuserlist += "<div class='wtw-clear'></div>";
					zuserlist += "<div class='wtw-dashboardlabel'>Create Date</div>";
					zuserlist += "<div id='wtw_tuseruserid' class='wtw-dashboardvalue'>" + zresponse.createdate + "</div>";
					zuserlist += "<div class='wtw-clear'></div>";
					zuserlist += "<div class='wtw-dashboardlabel'>Last Update Date</div>";
					zuserlist += "<div id='wtw_tuseruserid' class='wtw-dashboardvalue'>" + zresponse.updatedate + "</div>";
					zuserlist += "<div class='wtw-clear'></div><hr />";
					zuserlist += "<div class='wtw-dashboardlabel'>Roles:</div><div class='wtw-clear'></div><div class='wtw-indent'>";
					for (var i=0;i<zresponse.roles.length;i++) {
						if (zresponse.roles[i] != undefined) {
							zuserlist += "<div id='deleteuserrole" + zresponse.roles[i].userinroleid + "' class='wtw-redbuttonright' onclick=\"WTW.deleteUserRole('" + zresponse.userid + "','" + zresponse.roles[i].userinroleid + "');\" alt='Delete Role' title='Delete Role'>X</div>";
							zuserlist += "<div class='wtw-dashboardlabel'>" + zresponse.roles[i].rolename + "</div>";
							zuserlist += "<div class='wtw-clear'></div>";
						}
					}
					zuserlist += "</div><div class='wtw-clear'></div><br />";
					zuserlist += "<div class='wtw-dashboardlabel'><select id='wtw_adduserrole' class='wtw-indent wtw-pointer'></select></div>";
					zuserlist += "<div id='adduserrole" + zresponse.userid + "' class='wtw-bluebuttonright' onclick=\"WTW.addUserRole('" + zresponse.userid + "');\">Add Role</div>";
					zuserlist += "<div class='wtw-clear'></div><hr />";

					zuserlist += "<div id='wtw_errorusersave' class='wtw-dashboardlabel wtw-red'></div>";
					zuserlist += "<div class='wtw-clear'></div>";
					zuserlist += "<div id='deleteuser" + zresponse.userid + "' class='wtw-redbuttonleft' onclick=\"WTW.deleteUser('" + zresponse.userid + "');\">Delete User</div>";
					zuserlist += "<div id='saveuser" + zresponse.userid + "' class='wtw-greenbuttonright' onclick=\"WTW.saveUser();\">Save User</div>";
					zuserlist += "<div id='cancelsaveuser" + zresponse.userid + "' class='wtw-yellowbuttonright' onclick=\"WTW.cancelSaveUser();\">Cancel</div>";

				}
				dGet('wtw_userinfo').innerHTML = zuserlist;
				WTW.hide('wtw_loadingusers');
				WTW.show('wtw_userinfo');
				if (dGet('wtw_adduserrole') != null) {
					WTW.clearDDL('wtw_adduserrole');
					WTW.getAsyncJSON('/connect/roles.php', 
						function(zresponse) {
							if (zresponse != null) {
								zresponse = JSON.parse(zresponse);
								for (var i=0;i<zresponse.length;i++) {
									var zoption = document.createElement('option');
									zoption.text = zresponse[i].rolename;
									zoption.value = zresponse[i].roleid;
									dGet('wtw_adduserrole').add(zoption);
								}
							}
						}
					);
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-getUser=' + ex.message);
	}
}

WTWJS.prototype.openAllRoles = async function() {
	/* open admin page form for roles for users access */
	try {
		dGet('wtw_rolestitle').innerHTML = "<div id='wtw_addrolebutton' class='wtw-greenbuttonright' onclick=\"WTW.addRole();\">Add New</div>User Roles";
		WTW.show('wtw_userspage');
		WTW.show('wtw_loadingusers');
		WTW.hide('wtw_roleinfo');
		WTW.hide('wtw_roles');
		WTW.hide('wtw_roleslist');
		WTW.hide('wtw_roleadd');
		dGet('wtw_roleslist').innerHTML = '';
		dGet('wtw_roleswidth').className = 'wtw-dashboardboxleftfull';
		WTW.getAsyncJSON('/connect/roles.php', 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				var zuserroleslist = '';
				if (zresponse != null) {
					zuserroleslist += "<table class='wtw-table'><tr><td class='wtw-tablecolumnheading'>Role ID</td><td class='wtw-tablecolumnheading'>Role Name</td><td class='wtw-tablecolumnheading'>Create Date</td><td class='wtw-tablecolumnheading'>&nbsp;</td></tr>";
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i].roleid != undefined) {
							zuserroleslist += "<tr><td class='wtw-tablecolumns'>" + zresponse[i].roleid + "</td><td class='wtw-tablecolumns'>" + zresponse[i].rolename + "</td><td class='wtw-tablecolumns'>" + zresponse[i].createdate + "</td><td class='wtw-tablecolumns'>";
							zuserroleslist += "<div id='getuserrole" + zresponse[i].roleid + "' class='wtw-bluebuttonright' onclick=\"WTW.getRole('" + zresponse[i].roleid + "', '" + btoa(zresponse[i].rolename) + "');\">Edit Role</div>";
							zuserroleslist += "</td></tr>";
						}
					}
					zuserroleslist += "</table>";
				}
				dGet('wtw_roleslist').innerHTML = zuserroleslist;
				WTW.hide('wtw_loadingusers');
				WTW.show('wtw_roleslist');
				WTW.show('wtw_roles');
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-openAllRoles=' + ex.message);
	}
}

WTWJS.prototype.addRole = function() {
	/* open form to add new role */
	try {
		WTW.show('wtw_loadingusers');
		WTW.hide('wtw_roleslist');
		WTW.hide('wtw_roleadd');
		WTW.hide('wtw_roleinfo');
		var zroleinfo = '';
		dGet('wtw_roleadd').innerHTML = '';
		dGet('wtw_roleswidth').className = 'wtw-dashboardboxleft';
		dGet('wtw_rolestitle').innerHTML = 'New Role';
		zroleinfo += "<div class='wtw-dashboardlabel'>Role Name</div>";
		zroleinfo += "<div class='wtw-dashboardvalue'><input id='wtw_trolename2' type='text' maxlength='45'/></div>";
		zroleinfo += "<div class='wtw-clear'></div>";

		zroleinfo += "<div id='wtw_errorrolesave2' class='wtw-dashboardlabel wtw-red'></div>";
		zroleinfo += "<div class='wtw-clear'></div>";
		zroleinfo += "<div id='cancelsaverole' class='wtw-yellowbuttonleft' onclick='WTW.cancelSaveRole();'>Cancel</div>";
		zroleinfo += "<div id='addrole' class='wtw-greenbuttonright' onclick='WTW.saveNewRole();'>Save Role</div>";
		dGet('wtw_roleadd').innerHTML = zroleinfo;
		WTW.hide('wtw_loadingusers');
		WTW.show('wtw_roleadd');
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-addRole=' + ex.message);
	}
}

WTWJS.prototype.cancelSaveRole = function() {
	/* cancel save role changes */
	try {	
		dGet('wtw_rolestitle').innerHTML = "<div id='wtw_addrolebutton' class='wtw-greenbuttonright' onclick='WTW.addRole();'>Add New</div>User Roles";
		WTW.hide('wtw_roleinfo');
		WTW.hide('wtw_roleadd');
		dGet('wtw_roleswidth').className = 'wtw-dashboardboxleftfull';
		WTW.show('wtw_roleslist');
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-cancelSaveRole=' + ex.message);
	}
}	

WTWJS.prototype.saveNewRole = async function() {
	/* save new role */
	try {	
		var zrolename = dGet('wtw_trolename2').value;
		dGet('wtw_errorrolesave2').innerHTML = '';

		if (zrolename.length > 2) {
			dGet('wtw_rolestitle').innerHTML = "<div id='wtw_addrolebutton' class='wtw-greenbuttonright' onclick='WTW.addRole();'>Add New</div>User Roles";
			WTW.hide('wtw_roleslist');
			WTW.hide('wtw_roleinfo');
			WTW.hide('wtw_roleadd');
			dGet('wtw_roleswidth').className = 'wtw-dashboardboxleftfull';
			var zrequest = {
				'rolename':btoa(zrolename),
				'function':'savenewrole'
			};
			WTW.postAsyncJSON('/core/handlers/users.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					WTW.openAllRoles();
				}
			);
		} else {
			dGet('wtw_errorrolesave2').innerHTML = 'Role Name must be 3 or more characters';
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-saveNewRole=' + ex.message);
	}
}	

WTWJS.prototype.saveRole = async function() {
	/* save (update) role */
	try {	
		var zrolename = dGet('wtw_trolename').value;
		var zroleid = dGet('wtw_troleid').innerText;
		dGet('wtw_errorrolesave').innerHTML = '';

		if (zrolename.length > 2) {
			dGet('wtw_alluserstitle').innerHTML = "<div id='wtw_addrolebutton' class='wtw-greenbuttonright' onclick='WTW.addRole();'>Add New</div>User Roles";
			WTW.hide('wtw_roleslist');
			WTW.hide('wtw_roleinfo');
			WTW.hide('wtw_roleadd');
			dGet('wtw_roleswidth').className = 'wtw-dashboardboxleftfull';
			var zrequest = {
				'roleid':zroleid,
				'rolename':btoa(zrolename),
				'function':'saverole'
			};
			WTW.postAsyncJSON('/core/handlers/users.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					WTW.openAllRoles();
				}
			);
		} else {
			dGet('wtw_errorrolesave').innerHTML = 'Role Name must be 3 or more characters';
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-saveUser=' + ex.message);
	}
}	

WTWJS.prototype.getRole = async function(zroleid, zrolename) {
	/* select role form list and display role edit form */
	try {
		WTW.show('wtw_loadingusers');
		WTW.hide('wtw_roleslist');
		WTW.hide('wtw_roleadd');
		WTW.hide('wtw_roleinfo');
		dGet('wtw_roleinfo').innerHTML = '';
		dGet('wtw_roleswidth').className = 'wtw-dashboardboxleft';


		var zroleinfo = '';
		dGet('wtw_rolestitle').innerHTML = 'Role: ' + atob(zrolename);
		zroleinfo += "<div class='wtw-dashboardlabel'>Role Name</div>";
		zroleinfo += "<div class='wtw-dashboardvalue'><input id='wtw_trolename' type='text' value='" + atob(zrolename) + "' maxlength='64'/></div>";
		zroleinfo += "<div class='wtw-clear'></div>";
		zroleinfo += "<div class='wtw-dashboardlabel'>Role ID</div>";
		zroleinfo += "<div id='wtw_troleid' class='wtw-dashboardvalue'>" + zroleid + "</div>";
		zroleinfo += "<div class='wtw-clear'></div><hr />";

		zroleinfo += "<div id='wtw_errorrolesave' class='wtw-dashboardlabel wtw-red'></div>";
		zroleinfo += "<div class='wtw-clear'></div>";
		zroleinfo += "<div id='deleterole" + zroleid + "' class='wtw-redbuttonleft' onclick=\"WTW.deleteRole('" + zroleid + "');\">Delete Role</div>";
		zroleinfo += "<div id='saverole" + zroleid + "' class='wtw-greenbuttonright' onclick='WTW.saveRole();'>Save Role</div>";
		zroleinfo += "<div id='cancelsaverole" + zroleid + "' class='wtw-yellowbuttonright' onclick='WTW.cancelSaveRole();'>Cancel</div>";

		dGet('wtw_roleinfo').innerHTML = zroleinfo;
		WTW.hide('wtw_loadingusers');
		WTW.show('wtw_roleinfo');
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-getRole=' + ex.message);
	}
}

WTWJS.prototype.deleteRole = async function(zroleid) {
	/* delete role and refresh role list */
	try {	
		if (zroleid != '') {
			var zrequest = {
				'roleid':zroleid,
				'function':'deleterole'
			};
			WTW.postAsyncJSON('/core/handlers/users.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					WTW.openAllRoles();
				}
			);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-deleteRole=' + ex.message);
	}
}	

WTWJS.prototype.deleteUserRole = async function(zuserid, zuserinroleid) {
	/* delete a role from a user */
	try {	
		if (zuserinroleid != '') {
			dGet('deleteuserrole' + zuserinroleid).innerHTML = 'Deleting...';
			var zrequest = {
				'userinroleid':zuserinroleid,
				'userid':zuserid,
				'function':'deleteuserrole'
			};
			WTW.postAsyncJSON('/core/handlers/users.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					WTW.getUser(zuserid);
				}
			);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-deleteUserRole=' + ex.message);
	}
}	

WTWJS.prototype.addUserRole = async function(zuserid) {
	/* add a role to a user */
	try {	
		var zroleid = WTW.getDDLValue('wtw_adduserrole');
		if (zroleid != '' && zuserid != '') {
			dGet('adduserrole' + zuserid).innerHTML = 'Adding...';
			var zrequest = {
				'userid':zuserid,
				'roleid':zroleid,
				'function':'saveuserrole'
			};
			WTW.postAsyncJSON('/core/handlers/users.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					WTW.getUser(zuserid);
				}
			);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-addUserRole=' + ex.message);
	}
}	

WTWJS.prototype.isUserInRole = function(zrolename) {
	/* is user in a role by name */
	var zisinrole = false;
	try {	
		if (WTW.roles != null && zrolename != '') {
			for (i=0;i< WTW.roles.length;i++) {
				if (WTW.roles[i] != null) {
					if (WTW.roles[i].rolename.toLowerCase() == zrolename.toLowerCase()) {
						zisinrole = true;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-isUserInRole=' + ex.message);
	}
	return zisinrole;
}	

WTWJS.prototype.addUser = function() {
	/* open form to add new user */
	try {
		WTW.show('wtw_loadingusers');
		WTW.hide('wtw_userlist');
		WTW.hide('wtw_useradd');
		WTW.hide('wtw_userinfo');
		var zuserinfo = '';
		var zsamplepassword = WTW.getRandomString(20);
		dGet('wtw_useradd').innerHTML = '';
		dGet('wtw_alluserswidth').className = 'wtw-dashboardboxleft';
		dGet('wtw_alluserstitle').innerHTML = 'New User';
		zuserinfo += "<div class='wtw-dashboardlabel'>Display Name</div>";
		zuserinfo += "<div class='wtw-dashboardvalue'><input id='wtw_tuserdisplayname2' type='text' maxlength='64'/></div>";
		zuserinfo += "<div class='wtw-clear'></div>";
		zuserinfo += "<div class='wtw-dashboardlabel'>Email</div>";
		zuserinfo += "<div class='wtw-dashboardvalue'><input id='wtw_tuseruseremail2' type='text' maxlength='255'/></div>";
		zuserinfo += "<div class='wtw-clear'></div>";
		zuserinfo += "<div class='wtw-dashboardlabel'>Password</div>";
		zuserinfo += "<div class='wtw-dashboardvalue'><input id='wtw_tuseruserpassword2' type='text' value=\"" + zsamplepassword + "\" maxlength='255'/></div>";
		zuserinfo += "<div class='wtw-clear'></div>";

		zuserinfo += "<div id='wtw_errorusersave2' class='wtw-dashboardlabel wtw-red'></div>";
		zuserinfo += "<div class='wtw-clear'></div>";
		zuserinfo += "<div id='cancelsaveuser' class='wtw-yellowbuttonleft' onclick='WTW.cancelSaveUser();'>Cancel</div>";
		zuserinfo += "<div id='adduser' class='wtw-greenbuttonright' onclick='WTW.saveNewUser();'>Save User</div>";
		dGet('wtw_useradd').innerHTML = zuserinfo;
		WTW.hide('wtw_loadingusers');
		WTW.show('wtw_useradd');
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-addUser=' + ex.message);
	}
}

WTWJS.prototype.cancelSaveUser = function() {
	/* cancel save user changes */
	try {
		var zfilter = dGet('wtw_filter').value;
		if (zfilter == '') {
			zfilter = 'All Users';
		}
		dGet('wtw_alluserstitle').innerHTML = "<div id='wtw_adduserbutton' class='wtw-greenbuttonright' onclick='WTW.addUser();'>Add New</div>" + zfilter;
		WTW.hide('wtw_userinfo');
		WTW.hide('wtw_useradd');
		dGet('wtw_alluserswidth').className = 'wtw-dashboardboxleftfull';
		WTW.show('wtw_userlist');
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-cancelSaveUser=' + ex.message);
	}
}	

WTWJS.prototype.saveNewUser = async function() {
	/* save new user settings */
	try {	
		var zemail = dGet('wtw_tuseruseremail2').value;
		var zdisplayname = dGet('wtw_tuserdisplayname2').value;
		dGet('wtw_errorusersave2').innerHTML = '';
		var zfilter = dGet('wtw_filter').value;
		if (zfilter == '') {
			zfilter = 'All Users';
		}

		if (zemail.length > 2) {
			dGet('wtw_alluserstitle').innerHTML = "<div id='wtw_adduserbutton' class='wtw-greenbuttonright' onclick='WTW.addUser();'>Add New</div>" + zfilter;
			WTW.hide('wtw_userlist');
			WTW.hide('wtw_userinfo');
			WTW.hide('wtw_useradd');
			dGet('wtw_alluserswidth').className = 'wtw-dashboardboxleftfull';
			var zpassword = dGet('wtw_tuseruserpassword2').value;
			var zrequest = {
				'displayname':btoa(zdisplayname),
				'password':btoa(zpassword),
				'useremail':zemail,
				'function':'savenewuser'
			};
			WTW.postAsyncJSON('/core/handlers/users.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					WTW.openAllUsers(zfilter);
				}
			);
		} else {
			dGet('wtw_errorusersave2').innerHTML = 'User Name must be 3 or more characters';
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-saveNewUser=' + ex.message);
	}
}	

WTWJS.prototype.saveUser = async function() {
	/* save (update) user settings */
	try {	
		var zdisplayname = dGet('wtw_tuserdisplayname').value;
		var zuserid = dGet('wtw_tuseruserid').innerText;
		dGet('wtw_errorusersave').innerHTML = '';
		var zfilter = dGet('wtw_filter').value;
		if (zfilter == '') {
			zfilter = 'All Users';
		}
		if (zuserid.length > 2) {
			dGet('wtw_alluserstitle').innerHTML = "<div id='wtw_adduserbutton' class='wtw-greenbuttonright' onclick='WTW.addUser();'>Add New</div>" + zfilter;
			WTW.hide('wtw_userlist');
			WTW.hide('wtw_userinfo');
			WTW.hide('wtw_useradd');
			dGet('wtw_alluserswidth').className = 'wtw-dashboardboxleftfull';
			var zemail = dGet('wtw_tuseruseremail').value;
			var zrequest = {
				'userid':zuserid,
				'displayname':btoa(zdisplayname),
				'useremail':zemail,
				'function':'saveuser'
			};
			WTW.postAsyncJSON('/core/handlers/users.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					WTW.openAllUsers(zfilter);
				}
			);
		} else {
			dGet('wtw_errorusersave').innerHTML = 'User Name must be 3 or more characters';
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-saveUser=' + ex.message);
	}
}	

WTWJS.prototype.deleteUser = async function(zuserid) {
	/* delete user and refresh user list */
	try {	
		if (zuserid != '') {
			var zrequest = {
				'userid':zuserid,
				'function':'deleteuser'
			};
			WTW.postAsyncJSON('/core/handlers/users.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					WTW.openAllUsers(dGet('wtw_filter').value);
				}
			);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-deleteUser=' + ex.message);
	}
}	


/* dev access - provides direct access to a given 3D Community, 3D Building, or 3D Thing */

WTWJS.prototype.openPermissionsForm = async function() {
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
		dGet('wtw_accessnote').innerHTML = 'Dev: updates to 3D ' + zwebtype + '.<br />Admin: Dev and set permissions.';
		dGet('wtw_userdevaccesslist').innerHTML = '';
		WTW.getAsyncJSON('/connect/useraccess.php?communityid=' + communityid + '&buildingid=' + buildingid + '&thingid=' + thingid, 
			function(zresponse) {
				var zuseraccess = JSON.parse(zresponse);
				if (zuseraccess != null) {
					for (var i = 0; i < zuseraccess.length; i++) {
						if (zuseraccess[i] != null) {
							var zdisplayname = zuseraccess[i].displayname;
							if (zdisplayname == '') {
								zdisplayname = zuseraccess[i].email;
							}
							if (zdisplayname == '') {
								zdisplayname = zuseraccess[i].userid;
							}
							dGet('wtw_userdevaccesslist').innerHTML += "<div class='wtw-menulevel0' onclick=\"WTW.toggle('wtw_div-" + zuseraccess[i].userauthorizationid + "');\"><div class='wtw-altkey'>" + zuseraccess[i].useraccess + "</div>" + zdisplayname + "</div><div id='wtw_div-" + zuseraccess[i].userauthorizationid + "' class='wtw-detailprint' style='display:none;visibility:hidden;'>Display Name: " + zuseraccess[i].displayname + "<br /><div id='wtw_bdelete-" + zuseraccess[i].userauthorizationid + "' class='wtw-redbutton' onclick=\"dGet('wtw_tadduserdevaccess').value='" + zuseraccess[i].userid + "';WTW.deleteDevAccess();\" style='margin-left:30px;margin-right:20px;'>Delete</div><div id='wtw_bcancel-" + zuseraccess[i].userauthorizationid + "' class='wtw-yellowbutton' onclick=\"WTW.toggle('wtw_div-" + zuseraccess[i].userauthorizationid + "');\">Cancel</div></div>";
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
		WTW.log('core-scripts-admin-wtw_adminusers.js-openPermissionsForm=' + ex.message);
	}		
}

WTWJS.prototype.updateDevAccessList = function(zresponse) {
	/* update developer access list (work in progress) */
	try {
		var ztotals = '';
		dGet('wtw_useraccesslist').innerHTML = '';
		dGet('wtw_userdevaccesslist').innerHTML = '';
		var zpermissions = JSON.parse(zresponse);
		if (zpermissions != null) {
			if (zpermissions.length > 0) {
				for (var i = 0; i < zpermissions.length; i++) {
					if (zpermissions[i] != null) {
						switch (zpermissions[i].useraccess) {
							case 'admin':
//								dGet('wtw_userdevaccesslist').innerHTML += "<div style='white-space:nowrap;'><div style='float:right;text-align:right;'><input type='checkbox' id='wtw_taccesslevel1-" + zpermissions[i].authorizationid + "' name='taccesslevel1-" + zpermissions[i].authorizationid + "' class='smallprint' value='1' checked='true' onchange=\"WTW.setDevAccessValid('taccesslevel1-" + zpermissions[i].authorizationid + "','taccesslevel2-" + zpermissions[i].authorizationid + "',0);dGet('wtw_tadduserdevaccess').value='" + zpermissions[i].userid + "';WTW.addDevAccess();\" /> Dev &nbsp;&nbsp;&nbsp;<input type='checkbox' id='wtw_taccesslevel2-" + zpermissions[i].authorizationid + "' name='wtw_taccesslevel2-" + zpermissions[i].authorizationid + "' class='smallprint' value='1' checked='true' onchange=\"WTW.setDevAccessValid('taccesslevel1-" + zpermissions[i].authorizationid + "','taccesslevel2-" + zpermissions[i].authorizationid + "',1);dGet('wtw_tadduserdevaccess').value='" + zpermissions[i].userid + "';WTW.addDevAccess();\" /> Admin &nbsp;&nbsp;&nbsp;<input id='wtw_bdeleteauthorization" + zpermissions[i].authorizationid + "' type='button' value='delete' onclick=\"dGet('wtw_tadduserdevaccess').value='" + zpermissions[i].userid + "';WTW.deleteDevAccess();return (false);\" /></div><div><b>" + zpermissions[i].userid + "</b></div></div><br />";
								break;
							case "architect":
//								dGet('wtw_userdevaccesslist').innerHTML += "<div style='white-space:nowrap;'><div style='float:right;text-align:right;'><input type='checkbox' id='wtw_taccesslevel1-" + zpermissions[i].authorizationid + "' name='taccesslevel1-" + zpermissions[i].authorizationid + "' class='smallprint' value='1' checked='true' onchange=\"WTW.setDevAccessValid('taccesslevel1-" + zpermissions[i].authorizationid + "','taccesslevel2-" + zpermissions[i].authorizationid + "',0);dGet('wtw_tadduserdevaccess').value='" + zpermissions[i].userid + "';WTW.addDevAccess();\" /> Dev &nbsp;&nbsp;&nbsp;<input type=\"checkbox\" id='wtw_taccesslevel2-" + zpermissions[i].authorizationid + "' name='wtw_taccesslevel2-" + zpermissions[i].authorizationid + "' class='smallprint' value='1' onchange=\"WTW.setDevAccessValid('taccesslevel1-" + zpermissions[i].authorizationid + "','wtw_taccesslevel2-" + zpermissions[i].authorizationid + "',1);dGet('wtw_tadduserdevaccess').value='" + zpermissions[i].userid + "';WTW.addDevAccess();\" /> Admin &nbsp;&nbsp;&nbsp;<input id='wtw_bdeleteauthorization" + zpermissions[i].authorizationid + "' type='button' value='delete' onclick=\"dGet('wtw_tadduserdevaccess').value='" + zpermissions[i].userid + "';WTW.deleteDevAccess();return (false);\" /></div><div><b>" + zpermissions[i].userid + "</b></div></div><br />";
								break;
							default:
//								dGet('wtw_useraccesslist').innerHTML += "<div style='white-space:nowrap;'><div style='float:right;text-align:right;'><input id='wtw_bdeletebrowseauthorization" + zpermissions[i].authorizationid + "' type='button' value='delete' onclick=\"dGet('wtw_tadduseridname').value='" + zpermissions[i].userid + "';WTW.deleteAccess();return (false);\" /></div><div><b>" + zpermissions[i].userid + "</b></div></div><br />";
								break;
						}
						ztotals = '<hr />Browsers = ' + zpermissions[i].counts.browse + '<br />Invitees = ' + zpermissions[i].counts.invitees + '<br />Neighbors = ' + zpermissions[i].counts.neighbors + '<br />Architects = ' + zpermissions[i].counts.architects + '<br />Administrators = ' + zpermissions[i].counts.admins;
					}
				}
			}
		}
		dGet('wtw_useraccesslist').innerHTML += ztotals;
		dGet('wtw_userdevaccesslist').innerHTML += ztotals;
		WTW.hide('wtw_loadinguserdevaccessform');
		WTW.show('wtw_adminmenu60b');
		WTW.setWindowSize();
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-updateDevAccessList=' + ex.message);
	}		
}

WTWJS.prototype.addAccess = async function() {
	/* add user access to 3D Community, 3D Building, or 3D Thing */
	try {
		var zrequest = {
			'communityid':communityid,
			'buildingid':buildingid,
			'thingid':thingid,
			'useraccess':dGet('wtw_taddnewaccess').value,
			'usersearch':dGet('wtw_tadduseridname').value,
			'function':'savepermissions'
		};
		WTW.postAsyncJSON('/core/handlers/users.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				dGet('wtw_tadduseridname').value = '';
				WTW.openPermissionsForm();
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-addAccess=' + ex.message);
	}		
}

WTWJS.prototype.deleteAccess = async function() {
	/* delete user access to 3D Community, 3D Building, or 3D Thing */
	try {
		var zrequest = {
			'communityid':communityid,
			'buildingid':buildingid,
			'thingid':thingid,
			'usersearch':dGet('wtw_tadduseridname').value,
			'function':'deletepermissions'
		};
		WTW.postAsyncJSON('/core/handlers/users.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.openPermissionsForm();
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-deleteAccess=' + ex.message);
	}		
}




WTWJS.prototype.addDevAccess = async function() {
	try {
		var zrequest = {
			'communityid':communityid,
			'buildingid':buildingid,
			'thingid':thingid,
			'useraccess':dGet('wtw_taddnewaccess').value,
			'usersearch':dGet('wtw_tadduserdevaccess').value,
			'function':'savepermissions'
		};
		WTW.postAsyncJSON('/core/handlers/users.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				dGet('wtw_tadduserdevaccess').value = '';
				WTW.openPermissionsForm();
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-addDevAccess=' + ex.message);
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
		WTW.log('core-scripts-admin-wtw_adminusers.js-setDevAccessValid=' + ex.message);
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
		WTW.log('core-scripts-admin-wtw_adminusers.js-setAccessValid=' + ex.message);
	}		
}

WTWJS.prototype.deleteDevAccess = async function() {
	try {
		var zrequest = {
			'communityid':communityid,
			'buildingid':buildingid,
			'thingid':thingid,
			'usersearch':dGet('wtw_tadduserdevaccess').value,
			'function':'deletepermissions'
		};
		WTW.postAsyncJSON('/core/handlers/users.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				dGet('wtw_tadduserdevaccess').value = '';
				WTW.openPermissionsForm();
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminusers.js-deleteDevAccess=' + ex.message);
	}		
}


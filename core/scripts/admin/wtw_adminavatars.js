/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are used to administer a website in admin mode only */
/* avatars can be created to be Controlled by the user or as an AI */

WTWJS.prototype.setAvatarsListTab = async function(zfilter) {
	/* sets the tabs classes */
	try {
		if (zfilter == undefined) {
			zfilter = 'mine';
		}
		if (zfilter == 'all' && WTW.isUserInRole('admin')) {
			if (dGet('wtw_avatarbuttonmine') != null) {
				dGet('wtw_avatarbuttonmine').className = 'wtw-localbutton wtw-leftradius';
				dGet('wtw_avatarbuttonall').className = 'wtw-localbuttonselected wtw-rightradius';
			}
		} else {
			zfilter = 'mine';
			if (dGet('wtw_avatarbuttonmine') != null) {
				dGet('wtw_avatarbuttonmine').className = 'wtw-localbuttonselected wtw-leftradius';
				dGet('wtw_avatarbuttonall').className = 'wtw-localbutton wtw-rightradius';
			}
		}
		WTW.openSelectAvatar(zfilter);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_admincommunities.js-setAvatarsListTab=' + ex.message);
	} 
}

WTWJS.prototype.openSelectAvatar = function(zfilter) {
	/* open the Select 3D Avatar Form */
	try {
		if (zfilter == undefined) {
			zfilter = 'mine';
		}
		WTW.hide('wtw_listavatars');
		WTW.show('wtw_loadingavatarid');
		var zlistavatars = '';
		if (WTW.isUserInRole('admin') || WTW.isUserInRole('developer') || WTW.isUserInRole('architect') || WTW.isUserInRole('graphic artist')) {
			zlistavatars = "<div class='wtw-localbuttonleftpad'></div><div id='wtw_avatarbuttonmine' class='wtw-localbutton";
			if (zfilter == 'mine') {
				zlistavatars += "selected";
			}
			zlistavatars += " wtw-leftradius' onclick=\"WTW.setAvatarsListTab('mine');\">Mine</div><div class='wtw-localbuttonmiddlepad'> or </div><div id='wtw_avatarbuttonall' class='wtw-localbutton";
			if (zfilter == 'all') {
				zlistavatars += "selected";
			}
			zlistavatars += " wtw-rightradius' onclick=\"WTW.setAvatarsListTab('all');\">All</div><div class='wtw-localbuttonrightpad'></div><div class='wtw-clear'></div><div class='wtw-mainmenuvalue'>Admins and Developer Roles can edit <b>All</b> 3D Avatars on this server.</div><hr /><div class='wtw-clear'></div>\r\n";
		} else {
			zlistavatars = '<br /><br />';
		}
		dGet('wtw_listavatars').innerHTML = zlistavatars;
		WTW.getAsyncJSON('/connect/avatars.php?filter=' + zfilter, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.avatars != null) {
					var zavatargroup = '';
					var zhostid = '';
					var zversioncheck = [];
					for (var i = 0; i < zresponse.avatars.length; i++) {
						if (zresponse.avatars[i] != null) {
							var zversion = '';
							zversioncheck[zversioncheck.length] = {
								'webtype': 'avatar',
								'webname': btoa(zresponse.avatars[i].displayname),
								'webdesc': btoa(zresponse.avatars[i].avatardescription),
								'webimage': zresponse.avatars[i].snapshots.thumbnail,
								'webid': zresponse.avatars[i].avatarid,
								'versionid': zresponse.avatars[i].versionid,
								'version': zresponse.avatars[i].version
							};
							if (zresponse.avatars[i].version != undefined) {
								if (zresponse.avatars[i].version != '') {
									zversion = ' (v' + zresponse.avatars[i].version + ')';
								}
							}
							if (zhostid != zresponse.avatars[i].hostuserid) {
								if (zhostid == '') {
									dGet('wtw_listavatars').innerHTML += "<h2 class='wtw-yellow'>Custom Avatars</h2>";
								} else {
									dGet("wtw_listavatars").innerHTML += "<h2 class='wtw-yellow'>Global Avatars</h2>";
									zavatargroup = '';
								}
								zhostid = zresponse.avatars[i].hostuserid;
							}
							if (zresponse.avatars[i].avatargroup != zavatargroup) {
								dGet('wtw_listavatars').innerHTML += '<h2>' + zresponse.avatars[i].avatargroup + '</h2>';
								zavatargroup = zresponse.avatars[i].avatargroup;
							}
							if (zresponse.avatars[i].avatarid == avatarid) {
								dGet('wtw_listavatars').innerHTML += "<div id='wtw_beditavatar-" + zresponse.avatars[i].avatarid + "' class='wtw-menulevel2' style='background-color:#2C2CAB;'><div style='float:right;color:#afafaf;'>" + zversion + "</div>" + WTW.decode(zresponse.avatars[i].displayname) + "</div>\r\n";
							} else {
								dGet("wtw_listavatars").innerHTML += "<div id='wtw_beditavatar-" + zresponse.avatars[i].avatarid + "' onclick=\"window.location.href='admin.php?avatarid=" + zresponse.avatars[i].avatarid + "';\" class='wtw-menulevel2'><div style='float:right;color:#afafaf;'>" + zversion + "</div>" + WTW.decode(zresponse.avatars[i].displayname) + "</div>\r\n";
							}
						}
					}
					dGet('wtw_listavatars').innerHTML += "<div class='wtw-normalgray'>Total: <b>" + zresponse.avatars.length + "</b> Avatars</div>";
					WTW.pluginsShowListVersionCheck('avatar', zversioncheck);
				}
				window.setTimeout(function() {
					WTW.hide('wtw_loadingavatarid');
					WTW.show('wtw_listavatars');
				},500);
			}
		);		
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-openSelectAvatar=' + ex.message);
	} 
}

WTWJS.prototype.downloadAvatarVersion = function(zobj, zwebid, zupdatewebid, zversionid, zversion, zoldversion, zwebtype) {
	/* download and update avatar by version */
	try {
		if (zobj != null) {
			zobj.innerHTML = 'Updating to (v' + zversion + ')';
			zobj.onclick = function () {};
		}
		var zrequest = {
			'webid': zwebid,
			'updatewebid': zupdatewebid,
			'versionid': zversionid,
			'version': zversion,
			'webtype': zwebtype,
			'function':'downloadupdateavatar'
		};
		WTW.postAsyncJSON('/core/handlers/wtw-3dinternet-downloads.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				zobj.innerHTML = 'Completed (v' + zversion + ')';
				zobj.className = 'wtw-badgebuttoncompleted';
				if (dGet('wtw_beditavatar-' + zwebid) != null) {
					dGet('wtw_beditavatar-' + zwebid).innerHTML = dGet('wtw_beditavatar-' + zwebid).innerHTML.replace(zoldversion,zversion);
				}
				/* update badges */
				WTW.checkForUpdates();
				window.setTimeout(function(){
					if (dGet('wtw_beditavatar_update-' + zwebid) != null) {
						dGet('wtw_beditavatar_update-' + zwebid).remove();
					}
				},5000);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-downloadAvatarVersion=' + ex.message);
	} 
}

WTWJS.prototype.closeSelectAvatar = function() {
	/* close the Select 3D Avatar Form */
	try {
		WTW.hideAdminMenu();
		WTW.hide('wtw_adminSelectAvatarDiv');
		WTW.adminMenuItemSelected(dGet('wtw_bbackwtw_adminSelectAvatarDiv'));
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-closeSelectAvatar=' + ex.message);
	} 
}

WTWJS.prototype.loadAvatarForEdit = function() {
	/* load the 3D Avatar in the 3D Scene for Edit */
	try {
		WTW.myAvatar.position = new BABYLON.Vector3(35, 0, -10);
		WTW.myAvatar.rotation.y = WTW.getRadians(180);
		
		/* get default avatar definition and set name, instance, and position */
		var zavatardef = WTW.newAvatarDef();
		zavatardef.name = 'editavatar-0';
		zavatardef.instanceid = '0';
		zavatardef.start.position.x = 0;
		zavatardef.start.position.z = 0;
		zavatardef.start.rotation.x = 0;
		zavatardef.start.rotation.y = 0;
		zavatardef.start.rotation.z = 0;
		
		WTW.getAsyncJSON('/connect/avatar.php?avatarid=' + avatarid, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.avatar != null) {
					zavatardef.scaling = zresponse.avatar.scaling;
					zavatardef.position = zresponse.avatar.position;
					zavatardef.rotation = zresponse.avatar.rotation;
					zavatardef.objects = zresponse.avatar.objects;
					zavatardef.avatarparts = zresponse.avatar.avatarparts;
					zavatardef.avataranimationdefs = zresponse.avatar.avataranimationdefs;
					var zdisplayname = zresponse.avatar.displayname;
					dGet('wtw_showcommunityname').innerHTML = 'Edit 3D Avatar';
					dGet('wtw_showcommunityname').style.cursor = 'default';
					dGet('wtw_showcommunitynamemobile').innerHTML = 'Edit 3D Avatar';
					dGet('wtw_showcommunitynamemobile').style.cursor = 'default';
					if (zdisplayname == '') {
						dGet('wtw_showbuildingname').innerHTML = '3D Avatar';
						dGet('wtw_showbuildingname').style.cursor = 'default';
						dGet('wtw_showbuildingnamemobile').innerHTML = '3D Avatar';
						dGet('wtw_showbuildingnamemobile').style.cursor = 'default';
					} else {
						dGet('wtw_showbuildingname').innerHTML = zdisplayname;
						dGet('wtw_showbuildingnamemobile').innerHTML = zdisplayname;
						if (WTW.adminView == 1) {
							dGet('wtw_showbuildingname').style.cursor = 'pointer';
							dGet('wtw_showbuildingnamemobile').style.cursor = 'pointer';
						} else {
							dGet('wtw_showbuildingname').style.cursor = 'default';
							dGet('wtw_showbuildingnamemobile').style.cursor = 'default';
						}
					}
					WTW.addAvatarForEdit(zavatardef.name, zavatardef);
				}
			}
		);		
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-loadAvatarForEdit=' + ex.message);
	} 
}

WTWJS.prototype.loadAvatarGroupDDL = function(zddlid, zselectedavatargroup) {
	/* this function loads the Avatar Groups to a Drop Down List */
	try {
		if (zselectedavatargroup == undefined) {
			zselectedavatargroup = '';
		}
		WTW.clearDDL(zddlid);
		var zrequest = {
			'function':'getavatargroups'
		};
		WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				if (zresponse.avatargroups != null) {
					for (var i=0;i < zresponse.avatargroups.length;i++) {
						if (zresponse.avatargroups[i] != null) {
							var zoption = document.createElement('option');
							zoption.text = zresponse.avatargroups[i].avatargroup;
							zoption.value = zresponse.avatargroups[i].avatargroupid;
							if (zresponse.avatargroups[i].avatargroup == zselectedavatargroup) {
								zoption.selected = true;
							}
							dGet(zddlid).add(zoption);
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-loadAvatarGroupDDL=' + ex.message);
	} 
}

WTWJS.prototype.openAddNewAvatar = function() {
	/* open Add New 3D Avatar Form */
	try {
		WTW.disposeClean('editavatar-0');
		dGet('wtw_newavatarfileslist').innerHTML = '';
		communityid = '';
		buildingid = '';
		thingid = '';
		avatarid = WTW.getRandomString(16,1);
		dGet('wtw_teditavatarid').value = avatarid;
		WTW.loadAvatarGroupDDL('wtw_tnewavatargroup', 'Default');
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-openAddNewAvatar=' + ex.message);
	} 
}

WTWJS.prototype.uploadAvatarFile = function() {
	/* upload main 3D Avatar File */
	try {
		if (dGet('wtw_avatarfileupload').value != null) {
			dGet('wtw_adminnewavatarupload').onclick = '';
			dGet('wtw_adminnewavatarupload').innerHTML = "<span style='color:gray;'>Uploading File...</span>";
			return new Promise(function () {
				avatarid = dGet('wtw_teditavatarid').value;
				var zform1 = document.createElement('form');
				var Httpreq = new XMLHttpRequest();
				var zformdata = new FormData(zform1);
				zformdata.append('wtw_uploadfile', dGet('wtw_avatarfileupload').files[0], dGet('wtw_avatarfileupload').files[0].name);
				zformdata.append('action', 'POST');
				zformdata.append('avatarid', avatarid);
				zformdata.append('objectfolder', '/content/uploads/avatars/' + avatarid + '/');
				zformdata.append('function', 'uploadavatarfile');
				Httpreq.open('POST', '/core/handlers/avatars.php');
				Httpreq.onreadystatechange = function () {
					if (Httpreq.readyState == 4 && Httpreq.status == '200') {
						try {
							var zresponse = JSON.parse(Httpreq.responseText);
						} catch (ex) {}
						dGet('wtw_avatarfileupload').value = null;
						dGet('wtw_newavatarfilesfolder').innerHTML = zresponse.objectfolder;
						dGet('wtw_newavatarfilesfile').innerHTML = zresponse.objectfile;
						WTW.hide('wtw_newavataruploadbutton');
						WTW.show('wtw_newavataruploadfolder');
						dGet('wtw_adminnewavatarupload').onclick = function() {
							dGet('wtw_avatarfileupload').click();
						};
						dGet('wtw_adminnewavatarupload').innerHTML = 'Upload Main Avatar File';
					}
				};
				Httpreq.send(zformdata);  
			});
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-uploadAvatarFile=' + ex.message);
	} 
}

WTWJS.prototype.loadNewAvatarFilesForm = function() {
	/* load new 3D Avatar Files Form */
	try {
		dGet('wtw_taddnewavatarerror').innerHTML = '';
		var zrequest = {
			'avatarid':dGet('wtw_teditavatarid').value,
			'displayname':dGet('wtw_tnewavatarname').value,
			'avatardescription':dGet('wtw_tnewavatardescription').value,
			'gender':dGet('wtw_tnewavatargender').value,
			'avatargroup':WTW.getDDLText('wtw_tnewavatargroup'),
			'objectfolder':dGet('wtw_newavatarfilesfolder').innerHTML,
			'objectfile':dGet('wtw_newavatarfilesfile').innerHTML,
			'startframe':dGet('wtw_tnewavatarstartframe').value,
			'endframe':dGet('wtw_tnewavatarendframe').value,
			'function':'savenewavatar'
		};
		WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				if (zresponse.serror != '') {
					dGet('wtw_taddnewavatarerror').innerHTML = zresponse.serror;
				} else {
					WTW.hide('wtw_newavatardiv');
					dGet('wtw_newavatarfileslist').innerHTML = '';
					dGet('wtw_tavatarfolderdisplay').value = 'wtw_newavatarfilelist';
					WTW.openEditAvatarFiles('', dGet('wtw_tavatarfolderdisplay').value);
				}
			}
		);		
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-loadNewAvatarFilesForm=' + ex.message);
	} 
}

WTWJS.prototype.loadNewAvatar = function() {
	/* load new 3D Avatar */
	try {
		window.location.href = '/admin.php?avatarid=' + avatarid + '&edit=1';
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-loadNewAvatar=' + ex.message);
	} 
}

WTWJS.prototype.copyMyAvatar = function() {
	/* copy 3D Avatar */
	try {
		var zrequest = {
			'avatarid': avatarid,
			'function':'copyavatarprofile'
		};
		WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				if (zresponse.avatarid != '') {
					WTW.redirectParent('/admin.php?avatarid=' + zresponse.avatarid);
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-copyMyAvatar=' + ex.message);
	} 
}

WTWJS.prototype.deleteAvatar = function() {
	/* delete 3D Avatar */
	try {
		/* delete 3D Thing */
		/* note that the 3D Thing is flagged as deleted in the database and no data is actually deleted */
		var zrequest = {
			'avatarid': avatarid,
			'function':'deleteavatarprofile'
		};
		WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.redirectParent('/admin.php');
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-deleteAvatar=' + ex.message);
	} 
}

WTWJS.prototype.openShareAvatarForm = function() {
	/* open share 3D Avatar */
	try {
		WTW.hide('wtw_shareavatardiv');
		WTW.show('wtw_loadingshareavatarform');
		WTW.getAsyncJSON('/connect/avatar.php?avatarid=' + avatarid, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.avatar != null) {
					var ztempname = 'My Avatar';
					var zdescripton = '';
					var ztags = '';
					var zsnapshot = '';
					var zversionid = avatarid;
					var zversion = '1.0.0';
					var zversiondesc = 'Initial Version';
					var zcreateuserid = '';
					if (zresponse.avatar.share.templatename != undefined) {
						if (zresponse.avatar.share.templatename != '') {
							ztempname = zresponse.avatar.share.templatename;
						}
					}
					if (ztempname == 'My Avatar') {
						if (zresponse.avatar.displayname != undefined) {
							if (zresponse.avatar.displayname != '') {
								ztempname = zresponse.avatar.displayname;
							}
						}
					}
					if (zresponse.avatar.share.description != undefined) {
						if (zresponse.avatar.share.description != '') {
							zdescripton = zresponse.avatar.share.description;
						}
					}
					if (zdescripton == '') {
						if (zresponse.avatar.avatardescription != undefined) {
							if (zresponse.avatar.avatardescription != '') {
								zdescripton = zresponse.avatar.avatardescription;
							}
						}
					}
					if (zresponse.avatar.share.tags != undefined) {
						if (zresponse.avatar.share.tags != '') {
							ztags = zresponse.avatar.share.tags;
						}
					}
					if (zresponse.avatar.snapshots.thumbnail != undefined) {
						if (zresponse.avatar.snapshots.thumbnail != '') {
							zsnapshot = zresponse.avatar.snapshots.thumbnail;
						}
					}
					if (zresponse.avatar.versionid != undefined) {
						if (zresponse.avatar.versionid != '') {
							zversionid = zresponse.avatar.versionid;
						}
					}
					if (zresponse.avatar.version != undefined) {
						if (zresponse.avatar.version != '') {
							zversion = zresponse.avatar.version;
						}
					}
					if (zresponse.avatar.versiondesc != undefined) {
						if (zresponse.avatar.versiondesc != '') {
							zversiondesc = zresponse.avatar.versiondesc;
						}
					}
					if (zresponse.avatar.createuserid != undefined) {
						if (zresponse.avatar.createuserid != '') {
							zcreateuserid = zresponse.avatar.createuserid;
						}
					}

					dGet('wtw_teditavatarid').value = zresponse.avatar.avatarid;
					dGet('wtw_tavatarfolder').value = '/content/uploads/avatars/' + dGet('wtw_teditavatarid').value + '/';
					dGet('wtw_tshareavatartempname').value = ztempname;
					dGet('wtw_tshareavatardescription').value = zdescripton;
					dGet('wtw_tshareavatartags').value = ztags;
					dGet('wtw_tshareversion').value = zversion;
					dGet('wtw_tshareversiondesc').value = zversiondesc;
					dGet('wtw_tshareoriginal').checked = true;
					dGet('wtw_tshareversion').disabled = true;
					dGet('wtw_tshareversiondesc').disabled = true;
					dGet('wtw_tshareoriginal').onchange = function() { WTW.changeAvatarVersion(zversion, zversiondesc);};
					dGet('wtw_tshareupdate').onchange = function() { WTW.changeAvatarVersion(zversion, zversiondesc);};
					if (dGet('wtw_tuserid').value == zcreateuserid && zcreateuserid != '') {
						dGet('wtw_tshareupdate').disabled = false;
					} else {
						dGet('wtw_tshareupdate').disabled = true;
					}
					dGet('wtw_defaultavatarsnapshot').src = zsnapshot;
					if (zsnapshot != '') {
						WTW.show('wtw_defaultavatarsnapshot');
					} else {
						WTW.hide('wtw_defaultavatarsnapshot');
					}
					WTW.hide('wtw_loadingshareavatarform');
					WTW.show('wtw_shareavatardiv');
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-openShareAvatarForm=' + ex.message);
	} 
}

WTWJS.prototype.changeAvatarVersion = function(zversion, zversiondesc) {
	/* change when initial share or update share is selected on Share 3D Avatar Form */
	try {
		if (dGet('wtw_tshareoriginal').checked == true) {
			dGet('wtw_tshareversion').value = '1.0.0';
			dGet('wtw_tshareversiondesc').value = 'Initial Version';
			dGet('wtw_tshareversion').disabled = true;
			dGet('wtw_tshareversiondesc').disabled = true;
		} else {
			dGet('wtw_tshareversion').disabled = false;
			dGet('wtw_tshareversiondesc').disabled = false;
			dGet('wtw_tshareversion').value = zversion;
			dGet('wtw_tshareversiondesc').value = zversiondesc;
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-changeAvatarVersion=' + ex.message);
	} 
}

WTWJS.prototype.openEditAvatar = function() {
	/* open the 3D Avatar information for Edit */
	try {
		WTW.getAsyncJSON('/connect/avatar.php?avatarid=' + avatarid, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.avatar != null) {
					dGet('wtw_tinfoavatarversion').disabled = false;
					dGet('wtw_teditavatarid').value = zresponse.avatar.avatarid;
					dGet('wtw_tinfoavatarname').value = zresponse.avatar.displayname;
					dGet('wtw_tinfoavatarversion').value = zresponse.avatar.version;
					dGet('wtw_tinfoavatardescription').value = zresponse.avatar.avatardescription;
					dGet('wtw_tinfoavatargender').value = zresponse.avatar.gender;
					WTW.loadAvatarGroupDDL('wtw_tinfoavatargroup', zresponse.avatar.avatargroup);
					var zavatargroupslist = "<div style='text-align:left;margin-left:15px;color:gray;'>";
					if (zresponse.avatar.avatargroupsall != undefined) {
						for (var i=0;i<zresponse.avatar.avatargroupsall.length;i++) {
							if (zresponse.avatar.avatargroupsall[i] != null) {
								var zchecked = '';
								if (zresponse.avatar.avatargroupsall[i].avatarsingroupid != '') {
									zchecked = 'checked';
								}
								zavatargroupslist += "<div><input type='checkbox' id='wtw_tinfoavatargroups-" + zresponse.avatar.avatargroupsall[i].avatargroupid + "-" + zresponse.avatar.avatargroupsall[i].avatarsingroupid + "' " + zchecked + " value='1' class='wtw-avatargroups' /> " + zresponse.avatar.avatargroupsall[i].avatargroup + "</div><div class='wtw-clear'></div>";
							}
						}
					}
					zavatargroupslist += "</div>";
					dGet('wtw_tinfoavatargroups').innerHTML = zavatargroupslist;
					dGet('wtw_tinfoavatarversion').disabled = true;
					WTW.show('wtw_adminEditAvatarInformationDiv');
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-openEditAvatar=' + ex.message);
	} 
}

WTWJS.prototype.saveEditAvatar = function() {
	/* save the 3D Avatar information */
	try {
		var zavatarid = dGet('wtw_teditavatarid').value;
		dGet('wtw_tinfoavatarerror').innerHTML = '';
		var zrequest = {
			'avatarid':zavatarid,
			'displayname':dGet('wtw_tinfoavatarname').value,
			'avatardescription':dGet('wtw_tinfoavatardescription').value,
			'gender':dGet('wtw_tinfoavatargender').value,
			'avatargroup':WTW.getDDLText('wtw_tinfoavatargroup'),
			'function':'saveavatarinformation'
		};
		WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				if (zresponse.serror != '') {
					dGet('wtw_tinfoavatarerror').innerHTML = zresponse.serror;
				} else {
					WTW.adminMenuItemSelected(dGet('wtw_bbackwtw_adminEditAvatarInformationDiv'));
				}
			}
		);
		/* process additional avatar groups checkboxes */
		var zobjs = document.getElementsByClassName('wtw-avatargroups');
		for (var i=0;i<zobjs.length;i++) {
			if (zobjs[i] != null) {
				var zavatargroupid = '';
				var zavatarsingroupid = '';
				var zfunction = '';
				if (zobjs[i].id.indexOf('-') > -1) {
					var znameparts = zobjs[i].id.split('-');
					zavatargroupid = znameparts[1];
					zavatarsingroupid = znameparts[2];
				}
				if (zobjs[i].checked) {
					zfunction = 'saveavatarsingroup';
				} else if (zobjs[i].checked == false && zavatarsingroupid != '') {
					zfunction = 'deleteavatarsingroup';
				}
				if (zfunction != '') {
					var zrequest = {
						'avatarid':zavatarid,
						'avatargroupid':zavatargroupid,
						'avatarsingroupid':zavatarsingroupid,
						'function':zfunction
					};
					WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
						function(zresponse) {
							zresponse = JSON.parse(zresponse);
							/* note serror would contain errors */
						}
					);
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-saveEditAvatar=' + ex.message);
	} 
}

WTWJS.prototype.openEditAvatarFiles = function(zsubfolder, zdisplaydiv) {
	/* open the 3D Avatar Files for Edit */
	try {
		if (zsubfolder == undefined) {
			zsubfolder = '';
		}
		if (zdisplaydiv == undefined) {
			zdisplaydiv = 'wtw_adminEditAvatarFilesDiv';
		}
		if (zsubfolder == '') {
			dGet('wtw_tavatarsubfolder').value = '';
		} else {
			dGet('wtw_tavatarsubfolder').value = zsubfolder + '/';
		}
		WTW.getAsyncJSON('/connect/avatar.php?avatarid=' + avatarid, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.avatar != null) {
					if (zresponse.avatar.objects != undefined) {
						dGet('wtw_teditavatarid').value = zresponse.avatar.avatarid;
						dGet('wtw_avatarfilesfolder').innerHTML = zresponse.avatar.objects.folder;
						dGet('wtw_avatarfilesfile').innerHTML = zresponse.avatar.objects.file;
					}
					WTW.getFileList(zresponse.avatar.objects.folder + dGet('wtw_tavatarsubfolder').value, WTW.displayAvatarFiles);
					WTW.show(zdisplaydiv);
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-openEditAvatarFiles=' + ex.message);
	} 
}

WTWJS.prototype.uploadAvatarFiles = function() {
	/* upload 3D Avatar files using form post */
	try {
		if (dGet('wtw_avatarfilesupload').value != null) {
			dGet('wtw_avataruploadbutton').onclick = '';
			dGet('wtw_avataruploadbutton').innerHTML = "<span style='color:gray;'>Uploading Files...</span>";
			
			if (dGet('wtw_teditavatarid').value == '') {
				dGet('wtw_teditavatarid').value = avatarid;
			}
			var zform1 = document.createElement('form');
			var Httpreq = new XMLHttpRequest();
			var zformdata = new FormData(zform1);
			for (var i=0;i < dGet('wtw_avatarfilesupload').files.length;i++) {
				zformdata.append('wtw_uploadfiles[]', dGet('wtw_avatarfilesupload').files[i], dGet('wtw_avatarfilesupload').files[i].name);
			}
			zformdata.append('action', 'POST');
			zformdata.append('objectfolder', dGet('wtw_avatarfilesfolder').innerHTML + dGet('wtw_tavatarsubfolder').value);
			zformdata.append('avatarid', dGet('wtw_teditavatarid').value);
			zformdata.append('function', 'uploadavatarfiles');
			Httpreq.open('POST', '/core/handlers/avatars.php');
			Httpreq.onreadystatechange = function () {
				if (Httpreq.readyState == 4 && Httpreq.status == '200') {
					var zresponse = JSON.parse(Httpreq.responseText);
					dGet('wtw_avatarfilesupload').value = null;
					WTW.openEditAvatarFiles(dGet('wtw_tavatarsubfolder').value.replace('/',''), dGet('wtw_tavatarfolderdisplay').value);
					dGet('wtw_avataruploadbutton').onclick = function(){
						dGet('wtw_avatarfilesupload').click();
					};
					dGet('wtw_avataruploadbutton').innerHTML = 'Upload or Replace File(s)';
				}
			};
			Httpreq.send(zformdata);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-uploadAvatarFiles=' + ex.message);
	}
}

WTWJS.prototype.displayAvatarFiles = function(zresponse) {
	/* display the 3D Avatar Files for Edit */
	try {
		var zsubfolder = dGet('wtw_tavatarsubfolder').value;
		if (dGet('wtw_tavatarfolderdisplay').value == 'wtw_newavatarfilelist') {
			dGet('wtw_newavatarfileslist').innerHTML = '';
		} else {
			dGet('wtw_avatarfileslist').innerHTML = '';
		}
		if (zresponse != null) {
			var zfilesdiv = '';
			if (zsubfolder == '') {
				zfilesdiv += "<div id='wtw_avatarfoldermain' class='wtw-greenbuttonnarrow' style='text-align:center;cursor:pointer;margin:5px;'>Main</div>";
			} else {
				zfilesdiv += "<div id='wtw_avatarfoldermain' class='wtw-yellowbutton' style='text-align:center;cursor:pointer;margin:5px;' onclick=\"WTW.openEditAvatarFiles('','" + dGet('wtw_tavatarfolderdisplay').value + "');\">Main</div>";
			}
			if (zsubfolder == 'textures/') {
				zfilesdiv += "<div id='wtw_avatarfoldertextures' class='wtw-greenbuttonnarrow' style='text-align:center;cursor:pointer;margin:5px;'>Textures</div>";
			} else {
				zfilesdiv += "<div id='wtw_avatarfoldertextures' class='wtw-yellowbutton' style='text-align:center;cursor:pointer;margin:5px;' onclick=\"WTW.openEditAvatarFiles('textures','" + dGet('wtw_tavatarfolderdisplay').value + "');\">Textures</div>";
			}
			if (zsubfolder == 'animations/') {
				zfilesdiv += "<div id='wtw_avatarfolderanimations' class='wtw-greenbuttonnarrow' style='text-align:center;cursor:pointer;margin:5px;'>Animations</div>";
			} else {
				zfilesdiv += "<div id='wtw_avatarfolderanimations' class='wtw-yellowbutton' style='text-align:center;cursor:pointer;margin:5px;' onclick=\"WTW.openEditAvatarFiles('animations','" + dGet('wtw_tavatarfolderdisplay').value + "');\">Animations</div>";
			}
			zfilesdiv += "<div class='wtw-clear'></div>\r\n";

			zfilesdiv += "<div id='wtw_avataruploadbutton' class='wtw-greenbutton' style='width:318px;' onclick=\"dGet('wtw_avatarfilesupload').click();\">Upload or Replace File(s)</div>";

			zfilesdiv += "<div id='wtw_avatardeletefile' class='wtw-redbutton' style='width:120px;display:none;visibility:hidden;text-align:center;margin-right:5px;cursor:pointer;' onclick='WTW.deleteAvatarObjectFile();'>Delete File</div>";
			zfilesdiv += "<div id='wtw_avatarcanceldelete' class='wtw-yellowbutton' style='width:100px;display:none;visibility:hidden;text-align:center;cursor:pointer;' onclick=\"dGet('wtw_tavatardeletefile').value='';WTW.hide('wtw_avatardeletefile');WTW.hide('wtw_avatarcanceldelete');WTW.show('wtw_avataruploadbutton');\">Cancel</div>";

			zfilesdiv += "<div class='wtw-filelistdiv'><input type='hidden' id='wtw_tavatardeletefile' />";
			var zbgcolor = '#ffffff';
			for (var i=0;i < zresponse.length;i++) {
				if (zresponse[i] != null) {
					if (zresponse[i].file != undefined) {
						if (zresponse[i].file != 'snapshots' && zresponse[i].file != 'textures' && zresponse[i].file != 'animations') {
							var zfolder = atob(zresponse[i].folder) + zresponse[i].file;
							zfilesdiv += "<div class='wtw-filelist' style='background-color:" + zbgcolor + ";margin-bottom:8px;'><img src='/content/system/images/close2.png' alt='Delete' title='Delete' style='float:right;width:24px;height:auto;margin-right:5px;cursor:pointer;' onclick=\"WTW.confirmDeleteAvatarFile('" + zresponse[i].file + "');\"><div class='wtw-download' style='margin:5px;' onclick=\"WTW.downloadFile('" + zfolder + "', '" + zresponse[i].file + "');\">" + zresponse[i].file + "</div></div>";
							if (zbgcolor == '#ffffff') {
								zbgcolor = '#eeeeee';
							} else {
								zbgcolor = '#ffffff';
							}
						}
					}
				}
			}
			zfilesdiv += '</div>';
			
			if (dGet('wtw_tavatarfolderdisplay').value == 'wtw_newavatarfilelist') {
				dGet('wtw_newavatarfileslist').innerHTML = zfilesdiv;
			} else {
				dGet('wtw_avatarfileslist').innerHTML = zfilesdiv;
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-displayAvatarFiles=' + ex.message);
	} 
}

WTWJS.prototype.confirmDeleteAvatarFile = function(zfile) {
	/* confirm delete the 3D Avatar File */
	try {
		dGet('wtw_tavatardeletefile').value = zfile;
		WTW.hide('wtw_avataruploadbutton');
		WTW.showInline('wtw_avatardeletefile');
		WTW.showInline('wtw_avatarcanceldelete');
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-confirmDeleteAvatarFile=' + ex.message);
	} 
}

WTWJS.prototype.deleteAvatarObjectFile = async function() {
	/* delete a 3D Avatar file */
	try {
		var zrequest = {
			'filename': dGet('wtw_tavatardeletefile').value,
			'objectfolder': dGet('wtw_avatarfilesfolder').innerHTML + dGet('wtw_tavatarsubfolder').value,
			'function':'deleteavatarfile'
		};
		WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				WTW.hide('wtw_avatardeletefile');
				WTW.hide('wtw_avatarcanceldelete');
				WTW.openEditAvatarFiles(dGet('wtw_tavatarsubfolder').value.replace('/',''), dGet('wtw_tavatarfolderdisplay').value);
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-deleteAvatarObjectFile=' + ex.message);
	}
}

WTWJS.prototype.openEditAvatarScaling = function() {
	/* open the 3D Avatar Scaling for Edit */
	try {
		WTW.getAsyncJSON('/connect/avatar.php?avatarid=' + avatarid, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.avatar != null) {
					dGet('wtw_teditavatarid').value = zresponse.avatar.avatarid;
					if (zresponse.avatar.position != undefined) {
						dGet('wtw_tavatarpositionx').value = zresponse.avatar.position.x;
						dGet('wtw_tavatarpositiony').value = zresponse.avatar.position.y;
						dGet('wtw_tavatarpositionz').value = zresponse.avatar.position.z;
					}
					if (zresponse.avatar.scaling != undefined) {
						dGet('wtw_tavatarscalingx').value = zresponse.avatar.scaling.x;
						dGet('wtw_tavatarscalingy').value = zresponse.avatar.scaling.y;
						dGet('wtw_tavatarscalingz').value = zresponse.avatar.scaling.z;
					}
					if (zresponse.avatar.rotation != undefined) {
						dGet('wtw_tavatarrotationx').value = zresponse.avatar.rotation.x;
						dGet('wtw_tavatarrotationy').value = zresponse.avatar.rotation.y;
						dGet('wtw_tavatarrotationz').value = zresponse.avatar.rotation.z;
					}
					WTW.show('wtw_adminEditAvatarScalingDiv');
					
					var zmoldname = 'avatarscale-0--0--babylonfile';
					var zmolddef = WTW.newMold();
					zmolddef.moldname = zmoldname;
					zmolddef.shape = 'babylonfile';
					zmolddef.objects.folder = '/content/system/babylon/scale/';
					zmolddef.objects.file = 'scale.babylon';
					zmolddef.checkcollisions = '0';
					zmolddef.ispickable = '0';
					zmolddef.parentname = WTW.mainParent;
					var zmold = WTW.addMold(zmoldname, zmolddef, WTW.mainParent, 'none');
					zmold.rotation.y = WTW.getRadians(-90);
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-openEditAvatarScaling=' + ex.message);
	} 
}

WTWJS.prototype.saveAvatarScaling = function() {
	/* save the 3D Avatar Scaling */
	try {
		WTW.disposeClean('avatarscale-0--0--babylonfile');
		dGet('wtw_tscalingavatarerror').innerHTML = '';
		var zrequest = {
			'avatarid':dGet('wtw_teditavatarid').value,
			'positionx':dGet('wtw_tavatarpositionx').value,
			'positiony':dGet('wtw_tavatarpositiony').value,
			'positionz':dGet('wtw_tavatarpositionz').value,
			'scalingx':dGet('wtw_tavatarscalingx').value,
			'scalingy':dGet('wtw_tavatarscalingy').value,
			'scalingz':dGet('wtw_tavatarscalingz').value,
			'rotationx':dGet('wtw_tavatarrotationx').value,
			'rotationy':dGet('wtw_tavatarrotationy').value,
			'rotationz':dGet('wtw_tavatarrotationz').value,
			'function':'saveavatarscaling'
		};
		WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				if (zresponse.serror != '') {
					dGet('wtw_tscalingavatarerror').innerHTML = zresponse.serror;
				} else {
					WTW.adminMenuItemSelected(dGet('wtw_bbackwtw_adminEditAvatarScalingDiv'));
				}
			}
		);		
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-saveAvatarScaling=' + ex.message);
	} 
}

WTWJS.prototype.openAvatarColorByMold = function(zmold) {
	/* open the avatar color form and select the mold to edit (activated from right mouse click on avatar part) */
	try {
		var zselectedavatarpart = zmold.name.split('-')[2];
		WTW.hideAdminMenu();
		WTW.openEditAvatarColors(zselectedavatarpart);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-openAvatarColorByMold=' + ex.message);
	}
}
		
WTWJS.prototype.openEditAvatarColors = function(zselectedavatarpart) {
	/* open the 3D Avatar Colors for Edit */
	try {
		if (zselectedavatarpart == undefined) {
			zselectedavatarpart = '';
		}
		dGet('wtw_avatarpartslist').innerHTML = '';
		WTW.getAsyncJSON('/connect/avatar.php?avatarid=' + avatarid, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.avatar != null) {
					var zselectedavatarpartid = '';
					var zavatarpartslist = '';
					dGet('wtw_teditavatarid').value = zresponse.avatar.avatarid;
					if (zresponse.avatar.avatarparts != undefined) {
						for (var i=0;i < zresponse.avatar.avatarparts.length;i++) {
							if (zresponse.avatar.avatarparts[i] != null) {
								var zavatarpart = zresponse.avatar.avatarparts[i];
								if (zselectedavatarpart.toLowerCase() == zavatarpart.avatarpart.toLowerCase()) {
									zselectedavatarpartid = zavatarpart.avatarpartid;
								}
								zavatarpartslist += "<div id='wtw_beditavatarpart-" + zavatarpart.avatarpartid + "' onclick=\"WTW.openEditAvatarPart('" + zavatarpart.avatarpartid + "');\" class='wtw-menulevel2'>" + zavatarpart.avatarpart + "</div>\r\n";
								zavatarpartslist += "<div id='wtw_beditavatarpartdiv-" + zavatarpart.avatarpartid + "' class='wtw-colorlist' style='display:none;visibility:hidden;'>\r\n";

								zavatarpartslist += "<div class='wtw-clear'></div><br />\r\n";
								zavatarpartslist += "<div class='wtw-colorlistitem'><input type='text' id='wtw_tavataremissivecolor-" + zavatarpart.avatarpartid + "' maxlength='16' class='wtw-colorlistvalue wtw-smallprintinput' value='" + zavatarpart.emissivecolor + "'  onfocus=\"WTW.openAvatarColorSelector('" + zavatarpart.avatarpartid + "', '" + zavatarpart.avatarpart + "');\" onblur=\"WTW.closeAvatarColorSelector(false);WTW.setAvatarColorByText('" + zavatarpart.avatarpartid + "', '" + zavatarpart.avatarpart + "');\"/>Emissive Color</div>\r\n";

								zavatarpartslist += "<div class='wtw-clear'></div><br />\r\n";
								zavatarpartslist += "<div class='wtw-colorlistitem'><input type='text' id='wtw_tavatardiffusecolor-" + zavatarpart.avatarpartid + "' maxlength='16' class='wtw-colorlistvalue wtw-smallprintinput' value='" + zavatarpart.diffusecolor + "' onfocus=\"WTW.openAvatarColorSelector('" + zavatarpart.avatarpartid + "', '" + zavatarpart.avatarpart + "');\" onblur=\"WTW.closeAvatarColorSelector(false);WTW.setAvatarColorByText('" + zavatarpart.avatarpartid + "', '" + zavatarpart.avatarpart + "');\" />Diffuse Color</div>\r\n";

								zavatarpartslist += "<div class='wtw-clear'></div><br />\r\n";
								zavatarpartslist += "<div class='wtw-colorlistitem'><input type='text' id='wtw_tavatarspecularcolor-" + zavatarpart.avatarpartid + "' maxlength='16' class='wtw-colorlistvalue wtw-smallprintinput' value='" + zavatarpart.specularcolor + "' onfocus=\"WTW.openAvatarColorSelector('" + zavatarpart.avatarpartid + "', '" + zavatarpart.avatarpart + "');\" onblur=\"WTW.closeAvatarColorSelector(false);WTW.setAvatarColorByText('" + zavatarpart.avatarpartid + "', '" + zavatarpart.avatarpart + "');\" />Specular Color</div>\r\n";

								zavatarpartslist += "<div class='wtw-clear'></div><br />\r\n";
								zavatarpartslist += "<div class='wtw-colorlistitem'><input type='text' id='wtw_tavatarambientcolor-" + zavatarpart.avatarpartid + "' maxlength='16' class='wtw-colorlistvalue wtw-smallprintinput' value='" + zavatarpart.ambientcolor + "' onfocus=\"WTW.openAvatarColorSelector('" + zavatarpart.avatarpartid + "', '" + zavatarpart.avatarpart + "');\" onblur=\"WTW.closeAvatarColorSelector(false);WTW.setAvatarColorByText('" + zavatarpart.avatarpartid + "', '" + zavatarpart.avatarpart + "');\" />Ambient Color</div>\r\n";

								zavatarpartslist += "<div class='wtw-clear'></div><br />\r\n";
								zavatarpartslist += "<input type='hidden' id='wtw_tavatarpart-" + zavatarpart.avatarpartid + "'  value='" + zavatarpart.avatarpart + "'/>\r\n";

								zavatarpartslist += "<div class='wtw-clear'></div>\r\n";
								zavatarpartslist += '</div>\r\n';
							}
						}
						zavatarpartslist += "<br /><div id='wtw_adminavatarsavecolors' class='wtw-greenbuttonbig' onclick='WTW.saveAvatarColors();'>Save Avatar Colors</div>\r\n";
					}
					dGet('wtw_avatarpartslist').innerHTML = zavatarpartslist;
					WTW.show('wtw_adminEditAvatarColorsDiv');
					if (zselectedavatarpartid != '') {
						WTW.openEditAvatarPart(zselectedavatarpartid);
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-openEditAvatarColors=' + ex.message);
	} 
}

WTWJS.prototype.openEditAvatarPart = function(zavatarpartid) {
	/* open the 3D Avatar Part for Edit (Colors) */
	try {
		if (dGet('wtw_beditavatarpartdiv-' + zavatarpartid).style.display != 'none') {
			WTW.hide('wtw_beditavatarpartdiv-' + zavatarpartid);
			WTW.closeAvatarColorSelector();
		} else {
			var zcolorlists = document.getElementsByClassName('wtw-colorlist');
			for (var i=0;i < zcolorlists.length;i++) {
				WTW.hide(zcolorlists[i].id);
			}
			WTW.show('wtw_beditavatarpartdiv-' + zavatarpartid);
			WTW.openAvatarColorSelector(zavatarpartid, dGet('wtw_tavatarpart-' + zavatarpartid).value);
			WTW.hilightMoldFast('editavatar-0-' + dGet('wtw_tavatarpart-' + zavatarpartid).value, 'green');
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-openEditAvatarPart=' + ex.message);
	} 
}

WTWJS.prototype.openAvatarColorSelector = function(zavatarpartid, zavatarpart) {
	/* when form uses color as a texture, the color wheels are opened and set to the current color settings */
	/* typical colors are a combination of emissive, diffuse, and specular color settings */
	try {
		var zmoldname = 'editavatar-0-' + zavatarpart;
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
			var zmoldnameparts = WTW.getMoldnameParts(zmoldname);

			if (WTW.guiAdminColors != null) {
				WTW.guiAdminColors.dispose();
				WTW.guiAdminColors = null;
			}
			WTW.guiAdminColors = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
			var zpanel = new BABYLON.GUI.StackPanel();
			zpanel.width = '300px';
			zpanel.isVertical = true;
			zpanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
			zpanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
			WTW.guiAdminColors.addControl(zpanel);

			var zcoloremissivetitle = new BABYLON.GUI.TextBlock();
			zcoloremissivetitle.text = 'Emissive Color';
			zcoloremissivetitle.color = '#FFFFFF';
			zcoloremissivetitle.fontSize = 20;
			zcoloremissivetitle.height = '50px';
			zpanel.addControl(zcoloremissivetitle);     

			var zcoloremissive = new BABYLON.GUI.ColorPicker();
			zcoloremissive.value = zmold.material.emissiveColor;
			zcoloremissive.height = '150px';
			zcoloremissive.width = '150px';
			zcoloremissive.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
			zcoloremissive.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
			zcoloremissive.onValueChangedObservable.add(function(value) {
				if (value != null) {
					WTW.setAvatarColor(zavatarpart, zavatarpartid, 'emissive', value.r, value.g, value.b);
				}
			});
			zpanel.addControl(zcoloremissive); 

			var zcolordiffusetitle = new BABYLON.GUI.TextBlock();
			zcolordiffusetitle.text = 'Diffuse Color';
			zcolordiffusetitle.color = '#FFFFFF';
			zcolordiffusetitle.fontSize = 20;
			zcolordiffusetitle.height = '50px';
			zpanel.addControl(zcolordiffusetitle);     

			var zcolordiffuse = new BABYLON.GUI.ColorPicker();
			zcolordiffuse.value = zmold.material.diffuseColor;
			zcolordiffuse.height = '150px';
			zcolordiffuse.width = '150px';
			zcolordiffuse.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
			zcolordiffuse.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
			zcolordiffuse.onValueChangedObservable.add(function(value) {
				if (value != null) {
					WTW.setAvatarColor(zavatarpart, zavatarpartid, 'diffuse', value.r, value.g, value.b);
				}
			});
			zpanel.addControl(zcolordiffuse); 

			var zcolorspeculartitle = new BABYLON.GUI.TextBlock();
			zcolorspeculartitle.text = 'Specular Color';
			zcolorspeculartitle.color = '#FFFFFF';
			zcolorspeculartitle.fontSize = 20;
			zcolorspeculartitle.height = '50px';
			zpanel.addControl(zcolorspeculartitle);     

			var zcolorspecular = new BABYLON.GUI.ColorPicker();
			zcolorspecular.value = zmold.material.specularColor;
			zcolorspecular.height = '150px';
			zcolorspecular.width = '150px';
			zcolorspecular.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
			zcolorspecular.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
			zcolorspecular.onValueChangedObservable.add(function(value) {
				if (value != null) {
					WTW.setAvatarColor(zavatarpart, zavatarpartid, 'specular', value.r, value.g, value.b);
				}
			});
			zpanel.addControl(zcolorspecular); 

			var zcolorambienttitle = new BABYLON.GUI.TextBlock();
			zcolorambienttitle.text = 'Ambient Color';
			zcolorambienttitle.color = '#FFFFFF';
			zcolorambienttitle.fontSize = 20;
			zcolorambienttitle.height = '50px';
			zpanel.addControl(zcolorambienttitle);     

			var zcolorambient = new BABYLON.GUI.ColorPicker();
			zcolorambient.value = zmold.material.ambientColor;
			zcolorambient.height = '150px';
			zcolorambient.width = '150px';
			zcolorambient.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
			zcolorambient.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
			zcolorambient.onValueChangedObservable.add(function(value) {
				if (value != null) {
					WTW.setAvatarColor(zavatarpart, zavatarpartid, 'ambient', value.r, value.g, value.b);
				}
			});
			zpanel.addControl(zcolorambient); 
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-openAvatarColorSelector=' + ex.message);
	}
}

WTWJS.prototype.setAvatarColor = function(zavatarpart, zavatarpartid, zcolorgroup, zr, zg, zb) {
	/* set color after change is made on the color wheels */
	try {
		var zmoldname = 'editavatar-0-' + zavatarpart;
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
			var zcovering = zmold.material;
			if (zcovering != null) {
				switch (zcolorgroup) {
					case 'diffuse':
						zcovering.diffuseColor = new BABYLON.Color3(zr,zg,zb);
						zcovering.specularColor = new BABYLON.Color3.FromHexString(dGet('wtw_tavatarspecularcolor-' + zavatarpartid).value);
						zcovering.emissiveColor = new BABYLON.Color3.FromHexString(dGet('wtw_tavataremissivecolor-' + zavatarpartid).value);
						zcovering.ambientColor = new BABYLON.Color3.FromHexString(dGet('wtw_tavatarambientcolor-' + zavatarpartid).value);
						break;
					case 'specular':
						zcovering.specularColor = new BABYLON.Color3(zr,zg,zb);
						zcovering.emissiveColor = new BABYLON.Color3.FromHexString(dGet('wtw_tavataremissivecolor-' + zavatarpartid).value);
						zcovering.diffuseColor = new BABYLON.Color3.FromHexString(dGet('wtw_tavatardiffusecolor-' + zavatarpartid).value);
						zcovering.ambientColor = new BABYLON.Color3.FromHexString(dGet('wtw_tavatarambientcolor-' + zavatarpartid).value);
						break;
					case 'emissive':
						zcovering.emissiveColor = new BABYLON.Color3(zr,zg,zb);
						zcovering.specularColor = new BABYLON.Color3.FromHexString(dGet('wtw_tavatarspecularcolor-' + zavatarpartid).value);
						zcovering.diffuseColor = new BABYLON.Color3.FromHexString(dGet('wtw_tavatardiffusecolor-' + zavatarpartid).value);
						zcovering.ambientColor = new BABYLON.Color3.FromHexString(dGet('wtw_tavatarambientcolor-' + zavatarpartid).value);
						break;
					case 'ambient':
						zcovering.ambientColor = new BABYLON.Color3(zr,zg,zb);
						zcovering.specularColor = new BABYLON.Color3.FromHexString(dGet('wtw_tavatarspecularcolor-' + zavatarpartid).value);
						zcovering.emissiveColor = new BABYLON.Color3.FromHexString(dGet('wtw_tavataremissivecolor-' + zavatarpartid).value);
						zcovering.diffuseColor = new BABYLON.Color3.FromHexString(dGet('wtw_tavatardiffusecolor-' + zavatarpartid).value);
						break;
				}
				zmold.material.dispose();
				zmold.material = zcovering;
				switch (zcolorgroup) {
					case 'diffuse':
						var zdiffusecolor = zcovering.diffuseColor.toHexString().toLowerCase();
						dGet('wtw_tavatardiffusecolor-' + zavatarpartid).value = zdiffusecolor;
						break;
					case 'specular':
						var zspecularcolor = zcovering.specularColor.toHexString().toLowerCase();
						dGet('wtw_tavatarspecularcolor-' + zavatarpartid).value = zspecularcolor;
						break;
					case 'emissive':
						var zemissivecolor = zcovering.emissiveColor.toHexString().toLowerCase();
						dGet('wtw_tavataremissivecolor-' + zavatarpartid).value = zemissivecolor;
						break;
					case 'ambient':
						var zambientcolor = zcovering.ambientColor.toHexString().toLowerCase();
						dGet('wtw_tavatarambientcolor-' + zavatarpartid).value = zambientcolor;
						break;
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-setAvatarColor=' + ex.message);
	}
}

WTWJS.prototype.setAvatarColorByText = function(zavatarpartid, zavatarpart) {
	/* set the mold color by text box */
	try {
		var zmoldname = 'editavatar-0-' + zavatarpart;
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
			var zcovering = zmold.material;
			if (zcovering != null) {
				if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(dGet('wtw_tavatardiffusecolor-' + zavatarpartid).value)) {
					zcovering.diffuseColor = new BABYLON.Color3.FromHexString(dGet('wtw_tavatardiffusecolor-' + zavatarpartid).value);
				} else {
					zcovering.diffuseColor = new BABYLON.Color3.FromHexString('#ffffff');
				}
				if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(dGet('wtw_tavatarspecularcolor-' + zavatarpartid).value)) {
					zcovering.specularColor = new BABYLON.Color3.FromHexString(dGet('wtw_tavatarspecularcolor-' + zavatarpartid).value);
				} else {
					zcovering.specularColor = new BABYLON.Color3.FromHexString('#000000');
				}
				if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(dGet('wtw_tavataremissivecolor-' + zavatarpartid).value)) {
					zcovering.emissiveColor = new BABYLON.Color3.FromHexString(dGet('wtw_tavataremissivecolor-' + zavatarpartid).value);
				} else {
					zcovering.emissiveColor = new BABYLON.Color3.FromHexString('#000000');
				}
				if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(dGet('wtw_tavatarambientcolor-' + zavatarpartid).value)) {
					zcovering.ambientColor = new BABYLON.Color3.FromHexString(dGet('wtw_tavatarambientcolor-' + zavatarpartid).value);
				} else {
					zcovering.ambientColor = new BABYLON.Color3.FromHexString('#ffffff');
				}
				zmold.material.dispose();
				zmold.material = zcovering;
				WTW.openAvatarColorSelector(zavatarpartid, dGet('wtw_tavatarpart-' + zavatarpartid).value);
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-setAvatarColorByText=' + ex.message);
	}
}

WTWJS.prototype.closeAvatarColorSelector = function(zcloseovercanvas) {
	/* close and dispose color selector after use */
	try {
		if (zcloseovercanvas == undefined) {
			zcloseovercanvas = true;
		}
		if ((zcloseovercanvas == false && WTW.guiAdminColors != null && WTW.canvasFocus == 0) || (zcloseovercanvas && WTW.guiAdminColors != null)) {
			WTW.guiAdminColors.dispose();
			WTW.guiAdminColors = null;
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-closeAvatarColorSelector=' + ex.message);
	}
}

WTWJS.prototype.saveAvatarColors = function() {
	/* save the 3D Avatar Colors for Edit */
	try {
		dGet('wtw_tcoloravatarerror').innerHTML = '';
		var zcolorlists = document.getElementsByClassName('wtw-colorlist');
		for (var i=0;i < zcolorlists.length;i++) {
			if (zcolorlists[i].id.indexOf('-') > -1) {
				var zavatarpartid = zcolorlists[i].id.split('-')[1];
				var zrequest = {
					'avatarid':dGet('wtw_teditavatarid').value,
					'avatarpartid':zavatarpartid,
					'avatarpart':dGet('wtw_tavatarpart-' + zavatarpartid).value,
					'diffusecolor':dGet('wtw_tavatardiffusecolor-' + zavatarpartid).value,
					'specularcolor':dGet('wtw_tavatarspecularcolor-' + zavatarpartid).value,
					'emissivecolor':dGet('wtw_tavataremissivecolor-' + zavatarpartid).value,
					'ambientcolor':dGet('wtw_tavatarambientcolor-' + zavatarpartid).value,
					'function':'saveavatardefinitioncolor'
				};
				WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						if (zresponse.serror != '' && dGet('wtw_tcoloravatarerror').innerHTML == '') {
							dGet('wtw_tcoloravatarerror').innerHTML = zresponse.serror;
						}
						if (dGet('wtw_tcoloravatarerror').innerHTML == '') {
							WTW.adminMenuItemSelected(dGet('wtw_bbackwtw_adminEditAvatarColorsDiv'));
							WTW.closeAvatarColorSelector();
						}
					}
				);
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-saveAvatarColors=' + ex.message);
	} 
}

WTWJS.prototype.openEditAvatarAnimations = function(zselectedanimation) {
	/* open the 3D Avatar Animations for Edit */
	try {
		if (zselectedanimation == undefined) {
			zselectedanimation = '';
		}
		dGet('wtw_avataranimationslist').innerHTML = '';
		WTW.getAsyncJSON('/connect/avatar.php?avatarid=' + avatarid, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse.avatar != null) {
					dGet('wtw_tavatarfolder').value = zresponse.avatar.objects.folder;
					dGet('wtw_tavatarsubfolder').value = 'animations/';
					var zselectedavataranimationid = '';
					var zavataranimationslist = '';
					dGet('wtw_teditavatarid').value = zresponse.avatar.avatarid;
					if (zresponse.avatar.avataranimationdefs != undefined) {
						for (var i=0;i < zresponse.avatar.avataranimationdefs.length;i++) {
							if (zresponse.avatar.avataranimationdefs[i] != null) {
								var zavataranimation = zresponse.avatar.avataranimationdefs[i];
								if (zselectedanimation.toLowerCase() == zavataranimation.animationevent.toLowerCase()) {
									zselectedavataranimationid = zavataranimation.avataranimationid;
								}
								zavataranimationslist += "<div id='wtw_beditavataranim-" + zavataranimation.avataranimationid + "' onclick=\"WTW.openEditAvatarAnimation('" + zavataranimation.avataranimationid + "');\" class='wtw-menulevel2'>" + zavataranimation.animationevent;
								if (zavataranimation.animationevent == 'onoption') {
									zavataranimationslist += " - " + zavataranimation.animationfriendlyname;
								}
								zavataranimationslist += "</div>\r\n";
								zavataranimationslist += "<div id='wtw_beditavataranimdiv-" + zavataranimation.avataranimationid + "' class='wtw-animlist' style='display:none;visibility:hidden;'>\r\n";

								zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
								zavataranimationslist += "<div class='wtw-animlistitem'>Friendly Name<br /><input type='text' id='wtw_tavataranimfriendlyname-" + zavataranimation.avataranimationid + "' maxlength='255' class='wtw-animlistvalue wtw-smallprintinput' value=\"" + zavataranimation.animationfriendlyname + "\" onfocus='' onblur='' style='width:250px;max-width:250px;' /></div>\r\n";

								zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
								zavataranimationslist += "<div class='wtw-animlistitem'>Folder<br /><input type='text' id='wtw_tavataranimobjectfolder-" + zavataranimation.avataranimationid + "' maxlength='255' class='wtw-smallprintinput' value='" + zavataranimation.objectfolder + "' onfocus='' onblur='' style='width:250px;max-width:250px;' /></div>\r\n";

								zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
								zavataranimationslist += "<div class='wtw-animlistitem'>Main Animation File<br />";
								zavataranimationslist += "<input type='hidden' id='wtw_tavataranimobjectfiledefault-" + zavataranimation.avataranimationid + "' value='" + zavataranimation.objectfile + "' />";
								zavataranimationslist += "<div class='wtw-yellowbuttonright' onclick=\"dGet('wtw_avatarfilesupload2').click();\">Add</div>";
								zavataranimationslist += "<select id='wtw_tavataranimobjectfile-" + zavataranimation.avataranimationid + "' class='wtw-smallprintinput'></select></div>\r\n";

								if (zavataranimation.animationevent != 'onwait') {
									/* onwait plays when other animations are not being tested - so there is no need for the test button */
									zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
									zavataranimationslist += "<br /><div id='wtw_adminavatartestanimation-" + zavataranimation.avataranimationid + "' class='wtw-greenbutton' onmousedown=\"WTW.testAnimation('" + zavataranimation.avataranimationid + "', '" + zavataranimation.animationevent + "');\" onmouseup=\"WTW.testAnimationStop('" + zavataranimation.avataranimationid + "', '" + zavataranimation.animationevent + "');\" style='font-size:1.4em;'>test Animation</div>\r\n";
								}
								
								zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
								zavataranimationslist += "<div class='wtw-animlistitem'>Animation Icon (optional)<br /><input type='text' id='wtw_tavataranimanimationicon-" + zavataranimation.avataranimationid + "' maxlength='255' class='wtw-smallprintinput' value='" + zavataranimation.animationicon + "' onfocus='' onblur='' style='width:250px;max-width:250px;' /></div>\r\n";

								zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
								zavataranimationslist += "<div class='wtw-animlistitem'><input type='text' id='wtw_tavataranimstartframe-" + zavataranimation.avataranimationid + "' maxlength='10' class='wtw-animlistvalue wtw-smallprintinput' value='" + zavataranimation.startframe + "' onfocus='' onblur='' />Start Frame</div>\r\n";

								zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
								zavataranimationslist += "<div class='wtw-animlistitem'><input type='text' id='wtw_tavataranimendframe-" + zavataranimation.avataranimationid + "' maxlength='10' class='wtw-animlistvalue wtw-smallprintinput' value='" + zavataranimation.endframe + "' onfocus='' onblur='' />End Frame</div>\r\n";

								zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
								zavataranimationslist += "<div class='wtw-animlistitem'><input type='text' id='wtw_tavataranimspeedratio-" + zavataranimation.avataranimationid + "' maxlength='10' class='wtw-animlistvalue wtw-smallprintinput' value='" + zavataranimation.speedratio + "' onfocus='' onblur='' />Speed Ratio</div>\r\n";

								zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
								zavataranimationslist += "<input type='hidden' id='wtw_tavataranimevent-" + zavataranimation.avataranimationid + "'  value='" + zavataranimation.animationevent + "'/>\r\n";

								zavataranimationslist += "<input type='hidden' id='wtw_tavataranimloadpriority-" + zavataranimation.avataranimationid + "'  value='" + zavataranimation.loadpriority + "'/>\r\n";
								zavataranimationslist += "<div class='wtw-clear'></div>\r\n";

								zavataranimationslist += "<div id='wtw_adminavatardeleteanimation-" + zavataranimation.avataranimationid + "' class='wtw-redbuttonleft' onclick=\"WTW.deleteAvatarAnimationDefinition('" + zavataranimation.avataranimationid + "');\" style='font-size:1.4em;'>Delete</div>\r\n";
								zavataranimationslist += "<div id='wtw_adminavatarsaveanimation-" + zavataranimation.avataranimationid + "' class='wtw-greenbuttonright' onclick=\"WTW.saveAvatarAnimationDefinition('" + zavataranimation.avataranimationid + "');\" style='font-size:1.4em;'>Save</div>\r\n";
								zavataranimationslist += "<div class='wtw-yellowbuttonright' onclick=\"WTW.openEditAvatarAnimation('" + zavataranimation.avataranimationid + "');\" style='font-size:1.4em;'>Cancel</div>";
								zavataranimationslist += "<div class='wtw-clear'></div>\r\n";

								zavataranimationslist += "</div>\r\n";
							}
						}

						zavataranimationslist += "<div id='wtw_beditavataranim' class='wtw-animlist' style='display:none;visibility:hidden;' >\r\n";

						zavataranimationslist += "<h2 style='text-align:center;'>Add New Animation</h2>\r\n";
						zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
						zavataranimationslist += "<div class='wtw-animlistitem'>Animation Event<br /><select id='wtw_tavataranimevent' class='wtw-smallprintinput'></select></div>\r\n";

						zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
						zavataranimationslist += "<div class='wtw-animlistitem'>Friendly Name<br /><input type='text' id='wtw_tavataranimfriendlyname' maxlength='255' class='wtw-smallprintinput' style='width:250px;max-width:250px;' /></div>\r\n";

						zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
						zavataranimationslist += "<div class='wtw-animlistitem'>Folder<br /><input type='text' id='wtw_tavataranimobjectfolder' maxlength='255' class='wtw-smallprintinput' style='width:250px;max-width:250px;' /></div>\r\n";

						zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
						zavataranimationslist += "<div class='wtw-animlistitem'>Main Animation File<br />";
						zavataranimationslist += "<div class='wtw-yellowbuttonright' onclick=\"dGet('wtw_avatarfilesupload2').click();\">Add</div>";
						zavataranimationslist += "<select id='wtw_tavataranimobjectfile' class='wtw-smallprintinput'></select></div>\r\n";

						zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
						zavataranimationslist += "<div class='wtw-animlistitem'>Animation Icon (optional)<br /><input type='text' id='wtw_tavataranimanimationicon' maxlength='255' class='wtw-smallprintinput' style='width:250px;max-width:250px;' /></div>\r\n";

						zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
						zavataranimationslist += "<div class='wtw-animlistitem'><input type='text' id='wtw_tavataranimstartframe' maxlength='10' class='wtw-animlistvalue wtw-smallprintinput' />Start Frame</div>\r\n";

						zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
						zavataranimationslist += "<div class='wtw-animlistitem'><input type='text' id='wtw_tavataranimendframe' maxlength='10' class='wtw-animlistvalue wtw-smallprintinput' />End Frame</div>\r\n";

						zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
						zavataranimationslist += "<div class='wtw-animlistitem'><input type='text' id='wtw_tavataranimspeedratio' maxlength='10' class='wtw-animlistvalue wtw-smallprintinput' />Speed Ratio</div>\r\n";

						zavataranimationslist += "<div class='wtw-clear'></div><br />\r\n";
						zavataranimationslist += "<br /><div id='wtw_adminavatarsaveanimations' class='wtw-greenbuttonbig' onclick='WTW.saveAvatarAnimationDefinition();'>Save New Animation</div><br />\r\n";
						zavataranimationslist += "<div style='text-align:center;'><div class='wtw-yellowbutton' onclick='WTW.cancelAddNewAnimation();' >Cancel</div></div>";
						zavataranimationslist += "</div>\r\n";
						
						zavataranimationslist += "<br /><div class='wtw-yellow' style='font-weight:bold;'>Total Animations: " + zresponse.avatar.avataranimationdefs.length + "</div><br />\r\n";
						zavataranimationslist += "<br /><div id='wtw_adminavataraddnewanimation' class='wtw-greenbuttonbig' onclick='WTW.addNewAvatarAnimation();'>Add New Animation</div>\r\n";
					}
					dGet('wtw_avataranimationslist').innerHTML = zavataranimationslist;
					WTW.show('wtw_adminEditAvatarAnimationsDiv');
					if (zselectedavataranimationid != '') {
//						WTW.openEditAvatarAnimation(zselectedavataranimationid);
					}
				}
			}
		);		
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-openEditAvatarAnimations=' + ex.message);
	} 
}

WTWJS.prototype.openEditAvatarAnimation = function(zanimationid) {
	/* open Avatar Animation div for edit */
	try {
		if (dGet('wtw_beditavataranimdiv-' + zanimationid).style.display != 'none') {
			WTW.hide('wtw_beditavataranimdiv-' + zanimationid);
			WTW.show('wtw_adminavataraddnewanimation');
		} else {
			var zanimlist = document.getElementsByClassName('wtw-animlist');
			for (var i=0;i < zanimlist.length;i++) {
				WTW.hide(zanimlist[i].id);
			}
			WTW.hide('wtw_adminavataraddnewanimation');
			dGet('wtw_tavataranimationid').value = zanimationid;
			WTW.getFileList(dGet('wtw_tavatarfolder').value + dGet('wtw_tavatarsubfolder').value, WTW.loadAvatarFilesDDL);
			WTW.show('wtw_beditavataranimdiv-' + zanimationid);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-openEditAvatarAnimation=' + ex.message);
	} 
}

WTWJS.prototype.deleteAvatarAnimationDefinition = function(zanimationid) {
	/* delete Avatar Animation */
	try {
		var zrequest = {
			'avatarid': avatarid,
			'avataranimationid': dGet('wtw_tavataranimationid').value,
			'function':'deleteavatardefinitionanimation'
		};
		WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				if (zresponse.serror != '' && dGet('wtw_tanimationsavatarerror').innerHTML == '') {
					dGet('wtw_tanimationsavatarerror').innerHTML = zresponse.serror;
				}
				if (dGet('wtw_tanimationsavatarerror').innerHTML == '') {
					WTW.openEditAvatarAnimations();
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-deleteAvatarAnimationDefinition=' + ex.message);
	} 
}

WTWJS.prototype.addNewAvatarAnimation = function() {
	/* open add new Avatar Animation form */
	try {
		dGet('wtw_tavataranimationid').value = '';
		dGet('wtw_tavataranimfriendlyname').value = '';
		dGet('wtw_tavataranimobjectfolder').value = dGet('wtw_tavatarfolder').value + dGet('wtw_tavatarsubfolder').value;
		dGet('wtw_tavataranimanimationicon').value = '';
		dGet('wtw_tavataranimstartframe').value = '1';
		dGet('wtw_tavataranimendframe').value = '1';
		dGet('wtw_tavataranimspeedratio').value = '1.00';
		WTW.loadAvatarAnimationEvents('wtw_tavataranimevent','');
		WTW.getFileList(dGet('wtw_tavatarfolder').value + dGet('wtw_tavatarsubfolder').value, WTW.loadAvatarFilesDDL);
		WTW.hide('wtw_adminavataraddnewanimation');
		WTW.hide('wtw_cancelavataranimationsform');
		WTW.show('wtw_beditavataranim');
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-addNewAvatarAnimation=' + ex.message);
	} 
}

WTWJS.prototype.cancelAddNewAnimation = function() {
	/* cancel and close add new Avatar Animation form */
	try {
		WTW.hide('wtw_beditavataranim');
		WTW.show('wtw_adminavataraddnewanimation');
		WTW.showInline('wtw_cancelavataranimationsform');
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-cancelAddNewAnimation=' + ex.message);
	} 
}

WTWJS.prototype.testAnimation = function(zanimationid, zanimationevent) {
	/* test animation on avatar */
	try {
		var zeditavatar = WTW.getMeshOrNodeByID('editavatar-0');
		if (zeditavatar != null) {
			if (WTW.avatarTimer == null) {
				if (zanimationevent == 'onoption') {
					zanimationevent += zanimationid;
				}
				var zincrement = .1;
				WTW.avatarTimer = window.setInterval(function() {
					if (zeditavatar.WTW.animations.running[zanimationevent] != undefined && zeditavatar.WTW.animations.running['onwait'] != undefined) {
						if (zeditavatar.WTW.animations.running[zanimationevent].weight < 1) {
							zeditavatar.WTW.animations.running[zanimationevent].weight += zincrement;
							zeditavatar.WTW.animations.running['onwait'].weight = 1 - zeditavatar.WTW.animations.running[zanimationevent].weight;
						} else {
							zeditavatar.WTW.animations.running[zanimationevent].weight = 1;
							zeditavatar.WTW.animations.running['onwait'].weight = 0;
							window.clearInterval(WTW.avatarTimer);
							WTW.avatarTimer = null;
						}
					}
				},20);
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-testAnimation=' + ex.message);
	} 
}

WTWJS.prototype.testAnimationStop = function(zanimationid, zanimationevent) {
	/* stop test animation on avatar and return to wait */
	try {
		var zeditavatar = WTW.getMeshOrNodeByID('editavatar-0');
		if (zeditavatar != null) {
			if (WTW.avatarTimer != null) {
				window.clearInterval(WTW.avatarTimer);
				WTW.avatarTimer = null;
			}
			if (zanimationevent == 'onoption') {
				zanimationevent += zanimationid;
			}
			var zincrement = .1;
			WTW.avatarTimer = window.setInterval(function() {
				if (zeditavatar.WTW.animations.running[zanimationevent] != undefined && zeditavatar.WTW.animations.running['onwait'] != undefined) {
					if (zeditavatar.WTW.animations.running[zanimationevent].weight > 0) {
						zeditavatar.WTW.animations.running[zanimationevent].weight -= zincrement;
						zeditavatar.WTW.animations.running['onwait'].weight = 1 - zeditavatar.WTW.animations.running[zanimationevent].weight;
					} else {
						window.clearInterval(WTW.avatarTimer);
						for(var zevent in zeditavatar.WTW.animations.running) {
							if (zeditavatar.WTW.animations.running[zevent] != undefined) {
								if (zevent == 'onwait') {
									zeditavatar.WTW.animations.running['onwait'].weight = 1;
								} else {
									zeditavatar.WTW.animations.running[zevent].weight = 0;
								}
							}
						}
						WTW.avatarTimer = null;
					}
				}
			},20);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-testAnimationStop=' + ex.message);
	} 
}

WTWJS.prototype.loadAvatarAnimationEvents = function(zddlid, zdefault) {
	/* load Avatar Animation events to a dropdown list */
	try {
		if (zdefault == undefined) {
			zdefault = '';
		}
		WTW.clearDDL(zddlid);
		var zrequest = {
			'function':'getavataranimationevents'
		};
		WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				if (zresponse.animationevents != null) {
					for (var i=0;i < zresponse.animationevents.length;i++) {
						if (zresponse.animationevents[i] != null) {
							/* see if event is already listed */
							var zfoundevent = false;
							/* you can have more than one onoption animation loaded */
							if (zresponse.animationevents[i].animationevent != 'onoption') {
								var zanimlist = document.getElementsByClassName('wtw-animlist');
								for (var j=0;j < zanimlist.length;j++) {
									if (zanimlist[j] != null) {
										try {
											var zanimid = zanimlist[j].id.split('-')[1];
											if (dGet('wtw_beditavataranim-' + zanimid) != null) {
												var zanimevent = dGet('wtw_beditavataranim-' + zanimid).innerHTML;
												if (zanimevent == zresponse.animationevents[i].animationevent) {
													zfoundevent = true;
												}
											}
										} catch (ex) {}
									}
								}
							}
							if (!zfoundevent) {
								var zoption = document.createElement('option');
								zoption.text = zresponse.animationevents[i].animationevent;
								zoption.value = zresponse.animationevents[i].animationeventid + '|' + zresponse.animationevents[i].loadpriority;
								if (zresponse.animationevents[i].animationevent == zdefault) {
									zoption.selected = true;
								}
								dGet(zddlid).add(zoption);
							}
						}
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-loadAvatarAnimationEvents=' + ex.message);
	} 
}

WTWJS.prototype.loadAvatarFilesDDL = function(zresponse) {
	/* load animation files drop down list */
	try {
		var zddlid = 'wtw_tavataranimobjectfile';
		var zdefault = '';
		if (dGet('wtw_tavataranimationid').value != '') {
			zddlid = 'wtw_tavataranimobjectfile-' + dGet('wtw_tavataranimationid').value;
			if (dGet('wtw_tavataranimobjectfiledefault-' + dGet('wtw_tavataranimationid').value) != null) {
				zdefault = dGet('wtw_tavataranimobjectfiledefault-' + dGet('wtw_tavataranimationid').value).value;
			}
		}
		WTW.clearDDL(zddlid);
		if (zresponse != null) {
			for (var i=0;i < zresponse.length;i++) {
				if (zresponse[i] != null) {
					if (zresponse[i].file != undefined) {
						if ((zresponse[i].file.indexOf('.babylon') > -1 || zresponse[i].file.indexOf('.obj') > -1 || zresponse[i].file.indexOf('.gltf') > -1 || zresponse[i].file.indexOf('.glb') > -1) && zresponse[i].file.indexOf('.manifest') == -1) {
							if (dGet(zddlid) != null) {
								var zoption = document.createElement('option');
								zoption.text = zresponse[i].file;
								zoption.value = zresponse[i].file;
								if (zresponse[i].file == zdefault) {
									zoption.selected = true;
								}
								dGet(zddlid).add(zoption);
							}
						}
					}
				}
			}
		}
		/* set dropdown default to newly uploaded babylon file if it exists */
		if (dGet('wtw_avatarfilesupload2').value != null && zdefault == '') {
			for (var i=0;i < dGet('wtw_avatarfilesupload2').files.length;i++) {
				if (dGet('wtw_avatarfilesupload2').files[i] != null) {
					if (dGet('wtw_avatarfilesupload2').files[i].name.indexOf('.babylon') > -1 && dGet('wtw_avatarfilesupload2').files[i].name.indexOf('.babylon.manifest') == -1) {
						WTW.setDDLText(zddlid, dGet('wtw_avatarfilesupload2').files[i].name);
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-loadAvatarFilesDDL=' + ex.message);
	} 
}

WTWJS.prototype.uploadQuickAvatarFiles = function() {
	/* upload 3D Avatar files using form post */
	try {
		if (dGet('wtw_avatarfilesupload2').value != null) {
			if (dGet('wtw_teditavatarid').value == '') {
				dGet('wtw_teditavatarid').value = avatarid;
			}
			var zform1 = document.createElement('form');
			var Httpreq = new XMLHttpRequest();
			var zformdata = new FormData(zform1);
			for (var i=0;i < dGet('wtw_avatarfilesupload2').files.length;i++) {
				zformdata.append('wtw_uploadfiles[]', dGet('wtw_avatarfilesupload2').files[i], dGet('wtw_avatarfilesupload2').files[i].name);
			}
			zformdata.append('action', 'POST');
			zformdata.append('objectfolder', dGet('wtw_tavataranimobjectfolder').value);
			zformdata.append('avatarid', dGet('wtw_teditavatarid').value);
			zformdata.append('function', 'uploadavatarfiles');
			Httpreq.open('POST', '/core/handlers/avatars.php');
			Httpreq.onreadystatechange = function () {
				if (Httpreq.readyState == 4 && Httpreq.status == '200') {
					var zresponse = JSON.parse(Httpreq.responseText);
					dGet('wtw_avatarfilesupload').value = null;
					WTW.getFileList(dGet('wtw_tavatarfolder').value + dGet('wtw_tavatarsubfolder').value, WTW.loadAvatarFilesDDL);
				}
			};
			Httpreq.send(zformdata);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-uploadQuickAvatarFiles=' + ex.message);
	}
}

WTWJS.prototype.saveAvatarAnimationDefinition = function(zavataranimationid) {
	/* save Avatar Animation definition */
	try {
		var zddlvalue = '';
		var zanimationevent = '';
		var zloadpriority = 0;
		var zanimationfriendlyname = '';
		var zanimationicon = '';
		var zobjectfolder = dGet('wtw_tavatarfolder').value + dGet('wtw_tavatarsubfolder').value;
		var zobjectfile = '';
		var zstartframe = '1';
		var zendframe = '1';
		var zspeedratio = '1';
		if (zavataranimationid == undefined) {
			zavataranimationid = WTW.getRandomString(16,1);
			zddlvalue = WTW.getDDLValue('wtw_tavataranimevent');
			zanimationevent = WTW.getDDLText('wtw_tavataranimevent');
			zanimationfriendlyname = dGet('wtw_tavataranimfriendlyname').value;
			zanimationicon = dGet('wtw_tavataranimanimationicon').value;
			zobjectfolder = dGet('wtw_tavataranimobjectfolder').value;
			zobjectfile = WTW.getDDLText('wtw_tavataranimobjectfile');
			zstartframe = dGet('wtw_tavataranimstartframe').value;
			zendframe = dGet('wtw_tavataranimendframe').value;
			zspeedratio = dGet('wtw_tavataranimspeedratio').value;
			if (zddlvalue.indexOf('|') > -1) {
				zloadpriority = zddlvalue.split('|')[1];
				if (WTW.isNumeric(zloadpriority) == false) {
					zloadpriority = 0;
				}
			}
		} else {
			zanimationevent = dGet('wtw_tavataranimevent-' + zavataranimationid).value;
			zloadpriority = dGet('wtw_tavataranimloadpriority-' + zavataranimationid).value;
			zanimationfriendlyname = dGet('wtw_tavataranimfriendlyname-' + zavataranimationid).value;
			zanimationicon = dGet('wtw_tavataranimanimationicon-' + zavataranimationid).value;
			zobjectfolder = dGet('wtw_tavataranimobjectfolder-' + zavataranimationid).value;
			zobjectfile = WTW.getDDLText('wtw_tavataranimobjectfile-' + zavataranimationid);
			zstartframe = dGet('wtw_tavataranimstartframe-' + zavataranimationid).value;
			zendframe = dGet('wtw_tavataranimendframe-' + zavataranimationid).value;
			zspeedratio = dGet('wtw_tavataranimspeedratio-' + zavataranimationid).value;
		}
		
		/* load or replace the animation on the avatar */
		WTW.loadAvatarAnimation('editavatar-0', zavataranimationid, zanimationfriendlyname, zanimationicon, zavataranimationid, zanimationevent, zobjectfolder, zobjectfile, zstartframe, zendframe, zspeedratio, 0, zloadpriority);
		
		if (zanimationevent == 'onwait' && zobjectfolder.indexOf('animations/') == -1) {
			/* onwait animation is part of the main avatar file and needs to update the avatars table */
			var zrequest = {
				'avatarid': avatarid,
				'startframe': zstartframe,
				'endframe': zendframe,
				'function':'saveavatardefinitionrootanimation'
			};
			WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					if (zresponse.serror != '' && dGet('wtw_tanimationsavatarerror').innerHTML == '') {
						dGet('wtw_tanimationsavatarerror').innerHTML = zresponse.serror;
					}
					if (dGet('wtw_tanimationsavatarerror').innerHTML == '') {
						WTW.openEditAvatarAnimations();
					}
				}
			);
		} else {
			/* save the animation */
			var zrequest = {
				'avatarid': avatarid,
				'avataranimationid': zavataranimationid,
				'loadpriority': zloadpriority,
				'animationevent': zanimationevent,
				'animationfriendlyname': zanimationfriendlyname,
				'animationicon': zanimationicon,
				'objectfolder': zobjectfolder,
				'objectfile': zobjectfile,
				'startframe': zstartframe,
				'endframe': zendframe,
				'speedratio': zspeedratio,
				'function':'saveavatardefinitionanimation'
			};
			WTW.postAsyncJSON('/core/handlers/avatars.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					if (zresponse.serror != '' && dGet('wtw_tanimationsavatarerror').innerHTML == '') {
						dGet('wtw_tanimationsavatarerror').innerHTML = zresponse.serror;
					}
					if (dGet('wtw_tanimationsavatarerror').innerHTML == '') {
						WTW.openEditAvatarAnimations();
					}
				}
			);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-saveAvatarAnimationDefinition=' + ex.message);
	} 
}

WTWJS.prototype.setNewAvatar = function() {
	/* Update Scene with Avatar Edit Changes */
	try {
		var editavatar = WTW.getMeshOrNodeByID('editavatar-0');
		if (editavatar != null) {
			var editavatarscale = WTW.getMeshOrNodeByID('editavatar-0-scale');
			if (editavatarscale != null) {
				/* adjust scaling */
				if (WTW.isNumeric(dGet('wtw_tavatarscalingx').value)) {
					editavatarscale.scaling.x = Number(dGet('wtw_tavatarscalingx').value);
				}
				if (WTW.isNumeric(dGet('wtw_tavatarscalingy').value)) {
					editavatarscale.scaling.y = Number(dGet('wtw_tavatarscalingy').value);
				}
				if (WTW.isNumeric(dGet('wtw_tavatarscalingz').value)) {
					editavatarscale.scaling.z = Number(dGet('wtw_tavatarscalingz').value);
				}
				/* adjust rotation */
				if (WTW.isNumeric(dGet('wtw_tavatarrotationx').value)) {
					editavatarscale.rotation.x = WTW.getRadians(Number(dGet('wtw_tavatarrotationx').value));
				}
				if (WTW.isNumeric(dGet('wtw_tavatarrotationy').value)) {
					editavatarscale.rotation.y = WTW.getRadians(Number(dGet('wtw_tavatarrotationy').value));
				}
				if (WTW.isNumeric(dGet('wtw_tavatarrotationz').value)) {
					editavatarscale.rotation.z = WTW.getRadians(Number(dGet('wtw_tavatarrotationz').value));
				}
				/* adjust position */
				if (WTW.isNumeric(dGet('wtw_tavatarpositionx').value)) {
					editavatarscale.position.x = Number(dGet('wtw_tavatarpositionx').value);
				}
				if (WTW.isNumeric(dGet('wtw_tavatarpositiony').value)) {
					editavatarscale.position.y = Number(dGet('wtw_tavatarpositiony').value);
				}
				if (WTW.isNumeric(dGet('wtw_tavatarpositionz').value)) {
					editavatarscale.position.z = Number(dGet('wtw_tavatarpositionz').value);
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminavatars.js-setNewAvatar=' + ex.message);
	} 
}


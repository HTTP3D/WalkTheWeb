/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

WTW_3DINTERNET.prototype.initAdminSocket = function() {
	try {
		if (wtw3dinternet.admin == null) {
			wtw3dinternet.admin = io.connect('https://3dnet.walktheweb.network/admin');
			
			wtw3dinternet.admin.on('serror', function(zmessage) {
				WTW.log("error = " + zmessage,'red');
			}); 
			
			wtw3dinternet.admin.on('wtwbroadcast', function(zmessage) {
				zmessage = atob(zmessage);
				WTW.log(zmessage,'yellow');
				dGet('wtw_wtwmessage').innerHTML = "<span class='wtw-wtwmessagetext'>" + zmessage + "</span>";
				window.setTimeout(function(){dGet('wtw_wtwmessage').innerHTML = '';},5000);
			}); 
			
			wtw3dinternet.admin.emit('connect server', {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'serverip':dGet('wtw_serverip').value,
				'roomid':communityid + buildingid + thingid,
				'domainurl':wtw_domainurl,
				'siteurl':wtw_websiteurl,
				'instanceid':dGet('wtw_tinstanceid').value,
				'userid':dGet('wtw_tuserid').value,
				'displayname':btoa(dGet('wtw_tdisplayname').value)
			});

			wtw3dinternet.admin.on('reconnect server', function() {
				wtw3dinternet.admin.emit('connect server', {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
					'roomid':communityid + buildingid + thingid,
					'domainurl':wtw_domainurl,
					'siteurl':wtw_websiteurl,
					'instanceid':dGet('wtw_tinstanceid').value,
					'userid':dGet('wtw_tuserid').value,
					'displayname':btoa(dGet('wtw_tdisplayname').value)
				});
			});
			
			/* while web page is active, server will ping 3DNet Hub every 5 seconds (keep alive heartbeat) */
			if (wtw3dinternet.checkConnection != null) {
				window.clearInterval(wtw3dinternet.checkConnection);
				wtw3dinternet.checkConnection = null;
			}
			wtw3dinternet.checkConnection = window.setInterval(function() { 
				wtw3dinternet.admin.emit('connect server check', {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
					'roomid':communityid + buildingid + thingid,
					'domainurl':wtw_domainurl,
					'siteurl':wtw_websiteurl,
					'instanceid':dGet('wtw_tinstanceid').value,
					'userid':dGet('wtw_tuserid').value,
					'displayname':btoa(dGet('wtw_tdisplayname').value)
				}); 
			}, 5000);

			
			



			wtw3dinternet.admin.on('login', function(data) {
				if (wtw3dinternet.masterMove == '1') {
					// Whenever the server emits 'login', add user to count
					wtw3dinternet.addParticipantsMessage(data); 
				}
			});

			wtw3dinternet.admin.on('user joined', function(data) {
				if (wtw3dinternet.masterMove == '1') {
					wtw3dinternet.addParticipantsMessage(data);
					zavatar = scene.getMeshByID('person' + data.instanceid);
					if (zavatar == null) {
						if (data.instanceid != dGet('wtw_tinstanceid').value) {

						}
					}
				}
			});

			wtw3dinternet.admin.on('user left', function(data) {
				// Whenever the server emits 'user left', fade and remove the avatar
				wtw3dinternet.addParticipantsMessage(data);
				wtw3dinternet.removeAvatar(data.avatarname);
			});

			wtw3dinternet.admin.on('set disabled', function(data) {
				// Whenever the server emits 'user left', fade and remove the avatar
				wtw3dinternet.addParticipantsMessage(data);
				wtw3dinternet.removeAllAvatars();
			});

			wtw3dinternet.admin.on('reconnect', function() {
				wtw3dinternet.admin.emit('add user', {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
					'roomid':communityid + buildingid + thingid,
					'instanceid':dGet('wtw_tinstanceid').value,
					'placeholder':WTW.placeHolder,
					'userid':dGet('wtw_tuserid').value,
					'globaluseravatarid':dGet('wtw_tglobaluseravatarid').value,
					'useravatarid':dGet('wtw_tuseravatarid').value,
					'avatarid':dGet('wtw_tavatarid').value,
					'displayname':btoa(dGet('wtw_tdisplayname').value)
				});
			});

			wtw3dinternet.admin.on('reconnect_error', function() {
				WTW.log('reconnect failed');
			});

			wtw3dinternet.admin.emit('test', {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'serverip':dGet('wtw_serverip').value,
				'roomid':communityid + buildingid + thingid,
				'instanceid':dGet('wtw_tinstanceid').value,
				'userid':dGet('wtw_tuserid').value,
				'placeholder':WTW.placeHolder,
				'globaluseravatarid':dGet('wtw_tglobaluseravatarid').value,
				'useravatarid':dGet('wtw_tuseravatarid').value,
				'avatarid':dGet('wtw_tavatarid').value,
				'displayname':btoa(dGet('wtw_tdisplayname').value)
			});

			wtw3dinternet.admin.on('wtwadminresponse', function(zresponse) {
				WTW.log('response=' + zresponse);
			});

			wtw3dinternet.admin.on('receive scene command', function(data) {
				if (wtw3dinternet.masterMove == '1') {
					wtw3dinternet.processSceneCommand(data);
				}
			});
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-admin.js-initAdminSocket=" + ex.message);
	} 
}


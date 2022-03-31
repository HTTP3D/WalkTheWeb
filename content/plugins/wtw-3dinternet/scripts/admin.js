/* All code is Copyright 2013-2021 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

WTW_3DINTERNET.prototype.initAdminSocket = function() {
	/* initiate the listeners for WalkTheWeb Admin channel communication */
	try {
		if (wtw3dinternet.admin == null) {
			wtw3dinternet.admin = io.connect('https://3dnet.walktheweb.network/admin', { transports : ['websocket', 'polling'] });
			
			wtw3dinternet.admin.emit('connect server', {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'serverip':dGet('wtw_serverip').value,
				'instanceid':dGet('wtw_tinstanceid').value
			});

			wtw3dinternet.admin.emit('check server approval', {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'serverip':dGet('wtw_serverip').value,
				'instanceid':dGet('wtw_tinstanceid').value
			});

			wtw3dinternet.admin.on('user left', function(zdata) {
				WTW.log('USER LEFT=' + JSON.stringify(zdata), 'red');
			});

			wtw3dinternet.admin.on('reconnect', function(zdata) {
//				WTW.log('Admin-RECONNECT=' + JSON.stringify(zdata), 'red');
				wtw3dinternet.admin.emit('connect server', {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
					'instanceid':dGet('wtw_tinstanceid').value
				});
			});

			wtw3dinternet.admin.on('reconnect_error', function(zdata) {
//				WTW.log('Admin-RECONNECT_ERROR=' + JSON.stringify(zdata), 'red');
			});

			wtw3dinternet.admin.on('disconnect user', function(zdata) {
				WTW.log('DISCONNECT USER=' + JSON.stringify(zdata), 'red');
			});

			wtw3dinternet.admin.on('wtwadminresponse', function(zresponse) {
				WTW.log('response=' + zresponse);
			});

			wtw3dinternet.admin.on('receive scene command', function(zdata) {
				if (wtw3dinternet.masterMove == '1') {
					wtw3dinternet.processSceneCommand(zdata);
				}
			});

			wtw3dinternet.admin.on('wtwbroadcast', function(zmessage) {
				zmessage = atob(zmessage);
				WTW.log(zmessage,'yellow');
				dGet('wtw_wtwmessage').innerHTML = "<span class='wtw-wtwmessagetext'>" + zmessage + "</span>";
				window.setTimeout(function(){dGet('wtw_wtwmessage').innerHTML = '';},5000);
			}); 
			
			wtw3dinternet.admin.on('serror', function(zresponse) {
				var zcolor = 'white';
				var zchannel = '';
				var zerror = JSON.stringify(zresponse);
				if (zresponse != null) {
					if (zresponse.channel != undefined) {
						zchannel = zresponse.channel;
						switch (zchannel) {
							case 'admin':
								zcolor = 'yellow';
								break;
							case 'move':
								zcolor = 'pink';
								break;
							case 'chat':
								zcolor = 'white';
								break;
						}
					}
					if (zresponse.page != undefined) {
						zchannel += "-" + zresponse.page;
					}
					if (zresponse.error != undefined) {
						zerror = atob(zresponse.error);
					}
				}
				WTW.log(zchannel + ' = ' + zerror, zcolor);
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
					'communityid':communityid,
					'buildingid':buildingid,
					'thingid':thingid,
					'domainurl':wtw_domainurl,
					'siteurl':wtw_websiteurl,
					'instanceid':dGet('wtw_tinstanceid').value,
					'userid':dGet('wtw_tuserid').value,
					'displayname':btoa(dGet('wtw_tdisplayname').value)
				}); 
			}, 5000);

		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-admin.js-initAdminSocket=" + ex.message);
	} 
}


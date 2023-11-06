/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

WTW_3DINTERNET.prototype.initAdminSocket = function() {
	/* initiate the listeners for WalkTheWeb Admin channel communication */
	try {
		if (wtw3dinternet.admin == null) {
			wtw3dinternet.admin = io.connect('https://3dnet.walktheweb.network/admin', {transports: ['websocket', "polling"]});
			
			wtw3dinternet.admin.emit('wtwconnect', {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'serverip':dGet('wtw_serverip').value,
				'userip':dGet('wtw_tuserip').value,
				'instanceid':dGet('wtw_tinstanceid').value,
				'domainurl':wtw_domainurl
			});

			wtw3dinternet.admin.on('reconnect', function(zdata) {
				wtw3dinternet.admin.emit('wtwconnect', {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
					'userip':dGet('wtw_tuserip').value,
					'instanceid':dGet('wtw_tinstanceid').value,
					'domainurl':wtw_domainurl
				});
			});

			wtw3dinternet.admin.on('disconnect', function(zdata) {
				wtw3dinternet.admin.emit('wtwconnect', {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
					'userip':dGet('wtw_tuserip').value,
					'instanceid':dGet('wtw_tinstanceid').value,
					'domainurl':wtw_domainurl
				});
			});

			wtw3dinternet.admin.on('user left', function(zdata) {

			});

			wtw3dinternet.admin.on('receive scene command', function(zdata) {
				if (wtw3dinternet.masterMove == '1') {
					wtw3dinternet.processSceneCommand(zdata);
				}
			});

			wtw3dinternet.admin.on('wtwbroadcast', function(zmessage) {
				if (wtw3dinternet.masterBroadcasts == '1') {
					zmessage = atob(zmessage);
					WTW.log(zmessage,'yellow');
					dGet('wtw_wtwmessage').innerHTML = "<span class='wtw-wtwmessagetext'>" + zmessage + "</span>";
					window.setTimeout(function(){dGet('wtw_wtwmessage').innerHTML = '';},5000);
				}
			}); 
			
			wtw3dinternet.admin.on('wtwadminresponse', function(zresponse) {
				WTW.log('response=' + zresponse);
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
							default:
								zcolor = 'gray';
								break;
						}
					}
					if (zresponse.page != undefined) {
						zchannel += '-' + zresponse.page;
					}
					if (zresponse.error != undefined) {
						zerror = atob(zresponse.error);
					}
				}
				WTW.log(zchannel + ' = ' + zerror, zcolor);
			});

			wtw3dinternet.admin.on('connect_error', function(zdata) {
				/* WTW.log('Admin-CONNECT-ERROR=' + JSON.stringify(zdata), 'pink'); */
			});

			wtw3dinternet.admin.on('reconnect_error', function(zdata) {
				/* WTW.log('Admin-RECONNECT_ERROR=' + JSON.stringify(zdata), 'pink'); */
			});

			wtw3dinternet.admin.emit('check server approval', {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'serverip':dGet('wtw_serverip').value,
				'instanceid':dGet('wtw_tinstanceid').value
			});
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-admin.js-initAdminSocket=' + ex.message);
	} 
}

WTW_3DINTERNET.prototype.beforeUnloadAdmin = function() {
	/* when web page is unloaded perform this first */
	try {
		if (wtw3dinternet.admin != null) {
			wtw3dinternet.admin.emit('wtwdisconnect server', {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'instanceid':dGet('wtw_tinstanceid').value
			});
		}
		if (wtw3dinternet.move != null) {
			wtw3dinternet.move.emit('wtwdisconnect server', {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'instanceid':dGet('wtw_tinstanceid').value
			});
		}
		if (wtw3dinternet.chat != null) {
			wtw3dinternet.chat.emit('wtwdisconnect server', {
				'serverinstanceid':dGet('wtw_serverinstanceid').value,
				'instanceid':dGet('wtw_tinstanceid').value
			});
		}
	} catch (ex) {
		/* use for troubleshooting only */
		/* WTW.log('plugins:wtw-3dinternet:scripts-admin.js-beforeUnloadMove=' + ex.message); */
	} 
}


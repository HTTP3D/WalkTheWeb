var io = require('socket.io')(80);

/* var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
server.listen(80);
*/

// Routing
//app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

var wtwservers = [];
var approvedservers = [
	's40q123i89k7rwxr'
];

var serror = "";

function checkWTWServer(data, zsocketid, zchannel) {
	var zadded = false;
	var zinstanceid = '';
	var zserverind = '';
	var zroomind = '';
	var zuserind = '';
	var zusercount = '';
	try {
		let zserverid = '';
		let zroomid = '';
		if (data.serverinstanceid != undefined) {
			if (data.serverinstanceid.length == 16) {
				zserverid = data.serverinstanceid;
			}
		}
		if (data.roomid != undefined) {
			if (data.roomid.length > 15) {
				zroomid = data.roomid;
			}
		}
		if (data.instanceid != undefined) {
			if (data.instanceid.length == 24) {
				zinstanceid = data.instanceid;
			}
		}
		if (data != null && zserverid != '' && zroomid != '') {
			zserverind = -1;
			for (var i=0;i<wtwservers.length;i++) {
				if (wtwservers[i] != null) {
					if (wtwservers[i].serverid == zserverid) {
						zserverind = i;
						i = wtwservers.length;
					}
				}
			}
			if (zserverind == -1) {
				zroomind = 0;
				zserverind = wtwservers.length;
				wtwservers[zserverind] = {
					'serverid':zserverid,
					'rooms': []
				};
				wtwservers[zserverind].rooms[0] = {
					'roomid':zroomid,
					'chats': [],
					users: []
				};
			} else {
				zroomind = -1;
				for (var i=0;i<wtwservers[zserverind].rooms.length;i++) {
					if (wtwservers[zserverind].rooms[i] != null) {
						if (wtwservers[zserverind].rooms[i].roomid == zroomid) {
							zroomind = i;
							i = wtwservers[zserverind].rooms.length;
						}
					}
				}
				if (zroomind == -1) {
					zroomind = wtwservers[zserverind].rooms.length;
					wtwservers[zserverind].rooms[zroomind] = {
						'roomid':zroomid,
						'chats': [],
						users: []
					};
				}
			}
			zuserind = -1;
			for (var i=0;i<wtwservers[zserverind].rooms[zroomind].users.length;i++) {
				if (wtwservers[zserverind].rooms[zroomind].users[i] != null) {
					if (wtwservers[zserverind].rooms[zroomind].users[i].instanceid == zinstanceid && wtwservers[zserverind].rooms[zroomind].users[i].userid == data.userid) {
						zuserind = i;
						i = wtwservers[zserverind].rooms[zroomind].users.length;
					}
				}
			}
			if (zuserind == -1) {
				zadded = true;
				zuserind = wtwservers[zserverind].rooms[zroomind].users.length;
				if (zchannel == 'chat') {
					wtwservers[zserverind].rooms[zroomind].users[zuserind] = {
						'instanceid':zinstanceid,
						'userid':data.userid,
						'username':data.username,
						'socketid':zsocketid
					};
				} else {
					wtwservers[zserverind].rooms[zroomind].users[zuserind] = {
						'instanceid':zinstanceid,
						'userid':data.userid,
						'username':data.username
					};
				}
			} else if (zchannel == 'chat') {
				wtwservers[zserverind].rooms[zroomind].users[zuserind].socketid = zsocketid;
			}
			zusercount = wtwservers[zserverind].rooms[zroomind].users.length;
		}
	} catch (ex) {
		serror = "checkWTWServer=" + ex.message;
	} 
	return {
		'added': zadded,
		'serverind': zserverind,
		'roomind': zroomind,
		'userind': zuserind,
		'usercount': zusercount
	};
}

function disconnectUser(zsocketusername) {
	var zremoved = false;
	var zinstanceid = '';
	var zserverid = '';
	var zserverind = '';
	var zrooms = [];
	try {
		if (zsocketusername == undefined) {
			zsocketusername = '';
		}
		if (zsocketusername != null) {
			if (zsocketusername.indexOf('-') > -1) {
				let zsusers = zsocketusername.split('-');
				if (zsusers.length > 1) {
					zserverid = zsusers[0];
					zinstanceid = zsusers[1];
				}
			}
		}
		if (zserverid != '' && zinstanceid != '') {
			zserverind = -1;
			for (var i=0;i<wtwservers.length;i++) {
				if (wtwservers[i] != null) {
					if (wtwservers[i].serverid == zserverid) {
						zserverind = i;
						i = wtwservers.length;
					}
				}
			}
			if (zserverind > -1) {
				for (var i=0;i<wtwservers[zserverind].rooms.length;i++) {
					if (wtwservers[zserverind].rooms[i] != null) {
						if (wtwservers[zserverind].rooms[i].users != null) {
							for (var j=wtwservers[zserverind].rooms[i].users.length;j>0;j--) {
								if (wtwservers[zserverind].rooms[i].users[j] != null) {
									if (wtwservers[zserverind].rooms[i].users[j].instanceid == zinstanceid) {
										wtwservers[zserverind].rooms[i].users.splice(j,1);
										zremoved = true;
										let zroomind = zrooms.length;
										if (zrooms[zroomind] != null) {
											zrooms[zroomind].roomid = wtwservers[zserverind].rooms[i].roomid;
											zrooms[zroomind].usercount = wtwservers[zserverind].rooms[i].users.length;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	} catch (ex) {
		serror = "disconnectUser=" + ex.message;
	} 
	return {
		'removed': zremoved,
		'serverid': zserverid,
		'serverind': zserverind,
		'rooms': zrooms
	};
}

function getUserSocketId(zserverid, zroomid, zinstanceid) {
	var zsocketid = '';
	try {
		if (zserverid != '' && zroomid != '' && zinstanceid != '') {
			zserverind = -1;
			for (var i=0;i<wtwservers.length;i++) {
				if (wtwservers[i] != null) {
					if (wtwservers[i].serverid == zserverid) {
						zserverind = i;
						i = wtwservers.length;
					}
				}
			}
			if (zserverind > -1) {
				zroomind = -1;
				for (var i=0;i<wtwservers[zserverind].rooms.length;i++) {
					if (wtwservers[zserverind].rooms[i] != null) {
						if (wtwservers[zserverind].rooms[i].roomid == zroomid) {
							zroomind = i;
							i = wtwservers[zserverind].rooms.length;
						}
					}
				}
				if (zroomind > -1) {
					for (var i=0;i<wtwservers[zserverind].rooms[zroomind].users.length;i++) {
						if (wtwservers[zserverind].rooms[zroomind].users[i] != null) {
							if (wtwservers[zserverind].rooms[zroomind].users[i].instanceid == zinstanceid) {
								zsocketid = wtwservers[zserverind].rooms[zroomind].users[i].socketid;
								i = wtwservers[zserverind].rooms[zroomind].users.length;
							}
						}
					}
				}
			}
		}
	} catch (ex) {
		serror = "getUserSocketId=" + ex.message;
	} 
	return zsocketid;
}

io.of('/move').on('connection', function(socket) {

	// when the client emits 'add user', this listens and executes
	socket.on('add user', function(data) {
		var zcheck = checkWTWServer(data, socket.id, 'move');
		if (zcheck.added || socket.username == undefined) {
			// we store the instanceid in the socket session for this client
			socket.username = data.serverinstanceid + "-" + data.instanceid;
			socket.join(data.serverinstanceid + "-" + data.roomid);
			socket.emit('login', {
				usercount: zcheck.usercount
			});
			// echo globally (all clients) that a person has connected
			socket.broadcast.to(data.serverinstanceid + "-" + data.roomid).emit('user joined', {
				instanceid: data.instanceid,
				usercount: zcheck.usercount
			});
		}
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function() {
		var zcheck = disconnectUser(socket.username);
		if (zcheck.removed) {
			for (var i=0;i<zcheck.rooms.length;i++) {
				if (zcheck.rooms[i] != null && zcheck.rooms[i] != undefined) {
					// echo globally that this client has left
					socket.broadcast.to(zcheck.serverid + "-" + zcheck.rooms[i].roomid).emit('user left', {
						avatarname: "person-" + zcheck.instanceid,
						usercount: zcheck.rooms[i].usercount
					});
				}
			}
		}
	});
  
	// when the user disconnects.. perform this
	socket.on('disable', function() {
		socket.broadcast.emit('set disabled', {
		usercount: 0
		});
	});
  
	socket.on('my avatar movement', function(zmovedata) {
		/* broadcast any serror then reset serror */
		if (serror != '') {
			socket.emit('serror', "socketio-error = " + serror);
			serror = '';
		}
		/* check user connection */
		if (socket.username == undefined) {
			socket.emit('reconnect',{});
		} else {
			/* send movedata to others in scene */ 
			socket.broadcast.to(zmovedata.serverinstanceid + "-" + zmovedata.roomid).emit('avatar movement', zmovedata);
		}
	});
});

var numChatUsers = 0;

io.of('/chat').on('connection', function(socket) {
  var addedUser = false;

	// when the client emits 'add user', this listens and executes
	socket.on('add user', function(data) {
		var zcheck = checkWTWServer(data, socket.id, 'chat');
		if (zcheck.added || socket.username == undefined) {
			// we store the instanceid in the socket session for this client
			socket.username = data.serverinstanceid + "-" + data.instanceid;
//			socket.join(data.serverinstanceid + "-" + data.roomid);
			socket.emit('login', {
				usercount: zcheck.usercount
			});
			// echo globally (all clients) that a person has connected
			socket.broadcast.to(data.serverinstanceid + "-" + data.roomid).emit('user joined', {
				instanceid: data.instanceid,
				usercount: zcheck.usercount
			});
		}
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function() {
		var zcheck = disconnectUser(socket.username);
		if (zcheck.removed) {
			for (var i=0;i<zcheck.rooms.length;i++) {
				if (zcheck.rooms[i] != null && zcheck.rooms[i] != undefined) {
					// echo globally that this client has left
					socket.broadcast.to(zcheck.serverid + "-" + zcheck.rooms[i].roomid).emit('user left', {
						avatarname: "person-" + zcheck.instanceid,
						usercount: zcheck.rooms[i].usercount
					});
				}
			}
		}
	});

	// when user joins a chat.. perform this
	socket.on('start chat', function(data) {
//		var zcheck = joinChat(socket.username, data);
//		if (zcheck.removed) {

			socket.join(data.chatid);

			let zsocketid = getUserSocketId(data.serverinstanceid, data.roomid, data.toinstanceid);

			socket.to(zsocketid).emit('chat invite', {
				'serverinstanceid':data.serverinstanceid,
				'roomid':data.roomid,
				'chatid':data.chatid,
				'frominstanceid':data.frominstanceid,
				'toinstanceid':data.toinstanceid, 
				'userid':data.userid,
				'username':data.username
			});
//		}
	});

  socket.on('chat command', function(data) {
    // we tell the client to execute 'new message'
	/* validate the possible commands - watch for spamming */
	if (data.text == "accept chat") {
		socket.join(data.chatid);
	} else if (data.text == "leave chat" || data.text == "left chat") {
		socket.leave(data.chatid);
	}
	
	if (data.text != "left chat") {
		socket.broadcast.to(data.chatid).emit('receive chat command', data);
	}
  });

  // when the client emits 'new message', this listens and executes
  socket.on('send chat', function(data) {
    // we tell the client to execute 'new message'
    socket.broadcast.to(data.chatid).emit('receive chat', data);
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function() {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function() {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

});


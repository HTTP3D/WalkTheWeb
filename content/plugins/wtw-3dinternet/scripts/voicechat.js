/* All code is Copyright 2013-2021 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

WTW_3DINTERNET.prototype.initVoiceChatSocket = function() {
	try {
		if (wtw3dinternet.voicechat == null) {
			wtw3dinternet.voicechat = io.connect('https://3dnet.walktheweb.network/voicechat');

			wtw3dinternet.mediaSocket = wtw3dinternet.voicechat.on('connect', function() {
				if (dGet('wtw_startrecording') != null) {
					dGet('wtw_startrecording').disabled = false;
				}
			});

			wtw3dinternet.voicechat.on('results', function (zdata) {
				if(zdata && zdata.results[0] && zdata.results[0].alternatives[0]){
					//resultpreview.innerHTML += " " + zdata.results[0].alternatives[0].transcript;
				}
			});

			wtw3dinternet.voicechat.on('merged', function(zfilename) {
				var zhref = (location.href.split('/').pop().length ? location.href.replace(location.href.split('/').pop(), '') : location.href);

				zhref = zhref + '/content/uploads/streams/' + zfilename;
				// console.log('got file ' + zhref);
				var zwebid = '';
				
/*				if (dGet('wtw_camerapreview') != null) {
					dGet('wtw_camerapreview').src = zhref
					dGet('wtw_camerapreview').play();
					dGet('wtw_camerapreview').muted = false;
					dGet('wtw_camerapreview').controls = true;
				}
*/
				if (dGet('wtw_streaming-' + zwebid) != null) {
					dGet('wtw_streaming-' + zwebid).src = zhref
					dGet('wtw_streaming-' + zwebid).play();
					dGet('wtw_streaming-' + zwebid).muted = false;
					dGet('wtw_streaming-' + zwebid).controls = true;
				}
			});

			wtw3dinternet.voicechat.on('ffmpeg-output', function(zresults) {
				if (parseInt(zresults) >= 100) {
					//progressBar.parentNode.style.display = 'none';
					return;
				}
				//progressBar.parentNode.style.display = 'block';
				//progressBar.value = zresults;
				//percentage.innerHTML = 'Ffmpeg Progress ' + zresults + "%";
			});

			wtw3dinternet.voicechat.on('ffmpeg-error', function(zerror) {
				WTW.log("plugins:wtw-3dinternet:scripts-voicechat.js-initVoiceChatSocket(ffmpeg-error)=" + zerror);
			});

			wtw3dinternet.voicechat.on('login', function(zdata) {
				if (wtw3dinternet.masterVoiceChat == '1') {
				}
			}); 

			wtw3dinternet.voicechat.on('user joined', function(zdata) {
				if (wtw3dinternet.masterVoiceChat == '1') {
				}
			});

			wtw3dinternet.voicechat.on('user left', function(zdata) {
			});

			wtw3dinternet.voicechat.on('reconnect', function() {
				if (wtw3dinternet.masterVoiceChat == '1') {
					wtw3dinternet.voicechat.emit('add user', {
						'serverinstanceid':dGet('wtw_serverinstanceid').value,
						'serverip':dGet('wtw_serverip').value,
						'roomid':communityid + buildingid + thingid,
						'communityid':communityid,
						'buildingid':buildingid,
						'thingid':thingid,
						'instanceid':dGet('wtw_tinstanceid').value,
						'userid':dGet('wtw_tuserid').value,
						'displayname':btoa(dGet('wtw_tdisplayname').value)
					});
				}
			});
			
			if (wtw3dinternet.masterVoiceChat == '1') {
				wtw3dinternet.voicechat.emit('add user', {
					'serverinstanceid':dGet('wtw_serverinstanceid').value,
					'serverip':dGet('wtw_serverip').value,
					'roomid':communityid + buildingid + thingid,
					'communityid':communityid,
					'buildingid':buildingid,
					'thingid':thingid,
					'instanceid':dGet('wtw_tinstanceid').value,
					'userid':dGet('wtw_tuserid').value,
					'displayname':btoa(dGet('wtw_tdisplayname').value)
				});
			}

			wtw3dinternet.voicechat.on('voicechat invite', function(zdata) {
				if (wtw3dinternet.masterVoiceChat == '1') {
					if (dGet('wtw_voicechatbox-' + zdata.voicechatid) == null) {
						var zdisplayname = wtw3dinternet.getAvatarDisplayName(zdata.frominstanceid);
						dGet('wtw_voicechatsendrequests').innerHTML += wtw3dinternet.addVoiceChatBox(zdata.voicechatid, zdisplayname, "Voice Chat Request from " + zdisplayname + ".<br />");
						WTW.showInline('wtw_voicechataccept-' + zdata.voicechatid);
						WTW.showInline('wtw_voicechatdecline-' + zdata.voicechatid);
						wtw3dinternet.voiceChatSetScroll(zdata.voicechatid, false);
					}
					wtw3dinternet.voiceChatSetScroll(zdata.voicechatid, true);
					WTW.show('wtw_3dinternetvoicechatform');
				}
			});
			
			wtw3dinternet.voicechat.on('receive voicechat', function(zdata) {
				if (wtw3dinternet.masterVoiceChat == '1') {
					var ztext = WTW.decode(zdata.text);
					var zdisplayname = wtw3dinternet.getAvatarDisplayName(zdata.frominstanceid);
					if (ztext.length > 0) {
						if (dGet('wtw_voicechattext-' + zdata.voicechatid) != null) {
							dGet('wtw_voicechattext-' + zdata.voicechatid).innerHTML += "<span class='wtw3dinternet-chatthem'><b>" + zdisplayname + "</b>: " + WTW.encode(ztext) + "</span><hr class='wtw3dinternet-chathr' />";
						}
					}
					wtw3dinternet.voiceChatSetScroll(zdata.voicechatid, true);
				}
			});

			wtw3dinternet.voicechat.on('receive voicechat command', function(zdata) {
				if (wtw3dinternet.masterVoiceChat == '1') {
					wtw3dinternet.processVoiceChatCommand(zdata);
				}
			});

			wtw3dinternet.voicechat.on('typing', function(zdata) {
				if (wtw3dinternet.masterVoiceChat == '1') {
					wtw3dinternet.processVoiceChatCommand(zdata);
				}
			});

			wtw3dinternet.voicechat.on('stop typing', function(zdata) {
				if (wtw3dinternet.masterVoiceChat == '1') {
					wtw3dinternet.processVoiceChatCommand(zdata);
				}
			});

			wtw3dinternet.voicechat.on('error', function(zdata) {
				WTW.log(JSON.stringify(zdata),'red');
			});
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-voicechat.js-initVoiceChatSocket=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.beforeUnloadVoiceChat = function() {
	try {
		var zvoicechats = dGet('wtw_voicechatsendrequests').childNodes;
		for (var i=0; i<zvoicechats.length; i++) {
			if (zvoicechats[i] != null) {
				if (zvoicechats[i].id != undefined) {
					if (zvoicechats[i].id.indexOf('wtw_voicechatbox-') > -1) {
						let nameparts = zvoicechats[i].id.split('-');
						if (nameparts[1] != null) {
							wtw3dinternet.sendMessage('voicechat', nameparts[1], '', 'voicechat command', 'leave voicechat');
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-voicechat.js-beforeUnloadVoiceChat=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.processVoiceChatCommand = function(zdata) {
	try {
		if (wtw3dinternet.masterVoiceChat == '1') {
			if (dGet('wtw_voicechatbox-' + zdata.voicechatid) != null) {
				var zdisplayname = wtw3dinternet.getAvatarDisplayName(zdata.frominstanceid);
				ztext = "";
				switch (zdata.text) {
					case "decline voicechat":
						ztext = "<span class='wtw3dinternet-chatrednote'><b>" + zdisplayname + ":</b> Sorry, I can not voice chat right now.</span><br />";
						ztext += "<div id='wtw_voicechatclosenow-" + zdata.voicechatid + "' class='wtw3dinternet-chatbuttondecline' onclick=\"wtw3dinternet.closeVoiceChat('" + zdata.voicechatid + "');\">Close</div>";
						break;
					case "leave voicechat":
						ztext = "<span class='wtw3dinternet-chatnote'><b>" + zdisplayname + "</b> has left the voice chat.</span>";
						WTW.hide('wtw_voicechattyping-' + zdata.voicechatid);
						WTW.hide('wtw_voicechatadd-' + zdata.voicechatid);
						WTW.hide('wtw_voicechattextsend-' + zdata.voicechatid);
						WTW.show('wtw_voicechatok-' + zdata.voicechatid);
						break;
					case "accept voicechat":
						wtw3dinternet.acceptVoiceChat(zdata.voicechatid, zdisplayname);
						break;
					case "typing":
						dGet('wtw_voicechattyping-' + zdata.voicechatid).innerHTML = zdisplayname + ' is typing...';
						dGet('wtw_voicechattyping-' + zdata.voicechatid).style.visibility = 'visible';
						break;
					case "stop typing":
						dGet('wtw_voicechattyping-' + zdata.voicechatid).innerHTML = '';
						dGet('wtw_voicechattyping-' + zdata.voicechatid).style.visibility = 'hidden';
						break;
				}
				if (ztext != "" && dGet('wtw_voicechattext-' + zdata.voicechatid) != null) {
					dGet('wtw_voicechattext-' + zdata.voicechatid).innerHTML += ztext + "<hr class='wtw3dinternet-chathr' />";
				}
				wtw3dinternet.chatVoiceSetScroll(zdata.voicechatid, true);
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-voicechat.js-processVoiceChatCommand=" + ex.message);
	} 
}
			
WTW_3DINTERNET.prototype.startVoiceChat = function(zinstanceid) {
	try {
		if (wtw3dinternet.masterVoiceChat == '1') {
			let zvoicechatid = WTW.getRandomString(20);
			if (dGet('wtw_voicechatbox-' + zvoicechatid) == null) {
				var zdisplayname = wtw3dinternet.getAvatarDisplayName(zinstanceid);
				dGet('wtw_voicechatsendrequests').innerHTML += wtw3dinternet.addVoiceChatBox(zvoicechatid, zdisplayname, "Voice Chat Request Sent to " + zdisplayname + ".<br />");
				WTW.show('wtw_menuvoicechatmin');
			}
			wtw3dinternet.voiceChatSetScroll(zvoicechatid, true);
			WTW.show('wtw_3dinternetvoicechatform');
			wtw3dinternet.sendMessage('voicechat', zvoicechatid, zinstanceid, 'start voicechat', '');
		}
	} catch (ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-voicechat.js-startVoiceChat=" + ex.message);
	} 
}

WTW_3DINTERNET.prototype.addVoiceChatBox = function(zvoicechatid, zdisplayname, ztext) {
	var zvoicechatbox = "";
	try {
		if (wtw3dinternet.masterVoiceChat == '1') {
			zvoicechatbox = 
				"<div id='wtw_voicechatbox-" + zvoicechatid + "' class='wtw3dinternet-chatbox'>" + 
					"<div class='wtw3dinternet-chatboxshadow'>" +
						"<img class='wtw-closeright' onclick=\"wtw3dinternet.closeVoiceChat('" + zvoicechatid + "',true);\" src='/content/system/images/menuclosegrey.png' alt='Leave Voice Chat' title='Leave Voice Chat' onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclosegrey.png';\" />" + 
						"<img id='wtw_voicechatmin" + zvoicechatid + "' class='wtw-closeright' onclick=\"WTW.hide('wtw_voicechatmaxdiv" + zvoicechatid + "');WTW.hide('wtw_voicechatmin" + zvoicechatid + "');WTW.show('wtw_voicechatmax" + zvoicechatid + "');wtw3dinternet.voiceChatSetScroll('" + zvoicechatid + "', true);\" src='/content/system/images/menuminimizegrey.png' alt='Minimize Voice Chat' title='Minimize Voice Chat' onmouseover=\"this.src='/content/system/images/menuminimizehover.png';\" onmouseout=\"this.src='/content/system/images/menuminimizegrey.png';\" />" + 
						"<img id='wtw_voicechatmax" + zvoicechatid + "' class='wtw-closeright' onclick=\"WTW.show('wtw_voicechatmaxdiv" + zvoicechatid + "');WTW.hide('wtw_voicechatmax" + zvoicechatid + "');WTW.show('wtw_voicechatmin" + zvoicechatid + "');wtw3dinternet.voiceChatSetScroll('" + zvoicechatid + "', true);\" src='/content/system/images/menumaximizegrey.png' alt='Maximize Voice Chat' title='Maximize Voice Chat' onmouseover=\"this.src='/content/system/images/menumaximizehover.png';\" onmouseout=\"this.src='/content/system/images/menumaximizegrey.png';\" style='display:none;visibility:hidden;' />" +
						"<div id='wtw_voicechatdisplayname" + zvoicechatid + "' class='wtw3dinternet-chatdisplayname'>" + zdisplayname + "</div>" + 
						"<div id='wtw_voicechatmaxdiv" + zvoicechatid + "'>" +
							"<div id='wtw_voicechattext-" + zvoicechatid + "' class='wtw3dinternet-chattext'>" + ztext + "</div>" + 
							"<div class='wtw3dinternet-chatcenter'>" + 
								"<div id='wtw_voicechattyping-" + zvoicechatid + "' class='wtw3dinternet-chattyping'></div>" +
								"<textarea id='wtw_voicechatadd-" + zvoicechatid + "' rows='2' cols='39' class='wtw3dinternet-chattextarea' autocomplete='new-password' onkeyup=\"wtw3dinternet.voicechatCheckKey(this,'" + zvoicechatid + "');\" onfocus=\"wtw3dinternet.setVoiceChatNewInfo('" + zvoicechatid + "',false);\" style='display:none;visibility:hidden;'></textarea>" + 
								"<div id='wtw_voicechattextsend-" + zvoicechatid + "' class='wtw3dinternet-chattextsend' onclick=\"wtw3dinternet.sendVoiceChat('" + zvoicechatid + "');\" style='display:none;visibility:hidden;'>Send</div>" +
								"<div id='wtw_voicechataccept-" + zvoicechatid + "' class='wtw3dinternet-chatbuttonaccept' onclick=\"wtw3dinternet.acceptVoiceChat('" + zvoicechatid + "', '" + zdisplayname + "', true);\" style='display:none;visibility:hidden;'>Accept</div>" + 
								"<div id='wtw_voicechatdecline-" + zvoicechatid + "' class='wtw3dinternet-chatbuttondecline' onclick=\"wtw3dinternet.closeVoiceChat('" + zvoicechatid + "',true,true);\" style='display:none;visibility:hidden;'>Decline</div>" + 
								"<div id='wtw_voicechatok-" + zvoicechatid + "' class='wtw3dinternet-chatbuttonaccept' onclick=\"wtw3dinternet.closeVoiceChat('" + zvoicechatid + "');\" style='display:none;visibility:hidden;'>OK</div>" + 
							"</div>" +
						"</div>" +
					"</div>" +
				"</div>";
		}
	} catch(ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-voicechat.js-addVoiceChatBox=" + ex.message);
	}
	return zvoicechatbox;
}

WTW_3DINTERNET.prototype.acceptVoiceChat = function(zvoicechatid, zdisplayname, zresponse) {
	try {
		if (zresponse == undefined) {
			zresponse == false;
		}
		if (zresponse) {
			wtw3dinternet.sendMessage('voicechat', zvoicechatid, '', 'voicechat command', 'accept voicechat');
		}
		WTW.hide('wtw_voicechataccept-' + zvoicechatid);
		WTW.hide('wtw_voicechatdecline-' + zvoicechatid);
		WTW.hide('wtw_voicechatok-' + zvoicechatid);
		WTW.showInline('wtw_voicechatadd-' + zvoicechatid);
		WTW.showInline('wtw_voicechattextsend-' + zvoicechatid);
		if (dGet('wtw_voicechattext-' + zvoicechatid) != null) {
			var zdate = new Date();
			dGet('wtw_voicechattext-' + zvoicechatid).innerHTML = "<span class='wtw3dinternet-chatgreennote'><b>" + zdisplayname + "</b> Entered Voice Chat: " + zdate.toLocaleString() + "</span><hr class='wtw3dinternet-chathr' />";
		}
		wtw3dinternet.voiceChatSetScroll(zvoicechatid, true);
	} catch(ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-voicechat.js-acceptVoiceChat=" + ex.message);
	}
}

WTW_3DINTERNET.prototype.sendVoiceChat = function(zvoicechatid) {
	try {
		var ztext = "";
		if (dGet('wtw_voicechatadd-' + zvoicechatid) != null) {
			ztext = dGet('wtw_voicechatadd-' + zvoicechatid).value;
		}
		if (ztext.length > 0 && dGet('wtw_voicechattext-' + zvoicechatid) != null) {
			dGet('wtw_voicechattext-' + zvoicechatid).innerHTML += "<span class='wtw3dinternet-chatme'>Me:</span> " + WTW.encode(ztext) + "<hr class='wtw3dinternet-chathr' />";
			dGet('wtw_voicechatadd-' + zvoicechatid).value = "";
			wtw3dinternet.sendMessage('voicechat', zvoicechatid, '', 'send voicechat', WTW.encode(ztext));
		}
		wtw3dinternet.voiceChatSetScroll(zvoicechatid, true);
	} catch(ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-voicechat.js-sendVoiceChat=" + ex.message);
	}
}

WTW_3DINTERNET.prototype.closeVoiceChat = function(zvoicechatid, zresponse, zdecline) {
	try {
		var ztext = 'leave voicechat';
		if (zresponse == undefined) {
			zresponse == false;
		}
		if (zdecline == undefined) {
			zdecline == false;
		}
		if (zdecline) {
			ztext = 'decline voicechat';
		}
		if (zresponse) {
			wtw3dinternet.sendMessage('voicechat', zvoicechatid, '', 'voicechat command', ztext);
		} else if (ztext == 'leave voicechat') {
			wtw3dinternet.sendMessage('voicechat', zvoicechatid, '', 'voicechat command', 'left voicechat');
		}
		if (dGet('wtw_voicechatsendrequests') != null && dGet('wtw_voicechatbox-' + zvoicechatid) != null) {
			dGet('wtw_voicechatsendrequests').removeChild(dGet('wtw_voicechatbox-' + zvoicechatid));
		}
		if (dGet('wtw_voicechatsendrequests').innerHTML == '') {
			WTW.hide('wtw_menuvoicechat');
		} else {
			wtw3dinternet.voiceChatSetScroll(zvoicechatid, false);
		}
	} catch(ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-voicechat.js-closeVoiceChat=" + ex.message);
	}
}

WTW_3DINTERNET.prototype.voiceChatCheckKey = function(obj, zvoicechatid) {
	try {
		var e = window.event;
		if (e != undefined) {
			if (e.keyCode == 13) {
				wtw3dinternet.sendVoiceChat(zvoicechatid);
				wtw3dinternet.voicechat.emit('stop typing', {
					'voicechatid':zvoicechatid,
					'userid':dGet('wtw_tuserid').value,
					'displayname':btoa(dGet('wtw_tdisplayname').value),
					'frominstanceid':dGet('wtw_tinstanceid').value,
					'text':'stop typing'
				});
			} else {
				WTW.checkKey(obj, 'text', 0, 0);
				if (wtw3dinternet.typingTimer != null) {
					window.clearTimeout(wtw3dinternet.typingTimer);
				}
				wtw3dinternet.typingTimer = window.setTimeout(function(){
					wtw3dinternet.voicechat.emit('stop typing', {
						'voicechatid':zvoicechatid,
						'userid':dGet('wtw_tuserid').value,
						'displayname':btoa(dGet('wtw_tdisplayname').value),
						'frominstanceid':dGet('wtw_tinstanceid').value,
						'text':'stop typing'
					});
				},1000);
				wtw3dinternet.voicechat.emit('typing', {
					'voicechatid':zvoicechatid,
					'userid':dGet('wtw_tuserid').value,
					'displayname':btoa(dGet('wtw_tdisplayname').value),
					'frominstanceid':dGet('wtw_tinstanceid').value,
					'text':'typing'
				});
			}
			e.preventDefault();
		}
	} catch(ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-voicechat.js-voiceChatCheckKey=" + ex.message);
	}
}

WTW_3DINTERNET.prototype.voiceChatSetScroll = function(voicechatid, setfocus) {
	try {
		WTW.showSettingsMenu('wtw_menuvoicechat');
		if (dGet('wtw_voicechattext-' + voicechatid) != null) {
			dGet('wtw_voicechattext-' + voicechatid).scrollTop = dGet('wtw_voicechattext-' + voicechatid).scrollHeight;
		}
		if (setfocus) {
			if (dGet('wtw_voicechatadd-' + voicechatid) != null) {
				dGet('wtw_voicechatadd-' + voicechatid).focus();
			}
		} else {
			wtw3dinternet.setVoiceChatNewInfo(voicechatid,true);
		}
	} catch(ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-voicechat.js-voiceChatSetScroll=" + ex.message);
	}
}

WTW_3DINTERNET.prototype.setVoiceChatNewInfo = function(voicechatid, setNew) {
	try {
		if (setNew) {
			if (dGet('wtw_voicechatdisplayname' + voicechatid) != null) {
				dGet('wtw_voicechatdisplayname' + voicechatid).className = 'wtw3dinternet-chatdisplaynameblink';
			}
		} else {
			if (dGet('wtw_voicechatdisplayname' + voicechatid) != null) {
				dGet('wtw_voicechatdisplayname' + voicechatid).className = 'wtw3dinternet-chatdisplayname';
			}
		}
	} catch(ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-voicechat.js-setVoiceChatNewInfo=" + ex.message);
	}
}

WTW_3DINTERNET.prototype.startRecording = function() {
	try {
		if (dGet('wtw_startrecording') != null) {
			dGet('wtw_startrecording').disabled = true;
		}
        navigator.getUserMedia({
            audio: true,
            video: true
        }, function(stream) {
            wtw3dinternet.mediaStream = stream;

            wtw3dinternet.recordAudio = RecordRTC(stream, {
                type: 'audio',
				mimeType: 'audio/webm',
				sampleRate: 44100,
                recorderType: StereoAudioRecorder,
				numberOfAudioChannels: 1,
				timeSlice: 4000,
				desiredSampRate: 16000,
                onAudioProcessStarted: function() {
                    wtw3dinternet.recordVideo.startRecording();
					
					var zwebid = '';
                    //dGet('wtw_camerapreview').src = window.URL.createObjectURL(stream); // replaced with following line
					if (dGet('wtw_camerapreview') != null) {
						dGet('wtw_camerapreview').srcObject = stream;
						dGet('wtw_camerapreview').play();
						dGet('wtw_camerapreview').muted = true;
						dGet('wtw_camerapreview').controls = false;
					}
					if (dGet('wtw_streaming-' + zwebid) != null) {
						dGet('wtw_streaming-' + zwebid).srcObject = stream;
						dGet('wtw_streaming-' + zwebid).play();
						dGet('wtw_streaming-' + zwebid).muted = true;
						dGet('wtw_streaming-' + zwebid).controls = false;
					}
					
                },
				
				ondataavailable: function(zblob) {
                    // making use of socket.io-stream for bi-directional
                    // streaming, create a stream
                    var zstream2 = ss.createStream();
                    // stream directly to server
                    // it will be temp. stored locally
                    wtw3dinternet.voicechat.emit('stream-transcribe', zstream2, {
                        name: 'stream.wav', 
                        size: zblob.size,
						'serverinstanceid':dGet('wtw_serverinstanceid').value,
						'serverip':dGet('wtw_serverip').value,
						'roomid':communityid + buildingid + thingid,
						'communityid':communityid,
						'buildingid':buildingid,
						'thingid':thingid,
						'instanceid':dGet('wtw_tinstanceid').value,
						'userid':dGet('wtw_tuserid').value,
						'displayname':btoa(dGet('wtw_tdisplayname').value)
					});
                    // pipe the audio blob to the read stream
                    ss.createBlobReadStream(zblob).pipe(zstream2);
                }
            });

            var videoOnlyStream = new MediaStream();
            stream.getVideoTracks().forEach(function(track) {
                videoOnlyStream.addTrack(track);
            });

            wtw3dinternet.recordVideo = RecordRTC(videoOnlyStream, {
                type: 'video',
                recorderType: !!navigator.mozGetUserMedia ? MediaStreamRecorder : WhammyRecorder
            });

            wtw3dinternet.recordAudio.startRecording();
			
			if (dGet('wtw_stoprecording') != null) {
				dGet('wtw_stoprecording').disabled = false;
			}
			
			/* show on Babylon Mesh */
			wtw3dinternet.startVideoDisplay();
        }, function(ex) {
			WTW.log("plugins:wtw-3dinternet:scripts-voicechat.js-startRecording=" + JSON.stringify(ex));
        });
	} catch(ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-voicechat.js-startRecording=" + ex.message);
	}
}

WTW_3DINTERNET.prototype.stopRecording = function() {
	try {
		if (dGet('wtw_startrecording') != null) {
			dGet('wtw_startrecording').disabled = false;
		}
		if (dGet('wtw_stoprecording') != null) {
			dGet('wtw_stoprecording').disabled = true;
		}
        // stop audio recorder
        wtw3dinternet.recordAudio.stopRecording(function() {
            // stop video recorder
            wtw3dinternet.recordVideo.stopRecording(function() {

                // get audio data-URL
                wtw3dinternet.recordAudio.getDataURL(function(audioDataURL) {

                    // get video data-URL
                    wtw3dinternet.recordVideo.getDataURL(function(videoDataURL) {
                        var files = {
                            audio: {
                                type: wtw3dinternet.recordAudio.getBlob().type || 'audio/wav',
                                dataURL: audioDataURL
                            },
                            video: {
                                type: wtw3dinternet.recordVideo.getBlob().type || 'video/webm',
                                dataURL: videoDataURL
                            }
                        };

                        wtw3dinternet.voicechat.emit('message', files);

                        if (wtw3dinternet.mediaStream) wtw3dinternet.mediaStream.stop();
                    });

                });
				if (dGet('wtw_camerapreview') != null) {
					dGet('wtw_camerapreview').src = '';
					dGet('wtw_camerapreview').poster = 'ajax-loader.gif';
				}
            });

        });

        // if firefox or if you want to record only audio
        // stop audio recorder
        wtw3dinternet.recordAudio.stopRecording(function() {
            // get audio data-URL
            wtw3dinternet.recordAudio.getDataURL(function(audioDataURL) {
                var files = {
                    audio: {
                        type: wtw3dinternet.recordAudio.getBlob().type || 'audio/wav',
                        dataURL: audioDataURL
                    }
                };

                wtw3dinternet.voicechat.emit('message', files);
                if (wtw3dinternet.mediaStream) wtw3dinternet.mediaStream.stop();
            });
			if (dGet('wtw_camerapreview') != null) {
				dGet('wtw_camerapreview').src = '';
				dGet('wtw_camerapreview').poster = 'ajax-loader.gif';
			}
        });
	} catch(ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-voicechat.js-stopRecording=" + ex.message);
	}
}

WTW_3DINTERNET.prototype.startVideoDisplay = function() {
	try {
		var zmeshes = scene.meshes;
		for (var i = 0;i < zmeshes.length;i++) {
			if (zmeshes[i] != null) {
				if (zmeshes[i].id != undefined) {
					if (zmeshes[i].id.indexOf('videostream') > -1) {
						if (dGet('wtw_camerapreview') != null) {
							var zvideomat = new BABYLON.StandardMaterial(zmeshes[i].id + "-streammat", scene);
							var zvideotexture = new BABYLON.VideoTexture(zmeshes[i].id + "-streamtexture", dGet('wtw_camerapreview'), scene, true, true);
							zvideomat.backFaceCulling = false;
							zvideomat.diffuseTexture = zvideotexture;
							zvideomat.emissiveColor = BABYLON.Color3.White();
							zmeshes[i].material = zvideomat;
						}
					}
				}
			}
		}
	} catch(ex) {
		WTW.log("plugins:wtw-3dinternet:scripts-voicechat.js-startVideoDisplay=" + ex.message);
	}
}

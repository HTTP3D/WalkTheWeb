/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions are used to download selected 3D Communities, 3D Buildings, 3D Things, or related content */
/* downloads are hosted by 3dnet.walktheweb.com 3D Internet (WalkTheWeb Downloads) */

WTW_3DINTERNET.prototype.communitySearch = async function(zsearch) {
	/* keyword search to find a community to download to your instance */
	try {
		WTW.hide('wtw_downloadingnotice');
		WTW.hide('wtw_downloadingnoticequeue');
		WTW.hide('wtw_downloadcomplete');
		zsearch = WTW.encode(zsearch);
		WTW.getAsyncJSON('https://3dnet.walktheweb.com/connect/sharesearch.php?search=' + zsearch + '&webtype=community', 
			function(zresponse) {
				wtw3dinternet.communitySearchReply(JSON.parse(zresponse));
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-downloads.js-communitySearch=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.communitySearchReply = function(zresponse) {
	/* receives search results and parses for screen display */
	try {
		var ztempsearchresults = '';
		var zformat = 2;
		if (Number(document.getElementById('wtw_downloadstcols').value) > 0) {
			zformat = Number(document.getElementById('wtw_downloadstcols').value);
		}
		dGet('wtw_commtempsearchresults').innerHTML = '';
		for (var i=0; i < zresponse.length; i++) {
			var zdownloads = 0;
			var zbuttonstyle = '';
			var zcommunityid = zresponse[i].servercommunityid;
			var zupdatedate  = WTW.formatDate(zresponse[i].updatedate);
			var zdirsize = WTW.formatNumber(Math.round(Number(zresponse[i].dirsize)/1000000),0);
			if (WTW.isNumeric(zresponse[i].downloads)) {
				zdownloads = zresponse[i].downloads;
			}
			if (zformat > 1) {
				var zcols = '';
				switch (zformat) {
					case 2:
						zcols = 'wtw-largecol';
						break;
					case 3:
						zcols = 'wtw-medcol';
						break;
					case 4:
						zcols = 'wtw-smallcol';
						break;
				}
				ztempsearchresults += "<div class='" + zcols + "'>";
				zbuttonstyle = "style='margin:2px 2px 5px 5px;'";
			}
			ztempsearchresults += "<h3 class=\"wtw-black\">" + zresponse[i].templatename + "</h3>";
			if (zresponse[i].imageurl != "") {
				ztempsearchresults += "<div style=\"clear:both;\"></div><img id='wtw_search" + zcommunityid + "' src='" + zresponse[i].imageurl + "' onmouseover=\"this.style.border='1px solid yellow';\" onmouseout=\"this.style.border='1px solid gray';\" onclick=\"wtw3dinternet.downloadWeb('community', '" + btoa(zresponse[i].templatename) + "', '" + zcommunityid + "', '" + zcommunityid + "', 'community');\" style=\"margin:2%;border:1px solid gray;cursor:pointer;width:96%;height:auto;\" alt='" + zresponse[i].templatename + "' title='" + zresponse[i].templatename + "' />";
			}
			ztempsearchresults += "<input type='button' id='wtw_bcommtempselect" + i + "' class='wtw-searchresultbutton' value='Download' onclick=\"wtw3dinternet.downloadWeb('community', '" + btoa(zresponse[i].templatename) + "', '" + zcommunityid + "', '" + zcommunityid + "', 'community');\" " + zbuttonstyle + " />";
			ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>" + zresponse[i].description + "</div><br />";
			ztempsearchresults += "<div class='wtw-right' style='min-width:150px;'>File Count: <b>" + zresponse[i].filecount + "</b></div><div style='white-space:normal;font-weight:normal;color:#000000;'>Created By: <b>" + zresponse[i].displayname + "</b> (<b>" + zupdatedate + "</b>)</div><br />";
			ztempsearchresults += "<div class='wtw-right' style='min-width:150px;'>Folder Size: <b>" + zdirsize + " MB</b></div><div style='white-space:normal;font-weight:normal;color:#000000;'>Version: <b>[" + zresponse[i].version + "]</b> " + zresponse[i].versiondesc + ".</div><br />";
			ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>Downloaded: <b>" + zdownloads + "</b> times.</div><br />";
			if (zformat > 1) {
				ztempsearchresults += "</div>";
			} else {
				ztempsearchresults += "<br /><hr style=\"width:96%;\" />";
			}
		}
		dGet('wtw_commtempsearchresults').innerHTML = ztempsearchresults;
		WTW.show('wtw_commtempsearchresults');
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-downloads.js-communitySearchReply=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.buildingSearch = async function(zsearch) {
	/* keyword search to find a building to download to your instance */
	try {
		WTW.hide('wtw_downloadingnotice');
		WTW.hide('wtw_downloadingnoticequeue');
		WTW.hide('wtw_downloadcomplete');
		zsearch = WTW.encode(zsearch);
		var zbuildingtype = 2;
		if (zsearch != '') {
			zbuildingtype = '';
		}
		WTW.getAsyncJSON('https://3dnet.walktheweb.com/connect/sharesearch.php?search=' + zsearch + '&webtype=building&buildingtype=' + zbuildingtype, 
			function(zresponse) {
				wtw3dinternet.buildingSearchReply(JSON.parse(zresponse));
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-downloads.js-buildingSearch=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.buildingSearchReply = function(zresponse) {
	/* receives search results and parses for screen display */
	try {
		var ztempsearchresults = '';
		var zformat = 2;
		if (Number(document.getElementById('wtw_downloadstcols').value) > 0) {
			zformat = Number(document.getElementById('wtw_downloadstcols').value);
		}
		dGet('wtw_buildtempsearchresults').innerHTML = '';
		for (var i=0; i < zresponse.length; i++) {
			var zdownloads = 0;
			var zbuttonstyle = '';
			var zbuildingid = zresponse[i].serverbuildingid;
			var zupdatedate  = WTW.formatDate(zresponse[i].updatedate);
			var zdirsize = WTW.formatNumber(Math.round(Number(zresponse[i].dirsize)/1000000),0);
			if (WTW.isNumeric(zresponse[i].downloads)) {
				zdownloads = zresponse[i].downloads;
			}
			if (zformat > 1) {
				var zcols = '';
				switch (zformat) {
					case 2:
						zcols = 'wtw-largecol';
						break;
					case 3:
						zcols = 'wtw-medcol';
						break;
					case 4:
						zcols = 'wtw-smallcol';
						break;
				}
				ztempsearchresults += "<div class='" + zcols + "'>";
				zbuttonstyle = "style='margin:2px 2px 5px 5px;'";
			}
			ztempsearchresults += "<h3 class=\"wtw-black\">" + zresponse[i].templatename + "</h3>";
			if (zresponse[i].imageurl != "") {
				ztempsearchresults += "<img id='wtw_search" + zbuildingid + "' src='" + zresponse[i].imageurl + "' onmouseover=\"this.style.border='1px solid yellow';\" onmouseout=\"this.style.border='1px solid gray';\" onclick=\"wtw3dinternet.downloadWeb('building', '" + btoa(zresponse[i].templatename) + "', '" + zbuildingid + "', '" + zbuildingid + "', 'building');return (false);\" style=\"margin:2%;border:1px solid gray;cursor:pointer;width:96%;height:auto;\" alt='" + zresponse[i].templatename + "' title='" + zresponse[i].templatename + "' />";
			}

			ztempsearchresults += "<br /><input type='button' id='wtw_btempselect" + i + "' class='wtw-searchresultbutton' value='Download' onclick=\"wtw3dinternet.downloadWeb('building', '" + btoa(zresponse[i].templatename) + "', '" + zbuildingid + "', '" + zbuildingid + "', 'building');return (false);\" />";
			ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>" + zresponse[i].description + "</div><br />";
			ztempsearchresults += "<div class='wtw-right' style='min-width:150px;'>File Count: <b>" + zresponse[i].filecount + "</b></div><div style='white-space:normal;font-weight:normal;color:#000000;'>Created By: <b>" + zresponse[i].displayname + "</b> (<b>" + zupdatedate + "</b>)</div><br />";
			ztempsearchresults += "<div class='wtw-right' style='min-width:150px;'>Folder Size: <b>" + zdirsize + " MB</b></div><div style='white-space:normal;font-weight:normal;color:#000000;'>Version: <b>[" + zresponse[i].version + "]</b> " + zresponse[i].versiondesc + ".</div><br />";
			ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>Downloaded: <b>" + zdownloads + "</b> times.</div><br />";
			if (zformat > 1) {
				ztempsearchresults += "</div>";
			} else {
				ztempsearchresults += "<br /><hr style=\"width:96%;\" />";
			}
		}
		dGet('wtw_buildtempsearchresults').innerHTML = ztempsearchresults;
		WTW.show('wtw_buildtempsearchresults');
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-downloads.js-buildingSearchReply=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.thingSearch = async function(zsearch) {
	/* keyword search to find a thing to download to your instance */
	try {
		WTW.hide('wtw_downloadingnotice');
		WTW.hide('wtw_downloadingnoticequeue');
		WTW.hide('wtw_downloadcomplete');
		zsearch = WTW.encode(zsearch);
		WTW.getAsyncJSON('https://3dnet.walktheweb.com/connect/sharesearch.php?search=' + zsearch + '&webtype=thing', 
			function(zresponse) {
				wtw3dinternet.thingSearchReply(JSON.parse(zresponse));
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-downloads.js-thingSearch=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.thingSearchReply = function(zresponse) {
	/* receives search results and parses for screen display */
	try {
		var ztempsearchresults = '';
		var zformat = 2;
		if (Number(document.getElementById('wtw_downloadstcols').value) > 0) {
			zformat = Number(document.getElementById('wtw_downloadstcols').value);
		}
		dGet('wtw_thingtempsearchresults').innerHTML = '';
		for (var i=0; i < zresponse.length; i++) {
			var zdownloads = 0;
			var zbuttonstyle = '';
			var zthingid = zresponse[i].serverthingid;
			var zupdatedate  = WTW.formatDate(zresponse[i].updatedate);
			var zdirsize = WTW.formatNumber(Math.round(Number(zresponse[i].dirsize)/1000000),0);
			if (WTW.isNumeric(zresponse[i].downloads)) {
				zdownloads = zresponse[i].downloads;
			}
			if (zformat > 1) {
				var zcols = '';
				switch (zformat) {
					case 2:
						zcols = 'wtw-largecol';
						break;
					case 3:
						zcols = 'wtw-medcol';
						break;
					case 4:
						zcols = 'wtw-smallcol';
						break;
				}
				ztempsearchresults += "<div class='" + zcols + "'>";
				zbuttonstyle = "style='margin:2px 2px 5px 5px;'";
			}
			ztempsearchresults += "<h3 class=\"wtw-black\">" + zresponse[i].templatename + "</h3>";
			if (zresponse[i].imageurl != "") {
				ztempsearchresults += "<img id='wtw_search" + zthingid + "' src='" + zresponse[i].imageurl + "' onmouseover=\"this.style.border='1px solid yellow';\" onmouseout=\"this.style.border='1px solid gray';\" onclick=\"wtw3dinternet.downloadWeb('thing', '" + btoa(zresponse[i].templatename) + "', '" + zthingid + "', '" + zthingid + "', 'thing');return (false);\" style=\"margin:2%;border:1px solid gray;cursor:pointer;width:96%;height:auto;\" alt='" + zresponse[i].templatename + "' title='" + zresponse[i].templatename + "' />";
			}

			ztempsearchresults += "<br /><input type='button' id='wtw_bthingtempselect" + i + "' class='wtw-searchresultbutton' value='Download' onclick=\"wtw3dinternet.downloadWeb('thing', '" + btoa(zresponse[i].templatename) + "', '" + zthingid + "', '" + zthingid + "', 'thing');return (false);\" />";
			ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>" + zresponse[i].description + "</div><br />";
			ztempsearchresults += "<div class='wtw-right' style='min-width:150px;'>File Count: <b>" + zresponse[i].filecount + "</b></div><div style='white-space:normal;font-weight:normal;color:#000000;'>Created By: <b>" + zresponse[i].displayname + "</b> (<b>" + zupdatedate + "</b>)</div><br />";
			ztempsearchresults += "<div class='wtw-right' style='min-width:150px;'>Folder Size: <b>" + zdirsize + " MB</b></div><div style='white-space:normal;font-weight:normal;color:#000000;'>Version: <b>[" + zresponse[i].version + "]</b> " + zresponse[i].versiondesc + ".</div><br />";
			ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>Downloaded: <b>" + zdownloads + "</b> times.</div><br />";
			if (zformat > 1) {
				ztempsearchresults += "</div>";
			} else {
				ztempsearchresults += "<br /><hr style=\"width:96%;\" />";
			}
		}
		dGet('wtw_thingtempsearchresults').innerHTML = ztempsearchresults;
		WTW.show('wtw_thingtempsearchresults');
		WTW.setWindowSize();
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-downloads.js-thingSearchReply=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.avatarSearch = async function(zsearch) {
	/* keyword search to find a avatar to download to your instance */
	try {
		WTW.hide('wtw_downloadingnotice');
		WTW.hide('wtw_downloadingnoticequeue');
		WTW.hide('wtw_downloadcomplete');
		zsearch = WTW.encode(zsearch);
		WTW.getAsyncJSON('https://3dnet.walktheweb.com/connect/sharesearch.php?search=' + zsearch + '&webtype=avatar', 
			function(zresponse) {
				wtw3dinternet.avatarSearchReply(JSON.parse(zresponse));
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-downloads.js-avatarSearch=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.avatarSearchReply = function(zresponse) {
	/* receives search results and parses for screen display */
	try {
		var ztempsearchresults = '';
		var zformat = 2;
		if (Number(document.getElementById('wtw_downloadstcols').value) > 0) {
			zformat = Number(document.getElementById('wtw_downloadstcols').value);
		}
		dGet('wtw_avatartempsearchresults').innerHTML = '';
		for (var i=0; i < zresponse.length; i++) {
			var zdownloads = 0;
			var zbuttonstyle = '';
			var zavatarid = zresponse[i].serveravatarid;
			var zcreatedate  = WTW.formatDate(zresponse[i].createdate);
			var zupdatedate  = WTW.formatDate(zresponse[i].updatedate);
			if (WTW.isNumeric(zresponse[i].downloads)) {
				zdownloads = zresponse[i].downloads;
			}
			if (zformat > 1) {
				var zcols = '';
				switch (zformat) {
					case 2:
						zcols = 'wtw-largecol';
						break;
					case 3:
						zcols = 'wtw-medcol';
						break;
					case 4:
						zcols = 'wtw-smallcol';
						break;
				}
				ztempsearchresults += "<div class='" + zcols + "'>";
				zbuttonstyle = "style='margin:2px 2px 5px 5px;'";
			}
			ztempsearchresults += "<h3 class=\"wtw-black\">" + zresponse[i].templatename + "</h3>";
			if (zresponse[i].imageurl != "") {
				ztempsearchresults += "<img id='wtw_search" + zavatarid + "' src='" + zresponse[i].imageurl + "' onmouseover=\"this.style.border='1px solid yellow';\" onmouseout=\"this.style.border='1px solid gray';\" onclick=\"wtw3dinternet.downloadWeb('avatar', '" + btoa(zresponse[i].templatename) + "', '" + zavatarid + "', '" + zavatarid + "', 'avatar');return (false);\" style=\"margin:2%;border:1px solid gray;cursor:pointer;width:96%;height:auto;\" alt='" + zresponse[i].templatename + "' title='" + zresponse[i].templatename + "' />";
			}
			ztempsearchresults += "<br /><input type='button' id='wtw_bavatartempselect" + i + "' class='wtw-searchresultbutton' value='Download' onclick=\"wtw3dinternet.downloadWeb('avatar', '" + btoa(zresponse[i].templatename) + "', '" + zavatarid + "', '" + zavatarid + "', 'avatar');return (false);\" " + zbuttonstyle + " />";
			ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>" + zresponse[i].description + "</div><br />";
			if (zresponse[i].version == '1.0.0') {
				ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>Created By: <b>" + zresponse[i].createdisplayname + "</b> (<b>" + zupdatedate + "</b>)</div><br />";
			} else {
				ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>Created By: <b>" + zresponse[i].createdisplayname + "</b> (<b>" + zcreatedate + "</b>)</div><br />";
				ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>Updated By: <b>" + zresponse[i].displayname + "</b> (<b>" + zupdatedate + "</b>)</div><br />";
			}
			ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>Version: <b>[" + zresponse[i].version + "]</b> " + zresponse[i].versiondesc + ".</div><br />";
			ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>Downloaded: <b>" + zdownloads + "</b> times.</div><br />";
			if (zformat > 1) {
				ztempsearchresults += "</div>";
			} else {
				ztempsearchresults += "<br /><hr style=\"width:96%;\" />";
			}
		}
		dGet('wtw_avatartempsearchresults').innerHTML = ztempsearchresults;
		WTW.show('wtw_avatartempsearchresults');
		WTW.setWindowSize();
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-downloads.js-avatarSearchReply=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.pluginSearch = async function(zsearch) {
	/* keyword search to find a plugin to download to your instance */
	try {
		WTW.hide('wtw_downloadingnotice');
		WTW.hide('wtw_downloadingnoticequeue');
		WTW.hide('wtw_downloadcomplete');
		zsearch = WTW.encode(zsearch);
		WTW.getAsyncJSON('https://3dnet.walktheweb.com/connect/sharesearch.php?search=' + zsearch + '&webtype=plugin', 
			function(zresponse) {
				wtw3dinternet.pluginSearchReply(JSON.parse(zresponse));
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-downloads.js-pluginSearch=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.pluginSearchReply = function(zresponse) {
	/* receives search results and parses for screen display */
	try {
		var ztempsearchresults = '';
		var zformat = 2;
		if (Number(document.getElementById('wtw_downloadstcols').value) > 0) {
			zformat = Number(document.getElementById('wtw_downloadstcols').value);
		}
		dGet('wtw_plugintempsearchresults').innerHTML = '';
		for (var i=0; i < zresponse.length; i++) {
			var zdownloads = 0;
			var zbuttonstyle = '';
			var zpluginid = zresponse[i].serverpluginid;
			var zcreatedate  = WTW.formatDate(zresponse[i].createdate);
			var zupdatedate  = WTW.formatDate(zresponse[i].updatedate);
			if (WTW.isNumeric(zresponse[i].downloads)) {
				zdownloads = zresponse[i].downloads;
			}
			if (zformat > 1) {
				var zcols = '';
				switch (zformat) {
					case 2:
						zcols = 'wtw-largecol';
						break;
					case 3:
						zcols = 'wtw-medcol';
						break;
					case 4:
						zcols = 'wtw-smallcol';
						break;
				}
				ztempsearchresults += "<div class='" + zcols + "'>";
				zbuttonstyle = "style='margin:2px 2px 5px 5px;'";
			}
			ztempsearchresults += "<h3 class=\"wtw-black\">" + zresponse[i].templatename + "</h3><br />[" + zresponse[i].pluginname + "]";
			if (zresponse[i].imageurl != "") {
				ztempsearchresults += "<img id='wtw_search" + zpluginid + "' src='" + zresponse[i].imageurl + "' onmouseover=\"this.style.border='1px solid yellow';\" onmouseout=\"this.style.border='1px solid gray';\" onclick=\"wtw3dinternet.downloadWeb('plugin', '" + btoa(zresponse[i].templatename) + "', '" + zpluginid + "', '" + zpluginid + "', 'plugin');return (false);\" style=\"margin:2%;border:1px solid gray;cursor:pointer;width:96%;height:auto;\" alt='" + zresponse[i].templatename + "' title='" + zresponse[i].templatename + "' />";
			}
			ztempsearchresults += "<br /><input type='button' id='wtw_bplugintempselect" + i + "' class='wtw-searchresultbutton' value='Download' onclick=\"wtw3dinternet.downloadWeb('plugin', '" + btoa(zresponse[i].templatename) + "', '" + zpluginid + "', '" + zpluginid + "', 'plugin');return (false);\" " + zbuttonstyle + " />";
			ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>" + zresponse[i].description + "</div><br />";
			if (zresponse[i].version == '1.0.0') {
				ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>Created By: <b>" + zresponse[i].createdisplayname + "</b> (<b>" + zupdatedate + "</b>)</div><br />";
			} else {
				ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>Created By: <b>" + zresponse[i].createdisplayname + "</b> (<b>" + zcreatedate + "</b>)</div><br />";
				ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>Updated By: <b>" + zresponse[i].displayname + "</b> (<b>" + zupdatedate + "</b>)</div><br />";
			}
			ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>Version: <b>[" + zresponse[i].version + "]</b> " + zresponse[i].versiondesc + ".</div><br />";
			ztempsearchresults += "<div style='white-space:normal;font-weight:normal;color:#000000;'>Downloaded: <b>" + zdownloads + "</b> times.</div><br />";
			ztempsearchresults += "<a href='" + zresponse[i].githuburl + "' target='_blank'>" + zresponse[i].githuburl + "</a><br />";
			if (zformat > 1) {
				ztempsearchresults += "</div>";
			} else {
				ztempsearchresults += "<br /><hr style=\"width:96%;\" />";
			}
		}
		dGet('wtw_plugintempsearchresults').innerHTML = ztempsearchresults;
		WTW.show('wtw_plugintempsearchresults');
		WTW.setWindowSize();
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-downloads.js-pluginSearchReply=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.updateCols = function(zobj, zcols) {
	try {
		dGet('wtw_downloadstcols').value = zcols;
		dGet('wtw_downloadscol1').className = 'wtw-tinyimg';
		dGet('wtw_downloadscol2').className = 'wtw-tinyimg';
		dGet('wtw_downloadscol3').className = 'wtw-tinyimg';
		dGet('wtw_downloadscol4').className = 'wtw-tinyimg';
		dGet('wtw_downloadscol1').src = dGet('wtw_downloadscol1').src.replace('set','');
		dGet('wtw_downloadscol2').src = dGet('wtw_downloadscol2').src.replace('set','');
		dGet('wtw_downloadscol3').src = dGet('wtw_downloadscol3').src.replace('set','');
		dGet('wtw_downloadscol4').src = dGet('wtw_downloadscol4').src.replace('set','');
		dGet(zobj.id).className = 'wtw-tinyimgselected';
		zobj.src = zobj.src.replace(zobj.id.replace('wtw_downloads','') + '.png', zobj.id.replace('wtw_downloads','') + 'set.png');
		if (dGet('wtw_2downloadscol1') != null) {
			dGet('wtw_2downloadscol1').className = dGet('wtw_downloadscol1').className;
			dGet('wtw_2downloadscol2').className = dGet('wtw_downloadscol2').className;
			dGet('wtw_2downloadscol3').className = dGet('wtw_downloadscol3').className;
			dGet('wtw_2downloadscol4').className = dGet('wtw_downloadscol4').className;
			dGet('wtw_2downloadscol1').src = dGet('wtw_downloadscol1').src;
			dGet('wtw_2downloadscol2').src = dGet('wtw_downloadscol2').src;
			dGet('wtw_2downloadscol3').src = dGet('wtw_downloadscol3').src;
			dGet('wtw_2downloadscol4').src = dGet('wtw_downloadscol4').src;
		}
		if (dGet('searchcommunitiesdiv') != null) {
			/* used by WTW Downloads page */
			if (dGet('searchcommunitiesdiv').style.display != 'none') {
				if (dGet('wtw_tcommunitysearch') != null) {
					wtw3dinternet.communitySearch(dGet('wtw_tcommunitysearch').value);
				}
			} else if (dGet('searchbuildingsdiv').style.display != 'none') {
				if (dGet('wtw_tbuildingsearch') != null) {
					wtw3dinternet.buildingSearch(dGet('wtw_tbuildingsearch').value);
				}
			} else if (dGet('searchthingsdiv').style.display != 'none') {
				if (dGet('wtw_tthingsearch') != null) {
					wtw3dinternet.thingSearch(dGet('wtw_tthingsearch').value);
				}
			} else if (dGet('searchavatarsdiv').style.display != 'none') {
				if (dGet('wtw_tavatarsearch') != null) {
					wtw3dinternet.avatarSearch(dGet('wtw_tavatarsearch').value);
				}
			} else if (dGet('searchpluginsdiv').style.display != 'none') {
				if (dGet('wtw_tpluginsearch') != null) {
					wtw3dinternet.pluginSearch(dGet('wtw_tpluginsearch').value);
				}
			}
		} else {
			/* used by install */
			if (dGet('wtw_tbuildingsearch') != null) {
				wtw3dinternet.buildingSearch(dGet('wtw_tbuildingsearch').value);
			} else if (dGet('wtw_tcommunitysearch') != null) {
				wtw3dinternet.communitySearch(dGet('wtw_tcommunitysearch').value);
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-downloads.js-updateCols=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.downloadWeb = async function(ztrigger, ztemplatename, zwebid, znewwebid, zwebtype, zusertoken, zparentwebid, zparentwebtype, zoriginalnewwebid, zoriginalwebtype) {
	/* This process takes the selected 3D Web and downloads a copy to the local instance */
	try {
		if (zusertoken == undefined) {
			zusertoken = '';
		}
		if (zparentwebid == undefined) {
			zparentwebid = '';
		}
		if (zparentwebtype == undefined) {
			zparentwebtype = '';
		}
		WTW.hide('wtw_commtempsearchresults');
		WTW.hide('wtw_buildtempsearchresults');
		WTW.hide('wtw_thingtempsearchresults');
		WTW.hide('wtw_avatartempsearchresults');
		WTW.hide('wtw_downloadcomplete');
		if (dGet('wtw_downloadingnotice') != null || dGet('wtw_downloadingnoticequeue') != null) {
			/* create download progress box */
			var zdownloadbox = document.createElement('div');
			zdownloadbox.id = 'wtw_downloadbox-' + zwebtype + '-' + zwebid;
			zdownloadbox.className = 'wtw-servicelisting-invoice';
			var zdownloadtitle = document.createElement('h3');
			zdownloadtitle.className = 'wtw-black';
			zdownloadtitle.innerHTML = 'Downloading ' + atob(ztemplatename);
			zdownloadbox.appendChild(zdownloadtitle);
			var zdownloadprogress = document.createElement('div');
			zdownloadprogress.id = 'wtw_downloadprogress-' + zwebtype + '-' + zwebid;
			zdownloadprogress.className = 'wtw-iprogressbar';
			zdownloadprogress.style.width = '5%';
			var zdownloadprogressdiv = document.createElement('div');
			zdownloadprogressdiv.className = 'wtw-iprogressdiv';
			zdownloadprogressdiv.appendChild(zdownloadprogress);
			zdownloadbox.appendChild(zdownloadprogressdiv);
			var zdownloadstagename = document.createElement('div');
			zdownloadstagename.id = 'wtw_downloadstagename-' + zwebtype + '-' + zwebid;
			zdownloadstagename.innerHTML = 'Downloading New 3D Web Settings';
			zdownloadbox.appendChild(zdownloadstagename);
			var zdownloaderror = document.createElement('div');
			zdownloaderror.id = 'wtw_downloaderror-' + zwebtype + '-' + zwebid;
			zdownloaderror.className = 'wtw-error';
			zdownloadbox.appendChild(zdownloaderror);
			if (ztrigger == 'queue') {
				dGet('wtw_downloadingnoticequeue').appendChild(zdownloadbox);
			} else {
				dGet('wtw_downloadingnotice').appendChild(zdownloadbox);
			}
		}
		WTW.show('wtw_downloadingnotice');
		WTW.show('wtw_downloadingnoticequeue');
		if (zwebtype == 'avatar') {
			var zrequest = {
				'webid': zwebid,
				'newwebid': znewwebid,
				'usertoken': zusertoken,
				'function':'downloadavatarprogress'
			};
			WTW.postAsyncJSON('/core/handlers/wtw-3dinternet-downloads.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					znewwebid = zresponse.newwebid;
					if (dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid) != null) {
						dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid).style.width = '20%';
					}
					wtw3dinternet.downloadAvatarProgress(zwebid, znewwebid, zwebtype, ztemplatename, 1, zresponse)
				}
			);
		} else {
			var zisinstall = true;
			var zbuildingid = '';
			var zcommunityid = '';
			var zbuildingpositionx = 0;
			var zbuildingpositiony = 0;
			var zbuildingpositionz = 0;
			var zbuildingscalingx = 1;
			var zbuildingscalingy = 1;
			var zbuildingscalingz = 1;
			var zbuildingrotationx = 0;
			var zbuildingrotationy = 0;
			var zbuildingrotationz = 0;
			if (WTW.adminView != undefined) {
				if (WTW.adminView == 1) {
					zisinstall = false;
				}
			}
			if (zisinstall && zwebtype == 'building') {
				if (dGet('wtw_tcommunityid') != null) {
					if (dGet('wtw_tcommunityid') != null) {
						zcommunityid = dGet('wtw_tcommunityid').value;
					}
				}
			}
			/* multiple calls so we can update the progress */
			var zrequest = {
				'webid': zwebid,
				'newwebid': znewwebid,
				'webtype': zwebtype,
				'usertoken': zusertoken,
				'parentwebid':zparentwebid,
				'parentwebtype':zparentwebtype,
				'communityid': zcommunityid,
				'buildingpositionx': zbuildingpositionx,
				'buildingpositiony': zbuildingpositiony,
				'buildingpositionz': zbuildingpositionz,
				'buildingscalingx': zbuildingscalingx,
				'buildingscalingy': zbuildingscalingy,
				'buildingscalingz': zbuildingscalingz,
				'buildingrotationx': zbuildingrotationx,
				'buildingrotationy': zbuildingrotationy,
				'buildingrotationz': zbuildingrotationz,
				'function':'downloadwebprogress'
			};
			WTW.postAsyncJSON('/core/handlers/wtw-3dinternet-downloads.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					if (zresponse.serror == '') {
						if (zoriginalnewwebid == undefined) {
							zoriginalnewwebid = zresponse.newwebid;
						}
						if (zoriginalwebtype == undefined) {
							zoriginalwebtype = zwebtype;
						}

						if (dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid) != null) {
							dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid).style.width = '15%';
						}
						wtw3dinternet.downloadWebProgress(zoriginalnewwebid, zoriginalwebtype, ztemplatename, 1, zresponse);
					} else {
						
					}
				}
			);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-downloads.js-downloadWeb=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.downloadAvatarProgress = async function(zwebid, znewwebid, zwebtype, ztemplatename, zstage, zresponse) {
	/* process download and report progress */
	try {
		var zprocess = false;
		var zpercent = 0;
		var zstagename = 'Processing 3D Web';
		var zusertoken = '';
		var zobjectfolder = '';
		var zavatargroup = '';
		var znewcreateuserid = '';
		var znewupdateuserid = '';
		var zdataarray = [];
		if (zresponse.usertoken != undefined) {
			zusertoken = zresponse.usertoken;
		}
		if (zresponse.objectfolder != undefined) {
			zobjectfolder = zresponse.objectfolder;
		}
		if (zresponse.avatargroup != undefined) {
			zavatargroup = zresponse.avatargroup;
		}
		if (zresponse.newcreateuserid != undefined) {
			znewcreateuserid = zresponse.newcreateuserid;
		}
		if (zresponse.newupdateuserid != undefined) {
			znewupdateuserid = zresponse.newupdateuserid;
		}
		if (zresponse.dataarray != undefined) {
			zdataarray = zresponse.dataarray;
		}
		var zrequest = [];
		switch (zstage) {
			case 1:
				/* download 3D Avatar Settings */
				zstagename = 'Processing 3D Avatar Settings';
				zpercent = 10;
				if (zdataarray != undefined) {
					zprocess = true;
					zrequest = {
						'newwebid':znewwebid,
						'objectfolder':zobjectfolder,
						'usertoken':zusertoken,
						'dataarray':JSON.stringify(zdataarray),
						'function':'downloadmainavatar'
					};
				}
				break;
			case 2:
				/* download avatar files */
				zstagename = 'Processing 3D Avatar Files';
				zpercent = 20;
				if (zdataarray.files != undefined) {
					zprocess = true;
					zrequest = {
						'webid':zwebid,
						'objectfolder':zobjectfolder,
						'usertoken':zusertoken,
						'dataarray':JSON.stringify(zdataarray.files),
						'function':'downloadavatarfiles'
					};
				}
				break;
			case 3:
				/* download avatar group */
				zstagename = 'Processing Avatar Group';
				zpercent = 5;
				if (zavatargroup != undefined) {
					zprocess = true;
					zrequest = {
						'avatargroup':zavatargroup,
						'newcreateuserid':znewcreateuserid,
						'newupdateuserid':znewupdateuserid,
						'usertoken':zusertoken,
						'function':'downloadavatargroup'
					};
				}
				break;
			case 4:
				/* download avatar parts */
				zstagename = 'Processing Avatar Parts';
				zpercent = 10;
				if (zdataarray.avatarparts != undefined) {
					zprocess = true;
					zrequest = {
						'newwebid':znewwebid,
						'usertoken':zusertoken,
						'dataarray':JSON.stringify(zdataarray.avatarparts),
						'function':'downloadavatarparts'
					};
				}
				break;
			case 5:
				/* download avatar animations */
				zstagename = 'Processing Avatar Animations';
				zpercent = 25;
				if (zdataarray.avataranimationdefs != undefined) {
					zprocess = true;
					zrequest = {
						'newwebid':znewwebid,
						'objectfolder':zobjectfolder,
						'usertoken':zusertoken,
						'dataarray':JSON.stringify(zdataarray.avataranimationdefs),
						'function':'downloadavataranimations'
					};
				}
				break;
			case 6:
				/* download content ratings */
				zstagename = 'Processing Content Ratings';
				zpercent = 5;
				if (zdataarray.contentratings != undefined) {
					zprocess = true;
					zrequest = {
						'newwebid':znewwebid,
						'usertoken':zusertoken,
						'dataarray':JSON.stringify(zdataarray.contentratings),
						'function':'downloadcontentratings'
					};
				}
				break;
			default:
				/* all levels are done */
				zstage = 99;
				break;
		}

		if (zstage < 99 && zprocess) {
			if (dGet('wtw_downloadstagename-' + zwebtype + '-' + zwebid) != null) {
				dGet('wtw_downloadstagename-' + zwebtype + '-' + zwebid).innerHTML = zstagename;
				WTW.show('wtw_downloadstagename-' + zwebtype + '-' + zwebid);
			}
			WTW.postAsyncJSON('/core/handlers/wtw-3dinternet-downloads.php', zrequest, 
				function(zresponse2) {
					zresponse2 = JSON.parse(zresponse2);
					/* note serror would contain errors */

					if (zresponse2.serror == '') {
						if (dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid) != null) {
							var zfullpercent = Number(dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid).style.width.replace('%',''));
							zfullpercent += zpercent;
							dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid).style.width = zfullpercent + '%';
						}
						wtw3dinternet.downloadAvatarProgress(zwebid, znewwebid, zwebtype, ztemplatename, zstage + 1, zresponse);
					} else {
						if (dGet('wtw_downloaderror-' + zwebtype + '-' + zwebid) != null) {
							dGet('wtw_downloaderror-' + zwebtype + '-' + zwebid).innerHTML = zresponse2.serror;
						}
					}
				}
			);
		} else {
			/* if a download level is skipped */
			if (zstage < 99) {
				/* move to the next */
				if (dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid) != null) {
					var zfullpercent = Number(dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid).style.width.replace('%',''));
					zfullpercent += zpercent;
					dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid).style.width = zfullpercent + '%';
				}
				wtw3dinternet.downloadAvatarProgress(zwebid, znewwebid, zwebtype, ztemplatename, zstage + 1, zresponse);
			} else {
				if (dGet('wtw_downloadingnotice') != null || dGet('wtw_downloadingnoticequeue') != null) {
					/* no more stages - show complete */
					if (dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid) != null) {
						dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid).style.width = '100%';
					}
					if (dGet('wtw_downloadstagename-' + zwebtype + '-' + zwebid) != null) {
						dGet('wtw_downloadstagename-' + zwebtype + '-' + zwebid).innerHTML = 'Download Completed';
					}
					window.setTimeout(function(){
						if (dGet('wtw_downloadbox-' + zwebtype + '-' + zwebid) != null) {
							dGet('wtw_downloadbox-' + zwebtype + '-' + zwebid).remove();
						}
						/* hide download queue if there are no more downloads in it */
						if (dGet('wtw_downloadqueuelistdiv') != null) {
							if (dGet('wtw_downloadqueuelistdiv').hasChildNodes() == false) {
								WTW.hide('wtw_downloadqueue');
							}
						}
						/* make sure all download boxes are closed before closing */
						if (dGet('wtw_downloadingnotice').hasChildNodes() == false) {
							WTW.hide('wtw_downloadingnotice');
							WTW.hide('wtw_downloadingnoticequeue');
							wtw3dinternet.completedWebDownload(znewwebid, zwebtype);
						}
					},1000);
				} else {
					WTW.hide('wtw_downloadingnotice');
					WTW.hide('wtw_downloadingnoticequeue');
					wtw3dinternet.completedWebDownload(znewwebid, zwebtype);
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-downloads.js-downloadAvatarProgress=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.downloadWebProgress = async function(zoriginalnewwebid, zoriginalwebtype, ztemplatename, zstage, zresponse) {
	/* process download and report progress */
	try {
		var zprocess = false;
		var zpercent = 0;
		var zstagename = 'Processing 3D Web';
		var zwebid = '';
		var zwebtype = '';
		var znewwebid = '';
		var znewcommunityid = '';
		var znewbuildingid = '';
		var znewthingid = '';
		var zusertoken = '';
		var zparentwebid = '';
		var zparentwebtype = '';
		var znewfolder = '';
		var znewurl = '';
		var zbuildingpositionx = 0;
		var zbuildingpositiony = 0;
		var zbuildingpositionz = 0;
		var zbuildingscalingx = 1;
		var zbuildingscalingy = 1;
		var zbuildingscalingz = 1;
		var zbuildingrotationx = 0;
		var zbuildingrotationy = 0;
		var zbuildingrotationz = 0;
		var zdataarray = [];
		var zisinstall = true;
		if (WTW.adminView != undefined) {
			if (WTW.adminView == 1) {
				zisinstall = false;
			}
		}
		if (zresponse.webid != undefined) {
			zwebid = zresponse.webid;
		}
		if (zresponse.webtype != undefined) {
			zwebtype = zresponse.webtype;
		}
		if (zresponse.newwebid != undefined) {
			znewwebid = zresponse.newwebid;
		}
		if (zresponse.usertoken != undefined) {
			zusertoken = zresponse.usertoken;
		}
		if (zresponse.parentwebid != undefined) {
			zparentwebid = zresponse.parentwebid;
		}
		if (zresponse.parentwebtype != undefined) {
			zparentwebtype = zresponse.parentwebtype;
		}
		if (zresponse.newfolder != undefined) {
			znewfolder = zresponse.newfolder;
		}
		if (zresponse.newurl != undefined) {
			znewurl = zresponse.newurl;
		}
		if (zresponse.buildingpositionx != undefined) {
			if (WTW.isNumeric(zresponse.buildingpositionx)) {
				zbuildingpositionx = zresponse.buildingpositionx;
			}
		}
		if (zresponse.buildingpositiony != undefined) {
			if (WTW.isNumeric(zresponse.buildingpositiony)) {
				zbuildingpositiony = zresponse.buildingpositiony;
			}
		}
		if (zresponse.buildingpositionz != undefined) {
			if (WTW.isNumeric(zresponse.buildingpositionz)) {
				zbuildingpositionz = zresponse.buildingpositionz;
			}
		}
		if (zresponse.buildingscalingx != undefined) {
			if (WTW.isNumeric(zresponse.buildingscalingx)) {
				zbuildingscalingx = zresponse.buildingscalingx;
			}
		}
		if (zresponse.buildingscalingy != undefined) {
			if (WTW.isNumeric(zresponse.buildingscalingy)) {
				zbuildingscalingy = zresponse.buildingscalingy;
			}
		}
		if (zresponse.buildingscalingz != undefined) {
			if (WTW.isNumeric(zresponse.buildingscalingz)) {
				zbuildingscalingz = zresponse.buildingscalingz;
			}
		}
		if (zresponse.buildingrotationx != undefined) {
			if (WTW.isNumeric(zresponse.buildingrotationx)) {
				zbuildingrotationx = zresponse.buildingrotationx;
			}
		}
		if (zresponse.buildingrotationy != undefined) {
			if (WTW.isNumeric(zresponse.buildingrotationy)) {
				zbuildingrotationy = zresponse.buildingrotationy;
			}
		}
		if (zresponse.buildingrotationz != undefined) {
			if (WTW.isNumeric(zresponse.buildingrotationz)) {
				zbuildingrotationz = zresponse.buildingrotationz;
			}
		}
		if (zresponse.dataarray != undefined) {
			zdataarray = zresponse.dataarray;
		}
		switch (zwebtype) {
			case 'community':
				znewcommunityid = znewwebid;
				break;
			case 'building':
				znewbuildingid = znewwebid;
				break;
			case 'thing':
				znewthingid = znewwebid;
				break;
		}
		var zrequest = [];
		switch (zstage) {
			case 1:
				/* download users */
				zstagename = 'Processing Users';
				zpercent = 2;
				if (zdataarray.users != undefined) {
					zprocess = true;
					zrequest = {
						'usertoken':zusertoken,
						'dataarray':JSON.stringify(zdataarray.users),
						'function':'downloadusers'
					};
				}
				break;
			case 2:
				/* download uploads */
				zstagename = 'Processing Uploads';
				zpercent = 10;
				if (zdataarray.uploads != undefined) {
					zprocess = true;
					zrequest = {
						'newfolder':znewfolder,
						'newurl':znewurl,
						'usertoken':zusertoken,
						'dataarray':JSON.stringify(zdataarray.uploads),
						'function':'downloaduploads'
					};
				}
				break;
			case 3:
				/* download main web */
				zstagename = 'Processing Main 3D Web';
				zpercent = 2;
				if (zdataarray != undefined) {
					var zdataarray2 = {
						'snapshotid':zdataarray.snapshotid,
						'userid':zdataarray.userid,
						'shareuserid':zdataarray.shareuserid,
						'createuserid':zdataarray.createuserid,
						'updateuserid':zdataarray.updateuserid,
						'versionid':zdataarray.versionid,
						'version':zdataarray.version,
						'versionorder':zdataarray.versionorder,
						'versiondesc':zdataarray.versiondesc,
						'positionx':zdataarray.positionx,
						'positiony':zdataarray.positiony,
						'positionz':zdataarray.positionz,
						'scalingx':zdataarray.scalingx,
						'scalingy':zdataarray.scalingy,
						'scalingz':zdataarray.scalingz,
						'rotationx':zdataarray.rotationx,
						'rotationy':zdataarray.rotationy,
						'rotationz':zdataarray.rotationz,
						'gravity':zdataarray.gravity,
						'templatename':zdataarray.templatename,
						'tags':zdataarray.tags,
						'description':zdataarray.description,
						'alttag':zdataarray.alttag
					};
					switch (zwebtype) {
						case 'community':
							zdataarray2['communityid'] = zdataarray.communityid;
							zdataarray2['communityname'] = zdataarray.communityname;
							zdataarray2['communitydescription'] = zdataarray.communitydescription;
							zdataarray2['textureid'] = zdataarray.textureid;
							zdataarray2['skydomeid'] = zdataarray.skydomeid;
							zdataarray2['groundpositiony'] = zdataarray.groundpositiony;
							zdataarray2['waterpositiony'] = zdataarray.waterpositiony;
							zdataarray2['waterbumpheight'] = zdataarray.waterbumpheight;
							zdataarray2['watersubdivisions'] = zdataarray.watersubdivisions;
							zdataarray2['windforce'] = zdataarray.windforce;
							zdataarray2['winddirectionx'] = zdataarray.winddirectionx;
							zdataarray2['winddirectiony'] = zdataarray.winddirectiony;
							zdataarray2['winddirectionz'] = zdataarray.winddirectionz;
							zdataarray2['waterwaveheight'] = zdataarray.waterwaveheight;
							zdataarray2['waterwavelength'] = zdataarray.waterwavelength;
							zdataarray2['watercolorrefraction'] = zdataarray.watercolorrefraction;
							zdataarray2['watercolorreflection'] = zdataarray.watercolorreflection;
							zdataarray2['watercolorblendfactor'] = zdataarray.watercolorblendfactor;
							zdataarray2['watercolorblendfactor2'] = zdataarray.watercolorblendfactor2;
							zdataarray2['wateralpha'] = zdataarray.wateralpha;
							zdataarray2['waterbumpid'] = zdataarray.waterbumpid;
							zdataarray2['sceneambientcolor'] = zdataarray.sceneambientcolor;
							zdataarray2['sceneclearcolor'] = zdataarray.sceneclearcolor;
							zdataarray2['sceneuseclonedmeshmap'] = zdataarray.sceneuseclonedmeshmap;
							zdataarray2['sceneblockmaterialdirtymechanism'] = zdataarray.sceneblockmaterialdirtymechanism;
							zdataarray2['sundirectionalintensity'] = zdataarray.sundirectionalintensity;
							zdataarray2['sundiffusecolor'] = zdataarray.sundiffusecolor;
							zdataarray2['sunspecularcolor'] = zdataarray.sunspecularcolor;
							zdataarray2['sungroundcolor'] = zdataarray.sungroundcolor;
							zdataarray2['sundirectionx'] = zdataarray.sundirectionx;
							zdataarray2['sundirectiony'] = zdataarray.sundirectiony;
							zdataarray2['sundirectionz'] = zdataarray.sundirectionz;
							zdataarray2['backlightintensity'] = zdataarray.backlightintensity;
							zdataarray2['backlightdirectionx'] = zdataarray.backlightdirectionx;
							zdataarray2['backlightdirectiony'] = zdataarray.backlightdirectiony;
							zdataarray2['backlightdirectionz'] = zdataarray.backlightdirectionz;
							zdataarray2['backlightdiffusecolor'] = zdataarray.backlightdiffusecolor;
							zdataarray2['backlightspecularcolor'] = zdataarray.backlightspecularcolor;
							zdataarray2['scenefogenabled'] = zdataarray.scenefogenabled;
							zdataarray2['scenefogmode'] = zdataarray.scenefogmode;
							zdataarray2['scenefogdensity'] = zdataarray.scenefogdensity;
							zdataarray2['scenefogstart'] = zdataarray.scenefogstart;
							zdataarray2['scenefogend'] = zdataarray.scenefogend;
							zdataarray2['scenefogcolor'] = zdataarray.scenefogcolor;
							zdataarray2['skytype'] = zdataarray.skytype;
							zdataarray2['skysize'] = zdataarray.skysize;
							zdataarray2['skyboxfolder'] = zdataarray.skyboxfolder;
							zdataarray2['skyboxfile'] = zdataarray.skyboxfile;
							zdataarray2['skyboximageleft'] = zdataarray.skyboximageleft;
							zdataarray2['skyboximageup'] = zdataarray.skyboximageup;
							zdataarray2['skyboximagefront'] = zdataarray.skyboximagefront;
							zdataarray2['skyboximageright'] = zdataarray.skyboximageright;
							zdataarray2['skyboximagedown'] = zdataarray.skyboximagedown;
							zdataarray2['skyboximageback'] = zdataarray.skyboximageback;
							zdataarray2['skypositionoffsetx'] = zdataarray.skypositionoffsetx;
							zdataarray2['skypositionoffsety'] = zdataarray.skypositionoffsety;
							zdataarray2['skypositionoffsetz'] = zdataarray.skypositionoffsetz;
							zdataarray2['skyboxmicrosurface'] = zdataarray.skyboxmicrosurface;
							zdataarray2['skyboxpbr'] = zdataarray.skyboxpbr;
							zdataarray2['skyboxasenvironmenttexture'] = zdataarray.skyboxasenvironmenttexture;
							zdataarray2['skyboxblur'] = zdataarray.skyboxblur;
							zdataarray2['skyboxdiffusecolor'] = zdataarray.skyboxdiffusecolor;
							zdataarray2['skyboxspecularcolor'] = zdataarray.skyboxspecularcolor;
							zdataarray2['skyboxambientcolor'] = zdataarray.skyboxambientcolor;
							zdataarray2['skyboxemissivecolor'] = zdataarray.skyboxemissivecolor;
							zdataarray2['skyinclination'] = zdataarray.skyinclination;
							zdataarray2['skyluminance'] = zdataarray.skyluminance;
							zdataarray2['skyazimuth'] = zdataarray.skyazimuth;
							zdataarray2['skyrayleigh'] = zdataarray.skyrayleigh;
							zdataarray2['skyturbidity'] = zdataarray.skyturbidity;
							zdataarray2['skymiedirectionalg'] = zdataarray.skymiedirectionalg;
							zdataarray2['skymiecoefficient'] = zdataarray.skymiecoefficient;
							zdataarray2['buildingpositionx'] = zdataarray.buildingpositionx;
							zdataarray2['buildingpositiony'] = zdataarray.buildingpositiony;
							zdataarray2['buildingpositionz'] = zdataarray.buildingpositionz;
							zdataarray2['buildingscalingx'] = zdataarray.buildingscalingx;
							zdataarray2['buildingscalingy'] = zdataarray.buildingscalingy;
							zdataarray2['buildingscalingz'] = zdataarray.buildingscalingz;
							zdataarray2['buildingrotationx'] = zdataarray.buildingrotationx;
							zdataarray2['buildingrotationy'] = zdataarray.buildingrotationy;
							zdataarray2['buildingrotationz'] = zdataarray.buildingrotationz;
							break;
						case 'building':
							zdataarray2['buildingid'] = zdataarray.buildingid;
							zdataarray2['buildingname'] = zdataarray.buildingname;
							zdataarray2['buildingdescription'] = zdataarray.buildingdescription;
							break;
						case 'thing':
							zdataarray2['thingid'] = zdataarray.thingid;
							zdataarray2['thingname'] = zdataarray.thingname;
							zdataarray2['thingdescription'] = zdataarray.thingdescription;
							break;
					}
					zprocess = true;
					zrequest = {
						'webtype':zwebtype,
						'newwebid':znewwebid,
						'parentwebtype':zparentwebtype,
						'parentwebid':zparentwebid,
						'usertoken':zusertoken,
						'dataarray':JSON.stringify(zdataarray2),
						'function':'downloadmainweb'
					};
				}
				break;
			case 4:
				/* download avataranimations */
				zstagename = 'Processing Avatar Animations';
				zpercent = 6;
				if (zdataarray.avataranimations != undefined) {
					zprocess = true;
					zrequest = {
						'newfolder':znewfolder,
						'usertoken':zusertoken,
						'dataarray':JSON.stringify(zdataarray.avataranimations),
						'function':'downloadactionzonesavataranimations'
					};
				}
				break;
			case 5:
				/* download actionzones */
				zstagename = 'Processing Action Zones';
				zpercent = 2;
				if (zdataarray.actionzones != undefined) {
					zprocess = true;
					zrequest = {
						'newcommunityid':znewcommunityid,
						'newbuildingid':znewbuildingid,
						'newthingid':znewthingid,
						'usertoken':zusertoken,
						'dataarray':JSON.stringify(zdataarray.actionzones),
						'function':'downloadactionzones'
					};
				}
				break;
			case 6:
				/* download scripts */
				zstagename = 'Processing Scripts';
				zpercent = 5;
				if (zdataarray.scripts != undefined) {
					zprocess = true;
					zrequest = {
						'newfolder':znewfolder,
						'usertoken':zusertoken,
						'dataarray':JSON.stringify(zdataarray.scripts),
						'function':'downloadscripts'
					};
				}
				break;
			case 7:
				/* download connectinggrids */
				zstagename = 'Processing Connecting Grids';
				zpercent = 2;
				if (zdataarray.connectinggrids != undefined) {
					zprocess = true;
					zrequest = {
						'newwebid':znewwebid,
						'usertoken':zusertoken,
						'dataarray':JSON.stringify(zdataarray.connectinggrids),
						'function':'downloadconnectinggrids'
					};
				}
				break;
			case 8:
				/* download contentratings */
				zstagename = 'Processing Content Ratings';
				zpercent = 2;
				if (zdataarray.contentratings != undefined) {
					zprocess = true;
					zrequest = {
						'newwebid':znewwebid,
						'usertoken':zusertoken,
						'dataarray':JSON.stringify(zdataarray.contentratings),
						'function':'downloadcontentratings'
					};
				}
				break;
			case 9:
				/* download pluginsrequired */
				zstagename = 'Processing Plugins Required';
				zpercent = 2;
				if (zdataarray.pluginsrequired != undefined) {
					zprocess = true;
					zrequest = {
						'newwebid':znewwebid,
						'usertoken':zusertoken,
						'dataarray':JSON.stringify(zdataarray.pluginsrequired),
						'function':'downloadpluginsrequired'
					};
				}
				break;
			case 10:
				/* download uploadobjects (3D Models) */
				zstagename = 'Processing 3D Models';
				zpercent = 20;
				if (zdataarray.uploadobjects != undefined) {
					zprocess = true;
					zrequest = {
						'newfolder':znewfolder,
						'newurl':znewurl,
						'usertoken':zusertoken,
						'dataarray':JSON.stringify(zdataarray.uploadobjects),
						'function':'downloaduploadobjects'
					};
				}
				break;
			case 11:
				/* download molds */
				zstagename = 'Processing Molds';
				zpercent = 15;
				if (zdataarray.molds != undefined) {
					zprocess = true;
					zrequest = {
						'webtype':zwebtype,
						'newwebid':znewwebid,
						'usertoken':zusertoken,
						'dataarray':JSON.stringify(zdataarray.molds),
						'function':'downloadmolds'
					};
				}
				break;
			case 12:
				/* add first building if applicable */
				zstagename = 'Processing First Building';
				zpercent = 2;
				if (zisinstall && zwebtype == 'building' && zoriginalwebtype == 'community' && zoriginalnewwebid != '') {
					/* this step is disabled */
					zprocess = false;
					zrequest = {
						'newwebid':znewwebid,
						'webtype':zwebtype,
						'communityid':zoriginalnewwebid,
						'buildingpositionx':zbuildingpositionx,
						'buildingpositiony':zbuildingpositiony,
						'buildingpositionz':zbuildingpositionz,
						'buildingscalingx':zbuildingscalingx,
						'buildingscalingy':zbuildingscalingy,
						'buildingscalingz':zbuildingscalingz,
						'buildingrotationx':zbuildingrotationx,
						'buildingrotationy':zbuildingrotationy,
						'buildingrotationz':zbuildingrotationz,
						'usertoken':zusertoken,
						'function':'downloadaddfirstbuilding'
					};
				}
				break;
			case 13:
				/* download child connectinggrids */
				zstagename = 'Processing Child Connecting Grids and 3D Webs';
				zpercent = 15;
				if (zdataarray.childconnectinggrids != undefined) {
					zprocess = true;
					zrequest = {
						'newwebid':znewwebid,
						'webtype':zwebtype,
						'usertoken':zusertoken,
						'dataarray':JSON.stringify(zdataarray.childconnectinggrids),
						'function':'downloadchildconnectinggrids'
					};
				}
				break;
			default:
				/* all levels are done */
				zstage = 99;
				break;
		}

		if (zstage < 99 && zprocess) {
			if (dGet('wtw_downloadstagename-' + zwebtype + '-' + zwebid) != null) {
				dGet('wtw_downloadstagename-' + zwebtype + '-' + zwebid).innerHTML = zstagename;
				WTW.show('wtw_downloadstagename-' + zwebtype + '-' + zwebid);
			}
			WTW.postAsyncJSON('/core/handlers/wtw-3dinternet-downloads.php', zrequest, 
				function(zresponse2) {
					zresponse2 = JSON.parse(zresponse2);
					/* note serror would contain errors */
					if (zstage == 13) {
						if (zresponse2[0].serror == '') {
							/* returned more 3D Webs to download */
							for (var i=0;i<zresponse2.length;i++) {
								if (zresponse2[i] != null) {
									if (zresponse2[i].webid != undefined) {
										if (zresponse2[i].webid != '') {
											/* note childtemplatename is returned btoa() */
											wtw3dinternet.downloadWeb('child', zresponse2[i].childtemplatename, zresponse2[i].webid, zresponse2[i].newwebid, zresponse2[i].webtype, zusertoken, zresponse2[i].parentwebid, zresponse2[i].parentwebtype, zoriginalnewwebid, zoriginalwebtype);
										}
									}
								}
							}
							if (dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid) != null) {
								var zfullpercent = Number(dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid).style.width.replace('%',''));
								zfullpercent += zpercent;
								dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid).style.width = zfullpercent + '%';
							}
							wtw3dinternet.downloadWebProgress(zoriginalnewwebid, zoriginalwebtype, ztemplatename, zstage + 1, zresponse);
						} else {
							if (dGet('wtw_downloaderror-' + zwebtype + '-' + zwebid) != null) {
								dGet('wtw_downloaderror-' + zwebtype + '-' + zwebid).innerHTML = zresponse2[0].serror;
							}
						}
					} else {
						if (zresponse2.serror == '') {
							if (dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid) != null) {
								var zfullpercent = Number(dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid).style.width.replace('%',''));
								zfullpercent += zpercent;
								dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid).style.width = zfullpercent + '%';
							}
							wtw3dinternet.downloadWebProgress(zoriginalnewwebid, zoriginalwebtype, ztemplatename, zstage + 1, zresponse);
						} else {
							if (dGet('wtw_downloaderror-' + zwebtype + '-' + zwebid) != null) {
								dGet('wtw_downloaderror-' + zwebtype + '-' + zwebid).innerHTML = zresponse2.serror;
							}
						}
					}
				}
			);
		} else {
			/* if a download level is skipped */
			if (zstage < 99) {
				/* move to the next */
				if (dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid) != null) {
					var zfullpercent = Number(dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid).style.width.replace('%',''));
					zfullpercent += zpercent;
					dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid).style.width = zfullpercent + '%';
				}
				wtw3dinternet.downloadWebProgress(zoriginalnewwebid, zoriginalwebtype, ztemplatename, zstage + 1, zresponse);
			} else {
				if (dGet('wtw_downloadingnotice') != null || dGet('wtw_downloadingnoticequeue') != null) {
					/* no more stages - show complete */
					if (dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid) != null) {
						dGet('wtw_downloadprogress-' + zwebtype + '-' + zwebid).style.width = '100%';
					}
					if (dGet('wtw_downloadstagename-' + zwebtype + '-' + zwebid) != null) {
						dGet('wtw_downloadstagename-' + zwebtype + '-' + zwebid).innerHTML = 'Download Completed';
					}
					window.setTimeout(function(){
						if (dGet('wtw_downloadbox-' + zwebtype + '-' + zwebid) != null) {
							dGet('wtw_downloadbox-' + zwebtype + '-' + zwebid).remove();
						}
						/* hide download queue if there are no more downloads in it */
						if (dGet('wtw_downloadqueuelistdiv') != null) {
							if (dGet('wtw_downloadqueuelistdiv').hasChildNodes() == false) {
								WTW.hide('wtw_downloadqueue');
							}
						}
						/* make sure all download boxes are closed before closing */
						if (dGet('wtw_downloadingnotice').hasChildNodes() == false) {
							WTW.hide('wtw_downloadingnotice');
							WTW.hide('wtw_downloadingnoticequeue');
							wtw3dinternet.completedWebDownload(zoriginalnewwebid, zoriginalwebtype);
						}
					},1000);
				} else {
					WTW.hide('wtw_downloadingnotice');
					WTW.hide('wtw_downloadingnoticequeue');
					wtw3dinternet.completedWebDownload(zoriginalnewwebid, zoriginalwebtype);
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-downloads.js-downloadWebProgress=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.completedWebDownload = function(zoriginalnewwebid, zoriginalwebtype) {
	/* download is complete, notify user */
	try {
		var zisinstall = true;
		if (WTW.adminView != undefined) {
			if (WTW.adminView == 1) {
				zisinstall = false;
			}
		}
		if (zisinstall) {
			window.location.href = '/';
		} else {
			WTW.hide('wtw_commtempsearchresults');
			WTW.hide('wtw_buildtempsearchresults');
			WTW.hide('wtw_thingtempsearchresults');
			WTW.hide('wtw_avatartempsearchresults');
			WTW.show('wtw_downloadcomplete');
			var zhmenu = '';
			switch (zoriginalwebtype) {
				case 'community':
					dGet('wtw_downloadcompletemessage').innerHTML = 'You can find your <b>New 3D Community</b> in the <b>Admin Menu</b><br />or select from the following:';
					dGet('wtw_bopenwebdownload').value = 'Open Your New 3D Community in the Editor';
					dGet('wtw_bcontinuewebdownload').onclick = function() { WTW.openFullPageForm('importpage','communities'); };
					zhmenu = '25';
					WTW.hideAdminMenu();
					WTW.getSelectCommunitiesList();
					WTW.show('wtw_adminmenu22');
					break;
				case 'building':
					dGet('wtw_downloadcompletemessage').innerHTML = 'You can find your <b>New 3D Building</b> in the <b>Admin Menu</b><br />or select from the following:';
					dGet('wtw_bopenwebdownload').value = 'Open Your New 3D Building in the Editor';
					dGet('wtw_bcontinuewebdownload').onclick = function() { WTW.openFullPageForm('importpage','buildings'); };
					zhmenu = '5';
					WTW.hideAdminMenu();
					WTW.getSelectBuildingsList();
					WTW.show('wtw_adminmenu2');
					break;
				case 'thing':
					dGet('wtw_downloadcompletemessage').innerHTML = 'You can find your <b>New 3D Thing</b> in the <b>Admin Menu</b><br />or select from the following:';
					dGet('wtw_bopenwebdownload').value = 'Open Your New 3D Thing in the Editor';
					dGet('wtw_bcontinuewebdownload').onclick = function() { WTW.openFullPageForm('importpage','things'); };
					zhmenu = '35';
					WTW.hideAdminMenu();
					WTW.getSelectThingsList();
					WTW.show('wtw_adminmenu32');
					break;
				case 'avatar':
					dGet('wtw_downloadcompletemessage').innerHTML = 'You can find your <b>New 3D Avatar</b> in the <b>Admin Menu</b><br />or select from the following:';
					dGet('wtw_bopenwebdownload').value = 'Open Your New 3D Avatar in the Editor';
					dGet('wtw_bcontinuewebdownload').onclick = function() { WTW.openFullPageForm('importpage','avatars'); };
					zhmenu = '';
					WTW.hideAdminMenu();
					WTW.openSelectAvatar();
					WTW.show('wtw_adminSelectAvatarDiv');
					break;
			}
			dGet('wtw_bopenwebdownload').onclick = function() { window.location.href = '/admin.php?'+ zoriginalwebtype + 'id=' + zoriginalnewwebid + '&hmenu=' + zhmenu; };
			WTW.show('wtw_selectwebform');
		}		
		
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-downloads.js-completedWebDownload=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.getDownloadsInfo = async function(zdownloads, zshow) {
	/* uses the local downloads to get the download info from 3dnet.walktheweb.com hub */
	try {
		var zuserid = ''; /* blank will show all downloads pending on server - admin role */
		if (WTW.isUserInRole('Host') && WTW.isUserInRole('Admin') == false) {
			/* sending userid will limit the list to only downloads for this user */
			zuserid = dGet('wtw_tuserid').value;
		}
		var zrequest = {
			'downloads': JSON.stringify(zdownloads),
			'userid': zuserid,
			'function':'getdownloadinfo'
		};
		WTW.postAsyncJSON('https://3dnet.walktheweb.com/connect/downloadsinfo.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				wtw3dinternet.displayDownloadsQueue(zresponse, zshow);
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-downloads.js-getDownloadsInfo=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.displayDownloadsQueue = async function(zdownloadinfo, zshow) {
	/* display any downloads with info and preview */
	try {
		if (zshow == undefined) {
			zshow = true;
		}
		var zdownloadslist = "<div id='wtw_downloadqueuelistdiv'>";
		if (zshow) {
			for (var i=0;i < zdownloadinfo.length;i++) {
				if (zdownloadinfo[i] != null) {
					zdownloadslist += "<div id='wtw_downloadqueue-" + zdownloadinfo[i].downloadid + "'>";
					if (zdownloadinfo[i].imageurl != '') {
						zdownloadslist += "<img src='" + zdownloadinfo[i].imageurl + "' class='wtw-smallimageleft' />";
					}
					zdownloadslist += "<div style='padding:2px;margin:0px 10px 10px 20px;'><b>" + zdownloadinfo[i].templatename + "</b> (" + zdownloadinfo[i].version + ")<br /><div style='float:right;'><div onclick=\"wtw3dinternet.downloadWebFromQueue('" + btoa(zdownloadinfo[i].templatename) + "', '" + zdownloadinfo[i].downloadid + "','" + zdownloadinfo[i].webid + "','" + zdownloadinfo[i].webtype + "','1');\" class='wtw-searchresultbuttonyellow'>Download</div><br /><div onclick=\"wtw3dinternet.downloadWebFromQueue('" + btoa(zdownloadinfo[i].templatename) + "', '" + zdownloadinfo[i].downloadid + "','" + zdownloadinfo[i].webid + "','" + zdownloadinfo[i].webtype + "','0');\" class='wtw-searchresultbutton'>Cancel</div></div><br /><b>Created By:</b> " + zdownloadinfo[i].displayname + "<br /><b>on</b> " + WTW.formatDate(zdownloadinfo[i].createdate) + "<br />" + zdownloadinfo[i].description + "<br /></div><div style='clear:both;'></div><hr /></div>";
				}
			}
		}
		zdownloadslist += "</div>";
		if (zshow) {
			dGet('wtw_downloadqueuelist').innerHTML = zdownloadslist;
			dGet('wtw_dashboard').style.height = (WTW.sizeY-100)+'px';
			if (zdownloadinfo.length > 0) {
				WTW.show('wtw_downloadqueue');
			} else {
				WTW.hide('wtw_downloadqueue');
			}
		}
		/* update badges */
		dGet('wtw_adminmenudashboardbadge').innerHTML = zdownloadinfo.length;
		WTW.updateBadges();
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-downloads.js-displayDownloadsQueue=' + ex.message);
	}
}

WTW_3DINTERNET.prototype.downloadWebFromQueue = async function(ztemplatename, zdownloadid, zwebid, zwebtype, zprocess) {
	/* download 3D Web from queue */
	try {
		/* process the queue - mark it downloaded */
		var zrequest = {
			'downloadid': zdownloadid,
			'webid': zwebid,
			'webtype': zwebtype,
			'process': zprocess,
			'function':'updatedownloadsqueue'
		};
		WTW.postAsyncJSON('/core/handlers/wtw-3dinternet-downloads.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
				/* refresh the dashboard - update downloads queue */
				if (zresponse.serror == '') {
					if (dGet('wtw_downloadqueue-' + zdownloadid) != null) {
						dGet('wtw_downloadqueue-' + zdownloadid).remove();
					}
					if (zprocess == '0') {
						if (dGet('wtw_downloadqueuelistdiv') != null) {
							if (dGet('wtw_downloadqueuelistdiv').hasChildNodes() == false) {
								WTW.hide('wtw_downloadqueue');
							}
						}
					}
				}
				if (dGet('wtw_adminmenudashboardbadge') != null) {
					if (WTW.isNumeric(dGet('wtw_adminmenudashboardbadge').innerHTML)) {
						var zbadges = Number(dGet('wtw_adminmenudashboardbadge').innerHTML);
						zbadges -= 1;
						dGet('wtw_adminmenudashboardbadge').innerHTML = zbadges;
						if (zbadges < 1) {
							WTW.hide('wtw_adminmenudashboardbadge');
						}
					}
				}
				if (dGet('wtw_admindashboardbadge') != null) {
					if (WTW.isNumeric(dGet('wtw_admindashboardbadge').innerHTML)) {
						var zbadges = Number(dGet('wtw_admindashboardbadge').innerHTML);
						zbadges -= 1;
						dGet('wtw_admindashboardbadge').innerHTML = zbadges;
						if (zbadges < 1) {
							WTW.hide('wtw_admindashboardbadge');
						}
					}
				}
				wtw3dinternet.updateBadges();
			}
		);
		if (zprocess == '1') {
			/* download the 3D Web - note templatename is btoa() */
			wtw3dinternet.downloadWeb('queue', ztemplatename, zwebid, zwebid, zwebtype);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-3dinternet:scripts-downloads.js-downloadWebFromQueue=' + ex.message);
	}
}

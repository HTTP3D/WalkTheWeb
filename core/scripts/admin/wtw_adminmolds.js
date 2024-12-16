/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are used to administer a website in admin mode only */

/* mold functions are used by 3D Communities, 3D Buildings, and 3D Things */
/* molds are definition files that create meshes on demand */

WTWJS.prototype.openMoldForm = async function(zmoldind, zshape, zwebtype, zsaveprevious) {
	/* open mold form to create new or edit existing mold */
	try { 
		var zmolds;
		if (typeof zsaveprevious === 'undefined') {  
			zsaveprevious = true;
		}
		switch (zwebtype) {
			case 'community':
				zmolds = WTW.communitiesMolds;
				break;
			case 'thing':
				zmolds = WTW.thingMolds;
				break;
			default:
				zmolds = WTW.buildingMolds;
				break;
		}
		var ztestmoldid = '';
		if (zmolds[zmoldind] != null) {
			ztestmoldid = zmolds[zmoldind].moldid;
		}
		if (dGet('wtw_tmoldid').value != '' && dGet('wtw_tmoldid').value != ztestmoldid && zsaveprevious != false) {
			WTW.submitMoldForm(1);
		}
		WTW.getMoldList();
		WTW.getWebMoldList();
		if (zshape == '') {
			zshape = 'box';
		}
		WTW.hideAdminMenu();
		WTW.show('wtw_adminmenu11');
		WTW.show('wtw_adminmenu11b');
		if (dGet('wtw_adminmenubutton').style.left == '0px') {
			WTW.toggleAdminMenu('wtw_adminmenubutton');
		}
		dGet('wtw_tmoldshape').value = zshape;
		dGet('wtw_tmoldwebtype').value = zwebtype;
		if (zmolds[zmoldind] != null) {
			try {
				WTW.moldBackup = JSON.parse(JSON.stringify(zmolds[zmoldind]));
			} catch(ex) {}
			
			WTW.loadMoldForm(zmolds[zmoldind]);
			switch (zwebtype) {
				case 'community':
					dGet('wtw_tcommunityind').value = 0;
					break;
				case 'building':
					dGet('wtw_teditbuildingind').value = 0;
					break;
				case 'thing':
					dGet('wtw_tthingind').value = 0;
					break;
				default:
					break;
			}
			WTW.setCoveringFormFields(zmolds[zmoldind].covering);
			WTW.setMoldFormFields(zshape);
			dGet('wtw_tmolduploadobjectid').value = zmolds[zmoldind].objects.uploadobjectid;
			dGet('wtw_tmoldobjectfolder').value = zmolds[zmoldind].objects.folder;
			dGet('wtw_tmoldobjectfile').value = zmolds[zmoldind].objects.file;
			if (zmolds[zmoldind].graphics != null) {
				if (zmolds[zmoldind].graphics.receiveshadows == '1') {
					dGet('wtw_tmoldreceiveshadows').checked = true;
				} else {
					dGet('wtw_tmoldreceiveshadows').checked = false;
				}
				if (zmolds[zmoldind].graphics.castshadows == '1') {
					dGet('wtw_tmoldcastshadows').checked = true;
				} else {
					dGet('wtw_tmoldcastshadows').checked = false;
				}
				if (zmolds[zmoldind].graphics.level == '1') {
					dGet('wtw_tmoldgraphiclevel').checked = true;
				} else {
					dGet('wtw_tmoldgraphiclevel').checked = false;
				}
				if (zmolds[zmoldind].graphics.waterreflection == '1') {
					dGet('wtw_tmoldwaterreflection').checked = true;
				} else {
					dGet('wtw_tmoldwaterreflection').checked = false;
				}
				if (zmolds[zmoldind].checkcollisions == '1') {
					dGet('wtw_tmoldcheckcollisions').checked = true;
				} else {
					dGet('wtw_tmoldcheckcollisions').checked = false;
				}
				if (zmolds[zmoldind].ispickable == '1') {
					dGet('wtw_tmoldispickable').checked = true;
				} else {
					dGet('wtw_tmoldispickable').checked = false;
				}
			}
			if (zmolds[zmoldind].physics != null) {
				if (zmolds[zmoldind].physics.enabled == '1') {
					dGet('wtw_tmoldphysicsenabled').checked = true;
				} else {
					dGet('wtw_tmoldphysicsenabled').checked = false;
				}
			}
			dGet('wtw_tmolddiffusecolor').value = zmolds[zmoldind].color.diffusecolor;
			dGet('wtw_tmoldemissivecolor').value = zmolds[zmoldind].color.emissivecolor;
			dGet('wtw_tmoldspecularcolor').value = zmolds[zmoldind].color.specularcolor;
			dGet('wtw_tmoldambientcolor').value = zmolds[zmoldind].color.ambientcolor;
			
			dGet('wtw_tmoldvideoid').value = zmolds[zmoldind].graphics.texture.videoid;
			dGet('wtw_tmoldvideopath').value = zmolds[zmoldind].graphics.texture.video;
			dGet('wtw_tmoldvideoposterid').value = zmolds[zmoldind].graphics.texture.videoposterid;
			dGet('wtw_tmoldvideoposterpath').value = zmolds[zmoldind].graphics.texture.videoposter;
			dGet('wtw_tmoldheightmapid').value = zmolds[zmoldind].graphics.heightmap.id;
			dGet('wtw_tmoldheightmappath').value = zmolds[zmoldind].graphics.heightmap.path;
			dGet('wtw_tmoldmixmapid').value = zmolds[zmoldind].graphics.heightmap.mixmapid;
			dGet('wtw_tmoldmixmappath').value = zmolds[zmoldind].graphics.heightmap.mixmappath;
			dGet('wtw_tmoldtexturerid').value = zmolds[zmoldind].graphics.heightmap.texturerid;
			dGet('wtw_tmoldtexturerpath').value = zmolds[zmoldind].graphics.heightmap.texturerpath;
			dGet('wtw_tmoldtexturegid').value = zmolds[zmoldind].graphics.heightmap.texturegid;
			dGet('wtw_tmoldtexturegpath').value = zmolds[zmoldind].graphics.heightmap.texturegpath;
			dGet('wtw_tmoldtexturebid').value = zmolds[zmoldind].graphics.heightmap.texturebid;
			dGet('wtw_tmoldtexturebpath').value = zmolds[zmoldind].graphics.heightmap.texturebpath;
			dGet('wtw_tmoldtexturebumprid').value = zmolds[zmoldind].graphics.heightmap.texturebumprid;
			dGet('wtw_tmoldtexturebumprpath').value = zmolds[zmoldind].graphics.heightmap.texturebumprpath;
			dGet('wtw_tmoldtexturebumpgid').value = zmolds[zmoldind].graphics.heightmap.texturebumpgid;
			dGet('wtw_tmoldtexturebumpgpath').value = zmolds[zmoldind].graphics.heightmap.texturebumpgpath;
			dGet('wtw_tmoldtexturebumpbid').value = zmolds[zmoldind].graphics.heightmap.texturebumpbid;
			dGet('wtw_tmoldtexturebumpbpath').value = zmolds[zmoldind].graphics.heightmap.texturebumpbpath;
			dGet('wtw_tmoldsoundid').value = zmolds[zmoldind].sound.id;
			dGet('wtw_tmoldsoundpath').value = zmolds[zmoldind].sound.path;
			dGet('wtw_tmoldsoundname').value = zmolds[zmoldind].sound.name;
			dGet('wtw_soundicon').alt = zmolds[zmoldind].sound.name;
			dGet('wtw_soundicon').title = zmolds[zmoldind].sound.name;
			dGet('wtw_selectedsound').innerHTML = zmolds[zmoldind].sound.name;
			WTW.setDDLValue('wtw_tmoldsoundattenuation', zmolds[zmoldind].sound.attenuation);
			WTW.setSoundFields();
			if (zmolds[zmoldind].sound.loop == '1') {
				dGet('wtw_tmoldsoundloop').checked = true;
				dGet('wtw_tmoldvideoloop').checked = true;
			} else {
				dGet('wtw_tmoldsoundloop').checked = false;
				dGet('wtw_tmoldvideoloop').checked = false;
			}
			dGet('wtw_tmoldvideomaxdistance').value = zmolds[zmoldind].sound.maxdistance;
			dGet('wtw_tmoldsoundmaxdistance').value = zmolds[zmoldind].sound.maxdistance;
			dGet('wtw_tmoldsoundrollofffactor').value = zmolds[zmoldind].sound.rollofffactor;
			dGet('wtw_tmoldsoundrefdistance').value = zmolds[zmoldind].sound.refdistance;
			dGet('wtw_tmoldsoundconeinnerangle').value = zmolds[zmoldind].sound.coneinnerangle;
			dGet('wtw_tmoldsoundconeouterangle').value = zmolds[zmoldind].sound.coneouterangle;
			dGet('wtw_tmoldsoundconeoutergain').value = zmolds[zmoldind].sound.coneoutergain;
			WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
			WTW.setPreviewImage('wtw_moldtexturebumppreview', 'wtw_tmoldtexturebumppath', 'wtw_tmoldtexturebumpid');
			WTW.setPreviewImage('wtw_moldheightmappreview', 'wtw_tmoldheightmappath', 'wtw_tmoldheightmapid');
			WTW.setPreviewImage('wtw_moldmixmappreview', 'wtw_tmoldmixmappath', 'wtw_tmoldmixmapid');
			WTW.setPreviewImage('wtw_moldtexturerpreview', 'wtw_tmoldtexturerpath', 'wtw_tmoldtexturerid');
			WTW.setPreviewImage('wtw_moldtexturegpreview', 'wtw_tmoldtexturegpath', 'wtw_tmoldtexturegid');
			WTW.setPreviewImage('wtw_moldtexturebpreview', 'wtw_tmoldtexturebpath', 'wtw_tmoldtexturebid');
			WTW.setPreviewImage('wtw_moldtexturebumprpreview', 'wtw_tmoldtexturebumprpath', 'wtw_tmoldtexturebumprid');
			WTW.setPreviewImage('wtw_moldtexturebumpgpreview', 'wtw_tmoldtexturebumpgpath', 'wtw_tmoldtexturebumpgid');
			WTW.setPreviewImage('wtw_moldtexturebumpbpreview', 'wtw_tmoldtexturebumpbpath', 'wtw_tmoldtexturebumpbid');
			if (zshape == '3dtext') {
				dGet('wtw_tmoldwebtext').value = WTW.decode(zmolds[zmoldind].webtext.webtext);
				dGet('wtw_tmoldwebstyle').value = WTW.decode(zmolds[zmoldind].webtext.webstyle);
				var zwebstyle = dGet('wtw_tmoldwebstyle').value;
				var zwebtextalign = 'center';
				var zwebtextheight = 6;
				var zwebtextthick = 1;
				var zwebtextcolor = '#ff0000';
				var zwebtextdiffuse = '#f0f0f0';
				var zwebtextspecular = '#000000';
				var zwebtextambient = '#808080';
				var zwebtextalpha = 1;
				try {
					zwebstyle = JSON.parse(zwebstyle);
				} catch (ex) {}
				if (zwebstyle.anchor != undefined) {
					zwebtextalign = zwebstyle.anchor;
				}
				if (zwebstyle['letter-height'] != undefined) {
					zwebtextheight = zwebstyle['letter-height'];
				}
				if (zwebstyle['letter-thickness'] != undefined) {
					zwebtextthick = zwebstyle['letter-thickness'];
				}
				if (zwebstyle.color != undefined) {
					zwebtextcolor = zwebstyle.color;
				}
				if (zwebstyle.alpha != undefined) {
					zwebtextalpha = zwebstyle.alpha;
				}
				if (zwebstyle.colors.emissive != undefined) {
					zwebtextemissive = zwebstyle.colors.emissive;
				}
				if (zwebstyle.colors.diffuse != undefined) {
					zwebtextdiffuse = zwebstyle.colors.diffuse;
				}
				if (zwebstyle.colors.specular != undefined) {
					zwebtextspecular = zwebstyle.colors.specular;
				}
				if (zwebstyle.colors.ambient != undefined) {
					zwebtextambient = zwebstyle.colors.ambient;
				}
				WTW.setDDLValue('wtw_tmoldwebtextalign', zwebtextalign);
				dGet('wtw_tmoldwebtextheight').value = zwebtextheight;
				dGet('wtw_tmoldwebtextthick').value = zwebtextthick;
				
				dGet('wtw_tmoldwebtextemissive').value = zwebtextcolor;
				dGet('wtw_tmoldwebtextdiffuse').value = zwebtextdiffuse;
				dGet('wtw_tmoldwebtextspecular').value = zwebtextspecular;
				dGet('wtw_tmoldwebtextambient').value = zwebtextambient;
			}
			dGet('wtw_tmoldimageind').value = '-1';
			for (var i=0;i < WTW.moldList.length;i++) {
				if (WTW.moldList[i] != null) {
					var zmoldvalue = WTW.moldList[i].toLowerCase();
					while (zmoldvalue.indexOf(' ') > -1) {
						zmoldvalue = zmoldvalue.replace(' ','');
					}
					if (zshape == zmoldvalue) {
						WTW.checkMoldTextureCSG();
					}
				}
			}
			dGet('wtw_selectedcsgshape').innerHTML = '';
			if (dGet('wtw_tmoldcsgaction').selectedIndex != 0) {
				var zcsgmoldind = -1;
				zcsgmoldind = WTW.getMoldInd(zmolds, zmolds[zmoldind].csg.moldid, dGet('wtw_tconnectinggridind').value);
				if (zmolds[zcsgmoldind] != null) {
					var zcsgmainname = zmolds[zcsgmoldind].moldname;
					dGet('wtw_selectedcsgshape').innerHTML += "<div class='wtw-secondcolcontent' onmouseover=\"WTW.hilightMold('" + zcsgmainname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + zcsgmainname + "');\">Merge with (" + zmolds[zcsgmoldind].shape + ") &nbsp;&nbsp;&nbsp;&nbsp; <a href='#' onclick=\"WTW.removeMerge('" + zcsgmainname + "')\">Remove</a></div><br /><br />";
				}
			}
			var zmold = WTW.getMeshOrNodeByID(zmolds[zmoldind].moldname);
			if (zmold != null) {
				WTW.openEditPoles(zmold);
			}
			WTW.pluginsOpenMoldForm(zmolds[zmoldind].moldname, zmoldind, zshape, zwebtype);
			if (zshape == 'image' && zmolds[zmoldind].graphics.webimages[0] != undefined) {
				dGet('wtw_tmoldimageind').value = '0';
				var zimageid = 't1qlqxd6pzubzzzy';
				var zimagepath = '';
				var zimagehoverid = 't1qlqxd6pzubzzzy';
				var zimagehoverpath = '';
				var zimageclickid = 't1qlqxd6pzubzzzy';
				var zimageclickpath = '';
				if (zmolds[zmoldind].graphics.webimages[0].imageid != '') {
					zimageid = zmolds[zmoldind].graphics.webimages[0].imageid;
				}
				if (zmolds[zmoldind].graphics.webimages[0].imagepath != undefined) {
					zimagepath = zmolds[zmoldind].graphics.webimages[0].imagepath;
				}
				if (zmolds[zmoldind].graphics.webimages[0].imagehoverid != '') {
					zimagehoverid = zmolds[zmoldind].graphics.webimages[0].imagehoverid;
				}
				if (zmolds[zmoldind].graphics.webimages[0].imagehoverpath != undefined) {
					zimagehoverpath = zmolds[zmoldind].graphics.webimages[0].imagehoverpath;
				}
				if (zmolds[zmoldind].graphics.webimages[0].imageclickid != '') {
					zimageclickid = zmolds[zmoldind].graphics.webimages[0].imageclickid;
				}
				if (zmolds[zmoldind].graphics.webimages[0].imageclickpath != undefined) {
					zimageclickpath = zmolds[zmoldind].graphics.webimages[0].imageclickpath;
				}
				dGet('wtw_tmoldimagejsfunction').value = zmolds[zmoldind].graphics.webimages[0].jsfunction;
				dGet('wtw_tmoldimagejsparameters').value = zmolds[zmoldind].graphics.webimages[0].jsparameters;
				dGet('wtw_tmoldaddimageid').value = zimageid;
				dGet('wtw_tmoldaddimagepath').value = zimagepath;
				dGet('wtw_tmoldaddimagehoverid').value = zimagehoverid;				
				dGet('wtw_tmoldaddimagehoverpath').value = zimagehoverpath;				
				dGet('wtw_tmoldaddimageclickid').value = zimageclickid;	
				dGet('wtw_tmoldaddimageclickpath').value = zimageclickpath;	
				if (zmolds[zmoldind].graphics.webimages[0].jsfunction == 'WTW.openWebpage') {
					dGet('wtw_tmoldaddonclick').selectedIndex = 2;
				} else if (zmolds[zmoldind].graphics.webimages[0].jsfunction == 'WTW.openIFrame') {
					dGet('wtw_tmoldaddonclick').selectedIndex = 1;
				} else if (zmolds[zmoldind].graphics.webimages[0].jsfunction != '') {
					dGet('wtw_tmoldaddonclick').selectedIndex = 3;
				} else {
					dGet('wtw_tmoldaddonclick').selectedIndex = 0;
				}
				WTW.changeOnClickEvent(dGet('wtw_tmoldaddonclick'));
				if (dGet('wtw_tmoldaddimagepath').value != '') {
					dGet('wtw_moldaddimagepreview').src = dGet('wtw_tmoldaddimagepath').value;
				} else if (dGet('wtw_tmoldaddimageid').value != '') {
					WTW.getAsyncJSON('/connect/upload.php?uploadid=' + dGet('wtw_tmoldaddimageid').value, 
						function(zresponse) {
							WTW.loadUpload(JSON.parse(zresponse),dGet('wtw_tmoldaddimageid').value,0);
							var zimageinfo = WTW.getUploadFileData(dGet('wtw_tmoldaddimageid').value);
							zimageinfo.image.onload = function() {	
								dGet('wtw_moldaddimagepreview').src = zimageinfo.filedata;
							}
						}
					);
				}
				if (dGet('wtw_tmoldaddimagehoverpath').value != '') {
					dGet('wtw_moldaddimagehoverpreview').src = dGet('wtw_tmoldaddimagehoverpath').value;
				} else if (dGet('wtw_tmoldaddimagehoverid').value != '') {
					WTW.getAsyncJSON('/connect/upload.php?uploadid=' + dGet('wtw_tmoldaddimagehoverid').value, 
						function(zresponse) {
							WTW.loadUpload(JSON.parse(zresponse),dGet('wtw_tmoldaddimagehoverid').value,0);
							var zimageinfo = WTW.getUploadFileData(dGet('wtw_tmoldaddimagehoverid').value);
							zimageinfo.image.onload = function() {	
								dGet('wtw_moldaddimagehoverpreview').src = zimageinfo.filedata;
							}
							dGet('wtw_tmoldpositionz').focus();
							WTW.setWindowSize();
							WTW.setNewMold(1);
						}
					);
				}
			} else if (zshape == 'image') {
				dGet('wtw_tmoldimageind').value = '0';
			} else if (zshape == 'tube') {
				if (zmolds[zmoldind].paths.path1.length == 0) {
					zmolds[zmoldind].paths.path1[0] = {
						'x':0,
						'y':0,
						'z':0,
						'sorder':0
					};
					zmolds[zmoldind].paths.path1[1] = {
						'x':0,
						'y':10,
						'z':0,
						'sorder':1
					};
				}
				WTW.loadPointList(zmolds[zmoldind].paths.path1, 1);
			} else if (zshape == 'line') {
				if (zmolds[zmoldind].paths.path1.length == 0) {
					zmolds[zmoldind].paths.path1[0] = {
						'x':0,
						'y':0,
						'z':0,
						'sorder':0
					};
					zmolds[zmoldind].paths.path1[1] = {
						'x':0,
						'y':10,
						'z':0,
						'sorder':1
					};
				}
				WTW.loadPointList(zmolds[zmoldind].paths.path1, 1);
			}
			dGet('wtw_tmoldpositionz').focus();
			WTW.setWindowSize();
			WTW.setNewMold(1);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-openMoldForm=' + ex.message);
	}
}		

WTWJS.prototype.loadMoldForm = function(zmolddef) {
	/* after mold form is opened, this function loads the existing information to edit the mold */
	try {
		var zwebtype = '';
		var zshape = zmolddef.shape;
		var zcoveringname = zmolddef.covering;
		if (zmolddef.moldname.indexOf('communitymolds') > -1) {
			zwebtype = 'community';
		} else if (zmolddef.moldname.indexOf('buildingmolds') > -1) {
			zwebtype = 'building';
		} else if (zmolddef.moldname.indexOf('thingmolds') > -1) {
			zwebtype = 'thing';
		}
		switch (zwebtype) {
			case 'community':
				dGet('wtw_tcommunityind').value = zmolddef.communityinfo.communityind;
				break;
			case 'building':
				dGet('wtw_teditbuildingind').value = zmolddef.buildinginfo.buildingind;
				break;
			case 'thing':
				dGet('wtw_tthingind').value = zmolddef.thinginfo.thingind;
				break;
		}
		if (zcoveringname == 'mirror') {
			zcoveringname = 'mirror-' + zmolddef.actionzone2id;
		}
		WTW.getLoadActionZoneList(zmolddef.loadactionzoneid);
		WTW.getLoadZoneList(zmolddef.loadactionzoneid);
		dGet('wtw_tmoldid').value = zmolddef.moldid;
		dGet('wtw_tmoldind').value = zmolddef.moldind;
		dGet('wtw_tmoldshape').value = zmolddef.shape;
		dGet('wtw_tmoldwebtype').value = zwebtype;
		dGet('wtw_tmoldname').value = zmolddef.moldname;
		dGet('wtw_teditpointindex').value = '';
		dGet('wtw_tmoldpath1points').value = '';
		dGet('wtw_tmoldpath2points').value = '';
		dGet('wtw_tmoldcoveringold').value = zmolddef.covering;
		dGet('wtw_tmoldpositionx').value = WTW.formatNumber(zmolddef.position.x,2);
		dGet('wtw_tmoldpositiony').value = WTW.formatNumber(zmolddef.position.y,2);
		dGet('wtw_tmoldpositionz').value = WTW.formatNumber(zmolddef.position.z,2);
		dGet('wtw_tmoldscalingx').value = WTW.formatNumber(zmolddef.scaling.x,2);
		dGet('wtw_tmoldscalingy').value = WTW.formatNumber(zmolddef.scaling.y,2);
		dGet('wtw_tmoldscalingz').value = WTW.formatNumber(zmolddef.scaling.z,2);
		dGet('wtw_tmoldrotationx').value = WTW.formatNumber(zmolddef.rotation.x,2);
		dGet('wtw_tmoldrotationy').value = WTW.formatNumber(zmolddef.rotation.y,2);
		dGet('wtw_tmoldrotationz').value = WTW.formatNumber(zmolddef.rotation.z,2);
		dGet('wtw_tmoldspecial1').value = zmolddef.scaling.special1;
		dGet('wtw_tmoldspecial2').value = zmolddef.scaling.special2;
		dGet('wtw_tmolduploadobjectid').value = zmolddef.objects.uploadobjectid;
		dGet('wtw_tmoldobjectfolder').value = zmolddef.objects.folder;
		dGet('wtw_tmoldobjectfile').value = zmolddef.objects.file;
		if (zmolddef.graphics.receiveshadows == '1') {
			dGet('wtw_tmoldreceiveshadows').checked = true;
		} else {
			dGet('wtw_tmoldreceiveshadows').checked = false;
		}
		if (zmolddef.graphics.castshadows == '1') {
			dGet('wtw_tmoldcastshadows').checked = true;
		} else {
			dGet('wtw_tmoldcastshadows').checked = false;
		}
		if (zmolddef.graphics.level == '1') {
			dGet('wtw_tmoldgraphiclevel').checked = true;
		} else {
			dGet('wtw_tmoldgraphiclevel').checked = false;
		}
		dGet('wtw_tmoldtextureid').value = zmolddef.graphics.texture.id;
		dGet('wtw_tmoldtexturepath').value = zmolddef.graphics.texture.path;
		dGet('wtw_tmoldtexturebumpid').value = zmolddef.graphics.texture.bumpid;
		dGet('wtw_tmoldtexturebumppath').value = zmolddef.graphics.texture.bumppath;
		dGet('wtw_tmoldvideoid').value = zmolddef.graphics.texture.videoid;
		dGet('wtw_tmoldvideopath').value = zmolddef.graphics.texture.video;
		dGet('wtw_tmoldvideoposterid').value = zmolddef.graphics.texture.videoposterid;
		dGet('wtw_tmoldvideoposterpath').value = zmolddef.graphics.texture.videoposter;
		dGet('wtw_tmoldheightmapid').value = zmolddef.graphics.heightmap.id;
		dGet('wtw_tmoldheightmappath').value = zmolddef.graphics.heightmap.path;
		dGet('wtw_tmoldmixmapid').value = zmolddef.graphics.heightmap.mixmapid;
		dGet('wtw_tmoldmixmappath').value = zmolddef.graphics.heightmap.mixmappath;
		dGet('wtw_tmoldtexturerid').value = zmolddef.graphics.heightmap.texturerid;
		dGet('wtw_tmoldtexturerpath').value = zmolddef.graphics.heightmap.texturerpath;
		dGet('wtw_tmoldtexturegid').value = zmolddef.graphics.heightmap.texturegid;
		dGet('wtw_tmoldtexturegpath').value = zmolddef.graphics.heightmap.texturegpath;
		dGet('wtw_tmoldtexturebid').value = zmolddef.graphics.heightmap.texturebid;
		dGet('wtw_tmoldtexturebpath').value = zmolddef.graphics.heightmap.texturebpath;
		dGet('wtw_tmoldtexturebumprid').value = zmolddef.graphics.heightmap.texturebumprid;
		dGet('wtw_tmoldtexturebumprpath').value = zmolddef.graphics.heightmap.texturebumprpath;
		dGet('wtw_tmoldtexturebumpgid').value = zmolddef.graphics.heightmap.texturebumpgid;
		dGet('wtw_tmoldtexturebumpgpath').value = zmolddef.graphics.heightmap.texturebumpgpath;
		dGet('wtw_tmoldtexturebumpbid').value = zmolddef.graphics.heightmap.texturebumpbid;
		dGet('wtw_tmoldtexturebumpbpath').value = zmolddef.graphics.heightmap.texturebumpbpath;
		dGet('wtw_tmoldsoundid').value = zmolddef.sound.id;
		dGet('wtw_tmoldsoundpath').value = zmolddef.sound.path;
		dGet('wtw_tmoldsoundname').value = zmolddef.sound.name;
		dGet('wtw_soundicon').alt = zmolddef.sound.name;
		dGet('wtw_soundicon').title = zmolddef.sound.name;
		dGet('wtw_selectedsound').innerHTML = zmolddef.sound.name;
		WTW.setDDLValue('wtw_tmoldsoundattenuation', zmolddef.sound.attenuation);
		if (zmolddef.sound.loop == '1') {
			dGet('wtw_tmoldsoundloop').checked = true;
			dGet('wtw_tmoldvideoloop').checked = true;
		} else {
			dGet('wtw_tmoldsoundloop').checked = false;
			dGet('wtw_tmoldvideoloop').checked = false;
		}
		dGet('wtw_tmoldsoundmaxdistance').value = WTW.formatNumber(zmolddef.sound.maxdistance,2);
		dGet('wtw_tmoldvideomaxdistance').value = WTW.formatNumber(zmolddef.sound.maxdistance,2);
		dGet('wtw_tmoldsoundrollofffactor').value = WTW.formatNumber(zmolddef.sound.rollofffactor,2);
		dGet('wtw_tmoldsoundrefdistance').value = WTW.formatNumber(zmolddef.sound.refdistance,2);
		dGet('wtw_tmoldsoundconeinnerangle').value = zmolddef.sound.coneinnerangle;
		dGet('wtw_tmoldsoundconeouterangle').value = zmolddef.sound.coneouterangle;
		dGet('wtw_tmoldsoundconeoutergain').value = zmolddef.sound.coneoutergain;
		if (zmolddef.physics.enabled == 1) {
			dGet('wtw_tmoldphysicsenabled').checked == true;
		} else {
			dGet('wtw_tmoldphysicsenabled').checked == false;
		}
		if (zmolddef.physics.istriggershape == 1) {
			dGet('wtw_tmoldphysicsistriggershape').checked = true;
		} else {
			dGet('wtw_tmoldphysicsistriggershape').checked = false;
		}
		if (zmolddef.physics.startasleep == 1) {
			dGet('wtw_tmoldphysicsstartasleep').checked = true;
		} else {
			dGet('wtw_tmoldphysicsstartasleep').checked = false;
		}
		dGet('wtw_tmoldphysicscenterx').value = zmolddef.physics.center.x;
		dGet('wtw_tmoldphysicscentery').value = zmolddef.physics.center.y;
		dGet('wtw_tmoldphysicscenterz').value = zmolddef.physics.center.z;
		dGet('wtw_tmoldphysicsextentsx').value = zmolddef.physics.extents.x;
		dGet('wtw_tmoldphysicsextentsy').value = zmolddef.physics.extents.y;
		dGet('wtw_tmoldphysicsextentsz').value = zmolddef.physics.extents.z;
		dGet('wtw_tmoldphysicsfriction').value = zmolddef.physics.friction;
		dGet('wtw_tmoldphysicsmass').value = zmolddef.physics.mass;
		dGet('wtw_tmoldphysicspointax').value = zmolddef.physics.pointa.x;
		dGet('wtw_tmoldphysicspointay').value = zmolddef.physics.pointa.y;
		dGet('wtw_tmoldphysicspointaz').value = zmolddef.physics.pointa.z;
		dGet('wtw_tmoldphysicspointbx').value = zmolddef.physics.pointb.x;
		dGet('wtw_tmoldphysicspointby').value = zmolddef.physics.pointb.y;
		dGet('wtw_tmoldphysicspointbz').value = zmolddef.physics.pointb.z;
		dGet('wtw_tmoldphysicsradius').value = zmolddef.physics.radius;
		dGet('wtw_tmoldphysicsrestitution').value = zmolddef.physics.restitution;
		dGet('wtw_tmoldphysicsrotationw').value = zmolddef.physics.rotation.w;
		dGet('wtw_tmoldphysicsrotationx').value = zmolddef.physics.rotation.x;
		dGet('wtw_tmoldphysicsrotationy').value = zmolddef.physics.rotation.y;
		dGet('wtw_tmoldphysicsrotationz').value = zmolddef.physics.rotation.z;
		dGet('wtw_tmoldmaxheight').value = zmolddef.graphics.heightmap.maxheight;
		dGet('wtw_tmolduoffset').value = WTW.formatNumber(zmolddef.graphics.uoffset,2);
		dGet('wtw_tmoldvoffset').value = WTW.formatNumber(zmolddef.graphics.voffset,2);
		dGet('wtw_tmolduscale').value = WTW.formatNumber(zmolddef.graphics.uscale,2);
		dGet('wtw_tmoldvscale').value = WTW.formatNumber(zmolddef.graphics.vscale,2);
		dGet('wtw_tmoldopacity').value = zmolddef.opacity;
		dGet('wtw_tmoldsubdivisions').value = zmolddef.subdivisions;
		dGet('wtw_tmoldactionzoneid').value = zmolddef.actionzoneid;
		dGet('wtw_tmoldactionzone2id').value = zmolddef.actionzone2id;
		dGet('wtw_tmoldcsgmoldid').value = zmolddef.csg.moldid;
		if (dGet('wtw_tmoldshape').value == '3dtext') {
			dGet('wtw_tmoldwebtext').value = WTW.decode(zmolddef.webtext.webtext);
		} else {
			dGet('wtw_tmoldwebtext').value = '';
		}
		dGet('wtw_tmoldwebstyle').value = WTW.decode(zmolddef.webtext.webstyle);
		dGet('wtw_tmoldalttag').value = WTW.decode(zmolddef.alttag.name);
		dGet('wtw_tmolddiffusecolor').value = zmolddef.color.diffusecolor;
		dGet('wtw_tmoldemissivecolor').value = zmolddef.color.emissivecolor;
		dGet('wtw_tmoldspecularcolor').value = zmolddef.color.specularcolor;
		dGet('wtw_tmoldambientcolor').value = zmolddef.color.ambientcolor;
		dGet('wtw_moldaddimagepreview').src = '';
		dGet('wtw_moldaddimagehoverpreview').src = '';
		dGet('wtw_pointlist1').innerHTML = '';
		dGet('wtw_pointlist2').innerHTML = '';
		WTW.getCoveringList(zshape);
		WTW.setDDLValue('wtw_tmoldcovering', zcoveringname);
		WTW.setDDLValue('wtw_tmoldcsgaction', zmolddef.csg.action);
		WTW.setDDLValue('wtw_tmoldloadactionzoneid', zmolddef.loadactionzoneid);
		WTW.setDDLValue('wtw_tmoldunloadactionzoneid', zmolddef.unloadactionzoneid);
		if (zmolddef.graphics.waterreflection == '1') {
			dGet('wtw_tmoldwaterreflection').checked = true;
		} else {
			dGet('wtw_tmoldwaterreflection').checked = false;
		}
		if (zmolddef.checkcollisions == '1') {
			dGet('wtw_tmoldcheckcollisions').checked = true;
		} else {
			dGet('wtw_tmoldcheckcollisions').checked = false;
		}
		if (zmolddef.ispickable == '1') {
			dGet('wtw_tmoldispickable').checked = true;
		} else {
			dGet('wtw_tmoldispickable').checked = false;
		}
		if (dGet('wtw_tmoldcsgmoldid').value != '') {
			dGet('wtw_bselectcsgshape').innerHTML = 'Change Shape to Merge';
		} else {
			dGet('wtw_bselectcsgshape').innerHTML = 'Pick Shape to Merge';
			WTW.setDDLValue('wtw_tmoldcsgaction', '');
		}
		WTW.pluginsLoadMoldForm(zwebtype, dGet('wtw_tmoldshape').value, dGet('wtw_tmoldname').value);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-loadMoldForm=' + ex.message);
	}
}

WTWJS.prototype.openAddNew3DModel = function(zuploadobjectid, zobjectfolder, zobjectfile) {
	/* open add new mold will create a new mold and open the form using the default values for that type of mold - babylonfile for 3D Models and selecting the 3D Model ID */
	try {
		var zshape = 'babylonfile';
		var zwebtype = '';
		if (communityid != '') {
			zwebtype = 'community';
		} else if (buildingid != '') {
			zwebtype = 'building';
		} else if (thingid != '') {
			zwebtype = 'thing';
		}
		if (zwebtype != '') {
			WTW.openAddNewMold(zwebtype, zshape);
			WTW.setSelectModel(zuploadobjectid, zobjectfolder, zobjectfile);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-openAddNew3DModel=' + ex.message);
	}
}

WTWJS.prototype.openAddNewMold = function(zwebtype, zshape) {
	/* open add new mold will create a new mold and open the form using the default values for that type of mold */
	try {
		dGet('wtw_tnewmold').value = '1';
		WTW.setMoldFormFields(zshape);
		WTW.getCoveringList(zshape);
		var zmoldind = -1;
		var zmolds = WTW.buildingMolds;
		switch (zwebtype) {
			case 'community':
			    zmoldind = WTW.getNextCount(WTW.communitiesMolds);
				zmolds = WTW.communitiesMolds;
				zmolds[zmoldind] = WTW.newMold();
				dGet('wtw_tthingind').value = '-1';
				dGet('wtw_tcommunityind').value= WTW.getCommunityInd(communityid);
				zmolds[zmoldind].communityinfo.communityid = communityid;
				zmolds[zmoldind].communityinfo.communityind = dGet('wtw_tcommunityind').value;
				break;
			case 'thing':
			    zmoldind = WTW.getNextCount(WTW.thingMolds);
				zmolds = WTW.thingMolds;
				zmolds[zmoldind] = WTW.newMold();
				dGet('wtw_tthingind').value = WTW.getThingInd(thingid);
				dGet('wtw_tcommunityind').value= '-1';
				zmolds[zmoldind].thinginfo.thingid = thingid;
				zmolds[zmoldind].thinginfo.thingind = dGet('wtw_tthingind').value;
				break;
			default:
			    zmoldind = WTW.getNextCount(WTW.buildingMolds);
				zmolds = WTW.buildingMolds;
				zmolds[zmoldind] = WTW.newMold();
				dGet('wtw_tthingind').value = '-1';
				dGet('wtw_tcommunityind').value= '-1';
				zmolds[zmoldind].buildinginfo.buildingid = buildingid;
				zmolds[zmoldind].buildinginfo.buildingind = WTW.getBuildingInd(buildingid);
				break;
		}
		var zloadactionzoneid = WTW.getLoadActionZoneID('normal');
		var zunloadactionzoneid = '';
		WTW.getLoadZoneList(zloadactionzoneid);
		var zmoldid = WTW.getRandomString(16);
		zmolds[zmoldind].moldid = zmoldid;
		dGet('wtw_tmoldwebtype').value = zwebtype;
		dGet('wtw_tmoldshape').value = zshape;
		dGet('wtw_tmoldind').value = zmoldind.toString();
		dGet('wtw_tmoldid').value = zmoldid.toString();
		WTW.show('wtw_moldtexturetitle');
		WTW.show('wtw_moldbumptexturetitle');
		WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
		WTW.setPreviewImage('wtw_moldtexturebumppreview', 'wtw_tmoldtexturebumppath', 'wtw_tmoldtexturebumpid');
		WTW.setPreviewImage('wtw_moldheightmappreview', 'wtw_tmoldheightmappath', 'wtw_tmoldheightmapid');
		WTW.setPreviewImage('wtw_moldmixmappreview', 'wtw_tmoldmixmappath', 'wtw_tmoldmixmapid');
		WTW.setPreviewImage('wtw_moldtexturerpreview', 'wtw_tmoldtexturerpath', 'wtw_tmoldtexturerid');
		WTW.setPreviewImage('wtw_moldtexturegpreview', 'wtw_tmoldtexturegpath', 'wtw_tmoldtexturegid');
		WTW.setPreviewImage('wtw_moldtexturebpreview', 'wtw_tmoldtexturebpath', 'wtw_tmoldtexturebid');
		WTW.setPreviewImage('wtw_moldtexturebumprpreview', 'wtw_tmoldtexturebumprpath', 'wtw_tmoldtexturebumprid');
		WTW.setPreviewImage('wtw_moldtexturebumpgpreview', 'wtw_tmoldtexturebumpgpath', 'wtw_tmoldtexturebumpgid');
		WTW.setPreviewImage('wtw_moldtexturebumpbpreview', 'wtw_tmoldtexturebumpbpath', 'wtw_tmoldtexturebumpbid');
		WTW.show('wtw_moldcolorsdiv');
		WTW.show('wtw_moldbasictextureset2div');
		zmolds[zmoldind].graphics.waterreflection = '0';
		var zmold = null;
		WTW.setNewMoldDefaults(zshape);

		var zcoveringname = dGet('wtw_tmoldcoveringold').value;
		zmolds[zmoldind].shape = zshape;
		zmolds[zmoldind].covering = zcoveringname;
		zmolds[zmoldind].position.x = dGet('wtw_tmoldpositionx').value;
		zmolds[zmoldind].position.y = dGet('wtw_tmoldpositiony').value;
		zmolds[zmoldind].position.z = dGet('wtw_tmoldpositionz').value;
		zmolds[zmoldind].scaling.x = dGet('wtw_tmoldscalingx').value;
		zmolds[zmoldind].scaling.y = dGet('wtw_tmoldscalingy').value;
		zmolds[zmoldind].scaling.z = dGet('wtw_tmoldscalingz').value;
		zmolds[zmoldind].rotation.x = dGet('wtw_tmoldrotationx').value;
		zmolds[zmoldind].rotation.y = dGet('wtw_tmoldrotationy').value;
		zmolds[zmoldind].rotation.z = dGet('wtw_tmoldrotationz').value;
		zmolds[zmoldind].scaling.special1 = dGet('wtw_tmoldspecial1').value;
		zmolds[zmoldind].scaling.special2 = dGet('wtw_tmoldspecial2').value;
		zmolds[zmoldind].graphics.uoffset = dGet('wtw_tmolduoffset').value;
		zmolds[zmoldind].graphics.voffset = dGet('wtw_tmoldvoffset').value;
		zmolds[zmoldind].graphics.uscale = dGet('wtw_tmolduscale').value;
		zmolds[zmoldind].graphics.vscale = dGet('wtw_tmoldvscale').value;
		zmolds[zmoldind].opacity = dGet('wtw_tmoldopacity').value;
		zmolds[zmoldind].subdivisions = dGet('wtw_tmoldsubdivisions').value;
		zmolds[zmoldind].objects.uploadobjectid = dGet('wtw_tmolduploadobjectid').value;
		zmolds[zmoldind].objects.folder = dGet('wtw_tmoldobjectfolder').value;
		zmolds[zmoldind].objects.file = dGet('wtw_tmoldobjectfile').value;
		zmolds[zmoldind].graphics.texture.backupid = '';
		if (dGet('wtw_tmoldreceiveshadows').checked) {
			zmolds[zmoldind].graphics.receiveshadows = '1';
		} else {
			zmolds[zmoldind].graphics.receiveshadows = '0';
		}
		if (dGet('wtw_tmoldcastshadows').checked) {
			zmolds[zmoldind].graphics.castshadows = '1';
		} else {
			zmolds[zmoldind].graphics.castshadows = '0';
		}
		if (dGet('wtw_tmoldgraphiclevel').checked) {
			zmolds[zmoldind].graphics.level = '1';
		} else {
			zmolds[zmoldind].graphics.level = '0';
		}
		if (dGet('wtw_tmoldwaterreflection').checked) {
			zmolds[zmoldind].graphics.waterreflection = '1';
		} else {
			zmolds[zmoldind].graphics.waterreflection = '0';
		}
		if (dGet('wtw_tmoldcheckcollisions').checked) {
			zmolds[zmoldind].checkcollisions = '1';
		} else {
			zmolds[zmoldind].checkcollisions = '0';
		}
		if (dGet('wtw_tmoldispickable').checked) {
			zmolds[zmoldind].ispickable = '1';
		} else {
			zmolds[zmoldind].ispickable = '0';
		}
		zmolds[zmoldind].graphics.texture.id = dGet('wtw_tmoldtextureid').value;
		zmolds[zmoldind].graphics.texture.path = dGet('wtw_tmoldtexturepath').value;
		zmolds[zmoldind].graphics.texture.bumpid = dGet('wtw_tmoldtexturebumpid').value;
		zmolds[zmoldind].graphics.texture.bumppath = dGet('wtw_tmoldtexturebumppath').value;
		zmolds[zmoldind].graphics.texture.videoid = dGet('wtw_tmoldvideoid').value;
		zmolds[zmoldind].graphics.texture.videoposterid = dGet('wtw_tmoldvideoposterid').value;
		zmolds[zmoldind].graphics.heightmap.id = dGet('wtw_tmoldheightmapid').value;
		zmolds[zmoldind].graphics.heightmap.path = dGet('wtw_tmoldheightmappath').value;
		zmolds[zmoldind].graphics.heightmap.mixmapid = dGet('wtw_tmoldmixmapid').value;
		zmolds[zmoldind].graphics.heightmap.mixmappath = dGet('wtw_tmoldmixmappath').value;
		zmolds[zmoldind].graphics.heightmap.texturerid = dGet('wtw_tmoldtexturerid').value;
		zmolds[zmoldind].graphics.heightmap.texturerpath = dGet('wtw_tmoldtexturerpath').value;
		zmolds[zmoldind].graphics.heightmap.texturegid = dGet('wtw_tmoldtexturegid').value;
		zmolds[zmoldind].graphics.heightmap.texturegpath = dGet('wtw_tmoldtexturegpath').value;
		zmolds[zmoldind].graphics.heightmap.texturebid = dGet('wtw_tmoldtexturebid').value;
		zmolds[zmoldind].graphics.heightmap.texturebpath = dGet('wtw_tmoldtexturebpath').value;
		zmolds[zmoldind].graphics.heightmap.texturebumprid = dGet('wtw_tmoldtexturebumprid').value;
		zmolds[zmoldind].graphics.heightmap.texturebumprpath = dGet('wtw_tmoldtexturebumprpath').value;
		zmolds[zmoldind].graphics.heightmap.texturebumpgid = dGet('wtw_tmoldtexturebumpgid').value;
		zmolds[zmoldind].graphics.heightmap.texturebumpgpath = dGet('wtw_tmoldtexturebumpgpath').value;
		zmolds[zmoldind].graphics.heightmap.texturebumpbid = dGet('wtw_tmoldtexturebumpbid').value;
		zmolds[zmoldind].graphics.heightmap.texturebumpbpath = dGet('wtw_tmoldtexturebumpbpath').value;
		zmolds[zmoldind].sound.id = dGet('wtw_tmoldsoundid').value;
		zmolds[zmoldind].sound.path = dGet('wtw_tmoldsoundpath').value;
		zmolds[zmoldind].sound.name = dGet('wtw_tmoldsoundname').value;
		var zsoundattenuation = 'none';
		if (dGet('wtw_tmoldsoundattenuation').selectedIndex > -1) {
			zsoundattenuation = dGet('wtw_tmoldsoundattenuation').options[dGet('wtw_tmoldsoundattenuation').selectedIndex].value;
		}
		zmolds[zmoldind].sound.attenuation = zsoundattenuation;
		if (dGet('wtw_tmoldsoundloop').checked) {
			zmolds[zmoldind].sound.loop = '1';
		} else {
			zmolds[zmoldind].sound.loop = '0';
		}
		zmolds[zmoldind].sound.maxdistance = dGet('wtw_tmoldsoundmaxdistance').value;
		zmolds[zmoldind].sound.rollofffactor = dGet('wtw_tmoldsoundrollofffactor').value;
		zmolds[zmoldind].sound.refdistance = dGet('wtw_tmoldsoundrefdistance').value;
		zmolds[zmoldind].sound.coneinnerangle = dGet('wtw_tmoldsoundconeinnerangle').value;
		zmolds[zmoldind].sound.coneouterangle = dGet('wtw_tmoldsoundconeouterangle').value;
		zmolds[zmoldind].sound.coneoutergain = dGet('wtw_tmoldsoundconeoutergain').value;
		if (dGet('wtw_tmoldphysicsenabled').checked) {
			zmolds[zmoldind].physics.enabled = 1;
		} else {
			zmolds[zmoldind].physics.enabled = 0;
		}
		if (dGet('wtw_tmoldphysicsistriggershape').checked) {
			zmolds[zmoldind].physics.istriggershape = 1;
		} else {
			zmolds[zmoldind].physics.istriggershape = 0;
		}
		if (dGet('wtw_tmoldphysicsstartasleep').checked) {
			zmolds[zmoldind].physics.startasleep = 1;
		} else {
			zmolds[zmoldind].physics.startasleep = 0;
		}
		zmolds[zmoldind].physics.center.x = dGet('wtw_tmoldphysicscenterx').value;
		zmolds[zmoldind].physics.center.y = dGet('wtw_tmoldphysicscentery').value;
		zmolds[zmoldind].physics.center.z = dGet('wtw_tmoldphysicscenterz').value;
		zmolds[zmoldind].physics.extents.x = dGet('wtw_tmoldphysicsextentsx').value;
		zmolds[zmoldind].physics.extents.y = dGet('wtw_tmoldphysicsextentsy').value;
		zmolds[zmoldind].physics.extents.z = dGet('wtw_tmoldphysicsextentsz').value;
		zmolds[zmoldind].physics.friction = dGet('wtw_tmoldphysicsfriction').value;
		zmolds[zmoldind].physics.mass = dGet('wtw_tmoldphysicsmass').value;
		zmolds[zmoldind].physics.pointa.x = dGet('wtw_tmoldphysicspointax').value;
		zmolds[zmoldind].physics.pointa.y = dGet('wtw_tmoldphysicspointay').value;
		zmolds[zmoldind].physics.pointa.z = dGet('wtw_tmoldphysicspointaz').value;
		zmolds[zmoldind].physics.pointb.x = dGet('wtw_tmoldphysicspointbx').value;
		zmolds[zmoldind].physics.pointb.y = dGet('wtw_tmoldphysicspointby').value;
		zmolds[zmoldind].physics.pointb.z = dGet('wtw_tmoldphysicspointbz').value;
		zmolds[zmoldind].physics.radius = dGet('wtw_tmoldphysicsradius').value;
		zmolds[zmoldind].physics.restitution = dGet('wtw_tmoldphysicsrestitution').value;
		zmolds[zmoldind].physics.rotation.w = dGet('wtw_tmoldphysicsrotationw').value;
		zmolds[zmoldind].physics.rotation.x = dGet('wtw_tmoldphysicsrotationx').value;
		zmolds[zmoldind].physics.rotation.y = dGet('wtw_tmoldphysicsrotationy').value;
		zmolds[zmoldind].physics.rotation.z = dGet('wtw_tmoldphysicsrotationz').value;
		zmolds[zmoldind].graphics.heightmap.maxheight = dGet('wtw_tmoldmaxheight').value;
		zmolds[zmoldind].color.diffusecolor = dGet('wtw_tmolddiffusecolor').value;
		zmolds[zmoldind].color.emissivecolor = dGet('wtw_tmoldemissivecolor').value;
		zmolds[zmoldind].color.specularcolor = dGet('wtw_tmoldspecularcolor').value;
		zmolds[zmoldind].color.ambientcolor = dGet('wtw_tmoldambientcolor').value;
		zmolds[zmoldind].moldname = 'local-' + zwebtype + 'molds-' + zmoldind.toString() + '-' + zmoldid + '-' + dGet('wtw_tconnectinggridind').value + '-' + dGet('wtw_tconnectinggridid').value + '-' + zshape;
		zmolds[zmoldind].connectinggridid = dGet('wtw_tconnectinggridid').value;
		zmolds[zmoldind].connectinggridind = dGet('wtw_tconnectinggridind').value;
		zmolds[zmoldind].parentname = dGet('wtw_tconnectinggridname').value;
		zmolds[zmoldind].loadactionzoneid = zloadactionzoneid;
		zmolds[zmoldind].loadactionzoneind = WTW.getActionZoneInd(zloadactionzoneid, Number(dGet('wtw_tconnectinggridind').value));
		zmolds[zmoldind].unloadactionzoneid = zunloadactionzoneid;
		zmolds[zmoldind].unloadactionzoneind = WTW.getActionZoneInd(zunloadactionzoneid, Number(dGet('wtw_tconnectinggridind').value));
		zmolds[zmoldind].actionzoneid = '';
		zmolds[zmoldind].actionzone2id = '';
		WTW.setDDLValue('wtw_tmoldcovering', zcoveringname);
		zmold = WTW.addMold(zmolds[zmoldind].moldname, zmolds[zmoldind], zmolds[zmoldind].parentname, zcoveringname);
		zmold.isPickable = true;
		WTW.setCoveringFormFields(zcoveringname);
		switch (zshape.toLowerCase()) {
			case 'tube':
				zmolds[zmoldind].paths.path1[0] = WTW.newPathPoint();
				zmolds[zmoldind].paths.path1[0].x = dGet('wtw_tmoldpositionx').value;
				zmolds[zmoldind].paths.path1[0].y = dGet('wtw_tmoldpositiony').value;
				zmolds[zmoldind].paths.path1[0].z = dGet('wtw_tmoldpositionz').value;
				zmolds[zmoldind].paths.path1[1] = WTW.newPathPoint();
				zmolds[zmoldind].paths.path1[1].x = dGet('wtw_tmoldpositionx').value;
				zmolds[zmoldind].paths.path1[1].y = (Number(dGet('wtw_tmoldpositiony').value) + 10);
				zmolds[zmoldind].paths.path1[1].z = dGet('wtw_tmoldpositionz').value;
				zmolds[zmoldind].paths.path1[1].sorder = 1;
				WTW.loadPointList(zmolds[zmoldind].paths.path1, 1);
				break;
			case 'line':
				zmolds[zmoldind].paths.path1[0] = WTW.newPathPoint();
				zmolds[zmoldind].paths.path1[0].x = dGet('wtw_tmoldpositionx').value;
				zmolds[zmoldind].paths.path1[0].y = dGet('wtw_tmoldpositiony').value;
				zmolds[zmoldind].paths.path1[0].z = dGet('wtw_tmoldpositionz').value;
				zmolds[zmoldind].paths.path1[1] = WTW.newPathPoint();
				zmolds[zmoldind].paths.path1[1].x = dGet('wtw_tmoldpositionx').value;
				zmolds[zmoldind].paths.path1[1].y = (Number(dGet('wtw_tmoldpositiony').value) + 10);
				zmolds[zmoldind].paths.path1[1].z = dGet('wtw_tmoldpositionz').value;
				zmolds[zmoldind].paths.path1[1].sorder = 1;
				WTW.loadPointList(zmolds[zmoldind].paths.path1, 1);
				break;
			default:
				break;
		}
		WTW.openEditPoles(zmold);
		WTW.pluginsOpenAddNewMold(zwebtype, zshape, zmolds[zmoldind].moldname);
		WTW.hideAdminMenu();
		WTW.show('wtw_adminmenu11');
		WTW.show('wtw_adminmenu11b');
		WTW.setNewMold();
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-openAddNewMold=' + ex.message);
	}
}

WTWJS.prototype.loadPointList = function(zpatharray, zpathnumber) {
	/* some molds use points (like lines, ribons, and tubes) */
	/* this functions loads the points for a given mold form for editing */
	try {
		var zpointlist = 'wtw_pointlist1';
		var zpathpoints = 'wtw_tmoldpath1points';
		var zpathname = 'Path 1';
		var zpointind = -1;
		if (WTW.isNumeric(dGet('wtw_teditpointindex').value)) {
			zpointind = Number(dGet('wtw_teditpointindex').value);
		}
		if (zpathnumber == 2) {
			zpointlist = 'wtw_pointlist2';
			zpathpoints = 'wtw_tmoldpath2points';
			zpathname = 'Path 2';
		}
		dGet(zpointlist).innerHTML = "<hr /><h4>" + zpathname + " Points (x,y,z)</h4><div id='wtw_bpointadd-' class='wtw-menulevel00 wtw-center' onclick='WTW.addPoint(this);' >Add Point</div>";
		if (zpatharray != null) {
			if (zpatharray.length > 0) {
				for (var i=0; i < zpatharray.length;i++) {
					if (zpatharray[i] != null) {
						if (zpointind == i) {
							dGet(zpointlist).innerHTML += "<div id='wtw_bpointedit-" + i + "' class='wtw-menulevel0selected wtw-center' onclick='WTW.editPoint(this);'><span style='font-size:.8em;color:#c0c0c0;'>(" + zpatharray[i].x + ", " + zpatharray[i].y + ", " + zpatharray[i].z + ")</span> Edit</div>";
						} else {
							dGet(zpointlist).innerHTML += "<div id='wtw_bpointedit-" + i + "' class='wtw-menulevel0 wtw-center' onclick='WTW.editPoint(this);'><span style='font-size:.8em;color:#c0c0c0;'>(" + zpatharray[i].x + ", " + zpatharray[i].y + ", " + zpatharray[i].z + ")</span> Edit</div>";
						}
						dGet(zpointlist).innerHTML += "<div id='wtw_bpointadd-" + i + "' class='wtw-menulevel00 wtw-center' onclick='WTW.addPoint(this);'>Add Point</div>";
					}
				}
			}
			dGet(zpathpoints).value = JSON.stringify(zpatharray);
		} else {
			dGet(zpathpoints).value = '';
		}
		dGet(zpointlist).innerHTML += '<hr /><br />';
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-loadPointList=' + ex.message);
	}
}

WTWJS.prototype.deletePoint = function() {
	/* delete a point from a mold (lines, ribbons, and tubes) */
	try {
		var zpointind = -1;
		var zmoldind = -1;
		var zmolds = null;
		switch (dGet('wtw_tmoldwebtype').value) {
			case 'community':
				zmolds = WTW.communitiesMolds;
				break;
			case 'building':
				zmolds = WTW.buildingMolds;
				break;
			case 'thing':
				zmolds = WTW.thingMolds;
				break;
		}
		if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
			zmoldind = Number(dGet('wtw_tmoldind').value);
		}
		if (WTW.isNumeric(dGet('wtw_teditpointindex').value)) {
			zpointind = Number(dGet('wtw_teditpointindex').value);
		}
		if (zmolds[zmoldind] != null && zpointind > -1) {
			if (zmolds[zmoldind].paths.path1 != null) {
				if (zmolds[zmoldind].paths.path1[zpointind] != null) {
					zmolds[zmoldind].paths.path1.splice(zpointind, 1);
				}
				for (var i=0; i < zmolds[zmoldind].paths.path1.length;i++) {
					if (zmolds[zmoldind].paths.path1[i] != null) {
						zmolds[zmoldind].paths.path1[i].sorder = i;
					}
				}
			}
		}
		dGet('wtw_teditpointindex').value = '';
		WTW.setNewMold();
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-deletePoint=' + ex.message);
	}
}

WTWJS.prototype.editPoint = function(zobj) {
	/* edit an existing point for a mold (lines, ribbons, and tubes) */
	try {
		dGet('wtw_tpointpositionx').value = '';
		dGet('wtw_tpointpositiony').value = '';
		dGet('wtw_tpointpositionz').value = '';
		var zmoldind = -1;
		var zmolds = null;
		switch (dGet('wtw_tmoldwebtype').value) {
			case 'community':
				zmolds = WTW.communitiesMolds;
				break;
			case 'building':
				zmolds = WTW.buildingMolds;
				break;
			case 'thing':
				zmolds = WTW.thingMolds;
				break;
		}
		if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
			zmoldind = Number(dGet('wtw_tmoldind').value);
		}
		if (zobj != null && zmolds != null) {
			if (zobj.id.indexOf('-') > -1 && zmolds[zmoldind] != null) {
				var znamepart = zobj.id.split('-');
				if (znamepart[1] != null) {
					dGet('wtw_teditpointindex').value = znamepart[1];
					var zpointind = -1;
					if (WTW.isNumeric(znamepart[1])) {
						zpointind = Number(znamepart[1]);
					}
					if (zmolds[zmoldind].paths.path1[zpointind] != null) {
						dGet('wtw_tpointpositionx').value = WTW.formatNumber(zmolds[zmoldind].paths.path1[zpointind].x,2);
						dGet('wtw_tpointpositiony').value = WTW.formatNumber(zmolds[zmoldind].paths.path1[zpointind].y,2);
						dGet('wtw_tpointpositionz').value = WTW.formatNumber(zmolds[zmoldind].paths.path1[zpointind].z,2);
						
						WTW.show('wtw_pointeditdiv');
					}
				}
			}
		} 
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-editPoint=' + ex.message);
	}
}

WTWJS.prototype.addPoint = function(zobj) {
	/* add a new point for a mold (lines, ribbons, and tubes) */
	try {
		var zmoldind = -1;
		var zmolds = null;
		switch (dGet('wtw_tmoldwebtype').value) {
			case 'community':
				zmolds = WTW.communitiesMolds;
				break;
			case 'building':
				zmolds = WTW.buildingMolds;
				break;
			case 'thing':
				zmolds = WTW.thingMolds;
				break;
		}
		if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
			zmoldind = Number(dGet('wtw_tmoldind').value);
		}
		if (zobj != null && zmolds != null) {
			if (zobj.id.indexOf('-') > -1 && zmolds[zmoldind] != null) {
				var zpointind = -1;
				var znamepart = zobj.id.split('-');
				if (znamepart[1] != null) {
					if (WTW.isNumeric(znamepart[1])) {
						zpointind = Number(znamepart[1]);
					}
				}
				if (zmolds[zmoldind].paths.path1 != null) {
					var zx = null;
					var zy = null;
					var zz = null;
					var zx1 = null;
					var zy1 = null;
					var zz1 = null;
					var zminx = null;
					var zminy = null;
					var zminz = null;
					var zmaxx = null;
					var zmaxy = null;
					var zmaxz = null;
					var znewx = null;
					var znewy = null;
					var znewz = null;
					var zmaxind = zmolds[zmoldind].paths.path1.length - 1;
					for (var i = zmolds[zmoldind].paths.path1.length - 1 ; i > -1 ; i--) {
						if (zmolds[zmoldind].paths.path1[i] != null) {
							if (i == 0 && zminx == null) {
								zminx = Number(zmolds[zmoldind].paths.path1[i].x);
								zminy = Number(zmolds[zmoldind].paths.path1[i].y);
								zminz = Number(zmolds[zmoldind].paths.path1[i].z);
							}
							if (i == zmolds[zmoldind].paths.path1.length - 1 && zmaxx == null) {
								zmaxx = Number(zmolds[zmoldind].paths.path1[i].x);
								zmaxy = Number(zmolds[zmoldind].paths.path1[i].y);
								zmaxz = Number(zmolds[zmoldind].paths.path1[i].z);
							}
							if (i == zpointind) {
								zx = Number(zmolds[zmoldind].paths.path1[i].x);
								zy = Number(zmolds[zmoldind].paths.path1[i].y);
								zz = Number(zmolds[zmoldind].paths.path1[i].z);
								zmolds[zmoldind].paths.path1[i + 1] = JSON.parse(JSON.stringify(zmolds[zmoldind].paths.path1[i]));
								zmolds[zmoldind].paths.path1[i + 1].sorder = i + 1;
							} else if (i > zpointind) {
								if (i == zpointind + 1) {
									zx1 = Number(zmolds[zmoldind].paths.path1[i].x);
									zy1 = Number(zmolds[zmoldind].paths.path1[i].y);
									zz1 = Number(zmolds[zmoldind].paths.path1[i].z);
								}
								zmolds[zmoldind].paths.path1[i + 1] = JSON.parse(JSON.stringify(zmolds[zmoldind].paths.path1[i]));
								zmolds[zmoldind].paths.path1[i + 1].sorder = i + 1;
							}
						}
					}
					if (zpointind == -1) {
						znewx = zminx;
						znewy = zminy;
						znewz = zminz;
					} else if (zpointind == zmaxind) {
						znewx = zmaxx;
						znewy = zmaxy;
						znewz = zmaxz;
					} else {
						if (zx != null && zx1 != null) {
							znewx = (zx + zx1) / 2;
							znewy = (zy + zy1) / 2;
							znewz = (zz + zz1) / 2;
						} else if (zx != null) {
							znewx = zx;
							znewy = zy;
							znewz = zz;
						} else if (zx1 != null) {
							znewx = zx1;
							znewy = zy1;
							znewz = zz1;
						} else {
							var zcoords = WTW.getNewCoordinates(50);
							znewx = zcoords.positionX;
							znewy = zcoords.positionY;
							znewz = zcoords.positionZ;
						}
					}
					zpointind += 1;
					zmolds[zmoldind].paths.path1[zpointind].x = znewx;
					zmolds[zmoldind].paths.path1[zpointind].y = znewy;
					zmolds[zmoldind].paths.path1[zpointind].z = znewz;
					zmolds[zmoldind].paths.path1[zpointind].sorder = zpointind;
				} else {
					zpointind = 0;
					var zcoords = WTW.getNewCoordinates(50);
					znewx = zcoords.positionX;
					znewy = zcoords.positionY;
					znewz = zcoords.positionZ;
					zmolds[zmoldind].paths.path1[0] = WTW.newPathPoint();
					zmolds[zmoldind].paths.path1[0].x = znewx;
					zmolds[zmoldind].paths.path1[0].y = znewy;
					zmolds[zmoldind].paths.path1[0].z = znewz;
					zmolds[zmoldind].paths.path1[0].sorder = 0;
				}
				dGet('wtw_teditpointindex').value = zpointind;
				if (zmolds[zmoldind].paths.path1[zpointind] != null) {
					dGet('wtw_tpointpositionx').value = WTW.formatNumber(zmolds[zmoldind].paths.path1[zpointind].x,2);
					dGet('wtw_tpointpositiony').value = WTW.formatNumber(zmolds[zmoldind].paths.path1[zpointind].y,2);
					dGet('wtw_tpointpositionz').value = WTW.formatNumber(zmolds[zmoldind].paths.path1[zpointind].z,2);
					WTW.show('wtw_pointeditdiv');
				}
				
			}
		} 
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-addPoint=' + ex.message);
	}
}

WTWJS.prototype.editEndPoint = function() {
	/* edit end point for a mold (lines, ribbons, and tubes) */
	try {
		dGet('wtw_teditpointindex').value = '';
		WTW.hide('wtw_pointeditdiv');
		dGet('wtw_tpointpositionx').value = '';
		dGet('wtw_tpointpositiony').value = '';
		dGet('wtw_tpointpositionz').value = '';
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-editEndPoint=' + ex.message);
	}
}

/* Sounds for molds */
WTWJS.prototype.setSoundFields = function() {
	/* set sounds fields on the form based on drop down selection */
	try {
		var zsoundattenuation = 'none';
		if (dGet('wtw_tmoldsoundattenuation').selectedIndex > -1) {
			zsoundattenuation = dGet('wtw_tmoldsoundattenuation').options[dGet('wtw_tmoldsoundattenuation').selectedIndex].value;
		}
		switch (zsoundattenuation) {
			case 'none':
				WTW.hide('wtw_moldsoundoffdiv');
				WTW.hide('wtw_moldsoundmaxdistdiv');
				WTW.hide('wtw_moldsoundrolloffdiv');
				WTW.hide('wtw_moldsoundrefdistdiv');
				break;
			case 'linear':
				WTW.hide('wtw_moldsoundrolloffdiv');
				WTW.hide('wtw_moldsoundrefdistdiv');
				WTW.show('wtw_moldsoundoffdiv');
				WTW.show('wtw_moldsoundmaxdistdiv');
				break;
			default:
				WTW.hide('wtw_moldsoundmaxdistdiv');
				WTW.show('wtw_moldsoundoffdiv');
				WTW.show('wtw_moldsoundrolloffdiv');
				WTW.show('wtw_moldsoundrefdistdiv');
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-setSoundFields=' + ex.message);
	}
}

WTWJS.prototype.changeCoveringType = function() {
	/* chaneg covering (texture) form fields based on type selected - and default values available */
	try {	
		var zimageid = 'ij7fi8qv7dbgb6zc';
		var zimagepath = '/content/system/stock/stucco-512x512.jpg';
		var zcoveringname = WTW.getDDLValue('wtw_tmoldcovering');
		if (zcoveringname.indexOf('mirror-') > -1) {
			var znameparts = zcoveringname.split('-');
			dGet('wtw_tmoldactionzone2id').value = znameparts[1];
			zcoveringname = 'mirror';
		}
		WTW.setCoveringFormFields(zcoveringname);
		switch (zcoveringname) {
			case 'directional texture': 
			case '2d texture':
			case 'texture': 
				if (dGet('wtw_tmoldtextureid').value == '') {
					dGet('wtw_tmoldtextureid').value = zimageid;
				}
				if (dGet('wtw_tmoldtexturepath').value == '') {
					dGet('wtw_tmoldtexturepath').value = zimagepath;
				}
				break; 
			case 'terrain':
				zimageid = '4to027vq39087bxr';
				zimagepath = '/content/system/stock/cement-512x512.jpg';
				if (dGet('wtw_tmoldtextureid').value == '') {
					dGet('wtw_tmoldtextureid').value = zimageid;
				}
				if (dGet('wtw_tmoldtexturepath').value == '') {
					dGet('wtw_tmoldtexturepath').value = zimagepath;
				}
				break;
			default:
				dGet('wtw_tmoldtextureid').value = '';
				dGet('wtw_tmoldtexturepath').value = '';
				dGet('wtw_tmoldtexturebumpid').value = '';
				dGet('wtw_tmoldtexturebumppath').value = '';
				dGet('wtw_moldtexturepreview').src = '';
				dGet('wtw_moldtexturepreview').alt = '';
				dGet('wtw_moldtexturepreview').title = '';
				dGet('wtw_moldtexturebumppreview').src = '';
				dGet('wtw_moldtexturebumppreview').alt = '';
				dGet('wtw_moldtexturebumppreview').title = '';
				break;
		}
		WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
		WTW.setPreviewImage('wtw_moldtexturebumppreview', 'wtw_tmoldtexturebumppath', 'wtw_tmoldtexturebumpid');
		WTW.setPreviewImage('wtw_moldheightmappreview', 'wtw_tmoldheightmappath', 'wtw_tmoldheightmapid');
		WTW.setPreviewImage('wtw_moldmixmappreview', 'wtw_tmoldmixmappath', 'wtw_tmoldmixmapid');
		WTW.setPreviewImage('wtw_moldtexturerpreview', 'wtw_tmoldtexturerpath', 'wtw_tmoldtexturerid');
		WTW.setPreviewImage('wtw_moldtexturegpreview', 'wtw_tmoldtexturegpath', 'wtw_tmoldtexturegid');
		WTW.setPreviewImage('wtw_moldtexturebpreview', 'wtw_tmoldtexturebpath', 'wtw_tmoldtexturebid');
		WTW.setPreviewImage('wtw_moldtexturebumprpreview', 'wtw_tmoldtexturebumprpath', 'wtw_tmoldtexturebumprid');
		WTW.setPreviewImage('wtw_moldtexturebumpgpreview', 'wtw_tmoldtexturebumpgpath', 'wtw_tmoldtexturebumpgid');
		WTW.setPreviewImage('wtw_moldtexturebumpbpreview', 'wtw_tmoldtexturebumpbpath', 'wtw_tmoldtexturebumpbid');
		WTW.setNewMold(1);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-changeCoveringType=' + ex.message);
	}
}

WTWJS.prototype.changeOnClickEvent = function(zobj) {
	/* molds can have an onclick assigned to them */
	/* this function enables the onclick and sets the form fields for input */
	try {
		if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
			var zwebtype = dGet('wtw_tmoldwebtype').value;
			var zmoldind = Number(dGet('wtw_tmoldind').value);
			var zmolds;
			switch (zwebtype) {
				case 'community':
					zmolds = WTW.communitiesMolds;
					break;
				case 'thing':
					zmolds = WTW.thingMolds;
					break;
				default:
					zmolds = WTW.buildingMolds;
					break;
			}
			if (zmolds[zmoldind] != null) {
				if (zmolds[zmoldind].graphics.webimages[0] != undefined) {
					dGet('wtw_tmoldimagejsfunction').value = zmolds[zmoldind].graphics.webimages[0].jsfunction;
					dGet('wtw_tmoldimagejsparameters').value = zmolds[zmoldind].graphics.webimages[0].jsparameters;
				}
			}
		}
		WTW.showInline('wtw_onclickjavascriptdiv');
		if (zobj.selectedIndex == 1) {
			dGet('wtw_tmoldimagejsfunction').value = 'WTW.openIFrame';
			dGet('wtw_moldjsparameterstitle').innerHTML = 'Web Address (URL)';
			dGet('wtw_moldjsparametersnote').innerHTML = '(Example: https://www.walktheweb.com)';
		} else if (zobj.selectedIndex == 2) {
			dGet('wtw_tmoldimagejsfunction').value = 'WTW.openWebpage';
			dGet('wtw_moldjsparameterstitle').innerHTML = 'Web Address (URL)';
			dGet('wtw_moldjsparametersnote').innerHTML = '(Example: https://www.walktheweb.com)';
		} else  if (zobj.selectedIndex == 0) {
			dGet('wtw_tmoldimagejsfunction').value = '';
			dGet('wtw_tmoldimagejsparameters').value = '';
			WTW.hide('wtw_onclickjavascriptdiv');
		} else {
			dGet('wtw_moldjsparameterstitle').innerHTML = 'JavaScript Parameters';
			dGet('wtw_moldjsparametersnote').innerHTML = '(optional; comma separated)';
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-changeOnClickEvent=' + ex.message);
	}
}

WTWJS.prototype.setPreviewImage = async function(zpreviewimageid, zimagepathid, zimageidid) {
	/* images have a preview thumbnail on the form */
	/* this function loads a preview image if it exists */
	try {
		if (dGet(zpreviewimageid) != null) {
			WTW.hide(zpreviewimageid);
			dGet(zpreviewimageid).src = '';
			var zimagepath = '';
			var zimageid = '';
			if (dGet(zimagepathid) != null) {
				zimagepath = dGet(zimagepathid).value;
			}
			if (dGet(zimageidid) != null) {
				zimageid = dGet(zimageidid).value;
			}
			if (zimagepath != '') {
				dGet(zpreviewimageid).src = zimagepath;
				if (dGet(zpreviewimageid).src != '') {
					WTW.show(zpreviewimageid);
				}
			} else if (zimageid != '') {
				WTW.getAsyncJSON('/connect/upload.php?uploadid=' + zimageid, 
					function(zresponse) {
						WTW.loadUpload(JSON.parse(zresponse),zimageid,0);
						var zimageinfo = WTW.getUploadFileData(zimageid);
						zimageinfo.image.onload = function() {	
							dGet(zpreviewimageid).src = zimageinfo.filedata;
						}
						if (dGet(zpreviewimageid).src != '') {
							WTW.show(zpreviewimageid);
						}
					}
				);
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-setPreviewImage=' + ex.message);
	}
}

WTWJS.prototype.submitMoldForm = async function(zselect) {
	/* submit mold form after edit (or after create new mold) */
	try {
		WTW.closeColorSelector(true);
		var zwebtype = dGet('wtw_tmoldwebtype').value;
		var zmolds = null;
		var zshape = 'box';
		var zmoldname = '';
		if (dGet('wtw_tmoldshape').value != '') {
			zshape = dGet('wtw_tmoldshape').value;
		}
		var zmoldind = Number(dGet('wtw_tmoldind').value);
		switch (zwebtype) {
			case 'community':
				zmolds = WTW.communitiesMolds;				
				break;
			case 'thing':
				zmolds = WTW.thingMolds;
				break;
			default:
				zmolds = WTW.buildingMolds;
				break;
		}
		zmoldname = 'local-' + zwebtype + 'molds-' + zmoldind + '-' + dGet('wtw_tmoldid').value + '-' + dGet('wtw_tconnectinggridind').value + '-' + dGet('wtw_tconnectinggridid').value + '-' + zshape;
		if (dGet('wtw_tmoldcsgmoldid').value == '') {
			WTW.setDDLValue('wtw_tmoldcsgaction', '');
		}		
		if (zselect == 0) {
			/* cancel or delete mold */
			/* note that molds are not deleted from the database, a delete flag is set so it is not loaded */
			var zbasemoldind = -1;
			var zbaseshape = 'box';
			if (zmolds[zmoldind].csg.moldid != '') {
				for (var i=0;i<zmolds.length;i++) {
					if (zmolds[i] != null) {
						if (zmolds[i].moldid == zmolds[zmoldind].csg.moldid) {
							zbasemoldind = i;
							zbaseshape = zmolds[i].shape;
						}
					}
				}
			}
			if (zmoldname != '') {
				WTW.disposeClean(zmoldname);
			}
			zmolds[zmoldind] = null;
			var zrequest = {
				'communityid': communityid,
				'buildingid': buildingid,
				'thingid': thingid,
				'moldid': dGet('wtw_tmoldid').value,
				'deleted': '1',
				'function':'deletemold'
			};
			WTW.postAsyncJSON('/core/handlers/molds.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
				}
			);
			dGet('wtw_tnewmold').value = '0';
			WTW.pluginsSubmitMoldForm(zselect);
			WTW.clearEditMold();
			if (zbasemoldind > -1) {
				WTW.openMoldForm(zbasemoldind, zbaseshape, zwebtype); 
			} else {
				WTW.hideAdminMenu();
				WTW.backToEdit();
			}
		} else if (zselect == -1) {
			/* cancel and undo changes to mold using WTW.moldBackup global variable */
			if (WTW.moldBackup != null) {
				zmolds[zmoldind] = WTW.moldBackup;
			}
			WTW.loadMoldForm(zmolds[zmoldind]);
			WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
			WTW.setPreviewImage('wtw_moldtexturebumppreview', 'wtw_tmoldtexturebumppath', 'wtw_tmoldtexturebumpid');
			WTW.setPreviewImage('wtw_moldheightmappreview', 'wtw_tmoldheightmappath', 'wtw_tmoldheightmapid');
			WTW.setPreviewImage('wtw_moldmixmappreview', 'wtw_tmoldmixmappath', 'wtw_tmoldmixmapid');
			WTW.setPreviewImage('wtw_moldtexturerpreview', 'wtw_tmoldtexturerpath', 'wtw_tmoldtexturerid');
			WTW.setPreviewImage('wtw_moldtexturegpreview', 'wtw_tmoldtexturegpath', 'wtw_tmoldtexturegid');
			WTW.setPreviewImage('wtw_moldtexturebpreview', 'wtw_tmoldtexturebpath', 'wtw_tmoldtexturebid');
			WTW.setPreviewImage('wtw_moldtexturebumprpreview', 'wtw_tmoldtexturebumprpath', 'wtw_tmoldtexturebumprid');
			WTW.setPreviewImage('wtw_moldtexturebumpgpreview', 'wtw_tmoldtexturebumpgpath', 'wtw_tmoldtexturebumpgid');
			WTW.setPreviewImage('wtw_moldtexturebumpbpreview', 'wtw_tmoldtexturebumpbpath', 'wtw_tmoldtexturebumpbid');
			WTW.disposeClean(zmolds[zmoldind].moldname);
			if (dGet('wtw_tnewmold').value == '1') {
				if (zmoldname != '') {
					WTW.disposeClean(zmoldname);
				}
				zmolds[zmoldind] = null;
			} else {
				zmolds[zmoldind].shown = '0';
				WTW.setShownMolds();
			}
			WTW.pluginsSubmitMoldForm(zselect);
			WTW.clearEditMold();
			WTW.hideAdminMenu();
			WTW.backToEdit();
		} else {
			/* save the mold (create new if needed) */
			if (zmolds[zmoldind] == null) {
				zmolds[zmoldind] = WTW.newMold();
			}
			switch (zwebtype) {
				case 'community':
					zmolds[zmoldind].communityinfo.communityid = communityid;
					zmolds[zmoldind].communityinfo.communityind = dGet('wtw_tcommunityind').value;
					break;
				case 'thing':
					zmolds[zmoldind].thinginfo.communityid = thingid;
					zmolds[zmoldind].thinginfo.thingind = dGet('wtw_tthingind').value;
					break;
				default:
					zmolds[zmoldind].buildinginfo.buildingid = buildingid;
					zmolds[zmoldind].buildinginfo.buildingind = WTW.getBuildingInd(buildingid);
					break;
			}
			zmolds[zmoldind].moldid = dGet('wtw_tmoldid').value;
			zmolds[zmoldind].moldind = zmoldind;
			zmolds[zmoldind].shape = dGet('wtw_tmoldshape').value;
			if (dGet('wtw_tmoldcovering').options[dGet('wtw_tmoldcovering').selectedIndex] != undefined) {
				zmolds[zmoldind].covering = dGet('wtw_tmoldcovering').options[dGet('wtw_tmoldcovering').selectedIndex].value;
			} else {
				zmolds[zmoldind].covering = dGet('wtw_tmoldcoveringold').value;
			}
			if (zmolds[zmoldind].covering.indexOf('mirror-') > -1) {
				zmolds[zmoldind].covering = 'mirror';
			}
			zmolds[zmoldind].position.x = dGet('wtw_tmoldpositionx').value;
			zmolds[zmoldind].position.y = dGet('wtw_tmoldpositiony').value;
			zmolds[zmoldind].position.z = dGet('wtw_tmoldpositionz').value;
			zmolds[zmoldind].scaling.x = dGet('wtw_tmoldscalingx').value;
			zmolds[zmoldind].scaling.y = dGet('wtw_tmoldscalingy').value;
			zmolds[zmoldind].scaling.z = dGet('wtw_tmoldscalingz').value;
			zmolds[zmoldind].rotation.x = dGet('wtw_tmoldrotationx').value;
			zmolds[zmoldind].rotation.y = dGet('wtw_tmoldrotationy').value;
			zmolds[zmoldind].rotation.z = dGet('wtw_tmoldrotationz').value;
			zmolds[zmoldind].scaling.special1 = dGet('wtw_tmoldspecial1').value;
			zmolds[zmoldind].scaling.special2 = dGet('wtw_tmoldspecial2').value;
			zmolds[zmoldind].graphics.uoffset = dGet('wtw_tmolduoffset').value;
			zmolds[zmoldind].graphics.voffset = dGet('wtw_tmoldvoffset').value;
			zmolds[zmoldind].graphics.uscale = dGet('wtw_tmolduscale').value;
			zmolds[zmoldind].graphics.vscale = dGet('wtw_tmoldvscale').value;
			if (zmolds[zmoldind].graphics.webimages[0] != undefined) {
				zmolds[zmoldind].graphics.webimages[0].imagepath = dGet('wtw_tmoldaddimagepath').value;
				zmolds[zmoldind].graphics.webimages[0].imageid = dGet('wtw_tmoldaddimageid').value;
				zmolds[zmoldind].graphics.webimages[0].imagehoverpath = dGet('wtw_tmoldaddimagehoverpath').value;
				zmolds[zmoldind].graphics.webimages[0].imagehoverid = dGet('wtw_tmoldaddimagehoverid').value;
				zmolds[zmoldind].graphics.webimages[0].imageclickpath = dGet('wtw_tmoldaddimageclickpath').value;
				zmolds[zmoldind].graphics.webimages[0].imageclickid = dGet('wtw_tmoldaddimageclickid').value;
				zmolds[zmoldind].graphics.webimages[0].jsfunction = dGet('wtw_tmoldimagejsfunction').value;
				zmolds[zmoldind].graphics.webimages[0].jsparameters = dGet('wtw_tmoldimagejsparameters').value;
			} else {
				zmolds[zmoldind].graphics.webimages[0] = WTW.newWebImage();
			}
			if (dGet('wtw_tmoldgraphiclevel').checked) {
				zmolds[zmoldind].graphics.level = '1';
			} else {
				zmolds[zmoldind].graphics.level = '0';
			}
			if (dGet('wtw_tmoldreceiveshadows').checked) {
				zmolds[zmoldind].graphics.receiveshadows = '1';
			} else {
				zmolds[zmoldind].graphics.receiveshadows = '0';
			}
			if (dGet('wtw_tmoldcastshadows').checked) {
				zmolds[zmoldind].graphics.castshadows = '1';
			} else {
				zmolds[zmoldind].graphics.castshadows = '0';
			}
			zmolds[zmoldind].opacity = dGet('wtw_tmoldopacity').value;
			zmolds[zmoldind].objects.uploadobjectid = dGet('wtw_tmolduploadobjectid').value;
			zmolds[zmoldind].objects.folder = dGet('wtw_tmoldobjectfolder').value;
			zmolds[zmoldind].objects.file = dGet('wtw_tmoldobjectfile').value;
			zmolds[zmoldind].subdivisions = dGet('wtw_tmoldsubdivisions').value;
			zmolds[zmoldind].graphics.texture.id = dGet('wtw_tmoldtextureid').value;
			zmolds[zmoldind].graphics.texture.path = dGet('wtw_tmoldtexturepath').value;
			zmolds[zmoldind].graphics.texture.bumpid = dGet('wtw_tmoldtexturebumpid').value;
			zmolds[zmoldind].graphics.texture.bumppath = dGet('wtw_tmoldtexturebumppath').value;
			zmolds[zmoldind].graphics.texture.videoid = dGet('wtw_tmoldvideoid').value;
			zmolds[zmoldind].graphics.texture.video = dGet('wtw_tmoldvideopath').value;
			zmolds[zmoldind].graphics.texture.videoposterid = dGet('wtw_tmoldvideoposterid').value;
			zmolds[zmoldind].graphics.texture.videoposter = dGet('wtw_tmoldvideoposterpath').value;
			zmolds[zmoldind].graphics.heightmap.id = dGet('wtw_tmoldheightmapid').value;
			zmolds[zmoldind].graphics.heightmap.path = dGet('wtw_tmoldheightmappath').value;
			zmolds[zmoldind].graphics.heightmap.mixmapid = dGet('wtw_tmoldmixmapid').value;
			zmolds[zmoldind].graphics.heightmap.mixmappath = dGet('wtw_tmoldmixmappath').value;
			zmolds[zmoldind].graphics.heightmap.texturerid = dGet('wtw_tmoldtexturerid').value;
			zmolds[zmoldind].graphics.heightmap.texturerpath = dGet('wtw_tmoldtexturerpath').value;
			zmolds[zmoldind].graphics.heightmap.texturegid = dGet('wtw_tmoldtexturegid').value;
			zmolds[zmoldind].graphics.heightmap.texturegpath = dGet('wtw_tmoldtexturegpath').value;
			zmolds[zmoldind].graphics.heightmap.texturebid = dGet('wtw_tmoldtexturebid').value;
			zmolds[zmoldind].graphics.heightmap.texturebpath = dGet('wtw_tmoldtexturebpath').value;
			zmolds[zmoldind].graphics.heightmap.texturebumprid = dGet('wtw_tmoldtexturebumprid').value;
			zmolds[zmoldind].graphics.heightmap.texturebumprpath = dGet('wtw_tmoldtexturebumprpath').value;
			zmolds[zmoldind].graphics.heightmap.texturebumpgid = dGet('wtw_tmoldtexturebumpgid').value;
			zmolds[zmoldind].graphics.heightmap.texturebumpgpath = dGet('wtw_tmoldtexturebumpgpath').value;
			zmolds[zmoldind].graphics.heightmap.texturebumpbid = dGet('wtw_tmoldtexturebumpbid').value;
			zmolds[zmoldind].graphics.heightmap.texturebumpbpath = dGet('wtw_tmoldtexturebumpbpath').value;
			zmolds[zmoldind].graphics.heightmap.maxheight = dGet('wtw_tmoldmaxheight').value;
			var ziswaterreflection = '0';
			if (dGet('wtw_tmoldwaterreflection').checked) {
				ziswaterreflection = '1';
			}
			zmolds[zmoldind].graphics.waterreflection = ziswaterreflection;
			if (dGet('wtw_tmoldcheckcollisions').checked == true) {
				zmolds[zmoldind].checkcollisions = '1';
			} else {
				zmolds[zmoldind].checkcollisions = '0';
			}
			var zispickable = '0';
			if (dGet('wtw_tmoldispickable').checked) {
				zispickable = '1';
			}
			zmolds[zmoldind].ispickable = zispickable;
			zmolds[zmoldind].graphics.webimageind = dGet('wtw_tmoldimageind').value;
			zmolds[zmoldind].sound.id = dGet('wtw_tmoldsoundid').value;
			zmolds[zmoldind].sound.name = dGet('wtw_tmoldsoundname').value;
			var zsoundattenuation = 'none';
			if (dGet('wtw_tmoldsoundattenuation').selectedIndex > -1) {
				zsoundattenuation = dGet('wtw_tmoldsoundattenuation').options[dGet('wtw_tmoldsoundattenuation').selectedIndex].value;
			}
			zmolds[zmoldind].sound.attenuation = zsoundattenuation;
			if (dGet('wtw_tmoldsoundloop').checked) {
				zmolds[zmoldind].sound.loop = '1';
			} else {
				zmolds[zmoldind].sound.loop = '0';
			}
			zmolds[zmoldind].sound.maxdistance = dGet('wtw_tmoldsoundmaxdistance').value;
			zmolds[zmoldind].sound.rollofffactor = dGet('wtw_tmoldsoundrollofffactor').value;
			zmolds[zmoldind].sound.refdistance = dGet('wtw_tmoldsoundrefdistance').value;
			zmolds[zmoldind].sound.coneinnerangle = dGet('wtw_tmoldsoundconeinnerangle').value;
			zmolds[zmoldind].sound.coneouterangle = dGet('wtw_tmoldsoundconeouterangle').value;
			zmolds[zmoldind].sound.coneoutergain = dGet('wtw_tmoldsoundconeoutergain').value;
			zmolds[zmoldind].actionzoneid = dGet('wtw_tmoldactionzoneid').value;
			zmolds[zmoldind].actionzoneind = WTW.getActionZoneInd(zmolds[zmoldind].actionzoneid,0);
			zmolds[zmoldind].actionzone2id = dGet('wtw_tmoldactionzone2id').value;
			zmolds[zmoldind].loadactionzoneid = dGet('wtw_tmoldloadactionzoneid').options[dGet('wtw_tmoldloadactionzoneid').selectedIndex].value;
			if (dGet('wtw_tmoldunloadactionzoneid').options.length > 0) {
				zmolds[zmoldind].unloadactionzoneid = dGet('wtw_tmoldunloadactionzoneid').options[dGet('wtw_tmoldunloadactionzoneid').selectedIndex].value;
			}
			zmolds[zmoldind].loadactionzoneind = WTW.getActionZoneInd(zmolds[zmoldind].loadactionzoneid,0);
			zmolds[zmoldind].unloadactionzoneind = WTW.getActionZoneInd(zmolds[zmoldind].unloadactionzoneid,-1);
			zmolds[zmoldind].csg.moldid = dGet('wtw_tmoldcsgmoldid').value;
			if (dGet('wtw_tmoldcsgaction').selectedIndex > -1) {
				zmolds[zmoldind].csg.action = dGet('wtw_tmoldcsgaction').options[dGet('wtw_tmoldcsgaction').selectedIndex].value;
			} else {
				zmolds[zmoldind].csg.action = '';
			}
			if (dGet('wtw_tmoldphysicsenabled').checked) {
				zmolds[zmoldind].physics.enabled = 1;
			} else {
				zmolds[zmoldind].physics.enabled = 0;
			}
			if (dGet('wtw_tmoldphysicsistriggershape').checked) {
				zmolds[zmoldind].physics.istriggershape = 1;
			} else {
				zmolds[zmoldind].physics.istriggershape = 0;
			}
			if (dGet('wtw_tmoldphysicsstartasleep').checked) {
				zmolds[zmoldind].physics.startasleep = 1;
			} else {
				zmolds[zmoldind].physics.startasleep = 0;
			}
			zmolds[zmoldind].physics.center.x = dGet('wtw_tmoldphysicscenterx').value;
			zmolds[zmoldind].physics.center.y = dGet('wtw_tmoldphysicscentery').value;
			zmolds[zmoldind].physics.center.z = dGet('wtw_tmoldphysicscenterz').value;
			zmolds[zmoldind].physics.extents.x = dGet('wtw_tmoldphysicsextentsx').value;
			zmolds[zmoldind].physics.extents.y = dGet('wtw_tmoldphysicsextentsy').value;
			zmolds[zmoldind].physics.extents.z = dGet('wtw_tmoldphysicsextentsz').value;
			zmolds[zmoldind].physics.friction = dGet('wtw_tmoldphysicsfriction').value;
			zmolds[zmoldind].physics.mass = dGet('wtw_tmoldphysicsmass').value;
			zmolds[zmoldind].physics.pointa.x = dGet('wtw_tmoldphysicspointax').value;
			zmolds[zmoldind].physics.pointa.y = dGet('wtw_tmoldphysicspointay').value;
			zmolds[zmoldind].physics.pointa.z = dGet('wtw_tmoldphysicspointaz').value;
			zmolds[zmoldind].physics.pointb.x = dGet('wtw_tmoldphysicspointbx').value;
			zmolds[zmoldind].physics.pointb.y = dGet('wtw_tmoldphysicspointby').value;
			zmolds[zmoldind].physics.pointb.z = dGet('wtw_tmoldphysicspointbz').value;
			zmolds[zmoldind].physics.radius = dGet('wtw_tmoldphysicsradius').value;
			zmolds[zmoldind].physics.restitution = dGet('wtw_tmoldphysicsrestitution').value;
			zmolds[zmoldind].physics.rotation.w = dGet('wtw_tmoldphysicsrotationw').value;
			zmolds[zmoldind].physics.rotation.x = dGet('wtw_tmoldphysicsrotationx').value;
			zmolds[zmoldind].physics.rotation.y = dGet('wtw_tmoldphysicsrotationy').value;
			zmolds[zmoldind].physics.rotation.z = dGet('wtw_tmoldphysicsrotationz').value;
			zmolds[zmoldind].webtext.webtext = WTW.encode(dGet('wtw_tmoldwebtext').value);
			zmolds[zmoldind].webtext.webstyle = WTW.encode(dGet('wtw_tmoldwebstyle').value);
			zmolds[zmoldind].color.diffusecolor = dGet('wtw_tmolddiffusecolor').value;
			zmolds[zmoldind].color.emissivecolor = dGet('wtw_tmoldemissivecolor').value;
			zmolds[zmoldind].color.specularcolor = dGet('wtw_tmoldspecularcolor').value;
			zmolds[zmoldind].color.ambientcolor = dGet('wtw_tmoldambientcolor').value;
			zmolds[zmoldind].alttag.name = WTW.encode(dGet('wtw_tmoldalttag').value);
			zmolds[zmoldind].shown = '0';
			zmolds[zmoldind].graphics.texture.backupid = '';
			zmolds[zmoldind].parentname = 'local-connectinggrids-' + dGet('wtw_tconnectinggridind').value + '-' + dGet('wtw_tconnectinggridid').value + '--';
			zmolds[zmoldind].moldname = zmoldname;
			zmolds[zmoldind].connectinggridid = dGet('wtw_tconnectinggridid').value;
			zmolds[zmoldind].connectinggridind = dGet('wtw_tconnectinggridind').value;
			
			var zrequest = {
				'communityid': communityid,
				'buildingid': buildingid,
				'thingid': thingid,
				'moldid': zmolds[zmoldind].moldid,
				'moldind': zmoldind,
				'loadactionzoneid': zmolds[zmoldind].loadactionzoneid,
				'unloadactionzoneid': zmolds[zmoldind].unloadactionzoneid,
				'webtype': zwebtype,
				'shape': zmolds[zmoldind].shape,
				'covering': zmolds[zmoldind].covering,
				'positionx': zmolds[zmoldind].position.x,
				'positiony': zmolds[zmoldind].position.y,
				'positionz': zmolds[zmoldind].position.z,
				'scalingx': zmolds[zmoldind].scaling.x,
				'scalingy': zmolds[zmoldind].scaling.y,
				'scalingz': zmolds[zmoldind].scaling.z,
				'rotationx': zmolds[zmoldind].rotation.x,
				'rotationy': zmolds[zmoldind].rotation.y,
				'rotationz': zmolds[zmoldind].rotation.z,
				'special1': zmolds[zmoldind].scaling.special1,
				'special2': zmolds[zmoldind].scaling.special2,
				'uoffset': zmolds[zmoldind].graphics.uoffset,
				'voffset': zmolds[zmoldind].graphics.voffset,
				'uscale': zmolds[zmoldind].graphics.uscale,
				'vscale': zmolds[zmoldind].graphics.vscale,
				'uploadobjectid': zmolds[zmoldind].objects.uploadobjectid,
				'objectfolder': zmolds[zmoldind].objects.folder,
				'objectfile': zmolds[zmoldind].objects.file,
				'receiveshadows': zmolds[zmoldind].graphics.receiveshadows,
				'castshadows': zmolds[zmoldind].graphics.castshadows,
				'graphiclevel': zmolds[zmoldind].graphics.level,
				'videoid': zmolds[zmoldind].graphics.texture.videoid,
				'videoposterid': zmolds[zmoldind].graphics.texture.videoposterid,
				'textureid': zmolds[zmoldind].graphics.texture.id,
				'texturebumpid': zmolds[zmoldind].graphics.texture.bumpid,
				'heightmapid': zmolds[zmoldind].graphics.heightmap.id,
				'mixmapid': zmolds[zmoldind].graphics.heightmap.mixmapid,
				'texturerid': zmolds[zmoldind].graphics.heightmap.texturerid,
				'texturegid': zmolds[zmoldind].graphics.heightmap.texturegid,
				'texturebid': zmolds[zmoldind].graphics.heightmap.texturebid,
				'texturebumprid': zmolds[zmoldind].graphics.heightmap.texturebumprid,
				'texturebumpgid': zmolds[zmoldind].graphics.heightmap.texturebumpgid,
				'texturebumpbid': zmolds[zmoldind].graphics.heightmap.texturebumpbid,
				'soundid': zmolds[zmoldind].sound.id,
				'soundname': zmolds[zmoldind].sound.name,
				'soundattenuation': zmolds[zmoldind].sound.attenuation,
				'soundmaxdistance': zmolds[zmoldind].sound.maxdistance,
				'soundrollofffactor': zmolds[zmoldind].sound.rollofffactor,
				'soundrefdistance': zmolds[zmoldind].sound.refdistance,
				'soundconeinnerangle': zmolds[zmoldind].sound.coneinnerangle,
				'soundconeouterangle': zmolds[zmoldind].sound.coneouterangle,
				'soundconeoutergain': zmolds[zmoldind].sound.coneoutergain,
				'opacity': zmolds[zmoldind].opacity,
				'subdivisions': zmolds[zmoldind].subdivisions,
				'actionzoneid': zmolds[zmoldind].actionzoneid,
				'actionzone2id': zmolds[zmoldind].actionzone2id,
				'minheight': '0',
				'maxheight': zmolds[zmoldind].graphics.heightmap.maxheight,
				'checkcollisions': zmolds[zmoldind].checkcollisions,
				'ispickable': zmolds[zmoldind].ispickable,
				'csgmoldid': zmolds[zmoldind].csg.moldid,
				'csgaction': zmolds[zmoldind].csg.action,
				'physicsenabled': zmolds[zmoldind].physics.enabled,
				'physicsistriggershape': zmolds[zmoldind].physics.istriggershape,
				'physicsstartasleep': zmolds[zmoldind].physics.startasleep,
				'physicscenterx': zmolds[zmoldind].physics.center.x,
				'physicscentery': zmolds[zmoldind].physics.center.y,
				'physicscenterz': zmolds[zmoldind].physics.center.z,
				'physicsextentsx': zmolds[zmoldind].physics.extents.x,
				'physicsextentsy': zmolds[zmoldind].physics.extents.y,
				'physicsextentsz': zmolds[zmoldind].physics.extents.z,
				'physicsfriction': zmolds[zmoldind].physics.friction,
				'physicsmass': zmolds[zmoldind].physics.mass,
				'physicspointax': zmolds[zmoldind].physics.pointa.x,
				'physicspointay': zmolds[zmoldind].physics.pointa.y,
				'physicspointaz': zmolds[zmoldind].physics.pointa.z,
				'physicspointbx': zmolds[zmoldind].physics.pointb.x,
				'physicspointby': zmolds[zmoldind].physics.pointb.y,
				'physicspointbz': zmolds[zmoldind].physics.pointb.z,
				'physicsradius': zmolds[zmoldind].physics.radius,
				'physicsrestitution': zmolds[zmoldind].physics.restitution,
				'physicsrotationw': zmolds[zmoldind].physics.rotation.w,
				'physicsrotationx': zmolds[zmoldind].physics.rotation.x,
				'physicsrotationy': zmolds[zmoldind].physics.rotation.y,
				'physicsrotationz': zmolds[zmoldind].physics.rotation.z,
				'imageid': '',
				'imageind': zmolds[zmoldind].graphics.webimageind,
				'imagepath': '',
				'imagehoverpath': '',
				'imageclickid': '',
				'alttagname': zmolds[zmoldind].alttag.name,
				'webtext': zmolds[zmoldind].webtext.webtext,
				'webstyle': zmolds[zmoldind].webtext.webstyle,
				'diffusecolor': zmolds[zmoldind].color.diffusecolor,
				'emissivecolor': zmolds[zmoldind].color.emissivecolor,
				'specularcolor': zmolds[zmoldind].color.specularcolor,
				'ambientcolor': zmolds[zmoldind].color.ambientcolor,
				'path1points': dGet('wtw_tmoldpath1points').value,
				'path2points': dGet('wtw_tmoldpath2points').value,
				'imageid': zmolds[zmoldind].graphics.webimages[0].imageid,
				'imagehoverid': zmolds[zmoldind].graphics.webimages[0].imagehoverid,
				'imageclickid': zmolds[zmoldind].graphics.webimages[0].imageclickid,
				'jsfunction': zmolds[zmoldind].graphics.webimages[0].jsfunction,
				'jsparameters': zmolds[zmoldind].graphics.webimages[0].jsparameters,
				'waterreflection': zmolds[zmoldind].graphics.waterreflection,
				'deleted': '0',
				'function':'savemold'
			};
			WTW.postAsyncJSON('/core/handlers/molds.php', zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					dGet('wtw_tnewmold').value = '0';
					WTW.checkActionZones();
					WTW.pluginsSubmitMoldForm(zselect);
					WTW.clearEditMold();
					WTW.hideAdminMenu();
					WTW.backToEdit();
				}
			);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-submitMoldForm=' + ex.message);
	}
}

WTWJS.prototype.clearEditMold = function() {
	/* reset mold form to clear all values to default */
	try {
		dGet('wtw_tmoldid').value = '';
		WTW.getLoadZoneList(WTW.getLoadActionZoneID('normal'));
		dGet('wtw_tmoldloadactionzoneid').selectedIndex = -1;
		dGet('wtw_tmoldunloadactionzoneid').selectedIndex = -1;
		dGet('wtw_tmoldcovering').selectedIndex = -1;
		dGet('wtw_tmoldcoveringold').value = '';
		dGet('wtw_tmoldshape').value = '';
		dGet('wtw_tmoldactionzoneid').value = '';
		dGet('wtw_tmoldactionzone2id').value = '';
		dGet('wtw_tmoldpositionx').value = '0';
		dGet('wtw_tmoldpositiony').value = '0';
		dGet('wtw_tmoldpositionz').value = '0';
		dGet('wtw_tmoldscalingx').value = '1';
		dGet('wtw_tmoldscalingy').value = '1';
		dGet('wtw_tmoldscalingz').value = '1';
		dGet('wtw_tmoldrotationx').value = '0';
		dGet('wtw_tmoldrotationy').value = '0';
		dGet('wtw_tmoldrotationz').value = '0';
		dGet('wtw_tmoldspecial1').value = '0';
		dGet('wtw_tmoldspecial2').value = '0';
		dGet('wtw_tmoldsubdivisions').value = '12';
		dGet('wtw_tmoldopacity').value = '100';
		dGet('wtw_tmolduoffset').value = '0';
		dGet('wtw_tmoldvoffset').value = '0';
		dGet('wtw_tmolduscale').value = '0';
		dGet('wtw_tmoldvscale').value = '0';
		dGet('wtw_tmolduploadobjectid').value = '';
		dGet('wtw_tmoldobjectfolder').value = '';
		dGet('wtw_tmoldobjectfile').value = '';
		dGet('wtw_tmoldtextureid').value = '';
		dGet('wtw_tmoldtexturepath').value = '';
		dGet('wtw_tmoldtexturebumpid').value = '';
		dGet('wtw_tmoldtexturebumppath').value = '';
		dGet('wtw_tmoldheightmapid').value = '';
		dGet('wtw_tmoldheightmappath').value = '';
		dGet('wtw_tmoldmixmapid').value = '';
		dGet('wtw_tmoldmixmappath').value = '';
		dGet('wtw_tmoldtexturerid').value = '';
		dGet('wtw_tmoldtexturerpath').value = '';
		dGet('wtw_tmoldtexturegid').value = '';
		dGet('wtw_tmoldtexturegpath').value = '';
		dGet('wtw_tmoldtexturebid').value = '';
		dGet('wtw_tmoldtexturebpath').value = '';
		dGet('wtw_tmoldtexturebumprid').value = '';
		dGet('wtw_tmoldtexturebumprpath').value = '';
		dGet('wtw_tmoldtexturebumpgid').value = '';
		dGet('wtw_tmoldtexturebumpgpath').value = '';
		dGet('wtw_tmoldtexturebumpbid').value = '';
		dGet('wtw_tmoldtexturebumpbpath').value = '';
		dGet('wtw_tmoldvideoid').value = '';
		dGet('wtw_tmoldvideopath').value = '';
		dGet('wtw_tmoldvideoposterid').value = '';
		dGet('wtw_tmoldvideoposterpath').value = '';
		dGet('wtw_tmoldind').value = '-1';
		dGet('wtw_tmoldname').value = '';
		dGet('wtw_tmoldcsgmoldid').value = '';
		dGet('wtw_tmoldcsgaction').selectedIndex = 0;
		dGet('wtw_tmoldalttag').value = '';
		dGet('wtw_tmolddiffusecolor').value = '#ffffff';
		dGet('wtw_tmoldemissivecolor').value = '#000000';
		dGet('wtw_tmoldspecularcolor').value = '#686868';
		dGet('wtw_tmoldambientcolor').value = '#575757';
		dGet('wtw_tmoldwebstyle').value = '';
		dGet('wtw_tmoldwebtext').value = '';
		dGet('wtw_tmoldsoundid').value = '';
		dGet('wtw_tmoldsoundname').value = '';
		dGet('wtw_tmoldsoundattenuation').selectedIndex = -1;
		dGet('wtw_tmoldsoundloop').checked = true;
		dGet('wtw_tmoldsoundmaxdistance').value = '100';
		dGet('wtw_tmoldsoundrollofffactor').value = '1';
		dGet('wtw_tmoldsoundrefdistance').value = '1';
		dGet('wtw_tmoldsoundconeinnerangle').value = '90';
		dGet('wtw_tmoldsoundconeouterangle').value = '180';
		dGet('wtw_tmoldsoundconeoutergain').value = '.5';
		dGet('wtw_tmoldimageind').value = '';
		dGet('wtw_tmoldwaterreflection').checked = false;
		dGet('wtw_tmoldcheckcollisions').checked = true;
		dGet('wtw_tmoldispickable').checked = false;
		dGet('wtw_tmoldmaxheight').value = '30';
		dGet('wtw_tmoldreceiveshadows').checked = false;
		dGet('wtw_tmoldcastshadows').checked = false;
		dGet('wtw_tmoldgraphiclevel').checked = false;
		dGet('wtw_tmoldaddimagepath').value = '';
		dGet('wtw_tmoldaddimageid').value = '';
		dGet('wtw_tmoldaddimagehoverpath').value = '';
		dGet('wtw_tmoldaddimagehoverid').value = '';
		dGet('wtw_tmoldaddimageclickpath').value = '';
		dGet('wtw_tmoldaddimageclickid').value = '';
		dGet('wtw_tmoldimagejsfunction').value = '';
		dGet('wtw_tmoldimagejsparameters').value = '';
		dGet('wtw_tmoldphysicsenabled').checked = false;
		dGet('wtw_tmoldphysicsistriggershape').checked = false;
		dGet('wtw_tmoldphysicsstartasleep').checked = false;
		dGet('wtw_tmoldphysicscenterx').value = '0.00';
		dGet('wtw_tmoldphysicscentery').value = '0.00';
		dGet('wtw_tmoldphysicscenterz').value = '0.00';
		dGet('wtw_tmoldphysicsextentsx').value = '0.00';
		dGet('wtw_tmoldphysicsextentsy').value = '0.00';
		dGet('wtw_tmoldphysicsextentsz').value = '0.00';
		dGet('wtw_tmoldphysicsfriction').value = '0.00';
		dGet('wtw_tmoldphysicsmass').value = '0.00';
		dGet('wtw_tmoldphysicspointax').value = '0.00';
		dGet('wtw_tmoldphysicspointay').value = '0.00';
		dGet('wtw_tmoldphysicspointaz').value = '0.00';
		dGet('wtw_tmoldphysicspointbx').value = '0.00';
		dGet('wtw_tmoldphysicspointby').value = '0.00';
		dGet('wtw_tmoldphysicspointbz').value = '0.00';
		dGet('wtw_tmoldphysicsradius').value = '0.00';
		dGet('wtw_tmoldphysicsrestitution').value = '0.00';
		dGet('wtw_tmoldphysicsrotationw').value = '0.00';
		dGet('wtw_tmoldphysicsrotationx').value = '0.00';
		dGet('wtw_tmoldphysicsrotationy').value = '0.00';
		dGet('wtw_tmoldphysicsrotationz').value = '0.00';
		WTW.pluginsClearEditMold();
		scene.render();
		WTW.closeEditPoles();
		WTW.setShownMolds();
		WTW.moldBackup = null;
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-clearEditMold=' + ex.message);
	}
}


/* edit poles to help align molds when editing */

WTWJS.prototype.openEditPoles = function(zmold) {
	/* open edit pole lines and position, rotation, and scale to mold */
	try {
		WTW.closeEditPoles();
		if (zmold != null) {
			var zmoldguide = WTW.getMeshOrNodeByID(zmold.id + '-guide');
			if (zmoldguide != null) {
				zmold = zmoldguide;
			}
		}
		if (zmold != null && (dGet('wtw_tmoldid').value != '' || dGet('wtw_tactionzoneid').value != '' || dGet('wtw_teditconnectinggridid').value != '')) {
			var zmoldx = zmold.scaling.x;
			var zmoldy = zmold.scaling.y;
			var zmoldz = zmold.scaling.z;
			var zlenx = 100;
			var zleny = 100;
			var zlenz = 100;
			var zminx = -.5;
			var zminy = -.5;
			var zminz = -.5;
			var zmaxx = .5;
			var zmaxy = .5;
			var zmaxz = .5;
			if (zmold.WTW == null && dGet('wtw_teditconnectinggridid').value != '') {
				/* check for bounding box for edit guide lines positions */
				var zlastmin = null;
				var zlastmax = null;
				var zchildmolds = zmold.getChildren();
				for (var i=0; i < zchildmolds.length; i++) {
					if (zchildmolds[i] != null) {
						if (zchildmolds[i].id != undefined) {
							/* children may be molds or parented to action zones (not looking to load zones) */
							if (zchildmolds[i].id.indexOf('molds-') > -1 || (zchildmolds[i].id.indexOf('-actionzone') > -1 && zchildmolds[i].id.indexOf('loadzone') == -1)) {
								if (zchildmolds[i].id.indexOf('molds-') > -1 && zchildmolds[i].id.indexOf('-babylonfile') > -1) {
									if (zchildmolds[i].WTW != null) {
										if (zchildmolds[i].WTW.bounding != null) {
											if (zchildmolds[i].WTW.bounding.max != null && zchildmolds[i].WTW.bounding.min != null) {
												try {
													var zmin = zchildmolds[i].WTW.bounding.min;
													var zmax = zchildmolds[i].WTW.bounding.max;
													if (zlastmin == null && zlastmax == null) {
														zlastmin = zmin;
														zlastmax = zmax;
													} else {
														zlastmin = BABYLON.Vector3.Minimize(zlastmin, zmin);
														zlastmax = BABYLON.Vector3.Maximize(zlastmax, zmax);
													}
												} catch (ex) {}
											}
										}
									} else {
										/* if bounding info is not available, check bounding box */
										var zmoldchildren = zchildmolds[i].getChildren();
										for (var j=0; j<zmoldchildren.length;j++) {
											if (zmoldchildren[j] != null) {
												try {
													if (typeof zmoldchildren[j].getBoundingInfo == 'function') {
														var zmin = zmoldchildren[j].getBoundingInfo().boundingBox.minimum;
														var zmax = zmoldchildren[j].getBoundingInfo().boundingBox.maximum;
														if (zlastmin == null && zlastmax == null) {
															zlastmin = zmin;
															zlastmax = zmax;
														} else {
															zlastmin = BABYLON.Vector3.Minimize(zlastmin, zmin);
															zlastmax = BABYLON.Vector3.Maximize(zlastmax, zmax);
														}
													}
												} catch (ex) {}
											}
										}
									}
								} else if (zchildmolds[i].id.indexOf('molds-') > -1) {
									/* if mold without children */
									try {
										if (typeof zchildmolds[i].getBoundingInfo == 'function') {
											var zmin = zchildmolds[i].getBoundingInfo().boundingBox.minimum;
											var zmax = zchildmolds[i].getBoundingInfo().boundingBox.maximum;
											if (zlastmin == null && zlastmax == null) {
												zlastmin = zmin;
												zlastmax = zmax;
											} else {
												zlastmin = BABYLON.Vector3.Minimize(zlastmin, zmin);
												zlastmax = BABYLON.Vector3.Maximize(zlastmax, zmax);
											}
										}
									} catch (ex) {}
								} else if (zchildmolds[i].id.indexOf('-actionzone') > -1) {
									/* if action zone is the parent */
									var zmoldchildren = zchildmolds[i].getChildren();
									for (var j=0; j<zmoldchildren.length;j++) {
										if (zmoldchildren[j] != null) {
											if (zmoldchildren[j].id.indexOf('molds-') > -1) {
												if (typeof zmoldchildren[j].getBoundingInfo == 'function') {
													var zmin = zmoldchildren[j].getBoundingInfo().boundingBox.minimum;
													var zmax = zmoldchildren[j].getBoundingInfo().boundingBox.maximum;
													if (zlastmin == null && zlastmax == null) {
														zlastmin = zmin;
														zlastmax = zmax;
													} else {
														zlastmin = BABYLON.Vector3.Minimize(zlastmin, zmin);
														zlastmax = BABYLON.Vector3.Maximize(zlastmax, zmax);
													}
												}
											} else if (zmoldchildren[j].id.indexOf('-actionzone') > -1) {
												/* if axle action zone is parent */
												var zazchildren = zmoldchildren[j].getChildren();
												for (var k=0; k<zazchildren.length;k++) {
													if (zazchildren[k] != null) {
														if (zazchildren[k].id.indexOf('molds-') > -1) {
															try {
																if (typeof zazchildren[k].getBoundingInfo == 'function') {
																	var zmin = zazchildren[k].getBoundingInfo().boundingBox.minimum;
																	var zmax = zazchildren[k].getBoundingInfo().boundingBox.maximum;
																	if (zlastmin == null && zlastmax == null) {
																		zlastmin = zmin;
																		zlastmax = zmax;
																	} else {
																		zlastmin = BABYLON.Vector3.Minimize(zlastmin, zmin);
																		zlastmax = BABYLON.Vector3.Maximize(zlastmax, zmax);
																	}
																}
															} catch (ex) {}
														} else if (zazchildren[k].id.indexOf('-actionzone') > -1) {
															/* if action zone base2 or pole is the parent */
															var zaz2children = zazchildren[k].getChildren();
															for (var l=0; l<zaz2children.length;l++) {
																if (zaz2children[l] != null) {
																	if (zaz2children[l].id.indexOf('molds-') > -1 && zaz2children[l].id.indexOf('-babylonfile') > -1) {
																		if (zaz2children[l].WTW != null) {
																			if (zaz2children[l].WTW.bounding != null) {
																				if (zaz2children[l].WTW.bounding.max != null && zaz2children[l].WTW.bounding.min != null) {
																					try {
																						var zmin = zaz2children[l].WTW.bounding.min;
																						var zmax = zaz2children[l].WTW.bounding.max;
																						if (zlastmin == null && zlastmax == null) {
																							zlastmin = zmin;
																							zlastmax = zmax;
																						} else {
																							zlastmin = BABYLON.Vector3.Minimize(zlastmin, zmin);
																							zlastmax = BABYLON.Vector3.Maximize(zlastmax, zmax);
																						}
																					} catch (ex) {}
																				}
																			}
																		}
																	} else if (zaz2children[l].id.indexOf('molds-') > -1) {
																		try {
																			if (typeof zaz2children[l].getBoundingInfo == 'function') {
																				var zmin = zaz2children[l].getBoundingInfo().boundingBox.minimum;
																				var zmax = zaz2children[l].getBoundingInfo().boundingBox.maximum;
																				if (zlastmin == null && zlastmax == null) {
																					zlastmin = zmin;
																					zlastmax = zmax;
																				} else {
																					zlastmin = BABYLON.Vector3.Minimize(zlastmin, zmin);
																					zlastmax = BABYLON.Vector3.Maximize(zlastmax, zmax);
																				}
																			}
																		} catch (ex) {}
																	}
																}
															}													
														}
													}
												}													
											}
										}
									}
								}
							}
						}
					}
				}
				zmold.WTW = [];
				zmold.WTW = {
					'bounding': {
						'min':zlastmin,
						'max':zlastmax
					}
				};
			}
			if (zmold.WTW != null) {
				if (zmold.WTW.bounding != null) {
					if (zmold.WTW.bounding.max != null && zmold.WTW.bounding.min != null) {
						zlenx += zmold.WTW.bounding.max._x - zmold.WTW.bounding.min._x;
						zleny += zmold.WTW.bounding.max._y - zmold.WTW.bounding.min._y;
						zlenz += zmold.WTW.bounding.max._z - zmold.WTW.bounding.min._z;
						
						zminx = zmold.WTW.bounding.min._x;
						zminy = zmold.WTW.bounding.min._y;
						zminz = zmold.WTW.bounding.min._z;
						zmaxx = zmold.WTW.bounding.max._x;
						zmaxy = zmold.WTW.bounding.max._y;
						zmaxz = zmold.WTW.bounding.max._z;
					}
				}
			}
			var zpx = zmold.position.x;
			var zpy = zmold.position.y;
			var zpz = zmold.position.z;
			if (zmold.parent != null) {
				if (zmold.parent.id.indexOf('actionzoneaxle') > -1) {
					zpx += zmold.parent.position.x;
					zpy += zmold.parent.position.y;
					zpz += zmold.parent.position.z;
				}
			} 
			
			if (WTW.lineX == null) {
				WTW.lineZ = BABYLON.MeshBuilder.CreateLines('linez', {points: [new BABYLON.Vector3(zpx, zpy, zpz-zlenz),	new BABYLON.Vector3(zpx, zpy, zpz+zlenz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX = BABYLON.MeshBuilder.CreateLines('linex', {points: [new BABYLON.Vector3(zpx-zlenx, zpy, zpz),	new BABYLON.Vector3(zpx+zlenx, zpy, zpz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY = BABYLON.MeshBuilder.CreateLines('liney', {points: [new BABYLON.Vector3(zpx, zpy-zleny, zpz),	new BABYLON.Vector3(zpx, zpy+zleny, zpz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ.isPickable = false;
				WTW.lineX.isPickable = false;
				WTW.lineY.isPickable = false;
				WTW.lineZ.renderingGroupId = 1;
				WTW.lineX.renderingGroupId = 1;
				WTW.lineY.renderingGroupId = 1;
				
				WTW.lineX1 = BABYLON.MeshBuilder.CreateLines('linex1', {points: [new BABYLON.Vector3(zminx, zminy, -zlenz), new BABYLON.Vector3(zminx, zminy, zlenz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX2 = BABYLON.MeshBuilder.CreateLines('linex2', {points: [new BABYLON.Vector3(zminx, zmaxy, -zlenz), new BABYLON.Vector3(zminx, zmaxy, zlenz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX3 = BABYLON.MeshBuilder.CreateLines('linex3', {points: [new BABYLON.Vector3(zmaxx, zminy, -zlenz), new BABYLON.Vector3(zmaxx, zminy, zlenz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX4 = BABYLON.MeshBuilder.CreateLines('linex4', {points: [new BABYLON.Vector3(zmaxx, zmaxy, -zlenz), new BABYLON.Vector3(zmaxx, zmaxy, zlenz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX5 = BABYLON.MeshBuilder.CreateLines('linex5', {points: [new BABYLON.Vector3(0, zminy, -zlenz), new BABYLON.Vector3(0, zminy, zlenz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX6 = BABYLON.MeshBuilder.CreateLines('linex6', {points: [new BABYLON.Vector3(0, zmaxy, -zlenz), new BABYLON.Vector3(0, zmaxy, zlenz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX7 = BABYLON.MeshBuilder.CreateLines('linex5', {points: [new BABYLON.Vector3(zminx, 0, -zlenz), new BABYLON.Vector3(zminx, 0, zlenz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX8 = BABYLON.MeshBuilder.CreateLines('linex6', {points: [new BABYLON.Vector3(zmaxx, 0, -zlenz), new BABYLON.Vector3(zmaxx, 0, zlenz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX1.isPickable = false;
				WTW.lineX2.isPickable = false;
				WTW.lineX3.isPickable = false;
				WTW.lineX4.isPickable = false;
				WTW.lineX5.isPickable = false;
				WTW.lineX6.isPickable = false;
				WTW.lineX7.isPickable = false;
				WTW.lineX8.isPickable = false;
				WTW.lineX1.color = new BABYLON.Color3(0, 1, 0);
				WTW.lineX2.color = new BABYLON.Color3(0, 1, 0);
				WTW.lineX3.color = new BABYLON.Color3(0, 1, 0);
				WTW.lineX4.color = new BABYLON.Color3(0, 1, 0);
				WTW.lineX5.color = new BABYLON.Color3(0, 1, 0);
				WTW.lineX6.color = new BABYLON.Color3(0, 1, 0);
				WTW.lineX7.color = new BABYLON.Color3(0, 1, 0);
				WTW.lineX8.color = new BABYLON.Color3(0, 1, 0);
				WTW.lineX1.parent = zmold;
				WTW.lineX2.parent = zmold;
				WTW.lineX3.parent = zmold;
				WTW.lineX4.parent = zmold;
				WTW.lineX5.parent = zmold;
				WTW.lineX6.parent = zmold;
				WTW.lineX7.parent = zmold;
				WTW.lineX8.parent = zmold;
				WTW.lineX1.renderingGroupId = 1;
				WTW.lineX2.renderingGroupId = 1;
				WTW.lineX3.renderingGroupId = 1;
				WTW.lineX4.renderingGroupId = 1;
				WTW.lineX5.renderingGroupId = 1;
				WTW.lineX6.renderingGroupId = 1;
				WTW.lineX7.renderingGroupId = 1;
				WTW.lineX8.renderingGroupId = 1;

				WTW.lineY1 = BABYLON.MeshBuilder.CreateLines('liney1', {points: [new BABYLON.Vector3(zminx, -zleny, zminz), new BABYLON.Vector3(zminx, zleny, zminz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY2 = BABYLON.MeshBuilder.CreateLines('liney2', {points: [new BABYLON.Vector3(zminx, -zleny, zmaxz), new BABYLON.Vector3(zminx, zleny, zmaxz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY3 = BABYLON.MeshBuilder.CreateLines('liney3', {points: [new BABYLON.Vector3(zmaxx, -zleny, zminz), new BABYLON.Vector3(zmaxx, zleny, zminz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY4 = BABYLON.MeshBuilder.CreateLines('liney4', {points: [new BABYLON.Vector3(zmaxx, -zleny, zmaxz), new BABYLON.Vector3(zmaxx, zleny, zmaxz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY5 = BABYLON.MeshBuilder.CreateLines('liney5', {points: [new BABYLON.Vector3(0, -zleny, zminz), new BABYLON.Vector3(0, zleny, zminz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY6 = BABYLON.MeshBuilder.CreateLines('liney6', {points: [new BABYLON.Vector3(0, -zleny, zmaxz), new BABYLON.Vector3(0, zleny, zmaxz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY7 = BABYLON.MeshBuilder.CreateLines('liney5', {points: [new BABYLON.Vector3(zminx, -zleny, 0), new BABYLON.Vector3(zminx, zleny, 0)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY8 = BABYLON.MeshBuilder.CreateLines('liney6', {points: [new BABYLON.Vector3(zmaxx, -zleny, 0), new BABYLON.Vector3(zmaxx, zleny, 0)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY1.isPickable = false;
				WTW.lineY2.isPickable = false;
				WTW.lineY3.isPickable = false;
				WTW.lineY4.isPickable = false;
				WTW.lineY5.isPickable = false;
				WTW.lineY6.isPickable = false;
				WTW.lineY7.isPickable = false;
				WTW.lineY8.isPickable = false;
				WTW.lineY1.color = new BABYLON.Color3(1, 0, 0);
				WTW.lineY2.color = new BABYLON.Color3(1, 0, 0);
				WTW.lineY3.color = new BABYLON.Color3(1, 0, 0);
				WTW.lineY4.color = new BABYLON.Color3(1, 0, 0);
				WTW.lineY5.color = new BABYLON.Color3(1, 0, 0);
				WTW.lineY6.color = new BABYLON.Color3(1, 0, 0);
				WTW.lineY7.color = new BABYLON.Color3(1, 0, 0);
				WTW.lineY8.color = new BABYLON.Color3(1, 0, 0);
				WTW.lineY1.parent = zmold;
				WTW.lineY2.parent = zmold;
				WTW.lineY3.parent = zmold;
				WTW.lineY4.parent = zmold;
				WTW.lineY5.parent = zmold;
				WTW.lineY6.parent = zmold;
				WTW.lineY7.parent = zmold;
				WTW.lineY8.parent = zmold;
				WTW.lineY1.renderingGroupId = 1;
				WTW.lineY2.renderingGroupId = 1;
				WTW.lineY3.renderingGroupId = 1;
				WTW.lineY4.renderingGroupId = 1;
				WTW.lineY5.renderingGroupId = 1;
				WTW.lineY6.renderingGroupId = 1;
				WTW.lineY7.renderingGroupId = 1;
				WTW.lineY8.renderingGroupId = 1;

				WTW.lineZ1 = BABYLON.MeshBuilder.CreateLines('linez1', {points: [new BABYLON.Vector3(-zlenx, zminy, zminz), new BABYLON.Vector3(zlenx, zminy, zminz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ2 = BABYLON.MeshBuilder.CreateLines('linez2', {points: [new BABYLON.Vector3(-zlenx, zminy, zmaxz), new BABYLON.Vector3(zlenx, zminy, zmaxz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ3 = BABYLON.MeshBuilder.CreateLines('linez3', {points: [new BABYLON.Vector3(-zlenx, zmaxy, zminz), new BABYLON.Vector3(zlenx, zmaxy, zminz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ4 = BABYLON.MeshBuilder.CreateLines('linez4', {points: [new BABYLON.Vector3(-zlenx, zmaxy, zmaxz), new BABYLON.Vector3(zlenx, zmaxy, zmaxz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ5 = BABYLON.MeshBuilder.CreateLines('linez5', {points: [new BABYLON.Vector3(-zlenx, 0, zminz), new BABYLON.Vector3(zlenx, 0, zminz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ6 = BABYLON.MeshBuilder.CreateLines('linez6', {points: [new BABYLON.Vector3(-zlenx, 0, zmaxz),	new BABYLON.Vector3(zlenx, 0, zmaxz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ7 = BABYLON.MeshBuilder.CreateLines('linez5', {points: [new BABYLON.Vector3(-zlenx, zminy, 0), new BABYLON.Vector3(zlenx, zminy, 0)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ8 = BABYLON.MeshBuilder.CreateLines('linez6', {points: [new BABYLON.Vector3(-zlenx, zmaxy, 0),	new BABYLON.Vector3(zlenx, zmaxy, 0)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ1.isPickable = false;
				WTW.lineZ2.isPickable = false;
				WTW.lineZ3.isPickable = false;
				WTW.lineZ4.isPickable = false;
				WTW.lineZ5.isPickable = false;
				WTW.lineZ6.isPickable = false;
				WTW.lineZ7.isPickable = false;
				WTW.lineZ8.isPickable = false;
				WTW.lineZ1.color = new BABYLON.Color3(0, 0, 1);
				WTW.lineZ2.color = new BABYLON.Color3(0, 0, 1);
				WTW.lineZ3.color = new BABYLON.Color3(0, 0, 1);
				WTW.lineZ4.color = new BABYLON.Color3(0, 0, 1);
				WTW.lineZ5.color = new BABYLON.Color3(0, 0, 1);
				WTW.lineZ6.color = new BABYLON.Color3(0, 0, 1);
				WTW.lineZ7.color = new BABYLON.Color3(0, 0, 1);
				WTW.lineZ8.color = new BABYLON.Color3(0, 0, 1);
				WTW.lineZ1.parent = zmold;
				WTW.lineZ2.parent = zmold;
				WTW.lineZ3.parent = zmold;
				WTW.lineZ4.parent = zmold;
				WTW.lineZ5.parent = zmold;
				WTW.lineZ6.parent = zmold;
				WTW.lineZ7.parent = zmold;
				WTW.lineZ8.parent = zmold;
				WTW.lineZ1.renderingGroupId = 1;
				WTW.lineZ2.renderingGroupId = 1;
				WTW.lineZ3.renderingGroupId = 1;
				WTW.lineZ4.renderingGroupId = 1;
				WTW.lineZ5.renderingGroupId = 1;
				WTW.lineZ6.renderingGroupId = 1;
				WTW.lineZ7.renderingGroupId = 1;
				WTW.lineZ8.renderingGroupId = 1;

				var zalphamold = 1;
				var zwx = .1;
				var zwy = 1;
				var zwz = 2;
				if (WTW.moveZ == null) {
					WTW.moveZ = BABYLON.MeshBuilder.CreateBox('movez', {height:1, width:.1, depth:2}, scene);
					WTW.moveZ.position = new BABYLON.Vector3(zpx, zpy, (zmoldz / 2 + zpz + 1.1));
					//WTW.moveZ.scaling.x = .1;
					//WTW.moveZ.scaling.y = 1;
					//WTW.moveZ.scaling.z = 2;
					WTW.moveZ.isPickable = false;
					image = '/content/system/images/movez.png';
					var rMaterial = new BABYLON.StandardMaterial('rmoldmovez', scene);
					rMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					rMaterial.diffuseTexture.wAng = WTW.getRadians(0);
					rMaterial.diffuseTexture.alpha = zalphamold;
					rMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					var lMaterial = new BABYLON.StandardMaterial('lmoldmovez', scene);
					lMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					lMaterial.diffuseTexture.wAng = WTW.getRadians(180);
					lMaterial.diffuseTexture.alpha = zalphamold;
					lMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7); 
					var fMaterial = new BABYLON.StandardMaterial('fmoldmovez', scene);
					fMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					fMaterial.diffuseTexture.wAng = WTW.getRadians(90);
					fMaterial.diffuseTexture.alpha = zalphamold;
					fMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					var bMaterial = new BABYLON.StandardMaterial('bmoldmovez', scene);
					bMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					bMaterial.diffuseTexture.wAng = WTW.getRadians(90);
					bMaterial.diffuseTexture.alpha = zalphamold;
					bMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					var uMaterial = new BABYLON.StandardMaterial('umoldmovez', scene);
					uMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					uMaterial.diffuseTexture.alpha = zalphamold;
					uMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					var dMaterial = new BABYLON.StandardMaterial('dmoldmovez', scene);
					dMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					dMaterial.diffuseTexture.alpha = zalphamold;
					dMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					var zmoldmulti = new BABYLON.MultiMaterial('multimoldmovez', scene);
					zmoldmulti.subMaterials.push(lMaterial);
					zmoldmulti.subMaterials.push(rMaterial);
					zmoldmulti.subMaterials.push(bMaterial);
					zmoldmulti.subMaterials.push(fMaterial);
					zmoldmulti.subMaterials.push(uMaterial);
					zmoldmulti.subMaterials.push(dMaterial);
					if (WTW.moveZ.subMeshes.length < 12) {
						WTW.moveZ.subMeshes.push(new BABYLON.SubMesh(0, 0,  4,  0, 6, WTW.moveZ));
						WTW.moveZ.subMeshes.push(new BABYLON.SubMesh(1, 4,  4,  6, 6, WTW.moveZ));
						WTW.moveZ.subMeshes.push(new BABYLON.SubMesh(2, 8,  4, 12, 6, WTW.moveZ));
						WTW.moveZ.subMeshes.push(new BABYLON.SubMesh(3, 12, 4, 18, 6, WTW.moveZ));
						WTW.moveZ.subMeshes.push(new BABYLON.SubMesh(4, 16, 4, 24, 6, WTW.moveZ));
						WTW.moveZ.subMeshes.push(new BABYLON.SubMesh(5, 20, 4, 30, 6, WTW.moveZ));
					}
					WTW.moveZ.material = zmoldmulti;
				}
				zwx = .1;
				zwy = 1;
				zwz = 2;
				if (WTW.moveY == null) {
					WTW.moveY = BABYLON.MeshBuilder.CreateBox('movey', {height:1, width:2, depth:2}, scene);
					WTW.moveY.position = new BABYLON.Vector3(zpx, (zmoldy / 2 + zpy + 1.1), zpz);
					//WTW.moveY.scaling.x = 2;
					//WTW.moveY.scaling.y = 1;
					//WTW.moveY.scaling.z = 2;
					WTW.moveY.isPickable = false;
					image = '/content/system/images/movey.png';
					rMaterial = new BABYLON.StandardMaterial('rmoldmovey', scene);
					rMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					rMaterial.diffuseTexture.wAng = WTW.getRadians(0);
					rMaterial.diffuseTexture.alpha = zalphamold;
					rMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					lMaterial = new BABYLON.StandardMaterial('lmoldmovey', scene);
					lMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					lMaterial.diffuseTexture.wAng = WTW.getRadians(180);
					lMaterial.diffuseTexture.alpha = zalphamold;
					lMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7); 
					fMaterial = new BABYLON.StandardMaterial('fmoldmovey', scene);
					fMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					fMaterial.diffuseTexture.wAng = WTW.getRadians(90);
					fMaterial.diffuseTexture.alpha = zalphamold;
					fMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					bMaterial = new BABYLON.StandardMaterial('bmoldmovey', scene);
					bMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					bMaterial.diffuseTexture.wAng = WTW.getRadians(90);
					bMaterial.diffuseTexture.alpha = zalphamold;
					bMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					uMaterial = new BABYLON.StandardMaterial('umoldmovey', scene);
					uMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					uMaterial.diffuseTexture.alpha = zalphamold;
					uMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					dMaterial = new BABYLON.StandardMaterial('dmoldmovey', scene);
					dMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					dMaterial.diffuseTexture.alpha = zalphamold;
					dMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					var zmoldmulti = new BABYLON.MultiMaterial('multimoldmovey', scene);
					zmoldmulti.subMaterials.push(lMaterial);
					zmoldmulti.subMaterials.push(rMaterial);
					zmoldmulti.subMaterials.push(bMaterial);
					zmoldmulti.subMaterials.push(fMaterial);
					zmoldmulti.subMaterials.push(uMaterial);
					zmoldmulti.subMaterials.push(dMaterial);
					if (WTW.moveY.subMeshes.length < 12) {
						WTW.moveY.subMeshes.push(new BABYLON.SubMesh(0, 0,  4,  0, 6, WTW.moveY));
						WTW.moveY.subMeshes.push(new BABYLON.SubMesh(1, 4,  4,  6, 6, WTW.moveY));
						WTW.moveY.subMeshes.push(new BABYLON.SubMesh(2, 8,  4, 12, 6, WTW.moveY));
						WTW.moveY.subMeshes.push(new BABYLON.SubMesh(3, 12, 4, 18, 6, WTW.moveY));
						WTW.moveY.subMeshes.push(new BABYLON.SubMesh(4, 16, 4, 24, 6, WTW.moveY));
						WTW.moveY.subMeshes.push(new BABYLON.SubMesh(5, 20, 4, 30, 6, WTW.moveY));
					}
					WTW.moveY.material = zmoldmulti;
				}
				zwx = 2;
				zwy = 1;
				zwz = .1;
				if (WTW.moveX == null) {
					WTW.moveX = BABYLON.MeshBuilder.CreateBox('movex', {height:1, width:2, depth:.1}, scene);
					WTW.moveX.position = new BABYLON.Vector3((zmoldx / 2 + zpx + 1.1), zpy, zpz);
					//WTW.moveX.scaling.x = 2;
					//WTW.moveX.scaling.y = 1;
					//WTW.moveX.scaling.z = .1;
					WTW.moveX.isPickable = false;
					image = '/content/system/images/movex.png';
					rMaterial = new BABYLON.StandardMaterial('rmoldmovex', scene);
					rMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					rMaterial.diffuseTexture.wAng = WTW.getRadians(0);
					rMaterial.diffuseTexture.alpha = zalphamold;
					rMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					lMaterial = new BABYLON.StandardMaterial('lmoldmovex', scene);
					lMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					lMaterial.diffuseTexture.wAng = WTW.getRadians(180);
					lMaterial.diffuseTexture.alpha = zalphamold;
					lMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7); 
					fMaterial = new BABYLON.StandardMaterial('fmoldmovex', scene);
					fMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					fMaterial.diffuseTexture.wAng = WTW.getRadians(90);
					fMaterial.diffuseTexture.alpha = zalphamold;
					fMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					bMaterial = new BABYLON.StandardMaterial('bmoldmovex', scene);
					bMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					bMaterial.diffuseTexture.wAng = WTW.getRadians(90);
					bMaterial.diffuseTexture.alpha = zalphamold;
					bMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					uMaterial = new BABYLON.StandardMaterial('umoldmovex', scene);
					uMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					uMaterial.diffuseTexture.alpha = zalphamold;
					uMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					dMaterial = new BABYLON.StandardMaterial('dmoldmovex', scene);
					dMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					dMaterial.diffuseTexture.alpha = zalphamold;
					dMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					var zmoldmulti = new BABYLON.MultiMaterial('multimoldmovex', scene);
					zmoldmulti.subMaterials.push(lMaterial);
					zmoldmulti.subMaterials.push(rMaterial);
					zmoldmulti.subMaterials.push(bMaterial);
					zmoldmulti.subMaterials.push(fMaterial);
					zmoldmulti.subMaterials.push(uMaterial);
					zmoldmulti.subMaterials.push(dMaterial);
					if (WTW.moveX.subMeshes.length < 12) {
						WTW.moveX.subMeshes.push(new BABYLON.SubMesh(0, 0,  4,  0, 6, WTW.moveX));
						WTW.moveX.subMeshes.push(new BABYLON.SubMesh(1, 4,  4,  6, 6, WTW.moveX));
						WTW.moveX.subMeshes.push(new BABYLON.SubMesh(2, 8,  4, 12, 6, WTW.moveX));
						WTW.moveX.subMeshes.push(new BABYLON.SubMesh(3, 12, 4, 18, 6, WTW.moveX));
						WTW.moveX.subMeshes.push(new BABYLON.SubMesh(4, 16, 4, 24, 6, WTW.moveX));
						WTW.moveX.subMeshes.push(new BABYLON.SubMesh(5, 20, 4, 30, 6, WTW.moveX));
					}
					WTW.moveX.material = zmoldmulti;	
				}
			} else {
				WTW.moveZ.position = new BABYLON.Vector3(zpx, zpy, (zmoldz / 2 + zpz + 1.1));
				WTW.moveZ.scaling.x = .1;
				WTW.moveZ.scaling.y = 1;
				WTW.moveZ.scaling.z = 2;
				WTW.moveX.position = new BABYLON.Vector3((zmoldx / 2 + zpx + 1.1), zpy, zpz);
				WTW.moveX.scaling.x = 2;
				WTW.moveX.scaling.y = 1;
				WTW.moveX.scaling.z = .1;
				WTW.moveY.position = new BABYLON.Vector3(zpx, (zmoldy / 2 + zpy + 1.1), zpz);
				WTW.moveY.scaling.x = 2;
				WTW.moveY.scaling.y = 1;
				WTW.moveY.scaling.z = 2;
			}
			WTW.moveX.isVisible = false;
			WTW.moveY.isVisible = false;
			WTW.moveZ.isVisible = false;          
			if (dGet('wtw_blines').alt = 'Alignment Lines are Shown') {
				WTW.lineZ.isVisible = true;
				WTW.lineX.isVisible = true;
				WTW.lineY.isVisible = true;
				WTW.lineX1.isVisible = true;
				WTW.lineX2.isVisible = true;
				WTW.lineX3.isVisible = true;
				WTW.lineX4.isVisible = true;
				WTW.lineX5.isVisible = true;
				WTW.lineX6.isVisible = true;
				WTW.lineX7.isVisible = true;
				WTW.lineX8.isVisible = true;
				WTW.lineY1.isVisible = true;
				WTW.lineY2.isVisible = true;
				WTW.lineY3.isVisible = true;
				WTW.lineY4.isVisible = true;
				WTW.lineY5.isVisible = true;
				WTW.lineY6.isVisible = true;
				WTW.lineY7.isVisible = true;
				WTW.lineY8.isVisible = true;
				WTW.lineZ1.isVisible = true;
				WTW.lineZ2.isVisible = true;
				WTW.lineZ3.isVisible = true;
				WTW.lineZ4.isVisible = true;
				WTW.lineZ5.isVisible = true;
				WTW.lineZ6.isVisible = true;
				WTW.lineZ7.isVisible = true;
				WTW.lineZ8.isVisible = true;  				
			} else {
				WTW.lineZ.isVisible = false;
				WTW.lineX.isVisible = false;
				WTW.lineY.isVisible = false;
				WTW.lineX1.isVisible = false;
				WTW.lineX2.isVisible = false;
				WTW.lineX3.isVisible = false;
				WTW.lineX4.isVisible = false;
				WTW.lineX5.isVisible = false;
				WTW.lineX6.isVisible = false;
				WTW.lineX7.isVisible = false;
				WTW.lineX8.isVisible = false;
				WTW.lineY1.isVisible = false;
				WTW.lineY2.isVisible = false;
				WTW.lineY3.isVisible = false;
				WTW.lineY4.isVisible = false;
				WTW.lineY5.isVisible = false;
				WTW.lineY6.isVisible = false;
				WTW.lineY7.isVisible = false;
				WTW.lineY8.isVisible = false;
				WTW.lineZ1.isVisible = false;
				WTW.lineZ2.isVisible = false;
				WTW.lineZ3.isVisible = false;
				WTW.lineZ4.isVisible = false;
				WTW.lineZ5.isVisible = false;
				WTW.lineZ6.isVisible = false;
				WTW.lineZ7.isVisible = false;
				WTW.lineZ8.isVisible = false;            
			}			
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-openEditPoles=' + ex.message);
	}
}

WTWJS.prototype.closeEditPoles = function() {
	/* close and dispose the edit pole guide lines */
	try {
		if (WTW.lineZ != null) {
			WTW.lineZ.dispose();
            WTW.lineZ = null;
		}
		if (WTW.lineX != null) {
			WTW.lineX.dispose();
            WTW.lineX = null;
		}
		if (WTW.lineY != null) {
			WTW.lineY.dispose();
            WTW.lineY = null;
		}
		if (WTW.moveX != null) {
			WTW.moveX.material.dispose();
            WTW.moveX.material = null;
			WTW.moveX.dispose();
            WTW.moveX = null;
		}
		if (WTW.moveY != null) {
			WTW.moveY.material.dispose();
            WTW.moveY.material = null;
			WTW.moveY.dispose();
            WTW.moveY = null;
		}
		if (WTW.moveZ != null) {
			WTW.moveZ.material.dispose();
            WTW.moveZ.material = null;
			WTW.moveZ.dispose();
            WTW.moveZ = null;
		}
		if (WTW.lineX1 != null) {
			WTW.lineX1.dispose();
			WTW.lineX1 = null;
		}
		if (WTW.lineX2 != null) {
			WTW.lineX2.dispose();
			WTW.lineX2 = null;
		}
		if (WTW.lineX3 != null) {
			WTW.lineX3.dispose();
			WTW.lineX3 = null;
		}
		if (WTW.lineX4 != null) {
			WTW.lineX4.dispose();
			WTW.lineX4 = null;
		}
		if (WTW.lineX5 != null) {
			WTW.lineX5.dispose();
			WTW.lineX5 = null;
		}
		if (WTW.lineX6 != null) {
			WTW.lineX6.dispose();
			WTW.lineX6 = null;
		}
		if (WTW.lineX7 != null) {
			WTW.lineX7.dispose();
			WTW.lineX7 = null;
		}
		if (WTW.lineX8 != null) {
			WTW.lineX8.dispose();
			WTW.lineX8 = null;
		}
		if (WTW.lineY1 != null) {
			WTW.lineY1.dispose();
            WTW.lineY1 = null;
		}
		if (WTW.lineY2 != null) {
			WTW.lineY2.dispose();
            WTW.lineY2 = null;
		}
		if (WTW.lineY3 != null) {
			WTW.lineY3.dispose();
            WTW.lineY3 = null;
		}
		if (WTW.lineY4 != null) {
			WTW.lineY4.dispose();
            WTW.lineY4 = null;
		}
		if (WTW.lineY5 != null) {
			WTW.lineY5.dispose();
            WTW.lineY5 = null;
		}
		if (WTW.lineY6 != null) {
			WTW.lineY6.dispose();
            WTW.lineY6 = null;
		}
		if (WTW.lineY7 != null) {
			WTW.lineY7.dispose();
            WTW.lineY7 = null;
		}
		if (WTW.lineY8 != null) {
			WTW.lineY8.dispose();
            WTW.lineY8 = null;
		}
		if (WTW.lineZ1 != null) {
			WTW.lineZ1.dispose();
            WTW.lineZ1 = null;
		}
		if (WTW.lineZ2 != null) {
			WTW.lineZ2.dispose();
            WTW.lineZ2 = null;
		}
		if (WTW.lineZ3 != null) {
			WTW.lineZ3.dispose();
            WTW.lineZ3 = null;
		}
		if (WTW.lineZ4 != null) {
			WTW.lineZ4.dispose();
            WTW.lineZ4 = null;
		}
		if (WTW.lineZ5 != null) {
			WTW.lineZ5.dispose();
            WTW.lineZ5 = null;
		}
		if (WTW.lineZ6 != null) {
			WTW.lineZ6.dispose();
            WTW.lineZ6 = null;
		}
		if (WTW.lineZ7 != null) {
			WTW.lineZ7.dispose();
            WTW.lineZ7 = null;
		}
		if (WTW.lineZ8 != null) {
			WTW.lineZ8.dispose();
            WTW.lineZ8 = null;
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-closeEditPoles=' + ex.message);
	}
}


/* List All Items */

WTWJS.prototype.openListItems = async function() {
	/* open recover items form will search for any molds with the delete flag set; provides a list to view and select for recovery */
	try {
		var zwebid = '';
		var zwebtype = '';
		var zmolds = [];
		if (buildingid != '') {
			zwebid = buildingid;
			zwebtype = 'building';
			zmolds = WTW.buildingMolds;
		} else if (communityid != '') {
			zwebid = communityid;
			zwebtype = 'community';
			zmolds = WTW.communitiesMolds;
		} else if (thingid != '') {
			zwebid = thingid;
			zwebtype = 'thing';
			zmolds = WTW.thingMolds;
		}
		dGet('wtw_allitemslist').innerHTML = '';
		var zallitemslist = "<div class='wtw-menulevel0text'>Click item below to Edit<br />Item must be shown to load for Edit.<br />Hint: Load All in the Quick Editor Settings.</div>";
		if (zwebid != '') {
			WTW.getAsyncJSON('/connect/websitems.php?webtype=' + zwebtype + '&webid=' + zwebid, 
				function(zresponse) {
					var zitemslist = JSON.parse(zresponse);
					if (zitemslist != null) {
						var zcategory = '';
						for (var i=0;i < zitemslist.length;i++) {
							if (zitemslist[i].itemid != null) {
								if (zcategory != zitemslist[i].category) {
									zallitemslist += "<h2>" + zitemslist[i].category + "</h2>";
									zcategory = zitemslist[i].category;
								}
								zallitemslist += "<div id='wtw_bitem" + zitemslist[i].itemid + "' name='wtw_bitem" + zitemslist[i].itemid + "' ";
								
								switch (zitemslist[i].category) {
									case 'Molds':
										var zitemind = -1;
										var zmoldname = '';
										for (var j=0; j<zmolds.length;j++) {
											if (zmolds[j] != null) {
												if (zmolds[j].moldid == zitemslist[i].itemid) {
													zitemind = j;
													zmoldname = zmolds[j].moldname;
												}
											}
										}
										zallitemslist += "onclick=\"WTW.openMoldForm('" + zitemind + "','" + zitemslist[i].itemtype + "','" + zwebtype + "');\" ";
										zallitemslist += " onmouseover=\"WTW.hilightMold('" + zmoldname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + zmoldname + "');\" ";
										break;
									case 'Action Zones':
										var zitemind = -1;
										var zmoldname = '';
										for (var j=0; j<WTW.actionZones.length;j++) {
											if (WTW.actionZones[j] != null) {
												if (WTW.actionZones[j].actionzoneid == zitemslist[i].itemid) {
													zitemind = j;
													zmoldname = WTW.actionZones[j].moldname;
												}
											}
										}
										zallitemslist += "onclick=\"WTW.openActionZoneForm('" + zitemslist[i].itemid + "');\" ";
										zallitemslist += " onmouseover=\"WTW.showActionZone('" + zitemind + "');\" onmouseout=\"if (dGet('wtw_tactionzoneind').value != '" + zitemind + "') {WTW.hideActionZone('" + zitemind + "');}\" ";
										break;
									case '3D Webs':
										var zitemind = -1;
										var zmoldname = '';
										for (var j=0; j<WTW.connectingGrids.length; j++) {
											if (WTW.connectingGrids[j] != null) {
												if (WTW.connectingGrids[j].connectinggridid == zitemslist[i].itemid) {
													zitemind = j;
													zmoldname = WTW.connectingGrids[j].moldname;
												}
											}
										}
										zallitemslist += "onclick=\"WTW.openConnectingGridsForm('" + zitemind + "');\" ";
										zallitemslist += " onmouseover=\"WTW.hilightMold('" + zmoldname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + zmoldname + "');\" ";
										break;
								}

								zallitemslist += " class='wtw-menulevel2'>" + WTW.toProperCase(zitemslist[i].webname) + " (" + zitemslist[i].itemtype.replace('babylonfile','3D Model') + ")</div>\r\n";
							}
						}
					}
					dGet('wtw_allitemslist').innerHTML = zallitemslist;
					WTW.setWindowSize();
				}
			);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-openListItems=' + ex.message);
	}
}


/* recover deleted molds */

WTWJS.prototype.openRecoverItems = async function() {
	/* open recover items form will search for any molds with the delete flag set; provides a list to view and select for recovery */
	try {
		var zpath = '';
		if (buildingid != '') {
			zpath = '/connect/buildingrecoveritems.php?buildingid=' + buildingid;
		} else if (communityid != '') {
			zpath = '/connect/communityrecoveritems.php?communityid=' + communityid;
		} else if (thingid != '') {
			zpath = '/connect/thingrecoveritems.php?thingid=' + thingid;
		}
		dGet('wtw_deleteditemslist').innerHTML = '';
		if (zpath != '') {
			WTW.getAsyncJSON(zpath, 
				function(zresponse) {
					var zrecoverylist = JSON.parse(zresponse);
					if (zrecoverylist != null) {
						for (var i=0;i < zrecoverylist.length;i++) {
							if (zrecoverylist[i].itemid != null) {
								dGet('wtw_deleteditemslist').innerHTML += "<div id='wtw_brecover" + zrecoverylist[i].itemid + "' name='wtw_brecover" + zrecoverylist[i].itemid + "' onclick=\"WTW.recoverMold('" + zrecoverylist[i].itemid + "','" + zrecoverylist[i].itemtype + "');\" class='wtw-menulevel2'>Recover '" + zrecoverylist[i].item + "'</div>\r\n";
							}
						}
					}
					WTW.setWindowSize();
				}
			);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-openRecoverItems=' + ex.message);
	}
}

WTWJS.prototype.recoverMold = async function(zmoldid, zmoldtype) {
	/* mold selected for recovery, undo the delete flag and add the mold back into the 3D Scene for edit */
	try {
		switch (zmoldtype) {
			case 'communitymolds':
				var zrequest = {
					'communityid': communityid,
					'buildingid': buildingid,
					'thingid': thingid,
					'moldid': zmoldid,
					'deleted': '0',
					'function':'deletemold'
				};
				WTW.postAsyncJSON('/core/handlers/molds.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						WTW.getJSON('/connect/communitymoldsrecover.php?communityid=' + communityid + '&communityind=-1&communitymoldid=' + zmoldid, 
							function(zresponse) {
								var zcommunitymold = JSON.parse(zresponse);
								var zmoldind = WTW.getNextCount(WTW.communitiesMolds);
								if (zcommunitymold != null) {
									if (zcommunitymold.molds[0] != null) {
										WTW.communitiesMolds[zmoldind] = zcommunitymold.molds[0];
									}
								}
								if (WTW.communitiesMolds[zmoldind] != null) {
									WTW.communitiesMolds[zmoldind].moldind = zmoldind;
									WTW.communitiesMolds[zmoldind].connectinggridid = dGet('wtw_tconnectinggridid').value;
									WTW.communitiesMolds[zmoldind].connectinggridind = Number(dGet('wtw_tconnectinggridind').value);
									WTW.communitiesMolds[zmoldind].parentname = 'local-connectinggrids-' + dGet('wtw_tconnectinggridind').value + '-' + dGet('wtw_tconnectinggridid').value + '--';
									WTW.communitiesMolds[zmoldind].moldname = 'local-communitymolds-' + zmoldind + '-' + WTW.communitiesMolds[zmoldind].moldid + '-' + dGet('wtw_tconnectinggridind').value + '-' + dGet('wtw_tconnectinggridid').value + '-' + WTW.communitiesMolds[zmoldind].shape;
									WTW.communitiesMolds[zmoldind].shown = '0';
									WTW.openMoldForm(zmoldind,WTW.communitiesMolds[zmoldind].shape,'community');
								}
								WTW.setWindowSize();
							}
						);			
					}
				);
				break;		
			case 'buildingmolds':
				var zrequest = {
					'communityid': communityid,
					'buildingid': buildingid,
					'thingid': thingid,
					'moldid': zmoldid,
					'deleted': '0',
					'function':'deletemold'
				};
				WTW.postAsyncJSON('/core/handlers/molds.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						var zbuildingind = WTW.getBuildingInd(buildingid);
						WTW.getJSON('/connect/buildingmoldsrecover.php?buildingid=' + buildingid + '&buildingind=' + zbuildingind + '&buildingmoldid=' + zmoldid, 
							function(zresponse) {
								var zbuildingmold = JSON.parse(zresponse);
								var zmoldind = WTW.getNextCount(WTW.buildingMolds);
								if (zbuildingmold != null) {
									if (zbuildingmold.molds[0] != null) {
										WTW.buildingMolds[zmoldind] = zbuildingmold.molds[0];
									}
								}
								if (WTW.buildingMolds[zmoldind] != null) {
									WTW.buildingMolds[zmoldind].moldind = zmoldind;
									WTW.buildingMolds[zmoldind].connectinggridid = dGet('wtw_tconnectinggridid').value;
									WTW.buildingMolds[zmoldind].connectinggridind = Number(dGet('wtw_tconnectinggridind').value);
									WTW.buildingMolds[zmoldind].parentname = 'local-connectinggrids-' + dGet('wtw_tconnectinggridind').value + '-' + dGet('wtw_tconnectinggridid').value + '--';
									WTW.buildingMolds[zmoldind].moldname = 'local-buildingmolds-' + zmoldind + '-' + WTW.buildingMolds[zmoldind].moldid + '-' + dGet('wtw_tconnectinggridind').value + '-' + dGet('wtw_tconnectinggridid').value + '-' + WTW.buildingMolds[zmoldind].shape;
									WTW.buildingMolds[zmoldind].shown = '0';
									WTW.openMoldForm(zmoldind,WTW.buildingMolds[zmoldind].shape,'building');
								}
								WTW.setWindowSize();
							}
						);
					}
				);
				break;
			case 'thingmolds':
				var zrequest = {
					'communityid': communityid,
					'buildingid': buildingid,
					'thingid': thingid,
					'moldid': zmoldid,
					'deleted': '0',
					'function':'deletemold'
				};
				WTW.postAsyncJSON('/core/handlers/molds.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						var zthingind = WTW.getThingInd(thingid);
						WTW.getJSON('/connect/thingmoldsrecover.php?thingid=' + thingid + '&thingind=' + zthingind + '&thingmoldid=' + zmoldid, 
							function(zresponse) {
								var zthingmold = JSON.parse(zresponse);
								var zmoldind = WTW.getNextCount(WTW.thingMolds);
								if (zthingmold != null) {
									if (zthingmold.molds[0] != null) {
										WTW.thingMolds[zmoldind] = zthingmold.molds[0];
									}
								}
								if (WTW.thingMolds[zmoldind] != null) {
									WTW.thingMolds[zmoldind].moldind = zmoldind;
									WTW.thingMolds[zmoldind].connectinggridid = dGet('wtw_tconnectinggridid').value;
									WTW.thingMolds[zmoldind].connectinggridind = Number(dGet('wtw_tconnectinggridind').value);
									WTW.thingMolds[zmoldind].parentname = 'local-connectinggrids-' + dGet('wtw_tconnectinggridind').value + '-' + dGet('wtw_tconnectinggridid').value + '--';
									WTW.thingMolds[zmoldind].moldname = 'local-thingmolds-' + zmoldind + '-' + WTW.thingMolds[zmoldind].moldid + '-' + dGet('wtw_tconnectinggridind').value + '-' + dGet('wtw_tconnectinggridid').value + '-' + WTW.thingMolds[zmoldind].shape;
									WTW.thingMolds[zmoldind].shown = '0';
									WTW.openMoldForm(zmoldind,WTW.thingMolds[zmoldind].shape,'thing');
								}
								WTW.setWindowSize();
							}
						);
					}
				);
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-recoverMold=' + ex.message);
	}
}


/* create a duplicate Mold (zshape) */

WTWJS.prototype.createDuplicateShape = function() {
	/* when editing a mold, near the bottom of the form is a link to create a duplicate shape */
	/* when clicked, a new mold is created in front of the camera with a new (x,z) coordinate, iid, and index value */
	/* the rest of the settings including texture selections are copied to the new mold */
	try {
		var zoriginalmoldind = Number(dGet('wtw_tmoldind').value);
		var zshape = dGet('wtw_tmoldshape').value;
		var zwebtype = dGet('wtw_tmoldwebtype').value;
		var zmolds = null;
		var zmoldind = -1;
		var zmoldid = WTW.getRandomString(16);
		var zcoords = WTW.getNewCoordinates(50);
		var zpositionx = zcoords.positionX;
		var zpositionz = zcoords.positionZ;
		switch (zwebtype) {
			case 'community':
				zmolds = WTW.communitiesMolds;
				break;
			case 'building':
				zmolds = WTW.buildingMolds;
				break;
			case 'thing':
				zpositionx = 0;
				zpositionz = 0;
				zmolds = WTW.thingMolds;
				break;
		}
		if (zmolds != null) {
			zmoldind = WTW.getNextCount(zmolds);
			zmolds[zmoldind] = JSON.parse(JSON.stringify(zmolds[zoriginalmoldind]));
			zmolds[zmoldind].moldid = zmoldid;
			zmolds[zmoldind].moldind = zmoldind;
			zmolds[zmoldind].actionzoneid = '';
			zmolds[zmoldind].actionzoneind = '';
			zmolds[zmoldind].position.x = zpositionx;
			zmolds[zmoldind].position.z = zpositionz;
			zmolds[zmoldind].moldname = 'local-' + zwebtype + 'molds-' + zmoldind + '-' + zmoldid + '-' + dGet('wtw_tconnectinggridind').value + '-' + dGet('wtw_tconnectinggridid').value + '-' + zmolds[zmoldind].shape;
			zmolds[zmoldind].parentname = 'local-connectinggrids-' + dGet('wtw_tconnectinggridind').value + '-' + dGet('wtw_tconnectinggridid').value + '--';
			zmolds[zmoldind].connectinggridid = dGet('wtw_tconnectinggridid').value;
			zmolds[zmoldind].connectinggridind = dGet('wtw_tconnectinggridind').value;
			zmolds[zmoldind].shown = '0';
			WTW.setShownMolds();
			dGet('wtw_tmoldind').value = zmoldind;
			dGet('wtw_tmoldid').value = zmoldid;
			WTW.openMoldForm(zmoldind,zshape,zwebtype,false);
		}
		dGet('wtw_tmoldpositionx').value = zpositionx;
		dGet('wtw_tmoldpositionz').value = zpositionz;
		dGet('wtw_tmoldactionzoneid').value = '';
		dGet('wtw_tmoldactionzone2id').value = '';
		dGet('wtw_tmoldcsgaction').selectedIndex = 0;
		dGet('wtw_tmoldcsgmoldid').value = '';
		WTW.setWindowSize();
		window.setTimeout(function() {
			WTW.setNewMold();
		},200);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-createDuplicateShape=' + ex.message);
	}
}


/* merged molds and Constructive Solid Geometry (CSG) */
/* used to combine, subtract, or intersect 2 or more molds (helpful to create new shapes) */

WTWJS.prototype.addMergePart = function(mold) {
	/* mold form, in the advanced section supports merging of molds */
	/* select the merge type (combine, subtract, or intersect) then pick the mold to merge with */
	/* to merge more than 2, just edit the mold to add to the merge and follow the same steps */
	try {		
		if (mold != null) {
			var zwebtype = dGet('wtw_tmoldwebtype').value;
			var zmoldname = mold.name;
			var znamepart = WTW.getMoldnameParts(zmoldname);
			var zmolds = null;
			if (WTW.isNumeric(znamepart.moldind)) {
				if (znamepart.webset.indexOf('buildingmolds') > -1 && zwebtype == 'building') {
					zmolds = WTW.buildingMolds;
				} else if (znamepart.webset.indexOf('thingmolds') > -1 && zwebtype == 'thing') {
					zmolds = WTW.thingMolds;
				} else if (znamepart.webset.indexOf('communitymolds') > -1 && zwebtype == 'community') {
					zmolds = WTW.communitiesMolds;
				}
				if (zmolds != null) {
					dGet('wtw_tmoldcsgmoldid').value = znamepart.moldid;
					WTW.setCSGCount(znamepart.moldid);
				}
			}
			if (znamepart.moldid != '') {
				WTW.hilightMoldFast(zmoldname,'yellow');
				dGet('wtw_selectedcsgshape').innerHTML = '';
				dGet('wtw_selectedcsgshape').innerHTML += "<div class='wtw-secondcolcontent' onmouseover=\"WTW.hilightMold('" + zmoldname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + zmoldname + "');\">Merge with (" + znamepart.shape + ") &nbsp;&nbsp;&nbsp;&nbsp; <a href='#' onclick=\"WTW.removeMerge('" + zmoldname + "')\">Remove</a></div><br /><br />";
				dGet('wtw_bselectcsgshape').innerHTML = 'Change Shape to Merge';
			} else {
				WTW.removeMerge(zmoldname);
			}
		}
		WTW.selectMergePart(2); 
		WTW.setNewMold(1);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-addMergePart=' + ex.message);
	}
}

WTWJS.prototype.removeMerge = function(zmoldname) {
	/* remove a merge from a mold will undo a combine, subtract, or intersect */
	try {
		var zoldcsgmainid = dGet('wtw_tmoldcsgmoldid').value;
		var zcsgmainind = -1; 
		var zcsgchildind = -1;
		var zmoldind = -1;
		var znamepart;
		var zmolds = null;
		var zwebtype = dGet('wtw_tmoldwebtype').value;
		WTW.setDDLValue('wtw_tmoldcsgaction', ''); 
		dGet('wtw_tmoldcsgmoldid').value = '';
		dGet('wtw_selectedcsgshape').innerHTML = '';
		dGet('wtw_bselectcsgshape').innerHTML = 'Pick Shape to Merge';
		if (zmoldname.indexOf('-') > -1) {
			znamepart = zmoldname.split('-');
		}			
		if (WTW.isNumeric(znamepart[2])) {
			if (znamepart[1].indexOf('buildingmolds') > -1 && zwebtype == 'building') {
				zmolds = WTW.buildingMolds;
			} else if (znamepart[1].indexOf('thingmolds') > -1 && zwebtype == 'thing') {
				zmolds = WTW.thingMolds;
			} else if (znamepart[1].indexOf('communitymolds') > -1 && zwebtype == 'community') {
				zmolds = WTW.communitiesMolds;
			}
			if (zmolds != null) {
				zmoldind = Number(dGet('wtw_tmoldind').value);
				zmolds[zmoldind].csg.moldid = '';
				zmolds[zmoldind].covering = 'color';
				zmolds[zmoldind].opacity = '100';
				zmolds[zmoldind].shown = '0';
			}
		}	
		if (zoldcsgmainid != '') {
			zcsgmainind = WTW.getMoldInd(zmolds, zoldcsgmainid, dGet('wtw_tconnectinggridind').value);
			if (zmolds[zcsgmainind] != null) {
				WTW.setCSGCount(zoldcsgmainid);
				if (zmolds[zcsgmainind].shown != undefined) {
					zmolds[zcsgmainind].shown = '0';
				}
				if (zmolds[zcsgmainind].moldname != undefined) {
					WTW.disposeClean(zmolds[zcsgmainind].moldname);
				}
			}
		}
		WTW.disposeClean(zmoldname);
		WTW.setShownMolds();
		WTW.setNewMold(1);
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-removeMerge=' + ex.message);
	}
}

WTWJS.prototype.selectMergePart = function(zselect) {
	/* select the mold to merge with hte currently edited mold */
	try {
		if (zselect == 2) {
			WTW.pick = 0;
			dGet('wtw_bselectcsgshape').innerHTML = 'Pick Shape to Merge';
		} else {
			WTW.pick = 2;
			dGet('wtw_bselectcsgshape').innerHTML = 'Cancel Pick Shape';
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-selectMergePart=' + ex.message);
	}
}

WTWJS.prototype.checkMoldTextureCSG = function() {
	/* check the mold texture for the new mold to be created after merge */
	try {
		if (dGet('wtw_tmoldcsgaction').selectedIndex == 0) {
			WTW.show('wtw_moldcolorsdiv');
			WTW.show('wtw_moldtexturesetdiv');
			WTW.show('wtw_moldshadowreflectiondiv');
			WTW.show('wtw_moldbasictexturesetdiv');
			WTW.show('wtw_moldbasictextureset2div');
			dGet('wtw_tmoldcsgmoldid').value = '';
		} else {
			WTW.hide('wtw_moldcolorsdiv');
			WTW.hide('wtw_moldtexturesetdiv');
			WTW.hide('wtw_moldshadowreflectiondiv');
			WTW.hide('wtw_moldbasictexturesetdiv');
			WTW.hide('wtw_moldbasictextureset2div');
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-checkMoldTextureCSG=' + ex.message);
	}
}

WTWJS.prototype.setCSGCount = function(zcsgmainid) {
	/* see if there are any molds requiring merge with the currently edited mold */
	try {
		var zcount = 0;
		var zcsgmainind = -1;
		var zmolds = WTW.communitiesMolds;
		if (buildingid != '') {
			zmolds = WTW.buildingMolds;
		} else if (thingid != '') {
			zmolds = WTW.thingMolds;
		}
		for (var i=0; i < zmolds.length; i++) {
			if (zmolds[i] != null) {
				var zcsgmoldid = zmolds[i].csg.moldid;
				if (zcsgmoldid == zcsgmainid) {
					zcount += 1;
				}
				if (zmolds[i].moldid == zcsgmainid) {
					zcsgmainind = i;
				}
			}
		}
		if (zmolds[zcsgmainind] != null) {
			if (zmolds[zcsgmainind].csg.count != undefined) {
				zmolds[zcsgmainind].csg.count = zcount;
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-setCSGCount=' + ex.message);
	}
}

WTWJS.prototype.getNewCoordinates = function(zdist) {
	/* when a new mold is created, the coordinates use the current position of the avatar (or camera if detatched) */
	/* and provide new coordinates (and rotation towards the user/camera) at a particular distance in front of the avatar or camera */
	var zpositionx = 0;
	var zpositiony = 0;
	var zpositionz = 0;
	var zrotationy = 0.00;
	try {
		if (WTW.cameraFocus == 1) {
			/* camera is focused on Avatar, use the avatar position and rotation to calculate new point */
			zrotationy = WTW.getDegrees(WTW.myAvatar.rotation.y);
			zpositiony = Math.round(WTW.myAvatar.position.y);
			zpositionx = Math.round((WTW.myAvatar.position.x + zdist * Math.cos(WTW.myAvatar.rotation.y)));
			zpositionz = Math.round((WTW.myAvatar.position.z - zdist * Math.sin(WTW.myAvatar.rotation.y)));
		} else {
			/* camera is Not focused on Avatar, use the camera position and rotation to calculate new point */
			zrotationy = WTW.getDegrees(WTW.cameraOne.rotation.y) - 90;
			var zadjrot = WTW.getRadians(zrotationy);
			zpositiony = Math.round(WTW.cameraOne.position.y);
			zpositionx = Math.round((WTW.cameraOne.position.x + zdist * Math.cos(zadjrot)));
			zpositionz = Math.round((WTW.cameraOne.position.z - zdist * Math.sin(zadjrot)));
		}
		zrotationy = WTW.cleanDegrees(zrotationy);
		/* round off rotation to the nearest 90 degrees */
		if (zrotationy > 135 && zrotationy < 225) {
			zrotationy = 90.00;
		} else if (zrotationy >= 225 && zrotationy < 315) {
			zrotationy = 180.00;
		} else if ((zrotationy >= 315 && zrotationy <= 360) || (zrotationy >= 0 && zrotationy < 45)) {
			zrotationy = -90.00;
		} else {
			zrotationy = 0.00;
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-getNewCoordinates=' + ex.message);
	}
	return {
		positionX : zpositionx.toFixed(2),
		positionY : zpositiony.toFixed(2),
		positionZ : zpositionz.toFixed(2),
		rotationY : zrotationy
	};
}

WTWJS.prototype.openMoldColorSelector = function(zobj, ztitle, zcolorgroup) {
	/* when form uses color as a texture, the color wheels are opened and set to the current color settings */
	/* typical colors are a combination of emissive, diffuse, and specular color settings */
	try {
		var zmoldname = 'local-' + dGet('wtw_tmoldwebtype').value + 'molds-' + dGet('wtw_tmoldind').value + '-' + dGet('wtw_tmoldid').value + '-' + dGet('wtw_tconnectinggridind').value + '-' + dGet('wtw_tconnectinggridid').value + '-' + dGet('wtw_tmoldshape').value;
		dGet('wtw_tmoldname').value = zmoldname;
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
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

			var zcolortitle = new BABYLON.GUI.TextBlock();
			zcolortitle.text = ztitle;
			zcolortitle.color = '#FFFFFF';
			zcolortitle.fontSize = 20;
			zcolortitle.height = '50px';
			zpanel.addControl(zcolortitle);     
		
			zmold = WTW.pluginsOpenMoldColorSelector(zmold, zmoldname, dGet('wtw_tmoldshape').value, zcolorgroup);
			
			var zcolorpicker = new BABYLON.GUI.ColorPicker();
			var colorvalue = null;
			var zmesh = scene.getMeshByID(zmoldname);
			if (zmesh != null) {
				if (zmesh.material != null) {
					switch (zcolorgroup) {
						case 'diffuse':
							colorvalue = zmesh.material.diffuseColor;
							break;
						case 'specular':
							colorvalue = zmesh.material.specularColor;
							break;
						case 'emissive':
							colorvalue = zmesh.material.emissiveColor;
							break;
						case 'ambient':
							colorvalue = zmesh.material.ambientColor;
							break;
					}
				}
			} else {
				var znode = WTW.getMeshOrNodeByID(zmoldname);
				if (znode != null) {
					var zchildmeshes = znode.getChildren();
					for (var i=0;i<zchildmeshes.length;i++) {
						if (zchildmeshes[i] != null) {
							if (zchildmeshes[i].material != null) {
								switch (zcolorgroup) {
									case 'diffuse':
										colorvalue = zchildmeshes[i].material.diffuseColor;
										break;
									case 'specular':
										colorvalue = zchildmeshes[i].material.specularColor;
										break;
									case 'emissive':
										colorvalue = zchildmeshes[i].material.emissiveColor;
										break;
									case 'ambient':
										colorvalue = zchildmeshes[i].material.ambientColor;
										break;
								}
							}
						}
					}
				}
			}
			if (colorvalue == null) {
				switch (zcolorgroup) {
					case 'diffuse':
						colorvalue = new BABYLON.Color3.FromHexString(dGet('wtw_tmolddiffusecolor').value);
						break;
					case 'specular':
						colorvalue = new BABYLON.Color3.FromHexString(dGet('wtw_tmoldspecularcolor').value);
						break;
					case 'emissive':
						colorvalue = new BABYLON.Color3.FromHexString(dGet('wtw_tmoldemissivecolor').value);
						break;
					case 'ambient':
						colorvalue = new BABYLON.Color3.FromHexString(dGet('wtw_tmoldambientcolor').value);
						break;
				}
			}
			zcolorpicker.height = '250px';
			zcolorpicker.width = '250px';
			zcolorpicker.value = colorvalue;
			zcolorpicker.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
			zcolorpicker.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
			zcolorpicker.onValueChangedObservable.add(function(value) {
				if (value != null) {
					WTW.setMoldColor(dGet('wtw_tmoldname').value, zcolorgroup, value.r, value.g, value.b);
				}
			});
			zpanel.addControl(zcolorpicker); 
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-openMoldColorSelector=' + ex.message);
	}
}

WTWJS.prototype.resetMoldColor = function(zmoldname, zspecularcolor, zemissivecolor, zdiffusecolor, zambientcolor) {
	/* reset the mold color and save settings to form fields and array */
	try {
		var zsetspecularcolor = zspecularcolor;
		var zsetemissivecolor = zemissivecolor;
		var zsetdiffusecolor = zdiffusecolor;
		var zsetambientcolor = zambientcolor;
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
			if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(zspecularcolor) == false) {
				zsetspecularcolor = '#ffffff';
			}
			if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(zemissivecolor) == false) {
				zsetemissivecolor = '#000000';
			}
			if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(zdiffusecolor) == false) {
				zsetdiffusecolor = '#686868';
			}
			if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(zambientcolor) == false) {
				zsetambientcolor = '#575757';
			}
			var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
			var zmesh = scene.getMeshByID(zmoldname);
			if (zmesh != null) {
				var zcovering = zmesh.material.clone();
				zcovering.specularColor = new BABYLON.Color3.FromHexString(zsetspecularcolor);
				zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zsetemissivecolor);
				zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zsetdiffusecolor);
				zcovering.ambientColor = new BABYLON.Color3.FromHexString(zsetambientcolor);
				zmesh.material.dispose();
				zmesh.material = zcovering;
			} else {
				var znode = WTW.getMeshOrNodeByID(zmoldname);
				if (znode != null) {
					var zchildmeshes = znode.getChildren();
					for (var i=0;i<zchildmeshes.length;i++) {
						if (zchildmeshes[i] != null) {
							if (zchildmeshes[i].material != null) {
								var zcovering = zchildmeshes[i].material.clone();
								zcovering.specularColor = new BABYLON.Color3.FromHexString(zsetspecularcolor);
								zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zsetemissivecolor);
								zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zsetdiffusecolor);
								zcovering.ambientColor = new BABYLON.Color3.FromHexString(zsetambientcolor);
								zchildmeshes[i].material.dispose();
								zchildmeshes[i].material = zcovering;
							}
						}
					}
				}					
			}
			if (zmoldnameparts.molds[zmoldnameparts.moldind] != null) {
				zmoldnameparts.molds[zmoldnameparts.moldind].color.diffusecolor = zsetdiffusecolor;
				zmoldnameparts.molds[zmoldnameparts.moldind].color.emissivecolor = zsetemissivecolor;
				zmoldnameparts.molds[zmoldnameparts.moldind].color.specularcolor = zsetspecularcolor;
				zmoldnameparts.molds[zmoldnameparts.moldind].color.ambientcolor = zsetambientcolor;
			}
			dGet('wtw_tmolddiffusecolor').value = zdiffusecolor;
			dGet('wtw_tmoldemissivecolor').value = zemissivecolor;
			dGet('wtw_tmoldspecularcolor').value = zspecularcolor;
			dGet('wtw_tmoldambientcolor').value = zambientcolor;
			dGet('wtw_tmoldwebtextdiffuse').value = zdiffusecolor;
			dGet('wtw_tmoldwebtextemissive').value = zemissivecolor;
			dGet('wtw_tmoldwebtextspecular').value = zspecularcolor;
			dGet('wtw_tmoldwebtextambient').value = zambientcolor;
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-resetMoldColor=' + ex.message);
	}
}

WTWJS.prototype.setMoldColorDirect = function(zobj) {
	/* set color after change is made on the text box */
	try {
		if (zobj != null) {
			var zmoldname = 'local-' + dGet('wtw_tmoldwebtype').value + 'molds-' + dGet('wtw_tmoldind').value + '-' + dGet('wtw_tmoldid').value + '-' + dGet('wtw_tconnectinggridind').value + '-' + dGet('wtw_tconnectinggridid').value + '-' + dGet('wtw_tmoldshape').value;
			dGet('wtw_tmoldname').value = zmoldname;
			var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
			var ztitle = '';
			var zcolorgroup = '';
			switch (zobj.id) {
				case 'wtw_tmolddiffusecolor':
					ztitle = 'Diffuse Color (Base)';
					zcolorgroup = 'diffuse';
					/* reset the mold color and save settings to form fields and array */
					WTW.resetMoldColor(zmoldname, zmoldnameparts.molds[zmoldnameparts.moldind].color.specularcolor, zmoldnameparts.molds[zmoldnameparts.moldind].color.emissivecolor, zobj.value, zmoldnameparts.molds[zmoldnameparts.moldind].color.ambientcolor);
					break;
				case 'wtw_tmoldemissivecolor':
					ztitle = 'Emissive Color (Projected)';
					zcolorgroup = 'emissive';
					/* reset the mold color and save settings to form fields and array */
					WTW.resetMoldColor(zmoldname, zmoldnameparts.molds[zmoldnameparts.moldind].color.specularcolor, zobj.value, zmoldnameparts.molds[zmoldnameparts.moldind].color.diffusecolor, zmoldnameparts.molds[zmoldnameparts.moldind].color.ambientcolor);
					break;
				case 'wtw_tmoldspecularcolor':
					ztitle = 'Specular Color (Highlight)';
					zcolorgroup = 'specular';
					/* reset the mold color and save settings to form fields and array */
					WTW.resetMoldColor(zmoldname, zobj.value, zmoldnameparts.molds[zmoldnameparts.moldind].color.emissivecolor, zmoldnameparts.molds[zmoldnameparts.moldind].color.diffusecolor, zmoldnameparts.molds[zmoldnameparts.moldind].color.ambientcolor);
					break;
				case 'wtw_tmoldambientcolor':
					ztitle = 'Ambient Color (Environment)';
					zcolorgroup = 'ambient';
					/* reset the mold color and save settings to form fields and array */
					WTW.resetMoldColor(zmoldname, zmoldnameparts.molds[zmoldnameparts.moldind].color.specularcolor, zmoldnameparts.molds[zmoldnameparts.moldind].color.emissivecolor, zmoldnameparts.molds[zmoldnameparts.moldind].color.diffusecolor, zobj.value);
					break;
			}
			WTW.closeColorSelector(true);
			WTW.openMoldColorSelector(zobj, ztitle, zcolorgroup);
		}
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-setMoldColorDirect=' + ex.message);
	}
}

WTWJS.prototype.setMoldColor = function(zmoldname, zcolorgroup, zr, zg, zb) {
	/* set color after change is made on the color wheels */
	try {
		var zmolds = null;
		var zmoldind = -1;
		if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
			zmoldind = Number(dGet('wtw_tmoldind').value);
		}
		switch (dGet('wtw_tmoldwebtype').value) {
			case 'community':
				zmolds = WTW.communitiesMolds;
				break;
			case 'thing':
				zmolds = WTW.thingMolds;
				break;
			default:
				zmolds = WTW.buildingMolds;
				break;
		}
		if (zmolds[zmoldind] != null) {
			var zmoldname2 = zmoldname;
			var zmold = WTW.getMeshOrNodeByID(zmoldname);
			var zmoldimageframe = WTW.getMeshOrNodeByID(zmoldname + '-imageframe');
			if (zmoldimageframe != null) {
				/* some molds have an inner object that takes the color */
				zmold = zmoldimageframe;
				/* make imageframe the base moldname */
				zmoldname2 = zmoldname + '-imageframe';
			}
			if (zmold != null) {
				var zmesh = scene.getMeshByID(zmoldname2);
				if (zmesh != null) {
					if (zmesh.material != undefined) {
						var zcovering = zmesh.material.clone();
						if (zcovering != null) {
							switch (zcolorgroup) {
								case 'emissive':
									zcovering.emissiveColor = new BABYLON.Color3(zr,zg,zb);
									zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.specularcolor);
									zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.diffusecolor);
									zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.ambientcolor);
									break;
								case 'diffuse':
									zcovering.diffuseColor = new BABYLON.Color3(zr,zg,zb);
									zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.specularcolor);
									zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.emissivecolor);
									zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.ambientcolor);
									break;
								case 'specular':
									zcovering.specularColor = new BABYLON.Color3(zr,zg,zb);
									zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.emissivecolor);
									zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.diffusecolor);
									zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.ambientcolor);
									break;
								case 'ambient':
									zcovering.ambientColor = new BABYLON.Color3(zr,zg,zb);
									zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.specularcolor);
									zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.emissivecolor);
									zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.diffusecolor);
									break;
							}
							zmesh.material.dispose();
							zmesh.material = zcovering;
						}
					}
				} else {
					var znode = WTW.getMeshOrNodeByID(zmoldname2);
					if (znode != null) {
						var zchildmeshes = znode.getChildren();
						for (var i=0;i<zchildmeshes.length;i++) {
							if (zchildmeshes[i] != null) {
								if (zchildmeshes[i].material != undefined) {
									var zcovering = zchildmeshes[i].material.clone();
									if (zcovering != null) {
										switch (zcolorgroup) {
											case 'emissive':
												zcovering.emissiveColor = new BABYLON.Color3(zr,zg,zb);
												zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.specularcolor);
												zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.diffusecolor);
												zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.ambientcolor);
												break;
											case 'diffuse':
												zcovering.diffuseColor = new BABYLON.Color3(zr,zg,zb);
												zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.specularcolor);
												zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.emissivecolor);
												zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.ambientcolor);
												break;
											case 'specular':
												zcovering.specularColor = new BABYLON.Color3(zr,zg,zb);
												zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.emissivecolor);
												zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.diffusecolor);
												zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.ambientcolor);
												break;
											case 'ambient':
												zcovering.ambientColor = new BABYLON.Color3(zr,zg,zb);
												zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.specularcolor);
												zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.emissivecolor);
												zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.diffusecolor);
												break;
										}
										zchildmeshes[i].material.dispose();
										zchildmeshes[i].material = zcovering;
									}
								}
							}
						}
					}
				}
				
				var zcolor = new BABYLON.Color3(zr,zg,zb);
				switch (zcolorgroup) {
					case 'emissive':
						dGet('wtw_tmoldemissivecolor').value = zcolor.toHexString().toLowerCase();
						dGet('wtw_tmoldwebtextemissive').value = zcolor.toHexString().toLowerCase();
						zmolds[zmoldind].color.emissivecolor = zcolor.toHexString().toLowerCase();
						break;
					case 'diffuse':
						dGet('wtw_tmolddiffusecolor').value = zcolor.toHexString().toLowerCase();
						dGet('wtw_tmoldwebtextdiffuse').value = zcolor.toHexString().toLowerCase();
						zmolds[zmoldind].color.diffusecolor = zcolor.toHexString().toLowerCase();
						break;
					case 'specular':
						dGet('wtw_tmoldspecularcolor').value = zcolor.toHexString().toLowerCase();
						dGet('wtw_tmoldwebtextspecular').value = zcolor.toHexString().toLowerCase();
						zmolds[zmoldind].color.specularcolor = zcolor.toHexString().toLowerCase();
						break;
					case 'ambient':
						dGet('wtw_tmoldambientcolor').value = zcolor.toHexString().toLowerCase();
						dGet('wtw_tmoldwebtextambient').value = zcolor.toHexString().toLowerCase();
						zmolds[zmoldind].color.ambientcolor = zcolor.toHexString().toLowerCase();
						break;
				}
				WTW.pluginsSetMoldColor(zmoldname, zcolorgroup, dGet('wtw_tmoldemissivecolor').value, dGet('wtw_tmolddiffusecolor').value, dGet('wtw_tmoldspecularcolor').value, dGet('wtw_tmoldambientcolor').value);
			}
		}
		WTW.setNewMold();
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-setMoldColor=' + ex.message);
	}
}


/* the following process is designed to update the mold appearance directly while you are editing it */

WTWJS.prototype.setNewMold = function(zrebuildmold) {
	/* use the form settings to redraw the mold */
	/* zrebuildmold as true would force the mold to be deleted and rebuilt - some changes may require this anyways (set below) */
	try {
		if (zrebuildmold == undefined) {
			zrebuildmold = 0;
		}
		var zmoldname = '';
		var zwebtype = '';
		var zmolds = null;
		var zmoldid = dGet('wtw_tmoldid').value;
		var zmoldind = Number(dGet('wtw_tmoldind').value);
		var zshape = dGet('wtw_tmoldshape').value;
		var zcoveringname = 'texture';
		switch (dGet('wtw_tmoldwebtype').value) {
			case 'community':
				zwebtype = 'community';
				zmolds = WTW.communitiesMolds;
				break;
			case 'thing':
				zwebtype = 'thing';
				zmolds = WTW.thingMolds;
				break;
			default:
				zwebtype = 'building';
				zmolds = WTW.buildingMolds;
				break;
		}
		zmoldname = 'local-' + zwebtype + 'molds-' + dGet('wtw_tmoldind').value + '-' + dGet('wtw_tmoldid').value + '-' + dGet('wtw_tconnectinggridind').value + '-' + dGet('wtw_tconnectinggridid').value + '-' + zshape;
		if (zmoldname != '') {
			var zposx = 0;
			var zposy = 0;
			var zposz = 0;
			var zrotx = 0;
			var zroty = 0;
			var zrotz = 0;
			var zlenx = 1;
			var zleny = 1;
			var zlenz = 1;
			var zspecial1 = 0;
			var zspecial2 = 0;
			var zuoffset = 0;
			var zvoffset = 0;
			var zuscale = 0;
			var zvscale = 0;
			var zopacity = 0;
			var zsubdivisions = 2;
			var zmaxheight = 70;
			var zalphamold = 1;
			var zreceiveshadows = false;
			var zreceiveshadowsupdate = false;
			var zcastshadows = false;
			var zcastshadowsupdate = false;
			var zwaterreflection = false;
			var zwaterreflectionupdate = false;
			var zmold = WTW.getMeshOrNodeByID(zmoldname);
			var zmoldparent = null;
			var zparentname = '';
			var zlastmin = null;
			var zlastmax = null;
			var zphysicsenabled = 0;
			var zphysicscenterx = '0.00';
			var zphysicscentery = '0.00';
			var zphysicscenterz = '0.00';
			var zphysicsextentsx = '0.00';
			var zphysicsextentsy = '0.00';
			var zphysicsextentsz = '0.00';
			var zphysicsfriction = '0.00';
			var zphysicsistriggershape = 0;
			var zphysicsmass = '0.00';
			var zphysicspointax = '0.00';
			var zphysicspointay = '0.00';
			var zphysicspointaz = '0.00';
			var zphysicspointbx = '0.00';
			var zphysicspointby = '0.00';
			var zphysicspointbz = '0.00';
			var zphysicsradius = '0.00';
			var zphysicsrestitution = '0.00';
			var zphysicsrotationw = '0.00';
			var zphysicsrotationx = '0.00';
			var zphysicsrotationy = '0.00';
			var zphysicsrotationz = '0.00';
			var zphysicsstartasleep = 0;

			if (zmold != null) {
				try {
					zmoldparent = zmold.parent;
					zparentname = zmoldparent.name;
				} catch (ex) {}
			}
			if (zmold != null && zmolds[zmoldind] != null) {
				if (WTW.isNumeric(dGet('wtw_tmoldsubdivisions').value)) {
					if (Number(dGet('wtw_tmoldsubdivisions').value) < 2) {
						dGet('wtw_tmoldsubdivisions').value = '2.00';
					}
					zsubdivisions = Number(dGet('wtw_tmoldsubdivisions').value);
				}			
				if (zmolds[zmoldind].subdivisions != zsubdivisions) {
					zmolds[zmoldind].subdivisions = zsubdivisions;
					zrebuildmold = 1;
				}
				if (zmolds[zmoldind].graphics.receiveshadows != undefined) {
					if (dGet('wtw_tmoldreceiveshadows').checked) {
						if (zmolds[zmoldind].graphics.receiveshadows != '1') {
							zreceiveshadowsupdate = true;
						}
						zmolds[zmoldind].graphics.receiveshadows = '1';
						zreceiveshadows = true;
					} else {
						if (zmolds[zmoldind].graphics.receiveshadows != '0') {
							zreceiveshadowsupdate = true;
						}
						zmolds[zmoldind].graphics.receiveshadows = '0';
					}
				}
				if (zmolds[zmoldind].graphics.castshadows != undefined) {
					if (dGet('wtw_tmoldcastshadows').checked) {
						if (zmolds[zmoldind].graphics.castshadows != '1') {
//							zcastshadowsupdate = true;
						}
						zmolds[zmoldind].graphics.castshadows = '1';
						zcastshadows = true;
						zrebuildmold = 1;
					} else {
						if (zmolds[zmoldind].graphics.castshadows != '0') {
//							zcastshadowsupdate = true;
							zrebuildmold = 1;
						}
						zmolds[zmoldind].graphics.castshadows = '0';
					}
				}
				if (zmolds[zmoldind].graphics.waterreflection != undefined) {
					if (dGet('wtw_tmoldwaterreflection').checked == true) {
						if (zmolds[zmoldind].graphics.waterreflection != '1') {
							zwaterreflectionupdate = true;
						}
						zmolds[zmoldind].graphics.waterreflection = '1';
						zwaterreflection = true;
					} else {
						if (zmolds[zmoldind].graphics.waterreflection != '0') {
							zwaterreflectionupdate = true;
						}
						zmolds[zmoldind].graphics.waterreflection = '0';
					}
				}
				if (zmolds[zmoldind].checkcollisions != undefined) {
					var zcheckcollisions = zmolds[zmoldind].checkcollisions;
					if (dGet('wtw_tmoldcheckcollisions').checked == true) {
						zmolds[zmoldind].checkcollisions = '1';
					} else {
						zmolds[zmoldind].checkcollisions = '0';
					}
					if (zcheckcollisions != zmolds[zmoldind].checkcollisions) {
						/* if change occurred - rebuild mold */
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].ispickable != undefined) {
					var zispickable = zmolds[zmoldind].ispickable;
					if (dGet('wtw_tmoldispickable').checked == true) {
						zmolds[zmoldind].ispickable = '1';
					} else {
						zmolds[zmoldind].ispickable = '0';
					}
					/* note all molds are pickable in Admin mode */
				}
				if (WTW.isNumeric(dGet('wtw_tmoldmaxheight').value)) {
					if (Number(dGet('wtw_tmoldmaxheight').value) < 0) {
						dGet('wtw_tmoldmaxheight').value = '0.00';
					}
					zmaxheight = Number(dGet('wtw_tmoldmaxheight').value);
					zmolds[zmoldind].graphics.heightmap.maxheight = zmaxheight;
				}			
				if (dGet('wtw_tmoldcovering').options[dGet('wtw_tmoldcovering').selectedIndex] != undefined) {
					zcoveringname = dGet('wtw_tmoldcovering').options[dGet('wtw_tmoldcovering').selectedIndex].value;
					if (zcoveringname.indexOf('mirror-') > -1) {
						var znameparts = zcoveringname.split('-');
						dGet('wtw_tmoldactionzone2id').value = znameparts[1];
						zcoveringname = 'mirror';
						zrebuildmold = 1;
					}
				}
				zmolds[zmoldind].color.diffusecolor = dGet('wtw_tmolddiffusecolor').value;
				zmolds[zmoldind].color.emissivecolor = dGet('wtw_tmoldemissivecolor').value;
				zmolds[zmoldind].color.specularcolor = dGet('wtw_tmoldspecularcolor').value;
				zmolds[zmoldind].color.ambientcolor = dGet('wtw_tmoldambientcolor').value;
				if (zmold.material != undefined) {
					var zcovering = zmold.material.clone();
					zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.diffusecolor);	
					zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.emissivecolor);
					zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.specularcolor);
					zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.ambientcolor);
					zmold.material.dispose();
					zmold.material = zcovering;
				}
				if (zmolds[zmoldind].covering == 'color' || zmolds[zmoldind].covering == 'marble') {
					var zmoldimageframename = zmoldname + '-imageframe';
					var zmoldimageframe = WTW.getMeshOrNodeByID(zmoldimageframename);
					if (zmoldimageframe != null) {	
						if (zmoldimageframe.material != undefined) {
							var zcovering = zmoldimageframe.material.clone();
							zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.diffusecolor);	
							zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.emissivecolor);
							zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.specularcolor);
							zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.ambientcolor);
							zmoldimageframe.material.dispose();
							zmoldimageframe.material = zcovering;
						}
					}
				}
				dGet('wtw_pointlist1').innerHTML = '';
				dGet('wtw_pointlist2').innerHTML = '';
				switch (zshape) {
					case 'image':
						zcoveringname = 'hidden';
						zmolds[zmoldind].graphics.webimages[0].imageid = dGet('wtw_tmoldaddimageid').value;
						zmolds[zmoldind].graphics.webimages[0].imagepath = dGet('wtw_tmoldaddimagepath').value;
						zmolds[zmoldind].graphics.webimages[0].imagehoverid = dGet('wtw_tmoldaddimagehoverid').value;
						zmolds[zmoldind].graphics.webimages[0].imagehoverpath = dGet('wtw_tmoldaddimagehoverpath').value;
						zrebuildmold = 1;
						break;
					case 'tube':
						zrebuildmold = 1;
						var zpointind = -1;
						if (WTW.isNumeric(dGet('wtw_teditpointindex').value)) {
							zpointind = dGet('wtw_teditpointindex').value;
						}
						if (zpointind > -1) {
							if (zmolds[zmoldind].paths.path1[zpointind] == null) {
								zmolds[zmoldind].paths.path1[zpointind] = WTW.newPathPoint();
								zmolds[zmoldind].paths.path1[zpointind].sorder = zpointind;
							}
							if (WTW.isNumeric(dGet('wtw_tpointpositionx').value)) {
								zmolds[zmoldind].paths.path1[zpointind].x = dGet('wtw_tpointpositionx').value;
							}
							if (WTW.isNumeric(dGet('wtw_tpointpositiony').value)) {
								zmolds[zmoldind].paths.path1[zpointind].y = dGet('wtw_tpointpositiony').value;
							}
							if (WTW.isNumeric(dGet('wtw_tpointpositionz').value)) {
								zmolds[zmoldind].paths.path1[zpointind].z = dGet('wtw_tpointpositionz').value;
							}
						}
						WTW.loadPointList(zmolds[zmoldind].paths.path1, 1);
						break;
					case 'terrain':
						zrebuildmold = 1;
						break;
					default:
						if (zwaterreflection && WTW.waterMat != null) {
							WTW.addReflectionRefraction(zmold);
						}
						break;
				}
				var znode = WTW.getMeshOrNodeByID(zmoldname);
				if (znode != null) {
					/* uses transform node as base */
					var zchildmeshes = znode.getChildMeshes();
					if (zchildmeshes != null) {
						for (var i=0;i < zchildmeshes.length;i++) {
							if (zchildmeshes[i] != null) {
								if (zchildmeshes[i].material != null) {
									var zcovering = zchildmeshes[i].material.clone();
									zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.diffusecolor);	
									zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.emissivecolor);
									zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.specularcolor);
									zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolds[zmoldind].color.ambientcolor);
									zchildmeshes[i].material.dispose();
									zchildmeshes[i].material = zcovering;
								}
								if (zreceiveshadowsupdate) {
									zchildmeshes[i].receiveShadows = zreceiveshadows;
									WTW.shadows.recreateShadowMap();
								}
								if (zcastshadowsupdate && zcastshadows) {
									WTW.addShadowToMold(zchildmeshes[i]);
									WTW.shadows.recreateShadowMap();
								} else if (zcastshadowsupdate) {
									WTW.shadows.removeShadowCaster(zchildmeshes[i], true);
									WTW.shadows.recreateShadowMap();
								}
								if (zwaterreflectionupdate && WTW.waterMat != null) {
									if (zwaterreflection) {
										WTW.addReflectionRefraction(zchildmeshes[i]);
									} else {
										WTW.removeReflectionRefraction(zchildmeshes[i].name);
									}
								}
								if (WTW.adminView == 1 && zchildmeshes[i].id.indexOf('line') == -1 && zchildmeshes[i].id.indexOf('move') == -1) {
									try {
										if (typeof zchildmeshes[i].getBoundingInfo == 'function') {
											var zmin = zchildmeshes[i].getBoundingInfo().boundingBox.minimum;
											var zmax = zchildmeshes[i].getBoundingInfo().boundingBox.maximum;
											if (zlastmin == null && zlastmax == null) {
												zlastmin = zmin;
												zlastmax = zmax;
											} else {
												zlastmin = BABYLON.Vector3.Minimize(zlastmin, zmin);
												zlastmax = BABYLON.Vector3.Maximize(zlastmax, zmax);
											}
										}
									} catch (ex) {}
								}
							}
						}
					} else {
						if (zreceiveshadowsupdate) {
							znode.receiveShadows = zreceiveshadows;
							WTW.shadows.recreateShadowMap();
						}
						if (zcastshadowsupdate && zcastshadows) {
							WTW.addShadowToMold(znode);
							WTW.shadows.recreateShadowMap();
						} else if (zcastshadowsupdate) {
							WTW.shadows.removeShadowCaster(znode, true);
							WTW.shadows.recreateShadowMap();
						}
						if (zwaterreflectionupdate && WTW.waterMat != null) {
							if (zwaterreflection) {
								WTW.addReflectionRefraction(znode);
							} else {
								WTW.removeReflectionRefraction(znode.name);
							}
						}
					}
				}
				
				if (dGet('wtw_tmoldcoveringold').value == '') {
					dGet('wtw_tmoldcoveringold').value = zcoveringname;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldscalingx').value)) {
					if (Number(dGet('wtw_tmoldscalingx').value) < .01) {
						dGet('wtw_tmoldscalingx').value = '.01';
					}
					zlenx = Number(dGet('wtw_tmoldscalingx').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldscalingy').value)) {
					if (Number(dGet('wtw_tmoldscalingy').value) < .01) {
						dGet('wtw_tmoldscalingy').value = '.01';
					}
					zleny = Number(dGet('wtw_tmoldscalingy').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldscalingz').value)) {
					if (Number(dGet('wtw_tmoldscalingz').value) < .01) {
						dGet('wtw_tmoldscalingz').value = '.01';
					}
					zlenz = Number(dGet('wtw_tmoldscalingz').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldspecial1').value)) {
					zspecial1 = Number(dGet('wtw_tmoldspecial1').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldspecial2').value)) {
					zspecial2 = Number(dGet('wtw_tmoldspecial2').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmolduoffset').value)) {
					zuoffset = Number(dGet('wtw_tmolduoffset').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldvoffset').value)) {
					zvoffset = Number(dGet('wtw_tmoldvoffset').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmolduscale').value)) {
					zuscale = Number(dGet('wtw_tmolduscale').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldvscale').value)) {
					zvscale = Number(dGet('wtw_tmoldvscale').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldopacity').value)) {
					zopacity = Number(dGet('wtw_tmoldopacity').value);
				}
				if (zopacity < 0) {
					zopacity = 0;
				}
				if (zopacity > 100) {
					zopacity = 100;
				}
				dGet('wtw_tmoldopacity').value = (zopacity.toFixed(2));
				if (zcoveringname == 'glass') {
					zmolds[zmoldind].graphics.texture.id = '';
					zmolds[zmoldind].graphics.texture.path = '';
					zmolds[zmoldind].graphics.texture.bumpid = '';
					zmolds[zmoldind].graphics.texture.bumppath = '';
					dGet('wtw_tmoldtextureid').value = '';
					dGet('wtw_tmoldtexturepath').value = '';
					dGet('wtw_tmoldtexturebumpid').value = '';
					dGet('wtw_tmoldtexturebumppath').value = '';
					zopacity = .2;
				}
				if (zmolds[zmoldind].scaling.special1 != zspecial1) {
					zmolds[zmoldind].scaling.special1 = zspecial1;
					zrebuildmold = 1;
				}
				if (zmolds[zmoldind].scaling.special2 != zspecial2) {
					zmolds[zmoldind].scaling.special2 = zspecial2;
					zrebuildmold = 1;
				}
				if (zmolds[zmoldind].graphics.uoffset != zuoffset) {
					zmolds[zmoldind].graphics.uoffset = zuoffset;
					//zrebuildmold = 1;
				}
				if (zmolds[zmoldind].graphics.voffset != zvoffset) {
					zmolds[zmoldind].graphics.voffset = zvoffset;
					//zrebuildmold = 1;
				}
				if (zmolds[zmoldind].graphics.uscale != zuscale) {
					zmolds[zmoldind].graphics.uscale = zuscale;
					zrebuildmold = 1;
				}
				if (zmolds[zmoldind].graphics.vscale != zvscale) {
					zmolds[zmoldind].graphics.vscale = zvscale;
					zrebuildmold = 1;
				}
				zmolds[zmoldind].opacity = zopacity;
				zmolds[zmoldind].scaling.x = zlenx;
				zmolds[zmoldind].scaling.y = zleny;
				zmolds[zmoldind].scaling.z = zlenz;
				zmold.scaling.x = zlenx;
				zmold.scaling.y = zleny;
				zmold.scaling.z = zlenz;
				zposx = zmolds[zmoldind].position.x;
				zposy = zmolds[zmoldind].position.y;
				zposz = zmolds[zmoldind].position.z;
				if (WTW.isNumeric(dGet('wtw_tmoldpositionx').value)) {
					zposx = Number(dGet('wtw_tmoldpositionx').value);
				} else {
					dGet('wtw_tmoldpositionx').value = zposx;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldpositiony').value)) {
					zposy = Number(dGet('wtw_tmoldpositiony').value);
				} else {
					dGet('wtw_tmoldpositiony').value = zposy;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldpositionz').value)) {
					zposz = Number(dGet('wtw_tmoldpositionz').value);
				} else {
					dGet('wtw_tmoldpositionz').value = zposz;
				}
				zmolds[zmoldind].position.x = zposx;
				zmolds[zmoldind].position.y = zposy;
				zmolds[zmoldind].position.z = zposz;
				if (zparentname.indexOf('actionzone') > -1) {
					var zactionzoneparts = zparentname.split('-');
					var zactionzoneind = Number(zactionzoneparts[2]);
					if (WTW.actionZones[zactionzoneind].actionzonetype.indexOf('seat') > -1) {
						var zactionzoneaxlebase2 = WTW.getMeshOrNodeByID('local-actionzoneaxlebase2-' + zactionzoneind.toString() + '-' + WTW.actionZones[zactionzoneind].actionzoneid + '-' + WTW.actionZones[zactionzoneind].connectinggridind + '-' + WTW.actionZones[zactionzoneind].connectinggridid + '-' + WTW.actionZones[zactionzoneind].actionzonetype);
						if (zactionzoneaxlebase2 != null) {
//							zposx -= zactionzoneaxlebase2.position.x;
//							zposy -= zactionzoneaxlebase2.position.y;
//							zposz -= zactionzoneaxlebase2.position.z;
						}
					} else {
						var zactionzoneaxlebase = WTW.getMeshOrNodeByID('local-actionzoneaxlebase-' + zactionzoneind.toString() + '-' + WTW.actionZones[zactionzoneind].actionzoneid + '-' + WTW.actionZones[zactionzoneind].connectinggridind + '-' + WTW.actionZones[zactionzoneind].connectinggridid + '-' + WTW.actionZones[zactionzoneind].actionzonetype);
						if (zactionzoneaxlebase != null) {
							zposx -= zactionzoneaxlebase.position.x;
							zposy -= zactionzoneaxlebase.position.y;
							zposz -= zactionzoneaxlebase.position.z;
						}
					}
				}
				zmold.position.x = zposx;
				zmold.position.y = zposy;
				zmold.position.z = zposz;
				if (WTW.isNumeric(dGet('wtw_tmoldrotationx').value)) {
					zrotx = WTW.getRadians(Number(dGet('wtw_tmoldrotationx').value));
				}
				if (WTW.isNumeric(dGet('wtw_tmoldrotationy').value)) {
					zroty = WTW.getRadians(Number(dGet('wtw_tmoldrotationy').value));
				}
				if (WTW.isNumeric(dGet('wtw_tmoldrotationz').value)) {
					zrotz = WTW.getRadians(Number(dGet('wtw_tmoldrotationz').value));
				}
				zmolds[zmoldind].rotation.x = WTW.getDegrees(zrotx);
				zmolds[zmoldind].rotation.y = WTW.getDegrees(zroty);
				zmolds[zmoldind].rotation.z = WTW.getDegrees(zrotz);
				zmold.rotation.x = zrotx;
				if (zshape == 'candleflame') { // billboardmode
					zmold.rotation.y = 0;
					dGet('wtw_tmoldrotationy').value = '0.00';
				} else {
					zmold.rotation.y = zroty;				
				}
				zmold.rotation.z = zrotz;				
				if ((zshape == 'box' || zshape == 'wall' || zshape == 'floor') && zcoveringname == 'directional texture') {
					zcoveringname = 'directional texture';
				} else if (zshape != 'box' && zshape != 'wall' && zshape != 'floor' && zcoveringname == 'directional texture') {
					zcoveringname = 'texture';
				}
				if (zshape == '3dtext') {
					if (zmolds[zmoldind].webtext.webtext != undefined) {
						if (zmolds[zmoldind].webtext.webtext != dGet('wtw_tmoldwebtext').value) {
							zmolds[zmoldind].webtext.webtext = WTW.encode(dGet('wtw_tmoldwebtext').value);
							zrebuildmold = 1;
						}
					}
					if (dGet('wtw_tmoldwebtextheight').value == '' || WTW.isNumeric(dGet('wtw_tmoldwebtextheight').value) == false) {
						dGet('wtw_tmoldwebtextheight').value = 6;
					}
					if (dGet('wtw_tmoldwebtextthick').value == '' || WTW.isNumeric(dGet('wtw_tmoldwebtextthick').value) == false) {
						dGet('wtw_tmoldwebtextthick').value = 1;
					}
					if (dGet('wtw_tmoldwebtextemissive').value == '') {
						dGet('wtw_tmoldwebtextemissive').value = '#ff0000';
					}
					if (dGet('wtw_tmoldwebtextdiffuse').value == '') {
						dGet('wtw_tmoldwebtextdiffuse').value = '#f0f0f0';
					}
					if (dGet('wtw_tmoldwebtextspecular').value == '') {
						dGet('wtw_tmoldwebtextspecular').value = '#000000';
					}
					if (dGet('wtw_tmoldwebtextambient').value == '') {
						dGet('wtw_tmoldwebtextambient').value = '#808080';
					}
					if (zmolds[zmoldind].webtext.webstyle != undefined) {
						dGet('wtw_tmoldwebstyle').value = "{\"anchor\":\"" + dGet('wtw_tmoldwebtextalign').options[dGet('wtw_tmoldwebtextalign').selectedIndex].value + "\",\"letter-height\":" + dGet('wtw_tmoldwebtextheight').value + ",\"letter-thickness\":" + dGet('wtw_tmoldwebtextthick').value + ",\"color\":\"" + dGet('wtw_tmoldwebtextemissive').value + "\",\"alpha\":" + zopacity/100 + ",\"colors\":{\"diffuse\":\"" + dGet('wtw_tmoldwebtextdiffuse').value + "\",\"specular\":\"" + dGet('wtw_tmoldwebtextspecular').value + "\",\"ambient\":\"" + dGet('wtw_tmoldwebtextambient').value + "\",\"emissive\":\"" + dGet('wtw_tmoldwebtextemissive').value + "\"}}";
						if (zmolds[zmoldind].webtext.webstyle != dGet('wtw_tmoldwebstyle').value) {
							zmolds[zmoldind].webtext.webstyle = dGet('wtw_tmoldwebstyle').value;
							zrebuildmold = 1;
						}
					}
				}
				zmolds[zmoldind].csg.moldid = dGet('wtw_tmoldcsgmoldid').value;
				var zcsgmainid = zmolds[zmoldind].csg.moldid;

				if (zmolds[zmoldind].objects.uploadobjectid != undefined) {
					if (zmolds[zmoldind].objects.uploadobjectid != dGet('wtw_tmolduploadobjectid').value) {
						zmolds[zmoldind].objects.uploadobjectid = dGet('wtw_tmolduploadobjectid').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].objects.folder != undefined) {
					if (zmolds[zmoldind].objects.folder != dGet('wtw_tmoldobjectfolder').value) {
						zmolds[zmoldind].objects.folder = dGet('wtw_tmoldobjectfolder').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].objects.file != undefined) {
					if (zmolds[zmoldind].objects.file != dGet('wtw_tmoldobjectfile').value) {
						zmolds[zmoldind].objects.file = dGet('wtw_tmoldobjectfile').value;
						zrebuildmold = 1;
					}
				}

				if (zmolds[zmoldind].graphics.level != undefined) {
					if (dGet('wtw_tmoldgraphiclevel').checked) {
						zmolds[zmoldind].graphics.level = '1';
					} else {
						zmolds[zmoldind].graphics.level = '0';
					}
				}
				if (zmolds[zmoldind].graphics.texture.id != undefined) {
					if (zmolds[zmoldind].graphics.texture.id != dGet('wtw_tmoldtextureid').value) {
						zmolds[zmoldind].graphics.texture.id = dGet('wtw_tmoldtextureid').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.texture.path != undefined) {
					if (zmolds[zmoldind].graphics.texture.path != dGet('wtw_tmoldtexturepath').value) {
						zmolds[zmoldind].graphics.texture.path = dGet('wtw_tmoldtexturepath').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.texture.bumpid != undefined) {
					if (zmolds[zmoldind].graphics.texture.bumpid != dGet('wtw_tmoldtexturebumpid').value) {
						zmolds[zmoldind].graphics.texture.bumpid = dGet('wtw_tmoldtexturebumpid').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.texture.bumppath != undefined) {
					if (zmolds[zmoldind].graphics.texture.bumppath != dGet('wtw_tmoldtexturebumppath').value) {
						zmolds[zmoldind].graphics.texture.bumppath = dGet('wtw_tmoldtexturebumppath').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.heightmap.id != undefined) {
					if (zmolds[zmoldind].graphics.heightmap.id != dGet('wtw_tmoldheightmapid').value) {
						zmolds[zmoldind].graphics.heightmap.id = dGet('wtw_tmoldheightmapid').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.heightmap.path != undefined) {
					if (zmolds[zmoldind].graphics.heightmap.path != dGet('wtw_tmoldheightmappath').value) {
						zmolds[zmoldind].graphics.heightmap.path = dGet('wtw_tmoldheightmappath').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.heightmap.mixmapid != undefined) {
					if (zmolds[zmoldind].graphics.heightmap.mixmapid != dGet('wtw_tmoldmixmapid').value) {
						zmolds[zmoldind].graphics.heightmap.mixmapid = dGet('wtw_tmoldmixmapid').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.heightmap.mixmappath != undefined) {
					if (zmolds[zmoldind].graphics.heightmap.mixmappath != dGet('wtw_tmoldmixmappath').value) {
						zmolds[zmoldind].graphics.heightmap.mixmappath = dGet('wtw_tmoldmixmappath').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.heightmap.texturerid != undefined) {
					if (zmolds[zmoldind].graphics.heightmap.texturerid != dGet('wtw_tmoldtexturerid').value) {
						zmolds[zmoldind].graphics.heightmap.texturerid = dGet('wtw_tmoldtexturerid').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.heightmap.texturerpath != undefined) {
					if (zmolds[zmoldind].graphics.heightmap.texturerpath != dGet('wtw_tmoldtexturerpath').value) {
						zmolds[zmoldind].graphics.heightmap.texturerpath = dGet('wtw_tmoldtexturerpath').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.heightmap.texturegid != undefined) {
					if (zmolds[zmoldind].graphics.heightmap.texturegid != dGet('wtw_tmoldtexturegid').value) {
						zmolds[zmoldind].graphics.heightmap.texturegid = dGet('wtw_tmoldtexturegid').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.heightmap.texturegpath != undefined) {
					if (zmolds[zmoldind].graphics.heightmap.texturegpath != dGet('wtw_tmoldtexturegpath').value) {
						zmolds[zmoldind].graphics.heightmap.texturegpath = dGet('wtw_tmoldtexturegpath').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.heightmap.texturebid != undefined) {
					if (zmolds[zmoldind].graphics.heightmap.texturebid != dGet('wtw_tmoldtexturebid').value) {
						zmolds[zmoldind].graphics.heightmap.texturebid = dGet('wtw_tmoldtexturebid').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.heightmap.texturebpath != undefined) {
					if (zmolds[zmoldind].graphics.heightmap.texturebpath != dGet('wtw_tmoldtexturebpath').value) {
						zmolds[zmoldind].graphics.heightmap.texturebpath = dGet('wtw_tmoldtexturebpath').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.heightmap.texturebumprid != undefined) {
					if (zmolds[zmoldind].graphics.heightmap.texturebumprid != dGet('wtw_tmoldtexturebumprid').value) {
						zmolds[zmoldind].graphics.heightmap.texturebumprid = dGet('wtw_tmoldtexturebumprid').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.heightmap.texturebumprpath != undefined) {
					if (zmolds[zmoldind].graphics.heightmap.texturebumprpath != dGet('wtw_tmoldtexturebumprpath').value) {
						zmolds[zmoldind].graphics.heightmap.texturebumprpath = dGet('wtw_tmoldtexturebumprpath').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.heightmap.texturebumpgid != undefined) {
					if (zmolds[zmoldind].graphics.heightmap.texturebumpgid != dGet('wtw_tmoldtexturebumpgid').value) {
						zmolds[zmoldind].graphics.heightmap.texturebumpgid = dGet('wtw_tmoldtexturebumpgid').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.heightmap.texturebumpgpath != undefined) {
					if (zmolds[zmoldind].graphics.heightmap.texturebumpgpath != dGet('wtw_tmoldtexturebumpgpath').value) {
						zmolds[zmoldind].graphics.heightmap.texturebumpgpath = dGet('wtw_tmoldtexturebumpgpath').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.heightmap.texturebumpbid != undefined) {
					if (zmolds[zmoldind].graphics.heightmap.texturebumpbid != dGet('wtw_tmoldtexturebumpbid').value) {
						zmolds[zmoldind].graphics.heightmap.texturebumpbid = dGet('wtw_tmoldtexturebumpbid').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.heightmap.texturebumpbpath != undefined) {
					if (zmolds[zmoldind].graphics.heightmap.texturebumpbpath != dGet('wtw_tmoldtexturebumpbpath').value) {
						zmolds[zmoldind].graphics.heightmap.texturebumpbpath = dGet('wtw_tmoldtexturebumpbpath').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.texture.videoid != undefined) {
					if (zmolds[zmoldind].graphics.texture.videoid != dGet('wtw_tmoldvideoid').value) {
						zmolds[zmoldind].graphics.texture.videoid = dGet('wtw_tmoldvideoid').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.texture.video != undefined) {
					if (zmolds[zmoldind].graphics.texture.video != dGet('wtw_tmoldvideopath').value) {
						zmolds[zmoldind].graphics.texture.video = dGet('wtw_tmoldvideopath').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.texture.videoposterid != undefined) {
					if (zmolds[zmoldind].graphics.texture.videoposterid != dGet('wtw_tmoldvideoposterid').value) {
						zmolds[zmoldind].graphics.texture.videoposterid = dGet('wtw_tmoldvideoposterid').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].graphics.texture.videoposter != undefined) {
					if (zmolds[zmoldind].graphics.texture.videoposter != dGet('wtw_tmoldvideoposterpath').value) {
						zmolds[zmoldind].graphics.texture.videoposter = dGet('wtw_tmoldvideoposterpath').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].sound.id != undefined) {
					if (zmolds[zmoldind].sound.id != dGet('wtw_tmoldsoundid').value) {
						zmolds[zmoldind].sound.id = dGet('wtw_tmoldsoundid').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].sound.path != undefined) {
					if (zmolds[zmoldind].sound.path != dGet('wtw_tmoldsoundpath').value) {
						zmolds[zmoldind].sound.path = dGet('wtw_tmoldsoundpath').value;
						zrebuildmold = 1;
					}
				}
				if (dGet('wtw_soundicon') != null && dGet('wtw_soundicon').alt != '') {
					dGet('wtw_tmoldsoundname').value = dGet('wtw_soundicon').alt;
					dGet('wtw_selectedsound').innerHTML = dGet('wtw_tmoldsoundname').value;
				}
				if (zmolds[zmoldind].sound.name != undefined) {
					if (zmolds[zmoldind].sound.name != dGet('wtw_tmoldsoundname').value) {
						zmolds[zmoldind].sound.name = dGet('wtw_tmoldsoundname').value;
						zrebuildmold = 1;
					}
				}
				var zsoundattenuation = 'none';
				if (dGet('wtw_tmoldsoundattenuation').selectedIndex > -1) {
					zsoundattenuation = dGet('wtw_tmoldsoundattenuation').options[dGet('wtw_tmoldsoundattenuation').selectedIndex].value;
				} else {
					WTW.setDDLValue('wtw_tmoldsoundattenuation', 'linear');
					zsoundattenuation = 'linear';
				}
				if (zmolds[zmoldind].sound.attenuation != undefined) {
					if (zmolds[zmoldind].sound.attenuation != zsoundattenuation) {
						zmolds[zmoldind].sound.attenuation = zsoundattenuation;
						WTW.setSoundFields();
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].sound.loop != undefined) {
					var zsoundloop = '0';
					if (dGet('wtw_tmoldsoundloop').checked == true) {
						zsoundloop = '1';
					}
					if (zmolds[zmoldind].sound.loop != zsoundloop) {
						if (zsoundloop == '1') {
							zmolds[zmoldind].sound.loop = '1';
						} else {
							zmolds[zmoldind].sound.loop = '0';
						}
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].sound.maxdistance != undefined) {
					if (zmolds[zmoldind].sound.maxdistance != dGet('wtw_tmoldsoundmaxdistance').value) {
						zmolds[zmoldind].sound.maxdistance = dGet('wtw_tmoldsoundmaxdistance').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].sound.rollofffactor != undefined) {
					if (zmolds[zmoldind].sound.rollofffactor != dGet('wtw_tmoldsoundrollofffactor').value) {
						zmolds[zmoldind].sound.rollofffactor = dGet('wtw_tmoldsoundrollofffactor').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].sound.refdistance != undefined) {
					if (zmolds[zmoldind].sound.refdistance != dGet('wtw_tmoldsoundrefdistance').value) {
						zmolds[zmoldind].sound.refdistance = dGet('wtw_tmoldsoundrefdistance').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].sound.coneinnerangle != undefined) {
					if (zmolds[zmoldind].sound.coneinnerangle != dGet('wtw_tmoldsoundconeinnerangle').value) {
						zmolds[zmoldind].sound.coneinnerangle = dGet('wtw_tmoldsoundconeinnerangle').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].sound.coneouterangle != undefined) {
					if (zmolds[zmoldind].sound.coneouterangle != dGet('wtw_tmoldsoundconeouterangle').value) {
						zmolds[zmoldind].sound.coneouterangle = dGet('wtw_tmoldsoundconeouterangle').value;
						zrebuildmold = 1;
					}
				}
				if (zmolds[zmoldind].sound.coneoutergain != undefined) {
					if (zmolds[zmoldind].sound.coneoutergain != dGet('wtw_tmoldsoundconeoutergain').value) {
						zmolds[zmoldind].sound.coneoutergain = dGet('wtw_tmoldsoundconeoutergain').value;
						zrebuildmold = 1;
					}
				}
				var zcsgaction = dGet('wtw_tmoldcsgaction').options[dGet('wtw_tmoldcsgaction').selectedIndex].value;
				var zcsgmainind = -1; 
				var zcsgchildind = -1;
				if (zcsgmainid != '') {
					zcsgmainind = WTW.getMoldInd(zmolds, zcsgmainid, dGet('wtw_tconnectinggridind').value);
					WTW.setCSGCount(zcsgmainid);
					zcsgchildind = WTW.getMoldInd(zmolds, zmoldid, dGet('wtw_tconnectinggridind').value);
					zmolds[zcsgchildind].covering = 'color';
					zmolds[zcsgchildind].opacity = '30';
					zcoveringname = 'color';
				}
				if (WTW.isNumeric(zmolds[zmoldind].csg.count)) {
					if (Number(zmolds[zmoldind].csg.count) > 0) {
						WTW.disposeClean(zmoldname);
						zmolds[zmoldind].shown = '0';
						zcsgmainid = '';
					}
				}
				if (zcsgmainid != '' && zmolds[zcsgmainind] != null) {
					var zcsgmainname = 'local-' + zwebtype + 'molds-' + zcsgmainind + '-' + zmolds[zcsgmainind].moldid + '-' + zmolds[zcsgmainind].connectinggridind + '-' + zmolds[zcsgmainind].connectinggridid + '-' + zmolds[zcsgmainind].shape;
					var zcsgmain = WTW.getMeshOrNodeByID(zcsgmainname);
					if (zcsgmain != null) {
						zreceiveshadows = false;
						zcastshadows = false;
						zwaterreflection = false;
						WTW.disposeClean(zcsgmainname);
						//zmolds[zcsgmainind].shown = '0';
						zcsgmain = WTW.addMold(zmolds[zcsgmainind].moldname, zmolds[zcsgmainind], zmolds[zcsgmainind].parentname, zmolds[zcsgmainind].covering);
						zcsgmain = WTW.getMoldCSG(zcsgmain, zmolds[zcsgmainind]);
						if (zmolds[zcsgmainind].graphics.receiveshadows != undefined) {
							if (zmolds[zcsgmainind].graphics.receiveshadows == '1') {
								zreceiveshadows = true;
							}
						}
						if (zmolds[zcsgmainind].graphics.castshadows != undefined) {
							if (zmolds[zcsgmainind].graphics.castshadows == '1') {
								zcastshadows = true;
							}
						}
						if (zmolds[zcsgmainind].graphics.waterreflection != undefined) {
							if (zmolds[zcsgmainind].graphics.waterreflection == '1') {
								zwaterreflection = true;
							}
						}
						zmold.receiveShadows = zreceiveshadows;
						if (zcastshadows) {
							WTW.addShadowToMold(zmold);
						}

						if (zwaterreflection && WTW.waterMat != null) {
							WTW.addReflectionRefraction(zmold);
							//WTW.waterMat.addToRenderList(zmold);
						}
						zcsgmain.checkCollisions = false;
						zcsgmain.isPickable = false;
						if (zmolds[zcsgmainind].checkcollisions != undefined) {
							if (zmolds[zcsgmainind].checkcollisions == '1') {
								zcsgmain.checkCollisions = true;
							}
						}
						if (zmolds[zcsgmainind].ispickable != undefined) {
							if (zmolds[zcsgmainind].ispickable == '1') {
								zcsgmain.isPickable = true;
							}
						}
					}
				}
				/* process physics values */
				if (dGet('wtw_tmoldphysicsenabled').checked) {
					zphysicsenabled = 1;
					zrebuildmold = 1;
					WTW.show('wtw_moldphysicsdiv');
				} else {
					WTW.hide('wtw_moldphysicsdiv');
				}
				if (dGet('wtw_tmoldphysicsistriggershape').checked) {
					zphysicsistriggershape = 1;
				}
				if (dGet('wtw_tmoldphysicsstartasleep').checked) {
					zphysicsstartasleep = 1;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicscenterx').value)) {
					zphysicscenterx = Number(dGet('wtw_tmoldphysicscenterx').value);
				} else {
					dGet('wtw_tmoldphysicscenterx').value = zphysicscenterx;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicscentery').value)) {
					zphysicscentery = Number(dGet('wtw_tmoldphysicscentery').value);
				} else {
					dGet('wtw_tmoldphysicscentery').value = zphysicscentery;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicscenterz').value)) {
					zphysicscenterz = Number(dGet('wtw_tmoldphysicscenterz').value);
				} else {
					dGet('wtw_tmoldphysicscenterz').value = zphysicscenterz;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicsextentsx').value)) {
					zphysicsextentsx = Number(dGet('wtw_tmoldphysicsextentsx').value);
				} else {
					dGet('wtw_tmoldphysicsextentsx').value = zphysicsextentsx;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicsextentsy').value)) {
					zphysicsextentsy = Number(dGet('wtw_tmoldphysicsextentsy').value);
				} else {
					dGet('wtw_tmoldphysicsextentsy').value = zphysicsextentsy;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicsextentsz').value)) {
					zphysicsextentsz = Number(dGet('wtw_tmoldphysicsextentsz').value);
				} else {
					dGet('wtw_tmoldphysicsextentsz').value = zphysicsextentsz;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicsfriction').value)) {
					zphysicsfriction = Number(dGet('wtw_tmoldphysicsfriction').value);
				} else {
					dGet('wtw_tmoldphysicsfriction').value = zphysicsfriction;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicsmass').value)) {
					zphysicsmass = Number(dGet('wtw_tmoldphysicsmass').value);
				} else {
					dGet('wtw_tmoldphysicsmass').value = zphysicsmass;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicspointax').value)) {
					zphysicspointax = Number(dGet('wtw_tmoldphysicspointax').value);
				} else {
					dGet('wtw_tmoldphysicspointax').value = zphysicspointax;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicspointay').value)) {
					zphysicspointay = Number(dGet('wtw_tmoldphysicspointay').value);
				} else {
					dGet('wtw_tmoldphysicspointay').value = zphysicspointay;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicspointaz').value)) {
					zphysicspointaz = Number(dGet('wtw_tmoldphysicspointaz').value);
				} else {
					dGet('wtw_tmoldphysicspointaz').value = zphysicspointaz;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicspointbx').value)) {
					zphysicspointbx = Number(dGet('wtw_tmoldphysicspointbx').value);
				} else {
					dGet('wtw_tmoldphysicspointbx').value = zphysicspointbx;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicspointby').value)) {
					zphysicspointby = Number(dGet('wtw_tmoldphysicspointby').value);
				} else {
					dGet('wtw_tmoldphysicspointby').value = zphysicspointby;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicspointbz').value)) {
					zphysicspointbz = Number(dGet('wtw_tmoldphysicspointbz').value);
				} else {
					dGet('wtw_tmoldphysicspointbz').value = zphysicspointbz;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicsradius').value)) {
					zphysicsradius = Number(dGet('wtw_tmoldphysicsradius').value);
				} else {
					dGet('wtw_tmoldphysicsradius').value = zphysicsradius;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicsrestitution').value)) {
					zphysicsrestitution = Number(dGet('wtw_tmoldphysicsrestitution').value);
				} else {
					dGet('wtw_tmoldphysicsrestitution').value = zphysicsrestitution;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicsrotationw').value)) {
					zphysicsrotationw = Number(dGet('wtw_tmoldphysicsrotationw').value);
				} else {
					dGet('wtw_tmoldphysicsrotationw').value = zphysicsrotationw;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicsrotationx').value)) {
					zphysicsrotationx = Number(dGet('wtw_tmoldphysicsrotationx').value);
				} else {
					dGet('wtw_tmoldphysicsrotationx').value = zphysicsrotationx;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicsrotationy').value)) {
					zphysicsrotationy = Number(dGet('wtw_tmoldphysicsrotationy').value);
				} else {
					dGet('wtw_tmoldphysicsrotationy').value = zphysicsrotationy;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldphysicsrotationz').value)) {
					zphysicsrotationz = Number(dGet('wtw_tmoldphysicsrotationz').value);
				} else {
					dGet('wtw_tmoldphysicsrotationz').value = zphysicsrotationz;
				}

				zmolds[zmoldind].physics.enabled = zphysicsenabled;
				zmolds[zmoldind].physics.istriggershape = zphysicsistriggershape;
				zmolds[zmoldind].physics.startasleep = zphysicsstartasleep;
				zmolds[zmoldind].physics.center.x = zphysicscenterx;
				zmolds[zmoldind].physics.center.y = zphysicscentery;
				zmolds[zmoldind].physics.center.z = zphysicscenterz;
				zmolds[zmoldind].physics.extents.x = zphysicsextentsx;
				zmolds[zmoldind].physics.extents.y = zphysicsextentsy;
				zmolds[zmoldind].physics.extents.z = zphysicsextentsz;
				zmolds[zmoldind].physics.friction = zphysicsfriction;
				zmolds[zmoldind].physics.mass = zphysicsmass;
				zmolds[zmoldind].physics.pointa.x = zphysicspointax;
				zmolds[zmoldind].physics.pointa.y = zphysicspointay;
				zmolds[zmoldind].physics.pointa.z = zphysicspointaz;
				zmolds[zmoldind].physics.pointb.x = zphysicspointbx;
				zmolds[zmoldind].physics.pointb.y = zphysicspointby;
				zmolds[zmoldind].physics.pointb.z = zphysicspointbz;
				zmolds[zmoldind].physics.radius = zphysicsradius;
				zmolds[zmoldind].physics.restitution = zphysicsrestitution;
				zmolds[zmoldind].physics.rotation.w = zphysicsrotationw;
				zmolds[zmoldind].physics.rotation.x = zphysicsrotationx;
				zmolds[zmoldind].physics.rotation.y = zphysicsrotationy;
				zmolds[zmoldind].physics.rotation.z = zphysicsrotationz;
				

				var zhasdependents = 0;
				for (var i=0;i<zmolds.length;i++) {
					if (zmolds[i] != null) {
						if (zmolds[zmoldind].moldid == zmolds[i].csg.moldid) {
							WTW.disposeClean(zmolds[i].moldname);
							zmolds[i].shown = '0';
							zhasdependents = 1;
							zrebuildmold = 1;
						}
					}
				}
				zrebuildmold = WTW.pluginsSetNewMold(zmoldname, zmolds, zmoldind, zrebuildmold);
				if (zrebuildmold == 1 || zcsgmainid != '') {
					WTW.disposeClean(zmoldname);
					zmold = WTW.addMold(zmoldname, zmolds[zmoldind], zparentname, zcoveringname);
					if (zhasdependents == 1) {
						zmold = WTW.getMoldCSG(zmold, zmolds[zmoldind]);
					}
				}
				if (WTW.adminView == 1) {
					zmold.WTW = [];
					zmold.WTW = {
						'bounding': {
							'min':zlastmin,
							'max':zlastmax
						}
					};
				}
			}
			WTW.openEditPoles(zmold);
		}	
	} catch (ex) {
		WTW.log('core-scripts-admin-wtw_adminmolds.js-setNewMold=' + ex.message);
	}
}


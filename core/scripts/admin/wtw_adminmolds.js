/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions are used to administer a website in admin mode only */

/* mold functions are used by 3D Communities, 3D Buildings, and 3D Things */
/* molds are definition files that create meshes on demand */

WTWJS.prototype.openMoldForm = function(moldind, shape, moldgroup, saveprevious) {
	/* open mold form to create new or edit existing mold */
	try { 
		var molds;
		if (typeof saveprevious === "undefined") {  
			saveprevious = true;
		}
		switch (moldgroup) {
			case "community":
				molds = WTW.communitiesMolds;
				break;
			case "thing":
				molds = WTW.thingMolds;
				break;
			default:
				molds = WTW.buildingMolds;
				break;
		}
		var testmoldid = "";
		if (molds[moldind] != null) {
			testmoldid = molds[moldind].moldid;
		}
		if (dGet('wtw_tmoldid').value != "" && dGet('wtw_tmoldid').value != testmoldid && saveprevious != false) {
			WTW.submitMoldForm(1);
		}
		WTW.getMoldList();
		WTW.getWebMoldList();
		if (shape == "") {
			shape = "box";
		}
		WTW.getCoveringList(shape);
		WTW.hideAdminMenu();
		WTW.show('wtw_adminmenu11');
		WTW.show('wtw_adminmenu11b');
		if (dGet('wtw_adminmenubutton').style.left == "0px") {
			WTW.toggleAdminMenu('wtw_adminmenubutton');
		}
		WTW.setMoldFormFields(shape);
		dGet('wtw_tmoldshape').value = shape;
		dGet('wtw_tmoldmoldgroup').value = moldgroup;
		if (molds[moldind] != null) {
			try {
				WTW.moldBackup = JSON.parse(JSON.stringify(molds[moldind]));
			} catch(ex) {}
			
			WTW.loadMoldForm(molds[moldind]);
			switch (moldgroup) {
				case "community":
					dGet('wtw_tcommunityind').value = 0;
					break;
				case "building":
					dGet('wtw_teditbuildingind').value = 0;
					break;
				case "thing":
					dGet('wtw_tthingind').value = 0;
					break;
				default:
					break;
			}
			WTW.setCoveringFormFields(molds[moldind].covering);
			dGet('wtw_tmolduploadobjectid').value = molds[moldind].object.uploadobjectid;
			dGet('wtw_tmoldobjectfolder').value = molds[moldind].object.folder;
			dGet('wtw_tmoldobjectfile').value = molds[moldind].object.file;
			if (molds[moldind].graphics != null) {
				if (molds[moldind].graphics.receiveshadows == '1') {
					dGet('wtw_tmoldreceiveshadows').checked = true;
				} else {
					dGet('wtw_tmoldreceiveshadows').checked = false;
				}
				if (molds[moldind].graphics.level == '1') {
					dGet('wtw_tmoldgraphiclevel').checked = true;
				} else {
					dGet('wtw_tmoldgraphiclevel').checked = false;
				}
			}
			dGet('wtw_tmoldvideoid').value = molds[moldind].graphics.texture.videoid;
			dGet('wtw_tmoldvideopath').value = molds[moldind].graphics.texture.video;
			dGet('wtw_tmoldvideoposterid').value = molds[moldind].graphics.texture.videoposterid;
			dGet('wtw_tmoldvideoposterpath').value = molds[moldind].graphics.texture.videoposter;
			dGet('wtw_tmoldheightmapid').value = molds[moldind].graphics.heightmap.id;
			dGet('wtw_tmoldheightmappath').value = molds[moldind].graphics.heightmap.path;
			dGet('wtw_tmoldmixmapid').value = molds[moldind].graphics.heightmap.mixmapid;
			dGet('wtw_tmoldmixmappath').value = molds[moldind].graphics.heightmap.mixmappath;
			dGet('wtw_tmoldtexturerid').value = molds[moldind].graphics.heightmap.texturerid;
			dGet('wtw_tmoldtexturerpath').value = molds[moldind].graphics.heightmap.texturerpath;
			dGet('wtw_tmoldtexturegid').value = molds[moldind].graphics.heightmap.texturegid;
			dGet('wtw_tmoldtexturegpath').value = molds[moldind].graphics.heightmap.texturegpath;
			dGet('wtw_tmoldtexturebid').value = molds[moldind].graphics.heightmap.texturebid;
			dGet('wtw_tmoldtexturebpath').value = molds[moldind].graphics.heightmap.texturebpath;
			dGet('wtw_tmoldtexturebumprid').value = molds[moldind].graphics.heightmap.texturebumprid;
			dGet('wtw_tmoldtexturebumprpath').value = molds[moldind].graphics.heightmap.texturebumprpath;
			dGet('wtw_tmoldtexturebumpgid').value = molds[moldind].graphics.heightmap.texturebumpgid;
			dGet('wtw_tmoldtexturebumpgpath').value = molds[moldind].graphics.heightmap.texturebumpgpath;
			dGet('wtw_tmoldtexturebumpbid').value = molds[moldind].graphics.heightmap.texturebumpbid;
			dGet('wtw_tmoldtexturebumpbpath').value = molds[moldind].graphics.heightmap.texturebumpbpath;
			dGet('wtw_tmoldsoundid').value = molds[moldind].sound.id;
			dGet('wtw_tmoldsoundpath').value = molds[moldind].sound.path;
			dGet('wtw_tmoldsoundname').value = molds[moldind].sound.name;
			dGet('wtw_soundicon').alt = molds[moldind].sound.name;
			dGet('wtw_soundicon').title = molds[moldind].sound.name;
			dGet('wtw_selectedsound').innerHTML = molds[moldind].sound.name;
			WTW.setDDLValue("wtw_tmoldsoundattenuation", molds[moldind].sound.attenuation);
			WTW.setSoundFields();
			if (molds[moldind].sound.loop == '1') {
				dGet('wtw_tmoldsoundloop').checked = true;
				dGet('wtw_tmoldvideoloop').checked = true;
			} else {
				dGet('wtw_tmoldsoundloop').checked = false;
				dGet('wtw_tmoldvideoloop').checked = false;
			}
			dGet('wtw_tmoldvideomaxdistance').value = molds[moldind].sound.maxdistance;
			dGet('wtw_tmoldsoundmaxdistance').value = molds[moldind].sound.maxdistance;
			dGet('wtw_tmoldsoundrollofffactor').value = molds[moldind].sound.rollofffactor;
			dGet('wtw_tmoldsoundrefdistance').value = molds[moldind].sound.refdistance;
			dGet('wtw_tmoldsoundconeinnerangle').value = molds[moldind].sound.coneinnerangle;
			dGet('wtw_tmoldsoundconeouterangle').value = molds[moldind].sound.coneouterangle;
			dGet('wtw_tmoldsoundconeoutergain').value = molds[moldind].sound.coneoutergain;
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
			if (shape == "3dtext") {
				dGet('wtw_tmoldwebtext').value = molds[moldind].webtext.webtext;
				dGet('wtw_tmoldwebstyle').value = molds[moldind].webtext.webstyle;
				var webstyle = dGet('wtw_tmoldwebstyle').value;
				var webtextalign = 'center';
				var webtextheight = 6;
				var webtextthick = 1;
				var webtextcolor = '#ff0000';
				var webtextdiffuse = '#f0f0f0';
				var webtextspecular = '#000000';
				var webtextambient = '#808080';
				if (webstyle.indexOf(',') > -1) {
					while (webstyle.indexOf('"') > -1) {
						webstyle = webstyle.replace('"','');
					}
					while (webstyle.indexOf('}') > -1) {
						webstyle = webstyle.replace('}','');
					}
					while (webstyle.indexOf('{') > -1) {
						webstyle = webstyle.replace('{','');
					}
					webstyle = webstyle.replace('colors:diffuse','diffuse');
					var styles = webstyle.split(',');
					for (var i=0;i<styles.length;i++) {
						if (styles[i].indexOf(':') > -1) {
							style = styles[i].split(':');
							switch (style[0]) {
								case 'anchor':
									webtextalign = style[1];
									break;
								case 'letter-height':
									webtextheight = Number(style[1]).toFixed(2);
									break;
								case 'letter-thickness':
									webtextthick = Number(style[1]).toFixed(2);
									break;
								case 'color':
									webtextcolor = style[1];
									break;
								case 'diffuse':
									webtextdiffuse = style[1];
									break;
								case 'specular':
									webtextspecular = style[1];
									break;
								case 'ambient':
									webtextambient = style[1];
									break;
							}
						}
					}
				}
				WTW.setDDLValue("wtw_tmoldwebtextalign", webtextalign);
				dGet('wtw_tmoldwebtextheight').value = webtextheight;
				dGet('wtw_tmoldwebtextthick').value = webtextthick;
				dGet('wtw_tmoldwebtextcolor').value = webtextcolor;
				dGet('wtw_tmoldwebtextdiffuse').value = webtextdiffuse;
				dGet('wtw_tmoldwebtextspecular').value = webtextspecular;
				dGet('wtw_tmoldwebtextambient').value = webtextambient;
			}
			dGet('wtw_tmoldimageind').value = "-1";
			if (shape == "image" && molds[moldind].graphics.webimages[0] != undefined) {
				dGet('wtw_tmoldimageind').value = "0";
				var imageid = "t1qlqxd6pzubzzzy";
				var imagehoverid = "t1qlqxd6pzubzzzy";
				var imageclickid = "t1qlqxd6pzubzzzy";
				if (molds[moldind].graphics.webimages[0].imageid != "") {
					imageid = molds[moldind].graphics.webimages[0].imageid;
				}
				if (molds[moldind].graphics.webimages[0].imagehoverid != "") {
					imagehoverid = molds[moldind].graphics.webimages[0].imagehoverid;
				}
				if (molds[moldind].graphics.webimages[0].imageclickid != "") {
					imageclickid = molds[moldind].graphics.webimages[0].imageclickid;
				}
				dGet('wtw_tmoldimagejsfunction').value = molds[moldind].graphics.webimages[0].jsfunction;
				dGet('wtw_tmoldimagejsparameters').value = molds[moldind].graphics.webimages[0].jsparameters;
				dGet('wtw_tmoldaddimageid').value = imageid;
				dGet('wtw_tmoldaddimagehoverid').value = imagehoverid;				
				dGet('wtw_tmoldaddimageclickid').value = imageclickid;	
				if (dGet('wtw_tmoldaddimageid').value != "") {
					WTW.getJSON("/connect/upload.php?uploadid=" + dGet('wtw_tmoldaddimageid').value, 
						function(response) {
							WTW.loadUpload(JSON.parse(response),dGet('wtw_tmoldaddimageid').value,0);
							var imageinfo = WTW.getUploadFileData(dGet('wtw_tmoldaddimageid').value);
							imageinfo.image.onload = function() {	
								dGet('wtw_moldaddimagepreview').src = imageinfo.filedata;
							}
						}
					);
				}
				if (dGet('wtw_tmoldaddimagehoverid').value != "") {
					WTW.getJSON("/connect/upload.php?uploadid=" + dGet('wtw_tmoldaddimagehoverid').value, 
						function(response) {
							WTW.loadUpload(JSON.parse(response),dGet('wtw_tmoldaddimagehoverid').value,0);
							var imageinfo = WTW.getUploadFileData(dGet('wtw_tmoldaddimagehoverid').value);
							imageinfo.image.onload = function() {	
								dGet('wtw_moldaddimagehoverpreview').src = imageinfo.filedata;
							}
						}
					);
				}
				if (molds[moldind].graphics.webimages[0].jsfunction == "WTW.openWebpage") {
					dGet("wtw_tmoldaddonclick").selectedIndex = 2;
				} else if (molds[moldind].graphics.webimages[0].jsfunction == "WTW.openIFrame") {
					dGet("wtw_tmoldaddonclick").selectedIndex = 1;
				} else if (molds[moldind].graphics.webimages[0].jsfunction != "") {
					dGet("wtw_tmoldaddonclick").selectedIndex = 3;
				} else {
					dGet("wtw_tmoldaddonclick").selectedIndex = 0;
				}
				WTW.changeOnClickEvent(dGet("wtw_tmoldaddonclick"));
			} else if (shape == "image") {
				dGet('wtw_tmoldimageind').value = "0";
			} else if (shape == "tube") {
				WTW.loadPointList(molds[moldind].paths.path1, 1);
			} else if (shape == "line") {
				WTW.loadPointList(molds[moldind].paths.path1, 1);
			}	 
			for (var i=0;i < WTW.moldList.length;i++) {
				if (WTW.moldList[i] != null) {
					var moldvalue = WTW.moldList[i].toLowerCase();
					while (moldvalue.indexOf(" ") > -1) {
						moldvalue = moldvalue.replace(" ","");
					}
					if (shape == moldvalue) {
						WTW.checkMoldTextureCSG();
					}
				}
			}
			dGet('wtw_selectedcsgshape').innerHTML = "";
			if (dGet('wtw_tmoldcsgaction').selectedIndex != 0) {
				var csgmoldind = -1;
				csgmoldind = WTW.getMoldInd(molds, molds[moldind].csg.moldid, dGet('wtw_tconnectinggridind').value);
				if (molds[csgmoldind] != null) {
					var csgmainname = molds[csgmoldind].moldname;
					dGet('wtw_selectedcsgshape').innerHTML += "<div class='wtw-secondcolcontent' onmouseover=\"WTW.hilightMold('" + csgmainname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + csgmainname + "');\">Merge with (" + molds[csgmoldind].shape + ") &nbsp;&nbsp;&nbsp;&nbsp; <a href='#' onclick=\"WTW.removeMerge('" + csgmainname + "')\">Remove</a></div><br /><br />";
				}
			}
			var mold = scene.getMeshByID(molds[moldind].moldname);
			if (mold != null) {
				WTW.openEditPoles(mold);
			}
			WTW.pluginsOpenMoldForm(molds[moldind].moldname);
		}
		dGet('wtw_tmoldpositionz').focus();
		WTW.setWindowSize();
		WTW.setNewMold(1);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-openMoldForm=" + ex.message);
	}
}		

WTWJS.prototype.loadMoldForm = function(molddef) {
	/* after mold form is opened, this function loads the existing information to edit the mold */
	try {
		var moldgroup = "";
		var shape = molddef.shape;
		if (molddef.moldname.indexOf("communitymolds") > -1) {
			moldgroup = "community";
		} else if (molddef.moldname.indexOf("buildingmolds") > -1) {
			moldgroup = "building";
		} else if (molddef.moldname.indexOf("thingmolds") > -1) {
			moldgroup = "thing";
		}
		switch (moldgroup) {
			case "community":
				dGet('wtw_tcommunityind').value = molddef.communityinfo.communityind;
				break;
			case "building":
				dGet('wtw_teditbuildingind').value = molddef.buildinginfo.buildingind;
				break;
			case "thing":
				dGet('wtw_tthingind').value = molddef.thinginfo.thingind;
				break;
		}
		WTW.getCoveringList(shape);
		WTW.getLoadActionZoneList(molddef.loadactionzoneid);
		WTW.getLoadZoneList(molddef.loadactionzoneid);
		dGet('wtw_tmoldid').value = molddef.moldid;
		dGet('wtw_tmoldind').value = molddef.moldind;
		dGet('wtw_tmoldshape').value = molddef.shape;
		dGet('wtw_tmoldmoldgroup').value = moldgroup;
		dGet('wtw_tmoldname').value = molddef.moldname;
		dGet('wtw_teditpointindex').value = "";
		dGet('wtw_tmoldpath1points').value = "";
		dGet('wtw_tmoldpath2points').value = "";
		dGet('wtw_tmoldcoveringold').value = molddef.covering;
		dGet('wtw_tmoldpositionx').value = molddef.position.x;
		dGet('wtw_tmoldpositiony').value = molddef.position.y;
		dGet('wtw_tmoldpositionz').value = molddef.position.z;
		dGet('wtw_tmoldscalingx').value = molddef.scaling.x;
		dGet('wtw_tmoldscalingy').value = molddef.scaling.y;
		dGet('wtw_tmoldscalingz').value = molddef.scaling.z;
		dGet('wtw_tmoldrotationx').value = molddef.rotation.x;
		dGet('wtw_tmoldrotationy').value = molddef.rotation.y;
		dGet('wtw_tmoldrotationz').value = molddef.rotation.z;
		dGet('wtw_tmoldspecial1').value = molddef.scaling.special1;
		dGet('wtw_tmoldspecial2').value = molddef.scaling.special2;
		dGet('wtw_tmolduploadobjectid').value = molddef.object.uploadobjectid;
		dGet('wtw_tmoldobjectfolder').value = molddef.object.folder;
		dGet('wtw_tmoldobjectfile').value = molddef.object.file;
		if (molddef.graphics.receiveshadows == '1') {
			dGet('wtw_tmoldreceiveshadows').checked = true;
		} else {
			dGet('wtw_tmoldreceiveshadows').checked = false;
		}
		if (molddef.graphics.level == '1') {
			dGet('wtw_tmoldgraphiclevel').checked = true;
		} else {
			dGet('wtw_tmoldgraphiclevel').checked = false;
		}
		dGet('wtw_tmoldtextureid').value = molddef.graphics.texture.id;
		dGet('wtw_tmoldtexturepath').value = molddef.graphics.texture.path;
		dGet('wtw_tmoldtexturebumpid').value = molddef.graphics.texture.bumpid;
		dGet('wtw_tmoldtexturebumppath').value = molddef.graphics.texture.bumppath;
		dGet('wtw_tmoldvideoid').value = molddef.graphics.texture.videoid;
		dGet('wtw_tmoldvideopath').value = molddef.graphics.texture.video;
		dGet('wtw_tmoldvideoposterid').value = molddef.graphics.texture.videoposterid;
		dGet('wtw_tmoldvideoposterpath').value = molddef.graphics.texture.videoposter;
		dGet('wtw_tmoldheightmapid').value = molddef.graphics.heightmap.id;
		dGet('wtw_tmoldheightmappath').value = molddef.graphics.heightmap.path;
		dGet('wtw_tmoldmixmapid').value = molddef.graphics.heightmap.mixmapid;
		dGet('wtw_tmoldmixmappath').value = molddef.graphics.heightmap.mixmappath;
		dGet('wtw_tmoldtexturerid').value = molddef.graphics.heightmap.texturerid;
		dGet('wtw_tmoldtexturerpath').value = molddef.graphics.heightmap.texturerpath;
		dGet('wtw_tmoldtexturegid').value = molddef.graphics.heightmap.texturegid;
		dGet('wtw_tmoldtexturegpath').value = molddef.graphics.heightmap.texturegpath;
		dGet('wtw_tmoldtexturebid').value = molddef.graphics.heightmap.texturebid;
		dGet('wtw_tmoldtexturebpath').value = molddef.graphics.heightmap.texturebpath;
		dGet('wtw_tmoldtexturebumprid').value = molddef.graphics.heightmap.texturebumprid;
		dGet('wtw_tmoldtexturebumprpath').value = molddef.graphics.heightmap.texturebumprpath;
		dGet('wtw_tmoldtexturebumpgid').value = molddef.graphics.heightmap.texturebumpgid;
		dGet('wtw_tmoldtexturebumpgpath').value = molddef.graphics.heightmap.texturebumpgpath;
		dGet('wtw_tmoldtexturebumpbid').value = molddef.graphics.heightmap.texturebumpbid;
		dGet('wtw_tmoldtexturebumpbpath').value = molddef.graphics.heightmap.texturebumpbpath;
		dGet('wtw_tmoldsoundid').value = molddef.sound.id;
		dGet('wtw_tmoldsoundpath').value = molddef.sound.path;
		dGet('wtw_tmoldsoundname').value = molddef.sound.name;
		dGet('wtw_soundicon').alt = molddef.sound.name;
		dGet('wtw_soundicon').title = molddef.sound.name;
		dGet('wtw_selectedsound').innerHTML = molddef.sound.name;
		WTW.setDDLValue("wtw_tmoldsoundattenuation", molddef.sound.attenuation);
		if (molddef.sound.loop == '1') {
			dGet('wtw_tmoldsoundloop').checked = true;
			dGet('wtw_tmoldvideoloop').checked = true;
		} else {
			dGet('wtw_tmoldsoundloop').checked = false;
			dGet('wtw_tmoldvideoloop').checked = false;
		}
		dGet('wtw_tmoldsoundmaxdistance').value = molddef.sound.maxdistance;
		dGet('wtw_tmoldvideomaxdistance').value = molddef.sound.maxdistance;
		dGet('wtw_tmoldsoundrollofffactor').value = molddef.sound.rollofffactor;
		dGet('wtw_tmoldsoundrefdistance').value = molddef.sound.refdistance;
		dGet('wtw_tmoldsoundconeinnerangle').value = molddef.sound.coneinnerangle;
		dGet('wtw_tmoldsoundconeouterangle').value = molddef.sound.coneouterangle;
		dGet('wtw_tmoldsoundconeoutergain').value = molddef.sound.coneoutergain;
		dGet('wtw_tmoldmaxheight').value = molddef.graphics.heightmap.maxheight;
		dGet('wtw_tmolduoffset').value = molddef.graphics.uoffset;
		dGet('wtw_tmoldvoffset').value = molddef.graphics.voffset;
		dGet('wtw_tmolduscale').value = molddef.graphics.uscale;
		dGet('wtw_tmoldvscale').value = molddef.graphics.vscale;
		dGet('wtw_tmoldopacity').value = molddef.opacity;
		dGet('wtw_tmoldsubdivisions').value = molddef.subdivisions;
		dGet('wtw_tmoldactionzoneid').value = molddef.actionzoneid;
		dGet('wtw_tmoldcsgmoldid').value = molddef.csg.moldid;
		if (dGet('wtw_tmoldshape').value == '3dtext') {
			dGet('wtw_tmoldwebtext').value = WTW.decode(molddef.webtext.webtext);
		} else {
			dGet('wtw_tmoldwebtext').value = '';
		}
		dGet('wtw_tmoldwebstyle').value = molddef.webtext.webstyle;
		dGet('wtw_tmoldalttag').value = WTW.decode(molddef.alttag.name);
		dGet('wtw_tspecularcolorr').value = molddef.color.specular.r;
		dGet('wtw_tspecularcolorg').value = molddef.color.specular.g;
		dGet('wtw_tspecularcolorb').value = molddef.color.specular.b;
		dGet('wtw_temissivecolorr').value = molddef.color.emissive.r;
		dGet('wtw_temissivecolorg').value = molddef.color.emissive.g;
		dGet('wtw_temissivecolorb').value = molddef.color.emissive.b;
		dGet('wtw_tdiffusecolorr').value = molddef.color.diffuse.r;
		dGet('wtw_tdiffusecolorg').value = molddef.color.diffuse.g;
		dGet('wtw_tdiffusecolorb').value = molddef.color.diffuse.b;
		dGet('wtw_moldaddimagepreview').src = "";
		dGet('wtw_moldaddimagehoverpreview').src = "";
		dGet('wtw_pointlist1').innerHTML = "";
		dGet('wtw_pointlist2').innerHTML = "";
		WTW.setDDLValue("wtw_tmoldcovering", molddef.covering);
		WTW.setDDLValue("wtw_tmoldcsgaction", molddef.csg.action);
		WTW.setDDLValue("wtw_tmoldloadactionzoneid", molddef.loadactionzoneid);
		if (molddef.graphics.waterreflection == "1") {
			dGet('wtw_tmoldwaterreflection').checked = true;
		} else {
			dGet('wtw_tmoldwaterreflection').checked = false;
		}
		if (dGet('wtw_tmoldcsgmoldid').value != "") {
			dGet('wtw_bselectcsgshape').innerHTML = "Change Shape to Merge";
		} else {
			dGet('wtw_bselectcsgshape').innerHTML = "Pick Shape to Merge";
			WTW.setDDLValue("wtw_tmoldcsgaction", "");
		}
		WTW.pluginsLoadMoldForm(moldgroup, dGet('wtw_tmoldshape').value, dGet('wtw_tmoldname').value);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-loadMoldForm=" + ex.message);
	}
}

WTWJS.prototype.loadPointList = function(patharray, pathnumber) {
	/* some molds use points (like lines, ribons, and tubes) */
	/* this functions loads the points for a given mold form for editing */
	try {
		var pointlist = "wtw_pointlist1";
		var pathpoints = "wtw_tmoldpath1points";
		var pathname = "Path 1";
		var pointind = -1;
		if (WTW.isNumeric(dGet('wtw_teditpointindex').value)) {
			pointind = Number(dGet('wtw_teditpointindex').value);
		}
		if (pathnumber == 2) {
			pointlist = "wtw_pointlist2";
			pathpoints = "wtw_tmoldpath2points";
			pathname = "Path 2";
		}
		dGet(pointlist).innerHTML = "<hr /><h4>" + pathname + " Points (x,y,z)</h4><div id=\"wtw_bpointadd-\" class=\"wtw-menulevel00 wtw-center\" onmousedown=\"WTW.addPoint(this);\" >Add Point</div>";
		if (patharray != null) {
			if (patharray.length > 0) {
				for (var i=0; i < patharray.length;i++) {
					if (patharray[i] != null) {
						if (pointind == i) {
							dGet(pointlist).innerHTML += "<div id=\"wtw_bpointedit-" + i + "\" class=\"wtw-menulevel0selected wtw-center\" onmousedown=\"WTW.editPoint(this);\"><span style='font-size:.8em;color:#c0c0c0;'>(" + patharray[i].x + ", " + patharray[i].y + ", " + patharray[i].z + ")</span> Edit</div>";
						} else {
							dGet(pointlist).innerHTML += "<div id=\"wtw_bpointedit-" + i + "\" class=\"wtw-menulevel0 wtw-center\" onmousedown=\"WTW.editPoint(this);\"><span style='font-size:.8em;color:#c0c0c0;'>(" + patharray[i].x + ", " + patharray[i].y + ", " + patharray[i].z + ")</span> Edit</div>";
						}
						dGet(pointlist).innerHTML += "<div id=\"wtw_bpointadd-" + i + "\" class=\"wtw-menulevel00 wtw-center\" onmousedown=\"WTW.addPoint(this);\" >Add Point</div>";
					}
				}
			}
			dGet(pathpoints).value = JSON.stringify(patharray);
		} else {
			dGet(pathpoints).value = "";
		}
		dGet(pointlist).innerHTML += "<hr /><br />";
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-loadPointList=" + ex.message);
	}
}

WTWJS.prototype.deletePoint = function() {
	/* delete a point from a mold (lines, ribbons, and tubes) */
	try {
		var pointind = -1;
		var moldind = -1;
		var molds = null;
		switch (dGet('wtw_tmoldmoldgroup').value) {
			case "community":
				molds = WTW.communitiesMolds;
				break;
			case "building":
				molds = WTW.buildingMolds;
				break;
			case "thing":
				molds = WTW.thingMolds;
				break;
		}
		if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
			moldind = Number(dGet('wtw_tmoldind').value);
		}
		if (WTW.isNumeric(dGet('wtw_teditpointindex').value)) {
			pointind = Number(dGet('wtw_teditpointindex').value);
		}
		if (molds[moldind] != null && pointind > -1) {
			if (molds[moldind].paths.path1 != null) {
				if (molds[moldind].paths.path1[pointind] != null) {
					molds[moldind].paths.path1.splice(pointind, 1);
				}
				for (var i=0; i < molds[moldind].paths.path1.length;i++) {
					if (molds[moldind].paths.path1[i] != null) {
						molds[moldind].paths.path1[i].sorder = i;
					}
				}
			}
		}
		dGet('wtw_teditpointindex').value = "";
		WTW.setNewMold();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-deletePoint=" + ex.message);
	}
}

WTWJS.prototype.editPoint = function(obj) {
	/* edit an existing point for a mold (lines, ribbons, and tubes) */
	try {
		dGet('wtw_tpointpositionx').value = "";
		dGet('wtw_tpointpositiony').value = "";
		dGet('wtw_tpointpositionz').value = "";
		var moldind = -1;
		var molds = null;
		switch (dGet('wtw_tmoldmoldgroup').value) {
			case "community":
				molds = WTW.communitiesMolds;
				break;
			case "building":
				molds = WTW.buildingMolds;
				break;
			case "thing":
				molds = WTW.thingMolds;
				break;
		}
		if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
			moldind = Number(dGet('wtw_tmoldind').value);
		}
		if (obj != null && molds != null) {
			if (obj.id.indexOf('-') > -1 && molds[moldind] != null) {
				var namepart = obj.id.split('-');
				if (namepart[1] != null) {
					dGet('wtw_teditpointindex').value = namepart[1];
					var pointind = -1;
					if (WTW.isNumeric(namepart[1])) {
						pointind = Number(namepart[1]);
					}
					if (molds[moldind].paths.path1[pointind] != null) {
						dGet('wtw_tpointpositionx').value = molds[moldind].paths.path1[pointind].x;
						dGet('wtw_tpointpositiony').value = molds[moldind].paths.path1[pointind].y;
						dGet('wtw_tpointpositionz').value = molds[moldind].paths.path1[pointind].z;
						
						WTW.show('wtw_pointeditdiv');
					}
				}
			}
		} 
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-editPoint=" + ex.message);
	}
}

WTWJS.prototype.addPoint = function(obj) {
	/* add a new point for a mold (lines, ribbons, and tubes) */
	try {
		var moldind = -1;
		var molds = null;
		switch (dGet('wtw_tmoldmoldgroup').value) {
			case "community":
				molds = WTW.communitiesMolds;
				break;
			case "building":
				molds = WTW.buildingMolds;
				break;
			case "thing":
				molds = WTW.thingMolds;
				break;
		}
		if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
			moldind = Number(dGet('wtw_tmoldind').value);
		}
		if (obj != null && molds != null) {
			if (obj.id.indexOf('-') > -1 && molds[moldind] != null) {
				var pointind = -1;
				var namepart = obj.id.split('-');
				if (namepart[1] != null) {
					if (WTW.isNumeric(namepart[1])) {
						pointind = Number(namepart[1]);
					}
				}
				if (molds[moldind].paths.path1 != null) {
					var x = null;
					var y = null;
					var z = null;
					var x1 = null;
					var y1 = null;
					var z1 = null;
					var minx = null;
					var miny = null;
					var minz = null;
					var maxx = null;
					var maxy = null;
					var maxz = null;
					var newx = null;
					var newy = null;
					var newz = null;
					var maxind = molds[moldind].paths.path1.length - 1;
					for (var i = molds[moldind].paths.path1.length - 1 ; i >= 0 ; i--) {
						if (molds[moldind].paths.path1[i] != null) {
							if (i == 0 && minx == null) {
								minx = Number(molds[moldind].paths.path1[i].x);
								miny = Number(molds[moldind].paths.path1[i].y);
								minz = Number(molds[moldind].paths.path1[i].z);
							}
							if (i == molds[moldind].paths.path1.length - 1 && maxx == null) {
								maxx = Number(molds[moldind].paths.path1[i].x);
								maxy = Number(molds[moldind].paths.path1[i].y);
								maxz = Number(molds[moldind].paths.path1[i].z);
							}
							if (i == pointind) {
								x = Number(molds[moldind].paths.path1[i].x);
								y = Number(molds[moldind].paths.path1[i].y);
								z = Number(molds[moldind].paths.path1[i].z);
								molds[moldind].paths.path1[i + 1] = JSON.parse(JSON.stringify(molds[moldind].paths.path1[i]));
								molds[moldind].paths.path1[i + 1].sorder = i + 1;
							} else if (i > pointind) {
								if (i == pointind + 1) {
									x1 = Number(molds[moldind].paths.path1[i].x);
									y1 = Number(molds[moldind].paths.path1[i].y);
									z1 = Number(molds[moldind].paths.path1[i].z);
								}
								molds[moldind].paths.path1[i + 1] = JSON.parse(JSON.stringify(molds[moldind].paths.path1[i]));
								molds[moldind].paths.path1[i + 1].sorder = i + 1;
							}
						}
					}
					if (pointind == -1) {
						newx = minx;
						newy = miny;
						newz = minz;
					} else if (pointind == maxind) {
						newx = maxx;
						newy = maxy;
						newz = maxz;
					} else {
						if (x != null && x1 != null) {
							newx = (x + x1) / 2;
							newy = (y + y1) / 2;
							newz = (z + z1) / 2;
						} else if (x != null) {
							newx = x;
							newy = y;
							newz = z;
						} else if (x1 != null) {
							newx = x1;
							newy = y1;
							newz = z1;
						} else {
							var coords = WTW.getNewCoordinates(50);
							newx = coords.positionX;
							newy = coords.positionY;
							newz = coords.positionZ;
						}
					}
					pointind += 1;
					molds[moldind].paths.path1[pointind].x = newx;
					molds[moldind].paths.path1[pointind].y = newy;
					molds[moldind].paths.path1[pointind].z = newz;
					molds[moldind].paths.path1[pointind].sorder = pointind;
				} else {
					pointind = 0;
					var coords = WTW.getNewCoordinates(50);
					newx = coords.positionX;
					newy = coords.positionY;
					newz = coords.positionZ;
					molds[moldind].paths.path1[0] = WTW.newPathPoint();
					molds[moldind].paths.path1[0].x = newx;
					molds[moldind].paths.path1[0].y = newy;
					molds[moldind].paths.path1[0].z = newz;
					molds[moldind].paths.path1[0].sorder = 0;
				}
				dGet('wtw_teditpointindex').value = pointind;
				if (molds[moldind].paths.path1[pointind] != null) {
					dGet('wtw_tpointpositionx').value = molds[moldind].paths.path1[pointind].x;
					dGet('wtw_tpointpositiony').value = molds[moldind].paths.path1[pointind].y;
					dGet('wtw_tpointpositionz').value = molds[moldind].paths.path1[pointind].z;
					WTW.show('wtw_pointeditdiv');
				}
				
			}
		} 
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-addPoint=" + ex.message);
	}
}

WTWJS.prototype.editEndPoint = function() {
	/* edit end point for a mold (lines, ribbons, and tubes) */
	try {
		dGet('wtw_teditpointindex').value = "";
		WTW.hide('wtw_pointeditdiv');
		dGet('wtw_tpointpositionx').value = "";
		dGet('wtw_tpointpositiony').value = "";
		dGet('wtw_tpointpositionz').value = "";
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-editEndPoint=" + ex.message);
	}
}

WTWJS.prototype.openAddNewMold = function(moldgroup, shape) {
	/* open add new mold will create a new mold and open the form using the default values for that type of mold */
	try {
		dGet('wtw_tnewmold').value = "1";
		WTW.setMoldFormFields(shape);
		WTW.getCoveringList(shape);
		var moldind = -1;
		var molds = WTW.buildingMolds;
		switch (moldgroup) {
			case "community":
			    moldind = WTW.getNextCount(WTW.communitiesMolds);
				molds = WTW.communitiesMolds;
				molds[moldind] = WTW.newMold();
				dGet('wtw_tthingind').value = "-1";
				dGet('wtw_tcommunityind').value= WTW.getCommunityInd(communityid);
				molds[moldind].communityinfo.communityid = communityid;
				molds[moldind].communityinfo.communityind = dGet('wtw_tcommunityind').value;
				break;
			case "thing":
			    moldind = WTW.getNextCount(WTW.thingMolds);
				molds = WTW.thingMolds;
				molds[moldind] = WTW.newMold();
				dGet('wtw_tthingind').value = WTW.getThingInd(thingid);
				dGet('wtw_tcommunityind').value= "-1";
				molds[moldind].thinginfo.thingid = thingid;
				molds[moldind].thinginfo.thingind = dGet('wtw_tthingind').value;
				break;
			default:
			    moldind = WTW.getNextCount(WTW.buildingMolds);
				molds = WTW.buildingMolds;
				molds[moldind] = WTW.newMold();
				dGet('wtw_tthingind').value = "-1";
				dGet('wtw_tcommunityind').value= "-1";
				molds[moldind].buildinginfo.buildingid = buildingid;
				molds[moldind].buildinginfo.buildingind = WTW.getBuildingInd(buildingid);
				break;
		}
		var loadactionzoneid = WTW.getLoadActionZoneID("normal");
		WTW.getLoadZoneList(loadactionzoneid);
		var moldid = WTW.getRandomString(16);
		molds[moldind].moldid = moldid;
		dGet('wtw_tmoldmoldgroup').value = moldgroup;
		dGet('wtw_tmoldshape').value = shape;
		dGet('wtw_tmoldind').value = moldind.toString();
		dGet('wtw_tmoldid').value = moldid.toString();
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
		WTW.show('wtw_moldbasictextureset2div');
		molds[moldind].graphics.waterreflection = "0";
		var mold = null;
		WTW.setNewMoldDefaults(shape);
		var coveringname = dGet('wtw_tmoldcoveringold').value;
		molds[moldind].shape = shape;
		molds[moldind].covering = coveringname;
		molds[moldind].position.x = dGet('wtw_tmoldpositionx').value;
		molds[moldind].position.y = dGet('wtw_tmoldpositiony').value;
		molds[moldind].position.z = dGet('wtw_tmoldpositionz').value;
		molds[moldind].scaling.x = dGet('wtw_tmoldscalingx').value;
		molds[moldind].scaling.y = dGet('wtw_tmoldscalingy').value;
		molds[moldind].scaling.z = dGet('wtw_tmoldscalingz').value;
		molds[moldind].rotation.x = dGet('wtw_tmoldrotationx').value;
		molds[moldind].rotation.y = dGet('wtw_tmoldrotationy').value;
		molds[moldind].rotation.z = dGet('wtw_tmoldrotationz').value;
		molds[moldind].scaling.special1 = dGet('wtw_tmoldspecial1').value;
		molds[moldind].scaling.special2 = dGet('wtw_tmoldspecial2').value;
		molds[moldind].graphics.uoffset = dGet('wtw_tmolduoffset').value;
		molds[moldind].graphics.voffset = dGet('wtw_tmoldvoffset').value;
		molds[moldind].graphics.uscale = dGet('wtw_tmolduscale').value;
		molds[moldind].graphics.vscale = dGet('wtw_tmoldvscale').value;
		molds[moldind].opacity = dGet('wtw_tmoldopacity').value;
		molds[moldind].subdivisions = dGet('wtw_tmoldsubdivisions').value;
		molds[moldind].object.uploadobjectid = dGet('wtw_tmolduploadobjectid').value;
		molds[moldind].object.folder = dGet('wtw_tmoldobjectfolder').value;
		molds[moldind].object.file = dGet('wtw_tmoldobjectfile').value;
		molds[moldind].graphics.texture.backupid = "";
		if (dGet('wtw_tmoldreceiveshadows').checked == true) {
			molds[moldind].graphics.receiveshadows = '1';
		} else {
			molds[moldind].graphics.receiveshadows = '0';
		}
		if (dGet('wtw_tmoldgraphiclevel').checked == true) {
			molds[moldind].graphics.level = '1';
		} else {
			molds[moldind].graphics.level = '0';
		}
		molds[moldind].graphics.texture.id = dGet('wtw_tmoldtextureid').value;
		molds[moldind].graphics.texture.path = dGet('wtw_tmoldtexturepath').value;
		molds[moldind].graphics.texture.bumpid = dGet('wtw_tmoldtexturebumpid').value;
		molds[moldind].graphics.texture.bumppath = dGet('wtw_tmoldtexturebumppath').value;
		molds[moldind].graphics.texture.videoid = dGet('wtw_tmoldvideoid').value;
		molds[moldind].graphics.texture.videoposterid = dGet('wtw_tmoldvideoposterid').value;
		molds[moldind].graphics.heightmap.id = dGet('wtw_tmoldheightmapid').value;
		molds[moldind].graphics.heightmap.path = dGet('wtw_tmoldheightmappath').value;
		molds[moldind].graphics.heightmap.mixmapid = dGet('wtw_tmoldmixmapid').value;
		molds[moldind].graphics.heightmap.mixmappath = dGet('wtw_tmoldmixmappath').value;
		molds[moldind].graphics.heightmap.texturerid = dGet('wtw_tmoldtexturerid').value;
		molds[moldind].graphics.heightmap.texturerpath = dGet('wtw_tmoldtexturerpath').value;
		molds[moldind].graphics.heightmap.texturegid = dGet('wtw_tmoldtexturegid').value;
		molds[moldind].graphics.heightmap.texturegpath = dGet('wtw_tmoldtexturegpath').value;
		molds[moldind].graphics.heightmap.texturebid = dGet('wtw_tmoldtexturebid').value;
		molds[moldind].graphics.heightmap.texturebpath = dGet('wtw_tmoldtexturebpath').value;
		molds[moldind].graphics.heightmap.texturebumprid = dGet('wtw_tmoldtexturebumprid').value;
		molds[moldind].graphics.heightmap.texturebumprpath = dGet('wtw_tmoldtexturebumprpath').value;
		molds[moldind].graphics.heightmap.texturebumpgid = dGet('wtw_tmoldtexturebumpgid').value;
		molds[moldind].graphics.heightmap.texturebumpgpath = dGet('wtw_tmoldtexturebumpgpath').value;
		molds[moldind].graphics.heightmap.texturebumpbid = dGet('wtw_tmoldtexturebumpbid').value;
		molds[moldind].graphics.heightmap.texturebumpbpath = dGet('wtw_tmoldtexturebumpbpath').value;
		molds[moldind].sound.id = dGet('wtw_tmoldsoundid').value;
		molds[moldind].sound.path = dGet('wtw_tmoldsoundpath').value;
		molds[moldind].sound.name = dGet('wtw_tmoldsoundname').value;
		var soundattenuation = "none";
		if (dGet('wtw_tmoldsoundattenuation').selectedIndex > -1) {
			soundattenuation = dGet('wtw_tmoldsoundattenuation').options[dGet('wtw_tmoldsoundattenuation').selectedIndex].value;
		}
		molds[moldind].sound.attenuation = soundattenuation;
		if (dGet('wtw_tmoldsoundloop').checked == true) {
			molds[moldind].sound.loop = '1';
		} else {
			molds[moldind].sound.loop = '0';
		}
		molds[moldind].sound.maxdistance = dGet('wtw_tmoldsoundmaxdistance').value;
		molds[moldind].sound.rollofffactor = dGet('wtw_tmoldsoundrollofffactor').value;
		molds[moldind].sound.refdistance = dGet('wtw_tmoldsoundrefdistance').value;
		molds[moldind].sound.coneinnerangle = dGet('wtw_tmoldsoundconeinnerangle').value;
		molds[moldind].sound.coneouterangle = dGet('wtw_tmoldsoundconeouterangle').value;
		molds[moldind].sound.coneoutergain = dGet('wtw_tmoldsoundconeoutergain').value;
		molds[moldind].graphics.heightmap.maxheight = dGet('wtw_tmoldmaxheight').value;
		molds[moldind].color.specular.r = dGet('wtw_tspecularcolorr').value;
		molds[moldind].color.specular.g = dGet('wtw_tspecularcolorg').value;
		molds[moldind].color.specular.b = dGet('wtw_tspecularcolorb').value;
		molds[moldind].color.emissive.r = dGet('wtw_temissivecolorr').value;
		molds[moldind].color.emissive.g = dGet('wtw_temissivecolorg').value;
		molds[moldind].color.emissive.b = dGet('wtw_temissivecolorb').value;
		molds[moldind].color.diffuse.r = dGet('wtw_tdiffusecolorr').value;
		molds[moldind].color.diffuse.g = dGet('wtw_tdiffusecolorg').value;
		molds[moldind].color.diffuse.b = dGet('wtw_tdiffusecolorb').value;
		molds[moldind].moldname = moldgroup + "molds-" + moldind.toString() + "-" + moldid + "-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "-" + shape;
		molds[moldind].connectinggridid = dGet('wtw_tconnectinggridid').value;
		molds[moldind].connectinggridind = dGet('wtw_tconnectinggridind').value;
		molds[moldind].parentname = dGet('wtw_tconnectinggridname').value;
		molds[moldind].loadactionzoneid = loadactionzoneid;
		molds[moldind].loadactionzoneind = WTW.getActionZoneInd(loadactionzoneid, Number(dGet('wtw_tconnectinggridind').value));
		WTW.setDDLValue('wtw_tmoldcovering', coveringname);
		mold = WTW.addMold(molds[moldind].moldname, molds[moldind], molds[moldind].parentname, coveringname);
		mold.isPickable = true;
		WTW.setCoveringFormFields(coveringname);
		WTW.registerMouseOver(mold);
		switch (shape.toLowerCase()) {
			case "tube":
				var coords = WTW.getNewCoordinates(50);
				var positionX = coords.positionX;
				var positionY = coords.positionY;
				var positionZ = coords.positionZ;
				molds[moldind].paths.path1[0] = WTW.newPathPoint();
				molds[moldind].paths.path1[0].x = positionX;
				molds[moldind].paths.path1[0].y = positionY;
				molds[moldind].paths.path1[0].z = positionZ;
				molds[moldind].paths.path1[1] = WTW.newPathPoint();
				molds[moldind].paths.path1[1].x = positionX;
				molds[moldind].paths.path1[1].y = (Number(positionY) + 10);
				molds[moldind].paths.path1[1].z = positionZ;
				molds[moldind].paths.path1[1].sorder = 1;
				break;
			case "line":
				var coords = WTW.getNewCoordinates(50);
				var positionX = coords.positionX;
				var positionY = coords.positionY;
				var positionZ = coords.positionZ;
				molds[moldind].paths.path1[0] = WTW.newPathPoint();
				molds[moldind].paths.path1[0].x = positionX;
				molds[moldind].paths.path1[0].y = positionY;
				molds[moldind].paths.path1[0].z = positionZ;
				molds[moldind].paths.path1[1] = WTW.newPathPoint();
				molds[moldind].paths.path1[1].x = positionX;
				molds[moldind].paths.path1[1].y = (Number(positionY) + 10);
				molds[moldind].paths.path1[1].z = positionZ;
				molds[moldind].paths.path1[1].sorder = 1;
				break;
			default:
				WTW.openEditPoles(mold);
				break;
		}
		WTW.pluginsOpenAddNewMold(moldgroup, shape, molds[moldind].moldname);
		WTW.hideAdminMenu();
		WTW.show('wtw_adminmenu11');
		WTW.show('wtw_adminmenu11b');
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-openAddNewMold=" + ex.message);
	}
}

/* Sounds for molds */
WTWJS.prototype.setSoundFields = function() {
	/* set sounds fields on the form based on drop down selection */
	try {
		var soundattenuation = "none";
		if (dGet('wtw_tmoldsoundattenuation').selectedIndex > -1) {
			soundattenuation = dGet('wtw_tmoldsoundattenuation').options[dGet('wtw_tmoldsoundattenuation').selectedIndex].value;
		}
		switch (soundattenuation) {
			case "none":
				WTW.hide('wtw_moldsoundoffdiv');
				WTW.hide('wtw_moldsoundmaxdistdiv');
				WTW.hide('wtw_moldsoundrolloffdiv');
				WTW.hide('wtw_moldsoundrefdistdiv');
				break;
			case "linear":
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
		WTW.log("core-scripts-admin-wtw_adminmolds.js-setSoundFields=" + ex.message);
	}
}

WTWJS.prototype.changeCoveringType = function() {
	/* chaneg covering (texture) form fields based on type selected - and default values available */
	try {	
		var settexture = '0';
		var imageid = 'ij7fi8qv7dbgb6zc';
		var imagepath = '/content/system/stock/stucco-512x512.jpg';
		var coveringname = WTW.getDDLValue('wtw_tmoldcovering');
		WTW.setCoveringFormFields(coveringname);
		switch (coveringname) {
			case "directional texture": 
			case "2d texture":
			case "texture": 
				if (dGet('wtw_tmoldtextureid').value == '') {
					dGet('wtw_tmoldtextureid').value = imageid;
				}
				if (dGet('wtw_tmoldtexturepath').value == '') {
					dGet('wtw_tmoldtexturepath').value = imagepath;
				}
				break; 
			case "terrain":
				imageid = '4to027vq39087bxr';
				imagepath = '/content/system/stock/cement-512x512.jpg';
				if (dGet('wtw_tmoldtextureid').value == '') {
					dGet('wtw_tmoldtextureid').value = imageid;
				}
				if (dGet('wtw_tmoldtexturepath').value == '') {
					dGet('wtw_tmoldtexturepath').value = imagepath;
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
		WTW.log("core-scripts-admin-wtw_adminmolds.js-changeCoveringType=" + ex.message);
	}
}

WTWJS.prototype.changeOnClickEvent = function(obj) {
	/* molds can have an onclick assigned to them */
	/* this function enables the onclick and sets the form fields for input */
	try {
		if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
			var moldgroup = dGet("wtw_tmoldmoldgroup").value;
			var moldind = Number(dGet('wtw_tmoldind').value);
			var molds;
			switch (moldgroup) {
				case "community":
					molds = WTW.communitiesMolds;
					break;
				case "thing":
					molds = WTW.thingMolds;
					break;
				default:
					molds = WTW.buildingMolds;
					break;
			}
			if (molds[moldind] != null) {
				if (molds[moldind].graphics.webimages[0] != undefined) {
					dGet('wtw_tmoldimagejsfunction').value = molds[moldind].graphics.webimages[0].jsfunction;
					dGet('wtw_tmoldimagejsparameters').value = molds[moldind].graphics.webimages[0].jsparameters;
				}
			}
		}
		WTW.showInline('wtw_onclickjavascriptdiv');
		if (obj.selectedIndex == 1) {
			dGet("wtw_tmoldimagejsfunction").value = "WTW.openIFrame";
			dGet('wtw_moldjsparameterstitle').innerHTML = "Web Address (URL)";
			dGet('wtw_moldjsparametersnote').innerHTML = "(Example: https://www.walktheweb.com)";
		} else if (obj.selectedIndex == 2) {
			dGet("wtw_tmoldimagejsfunction").value = "WTW.openWebpage";
			dGet('wtw_moldjsparameterstitle').innerHTML = "Web Address (URL)";
			dGet('wtw_moldjsparametersnote').innerHTML = "(Example: https://www.walktheweb.com)";
		} else  if (obj.selectedIndex == 0) {
			dGet("wtw_tmoldimagejsfunction").value = "";
			dGet('wtw_tmoldimagejsparameters').value = "";
			WTW.hide('wtw_onclickjavascriptdiv');
		} else {
			dGet('wtw_moldjsparameterstitle').innerHTML = "JavaScript Parameters";
			dGet('wtw_moldjsparametersnote').innerHTML = "(optional; comma separated)";
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-changeOnClickEvent=" + ex.message);
	}
}

WTWJS.prototype.setPreviewImage = function(zpreviewimageid, zimagepathid, zimageidid) {
	/* images have a preview thumbnail on the form */
	/* this function loads a preview image if it exists */
	try {
		if (dGet(zpreviewimageid) != null) {
			WTW.hide(zpreviewimageid);
			dGet(zpreviewimageid).src = '';
			var zimagepath = "";
			var zimageid = "";
			if (dGet(zimagepathid) != null) {
				zimagepath = dGet(zimagepathid).value;
			}
			if (dGet(zimageidid) != null) {
				zimageid = dGet(zimageidid).value;
			}
			if (zimagepath != '') {
				dGet(zpreviewimageid).src = zimagepath;
			} else if (zimageid != "") {
				WTW.getJSON("/connect/upload.php?uploadid=" + zimageid, 
					function(response) {
						WTW.loadUpload(JSON.parse(response),zimageid,0);
						var imageinfo = WTW.getUploadFileData(zimageid);
						imageinfo.image.onload = function() {	
							dGet(zpreviewimageid).src = imageinfo.filedata;
						}
					}
				);
			}
			if (dGet(zpreviewimageid).src != '') {
				WTW.show(zpreviewimageid);
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-setPreviewImage=" + ex.message);
	}
}

WTWJS.prototype.submitMoldForm = function(w) {
	/* submit mold form after edit (or after create new mold) */
	try {
		WTW.closeColorSelector();
		var moldgroup = dGet('wtw_tmoldmoldgroup').value;
		var molds = null;
		var shape = "wall";
		var moldname = "";
		if (dGet('wtw_tmoldshape').value != "") {
			shape = dGet('wtw_tmoldshape').value;
		}
		var moldind = Number(dGet('wtw_tmoldind').value);
		switch (moldgroup) {
			case "community":
				molds = WTW.communitiesMolds;				
				break;
			case "thing":
				molds = WTW.thingMolds;
				break;
			default:
				molds = WTW.buildingMolds;
				break;
		}
		moldname = moldgroup + "molds-" + moldind + "-" + dGet('wtw_tmoldid').value + "-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "-" + shape;
		if (dGet('wtw_tmoldcsgmoldid').value == "") {
			WTW.setDDLValue("wtw_tmoldcsgaction", "");
		}		
		if (w == 0) {
			/* cancel or delete mold */
			/* note that molds are not deleted from the database, a delete flag is set so it is not loaded */
			var basemoldind = -1;
			var baseshape = "box";
			if (molds[moldind].csg.moldid != '') {
				for (var i=0;i<molds.length;i++) {
					if (molds[i] != null) {
						if (molds[i].moldid == molds[moldind].csg.moldid) {
							basemoldind = i;
							baseshape = molds[i].shape;
						}
					}
				}
			}
			if (moldname != "") {
				WTW.disposeClean(moldname);
			}
			molds[moldind] = null;
			var zrequest = {
				'communityid': communityid,
				'buildingid': buildingid,
				'thingid': thingid,
				'moldid': dGet('wtw_tmoldid').value,
				'deleted': '1',
				'function':'deletemold'
			};
			WTW.postJSON("/core/handlers/molds.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
					dGet('wtw_tnewmold').value = "0";
				}
			);
			WTW.pluginsSubmitMoldForm(w);
			WTW.clearEditMold();
			if (basemoldind > -1) {
				WTW.openMoldForm(basemoldind,baseshape,moldgroup); 
			} else {
				WTW.hideAdminMenu();
				WTW.backToEdit();
			}
		} else if (w == -1) {
			/* cancel and undo changes to mold using WTW.moldBackup global variable */
			if (WTW.moldBackup != null) {
				molds[moldind] = WTW.moldBackup;
			}
			WTW.loadMoldForm(molds[moldind]);
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
			WTW.disposeClean(molds[moldind].moldname);
			if (dGet('wtw_tnewmold').value == "1") {
				if (moldname != "") {
					WTW.disposeClean(moldname);
				}
				molds[moldind] = null;
			} else {
				molds[moldind].shown = "0";
				WTW.setShownMolds();
			}
			WTW.pluginsSubmitMoldForm(w);
			WTW.clearEditMold();
			WTW.hideAdminMenu();
			WTW.backToEdit();
		} else {
			/* save the mold (create new if needed) */
			if (molds[moldind] == null) {
				molds[moldind] = WTW.newMold();
			}
			switch (moldgroup) {
				case "community":
					molds[moldind].communityinfo.communityid = communityid;
					molds[moldind].communityinfo.communityind = dGet('wtw_tcommunityind').value;
					break;
				case "thing":
					molds[moldind].thinginfo.communityid = thingid;
					molds[moldind].thinginfo.thingind = dGet('wtw_tthingind').value;
					break;
				default:
					molds[moldind].buildinginfo.buildingid = buildingid;
					molds[moldind].buildinginfo.buildingind = WTW.getBuildingInd(buildingid);
					break;
			}
			molds[moldind].moldid = dGet('wtw_tmoldid').value;
			molds[moldind].moldind = moldind;
			molds[moldind].shape = dGet('wtw_tmoldshape').value;
			if (dGet('wtw_tmoldcovering').options[dGet('wtw_tmoldcovering').selectedIndex] != undefined) {
				molds[moldind].covering = dGet('wtw_tmoldcovering').options[dGet('wtw_tmoldcovering').selectedIndex].value;
			} else {
				molds[moldind].covering = dGet('wtw_tmoldcoveringold').value;
			}
			molds[moldind].position.x = dGet('wtw_tmoldpositionx').value;
			molds[moldind].position.y = dGet('wtw_tmoldpositiony').value;
			molds[moldind].position.z = dGet('wtw_tmoldpositionz').value;
			molds[moldind].scaling.x = dGet('wtw_tmoldscalingx').value;
			molds[moldind].scaling.y = dGet('wtw_tmoldscalingy').value;
			molds[moldind].scaling.z = dGet('wtw_tmoldscalingz').value;
			molds[moldind].rotation.x = dGet('wtw_tmoldrotationx').value;
			molds[moldind].rotation.y = dGet('wtw_tmoldrotationy').value;
			molds[moldind].rotation.z = dGet('wtw_tmoldrotationz').value;
			molds[moldind].scaling.special1 = dGet('wtw_tmoldspecial1').value;
			molds[moldind].scaling.special2 = dGet('wtw_tmoldspecial2').value;
			molds[moldind].graphics.uoffset = dGet('wtw_tmolduoffset').value;
			molds[moldind].graphics.voffset = dGet('wtw_tmoldvoffset').value;
			molds[moldind].graphics.uscale = dGet('wtw_tmolduscale').value;
			molds[moldind].graphics.vscale = dGet('wtw_tmoldvscale').value;
			if (molds[moldind].graphics.webimages[0] != undefined) {
				molds[moldind].graphics.webimages[0].imagepath = dGet('wtw_tmoldaddimagepath').value;
				molds[moldind].graphics.webimages[0].imageid = dGet('wtw_tmoldaddimageid').value;
				molds[moldind].graphics.webimages[0].imagehoverpath = dGet('wtw_tmoldaddimagehoverpath').value;
				molds[moldind].graphics.webimages[0].imagehoverid = dGet('wtw_tmoldaddimagehoverid').value;
				molds[moldind].graphics.webimages[0].imageclickpath = dGet('wtw_tmoldaddimageclickpath').value;
				molds[moldind].graphics.webimages[0].imageclickid = dGet('wtw_tmoldaddimageclickid').value;
				molds[moldind].graphics.webimages[0].jsfunction = dGet('wtw_tmoldimagejsfunction').value;
				molds[moldind].graphics.webimages[0].jsparameters = dGet('wtw_tmoldimagejsparameters').value;
			} else {
				molds[moldind].graphics.webimages[0] = WTW.newWebImage();
			}
			if (dGet('wtw_tmoldgraphiclevel').checked) {
				molds[moldind].graphics.level = '1';
			} else {
				molds[moldind].graphics.level = '0';
			}
			if (dGet('wtw_tmoldreceiveshadows').checked) {
				molds[moldind].graphics.receiveshadows = '1';
			} else {
				molds[moldind].graphics.receiveshadows = '0';
			}
			molds[moldind].opacity = dGet('wtw_tmoldopacity').value;
			molds[moldind].object.uploadobjectid = dGet('wtw_tmolduploadobjectid').value;
			molds[moldind].object.folder = dGet('wtw_tmoldobjectfolder').value;
			molds[moldind].object.file = dGet('wtw_tmoldobjectfile').value;
			molds[moldind].subdivisions = dGet('wtw_tmoldsubdivisions').value;
			molds[moldind].graphics.texture.id = dGet('wtw_tmoldtextureid').value;
			molds[moldind].graphics.texture.path = dGet('wtw_tmoldtexturepath').value;
			molds[moldind].graphics.texture.bumpid = dGet('wtw_tmoldtexturebumpid').value;
			molds[moldind].graphics.texture.bumppath = dGet('wtw_tmoldtexturebumppath').value;
			molds[moldind].graphics.texture.videoid = dGet('wtw_tmoldvideoid').value;
			molds[moldind].graphics.texture.video = dGet('wtw_tmoldvideopath').value;
			molds[moldind].graphics.texture.videoposterid = dGet('wtw_tmoldvideoposterid').value;
			molds[moldind].graphics.texture.videoposter = dGet('wtw_tmoldvideoposterpath').value;
			molds[moldind].graphics.heightmap.id = dGet('wtw_tmoldheightmapid').value;
			molds[moldind].graphics.heightmap.path = dGet('wtw_tmoldheightmappath').value;
			molds[moldind].graphics.heightmap.mixmapid = dGet('wtw_tmoldmixmapid').value;
			molds[moldind].graphics.heightmap.mixmappath = dGet('wtw_tmoldmixmappath').value;
			molds[moldind].graphics.heightmap.texturerid = dGet('wtw_tmoldtexturerid').value;
			molds[moldind].graphics.heightmap.texturerpath = dGet('wtw_tmoldtexturerpath').value;
			molds[moldind].graphics.heightmap.texturegid = dGet('wtw_tmoldtexturegid').value;
			molds[moldind].graphics.heightmap.texturegpath = dGet('wtw_tmoldtexturegpath').value;
			molds[moldind].graphics.heightmap.texturebid = dGet('wtw_tmoldtexturebid').value;
			molds[moldind].graphics.heightmap.texturebpath = dGet('wtw_tmoldtexturebpath').value;
			molds[moldind].graphics.heightmap.texturebumprid = dGet('wtw_tmoldtexturebumprid').value;
			molds[moldind].graphics.heightmap.texturebumprpath = dGet('wtw_tmoldtexturebumprpath').value;
			molds[moldind].graphics.heightmap.texturebumpgid = dGet('wtw_tmoldtexturebumpgid').value;
			molds[moldind].graphics.heightmap.texturebumpgpath = dGet('wtw_tmoldtexturebumpgpath').value;
			molds[moldind].graphics.heightmap.texturebumpbid = dGet('wtw_tmoldtexturebumpbid').value;
			molds[moldind].graphics.heightmap.texturebumpbpath = dGet('wtw_tmoldtexturebumpbpath').value;
			molds[moldind].graphics.heightmap.maxheight = dGet('wtw_tmoldmaxheight').value;
			var iswaterreflection = "0";
			if (dGet('wtw_tmoldwaterreflection').checked) {
				iswaterreflection = "1";
			}
			molds[moldind].graphics.waterreflection = iswaterreflection;
			molds[moldind].graphics.webimageind = dGet('wtw_tmoldimageind').value;
			molds[moldind].sound.id = dGet('wtw_tmoldsoundid').value;
			molds[moldind].sound.name = dGet('wtw_tmoldsoundname').value;
			var soundattenuation = "none";
			if (dGet('wtw_tmoldsoundattenuation').selectedIndex > -1) {
				soundattenuation = dGet('wtw_tmoldsoundattenuation').options[dGet('wtw_tmoldsoundattenuation').selectedIndex].value;
			}
			molds[moldind].sound.attenuation = soundattenuation;
			if (dGet('wtw_tmoldsoundloop').checked) {
				molds[moldind].sound.loop = '1';
			} else {
				molds[moldind].sound.loop = '0';
			}
			molds[moldind].sound.maxdistance = dGet('wtw_tmoldsoundmaxdistance').value;
			molds[moldind].sound.rollofffactor = dGet('wtw_tmoldsoundrollofffactor').value;
			molds[moldind].sound.refdistance = dGet('wtw_tmoldsoundrefdistance').value;
			molds[moldind].sound.coneinnerangle = dGet('wtw_tmoldsoundconeinnerangle').value;
			molds[moldind].sound.coneouterangle = dGet('wtw_tmoldsoundconeouterangle').value;
			molds[moldind].sound.coneoutergain = dGet('wtw_tmoldsoundconeoutergain').value;
			molds[moldind].actionzoneid = dGet('wtw_tmoldactionzoneid').value;
			molds[moldind].actionzoneind = WTW.getActionZoneInd(molds[moldind].actionzoneid,0);
			molds[moldind].loadactionzoneid = dGet('wtw_tmoldloadactionzoneid').options[dGet('wtw_tmoldloadactionzoneid').selectedIndex].value;
			molds[moldind].loadactionzoneind = WTW.getActionZoneInd(molds[moldind].loadactionzoneid,0);
			molds[moldind].csg.moldid = dGet('wtw_tmoldcsgmoldid').value;
			if (dGet('wtw_tmoldcsgaction').selectedIndex > -1) {
				molds[moldind].csg.action = dGet('wtw_tmoldcsgaction').options[dGet('wtw_tmoldcsgaction').selectedIndex].value;
			} else {
				molds[moldind].csg.action = "";
			}
			if (dGet('wtw_tmoldshape').value == '3dtext') {
				molds[moldind].webtext.webtext = WTW.encode(dGet('wtw_tmoldwebtext').value);
			} else {
				molds[moldind].webtext.webtext = '';
			}
			molds[moldind].webtext.webstyle = WTW.encode(dGet('wtw_tmoldwebstyle').value);
			molds[moldind].color.specular.r = dGet('wtw_tspecularcolorr').value;
			molds[moldind].color.specular.g = dGet('wtw_tspecularcolorg').value;
			molds[moldind].color.specular.b = dGet('wtw_tspecularcolorb').value;
			molds[moldind].color.emissive.r = dGet('wtw_temissivecolorr').value;
			molds[moldind].color.emissive.g = dGet('wtw_temissivecolorg').value;
			molds[moldind].color.emissive.b = dGet('wtw_temissivecolorb').value;
			molds[moldind].color.diffuse.r = dGet('wtw_tdiffusecolorr').value;
			molds[moldind].color.diffuse.g = dGet('wtw_tdiffusecolorg').value;
			molds[moldind].color.diffuse.b = dGet('wtw_tdiffusecolorb').value;
			molds[moldind].alttag.name = WTW.encode(dGet('wtw_tmoldalttag').value);
			molds[moldind].shown = "0";
			molds[moldind].graphics.texture.backupid = "";
			molds[moldind].parentname = "connectinggrids-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "--";
			molds[moldind].moldname = moldname;
			molds[moldind].connectinggridid = dGet('wtw_tconnectinggridid').value;
			molds[moldind].connectinggridind = dGet('wtw_tconnectinggridind').value;
			
			var zrequest = {
				'communityid': communityid,
				'buildingid': buildingid,
				'thingid': thingid,
				'moldid': molds[moldind].moldid,
				'moldind': moldind,
				'loadactionzoneid': molds[moldind].loadactionzoneid,
				'moldgroup': moldgroup,
				'shape': molds[moldind].shape,
				'covering': molds[moldind].covering,
				'positionx': molds[moldind].position.x,
				'positiony': molds[moldind].position.y,
				'positionz': molds[moldind].position.z,
				'scalingx': molds[moldind].scaling.x,
				'scalingy': molds[moldind].scaling.y,
				'scalingz': molds[moldind].scaling.z,
				'rotationx': molds[moldind].rotation.x,
				'rotationy': molds[moldind].rotation.y,
				'rotationz': molds[moldind].rotation.z,
				'special1': molds[moldind].scaling.special1,
				'special2': molds[moldind].scaling.special2,
				'uoffset': molds[moldind].graphics.uoffset,
				'voffset': molds[moldind].graphics.voffset,
				'uscale': molds[moldind].graphics.uscale,
				'vscale': molds[moldind].graphics.vscale,
				'uploadobjectid': molds[moldind].object.uploadobjectid,
				'objectfolder': molds[moldind].object.folder,
				'objectfile': molds[moldind].object.file,
				'receiveshadows': molds[moldind].graphics.receiveshadows,
				'graphiclevel': molds[moldind].graphics.level,
				'videoid': molds[moldind].graphics.texture.videoid,
				'videoposterid': molds[moldind].graphics.texture.videoposterid,
				'textureid': molds[moldind].graphics.texture.id,
				'texturebumpid': molds[moldind].graphics.texture.bumpid,
				'heightmapid': molds[moldind].graphics.heightmap.id,
				'mixmapid': molds[moldind].graphics.heightmap.mixmapid,
				'texturerid': molds[moldind].graphics.heightmap.texturerid,
				'texturegid': molds[moldind].graphics.heightmap.texturegid,
				'texturebid': molds[moldind].graphics.heightmap.texturebid,
				'texturebumprid': molds[moldind].graphics.heightmap.texturebumprid,
				'texturebumpgid': molds[moldind].graphics.heightmap.texturebumpgid,
				'texturebumpbid': molds[moldind].graphics.heightmap.texturebumpbid,
				'soundid': molds[moldind].sound.id,
				'soundname': molds[moldind].sound.name,
				'soundattenuation': molds[moldind].sound.attenuation,
				'soundmaxdistance': molds[moldind].sound.maxdistance,
				'soundrollofffactor': molds[moldind].sound.rollofffactor,
				'soundrefdistance': molds[moldind].sound.refdistance,
				'soundconeinnerangle': molds[moldind].sound.coneinnerangle,
				'soundconeouterangle': molds[moldind].sound.coneouterangle,
				'soundconeoutergain': molds[moldind].sound.coneoutergain,
				'opacity': molds[moldind].opacity,
				'subdivisions': molds[moldind].subdivisions,
				'actionzoneid': molds[moldind].actionzoneid,
				'minheight': '0',
				'maxheight': molds[moldind].graphics.heightmap.maxheight,
				'checkcollisions': '1',
				'ispickable': '1',
				'csgmoldid': molds[moldind].csg.moldid,
				'csgaction': molds[moldind].csg.action,
				'imageid': '',
				'imageind': molds[moldind].graphics.webimageind,
				'imagepath': '',
				'imagehoverpath': '',
				'imageclickid': '',
				'alttagname': molds[moldind].alttag.name,
				'webtext': molds[moldind].webtext.webtext,
				'webstyle': molds[moldind].webtext.webstyle,
				'specularcolorr': molds[moldind].color.specular.r,
				'specularcolorg': molds[moldind].color.specular.g,
				'specularcolorb': molds[moldind].color.specular.b,
				'emissivecolorr': molds[moldind].color.emissive.r,
				'emissivecolorg': molds[moldind].color.emissive.g,
				'emissivecolorb': molds[moldind].color.emissive.b,
				'diffusecolorr': molds[moldind].color.diffuse.r,
				'diffusecolorg': molds[moldind].color.diffuse.g,
				'diffusecolorb': molds[moldind].color.diffuse.b,
				'path1points': dGet('wtw_tmoldpath1points').value,
				'path2points': dGet('wtw_tmoldpath2points').value,
				'imageid': molds[moldind].graphics.webimages[0].imageid,
				'imagehoverid': molds[moldind].graphics.webimages[0].imagehoverid,
				'imageclickid': molds[moldind].graphics.webimages[0].imageclickid,
				'imagejsfunction': molds[moldind].graphics.webimages[0].jsfunction,
				'imagejsparameters': molds[moldind].graphics.webimages[0].jsparameters,
				'waterreflection': molds[moldind].graphics.waterreflection,
				'deleted': '0',
				'function':'savemold'
			};
			WTW.postJSON("/core/handlers/molds.php", zrequest, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					/* note serror would contain errors */
				}
			);
			dGet('wtw_tnewmold').value = "0";
			WTW.checkActionZones();
			WTW.pluginsSubmitMoldForm(w);
			WTW.clearEditMold();
			WTW.hideAdminMenu();
			WTW.backToEdit();
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-submitMoldForm=" + ex.message);
	}
}

WTWJS.prototype.clearEditMold = function() {
	/* reset mold form to clear all values to default */
	try {
		dGet('wtw_tmoldid').value = "";
		WTW.getLoadZoneList(WTW.getLoadActionZoneID("normal"));
		dGet('wtw_tmoldloadactionzoneid').selectedIndex = -1;
		dGet('wtw_tmoldcovering').selectedIndex = -1;
		dGet('wtw_tmoldcoveringold').value = "";
		dGet('wtw_tmoldshape').value = "";
		dGet('wtw_tmoldactionzoneid').value = "";
		dGet('wtw_tmoldpositionx').value = "0";
		dGet('wtw_tmoldpositiony').value = "0";
		dGet('wtw_tmoldpositionz').value = "0";
		dGet('wtw_tmoldscalingx').value = "1";
		dGet('wtw_tmoldscalingy').value = "1";
		dGet('wtw_tmoldscalingz').value = "1";
		dGet('wtw_tmoldrotationx').value = "0";
		dGet('wtw_tmoldrotationy').value = "0";
		dGet('wtw_tmoldrotationz').value = "0";
		dGet('wtw_tmoldspecial1').value = "0";
		dGet('wtw_tmoldspecial2').value = "0";
		dGet('wtw_tmoldsubdivisions').value = "12";
		dGet('wtw_tmoldopacity').value = "100";
		dGet('wtw_tmolduoffset').value = "0";
		dGet('wtw_tmoldvoffset').value = "0";
		dGet('wtw_tmolduscale').value = "0";
		dGet('wtw_tmoldvscale').value = "0";
		dGet('wtw_tmolduploadobjectid').value = "";
		dGet('wtw_tmoldobjectfolder').value = "";
		dGet('wtw_tmoldobjectfile').value = "";
		dGet('wtw_tmoldtextureid').value = "";
		dGet('wtw_tmoldtexturepath').value = "";
		dGet('wtw_tmoldtexturebumpid').value = "";
		dGet('wtw_tmoldtexturebumppath').value = "";
		dGet('wtw_tmoldheightmapid').value = "";
		dGet('wtw_tmoldheightmappath').value = "";
		dGet('wtw_tmoldmixmapid').value = "";
		dGet('wtw_tmoldmixmappath').value = "";
		dGet('wtw_tmoldtexturerid').value = "";
		dGet('wtw_tmoldtexturerpath').value = "";
		dGet('wtw_tmoldtexturegid').value = "";
		dGet('wtw_tmoldtexturegpath').value = "";
		dGet('wtw_tmoldtexturebid').value = "";
		dGet('wtw_tmoldtexturebpath').value = "";
		dGet('wtw_tmoldtexturebumprid').value = "";
		dGet('wtw_tmoldtexturebumprpath').value = "";
		dGet('wtw_tmoldtexturebumpgid').value = "";
		dGet('wtw_tmoldtexturebumpgpath').value = "";
		dGet('wtw_tmoldtexturebumpbid').value = "";
		dGet('wtw_tmoldtexturebumpbpath').value = "";
		dGet('wtw_tmoldvideoid').value = "";
		dGet('wtw_tmoldvideopath').value = "";
		dGet('wtw_tmoldvideoposterid').value = "";
		dGet('wtw_tmoldvideoposterpath').value = "";
		dGet('wtw_tmoldind').value = "-1";
		dGet('wtw_tmoldname').value = "";
		dGet('wtw_tmoldcsgmoldid').value = "";
		dGet('wtw_tmoldcsgaction').selectedIndex = -1;
		dGet('wtw_tmoldalttag').value = "";
		dGet('wtw_tspecularcolorr').value = "1";
		dGet('wtw_tspecularcolorg').value = "1";
		dGet('wtw_tspecularcolorb').value = "1";
		dGet('wtw_temissivecolorr').value = "1";
		dGet('wtw_temissivecolorg').value = "1";
		dGet('wtw_temissivecolorb').value = "1";
		dGet('wtw_tdiffusecolorr').value = "1";
		dGet('wtw_tdiffusecolorg').value = "1";
		dGet('wtw_tdiffusecolorb').value = "1";
		dGet('wtw_tmoldwebstyle').value = "";
		dGet('wtw_tmoldwebtext').value = "";
		dGet('wtw_tmoldsoundid').value = "";
		dGet('wtw_tmoldsoundname').value = "";
		dGet('wtw_tmoldsoundattenuation').selectedIndex = -1;
		dGet('wtw_tmoldsoundloop').checked = true;
		dGet('wtw_tmoldsoundmaxdistance').value = "100";
		dGet('wtw_tmoldsoundrollofffactor').value = "1";
		dGet('wtw_tmoldsoundrefdistance').value = "1";
		dGet('wtw_tmoldsoundconeinnerangle').value = "90";
		dGet('wtw_tmoldsoundconeouterangle').value = "180";
		dGet('wtw_tmoldsoundconeoutergain').value = ".5";
		dGet('wtw_tmoldimageind').value = "";
		dGet('wtw_tmoldwaterreflection').checked = false;
		dGet('wtw_tmoldmaxheight').value = "30";
		dGet('wtw_tmoldreceiveshadows').checked = false;
		dGet('wtw_tmoldgraphiclevel').checked = false;
		dGet('wtw_tmoldaddimagepath').value = "";
		dGet('wtw_tmoldaddimageid').value = "";
		dGet('wtw_tmoldaddimagehoverpath').value = "";
		dGet('wtw_tmoldaddimagehoverid').value = "";
		dGet('wtw_tmoldaddimageclickpath').value = "";
		dGet('wtw_tmoldaddimageclickid').value = "";
		dGet('wtw_tmoldimagejsfunction').value = "";
		dGet('wtw_tmoldimagejsparameters').value = "";
		WTW.pluginsClearEditMold();
		scene.render();
		WTW.closeEditPoles();
		WTW.setShownMolds();
		WTW.moldBackup = null;
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-clearEditMold=" + ex.message);
	}
}


/* edit poles to help align molds when editing */

WTWJS.prototype.openEditPoles = function(mold) {
	/* open edit pole lines and position, rotation, and scale to mold */
	try {
		WTW.closeEditPoles();
		scene.render();
		if (mold != null) {
			var px = mold.position.x;
			var py = mold.position.y;
			var pz = mold.position.z;
			if (mold.parent != null) {
				if (mold.parent.id.indexOf("actionzoneaxle") > -1) {
					px += mold.parent.position.x;
					py += mold.parent.position.y;
					pz += mold.parent.position.z;
				}
			} 
			var moldx = mold.scaling.x;
			var moldy = mold.scaling.y;
			var moldz = mold.scaling.z;
			if (WTW.lineX == null) {
				WTW.lineZ = BABYLON.MeshBuilder.CreateLines("linez", {points: [new BABYLON.Vector3(px, py, pz-100),	new BABYLON.Vector3(px, py, pz+100)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX = BABYLON.MeshBuilder.CreateLines("linex", {points: [new BABYLON.Vector3(px-100, py, pz),	new BABYLON.Vector3(px+100, py, pz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY = BABYLON.MeshBuilder.CreateLines("liney", {points: [new BABYLON.Vector3(px, py-100, pz),	new BABYLON.Vector3(px, py+100, pz)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ.isPickable = false;
				WTW.lineX.isPickable = false;
				WTW.lineY.isPickable = false;

				WTW.lineX1 = BABYLON.MeshBuilder.CreateLines("linex1", {points: [new BABYLON.Vector3(-.5, -.5, -100), new BABYLON.Vector3(-.5, -.5, 100)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX2 = BABYLON.MeshBuilder.CreateLines("linex2", {points: [new BABYLON.Vector3(-.5, .5, -100), new BABYLON.Vector3(-.5, .5, 100)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX3 = BABYLON.MeshBuilder.CreateLines("linex3", {points: [new BABYLON.Vector3(.5, -.5, -100), new BABYLON.Vector3(.5, -.5, 100)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX4 = BABYLON.MeshBuilder.CreateLines("linex4", {points: [new BABYLON.Vector3(.5, .5, -100), new BABYLON.Vector3(.5, .5, 100)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX5 = BABYLON.MeshBuilder.CreateLines("linex5", {points: [new BABYLON.Vector3(0, -.5, -100), new BABYLON.Vector3(0, -.5, 100)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX6 = BABYLON.MeshBuilder.CreateLines("linex6", {points: [new BABYLON.Vector3(0, .5, -100), new BABYLON.Vector3(0, .5, 100)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX7 = BABYLON.MeshBuilder.CreateLines("linex5", {points: [new BABYLON.Vector3(-.5, 0, -100), new BABYLON.Vector3(-.5, 0, 100)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineX8 = BABYLON.MeshBuilder.CreateLines("linex6", {points: [new BABYLON.Vector3(.5, 0, -100), new BABYLON.Vector3(.5, 0, 100)], useVertexAlpha: false, updatable: false}, scene);
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
				WTW.lineX1.parent = mold;
				WTW.lineX2.parent = mold;
				WTW.lineX3.parent = mold;
				WTW.lineX4.parent = mold;
				WTW.lineX5.parent = mold;
				WTW.lineX6.parent = mold;
				WTW.lineX7.parent = mold;
				WTW.lineX8.parent = mold;

				WTW.lineY1 = BABYLON.MeshBuilder.CreateLines("liney1", {points: [new BABYLON.Vector3(-.5, -100, -.5), new BABYLON.Vector3(-.5, 100, -.5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY2 = BABYLON.MeshBuilder.CreateLines("liney2", {points: [new BABYLON.Vector3(-.5, -100, .5), new BABYLON.Vector3(-.5, 100, .5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY3 = BABYLON.MeshBuilder.CreateLines("liney3", {points: [new BABYLON.Vector3(.5, -100, -.5), new BABYLON.Vector3(.5, 100, -.5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY4 = BABYLON.MeshBuilder.CreateLines("liney4", {points: [new BABYLON.Vector3(.5, -100, .5), new BABYLON.Vector3(.5, 100, .5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY5 = BABYLON.MeshBuilder.CreateLines("liney5", {points: [new BABYLON.Vector3(0, -100, -.5), new BABYLON.Vector3(0, 100, -.5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY6 = BABYLON.MeshBuilder.CreateLines("liney6", {points: [new BABYLON.Vector3(0, -100, .5), new BABYLON.Vector3(0, 100, .5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY7 = BABYLON.MeshBuilder.CreateLines("liney5", {points: [new BABYLON.Vector3(-.5, -100, 0), new BABYLON.Vector3(-.5, 100, 0)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineY8 = BABYLON.MeshBuilder.CreateLines("liney6", {points: [new BABYLON.Vector3(.5, -100, 0), new BABYLON.Vector3(.5, 100, 0)], useVertexAlpha: false, updatable: false}, scene);
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
				WTW.lineY1.parent = mold;
				WTW.lineY2.parent = mold;
				WTW.lineY3.parent = mold;
				WTW.lineY4.parent = mold;
				WTW.lineY5.parent = mold;
				WTW.lineY6.parent = mold;
				WTW.lineY7.parent = mold;
				WTW.lineY8.parent = mold;

				WTW.lineZ1 = BABYLON.MeshBuilder.CreateLines("linez1", {points: [new BABYLON.Vector3(-100, -.5, -.5), new BABYLON.Vector3(100, -.5, -.5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ2 = BABYLON.MeshBuilder.CreateLines("linez2", {points: [new BABYLON.Vector3(-100, -.5, .5), new BABYLON.Vector3(100, -.5, .5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ3 = BABYLON.MeshBuilder.CreateLines("linez3", {points: [new BABYLON.Vector3(-100, .5, -.5), new BABYLON.Vector3(100, .5, -.5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ4 = BABYLON.MeshBuilder.CreateLines("linez4", {points: [new BABYLON.Vector3(-100, .5, .5), new BABYLON.Vector3(100, .5, .5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ5 = BABYLON.MeshBuilder.CreateLines("linez5", {points: [new BABYLON.Vector3(-100, 0, -.5), new BABYLON.Vector3(100, 0, -.5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ6 = BABYLON.MeshBuilder.CreateLines("linez6", {points: [new BABYLON.Vector3(-100, 0, .5),	new BABYLON.Vector3(100, 0, .5)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ7 = BABYLON.MeshBuilder.CreateLines("linez5", {points: [new BABYLON.Vector3(-100, -.5, 0), new BABYLON.Vector3(100, -.5, 0)], useVertexAlpha: false, updatable: false}, scene);
				WTW.lineZ8 = BABYLON.MeshBuilder.CreateLines("linez6", {points: [new BABYLON.Vector3(-100, .5, 0),	new BABYLON.Vector3(100, .5, 0)], useVertexAlpha: false, updatable: false}, scene);
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
				WTW.lineZ1.parent = mold;
				WTW.lineZ2.parent = mold;
				WTW.lineZ3.parent = mold;
				WTW.lineZ4.parent = mold;
				WTW.lineZ5.parent = mold;
				WTW.lineZ6.parent = mold;
				WTW.lineZ7.parent = mold;
				WTW.lineZ8.parent = mold;
				var alphamold = 1;
				var wx = .1;
				var wy = 1;
				var wz = 2;
				if (WTW.moveZ == null) {
					WTW.moveZ = BABYLON.MeshBuilder.CreateBox("movez", {height:1, width:.1, depth:2}, scene);
					WTW.moveZ.position = new BABYLON.Vector3(px, py, (moldz / 2 + pz + 1.1));
					//WTW.moveZ.scaling.x = .1;
					//WTW.moveZ.scaling.y = 1;
					//WTW.moveZ.scaling.z = 2;
					WTW.moveZ.isPickable = false;
					image = "/content/system/images/movez.png";
					var rMaterial = new BABYLON.StandardMaterial("rmoldmovez", scene);
					rMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					rMaterial.diffuseTexture.wAng = WTW.getRadians(0);
					rMaterial.diffuseTexture.alpha = alphamold;
					rMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					var lMaterial = new BABYLON.StandardMaterial("lmoldmovez", scene);
					lMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					lMaterial.diffuseTexture.wAng = WTW.getRadians(180);
					lMaterial.diffuseTexture.alpha = alphamold;
					lMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7); 
					var fMaterial = new BABYLON.StandardMaterial("fmoldmovez", scene);
					fMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					fMaterial.diffuseTexture.wAng = WTW.getRadians(90);
					fMaterial.diffuseTexture.alpha = alphamold;
					fMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					var bMaterial = new BABYLON.StandardMaterial("bmoldmovez", scene);
					bMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					bMaterial.diffuseTexture.wAng = WTW.getRadians(90);
					bMaterial.diffuseTexture.alpha = alphamold;
					bMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					var uMaterial = new BABYLON.StandardMaterial("umoldmovez", scene);
					uMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					uMaterial.diffuseTexture.alpha = alphamold;
					uMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					var dMaterial = new BABYLON.StandardMaterial("dmoldmovez", scene);
					dMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					dMaterial.diffuseTexture.alpha = alphamold;
					dMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					var moldmulti = new BABYLON.MultiMaterial("multimoldmovez", scene);
					moldmulti.subMaterials.push(lMaterial);
					moldmulti.subMaterials.push(rMaterial);
					moldmulti.subMaterials.push(bMaterial);
					moldmulti.subMaterials.push(fMaterial);
					moldmulti.subMaterials.push(uMaterial);
					moldmulti.subMaterials.push(dMaterial);
					if (WTW.moveZ.subMeshes.length < 12) {
						WTW.moveZ.subMeshes.push(new BABYLON.SubMesh(0, 0,  4,  0, 6, WTW.moveZ));
						WTW.moveZ.subMeshes.push(new BABYLON.SubMesh(1, 4,  4,  6, 6, WTW.moveZ));
						WTW.moveZ.subMeshes.push(new BABYLON.SubMesh(2, 8,  4, 12, 6, WTW.moveZ));
						WTW.moveZ.subMeshes.push(new BABYLON.SubMesh(3, 12, 4, 18, 6, WTW.moveZ));
						WTW.moveZ.subMeshes.push(new BABYLON.SubMesh(4, 16, 4, 24, 6, WTW.moveZ));
						WTW.moveZ.subMeshes.push(new BABYLON.SubMesh(5, 20, 4, 30, 6, WTW.moveZ));
					}
					WTW.moveZ.material = moldmulti;
				}
				wx = .1;
				wy = 1;
				wz = 2;
				if (WTW.moveY == null) {
					WTW.moveY = BABYLON.MeshBuilder.CreateBox("movey", {height:1, width:2, depth:2}, scene);
					WTW.moveY.position = new BABYLON.Vector3(px, (moldy / 2 + py + 1.1), pz);
					//WTW.moveY.scaling.x = 2;
					//WTW.moveY.scaling.y = 1;
					//WTW.moveY.scaling.z = 2;
					WTW.moveY.isPickable = false;
					image = "/content/system/images/movey.png";
					rMaterial = new BABYLON.StandardMaterial("rmoldmovey", scene);
					rMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					rMaterial.diffuseTexture.wAng = WTW.getRadians(0);
					rMaterial.diffuseTexture.alpha = alphamold;
					rMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					lMaterial = new BABYLON.StandardMaterial("lmoldmovey", scene);
					lMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					lMaterial.diffuseTexture.wAng = WTW.getRadians(180);
					lMaterial.diffuseTexture.alpha = alphamold;
					lMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7); 
					fMaterial = new BABYLON.StandardMaterial("fmoldmovey", scene);
					fMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					fMaterial.diffuseTexture.wAng = WTW.getRadians(90);
					fMaterial.diffuseTexture.alpha = alphamold;
					fMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					bMaterial = new BABYLON.StandardMaterial("bmoldmovey", scene);
					bMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					bMaterial.diffuseTexture.wAng = WTW.getRadians(90);
					bMaterial.diffuseTexture.alpha = alphamold;
					bMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					uMaterial = new BABYLON.StandardMaterial("umoldmovey", scene);
					uMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					uMaterial.diffuseTexture.alpha = alphamold;
					uMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					dMaterial = new BABYLON.StandardMaterial("dmoldmovey", scene);
					dMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					dMaterial.diffuseTexture.alpha = alphamold;
					dMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					moldmulti = new BABYLON.MultiMaterial("multimoldmovey", scene);
					moldmulti.subMaterials.push(lMaterial);
					moldmulti.subMaterials.push(rMaterial);
					moldmulti.subMaterials.push(bMaterial);
					moldmulti.subMaterials.push(fMaterial);
					moldmulti.subMaterials.push(uMaterial);
					moldmulti.subMaterials.push(dMaterial);
					if (WTW.moveY.subMeshes.length < 12) {
						WTW.moveY.subMeshes.push(new BABYLON.SubMesh(0, 0,  4,  0, 6, WTW.moveY));
						WTW.moveY.subMeshes.push(new BABYLON.SubMesh(1, 4,  4,  6, 6, WTW.moveY));
						WTW.moveY.subMeshes.push(new BABYLON.SubMesh(2, 8,  4, 12, 6, WTW.moveY));
						WTW.moveY.subMeshes.push(new BABYLON.SubMesh(3, 12, 4, 18, 6, WTW.moveY));
						WTW.moveY.subMeshes.push(new BABYLON.SubMesh(4, 16, 4, 24, 6, WTW.moveY));
						WTW.moveY.subMeshes.push(new BABYLON.SubMesh(5, 20, 4, 30, 6, WTW.moveY));
					}
					WTW.moveY.material = moldmulti;
				}
				wx = 2;
				wy = 1;
				wz = .1;
				if (WTW.moveX == null) {
					WTW.moveX = BABYLON.MeshBuilder.CreateBox("movex", {height:1, width:2, depth:.1}, scene);
					WTW.moveX.position = new BABYLON.Vector3((moldx / 2 + px + 1.1), py, pz);
					//WTW.moveX.scaling.x = 2;
					//WTW.moveX.scaling.y = 1;
					//WTW.moveX.scaling.z = .1;
					WTW.moveX.isPickable = false;
					image = "/content/system/images/movex.png";
					rMaterial = new BABYLON.StandardMaterial("rmoldmovex", scene);
					rMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					rMaterial.diffuseTexture.wAng = WTW.getRadians(0);
					rMaterial.diffuseTexture.alpha = alphamold;
					rMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					lMaterial = new BABYLON.StandardMaterial("lmoldmovex", scene);
					lMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					lMaterial.diffuseTexture.wAng = WTW.getRadians(180);
					lMaterial.diffuseTexture.alpha = alphamold;
					lMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7); 
					fMaterial = new BABYLON.StandardMaterial("fmoldmovex", scene);
					fMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					fMaterial.diffuseTexture.wAng = WTW.getRadians(90);
					fMaterial.diffuseTexture.alpha = alphamold;
					fMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					bMaterial = new BABYLON.StandardMaterial("bmoldmovex", scene);
					bMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					bMaterial.diffuseTexture.wAng = WTW.getRadians(90);
					bMaterial.diffuseTexture.alpha = alphamold;
					bMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					uMaterial = new BABYLON.StandardMaterial("umoldmovex", scene);
					uMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					uMaterial.diffuseTexture.alpha = alphamold;
					uMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					dMaterial = new BABYLON.StandardMaterial("dmoldmovex", scene);
					dMaterial.diffuseTexture = new BABYLON.Texture(image, scene);
					dMaterial.diffuseTexture.alpha = alphamold;
					dMaterial.emissiveColor = new BABYLON.Color3(.7, .7, .7);
					moldmulti = new BABYLON.MultiMaterial("multimoldmovex", scene);
					moldmulti.subMaterials.push(lMaterial);
					moldmulti.subMaterials.push(rMaterial);
					moldmulti.subMaterials.push(bMaterial);
					moldmulti.subMaterials.push(fMaterial);
					moldmulti.subMaterials.push(uMaterial);
					moldmulti.subMaterials.push(dMaterial);
					if (WTW.moveX.subMeshes.length < 12) {
						WTW.moveX.subMeshes.push(new BABYLON.SubMesh(0, 0,  4,  0, 6, WTW.moveX));
						WTW.moveX.subMeshes.push(new BABYLON.SubMesh(1, 4,  4,  6, 6, WTW.moveX));
						WTW.moveX.subMeshes.push(new BABYLON.SubMesh(2, 8,  4, 12, 6, WTW.moveX));
						WTW.moveX.subMeshes.push(new BABYLON.SubMesh(3, 12, 4, 18, 6, WTW.moveX));
						WTW.moveX.subMeshes.push(new BABYLON.SubMesh(4, 16, 4, 24, 6, WTW.moveX));
						WTW.moveX.subMeshes.push(new BABYLON.SubMesh(5, 20, 4, 30, 6, WTW.moveX));
					}
					WTW.moveX.material = moldmulti;	
				}
			} else {
				WTW.moveZ.position = new BABYLON.Vector3(px, py, (moldz / 2 + pz + 1.1));
				WTW.moveZ.scaling.x = .1;
				WTW.moveZ.scaling.y = 1;
				WTW.moveZ.scaling.z = 2;
				WTW.moveX.position = new BABYLON.Vector3((moldx / 2 + px + 1.1), py, pz);
				WTW.moveX.scaling.x = 2;
				WTW.moveX.scaling.y = 1;
				WTW.moveX.scaling.z = .1;
				WTW.moveY.position = new BABYLON.Vector3(px, (moldy / 2 + py + 1.1), pz);
				WTW.moveY.scaling.x = 2;
				WTW.moveY.scaling.y = 1;
				WTW.moveY.scaling.z = 2;
			}
			if (dGet('wtw_adminaxislabels').innerHTML == "Axis Labels ON") {
				WTW.moveX.isVisible = true;
				WTW.moveY.isVisible = true;
				WTW.moveZ.isVisible = true;				
			} else {
				WTW.moveX.isVisible = false;
				WTW.moveY.isVisible = false;
				WTW.moveZ.isVisible = false;          
			}	
			if (dGet('wtw_blines').alt = "Alignment Lines are Shown") {
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
		WTW.log("core-scripts-admin-wtw_adminmolds.js-openEditPoles=" + ex.message);
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
		WTW.log("core-scripts-admin-wtw_adminmolds.js-closeEditPoles=" + ex.message);
	}
}


/* recover deleted molds */

WTWJS.prototype.openRecoverItems = function() {
	/* open recover items form will search for any molds with the delete flag set; provides a list to view and select for recovery */
	try {
		var path = "";
		if (buildingid != "") {
			path = "/connect/buildingrecoveritems.php?buildingid=" + buildingid;
		} else if (communityid != "") {
			path = "/connect/communityrecoveritems.php?communityid=" + communityid;
		} else if (thingid != "") {
			path = "/connect/thingrecoveritems.php?thingid=" + thingid;
		}
		dGet('wtw_deleteditemslist').innerHTML = "";
		if (path != "") {
			WTW.getJSON(path, 
				function(response) {
					var recoverylist = JSON.parse(response);
					if (recoverylist != null) {
						for (var i=0;i < recoverylist.length;i++) {
							if (recoverylist[i].itemid != null) {
								dGet("wtw_deleteditemslist").innerHTML += "<div id=\"wtw_brecover" + recoverylist[i].itemid + "\" name=\"wtw_brecover" + recoverylist[i].itemid + "\" onclick=\"WTW.recoverMold('" + recoverylist[i].itemid + "','" + recoverylist[i].itemtype + "');\" style='cursor: pointer;' class='wtw-menulevel2'>Recover '" + recoverylist[i].item + "'</div>\r\n";
							}
						}
					}
					WTW.setWindowSize();
				}
			);
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-openRecoverItems=" + ex.message);
	}
}

WTWJS.prototype.recoverMold = function(zmoldid, zmoldtype) {
	/* mold selected for recovery, undo the delete flag and add the mold back into the 3D Scene for edit */
	try {
		switch (zmoldtype) {
			case "communitymolds":
				var zrequest = {
					'communityid': communityid,
					'buildingid': buildingid,
					'thingid': thingid,
					'moldid': zmoldid,
					'deleted': '0',
					'function':'deletemold'
				};
				WTW.postJSON("/core/handlers/molds.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
					}
				);
				var communityind = -1;
				WTW.getJSON("/connect/communitymoldsrecover.php?communityid=" + communityid + "&communityind=" + communityind + "&communitymoldid=" + zmoldid, 
					function(response) {
						var communitymold = JSON.parse(response);
						var moldgroup = "community";
						var moldind = WTW.getNextCount(WTW.communitiesMolds);
						if (communitymold != null) {
							if (communitymold.molds[0] != null) {
								WTW.communitiesMolds[moldind] = communitymold.molds[0];
							}
						}
						if (WTW.communitiesMolds[moldind] != null) {
							WTW.communitiesMolds[moldind].moldind = moldind;
							WTW.communitiesMolds[moldind].connectinggridid = dGet('wtw_tconnectinggridid').value;
							WTW.communitiesMolds[moldind].connectinggridind = Number(dGet('wtw_tconnectinggridind').value);
							WTW.communitiesMolds[moldind].parentname = "connectinggrids-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "--";
							WTW.communitiesMolds[moldind].moldname = "communitymolds-" + moldind + "-" + WTW.communitiesMolds[moldind].moldid + "-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "-" + WTW.communitiesMolds[moldind].shape;
							WTW.communitiesMolds[moldind].shown = "0";
							WTW.openMoldForm(moldind,WTW.communitiesMolds[moldind].shape,moldgroup);
						}
						WTW.setWindowSize();
					}
				);			
				break;		
			case "buildingmolds":
				var zrequest = {
					'communityid': communityid,
					'buildingid': buildingid,
					'thingid': thingid,
					'moldid': zmoldid,
					'deleted': '0',
					'function':'deletemold'
				};
				WTW.postJSON("/core/handlers/molds.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
					}
				);
				var buildingind = WTW.getBuildingInd(buildingid);
				WTW.getJSON("/connect/buildingmoldsrecover.php?buildingid=" + buildingid + "&buildingind=" + buildingind + "&buildingmoldid=" + zmoldid, 
					function(response) {
						var buildingmold = JSON.parse(response);
						var moldgroup = "building";
						var moldind = WTW.getNextCount(WTW.buildingMolds);
						if (buildingmold != null) {
							if (buildingmold.molds[0] != null) {
								WTW.buildingMolds[moldind] = buildingmold.molds[0];
							}
						}
						if (WTW.buildingMolds[moldind] != null) {
							WTW.buildingMolds[moldind].moldind = moldind;
							WTW.buildingMolds[moldind].connectinggridid = dGet('wtw_tconnectinggridid').value;
							WTW.buildingMolds[moldind].connectinggridind = Number(dGet('wtw_tconnectinggridind').value);
							WTW.buildingMolds[moldind].parentname = "connectinggrids-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "--";
							WTW.buildingMolds[moldind].moldname = "buildingmolds-" + moldind + "-" + WTW.buildingMolds[moldind].moldid + "-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "-" + WTW.buildingMolds[moldind].shape;
							WTW.buildingMolds[moldind].shown = "0";
							WTW.openMoldForm(moldind,WTW.buildingMolds[moldind].shape,moldgroup);
						}
						WTW.setWindowSize();
					}
				);
				break;
			case "thingmolds":
				var zrequest = {
					'communityid': communityid,
					'buildingid': buildingid,
					'thingid': thingid,
					'moldid': zmoldid,
					'deleted': '0',
					'function':'deletemold'
				};
				WTW.postJSON("/core/handlers/molds.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
					}
				);
				var thingind = WTW.getThingInd(thingid);
				WTW.getJSON("/connect/thingmoldsrecover.php?thingid=" + thingid + "&thingind=" + thingind + "&thingmoldid=" + zmoldid, 
					function(response) {
						var thingmold = JSON.parse(response);
						var moldgroup = "thing";
						var moldind = WTW.getNextCount(WTW.thingMolds);
						if (thingmold != null) {
							if (thingmold.molds[0] != null) {
								WTW.thingMolds[moldind] = thingmold.molds[0];
							}
						}
						if (WTW.thingMolds[moldind] != null) {
							WTW.thingMolds[moldind].moldind = moldind;
							WTW.thingMolds[moldind].connectinggridid = dGet('wtw_tconnectinggridid').value;
							WTW.thingMolds[moldind].connectinggridind = Number(dGet('wtw_tconnectinggridind').value);
							WTW.thingMolds[moldind].parentname = "connectinggrids-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "--";
							WTW.thingMolds[moldind].moldname = "thingmolds-" + moldind + "-" + WTW.thingMolds[moldind].moldid + "-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "-" + WTW.thingMolds[moldind].shape;
							WTW.thingMolds[moldind].shown = "0";
							WTW.openMoldForm(moldind,WTW.thingMolds[moldind].shape,moldgroup);
						}
						WTW.setWindowSize();
					}
				);
				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-recoverMold=" + ex.message);
	}
}


/* create a duplicate Mold (shape) */

WTWJS.prototype.createDuplicateShape = function() {
	/* when editing a mold, near the bottom of the form is a link to create a duplicate shape */
	/* when clicked, a new mold is created in front of the camera with a new (x,z) coordinate, iid, and index value */
	/* the rest of the settings including texture selections are copied to the new mold */
	try {
		var originalmoldind = Number(dGet('wtw_tmoldind').value);
		var shape = dGet('wtw_tmoldshape').value;
		var moldgroup = dGet('wtw_tmoldmoldgroup').value;
		var molds = null;
		var mold = null;
		var moldind = -1;
		var moldid = WTW.getRandomString(16);
		var coords = WTW.getNewCoordinates(50);
		var positionX = coords.positionX;
		var positionY = coords.positionY;
		var positionZ = coords.positionZ;
		var rotationY = coords.rotationY;
		switch (moldgroup) {
			case "community":
				molds = WTW.communitiesMolds;
				break;
			case "building":
				molds = WTW.buildingMolds;
				break;
			case "thing":
				positionX = 0;
				positionZ = 0;
				molds = WTW.thingMolds;
				break;
		}
		if (molds != null) {
			moldind = WTW.getNextCount(molds);
			molds[moldind] = JSON.parse(JSON.stringify(molds[originalmoldind]));
			molds[moldind].moldid = moldid;
			molds[moldind].moldind = moldind;
			molds[moldind].actionzoneid = "";
			molds[moldind].actionzoneind = "";
			molds[moldind].position.x = positionX;
			molds[moldind].position.z = positionZ;
			molds[moldind].moldname = moldgroup + "molds-" + moldind + "-" + moldid + "-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "-" + molds[moldind].shape;
			molds[moldind].parentname = "connectinggrids-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "--";
			molds[moldind].connectinggridid = dGet('wtw_tconnectinggridid').value;
			molds[moldind].connectinggridind = dGet('wtw_tconnectinggridind').value;
			molds[moldind].shown = "0";
			WTW.setShownMolds();
			dGet('wtw_tmoldind').value = moldind;
			dGet('wtw_tmoldid').value = moldid;
			WTW.openMoldForm(moldind,shape,moldgroup,false);
		}
		dGet('wtw_tmoldpositionx').value = positionX;
		dGet('wtw_tmoldpositionz').value = positionZ;
		dGet('wtw_tmoldactionzoneid').value = "";
		dGet('wtw_tmoldcsgaction').selectedIndex = 0;
		dGet('wtw_tmoldcsgmoldid').value = "";
		WTW.setWindowSize();
		window.setTimeout(function() {
			WTW.setNewMold();
		},200);
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-createDuplicateShape=" + ex.message);
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
			var moldind = -1;
			var moldid = "";
			var shape = "";
			var moldgroup = dGet('wtw_tmoldmoldgroup').value;
			var moldname = mold.name;
			var namepart;
			var molds = null;
			if (moldname.indexOf("-") > -1) {
				namepart = moldname.split('-');
			}			
			if (WTW.isNumeric(namepart[1])) {
				if (namepart[0].indexOf("buildingmolds") > -1 && moldgroup == "building") {
					molds = WTW.buildingMolds;
				} else if (namepart[0].indexOf("thingmolds") > -1 && moldgroup == "thing") {
					molds = WTW.thingMolds;
				} else if (namepart[0].indexOf("communitymolds") > -1 && moldgroup == "community") {
					molds = WTW.communitiesMolds;
				}
				if (molds != null) {
					moldind = Number(namepart[1]);
					moldid = molds[moldind].moldid;
					dGet('wtw_tmoldcsgmoldid').value = moldid;
					shape = namepart[5];
					WTW.setCSGCount(moldid);
				}
			}
			if (moldid != "") {
				WTW.hilightMoldFast(moldname,'yellow');
				dGet('wtw_selectedcsgshape').innerHTML = "";
				dGet('wtw_selectedcsgshape').innerHTML += "<div class='wtw-secondcolcontent' onmouseover=\"WTW.hilightMold('" + moldname + "','yellow');\" onmouseout=\"WTW.unhilightMold('" + moldname + "');\">Merge with (" + shape + ") &nbsp;&nbsp;&nbsp;&nbsp; <a href='#' onclick=\"WTW.removeMerge('" + moldname + "')\">Remove</a></div><br /><br />";
				dGet('wtw_bselectcsgshape').innerHTML = "Change Shape to Merge";
			} else {
				WTW.removeMerge(moldname);
			}
		}
		WTW.selectMergePart(2); 
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-addMergePart=" + ex.message);
	}
}

WTWJS.prototype.removeMerge = function(moldname) {
	/* remove a merge from a mold will undo a combine, subtract, or intersect */
	try {
		var oldcsgmainid = dGet('wtw_tmoldcsgmoldid').value;
		var csgmainind = -1; 
		var csgchildind = -1;
		var moldind = -1;
		var namepart;
		var molds = null;
		var moldgroup = dGet('wtw_tmoldmoldgroup').value;
		WTW.setDDLValue('wtw_tmoldcsgaction', ''); 
		dGet('wtw_tmoldcsgmoldid').value = "";
		dGet('wtw_selectedcsgshape').innerHTML = "";
		dGet('wtw_bselectcsgshape').innerHTML = "Pick Shape to Merge";
		if (moldname.indexOf("-") > -1) {
			namepart = moldname.split('-');
		}			
		if (WTW.isNumeric(namepart[1])) {
			if (namepart[0].indexOf("buildingmolds") > -1 && moldgroup == "building") {
				molds = WTW.buildingMolds;
			} else if (namepart[0].indexOf("thingmolds") > -1 && moldgroup == "thing") {
				molds = WTW.thingMolds;
			} else if (namepart[0].indexOf("communitymolds") > -1 && moldgroup == "community") {
				molds = WTW.communitiesMolds;
			}
			if (molds != null) {
				moldind = Number(dGet('wtw_tmoldind').value);
				molds[moldind].csg.moldid = "";
				molds[moldind].covering = "color";
				molds[moldind].opacity = "100";
				molds[moldind].shown = "0";
			}
		}	
		if (oldcsgmainid != "") {
			csgmainind = WTW.getMoldInd(molds, oldcsgmainid, dGet('wtw_tconnectinggridind').value);
			if (molds[csgmainind] != null) {
				WTW.setCSGCount(oldcsgmainid);
				if (molds[csgmainind].shown != undefined) {
					molds[csgmainind].shown = "0";
				}
				if (molds[csgmainind].moldname != undefined) {
					WTW.disposeClean(molds[csgmainind].moldname);
				}
			}
		}
		WTW.disposeClean(moldname);
		WTW.setShownMolds();
		WTW.setNewMold();
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-removeMerge=" + ex.message);
	}
}

WTWJS.prototype.selectMergePart = function(w) {
	/* select the mold to merge with hte currently edited mold */
	try {
		if (w == 2) {
			WTW.pick = 0;
			dGet('wtw_bselectcsgshape').innerHTML = "Pick Shape to Merge";
		} else {
			WTW.pick = 2;
			dGet('wtw_bselectcsgshape').innerHTML = "Cancel Pick Shape";
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-selectMergePart=" + ex.message);
	}
}

WTWJS.prototype.checkMoldTextureCSG = function() {
	/* check the mold texture for the new mold to be created after merge */
	try {
		if (dGet('wtw_tmoldcsgaction').selectedIndex == 0) {
			WTW.show('wtw_moldtexturesetdiv');
			WTW.show('wtw_moldbasictexturesetdiv');
			WTW.show('wtw_moldbasictextureset2div');
			dGet('wtw_tmoldcsgmoldid').value = "";
		} else {
			WTW.hide('wtw_moldtexturesetdiv');
			WTW.hide('wtw_moldbasictexturesetdiv');
			WTW.hide('wtw_moldbasictextureset2div');
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-checkMoldTextureCSG=" + ex.message);
	}
}

WTWJS.prototype.setCSGCount = function(csgmainid) {
	/* see if there are any molds requiring merge with the currently edited mold */
	try {
		var count = 0;
		var csgmainind = -1;
		var moldgroup = "community";
		var molds = WTW.communitiesMolds;
		if (buildingid != "") {
			moldgroup = "building";
			molds = WTW.buildingMolds;
		} else if (thingid != "") {
			moldgroup = "thing";
			molds = WTW.thingMolds;
		}
		for (var i=0; i < molds.length; i++) {
			if (molds[i] != null) {
				var csgmoldid = molds[i].csg.moldid;
				if (csgmoldid == csgmainid) {
					count += 1;
				}
				if (molds[i].moldid == csgmainid) {
					csgmainind = i;
				}
			}
		}
		if (molds[csgmainind] != null) {
			if (molds[csgmainind].csg.count != undefined) {
				molds[csgmainind].csg.count = count;
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-setCSGCount=" + ex.message);
	}
}

WTWJS.prototype.getNewCoordinates = function(dist) {
	/* when a new mold is created, the coordinates use the current position of the avatar (or camera if detatched) */
	/* and provide new coordinates (and rotation towards the user/camera) at a particular distance in front of the avatar or camera */
	var positionX = 0;
	var positionY = 0;
	var positionZ = 0;
	var rotationY = 0.00;
	try {
		if (WTW.cameraFocus == 1) {
			rotationY = WTW.getDegrees(WTW.myAvatar.rotation.y);
			positionY = Math.round(WTW.myAvatar.position.y);
			positionX = Math.round((WTW.myAvatar.position.x + dist * Math.cos(WTW.myAvatar.rotation.y)));
			positionZ = Math.round((WTW.myAvatar.position.z - dist * Math.sin(WTW.myAvatar.rotation.y)));
		} else {
			rotationY = WTW.getDegrees(WTW.camera.rotation.y) - 90;
			var adjrot = WTW.getRadians(rotationY);
			positionY = Math.round(WTW.camera.position.y);
			positionX = Math.round((WTW.camera.position.x + dist * Math.cos(adjrot)));
			positionZ = Math.round((WTW.camera.position.z - dist * Math.sin(adjrot)));
		}
		rotationY = WTW.cleanDegrees(rotationY);
		if (rotationY > 135 && rotationY < 225) {
			rotationY = 90.00;
		} else if (rotationY >= 225 && rotationY < 315) {
			rotationY = 180.00;
		} else if ((rotationY >= 315 && rotationY <= 360) || (rotationY >= 0 && rotationY < 45)) {
			rotationY = -90.00;
		} else {
			rotationY = 0.00;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-getNewCoordinates=" + ex.message);
	}
	return {
		positionX : positionX.toFixed(2),
		positionY : positionY.toFixed(2),
		positionZ : positionZ.toFixed(2),
		rotationY : rotationY
	};
}

WTWJS.prototype.openColorSelector = function() {
	/* when form uses color as a texture, the color wheels are opened and set to the current color settings */
	/* typical colors are a combination of emissive, diffuse, and specular color settings */
	try {
		var molds = null;
		var moldind = -1;
		if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
			moldind = Number(dGet('wtw_tmoldind').value);
		}
		switch (dGet('wtw_tmoldmoldgroup').value) {
			case "community":
				molds = WTW.communitiesMolds;
				break;
			case "thing":
				molds = WTW.thingMolds;
				break;
			default:
				molds = WTW.buildingMolds;
				break;
		}
		var moldname = dGet('wtw_tmoldmoldgroup').value + "molds-" + dGet('wtw_tmoldind').value + "-" + dGet('wtw_tmoldid').value + "-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "-" + dGet('wtw_tmoldshape').value;
		dGet('wtw_tmoldname').value = moldname;
		var mold = scene.getMeshByID(moldname);
		if (mold != null) {
			try {
				if (mold.material != undefined && mold.material != null) {
					WTW.disposeDirectionalTexture(mold);
						if (mold.material.diffuseTexture != undefined) {
							if (mold.material.diffuseTexture != null) {
								mold.material.diffuseTexture.dispose();
								mold.material.diffuseTexture = null;
							}
						}
					mold.material.dispose();
					mold.material = null;
				}
			} catch (ex) {}
			var covering = new BABYLON.StandardMaterial("mat" + moldname, scene);
			if (molds[moldind] != null) {
				covering.specularColor = new BABYLON.Color3(Number(molds[moldind].color.specular.r), Number(molds[moldind].color.specular.g), Number(molds[moldind].color.specular.b));
				covering.emissiveColor = new BABYLON.Color3(Number(molds[moldind].color.emissive.r), Number(molds[moldind].color.emissive.g), Number(molds[moldind].color.emissive.b));
				covering.diffuseColor = new BABYLON.Color3(Number(molds[moldind].color.diffuse.r), Number(molds[moldind].color.diffuse.g), Number(molds[moldind].color.diffuse.b));	
				if (molds[moldind].covering == 'marble') {
					if (molds[moldind].opacity != undefined) {
						if (WTW.isNumeric(molds[moldind].opacity)) {
							opacity = Number(molds[moldind].opacity) / 100;
							if (opacity > 1) {
								opacity = 1;
							} else if (opacity < 0) {
								opacity = 0;
							}
						}
					}
					var max = Math.max(Number(molds[moldind].scaling.x), Number(molds[moldind].scaling.y), Number(molds[moldind].scaling.z));
					var uscale = 1/max;
					var vscale = 1/max;
					if (WTW.isNumeric(molds[moldind].graphics.uscale)) {
						if (Number(molds[moldind].graphics.uscale) > 0) {
							uscale = Number(molds[moldind].graphics.uscale);
						}
					}
					if (WTW.isNumeric(molds[moldind].graphics.vscale)) {
						if (Number(molds[moldind].graphics.vscale) > 0) {
							vscale = Number(molds[moldind].graphics.vscale);
						}
					}
					if (uscale < 1) {
						uscale = 1;
					}
					if (vscale < 1) {
						vscale = 1;
					}
					covering.alpha = opacity;
					var marbleTexture = new BABYLON.MarbleProceduralTexture("matmarbletex" + moldname, 512, scene);
					marbleTexture.numberOfTilesHeight = Number(uscale).toFixed(0);
					marbleTexture.numberOfTilesWidth = Number(vscale).toFixed(0);
					covering.ambientTexture = marbleTexture;
				}
				mold.material = covering;
				dGet('wtw_tspecularcolorr').value = molds[moldind].color.specular.r;
				dGet('wtw_tspecularcolorg').value = molds[moldind].color.specular.g;
				dGet('wtw_tspecularcolorb').value = molds[moldind].color.specular.b;
				dGet('wtw_temissivecolorr').value = molds[moldind].color.emissive.r;
				dGet('wtw_temissivecolorg').value = molds[moldind].color.emissive.g;
				dGet('wtw_temissivecolorb').value = molds[moldind].color.emissive.b;
				dGet('wtw_tdiffusecolorr').value = molds[moldind].color.diffuse.r;
				dGet('wtw_tdiffusecolorg').value = molds[moldind].color.diffuse.g;
				dGet('wtw_tdiffusecolorb').value = molds[moldind].color.diffuse.b;
			} else {
				covering.specularColor = new BABYLON.Color3(1, 1, 1);
				covering.emissiveColor = new BABYLON.Color3(1, 1, 1);
				covering.diffuseColor = new BABYLON.Color3(1, 1, 1);	
				mold.material = covering;
				dGet('wtw_tspecularcolorr').value = 1;
				dGet('wtw_tspecularcolorg').value = 1;
				dGet('wtw_tspecularcolorb').value = 1;
				dGet('wtw_temissivecolorr').value = 1;
				dGet('wtw_temissivecolorg').value = 1;
				dGet('wtw_temissivecolorb').value = 1;
				dGet('wtw_tdiffusecolorr').value = 1;
				dGet('wtw_tdiffusecolorg').value = 1;
				dGet('wtw_tdiffusecolorb').value = 1;
			}
			if (WTW.guiAdminColors == null) {
				WTW.guiAdminColors = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
				var panel = new BABYLON.GUI.StackPanel();
				panel.width = "200px";
				panel.isVertical = true;
				panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
				panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
				WTW.guiAdminColors.addControl(panel);

				var textdiffuse = new BABYLON.GUI.TextBlock();
				textdiffuse.text = "Diffuse color:";
				textdiffuse.height = "30px";
				panel.addControl(textdiffuse);     

				var diffuse = new BABYLON.GUI.ColorPicker();
				diffuse.value = covering.diffuseColor;
				diffuse.height = "150px";
				diffuse.width = "150px";
				diffuse.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
				diffuse.onValueChangedObservable.add(function(value) {
					if (value != null) {
						WTW.setColor(dGet('wtw_tmoldname').value, 'diffuse', value.r, value.g, value.b);
						dGet('wtw_tdiffusecolorr').value = value.r;
						dGet('wtw_tdiffusecolorg').value = value.g;
						dGet('wtw_tdiffusecolorb').value = value.b;
						WTW.pluginsOpenColorSelector(dGet('wtw_tmoldname').value, molds[moldind].shape, 'diffuse');
					}
				});
				panel.addControl(diffuse); 
				
				var textspecular = new BABYLON.GUI.TextBlock();
				textspecular.text = "Specular color:";
				textspecular.height = "30px";
				panel.addControl(textspecular);     

				var specular = new BABYLON.GUI.ColorPicker();
				specular.value = covering.specularColor;
				specular.height = "150px";
				specular.width = "150px";
				specular.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
				specular.onValueChangedObservable.add(function(value) {
					if (value != null) {
						WTW.setColor(dGet('wtw_tmoldname').value, 'specular', value.r, value.g, value.b);
						dGet('wtw_tspecularcolorr').value = value.r;
						dGet('wtw_tspecularcolorg').value = value.g;
						dGet('wtw_tspecularcolorb').value = value.b;
						WTW.pluginsOpenColorSelector(dGet('wtw_tmoldname').value, molds[moldind].shape, 'emissive');
					}
				});
				panel.addControl(specular); 

				var textemissive = new BABYLON.GUI.TextBlock();
				textemissive.text = "Emissive color:";
				textemissive.height = "30px";
				panel.addControl(textemissive);     

				var emissive = new BABYLON.GUI.ColorPicker();
				emissive.value = covering.emissiveColor;
				emissive.height = "150px";
				emissive.width = "150px";
				emissive.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
				emissive.onValueChangedObservable.add(function(value) { 
					if (value != null) {
						WTW.setColor(dGet('wtw_tmoldname').value, 'emissive', value.r, value.g, value.b);
						dGet('wtw_temissivecolorr').value = value.r;
						dGet('wtw_temissivecolorg').value = value.g;
						dGet('wtw_temissivecolorb').value = value.b;
						WTW.pluginsOpenColorSelector(dGet('wtw_tmoldname').value, molds[moldind].shape, 'emissive');
					}
				});
				panel.addControl(emissive);
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-openColorSelector=" + ex.message);
	}
}

WTWJS.prototype.setColor = function(moldname, colorgroup, r, g, b) {
	/* set color after change is made on the color wheels */
	try {
		var covering = scene.getMaterialByID("mat" + moldname);
		if (covering != null) {
			switch (colorgroup) {
				case "diffuse":
					covering.diffuseColor = new BABYLON.Color3(r,g,b);
					break;
				case "specular":
					covering.specularColor = new BABYLON.Color3(r,g,b);
					break;
				case "emissive":
					covering.emissiveColor = new BABYLON.Color3(r,g,b);
					break;
			}
			var mold = scene.getMeshByID(moldname);
			if (mold != null) {
				mold.material = covering;
			}
		}
		var molds = null;
		var moldind = -1;
		if (WTW.isNumeric(dGet('wtw_tmoldind').value)) {
			moldind = Number(dGet('wtw_tmoldind').value);
		}
		switch (dGet('wtw_tmoldmoldgroup').value) {
			case "community":
				molds = WTW.communitiesMolds;
				break;
			case "thing":
				molds = WTW.thingMolds;
				break;
			default:
				molds = WTW.buildingMolds;
				break;
		}
		if (molds[moldind] != null) {
			switch (colorgroup) {
				case "diffuse":
					molds[moldind].color.diffuse.r = r;
					molds[moldind].color.diffuse.g = g;
					molds[moldind].color.diffuse.b = b;
					dGet('wtw_tdiffusecolorr').value = r;
					dGet('wtw_tdiffusecolorg').value = g;
					dGet('wtw_tdiffusecolorb').value = b;
					break;
				case "specular":
					molds[moldind].color.specular.r = r;
					molds[moldind].color.specular.g = g;
					molds[moldind].color.specular.b = b;
					dGet('wtw_tspecularcolorr').value = r;
					dGet('wtw_tspecularcolorg').value = g;
					dGet('wtw_tspecularcolorb').value = b;
					break;
				case "emissive":
					molds[moldind].color.emissive.r = r;
					molds[moldind].color.emissive.g = g;
					molds[moldind].color.emissive.b = b;
					dGet('wtw_temissivecolorr').value = r;
					dGet('wtw_temissivecolorg').value = g;
					dGet('wtw_temissivecolorb').value = b;
					break;
			}
		}
		/* WTW.resetMoldsOpacity(); */
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-setColor=" + ex.message);
	}
}

WTWJS.prototype.closeColorSelector = function() {
	/* close and dispose color selector after use */
	try {
		if (WTW.guiAdminColors != null) {
			WTW.guiAdminColors.dispose();
			WTW.guiAdminColors = null;
		}
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-closeColorSelector=" + ex.message);
	}
}


/* the following process is designed to update the mold appearance directly while you are editing it */

WTWJS.prototype.setNewMold = function(rebuildmold) {
	/* use the form settings to redraw the mold */
	/* rebuildmold as true would force the mold to be deleted and rebuilt - some changes may require this anyways (set below) */
	try {
		if (rebuildmold == undefined) {
			rebuildmold = 0;
		}
		var moldname = "";
		var moldgroup = "";
		var molds = null;
		var moldid = dGet('wtw_tmoldid').value;
		var moldind = Number(dGet('wtw_tmoldind').value);
		var shape = dGet('wtw_tmoldshape').value;
		var coveringname = "texture";
		switch (dGet('wtw_tmoldmoldgroup').value) {
			case "community":
				moldgroup = "community";
				molds = WTW.communitiesMolds;
				break;
			case "thing":
				moldgroup = "thing";
				molds = WTW.thingMolds;
				break;
			default:
				moldgroup = "building";
				molds = WTW.buildingMolds;
				break;
		}
		moldname = moldgroup + "molds-" + dGet('wtw_tmoldind').value + "-" + dGet('wtw_tmoldid').value + "-" + dGet('wtw_tconnectinggridind').value + "-" + dGet('wtw_tconnectinggridid').value + "-" + shape;
		if (moldname != "") {
			var posx = 0;
			var posy = 0;
			var posz = 0;
			var rotx = 0;
			var roty = 0;
			var rotz = 0;
			var lenx = 1;
			var leny = 1;
			var lenz = 1;
			var special1 = 0;
			var special2 = 0;
			var uoffset = 0;
			var voffset = 0;
			var uscale = 0;
			var vscale = 0;
			var opacity = 0;
			var subdivisions = 2;
			var maxheight = 70;
			var iswaterreflection = "0";
			var alphamold = 1;
			var mold = scene.getMeshByID(moldname);
			var moldparent = null;
			var parentname = "";
			if (mold != null) {
				try {
					moldparent = mold.parent;
					parentname = moldparent.name;
				} catch (ex) {}
			}
			if (mold != null && molds[moldind] != null) {
				if (WTW.isNumeric(dGet('wtw_tmoldsubdivisions').value)) {
					if (Number(dGet('wtw_tmoldsubdivisions').value) < 2) {
						dGet('wtw_tmoldsubdivisions').value = "2.00";
					}
					subdivisions = Number(dGet('wtw_tmoldsubdivisions').value);
				}			
				if (molds[moldind].subdivisions != subdivisions) {
					molds[moldind].subdivisions = subdivisions;
					rebuildmold = 1;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldmaxheight').value)) {
					if (Number(dGet('wtw_tmoldmaxheight').value) < 0) {
						dGet('wtw_tmoldmaxheight').value = "0.00";
					}
					maxheight = Number(dGet('wtw_tmoldmaxheight').value);
					molds[moldind].graphics.heightmap.maxheight = maxheight;
				}			
				if (dGet('wtw_tmoldcovering').options[dGet('wtw_tmoldcovering').selectedIndex] != undefined) {
					coveringname = dGet('wtw_tmoldcovering').options[dGet('wtw_tmoldcovering').selectedIndex].value;
				}
				dGet('wtw_pointlist1').innerHTML = "";
				dGet('wtw_pointlist2').innerHTML = "";
				if (shape == "image") {
					coveringname = "hidden";
					molds[moldind].graphics.webimages[0].imageid = dGet('wtw_tmoldaddimageid').value;
					molds[moldind].graphics.webimages[0].imagehoverid = dGet('wtw_tmoldaddimagehoverid').value;
					rebuildmold = 1;
				} else if (shape == "terrain") {
                    rebuildmold = 1;
                } else if (shape == "video") {
                    //rebuildmold = 1;
                } else if (shape == "tube") {
					rebuildmold = 1;
					var pointind = -1;
					if (WTW.isNumeric(dGet('wtw_teditpointindex').value)) {
						pointind = dGet('wtw_teditpointindex').value;
					}
					if (pointind > -1) {
						if (molds[moldind].paths.path1[pointind] == null) {
							molds[moldind].paths.path1[pointind] = WTW.newPathPoint();
							molds[moldind].paths.path1[pointind].sorder = pointind;
						}
						if (WTW.isNumeric(dGet('wtw_tpointpositionx').value)) {
							molds[moldind].paths.path1[pointind].x = dGet('wtw_tpointpositionx').value;
						}
						if (WTW.isNumeric(dGet('wtw_tpointpositiony').value)) {
							molds[moldind].paths.path1[pointind].y = dGet('wtw_tpointpositiony').value;
						}
						if (WTW.isNumeric(dGet('wtw_tpointpositionz').value)) {
							molds[moldind].paths.path1[pointind].z = dGet('wtw_tpointpositionz').value;
						}
					}
					WTW.loadPointList(molds[moldind].paths.path1, 1);
				}
				if (dGet('wtw_tmoldcoveringold').value == "") {
					dGet('wtw_tmoldcoveringold').value = coveringname;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldscalingx').value)) {
					if (Number(dGet('wtw_tmoldscalingx').value) < .01) {
						dGet('wtw_tmoldscalingx').value = ".01";
					}
					lenx = Number(dGet('wtw_tmoldscalingx').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldscalingy').value)) {
					if (Number(dGet('wtw_tmoldscalingy').value) < .01) {
						dGet('wtw_tmoldscalingy').value = ".01";
					}
					leny = Number(dGet('wtw_tmoldscalingy').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldscalingz').value)) {
					if (Number(dGet('wtw_tmoldscalingz').value) < .01) {
						dGet('wtw_tmoldscalingz').value = ".01";
					}
					lenz = Number(dGet('wtw_tmoldscalingz').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldspecial1').value)) {
					special1 = Number(dGet('wtw_tmoldspecial1').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldspecial2').value)) {
					special2 = Number(dGet('wtw_tmoldspecial2').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmolduoffset').value)) {
					uoffset = Number(dGet('wtw_tmolduoffset').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldvoffset').value)) {
					voffset = Number(dGet('wtw_tmoldvoffset').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmolduscale').value)) {
					uscale = Number(dGet('wtw_tmolduscale').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldvscale').value)) {
					vscale = Number(dGet('wtw_tmoldvscale').value);
				}
				if (WTW.isNumeric(dGet('wtw_tmoldopacity').value)) {
					opacity = Number(dGet('wtw_tmoldopacity').value);
				}
				if (opacity < 0) {
					opacity = 0;
				}
				if (opacity > 100) {
					opacity = 100;
				}
				dGet('wtw_tmoldopacity').value = (opacity.toFixed(2));
				if (coveringname == "glass") {
					molds[moldind].graphics.texture.id = "";
					molds[moldind].graphics.texture.path = "";
					molds[moldind].graphics.texture.bumpid = "";
					molds[moldind].graphics.texture.bumppath = "";
					dGet('wtw_tmoldtextureid').value = "";
					dGet('wtw_tmoldtexturepath').value = "";
					dGet('wtw_tmoldtexturebumpid').value = "";
					dGet('wtw_tmoldtexturebumppath').value = "";
					opacity = .2;
				}
				if (molds[moldind].scaling.special1 != special1) {
					molds[moldind].scaling.special1 = special1;
					rebuildmold = 1;
				}
				if (molds[moldind].scaling.special2 != special2) {
					molds[moldind].scaling.special2 = special2;
					rebuildmold = 1;
				}
				if (molds[moldind].graphics.uoffset != uoffset) {
					molds[moldind].graphics.uoffset = uoffset;
					//rebuildmold = 1;
				}
				if (molds[moldind].graphics.voffset != voffset) {
					molds[moldind].graphics.voffset = voffset;
					//rebuildmold = 1;
				}
				if (molds[moldind].graphics.uscale != uscale) {
					molds[moldind].graphics.uscale = uscale;
					rebuildmold = 1;
				}
				if (molds[moldind].graphics.vscale != vscale) {
					molds[moldind].graphics.vscale = vscale;
					rebuildmold = 1;
				}
				molds[moldind].opacity = opacity;
				molds[moldind].scaling.x = lenx;
				molds[moldind].scaling.y = leny;
				molds[moldind].scaling.z = lenz;
				mold.scaling.x = lenx;
				mold.scaling.y = leny;
				mold.scaling.z = lenz;
				posx = molds[moldind].position.x;
				posy = molds[moldind].position.y;
				posz = molds[moldind].position.z;
				if (dGet('wtw_tmoldwaterreflection').checked == true) {
					molds[moldind].graphics.waterreflection = "1";
				} else {
					molds[moldind].graphics.waterreflection = "0";
				}
				if (WTW.isNumeric(dGet('wtw_tmoldpositionx').value)) {
					posx = Number(dGet('wtw_tmoldpositionx').value);
				} else {
					dGet('wtw_tmoldpositionx').value = posx;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldpositiony').value)) {
					posy = Number(dGet('wtw_tmoldpositiony').value);
				} else {
					dGet('wtw_tmoldpositiony').value = posy;
				}
				if (WTW.isNumeric(dGet('wtw_tmoldpositionz').value)) {
					posz = Number(dGet('wtw_tmoldpositionz').value);
				} else {
					dGet('wtw_tmoldpositionz').value = posz;
				}
				molds[moldind].position.x = posx;
				molds[moldind].position.y = posy;
				molds[moldind].position.z = posz;
				molds[moldind].color.specular.r = dGet('wtw_tspecularcolorr').value;
				molds[moldind].color.specular.g = dGet('wtw_tspecularcolorg').value;
				molds[moldind].color.specular.b = dGet('wtw_tspecularcolorb').value;
				molds[moldind].color.emissive.r = dGet('wtw_temissivecolorr').value;
				molds[moldind].color.emissive.g = dGet('wtw_temissivecolorg').value;
				molds[moldind].color.emissive.b = dGet('wtw_temissivecolorb').value;
				molds[moldind].color.diffuse.r = dGet('wtw_tdiffusecolorr').value;
				molds[moldind].color.diffuse.g = dGet('wtw_tdiffusecolorg').value;
				molds[moldind].color.diffuse.b = dGet('wtw_tdiffusecolorb').value;
				if (mold.material != undefined) {
					mold.material.specularColor = new BABYLON.Color3(Number(molds[moldind].color.specular.r), Number(molds[moldind].color.specular.g), Number(molds[moldind].color.specular.b));
					mold.material.diffuseColor = new BABYLON.Color3(Number(molds[moldind].color.diffuse.r), Number(molds[moldind].color.diffuse.g), Number(molds[moldind].color.diffuse.b));	
					mold.material.emissiveColor = new BABYLON.Color3(Number(molds[moldind].color.emissive.r), Number(molds[moldind].color.emissive.g), Number(molds[moldind].color.emissive.b));
				}
				if (molds[moldind].covering == "color" || molds[moldind].covering == "marble") {
					var moldimageframename = moldname + "-imageframe";
					var moldimageframe = scene.getMeshByID(moldimageframename);
					if (moldimageframe != null) {	
						if (moldimageframe.material != undefined) {
							moldimageframe.material.specularColor = new BABYLON.Color3(Number(molds[moldind].color.specular.r), Number(molds[moldind].color.specular.g), Number(molds[moldind].color.specular.b));
							moldimageframe.material.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
							moldimageframe.material.diffuseColor = new BABYLON.Color3(Number(molds[moldind].color.diffuse.r), Number(molds[moldind].color.diffuse.g), Number(molds[moldind].color.diffuse.b));	
						}
					}
				}
				if (parentname.indexOf("actionzone") > -1) {
					var actionzoneparts = parentname.split('-');
					var actionzoneind = Number(actionzoneparts[1]);
					if (WTW.actionZones[actionzoneind].actionzonetype.indexOf("seat") > -1) {
						var actionzoneaxlebase2 = scene.getMeshByID("actionzoneaxlebase2-" + actionzoneind.toString() + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
						if (actionzoneaxlebase2 != null) {
//							posx -= actionzoneaxlebase2.position.x;
//							posy -= actionzoneaxlebase2.position.y;
//							posz -= actionzoneaxlebase2.position.z;
						}
					} else {
						var actionzoneaxlebase = scene.getMeshByID("actionzoneaxlebase-" + actionzoneind.toString() + "-" + WTW.actionZones[actionzoneind].actionzoneid + "-" + WTW.actionZones[actionzoneind].connectinggridind + "-" + WTW.actionZones[actionzoneind].connectinggridid + "-" + WTW.actionZones[actionzoneind].actionzonetype);
						if (actionzoneaxlebase != null) {
							posx -= actionzoneaxlebase.position.x;
							posy -= actionzoneaxlebase.position.y;
							posz -= actionzoneaxlebase.position.z;
						}
					}
				}
				mold.position.x = posx;
				mold.position.y = posy;
				mold.position.z = posz;
				if (WTW.isNumeric(dGet('wtw_tmoldrotationx').value)) {
					rotx = WTW.getRadians(Number(dGet('wtw_tmoldrotationx').value));
				}
				if (WTW.isNumeric(dGet('wtw_tmoldrotationy').value)) {
					roty = WTW.getRadians(Number(dGet('wtw_tmoldrotationy').value));
				}
				if (WTW.isNumeric(dGet('wtw_tmoldrotationz').value)) {
					rotz = WTW.getRadians(Number(dGet('wtw_tmoldrotationz').value));
				}
				molds[moldind].rotation.x = WTW.getDegrees(rotx);
				molds[moldind].rotation.y = WTW.getDegrees(roty);
				molds[moldind].rotation.z = WTW.getDegrees(rotz);
				mold.rotation.x = rotx;
				if (shape == "candleflame") { // billboardmode
					mold.rotation.y = 0;
					dGet('wtw_tmoldrotationy').value = '0.00';
				} else {
					mold.rotation.y = roty;				
				}
				mold.rotation.z = rotz;				
				if ((shape == "box" || shape == "wall" || shape == "floor") && coveringname == "directional texture") {
					coveringname = "directional texture";
				} else if (shape != "box" && shape != "wall" && shape != "floor" && coveringname == "directional texture") {
					coveringname = "texture";
				}
				if (shape == "3dtext") {
					if (molds[moldind].webtext.webtext != undefined) {
						if (molds[moldind].webtext.webtext != dGet('wtw_tmoldwebtext').value) {
							molds[moldind].webtext.webtext = dGet('wtw_tmoldwebtext').value;
							rebuildmold = 1;
						}
					}
					if (dGet('wtw_tmoldwebtextheight').value == '' || WTW.isNumeric(dGet('wtw_tmoldwebtextheight').value) == false) {
						dGet('wtw_tmoldwebtextheight').value = 6;
					}
					if (dGet('wtw_tmoldwebtextthick').value == '' || WTW.isNumeric(dGet('wtw_tmoldwebtextthick').value) == false) {
						dGet('wtw_tmoldwebtextthick').value = 1;
					}
					if (dGet('wtw_tmoldwebtextcolor').value == '') {
						dGet('wtw_tmoldwebtextcolor').value = '#ff0000';
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
					if (molds[moldind].webtext.webstyle != undefined) {
						dGet('wtw_tmoldwebstyle').value = "{\"anchor\":\"" + dGet('wtw_tmoldwebtextalign').options[dGet('wtw_tmoldwebtextalign').selectedIndex].value + "\",\"letter-height\":" + dGet('wtw_tmoldwebtextheight').value + ",\"letter-thickness\":" + dGet('wtw_tmoldwebtextthick').value + ",\"color\":\"" + dGet('wtw_tmoldwebtextcolor').value + "\",\"alpha\":" + opacity/100 + ",\"colors\":{\"diffuse\":\"" + dGet('wtw_tmoldwebtextdiffuse').value + "\",\"specular\":\"" + dGet('wtw_tmoldwebtextspecular').value + "\",\"ambient\":\"" + dGet('wtw_tmoldwebtextambient').value + "\",\"emissive\":\"" + dGet('wtw_tmoldwebtextcolor').value + "\"}}";
						if (molds[moldind].webtext.webstyle != dGet('wtw_tmoldwebstyle').value) {
							molds[moldind].webtext.webstyle = dGet('wtw_tmoldwebstyle').value;
							rebuildmold = 1;
						}
					}
				}
				molds[moldind].csg.moldid = dGet('wtw_tmoldcsgmoldid').value;
				var csgmainid = molds[moldind].csg.moldid;

				if (molds[moldind].object.uploadobjectid != undefined) {
					if (molds[moldind].object.uploadobjectid != dGet('wtw_tmolduploadobjectid').value) {
						molds[moldind].object.uploadobjectid = dGet('wtw_tmolduploadobjectid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].object.folder != undefined) {
					if (molds[moldind].object.folder != dGet('wtw_tmoldobjectfolder').value) {
						molds[moldind].object.folder = dGet('wtw_tmoldobjectfolder').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].object.file != undefined) {
					if (molds[moldind].object.file != dGet('wtw_tmoldobjectfile').value) {
						molds[moldind].object.file = dGet('wtw_tmoldobjectfile').value;
						rebuildmold = 1;
					}
				}

				if (molds[moldind].graphics.receiveshadows != undefined) {
					if (dGet('wtw_tmoldreceiveshadows').checked) {
						molds[moldind].graphics.receiveshadows = '1';
					} else {
						molds[moldind].graphics.receiveshadows = '0';
					}
				}
				if (molds[moldind].graphics.level != undefined) {
					if (dGet('wtw_tmoldgraphiclevel').checked) {
						molds[moldind].graphics.level = '1';
					} else {
						molds[moldind].graphics.level = '0';
					}
				}
				if (molds[moldind].graphics.texture.id != undefined) {
					if (molds[moldind].graphics.texture.id != dGet('wtw_tmoldtextureid').value) {
						molds[moldind].graphics.texture.id = dGet('wtw_tmoldtextureid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.texture.path != undefined) {
					if (molds[moldind].graphics.texture.path != dGet('wtw_tmoldtexturepath').value) {
						molds[moldind].graphics.texture.path = dGet('wtw_tmoldtexturepath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.texture.bumpid != undefined) {
					if (molds[moldind].graphics.texture.bumpid != dGet('wtw_tmoldtexturebumpid').value) {
						molds[moldind].graphics.texture.bumpid = dGet('wtw_tmoldtexturebumpid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.texture.bumppath != undefined) {
					if (molds[moldind].graphics.texture.bumppath != dGet('wtw_tmoldtexturebumppath').value) {
						molds[moldind].graphics.texture.bumppath = dGet('wtw_tmoldtexturebumppath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.id != undefined) {
					if (molds[moldind].graphics.heightmap.id != dGet('wtw_tmoldheightmapid').value) {
						molds[moldind].graphics.heightmap.id = dGet('wtw_tmoldheightmapid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.path != undefined) {
					if (molds[moldind].graphics.heightmap.path != dGet('wtw_tmoldheightmappath').value) {
						molds[moldind].graphics.heightmap.path = dGet('wtw_tmoldheightmappath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.mixmapid != undefined) {
					if (molds[moldind].graphics.heightmap.mixmapid != dGet('wtw_tmoldmixmapid').value) {
						molds[moldind].graphics.heightmap.mixmapid = dGet('wtw_tmoldmixmapid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.mixmappath != undefined) {
					if (molds[moldind].graphics.heightmap.mixmappath != dGet('wtw_tmoldmixmappath').value) {
						molds[moldind].graphics.heightmap.mixmappath = dGet('wtw_tmoldmixmappath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturerid != undefined) {
					if (molds[moldind].graphics.heightmap.texturerid != dGet('wtw_tmoldtexturerid').value) {
						molds[moldind].graphics.heightmap.texturerid = dGet('wtw_tmoldtexturerid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturerpath != undefined) {
					if (molds[moldind].graphics.heightmap.texturerpath != dGet('wtw_tmoldtexturerpath').value) {
						molds[moldind].graphics.heightmap.texturerpath = dGet('wtw_tmoldtexturerpath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturegid != undefined) {
					if (molds[moldind].graphics.heightmap.texturegid != dGet('wtw_tmoldtexturegid').value) {
						molds[moldind].graphics.heightmap.texturegid = dGet('wtw_tmoldtexturegid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturegpath != undefined) {
					if (molds[moldind].graphics.heightmap.texturegpath != dGet('wtw_tmoldtexturegpath').value) {
						molds[moldind].graphics.heightmap.texturegpath = dGet('wtw_tmoldtexturegpath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturebid != undefined) {
					if (molds[moldind].graphics.heightmap.texturebid != dGet('wtw_tmoldtexturebid').value) {
						molds[moldind].graphics.heightmap.texturebid = dGet('wtw_tmoldtexturebid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturebpath != undefined) {
					if (molds[moldind].graphics.heightmap.texturebpath != dGet('wtw_tmoldtexturebpath').value) {
						molds[moldind].graphics.heightmap.texturebpath = dGet('wtw_tmoldtexturebpath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturebumprid != undefined) {
					if (molds[moldind].graphics.heightmap.texturebumprid != dGet('wtw_tmoldtexturebumprid').value) {
						molds[moldind].graphics.heightmap.texturebumprid = dGet('wtw_tmoldtexturebumprid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturebumprpath != undefined) {
					if (molds[moldind].graphics.heightmap.texturebumprpath != dGet('wtw_tmoldtexturebumprpath').value) {
						molds[moldind].graphics.heightmap.texturebumprpath = dGet('wtw_tmoldtexturebumprpath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturebumpgid != undefined) {
					if (molds[moldind].graphics.heightmap.texturebumpgid != dGet('wtw_tmoldtexturebumpgid').value) {
						molds[moldind].graphics.heightmap.texturebumpgid = dGet('wtw_tmoldtexturebumpgid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturebumpgpath != undefined) {
					if (molds[moldind].graphics.heightmap.texturebumpgpath != dGet('wtw_tmoldtexturebumpgpath').value) {
						molds[moldind].graphics.heightmap.texturebumpgpath = dGet('wtw_tmoldtexturebumpgpath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturebumpbid != undefined) {
					if (molds[moldind].graphics.heightmap.texturebumpbid != dGet('wtw_tmoldtexturebumpbid').value) {
						molds[moldind].graphics.heightmap.texturebumpbid = dGet('wtw_tmoldtexturebumpbid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.heightmap.texturebumpbpath != undefined) {
					if (molds[moldind].graphics.heightmap.texturebumpbpath != dGet('wtw_tmoldtexturebumpbpath').value) {
						molds[moldind].graphics.heightmap.texturebumpbpath = dGet('wtw_tmoldtexturebumpbpath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.texture.videoid != undefined) {
					if (molds[moldind].graphics.texture.videoid != dGet('wtw_tmoldvideoid').value) {
						molds[moldind].graphics.texture.videoid = dGet('wtw_tmoldvideoid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.texture.video != undefined) {
					if (molds[moldind].graphics.texture.video != dGet('wtw_tmoldvideopath').value) {
						molds[moldind].graphics.texture.video = dGet('wtw_tmoldvideopath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.texture.videoposterid != undefined) {
					if (molds[moldind].graphics.texture.videoposterid != dGet('wtw_tmoldvideoposterid').value) {
						molds[moldind].graphics.texture.videoposterid = dGet('wtw_tmoldvideoposterid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].graphics.texture.videoposter != undefined) {
					if (molds[moldind].graphics.texture.videoposter != dGet('wtw_tmoldvideoposterpath').value) {
						molds[moldind].graphics.texture.videoposter = dGet('wtw_tmoldvideoposterpath').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].sound.id != undefined) {
					if (molds[moldind].sound.id != dGet('wtw_tmoldsoundid').value) {
						molds[moldind].sound.id = dGet('wtw_tmoldsoundid').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].sound.path != undefined) {
					if (molds[moldind].sound.path != dGet('wtw_tmoldsoundpath').value) {
						molds[moldind].sound.path = dGet('wtw_tmoldsoundpath').value;
						rebuildmold = 1;
					}
				}
				if (dGet('wtw_soundicon') != null && dGet('wtw_soundicon').alt != '') {
					dGet('wtw_tmoldsoundname').value = dGet('wtw_soundicon').alt;
					dGet('wtw_selectedsound').innerHTML = dGet('wtw_tmoldsoundname').value;
				}
				if (molds[moldind].sound.name != undefined) {
					if (molds[moldind].sound.name != dGet('wtw_tmoldsoundname').value) {
						molds[moldind].sound.name = dGet('wtw_tmoldsoundname').value;
						rebuildmold = 1;
					}
				}
				var soundattenuation = "none";
				if (dGet('wtw_tmoldsoundattenuation').selectedIndex > -1) {
					soundattenuation = dGet('wtw_tmoldsoundattenuation').options[dGet('wtw_tmoldsoundattenuation').selectedIndex].value;
				} else {
					WTW.setDDLValue('wtw_tmoldsoundattenuation', "linear");
					soundattenuation = "linear";
				}
				if (molds[moldind].sound.attenuation != undefined) {
					if (molds[moldind].sound.attenuation != soundattenuation) {
						molds[moldind].sound.attenuation = soundattenuation;
						WTW.setSoundFields();
						rebuildmold = 1;
					}
				}
				if (molds[moldind].sound.loop != undefined) {
					var soundloop = '0';
					if (dGet('wtw_tmoldsoundloop').checked == true) {
						soundloop = '1';
					}
					if (molds[moldind].sound.loop != soundloop) {
						if (soundloop == '1') {
							molds[moldind].sound.loop = '1';
						} else {
							molds[moldind].sound.loop = '0';
						}
						rebuildmold = 1;
					}
				}
				if (molds[moldind].sound.maxdistance != undefined) {
					if (molds[moldind].sound.maxdistance != dGet('wtw_tmoldsoundmaxdistance').value) {
						molds[moldind].sound.maxdistance = dGet('wtw_tmoldsoundmaxdistance').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].sound.rollofffactor != undefined) {
					if (molds[moldind].sound.rollofffactor != dGet('wtw_tmoldsoundrollofffactor').value) {
						molds[moldind].sound.rollofffactor = dGet('wtw_tmoldsoundrollofffactor').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].sound.refdistance != undefined) {
					if (molds[moldind].sound.refdistance != dGet('wtw_tmoldsoundrefdistance').value) {
						molds[moldind].sound.refdistance = dGet('wtw_tmoldsoundrefdistance').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].sound.coneinnerangle != undefined) {
					if (molds[moldind].sound.coneinnerangle != dGet('wtw_tmoldsoundconeinnerangle').value) {
						molds[moldind].sound.coneinnerangle = dGet('wtw_tmoldsoundconeinnerangle').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].sound.coneouterangle != undefined) {
					if (molds[moldind].sound.coneouterangle != dGet('wtw_tmoldsoundconeouterangle').value) {
						molds[moldind].sound.coneouterangle = dGet('wtw_tmoldsoundconeouterangle').value;
						rebuildmold = 1;
					}
				}
				if (molds[moldind].sound.coneoutergain != undefined) {
					if (molds[moldind].sound.coneoutergain != dGet('wtw_tmoldsoundconeoutergain').value) {
						molds[moldind].sound.coneoutergain = dGet('wtw_tmoldsoundconeoutergain').value;
						rebuildmold = 1;
					}
				}
				var csgaction = dGet('wtw_tmoldcsgaction').options[dGet('wtw_tmoldcsgaction').selectedIndex].value;
				var csgmainind = -1; 
				var csgchildind = -1;
				if (csgmainid != "") {
					csgmainind = WTW.getMoldInd(molds, csgmainid, dGet('wtw_tconnectinggridind').value);
					WTW.setCSGCount(csgmainid);
					csgchildind = WTW.getMoldInd(molds, moldid, dGet('wtw_tconnectinggridind').value);
					molds[csgchildind].covering = "color";
					molds[csgchildind].opacity = "30";
					coveringname = "color";
				}
				if (WTW.isNumeric(molds[moldind].csg.count)) {
					if (Number(molds[moldind].csg.count) > 0) {
						WTW.disposeClean(moldname);
						molds[moldind].shown = "0";
						csgmainid = "";
					}
				}
				if (csgmainid != "" && molds[csgmainind] != null) {
					var csgmainname = moldgroup + "molds-" + csgmainind + "-" + molds[csgmainind].moldid + "-" + molds[csgmainind].connectinggridind + "-" + molds[csgmainind].connectinggridid + "-" + molds[csgmainind].shape;
					var csgmain = scene.getMeshByID(csgmainname);
					if (csgmain != null) {
						WTW.disposeClean(csgmainname);
						//molds[csgmainind].shown = '0';
						csgmain = WTW.addMold(molds[csgmainind].moldname, molds[csgmainind], molds[csgmainind].parentname, molds[csgmainind].covering);
						csgmain = WTW.getMoldCSG(csgmain, molds[csgmainind]);
						var receiveshadows = '0';
						var waterreflection = '0';
/*						if (molds[csgmainind].graphics.receiveshadows != undefined) {
							if (molds[csgmainind].graphics.receiveshadows == '1') {
								receiveshadows = '1';
							}
						}
						if (molds[csgmainind].graphics.waterreflection != undefined) {
							if (molds[csgmainind].graphics.waterreflection == '1') {
								waterreflection = '1';
							}
						}
						if (receiveshadows == '1') {
							mold.receiveShadows = true;
						} 
						if (WTW.shadowSet > 0) {
							WTW.shadows.getShadowMap().renderList.push(mold);
						}
*/						if (waterreflection == '1' && WTW.waterMat != null) {
							WTW.waterMat.addToRenderList(mold);
						}
						csgmain.checkCollisions = false;
						csgmain.isPickable = false;
						if (molds[csgmainind].checkcollisions != undefined) {
							if (molds[csgmainind].checkcollisions == "1") {
								csgmain.checkCollisions = true;
							}
						}
						if (molds[csgmainind].ispickable != undefined) {
							if (molds[csgmainind].ispickable == "1") {
								csgmain.isPickable = true;
							}
						}
					}
				}
				var hasdependents = 0;
				for (var i=0;i<molds.length;i++) {
					if (molds[i] != null) {
						if (molds[moldind].moldid == molds[i].csg.moldid) {
							WTW.disposeClean(molds[i].moldname);
							molds[i].shown = "0";
							hasdependents = 1;
							rebuildmold = 1;
						}
					}
				}
				rebuildmold = WTW.pluginsSetNewMold(moldname, molds, moldind, rebuildmold);
				if (rebuildmold == 1 || csgmainid != "") {
					WTW.disposeClean(moldname);
					mold = WTW.addMold(moldname, molds[moldind], parentname, coveringname);
					if (hasdependents == 1) {
						mold = WTW.getMoldCSG(mold, molds[moldind]);
					}
				}
				if (rebuildmold == 1 && shape != "image") {
					WTW.registerMouseOver(mold);
				}
				WTW.openEditPoles(mold);
			}
		}	
	} catch (ex) {
		WTW.log("core-scripts-admin-wtw_adminmolds.js-setNewMold=" + ex.message);
	}
}


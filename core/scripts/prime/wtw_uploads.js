/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions provide many of the common functions for browse and admin modes */
/* file uploads and browser database functions (work in progress) */

/* store file data in the database (optional) */
WTWJS.prototype.getUploadFileData = function(zimageid) {
	/* get upload file data information if it is in the array */
	var zfiledata = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA+Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2OTApLCBkZWZhdWx0IHF1YWxpdHkK/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgARgBQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9DooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKSgBaKKKACiiigAooooAKSiigAooooAWiiigApKKKACiiigD//Z';
	var ztitle = 'default.jpg';
	var zname = 'default.jpg';
	var zextension = 'jpg';
	var ztype = 'image/jpeg';
	var zsize = '792.00';
	var zwidth = '80';
	var zheight = '80';
	var zoriginalid = 'wwq1yppbimir7tgv';
	var zwebsizeid = 't1qlqxd6pzubzzzy';
	var zthumbnailid = 't1qlqxd6pzubzzzy';
	var zfilepath = '/content/system/stock/lightgray-512x512.jpg';
	var znewimage = new Image();
	try {
		if (wtw_uploads != null && zimageid != '') {
			if (wtw_uploads.length > 0) {
				for (var i=0;i < wtw_uploads.length;i++) {
					if (wtw_uploads[i].uploadid == zimageid) {
						zfiledata = wtw_uploads[i].data;
						if (wtw_uploads[i].uploadinfo != undefined) {
							ztitle = wtw_uploads[i].uploadinfo.title;
							zname = wtw_uploads[i].uploadinfo.name;
							zextension = wtw_uploads[i].uploadinfo.extension;
							ztype = wtw_uploads[i].uploadinfo.type;
							zsize = wtw_uploads[i].uploadinfo.size;
							zwidth = wtw_uploads[i].uploadinfo.width;
							zheight = wtw_uploads[i].uploadinfo.height;
						}
						zoriginalid = wtw_uploads[i].originalid;
						zwebsizeid = wtw_uploads[i].websizeid;
						zthumbnailid = wtw_uploads[i].thumbnailid;
						zfilepath = wtw_uploads[i].filepath;
						znewimage.id = zimageid;
						znewimage.src = zfiledata;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_uploads.js-getUploadFileData=' + ex.message);
	}
	return {
		'filedata':zfiledata,
		'title':ztitle,
		'name':zname,
		'extension':zextension,
		'type':ztype,
		'size':zsize,
		'width':zwidth,
		'height':zheight,
		'originalid':zoriginalid,
		'websizeid':zwebsizeid,
		'thumbnailid':zthumbnailid,
		'filepath':zfilepath,
		'image':znewimage
	}
}

WTWJS.prototype.loadFromLocalDB = function(zstorename, zid) {
	/* loads files from local browser database */
	return new Promise(
		function(zresolve, zreject) {
			var zdbrequest = indexedDB.open(zstorename);
			zdbrequest.onerror = function(event) {
				zreject(Error('False'));
			};
			zdbrequest.onupgradeneeded = function(event) {
				event.target.transaction.abort();
				zreject(Error('False'));
			};
			zdbrequest.onsuccess = function(event) {
				var zdatabase      = event.target.result;
				var ztransaction   = zdatabase.transaction([zstorename]);
				var zobjectstore   = ztransaction.objectStore(zstorename);
				var zobjectrequest = zobjectstore.get(zid);
				zobjectrequest.onerror = function(event) {
					zreject(Error('False'));
				};
				zobjectrequest.onsuccess = function(event) {
					if (zobjectrequest.result) {
						zresolve(zobjectrequest.result);
					} else {
						zreject(Error('False'));
					}
				};
			};
		}
	);
}

WTWJS.prototype.saveToLocalDB = function(zstorename, zobject) {
	/* saves files to local browser database */
	return new Promise(
		function(zresolve, zreject) {
			if (zobject.id === undefined) zreject(Error(''));
			var zdbrequest = indexedDB.open(zstorename);
			zdbrequest.onerror = function(event) {
				zreject(Error(''));
			};
			zdbrequest.onupgradeneeded = function(event) {
				var zdatabase    = event.target.result;
				var zobjectstore = zdatabase.createObjectStore(zstorename, {keyPath: 'id'});
			};
			zdbrequest.onsuccess = function(event) {
				var zdatabase      = event.target.result;
				var ztransaction   = zdatabase.transaction([zstorename], 'readwrite');
				var zobjectstore   = ztransaction.objectStore(zstorename);
				var zobjectrequest = zobjectstore.put(zobject); // Overwrite if exists
				zobjectrequest.onerror = function(event) {
					zreject(Error(''));
				};
				zobjectrequest.onsuccess = function(event) {
					/* zresolve('Data saved OK'); */
				};
			};
		}
	);
}

/* need -getCountDB- tool currently not in use */
WTWJS.prototype.getCountDB = function(zstorename) {
	/* counts files in local browser database */
	return new Promise(
		function(zresolve, zreject) {
			var zdbrequest = indexedDB.open(zstorename);
			zdbrequest.onerror = function(event) {
				zreject(Error(''));
			};
			zdbrequest.onupgradeneeded = function(event) {
				var zdatabase    = event.target.result;
				var zobjectstore = zdatabase.createObjectStore(zstorename, {keyPath: 'id'});
			};
			zdbrequest.onsuccess = function(event) {
				var zdatabase      = event.target.result;
				var ztransaction   = zdatabase.transaction([zstorename], 'readonly');
				var zobjectstore   = ztransaction.objectStore(zstorename);
				var zcount = zobjectstore.count();
				zcount.onsuccess = function() {
					console.log('db count=' + zcount.result);
				};
			};
		}
	);
}

WTWJS.prototype.isUploadReadyOrAdd = async function(zuploadid) {
	/* checks if the uploaded file is preloaded and ready to load to scene */
	var zready = false;
	try {
		if (zuploadid != '') {
			/* var localdbname = wtw_domainname.replace('.',''); */
			var zqueue = null;
			var zfound = false;
			if (wtw_uploads != null && zuploadid != '') {
				for (var i = 0; i < wtw_uploads.length; i++) {
					if (wtw_uploads[i] != null) {
						if (wtw_uploads[i].uploadid == zuploadid) {
							zqueue = wtw_uploads[i].queue;
							i = wtw_uploads.length;
							zfound = true;
						}
					}
				}
			}
			if (zfound) {
				if (zqueue != null) {
					if (zqueue == '0') {
						zready = true;
					}
				}
			} else {
				var zuploadind = WTW.getNextCount(wtw_uploads);
				wtw_uploads[zuploadind] = WTW.newUpload();
				wtw_uploads[zuploadind].uploadid = zuploadid;
				wtw_uploads[zuploadind].queue = '1';
				/* if (WTW.getBrowser()=='ie') { */
					WTW.getAsyncJSON('/connect/upload.php?uploadid=' + zuploadid, 
						function(zresponse) {
							WTW.loadFileUpload(JSON.parse(zresponse), zuploadid);
						}
					);
				/* } else {
					WTW.loadFromLocalDB(localdbname, zuploadid).then(function (zresponse1) {
						var zadduploads = [];
						zadduploads[0] = zresponse1; 
						WTW.loadFileUpload(zadduploads, zadduploads[0].uploadid);
					}).catch(function (error) {
						WTW.getAsyncJSON('/connect/upload.php?uploadid=' + zuploadid, 
							function(zresponse) {
								WTW.loadFileUpload(JSON.parse(zresponse), zuploadid);
							}
						);
					}); 
				} */
			}
		} else {
			zready = true;
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_uploads.js-isUploadReadyOrAdd=' + ex.message);
	}
	return zready;
}

WTWJS.prototype.loadFileUpload = function(zadduploads, zuploadid, zsavelocal) {
	/* flag to load a particular file to memory ready for use */
	try {
		/* if (zsavelocal == undefined) {
			zsavelocal = true;
		}
		var localdbname = wtw_domainname.replace('.',''); */
		var zh3duploadind = WTW.getUploadInd(zuploadid);
		if (zadduploads != null) {
			for (var i=0;i < zadduploads.length;i++) {
				if (zadduploads[i].uploadid != '') {
					if (WTW.isUploadAdded(zadduploads[i].uploadid) == false) {
						var zuploadind = WTW.getNextCount(wtw_uploads);
						wtw_uploads[zuploadind] = zadduploads[i];
						var zimageinfo = WTW.getUploadFileData(zuploadid);
						zimageinfo.image.onload = function() {
							wtw_uploads[zuploadind].queue = '0';
						}
						/* if (WTW.getBrowser()!='ie') {
							if (zsavelocal) {
								WTW.saveToLocalDB(localdbname, wtw_uploads[zuploadind]);
							}
						} */
					} else if (zadduploads[i].uploadid == zuploadid && wtw_uploads[zh3duploadind] != null) {
						wtw_uploads[zh3duploadind] = zadduploads[i];
						var zimageinfo = WTW.getUploadFileData(zuploadid);
						zimageinfo.image.onload = function() {
							wtw_uploads[zh3duploadind].queue = '0';
						}
						/* if (WTW.getBrowser()!='ie') {
							if (zsavelocal) {
								WTW.saveToLocalDB(localdbname, wtw_uploads[zh3duploadind]);
							}
						} */
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_uploads.js-loadFileUpload=' + ex.message);
	}
}

WTWJS.prototype.initLoadUpload = async function(zuploadid, ztempid, zrefreshoption, zmoldname, zmolddef, zparentname) {
	/* start fetch for file */
	try {
		if (zmoldname == undefined) {
			zmoldname = null;
		}
		if (zmolddef == undefined) {
			zmolddef = null;
		}
		if (zparentname == undefined) {
			zparentname = null;
		}
		/* var localdbname = wtw_domainname.replace('.',''); */
		if (zuploadid != '') {
			if (WTW.isUploadReady(zuploadid)) {
				WTW.setUploadCovering(zuploadid, zrefreshoption, zmoldname, zmolddef, zparentname);
			} else if (WTW.isUploadInQueue(zuploadid)) {
			} else {
				var zuploadind = WTW.getNextCount(wtw_uploads);
				wtw_uploads[zuploadind] = zuploadid;
				wtw_uploads[zuploadind].queue = '1';
				/* if (WTW.getBrowser()=='ie') { */
					WTW.getAsyncJSON('/connect/upload.php?uploadid=' + zuploadid, 
						function(zresponse) {
							WTW.loadUpload(JSON.parse(zresponse), zuploadid, zrefreshoption, false, zmoldname, zmolddef, zparentname);
						}
					);
				/* } else {
					WTW.loadFromLocalDB(localdbname, zuploadid).then(function (zresponse1) {
						var zadduploads = [];
						zadduploads[0] = zresponse1; 
						WTW.loadUpload(zadduploads, zadduploads[0].uploadid, zrefreshoption, false, zmoldname, zmolddef, zparentname);
					}).catch(function (error) {
						WTW.getAsyncJSON('/connect/upload.php?uploadid=' + zuploadid, 
							function(zresponse) {
								WTW.loadUpload(JSON.parse(zresponse), zuploadid, zrefreshoption, false, zmoldname, zmolddef, zparentname);
							}
						);
					}); 
				} */
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_uploads.js-initLoadUpload=' + ex.message);
	}
}

WTWJS.prototype.loadUpload = function(zadduploads, zuploadid, zrefreshoption, zsavelocal, zmoldname, zmolddef, zparentname) {
	/* load uploaded file */
	try {
		var zuploadind = -1;
		if (zsavelocal == undefined) {
			zsavelocal = true;
		}
		if (zmoldname == undefined) {
			zmoldname = null;
		}
		if (zmolddef == undefined) {
			zmolddef = null;
		}
		if (zparentname == undefined) {
			zparentname = null;
		}
		/* var localdbname = wtw_domainname.replace('.',''); */
		var zh3duploadind = WTW.getUploadInd(zuploadid);
		if (zadduploads != null) {
			for (var i=0;i < zadduploads.length;i++) {
				if (zadduploads[i].uploadid != '') {
					if (WTW.isUploadReady(zadduploads[i].uploadid) == false) {
						zuploadind = WTW.getNextCount(wtw_uploads);
						wtw_uploads[zuploadind] = zadduploads[i];
						var zimageinfo = WTW.getUploadFileData(zuploadid);
						zimageinfo.image.onload = function() {
							wtw_uploads[zuploadind].queue = '0';
						}
						/* if (WTW.getBrowser()!='ie') {
							if (zsavelocal) {
								WTW.saveToLocalDB(localdbname, wtw_uploads[zuploadind]);
							}
						} */
					} else if (zadduploads[i].uploadid == zuploadid && wtw_uploads[zuploadind] != null) {
						wtw_uploads[zh3duploadind] = zadduploads[i];
						var zimageinfo = WTW.getUploadFileData(zuploadid);
						zimageinfo.image.onload = function() {
							wtw_uploads[zh3duploadind].queue = '0';
						}
						/* if (WTW.getBrowser()!='ie') {
							if (zsavelocal) {
								WTW.saveToLocalDB(localdbname, wtw_uploads[zh3duploadind]);
							}
						} */
					}
				}
			}
		}
		WTW.setUploadCovering(zuploadid, zrefreshoption, zmoldname, zmolddef, zparentname);
		WTW.setShownMolds();
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_uploads.js-loadUpload=' + ex.message);
	}
}

WTWJS.prototype.setUploadCovering = function(zuploadid, zrefreshoption, zmoldname, zmolddef, zparentname) {
	/* update the material after a mold is created using the admin (limited use for certain meshes only) */
	try {
		if (zmoldname == undefined) {
			zmoldname = null;
		}
		if (zmolddef == undefined) {
			zmolddef = null;
		}
		if (zparentname == undefined) {
			zparentname = null;
		}
		switch (zrefreshoption) {
			case 1:
				if (WTW.adminView == 1) {
					WTW.setNewMold(1);
				}
				break;
			case 2:
				break;
			case 3:
				break;
			case 4:
				if (WTW.extraGround.material != undefined) {
					if (WTW.extraGround.material.diffuseTexture != null) {
						WTW.extraGround.material.diffuseTexture.dispose();
						WTW.extraGround.material.diffuseTexture = null;
					}
				}
				if (WTW.extraGround.material != null) {
					WTW.extraGround.material.dispose();
					WTW.extraGround.material = null;
				}
				var zextragroundmaterial = new BABYLON.StandardMaterial('egmat', scene);
				WTW.extraGround.material = zextragroundmaterial;
				zextragroundmaterial.specularColor = new BABYLON.Color3(.1, .1, .1);
				zextragroundmaterial.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
				var zimageinfo = WTW.getUploadFileData(zuploadid);
				zextragroundmaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.filedata, 'egmattexture', scene);
				var zeguscale = 500;
				var zegvscale = 500;
				zextragroundmaterial.diffuseTexture.uScale = zeguscale;
				zextragroundmaterial.diffuseTexture.vScale = zegvscale;
				break;
			case 5:
				/* WTW.resetMoldCoverings(); */
				break;
			case 6:
				break;
			case 7:
				break;
			case 8: /* advanced terrain material */
				var zposx = Number(zmolddef.position.x);
				var zposy = Number(zmolddef.position.y);
				var zposz = Number(zmolddef.position.z);
				var zscalingx = Number(zmolddef.scaling.x);
				var zscalingy = Number(zmolddef.scaling.y);
				var zscalingz = Number(zmolddef.scaling.z);
				var zrotx = Number(zmolddef.rotation.x);
				var zroty = Number(zmolddef.rotation.y);
				var zrotz = Number(zmolddef.rotation.z);
				var zsubdivisions = 12;
				var zminheight = 0;
				var zmaxheight = 0;
				try {
					if (WTW.isNumeric(zmolddef.subdivisions)) {
						zsubdivisions = Number(zmolddef.subdivisions);
					}
				} catch(ex) {}
				try {
					if (WTW.isNumeric(zmolddef.graphics.heightmap.minheight)) {
						zminheight = Number(zmolddef.graphics.heightmap.minheight);
					}
				} catch(ex) {}
				try {
					if (WTW.isNumeric(zmolddef.graphics.heightmap.maxheight)) {
						zmaxheight = Number(zmolddef.graphics.heightmap.maxheight);
					}
				} catch(ex) {}
				var ztransformposition = WTW.transformPosition(zmolddef, zposx, zposy, zposz);
				zposx = ztransformposition.posx;
				zposy = ztransformposition.posy;
				zposz = ztransformposition.posz;
				WTW.loadTerrainAdvancedImages(zmoldname, zscalingx, zscalingy, zscalingz, zsubdivisions, '', zmolddef.graphics.heightmap.id, zminheight, zmaxheight, zparentname, zmolddef, 'terrainadvanced', zposx, zposy, zposz, zmolddef.graphics.heightmap.mixmapid, zmolddef.graphics.heightmap.texturerid, zmolddef.graphics.heightmap.texturegid, zmolddef.graphics.heightmap.texturebid, zmolddef.graphics.heightmap.texturebumprid, zmolddef.graphics.heightmap.texturebumpgid, zmolddef.graphics.heightmap.texturebumpbid);
				break;
			default:

				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-prime-wtw_uploads.js-setUploadCovering=' + ex.message);
	}
}


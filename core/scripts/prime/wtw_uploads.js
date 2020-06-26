/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* These functions provide many of the common functions for browse and admin modes */
/* file uploads and browser database functions (work in progress) */

/* store file data in the database (optional) */
WTWJS.prototype.getUploadFileData = function(imageid) {
	/* get upload file data information if it is in the array */
	var filedata = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA+Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2OTApLCBkZWZhdWx0IHF1YWxpdHkK/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgARgBQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9DooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKSgBaKKKACiiigAooooAKSiigAooooAWiiigApKKKACiiigD//Z';
	var title = 'default.jpg';
	var name = 'default.jpg';
	var extension = 'jpg';
	var type = 'image/jpeg';
	var size = '792.00';
	var width = '80';
	var height = '80';
	var originalid = 'wwq1yppbimir7tgv';
	var websizeid = 't1qlqxd6pzubzzzy';
	var thumbnailid = 't1qlqxd6pzubzzzy';
	var filepath = '/content/system/stock/lightgray-512x447.jpg';
	var newimage = new Image();
	try {
		if (wtw_uploads != null && imageid != '') {
			if (wtw_uploads.length > 0) {
				for (var i=0;i < wtw_uploads.length;i++) {
					if (wtw_uploads[i].uploadid == imageid) {
						filedata = wtw_uploads[i].data;
						if (wtw_uploads[i].uploadinfo != undefined) {
							title = wtw_uploads[i].uploadinfo.title;
							name = wtw_uploads[i].uploadinfo.name;
							extension = wtw_uploads[i].uploadinfo.extension;
							type = wtw_uploads[i].uploadinfo.type;
							size = wtw_uploads[i].uploadinfo.size;
							width = wtw_uploads[i].uploadinfo.width;
							height = wtw_uploads[i].uploadinfo.height;
						}
						originalid = wtw_uploads[i].originalid;
						websizeid = wtw_uploads[i].websizeid;
						thumbnailid = wtw_uploads[i].thumbnailid;
						filepath = wtw_uploads[i].filepath;
						newimage.id = imageid;
						newimage.src = filedata;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_uploads.js-getUploadFileData=" + ex.message);
	}
	return {
		filedata:filedata,
		title:title,
		name:name,
		extension:extension,
		type:type,
		size:size,
		width:width,
		height:height,
		originalid:originalid,
		websizeid:websizeid,
		thumbnailid:thumbnailid,
		filepath:filepath,
		image:newimage
	}
}

WTWJS.prototype.loadFromLocalDB = function(storename, id) {
	/* loads files from local browser database */
	return new Promise(
		function(resolve, reject) {
			var dbRequest = indexedDB.open(storename);
			dbRequest.onerror = function(event) {
				reject(Error('False'));
			};
			dbRequest.onupgradeneeded = function(event) {
				event.target.transaction.abort();
				reject(Error('False'));
			};
			dbRequest.onsuccess = function(event) {
				var database      = event.target.result;
				var transaction   = database.transaction([storename]);
				var objectStore   = transaction.objectStore(storename);
				var objectRequest = objectStore.get(id);
				objectRequest.onerror = function(event) {
					reject(Error('False'));
				};
				objectRequest.onsuccess = function(event) {
					if (objectRequest.result) {
						resolve(objectRequest.result);
					} else {
						reject(Error('False'));
					}
				};
			};
		}
	);
}

WTWJS.prototype.saveToLocalDB = function(storename, object) {
	/* saves files to local browser database */
	return new Promise(
		function(resolve, reject) {
			if (object.id === undefined) reject(Error(''));
			var dbRequest = indexedDB.open(storename);
			dbRequest.onerror = function(event) {
				reject(Error(''));
			};
			dbRequest.onupgradeneeded = function(event) {
				var database    = event.target.result;
				var objectStore = database.createObjectStore(storename, {keyPath: "id"});
			};
			dbRequest.onsuccess = function(event) {
				var database      = event.target.result;
				var transaction   = database.transaction([storename], 'readwrite');
				var objectStore   = transaction.objectStore(storename);
				var objectRequest = objectStore.put(object); // Overwrite if exists
				objectRequest.onerror = function(event) {
					reject(Error(''));
				};
				objectRequest.onsuccess = function(event) {
					/* resolve('Data saved OK'); */
				};
			};
		}
	);
}

/* need -getCountDB- tool currently not in use */
WTWJS.prototype.getCountDB = function(storename) {
	/* counts files in local browser database */
	return new Promise(
		function(resolve, reject) {
			var dbRequest = indexedDB.open(storename);
			dbRequest.onerror = function(event) {
				reject(Error(''));
			};
			dbRequest.onupgradeneeded = function(event) {
				var database    = event.target.result;
				var objectStore = database.createObjectStore(storename, {keyPath: "id"});
			};
			dbRequest.onsuccess = function(event) {
				var database      = event.target.result;
				var transaction   = database.transaction([storename], 'readonly');
				var objectStore   = transaction.objectStore(storename);
				var count = objectStore.count();
				count.onsuccess = function() {
					console.log("db count=" + count.result);
				};
			};
		}
	);
}

WTWJS.prototype.isUploadReadyOrAdd = function(uploadid) {
	/* checks if the uploaded file is preloaded and ready to load to scene */
	var ready = false;
	try {
		if (uploadid != '') {
			/* var localdbname = wtw_domainname.replace(".",""); */
			var queue = null;
			var found = false;
			if (wtw_uploads != null && uploadid != "") {
				for (var i = 0; i < wtw_uploads.length; i++) {
					if (wtw_uploads[i] != null) {
						if (wtw_uploads[i].uploadid == uploadid) {
							queue = wtw_uploads[i].queue;
							i = wtw_uploads.length;
							found = true;
						}
					}
				}
			}
			if (found) {
				if (queue != null) {
					if (queue == '0') {
						ready = true;
					}
				}
			} else {
				var uploadind = WTW.getNextCount(wtw_uploads);
				wtw_uploads[uploadind] = WTW.newUpload();
				wtw_uploads[uploadind].uploadid = uploadid;
				wtw_uploads[uploadind].queue = "1";
				/* if (WTW.getBrowser()=='ie') { */
					WTW.getJSON("/connect/upload.php?uploadid=" + uploadid, 
						function(response) {
							WTW.loadFileUpload(JSON.parse(response), uploadid);
						}
					);
				/* } else {
					WTW.loadFromLocalDB(localdbname, uploadid).then(function (response1) {
						var adduploads = [];
						adduploads[0] = response1; 
						WTW.loadFileUpload(adduploads, adduploads[0].uploadid);
					}).catch(function (error) {
						WTW.getJSON("/connect/upload.php?uploadid=" + uploadid, 
							function(response) {
								WTW.loadFileUpload(JSON.parse(response), uploadid);
							}
						);
					}); 
				} */
			}
		} else {
			ready = true;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_uploads.js-isUploadReadyOrAdd=" + ex.message);
	}
	return ready;
}

WTWJS.prototype.loadFileUpload = function(adduploads, uploadid, savelocal) {
	/* flag to load a particular file to memory ready for use */
	try {
		/* if (savelocal == undefined) {
			savelocal = true;
		}
		var localdbname = wtw_domainname.replace(".",""); */
		var h3duploadind = WTW.getUploadInd(uploadid);
		if (adduploads != null) {
			for (var i=0;i < adduploads.length;i++) {
				if (adduploads[i].uploadid != "") {
					if (WTW.isUploadAdded(adduploads[i].uploadid) == false) {
						var uploadind = WTW.getNextCount(wtw_uploads);
						wtw_uploads[uploadind] = adduploads[i];
						var imageinfo = WTW.getUploadFileData(uploadid);
						imageinfo.image.onload = function() {
							wtw_uploads[uploadind].queue = "0";
						}
						/* if (WTW.getBrowser()!='ie') {
							if (savelocal) {
								WTW.saveToLocalDB(localdbname, wtw_uploads[uploadind]);
							}
						} */
					} else if (adduploads[i].uploadid == uploadid && wtw_uploads[h3duploadind] != null) {
						wtw_uploads[h3duploadind] = adduploads[i];
						var imageinfo = WTW.getUploadFileData(uploadid);
						imageinfo.image.onload = function() {
							wtw_uploads[h3duploadind].queue = "0";
						}
						/* if (WTW.getBrowser()!='ie') {
							if (savelocal) {
								WTW.saveToLocalDB(localdbname, wtw_uploads[h3duploadind]);
							}
						} */
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_uploads.js-loadFileUpload=" + ex.message);
	}
}

WTWJS.prototype.initLoadUpload = function(uploadid, tempid, refreshoption, moldname, molddef, parentname) {
	/* start fetch for file */
	try {
		if (moldname == undefined) {
			moldname = null;
		}
		if (molddef == undefined) {
			molddef = null;
		}
		if (parentname == undefined) {
			parentname = null;
		}
		/* var localdbname = wtw_domainname.replace(".",""); */
		if (uploadid != "") {
			if (WTW.isUploadReady(uploadid)) {
				WTW.setUploadCovering(uploadid, refreshoption, moldname, molddef, parentname);
			} else if (WTW.isUploadInQueue(uploadid)) {
			} else {
				var uploadind = WTW.getNextCount(wtw_uploads);
				wtw_uploads[uploadind] = uploadid;
				wtw_uploads[uploadind].queue = "1";
				/* if (WTW.getBrowser()=='ie') { */
					WTW.getJSON("/connect/upload.php?uploadid=" + uploadid, 
						function(response) {
							WTW.loadUpload(JSON.parse(response), uploadid, refreshoption, false, moldname, molddef, parentname);
						}
					);
				/* } else {
					WTW.loadFromLocalDB(localdbname, uploadid).then(function (response1) {
						var adduploads = [];
						adduploads[0] = response1; 
						WTW.loadUpload(adduploads, adduploads[0].uploadid, refreshoption, false, moldname, molddef, parentname);
					}).catch(function (error) {
						WTW.getJSON("/connect/upload.php?uploadid=" + uploadid, 
							function(response) {
								WTW.loadUpload(JSON.parse(response), uploadid, refreshoption, false, moldname, molddef, parentname);
							}
						);
					}); 
				} */
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_uploads.js-initLoadUpload=" + ex.message);
	}
}

WTWJS.prototype.loadUpload = function(adduploads, uploadid, refreshoption, savelocal, moldname, molddef, parentname) {
	/* load uploaded file */
	try {
		if (savelocal == undefined) {
			savelocal = true;
		}
		if (moldname == undefined) {
			moldname = null;
		}
		if (molddef == undefined) {
			molddef = null;
		}
		if (parentname == undefined) {
			parentname = null;
		}
		/* var localdbname = wtw_domainname.replace(".",""); */
		var h3duploadind = WTW.getUploadInd(uploadid);
		if (adduploads != null) {
			for (var i=0;i < adduploads.length;i++) {
				if (adduploads[i].uploadid != "") {
					if (WTW.isUploadReady(adduploads[i].uploadid) == false) {
						var uploadind = WTW.getNextCount(wtw_uploads);
						wtw_uploads[uploadind] = adduploads[i];
						var imageinfo = WTW.getUploadFileData(uploadid);
						imageinfo.image.onload = function() {
							wtw_uploads[uploadind].queue = "0";
						}
						/* if (WTW.getBrowser()!='ie') {
							if (savelocal) {
								WTW.saveToLocalDB(localdbname, wtw_uploads[uploadind]);
							}
						} */
					} else if (adduploads[i].uploadid == uploadid && wtw_uploads[uploadind] != null) {
						wtw_uploads[h3duploadind] = adduploads[i];
						var imageinfo = WTW.getUploadFileData(uploadid);
						imageinfo.image.onload = function() {
							wtw_uploads[h3duploadind].queue = "0";
						}
						/* if (WTW.getBrowser()!='ie') {
							if (savelocal) {
								WTW.saveToLocalDB(localdbname, wtw_uploads[h3duploadind]);
							}
						} */
					}
				}
			}
		}
		WTW.setUploadCovering(uploadid, refreshoption, moldname, molddef, parentname);
		WTW.setShownMolds();
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_uploads.js-loadUpload=" + ex.message);
	}
}

WTWJS.prototype.setUploadCovering = function(uploadid, refreshoption, moldname, molddef, parentname) {
	/* update the material after a mold is created using the admin (limited use for certain meshes only) */
	try {
		if (moldname == undefined) {
			moldname = null;
		}
		if (molddef == undefined) {
			molddef = null;
		}
		if (parentname == undefined) {
			parentname = null;
		}
		switch (refreshoption) {
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
				var extraGroundMaterial = new BABYLON.StandardMaterial("egmat", scene);
				WTW.extraGround.material = extraGroundMaterial;
				extraGroundMaterial.specularColor = new BABYLON.Color3(.7, .7, .7);
				extraGroundMaterial.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
				var imageinfo = WTW.getUploadFileData(uploadid);
				extraGroundMaterial.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(imageinfo.filedata, "egmattexture", scene);
				var eguscale = 500;
				var egvscale = 500;
				extraGroundMaterial.diffuseTexture.uScale = eguscale;
				extraGroundMaterial.diffuseTexture.vScale = egvscale;
				break;
			case 5:
				/* WTW.resetMoldCoverings(); */
				break;
			case 6:
				break;
			case 7:
				break;
			case 8: /* advanced terrain material */
				var posx = Number(molddef.position.x);
				var posy = Number(molddef.position.y);
				var posz = Number(molddef.position.z);
				var scalingx = Number(molddef.scaling.x);
				var scalingy = Number(molddef.scaling.y);
				var scalingz = Number(molddef.scaling.z);
				var rotx = Number(molddef.rotation.x);
				var roty = Number(molddef.rotation.y);
				var rotz = Number(molddef.rotation.z);
				var subdivisions = 12;
				var minheight = 0;
				var maxheight = 0;
				try {
					if (WTW.isNumeric(molddef.subdivisions)) {
						subdivisions = Number(molddef.subdivisions);
					}
				} catch(ex) {}
				try {
					if (WTW.isNumeric(molddef.graphics.heightmap.minheight)) {
						minheight = Number(molddef.graphics.heightmap.minheight);
					}
				} catch(ex) {}
				try {
					if (WTW.isNumeric(molddef.graphics.heightmap.maxheight)) {
						maxheight = Number(molddef.graphics.heightmap.maxheight);
					}
				} catch(ex) {}
				var transformposition = WTW.transformPosition(molddef, posx, posy, posz);
				posx = transformposition.posx;
				posy = transformposition.posy;
				posz = transformposition.posz;
				WTW.loadTerrainAdvancedImages(moldname, scalingx, scalingy, scalingz, subdivisions, '', molddef.graphics.heightmap.id, minheight, maxheight, parentname, molddef, "terrainadvanced", posx, posy, posz, molddef.graphics.heightmap.mixmapid, molddef.graphics.heightmap.texturerid, molddef.graphics.heightmap.texturegid, molddef.graphics.heightmap.texturebid, molddef.graphics.heightmap.texturebumprid, molddef.graphics.heightmap.texturebumpgid, molddef.graphics.heightmap.texturebumpbid);
				break;
			default:

				break;
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_uploads.js-setUploadCovering=" + ex.message);
	}
}


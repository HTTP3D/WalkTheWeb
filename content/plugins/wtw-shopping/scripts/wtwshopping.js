// All code is Copyright 2013-2019 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors
// "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. 
// Read the included GNU Ver 3.0 license file for details and additional release information.

function wtwshopping() {
	this.stores = [];
	this.molds = [];
	this.products = [];
	this.fetchQueue = [];
}

var WTWShopping = new wtwshopping();

wtwshopping.prototype.newProduct = function() {
	var product = '';
	try {
		product = {
			'storeurl':'',
			'wpplugin':'',
			'connectinggridind':'-1',
			'connectinggridid':'',
			'search':'',
			'productid':'',
			'productname':'',
			'slug':'',
			'price':'',
			'categoryid':'',
			'description':'',
			'shortdescription':'',
			'imageurl':'',
			'setcount':'0'
		};
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-newProduct=" + ex.message);
	}
	return product;
}

wtwshopping.prototype.newFetch = function() {
	var fetch = '';
	try {
		fetch = {
			'connectinggridid':'',
			'connectinggridind':'',
			'categoryid':'',
			'search':'',
			'fetching':'0'
		};
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-newFetch=" + ex.message);
	}
	return fetch;
}

wtwshopping.prototype.onClick = function(zpickedname) {
	try {
		zpickedname = zpickedname.toLowerCase();
		if ((zpickedname.indexOf("-storeproduct") > -1 && zpickedname.indexOf("-readmore") > -1) || zpickedname.indexOf("-storereadmore") > -1) {
			WTWShopping.productReadMore(zpickedname);
		} else if ((zpickedname.indexOf("-storeproduct") > -1 && zpickedname.indexOf("-addtocart") > -1) || zpickedname.indexOf("-storeaddtocart") > -1 || zpickedname.indexOf("-storebuynow") > -1) {
			WTWShopping.productAddToCart(zpickedname);
		} else if (zpickedname.indexOf("-storeviewcart") > -1 || zpickedname.indexOf("-storecheckout") > -1) {
			WTWShopping.productShowCart(zpickedname);
		} else if (zpickedname.indexOf("-storecategories") > -1 && (zpickedname.indexOf("-categorybuttonhover") > -1 || zpickedname.indexOf("-base") > -1)) {
			WTWShopping.productSelectCategory(zpickedname);
		} else if (zpickedname.indexOf("-storecategories") > -1 && zpickedname.indexOf("-downbutton") > -1) {
			WTWShopping.productSelectCategoryScroll(zpickedname,1);
		} else if (zpickedname.indexOf("-storecategories") > -1 && zpickedname.indexOf("-upbutton") > -1) {
			WTWShopping.productSelectCategoryScroll(zpickedname,-1);
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-onClick=" + ex.message);
	} 
}

wtwshopping.prototype.checkHovers = function(moldname, shape) {
	try {
		if (shape == 'storeproduct') {
			var nameparts = moldname.split('-');
			var moldnameroot = nameparts[0] + "-" + nameparts[1] + "-" + nameparts[2] + "-" + nameparts[3] + "-" + nameparts[4] + "-" + nameparts[5];
			if (moldname.indexOf("descimage1") > -1 || moldname.indexOf("descimage2") > -1) {
				var descimage1 = scene.getMeshByID(moldnameroot + "-descimage1");
				var descimage2 = scene.getMeshByID(moldnameroot + "-descimage2");
				if (descimage1 != null && descimage2 != null) {
					if (descimage1.material != undefined) {
						descimage1.material.alpha = 1;
					}
					if (descimage2.material != undefined) {
						descimage2.material.alpha = 0;
					}
				}
			}
			if (moldname.indexOf("addtocart") > -1) {
				var addtocart = scene.getMeshByID(moldname);
				if (addtocart != null) {
					if (addtocart.material != undefined) {
						addtocart.material.alpha = 0;
					}
				}
			}
			if (moldname.indexOf("readmore") > -1) {
				var readmore = scene.getMeshByID(moldname);
				if (readmore != null) {
					if (readmore.material != undefined) {
						readmore.material.alpha = 0;
					}
				}
			}
		} else if (moldname.indexOf("carthover") > -1) {
			var carthover = scene.getMeshByID(moldnameroot + "-carthover");
			if (carthover != null) {
				if (carthover.material != undefined) {
					carthover.material.alpha = 1;
				}
			}
		} else if (moldname.indexOf("storecategories") > -1) {
			if (moldname.indexOf("categorybuttonhover") > -1) {
				var categoryhover = scene.getMeshByID(moldname);
				if (categoryhover != null) {
					if (categoryhover.material != undefined) {
						categoryhover.material.alpha = 1;
					}
				}
			}
			if (moldname.indexOf("downbuttonhover") > -1) {
				var downbuttonhover = scene.getMeshByID(moldname);
				if (downbuttonhover != null) {
					if (downbuttonhover.material != undefined) {
						downbuttonhover.material.alpha = 1;
					}
				}
			}
			if (moldname.indexOf("upbuttonhover") > -1) {
				var upbuttonhover = scene.getMeshByID(moldname);
				if (upbuttonhover != null) {
					if (upbuttonhover.material != undefined) {
						upbuttonhover.material.alpha = 1;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-checkHovers=" + ex.message);
	}
}

wtwshopping.prototype.resetHovers = function(moldname, shape) {
	try {
		if (shape == 'storeproduct') {
			var nameparts = WTW.lastID.split('-');
			var moldnameroot = nameparts[0] + "-" + nameparts[1] + "-" + nameparts[2] + "-" + nameparts[3] + "-" + nameparts[4] + "-" + nameparts[5];
			if (WTW.lastID.indexOf("descimage1") > -1 || WTW.lastID.indexOf("descimage2") > -1) {
				var descimage1 = scene.getMeshByID(moldnameroot + "-descimage1");
				var descimage2 = scene.getMeshByID(moldnameroot + "-descimage2");
				if (descimage1 != null && descimage2 != null) {
					if (descimage1.material != undefined) {
						descimage1.material.alpha = 0;
					}
					if (descimage2.material != undefined) {
						descimage2.material.alpha = 1;
					}
				}
			}
			if (WTW.lastID.indexOf("addtocart") > -1) {
				var addtocart = scene.getMeshByID(WTW.lastID);
				if (addtocart != null) {
					if (addtocart.material != undefined) {
						addtocart.material.alpha = 1;
					}
				}
			}
			if (WTW.lastID.indexOf("readmore") > -1) {
				var readmore = scene.getMeshByID(WTW.lastID);
				if (readmore != null) {
					if (readmore.material != undefined) {
						readmore.material.alpha = 1;
					}
				}
			}
		} else if (WTW.lastID.indexOf("carthover") > -1) {
			var carthover = scene.getMeshByID(moldnameroot + "-carthover");
			if (carthover != null) {
				if (carthover.material != undefined) {
					carthover.material.alpha = 0;
				}
			}
		} else if (WTW.lastID.indexOf("storecategories") > -1) {
			if (WTW.lastID.indexOf("categorybuttonhover") > -1) {
				var categoryhover = scene.getMeshByID(WTW.lastID);
				if (categoryhover != null) {
					if (categoryhover.material != undefined) {
						categoryhover.material.alpha = 0;
					}
				}
			}
			if (WTW.lastID.indexOf("downbuttonhover") > -1) {
				var downbuttonhover = scene.getMeshByID(WTW.lastID);
				if (downbuttonhover != null) {
					if (downbuttonhover.material != undefined) {
						downbuttonhover.material.alpha = 0;
					}
				}
			}
			if (WTW.lastID.indexOf("upbuttonhover") > -1) {
				var upbuttonhover = scene.getMeshByID(WTW.lastID);
				if (upbuttonhover != null) {
					if (upbuttonhover.material != undefined) {
						upbuttonhover.material.alpha = 0;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-resetHovers=" + ex.message);
	}
}

wtwshopping.prototype.getStoreMolds = function(zmoldname) {
	/* for each mold that is a store mold, there are settings stored in the database. */
	/* they can be a preset category (like for a section of a store), preset product (like a sale item) */
	/* and the allow search flag to decide if the product display can be overwritten by search results */
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		var zstore = WTWShopping.getStoreData(zmoldname);
		if (zstore != null && zstore.price != undefined) {
			/* reloads from mold-store settings if it has already been loaded */
			WTWShopping.loadProductDisplay(zmoldname, zstore.productname, zstore.price, zstore.productid, zstore.slug, zstore.imageurl, zstore.short_description, zstore.description);
		} else {
			/* set up the mold-store settings for first display */
			var zmoldsloaded = WTWShopping.checkStoreMoldsLoaded(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid);
			/* molds loaded: 0 means no, 1 means loading, and 2 means already fully loaded for this community, building, or thing */
			if (zmoldsloaded == 0) {
				/* mold-store settings have not been fetched - so fetch them from local WalkTheWeb site */
				/* mark the fetch queue as loading (in progress) so that it does not start multiple times */
				WTWShopping.updateStoreMoldsLoaded(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid, 1);
				/* fetch the store settings */
				WTW.getJSON("/connect/wtw-shopping-getmolds.php?communityid=" + zmoldnameparts.communityid + "&buildingid=" + zmoldnameparts.buildingid + "&thingid=" + zmoldnameparts.thingid, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						if (zresponse != null) {
							if (zresponse.length > 0) {
								var zstoreinfo = WTWShopping.getStoreID(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid);
								for (var i=0;i<zresponse.length;i++) {
									if (zresponse[i] != null) {
										if (zresponse[i].shoppingmoldid != undefined) {
											if (WTWShopping.checkStoreMold(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid, zresponse[i].moldid) == false) {
												/* this array is all ofthe molds that have store product functions - they will be added to the mold def - can be reused for multiple instances */
												WTWShopping.molds[WTWShopping.molds.length] = {
													'communityid': zmoldnameparts.communityid,
													'buildingid': zmoldnameparts.buildingid,
													'thingid': zmoldnameparts.thingid,
													'storeurl':zstoreinfo.storeurl,
													'wpplugin':'walktheweb',
													'storeiframes':zstoreinfo.storeiframes,
													'search':'',
													'moldid':zresponse[i].moldid,
													'productid':zresponse[i].productid,
													'productname':zresponse[i].productname,
													'slug':zresponse[i].slug,
													'price':'',
													'categoryid':'',
													'description':'',
													'shortdescription':'',
													'imageurl':'',
													'allowsearch':zresponse[i].allowsearch,
													'loaded': 0
												}
											}
										}
									}
								}
								/* set settings for any previously loaded mold to the mold defs */
								if (zmoldnameparts.molds != null) {
									for (var i=0;i< zmoldnameparts.molds.length;i++) {
										if (zmoldnameparts.molds[i] != null) {
											if (zmoldnameparts.molds[i].store == undefined && zmoldnameparts.molds[i].moldid != undefined) {
												/* check if shape is a store product type */
												switch (zmoldnameparts.molds[i].shape) {
													case "storeproduct":
													case "storeaddtocart":
													case "storebuynow":
													case "storereadmore":
														var zmoldproperties = WTWShopping.getStoreMoldProperties(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid, zmoldnameparts.molds[i].moldid);
														if (zmoldproperties != undefined) {
															zmoldnameparts.molds[i].store = zmoldproperties;
															if (zmoldproperties.loaded == 0) {
																WTWShopping.setProduct(zmoldproperties.categoryid, zmoldproperties.productid, zmoldproperties.productname, zmoldproperties.slug, zmoldnameparts.molds[i].moldname);
															}
														}
														break;
												}
											}
										}
									}
								}
								WTWShopping.updateStoreMoldsLoaded(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid, 2);
							}
						}
					}
				); 
			} else if (zmoldsloaded == 2) {
				var zmoldproperties = WTWShopping.getStoreMoldProperties(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid, zmoldnameparts.moldid);
				if (zmoldproperties != undefined) {
					if (zmoldnameparts.molds[zmoldnameparts.moldind] != null) {
						if (zmoldnameparts.molds[zmoldnameparts.moldind].store == undefined) {
							zmoldnameparts.molds[zmoldnameparts.moldind].store = zmoldproperties;
						}
						if (zmoldproperties.loaded == 0) {
							WTWShopping.setProduct(zmoldproperties.categoryid, zmoldproperties.productid, zmoldproperties.productname, zmoldproperties.slug, zmoldname);
						}
					}
				}
			}	
		}		
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-getStoreMolds=" + ex.message);
	}
}

wtwshopping.prototype.getStoreData = function(zmoldname) {
	var zstore = null;
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		if (zmoldnameparts.molds[zmoldnameparts.moldind] != null) {
			if (zmoldnameparts.molds[zmoldnameparts.moldind].store != null) {
				if (zmoldnameparts.molds[zmoldnameparts.moldind].store.productid != undefined) {
					if (zmoldnameparts.molds[zmoldnameparts.moldind].store.productid != '') {
						zstore = zmoldnameparts.molds[zmoldnameparts.moldind].store;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-getStoreData=" + ex.message);
	}
	return zstore;
}

wtwshopping.prototype.checkStoreMoldsLoaded = function(zcommunityid, zbuildingid, zthingid) {
	var zmoldsloaded = 0;
	try {
		if (WTWShopping.stores != null) {
			for (var i=0;i<WTWShopping.stores.length;i++) {
				if (WTWShopping.stores[i] != null) {
					if (WTWShopping.stores[i].storeid != undefined) {
						if (WTWShopping.stores[i].communityid == zcommunityid && WTWShopping.stores[i].buildingid == zbuildingid && WTWShopping.stores[i].thingid == zthingid) {
							zmoldsloaded = WTWShopping.stores[i].moldsloaded;
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-checkStoreMoldsLoaded=" + ex.message);
	}
	return zmoldsloaded;
}

wtwshopping.prototype.updateStoreMoldsLoaded = function(zcommunityid, zbuildingid, zthingid, zmoldsloaded) {
	try {
		if (WTWShopping.stores != null) {
			for (var i=0;i<WTWShopping.stores.length;i++) {
				if (WTWShopping.stores[i] != null) {
					if (WTWShopping.stores[i].storeid != undefined) {
						if (WTWShopping.stores[i].communityid == zcommunityid && WTWShopping.stores[i].buildingid == zbuildingid && WTWShopping.stores[i].thingid == zthingid) {
							WTWShopping.stores[i].moldsloaded = zmoldsloaded;
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-updateStoreMoldsLoaded=" + ex.message);
	}
}

wtwshopping.prototype.checkStoreMold = function(zcommunityid, zbuildingid, zthingid, zmoldid) {
	var zfound = false;
	try {
		if (WTWShopping.molds != null) {
			for (var i=0;i<WTWShopping.molds.length;i++) {
				if (WTWShopping.molds[i] != null) {
					if (WTWShopping.molds[i].moldid != undefined) {
						if (WTWShopping.molds[i].communityid == zcommunityid && WTWShopping.molds[i].buildingid == zbuildingid && WTWShopping.molds[i].thingid == zthingid && WTWShopping.molds[i].moldid == zmoldid) {
							zfound = true;
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-checkStoreMold=" + ex.message);
	}
	return zfound;
}

wtwshopping.prototype.getStoreMoldProperties = function(zcommunityid, zbuildingid, zthingid, zmoldid) {
	var zmoldproperties;
	try {
		if (WTWShopping.molds != null) {
			for (var i=0;i<WTWShopping.molds.length;i++) {
				if (WTWShopping.molds[i] != null) {
					if (WTWShopping.molds[i].moldid != undefined) {
						if (WTWShopping.molds[i].communityid == zcommunityid && WTWShopping.molds[i].buildingid == zbuildingid && WTWShopping.molds[i].thingid == zthingid && WTWShopping.molds[i].moldid == zmoldid) {
							zmoldproperties = WTWShopping.molds[i];
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-getStoreMoldProperties=" + ex.message);
	}
	return zmoldproperties;
}

wtwshopping.prototype.setProduct = function(zcategoryid, zproductid, zproductname, zslug, zmoldname) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		var zstoreinfo = WTWShopping.getStoreID(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid);
		if (WTW.adminView == 1) {
			dGet('wtw_tmoldproductid').value = zproductid;
			//dGet('wtw_tmoldproductname').value = zproductname;
			dGet('wtw_tmoldslug').value = zslug;
		}
		
		if (zmoldnameparts.molds[zmoldnameparts.moldind] != undefined) {
			if (zstoreinfo.woocommerceapiurl != "" && zproductid != '' && zproductid != undefined) {
				WTW.getJSON(zstoreinfo.woocommerceapiurl + "products/" + zproductid + "/?consumer_key=" + atob(zstoreinfo.woocommercekey) + "&consumer_secret=" + atob(zstoreinfo.woocommercesecret), 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						var zimageurl = '';
						if (zresponse.images != undefined) {
							if (zresponse.images[0] != null) {
								if (zimageurl = zresponse.images[0].src != undefined) {
									zimageurl = zresponse.images[0].src;
								}
							}
						}
						if (zresponse.name != undefined) {
							zmoldnameparts.molds[zmoldnameparts.moldind].store.productname = WTW.cleanHTMLText(zresponse.name);
							zmoldnameparts.molds[zmoldnameparts.moldind].store.productid = zproductid;
							zmoldnameparts.molds[zmoldnameparts.moldind].store.slug = zresponse.slug;
							zmoldnameparts.molds[zmoldnameparts.moldind].store.price = zresponse.price;
							zmoldnameparts.molds[zmoldnameparts.moldind].store.imageurl = zimageurl;
							zmoldnameparts.molds[zmoldnameparts.moldind].store.description = WTW.cleanHTMLText(zresponse.description);
							zmoldnameparts.molds[zmoldnameparts.moldind].store.shortdescription = WTW.cleanHTMLText(zresponse.shortdescription);
							zmoldnameparts.molds[zmoldnameparts.moldind].store.loaded = 1;
							
							var newproductind = WTWShopping.products.length;
							WTWShopping.products[newproductind] = WTWShopping.newProduct();
							WTWShopping.products[newproductind].communityid = zmoldnameparts.communityid;
							WTWShopping.products[newproductind].buildingid = zmoldnameparts.buildingid;
							WTWShopping.products[newproductind].thingid = zmoldnameparts.thingid;
							WTWShopping.products[newproductind].categoryid = zcategoryid;
							WTWShopping.products[newproductind].search = '';
							WTWShopping.products[newproductind].storeurl = zstoreinfo.storeurl;
							WTWShopping.products[newproductind].wpplugin = zstoreinfo.wpplugin;
							WTWShopping.products[newproductind].connectinggridind = zmoldnameparts.cgind.toString();
							WTWShopping.products[newproductind].connectinggridid = zmoldnameparts.cgid;
							WTWShopping.products[newproductind].productid = zproductid;
							WTWShopping.products[newproductind].productname = WTW.encode(WTW.cleanHTMLText(zresponse.name));
							WTWShopping.products[newproductind].slug = zresponse.slug;
							WTWShopping.products[newproductind].price = zresponse.price;
							WTWShopping.products[newproductind].description = WTW.encode(WTW.cleanHTMLText(zresponse.description));
							WTWShopping.products[newproductind].shortdescription = WTW.encode(WTW.cleanHTMLText(zresponse.shortdescription));
							WTWShopping.products[newproductind].imageurl = zimageurl;
							WTWShopping.products[newproductind].setcount = '1';
							
							/* show product on display */
							WTWShopping.loadProductDisplay(zmoldname, zresponse.name, zresponse.price, zproductid, zslug, zimageurl, zresponse.short_description, zresponse.description);
						}
					}
				);
			} else {
				WTWShopping.productFetchProducts(zmoldname, zcategoryid);
			}
		}
	} catch (ex) { 
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-setProduct=" + ex.message);
	}
}

wtwshopping.prototype.checkFetchQueue = function(zconnectinggridid, zconnectinggridind, zcategoryid, zsearch) {
	var zfetch = 0;
	try {
		if (WTWShopping.fetchQueue != null) {
			for (var i=0;i<WTWShopping.fetchQueue.length;i++) {
				if (WTWShopping.fetchQueue[i] != null) {
					if (WTWShopping.fetchQueue[i].connectinggridid != undefined) {
						if (WTWShopping.fetchQueue[i].connectinggridid == zconnectinggridid && Number(WTWShopping.fetchQueue[i].connectinggridind) == Number(zconnectinggridind) && WTWShopping.fetchQueue[i].categoryid == zcategoryid && WTWShopping.fetchQueue[i].search == zsearch) {
							zfetch = WTWShopping.fetchQueue[i].fetching;
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-checkFetchQueue=" + ex.message);
	}
	return zfetch;
}

wtwshopping.prototype.setFetchQueue = function(zconnectinggridid, zconnectinggridind, zcategoryid, zsearch, zfetching) {
	try {
		var zfound = false;
		if (WTWShopping.fetchQueue != null) {
			for (var i=0;i<WTWShopping.fetchQueue.length;i++) {
				if (WTWShopping.fetchQueue[i] != null) {
					if (WTWShopping.fetchQueue[i].connectinggridid != undefined) {
						if (WTWShopping.fetchQueue[i].connectinggridid == zconnectinggridid && Number(WTWShopping.fetchQueue[i].connectinggridind) == Number(zconnectinggridind) && WTWShopping.fetchQueue[i].categoryid == zcategoryid && WTWShopping.fetchQueue[i].search == zsearch) {
							WTWShopping.fetchQueue[i].fetching = zfetching;
							zfound = true;
						}
					}
				}
			}
		}
		if (zfound == false) {
			var zfetchind = WTWShopping.fetchQueue.length;
			WTWShopping.fetchQueue[zfetchind] = WTWShopping.newFetch();
			WTWShopping.fetchQueue[zfetchind].connectinggridid = zconnectinggridid;
			WTWShopping.fetchQueue[zfetchind].connectinggridind = zconnectinggridind;
			WTWShopping.fetchQueue[zfetchind].categoryid = zcategoryid;
			WTWShopping.fetchQueue[zfetchind].search = '';
			WTWShopping.fetchQueue[zfetchind].fetching = zfetching;
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-setFetchQueue=" + ex.message);
	}
}

wtwshopping.prototype.productFetchProducts = function(zmoldname, zcategoryid) {
	try {
		if (zcategoryid == undefined) {
			zcategoryid = '';
		}
		/* get variables attached to mold name */
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		/* get store info from store array */
		var zstoreinfo = WTWShopping.getStoreID(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid);
		/* check if search is already being fetched */
		var zfetching = WTWShopping.checkFetchQueue(zmoldnameparts.cgid, zmoldnameparts.cgind, zcategoryid, '');
		if (zfetching == 0) {
			/* set fetch queue to 1 for in progress */
			WTWShopping.setFetchQueue(zmoldnameparts.cgid, zmoldnameparts.cgind, zcategoryid, '', 1);
			/* get products from WooCommerce Store API */
			if (zstoreinfo.woocommerceapiurl != "") {
				var zurl = zstoreinfo.woocommerceapiurl + "products/?per_page=50&consumer_key=" + atob(zstoreinfo.woocommercekey) + "&consumer_secret=" + atob(zstoreinfo.woocommercesecret);
				if (zcategoryid != "") {
					/* alternate, get products by categoryid */
					zurl = zstoreinfo.woocommerceapiurl + "products/?per_page=50&category=" + zcategoryid + "&consumer_key=" + atob(zstoreinfo.woocommercekey) + "&consumer_secret=" + atob(zstoreinfo.woocommercesecret);
				}
				WTW.getJSON(zurl, 
					function(zresponse) {
						if (zresponse != null) {
							/* process results */
							WTWShopping.productLoadProducts(zmoldname, zcategoryid, JSON.parse(zresponse), zstoreinfo.storeurl, 'walktheweb');
						}
					}
				);
			} 
		} else if (zfetching == 2) {
			var zproductproperties = WTWShopping.getProductProperties(zmoldname, zcategoryid);
			if (zproductproperties != undefined) {
				WTWShopping.loadProductDisplay(zmoldname, zproductproperties.productname, zproductproperties.price, zproductproperties.productid, zproductproperties.slug, zproductproperties.imageurl, zproductproperties.shortdescription, zproductproperties.description)
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-productFetchProducts=" + ex.message);
	}  
}

wtwshopping.prototype.productLoadProducts = function(zmoldname, zcategoryid, zresponse, zstoreurl, zwpplugin) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		for (var i=0;i<zresponse.length;i++) {
			if (zresponse[i] != null) {
				var newproductind = WTWShopping.products.length;
				WTWShopping.products[newproductind] = WTWShopping.newProduct();
				WTWShopping.products[newproductind].communityid = zmoldnameparts.communityid;
				WTWShopping.products[newproductind].buildingid = zmoldnameparts.buildingid;
				WTWShopping.products[newproductind].thingid = zmoldnameparts.thingid;
				WTWShopping.products[newproductind].categoryid = zcategoryid;
				WTWShopping.products[newproductind].search = '';
				WTWShopping.products[newproductind].storeurl = zstoreurl;
				WTWShopping.products[newproductind].wpplugin = zwpplugin;
				WTWShopping.products[newproductind].connectinggridind = zmoldnameparts.cgind.toString();
				WTWShopping.products[newproductind].connectinggridid = zmoldnameparts.cgid;
				WTWShopping.products[newproductind].productid = zresponse[i].id;
				WTWShopping.products[newproductind].productname = WTW.encode(WTW.cleanHTMLText(zresponse[i].name));
				WTWShopping.products[newproductind].slug = zresponse[i].slug;
				WTWShopping.products[newproductind].price = zresponse[i].price;
				WTWShopping.products[newproductind].description = WTW.encode(WTW.cleanHTMLText(zresponse[i].description));
				WTWShopping.products[newproductind].shortdescription = WTW.encode(WTW.cleanHTMLText(zresponse[i].short_description));
				WTWShopping.products[newproductind].imageurl = '';
				WTWShopping.products[newproductind].setcount = '0';
				if (zresponse[i].images[0] != null) {
					WTWShopping.products[newproductind].imageurl = zresponse[i].images[0].src;
				}
			}
		}
		/* set settings for any previously loaded mold */
		if (zmoldnameparts.molds != null) {
			for (var i=0;i< zmoldnameparts.molds.length;i++) {
				if (zmoldnameparts.molds[i] != null) {
					if (zmoldnameparts.molds[i].moldid != undefined) {
						switch (zmoldnameparts.molds[i].shape) {
							case "storeproduct":
							case "storeaddtocart":
							case "storebuynow":
							case "storereadmore":
								var zproductproperties = WTWShopping.getProductProperties(zmoldnameparts.molds[i].moldname, zcategoryid);
								if (zproductproperties != undefined) {
									zmoldnameparts.molds[i].store = zproductproperties;
									WTWShopping.loadProductDisplay(zmoldnameparts.molds[i].moldname, zproductproperties.productname, zproductproperties.price, zproductproperties.productid, zproductproperties.slug, zproductproperties.imageurl, zproductproperties.shortdescription, zproductproperties.description)
								}
								break;
						}
					}
				}
			}
		}
		/* set the fetch queue to 2 for completed - that way new molds added will use the previous fetch results in getStoreMolds function */
		WTWShopping.setFetchQueue(zmoldnameparts.cgid, zmoldnameparts.cgind, zcategoryid, '', 2);
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-productLoadProducts=" + ex.message);
	}  
}

wtwshopping.prototype.getProductProperties = function(zmoldname, zcategoryid) {
	var zproductproperties;
	try {
		/* get variables attached to mold name */
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		if (WTWShopping.products != null) {
			var productind = 0;
			var zlowestsetcount = 100;
			for (var i=0;i<WTWShopping.products.length;i++) {
				if (WTWShopping.products[i] != null) {
					if (WTWShopping.products[i].connectinggridid != undefined) {
						if (WTWShopping.products[i].connectinggridid == zmoldnameparts.cgid && Number(WTWShopping.products[i].connectinggridind) == Number(zmoldnameparts.cgind) && WTWShopping.products[i].categoryid == zcategoryid) {
							if (Number(WTWShopping.products[i].setcount) < zlowestsetcount) {
								productind = i;
								zlowestsetcount = Number(WTWShopping.products[i].setcount);
							}
						}
					}
				}
			}
			if (WTWShopping.products[productind] != null) {
				WTWShopping.products[productind].setcount = Number(WTWShopping.products[productind].setcount) + 1;
				zproductproperties = WTWShopping.products[productind];
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-getProductProperties=" + ex.message);
	}
	return zproductproperties;
}

wtwshopping.prototype.productClearFetchProducts = function(zmoldname) {
	/* clear products for this community, building, or thing (by connecting grid) so that the search results can take their place */
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		/* products array holds products fetched from the WooCommerce site so they can be assigned to the molds and displayed */
		if (WTWShopping.products != null) {
			for (var i=WTWShopping.products.length;i > -1 ;i--) {
				if (WTWShopping.products[i] != null) {
					if (WTWShopping.products[i].setcount == "1" && WTWShopping.products[i].connectinggridind.toString() == zmoldnameparts.cgind.toString() && WTWShopping.products[i].connectinggridid == zmoldnameparts.cgid) {
						WTWShopping.products.splice(i,1);
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-productClearFetchProducts=" + ex.message);
	}  
}

wtwshopping.prototype.productFetchCategories = function(zmoldname) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		var zstoreinfo = WTWShopping.getStoreID(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid);
		if (zstoreinfo.woocommerceapiurl != "") {
			var zurl = zstoreinfo.woocommerceapiurl + "products/categories/?per_page=50&orderby=slug&consumer_key=" + atob(zstoreinfo.woocommercekey) + "&consumer_secret=" + atob(zstoreinfo.woocommercesecret);
			WTW.getJSON(zurl, 
				function(zresponse) {
					if (zresponse != null) {
						WTWShopping.productLoadCategories(zmoldname, JSON.parse(zresponse));
					}
				}
			);
		} 
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-productFetchCategories=" + ex.message);
	}  
}

wtwshopping.prototype.productLoadSearchResults = function(moldname, connectinggridid, connectinggridind) {
	try {
		var pi = 0;
		for (var i=0;i<WTW.communityMolds.length;i++) {
			if (WTW.communityMolds[i] != null) {
				if (WTW.communityMolds[i].store != undefined) {
					if (WTW.communityMolds[i].shape == 'storeproduct' && WTW.communityMolds[i].store.allowsearch != undefined && WTW.communityMolds[i].connectinggridid == connectinggridid && WTW.communityMolds[i].connectinggridind.toString() == connectinggridind.toString()) {
						if (WTW.communityMolds[i].store.allowsearch == '1' && WTWShopping.products[pi] != null) {
							WTW.communityMolds[i].store.storeurl = WTWShopping.products[pi].storeurl;
							WTW.communityMolds[i].store.wpplugin = WTWShopping.products[pi].wpplugin;
							//WTW.communityMolds[i].store.categoryid = WTWShopping.products[pi].categoryid;
							WTW.communityMolds[i].store.productid = WTWShopping.products[pi].productid;
							WTW.communityMolds[i].store.productname = WTWShopping.products[pi].productname;
							WTW.communityMolds[i].store.slug = WTWShopping.products[pi].slug;
							WTW.communityMolds[i].store.price = WTWShopping.products[pi].price;
							WTW.communityMolds[i].store.imageurl = WTWShopping.products[pi].imageurl;
							WTW.communityMolds[i].store.categoryid = WTWShopping.products[pi].categoryid;
							WTW.communityMolds[i].store.description = WTWShopping.products[pi].description;
							WTW.communityMolds[i].store.shortdescription = WTWShopping.products[pi].shortdescription;
							if (pi < WTWShopping.products.length - 1) {
								pi += 1;
							} else {
								pi = 0;
							}
							WTWShopping.setProduct(WTW.communityMolds[i].store.categoryid, WTW.communityMolds[i].store.productid, WTW.communityMolds[i].store.productname, WTW.communityMolds[i].store.slug, WTW.communityMolds[i].moldname);
						}	
					}
				}
			}
		} 
		if (WTW.buildingMolds != null) {
			if (WTW.buildingMolds != undefined) {
				for (var i=0;i<WTW.buildingMolds.length;i++) {
					if (WTW.buildingMolds[i] != null) {
						if (WTW.buildingMolds[i].store != undefined) {
							if (WTW.buildingMolds[i].shape == 'storeproduct' && WTW.buildingMolds[i].store.allowsearch != undefined && WTW.buildingMolds[i].connectinggridid == connectinggridid && WTW.buildingMolds[i].connectinggridind.toString() == connectinggridind.toString()) {
								if (WTWShopping.products != undefined) {
									if (WTWShopping.products[pi] != null) {
										if (WTW.buildingMolds[i].store.allowsearch == '1' && WTWShopping.products[pi] != null) {
											WTW.buildingMolds[i].store.storeurl = WTWShopping.products[pi].storeurl;
											WTW.buildingMolds[i].store.wpplugin = WTWShopping.products[pi].wpplugin;
											WTW.buildingMolds[i].store.productid = WTWShopping.products[pi].productid;
											WTW.buildingMolds[i].store.productname = WTWShopping.products[pi].productname;
											WTW.buildingMolds[i].store.slug = WTWShopping.products[pi].slug;
											WTW.buildingMolds[i].store.price = WTWShopping.products[pi].price;
											WTW.buildingMolds[i].store.imageurl = WTWShopping.products[pi].imageurl;
											WTW.buildingMolds[i].store.categoryid = WTWShopping.products[pi].categoryid;
											WTW.buildingMolds[i].store.description = WTWShopping.products[pi].description;
											WTW.buildingMolds[i].store.shortdescription = WTWShopping.products[pi].shortdescription;
											if (pi < WTWShopping.products.length - 1) {
												pi += 1;
											} else {
												pi = 0;
											}
											WTWShopping.setProduct(WTW.buildingMolds[i].store.categoryid, WTW.buildingMolds[i].store.productid, WTW.buildingMolds[i].store.productname, WTW.buildingMolds[i].store.slug, WTW.buildingMolds[i].moldname);
										}	
									}
								}
							} 
						}
					}
				} 
			}
		}
		for (var i=0;i<WTW.thingMolds.length;i++) {
			if (WTW.thingMolds[i] != null) {
				if (WTW.thingMolds[i].store != undefined) {
					if (WTW.thingMolds[i].shape == 'storeproduct' && WTW.thingMolds[i].store.allowsearch != undefined && WTW.thingMolds[i].connectinggridid == connectinggridid && WTW.thingMolds[i].connectinggridind.toString() == connectinggridind.toString()) {
						if (WTW.thingMolds[i].store.allowsearch == '1' && WTWShopping.products[pi] != null) {
							WTW.thingMolds[i].store.storeurl = WTWShopping.products[pi].storeurl;
							WTW.thingMolds[i].store.wpplugin = WTWShopping.products[pi].wpplugin;
							WTW.thingMolds[i].store.productid = WTWShopping.products[pi].productid;
							WTW.thingMolds[i].store.productname = WTWShopping.products[pi].productname;
							WTW.thingMolds[i].store.slug = WTWShopping.products[pi].slug;
							WTW.thingMolds[i].store.price = WTWShopping.products[pi].price;
							WTW.thingMolds[i].store.imageurl = WTWShopping.products[pi].imageurl;
							WTW.thingMolds[i].store.categoryid = WTWShopping.products[pi].categoryid;
							WTW.thingMolds[i].store.description = WTWShopping.products[pi].description;
							WTW.thingMolds[i].store.shortdescription = WTWShopping.products[pi].shortdescription;
							if (pi < WTWShopping.products.length - 1) {
								pi += 1;
							} else {
								pi = 0;
							}
							WTWShopping.setProduct(WTW.thingMolds[i].store.categoryid, WTW.thingMolds[i].store.productid, WTW.thingMolds[i].store.productname, WTW.thingMolds[i].store.slug, WTW.thingMolds[i].moldname);
						}	
					}
				}
			}
		} 
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-productLoadSearchResults=" + ex.message);
	}  
}








wtwshopping.prototype.loadProductDisplay = function(moldname, productname, price, productid, slug, imageurl, shortdescription, description) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		var zcommunityid = moldnameparts.communityid;
		var zbuildingid = moldnameparts.buildingid;
		var zthingid = moldnameparts.thingid;
		var zstoreinfo = WTWShopping.getStoreID(zcommunityid, zbuildingid, zthingid);
		if (zstoreinfo.storeurl != "") {
			if (imageurl != '') {
				//WTW.getJSON(zstoreinfo.storeurl + "/walktheweb/image.php?walktheweb_image_url=" + imageurl, 
				WTW.getJSON(zstoreinfo.storeurl + "/image.php?walktheweb_image_url=" + imageurl, 
					function(response2) {
						if (response2 != null) {
							var pimage = scene.getMeshByID(moldname + "-clickimage");
							if (pimage != null) {
								try {
									if (pimage.material.diffuseTexture != null) {
										pimage.material.diffuseTexture.dispose();
										pimage.material.diffuseTexture = null;
									}
								} catch(ex) {}
								try {
									if (pimage.material != null) {
										pimage.material.dispose();
										pimage.material = null;
									}
								} catch(ex) {}
							}
							var pimage2 = scene.getMeshByID(moldname + "-clickimage2");
							if (pimage2 != null) {
								try {
									if (pimage2.material.diffuseTexture != null) {
										pimage2.material.diffuseTexture.dispose();
										pimage2.material.diffuseTexture = null;
									}
								} catch(ex) {}
								try {
									if (pimage2.material != null) {
										pimage2.material.dispose();
										pimage2.material = null;
									}
								} catch(ex) {}
							}
							var imagedata = JSON.parse(response2);
							var newimage = new Image();
							newimage.src = imagedata[0].url;  
							newimage.onload = function() {
								var opacity = 1;
								var covering = new BABYLON.StandardMaterial("cubemat" + moldname + "-clickimage", scene);
								covering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(imagedata[0].data, "cubemat" + moldname + "-clickimagemat", scene);
								covering.alpha = 1; //opacity;
								covering.specularColor = new BABYLON.Color3(opacity, opacity, opacity);
								/* covering.emissiveColor = new BABYLON.Color3(opacity, opacity, opacity); */
								covering.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
								covering.diffuseColor = new BABYLON.Color3(opacity, opacity, opacity);		
								var pimage = scene.getMeshByID(moldname + "-clickimage");
								if (pimage != null) {
									pimage.isVisible = true;
									pimage.material = covering;
								}
								var pimage2 = scene.getMeshByID(moldname + "-clickimage2");
								if (pimage2 != null) {
									pimage2.isVisible = true;
									pimage2.material = covering;
								}
							} 
						} 
					}
				);
			}
			var lineheigth = "34px";
			var fontheight = "40px";
			var titleimage = scene.getMeshByID(moldname + "-titleimagesm");
			var titleimage2 = scene.getMeshByID(moldname + "-titleimage2sm");

			var namelength = WTW.cleanHTMLText(productname).length;
			
			if (namelength > 224) {
				lineheigth = "10px";
				fontheight = "12px";
			} else if (namelength > 120) {
				lineheigth = "14px";
				fontheight = "16px";
			} else if (namelength > 50) {
				lineheigth = "18px";
				fontheight = "20px";
			} else if (namelength > 32) {
				lineheigth = "20px";
				fontheight = "24px";
			} else if (namelength > 27) {
				lineheigth = "24px";
				fontheight = "30px";
			} else if (namelength > 22) {
				lineheigth = "30px";
				fontheight = "36px";
			}
			if (titleimage != null) {
				try {
					if (titleimage.material.diffuseTexture != null) {
						titleimage.material.diffuseTexture.dispose();
						titleimage.material.diffuseTexture = null;
					}
				} catch(ex) {}
				try {
					if (titleimage.material != null) {
						titleimage.material.dispose();
						titleimage.material = null;
					}
				} catch(ex) {}

				var coveringtitle = new BABYLON.StandardMaterial("mat" + moldname + "-titleimagetexture", scene);
				coveringtitle.alpha = 1;
				
				var contentTexture = new BABYLON.DynamicTexture(moldname + "-titleimagetexture", {width: 512,height: 512}, scene, true);
				contentTexture.name = moldname + "-titleimagetexture";
				coveringtitle.diffuseTexture = contentTexture;
				titleimage.material = coveringtitle;
				WTW.wrapText(titleimage, WTW.cleanHTMLText(productname), lineheigth, fontheight, "center", "top", "yellow", 5, 0); // was 5,0
				coveringtitle.emissiveColor = new BABYLON.Color3(1, 1, 1);
				coveringtitle.diffuseTexture.vScale = .2
				coveringtitle.diffuseTexture.vOffset = .85
				if (titleimage2 != null) {
					try {
						if (titleimage2.material.diffuseTexture != null) {
							titleimage2.material.diffuseTexture.dispose();
							titleimage2.material.diffuseTexture = null;
						}
					} catch(ex) {}
					try {
						if (titleimage2.material != null) {
							titleimage2.material.dispose();
							titleimage2.material = null;
						}
					} catch(ex) {}
					titleimage2.material = coveringtitle;
				}
			}


			
			
/*			var titleimage2 = scene.getMeshByID(moldname + "-titleimage2");
			if (titleimage2 == null) {
				titleimage2 = scene.getMeshByID(moldname + "-titleimage2sm");
			}
*/
/*			if (titleimage2 != null) {
				try {
					if (titleimage2.material.diffuseTexture != null) {
						titleimage2.material.diffuseTexture.dispose();
						titleimage2.material.diffuseTexture = null;
					}
				} catch(ex) {}
				try {
					if (titleimage2.material != null) {
						titleimage2.material.dispose();
						titleimage2.material = null;
					}
				} catch(ex) {}
				var coveringtitle2 = new BABYLON.StandardMaterial("mat" + moldname + "-titleimage2texture", scene);
				coveringtitle2.alpha = 1;
				coveringtitle2.specularColor = new BABYLON.Color3(.7, .7, .7);
				/ * coveringtitle2.emissiveColor = new BABYLON.Color3(.7, .7, .7); * /
				coveringtitle2.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
				coveringtitle2.diffuseColor = new BABYLON.Color3(.7, .7, .7);
				var contentTexture2 = new BABYLON.DynamicTexture(moldname + "-titleimage2texture", {width: 512,height: 512}, scene, true);
				contentTexture2.name = moldname + "-titleimage2texture";
				coveringtitle2.diffuseTexture = contentTexture2;
				titleimage2.material = coveringtitle2;
				WTW.wrapText(titleimage2, WTW.cleanHTMLText(productname), lineheigth, fontheight, "center", "top", "white", 0, 0);
				if (titleimage2.name.indexOf("-titleimage2sm") > -1) {
					coveringtitle2.diffuseTexture.vScale = .1;
					coveringtitle2.diffuseTexture.vOffset = .9;
				}
			}
			var desctext = "";
			if (shortdescription != null) {
				if (shortdescription != undefined) {
					if (shortdescription.length > 0) {
						desctext = shortdescription;
					}
				}
			}
			if (desctext == "") {
				if (description != null) {
					if (description != undefined) {
						if (description.length > 0) {
							desctext = description;
						}
					}
				}
			}
			var descimage1 = scene.getMeshByID(moldname + "-descimage1");
			if (descimage1 != null) {
				try {
					if (descimage1.material.diffuseTexture != null) {
						descimage1.material.diffuseTexture.dispose();
						descimage1.material.diffuseTexture = null;
					}
				} catch(ex) {}
				try {
					if (descimage1.material != null) {
						descimage1.material.dispose();
						descimage1.material = null;
					}
				} catch(ex) {}
				var coveringdesc1 = new BABYLON.StandardMaterial("mat" + moldname + "-descimage1texture", scene);
				coveringdesc1.alpha = 0;
				coveringdesc1.specularColor = new BABYLON.Color3(.7, .7, .7);
				/ * coveringdesc1.emissiveColor = new BABYLON.Color3(.7, .7, .7); * /
				coveringdesc1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
				coveringdesc1.diffuseColor = new BABYLON.Color3(.7, .7, .7);
				var contentTexture3 = new BABYLON.DynamicTexture(moldname + "-descimage1texture", {width: 512,height: 512}, scene, true);
				contentTexture3.name = moldname + "-descimage1texture";
				coveringdesc1.diffuseTexture = contentTexture3;
				descimage1.material = coveringdesc1;
				WTW.wrapText(descimage1, WTW.cleanHTMLText(desctext), "30px", "30px", "left", "top", "white", 0, 0, "90%", "20px", "10px"); // , tmaxwidth, tmarginleft, tmarginright, tfloat, tfloatwidth, tfloatheight
			}

			var descimage2 = scene.getMeshByID(moldname + "-descimage2");
			if (descimage2 != null) {
				try {
					if (descimage2.material.diffuseTexture != null) {
						descimage2.material.diffuseTexture.dispose();
						descimage2.material.diffuseTexture = null;
					}
				} catch(ex) {}
				try {
					if (descimage2.material != null) {
						descimage2.material.dispose();
						descimage2.material = null;
					}
				} catch(ex) {}
				var coveringdesc2 = new BABYLON.StandardMaterial("mat" + moldname + "-descimage2texture", scene);
				coveringdesc2.alpha = 0;
				coveringdesc2.specularColor = new BABYLON.Color3(.7, .7, .7);
				/ * coveringdesc2.emissiveColor = new BABYLON.Color3(.7, .7, .7); * /
				coveringdesc2.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
				coveringdesc2.diffuseColor = new BABYLON.Color3(.7, .7, .7);
				var contentTexture4 = new BABYLON.DynamicTexture(moldname + "-descimage2texture", {width: 512,height: 512}, scene, true);
				contentTexture4.name = moldname + "-descimage2texture";
				coveringdesc2.diffuseTexture = contentTexture4;
				descimage2.material = coveringdesc2;
				WTW.wrapText(descimage2, WTW.cleanHTMLText(desctext), "30px", "30px", "left", "top", "white", 0, 0, "90%", "20px", "10px");
			}

			var readmore1 = scene.getMeshByID(moldname + "-readmore1");
			if (readmore1 != null) {
				try {
					if (readmore1.material.diffuseTexture != null) {
						readmore1.material.diffuseTexture.dispose();
						readmore1.material.diffuseTexture = null;
					}
				} catch(ex) {}
				try {
					if (readmore1.material != null) {
						readmore1.material.dispose();
						readmore1.material = null;
					}
				} catch(ex) {}
				var coveringread1 = new BABYLON.StandardMaterial("mat" + moldname + "-readimage1texture", scene);
				coveringread1.alpha = 1;
				coveringread1.specularColor = new BABYLON.Color3(.2, .2, .2);
				/ * coveringread1.emissiveColor = new BABYLON.Color3(1, 1, 1); * /
				coveringread1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
				coveringread1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
				var readTexture1 = new BABYLON.DynamicTexture(moldname + "-readimage1texture", {width: 512,height: 512}, scene, true);
				readTexture1.name = moldname + "-readimage1texture";
				/ * readTexture1.hasAlpha = true; * /
				coveringread1.diffuseTexture = readTexture1;
				coveringread1.diffuseTexture.vScale = .2;
				coveringread1.diffuseTexture.uScale = 1;
				coveringread1.diffuseTexture.vOffset = .85;
				readmore1.material = coveringread1;
				WTW.wrapText(readmore1, "$" + Number(price).toFixed(2), lineheigth, fontheight, "center", "top", "white", 0, 0);
			}							
			
			var readmore2 = scene.getMeshByID(moldname + "-readmore2");
			if (readmore2 != null) {
				try {
					if (readmore2.material.diffuseTexture != null) {
						readmore2.material.diffuseTexture.dispose();
						readmore2.material.diffuseTexture = null;
					}
				} catch(ex) {}
				try {
					if (readmore2.material != null) {
						readmore2.material.dispose();
						readmore2.material = null;
					}
				} catch(ex) {}
				var coveringread2 = new BABYLON.StandardMaterial("mat" + moldname + "-readimage2texture", scene);
				coveringread2.alpha = 1;
				coveringread2.specularColor = new BABYLON.Color3(.2, .2, .2);
				/ * coveringread2.emissiveColor = new BABYLON.Color3(1, 1, 1); * /
				coveringread2.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
				coveringread2.diffuseColor = new BABYLON.Color3(.9, .9, .9);
				var readTexture2 = new BABYLON.DynamicTexture(moldname + "-readimage2texture", {width: 512,height: 512}, scene, true);
				readTexture2.name = moldname + "-readimage2texture";
				/ * readTexture2.hasAlpha = true; * /
				coveringread2.diffuseTexture = readTexture2;
				coveringread2.diffuseTexture.vScale = .2;
				coveringread2.diffuseTexture.uScale = 1;
				coveringread2.diffuseTexture.vOffset = .85;
				readmore2.material = coveringread2;
				WTW.wrapText(readmore2, "$" + Number(price).toFixed(2), lineheigth, fontheight, "center", "top", "white", 0, 0);
			}
*/			var price1 = scene.getMeshByID(moldname + "-price1");
			var price2 = scene.getMeshByID(moldname + "-price2");
			if (price1 != null) {
				try {
					if (price1.material.diffuseTexture != null) {
						price1.material.diffuseTexture.dispose();
						price1.material.diffuseTexture = null;
					}
				} catch(ex) {}
				try {
					if (price1.material != null) {
						price1.material.dispose();
						price1.material = null;
					}
				} catch(ex) {}
				var coveringprice1 = new BABYLON.StandardMaterial("mat" + moldname + "-coveringprice1texture", scene);
				coveringprice1.alpha = 1;
				coveringprice1.specularColor = new BABYLON.Color3(.2, .2, .2);
				coveringprice1.emissiveColor = new BABYLON.Color3(1, 1, 1);
				coveringprice1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
				var priceTexture1 = new BABYLON.DynamicTexture(moldname + "-coveringprice1texture", {width: 512,height: 512}, scene, true);
				priceTexture1.name = moldname + "-coveringprice1texture";
				coveringprice1.diffuseTexture = priceTexture1;
				coveringprice1.diffuseTexture.uScale = 1;
				coveringprice1.diffuseTexture.vScale = .08;
				coveringprice1.diffuseTexture.vOffset = .92;
				price1.material = coveringprice1;
				WTW.wrapText(price1, "$" + Number(price).toFixed(2), lineheigth, fontheight, "center", "top", "white", 0, 0);
				price1.material.diffuseTexture.uScale = .5
				price1.material.diffuseTexture.uOffset = .25
				if (price2 != null) {
					try {
						if (price2.material.diffuseTexture != null) {
							price2.material.diffuseTexture.dispose();
							price2.material.diffuseTexture = null;
						}
					} catch(ex) {}
					try {
						if (price2.material != null) {
							price2.material.dispose();
							price2.material = null;
						}
					} catch(ex) {}
					price2.material = coveringprice1;
				}
			}
		}
	} catch (ex) { 
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-loadProductDisplay=" + ex.message);
	}
}

wtwshopping.prototype.productReadMore = function(moldname) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		var zstoreinfo = WTWShopping.getStoreID(moldnameparts.communityid, moldnameparts.buildingid, moldnameparts.thingid);
		if (moldnameparts.moldind > -1 && zstoreinfo.storeproducturl != "") {
			if (moldnameparts.molds[moldnameparts.moldind] != null) {
				if (zstoreinfo.storeiframes == '1') {
					window.setTimeout(function() {
						WTW.openIFrame(zstoreinfo.storeproducturl + moldnameparts.molds[moldnameparts.moldind].store.slug + "/", .8, .8, "Read More...");
					},500);
				} else {
					WTW.openWebpage(zstoreinfo.storeproducturl + moldnameparts.molds[moldnameparts.moldind].store.slug + "/", '_blank');
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-productReadMore=" + ex.message);
	}  
}

wtwshopping.prototype.productAddToCart = function(moldname) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		var zstoreinfo = WTWShopping.getStoreID(moldnameparts.communityid, moldnameparts.buildingid, moldnameparts.thingid);
		if (moldnameparts.moldind > -1 && zstoreinfo.storecarturl != "") {
			if (moldnameparts.molds[moldnameparts.moldind] != null) {
				var zproductid = moldnameparts.molds[moldnameparts.moldind].store.productid;
				if (zstoreinfo.storeiframes == '1') {
					window.setTimeout(function() {
						WTW.openIFrame(zstoreinfo.storecarturl + "?add-to-cart=" + zproductid, .8, .8, "Shopping Cart");
					},500);
				} else {
					WTW.openWebpage(zstoreinfo.storecarturl + "?add-to-cart=" + zproductid, '_blank');
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-productAddToCart=" + ex.message);
	}  
}

wtwshopping.prototype.productShowCart = function(moldname) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		var zstoreinfo = WTWShopping.getStoreID(moldnameparts.communityid, moldnameparts.buildingid, moldnameparts.thingid);
		if (zstoreinfo.storecarturl != "") {
			if (zstoreinfo.storeiframes == '1') {
				WTW.openIFrame(zstoreinfo.storecarturl, .8, .8, "Shopping Cart");
			} else {
				WTW.openWebpage(zstoreinfo.storecarturl, '_blank');
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-productShowCart=" + ex.message);
	}  
}

wtwshopping.prototype.productSelectCategory = function(zmoldname) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		WTWShopping.productClearForSearchResults(zmoldname, zmoldnameparts.cgid, zmoldnameparts.cgind);
		if (zmoldnameparts.namepart[7] != null) {
			WTWShopping.productFetchProducts(zmoldname,zmoldnameparts.namepart[7]);
		} else {
			WTWShopping.productFetchProducts(zmoldname,'');
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-productSelectCategory=" + ex.message);
	}  
}

wtwshopping.prototype.productSelectCategoryScroll = function(moldname, increment) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		var catbuttonname = moldname.replace("downbuttonhover","categorybutton").replace("upbuttonhover","categorybutton");
		var storecategories = scene.getMeshByID(catbuttonname.replace("-categorybutton",""));
		var upbutton = scene.getMeshByID(catbuttonname.replace("categorybutton","upbutton"));
		var upbuttonhover = scene.getMeshByID(catbuttonname.replace("categorybutton","upbuttonhover"));
		var downbutton = scene.getMeshByID(catbuttonname.replace("categorybutton","downbutton"));
		var downbuttonhover = scene.getMeshByID(catbuttonname.replace("categorybutton","downbuttonhover"));
		var move = 0;
		if (upbutton != null && upbuttonhover != null) {
			if (increment < 0 && upbutton.visibility == 1) {
				move = 1;
			}
		}
		if (downbutton != null && downbuttonhover != null) {
			if (increment > 0 && downbutton.visibility == 1) {
				move = 1;
			}
		}
		if (storecategories != null && move == 1) {
			var leny = storecategories.scaling.y;
			var firsty = leny * .42;
			var lasty = -leny * .42;
			var showup = 0;
			var showdown = 0;
			for (var i=0;i<scene.meshes.length;i++) {
				if (scene.meshes[i] != null) {
					if (scene.meshes[i].id != undefined) {
						if (scene.meshes[i].id.indexOf(catbuttonname) > -1) {
							var catbutton = scene.getMeshByID(scene.meshes[i].id);
							if (catbutton != null) {
								catbutton.position.y += increment;
								if (catbutton.position.y > firsty) {
									catbutton.visibility = 0;
									showup = 1;
								} else if (catbutton.position.y < lasty) {
									catbutton.visibility = 0;
									showdown = 1;
								} else {
									catbutton.visibility = 1;
								}
							}
						}
					}
				}
			}
			if (upbutton != null && upbuttonhover != null) {
				if (showup == 1) {
					upbutton.visibility = 1;
					upbuttonhover.visibility = 1;
				} else {
					upbutton.visibility = 0;
					upbuttonhover.visibility = 0;
				}
			}
			if (downbutton != null && downbuttonhover != null) {
				if (showdown == 1) {
					downbutton.visibility = 1;
					downbuttonhover.visibility = 1;
				} else {
					downbutton.visibility = 0;
					downbuttonhover.visibility = 0;
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-productSelectCategoryScroll=" + ex.message);
	}  
}

wtwshopping.prototype.productLoadCategories = function(moldname, response) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		var molddef = moldnameparts.molds[moldnameparts.moldind];
		var lenx = 1;
		var leny = 1;
		var lenz = 1;
		var firsty = 0;
		var incy = 0;
		var lasty = -5;
		var once = 0;
		var basemold = scene.getMeshByID(moldname + "-base");
		if (molddef != null) {
			if (molddef.scaling != undefined) {
				if (molddef.scaling.x != undefined) {
					lenx = Number(molddef.scaling.x);
				}
				if (molddef.scaling.y != undefined) {
					leny = Number(molddef.scaling.y);
				}
				if (molddef.scaling.z != undefined) {
					lenz = Number(molddef.scaling.z);
				}
			}
		}
		firsty = leny/2 -2.1;
		lasty = -leny/2 + 1;
		var categorybuttonall = BABYLON.MeshBuilder.CreateBox(moldname + "-categorybutton-", {}, scene);
		categorybuttonall.scaling = new BABYLON.Vector3(.2, lenz - 1, .9);
		categorybuttonall.position = new BABYLON.Vector3(-lenx/2 + .25, firsty, 0);
		categorybuttonall.rotation.x = WTW.getRadians(-90);
		categorybuttonall.parent = basemold;

		var categorybuttontextureall = new BABYLON.StandardMaterial("mat" + moldname + "-categorybuttontexture-", scene);
		categorybuttontextureall.alpha = 1;
		categorybuttontextureall.specularColor = new BABYLON.Color3(.2, .2, .2);
		/* categorybuttontextureall.emissiveColor = new BABYLON.Color3(1, 1, 1); */
		categorybuttontextureall.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		categorybuttontextureall.diffuseColor = new BABYLON.Color3(.9, .9, .9);
		var categoryTextureall = new BABYLON.DynamicTexture(moldname + "-categorybuttontexture-", {width: 512,height: 512}, scene, true);
		categoryTextureall.name = moldname + "-categorybuttontexture-";
		/* categoryTextureall.hasAlpha = true; */
		categorybuttontextureall.diffuseTexture = categoryTextureall;
		categorybuttontextureall.diffuseTexture.vScale = .11;
		categorybuttontextureall.diffuseTexture.uScale = 1;
		categorybuttontextureall.diffuseTexture.vOffset = .88;
		categorybuttonall.material = categorybuttontextureall;
		WTW.wrapText(categorybuttonall, "All", "45px", "40px", "center", "top", "white", 0, 0);
		
		var categorybuttonhoverall = BABYLON.MeshBuilder.CreateBox(moldname + "-categorybuttonhover-", {}, scene);
		categorybuttonhoverall.scaling = new BABYLON.Vector3(.2, lenz - .99, .91);
		categorybuttonhoverall.position = new BABYLON.Vector3(-lenx/2 + .15, firsty, 0);
		categorybuttonhoverall.rotation.x = WTW.getRadians(-90);
		categorybuttonhoverall.parent = basemold;
		
		var categorybuttontexturehoverall = new BABYLON.StandardMaterial("mat" + moldname + "-categorybuttontexturehover-", scene);
		categorybuttontexturehoverall.alpha = 0;
		categorybuttontexturehoverall.specularColor = new BABYLON.Color3(.2, .2, .2);
		/* categorybuttontexturehoverall.emissiveColor = new BABYLON.Color3(1, 1, 1); */
		categorybuttontexturehoverall.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		categorybuttontexturehoverall.diffuseColor = new BABYLON.Color3(.9, .9, .9);
		var categorytexturehoverall = new BABYLON.DynamicTexture(moldname + "-categorytexturehover-", {width: 512,height: 512}, scene, true);
		categorytexturehoverall.name = moldname + "-categorytexturehover-";
		/* categorytexturehoverall.hasAlpha = true; */
		categorybuttontexturehoverall.diffuseTexture = categorytexturehoverall;
		categorybuttontexturehoverall.diffuseTexture.vScale = .11;
		categorybuttontexturehoverall.diffuseTexture.uScale = 1;
		categorybuttontexturehoverall.diffuseTexture.vOffset = .88;
		categorybuttonhoverall.material = categorybuttontexturehoverall;
		WTW.wrapText(categorybuttonhoverall, "All", "45px", "40px", "center", "top", "yellow", 0, 0);
		WTW.registerMouseOver(categorybuttonhoverall);
		incy -= 1;
		if (response != null) {
			for (var i=0;i<response.length;i++) {
				if (response[i] != null) {
					if (response[i].count > 0) {
						var categoryid = response[i].id;
						var categoryname = response[i].name;
						var categoryslug = response[i].slug;
						if (categoryname != "") {
							var categorybutton = BABYLON.MeshBuilder.CreateBox(moldname + "-categorybutton-" + categoryid, {}, scene);
							categorybutton.scaling = new BABYLON.Vector3(.2, lenz - 1, .9);
							categorybutton.position = new BABYLON.Vector3(-lenx/2 + .25, firsty + incy, 0);
							categorybutton.rotation.x = WTW.getRadians(-90);
							categorybutton.parent = basemold;

							var categorybuttontexture = new BABYLON.StandardMaterial("mat" + moldname + "-categorybuttontexture-" + categoryid, scene);
							categorybuttontexture.alpha = 1;
							categorybuttontexture.specularColor = new BABYLON.Color3(.2, .2, .2);
							/* categorybuttontexture.emissiveColor = new BABYLON.Color3(1, 1, 1); */
							categorybuttontexture.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
							categorybuttontexture.diffuseColor = new BABYLON.Color3(.9, .9, .9);
							var categoryTexture = new BABYLON.DynamicTexture(moldname + "-categorybuttontexture-" + categoryid, {width: 512,height: 512}, scene, true);
							categoryTexture.name = moldname + "-categorybuttontexture-" + categoryid;
							/* categoryTexture.hasAlpha = true; */
							categorybuttontexture.diffuseTexture = categoryTexture;
							categorybuttontexture.diffuseTexture.vScale = .11;
							categorybuttontexture.diffuseTexture.uScale = 1;
							categorybuttontexture.diffuseTexture.vOffset = .88;
							categorybutton.material = categorybuttontexture;
							WTW.wrapText(categorybutton, categoryname, "45px", "40px", "center", "top", "white", 0, 0);
							
							var categorybuttonhover = BABYLON.MeshBuilder.CreateBox(moldname + "-categorybuttonhover-" + categoryid, {}, scene);
							categorybuttonhover.scaling = new BABYLON.Vector3(.2, lenz - .99, .91);
							categorybuttonhover.position = new BABYLON.Vector3(-lenx/2 + .15, firsty + incy, 0);
							categorybuttonhover.rotation.x = WTW.getRadians(-90);
							categorybuttonhover.parent = basemold;
							
							var categorybuttontexturehover = new BABYLON.StandardMaterial("mat" + moldname + "-categorybuttontexturehover-" + categoryid, scene);
							categorybuttontexturehover.alpha = 0;
							categorybuttontexturehover.specularColor = new BABYLON.Color3(.2, .2, .2);
							/* categorybuttontexturehover.emissiveColor = new BABYLON.Color3(1, 1, 1); */
							categorybuttontexturehover.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
							categorybuttontexturehover.diffuseColor = new BABYLON.Color3(.9, .9, .9);
							var categorytexturehover = new BABYLON.DynamicTexture(moldname + "-categorytexturehover-" + categoryid, {width: 512,height: 512}, scene, true);
							categorytexturehover.name = moldname + "-categorytexturehover-" + categoryid;
							/* categorytexturehover.hasAlpha = true; */
							categorybuttontexturehover.diffuseTexture = categorytexturehover;
							categorybuttontexturehover.diffuseTexture.vScale = .11;
							categorybuttontexturehover.diffuseTexture.uScale = 1;
							categorybuttontexturehover.diffuseTexture.vOffset = .88;
							categorybuttonhover.material = categorybuttontexturehover;
							WTW.wrapText(categorybuttonhover, categoryname, "45px", "40px", "center", "top", "yellow", 0, 0);
							WTW.registerMouseOver(categorybuttonhover);

							if (lasty > firsty + incy) {
								categorybutton.visibility = 0;
								categorybuttonhover.visibility = 0;
								
								if (once == 0) {
									var upbutton = BABYLON.MeshBuilder.CreateBox(moldname + "-upbutton", {}, scene);
									upbutton.scaling = new BABYLON.Vector3(.9, .9, .9);
									upbutton.position = new BABYLON.Vector3(-lenx/2 + .4, firsty + 1.1, -lenz/2 + .75);
									upbutton.rotation.x = WTW.getRadians(-90);
									upbutton.parent = basemold;
									
									var upbuttontexture = new BABYLON.StandardMaterial("mat" + moldname + "-upbutton", scene);
									upbuttontexture.emissiveTexture = new BABYLON.Texture("/content/system/images/arrowscrollup.jpg", scene);
									upbutton.material = upbuttontexture;
									upbutton.visibility = 0;

									var upbuttonhover = BABYLON.MeshBuilder.CreateBox(moldname + "-upbuttonhover", {}, scene);
									upbuttonhover.scaling = new BABYLON.Vector3(.95, .95, .95);
									upbuttonhover.position = new BABYLON.Vector3(-lenx/2 + .4, firsty + 1.1, -lenz/2 + .75);
									upbuttonhover.rotation.x = WTW.getRadians(-90);
									upbuttonhover.parent = basemold;
									
									var upbuttontexturehover = new BABYLON.StandardMaterial("mat" + moldname + "-upbuttonhover", scene);
									upbuttontexturehover.emissiveTexture = new BABYLON.Texture("/content/system/images/arrowscrollup2.jpg", scene);
									upbuttonhover.material = upbuttontexturehover;
									upbuttonhover.material.alpha = 0;
									WTW.registerMouseOver(upbuttonhover);
									upbuttonhover.visibility = 0;

									var downbutton = BABYLON.MeshBuilder.CreateBox(moldname + "-downbutton", {}, scene);
									downbutton.scaling = new BABYLON.Vector3(.9, .9, .9);
									downbutton.position = new BABYLON.Vector3(-lenx/2 + .4, lasty, -lenz/2 + .75);
									downbutton.rotation.x = WTW.getRadians(-90);
									downbutton.parent = basemold;
									
									var downbuttontexture = new BABYLON.StandardMaterial("mat" + moldname + "-downbutton", scene);
									downbuttontexture.emissiveTexture = new BABYLON.Texture("/content/system/images/arrowscrolldown.jpg", scene);
									downbutton.material = downbuttontexture;

									var downbuttonhover = BABYLON.MeshBuilder.CreateBox(moldname + "-downbuttonhover", {}, scene);
									downbuttonhover.scaling = new BABYLON.Vector3(.95, .95, .95);
									downbuttonhover.position = new BABYLON.Vector3(-lenx/2 + .4, lasty, -lenz/2 + .75);
									downbuttonhover.rotation.x = WTW.getRadians(-90);
									downbuttonhover.parent = basemold;
									
									var downbuttontexturehover = new BABYLON.StandardMaterial("mat" + moldname + "-downbuttonhover", scene);
									downbuttontexturehover.emissiveTexture = new BABYLON.Texture("/content/system/images/arrowscrolldown2.jpg", scene);
									downbuttonhover.material = downbuttontexturehover;
									downbuttonhover.material.alpha = 0;
									WTW.registerMouseOver(downbuttonhover);
									once = 1;
								}
							}
							incy -= 1;
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-productLoadCategories=" + ex.message);
	}  
}

wtwshopping.prototype.disposeClean = function(zmoldname) {
	try {
		if (zmoldname.indexOf("molds") > -1) {
			var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
			WTWShopping.productClearForSearchResults(zmoldname, zmoldnameparts.cgid, zmoldnameparts.cgind);
			if (zmoldnameparts.molds[zmoldnameparts.moldind] != null) {
				if (zmoldnameparts.molds[zmoldnameparts.moldind].store != undefined) {
					if (zmoldnameparts.molds[zmoldnameparts.moldind].store.loaded != undefined) {
						zmoldnameparts.molds[zmoldnameparts.moldind].store.loaded = 0;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-disposeClean=" + ex.message);
	}  
}

wtwshopping.prototype.productClearForSearchResults = function(zmoldname, connectinggridid, connectinggridind) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		
		if (zmoldnameparts.molds != null) {
			for (var i=0;i<zmoldnameparts.molds.length;i++) {
				if (zmoldnameparts.molds[i] != null) {
					if (zmoldnameparts.molds[i].store != undefined) {
						if (zmoldnameparts.molds[i].store.allowsearch != undefined) {
							if (zmoldnameparts.molds[i].store.allowsearch == '1' && zmoldnameparts.molds[i].connectinggridid == connectinggridid && Number(zmoldnameparts.molds[i].connectinggridind) == Number(connectinggridind)) {
								zmoldnameparts.molds[i].store.productid = "";
								zmoldnameparts.molds[i].store.productname = "";
								zmoldnameparts.molds[i].store.slug = "";
								zmoldnameparts.molds[i].store.price = "";
								zmoldnameparts.molds[i].store.categoryid = "";
								zmoldnameparts.molds[i].store.description = "";
								zmoldnameparts.molds[i].store.shortdescription = "";
								zmoldnameparts.molds[i].store.imageurl = "";
							}	
						}
					}
				}
			}
		}
		if (WTWShopping.products != null) {
			for (var i=WTWShopping.products.length;i > -1;i--) {
				if (WTWShopping.products[i] != null) {
					if (WTWShopping.products[i].connectinggridid == connectinggridid && Number(WTWShopping.products[i].connectinggridind) == Number(connectinggridind)) {
						WTWShopping.products.splice(i,1);
						i -= 1;
					}	
				}
			}
		}
		if (WTWShopping.fetchQueue != null) {
			for (var i=WTWShopping.fetchQueue.length;i > -1 ;i--) {
				if (WTWShopping.fetchQueue[i] != null) {
					if (WTWShopping.fetchQueue[i].connectinggridind.toString() == zmoldnameparts.cgind.toString() && WTWShopping.fetchQueue[i].connectinggridid == zmoldnameparts.cgid) {
						WTWShopping.fetchQueue.splice(i,1);
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-productClearForSearchResults=" + ex.message);
	}  
}

wtwshopping.prototype.getStoreInfo = function(moldname) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		var zcommunityid = moldnameparts.communityid;
		var zbuildingid = moldnameparts.buildingid;
		var zthingid = moldnameparts.thingid;
		var zstoreinfo = WTWShopping.getStoreID(zcommunityid, zbuildingid, zthingid);
		var buildingname = WTW.getBuildingName(moldnameparts.buildingid);
		if (zstoreinfo.woocommerceapiurl != "" && buildingname == '') {
			//var url = zstoreinfo.storeurl + "/walktheweb/storeinfo.php?walktheweb_store_info=1"; /* new plugin */
			var url = zstoreinfo.storeurl + "/storeinfo.php?walktheweb_store_info=1";
			WTW.getJSON(url, 
				function(response) {
					WTWShopping.setStoreInfo(moldname, JSON.parse(response));
				}
			);
		} 
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-getStoreInfo=" + ex.message);
	}  
}

wtwshopping.prototype.setStoreInfo = function(moldname, response) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		for (var i=0;i<response.length;i++) {
			if (response[i] != null) {
				var storename = "";
				if (response[i].storename != undefined) {
					storename = WTW.decode(response[i].storename);
				}
				var titlemold2 = scene.getMeshByID(moldname + "-titleimage2");
				if (titlemold2 != null) {
					try {
						if (titlemold2.material.diffuseTexture != null) {
							titlemold2.material.diffuseTexture.dispose();
							titlemold2.material.diffuseTexture = null;
						}
					} catch(ex) {}
					try {
						if (titlemold2.material != null) {
							titlemold2.material.dispose();
							titlemold2.material = null;
						}
					} catch(ex) {}
					var coveringtitle1 = new BABYLON.StandardMaterial("mat" + moldname + "-titleimage1texture", scene);
					coveringtitle1.alpha = 1;
					coveringtitle1.specularColor = new BABYLON.Color3(.2, .2, .2);
					/* coveringtitle1.emissiveColor = new BABYLON.Color3(1, 1, 1); */
					coveringtitle1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
					coveringtitle1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
					var contentTexture1 = new BABYLON.DynamicTexture(moldname + "-titleimage1texture", {width: 512,height: 512}, scene, true);
					contentTexture1.name = moldname + "-titleimage1texture";
					/* contentTexture1.hasAlpha = true; */
					coveringtitle1.diffuseTexture = contentTexture1;
					coveringtitle1.diffuseTexture.vScale = .5;
					coveringtitle1.diffuseTexture.uScale = 1;
					coveringtitle1.diffuseTexture.vOffset = .55;
					titlemold2.material = coveringtitle1;

					var namelength = WTW.decode(storename).length;
					var lineheigth = "140px";
					var fontheight = "140px";
					if (namelength > 238) {
						lineheigth = "20px";
						fontheight = "20px";
					} else if (namelength > 150) {
						lineheigth = "30px";
						fontheight = "30px";
					} else if (namelength > 70) {
						lineheigth = "40px";
						fontheight = "40px";
					} else if (namelength > 46) {
						lineheigth = "50px";
						fontheight = "42px";
					} else if (namelength > 21) {
						lineheigth = "80px";
						fontheight = "48px";
					} else if (namelength > 18) {
						lineheigth = "120px";
						fontheight = "50px";
					} else if (namelength > 14) {
						lineheigth = "130px";
						fontheight = "60px";
					} else if (namelength > 10) {
						lineheigth = "130px";
						fontheight = "70px";
					} else if (namelength > 6) {
						lineheigth = "120px";
						fontheight = "90px";
					}

					WTW.wrapText(titlemold2, WTW.decode(storename), lineheigth, fontheight, "center", "top", "white", 0, 0);
					i = response.length;
				}
			}
		}
		WTWShopping.productClearFetchProducts(moldname);
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-setStoreInfo=" + ex.message);
	}  
}

wtwshopping.prototype.getCategoriesList = function() {
	try {
		var zstoreinfo = WTWShopping.getStoreID(communityid, buildingid, thingid);
		if (zstoreinfo.woocommerceapiurl != "") {
			WTW.getJSON(zstoreinfo.woocommerceapiurl + "products/categories/?per_page=50&consumer_key=" + atob(zstoreinfo.woocommercekey) + "&consumer_secret=" + atob(zstoreinfo.woocommercesecret), 
				function(zresponse) {
					WTWShopping.loadCategoriesList(JSON.parse(zresponse));
				}
			);
		}
	} catch (ex) { 
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-getCategoriesList=" + ex.message);
	}
}

wtwshopping.prototype.loadCategoriesList = function(zresponse) {
	try {
		WTW.clearDDL("wtw_tcategoryid");
		var option = document.createElement("option");
		option.text = "--- All ---";
		option.value = "";
		if (dGet('wtw_tmoldcategoryid').value == "") {
			option.selected = true;
		}
		dGet("wtw_tcategoryid").add(option);
		for (var i=0;i<zresponse.length;i++) {
			if (zresponse[i] != null) {
				var option = document.createElement("option");
				option.text = zresponse[i].name;
				option.value = zresponse[i].id;
				if (option.value == dGet('wtw_tmoldcategoryid').value) {
					option.selected = true;
				}
				dGet("wtw_tcategoryid").add(option);
			}
		}
	} catch (ex) { 
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-loadCategoriesList=" + ex.message);
	}
}

wtwshopping.prototype.setCategory = function(categoryid) {
	try {
		dGet('wtw_tmoldcategoryid').value = categoryid;
		WTWShopping.getProductsList(categoryid);
	} catch (ex) { 
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-setCategory=" + ex.message);
	}
}

wtwshopping.prototype.getProductsList = function(zcategoryid) {
	try {
		if (zcategoryid == undefined) {
			zcategoryid = "";
		}
		var zstoreinfo = WTWShopping.getStoreID(communityid, buildingid, thingid);
		if (zstoreinfo.woocommerceapiurl != "") {
			var url = zstoreinfo.woocommerceapiurl + "products/?per_page=50&consumer_key=" + atob(zstoreinfo.woocommercekey) + "&consumer_secret=" + atob(zstoreinfo.woocommercesecret);
			if (zcategoryid != "") {
				url = zstoreinfo.woocommerceapiurl + "products/?per_page=50&category=" + zcategoryid + "&consumer_key=" + atob(zstoreinfo.woocommercekey) + "&consumer_secret=" + atob(zstoreinfo.woocommercesecret);
			}
			WTW.getJSON(url, 
				function(zresponse) {
					WTWShopping.loadProductsList(JSON.parse(zresponse));
				}
			);
		}
	} catch (ex) { 
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-getProductsList=" + ex.message);
	}
}

wtwshopping.prototype.loadProductsList = function(zresponse) {
	try {
		WTW.clearDDL("wtw_tproductid");
		var option = document.createElement("option");
		option.text = "--- All ---";
		option.value = "";
		if (dGet('wtw_tmoldproductid').value == "") {
			option.selected = true;
		}
		dGet("wtw_tproductid").add(option);
		for (var i=0;i<zresponse.length;i++) {
			if (zresponse[i] != null) {
				var option = document.createElement("option");
				option.text = zresponse[i].name;
				option.value = zresponse[i].id;
				if (zresponse[i].id == dGet('wtw_tmoldproductid').value) {
					option.selected = true;
				}
				dGet("wtw_tproductid").add(option);
			}
		}
	} catch (ex) { 
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-loadProductsList=" + ex.message);
	}
}

wtwshopping.prototype.setAllowSearch = function() {
	try {
		if (dGet('wtw_tallowsearch').checked) {
			dGet('wtw_tmoldallowsearch').value = "1";
		} else {
			dGet('wtw_tmoldallowsearch').value = "0";
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-setAllowSearch=" + ex.message);
	}
}

wtwshopping.prototype.openAddNewMold = function(moldgroup, shape, moldname) {
	try {
		switch (shape.toLowerCase()) {
			case "storeproduct":
			case "storeaddtocart":
			case "storebuynow":
			case "storereadmore":
				WTWShopping.getCategoriesList();
				WTWShopping.getProductsList('');
				break;
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-openAddNewMold=" + ex.message);
	}
}

wtwshopping.prototype.loadMoldForm = function(moldgroup, shape, moldname) {
	try {
		switch (shape.toLowerCase()) {
			case "storeproduct":
			case "storeaddtocart":
			case "storebuynow":
			case "storereadmore":
				WTWShopping.getCategoriesList();
				WTWShopping.getProductsList();
				break;
		}
		if (shape.toLowerCase() == "storeproduct") {
			if (WTW.isNumeric(dGet('wtw_tmoldspecial1').value)) {
				WTW.setDDLValue("wtw_tmoldspecial1set", Number(dGet('wtw_tmoldspecial1').value));
			} else {
				WTW.setDDLValue("wtw_tmoldspecial1set", 0);
			}
		}
		if (dGet('wtw_tmoldallowsearch').value == "1") {
			dGet('wtw_tallowsearch').checked = true;
		} else {
			dGet('wtw_tallowsearch').checked = false;
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-loadMoldForm=" + ex.message);
	}
}

wtwshopping.prototype.getStoreID = function(zcommunityid, zbuildingid, zthingid) {
	var zstoreid = "";
	var zstorename = "";
	var zstoreiframes = "0";
	var zstoreurl = "";
	var zstorecarturl = "";
	var zstoreproducturl = "";
	var zwoocommerceapiurl = "";
	var zwoocommercekey = "";
	var zwoocommercesecret = "";
	try {
		if (WTWShopping.stores != null) {
			for (var i=0;i<WTWShopping.stores.length;i++) {
				if (WTWShopping.stores[i] != null) {
					if (WTWShopping.stores[i].storeid != undefined) {
						if (WTWShopping.stores[i].communityid == zcommunityid && WTWShopping.stores[i].buildingid == zbuildingid && WTWShopping.stores[i].thingid == zthingid) {
							zstoreid = WTWShopping.stores[i].storeid;
							zstorename = WTWShopping.stores[i].storename;
							zstoreiframes = WTWShopping.stores[i].storeiframes;
							zstoreurl = WTWShopping.stores[i].storeurl;
							zstorecarturl = WTWShopping.stores[i].storecarturl;
							zstoreproducturl = WTWShopping.stores[i].storeproducturl;
							zwoocommerceapiurl = WTWShopping.stores[i].woocommerceapiurl;
							zwoocommercekey = WTWShopping.stores[i].woocommercekey;
							zwoocommercesecret = WTWShopping.stores[i].woocommercesecret;
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-getStoreID=" + ex.message);
	}
	return {
		'storeid':zstoreid,
		'storename':zstorename,
		'storeiframes':zstoreiframes,
		'storeurl':zstoreurl,
		'storecarturl':zstorecarturl,
		'storeproducturl':zstoreproducturl,
		'woocommerceapiurl':zwoocommerceapiurl,
		'woocommercekey':zwoocommercekey,
		'woocommercesecret':zwoocommercesecret
	};
}

wtwshopping.prototype.checkStoreID = function(zcommunityid, zbuildingid, zthingid) {
	var zfound = false;
	try {
		if (WTWShopping.stores != null) {
			for (var i=0;i<WTWShopping.stores.length;i++) {
				if (WTWShopping.stores[i] != null) {
					if (WTWShopping.stores[i].storeid != undefined) {
						if (WTWShopping.stores[i].communityid == zcommunityid && WTWShopping.stores[i].buildingid == zbuildingid && WTWShopping.stores[i].thingid == zthingid) {
							zfound = true;
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-checkStoreID=" + ex.message);
	}
	return zfound;
}

wtwshopping.prototype.loadConnectingGrids = function(zconnectinggridind, zcommunityid, zbuildingid, zthingid) {
	try {
		if (WTWShopping.checkStoreID(zcommunityid, zbuildingid, zthingid) == false) {
			WTW.getJSON("/connect/wtw-shopping-getconnectstore.php?communityid=" + zcommunityid + "&buildingid=" + zbuildingid + "&thingid=" + zthingid, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					if (zresponse != null) {
						for (var i=0;i<zresponse.length;i++) {
							if (zresponse[i] != null) {
								if (zresponse[i].storeid != undefined) {
									var storesind = WTWShopping.stores.length;
									WTWShopping.stores[storesind] = {
										'connectid':zresponse[i].connectid,
										'communityid':zresponse[i].communityid,
										'buildingid':zresponse[i].buildingid,
										'thingid':zresponse[i].thingid,
										'storeid':zresponse[i].storeid,
										'storename':zresponse[i].storename,
										'storeiframes':zresponse[i].storeiframes,
										'storeurl':zresponse[i].storeurl,
										'storecarturl':zresponse[i].storecarturl,
										'storeproducturl':zresponse[i].storeproducturl,
										'woocommerceapiurl':zresponse[i].woocommerceapiurl,
										'woocommercekey':zresponse[i].woocommercekey,
										'woocommercesecret':zresponse[i].woocommercesecret,
										'moldsloaded': 0
									};
								}
							}
						}
					}
					
				}
			); 
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-loadConnectingGrids=" + ex.message);
	}
}
/*
wtwshopping.prototype.getMoldProduct = function(moldname) {
	var moldnameparts = WTW.getMoldnameParts(moldname);
	try {
		WTW.getJSON("/connect/wtw-shopping-getmold.php?moldid=" + moldnameparts.moldid, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					if (zresponse.length > 0) {
						for (var i=0;i<zresponse.length;i++) {
							if (zresponse[i] != null) {
								if (zresponse[i].shoppingmoldid != undefined) {
									if (moldnameparts.molds[moldnameparts.moldind] != null) {
										if (moldnameparts.molds[moldnameparts.moldind].store == undefined) {
											var zstoreinfo = WTWShopping.getStoreID(moldnameparts.communityid, moldnameparts.buildingid, moldnameparts.thingid);
											moldnameparts.molds[moldnameparts.moldind].store = {
												'storeurl':zstoreinfo.storeurl,
												'wpplugin':'walktheweb',
												'storeiframes':zstoreinfo.storeiframes,
												'search':'',
												'productid':zresponse[i].productid,
												'productname':zresponse[i].productname,
												'slug':zresponse[i].slug,
												'price':'',
												'categoryid':zresponse[i].categoryid,
												'description':'',
												'shortdescription':'',
												'imageurl':'',
												'allowsearch':zresponse[i].allowsearch
											};
										} else {
											moldnameparts.molds[moldnameparts.moldind].store.productid = zresponse[i].productid;
											moldnameparts.molds[moldnameparts.moldind].store.categoryid = zresponse[i].categoryid;
											moldnameparts.molds[moldnameparts.moldind].store.slug = zresponse[i].slug;
											moldnameparts.molds[moldnameparts.moldind].store.allowsearch = zresponse[i].allowsearch;
										}
										if (WTW.adminView == 1) {
											if (dGet('wtw_tmoldname').value != '') {
												dGet('wtw_tmoldslug').value = zresponse[i].slug;
												//WTW.setDDLValue('wtw_tproductid', zresponse[i].productid);
												//WTW.setDDLValue('wtw_tcategoryid', zresponse[i].categoryid);
												if (zresponse[i].allowsearch == '1') {
													dGet('wtw_tallowsearch').checked = true;
												} else {
													dGet('wtw_tallowsearch').checked = false;
												}
												dGet('wtw_tmoldcategoryid').value = zresponse[i].categoryid;
												dGet('wtw_tmoldproductid').value = zresponse[i].productid;
												WTWShopping.getCategoriesList();
												WTWShopping.getProductsList(zresponse[i].categoryid);
											}
										}
										WTWShopping.setProduct(zresponse[i].categoryid, zresponse[i].productid, zresponse[i].productname, zresponse[i].slug, moldname);
									}
								}
							}
						}
					} else {
//						WTWShopping.getStoreMolds(moldname);
					}
				}
				
			}
		); 		
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-getMoldProduct=" + ex.message);
	}
}
*/
wtwshopping.prototype.openMoldForm = function(moldname, molds, moldind, shape) {
	try {
		var zstoreinfo = WTWShopping.getStoreID(communityid, buildingid, thingid);
		if (zstoreinfo.storeid != "") {
			WTWShopping.getStoreMolds(moldname);
			if (shape == "store3dsign" && molds[moldind] != null) {
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
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-openMoldForm=" + ex.message);
	}
}

wtwshopping.prototype.submitMoldForm = function(w) {
	try {
		switch (w) {
			case 0: /* delete mold */
				var zrequest = {
					'communityid':dGet('wtw_tcommunityid').value,
					'buildingid':dGet('wtw_tbuildingid').value,
					'thingid':dGet('wtw_tthingid').value,
					'moldid':dGet('wtw_tmoldid').value,
					'function':'deletemold'
				};
				WTW.postJSON("/core/handlers/wtwshopping-stores.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note: zresponse.serror would contain any error text */
					}
				);
				break;
			case -1: /* cancel edit */
				
				break;
			default: /* save mold */
				var zallowsearch = "0";
				if (dGet('wtw_tallowsearch').checked) {
					zallowsearch = "1";
				}
				var zrequest = {
					'communityid':dGet('wtw_tcommunityid').value,
					'buildingid':dGet('wtw_tbuildingid').value,
					'thingid':dGet('wtw_tthingid').value,
					'moldid':dGet('wtw_tmoldid').value,
					'slug':dGet('wtw_tmoldslug').value,
					'productid':dGet('wtw_tproductid').value,
					'categoryid':dGet('wtw_tcategoryid').value,
					'allowsearch':zallowsearch,
					'function':'savemold'
				};
				WTW.postJSON("/core/handlers/wtwshopping-stores.php", zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note: zresponse.serror would contain any error text */
					}
				);
				break;
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-submitMoldForm=" + ex.message);
	}
}

wtwshopping.prototype.productGetProduct = function(moldname) {
	try {
		var moldnameparts = WTW.getMoldnameParts(moldname);
		if (moldnameparts.shape == "storeproduct" || moldnameparts.shape == "storeaddtocart" || moldnameparts.shape == "storebuynow" || moldnameparts.shape == "storereadmore" || moldnameparts.shape == "storecheckout") {
			var found = false;
			var fetch = false;
			if (moldnameparts.molds[moldnameparts.moldind] != null && moldnameparts.cgid != '' && moldnameparts.cgind > -1) {
				if (WTWShopping.products != null) {
					for (var i=WTWShopping.products.length;i > -1 ;i--) {
						if (WTWShopping.products[i] != null) {
							if (WTWShopping.products[i].setcount == "0" && WTWShopping.products[i].connectinggridind.toString() == moldnameparts.cgind.toString() && WTWShopping.products[i].connectinggridid == moldnameparts.cgid) {
								moldnameparts.molds[moldnameparts.moldind].store.storeurl = WTWShopping.products[i].storeurl;
								moldnameparts.molds[moldnameparts.moldind].store.wpplugin = WTWShopping.products[i].wpplugin;
								moldnameparts.molds[moldnameparts.moldind].store.productid = WTWShopping.products[i].productid;
								moldnameparts.molds[moldnameparts.moldind].store.productname = WTWShopping.products[i].productname;
								moldnameparts.molds[moldnameparts.moldind].store.slug = WTWShopping.products[i].slug;
								moldnameparts.molds[moldnameparts.moldind].store.price = WTWShopping.products[i].price;
								moldnameparts.molds[moldnameparts.moldind].store.imageurl = WTWShopping.products[i].imageurl;
								moldnameparts.molds[moldnameparts.moldind].store.categoryid = WTWShopping.products[i].categoryid;
								moldnameparts.molds[moldnameparts.moldind].store.description = WTWShopping.products[i].description;
								moldnameparts.molds[moldnameparts.moldind].store.shortdescription = WTWShopping.products[i].shortdescription;
								WTWShopping.products.splice(i,1);
								found = true;
								i = WTWShopping.products.length;
							} else if (WTWShopping.products[i].setcount == "1" && WTWShopping.products[i].connectinggridind.toString() == moldnameparts.cgind.toString() && WTWShopping.products[i].connectinggridid == moldnameparts.cgid) {
								fetch = true;
								/* i = WTWShopping.products.length; */
							}
						}
					}
				}
				if (found == false) {
					if (fetch == false) {
						var newproductind = WTWShopping.products.length;
						WTWShopping.products[newproductind] = WTWShopping.newProduct();
						WTWShopping.products[newproductind].connectinggridind = moldnameparts.cgind.toString();
						WTWShopping.products[newproductind].connectinggridid = moldnameparts.cgid;
						WTWShopping.products[newproductind].search = "";
						WTWShopping.products[newproductind].setcount = "1";
						WTWShopping.productFetchProducts(moldname,'');
					}
					window.setTimeout(function() {
						WTWShopping.productGetProduct(moldname);
					}, 100);
				} else {
					WTWShopping.setProduct(moldnameparts.molds[moldnameparts.moldind].store.categoryid, moldnameparts.molds[moldnameparts.moldind].store.productid, moldnameparts.molds[moldnameparts.moldind].store.productname, moldnameparts.molds[moldnameparts.moldind].store.slug, moldname);
				} 
			}
		} 
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-productGetProduct=" + ex.message);
	}  
}

wtwshopping.prototype.clearEditMold = function() {
	try {
		dGet('wtw_tmoldproductid').value = "";
		dGet('wtw_tmoldslug').value = "";
		dGet('wtw_tmoldcategoryid').value = "";
		dGet('wtw_tmoldallowsearch').value = "1";
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-clearEditMold=" + ex.message);
	}
}

wtwshopping.prototype.openColorSelector = function(zmoldname, zshape, colortype) {
	try {
		switch (colortype) {
			case "diffuse":
				if (zshape == "storeproduct") {
					WTW.setColor(zmoldname + "-imageframe", 'diffuse', dGet('wtw_tdiffusecolorr').value, dGet('wtw_tdiffusecolorg').value, dGet('wtw_tdiffusecolorb').value);
				}
				break;
			case "specular":
				if (zshape == "storeproduct") {
					WTW.setColor(zmoldname + "-imageframe", 'specular', dGet('wtw_tspecularcolorr').value, dGet('wtw_tspecularcolorg').value, dGet('wtw_tspecularcolorb').value);
				}
				break;
			case "emissive":
				if (zshape == "storeproduct") {
					WTW.setColor(zmoldname + "-imageframe", 'emissive', dGet('wtw_temissivecolorr').value, dGet('wtw_temissivecolorg').value, dGet('wtw_temissivecolorb').value);
				}
				break;
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-openColorSelector=" + ex.message);
	}
}

wtwshopping.prototype.moldQueueAdd = function(moldname, mold) {
	try {
		if (WTW.adminView == 1) {
			if (moldname.indexOf("storeproduct") > -1 || moldname.indexOf("storeaddtocart") > -1 || moldname.indexOf("storebuynow") > -1 || moldname.indexOf("storereadmore") > -1 || moldname.indexOf("storecheckout") > -1) {
				if (mold.actionManager != null) {
					mold.actionManager.unregisterAction(WTW.mouseOver);
					mold.actionManager.unregisterAction(WTW.mouseOut);
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshopping.js-moldQueueAdd=" + ex.message);
	}
}

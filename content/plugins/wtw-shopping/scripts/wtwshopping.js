/* All code is Copyright 2013-2022 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

function wtwshopping() {
	this.stores = [];
	this.molds = [];
	this.products = [];
	this.fetchQueue = [];
	this.temptext = '';
}

var WTWShopping = new wtwshopping();

wtwshopping.prototype.newProduct = function() {
	var zproduct = '';
	try {
		zproduct = {
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
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-newProduct=' + ex.message);
	}
	return zproduct;
}

wtwshopping.prototype.newFetch = function() {
	var zfetch = '';
	try {
		zfetch = {
			'connectinggridid':'',
			'connectinggridind':'',
			'categoryid':'',
			'search':'',
			'fetching':'0'
		};
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-newFetch=' + ex.message);
	}
	return zfetch;
}

wtwshopping.prototype.onClick = function(zpickedname) {
	try {
		zpickedname = zpickedname.toLowerCase();
		if ((zpickedname.indexOf('-storeproduct') > -1 && zpickedname.indexOf('-readmore') > -1) || zpickedname.indexOf('-storereadmore') > -1) {
			WTWShopping.productReadMore(zpickedname);
		} else if ((zpickedname.indexOf('-storeproduct') > -1 && zpickedname.indexOf('-addtocart') > -1) || zpickedname.indexOf('-storeaddtocart') > -1 || zpickedname.indexOf('-storebuynow') > -1) {
			WTWShopping.productAddToCart(zpickedname);
		} else if (zpickedname.indexOf('-storeviewcart') > -1 || zpickedname.indexOf('-storecheckout') > -1) {
			WTWShopping.productShowCart(zpickedname);
		} else if (zpickedname.indexOf('-storecategories') > -1 && (zpickedname.indexOf('-categorybuttonhover') > -1 || zpickedname.indexOf('-base') > -1)) {
			WTWShopping.productSelectCategory(zpickedname);
		} else if (zpickedname.indexOf('-storecategories') > -1 && zpickedname.indexOf('-downbutton') > -1) {
			WTWShopping.productSelectCategoryScroll(zpickedname,1);
		} else if (zpickedname.indexOf('-storecategories') > -1 && zpickedname.indexOf('-upbutton') > -1) {
			WTWShopping.productSelectCategoryScroll(zpickedname,-1);
		} else if (zpickedname.indexOf('-productsearch') > -1 && zpickedname.indexOf('-searchbutton') > -1) {
			WTWShopping.searchProducts(zpickedname);
		} else if (zpickedname.indexOf('-productsearch') > -1 && zpickedname.indexOf('-searchtext') > -1) {
			WTWShopping.searchProductsText(zpickedname);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-onClick=' + ex.message);
	} 
}

wtwshopping.prototype.checkHovers = function(zmoldname, zshape) {
	try {
		if (zshape == 'storeproduct') {
			var znameparts = zmoldname.split('-');
			var zmoldnameroot = znameparts[0] + '-' + znameparts[1] + '-' + znameparts[2] + '-' + znameparts[3] + '-' + znameparts[4] + '-' + znameparts[5];
			if (zmoldname.indexOf('descimage1') > -1 || zmoldname.indexOf('descimage2') > -1) {
				var zdescimage1 = WTW.getMeshOrNodeByID(zmoldnameroot + '-descimage1');
				var zdescimage2 = WTW.getMeshOrNodeByID(zmoldnameroot + '-descimage2');
				if (zdescimage1 != null && zdescimage2 != null) {
					if (zdescimage1.material != undefined) {
						zdescimage1.material.alpha = 1;
					}
					if (zdescimage2.material != undefined) {
						zdescimage2.material.alpha = 0;
					}
				}
			}
			if (zmoldname.indexOf('addtocart') > -1) {
				var zaddtocart = WTW.getMeshOrNodeByID(zmoldname);
				if (zaddtocart != null) {
					if (zaddtocart.material != undefined) {
						zaddtocart.material.alpha = 0;
					}
				}
			}
			if (zmoldname.indexOf('readmore') > -1) {
				var zreadmore = WTW.getMeshOrNodeByID(zmoldname);
				if (zreadmore != null) {
					if (zreadmore.material != undefined) {
						zreadmore.material.alpha = 0;
					}
				}
			}
		} else if (zmoldname.indexOf('carthover') > -1) {
			var zcarthover = WTW.getMeshOrNodeByID(zmoldnameroot + '-carthover');
			if (zcarthover != null) {
				if (zcarthover.material != undefined) {
					zcarthover.material.alpha = 1;
				}
			}
		} else if (zmoldname.indexOf('storecategories') > -1) {
			if (zmoldname.indexOf('categorybuttonhover') > -1) {
				var zcategoryhover = WTW.getMeshOrNodeByID(zmoldname);
				if (zcategoryhover != null) {
					if (zcategoryhover.material != undefined) {
						zcategoryhover.material.alpha = 1;
					}
				}
			}
			if (zmoldname.indexOf('downbuttonhover') > -1) {
				var zdownbuttonhover = WTW.getMeshOrNodeByID(zmoldname);
				if (zdownbuttonhover != null) {
					if (zdownbuttonhover.material != undefined) {
						zdownbuttonhover.material.alpha = 1;
					}
				}
			}
			if (zmoldname.indexOf('upbuttonhover') > -1) {
				var zupbuttonhover = WTW.getMeshOrNodeByID(zmoldname);
				if (zupbuttonhover != null) {
					if (zupbuttonhover.material != undefined) {
						zupbuttonhover.material.alpha = 1;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-checkHovers=' + ex.message);
	}
}

wtwshopping.prototype.resetHovers = function(zmoldname, zshape) {
	try {
		if (zshape == 'storeproduct') {
			var znameparts = WTW.lastID.split('-');
			var zmoldnameroot = znameparts[0] + '-' + znameparts[1] + '-' + znameparts[2] + '-' + znameparts[3] + '-' + znameparts[4] + '-' + znameparts[5];
			if (WTW.lastID.indexOf('descimage1') > -1 || WTW.lastID.indexOf('descimage2') > -1) {
				var zdescimage1 = WTW.getMeshOrNodeByID(zmoldnameroot + '-descimage1');
				var zdescimage2 = WTW.getMeshOrNodeByID(zmoldnameroot + '-descimage2');
				if (zdescimage1 != null && zdescimage2 != null) {
					if (zdescimage1.material != undefined) {
						zdescimage1.material.alpha = 0;
					}
					if (zdescimage2.material != undefined) {
						zdescimage2.material.alpha = 1;
					}
				}
			}
			if (WTW.lastID.indexOf('addtocart') > -1) {
				var zaddtocart = WTW.getMeshOrNodeByID(WTW.lastID);
				if (zaddtocart != null) {
					if (zaddtocart.material != undefined) {
						zaddtocart.material.alpha = 1;
					}
				}
			}
			if (WTW.lastID.indexOf('readmore') > -1) {
				var zreadmore = WTW.getMeshOrNodeByID(WTW.lastID);
				if (zreadmore != null) {
					if (zreadmore.material != undefined) {
						zreadmore.material.alpha = 1;
					}
				}
			}
		} else if (WTW.lastID.indexOf('carthover') > -1) {
			var zcarthover = WTW.getMeshOrNodeByID(zmoldnameroot + '-carthover');
			if (zcarthover != null) {
				if (zcarthover.material != undefined) {
					zcarthover.material.alpha = 0;
				}
			}
		} else if (WTW.lastID.indexOf('storecategories') > -1) {
			if (WTW.lastID.indexOf('categorybuttonhover') > -1) {
				var zcategoryhover = WTW.getMeshOrNodeByID(WTW.lastID);
				if (zcategoryhover != null) {
					if (zcategoryhover.material != undefined) {
						zcategoryhover.material.alpha = 0;
					}
				}
			}
			if (WTW.lastID.indexOf('downbuttonhover') > -1) {
				var zdownbuttonhover = WTW.getMeshOrNodeByID(WTW.lastID);
				if (zdownbuttonhover != null) {
					if (zdownbuttonhover.material != undefined) {
						zdownbuttonhover.material.alpha = 0;
					}
				}
			}
			if (WTW.lastID.indexOf('upbuttonhover') > -1) {
				var zupbuttonhover = WTW.getMeshOrNodeByID(WTW.lastID);
				if (zupbuttonhover != null) {
					if (zupbuttonhover.material != undefined) {
						zupbuttonhover.material.alpha = 0;
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-resetHovers=' + ex.message);
	}
}

wtwshopping.prototype.getStoreMolds = async function(zmoldname) {
	/* for each mold that is a store mold, there are settings stored in the database. */
	/* they can be a preset category (like for a section of a store), preset product (like a sale item) */
	/* and the allow search flag to decide if the product display can be overwritten by search results */
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
//		var zstore = WTWShopping.getStoreData(zmoldname);
		/* set up the mold-store settings for first display */
		var zmoldsloaded = WTWShopping.checkStoreMoldsLoaded(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid);
		/* molds loaded: 0 means no, 1 means loading, and 2 means already fully loaded for this community, building, or thing */
		if (zmoldsloaded == 0) {
			/* mold-store settings have not been fetched - so fetch them from local WalkTheWeb site */
			/* mark the fetch queue as loading (in progress) so that it does not start multiple times */
			WTWShopping.updateStoreMoldsLoaded(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid, 1);
			/* fetch the store settings */
			WTW.getAsyncJSON('/connect/wtw-shopping-getmolds.php?communityid=' + zmoldnameparts.communityid + '&buildingid=' + zmoldnameparts.buildingid + '&thingid=' + zmoldnameparts.thingid, 
				function(zresponse) {
					if (zresponse != null) {
						zresponse = JSON.parse(zresponse);
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
												case 'storeproduct':
												case 'storeaddtocart':
												case 'storebuynow':
												case 'storereadmore':
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
							WTWShopping.getStoreMolds(zmoldname);
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
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-getStoreMolds=' + ex.message);
	}
}
/*
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
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-getStoreData=' + ex.message);
	}
	return zstore;
}
*/
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
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-checkStoreMoldsLoaded=' + ex.message);
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
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-updateStoreMoldsLoaded=' + ex.message);
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
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-checkStoreMold=' + ex.message);
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
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-getStoreMoldProperties=' + ex.message);
	}
	return zmoldproperties;
}

wtwshopping.prototype.setProduct = async function(zcategoryid, zproductid, zproductname, zslug, zmoldname) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		var zstoreinfo = WTWShopping.getStoreID(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid);
		if (WTW.adminView == 1) {
			if (dGet('wtw_tmoldproductid') != null) {
				dGet('wtw_tmoldproductid').value = zproductid;
			}
			if (dGet('wtw_tmoldproductname') != null) {
				//dGet('wtw_tmoldproductname').value = zproductname;
			}
			if (dGet('wtw_tmoldslug') != null) {
				dGet('wtw_tmoldslug').value = zslug;
			}
		}
		
		if (zmoldnameparts.molds[zmoldnameparts.moldind] != undefined) {
			if (zstoreinfo.woocommerceapiurl != '' && zproductid != '' && zproductid != undefined) {
				WTW.getAsyncJSON(zstoreinfo.woocommerceapiurl + 'products/' + zproductid + '/?consumer_key=' + atob(zstoreinfo.woocommercekey) + '&consumer_secret=' + atob(zstoreinfo.woocommercesecret), 
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
							
							var znewproductind = WTWShopping.products.length;
							WTWShopping.products[znewproductind] = WTWShopping.newProduct();
							WTWShopping.products[znewproductind].communityid = zmoldnameparts.communityid;
							WTWShopping.products[znewproductind].buildingid = zmoldnameparts.buildingid;
							WTWShopping.products[znewproductind].thingid = zmoldnameparts.thingid;
							WTWShopping.products[znewproductind].categoryid = zcategoryid;
							WTWShopping.products[znewproductind].search = '';
							WTWShopping.products[znewproductind].storeurl = zstoreinfo.storeurl;
							WTWShopping.products[znewproductind].wpplugin = zstoreinfo.wpplugin;
							WTWShopping.products[znewproductind].connectinggridind = zmoldnameparts.cgind.toString();
							WTWShopping.products[znewproductind].connectinggridid = zmoldnameparts.cgid;
							WTWShopping.products[znewproductind].productid = zproductid;
							WTWShopping.products[znewproductind].productname = WTW.encode(WTW.cleanHTMLText(zresponse.name));
							WTWShopping.products[znewproductind].slug = zresponse.slug;
							WTWShopping.products[znewproductind].price = zresponse.price;
							WTWShopping.products[znewproductind].description = WTW.encode(WTW.cleanHTMLText(zresponse.description));
							WTWShopping.products[znewproductind].shortdescription = WTW.encode(WTW.cleanHTMLText(zresponse.shortdescription));
							WTWShopping.products[znewproductind].imageurl = zimageurl;
							WTWShopping.products[znewproductind].setcount = '1';
							
							if (zmoldnameparts.molds[zmoldnameparts.moldind].shown == '2') {
								/* show product on display */
								WTWShopping.loadProductDisplay(zmoldname, zresponse.name, zresponse.price, zproductid, zslug, zimageurl, zresponse.short_description, zresponse.description);
							}
						}
					}
				);
			} else {
				WTWShopping.productFetchProducts(zmoldname, zcategoryid);
			}
		}
	} catch (ex) { 
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-setProduct=' + ex.message);
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
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-checkFetchQueue=' + ex.message);
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
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-setFetchQueue=' + ex.message);
	}
}

wtwshopping.prototype.productFetchProducts = async function(zmoldname, zcategoryid) {
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
			if (zstoreinfo.woocommerceapiurl != '') {
				var zurl = zstoreinfo.woocommerceapiurl + 'products/?per_page=50&consumer_key=' + atob(zstoreinfo.woocommercekey) + '&consumer_secret=' + atob(zstoreinfo.woocommercesecret);
				if (zcategoryid != '') {
					/* alternate, get products by categoryid */
					zurl = zstoreinfo.woocommerceapiurl + 'products/?per_page=50&category=' + zcategoryid + '&consumer_key=' + atob(zstoreinfo.woocommercekey) + '&consumer_secret=' + atob(zstoreinfo.woocommercesecret);
				}
				WTW.getAsyncJSON(zurl, 
					function(zresponse) {
						if (zresponse != null) {
							/* process results */
							WTWShopping.productClearFetchProducts(zmoldname);
							WTWShopping.productLoadProducts(zmoldname, zcategoryid, JSON.parse(zresponse), zstoreinfo.storeurl, 'walktheweb');
						}
					}
				);
			} 
		} else if (zfetching == 2) {
			var zproductproperties = WTWShopping.getProductProperties(zmoldname, zcategoryid);
			if (zproductproperties != undefined) {
				if (zmoldnameparts.molds[zmoldnameparts.moldind].shown == '2') {
					WTWShopping.loadProductDisplay(zmoldname, zproductproperties.productname, zproductproperties.price, zproductproperties.productid, zproductproperties.slug, zproductproperties.imageurl, zproductproperties.shortdescription, zproductproperties.description);
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-productFetchProducts=' + ex.message);
	}  
}

wtwshopping.prototype.productLoadProducts = function(zmoldname, zcategoryid, zresponse, zstoreurl, zwpplugin) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		for (var i=0;i<zresponse.length;i++) {
			if (zresponse[i] != null) {
				var znewproductind = WTWShopping.products.length;
				WTWShopping.products[znewproductind] = WTWShopping.newProduct();
				WTWShopping.products[znewproductind].communityid = zmoldnameparts.communityid;
				WTWShopping.products[znewproductind].buildingid = zmoldnameparts.buildingid;
				WTWShopping.products[znewproductind].thingid = zmoldnameparts.thingid;
				WTWShopping.products[znewproductind].categoryid = zcategoryid;
				WTWShopping.products[znewproductind].search = '';
				WTWShopping.products[znewproductind].storeurl = zstoreurl;
				WTWShopping.products[znewproductind].wpplugin = zwpplugin;
				WTWShopping.products[znewproductind].connectinggridind = zmoldnameparts.cgind.toString();
				WTWShopping.products[znewproductind].connectinggridid = zmoldnameparts.cgid;
				WTWShopping.products[znewproductind].productid = zresponse[i].id;
				WTWShopping.products[znewproductind].productname = WTW.encode(WTW.cleanHTMLText(zresponse[i].name));
				WTWShopping.products[znewproductind].slug = zresponse[i].slug;
				WTWShopping.products[znewproductind].price = zresponse[i].price;
				WTWShopping.products[znewproductind].description = WTW.encode(WTW.cleanHTMLText(zresponse[i].description));
				WTWShopping.products[znewproductind].shortdescription = WTW.encode(WTW.cleanHTMLText(zresponse[i].short_description));
				WTWShopping.products[znewproductind].imageurl = '';
				WTWShopping.products[znewproductind].setcount = '0';
				if (zresponse[i].images[0] != null) {
					WTWShopping.products[znewproductind].imageurl = zresponse[i].images[0].src;
				}
			}
		}

		/* set settings for any previously loaded mold */
		if (zmoldnameparts.molds != null) {
			for (var i=0;i< zmoldnameparts.molds.length;i++) {
				if (zmoldnameparts.molds[i] != null) {
					if (zmoldnameparts.molds[i].moldid != undefined) {
						switch (zmoldnameparts.molds[i].shape) {
							case 'storeproduct':
							case 'storeaddtocart':
							case 'storebuynow':
							case 'storereadmore':
								var zproductproperties = WTWShopping.getProductProperties(zmoldnameparts.molds[i].moldname, zcategoryid);
								if (zproductproperties != undefined) {
									zmoldnameparts.molds[i].store = zproductproperties;
									if (zmoldnameparts.molds[i].shown == '2') {
										WTWShopping.loadProductDisplay(zmoldnameparts.molds[i].moldname, zproductproperties.productname, zproductproperties.price, zproductproperties.productid, zproductproperties.slug, zproductproperties.imageurl, zproductproperties.shortdescription, zproductproperties.description);
									}
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
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-productLoadProducts=' + ex.message);
	}  
}

wtwshopping.prototype.getProductProperties = function(zmoldname, zcategoryid) {
	var zproductproperties;
	try {
		/* get variables attached to mold name */
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		if (WTWShopping.products != null) {
			var zproductind = 0;
			var zlowestsetcount = 100;
			for (var i=0;i<WTWShopping.products.length;i++) {
				if (WTWShopping.products[i] != null) {
					if (WTWShopping.products[i].connectinggridid != undefined) {
						if (WTWShopping.products[i].connectinggridid == zmoldnameparts.cgid && Number(WTWShopping.products[i].connectinggridind) == Number(zmoldnameparts.cgind) && WTWShopping.products[i].categoryid == zcategoryid) {
							if (Number(WTWShopping.products[i].setcount) < zlowestsetcount) {
								zproductind = i;
								zlowestsetcount = Number(WTWShopping.products[i].setcount);
							}
						}
					}
				}
			}
			if (WTWShopping.products[zproductind] != null) {
				WTWShopping.products[zproductind].setcount = Number(WTWShopping.products[zproductind].setcount) + 1;
				zproductproperties = WTWShopping.products[zproductind];
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-getProductProperties=' + ex.message);
	}
	return zproductproperties;
}

wtwshopping.prototype.productClearFetchProducts = function(zmoldname) {
	/* clear products for this community, building, or thing (by connecting grid) so that the search results can take their place */
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		/* products array holds products fetched from the WooCommerce site so they can be assigned to the molds and displayed */
		if (WTWShopping.products != null) {
			for (var i=WTWShopping.products.length-1;i > -1 ;i--) {
				if (WTWShopping.products[i] != null) {
					if (WTWShopping.products[i].connectinggridind.toString() == zmoldnameparts.cgind.toString() && WTWShopping.products[i].connectinggridid == zmoldnameparts.cgid) {
						WTWShopping.products.splice(i,1);
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-productClearFetchProducts=' + ex.message);
	}  
}

wtwshopping.prototype.productFetchCategories = async function(zmoldname) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		var zstoreinfo = WTWShopping.getStoreID(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid);
		if (zstoreinfo.woocommerceapiurl != '') {
			var zurl = zstoreinfo.woocommerceapiurl + 'products/categories/?per_page=50&orderby=slug&consumer_key=' + atob(zstoreinfo.woocommercekey) + '&consumer_secret=' + atob(zstoreinfo.woocommercesecret);
			WTW.getAsyncJSON(zurl, 
				function(zresponse) {
					if (zresponse != null) {
						WTWShopping.productLoadCategories(zmoldname, JSON.parse(zresponse));
					}
				}
			);
		} 
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-productFetchCategories=' + ex.message);
	}  
}

wtwshopping.prototype.productLoadSearchResults = function(zmoldname, zconnectinggridid, zconnectinggridind) {
	try {
		var zproductind = 0;
		for (var i=0;i<WTW.communityMolds.length;i++) {
			if (WTW.communityMolds[i] != null) {
				if (WTW.communityMolds[i].store != undefined) {
					if (WTW.communityMolds[i].shape == 'storeproduct' && WTW.communityMolds[i].store.allowsearch != undefined && WTW.communityMolds[i].connectinggridid == zconnectinggridid && WTW.communityMolds[i].connectinggridind.toString() == zconnectinggridind.toString()) {
						if (WTW.communityMolds[i].store.allowsearch == '1' && WTWShopping.products[zproductind] != null) {
							WTW.communityMolds[i].store.storeurl = WTWShopping.products[zproductind].storeurl;
							WTW.communityMolds[i].store.wpplugin = WTWShopping.products[zproductind].wpplugin;
							//WTW.communityMolds[i].store.categoryid = WTWShopping.products[zproductind].categoryid;
							WTW.communityMolds[i].store.productid = WTWShopping.products[zproductind].productid;
							WTW.communityMolds[i].store.productname = WTWShopping.products[zproductind].productname;
							WTW.communityMolds[i].store.slug = WTWShopping.products[zproductind].slug;
							WTW.communityMolds[i].store.price = WTWShopping.products[zproductind].price;
							WTW.communityMolds[i].store.imageurl = WTWShopping.products[zproductind].imageurl;
							WTW.communityMolds[i].store.categoryid = WTWShopping.products[zproductind].categoryid;
							WTW.communityMolds[i].store.description = WTWShopping.products[zproductind].description;
							WTW.communityMolds[i].store.shortdescription = WTWShopping.products[zproductind].shortdescription;
							if (zproductind < WTWShopping.products.length - 1) {
								zproductind += 1;
							} else {
								zproductind = 0;
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
							if (WTW.buildingMolds[i].shape == 'storeproduct' && WTW.buildingMolds[i].store.allowsearch != undefined && WTW.buildingMolds[i].connectinggridid == zconnectinggridid && WTW.buildingMolds[i].connectinggridind.toString() == zconnectinggridind.toString()) {
								if (WTWShopping.products != undefined) {
									if (WTWShopping.products[zproductind] != null) {
										if (WTW.buildingMolds[i].store.allowsearch == '1' && WTWShopping.products[zproductind] != null) {
											WTW.buildingMolds[i].store.storeurl = WTWShopping.products[zproductind].storeurl;
											WTW.buildingMolds[i].store.wpplugin = WTWShopping.products[zproductind].wpplugin;
											WTW.buildingMolds[i].store.productid = WTWShopping.products[zproductind].productid;
											WTW.buildingMolds[i].store.productname = WTWShopping.products[zproductind].productname;
											WTW.buildingMolds[i].store.slug = WTWShopping.products[zproductind].slug;
											WTW.buildingMolds[i].store.price = WTWShopping.products[zproductind].price;
											WTW.buildingMolds[i].store.imageurl = WTWShopping.products[zproductind].imageurl;
											WTW.buildingMolds[i].store.categoryid = WTWShopping.products[zproductind].categoryid;
											WTW.buildingMolds[i].store.description = WTWShopping.products[zproductind].description;
											WTW.buildingMolds[i].store.shortdescription = WTWShopping.products[zproductind].shortdescription;
											if (zproductind < WTWShopping.products.length - 1) {
												zproductind += 1;
											} else {
												zproductind = 0;
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
					if (WTW.thingMolds[i].shape == 'storeproduct' && WTW.thingMolds[i].store.allowsearch != undefined && WTW.thingMolds[i].connectinggridid == zconnectinggridid && WTW.thingMolds[i].connectinggridind.toString() == zconnectinggridind.toString()) {
						if (WTW.thingMolds[i].store.allowsearch == '1' && WTWShopping.products[zproductind] != null) {
							WTW.thingMolds[i].store.storeurl = WTWShopping.products[zproductind].storeurl;
							WTW.thingMolds[i].store.wpplugin = WTWShopping.products[zproductind].wpplugin;
							WTW.thingMolds[i].store.productid = WTWShopping.products[zproductind].productid;
							WTW.thingMolds[i].store.productname = WTWShopping.products[zproductind].productname;
							WTW.thingMolds[i].store.slug = WTWShopping.products[zproductind].slug;
							WTW.thingMolds[i].store.price = WTWShopping.products[zproductind].price;
							WTW.thingMolds[i].store.imageurl = WTWShopping.products[zproductind].imageurl;
							WTW.thingMolds[i].store.categoryid = WTWShopping.products[zproductind].categoryid;
							WTW.thingMolds[i].store.description = WTWShopping.products[zproductind].description;
							WTW.thingMolds[i].store.shortdescription = WTWShopping.products[zproductind].shortdescription;
							if (zproductind < WTWShopping.products.length - 1) {
								zproductind += 1;
							} else {
								zproductind = 0;
							}
							WTWShopping.setProduct(WTW.thingMolds[i].store.categoryid, WTW.thingMolds[i].store.productid, WTW.thingMolds[i].store.productname, WTW.thingMolds[i].store.slug, WTW.thingMolds[i].moldname);
						}	
					}
				}
			}
		} 
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-productLoadSearchResults=' + ex.message);
	}  
}

wtwshopping.prototype.loadProductDisplay = async function(zmoldname, zproductname, zprice, zproductid, zslug, zimageurl, zshortdescription, zdescription) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		var zcommunityid = zmoldnameparts.communityid;
		var zbuildingid = zmoldnameparts.buildingid;
		var zthingid = zmoldnameparts.thingid;
		var zstoreinfo = WTWShopping.getStoreID(zcommunityid, zbuildingid, zthingid);
		if (zstoreinfo.storeurl != '') {
			var zlineheigth = '34px';
			var zfontheight = '40px';
			var ztitleimage = WTW.getMeshOrNodeByID(zmoldname + '-titleimagesm');
			var ztitleimage2 = WTW.getMeshOrNodeByID(zmoldname + '-titleimage2sm');

			var znamelength = WTW.cleanHTMLText(zproductname).length;
			
			if (znamelength > 224) {
				zlineheigth = '10px';
				zfontheight = '12px';
			} else if (znamelength > 120) {
				zlineheigth = '14px';
				zfontheight = '16px';
			} else if (znamelength > 50) {
				zlineheigth = '18px';
				zfontheight = '20px';
			} else if (znamelength > 32) {
				zlineheigth = '20px';
				zfontheight = '24px';
			} else if (znamelength > 27) {
				zlineheigth = '24px';
				zfontheight = '30px';
			} else if (znamelength > 22) {
				zlineheigth = '30px';
				zfontheight = '36px';
			}
			if (ztitleimage != null) {
				try {
					if (ztitleimage.material.diffuseTexture != null) {
						ztitleimage.material.diffuseTexture.dispose();
						ztitleimage.material.diffuseTexture = null;
					}
				} catch(ex) {}
				try {
					if (ztitleimage.material != null) {
						ztitleimage.material.dispose();
						ztitleimage.material = null;
					}
				} catch(ex) {}

				var zcoveringtitle = new BABYLON.StandardMaterial('mat' + zmoldname + '-titleimagetexture', scene);
				zcoveringtitle.alpha = 1;
				
				var zcontenttexture = new BABYLON.DynamicTexture(zmoldname + '-titleimagetexture', {width: 512,height: 512}, scene, true);
				zcontenttexture.name = zmoldname + '-titleimagetexture';
				zcoveringtitle.diffuseTexture = zcontenttexture;
				ztitleimage.material = zcoveringtitle;
				WTW.wrapText(ztitleimage, WTW.cleanHTMLText(zproductname), zlineheigth, zfontheight, 'center', 'top', 'yellow', 5, 0);
				zcoveringtitle.emissiveColor = new BABYLON.Color3(1, 1, 1);
				zcoveringtitle.diffuseTexture.vScale = .2
				zcoveringtitle.diffuseTexture.vOffset = .85
				if (ztitleimage2 != null) {
					try {
						if (ztitleimage2.material.diffuseTexture != null) {
							ztitleimage2.material.diffuseTexture.dispose();
							ztitleimage2.material.diffuseTexture = null;
						}
					} catch(ex) {}
					try {
						if (ztitleimage2.material != null) {
							ztitleimage2.material.dispose();
							ztitleimage2.material = null;
						}
					} catch(ex) {}
					ztitleimage2.material = zcoveringtitle;
				}
			}
			var zprice1 = WTW.getMeshOrNodeByID(zmoldname + '-price1');
			var zprice2 = WTW.getMeshOrNodeByID(zmoldname + '-price2');
			if (zprice1 != null) {
				try {
					if (zprice1.material.diffuseTexture != null) {
						zprice1.material.diffuseTexture.dispose();
						zprice1.material.diffuseTexture = null;
					}
				} catch(ex) {}
				try {
					if (zprice1.material != null) {
						zprice1.material.dispose();
						zprice1.material = null;
					}
				} catch(ex) {}
				var zcoveringprice1 = new BABYLON.StandardMaterial('mat' + zmoldname + '-coveringprice1texture', scene);
				zcoveringprice1.alpha = 1;
				zcoveringprice1.specularColor = new BABYLON.Color3(.2, .2, .2);
				zcoveringprice1.emissiveColor = new BABYLON.Color3(1, 1, 1);
				zcoveringprice1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
				var zpricetexture1 = new BABYLON.DynamicTexture(zmoldname + '-coveringprice1texture', {width: 512,height: 512}, scene, true);
				zpricetexture1.name = zmoldname + '-coveringprice1texture';
				zcoveringprice1.diffuseTexture = zpricetexture1;
				zcoveringprice1.diffuseTexture.uScale = 1;
				zcoveringprice1.diffuseTexture.vScale = .08;
				zcoveringprice1.diffuseTexture.vOffset = .92;
				zprice1.material = zcoveringprice1;
				WTW.wrapText(zprice1, '$' + Number(zprice).toFixed(2), zlineheigth, zfontheight, 'center', 'top', 'white', 0, 0);
				zprice1.material.diffuseTexture.uScale = .5
				zprice1.material.diffuseTexture.uOffset = .25
				if (zprice2 != null) {
					try {
						if (zprice2.material.diffuseTexture != null) {
							zprice2.material.diffuseTexture.dispose();
							zprice2.material.diffuseTexture = null;
						}
					} catch(ex) {}
					try {
						if (zprice2.material != null) {
							zprice2.material.dispose();
							zprice2.material = null;
						}
					} catch(ex) {}
					zprice2.material = zcoveringprice1;
				}
			}
			if (zimageurl != '') {
				WTW.getAsyncJSON(zstoreinfo.storeurl + '/walktheweb/image.php?walktheweb_image_url=' + zimageurl.replace('?','&'), 
					function(zresponse2) {
						if (zresponse2 != null) {
							var zpimage = WTW.getMeshOrNodeByID(zmoldname + '-clickimage');
							if (zpimage != null) {
								try {
									if (zpimage.material.diffuseTexture != null) {
										zpimage.material.diffuseTexture.dispose();
										zpimage.material.diffuseTexture = null;
									}
								} catch(ex) {}
								try {
									if (zpimage.material != null) {
										zpimage.material.dispose();
										zpimage.material = null;
									}
								} catch(ex) {}
							}
							var zpimage2 = WTW.getMeshOrNodeByID(zmoldname + '-clickimage2');
							if (zpimage2 != null) {
								try {
									if (zpimage2.material.diffuseTexture != null) {
										zpimage2.material.diffuseTexture.dispose();
										zpimage2.material.diffuseTexture = null;
									}
								} catch(ex) {}
								try {
									if (zpimage2.material != null) {
										zpimage2.material.dispose();
										zpimage2.material = null;
									}
								} catch(ex) {}
							}
							var zimagedata = JSON.parse(zresponse2);
							var znewimage = new Image();
							znewimage.src = zimagedata[0].url;
							znewimage.onload = function() {
								var zpimage = WTW.getMeshOrNodeByID(zmoldname + '-clickimage');
								var zpimage2 = WTW.getMeshOrNodeByID(zmoldname + '-clickimage2');
								if (zpimage != null) {
									var zrandom = WTW.getRandomString(6);
									var zopacity = 1;
									var zcovering = new BABYLON.StandardMaterial('cubemat' + zmoldname + '-clickimage' + zrandom, scene);
									zcovering.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimagedata[0].data, 'cubemat' + zmoldname + '-clickimagemat' + zrandom, scene);

									zcovering.alpha = zopacity;
									zcovering.specularColor = new BABYLON.Color3(zopacity, zopacity, zopacity);
									/* zcovering.emissiveColor = new BABYLON.Color3(zopacity, zopacity, zopacity); */
									zcovering.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
									zcovering.diffuseColor = new BABYLON.Color3(zopacity, zopacity, zopacity);		
									zpimage.isVisible = true;
									zpimage.material = zcovering;
									if (zpimage2 != null) {
										zpimage2.isVisible = true;
										zpimage2.material = zcovering;
									}
								}
							} 
						} 
					}
				);
			}
		}
	} catch (ex) { 
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-loadProductDisplay=' + ex.message);
	}
}

wtwshopping.prototype.productReadMore = async function(zmoldname) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		var zstoreinfo = WTWShopping.getStoreID(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid);
		if (zmoldnameparts.moldind > -1 && zstoreinfo.storeproducturl != '') {
			if (zmoldnameparts.molds[zmoldnameparts.moldind] != null) {
				if (zstoreinfo.storeiframes == '1') {
					window.setTimeout(function() {
						WTW.openAsyncIFrame(zstoreinfo.storeproducturl + zmoldnameparts.molds[zmoldnameparts.moldind].store.slug + '/', .8, .8, 'Read More...');
					},500);
				} else {
					WTW.openAsyncWebpage(zstoreinfo.storeproducturl + zmoldnameparts.molds[zmoldnameparts.moldind].store.slug + '/', '_blank');
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-productReadMore=' + ex.message);
	}  
}

wtwshopping.prototype.productAddToCart = async function(zmoldname) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		var zstoreinfo = WTWShopping.getStoreID(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid);
		if (zmoldnameparts.moldind > -1 && zstoreinfo.storecarturl != '') {
			if (zmoldnameparts.molds[zmoldnameparts.moldind] != null) {
				var zproductid = zmoldnameparts.molds[zmoldnameparts.moldind].store.productid;
				if (zstoreinfo.storeiframes == '1') {
					window.setTimeout(function() {
						WTW.openAsyncIFrame(zstoreinfo.storecarturl + '?add-to-cart=' + zproductid, .8, .8, 'Shopping Cart');
					},500);
				} else {
					WTW.openAsyncWebpage(zstoreinfo.storecarturl + '?add-to-cart=' + zproductid, '_blank');
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-productAddToCart=' + ex.message);
	}  
}

wtwshopping.prototype.productShowCart = async function(zmoldname) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		var zstoreinfo = WTWShopping.getStoreID(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid);
		if (zstoreinfo.storecarturl != '') {
			if (zstoreinfo.storeiframes == '1') {
				WTW.openAsyncIFrame(zstoreinfo.storecarturl, .8, .8, 'Shopping Cart');
			} else {
				WTW.openAsyncWebpage(zstoreinfo.storecarturl, '_blank');
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-productShowCart=' + ex.message);
	}  
}

wtwshopping.prototype.productSelectCategory = function(zmoldname) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		WTWShopping.productClearForSearchResults(zmoldname, zmoldnameparts.cgid, zmoldnameparts.cgind);
		if (zmoldnameparts.namepart[8] != null) {
			WTWShopping.productFetchProducts(zmoldname,zmoldnameparts.namepart[8]);
		} else {
			WTWShopping.productFetchProducts(zmoldname,'');
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-productSelectCategory=' + ex.message);
	}  
}

wtwshopping.prototype.productSelectCategoryScroll = function(zmoldname, zincrement) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		var zcatbuttonname = zmoldname.replace('downbuttonhover','categorybutton').replace('upbuttonhover','categorybutton');
		var zstorecategories = WTW.getMeshOrNodeByID(zcatbuttonname.replace('-categorybutton',''));
		var zupbutton = WTW.getMeshOrNodeByID(zcatbuttonname.replace('categorybutton','upbutton'));
		var zupbuttonhover = WTW.getMeshOrNodeByID(zcatbuttonname.replace('categorybutton','upbuttonhover'));
		var zdownbutton = WTW.getMeshOrNodeByID(zcatbuttonname.replace('categorybutton','downbutton'));
		var zdownbuttonhover = WTW.getMeshOrNodeByID(zcatbuttonname.replace('categorybutton','downbuttonhover'));
		var zmove = 0;
		if (zupbutton != null && zupbuttonhover != null) {
			if (zincrement < 0 && zupbutton.visibility == 1) {
				zmove = 1;
			}
		}
		if (zdownbutton != null && zdownbuttonhover != null) {
			if (zincrement > 0 && zdownbutton.visibility == 1) {
				zmove = 1;
			}
		}
		if (zstorecategories != null && zmove == 1) {
			var zleny = zstorecategories.scaling.y;
			var zfirsty = zleny * .42;
			var zlasty = -zleny * .42;
			var zshowup = 0;
			var zshowdown = 0;
			for (var i=0;i<scene.meshes.length;i++) {
				if (scene.meshes[i] != null) {
					if (scene.meshes[i].id != undefined) {
						if (scene.meshes[i].id.indexOf(zcatbuttonname) > -1) {
							var zcatbutton = WTW.getMeshOrNodeByID(scene.meshes[i].id);
							if (zcatbutton != null) {
								zcatbutton.position.y += zincrement;
								if (zcatbutton.position.y > zfirsty) {
									zcatbutton.visibility = 0;
									zshowup = 1;
								} else if (zcatbutton.position.y < zlasty) {
									zcatbutton.visibility = 0;
									zshowdown = 1;
								} else {
									zcatbutton.visibility = 1;
								}
							}
						}
					}
				}
			}
			if (zupbutton != null && zupbuttonhover != null) {
				if (zshowup == 1) {
					zupbutton.visibility = 1;
					zupbuttonhover.visibility = 1;
				} else {
					zupbutton.visibility = 0;
					zupbuttonhover.visibility = 0;
				}
			}
			if (zdownbutton != null && zdownbuttonhover != null) {
				if (zshowdown == 1) {
					zdownbutton.visibility = 1;
					zdownbuttonhover.visibility = 1;
				} else {
					zdownbutton.visibility = 0;
					zdownbuttonhover.visibility = 0;
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-productSelectCategoryScroll=' + ex.message);
	}  
}

wtwshopping.prototype.productLoadCategories = function(zmoldname, zresponse) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		var zmolddef = zmoldnameparts.molds[zmoldnameparts.moldind];
		var zlenx = 1;
		var zleny = 1;
		var zlenz = 1;
		var zfirsty = 0;
		var zincy = 0;
		var zlasty = -5;
		var zonce = 0;
		var zbasemold = WTW.getMeshOrNodeByID(zmoldname + '-base');
		if (zmolddef != null) {
			if (zmolddef.scaling != undefined) {
				if (zmolddef.scaling.x != undefined) {
					zlenx = Number(zmolddef.scaling.x);
				}
				if (zmolddef.scaling.y != undefined) {
					zleny = Number(zmolddef.scaling.y);
				}
				if (zmolddef.scaling.z != undefined) {
					zlenz = Number(zmolddef.scaling.z);
				}
			}
		}
		zfirsty = zleny/2 -2.1;
		zlasty = -zleny/2 + 1;
		var zcategorybuttonall = BABYLON.MeshBuilder.CreateBox(zmoldname + '-categorybutton-', {}, scene);
		zcategorybuttonall.scaling = new BABYLON.Vector3(.2, zlenz - 1, .9);
		zcategorybuttonall.position = new BABYLON.Vector3(-zlenx/2 + .25, zfirsty, 0);
		zcategorybuttonall.rotation.x = WTW.getRadians(-90);
		zcategorybuttonall.parent = zbasemold;

		var zcategorybuttontextureall = new BABYLON.StandardMaterial('mat' + zmoldname + '-categorybuttontexture-', scene);
		zcategorybuttontextureall.alpha = 1;
		zcategorybuttontextureall.specularColor = new BABYLON.Color3(.2, .2, .2);
		/* zcategorybuttontextureall.emissiveColor = new BABYLON.Color3(1, 1, 1); */
		zcategorybuttontextureall.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		zcategorybuttontextureall.diffuseColor = new BABYLON.Color3(.9, .9, .9);
		var zcategorytextureall = new BABYLON.DynamicTexture(zmoldname + '-categorybuttontexture-', {width: 512,height: 512}, scene, true);
		zcategorytextureall.name = zmoldname + '-categorybuttontexture-';
		/* zcategorytextureall.hasAlpha = true; */
		zcategorybuttontextureall.diffuseTexture = zcategorytextureall;
		zcategorybuttontextureall.diffuseTexture.vScale = .11;
		zcategorybuttontextureall.diffuseTexture.uScale = 1;
		zcategorybuttontextureall.diffuseTexture.vOffset = .88;
		zcategorybuttonall.material = zcategorybuttontextureall;
		WTW.wrapText(zcategorybuttonall, 'All', '45px', '40px', 'center', 'top', 'white', 0, 0);
		
		var zcategorybuttonhoverall = BABYLON.MeshBuilder.CreateBox(zmoldname + '-categorybuttonhover-', {}, scene);
		zcategorybuttonhoverall.scaling = new BABYLON.Vector3(.2, zlenz - .99, .91);
		zcategorybuttonhoverall.position = new BABYLON.Vector3(-zlenx/2 + .15, zfirsty, 0);
		zcategorybuttonhoverall.rotation.x = WTW.getRadians(-90);
		zcategorybuttonhoverall.parent = zbasemold;
		
		var zcategorybuttontexturehoverall = new BABYLON.StandardMaterial('mat' + zmoldname + '-categorybuttontexturehover-', scene);
		zcategorybuttontexturehoverall.alpha = 0;
		zcategorybuttontexturehoverall.specularColor = new BABYLON.Color3(.2, .2, .2);
		/* zcategorybuttontexturehoverall.emissiveColor = new BABYLON.Color3(1, 1, 1); */
		zcategorybuttontexturehoverall.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		zcategorybuttontexturehoverall.diffuseColor = new BABYLON.Color3(.9, .9, .9);
		var zcategorytexturehoverall = new BABYLON.DynamicTexture(zmoldname + '-categorytexturehover-', {width: 512,height: 512}, scene, true);
		zcategorytexturehoverall.name = zmoldname + '-categorytexturehover-';
		/* zcategorytexturehoverall.hasAlpha = true; */
		zcategorybuttontexturehoverall.diffuseTexture = zcategorytexturehoverall;
		zcategorybuttontexturehoverall.diffuseTexture.vScale = .11;
		zcategorybuttontexturehoverall.diffuseTexture.uScale = 1;
		zcategorybuttontexturehoverall.diffuseTexture.vOffset = .88;
		zcategorybuttonhoverall.material = zcategorybuttontexturehoverall;
		WTW.wrapText(zcategorybuttonhoverall, 'All', '45px', '40px', 'center', 'top', 'yellow', 0, 0);
		WTW.registerMouseOver(zcategorybuttonhoverall);
		zincy -= 1;
		if (zresponse != null) {
			for (var i=0;i<zresponse.length;i++) {
				if (zresponse[i] != null) {
					if (zresponse[i].count > 0) {
						var zcategoryid = zresponse[i].id;
						var zcategoryname = zresponse[i].name;
						var zcategoryslug = zresponse[i].slug;
						if (zcategoryname != '') {
							var zcategorybutton = BABYLON.MeshBuilder.CreateBox(zmoldname + '-categorybutton-' + zcategoryid, {}, scene);
							zcategorybutton.scaling = new BABYLON.Vector3(.2, zlenz - 1, .9);
							zcategorybutton.position = new BABYLON.Vector3(-zlenx/2 + .25, zfirsty + zincy, 0);
							zcategorybutton.rotation.x = WTW.getRadians(-90);
							zcategorybutton.parent = zbasemold;

							var zcategorybuttontexture = new BABYLON.StandardMaterial('mat' + zmoldname + '-categorybuttontexture-' + zcategoryid, scene);
							zcategorybuttontexture.alpha = 1;
							zcategorybuttontexture.specularColor = new BABYLON.Color3(.2, .2, .2);
							/* zcategorybuttontexture.emissiveColor = new BABYLON.Color3(1, 1, 1); */
							zcategorybuttontexture.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
							zcategorybuttontexture.diffuseColor = new BABYLON.Color3(.9, .9, .9);
							var zcategorytexture = new BABYLON.DynamicTexture(zmoldname + '-categorybuttontexture-' + zcategoryid, {width: 512,height: 512}, scene, true);
							zcategorytexture.name = zmoldname + '-categorybuttontexture-' + zcategoryid;
							/* zcategorytexture.hasAlpha = true; */
							zcategorybuttontexture.diffuseTexture = zcategorytexture;
							zcategorybuttontexture.diffuseTexture.vScale = .11;
							zcategorybuttontexture.diffuseTexture.uScale = 1;
							zcategorybuttontexture.diffuseTexture.vOffset = .88;
							zcategorybutton.material = zcategorybuttontexture;
							WTW.wrapText(zcategorybutton, zcategoryname, '45px', '40px', 'center', 'top', 'white', 0, 0);
							
							var zcategorybuttonhover = BABYLON.MeshBuilder.CreateBox(zmoldname + '-categorybuttonhover-' + zcategoryid, {}, scene);
							zcategorybuttonhover.scaling = new BABYLON.Vector3(.2, zlenz - .99, .91);
							zcategorybuttonhover.position = new BABYLON.Vector3(-zlenx/2 + .15, zfirsty + zincy, 0);
							zcategorybuttonhover.rotation.x = WTW.getRadians(-90);
							zcategorybuttonhover.parent = zbasemold;
							
							var zcategorybuttontexturehover = new BABYLON.StandardMaterial('mat' + zmoldname + '-zcategorybuttontexturehover-' + zcategoryid, scene);
							zcategorybuttontexturehover.alpha = 0;
							zcategorybuttontexturehover.specularColor = new BABYLON.Color3(.2, .2, .2);
							/* zcategorybuttontexturehover.emissiveColor = new BABYLON.Color3(1, 1, 1); */
							zcategorybuttontexturehover.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
							zcategorybuttontexturehover.diffuseColor = new BABYLON.Color3(.9, .9, .9);
							var zcategorytexturehover = new BABYLON.DynamicTexture(zmoldname + '-categorytexturehover-' + zcategoryid, {width: 512,height: 512}, scene, true);
							zcategorytexturehover.name = zmoldname + '-categorytexturehover-' + zcategoryid;
							/* zcategorytexturehover.hasAlpha = true; */
							zcategorybuttontexturehover.diffuseTexture = zcategorytexturehover;
							zcategorybuttontexturehover.diffuseTexture.vScale = .11;
							zcategorybuttontexturehover.diffuseTexture.uScale = 1;
							zcategorybuttontexturehover.diffuseTexture.vOffset = .88;
							zcategorybuttonhover.material = zcategorybuttontexturehover;
							WTW.wrapText(zcategorybuttonhover, zcategoryname, '45px', '40px', 'center', 'top', 'yellow', 0, 0);
							WTW.registerMouseOver(zcategorybuttonhover);

							if (zlasty > zfirsty + zincy) {
								zcategorybutton.visibility = 0;
								zcategorybuttonhover.visibility = 0;
								
								if (zonce == 0) {
									var zupbutton = BABYLON.MeshBuilder.CreateBox(zmoldname + '-upbutton', {}, scene);
									zupbutton.scaling = new BABYLON.Vector3(.9, .9, .9);
									zupbutton.position = new BABYLON.Vector3(-zlenx/2 + .4, zfirsty + 1.1, -zlenz/2 + .75);
									zupbutton.rotation.x = WTW.getRadians(-90);
									zupbutton.parent = zbasemold;
									
									var zupbuttontexture = new BABYLON.StandardMaterial('mat' + zmoldname + '-upbutton', scene);
									zupbuttontexture.emissiveTexture = new BABYLON.Texture('/content/system/images/arrowscrollup.jpg', scene);
									zupbutton.material = zupbuttontexture;
									zupbutton.visibility = 0;

									var zupbuttonhover = BABYLON.MeshBuilder.CreateBox(zmoldname + '-upbuttonhover', {}, scene);
									zupbuttonhover.scaling = new BABYLON.Vector3(.95, .95, .95);
									zupbuttonhover.position = new BABYLON.Vector3(-zlenx/2 + .4, zfirsty + 1.1, -zlenz/2 + .75);
									zupbuttonhover.rotation.x = WTW.getRadians(-90);
									zupbuttonhover.parent = zbasemold;
									
									var zupbuttontexturehover = new BABYLON.StandardMaterial('mat' + zmoldname + '-upbuttonhover', scene);
									zupbuttontexturehover.emissiveTexture = new BABYLON.Texture('/content/system/images/arrowscrollup2.jpg', scene);
									zupbuttonhover.material = zupbuttontexturehover;
									zupbuttonhover.material.alpha = 0;
									WTW.registerMouseOver(zupbuttonhover);
									zupbuttonhover.visibility = 0;

									var zdownbutton = BABYLON.MeshBuilder.CreateBox(zmoldname + '-downbutton', {}, scene);
									zdownbutton.scaling = new BABYLON.Vector3(.9, .9, .9);
									zdownbutton.position = new BABYLON.Vector3(-zlenx/2 + .4, zlasty, -zlenz/2 + .75);
									zdownbutton.rotation.x = WTW.getRadians(-90);
									zdownbutton.parent = zbasemold;
									
									var zdownbuttontexture = new BABYLON.StandardMaterial('mat' + zmoldname + '-downbutton', scene);
									zdownbuttontexture.emissiveTexture = new BABYLON.Texture('/content/system/images/arrowscrolldown.jpg', scene);
									zdownbutton.material = zdownbuttontexture;

									var zdownbuttonhover = BABYLON.MeshBuilder.CreateBox(zmoldname + '-downbuttonhover', {}, scene);
									zdownbuttonhover.scaling = new BABYLON.Vector3(.95, .95, .95);
									zdownbuttonhover.position = new BABYLON.Vector3(-zlenx/2 + .4, zlasty, -zlenz/2 + .75);
									zdownbuttonhover.rotation.x = WTW.getRadians(-90);
									zdownbuttonhover.parent = zbasemold;
									
									var zdownbuttontexturehover = new BABYLON.StandardMaterial('mat' + zmoldname + '-downbuttonhover', scene);
									zdownbuttontexturehover.emissiveTexture = new BABYLON.Texture('/content/system/images/arrowscrolldown2.jpg', scene);
									zdownbuttonhover.material = zdownbuttontexturehover;
									zdownbuttonhover.material.alpha = 0;
									WTW.registerMouseOver(zdownbuttonhover);
									zonce = 1;
								}
							}
							zincy -= 1;
						}
					}
				}
			}
		}
		/* check to see if the mold still exists since the time it was requested */
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold == null) {
			WTW.disposeClean(zmoldname);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-productLoadCategories=' + ex.message);
	}  
}

wtwshopping.prototype.disposeClean = function(zmoldname) {
	try {
		if (zmoldname.indexOf('molds') > -1) {
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
		/* check for child parts of the 3D Model that are still in the 3D Scene and delete them */
		if (zmoldname.indexOf('store') > -1 || zmoldname.indexOf('productsearch') > -1) {
			for (var i = 0; i < scene.meshes.length;i++) {
				if (scene.meshes[i].name.indexOf(zmoldname) > -1) {
					scene.meshes[i].dispose();
				}
			}
		}
		if (zmoldname.indexOf('productsearch') > -1) {
			var zsearchtextbox = zmoldname + '-searchtext-textbox';
			if (dGet(zsearchtextbox) != null) {
				/* remove the hidden textbox if it exists */
				dGet(zsearchtextbox).parentNode.removeChild(dGet(zsearchtextbox));
				if (dGet('wtwshopping_searchboxes') != null) {
					/* remove the div container for search boxes if it is no longer in use */
					if (dGet('wtwshopping_searchboxes').innerHTML == '') {
						dGet('wtwshopping_searchboxes').parentNode.removeChild(dGet('wtwshopping_searchboxes'));
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-disposeClean=' + ex.message);
	}  
}

wtwshopping.prototype.productClearForSearchResults = function(zmoldname, zconnectinggridid, zconnectinggridind) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		
		if (zmoldnameparts.molds != null) {
			for (var i=0;i<zmoldnameparts.molds.length;i++) {
				if (zmoldnameparts.molds[i] != null) {
					if (zmoldnameparts.molds[i].store != undefined) {
						if (zmoldnameparts.molds[i].store.allowsearch != undefined) {
							if (zmoldnameparts.molds[i].store.allowsearch == '1' && zmoldnameparts.molds[i].connectinggridid == zconnectinggridid && Number(zmoldnameparts.molds[i].connectinggridind) == Number(zconnectinggridind)) {
								zmoldnameparts.molds[i].store.productid = '';
								zmoldnameparts.molds[i].store.productname = '';
								zmoldnameparts.molds[i].store.slug = '';
								zmoldnameparts.molds[i].store.price = '';
								zmoldnameparts.molds[i].store.categoryid = '';
								zmoldnameparts.molds[i].store.description = '';
								zmoldnameparts.molds[i].store.shortdescription = '';
								zmoldnameparts.molds[i].store.imageurl = '';
							}	
						}
					}
				}
			}
		}
		if (WTWShopping.products != null) {
			for (var i=WTWShopping.products.length-1;i > -1;i--) {
				if (WTWShopping.products[i] != null) {
					if (WTWShopping.products[i].connectinggridid == zconnectinggridid && Number(WTWShopping.products[i].connectinggridind) == Number(zconnectinggridind)) {
						WTWShopping.products.splice(i,1);
						i -= 1;
					}	
				}
			}
		}
		if (WTWShopping.fetchQueue != null) {
			for (var i=WTWShopping.fetchQueue.length-1;i > -1 ;i--) {
				if (WTWShopping.fetchQueue[i] != null) {
					if (WTWShopping.fetchQueue[i].connectinggridind.toString() == zmoldnameparts.cgind.toString() && WTWShopping.fetchQueue[i].connectinggridid == zmoldnameparts.cgid) {
						WTWShopping.fetchQueue.splice(i,1);
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-productClearForSearchResults=' + ex.message);
	}  
}

wtwshopping.prototype.getStoreInfo = async function(zmoldname) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		var zstoreinfo = WTWShopping.getStoreID(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid);
		var zwebname = '';
		if (zmoldnameparts.molds[zmoldnameparts.moldind].webtext.webtext != undefined) {
			if (zmoldnameparts.molds[zmoldnameparts.moldind].webtext.webtext != '') {
				zwebname = WTW.decode(zmoldnameparts.molds[zmoldnameparts.moldind].webtext.webtext);
			}
		}
		if (zwebname == '') {
			try {
				if (zstoreinfo.storename != '') {
					zwebname = atob(zstoreinfo.storename);
				}
			} catch(ex) {
			}
		}
		if (zwebname == '') {
			zwebname = 'My 3D Store';
		}
		zmoldnameparts.molds[zmoldnameparts.moldind].webtext.webtext = WTW.encode(zwebname);
		if (zstoreinfo.woocommerceapiurl != '' && zwebname == '') {
			var zurl = zstoreinfo.storeurl + '/walktheweb/storeinfo.php?walktheweb_store_info=1';
			WTW.getAsyncJSON(zurl, 
				function(zresponse) {
					WTWShopping.setStoreInfo(zmoldname, JSON.parse(zresponse));
				}
			);
		} else {
			var zresponse = [];
			zresponse[0] = {
				'storename':zwebname
			};
			WTWShopping.setStoreInfo(zmoldname, zresponse);
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-getStoreInfo=' + ex.message);
	}  
}

wtwshopping.prototype.setStoreInfo = function(zmoldname, zresponse) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		for (var i=0;i<zresponse.length;i++) {
			if (zresponse[i] != null) {
				var zstorename = '';
				if (zresponse[i].storename != undefined) {
					zstorename = WTW.decode(zresponse[i].storename);
				}
				var ztitlemold2 = WTW.getMeshOrNodeByID(zmoldname + '-titleimage2');
				if (ztitlemold2 != null) {
					try {
						if (ztitlemold2.material.diffuseTexture != null) {
							ztitlemold2.material.diffuseTexture.dispose();
							ztitlemold2.material.diffuseTexture = null;
						}
					} catch(ex) {}
					try {
						if (ztitlemold2.material != null) {
							ztitlemold2.material.dispose();
							ztitlemold2.material = null;
						}
					} catch(ex) {}
					var zcoveringtitle1 = new BABYLON.StandardMaterial('mat' + zmoldname + '-titleimage1texture', scene);
					zcoveringtitle1.alpha = 1;
					zcoveringtitle1.specularColor = new BABYLON.Color3(.2, .2, .2);
					/* zcoveringtitle1.emissiveColor = new BABYLON.Color3(1, 1, 1); */
					zcoveringtitle1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
					zcoveringtitle1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
					var zcontenttexture1 = new BABYLON.DynamicTexture(zmoldname + '-titleimage1texture', {width: 512,height: 512}, scene, true);
					zcontenttexture1.name = zmoldname + '-titleimage1texture';
					/* zcontenttexture1.hasAlpha = true; */
					zcoveringtitle1.diffuseTexture = zcontenttexture1;
					zcoveringtitle1.diffuseTexture.vScale = .5;
					zcoveringtitle1.diffuseTexture.uScale = 1;
					zcoveringtitle1.diffuseTexture.vOffset = .55;
					ztitlemold2.material = zcoveringtitle1;

					var znamelength = zstorename.length;
					var zlineheigth = '140px';
					var zfontheight = '140px';
					if (znamelength > 238) {
						zlineheigth = '20px';
						zfontheight = '20px';
					} else if (znamelength > 150) {
						zlineheigth = '30px';
						zfontheight = '30px';
					} else if (znamelength > 70) {
						zlineheigth = '40px';
						zfontheight = '40px';
					} else if (znamelength > 46) {
						zlineheigth = '50px';
						zfontheight = '42px';
					} else if (znamelength > 21) {
						zlineheigth = '80px';
						zfontheight = '48px';
					} else if (znamelength > 18) {
						zlineheigth = '120px';
						zfontheight = '50px';
					} else if (znamelength > 14) {
						zlineheigth = '130px';
						zfontheight = '60px';
					} else if (znamelength > 10) {
						zlineheigth = '130px';
						zfontheight = '70px';
					} else if (znamelength > 6) {
						zlineheigth = '120px';
						zfontheight = '90px';
					}

					WTW.wrapText(ztitlemold2, zstorename, zlineheigth, zfontheight, 'center', 'top', 'white', 0, 0);
					i = zresponse.length;
				}
			}
		}
		WTWShopping.productClearFetchProducts(zmoldname);
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-setStoreInfo=' + ex.message);
	}  
}

wtwshopping.prototype.getCategoriesList = async function() {
	try {
		var zstoreinfo = WTWShopping.getStoreID(communityid, buildingid, thingid);
		if (zstoreinfo.woocommerceapiurl != '') {
			WTW.getAsyncJSON(zstoreinfo.woocommerceapiurl + 'products/categories/?per_page=50&consumer_key=' + atob(zstoreinfo.woocommercekey) + '&consumer_secret=' + atob(zstoreinfo.woocommercesecret), 
				function(zresponse) {
					WTWShopping.loadCategoriesList(JSON.parse(zresponse));
				}
			);
		}
	} catch (ex) { 
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-getCategoriesList=' + ex.message);
	}
}

wtwshopping.prototype.loadCategoriesList = function(zresponse) {
	try {
		WTW.clearDDL('wtw_tcategoryid');
		var zoption = document.createElement('option');
		zoption.text = '--- All ---';
		zoption.value = '';
		if (dGet('wtw_tmoldcategoryid').value == '') {
			zoption.selected = true;
		}
		dGet('wtw_tcategoryid').add(zoption);
		for (var i=0;i<zresponse.length;i++) {
			if (zresponse[i] != null) {
				var zoption = document.createElement('option');
				zoption.text = zresponse[i].name;
				zoption.value = zresponse[i].id;
				if (zoption.value == dGet('wtw_tmoldcategoryid').value) {
					zoption.selected = true;
				}
				dGet('wtw_tcategoryid').add(zoption);
			}
		}
	} catch (ex) { 
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-loadCategoriesList=' + ex.message);
	}
}

wtwshopping.prototype.setCategory = function(zcategoryid) {
	try {
		dGet('wtw_tmoldcategoryid').value = zcategoryid;
		WTWShopping.getProductsList(zcategoryid);
	} catch (ex) { 
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-setCategory=' + ex.message);
	}
}

wtwshopping.prototype.getProductsList = async function(zcategoryid) {
	try {
		if (zcategoryid == undefined) {
			zcategoryid = '';
		}
		var zstoreinfo = WTWShopping.getStoreID(communityid, buildingid, thingid);
		if (zstoreinfo.woocommerceapiurl != '') {
			var zurl = zstoreinfo.woocommerceapiurl + 'products/?per_page=50&consumer_key=' + atob(zstoreinfo.woocommercekey) + '&consumer_secret=' + atob(zstoreinfo.woocommercesecret);
			if (zcategoryid != '') {
				zurl = zstoreinfo.woocommerceapiurl + 'products/?per_page=50&category=' + zcategoryid + '&consumer_key=' + atob(zstoreinfo.woocommercekey) + '&consumer_secret=' + atob(zstoreinfo.woocommercesecret);
			}
			WTW.getAsyncJSON(zurl, 
				function(zresponse) {
					WTWShopping.loadProductsList(JSON.parse(zresponse));
				}
			);
		}
	} catch (ex) { 
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-getProductsList=' + ex.message);
	}
}

wtwshopping.prototype.loadProductsList = function(zresponse) {
	try {
		WTW.clearDDL('wtw_tproductid');
		var zoption = document.createElement('option');
		zoption.text = '--- All ---';
		zoption.value = '';
		if (dGet('wtw_tmoldproductid').value == '') {
			zoption.selected = true;
		}
		dGet('wtw_tproductid').add(zoption);
		for (var i=0;i<zresponse.length;i++) {
			if (zresponse[i] != null) {
				var zoption = document.createElement('option');
				zoption.text = zresponse[i].name;
				zoption.value = zresponse[i].id;
				if (zresponse[i].id == dGet('wtw_tmoldproductid').value) {
					zoption.selected = true;
				}
				dGet('wtw_tproductid').add(zoption);
			}
		}
	} catch (ex) { 
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-loadProductsList=' + ex.message);
	}
}

wtwshopping.prototype.setAllowSearch = function() {
	try {
		if (dGet('wtw_tallowsearch').checked) {
			dGet('wtw_tmoldallowsearch').value = '1';
		} else {
			dGet('wtw_tmoldallowsearch').value = '0';
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-setAllowSearch=' + ex.message);
	}
}

wtwshopping.prototype.openAddNewMold = function(zwebtype, zshape, zmoldname) {
	try {
		switch (zshape.toLowerCase()) {
			case 'storesign':
			case 'store3dsign':
				var zstoreinfo = WTWShopping.getStoreID(communityid, buildingid, thingid);
				if (zstoreinfo.storeid != '') {
					WTWShopping.getStoreMolds(zmoldname);
					var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
					if ((zshape == 'store3dsign' || zshape == 'storesign') && zmoldnameparts.molds[zmoldnameparts.moldind] != null) {
						dGet('wtw_tmoldwebtext').value = WTW.decode(zmoldnameparts.molds[zmoldnameparts.moldind].webtext.webtext);
						if (dGet('wtw_tmoldwebtext').value == '') {
							try {
								if (zstoreinfo.storename != '') {
									dGet('wtw_tmoldwebtext').value = atob(zstoreinfo.storename);
								}
							} catch(ex) {
							}
							zmoldnameparts.molds[zmoldnameparts.moldind].webtext.webtext = WTW.encode(dGet('wtw_tmoldwebtext').value);
						}
					}
				}
				break;
			case 'storeproduct':
			case 'storeaddtocart':
			case 'storebuynow':
			case 'storereadmore':
				WTWShopping.getCategoriesList();
				WTWShopping.getProductsList('');
				break;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-openAddNewMold=' + ex.message);
	}
}

wtwshopping.prototype.loadMoldForm = function(zwebtype, zshape, zmoldname) {
	try {
		switch (zshape.toLowerCase()) {
			case 'storeproduct':
			case 'storeaddtocart':
			case 'storebuynow':
			case 'storereadmore':
				WTWShopping.getCategoriesList();
				WTWShopping.getProductsList();
				break;
		}
		if (zshape.toLowerCase() == 'storeproduct') {
			if (WTW.isNumeric(dGet('wtw_tmoldspecial1').value)) {
				WTW.setDDLValue('wtw_tmoldspecial1set', Number(dGet('wtw_tmoldspecial1').value));
			} else {
				WTW.setDDLValue('wtw_tmoldspecial1set', 0);
			}
		}
		if (dGet('wtw_tmoldallowsearch').value == '1') {
			dGet('wtw_tallowsearch').checked = true;
		} else {
			dGet('wtw_tallowsearch').checked = false;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-loadMoldForm=' + ex.message);
	}
}

wtwshopping.prototype.getStoreID = function(zcommunityid, zbuildingid, zthingid) {
	var zstoreid = '';
	var zstorename = '';
	var zstoreiframes = '0';
	var zstoreurl = '';
	var zstorecarturl = '';
	var zstoreproducturl = '';
	var zwoocommerceapiurl = '';
	var zwoocommercekey = '';
	var zwoocommercesecret = '';
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
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-getStoreID=' + ex.message);
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
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-checkStoreID=' + ex.message);
	}
	return zfound;
}

wtwshopping.prototype.loadConnectingGrids = async function(zconnectinggridind, zcommunityid, zbuildingid, zthingid) {
	try {
		if (WTWShopping.checkStoreID(zcommunityid, zbuildingid, zthingid) == false) {
			WTW.getAsyncJSON('/connect/wtw-shopping-getconnectstore.php?communityid=' + zcommunityid + '&buildingid=' + zbuildingid + '&thingid=' + zthingid, 
				function(zresponse) {
					zresponse = JSON.parse(zresponse);
					if (zresponse != null) {
						for (var i=0;i<zresponse.length;i++) {
							if (zresponse[i] != null) {
								if (zresponse[i].storeid != undefined) {
									var zstoresind = WTWShopping.stores.length;
									WTWShopping.stores[zstoresind] = {
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
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-loadConnectingGrids=' + ex.message);
	}
}

wtwshopping.prototype.openMoldForm = function(zmoldname, zmoldind, zshape, zwebtype) {
	try {
		var zstoreinfo = WTWShopping.getStoreID(communityid, buildingid, thingid);
		if (zstoreinfo.storeid != '') {
			WTWShopping.getStoreMolds(zmoldname);
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
			if ((zshape == 'store3dsign' || zshape == 'storesign') && zmolds[zmoldind] != null) {
				dGet('wtw_tmoldwebtext').value = WTW.decode(zmolds[zmoldind].webtext.webtext);
				if (dGet('wtw_tmoldwebtext').value == '') {
					try {
						if (zstoreinfo.storename != '') {
							dGet('wtw_tmoldwebtext').value = WTW.decode(zstoreinfo.storename);
						}
					} catch(ex) {
					}
					zmolds[zmoldind].webtext.webtext = WTW.encode(dGet('wtw_tmoldwebtext').value);
				}
			}
			if (zshape == 'store3dsign' && zmolds[zmoldind] != null) {
				dGet('wtw_tmoldwebstyle').value = WTW.decode(zmolds[zmoldind].webtext.webstyle);
				var zwebstyle = dGet('wtw_tmoldwebstyle').value;
				var zwebtextalign = 'center';
				var zwebtextheight = 6;
				var zwebtextthick = 1;
				var zwebtextcolor = '#ff0000';
				var zwebtextemissive = '#ff0000';
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
				dGet('wtw_tmoldwebtextemissive').value = zwebtextemissive;
				dGet('wtw_tmoldwebtextdiffuse').value = zwebtextdiffuse;
				dGet('wtw_tmoldwebtextspecular').value = zwebtextspecular;
				dGet('wtw_tmoldwebtextambient').value = zwebtextambient;

				dGet('wtw_tmoldemissivecolor').value = zwebtextemissive;
				dGet('wtw_tmolddiffusecolor').value = zwebtextdiffuse;
				dGet('wtw_tmoldspecularcolor').value = zwebtextspecular;
				dGet('wtw_tmoldambientcolor').value = zwebtextambient;
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-openMoldForm=' + ex.message);
	}
}

wtwshopping.prototype.submitMoldForm = async function(zselect) {
	try {
		switch (zselect) {
			case 0: /* delete mold */
				var zrequest = {
					'communityid':dGet('wtw_tcommunityid').value,
					'buildingid':dGet('wtw_tbuildingid').value,
					'thingid':dGet('wtw_tthingid').value,
					'moldid':dGet('wtw_tmoldid').value,
					'function':'deletemold'
				};
				WTW.postAsyncJSON('/core/handlers/wtwshopping-stores.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note: zresponse.serror would contain any error text */
					}
				);
				break;
			case -1: /* cancel edit */
				
				break;
			default: /* save mold */
				var zallowsearch = '0';
				if (dGet('wtw_tallowsearch').checked) {
					zallowsearch = '1';
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
				WTW.postAsyncJSON('/core/handlers/wtwshopping-stores.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note: zresponse.serror would contain any error text */
					}
				);
				break;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-submitMoldForm=' + ex.message);
	}
}

wtwshopping.prototype.productGetProduct = function(zmoldname) {
	try {
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		if (zmoldnameparts.shape == 'storeproduct' || zmoldnameparts.shape == 'storeaddtocart' || zmoldnameparts.shape == 'storebuynow' || zmoldnameparts.shape == 'storereadmore' || zmoldnameparts.shape == 'storecheckout') {
			var zfound = false;
			var zfetch = false;
			if (zmoldnameparts.molds[zmoldnameparts.moldind] != null && zmoldnameparts.cgid != '' && zmoldnameparts.cgind > -1) {
				if (WTWShopping.products != null) {
					for (var i=WTWShopping.products.length-1;i > -1 ;i--) {
						if (WTWShopping.products[i] != null) {
							if (WTWShopping.products[i].setcount == '0' && WTWShopping.products[i].connectinggridind.toString() == zmoldnameparts.cgind.toString() && WTWShopping.products[i].connectinggridid == zmoldnameparts.cgid) {
								zmoldnameparts.molds[zmoldnameparts.moldind].store.storeurl = WTWShopping.products[i].storeurl;
								zmoldnameparts.molds[zmoldnameparts.moldind].store.wpplugin = WTWShopping.products[i].wpplugin;
								zmoldnameparts.molds[zmoldnameparts.moldind].store.productid = WTWShopping.products[i].productid;
								zmoldnameparts.molds[zmoldnameparts.moldind].store.productname = WTWShopping.products[i].productname;
								zmoldnameparts.molds[zmoldnameparts.moldind].store.slug = WTWShopping.products[i].slug;
								zmoldnameparts.molds[zmoldnameparts.moldind].store.price = WTWShopping.products[i].price;
								zmoldnameparts.molds[zmoldnameparts.moldind].store.imageurl = WTWShopping.products[i].imageurl;
								zmoldnameparts.molds[zmoldnameparts.moldind].store.categoryid = WTWShopping.products[i].categoryid;
								zmoldnameparts.molds[zmoldnameparts.moldind].store.description = WTWShopping.products[i].description;
								zmoldnameparts.molds[zmoldnameparts.moldind].store.shortdescription = WTWShopping.products[i].shortdescription;
								WTWShopping.products.splice(i,1);
								zfound = true;
								i = WTWShopping.products.length;
							} else if (WTWShopping.products[i].setcount == '1' && WTWShopping.products[i].connectinggridind.toString() == zmoldnameparts.cgind.toString() && WTWShopping.products[i].connectinggridid == zmoldnameparts.cgid) {
								zfetch = true;
								/* i = WTWShopping.products.length; */
							}
						}
					}
				}
				if (zfound == false) {
					if (zfetch == false) {
						var znewproductind = WTWShopping.products.length;
						WTWShopping.products[znewproductind] = WTWShopping.newProduct();
						WTWShopping.products[znewproductind].connectinggridind = zmoldnameparts.cgind.toString();
						WTWShopping.products[znewproductind].connectinggridid = zmoldnameparts.cgid;
						WTWShopping.products[znewproductind].search = '';
						WTWShopping.products[znewproductind].setcount = '1';
						WTWShopping.productFetchProducts(zmoldname,'');
					}
					window.setTimeout(function() {
						WTWShopping.productGetProduct(zmoldname);
					}, 100);
				} else {
					WTWShopping.setProduct(zmoldnameparts.molds[zmoldnameparts.moldind].store.categoryid, zmoldnameparts.molds[zmoldnameparts.moldind].store.productid, zmoldnameparts.molds[zmoldnameparts.moldind].store.productname, zmoldnameparts.molds[zmoldnameparts.moldind].store.slug, zmoldname);
				} 
			}
		} 
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-productGetProduct=' + ex.message);
	}  
}

wtwshopping.prototype.clearEditMold = function() {
	try {
		dGet('wtw_tmoldproductid').value = '';
		dGet('wtw_tmoldslug').value = '';
		dGet('wtw_tmoldcategoryid').value = '';
		dGet('wtw_tmoldallowsearch').value = '1';
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-clearEditMold=' + ex.message);
	}
}

wtwshopping.prototype.openColorSelector = function(zmold, zmoldname, zshape, zcolorgroup) {
	try {
		//zmold = WTW.getMeshOrNodeByID(zmoldname + '-text');
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-openColorSelector=' + ex.message);
	}
	return zmold;
}

wtwshopping.prototype.setColor = function(zmoldname, zcolorgroup, zemissivecolor, zdiffusecolor, zspecularcolor, zambientcolor) {
	try {
		if (WTW.adminView == 1) {
			var zmold = WTW.getMeshOrNodeByID(zmoldname);
			if (zmold != null) {
				var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
				if (zmoldnameparts.molds[zmoldnameparts.moldind] != null) {
					zmoldnameparts.molds[zmoldnameparts.moldind].color.emissivecolor = zemissivecolor;
					zmoldnameparts.molds[zmoldnameparts.moldind].color.diffusecolor = zdiffusecolor;
					zmoldnameparts.molds[zmoldnameparts.moldind].color.specularcolor = zspecularcolor;
					zmoldnameparts.molds[zmoldnameparts.moldind].color.ambientcolor = zambientcolor;
				}
				if (zmoldnameparts.shape == 'storeproduct' || zmoldnameparts.shape == 'storesign' || zmoldnameparts.shape == 'storecategories' || zmoldnameparts.shape == 'productsearch') {
					zmold = WTW.getMeshOrNodeByID(zmoldname + '-imageframe');
				}
				if (zmold != null && zmoldname.indexOf('store') > -1 && zmoldnameparts.shape != 'store3dsign') {
					try {
						if (zmold.material != undefined && zmold.material != null) {
							WTW.disposeDirectionalTexture(zmold);
								if (zmold.material.diffuseTexture != undefined) {
									if (zmold.material.diffuseTexture != null) {
										zmold.material.diffuseTexture.dispose();
										zmold.material.diffuseTexture = null;
									}
								}
							zmold.material.dispose();
							zmold.material = null;
						}
					} catch (ex) {}
					
					var zcovering = new BABYLON.StandardMaterial('mat' + zmoldname, scene);
					zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zdiffusecolor);
					zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zemissivecolor);
					zcovering.specularColor = new BABYLON.Color3.FromHexString(zspecularcolor);
					zcovering.ambientColor = new BABYLON.Color3.FromHexString(zambientcolor);
					zmold.material = zcovering;
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-setColor=' + ex.message);
	}
}

wtwshopping.prototype.moldQueueAdd = function(zmoldname, zmold) {
	try {
		if (WTW.adminView == 1) {
			if (zmoldname.indexOf('storeproduct') > -1 || zmoldname.indexOf('storeaddtocart') > -1 || zmoldname.indexOf('storebuynow') > -1 || zmoldname.indexOf('storereadmore') > -1 || zmoldname.indexOf('storecheckout') > -1) {
				if (zmold.actionManager != null) {
					zmold.actionManager.unregisterAction(WTW.mouseOver);
					zmold.actionManager.unregisterAction(WTW.mouseOut);
				}
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-moldQueueAdd=' + ex.message);
	}
}

wtwshopping.prototype.searchProducts = async function(zmoldname) {
	/* process to retrieve products when search button is pressed */
	try {
		var zinputid = zmoldname.replace('-searchbutton','-searchtext') + '-textbox';
		var zsearch = '';
		if (dGet(zinputid) != null) {
			zsearch = dGet(zinputid).value;
		}
		var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
		var zstoreinfo = WTWShopping.getStoreID(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid);

		if (zstoreinfo.woocommerceapiurl != '') {
			var zurl = zstoreinfo.woocommerceapiurl + 'products/?search=' + zsearch + '&per_page=50&consumer_key=' + atob(zstoreinfo.woocommercekey) + '&consumer_secret=' + atob(zstoreinfo.woocommercesecret);
			WTW.getAsyncJSON(zurl, 
				function(zresponse) {
					if (zresponse != null) {
						/* process results */
						WTWShopping.productClearFetchProducts(zmoldname);
						WTWShopping.productLoadProducts(zmoldname, '', JSON.parse(zresponse), zstoreinfo.storeurl, 'walktheweb');
					}
				}
			);
		} 
	} catch (ex) { 
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-searchProducts=' + ex.message);
	}
}

wtwshopping.prototype.searchProductsText = async function(zmoldname) {
	/* search Text area is clicked or selected - starts selected mold as active and blinks a cursor */
	try {
		WTW.hilightMoldFast(zmoldname, 'green');
		var ztextbox = zmoldname + '-textbox';
		if (dGet(ztextbox) == null) {
			if (dGet('wtwshopping_searchboxes') == null) {
				var zsearchboxdiv = document.createElement('div');
				zsearchboxdiv.id = 'wtwshopping_searchboxes';
				zsearchboxdiv.className = 'wtw-hide';
				document.getElementsByTagName('body')[0].appendChild(zsearchboxdiv);
			}
			var zinput = document.createElement('input');
			zinput.id = ztextbox;
			zinput.type = 'hidden';
			zinput.value = '';
			dGet('wtwshopping_searchboxes').appendChild(zinput);
		}
		if (WTW.selectedMoldName != zmoldname) {
			WTW.selectedMoldName = zmoldname;
			window.clearInterval(WTW.textTimer);
			WTW.textTimer = null;
		}
		/* start blinking cursor at end of text typed */
		if (WTW.textTimer == null) {
			WTW.textTimer = window.setInterval(function(){
				var zinputid = WTW.selectedMoldName + '-textbox';
				var zwebstyle = {
					'anchor':'left',
					'letter-height':1.00,
					'letter-thickness':.2,
					'color':'#ffffff',
					'alpha':1.00,
					'colors':{
						'diffuse':'#ffffff',
						'specular':'#989e2c',
						'ambient':'#888722',
						'emissive':'#37370d'
					}
				};
				var zmold = WTW.getMeshOrNodeByID(WTW.selectedMoldName);
				if (zmold != null && dGet(zinputid) != null) {
					WTW.disposeClean(WTW.selectedMoldName + '-text');
					var zshowtext = dGet(zinputid).value;
					/* if text is too long, trim text for display */
					var zhaspipe = 0;
					var zmaxlength = 10;
					if (zshowtext.indexOf('|') > -1) {
						zhaspipe = 1;
						zshowtext = zshowtext.replace('|','');
					}
					/* W and M are wider and can not fit as many characters on the display screen */
					if (zshowtext.indexOf('w') > -1 || zshowtext.indexOf('m') > -1 || zshowtext.indexOf('W') > -1 || zshowtext.indexOf('M') > -1) {
						zmaxlength = 7;
					}
					if (zshowtext.length > zmaxlength) {
						zshowtext = zshowtext.substr(zshowtext.length-zmaxlength-1,zshowtext.length-(zshowtext.length-zmaxlength-1));
					}
					/* decide if pipe key | should show or not */
					if (zhaspipe == 0) {
						zshowtext += '|';
						dGet(zinputid).value += '|';
					} else {
						dGet(zinputid).value = dGet(zinputid).value.replace('|','');
					}
					/* create 3d text */
					Writer = BABYLON.MeshWriter(scene, {scale:1});
					var zdisplaytext = null;
					if (zshowtext != '') {
						zdisplaytext = new Writer(zshowtext, zwebstyle);
						var zmytext = zdisplaytext.getMesh();
						zmytext.rotation = new BABYLON.Vector3(WTW.getRadians(-45), 0, 0);
						zmytext.position = new BABYLON.Vector3(-2.5, 10.25, 0);
						zmytext.name = WTW.selectedMoldName + '-text';
						zmytext.parent = zmold;
						zmytext.isPickable = false;
					}
				} else {
					window.clearInterval(WTW.textTimer);
					WTW.textTimer = null;
				}
			},500);
		}
	} catch (ex) { 
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-searchProductsText=' + ex.message);
	}
}

wtwshopping.prototype.keyDownSelectedMold = async function(zevent) {
	/* process key when pressed */
	try {
		var zinputid = WTW.selectedMoldName + '-textbox';
		if (dGet(zinputid) != null) {
			dGet(zinputid).value = dGet(zinputid).value.replace('|','');
			switch (zevent.key) {
				case 'Backspace':
				case 'Delete':
					/* remove the last character */
					var ztext = dGet(zinputid).value.substring(0, dGet(zinputid).value.length - 1);
					dGet(zinputid).value = ztext;
					break;
				default:
					/* only process accepted keys */
					var zaccept = 'abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.-+';
					if (zaccept.indexOf(zevent.key) > -1) {
						dGet(zinputid).value += zevent.key;
					}
					break;
			}
		}
	} catch (ex) { 
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-keyDownSelectedMold=' + ex.message);
	}
}

wtwshopping.prototype.clearSelectedMold = function () {
	/* selected mold pauses keyboard avatar movement - clearing will allow avatar to move again */
	try {
		var zinputid = WTW.selectedMoldName + '-textbox';
		if (dGet(zinputid) != null) {
			dGet(zinputid).value = dGet(zinputid).value.replace('|','');
		}
		/* stop the timer if it is running */
		if (WTW.textTimer != null) {
			window.clearInterval(WTW.textTimer);
			WTW.textTimer = null;
		}
		/* in case the text still has the pipe | - repaint the text one last time */
		var zinputid = WTW.selectedMoldName + '-textbox';
		var zwebstyle = {
			'anchor':'left',
			'letter-height':1.00,
			'letter-thickness':.2,
			'color':'#ffffff',
			'alpha':1.00,
			'colors':{
				'diffuse':'#ffffff',
				'specular':'#989e2c',
				'ambient':'#888722',
				'emissive':'#37370d'
			}
		};
		var zmold = WTW.getMeshOrNodeByID(WTW.selectedMoldName);
		if (zmold != null && dGet(zinputid) != null) {
			WTW.disposeClean(WTW.selectedMoldName + '-text');
			var zshowtext = dGet(zinputid).value;
			/* if text is too long, trim text for display */
			var zmaxlength = 10;
			if (zshowtext.indexOf('|') > -1) {
				zshowtext = zshowtext.replace('|','');
			}
			/* W and M are wider and can not fit as many characters on the display screen */
			if (zshowtext.indexOf('w') > -1 || zshowtext.indexOf('m') > -1 || zshowtext.indexOf('W') > -1 || zshowtext.indexOf('M') > -1) {
				zmaxlength = 7;
			}
			if (zshowtext.length > zmaxlength) {
				zshowtext = zshowtext.substr(zshowtext.length-zmaxlength-1,zshowtext.length-(zshowtext.length-zmaxlength-1));
			}
			/* create 3d text */
			Writer = BABYLON.MeshWriter(scene, {scale:1});
			var zdisplaytext = null;
			if (zshowtext != '') {
				zdisplaytext = new Writer(zshowtext, zwebstyle);
				var zmytext = zdisplaytext.getMesh();
				zmytext.rotation = new BABYLON.Vector3(WTW.getRadians(-45), 0, 0);
				zmytext.position = new BABYLON.Vector3(-2.5, 10.25, 0);
				zmytext.name = WTW.selectedMoldName + '-text';
				zmytext.parent = zmold;
				zmytext.isPickable = false;
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-clearSelectedMold=' + ex.message);
	}
}

wtwshopping.prototype.toggleAdminSubMenu = function(zobj) {
	/* toggle admin menu and submenu */
	try {
		switch (zobj.id) {
			case 'wtw_adminshopping':
				if ((dGet('wtw_liststorespage').style.display == 'none' || dGet('wtw_liststorespage').style.display == '') && (dGet('wtw_addstoresettingspage').style.display == 'none' || dGet('wtw_addstoresettingspage').style.display == '')) {
					WTW.openFullPageForm('fullpage','All 3D Stores','wtw_liststorespage');
					WTWShopping.getStores();
				} else {
					WTW.hide('wtw_liststorespage');
					WTW.hide('wtw_addstoresettingspage');
					WTW.closeFullPageForm();
				}
				break;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshopping.js-toggleAdminSubMenu=' + ex.message);
	}
}

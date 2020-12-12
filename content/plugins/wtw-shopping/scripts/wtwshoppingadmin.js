wtwshopping.prototype.addStore = async function() {
	try {
		var zstoreiframes = '0';
		if (dGet('wtw_tstoreiframes').checked) {
			zstoreiframes = '1';
		}
		var zrequest = {
			'storeid':dGet('wtw_tstoreid').value,
			'storename':btoa(dGet('wtw_tstorename').value),
			'storeiframes':zstoreiframes,
			'storeurl':dGet('wtw_tstoreurl').value,
			'storecarturl':dGet('wtw_tstorecarturl').value,
			'storeproducturl':dGet('wtw_tstoreproducturl').value,
			'woocommerceapiurl':dGet('wtw_tstorewooapiurl').value,
			'woocommercekey':btoa(dGet('wtw_tstorewookey').value),
			'woocommercesecret':btoa(dGet('wtw_tstorewoosecret').value),
			'function':'savestore'
		};
		WTW.postAsyncJSON("/core/handlers/wtwshopping-stores.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note: zresponse.serror would contain any error text */
				WTWShopping.cancelSaveStore(false);
				WTW.openFullPageForm('fullpage','List Stores','wtw_liststorespage');
				WTWShopping.getStores();
			}
		);
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingadmin.js-addStore=" + ex.message);
	} 
}

wtwshopping.prototype.deleteStore = async function() {
	try {
		var zrequest = {
			'storeid':dGet('wtw_tstoreid').value,
			'function':'deletestore'
		};
		WTW.postAsyncJSON("/core/handlers/wtwshopping-stores.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note: zresponse.serror would contain any error text */
				WTWShopping.cancelSaveStore(false);
				WTW.openFullPageForm('fullpage','List Stores','wtw_liststorespage');
				WTWShopping.getStores();
			}
		);
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingadmin.js-deleteStore=" + ex.message);
	} 
}

wtwshopping.prototype.cancelSaveStore = function(zredirect) {
	try {
		dGet('wtw_tstoreid').value = '';
		dGet('wtw_tstorename').value = '';
		dGet('wtw_tstoreiframes').checked = true;
		dGet('wtw_tstoreurl').value = '';
		dGet('wtw_tstorecarturl').value = '';
		dGet('wtw_tstoreproducturl').value = '';
		dGet('wtw_tstorewooapiurl').value = '';
		dGet('wtw_tstorewookey').value = '';
		dGet('wtw_tstorewoosecret').value = '';
		dGet('wtw_shopping_addstoretitle').innerHTML = "Add Store";
		dGet('wtw_baddstore').innerHTML = "Add Store";
		WTW.hide('wtw_bdeletestore');
		if (zredirect) {
			WTW.openFullPageForm('fullpage','List Stores','wtw_liststorespage');parent.WTWShopping.getStores();
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingadmin.js-cancelSaveStore=" + ex.message);
	} 
}

wtwshopping.prototype.saveConnectStore = async function(zwebtype) {
	try {
		var zrequest = {
			'storeid':WTW.getDDLValue('wtwshopping_' + zwebtype + 'connectstore'),
			'communityid':communityid,
			'buildingid':buildingid,
			'thingid':thingid,
			'function':'saveconnectstore'
		};
		WTW.postAsyncJSON("/core/handlers/wtwshopping-stores.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note: zresponse.serror would contain any error text */
				WTW.hideAdminMenu();
				WTW.backToTools();
			}
		);
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingadmin.js-saveConnectStore=" + ex.message);
	} 
}

wtwshopping.prototype.getStores = function() {
	try {
		WTWShopping.stores = [];
		WTW.getJSON("/connect/wtw-shopping-getstores.php", 
			function(zresponse) {
				dGet('wtw_shopping_liststores').innerHTML = "";
				var zliststores = "<table class=\"wtw-table\"><tr><td class=\"wtw-tablecolumnheading\"><b>Store Name</b></td><td class=\"wtw-tablecolumnheading\"><b>Store URL</b></td><td class=\"wtw-tablecolumnheading\"><b>&nbsp;</b></td></tr>";
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							WTWShopping.stores[i] = zresponse[i];
							var zwtwkey = "";
							var znewkey = "";
							if (zresponse[i].wtwkey == '') {
								zwtwkey = "<div class='wtw-greenbuttonright' onclick=\"dGet('wtw_tstoreid').value='" + zresponse[i].storeid + "';WTWShopping.deleteStore();\">Deny Connection</div><div class='wtw-greenbuttonright' onclick=\"WTWShopping.allowConnection('" + zresponse[i].storeid + "');\">Allow Connection</div>";
							}
							if (zresponse[i].woocommercekey != zresponse[i].woocommercekeynew && zresponse[i].woocommercekeynew != '') {
								znewkey = "<div class='wtw-greenbuttonright' onclick=\"WTWShopping.updateStoreKey('" + zresponse[i].storeid + "');\">Update Key</div>";
							}
							zliststores += "<tr><td class=\"wtw-tablecolumns\">" + atob(zresponse[i].storename) + "</td><td class=\"wtw-tablecolumns\"><a href='" + zresponse[i].storeurl + "' target='_blank'>" + zresponse[i].storeurl + "</a></td><td class=\"wtw-tablecolumns\"><div class='wtw-bluebuttonright' onclick=\"WTWShopping.editStore('" + zresponse[i].storeid + "');\">Edit</div>" + znewkey + zwtwkey + "</td></tr>";
						}
					}
				}
				zliststores += "</table>";
				dGet('wtw_shopping_liststores').innerHTML = zliststores;
			}
		); 
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingadmin.js-getStores=" + ex.message);
	} 
}

wtwshopping.prototype.getStoresDropdown = async function(zwebtype) {
	try {
		WTW.clearDDL('wtwshopping_' + zwebtype + 'connectstore');
		var zoption = document.createElement("option");
		zoption.text = "Not Connected";
		zoption.value = "";
		dGet('wtwshopping_' + zwebtype + 'connectstore').add(zoption);
		WTWShopping.stores = [];
		WTW.getAsyncJSON("/connect/wtw-shopping-getstores.php", 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							var option = document.createElement("option");
							option.text = atob(zresponse[i].storename);
							option.value = zresponse[i].storeid;
							dGet('wtwshopping_' + zwebtype + 'connectstore').add(option);
						}
					}
				}
				WTWShopping.setConnectStore(zwebtype);
				WTW.show('wtwshopping_admin' + zwebtype + 'storesdiv');
			}
		); 
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingadmin.js-getStoresDropdown=" + ex.message);
	} 
}

wtwshopping.prototype.setConnectStore = function(zwebtype) {
	try {
		WTW.getJSON("/connect/wtw-shopping-getconnectstore.php?communityid=" + communityid + "&buildingid=" + buildingid + "&thingid=" + thingid, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				if (zresponse != null) {
					for (var i=0;i<zresponse.length;i++) {
						if (zresponse[i] != null) {
							WTW.setDDLValue('wtwshopping_' + zwebtype + 'connectstore', zresponse[i].storeid);
						}
					}
				}
				
			}
		); 
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingadmin.js-setConnectStore=" + ex.message);
	} 
}

wtwshopping.prototype.editStore = function(zstoreid) {
	try {
		for (var i=0;i< WTWShopping.stores.length;i++) {
			if (WTWShopping.stores[i] != null) {
				if (WTWShopping.stores[i].storeid == zstoreid) {
					WTW.openFullPageForm('fullpage','Edit Store','wtw_addstoresettingspage');
					if (WTWShopping.stores[i].storeiframes == "1") {
						dGet('wtw_tstoreiframes').checked = true;
					} else {
						dGet('wtw_tstoreiframes').checked = false;
					}
					dGet('wtw_tstoreid').value = zstoreid;
					dGet('wtw_tstorename').value = atob(WTWShopping.stores[i].storename);
					dGet('wtw_tstoreurl').value = WTWShopping.stores[i].storeurl;
					dGet('wtw_tstorecarturl').value = WTWShopping.stores[i].storecarturl;
					dGet('wtw_tstoreproducturl').value = WTWShopping.stores[i].storeproducturl;
					dGet('wtw_tstorewooapiurl').value = WTWShopping.stores[i].woocommerceapiurl;
					dGet('wtw_tstorewookey').value = atob(WTWShopping.stores[i].woocommercekey);
					dGet('wtw_tstorewoosecret').value = atob(WTWShopping.stores[i].woocommercesecret);
					dGet('wtw_shopping_addstoretitle').innerHTML = "Edit Store";
					dGet('wtw_baddstore').innerHTML = "Save Store";
					WTW.show('wtw_bdeletestore');
				}
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingadmin.js-editStore=" + ex.message);
	} 
}

wtwshopping.prototype.updateStoreKey = async function(zstoreid) {
	try {
		var zrequest = {
			'storeid':zstoreid,
			'function':'updatestorekey'
		};
		WTW.postAsyncJSON("/core/handlers/wtwshopping-stores.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note: zresponse.serror would contain any error text */
				WTWShopping.getStores();
			}
		);
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingadmin.js-updateStoreKey=" + ex.message);
	} 
}

wtwshopping.prototype.allowConnection = function(zstoreid) {
	try {
		var zrequest = {
			'storeid':zstoreid,
			'function':'allowconnection'
		};
		WTW.postJSON("/core/handlers/wtwshopping-stores.php", zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note: zresponse.serror would contain any error text */
				WTWShopping.getStores();
			}
		);
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingadmin.js-allowConnection=" + ex.message);
	} 
}


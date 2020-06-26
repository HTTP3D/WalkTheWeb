<?php
global $wtwhandlers;
try {
	/* include the class for the functions to save, edit, or delete the records in the database */
	require_once(WTWSHOPPING_PATH . '/functions/class_wtwshopping_stores.php');
	global $wtwshopping_stores;
	/* get sent data */
	$zrequest = file_get_contents('php://input');
	$zrequest = json_decode($zrequest, TRUE);
	/* get the requested function name for the switch case below */
	$zfunction = strtolower($wtwhandlers->getPost('function',''));
	
	/* get form Posted Values - your passed data */
	/* $wtwhandlers->getPost(fieldname, defaultvalue); */
	$zcommunityid = $wtwhandlers->getPost('communityid','');
	$zbuildingid = $wtwhandlers->getPost('buildingid','');
	$zthingid = $wtwhandlers->getPost('thingid','');
	$zmoldid = $wtwhandlers->getPost('moldid','');
	$zstoreid = $wtwhandlers->getPost('storeid','');
	$zstorename = $wtwhandlers->getPost('storename','');
	$zstoreiframes = $wtwhandlers->getPost('storeiframes','');
	$zstoreurl = $wtwhandlers->getPost('storeurl','');
	$zstorecarturl = $wtwhandlers->getPost('storecarturl','');
	$zstoreproducturl = $wtwhandlers->getPost('storeproducturl','');
	$zwoocommerceapiurl = $wtwhandlers->getPost('woocommerceapiurl','');
	$zwoocommercekey = $wtwhandlers->getPost('woocommercekey','');
	$zwoocommercesecret = $wtwhandlers->getPost('woocommercesecret','');
	$zmoldslug = $wtwhandlers->getPost('moldslug','');
	$zproductid = $wtwhandlers->getPost('productid','');
	$zcategoryid = $wtwhandlers->getPost('categoryid','');
	$zallowsearch = $wtwhandlers->getPost('allowsearch','');

	/* set response array of values - default for serror */
	$zresponse = array(
		'serror'=> ''
	);
	switch ($zfunction) {
		case "savestore":
			/* saves the store api connection information for use on 3D Websites. */
			$zstoreid = $wtwshopping_stores->saveStore($zstoreid, $zstorename, $zstoreiframes, $zstoreurl, $zstorecarturl, $zstoreproducturl, $zwoocommerceapiurl, $zwoocommercekey, $zwoocommercesecret);
			$zresponse = array(
				'storeid'=> $zstoreid,
				'serror'=> ''
			);
			break;
		case "saveconnectstore":
			/* sets a community, building, or thing to use a particular store for products and checkout */
			$wtwshopping_stores->saveConnectStore($zstoreid, $zcommunityid, $zbuildingid, $zthingid);
			break;
		case "updatestorekey":
			$wtwshopping_stores->updateStoreKey($zstoreid);
			break;
		case "allowconnection":
			$wtwshopping_stores->allowConnection($zstoreid);
			break;
		case "deletestore":
			$wtwshopping_stores->deleteStore($zstoreid);
			break;
		case "savemold":
			$wtwshopping_stores->saveMold($zcommunityid, $zbuildingid, $zthingid, $zmoldid, $zmoldslug, $zproductid, $zcategoryid, $zallowsearch);
			break;
		case "deletemold":
			$wtwshopping_stores->deleteMold($zcommunityid, $zbuildingid, $zthingid, $zmoldid);
			break;
	}

	echo $wtwhandlers->addHandlerHeader($wtwhandlers->domainname);
	echo json_encode($zresponse);

} catch (Exception $e) {
	$wtwhandlers->serror("core-handlers-wtw-shopping-wtwshopping-stores.php=".$e->getMessage());
}
?>
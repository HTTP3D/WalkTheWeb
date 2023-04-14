/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

wtwshopping.prototype.setMoldFormFields = function(zshape) {
	try {
		var zshapevalue = zshape.toLowerCase();
		while (zshapevalue.indexOf(' ') > -1) {
			zshapevalue = zshapevalue.replace(' ','');
		}
		switch (zshapevalue) {
			case 'storeproduct':
				dGet('wtw_moldpositiontitle').innerHTML = 'Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Frame Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Product';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Product';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Product';
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_alttagdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldmergemoldsdiv');
				WTW.hide('wtw_productsearchdiv');
				WTW.show('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle'); 
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_productdiv');
				dGet('wtw_tallowsearch').checked = true;
				break;
			case 'storeaddtocart':
			case 'storebuynow':
			case 'storereadmore':
				dGet('wtw_moldpositiontitle').innerHTML = 'Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Frame Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Button';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Button';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Button';
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_alttagdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldmergemoldsdiv');
				WTW.hide('wtw_productsearchdiv');
				WTW.show('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle'); 
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_productdiv');
				dGet('wtw_tallowsearch').checked = true;
				break;
			case 'storecheckout':
				dGet('wtw_moldpositiontitle').innerHTML = 'Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Frame Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Button';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Button';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Button';
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_alttagdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldmergemoldsdiv');
				WTW.hide('wtw_productsearchdiv');
				WTW.show('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle'); 
				WTW.show('wtw_moldtexturepreview');
				dGet('wtw_tallowsearch').checked = true;
				break;
			case 'storesign':
				dGet('wtw_moldpositiontitle').innerHTML = 'Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Frame Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Sign';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Sign';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Sign';
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_alttagdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.hide('wtw_moldshadowreflectiondiv');
				WTW.hide('wtw_productdiv');
				WTW.hide('wtw_productthingdiv');
				WTW.hide('wtw_moldmergemoldsdiv');
				WTW.hide('wtw_productsearchdiv');
				WTW.show('wtw_moldwebtextdiv');
				WTW.show('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle'); 
				WTW.show('wtw_moldtexturepreview');
				dGet('wtw_tallowsearch').checked = true;
				break;
			case 'store3dsign':
				dGet('wtw_moldpositiontitle').innerHTML = '3D Text Position';
				dGet('wtw_moldscalingtitle').innerHTML = '3D Text Length';
				dGet('wtw_moldrotationtitle').innerHTML = '3D Text Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = '3D Text Texture Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave 3D Sign';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete 3D Sign';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit 3D Sign';
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_alttagdiv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbasictexturesetdiv');
				WTW.hide('wtw_moldbasictextureset2div');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.hide('wtw_moldshadowreflectiondiv');
				WTW.hide('wtw_moldcolorsdiv');
				WTW.hide('wtw_productdiv');
				WTW.hide('wtw_productthingdiv');
				WTW.hide('wtw_moldmergemoldsdiv');
				WTW.hide('wtw_productsearchdiv');
				WTW.show('wtw_moldwebtextdiv');
				WTW.show('wtw_moldwebtextcolordiv');
				break;
			case 'storeviewcart':
				dGet('wtw_moldpositiontitle').innerHTML = 'Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Frame Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Cart Button';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Cart Button';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Cart Button';
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_alttagdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldmergemoldsdiv');
				WTW.hide('wtw_productsearchdiv');
				WTW.hide('wtw_productdiv');
				WTW.hide('wtw_productthingdiv');
				WTW.show('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle'); 
				WTW.show('wtw_moldtexturepreview');
				dGet('wtw_tallowsearch').checked = true;
				break;
			case 'storecategories':
				dGet('wtw_moldpositiontitle').innerHTML = 'Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Frame Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Categories';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Categories';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Categories';
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_alttagdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_productdiv');
				WTW.hide('wtw_moldmergemoldsdiv');
				WTW.hide('wtw_productsearchdiv');
				WTW.show('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle'); 
				WTW.show('wtw_moldtexturepreview');
				dGet('wtw_tallowsearch').checked = true;
				break;
			case 'productsearch':
				dGet('wtw_moldpositiontitle').innerHTML = 'Position';
				dGet('wtw_moldscalingtitle').innerHTML = 'Length';
				dGet('wtw_moldrotationtitle').innerHTML = 'Rotation';
				dGet('wtw_moldtexturetitle').innerHTML = 'Frame Image';
				dGet('wtw_bsavethismold').innerHTML = '<u>S</u>ave Search';
				dGet('wtw_bdelmold').innerHTML = '<u>D</u>elete Search';
				dGet('wtw_editmoldformtitle').innerHTML = 'Edit Search';
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_alttagdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.hide('wtw_moldmergemoldsdiv');
				WTW.hide('wtw_productdiv');
				WTW.hide('wtw_productthingdiv');
				WTW.hide('wtw_moldtexturesetdiv');
				WTW.hide('wtw_moldshadowreflectiondiv');
				WTW.show('wtw_productsearchdiv');
				WTW.show('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle'); 
				WTW.show('wtw_moldtexturepreview');
				dGet('wtw_tallowsearch').checked = true;
				break;
			default:
				WTW.hide('wtw_productdiv');
				WTW.hide('wtw_productthingdiv');
				WTW.hide('wtw_productsearchdiv');
				break;
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshoppingmolds.js-setMoldFormFields=' + ex.message);
	}
}

wtwshopping.prototype.setNewMoldDefaults = function(zshape) {
	try {
		var zcoords = WTW.getNewCoordinates(50);
		var zpositionx = Number(zcoords.positionX);
		var zpositiony = Number(zcoords.positionY);
		var zpositionz = Number(zcoords.positionZ);
		var zrotationy = Number(zcoords.rotationY);
		var zshapevalue = zshape.toLowerCase();
		var zimagepath = '/content/system/stock/stucco-512x512.jpg';
		while (zshapevalue.indexOf(' ') > -1) {
			zshapevalue = zshapevalue.replace(' ','');
		}
		if (thingid != '') {
			zpositionx = 0;
			zpositionz = 0;
		}
		switch (zshapevalue) {
			case 'storeproduct':
				zrotationy = WTW.cleanDegrees(zrotationy + 180);
				dGet('wtw_tmoldpositionx').value = zpositionx;
				dGet('wtw_tmoldpositiony').value = zpositiony + 4;
				dGet('wtw_tmoldpositionz').value = zpositionz;
				dGet('wtw_tmoldscalingx').value = '5.00';
				dGet('wtw_tmoldscalingy').value = '5.00';
				dGet('wtw_tmoldscalingz').value = '5.00';
				dGet('wtw_tmoldrotationx').value = '0.00';
				dGet('wtw_tmoldrotationy').value = zrotationy;
				dGet('wtw_tmoldrotationz').value = '0.00';
				dGet('wtw_tmoldspecial2').value = '0.00';
				dGet('wtw_tmolduoffset').value = '0.00';
				dGet('wtw_tmoldvoffset').value = '0.00';
				dGet('wtw_tmolduscale').value = '0.00';
				dGet('wtw_tmoldvscale').value = '0.00';
				dGet('wtw_tmoldsubdivisions').value = '12';
				break;
			case 'storeviewcart':
			case 'storeaddtocart':
			case 'storebuynow':
			case 'storecheckout':
			case 'storereadmore':
				zrotationy = WTW.cleanDegrees(zrotationy + 180);
				dGet('wtw_tmoldpositionx').value = zpositionx;
				dGet('wtw_tmoldpositiony').value = zpositiony + 7;
				dGet('wtw_tmoldpositionz').value = zpositionz;
				dGet('wtw_tmoldscalingx').value = '4.84';
				dGet('wtw_tmoldscalingy').value = '1.98';
				dGet('wtw_tmoldscalingz').value = '0.60';
				dGet('wtw_tmoldrotationx').value = '0.00';
				dGet('wtw_tmoldrotationy').value = zrotationy;
				dGet('wtw_tmoldrotationz').value = '0.00';
				dGet('wtw_tmoldspecial2').value = '0.00';
				dGet('wtw_tmolduoffset').value = '0.00';
				dGet('wtw_tmoldvoffset').value = '0.00';
				dGet('wtw_tmolduscale').value = '0.00';
				dGet('wtw_tmoldvscale').value = '0.00';
				dGet('wtw_tmoldsubdivisions').value = '12';
				break;
			case 'storesign':
				zrotationy = WTW.cleanDegrees(zrotationy + 90);
				dGet('wtw_tmoldpositionx').value = zpositionx;
				dGet('wtw_tmoldpositiony').value = zpositiony + 8;
				dGet('wtw_tmoldpositionz').value = zpositionz;
				dGet('wtw_tmoldscalingx').value = '3.00';
				dGet('wtw_tmoldscalingy').value = '10.00';
				dGet('wtw_tmoldscalingz').value = '30.00';
				dGet('wtw_tmoldrotationx').value = '0.00';
				dGet('wtw_tmoldrotationy').value = zrotationy;
				dGet('wtw_tmoldrotationz').value = '0.00';
				dGet('wtw_tmoldspecial2').value = '0.00';
				dGet('wtw_tmolduoffset').value = '0.00';
				dGet('wtw_tmoldvoffset').value = '0.00';
				dGet('wtw_tmolduscale').value = '0.00';
				dGet('wtw_tmoldvscale').value = '0.00';
				dGet('wtw_tmoldsubdivisions').value = '12';
				break;			
			case 'store3dsign':
				zrotationy = WTW.cleanDegrees(zrotationy + 180);
				dGet('wtw_tmoldpositionx').value = zpositionx;
				dGet('wtw_tmoldpositiony').value = zpositiony + 4;
				dGet('wtw_tmoldpositionz').value = zpositionz;
				dGet('wtw_tmoldscalingx').value = '1.00';
				dGet('wtw_tmoldscalingy').value = '1.00';
				dGet('wtw_tmoldscalingz').value = '1.00';
				dGet('wtw_tmoldrotationx').value = '0.00';
				dGet('wtw_tmoldrotationy').value = zrotationy;
				dGet('wtw_tmoldrotationz').value = '0.00';
				dGet('wtw_tmoldspecial2').value = '0.00';
				dGet('wtw_tmolduoffset').value = '0.00';
				dGet('wtw_tmoldvoffset').value = '0.00';
				dGet('wtw_tmolduscale').value = '0.00';
				dGet('wtw_tmoldvscale').value = '0.00';
				dGet('wtw_tmoldwebtext').value = 'My 3D Store';
				dGet('wtw_tmoldwebtextheight').value = '6.00';
				dGet('wtw_tmoldwebtextthick').value = '1.00';
				WTW.setDDLValue('wtw_tmoldwebtextalign', 'center');
				dGet('wtw_tmoldwebtextemissive').value = '#ff0000';
				dGet('wtw_tmoldwebtextspecular').value = '#000000';
				dGet('wtw_tmoldwebtextdiffuse').value = '#f0f0f0';
				dGet('wtw_tmoldwebtextambient').value = '#808080';
				dGet('wtw_tmoldsubdivisions').value = '12';
				dGet('wtw_tmoldcoveringold').value = 'none';
				dGet('wtw_tmoldtextureid').value = '';
				dGet('wtw_tmoldtexturepath').value = zimagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case 'storecategories':
				zrotationy = WTW.cleanDegrees(zrotationy + 90);
				dGet('wtw_tmoldpositionx').value = zpositionx;
				dGet('wtw_tmoldpositiony').value = zpositiony + 10;
				dGet('wtw_tmoldpositionz').value = zpositionz;
				dGet('wtw_tmoldscalingx').value = '.40';
				dGet('wtw_tmoldscalingy').value = '14.00';
				dGet('wtw_tmoldscalingz').value = '10.00';
				dGet('wtw_tmoldrotationx').value = '0.00';
				dGet('wtw_tmoldrotationy').value = zrotationy;
				dGet('wtw_tmoldrotationz').value = '0.00';
				dGet('wtw_tmoldspecial2').value = '0.00';
				dGet('wtw_tmolduoffset').value = '0.00';
				dGet('wtw_tmoldvoffset').value = '0.00';
				dGet('wtw_tmolduscale').value = '0.00';
				dGet('wtw_tmoldvscale').value = '0.00';
				dGet('wtw_tmoldsubdivisions').value = '12';
				break;			
			case 'productsearch':
				zrotationy = WTW.cleanDegrees(zrotationy + 180);
				dGet('wtw_tmoldpositionx').value = zpositionx;
				dGet('wtw_tmoldpositiony').value = zpositiony;
				dGet('wtw_tmoldpositionz').value = zpositionz;
				dGet('wtw_tmoldscalingx').value = '1.00';
				dGet('wtw_tmoldscalingy').value = '1.00';
				dGet('wtw_tmoldscalingz').value = '1.00';
				dGet('wtw_tmoldrotationx').value = '0.00';
				dGet('wtw_tmoldrotationy').value = zrotationy;
				dGet('wtw_tmoldrotationz').value = '0.00';
				dGet('wtw_tmoldspecial2').value = '0.00';
				dGet('wtw_tmolduoffset').value = '0.00';
				dGet('wtw_tmoldvoffset').value = '0.00';
				dGet('wtw_tmolduscale').value = '0.00';
				dGet('wtw_tmoldvscale').value = '0.00';
				dGet('wtw_tmoldsubdivisions').value = '12';
				break;			
		}
		WTW.setDDLValue('wtw_tmoldspecial1set', Number(dGet('wtw_tmoldspecial1').value));
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshoppingmolds.js-setNewMoldDefaults=' + ex.message);
	}
}

wtwshopping.prototype.addMoldStoreButton = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny ,zlenz);

		var zbasemold = new BABYLON.TransformNode(zmoldname + '-base');
		zbasemold.position = new BABYLON.Vector3(0,0,0);
		zbasemold.rotation = new BABYLON.Vector3(0,0,0);
		zbasemold.scaling = new BABYLON.Vector3(1/zlenx, 1/zleny, 1/zlenz);
		zbasemold.parent = zmold;

		var zshape = 'storereadmore';
		var zfolder = '/content/plugins/wtw-shopping/assets/3dobjects/';
		var zfile = 'button-readmore.babylon';

		if (zmolddef.shape != undefined) {
			zshape = zmolddef.shape;
		}
		switch (zshape) {
			case 'storeaddtocart':
				zfile = 'button-addtocart.babylon';
				break;
			case 'storebuynow':
				zfile = 'button-buynow.babylon';
				break;
			case 'storecheckout':
				zfile = 'button-checkout.babylon';
				break;
			case 'storereadmore':
				zfile = 'button-readmore.babylon';
				break;
			case 'storeviewcart':
				zfile = 'button-viewcart.babylon';
				break;
		}
		
		BABYLON.SceneLoader.ImportMeshAsync('', zfolder, zfile, scene).then(
			function (zresults) {
				if (zresults.meshes != null) {
					/* animate the button and add JS function to execute when pressed */
					var zobjectanimations = [];
					switch (zshape) {
						case 'storeaddtocart':
							/* onload makes sure the button is not in the pressed position */
							zobjectanimations[0] = WTW.newObjectAnimation();
							zobjectanimations[0].animationname = 'AddToCart1OnLoad';
							zobjectanimations[0].moldevent = 'onload';
							zobjectanimations[0].moldnamepart = 'button';
							zobjectanimations[0].startframe = 0;
							zobjectanimations[0].endframe = 1;
							zobjectanimations[0].animationloop = false;
							zobjectanimations[0].speedratio = 1.00;
							zobjectanimations[0].additionalscript = '';
							zobjectanimations[0].additionalparameters = '';
							
							/* onclick plays animation and additional script with parameters */
							zobjectanimations[1] = WTW.newObjectAnimation();
							zobjectanimations[1].animationname = 'addToCart1OnClick';
							zobjectanimations[1].moldevent = 'onclick';
							zobjectanimations[1].moldnamepart = 'button';
							zobjectanimations[1].startframe = 1;
							zobjectanimations[1].endframe = 35;
							zobjectanimations[1].animationloop = false;
							zobjectanimations[1].speedratio = 1;
							zobjectanimations[1].additionalscript = 'WTWShopping.productAddToCart';
							zobjectanimations[1].additionalparameters = zmoldname + '-button';
							break;
						case 'storebuynow':
							/* onload makes sure the button is not in the pressed position */
							zobjectanimations[0] = WTW.newObjectAnimation();
							zobjectanimations[0].animationname = 'AddToCart1OnLoad';
							zobjectanimations[0].moldevent = 'onload';
							zobjectanimations[0].moldnamepart = 'button';
							zobjectanimations[0].startframe = 0;
							zobjectanimations[0].endframe = 1;
							zobjectanimations[0].animationloop = false;
							zobjectanimations[0].speedratio = 1.00;
							zobjectanimations[0].additionalscript = '';
							zobjectanimations[0].additionalparameters = '';

							/* onclick plays animation and additional script with parameters */
							zobjectanimations[1] = WTW.newObjectAnimation();
							zobjectanimations[1].animationname = 'addToCart1OnClick';
							zobjectanimations[1].moldevent = 'onclick';
							zobjectanimations[1].moldnamepart = 'button';
							zobjectanimations[1].startframe = 1;
							zobjectanimations[1].endframe = 35;
							zobjectanimations[1].animationloop = false;
							zobjectanimations[1].speedratio = 1;
							zobjectanimations[1].additionalscript = 'WTWShopping.productAddToCart';
							zobjectanimations[1].additionalparameters = zmoldname + '-button';
							break;
						case 'storecheckout':
							/* onload makes sure the button is not in the pressed position */
							zobjectanimations[0] = WTW.newObjectAnimation();
							zobjectanimations[0].animationname = 'storeCheckOutOnLoad';
							zobjectanimations[0].moldevent = 'onload';
							zobjectanimations[0].moldnamepart = 'button';
							zobjectanimations[0].startframe = 0;
							zobjectanimations[0].endframe = 1;
							zobjectanimations[0].animationloop = false;
							zobjectanimations[0].speedratio = 1.00;
							zobjectanimations[0].additionalscript = '';
							zobjectanimations[0].additionalparameters = '';

							/* onclick plays animation and additional script with parameters */
							zobjectanimations[1] = WTW.newObjectAnimation();
							zobjectanimations[1].animationname = 'storeCheckOutOnClick';
							zobjectanimations[1].moldevent = 'onclick';
							zobjectanimations[1].moldnamepart = 'button';
							zobjectanimations[1].startframe = 1;
							zobjectanimations[1].endframe = 35;
							zobjectanimations[1].animationloop = false;
							zobjectanimations[1].speedratio = 1;
							zobjectanimations[1].additionalscript = 'WTWShopping.productShowCart';
							zobjectanimations[1].additionalparameters = zmoldname + '-button';
							break;
						case 'storereadmore':
							/* onload makes sure the button is not in the pressed position */
							zobjectanimations[0] = WTW.newObjectAnimation();
							zobjectanimations[0].animationname = 'readme1OnLoad';
							zobjectanimations[0].moldevent = 'onload';
							zobjectanimations[0].moldnamepart = 'button';
							zobjectanimations[0].startframe = 0;
							zobjectanimations[0].endframe = 1;
							zobjectanimations[0].animationloop = false;
							zobjectanimations[0].speedratio = 1.00;
							zobjectanimations[0].additionalscript = '';
							zobjectanimations[0].additionalparameters = '';

							/* onclick plays animation and additional script with parameters */
							zobjectanimations[1] = WTW.newObjectAnimation();
							zobjectanimations[1].animationname = 'readMore1OnClick';
							zobjectanimations[1].moldevent = 'onclick';
							zobjectanimations[1].moldnamepart = 'button';
							zobjectanimations[1].startframe = 1;
							zobjectanimations[1].endframe = 35;
							zobjectanimations[1].animationloop = false;
							zobjectanimations[1].speedratio = 1;
							zobjectanimations[1].additionalscript = 'WTWShopping.productReadMore';
							zobjectanimations[1].additionalparameters = zmoldname + '-button';
							break;
						case 'storeviewcart':
							/* onload makes sure the button is not in the pressed position */
							zobjectanimations[0] = WTW.newObjectAnimation();
							zobjectanimations[0].animationname = 'storeViewCartOnLoad';
							zobjectanimations[0].moldevent = 'onload';
							zobjectanimations[0].moldnamepart = 'button';
							zobjectanimations[0].startframe = 0;
							zobjectanimations[0].endframe = 1;
							zobjectanimations[0].animationloop = false;
							zobjectanimations[0].speedratio = 1.00;
							zobjectanimations[0].additionalscript = '';
							zobjectanimations[0].additionalparameters = '';

							/* onclick plays animation and additional script with parameters */
							zobjectanimations[1] = WTW.newObjectAnimation();
							zobjectanimations[1].animationname = 'storeViewCartOnClick';
							zobjectanimations[1].moldevent = 'onclick';
							zobjectanimations[1].moldnamepart = 'button';
							zobjectanimations[1].startframe = 1;
							zobjectanimations[1].endframe = 35;
							zobjectanimations[1].animationloop = false;
							zobjectanimations[1].speedratio = 1;
							zobjectanimations[1].additionalscript = 'WTWShopping.productShowCart';
							zobjectanimations[1].additionalparameters = zmoldname + '-button';
							break;
					}

					for (var i=0; i < zresults.meshes.length; i++) {
						if (zresults.meshes[i] != null) {
							var zmeshname = zresults.meshes[i].name.toLowerCase();
							var zchildmoldname = zmoldname + '-' + zmeshname;
							zresults.meshes[i].name = zchildmoldname;
							zresults.meshes[i].id = zchildmoldname;
							zresults.meshes[i].isPickable = true;
							zresults.meshes[i].renderingGroupId = 1;
							WTW.registerMouseOver(zresults.meshes[i]);
							if (zresults.meshes[i].parent == null) {
								zresults.meshes[i].parent = zbasemold;
							}
							if (zobjectanimations != null) {
								WTW.addMoldAnimation(zmoldname, zmeshname, zresults.meshes[i], zobjectanimations);
							}
						}
					}
					/* check to see if the mold still exists since the time it was requested */
					zmold = WTW.getMeshOrNodeByID(zmoldname);
					if (zmold == null) {
						WTW.disposeClean(zmoldname);
					} else {
						zmold.isPickable = false;
						WTWShopping.getStoreMolds(zmoldname); 
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStoreButton=' + ex.message);
	}
	return zmold;
}

wtwshopping.prototype.addMoldStoreProduct = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny ,zlenz);

		var zbasemold = new BABYLON.TransformNode(zmoldname + '-base');
		zbasemold.position = new BABYLON.Vector3(0,0,0);
		zbasemold.rotation = new BABYLON.Vector3(0,0,0);
		zbasemold.scaling = new BABYLON.Vector3(1/zlenx, 1/zleny, 1/zlenz);
		zbasemold.parent = zmold;

		var zspecial1 = 0;
		var ztextureid = 't1qlqxd6pzubzzzy';
		var ztexturepath = '/content/system/stock/lightgray-512x512.jpg';
		var zimagepath = '';
		var zimagehoverpath = '';
		var zimageclickpath = '';
		/* zspecial1 derived from drop-down list on mold form (wtw-shopping plugin addition) */
		/* 	0 = rounded box 2-sides
			1 = rounded box 1 side
			2 = rounded no image - great with 3D Model products */
		if (zmolddef.scaling.special1 != undefined) {
			if (zmolddef.scaling.special1 != '') {
				if (WTW.isNumeric(zmolddef.scaling.special1)) {
					zspecial1 = Number(zmolddef.scaling.special1);
					/* retired retro box 3 and 4 */
					if (zspecial1 > 2) {
						zspecial1 = 0;
					}
				}
			}
		}
		if (zmolddef.graphics.webimages[0] != null) {
			if (zmolddef.graphics.webimages[0].imagepath != undefined) {
				if (zmolddef.graphics.webimages[0].imagepath != '') {
					zimagepath = zmolddef.graphics.webimages[0].imagepath;
					zimagepath = zimagepath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
				}
			}
			if (zmolddef.graphics.webimages[0].imagehoverpath != undefined) {
				if (zmolddef.graphics.webimages[0].imagehoverpath != '') {
					zimagehoverpath = zmolddef.graphics.webimages[0].imagehoverpath;
					zimagehoverpath = zimagehoverpath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
				}
			}
			if (zmolddef.graphics.webimages[0].imageclickpath != undefined) {
				if (zmolddef.graphics.webimages[0].imageclickpath != '') {
					zimageclickpath = zmolddef.graphics.webimages[0].imageclickpath;
					zimageclickpath = zimageclickpath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
				}
			}
		}
		if (zmolddef.graphics.texture.id != undefined) {
			if (zmolddef.graphics.texture.id != '') {
				ztextureid = zmolddef.graphics.texture.id;
			}
		}
		if (zmolddef.graphics.texture.path != undefined) {
			if (zmolddef.graphics.texture.path != '') {
				ztexturepath = zmolddef.graphics.texture.path;
				ztexturepath = ztexturepath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
			}
		}
		
		/* all displays are loaded 3D Models */
		var zfolder = '/content/plugins/wtw-shopping/assets/3dobjects/';
		var zfile = '';
		switch (zspecial1) {
			case 1: /* rounded box (1 Side) */
				zfile = 'productdisplay1side.babylon';
				break;
			case 2: /* rounded box no image (2 Sided) */
				zfile = 'productdisplaybase.babylon';
				break;
			default: /* 0 = rounded box (2 Sided) */
				zfile = 'productdisplay2side.babylon';
				break;
		}
		BABYLON.SceneLoader.ImportMeshAsync('', zfolder, zfile, scene).then(
			function (zresults) {
				if (zresults.meshes != null) {
					var zobjectanimations = [];
					var zdisplaytype = zspecial1;
					
					/* add object animations using WTW.newObjectAnimation(); */
					zobjectanimations[0] = WTW.newObjectAnimation();
					zobjectanimations[0].animationname = 'readme1OnLoad';
					zobjectanimations[0].moldevent = 'onload';
					zobjectanimations[0].moldnamepart = 'readmore1';
					switch (zdisplaytype) {
						case 2:
							zobjectanimations[0].startframe = 40;
							zobjectanimations[0].endframe = 45;
							break;
						default:
							zobjectanimations[0].startframe = 20;
							zobjectanimations[0].endframe = 20;
							break;
					}
					zobjectanimations[0].animationloop = false;
					zobjectanimations[0].speedratio = 1.00;
					zobjectanimations[0].additionalscript = '';
					zobjectanimations[0].additionalparameters = '';
					
					zobjectanimations[1] = WTW.newObjectAnimation();
					zobjectanimations[1].animationname = 'readMore1OnClick';
					zobjectanimations[1].moldevent = 'onclick';
					zobjectanimations[1].moldnamepart = 'readmore1';
					switch (zdisplaytype) {
						case 2:
							zobjectanimations[1].startframe = 50;
							zobjectanimations[1].endframe = 55;
							break;
						default:
							zobjectanimations[1].startframe = 20;
							zobjectanimations[1].endframe = 39;
							break;
					}
					zobjectanimations[1].animationloop = false;
					zobjectanimations[1].speedratio = .50;
					zobjectanimations[1].additionalscript = 'WTWShopping.productReadMore';
					zobjectanimations[1].additionalparameters = zmoldname + '-readmore1';

					zobjectanimations[2] = WTW.newObjectAnimation();
					zobjectanimations[2].animationname = 'readMore1OnClick';
					zobjectanimations[2].moldevent = 'onclick';
					zobjectanimations[2].moldnamepart = 'readmoretext1';
					switch (zdisplaytype) {
						case 2:
							zobjectanimations[2].startframe = 50;
							zobjectanimations[2].endframe = 55;
							break;
						default:
							zobjectanimations[2].startframe = 20;
							zobjectanimations[2].endframe = 39;
							break;
					}
					zobjectanimations[2].animationloop = false;
					zobjectanimations[2].speedratio = .50;
					zobjectanimations[2].additionalscript = 'WTWShopping.productReadMore';
					zobjectanimations[2].additionalparameters = zmoldname + '-readmore1';

					zobjectanimations[3] = WTW.newObjectAnimation();
					zobjectanimations[3].animationname = 'AddToCart1OnLoad';
					zobjectanimations[3].moldevent = 'onload';
					zobjectanimations[3].moldnamepart = 'addtocart1';
					switch (zdisplaytype) {
						case 2:
							zobjectanimations[3].startframe = 1;
							zobjectanimations[3].endframe = 5;
							break;
						default:
							zobjectanimations[3].startframe = 0;
							zobjectanimations[3].endframe = 0;
							break;
					}
					zobjectanimations[3].animationloop = false;
					zobjectanimations[3].speedratio = 1.00;
					zobjectanimations[3].additionalscript = '';
					zobjectanimations[3].additionalparameters = 'addtocart';
					
					zobjectanimations[4] = WTW.newObjectAnimation();
					zobjectanimations[4].animationname = 'addToCart1OnClick';
					zobjectanimations[4].moldevent = 'onclick';
					zobjectanimations[4].moldnamepart = 'addtocart1';
					switch (zdisplaytype) {
						case 2:
							zobjectanimations[4].startframe = 10;
							zobjectanimations[4].endframe = 15;
							break;
						default:
							zobjectanimations[4].startframe = 0;
							zobjectanimations[4].endframe = 19;
							break;
					}
					zobjectanimations[4].animationloop = false;
					zobjectanimations[4].speedratio = .50;
					zobjectanimations[4].additionalscript = 'WTWShopping.productAddToCart';
					zobjectanimations[4].additionalparameters = zmoldname + '-addtocart1';
					
					zobjectanimations[5] = WTW.newObjectAnimation();
					zobjectanimations[5].animationname = 'addToCart1OnClick';
					zobjectanimations[5].moldevent = 'onclick';
					zobjectanimations[5].moldnamepart = 'addtocarttext1';
					switch (zdisplaytype) {
						case 2:
							zobjectanimations[5].startframe = 10;
							zobjectanimations[5].endframe = 15;
							break;
						default:
							zobjectanimations[5].startframe = 0;
							zobjectanimations[5].endframe = 19;
							break;
					}
					zobjectanimations[5].animationloop = false;
					zobjectanimations[5].speedratio = .50;
					zobjectanimations[5].additionalscript = 'WTWShopping.productAddToCart';
					zobjectanimations[5].additionalparameters = zmoldname + '-addtocart1';
					
					if (zspecial1 != 1) {
						zobjectanimations[6] = WTW.newObjectAnimation();
						zobjectanimations[6].animationname = 'readme2OnLoad';
						zobjectanimations[6].moldevent = 'onload';
						zobjectanimations[6].moldnamepart = 'readmore2';
						switch (zdisplaytype) {
							case 2:
								zobjectanimations[6].startframe = 60;
								zobjectanimations[6].endframe = 65;
								break;
							default:
								zobjectanimations[6].startframe = 60;
								zobjectanimations[6].endframe = 60;
								break;
						}
						zobjectanimations[6].animationloop = false;
						zobjectanimations[6].speedratio = 1.00;
						zobjectanimations[6].additionalscript = '';
						zobjectanimations[6].additionalparameters = '';
						
						zobjectanimations[7] = WTW.newObjectAnimation();
						zobjectanimations[7].animationname = 'readMore2OnClick';
						zobjectanimations[7].moldevent = 'onclick';
						zobjectanimations[7].moldnamepart = 'readmore2';
						switch (zdisplaytype) {
							case 2:
								zobjectanimations[7].startframe = 70;
								zobjectanimations[7].endframe = 75;
								break;
							default:
								zobjectanimations[7].startframe = 60;
								zobjectanimations[7].endframe = 79;
								break;
						}
						zobjectanimations[7].animationloop = false;
						zobjectanimations[7].speedratio = .50;
						zobjectanimations[7].additionalscript = 'WTWShopping.productReadMore';
						zobjectanimations[7].additionalparameters = zmoldname + '-readmore2';
						
						zobjectanimations[8] = WTW.newObjectAnimation();
						zobjectanimations[8].animationname = 'readMore2OnClick';
						zobjectanimations[8].moldevent = 'onclick';
						zobjectanimations[8].moldnamepart = 'readmoretext2';
						switch (zdisplaytype) {
							case 2:
								zobjectanimations[8].startframe = 70;
								zobjectanimations[8].endframe = 75;
								break;
							default:
								zobjectanimations[8].startframe = 60;
								zobjectanimations[8].endframe = 79;
								break;
						}
						zobjectanimations[8].animationloop = false;
						zobjectanimations[8].speedratio = .50;
						zobjectanimations[8].additionalscript = 'WTWShopping.productReadMore';
						zobjectanimations[8].additionalparameters = zmoldname + '-readmore2';
						
						zobjectanimations[9] = WTW.newObjectAnimation();
						zobjectanimations[9].animationname = 'AddToCart2OnLoad';
						zobjectanimations[9].moldevent = 'onload';
						zobjectanimations[9].moldnamepart = 'addtocart2';
						switch (zdisplaytype) {
							case 2:
								zobjectanimations[9].startframe = 20;
								zobjectanimations[9].endframe = 25;
								break;
							default:
								zobjectanimations[9].startframe = 40;
								zobjectanimations[9].endframe = 40;
								break;
						}
						zobjectanimations[9].animationloop = false;
						zobjectanimations[9].speedratio = 1.00;
						zobjectanimations[9].additionalscript = '';
						zobjectanimations[9].additionalparameters = '';

						zobjectanimations[10] = WTW.newObjectAnimation();
						zobjectanimations[10].animationname = 'addToCart2OnClick';
						zobjectanimations[10].moldevent = 'onclick';
						zobjectanimations[10].moldnamepart = 'addtocart2';
						switch (zdisplaytype) {
							case 2:
								zobjectanimations[10].startframe = 30;
								zobjectanimations[10].endframe = 35;
								break;
							default:
								zobjectanimations[10].startframe = 40;
								zobjectanimations[10].endframe = 59;
								break;
						}
						zobjectanimations[10].animationloop = false;
						zobjectanimations[10].speedratio = .50;
						zobjectanimations[10].additionalscript = 'WTWShopping.productAddToCart';
						zobjectanimations[10].additionalparameters = zmoldname + '-addtocart2';

						zobjectanimations[11] = WTW.newObjectAnimation();
						zobjectanimations[11].animationname = 'addToCart2OnClick';
						zobjectanimations[11].moldevent = 'onclick';
						zobjectanimations[11].moldnamepart = 'addtocarttext2';
						switch (zdisplaytype) {
							case 2:
								zobjectanimations[11].startframe = 30;
								zobjectanimations[11].endframe = 35;
								break;
							default:
								zobjectanimations[11].startframe = 40;
								zobjectanimations[11].endframe = 59;
								break;
						}
						zobjectanimations[11].animationloop = false;
						zobjectanimations[11].speedratio = .50;
						zobjectanimations[11].additionalscript = 'WTWShopping.productAddToCart';
						zobjectanimations[11].additionalparameters = zmoldname + '-addtocart2';						
					}

					for (var i=0; i < zresults.meshes.length; i++) {
						if (zresults.meshes[i] != null) {
							var zmeshname = zresults.meshes[i].name.toLowerCase();
							var zchildmoldname = zmoldname + '-' + zmeshname;
							zresults.meshes[i].name = zchildmoldname;
							zresults.meshes[i].id = zchildmoldname;
							zresults.meshes[i].isPickable = true;
							zresults.meshes[i].renderingGroupId = 1;
							WTW.registerMouseOver(zresults.meshes[i]);
							if (zresults.meshes[i].parent == null) {
								zresults.meshes[i].parent = zmold;
							}
							if (zresults.meshes[i].material != null) {
								if (zmeshname == 'readmore1' || zmeshname == 'readmore2' || zmeshname == 'addtocart1' || zmeshname == 'addtocart2') {
									zresults.meshes[i].material.emissiveColor = new BABYLON.Color3(.7,.7,.7);
								} else if (zmeshname == 'readmoretext1' || zmeshname == 'readmoretext2' || zmeshname == 'addtocarttext1' || zmeshname == 'addtocarttext2') {
									zresults.meshes[i].material.emissiveColor = new BABYLON.Color3(0,0,0);
									zresults.meshes[i].material.diffuseColor = new BABYLON.Color3(0,0,0);
									zresults.meshes[i].material.specularColor = new BABYLON.Color3(0,0,0);
									zresults.meshes[i].material.ambientColor = new BABYLON.Color3(0,0,0);
								} else if (zmeshname == 'displaycase') {
									zresults.meshes[i].material.emissiveColor = new BABYLON.Color3(.3,.3,.3);
								}
							}

							if (zobjectanimations != null) {
								WTW.addMoldAnimation(zmoldname, zmeshname, zresults.meshes[i], zobjectanimations);
							}
							if (zmeshname == 'imageframe') {
								var zcovering = new BABYLON.StandardMaterial('mat' + zmoldname, scene);
								zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
								zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
								zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
								zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);
								zresults.meshes[i].material = zcovering;
							}
						}
					}
					/* check to see if the mold still exists since the time it was requested */
					zmold = WTW.getMeshOrNodeByID(zmoldname);
					if (zmold != null) {
						zmold.isPickable = false;
						WTWShopping.getStoreMolds(zmoldname);
					} else {
						WTW.disposeClean(zmoldname);
					}
				}
			}
		);		
		
		/* set offsets for various sized product displays */
		/* special1 = 1 : single sided with image */
		var ztitlepositiony = zleny * 1.86;
		var ztitlepositionz = zlenz * 0.125;
		var zpricepositionz = zlenz * 0.1;
		if (zspecial1 == 2) {
			/* no image - dual sided */
			ztitlepositiony = zleny * .68;
			ztitlepositionz = zlenz * .46;
			zpricepositionz = zlenz * .46;
		} else if (zspecial1 == 0) {
			/* dual sided with images */
			ztitlepositionz = zlenz * 0.26;
			zpricepositionz = zlenz * 0.25;
		}

		var ztitlemold = BABYLON.MeshBuilder.CreatePlane(zmoldname + '-titleimagesm', {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
		ztitlemold.scaling = new BABYLON.Vector3(zlenx * 1.2, zleny * .24, .1);
		ztitlemold.position = new BABYLON.Vector3(0, ztitlepositiony, -ztitlepositionz);
		ztitlemold.parent = zbasemold;
		ztitlemold.renderingGroupId = 1;

		var zpricemold = BABYLON.MeshBuilder.CreatePlane(zmoldname + '-price1', {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
		zpricemold.scaling = new BABYLON.Vector3(zlenx * .55, zleny * .24, .1);
		zpricemold.position = new BABYLON.Vector3(zlenx * .3, zleny * .43, -zpricepositionz);
		zpricemold.parent = zbasemold;
		zpricemold.renderingGroupId = 1;
		
		if (zspecial1 != 2) {
			var zmolddefclickimage = WTW.newMold();
			zmolddefclickimage.shape = 'plane';
			zmolddefclickimage.covering = '2d texture';
			zmolddefclickimage.position.x = -(zlenx * 1.1)/2;
			zmolddefclickimage.position.y = 0;
			zmolddefclickimage.position.z = 0;
			zmolddefclickimage.scaling.x = zlenz - .2;
			zmolddefclickimage.scaling.y = zleny * .8;
			zmolddefclickimage.scaling.z = .1;
			zmolddefclickimage.subdivisions = 12;
			zmolddefclickimage.opacity = 1;
			zmolddefclickimage.graphics.texture.id = '';
			zmolddefclickimage.graphics.texture.path = zimageclickpath;
			zmolddefclickimage.graphics.uscale = 10/zleny;
			zmolddefclickimage.graphics.vscale = 10/zlenz;
			zmolddefclickimage.parentname = zmoldname + '-base';
			zmolddefclickimage.checkcollisions = '1';
			var zclickimagemold = BABYLON.MeshBuilder.CreatePlane(zmoldname + '-clickimage', {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
			zclickimagemold.scaling = new BABYLON.Vector3(zlenx * 1.15, zleny * 1.15, .1);
			zclickimagemold.position = new BABYLON.Vector3(0, zleny * 1.15, -zlenz * .05);
			zclickimagemold.parent = zbasemold;
			zclickimagemold.renderingGroupId = 1;
		}
		if (zspecial1 == 0 || zspecial1 == 2) {
			if (zspecial1 == 0) {
				zpricemold.position = new BABYLON.Vector3(zlenx * .3, zleny * .43, -zlenz * 0.25);
				zclickimagemold.position = new BABYLON.Vector3(0, zleny * 1.15, -zlenz * .2);
			}

			var ztitlemold2 = BABYLON.MeshBuilder.CreatePlane(zmoldname + '-titleimage2sm', {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
			ztitlemold2.scaling = new BABYLON.Vector3(zlenx * 1.2, zleny * .24, .1);
			ztitlemold2.position = new BABYLON.Vector3(0, ztitlepositiony, ztitlepositionz);
			ztitlemold2.rotation.y = WTW.getRadians(180);
			ztitlemold2.parent = zbasemold;
			ztitlemold2.renderingGroupId = 1;

			var zpricemold2 = BABYLON.MeshBuilder.CreatePlane(zmoldname + '-price2', {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
			zpricemold2.scaling = new BABYLON.Vector3(zlenx * .55, zleny * .24, .1);
			zpricemold2.position = new BABYLON.Vector3(-zlenx * .3, zleny * .43, zpricepositionz);
			zpricemold2.rotation.y = WTW.getRadians(180);
			zpricemold2.parent = zbasemold;
			zpricemold2.renderingGroupId = 1;
			
			if (zspecial1 != 2) {
				var zmolddefclickimage2 = WTW.newMold();
				zmolddefclickimage2.shape = 'plane';
				zmolddefclickimage2.covering = '2d texture';
				zmolddefclickimage2.position.x = -(zlenx * 1.1)/2;
				zmolddefclickimage2.position.y = 0;
				zmolddefclickimage2.position.z = 0;
				zmolddefclickimage2.scaling.x = zlenz - .2;
				zmolddefclickimage2.scaling.y = zleny * .8;
				zmolddefclickimage2.scaling.z = .1;
				zmolddefclickimage2.subdivisions = 12;
				zmolddefclickimage2.opacity = 1;
				zmolddefclickimage2.graphics.texture.id = '';
				zmolddefclickimage2.graphics.texture.path = zimageclickpath;
				zmolddefclickimage2.graphics.uscale = 10/zleny;
				zmolddefclickimage2.graphics.vscale = 10/zlenz;
				zmolddefclickimage2.parentname = zmoldname + '-base';
				zmolddefclickimage2.checkcollisions = '1';
				var zclickimagemold2 = BABYLON.MeshBuilder.CreatePlane(zmoldname + '-clickimage2', {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
				zclickimagemold2.scaling = new BABYLON.Vector3(zlenx * 1.15, zleny * 1.15, .1);
				zclickimagemold2.position = new BABYLON.Vector3(0, zleny * 1.15, zlenz * .2);
				zclickimagemold2.rotation.y = WTW.getRadians(180);
				zclickimagemold2.parent = zbasemold; 
				zclickimagemold2.renderingGroupId = 1;
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStoreProduct=' + ex.message);
	}
	return zmold;
}

wtwshopping.prototype.addMoldStoreSign = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny ,zlenz);

		var zbasemold = new BABYLON.TransformNode(zmoldname + '-base');
		zbasemold.position = new BABYLON.Vector3(0,0,0);
		zbasemold.rotation = new BABYLON.Vector3(0,0,0);
		zbasemold.scaling = new BABYLON.Vector3(1/zlenx, 1/zleny, 1/zlenz);
		zbasemold.parent = zmold;

		var ztextureid = 't1qlqxd6pzubzzzy';
		var ztexturepath = '/content/system/stock/lightgray-512x512.jpg';
		
		if (zmolddef.graphics.texture.id != undefined) {
			if (zmolddef.graphics.texture.id != '') {
				ztextureid = zmolddef.graphics.texture.id;
			}
		}
		if (zmolddef.graphics.texture.path != undefined) {
			if (zmolddef.graphics.texture.path != '') {
				ztexturepath = zmolddef.graphics.texture.path;
				ztexturepath = ztexturepath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
			}
		}
		
		var zmolddefframe = WTW.newMold();
		zmolddefframe.shape = 'box';
		zmolddefframe.covering = zmolddef.covering;
		zmolddefframe.position.x = 0;
		zmolddefframe.position.y = 0;
		zmolddefframe.position.z = 0;
		zmolddefframe.color = zmolddef.color;
		zmolddefframe.scaling.x = zlenx;
		zmolddefframe.scaling.y = zleny;
		zmolddefframe.scaling.z = zlenz;
		zmolddefframe.subdivisions = 12;
		zmolddefframe.graphics.texture.id = ztextureid;
		zmolddefframe.graphics.texture.path = ztexturepath;
		zmolddefframe.graphics.uscale = 10/zleny;
		zmolddefframe.graphics.vscale = 10/zlenz;
		zmolddefframe.parentname = zmoldname + '-base';
		zmolddefframe.checkcollisions = '1';
		var zimageframemold = BABYLON.MeshBuilder.CreateBox(zmoldname + '-imageframe', {}, scene);
		zimageframemold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zimageframemold.position = new BABYLON.Vector3(0, 0, 0);
		zimageframemold.material = WTW.addCovering(zmolddef.covering, zmoldname + '-imageframe', zmolddefframe, zlenx, zleny, zlenz, '0', '0');
		zimageframemold.parent = zbasemold;
		zimageframemold.renderingGroupId = 1;
	
		var ztitlemold2 = BABYLON.MeshBuilder.CreateBox(zmoldname + '-titleimage2', {}, scene);
		ztitlemold2.scaling = new BABYLON.Vector3(zlenx, zlenz * .9, zleny * .9);
		ztitlemold2.position = new BABYLON.Vector3(-zlenx * .1, 0, 0);
		ztitlemold2.rotation.x = WTW.getRadians(-90);
		ztitlemold2.parent = zbasemold;
		ztitlemold2.renderingGroupId = 1;
		
		var zcoveringtitle1 = new BABYLON.StandardMaterial('mat' + zmoldname + '-titleimage1texture', scene);
		zcoveringtitle1.alpha = 1;
		zcoveringtitle1.specularColor = new BABYLON.Color3(.2, .2, .2);
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

		if (WTW.adminView == 1) {
			zimageframemold.isPickable = true;
			WTW.registerMouseOver(zimageframemold);
			ztitlemold2.isPickable = true;
			WTW.registerMouseOver(ztitlemold2);
		}
		
		WTWShopping.getStoreInfo(zmoldname);
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStoreSign=' + ex.message);
	}
	return zmold;
}

wtwshopping.prototype.addMoldStore3DSign = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		var zwebname = '';
		if (zmolddef.webtext.webtext != undefined) {
			if (zmolddef.webtext.webtext != '') {
				zwebname = WTW.decode(zmolddef.webtext.webtext);
			}
		}
		if (zwebname == '') {
			var zmoldnameparts = WTW.getMoldnameParts(zmoldname);
			var zstoreinfo = WTWShopping.getStoreID(zmoldnameparts.communityid, zmoldnameparts.buildingid, zmoldnameparts.thingid);
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
		zmolddef.webtext.webtext = WTW.encode(zwebname);
		zmold = WTW.addMold3DText(zmoldname, zmolddef, zlenx, zleny, zlenz);
		zmold.renderingGroupId = 1;
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStore3DSign=' + ex.message);
	}
	return zmold;
}

wtwshopping.prototype.addMoldStoreViewCart = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny ,zlenz);

		var zbasemold = new BABYLON.TransformNode(zmoldname + '-base');
		zbasemold.position = new BABYLON.Vector3(0,0,0);
		zbasemold.rotation = new BABYLON.Vector3(0,0,0);
		zbasemold.scaling = new BABYLON.Vector3(1/zlenx, 1/zleny, 1/zlenz);
		zbasemold.parent = zmold;

		var ztextureid = 't1qlqxd6pzubzzzy';
		var ztexturepath = '/content/system/stock/lightgray-512x512.jpg';
		
		if (zmolddef.graphics.texture.id != undefined) {
			if (zmolddef.graphics.texture.id != '') {
				ztextureid = zmolddef.graphics.texture.id;
			}
		}
		if (zmolddef.graphics.texture.path != undefined) {
			if (zmolddef.graphics.texture.path != '') {
				ztexturepath = zmolddef.graphics.texture.path;
				ztexturepath = ztexturepath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
			}
		}

		var zmolddefframe = WTW.newMold();
		zmolddefframe.shape = 'box';
		zmolddefframe.covering = zmolddef.covering;
		zmolddefframe.position.x = 0;
		zmolddefframe.position.y = 0;
		zmolddefframe.position.z = 0;
		zmolddefframe.color = zmolddef.color;
		zmolddefframe.scaling.x = zlenx;
		zmolddefframe.scaling.y = zleny;
		zmolddefframe.scaling.z = zlenz;
		zmolddefframe.subdivisions = 12;
		zmolddefframe.graphics.texture.id = ztextureid;
		zmolddefframe.graphics.texture.path = ztexturepath;
		zmolddefframe.graphics.uscale = 10/zleny;
		zmolddefframe.graphics.vscale = 10/zlenz;
		zmolddefframe.parentname = zmoldname + '-base';
		zmolddefframe.checkcollisions = '1';
		var zimageframemold = BABYLON.MeshBuilder.CreateBox(zmoldname + '-imageframe', {}, scene);
		zimageframemold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zimageframemold.position = new BABYLON.Vector3(0, 0, 0);
		zimageframemold.material = WTW.addCovering(zmolddef.covering, zmoldname + '-imageframe', zmolddefframe, zlenx, zleny, zlenz, '0', '0');
		zimageframemold.parent = zbasemold;	
		zimageframemold.renderingGroupId = 1;
	
		var ztitlemold2 = BABYLON.MeshBuilder.CreateBox(zmoldname + '-titleimage2', {}, scene);
		ztitlemold2.scaling = new BABYLON.Vector3(zlenx, zlenz * .9, zleny * .9);
		ztitlemold2.position = new BABYLON.Vector3(-zlenx * .1, 0, 0);
		ztitlemold2.rotation.x = WTW.getRadians(-90);
		ztitlemold2.parent = zbasemold;
		ztitlemold2.renderingGroupId = 1;
		
		var zcoveringtitle1 = new BABYLON.StandardMaterial('mat' + zmoldname + '-titleimage1texture', scene);
		zcoveringtitle1.alpha = 1;
		zcoveringtitle1.specularColor = new BABYLON.Color3(.2, .2, .2);
		zcoveringtitle1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		zcoveringtitle1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
		var zcontenttexture1 = new BABYLON.DynamicTexture(zmoldname + '-titleimage1texture', {width: 512,height: 512}, scene, true);
		zcontenttexture1.name = zmoldname + '-titleimage1texture';
		/* zcontenttexture1.hasAlpha = true; */
		zcoveringtitle1.diffuseTexture = zcontenttexture1;
		zcoveringtitle1.diffuseTexture.vScale = .2;
		zcoveringtitle1.diffuseTexture.uScale = 1;
		zcoveringtitle1.diffuseTexture.vOffset = .8;
		ztitlemold2.material = zcoveringtitle1;
		WTW.wrapText(ztitlemold2, 'Click here to', '30px', '30px', 'center', 'top', 'white', 0, 0);
		WTW.wrapText(ztitlemold2, 'View Shopping Cart', '85px', '50px', 'center', 'top', 'yellow', 0, 0);

		var zcarthover = BABYLON.MeshBuilder.CreateBox(zmoldname + '-carthover', {}, scene);
		zcarthover.scaling = new BABYLON.Vector3(zlenx, zlenz * .89, zleny * .89);
		zcarthover.position = new BABYLON.Vector3(-zlenx * .12, 0, 0);
		zcarthover.rotation.x = WTW.getRadians(-90);
		zcarthover.parent = zbasemold;
		zcarthover.renderingGroupId = 1;
		
		var zcarttexturehover = new BABYLON.StandardMaterial('mat' + zmoldname + '-carttexturehover', scene);
		zcarttexturehover.alpha = 0;
		zcarttexturehover.specularColor = new BABYLON.Color3(.2, .2, .2);
		zcarttexturehover.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		zcarttexturehover.diffuseColor = new BABYLON.Color3(.9, .9, .9);
		var zcontenttexture1hover = new BABYLON.DynamicTexture(zmoldname + '-carttexturehover', {width: 512,height: 512}, scene, true);
		zcontenttexture1hover.name = zmoldname + '-carttexturehover';
		/* zcontenttexture1hover.hasAlpha = true; */
		zcarttexturehover.diffuseTexture = zcontenttexture1hover;
		zcarttexturehover.diffuseTexture.vScale = .2;
		zcarttexturehover.diffuseTexture.uScale = 1;
		zcarttexturehover.diffuseTexture.vOffset = .8;
		zcarthover.material = zcarttexturehover;
		WTW.wrapText(zcarthover, 'Click here to', '30px', '30px', 'center', 'top', 'white', 0, 0);
		WTW.wrapText(zcarthover, 'View Shopping Cart', '85px', '50px', 'center', 'top', 'green', 0, 0);
		WTW.registerMouseOver(zcarthover);
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStoreViewCart=' + ex.message);
	}
	return zmold;
}

wtwshopping.prototype.addMoldStoreCategories = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		if (zlenx < 1) {
			zlenx = 1;
		}
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny ,zlenz);

		var zbasemold = new BABYLON.TransformNode(zmoldname + '-base');
		zbasemold.position = new BABYLON.Vector3(0,0,0);
		zbasemold.rotation = new BABYLON.Vector3(0,0,0);
		zbasemold.scaling = new BABYLON.Vector3(1/zlenx, 1/zleny, 1/zlenz);
		zbasemold.parent = zmold;

		var ztextureid = 't1qlqxd6pzubzzzy';
		var ztexturepath = '/content/system/stock/lightgray-512x512.jpg';
		
		if (zmolddef.graphics.texture.id != undefined) {
			if (zmolddef.graphics.texture.id != '') {
				ztextureid = zmolddef.graphics.texture.id;
			}
		}
		if (zmolddef.graphics.texture.path != undefined) {
			if (zmolddef.graphics.texture.path != '') {
				ztexturepath = zmolddef.graphics.texture.path;
				ztexturepath = ztexturepath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
			}
		}

		var zmolddefframe = WTW.newMold();
		zmolddefframe.shape = 'roundedbox';
		zmolddefframe.covering = zmolddef.covering;
		zmolddefframe.position.x = 0;
		zmolddefframe.position.y = 0;
		zmolddefframe.position.z = 0;
		zmolddefframe.color = zmolddef.color;
		zmolddefframe.scaling.x = zlenx;
		zmolddefframe.scaling.y = zleny;
		zmolddefframe.scaling.z = zlenz;
		zmolddefframe.subdivisions = 12;
		zmolddefframe.graphics.texture.id = ztextureid;
		zmolddefframe.graphics.texture.path = ztexturepath;
		zmolddefframe.graphics.uscale = 10/zleny;
		zmolddefframe.graphics.vscale = 10/zlenz;
		zmolddefframe.parentname = zmoldname + '-base';
		zmolddefframe.checkcollisions = '1';
		var zimageframemold = WTW.addMoldRoundedBox(zmoldname + '-imageframe', zlenx, zleny, zlenz);
		zimageframemold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zimageframemold.position = new BABYLON.Vector3(0, 0, 0);
		zimageframemold.material = WTW.addCovering(zmolddef.covering, zmoldname + '-imageframe', zmolddefframe, zlenx, zleny, zlenz, '0', '0');
		zimageframemold.parent = zbasemold;	
		zimageframemold.renderingGroupId = 1;
		
		var zimagecutout = BABYLON.MeshBuilder.CreateBox(zmoldname + '-imagecutout', {}, scene);
		zimagecutout.scaling = new BABYLON.Vector3(1, zleny - 3, zlenz - .5);
		zimagecutout.position = new BABYLON.Vector3(-zlenx + .7, 0, 0);
		zimagecutout.parent = zbasemold;
		zimagecutout.renderingGroupId = 1;
		
		var zcsgmaterial = zimageframemold.material;
		var zcsgmain = BABYLON.CSG.FromMesh(zimageframemold);
		var zcsgsub = BABYLON.CSG.FromMesh(zimagecutout);
		var zcsgmerge;
		zcsgmerge = zcsgmain.subtract(zcsgsub);
		zimageframemold.dispose();
		zimagecutout.dispose();
		var znewmold = zcsgmerge.toMesh(zmoldname + '-imageframe', zcsgmaterial, scene);
		znewmold.parent = zbasemold;
		znewmold.renderingGroupId = 1;
		
		var ztitlemold = BABYLON.MeshBuilder.CreateBox(zmoldname + '-titleimage', {}, scene);
		ztitlemold.scaling = new BABYLON.Vector3(.2, 7, 1.4);
		ztitlemold.position = new BABYLON.Vector3(-zlenx/2 + .08, zleny/2 - .75, 0);
		ztitlemold.rotation.x = WTW.getRadians(-90);
		ztitlemold.parent = zbasemold;
		ztitlemold.renderingGroupId = 1;
		
		var zcoveringtitle1 = new BABYLON.StandardMaterial('mat' + zmoldname + '-titleimage1texture', scene);
		zcoveringtitle1.alpha = 1;
		zcoveringtitle1.specularColor = new BABYLON.Color3(.2, .2, .2);
		zcoveringtitle1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		zcoveringtitle1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
		var zcontenttexture1 = new BABYLON.DynamicTexture(zmoldname + '-titleimage1texture', {width: 512,height: 512}, scene, true);
		zcontenttexture1.name = zmoldname + '-titleimage1texture';
		/* zcontenttexture1.hasAlpha = true; */
		zcoveringtitle1.diffuseTexture = zcontenttexture1;
		zcoveringtitle1.diffuseTexture.vScale = .2;
		zcoveringtitle1.diffuseTexture.uScale = 1;
		zcoveringtitle1.diffuseTexture.vOffset = .78;
		ztitlemold.material = zcoveringtitle1;
		WTW.wrapText(ztitlemold, 'Categories', '85px', '80px', 'center', 'top', 'yellow', 0, 0);

		var ztitlemold2 = BABYLON.MeshBuilder.CreateBox(zmoldname + '-titleimage2', {}, scene);
		ztitlemold2.scaling = new BABYLON.Vector3(.2, 7, .6);
		ztitlemold2.position = new BABYLON.Vector3(-zlenx/2 + .08, -zleny/2 + .75, 0);
		ztitlemold2.rotation.x = WTW.getRadians(-90);
		ztitlemold2.parent = zbasemold;
		ztitlemold2.renderingGroupId = 1;
		
		var zcoveringtitle2 = new BABYLON.StandardMaterial('mat' + zmoldname + '-titleimage2texture', scene);
		zcoveringtitle2.alpha = 1;
		zcoveringtitle2.specularColor = new BABYLON.Color3(.2, .2, .2);
		zcoveringtitle2.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		zcoveringtitle2.diffuseColor = new BABYLON.Color3(.9, .9, .9);
		var zcontenttexture2 = new BABYLON.DynamicTexture(zmoldname + '-titleimage2texture', {width: 512,height: 512}, scene, true);
		zcontenttexture2.name = zmoldname + '-titleimage2texture';
		/* zcontenttexture2.hasAlpha = true; */
		zcoveringtitle2.diffuseTexture = zcontenttexture2;
		zcoveringtitle2.diffuseTexture.vScale = .10;
		zcoveringtitle2.diffuseTexture.uScale = 1;
		zcoveringtitle2.diffuseTexture.vOffset = .9;
		ztitlemold2.material = zcoveringtitle2;
		WTW.wrapText(ztitlemold2, 'Select to update Store Products', '35px', '30px', 'center', 'top', 'white', 0, 0);
		
		if (WTW.adminView == 1) {
			zimageframemold.isPickable = true;
			WTW.registerMouseOver(zimageframemold);
			ztitlemold.isPickable = true;
			WTW.registerMouseOver(ztitlemold);
			ztitlemold2.isPickable = true;
			WTW.registerMouseOver(ztitlemold2);
		}

		WTWShopping.productFetchCategories(zmoldname);
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStoreCategories=' + ex.message);
	}
	return zmold;
}

wtwshopping.prototype.addMoldProductSearch = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	/* not implemented yet */
	var zmold;
	try {
		zmold = new BABYLON.TransformNode(zmoldname);
		zmold.position = new BABYLON.Vector3(0,0,0);
		zmold.rotation = new BABYLON.Vector3(0,0,0);
		zmold.scaling = new BABYLON.Vector3(zlenx, zleny ,zlenz);

		var zbasemold = new BABYLON.TransformNode(zmoldname + '-base');
		zbasemold.position = new BABYLON.Vector3(0,0,0);
		zbasemold.rotation = new BABYLON.Vector3(0,0,0);
		zbasemold.scaling = new BABYLON.Vector3(1/zlenx, 1/zleny, 1/zlenz);
		zbasemold.parent = zmold;

		var zspecial1 = 0;
		var ztextureid = 't1qlqxd6pzubzzzy';
		var ztexturepath = '/content/system/stock/lightgray-512x512.jpg';
		var zimagepath = '';
		var zimagehoverpath = '';
		var zimageclickpath = '';
		/* zspecial1 derived from drop-down list on mold form (wtw-shopping plugin addition) */
		/* 	0 = rounded box 2-sides
			1 = rounded box 1 side
			2 = rounded no image - great with 3D Model products */
		if (zmolddef.scaling.special1 != undefined) {
			if (zmolddef.scaling.special1 != '') {
				if (WTW.isNumeric(zmolddef.scaling.special1)) {
					zspecial1 = Number(zmolddef.scaling.special1);
				}
			}
		}
		if (zmolddef.graphics.webimages[0] != null) {
			if (zmolddef.graphics.webimages[0].imagepath != undefined) {
				if (zmolddef.graphics.webimages[0].imagepath != '') {
					zimagepath = zmolddef.graphics.webimages[0].imagepath;
					zimagepath = zimagepath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
				}
			}
			if (zmolddef.graphics.webimages[0].imagehoverpath != undefined) {
				if (zmolddef.graphics.webimages[0].imagehoverpath != '') {
					zimagehoverpath = zmolddef.graphics.webimages[0].imagehoverpath;
					zimagehoverpath = zimagehoverpath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
				}
			}
			if (zmolddef.graphics.webimages[0].imageclickpath != undefined) {
				if (zmolddef.graphics.webimages[0].imageclickpath != '') {
					zimageclickpath = zmolddef.graphics.webimages[0].imageclickpath;
					zimageclickpath = zimageclickpath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
				}
			}
		}
		if (zmolddef.graphics.texture.id != undefined) {
			if (zmolddef.graphics.texture.id != '') {
				ztextureid = zmolddef.graphics.texture.id;
			}
		}
		if (zmolddef.graphics.texture.path != undefined) {
			if (zmolddef.graphics.texture.path != '') {
				ztexturepath = zmolddef.graphics.texture.path;
				ztexturepath = ztexturepath.replace(wtw_domainname, window.location.hostname).replace('http:','').replace('https:','');
			}
		}
		
		/* all displays are loaded 3D Models */
		var zfolder = '/content/plugins/wtw-shopping/assets/3dobjects/';
		var zfile = 'productsearch.babylon'; /* Default: Search Tablet */
		switch (zspecial1) {
			case 1: /* Search Tablet with Sign */
				zfile = 'productsearch3.babylon';
				break;
			case 2: /* Search Kiosk */
				zfile = 'productsearch2.babylon';
				break;
			case 3: /* Search Kiosk with Sign */
				zfile = 'productsearch4.babylon';
				break;
		}
		BABYLON.SceneLoader.ImportMeshAsync('', zfolder, zfile, scene).then(
			function (zresults) {
				if (zresults.meshes != null) {
					var zobjectanimations = [];
					
					/* add object animations using WTW.newObjectAnimation(); */
					zobjectanimations[0] = WTW.newObjectAnimation();
					zobjectanimations[0].animationname = 'searchOnLoad';
					zobjectanimations[0].moldevent = 'onload';
					zobjectanimations[0].moldnamepart = 'searchbutton';
					zobjectanimations[0].startframe = 19;
					zobjectanimations[0].endframe = 20;
					zobjectanimations[0].animationloop = false;
					zobjectanimations[0].speedratio = 1.00;
					zobjectanimations[0].additionalscript = '';
					zobjectanimations[0].additionalparameters = '';
					
					zobjectanimations[1] = WTW.newObjectAnimation();
					zobjectanimations[1].animationname = 'searchOnClick';
					zobjectanimations[1].moldevent = 'onclick';
					zobjectanimations[1].moldnamepart = 'searchbutton';
					zobjectanimations[1].startframe = 0;
					zobjectanimations[1].endframe = 19;
					zobjectanimations[1].animationloop = false;
					zobjectanimations[1].speedratio = .50;
					zobjectanimations[1].additionalscript = 'WTWShopping.searchProducts';
					zobjectanimations[1].additionalparameters = zmoldname + '-searchbutton';

					for (var i=0; i < zresults.meshes.length; i++) {
						if (zresults.meshes[i] != null) {
							var zmeshname = zresults.meshes[i].name.toLowerCase();
							var zchildmoldname = zmoldname + '-' + zmeshname;
							zresults.meshes[i].name = zchildmoldname;
							zresults.meshes[i].id = zchildmoldname;
							zresults.meshes[i].isPickable = true;
							zresults.meshes[i].renderingGroupId = 1;
							WTW.registerMouseOver(zresults.meshes[i]);
							if (zresults.meshes[i].parent == null) {
								zresults.meshes[i].parent = zmold;
							}
							if (zobjectanimations != null) {
								WTW.addMoldAnimation(zmoldname, zmeshname, zresults.meshes[i], zobjectanimations);
							}
							if (zmeshname == 'imageframe') {
								var zcovering = new BABYLON.StandardMaterial('mat' + zmoldname, scene);
								zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
								zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
								zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
								zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);
								zresults.meshes[i].material = zcovering;
							}
						}
					}
					/* check to see if the mold still exists since the time it was requested */
					zmold = WTW.getMeshOrNodeByID(zmoldname);
					if (zmold != null) {
						zmold.isPickable = false;
					} else {
						WTW.disposeClean(zmoldname);
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldProductSearch=' + ex.message);
	}
	return zmold;
}

wtwshopping.prototype.setNewMold = function(zmoldname, zmolds, zmoldind, zrebuildmold) {
	try {
		if (zmolds[zmoldind] != null) {
			switch(zmolds[zmoldind].shape) {
				case 'storesign':
				case 'store3dsign':
					var zwebname = '';
					var zopacity = 100;
					if (zmolds[zmoldind].webtext.webtext != undefined) {
						if (zmolds[zmoldind].webtext.webtext != '') {
							zwebname = WTW.decode(zmolds[zmoldind].webtext.webtext);
						}
					}
					if (zwebname == '') {
						var zstoreinfo = WTWShopping.getStoreID(communityid, buildingid, thingid);
						try {
							if (zstoreinfo.storename != '') {
								zwebname = WTW.decode(zstoreinfo.storename);
							}
						} catch(ex) {
						}
					}
					if (zwebname == '') {
						var zfoundname = WTW.getNameFromConnectingGrid(zmolds[zmoldind].communityinfo.communityid);
						if (zfoundname != '') {
							zwebname = zfoundname;
						}
					}
					if (zwebname == '') {
						zwebname = 'My 3D Store';
					}
					if (dGet('wtw_tmoldwebtext').value != zwebname) {
						zmolds[zmoldind].webtext.webtext = WTW.encode(dGet('wtw_tmoldwebtext').value);
						zrebuildmold = 1;
					}
					if (zmolds[zmoldind].shape == 'store3dsign') {
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
					} else {
						var zresponse = [];
						zresponse[0] = {
							'storename':zwebname
						};
						WTWShopping.setStoreInfo(zmoldname, zresponse);
					}

					break;
				case 'storeaddtocart':
				case 'storebuynow':
				case 'storecheckout':
				case 'storereadmore':
				case 'storeviewcart':
					
					break;
			}
		}
	} catch (ex) {
		WTW.log('plugins:wtw-shopping:scripts-wtwshoppingmolds.js-setNewMold=' + ex.message);
	}
	return zrebuildmold;
}



wtwshopping.prototype.setMoldFormFields = function(zshape) {
	try {
		var zshapevalue = zshape.toLowerCase();
		while (zshapevalue.indexOf(" ") > -1) {
			zshapevalue = zshapevalue.replace(" ","");
		}
		switch (zshapevalue) {
			case "storeproduct":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Frame Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Product";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Product";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Product";
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_alttagdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle'); 
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_productdiv');
				dGet('wtw_tallowsearch').checked = true;
				break;

			case "storeaddtocart":
			case "storebuynow":
			case "storereadmore":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Frame Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Button";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Button";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Button";
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_alttagdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle'); 
				WTW.show('wtw_moldtexturepreview');
				WTW.show('wtw_productdiv');
				dGet('wtw_tallowsearch').checked = true;
				break;
			case "storecheckout":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Frame Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Button";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Button";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Button";
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_alttagdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle'); 
				WTW.show('wtw_moldtexturepreview');
				dGet('wtw_tallowsearch').checked = true;
				break;

			case "storesign":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Frame Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Sign";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Sign";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Sign";
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_alttagdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle'); 
				WTW.show('wtw_moldtexturepreview');
				dGet('wtw_tallowsearch').checked = true;
				break;
			case "store3dsign":
				dGet('wtw_moldpositiontitle').innerHTML = "3D Text Position";
				dGet('wtw_moldscalingtitle').innerHTML = "3D Text Length";
				dGet('wtw_moldrotationtitle').innerHTML = "3D Text Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "3D Text Texture Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave 3D Sign";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete 3D Sign";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit 3D Sign";
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
				WTW.hide('wtw_moldcolorsdiv');
				WTW.show('wtw_moldwebtextdiv');
				break;
			case "storeviewcart":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Frame Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Cart Button";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Cart Button";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Cart Button";
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_alttagdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle'); 
				WTW.show('wtw_moldtexturepreview');
				dGet('wtw_tallowsearch').checked = true;
				break;
			case "storecategories":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Frame Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Categories";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Categories";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Categories";
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_alttagdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle'); 
				WTW.show('wtw_moldtexturepreview');
				dGet('wtw_tallowsearch').checked = true;
				break;
			case "storesearch":
				dGet('wtw_moldpositiontitle').innerHTML = "Position";
				dGet('wtw_moldscalingtitle').innerHTML = "Length";
				dGet('wtw_moldrotationtitle').innerHTML = "Rotation";
				dGet('wtw_moldtexturetitle').innerHTML = "Frame Image";
				dGet('wtw_bsavethismold').innerHTML = "<u>S</u>ave Search";
				dGet('wtw_bdelmold').innerHTML = "<u>D</u>elete Search";
				dGet('wtw_editmoldformtitle').innerHTML = "Edit Search";
				WTW.hide('wtw_moldaddimagediv');
				WTW.hide('wtw_moldspecial1');
				WTW.hide('wtw_moldspecial2');
				WTW.hide('wtw_moldsubdivisions');
				WTW.hide('wtw_alttagdiv');
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
				WTW.show('wtw_moldcolorsdiv');
				WTW.show('wtw_moldtexturetitle'); 
				WTW.show('wtw_moldtexturepreview');
				dGet('wtw_tallowsearch').checked = true;
				break;
			default:
				WTW.hide('wtw_productdiv');
				WTW.hide('wtw_productthingdiv');
				break;
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingmolds.js-setMoldFormFields=" + ex.message);
	}
}

wtwshopping.prototype.setNewMoldDefaults = function(zshape) {
	try {
		var zcoords = WTW.getNewCoordinates(50);
		var zpositionX = zcoords.positionX;
		var zpositionY = zcoords.positionY;
		var zpositionZ = zcoords.positionZ;
		var zrotationY = zcoords.rotationY;
		var zshapevalue = zshape.toLowerCase();
		var zimagepath = "/content/system/stock/stucco-512x512.jpg";
		while (zshapevalue.indexOf(" ") > -1) {
			zshapevalue = zshapevalue.replace(" ","");
		}
		if (thingid != '') {
			zpositionX = 0;
			zpositionZ = 0;
		}
		switch (zshapevalue) {
			case "storeproduct":
				dGet('wtw_tmoldpositionx').value = zpositionX;
				dGet('wtw_tmoldpositiony').value = zpositionY;
				dGet('wtw_tmoldpositionz').value = zpositionZ;
				dGet('wtw_tmoldscalingx').value = "5.00";
				dGet('wtw_tmoldscalingy').value = "5.00";
				dGet('wtw_tmoldscalingz').value = "5.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = zrotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;

			case "storeaddtocart":
			case "storebuynow":
			case "storecheckout":
			case "storereadmore":
				zrotationY = WTW.cleanDegrees(Number(zrotationY) + 180);
				dGet('wtw_tmoldpositionx').value = zpositionX;
				dGet('wtw_tmoldpositiony').value = Number(zpositionY) + 7;
				dGet('wtw_tmoldpositionz').value = zpositionZ;
				dGet('wtw_tmoldscalingx').value = "4.84";
				dGet('wtw_tmoldscalingy').value = "1.98";
				dGet('wtw_tmoldscalingz').value = "0.60";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = zrotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;

			case "storesign":
				dGet('wtw_tmoldpositionx').value = zpositionX;
				dGet('wtw_tmoldpositiony').value = zpositionY;
				dGet('wtw_tmoldpositionz').value = zpositionZ;
				dGet('wtw_tmoldscalingx').value = "3.00";
				dGet('wtw_tmoldscalingy').value = "10.00";
				dGet('wtw_tmoldscalingz').value = "30.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = zrotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;			
			case "store3dsign":
				dGet('wtw_tmoldpositionx').value = zpositionX;
				dGet('wtw_tmoldpositiony').value = zpositionY-4;
				dGet('wtw_tmoldpositionz').value = zpositionZ;
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "1.00";
				dGet('wtw_tmoldscalingz').value = "1.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = zrotationY + 90;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldwebtext').value = "Text";
				dGet('wtw_tmoldwebtextheight').value = "6.00";
				dGet('wtw_tmoldwebtextthick').value = "1.00";
				WTW.setDDLValue('wtw_tmoldwebtextalign', "center");
				dGet('wtw_tmoldwebtextcolor').value = "#ff0000";
				dGet('wtw_tmoldwebtextspecular').value = "#000000";
				dGet('wtw_tmoldwebtextdiffuse').value = "#f0f0f0";
				dGet('wtw_tmoldwebtextambient').value = "#808080";
				dGet('wtw_tmoldsubdivisions').value = "12";
				dGet('wtw_tmoldcoveringold').value = "none";
				dGet('wtw_tmoldtextureid').value = '';
				dGet('wtw_tmoldtexturepath').value = zimagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case "storeviewcart":
				dGet('wtw_tmoldpositionx').value = zpositionX;
				dGet('wtw_tmoldpositiony').value = zpositionY;
				dGet('wtw_tmoldpositionz').value = zpositionZ;
				dGet('wtw_tmoldscalingx').value = "0.25";
				dGet('wtw_tmoldscalingy').value = "1.00";
				dGet('wtw_tmoldscalingz').value = "5.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = zrotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;			
			case "storecategories":
				dGet('wtw_tmoldpositionx').value = zpositionX;
				dGet('wtw_tmoldpositiony').value = zpositionY;
				dGet('wtw_tmoldpositionz').value = zpositionZ;
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "14.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = zrotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;			
			case "storesearch":
				dGet('wtw_tmoldpositionx').value = zpositionX;
				dGet('wtw_tmoldpositiony').value = zpositionY;
				dGet('wtw_tmoldpositionz').value = zpositionZ;
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "14.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = zrotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;			
		}
		WTW.setDDLValue("wtw_tmoldspecial1set", Number(dGet('wtw_tmoldspecial1').value));
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingmolds.js-setNewMoldDefaults=" + ex.message);
	}
}

wtwshopping.prototype.addMoldStoreButton = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = BABYLON.MeshBuilder.CreateBox(zmoldname, {}, scene);
		zmold.scaling = new BABYLON.Vector3(zlenx,zleny,zlenz);
		zmold.material = new BABYLON.StandardMaterial("mat" + zmoldname, scene);
		zmold.material.alpha = 0;
		var zbasemold = BABYLON.MeshBuilder.CreateBox(zmoldname + "-base", {}, scene);
		zbasemold.scaling = new BABYLON.Vector3(1/zlenx,1/zleny,1/zlenz);
		zbasemold.material = new BABYLON.StandardMaterial("matbase" + zmoldname, scene);
		zbasemold.material.alpha = 0;
		zbasemold.parent = zmold;
		var zshape = 'storereadmore';
		var zfolder = '/content/plugins/wtw-shopping/assets/3dobjects/';
		var zfile = 'button-readmore.babylon';

		if (zmolddef.shape != undefined) {
			zshape = zmolddef.shape;
		}
		switch (zshape) {
			case "storeaddtocart":
				zfile = 'button-addtocart.babylon';
				break;
			case "storebuynow":
				zfile = 'button-buynow.babylon';
				break;
			case "storecheckout":
				zfile = 'button-checkout.babylon';
				break;
			case "storereadmore":
				zfile = 'button-readmore.babylon';
				break;
			case "storeviewcart":
				zfile = 'button-viewcart.babylon';
				break;
		}
		
		BABYLON.SceneLoader.ImportMeshAsync("", zfolder, zfile, scene).then(
			function (results) {
				if (results.meshes != null) {
					/* animate the button and add JS function to execute when pressed */
					var zobjectanimations = [];
					switch (zshape) {
						case "storeaddtocart":
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
							zobjectanimations[1].additionalparameters = zmoldname + "-button";
							break;
						case "storebuynow":
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
							zobjectanimations[1].additionalparameters = zmoldname + "-button";
							break;
						case "storecheckout":
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
							zobjectanimations[1].additionalparameters = zmoldname + "-button";
							break;
						case "storereadmore":
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
							zobjectanimations[1].additionalparameters = zmoldname + "-button";
							break;
						case "storeviewcart":
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
							zobjectanimations[1].additionalparameters = zmoldname + "-button";
							break;
					}

					for (var i=0; i < results.meshes.length; i++) {
						if (results.meshes[i] != null) {
							var zmeshname = results.meshes[i].name.toLowerCase();
							var zchildmoldname = zmoldname + "-" + zmeshname;
							results.meshes[i].name = zchildmoldname;
							results.meshes[i].id = zchildmoldname;
							results.meshes[i].isPickable = true;
							WTW.registerMouseOver(results.meshes[i]);
							if (results.meshes[i].parent == null) {
								results.meshes[i].parent = zbasemold;
							}
							if (zobjectanimations != null) {
								WTW.addMoldAnimation(zmoldname, zmeshname, results.meshes[i], zobjectanimations);
							}
						}
					}
					/* check to see if the mold still exists since the time it was requested */
					zmold = scene.getMeshByID(zmoldname);
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
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStoreButton=" + ex.message);
	}
	return zmold;
}

wtwshopping.prototype.addMoldStoreProduct = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = BABYLON.MeshBuilder.CreateBox(zmoldname, {}, scene);
		zmold.scaling = new BABYLON.Vector3(zlenx,zleny,zlenz);
		zmold.material = new BABYLON.StandardMaterial("mat" + zmoldname, scene);
		zmold.material.alpha = 0;
		var zbasemold = BABYLON.MeshBuilder.CreateBox(zmoldname + "-base", {}, scene);
		zbasemold.scaling = new BABYLON.Vector3(1/zlenx,1/zleny,1/zlenz);
		zbasemold.material = new BABYLON.StandardMaterial("matbase" + zmoldname, scene);
		zbasemold.material.alpha = 0;
		zbasemold.parent = zmold;
		
		var zspecial1 = 0;
		var ztextureid = "t1qlqxd6pzubzzzy";
		var ztexturepath = "/content/system/stock/lightgray-512x512.jpg";
		var zimagepath = "";
		var zimagehoverpath = "";
		var zimageclickpath = "";
		/* zspecial1 derived from drop-down list on mold form (wtw-shopping plugin addition) */
		/* 	0 = rounded box 2-sides
			1 = rounded box 1 side
			2 = rounded no image
			3 = retro box 2-sides
			4 = box */
		if (zmolddef.scaling.special1 != undefined) {
			if (zmolddef.scaling.special1 != "") {
				if (WTW.isNumeric(zmolddef.scaling.special1)) {
					zspecial1 = Number(zmolddef.scaling.special1);
				}
			}
		}
		if (zmolddef.graphics.webimages[0] != null) {
			if (zmolddef.graphics.webimages[0].imagepath != undefined) {
				if (zmolddef.graphics.webimages[0].imagepath != "") {
					zimagepath = zmolddef.graphics.webimages[0].imagepath;
					zimagepath = zimagepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
				}
			}
			if (zmolddef.graphics.webimages[0].imagehoverpath != undefined) {
				if (zmolddef.graphics.webimages[0].imagehoverpath != "") {
					zimagehoverpath = zmolddef.graphics.webimages[0].imagehoverpath;
					zimagehoverpath = zimagehoverpath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
				}
			}
			if (zmolddef.graphics.webimages[0].imageclickpath != undefined) {
				if (zmolddef.graphics.webimages[0].imageclickpath != "") {
					zimageclickpath = zmolddef.graphics.webimages[0].imageclickpath;
					zimageclickpath = zimageclickpath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
				}
			}
		}
		if (zmolddef.graphics.texture.id != undefined) {
			if (zmolddef.graphics.texture.id != "") {
				ztextureid = zmolddef.graphics.texture.id;
			}
		}
		if (zmolddef.graphics.texture.path != undefined) {
			if (zmolddef.graphics.texture.path != "") {
				ztexturepath = zmolddef.graphics.texture.path;
				ztexturepath = ztexturepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
			}
		}
		
		if (zspecial1 == 4) { /* box display */
			var zmolddefclickimage = WTW.newMold();
			zmolddefclickimage.shape = "plane";
			zmolddefclickimage.covering = "2d texture";
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
			zmolddefclickimage.parentname = zmoldname + "-base";
			zmolddefclickimage.checkcollisions = "1";
			var zclickimagemold = BABYLON.MeshBuilder.CreatePlane(zmoldname + "-clickimage", {updatable: true, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
			zclickimagemold.scaling = new BABYLON.Vector3(zlenz-.2, zleny * .8, .1);
			zclickimagemold.rotation.y = WTW.getRadians(90);
			zclickimagemold.position.x = -(zlenx * 1.1)/2;
			zclickimagemold.parent = zbasemold;

			var zmolddefclickimage2 = WTW.newMold();
			zmolddefclickimage2.shape = "plane";
			zmolddefclickimage2.covering = "2d texture";
			zmolddefclickimage2.position.x = (zlenx * 1.1)/2;
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
			zmolddefclickimage2.parentname = zmoldname + "-base";
			zmolddefclickimage2.checkcollisions = "1";
			var zclickimagemold2 = BABYLON.MeshBuilder.CreatePlane(zmoldname + "-clickimage2", {updatable: true, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
			zclickimagemold2.scaling = new BABYLON.Vector3(zlenz-.2, zleny * .8, .1);
			zclickimagemold2.rotation.y = WTW.getRadians(-90);
			zclickimagemold2.position.x = (zlenx * 1.1)/2;
			zclickimagemold2.parent = zbasemold;

			var zmolddefframe = WTW.newMold();
			zmolddefframe.shape = "box";
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
			zmolddefframe.parentname = zmoldname + "-base";
			zmolddefframe.checkcollisions = "1";
			var zimageframemold = BABYLON.MeshBuilder.CreateBox(zmoldname + "-imageframe", {}, scene);
			zimageframemold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
			zimageframemold.position = new BABYLON.Vector3(0, 0, 0);
			zimageframemold.material = WTW.addCovering(zmolddef.covering, zmoldname + "-imageframe", zmolddefframe, zlenx, zleny, zlenz, '0', '0');
			zimageframemold.parent = zbasemold;	

			var ztitlemold = BABYLON.MeshBuilder.CreateBox(zmoldname + "-titleimage", {}, scene);
			ztitlemold.scaling = new BABYLON.Vector3(zlenx * .1, zlenz * .99,zleny * .99);
			ztitlemold.position = new BABYLON.Vector3(zlenx * .479, 0, 0);
			ztitlemold.rotation.x = WTW.getRadians(90);
			ztitlemold.parent = zbasemold;

			var ztitlemold2 = BABYLON.MeshBuilder.CreateBox(zmoldname + "-titleimage2", {}, scene);
			ztitlemold2.scaling = new BABYLON.Vector3(zlenx * .1, zlenz * .99,zleny * .99);
			ztitlemold2.position = new BABYLON.Vector3(-zlenx * .479, 0, 0);
			ztitlemold2.rotation.x = WTW.getRadians(-90);
			ztitlemold2.parent = zbasemold;

			var zaddtocart1 = BABYLON.MeshBuilder.CreateBox(zmoldname + "-addtocart1", {}, scene);
			zaddtocart1.scaling = new BABYLON.Vector3(zlenx * .1, zlenz * .37,zleny * .099);
			zaddtocart1.position = new BABYLON.Vector3(zlenx * .5, -zleny * .45, zlenz * .25);
			zaddtocart1.rotation.x = WTW.getRadians(90);
			zaddtocart1.parent = zbasemold;

			var zcoveringcart1 = new BABYLON.StandardMaterial("mat" + zmoldname + "-cartimage1texture", scene);
			zcoveringcart1.alpha = 1;
			zcoveringcart1.specularColor = new BABYLON.Color3(.2, .2, .2);
			zcoveringcart1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
			zcoveringcart1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
			var zcontenttexture1 = new BABYLON.DynamicTexture(zmoldname + "-cartimage1texture", {width: 512,height: 512}, scene, true);
			zcontenttexture1.name = zmoldname + "-cartimage1texture";
			//contentTexture.hasAlpha = true;
			zcoveringcart1.diffuseTexture = zcontenttexture1;
			zcoveringcart1.diffuseTexture.vScale = .2;
			zcoveringcart1.diffuseTexture.uScale = 1;
			zcoveringcart1.diffuseTexture.vOffset = .85;
			zaddtocart1.material = zcoveringcart1;
			WTW.wrapText(zaddtocart1, "Add to Cart", "60px", "70px", "center", "top", "green", 0, 0);
			WTW.registerMouseOver(zaddtocart1);

			var zaddtocart1hover = BABYLON.MeshBuilder.CreateBox(zmoldname + "-addtocart1hover", {}, scene);
			zaddtocart1hover.scaling = new BABYLON.Vector3(zlenx * .1, zlenz * .37, zleny * .099);
			zaddtocart1hover.position = new BABYLON.Vector3(zlenx * .49, -zleny * .45, zlenz * .25);
			zaddtocart1hover.rotation.x = WTW.getRadians(90);
			zaddtocart1hover.parent = zbasemold;

			var zcoveringcart1hover = new BABYLON.StandardMaterial("mat" + zmoldname + "-cartimage1texturehover", scene);
			zcoveringcart1hover.alpha = 1;
			zcoveringcart1hover.specularColor = new BABYLON.Color3(.2, .2, .2);
			zcoveringcart1hover.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
			zcoveringcart1hover.diffuseColor = new BABYLON.Color3(.9, .9, .9);
			var zcontenttexture1hover = new BABYLON.DynamicTexture(zmoldname + "-cartimage1texturehover", {width: 512,height: 512}, scene, true);
			zcontenttexture1hover.name = zmoldname + "-cartimage1texturehover";
			zcontenttexture1hover.hasAlpha = true;
			zcoveringcart1hover.diffuseTexture = zcontenttexture1hover;
			zcoveringcart1hover.diffuseTexture.vScale = .2;
			zcoveringcart1hover.diffuseTexture.uScale = 1;
			zcoveringcart1hover.diffuseTexture.vOffset = .85;
			zaddtocart1hover.material = zcoveringcart1hover;
			WTW.wrapText(zaddtocart1hover, "Add to Cart", "60px", "70px", "center", "top", "yellow", 0, 0);			

			var zaddtocart2 = BABYLON.MeshBuilder.CreateBox(zmoldname + "-addtocart2", {}, scene);
			zaddtocart2.scaling = new BABYLON.Vector3(zlenx * .1, zlenz * .37, zleny * .099);
			zaddtocart2.position = new BABYLON.Vector3(-zlenx * .5, -zleny * .45, -zlenz * .25);
			zaddtocart2.rotation.x = WTW.getRadians(-90);
			zaddtocart2.parent = zbasemold;

			var zcoveringcart2 = new BABYLON.StandardMaterial("mat" + zmoldname + "-cartimage2texture", scene);
			zcoveringcart2.alpha = 1;
			zcoveringcart2.specularColor = new BABYLON.Color3(.2, .2, .2);
			zcoveringcart2.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
			zcoveringcart2.diffuseColor = new BABYLON.Color3(.9, .9, .9);
			var zcontenttexture2 = new BABYLON.DynamicTexture(zmoldname + "-cartimage2texture", {width: 512,height: 512}, scene, true);
			zcontenttexture2.name = zmoldname + "-cartimage2texture";
			//zcontenttexture2.hasAlpha = true;
			zcoveringcart2.diffuseTexture = zcontenttexture2;
			zcoveringcart2.diffuseTexture.vScale = .2;
			zcoveringcart2.diffuseTexture.uScale = 1;
			zcoveringcart2.diffuseTexture.vOffset = .85;
			zaddtocart2.material = zcoveringcart2;
			WTW.wrapText(zaddtocart2, "Add to Cart", "60px", "70px", "center", "top", "green", 0, 0);
			WTW.registerMouseOver(zaddtocart2);

			var zaddtocart2hover = BABYLON.MeshBuilder.CreateBox(zmoldname + "-addtocart2hover", {}, scene);
			zaddtocart2hover.scaling = new BABYLON.Vector3(zlenx * .1, zlenz * .37, zleny * .099);
			zaddtocart2hover.position = new BABYLON.Vector3(-zlenx * .49, -zleny * .45, -zlenz * .25);
			zaddtocart2hover.rotation.x = WTW.getRadians(-90);
			zaddtocart2hover.parent = zbasemold;

			var zcoveringcart2hover = new BABYLON.StandardMaterial("mat" + zmoldname + "-cartimage2texturehover", scene);
			zcoveringcart2hover.alpha = 1;
			zcoveringcart2hover.specularColor = new BABYLON.Color3(.2, .2, .2);
			zcoveringcart2hover.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
			zcoveringcart2hover.diffuseColor = new BABYLON.Color3(.9, .9, .9);
			var zcontenttexture2hover = new BABYLON.DynamicTexture(zmoldname + "-cartimage2texturehover", {width: 512,height: 512}, scene, true);
			zcontenttexture2hover.name = zmoldname + "-cartimage2texturehover";
			zcontenttexture2hover.hasAlpha = true;
			zcoveringcart2hover.diffuseTexture = zcontenttexture2hover;
			zcoveringcart2hover.diffuseTexture.vScale = .2;
			zcoveringcart2hover.diffuseTexture.uScale = 1;
			zcoveringcart2hover.diffuseTexture.vOffset = .85;
			zaddtocart2hover.material = zcoveringcart2hover;
			WTW.wrapText(zaddtocart2hover, "Add to Cart", "60px", "70px", "center", "top", "yellow", 0, 0);		

			var zreadmore1 = BABYLON.MeshBuilder.CreateBox(zmoldname + "-readmore1", {}, scene);
			zreadmore1.scaling = new BABYLON.Vector3(zlenx * .1, zlenz * .37, zleny * .099);
			zreadmore1.position = new BABYLON.Vector3(zlenx * .5, -zleny * .45, -zlenz * .25);
			zreadmore1.rotation.x = WTW.getRadians(90);
			zreadmore1.parent = zbasemold;

			var zcoveringread1 = new BABYLON.StandardMaterial("mat" + zmoldname + "-readimage1texture", scene);
			zcoveringread1.alpha = .7;
			zcoveringread1.specularColor = new BABYLON.Color3(.2, .2, .2);
			zcoveringread1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
			zcoveringread1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
			var zreadtexture1 = new BABYLON.DynamicTexture(zmoldname + "-readimage1texture", {width: 512,height: 512}, scene, true);
			zreadtexture1.name = zmoldname + "-readimage1texture";
			//zreadtexture1.hasAlpha = true;
			zcoveringread1.diffuseTexture = zreadtexture1;
			zcoveringread1.diffuseTexture.vScale = .2;
			zcoveringread1.diffuseTexture.uScale = 1;
			zcoveringread1.diffuseTexture.vOffset = .85;
			zreadmore1.material = zcoveringread1;
			WTW.wrapText(zreadmore1, "Read More...", "60px", "70px", "center", "top", "white", 0, 0);
			WTW.registerMouseOver(zreadmore1);

			var zreadmore1hover = BABYLON.MeshBuilder.CreateBox(zmoldname + "-readmore1hover", {}, scene);
			zreadmore1hover.scaling = new BABYLON.Vector3(zlenx * .1, zlenz * .37, zleny * .099);
			zreadmore1hover.position = new BABYLON.Vector3(zlenx * .49, -zleny * .45, -zlenz * .25);
			zreadmore1hover.rotation.x = WTW.getRadians(90);
			zreadmore1hover.parent = zbasemold;

			var zcoveringread1hover = new BABYLON.StandardMaterial("mat" + zmoldname + "-readimage1texturehover", scene);
			zcoveringread1hover.alpha = 1;
			zcoveringread1hover.specularColor = new BABYLON.Color3(.2, .2, .2);
			zcoveringread1hover.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
			zcoveringread1hover.diffuseColor = new BABYLON.Color3(.9, .9, .9);
			var zreadtexture1hover = new BABYLON.DynamicTexture(zmoldname + "-readimage1texturehover", {width: 512,height: 512}, scene, true);
			zreadtexture1hover.name = zmoldname + "-readimage1texturehover";
			zreadtexture1hover.hasAlpha = true;
			zcoveringread1hover.diffuseTexture = zreadtexture1hover;
			zcoveringread1hover.diffuseTexture.vScale = .2;
			zcoveringread1hover.diffuseTexture.uScale = 1;
			zcoveringread1hover.diffuseTexture.vOffset = .85;
			zreadmore1hover.material = zcoveringread1hover;
			WTW.wrapText(zreadmore1hover, "Read More...", "60px", "70px", "center", "top", "yellow", 0, 0);

			var zreadmore2 = BABYLON.MeshBuilder.CreateBox(zmoldname + "-readmore2", {}, scene);
			zreadmore2.scaling = new BABYLON.Vector3(zlenx * .1, zlenz * .37, zleny * .099);
			zreadmore2.position = new BABYLON.Vector3(-zlenx * .5, -zleny * .45, zlenz * .25);
			zreadmore2.rotation.x = WTW.getRadians(-90);
			zreadmore2.parent = zbasemold;

			var zcoveringread2 = new BABYLON.StandardMaterial("mat" + zmoldname + "-readimage2texture", scene);
			zcoveringread2.alpha = .7;
			zcoveringread2.specularColor = new BABYLON.Color3(.2, .2, .2);
			zcoveringread2.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
			zcoveringread2.diffuseColor = new BABYLON.Color3(.9, .9, .9);
			var zreadtexture2 = new BABYLON.DynamicTexture(zmoldname + "-readimage2texture", {width: 512,height: 512}, scene, true);
			zreadtexture2.name = zmoldname + "-readimage2texture";
			//zreadtexture2.hasAlpha = true;
			zcoveringread2.diffuseTexture = zreadtexture2;
			zcoveringread2.diffuseTexture.vScale = .2;
			zcoveringread2.diffuseTexture.uScale = 1;
			zcoveringread2.diffuseTexture.vOffset = .85;
			zreadmore2.material = zcoveringread2;
			WTW.wrapText(zreadmore2, "Read More...", "60px", "70px", "center", "top", "white", 0, 0);
			WTW.registerMouseOver(zreadmore2);

			var zreadmore2hover = BABYLON.MeshBuilder.CreateBox(zmoldname + "-readmore2hover", {}, scene);
			zreadmore2hover.scaling = new BABYLON.Vector3(zlenx * .1, zlenz * .37, zleny * .099);
			zreadmore2hover.position = new BABYLON.Vector3(-zlenx * .49, -zleny * .45, zlenz * .25);
			zreadmore2hover.rotation.x = WTW.getRadians(-90);
			zreadmore2hover.parent = zbasemold;

			var zcoveringread2hover = new BABYLON.StandardMaterial("mat" + zmoldname + "-readimage2texturehover", scene);
			zcoveringread2hover.alpha = 1;
			zcoveringread2hover.specularColor = new BABYLON.Color3(.2, .2, .2);
			zcoveringread2hover.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
			zcoveringread2hover.diffuseColor = new BABYLON.Color3(.9, .9, .9);
			var zreadtexture2hover = new BABYLON.DynamicTexture(zmoldname + "-readimage2texturehover", {width: 512,height: 512}, scene, true);
			zreadtexture2hover.name = zmoldname + "-readimage2texturehover";
			zreadtexture2hover.hasAlpha = true;
			zcoveringread2hover.diffuseTexture = zreadtexture2hover;
			zcoveringread2hover.diffuseTexture.vScale = .2;
			zcoveringread2hover.diffuseTexture.uScale = 1;
			zcoveringread2hover.diffuseTexture.vOffset = .85;
			zreadmore2hover.material = zcoveringread2hover;
			WTW.wrapText(zreadmore2hover, "Read More...", "60px", "70px", "center", "top", "yellow", 0, 0);
			
			var zdescimage1 = BABYLON.MeshBuilder.CreateBox(zmoldname + "-descimage1", {}, scene);
			zdescimage1.scaling = new BABYLON.Vector3(zlenx * .15, zlenz * .89, zleny * .75);
			zdescimage1.position = new BABYLON.Vector3(zlenx * .481, 0, 0);
			zdescimage1.rotation.x = WTW.getRadians(90);
			zdescimage1.parent = zbasemold;
			WTW.registerMouseOver(zdescimage1);

			var zdescimage2 = BABYLON.MeshBuilder.CreateBox(zmoldname + "-descimage2", {}, scene);
			zdescimage2.scaling = new BABYLON.Vector3(zlenx * .15, zlenz * .89, zleny * .75);
			zdescimage2.position = new BABYLON.Vector3(-zlenx * .481, 0, 0);
			zdescimage2.rotation.x = WTW.getRadians(-90);
			zdescimage2.parent = zbasemold;
			WTW.registerMouseOver(zdescimage2);

		} else { /* all other displays are loaded 3D Models */
			var zfolder = '/content/plugins/wtw-shopping/assets/3dobjects/';
			var zfile = '';
			switch (zspecial1) {
				case 1: /* rounded box (1 Side) */
					zfile = 'productdisplay1side.babylon';
					break;
				case 2: /* rounded box no image (2 Sided) */
					zfile = 'productnodisplay.babylon';
					break;
				case 3: /* retro box (2 Sided) */
					zfile = 'productdisplay.babylon';
					break;
				default: /* 0 = rounded box (2 Sided) */
					zfile = 'productdisplay2side.babylon';
					break;
			}
			BABYLON.SceneLoader.ImportMeshAsync("", zfolder, zfile, scene).then(
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
							case 3:
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
							case 3:
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
						zobjectanimations[1].additionalparameters = zmoldname + "-readmore1";

						zobjectanimations[2] = WTW.newObjectAnimation();
						zobjectanimations[2].animationname = 'readMore1OnClick';
						zobjectanimations[2].moldevent = 'onclick';
						zobjectanimations[2].moldnamepart = 'readmoretext1';
						switch (zdisplaytype) {
							case 2:
							case 3:
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
						zobjectanimations[2].additionalparameters = zmoldname + "-readmore1";

						zobjectanimations[3] = WTW.newObjectAnimation();
						zobjectanimations[3].animationname = 'AddToCart1OnLoad';
						zobjectanimations[3].moldevent = 'onload';
						zobjectanimations[3].moldnamepart = 'addtocart1';
						switch (zdisplaytype) {
							case 2:
							case 3:
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
							case 3:
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
						zobjectanimations[4].additionalparameters = zmoldname + "-addtocart1";
						
						zobjectanimations[5] = WTW.newObjectAnimation();
						zobjectanimations[5].animationname = 'addToCart1OnClick';
						zobjectanimations[5].moldevent = 'onclick';
						zobjectanimations[5].moldnamepart = 'addtocarttext1';
						switch (zdisplaytype) {
							case 2:
							case 3:
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
						zobjectanimations[5].additionalparameters = zmoldname + "-addtocart1";
						
						if (zspecial1 != 1) {
							zobjectanimations[6] = WTW.newObjectAnimation();
							zobjectanimations[6].animationname = 'readme2OnLoad';
							zobjectanimations[6].moldevent = 'onload';
							zobjectanimations[6].moldnamepart = 'readmore2';
							switch (zdisplaytype) {
								case 2:
								case 3:
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
								case 3:
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
							zobjectanimations[7].additionalparameters = zmoldname + "-readmore2";
							
							zobjectanimations[8] = WTW.newObjectAnimation();
							zobjectanimations[8].animationname = 'readMore2OnClick';
							zobjectanimations[8].moldevent = 'onclick';
							zobjectanimations[8].moldnamepart = 'readmoretext2';
							switch (zdisplaytype) {
								case 2:
								case 3:
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
							zobjectanimations[8].additionalparameters = zmoldname + "-readmore2";
							
							zobjectanimations[9] = WTW.newObjectAnimation();
							zobjectanimations[9].animationname = 'AddToCart2OnLoad';
							zobjectanimations[9].moldevent = 'onload';
							zobjectanimations[9].moldnamepart = 'addtocart2';
							switch (zdisplaytype) {
								case 2:
								case 3:
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
								case 3:
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
							zobjectanimations[10].additionalparameters = zmoldname + "-addtocart2";

							zobjectanimations[11] = WTW.newObjectAnimation();
							zobjectanimations[11].animationname = 'addToCart2OnClick';
							zobjectanimations[11].moldevent = 'onclick';
							zobjectanimations[11].moldnamepart = 'addtocarttext2';
							switch (zdisplaytype) {
								case 2:
								case 3:
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
							zobjectanimations[11].additionalparameters = zmoldname + "-addtocart2";						
						}

						for (var i=0; i < zresults.meshes.length; i++) {
							if (zresults.meshes[i] != null) {
								var zmeshname = zresults.meshes[i].name.toLowerCase();
								var zchildmoldname = zmoldname + "-" + zmeshname;
								zresults.meshes[i].name = zchildmoldname;
								zresults.meshes[i].id = zchildmoldname;
								zresults.meshes[i].isPickable = true;
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
								if (zmeshname == 'displayframe' || zmeshname == 'displayrim') {
									var zcovering = new BABYLON.StandardMaterial("mat" + zmoldname, scene);
									zcovering.diffuseColor = new BABYLON.Color3.FromHexString(zmolddef.color.diffusecolor);
									zcovering.emissiveColor = new BABYLON.Color3.FromHexString(zmolddef.color.emissivecolor);
									zcovering.specularColor = new BABYLON.Color3.FromHexString(zmolddef.color.specularcolor);
									zcovering.ambientColor = new BABYLON.Color3.FromHexString(zmolddef.color.ambientcolor);
									zresults.meshes[i].material = zcovering;
								}
							}
						}
						/* check to see if the mold still exists since the time it was requested */
						zmold = scene.getMeshByID(zmoldname);
						if (zmold != null) {
							zmold.isPickable = false;
							WTWShopping.getStoreMolds(zmoldname);
						} else {
							WTW.disposeClean(zmoldname);
						}
					}
				}
			);		
			
			if (zspecial1 == 0 || zspecial1 == 1) { /* round product display */
				var ztitlemold = BABYLON.MeshBuilder.CreatePlane(zmoldname + "-titleimagesm", {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
				ztitlemold.scaling = new BABYLON.Vector3(zlenx * 1.2, zlenz * .24, .1);
				ztitlemold.position = new BABYLON.Vector3(0, zleny * 1.86, -zlenz * 0.125);
				ztitlemold.parent = zbasemold;

				var zpricemold = BABYLON.MeshBuilder.CreatePlane(zmoldname + "-price1", {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
				zpricemold.scaling = new BABYLON.Vector3(zlenx * .55, zlenz * .24, .1);
				zpricemold.position = new BABYLON.Vector3(zlenx * .3, zleny * .43, -zlenz * 0.1);
				zpricemold.parent = zbasemold;

				var zmolddefclickimage = WTW.newMold();
				zmolddefclickimage.shape = "plane";
				zmolddefclickimage.covering = "2d texture";
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
				zmolddefclickimage.parentname = zmoldname + "-base";
				zmolddefclickimage.checkcollisions = "1";
				var zclickimagemold = BABYLON.MeshBuilder.CreatePlane(zmoldname + "-clickimage", {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
				zclickimagemold.scaling = new BABYLON.Vector3(zlenx * 1.15, zleny * 1.15, .1);
				zclickimagemold.position = new BABYLON.Vector3(0, zleny * 1.15, -zlenz * .05);
				zclickimagemold.parent = zbasemold; 

				if (zspecial1 == 0) {
					ztitlemold.position = new BABYLON.Vector3(0, zleny * 1.86, -zlenz * 0.28);
					zpricemold.position = new BABYLON.Vector3(zlenx * .3, zleny * .43, -zlenz * 0.25);
					zclickimagemold.position = new BABYLON.Vector3(0, zleny * 1.15, -zlenz * .2);

					var ztitlemold2 = BABYLON.MeshBuilder.CreatePlane(zmoldname + "-titleimage2sm", {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
					ztitlemold2.scaling = new BABYLON.Vector3(zlenx * 1.2, zlenz * .24, .1);
					ztitlemold2.position = new BABYLON.Vector3(0, zleny * 1.86, zlenz * 0.28);
					ztitlemold2.rotation.y = WTW.getRadians(180);
					ztitlemold2.parent = zbasemold;

					var zpricemold2 = BABYLON.MeshBuilder.CreatePlane(zmoldname + "-price2", {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
					zpricemold2.scaling = new BABYLON.Vector3(zlenx * .55, zlenz * .24, .1);
					zpricemold2.position = new BABYLON.Vector3(-zlenx * .3, zleny * .43, zlenz * 0.25);
					zpricemold2.rotation.y = WTW.getRadians(180);
					zpricemold2.parent = zbasemold;

					var zmolddefclickimage2 = WTW.newMold();
					zmolddefclickimage2.shape = "plane";
					zmolddefclickimage2.covering = "2d texture";
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
					zmolddefclickimage2.parentname = zmoldname + "-base";
					zmolddefclickimage2.checkcollisions = "1";
					var zclickimagemold2 = BABYLON.MeshBuilder.CreatePlane(zmoldname + "-clickimage2", {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
					zclickimagemold2.scaling = new BABYLON.Vector3(zlenx * 1.15, zleny * 1.15, .1);
					zclickimagemold2.position = new BABYLON.Vector3(0, zleny * 1.15, zlenz * .2);
					zclickimagemold2.rotation.y = WTW.getRadians(180);
					zclickimagemold2.parent = zbasemold; 
				}
			}
			if (zspecial1 == 2) { /* box product display */
				var ztitlemold = BABYLON.MeshBuilder.CreateBox(zmoldname + "-titleimagesm", {}, scene);
				ztitlemold.scaling = new BABYLON.Vector3(zlenx * .1, zlenz * .86,zleny * .1);
				ztitlemold.position = new BABYLON.Vector3(zlenx * .36, -zleny * .16, 0);
				ztitlemold.rotation.x = WTW.getRadians(90);
				ztitlemold.parent = zbasemold;

				var ztitlemold2 = BABYLON.MeshBuilder.CreateBox(zmoldname + "-titleimage2sm", {}, scene);
				ztitlemold2.scaling = new BABYLON.Vector3(zlenx * .1, zlenz * .86,zleny * .1);
				ztitlemold2.position = new BABYLON.Vector3(-zlenx * .36, -zleny * .16, 0);
				ztitlemold2.rotation.x = WTW.getRadians(-90);
				ztitlemold2.parent = zbasemold;
				
				var zpricemold = BABYLON.MeshBuilder.CreateBox(zmoldname + "-price1", {}, scene);
				zpricemold.scaling = new BABYLON.Vector3(zlenx * .1, zlenz * .65,zleny * .08);
				zpricemold.position = new BABYLON.Vector3(zlenx * .36, -zleny * .36, 0);
				zpricemold.rotation.x = WTW.getRadians(90);
				zpricemold.parent = zbasemold;

				var zpricemold2 = BABYLON.MeshBuilder.CreateBox(zmoldname + "-price2", {}, scene);
				zpricemold2.scaling = new BABYLON.Vector3(zlenx * .1, zlenz * .65,zleny * .08);
				zpricemold2.position = new BABYLON.Vector3(-zlenx * .36, -zleny * .36, 0);
				zpricemold2.rotation.x = WTW.getRadians(-90);
				zpricemold2.parent = zbasemold;
				WTWShopping.getStoreMolds(zmoldname); 
			} else if (zspecial1 == 3 || zspecial1 == 4) {
				var zmolddefclickimage = WTW.newMold();
				zmolddefclickimage.shape = "plane";
				zmolddefclickimage.covering = "2d texture";
				zmolddefclickimage.position.x = -(zlenx * .2);
				zmolddefclickimage.position.y = 0;
				zmolddefclickimage.position.z = 0;
				zmolddefclickimage.scaling.x = zlenz *.9;
				zmolddefclickimage.scaling.y = zleny * .8;
				zmolddefclickimage.scaling.z = .1;
				zmolddefclickimage.subdivisions = 12;
				zmolddefclickimage.opacity = 1;
				zmolddefclickimage.graphics.texture.id = '';
				zmolddefclickimage.graphics.texture.path = zimageclickpath;
				zmolddefclickimage.graphics.uscale = 10/zleny;
				zmolddefclickimage.graphics.vscale = 10/zlenz;
				zmolddefclickimage.parentname = zmoldname + "-base";
				zmolddefclickimage.checkcollisions = "1";
				var zclickimagemold = BABYLON.MeshBuilder.CreatePlane(zmoldname + "-clickimage", {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
				zclickimagemold.scaling = new BABYLON.Vector3(zlenz * .9, zleny * .8, .1);
				zclickimagemold.rotation.y = WTW.getRadians(90);
				zclickimagemold.position.x = -(zlenx * .2);
				zclickimagemold.parent = zbasemold;			

				var zmolddefclickimage2 = WTW.newMold();
				zmolddefclickimage2.shape = "plane";
				zmolddefclickimage2.covering = "2d texture";
				zmolddefclickimage2.position.x = (zlenx * .2);
				zmolddefclickimage2.position.y = 0;
				zmolddefclickimage2.position.z = 0;
				zmolddefclickimage2.scaling.x = zlenz * .9;
				zmolddefclickimage2.scaling.y = zleny * .8;
				zmolddefclickimage2.scaling.z = .1;
				zmolddefclickimage2.subdivisions = 12;
				zmolddefclickimage2.opacity = 1;
				zmolddefclickimage2.graphics.texture.id = '';
				zmolddefclickimage2.graphics.texture.path = zimageclickpath;
				zmolddefclickimage2.graphics.uscale = 10/zleny;
				zmolddefclickimage2.graphics.vscale = 10/zlenz;
				zmolddefclickimage2.parentname = zmoldname + "-base";
				zmolddefclickimage2.checkcollisions = "1";
				var zclickimagemold2 = BABYLON.MeshBuilder.CreatePlane(zmoldname + "-clickimage2", {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
				zclickimagemold2.scaling = new BABYLON.Vector3(zlenz * .9, zleny * .8, .1);
				zclickimagemold2.rotation.y = WTW.getRadians(-90);
				zclickimagemold2.position.x = (zlenx * .2);
				zclickimagemold2.parent = zbasemold;

				var ztitlemold = BABYLON.MeshBuilder.CreateBox(zmoldname + "-titleimagesm", {}, scene);
				ztitlemold.scaling = new BABYLON.Vector3(zlenx * .1, zlenz * .86,zleny * .1);
				ztitlemold.position = new BABYLON.Vector3(zlenx * .36, zleny * .49, 0);
				ztitlemold.rotation.x = WTW.getRadians(90);
				ztitlemold.parent = zbasemold;

				var ztitlemold2 = BABYLON.MeshBuilder.CreateBox(zmoldname + "-titleimage2sm", {}, scene);
				ztitlemold2.scaling = new BABYLON.Vector3(zlenx * .1, zlenz * .86,zleny * .1);
				ztitlemold2.position = new BABYLON.Vector3(-zlenx * .36, zleny * .49, 0);
				ztitlemold2.rotation.x = WTW.getRadians(-90);
				ztitlemold2.parent = zbasemold;
				
				var zdescimage1 = BABYLON.MeshBuilder.CreateBox(zmoldname + "-descimage1", {}, scene);
				zdescimage1.scaling = new BABYLON.Vector3(zlenx * .08, zlenz * .84, zleny * .7);
				zdescimage1.position = new BABYLON.Vector3(zlenx * .21, zleny * .02, 0);
				zdescimage1.rotation.x = WTW.getRadians(90);
				zdescimage1.parent = zbasemold;
				WTW.registerMouseOver(zdescimage1);

				var zdescimage2 = BABYLON.MeshBuilder.CreateBox(zmoldname + "-descimage2", {}, scene);
				zdescimage2.scaling = new BABYLON.Vector3(zlenx * .08, zlenz * .84, zleny * .7);
				zdescimage2.position = new BABYLON.Vector3(-zlenx * .21, zleny * .02, 0);
				zdescimage2.rotation.x = WTW.getRadians(-90);
				zdescimage2.parent = zbasemold;
				WTW.registerMouseOver(zdescimage2);
				
				var zpricemold = BABYLON.MeshBuilder.CreateBox(zmoldname + "-price1", {}, scene);
				zpricemold.scaling = new BABYLON.Vector3(zlenx * .1, zlenz * .65,zleny * .08);
				zpricemold.position = new BABYLON.Vector3(zlenx * .36, -zleny * .36, 0);
				zpricemold.rotation.x = WTW.getRadians(90);
				zpricemold.parent = zbasemold;

				var zpricemold2 = BABYLON.MeshBuilder.CreateBox(zmoldname + "-price2", {}, scene);
				zpricemold2.scaling = new BABYLON.Vector3(zlenx * .1, zlenz * .65,zleny * .08);
				zpricemold2.position = new BABYLON.Vector3(-zlenx * .36, -zleny * .36, 0);
				zpricemold2.rotation.x = WTW.getRadians(-90);
				zpricemold2.parent = zbasemold;
				WTWShopping.getStoreMolds(zmoldname);
			} 
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStoreProduct=" + ex.message);
	}
	return zmold;
}

wtwshopping.prototype.addMoldStoreSign = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = BABYLON.MeshBuilder.CreateBox(zmoldname, {}, scene);
		zmold.scaling = new BABYLON.Vector3(zlenx,zleny,zlenz);
		zmold.material = new BABYLON.StandardMaterial("mat" + zmoldname, scene);
		zmold.material.alpha = 0;
		var zbasemold = BABYLON.MeshBuilder.CreateBox(zmoldname + "-base", {}, scene);
		zbasemold.scaling = new BABYLON.Vector3(1/zlenx,1/zleny,1/zlenz);
		zbasemold.material = new BABYLON.StandardMaterial("matbase" + zmoldname, scene);
		zbasemold.material.alpha = 0;
		zbasemold.parent = zmold;

		var ztextureid = "t1qlqxd6pzubzzzy";
		var ztexturepath = "/content/system/stock/lightgray-512x512.jpg";
		
		if (zmolddef.graphics.texture.id != undefined) {
			if (zmolddef.graphics.texture.id != "") {
				ztextureid = zmolddef.graphics.texture.id;
			}
		}
		if (zmolddef.graphics.texture.path != undefined) {
			if (zmolddef.graphics.texture.path != "") {
				ztexturepath = zmolddef.graphics.texture.path;
				ztexturepath = ztexturepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
			}
		}
		
		var zmolddefframe = WTW.newMold();
		zmolddefframe.shape = "box";
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
		zmolddefframe.parentname = zmoldname + "-base";
		zmolddefframe.checkcollisions = "1";
		var zimageframemold = BABYLON.MeshBuilder.CreateBox(zmoldname + "-imageframe", {}, scene);
		zimageframemold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zimageframemold.position = new BABYLON.Vector3(0, 0, 0);
		zimageframemold.material = WTW.addCovering(zmolddef.covering, zmoldname + "-imageframe", zmolddefframe, zlenx, zleny, zlenz, '0', '0');
		zimageframemold.parent = zbasemold;			
	
		var ztitlemold2 = BABYLON.MeshBuilder.CreateBox(zmoldname + "-titleimage2", {}, scene);
		ztitlemold2.scaling = new BABYLON.Vector3(zlenx, zlenz * .9, zleny * .9);
		ztitlemold2.position = new BABYLON.Vector3(-zlenx * .1, 0, 0);
		ztitlemold2.rotation.x = WTW.getRadians(-90);
		ztitlemold2.parent = zbasemold;

		var zcoveringtitle1 = new BABYLON.StandardMaterial("mat" + zmoldname + "-titleimage1texture", scene);
		zcoveringtitle1.alpha = 1;
		zcoveringtitle1.specularColor = new BABYLON.Color3(.2, .2, .2);
		zcoveringtitle1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		zcoveringtitle1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
		var zcontenttexture1 = new BABYLON.DynamicTexture(zmoldname + "-titleimage1texture", {width: 512,height: 512}, scene, true);
		zcontenttexture1.name = zmoldname + "-titleimage1texture";
		/* zcontenttexture1.hasAlpha = true; */
		zcoveringtitle1.diffuseTexture = zcontenttexture1;
		zcoveringtitle1.diffuseTexture.vScale = .5;
		zcoveringtitle1.diffuseTexture.uScale = 1;
		zcoveringtitle1.diffuseTexture.vOffset = .55;
		ztitlemold2.material = zcoveringtitle1;
		
		WTWShopping.getStoreInfo(zmoldname);
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStoreSign=" + ex.message);
	}
	return zmold;
}

wtwshopping.prototype.addMoldStore3DSign = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		var zbuildingname = "Store Name";
		var zfoundbuildingname = WTWShopping.getBuildingNameFromConnectingGrid(zmolddef.buildinginfo.buildingid);
		if (zfoundbuildingname != "") {
			zbuildingname = zfoundbuildingname;
		}
		zmolddef.webtext.webtext = zbuildingname;
		zmold = WTW.addMold3DText(zmoldname, zmolddef, zlenx, zleny, zlenz);
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStore3DSign=" + ex.message);
	}
	return zmold;
}

wtwshopping.prototype.addMoldStoreViewCart = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		zmold = BABYLON.MeshBuilder.CreateBox(zmoldname, {}, scene);
		zmold.scaling = new BABYLON.Vector3(zlenx,zleny,zlenz);
		zmold.material = new BABYLON.StandardMaterial("mat" + zmoldname, scene);
		zmold.material.alpha = 0;
		var zbasemold = BABYLON.MeshBuilder.CreateBox(zmoldname + "-base", {}, scene);
		zbasemold.scaling = new BABYLON.Vector3(1/zlenx,1/zleny,1/zlenz);
		zbasemold.material = new BABYLON.StandardMaterial("matbase" + zmoldname, scene);
		zbasemold.material.alpha = 0;
		zbasemold.parent = zmold;

		var ztextureid = "t1qlqxd6pzubzzzy";
		var ztexturepath = "/content/system/stock/lightgray-512x512.jpg";
		
		if (zmolddef.graphics.texture.id != undefined) {
			if (zmolddef.graphics.texture.id != "") {
				ztextureid = zmolddef.graphics.texture.id;
			}
		}
		if (zmolddef.graphics.texture.path != undefined) {
			if (zmolddef.graphics.texture.path != "") {
				ztexturepath = zmolddef.graphics.texture.path;
				ztexturepath = ztexturepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
			}
		}

		var zmolddefframe = WTW.newMold();
		zmolddefframe.shape = "box";
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
		zmolddefframe.parentname = zmoldname + "-base";
		zmolddefframe.checkcollisions = "1";
		var zimageframemold = BABYLON.MeshBuilder.CreateBox(zmoldname + "-imageframe", {}, scene);
		zimageframemold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zimageframemold.position = new BABYLON.Vector3(0, 0, 0);
		zimageframemold.material = WTW.addCovering(zmolddef.covering, zmoldname + "-imageframe", zmolddefframe, zlenx, zleny, zlenz, '0', '0');
		zimageframemold.parent = zbasemold;	
		
	
		var ztitlemold2 = BABYLON.MeshBuilder.CreateBox(zmoldname + "-titleimage2", {}, scene);
		ztitlemold2.scaling = new BABYLON.Vector3(zlenx, zlenz * .9, zleny * .9);
		ztitlemold2.position = new BABYLON.Vector3(-zlenx * .1, 0, 0);
		ztitlemold2.rotation.x = WTW.getRadians(-90);
		ztitlemold2.parent = zbasemold;

		var zcoveringtitle1 = new BABYLON.StandardMaterial("mat" + zmoldname + "-titleimage1texture", scene);
		zcoveringtitle1.alpha = 1;
		zcoveringtitle1.specularColor = new BABYLON.Color3(.2, .2, .2);
		zcoveringtitle1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		zcoveringtitle1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
		var zcontenttexture1 = new BABYLON.DynamicTexture(zmoldname + "-titleimage1texture", {width: 512,height: 512}, scene, true);
		zcontenttexture1.name = zmoldname + "-titleimage1texture";
		/* zcontenttexture1.hasAlpha = true; */
		zcoveringtitle1.diffuseTexture = zcontenttexture1;
		zcoveringtitle1.diffuseTexture.vScale = .2;
		zcoveringtitle1.diffuseTexture.uScale = 1;
		zcoveringtitle1.diffuseTexture.vOffset = .8;
		ztitlemold2.material = zcoveringtitle1;
		WTW.wrapText(ztitlemold2, "Click here to", "30px", "30px", "center", "top", "white", 0, 0);
		WTW.wrapText(ztitlemold2, "View Shopping Cart", "85px", "50px", "center", "top", "yellow", 0, 0);

		var zcarthover = BABYLON.MeshBuilder.CreateBox(zmoldname + "-carthover", {}, scene);
		zcarthover.scaling = new BABYLON.Vector3(zlenx, zlenz * .89, zleny * .89);
		zcarthover.position = new BABYLON.Vector3(-zlenx * .12, 0, 0);
		zcarthover.rotation.x = WTW.getRadians(-90);
		zcarthover.parent = zbasemold;
		
		var zcarttexturehover = new BABYLON.StandardMaterial("mat" + zmoldname + "-carttexturehover", scene);
		zcarttexturehover.alpha = 0;
		zcarttexturehover.specularColor = new BABYLON.Color3(.2, .2, .2);
		zcarttexturehover.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		zcarttexturehover.diffuseColor = new BABYLON.Color3(.9, .9, .9);
		var zcontenttexture1hover = new BABYLON.DynamicTexture(zmoldname + "-carttexturehover", {width: 512,height: 512}, scene, true);
		zcontenttexture1hover.name = zmoldname + "-carttexturehover";
		/* zcontenttexture1hover.hasAlpha = true; */
		zcarttexturehover.diffuseTexture = zcontenttexture1hover;
		zcarttexturehover.diffuseTexture.vScale = .2;
		zcarttexturehover.diffuseTexture.uScale = 1;
		zcarttexturehover.diffuseTexture.vOffset = .8;
		zcarthover.material = zcarttexturehover;
		WTW.wrapText(zcarthover, "Click here to", "30px", "30px", "center", "top", "white", 0, 0);
		WTW.wrapText(zcarthover, "View Shopping Cart", "85px", "50px", "center", "top", "green", 0, 0);
		WTW.registerMouseOver(zcarthover);
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStoreViewCart=" + ex.message);
	}
	return zmold;
}

wtwshopping.prototype.addMoldStoreCategories = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	var zmold;
	try {
		if (zlenx < 1) {
			zlenx = 1;
		}
		zmold = BABYLON.MeshBuilder.CreateBox(zmoldname, {}, scene);
		zmold.scaling = new BABYLON.Vector3(zlenx-.8,zleny-.01,zlenz-.01);
		/* zmold.material = WTW.addCovering("hidden", zmoldname, zmolddef, zlenx-.8, zleny-.01, zlenz-.01, "0", "0"); */
		zmold.material = new BABYLON.StandardMaterial("mat" + zmoldname, scene);
		zmold.material.alpha = 0;
		var zbasemold = BABYLON.MeshBuilder.CreateBox(zmoldname + "-base", {}, scene);
		zbasemold.scaling = new BABYLON.Vector3(1/(zlenx-.8),1/(zleny-.01),1/(zlenz-.01));
		/* zbasemold.material = WTW.addCovering("hidden", zmoldname + "-base", zmolddef, zlenx-.8, zleny-.01, zlenz-.01, "0", "0"); */
		zbasemold.material = new BABYLON.StandardMaterial("matbase" + zmoldname, scene);
		zbasemold.material.alpha = 0;
		zbasemold.parent = zmold;

		var ztextureid = "t1qlqxd6pzubzzzy";
		var ztexturepath = "/content/system/stock/lightgray-512x512.jpg";
		
		if (zmolddef.graphics.texture.id != undefined) {
			if (zmolddef.graphics.texture.id != "") {
				ztextureid = zmolddef.graphics.texture.id;
			}
		}
		if (zmolddef.graphics.texture.path != undefined) {
			if (zmolddef.graphics.texture.path != "") {
				ztexturepath = zmolddef.graphics.texture.path;
				ztexturepath = ztexturepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
			}
		}

		var zmolddefframe = WTW.newMold();
		zmolddefframe.shape = "roundedbox";
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
		zmolddefframe.parentname = zmoldname + "-base";
		zmolddefframe.checkcollisions = "1";
		var zimageframemold = WTW.addMoldRoundedBox(zmoldname + "-imageframe", zlenx, zleny, zlenz);
		zimageframemold.scaling = new BABYLON.Vector3(zlenx, zleny, zlenz);
		zimageframemold.position = new BABYLON.Vector3(0, 0, 0);
		zimageframemold.material = WTW.addCovering(zmolddef.covering, zmoldname + "-imageframe", zmolddefframe, zlenx, zleny, zlenz, '0', '0');
		zimageframemold.parent = zbasemold;	
		
		var zimagecutout = BABYLON.MeshBuilder.CreateBox(zmoldname + "-imagecutout", {}, scene);
		zimagecutout.scaling = new BABYLON.Vector3(1, zleny - 3, zlenz - .5);
		zimagecutout.position = new BABYLON.Vector3(-zlenx + .7, 0, 0);
		zimagecutout.parent = zbasemold;
		
		var zcsgmaterial = zimageframemold.material;
		var zcsgmain = BABYLON.CSG.FromMesh(zimageframemold);
		var zcsgsub = BABYLON.CSG.FromMesh(zimagecutout);
		var zcsgmerge;
		zcsgmerge = zcsgmain.subtract(zcsgsub);
		zimageframemold.dispose();
		zimagecutout.dispose();
		var znewmold = zcsgmerge.toMesh(zmoldname + "-imageframe", zcsgmaterial, scene);
		znewmold.parent = zbasemold;
	
		var ztitlemold = BABYLON.MeshBuilder.CreateBox(zmoldname + "-titleimage", {}, scene);
		ztitlemold.scaling = new BABYLON.Vector3(.2, 7, 1.4);
		ztitlemold.position = new BABYLON.Vector3(-zlenx/2 + .08, zleny/2 - .75, 0);
		ztitlemold.rotation.x = WTW.getRadians(-90);
		ztitlemold.parent = zbasemold;

		var zcoveringtitle1 = new BABYLON.StandardMaterial("mat" + zmoldname + "-titleimage1texture", scene);
		zcoveringtitle1.alpha = 1;
		zcoveringtitle1.specularColor = new BABYLON.Color3(.2, .2, .2);
		zcoveringtitle1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		zcoveringtitle1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
		var zcontenttexture1 = new BABYLON.DynamicTexture(zmoldname + "-titleimage1texture", {width: 512,height: 512}, scene, true);
		zcontenttexture1.name = zmoldname + "-titleimage1texture";
		/* zcontenttexture1.hasAlpha = true; */
		zcoveringtitle1.diffuseTexture = zcontenttexture1;
		zcoveringtitle1.diffuseTexture.vScale = .2;
		zcoveringtitle1.diffuseTexture.uScale = 1;
		zcoveringtitle1.diffuseTexture.vOffset = .78;
		ztitlemold.material = zcoveringtitle1;
		WTW.wrapText(ztitlemold, "Categories", "85px", "80px", "center", "top", "yellow", 0, 0);

		var ztitlemold2 = BABYLON.MeshBuilder.CreateBox(zmoldname + "-titleimage2", {}, scene);
		ztitlemold2.scaling = new BABYLON.Vector3(.2, 7, .6);
		ztitlemold2.position = new BABYLON.Vector3(-zlenx/2 + .08, -zleny/2 + .75, 0);
		ztitlemold2.rotation.x = WTW.getRadians(-90);
		ztitlemold2.parent = zbasemold;

		var zcoveringtitle2 = new BABYLON.StandardMaterial("mat" + zmoldname + "-titleimage2texture", scene);
		zcoveringtitle2.alpha = 1;
		zcoveringtitle2.specularColor = new BABYLON.Color3(.2, .2, .2);
		zcoveringtitle2.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		zcoveringtitle2.diffuseColor = new BABYLON.Color3(.9, .9, .9);
		var zcontenttexture2 = new BABYLON.DynamicTexture(zmoldname + "-titleimage2texture", {width: 512,height: 512}, scene, true);
		zcontenttexture2.name = zmoldname + "-titleimage2texture";
		/* zcontenttexture2.hasAlpha = true; */
		zcoveringtitle2.diffuseTexture = zcontenttexture2;
		zcoveringtitle2.diffuseTexture.vScale = .10;
		zcoveringtitle2.diffuseTexture.uScale = 1;
		zcoveringtitle2.diffuseTexture.vOffset = .9;
		ztitlemold2.material = zcoveringtitle2;
		WTW.wrapText(ztitlemold2, "Select to update Store Products", "35px", "30px", "center", "top", "white", 0, 0);
		
		WTWShopping.productFetchCategories(zmoldname);
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStoreCategories=" + ex.message);
	}
	return zmold;
}

wtwshopping.prototype.addMoldStoreSearch = function(zmoldname, zmolddef, zlenx, zleny, zlenz) {
	/* not implemented yet */
	var zmold;
	try {
		zmold = BABYLON.MeshBuilder.CreateBox(zmoldname, {}, scene);
		zmold.scaling = new BABYLON.Vector3(zlenx,zleny,zlenz);
		zmold.material = new BABYLON.StandardMaterial("mat" + zmoldname, scene);
		zmold.material.alpha = 0;
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStoreSearch=" + ex.message);
	}
	return zmold;
}

wtwshopping.prototype.setNewMold = function(zmoldname, zmolds, zmoldind, zrebuildmold) {
	try {
		if (zmolds[zmoldind] != null) {
			switch(zmolds[zmoldind].shape) {
				case "store3dsign":
					var zwebname = "Store Name";
					var zfoundname = WTW.getNameFromConnectingGrid(zmolds[zmoldind].communityinfo.communityid);
					if (zfoundname != "") {
						zwebname = zfoundname;
					}
					if (zmolds[zmoldind].webtext.webtext != zwebname) {
						zmolds[zmoldind].webtext.webtext = zwebname;
						zrebuildmold = 1;
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
					if (zmolds[zmoldind].webtext.webstyle != undefined) {
						dGet('wtw_tmoldwebstyle').value = "{\"anchor\":\"" + dGet('wtw_tmoldwebtextalign').options[dGet('wtw_tmoldwebtextalign').selectedIndex].value + "\",\"letter-height\":" + dGet('wtw_tmoldwebtextheight').value + ",\"letter-thickness\":" + dGet('wtw_tmoldwebtextthick').value + ",\"color\":\"" + dGet('wtw_tmoldwebtextcolor').value + "\",\"alpha\":" + opacity/100 + ",\"colors\":{\"diffuse\":\"" + dGet('wtw_tmoldwebtextdiffuse').value + "\",\"specular\":\"" + dGet('wtw_tmoldwebtextspecular').value + "\",\"ambient\":\"" + dGet('wtw_tmoldwebtextambient').value + "\",\"emissive\":\"" + dGet('wtw_tmoldwebtextcolor').value + "\"}}";
						if (zmolds[zmoldind].webtext.webstyle != dGet('wtw_tmoldwebstyle').value) {
							zmolds[zmoldind].webtext.webstyle = dGet('wtw_tmoldwebstyle').value;
							zrebuildmold = 1;
						}
					}
					break;
				case "storeaddtocart":
				case "storebuynow":
				case "storecheckout":
				case "storereadmore":
				case "storeviewcart":
					
					break;
			}
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingmolds.js-setNewMold=" + ex.message);
	}
	return zrebuildmold;
}


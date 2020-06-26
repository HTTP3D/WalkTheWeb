
wtwshopping.prototype.setMoldFormFields = function(shape) {
	try {
		var shapevalue = shape.toLowerCase();
		while (shapevalue.indexOf(" ") > -1) {
			shapevalue = shapevalue.replace(" ","");
		}
		switch (shapevalue) {
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
				WTW.show('wtw_moldtexturetitle'); 
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
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
				WTW.show('wtw_moldtexturetitle'); 
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
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
				WTW.show('wtw_moldtexturetitle'); 
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
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
				WTW.show('wtw_moldtexturetitle'); 
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
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
				WTW.show('wtw_moldtexturetitle'); 
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
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
				WTW.show('wtw_moldtexturetitle'); 
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
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
				WTW.show('wtw_moldtexturetitle'); 
				WTW.hide('wtw_moldbumptexturetitle');
				WTW.hide('wtw_moldbumptextureset2div');
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

wtwshopping.prototype.setNewMoldDefaults = function(shape) {
	try {
		var coords = WTW.getNewCoordinates(50);
		var positionX = coords.positionX;
		var positionY = coords.positionY;
		var positionZ = coords.positionZ;
		var rotationY = coords.rotationY;
		var shapevalue = shape.toLowerCase();
		var imagepath = "/content/system/stock/stucco-512x512.jpg";
		var heightmapid = "dxmbplwoocpg5df3";
		var heightmappath = "/content/system/stock/heightmap-1500x1500.jpg";
		while (shapevalue.indexOf(" ") > -1) {
			shapevalue = shapevalue.replace(" ","");
		}
		if (thingid != '') {
			positionX = 0;
			positionZ = 0;
		}
		switch (shapevalue) {
			case "storeproduct":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "5.00";
				dGet('wtw_tmoldscalingy').value = "5.00";
				dGet('wtw_tmoldscalingz').value = "5.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
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
				rotationY = WTW.cleanDegrees(Number(rotationY) + 180);
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = Number(positionY) + 7;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "4.84";
				dGet('wtw_tmoldscalingy').value = "1.98";
				dGet('wtw_tmoldscalingz').value = "0.60";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;

			case "storesign":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "3.00";
				dGet('wtw_tmoldscalingy').value = "10.00";
				dGet('wtw_tmoldscalingz').value = "30.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;			
			case "store3dsign":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY-4;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "1.00";
				dGet('wtw_tmoldscalingz').value = "1.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY + 90;
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
				dGet('wtw_tmoldtexturepath').value = imagepath;
				WTW.setPreviewImage('wtw_moldtexturepreview', 'wtw_tmoldtexturepath', 'wtw_tmoldtextureid');
				break;
			case "storeviewcart":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "0.25";
				dGet('wtw_tmoldscalingy').value = "1.00";
				dGet('wtw_tmoldscalingz').value = "5.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;			
			case "storecategories":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "14.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
				dGet('wtw_tmoldrotationz').value = "0.00";
				dGet('wtw_tmoldspecial2').value = "0.00";
				dGet('wtw_tmolduoffset').value = "0.00";
				dGet('wtw_tmoldvoffset').value = "0.00";
				dGet('wtw_tmolduscale').value = "0.00";
				dGet('wtw_tmoldvscale').value = "0.00";
				dGet('wtw_tmoldsubdivisions').value = "12";
				break;			
			case "storesearch":
				dGet('wtw_tmoldpositionx').value = positionX;
				dGet('wtw_tmoldpositiony').value = positionY;
				dGet('wtw_tmoldpositionz').value = positionZ;
				dGet('wtw_tmoldscalingx').value = "1.00";
				dGet('wtw_tmoldscalingy').value = "14.00";
				dGet('wtw_tmoldscalingz').value = "10.00";
				dGet('wtw_tmoldrotationx').value = "0.00";
				dGet('wtw_tmoldrotationy').value = rotationY;
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

wtwshopping.prototype.addMoldStoreButton = function(moldname, molddef, lenx, leny, lenz) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,leny,lenz);
		mold.material = new BABYLON.StandardMaterial("mat" + moldname, scene);
		mold.material.alpha = 0;
		var basemold = BABYLON.MeshBuilder.CreateBox(moldname + "-base", {}, scene);
//		basemold.scaling = new BABYLON.Vector3(1,1,1);
		basemold.scaling = new BABYLON.Vector3(1/lenx,1/leny,1/lenz);
		basemold.material = new BABYLON.StandardMaterial("matbase" + moldname, scene);
		basemold.material.alpha = 0;
//		basemold.position.z = -lenz*.3
		basemold.parent = mold;
		var zshape = 'storereadmore';
		var zfolder = '/content/plugins/wtw-shopping/assets/3dobjects/';
		var zfile = 'button-readmore.babylon';

		if (molddef.shape != undefined) {
			zshape = molddef.shape;
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
				zfile = 'buttonflat-readmore.babylon';
				break;
			case "storeviewcart":
				zfile = 'button-viewcart.babylon';
				break;
		}
		
		BABYLON.SceneLoader.ImportMeshAsync("", zfolder, zfile, scene).then(
			function (results) {
				if (results.meshes != null) {
					/* animate the button and add JS function to execute when pressed */
					var objectanimations = [];
					switch (zshape) {
						case "storeaddtocart":
							/* onload makes sure the button is not in the pressed position */
							objectanimations[0] = WTW.newObjectAnimation();
							objectanimations[0].animationname = 'AddToCart1OnLoad';
							objectanimations[0].moldevent = 'onload';
							objectanimations[0].moldnamepart = 'button';
							objectanimations[0].startframe = 0;
							objectanimations[0].endframe = 1;
							objectanimations[0].animationloop = false;
							objectanimations[0].speedratio = 1.00;
							objectanimations[0].additionalscript = '';
							objectanimations[0].additionalparameters = '';
							
							/* onclick plays animation and additional script with parameters */
							objectanimations[1] = WTW.newObjectAnimation();
							objectanimations[1].animationname = 'addToCart1OnClick';
							objectanimations[1].moldevent = 'onclick';
							objectanimations[1].moldnamepart = 'button';
							objectanimations[1].startframe = 1;
							objectanimations[1].endframe = 35;
							objectanimations[1].animationloop = false;
							objectanimations[1].speedratio = 1;
							objectanimations[1].additionalscript = 'WTWShopping.productAddToCart';
							objectanimations[1].additionalparameters = moldname + "-button";
							break;
						case "storebuynow":
							/* onload makes sure the button is not in the pressed position */
							objectanimations[0] = WTW.newObjectAnimation();
							objectanimations[0].animationname = 'AddToCart1OnLoad';
							objectanimations[0].moldevent = 'onload';
							objectanimations[0].moldnamepart = 'button';
							objectanimations[0].startframe = 0;
							objectanimations[0].endframe = 1;
							objectanimations[0].animationloop = false;
							objectanimations[0].speedratio = 1.00;
							objectanimations[0].additionalscript = '';
							objectanimations[0].additionalparameters = '';

							/* onclick plays animation and additional script with parameters */
							objectanimations[1] = WTW.newObjectAnimation();
							objectanimations[1].animationname = 'addToCart1OnClick';
							objectanimations[1].moldevent = 'onclick';
							objectanimations[1].moldnamepart = 'button';
							objectanimations[1].startframe = 1;
							objectanimations[1].endframe = 35;
							objectanimations[1].animationloop = false;
							objectanimations[1].speedratio = 1;
							objectanimations[1].additionalscript = 'WTWShopping.productAddToCart';
							objectanimations[1].additionalparameters = moldname + "-button";
							break;
						case "storecheckout":
							/* onload makes sure the button is not in the pressed position */
							objectanimations[0] = WTW.newObjectAnimation();
							objectanimations[0].animationname = 'storeCheckOutOnLoad';
							objectanimations[0].moldevent = 'onload';
							objectanimations[0].moldnamepart = 'button';
							objectanimations[0].startframe = 0;
							objectanimations[0].endframe = 1;
							objectanimations[0].animationloop = false;
							objectanimations[0].speedratio = 1.00;
							objectanimations[0].additionalscript = '';
							objectanimations[0].additionalparameters = '';

							/* onclick plays animation and additional script with parameters */
							objectanimations[1] = WTW.newObjectAnimation();
							objectanimations[1].animationname = 'storeCheckOutOnClick';
							objectanimations[1].moldevent = 'onclick';
							objectanimations[1].moldnamepart = 'button';
							objectanimations[1].startframe = 1;
							objectanimations[1].endframe = 35;
							objectanimations[1].animationloop = false;
							objectanimations[1].speedratio = 1;
							objectanimations[1].additionalscript = 'WTWShopping.productShowCart';
							objectanimations[1].additionalparameters = moldname + "-button";
							break;
						case "storereadmore":
							/* onload makes sure the button is not in the pressed position */
							objectanimations[0] = WTW.newObjectAnimation();
							objectanimations[0].animationname = 'readme1OnLoad';
							objectanimations[0].moldevent = 'onload';
							objectanimations[0].moldnamepart = 'button';
							objectanimations[0].startframe = 0;
							objectanimations[0].endframe = 1;
							objectanimations[0].animationloop = false;
							objectanimations[0].speedratio = 1.00;
							objectanimations[0].additionalscript = '';
							objectanimations[0].additionalparameters = '';

							/* onclick plays animation and additional script with parameters */
							objectanimations[1] = WTW.newObjectAnimation();
							objectanimations[1].animationname = 'readMore1OnClick';
							objectanimations[1].moldevent = 'onclick';
							objectanimations[1].moldnamepart = 'button';
							objectanimations[1].startframe = 1;
							objectanimations[1].endframe = 35;
							objectanimations[1].animationloop = false;
							objectanimations[1].speedratio = 1;
							objectanimations[1].additionalscript = 'WTWShopping.productReadMore';
							objectanimations[1].additionalparameters = moldname + "-button";
							break;
						case "storeviewcart":
							/* onload makes sure the button is not in the pressed position */
							objectanimations[0] = WTW.newObjectAnimation();
							objectanimations[0].animationname = 'storeCheckOutOnLoad';
							objectanimations[0].moldevent = 'onload';
							objectanimations[0].moldnamepart = 'button';
							objectanimations[0].startframe = 0;
							objectanimations[0].endframe = 1;
							objectanimations[0].animationloop = false;
							objectanimations[0].speedratio = 1.00;
							objectanimations[0].additionalscript = '';
							objectanimations[0].additionalparameters = '';

							/* onclick plays animation and additional script with parameters */
							objectanimations[1] = WTW.newObjectAnimation();
							objectanimations[1].animationname = 'storeCheckOutOnClick';
							objectanimations[1].moldevent = 'onclick';
							objectanimations[1].moldnamepart = 'button';
							objectanimations[1].startframe = 1;
							objectanimations[1].endframe = 35;
							objectanimations[1].animationloop = false;
							objectanimations[1].speedratio = 1;
							objectanimations[1].additionalscript = 'WTWShopping.productShowCart';
							objectanimations[1].additionalparameters = moldname + "-button";
							break;
					}

					for (var i=0; i < results.meshes.length; i++) {
						if (results.meshes[i] != null) {
							var meshname = results.meshes[i].name.toLowerCase();
							var childmoldname = moldname + "-" + meshname;
							results.meshes[i].name = childmoldname;
							results.meshes[i].id = childmoldname;
							results.meshes[i].isPickable = true;
							WTW.registerMouseOver(results.meshes[i]);
							if (results.meshes[i].parent == null) {
								results.meshes[i].parent = basemold;
							}
							if (objectanimations != null) {
								WTW.addMoldAnimation(moldname, meshname, results.meshes[i], objectanimations);
							}
/*							if (meshname == 'displayframe') {
								var covering = new BABYLON.StandardMaterial("mat" + moldname, scene);
								covering.specularColor = new BABYLON.Color3(Number(molddef.color.specular.r), Number(molddef.color.specular.g), Number(molddef.color.specular.b));
								covering.emissiveColor = new BABYLON.Color3(Number(molddef.color.emissive.r), Number(molddef.color.emissive.g), Number(molddef.color.emissive.b));
								covering.diffuseColor = new BABYLON.Color3(Number(molddef.color.diffuse.r), Number(molddef.color.diffuse.g), Number(molddef.color.diffuse.b));
								results.meshes[i].material = covering;
							}
*/						}
					}
					mold.isPickable = false;
					WTWShopping.getStoreMolds(moldname); 
				}
			}
		);
/*
		var titlemold = BABYLON.MeshBuilder.CreateBox(moldname + "-titleimagesm", {}, scene);
		titlemold.scaling = new BABYLON.Vector3(lenx * .1, lenz * .86,leny * .1);
		titlemold.position = new BABYLON.Vector3(lenx * .36, -leny * .16, 0);
		titlemold.rotation.x = WTW.getRadians(90);
		titlemold.parent = basemold;

		var titlemold2 = BABYLON.MeshBuilder.CreateBox(moldname + "-titleimage2sm", {}, scene);
		titlemold2.scaling = new BABYLON.Vector3(lenx * .1, lenz * .86,leny * .1);
		titlemold2.position = new BABYLON.Vector3(-lenx * .36, -leny * .16, 0);
		titlemold2.rotation.x = WTW.getRadians(-90);
		titlemold2.parent = basemold;
		
		var pricemold = BABYLON.MeshBuilder.CreateBox(moldname + "-price1", {}, scene);
		pricemold.scaling = new BABYLON.Vector3(lenx * .1, lenz * .65,leny * .08);
		pricemold.position = new BABYLON.Vector3(lenx * .36, -leny * .36, 0);
		pricemold.rotation.x = WTW.getRadians(90);
		pricemold.parent = basemold;

		var pricemold2 = BABYLON.MeshBuilder.CreateBox(moldname + "-price2", {}, scene);
		pricemold2.scaling = new BABYLON.Vector3(lenx * .1, lenz * .65,leny * .08);
		pricemold2.position = new BABYLON.Vector3(-lenx * .36, -leny * .36, 0);
		pricemold2.rotation.x = WTW.getRadians(-90);
		pricemold2.parent = basemold;
*/
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStoreButton=" + ex.message);
	}
	return mold;
}

wtwshopping.prototype.addMoldStoreProduct = function(moldname, molddef, lenx, leny, lenz) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,leny,lenz);
		mold.material = new BABYLON.StandardMaterial("mat" + moldname, scene);
		mold.material.alpha = 0;
		var basemold = BABYLON.MeshBuilder.CreateBox(moldname + "-base", {}, scene);
		basemold.scaling = new BABYLON.Vector3(1/lenx,1/leny,1/lenz);
		basemold.material = new BABYLON.StandardMaterial("matbase" + moldname, scene);
		basemold.material.alpha = 0;
		basemold.parent = mold;
		
		var special1 = 0;
		var textureid = "t1qlqxd6pzubzzzy";
		var texturepath = "/content/system/stock/lightgray-512x447.jpg";
		var imagepath = "";
		var imagehoverpath = "";
		var imageclickpath = "";
		var imagewallname = moldname + "-imagewall";
		var img = new Image();
		/* special1 derived from drop-down list on mold form (wtw-shopping plugin addition) */
		/* 	0 = rounded box 2-sides
			1 = rounded box 1 side
			2 = rounded no image
			3 = retro box 2-sides
			4 = box */
		if (molddef.scaling.special1 != undefined) {
			if (molddef.scaling.special1 != "") {
				if (WTW.isNumeric(molddef.scaling.special1)) {
					special1 = Number(molddef.scaling.special1);
				}
			}
		}
		if (molddef.graphics.webimages[0] != null) {
			if (molddef.graphics.webimages[0].imagepath != undefined) {
				if (molddef.graphics.webimages[0].imagepath != "") {
					imagepath = molddef.graphics.webimages[0].imagepath;
					imagepath = imagepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
				}
			}
			if (molddef.graphics.webimages[0].imagehoverpath != undefined) {
				if (molddef.graphics.webimages[0].imagehoverpath != "") {
					imagehoverpath = molddef.graphics.webimages[0].imagehoverpath;
					imagehoverpath = imagehoverpath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
				}
			}
			if (molddef.graphics.webimages[0].imageclickpath != undefined) {
				if (molddef.graphics.webimages[0].imageclickpath != "") {
					imageclickpath = molddef.graphics.webimages[0].imageclickpath;
					imageclickpath = imageclickpath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
				}
			}
		}
		if (molddef.graphics.texture.id != undefined) {
			if (molddef.graphics.texture.id != "") {
				textureid = molddef.graphics.texture.id;
			}
		}
		if (molddef.graphics.texture.path != undefined) {
			if (molddef.graphics.texture.path != "") {
				texturepath = molddef.graphics.texture.path;
				texturepath = texturepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
			}
		}
		
		if (special1 == 4) { /* box display */
			var molddefclickimage = WTW.newMold();
			molddefclickimage.shape = "plane";
			molddefclickimage.covering = "2d texture";
			molddefclickimage.position.x = -(lenx * 1.1)/2;
			molddefclickimage.position.y = 0;
			molddefclickimage.position.z = 0;
			molddefclickimage.scaling.x = lenz - .2;
			molddefclickimage.scaling.y = leny * .8;
			molddefclickimage.scaling.z = .1;
			molddefclickimage.subdivisions = 12;
			molddefclickimage.opacity = 1;
			molddefclickimage.graphics.texture.id = '';
			molddefclickimage.graphics.texture.path = imageclickpath;
			molddefclickimage.graphics.uscale = 10/leny;
			molddefclickimage.graphics.vscale = 10/lenz;
			molddefclickimage.parentname = moldname + "-base";
			molddefclickimage.checkcollisions = "1";
			var clickimagemold = BABYLON.MeshBuilder.CreatePlane(moldname + "-clickimage", {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
			clickimagemold.scaling = new BABYLON.Vector3(lenz-.2, leny * .8, .1);
			clickimagemold.rotation.y = WTW.getRadians(90);
			clickimagemold.position.x = -(lenx * 1.1)/2;
			clickimagemold.parent = basemold;

			var molddefclickimage2 = WTW.newMold();
			molddefclickimage2.shape = "plane";
			molddefclickimage2.covering = "2d texture";
			molddefclickimage2.position.x = (lenx * 1.1)/2;
			molddefclickimage2.position.y = 0;
			molddefclickimage2.position.z = 0;
			molddefclickimage2.scaling.x = lenz - .2;
			molddefclickimage2.scaling.y = leny * .8;
			molddefclickimage2.scaling.z = .1;
			molddefclickimage2.subdivisions = 12;
			molddefclickimage2.opacity = 1;
			molddefclickimage2.graphics.texture.id = '';
			molddefclickimage2.graphics.texture.path = imageclickpath;
			molddefclickimage2.graphics.uscale = 10/leny;
			molddefclickimage2.graphics.vscale = 10/lenz;
			molddefclickimage2.parentname = moldname + "-base";
			molddefclickimage2.checkcollisions = "1";
			var clickimagemold2 = BABYLON.MeshBuilder.CreatePlane(moldname + "-clickimage2", {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
			clickimagemold2.scaling = new BABYLON.Vector3(lenz-.2, leny * .8, .1);
			clickimagemold2.rotation.y = WTW.getRadians(-90);
			clickimagemold2.position.x = (lenx * 1.1)/2;
			clickimagemold2.parent = basemold;

			var molddefframe = WTW.newMold();
			molddefframe.shape = "box";
			molddefframe.covering = molddef.covering;
			molddefframe.position.x = 0;
			molddefframe.position.y = 0;
			molddefframe.position.z = 0;
			molddefframe.color = molddef.color;
			molddefframe.scaling.x = lenx;
			molddefframe.scaling.y = leny;
			molddefframe.scaling.z = lenz;
			molddefframe.subdivisions = 12;
			molddefframe.graphics.texture.id = textureid;
			molddefframe.graphics.texture.path = texturepath;
			molddefframe.graphics.uscale = 10/leny;
			molddefframe.graphics.vscale = 10/lenz;
			molddefframe.parentname = moldname + "-base";
			molddefframe.checkcollisions = "1";
			var imageframemold = BABYLON.MeshBuilder.CreateBox(moldname + "-imageframe", {}, scene);
			imageframemold.scaling = new BABYLON.Vector3(lenx, leny, lenz);
			imageframemold.position = new BABYLON.Vector3(0, 0, 0);
			imageframemold.material = WTW.addCovering(molddef.covering, moldname + "-imageframe", molddefframe, lenx, leny, lenz, '0', '0');
			imageframemold.parent = basemold;	

			var titlemold = BABYLON.MeshBuilder.CreateBox(moldname + "-titleimage", {}, scene);
			titlemold.scaling = new BABYLON.Vector3(lenx * .1, lenz * .99,leny * .99);
			titlemold.position = new BABYLON.Vector3(lenx * .479, 0, 0);
			titlemold.rotation.x = WTW.getRadians(90);
			titlemold.parent = basemold;

			var titlemold2 = BABYLON.MeshBuilder.CreateBox(moldname + "-titleimage2", {}, scene);
			titlemold2.scaling = new BABYLON.Vector3(lenx * .1, lenz * .99,leny * .99);
			titlemold2.position = new BABYLON.Vector3(-lenx * .479, 0, 0);
			titlemold2.rotation.x = WTW.getRadians(-90);
			titlemold2.parent = basemold;

			var addtocart1 = BABYLON.MeshBuilder.CreateBox(moldname + "-addtocart1", {}, scene);
			addtocart1.scaling = new BABYLON.Vector3(lenx * .1, lenz * .37,leny * .099);
			addtocart1.position = new BABYLON.Vector3(lenx * .5, -leny * .45, lenz * .25);
			addtocart1.rotation.x = WTW.getRadians(90);
			addtocart1.parent = basemold;

			var coveringcart1 = new BABYLON.StandardMaterial("mat" + moldname + "-cartimage1texture", scene);
			coveringcart1.alpha = 1;
			coveringcart1.specularColor = new BABYLON.Color3(.2, .2, .2);
			coveringcart1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
			coveringcart1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
			var contentTexture1 = new BABYLON.DynamicTexture(moldname + "-cartimage1texture", {width: 512,height: 512}, scene, true);
			contentTexture1.name = moldname + "-cartimage1texture";
			//contentTexture.hasAlpha = true;
			coveringcart1.diffuseTexture = contentTexture1;
			coveringcart1.diffuseTexture.vScale = .2;
			coveringcart1.diffuseTexture.uScale = 1;
			coveringcart1.diffuseTexture.vOffset = .85;
			addtocart1.material = coveringcart1;
			WTW.wrapText(addtocart1, "Add to Cart", "60px", "70px", "center", "top", "green", 0, 0);
			WTW.registerMouseOver(addtocart1);

			var addtocart1hover = BABYLON.MeshBuilder.CreateBox(moldname + "-addtocart1hover", {}, scene);
			addtocart1hover.scaling = new BABYLON.Vector3(lenx * .1, lenz * .37, leny * .099);
			addtocart1hover.position = new BABYLON.Vector3(lenx * .49, -leny * .45, lenz * .25);
			addtocart1hover.rotation.x = WTW.getRadians(90);
			addtocart1hover.parent = basemold;

			var coveringcart1hover = new BABYLON.StandardMaterial("mat" + moldname + "-cartimage1texturehover", scene);
			coveringcart1hover.alpha = 1;
			coveringcart1hover.specularColor = new BABYLON.Color3(.2, .2, .2);
			coveringcart1hover.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
			coveringcart1hover.diffuseColor = new BABYLON.Color3(.9, .9, .9);
			var contentTexture1hover = new BABYLON.DynamicTexture(moldname + "-cartimage1texturehover", {width: 512,height: 512}, scene, true);
			contentTexture1hover.name = moldname + "-cartimage1texturehover";
			contentTexture1hover.hasAlpha = true;
			coveringcart1hover.diffuseTexture = contentTexture1hover;
			coveringcart1hover.diffuseTexture.vScale = .2;
			coveringcart1hover.diffuseTexture.uScale = 1;
			coveringcart1hover.diffuseTexture.vOffset = .85;
			addtocart1hover.material = coveringcart1hover;
			WTW.wrapText(addtocart1hover, "Add to Cart", "60px", "70px", "center", "top", "yellow", 0, 0);			

			var addtocart2 = BABYLON.MeshBuilder.CreateBox(moldname + "-addtocart2", {}, scene);
			addtocart2.scaling = new BABYLON.Vector3(lenx * .1, lenz * .37, leny * .099);
			addtocart2.position = new BABYLON.Vector3(-lenx * .5, -leny * .45, -lenz * .25);
			addtocart2.rotation.x = WTW.getRadians(-90);
			addtocart2.parent = basemold;

			var coveringcart2 = new BABYLON.StandardMaterial("mat" + moldname + "-cartimage2texture", scene);
			coveringcart2.alpha = 1;
			coveringcart2.specularColor = new BABYLON.Color3(.2, .2, .2);
			coveringcart2.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
			coveringcart2.diffuseColor = new BABYLON.Color3(.9, .9, .9);
			var contentTexture2 = new BABYLON.DynamicTexture(moldname + "-cartimage2texture", {width: 512,height: 512}, scene, true);
			contentTexture2.name = moldname + "-cartimage2texture";
			//contentTexture2.hasAlpha = true;
			coveringcart2.diffuseTexture = contentTexture2;
			coveringcart2.diffuseTexture.vScale = .2;
			coveringcart2.diffuseTexture.uScale = 1;
			coveringcart2.diffuseTexture.vOffset = .85;
			addtocart2.material = coveringcart2;
			WTW.wrapText(addtocart2, "Add to Cart", "60px", "70px", "center", "top", "green", 0, 0);
			WTW.registerMouseOver(addtocart2);

			var addtocart2hover = BABYLON.MeshBuilder.CreateBox(moldname + "-addtocart2hover", {}, scene);
			addtocart2hover.scaling = new BABYLON.Vector3(lenx * .1, lenz * .37, leny * .099);
			addtocart2hover.position = new BABYLON.Vector3(-lenx * .49, -leny * .45, -lenz * .25);
			addtocart2hover.rotation.x = WTW.getRadians(-90);
			addtocart2hover.parent = basemold;

			var coveringcart2hover = new BABYLON.StandardMaterial("mat" + moldname + "-cartimage2texturehover", scene);
			coveringcart2hover.alpha = 1;
			coveringcart2hover.specularColor = new BABYLON.Color3(.2, .2, .2);
			coveringcart2hover.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
			coveringcart2hover.diffuseColor = new BABYLON.Color3(.9, .9, .9);
			var contentTexture2hover = new BABYLON.DynamicTexture(moldname + "-cartimage2texturehover", {width: 512,height: 512}, scene, true);
			contentTexture2hover.name = moldname + "-cartimage2texturehover";
			contentTexture2hover.hasAlpha = true;
			coveringcart2hover.diffuseTexture = contentTexture2hover;
			coveringcart2hover.diffuseTexture.vScale = .2;
			coveringcart2hover.diffuseTexture.uScale = 1;
			coveringcart2hover.diffuseTexture.vOffset = .85;
			addtocart2hover.material = coveringcart2hover;
			WTW.wrapText(addtocart2hover, "Add to Cart", "60px", "70px", "center", "top", "yellow", 0, 0);		

			var readmore1 = BABYLON.MeshBuilder.CreateBox(moldname + "-readmore1", {}, scene);
			readmore1.scaling = new BABYLON.Vector3(lenx * .1, lenz * .37, leny * .099);
			readmore1.position = new BABYLON.Vector3(lenx * .5, -leny * .45, -lenz * .25);
			readmore1.rotation.x = WTW.getRadians(90);
			readmore1.parent = basemold;

			var coveringread1 = new BABYLON.StandardMaterial("mat" + moldname + "-readimage1texture", scene);
			coveringread1.alpha = .7;
			coveringread1.specularColor = new BABYLON.Color3(.2, .2, .2);
			coveringread1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
			coveringread1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
			var readTexture1 = new BABYLON.DynamicTexture(moldname + "-readimage1texture", {width: 512,height: 512}, scene, true);
			readTexture1.name = moldname + "-readimage1texture";
			//readTexture1.hasAlpha = true;
			coveringread1.diffuseTexture = readTexture1;
			coveringread1.diffuseTexture.vScale = .2;
			coveringread1.diffuseTexture.uScale = 1;
			coveringread1.diffuseTexture.vOffset = .85;
			readmore1.material = coveringread1;
			WTW.wrapText(readmore1, "Read More...", "60px", "70px", "center", "top", "white", 0, 0);
			WTW.registerMouseOver(readmore1);

			var readmore1hover = BABYLON.MeshBuilder.CreateBox(moldname + "-readmore1hover", {}, scene);
			readmore1hover.scaling = new BABYLON.Vector3(lenx * .1, lenz * .37, leny * .099);
			readmore1hover.position = new BABYLON.Vector3(lenx * .49, -leny * .45, -lenz * .25);
			readmore1hover.rotation.x = WTW.getRadians(90);
			readmore1hover.parent = basemold;

			var coveringread1hover = new BABYLON.StandardMaterial("mat" + moldname + "-readimage1texturehover", scene);
			coveringread1hover.alpha = 1;
			coveringread1hover.specularColor = new BABYLON.Color3(.2, .2, .2);
			coveringread1hover.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
			coveringread1hover.diffuseColor = new BABYLON.Color3(.9, .9, .9);
			var readTexture1hover = new BABYLON.DynamicTexture(moldname + "-readimage1texturehover", {width: 512,height: 512}, scene, true);
			readTexture1hover.name = moldname + "-readimage1texturehover";
			readTexture1hover.hasAlpha = true;
			coveringread1hover.diffuseTexture = readTexture1hover;
			coveringread1hover.diffuseTexture.vScale = .2;
			coveringread1hover.diffuseTexture.uScale = 1;
			coveringread1hover.diffuseTexture.vOffset = .85;
			readmore1hover.material = coveringread1hover;
			WTW.wrapText(readmore1hover, "Read More...", "60px", "70px", "center", "top", "yellow", 0, 0);

			var readmore2 = BABYLON.MeshBuilder.CreateBox(moldname + "-readmore2", {}, scene);
			readmore2.scaling = new BABYLON.Vector3(lenx * .1, lenz * .37, leny * .099);
			readmore2.position = new BABYLON.Vector3(-lenx * .5, -leny * .45, lenz * .25);
			readmore2.rotation.x = WTW.getRadians(-90);
			readmore2.parent = basemold;

			var coveringread2 = new BABYLON.StandardMaterial("mat" + moldname + "-readimage2texture", scene);
			coveringread2.alpha = .7;
			coveringread2.specularColor = new BABYLON.Color3(.2, .2, .2);
			coveringread2.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
			coveringread2.diffuseColor = new BABYLON.Color3(.9, .9, .9);
			var readTexture2 = new BABYLON.DynamicTexture(moldname + "-readimage2texture", {width: 512,height: 512}, scene, true);
			readTexture2.name = moldname + "-readimage2texture";
			//readTexture2.hasAlpha = true;
			coveringread2.diffuseTexture = readTexture2;
			coveringread2.diffuseTexture.vScale = .2;
			coveringread2.diffuseTexture.uScale = 1;
			coveringread2.diffuseTexture.vOffset = .85;
			readmore2.material = coveringread2;
			WTW.wrapText(readmore2, "Read More...", "60px", "70px", "center", "top", "white", 0, 0);
			WTW.registerMouseOver(readmore2);

			var readmore2hover = BABYLON.MeshBuilder.CreateBox(moldname + "-readmore2hover", {}, scene);
			readmore2hover.scaling = new BABYLON.Vector3(lenx * .1, lenz * .37, leny * .099);
			readmore2hover.position = new BABYLON.Vector3(-lenx * .49, -leny * .45, lenz * .25);
			readmore2hover.rotation.x = WTW.getRadians(-90);
			readmore2hover.parent = basemold;

			var coveringread2hover = new BABYLON.StandardMaterial("mat" + moldname + "-readimage2texturehover", scene);
			coveringread2hover.alpha = 1;
			coveringread2hover.specularColor = new BABYLON.Color3(.2, .2, .2);
			coveringread2hover.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
			coveringread2hover.diffuseColor = new BABYLON.Color3(.9, .9, .9);
			var readTexture2hover = new BABYLON.DynamicTexture(moldname + "-readimage2texturehover", {width: 512,height: 512}, scene, true);
			readTexture2hover.name = moldname + "-readimage2texturehover";
			readTexture2hover.hasAlpha = true;
			coveringread2hover.diffuseTexture = readTexture2hover;
			coveringread2hover.diffuseTexture.vScale = .2;
			coveringread2hover.diffuseTexture.uScale = 1;
			coveringread2hover.diffuseTexture.vOffset = .85;
			readmore2hover.material = coveringread2hover;
			WTW.wrapText(readmore2hover, "Read More...", "60px", "70px", "center", "top", "yellow", 0, 0);
			
			var descimage1 = BABYLON.MeshBuilder.CreateBox(moldname + "-descimage1", {}, scene);
			descimage1.scaling = new BABYLON.Vector3(lenx * .15, lenz * .89, leny * .75);
			descimage1.position = new BABYLON.Vector3(lenx * .481, 0, 0);
			descimage1.rotation.x = WTW.getRadians(90);
			descimage1.parent = basemold;
			WTW.registerMouseOver(descimage1);

			var descimage2 = BABYLON.MeshBuilder.CreateBox(moldname + "-descimage2", {}, scene);
			descimage2.scaling = new BABYLON.Vector3(lenx * .15, lenz * .89, leny * .75);
			descimage2.position = new BABYLON.Vector3(-lenx * .481, 0, 0);
			descimage2.rotation.x = WTW.getRadians(-90);
			descimage2.parent = basemold;
			WTW.registerMouseOver(descimage2);

		} else { /* all other displays are loaded 3D Objects */
			var zfolder = '/content/plugins/wtw-shopping/assets/3dobjects/';
			var zfile = '';
			switch (special1) {
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
						var objectanimations = [];
						var zdisplaytype = special1;
						
						/* add object animations using WTW.newObjectAnimation(); */
						objectanimations[0] = WTW.newObjectAnimation();
						objectanimations[0].animationname = 'readme1OnLoad';
						objectanimations[0].moldevent = 'onload';
						objectanimations[0].moldnamepart = 'readmore1';
						switch (zdisplaytype) {
							case 2:
							case 3:
								objectanimations[0].startframe = 40;
								objectanimations[0].endframe = 45;
								break;
							default:
								objectanimations[0].startframe = 20;
								objectanimations[0].endframe = 20;
								break;
						}
						objectanimations[0].animationloop = false;
						objectanimations[0].speedratio = 1.00;
						objectanimations[0].additionalscript = '';
						objectanimations[0].additionalparameters = '';
						
						objectanimations[1] = WTW.newObjectAnimation();
						objectanimations[1].animationname = 'readMore1OnClick';
						objectanimations[1].moldevent = 'onclick';
						objectanimations[1].moldnamepart = 'readmore1';
						switch (zdisplaytype) {
							case 2:
							case 3:
								objectanimations[1].startframe = 50;
								objectanimations[1].endframe = 55;
								break;
							default:
								objectanimations[1].startframe = 20;
								objectanimations[1].endframe = 39;
								break;
						}
						objectanimations[1].animationloop = false;
						objectanimations[1].speedratio = .50;
						objectanimations[1].additionalscript = 'WTWShopping.productReadMore';
						objectanimations[1].additionalparameters = moldname + "-readmore1";

						objectanimations[2] = WTW.newObjectAnimation();
						objectanimations[2].animationname = 'readMore1OnClick';
						objectanimations[2].moldevent = 'onclick';
						objectanimations[2].moldnamepart = 'readmoretext1';
						switch (zdisplaytype) {
							case 2:
							case 3:
								objectanimations[2].startframe = 50;
								objectanimations[2].endframe = 55;
								break;
							default:
								objectanimations[2].startframe = 20;
								objectanimations[2].endframe = 39;
								break;
						}
						objectanimations[2].animationloop = false;
						objectanimations[2].speedratio = .50;
						objectanimations[2].additionalscript = 'WTWShopping.productReadMore';
						objectanimations[2].additionalparameters = moldname + "-readmore1";

						objectanimations[3] = WTW.newObjectAnimation();
						objectanimations[3].animationname = 'AddToCart1OnLoad';
						objectanimations[3].moldevent = 'onload';
						objectanimations[3].moldnamepart = 'addtocart1';
						switch (zdisplaytype) {
							case 2:
							case 3:
								objectanimations[3].startframe = 1;
								objectanimations[3].endframe = 5;
								break;
							default:
								objectanimations[3].startframe = 0;
								objectanimations[3].endframe = 0;
								break;
						}
						objectanimations[3].animationloop = false;
						objectanimations[3].speedratio = 1.00;
						objectanimations[3].additionalscript = '';
						objectanimations[3].additionalparameters = 'addtocart';
						
						objectanimations[4] = WTW.newObjectAnimation();
						objectanimations[4].animationname = 'addToCart1OnClick';
						objectanimations[4].moldevent = 'onclick';
						objectanimations[4].moldnamepart = 'addtocart1';
						switch (zdisplaytype) {
							case 2:
							case 3:
								objectanimations[4].startframe = 10;
								objectanimations[4].endframe = 15;
								break;
							default:
								objectanimations[4].startframe = 0;
								objectanimations[4].endframe = 19;
								break;
						}
						objectanimations[4].animationloop = false;
						objectanimations[4].speedratio = .50;
						objectanimations[4].additionalscript = 'WTWShopping.productAddToCart';
						objectanimations[4].additionalparameters = moldname + "-addtocart1";
						
						objectanimations[5] = WTW.newObjectAnimation();
						objectanimations[5].animationname = 'addToCart1OnClick';
						objectanimations[5].moldevent = 'onclick';
						objectanimations[5].moldnamepart = 'addtocarttext1';
						switch (zdisplaytype) {
							case 2:
							case 3:
								objectanimations[5].startframe = 10;
								objectanimations[5].endframe = 15;
								break;
							default:
								objectanimations[5].startframe = 0;
								objectanimations[5].endframe = 19;
								break;
						}
						objectanimations[5].animationloop = false;
						objectanimations[5].speedratio = .50;
						objectanimations[5].additionalscript = 'WTWShopping.productAddToCart';
						objectanimations[5].additionalparameters = moldname + "-addtocart1";
						
						if (special1 != 1) {
							objectanimations[6] = WTW.newObjectAnimation();
							objectanimations[6].animationname = 'readme2OnLoad';
							objectanimations[6].moldevent = 'onload';
							objectanimations[6].moldnamepart = 'readmore2';
							switch (zdisplaytype) {
								case 2:
								case 3:
									objectanimations[6].startframe = 60;
									objectanimations[6].endframe = 65;
									break;
								default:
									objectanimations[6].startframe = 60;
									objectanimations[6].endframe = 60;
									break;
							}
							objectanimations[6].animationloop = false;
							objectanimations[6].speedratio = 1.00;
							objectanimations[6].additionalscript = '';
							objectanimations[6].additionalparameters = '';
							
							objectanimations[7] = WTW.newObjectAnimation();
							objectanimations[7].animationname = 'readMore2OnClick';
							objectanimations[7].moldevent = 'onclick';
							objectanimations[7].moldnamepart = 'readmore2';
							switch (zdisplaytype) {
								case 2:
								case 3:
									objectanimations[7].startframe = 70;
									objectanimations[7].endframe = 75;
									break;
								default:
									objectanimations[7].startframe = 60;
									objectanimations[7].endframe = 79;
									break;
							}
							objectanimations[7].animationloop = false;
							objectanimations[7].speedratio = .50;
							objectanimations[7].additionalscript = 'WTWShopping.productReadMore';
							objectanimations[7].additionalparameters = moldname + "-readmore2";
							
							objectanimations[8] = WTW.newObjectAnimation();
							objectanimations[8].animationname = 'readMore2OnClick';
							objectanimations[8].moldevent = 'onclick';
							objectanimations[8].moldnamepart = 'readmoretext2';
							switch (zdisplaytype) {
								case 2:
								case 3:
									objectanimations[8].startframe = 70;
									objectanimations[8].endframe = 75;
									break;
								default:
									objectanimations[8].startframe = 60;
									objectanimations[8].endframe = 79;
									break;
							}
							objectanimations[8].animationloop = false;
							objectanimations[8].speedratio = .50;
							objectanimations[8].additionalscript = 'WTWShopping.productReadMore';
							objectanimations[8].additionalparameters = moldname + "-readmore2";
							
							objectanimations[9] = WTW.newObjectAnimation();
							objectanimations[9].animationname = 'AddToCart2OnLoad';
							objectanimations[9].moldevent = 'onload';
							objectanimations[9].moldnamepart = 'addtocart2';
							switch (zdisplaytype) {
								case 2:
								case 3:
									objectanimations[9].startframe = 20;
									objectanimations[9].endframe = 25;
									break;
								default:
									objectanimations[9].startframe = 40;
									objectanimations[9].endframe = 40;
									break;
							}
							objectanimations[9].animationloop = false;
							objectanimations[9].speedratio = 1.00;
							objectanimations[9].additionalscript = '';
							objectanimations[9].additionalparameters = '';

							objectanimations[10] = WTW.newObjectAnimation();
							objectanimations[10].animationname = 'addToCart2OnClick';
							objectanimations[10].moldevent = 'onclick';
							objectanimations[10].moldnamepart = 'addtocart2';
							switch (zdisplaytype) {
								case 2:
								case 3:
									objectanimations[10].startframe = 30;
									objectanimations[10].endframe = 35;
									break;
								default:
									objectanimations[10].startframe = 40;
									objectanimations[10].endframe = 59;
									break;
							}
							objectanimations[10].animationloop = false;
							objectanimations[10].speedratio = .50;
							objectanimations[10].additionalscript = 'WTWShopping.productAddToCart';
							objectanimations[10].additionalparameters = moldname + "-addtocart2";

							objectanimations[11] = WTW.newObjectAnimation();
							objectanimations[11].animationname = 'addToCart2OnClick';
							objectanimations[11].moldevent = 'onclick';
							objectanimations[11].moldnamepart = 'addtocarttext2';
							switch (zdisplaytype) {
								case 2:
								case 3:
									objectanimations[11].startframe = 30;
									objectanimations[11].endframe = 35;
									break;
								default:
									objectanimations[11].startframe = 40;
									objectanimations[11].endframe = 59;
									break;
							}
							objectanimations[11].animationloop = false;
							objectanimations[11].speedratio = .50;
							objectanimations[11].additionalscript = 'WTWShopping.productAddToCart';
							objectanimations[11].additionalparameters = moldname + "-addtocart2";						
						}

						for (var i=0; i < zresults.meshes.length; i++) {
							if (zresults.meshes[i] != null) {
								var meshname = zresults.meshes[i].name.toLowerCase();
								var childmoldname = moldname + "-" + meshname;
								zresults.meshes[i].name = childmoldname;
								zresults.meshes[i].id = childmoldname;
								zresults.meshes[i].isPickable = true;
								WTW.registerMouseOver(zresults.meshes[i]);
								if (zresults.meshes[i].parent == null) {
									zresults.meshes[i].parent = mold;
									/* zresults.meshes[i].rotation.x = WTW.getRadians(0); */
									/* zresults.meshes[i].rotation.y = WTW.getRadians(180); */
/*									zresults.meshes[i].scaling.y = .5;
									zresults.meshes[i].scaling.x = .5;
									zresults.meshes[i].scaling.z = .5;
*/								}
								if (zresults.meshes[i].material != null) {
									if (meshname == 'readmore1' || meshname == 'readmore2' || meshname == 'addtocart1' || meshname == 'addtocart2') {
										zresults.meshes[i].material.emissiveColor = new BABYLON.Color3(.7,.7,.7);
									} else if (meshname == 'readmoretext1' || meshname == 'readmoretext2' || meshname == 'addtocarttext1' || meshname == 'addtocarttext2') {
										zresults.meshes[i].material.emissiveColor = new BABYLON.Color3(0,0,0);
										zresults.meshes[i].material.diffuseColor = new BABYLON.Color3(0,0,0);
										zresults.meshes[i].material.specularColor = new BABYLON.Color3(0,0,0);
										zresults.meshes[i].material.ambientColor = new BABYLON.Color3(0,0,0);
									} else if (meshname == 'displaycase') {
										zresults.meshes[i].material.emissiveColor = new BABYLON.Color3(.3,.3,.3);
									}
								}

								if (objectanimations != null) {
									WTW.addMoldAnimation(moldname, meshname, zresults.meshes[i], objectanimations);
								}
								if (meshname == 'displayframe' || meshname == 'displayrim') {
									var covering = new BABYLON.StandardMaterial("mat" + moldname, scene);
									covering.specularColor = new BABYLON.Color3(Number(molddef.color.specular.r), Number(molddef.color.specular.g), Number(molddef.color.specular.b));
									covering.emissiveColor = new BABYLON.Color3(Number(molddef.color.emissive.r), Number(molddef.color.emissive.g), Number(molddef.color.emissive.b));
									covering.diffuseColor = new BABYLON.Color3(Number(molddef.color.diffuse.r), Number(molddef.color.diffuse.g), Number(molddef.color.diffuse.b));
									zresults.meshes[i].material = covering;
								}
							}
						}
						mold.isPickable = false;
						WTWShopping.getStoreMolds(moldname);
					}
				}
			);		
			
			if (special1 == 0 || special1 == 1) { /* round product display */
				var titlemold = BABYLON.MeshBuilder.CreatePlane(moldname + "-titleimagesm", {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
				titlemold.scaling = new BABYLON.Vector3(lenx * 1.2, lenz * .24, .1);
				titlemold.position = new BABYLON.Vector3(0, leny * 1.86, -lenz * 0.125);
				titlemold.parent = basemold;

				var pricemold = BABYLON.MeshBuilder.CreatePlane(moldname + "-price1", {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
				pricemold.scaling = new BABYLON.Vector3(lenx * .55, lenz * .24, .1);
				pricemold.position = new BABYLON.Vector3(lenx * .3, leny * .43, -lenz * 0.1);
				pricemold.parent = basemold;

				var molddefclickimage = WTW.newMold();
				molddefclickimage.shape = "plane";
				molddefclickimage.covering = "2d texture";
				molddefclickimage.position.x = -(lenx * 1.1)/2;
				molddefclickimage.position.y = 0;
				molddefclickimage.position.z = 0;
				molddefclickimage.scaling.x = lenz - .2;
				molddefclickimage.scaling.y = leny * .8;
				molddefclickimage.scaling.z = .1;
				molddefclickimage.subdivisions = 12;
				molddefclickimage.opacity = 1;
				molddefclickimage.graphics.texture.id = '';
				molddefclickimage.graphics.texture.path = imageclickpath;
				molddefclickimage.graphics.uscale = 10/leny;
				molddefclickimage.graphics.vscale = 10/lenz;
				molddefclickimage.parentname = moldname + "-base";
				molddefclickimage.checkcollisions = "1";
				var clickimagemold = BABYLON.MeshBuilder.CreatePlane(moldname + "-clickimage", {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
				clickimagemold.scaling = new BABYLON.Vector3(lenx * 1.15, leny * 1.15, .1);
				clickimagemold.position = new BABYLON.Vector3(0, leny * 1.15, -lenz * .05);
				clickimagemold.parent = basemold; 

				if (special1 == 0) {
					titlemold.position = new BABYLON.Vector3(0, leny * 1.86, -lenz * 0.28);
					pricemold.position = new BABYLON.Vector3(lenx * .3, leny * .43, -lenz * 0.25);
					clickimagemold.position = new BABYLON.Vector3(0, leny * 1.15, -lenz * .2);

					var titlemold2 = BABYLON.MeshBuilder.CreatePlane(moldname + "-titleimage2sm", {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
					titlemold2.scaling = new BABYLON.Vector3(lenx * 1.2, lenz * .24, .1);
					titlemold2.position = new BABYLON.Vector3(0, leny * 1.86, lenz * 0.28);
					titlemold2.rotation.y = WTW.getRadians(180);
					titlemold2.parent = basemold;

					var pricemold2 = BABYLON.MeshBuilder.CreatePlane(moldname + "-price2", {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
					pricemold2.scaling = new BABYLON.Vector3(lenx * .55, lenz * .24, .1);
					pricemold2.position = new BABYLON.Vector3(-lenx * .3, leny * .43, lenz * 0.25);
					pricemold2.rotation.y = WTW.getRadians(180);
					pricemold2.parent = basemold;

					var molddefclickimage2 = WTW.newMold();
					molddefclickimage2.shape = "plane";
					molddefclickimage2.covering = "2d texture";
					molddefclickimage2.position.x = -(lenx * 1.1)/2;
					molddefclickimage2.position.y = 0;
					molddefclickimage2.position.z = 0;
					molddefclickimage2.scaling.x = lenz - .2;
					molddefclickimage2.scaling.y = leny * .8;
					molddefclickimage2.scaling.z = .1;
					molddefclickimage2.subdivisions = 12;
					molddefclickimage2.opacity = 1;
					molddefclickimage2.graphics.texture.id = '';
					molddefclickimage2.graphics.texture.path = imageclickpath;
					molddefclickimage2.graphics.uscale = 10/leny;
					molddefclickimage2.graphics.vscale = 10/lenz;
					molddefclickimage2.parentname = moldname + "-base";
					molddefclickimage2.checkcollisions = "1";
					var clickimagemold2 = BABYLON.MeshBuilder.CreatePlane(moldname + "-clickimage2", {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
					clickimagemold2.scaling = new BABYLON.Vector3(lenx * 1.15, leny * 1.15, .1);
					clickimagemold2.position = new BABYLON.Vector3(0, leny * 1.15, lenz * .2);
					clickimagemold2.rotation.y = WTW.getRadians(180);
					clickimagemold2.parent = basemold; 
				}
			}
			if (special1 == 2) { /* box product display */
				var titlemold = BABYLON.MeshBuilder.CreateBox(moldname + "-titleimagesm", {}, scene);
				titlemold.scaling = new BABYLON.Vector3(lenx * .1, lenz * .86,leny * .1);
				titlemold.position = new BABYLON.Vector3(lenx * .36, -leny * .16, 0);
				titlemold.rotation.x = WTW.getRadians(90);
				titlemold.parent = basemold;

				var titlemold2 = BABYLON.MeshBuilder.CreateBox(moldname + "-titleimage2sm", {}, scene);
				titlemold2.scaling = new BABYLON.Vector3(lenx * .1, lenz * .86,leny * .1);
				titlemold2.position = new BABYLON.Vector3(-lenx * .36, -leny * .16, 0);
				titlemold2.rotation.x = WTW.getRadians(-90);
				titlemold2.parent = basemold;
				
				var pricemold = BABYLON.MeshBuilder.CreateBox(moldname + "-price1", {}, scene);
				pricemold.scaling = new BABYLON.Vector3(lenx * .1, lenz * .65,leny * .08);
				pricemold.position = new BABYLON.Vector3(lenx * .36, -leny * .36, 0);
				pricemold.rotation.x = WTW.getRadians(90);
				pricemold.parent = basemold;

				var pricemold2 = BABYLON.MeshBuilder.CreateBox(moldname + "-price2", {}, scene);
				pricemold2.scaling = new BABYLON.Vector3(lenx * .1, lenz * .65,leny * .08);
				pricemold2.position = new BABYLON.Vector3(-lenx * .36, -leny * .36, 0);
				pricemold2.rotation.x = WTW.getRadians(-90);
				pricemold2.parent = basemold;
				WTWShopping.getStoreMolds(moldname); 
			} else if (special1 == 3 || special1 == 4) {
				var molddefclickimage = WTW.newMold();
				molddefclickimage.shape = "plane";
				molddefclickimage.covering = "2d texture";
				molddefclickimage.position.x = -(lenx * .2);
				molddefclickimage.position.y = 0;
				molddefclickimage.position.z = 0;
				molddefclickimage.scaling.x = lenz *.9;
				molddefclickimage.scaling.y = leny * .8;
				molddefclickimage.scaling.z = .1;
				molddefclickimage.subdivisions = 12;
				molddefclickimage.opacity = 1;
				molddefclickimage.graphics.texture.id = '';
				molddefclickimage.graphics.texture.path = imageclickpath;
				molddefclickimage.graphics.uscale = 10/leny;
				molddefclickimage.graphics.vscale = 10/lenz;
				molddefclickimage.parentname = moldname + "-base";
				molddefclickimage.checkcollisions = "1";
				var clickimagemold = BABYLON.MeshBuilder.CreatePlane(moldname + "-clickimage", {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
				clickimagemold.scaling = new BABYLON.Vector3(lenz * .9, leny * .8, .1);
				clickimagemold.rotation.y = WTW.getRadians(90);
				clickimagemold.position.x = -(lenx * .2);
				clickimagemold.parent = basemold;			

				var molddefclickimage2 = WTW.newMold();
				molddefclickimage2.shape = "plane";
				molddefclickimage2.covering = "2d texture";
				molddefclickimage2.position.x = (lenx * .2);
				molddefclickimage2.position.y = 0;
				molddefclickimage2.position.z = 0;
				molddefclickimage2.scaling.x = lenz * .9;
				molddefclickimage2.scaling.y = leny * .8;
				molddefclickimage2.scaling.z = .1;
				molddefclickimage2.subdivisions = 12;
				molddefclickimage2.opacity = 1;
				molddefclickimage2.graphics.texture.id = '';
				molddefclickimage2.graphics.texture.path = imageclickpath;
				molddefclickimage2.graphics.uscale = 10/leny;
				molddefclickimage2.graphics.vscale = 10/lenz;
				molddefclickimage2.parentname = moldname + "-base";
				molddefclickimage2.checkcollisions = "1";
				var clickimagemold2 = BABYLON.MeshBuilder.CreatePlane(moldname + "-clickimage2", {updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE}, scene);
				clickimagemold2.scaling = new BABYLON.Vector3(lenz * .9, leny * .8, .1);
				clickimagemold2.rotation.y = WTW.getRadians(-90);
				clickimagemold2.position.x = (lenx * .2);
				clickimagemold2.parent = basemold;

				var titlemold = BABYLON.MeshBuilder.CreateBox(moldname + "-titleimagesm", {}, scene);
				titlemold.scaling = new BABYLON.Vector3(lenx * .1, lenz * .86,leny * .1);
				titlemold.position = new BABYLON.Vector3(lenx * .36, leny * .49, 0);
				titlemold.rotation.x = WTW.getRadians(90);
				titlemold.parent = basemold;

				var titlemold2 = BABYLON.MeshBuilder.CreateBox(moldname + "-titleimage2sm", {}, scene);
				titlemold2.scaling = new BABYLON.Vector3(lenx * .1, lenz * .86,leny * .1);
				titlemold2.position = new BABYLON.Vector3(-lenx * .36, leny * .49, 0);
				titlemold2.rotation.x = WTW.getRadians(-90);
				titlemold2.parent = basemold;
				
				var descimage1 = BABYLON.MeshBuilder.CreateBox(moldname + "-descimage1", {}, scene);
				descimage1.scaling = new BABYLON.Vector3(lenx * .08, lenz * .84, leny * .7);
				descimage1.position = new BABYLON.Vector3(lenx * .21, leny * .02, 0);
				descimage1.rotation.x = WTW.getRadians(90);
				descimage1.parent = basemold;
				WTW.registerMouseOver(descimage1);

				var descimage2 = BABYLON.MeshBuilder.CreateBox(moldname + "-descimage2", {}, scene);
				descimage2.scaling = new BABYLON.Vector3(lenx * .08, lenz * .84, leny * .7);
				descimage2.position = new BABYLON.Vector3(-lenx * .21, leny * .02, 0);
				descimage2.rotation.x = WTW.getRadians(-90);
				descimage2.parent = basemold;
				WTW.registerMouseOver(descimage2);
				
				var pricemold = BABYLON.MeshBuilder.CreateBox(moldname + "-price1", {}, scene);
				pricemold.scaling = new BABYLON.Vector3(lenx * .1, lenz * .65,leny * .08);
				pricemold.position = new BABYLON.Vector3(lenx * .36, -leny * .36, 0);
				pricemold.rotation.x = WTW.getRadians(90);
				pricemold.parent = basemold;

				var pricemold2 = BABYLON.MeshBuilder.CreateBox(moldname + "-price2", {}, scene);
				pricemold2.scaling = new BABYLON.Vector3(lenx * .1, lenz * .65,leny * .08);
				pricemold2.position = new BABYLON.Vector3(-lenx * .36, -leny * .36, 0);
				pricemold2.rotation.x = WTW.getRadians(-90);
				pricemold2.parent = basemold;
				WTWShopping.getStoreMolds(moldname);
			} 
		}
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStoreProduct=" + ex.message);
	}
	return mold;
}

wtwshopping.prototype.addMoldStoreSign = function(moldname, molddef, lenx, leny, lenz) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,leny,lenz);
		mold.material = new BABYLON.StandardMaterial("mat" + moldname, scene);
		mold.material.alpha = 0;
		var basemold = BABYLON.MeshBuilder.CreateBox(moldname + "-base", {}, scene);
		basemold.scaling = new BABYLON.Vector3(1/lenx,1/leny,1/lenz);
		basemold.material = new BABYLON.StandardMaterial("matbase" + moldname, scene);
		basemold.material.alpha = 0;
		basemold.parent = mold;

		var textureid = "t1qlqxd6pzubzzzy";
		var texturepath = "/content/system/stock/lightgray-512x447.jpg";
		
		if (molddef.graphics.texture.id != undefined) {
			if (molddef.graphics.texture.id != "") {
				textureid = molddef.graphics.texture.id;
			}
		}
		if (molddef.graphics.texture.path != undefined) {
			if (molddef.graphics.texture.path != "") {
				texturepath = molddef.graphics.texture.path;
				texturepath = texturepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
			}
		}
		
		var molddefframe = WTW.newMold();
		molddefframe.shape = "box";
		molddefframe.covering = molddef.covering;
		molddefframe.position.x = 0;
		molddefframe.position.y = 0;
		molddefframe.position.z = 0;
		molddefframe.color = molddef.color;
		molddefframe.scaling.x = lenx;
		molddefframe.scaling.y = leny;
		molddefframe.scaling.z = lenz;
		molddefframe.subdivisions = 12;
		molddefframe.graphics.texture.id = textureid;
		molddefframe.graphics.texture.path = texturepath;
		molddefframe.graphics.uscale = 10/leny;
		molddefframe.graphics.vscale = 10/lenz;
		molddefframe.parentname = moldname + "-base";
		molddefframe.checkcollisions = "1";
		var imageframemold = BABYLON.MeshBuilder.CreateBox(moldname + "-imageframe", {}, scene);
		imageframemold.scaling = new BABYLON.Vector3(lenx, leny, lenz);
		imageframemold.position = new BABYLON.Vector3(0, 0, 0);
		imageframemold.material = WTW.addCovering(molddef.covering, moldname + "-imageframe", molddefframe, lenx, leny, lenz, '0', '0');
		imageframemold.parent = basemold;			
	
		var titlemold2 = BABYLON.MeshBuilder.CreateBox(moldname + "-titleimage2", {}, scene);
		titlemold2.scaling = new BABYLON.Vector3(lenx, lenz * .9, leny * .9);
		titlemold2.position = new BABYLON.Vector3(-lenx * .1, 0, 0);
		titlemold2.rotation.x = WTW.getRadians(-90);
		titlemold2.parent = basemold;

		var coveringtitle1 = new BABYLON.StandardMaterial("mat" + moldname + "-titleimage1texture", scene);
		coveringtitle1.alpha = 1;
		coveringtitle1.specularColor = new BABYLON.Color3(.2, .2, .2);
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
		
		WTWShopping.getStoreInfo(moldname);
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStoreSign=" + ex.message);
	}
	return mold;
}

wtwshopping.prototype.addMoldStore3DSign = function(moldname, molddef, lenx, leny, lenz) {
	var mold;
	try {
		var buildingname = "Store Name";
		var foundbuildingname = WTWShopping.getBuildingNameFromConnectingGrid(molddef.buildinginfo.buildingid);
		if (foundbuildingname != "") {
			buildingname = foundbuildingname;
		}
		molddef.webtext.webtext = buildingname;
		mold = WTW.addMold3DText(moldname, molddef, lenx, leny, lenz);
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStore3DSign=" + ex.message);
	}
	return mold;
}

wtwshopping.prototype.addMoldStoreViewCart = function(moldname, molddef, lenx, leny, lenz) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,leny,lenz);
		mold.material = new BABYLON.StandardMaterial("mat" + moldname, scene);
		mold.material.alpha = 0;
		var basemold = BABYLON.MeshBuilder.CreateBox(moldname + "-base", {}, scene);
		basemold.scaling = new BABYLON.Vector3(1/lenx,1/leny,1/lenz);
		basemold.material = new BABYLON.StandardMaterial("matbase" + moldname, scene);
		basemold.material.alpha = 0;
		basemold.parent = mold;

		var textureid = "t1qlqxd6pzubzzzy";
		var texturepath = "/content/system/stock/lightgray-512x447.jpg";
		
		if (molddef.graphics.texture.id != undefined) {
			if (molddef.graphics.texture.id != "") {
				textureid = molddef.graphics.texture.id;
			}
		}
		if (molddef.graphics.texture.path != undefined) {
			if (molddef.graphics.texture.path != "") {
				texturepath = molddef.graphics.texture.path;
				texturepath = texturepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
			}
		}

		var molddefframe = WTW.newMold();
		molddefframe.shape = "box";
		molddefframe.covering = molddef.covering;
		molddefframe.position.x = 0;
		molddefframe.position.y = 0;
		molddefframe.position.z = 0;
		molddefframe.color = molddef.color;
		molddefframe.scaling.x = lenx;
		molddefframe.scaling.y = leny;
		molddefframe.scaling.z = lenz;
		molddefframe.subdivisions = 12;
		molddefframe.graphics.texture.id = textureid;
		molddefframe.graphics.texture.path = texturepath;
		molddefframe.graphics.uscale = 10/leny;
		molddefframe.graphics.vscale = 10/lenz;
		molddefframe.parentname = moldname + "-base";
		molddefframe.checkcollisions = "1";
		var imageframemold = BABYLON.MeshBuilder.CreateBox(moldname + "-imageframe", {}, scene);
		imageframemold.scaling = new BABYLON.Vector3(lenx, leny, lenz);
		imageframemold.position = new BABYLON.Vector3(0, 0, 0);
		imageframemold.material = WTW.addCovering(molddef.covering, moldname + "-imageframe", molddefframe, lenx, leny, lenz, '0', '0');
		imageframemold.parent = basemold;	
		
	
		var titlemold2 = BABYLON.MeshBuilder.CreateBox(moldname + "-titleimage2", {}, scene);
		titlemold2.scaling = new BABYLON.Vector3(lenx, lenz * .9, leny * .9);
		titlemold2.position = new BABYLON.Vector3(-lenx * .1, 0, 0);
		titlemold2.rotation.x = WTW.getRadians(-90);
		titlemold2.parent = basemold;

		var coveringtitle1 = new BABYLON.StandardMaterial("mat" + moldname + "-titleimage1texture", scene);
		coveringtitle1.alpha = 1;
		coveringtitle1.specularColor = new BABYLON.Color3(.2, .2, .2);
		coveringtitle1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		coveringtitle1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
		var contentTexture1 = new BABYLON.DynamicTexture(moldname + "-titleimage1texture", {width: 512,height: 512}, scene, true);
		contentTexture1.name = moldname + "-titleimage1texture";
		/* contentTexture1.hasAlpha = true; */
		coveringtitle1.diffuseTexture = contentTexture1;
		coveringtitle1.diffuseTexture.vScale = .2;
		coveringtitle1.diffuseTexture.uScale = 1;
		coveringtitle1.diffuseTexture.vOffset = .8;
		titlemold2.material = coveringtitle1;
		WTW.wrapText(titlemold2, "Click here to", "30px", "30px", "center", "top", "white", 0, 0);
		WTW.wrapText(titlemold2, "View Shopping Cart", "85px", "50px", "center", "top", "yellow", 0, 0);

		var carthover = BABYLON.MeshBuilder.CreateBox(moldname + "-carthover", {}, scene);
		carthover.scaling = new BABYLON.Vector3(lenx, lenz * .89, leny * .89);
		carthover.position = new BABYLON.Vector3(-lenx * .12, 0, 0);
		carthover.rotation.x = WTW.getRadians(-90);
		carthover.parent = basemold;
		
		var carttexturehover = new BABYLON.StandardMaterial("mat" + moldname + "-carttexturehover", scene);
		carttexturehover.alpha = 0;
		carttexturehover.specularColor = new BABYLON.Color3(.2, .2, .2);
		carttexturehover.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		carttexturehover.diffuseColor = new BABYLON.Color3(.9, .9, .9);
		var contentTexture1hover = new BABYLON.DynamicTexture(moldname + "-carttexturehover", {width: 512,height: 512}, scene, true);
		contentTexture1hover.name = moldname + "-carttexturehover";
		/* contentTexture1hover.hasAlpha = true; */
		carttexturehover.diffuseTexture = contentTexture1hover;
		carttexturehover.diffuseTexture.vScale = .2;
		carttexturehover.diffuseTexture.uScale = 1;
		carttexturehover.diffuseTexture.vOffset = .8;
		carthover.material = carttexturehover;
		WTW.wrapText(carthover, "Click here to", "30px", "30px", "center", "top", "white", 0, 0);
		WTW.wrapText(carthover, "View Shopping Cart", "85px", "50px", "center", "top", "green", 0, 0);
		WTW.registerMouseOver(carthover);
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStoreViewCart=" + ex.message);
	}
	return mold;
}

wtwshopping.prototype.addMoldStoreCategories = function(moldname, molddef, lenx, leny, lenz) {
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx-.8,leny-.01,lenz-.01);
		/* mold.material = WTW.addCovering("hidden", moldname, molddef, lenx-.8, leny-.01, lenz-.01, "0", "0"); */
		mold.material = new BABYLON.StandardMaterial("mat" + moldname, scene);
		mold.material.alpha = 0;
		var basemold = BABYLON.MeshBuilder.CreateBox(moldname + "-base", {}, scene);
		basemold.scaling = new BABYLON.Vector3(1/(lenx-.8),1/(leny-.01),1/(lenz-.01));
		/* basemold.material = WTW.addCovering("hidden", moldname + "-base", molddef, lenx-.8, leny-.01, lenz-.01, "0", "0"); */
		basemold.material = new BABYLON.StandardMaterial("matbase" + moldname, scene);
		basemold.material.alpha = 0;
		basemold.parent = mold;

		var textureid = "t1qlqxd6pzubzzzy";
		var texturepath = "/content/system/stock/lightgray-512x447.jpg";
		
		if (molddef.graphics.texture.id != undefined) {
			if (molddef.graphics.texture.id != "") {
				textureid = molddef.graphics.texture.id;
			}
		}
		if (molddef.graphics.texture.path != undefined) {
			if (molddef.graphics.texture.path != "") {
				texturepath = molddef.graphics.texture.path;
				texturepath = texturepath.replace(wtw_domainname, window.location.hostname).replace("http:","").replace("https:","");
			}
		}

		var molddefframe = WTW.newMold();
		molddefframe.shape = "roundedbox";
		molddefframe.covering = molddef.covering;
		molddefframe.position.x = 0;
		molddefframe.position.y = 0;
		molddefframe.position.z = 0;
		molddefframe.color = molddef.color;
		molddefframe.scaling.x = lenx;
		molddefframe.scaling.y = leny;
		molddefframe.scaling.z = lenz;
		molddefframe.subdivisions = 12;
		molddefframe.graphics.texture.id = textureid;
		molddefframe.graphics.texture.path = texturepath;
		molddefframe.graphics.uscale = 10/leny;
		molddefframe.graphics.vscale = 10/lenz;
		molddefframe.parentname = moldname + "-base";
		molddefframe.checkcollisions = "1";
		var imageframemold = WTW.addMoldRoundedBox(moldname + "-imageframe", lenx, leny, lenz);
		imageframemold.scaling = new BABYLON.Vector3(lenx, leny, lenz);
		imageframemold.position = new BABYLON.Vector3(0, 0, 0);
		imageframemold.material = WTW.addCovering(molddef.covering, moldname + "-imageframe", molddefframe, lenx, leny, lenz, '0', '0');
		imageframemold.parent = basemold;	
		
		var imagecutout = BABYLON.MeshBuilder.CreateBox(moldname + "-imagecutout", {}, scene);
		imagecutout.scaling = new BABYLON.Vector3(1, leny - 3, lenz - .5);
		imagecutout.position = new BABYLON.Vector3(-lenx + .7, 0, 0);
		imagecutout.parent = basemold;
		
		var csgmaterial = imageframemold.material;
		var csgmain = BABYLON.CSG.FromMesh(imageframemold);
		var csgsub = BABYLON.CSG.FromMesh(imagecutout);
		var csgmerge;
		csgmerge = csgmain.subtract(csgsub);
		imageframemold.dispose();
		imagecutout.dispose();
		var newmold = csgmerge.toMesh(moldname + "-imageframe", csgmaterial, scene);
		newmold.parent = basemold;
	
		var titlemold = BABYLON.MeshBuilder.CreateBox(moldname + "-titleimage", {}, scene);
		titlemold.scaling = new BABYLON.Vector3(.2, 7, 1.4);
		titlemold.position = new BABYLON.Vector3(-lenx/2 + .08, leny/2 - .75, 0);
		titlemold.rotation.x = WTW.getRadians(-90);
		titlemold.parent = basemold;

		var coveringtitle1 = new BABYLON.StandardMaterial("mat" + moldname + "-titleimage1texture", scene);
		coveringtitle1.alpha = 1;
		coveringtitle1.specularColor = new BABYLON.Color3(.2, .2, .2);
		coveringtitle1.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		coveringtitle1.diffuseColor = new BABYLON.Color3(.9, .9, .9);
		var contentTexture1 = new BABYLON.DynamicTexture(moldname + "-titleimage1texture", {width: 512,height: 512}, scene, true);
		contentTexture1.name = moldname + "-titleimage1texture";
		/* contentTexture1.hasAlpha = true; */
		coveringtitle1.diffuseTexture = contentTexture1;
		coveringtitle1.diffuseTexture.vScale = .2;
		coveringtitle1.diffuseTexture.uScale = 1;
		coveringtitle1.diffuseTexture.vOffset = .78;
		titlemold.material = coveringtitle1;
		WTW.wrapText(titlemold, "Categories", "85px", "80px", "center", "top", "yellow", 0, 0);

		var titlemold2 = BABYLON.MeshBuilder.CreateBox(moldname + "-titleimage2", {}, scene);
		titlemold2.scaling = new BABYLON.Vector3(.2, 7, .6);
		titlemold2.position = new BABYLON.Vector3(-lenx/2 + .08, -leny/2 + .75, 0);
		titlemold2.rotation.x = WTW.getRadians(-90);
		titlemold2.parent = basemold;

		var coveringtitle2 = new BABYLON.StandardMaterial("mat" + moldname + "-titleimage2texture", scene);
		coveringtitle2.alpha = 1;
		coveringtitle2.specularColor = new BABYLON.Color3(.2, .2, .2);
		coveringtitle2.emissiveColor = new BABYLON.Color3(WTW.sun.intensity, WTW.sun.intensity, WTW.sun.intensity);
		coveringtitle2.diffuseColor = new BABYLON.Color3(.9, .9, .9);
		var contentTexture2 = new BABYLON.DynamicTexture(moldname + "-titleimage2texture", {width: 512,height: 512}, scene, true);
		contentTexture2.name = moldname + "-titleimage2texture";
		/* contentTexture2.hasAlpha = true; */
		coveringtitle2.diffuseTexture = contentTexture2;
		coveringtitle2.diffuseTexture.vScale = .10;
		coveringtitle2.diffuseTexture.uScale = 1;
		coveringtitle2.diffuseTexture.vOffset = .9;
		titlemold2.material = coveringtitle2;
		WTW.wrapText(titlemold2, "Select to update Store Products", "35px", "30px", "center", "top", "white", 0, 0);
		
		WTWShopping.productFetchCategories(moldname);
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStoreCategories=" + ex.message);
	}
	return mold;
}

wtwshopping.prototype.addMoldStoreSearch = function(moldname, molddef, lenx, leny, lenz) {
	/* not implemented yet */
	var mold;
	try {
		mold = BABYLON.MeshBuilder.CreateBox(moldname, {}, scene);
		mold.scaling = new BABYLON.Vector3(lenx,leny,lenz);
		mold.material = new BABYLON.StandardMaterial("mat" + moldname, scene);
		mold.material.alpha = 0;
	} catch (ex) {
		WTW.log("plugins:wtw-shopping:scripts-wtwshoppingmolds.js-addMoldStoreSearch=" + ex.message);
	}
	return mold;
}

wtwshopping.prototype.setNewMold = function(moldname, molds, moldind, rebuildmold) {
	try {
		if (molds[moldind] != null) {
			switch(molds[moldind].shape) {
				case "store3dsign":
					var webname = "Store Name";
					var foundname = WTW.getNameFromConnectingGrid(molds[moldind].communityinfo.communityid);
					if (foundname != "") {
						webname = foundname;
					}
					if (molds[moldind].webtext.webtext != webname) {
						molds[moldind].webtext.webtext = webname;
						rebuildmold = 1;
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
	return rebuildmold;
}


WTWJS.prototype.openHUDFollow = function() {
	/* new feature just beginning to be coded */
	try {
WTW.log("OPEN HUD");
		var zanchor = new BABYLON.TransformNode("");
		var zmanager = new BABYLON.GUI.GUI3DManager(scene);

		var zpanel = new BABYLON.GUI.PlanePanel();
		zpanel.margin = .25;
		zpanel.columns = 1;
		
		zmanager.addControl(zpanel);
		zpanel.linkToTransformNode(zanchor);
		zpanel.position.z = -1.5;
		zpanel.scaling = new BABYLON.Vector3(3,3,3);
		//zpanel.position.y = 10;
		zpanel.blockLayout = true;
//		var zbutton = new BABYLON.GUI.HolographicButton("orientation");
		
		
		zmanager.parent = WTW.myAvatar;
		
		var zbutton = new BABYLON.GUI.Button3D("reset");

		var ztext = new BABYLON.GUI.TextBlock();
		ztext.text = "HERE I AM";
		ztext.color = "white";
		ztext.fontSize = 50;
		zbutton.content = ztext;
		
		
		zpanel.addControl(zbutton);

		zbutton.text = "Button #" + zpanel.children.length;
		
		var zbutton2 = new BABYLON.GUI.HolographicButton("orientation");
		zpanel.addControl(zbutton2);

		zbutton.text = "Button #" + zpanel.children.length;
		zpanel.blockLayout = false;

		scene.render();
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_hud.js-openHUDFollow=" + ex.message);
	}
}

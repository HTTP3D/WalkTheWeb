WTWJS.prototype.openHUDFollow = function() {
	/* new feature just beginning to be coded */
	try {
WTW.log("OPEN HUD");
		var anchor = new BABYLON.TransformNode("");
		var manager = new BABYLON.GUI.GUI3DManager(scene);

		var panel = new BABYLON.GUI.PlanePanel();
		panel.margin = .25;
		panel.columns = 1;
		
		manager.addControl(panel);
		panel.linkToTransformNode(anchor);
		panel.position.z = -1.5;
		panel.scaling = new BABYLON.Vector3(3,3,3);
		//panel.position.y = 10;
		panel.blockLayout = true;
//		var button = new BABYLON.GUI.HolographicButton("orientation");
		
		
		manager.parent = WTW.myAvatar;
		
		var button = new BABYLON.GUI.Button3D("reset");

		var text = new BABYLON.GUI.TextBlock();
		text.text = "HERE I AM";
		text.color = "white";
		text.fontSize = 50;
		button.content = text;
		
		
		panel.addControl(button);

		button.text = "Button #" + panel.children.length;
		
		var button2 = new BABYLON.GUI.HolographicButton("orientation");
		panel.addControl(button2);

		button.text = "Button #" + panel.children.length;
		panel.blockLayout = false;

		scene.render();
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_hud.js-openHUDFollow=" + ex.message);
	}
}

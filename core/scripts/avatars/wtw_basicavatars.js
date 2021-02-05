/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions create the various avatars and place holders */

WTWJS.prototype.addAvatarPlaceholder = function(zavatarname, zavatardef) {
	/* creates a placeholder for the current user - before they select an avatar */
	var zavatar = null;
	try {
		/* validate values from the avatar definition file */
		var zstartpositionx = 0;
		var zstartpositiony = 0;
		var zstartpositionz = 0;
		var zstartrotationx = 0;
		var zstartrotationy = 0;
		var zstartrotationz = 0;
		var zpositionx = 0;
		var zpositiony = 0;
		var zpositionz = 0;
		var zscalingx = 1;
		var zscalingy = 1;
		var zscalingz = 1;
		var zrotationx = 0;
		var zrotationy = 0;
		var zrotationz = 0;
		if (zavatardef.start.position.x != undefined) {
			if (WTW.isNumeric(zavatardef.start.position.x)) {
				zstartpositionx = Number(zavatardef.start.position.x);
			}
		}
		if (zavatardef.start.position.y != undefined) {
			if (WTW.isNumeric(zavatardef.start.position.y)) {
				zstartpositiony = Number(zavatardef.start.position.y);
			}
		}
		if (zavatardef.start.position.z != undefined) {
			if (WTW.isNumeric(zavatardef.start.position.z)) {
				zstartpositionz = Number(zavatardef.start.position.z);
			}
		}
		if (zavatardef.start.rotation.x != undefined) {
			if (WTW.isNumeric(zavatardef.start.rotation.x)) {
				zstartrotationx = Number(zavatardef.start.rotation.x);
			}
		}
		if (zavatardef.start.rotation.y != undefined) {
			if (WTW.isNumeric(zavatardef.start.rotation.y)) {
				zstartrotationy = Number(zavatardef.start.rotation.y);
			}
		}
		if (zavatardef.start.rotation.z != undefined) {
			if (WTW.isNumeric(zavatardef.start.rotation.z)) {
				zstartrotationz = Number(zavatardef.start.rotation.z);
			}
		}

		if (zavatardef.position.x != undefined) {
			if (WTW.isNumeric(zavatardef.position.x)) {
				zpositionx = Number(zavatardef.position.x);
			}
		}
		if (zavatardef.position.y != undefined) {
			if (WTW.isNumeric(zavatardef.position.y)) {
				zpositiony = Number(zavatardef.position.y);
			}
		}
		if (zavatardef.position.z != undefined) {
			if (WTW.isNumeric(zavatardef.position.z)) {
				zpositionz = Number(zavatardef.position.z);
			}
		}
		if (zavatardef.scaling.x != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.x)) {
				zscalingx = Number(zavatardef.scaling.x);
			}
		}
		if (zavatardef.scaling.y != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.y)) {
				zscalingy = Number(zavatardef.scaling.y);
			}
		}
		if (zavatardef.scaling.z != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.z)) {
				zscalingz = Number(zavatardef.scaling.z);
			}
		}
		if (zavatardef.rotation.x != undefined) {
			if (WTW.isNumeric(zavatardef.rotation.x)) {
				zrotationx = Number(zavatardef.rotation.x);
			}
		}
		if (zavatardef.rotation.y != undefined) {
			if (WTW.isNumeric(zavatardef.rotation.y)) {
				zrotationy = Number(zavatardef.rotation.y);
			}
		}
		if (zavatardef.rotation.z != undefined) {
			if (WTW.isNumeric(zavatardef.rotation.z)) {
				zrotationz = Number(zavatardef.rotation.z);
			}
		}
		/* create the base avatar hidden boxes used to scale and parent various items - and give focus points for cameras */
		zavatardef.parentname = WTW.mainParent;
		/* this is the box for the avatar position and is the parent object of the avatar */
		zavatar = scene.getMeshByID(zavatarname);
		if (zavatar == null) {
			zavatar = BABYLON.MeshBuilder.CreateBox(zavatarname, {}, scene);
			zavatar.material = new BABYLON.StandardMaterial("mat" + zavatarname, scene);
			zavatar.material.alpha = 0;
			zavatar.applyGravity = true;
			zavatar.showBoundingBox = false;
			zavatar.ellipsoid = new BABYLON.Vector3(3, 7, 3);
			zavatar.ellipsoidOffset = new BABYLON.Vector3(0, 7, 0);
			zavatar.checkCollisions = true;
			zavatar.isPickable = false;
			zavatar.position = new BABYLON.Vector3(zstartpositionx, zstartpositiony, zstartpositionz);
			zavatar.rotation = new BABYLON.Vector3(WTW.getRadians(zstartrotationx), WTW.getRadians(zstartrotationy), WTW.getRadians(zstartrotationz));
		}
		zavatar.WTW = zavatardef;
		
		/* this box is the parent of the meshes - used for applying the scale your avatar */
		var zavatarscale = scene.getMeshByID(zavatarname + '-scale');
		if (zavatarscale == null) {
			zavatarscale = BABYLON.MeshBuilder.CreateBox(zavatarname + '-scale', {}, scene);
			zavatarscale.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-scale', scene);
			zavatarscale.material.alpha = 0;
			zavatarscale.isPickable = false;
			zavatarscale.checkCollisions = false;
			zavatarscale.parent = zavatar;
			zavatarscale.scaling = new BABYLON.Vector3(zscalingx, zscalingy, zscalingz);
			zavatarscale.rotation = new BABYLON.Vector3(WTW.getRadians(zrotationx), WTW.getRadians(zrotationy), WTW.getRadians(zrotationz));
			zavatarscale.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
		}
		
		/* this box is the parent of the meshes during a transition to a new avatar */
		/* used for applying the scale your old avatar while the new one is downloading and rendering */
		var zavatarscaleold = scene.getMeshByID(zavatarname + '-scaleold');
		if (zavatarscaleold == null) {
			zavatarscaleold = BABYLON.MeshBuilder.CreateBox(zavatarname + '-scaleold', {}, scene);
			zavatarscaleold.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-scaleold', scene);
			zavatarscaleold.material.alpha = 0;
			zavatarscaleold.isPickable = false;
			zavatarscaleold.checkCollisions = false;
			zavatarscaleold.parent = zavatar;
			zavatarscaleold.scaling = new BABYLON.Vector3(zscalingx, zscalingy, zscalingz);
			zavatarscaleold.rotation.y = WTW.getRadians(-90);
		}
		
		/* this box is the parent to the cameras as needed */
		var zavatarcamera = scene.getMeshByID(zavatarname + "-camera");
		if (zavatarcamera == null) {
			zavatarcamera = BABYLON.MeshBuilder.CreateBox(zavatarname + "-camera", {}, scene);
			zavatarcamera.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-camera', scene);
			zavatarcamera.material.alpha = 0;
			zavatarcamera.parent = zavatar;
			zavatarcamera.checkCollisions = false;
			zavatarcamera.position.y = 12;
			zavatarcamera.rotation.y = WTW.getRadians(-90);
		}
		
		/* this box is the center mass and used as a target for selfie cameras */
		var zavatarcenter = scene.getMeshByID(zavatarname + "-center");
		if (zavatarcenter == null) {
			zavatarcenter = BABYLON.MeshBuilder.CreateBox(zavatarname + "-center", {}, scene);
			zavatarcenter.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-center', scene);
			zavatarcenter.material.alpha = 0;
			zavatarcenter.parent = zavatar;
			zavatarcenter.checkCollisions = false;
			zavatarcenter.position.y = 12;
			zavatarcenter.rotation.y = WTW.getRadians(-90);
		}
		zavatar.isVisible = false;
		zavatarscale.isVisible = false;
		zavatarcamera.isVisible = false;
		zavatarcenter.isVisible = false;
		
		/* the following boxes will be attached to various skeleton bones for easy parenting to the animated avatar */
		/* headtop box parents to top of head */
		var zheadtop = scene.getMeshByID(zavatarname + "-headtop");
		if (zheadtop == null) {
			zheadtop = BABYLON.MeshBuilder.CreateBox(zavatarname + "-headtop", {}, scene);
			zheadtop.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
			zheadtop.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-headtop', scene);
			zheadtop.material.alpha = 0;
			zheadtop.isPickable = true;
			zheadtop.parent = zavatar;
			zheadtop.position.x = 0;
			zheadtop.position.y = 1;
			zheadtop.position.z = 0;
		}
		/* chest box parents to chest for carrying 3d objects in front or on back */
		var zchest = scene.getMeshByID(zavatarname + "-chest");
		if (zchest == null) {
			zchest = BABYLON.MeshBuilder.CreateBox(zavatarname + "-chest", {}, scene);
			zchest.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
			zchest.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-chest', scene);
			zchest.material.alpha = 0;
			zchest.isPickable = true;
			zchest.parent = zavatar;
			zchest.position.x = 1;
			zchest.position.y = .5;
			zchest.position.z = 0;
		}
		/* right hand parents to right hand while in t-pose direction */
		var zrighthand = scene.getMeshByID(zavatarname + "-righthand");
		if (zrighthand == null) {
			zrighthand = BABYLON.MeshBuilder.CreateBox(zavatarname + "-righthand", {}, scene);
			zrighthand.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
			zrighthand.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-righthand', scene);
			zrighthand.material.alpha = 0;
			zrighthand.isPickable = true;
			zrighthand.parent = zavatar;
			zrighthand.position.x = 1;
			zrighthand.position.y = .5;
			zrighthand.position.z = 1;
		}
		/* left hand parents to left hand while in t-pose direction */
		var zlefthand = scene.getMeshByID(zavatarname + "-lefthand");
		if (zlefthand == null) {
			zlefthand = BABYLON.MeshBuilder.CreateBox(zavatarname + "-lefthand", {}, scene);
			zlefthand.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
			zlefthand.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-lefthand', scene);
			zlefthand.material.alpha = 0;
			zlefthand.isPickable = true;
			zlefthand.parent = zavatar;
			zlefthand.position.x = 1;
			zlefthand.position.y = .5;
			zlefthand.position.z = -1;
		}
		/* right hip parents to top right leg */
		var zrighthip = scene.getMeshByID(zavatarname + "-righthip");
		if (zrighthip == null) {
			zrighthip = BABYLON.MeshBuilder.CreateBox(zavatarname + "-righthip", {}, scene);
			zrighthip.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
			zrighthip.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-righthip', scene);
			zrighthip.material.alpha = 0;
			zrighthip.isPickable = true;
			zrighthip.parent = zavatar;
			zrighthip.position.x = 0;
			zrighthip.position.y = .5;
			zrighthip.position.z = 1.5;
		}
		/* left hip parents to top left leg */
		var zlefthip = scene.getMeshByID(zavatarname + "-lefthip");
		if (zlefthip == null) {
			zlefthip = BABYLON.MeshBuilder.CreateBox(zavatarname + "-lefthip", {}, scene);
			zlefthip.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
			zlefthip.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-lefthip', scene);
			zlefthip.material.alpha = 0;
			zlefthip.isPickable = true;
			zlefthip.parent = zavatar;
			zlefthip.position.x = 0;
			zlefthip.position.y = .5;
			zlefthip.position.z = -1.5;
		}
		/* right foot parents to right foot */
		var zrightfoot = scene.getMeshByID(zavatarname + "-rightfoot");
		if (zrightfoot == null) {
			zrightfoot = BABYLON.MeshBuilder.CreateBox(zavatarname + "-rightfoot", {}, scene);
			zrightfoot.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
			zrightfoot.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-rightfoot', scene);
			zrightfoot.material.alpha = 0;
			zrightfoot.isPickable = true;
			zrightfoot.parent = zavatar;
			zrightfoot.position.x = 0;
			zrightfoot.position.y = .25;
			zrightfoot.position.z = .5;
		}
		/* left foot parents to left foot */
		var zleftfoot = scene.getMeshByID(zavatarname + "-leftfoot");
		if (zleftfoot == null) {
			zleftfoot = BABYLON.MeshBuilder.CreateBox(zavatarname + "-leftfoot", {}, scene);
			zleftfoot.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
			zleftfoot.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-leftfoot', scene);
			zleftfoot.material.alpha = 0;
			zleftfoot.isPickable = true;
			zleftfoot.parent = zavatar;
			zleftfoot.position.x = 0;
			zleftfoot.position.y = .25;
			zleftfoot.position.z = -.5;
		}
	} catch (ex) {
		WTW.log("core-scripts-avatars-basicavatars\r\n addAvatarPlaceholder=" + ex.message);
	}
	return zavatar;
}

WTWJS.prototype.addAvatar3DObject = function(zavatarname, zavatardef) {
	/* create an avatar from an avatar definition file - see /core/scripts/prime/wtw_objectdefinitions.js file for avatar def format */
	var zavatar = null;
	try {
		/* validate values form the avatar definition file */
		var zstartpositionx = 0;
		var zstartpositiony = 0;
		var zstartpositionz = 0;
		var zstartrotationx = 0;
		var zstartrotationy = 0;
		var zstartrotationz = 0;
		var zpositionx = 0;
		var zpositiony = 0;
		var zpositionz = 0;
		var zscalingx = 1;
		var zscalingy = 1;
		var zscalingz = 1;
		var zrotationx = 0;
		var zrotationy = 0;
		var zrotationz = 0;
		if (zavatardef.start.position.x != undefined) {
			if (WTW.isNumeric(zavatardef.start.position.x)) {
				zstartpositionx = Number(zavatardef.start.position.x);
			}
		}
		if (zavatardef.start.position.y != undefined) {
			if (WTW.isNumeric(zavatardef.start.position.y)) {
				zstartpositiony = Number(zavatardef.start.position.y);
			}
		}
		if (zavatardef.start.position.z != undefined) {
			if (WTW.isNumeric(zavatardef.start.position.z)) {
				zstartpositionz = Number(zavatardef.start.position.z);
			}
		}
		if (zavatardef.start.rotation.x != undefined) {
			if (WTW.isNumeric(zavatardef.start.rotation.x)) {
				zstartrotationx = Number(zavatardef.start.rotation.x);
			}
		}
		if (zavatardef.start.rotation.y != undefined) {
			if (WTW.isNumeric(zavatardef.start.rotation.y)) {
				zstartrotationy = Number(zavatardef.start.rotation.y);
			}
		}
		if (zavatardef.start.rotation.z != undefined) {
			if (WTW.isNumeric(zavatardef.start.rotation.z)) {
				zstartrotationz = Number(zavatardef.start.rotation.z);
			}
		}

		if (zavatardef.position.x != undefined) {
			if (WTW.isNumeric(zavatardef.position.x)) {
				zpositionx = Number(zavatardef.position.x);
			}
		}
		if (zavatardef.position.y != undefined) {
			if (WTW.isNumeric(zavatardef.position.y)) {
				zpositiony = Number(zavatardef.position.y);
			}
		}
		if (zavatardef.position.z != undefined) {
			if (WTW.isNumeric(zavatardef.position.z)) {
				zpositionz = Number(zavatardef.position.z);
			}
		}
		if (zavatardef.scaling.x != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.x)) {
				zscalingx = Number(zavatardef.scaling.x);
			}
		}
		if (zavatardef.scaling.y != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.y)) {
				zscalingy = Number(zavatardef.scaling.y);
			}
		}
		if (zavatardef.scaling.z != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.z)) {
				zscalingz = Number(zavatardef.scaling.z);
			}
		} 
		if (zavatardef.rotation.x != undefined) {
			if (WTW.isNumeric(zavatardef.rotation.x)) {
				zrotationx = Number(zavatardef.rotation.x);
			}
		}
		if (zavatardef.rotation.y != undefined) {
			if (WTW.isNumeric(zavatardef.rotation.y)) {
				zrotationy = Number(zavatardef.rotation.y);
			}
		}
		if (zavatardef.rotation.z != undefined) {
			if (WTW.isNumeric(zavatardef.rotation.z)) {
				zrotationz = Number(zavatardef.rotation.z);
			}
		}
		/* create the base avatar hidden boxes used to scale and parent various items - and give focus points for cameras */
		/* this is the box for the avatar position and is the parent object of the avatar */
		zavatar = scene.getMeshByID(zavatarname);
		if (zavatar == null) {
			zavatar = BABYLON.MeshBuilder.CreateBox(zavatarname, {}, scene);
			zavatar.material = new BABYLON.StandardMaterial("mat" + zavatarname, scene);
			zavatar.material.alpha = 0;
			zavatar.applyGravity = true;
			zavatar.showBoundingBox = false;
			zavatar.ellipsoid = new BABYLON.Vector3(3, 7, 3);
			zavatar.ellipsoidOffset = new BABYLON.Vector3(0, 7, 0);
			zavatar.checkCollisions = true;
			zavatar.isPickable = false;
			zavatar.position = new BABYLON.Vector3(zstartpositionx, zstartpositiony, zstartpositionz);
			zavatar.rotation = new BABYLON.Vector3(WTW.getRadians(zstartrotationx), WTW.getRadians(zstartrotationy), WTW.getRadians(zstartrotationz));
		}
		
		/* this box is the parent of the meshes - used for applying the scale your avatar */
		var zavatarscale = scene.getMeshByID(zavatarname + '-scale');
		if (zavatarscale == null) {
			zavatarscale = BABYLON.MeshBuilder.CreateBox(zavatarname + '-scale', {}, scene);
			zavatarscale.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-scale', scene);
			zavatarscale.material.alpha = 0;
			zavatarscale.isPickable = false;
			zavatarscale.checkCollisions = false;
			zavatarscale.parent = zavatar;
			zavatarscale.scaling = new BABYLON.Vector3(zscalingx, zscalingy, zscalingz);
			zavatarscale.rotation = new BABYLON.Vector3(WTW.getRadians(zrotationx), WTW.getRadians(zrotationy), WTW.getRadians(zrotationz));
			zavatarscale.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
		} else {
			zavatarscale.scaling = new BABYLON.Vector3(zscalingx, zscalingy, zscalingz);
			zavatarscale.rotation = new BABYLON.Vector3(WTW.getRadians(zrotationx), WTW.getRadians(zrotationy), WTW.getRadians(zrotationz));
			zavatarscale.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
		}
		
		/* this box is the parent of the meshes during a transition to a new avatar */
		/* used for applying the scale your old avatar while the new one is downloading and rendering */
		var zavatarscaleold = scene.getMeshByID(zavatarname + '-scaleold');
		if (zavatarscaleold == null) {
			zavatarscaleold = BABYLON.MeshBuilder.CreateBox(zavatarname + '-scaleold', {}, scene);
			zavatarscaleold.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-scaleold', scene);
			zavatarscaleold.material.alpha = 0;
			zavatarscaleold.isPickable = false;
			zavatarscaleold.checkCollisions = false;
			zavatarscaleold.parent = zavatar;
			zavatarscaleold.scaling = new BABYLON.Vector3(zscalingx, zscalingy, zscalingz);
			zavatarscale.rotation = new BABYLON.Vector3(WTW.getRadians(zrotationx), WTW.getRadians(zrotationy), WTW.getRadians(zrotationz));
			zavatarscale.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
		}
		
		/* this box is the parent to the cameras as needed */
		var zavatarcamera = scene.getMeshByID(zavatarname + "-camera");
		if (zavatarcamera == null) {
			zavatarcamera = BABYLON.MeshBuilder.CreateBox(zavatarname + "-camera", {}, scene);
			zavatarcamera.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-camera', scene);
			zavatarcamera.material.alpha = 0;
			zavatarcamera.parent = zavatar;
			zavatarcamera.checkCollisions = false;
			zavatarcamera.position.y = 12;
			zavatarcamera.rotation.y = WTW.getRadians(-90);
		}
		
		/* this box is the center mass and used as a target for selfie cameras */
		var zavatarcenter = scene.getMeshByID(zavatarname + "-center");
		if (zavatarcenter == null) {
			zavatarcenter = BABYLON.MeshBuilder.CreateBox(zavatarname + "-center", {}, scene);
			zavatarcenter.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-center', scene);
			zavatarcenter.material.alpha = 0;
			zavatarcenter.parent = zavatar;
			zavatarcenter.checkCollisions = false;
			zavatarcenter.position.y = 12;
			zavatarcenter.rotation.y = WTW.getRadians(-90);
		}

		var zobjectanimations = null;
		var zobjectfolder = "/content/system/avatars/male/";
		var zobjectfile = "maleidle.babylon";
		var zavatarparts = [];
		var zavataranimationdefs = [];
		if (zavatardef.objects.folder != undefined) {
			if (zavatardef.objects.folder != '') {
				zobjectfolder = zavatardef.objects.folder;
			}
		}
		if (zavatardef.objects.file != undefined) {
			if (zavatardef.objects.file != '') {
				zobjectfile = zavatardef.objects.file;
			}
		}
		if (zavatardef.objects.objectanimations != undefined) {
			zobjectanimations = zavatardef.objects.objectanimations;
		}
		if (zavatardef.avatarparts != null) {
			if (zavatardef.avatarparts != undefined) {
				zavatarparts = zavatardef.avatarparts;
			}
		}
		if (zavatardef.avataranimationdefs != null) {
			if (zavatardef.avataranimationdefs != undefined) {
				zavataranimationdefs = zavatardef.avataranimationdefs;
			}
		}
		zavatar.WTW = zavatardef;
		/* make sure the base functions are defined - otherwise adds default for that avatar event */
		/* basic avatar animation events: (onwait, onwalk, onwalkbackwards, onturnleft, onturnright, onstrafeleft, onstraferight, onrun, onrunbackwards, onrunleft, onrunright, onrunstrafeleft, onrunstraferight) */
		zavatardef = WTW.pluginsAvatarBeforeCreate(zavatarname, zavatardef);

		BABYLON.SceneLoader.ImportMeshAsync("", zobjectfolder, zobjectfile, scene).then(
			function (results) {
				var zavatar = scene.getMeshByID(zavatarname);
				var zavatarparent = scene.getMeshByID(zavatarname + "-scale");
				if (zavatar != null) {
					if (results.meshes != null) {
						results.meshes[0].WTW = [];
						results.meshes[0].WTW.skeletons = null;
						for (var i=0; i < results.meshes.length; i++) {
							if (results.meshes[i] != null) {
								var zmesh = results.meshes[i];
								var zmeshname = results.meshes[i].name;
								var zchildmoldname = zavatarname + "-" + zmeshname;
								var zexistingmold = scene.getMeshByID(zchildmoldname);
								if (zexistingmold != null) {
									zexistingmold.dispose();
								}
								results.meshes[i].isPickable = true;
								results.meshes[i].name = zchildmoldname;
								results.meshes[i].id = zchildmoldname;
								results.meshes[i].isVisible = false;
								
								/* set custom colors to avatar parts */
								
								let zdiffusecolor = '#ffffff';
								let zemissivecolor = '#000000';
								let zspecularcolor = '#000000';
								let zambientcolor = '#ffffff';
								if (zavatarparts != null) {
									for (var j=0;j<zavatarparts.length;j++) {
										if (zavatarparts[j] != null) {
											var zavatarpart = zavatarparts[j].avatarpart;
											if (zavatarpart == zmeshname) {
												if (zavatarparts[j].diffusecolor != undefined) {
													zdiffusecolor = zavatarparts[j].diffusecolor;
												}
												if (zavatarparts[j].emissivecolor != undefined) {
													zemissivecolor = zavatarparts[j].emissivecolor;
												}
												if (zavatarparts[j].specularcolor != undefined) {
													zspecularcolor = zavatarparts[j].specularcolor;
												}
												if (zavatarparts[j].ambientcolor != undefined) {
													zambientcolor = zavatarparts[j].ambientcolor;
												}
											}
										}
									}
								}
								
								
								if (results.meshes[i].material != null) {
									/* emissive and specular currently share colors */
									results.meshes[i].material.emissiveColor = new BABYLON.Color3.FromHexString(zemissivecolor);
									results.meshes[i].material.specularColor = new BABYLON.Color3.FromHexString(zspecularcolor);
									/* diffuse and ambient currently share colors */
									results.meshes[i].material.diffuseColor = new BABYLON.Color3.FromHexString(zdiffusecolor);
									results.meshes[i].material.ambientColor = new BABYLON.Color3.FromHexString(zambientcolor);
									/* refresh the materials to apply colors */
									var zcovering = results.meshes[i].material;
									results.meshes[i].material.dispose();
									results.meshes[i].material = zcovering;
								}
								WTW.registerMouseOver(results.meshes[i]);
								if (results.meshes[i].parent == null) {
									results.meshes[i].parent = zavatarparent;
								}
								if (WTW.shadows != null) {
									WTW.shadows.getShadowMap().renderList.push(results.meshes[i]);
								}
								results.meshes[i].receiveShadows = true;
								if (i > 0) {
									results.meshes[i].WTW = [];
								}
								/* avatar mesh based animations (not common, usually skeleton based) */
								results.meshes[i].WTW.animations = [];
								if (zobjectanimations != null) {
									if (zobjectanimations != null) {
										for (var j=0; j < zobjectanimations.length;j++) {
											if (zobjectanimations[j] != null) {
												var zmoldnamepart = zobjectanimations[j].moldnamepart;
												if (zmoldnamepart == zmeshname) {
													var zmoldevent = zobjectanimations[j].moldevent;
													var zstartframe = Number(zobjectanimations[j].startframe);
													var zendframe = Number(zobjectanimations[j].endframe);
													var zanimationloop = false;
													var zspeedratio = Number(zobjectanimations[j].speedratio);
													if (zobjectanimations[j].animationloop+'' == '1') {
														zanimationloop = true;
													}
													if (zmoldevent == 'onload') {
														zanimationloop = false;
														if ((typeof zmesh.WTW.animations.onwait) != "undefined") {
															results.meshes[i].WTW.animations[zmoldevent] = scene.beginWeightedAnimation(zmesh, zstartframe, zendframe, 1, zanimationloop, zspeedratio, function() {zmesh.WTW.animations.onload.weight=0; zmesh.WTW.animations.onwait.weight=1;});
														} else {
															results.meshes[i].WTW.animations[zmoldevent] = scene.beginWeightedAnimation(zmesh, zstartframe, zendframe, 1, zanimationloop, zspeedratio);
														}
													} else {
														results.meshes[i].WTW.animations[zmoldevent] = scene.beginWeightedAnimation(zmesh, zstartframe, zendframe, 0, zanimationloop, zspeedratio);
													}
												}
												
											}
										}
										if ((typeof zmesh.WTW.animations.onload) == "undefined" && (typeof zmesh.WTW.animations.onwait) != "undefined") {
											zmesh.WTW.animations.onwait.weight = 1;
										}
									}
								}
							}
						} 
					}
					/* load skeleton based animations */
					if (results.skeletons != null)	{
						var zskeleton = results.meshes[0].skeleton;
						zavatar.WTW.skeleton = results.meshes[0].skeleton;
						for (var i=0; i < results.skeletons.length; i++) {
							if (results.skeletons[i] != null) {
								var zmeshname = results.skeletons[i].name;
								var zchildmoldname = zavatarname + "-" + zmeshname;
								results.skeletons[i].name = zchildmoldname;
								results.skeletons[i].id = zchildmoldname;
								WTW.registerMouseOver(results.skeletons[i]);
								if (results.skeletons[i].parent == null) {
									results.skeletons[i].scaling = new BABYLON.Vector3(zscalingx,zscalingy,zscalingz);
								}
								if (results.skeletons[i].bones != null) {
									/* the following boxes will be attached to various skeleton bones for easy parenting to the animated avatar */
									/* useful for carrying 3d objects */
									var zheadtopbone = -1;
									var zspine2bone = -1;
									var zrighthandbone = -1;
									var zlefthandbone = -1;
									var zrightlegbone = -1;
									var zleftlegbone = -1;
									var zrightfootbone = -1;
									var zleftfootbone = -1;
									for (var j=0; j < results.skeletons[i].bones.length; j++) {
										if (results.skeletons[i].bones[j] != null) {
											var zbonename = results.skeletons[i].bones[j].name.toLowerCase();
											if (zbonename.indexOf("headtop") > -1 && zheadtopbone == -1) {
												zheadtopbone = j;
											} else if (zbonename.indexOf("spine2") > -1 && zspine2bone == -1) {
												zspine2bone = j;
											} else if (zbonename.indexOf("righthand") > -1 && zrighthandbone == -1) {
												zrighthandbone = j;
											} else if (zbonename.indexOf("lefthand") > -1 && zlefthandbone == -1) {
												zlefthandbone = j;
											} else if (zbonename.indexOf("rightupleg") > -1 && zrightlegbone == -1) {
												zrightlegbone = j;
											} else if (zbonename.indexOf("leftupleg") > -1 && zleftlegbone == -1) {
												zleftlegbone = j;
											} else if (zbonename.indexOf("rightfoot") > -1 && zrightfootbone == -1) {
												zrightfootbone = j;
											} else if (zbonename.indexOf("leftfoot") > -1 && zleftfootbone == -1) {
												zleftfootbone = j;
											}
											if (j == 0) {
												results.skeletons[i].bones[j].parent = zavatarparent;
											} else {
												if (results.skeletons[i].bones[j].parent == null) {
													results.skeletons[i].bones[j].parent = results.skeletons[i].bones[0];
												}
											}
										}
									}
									if (zheadtopbone > -1) {
										/* headtop box parents to top of head */
										var zheadtop = scene.getMeshByID(zavatarname + "-headtop");
										if (zheadtop == null) {
											zheadtop = BABYLON.MeshBuilder.CreateBox(zavatarname + "-headtop", {}, scene);
											zheadtop.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-headtop', scene);
											zheadtop.material.alpha = 0;
											zheadtop.isPickable = true;
										}
										zheadtop.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zheadtop.attachToBone(results.skeletons[i].bones[zheadtopbone], results.meshes[0]);
										if (zavatarname == "myavatar-" + dGet("wtw_tinstanceid").value) {
											zavatarcamera.parent = zheadtop;
											zavatarcamera.position.y = 0;
											zavatarcamera.rotation.y = WTW.getRadians(0);
										}
									}
									if (zspine2bone > -1) {
										/* chest box parents to chest for carrying 3d objects in front or on back */
										var zchest = scene.getMeshByID(zavatarname + "-chest");
										if (zchest == null) {
											zchest = BABYLON.MeshBuilder.CreateBox(zavatarname + "-chest", {}, scene);
											zchest.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-chest', scene);
											zchest.material.alpha = 0;
											zchest.isPickable = true;
										}
										zchest.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zchest.attachToBone(results.skeletons[i].bones[zspine2bone], results.meshes[0]);
									}
									if (zrighthandbone > -1) {
										/* right hand parents to right hand while in t-pose direction */
										var zrighthand = scene.getMeshByID(zavatarname + "-righthand");
										if (zrighthand == null) {
											zrighthand = BABYLON.MeshBuilder.CreateBox(zavatarname + "-righthand", {}, scene);
											zrighthand.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-righthand', scene);
											zrighthand.material.alpha = 0;
											zrighthand.isPickable = true;
										}
										zrighthand.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zrighthand.attachToBone(results.skeletons[i].bones[zrighthandbone], results.meshes[0]);
									}
									if (zlefthandbone > -1) {
										/* left hand parents to left hand while in t-pose direction */
										var zlefthand = scene.getMeshByID(zavatarname + "-lefthand");
										if (zlefthand == null) {
											zlefthand = BABYLON.MeshBuilder.CreateBox(zavatarname + "-lefthand", {}, scene);
											zlefthand.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-lefthand', scene);
											zlefthand.material.alpha = 0;
											zlefthand.isPickable = true;
										}
										zlefthand.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zlefthand.attachToBone(results.skeletons[i].bones[zlefthandbone], results.meshes[0]);
									}
									if (zrightlegbone > -1) {
										/* right hip parents to top right leg */
										var zrighthip = scene.getMeshByID(zavatarname + "-righthip");
										if (zrighthip == null) {
											zrighthip = BABYLON.MeshBuilder.CreateBox(zavatarname + "-righthip", {}, scene);
											zrighthip.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-righthip', scene);
											zrighthip.material.alpha = 0;
											zrighthip.isPickable = true;
										}
										zrighthip.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zrighthip.attachToBone(results.skeletons[i].bones[zrightlegbone], results.meshes[0]);
									}
									if (zleftlegbone > -1) {
										/* left hip parents to top left leg */
										var zlefthip = scene.getMeshByID(zavatarname + "-lefthip");
										if (zlefthip == null) {
											zlefthip = BABYLON.MeshBuilder.CreateBox(zavatarname + "-lefthip", {}, scene);
											zlefthip.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-lefthip', scene);
											zlefthip.material.alpha = 0;
											zlefthip.isPickable = true;
										}
										zlefthip.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zlefthip.attachToBone(results.skeletons[i].bones[zleftlegbone], results.meshes[0]);
									}
									if (zrightfootbone > -1) {
										/* right foot parents to right foot */
										var zrightfoot = scene.getMeshByID(zavatarname + "-rightfoot");
										if (zrightfoot == null) {
											zrightfoot = BABYLON.MeshBuilder.CreateBox(zavatarname + "-rightfoot", {}, scene);
											zrightfoot.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-rightfoot', scene);
											zrightfoot.material.alpha = 0;
											zrightfoot.isPickable = true;
										}
										zrightfoot.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zrightfoot.attachToBone(results.skeletons[i].bones[zrightfootbone], results.meshes[0]);
									}
									if (zleftfootbone > -1) {
										/* left foot parents to left foot */
										var zleftfoot = scene.getMeshByID(zavatarname + "-leftfoot");
										if (zleftfoot == null) {
											zleftfoot = BABYLON.MeshBuilder.CreateBox(zavatarname + "-leftfoot", {}, scene);
											zleftfoot.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-leftfoot', scene);
											zleftfoot.material.alpha = 0;
											zleftfoot.isPickable = true;
										}
										zleftfoot.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zleftfoot.attachToBone(results.skeletons[i].bones[zleftfootbone], results.meshes[0]);
									}
								}
							}
						}
						/* load the avatar animations - note that the idle onwait animation is already loaded with the initial avatar object */
						/* zavataranimationdefs is an array of animation definitions to be loaded index 0 is the idle onwait event */
						WTW.reloadAvatarAnimations(zavatarname, zavataranimationdefs);
					} 
				}
				zavatar = scene.getMeshByID(zavatarname);
				if (zavatar == null) {
					WTW.disposeClean(zavatarname);
				} else {
					/* make my avatar match the camera angle if first entering a 3D Scene */
					if (WTW.myAvatar.name == zavatarname && WTW.placeHolder == 1) {
						WTW.init.startRotationY = WTW.getDegrees(WTW.camera.rotation.y);
					}
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-avatars-basicavatars\r\n addAvatar3DObject=" + ex.message);
	}
	return zavatar;
}

WTWJS.prototype.addAvatarForEdit = function(zavatarname, zavatardef) {
	/* create an avatar from an avatar definition file - see /core/scripts/prime/wtw_objectdefinitions.js file for avatar def format */
	var zavatar = null;
	try {
		/* validate values form the avatar definition file */
		var zstartpositionx = 0;
		var zstartpositiony = 0;
		var zstartpositionz = 0;
		var zstartrotationx = 0;
		var zstartrotationy = 0;
		var zstartrotationz = 0;
		var zpositionx = 0;
		var zpositiony = 0;
		var zpositionz = 0;
		var zscalingx = 1;
		var zscalingy = 1;
		var zscalingz = 1;
		var zrotationx = 0;
		var zrotationy = 0;
		var zrotationz = 0;
		if (zavatardef.start.position.x != undefined) {
			if (WTW.isNumeric(zavatardef.start.position.x)) {
				zstartpositionx = Number(zavatardef.start.position.x);
			}
		}
		if (zavatardef.start.position.y != undefined) {
			if (WTW.isNumeric(zavatardef.start.position.y)) {
				zstartpositiony = Number(zavatardef.start.position.y);
			}
		}
		if (zavatardef.start.position.z != undefined) {
			if (WTW.isNumeric(zavatardef.start.position.z)) {
				zstartpositionz = Number(zavatardef.start.position.z);
			}
		}
		if (zavatardef.start.rotation.x != undefined) {
			if (WTW.isNumeric(zavatardef.start.rotation.x)) {
				zstartrotationx = Number(zavatardef.start.rotation.x);
			}
		}
		if (zavatardef.start.rotation.y != undefined) {
			if (WTW.isNumeric(zavatardef.start.rotation.y)) {
				zstartrotationy = Number(zavatardef.start.rotation.y);
			}
		}
		if (zavatardef.start.rotation.z != undefined) {
			if (WTW.isNumeric(zavatardef.start.rotation.z)) {
				zstartrotationz = Number(zavatardef.start.rotation.z);
			}
		}

		if (zavatardef.position.x != undefined) {
			if (WTW.isNumeric(zavatardef.position.x)) {
				zpositionx = Number(zavatardef.position.x);
			}
		}
		if (zavatardef.position.y != undefined) {
			if (WTW.isNumeric(zavatardef.position.y)) {
				zpositiony = Number(zavatardef.position.y);
			}
		}
		if (zavatardef.position.z != undefined) {
			if (WTW.isNumeric(zavatardef.position.z)) {
				zpositionz = Number(zavatardef.position.z);
			}
		}
		if (zavatardef.scaling.x != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.x)) {
				zscalingx = Number(zavatardef.scaling.x);
			}
		}
		if (zavatardef.scaling.y != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.y)) {
				zscalingy = Number(zavatardef.scaling.y);
			}
		}
		if (zavatardef.scaling.z != undefined) {
			if (WTW.isNumeric(zavatardef.scaling.z)) {
				zscalingz = Number(zavatardef.scaling.z);
			}
		} 
		if (zavatardef.rotation.x != undefined) {
			if (WTW.isNumeric(zavatardef.rotation.x)) {
				zrotationx = Number(zavatardef.rotation.x);
			}
		}
		if (zavatardef.rotation.y != undefined) {
			if (WTW.isNumeric(zavatardef.rotation.y)) {
				zrotationy = Number(zavatardef.rotation.y);
			}
		}
		if (zavatardef.rotation.z != undefined) {
			if (WTW.isNumeric(zavatardef.rotation.z)) {
				zrotationz = Number(zavatardef.rotation.z);
			}
		}
		/* create the base avatar hidden boxes used to scale and parent various items - and give focus points for cameras */
		/* this is the box for the avatar position and is the parent object of the avatar */
		zavatar = scene.getMeshByID(zavatarname);
		if (zavatar == null) {
			zavatar = BABYLON.MeshBuilder.CreateBox(zavatarname, {}, scene);
			zavatar.material = new BABYLON.StandardMaterial("mat" + zavatarname, scene);
			zavatar.material.alpha = 0;
			zavatar.applyGravity = true;
			zavatar.showBoundingBox = false;
			zavatar.ellipsoid = new BABYLON.Vector3(3, 7, 3);
			zavatar.ellipsoidOffset = new BABYLON.Vector3(0, 7, 0);
			zavatar.checkCollisions = true;
			zavatar.isPickable = false;
			zavatar.position = new BABYLON.Vector3(zstartpositionx, zstartpositiony, zstartpositionz);
			zavatar.rotation = new BABYLON.Vector3(WTW.getRadians(zstartrotationx), WTW.getRadians(zstartrotationy), WTW.getRadians(zstartrotationz));
		}
		
		/* this box is the parent of the meshes - used for applying the scale your avatar */
		var zavatarscale = scene.getMeshByID(zavatarname + '-scale');
		if (zavatarscale == null) {
			zavatarscale = BABYLON.MeshBuilder.CreateBox(zavatarname + '-scale', {}, scene);
			zavatarscale.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-scale', scene);
			zavatarscale.material.alpha = 0;
			zavatarscale.isPickable = false;
			zavatarscale.checkCollisions = false;
			zavatarscale.parent = zavatar;
			zavatarscale.scaling = new BABYLON.Vector3(zscalingx, zscalingy, zscalingz);
			zavatarscale.rotation = new BABYLON.Vector3(WTW.getRadians(zrotationx), WTW.getRadians(zrotationy), WTW.getRadians(zrotationz));
			zavatarscale.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
		} else {
			zavatarscale.scaling = new BABYLON.Vector3(zscalingx, zscalingy, zscalingz);
			zavatarscale.rotation = new BABYLON.Vector3(WTW.getRadians(zrotationx), WTW.getRadians(zrotationy), WTW.getRadians(zrotationz));
			zavatarscale.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
		}
		
		/* this box is the parent of the meshes during a transition to a new avatar */
		/* used for applying the scale your old avatar while the new one is downloading and rendering */
		var zavatarscaleold = scene.getMeshByID(zavatarname + '-scaleold');
		if (zavatarscaleold == null) {
			zavatarscaleold = BABYLON.MeshBuilder.CreateBox(zavatarname + '-scaleold', {}, scene);
			zavatarscaleold.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-scaleold', scene);
			zavatarscaleold.material.alpha = 0;
			zavatarscaleold.isPickable = false;
			zavatarscaleold.checkCollisions = false;
			zavatarscaleold.parent = zavatar;
			zavatarscaleold.scaling = new BABYLON.Vector3(zscalingx, zscalingy, zscalingz);
			zavatarscale.rotation = new BABYLON.Vector3(WTW.getRadians(zrotationx), WTW.getRadians(zrotationy), WTW.getRadians(zrotationz));
			zavatarscale.position = new BABYLON.Vector3(zpositionx, zpositiony, zpositionz);
		}
		
		/* this box is the parent to the cameras as needed */
		var zavatarcamera = scene.getMeshByID(zavatarname + "-camera");
		if (zavatarcamera == null) {
			zavatarcamera = BABYLON.MeshBuilder.CreateBox(zavatarname + "-camera", {}, scene);
			zavatarcamera.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-camera', scene);
			zavatarcamera.material.alpha = 0;
			zavatarcamera.parent = zavatar;
			zavatarcamera.checkCollisions = false;
			zavatarcamera.position.y = 12;
			zavatarcamera.rotation.y = WTW.getRadians(-90);
		}
		
		/* this box is the center mass and used as a target for selfie cameras */
		var zavatarcenter = scene.getMeshByID(zavatarname + "-center");
		if (zavatarcenter == null) {
			zavatarcenter = BABYLON.MeshBuilder.CreateBox(zavatarname + "-center", {}, scene);
			zavatarcenter.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-center', scene);
			zavatarcenter.material.alpha = 0;
			zavatarcenter.parent = zavatar;
			zavatarcenter.checkCollisions = false;
			zavatarcenter.position.y = 12;
			zavatarcenter.rotation.y = WTW.getRadians(-90);
		}

		var zobjectanimations = null;
		var zobjectfolder = "/content/system/avatars/male/";
		var zobjectfile = "maleidle.babylon";
		var zavatarparts = [];
		var zavataranimationdefs = [];
		if (zavatardef.objects.folder != undefined) {
			if (zavatardef.objects.folder != '') {
				zobjectfolder = zavatardef.objects.folder;
			}
		}
		if (zavatardef.objects.file != undefined) {
			if (zavatardef.objects.file != '') {
				zobjectfile = zavatardef.objects.file;
			}
		}
		if (zavatardef.objects.objectanimations != undefined) {
			zobjectanimations = zavatardef.objects.objectanimations;
		}
		if (zavatardef.avatarparts != null) {
			if (zavatardef.avatarparts != undefined) {
				zavatarparts = zavatardef.avatarparts;
			}
		}
		if (zavatardef.avataranimationdefs != null) {
			if (zavatardef.avataranimationdefs != undefined) {
				zavataranimationdefs = zavatardef.avataranimationdefs;
			}
		}

		zavatar.WTW = zavatardef;
		/* make sure the base functions are defined - otherwise adds default for that avatar event */
		/* basic avatar animation events: (onwait, onwalk, onwalkbackwards, onturnleft, onturnright, onstrafeleft, onstraferight, onrun, onrunbackwards, onrunleft, onrunright, onrunstrafeleft, onrunstraferight) */
		zavatardef = WTW.pluginsAvatarBeforeCreate(zavatarname, zavatardef);

		BABYLON.SceneLoader.ImportMeshAsync("", zobjectfolder, zobjectfile, scene).then(
			function (results) {
				var zavatar = scene.getMeshByID(zavatarname);
				var zavatarparent = scene.getMeshByID(zavatarname + "-scale");
				if (zavatar != null) {
					if (results.meshes != null) {
						results.meshes[0].WTW = [];
						results.meshes[0].WTW.skeletons = null;
						for (var i=0; i < results.meshes.length; i++) {
							if (results.meshes[i] != null) {
								var zmesh = results.meshes[i];
								var zmeshname = results.meshes[i].name;
								var zchildmoldname = zavatarname + "-" + zmeshname;
								var zexistingmold = scene.getMeshByID(zchildmoldname);
								if (zexistingmold != null) {
									zexistingmold.dispose();
								}
								results.meshes[i].isPickable = true;
								results.meshes[i].name = zchildmoldname;
								results.meshes[i].id = zchildmoldname;
								results.meshes[i].isVisible = true;
								
								/* set custom colors to avatar parts */
								var zfoundpart = false;
								let zdiffusecolor = '#ffffff';
								let zemissivecolor = '#000000';
								let zspecularcolor = '#000000';
								let zambientcolor = '#ffffff';
								if (zavatarparts != null) {
									for (var j=0;j<zavatarparts.length;j++) {
										if (zavatarparts[j] != null) {
											var zavatarpart = zavatarparts[j].avatarpart;
											if (zavatarpart == zmeshname) {
												if (zavatarparts[j].diffusecolor != undefined) {
													zdiffusecolor = zavatarparts[j].diffusecolor;
												}
												if (zavatarparts[j].emissivecolor != undefined) {
													zemissivecolor = zavatarparts[j].emissivecolor;
												}
												if (zavatarparts[j].specularcolor != undefined) {
													zspecularcolor = zavatarparts[j].specularcolor;
												}
												if (zavatarparts[j].ambientcolor != undefined) {
													zambientcolor = zavatarparts[j].ambientcolor;
												}
												zfoundpart = true;
											}
										}
									}
								}
								if (!zfoundpart) {
									var zavatarpartid = WTW.getRandomString(16,1);
									var zavatarpart = {
										'avatarpartid': zavatarpartid,
										'avatarpart': zmeshname,
										'diffusecolor': zdiffusecolor,
										'specularcolor': zspecularcolor,
										'emissivecolor': zemissivecolor,
										'ambientcolor': zambientcolor
									};
									zavatar.WTW.avatarparts[zavatar.WTW.avatarparts.length] = zavatarpart;
									var zrequest = {
										'avatarid': avatarid,
										'avatarpartid': zavatarpartid,
										'avatarpart': zmeshname,
										'diffusecolor': zdiffusecolor,
										'specularcolor': zspecularcolor,
										'emissivecolor': zemissivecolor,
										'ambientcolor': zambientcolor,
										'function':'saveavatardefinitioncolor'
									};
									WTW.postAsyncJSON("/core/handlers/avatars.php", zrequest, 
										function(zresponse) {
											zresponse = JSON.parse(zresponse);
											/* note serror would contain errors */
										}
									);
								}
								if (results.meshes[i].material != null) {
									/* emissive and specular currently share colors */
									results.meshes[i].material.emissiveColor = new BABYLON.Color3.FromHexString(zemissivecolor);
									results.meshes[i].material.specularColor = new BABYLON.Color3.FromHexString(zspecularcolor);
									/* diffuse and ambient currently share colors */
									results.meshes[i].material.diffuseColor = new BABYLON.Color3.FromHexString(zdiffusecolor);
									results.meshes[i].material.ambientColor = new BABYLON.Color3.FromHexString(zambientcolor);
									/* refresh the materials to apply colors */
									var zcovering = results.meshes[i].material;
									results.meshes[i].material.dispose();
									results.meshes[i].material = zcovering;
								}
								WTW.registerMouseOver(results.meshes[i]);
								if (results.meshes[i].parent == null) {
									results.meshes[i].parent = zavatarparent;
								}
								if (WTW.shadows != null) {
									WTW.shadows.getShadowMap().renderList.push(results.meshes[i]);
								}
								results.meshes[i].receiveShadows = true;
								if (i > 0) {
									results.meshes[i].WTW = [];
								}
								/* avatar mesh based animations (not common, usually skeleton based) */
								results.meshes[i].WTW.animations = [];
								if (zobjectanimations != null) {
									if (zobjectanimations != null) {
										for (var j=0; j < zobjectanimations.length;j++) {
											if (zobjectanimations[j] != null) {
												var zmoldnamepart = zobjectanimations[j].moldnamepart;
												if (zmoldnamepart == zmeshname) {
													var zmoldevent = zobjectanimations[j].moldevent;
													var zstartframe = Number(zobjectanimations[j].startframe);
													var zendframe = Number(zobjectanimations[j].endframe);
													var zanimationloop = false;
													var zspeedratio = Number(zobjectanimations[j].speedratio);
													if (zobjectanimations[j].animationloop+'' == '1') {
														zanimationloop = true;
													}
													if (zmoldevent == 'onload') {
														zanimationloop = false;
														if ((typeof zmesh.WTW.animations.onwait) != "undefined") {
															results.meshes[i].WTW.animations[zmoldevent] = scene.beginWeightedAnimation(zmesh, zstartframe, zendframe, 1, zanimationloop, zspeedratio, function() {zmesh.WTW.animations.onload.weight=0; zmesh.WTW.animations.onwait.weight=1;});
														} else {
															results.meshes[i].WTW.animations[zmoldevent] = scene.beginWeightedAnimation(zmesh, zstartframe, zendframe, 1, zanimationloop, zspeedratio);
														}
													} else {
														results.meshes[i].WTW.animations[zmoldevent] = scene.beginWeightedAnimation(zmesh, zstartframe, zendframe, 0, zanimationloop, zspeedratio);
													}
												}
												
											}
										}
										if ((typeof zmesh.WTW.animations.onload) == "undefined" && (typeof zmesh.WTW.animations.onwait) != "undefined") {
											zmesh.WTW.animations.onwait.weight=1;
										}
									}
								}
							}
						} 
					}
					/* load skeleton based animations */
					if (results.skeletons != null)	{
						var zskeleton = results.meshes[0].skeleton;
						zavatar.WTW.skeleton = results.meshes[0].skeleton;
						for (var i=0; i < results.skeletons.length; i++) {
							if (results.skeletons[i] != null) {
								var zmeshname = results.skeletons[i].name;
								var zchildmoldname = zavatarname + "-" + zmeshname;
								results.skeletons[i].name = zchildmoldname;
								results.skeletons[i].id = zchildmoldname;
								WTW.registerMouseOver(results.skeletons[i]);
								if (results.skeletons[i].parent == null) {
									results.skeletons[i].scaling = new BABYLON.Vector3(zscalingx,zscalingy,zscalingz);
								}
								if (results.skeletons[i].bones != null) {
									/* the following boxes will be attached to various skeleton bones for easy parenting to the animated avatar */
									/* useful for carrying 3d objects */
									var zheadtopbone = -1;
									var zspine2bone = -1;
									var zrighthandbone = -1;
									var zlefthandbone = -1;
									var zrightlegbone = -1;
									var zleftlegbone = -1;
									var zrightfootbone = -1;
									var zleftfootbone = -1;
									for (var j=0; j < results.skeletons[i].bones.length; j++) {
										if (results.skeletons[i].bones[j] != null) {
											var zbonename = results.skeletons[i].bones[j].name.toLowerCase();
											if (zbonename.indexOf("headtop") > -1 && zheadtopbone == -1) {
												zheadtopbone = j;
											} else if (zbonename.indexOf("spine2") > -1 && zspine2bone == -1) {
												zspine2bone = j;
											} else if (zbonename.indexOf("righthand") > -1 && zrighthandbone == -1) {
												zrighthandbone = j;
											} else if (zbonename.indexOf("lefthand") > -1 && zlefthandbone == -1) {
												zlefthandbone = j;
											} else if (zbonename.indexOf("rightupleg") > -1 && zrightlegbone == -1) {
												zrightlegbone = j;
											} else if (zbonename.indexOf("leftupleg") > -1 && zleftlegbone == -1) {
												zleftlegbone = j;
											} else if (zbonename.indexOf("rightfoot") > -1 && zrightfootbone == -1) {
												zrightfootbone = j;
											} else if (zbonename.indexOf("leftfoot") > -1 && zleftfootbone == -1) {
												zleftfootbone = j;
											}
											if (j == 0) {
												results.skeletons[i].bones[j].parent = zavatarparent;
											} else {
												if (results.skeletons[i].bones[j].parent == null) {
													results.skeletons[i].bones[j].parent = results.skeletons[i].bones[0];
												}
											}
										}
									}
									if (zheadtopbone > -1) {
										/* headtop box parents to top of head */
										var zheadtop = scene.getMeshByID(zavatarname + "-headtop");
										if (zheadtop == null) {
											zheadtop = BABYLON.MeshBuilder.CreateBox(zavatarname + "-headtop", {}, scene);
											zheadtop.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-headtop', scene);
											zheadtop.material.alpha = 0;
											zheadtop.isPickable = true;
										}
										zheadtop.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zheadtop.attachToBone(results.skeletons[i].bones[zheadtopbone], results.meshes[0]);
										if (zavatarname == "myavatar-" + dGet("wtw_tinstanceid").value) {
											zavatarcamera.parent = zheadtop;
											zavatarcamera.position.y = 0;
											zavatarcamera.rotation.y = WTW.getRadians(0);
										}
									}
									if (zspine2bone > -1) {
										/* chest box parents to chest for carrying 3d objects in front or on back */
										var zchest = scene.getMeshByID(zavatarname + "-chest");
										if (zchest == null) {
											zchest = BABYLON.MeshBuilder.CreateBox(zavatarname + "-chest", {}, scene);
											zchest.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-chest', scene);
											zchest.material.alpha = 0;
											zchest.isPickable = true;
										}
										zchest.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zchest.attachToBone(results.skeletons[i].bones[zspine2bone], results.meshes[0]);
									}
									if (zrighthandbone > -1) {
										/* right hand parents to right hand while in t-pose direction */
										var zrighthand = scene.getMeshByID(zavatarname + "-righthand");
										if (zrighthand == null) {
											zrighthand = BABYLON.MeshBuilder.CreateBox(zavatarname + "-righthand", {}, scene);
											zrighthand.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-righthand', scene);
											zrighthand.material.alpha = 0;
											zrighthand.isPickable = true;
										}
										zrighthand.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zrighthand.attachToBone(results.skeletons[i].bones[zrighthandbone], results.meshes[0]);
									}
									if (zlefthandbone > -1) {
										/* left hand parents to left hand while in t-pose direction */
										var zlefthand = scene.getMeshByID(zavatarname + "-lefthand");
										if (zlefthand == null) {
											zlefthand = BABYLON.MeshBuilder.CreateBox(zavatarname + "-lefthand", {}, scene);
											zlefthand.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-lefthand', scene);
											zlefthand.material.alpha = 0;
											zlefthand.isPickable = true;
										}
										zlefthand.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zlefthand.attachToBone(results.skeletons[i].bones[zlefthandbone], results.meshes[0]);
									}
									if (zrightlegbone > -1) {
										/* right hip parents to top right leg */
										var zrighthip = scene.getMeshByID(zavatarname + "-righthip");
										if (zrighthip == null) {
											zrighthip = BABYLON.MeshBuilder.CreateBox(zavatarname + "-righthip", {}, scene);
											zrighthip.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-righthip', scene);
											zrighthip.material.alpha = 0;
											zrighthip.isPickable = true;
										}
										zrighthip.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zrighthip.attachToBone(results.skeletons[i].bones[zrightlegbone], results.meshes[0]);
									}
									if (zleftlegbone > -1) {
										/* left hip parents to top left leg */
										var zlefthip = scene.getMeshByID(zavatarname + "-lefthip");
										if (zlefthip == null) {
											zlefthip = BABYLON.MeshBuilder.CreateBox(zavatarname + "-lefthip", {}, scene);
											zlefthip.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-lefthip', scene);
											zlefthip.material.alpha = 0;
											zlefthip.isPickable = true;
										}
										zlefthip.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zlefthip.attachToBone(results.skeletons[i].bones[zleftlegbone], results.meshes[0]);
									}
									if (zrightfootbone > -1) {
										/* right foot parents to right foot */
										var zrightfoot = scene.getMeshByID(zavatarname + "-rightfoot");
										if (zrightfoot == null) {
											zrightfoot = BABYLON.MeshBuilder.CreateBox(zavatarname + "-rightfoot", {}, scene);
											zrightfoot.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-rightfoot', scene);
											zrightfoot.material.alpha = 0;
											zrightfoot.isPickable = true;
										}
										zrightfoot.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zrightfoot.attachToBone(results.skeletons[i].bones[zrightfootbone], results.meshes[0]);
									}
									if (zleftfootbone > -1) {
										/* left foot parents to left foot */
										var zleftfoot = scene.getMeshByID(zavatarname + "-leftfoot");
										if (zleftfoot == null) {
											zleftfoot = BABYLON.MeshBuilder.CreateBox(zavatarname + "-leftfoot", {}, scene);
											zleftfoot.material = new BABYLON.StandardMaterial("mat" + zavatarname + '-leftfoot', scene);
											zleftfoot.material.alpha = 0;
											zleftfoot.isPickable = true;
										}
										zleftfoot.scaling = new BABYLON.Vector3(1/zscalingx, 1/zscalingy, 1/zscalingz);
										zleftfoot.attachToBone(results.skeletons[i].bones[zleftfootbone], results.meshes[0]);
									}
								}


							}
						}
						/* load the avatar animations - note that the idle onwait animation is already loaded with the initial avatar object */
						/* zavataranimationdefs is an array of animation definitions to be loaded index 0 is the idle onwait event */
						WTW.reloadAvatarAnimations(zavatarname, zavataranimationdefs);
					} 
				}
				WTW.editAvatar = zavatar;
				zavatar = scene.getMeshByID(zavatarname);
				if (zavatar == null) {
					WTW.disposeClean(zavatarname);
				}
			}
		);
	} catch (ex) {
		WTW.log("core-scripts-avatars-basicavatars\r\n addAvatarForEdit=" + ex.message);
	}
	return zavatar;
}



WTWJS.prototype.addAvatarShark = function(zavatarname, zavatardef) {
	/* robo avatar as a shark - early test kept as template, may need to be retested with latest code before use */
	var zavatar;
	try {
		var zimageskinid = "v1n3kix1hb2ern02";
		var zimageeyesid = "hhyd114h30sybrv4";
		zavatar = scene.getMeshByID(zavatarname);
		var ztank = scene.getMeshByID(zavatardef.parentname);
		var ztailball = scene.getMeshByID(zavatarname + "-tailball");
		var zavatarshark = scene.getMeshByID(zavatarname + "-avatarshark");
		if (zavatar == null && ztank != null) {
			var zbasicmold = WTW.newMold();
			zbasicmold.covering = "hidden";
			zbasicmold.position.x = zavatardef.position.x;
			zbasicmold.position.y = zavatardef.position.y;
			zbasicmold.position.z = zavatardef.position.z;
			zbasicmold.scaling.x = 1 / Number(zavatardef.scaling.x);
			zbasicmold.scaling.y = 1 / Number(zavatardef.scaling.y);
			zbasicmold.scaling.z = 1 / Number(zavatardef.scaling.z);
			zbasicmold.rotation.y = zavatardef.rotation.y;
			zbasicmold.checkcollisions = "0";
			zavatar = WTW.addMold(zavatarname, zbasicmold, zavatardef.parentname, zbasicmold.covering);
			
			zbasicmold = WTW.newMold();
			zbasicmold.covering = "hidden";
			zbasicmold.position.x = 0;
			zbasicmold.position.y = 0;
			zbasicmold.position.z = 0;
			zbasicmold.rotation.y = 0;
			zbasicmold.parentname = zavatarname;
			zbasicmold.checkcollisions = "0";
			zavatarshark = WTW.addMold(zavatarname + "-avatarshark", zbasicmold, zbasicmold.parentname, zbasicmold.covering);

			zbasicmold = WTW.newMold();
			zbasicmold.covering = "hidden";
			zbasicmold.position.x = 6;
			zbasicmold.position.y = 0;
			zbasicmold.position.z = 0;
			zbasicmold.parentname = zavatarname + "-avatarshark";
			zbasicmold.checkcollisions = "0";
			WTW.addMold(zavatarname + "-checkfront", zbasicmold, zbasicmold.parentname, zbasicmold.covering);

			zbasicmold = WTW.newMold();
			zbasicmold.covering = "hidden";
			zbasicmold.position.x = 4;
			zbasicmold.position.y = 0;
			zbasicmold.position.z = 4;
			zbasicmold.parentname = zavatarname + "-avatarshark";
			zbasicmold.checkcollisions = "0";
			WTW.addMold(zavatarname + "-checkleft", zbasicmold, zbasicmold.parentname, zbasicmold.covering);

			zbasicmold = WTW.newMold();
			zbasicmold.covering = "hidden";
			zbasicmold.position.x = 4;
			zbasicmold.position.y = 0;
			zbasicmold.position.z = -4;
			zbasicmold.parentname = zavatarname + "-avatarshark";
			zbasicmold.checkcollisions = "0";
			WTW.addMold(zavatarname + "-checkright", zbasicmold, zbasicmold.parentname, zbasicmold.covering);
			
			var zskinmat = new BABYLON.StandardMaterial(zavatarname + "-skinmat",scene);
			var zimageinfo = WTW.getUploadFileData(zimageskinid);
			zskinmat.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo.filedata, zavatarname + "-skinmattexture", scene);
			zskinmat.specularColor = new BABYLON.Color3(.5,.5,.5);
			zskinmat.emissiveColor = new BABYLON.Color3(.8,.8,.8);
			zskinmat.diffuseColor = new BABYLON.Color3(.5,.5,.5);
			zskinmat.diffuseTexture.uScale = .7;
			
			var zeyemat = new BABYLON.StandardMaterial(zavatarname + "-eyemat",scene);
			var zimageinfo2 = WTW.getUploadFileData(zimageeyesid);
			zeyemat.diffuseTexture = new BABYLON.Texture.CreateFromBase64String(zimageinfo2.filedata, zavatarname + "-eyemattexture", scene);
			zeyemat.specularColor = new BABYLON.Color3(.5,.5,.5);
			zeyemat.emissiveColor = new BABYLON.Color3(.8,.8,.8);
			zeyemat.diffuseColor = new BABYLON.Color3(.5,.5,.5);
			
			var zshark = BABYLON.MeshBuilder.CreateSphere(zavatarname + "-shark",{segments: 20, diameter:1, updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE},scene);
			zshark.position.x = 0;
			zshark.position.y = .9;
			zshark.position.z = 0;
			zshark.scaling.x = 8;
			zshark.scaling.y = 1.5;
			zshark.scaling.z = .9;
			zshark.material = zskinmat;
			zshark.material.diffuseTexture.uOffset = .5;
			zshark.parent = zavatarshark;
			WTW.addReflectionToMold(WTW.waterMat, zshark);

			var zfins1 = BABYLON.MeshBuilder.CreateSphere(zavatarname + "-fins1",{segments: 20, diameter:1, updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE},scene);
			zfins1.position.x = .5;
			zfins1.position.y = .4;
			zfins1.position.z = .5;
			zfins1.scaling.x = .4;
			zfins1.scaling.y = 1.5;
			zfins1.scaling.z = .3;
			zfins1.rotation.x = WTW.getRadians(120);
			zfins1.material = zskinmat;
			zfins1.material.diffuseTexture.uOffset = .5;
			zfins1.parent = zavatarshark;
			WTW.addReflectionToMold(WTW.waterMat, zfins1);
			var zfins2 = BABYLON.MeshBuilder.CreateSphere(zavatarname + "-fins2",{segments: 20, diameter:.8, updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE},scene);
			zfins2.position.x = .5;
			zfins2.position.y = .4;
			zfins2.position.z = -.5;
			zfins2.scaling.x = .4;
			zfins2.scaling.y = 1.5;
			zfins2.scaling.z = .3;
			zfins2.rotation.x = WTW.getRadians(-120);
			zfins2.material = zskinmat;
			zfins2.parent = zavatarshark;
			WTW.addReflectionToMold(WTW.waterMat, zfins2);
			var zfins3 = BABYLON.MeshBuilder.CreateSphere(zavatarname + "-fins3",{segments: 20, diameter:.8, updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE},scene);
			zfins3.position.x = -2;
			zfins3.position.y = .5;
			zfins3.position.z = -.5;
			zfins3.scaling.x = .5;
			zfins3.scaling.y = .7;
			zfins3.scaling.z = .1;
			zfins3.rotation.x = WTW.getRadians(-120);
			zfins3.material = zskinmat;
			zfins3.parent = zavatarshark;
			WTW.addReflectionToMold(WTW.waterMat, zfins3);
			var zfins4 = BABYLON.MeshBuilder.CreateSphere(zavatarname + "-fins4",{segments: 20, diameter:.8, updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE},scene);
			zfins4.position.x = -2;
			zfins4.position.y = .5;
			zfins4.position.z = .5;
			zfins4.scaling.x = .5;
			zfins4.scaling.y = .7;
			zfins4.scaling.z = .1;
			zfins4.rotation.x = WTW.getRadians(120);
			zfins4.material = zskinmat;
			zfins4.parent = zavatarshark;
			WTW.addReflectionToMold(WTW.waterMat, zfins4);
			var zheadfin = BABYLON.MeshBuilder.CreateCylinder(zavatarname + "-hfin",{height: 1, diameterTop: 0, diameterBottom: 1, tessellation: 30, subdivisions: 1, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE},scene);
			zheadfin.position.x = -.5;
			zheadfin.position.y = 1.85;
			zheadfin.position.z = 0;
			zheadfin.scaling.z = .12;
			zheadfin.scaling.x = 2;
			zheadfin.material = zskinmat;
			zheadfin.parent = zavatarshark;
			WTW.addReflectionToMold(WTW.waterMat, zheadfin);
			var zsharkeye = BABYLON.MeshBuilder.CreateSphere(zavatarname + "-eye1",{segments: 20, diameter:1, updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE},scene);
			zsharkeye.position.x = 3.3;
			zsharkeye.position.y = 1;
			zsharkeye.position.z = .22;
			zsharkeye.scaling.x = .15;
			zsharkeye.scaling.y = .15;
			zsharkeye.scaling.z = .15;
			zsharkeye.material = zeyemat;
			zsharkeye.parent = zavatarshark;
			var zsharkeye2 = BABYLON.MeshBuilder.CreateSphere(zavatarname + "-eye2",{segments: 20, diameter:1, updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE},scene);
			zsharkeye2.position.x = 3.3;
			zsharkeye2.position.y = 1;
			zsharkeye2.position.z = -.22;
			zsharkeye2.scaling.x = .15;
			zsharkeye2.scaling.y = .15;
			zsharkeye2.scaling.z = .15;
			zsharkeye2.material = zeyemat;
			zsharkeye2.parent = zavatarshark;
			
			var zbasicmold = WTW.newMold();
			zbasicmold.shape = "sphere";
			zbasicmold.covering = "hidden";
			zbasicmold.position.x = -3.6;
			zbasicmold.position.y = .9;
			zbasicmold.position.z = 0;
			zbasicmold.subdivisions = 12;
			zbasicmold.parentname = zavatarname + "-avatarshark";
			zbasicmold.checkcollisions = "0";
			ztailball = WTW.addMold(zavatarname + "-tailball", zbasicmold, zbasicmold.parentname, zbasicmold.covering);

			zbasicmold = WTW.newMold();
			zbasicmold.shape = "cone";
			zbasicmold.covering = "texture";
			zbasicmold.position.x = -.6;
			zbasicmold.position.y = 0;
			zbasicmold.position.z = 0;
			zbasicmold.scaling.x = .8;
			zbasicmold.scaling.y = 1.7;
			zbasicmold.scaling.z = .3;
			zbasicmold.rotation.z = 90;
			zbasicmold.subdivisions = 12;
			zbasicmold.graphics.texture.id = zimageskinid;
			zbasicmold.parentname = zavatarname + "-tailball";
			zbasicmold.checkcollisions = "0";
			var ztailcone = WTW.addMold(zavatarname + "-tailcone", zbasicmold, zbasicmold.parentname, zbasicmold.covering);
			WTW.addReflectionToMold(WTW.waterMat, ztailcone);
			
			var ztailfin2 = BABYLON.MeshBuilder.CreateCylinder(zavatarname + "-tail2",{height: 2, diameterTop: 0, diameterBottom: 1, tessellation: 10, subdivisions: 1, updatable: false, sideOrientation: BABYLON.Mesh.DOUBLESIDE},scene);
			ztailfin2.position.x = -4;
			ztailfin2.position.y = .9;
			ztailfin2.position.z = 0;
			ztailfin2.scaling.x = .15;
			ztailfin2.scaling.y = 1;
			ztailfin2.scaling.z = 1.7;
			ztailfin2.rotation.z = WTW.getRadians(-90);
			ztailfin2.rotation.x = WTW.getRadians(90);
			var ztailfin3 = BABYLON.MeshBuilder.CreateCylinder(zavatarname + "-tail3",{height: .7, diameterTop: 0, diameterBottom: 1, tessellation: 10, subdivisions: 1, updatable: false, sideOrientation: BABYLON.Mesh.DEFAULTSIDE},scene);
			ztailfin3.position.x = -5.8;
			ztailfin3.position.y = .9;
			ztailfin3.position.z = 0;
			ztailfin3.scaling.x = .2;
			ztailfin3.scaling.y = 1;
			ztailfin3.scaling.z = 1;
			ztailfin3.rotation.z = WTW.getRadians(-90);
			ztailfin3.rotation.x = WTW.getRadians(90);
			var zaCSG = BABYLON.CSG.FromMesh(ztailfin2);
			var zbCSG = BABYLON.CSG.FromMesh(ztailfin3);
			var zrealtail = zaCSG.subtract(zbCSG);
			ztailfin2.dispose();
			ztailfin3.dispose();

			var ztailfin = zrealtail.toMesh(zavatarname + "-tailfin",zskinmat,scene);
			ztailfin.position.x = -.5;
			ztailfin.position.y = 0;
			ztailfin.position.z = 0;
			ztailfin.parent = ztailball;
			WTW.addReflectionToMold(WTW.waterMat, ztailfin);
		} else if (zavatar != null && ztailball != null && zavatarshark != null && ztank != null) {
			// position changed - forward
			var ztailrot = Math.round(WTW.getDegrees(ztailball.rotation.y));
			if (ztailrot > 90) {
				ztailrot -= 360;
			}
			if (ztailrot >= 30 && WTW.isOdd(Math.round(ztailrot))) {
				ztailball.rotation.y = WTW.getRadians(ztailrot - 1);
			} else if (ztailrot <= -30 && WTW.isOdd(Math.round(ztailrot)) == false) {
				ztailball.rotation.y = WTW.getRadians(ztailrot + 1);
			} else if (ztailrot < 30 && WTW.isOdd(ztailrot)) {
				ztailball.rotation.y = WTW.getRadians(ztailrot + 4);
			} else {
				ztailball.rotation.y = WTW.getRadians(ztailrot - 4);
			}
			zavatar.rotation.y = WTW.getRadians(Number(zavatardef.rotation.y));
			zavatarshark.rotation.y = -(ztailball.rotation.y)/4;
			zavatar.position.x = Number(zavatardef.position.x);
			zavatar.position.y = Number(zavatardef.position.y);
			zavatar.position.z = Number(zavatardef.position.z); 
			zavatarshark.position.z = -Number(ztailball.rotation.y);
		} else {
			try {
				window.clearInterval(zavatardef.movetimer);
				zavatardef.movetimer = null;
			} catch (ex) {}
		}
	} catch (ex) {
		WTW.log("core-scripts-avatars-customavatars\r\n addAvatarShark=" + ex.message);
	}
	return zavatar;
}
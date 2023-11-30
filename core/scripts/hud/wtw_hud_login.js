/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* The heads up display (hud) provides menu options and user settings */
/* These functions create the login and avatar seections for HUD */

WTWJS.prototype.openLoginHUD = function(zpage) {
	/* Open the Login HUD */
	try {
		if (zpage == 'User Menu' && dGet('wtw_tuserid').value == '') {
			zpage = 'Login Menu';
		}
		var zmoldname = 'hudlogin';
		var zhudlogin = WTW.getMeshOrNodeByID(zmoldname);
		var zobjectfolder = '/content/system/babylon/menus/';
		var zobjectfile = 'wtw-loginmenu.babylon';
		var zobjectanimations = [];
		var zheight = 0;
		if (zhudlogin != null) {
			WTW.closeLoginHUD();
		}
		var zcamerafront = WTW.getMeshOrNodeByID('camerafront');
		
		if (zpage == 'Edit My Avatar') {
			zheight = 1;
		}
		zhudlogin = new BABYLON.TransformNode(zmoldname);
		if (WTW.sizeX < WTW.sizeY) {
			zhudlogin.position = new BABYLON.Vector3(0,5 + zheight,0);
		} else {
			zhudlogin.position = new BABYLON.Vector3(0,zheight,0);
		}
		zhudlogin.rotation = new BABYLON.Vector3(0,WTW.getRadians(90),WTW.getRadians(20));
		zhudlogin.scaling = new BABYLON.Vector3(1,1,1);
		zhudlogin.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
		zhudlogin.parent = zcamerafront;

		switch (zpage) {
			case "Loading 3D Scene":
			case "Loading 3D Model":
			case "Loading 3D Avatar":
			case "Loading 3D Community":
			case "Loading 3D Building":
			case "Loading 3D Thing":
			case "Loading":
				zobjectfile = 'wtw-loading.babylon';
				
				zobjectanimations[0] = WTW.newObjectAnimation();
				zobjectanimations[0].animationname = 'HUDLOGINonloadloading';
				zobjectanimations[0].moldevent = 'onload';
				zobjectanimations[0].moldnamepart = 'spindle';
				zobjectanimations[0].startframe = 0;
				zobjectanimations[0].endframe = 180;
				zobjectanimations[0].animationloop = true;
				zobjectanimations[0].speedratio = 1.00;
				zobjectanimations[0].additionalscript = '';
				zobjectanimations[0].additionalparameters = '';
				break;
			case "Login Menu":
				zobjectfile = 'wtw-loginmenu.babylon';
				
				zobjectanimations[0] = WTW.newObjectAnimation();
				zobjectanimations[0].animationname = 'HUDLOGINonloadloginmenu';
				zobjectanimations[0].moldevent = 'onload';
				zobjectanimations[0].moldnamepart = '';
				zobjectanimations[0].startframe = 80;
				zobjectanimations[0].endframe = 100;
				zobjectanimations[0].animationloop = false;
				zobjectanimations[0].speedratio = 1.00;
				zobjectanimations[0].additionalscript = '';
				zobjectanimations[0].additionalparameters = '';
				
				zobjectanimations[1] = WTW.newObjectAnimation();
				zobjectanimations[1].animationname = 'HUDLOGINbuttonloginwtw';
				zobjectanimations[1].moldevent = 'onclick';
				zobjectanimations[1].moldnamepart = 'button-loginwtw';
				zobjectanimations[1].startframe = 1;
				zobjectanimations[1].endframe = 20;
				zobjectanimations[1].animationloop = false;
				zobjectanimations[1].speedratio = 1.00;
				zobjectanimations[1].additionalscript = '';
				zobjectanimations[1].additionalparameters = '';

				zobjectanimations[2] = WTW.newObjectAnimation();
				zobjectanimations[2].animationname = 'HUDLOGINbuttonloginlocal';
				zobjectanimations[2].moldevent = 'onclick';
				zobjectanimations[2].moldnamepart = 'button-loginlocal';
				zobjectanimations[2].startframe = 20;
				zobjectanimations[2].endframe = 40;
				zobjectanimations[2].animationloop = false;
				zobjectanimations[2].speedratio = 1.00;
				zobjectanimations[2].additionalscript = '';
				zobjectanimations[2].additionalparameters = '';

				zobjectanimations[3] = WTW.newObjectAnimation();
				zobjectanimations[3].animationname = 'HUDLOGINbuttonloginguest';
				zobjectanimations[3].moldevent = 'onclick';
				zobjectanimations[3].moldnamepart = 'button-loginguest';
				zobjectanimations[3].startframe = 40;
				zobjectanimations[3].endframe = 60;
				zobjectanimations[3].animationloop = false;
				zobjectanimations[3].speedratio = 1.00;
				zobjectanimations[3].additionalscript = '';
				zobjectanimations[3].additionalparameters = '';

				zobjectanimations[4] = WTW.newObjectAnimation();
				zobjectanimations[4].animationname = 'HUDLOGINbuttoncloseloginmenu';
				zobjectanimations[4].moldevent = 'onclick';
				zobjectanimations[4].moldnamepart = 'button-closeloginmenu';
				zobjectanimations[4].startframe = 60;
				zobjectanimations[4].endframe = 80;
				zobjectanimations[4].animationloop = false;
				zobjectanimations[4].speedratio = 1.00;
				zobjectanimations[4].additionalscript = '';
				zobjectanimations[4].additionalparameters = '';
				break;
			case "Enter":
			case "Enter Menu":
				zobjectfile = 'wtw-entermenu.babylon';
				
				zobjectanimations[0] = WTW.newObjectAnimation();
				zobjectanimations[0].animationname = 'HUDLOGINonloadentermenu';
				zobjectanimations[0].moldevent = 'onload';
				zobjectanimations[0].moldnamepart = '';
				zobjectanimations[0].startframe = 80;
				zobjectanimations[0].endframe = 100;
				zobjectanimations[0].animationloop = false;
				zobjectanimations[0].speedratio = 1.00;
				zobjectanimations[0].additionalscript = '';
				zobjectanimations[0].additionalparameters = '';
				
				zobjectanimations[1] = WTW.newObjectAnimation();
				zobjectanimations[1].animationname = 'HUDLOGINbuttonenter';
				zobjectanimations[1].moldevent = 'onclick';
				zobjectanimations[1].moldnamepart = 'button-enter';
				zobjectanimations[1].startframe = 1;
				zobjectanimations[1].endframe = 20;
				zobjectanimations[1].animationloop = false;
				zobjectanimations[1].speedratio = 1.00;
				zobjectanimations[1].additionalscript = '';
				zobjectanimations[1].additionalparameters = '';

				zobjectanimations[2] = WTW.newObjectAnimation();
				zobjectanimations[2].animationname = 'HUDLOGINbuttonenterlogin';
				zobjectanimations[2].moldevent = 'onclick';
				zobjectanimations[2].moldnamepart = 'button-enterlogin';
				zobjectanimations[2].startframe = 20;
				zobjectanimations[2].endframe = 40;
				zobjectanimations[2].animationloop = false;
				zobjectanimations[2].speedratio = 1.00;
				zobjectanimations[2].additionalscript = '';
				zobjectanimations[2].additionalparameters = '';

				break;
			case "User Menu":
				zobjectfile = 'wtw-usermenu.babylon';
				
				zobjectanimations[0] = WTW.newObjectAnimation();
				zobjectanimations[0].animationname = 'HUDLOGINonloadusermenu';
				zobjectanimations[0].moldevent = 'onload';
				zobjectanimations[0].moldnamepart = '';
				zobjectanimations[0].startframe = 100;
				zobjectanimations[0].endframe = 120;
				zobjectanimations[0].animationloop = false;
				zobjectanimations[0].speedratio = 1.00;
				zobjectanimations[0].additionalscript = '';
				zobjectanimations[0].additionalparameters = '';
				
				zobjectanimations[1] = WTW.newObjectAnimation();
				zobjectanimations[1].animationname = 'HUDLOGINbuttoneditprofile';
				zobjectanimations[1].moldevent = 'onclick';
				zobjectanimations[1].moldnamepart = 'button-editprofile';
				zobjectanimations[1].startframe = 1;
				zobjectanimations[1].endframe = 20;
				zobjectanimations[1].animationloop = false;
				zobjectanimations[1].speedratio = 1.00;
				zobjectanimations[1].additionalscript = '';
				zobjectanimations[1].additionalparameters = '';

				zobjectanimations[2] = WTW.newObjectAnimation();
				zobjectanimations[2].animationname = 'HUDLOGINbuttonavatarselect';
				zobjectanimations[2].moldevent = 'onclick';
				zobjectanimations[2].moldnamepart = 'button-avatarselect';
				zobjectanimations[2].startframe = 20;
				zobjectanimations[2].endframe = 40;
				zobjectanimations[2].animationloop = false;
				zobjectanimations[2].speedratio = 1.00;
				zobjectanimations[2].additionalscript = '';
				zobjectanimations[2].additionalparameters = '';

				zobjectanimations[3] = WTW.newObjectAnimation();
				zobjectanimations[3].animationname = 'HUDLOGINbuttonavataredit';
				zobjectanimations[3].moldevent = 'onclick';
				zobjectanimations[3].moldnamepart = 'button-avataredit';
				zobjectanimations[3].startframe = 40;
				zobjectanimations[3].endframe = 60;
				zobjectanimations[3].animationloop = false;
				zobjectanimations[3].speedratio = 1.00;
				zobjectanimations[3].additionalscript = '';
				zobjectanimations[3].additionalparameters = '';

				zobjectanimations[4] = WTW.newObjectAnimation();
				zobjectanimations[4].animationname = 'HUDLOGINbuttonlogout';
				zobjectanimations[4].moldevent = 'onclick';
				zobjectanimations[4].moldnamepart = 'button-logout';
				zobjectanimations[4].startframe = 60;
				zobjectanimations[4].endframe = 80;
				zobjectanimations[4].animationloop = false;
				zobjectanimations[4].speedratio = 1.00;
				zobjectanimations[4].additionalscript = '';
				zobjectanimations[4].additionalparameters = '';

				zobjectanimations[5] = WTW.newObjectAnimation();
				zobjectanimations[5].animationname = 'HUDLOGINbuttonclose';
				zobjectanimations[5].moldevent = 'onclick';
				zobjectanimations[5].moldnamepart = 'button-close';
				zobjectanimations[5].startframe = 80;
				zobjectanimations[5].endframe = 100;
				zobjectanimations[5].animationloop = false;
				zobjectanimations[5].speedratio = 1.00;
				zobjectanimations[5].additionalscript = '';
				zobjectanimations[5].additionalparameters = '';

				break;
			case "WalkTheWeb Login":
			case "3D Website Login":
				zobjectfile = 'wtw-login.babylon';
				
				zobjectanimations[0] = WTW.newObjectAnimation();
				zobjectanimations[0].animationname = 'HUDLOGINonloadlogin';
				zobjectanimations[0].moldevent = 'onload';
				zobjectanimations[0].moldnamepart = '';
				zobjectanimations[0].startframe = 80;
				zobjectanimations[0].endframe = 100;
				zobjectanimations[0].animationloop = false;
				zobjectanimations[0].speedratio = 1.00;
				zobjectanimations[0].additionalscript = '';
				zobjectanimations[0].additionalparameters = '';
				
				zobjectanimations[1] = WTW.newObjectAnimation();
				zobjectanimations[1].animationname = 'HUDLOGINbuttonlogin';
				zobjectanimations[1].moldevent = 'onclick';
				zobjectanimations[1].moldnamepart = 'button-login';
				zobjectanimations[1].startframe = 1;
				zobjectanimations[1].endframe = 20;
				zobjectanimations[1].animationloop = false;
				zobjectanimations[1].speedratio = 1.00;
				zobjectanimations[1].additionalscript = '';
				zobjectanimations[1].additionalparameters = '';

				zobjectanimations[2] = WTW.newObjectAnimation();
				zobjectanimations[2].animationname = 'HUDLOGINbuttoncreatelink';
				zobjectanimations[2].moldevent = 'onclick';
				zobjectanimations[2].moldnamepart = 'button-createlink';
				zobjectanimations[2].startframe = 20;
				zobjectanimations[2].endframe = 40;
				zobjectanimations[2].animationloop = false;
				zobjectanimations[2].speedratio = 1.00;
				zobjectanimations[2].additionalscript = '';
				zobjectanimations[2].additionalparameters = '';

				zobjectanimations[3] = WTW.newObjectAnimation();
				zobjectanimations[3].animationname = 'HUDLOGINbuttonforgot';
				zobjectanimations[3].moldevent = 'onclick';
				zobjectanimations[3].moldnamepart = 'button-forgot';
				zobjectanimations[3].startframe = 40;
				zobjectanimations[3].endframe = 60;
				zobjectanimations[3].animationloop = false;
				zobjectanimations[3].speedratio = 1.00;
				zobjectanimations[3].additionalscript = '';
				zobjectanimations[3].additionalparameters = '';

				zobjectanimations[4] = WTW.newObjectAnimation();
				zobjectanimations[4].animationname = 'HUDLOGINbuttoncancellogin';
				zobjectanimations[4].moldevent = 'onclick';
				zobjectanimations[4].moldnamepart = 'button-cancellogin';
				zobjectanimations[4].startframe = 60;
				zobjectanimations[4].endframe = 80;
				zobjectanimations[4].animationloop = false;
				zobjectanimations[4].speedratio = 1.00;
				zobjectanimations[4].additionalscript = '';
				zobjectanimations[4].additionalparameters = '';

				zobjectanimations[5] = WTW.newObjectAnimation();
				zobjectanimations[5].animationname = 'HUDLOGINbuttonclose';
				zobjectanimations[5].moldevent = 'onclick';
				zobjectanimations[5].moldnamepart = 'button-close';
				zobjectanimations[5].startframe = 100;
				zobjectanimations[5].endframe = 120;
				zobjectanimations[5].animationloop = false;
				zobjectanimations[5].speedratio = 1.00;
				zobjectanimations[5].additionalscript = '';
				zobjectanimations[5].additionalparameters = '';

				break;
			case "Create WTW Login":
			case "Create Login":
				zobjectfile = 'wtw-create.babylon';
				
				zobjectanimations[0] = WTW.newObjectAnimation();
				zobjectanimations[0].animationname = 'HUDLOGINonloadcreatelogin';
				zobjectanimations[0].moldevent = 'onload';
				zobjectanimations[0].moldnamepart = '';
				zobjectanimations[0].startframe = 80;
				zobjectanimations[0].endframe = 100;
				zobjectanimations[0].animationloop = false;
				zobjectanimations[0].speedratio = 1.00;
				zobjectanimations[0].additionalscript = '';
				zobjectanimations[0].additionalparameters = '';
				
				zobjectanimations[1] = WTW.newObjectAnimation();
				zobjectanimations[1].animationname = 'HUDLOGINbuttoncreate';
				zobjectanimations[1].moldevent = 'onclick';
				zobjectanimations[1].moldnamepart = 'button-create';
				zobjectanimations[1].startframe = 1;
				zobjectanimations[1].endframe = 20;
				zobjectanimations[1].animationloop = false;
				zobjectanimations[1].speedratio = 1.00;
				zobjectanimations[1].additionalscript = '';
				zobjectanimations[1].additionalparameters = '';

				zobjectanimations[2] = WTW.newObjectAnimation();
				zobjectanimations[2].animationname = 'HUDLOGINbuttonclose';
				zobjectanimations[2].moldevent = 'onclick';
				zobjectanimations[2].moldnamepart = 'button-close';
				zobjectanimations[2].startframe = 20;
				zobjectanimations[2].endframe = 40;
				zobjectanimations[2].animationloop = false;
				zobjectanimations[2].speedratio = 1.00;
				zobjectanimations[2].additionalscript = '';
				zobjectanimations[2].additionalparameters = '';

				zobjectanimations[3] = WTW.newObjectAnimation();
				zobjectanimations[3].animationname = 'HUDLOGINbuttoncancelcreate';
				zobjectanimations[3].moldevent = 'onclick';
				zobjectanimations[3].moldnamepart = 'button-cancelcreate';
				zobjectanimations[3].startframe = 60;
				zobjectanimations[3].endframe = 80;
				zobjectanimations[3].animationloop = false;
				zobjectanimations[3].speedratio = 1.00;
				zobjectanimations[3].additionalscript = '';
				zobjectanimations[3].additionalparameters = '';

				break;
			case "Reset Password":
				zobjectfile = 'wtw-passwordreset.babylon';
				
				zobjectanimations[0] = WTW.newObjectAnimation();
				zobjectanimations[0].animationname = 'HUDLOGINonloadresetpassword';
				zobjectanimations[0].moldevent = 'onload';
				zobjectanimations[0].moldnamepart = '';
				zobjectanimations[0].startframe = 80;
				zobjectanimations[0].endframe = 100;
				zobjectanimations[0].animationloop = false;
				zobjectanimations[0].speedratio = 1.00;
				zobjectanimations[0].additionalscript = '';
				zobjectanimations[0].additionalparameters = '';
				
				zobjectanimations[1] = WTW.newObjectAnimation();
				zobjectanimations[1].animationname = 'HUDLOGINbuttonreset';
				zobjectanimations[1].moldevent = 'onclick';
				zobjectanimations[1].moldnamepart = 'button-reset';
				zobjectanimations[1].startframe = 1;
				zobjectanimations[1].endframe = 20;
				zobjectanimations[1].animationloop = false;
				zobjectanimations[1].speedratio = 1.00;
				zobjectanimations[1].additionalscript = '';
				zobjectanimations[1].additionalparameters = '';

				zobjectanimations[2] = WTW.newObjectAnimation();
				zobjectanimations[2].animationname = 'HUDLOGINbuttonclose';
				zobjectanimations[2].moldevent = 'onclick';
				zobjectanimations[2].moldnamepart = 'button-close';
				zobjectanimations[2].startframe = 20;
				zobjectanimations[2].endframe = 40;
				zobjectanimations[2].animationloop = false;
				zobjectanimations[2].speedratio = 1.00;
				zobjectanimations[2].additionalscript = '';
				zobjectanimations[2].additionalparameters = '';

				zobjectanimations[3] = WTW.newObjectAnimation();
				zobjectanimations[3].animationname = 'HUDLOGINbuttoncancelreset';
				zobjectanimations[3].moldevent = 'onclick';
				zobjectanimations[3].moldnamepart = 'button-cancelreset';
				zobjectanimations[3].startframe = 60;
				zobjectanimations[3].endframe = 80;
				zobjectanimations[3].animationloop = false;
				zobjectanimations[3].speedratio = 1.00;
				zobjectanimations[3].additionalscript = '';
				zobjectanimations[3].additionalparameters = '';

				break;
			case "Select My Avatar":
				zobjectfile = 'wtw-selectavatar.babylon';
				
				zobjectanimations[0] = WTW.newObjectAnimation();
				zobjectanimations[0].animationname = 'HUDLOGINonloadselectavatar';
				zobjectanimations[0].moldevent = 'onload';
				zobjectanimations[0].moldnamepart = '';
				zobjectanimations[0].startframe = 80;
				zobjectanimations[0].endframe = 100;
				zobjectanimations[0].animationloop = false;
				zobjectanimations[0].speedratio = 1.00;
				zobjectanimations[0].additionalscript = '';
				zobjectanimations[0].additionalparameters = '';
				
				zobjectanimations[1] = WTW.newObjectAnimation();
				zobjectanimations[1].animationname = 'HUDLOGINbuttonnext';
				zobjectanimations[1].moldevent = 'onclick';
				zobjectanimations[1].moldnamepart = 'button-next';
				zobjectanimations[1].startframe = 1;
				zobjectanimations[1].endframe = 20;
				zobjectanimations[1].animationloop = false;
				zobjectanimations[1].speedratio = 1.00;
				zobjectanimations[1].additionalscript = '';
				zobjectanimations[1].additionalparameters = '';

				zobjectanimations[2] = WTW.newObjectAnimation();
				zobjectanimations[2].animationname = 'HUDLOGINbuttonprevious';
				zobjectanimations[2].moldevent = 'onclick';
				zobjectanimations[2].moldnamepart = 'button-previous';
				zobjectanimations[2].startframe = 20;
				zobjectanimations[2].endframe = 40;
				zobjectanimations[2].animationloop = false;
				zobjectanimations[2].speedratio = 1.00;
				zobjectanimations[2].additionalscript = '';
				zobjectanimations[2].additionalparameters = '';

				zobjectanimations[3] = WTW.newObjectAnimation();
				zobjectanimations[3].animationname = 'HUDLOGINbuttoncancelselect';
				zobjectanimations[3].moldevent = 'onclick';
				zobjectanimations[3].moldnamepart = 'button-cancelselect';
				zobjectanimations[3].startframe = 40;
				zobjectanimations[3].endframe = 60;
				zobjectanimations[3].animationloop = false;
				zobjectanimations[3].speedratio = 1.00;
				zobjectanimations[3].additionalscript = '';
				zobjectanimations[3].additionalparameters = '';

				zobjectanimations[4] = WTW.newObjectAnimation();
				zobjectanimations[4].animationname = 'HUDLOGINbuttonsave';
				zobjectanimations[4].moldevent = 'onclick';
				zobjectanimations[4].moldnamepart = 'button-save';
				zobjectanimations[4].startframe = 60;
				zobjectanimations[4].endframe = 80;
				zobjectanimations[4].animationloop = false;
				zobjectanimations[4].speedratio = 1.00;
				zobjectanimations[4].additionalscript = '';
				zobjectanimations[4].additionalparameters = '';

				zobjectanimations[5] = WTW.newObjectAnimation();
				zobjectanimations[5].animationname = 'HUDLOGINbuttonclose';
				zobjectanimations[5].moldevent = 'onclick';
				zobjectanimations[5].moldnamepart = 'button-close';
				zobjectanimations[5].startframe = 100;
				zobjectanimations[5].endframe = 120;
				zobjectanimations[5].animationloop = false;
				zobjectanimations[5].speedratio = 1.00;
				zobjectanimations[5].additionalscript = '';
				zobjectanimations[5].additionalparameters = '';

				break;
			case "Edit My Avatar":
				zobjectfile = 'wtw-editavatarmenu.babylon';
				
				zobjectanimations[0] = WTW.newObjectAnimation();
				zobjectanimations[0].animationname = 'HUDLOGINonloadeditavatarmenu';
				zobjectanimations[0].moldevent = 'onload';
				zobjectanimations[0].moldnamepart = '';
				zobjectanimations[0].startframe = 280;
				zobjectanimations[0].endframe = 300;
				zobjectanimations[0].animationloop = false;
				zobjectanimations[0].speedratio = 1.00;
				zobjectanimations[0].additionalscript = '';
				zobjectanimations[0].additionalparameters = '';
				
				zobjectanimations[1] = WTW.newObjectAnimation();
				zobjectanimations[1].animationname = 'HUDLOGINbuttonpart0';
				zobjectanimations[1].moldevent = 'onclick';
				zobjectanimations[1].moldnamepart = 'button-part-0';
				zobjectanimations[1].startframe = 1;
				zobjectanimations[1].endframe = 20;
				zobjectanimations[1].animationloop = false;
				zobjectanimations[1].speedratio = 1.00;
				zobjectanimations[1].additionalscript = '';
				zobjectanimations[1].additionalparameters = '';

				zobjectanimations[2] = WTW.newObjectAnimation();
				zobjectanimations[2].animationname = 'HUDLOGINbuttonpart1';
				zobjectanimations[2].moldevent = 'onclick';
				zobjectanimations[2].moldnamepart = 'button-part-1';
				zobjectanimations[2].startframe = 20;
				zobjectanimations[2].endframe = 40;
				zobjectanimations[2].animationloop = false;
				zobjectanimations[2].speedratio = 1.00;
				zobjectanimations[2].additionalscript = '';
				zobjectanimations[2].additionalparameters = '';

				zobjectanimations[3] = WTW.newObjectAnimation();
				zobjectanimations[3].animationname = 'HUDLOGINbuttonpart2';
				zobjectanimations[3].moldevent = 'onclick';
				zobjectanimations[3].moldnamepart = 'button-part-2';
				zobjectanimations[3].startframe = 40;
				zobjectanimations[3].endframe = 60;
				zobjectanimations[3].animationloop = false;
				zobjectanimations[3].speedratio = 1.00;
				zobjectanimations[3].additionalscript = '';
				zobjectanimations[3].additionalparameters = '';

				zobjectanimations[4] = WTW.newObjectAnimation();
				zobjectanimations[4].animationname = 'HUDLOGINbuttonpart3';
				zobjectanimations[4].moldevent = 'onclick';
				zobjectanimations[4].moldnamepart = 'button-part-3';
				zobjectanimations[4].startframe = 60;
				zobjectanimations[4].endframe = 80;
				zobjectanimations[4].animationloop = false;
				zobjectanimations[4].speedratio = 1.00;
				zobjectanimations[4].additionalscript = '';
				zobjectanimations[4].additionalparameters = '';

				zobjectanimations[5] = WTW.newObjectAnimation();
				zobjectanimations[5].animationname = 'HUDLOGINbuttonpart4';
				zobjectanimations[5].moldevent = 'onclick';
				zobjectanimations[5].moldnamepart = 'button-part-4';
				zobjectanimations[5].startframe = 80;
				zobjectanimations[5].endframe = 100;
				zobjectanimations[5].animationloop = false;
				zobjectanimations[5].speedratio = 1.00;
				zobjectanimations[5].additionalscript = '';
				zobjectanimations[5].additionalparameters = '';

				zobjectanimations[6] = WTW.newObjectAnimation();
				zobjectanimations[6].animationname = 'HUDLOGINbuttonpart5';
				zobjectanimations[6].moldevent = 'onclick';
				zobjectanimations[6].moldnamepart = 'button-part-5';
				zobjectanimations[6].startframe = 100;
				zobjectanimations[6].endframe = 120;
				zobjectanimations[6].animationloop = false;
				zobjectanimations[6].speedratio = 1.00;
				zobjectanimations[6].additionalscript = '';
				zobjectanimations[6].additionalparameters = '';

				zobjectanimations[7] = WTW.newObjectAnimation();
				zobjectanimations[7].animationname = 'HUDLOGINbuttonpart6';
				zobjectanimations[7].moldevent = 'onclick';
				zobjectanimations[7].moldnamepart = 'button-part-6';
				zobjectanimations[7].startframe = 120;
				zobjectanimations[7].endframe = 140;
				zobjectanimations[7].animationloop = false;
				zobjectanimations[7].speedratio = 1.00;
				zobjectanimations[7].additionalscript = '';
				zobjectanimations[7].additionalparameters = '';

				zobjectanimations[8] = WTW.newObjectAnimation();
				zobjectanimations[8].animationname = 'HUDLOGINbuttonpart7';
				zobjectanimations[8].moldevent = 'onclick';
				zobjectanimations[8].moldnamepart = 'button-part-7';
				zobjectanimations[8].startframe = 140;
				zobjectanimations[8].endframe = 160;
				zobjectanimations[8].animationloop = false;
				zobjectanimations[8].speedratio = 1.00;
				zobjectanimations[8].additionalscript = '';
				zobjectanimations[8].additionalparameters = '';

				zobjectanimations[9] = WTW.newObjectAnimation();
				zobjectanimations[9].animationname = 'HUDLOGINbuttonpart8';
				zobjectanimations[9].moldevent = 'onclick';
				zobjectanimations[9].moldnamepart = 'button-part-8';
				zobjectanimations[9].startframe = 160;
				zobjectanimations[9].endframe = 180;
				zobjectanimations[9].animationloop = false;
				zobjectanimations[9].speedratio = 1.00;
				zobjectanimations[9].additionalscript = '';
				zobjectanimations[9].additionalparameters = '';

				zobjectanimations[10] = WTW.newObjectAnimation();
				zobjectanimations[10].animationname = 'HUDLOGINbuttonpart9';
				zobjectanimations[10].moldevent = 'onclick';
				zobjectanimations[10].moldnamepart = 'button-part-9';
				zobjectanimations[10].startframe = 180;
				zobjectanimations[10].endframe = 200;
				zobjectanimations[10].animationloop = false;
				zobjectanimations[10].speedratio = 1.00;
				zobjectanimations[10].additionalscript = '';
				zobjectanimations[10].additionalparameters = '';

				zobjectanimations[11] = WTW.newObjectAnimation();
				zobjectanimations[11].animationname = 'HUDLOGINbuttoncolor';
				zobjectanimations[11].moldevent = 'onclick';
				zobjectanimations[11].moldnamepart = 'button-color';
				zobjectanimations[11].startframe = 200;
				zobjectanimations[11].endframe = 220;
				zobjectanimations[11].animationloop = false;
				zobjectanimations[11].speedratio = 1.00;
				zobjectanimations[11].additionalscript = '';
				zobjectanimations[11].additionalparameters = '';

				zobjectanimations[12] = WTW.newObjectAnimation();
				zobjectanimations[12].animationname = 'HUDLOGINbuttonsize';
				zobjectanimations[12].moldevent = 'onclick';
				zobjectanimations[12].moldnamepart = 'button-size';
				zobjectanimations[12].startframe = 220;
				zobjectanimations[12].endframe = 240;
				zobjectanimations[12].animationloop = false;
				zobjectanimations[12].speedratio = 1.00;
				zobjectanimations[12].additionalscript = '';
				zobjectanimations[12].additionalparameters = '';

				zobjectanimations[13] = WTW.newObjectAnimation();
				zobjectanimations[13].animationname = 'HUDLOGINbuttonsavecolorscaling';
				zobjectanimations[13].moldevent = 'onclick';
				zobjectanimations[13].moldnamepart = 'button-savecolorscaling';
				zobjectanimations[13].startframe = 240;
				zobjectanimations[13].endframe = 260;
				zobjectanimations[13].animationloop = false;
				zobjectanimations[13].speedratio = 1.00;
				zobjectanimations[13].additionalscript = '';
				zobjectanimations[13].additionalparameters = '';

				zobjectanimations[14] = WTW.newObjectAnimation();
				zobjectanimations[14].animationname = 'HUDLOGINbuttonclose';
				zobjectanimations[14].moldevent = 'onclick';
				zobjectanimations[14].moldnamepart = 'button-close';
				zobjectanimations[14].startframe = 260;
				zobjectanimations[14].endframe = 280;
				zobjectanimations[14].animationloop = false;
				zobjectanimations[14].speedratio = 1.00;
				zobjectanimations[14].additionalscript = '';
				zobjectanimations[14].additionalparameters = '';

				break;

		}
		BABYLON.SceneLoader.ImportMeshAsync('', zobjectfolder, zobjectfile, scene).then(
			function (zresults) {
				if (zresults.meshes != null) {
					zhudlogin.WTW = {
						'objectanimations':zobjectanimations
					};
					
					for (var i=0; i < zresults.meshes.length; i++) {
						if (zresults.meshes[i] != null) {
							/* add the base mold name to each of the child meshes */
							var zmeshname = zresults.meshes[i].name;
							var zchildmoldname = zmoldname + '-' + zmeshname;
							zchildmoldname = zchildmoldname.replace(' ','_').toLowerCase();
							zresults.meshes[i].id = zchildmoldname;
							zresults.meshes[i].name = zchildmoldname;
							zresults.meshes[i].renderingGroupId = 3;
							
							/* make sure child meshes are pickable */
							switch (zmeshname) {
								case 'entermenubox':
									zresults.meshes[i].isPickable = false;
									zresults.meshes[i].isVisible = false;
									break;
								case 'loginmenubox':
									zresults.meshes[i].isPickable = false;
									zresults.meshes[i].isVisible = true;
									break;
								case 'button-loginwtw':
									if (WTW.globalLogins == '1') {
										zresults.meshes[i].isPickable = true;
										zresults.meshes[i].isVisible = true;
									} else {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = false;
									}
									if (WTW.globalLogins == '1' && WTW.localLogins == '0') {
										//zresults.meshes[i].position.y = -1.5;
									}
									break;
								case 'button-loginwtwtext':
									zresults.meshes[i].isPickable = false;
									if (WTW.globalLogins != '1') {
										zresults.meshes[i].isVisible = false;
									} else {
										zresults.meshes[i].isVisible = true;
									}
									break;
								case 'button-loginlocal':
									if (WTW.localLogins == '1') {
										zresults.meshes[i].isPickable = true;
										zresults.meshes[i].isVisible = true;
									} else {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = false;
									}
									if (WTW.globalLogins == '0' && WTW.localLogins == '1') {
										//zresults.meshes[i].position.y = 1.5;
									}
									break;
								case 'button-loginlocaltext':
									zresults.meshes[i].isPickable = false;
									if (WTW.localLogins != '1') {
										zresults.meshes[i].isVisible = false;
									} else {
										zresults.meshes[i].isVisible = true;
									}
									break;
								case 'button-loginguest':
									if (WTW.anonymousLogins == '1') {
										zresults.meshes[i].isPickable = true;
										zresults.meshes[i].isVisible = true;
									} else {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = false;
									}
									break;
								case 'button-loginguesttext':
									zresults.meshes[i].isPickable = false;
									if (WTW.anonymousLogins != '1') {
										zresults.meshes[i].isVisible = false;
									} else {
										zresults.meshes[i].isVisible = true;
									}
									break;
								case 'button-enterlogin':
								case 'button-enter':
									if (zpage == 'Enter Menu') {
										zresults.meshes[i].isPickable = true;
										zresults.meshes[i].isVisible = true;
									} else if (WTW.isInitCycle == 1) {
										zresults.meshes[i].isPickable = true;
										zresults.meshes[i].isVisible = false;
									} else {
										zresults.meshes[i].isPickable = false;
										zresults.meshes[i].isVisible = false;
									}
									break;
								case 'button-enterlogintext':
								case 'button-entertext':
									zresults.meshes[i].isPickable = false;
									if (zpage == 'Enter Menu') {
										zresults.meshes[i].isVisible = true;
									} else {
										zresults.meshes[i].isVisible = false;
									}
									break;
								case 'button-closeloginmenu':
									zresults.meshes[i].isPickable = true;
									zresults.meshes[i].isVisible = true;
									break;
								case 'button-closeloginmenutext':
									zresults.meshes[i].isPickable = false;
									zresults.meshes[i].isVisible = true;
									break;
								case 'button-avatarselect':
								case 'button-editprofile':
								case 'button-avataredit':
								case 'button-logout':
								case 'button-login':
								case 'button-create':
								case 'button-reset':
								case 'button-createlink':
								case 'button-forgot':
								case 'button-cancellogin':
								case 'button-cancelselect':
								case 'button-cancelreset':
								case 'button-cancelcreate':
								case 'email-email':
								case 'password-password':
								case 'password-password2':
								case 'name-displayname':
								case 'check-remember':
								case 'button-color':
								case 'button-size':
								case 'button-savecolorscaling':
								case 'button-next':
								case 'button-previous':
								case 'button-save':
								case 'button-close':
								case 'preview':
									zresults.meshes[i].isPickable = true;
									zresults.meshes[i].isVisible = true;
									break;
								case 'invalidlogin':
								case 'invalidpassword':
								case 'invalidpasswords':
								case 'invalidemail':
								case 'invalidemailinuse':
								case 'notfound':
								case 'sent':
								case 'email-emailborder':
								case 'password-passwordborderfocus':
								case 'password-password2borderfocus':
								case 'check-rememberborderfocus':
								case 'name-displaynameborder':
								case 'name-displaynameborderfocus':
								case 'loading':
								case 'loading3dscene':
								case 'loading3dmodel':
								case 'loading3davatar':
								case 'loading3dcommunity':
								case 'loading3dbuilding':
								case 'loading3dthing':
								case 'globalserverdecal':
								case 'localserverdecal':
								case 'button-part-0':
								case 'button-part-1':
								case 'button-part-2':
								case 'button-part-3':
								case 'button-part-4':
								case 'button-part-5':
								case 'button-part-6':
								case 'button-part-7':
								case 'button-part-8':
								case 'button-part-9':
								case 'sizelabels':
								case 'button-scalex':
								case 'button-scalex0':
								case 'button-scalex0text':
								case 'button-scalex1':
								case 'button-scalex1text':
								case 'button-scalex2':
								case 'button-scalex2text':
								case 'button-scalex3':
								case 'button-scalex3text':
								case 'button-scaley':
								case 'button-scaley0':
								case 'button-scaley0text':
								case 'button-scaley1':
								case 'button-scaley1text':
								case 'button-scaley2':
								case 'button-scaley2text':
								case 'button-scaley3':
								case 'button-scaley3text':
								case 'button-scalez':
								case 'button-scalez0':
								case 'button-scalez0text':
								case 'button-scalez1':
								case 'button-scalez1text':
								case 'button-scalez2':
								case 'button-scalez2text':
								case 'button-scalez3':
								case 'button-scalez3text':
									zresults.meshes[i].isPickable = false;
									zresults.meshes[i].isVisible = false;
									break;
								case 'titlewtw':
									zresults.meshes[i].isPickable = false;
									if (zpage == 'WalkTheWeb Login') {
										zresults.meshes[i].isVisible = true;
									} else {
										zresults.meshes[i].isVisible = false;
									}
									break;
								case 'titlelocal':
									zresults.meshes[i].isPickable = false;
									if (zpage == '3D Website Login') {
										zresults.meshes[i].isVisible = true;
									} else {
										zresults.meshes[i].isVisible = false;
									}
									break;
								case 'titlecreatewtw':
									zresults.meshes[i].isPickable = false;
									if (zpage == 'Create WTW Login') {
										zresults.meshes[i].isVisible = true;
									} else {
										zresults.meshes[i].isVisible = false;
									}
									break;
								case 'titlecreatelocal':
									zresults.meshes[i].isPickable = false;
									if (zpage == 'Create Login') {
										zresults.meshes[i].isVisible = true;
									} else {
										zresults.meshes[i].isVisible = false;
									}
									break;
								default:
									zresults.meshes[i].isPickable = false;
									zresults.meshes[i].isVisible = true;
									break;
							}
							
							/* make sure all object meshes have a parent */
							if (zresults.meshes[i].parent == null) {
								zresults.meshes[i].parent = zhudlogin;
							}
							if (WTW.shadows != null) {
								/* add mesh to world shadow map */
								//WTW.shadows.getShadowMap().renderList.push(zresults.meshes[i]);
							}
//								zresults.meshes[i].receiveShadows = true;
							/* initiate and preload any event driven animations */
							if (zobjectanimations != null) {
								WTW.addMoldAnimation(zmoldname, zmeshname, zresults.meshes[i], zobjectanimations);
							}
							if (zhudlogin == null || zhudlogin.parent == null) {
								/* if the parent has been deleted after this async process began (avoiding orphaned objects)*/
								zresults.meshes[i].dispose();
							}
						}
					}
				}
				zhudlogin = WTW.getMeshOrNodeByID(zmoldname);
				if (zhudlogin == null || zhudlogin.parent == null) {
					/* if the parent has been deleted after this async process began (avoiding orphaned objects) */
					WTW.disposeClean(zmoldname);
				} else {
					/* perform any after load function like Focus or title selection */
					var zremember = false;
					var zemail = '';
					var zpassword = '';
					var zmoldfocus = '';
					switch (zpage) {
						case "Loading":
							var zloading = WTW.getMeshOrNodeByID('hudlogin-loading');
							if (zloading != null) {
								zloading.isVisible = true;
							}
							break;
						case "Loading 3D Scene":
							var zloading = WTW.getMeshOrNodeByID('hudlogin-loading3dscene');
							if (zloading != null) {
								zloading.isVisible = true;
							}
							break;
						case "Loading 3D Model":
							var zloading = WTW.getMeshOrNodeByID('hudlogin-loading3dmodel');
							if (zloading != null) {
								zloading.isVisible = true;
							}
							break;
						case "Loading 3D Avatar":
							var zloading = WTW.getMeshOrNodeByID('hudlogin-loading3davatar');
							if (zloading != null) {
								zloading.isVisible = true;
							}
							break;
						case "Loading 3D Community":
							var zloading = WTW.getMeshOrNodeByID('hudlogin-loading3dcommunity');
							if (zloading != null) {
								zloading.isVisible = true;
							}
							break;
						case "Loading 3D Building":
							var zloading = WTW.getMeshOrNodeByID('hudlogin-loading3dbuilding');
							if (zloading != null) {
								zloading.isVisible = true;
							}
							break;
						case "Loading 3D Thing":
							var zloading = WTW.getMeshOrNodeByID('hudlogin-loading3dthing');
							if (zloading != null) {
								zloading.isVisible = true;
							}
							break;
						case "Login Menu":
							break;
						case "Create WTW Login":
						case "Create Login":
							zmoldfocus = 'hudlogin-email-email';
							break;
						case "WalkTheWeb Login":
							zremember = WTW.getCookie('globalloginremember');
							zemail = WTW.getCookie('globalloginemail');
							zpassword = WTW.getCookie('globalloginpassword');
							if (zmoldfocus == '' && zremember) {
								if (zemail.length == 0) {
									zmoldfocus = 'hudlogin-email-email';
								} else if (atob(zpassword).length == 0) {
									zmoldfocus = 'hudlogin-password-password';
								} else {
									zmoldfocus = 'hudlogin-button-login';
								}
							} else {
								zmoldfocus = 'hudlogin-email-email';
							}
							WTW.hudLoginFocusText('hudlogin-email-email', true);
							WTW.hudLoginFocusText('hudlogin-password-password', true);
							WTW.hudLoginFocusText('hudlogin-check-remember', true);
							WTW.tabNextField();
							break;
						case "3D Website Login":
							zremember = WTW.getCookie('localloginremember');
							zemail = WTW.getCookie('localloginemail');
							zpassword = WTW.getCookie('localloginpassword');
							if (zmoldfocus == '' && zremember) {
								if (zemail.length == 0) {
									zmoldfocus = 'hudlogin-email-email';
								} else if (atob(zpassword).length == 0) {
									zmoldfocus = 'hudlogin-password-password';
								} else {
									zmoldfocus = 'hudlogin-button-login';
								}
							} else {
								zmoldfocus = 'hudlogin-email-email';
							}
							WTW.hudLoginFocusText('hudlogin-email-email', true);
							WTW.hudLoginFocusText('hudlogin-password-password', true);
							WTW.hudLoginFocusText('hudlogin-check-remember', true);
							WTW.tabNextField();
							break;
						case "Reset Password":
							zmoldfocus = 'hudlogin-email-email';
							break;
						case "Select My Avatar":
							zmoldfocus = 'hudlogin-name-displayname';
							WTW.hudLoginLoadAvatars();
							break;
						case "Edit My Avatar":
							WTW.cameraDistance = 34;
							/* open for color changing */
							WTW.hudLoginLoadEditAvatarColors();
							break;
					}
					if (zmoldfocus != '') {
						window.setTimeout(function() {
							WTW.changeLoginHUDFocus(zmoldfocus);
						},1000);
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-openLoginHUD=' + ex.message);
	}
}

WTWJS.prototype.openLoginHUDLogin = function() {
	/* Select which Login Menu or Form based on Active Global Login variables */
	try {
		if ((WTW.globalLogins == '1' && WTW.localLogins == '1') || (WTW.globalLogins == '1' && WTW.anonymousLogins == '1') || (WTW.localLogins == '1' && WTW.anonymousLogins == '1')) {
			/* if there is more than one choice */
			WTW.openLoginHUD('Login Menu');
		} else if (WTW.globalLogins == '1') {
			/* open global login */
			WTW.openLoginHUD('WalkTheWeb Login');
		} else if (WTW.localLogins == '1') {
			/* open local login */
			WTW.openLoginHUD('3D Website Login');
		} else if (WTW.anonymousLogins == '1') {
			/* login not required - open select avatar */
			WTW.openLoginHUD('Select My Avatar');
		} else {
			WTW.openLoginHUD('Login Menu');
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-openLoginHUDLogin=' + ex.message);
	}
}


WTWJS.prototype.mouseOverLoginHUD = function(zmoldname, zhover) {
	/* mouse over Login HUD */
	try {
		var zmold = WTW.getMeshOrNodeByID(zmoldname.replace('text',''));
		var zmoldtext = WTW.getMeshOrNodeByID(zmoldname.replace('text','') + 'text');
		var zmoldblue = WTW.getMeshOrNodeByID('hudlogin-blue');
		var zmoldblack = WTW.getMeshOrNodeByID('hudlogin-black');
		var zmoldgray = WTW.getMeshOrNodeByID('hudlogin-gray');
		var zmoldgreen = WTW.getMeshOrNodeByID('hudlogin-green');
		var zmoldwhite = WTW.getMeshOrNodeByID('hudlogin-white');
		var zmoldyellow = WTW.getMeshOrNodeByID('hudlogin-yellow');
		var zmatcurrent = null;
		var zmatblue = null;
		var zmatblack = null;
		var zmatgray = null;
		var zmatgreen = null;
		var zmatwhite = null;
		var zmatyellow = null;
		if (zmold != null) {
			if (zmold.material != null) {
				if (zmold.material.id != undefined) {
					zmatcurrent = zmold.material.id;
				}
			}
		}
		if (zmoldblue != null) {
			zmatblue = zmoldblue.material.clone();
			zmatblue.id = 'blue';
		}
		if (zmoldblack != null) {
			zmatblack = zmoldblack.material.clone();
			zmatblack.id = 'black';
		}
		if (zmoldgray != null) {
			zmatgray = zmoldgray.material.clone();
			zmatgray.id = 'gray';
		}
		if (zmoldgreen != null) {
			zmatgreen = zmoldgreen.material.clone();
			zmatgreen.id = 'green';
		}
		if (zmoldwhite != null) {
			zmatwhite = zmoldwhite.material.clone();
			zmatwhite.id = 'white';
		}
		if (zmoldyellow != null) {
			zmatyellow = zmoldyellow.material.clone();
			zmatyellow.id = 'yellow';
		}
		
		switch (zmoldname) {
			case 'hudlogin-button-loginwtw':
			case 'hudlogin-button-loginlocal':
			case 'hudlogin-button-loginguest':
			case 'hudlogin-button-editprofile':
			case 'hudlogin-button-avatarselect':
			case 'hudlogin-button-avataredit':
			case 'hudlogin-button-color':
			case 'hudlogin-button-size':
			case 'hudlogin-button-logout':
			case 'hudlogin-button-create':
			case 'hudlogin-button-reset':
			case 'hudlogin-button-login':
			case 'hudlogin-button-enter':
			case 'hudlogin-button-enterlogin':
			case 'hudlogin-button-save':
			case 'hudlogin-button-savecolorscaling':
			case 'hudlogin-button-part-0':
			case 'hudlogin-button-part-1':
			case 'hudlogin-button-part-2':
			case 'hudlogin-button-part-3':
			case 'hudlogin-button-part-4':
			case 'hudlogin-button-part-5':
			case 'hudlogin-button-part-6':
			case 'hudlogin-button-part-7':
			case 'hudlogin-button-part-8':
			case 'hudlogin-button-part-9':
			case 'hudlogin-button-scalex0':
			case 'hudlogin-button-scalex1':
			case 'hudlogin-button-scalex2':
			case 'hudlogin-button-scalex3':
			case 'hudlogin-button-scaley0':
			case 'hudlogin-button-scaley1':
			case 'hudlogin-button-scaley2':
			case 'hudlogin-button-scaley3':
			case 'hudlogin-button-scalez0':
			case 'hudlogin-button-scalez1':
			case 'hudlogin-button-scalez2':
			case 'hudlogin-button-scalez3':
				/* larger main buttons */
				if (zmatcurrent != 'black') {
					/* if not black background - selected button */
					if (zhover == 1) {
						if (zmatgreen != null && zmold != null) {
							zmold.material = zmatgreen;
						}
						if (zmatyellow != null && zmoldtext != null) {
							zmoldtext.material = zmatyellow;
						}
					} else {
						if (zmatblue != null && zmold != null) {
							zmold.material = zmatblue;
						}
						if (zmatwhite != null && zmoldtext != null) {
							zmoldtext.material = zmatwhite;
						}
					}
				}
				break;
			case 'hudlogin-button-createlink':
			case 'hudlogin-button-forgot':
			case 'hudlogin-button-cancellogin':
			case 'hudlogin-button-cancelselect':
			case 'hudlogin-button-cancelcreate':
			case 'hudlogin-button-cancelreset':
			case 'hudlogin-button-close':
			case 'hudlogin-button-closeloginmenu':
				/* smaller buttons */
				if (zhover == 1) {
					if (zmatyellow != null && zmold != null) {
						zmold.material = zmatyellow;
					}
					if (zmatblack != null && zmoldtext != null) {
						zmoldtext.material = zmatblack;
					}
				} else {
					if (zmatgray != null && zmold != null) {
						zmold.material = zmatgray;
					}
					if (zmatblue != null && zmoldtext != null) {
						zmoldtext.material = zmatblue;
					}
				}
				break;
			case 'hudlogin-button-next':
			case 'hudlogin-button-previous':
				/* arrow buttons */
				if (zhover == 1) {
					if (zmatgreen != null && zmold != null) {
						zmold.material = zmatgreen;
					}
				} else {
					if (zmatblue != null && zmold != null) {
						zmold.material = zmatblue;
					}
				}
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-mouseOverLoginHUD=' + ex.message);
	}
}

WTWJS.prototype.hudLoginClick = function(zmoldname) {
	/* Click on Login HUD Buttons */
	try {
		switch (zmoldname) {
			case 'hudlogin-email-email':
			case 'hudlogin-password-password':
			case 'hudlogin-password-password2':
			case 'hudlogin-check-remember':
			case 'hudlogin-name-displayname':
				WTW.changeLoginHUDFocus(zmoldname);
				break;
			case 'hudlogin-button-scalex0':
				WTW.hudLoginUpdateAvatarScaling('x', -.01);
				break;
			case 'hudlogin-button-scalex1':
				WTW.hudLoginUpdateAvatarScaling('x', -.001);
				break;
			case 'hudlogin-button-scalex2':
				WTW.hudLoginUpdateAvatarScaling('x', .001);
				break;
			case 'hudlogin-button-scalex3':
				WTW.hudLoginUpdateAvatarScaling('x', .01);
				break;
			case 'hudlogin-button-scalez0':
				WTW.hudLoginUpdateAvatarScaling('z', -.01);
				break;
			case 'hudlogin-button-scalez1':
				WTW.hudLoginUpdateAvatarScaling('z', -.001);
				break;
			case 'hudlogin-button-scalez2':
				WTW.hudLoginUpdateAvatarScaling('z', .001);
				break;
			case 'hudlogin-button-scalez3':
				WTW.hudLoginUpdateAvatarScaling('z', .01);
				break;
			case 'hudlogin-button-scaley0':
				WTW.hudLoginUpdateAvatarScaling('y', -.01);
				break;
			case 'hudlogin-button-scaley1':
				WTW.hudLoginUpdateAvatarScaling('y', -.001);
				break;
			case 'hudlogin-button-scaley2':
				WTW.hudLoginUpdateAvatarScaling('y', .001);
				break;
			case 'hudlogin-button-scaley3':
				WTW.hudLoginUpdateAvatarScaling('y', .01);
				break;
			default:
				window.setTimeout(function() {
					if (zmoldname == 'hudlogin-button-loginlocal') {
						/* login menu */
						if (dGet('wtw_tuserid').value != '') {
							WTW.logout();
						}
						WTW.openLoginHUD('3D Website Login');
					} else if (zmoldname == 'hudlogin-button-enter') {
						WTW.hudLoginEnter();
					} else if (zmoldname == 'hudlogin-button-editprofile') {
						/* open edit profile */
						WTW.closeLoginHUD();
						WTW.openLocalLogin('Edit Profile', .4, .6);
					} else if (zmoldname == 'hudlogin-button-loginguest' || zmoldname == 'hudlogin-button-avatarselect') {
						/* select my avatar */
						WTW.openLoginHUD('Select My Avatar');
					} else if (zmoldname == 'hudlogin-button-avataredit') {
						/* edit my avatar */
						WTW.openLoginHUD('Edit My Avatar');
					} else if (zmoldname == 'hudlogin-button-logout') {
						/* logout */
						WTW.closeLoginHUD();
						WTW.logout();
					} else if (zmoldname == 'hudlogin-button-login') {
						/* login */
						WTW.hudLoginLogin();
					} else if (zmoldname == 'hudlogin-button-createlink') {
						/* login */
						let ztitlewtw = WTW.getMeshOrNodeByID('hudlogin-titlewtw');
						let zfocus = false;
						let zlocal = true;
						if (ztitlewtw != null) {
							if (ztitlewtw.isVisible) {
								zlocal = false;
							}
						}
						if (zlocal) {
							WTW.openLoginHUD('Create Login');
						} else {
							WTW.openLoginHUD('Create WTW Login');
						}
					} else if (zmoldname == 'hudlogin-button-forgot') {
						/* reset password */
						//WTW.openLoginHUD('Reset Password'); /* 3d form is not ready */
						WTW.openLocalLogin('Recover Login', .4, .5);
					} else if (zmoldname == 'hudlogin-button-create') {
						/* create login */
						WTW.hudLoginCreate();
					} else if (zmoldname == 'hudlogin-button-reset') {
						/* reset password */
						
					} else if (zmoldname == 'hudlogin-button-enterlogin' || zmoldname == 'hudlogin-button-cancellogin' || zmoldname == 'hudlogin-button-cancelcreate' || zmoldname == 'hudlogin-button-cancelreset') {
						/* open hud login */
						WTW.openLoginHUDLogin();
					} else if (zmoldname == 'hudlogin-button-next') {
						/* select avatar - show next avatar */
						WTW.hudLoginShowAvatar(WTW.selectedAvatar + 1);
					} else if (zmoldname == 'hudlogin-button-previous') {
						/* select avatar - show previous avatar */
						WTW.hudLoginShowAvatar(WTW.selectedAvatar - 1);
					} else if (zmoldname == 'hudlogin-button-color') {
						/* open for color changing */
						WTW.hudLoginLoadEditAvatarColors();
					} else if (zmoldname.indexOf('hudlogin-button-part') > -1) {
						/* select part of color change */
						WTW.hudLoginEditAvatarColors(zmoldname);
					} else if (zmoldname == 'hudlogin-button-size') {
						/* open for scaling changing */
						WTW.hudLoginLoadEditAvatarScaling();
					} else if (zmoldname == 'hudlogin-button-save' || zmoldname == 'hudlogin-preview') {
						/* select avatar - save selection and display name */
						WTW.hudLoginSaveAvatar();
					} else if (zmoldname == 'hudlogin-button-savecolorscaling') {
						/* save my avatar colors and scaling */
						WTW.cameraDistance = WTW.getCookie('cameradistance');
						WTW.saveMyAvatarColorScaling();
						WTW.closeLoginHUD();
					} else if (zmoldname == 'hudlogin-button-close' || zmoldname == 'hudlogin-button-closeloginmenu' || zmoldname == 'hudlogin-button-cancelselect') {
						/* reset camera distance - from edit avatar */
						WTW.cameraDistance = WTW.getCookie('cameradistance');
						WTW.closeLoginHUD();
					}
					/* allow plugins to add code */
					WTW.pluginsHudLoginClick(zmoldname);
				},1000);
				break;
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginClick=' + ex.message);
	}
}

WTWJS.prototype.hudLoginShowEnter = function() {
	/* show enter button */
	try {
		if (WTW.placeHolder == 1) {
			var zentermenubox = WTW.getMeshOrNodeByID('hudlogin-entermenubox');
			if (zentermenubox != null) {
				if (dGet('wtw_tuserid').value == '' && zentermenubox.isVisible == false) {
					var zenter = WTW.getMeshOrNodeByID('hudlogin-button-enter');
					var zentertext = WTW.getMeshOrNodeByID('hudlogin-button-entertext');
					var zenterlogin = WTW.getMeshOrNodeByID('hudlogin-button-enterlogin');
					var zenterlogintext = WTW.getMeshOrNodeByID('hudlogin-button-enterlogintext');
					if (zenter != null) {
						zenter.isVisible = true;
					}
					if (zentertext != null) {
						zentertext.isVisible = true;
					}
					if (zenterlogin != null) {
						zenterlogin.isVisible = true;
					}
					if (zenterlogintext != null) {
						zenterlogintext.isVisible = true;
					}
				}
			} else {
				WTW.openLoginHUD('Enter Menu');
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginShowEnter=' + ex.message);
	}
}

WTWJS.prototype.hudLoginEnter = function() {
	/* enter button - random select avatar, rando name, and enter scene */
	try {
		var zavatarid = WTW.getCookie('avatarid');
		if (zavatarid == '' || zavatarid == null) {
			/* get array of possible avatars for random entry */
			WTW.getAsyncJSON('/connect/avatars.php?groups=anonymous', 
				function(zresponse) {
					var zdisplayname = '';
					zavatarid = '3b9bt5c70igtmqux';
					if (zresponse != null) {
						zresponse = JSON.parse(zresponse);
						if (zresponse.avatars != null) {
							var zrand = Math.floor(Math.random() * zresponse.avatars.length)
							if (zresponse.avatars[zrand] != null) {
								zdisplayname = zresponse.avatars[zrand].displayname;
								zavatarid = zresponse.avatars[zrand].avatarid;
							}
						}
					}
					WTW.closeLoginHUD();
					WTW.setCookie('avatarid', zavatarid, 365);
					WTW.onMyAvatarSelect('', '', zavatarid);
				}
			);
		} else {
			WTW.closeLoginHUD();
			WTW.onMyAvatarSelect('', '', zavatarid);
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginEnter=' + ex.message);
	}
}

WTWJS.prototype.changeLoginHUDFocus = function(zmoldname) {
	/* Change Login HUD Focus */
	try {
		var zborder = WTW.getMeshOrNodeByID(zmoldname + 'border');
		var zborderfocus = WTW.getMeshOrNodeByID(zmoldname + 'borderfocus');
		var zemailborder = WTW.getMeshOrNodeByID('hudlogin-email-emailborder');
		var zemailborderfocus = WTW.getMeshOrNodeByID('hudlogin-email-emailborderfocus');
		var zpasswordborder = WTW.getMeshOrNodeByID('hudlogin-password-passwordborder');
		var zpasswordborderfocus = WTW.getMeshOrNodeByID('hudlogin-password-passwordborderfocus');
		var zpassword2border = WTW.getMeshOrNodeByID('hudlogin-password-password2border');
		var zpassword2borderfocus = WTW.getMeshOrNodeByID('hudlogin-password-password2borderfocus');
		var zrememberborder = WTW.getMeshOrNodeByID('hudlogin-check-rememberborder');
		var zrememberborderfocus = WTW.getMeshOrNodeByID('hudlogin-check-rememberborderfocus');
		var zdisplaynameborder = WTW.getMeshOrNodeByID('hudlogin-name-displaynameborder');
		var zdisplaynameborderfocus = WTW.getMeshOrNodeByID('hudlogin-name-displaynameborderfocus');
		if (zemailborder != null) {
			zemailborder.isVisible = true;
		}
		if (zemailborderfocus != null) {
			zemailborderfocus.isVisible = false;
		}
		if (zpasswordborder != null) {
			zpasswordborder.isVisible = true;
		}
		if (zpasswordborderfocus != null) {
			zpasswordborderfocus.isVisible = false;
		}
		if (zpassword2border != null) {
			zpassword2border.isVisible = true;
		}
		if (zpassword2borderfocus != null) {
			zpassword2borderfocus.isVisible = false;
		}
		if (zrememberborder != null) {
			zrememberborder.isVisible = true;
		}
		if (zrememberborderfocus != null) {
			zrememberborderfocus.isVisible = false;
		}
		if (zdisplaynameborder != null) {
			zdisplaynameborder.isVisible = true;
		}
		if (zdisplaynameborderfocus != null) {
			zdisplaynameborderfocus.isVisible = false;
		}
		
		if (zborder != null) {
			zborder.isVisible = false;
		}
		if (zborderfocus != null) {
			zborderfocus.isVisible = true;
		}
		WTW.hudLoginFocusText(zmoldname);
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-changeLoginHUDFocus=' + ex.message);
	}
}

WTWJS.prototype.hudLoginFocusText = function(zmoldname, zeditdone) {
	/* Type into Login HUD */
	try {
		if (zeditdone == undefined) {
			zeditdone = false;
		}
		WTW.offsetX = 2;
		WTW.offsetY = 0;
		WTW.offsetZ = -1;
		WTW.maxLength = 15;
		WTW.tabOrder = [
			'hudlogin-button-loginwtw',
			'hudlogin-button-loginlocal',
			'hudlogin-button-loginguest',
			'hudlogin-button-editprofile',
			'hudlogin-button-avatarselect',
			'hudlogin-button-avataredit',
			'hudlogin-button-logout',
			'hudlogin-email-email',
			'hudlogin-password-password',
			'hudlogin-password-password2',
			'hudlogin-check-remember',
			'hudlogin-button-login',
			'hudlogin-button-create',
			'hudlogin-button-reset',
			'hudlogin-button-createlink',
			'hudlogin-button-forgot',
			'hudlogin-button-cancellogin',
			'hudlogin-button-cancelcreate',
			'hudlogin-button-cancelreset',
			'hudlogin-name-displayname',
			'hudlogin-button-next',
			'hudlogin-button-previous',
			'hudlogin-button-save',
			'hudlogin-button-close'
		];
		if (WTW.selectedMoldName != zmoldname) {
			window.clearInterval(WTW.textTimer);
			WTW.textTimer = null;
			WTW.selectedMoldName = zmoldname;
			/* set cursor to the end of the value if there is a value */
			if (dGet(WTW.selectedMoldName + '-textbox') != null) {
				WTW.textCursor = dGet(WTW.selectedMoldName + '-textbox').value.length;
			} else {
				WTW.textCursor = 0;
			}
		}
		switch (WTW.selectedMoldName) {
			case 'hudlogin-email-email':
				WTW.offsetY = 1.8;
				break;
			case 'hudlogin-password-password':
				WTW.offsetY = 0;
				break;
			case 'hudlogin-password-password2':
				WTW.offsetY = -1.8;
				break;
			case 'hudlogin-check-remember':
				WTW.offsetY = -1.35;
				WTW.offsetZ = -1.15;
				WTW.maxLength = 1;
				if (dGet(WTW.selectedMoldName + '-textbox') != null) {
					if (dGet(WTW.selectedMoldName + '-textbox').checked) {
						dGet(WTW.selectedMoldName + '-textbox').checked = false;
					} else {
						dGet(WTW.selectedMoldName + '-textbox').checked = true;
					}
				}
				break;
			case 'hudlogin-name-displayname':
				WTW.offsetY = 1.8;
				break;
		}
		WTW.webStyle = {
			'anchor':'left',
			'letter-height':1.00,
			'letter-thickness':.2,
			'color':'#0069ff',
			'alpha':1.00,
			'colors':{
				'diffuse':'#0069ff',
				'specular':'#c0c0c0',
				'ambient':'#c0c0c0',
				'emissive':'#000000'
			}
		};
		WTW.focusText(zeditdone);
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginFocusText=' + ex.message);
	}
}

WTWJS.prototype.closeLoginHUD = function() {
	/* Close the Login HUD */
	try {
		WTW.disposeClean('hudlogin');
		if (dGet('wtw_formfields') != null) {
			dGet('wtw_formfields').parentNode.removeChild(dGet('wtw_formfields'));
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-closeLoginHUD=' + ex.message);
	}
}

WTWJS.prototype.hudLoginToggle = function() {
	/* Toggles Login HUD open or Closed if already open */
	try {
		var zhudlogin = WTW.getMeshOrNodeByID('hudlogin');
		if (zhudlogin == null) {
			WTW.openLoginHUDLogin();
		} else {
			WTW.closeLoginHUD();
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginToggle=' + ex.message);
	}
}

WTWJS.prototype.hudLoginLogin = function() {
	/* run login attempt */
	try {
		var zemail = dGet('hudlogin-email-email-textbox').value;
		var zpassword = dGet('hudlogin-password-password-textbox').value;
		var zremembercheck = dGet('hudlogin-check-remember-textbox').checked;
		let zinvalidemail = WTW.getMeshOrNodeByID('hudlogin-invalidemail');
		let zremember = WTW.getMeshOrNodeByID('hudlogin-check-remember');
		let zrememberborder = WTW.getMeshOrNodeByID('hudlogin-check-rememberborder');
		let zrememberborderfocus = WTW.getMeshOrNodeByID('hudlogin-check-rememberborderfocus');
		let zremembertext = WTW.getMeshOrNodeByID('hudlogin-check-remembertext');
		let zremember3dtext = WTW.getMeshOrNodeByID('hudlogin-check-remember-text');
		let ztitlewtw = WTW.getMeshOrNodeByID('hudlogin-titlewtw');
		let zfocus = false;
		let zlocal = true;
		if (ztitlewtw != null) {
			if (ztitlewtw.isVisible) {
				zlocal = false;
			}
		}
		if (WTW.isEmail(zemail) == false) {
			if (zinvalidemail != null) {
				zinvalidemail.isVisible = true;
				if (zremember != null) {
					zremember.isVisible = false;
				}
				if (zrememberborder != null) {
					zrememberborder.isVisible = false;
				}
				if (zrememberborderfocus != null) {
					zfocus = zrememberborderfocus.isVisible;
					zrememberborderfocus.isVisible = false;
				}
				if (zremembertext != null) {
					zremembertext.isVisible = false;
				}
				if (zremember3dtext != null) {
					zremember3dtext.isVisible = false;
				}
				window.setTimeout(function(){
					zinvalidemail = WTW.getMeshOrNodeByID('hudlogin-invalidemail');
					zremember = WTW.getMeshOrNodeByID('hudlogin-check-remember');
					zrememberborder = WTW.getMeshOrNodeByID('hudlogin-check-rememberborder');
					zrememberborderfocus = WTW.getMeshOrNodeByID('hudlogin-check-rememberborderfocus');
					zremembertext = WTW.getMeshOrNodeByID('hudlogin-check-remembertext');
					zremember3dtext = WTW.getMeshOrNodeByID('hudlogin-check-remember-text');
					if (zinvalidemail != null) {
						zinvalidemail.isVisible = false;
					}
					if (zremember != null) {
						zremember.isVisible = true;
					}
					if (zfocus) {
						if (zrememberborderfocus != null) {
							zrememberborderfocus.isVisible = true;
						}
					} else {
						if (zrememberborder != null) {
							zrememberborder.isVisible = true;
						}
					}
					if (zremembertext != null) {
						zremembertext.isVisible = true;
					}
					if (zremember3dtext != null) {
						zremember3dtext.isVisible = true;
					}
				},5000);
			}
		} else {
			if (zinvalidemail != null) {
				zinvalidemail.isVisible = false;
			}
			if (zremember != null) {
				zremember.isVisible = true;
			}
			if (zfocus) {
				if (zrememberborderfocus != null) {
					zrememberborderfocus.isVisible = true;
				}
			} else {
				if (zrememberborder != null) {
					zrememberborder.isVisible = true;
				}
			}
			if (zremembertext != null) {
				zremembertext.isVisible = true;
			}
			if (zlocal) {
				if (zremembercheck) {
					WTW.setCookie('localloginemail', zemail, 365);
					WTW.setCookie('localloginpassword', btoa(zpassword), 365);
					WTW.setCookie('localloginremember', zremembercheck, 365);
				} else {
					WTW.deleteCookie('localloginemail');
					WTW.deleteCookie('localloginpassword');
					WTW.deleteCookie('localloginremember');
				}
				var zrequest = {
					'useremail':zemail,
					'password':btoa(zpassword),
					'function':'login'
				};
				WTW.postAsyncJSON('/core/handlers/users.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						WTW.hudLoginLoginResponse(zresponse);
					}
				);
			}
			WTW.pluginsHudLoginLogin(zlocal, zemail, zpassword, zremembercheck);
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginLogin=' + ex.message);
	}
}

WTWJS.prototype.hudLoginLoginResponse = function(zresponse) {
	/* process login response */
	try {
		var serror = '';
		if (zresponse != null) {
			if (zresponse.serror != undefined) {
				if (zresponse.serror != '') {
					/* there is an error */
					serror = zresponse.serror;
					dGet('wtw_tuserid').value = '';
					dGet('wtw_tuseremail').value = '';
					dGet('wtw_tdisplayname').value = '';
					dGet('wtw_mainmenudisplayname').innerHTML = 'Login';
					dGet('wtw_mainmenudisplaynamemobile').innerHTML = 'Login';
					dGet('wtw_menudisplayname').innerHTML = 'Login';
					dGet('wtw_tuserimageurl').value = '';
					dGet('wtw_profileimagelg').src = '/content/system/images/menuprofilebig.png';
					dGet('wtw_profileimagesm').src = '/content/system/images/menuprofile32.png';
					dGet('wtw_profileimagesmmobile').src = '/content/system/images/menuprofile32.png';
					WTW.show('wtw_mainmenudisplaynamemobile');
				}
				if (zresponse.userid != '') {
					/* successful login */
					WTW.closeLoginHUD();
					WTW.setLoginValues(zresponse.userid, zresponse.displayname, zresponse.email, zresponse.userimageurl);
					if (WTW.enableEmailValidation == 1) {
						WTW.checkEmailValidation(zresponse.email);
					} else {
						WTW.openLoginHUD('Select My Avatar');
					}
				}
			}
		}
		/* show error if there is one */
		if (serror != '') {
			WTW.log("Login Error = " + serror);
			var zinvalidlogin = WTW.getMeshOrNodeByID('hudlogin-invalidlogin');
			var zfocus = false;
			var zremember = WTW.getMeshOrNodeByID('hudlogin-check-remember');
			var zrememberborder = WTW.getMeshOrNodeByID('hudlogin-check-rememberborder');
			var zrememberborderfocus = WTW.getMeshOrNodeByID('hudlogin-check-rememberborderfocus');
			var zremembertext = WTW.getMeshOrNodeByID('hudlogin-check-remembertext');
			var zremember3dtext = WTW.getMeshOrNodeByID('hudlogin-check-remember-text');
			if (zinvalidlogin != null) {
				zinvalidlogin.isVisible = true;
			}
			if (zremember != null) {
				zremember.isVisible = false;
			}
			if (zrememberborder != null) {
				zrememberborder.isVisible = false;
			}
			if (zrememberborderfocus != null) {
				zfocus = zrememberborderfocus.isVisible;
				zrememberborderfocus.isVisible = false;
			}
			if (zremembertext != null) {
				zremembertext.isVisible = false;
			}
			if (zremember3dtext != null) {
				zremember3dtext.isVisible = false;
			}
			window.setTimeout(function(){
				zinvalidlogin = WTW.getMeshOrNodeByID('hudlogin-invalidlogin');
				zremember = WTW.getMeshOrNodeByID('hudlogin-check-remember');
				zrememberborder = WTW.getMeshOrNodeByID('hudlogin-check-rememberborder');
				zrememberborderfocus = WTW.getMeshOrNodeByID('hudlogin-check-rememberborderfocus');
				zremembertext = WTW.getMeshOrNodeByID('hudlogin-check-remembertext');
				zremember3dtext = WTW.getMeshOrNodeByID('hudlogin-check-remember-text');
				if (zinvalidlogin != null) {
					zinvalidlogin.isVisible = false;
				}
				if (zremember != null) {
					zremember.isVisible = true;
				}
				if (zfocus) {
					if (zrememberborderfocus != null) {
						zrememberborderfocus.isVisible = true;
					}
				} else {
					if (zrememberborder != null) {
						zrememberborder.isVisible = true;
					}
				}
				if (zremembertext != null) {
					zremembertext.isVisible = true;
				}
				if (zremember3dtext != null) {
					zremember3dtext.isVisible = true;
				}
			},5000);
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginLoginResponse=' + ex.message);
	}
}

WTWJS.prototype.hudLoginCreate = function() {
	/* run create Login */
	try {
		var zemail = dGet('hudlogin-email-email-textbox').value;
		var zpassword = dGet('hudlogin-password-password-textbox').value;
		var zpassword2 = dGet('hudlogin-password-password2-textbox').value;
		let zinvalidemail = WTW.getMeshOrNodeByID('hudlogin-invalidemail');
		let zinvalidpasswords = WTW.getMeshOrNodeByID('hudlogin-invalidpasswords');
		let ztitlecreatewtw = WTW.getMeshOrNodeByID('hudlogin-titlecreatewtw');
		let zfocus = false;
		let zlocal = true;
		if (ztitlecreatewtw != null) {
			if (ztitlecreatewtw.isVisible) {
				zlocal = false;
			}
		}
		if (WTW.isEmail(zemail) == false) {
			if (zinvalidemail != null) {
				zinvalidemail.isVisible = true;
				window.setTimeout(function(){
					zinvalidemail = WTW.getMeshOrNodeByID('hudlogin-invalidemail');
					if (zinvalidemail != null) {
						zinvalidemail.isVisible = false;
					}
				},5000);
			}
		} else if (zpassword != zpassword2) {
			if (zinvalidpasswords != null) {
				zinvalidpasswords.isVisible = true;
				window.setTimeout(function(){
					zinvalidpasswords = WTW.getMeshOrNodeByID('hudlogin-invalidpasswords');
					if (zinvalidpasswords != null) {
						zinvalidpasswords.isVisible = false;
					}
				},5000);
			}
		} else {
			if (zinvalidemail != null) {
				zinvalidemail.isVisible = false;
			}
			if (zlocal) {
				var zdisplayname = '';
				var zemailparts = zemail.split('@');
				zdisplayname = zemailparts[0];
				var zrequest = {
					'displayname':btoa(zdisplayname),
					'useremail':zemail,
					'password':btoa(zpassword),
					'function':'register'
				};
				WTW.postAsyncJSON('/core/handlers/users.php', zrequest, 
					function(zresponse) {
						zresponse = JSON.parse(zresponse);
						/* note serror would contain errors */
						WTW.hudLoginCreateResponse(zresponse);
					}
				);
			}
			WTW.pluginsHudLoginCreate(zlocal, zemail, zpassword, zpassword2);
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginCreate=' + ex.message);
	}
}

WTWJS.prototype.hudLoginCreateResponse = function(zresponse) {
	/* process login response */
	try {
		var serror = '';
		if (zresponse != null) {
			if (zresponse.serror != undefined) {
				if (zresponse.serror != '') {
					/* there is an error */
					serror = zresponse.serror;
					dGet('wtw_tuserid').value = '';
					dGet('wtw_tuseremail').value = '';
					dGet('wtw_tdisplayname').value = '';
					dGet('wtw_mainmenudisplayname').innerHTML = 'Login';
					dGet('wtw_mainmenudisplaynamemobile').innerHTML = 'Login';
					dGet('wtw_menudisplayname').innerHTML = 'Login';
					dGet('wtw_tuserimageurl').value = '';
					dGet('wtw_profileimagelg').src = '/content/system/images/menuprofilebig.png';
					dGet('wtw_profileimagesm').src = '/content/system/images/menuprofile32.png';
					dGet('wtw_profileimagesmmobile').src = '/content/system/images/menuprofile32.png';
					WTW.show('wtw_mainmenudisplaynamemobile');
				}
				if (zresponse.userid != '') {
					/* successful login */
					WTW.closeLoginHUD();
					WTW.setLoginValues(zresponse.userid, zresponse.displayname, zresponse.email, zresponse.userimageurl);

					if (WTW.enableEmailValidation == 1) {
						WTW.checkEmailValidation(zresponse.email);
					} else {
						WTW.openLoginHUD('Select My Avatar');
					}
				}
			}
		}
		/* show error if there is one */
		if (serror != '') {
			WTW.log("Email Error = " + serror);
			var zinvalidemailinuse = WTW.getMeshOrNodeByID('hudlogin-invalidemailinuse');
			var zfocus = false;
			if (zinvalidemailinuse != null) {
				zinvalidemailinuse.isVisible = true;
			}
			window.setTimeout(function(){
				zinvalidemailinuse = WTW.getMeshOrNodeByID('hudlogin-invalidemailinuse');
				if (zinvalidemailinuse != null) {
					zinvalidemailinuse.isVisible = false;
				}
			},5000);
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginCreateResponse=' + ex.message);
	}
}

WTWJS.prototype.hudLoginSaveAvatar = function() {
	/* save avatar selection */
	try {
		var zdisplayname = 'Anonymous';
		if (dGet('hudlogin-name-displayname-textbox') != null) {
			if (dGet('hudlogin-name-displayname-textbox').value.length > 0) {
				zdisplayname = dGet('hudlogin-name-displayname-textbox').value.replace('|','');
			}
		}
		WTW.openLoginHUD('Loading 3D Avatar');
		/* save cookie and load avatar */
		if (WTW.selectAvatars[WTW.selectedAvatar] != undefined) {
			if (WTW.selectAvatars[WTW.selectedAvatar].globaluseravatarid != '') {
				WTW.setCookie('globaluseravatarid', WTW.selectAvatars[WTW.selectedAvatar].globaluseravatarid, 365);
				WTW.onMyAvatarSelect(WTW.selectAvatars[WTW.selectedAvatar].globaluseravatarid, '', '');
			} else if (WTW.selectAvatars[WTW.selectedAvatar].useravatarid != '') {
				WTW.setCookie('useravatarid', WTW.selectAvatars[WTW.selectedAvatar].useravatarid, 365);
				WTW.onMyAvatarSelect('', WTW.selectAvatars[WTW.selectedAvatar].useravatarid, '');
			} else {
				WTW.setCookie('avatarid', WTW.selectAvatars[WTW.selectedAvatar].avatarid, 365);
				WTW.onMyAvatarSelect('', '', WTW.selectAvatars[WTW.selectedAvatar].avatarid);
			}
		}
		/* save displayname */
		var zrequest = {
			'userid':dGet('wtw_tuserid').value,
			'displayname':btoa(zdisplayname),
			'function':'savedisplayname'
		};
		WTW.postAsyncJSON('/core/handlers/users.php', zrequest, 
			function(zresponse) {
				zresponse = JSON.parse(zresponse);
				/* note serror would contain errors */
			}
		);
		/* set displayname in menus */
		WTW.setLoginValues(dGet('wtw_tuserid').value, zdisplayname);
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginSaveAvatar=' + ex.message);
	}
}

WTWJS.prototype.hudLoginLoadAvatars = function() {
	/* get avatars for selection */
	try {
		WTW.selectAvatars = [];
		WTW.selectedAvatar = 0;
		var zfilter = 'anonymous';
		if (dGet('wtw_tuserid').value != '') {
			zfilter = 'my';
		}
		WTW.hudLoginLoadAvatarsArray(zfilter);
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginLoadAvatars=' + ex.message);
	}
}

WTWJS.prototype.hudLoginLoadAvatarsArray = function(zfilter) {
	/* get Anonymous avatars for selection */
	try {
		if (zfilter == undefined) {
			zfilter = 'anonymous';
		}
		/* anonymous - will only return avatars in the anonymous group */
		/* my - will return any previously selected user avatars */
		WTW.getAsyncJSON('/connect/avatars.php?groups=' + zfilter, 
			function(zresponse) {
				if (zresponse != null) {
					zresponse = JSON.parse(zresponse);
					var zdefaultdisplayname = 'Anonymous';
					if (zresponse.avatars != null) {
						for (var i=0;i<zresponse.avatars.length;i++) {
							if (zresponse.avatars[i] != null) {
								if (zfilter == 'my') {
									if (zresponse.avatars[i].displayname != '' && zresponse.avatars[i].displayname != null && zdefaultdisplayname == 'Anonymous') {
										zdefaultdisplayname = zresponse.avatars[i].displayname;
									}
								} else {
									if (zresponse.avatars[i].defaultdisplayname != '' && zresponse.avatars[i].defaultdisplayname != null && zdefaultdisplayname == 'Anonymous') {
										zdefaultdisplayname = zresponse.avatars[i].defaultdisplayname;
									}
								}
								WTW.selectAvatars[WTW.selectAvatars.length] = {
									'globaluseravatarid': '',
									'useravatarid': zresponse.avatars[i].useravatarid,
									'avatarid': zresponse.avatars[i].avatarid,
									'avatargroup': zresponse.avatars[i].avatargroup,
									'avatargroups': zresponse.avatars[i].avatargroups,
									'displayname': zresponse.avatars[i].displayname,
									'defaultdisplayname': zresponse.avatars[i].defaultdisplayname,
									'avatardescription': zresponse.avatars[i].avatardescription,
									'gender': zresponse.avatars[i].gender,
									'objects': {
										'folder': zresponse.avatars[i].objects.folder,
										'file': zresponse.avatars[i].objects.file
									},
									'scaling': {
										'x': zresponse.avatars[i].scaling.x,
										'y': zresponse.avatars[i].scaling.y,
										'z': zresponse.avatars[i].scaling.z
									},
									'snapshots': {
										'full': zresponse.avatars[i].snapshots.full,
										'thumbnail': zresponse.avatars[i].snapshots.thumbnail
									},
									'sortorder': zresponse.avatars[i].sortorder,
									'selected': false
								}
							}
						}
					}
					if (zfilter == 'my') {
						/* user is logged in */
						WTW.pluginsHudLoginLoadAvatarsArray(zfilter, zdefaultdisplayname);
						if (WTW.globalLogins == '0') {
							/* if global logins is off, then load additional avatar choices - otherwise, this functions gets called after global avatars are loaded */
							WTW.hudLoginLoadChoiceAvatarsArray(zfilter, zdefaultdisplayname);
						}
					} else {
						WTW.hudLoginShowAvatar(0);
						var zsafety = 0;
						var zdefaulttimer = window.setInterval(function(){
							if (dGet('hudlogin-name-displayname-textbox') != null) {
								dGet('hudlogin-name-displayname-textbox').value = zdefaultdisplayname;
								WTW.textCursor = zdefaultdisplayname.length;
								window.clearInterval(zdefaulttimer);
							}
							zsafety += 1;
							if (zsafety > 20) {
								window.clearInterval(zdefaulttimer);
							}
						},500);
					}
				}
			}
		);
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginLoadAvatarsArray=' + ex.message);
	}
}

WTWJS.prototype.hudLoginLoadChoiceAvatarsArray = function(zfilter, zdefaultdisplayname) {
	/* get Anonymous avatars for selection */
	try {
		if (zfilter == undefined) {
			zfilter = 'anonymous';
		}
		if (zfilter == 'my') {
			/* add the additional Avatar Choices */
			WTW.getAsyncJSON('/connect/avatars.php?groups=all', 
				function(zresponse) {
					if (zresponse != null) {
						zresponse = JSON.parse(zresponse);
						if (zresponse.avatars != null) {
							for (var i=0;i<zresponse.avatars.length;i++) {
								if (zresponse.avatars[i] != null) {
									if (zresponse.avatars[i].defaultdisplayname != '' && zdefaultdisplayname == 'Anonymous') {
										zdefaultdisplayname = zresponse.avatars[i].defaultdisplayname;
									}
									WTW.selectAvatars[WTW.selectAvatars.length] = {
										'globaluseravatarid': '',
										'useravatarid': zresponse.avatars[i].useravatarid,
										'avatarid': zresponse.avatars[i].avatarid,
										'avatargroup': zresponse.avatars[i].avatargroup,
										'avatargroups': zresponse.avatars[i].avatargroups,
										'displayname': zresponse.avatars[i].displayname,
										'defaultdisplayname': zresponse.avatars[i].defaultdisplayname,
										'avatardescription': zresponse.avatars[i].avatardescription,
										'gender': zresponse.avatars[i].gender,
										'objects': {
											'folder': zresponse.avatars[i].objects.folder,
											'file': zresponse.avatars[i].objects.file
										},
										'scaling': {
											'x': zresponse.avatars[i].scaling.x,
											'y': zresponse.avatars[i].scaling.y,
											'z': zresponse.avatars[i].scaling.z
										},
										'snapshots': {
											'full': zresponse.avatars[i].snapshots.full,
											'thumbnail': zresponse.avatars[i].snapshots.thumbnail
										},
										'sortorder': zresponse.avatars[i].sortorder,
										'selected': false
									}
								}
							}
						}
						WTW.hudLoginShowAvatar(0);
						var zsafety = 0;
						var zdefaulttimer = window.setInterval(function(){
							if (dGet('hudlogin-name-displayname-textbox') != null) {
								dGet('hudlogin-name-displayname-textbox').value = zdefaultdisplayname;
								WTW.textCursor = zdefaultdisplayname.length;
								window.clearInterval(zdefaulttimer);
							}
							zsafety += 1;
							if (zsafety > 20) {
								window.clearInterval(zdefaulttimer);
							}
						},500);
					}
				}
			);
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginLoadChoiceAvatarsArray=' + ex.message);
	}
}

WTWJS.prototype.hudLoginShowAvatar = function(zindex) {
	/* show avatar from selection */
	try {
		if (zindex == undefined) {
			zindex = 0;
		}
		var zlocalserverdecal = WTW.getMeshOrNodeByID('hudlogin-localserverdecal');
		var zglobalserverdecal = WTW.getMeshOrNodeByID('hudlogin-globalserverdecal');
		if (zlocalserverdecal != null) {
			zlocalserverdecal.isVisible = false;
		}
		if (zglobalserverdecal != null) {
			zglobalserverdecal.isVisible = false;
		}
		if (WTW.selectAvatars.length > 0) {
			if (WTW.selectAvatars[zindex] != null) {
				WTW.selectedAvatar = zindex;
				var zhudlogin = WTW.getMeshOrNodeByID('hudlogin');
				var zhudlogindisplayname = WTW.getMeshOrNodeByID('hudlogin-preview-displayname');
				var zpreview = WTW.getMeshOrNodeByID('hudlogin-preview');
				if (zhudlogindisplayname != null) {
					zhudlogindisplayname.dispose();
				}
				if (zpreview != null) {
					if (zpreview.material != null) {
						zpreview.material.dispose();
					}
					var zimagepath = WTW.selectAvatars[zindex].snapshots.full;
					var zcovering = new BABYLON.StandardMaterial('hudlogin-preview-mat', scene);
					zcovering.diffuseTexture = new BABYLON.Texture(zimagepath, scene);
					zcovering.diffuseTexture.uScale = 1000;
					zcovering.diffuseTexture.vScale = 500;
					zcovering.diffuseColor = new BABYLON.Color3.FromHexString('#ffffff');
					zcovering.emissiveColor = new BABYLON.Color3.FromHexString('#000000');
					zcovering.specularColor = new BABYLON.Color3.FromHexString('#000000');
					zcovering.ambientColor = new BABYLON.Color3.FromHexString('#ffffff');
					zpreview.material = zcovering;
					zpreview.renderingGroupId = 3;
				}

				var zmolddef = WTW.newMold();
				zmolddef.webtext.webtext = WTW.selectAvatars[zindex].displayname;
				zmolddef.webtext.webstyle = JSON.stringify({
					'anchor':'center',
					'letter-height':.6,
					'letter-thickness':.20,
					'color':'#FFFD89',
					'alpha':1.00,
					'colors':{
						'diffuse':'#FFFD89',
						'specular':'#000000',
						'ambient':'#808080',
						'emissive':'#FFFD89'
					}
				});
				znamemold = WTW.addMold3DText('hudlogin-preview-displayname', zmolddef, 1, 1, 1);
				znamemold.parent = zhudlogin;
				znamemold.position.x = 2;
				znamemold.position.y = -4.7;
				znamemold.rotation.y = WTW.getRadians(-90);
				znamemold.renderingGroupId = 3;
				
				if (WTW.selectAvatars[zindex].globaluseravatarid != '') {
					if (zglobalserverdecal != null) {
						zglobalserverdecal.isVisible = true;
					}
				} else if (WTW.selectAvatars[zindex].useravatarid != '') {
					if (zlocalserverdecal != null) {
						zlocalserverdecal.isVisible = true;
					}
				}
			} else {
				if (zindex < 0) {
					/* beginning of the list, go back to end */
					WTW.hudLoginShowAvatar(WTW.selectAvatars.length - 1);
				} else {
					/* end of the list, go back to start */
					WTW.hudLoginShowAvatar(0);
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginShowAvatar=' + ex.message);
	}
}

WTWJS.prototype.hudLoginUpdateAvatarScaling = function(zdirection, zinterval) {
	/* get avatar ready for edit scaling */
	try {
		var zhudlogin = WTW.getMeshOrNodeByID('hudlogin');
		
		var ztextx = '';
		var ztexty = '';
		var ztextz = '';
		var zheight = 1.15;
		var zvalue = '0';
		var zmoldname = 'hudlogin-scale-x-text';
		var zmyavatar = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value + '-scale');
		if (zmyavatar != null) {
			ztextx = zmyavatar.scaling.x.toString();
			ztextz = zmyavatar.scaling.z.toString();
			ztexty = zmyavatar.scaling.y.toString();
		}
		
		switch (zdirection) {
			case 'x':
				zheight = 1.15;
				zvalue = ztextx;
				zmoldname = 'hudlogin-scale-x-text';
				zvalue = Number(zvalue) + zinterval;
				zmyavatar.scaling.x = zvalue;
				break;
			case 'z':
				zheight = -1.95;
				zvalue = ztextz;
				zmoldname = 'hudlogin-scale-z-text';
				zvalue = Number(zvalue) + zinterval;
				zmyavatar.scaling.z = zvalue;
				break;
			case 'y':
				zheight = -5.05;
				zvalue = ztexty;
				zmoldname = 'hudlogin-scale-y-text';
				zvalue = Number(zvalue) + zinterval;
				zmyavatar.scaling.y = zvalue;
				break;
		}
		
		var ztext = Number(zvalue).toFixed(3);
		
		var zwebstyle = {
			'font-family': 'Arial',
			'anchor':'center',
			'letter-height':.6,
			'letter-thickness':.1,
			'color':'#000000',
			'alpha':1.00,
			'colors':{
				'diffuse':'#000000',
				'specular':'#000000',
				'ambient':'#000000',
				'emissive':'#000000'
			}
		};
		
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		if (zmold != null) {
			zmold.dispose();
		}
		var zdisplaytext = new Writer(ztext, zwebstyle);
		zmold = zdisplaytext.getMesh();
		zmold.rotation = new BABYLON.Vector3(WTW.getRadians(-90), 0, WTW.getRadians(-90));
		zmold.position.y = zheight;
		zmold.position.x = 2;
		zmold.position.z = 5.9;
		zmold.id = zmoldname;
		zmold.name = zmoldname;
		zmold.parent = zhudlogin;
		zmold.isPickable = false;
		zmold.renderingGroupId = 3;
		
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginUpdateAvatarScaling=' + ex.message);
	}
}

WTWJS.prototype.hudLoginLoadEditAvatarScaling = function() {
	/* get avatar ready for edit scaling */
	try {
		var zhudlogin = WTW.getMeshOrNodeByID('hudlogin');
		/* select Size button and unselect Color button */
		var zsize = WTW.getMeshOrNodeByID('hudlogin-button-size');
		var zsizetext = WTW.getMeshOrNodeByID('hudlogin-button-sizetext');
		var zcolor = WTW.getMeshOrNodeByID('hudlogin-button-color');
		var zcolortext = WTW.getMeshOrNodeByID('hudlogin-button-colortext');
		var zmoldblue = WTW.getMeshOrNodeByID('hudlogin-blue');
		var zmoldwhite = WTW.getMeshOrNodeByID('hudlogin-white');
		var zmoldblack = WTW.getMeshOrNodeByID('hudlogin-black');
		var zmoldyellow = WTW.getMeshOrNodeByID('hudlogin-yellow');
		var zmatblack = null;
		var zmatyellow = null;
		if (zmoldblue != null) {
			zmatblue = zmoldblue.material.clone();
			zmatblue.id = 'blue';
		}
		if (zmoldwhite != null) {
			zmatwhite = zmoldwhite.material.clone();
			zmatwhite.id = 'white';
		}
		if (zmoldblack != null) {
			zmatblack = zmoldblack.material.clone();
			zmatblack.id = 'black';
		}
		if (zmoldyellow != null) {
			zmatyellow = zmoldyellow.material.clone();
			zmatyellow.id = 'yellow';
		}
		
		if (zsize != null) {
			zsize.material = zmatblack;
		}
		if (zsizetext != null) {
			zsizetext.material = zmatyellow;
		}
		if (zcolor != null) {
			zcolor.material = zmatblue;
		}
		if (zcolortext != null) {
			zcolortext.material = zmatwhite;
		}
		/* hide parts for color buttons */
		for (var i=0; i<10; i++) {
			var zbuttonpart = WTW.getMeshOrNodeByID('hudlogin-button-part-' + i);
			var zbuttonparttext = WTW.getMeshOrNodeByID('hudlogin-button-part-' + i + 'text');
			if (zbuttonpart != null) {
				zbuttonpart.isVisible = false;
				zbuttonpart.isPickable = false;
			}
			if (zbuttonparttext != null) {
				zbuttonparttext.isVisible = false;
			}
		}
		/* show scaling buttons */
		var zsizelabels = WTW.getMeshOrNodeByID('hudlogin-sizelabels');
		var zbuttonscalex = WTW.getMeshOrNodeByID('hudlogin-button-scalex');
		var zbuttonscalex0 = WTW.getMeshOrNodeByID('hudlogin-button-scalex0');
		var zbuttonscalex0text = WTW.getMeshOrNodeByID('hudlogin-button-scalex0text');
		var zbuttonscalex1 = WTW.getMeshOrNodeByID('hudlogin-button-scalex1');
		var zbuttonscalex1text = WTW.getMeshOrNodeByID('hudlogin-button-scalex1text');
		var zbuttonscalex2 = WTW.getMeshOrNodeByID('hudlogin-button-scalex2');
		var zbuttonscalex2text = WTW.getMeshOrNodeByID('hudlogin-button-scalex2text');
		var zbuttonscalex3 = WTW.getMeshOrNodeByID('hudlogin-button-scalex3');
		var zbuttonscalex3text = WTW.getMeshOrNodeByID('hudlogin-button-scalex3text');
		var zbuttonscalez = WTW.getMeshOrNodeByID('hudlogin-button-scalez');
		var zbuttonscalez0 = WTW.getMeshOrNodeByID('hudlogin-button-scalez0');
		var zbuttonscalez0text = WTW.getMeshOrNodeByID('hudlogin-button-scalez0text');
		var zbuttonscalez1 = WTW.getMeshOrNodeByID('hudlogin-button-scalez1');
		var zbuttonscalez1text = WTW.getMeshOrNodeByID('hudlogin-button-scalez1text');
		var zbuttonscalez2 = WTW.getMeshOrNodeByID('hudlogin-button-scalez2');
		var zbuttonscalez2text = WTW.getMeshOrNodeByID('hudlogin-button-scalez2text');
		var zbuttonscalez3 = WTW.getMeshOrNodeByID('hudlogin-button-scalez3');
		var zbuttonscalez3text = WTW.getMeshOrNodeByID('hudlogin-button-scalez3text');
		var zbuttonscaley = WTW.getMeshOrNodeByID('hudlogin-button-scaley');
		var zbuttonscaley0 = WTW.getMeshOrNodeByID('hudlogin-button-scaley0');
		var zbuttonscaley0text = WTW.getMeshOrNodeByID('hudlogin-button-scaley0text');
		var zbuttonscaley1 = WTW.getMeshOrNodeByID('hudlogin-button-scaley1');
		var zbuttonscaley1text = WTW.getMeshOrNodeByID('hudlogin-button-scaley1text');
		var zbuttonscaley2 = WTW.getMeshOrNodeByID('hudlogin-button-scaley2');
		var zbuttonscaley2text = WTW.getMeshOrNodeByID('hudlogin-button-scaley2text');
		var zbuttonscaley3 = WTW.getMeshOrNodeByID('hudlogin-button-scaley3');
		var zbuttonscaley3text = WTW.getMeshOrNodeByID('hudlogin-button-scaley3text');
		var ztextx = '';
		var ztexty = '';
		var ztextz = '';
		
		var zwebstyle = {
			'font-family': 'Arial',
			'anchor':'center',
			'letter-height':.6,
			'letter-thickness':.1,
			'color':'#000000',
			'alpha':1.00,
			'colors':{
				'diffuse':'#000000',
				'specular':'#000000',
				'ambient':'#000000',
				'emissive':'#000000'
			}
		};

		var zmyavatar = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value + '-scale');
		if (zmyavatar != null) {
			ztextx = Number(zmyavatar.scaling.x.toString()).toFixed(3);
			ztextz = Number(zmyavatar.scaling.z.toString()).toFixed(3);
			ztexty = Number(zmyavatar.scaling.y.toString()).toFixed(3);
		}
		
		if (zsizelabels != null) {
			zsizelabels.isVisible = true;
			zsizelabels.isPickable = false;
		}
		if (zbuttonscalex != null) {
			zbuttonscalex.isVisible = true;
			zbuttonscalex.isPickable = false;
			
			var zdisplaytextx = WTW.getMeshOrNodeByID('hudlogin-scale-x-text');
			if (zdisplaytextx != null) {
				zdisplaytextx.dispose();
			}
			var zdisplaytext = new Writer(ztextx, zwebstyle);
			zdisplaytextx = zdisplaytext.getMesh();
			zdisplaytextx.rotation = new BABYLON.Vector3(WTW.getRadians(-90), 0, WTW.getRadians(-90));
			zdisplaytextx.position.y = 1.15;
			zdisplaytextx.position.x = 2;
			zdisplaytextx.position.z = 5.9;
			zdisplaytextx.id = 'hudlogin-scale-x-text';
			zdisplaytextx.name = 'hudlogin-scale-x-text';
			zdisplaytextx.parent = zhudlogin;
			zdisplaytextx.isPickable = false;
			zdisplaytextx.renderingGroupId = 3;
		}
		if (zbuttonscalex0 != null) {
			zbuttonscalex0.isVisible = true;
			zbuttonscalex0.isPickable = true;
		}
		if (zbuttonscalex0text != null) {
			zbuttonscalex0text.isVisible = true;
		}
		if (zbuttonscalex1 != null) {
			zbuttonscalex1.isVisible = true;
			zbuttonscalex1.isPickable = true;
		}
		if (zbuttonscalex1text != null) {
			zbuttonscalex1text.isVisible = true;
		}
		if (zbuttonscalex2 != null) {
			zbuttonscalex2.isVisible = true;
			zbuttonscalex2.isPickable = true;
		}
		if (zbuttonscalex2text != null) {
			zbuttonscalex2text.isVisible = true;
		}
		if (zbuttonscalex3 != null) {
			zbuttonscalex3.isVisible = true;
			zbuttonscalex3.isPickable = true;
		}
		if (zbuttonscalex3text != null) {
			zbuttonscalex3text.isVisible = true;
		}
		if (zbuttonscalez != null) {
			zbuttonscalez.isVisible = true;
			zbuttonscalez.isPickable = false;

			var zdisplaytextz = WTW.getMeshOrNodeByID('hudlogin-scale-z-text');
			if (zdisplaytextz != null) {
				zdisplaytextz.dispose();
			}
			var zdisplaytext = new Writer(ztextz, zwebstyle);
			zdisplaytextz = zdisplaytext.getMesh();
			zdisplaytextz.rotation = new BABYLON.Vector3(WTW.getRadians(-90), 0, WTW.getRadians(-90));
			zdisplaytextz.position.y = -1.95;
			zdisplaytextz.position.x = 2;
			zdisplaytextz.position.z = 5.9;
			zdisplaytextz.id = 'hudlogin-scale-z-text';
			zdisplaytextz.name = 'hudlogin-scale-z-text';
			zdisplaytextz.parent = zhudlogin;
			zdisplaytextz.isPickable = false;
			zdisplaytextz.renderingGroupId = 3;
		}
		if (zbuttonscalez0 != null) {
			zbuttonscalez0.isVisible = true;
			zbuttonscalez0.isPickable = true;
		}
		if (zbuttonscalez0text != null) {
			zbuttonscalez0text.isVisible = true;
		}
		if (zbuttonscalez1 != null) {
			zbuttonscalez1.isVisible = true;
			zbuttonscalez1.isPickable = true;
		}
		if (zbuttonscalez1text != null) {
			zbuttonscalez1text.isVisible = true;
		}
		if (zbuttonscalez2 != null) {
			zbuttonscalez2.isVisible = true;
			zbuttonscalez2.isPickable = true;
		}
		if (zbuttonscalez2text != null) {
			zbuttonscalez2text.isVisible = true;
		}
		if (zbuttonscalez3 != null) {
			zbuttonscalez3.isVisible = true;
			zbuttonscalez3.isPickable = true;
		}
		if (zbuttonscalez3text != null) {
			zbuttonscalez3text.isVisible = true;
		}
		if (zbuttonscaley != null) {
			zbuttonscaley.isVisible = true;
			zbuttonscaley.isPickable = false;

			var zdisplaytexty = WTW.getMeshOrNodeByID('hudlogin-scale-y-text');
			if (zdisplaytexty != null) {
				zdisplaytexty.dispose();
			}
			var zdisplaytext = new Writer(ztexty, zwebstyle);
			zdisplaytexty = zdisplaytext.getMesh();
			zdisplaytexty.rotation = new BABYLON.Vector3(WTW.getRadians(-90), 0, WTW.getRadians(-90));
			zdisplaytexty.position.y = -5.05;
			zdisplaytexty.position.x = 2;
			zdisplaytexty.position.z = 5.9;
			zdisplaytexty.id = 'hudlogin-scale-y-text';
			zdisplaytexty.name = 'hudlogin-scale-y-text';
			zdisplaytexty.parent = zhudlogin;
			zdisplaytexty.isPickable = false;
			zdisplaytexty.renderingGroupId = 3;
		}
		if (zbuttonscaley0 != null) {
			zbuttonscaley0.isVisible = true;
			zbuttonscaley0.isPickable = true;
		}
		if (zbuttonscaley0text != null) {
			zbuttonscaley0text.isVisible = true;
		}
		if (zbuttonscaley1 != null) {
			zbuttonscaley1.isVisible = true;
			zbuttonscaley1.isPickable = true;
		}
		if (zbuttonscaley1text != null) {
			zbuttonscaley1text.isVisible = true;
		}
		if (zbuttonscaley2 != null) {
			zbuttonscaley2.isVisible = true;
			zbuttonscaley2.isPickable = true;
		}
		if (zbuttonscaley2text != null) {
			zbuttonscaley2text.isVisible = true;
		}
		if (zbuttonscaley3 != null) {
			zbuttonscaley3.isVisible = true;
			zbuttonscaley3.isPickable = true;
		}
		if (zbuttonscaley3text != null) {
			zbuttonscaley3text.isVisible = true;
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginLoadEditAvatarScaling=' + ex.message);
	}
}

WTWJS.prototype.hudLoginLoadEditAvatarColors = function() {
	/* get avatar ready for edit - get parts */
	try {
		/* select Color button and unselect Size button */
		var zsize = WTW.getMeshOrNodeByID('hudlogin-button-size');
		var zsizetext = WTW.getMeshOrNodeByID('hudlogin-button-sizetext');
		var zcolor = WTW.getMeshOrNodeByID('hudlogin-button-color');
		var zcolortext = WTW.getMeshOrNodeByID('hudlogin-button-colortext');
		var zmoldblue = WTW.getMeshOrNodeByID('hudlogin-blue');
		var zmoldwhite = WTW.getMeshOrNodeByID('hudlogin-white');
		var zmoldblack = WTW.getMeshOrNodeByID('hudlogin-black');
		var zmoldyellow = WTW.getMeshOrNodeByID('hudlogin-yellow');
		var zmatblack = null;
		var zmatyellow = null;
		if (zmoldblue != null) {
			zmatblue = zmoldblue.material.clone();
			zmatblue.id = 'blue';
		}
		if (zmoldwhite != null) {
			zmatwhite = zmoldwhite.material.clone();
			zmatwhite.id = 'white';
		}
		if (zmoldblack != null) {
			zmatblack = zmoldblack.material.clone();
			zmatblack.id = 'black';
		}
		if (zmoldyellow != null) {
			zmatyellow = zmoldyellow.material.clone();
			zmatyellow.id = 'yellow';
		}
		
		if (zsize != null) {
			zsize.material = zmatblue;
		}
		if (zsizetext != null) {
			zsizetext.material = zmatwhite;
		}
		if (zcolor != null) {
			zcolor.material = zmatblack;
		}
		if (zcolortext != null) {
			zcolortext.material = zmatyellow;
		}
		/* hide scaling buttons */
		var zsizelabels = WTW.getMeshOrNodeByID('hudlogin-sizelabels');
		var zbuttonscalex = WTW.getMeshOrNodeByID('hudlogin-button-scalex');
		var zbuttonscalex0 = WTW.getMeshOrNodeByID('hudlogin-button-scalex0');
		var zbuttonscalex0text = WTW.getMeshOrNodeByID('hudlogin-button-scalex0text');
		var zbuttonscalex1 = WTW.getMeshOrNodeByID('hudlogin-button-scalex1');
		var zbuttonscalex1text = WTW.getMeshOrNodeByID('hudlogin-button-scalex1text');
		var zbuttonscalex2 = WTW.getMeshOrNodeByID('hudlogin-button-scalex2');
		var zbuttonscalex2text = WTW.getMeshOrNodeByID('hudlogin-button-scalex2text');
		var zbuttonscalex3 = WTW.getMeshOrNodeByID('hudlogin-button-scalex3');
		var zbuttonscalex3text = WTW.getMeshOrNodeByID('hudlogin-button-scalex3text');
		var zbuttonscalez = WTW.getMeshOrNodeByID('hudlogin-button-scalez');
		var zbuttonscalez0 = WTW.getMeshOrNodeByID('hudlogin-button-scalez0');
		var zbuttonscalez0text = WTW.getMeshOrNodeByID('hudlogin-button-scalez0text');
		var zbuttonscalez1 = WTW.getMeshOrNodeByID('hudlogin-button-scalez1');
		var zbuttonscalez1text = WTW.getMeshOrNodeByID('hudlogin-button-scalez1text');
		var zbuttonscalez2 = WTW.getMeshOrNodeByID('hudlogin-button-scalez2');
		var zbuttonscalez2text = WTW.getMeshOrNodeByID('hudlogin-button-scalez2text');
		var zbuttonscalez3 = WTW.getMeshOrNodeByID('hudlogin-button-scalez3');
		var zbuttonscalez3text = WTW.getMeshOrNodeByID('hudlogin-button-scalez3text');
		var zbuttonscaley = WTW.getMeshOrNodeByID('hudlogin-button-scaley');
		var zbuttonscaley0 = WTW.getMeshOrNodeByID('hudlogin-button-scaley0');
		var zbuttonscaley0text = WTW.getMeshOrNodeByID('hudlogin-button-scaley0text');
		var zbuttonscaley1 = WTW.getMeshOrNodeByID('hudlogin-button-scaley1');
		var zbuttonscaley1text = WTW.getMeshOrNodeByID('hudlogin-button-scaley1text');
		var zbuttonscaley2 = WTW.getMeshOrNodeByID('hudlogin-button-scaley2');
		var zbuttonscaley2text = WTW.getMeshOrNodeByID('hudlogin-button-scaley2text');
		var zbuttonscaley3 = WTW.getMeshOrNodeByID('hudlogin-button-scaley3');
		var zbuttonscaley3text = WTW.getMeshOrNodeByID('hudlogin-button-scaley3text');
		
		if (zsizelabels != null) {
			zsizelabels.isVisible = false;
			zsizelabels.isPickable = false;
		}
		if (zbuttonscalex != null) {
			zbuttonscalex.isVisible = false;
			zbuttonscalex.isPickable = false;
		}
		if (zbuttonscalex0 != null) {
			zbuttonscalex0.isVisible = false;
			zbuttonscalex0.isPickable = false;
		}
		if (zbuttonscalex0text != null) {
			zbuttonscalex0text.isVisible = false;
			zbuttonscalex0text.isPickable = false;
		}
		if (zbuttonscalex1 != null) {
			zbuttonscalex1.isVisible = false;
			zbuttonscalex1.isPickable = false;
		}
		if (zbuttonscalex1text != null) {
			zbuttonscalex1text.isVisible = false;
			zbuttonscalex1text.isPickable = false;
		}
		if (zbuttonscalex2 != null) {
			zbuttonscalex2.isVisible = false;
			zbuttonscalex2.isPickable = false;
		}
		if (zbuttonscalex2text != null) {
			zbuttonscalex2text.isVisible = false;
			zbuttonscalex2text.isPickable = false;
		}
		if (zbuttonscalex3 != null) {
			zbuttonscalex3.isVisible = false;
			zbuttonscalex3.isPickable = false;
		}
		if (zbuttonscalex3text != null) {
			zbuttonscalex3text.isVisible = false;
			zbuttonscalex3text.isPickable = false;
		}
		if (zbuttonscalez != null) {
			zbuttonscalez.isVisible = false;
			zbuttonscalez.isPickable = false;
		}
		if (zbuttonscalez0 != null) {
			zbuttonscalez0.isVisible = false;
			zbuttonscalez0.isPickable = false;
		}
		if (zbuttonscalez0text != null) {
			zbuttonscalez0text.isVisible = false;
		}
		if (zbuttonscalez1 != null) {
			zbuttonscalez1.isVisible = false;
			zbuttonscalez1.isPickable = false;
		}
		if (zbuttonscalez1text != null) {
			zbuttonscalez1text.isVisible = false;
		}
		if (zbuttonscalez2 != null) {
			zbuttonscalez2.isVisible = false;
			zbuttonscalez2.isPickable = false;
		}
		if (zbuttonscalez2text != null) {
			zbuttonscalez2text.isVisible = false;
		}
		if (zbuttonscalez3 != null) {
			zbuttonscalez3.isVisible = false;
			zbuttonscalez3.isPickable = false;
		}
		if (zbuttonscalez3text != null) {
			zbuttonscalez3text.isVisible = false;
		}
		if (zbuttonscaley != null) {
			zbuttonscaley.isVisible = false;
			zbuttonscaley.isPickable = false;
		}
		if (zbuttonscaley0 != null) {
			zbuttonscaley0.isVisible = false;
			zbuttonscaley0.isPickable = false;
		}
		if (zbuttonscaley0text != null) {
			zbuttonscaley0text.isVisible = false;
		}
		if (zbuttonscaley1 != null) {
			zbuttonscaley1.isVisible = false;
			zbuttonscaley1.isPickable = false;
		}
		if (zbuttonscaley1text != null) {
			zbuttonscaley1text.isVisible = false;
		}
		if (zbuttonscaley2 != null) {
			zbuttonscaley2.isVisible = false;
			zbuttonscaley2.isPickable = false;
		}
		if (zbuttonscaley2text != null) {
			zbuttonscaley2text.isVisible = false;
		}
		if (zbuttonscaley3 != null) {
			zbuttonscaley3.isVisible = false;
			zbuttonscaley3.isPickable = false;
		}
		if (zbuttonscaley3text != null) {
			zbuttonscaley3text.isVisible = false;
		}
		/* load color buttons with parts */
		var zmyavatar = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value + '-scale');
		if (zmyavatar != null) {
			var zwebstyle = {
				'font-family': 'Arial',
				'anchor':'center',
				'letter-height':.8,
				'letter-thickness':.2,
				'color':'#ffffff',
				'alpha':1.00,
				'colors':{
					'diffuse':'#fcfcfc',
					'specular':'#989e2c',
					'ambient':'#888722',
					'emissive':'#ffffff'
				}
			};
			var zavatarparts = zmyavatar.getChildren();
			for (var i=0;i<zavatarparts.length;i++) {
				if (zavatarparts[i] != null) {
					var zpartname = zavatarparts[i].id.replace('myavatar-' + dGet('wtw_tinstanceid').value + '-','');
					var zbutton = WTW.getMeshOrNodeByID('hudlogin-button-part-' + i);
					if (zbutton != null) {
						zbutton.isVisible = true;
						zbutton.isPickable = true;
						
						/* create 3d text menu name */
						Writer = BABYLON.MeshWriter(scene, {scale:1});
						if (zpartname != '') {
							var zmytext = WTW.getMeshOrNodeByID('hudlogin-button-part-' + i + 'text');
							if (zmytext != null) {
								zmytext.dispose();
							}
							var zdisplaytext = new Writer(zpartname, zwebstyle);
							zmytext = zdisplaytext.getMesh();
							zmytext.rotation = new BABYLON.Vector3(WTW.getRadians(-90), 0, WTW.getRadians(-90));
							zmytext.position.y = 2.6 - (i * 1.01);
							zmytext.position.x = 2;
							zmytext.position.z = 5;
							zmytext.id = 'hudlogin-button-part-' + i + 'text';
							zmytext.name = 'hudlogin-button-part-' + i + 'text';
							zmytext.parent = zbutton;
							zmytext.isPickable = false;
							zmytext.renderingGroupId = 3;
						}
						
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginLoadEditAvatarColors=' + ex.message);
	}
}

WTWJS.prototype.hudLoginResetButtonColors = function(zmoldname) {
	/* Reset button colors for avatar parts */
	try {
		for (var i=0; i<10; i++) {
			var zbutton = WTW.getMeshOrNodeByID('hudlogin-button-part-' + i);
			if (zbutton != null) {
				var zmatcurrentid = '';
				if (zbutton.material != null) {
					if (zbutton.material.id != undefined) {
						zmatcurrentid = zbutton.material.id;
					}
					if (zmatcurrentid != 'blue') {
						var zmoldblue = WTW.getMeshOrNodeByID('hudlogin-blue');
						var zmoldwhite = WTW.getMeshOrNodeByID('hudlogin-white');
						var zmatblue = null;
						var zmatwhite = null;
						if (zmoldblue != null) {
							zmatblue = zmoldblue.material.clone();
							zmatblue.id = 'blue';
						}
						if (zmoldwhite != null) {
							zmatwhite = zmoldwhite.material.clone();
							zmatwhite.id = 'white';
						}
						zbutton.material = zmatblue;
						var zbuttontext = WTW.getMeshOrNodeByID('hudlogin-button-part-' + i + 'text');
						if (zbuttontext != null) {
							zbuttontext.material = zmatwhite;
						}
					}
				}
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginResetButtonColors=' + ex.message);
	}
}

WTWJS.prototype.hudLoginEditAvatarColors = function(zmoldname) {
	/* edit color on part */
	try {
		WTW.hudLoginResetButtonColors();
		
		var zmold = WTW.getMeshOrNodeByID(zmoldname);
		var zmoldtext = WTW.getMeshOrNodeByID(zmoldname + 'text');
		var zmoldblack = WTW.getMeshOrNodeByID('hudlogin-black');
		var zmoldyellow = WTW.getMeshOrNodeByID('hudlogin-yellow');
		var zmatblack = null;
		var zmatyellow = null;
		if (zmoldblack != null) {
			zmatblack = zmoldblack.material.clone();
			zmatblack.id = 'black';
		}
		if (zmoldyellow != null) {
			zmatyellow = zmoldyellow.material.clone();
			zmatyellow.id = 'yellow';
		}
		
		if (zmold != null) {
			zmold.material = zmatblack;
		}
		if (zmoldtext != null) {
			zmoldtext.material = zmatyellow;
		}

		var zindex = zmoldname.replace('hudlogin-button-part-','');
		var zmyavatar = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value + '-scale');
		if (zmyavatar != null) {
			var zavatarparts = zmyavatar.getChildren();
			if (zavatarparts[zindex] != null) {
				var zpartname = zavatarparts[zindex].id.replace('myavatar-' + dGet('wtw_tinstanceid').value + '-','');
				var zavatarpartname = 'myavatar-' + dGet('wtw_tinstanceid').value + '-' + zpartname;
				var zavatarpart = WTW.getMeshOrNodeByID(zavatarpartname);
				if (zavatarpart != null) {
					WTW.hilightMoldFast(zavatarpartname, 'green');

					if (WTW.guiAdminColors != null) {
						WTW.guiAdminColors.dispose();
						WTW.guiAdminColors = null;
					}
					var zplane = WTW.getMeshOrNodeByID('UI');
					if (zplane != null) {
						zplane.dispose();
					}
					var zhudlogin = WTW.getMeshOrNodeByID('hudlogin');

					zplane = BABYLON.Mesh.CreatePlane("UI", 2);
					zplane.position = new BABYLON.Vector3(0,-2.5,-2);
					zplane.rotation.y = WTW.getRadians(-90);
					zplane.scaling.x = 6;
					zplane.scaling.y = 6;
					//zplane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
					zplane.isPickable = true;
					zplane.renderingGroupId = 3;
					zplane.parent = zhudlogin;
					WTW.guiAdminColors = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(zplane);

					var zpanel = new BABYLON.GUI.StackPanel();
					zpanel.width = '300px';
					zpanel.isVertical = true;
					zpanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
					zpanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
					WTW.guiAdminColors.addControl(zpanel);

					var zcoloremissivetitle = new BABYLON.GUI.TextBlock();
					zcoloremissivetitle.text = 'Emissive Color';
					zcoloremissivetitle.color = '#FFFFFF';
					zcoloremissivetitle.fontSize = 20;
					zcoloremissivetitle.height = '50px';
					zpanel.addControl(zcoloremissivetitle);     

					var zcoloremissive = new BABYLON.GUI.ColorPicker();
					zcoloremissive.value = zavatarpart.material.emissiveColor;
					zcoloremissive.height = '150px';
					zcoloremissive.width = '150px';
					zcoloremissive.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
					zcoloremissive.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
					zcoloremissive.onValueChangedObservable.add(function(value) {
						if (value != null) {
							WTW.setMyAvatarColor(zavatarpart, 'emissive', value.r, value.g, value.b);
						}
					});
					zcoloremissive.isPickable = true;
					zpanel.addControl(zcoloremissive); 

					var zcolordiffusetitle = new BABYLON.GUI.TextBlock();
					zcolordiffusetitle.text = 'Diffuse Color';
					zcolordiffusetitle.color = '#FFFFFF';
					zcolordiffusetitle.fontSize = 20;
					zcolordiffusetitle.height = '50px';
					zpanel.addControl(zcolordiffusetitle);     

					var zcolordiffuse = new BABYLON.GUI.ColorPicker();
					zcolordiffuse.value = zavatarpart.material.diffuseColor;
					zcolordiffuse.height = '150px';
					zcolordiffuse.width = '150px';
					zcolordiffuse.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
					zcolordiffuse.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
					zcolordiffuse.onValueChangedObservable.add(function(value) {
						if (value != null) {
							WTW.setMyAvatarColor(zavatarpart, 'diffuse', value.r, value.g, value.b);
						}
					});
					zcolordiffuse.isPickable = true;
					zpanel.addControl(zcolordiffuse); 

					var zcolorspeculartitle = new BABYLON.GUI.TextBlock();
					zcolorspeculartitle.text = 'Specular Color';
					zcolorspeculartitle.color = '#FFFFFF';
					zcolorspeculartitle.fontSize = 20;
					zcolorspeculartitle.height = '50px';
					zpanel.addControl(zcolorspeculartitle);     

					var zcolorspecular = new BABYLON.GUI.ColorPicker();
					zcolorspecular.value = zavatarpart.material.specularColor;
					zcolorspecular.height = '150px';
					zcolorspecular.width = '150px';
					zcolorspecular.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
					zcolorspecular.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
					zcolorspecular.onValueChangedObservable.add(function(value) {
						if (value != null) {
							WTW.setMyAvatarColor(zavatarpart, 'specular', value.r, value.g, value.b);
						}
					});
					zcolorspecular.isPickable = true;
					zpanel.addControl(zcolorspecular); 

					var zcolorambienttitle = new BABYLON.GUI.TextBlock();
					zcolorambienttitle.text = 'Ambient Color';
					zcolorambienttitle.color = '#FFFFFF';
					zcolorambienttitle.fontSize = 20;
					zcolorambienttitle.height = '50px';
					zpanel.addControl(zcolorambienttitle);     

					var zcolorambient = new BABYLON.GUI.ColorPicker();
					zcolorambient.value = zavatarpart.material.ambientColor;
					zcolorambient.height = '150px';
					zcolorambient.width = '150px';
					zcolorambient.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
					zcolorambient.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
					zcolorambient.onValueChangedObservable.add(function(value) {
						if (value != null) {
							WTW.setMyAvatarColor(zavatarpart, 'ambient', value.r, value.g, value.b);
						}
					});
					zcolorambient.isPickable = true;
					zpanel.addControl(zcolorambient); 


				}
			}
		}		
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-hudLoginEditAvatarColors=' + ex.message);
	}
}

WTWJS.prototype.setMyAvatarColor = function(zavatarpart, zcolorgroup, zr, zg, zb) {
	/* set color after change is made on the color wheels */
	try {
		if (zavatarpart != null) {
			var zcovering = zavatarpart.material;
			if (zcovering != null) {
				switch (zcolorgroup) {
					case 'diffuse':
						zcovering.diffuseColor = new BABYLON.Color3(zr,zg,zb);
						break;
					case 'specular':
						zcovering.specularColor = new BABYLON.Color3(zr,zg,zb);
						break;
					case 'emissive':
						zcovering.emissiveColor = new BABYLON.Color3(zr,zg,zb);
						break;
					case 'ambient':
						zcovering.ambientColor = new BABYLON.Color3(zr,zg,zb);
						break;
				}
				zavatarpart.material.dispose();
				zavatarpart.material = zcovering;
			}
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-setMyAvatarColor=' + ex.message);
	}
}

WTWJS.prototype.saveMyAvatarColorScaling = function() {
	/* save my avatar - colors and scaling */
	try {
		var zmyavatar = WTW.getMeshOrNodeByID('myavatar-' + dGet('wtw_tinstanceid').value + '-scale');
		if (zmyavatar != null) {
			/* save colors */
			var zavatarparts = zmyavatar.getChildren();
			for (var i=0; i<zavatarparts.length; i++) {
				if (zavatarparts[i] != null) {
					if (zavatarparts[i].material != null) {
						if (zavatarparts[i].material.diffuseColor != undefined) {
							var zavatarpart = zavatarparts[i].id.replace('myavatar-' + dGet('wtw_tinstanceid').value + '-','');
							var zdiffusecolor = zavatarparts[i].material.diffuseColor.toHexString();
							var zspecularcolor = zavatarparts[i].material.specularColor.toHexString();
							var zemissivecolor = zavatarparts[i].material.emissiveColor.toHexString();
							var zambientcolor = zavatarparts[i].material.ambientColor.toHexString();
							if (dGet('wtw_tuseravatarid').value != '' && dGet('wtw_tuserid').value != '') {
								var zrequest = {
									'useravatarid':dGet('wtw_tuseravatarid').value,
									'userid':dGet('wtw_tuserid').value,
									'instanceid':dGet('wtw_tinstanceid').value,
									'avatarpartid':'',
									'avatarpart':zavatarpart,
									'diffusecolor':zdiffusecolor,
									'specularcolor':zspecularcolor,
									'emissivecolor':zemissivecolor,
									'ambientcolor':zambientcolor,
									'function':'saveavatarcolor'
								};
								WTW.postAsyncJSON('/core/handlers/wtwavatars-saveavatar.php', zrequest, 
									async function(zresponse) {
										zresponse = JSON.parse(zresponse);
									}
								);
							}
						}
					}
				}
			}
			/* save avatar scaling */
			var zrequest = {
				'useravatarid':dGet('wtw_tuseravatarid').value,
				'userid':dGet('wtw_tuserid').value,
				'instanceid':dGet('wtw_tinstanceid').value,
				'scalingx':zmyavatar.scaling.x,
				'scalingz':zmyavatar.scaling.z,
				'scalingy':zmyavatar.scaling.y,
				'function':'saveavatarscaling'
			};
			WTW.postAsyncJSON('/core/handlers/wtwavatars-saveavatar.php', zrequest, 
				async function(zresponse) {
					zresponse = JSON.parse(zresponse);
				}
			);
		}
	} catch (ex) {
		WTW.log('core-scripts-hud-wtw_hud_login.js-saveMyAvatarColorScaling=' + ex.message);
	}
}

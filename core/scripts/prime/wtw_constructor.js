/* All code is Copyright 2013-2021 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* constructor function code WTWJS() creates the JavaScript WTW class and sets most global default values for WalkTheWeb */
/* additional PHP derived yet JavaScript global values can be found at /core/functions/class_wtw-initsession.php loadInitJSData() function */

var scene;
var engine;
var canvas;

function WTWJS() {

/* GLOBAL VARIABLES ONLY FOR ADMIN MODE */
	
	/* WTW.adminView - value 1 when in admin mode (admin.php) or 0 when in browse mode (index.php) */
	this.adminView = 0;

	/* WTW.adminMenu - tracks the admin menu main section - mostly for shown after refreshes */
	this.adminMenu = 1;
	
	/* WTW.moldList - Array of basic shapes to add to 3D Scene (box, sphere, torus, etc...) */
	this.moldList = [];

	/* WTW.guiAdminColors - dynamic texture layer in babylon used for color selector in admin mode - BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI  */
	this.guiAdminColors = null;
	
	/* WTW.loadAllActionZones - sets all load zones as if the avatar is in them so that it loads all sections of the map - great for getting snapshots and images */
	this.loadAllActionZones = 0;


/* GLOBAL VARIABLES FOR BROWSE MODE (ALSO USED IN ADMIN MODE) */
	
	/* WTW.uicanvas - this is a transparent canvas over the active babylon canvas. Used for the display items like compass and movement arrows. */
	/* this will be depreciated by the Heads Up Display functionality when implemented */
	this.uicanvas;

	/* WTW.closestDistance - used to determine the distance from WTW.myAvatar.position and the closest building (compass arrow uses the closest building) */
	this.closestDistance = null;

	/* WTW.closestAngle - used to determine the angle from WTW.myAvatar.rotation.y and the closest building (then shown on the compass arrow) */
	this.closestAngle = null;

	/* WTW.closestWebID - WebId is either a communityid, buildingid, or thingid and this value identifies the closest item */
	this.closestWebID = "";

	/* WTW.highlightLayer - used to highlight any mesh in the active 3D Scene (implementation of BABYLON.HighlightLayer) */
	this.highlightLayer = null;

	/* enable physics engine */
	this.enablePhysics = 1;

	/* enable user email validation */
	this.enableEmailValidation = 0;

	/* WTW.isInitCycle - value changes to zero after 5 seconds from the initial loading. This allows the 3D Scene to render before certain extras are implemented. */
	this.isInitCycle = 1;

	/* WTW.activityTimer - timer used to turn off the scene render if left alone (inactive) for an excessive amount of time (shorter time for mobile devices). */
	this.activityTimer = null;

	/* WTW.pause - set to 1 when 3D Scene render is stopped, 0 when 3D Scene render cycle is running - ties to the WTW.activityTimer above */
	this.pause = 1;

	/* WTW,holdPosition - set as WTW.myAvatar.position (x,y,z) to determine if the avatar has moved - ties to the WTW.activityTimer above */
	this.holdPosition = "";

	/* WTW.sizeX - current width of the canvas window running Babylon */
	this.sizeX = 1024;

	/* WTW.sizeY - current height of the canvas window running Babylon */
	this.sizeY = 768;

	/* WTW.animationRatio - currently remarked out in the scene render loop - scene.getAnimationRatio(); */
	this.animationRatio = 0;

	/* WTW.fps - current frames per second the user is experiencing. quality cheack and helps with coordinating movements in multiplayer. Babylon caps at 60 FPS */
	this.fps = 60;

	/* WTW.showFPS - show or hide the FPS display on the screen - triggered on menu */
	this.showFPS = 0;

	/* WTW.isMobile - internal check for if it is a mobile device. Example of use is the activity timer timeout set shorter for mobile devices and camera views using joystick */
	this.isMobile = false;

	/* WTW.gpuSetting - identifies the GPU technology and resources available (preporation for future use) */
	this.gpuSetting;
	
	/* WTW.hudLayout - identifies the current layout of the Heads Up Display (HUD): '' = center, 'left', 'right', or 'bottom' */
	this.hudLayout = '';


/* optimization settings */
	
	/* WTW.optimizeScene = 1; trigger the optimization process to run, resets to 0 on completion */
	this.optimizeScene = 0;
	
	/* WTW.octree is used to speed up visible mesh selection in large scenes */
	this.octree = null;
	
	/* reduce memory footprint - turn off IndexDB for caching images and assets */
	/* Default: true (caching) for browe mode and false (no caching) for Admin Mode */
	this.enableOfflineSupport = true;
	this.enableOfflineSupportAdmin = true;
	
	/* Content Lost and Restore support - Babylon recreates in transparent way if the WebGL content is lost - consumes more memory - Default: true (off) */
	this.doNotHandleContextLost = true;
	
	/* Texture caching buffers - set to true to clear buffer of texture paths to free up memory */
	this.cleanCachedTextureBuffer = true;


/* processing queues, helpers, and listeners */
	
	/* WTW.loadMoldQueue - the load queue Array is used to pace the mold creation throughout the frames keeping it running with smooth animation. */
	/* The queue collects the definitions to add, then executes them a few at a time on each frame */
	this.loadMoldQueue = [];
	
	/* WTW.checkLoadQueue - check load queue value is used to determine if a current cycle is running or ready to run again */
	/* 1 when running and 0 when complete so it can run again. This keeps it from snowballing and running multiple instances at the same time */
	this.checkLoadQueue = 0;
	
	/* WTW.analyticsQueue - analytics queue Array is used to report 3D Community, Building, and Thing page loading to Analytics */
	this.analyticsQueue = [];
	
	/* not in use yet, WTW.eventListeners Array will be dynamically created so other coders can add to existing events, like onAvatarMove */
	this.eventListeners = [];

	/* WTW.checkShownMolds - value is used to determine if a current cycle (WTW.setShownMolds() function) for loading molds is running or ready to run again */
	/* 1 when running and 0 when complete so it can run again. This keeps it from snowballing and running multiple instances at the same time */
	this.checkShownMolds = 0;
	
	/* WTW.checkZones - boolean value for flagging when to check the Action Zones (normally when any avatar moves or clicks on an object to interact with it) */
	/* example - when an avatar walks into a swinging door action zone - WTW.checkZones is set to true, the WTW.checkActionZones() function is executed and the door opens */
	/* this flag value is used so that the function is not run any more than necessary during the render cycle */
	this.checkZones = true;
	
	/* WTW.loadedJSFiles - JavaScript files can be loaded dynamically with Action Zones so that they can be used only in sections of the 3D Scene map */
	/* this value contains a string of file names that are loaded to the scene at any point of time - this does not include the standard loaded JS files */
	/* Example: you walk into an area with a paint ball game, so the JavaScript file for game logic is loaded while you are there and unloads when you leave the arena */
	this.loadedJSFiles = "";

	
/* 3D Scene related */
	
	/* WTW.mainParent - the name of the highest parent in the current 3D Scene, usually the connecting Grid for the 3D Community, 3D Building, 3D Thing in that order of availability */
	this.mainParent = "connectinggrids-0---";
	
	/* WTW.mainParentMold - the name of the highest parent (Connecting Grid) in the current 3D Scene */
	this.mainParentMold = null;

	/* WTW.communities - Array of 3D Community definitions loaded in a given 3D Scene */
	this.communities = [];
	
	/* WTW.communitiesMolds - Array of 3D Community Mold definitions loaded in a given 3D Scene */
	this.communitiesMolds = [];
	
	/* WTW.communityName - identifies the current 3D Community or "WalkTheWeb" if no 3D Community is loaded */
	this.communityName = "Walk the Web";

	/* WTW.editCommunityAccess - used to determine if user has admin mode access to the currently loaded 3D Community (enables link to Admin Mode on the bottom menu) */
	this.editCommunityAccess = "";

	/* WTW.buildings - Array of 3D Building definitions loaded in a given 3D Scene */
	this.buildings = [];
	
	/* WTW.buildingMolds - Array of 3D Building Mold definitions loaded in a given 3D Scene */
	this.buildingMolds = [];
	
	/* WTW.buildingName - identifies the closest 3D Building within a 3D Community */
	this.buildingName = "";

	/* WTW.editBuildingAccess - used to determine if user has admin mode access to the currently loaded closest 3D Building (enables link to Admin Mode on the bottom menu) */
	this.editBuildingAccess = "";

	/* WTW.things - Array of 3D Thing definitions loaded in a given 3D Scene */
	this.things = [];
	
	/* WTW.thingMolds - Array of 3D Thing Mold definitions loaded in a given 3D Scene */
	this.thingMolds = [];
	
	/* WTW.connectingGrids - Array of Connecting Grid definitions loaded in a given 3D Scene - like pin points on the map to determine position, scaling, and rotation of 3D Communities, 3D Buildings, and 3D Things */
	this.connectingGrids = [];
	
	/* WTW.actionZones - Array of Action Zone definitions loaded in a given 3D Scene - areas that trigger actions or JavaScript functions as you 3D Browse */
	this.actionZones = [];
	
	/* WTW.spawnZones - Array of Spawn Zone definitions in a given 3D Scene - these are avatar entry points */
	this.spawnZones = [];

	/* WTW.automations - Array of Automation definitions loaded in a given 3D Scene - create stepped sequences of animations or actions */
	this.automations = [];
	
	/* WTW.moldEvents - Array of events with named animations applied to Molds (example onclick starts an animation) */
	this.moldEvents = [];
	
	/* WTW.baseMoldCount - rough count of molds currently loaded into the 3D Scene (assist with creating efficient 3D Scenes and placing Load Zones) */
	this.baseMoldCount = "";

	/* WTW.sun - the light object added to the scene */
	this.sun;

	/* WTW.sunPositionY - height of the sun - as you fly up, it can rise... (work in progress) */
	this.sunPositionY = 1000;

	/* WTW.backLight - the indirect light object added to the scene so that things are slightly lit on the back sides */
	this.backLight;

	/* WTW.extraGround - the plane that is the ground that extends off in the distance. */
	/* extra ground is designed to stay right under your avatar and the texture moves like a conveyer belt as you move. */
	/* which makes it a non-ending ground that will always be under your avatar */
	this.extraGround;
	
	/* WTW.water - the plane of water that is automatically added at zero Y value. */
	/* Only added IF the extended ground is set below zero. Otherwise, WTW.water remains null. */
	/* WTW.water is designed to stay right under your avatar as you move just like the extended ground. */
	this.water = null;
	
	/* WTW.waterMat - material added to the WTW.water, the global object makes it easier to add reflections and refractions of other molds to the water surface */
	this.waterMat = null;

	/* WTW.sky - sky sphere with the applied sky procedural texture */
	this.sky;

	/* WTW.shadows - Babylon Shadow Generator object for the 3D Scene - BABYLON.ShadowGenerator */
	this.shadows = null;

	/* WTW.init - values are used to supply the initial 3D scene properties */
	/* for admin of 3D Buildings and 3D Things these are the default settings */
	/* for 3D Communities they are most often passed from the Database through PHP loading */
	/*	Notes about the sky Values ---
			skyInclination = 0; //The sun position from Sunrise to Sunset. (-.60 to .60 increment .01) // range slider shows +.6 value	
			skyLuminance = 1; // Controls the overall brightness of sky. (0 to 1 increment .01)
			skyAzimuth = .25; // The horizontal angle of the sun position. (0 to .5 increment .01)
			skyRayleigh = 2.0; // Represents the global sky appearance. (0 to 5 increment .01)
			skyTurbidity = 10; // The amount of haze scattering in the atmosphere. (0 to 50 increment 1)
			skyMieDirectionalG = .8; // The amount of haze particles in the atmosphere. (.20 to .99 increment .01)
			skyMieCoefficient = .005; // The haze particle size coefficient. (.001 to .999 increment .001) */	
		/* gravity was 9.8, temporarily set to less for hill climbing */
	this.init = {
		'groundTextureID':'2391f1v9om09am77',
		'groundTexturePath':'/content/system/images/dirt-512x512.jpg',
		'skyTextureID':'',
		'skyTexturePath':'',
		'skyInclination':0,
		'skyLuminance':1,
		'skyAzimuth':.25,
		'skyRayleigh':.25,
		'skyTurbidity':10,
		'skyMieDirectionalG':.8,
		'skyMieCoefficient':.005,
		'groundPositionY':0,
		'waterPositionY':-1,
		'startPositionX':0,
		'startPositionY':10,
		'startPositionZ':0,
		'startScalingX':1,
		'startScalingY':1,
		'startScalingZ':1,
		'startRotationX':0,
		'startRotationY':0,
		'startRotationZ':0,
		'gravity':3.5,
		'loaded':0
	} 
	
	
/* camera related */
	
	/* WTW.canvasFocus - value for when mouse is over canvas or focused - avatar movement can only occur when the mouse is over the canvas (or mobile or touchscreen focus) */
	this.canvasFocus = 1;
	
	/* WTW.cameraFocus - sets camera focus point = 1 for MyAvatar, 0 for detached free camera, 2 reserved for mold focused */
	this.cameraFocus = 1;
	
	/* WTW.cameraYOffset - assist with camera relative positioning Y value to Avatar */
	this.cameraYOffset = 0;
	
	/* numerous camera instances depending on the current camera choice(s) from the menu */
	/* only the cameras in use are kept in active cameras */
	this.cameraOne = null;
	this.cameraTwo = null;

	/* sets the distance for WTW.cameraOne from the target - creates follow, scene, or selfie views */
	this.cameraDistance = -25;
	
	
	this.camera = null; /* First-Person Camera */
	this.cameraFollow = null; /* Follow Camera */
	this.cameraFollowTwo = null; /* Follow Camera */
	
	
/* avatar related */
	
	/* WTW.placeHolder - value is used to start the scene loading before the avatar is loaded to the scene - The Placeholder Avatar is deleted and replaced by the avatar after the avatar is visible in the 3D Scene. 
	1 = placeholder is loaded, 0 = avatar is loaded */
	this.placeHolder = 1;
	
	/* WTW.myAvatar - this is your avatar object parent (cube at the base of the avatar) */
	this.myAvatar = null; 
	
	/* WTW.editAvatar - this is the avatar object parent (cube at the base of the avatar) when you edit a 3D Avatar */
	this.editAvatar = null; 
	
	/* WTW.animationSet - appends a name to the animation name running to temporarily change the animation running on command */
	/* example: default onwait animation - if you set 
			WTW.animationSet = 'sit'; 
			the onwait is replaced by an animation called onwait-sit if it exists (fail back to the default onwait if it is missing) */
	this.animationSet = '';
	
	/* WTW.keysPressed - keys pressed Array of values that are translated into movement and animation */
	this.keysPressed = [];
	
	this.testTimer = null;
	

/* vehicle related */

	/* WTW.rideAlong - value set to show avatar is currently riding along with an alternate parent (may be depreciated soon) */
	this.rideAlong = null;
	
	/* WTW.drive - Work in progress - value set to drive vehicle */
	this.drive = null;


/* user settings */	

	/* WTW.walkSpeed - Avatar Related - value set by the menu to adjust the avatar walk speed movement */
	this.walkSpeed = 2;
	
	/* WTW.walkAnimationSpeed - Avatar Related - value set by the menu to adjust the avatar walk animation speed */
	this.walkAnimationSpeed = 2;
	
	/* WTW.turnSpeed - Avatar Related - value set by the menu to adjust the avatar turn speed movement */
	this.turnSpeed = 1;
	
	/* WTW.turnAnimationSpeed - Avatar Related - value set by the menu to adjust the avatar turn animation speed */
	this.turnAnimationSpeed = 1;
	
	/* WTW.shadowSet - default graphic quality setting for molds that will have shadows generated */
	this.shadowSet;

	/* WTW.graphicSet - default graphic quality setting for images and textures (can be overwritten by mold settings in admin mode) */
	this.graphicSet = 1;

	/* WTW.soundMute - global setting to turn off or on the sounds. (all sounds should use this global check before playing or setting volume) */
	this.soundMute = true;

	/* WTW.micMute - global setting to turn off or on the microphone. (all apps should use this global check before using mic) */
	this.micMute = true;
	
	/* WTW.audioContext - global microphone audio input stream. */
	this.audioSend = null;
	this.audioReceive = null;
	
	/* WTW.audioBuffers - receiving audio from multiplayer voice chat */
	this.audioBuffers = [];
	this.audioWorkletNodes = [];
	this.testAudio = null;
	
/* user input related events */
	
	/* WTW.touch - Array created by touches event (also captures handles multi-touch) */
	this.touch = null;
	
	/* WTW.touchLeftTimer - left side of the screen is tracked separate from right for movement types. This timer helps determine if it is a swipe or click */
	this.touchLeftTimer = null;
	
	/* WTW.touchRightTimer - right side of the screen is tracked separate from left for movement types. This timer helps determine if it is a swipe or click */
	this.touchRightTimer = null;
	
	/* WTW.scrollTimer - scroll wheel is used to move the avatar forward or backwards, this timer decides increments of movement and pace (walk vs run) */
	this.scrollTimer = null;
	
	/* WTW.shiftKey - tracks if the shift key is pressed - example: used to change from Walk to Run */
	this.shiftKey = false;
	
	/* WTW.mouseTimer - timer used to set repeated intervals on commands. Example: admin mode - moving molds by increments */
	this.mouseTimer = null;
	
	/* WTW.mouseX - current mouse horizontal position */
	this.mouseX = 0;

	/* WTW.mouseY - current mouse vertical position */
	this.mouseY = 0;
	
	/* WTW.isMouseDown - value to determine if mouse is held down, or touch is still going */
	this.isMouseDown = 0;

	/* WTW.mouseStartX - mouse horizontal position when mouse button was held down */
	this.mouseStartX = -1;

	/* WTW.mouseStartY - mouse vertical position when mouse button was held down */
	this.mouseStartY = -1;

	/* WTW.mouseMoveX - mouse horizontal position after mouse button was held down, used to measure change in movement from mouseStartX */
	this.mouseMoveX = -1;

	/* WTW.mouseMoveY - mouse vertical position after mouse button was held down, used to measure change in movement from mouseStartY */
	this.mouseMoveY = -1;

	/* WTW.mouseOver - sets the mouse over function tied to molds in the 3D Scene (Example: can result in hover-overs) */
	this.mouseOver = null;

	/* WTW.mouseOut - sets the mouse out function tied to molds in the 3D Scene (Example: can result in hover-overs ended to reset mold) */
	this.mouseOut = null;

	/* WTW.dragID - id of the mold that is currently being dragged. Example includes scroll bar being dragged on 3D Blog box. */
	this.dragID = "";
	
	/* WTW.pick - changes the mode to pick a mold in the scene. Example: select a mold as part of a door to be added in a swinging door.. */
	this.pick = 0;
	
	/* WTW.currentID - currently hovered mold name */
	this.currentID = "";

	/* WTW.lastID - last hovered mold name */
	this.lastID = "";
	
	/* WTW.selectedMoldName - currently selected mold used for interacting with it (example: select fill in the blank - adds text to mold). */
	this.selectedMoldName = "";
	
	/* WTW.textTimer - used to create a blinking cursor in the fill in the blank for editing the Selected Mold (above) */
	this.textTimer = null;

	/* temp global variables used to sync 2 animations in the demo scene (depreciated and will be removed soon) */
	this.temp1 = null;
	this.temp2 = null;
}

var WTW = new WTWJS();

/* All code is Copyright 2013-2019 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

var scene;
var engine;
var canvas;

function WTWJS() {
	this.adminMenu = 1;
	this.enablePhysics = 1;
	this.canvasFocus = 1;
	this.cameraFocus = 1; /* 1 for MyAvatar, 0 for detached, 2 reserved for mesh focused */
	this.setupMode = 1;
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
		'startPositionY':0,
		'startPositionZ':0,
		'startScalingX':1,
		'startScalingY':1,
		'startScalingZ':1,
		'startRotationX':0,
		'startRotationY':0,
		'startRotationZ':0,
		'gravity':9.8,
		'wallCollisions':1,
		'floorCollisions':1,
		'loaded':0
	}
/*	Notes about the sky Values ---
		skyInclination = 0; //The sun position from Sunrise to Sunset. (-.60 to .60 increment .01) // range slider shows +.6 value	
		skyLuminance = 1; // Controls the overall brightness of sky. (0 to 1 increment .01)
		skyAzimuth = .25; // The horizontal angle of the sun position. (0 to .5 increment .01)
		skyRayleigh = 2.0; // Represents the global sky appearance. (0 to 5 increment .01)
		skyTurbidity = 10; // The amount of haze scattering in the atmosphere. (0 to 50 increment 1)
		skyMieDirectionalG = .8; // The amount of haze particles in the atmosphere. (.20 to .99 increment .01)
		skyMieCoefficient = .005; // The haze particle size coefficient. (.001 to .999 increment .001)
*/	
	this.loadQueue = [];
	this.loadMoldQueue = [];
	this.analyticsQueue = [];
	this.things = [];
	this.buildings = [];
	this.communities = [];
	this.thingMolds = [];
	this.buildingMolds = [];
	this.communitiesMolds = [];
	this.connectingGrids = [];
	this.actionZones = [];
	this.automations = [];
	this.products = [];
	this.moldList = [];
	this.keysPressed = [];
	this.moldEvents = [];
	this.lastMoveEvents = [];
	this.refreshLastMoveEvents = true;
	this.rideAlong = null;
	this.drive = null;
	this.touch = null;
	this.touchLeftTimer = null;
	this.touchRightTimer = null;
	this.cameraYOffset = 0;
	this.myAvatar = null; 
	this.scrollTimer = null;
	this.shiftKey = false;
	this.mainParent = "";
	this.uicanvas;
	this.highlightLayer = null;
	this.context;
	this.ctx;
	this.sun;
	this.sunlight;
	this.extraGround;
	this.water = null;
	this.waterMat = null;
	this.camera = null; /* First-Person Camera */
	this.cameraClone = null;
	this.cameraFollow = null; /* Follow Camera */
	this.cameraFollowTwo = null; /* Follow Camera */
	this.cameraArc = null; /* Arc Rotation Camera */
	this.cameraAnaglyph = null; /* Red/Cyan 3D Glasses */
	this.cameraVR = null; /* VR Camera */
	this.cameraVRGamepad = null; /* VR Camera with gamepad controls */
	this.cameraWebVR = null; /* Web VR Camera */
	this.guiAdminColors = null;
	this.isMobile = false;
	this.gpuSetting;
	this.sky;
	this.shadows = null;
	this.isInitCycle = 1;
	this.moveTimer = null;
	this.mouseTimer = null;
	this.activityTimer = null;
	this.jumpTimer = null;
	this.showFPS = 0;
	this.sizeX = 1024;
	this.sizeY = 768;
	this.mouseX = 0;
	this.mouseY = 0;
	this.mouseMoveX = -1;
	this.mouseMoveY = -1;
	this.mouseStartX = -1;
	this.mouseStartY = -1;
	this.mouseOver = null;
	this.mouseOut = null;
	this.isMouseDown = 0;
	this.dragID = "";
	this.pick = 0;
	this.currentID = "";
	this.lastID = "";
	this.selectedMoldName = "";
	this.buildingName = "";
	this.communityName = "Walk the Web";
	this.sunPositionX = -20;
	this.sunPositionY = 1000;
	this.sunPositionZ = -10;
	this.rotationSpeed = 1000;
	this.walkSpeed = .5;
	this.shadowset;
	this.graphicSet = 1;
	this.soundMute = true;
	this.holdPosition = "";
	this.pause = 1;
	this.baseMoldCount = "";
	this.checkLoadQueue = 0;
	this.checkShownMolds = 0;
	this.closestAngle = null;
	this.closestDistance = null;
	this.loadedJSFiles = "";
	this.animationRatio = 0;
	this.fps = 30;
	this.framei = 0;
	this.adminView = 0;
	this.browseCommunityID = "";
	this.browseWebID = "";
	this.browseUserID = "";
	this.editCommunityAccess = "";
	this.editBuildingAccess = "";
}

var WTW = new WTWJS();

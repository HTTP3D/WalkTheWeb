/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions create a default object for each main type of object used in WalkTheWeb */


/* 3D Scene and Molds Related Objects */ 

WTWJS.prototype.newConnectingGrid = function() {
	/* create an instance for a Connecting Grid - defined the position, scaling, and rotation of a web item in another web item. */
	/* Example: placement of a 3D Building in a 3D Community Scene */
	var zconnectinggrid = '';
	try {
		zconnectinggrid = {
			'communityinfo':
			{
				'communityid':'',
				'communityname':'',
				'snapshotid':'',
				'analyticsid':'',
				'access':''
			},
			'buildinginfo':
			{
			    'buildingid': '',
			    'buildingname': '',
				'snapshotid':'',
				'analyticsid':'',
				'access':''
			},
			'thinginfo':
			{
			    'thingid': '',
			    'thingname': '',
				'snapshotid':'',
				'analyticsid':'',
				'access':''
			},
			'position':
			{
				'x':'0.00',
				'y':'0.00',
				'z':'0.00'
			},
			'scaling':
			{
				'x':'1.00',
				'y':'1.00',
				'z':'1.00'
			},
			'rotation':
			{
				'x':'0.00',
				'y':'0.00',
				'z':'0.00'
			},
			'alttag':
			{
				'name':''
			},
			'connectinggridid':'',
			'connectinggridind':'-1',
			'parentconnectinggridid':'', 
			'parentconnectinggridind':'-1',
			'loadlevel':'1',
			'parentwebid':'', 
			'parentwebtype':'', 
			'childwebid':'', 
			'childwebtype':'', 
			'loadactionzoneid':'', 
			'loadactionzoneind':'', 
			'altloadactionzoneid':'', 
			'altloadactionzoneind':'', 
			'unloadactionzoneid':'', 
			'unloadactionzoneind':'', 
			'attachactionzoneid':'', 
			'attachactionzoneind':'',
			'shape':'box',
			'ispickable':'0',
			'checkcollisions':'0',
			'moldname':'',
			'parentname':'',
			'shown':'0'
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newConnectingGrid=" + ex.message);
	}
	return zconnectinggrid;
}

WTWJS.prototype.newActionZone = function() {
	/* create an instance for an Action Zone */
	/* Action Zones provide a trigger in the 3D Scene to execute an action of usually animation or JavaScript function */
	var zactionzone = '';
	try {
		zactionzone = {
			'communityinfo':
			{
				'communityid':'',
				'communityind':'-1',
				'analyticsid':''
			},
			'buildinginfo':
			{
				'buildingid':'',
				'buildingind':'-1',
				'analyticsid':''
			},
			'thinginfo':
			{
				'thingid':'',
				'thingind':'-1',
				'analyticsid':''
			},
			'position':
			{
				'x':'0.00',
				'y':'0.00',
				'z':'0.00'
			},
			'scaling':
			{
				'x':'1.00',
				'y':'1.00',
				'z':'1.00'
			},
			'rotation':
			{
				'x':'0.00',
				'y':'0.00',
				'z':'0.00'
			},
			'axis': {
				'position':
				{
					'x':'0.00',
					'y':'0.00',
					'z':'0.00'
				},
				'scaling':
				{
					'x':'1.00',
					'y':'1.00',
					'z':'1.00'
				},
				'rotation':
				{
					'x':'0.00',
					'y':'0.00',
					'z':'0.00'
				},
				'rotateaxis':'y',
				'rotatedegrees':'90',
				'rotatedirection':'1'
			},
			'actionzoneid':'',
			'actionzoneind':'-1',
			'actionzonename':'',
			'actionzonetype':'',
			'actionzoneshape':'box',
			'attachmoldid':'',
			'parentactionzoneid':'',
			'movementtype':'',
			'rotatespeed':'1.00',
			'movementdistance':'',
			'loadactionzoneid':'',
			'inloadactionzone':'0',
			'altloadactionzoneid':'', 
			'altloadactionzoneind':'', 
			'connectinggridid':'',
			'connectinggridind':'',
			'avataranimations':null,
			'jsfunction':'',
			'jsparameters':'',
			'scripts':[],
			'shown':'0',
			'status':'0',
			'parentname':''
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newActionZone=" + ex.message);
	}
	return zactionzone;
}

WTWJS.prototype.newMold = function() {
	/* create an instance for a Mold */
	/* molds are definitions for meshes to be loaded or unloaded in the 3D Scene */
	var zmolddef = '';
	var zpath1 = [];
	var zpath2 = [];
	var zwebimages = [];
	try {
		zwebimages[0] = WTW.newWebImage();
		zmolddef = {
			'communityinfo':
			{
				'communityid':'',
				'communityind':'-1',
				'analyticsid':''
			},
			'buildinginfo':
			{
				'buildingid':'',
				'buildingind':'-1',
				'analyticsid':''
			},
			'thinginfo':
			{
				'thingid':'',
				'thingind':'-1',
				'analyticsid':''
			},
			'position':
			{
				'x':'0.00',
				'y':'0.00',
				'z':'0.00',
				'scroll':'0'
			},
			'scaling':
			{
				'x':'1.00',
				'y':'1.00',
				'z':'1.00',
				'special1':'0.00',
				'special2':'0.00'
			},
			'rotation':
			{
				'x':'0.00',
				'y':'0.00',
				'z':'0.00',
				'billboard':'0'
			},
			'csg':
			{
				'moldid':'',
				'moldind':'-1',
				'action':'subtract',
				'count':'0'
			},
			'object':
			{
				'uploadobjectid':'',
				'folder':'',
				'file':'',
				'objectanimations':null
			},
			'graphics':
			{
				'texture':
				{
					'id':'',
					'path':'',
					'bumpid':'',
					'bumppath':'',
					'videoid':'',
					'video':'',
					'videoposterid':'',
					'videoposter':'',
					'backupid':'',
					'backuppath':'',
					'loaded':'0'
				},
				'heightmap':
				{
					'original':'',
					'id':'',
					'path':'',
					'minheight':'0.00',
					'maxheight':'0.00',
					'backupid':'',
					'mixmapid':'',
					'mixmappath':'',
					'texturerid':'',
					'texturerpath':'',
					'texturegid':'',
					'texturegpath':'',
					'texturebid':'',
					'texturebpath':'',
					'texturebumprid':'',
					'texturebumprpath':'',
					'texturebumpgid':'',
					'texturebumpgpath':'',
					'texturebumpbid':'',
					'texturebumpbpath':''
				},
				'uoffset':'0.00',
				'voffset':'0.00',
				'uscale':'0.00',
				'vscale':'0.00',
				'level':'0',
				'receiveshadows':'0',
				'waterreflection':'0',
				'webimageind':'0',
				'webimages':zwebimages
			},
			'webtext':{
				'webtext':'',
				'fullheight':'0',
				'scrollpos':'0',
				'webstyle':''
			},
			'color':
			{
				'diffusecolor':'#ffffff',
				'emissivecolor':'#000000',
				'specularcolor':'#686868',
				'ambientcolor':'#575757'
			},
			'paths':
			{
				'path1':zpath1,
				'path2':zpath2
			},
			'alttag':
			{
				'name':''
			},
			'sound':
			{
				'id':'',
				'path':'',
				'name':'',
				'attenuation':'',
				'loop':'1',
				'maxdistance':'100',
				'rollofffactor':'1',
				'refdistance':'1',
				'coneinnerangle':'90',
				'coneouterangle':'180',
				'coneoutergain':'.5',
				'sound':''
			},
			'objects':
			{
				'light':'',
				'shadows':''
			},
			'moldid':'',
			'moldind':'-1',
			'shape':'box',
			'covering':'texture',
			'subdivisions':'',
			'subdivisionsshown':'0',
			'shown':'0',
			'opacity':'100',
			'checkcollisions':'1',
			'ispickable':'',
			'jsfunction':'',
			'jsparameters':'',
			'actionzoneid':'',
			'actionzoneind':'-1',
			'parentactionzoneind':'-1',
			'loadactionzoneid':'',
			'loadactionzoneind':'-1',
			'inloadactionzone':'0',
			'altconnectinggridid':'',
			'altconnectinggridind':'-1',
			'connectinggridid':'',
			'connectinggridind':'-1',
			'attachmoldind':'-1',
			'parentname':'',
			'moldname':''
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newmold=" + ex.message);
	}
	return zmolddef;
}

WTWJS.prototype.newPathPoint = function() {
	/* create an instance for a Path Point */
	/* points are used for Tubes, Lines, and other molds that use a series of points as part of their use */
	var zpathpoint = '';
	try {
		var zpathpoint = {
			'x':'0',
			'y':'0',
			'z':'0',
			'sorder':'0'
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newPathPoint=" + ex.message);
	}
	return zpathpoint;
}

WTWJS.prototype.newMoldEvent = function() {
	/* create an instance for the mold event (animation tied to a mold) */
	var zmoldevent = '';
	try {
		zmoldevent = {
			'animationevent':'',
			'moldevent':'onclick',
			'moldname':'',
			'mold':null,
			'moldfunction':'',
			'parameters':'',
			'startframe':'1',
			'endframe':'10',
			'animationloop':false,
			'speedratio':'1.00',
			'animationendscript':'',
			'animationendparameters':'',
			'stopcurrentanimations':false,
			'additionalscript':'',
			'additionalparameters':'',
			'soundid':'',
			'soundpath':'',
			'soundmaxdistance':'100.00',
			'sound':'',
			'stage':'0',
			'loaded':false
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newMoldEvent=" + ex.message);
	}
	return zmoldevent;
}

WTWJS.prototype.newWebImage = function() {
	var zwebimage = '';
	try {
		var zwebimage = {
			'imageid':'',
			'imagepath':'',
			'imagehoverid':'',
			'imagehoverpath':'',
			'imageclickid':'',
			'imageclickpath':'',
			'jsfunction':'',
			'jsparameters':'',
			'imageloaded':'0',
			'hoverloaded':'0',
			'clickloaded':'0'
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newWebImage=" + ex.message);
	}
	return zwebimage;
}

WTWJS.prototype.newHTMLSegment = function() {
	/* create an instance for HTML segments of text to be converted into 3D Elements in the 3D Scene */
	var zhtmlsegment = '';
	try {
		zhtmlsegment = {
			'tagname':'',
			'src':'',
			'style':
			{
				'color':'black',
				'float':'left',
				'textalign':'left',
				'display':'block',
				'width:':'100%',
				'height:':'100%',
				'size':'2px',
				'lineheight':'30px',
				'fontsize':'20px',
				'borderwidth':'0px',
				'bordercolor':'transparent',
				'maxwidth':'100%',
				'marginleft':'0px',
				'marginright':'0px',
				'margintop':'0px',
				'marginbottom':'0px'
			},
			'system': 
			{
				'indent':'0',
				'x':'0',
				'y':'0',
				'width':'0',
				'height':'0',
				'maxwidth':'0',
				'maxheight':'0',
				'float':'',
				'floatwidth':'0',
				'floatheight':'0'
			}
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newHTMLSegment=" + ex.message);
	}
	return zhtmlsegment;
}

WTWJS.prototype.newUpload = function() {
	/* create an instance for an Uploaded File (depreciated - used for database stored files) */
	var zupload = '';
	try {
		zupload = {
			'uploadinfo':
			{
				'title':'',
				'name':'',
				'extension':'',
				'type':'',
				'size':'',
				'width':'',
				'height':''
			},
			'id':'',
			'uploadid':'',
			'originalid':'',
			'websizeid':'',
			'thumbnailid':'',
			'filepath':'',
			'data':'',
			'userid':'',
			'queue':'0'
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newUpload=" + ex.message);
	}
	return zupload;
}

WTWJS.prototype.newObjectAnimation = function() {
	/* create an instance for the Object Animation (Animation defined for 3D Models like Babylon Files) */
	var zobjectanimation = '';
	try {
		zobjectanimation = {
			'objectanimationid':'',
			'objectfolder':'',
			'objectfile':'',
			'animationname':'MyOnclick',
			'moldevent':'onclick',
			'moldnamepart':null,
			'startframe':'1',
			'endframe':'10',
			'animationloop':false,
			'speedratio':'1.00',
			'additionalscript':'',
			'additionalparameters':'',
			'animationendscript':null,
			'animationendparameters':'',
			'stopcurrentanimations':false,
			'soundid':'',
			'soundpath':'',
			'soundmaxdistance':'100.00'
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newObjectAnimation=" + ex.message);
	}
	return zobjectanimation;
}

WTWJS.prototype.newOffset = function() {
	/* offset is a position, rotation, and scaling offset used for parenting objects */
	/* example: align a 3D Object in an avatar hand when it is picked up */
	zoffset = null;
	try {
		zoffset = {
			'position': {
				'x':0,
				'y':0,
				'z':0
			},
			'scaling': {
				'x':1,
				'y':1,
				'z':1
			},
			'rotation': {
				'x':0,
				'y':0,
				'z':0
			}
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newOffset=" + ex.message);
	}
	return zoffset;
}


/* Queue Events or loading to be processed */ 

WTWJS.prototype.newMoldQueue = function() {
	/* create an instance for the mold Queue */
	/* mold queue is used to spread mold creation over frames more evenly for smoother animation */
	var zmoldqueue = '';
	try {
		zmoldqueue = {
			'moldname':'',
			'queprocess':'add',
			'actionzoneind':'-1',
			'actionzoneid':'',
			'formind':'-1',
			'connectinggridind':'-1',
			'check':true,
			'molddef':WTW.newMold(),
			'parentname':WTW.mainParent.name,
			'coveringname':'texture',
			'csgmolddef':null,
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newMoldQueue=" + ex.message);
	}
	return zmoldqueue;
}

WTWJS.prototype.newAnalyticsQueue = function() {
	/* create an instance for the analytics Queue */
	/* each instance will result in a page view for Analytics */
	var zanalyticsqueue = '';
	try {
		zanalyticsqueue = {
			'actionzoneind':'-1',
			'distancename':'',
			'connectinggridind':'-1',
			'formind':'-1'
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newAnalyticsQueue=" + ex.message);
	}
	return zanalyticsqueue;
}


/* Avatar Related Objects */ 

WTWJS.prototype.newAvatarDef = function() {
	/* create an instance for an Avatar definition */
	var zavatardef = '';
	var zavatarparts = [];
	var zanimations = [];
	var zavataranimationdefs = [];
	try {
		zavatardef = {
			'position':
			{
				'x':WTW.init.startPositionX,
				'y':WTW.init.startPositionY,
				'z':WTW.init.startPositionZ
			},
			'lastposition':
			{
				'x':'0.00',
				'y':'0.00',
				'z':'0.00'
			},
			'scaling':
			{
				'x':'1.00',
				'y':'1.00',
				'z':'1.00'
			},
			'lastscaling':
			{
				'x':'1.00',
				'y':'1.00',
				'z':'1.00'
			},
			'rotation':
			{
				'x':'0.00',
				'y':WTW.init.startRotationY,
				'z':'0.00'
			},
			'lastrotation':
			{
				'x':'0.00',
				'y':'0.00',
				'z':'0.00'
			},
			'graphics':
			{
				'waterreflection':'1',
				'receiveshadows':'0'
			},
			'object':
			{
				'useravatarid':'',
				'uploadobjectid':'',
				'folder':'/content/system/avatars/male/',
				'file':'maleidle.babylon',
				'walkspeed':'.5',
				'objectanimations':null,
				'easingfunction':null,
				'animationind':-1,
				'frametotal':0,
				'lastframecount':0
				
			},
			'avatarparts': zavatarparts,
			'avataranimationdefs': zavataranimationdefs,
			'animations': zanimations,
			'name':'',
			'globaluseravatarid':'',
			'useravatarid':'',
			'globalavatarid':'',
			'avatarid':'',
			'trackid':'',
			'instanceid':'',
			'userid':'',
			'anonymous':'1',
			'avatar':'default',
			'displayname':'',
			'privacy':'0',
			'enteranimation':'1',
			'enteranimationparameter':'',
			'exitanimation':'1',
			'exitanimationparameter':'',
			'walkspeed':'1',
			'walkanimationspeed':'1',
			'turnspeed':'1',
			'turnanimationspeed':'1',
			'shown':'0',
			'opacity':'1',
			'checkcollisions':'0',
			'ispickable':'1',
			'parentname':WTW.mainParent,
			'movetime':'',
			'moveevents':'',
			'updated':'',
			'lastupdate':false,
			'loaded':false
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newAvatarDef=" + ex.message);
	}
	return zavatardef;
}

WTWJS.prototype.newAvatarAnimationDef = function() {
	/* create an instance for an Avatar Animation Definition */
	var zanimationdef = '';
	try {
		zanimationdef = {
			'animationind':-1,
			'useravataranimationid':'',
			'avataranimationid':'',
			'animationevent':'onoption',
			'animationfriendlyname':'',
			'loadpriority':0,
			'animationicon':'',
			'objectfolder':'',
			'objectfile':'',
			'startframe':'1',
			'endframe':'100',
			'animationloop':true,
			'defaultspeedratio':'1.00',
			'startweight':'0',
			'speedratio':'1.00',
			'onanimationend':null,
			'walkspeed':'1',
			'totalframes':'0',
			'totalstartframe':'0',
			'totalendframe':'0'
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newAvatarAnimationDef=" + ex.message);
	}
	return zanimationdef;
}

WTWJS.prototype.newAvatarAnimationDefs = function() {
	/* create an instance of an Array of default Avatar Animations that includes all of the basic functionality */
	var zanimationdefs = [];
	try {
		zanimationdefs[0] = {
			'useravataranimationid':'',
			'avataranimationid':'r9087b004i9ptv0e',
			'animationevent':'onwait',
			'animationfriendlyname':'',
			'loadpriority':0,
			'animationicon':'',
			'objectfolder':'/content/system/avatars/male/',
			'objectfile':'maleidle.babylon',
			'startframe':'1',
			'endframe':'213',
			'animationloop':true,
			'defaultspeedratio':'1.00',
			'speedratio':'1.00',
			'walkspeed':'1',
			'totalframes':'0',
			'totalstartframe':'0',
			'totalendframe':'0'
		};
		zanimationdefs[1] = {
			'useravataranimationid':'',
			'avataranimationid':'b03ftsjbxr0sxam8',
			'animationevent':'onwalk',
			'animationfriendlyname':'',
			'loadpriority':0,
			'animationicon':'',
			'objectfolder':'/content/system/avatars/male/',
			'objectfile':'malewalk.babylon',
			'startframe':'1',
			'endframe':'26',
			'animationloop':true,
			'defaultspeedratio':'1.00',
			'speedratio':'1.00',
			'walkspeed':'1',
			'totalframes':'0',
			'totalstartframe':'0',
			'totalendframe':'0'
		};
		zanimationdefs[2] = {
			'useravataranimationid':'',
			'avataranimationid':'0ikarv3xbs0n7544',
			'animationevent':'onwalkbackwards',
			'animationfriendlyname':'',
			'loadpriority':0,
			'animationicon':'',
			'objectfolder':'/content/system/avatars/male/',
			'objectfile':'malewalkback.babylon',
			'startframe':'1',
			'endframe':'29',
			'animationloop':true,
			'defaultspeedratio':'1.00',
			'speedratio':'1.00',
			'walkspeed':'1',
			'totalframes':'0',
			'totalstartframe':'0',
			'totalendframe':'0'
		};
		zanimationdefs[3] = {
			'useravataranimationid':'',
			'avataranimationid':'9xworrh44cbkwq1y',
			'animationevent':'onturnleft',
			'animationfriendlyname':'',
			'loadpriority':0,
			'animationicon':'',
			'objectfolder':'/content/system/avatars/male/',
			'objectfile':'maleturnleft.babylon',
			'startframe':'1',
			'endframe':'29',
			'animationloop':true,
			'defaultspeedratio':'1.00',
			'speedratio':'1.00',
			'walkspeed':'1',
			'totalframes':'0',
			'totalstartframe':'0',
			'totalendframe':'0'
		};
		zanimationdefs[4] = {
			'useravataranimationid':'',
			'avataranimationid':'mbpjld4fttowgnt6',
			'animationevent':'onturnright',
			'animationfriendlyname':'',
			'loadpriority':0,
			'animationicon':'',
			'objectfolder':'/content/system/avatars/male/',
			'objectfile':'maleturnright.babylon',
			'startframe':'1',
			'endframe':'29',
			'animationloop':true,
			'defaultspeedratio':'1.00',
			'speedratio':'1.00',
			'walkspeed':'1',
			'totalframes':'0',
			'totalstartframe':'0',
			'totalendframe':'0'
		};
		zanimationdefs[5] = {
			'useravataranimationid':'',
			'avataranimationid':'hur9z71kpv6b2bgb',
			'animationevent':'onstrafeleft',
			'animationfriendlyname':'',
			'loadpriority':0,
			'animationicon':'',
			'objectfolder':'/content/system/avatars/male/',
			'objectfile':'malestrafeleft.babylon',
			'startframe':'1',
			'endframe':'45',
			'animationloop':true,
			'defaultspeedratio':'1.00',
			'speedratio':'1.00',
			'walkspeed':'1',
			'totalframes':'0',
			'totalstartframe':'0',
			'totalendframe':'0'
		};
		zanimationdefs[6] = {
			'useravataranimationid':'',
			'avataranimationid':'6x3o6sh2u1m1bjnq',
			'animationevent':'onstraferight',
			'animationfriendlyname':'',
			'loadpriority':0,
			'animationicon':'',
			'objectfolder':'/content/system/avatars/male/',
			'objectfile':'malestraferight.babylon',
			'startframe':'1',
			'endframe':'45',
			'animationloop':true,
			'defaultspeedratio':'1.00',
			'speedratio':'1.00',
			'walkspeed':'1',
			'totalframes':'0',
			'totalstartframe':'0',
			'totalendframe':'0'
		};
		zanimationdefs[7] = {
			'useravataranimationid':'',
			'avataranimationid':'mz182mwpsvx1f1va',
			'animationevent':'onrun',
			'animationfriendlyname':'',
			'loadpriority':0,
			'animationicon':'',
			'objectfolder':'/content/system/avatars/male/',
			'objectfile':'malerun.babylon',
			'startframe':'1',
			'endframe':'16',
			'animationloop':true,
			'defaultspeedratio':'1.00',
			'speedratio':'1.00',
			'walkspeed':'1',
			'totalframes':'0',
			'totalstartframe':'0',
			'totalendframe':'0'
		};
		zanimationdefs[8] = {
			'useravataranimationid':'',
			'avataranimationid':'rzn9d3dihtq4h2v5',
			'animationevent':'onrunbackwards',
			'animationfriendlyname':'',
			'loadpriority':0,
			'animationicon':'',
			'objectfolder':'/content/system/avatars/male/',
			'objectfile':'malewalkback.babylon',
			'startframe':'1',
			'endframe':'29',
			'animationloop':true,
			'defaultspeedratio':'2.00',
			'speedratio':'2.00',
			'walkspeed':'1',
			'totalframes':'0',
			'totalstartframe':'0',
			'totalendframe':'0'
		};
		zanimationdefs[9] = {
			'useravataranimationid':'',
			'avataranimationid':'45dh9tcbikbvhqa9',
			'animationevent':'onrunturnleft',
			'animationfriendlyname':'',
			'loadpriority':0,
			'animationicon':'',
			'objectfolder':'/content/system/avatars/male/',
			'objectfile':'maleturnleft.babylon',
			'startframe':'1',
			'endframe':'29',
			'animationloop':true,
			'defaultspeedratio':'2.00',
			'speedratio':'2.00',
			'walkspeed':'1',
			'totalframes':'0',
			'totalstartframe':'0',
			'totalendframe':'0'
		};
		zanimationdefs[10] = {
			'useravataranimationid':'',
			'avataranimationid':'gi7iwy1cobjpzqpf',
			'animationevent':'onrunturnright',
			'animationfriendlyname':'',
			'loadpriority':0,
			'animationicon':'',
			'objectfolder':'/content/system/avatars/male/',
			'objectfile':'maleturnright.babylon',
			'startframe':'1',
			'endframe':'29',
			'animationloop':true,
			'defaultspeedratio':'2.00',
			'speedratio':'2.00',
			'walkspeed':'1',
			'totalframes':'0',
			'totalstartframe':'0',
			'totalendframe':'0'
		};
		zanimationdefs[11] = {
			'useravataranimationid':'',
			'avataranimationid':'xd3eqg21webe0wff',
			'animationevent':'onrunstrafeleft',
			'animationfriendlyname':'',
			'loadpriority':0,
			'animationicon':'',
			'objectfolder':'/content/system/avatars/male/',
			'objectfile':'malestrafeleft.babylon',
			'startframe':'1',
			'endframe':'45',
			'animationloop':true,
			'defaultspeedratio':'2.00',
			'speedratio':'2.00',
			'walkspeed':'1',
			'totalframes':'0',
			'totalstartframe':'0',
			'totalendframe':'0'
		};
		zanimationdefs[12] = {
			'useravataranimationid':'',
			'avataranimationid':'w547k8hrbbn89k4v',
			'animationevent':'onrunstraferight',
			'animationfriendlyname':'',
			'loadpriority':0,
			'animationicon':'',
			'objectfolder':'/content/system/avatars/male/',
			'objectfile':'malestraferight.babylon',
			'startframe':'1',
			'endframe':'45',
			'animationloop':true,
			'defaultspeedratio':'2.00',
			'speedratio':'2.00',
			'walkspeed':'1',
			'totalframes':'0',
			'totalstartframe':'0',
			'totalendframe':'0'
		};
		zanimationdefs[13] = {
			'useravataranimationid':'',
			'avataranimationid':'i547k8hrtbn89k4s',
			'animationevent':'onjump',
			'animationfriendlyname':'',
			'loadpriority':0,
			'animationicon':'',
			'objectfolder':'/content/system/animations/movement/',
			'objectfile':'standjump.babylon',
			'startframe':'1',
			'endframe':'78',
			'animationloop':true,
			'defaultspeedratio':'1.00',
			'speedratio':'1.00',
			'walkspeed':'1',
			'totalframes':'0',
			'totalstartframe':'0',
			'totalendframe':'0'
		};
		zanimationdefs[14] = {
			'useravataranimationid':'',
			'avataranimationid':'j548k8hrtbs89k4t',
			'animationevent':'onwalkjump',
			'animationfriendlyname':'',
			'loadpriority':0,
			'animationicon':'',
			'objectfolder':'/content/system/animations/movement/',
			'objectfile':'runjump.babylon',
			'startframe':'1',
			'endframe':'25',
			'animationloop':true,
			'defaultspeedratio':'1.00',
			'speedratio':'1.00',
			'walkspeed':'1',
			'totalframes':'0',
			'totalstartframe':'0',
			'totalendframe':'0'
		};
		zanimationdefs[15] = {
			'useravataranimationid':'',
			'avataranimationid':'h748k8hqtbs87k4r',
			'animationevent':'onrunjump',
			'animationfriendlyname':'',
			'loadpriority':0,
			'animationicon':'',
			'objectfolder':'/content/system/animations/movement/',
			'objectfile':'runjump.babylon',
			'startframe':'1',
			'endframe':'25',
			'animationloop':true,
			'defaultspeedratio':'1.00',
			'speedratio':'1.00',
			'walkspeed':'1',
			'totalframes':'0',
			'totalstartframe':'0',
			'totalendframe':'0'
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newAvatarAnimationsMale=" + ex.message);
	}
	return zanimationdefs;
}


/* Automation Related Objects */ 

WTWJS.prototype.newAutomation = function() {
	/* create an instance for an Automation Step */
	/* automations are sequences of events. */
	/* Example: open a door, pause an amount of time, then close a door automatically */
	try {
		automation = {
			'communityinfo':
			{
				'communityid':''
			},
			'buildinginfo':
			{
			    'buildingid': ''
			},
			'thinginfo':
			{
			    'thingid': ''
			},
			'step':
			{
				'automationstepid':'',
				'automationstepind':'-1',
				'step':'',
				'automationtype':'',
				'actionzoneid':'',
				'actionzoneind':'-1',
				'actionzonestatus':'',
				'conditionoperator':'',
				'conditionstatus':'',
				'conditionvalue':'',
				'jsfunction':'',
				'jsparameter':'',
				'timer':''
			},
			'automationid':'',
			'automationind':'-1',
			'loadactionzoneid':'',
			'connectinggridid':'',
			'connectinggridind':'',
			'automationname':'',
			'running':'0',
			'jsfunction':'',
			'jsparameter':''
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newAutomation=" + ex.message);
	}
	return automation;
}


/* Vehicle Related Objects */ 

WTWJS.prototype.newDriveVehicle = function() {
	/* work in progress - create an instance for avatar driving a vehicle */
	var zdrive = '';
	try {
		/* 	vehicle = boat, (eventually will also include car, plane, rocket, hovercraft, etc...)
				This will define the type of movement applied (boat will lean and flow into the turns, stop slower, etc...)
			connectinggridname = connecting grid for the vehicle (usually 3D Thing's connecting grid parent)
			connectinggridid = id of the connecting grid (for the 3D Thing)
			connectinggridind = index (instance) of the connecting grid (for the 3D Thing)
			currentturn = rotation in degrees
			currentspeed = current speed of the moving vehicle
			currentdirection = forward (1), neutral (0), or backwards (-1)
			avatarsriding = array of avatar names to include with the ride along as the vehicle moves
			
			*position and rotation can be read from connecting grid
		*/
		zdrive = {
			'vehicle':null,
			'vehicletype':'boat',
			'connectinggridname':'',
			'instanceid':'',
			'applyturn':0,
			'currentturn':0,
			'applyspeed':0,
			'currentspeed':0,
			'currentdirection':0,
			'autoturn': null,
			'autospeed': null
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newDriveVehicle=" + ex.message);
	}
	return zdrive;
}

WTWJS.prototype.newRideAlong = function() {
	/* work in progress - create an instance for the Ride Along (avatar riding on a vehicle) */
	var zridealong = '';
	try {
		zridealong = {
			'ridealongmoldname':'',
			'attachmoldid':'',
			'attachmoldname':'',
			'rotatemoldname':'',
			'position':
			{
				'x':'',
				'y':'',
				'z':''
			},
			'rotation':
			{
				'x':'0.00',
				'y':'0.00',
				'z':'0.00'
			}
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newRideAlong=" + ex.message);
	}
	return zridealong;
}



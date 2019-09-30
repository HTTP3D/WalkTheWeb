WTWJS.prototype.newProduct = function() {
	var product = '';
	try {
		product = {
			'storeurl':'',
			'wpplugin':'',
			'connectinggridind':'-1',
			'connectinggridid':'',
			'search':'',
			'productid':'',
			'name':'',
			'slug':'',
			'price':'',
			'categoryid':'',
			'description':'',
			'shortdescription':'',
			'imageid':'',
			'imageurl':'',
			'fetching':'0'
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newProduct=" + ex.message);
	}
	return product;
}

WTWJS.prototype.newAnalyticsQueue = function() {
	var analyticsqueue = '';
	try {
		analyticsqueue = {
			'actionzoneind':'-1',
			'distancename':'',
			'connectinggridind':'-1',
			'formind':'-1'
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newAnalyticsQueue=" + ex.message);
	}
	return analyticsqueue;
}

WTWJS.prototype.newMoldEvent = function() {
	var moldevent = '';
	try {
		moldevent = {
			'animationname':'',
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
	return moldevent;
}

WTWJS.prototype.newObjectAnimation = function() {
	var objectanimation = '';
	try {
		objectanimation = {
			'objectanimationid':'',
			'objectfolder':'',
			'objectfile':'',
			'animationname':'onclick',
			'moldevent':'',
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
	return objectanimation;
}

WTWJS.prototype.newMoldQueue = function() {
	var moldqueue = '';
	try {
		moldqueue = {
			'moldname':'',
			'queprocess':'add',
			'actionzoneind':'-1',
			'actionzoneid':'',
			'formind':'-1',
			'connectinggridind':'-1',
			'check':true,
			'molddef':WTW.newMold(),
			'parentname':WTW.mainParent,
			'coveringname':'texture',
			'csgmolddef':null,
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newMoldQueue=" + ex.message);
	}
	return moldqueue;
}

WTWJS.prototype.newRideAlong = function() {
	var ridealong = '';
	try {
		ridealong = {
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
	return ridealong;
}

WTWJS.prototype.newUpload = function() {
	var upload = '';
	try {
		upload = {
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
	return upload;
}

WTWJS.prototype.newConnectingGrid = function() {
	var connectinggrid = '';
	try {
		connectinggrid = {
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
				'access':'',
				'storeiframes':'',
				'storeurl':'',
				'wpplugin':'',
				'storecarturl':'',
				'storeproducturl':'',
				'storewoocommerceapiurl':'',
				'woocommercekey':'',
				'woocommercesecret':''
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
	return connectinggrid;
}

WTWJS.prototype.newMold = function() {
	var molddef = '';
	var path1 = [];
	var path2 = [];
	var webimages = [];
	try {
		webimages[0] = WTW.newWebImage();
		molddef = {
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
				'webimages':webimages
			},
			'webtext':{
				'webtext':'',
				'fullheight':'0',
				'scrollpos':'0',
				'webstyle':''
			},
			'color':
			{
				'diffuse':{
					'r':'1',
					'g':'1',
					'b':'1'
				},
				'specular':{
					'r':'1',
					'g':'1',
					'b':'1'
				},
				'emissive':{
					'r':'1',
					'g':'1',
					'b':'1'
				}
			},
			'paths':
			{
				'path1':path1,
				'path2':path2
			},
			'alttag':
			{
				'name':''
			},
			'store':
			{
				'storeurl':'',
				'wpplugin':'',
				'storeiframes':'',
				'search':'',
				'productid':'',
				'name':'',
				'slug':'',
				'price':'',
				'categoryid':'',
				'description':'',
				'shortdescription':'',
				'imageid':'',
				'imageurl':'',
				'allowsearch':'1'
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
			'checkcollisions':'',
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
	return molddef;
}

WTWJS.prototype.newPathPoint = function() {
	var pathpoint = '';
	try {
		var pathpoint = {
			'x':'0',
			'y':'0',
			'z':'0',
			'sorder':'0'
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newPathPoint=" + ex.message);
	}
	return pathpoint;
}

WTWJS.prototype.newAvatarDef = function() {
	var avatardef = '';
	var avatarparts = [];
	var animations = [];
	var avataranimationdefs = [];
	try {
		avatardef = {
			'position':
			{
				'x':'0.00',
				'y':'0.00',
				'z':'0.00'
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
				'y':'0.00',
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
			'avatarparts': avatarparts,
			'avataranimationdefs': avataranimationdefs,
			'animations': animations,
			'name':'',
			'trackid':'',
			'instanceid':'',
			'userid':'',
			'avatar':'default',
			'displayname':'',
			'privacy':'',
			'shown':'0',
			'opacity':'1',
			'checkcollisions':'0',
			'ispickable':'1',
			'parentname':WTW.mainParent,
			'movetime':'',
			'moveevents':'',
			'lastmoveevents':'',
			'updated':'',
			'lastupdate':false,
			'loaded':'0'
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newAvatarDef=" + ex.message);
	}
	return avatardef;
}

WTWJS.prototype.newAvatarAnimationDef = function() {
	var animationdef = '';
	try {
		animationdef = {
			'animationind':-1,
			'useravataranimationid':'',
			'avataranimationid':'',
			'animationname':'onoption',
			'animationfriendlyname':'',
			'loadpriority':0,
			'animationicon':'',
			'objectfolder':'',
			'objectfile':'',
			'startframe':'1',
			'endframe':'100',
			'animationloop':true,
			'defaultspeedratio':'1.00',
			'speedratio':'1.00',
			'walkspeed':'1'
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newAvatarAnimationDef=" + ex.message);
	}
	return animationdef;
}

WTWJS.prototype.newAvatarAnimationDefs = function(avatarind) {
	var animationdefs = [];
	try {
		if (WTW.isNumeric(avatarind)) {
			avatarind = Number(avatarind);
			switch (avatarind) {
				case 1:
					animationdefs[0] = {
						'useravataranimationid':'',
						'avataranimationid':'ohb6x5ze1112a9e6',
						'animationname':'onwait',
						'animationfriendlyname':'',
						'loadpriority':0,
						'animationicon':'',
						'objectfolder':'/content/system/avatars/female/',
						'objectfile':'femaleidle.babylon',
						'startframe':'1',
						'endframe':'100',
						'animationloop':true,
						'defaultspeedratio':'1.00',
						'speedratio':'1.00',
						'walkspeed':'1'
					};
					break;
				case 3:
					animationdefs[0] = {
						'useravataranimationid':'',
						'avataranimationid':'wc004i6dcn4rdn2g',
						'animationname':'onwait',
						'animationfriendlyname':'',
						'loadpriority':0,
						'animationicon':'',
						'objectfolder':'content/system/avatars/remy/',
						'objectfile':'remyidle.babylon',
						'startframe':'1',
						'endframe':'196',
						'animationloop':true,
						'defaultspeedratio':'1.00',
						'speedratio':'1.00',
						'walkspeed':'1'
					};
					break;
				case 4:
					animationdefs[0] = {
						'useravataranimationid':'',
						'avataranimationid':'gfso15ljwulgi6c9',
						'animationname':'onwait',
						'animationfriendlyname':'',
						'loadpriority':0,
						'animationicon':'',
						'objectfolder':'content/system/avatars/jasper/',
						'objectfile':'jasperidle.babylon',
						'startframe':'1',
						'endframe':'201',
						'animationloop':true,
						'defaultspeedratio':'1.00',
						'speedratio':'1.00',
						'walkspeed':'1'
					};
					break;
				case 5:
					animationdefs[0] = {
						'useravataranimationid':'',
						'avataranimationid':'45dg48tccn60jnna',
						'animationname':'onwait',
						'animationfriendlyname':'',
						'loadpriority':0,
						'animationicon':'',
						'objectfolder':'content/system/avatars/malcolm/',
						'objectfile':'malcolmidle.babylon',
						'startframe':'1',
						'endframe':'195',
						'animationloop':true,
						'defaultspeedratio':'1.00',
						'speedratio':'1.00',
						'walkspeed':'1'
					};
					break;
				case 6:
					animationdefs[0] = {
						'useravataranimationid':'',
						'avataranimationid':'78k4zhhzhemwlcvc',
						'animationname':'onwait',
						'animationfriendlyname':'',
						'loadpriority':0,
						'animationicon':'',
						'objectfolder':'content/system/avatars/liam/',
						'objectfile':'liamidle.babylon',
						'startframe':'1',
						'endframe':'200',
						'animationloop':true,
						'defaultspeedratio':'1.00',
						'speedratio':'1.00',
						'walkspeed':'1'
					};
					break;
				case 7:
					animationdefs[0] = {
						'useravataranimationid':'',
						'avataranimationid':'n3i9s7ophcae5h1r',
						'animationname':'onwait',
						'animationfriendlyname':'',
						'loadpriority':0,
						'animationicon':'',
						'objectfolder':'content/system/avatars/stefani/',
						'objectfile':'stefaniidle.babylon',
						'startframe':'1',
						'endframe':'363',
						'animationloop':true,
						'defaultspeedratio':'1.00',
						'speedratio':'1.00',
						'walkspeed':'1'
					};
					break;
				case 8:
					animationdefs[0] = {
						'useravataranimationid':'',
						'avataranimationid':'o4kgmoik9nf8ws7p',
						'animationname':'onwait',
						'animationfriendlyname':'',
						'loadpriority':0,
						'animationicon':'',
						'objectfolder':'content/system/avatars/pearl/',
						'objectfile':'pearlidle.babylon',
						'startframe':'1',
						'endframe':'325',
						'animationloop':true,
						'defaultspeedratio':'1.00',
						'speedratio':'1.00',
						'walkspeed':'1'
					};
					break;
				case 9:
					animationdefs[0] = {
						'useravataranimationid':'',
						'avataranimationid':'o3h47opkqwat7mge',
						'animationname':'onwait',
						'animationfriendlyname':'',
						'loadpriority':0,
						'animationicon':'',
						'objectfolder':'content/system/avatars/regina/',
						'objectfile':'reginaidle.babylon',
						'startframe':'1',
						'endframe':'241',
						'animationloop':true,
						'defaultspeedratio':'1.00',
						'speedratio':'1.00',
						'walkspeed':'1'
					};
					break;
				case 10:
					animationdefs[0] = {
						'useravataranimationid':'',
						'avataranimationid':'5nt31zrtvvq4cdu3',
						'animationname':'onwait',
						'animationfriendlyname':'',
						'loadpriority':0,
						'animationicon':'',
						'objectfolder':'content/system/avatars/shae/',
						'objectfile':'shaeidle.babylon',
						'startframe':'1',
						'endframe':'303',
						'animationloop':true,
						'defaultspeedratio':'1.00',
						'speedratio':'1.00',
						'walkspeed':'1'
					};
					break;
				default:
					animationdefs[0] = {
						'useravataranimationid':'',
						'avataranimationid':'r9087b004i9ptv0e',
						'animationname':'onwait',
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
						'walkspeed':'1'
					};
					break;
			}
			switch (avatarind) {
				case 1:
				case 7:
				case 8:
				case 9:
				case 10:
					animationdefs[1] = {
						'useravataranimationid':'',
						'avataranimationid':'1wfesp5owhoxl9gj',
						'animationname':'onwalk',
						'animationfriendlyname':'',
						'loadpriority':0,
						'animationicon':'',
						'objectfolder':'/content/system/avatars/female/',
						'objectfile':'femalewalk.babylon',
						'startframe':'1',
						'endframe':'36',
						'animationloop':true,
						'defaultspeedratio':'1.00',
						'speedratio':'1.00',
						'walkspeed':'1'
					};
					break;
				default:
					animationdefs[1] = {
						'useravataranimationid':'',
						'avataranimationid':'b03ftsjbxr0sxam8',
						'animationname':'onwalk',
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
						'walkspeed':'1'
					};
					break;
			}
			switch (avatarind) {
				case 1:
				case 7:
				case 8:
				case 9:
				case 10:
					animationdefs[2] = {
						'useravataranimationid':'',
						'avataranimationid':'aryiq3b9d4i7iwz6',
						'animationname':'onwalkbackwards',
						'animationfriendlyname':'',
						'loadpriority':0,
						'animationicon':'',
						'objectfolder':'/content/system/avatars/female/',
						'objectfile':'femalewalkback.babylon',
						'startframe':'1',
						'endframe':'30',
						'animationloop':true,
						'defaultspeedratio':'1.00',
						'speedratio':'1.00',
						'walkspeed':'1'
					};
					break;
				default:
					animationdefs[2] = {
						'useravataranimationid':'',
						'avataranimationid':'0ikarv3xbs0n7544',
						'animationname':'onwalkbackwards',
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
						'walkspeed':'1'
					};
					break;
			}
			animationdefs[3] = {
				'useravataranimationid':'',
				'avataranimationid':'9xworrh44cbkwq1y',
				'animationname':'onturnleft',
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
				'walkspeed':'1'
			};
			animationdefs[4] = {
				'useravataranimationid':'',
				'avataranimationid':'mbpjld4fttowgnt6',
				'animationname':'onturnright',
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
				'walkspeed':'1'
			};
			animationdefs[5] = {
				'useravataranimationid':'',
				'avataranimationid':'hur9z71kpv6b2bgb',
				'animationname':'onstrafeleft',
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
				'walkspeed':'1'
			};
			animationdefs[6] = {
				'useravataranimationid':'',
				'avataranimationid':'6x3o6sh2u1m1bjnq',
				'animationname':'onstraferight',
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
				'walkspeed':'1'
			};
			animationdefs[7] = {
				'useravataranimationid':'',
				'avataranimationid':'mz182mwpsvx1f1va',
				'animationname':'onrun',
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
				'walkspeed':'1'
			};
			animationdefs[8] = {
				'useravataranimationid':'',
				'avataranimationid':'rzn9d3dihtq4h2v5',
				'animationname':'onrunbackwards',
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
				'walkspeed':'1'
			};
			animationdefs[9] = {
				'useravataranimationid':'',
				'avataranimationid':'45dh9tcbikbvhqa9',
				'animationname':'onrunturnleft',
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
				'walkspeed':'1'
			};
			animationdefs[10] = {
				'useravataranimationid':'',
				'avataranimationid':'gi7iwy1cobjpzqpf',
				'animationname':'onrunturnright',
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
				'walkspeed':'1'
			};
			animationdefs[11] = {
				'useravataranimationid':'',
				'avataranimationid':'xd3eqg21webe0wff',
				'animationname':'onrunstrafeleft',
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
				'walkspeed':'1'
			};
			animationdefs[12] = {
				'useravataranimationid':'',
				'avataranimationid':'w547k8hrbbn89k4v',
				'animationname':'onrunstraferight',
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
				'walkspeed':'1'
			};
		}
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newAvatarAnimationsMale=" + ex.message);
	}
	return animationdefs;
}

WTWJS.prototype.newWebImage = function() {
	var webimage = '';
	try {
		var webimage = {
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
	return webimage;
}

WTWJS.prototype.newActionZone = function() {
	var actionzone = '';
	try {
		actionzone = {
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
			'jsfunction':'',
			'jsparameters':'',
			'shown':'0',
			'status':'0',
			'parentname':''
		};
	} catch (ex) {
		WTW.log("core-scripts-prime-wtw_objectdefinitions.js-newActionZone=" + ex.message);
	}
	return actionzone;
}

WTWJS.prototype.newHTMLSegment = function() {
	var htmlsegment = '';
	try {
		htmlsegment = {
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
	return htmlsegment;
}

WTWJS.prototype.newAutomation = function() {
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



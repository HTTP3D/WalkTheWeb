/* All code is Copyright 2013-2020 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

/* these functions set the types of avatars to add and define the default values, form fields, and functions to create the avatars */

/* currently not in use, these functions will hold the ability to add auto bot avatars to scenes */
WTWJS.prototype.getAvatarList = function() {
	/* list of autobot avatars */
	var avatarlist = [];
	try {
		avatarlist[avatarlist.length] = "Anonymous";
		avatarlist[avatarlist.length] = "Female";
		avatarlist[avatarlist.length] = "Male";
	} catch (ex) {
		WTW.log("core-scripts-avatars-addavatarlist\r\n getAvatarList=" + ex.message);
	} 
	return avatarlist;
}

WTWJS.prototype.addAvatar = function(avatarname, avatardef, parentname) {
	/* functions to add the autobot avatars selected by avatartype (avatar) */
	var avatar;
	try {
		if (avatardef.avatar == undefined) {
			avatardef.avatar = "";
		}
		switch (avatardef.avatar.toLowerCase()) {
			case "shark":
				avatar = WTW.addAvatarShark(avatarname, avatardef);
				break;
			default:
				avatardef.avatar = '';
				avatar = WTW.addAvatar3DObject(avatarname, avatardef);
				break;
		}
		var avatarparent = scene.getMeshByID(avatardef.parentname);
		if (avatarparent != null) {
			avatar.parent = avatarparent;
		}
	} catch (ex) {
		WTW.log("core-scripts-avatars-addavatarlist\r\n addAvatar=" + ex.message);
	} 
	return avatar;
}

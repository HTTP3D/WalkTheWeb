/* currently not in use, these funcitons will hold the ability to add auto bot avatars to scenes */
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

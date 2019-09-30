<div id="wtw_adminmenu61b" class="wtw-hide">
	<h2>3D Community Access</h2>
	<div style="white-space:normal;font-size:.5em;">Note: Neighbors are Users with 3D Buildings in this 3D Community.<br />
		Invitees are users who recieved an invitation to become a Neighbor.<br />
		Visitors are all users.<br />
		Architects can edit the 3D Community.<br />
		Admins can Add or Remove Architects, Change Community Access, and edit the 3D Community.</div>
	<h2>User Email or Username</h2>
	<input type="text" id="wtw_tadduseridname" maxlength="64" width="250" onclick="WTW.checkKey(this, 'usernameoremail', 0, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'usernameoremail', 0, 0);WTW.setAccessValid(2);" onblur="WTW.checkKey(this, 'usernameoremail', 0, 1);" /><div id="wtw_reqtadduseraccess" class="wtw-required">&nbsp;* Required</div><br />
	<br /><br />
	<div value="Add User" onclick="WTW.addAccess();WTW.blockPassThrough(); return (false);" style="cursor: pointer;" class='wtw-menulevel2'></div>
	<hr /><br />
	<div id="wtw_useraccesslist"></div>
	<br />
</div>
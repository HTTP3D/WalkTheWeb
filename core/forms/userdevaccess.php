<!-- admin menu form for editing developer roles (depreciated) -->
<div id="wtw_adminmenu60b" class="wtw-hide">
	<h2>Add User</h2>
	<div class="wtw-mainmenuvalue" style="font-size:.8em;">(User Name, Email, Display Name, or User ID)</div><br />
	<input type="text" id="wtw_tadduserdevaccess" maxlength="64" width="250" onclick="WTW.checkKey(this, 'displaynameoremail', 0, 0);" onkeyup="WTW.checkKey(this, 'displaynameoremail', 0, 0);" onblur="WTW.checkKey(this, 'displaynameoremail', 0, 1);" onkeyup="WTW.setDevAccessValid(2);" /><div id="wtw_reqtadduserdevaccess" class="wtw-required">&nbsp;* Required</div><br />
	<br />
	<h2>Access Level</h2>
	<div id="wtw_accessnote" class="wtw-mainmenuvalue">Dev: updates to 3D Website.<br />Admin: Dev and set permissions.</div><br />
	<select id="wtw_taddnewaccess">
		<option value="dev">Dev</option>
		<option value="admin">Admin</option>
	</select>
	<br /><br />
	<div onclick="WTW.addDevAccess();" style="cursor: pointer;" class='wtw-greenbutton'>Add User</div>
	<hr /><br />
	<div id="wtw_userdevaccesslist"></div>
	<br />
</div>
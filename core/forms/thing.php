<!-- admin menu form for editing 3D Thing information -->
	<div id="wtw_adminmenu35b" class="wtw-hide">
		<h2>3D Thing Name</h2>
		<input type="text" id="wtw_tthingname" maxlength="255" onclick="WTW.checkKey(this, 'displayname', 0, 0);" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);" /><div id="wtw_reqeditthingname" class="wtw-required">&nbsp;* Required</div><br />
		<br />
		<h2>3D Thing Description</h2>
		<div class="wtw-menulevel0text" style="text-align:left;">shows on the meta tags of the 3D Thing Website</div>
		<input type="text" id="wtw_tthingdescription" maxlength="255" onclick="WTW.checkKey(this, 'safetext', 0, 0);" onkeyup="WTW.checkKey(this, 'safetext', 0, 0);" onblur="WTW.checkKey(this, 'safetext', 0, 1);" /><br />
		<br />
		<h2>Google Analytics ID</h2>
		<input type="text" id="wtw_tthinganalyticsid" maxlength="255" onclick="WTW.checkKey(this, 'webname', 1, 0);WTW.blockPassThrough();" onkeyup="WTW.checkKey(this, 'webname', 1, 0);" onblur="WTW.checkKey(this, 'webname', 1, 1);" /><br />
		<hr class="wtw-menuhr" />
		<h2 style="margin-bottom:3px;">Alt Tag for 3D Thing</h2>
		<input type="text" id="wtw_tthingalttag" maxlength="255" onclick="WTW.checkKey(this, 'displayname', 0, 0);" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);" /><br />
		<br />
<!--	<div id="wtw_thingadvancedoptslink" onclick="WTW.toggleAdvanced(this, 'wtw_thingadvancedopts');" class="wtw-showhideadvanced" >-- Show Advanced Options --</div>
		<div id="wtw_thingadvancedopts" style="display:none;visibility:hidden;">
		</div> -->
		<br />
		<hr class="wtw-menuhr" />
		<div id="wtw_save35" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);" style="font-size:1.4em;">Save Settings</div>
	</div>
<!-- admin menu form for editing 3D Building information -->
	<div id="wtw_adminmenu5b" style="display:none;visibility:hidden;">
		<h2>3D Building Name</h2>
		<input type="text" id="wtw_tbuildingname" maxlength="255" onclick="WTW.checkKey(this, 'displayname', 0, 0);" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);" /><br />
		<br />
		<h2>3D Building Description</h2>
		<div class="wtw-menulevel0text" style="text-align:left;">shows on the meta tags of the 3D Building Website</div>
		<input type="text" id="wtw_tbuildingdescription" maxlength="255" onclick="WTW.checkKey(this, 'safetext', 0, 0);" onkeyup="WTW.checkKey(this, 'safetext', 0, 0);" onblur="WTW.checkKey(this, 'safetext', 0, 1);" /><br />
		<br />
		<h2>Google Analytics ID</h2>
		<input type="text" id="wtw_tbuildinganalyticsid" maxlength="255" onclick="WTW.checkKey(this, 'webname', 1, 0);" onkeyup="WTW.checkKey(this, 'webname', 1, 0);" onblur="WTW.checkKey(this, 'webname', 1, 1);" /><br />
		<hr class="wtw-menuhr" />
		<h2 style="margin-bottom:3px;">Alt Tag for 3D Building</h2>
		<input type="text" id="wtw_tbuildingalttag" maxlength="255" onclick="WTW.checkKey(this, 'displayname', 0, 0);" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);" /><br />
		<br />
<!--	<div id="wtw_buildingadvancedoptslink" onclick="WTW.toggleAdvanced(this, 'wtw_buildingadvancedopts');" class="wtw-showhideadvanced" >-- Show Advanced Options --</div>
		<div id="wtw_buildingadvancedopts" style="display:none;visibility:hidden;">
			<br />
		</div>-->
		<br />
		<div id="wtw_adminmenubuildsave" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);" style="font-size:1.4em;">Save Settings</div>
	</div>

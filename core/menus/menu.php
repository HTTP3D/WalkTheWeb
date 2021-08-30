<!-- browse menu for the index.php page (all users) -->
<div id="wtw_menubase" class="wtw-menubase">
<?php
	global $wtwmenus;
	echo $wtwmenus->getMainMenu();
?>
</div>
<div id="wtw_wtwmessage" class="wtw-wtwmessage"></div>
<div id="wtw_menusettings" class="wtw-slideupmenuright" style="display:none;visibility:hidden;" >
	<img onclick="WTW.closeMenus();" class="wtw-closeright" src="/content/system/images/menuclose.png" alt="Close" title="Close" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
	<div class="wtw-menuheading"><?php echo $wtwmenus->__("Settings Menu"); ?></div>
	<div id="wtw_menusettingsscroll" class="wtw-mainmenuscroll">
		<ul class="wtw-menuli">
			<li class="wtw-menuliholder"><img src="/content/system/images/menucamera.png" alt="Camera On" title="Camera On" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Main Camera"); ?></li>
			<li class="wtw-submenuli" style="border-bottom:1px solid #454545;"><select id="wtw_firstcamera" class="wtw-menudropdown">
					<option value="First-Person Camera"><?php echo $wtwmenus->__("First-Person Camera"); ?></option>
					<option value="Follow Camera"><?php echo $wtwmenus->__("Follow Camera"); ?></option>
					<option value="Scene Camera"><?php echo $wtwmenus->__("Scene Camera"); ?></option>
					<option value="Self Camera"><?php echo $wtwmenus->__("Self Camera"); ?></option>
				</select><br />
				<select id="wtw_cameradimensions" class="wtw-menudropdown">
					<option value=""><?php echo $wtwmenus->__("2D View"); ?></option>
					<option value="Anaglyph"><?php echo $wtwmenus->__("3D Glasses Anaglyph Red-Cyan"); ?></option>
					<option value="VR"><?php echo $wtwmenus->__("3D VR Headset"); ?></option>
					<option value="VR Gamepad"><?php echo $wtwmenus->__("3D VR with Gamepad"); ?></option>
	<!--			<option value="WebVR Oculus">3D WebVR Oculus</option>
					<option value="WebVR Vive">3D WebVR Vive</option>
					<option value="WebVR Windows">3D WebVR Windows</option>
					<option value="WebVR GearVR">3D WebVR Gear VR</option>
					<option value="WebVR Daydream">3D WebVR Daydream</option>
					<option value="WebVR Generic">3D WebVR Generic</option> -->
				</select><br /></li>
			<li class="wtw-menuliholder"><img src="/content/system/images/menuwalk.png" alt="Camera Distance" title="Camera Distance" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Camera Distance"); ?></li>
			<li class="wtw-submenuli">
				<input id="wtw_tcameradistance" type="range" min="-100" max="100" value="-25" step="1" style="direction: ltr;width:240px;cursor:pointer;" oninput="WTW.changeCameraDistance();" onchange="WTW.changeCameraDistance();this.blur();"/>
			</li>
			<li class="wtw-menuli" onclick="WTW.toggleCameraTwo();"><img id="wtw_cameratwoicon" src="/content/system/images/menucameraoff.png" alt="<?php echo $wtwmenus->__("Turn Camera On"); ?>" title="<?php echo $wtwmenus->__("Turn Camera On"); ?>" class='wtw-menulefticon' /><div id="wtw_cameratwotext"><?php echo $wtwmenus->__("Second Camera Off"); ?></div></li>
			<li id="wtw_cameratwoselect" class="wtw-submenuli" style="display:none;visibility:hidden;"><select id="wtw_secondcamera" class="wtw-menudropdown">
					<option value="Scene Camera"><?php echo $wtwmenus->__("Scene Camera"); ?></option>
					<option value="First-Person Camera"><?php echo $wtwmenus->__("First-Person Camera"); ?></option>
					<option value="Follow Camera"><?php echo $wtwmenus->__("Follow Camera"); ?></option>
					<option value="Self Camera"><?php echo $wtwmenus->__("Self Camera"); ?></option>
				</select></li>
			<li><img src="/content/system/images/menuview.png" alt="Show and Hide Items" title="Show and Hide Items" class='wtw-menulefticon' /><?php echo $wtwmenus->__("View"); ?></li>
			<li class="wtw-menuliholder"><ul class="wtw-submenuli">
					<li class="wtw-menuli" onclick="WTW.toggleFPS();"><img id="wtw_fpsicon" src="/content/system/images/menuoff.png" alt="<?php echo $wtwmenus->__("Show Mold Count"); ?>" title="<?php echo $wtwmenus->__("Show Mold Count"); ?>" class='wtw-menulefticon' /><div id="wtw_fpsvisibility"><?php echo $wtwmenus->__("Mold Count and FPS are Hidden"); ?></div></li>
					<li class="wtw-menuli" onclick="WTW.toggleArrows();"><img id="wtw_arrowsicon" src="/content/system/images/menuoff.png" alt="<?php echo $wtwmenus->__("Show Arrows"); ?>" title="<?php echo $wtwmenus->__("Show Arrows"); ?>" class='wtw-menulefticon' /><div id="wtw_arrowsvisibility"><?php echo $wtwmenus->__("Arrows are Hidden"); ?></div></li>
				</ul></li>
			<li class="wtw-menuli" onclick="WTW.hide('wtw_menusettings');WTW.showSettingsMenu('wtw_menumovementspeed');"><img src="/content/system/images/menumovement.png" alt="Movement Speed" title="Movement Speed" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Movement Speed"); ?></li>
			<li class="wtw-menuli" onclick="WTW.hide('wtw_menusettings');WTW.showSettingsMenu('wtw_menugraphicsquality');"><img src="/content/system/images/menugraphics.png" alt="Graphics Quality" title="Graphics Quality" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Graphics Quality"); ?></li>
			<li class="wtw-menuli" onclick="WTW.hide('wtw_menusettings');WTW.showSettingsMenu('wtw_menushadowquality');"><img src="/content/system/images/menushadows.png" alt="Shadow Quality" title="Shadow Quality" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Shadow Quality"); ?></li>
			<li class="wtw-menuli" onclick="WTW.toggleSoundMute();"><img id="wtw_submenumute" src="/content/system/images/menumuteon.png" alt="<?php echo $wtwmenus->__("Turn Sound On"); ?>" title="<?php echo $wtwmenus->__("Turn Sound On"); ?>" class='wtw-menulefticon' /><span id="wtw_submenumutetext"><?php echo $wtwmenus->__("Sound is Off"); ?></span></li>
<?php		echo $wtwmenus->getSettingsMenu(); ?>
		</ul>
	</div>
</div>
<div id="wtw_menuprofile" class="wtw-slideupmenuright" style="display:none;visibility:hidden;">
	<div id="wtw_menuprofilescroll" class="wtw-mainmenuscroll">
		<div id="wtw_menuloggedin" style="display:none;visibility:hidden;">
			<img onclick="WTW.closeMenus();" class="wtw-closeright" src="/content/system/images/menuclose.png" alt="Close" title="Close" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
			<div class="wtw-menuheading"><?php echo $wtwmenus->__("My Profile"); ?></div>
			<ul class="wtw-menuli">
				<li class="wtw-menuliholder wtw-center"><img id="wtw_profileimagelg" src="/content/system/images/menuprofilebig.png" alt="Profile" title="Profile" class='wtw-profilelg' /></li>
				<li class="wtw-submenuli"><?php echo $wtwmenus->__("Avatar Display Name"); ?></li>
				<li class="wtw-submenuli"><div id="wtw_menudisplayname" class="wtw-indentbold" onclick="WTW.editProfile();"></div>
					<input type="text" id="wtw_teditdisplayname" class="wtw-hide" /></li>
				<li class="wtw-submenuli"><?php echo $wtwmenus->__("User Information"); ?></li>
				<li class="wtw-submenuli"><div id="wtw_menuemail" class="wtw-indentbold" onclick="WTW.editProfile();"><?php echo $wtwmenus->__("Email"); ?></div>
					<input type="text" id="wtw_teditemail" autocomplete="email" class="wtw-hide" /></li>
				<li class="wtw-menuliholder"><div id="wtw_profileerrortext" style="color:red;margin-left:10px;"></div></li>
				<li id="wtw_menusaveprofile" class="wtw-menuli wtw-hide" onclick="WTW.saveProfile();"><img src="/content/system/images/menulogin.png" alt="Save Profile" title="Save Profile" class='wtw-menulefticon' /><div style="color:yellow;"><?php echo $wtwmenus->__("Save Profile"); ?></div></li>
				<li id="wtw_menucancelsaveprofile" class="wtw-menuli wtw-hide" onclick="WTW.cancelEditProfile();"><img src="/content/system/images/menulogin.png" alt="Cancel" title="Cancel" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Cancel"); ?></li>
				<li class="wtw-submenuli"><hr /></li>
				<li class="wtw-menuli" class="wtw-clear" onclick="WTW.editProfile();"><img src="/content/system/images/menueditprofile.png" alt="Edit My Profile" title="Edit My Profile" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Edit My Profile"); ?></li>
				<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.openAvatarDesigner();"><img src="/content/system/images/menueditavatar.png" alt="Edit My Avatar" title="Edit My Avatar" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Edit My Avatar"); ?></li>
				<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.openLocalLogin('Select Avatar',.4,.9);"><img src="/content/system/images/menueditavatar.png" alt="Select My Avatar" title="Select My Avatar" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Select My Avatar"); ?></li>
				<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.openWebpage('https://www.walktheweb.com/my-3d-stats/','_blank');"><img src="/content/system/images/menustats.png" alt="My 3D Stats" title="My 3D Stats" class='wtw-menulefticon' /><?php echo $wtwmenus->__("My 3D Stats"); ?></li>
				<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.openWebpage('https://www.walktheweb.com/account/password/','_blank');"><img src="/content/system/images/menupassword.png" alt="Change Password" title="Change Password" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Change Password"); ?></li>
				<li class="wtw-menuli" onclick="WTW.openLoginMenu();WTW.closeMenus();"><img src="/content/system/images/menulogin.png" alt="Login Menu" title="Login Menu" class='wtw-menulefticon' /><div style="color:yellow;"><?php echo $wtwmenus->__("Login Menu"); ?></div></li>
				<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.logout();"><img src="/content/system/images/menulogout.png" alt="Log Out" title="Log Out" class='wtw-menulefticon' /><div><?php echo $wtwmenus->__("Log Out"); ?></div></li>
			</ul>
		</div>
		<div id="wtw_menulogin">
			<form>
				<img onclick="WTW.closeMenus();" class="wtw-closeright" src="/content/system/images/menuclose.png" alt="Close" title="Close" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
				<div class="wtw-menuheading"><?php echo $wtwmenus->__("Login"); ?></div>
				<ul class="wtw-menuli">
					<li class="wtw-menuli" onclick="WTW.openLoginMenu();WTW.closeMenus();"><img src="/content/system/images/menulogin.png" alt="<?php echo $wtwmenus->__("Login Menu"); ?>" title="<?php echo $wtwmenus->__("Login Menu"); ?>" class='wtw-menulefticon' /><div style="color:yellow;"><?php echo $wtwmenus->__("Login"); ?></div></li>
					<li class="wtw-menuli" onclick="WTW.openLocalLogin('Recover Login', .3, .5);WTW.closeMenus();"><img src="/content/system/images/menupassword.png" alt="<?php echo $wtwmenus->__("Recover Login"); ?>" title="<?php echo $wtwmenus->__("Recover Login"); ?>" class='wtw-menulefticon' /><div><?php echo $wtwmenus->__("Forgot My Login"); ?></div></li>
					<li class="wtw-menuli" onclick="WTW.openLocalLogin('Create Login', .3, .7);WTW.closeMenus();"><img src="/content/system/images/menuregister.png" alt="<?php echo $wtwmenus->__("Create My Account"); ?>" title="<?php echo $wtwmenus->__("Create My Account"); ?>" class='wtw-menulefticon' /><div style="color:yellow;"><?php echo $wtwmenus->__("Create My Account"); ?></div></li>
				</ul>
			</form>
		</div>
	</div>
</div>
<div id="wtw_menuhelp" class="wtw-slideupmenuright" style="display:none;visibility:hidden;">
	<img onclick="WTW.closeMenus();" class="wtw-closeright" src="/content/system/images/menuclose.png" alt="Close" title="Close" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
	<div class="wtw-menuheading"><?php echo $wtwmenus->__("Help Menu"); ?></div>
	<div id="wtw_menuhelpscroll" class="wtw-mainmenuscroll">
		<ul class="wtw-menuli">
			<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.openWebpage('https://www.walktheweb.com/wiki/','_blank');"><img src="/content/system/images/menuwtwhelp.png" alt="<?php echo $wtwmenus->__("WalkTheWeb Help"); ?>" title="<?php echo $wtwmenus->__("WalkTheWeb Help"); ?>" class='wtw-menulefticon' /><?php echo $wtwmenus->__("WalkTheWeb Help"); ?></li>
			<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.showSettingsMenu('wtw_menucontrols');"><img src="/content/system/images/menumovement.png" alt="<?php echo $wtwmenus->__("Movement Controls"); ?>" title="<?php echo $wtwmenus->__("Movement Controls"); ?>" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Movement Controls"); ?></li>
			<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.openWebpage('https://www.walktheweb.com/knowledgebase_category/3d-browsing/','_blank');"><img src="/content/system/images/menuquestions.png" alt="<?php echo $wtwmenus->__("Common Questions"); ?>" title="<?php echo $wtwmenus->__("Common Questions"); ?>" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Common Questions"); ?></li>
			<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.openWebpage('https://www.walktheweb.com/knowledgebase_category/tutorials/','_blank');"><img src="/content/system/images/menututorials.png" alt="<?php echo $wtwmenus->__("Tutorials"); ?>" title="<?php echo $wtwmenus->__("Tutorials"); ?>" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Tutorials"); ?></li>
			<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.openWebpage('https://www.walktheweb.com/knowledgebase_category/tutorials/','_blank');"><img src="/content/system/images/menutools.png" alt="<?php echo $wtwmenus->__("Admin Help"); ?>" title="<?php echo $wtwmenus->__("Admin Help"); ?>" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Admin Help"); ?></li>
			<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.openWebpage('https://www.walktheweb.com/useragreement/','_blank');"><img src="/content/system/images/menueula.png" alt="<?php echo $wtwmenus->__("End User License Agreement"); ?>" title="<?php echo $wtwmenus->__("End User License Agreement"); ?>" class='wtw-menulefticon' /><?php echo $wtwmenus->__("End User License Agreement"); ?></li>
			<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.openWebpage('https://www.walktheweb.com/contact-us/','_blank');"><img src="/content/system/images/menuinfo.png" alt="<?php echo $wtwmenus->__("Contact WalkTheWeb"); ?>" title="<?php echo $wtwmenus->__("Contact WalkTheWeb"); ?>" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Contact WalkTheWeb"); ?></li>
		</ul>
	</div>
</div>
<div id="wtw_menucontrols" class="wtw-slideupmenuright" style="display:none;visibility:hidden;">
	<img onclick="WTW.closeMenus();" class="wtw-closeright" src="/content/system/images/menuclose.png" alt="Close" title="Close" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
	<div class="wtw-menuheading"><?php echo $wtwmenus->__("Movement Controls"); ?></div>
	<div id="wtw_menucontrolsscroll" class="wtw-mainmenuscroll">
		<ul class="wtw-menuli">
			<li id="wtw_helpglassesdiv" class="wtw-submenublockli">
				<a href="https://www.walktheweb.com/shop/walktheweb-3d-glasses/" target="_blank"><img src="/content/system/images/3DGlassesFor5.png" alt="3D Glasses for $5" title="3D Glasses for $5" style="width:95%;height:auto;margin:2%;" /></a /></li>
			<li class="wtw-menuli" onclick="WTW.hide('wtw_helpkeyboarddiv');WTW.hide('wtw_helptouchdiv');WTW.hide('wtw_helpcameradiv');WTW.toggle('wtw_helpmousediv');WTW.showSettingsMenu('wtw_menucontrols');"><img src="/content/system/images/menumouse.png" alt="<?php echo $wtwmenus->__("Mouse Controls"); ?>" title="<?php echo $wtwmenus->__("Movement Controls"); ?>" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Mouse Controls"); ?></li>
			<li id="wtw_helpmousediv" class="wtw-submenublockli" style="display:none;visibility:hidden;">
				<div style='font-size:.8em;text-align:center;'><?php echo $wtwmenus->__("Mouse must be over 3D Scene to move."); ?></div>
				<img src="/content/system/images/helpmouse.png" alt="<?php echo $wtwmenus->__("Mouse Walk Controls"); ?>" title="<?php echo $wtwmenus->__("Mouse Walk Controls"); ?>" style="width:95%;height:auto;margin:2%;" /><br />
				<img src="/content/system/images/helpmousemove.png" alt="<?php echo $wtwmenus->__("Mouse Pan Controls"); ?>" title="<?php echo $wtwmenus->__("Mouse Pan Controls"); ?>" style="width:100%;height:auto;" /></li>
			<li class="wtw-menuli" onclick="WTW.hide('wtw_helpmousediv');WTW.hide('wtw_helptouchdiv');WTW.hide('wtw_helpcameradiv');WTW.toggle('wtw_helpkeyboarddiv');WTW.showSettingsMenu('wtw_menucontrols');"><img src="/content/system/images/menukeys.png" alt="<?php echo $wtwmenus->__("Keyboard Controls"); ?>" title="<?php echo $wtwmenus->__("Keyboard Controls"); ?>" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Keyboard Controls"); ?></li>
			<li id="wtw_helpkeyboarddiv" class="wtw-submenublockli" style="display:none;visibility:hidden;">
				<div style='font-size:.8em;text-align:center;'><?php echo $wtwmenus->__("Mouse must be over 3D Scene to move."); ?></div>
				<img src="/content/system/images/helpkeyboard.png" alt="<?php echo $wtwmenus->__("Keyboard Controls"); ?>" title="<?php echo $wtwmenus->__("Keyboard Controls"); ?>" style="width:95%;height:auto;margin:2%;" /></li>
			<li class="wtw-menuli" onclick="WTW.hide('wtw_helpmousediv');WTW.hide('wtw_helpkeyboarddiv');WTW.hide('wtw_helpcameradiv');WTW.toggle('wtw_helptouchdiv');WTW.showSettingsMenu('wtw_menucontrols');"><img src="/content/system/images/menuipad.png" alt="<?php echo $wtwmenus->__("Touch Controls"); ?>" title="<?php echo $wtwmenus->__("Touch Controls"); ?>" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Touch Controls"); ?></li>
			<li id="wtw_helptouchdiv" class="wtw-submenublockli" style="display:none;visibility:hidden;"><img src="/content/system/images/helptouch3.png" alt="<?php echo $wtwmenus->__("Touch Controls"); ?>" title="<?php echo $wtwmenus->__("Touch Controls"); ?>" style="width:95%;height:auto;margin:2%;" /></li>
			<li class="wtw-menuli" onclick="WTW.hide('wtw_helpmousediv');WTW.hide('wtw_helpkeyboarddiv');WTW.hide('wtw_helptouchdiv');WTW.toggle('wtw_helpcameradiv');WTW.showSettingsMenu('wtw_menucontrols');"><img src="/content/system/images/menucamera.png" alt="<?php echo $wtwmenus->__("Camera Views"); ?>" title="<?php echo $wtwmenus->__("Camera Views"); ?>" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Camera Views (Enable 3D!)"); ?></span></li>
			<li id="wtw_helpcameradiv" class="wtw-submenublockli" style="display:none;visibility:hidden;">
				<img src="/content/system/images/helpcameras.png" alt="<?php echo $wtwmenus->__("Camera Position and Views"); ?>" title="<?php echo $wtwmenus->__("Camera Position and Views"); ?>" style="width:95%;height:auto;margin:2%;" />
			</li>
			<li class="wtw-menuli" onclick="WTW.openLoginMenu();">
				<img src="/content/system/images/menulogin.png" alt="Login" title="Login" class='wtw-menulefticon' /><div style="color:yellow;"><?php echo $wtwmenus->__("Login"); ?></div></li>
		</ul>
		<div class="wtw-center"><input type="checkbox" id="wtw_tshowhelponstart" onchange="WTW.toggleHelpOnStart();" /> <?php echo $wtwmenus->__("Show this Menu on Start"); ?></div><br />
	</div>
</div>
<div id="wtw_menumovementspeed" class="wtw-slideupmenuright" style="display:none;visibility:hidden;">
	<img class="wtw-closeright" onclick="WTW.closeMenus();" src="/content/system/images/menuclose.png" alt="<?php echo $wtwmenus->__("Close"); ?>" title="<?php echo $wtwmenus->__("Close"); ?>" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
	<div class="wtw-menuheading"><?php echo $wtwmenus->__("Movement Speed"); ?></div>
	<div id="wtw_menumovementspeedscroll" class="wtw-mainmenuscroll">
		<ul class="wtw-menuli">
			<li class="wtw-menuliholder"><img src="/content/system/images/menuwalk.png" alt="<?php echo $wtwmenus->__("Walk Animation Speed"); ?>" title="<?php echo $wtwmenus->__("Walk Animation Speed"); ?>" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Walk Animation Speed"); ?></li>
			<li class="wtw-submenuli">
				<input id="wtw_twalkanimationspeed" type="range" min=".1" max="2.9" value="1.5" step=".01" style="direction: ltr;width:240px;cursor:pointer;" onchange="WTW.changeWalkAnimationSpeed();this.blur();"/>
			</li>
		</ul>
		<ul class="wtw-menuli">
			<li class="wtw-menuliholder"><img src="/content/system/images/menuwalk.png" alt="<?php echo $wtwmenus->__("Walk Distance Traveled"); ?>" title="<?php echo $wtwmenus->__("Walk Distance Traveled"); ?>" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Walk Distance Traveled"); ?></li>
			<li class="wtw-submenuli">
				<input id="wtw_twalkspeed" type="range" min=".1" max="2.9" value="1.5" step=".01" style="direction: ltr;width:240px;cursor:pointer;" onchange="WTW.changeWalkSpeed();this.blur();"/>
			</li>
		</ul>
		<ul class="wtw-menuli">
			<li class="wtw-menuliholder"><img src="/content/system/images/menuwalk.png" alt="<?php echo $wtwmenus->__("Turn Animation Speed"); ?>" title="<?php echo $wtwmenus->__("Turn Animation Speed"); ?>" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Turn Animation Speed"); ?></li>
			<li class="wtw-submenuli">
				<input id="wtw_tturnanimationspeed" type="range" min=".1" max="1.9" value="1" step=".01" style="direction: ltr;width:240px;cursor:pointer;" onchange="WTW.changeTurnAnimationSpeed();this.blur();"/>
			</li>
		</ul>
		<ul class="wtw-menuli">
			<li class="wtw-menuliholder"><img src="/content/system/images/menuwalk.png" alt="<?php echo $wtwmenus->__("Turn Rotation Distance"); ?>" title="<?php echo $wtwmenus->__("Turn Rotation Distance"); ?>" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Turn Rotation Distance"); ?></li>
			<li class="wtw-submenuli">
				<input id="wtw_tturnspeed" type="range" min=".1" max="1.9" value="1" step=".01" style="direction: ltr;width:240px;cursor:pointer;" onchange="WTW.changeTurnSpeed();this.blur();"/>
			</li>
		</ul>
	</div>
</div>
<div id="wtw_menugraphicsquality" class="wtw-slideupmenuright" style="display:none;visibility:hidden;">
	<img class="wtw-closeright" onclick="WTW.closeMenus();" src="/content/system/images/menuclose.png" alt="Close" title="Close" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
	<div class="wtw-menuheading"><?php echo $wtwmenus->__("Graphics Quality"); ?></div>
	<div id="wtw_menugraphicsqualityscroll" class="wtw-mainmenuscroll">
		<div id="wtw_graphicsqualitynote" class="wtw-menunote" style="display:none;visibility:hidden;"><?php echo $wtwmenus->__("Lower Quality Graphics provides faster animation."); ?><br /><br />
			<?php echo $wtwmenus->__("Higher Quality Graphics provides the best image and texture quality; especially when you move close to an object."); ?><br /><br />
			<?php echo $wtwmenus->__("This setting allows you to select the best balance between animation speed and Graphic Quality."); ?></div>
		<ul class="wtw-menuli">
			<li class="wtw-menuliholder">
				<img src="/content/system/images/menuq.png" alt="<?php echo $wtwmenus->__("Show Help"); ?>" title="<?php echo $wtwmenus->__("Show Help"); ?>" class='wtw-menuq' onclick="WTW.toggle('wtw_graphicsqualitynote');" />
				<img src="/content/system/images/menugraphics.png" alt="<?php echo $wtwmenus->__("Graphics Quality"); ?>" title="<?php echo $wtwmenus->__("Graphics Quality"); ?>" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Graphics Quality"); ?></li>
			<li class="wtw-submenuli">
				<input type="button" value="Lower" style="display:inline-block;cursor:pointer;" onclick="WTW.changeGraphic(-1);" />
				<input id="wtw_tgraphicsetting" type="range" min="0" max="2" defaultValue="0" step="1" style="cursor:pointer;" onchange="WTW.changeGraphic(this.value);"/>
				<input type="button" value="Higher" style="display:inline-block;cursor:pointer;" onclick="WTW.changeGraphic(1);" />
			</li>
			<li id="wtw_graphichelptitle" class="wtw-submenuli wtw-menunoteset"><?php echo $wtwmenus->__("Graphics (Optimum Balance)"); ?></li>
			<li id="wtw_graphichelpadmin" class="wtw-submenuli wtw-menunoteset" style="display:none;visibility:hidden;font-size:.8em;color:red;"><?php echo $wtwmenus->__("Admin Mode Overrides to Optimum"); ?></li>
		</ul>
	</div>
</div>
<div id="wtw_menushadowquality" class="wtw-slideupmenuright" style="display:none;visibility:hidden;">
	<img class="wtw-closeright" onclick="WTW.closeMenus();" src="/content/system/images/menuclose.png" alt="<?php echo $wtwmenus->__("Close"); ?>" title="<?php echo $wtwmenus->__("Close"); ?>" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
	<div class="wtw-menuheading"><?php echo $wtwmenus->__("Shadow Quality"); ?></div>
	<div id="wtw_menushadowqualityscroll" class="wtw-mainmenuscroll">
		<div id="wtw_shadowqualitynote" class="wtw-menunote" style="display:none;visibility:hidden;"><?php echo $wtwmenus->__("Lower Quality or turning shadows off provides faster animation."); ?><br /><br />
			<?php echo $wtwmenus->__("Higher Quality Shadows provides the best shadow resolution."); ?><br /><br />
			<?php echo $wtwmenus->__("This setting allows you to select the best balance between animation speed and Shadow Quality."); ?></div>
		<ul class="wtw-menuli">
			<li class="wtw-menuliholder">
				<img src="/content/system/images/menuq.png" alt="<?php echo $wtwmenus->__("Show Help"); ?>" title="<?php echo $wtwmenus->__("Show Help"); ?>" class='wtw-menuq' onclick="WTW.toggle('wtw_shadowqualitynote');" />
				<img src="/content/system/images/menushadows.png" alt="<?php echo $wtwmenus->__("Shadow Quality"); ?>" title="<?php echo $wtwmenus->__("Shadow Quality"); ?>" class='wtw-menulefticon' /><?php echo $wtwmenus->__("Shadow Quality"); ?></li>
			<li class="wtw-submenuli">
				<input type="button" value="Lower" style="display:inline-block;cursor:pointer;" onclick="WTW.changeShadow(-1);" />
				<input id="wtw_tshadowsetting" type="range" min="0" max="3" defaultValue="0" step="1" style="cursor:pointer;" onchange="WTW.changeShadow(this.value);"/>
				<input type="button" value="Higher" style="display:inline-block;cursor:pointer;" onclick="WTW.changeShadow(1);" />
			</li>
			<li id="wtw_shadowhelptitle" class="wtw-submenuli wtw-menunoteset"><?php echo $wtwmenus->__("Shadows (Some - Low Resolution)"); ?></li>
		</ul>
	</div>
</div>
<div id="wtw_menuavatar" class="wtw-slideupmenuright" style="display:none;visibility:hidden;">
	<img class="wtw-closeright" onclick="WTW.closeAvatarSettings();" src="/content/system/images/menuclose.png" alt="<?php echo $wtwmenus->__("Close"); ?>" title="<?php echo $wtwmenus->__("Close"); ?>" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
	<div class="wtw-menuheading"><?php echo $wtwmenus->__("Avatar Settings"); ?></div>
	<div id="wtw_menuavatarscroll" class="wtw-mainmenuscroll">
		<div id="wtw_avatarmenudiv">
			<ul class="wtw-menuli">
				<li class="wtw-menuli" onclick="WTW.switchAvatarMenu(1);"><img src="/content/system/images/menuavataridson.png" alt="<?php echo $wtwmenus->__("Avatar Display Name"); ?>" title="<?php echo $wtwmenus->__("Avatar Display Name"); ?>" class='wtw-menulefticon' /><div><?php echo $wtwmenus->__("Avatar Display Name"); ?></div></li>
				<li id="wtw_menuavatardisplaynamediv" class="wtw-submenublockli" style="display:none;visibility:hidden;"><div class="wtw-menusubtext"><?php echo $wtwmenus->__("Avatar Display Name:"); ?><br />
					<input id='wtw_tavatardisplayname' type='text' maxlength="255" onclick="WTW.checkKey(this, 'displayname', 0, 0);" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);WTW.saveAvatarDisplayName();" /></div><br />
					<div id='wtw_displaybannote' class='wtw-menusmalltext'><?php echo $wtwmenus->__("Be respectful of others when choosing a name."); ?> 
						<?php echo $wtwmenus->__("Reported offenders may be banned perminently."); ?>
						<?php echo $wtwmenus->__("Note that all names used are recorded with your account."); ?><br />
					</div>
				</li>
				<li class="wtw-menuli" onclick="WTW.switchAvatarMenu(3);"><img src="/content/system/images/menuanimations.png" alt="<?php echo $wtwmenus->__("Avatar Animations"); ?>" title="<?php echo $wtwmenus->__("Avatar Animations"); ?>" class='wtw-menulefticon' /><div><?php echo $wtwmenus->__("Avatar Animations"); ?></div></li>
				<li id="wtw_menuavataranimationsdiv" class="wtw-submenublockli" style="display:none;visibility:hidden;">
					<div style='font-size:.8em;text-align:center;background-color:#000000;border:1px solid gray;'><?php echo $wtwmenus->__("For Mouse or Keyboard Controls"); ?><br /><?php echo $wtwmenus->__("Mouse must be over 3D Scene to move."); ?></div>
					<div class="wtw-menusubtext"><?php echo $wtwmenus->__("Select Animation to Edit:"); ?></div>
					<ul style="padding:0px;">
						<li id="wtw_animation-onenter" class="wtw-avatarli" onclick="WTW.editEnterAnimation();"><div class="wtw-inlineindent"><?php echo $wtwmenus->__("Enter 3D Scene"); ?></div></li>
						<li id="wtw_animationdiv-enter" class="wtw-avatarli" style="display:none;visibility:hiden;"><div class="wtw-inlineindent2">
						<select id="wtw_tselectavataranimation-enter" onchange="WTW.saveAvatarEnterAnimation();">
							<option value='1'><?php echo $wtwmenus->__("Fast Pop"); ?></option>
							<option value='2'><?php echo $wtwmenus->__("Fade In"); ?></option>
							<option value='3'><?php echo $wtwmenus->__("Smokey Arrival"); ?></option>
							<option value='4'><?php echo $wtwmenus->__("Transport Rings"); ?></option>
							<option value='5'><?php echo $wtwmenus->__("Transport"); ?></option>
							<option value='6'><?php echo $wtwmenus->__("Atomic Enhancement"); ?></option>
							<option value='7'><?php echo $wtwmenus->__("Quick Grow"); ?></option>
							<option value='8'><?php echo $wtwmenus->__("Lightning Rise"); ?></option>
							<option value='9'><?php echo $wtwmenus->__("Smokey Evolution"); ?></option>
							<option value='10'><?php echo $wtwmenus->__("Radioactive Spawn"); ?></option>
							<option value='11'><?php echo $wtwmenus->__("Beam Force"); ?></option>
						</select></div></li>
					</ul>
					<div id="wtw_editavataranimations"></div>
					<a id="wtw_viewanimations"></a>
				</li>
				<li class="wtw-menuli" onclick="WTW.switchAvatarMenu(4);"><img src="/content/system/images/menueditavatar.png" alt="<?php echo $wtwmenus->__("Change My Avatar"); ?>" title="<?php echo $wtwmenus->__("Change My Avatar"); ?>" class='wtw-menulefticon' /><div><?php echo $wtwmenus->__("Change My Avatar"); ?></div></li>
				<li id="wtw_menuavatarchangediv" class="wtw-submenublockli" style="display:none;visibility:hidden;"><div class="wtw-menusubtext"><?php echo $wtwmenus->__("Select My Avatar"); ?></div></li>
			</ul>
			<div class="wtw-greenmenubutton" onclick="WTW.closeAvatarSettings();"><?php echo $wtwmenus->__("Close Avatar Settings"); ?></div>
		</div>
	</div>
</div>
<div id="wtw_menucontentrating" class="wtw-slideupmenuright" style="display:none;visibility:hidden;">
	<img class="wtw-closeright" onclick="WTW.closeMenus();" src="/content/system/images/menuclose.png" alt="<?php echo $wtwmenus->__("Close"); ?>" title="<?php echo $wtwmenus->__("Close"); ?>" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
	<div class="wtw-menuheading"><?php echo $wtwmenus->__("Content Rating"); ?></div>
	<div id="wtw_menucontentratingscroll" class="wtw-mainmenuscroll" style="min-height:300px;">
		<div id="wtw_contentrating" class="wtw-menunote"></div>
	</div>
</div>
<div id="wtw_menuoptionalanimations" class="wtw-slideupanimations" style="display:none;visibility:hidden;">
	<img class="wtw-closeright" onclick="WTW.hide('wtw_menuoptionalanimations');" src="/content/system/images/menuclose.png" alt="<?php echo $wtwmenus->__("Close Animations"); ?>" title="<?php echo $wtwmenus->__("Close Animations"); ?>" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
	<div class="wtw-menuheading" style="text-align:left;"><?php echo $wtwmenus->__("Press and Hold to Play"); ?><div id="wtw_avataranimationmode" class="wtw-avataranimationmode"><?php echo $wtwmenus->__("Mode:"); ?><div id="wtw_animationmodenormal" class="wtw-animationmodeselected" onclick="WTW.avatarAnimationMode('');"><?php echo $wtwmenus->__("Normal"); ?></div><div id="wtw_animationmodefight" class="wtw-animationmode" style="display:none;visibility:hidden;" onclick="WTW.avatarAnimationMode('fight');"><?php echo $wtwmenus->__("Fight"); ?></div></div></div>
	<div class="wtw-horizontalscroll" id="wtw_listoptionalanimations"></div>
</div>
<?php
	echo $wtwmenus->getMenuForms();
?>
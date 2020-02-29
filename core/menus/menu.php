<div id="wtw_menubase" class="wtw-menubase">
<?php
	global $wtwmenus;
	echo $wtwmenus->getMainMenu();
?>
</div>
<div id="wtw_menusettings" class="wtw-slideupmenuright" style="display:none;visibility:hidden;" >
	<img onclick="WTW.closeMenus();" class="wtw-closeright" src="/content/system/images/menuclose.png" alt="Close" title="Close" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
	<div class="wtw-menuheading">Settings Menu</div>
	<div id="wtw_menusettingsscroll" class="wtw-mainmenuscroll">
		<ul class="wtw-menuli">
			<li class="wtw-menuliholder"><img src="/content/system/images/menucamera.png" alt="Camera On" title="Camera On" class='wtw-menulefticon' />Main Camera</li>
			<li class="wtw-submenuli" style="border-bottom:1px solid #454545;"><select id="wtw_firstcamera" class="wtw-menudropdown" onchange="WTW.switchCamera(1);">
					<option value="First-Person Camera">First-Person Camera</option>
					<option value="Follow Camera">Follow Camera</option>
					<option value="Scene Camera">Scene Camera</option>
					<option value="Self Camera">Self Camera</option>
				</select><br />
				<select id="wtw_cameradimensions" class="wtw-menudropdown" onchange="WTW.switchCamera(1);">
					<option value="">2D View</option>
					<option value="Anaglyph">3D Glasses Anaglyph Red-Cyan</option>
					<option value="VR">3D VR Headset</option>
					<option value="VR Gamepad">3D VR with Gamepad</option>
	<!--			<option value="WebVR Oculus">3D WebVR Oculus</option>
					<option value="WebVR Vive">3D WebVR Vive</option>
					<option value="WebVR Windows">3D WebVR Windows</option>
					<option value="WebVR GearVR">3D WebVR Gear VR</option>
					<option value="WebVR Daydream">3D WebVR Daydream</option>
					<option value="WebVR Generic">3D WebVR Generic</option> -->
				</select><br /></li>
			<li class="wtw-menuli" onclick="WTW.toggleCameraTwo();"><img id="wtw_cameratwoicon" src="/content/system/images/menucameraoff.png" alt="Turn Camera On" title="Turn Camera On" class='wtw-menulefticon' /><div id="wtw_cameratwotext">Second Camera Off</div></li>
			<li id="wtw_cameratwoselect" class="wtw-submenuli" style="display:none;visibility:hidden;"><select id="wtw_secondcamera" class="wtw-menudropdown" onchange="WTW.switchCamera(2);">
					<option value="Scene Camera">Scene Camera</option>
					<option value="First-Person Camera">First-Person Camera</option>
					<option value="Follow Camera">Follow Camera</option>
					<option value="Self Camera">Self Camera</option>
				</select></li>
			<li><img src="/content/system/images/menuview.png" alt="Show and Hide Items" title="Show and Hide Items" class='wtw-menulefticon' />View</li>
			<li class="wtw-menuliholder"><ul class="wtw-submenuli">
					<li class="wtw-menuli" onclick="WTW.toggleCompass();"><img id="wtw_compassicon" src="/content/system/images/menuon.png" alt="Hide Compass" title="Hide Compass" class='wtw-menulefticon' /><div id="wtw_compassvisibility">Compass is Visible</div></li>
					<li class="wtw-menuli" onclick="WTW.toggleFPS();"><img id="wtw_fpsicon" src="/content/system/images/menuoff.png" alt="Show Mold Count" title="Show Mold Count" class='wtw-menulefticon' /><div id="wtw_fpsvisibility">Mold Count / FPS are Hidden</div></li>
					<li class="wtw-menuli" onclick="WTW.toggleArrows();"><img id="wtw_arrowsicon" src="/content/system/images/menuoff.png" alt="Show Arrows" title="Show Arrows" class='wtw-menulefticon' /><div id="wtw_arrowsvisibility">Arrows are Hidden</div></li>
				</ul></li>
			<li class="wtw-menuli" onclick="WTW.hide('wtw_menusettings');WTW.showSettingsMenu('wtw_menumovementspeed');"><img src="/content/system/images/menumovement.png" alt="Movement Speed" title="Movement Speed" class='wtw-menulefticon' />Movement Speed</li>
			<li class="wtw-menuli" onclick="WTW.hide('wtw_menusettings');WTW.showSettingsMenu('wtw_menugraphicsquality');"><img src="/content/system/images/menugraphics.png" alt="Graphics Quality" title="Graphics Quality" class='wtw-menulefticon' />Graphics Quality</li>
			<li class="wtw-menuli" onclick="WTW.hide('wtw_menusettings');WTW.showSettingsMenu('wtw_menushadowquality');"><img src="/content/system/images/menushadows.png" alt="Shadow Quality" title="Shadow Quality" class='wtw-menulefticon' />Shadow Quality</li>
			<li class="wtw-menuli" onclick="WTW.toggleSoundMute();"><img id="wtw_submenumute" src="/content/system/images/menumuteon.png" alt="Turn Sound On" title="Turn Sound On" class='wtw-menulefticon' /><span id="wtw_submenumutetext">Sound is Off</span></li>
<?php		echo $wtwmenus->getSettingsMenu(); ?>
		</ul>
	</div>
</div>
<div id="wtw_menuprofile" class="wtw-slideupmenuright" style="display:none;visibility:hidden;">
	<div id="wtw_menuprofilescroll" class="wtw-mainmenuscroll">
		<div id="wtw_menuloggedin" style="display:none;visibility:hidden;">
			<img onclick="WTW.closeMenus();" class="wtw-closeright" src="/content/system/images/menuclose.png" alt="Close" title="Close" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
			<div class="wtw-menuheading">My Profile</div>
			<ul class="wtw-menuli">
				<li class="wtw-menuliholder wtw-center"><img id="wtw_profileimagelg" src="/content/system/images/menuprofilebig.png" alt="Profile" title="Profile" class='wtw-profilelg' /></li>
				<li class="wtw-submenuli">Avatar Display Name</li>
				<li class="wtw-submenuli"><div id="wtw_menudisplayname" class="wtw-indentbold" onclick="WTW.editProfile();"></div>
					<input type="text" id="wtw_teditdisplayname" class="wtw-hide" /></li>
				<li class="wtw-submenuli">User Name</li>
				<li class="wtw-submenuli"><div id="wtw_menuusername" class="wtw-indentbold" onclick="WTW.editProfile();">UserName</div>
					<input type="text" id="wtw_teditusername" autocomplete="username" class="wtw-hide" /></li>
				<li class="wtw-submenuli">Email Address</li>
				<li class="wtw-submenuli"><div id="wtw_menuemail" class="wtw-indentbold" onclick="WTW.editProfile();">UserName</div>
					<input type="text" id="wtw_teditemail" autocomplete="email" class="wtw-hide" /></li>
				<li class="wtw-menuliholder"><div id="wtw_profileerrortext" style="color:red;margin-left:10px;"></div></li>
				<li id="wtw_menusaveprofile" class="wtw-menuli wtw-hide" onclick="WTW.saveProfile();"><img src="/content/system/images/menulogin.png" alt="Save Profile" title="Save Profile" class='wtw-menulefticon' /><div style="color:yellow;">Save Profile</div></li>
				<li id="wtw_menucancelsaveprofile" class="wtw-menuli wtw-hide" onclick="WTW.cancelEditProfile();"><img src="/content/system/images/menulogin.png" alt="Cancel" title="Cancel" class='wtw-menulefticon' />Cancel</li>
				<li class="wtw-submenuli"><hr /></li>
				<li class="wtw-menuli" class="wtw-clear" onclick="WTW.editProfile();"><img src="/content/system/images/menueditprofile.png" alt="Edit My Profile" title="Edit My Profile" class='wtw-menulefticon' />Edit My Profile</li>
				<li class="wtw-menuli" onclick="WTW.showSettingsMenu('wtw_menuavatar');WTW.setCameraOnAvatar();"><img src="/content/system/images/menueditavatar.png" alt="Edit My Avatar" title="Edit My Avatar" class='wtw-menulefticon' />Edit My Avatar</li>
				<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.openWebpage('https://www.walktheweb.com/my-3d-stats/','_blank');"><img src="/content/system/images/menustats.png" alt="My 3D Stats" title="My 3D Stats" class='wtw-menulefticon' />My 3D Stats</li>
				<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.openWebpage('https://www.walktheweb.com/account/password/','_blank');"><img src="/content/system/images/menupassword.png" alt="Change Password" title="Change Password" class='wtw-menulefticon' />Change Password</li>
				<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.logOut();"><img src="/content/system/images/menulogout.png" alt="Log Out" title="Log Out" class='wtw-menulefticon' /><div>Log Out</div></li>
			</ul>
		</div>
		<div id="wtw_menulogin">
			<form>
				<img onclick="WTW.closeMenus();" class="wtw-closeright" src="/content/system/images/menuclose.png" alt="Close" title="Close" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
				<img src="/content/system/images/menuq.png" alt="Show Help" title="Show Help" class='wtw-menuq' onclick="WTW.toggle('wtw_loginnote');" />
				<div class="wtw-menuheading">Login</div>
				<div id="wtw_loginnote" class="wtw-menunote" style="display:none;visibility:hidden;">Login or click Create Account to get started.</div>
				<ul class="wtw-menuli" style="border-bottom:1px solid #454545;">
					<li class="wtw-submenuli">Username or Email</li>
					<li class="wtw-submenuli"><input type="text" id="wtw_tlogin" autocomplete="username" /></li>
					<li class="wtw-submenuli">Password</li>
					<li class="wtw-submenuli"><input type="password" id="wtw_tpassword" autocomplete="current-password" /></li>
					<li class="wtw-submenuli"><input type="checkbox" id="wtw_trememberlogin" /> Remember Username</li>
					<li class="wtw-menuliholder"><div id="wtw_loginerrortext" style="color:red;margin-left:10px;"></div></li>
					<li class="wtw-menuli" onclick="WTW.loginAttempt();"><img src="/content/system/images/menulogin.png" alt="Login" title="Login" class='wtw-menulefticon' /><div style="color:yellow;">Login</div></li>
				</ul>
				<ul class="wtw-menuli">
					<li class="wtw-menuli" onclick="WTW.showSettingsMenu('wtw_menuavatar');WTW.setCameraOnAvatar();"><img src="/content/system/images/menueditavatar.png" alt="Edit My Avatar" title="Edit My Avatar" class='wtw-menulefticon' />Edit My Avatar</li>
					<li class="wtw-menuli" onclick="WTW.openRecoveryForm();"><img src="/content/system/images/menupassword.png" alt="Recover Login" title="Recover Login" class='wtw-menulefticon' /><div>Forgot My Login</div></li>
					<li class="wtw-menuli" onclick="WTW.openRegisterForm();">
						<img src="/content/system/images/menuregister.png" alt="Create My Account" title="Create My Account" class='wtw-menulefticon' /><div style="color:yellow;">Create My Account</div></li>
				</ul>
			</form>
		</div>
		<div id="wtw_menupasswordrecovery" class="wtw-hide">
			<form>
				<img onclick="WTW.closeMenus();" class="wtw-closeright" src="/content/system/images/menuclose.png" alt="Close" title="Close" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
				<img src="/content/system/images/menuq.png" alt="Show Help" title="Show Help" class='wtw-menuq' onclick="WTW.toggle('wtw_loginnote');" />
				<div class="wtw-menuheading">Recover My Login</div>
				<div id="wtw_loginnote" class="wtw-menunote" style="display:none;visibility:hidden;">Note</div>
				<ul class="wtw-menuli" style="border-bottom:1px solid #454545;">
					<li class="wtw-submenuli">Email</li>
					<li class="wtw-submenuli"><input type="text" id="wtw_trecoverbyemail" autocomplete="email" /></li>
					<li class="wtw-menuliholder"><div id="wtw_recovererrortext" style="color:red;margin-left:10px;"></div></li>
					<li class="wtw-menuli" onclick="WTW.recoverLogin();"><img src="/content/system/images/menulogin.png" alt="Recover Login" title="Recover Login" class='wtw-menulefticon' /><div style="color:yellow;">Recover Login</div></li>
					<li class="wtw-menuli" onclick=""><img src="/content/system/images/menupassword.png" alt="Recover Login" title="Recover Login" class='wtw-menulefticon' /><div style="color:yellow;">Recover Password</div></li>
				</ul>
				<ul class="wtw-menuli">
					<li class="wtw-menuli" onclick="WTW.openLoginForm();">
						<img src="/content/system/images/menulogin.png" alt="Back to Login" title="Back to Login" class='wtw-menulefticon' />Back to Login</li>
				</ul>
			</form>
		</div>
		<div id="wtw_menuregister" style="display:none;visibility:hidden;">
			<form>
				<img onclick="WTW.closeMenus();" class="wtw-closeright" src="/content/system/images/menuclose.png" alt="Close" title="Close" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
				<div class="wtw-menuheading">Create My Account</div>
				<ul class="wtw-menuli" style="border-bottom:1px solid #454545;">
					<li class="wtw-submenuli">Username</li>
					<li class="wtw-submenuli"><input type="text" id="wtw_tnewlogin" autocomplete="username" /></li>
					<li class="wtw-submenuli">Email</li>
					<li class="wtw-submenuli"><input type="text" id="wtw_tnewemail" autocomplete="email" /></li>
					<li class="wtw-submenuli">Password</li>
					<li class="wtw-submenuli"><input type="password" id="wtw_tnewpassword" autocomplete="new-password" onkeyup="WTW.checkPassword(this,'wtw_tpasswordstrength');" onfocus="WTW.registerPasswordFocus();" onblur="WTW.registerPasswordBlur();" /></li>
					<li class="wtw-submenuli" id="wtw_passwordstrengthdiv" style="display:none;visibility:hidden;"><input type="text" id="wtw_tpasswordstrength" style="display:none;visibility:hidden;" /></li>
					<li class="wtw-submenuli">Confirm Password</li>
					<li class="wtw-submenuli"><input type="password" id="wtw_tnewpassword2" autocomplete="new-password" onkeyup="WTW.checkPasswordConfirm('wtw_tnewpassword', 'wtw_tnewpassword2', 'wtw_registererrortext');" /></li>
					<li class="wtw-menuliholder"><div id="wtw_registererrortext" style="color:red;margin-left:10px;"></div></li>
					<li class="wtw-menuli" onclick="WTW.createAccount();return false;"><img src="/content/system/images/menuregister.png" alt="Create Account" title="Create Account" class='wtw-menulefticon' /><div style="color:yellow;">Create Account</div></li>
				</ul>
				<ul class="wtw-menuli">
					<li class="wtw-menuli" onclick="WTW.openLoginForm();">
						<img src="/content/system/images/menulogin.png" alt="Return to Login" title="Return to Login" class='wtw-menulefticon' /><div>Return to Login</div></li>
				</ul>
			</form>
		</div>
	</div>
</div>
<div id="wtw_menuhelp" class="wtw-slideupmenuright" style="display:none;visibility:hidden;">
	<img onclick="WTW.closeMenus();" class="wtw-closeright" src="/content/system/images/menuclose.png" alt="Close" title="Close" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
	<div class="wtw-menuheading">Help Menu</div>
	<div id="wtw_menuhelpscroll" class="wtw-mainmenuscroll">
		<ul class="wtw-menuli">
			<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.openWebpage('https://www.walktheweb.com/wiki/','_blank');"><img src="/content/system/images/menuwtwhelp.png" alt="WalkTheWeb Help" title="WalkTheWeb Help" class='wtw-menulefticon' />WalkTheWeb Help</li>
			<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.showSettingsMenu('wtw_menucontrols');"><img src="/content/system/images/menumovement.png" alt="Movement Controls" title="Movement Controls" class='wtw-menulefticon' />Movement Controls</li>
			<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.openWebpage('https://www.walktheweb.com/knowledgebase_category/3d-browsing/','_blank');"><img src="/content/system/images/menuquestions.png" alt="Common Question" title="Common Question" class='wtw-menulefticon' />Common Question</li>
			<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.openWebpage('https://www.walktheweb.com/knowledgebase_category/tutorials/','_blank');"><img src="/content/system/images/menututorials.png" alt="Tutorials" title="Tutorials" class='wtw-menulefticon' />Tutorials</li>
			<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.openWebpage('https://www.walktheweb.com/knowledgebase_category/tutorials/','_blank');"><img src="/content/system/images/menutools.png" alt="Admin Help" title="Admin Help" class='wtw-menulefticon' />Admin Help</li>
			<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.openWebpage('https://www.walktheweb.com/useragreement/','_blank');"><img src="/content/system/images/menueula.png" alt="End User License Agreement" title="End User License Agreement" class='wtw-menulefticon' />End User License Agreement</li>
			<li class="wtw-menuli" onclick="WTW.closeMenus();WTW.openWebpage('https://www.walktheweb.com/contact-us/','_blank');"><img src="/content/system/images/menuinfo.png" alt="Contact WalkTheWeb" title="Contact WalkTheWeb" class='wtw-menulefticon' />Contact WalkTheWeb</li>
		</ul>
	</div>
</div>
<div id="wtw_menucontrols" class="wtw-slideupmenuright" style="display:none;visibility:hidden;">
	<img onclick="WTW.closeMenus();" class="wtw-closeright" src="/content/system/images/menuclose.png" alt="Close" title="Close" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
	<div class="wtw-menuheading">Movement Controls</div>
	<div id="wtw_menucontrolsscroll" class="wtw-mainmenuscroll">
		<ul class="wtw-menuli">
			<li id="wtw_helpglassesdiv" class="wtw-submenublockli">
				<a href="https://www.walktheweb.com/shop/walktheweb-3d-glasses/" target="_blank"><img src="/content/system/images/3DGlassesFor5.png" alt="3D Glasses for $5" title="3D Glasses for $5" style="width:95%;height:auto;margin:2%;" /></a /></li>
			<li class="wtw-menuli" onclick="WTW.hide('wtw_helpkeyboarddiv');WTW.hide('wtw_helptouchdiv');WTW.hide('wtw_helpcameradiv');WTW.toggle('wtw_helpmousediv');WTW.showSettingsMenu('wtw_menucontrols');"><img src="/content/system/images/menumouse.png" alt="Mouse Controls" title="Movement Controls" class='wtw-menulefticon' />Mouse Controls</li>
			<li id="wtw_helpmousediv" class="wtw-submenublockli" style="display:none;visibility:hidden;">
				<div style='font-size:.8em;text-align:center;'>Mouse must be over 3D Scene to move.</div>
				<img src="/content/system/images/helpmouse.png" alt="Mouse Walk Controls" title="Mouse Walk Controls" style="width:95%;height:auto;margin:2%;" /><br />
				<img src="/content/system/images/helpmousemove.png" alt="Mouse Pan Controls" title="Mouse Pan Controls" style="width:100%;height:auto;" /></li>
			<li class="wtw-menuli" onclick="WTW.hide('wtw_helpmousediv');WTW.hide('wtw_helptouchdiv');WTW.hide('wtw_helpcameradiv');WTW.toggle('wtw_helpkeyboarddiv');WTW.showSettingsMenu('wtw_menucontrols');"><img src="/content/system/images/menukeys.png" alt="Keyboard Controls" title="Movement Controls" class='wtw-menulefticon' />Keyboard Controls</li>
			<li id="wtw_helpkeyboarddiv" class="wtw-submenublockli" style="display:none;visibility:hidden;">
				<div style='font-size:.8em;text-align:center;'>Mouse must be over 3D Scene to move.</div>
				<img src="/content/system/images/helpkeyboard.png" alt="Keyboard Controls" title="Keyboard Controls" style="width:95%;height:auto;margin:2%;" /></li>
			<li class="wtw-menuli" onclick="WTW.hide('wtw_helpmousediv');WTW.hide('wtw_helpkeyboarddiv');WTW.hide('wtw_helpcameradiv');WTW.toggle('wtw_helptouchdiv');WTW.showSettingsMenu('wtw_menucontrols');"><img src="/content/system/images/menuipad.png" alt="Touch Controls" title="Touch Controls" class='wtw-menulefticon' />Touch Controls</li>
			<li id="wtw_helptouchdiv" class="wtw-submenublockli" style="display:none;visibility:hidden;"><img src="/content/system/images/helptouch3.png" alt="Touch Controls" title="Touch Controls" style="width:95%;height:auto;margin:2%;" /></li>
			<li class="wtw-menuli" onclick="WTW.hide('wtw_helpmousediv');WTW.hide('wtw_helpkeyboarddiv');WTW.hide('wtw_helptouchdiv');WTW.toggle('wtw_helpcameradiv');WTW.showSettingsMenu('wtw_menucontrols');"><img src="/content/system/images/menucamera.png" alt="Camera Views" title="Camera Views" class='wtw-menulefticon' />Camera Views <span style="font-size:.8em;color:yellow;">(Turn on 3D!)</span></li>
			<li id="wtw_helpcameradiv" class="wtw-submenublockli" style="display:none;visibility:hidden;">
				<img src="/content/system/images/helpcameras.png" alt="Camera Position and Views" title="Camera Position and Views" style="width:95%;height:auto;margin:2%;" />
			</li>
			<li class="wtw-menuli" onclick="WTW.openLoginForm();">
				<img src="/content/system/images/menulogin.png" alt="Login" title="Login" class='wtw-menulefticon' /><div style="color:yellow;">Login</div></li>
		</ul>
		<div class="wtw-center"><input type="checkbox" id="wtw_tshowhelponstart" onchange="WTW.toggleHelpOnStart();" /> Show this Menu on Start</div><br />
	</div>
</div>
<div id="wtw_menumovementspeed" class="wtw-slideupmenuright" style="display:none;visibility:hidden;">
	<img class="wtw-closeright" onclick="WTW.closeMenus();" src="/content/system/images/menuclose.png" alt="Close" title="Close" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
	<div class="wtw-menuheading">Movement Speed</div>
	<div id="wtw_menumovementspeedscroll" class="wtw-mainmenuscroll">
		<ul class="wtw-menuli">
			<li class="wtw-menuliholder"><img src="/content/system/images/menuwalk.png" alt="Walk Animation Speed" title="Walk Animation Speed" class='wtw-menulefticon' />Walk Animation Speed</li>
			<li class="wtw-submenuli">
				<input id="wtw_twalkanimationspeed" type="range" min=".1" max="1.9" value="1" step=".01" style="direction: ltr;width:240px;cursor:pointer;" onchange="WTW.changeWalkAnimationSpeed();this.blur();"/>
			</li>
		</ul>
		<ul class="wtw-menuli">
			<li class="wtw-menuliholder"><img src="/content/system/images/menuwalk.png" alt="Walk Speed" title="Walk Speed" class='wtw-menulefticon' />Walk Distance Traveled</li>
			<li class="wtw-submenuli">
				<input id="wtw_twalkspeed" type="range" min=".1" max="1.9" value="1" step=".01" style="direction: ltr;width:240px;cursor:pointer;" onchange="WTW.changeWalkSpeed();this.blur();"/>
			</li>
		</ul>
		<ul class="wtw-menuli">
			<li class="wtw-menuliholder"><img src="/content/system/images/menuwalk.png" alt="Turn Animation Speed" title="Turn Animation Speed" class='wtw-menulefticon' />Turn Animation Speed</li>
			<li class="wtw-submenuli">
				<input id="wtw_tturnanimationspeed" type="range" min=".1" max="1.9" value="1" step=".01" style="direction: ltr;width:240px;cursor:pointer;" onchange="WTW.changeTurnAnimationSpeed();this.blur();"/>
			</li>
		</ul>
		<ul class="wtw-menuli">
			<li class="wtw-menuliholder"><img src="/content/system/images/menuwalk.png" alt="Turn Speed" title="Turn Speed" class='wtw-menulefticon' />Turn Rotation Traveled</li>
			<li class="wtw-submenuli">
				<input id="wtw_tturnspeed" type="range" min=".1" max="1.9" value="1" step=".01" style="direction: ltr;width:240px;cursor:pointer;" onchange="WTW.changeTurnSpeed();this.blur();"/>
			</li>
		</ul>
	</div>
</div>
<div id="wtw_menugraphicsquality" class="wtw-slideupmenuright" style="display:none;visibility:hidden;">
	<img class="wtw-closeright" onclick="WTW.closeMenus();" src="/content/system/images/menuclose.png" alt="Close" title="Close" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
	<div class="wtw-menuheading">Graphics Quality</div>
	<div id="wtw_menugraphicsqualityscroll" class="wtw-mainmenuscroll">
		<div id="wtw_graphicsqualitynote" class="wtw-menunote" style="display:none;visibility:hidden;">Lower Quality Graphics provides faster animation.<br /><br />
			Higher Quality Graphics provides the best image and texture quality; especially when you move close to an object.<br /><br />
			This setting allows you to select the best balance between animation speed and Graphic Quality.</div>
		<ul class="wtw-menuli">
			<li class="wtw-menuliholder">
				<img src="/content/system/images/menuq.png" alt="Show Help" title="Show Help" class='wtw-menuq' onclick="WTW.toggle('wtw_graphicsqualitynote');" />
				<img src="/content/system/images/menugraphics.png" alt="Graphics Quality" title="Graphics Quality" class='wtw-menulefticon' />Graphics Quality</li>
			<li class="wtw-submenuli">
				<input type="button" value="Lower" style="display:inline-block;cursor:pointer;" onclick="WTW.changeGraphic(-1);" />
				<input id="wtw_tgraphicsetting" type="range" min="0" max="2" defaultValue="0" step="1" style="cursor:pointer;" onchange="WTW.changeGraphic(this.value);"/>
				<input type="button" value="Higher" style="display:inline-block;cursor:pointer;" onclick="WTW.changeGraphic(1);" />
			</li>
			<li id="wtw_graphichelptitle" class="wtw-submenuli wtw-menunoteset">Graphics (Optimum Balance)</li>
			<li id="wtw_graphichelpadmin" class="wtw-submenuli wtw-menunoteset" style="display:none;visibility:hidden;font-size:.8em;color:red;">Admin Mode Overrides to Optimum</li>
		</ul>
	</div>
</div>
<div id="wtw_menushadowquality" class="wtw-slideupmenuright" style="display:none;visibility:hidden;">
	<img class="wtw-closeright" onclick="WTW.closeMenus();" src="/content/system/images/menuclose.png" alt="Close" title="Close" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
	<div class="wtw-menuheading">Shadow Quality</div>
	<div id="wtw_menushadowqualityscroll" class="wtw-mainmenuscroll">
		<div id="wtw_shadowqualitynote" class="wtw-menunote" style="display:none;visibility:hidden;">Lower Quality or turning shadows off provides faster animation.<br /><br />
			Higher Quality Shadows provides the best shadow resolution.<br /><br />
			This setting allows you to select the best balance between animation speed and Shadow Quality.</div>
		<ul class="wtw-menuli">
			<li class="wtw-menuliholder">
				<img src="/content/system/images/menuq.png" alt="Show Help" title="Show Help" class='wtw-menuq' onclick="WTW.toggle('wtw_shadowqualitynote');" />
				<img src="/content/system/images/menushadows.png" alt="Shadow Quality" title="Shadow Quality" class='wtw-menulefticon' />Shadow Quality</li>
			<li class="wtw-submenuli">
				<input type="button" value="Lower" style="display:inline-block;cursor:pointer;" onclick="WTW.changeShadow(-1);" />
				<input id="wtw_tshadowsetting" type="range" min="0" max="3" defaultValue="0" step="1" style="cursor:pointer;" onchange="WTW.changeShadow(this.value);"/>
				<input type="button" value="Higher" style="display:inline-block;cursor:pointer;" onclick="WTW.changeShadow(1);" />
			</li>
			<li id="wtw_shadowhelptitle" class="wtw-submenuli wtw-menunoteset">Shadows (Some - Low Resolution)</li>
		</ul>
	</div>
</div>
<div id="wtw_menuavatar" class="wtw-slideupmenuright" style="display:none;visibility:hidden;">
	<img class="wtw-closeright" onclick="WTW.closeSetupMode();" src="/content/system/images/menuclose.png" alt="Close" title="Close" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
	<div class="wtw-menuheading">Avatar Settings</div>
	<div id="wtw_menuavatarscroll" class="wtw-mainmenuscroll">
		<div id="wtw_avatarmenudiv">
			<ul class="wtw-menuli">
				<li class="wtw-menuli" onclick="WTW.switchAvatarMenu(1);"><img src="/content/system/images/menuavataridson.png" alt="Avatar Display Name" title="Avatar Display Name" class='wtw-menulefticon' /><div>Avatar Display Name</div></li>
				<li id="wtw_menuavatardisplaynamediv" class="wtw-submenublockli" style="display:none;visibility:hidden;"><div class="wtw-menusubtext">Avatar Display Name:<br />
					<input id='wtw_tavatardisplayname' type='text' maxlength="255" onclick="WTW.checkKey(this, 'displayname', 0, 0);" onkeyup="WTW.checkKey(this, 'displayname', 0, 0);" onblur="WTW.checkKey(this, 'displayname', 0, 1);WTW.saveAvatarDisplayName();" /></div><br />
					<div id='wtw_displaybannote' class='wtw-menusmalltext'>Be respectful of others when choosing a name. 
						Reported offenders may be banned perminently.
						Note that all names used are recorded with your account.<br />
					</div>
				</li>
				<li id="wtw_menuavatarcolor" class="wtw-menuli" onclick="WTW.switchAvatarMenu(2);"><img src="/content/system/images/menupaint.png" alt="Avatar Colors" title="Avatar Colors" class='wtw-menulefticon' /><div>Avatar Colors</div></li>
				<li id="wtw_menuavatarcolordiv" class="wtw-submenublockli" style="display:none;visibility:hidden;"><div class="wtw-menusubtext">Select Item to Color:</div>
					<div id="wtw_editavatarparts"></div>
				</li>
				<li class="wtw-menuli" onclick="WTW.switchAvatarMenu(3);"><img src="/content/system/images/menuanimations.png" alt="Avatar Animations" title="Avatar Animations" class='wtw-menulefticon' /><div>Avatar Animations</div></li>
				<li id="wtw_menuavataranimationsdiv" class="wtw-submenublockli" style="display:none;visibility:hidden;">
					<div style='font-size:.8em;text-align:center;background-color:#000000;border:1px solid gray;'>For Mouse or Keyboard Controls<br />Mouse must be over 3D Scene to move.</div>
					<div class="wtw-menusubtext">Select Animation to Edit:</div>
					<ul style="padding:0px;">
						<li id="wtw_animation-onenter" class="wtw-avatarli" onclick="WTW.editEnterAnimation();"><div class="wtw-inlineindent">Enter 3D Scene</div></li>
						<li id="wtw_animationdiv-enter" class="wtw-avatarli" style="display:none;visibility:hiden;"><div class="wtw-inlineindent2">
						<select id="wtw_tselectavataranimation-enter" onchange="WTW.saveAvatarEnterAnimation();">
							<option value='1'>Fast Pop</option>
							<option value='2'>Fade In</option>
							<option value='3'>Smokey Arrival</option>
							<option value='4'>Transport Rings</option>
							<option value='5'>Transport</option>
							<option value='6'>Atomic Enhancement</option>
							<option value='7'>Quick Grow</option>
							<option value='8'>Lightning Rise</option>
							<option value='9'>Smokey Evolution</option>
							<option value='10'>Radioactive Spawn</option>
							<option value='11'>Beam Force</option>
						</select></div></li>
					</ul>
					<div id="wtw_editavataranimations"></div>
					<a id="wtw_viewanimations"></a>
				</li>
				<li class="wtw-menuli" onclick="WTW.switchAvatarMenu(4);"><img src="/content/system/images/menueditavatar.png" alt="Change My Avatar" title="Change My Avatar" class='wtw-menulefticon' /><div>Change My Avatar</div></li>
				<li id="wtw_menuavatarchangediv" class="wtw-submenublockli" style="display:none;visibility:hidden;"><div class="wtw-menusubtext">Select Avatar in 3D Scene</div></li>
			</ul>
			<div id="wtw_loginnote" class="wtw-loginnote">Login for more options.</div>
			<div class="wtw-greenmenubutton" onclick="WTW.closeSetupMode();">Close Avatar Settings</div>
		</div>
	</div>
</div>
<div id="wtw_menuoptionalanimations" class="wtw-slideupanimations" style="display:none;visibility:hidden;">
	<img class="wtw-closeright" onclick="WTW.hide('wtw_menuoptionalanimations');" src="/content/system/images/menuclose.png" alt="Close Animations" title="Close Animations" onmouseover="this.src='/content/system/images/menuclosehover.png';" onmouseout="this.src='/content/system/images/menuclose.png';" />
	<div class="wtw-menuheading">Press and Hold to Play</div>
	<div class="wtw-horizontalscroll" id="wtw_listoptionalanimations"></div>
</div>
<?php
	echo $wtwmenus->getMenuForms();
?>
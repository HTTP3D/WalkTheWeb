<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {
	$zuseremail = $wtwhandlers->getVal('useremail','');
?>
<!DOCTYPE html>
<html>
<head>
	<title>Create 3D Website</title>
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
	<link rel="stylesheet" type="text/css" href="/core/styles/wtw_create3dwebsite.css" />
	<script>
		function WTWJS() {}
		var WTW = new WTWJS();
		var wtw_devmode = 1;
	</script>
	<script src="/core/scripts/prime/wtw_utilities.js"></script>
	<script src="/core/scripts/prime/wtw_create3dwebsite.js"></script>
</head>
<body style="background-color:#4d4d4d;">
	<div id='wtw_wizardcomplete' style='display:none;visibility:hidden;'>
		<div id="wtw_newwebsitedev" class="wtw-dashboardpage">
			<h2 class="wtw-dashboardheading">Your New 3D Website</h2>
			<div class="wtw-bold">Welcome to <span style="color:blue">WalkTheWeb<sup>®</sup></span> 3D Internet!<br /><br /></div><div style="clear:both;"></div>
			<a id="wtw_visitwebsite" href="" class="wtw-createbutton" target="_blank">Visit your New 3D Website!</a>
			<div style="clear:both;"></div>
			<div style="text-align:center;max-width:900px;margin: 10px auto 10px auto;">
				<div class="wtw-loginlabel">Hosted At</div><div><?php echo $wtwhandlers->domainurl; ?></div>
				<div style="clear:both;"></div>
				<div class="wtw-loginlabel">3D Website Name</div><div id='wtw_completewebsitename'></div>
				<div style="clear:both;"></div>
				<div class="wtw-loginlabel">3D Community</div><div id='wtw_completecommunityurl'></div>
				<div style="clear:both;"></div><br />
				<div class="wtw-loginlabel">3D Building</div><div id='wtw_completebuildingurl'></div>
				<div style="clear:both;"></div><br />
			</div>
		</div>
	</div>	
	<div id="wtw_wizard" style="display:none;visibility:hidden;text-align:center;">
		<div style="display:inline-block;margin-right:auto;margin-left:auto;">
			<div id="wtw_wizardstep1">
				Step 1<br />
				3D Building
			</div><div class="wtw-wizardstepdivider"><br />&#8594;</div>
			<div id="wtw_wizardstep2">
				Step 2<br />
				3D Scene
			</div><div class="wtw-wizardstepdivider"><br />&#8594;</div>
			<div id="wtw_wizardstep3">
				Step 3<br />
				Name it!
			</div><div class="wtw-wizardstepdivider"><br />&#8594;</div>
			<div id="wtw_wizardstep4">
				Step 4<br />
				Permissions
			</div><div class="wtw-wizardstepdivider"><br />&#8594;</div>
			<div id="wtw_wizardstep5">
				Step 5<br />
				Create it!
			</div>
		</div>
		<div style="clear:both;"></div>
		<div id="wtw_wizard1" class="wtw-dashboardpage" style="display:none;visibility:hidden;">
			<div id="wtw_step1_0" class="wtw-navbuttonback" onclick="" style="visibility:hidden;">&#8592; Back</div>
			<div id="wtw_step1_2" class="wtw-navbuttonnext" onclick="WTW.startWizard(2);" style="visibility:hidden;">Next &#8594;</div>
			<div class="wtw-searchdiv">
				<div class="wtw-colicons">
					<img id='wtw_downloadscol1' src='/content/system/images/col1.png' alt='1 Column' title='1 Column' class='wtw-tinyimg' onclick='WTW.updateCols(this, 1);' />
					<img id='wtw_downloadscol2' src='/content/system/images/col2set.png' alt='2 Columns' title='2 Columns' class='wtw-tinyimgselected' onclick='WTW.updateCols(this, 2);' />
					<img id='wtw_downloadscol3' src='/content/system/images/col3.png' alt='3 Columns' title='3 Columns' class='wtw-tinyimg' onclick='WTW.updateCols(this, 3);' />
					<img id='wtw_downloadscol4' src='/content/system/images/col4.png' alt='4 Columns' title='4 Columns' class='wtw-tinyimg' onclick='WTW.updateCols(this, 4);' />
				</div>
			</div>
			<h2 class="wtw-dashboardheading"><span style="color:blue">WalkTheWeb<sup>®</sup></span> Step 1 - Select a 3D Building</h2>
			<div class="wtw-searchlabel">Search:</div> <input id='wtw_tbuildingsearch' name='wtw_tbuildingsearch' type='text' value='' size='20' maxlength='255' class="wtw-textbox" autocomplete="" /> 
			<input name='wtw_bbuildingsearch' type='button' value='Search' onclick="WTW.buildingSearch();" class="wtw-searchbutton" /><div style='min-height:20px;clear:both;'></div><hr />
			<div id="wtw_buildtempsearchresults"></div>
			<div style="clear:both;"></div><br /><br />
			<div id="wtw_step1_0b" class="wtw-navbuttonback" onclick="" style="visibility:hidden;">&#8592; Back</div>
			<div id="wtw_step1_2b" class="wtw-navbuttonnext" onclick="WTW.startWizard(2);" style="visibility:hidden;">Next &#8594;</div>
			<div style="clear:both;"></div>
		</div>
		<div id="wtw_wizard2" class="wtw-dashboardpage" style="display:none;visibility:hidden;">
			<div id="wtw_step2_1" class="wtw-navbuttonback" onclick="WTW.startWizard(1);">&#8592; Back</div>
			<div id="wtw_step2_3" class="wtw-navbuttonnext" onclick="WTW.startWizard(3);" style="visibility:hidden;">Next &#8594;</div>
			<div class="wtw-searchdiv">
				<div class="wtw-colicons">
					<img id='wtw_2downloadscol1' src='/content/system/images/col1.png' alt='1 Column' title='1 Column' class='wtw-tinyimg' onclick='WTW.updateCols(this, 1);' />
					<img id='wtw_2downloadscol2' src='/content/system/images/col2set.png' alt='2 Columns' title='2 Columns' class='wtw-tinyimgselected' onclick='WTW.updateCols(this, 2);' />
					<img id='wtw_2downloadscol3' src='/content/system/images/col3.png' alt='3 Columns' title='3 Columns' class='wtw-tinyimg' onclick='WTW.updateCols(this, 3);' />
					<img id='wtw_2downloadscol4' src='/content/system/images/col4.png' alt='4 Columns' title='4 Columns' class='wtw-tinyimg' onclick='WTW.updateCols(this, 4);' />
				</div>
			</div>
			<h2 class="wtw-dashboardheading">Step 2 - Select a 3D Community Scene</h2>
			<div class="wtw-searchlabel">Search:</div> <input id='wtw_tcommunitysearch' name='wtw_tcommunitysearch' type='text' value='' size='20' maxlength='255' class="wtw-textbox" autocomplete="" /> 
			<input name='wtw_bcommunitysearch' type='button' value='Search' onclick="WTW.communitySearch();" class="wtw-searchbutton" /><div style='min-height:20px;clear:both;'></div><hr />
			<div id="wtw_communitytempsearchresults"></div>
			<div style="clear:both;"></div><br /><br />
			<div id="wtw_step2_1b" class="wtw-navbuttonback" onclick="WTW.startWizard(1);">&#8592; Back</div>
			<div id="wtw_step2_3b" class="wtw-navbuttonnext" onclick="WTW.startWizard(3);" style="visibility:hidden;">Next &#8594;</div>
			<div style="clear:both;"></div>
		</div>
		<div id="wtw_wizard3" class="wtw-dashboardpage" style="display:none;visibility:hidden;">
			<div id="wtw_step3_2" class="wtw-navbuttonback" onclick="WTW.saveWebsiteSettings();WTW.startWizard(2);">&#8592; Back</div>
			<div id="wtw_step3_4" class="wtw-navbuttonnext" onclick="WTW.saveWebsiteSettings();WTW.startWizard(4);" style="visibility:hidden;">Next &#8594;</div>
			<h2 class="wtw-dashboardheading">Step 3 - Name Your 3D Website</h2>

			<div id="wtw_sitediv" class="wtw-host" style="display:none;visibility:hidden;">
				<h2 class="wtw-dashboardheading">3D Website Settings</h2>
				<div style="text-align:center;">
					<div class="wtw-bold">
						Select Your 3D Website URL Path<br /><br />
					</div><div style="clear:both;"></div>
				</div>
				<div style="text-align:left;">
					<div class="wtw-loginlabel">3D Website URL</div>
					<div style="display:inline;margin:0px 0px 20px 0px;">3D Websites use names under the 3D Host. You can change the name and select the <b>Check Availability</b> button.<br /><div style="color:green;">Outline in Green means available.</div></div>
					<div style="clear:both;"></div>
					<div style="text-align:center;">
						<div><div id="wtw_hosturl" class="wtw-hosturl">https://3d.walktheweb.com/</div><input type="text" id="wtw_webname" name="wtw_webname" class="wtw-textbox" maxlength="255" value="" onkeyup="WTW.resetWebname();" /></div><div style="clear:both;"></div>
						<div id="wtw_availability_error" style="color:red;font-weight:bold;margin-left:auto;margin-right:auto;"></div>
						<div id="wtw_availability" class="wtw-loginbutton" onclick="WTW.checkWebname();" style="margin-left:auto;margin-right:auto;"><img src="/content/system/images/menuwtw.png" alt="WalkTheWeb" title="WalkTheWeb" class="wtw-loginlogo"/><div style="margin-top:10px;">Check Availability</div></div>

						<div style="clear:both;"></div>
					</div>
					<div class="wtw-loginlabel">3D Website Name</div><div style="display:inline;margin:0px 0px 20px 0px;"><input type="text" id="wtw_tstorename" class="wtw-textbox" maxlength="255" value="" style="width:350px;"/><br />The 3D Website Name will be displayed on the 3D Building where applicable.</div><div style="clear:both;"></div><br /><br />
					
					<div id="wtw_savewebsite" class="wtw-loginbutton" onclick="WTW.saveWebsiteSettings();WTW.startWizard(4);" style="margin-left:auto;margin-right:auto;"><img src="/content/system/images/menuwtw.png" alt="WalkTheWeb" title="WalkTheWeb" class="wtw-loginlogo"/><div style="margin-top:10px;">Save and Continue</div></div>
				</div>
			</div>

			<div style="clear:both;"></div><br /><br />

			<div id="wtw_step3_2b" class="wtw-navbuttonback" onclick="WTW.saveWebsiteSettings();WTW.startWizard(2);">&#8592; Back</div>
			<div id="wtw_step3_4b" class="wtw-navbuttonnext" onclick="WTW.saveWebsiteSettings();WTW.startWizard(4);" style="visibility:hidden;">Next &#8594;</div>
			<div style="clear:both;"></div>
		</div>
		<div id="wtw_wizard4" class="wtw-dashboardpage" style="display:none;visibility:hidden;">
			<div id="wtw_step4_3" class="wtw-navbuttonback" onclick="WTW.startWizard(3);">&#8592; Back</div>
			<div id="wtw_step4_5" class="wtw-navbuttonnext" onclick="WTW.startWizard(5);" style="visibility:hidden;">Next &#8594;</div>
			<h2 class="wtw-dashboardheading">Step 4 - Permissions</h2>

			<div id="wtw_hostlogindiv" class="wtw-login" style="display:none;visibility:hidden;">
				<h2 class="wtw-dashboardheading">3D Host Login</h2>
				<div style="text-align:center;">
					<div class="wtw-bold">
						This is your WalkTheWeb Hosted 3D Website Login.<br /><br />
					</div><div style="clear:both;"></div>
					<div class="wtw-loginlabel">Email</div><div><input type="text" id="wtw_thostemail" autocomplete="email" class="wtw-textbox" maxlength="255" /></div><div style="clear:both;"></div>
					<div class="wtw-loginlabel">Password</div><div><input type="password" id="wtw_thostpassword" autocomplete="current-password" class="wtw-textbox" maxlength="255" /></div><div style="clear:both;"></div>
					<div id="wtw_hostloginerrortext" class="wtw-errortext">&nbsp;</div><br />
					<div class="wtw-loginbutton" onclick="WTW.hostLogin();" style="margin-left:auto;margin-right:auto;"><img src="/content/system/images/menuwtw.png" alt="WalkTheWeb" title="WalkTheWeb" class="wtw-loginlogo"/><div style="margin-top:10px;">Login</div></div>
				</div>
			</div>
			<div id="wtw_logindiv" class="wtw-login" style="display:none;visibility:hidden;">
				<h2 class="wtw-dashboardheading"><span style="color:blue">WalkTheWeb<sup>®</sup></span> Login</h2>
				<div style="text-align:center;">
					<div class="wtw-bold">
						This is your 3D Website Login.<br />Login or click Create Login<br /><br />
					</div><div style="clear:both;"></div>
					<div class="wtw-loginlabel">Email</div><div><input type="text" id="wtw_temail" autocomplete="email" class="wtw-textbox" maxlength="255" /></div><div style="clear:both;"></div>
					<div class="wtw-loginlabel">Password</div><div><input type="password" id="wtw_tpassword" autocomplete="current-password" class="wtw-textbox" maxlength="255" /></div><div style="clear:both;"></div>
					<div id="wtw_loginerrortext" class="wtw-errortext">&nbsp;</div><br />
					<div class="wtw-loginbutton" onclick="WTW.login();" style="margin-left:auto;margin-right:auto;"><img src="/content/system/images/menuwtw.png" alt="WalkTheWeb" title="WalkTheWeb" class="wtw-loginlogo"/><div style="margin-top:10px;">Login</div></div>
					<div class="wtw-loginwide" onclick="WTW.createLogin();" style="margin-left:auto;margin-right:auto;">Create Login</div>
					<div class="wtw-loginwide" onclick="WTW.showRecoverPassword();" style="width:220px;">Forgot Password?</div>
				</div>
			</div>
			<div id="wtw_registerdiv" class="wtw-login" style="display:none;visibility:hidden;">
				<h2 class="wtw-dashboardheading"><span style="color:blue">WalkTheWeb<sup>®</sup></span> Create Login</h2>
				<div style="text-align:center;">
					<div class="wtw-bold">
						This is your 3D Website Login.<br /><br />
					</div><div style="clear:both;"></div>
					<div class="wtw-loginlabel">Email</div><div><input type="text" id="wtw_tnewemail" autocomplete="email" class="wtw-textbox" maxlength="256" /></div><div style="clear:both;"></div>

					<div class="wtw-loginlabelwidth">&nbsp;</div>
					<div id="wtw_passwordstrengthdiv"><input type="text" id="wtw_tpasswordstrength" class="wtw-textbox" style="visibility:hidden;padding:5px;border-radius:10px;" autocomplete="" /></div><div style="clear:both;"></div>

					<div class="wtw-loginlabel">Password</div><div><input type="password" id="wtw_tnewpassword" autocomplete="new-password" class="wtw-textbox" maxlength="256" onkeyup="WTW.checkPassword(this,'wtw_tpasswordstrength');WTW.checkPasswordConfirm('wtw_tnewpassword', 'wtw_tnewpassword2', 'wtw_registererrortext');" onfocus="WTW.registerPasswordFocus();" onblur="WTW.registerPasswordBlur();" /></div><div style="clear:both;"></div>
					<div class="wtw-loginlabel">Confirm Password</div><div><input type="password" id="wtw_tnewpassword2" autocomplete="new-password" class="wtw-textbox" maxlength="256" onkeyup="WTW.checkPasswordConfirm('wtw_tnewpassword', 'wtw_tnewpassword2', 'wtw_registererrortext');" /></div><div style="clear:both;"></div>
					
					<hr /><a id="wtw_optionalprofile" onclick="WTW.toggleOptionalProfile()" class="wtw-lightlink">--- Click for Optional Profile ---</a><hr />
					<div id="wtw_optionalprofilediv" style="display:none;visibility:hidden;">
						<div class="wtw-loginlabel">Display Name</div><div><input type="text" id="wtw_tnewdisplayname" autocomplete="nickname" class="wtw-textbox" maxlength="64" /></div><div style="clear:both;"></div>
						<div class="wtw-loginlabel">First Name</div><div><input type="text" id="wtw_tnewfirstname" autocomplete="given-name" class="wtw-textbox" maxlength="64" /></div><div style="clear:both;"></div>
						<div class="wtw-loginlabel">Last Name</div><div><input type="text" id="wtw_tnewlastname" autocomplete="family-name" class="wtw-textbox" maxlength="64" /></div><div style="clear:both;"></div>
						<div class="wtw-loginlabel">Gender</div><div><input type="text" id="wtw_tnewgender" autocomplete="sex" class="wtw-textbox" maxlength="64" /></div><div style="clear:both;"></div>
						<div class="wtw-loginlabel">Date of Birth (mm/dd/yyyy)</div><div><input type="text" id="wtw_tnewdob" autocomplete="bday" class="wtw-textbox" maxlength="64" /></div><div style="clear:both;"></div>
					</div>
					<div id="wtw_registererrortext" class="wtw-errortext">&nbsp;</div><br />
					<div class="wtw-loginbutton" onclick="WTW.createAccount();" style="margin-left:auto;margin-right:auto;"><img src="/content/system/images/menuwtw.png" alt="WalkTheWeb" title="WalkTheWeb" class="wtw-loginlogo"/><div style="margin-top:10px;">Create Login</div></div>
					<div class="wtw-logincancel" onclick="WTW.showLogin();" style="margin-left:auto;margin-right:auto;">Cancel</div>

				</div>
			</div>
			<div id="wtw_resetpassworddiv" class="wtw-login" style="display:none;visibility:hidden;">
				<h2 class="wtw-dashboardheading"><span style="color:blue">WalkTheWeb<sup>®</sup></span> Reset Password</h2>
				<div style="text-align:center;">
					<div class="wtw-bold">
						This is your 3D Website Login.<br /><br />
					</div><div style="clear:both;"></div>
					<div class="wtw-loginlabel">Email</div><div><input type="text" id="wtw_temailrecover" class="wtw-textbox" value="" autocomplete="email" /></div><div style="clear:both;"></div>
					<div id="wtw_reseterrortext" class="wtw-errortext">&nbsp;</div><br />
					<div class="wtw-loginbutton" onclick="WTW.passwordReset();" style="margin-left:auto;margin-right:auto;"><img src="/content/system/images/menuwtw.png" alt="WalkTheWeb" title="WalkTheWeb" class="wtw-loginlogo"/><div style="margin-top:10px;">Reset My Password</div></div>						
					<div class="wtw-logincancel" onclick="WTW.showLogin();" style="margin-left:auto;margin-right:auto;">Cancel</div>
				</div>
			</div>
			<div id="wtw_loggedindiv" class="wtw-login" style="display:none;visibility:hidden;">
				<h2 class="wtw-dashboardheading"><span style="color:blue">WalkTheWeb<sup>®</sup></span> Logged In Account</h2>
				<div style="text-align:center;">
					<div class="wtw-bold">
						This is your 3D Website Login.<br /><br />
					</div><div style="clear:both;"></div>
					<div class="wtw-loginlabel">Email</div><div><input type="text" id="wtw_temailloggedin" class="wtw-textbox" value="<?php echo $zuseremail; ?>" disabled="true" /></div><div style="clear:both;"></div>
					<div class="wtw-logincancel" onclick="WTW.logout();" style="float:left;margin-left:50px;">Log Out</div>
					<div class="wtw-loginbutton" onclick="WTW.startWizard(5);" style="margin-left:auto;margin-right:auto;"><img src="/content/system/images/menuwtw.png" alt="WalkTheWeb" title="WalkTheWeb" class="wtw-loginlogo"/><div style="margin-top:10px;">Save and Continue</div></div>
				</div>
			</div>

			<div style="clear:both;"></div><br /><br />
			<div id="wtw_step4_3b" class="wtw-navbuttonback" onclick="WTW.startWizard(3);">&#8592; Back</div>
			<div id="wtw_step4_5b" class="wtw-navbuttonnext" onclick="WTW.startWizard(5);" style="visibility:hidden;">Next &#8594;</div>
			<div style="clear:both;"></div>
		</div>
		<div id="wtw_wizard5" class="wtw-dashboardpage" style="display:none;visibility:hidden;">
			<div id="wtw_step5_4" class="wtw-navbuttonback" onclick="WTW.startWizard(4);">&#8592; Back</div>
			<div id="wtw_step5_6" class="wtw-navbuttonnext" style="visibility:hidden;">Next &#8594;</div>
			<h2 class="wtw-dashboardheading">Step 5 - Create My 3D Website</h2>

			<div id="wtw_reviewdev">
				<div style="text-align:center;">
					<div class="wtw-bold">
						Review your 3D Website settings below, then click Create It!<br /><br />
					</div><div style="clear:both;"></div>
				</div>
				<div style="max-width:1000px;min-width:650px;margin-left:auto;margin-right:auto;">
					<div class="wtw-hostingbox" style="width:600px;text-align:center;float:right;">
						<div class="wtw-createbutton" onclick="WTW.createIt();">Create It!</div><br /><br />
						<h2 class="wtw-dashboardheading"><span style="color:blue">WalkTheWeb<sup>®</sup></span> Settings</h2>
						<div class="wtw-loginlabel">3D Hosting</div><div><input type="text" id="wtw_thosting" name="wtw_thosting" class="wtw-textboxwider" /></div><div style="clear:both;"></div>
						<div class="wtw-loginlabel">3D Website URL</div><div><input type="text" id="wtw_wtwurl" name="wtw_wtwurl" class="wtw-textboxwider" /></div><div style="clear:both;"></div>
						<div class="wtw-loginlabel">3D Website Name</div><div><input type="text" id="wtw_wtwstorename" name="wtw_wtwstorename" class="wtw-textboxwider" /></div><div style="clear:both;"></div>
						<div class="wtw-editbutton" onclick="WTW.startWizard(3);">Edit</div><div style="clear:both;"></div><hr />
						<div id="wtw_loginlabel" class="wtw-loginlabel">Login</div><div><input type="text" id="wtw_wtwemail"  name="wtw_wtwemail" class="wtw-textboxwider" value='<?php echo $zuseremail; ?>' disabled='true' /></div><div style="clear:both;"></div>
						<div class="wtw-editbutton" onclick="WTW.startWizard(4);">Edit</div><div style="clear:both;"></div>
					</div>
					<div style="float:right;">
						<div class="wtw-hostingbox" style="width:300px;">
							<h2 id="wtw_selectedbuildingname" class="wtw-dashboardheading"></h2>
							<img id="wtw_selectedbuildingimage" class="wtw-selectedimage" />
							<div class="wtw-editbutton" onclick="WTW.startWizard(1);">Edit</div><div style="clear:both;"></div>
						</div><br />
						<div class="wtw-hostingbox" style="width:300px;">
							<h2 id="wtw_selectedcommunityname" class="wtw-dashboardheading"></h2>
							<img id="wtw_selectedcommunityimage" class="wtw-selectedimage" />
							<div class="wtw-editbutton" onclick="WTW.startWizard(2);">Edit</div><div style="clear:both;"></div>
						</div>
					</div>
				</div>
				<div style="clear:both;"></div><br /><br />
				<div id="wtw_step5_4b" class="wtw-navbuttonback" onclick="WTW.startWizard(4);">&#8592; Back</div>
				<div id="wtw_step5_6b" class="wtw-navbuttonnext" style="visibility:hidden;">Next &#8594;</div>
				<div style="clear:both;"></div>
			
			</div>
			
			<div id="wtw_creatingdev" style="display:none;visibility:hidden;">
				<h2 class="wtw-dashboardheading">Creating...</h2>
				<div class="wtw-progressdiv" onclick="WTW.startWaiting();">
					<div id="wtw_progress0" class="wtw-progressball" style="margin-top:150px;"><div class="wtw-progresstext" style="color:#ffff66;">W</div></div>
					<div id="wtw_progress1" class="wtw-progressball" style="margin-top:150px;"><div class="wtw-progresstext">a</div></div>
					<div id="wtw_progress2" class="wtw-progressball" style="margin-top:150px;"><div class="wtw-progresstext">l</div></div>
					<div id="wtw_progress3" class="wtw-progressball" style="margin-top:150px;"><div class="wtw-progresstext">k</div></div>
					<div id="wtw_progress4" class="wtw-progressball" style="margin-top:150px;"><div class="wtw-progresstext" style="color:#ffff66;">T</div></div>
					<div id="wtw_progress5" class="wtw-progressball" style="margin-top:150px;"><div class="wtw-progresstext">h</div></div>
					<div id="wtw_progress6" class="wtw-progressball" style="margin-top:150px;"><div class="wtw-progresstext">e</div></div>
					<div id="wtw_progress7" class="wtw-progressball" style="margin-top:150px;"><div class="wtw-progresstext" style="color:#ffff66;">W</div></div>
					<div id="wtw_progress8" class="wtw-progressball" style="margin-top:150px;"><div class="wtw-progresstext">e</div></div>
					<div id="wtw_progress9" class="wtw-progressball" style="margin-top:150px;"><div class="wtw-progresstext">b</div></div>
				</div>
			</div>

			<div id="wtw_newhostedwebsitedev" style="display:none;visibility:hidden;">
				<h2 class="wtw-dashboardheading">Your New 3D Website</h2>
				<div style="text-align:center;">
					<div class="wtw-bold">
						Welcome to WalkTheWeb 3D Internet!<br /><br />
					</div><div style="clear:both;"></div>
					<a id="wtw_visitwebsite" class="wtw-createbutton" target="_blank">Visit your New 3D Website!</a><br /><br />
					<div style="clear:both;"></div>
				</div>
			</div>
		</div>
	</div>
	<input type="hidden" id="wtw_buildingid" name="wtw_buildingid" value="" />
	<input type="hidden" id="wtw_buildingname" name="wtw_buildingname" value="" />
	<input type="hidden" id="wtw_communityid" name="wtw_communityid" value="" />
	<input type="hidden" id="wtw_communityname" name="wtw_communityname" value="" />
	<input type="hidden" id="wtw_usertoken" name="wtw_usertoken" value="<?php echo $wtwhandlers->usertoken; ?>" />
	<input type="hidden" id="wtw_wtwusertoken" name="wtw_wtwusertoken" value="" />
	<input type="hidden" id="wtw_userid" name="wtw_userid" value="<?php echo $wtwhandlers->userid; ?>" />
	<input type="hidden" id="wtw_domainurl" name="wtw_domainurl" value="<?php echo $wtwhandlers->domainurl; ?>" />
	<input type="hidden" id="wtw_websiteurl" name="wtw_websiteurl" value="" />
	<input type="hidden" id="wtw_serverip" name="wtw_serverip" value="<?php echo $wtwhandlers->serverip; ?>" />
	<input type="hidden" id="wtw_downloadstcols" value="2" />
	<script>WTW.startWizard(1);</script>
<?php
	} catch (Exception $e) {
		$wtwhandlers->serror("core-pages-create3dwebsite.php = ".$e->getMessage());
	}
?>
</body>
</html>
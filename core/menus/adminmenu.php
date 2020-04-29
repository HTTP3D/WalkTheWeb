<!-- admin menu for the admin.php page -->
	<div id="wtw_adminmenubutton" class="wtw-mainmenubutton" onclick="WTW.toggleAdminMenu(this.id, 'left');" style="left:0px;bottom:33px;" onmouseover="WTW.hide('wtw_itooltip');">
			<div id="wtw_adminmenuleft" class="wtw-arrowleft" style="visibility:hidden;"></div>
			<div class="wtw-menubuttontext">Admin</div>
			<div id="wtw_adminmenuright" class="wtw-arrowright"></div>
	</div>
	<div id="wtw_adminmenu" class="wtw-mainmenu" style="display:none;visibility:hidden;" onmouseover="WTW.hide('wtw_itooltip');">
		<div id="wtw_adminmenu3d" class="wtw-mainmenu3d">
			<div id="wtw_adminmenuscroll" class="wtw-mainmenuscroll">
				<div id="wtw_adminmenu1" class="wtw-adminmenuform" style="display:block;visibility:visible;">
					<div class="wtw-menuheader">Admin Menu</div><br />
<?php				global $wtwadminmenu;
					echo $wtwadminmenu->getAdminMenu(); ?>
				</div>
				<div id="wtw_adminmenu2" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback2" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Select 3D Building</div><br />
					<br />
					<div id="wtw_loadingbuildingid" class="wtw-loadingnotice" style="margin-left:auto;margin-right:auto;color:#000000;">Loading...</div>
					<div id="wtw_listbuildings"></div>
					<br />
					<div class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu4" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback4" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Options and Settings</div><br />
<?php				echo $wtwadminmenu->getAdminSubMenu('buildingoptions'); ?>
					<br />
					<div id="wtw_cancel4" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);"><div class="wtw-altkey2">ctrl+d</div><u>D</u>one</div>
				</div>
				<div id="wtw_adminmenu5" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback5" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">3D Building<br />Information</div><br />
					<div id="wtw_loadingbuildingform" class="wtw-loadingnotice" style="margin-left:auto;margin-right:auto;color:#000000;">Loading...</div>
<?php				include './core/forms/building.php'; ?>
					<br />
					<div id="wtw_cancel5" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu6" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback6" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Edit 3D Building</div><br />
					<div class="wtw-menulevel0text"><strong>Right Click</strong> an Item on your scene to <strong>Edit</strong> the Item or select from the following:</div>
<?php				echo $wtwadminmenu->getAdminSubMenu('editbuilding'); ?>
					<br />
					<div id="wtw_cancel6" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);"><div class="wtw-altkey2">ctrl+d</div><u>D</u>one Editing</div>
				</div>
				<div id="wtw_adminmenu9" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback9" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Share My<br />3D Building<br />as Template</div><br />
					<a href="https://www.walktheweb.com/wiki/share-3d-objects/" title="Help" alt="Help" class="wtw-helplink" target="_blank">?</a>
					<div id="wtw_loadingsharebuildingform" class="wtw-loadingnotice" style="margin-left:auto;margin-right:auto;color:#000000;">Loading...</div>
<?php				include './core/forms/buildingshare.php'; ?>
					<br />
					<div id="wtw_bsharebuildingtemp" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);" style="font-size:1.4em;">Share 3D Building as Template</div>
					<div id="wtw_adminmenubuildsharecancel" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu10" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback10" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Add 3D Building Block</div><br />
					<a href="https://www.walktheweb.com/wiki/create-a-3d-building-3d-building-blocks/" title="Help" alt="Help" class="wtw-helplink" target="_blank">?</a>
					<div id="wtw_moldsbuttonlist"></div>
					<br />
					<div id="wtw_cancel10" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu11" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback11" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div id="wtw_editmoldformtitle" class="wtw-menuheader">Edit 3D Building Block</div><br />
<?php				include './core/forms/mold.php'; 
					echo $wtwadminmenu->getAdminSubMenu('editmold'); ?>
					<br />
					<div id="wtw_bsavethismold" class="wtw-greenbutton" onclick="WTW.submitMoldForm(1);WTW.hideAdminMenu();WTW.backToEdit();" style="font-size:1.4em;"><div class="wtw-altkey2">ctrl+s</div><u>S</u>ave Mold</div>
					<div id="wtw_bdelmold" class="wtw-redbutton" onclick="WTW.submitMoldForm(0);"><div class="wtw-altkey2">ctrl+d</div><u>D</u>elete Mold</div>
					<div id="wtw_bcancelmold" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
					<br /><br />
				</div>
				<div id="wtw_adminmenu12" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback12" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Add 3D Web Object</div><br />
					<a href="https://www.walktheweb.com/wiki/3d-web-objects/" title="Help" alt="Help" class="wtw-helplink" target="_blank">?</a>
					<div id="wtw_webmoldsbuttonlist"></div>
					<br />
					<div id="wtw_cancel12" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu13" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback13" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Add 3D Thing</div><br />
					<a href="https://www.walktheweb.com/wiki/add-3d-things-to-3d-buildings-or-3d-communities/" title="Help" alt="Help" class="wtw-helplink" target="_blank">?</a>
					<div id="wtw_loadingthingmoldsbuttonlist" class="wtw-loadingnotice" style="margin-left:auto;margin-right:auto;color:#000000;">Loading...</div>
					<div id="wtw_thingmoldsbuttonlist"></div>
					<br />
					<div id="wtw_cancel13" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu14" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback14" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div id="wtw_editconnectinggridsformtitle" class="wtw-menuheader">Edit 3D Building Location</div><br />
<?php				include './core/forms/connectinggrids.php'; ?>
					<br />
					<div id="wtw_beditconnectinggrid" class="wtw-greenbutton" onclick="WTW.submitConnectingGridsForm(1);" style="font-size:1.4em;">Save Location</div>
					<div id="wtw_bdelconnectinggrid" class="wtw-redbutton" onclick="WTW.openConfirmation('3');">Delete Building</div>
					<div id="wtw_cancel14" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu15" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback15" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Add or Edit Actions</div><br />
					<a href="https://www.walktheweb.com/wiki/introduction-to-action-zones/" title="Help" alt="Help" class="wtw-helplink" target="_blank">?</a>
					<div id="wtw_editexistingactionzonediv">
						<h2 style="margin-bottom:3px;">Select Action Zone to Edit</h2>
						<select id="wtw_selectactionzoneid">
							<option value="0">Select Action Zone</option>
						</select>
						<br/> 
						<hr class="wtw-menuhr" />
						<h2 style="margin-bottom:3px;">Add New Action Zone</h2>
					</div>
					<div id="wtw_actionzonesbuttonlist"></div>
					<br />
					<div id="wtw_cancel15" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu16" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback16" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Recover Deleted Items</div><br />
					<h2 style="margin-bottom:3px;">Deleted Items</h2>
					<div id="wtw_deleteditemslist"></div>
					<br />
					<div id="wtw_cancel16" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu20" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback20" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div id="wtw_editactionzoneformtitle" class="wtw-menuheader">Edit Action Zone</div><br />
<?php				include './core/forms/actionzone.php'; ?>
					<br />
					<div id="wtw_beditactionzone" class="wtw-greenbutton" onclick="WTW.submitActionZoneForm(1);" style="font-size:1.4em;">Save Action Zone</div>
					<div id="wtw_bdelactionzone" class="wtw-redbutton" onclick="WTW.submitActionZoneForm(0);">Delete Action Zone</div>
					<div id="wtw_cancel20" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu22" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback22" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Select 3D Community</div><br />
					<br />
					<div id="wtw_loadingcommunityid" class="wtw-loadingnotice" style="margin-left:auto;margin-right:auto;color:#000000;">Loading...</div>
					<div id="wtw_listcommunities"></div>
					<br />
					<div id="wtw_cancel22" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu24" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback24" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Options and Settings</div><br />
<?php				echo $wtwadminmenu->getAdminSubMenu('communityoptions'); ?>
					<br />
					<div id="wtw_adminmenucommdone" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);"><div class="wtw-altkey2">ctrl+d</div><u>D</u>one</div>
				</div>
				<div id="wtw_adminmenu25" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback25" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">3D Community<br />Information</div><br />
					<div id="wtw_loadingcommunityform" class="wtw-loadingnotice" style="margin-left:auto;margin-right:auto;color:#000000;">Loading...</div>
<?php				include './core/forms/community.php'; ?>
					<br />
					<div id="wtw_cancel25" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu26" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback26" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Edit 3D Community</div><br />
					<div class="wtw-menulevel0text"><strong>Right Click</strong> an Item on your scene to <strong>Edit</strong> the Item or select from the following:</div>
<?php				echo $wtwadminmenu->getAdminSubMenu('editcommunity'); ?>
					<br />
					<div id="wtw_adminmenucommdoneediting" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);"><div class="wtw-altkey2">ctrl+d</div><u>D</u>one Editing</div>
				</div>
				<div id="wtw_adminmenu27" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback27" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Edit 3D Buildings in this 3D Community</div><br />
					<a href="https://www.walktheweb.com/wiki/add-3d-buildings-to-a-3d-community/" title="Help" alt="Help" class="wtw-helplink" target="_blank">?</a>
					<h2 style="margin-bottom:3px;">Add My 3D Building</h2>
					<select id="wtw_addcommunitybuildingid" style="cursor: pointer;"></select>
					<div id="wtw_addbuildingtocommunity" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);">Add 3D Building</div>
					<hr class="wtw-menuhr" />
					<div id="wtw_adminmenu27b">
						<h2 style="margin-bottom:3px;">3D Buildings in this 3D Community</h2>
						<div id="wtw_commbuildinglist"></div>
					</div>
					<br />
					<div id="wtw_cancel27" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu29" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback29" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Share My<br />3D Community<br />as Template</div><br />
					<a href="https://www.walktheweb.com/wiki/share-3d-objects/" title="Help" alt="Help" class="wtw-helplink" target="_blank">?</a>
					<div id="wtw_loadingsharecommunityform" class="wtw-loadingnotice" style="margin-left:auto;margin-right:auto;color:#000000;">Loading...</div>
<?php				include './core/forms/communityshare.php'; ?>
					<br />
					<div id="wtw_bsharecommunitytemp" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);" style="font-size:1.4em;">Share 3D Community as Template</div>
					<div id="wtw_cancel29" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu30" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback30" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Edit Landscape and Scene</div><br />
					<div class="wtw-menulevel0text"><strong>Right Click</strong> a Terrain (Mountains, Islands, etc...) on your scene to <strong>Edit</strong> the Terrain or select from the following:</div>
<?php				echo $wtwadminmenu->getAdminSubMenu('editlandscape'); ?>
					<br />
					<div id="wtw_cancel30" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);">Done with Scene</div>
				</div>
				<div id="wtw_adminmenu32" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback32" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Select 3D Thing</div><br />
					<br />
					<div id="wtw_loadingthingid" class="wtw-loadingnotice" style="margin-left:auto;margin-right:auto;color:#000000;">Loading...</div>
					<div id="wtw_listthings"></div>
					<br />
					<div class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu34" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback34" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Options and Settings</div><br />
<?php				echo $wtwadminmenu->getAdminSubMenu('thingoptions'); ?>
					<br />
					<div id="wtw_adminmenuthingdone" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);"><div class="wtw-altkey2">ctrl+d</div><u>D</u>one</div>
				</div>
				<div id="wtw_adminmenu35" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback35" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">3D Thing<br />Information</div><br />
					<div id="wtw_loadingthingform" class="wtw-loadingnotice" style="margin-left:auto;margin-right:auto;color:#000000;">Loading...</div>
<?php				include './core/forms/thing.php'; ?>
					<br />
					<div id="wtw_cancel35" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu36" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback36" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Edit 3D Thing</div><br />
					<div class="wtw-menulevel0text"><strong>Right Click</strong> an Item on your scene to <strong>Edit</strong> the Item or select from the following:</div>
<?php				echo $wtwadminmenu->getAdminSubMenu('editthing'); ?>
					<br />
					<div id="wtw_adminmenuthingdoneediting" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);"><div class="wtw-altkey2">ctrl+d</div><u>D</u>one Editing</div>
				</div>
				<div id="wtw_adminmenu39" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback39" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Share My<br />3D Thing<br />as Template</div><br />
					<a href="https://www.walktheweb.com/wiki/share-3d-objects/" title="Help" alt="Help" class="wtw-helplink" target="_blank">?</a>
					<div id="wtw_loadingsharethingform" class="wtw-loadingnotice" style="margin-left:auto;margin-right:auto;color:#000000;">Loading...</div>
<?php				include './core/forms/thingshare.php'; ?>
					<br />
					<div id="wtw_bsharethingtemplate" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);" style="font-size:1.4em;">Share 3D Thing as Template</div>
					<div id="wtw_cancel39" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu40" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback40" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Sky Settings</div><br />
					<a href="https://www.walktheweb.com/wiki/3d-community-sky-settings/" title="Help" alt="Help" class="wtw-helplink" target="_blank">?</a>
					<div id="wtw_loadingskysettingsform" class="wtw-loadingnotice" style="margin-left:auto;margin-right:auto;color:#000000;">Loading...</div>
<?php				include './core/forms/skydome.php'; ?>
					<br />
					<div id="wtw_bsaveeditskydome" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);" style="font-size:1.4em;">Save Sky</div>
					<div id="wtw_cancel40" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu41" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback41" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Ground Settings</div><br />
					<a href="https://www.walktheweb.com/wiki/3d-community-ground-settings/" title="Help" alt="Help" class="wtw-helplink" target="_blank">?</a>
					<div id="wtw_loadinggroundsettingsform" class="wtw-loadingnotice" style="margin-left:auto;margin-right:auto;color:#000000;">Loading...</div>
<?php				include './core/forms/groundsettings.php'; ?>
					<br />
					<div id="wtw_bsaveground" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);" style="font-size:1.4em;">Save Ground</div>
					<div id="wtw_cancel41" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu42" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback42" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Water Depth</div><br />
					<a href="https://www.walktheweb.com/wiki/3d-community-water-depth/" title="Help" alt="Help" class="wtw-helplink" target="_blank">?</a>
					<div id="wtw_loadingwaterdepthform" class="wtw-loadingnotice" style="margin-left:auto;margin-right:auto;color:#000000;">Loading...</div>
<?php				include './core/forms/waterdepth.php'; ?>
					<br />
					<div id="wtw_bsavewaterdepth" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);" style="font-size:1.4em;">Save Depth</div>
					<div id="wtw_cancel42" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu44" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback44" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Set Start Position</div><br />
					<div class="wtw-menulevel0text" style="text-align:left;">Move to the location and view angle you would like for everyone to start your 3D Community then click <strong>Use Current Position</strong> to Save the <strong>Start Location</strong></div>
					<div id="wtw_startsaved" style="color:green;visibility:hidden;text-align:center;">Starting Position Saved</div><br />
					<br />
					<div id="wtw_setstartposition" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);" style="font-size:1.4em;">Use Current Position</div>
					<div id="wtw_cancel44" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Done</div>
				</div>
				<div id="wtw_adminmenu45" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback45" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">3D Community Gravity</div><br />
					<a href="https://www.walktheweb.com/wiki/3d-community-gravity/" title="Help" alt="Help" class="wtw-helplink" target="_blank">?</a>
					<h2 class="wtw-center">Amount of Gravity</h2>
					<input type="text" id="wtw_tcommgravity" maxlength="16" class="wtw-smallprintinput" style="" onclick="WTW.checkKey(this, 'number', 0, 0);" onkeyup="WTW.checkKey(this, 'number', 0, 0);" onblur="WTW.checkKey(this, 'number', 0, 1);WTW.setGravity();" />
					<input type="button" id="wtw_bcommgravity4" class="wtw-smallprint" value="-1" onmousedown="WTW.changeNumberValue('wtw_tcommgravity', -1);" onmouseup="WTW.changeStop();WTW.setGravity();" onclick="" style="cursor: pointer;" />
					<input type="button" id="wtw_bcommgravity3" class="wtw-smallprint" value="-.01" onmousedown="WTW.changeNumberValue('wtw_tcommgravity', -.01);" onmouseup="WTW.changeStop();WTW.setGravity();" onclick="" style="cursor: pointer;" />
					<input type="button" id="wtw_bcommgravity2" class="wtw-smallprint" value="+.01" onmousedown="WTW.changeNumberValue('wtw_tcommgravity', .01);" onmouseup="WTW.changeStop();WTW.setGravity();" onclick="" style="cursor: pointer;" />
					<input type="button" id="wtw_bcommgravity1" class="wtw-smallprint" value="+1" onmousedown="WTW.changeNumberValue('wtw_tcommgravity', 1);" onmouseup="WTW.changeStop();WTW.setGravity();" onclick="" style="cursor: pointer;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<br />
					<br />
					<div class="wtw-menulevel0text" style="text-align:left;">This <strong>Gravity</strong> setting will control the Gravity applied to the Avatars browsing in your <strong>production 3D Community</strong>.<br /><br />Note that the <strong>3D Editor</strong> has a gravity setting that allows you to turn Gravity Off or On when you are editing and does not affect production.<br /><br />Hint: Earth's Gravity is 9.8</div>
					<br />
					<div id="wtw_savecommgravity" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);" style="font-size:1.4em;">Save Gravity</div>
					<div id="wtw_cancel45" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Done</div>
				</div>
				<div id="wtw_adminmenu60" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback60" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">Permissions</div><br />
					<div id="wtw_loadinguserdevaccessform" class="wtw-loadingnotice" style="margin-left:auto;margin-right:auto;color:#000000;">Loading...</div>
<?php				include './core/forms/userdevaccess.php'; ?>
					<br />
					<div id="wtw_cancel60" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu61" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback61" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div class="wtw-menuheader">3D Community Browse Access</div><br />
					<div id="wtw_loadinguserdevaccessform2" class="wtw-loadingnotice" style="margin-left:auto;margin-right:auto;color:#000000;">Loading...</div>
<?php				include './core/forms/useraccess.php'; ?>
					<br />
					<div id="wtw_cancel61" class="wtw-yellowbutton" onclick="WTW.adminMenuItemSelected(this);">Cancel</div>
				</div>
				<div id="wtw_adminmenu69" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback69" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div id="wtw_snapshottitle" class="wtw-menuheader">3D Community Snapshot</div><br />
					<div id="wtw_loadingupdatesnapshot" class="wtw-loadingnotice" style="margin-left:auto;margin-right:auto;color:#000000;">Loading...</div>
<?php				include './core/forms/updatesnapshot.php'; ?>
					<br />
					<div id="wtw_cancel69" class="wtw-greenbutton" onclick="WTW.adminMenuItemSelected(this);">Done</div>
				</div>
				<div id="wtw_adminmenu70" class="wtw-adminmenuform" style="display:none;visibility:hidden;">
					<div id="wtw_bback70" alt="Back" title="Back" class="wtw-backbutton" onclick="WTW.adminMenuItemSelected(this);">&lt;&lt;</div>
					<div id="wtw_devtoolstitle" class="wtw-menuheader">List Loaded Objects</div><br />
					<div class="wtw-menulevel0text">The following items List the current loaded objects and some of the parameters in the browser Console Log (in most browsers, press <strong>F12</strong> and choose <strong>Console</strong>).</div>
<?php				echo $wtwadminmenu->getAdminSubMenu('devlistobjects'); ?>
					<br />
				</div>
<?php			echo $wtwadminmenu->getAdminMenuForms(); ?>
			</div>
<?php		if ($wtwdb->hasPermission(array("admin","developer","architect","graphics artist"))) { ?>
			<div id="wtw_quickeditorsettings" class="wtw-menulevel0" style="text-align:center;position:absolute;z-index:8000;bottom:0px;width:320px;margin:0px;padding-left:0px;padding-right:0px;border-top:#333333;">
				<div style="width:100%;text-align:center;margin-top:0px;">
					<div style="font-size:.8em;color:white;margin-bottom:4px;width:100%;margin-left:0px;margin-right:0px;margin-top:0px;">Quick Editor Settings</div>
					<div id="wtw_bavatarcamera" onclick="WTW.setQuickEditorAvatarCamera(0);" class="wtw-quickbar" title="Camera is Attached to Avatar" alt="Camera is Attached to Avatar">Avatar<br />Camera<br />ON</div>
					<div id="wtw_bfocus" onclick="WTW.setQuickEditorFocus(0);" class="wtw-quickbar" title="Focus Highlight is On" alt="Focus Highlight is On">Focus<br /><br />ON</div>
					<div id="wtw_bmerged" onclick="WTW.setQuickEditorMerged(1);" class="wtw-quickbaroff" title="Merged Shapes are Hidden" alt="Merged Shapes are Hidden">Merged<br /><br />OFF</div>
					<div id="wtw_bzones" onclick="WTW.setQuickEditorZones(1);" class="wtw-quickbaroff" title="Action Zones are Hidden" alt="Action Zones are Hidden">Zones<br /><br />OFF</div>
					<div id="wtw_blines" onclick="WTW.setQuickEditorLines(0);" class="wtw-quickbar" title="Alignment Lines are Shown" alt="Alignment Lines are Shown">Lines<br /><br />ON</div>
				</div>
			</div>
<?php		} ?>
		</div>
	</div>
	
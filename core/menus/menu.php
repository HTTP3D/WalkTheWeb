<!-- browse menu for the index.php page (all users) -->
<div id="wtw_menubase" class="wtw-menubase">
<?php
	global $wtwmenus;
	echo $wtwmenus->getMainMenu();
?>
</div>
<div id="wtw_wtwmessage" class="wtw-wtwmessage"></div>
<?php 
	echo $wtwmenus->getSettingsMenu();
	echo $wtwmenus->getProfileMenu();
	echo $wtwmenus->getBrowseMenu('wtw_menuhelp','Help Menu');
	echo $wtwmenus->getAvatarMenu();
	echo $wtwmenus->getOptionalAnimations();
	echo $wtwmenus->getControlsMenu();
	echo $wtwmenus->getMovementMenu();
	echo $wtwmenus->getGraphicsMenu();
	echo $wtwmenus->getShadowsMenu();
	echo $wtwmenus->getMicMenu();
	echo $wtwmenus->getContentRatingMenu();
	echo $wtwmenus->getFeedbackMenu();
	echo $wtwmenus->getMenuForms();
?>
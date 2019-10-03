<?php
	require_once('./core/functions/class_wtw-initsession.php');
	require_once('./core/functions/class_wtwadminmenu.php');
	require_once('./core/functions/class_wtwmenus.php');
	require_once('./core/functions/class_wtwpluginloader.php');
	require_once('./core/functions/class_wtwplugins.php');
	global $wtw;
	global $wtwadminmenu;
	global $wtwpluginloader;
	$wtwadminmenu->preloadAdminMenu();
	$wtwpluginloader->getAllPlugins($wtw->contentpath,1); ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://ogp.me/ns/fb#">
	<head><?php 	
	echo $wtw->loadMetaData(); 
	echo $wtw->loadCSSAdminData();
	echo $wtw->loadInitJSData(); 
	echo $wtw->loadJSAdminData(); ?>
	</head>
	<body><?php		
	echo $wtw->loadMainElements();
	echo $wtw->loadHiddenFields();
	require_once('./core/menus/menu.php');
	require_once('./core/menus/adminmenu.php');
	echo $wtw->loadFullPageForm(); ?>
	</body>
</html>
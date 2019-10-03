<?php 
	require_once('./core/functions/class_wtw-initsession.php');
	require_once('./core/functions/class_wtwplugins.php');
	require_once('./core/functions/class_wtwmenus.php');
	global $wtw;
	global $wtwpluginloader;
	$wtwpluginloader->getAllPlugins($wtw->contentpath,1); ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://ogp.me/ns/fb#">
    <head><?php 	
	echo $wtw->loadMetaData();
	echo $wtw->loadCSSBrowseData();
	echo $wtw->loadInitJSData(); 
	echo $wtw->loadJSBrowseData(); ?>
    </head>
    <body><?php	
	echo $wtw->loadMainElements();
	echo $wtw->loadHiddenFields();
	require_once('./core/menus/menu.php'); ?>
    </body>
</html>
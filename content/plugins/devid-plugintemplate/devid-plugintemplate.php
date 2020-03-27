<?php
#	pluginname = devid-plugintemplate
#	title = WalkTheWeb Plugin Template
#	description = Sample Template for creating a WalkTheWeb 3D Plugin
#	author = Aaron Dishno Ed.D.
# 	version = 1.0.0

/* change the information above for your plugin */
/* then search and replace the following with your DEVID and PLUGIN Name: */
/* 		DEVID_PLUGINTEMPLATE */
/*		devidplugintemplate */
/*		devid-plugintemplate */

/* for more information about 3D plugins and the latest updates, see: */
/* https://www.walktheweb.com/wiki/3d-plugin-template/ */
/* WalkTheWeb uses BabylonJS.com game engine */
/* https://doc.babylonjs.com/babylon101/ */

global $wtwplugins;

if (!defined('wtw_serverinstanceid')) exit; // Exit if accessed directly

if (!defined('DEVID_PLUGINTEMPLATE_FILE')) {
	define('DEVID_PLUGINTEMPLATE_FILE', __FILE__ );
}

if (!class_exists('devidplugintemplate')) {
	require_once($wtwplugins->contentpath."/plugins/devid-plugintemplate/functions/class_plugin.php");
}
?>

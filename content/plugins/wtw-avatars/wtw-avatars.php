<?php
#	pluginname = wtw-avatars
#	title = WalkTheWeb Avatars Plugin
#	description = WalkTheWeb Avatar Creator and Editor
#	author = Aaron Dishno Ed.D.
# 	version = 1.0.2

/* change the information above for your plugin */
/* then search and replace the following with your DEVID and PLUGIN Name: */
/* 		WTW_AVATARS */
/*		wtwavatars */
/*		wtw-avatars */

/* for more information about 3D plugins and the latest updates, see: */
/* https://www.walktheweb.com/wiki/3d-plugin-template/ */
/* WalkTheWeb uses BabylonJS.com game engine */
/* https://doc.babylonjs.com/babylon101/ */

global $wtwplugins;

if (!defined('wtw_serverinstanceid')) exit; // Exit if accessed directly

if (!defined('WTW_AVATARS_FILE')) {
	define('WTW_AVATARS_FILE', __FILE__ );
}

if (!class_exists('wtwavatars')) {
	require_once($wtwplugins->contentpath."/plugins/wtw-avatars/functions/class_plugin.php");
}
?>

<?php
#	pluginname = wtw-readyplayerme
#	title = WalkTheWeb ReadyPlayerMe Avatars
#	description = Use ReadyPlayerMe avatars in your WalkTheWeb 3D Scenes
#	author = Aaron Dishno Ed.D.
# 	version = 1.0.0

/* change the information above for your plugin */
/* then search and replace the following with your DEVID and PLUGIN Name: */
/* 		WTW_READYPLAYERME */
/*		wtwreadyplayerme */
/*		wtw-readyplayerme */

/* For more information about 3D plugins and the latest updates, see: 	*/
/* https://www.walktheweb.com/wiki/3d-plugin-template/ 					*/
/*																		*/
/* Download the 3D Plugin Template at: 									*/
/* https://github.com/HTTP3D/3DPluginTemplate 							*/
/*																		*/
/* WalkTheWeb uses BabylonJS.com game engine 							*/
/* https://doc.babylonjs.com/start 										*/

global $wtwplugins;

if (!defined('wtw_serverinstanceid')) exit; // Exit if accessed directly

if (!defined('WTW_READYPLAYERME_FILE')) {
	define('WTW_READYPLAYERME_FILE', __FILE__ );
}

if (!class_exists('wtwreadyplayerme')) {
	require_once($wtwplugins->contentpath."/plugins/wtw-readyplayerme/functions/class_plugin.php");
}
?>

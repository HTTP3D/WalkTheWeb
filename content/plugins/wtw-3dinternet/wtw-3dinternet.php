<?php
#	pluginname = wtw-3dinternet
#	title = WalkTheWeb 3D Internet
#	description = 3D Internet connects your WalkTheWeb instance to the 3D Internet with Global WalkTheWeb Logins, Avatars, and options for Multiplayer and Chat!
#	author = Aaron Dishno Ed.D.
# 	version = 1.1.0
#	releasedate = 3/30/2022

/* WalkTheWeb uses BabylonJS.com game engine */
/* https://doc.babylonjs.com/babylon101/ */

global $wtwplugins;

if (!defined('wtw_serverinstanceid')) exit; // Exit if accessed directly

if (!defined('WTW_3DINTERNET_FILE')) {
	define('WTW_3DINTERNET_FILE', __FILE__ );
}

if (!class_exists('wtw3dinternet')) {
	require_once($wtwplugins->contentpath."/plugins/wtw-3dinternet/functions/class_plugin.php");
}
?>

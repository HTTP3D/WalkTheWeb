<?php
#	pluginname = wtw-coins
#	title = WalkTheWeb Coin Tokens
#	description = WalkTheWeb Coins adds in-game collectible Tokens that can be used to buy in-game upgrades or enhancements (Not real currency).
#	author = Aaron Dishno Ed.D.
# 	version = 1.0.2
#	releasedate = 8/31/2022

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

if (!defined('WTW_COINS_FILE')) {
	define('WTW_COINS_FILE', __FILE__ );
}

if (!class_exists('wtwcoins')) {
	require_once($wtwplugins->contentpath."/plugins/wtw-coins/functions/class_plugin.php");
}
?>

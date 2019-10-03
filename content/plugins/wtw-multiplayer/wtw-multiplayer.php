<?php
#	pluginname = wtw-multiplayer
#	title = WalkTheWeb Multiplayer Expansion
#	description = Handles the multiplayer functionality
#	author = Aaron Dishno Ed.D.
# 	version = 0.0.1

global $wtwplugins;

if (!defined('wtw_serverinstanceid')) exit; // Exit if accessed directly

if (!defined('WTWMULTIPLAYER_FILE')) {
	define('WTWMULTIPLAYER_FILE', __FILE__ );
}

if (!class_exists('wtwmultiplayer')) {
	require_once($wtwplugins->contentpath."\\plugins\\wtw-multiplayer\\functions\\class_wtwmultiplayer.php");
}
?>

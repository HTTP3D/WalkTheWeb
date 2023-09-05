<?php
#	pluginname = wtw-shopping
#	title = WalkTheWeb 3D Shopping Expansion
#	description = Enable WalkTheWeb to host 3D Shopping Websites
#	author = Aaron Dishno Ed.D.
# 	version = 1.0.3
#	releasedate = 9/5/2023

global $wtwplugins;

if (!defined('wtw_serverinstanceid')) exit; // Exit if accessed directly

if (!defined('WTWSHOPPING_FILE')) {
	define('WTWSHOPPING_FILE', __FILE__ );
}

if (!class_exists('wtwshopping')) {
	require_once($wtwplugins->contentpath."/plugins/wtw-shopping/functions/class_wtwshopping.php");
}
?>

<?php
#	pluginname = wtw-swiftmailer
#	title = WalkTheWeb Swift Mailer 3D Plugin
#	description = Adds email server with SMTP configuration to WalkTheWeb
#	author = Aaron Dishno Ed.D.
# 	version = 1.0.1
#	releasedate = 8/31/2022

/* change the information above for your plugin */
/* then search and replace the following with your DEVID and PLUGIN Name: */
/* 		WTW_SwiftMailer */
/*		wtwswiftmailer */
/*		wtw-swiftmailer */

/* for more information about 3D plugins and the latest updates, see: */
/* https://www.walktheweb.com/wiki/3d-plugin-template/ */
/* WalkTheWeb uses BabylonJS.com game engine */
/* https://doc.babylonjs.com/babylon101/ */

global $wtwplugins;

if (!defined('wtw_serverinstanceid')) exit; // Exit if accessed directly

if (!defined('WTW_SwiftMailer_FILE')) {
	define('WTW_SwiftMailer_FILE', __FILE__ );
}

if (!class_exists('wtwswiftmailer')) {
	require_once($wtwplugins->contentpath."/plugins/wtw-swiftmailer/functions/class_plugin.php");
}
?>

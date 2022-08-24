<?php
require_once('../functions/class_wtwhandlers.php');
global $wtwhandlers;
try {

	/* get values from querystring or session */
	/* objectfile has to include path for preview to work */
	$zobjectfile = $wtwhandlers->getVal('objectfile','');
?>
<!DOCTYPE html>
<html>
<head>
	<title>3D Models Preview</title>
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
	<script>
		function WTWJS() {}
		var WTW = new WTWJS();
		var wtw_devmode = 1;
	</script>
	<style>
		html, body {
			font-family: Arial,Tahoma,san-serif;
			font-size: 1em;
			margin: 0px;
			padding: 0px;
			width: 100%;
			height: 100%;
			background-color: #e7e7e7;
		}
	</style>
</head>
<body>
	<div>
<?php
	echo "<babylon extends='minimal' model='".$zobjectfile."'></babylon>";
?>
	</div>
	<div style="clear:both;"></div>
	<script src="/core/scripts/engine/babylon.viewer.js"></script>
</body>
</html>
<?php
} catch (Exception $e) {
	$wtwhandlers->serror("pages-models.php=".$e->getMessage());
}
?>
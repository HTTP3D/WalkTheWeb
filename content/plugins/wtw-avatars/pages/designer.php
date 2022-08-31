<?php
require_once('../../../../core/functions/class_wtw-initsession.php');
global $wtw;
header('Access-Control-Allow-Origin: https://3dnet.walktheweb.com');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Request-Headers: Content-Type');

$uploadpathid = "";
if (!empty($_SESSION["wtw_uploadpathid"]) && isset($_SESSION["wtw_uploadpathid"])) {
	$uploadpathid = $_SESSION["wtw_uploadpathid"];
}
	$jsdata = "<script type=\"text/javascript\">\r\n";
	if (defined('wtw_devmode')) {
		$jsdata .= "	var wtw_devmode = '".wtw_devmode."';\r\n";
	} else {
		$jsdata .= "	var wtw_devmode = '0';\r\n";
	}
	if (defined('wtw_defaultdomain')) {
		$jsdata .= "	var wtw_defaultdomain = '".wtw_defaultdomain."';\r\n";
	} else {
		$jsdata .= "	var wtw_defaultdomain = '';\r\n";
	}
	if (defined('wtw_defaultsitename')) {
		$jsdata .= "	var wtw_defaultsitename = '".wtw_defaultsitename."';\r\n";
	} else {
		$jsdata .= "	var wtw_defaultsitename = '';\r\n";
	}
	if (defined('wtw_googleanalytics')) {
		$jsdata .= "	var wtw_googleanalytics = '".wtw_googleanalytics."';\r\n";
	} else {
		$jsdata .= "	var wtw_googleanalytics = '';\r\n";
	}
	$jsdata .= "	var wtw_protocol = '".$wtw->protocol."';\r\n";
	$jsdata .= "	var wtw_domainurl = '".$wtw->domainurl."';\r\n";
	$jsdata .= "	var wtw_domainname = '".$wtw->domainname."';\r\n";
	$jsdata .= "	var community = '".$wtw->community."';\r\n";
	$jsdata .= "	var building = '".$wtw->building."';\r\n";
	$jsdata .= "	var thinging = '".$wtw->thing."';\r\n";
	$jsdata .= "	var communityid = '".$wtw->communityid."';\r\n";
	$jsdata .= "	var buildingid = '".$wtw->buildingid."';\r\n";
	$jsdata .= "	var thingid = '".$wtw->thingid."';\r\n";
	$jsdata .= "	var wtw_domain;\r\n";
	$jsdata .= "	var wtw_uploads = [];\r\n";
	$jsdata .= "	var wtw_version = \"".$wtw->version."\";\r\n";
	$jsdata .= "	var wtw_versiondate = \"".$wtw->versiondate."\";\r\n";
	$jsdata .= "	var wtw_versiontext = \"HTTP3D Inc. (v".$wtw->version.") ".date('m-d-Y', strtotime($wtw->versiondate))."\";\r\n";
	$jsdata .= "	try {\r\n";
	$jsdata .= "		wtw_domain = JSON.stringify(".json_encode($wtw->getSceneSetting()).");\r\n";
	$jsdata .= "	} catch(ex) {\r\n 			console.log('core-snippets-checkloadurl=' + ex.message);\r\n";
	$jsdata .= "	}\r\n";
	$jsdata .= "</script>"; 
echo $jsdata;
$zver = $wtw->version;
$zver = date("Y-m-d-H-i-s");
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<link rel="stylesheet" type="text/css" href="/content/plugins/wtw-avatars/assets/css/styles.css" />
        <title>WalkTheWeb Avatar Designer</title>
		<script src="/core/scripts/engine/earcut.js?x=<?php echo $zver; ?>"></script>
		<script src="/core/scripts/engine/babylon.js?x=<?php echo $zver; ?>"></script>
		<script src="/core/scripts/engine/babylonjs.loaders.min.js?x=<?php echo $zver; ?>"></script>
		<script src="/core/scripts/engine/babylonjs.postProcess.min.js?x=<?php echo $zver; ?>"></script>
		<script src="/core/scripts/engine/babylon.gui.min.js?x=<?php echo $zver; ?>"></script>
		<script src="/core/scripts/engine/babylonjs.proceduralTextures.min.js?x=<?php echo $zver; ?>"></script>
		<script src="/core/scripts/engine/babylonjs.materials.min.js?x=<?php echo $zver; ?>"></script>
		<script src="/core/scripts/engine/pep.js?x=<?php echo $zver; ?>"></script>
		<script src="/core/scripts/engine/loader.js?x=<?php echo $zver; ?>"></script>
		<script src="/core/scripts/engine/meshwriter.min.js?x=<?php echo $zver; ?>"></script>
        <script src="/content/plugins/wtw-avatars/scripts/wtwavatars_common.js?x=<?php echo $zver; ?>"></script>
        <script src="/content/plugins/wtw-avatars/scripts/wtwavatars_designer.js?x=<?php echo $zver; ?>"></script>
		<script src="/core/scripts/avatars/wtw_basicavatars.js?x=<?php echo $zver; ?>"></script>
		<script src="/core/scripts/avatars/wtw_transitionsavatars.js?x=<?php echo $zver; ?>"></script>
		<script src="/core/scripts/avatars/wtw_loadavatar.js?x=<?php echo $zver; ?>"></script>
		<script src="/core/scripts/coverings/wtw_addcoveringlist.js?x=<?php echo $zver; ?>"></script>
		<script src="/core/scripts/coverings/wtw_basiccoverings.js?x=<?php echo $zver; ?>"></script>
		<script src="/core/scripts/molds/wtw_addmoldlist.js?x=<?php echo $zver; ?>"></script>
		<script src="/core/scripts/molds/wtw_basicmolds.js?x=<?php echo $zver; ?>"></script>
		<script src="/core/scripts/prime/wtw_objectdefinitions.js?x=<?php echo $zver; ?>"></script>
    </head>
	<body>
		<canvas id='renderCanvas' touch-action='none'></canvas>
		<input type="hidden" id="wtw_activemenu" />
		<input type="hidden" id="wtw_serverinstanceid" value="<?php echo $wtw->serverinstanceid; ?>" />
		<input type="hidden" id="wtw_tcontentpath" value="<?php echo $wtw->contentpath; ?>" />
		<input type="hidden" id="wtw_tuploadpathid" value="<?php echo $uploadpathid; ?>" />
		<input type="hidden" id="wtw_tuserid" value="<?php echo $wtw->userid; ?>" />
		<input type="hidden" id="wtw_tuserip" value="<?php echo $wtw->userip; ?>" />
		<input type="hidden" id="wtw_tglobaluserid" value="" />
		<input type="hidden" id="wtw_tglobaluseravatarid" value="" />
		<input type="hidden" id="wtw_tglobalavatar" value="1" />
		<input type="hidden" id="wtw_tinstanceid" />
		<input type="hidden" id="wtw_tusertoken" />
		<input type="hidden" id="wtw_tavatarid" />
		<input type="hidden" id="wtw_tuseravatarid" />
		<input type="hidden" id="wtw_tnewavatardisplayname" value="Anonymous" />
		<input type="hidden" id="wtw_tmoldname" />
		<input type="hidden" id="wtw_tavatarpart" />
		<input type="hidden" id="wtw_teditanimationevent" />
		<input type="hidden" id="wtw_tavataranimationevent" />
		<input type="hidden" id="wtw_tanimationfriendlyname" />
		<input type="hidden" id="wtw_tanimationind" />
		<input type="hidden" id="wtw_tcolortype" value="Diffuse" />
	</body>
</html>
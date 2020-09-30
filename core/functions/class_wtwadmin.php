<?php
class wtwadmin {
	/* main $wtwadmin class for WalkTheWeb Websites when browsed from admin.php */
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {

	}	
	
	/* declare public $wtwadmin variables */
	public $adminmenu = array();
	public $adminsubmenu = array();
	public $fullpagedivs = array();
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	public function loadJSAdminData() {
		/* loads the scripts used on the admin.php page - note the browse only version is in the /core/functions/class_wtw-initsession.php file */
		global $wtw;
		$jsdata = "";
		try {	
			$zver = $wtw->version;
			/* alternative used during development to force reload every time */
			/* $zver = date("Y-m-d-H-i-s"); */
			/* additional materials library available: https://github.com/BabylonJS/Babylon.js/tree/master/dist/materialsLibrary/ */
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_common.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_utilities.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_dynamicscripts.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_login.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_uploads.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_analytics.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_downloads.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_cameras.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_hud.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/avatars/wtw_basicavatars.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/avatars/wtw_addavatarlist.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/avatars/wtw_transitionsavatars.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/avatars/wtw_loadavatar.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/avatars/wtw_avatarfunctions.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/hud/wtw_hud.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_objectdefinitions.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/earcut.js?x=".$zver."\"></script>\r\n";
			/* $jsdata .= "<script src=\"/core/scripts/engine/oimo.js?x=".$zver."\"></script>\r\n"; */
			$jsdata .= "<script src=\"/core/scripts/engine/cannon.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylonjs.loaders.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.materials.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylonjs.postProcess.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylon.gui.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/babylonjs.proceduralTextures.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/pep.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/loader.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/engine/meshwriter.min.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_input.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/admin/wtw_admininput.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/actionzones/wtw_basicactionzones.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/actionzones/wtw_addactionzonelist.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/actionzones/wtw_actionzonefunctions.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/coverings/wtw_basiccoverings.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/coverings/wtw_addcoveringlist.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/molds/wtw_basicmolds.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/molds/wtw_addmoldlist.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/molds/wtw_3dblog.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/automations/wtw_basicautomations.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/automations/wtw_addautomationlist.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/vehicles/wtw_vehicles.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_core.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/admin/wtw_adminconnectinggrids.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/admin/wtw_adminactionzones.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/admin/wtw_admincommunities.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/admin/wtw_adminbuildings.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/admin/wtw_adminthings.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/admin/wtw_adminmolds.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/admin/wtw_adminusers.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/admin/wtw_adminmenus.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/admin/wtw_adminforms.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/admin/wtw_admininit.js?x=".$zver."\"></script>\r\n";
			$jsdata .= "<script src=\"/core/scripts/prime/wtw_init.js?x=".$zver."\"></script>\r\n";
			global $wtwplugins;
			$jsdata .= $wtwplugins->getPluginScripts('1', $zver);
		} catch (Exception $e) {
			$wtw->serror("core-functions-class_wtwadmin.php-loadJSAdminData=".$e->getMessage());
		}
		return $jsdata;
	}
	
	public function loadCSSAdminData() {
		/* loads the CSS stylesheets specific to core and admin */
		global $wtw;
		global $wtwplugins;
		$cssdata = "";
		try {	
			$cssdata .= "<link rel=\"stylesheet\" type=\"text/css\" href=\"/core/styles/wtw_core.css\" />\r\n";
			$cssdata .= "<link rel=\"stylesheet\" type=\"text/css\" href=\"/core/styles/wtw_admin.css\" />\r\n";
			$cssdata .= $wtwplugins->getPluginStylesheets('1');
		} catch (Exception $e) {
			$wtw->serror("core-functions-class_wtwadmin.php-loadCSSAdminData=".$e->getMessage());
		}
		return $cssdata;
	}
	
	public function loadMainElementsAdmin() {
		/* these are the main page elements such as canvases and graphic helpers */
		global $wtw;
		$mainelements = "";
		try {
			$mainelements .= "<div id=\"wtw_confirmform\" class=\"wtw-popupform\">\r\n";
			$mainelements .= "	<div id=\"wtw_browseheader\" class=\"wtw-browseheader\" style=\"margin-top:0px;\">\r\n";
			$mainelements .= "		<div id=\"wtw_browseheadercloseconfirmation\" class=\"wtw-browseclose\" onclick=\"WTW.closeConfirmation();\">\r\n";
			$mainelements .= "			<img src=\"/content/system/images/menuclose.png\" alt=\"Close\" title=\"Close\" onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
			$mainelements .= "		</div>\r\n";
			$mainelements .= "		<h2 id=\"wtw_confirmformtitle\" style=\"margin:0px 15px 0px 15px;padding-top:10px;padding-bottom:10px\">Confirm</h2>\r\n";
			$mainelements .= "	</div>\r\n";
			$mainelements .= "	<div class=\"wtw-center\">\r\n";
			$mainelements .= "		<div style=\"width:80%;height:170px;display:inline-block;vertical-align:top;text-align:center;margin-left:10%;margin-right:10%;\">\r\n";
			$mainelements .= "			<div>\r\n";
			$mainelements .= "				<h1 id=\"wtw_confirmheading\" style=\"color:black;\">Confirm</h1>\r\n";
			$mainelements .= "				<div id=\"wtw_confirmtext\" style=\"color:red;\"></div>\r\n";
			$mainelements .= "				<br /><br /><br />\r\n";
			$mainelements .= "			<input type=\"button\" id=\"wtw_bconfirm\" value=\"Confirm\" class=\"wtw-redbutton\" onclick=\"WTW.completedConfirmation(dGet('wtw_tconfirmid').value);WTW.blockPassThrough(); return (false);\" style=\"cursor: pointer;font-size:large;\" /> &nbsp;&nbsp;&nbsp;\r\n";
			$mainelements .= "			<input type=\"button\" id=\"wtw_bcancelconfirm\" value=\"Cancel\" class=\"wtw-yellowbutton\" onclick=\"WTW.closeConfirmation();WTW.blockPassThrough(); return (false);\" style=\"cursor: pointer;font-size:large;\" />\r\n";
			$mainelements .= "			</div>\r\n";
			$mainelements .= "		</div>\r\n";
			$mainelements .= "	</div>\r\n";
			$mainelements .= "</div>\r\n";	
		} catch (Exception $e) {
			$wtw->serror("core-functions-class_wtwadmin.php-loadMainElementsAdmin=".$e->getMessage());
		}
		return $mainelements;
	}		

	public function loadHiddenFieldsAdmin() {
		/* these are used to pass information to and from the animated canvas and the database */
		global $wtw;
		$hiddenfields = "";
		try {
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_returnpath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_sharehash\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tcommunityid\" value=\"".$wtw->communityid."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tcommunityind\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tcommunitysnapshotid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tbuildingid\" value=\"".$wtw->buildingid."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_teditbuildingind\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tbuildingsnapshotid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tthingid\" value=\"".$wtw->thingid."\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tthingind\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tthingsnapshotid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tnewmold\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldind\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldwebtype\" />\r\n";	
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldshape\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmolduploadobjectid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldobjectfolder\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldcoveringold\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldimageind\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldcsgmoldid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtextureid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturepath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebumpid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebumppath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldvideoid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldvideopath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldvideoposterid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldvideoposterpath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldheightmapid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldheightmappath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldmixmapid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldmixmappath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturerid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturerpath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturegid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturegpath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebpath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebumprid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebumprpath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebumpgid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebumpgpath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebumpbid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldtexturebumpbpath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldaddimageid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldaddimagepath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldaddimagehoverid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldaddimagehoverpath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldaddimageclickid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldaddimageclickpath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldactionzoneid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldjsfunction\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldjsparameters\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldpath1points\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldpath2points\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldsoundid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldsoundpath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldsoundname\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldsoundconeinnerangle\" /><!-- degrees -->\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldsoundconeouterangle\" /><!-- degrees -->\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldsoundconeoutergain\" /><!-- 0 to 1 -->\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tmoldwebstyle\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tconfirmid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_teditconnectinggridind\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_teditconnectinggridid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_teditloadactionzoneid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tparentwebid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tparentwebtype\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tchildwebid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tchildwebtype\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tactionzoneid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tactionzoneind\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tactionzonemovementtype\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tactionzonerotateaxis\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tattachmoldid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_taxisscalingx\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_taxisscalingy\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tactionzonetype\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tactionzoneshape\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tactionzonejsfunction\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tactionzonejsparameters\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_twaterpositiony\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tskydomeid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tskyinclinationbackup\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tskyluminancebackup\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tskyazimuthbackup\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tskyrayleighbackup\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tskyturbiditybackup\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tskymiedirectionalgbackup\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tskymiecoefficientbackup\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_textendedgroundtextureid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_textendedgroundtexturepath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_teditpointindex\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tobjectanimationid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tuploadobjectid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tobjectfolder\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tobjectfile\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tdeletefile\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tdeleteanimation\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tobjectsoundid\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tobjectsoundpath\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_twebaliasid\" maxlength=\"16\" />\r\n";
			$hiddenfields .= "<input type=\"hidden\" id=\"wtw_tbackupfullpageformtitle\" />\r\n";
			$hiddenfields .= "<img id=\"wtw_tobjectsoundicon\" style=\"visibility:hidden;display:none;\" />\r\n";
		} catch (Exception $e) {
			$wtw->serror("core-functions-class_wtwadmin.php-loadHiddenFieldsAdmin=".$e->getMessage());
		}
		return $hiddenfields;
	}

	public function loadFullPageFormAdmin() {
		/* admin menu can trigger full page setings - these are different pages that can turn off-on (show/hide) */
		global $wtwdb;
		$pagedata = "";
		try {
			$pagedata .= "<div id=\"wtw_fullpageform\" class=\"wtw-pageform\" style=\"display:none;\">\r\n";
			$pagedata .= "	<div class=\"wtw-pageheader\">\r\n";
			$pagedata .= "		<img src=\"/content/system/images/menuclose.png\" alt=\"Close\" title=\"Close\" onclick=\"WTW.closeFullPageForm();\" onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" class=\"wtw-pageclose\" />\r\n";
			$pagedata .= "		<img id=\"wtw_arrowicon\" src=\"/content/system/images/menuarrow32.png\" alt=\"\" title=\"\" class=\"wtw-toparrowicon\" />\r\n";
			$pagedata .= "		<div id=\"wtw_fullpageformtitle\"><div class=\"wtw-toparrowtext\">Media Library</div></div><div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "	</div>\r\n";
			
			/* dashboard page */
			$pagedata .= "	<div id=\"wtw_dashboardpage\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			$pagedata .= "		<div id=\"wtw_loadingdashboard\" class=\"wtw-loadingnotice\">Loading...</div>\r\n";
			$pagedata .= "		<div id=\"wtw_dashboard\">\r\n";
			$pagedata .= "			<div id=\"wtw_userwebcount\" class=\"wtw-dashboardboxleft\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\" onclick=\"WTW.toggleDashboardBox('wtw_webcountdiv');\"><div id=\"wtw_webcountdivarrow\" class=\"wtw-divarrow\">⯅</div>3D Website Count</div>\r\n";
			$pagedata .= "				<div id=\"wtw_webcountdiv\" class=\"wtw-dashboardboxmax\">\r\n";
			$pagedata .= "					<h3 class=\"wtw-black\">My 3D Websites</h3>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">3D Community Scenes</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mycommcount\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">3D Buildings</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mybuildcount\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">3D Things</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mythingcount\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<h3 class=\"wtw-black\">Access to Other 3D Websites</h3>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">3D Community Scenes</div>\r\n";
			$pagedata .= "					<div id=\"wtw_othercommcount\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">3D Buildings</div>\r\n";
			$pagedata .= "					<div id=\"wtw_otherbuildcount\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">3D Things</div>\r\n";
			$pagedata .= "					<div id=\"wtw_otherthingcount\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div>\r\n";
			$pagedata .= "	</div>\r\n";
			
			/* updates page */
			$pagedata .= "	<div id=\"wtw_updatespage\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			$pagedata .= "		<div id=\"wtw_loadingupdates\" class=\"wtw-loadingnotice\">Checking for Updates...</div>\r\n";
			$pagedata .= "		<div id=\"wtw_updatespagescroll\" class=\"wtw-formscroll\">\r\n";
			$pagedata .= "			<div id=\"wtw_allupdates\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardboxtitle\">Updates</div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "						<div id=\"wtw_updatelist\"></div>\r\n";
			$pagedata .= "						<div id=\"wtw_updatedetailslist\"></div>\r\n";
			$pagedata .= "						<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "						<div id=\"wtw_updatepluginlist\"></div>\r\n";
			$pagedata .= "					</div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div>\r\n";
			$pagedata .= "	</div>\r\n";

			/* media library - 3d downloads */
			$pagedata .= "	<div id=\"wtw_showimportpage\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			$pagedata .= "		<div id=\"wtw_importhorizontalmenu\" class=\"wtw-horizontalmenu\">\r\n";
			$pagedata .= "			<div id=\"wtw_menumedialibrary\" class=\"wtw-menutabtop\" onclick=\"WTW.openFullPageForm('medialibrary','');\">Back</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuwtwcommunities\" class=\"wtw-menutabtopselected\" onclick=\"WTW.openFullPageForm('importpage','communities');\">3D Communities</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuwtwbuildings\" class=\"wtw-menutabtop\" onclick=\"WTW.openFullPageForm('importpage','buildings');\">3D Buildings</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuwtwthings\" class=\"wtw-menutabtop\" onclick=\"WTW.openFullPageForm('importpage','things');\">3D Things</div>\r\n";
			$pagedata .= "			<div id=\"searchcommunitiesdiv\" class=\"wtw-searchbar\">\r\n";
			$pagedata .= "				<b>Search:</b> <input id='wtw_tcommunitysearch' type='text' value='' size='20' maxlength='255' />\r\n";
			$pagedata .= "				<input id='wtw_bcommunitysearch' type='button' value='Go' onclick=\"WTW.communitySearch(dGet('wtw_tcommunitysearch').value);\" style='font-size:1.4em;border-radius:10px;' />\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "			<div id=\"searchbuildingsdiv\" class=\"wtw-searchbar\">\r\n";
			$pagedata .= "				<b>Search:</b> <input id='wtw_tbuildingsearch' type='text' value='' size='20' maxlength='255' />\r\n";
			$pagedata .= "				<input id='wtw_bbuildingsearch' type='button' value='Go' onclick=\"WTW.buildingSearch(dGet('wtw_tbuildingsearch').value);\" style='font-size:1.4em;border-radius:10px;' />\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "			<div id=\"searchthingsdiv\" class=\"wtw-searchbar\">\r\n";
			$pagedata .= "				<b>Search:</b> <input id='wtw_tthingsearch' type='text' value='' size='20' maxlength='255' />\r\n";
			$pagedata .= "				<input id='wtw_bthingsearch' type='button' value='Go' onclick=\"WTW.thingSearch(dGet('wtw_tthingsearch').value);\" style='font-size:1.4em;border-radius:10px;' />\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div><div class=\"wtw-clear\"></div><hr />\r\n";
			$pagedata .= "		<div style='width:100%;margin:0px;text-align:center;'>\r\n";
			$pagedata .= "			<!--img src='/content/system/images/wtwlogo.png' / -->\r\n";
			$pagedata .= "			<div id=\"wtw_selectwebform\">\r\n";
			$pagedata .= "				<div id='wtw_commtempsearchresults' style='margin-left:20px;text-align:left;overflow-y:auto;overflow-x:hidden;'></div>\r\n";
			$pagedata .= "				<div id='wtw_buildtempsearchresults' style='margin-left:20px;text-align:left;overflow-y:auto;overflow-x:hidden;'></div>\r\n";
			$pagedata .= "				<div id='wtw_thingtempsearchresults' style='margin-left:20px;text-align:left;overflow-y:auto;overflow-x:hidden;'></div>\r\n";
			$pagedata .= "				<div id=\"wtw_downloadcomplete\" class=\"wtw-hide\">\r\n";
			$pagedata .= "					<h3 class=\"wtw-black\">Download Complete</h3><br />\r\n";
			$pagedata .= "					<div id=\"wtw_downloadcompletemessage\">You can find your <b>New 3D Community</b> in the <b>Admin Menu</b><br />or select from the following:</div><br />\r\n";
			$pagedata .= "					<input id='wtw_bopenwebdownload' type='button' value='Open Your New 3D Community in the Editor' onclick=\"\" style='font-size:1.4em;border-radius:10px;cursor:pointer;' /><br /><br />\r\n";
			$pagedata .= "					<input id='wtw_bcontinuewebdownload' type='button' value='Continue Searching for Downloads' onclick=\"\" style='font-size:1.4em;border-radius:10px;cursor:pointer;' /><br /><br />\r\n";
			$pagedata .= "					<input id='wtw_bclosewebdownload' type='button' value='Close WalkTheWeb Downloads' onclick=\"WTW.closeFullPageForm();\" style='font-size:1.4em;border-radius:10px;cursor:pointer;' /><br /><br />\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "				<div id=\"wtw_installprogress\" class=\"wtw-hide wtw-iprogresssection\">\r\n";
			$pagedata .= "				<br /><h3 class=\"wtw-center wtw-black\" style='margin-top:0px;'>Installing the 3D Community Scene</h3>\r\n";
			$pagedata .= "				<div id=\"wtw_progresstext\" class=\"wtw-iprogresstext\">&nbsp;</div>\r\n";
			$pagedata .= "				<div class=\"wtw-iprogressdiv\">\r\n";
			$pagedata .= "					<div id=\"wtw_progressbar\" class=\"wtw-iprogressbar\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div><br />\r\n";
			$pagedata .= "	</div>\r\n";
			
			/* media library - select image page */
			$pagedata .= "	<div id=\"wtw_selectimagepage\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			$pagedata .= "		<div id=\"wtw_horizontalmenu\" class=\"wtw-horizontalmenu\">\r\n";
			$pagedata .= "			<div id=\"wtw_bstartimageupload\" class=\"wtw-uploadbutton\" onclick=\"WTW.startUploadImage(this.innerHTML);return (false);\">Upload Image</div>\r\n";
			$pagedata .= "			<input type=\"file\" id=\"wtw_fileupload\" name=\"wtw_fileupload\" class=\"wtw-hide\" onchange=\"WTW.uploadFile();\" />\r\n";
			$pagedata .= "			<input type=\"file\" id=\"wtw_filesupload\" name=\"wtw_filesupload[]\" class=\"wtw-hide\" multiple=\"true\" onchange=\"WTW.uploadFiles();\" />\r\n";
			$pagedata .= "			<div id=\"wtw_menufileselect\" class=\"wtw-menufileselect\" >\r\n";
			$pagedata .= "				<select id=\"wtw_fileselectcategory\" class=\"wtw-fileselectcategory\" onchange=\"WTW.selectFileForm();\">\r\n";
			$pagedata .= "					<option value=\"\"> - All - </option>\r\n";
			$pagedata .= "					<option value=\"image\">Images</option>\r\n";
			$pagedata .= "					<option value=\"video\">Videos</option>\r\n";
			$pagedata .= "					<option value=\"audio\">Sounds</option>\r\n";
			$pagedata .= "					<option value=\"doc\">Documents</option>\r\n";
			$pagedata .= "					<option value=\"object\">3D Objects</option>\r\n";
			$pagedata .= "				</select>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuimagecommunity\" class=\"wtw-menutabtop\" onclick=\"WTW.setImageMenu(1);\">3D Community Files</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuimagemy\" class=\"wtw-menutabtop\" onclick=\"WTW.setImageMenu(2);\">My Files</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuimagestock\" class=\"wtw-menutabtop\" onclick=\"WTW.setImageMenu(3);\">Stock Files</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuuploadedobjects\" class=\"wtw-menutabtop\" onclick=\"WTW.setImageMenu(4);\">3D Objects</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuwtwdownloads\" class=\"wtw-menutabtop\" onclick=\"WTW.openFullPageForm('importpage','communities');;\">WalkTheWeb Downloads</div>\r\n";
			$pagedata .= "			<div id=\"wtw_hiddenimagesoption\" class=\"wtw-hiddenimageoption\">\r\n";
			$pagedata .= "				<input type=\"checkbox\" id=\"wtw_bshowhiddenimages\" onchange=\"WTW.selectFileForm(this);\" class=\"wtw-cursorpointer\" /> <div id=\"wtw_showhiddenimagesdiv\" onclick=\"WTW.selectFileForm(this);\" class=\"wtw-showimageoption\">Show Hidden Images</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div><div class=\"wtw-clear\"></div><hr>\r\n";
			$pagedata .= "		<div id=\"wtw_loadingselectimage\" class=\"wtw-loadingnotice\">Loading...</div>\r\n";
			$pagedata .= "		<div id=\"wtw_selectimageformscroll\" class=\"wtw-normalwrap\">\r\n";
			$pagedata .= "			<div id=\"wtw_menuimagecommunitydiv\" class=\"wtw-subdiv\">\r\n";
			$pagedata .= "				<div id=\"wtw_communityimagesdiv\" class=\"wtw-fullpage\"></div>\r\n";
			$pagedata .= "				<iframe id=\"wtw_communityimagesframe\" class=\"wtw-imagesframe\" src=\"\" scrolling=\"yes\" ></iframe>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuimagemydiv\" class=\"wtw-subdiv\">\r\n";
			$pagedata .= "				<div id=\"wtw_myimagesdiv\" class=\"wtw-fullpage\"></div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuimagestockdiv\" class=\"wtw-subdiv\">\r\n";
			$pagedata .= "				<div id=\"wtw_stockimagesdiv\" class=\"wtw-fullpage\"></div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "			<div id=\"wtw_menuuploadedobjectsdiv\" class=\"wtw-subdiv\">\r\n";
			$pagedata .= "				<div id=\"wtw_uploadedobjectsdiv\" class=\"wtw-fullpage\" style=\"display:none;\"></div>\r\n";
			$pagedata .= "				<div id=\"wtw_uploadedobjectdetailsdiv\" class=\"wtw-fullpage\" style=\"display:none;\">\r\n";
			$pagedata .= "					<div id=\"wtw_uploadedobjectsnamediv\"></div>\r\n";
			$pagedata .= "					<div id=\"wtw_uploadedobjectsfilesdiv\"></div>\r\n";
			$pagedata .= "					<div id=\"wtw_uploadedobjectsanimationsdiv\"></div>\r\n";
			$pagedata .= "					<div class='wtw-clear'></div>\r\n";
			$pagedata .= "					<div id='wtw_addanimationdiv' class='wtw-objectcontainer' style='display:none;visibility:hidden;'><div id='wtw_addanimationtitle' class='wtw-objectfile'>Edit Animation</div>\r\n";
			$pagedata .= "						<div class='wtw-objectfolder'>\r\n";
			$pagedata .= "							<div><h3 class=\"wtw-black\">Animation Name</h3><div class=\"wtw-examplenote\">(JavaScript Function Name you can call in code)</div>\r\n";
			$pagedata .= "								<input id=\"wtw_tanimationname\" type=\"text\" maxlength=\"255\" />\r\n";
			$pagedata .= "							</div>\r\n";
			$pagedata .= "							<div><h3 class=\"wtw-black\">JavaScript Event</h3>\r\n";
			$pagedata .= "								<select id=\"wtw_tmoldevent\">\r\n";
			$pagedata .= "									<option value=\"\">none</option>\r\n";
			$pagedata .= "									<option value=\"onload\">onload</option>\r\n";
			$pagedata .= "									<option value=\"onclick\">onclick</option>\r\n";
			$pagedata .= "									<option value=\"onclicktoggle\">onclick-toggle</option>\r\n";
			$pagedata .= "									<option value=\"onmouseover\">onmouseover</option>\r\n";
			$pagedata .= "									<option value=\"onmouseout\">onmouseout</option>\r\n";
			$pagedata .= "									<option value=\"\" style=\"background-color:yellow;\">--- Avatar Movements ---</option>\r\n";
			$pagedata .= "									<option value=\"onwait\">Idle or Waiting</option>\r\n";
			$pagedata .= "									<option value=\"onwalk\">Walk</option>\r\n";
			$pagedata .= "									<option value=\"onwalkbackwards\">Walk Backwards</option>\r\n";
			$pagedata .= "									<option value=\"onjump\">Jump</option>\r\n";
			$pagedata .= "									<option value=\"onrun\">Run</option>\r\n";
			$pagedata .= "									<option value=\"onsit\">Stand-to-Sit</option>\r\n";
			$pagedata .= "									<option value=\"onstand\">Sit-to-Stand</option>\r\n";
			$pagedata .= "									<option value=\"onstrafeleft\">Strafe Left</option>\r\n";
			$pagedata .= "									<option value=\"onstraferight\">Strafe Right</option>\r\n";
			$pagedata .= "									<option value=\"onturnleft\">Turn Left</option>\r\n";
			$pagedata .= "									<option value=\"onturnright\">Turn Right</option>\r\n";
			$pagedata .= "									<option value=\"onpickup\">Pick Up</option>\r\n";
			$pagedata .= "									<option value=\"onputdown\">Put Down</option>\r\n";
			$pagedata .= "								</select>\r\n";
			$pagedata .= "							</div>\r\n";
			$pagedata .= "							<div><h3 class=\"wtw-black\">Mesh Name</h3><div class=\"wtw-examplenote\">(name of sub-mesh of 3D Object or leave blank for full 3D Object)</div>\r\n";
			$pagedata .= "								<input id=\"wtw_tmoldnamepart\" type=\"text\" maxlength=\"255\" />\r\n";
			$pagedata .= "							</div>\r\n";
			$pagedata .= "							<div><h3 class=\"wtw-black\">Start Frame</h3>\r\n";
			$pagedata .= "								<input id=\"wtw_tstartframe\" type=\"text\" maxlength=\"15\" />\r\n";
			$pagedata .= "							</div>\r\n";
			$pagedata .= "							<div><h3 class=\"wtw-black\">End Frame</h3>\r\n";
			$pagedata .= "								<input id=\"wtw_tendframe\" type=\"text\" maxlength=\"15\" />\r\n";
			$pagedata .= "							</div><br />\r\n";
			$pagedata .= "							<input type=\"checkbox\" id=\"wtw_tanimationloop\" class=\"wtw-smallprint\" value=\"1\" onchange=\"\" /><span style=\"color:#000000;\"> Loop Animation</span><br /><br />\r\n";
			$pagedata .= "							<div id=\"wtw_fileadvancedoptslink\" onclick=\"WTW.toggleAdvanced(this, 'wtw_fileadvancedopts');\" class=\"wtw-showhideadvancedblack\">-- Show Advanced Options --</div>\r\n";
			$pagedata .= "							<div id=\"wtw_fileadvancedopts\" style=\"display:none;visibility:hidden;\">\r\n";
			$pagedata .= "								<div><h3 class=\"wtw-black\">Speed Ratio<div class=\"wtw-examplenote\">(Original speed: 1.00)</div></h3>\r\n";
			$pagedata .= "									<input id=\"wtw_tspeedratio\" type=\"text\" maxlength=\"15\" />\r\n";
			$pagedata .= "								</div>\r\n";
			$pagedata .= "								<div><h3 class=\"wtw-black\">Animation End Script</h3><div class=\"wtw-examplenote\">(optional JavaScript Function to play when animation ends)</div>\r\n";
			$pagedata .= "									<input id=\"wtw_tanimationendscript\" type=\"text\" maxlength=\"255\" />\r\n";
			$pagedata .= "								</div>\r\n";
			$pagedata .= "								<div><h3 class=\"wtw-black\">Animation End Script Parameters</h3><div class=\"wtw-examplenote\">(comma seperated values or blank)</div>\r\n";
			$pagedata .= "									<input id=\"wtw_tanimationendparameters\" type=\"text\" maxlength=\"255\" />\r\n";
			$pagedata .= "								</div><br />\r\n";
			$pagedata .= "								<input type=\"checkbox\" id=\"wtw_tstopcurrentanimations\" class=\"wtw-smallprint\" value=\"1\" onchange=\"\" /><span style=\"color:#000000;\"> Stop Current Animation when played</span><br /><br />\r\n";
			$pagedata .= "								<img id=\"wtw_objectsoundicon\" src=\"/content/system/images/3dsound.png\" class=\"wtw-adminiconimage\" alt=\"\" title=\"\" /> &nbsp;\r\n";
			$pagedata .= "								<div id=\"wtw_objectselectedsound\"></div>\r\n";
			$pagedata .= "								<div class='wtw-yellowbutton' style='width:150px;text-align:center;cursor:pointer;' onclick=\"WTW.openFullPageForm('medialibrary','audio','objectsound','wtw_tobjectsoundid','wtw_tobjectsoundpath','wtw_tobjectsoundicon');\">Select Sound</div>\r\n";
			$pagedata .= "								<div><h3 class=\"wtw-black\">Sound Max Distance<div class=\"wtw-examplenote\">(Linear Default: 100)</div></h3>\r\n";
			$pagedata .= "									<input id=\"wtw_tobjectsoundmaxdistance\" type=\"text\" maxlength=\"15\" />\r\n";
			$pagedata .= "								</div>\r\n";
			$pagedata .= "							</div><br /><br />\r\n";
			$pagedata .= "							<div class='wtw-greenbutton' style='width:318px;' onclick=\"WTW.saveObjectAnimation();\">Save Animation</div><br /><br />\r\n";
			$pagedata .= "							<div class='wtw-redbutton' style='width:150px;text-align:center;margin-right:13px;cursor:pointer;' onclick=\"dGet('wtw_tdeleteanimation').value=dGet('wtw_tobjectanimationid').value;WTW.deleteObjectAnimation(dGet('wtw_tdeleteanimation').value, dGet('wtw_tuploadobjectid').value);\">Delete Animation</div><div id='wtw_canceldeleteanimation' class='wtw-yellowbutton' style='width:150px;text-align:center;cursor:pointer;' onclick=\"WTW.hide('wtw_addanimationdiv');\">Cancel</div>\r\n";
			$pagedata .= "						</div>\r\n";
			$pagedata .= "					</div>\r\n";
			$pagedata .= "					<div class='wtw-yellowbutton' style='width:150px;margin-left:25px;text-align:center;' onclick=\"WTW.loadUploadedObjectsDiv(true);\">Close</div><br /><br />\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div>\r\n";
			$pagedata .= "	</div>\r\n";
			
			/* media library - file details page */
			$pagedata .= "	<div id=\"wtw_showfilepage\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			$pagedata .= "		<div id=\"wtw_loadingmediapage\" class=\"wtw-loadingnotice\">Loading...</div>\r\n";
			$pagedata .= "		<div id=\"wtw_mediapage\" class=\"wtw-fullpage\">\r\n";
			$pagedata .= "			<div id=\"wtw_fileinfo\" class=\"wtw-dashboardboxleft\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\">File Information</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">File Title</div>\r\n";
			$pagedata .= "					<div id=\"wtw_uploadfiletitle\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">File Name</div>\r\n";
			$pagedata .= "					<div id=\"wtw_uploadfilename\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">File Type</div>\r\n";
			$pagedata .= "					<div id=\"wtw_uploadfiletype\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">Upload Date</div>\r\n";
			$pagedata .= "					<div id=\"wtw_uploadupdatedate\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "			<div id=\"wtw_imagethumbnailinfo\" class=\"wtw-dashboardboxleft\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\">Thumbnail Image</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div class=\"wtw-center\">\r\n";
			$pagedata .= "						<img id='wtw_mediathumbnail' />\r\n";
			$pagedata .= "					</div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">File Size</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mediathumbnailsize\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">Dimensions</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mediathumbnaildimensions\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">File Path</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mediathumbnailpath\" class=\"wtw-dashboardvalueurl\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div><br />\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardvalueurl\"><a id=\"wtw_mediathumbnaildownload\" download>Download Image</a></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "			<div id=\"wtw_imagewebsizeinfo\" class=\"wtw-dashboardboxleft\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\">Websize Image</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div class=\"wtw-center\">\r\n";
			$pagedata .= "						<img id=\"wtw_mediawebsize\" class=\"wtw-fullimage\" />\r\n";
			$pagedata .= "					</div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">File Size</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mediawebsizesize\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">Dimensions</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mediawebsizedimensions\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">File Path</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mediawebsizepath\" class=\"wtw-dashboardvalueurl\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div><br />\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardvalueurl\"><a id=\"wtw_mediawebsizedownload\" download>Download Image</a></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "			<div id=\"wtw_imageoriginalinfo\" class=\"wtw-dashboardboxleftfull\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\">Original Image</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div class=\"wtw-center\">\r\n";
			$pagedata .= "						<img id=\"wtw_mediaoriginal\" class=\"wtw-imagefitwidth\" />\r\n";
			$pagedata .= "					</div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">File Size</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mediaoriginalsize\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">Dimensions</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mediaoriginaldimensions\" class=\"wtw-dashboardvalue\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">File Path</div>\r\n";
			$pagedata .= "					<div id=\"wtw_mediaoriginalpath\" class=\"wtw-dashboardvalueurl\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div><br />\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardvalueurl\"><a id=\"wtw_mediaoriginaldownload\" download>Download Image</a></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div>\r\n";
			$pagedata .= "	</div>\r\n";
			
			/* users roles and functions */
			$pagedata .= "	<div id=\"wtw_userspage\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			$pagedata .= "		<div id=\"wtw_loadingusers\" class=\"wtw-loadingnotice\">Loading...</div>\r\n";
			$pagedata .= "		<div id=\"wtw_allusers\" class=\"wtw-fullpage\">\r\n";
			$pagedata .= "			<div id=\"wtw_alluserswidth\" class=\"wtw-dashboardboxleftfull\">\r\n";
			$pagedata .= "				<div id=\"wtw_alluserstitle\" class=\"wtw-dashboardboxtitle\"><div id='wtw_adduserbutton' class='wtw-greenbuttonright' onclick=\"WTW.addUser();\">Add New</div>All Users</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div id=\"wtw_userlist\"></div>\r\n";
			$pagedata .= "					<div id=\"wtw_userinfo\"></div>\r\n";
			$pagedata .= "					<div id=\"wtw_useradd\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div>\r\n";
			$pagedata .= "	</div>\r\n";
			
			/* plugins list and functions */
			$pagedata .= "	<div id=\"wtw_pluginspage\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			$pagedata .= "		<div id=\"wtw_loadingplugins\" class=\"wtw-loadingnotice\">Loading...</div>\r\n";
			$pagedata .= "		<div id=\"wtw_allplugins\" class=\"wtw-fullpage\">\r\n";
			$pagedata .= "			<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\">All Plugins</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div id=\"wtw_pluginslist\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div>\r\n";
			$pagedata .= "	</div>\r\n";
			
			/* settings page - email server */
			$pagedata .= "	<div id=\"wtw_settingspage\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			$pagedata .= "		<div id=\"wtw_loadingsettings\" class=\"wtw-loadingnotice\">Loading...</div>\r\n";
			$pagedata .= "		<div id=\"wtw_emailserversettings\" class=\"wtw-fullpage\">\r\n";
			$pagedata .= "			<div class=\"wtw-dashboardboxleft\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\">Email Server Settings</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">Email Server (SMTP Host)</div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tsmtphost\" maxlength=\"255\" /></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">SMTP Port</div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tsmtpport\" maxlength=\"7\" /></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">SMTP User Name</div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardvalue\"><input type=\"text\" id=\"wtw_tsmtpusername\" maxlength=\"255\" /></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardlabel\">SMTP Password</div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardvalue\"><input type=\"password\" id=\"wtw_tsmtppassword\" maxlength=\"255\" /></div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div id=\"wtw_emailservercomplete\"></div><br />\r\n";
			$pagedata .= "					<div id=\"wtw_loadingemailserver\" class=\"wtw-loadingnotice\" style=\"margin-left:auto;margin-right:auto;color:#000000;\">Loading...</div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-graymenubutton\" onclick=\"WTW.testEmailServerSettings();\">Send Test Email</div>\r\n";
			$pagedata .= "					<div class=\"wtw-greenmenubutton\" onclick=\"WTW.saveEmailServerSettings();\">Save Settings</div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div>\r\n";
			
			/* settings page - web aliases */
			$pagedata .= "		<div id=\"wtw_webaliassettings\" class=\"wtw-fullpage\">\r\n";
			$pagedata .= "			<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\"><div id='wtw_addwebalias' class='wtw-greenbuttonright' onclick=\"WTW.openAliasForm();WTW.setAliasCommunities();WTW.setAliasBuildings();WTW.setAliasThings();\">Add New</div>Web Alias Settings</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div id='wtw_addwebaliasdiv' class=\"wtw-dashboardboxleftfull wtw-hide\">\r\n";
			$pagedata .= "						<div class=\"wtw-dashboardboxtitle\">Add Web Alias</div>\r\n";
			$pagedata .= "						<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "							<div class=\"wtw-dashboardlabel\">Path Type:&nbsp;\r\n";
			$pagedata .= "								<select id=\"wtw_taliaspathtype\" onclick=\"WTW.setAliasForm(this);\" >\r\n";
			$pagedata .= "									<optgroup label=\"Load Community\">\r\n";
			$pagedata .= "										<option value='1'>Domain Name</option>\r\n";
			$pagedata .= "										<option value='2'>Community</option>\r\n";
			$pagedata .= "										<option value='3'>Building in Community</option>\r\n";
			$pagedata .= "										<option value='4'>Thing in Community</option>\r\n";
			$pagedata .= "										<option value='5'>Thing in Building in Community</option>\r\n";
			$pagedata .= "									</optgroup>\r\n";
			$pagedata .= "									<optgroup label=\"Load Building\">\r\n";
			$pagedata .= "										<option value='6'>Building</option>\r\n";
			$pagedata .= "										<option value='7'>Thing in Building</option>\r\n";
			$pagedata .= "									</optgroup>\r\n";
			$pagedata .= "									<optgroup label=\"Load Thing\">\r\n";
			$pagedata .= "										<option value='8'>Thing</option>\r\n";
			$pagedata .= "									</optgroup>\r\n";
			$pagedata .= "								</select></div>\r\n";
			$pagedata .= "							<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "							<table width='100%'>\r\n";
			$pagedata .= "								<tr>\r\n";
			$pagedata .= "									<td>&nbsp;</td>\r\n";
			$pagedata .= "									<td id='wtw_aliaslevel1'>&nbsp;</td>\r\n";
			$pagedata .= "									<td id='wtw_aliaslevel2'>&nbsp;</td>\r\n";
			$pagedata .= "									<td id='wtw_aliaslevel3'>&nbsp;</td>\r\n";
			$pagedata .= "									<td id='wtw_aliaslevel4'>&nbsp;</td>\r\n";
			$pagedata .= "								</tr>\r\n";
			$pagedata .= "								<tr>\r\n";
			$pagedata .= "									<td><select id=\"wtw_aliasforcehttps\"><option>https://</option><option>http://</option></select></td>\r\n";
			$pagedata .= "									<td id='wtw_aliastext1'><input type=\"text\" id=\"wtw_taliasdomainname\" value='3d.' maxlength=\"255\" /></td>\r\n";
			$pagedata .= "									<td id='wtw_aliastext2'>/<input type=\"text\" id=\"wtw_taliascommunitypublishname\" value='' maxlength=\"255\" /></td>\r\n";
			$pagedata .= "									<td id='wtw_aliastext3'>/<input type=\"text\" id=\"wtw_taliasbuildingpublishname\" value='' maxlength=\"255\" /></td>\r\n";
			$pagedata .= "									<td id='wtw_aliastext4'>/<input type=\"text\" id=\"wtw_taliasthingpublishname\" value='' maxlength=\"255\" /></td>\r\n";
			$pagedata .= "								</tr>\r\n";
			$pagedata .= "								<tr>\r\n";
			$pagedata .= "									<td>&nbsp;</td>\r\n";
			$pagedata .= "									<td id='wtw_aliasselect1'><select id=\"wtw_aliasdomaincommunityid\"></select></td>\r\n";
			$pagedata .= "									<td id='wtw_aliasselect2'>&nbsp;<select id=\"wtw_aliascommunityid\"></select></td>\r\n";
			$pagedata .= "									<td id='wtw_aliasselect3'>&nbsp;<select id=\"wtw_aliasbuildingid\"></select></td>\r\n";
			$pagedata .= "									<td id='wtw_aliasselect4'>&nbsp;<select id=\"wtw_aliasthingid\"></select></td>\r\n";
			$pagedata .= "								</tr>\r\n";
			$pagedata .= "							</table>\r\n";
			$pagedata .= "							<div id='wtw_aliascommunity'>\r\n";
			$pagedata .= "							</div>\r\n";
			$pagedata .= "							<div id='wtw_aliasbuilding'>\r\n";
			$pagedata .= "							</div>\r\n";
			$pagedata .= "							<div id='wtw_aliasthing'>\r\n";
			$pagedata .= "							</div>\r\n";
			$pagedata .= " 						</div>\r\n";
			$pagedata .= "						<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "						<div id=\"wtw_baliasdelete\" class='wtw-redbuttonleft wtw-hide' onclick=\"WTW.saveAliasForm(0);\">Delete Web Alias</div>\r\n";
			$pagedata .= "						<div class='wtw-greenbuttonright' onclick=\"WTW.saveAliasForm(1);\">Save Web Alias</div>\r\n";
			$pagedata .= "						<div class='wtw-yellowbuttonright' onclick=\"WTW.saveAliasForm(-1);\">Cancel</div>\r\n";
			$pagedata .= " 					</div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "					<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$pagedata .= "						<div class=\"wtw-dashboardboxtitle\">Web Aliases</div>\r\n";
			$pagedata .= "						<div id=\"wtw_webaliaslist\"></div><br />\r\n";
			$pagedata .= " 					</div>\r\n";
			$pagedata .= "					<div id=\"wtw_webaliascomplete\"></div><br />\r\n";
			$pagedata .= "					<div id=\"wtw_loadingwebalias\" class=\"wtw-loadingnotice\" style=\"margin-left:auto;margin-right:auto;color:#000000;\">Loading...</div>\r\n";
			$pagedata .= "					<div class=\"wtw-clear\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div>\r\n";
			$pagedata .= "	</div>\r\n";
			
			/* troubleshooting - display error page */
			$pagedata .= "	<div id=\"wtw_errorpage\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			$pagedata .= "		<div id=\"wtw_showerror\" class=\"wtw-fullpage\">\r\n";
			$pagedata .= "			<div class=\"wtw-dashboardboxleftfull\">\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardboxtitle\">Error Information</div>\r\n";
			$pagedata .= "				<div class=\"wtw-dashboardbox\">\r\n";
			$pagedata .= "					<div id=\"wtw_error\"></div>\r\n";
			$pagedata .= "				</div>\r\n";
			$pagedata .= "			</div>\r\n";
			$pagedata .= "		</div>\r\n";
			$pagedata .= "	</div>\r\n";
			
			/* dynamically created full page divs from plugins */
			$pagedata .= "	<div id=\"wtw_fullpageplugins\" class=\"wtw-dashboardpage wtw-hide\" style=\"display:none;\">\r\n";
			foreach ($this->fullpagedivs as $zfullpageitem) {
				$zid = $zfullpageitem["id"];
				$zaccessrequired = $zfullpageitem["accessrequired"]; /* array of allowed roles */
				$zfullpagedata = $zfullpageitem["fullpagedata"];
				if ($wtwdb->hasPermission($zaccessrequired)) {
					/* check for invalid entries */
					if (empty($zid) | !isset($zid)) {
						$zid = $wtwdb->getRandomString(6,1);
					}
					if (empty($zfullpagedata) || !isset($zfullpagedata)) {
						$zfullpagedata = '';
					}
					if (!empty($zfullpagedata) && isset($zfullpagedata)) {
						$pagedata .= "		<div id=\"".$zid."\" class=\"wtw-fullpage\">\r\n";
						$pagedata .= $zfullpagedata;
						$pagedata .= "		</div>\r\n";
					}
				}
			}			
			$pagedata .= "	</div>\r\n";

			$pagedata .= "	<br />\r\n";
			$pagedata .= "	<br />\r\n";
			$pagedata .= "	<br />\r\n";
			$pagedata .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwadmin.php-loadFullPageFormAdmin=".$e->getMessage());
		}
		return $pagedata;
	}

	public function addFullPageForm($zid, $zaccessrequired, $zfullpagedata) {
		/* add form as full page div - used in plugins */
		$zsuccess = false;
		try {	
			$fullpagediv = array(
				'id' => $zid,
				'accessrequired' => $zaccessrequired, 
				'fullpagedata' => $zfullpagedata
			);
			$this->fullpagedivs[count($this->fullpagedivs)] = $fullpagediv;
			
			$zsuccess = true;
		} catch (Exception $e) {
			$this->serror("core-functions-class_wtw-initsession.php-addFullPageForm=".$e->getMessage());
		}
		return $zsuccess;
	}
	
}

	function wtwadmin() {
		return wtwadmin::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwadmin'] = wtwadmin();	

?>
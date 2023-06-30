<?php
class wtwadmin {
	/* main wtwadmin class for WalkTheWeb Websites when browsed from admin.php */
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
		$zjsdata = "";
		try {	
			$zver = $wtw->version;
			$zbabylonversion = $wtw->defaultbabylonversion;
			if (defined('wtw_babylonversion')) {
				$zbabylonversion = wtw_babylonversion;
			}
			/* alternative used during development to force reload every time */
			/* $zver = date("Y-m-d-H-i-s"); */
			/* additional materials library available: https://github.com/BabylonJS/Babylon.js/tree/master/dist/materialsLibrary/ */
			$zjsdata .= "<script src='/core/scripts/prime/wtw_common.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_utilities.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_dynamicscripts.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_login.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_uploads.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_analytics.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_cameras.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/avatars/wtw_basicavatars.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/avatars/wtw_addavatarlist.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/avatars/wtw_transitionsavatars.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/avatars/wtw_loadavatar.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/avatars/wtw_avatarfunctions.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/hud/wtw_hud.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/hud/wtw_hud_fields.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/hud/wtw_hud_cameras.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/hud/wtw_hud_profile.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/hud/wtw_hud_login.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_objectdefinitions.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/ammo.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/recast.js?x=".$zver."'></script>\r\n";
			if (defined('wtw_physicsengine')) {
				switch (wtw_physicsengine) {
					case 'havok':
						$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/HavokPhysics_umd.js?x=".$zver."'></script>\r\n";
						break;
					case 'cannon':
						$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/cannon.js?x=".$zver."'></script>\r\n";
						break;
					case 'oimo':
						$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/oimo.js?x=".$zver."'></script>\r\n"; 
						break;
				}
			} else {
				$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/cannon.js?x=".$zver."'></script>\r\n";
				$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/oimo.js?x=".$zver."'></script>\r\n"; 
			}
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/earcut.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/babylon.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/babylonjs.loaders.min.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/babylonjs.postProcess.min.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/babylon.gui.min.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/babylonjs.proceduralTextures.min.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/babylonjs.materials.min.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/babylon.accessibility.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/pep.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/engine/".$zbabylonversion."/meshwriter.min.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_input.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/admin/wtw_admininput.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/actionzones/wtw_basicactionzones.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/actionzones/wtw_addactionzonelist.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/actionzones/wtw_actionzonefunctions.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/coverings/wtw_basiccoverings.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/coverings/wtw_addcoveringlist.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/molds/wtw_basicmolds.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/molds/wtw_addmoldlist.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/molds/wtw_3dblog.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/molds/wtw_3dforms.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/molds/wtw_3dhtml.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/automations/wtw_basicautomations.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/automations/wtw_addautomationlist.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/vehicles/wtw_vehicles.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_core.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/admin/wtw_adminconnectinggrids.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/admin/wtw_adminactionzones.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/admin/wtw_adminavatars.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/admin/wtw_admincommunities.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/admin/wtw_adminbuildings.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/admin/wtw_adminthings.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/admin/wtw_adminmolds.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/admin/wtw_adminplugins.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/admin/wtw_adminusers.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/admin/wtw_adminmenus.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/admin/wtw_adminforms.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/admin/wtw_admininit.js?x=".$zver."'></script>\r\n";
			$zjsdata .= "<script src='/core/scripts/prime/wtw_init.js?x=".$zver."'></script>\r\n";
			global $wtwplugins;
			$zjsdata .= $wtwplugins->getPluginScripts('1', $zver);
		} catch (Exception $e) {
			$wtw->serror("core-functions-class_wtwadmin.php-loadJSAdminData=".$e->getMessage());
		}
		return $zjsdata;
	}
	
	public function loadCSSAdminData() {
		/* loads the CSS stylesheets specific to core and admin */
		global $wtw;
		global $wtwplugins;
		$zcssdata = "";
		try {	
			$zcssdata .= "<link rel='stylesheet' type='text/css' href='/core/styles/wtw_core.css' />\r\n";
			$zcssdata .= "<link rel='stylesheet' type='text/css' href='/core/styles/wtw_admin.css' />\r\n";
			$zcssdata .= $wtwplugins->getPluginStylesheets('1');
		} catch (Exception $e) {
			$wtw->serror("core-functions-class_wtwadmin.php-loadCSSAdminData=".$e->getMessage());
		}
		return $zcssdata;
	}
	
	public function loadMainElementsAdmin() {
		/* these are the main page elements such as canvases and graphic helpers */
		global $wtw;
		$zmainelements = "";
		try {
			$zmainelements .= "<div id='wtw_confirmform' class='wtw-popupform' onclick='WTW.blockPassThrough();'>\r\n";
			$zmainelements .= "	<div id='wtw_browseheader' class='wtw-browseheader' style='margin-top:0px;'>\r\n";
			$zmainelements .= "		<div id='wtw_browseheadercloseconfirmation' class='wtw-browseclose' onclick='WTW.closeConfirmation();'>\r\n";
			$zmainelements .= "			<img src='/content/system/images/menuclose.png' alt='Close' title='Close' onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" />\r\n";
			$zmainelements .= "		</div>\r\n";
			$zmainelements .= "		<h2 id='wtw_confirmformtitle' style='margin:0px 15px 0px 15px;padding-top:10px;padding-bottom:10px'>Confirm</h2>\r\n";
			$zmainelements .= "	</div>\r\n";
			$zmainelements .= "	<div class='wtw-center' onclick='WTW.blockPassThrough();'>\r\n";
			$zmainelements .= "		<div style='width:80%;height:170px;display:inline-block;vertical-align:top;text-align:center;margin-left:10%;margin-right:10%;'>\r\n";
			$zmainelements .= "			<div>\r\n";
			$zmainelements .= "				<h1 id='wtw_confirmheading' style='color:black;'>Confirm</h1>\r\n";
			$zmainelements .= "				<div id='wtw_confirmtext' style='color:red;'></div>\r\n";
			$zmainelements .= "				<br /><br /><br />\r\n";
			$zmainelements .= "			<input type='button' id='wtw_bconfirm' value='Confirm' class='wtw-redbutton' onclick=\"WTW.completedConfirmation(dGet('wtw_tconfirmid').value);\" style='cursor: pointer;font-size:large;' /> &nbsp;&nbsp;&nbsp;\r\n";
			$zmainelements .= "			<input type='button' id='wtw_bcancelconfirm' value='Cancel' class='wtw-yellowbutton' onclick='WTW.closeConfirmation();' style='cursor: pointer;font-size:large;' />\r\n";
			$zmainelements .= "			</div>\r\n";
			$zmainelements .= "		</div>\r\n";
			$zmainelements .= "	</div>\r\n";
			$zmainelements .= "</div>\r\n";
		} catch (Exception $e) {
			$wtw->serror("core-functions-class_wtwadmin.php-loadMainElementsAdmin=".$e->getMessage());
		}
		return $zmainelements;
	}		

	public function loadHiddenFieldsAdmin() {
		/* these are used to pass information to and from the animated canvas and the database */
		global $wtw;
		$zhiddenfields = "";
		try {
			$zhiddenfields .= "<input type='hidden' id='wtw_returnpath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_sharehash' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tcommunityid' value='".$wtw->communityid."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tcommunityind' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tcommunitysnapshotid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tbuildingid' value='".$wtw->buildingid."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_teditbuildingind' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tbuildingsnapshotid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tthingid' value='".$wtw->thingid."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tthingind' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tthingsnapshotid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_teditavatarid' value='".$wtw->avatarid."' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tavatarsnapshotid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tavataranimationid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tavatarfolder' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tavatarsubfolder' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tavatargroupid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tavataranimationeventid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tavatarfolderdisplay' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_downloadstcols' value='2' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tversionid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tbadges' value='0' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tbadgesupdates' value='0' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tbadgeswtw' value='0' />\r\n";
			$zhiddenfields .= "<input type='hidden' id=\"wtw_filter\" />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tnewmold' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldind' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldwebtype' />\r\n";	
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldshape' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmolduploadobjectid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldobjectfolder' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldcoveringold' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldimageind' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldcsgmoldid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldtextureid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldtexturepath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldtexturebumpid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldtexturebumppath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldvideoid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldvideopath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldvideoposterid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldvideoposterpath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldheightmapid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldheightmappath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldmixmapid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldmixmappath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldtexturerid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldtexturerpath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldtexturegid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldtexturegpath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldtexturebid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldtexturebpath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldtexturebumprid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldtexturebumprpath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldtexturebumpgid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldtexturebumpgpath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldtexturebumpbid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldtexturebumpbpath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldaddimageid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldaddimagepath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldaddimagehoverid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldaddimagehoverpath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldaddimageclickid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldaddimageclickpath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldactionzoneid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id=\"wtw_tmoldjsfunction\" />\r\n";
			$zhiddenfields .= "<input type='hidden' id=\"wtw_tmoldjsparameters\" />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldpath1points' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldpath2points' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldsoundid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldsoundpath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id=\"wtw_tmoldsoundname\" />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldsoundconeinnerangle' /><!-- degrees -->\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldsoundconeouterangle' /><!-- degrees -->\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tmoldsoundconeoutergain' /><!-- 0 to 1 -->\r\n";
			$zhiddenfields .= "<input type='hidden' id=\"wtw_tmoldwebstyle\" />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tconfirmid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_teditconnectinggridind' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_teditconnectinggridid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_teditloadactionzoneid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tparentserverfranchiseid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tparentwebid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tparentwebtype' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tchildserverfranchiseid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tchildwebid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tchildwebtype' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tactionzoneid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tactionzoneind' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tactionzonemovementtype' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tactionzonerotateaxis' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tactionzonevalue1' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tactionzonevalue2' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tactionzonedefaulteditform' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tactionzonerotationdirection' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tattachmoldid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_taxisscalingx' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_taxisscalingy' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tactionzonetype' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tactionzoneshape' />\r\n";
			$zhiddenfields .= "<input type='hidden' id=\"wtw_tactionzonejsfunction\" />\r\n";
			$zhiddenfields .= "<input type='hidden' id=\"wtw_tactionzonejsparameters\" />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_twaterpositiony' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskydomeid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tsceneambientcolorbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tsceneclearcolorbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tsceneuseclonedmeshmapbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tsceneblockmaterialdirtymechanismbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tscenefogenabledbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tscenefogmodebackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tscenefogdensitybackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tscenefogstartbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tscenefogendbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tscenefogcolorbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tsundirectionalintensitybackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tsundiffusecolorbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tsunspecularcolorbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tsungroundcolorbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tsundirectionxbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tsundirectionybackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tsundirectionzbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tbacklightintensitybackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tbacklightdirectionxbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tbacklightdirectionybackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tbacklightdirectionzbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tbacklightdiffusecolorbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tbacklightspecularcolorbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskytypebackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskysizebackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboxfolderbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboxfilebackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboximageleft' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboximageup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboximagefront' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboximageright' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboximagedown' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboximageback' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboximageleftid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboximageupid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboximagefrontid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboximagerightid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboximagedownid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboximagebackid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboximageleftbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboximageupbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboximagefrontbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboximagerightbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboximagedownbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboximagebackbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskypositionoffsetxbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskypositionoffsetybackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskypositionoffsetzbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboxmicrosurfacebackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboxpbrbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboxasenvironmenttexturebackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboxblurbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboxdiffusecolorbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboxspecularcolorbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboxambientcolorbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyboxemissivecolorbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyinclinationbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyluminancebackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyazimuthbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyrayleighbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskyturbiditybackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskymiedirectionalgbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tskymiecoefficientbackup' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_textendedgroundtextureid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_textendedgroundtexturepath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_twaterbumpid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_twaterbumppath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_teditpointindex' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tobjectanimationid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tuploadobjectid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tobjectfolder' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tobjectfile' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tdeletefile' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tdeleteanimation' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tgroupuploadobjectid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tgroupid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tgroupdiv' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tobjectsoundid' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tobjectsoundpath' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_twebdomainid' maxlength='16' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_twebaliasid' maxlength='16' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_taliassiteiconid' maxlength='16' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_taliassiteiconpath' maxlength='256' />\r\n";
			$zhiddenfields .= "<input type='hidden' id='wtw_tapikeyid' maxlength='16' />\r\n";
			$zhiddenfields .= "<input type='hidden' id=\"wtw_tbackupfullpageformtitle\" />\r\n";
			$zhiddenfields .= "<img id='wtw_tobjectsoundicon' class='wtw-hide' />\r\n";
		} catch (Exception $e) {
			$wtw->serror("core-functions-class_wtwadmin.php-loadHiddenFieldsAdmin=".$e->getMessage());
		}
		return $zhiddenfields;
	}

	public function loadFullPageFormAdmin() {
		/* admin menu can trigger full page setings - these are different pages that can turn off-on (show/hide) */
		global $wtwdb;
		global $wtw;
		$zpagedata = "";
		try {
			$zpagedata .= "<div id='wtw_fullpageform' class='wtw-pageform' style='display:none;'>\r\n";
			$zpagedata .= "	<div class='wtw-pageheader'>\r\n";
			$zpagedata .= "		<img src='/content/system/images/menuclose.png' alt='Close' title='Close' onclick='WTW.closeFullPageForm();' onmouseover=\"this.src='/content/system/images/menuclosehover.png';\" onmouseout=\"this.src='/content/system/images/menuclose.png';\" class='wtw-pageclose' />\r\n";
			$zpagedata .= "		<img id='wtw_arrowicon' src='/content/system/images/menuarrow32.png' alt='' title='' class='wtw-toparrowicon' />\r\n";
			$zpagedata .= "		<div id='wtw_fullpageformtitle'><div class='wtw-toparrowtext'>Media Library</div></div><div class='wtw-clear'></div>\r\n";
			$zpagedata .= "	</div>\r\n";
			
			/* dashboard page */
			$zpagedata .= "	<div id='wtw_dashboardpage' class='wtw-dashboardpage wtw-hide' style='display:none;'>\r\n";
			$zpagedata .= "		<div id='wtw_loadingdashboard' class='wtw-loadingnotice'>Loading...</div>\r\n";
			$zpagedata .= "		<div id='wtw_dashboard' style='overflow-y:auto;overflow-x:none;'>\r\n";

			$zpagedata .= "			<div id='wtw_dashboardcol1' style='width:29%;margin:1%;padding:0px;display:inline-block;vertical-align:top;'>\r\n";
			$zpagedata .= "				<div id='wtw_serverstats' class='wtw-dashboardboxleftfull'>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardboxtitle' onclick=\"WTW.toggleDashboardBox('wtw_webcountdiv');\"><div id='wtw_webcountdivarrow' class='wtw-divarrow'>⯅</div>Server Stats and Information</div>\r\n";
			$zpagedata .= "					<div id='wtw_webcountdiv' class='wtw-dashboardboxmax' style='max-height:550px;'>\r\n";
			$zpagedata .= "						<div id='wtw_serverstatslist'></div>\r\n";
			$zpagedata .= "						<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					</div>\r\n";
			$zpagedata .= "				</div>\r\n";

			$zpagedata .= "				<div id='wtw_wtwactivity' class='wtw-dashboardboxleftfull'>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardboxtitle' onclick=\"WTW.toggleDashboardBox('wtw_wtwactivitydiv');\"><div id='wtw_wtwactivitydivarrow' class='wtw-divarrow'>⯅</div>WalkTheWeb Global Latest Activity</div>\r\n";
			$zpagedata .= "					<div id='wtw_wtwactivitydiv' class='wtw-dashboardboxmax' style='max-height:550px;'>\r\n";
			$zpagedata .= "						<div id='wtw_wtwactivitylist'></div>\r\n";
			$zpagedata .= "						<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					</div>\r\n";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";

			$zpagedata .= "			<div id='wtw_dashboardcol2' style='width:62%;margin:1%;padding:0px;display:inline-block;vertical-align:top;'>\r\n";
			$zpagedata .= "				<div id='wtw_videolinks' class='wtw-dashboardboxleftfull wtw-hide'>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardboxtitle' onclick=\"WTW.toggleDashboardBox('wtw_videolinksdiv');\"><div id='wtw_videolinksdivarrow' class='wtw-divarrow'>⯅</div>WalkTheWeb Videos</div>\r\n";
			$zpagedata .= "					<div id='wtw_videolinksdiv' class='wtw-dashboardboxmax' style='min-height:550px;'>\r\n";
			$zpagedata .= "						<div id='wtw_latestvideo'></div>\r\n";
			$zpagedata .= "						<h3 id='wtw_latestvideotitle' class='wtw-black'>WalkTheWeb Video</h3>\r\n";
			$zpagedata .= "						<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "						<div id='wtw_latestvideodetails' class='wtw-dashboardlabel'>Latest Video</div>\r\n";
			$zpagedata .= "						<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "						<h2><a href='https://www.youtube.com/channel/UCEcaZ947Mv1ylLd_MYS1ivg' target='_blank'>View More WalkTheWeb Videos</a></h2>\r\n";
			$zpagedata .= "						<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					</div>\r\n";
			$zpagedata .= "				</div>\r\n";

			$zpagedata .= "				<div id='wtw_downloadqueue' class='wtw-dashboardboxleftfull wtw-hide'>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardboxtitle' onclick=\"WTW.toggleDashboardBox('wtw_downloadqueuediv');\"><div id='wtw_downloadqueuedivarrow' class='wtw-divarrow'>⯅</div>WalkTheWeb Pending Downloads (Queue)</div>\r\n";
			$zpagedata .= "					<div id='wtw_downloadqueuediv' class='wtw-dashboardboxmax'>\r\n";
			$zpagedata .= "						<div id='wtw_downloadingnoticequeue' class='wtw-hide'></div>\r\n";
			$zpagedata .= "						<div id='wtw_downloadqueuelist'></div>\r\n";
			$zpagedata .= "						<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					</div>\r\n";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";

			$zpagedata .= "		</div>\r\n";
			$zpagedata .= "	</div>\r\n";
			
			/* updates page */
			$zpagedata .= "	<div id='wtw_updatespage' class='wtw-dashboardpage wtw-hide' style='display:none;'>\r\n";
			$zpagedata .= "		<div id='wtw_loadingupdates' class='wtw-loadingnotice'>Checking for Updates...</div>\r\n";
			$zpagedata .= "		<div id='wtw_updatespagescroll' class='wtw-formscroll'>\r\n";
			$zpagedata .= "			<div id='wtw_allupdates'>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardboxleftfull'>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardboxtitle'>Updates</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= "						<div id='wtw_updatelist'></div>\r\n";
			$zpagedata .= "						<div id='wtw_updatedetailslist'></div>\r\n";
			$zpagedata .= "						<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "						<div id='wtw_updatewebslist'></div>\r\n";
			$zpagedata .= "						<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "						<div id='wtw_updatepluginlist'></div>\r\n";
			$zpagedata .= "						<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "						<div id='wtw_archiveupdateslist'></div>\r\n";
			$zpagedata .= "					</div>\r\n";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "		</div>\r\n";
			$zpagedata .= "	</div>\r\n";

			/* feedback page */
			$zpagedata .= "	<div id='wtw_feedbackpage' class='wtw-dashboardpage wtw-hide' style='display:none;'>\r\n";
			$zpagedata .= "		<div id='wtw_loadingfeedback' class='wtw-loadingnotice'>Checking for Feedback...</div>\r\n";
			$zpagedata .= "		<div id='wtw_feedbackpagescroll' class='wtw-formscroll'>\r\n";
			$zpagedata .= "			<div id='wtw_allfeedback'>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardboxleftfull'>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardboxtitle'>Feedback</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= " 					<div class='wtw-roundedbox'>Feedback or Issues are submitted by the users on the Browse Menu under the Help icon.</div>\r\n";
			$zpagedata .= "						<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "						<div id='wtw_feedbacklist'></div>\r\n";
			$zpagedata .= "						<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					</div>\r\n";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "		</div>\r\n";
			$zpagedata .= "	</div>\r\n";

			/* error log page */
			$zpagedata .= "	<div id='wtw_errorlogpage' class='wtw-dashboardpage wtw-hide' style='display:none;'>\r\n";
			$zpagedata .= "		<div id='wtw_loadingerrorlog' class='wtw-loadingnotice'>Checking for Error Log...</div>\r\n";
			$zpagedata .= "		<div id='wtw_errorlogpagescroll' class='wtw-formscroll'>\r\n";
			$zpagedata .= "			<div id='wtw_allerrorlog'>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardboxleftfull'>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardboxtitle'>Error Log</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= "						<div id='wtw_errorlogdelete' class='wtw-bluebuttonright' onclick='WTW.deleteArchivedErrorLog();'>Delete Archived Errors</div>\r\n";
			$zpagedata .= "						<div id='wtw_errorlogactive' class='wtw-bluebuttonselected' onclick=\"WTW.openErrorLog('Active Errors');\">Active Errors</div><div id='wtw_errorlogrecent' class='wtw-bluebutton' onclick=\"WTW.openErrorLog('Most Recent Errors');\">Most Recent Errors</div><div id='wtw_errorlogall' class='wtw-bluebutton' onclick=\"WTW.openErrorLog('All Errors');\">All Errors</div>\r\n";
			$zpagedata .= "						<div id='wtw_errorloglist'></div>\r\n";
			$zpagedata .= "						<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					</div>\r\n";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "		</div>\r\n";
			$zpagedata .= "	</div>\r\n";

			/* media library - select image page */
			$zpagedata .= "	<div id='wtw_selectimagepage' class='wtw-dashboardpage wtw-hide' style='display:none;'>\r\n";
			$zpagedata .= "		<div id='wtw_horizontalmenu' class='wtw-horizontalmenu'>\r\n";
			$zpagedata .= "			<div id='wtw_bstartimageupload' class='wtw-uploadbutton' onclick='WTW.startUploadImage(this.innerHTML);return (false);'>Upload Image</div>\r\n";
			$zpagedata .= "			<input type='file' id='wtw_fileupload' name='wtw_fileupload' class='wtw-hide' onchange='WTW.uploadFile();' />\r\n";
			$zpagedata .= "			<input type='file' id='wtw_filesupload' name='wtw_filesupload[]' class='wtw-hide' multiple='true' onchange='WTW.uploadFiles();' />\r\n";
			$zpagedata .= "			<div id='wtw_menufileselect' class='wtw-menufileselect' >\r\n";
			$zpagedata .= "				<select id='wtw_fileselectcategory' class='wtw-fileselectcategory' onchange='WTW.selectFileForm();'>\r\n";
			$zpagedata .= "					<option value=''> - All - </option>\r\n";
			$zpagedata .= "					<option value='image'>Images</option>\r\n";
			$zpagedata .= "					<option value='video'>Videos</option>\r\n";
			$zpagedata .= "					<option value='audio'>Sounds</option>\r\n";
			$zpagedata .= "					<option value='doc'>Documents</option>\r\n";
			$zpagedata .= "					<option value='file'>Files</option>\r\n";
			$zpagedata .= "					<option value='object'>3D Models</option>\r\n";
			$zpagedata .= "				</select>\r\n";
			$zpagedata .= "			</div>\r\n";

			$zpagedata .= "			<div id='wtw_menufilter' class='wtw-menufileselect' >\r\n";
			$zpagedata .= "				<input type='text' id='wtw_modelfilter' onkeyup='WTW.filterModels(2);' onfocus='WTW.filterModels(1);' onblur='WTW.filterModels(0);' value='Name Filter' />\r\n";
			$zpagedata .= "				<div class='wtw-xout' onclick=\"WTW.clearNameFilter();\">X</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			
			$zpagedata .= "			<div id='wtw_menuuploadedobjects' class='wtw-menutabtop' onclick='WTW.setImageMenu(4);'>3D Models</div>\r\n";
			$zpagedata .= "			<div id='wtw_menuimagecommunity' class='wtw-menutabtop' onclick='WTW.setImageMenu(1);'>3D Community Files</div>\r\n";
			$zpagedata .= "			<div id='wtw_menuimagemy' class='wtw-menutabtop' onclick='WTW.setImageMenu(2);'>My Files</div>\r\n";
			$zpagedata .= "			<div id='wtw_menuimagestock' class='wtw-menutabtop' onclick='WTW.setImageMenu(3);'>Stock Files</div>\r\n";
			$zpagedata .= "			<div id='wtw_menuwtwdownloads' class='wtw-menutabtop' onclick=\"WTW.openFullPageForm('importpage','communities');\">WalkTheWeb Downloads</div>\r\n";
			$zpagedata .= "			<div id='wtw_hiddenimagesoption' class='wtw-hiddenimageoption'>\r\n";
			$zpagedata .= "				<input type='checkbox' id='wtw_bshowhiddenimages' onchange='WTW.selectFileForm(this);' class='wtw-cursorpointer' /> <div id='wtw_showhiddenimagesdiv' onclick='WTW.selectFileForm(this);' class='wtw-showimageoption'>Show Hidden Images</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "		</div><div class='wtw-clear'></div><hr>\r\n";
			$zpagedata .= "		<div id='wtw_loadingselectimage' class='wtw-loadingnotice'>Loading...</div>\r\n";
			$zpagedata .= "		<div id='wtw_selectimageformscroll' class='wtw-normalwrap'>\r\n";
			$zpagedata .= "			<div id='wtw_menuimagecommunitydiv' class='wtw-subdiv'>\r\n";
			$zpagedata .= "				<div id='wtw_communityimagesdiv' class='wtw-fullpage'></div>\r\n";
			$zpagedata .= "				<iframe id='wtw_communityimagesframe' class='wtw-imagesframe' src='' scrolling='yes' ></iframe>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "			<div id='wtw_menuimagemydiv' class='wtw-subdiv'>\r\n";
			$zpagedata .= "				<div id='wtw_myimagesdiv' class='wtw-fullpage'></div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "			<div id='wtw_menuimagestockdiv' class='wtw-subdiv'>\r\n";
			$zpagedata .= "				<div id='wtw_stockimagesdiv' class='wtw-fullpage'></div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "			<div id='wtw_menuuploadedobjectsdiv' class='wtw-subdiv'>\r\n";
			$zpagedata .= "				<div id='wtw_uploadedmodelsdiv' class='wtw-fullpage' style='display:none;'></div>\r\n";
			$zpagedata .= "				<div id='wtw_uploadedmodeldetailsdiv' class='wtw-fullpage' style='display:none;'>\r\n";
			$zpagedata .= "					<div class='wtw-roundedbox'><b>3D Models</b> can be downloaded off the Internet or created from scratch using software like <a href='https://www.blender.org/' target='_blank'>Blender.org</a>. <b>3D Models</b> can be added to any 3D Community Scene, 3D Building, or 3D Thing. Recommended formats are .blender, .obj, .glb, or .gltf.<br /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div id='wtw_uploadedmodelpreviewdiv' class='wtw-dashboardboxleftdouble' style='display:block-inline;float:right;min-height:400px;padding:10px;'><br /><br /><br /><br /></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardboxleft'>\r\n";
			$zpagedata .= "						<div id='wtw_uploadedmodelsnamediv'></div>\r\n";
			$zpagedata .= "						<div id='wtw_uploadedmodelsfilesdiv'></div>\r\n";
			$zpagedata .= "						<div id='wtw_uploadedmodelsanimationsdiv'></div>\r\n";
			$zpagedata .= "						<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "						<div id='wtw_addanimationdiv' class='wtw-objectcontainer' style='display:none;visibility:hidden;'><div id='wtw_addanimationtitle' class='wtw-objectfile'>Edit Animation</div>\r\n";
			$zpagedata .= "							<div class='wtw-objectfolder'>\r\n";
			$zpagedata .= "								<div><h3 class='wtw-black'>Animation Name</h3><div class='wtw-examplenote'>(JavaScript Function Name you can call in code)</div>\r\n";
			$zpagedata .= "									<input id='wtw_tanimationname' type='text' maxlength='255' />\r\n";
			$zpagedata .= "								</div>\r\n";
			$zpagedata .= "								<div><h3 class='wtw-black'>JavaScript Event</h3>\r\n";
			$zpagedata .= "									<select id='wtw_tmoldevent' class='wtw-pointer'>\r\n";
			$zpagedata .= "										<option value=''>none</option>\r\n";
			$zpagedata .= "										<option value='onload'>onload</option>\r\n";
			$zpagedata .= "										<option value='onclick'>onclick</option>\r\n";
			$zpagedata .= "										<option value='onclicktoggle'>onclick-toggle</option>\r\n";
			$zpagedata .= "										<option value='onmouseover'>onmouseover</option>\r\n";
			$zpagedata .= "										<option value='onmouseout'>onmouseout</option>\r\n";
			$zpagedata .= "										<option value='' class='wtw-yellowbackground'>--- Avatar Movements ---</option>\r\n";
			$zpagedata .= "										<option value='onwait'>Idle or Waiting</option>\r\n";
			$zpagedata .= "										<option value='onwalk'>Walk</option>\r\n";
			$zpagedata .= "										<option value='onwalkbackwards'>Walk Backwards</option>\r\n";
			$zpagedata .= "										<option value='onjump'>Jump</option>\r\n";
			$zpagedata .= "										<option value='onrun'>Run</option>\r\n";
			$zpagedata .= "										<option value='onsit'>Stand-to-Sit</option>\r\n";
			$zpagedata .= "										<option value='onstand'>Sit-to-Stand</option>\r\n";
			$zpagedata .= "										<option value='onstrafeleft'>Strafe Left</option>\r\n";
			$zpagedata .= "										<option value='onstraferight'>Strafe Right</option>\r\n";
			$zpagedata .= "										<option value='onturnleft'>Turn Left</option>\r\n";
			$zpagedata .= "										<option value='onturnright'>Turn Right</option>\r\n";
			$zpagedata .= "										<option value='onpickup'>Pick Up</option>\r\n";
			$zpagedata .= "										<option value='onputdown'>Put Down</option>\r\n";
			$zpagedata .= "									</select>\r\n";
			$zpagedata .= "								</div>\r\n";
			$zpagedata .= "								<div><h3 class='wtw-black'>Mesh Name</h3><div class='wtw-examplenote'>(name of sub-mesh of 3D Model or leave blank for full 3D Model)</div>\r\n";
			$zpagedata .= "									<input id='wtw_tmoldnamepart' type='text' maxlength='255' />\r\n";
			$zpagedata .= "								</div>\r\n";
			$zpagedata .= "								<div><h3 class='wtw-black'>Start Frame</h3>\r\n";
			$zpagedata .= "									<input id='wtw_tstartframe' type='text' maxlength='15' />\r\n";
			$zpagedata .= "								</div>\r\n";
			$zpagedata .= "								<div><h3 class='wtw-black'>End Frame</h3>\r\n";
			$zpagedata .= "									<input id='wtw_tendframe' type='text' maxlength='15' />\r\n";
			$zpagedata .= "								</div><br />\r\n";
			$zpagedata .= "								<input type='checkbox' id='wtw_tanimationloop' class='wtw-smallprint' value='1' onchange='' /><span style='color:#000000;'> Loop Animation</span><br /><br />\r\n";
			$zpagedata .= "								<div id='wtw_fileadvancedoptslink' onclick=\"WTW.toggleAdvanced(this, 'wtw_fileadvancedopts');\" class='wtw-showhideadvancedblack'>-- Show Advanced Options --</div>\r\n";
			$zpagedata .= "								<div id='wtw_fileadvancedopts' class='wtw-hide'>\r\n";
			$zpagedata .= "									<div><h3 class='wtw-black'>Speed Ratio<div class='wtw-examplenote'>(Original speed: 1.00)</div></h3>\r\n";
			$zpagedata .= "										<input id='wtw_tspeedratio' type='text' maxlength='15' />\r\n";
			$zpagedata .= "									</div>\r\n";
			$zpagedata .= "									<div><h3 class='wtw-black'>Animation End Script</h3><div class='wtw-examplenote'>(optional JavaScript Function to play when animation ends)</div>\r\n";
			$zpagedata .= "										<input id='wtw_tanimationendscript' type='text' maxlength='255' />\r\n";
			$zpagedata .= "									</div>\r\n";
			$zpagedata .= "									<div><h3 class='wtw-black'>Animation End Script Parameters</h3><div class='wtw-examplenote'>(comma seperated values or blank)</div>\r\n";
			$zpagedata .= "										<input id='wtw_tanimationendparameters' type='text' maxlength='255' />\r\n";
			$zpagedata .= "									</div><br />\r\n";
			$zpagedata .= "									<input type='checkbox' id='wtw_tstopcurrentanimations' class='wtw-smallprint' value='1' onchange='' /><span style='color:#000000;'> Stop Current Animation when played</span><br /><br />\r\n";
			$zpagedata .= "									<img id='wtw_objectsoundicon' src='/content/system/images/3dsound.png' class='wtw-adminiconimage' alt='' title='' /> &nbsp;\r\n";
			$zpagedata .= "									<div id='wtw_objectselectedsound'></div>\r\n";
			$zpagedata .= "									<div class='wtw-yellowbutton' style='width:150px;text-align:center;cursor:pointer;' onclick=\"WTW.openFullPageForm('medialibrary','audio','objectsound','wtw_tobjectsoundid','wtw_tobjectsoundpath','wtw_tobjectsoundicon');\">Select Sound</div>\r\n";
			$zpagedata .= "									<div><h3 class='wtw-black'>Sound Max Distance<div class='wtw-examplenote'>(Linear Default: 100)</div></h3>\r\n";
			$zpagedata .= "										<input id='wtw_tobjectsoundmaxdistance' type='text' maxlength='15' />\r\n";
			$zpagedata .= "									</div>\r\n";
			$zpagedata .= "								</div><br /><br />\r\n";
			$zpagedata .= "								<div class='wtw-greenbutton' style='width:318px;' onclick='WTW.saveObjectAnimation();'>Save Animation</div><br /><br />\r\n";
			$zpagedata .= "								<div class='wtw-redbutton' style='width:150px;text-align:center;margin-right:13px;cursor:pointer;' onclick=\"dGet('wtw_tdeleteanimation').value=dGet('wtw_tobjectanimationid').value;WTW.deleteObjectAnimation(dGet('wtw_tdeleteanimation').value, dGet('wtw_tuploadobjectid').value);\">Delete Animation</div><div id='wtw_canceldeleteanimation' class='wtw-yellowbutton' style='width:150px;text-align:center;cursor:pointer;' onclick=\"WTW.hide('wtw_addanimationdiv');\">Cancel</div>\r\n";
			$zpagedata .= "							</div>\r\n";
			$zpagedata .= "						</div>\r\n";
			$zpagedata .= "					</div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-yellowbutton' style='width:150px;margin-left:25px;text-align:center;' onclick='WTW.loadUploadedObjectsDiv(true);'>Close</div><br /><br />\r\n";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "		</div>\r\n";
			$zpagedata .= "	</div>\r\n";
			
			/* media library - file details page */
			$zpagedata .= "	<div id='wtw_showfilepage' class='wtw-dashboardpage wtw-hide' style='display:none;'>\r\n";
			$zpagedata .= "		<div id='wtw_loadingmediapage' class='wtw-loadingnotice'>Loading...</div>\r\n";
			$zpagedata .= "		<div id='wtw_mediapage' class='wtw-fullpage'>\r\n";
			$zpagedata .= "			<div id='wtw_fileinfo' class='wtw-dashboardboxleft'>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardboxtitle'>File Information</div>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>File Title</div>\r\n";
			$zpagedata .= "					<div id='wtw_uploadfiletitle' class='wtw-dashboardvalue'></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>File Name</div>\r\n";
			$zpagedata .= "					<div id='wtw_uploadfilename' class='wtw-dashboardvalue'></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>File Type</div>\r\n";
			$zpagedata .= "					<div id='wtw_uploadfiletype' class='wtw-dashboardvalue'></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Upload Date</div>\r\n";
			$zpagedata .= "					<div id='wtw_uploadupdatedate' class='wtw-dashboardvalue'></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div id='wtw_uploadfiledelete' class='wtw-redbuttonright'>Permanently Delete File</div><div class='wtw-yellowbuttonleft' onclick=\"WTW.openFullPageForm('medialibrary','','');WTW.setImageMenu(2);\">Back</div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "			<div id='wtw_imagethumbnailinfo' class='wtw-dashboardboxleft'>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardboxtitle'>Thumbnail Image</div>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= "					<div class='wtw-center'>\r\n";
			$zpagedata .= "						<img id='wtw_mediathumbnail' />\r\n";
			$zpagedata .= "					</div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>File Size</div>\r\n";
			$zpagedata .= "					<div id='wtw_mediathumbnailsize' class='wtw-dashboardvalue'></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Dimensions</div>\r\n";
			$zpagedata .= "					<div id='wtw_mediathumbnaildimensions' class='wtw-dashboardvalue'></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>File Path</div>\r\n";
			$zpagedata .= "					<div id='wtw_mediathumbnailpath' class='wtw-dashboardvalueurl'></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div><br />\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalueurl'><a id='wtw_mediathumbnaildownload' download>Download Image</a></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "			<div id='wtw_imagewebsizeinfo' class='wtw-dashboardboxleft'>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardboxtitle'>Websize Image</div>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= "					<div class='wtw-center'>\r\n";
			$zpagedata .= "						<img id='wtw_mediawebsize' class='wtw-fullimage' />\r\n";
			$zpagedata .= "					</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>File Size</div>\r\n";
			$zpagedata .= "					<div id='wtw_mediawebsizesize' class='wtw-dashboardvalue'></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Dimensions</div>\r\n";
			$zpagedata .= "					<div id='wtw_mediawebsizedimensions' class='wtw-dashboardvalue'></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>File Path</div>\r\n";
			$zpagedata .= "					<div id='wtw_mediawebsizepath' class='wtw-dashboardvalueurl'></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div><br />\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalueurl'><a id='wtw_mediawebsizedownload' download>Download Image</a></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "			<div id='wtw_imageoriginalinfo' class='wtw-dashboardboxleftfull'>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardboxtitle'>Original Image</div>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= "					<div class='wtw-center'>\r\n";
			$zpagedata .= "						<img id='wtw_mediaoriginal' class='wtw-imagefitwidth' />\r\n";
			$zpagedata .= "					</div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>File Size</div>\r\n";
			$zpagedata .= "					<div id='wtw_mediaoriginalsize' class='wtw-dashboardvalue'></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Dimensions</div>\r\n";
			$zpagedata .= "					<div id='wtw_mediaoriginaldimensions' class='wtw-dashboardvalue'></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>File Path</div>\r\n";
			$zpagedata .= "					<div id='wtw_mediaoriginalpath' class='wtw-dashboardvalueurl'></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div><br />\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalueurl'><a id='wtw_mediaoriginaldownload' download>Download Image</a></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "		</div>\r\n";
			$zpagedata .= "	</div>\r\n";
			
			/* users roles and functions */
			$zpagedata .= "	<div id='wtw_userspage' class='wtw-dashboardpage wtw-hide' style='display:none;'>\r\n";
			$zpagedata .= "		<div id='wtw_loadingusers' class='wtw-loadingnotice'>Loading...</div>\r\n";
			$zpagedata .= "		<div id='wtw_allusers' class='wtw-fullpage'>\r\n";
			$zpagedata .= "			<div id='wtw_alluserswidth' class='wtw-dashboardboxleftfull'>\r\n";
			$zpagedata .= "				<div id='wtw_alluserstitle' class='wtw-dashboardboxtitle'><div id='wtw_adduserbutton' class='wtw-greenbuttonright' onclick='WTW.addUser();'>Add New</div>All Users</div>\r\n";
			$zpagedata .= "			<div id='wtw_usersnote' class='wtw-roundedbox'><b>All Users</b> provides a list of users including those who have visited using a WalkTheWeb Global Login.<br /></div>\r\n";
			$zpagedata .= "			<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= "					<div id='wtw_userlist'></div>\r\n";
			$zpagedata .= "					<div id='wtw_userinfo'></div>\r\n";
			$zpagedata .= "					<div id='wtw_useradd'></div>\r\n";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "		</div>\r\n";
			$zpagedata .= "		<div id='wtw_roles' class='wtw-fullpage'>\r\n";
			$zpagedata .= "			<div id='wtw_roleswidth' class='wtw-dashboardboxleftfull'>\r\n";
			$zpagedata .= "				<div id='wtw_rolestitle' class='wtw-dashboardboxtitle'><div id='wtw_adduserrolebutton' class='wtw-greenbuttonright' onclick='WTW.addRole();'>Add New</div>User Roles</div>\r\n";
			$zpagedata .= "				<div class='wtw-roundedbox'><b>User Roles</b> provide special general privileges. <b>Admin</b> has access to all, <b>Developer</b> is like Admin with limited user based functions, <b>Host</b> has access to their own creations with no server settings access, <b>Architect</b> and <b>Graphics Artist</b> have create and Media Library access, and <b>Guest</b> and <b>Subscriber</b> have no Admin privileges. It is not recommended to change any of these names unless you are expecting to remove all privileges for that role.<br /></div>\r\n";
			$zpagedata .= "				<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= "					<div id='wtw_roleslist'></div>\r\n";
			$zpagedata .= "					<div id='wtw_roleinfo'></div>\r\n";
			$zpagedata .= "					<div id='wtw_roleadd'></div>\r\n";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "		</div>\r\n";
			$zpagedata .= "	</div>\r\n";
			
			/* plugins list and functions */
			$zpagedata .= "	<div id='wtw_pluginspage' class='wtw-dashboardpage wtw-hide' style='display:none;'>\r\n";
			$zpagedata .= "		<div id='wtw_loadingplugins' class='wtw-loadingnotice'>Loading...</div>\r\n";
			$zpagedata .= "		<div id='wtw_allplugins' class='wtw-fullpage'>\r\n";
			$zpagedata .= "			<div class='wtw-dashboardboxleftfull'>\r\n";
			$zpagedata .= "				<div id='wtw_pluginslisttitle' class='wtw-dashboardboxtitle'><div id='wtw_addplugin' class='wtw-greenbuttonright' onclick='WTW.openFullPageForm('importpage','plugins');'>Add New</div>All 3D Plugins</div>\r\n";
			$zpagedata .= "				<div class='wtw-roundedbox'><b>3D Plugins</b> add 3D Game and 3D Shopping functionality to your 3D Community Scenes, 3D Buildings, 3D Things, and 3D Avatars. Note that the <b>WalkTheWeb 3D Internet Plugin</b> must be enabled to have the options to download and add more 3D Plugins.<br /></div>\r\n";
			$zpagedata .= "				<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= "					<div id='wtw_pluginslist'></div>\r\n";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "		</div>\r\n";
			$zpagedata .= "	</div>\r\n";
			
			/* settings page */
			$zpagedata .= "	<div id='wtw_settingspage' class='wtw-dashboardpage wtw-hide' style='display:none;'>\r\n";
			$zpagedata .= "		<div id='wtw_loadingsettings' class='wtw-loadingnotice'>Loading...</div>\r\n";
			
			/* settings page - server settings */
			$zpagedata .= "		<div id='wtw_serversettings' class='wtw-fullpage'>\r\n";
			$zpagedata .= "			<div class='wtw-dashboardboxlefthalf'>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardboxtitle'>WalkTheWeb Server Settings</div>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= "					<div class='wtw-roundedbox'><b>Server Settings</b> are global variables stored in the /config/wtw_config.php file.<br /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Server Instance ID</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_tserverinstanceid' maxlength='16' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Database Server</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_dbserver' maxlength='7' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Database Name</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_dbname' maxlength='255' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Database User Name</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_dbusername' maxlength='255' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Database Password</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='password' id='wtw_dbpassword' maxlength='255' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Table Prefix</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_tableprefix' maxlength='255' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Default Language</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><select id='wtw_defaultlanguage' onchange='WTW.saveServerSettings(true);' class='wtw-pointer'></select></div>\r\n";

			$zpagedata .= "					<div class='wtw-clear'></div><hr />\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Admin Email</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_adminemail' maxlength='255' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Admin Email Name</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_adminname' maxlength='255' /></div>\r\n";

			$zpagedata .= "					<div class='wtw-clear'></div><hr />\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Default Domain</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_defaultdomain' maxlength='255' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Default Site Name</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_defaultsitename' maxlength='255' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Google Analytics ID (default)</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_googleanalytics' maxlength='255' /></div>\r\n";

			$zpagedata .= "					<div class='wtw-clear'></div><hr />\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Content Path</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_contentpath' maxlength='255' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Content URL</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_contenturl' maxlength='255' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Folder Permissions (default umask is 0027)</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_umask' maxlength='4' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>File Permissions (default is 755)</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_chmod' maxlength='15' /></div>\r\n";

			$zpagedata .= "					<div class='wtw-clear'></div><hr />\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Select Babylon Version</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'>\r\n";
			$zpagedata .= "						<select id='wtw_babylonversion'>\r\n";
			$zpagedata .= "							<option value='v5.x.x'>v5.x.x</option>\r\n";
			$zpagedata .= "							<option value='v6.x.x'>v6.x.x</option>\r\n";
			$zpagedata .= "						</select></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div><br />\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Physics Engine Enabled</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'>\r\n";
			$zpagedata .= "						<select id='wtw_physicsengine'>\r\n";
			$zpagedata .= "							<option value=''>- None -</option>\r\n";
			$zpagedata .= "							<option value='havok'>Havok</option>\r\n";
			$zpagedata .= "							<option value='cannon'>Cannon</option>\r\n";
			$zpagedata .= "							<option value='oimo'>Oimo</option>\r\n";
			$zpagedata .= "						</select></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div>To load these settings, refresh your browser after saving.</div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";

			$zpagedata .= "					<div class='wtw-clear'></div><hr />\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>FTP Host (Server:port)</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_ftphost' maxlength='255' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>FTP User</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_ftpuser' maxlength='255' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>FTP Password</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='password' id='wtw_ftppassword' maxlength='255' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>FTP Base (Subfolder for 3D Website)</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_ftpbase' maxlength='255' /></div>\r\n";

			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div id='wtw_serversettingscomplete'></div><br />\r\n";
			$zpagedata .= "					<div id='wtw_loadingserversettings' class='wtw-loadingnoticecentered'>Loading</div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-greenmenubutton' onclick='WTW.saveServerSettings();'>Save Server Settings</div>\r\n";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "		</div>\r\n";

			/* settings page - email server */
			$zpagedata .= "		<div id='wtw_emailserversettings' class='wtw-fullpage'>\r\n";
			$zpagedata .= "			<div class='wtw-dashboardboxleft'>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardboxtitle'>Email Server Settings</div>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= "					<div class='wtw-roundedbox'><b>Email Server Settings</b> provide basic connection for sending emails programmatically from WalkTheWeb.<br /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>SMTP Email Server</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_tsmtphost' maxlength='255' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>SMTP Port</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_tsmtpport' maxlength='7' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Encryption</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'>";
			$zpagedata .= "						<input type='radio' id='wtw_tsmtpencryptionnone' name='wtw_tsmtpencryption' value='' />None &nbsp;&nbsp;&nbsp;";
			$zpagedata .= "						<input type='radio' id='wtw_tsmtpencryptionssl' name='wtw_tsmtpencryption' value='ssl' />SSL &nbsp;&nbsp;&nbsp;";
			$zpagedata .= "						<input type='radio' id='wtw_tsmtpencryptiontls' name='wtw_tsmtpencryption' value='tls' />TLS</div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>SMTP User Name</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_tsmtpusername' maxlength='255' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>SMTP Password</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='password' id='wtw_tsmtppassword' maxlength='255' /></div>\r\n";

			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>From Email</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_tfromemail' maxlength='255' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>From Name</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_tfromemailname' maxlength='255' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div id='wtw_emailservercomplete'></div><br />\r\n";
			$zpagedata .= "					<div id='wtw_loadingemailserver' class='wtw-loadingnoticecentered'>Loading...</div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-greenmenubutton' onclick='WTW.saveEmailServerSettings();'>Save Settings</div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div><hr />\r\n";
			$zpagedata .= "					<div class='wtw-dashboardlabel'>Test Email</div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardvalue'><input type='text' id='wtw_ttestemail' maxlength='255' /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-graymenubutton' onclick='WTW.testEmailServerSettings();'>Send Test Email</div>\r\n";
			$zpagedata .= "					<hr /><label class='wtw-switch'><input id='wtw_emailvalidation' type='checkbox' onclick='WTW.changeEmailSwitch();'><span class='wtw-slider wtw-round'></span></label><div id='wtw_emailvalidationtext' class='wtw-disabledlabel'>User Email Validation Disabled</div> <br />This will send email to the users when they login or create an account, to confirm their email address is active and valid.<br />\r\n";
			$zpagedata .= "<br /><hr />Email Functions by <a href='https://github.com/swiftmailer/swiftmailer' target='_blank'>SwiftMailer</a><br />without modification by WalkTheWeb.";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "		</div>\r\n";
									
			/* settings page - web domains */
			$zpagedata .= "		<div id='wtw_webdomainsettings' class='wtw-fullpage wtw-hide'>\r\n";
			$zpagedata .= "			<div class='wtw-dashboardboxleftfull'>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardboxtitle'><div id='wtw_addwebdomain' class='wtw-greenbuttonright' onclick='WTW.openDomainForm();'>Add New</div>Web Domains</div>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= "					<div id='wtw_addwebdomaindiv' class='wtw-dashboardboxleftdouble wtw-hide'>\r\n";
			$zpagedata .= "						<div class='wtw-dashboardboxtitle'>Add Web Domain</div>\r\n";
			$zpagedata .= "						<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= "							<div class='wtw-dashboardlabel' style='font-size:1.2em;'>Domain Name:&nbsp;\r\n";
			$zpagedata .= "								<select id='wtw_domainforcehttps' style='font-size:1.2em;' class='wtw-pointer'> <option>https://</option><option>http://</option> </select>&nbsp; <input type='text' id='wtw_twebdomain' value='' maxlength='255' style='font-size:1.2em;' /></div>\r\n";
			$zpagedata .= "							<div class='wtw-clear'></div>\r\n";

			$zpagedata .= "							<div id='wtw_domainpurchaseview' class='wtw-hide'>\r\n";
			$zpagedata .= "							<table class='wtw-table'><tr>\r\n";
			$zpagedata .= "							<td class='wtw-tablecolumnheading'><b>Quantity</b></td>\r\n";
			$zpagedata .= "							<td class='wtw-tablecolumnheading'><b>Description</b></td>\r\n";
			$zpagedata .= "							<td class='wtw-tablecolumnheading'><b>Price</b></td>\r\n";
			$zpagedata .= "							</tr><tr>\r\n";
			$zpagedata .= "							<td id='wtw_domainpurchaseqty' class='wtw-tablecolumns'></td>\r\n";
			$zpagedata .= "							<td id='wtw_domainpurchasedesc' class='wtw-tablecolumns'></td>\r\n";
			$zpagedata .= "							<td id='wtw_domainpurchaseprice' class='wtw-tablecolumns'></td>\r\n";
			$zpagedata .= "							</tr><tr>\r\n";
			$zpagedata .= "							<td id='wtw_domainpurchasesslqty' class='wtw-tablecolumns'></td>\r\n";
			$zpagedata .= "							<td id='wtw_domainpurchasessldesc' class='wtw-tablecolumns'></td>\r\n";
			$zpagedata .= "							<td id='wtw_domainpurchasesslprice' class='wtw-tablecolumns'></td>\r\n";
			$zpagedata .= "							</tr><tr>\r\n";
			$zpagedata .= "							<td class='wtw-tablecolumnheading'>&nbsp;</td>\r\n";
			$zpagedata .= "							<td class='wtw-tablecolumnheading'><b>Total US Dollars</b></td>\r\n";
			$zpagedata .= "							<td id='wtw_domainpurchasetotal' class='wtw-tablecolumnheading'></td>\r\n";
			$zpagedata .= "							</tr></table></div>\r\n";

			$zpagedata .= "							<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "							<div id='wtw_domaindetailsdiv'>\r\n";
			$zpagedata .= "								<div class='wtw-dashboardlabel'>Start Date:&nbsp;</div>\r\n";
			$zpagedata .= "								<div class='wtw-dashboardvalue'>";
			$zpagedata .= "									<input type='text' id='wtw_domainstartdate' value='' maxlength='255' /></div>\r\n";
			$zpagedata .= "								<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "								<div class='wtw-dashboardlabel'>Expire Date:&nbsp;</div>\r\n";
			$zpagedata .= "								<div class='wtw-dashboardvalue'>";
			$zpagedata .= "									<input type='text' id='wtw_domainexpiredate' value='' maxlength='255' /></div>\r\n";
			$zpagedata .= "								<div class='wtw-clear'></div>\r\n";
			if ($wtwdb->isUserInRole("Admin")) {
				$zpagedata .= "								<div class='wtw-dashboardlabel'>Allow Hosting:&nbsp;</div>\r\n";
				$zpagedata .= "								<div class='wtw-dashboardvalue'>";
				$zpagedata .= "									<input type='radio' id='wtw_tallowhostingyes' name='wtw_tallowhosting' value='1' />Yes &nbsp;&nbsp;&nbsp;";
				$zpagedata .= "									<input type='radio' id='wtw_tallowhostingno' name='wtw_tallowhosting' value='0' />No</div>\r\n";
				$zpagedata .= "								<div class='wtw-clear'></div>\r\n";
			} else {
				$zpagedata .= "								<input type='hidden' id='wtw_tallowhostingyes' value='' />\r\n";
				$zpagedata .= "								<input type='hidden' id='wtw_tallowhostingno' value='' />\r\n";
				$zpagedata .= "								<input type='hidden' id='wtw_tallowhosting' name='wtw_tallowhosting' value='' />\r\n";
			}
			$zpagedata .= "								<div class='wtw-dashboardlabel'>Host Price:&nbsp;</div>\r\n";
			$zpagedata .= "								<div class='wtw-dashboardvalue'>";
			$zpagedata .= "									<input type='text' id='wtw_domainhostprice' value='' maxlength='255' /></div>\r\n";
			$zpagedata .= "								<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "								<div class='wtw-dashboardlabel'>SSL Cert Price:&nbsp;</div>\r\n";
			$zpagedata .= "								<div class='wtw-dashboardvalue'>";
			$zpagedata .= "									<input type='text' id='wtw_domainsslprice' value='' maxlength='255' /></div>\r\n";
			$zpagedata .= "								<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "								<div class='wtw-dashboardlabel'>Hosting Term (Days):&nbsp;</div>\r\n";
			$zpagedata .= "								<div class='wtw-dashboardvalue'>";
			$zpagedata .= "									<input type='text' id='wtw_domainhostdays' value='' maxlength='255' /></div>\r\n";
			$zpagedata .= "								<div class='wtw-clear'></div>\r\n";
			$zpagedata .= " 						</div>\r\n";
			$zpagedata .= " 					</div>\r\n";
			$zpagedata .= "						<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "						<div id='wtw_bdomaindelete' class='wtw-redbuttonleft wtw-hide' onclick='WTW.saveDomainForm(0);'>Delete Web Domain</div>\r\n";
			$zpagedata .= "						<div id='wtw_bdomainsave' class='wtw-greenbuttonright' onclick='WTW.saveDomainForm(1);'>Save Web Domain</div>\r\n";
			$zpagedata .= "						<div class='wtw-yellowbuttonright' onclick='WTW.saveDomainForm(-1);'>Cancel</div>\r\n";
			$zpagedata .= "						<div id='wtw_domainfunctionsdiv' class='wtw-hide'></div>\r\n";
			$zpagedata .= "						<div class='wtw-clear'></div><br />\r\n";
			if ($wtwdb->isUserInRole("Host") || $wtwdb->isUserInRole("Admin") || $wtwdb->isUserInRole("Developer")) {
				$zdnsarecord = $wtw->serverip;
				$zdnscname = ''; 
				if (defined('wtw_defaultdomain')) {
					$zdnscname = wtw_defaultdomain;
				}
				if (defined('wtw_server_dns_arecord')) {
					$zdnsarecord = wtw_server_dns_arecord;
				}
				if (defined('wtw_server_dns_cname')) {
					$zdnscname = wtw_server_dns_cname;
				}				
				$zpagedata .= "							<div class='wtw-roundedmessage'><h2 class='wtw-roundedmessage'>Recommended DNS Settings for your new Domain Name</h2><b>A-Record</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>3d</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>".$zdnsarecord."</b><br /><br />OR USE<br /><br /><b>C-Name</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>3d</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>".$zdnscname."</b><br /><br /></div>\r\n";
				$zpagedata .= "							<div class='wtw-clear'></div><br />\r\n";
			}
			$zpagedata .= " 				</div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-roundedbox'><b>Domain Names</b> identify which Domain Names are hosted on this WalkTheWeb server.<br />Click <b>Add New</b> to personalize your 3D Website with your own Domain Name (<b>http://3d.<span style='color:blue;'>YourDomainName.com</span></b>).<br /><br /><b>Web Aliases</b> allow you to create URLs for any 3D Community Scene, 3D Building, or 3D Thing using your Domain Names.<br /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardboxleftfull'>\r\n";
			$zpagedata .= "						<div class='wtw-dashboardboxtitle'>Web Domains</div>\r\n";
			$zpagedata .= "						<div id='wtw_webdomainlist' class='wtw-whitebg'></div><br />\r\n";
			$zpagedata .= " 				</div>\r\n";
			$zpagedata .= "					<div id='wtw_webdomaincomplete'></div><br />\r\n";
			$zpagedata .= "					<div id='wtw_loadingwebdomain' class='wtw-loadingnoticecentered'>Loading...</div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "		</div>\r\n";

			/* settings page - web aliases */
			$zpagedata .= "		<div id='wtw_webaliassettings' class='wtw-fullpage wtw-hide'>\r\n";
			$zpagedata .= "			<div class='wtw-dashboardboxleftfull'>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardboxtitle'><div id='wtw_addwebalias' class='wtw-greenbuttonright' onclick='WTW.clearAliasForm();WTW.openAliasForm();WTW.setAliasCommunities();WTW.setAliasBuildings();WTW.setAliasThings();'>Add New</div>Web Alias Settings</div>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= "					<div id='wtw_addwebaliasdiv' class='wtw-dashboardboxleftfull wtw-hide'>\r\n";
			$zpagedata .= "						<div class='wtw-dashboardboxtitle'>Add Web Alias</div>\r\n";
			$zpagedata .= "						<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= "							<div class='wtw-dashboardlabel'>Path Type:&nbsp;\r\n";
			$zpagedata .= "								<select id='wtw_taliaspathtype' onchange='WTW.setAliasForm();' class='wtw-pointer' >\r\n";
			$zpagedata .= "									<optgroup label='Load Community'>\r\n";
			$zpagedata .= "										<option value='1'>Domain Name</option>\r\n";
			$zpagedata .= "										<option value='2'>Community</option>\r\n";
			$zpagedata .= "										<option value='3'>Building in Community</option>\r\n";
			$zpagedata .= "										<option value='4'>Thing in Community</option>\r\n";
			$zpagedata .= "										<option value='5'>Thing in Building in Community</option>\r\n";
			$zpagedata .= "									</optgroup>\r\n";
			$zpagedata .= "									<optgroup label='Load Building'>\r\n";
			$zpagedata .= "										<option value='6'>Building</option>\r\n";
			$zpagedata .= "										<option value='7'>Thing in Building</option>\r\n";
			$zpagedata .= "									</optgroup>\r\n";
			$zpagedata .= "									<optgroup label='Load Thing'>\r\n";
			$zpagedata .= "										<option value='8'>Thing</option>\r\n";
			$zpagedata .= "									</optgroup>\r\n";
			$zpagedata .= "								</select></div>\r\n";
			$zpagedata .= "							<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "							<table width='100%'>\r\n";
			$zpagedata .= "								<tr>\r\n";
			$zpagedata .= "									<td>&nbsp;</td>\r\n";
			$zpagedata .= "									<td id='wtw_aliaslevel1'>&nbsp;</td>\r\n";
			$zpagedata .= "									<td id='wtw_aliaslevel2'>&nbsp;</td>\r\n";
			$zpagedata .= "									<td id='wtw_aliaslevel3'>&nbsp;</td>\r\n";
			$zpagedata .= "									<td id='wtw_aliaslevel4'>&nbsp;</td>\r\n";
			$zpagedata .= "								</tr>\r\n";
			$zpagedata .= "								<tr>\r\n";
			$zpagedata .= "									<td><select id='wtw_aliasforcehttps' class='wtw-pointer'><option>https://</option><option>http://</option></select></td>\r\n";
			$zpagedata .= "									<td id='wtw_aliastext1'><select id='wtw_taliasdomainname' class='wtw-pointer'></select></td>\r\n";
			$zpagedata .= "									<td id='wtw_aliastext2'>/<input type='text' id='wtw_taliascommunitypublishname' value='' maxlength='255' onclick=\"WTW.checkKey(this, 'webname', 1, 0);\" onkeyup=\"WTW.checkKey(this, 'webname', 1, 0);\" onblur=\"WTW.checkKey(this, 'webname', 1, 1);\" /></td>\r\n";
			$zpagedata .= "									<td id='wtw_aliastext3'>/<input type='text' id='wtw_taliasbuildingpublishname' value='' maxlength='255' onclick=\"WTW.checkKey(this, 'webname', 1, 0);\" onkeyup=\"WTW.checkKey(this, 'webname', 1, 0);\" onblur=\"WTW.checkKey(this, 'webname', 1, 1);\" /></td>\r\n";
			$zpagedata .= "									<td id='wtw_aliastext4'>/<input type='text' id='wtw_taliasthingpublishname' value='' maxlength='255' onclick=\"WTW.checkKey(this, 'webname', 1, 0);\" onkeyup=\"WTW.checkKey(this, 'webname', 1, 0);\" onblur=\"WTW.checkKey(this, 'webname', 1, 1);\" /></td>\r\n";
			$zpagedata .= "								</tr>\r\n";
			$zpagedata .= "								<tr>\r\n";
			$zpagedata .= "									<td>&nbsp;</td>\r\n";
			$zpagedata .= "									<td id='wtw_aliasselect1'><select id='wtw_aliasdomaincommunityid' onchange='WTW.updateAliasSnapshot(this);' class='wtw-pointer'></select></td>\r\n";
			$zpagedata .= "									<td id='wtw_aliasselect2'>&nbsp;<select id='wtw_aliascommunityid' onchange='WTW.updateAliasSnapshot(this);' class='wtw-pointer'></select></td>\r\n";
			$zpagedata .= "									<td id='wtw_aliasselect3'>&nbsp;<select id='wtw_aliasbuildingid' onchange='WTW.updateAliasSnapshot();' class='wtw-pointer'></select></td>\r\n";
			$zpagedata .= "									<td id='wtw_aliasselect4'>&nbsp;<select id='wtw_aliasthingid' onchange='WTW.updateAliasSnapshot();' class='wtw-pointer'></select></td>\r\n";
			$zpagedata .= "								</tr>\r\n";
			$zpagedata .= "							</table>\r\n";
			$zpagedata .= "							<div id='wtw_aliascommunity'></div>\r\n";
			$zpagedata .= "							<div id='wtw_aliasbuilding'></div>\r\n";
			$zpagedata .= "							<div id='wtw_aliasthing'></div>\r\n";
			$zpagedata .= "							<div class='wtw-clear'></div><hr /><br />\r\n";
			
			$zpagedata .= "								<div class='wtw-dashboardboxtitle'>Site Information (Meta Data)</div>\r\n";
			$zpagedata .= " 							<img id='wtw_aliaspreview' style='width:30%;height:auto;float:left;margin:10px;' class='wtw-hide' /><br /><a id='wtw_aliaspreviewchange' href='' class='wtw-leftbutton' >Change Preview Image</a>\r\n";
			$zpagedata .= "							<div class='wtw-dashboardboxleftdouble' style='float:right;padding:10px;'>\r\n";
			$zpagedata .= "								<div class='wtw-dashboardlabel'>3D Website Name</div>\r\n";
			$zpagedata .= "								<div class='wtw-dashboardvalue'><input type='text' id='wtw_aliassitename' maxlength='255' style='width:360px;' onclick=\"WTW.checkKey(this, 'displayname', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'displayname', 0, 0);\" onblur=\"WTW.checkKey(this, 'displayname', 0, 1);\" /></div>\r\n";
			$zpagedata .= "								<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "								<div class='wtw-dashboardlabel'>3D Website Description</div>\r\n";
			$zpagedata .= "								<div class='wtw-dashboardvalue'><input type='text' id='wtw_aliassitedescription' maxlength='255' style='width:360px;' onclick=\"WTW.checkKey(this, 'safetext', 0, 0);\" onkeyup=\"WTW.checkKey(this, 'safetext', 0, 0);\" onblur=\"WTW.checkKey(this, 'safetext', 0, 1);\" /></div>\r\n";
			$zpagedata .= "								<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "								<div class='wtw-dashboardlabel'>Browser Tab Icon</div>\r\n";
			$zpagedata .= "								<div class='wtw-dashboardvalue' style='text-align:center;'><img id='wtw_aliassiteicon' src='/favicon.ico' class='wtw-tinyimage' /> &nbsp;&nbsp;&nbsp; <div class='wtw-rightbutton' onclick=\"WTW.openFullPageForm('medialibrary','image','webaliasicon','wtw_taliassiteiconid','wtw_taliassiteiconpath','wtw_aliassiteicon');\">Change Icon</div></div>\r\n";
			$zpagedata .= "								<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "							</div>\r\n";
			$zpagedata .= "							<div class='wtw-clear'></div>\r\n";
			$zpagedata .= " 						<div id='wtw_aliasfranchisediv' class='wtw-hide'><br /><hr /><br />\r\n";
			$zpagedata .= "								<div class='wtw-dashboardboxtitle'>Franchise (Increase Web Traffic)</div><br />\r\n";
			$zpagedata .= "								<label class='wtw-switch'><input id='wtw_aliasfranchise' type='checkbox' onclick='WTW.changeFranchiseSwitch();'><span class='wtw-slider wtw-round'></span></label><div id='wtw_aliasfranchisetext' class='wtw-disabledlabel'>This 3D Website is not Franchised.</div><br /><br />\r\n";
			$zpagedata .= "								<div style='padding:10px;'>Franchising allows other WalkTheWeb Servers on the Internet to add your 3D Building, 3D Store, or 3D Thing to their 3D Community Scenes.<br /><br />3D Community Scenes stay on the original WalkTheWeb Server.<br /><br /></div>\r\n";
			$zpagedata .= "								<div class='wtw-clear'></div>\r\n";
			$zpagedata .= " 						</div>\r\n";
			$zpagedata .= " 					</div>\r\n";
			$zpagedata .= "						<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "						<div id='wtw_baliasdelete' class='wtw-redbuttonleft wtw-hide' onclick='WTW.saveAliasForm(0);'>Delete Web Alias</div>\r\n";
			$zpagedata .= "						<div class='wtw-greenbuttonright' onclick='WTW.saveAliasForm(1);'>Save Web Alias</div>\r\n";
			$zpagedata .= "						<div class='wtw-yellowbuttonright' onclick='WTW.saveAliasForm(-1);'>Cancel</div>\r\n";
			$zpagedata .= " 				</div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-roundedbox'><b>Web Aliases</b> allow you to create URLs for any 3D Community Scene, 3D Building, or 3D Thing using your Domain Names.<br />Click <b>Add New</b> to set a Domain Name and Path to your 3D Websites.<br /><br /><b>Domain Names</b> identify which Domain Names are hosted on this WalkTheWeb server.<br /></div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardboxleftfull'>\r\n";
			$zpagedata .= "						<div class='wtw-dashboardboxtitle'>Web Aliases</div>\r\n";
			$zpagedata .= "						<div id='wtw_webaliaslist' class='wtw-whitebg'></div><br />\r\n";
			$zpagedata .= " 				</div>\r\n";
			$zpagedata .= "					<div id='wtw_webaliascomplete'></div><br />\r\n";
			$zpagedata .= "					<div id='wtw_loadingwebalias' class='wtw-loadingnoticecentered'>Loading...</div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "		</div>\r\n";
			
			/* settings page - api keys */
			$zpagedata .= "		<div id='wtw_apikeyssettings' class='wtw-fullpage'>\r\n";
			$zpagedata .= "			<div class='wtw-dashboardboxleftfull'>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardboxtitle'><div id='wtw_addapikey' class='wtw-greenbuttonright' onclick=\"WTW.openAPIKeyForm('');\">Add New</div>API Keys Access</div>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= " 					<div class='wtw-roundedbox'>API Key set is a login and password used to allow outside applications limited access to perform select functions. For example, an API Key set can allow your <b>WalkTheWeb WordPress Plugin</b> to create and manage your 3D Community Scenes, 3D Buildings, and 3D Shopping Stores.</div>\r\n";
			$zpagedata .= "						<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "						<div id='wtw_apikeyerror' class='wtw-error'></div>\r\n";
			
			$zpagedata .= "					<div id='wtw_addapikeydiv' class='wtw-dashboardboxleftdouble wtw-hide'>\r\n";
			$zpagedata .= "						<div class='wtw-dashboardboxtitle'>Add API Key</div>\r\n";
			$zpagedata .= "						<div class='wtw-dashboardbox'>\r\n";

			$zpagedata .= "							<div class='wtw-dashboardlabel'>App Friendly Name</div>\r\n";
			$zpagedata .= "							<div class='wtw-dashboardvalue'><input type='text' id='wtw_tapiappname' maxlength='255' style='width:360px;' /></div>\r\n";
			$zpagedata .= "							<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "							<div class='wtw-dashboardlabel'>App URL (https recommended)</div>\r\n";
			$zpagedata .= "							<div class='wtw-dashboardvalue'><input type='text' id='wtw_tapiappurl' maxlength='255' style='width:360px;' /></div>\r\n";
			$zpagedata .= "							<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "							<div class='wtw-dashboardlabel'>App ID (May be Required: Example WordPress App ID)</div>\r\n";
			$zpagedata .= "							<div class='wtw-dashboardvalue'><input type='text' id='wtw_tapiappid' maxlength='255' /></div>\r\n";
			$zpagedata .= "							<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "							<div class='wtw-dashboardlabel'>WalkTheWeb Key</div>\r\n";
			$zpagedata .= "							<div class='wtw-dashboardvalue'><input type='text' id='wtw_tapiwtwkey' maxlength='255' style='width:360px;' /></div>\r\n";
			$zpagedata .= "							<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "							<div class='wtw-dashboardlabel'>WalkTheWeb Secret</div>\r\n";
			$zpagedata .= "							<div class='wtw-dashboardvalue'><input type='password' id='wtw_tapiwtwsecret' maxlength='255' style='width:360px;' /></div>\r\n";
			$zpagedata .= "							<div class='wtw-clear'></div>\r\n";
			$zpagedata .= " 							<div id='wtw_apicopynote' class='wtw-error'>Make sure you copy the WalkTheWeb Key and Secret now. You will not be able to view this information again after Saving.</div>\r\n";

			$zpagedata .= " 						</div>\r\n";
			$zpagedata .= "						<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "						<div id='wtw_bapikeydelete' class='wtw-redbuttonleft wtw-hide' onclick='WTW.saveAPIKeyForm(0);'>Delete API Key</div>\r\n";
			$zpagedata .= "						<div id='wtw_bapikeyrekey' class='wtw-yellowbuttonleft wtw-hide' onclick='WTW.newAPIKey();'>Assign New API Key</div>\r\n";
			$zpagedata .= "						<div id='wtw_bapikeysave' class='wtw-greenbuttonright' onclick='WTW.saveAPIKeyForm(1);'>Save API Key</div>\r\n";
			$zpagedata .= "						<div class='wtw-yellowbuttonright' onclick='WTW.saveAPIKeyForm(-1);'>Cancel</div>\r\n";
			$zpagedata .= " 					</div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<div class='wtw-dashboardboxleftfull'>\r\n";
			$zpagedata .= "						<div id='wtw_apikeystitle' class='wtw-dashboardboxtitle'>API Keys</div>\r\n";
			$zpagedata .= "						<div id='wtw_apikeyslist'></div><br />\r\n";
			$zpagedata .= " 					</div>\r\n";
			$zpagedata .= "					<div id='wtw_loadingapikeys' class='wtw-loadingnoticecentered'>Loading...</div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "		</div>\r\n";
			$zpagedata .= "	</div>\r\n";
			
			/* Optional Upgrades Page */
			$zpagedata .= "	<div id='wtw_optionalpage' class='wtw-fullpage'>\r\n";
			$zpagedata .= "		<div class='wtw-dashboardboxleftfull'>\r\n";
			$zpagedata .= "			<div id='wtw_optionaltitle' class='wtw-dashboardboxtitle'>My Invoices</div>\r\n";
			$zpagedata .= "			<div id='wtw_optionalnote' class='wtw-roundedbox'><b>My Invoices</b> provide printable receipts for your WalkTheWeb Purchases and Upgrades.<br /></div>\r\n";
			$zpagedata .= "			<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "			<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= "				<div id='wtw_optionallist'></div><br />\r\n";
			$zpagedata .= "				<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "				<div id='wtw_loadingoptional' class='wtw-loadingnoticecentered'>Loading...</div>\r\n";
			$zpagedata .= "				<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "		</div>\r\n";
			$zpagedata .= "	</div>\r\n";
			
			/* Invoices Page */
			$zpagedata .= "	<div id='wtw_invoicespage' class='wtw-fullpage'>\r\n";
			$zpagedata .= "		<div class='wtw-dashboardboxleftfull'>\r\n";
			$zpagedata .= "			<div id='wtw_invoicestitle' class='wtw-dashboardboxtitle'>My Invoices</div>\r\n";
			$zpagedata .= "			<div id='wtw_invoicesnote' class='wtw-roundedbox'><b>My Invoices</b> provide printable receipts for your WalkTheWeb Purchases and Upgrades.<br /></div>\r\n";
			$zpagedata .= "			<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "			<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= "				<div id='wtw_invoiceslist'></div><br />\r\n";
			$zpagedata .= "				<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "				<div id='wtw_loadinginvoices' class='wtw-loadingnoticecentered'>Loading...</div>\r\n";
			$zpagedata .= "				<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "		</div>\r\n";
			$zpagedata .= "	</div>\r\n";
			
			/* 3D Community Requirements Page */
			$zpagedata .= "	<div id='wtw_requirementspage' class='wtw-dashboardpage wtw-hide' style='display:none;'>\r\n";
			$zpagedata .= "		<div id='wtw_loadingrequirements' class='wtw-loadingnotice'>Loading...</div>\r\n";
			$zpagedata .= "		<div id='wtw_requirements' class='wtw-fullpage'>\r\n";
			$zpagedata .= "			<div class='wtw-dashboardboxleftfull'>\r\n";
			$zpagedata .= "				<div id='wtw_requirementstitle' class='wtw-dashboardboxtitle'>Requirements</div>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= " 					<div id='wtw_requirementsdesc'>The settings below will only apply to this 3D Website.</div><br /><br />\r\n";

				/* Parental Controls and Ratings */
			$zpagedata .= "			<div class='wtw-controlpaneldiv'>\r\n";
			$zpagedata .= "				<div class='wtw-controlpaneltitlediv'>Parental Controls - Content Rating</div>\r\n";
			$zpagedata .= "				<label class='wtw-switch'><input id='wtw_enableparentalsettings' type='checkbox' onclick='WTW.changeSwitch(this);'><span class='wtw-slider wtw-round'></span></label><div id='wtw_enableparentaltext' class='wtw-disabledlabel'>Rating is not set for this 3D Website.</div><br /><div id='wtw_enableparentaltext2'>No content warning will be displayed.</div><br />\r\n";
			$zpagedata .= "				<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "				<div id='wtw_webratingdiv' class='wtw-hide'>\r\n";
			$zpagedata .= "					<hr /><div id='wtw_requirementslabel' class='wtw-dashboardlabel' style='font-size:1.2em;font-weight:bold;'>3D Website Content Rating</div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<select id='wtw_webrating' onchange='WTW.changeRating();' class='wtw-pointer'>
												<option value='0'>Web-All</option>
												<option value='1'>Web-P</option>
												<option value='2'>Web-P13</option>
												<option value='3'>Web-P17</option>
												<option value='4'>Web-Adult</option>
											</select>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<br /><div id='wtw_webratingtext'>General Visitors - Safe for All Ages</div>\r\n";
			$zpagedata .= "					<hr /><div class='wtw-dashboardlabel' style='font-size:1.2em;font-weight:bold;'>Optional Additional Content Warning Text</div>\r\n";
			$zpagedata .= "					<div class='wtw-clear'></div>\r\n";
			$zpagedata .= "					<textarea id='wtw_webcontentwarning' rows='5' columns='80' style='width:95%;'></textarea>\r\n";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "				<div class='wtw-clear'></div>\r\n";
			$zpagedata .= " 			<div id='wtw_parentalcontrolerror' class='wtw-error'></div>\r\n";
			$zpagedata .= "				<div id='wtw_bparentalcontrolssave' class='wtw-greenbuttonleft' onclick='WTW.saveCommunityRequirements(1);'>Save Parental Controls</div>\r\n";
			$zpagedata .= "				<div class='wtw-clear'></div><br />\r\n";
			$zpagedata .= "			</div>\r\n";
			
			if (!empty($wtw->communityid)) {
				/* Avatar Groups for this 3D Community */
				$zpagedata .= "			<div class='wtw-controlpaneldiv'>\r\n";
				$zpagedata .= "				<div class='wtw-controlpaneltitlediv'>Avatar Groups Allowed</div>\r\n";
				$zpagedata .= "				<label class='wtw-switch'><input id='wtw_enableavatargroups' type='checkbox' onclick='WTW.changeSwitch(this);' checked><span class='wtw-slider wtw-round'></span></label><div id='wtw_enableavatargroupstext' class='wtw-enablelabel'>All Avatar Groups Allowed</div> <br />All Avatar Groups are allowed on this 3D Community Website.<br /><br />\r\n";
				$zpagedata .= "			</div>\r\n";
			}
			
			if (!empty($wtw->communityid) || !empty($wtw->buildingid) || !empty($wtw->thingid) || !empty($wtw->avatarid)) {
					/* plugins required to load for this 3D Web */
				$zpagedata .= "			<div class='wtw-controlpaneldiv'>\r\n";
				$zpagedata .= "				<div class='wtw-controlpaneltitlediv'>Required 3D Plugins</div>\r\n";
				$zpagedata .= "				<label class='wtw-switch'><input id='wtw_enablepluginsrequired' type='checkbox' onclick='WTW.changeSwitch(this);'><span class='wtw-slider wtw-round'></span></label><div id='wtw_enablepluginsrequiredtext' class='wtw-disabledlabel'>No specific 3D Plugins are Required</div> <br />Enable to set specific 3D Plugins as Required or Optional.<br /><br />\r\n";
				$zpagedata .= "				<div id='wtw_pluginsrequiredlist'></div>\r\n";
				$zpagedata .= "				<div class='wtw-clear'></div>\r\n";
				$zpagedata .= " 			<div id='wtw_pluginsrequirederror' class='wtw-error'></div>\r\n";
				$zpagedata .= "				<div class='wtw-clear'></div>\r\n";
				$zpagedata .= "				<div id='wtw_bpluginsrequiredsave' class='wtw-greenbuttonleft' onclick='WTW.savePluginsRequired();'>Save Plugins Required</div>\r\n";
				$zpagedata .= "				<div class='wtw-clear'></div><br />\r\n";
				$zpagedata .= "			</div>\r\n";
			}

			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "		</div>\r\n";
			$zpagedata .= "	</div>\r\n";
			

			/* troubleshooting - display error page */
			$zpagedata .= "	<div id='wtw_errorpage' class='wtw-dashboardpage wtw-hide' style='display:none;'>\r\n";
			$zpagedata .= "		<div id='wtw_showerror' class='wtw-fullpage'>\r\n";
			$zpagedata .= "			<div class='wtw-dashboardboxleftfull'>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardboxtitle'>Error Information</div>\r\n";
			$zpagedata .= "				<div class='wtw-dashboardbox'>\r\n";
			$zpagedata .= "					<div id='wtw_error'></div>\r\n";
			$zpagedata .= "				</div>\r\n";
			$zpagedata .= "			</div>\r\n";
			$zpagedata .= "		</div>\r\n";
			$zpagedata .= "	</div>\r\n";
			
			/* dynamically created full page divs from plugins */
			$zpagedata .= "	<div id='wtw_fullpageplugins' class='wtw-dashboardpage wtw-hide' style='display:none;'>\r\n";
			foreach ($this->fullpagedivs as $zfullpageitem) {
				$zid = $zfullpageitem["id"];
				$zaccessrequired = $zfullpageitem["accessrequired"]; /* array of allowed roles */
				$zfullpagedata = $zfullpageitem["fullpagedata"];
				if ($wtwdb->hasPermission($zaccessrequired)) {
					/* check for invalid entries */
					if (!isset($zid) || empty($zid)) {
						$zid = $wtwdb->getRandomString(6,1);
					}
					if (!isset($zfullpagedata)|| empty($zfullpagedata)) {
						$zfullpagedata = '';
					}
					if ($wtwdb->hasValue($zfullpagedata)) {
						$zpagedata .= "		<div id='".$zid."' class='wtw-fullpage'>\r\n";
						$zpagedata .= $zfullpagedata;
						$zpagedata .= "		</div>\r\n";
					}
				}
			}			
			$zpagedata .= "	</div>\r\n";

			$zpagedata .= "	<br />\r\n";
			$zpagedata .= "	<br />\r\n";
			$zpagedata .= "	<br />\r\n";
			$zpagedata .= "</div>\r\n";
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwadmin.php-loadFullPageFormAdmin=".$e->getMessage());
		}
		return $zpagedata;
	}

	public function addFullPageForm($zid, $zaccessrequired, $zfullpagedata) {
		/* add form as full page div - used in plugins */
		$zsuccess = false;
		try {	
			$zfullpagediv = array(
				'id' => $zid,
				'accessrequired' => $zaccessrequired, 
				'fullpagedata' => $zfullpagedata
			);
			$this->fullpagedivs[count($this->fullpagedivs)] = $zfullpagediv;
			
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
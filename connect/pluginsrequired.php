<?php
/* these /connect files are designed to extend data to other servers - like having your 3D Building in their 3D Community Scene */
/* permissions are required for access to some data */
/* this connect file provides 3D Community information */
require_once('../core/functions/class_wtwconnect.php');
global $wtwconnect;

	function getPluginPHP($zcontentpath, $zpluginphp, $zfolder) {
		/* check for initial php file under plugin folder (name should match the folder with .php added) */
		global $wtwconnect; 
		$zresponse = array(
			'pluginname' => '',
			'version' => '0.0.0',
			'latestversion' => '0.0.0',
			'title' => '',
			'author' => '',
			'description' => '',
			'foldername' => $zfolder,
			'filename' => $zpluginphp,
			'updatedate' => '',
			'updateurl' => '',
			'loaded' => '1',
			'active' => '0',
			'required' => '0',
			'optional' => '0'
		);
		try {
			$i = 0;
			if (file_exists($zpluginphp)) {
				$zpluginname = "";
				$zlines = file($zpluginphp);
				foreach ($zlines as $zline) {
					$zline = str_replace("\n","",str_replace("\r","",$zline));
					if (strpos($zline,'=') !== false) {
						$zlineparts = explode("=",$zline);
						if ($zlineparts[0] != null && $zlineparts[1] != null) {
							$zpart = strtolower(trim(str_replace("#","",$zlineparts[0])));
							$zvalue = trim(str_replace("#","",$zlineparts[1]));
							switch ($zpart) {
								case "pluginname":
									$zpluginname = $zvalue;
									$zvalue = strtolower($zvalue);
								case "version":
									$zvalue = strtolower($zvalue);
									$zresponse["latestversion"] = $zvalue;
								case "title":
								case "description":
								case "author":
									$zresponse[$zpart] = $zvalue;
									$i += 1;
									break;
							}
						}
					}
				}
				if ($wtwconnect->hasValue($zpluginname)) {
					$zresponse['active'] = getPluginActive($zpluginname);
				}
			}
		} catch (Exception $e) {
			$wtwconnect->serror("connect-pluginsrequired.php-getPluginPHP=".$e->getMessage());
		}
		return $zresponse;
	}
	
	function getPluginActive($zpluginname) {
		/* see if a plugin is set to active */
		global $wtwconnect;
		$zactive = "0";
		try {
			$zresponse = $wtwconnect->query("
				select active
				from ".wtw_tableprefix."plugins
				where lower(pluginname)=lower('".$zpluginname."')
					and deleted=0;");
			foreach ($zresponse as $zrow) {
				if (!empty($zrow["active"]) & isset($zrow["active"])) {
					if ($zrow["active"] == "1") {
						$zactive = "1";
					}
				}
			}
		} catch (Exception $e) {
			$wtwconnect->serror("connect-pluginsrequired.php-getPluginActive=".$e->getMessage());
		}
		return $zactive;
	}
	
try {
	/* google analytics tracking (if defined in wtw_config.php) */
	$wtwconnect->trackPageView($wtwconnect->domainurl."/connect/pluginsrequired.php");
	
	/* get values from querystring or session */
	$zwebid = $wtwconnect->getVal('webid','');
	$zwebtype = $wtwconnect->getVal('webtype','');
	
	$zplugins = array();
	
	$i = 0;
	$zfilepath = $wtwconnect->contentpath."/plugins";
	if (file_exists($zfilepath)) {
		$zfolders = new DirectoryIterator($zfilepath);
		foreach ($zfolders as $zfileinfo) {
			if ($zfileinfo->isDir() && !$zfileinfo->isDot()) {
				$zfolder = $zfileinfo->getFilename();
				$zpluginphp = $zfilepath."/".$zfolder."/".$zfolder.".php";
				$zplugins[$i] = getPluginPHP($wtwconnect->contentpath, $zpluginphp, $zfolder);
				$zrequired = '0';
				$zoptional = '0';
				$zresults = $wtwconnect->query("
					select *
					from ".wtw_tableprefix."pluginsrequired
					where deleted=0
						and pluginname='".$zfolder."'
						and webid='".$zwebid."'
						and webtype='".$zwebtype."';");
				foreach ($zresults as $zrow) {
					$zrequired = '1';
					$zoptional = $zrow['optional'];
					if ($zoptional == '1') {
						$zrequired = '0';
					}
				}
				$zplugins[$i]["required"] = $zrequired;
				$zplugins[$i]["optional"] = $zoptional;
				$i += 1;
			}
		}
	}

	/* populate any missing webtype fields */
	$zresults = $wtwconnect->query("
		select *
		from ".wtw_tableprefix."pluginsrequired
		where deleted=0
			and webid='".$zwebid."';");
	foreach ($zresults as $zrow) {
		$zpluginname = $zrow['pluginname'];
		$zoptional = $zrow['optional'];
		$zfound = false;
		foreach ($zplugins as $zplugin) {
			if ($zpluginname == $zplugin['pluginname']) {
				$zfound = true;
			}
		}
		if ($zfound == false) {
			$zfilename = $zfilepath."/".$zpluginname."/".$zpluginname.".php";
			$zplugins[$i] = array(
				'pluginname' => $zpluginname,
				'version' => '0.0.0',
				'latestversion' => '0.0.0',
				'title' => '',
				'author' => '',
				'description' => '',
				'foldername' => $zpluginname,
				'filename' => $zfilename,
				'updatedate' => '',
				'updateurl' => '',
				'loaded' => '0',
				'active' => '0',
				'required' => '1',
				'optional' => $zoptional
			);
			$i += 1;
		}
	}
	
	/* sort the results by plugin name, then title */
	function arraysort($a, $b) {
		if ($a["pluginname"] == $b["pluginname"]) {
			return ($a["title"] > $b["title"]) ? 1 : -1;
		}
		return ($a["pluginname"] > $b["pluginname"]) ? 1 : -1;
	}
	usort($zplugins, "arraysort");

	echo $wtwconnect->addConnectHeader($wtwconnect->domainname);
	
	echo json_encode($zplugins);	
} catch (Exception $e) {
	$wtwconnect->serror("connect-pluginsrequired.php=".$e->getMessage());
}
?>
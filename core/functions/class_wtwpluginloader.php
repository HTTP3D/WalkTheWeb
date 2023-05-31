<?php
class wtwpluginloader {
	/* wtwpluginloader class for WalkTheWeb functions for loading the various 3d plugins */
	/* this is used by the engine to determine if a plugin is found, active, and to implement plugin code as necessary */
	/* if you are creating a plugin, use the /core/functions/class_plugins.php for functions and global values */
	protected static $_instance = null;
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function __construct() {

	}	
	
	public function __call ($method, $arguments)  {
		if (isset($this->$method)) {
			call_user_func_array($this->$method, array_merge(array(&$this), $arguments));
		}
	}
	
	public function getAllPlugins($zcontentpath, $zload) {
		/* check the plugin folder path to get all 3D plugins by folders */
		global $wtwdb;
		global $wtwhandlers;
		$zresponse = array();
		try {
			if (!isset($wtwhandlers)) {
				$wtwhandlers = $wtwdb;
			}
			$i = 0;
			$zfilepath = $zcontentpath."/plugins";
			$wtwdb->verifyFolderExists($zfilepath);
			$zfolders = new DirectoryIterator($zfilepath);
			foreach ($zfolders as $zfileinfo) {
				if ($zfileinfo->isDir() && !$zfileinfo->isDot()) {
					$zfolder = $zfileinfo->getFilename();
					$zpluginphp = $zfilepath."/".$zfolder."/".$zfolder.".php";
					if (file_exists($zpluginphp)) {
						$zresponse[$i] = $this->getPluginPHP($zcontentpath, $zpluginphp, $zfolder, $zload);
						$zallrequired = '0';
						$zalloptional = '0';
						$zwebsrequired = array();
						$j = 0;
						if (isset($wtwhandlers)) {
							$zresults = $wtwhandlers->query("
								select pr1.*,
									c1.communityid,
									c1.communityname,
									b1.buildingid,
									b1.buildingname,
									t1.thingid,
									t1.thingname
								from ".wtw_tableprefix."pluginsrequired pr1
									left join (select * from ".wtw_tableprefix."communities where deleted=0) c1
										on pr1.webid=c1.communityid
									left join (select * from ".wtw_tableprefix."buildings where deleted=0) b1
										on pr1.webid=b1.buildingid
									left join (select * from ".wtw_tableprefix."things where deleted=0) t1
										on pr1.webid=t1.thingid
								where pr1.deleted=0
									and pr1.pluginname='".$zfolder."';");
							foreach ($zresults as $zrow) {
								$zallrequired = '1';
								$zrequired = '1';
								$zoptional = $zrow['optional'];
								$zwebtype = '';
								$zwebid = '';
								$zwebname = '';
								if ($zoptional == '1') {
									$zalloptional = '1';
									$zrequired = '0';
								}
								if ($wtwdb->hasValue($zrow['communityid'])) {
									$zwebtype = 'Community';
									$zwebid = $zrow['communityid'];
									$zwebname = $zrow['communityname'];
								} else if ($wtwdb->hasValue($zrow['buildingid'])) {
									$zwebtype = 'Building';
									$zwebid = $zrow['buildingid'];
									$zwebname = $zrow['buildingname'];
								} else if ($wtwdb->hasValue($zrow['thingid'])) {
									$zwebtype = 'Thing';
									$zwebid = $zrow['thingid'];
									$zwebname = $zrow['thingname'];
								}
								$zwebsrequired[$j] = array(
									'pluginsrequiredid'=> $zrow['pluginsrequiredid'],
									'webid'=> $zwebid,
									'webtype'=> $zwebtype,
									'webname'=> $zwebname,
									'required'=> $zrequired,
									'optional'=> $zoptional,
								);
								$j += 1;
							}
						}
						$zresponse[$i]["websrequired"] = $zwebsrequired;
						$zresponse[$i]["required"] = $zallrequired;
						$zresponse[$i]["optional"] = $zalloptional;
						$i += 1;
					}
				}
			}
			/* sort the results by plugin name, then title */
			function arraysort($a, $b) {
				if ($a["pluginname"] == $b["pluginname"]) {
					return ($a["title"] > $b["title"]) ? 1 : -1;
				}
				return ($a["pluginname"] > $b["pluginname"]) ? 1 : -1;
			}
			usort($zresponse, "arraysort");
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwpluginloader.php-getAllPlugins=".$e->getMessage());
		}
		return json_encode($zresponse);
	}
	
	public function getPluginPHP($zcontentpath, $zpluginphp, $zfolder, $zload) {
		/* check for initial php file under plugin folder (name should match the folder with .php added) */
		global $wtwdb; 
		$zresponse = array(
			'pluginname' => '',
			'version' => '0.0.0',
			'latestversion' => '0.0.0',
			'title' => '',
			'author' => '',
			'description' => '',
			'foldername' => $zfolder,
			'filename' => $zpluginphp,
			'imageurl' => '',
			'updatedate' => '',
			'updateurl' => '',
			'websrequired' => array(),
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
				if ($wtwdb->hasValue($zpluginname)) {
					$zresponse['active'] = $this->getPluginActive($zpluginname);
					if ($zresponse['active'] == "1" && $zload == 1) {
						require_once($zcontentpath."/plugins/".$zpluginname."/".$zpluginname.".php");
					}
				}
			}
			if (file_exists($zcontentpath.'/plugins/'.$zfolder.'/'.$zfolder.'.png')) {
				$zresponse['imageurl'] = '/content/plugins/'.$zfolder.'/'.$zfolder.'.png';
			} else if (file_exists($zcontentpath.'/plugins/'.$zfolder.'/'.$zfolder.'.jpg')) {
				$zresponse['imageurl'] = '/content/plugins/'.$zfolder.'/'.$zfolder.'.jpg';
			} else if (file_exists($zcontentpath.'/plugins/'.$zfolder.'/'.$zfolder.'.gif')) {
				$zresponse['imageurl'] = '/content/plugins/'.$zfolder.'/'.$zfolder.'.gif';
			} else {
				$zresponse['imageurl'] = '/content/system/images/plugin.png';
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwpluginloader.php-getPluginPHP=".$e->getMessage());
		}
		return $zresponse;
	}
	
	public function getPluginActive($zpluginname) {
		/* see if a plugin is set to active */
		global $wtwdb;
		$zactive = "0";
		try {
			$zresponse = $wtwdb->query("
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
			$wtwdb->serror("core-functions-class_wtwpluginloader.php-getPluginActive=".$e->getMessage());
		}
		return $zactive;
	}

	public function savePluginsRequired($zwebid, $zwebtype, $zpluginname, $zrequired, $zoptional) {
		/* see if a plugin is set to active */
		global $wtwhandlers;
		$zresponse = array(
			'serror'=>''
		);
		try {
			if ($wtwhandlers->hasValue($zrequired)) {
				if ($zrequired != '1') {
					$zrequired = '0';
				}
			} else {
				$zrequired = '0';
			}
			if ($wtwhandlers->hasValue($zoptional)) {
				if ($zoptional != '1') {
					$zoptional = '0';
				}
			} else {
				$zoptional = '0';
			}
			if ($wtwhandlers->hasValue($zwebid)) {
				$zfoundid = '';
				$zresults = $wtwhandlers->query("
					select *
					from ".wtw_tableprefix."pluginsrequired
					where lower(pluginname)=lower('".$zpluginname."')
						and webid='".$zwebid."';");
				foreach ($zresults as $zrow) {
					$zfoundid = $zrow['pluginsrequiredid'];
				}
				if ($wtwhandlers->hasValue($zfoundid)) {
					if ($zrequired == '1' || $zoptional == '1') {
						/* update existing required or optional */
						$wtwhandlers->query("
							update ".wtw_tableprefix."pluginsrequired
							set webtype='".$zwebtype."',
								optional='".$zoptional."',
								updatedate=now(),
								updateuserid='".$wtwhandlers->userid."',
								deleteddate=null,
								deleteduserid='',
								deleted=0
							where pluginsrequiredid='".$zfoundid."';");
					} else {
						/* no longer required or optional */
						$wtwhandlers->query("
							update ".wtw_tableprefix."pluginsrequired
							set deleteddate=now(),
								deleteduserid='".$wtwhandlers->userid."',
								deleted=1
							where pluginsrequiredid='".$zfoundid."';");
					}
				} else {
					if ($zrequired == '1' || $zoptional == '1') {
						/* new required or optional plugin */
						$zpluginsrequiredid = $wtwhandlers->getRandomString(16,1);
						$wtwhandlers->query("
							insert into ".wtw_tableprefix."pluginsrequired
							   (pluginsrequiredid,
							    webid,
								webtype,
								pluginname,
								optional,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$zpluginsrequiredid."',
								'".$zwebid."',
								'".$zwebtype."',
								'".$zpluginname."',
								'".$zoptional."',
								now(),
								'".$wtwhandlers->userid."',
								now(),
								'".$wtwhandlers->userid."');");
					}
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwpluginloader.php-savePluginsRequired=".$e->getMessage());
			$zresponse = array(
				'serror'=>$e->getMessage()
			);
		}
		return $zresponse;
	}
	
	public function setPluginActive($zpluginname, $zactive) {
		/* set a plugin active status */
		global $wtwdb;
		$zsuccess = false;
		try {
			if ($wtwdb->isUserInRole('admin') || $wtwdb->isUserInRole('developer')) {
				$zactiveold = "0";
				$zdeletedold = "0";
				$zfound = "";
				if (!isset($zactive)) {
					$zactive = "0";
				} else if (!is_numeric($zactive)) {
					$zactive = "0";
				}
				$zresponse = $wtwdb->query("
					select pluginname, active, deleted
					from ".wtw_tableprefix."plugins
					where lower(pluginname)=lower('".$zpluginname."');");
				foreach ($zresponse as $zrow) {
					$zactiveold = $zrow["active"];
					$zdeletedold = $zrow["deleted"];
					$zfound = $zrow["pluginname"];
				}
				if ($wtwdb->hasValue($zpluginname)) {
					if (!empty($zfound)) {
						$wtwdb->query("
							update ".wtw_tableprefix."plugins
							set active=".$zactive.",
								deleteddate=null,
								deleteduserid='',
								deleted=0
							where pluginname='".$zpluginname."'
							limit 1;");
					} else {
						$wtwdb->query("
							insert into ".wtw_tableprefix."plugins
							   (pluginname,
								active,
								createdate,
								createuserid,
								updatedate,
								updateuserid)
							values
							   ('".$zpluginname."',
								".$zactive.",
								now(),
								'".$wtwdb->userid."',
								now(),
								'".$wtwdb->userid."');");
					}
				}
			}
		} catch (Exception $e) {
			$wtwdb->serror("core-functions-class_wtwpluginloader.php-setPluginActive=".$e->getMessage());
		}
		return $zsuccess;
	}	

	public function updateWalkTheWeb($zpluginname, $zversion, $zupdateurl) {
		/* download and update WalkTheWeb core product */
		global $wtwhandlers;
		$zsuccess = false;
		try {
			$ztempfilename = $zpluginname.str_replace(".","-",$zversion).".zip";
			$ztempfilepath = $wtwhandlers->contentpath."/system/updates/".$zpluginname."/";
			$wtwhandlers->verifyFolderExists($wtwhandlers->contentpath."/system");
			$wtwhandlers->verifyFolderExists($wtwhandlers->contentpath."/system/updates");
			$wtwhandlers->verifyFolderExists($wtwhandlers->contentpath."/system/updates/".$zpluginname);
			$wtwhandlers->getFilefromURL($zupdateurl, $ztempfilepath, $ztempfilename);
			
			if (file_exists($ztempfilepath.$ztempfilename)) {
				umask(0);
				chmod($ztempfilepath.$ztempfilename, octdec(wtw_chmod));
				if (defined('wtw_umask')) {
					/* reset umask */
					if (wtw_umask != '0') {
						umask(octdec(wtw_umask));
					}
				}
				$zip = new ZipArchive;
				$res = $zip->open($ztempfilepath.$ztempfilename);
				if ($res === true) {
					if ($zpluginname == "walktheweb") {
						$zip->extractTo($wtwhandlers->rootpath);
					} else {
						$zip->extractTo($wtwhandlers->contentpath."/plugins");
					}
					$zip->close();
					$zsuccess = true;
				}
			}
		} catch (Exception $e) {
			$wtwhandlers->serror("core-functions-class_wtwpluginloader.php-updateWalkTheWeb=".$e->getMessage());
		}
		return $zsuccess;
	}
	
	public function loadConnectURL() {
		/* plugins can have a /connect folder that is accessed as a root folder through the provided rewrite rules */
		/* basically /content/plugins/YOURPLUGINNAME/connect/ is treated as /connect/ */
		require_once(wtw_rootpath.'/core/functions/class_wtwdb.php');
		global $wtw;
		try {
			$zroot =  explode('?', $wtw->uri);
			$zpathdef = explode("/", $zroot[0]);
			$zfile = "";
			$zpluginphp = "";
			if (count($zpathdef) > 2) {
				$zfile = trim($zpathdef[2]);
			}
			if ($wtw->hasValue($zfile)) {
				$zconnectfile = "";
				$zfilepath = $wtw->contentpath."/plugins";
				if (file_exists($zfilepath)) {
					$zfolders = new DirectoryIterator($zfilepath);
					foreach ($zfolders as $zdirinfo) {
						if ($zdirinfo->isDir() && !$zdirinfo->isDot()) {
							$zfolder = $zdirinfo->getFilename();
							if ($this->getPluginActive($zfolder) == "1") {
								if (file_exists($zfilepath."/".$zfolder."/connect")) {
									$zconnectfiles = new DirectoryIterator($zfilepath."/".$zfolder."/connect");
									foreach ($zconnectfiles as $zfileinfo) {
										if (!$zfileinfo->isDir() && !$zfileinfo->isDot()) {
											$zcfile = $zfileinfo->getFilename();
											if ($zcfile == $zfile) {
												$zconnectfile = $zfilepath."/".$zfolder."/connect/".$zcfile;
												$zpluginphp = $zfilepath."/".$zfolder."/".$zfolder.".php";
											}
										}
									}
								}
							}
						}
					}
				}
				if ($wtw->hasValue($zconnectfile)) {
					require_once(wtw_rootpath.'/core/functions/class_wtwconnect.php');
					if ($wtw->hasValue($zpluginphp)) {
						if (file_exists($zpluginphp)) {
							require_once(wtw_rootpath.'/core/functions/class_wtwplugins.php');
							require_once($zpluginphp);
						}
					}
					require_once($zconnectfile);
				} else {
					http_response_code(404);
				}
				exit();
			} else {
				http_response_code(404);
				exit();
			}
		} catch (Exception $e) {
			$wtw->serror("core-functions-class_wtwpluginloader.php-getConnectURL=" . $e->getMessage());
		}
	}

	public function loadPathURL($zpath) {
		/* plugins can have a /path folder that is accessed as a root /core/path/ folder through the provided rewrite rules */
		/* basically /content/plugins/YOURPLUGINNAME/path/ is treated as /core/path/ */
		require_once(wtw_rootpath.'/core/functions/class_wtwdb.php');
		global $wtw;
		try {
			$zroot =  explode('?', $wtw->uri);
			$zpathdef = explode("/", $zroot[0]);
			$zfile = "";
			$zpluginphp = "";
			if (count($zpathdef) > 3) {
				$zfile = trim($zpathdef[3]);
			}
			if ($wtw->hasValue($zfile)) {
				$zpathfile = "";
				$zfilepath = $wtw->contentpath."/plugins";
				if (file_exists($zfilepath)) {
					$zfolders = new DirectoryIterator($zfilepath);
					foreach ($zfolders as $zdirinfo) {
						if ($zdirinfo->isDir() && !$zdirinfo->isDot()) {
							$zfolder = $zdirinfo->getFilename();
							if ($this->getPluginActive($zfolder) == "1") {
								if (file_exists($zfilepath."/".$zfolder."/".$zpath)) {
									$zhandlersfiles = new DirectoryIterator($zfilepath."/".$zfolder."/".$zpath);
									foreach ($zhandlersfiles as $zfileinfo) {
										if (!$zfileinfo->isDir() && !$zfileinfo->isDot()) {
											$zcfile = $zfileinfo->getFilename();
											if ($zcfile == $zfile) {
												$zpathfile = $zfilepath."/".$zfolder."/".$zpath."/".$zcfile;
												$zpluginphp = $zfilepath."/".$zfolder."/".$zfolder.".php";
											}
										}
									}
								}
							}
						}
					}
				}
				if ($wtw->hasValue($zpathfile)) {
					if (file_exists(wtw_rootpath.'/core/functions/class_wtw'.$zpath.'.php')) {
						require_once(wtw_rootpath.'/core/functions/class_wtw'.$zpath.'.php');
					} else {
						require_once(wtw_rootpath.'/core/functions/class_wtwhandlers.php');
					}
					if ($wtw->hasValue($zpluginphp)) {
						if (file_exists($zpluginphp)) {
							require_once(wtw_rootpath.'/core/functions/class_wtwplugins.php');
							require_once($zpluginphp);
						}
					}
					require_once($zpathfile);
				} else {
					http_response_code(404);
				}
				exit();
			} else {
				http_response_code(404);
				exit();
			}
		} catch (Exception $e) {
			$wtw->serror("core-functions-class_wtwpluginloader.php-loadPathURL=" . $e->getMessage());
		}
	}


}

	function wtwpluginloader() {
		return wtwpluginloader::instance();
	}

	/* Global for backwards compatibility. */
	$GLOBALS['wtwpluginloader'] = wtwpluginloader();	

?>